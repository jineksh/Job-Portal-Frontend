'use client'
import React, { useRef } from 'react'
import { FileText, Upload, Loader2, Download, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUpdateResume } from '@/customHooks/profile/useUpdateResume'
import { toast } from "sonner"

export const ResumeSection = ({ user }) => {
  const fileInputRef = useRef(null);
  
  // Actual Mutation Hook
  const { updateResumeMutation } = useUpdateResume();
  const isLoading = updateResumeMutation.isPending;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error("Invalid file! Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append('resume', file); // 'resume' key matches your API logic
    
    // Triggering actual API call
    updateResumeMutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 border rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Resume Management</h3>

      {user?.resume ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50 border-blue-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 text-white rounded-lg shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate max-w-[150px] md:max-w-xs">
                  {user?.resumeName || "My_Resume.pdf"}
                </p>
                <p className="text-xs text-blue-600 font-medium">Currently Active</p>
              </div>
            </div>

            <Button variant="ghost" size="icon" asChild className="hover:bg-blue-100 transition-colors">
              <a href={user?.resume} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4 text-blue-600" />
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Update your document</p>
            <Button 
              onClick={() => fileInputRef.current.click()}
              disabled={isLoading}
              variant="outline"
              className="w-full border-dashed border-2 hover:border-blue-600 hover:bg-blue-50 transition-all py-6"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <RefreshCcw className="h-5 w-5 mr-2" />
              )}
              Replace Current Resume
            </Button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !isLoading && fileInputRef.current.click()}
          className={`group cursor-pointer text-center py-12 border-2 border-dashed rounded-xl border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6 text-slate-500 group-hover:text-blue-600" />}
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {isLoading ? "Uploading..." : "Click to upload your Resume"}
          </p>
          <p className="text-xs text-slate-400 mt-1">PDF format only (Max 5MB)</p>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />
    </div>
  )
}