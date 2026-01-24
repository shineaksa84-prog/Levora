import { useState, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../lib/services/toastService';

export default function OutreachGenerator({ candidate, onClose }) {
    const [mode, setMode] = useState('passive'); // passive, active, referral
    const [insight, setInsight] = useState('');
    const [message, setMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = message.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(words);
    }, [message]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            let firstLine = `Hi ${candidate.name.split(' ')[0]}, I noticed your work on ${candidate.role} and was genuinely impressed by your background.`;

            let body = mode === 'passive'
                ? `I wanted to share a recent engineering deep-dive our team published about scaling architecture. Given your expertise, I thought you'd find it insightful.`
                : `We're building something extremely unique in the ${candidate.role} space and your specific experience at your previous companies makes you a standout fit for what's next.`;

            let closing = `Would love to connect and share some of the interesting challenges we're solving. No pressure at all—just looking to build a relationship with top-tier talent.`;

            setMessage(`${firstLine}\n\n${body}\n\n${closing}`);
            setIsGenerating(false);
            toast.success("Strategic outreach generated.");
        }, 1200);
    };

    const handleCopy = () => {
        if (wordCount > 120) {
            toast.error("Message exceeds strategic 120-word limit.");
            return;
        }
        navigator.clipboard.writeText(message);
        toast.success("Outreach copied to clipboard!");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-card border border-primary/20 shadow-2xl rounded-[2rem] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-8 border-b border-border/50 bg-vibrant-mesh relative">
                    <button onClick={onClose} className="absolute top-6 right-8 text-muted-foreground hover:text-foreground font-black text-xl">×</button>
                    <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Outreach Protocol</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter">Strategic <span className="text-primary">Engagement</span></h2>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Crafting high-impact, low-friction messages for passive talent.</p>
                </div>

                <div className="p-8 space-y-6 overflow-y-auto">
                    <div className="flex gap-2">
                        {['passive', 'active', 'referral'].map(t => (
                            <button
                                key={t}
                                onClick={() => setMode(t)}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${mode === t ? 'bg-primary text-white border-primary shadow-lg' : 'bg-muted border-border/50 text-muted-foreground hover:bg-muted/80'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <p className="text-xs font-bold text-primary italic">Strategy Guide</p>
                                <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">
                                    {mode === 'passive' ? "Focus on sharing value (insights, papers, tech blogs) rather than asking for a call immediately. Target: Passive Intelligence." :
                                        mode === 'active' ? "Be direct but brief. Mention specific accomplishments. Keep it under 120 words to maximize mobile reading." :
                                            "Leverage the common connection. Relational trust is higher for referrals."}
                                </p>
                            </div>
                        </div>

                        <div className="bg-muted/30 rounded-2xl border border-border/50 p-1">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Strategic message will appear here..."
                                className="w-full bg-transparent p-6 text-sm font-medium h-48 outline-none resize-none no-scrollbar"
                            />
                            <div className="p-4 border-t border-border/50 flex justify-between items-center bg-card/50 rounded-b-2xl">
                                <div className="flex items-center gap-2">
                                    <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${wordCount > 120 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {wordCount} / 120 Words
                                    </div>
                                    {wordCount > 120 && <AlertCircle className="w-3 h-3 text-red-500" />}
                                </div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:scale-105 transition-all"
                                >
                                    {isGenerating ? "Synthesizing..." : "Re-generate with AI"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-muted/20 border-t border-border/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-white border border-border/50 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted transition-all active:scale-95"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!message}
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        Copy to Protocol
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
