'use client'

import React, { useState } from 'react'
import {
    User, Mail, Lock, FileText, Loader2, ArrowRight,
    Briefcase, Info
} from 'lucide-react'
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { toast } from "sonner"
import Link from 'next/link'
import { useRegister } from '@/customHooks/auth/regsiter'

const RegisterPage = () => {
    const { mutate, isPending, isError } = useRegister();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "job_seeker",
        bio: "",
        resume: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file?.type === "application/pdf") {
            setFormData({ ...formData, resume: file });
            toast.success("Resume attached!");
        } else {
            toast.error("Please upload PDF only");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("bio", formData.bio);

        if (formData.resume) {
            data.append("resume", formData.resume);
        }

        mutate(data);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-lg shadow-sm border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 bg-white dark:bg-slate-900 border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">HireMe</span>
                    </div>
                    <CardTitle className="text-xl font-bold">Create an account</CardTitle>
                    <CardDescription className="text-sm">
                        Enter your details to join the HireMe community.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="pt-6 space-y-4">
                        {/* Name Section */}
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider opacity-70">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="name" name="name" placeholder="John Doe" className="pl-9 h-10" onChange={handleInputChange} required />
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider opacity-70">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="email" name="email" type="email" placeholder="john@example.com" className="pl-9 h-10" onChange={handleInputChange} required />
                            </div>
                        </div>

                        {/* Role & Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold uppercase tracking-wider opacity-70">I am a</Label>
                                <Select onValueChange={(v) => setFormData({ ...formData, role: v })} defaultValue="job_seeker">
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="job_seeker">job_seeker</SelectItem>
                                        <SelectItem value="recruiter">recruiter</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider opacity-70">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-9 h-10" onChange={handleInputChange} required />
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="space-y-1.5">
                            <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider opacity-70">Bio (Optional)</Label>
                            <Input id="bio" name="bio" placeholder="Briefly describe yourself" className="h-10" onChange={handleInputChange} />
                        </div>

                        {/* Resume Section - Only for Job Seeker */}
                        {formData.role === "job_seeker" && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label className="text-xs font-semibold uppercase tracking-wider opacity-70">Resume (PDF)</Label>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-10 border-dashed border-2 flex gap-2 text-slate-500 hover:text-blue-600 hover:border-blue-200"
                                        onClick={() => document.getElementById('resume-file').click()}
                                    >
                                        <FileText size={16} />
                                        <span className="truncate">{formData.resume ? formData.resume.name : "Upload Resume"}</span>
                                    </Button>
                                    <input id="resume-file" type="file" hidden accept=".pdf" onChange={handleFileChange} />
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 pb-8 pt-6">
                        <Button disabled={isPending} className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold">
                            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}
                        </Button>
                        <p className="text-xs text-center text-slate-500">
                            Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">log in</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default RegisterPage;