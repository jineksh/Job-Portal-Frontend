"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
    Upload, CheckCircle2, AlertTriangle, Loader2, ArrowRight, BrainCircuit, Lightbulb
} from "lucide-react";

const ResumeAnalyzer = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile?.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Bhai, sirf PDF upload karo!");
        }
    };

    const analyzeResume = async () => {
        if (!file) return;
        setLoading(true);

        // Dummy Data
        setTimeout(() => {
            setResponse({
                atsScore: 78,
                summary: "Aapka resume professional hai, lekin technical keywords ki thodi kami hai.",
                scoreBreakdown: {
                    content: { score: 85, feedback: "Work history is detailed." },
                    keywords: { score: 62, feedback: "Missing Docker, AWS, and Redis." },
                    formatting: { score: 92, feedback: "Clean single-column layout." }
                },
                strengths: ["Clean Layout", "Strong Action Verbs", "Quantifiable Metrics"],
                suggestions: [
                    { category: "Keywords", priority: "high", recommendation: "Add 'System Design' to skills." },
                    { category: "Metrics", priority: "medium", recommendation: "Add percentages to projects." }
                ]
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 dark:bg-blue-950/30 text-blue-600 mb-4">
                    <span className="text-sm font-medium">AI Resume Scanner</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Optimize Your Resume</h2>

                <Dialog open={open} onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) setResponse(null); // Reset on close
                }}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="px-8 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg gap-2">
                            Analyze Resume <ArrowRight size={18} />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none rounded-2xl">
                        {/* accessibility ke liye DialogHeader hamesha bahar rakha hai */}
                        <DialogHeader className="p-6 border-b bg-blue-50/50 dark:bg-blue-900/10">
                            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                                <BrainCircuit className="text-blue-600" size={24} />
                                {response ? "Analysis Result" : "Upload Resume"}
                            </DialogTitle>
                        </DialogHeader>

                        {!response ? (
                            <div className="p-8 flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full max-w-md border-2 border-dashed border-blue-100 dark:border-blue-900 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/10 transition-all"
                                >
                                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Upload className="text-blue-600" size={24} />
                                    </div>
                                    <p className="font-semibold text-sm">{file ? file.name : "Select PDF File"}</p>
                                    <p className="text-slate-500 text-[10px] mt-1 italic">Maximum size 5MB</p>
                                </div>
                                <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileSelect} />
                                <Button onClick={analyzeResume} disabled={loading || !file} className="mt-6 w-full max-w-md h-11 bg-blue-600">
                                    {loading ? <Loader2 className="animate-spin mr-2 size={18}" /> : "Analyze"}
                                </Button>
                            </div>
                        ) : (
                            <div className="p-6 md:p-8 space-y-8 bg-white dark:bg-slate-950">
                                {/* Score & Summary */}
                                <div className="flex flex-col md:flex-row gap-8 items-center border-b pb-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-[6px] border-blue-100 dark:border-blue-900">
                                            <span className="text-2xl font-black text-blue-600">{response.atsScore}%</span>
                                        </div>
                                        <p className="text-[10px] font-bold uppercase mt-2 opacity-50 tracking-widest">ATS Score</p>
                                    </div>
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <h4 className="font-bold flex items-center justify-center md:justify-start gap-2 text-sm">
                                            <Lightbulb size={16} className="text-blue-600" /> Summary
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                                            "{response.summary}"
                                        </p>
                                    </div>
                                </div>

                                {/* Breakdown & Strengths */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Score Audit</h4>
                                        {Object.entries(response.scoreBreakdown).map(([key, val]) => (
                                            <div key={key} className="space-y-1">
                                                <div className="flex justify-between text-[11px] font-bold capitalize">
                                                    <span>{key}</span>
                                                    <span className="text-blue-600">{val.score}%</span>
                                                </div>
                                                <Progress value={val.score} className="h-1" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-green-50/50 dark:bg-green-950/10 p-5 rounded-xl border border-green-100 dark:border-green-900">
                                        <h4 className="text-xs font-bold uppercase text-green-700 mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={14} /> Strengths
                                        </h4>
                                        <ul className="space-y-2">
                                            {response.strengths.map((s, i) => (
                                                <li key={i} className="text-[11px] flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                    <div className="w-1 h-1 bg-green-500 rounded-full" /> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommendations</h4>
                                    <div className="grid gap-3">
                                        {response.suggestions.map((s, i) => (
                                            <div key={i} className="flex gap-3 p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50">
                                                <AlertTriangle size={18} className="text-yellow-600 shrink-0" />
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h5 className="text-[11px] font-bold">{s.category}</h5>
                                                        <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 rounded uppercase font-bold">{s.priority}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">{s.recommendation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button onClick={() => setResponse(null)} variant="outline" className="w-full text-xs h-10">
                                    Analyze Another Resume
                                </Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;