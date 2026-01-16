'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, CheckCircle2,Loader2 } from "lucide-react"
import { useProfileActions } from "@/customHooks/profile/useProfileActions"
import React from "react"
export const Header = ({ user }) => {

    const { uploadPicMutation } = useProfileActions();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);
            uploadPicMutation.mutate(formData);
        }
    };


    return (
        <div className="h-40 w-full bg-slate-900 relative">
            <div className="absolute -bottom-12 left-8 md:left-16 flex items-end gap-6">
                <div className="relative group">
                    <Avatar className="h-28 w-28 border-4 border-white shadow-md bg-slate-100 overflow-hidden">
                        <AvatarImage
                            src={user?.profilePic}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600">
                            {user?.name?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    <label className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg cursor-pointer transition-all ${uploadPicMutation.isPending ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                        {uploadPicMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Camera className="w-4 h-4" />
                        )}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploadPicMutation.isPending}
                        />
                    </label>
                </div>

                <div className="mb-2 pt-3">
                    <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
                    <p className="text-slate-500 text-sm font-medium italic">{user?.bio}</p>
                </div>
            </div>
        </div>
    );
}