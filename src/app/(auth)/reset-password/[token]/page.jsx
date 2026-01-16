'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/axios'; // Tera Axios instance
import { toast } from "sonner";
import { Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';  

export default function ResetPasswordPage() {
  const params = useParams(); 
  const router = useRouter();
  const token = params.token; // Ye wahi JWT token utha lega jo link mein hai

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPassword) => {
      // Backend endpoint: router.put('/reset-password/:token')
      // Note: Backend URL agar 'auth/reset-password' hai toh check kar lena
      const response = await authApi.put(`auth/reset-password/${token}`, { 
        password: newPassword 
      });
      return response.data;
    },
    onSuccess: () => {
     toast.success("Password updated successfully!");
      setTimeout(() => router.push('/login'), 1000);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Invalid or Expired Link";
      toast.error(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    mutate(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-[400px] bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-center mb-6">Create New Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">New Password</label>
            <Input 
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Confirm Password</label>
            <Input 
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl mt-4"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}