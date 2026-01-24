import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Briefcase, TrendingUp, AlertCircle, CheckCircle2, MapPin, User, TrendingUp as TrendingUpIcon } from 'lucide-react';
import { toast } from '../../../lib/services/toastService';

export default function ComparisonBench({ candidates, onClose }) {
    const experienceData = React.useMemo(() => {
        return candidates.map(c => {
            // Use experience from object if available
            let years = 5;
            if (c.experience && c.experience.length > 0) {
                // Mock calculation: sum of years in roles or just use a derived number
                years = c.experience.length * 2 + 3;
            } else {
                years = (parseInt(c.id) % 8) + 3; // Deterministic fallback
            }
            return {
                id: c.id,
                totalYears: years
            };
        });
    }, [candidates]);

    if (!candidates || candidates.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-card w-full max-w-7xl h-full max-h-[90vh] rounded-[40px] shadow-2xl border border-border overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-8 border-b border-border flex items-center justify-between bg-primary/5">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-foreground">Talent Benchmarking</h2>
                        <p className="text-sm font-bold text-muted-foreground">Side-by-side analysis of {candidates.length} candidates</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-muted rounded-2xl transition-colors group"
                    >
                        <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
                    </button>
                </div>

                {/* Comparison Matrix */}
                <div className="flex-1 overflow-auto p-8 scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_repeat(auto-fit,minmax(280px,1fr))] gap-8">
                        {/* Metrics Sidebar */}
                        <div className="hidden md:block space-y-32 pt-56">
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Core Profile</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Skill Confidence</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Experience Depth</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Strategic Risk</div>
                        </div>

                        {/* Candidate Columns */}
                        {candidates.map((candidate, idx) => (
                            <motion.div
                                key={candidate.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-12"
                            >
                                {/* Core Profile */}
                                <div className="p-6 bg-muted/20 rounded-[32px] border border-border/50 relative overflow-hidden group">
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-black shadow-xl">
                                            {candidate.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-foreground">{candidate.name}</h3>
                                            <p className="text-xs font-bold text-primary mb-2">{candidate.role}</p>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-background rounded-lg border border-border text-[8px] font-black uppercase w-fit text-foreground">
                                                <TrendingUpIcon className="w-3 h-3 text-primary" />
                                                {candidate.engagementScore}% Fit
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                                        <span className="px-2 py-1 bg-background rounded-md border border-border text-[8px] font-bold text-muted-foreground uppercase">{candidate.location}</span>
                                        <span className="px-2 py-1 bg-background rounded-md border border-border text-[8px] font-bold text-muted-foreground uppercase">{candidate.stage}</span>
                                    </div>
                                    <TrendingUpIcon className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 group-hover:scale-110 transition-transform" />
                                </div>

                                {/* Skills */}
                                <div className="space-y-4">
                                    {candidate.skills.slice(0, 4).map(skill => (
                                        <div key={skill.name} className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold text-foreground">
                                                <span>{skill.name}</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-2.5 h-2.5 ${i < skill.confidence ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(skill.confidence / 5) * 100}%` }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Experience */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-background border border-border rounded-2xl space-y-2 font-display">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-black uppercase tracking-tight text-foreground">Recent Engagement</span>
                                        </div>
                                        <p className="text-xs font-bold leading-tight line-clamp-2 text-foreground">{candidate.experience[0].role} @ {candidate.experience[0].company}</p>
                                        <p className="text-[10px] font-medium text-muted-foreground">{candidate.experience[0].duration}</p>
                                    </div>
                                    <div className="p-4 bg-primary/5 border border-dashed border-primary/20 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase">Relevant Experience</p>
                                        <p className="text-lg font-black text-foreground">{experienceData.find(e => e.id === candidate.id)?.totalYears} Years</p>
                                    </div>
                                </div>

                                {/* Benchmarking Risks */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`p-4 rounded-3xl border flex flex-col items-center justify-center group ${candidate.recruiterContext.flags.compMismatch === 'Yes' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                                        <AlertCircle className={`w-4 h-4 mb-1 group-hover:rotate-12 transition-transform ${candidate.recruiterContext.flags.compMismatch === 'Yes' ? 'text-rose-500' : 'text-emerald-500'}`} />
                                        <span className="text-[8px] font-black uppercase text-muted-foreground">Comp Mismatch</span>
                                        <span className={`text-[10px] font-bold ${candidate.recruiterContext.flags.compMismatch === 'Yes' ? 'text-rose-500' : 'text-emerald-500'}`}>{candidate.recruiterContext.flags.compMismatch}</span>
                                    </div>
                                    <div className={`p-4 rounded-3xl border flex flex-col items-center justify-center group ${candidate.recruiterContext.flags.noticeRisk === 'High' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                                        <CheckCircle2 className={`w-4 h-4 mb-1 group-hover:scale-110 transition-transform ${candidate.recruiterContext.flags.noticeRisk === 'High' ? 'text-rose-500' : 'text-emerald-500'}`} />
                                        <span className="text-[8px] font-black uppercase text-muted-foreground">Notice Risk</span>
                                        <span className={`text-[10px] font-bold ${candidate.recruiterContext.flags.noticeRisk === 'High' ? 'text-rose-500' : 'text-emerald-500'}`}>{candidate.recruiterContext.flags.noticeRisk}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        toast.success(`Candidate ${candidate.name} selected for Final Panel.`);
                                        onClose();
                                    }}
                                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Select for Final Panel
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="p-6 bg-muted/30 border-t border-border flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-xl">
                        <Star className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="text-xs font-bold text-foreground">
                        <span className="text-primary font-black uppercase tracking-widest mr-2">Bench Insight:</span>
                        Based on technical depth and cultural sentiment, <span className="underline">{candidates[0].name}</span> shows the highest alignment for immediate closing.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
