'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Plus, Trash2, Quote, Edit3, Loader2 } from "lucide-react"
import { useUpdateSkill } from '@/customHooks/profile/useUpdateSkill'
import { toast } from "sonner"

export const SidebarInfo = ({ user, onEditClick }) => {
  const [newSkill, setNewSkill] = useState("");
  const { mutate, isPending } = useUpdateSkill();

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    // Backend string ka array expect kar raha hai ya object ka, 
    // uske mutabik yahan sirf string bhej rahe hain:
    const currentSkills = user?.skills?.map(s => typeof s === 'object' ? s.name : s) || [];
    
    // Check for duplicates
    if (currentSkills.includes(newSkill.trim())) {
        return toast.error("Skill already exists");
    }

    const updatedSkills = [...currentSkills, newSkill.trim()];
    
    mutate(updatedSkills, {
      onSuccess: () => setNewSkill("") 
    });
  };

  const handleDeleteSkill = (skillToDelete) => {
    // Objects se string nikal kar filter karenge
    const currentSkills = user?.skills?.map(s => typeof s === 'object' ? s.name : s) || [];
    const updatedSkills = currentSkills.filter(s => s !== skillToDelete);
    
    // Backend validation safety
    if (updatedSkills.length === 0) {
        return toast.error("At least one skill is required");
    }

    mutate(updatedSkills);
  };

  return (
    <div className="space-y-6">
      {/* Contact & Bio Card */}
      <Card className="border shadow-sm group">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
            About Me
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onEditClick('settings')}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative flex gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500 hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => onEditClick('settings')}>
            <Quote className="w-4 h-4 text-blue-500 shrink-0" />
            <p className="italic">{user?.bio || "Add a short bio about yourself..."}</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-400 cursor-not-allowed">
              <Mail className="w-4 h-4" /> 
              <span className="truncate">{user?.email}</span>
            </div>

            <div 
              className="flex items-center justify-between group/item cursor-pointer"
              onClick={() => onEditClick('settings')}
            >
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" /> 
                <span>{user?.phoneNum || "Add phone number"}</span>
              </div>
              <Edit3 className="w-3 h-3 text-slate-300 group-hover/item:text-blue-500 transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Skills Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
          Technical Skills
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((s, index) => {
                // Object se name extract karein
                const skillName = typeof s === 'object' ? s.name : s;
                
                return (
                  <Badge key={s.id || index} variant="secondary" className="px-2 py-1 flex gap-2 items-center bg-blue-50 text-blue-700 hover:bg-blue-100 border-none group/skill">
                    {skillName} 
                    <button 
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDeleteSkill(skillName)}
                      className="hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3 h-3 text-slate-400 hover:text-red-500" />
                    </button>
                  </Badge>
                )
              })
            ) : (
              <p className="text-xs text-slate-400 italic">No skills added</p>
            )}
          </div>
          
          <div className="flex gap-2 pt-2">
            <Input 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} 
              placeholder="Add Skill (e.g. React)" 
              className="h-9 text-sm focus-visible:ring-blue-600" 
              disabled={isPending}
            />
            <Button 
              onClick={handleAddSkill}
              disabled={isPending || !newSkill.trim()}
              size="sm" 
              className="h-9 px-3 bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}