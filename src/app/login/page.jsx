'use client'

import React, { useState } from 'react'
import { Mail, Lock, Loader2, Briefcase, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useLogin } from '@/customHooks/auth/login'

const LoginPage = () => {
    const { mutate, isPending } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-6">
            <Card className="w-full max-w-[400px] shadow-lg border-slate-200 rounded-3xl overflow-hidden">
                <CardHeader className="text-center border-b bg-white dark:bg-slate-900 pb-6">
                    <div className="flex justify-center mb-3">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg">
                            <Briefcase size={20} className="text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">Welcome Back</CardTitle>
                    <CardDescription className="text-xs font-medium">Enter your credentials to access your account</CardDescription>
                </CardHeader>

                <form onSubmit={handleLogin}>
                    <CardContent className="pt-6 space-y-5">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input 
                                    name="email" 
                                    type="email" 
                                    placeholder="name@hireme.ai" 
                                    className="pl-9 h-11 rounded-xl focus-visible:ring-blue-600" 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Password</Label>
                                <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">Forgot?</span>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input 
                                    name="password" 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="pl-9 pr-10 h-11 rounded-xl focus-visible:ring-blue-600" 
                                    onChange={handleInputChange} 
                                    required 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 pb-8 pt-6">
                        <Button disabled={isPending} className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-md shadow-blue-100 transition-all">
                            {isPending ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">Login to Account <ArrowRight size={16} /></span>
                            )}
                        </Button>
                        <p className="text-xs text-slate-500 pt-8">
                            Don't have an account? <span 
                                onClick={() => router.push('/register')} 
                                className="text-blue-600 font-bold cursor-pointer hover:underline"
                            >
                                Register here
                            </span>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default LoginPage;