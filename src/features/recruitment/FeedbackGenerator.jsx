import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Send, Sparkles, MessageSquare,
    Target, BookOpen, Clock, ShieldAlert,
    CheckCircle2, Copy, RefreshCw
} from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function FeedbackGenerator({ candidate, onClose }) {
    const [reason, setReason] = useState('Technical Fit');
    const [tone, setTone] = useState('Encouraging');
    const [feedback, setFeedback] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [genStep, setGenStep] = useState(0);

    const steps = [
        "Analyzing interview notes...",
        "Identifying growth opportunities...",
        "Structuring constructive critique...",
        "Personalizing career resources..."
    ];

    const generateFeedback = () => {
        setIsGenerating(true);
        setGenStep(0);

        const interval = setInterval(() => {
            setGenStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    finalizeFeedback();
                    return prev;
                }
                return prev + 1;
            });
        }, 800);
    };

    const finalizeFeedback = () => {
        const mockFeedback = `Hi ${candidate.name},\n\nThank you for sharing your journey with us. While we've decided not to move forward for the ${candidate.role} position at this time, I wanted to provide some specific feedback as promised.\n\nYour expertise in ${candidate.tags?.[0] || 'your core stack'} was impressive, particularly your approach to system design. However, we're looking for a bit more depth in ${reason === 'Technical Fit' ? 'distributed systems at scale' : 'cross-functional leadership'}.\n\nI truly believe in your potential. Here are a few resources that might help for future roles:\n1. [Resource] Mastering Distributed Systems\n2. [Resource] The Staff Engineer's Guide\n\nLet's stay in touch. We keep all high-potential profiles in our Silver Medalist pool for future consideration.\n\nBest,\nElena G. (Single Point of Contact)`;
        setFeedback(mockFeedback);
        setIsGenerating(false);
        toast.success("Personalized feedback generated.");
    };

    const handleSend = () => {
        toast.success(`Rejection protocol closed for ${candidate.name}. Loop closed.`);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Constructive Feedback</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Candidate Experience SLA: 5-Day Window</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-muted-foreground">Primary Reason</label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                            >
                                <option>Technical Fit</option>
                                <option>Experience Level</option>
                                <option>Cultural Alignment</option>
                                <option>Role Rescinded</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-muted-foreground">Feedback Tone</label>
                            <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
                                {['Direct', 'Encouraging'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTone(t)}
                                        className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${tone === t ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generator Area */}
                    {!feedback && !isGenerating && (
                        <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-3xl space-y-4">
                            <div className="p-4 bg-primary/5 rounded-full">
                                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-sm uppercase mb-1">AI Feedback Synthesis</h3>
                                <p className="text-xs text-muted-foreground max-w-[280px] leading-relaxed">
                                    Craft a meaningful rejection that preserves candidate sentiment and helps their career.
                                </p>
                            </div>
                            <button
                                onClick={generateFeedback}
                                className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate Custom Feedback
                            </button>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="py-20 flex flex-col items-center justify-center space-y-6">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-sm font-black text-primary animate-pulse">{steps[genStep]}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Applying Human-Centric Language Filter</p>
                            </div>
                        </div>
                    )}

                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <label className="text-[10px] font-black uppercase text-muted-foreground flex items-center justify-between">
                                Generated Message
                                <button onClick={() => setFeedback('')} className="text-primary hover:underline flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" /> Re-sythesize
                                </button>
                            </label>
                            <div className="relative group">
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full h-64 bg-muted/30 border border-border/30 rounded-[2rem] p-6 text-sm font-medium leading-relaxed outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none scrollbar-hide"
                                />
                                <button
                                    onClick={() => { navigator.clipboard.writeText(feedback); toast.success("Copied to clipboard."); }}
                                    className="absolute top-4 right-4 p-2 bg-white border border-border/50 rounded-xl opacity-0 group-hover:opacity-100 hover:text-primary transition-all shadow-xl"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pb-4">
                                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 text-green-600" />
                                    <div className="text-[8px] font-black uppercase text-green-700">Ghosting Goal:<br />Safe</div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    <div className="text-[8px] font-black uppercase text-blue-700">Feedback Type:<br />Constructive</div>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                    <div className="text-[8px] font-black uppercase text-amber-700">SLA Status:<br />2 Days Left</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!feedback}
                        className="px-8 py-3 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 hover:bg-zinc-800 transition-all flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Send & Close Loop
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
