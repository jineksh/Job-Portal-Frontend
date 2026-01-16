'use client'
import React, { useState, useEffect } from 'react' // useEffect add kiya
import { Briefcase, Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight, Globe } from 'lucide-react'
import { Button } from '../ui/button';

const Footer = () => {
  // 1. Year ko state mein rakhein
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // 2. Sirf mount hone ke baad date update karein (Hydration safety)
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl shadow-md">
                <Briefcase size={22} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Hire<span className="text-blue-600">Me</span>
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The world's most advanced AI-driven job portal. We bridge the gap between 
              top talent and global opportunities through smart resume optimization 
              and personalized career roadmaps.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600">Resources</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1 group">Resume Analyzer <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all"/></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1 group">Career Guidance <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all"/></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Job Search</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Skill Roadmap</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About HireMe</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Partner With Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600">Subscribe</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get the latest career tips and job alerts delivered to your inbox.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input 
                type="email" 
                placeholder="Email address" 
                autoComplete="off" // Extensions ke liye
                className="flex h-9 w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
              />
              <Button type="button" size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 px-4 text-xs">Join</Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              {/* Year safely rendered */}
              © {currentYear} HireMe Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[12px] text-slate-500 hover:text-blue-600">Privacy</a>
              <a href="#" className="text-[12px] text-slate-500 hover:text-blue-600">Terms</a>
              <a href="#" className="text-[12px] text-slate-500 hover:text-blue-600">Cookies</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors border-r pr-4 border-slate-200 dark:border-slate-800">
              <Globe size={14} />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-1">
              Made with <Heart size={12} className="text-red-500 fill-red-500" /> by <span className="text-slate-900 dark:text-white font-bold">HireMe Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;