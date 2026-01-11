'use client'

import React, { useState } from 'react'
import { Sparkle, X, Lightbulb, BrainCircuit, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const SUGGESTED_SKILLS = ["React", "Node.js", "Python", "Data Science", "UI/UX Design", "DevOps"];

const CareerGuidance = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [aiGuidance, setAiGuidance] = useState("");

    const addSkill = (skill) => {
        if (skills.includes(skill)) {
            toast.warning("Pehle se add hai bhai!");
            return;
        }
        setSkills([...skills, skill]);
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmitToAI = async () => {
        if (skills.length === 0) {
            toast.error("Skills Missing!", {
                description: "Bhai, kam se kam ek skill toh chuno!",
            });
            return;
        }

        setLoading(true);
        
        try {
            // Yaha tumhari API call aayegi
            // const response = await fetch('/api/guidance', { method: 'POST', body: JSON.stringify({ skills }) });
            // const data = await response.json();
            
            // Dummy data for example:
            setTimeout(() => {
                setAiGuidance(`Based on your focus on ${skills.join(", ")}, you should aim for Senior Developer roles. Focus on System Design and Open Source contributions to boost your profile.`);
                setLoading(false);
                setIsOpen(true);
            }, 1500);

        } catch (error) {
            toast.error("Kuch error aa gaya!");
            setLoading(false);
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border dark:bg-blue-950 mb-4'>
                    <Sparkle size={16} className='text-blue-600' />
                    <span className='text-sm font-medium'>AI Career Mentor</span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>Discover Your Career Path</h2>
                <p className='text-lg text-muted-foreground mx-auto mb-8 max-w-2xl'>
                    Personalized guidance based on your tech stack.
                </p>

                <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                    <Select onValueChange={addSkill}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your skills" />
                        </SelectTrigger>
                        <SelectContent>
                            {SUGGESTED_SKILLS.map((skill) => (
                                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
                        {skills.map((skill) => (
                            <span key={skill} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-100">
                                {skill}
                                <X size={14} className="cursor-pointer" onClick={() => removeSkill(skill)} />
                            </span>
                        ))}
                    </div>

                    <Button onClick={handleSubmitToAI} disabled={loading} className="mt-4 w-full">
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Get AI Guidance"}
                    </Button>
                </div>
            </div>

            {/* --- BOX (MODAL) --- */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px] border-t-4 border-t-blue-600">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <BrainCircuit className="text-blue-600" />
                            AI Guidance
                        </DialogTitle>
                    </DialogHeader>
                    
                    {/* Hydration safe: Using Div instead of DialogDescription (P tag) */}
                    <div className="space-y-4 py-4">
                        <div className="bg-muted p-4 rounded-lg border italic text-sm md:text-base leading-relaxed">
                            "{aiGuidance}"
                        </div>
                        
                        <div className="flex items-start gap-3 text-sm text-muted-foreground border-t pt-4">
                            <Lightbulb size={18} className="text-yellow-500 shrink-0" />
                            <span>This advice is personalized for your current skill set.</span>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CareerGuidance;