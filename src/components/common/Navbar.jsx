"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Briefcase, Info, LogIn, LogOut, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const isAuth = false; // Replace with your auth logic

  const logoutHandler = () => {
    console.log("Logged out");
  };

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
          {isAuth ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="focus:outline-none transition-transform active:scale-95">
                  <Avatar className="h-9 w-9 border-2 border-blue-100 hover:border-blue-500 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-blue-600 text-white">JX</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-2 mt-2" align="end">
                <div className="flex items-center gap-3 p-3 mb-2 bg-slate-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">JX</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-900 leading-none">Jinex Dev</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">jinex@gmail.com</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Link href="/account">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                      <User size={16} /> My Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                      <LayoutDashboard size={16} /> Dashboard
                    </Button>
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={logoutHandler}
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2">
                <LogIn size={16} /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink Component for cleaner code
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