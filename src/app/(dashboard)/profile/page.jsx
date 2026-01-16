'use client'
import { useState } from 'react'
import { useUser } from '@/customHooks/profile/useUser'
import { SidebarInfo } from "@/components/profile/SidebarInfo"
import { AccountSettings } from '@/components/profile/AccountSettings'
import { Header } from "@/components/profile/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { ResumeSection } from '@/components/profile/ResumeSection'

export default function UserProfilePage() {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("applied");

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header user={user} />

      <div className="container mx-auto mt-20 px-4"> 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Sidebar */}
          <div className="lg:col-span-4">
            <SidebarInfo 
              user={user} 
              // Sidebar se "Edit Resume" click hone par "resume" tab open hoga
              onEditClick={(tabName) => setActiveTab(tabName)} 
            />
          </div>

          {/* Right: Tabs Content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              
              {/* Added Resume Trigger in the list */}
              <TabsList className="bg-white border mb-6 flex justify-start">
                <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Tab 1: Applied Jobs */}
              <TabsContent value="applied" className="outline-none">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                   <h3 className="font-bold text-lg mb-4 text-slate-900">Applied Applications</h3>
                   <p className="text-slate-500">You haven't applied to any jobs yet.</p>
                </div>
              </TabsContent>

              {/* Tab 2: Resume (Now a standalone trigger) */}
              <TabsContent value="resume" className="outline-none">
                <ResumeSection user={user} />
              </TabsContent>

              {/* Tab 3: Account Settings */}
              <TabsContent value="settings" className="outline-none">
                <AccountSettings user={user} />
              </TabsContent>

            </Tabs>
          </div>

        </div>
      </div>
    </div>
  )
}