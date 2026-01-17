'use client'
import { useState } from 'react'
import { useUser } from '@/customHooks/profile/useUser'
import { SidebarInfo } from "@/components/profile/SidebarInfo"
import { AccountSettings } from '@/components/profile/AccountSettings'
import { Header } from "@/components/profile/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, PlusCircle, Building2, Globe, Settings2, ExternalLink } from "lucide-react" 
import { ResumeSection } from '@/components/profile/ResumeSection'
import { Button } from "@/components/ui/button"
import { useCreateCompany } from '@/customHooks/company/useCreateCompany' 
import { useGetCompanies } from '@/customHooks/company/useGetCompany' 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function UserProfilePage() {
  const { user, isLoading: userLoading } = useUser();
  const { mutate, isPending: isCreating } = useCreateCompany();
  const { data: companies, isLoading: companiesLoading } = useGetCompanies();
  
  const isRecruiter = user?.role?.name === 'recruiter';
  const [activeTab, setActiveTab] = useState(isRecruiter ? "settings" : "applied");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (userLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-10 w-10" />
      </div>
    );
  }

  const handleCreateCompany = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        e.target.reset(); 
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header user={user} />

      <div className="container mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-4">
            <SidebarInfo
              user={user}
              isRecruiter={isRecruiter}
              onEditClick={(tabName) => setActiveTab(tabName)}
            />
          </div>

          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              
              <TabsList className="bg-white border mb-6 flex justify-start">
                {!isRecruiter && (
                  <>
                    <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                  </>
                )}

                <TabsTrigger value="settings" className="flex gap-2">
                   <Settings2 className="w-4 h-4" /> Settings
                </TabsTrigger>

                {isRecruiter && (
                  <TabsTrigger value="companies" className="flex gap-2">
                    <Building2 className="w-4 h-4" /> My Companies
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="settings" className="outline-none">
                <AccountSettings user={user} isRecruiter={isRecruiter} />
              </TabsContent>

              {isRecruiter && (
                <TabsContent value="companies" className="outline-none">
                  <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900">Your Organizations</h3>
                      
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
                            <PlusCircle className="w-4 h-4" /> Create Company
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Register New Company</DialogTitle>
                            <DialogDescription>Add details for your new organization.</DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleCreateCompany} className="space-y-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Company Name</Label>
                              <Input name="name" id="name" placeholder="e.g. Acme Corp" required disabled={isCreating} />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="website">Website Link</Label>
                              <div className="relative">
                                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input name="website" id="website" className="pl-9" placeholder="https://company.com" type="url" disabled={isCreating} />
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea name="description" id="description" placeholder="About the company..." required disabled={isCreating} />
                            </div>

                            <div className="grid gap-2">
                              <Label>Logo</Label>
                              {/* IMPORTANT: Check your backend Multer name. 
                                  If backend has upload.single('logo'), change name="file" to name="logo" */}
                              <Input name="file" type="file" accept="image/*" className="cursor-pointer" disabled={isCreating} />
                            </div>

                            <DialogFooter>
                              <Button type="submit" className="w-full bg-blue-600" disabled={isCreating}>
                                {isCreating ? (
                                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</>
                                ) : (
                                  "Register Organization"
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      {companiesLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                          <Loader2 className="animate-spin text-blue-600" />
                          <p className="text-sm text-slate-500">Loading your companies...</p>
                        </div>
                      ) : companies && companies.length > 0 ? (
                        companies.map((company) => (
                          /* FIX: Added unique key using _id */
                          <div key={company._id || company.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md hover:border-blue-200 transition-all bg-white group">
                            <div className="flex items-center gap-4">
                              <div className="h-14 w-14 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border">
                                {company.logo ? (
                                  <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
                                ) : (
                                  <Building2 className="text-slate-400 w-6 h-6" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                  {company.name}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                    <Globe className="w-3 h-3" /> Visit Website
                                  </a>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                              Edit
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-xl bg-slate-50/50">
                          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium">No organizations found.</p>
                          <p className="text-sm text-slate-400">Register a company to start posting jobs.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}

              {!isRecruiter && (
                <>
                  <TabsContent value="applied">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                       <h3 className="font-bold mb-4">Applied Jobs</h3>
                       <p className="text-slate-500">No applications found.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="resume">
                    <ResumeSection user={user} />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}