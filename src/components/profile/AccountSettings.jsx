'use client'
import React, { useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save } from "lucide-react"
import { useUpdateProfile } from '@/customHooks/profile/useUpdateProfile'

export const AccountSettings = ({ user }) => {
  // Hook se poora mutation object nikala
  const { updateProfileMutation } = useUpdateProfile();
  
  // Destructure states for cleaner code
  const { mutate, isPending } = updateProfileMutation;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    phoneNum: user?.phoneNum || "",
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    // updateProfileMutation ke andar '.mutate' function hota hai
    console.log("Submitting profile update with data:", formData);
    mutate(formData);
  };

  return (
    <div className="bg-white p-6 border rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Account Settings</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Full Name</label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your full name"
              disabled={isPending} // isPending use karein
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Phone Number</label>
            <Input 
              value={formData.phoneNum}
              onChange={(e) => setFormData({...formData, phoneNum: e.target.value})}
              placeholder="e.g. +91 9876543210"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Bio</label>
          <Textarea 
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Tell us about yourself..."
            className="min-h-[100px]"
            disabled={isPending}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-48 transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" /> 
              Updating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> 
              Save Profile
            </>
          )}
        </Button>
      </form>
    </div>
  )
}