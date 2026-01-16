"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Briefcase, Info, LogIn, LogOut, User, LayoutDashboard, UserCircle, UserPlus, Loader2 } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/customHooks/profile/useUser"; // Fresh data yahan se aayega

export default function Navbar() {
    // 1. Auth context se sirf logout aur initial loading lo
    const { logout, loading: authLoading } = useAuth();

    // 2. TanStack Query se fresh user data lo jo Profile page ke saath sync rahega
    const { user: freshUser, isLoading: queryLoading } = useUser();

    // Combined loading state
    const isLoading = authLoading || queryLoading;

    // Fresh user exist karta hai toh login hai
    const isAuth = !!freshUser;

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };

    // Loading state UI (Hydration se bachne ke liye)
    // if (isLoading && !freshUser) {
    //     return (
    //         <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-4 md:px-8 h-16 flex items-center justify-between">
    //             <div className="flex items-center gap-2 font-bold text-blue-600">HireMe</div>
    //             <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
    //         </nav>
    //     );
    // }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between">

                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            HireMe
                        </span>
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/" icon={<Home size={18} />} label="Home" />
                    <NavLink href="/jobs" icon={<Briefcase size={18} />} label="Jobs" />
                    <NavLink href="/about" icon={<Info size={18} />} label="About" />
                </div>

                {/* Right: Auth Section */}
                <div className="flex items-center gap-4">
                    <ModeToggle />

                    {isAuth ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border border-blue-100 hover:opacity-80 transition-opacity">
                                    <AvatarImage src={freshUser?.profilePic || ""} /> 
                                    <AvatarFallback className="bg-blue-600 text-white">
                                        {getInitials(freshUser?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-64 p-2" align="end">
                                <div className="flex items-center gap-3 p-3 mb-2 bg-slate-50 rounded-lg">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={freshUser?.profilePic || ""} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700">
                                            {getInitials(freshUser?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-sm font-bold text-gray-900 leading-none truncate">
                                            {freshUser?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            {freshUser?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Link href="/profile">
                                        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                            <User size={16} /> My Profile
                                        </Button>
                                    </Link>
                                    <Link href={freshUser?.roleId === 1 ? '/admin/dashboard' : '/dashboard'}>
                                        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                            <LayoutDashboard size={16} /> Dashboard
                                        </Button>
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={logout}
                                    >
                                        <LogOut size={16} /> Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                    <UserCircle size={28} className="text-gray-600" />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent className="w-48 p-2 mt-2" align="end">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">Account</p>
                                    <Link href="/login">
                                        <Button variant="ghost" className="w-full justify-start gap-3 hover:text-blue-600">
                                            <LogIn size={18} /> Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="ghost" className="w-full justify-start gap-3 hover:text-blue-600">
                                            <UserPlus size={18} /> Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, icon, label }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-all relative group py-2"
        >
            {icon}
            <span>{label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
        </Link>
    );
}