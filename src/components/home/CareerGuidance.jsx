'use client'

import React, { useState } from 'react'
import { Sparkle, X, Lightbulb, BrainCircuit, Loader2, Plus, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const CareerGuidance = () => {
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    // Ab guidance aur jobs dono ke liye state
    const [aiResult, setAiResult] = useState({ guidance: "", jobs: [] });

    const addSkill = () => {
        const trimmedSkill = currentSkill.trim();
        if (!trimmedSkill) return;
        if (skills.includes(trimmedSkill)) {
            toast.warning("Pehle se add hai!");
            setCurrentSkill("");
            return;
        }
        setSkills([...skills, trimmedSkill]);
        setCurrentSkill("");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmitToAI = async () => {
        if (skills.length === 0) {
            toast.error("Bhai, skills toh likho!");
            return;
        }

        setLoading(true);
        
        try {
            // Simulated API Response with Jobs
            setTimeout(() => {
                setAiResult({
                    guidance: `Aapka tech stack (${skills.join(", ")}) kaafi solid hai. Career growth ke liye architecture aur system design par focus karein.`,
                    jobs: ["Full Stack Developer", "Technical Architect", "Product Engineer", "DevOps Specialist"]
                });
                setLoading(false);
                setIsOpen(true);
            }, 1500);
        } catch (error) {
            toast.error("Error aa gaya!");
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
                
                <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                    <div className="flex w-full gap-2">
                        <Input 
                            placeholder="Type a skill (e.g. React...)" 
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button variant="outline" size="icon" onClick={addSkill} type="button">
                            <Plus size={18} />
                        </Button>
                    </div>

                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center py-2">
                            {skills.map((skill) => (
                                <span key={skill} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-100">
                                    {skill}
                                    <X size={14} className="cursor-pointer" onClick={() => removeSkill(skill)} />
                                </span>
                            ))}
                        </div>
                    )}

                    <Button onClick={handleSubmitToAI} disabled={loading} className="w-full">
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
                            AI Personal Mentor
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                        {/* Guidance Section */}
                        <div>
                            <h4 className="text-sm font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                                <Lightbulb size={16} className="text-yellow-500" /> 
                                Career Guidance
                            </h4>
                            <div className="bg-muted p-4 rounded-lg border italic text-sm leading-relaxed">
                                "{aiResult.guidance}"
                            </div>
                        </div>

                        {/* Recommended Jobs Section */}
                        <div>
                            <h4 className="text-sm font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                                <Briefcase size={16} className="text-blue-600" /> 
                                Recommended Jobs
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {aiResult.jobs.map((job, index) => (
                                    <span key={index} className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-md text-xs font-semibold border border-blue-100 dark:border-blue-900">
                                        {job}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t">
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