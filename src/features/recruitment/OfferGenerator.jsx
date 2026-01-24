import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Send, Sparkles, FileText,
    TrendingUp, Rocket, Calendar, PhoneCall,
    CheckCircle2, Copy, Eye, Layout
} from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function OfferGenerator({ candidate, onClose }) {
    const [step, setStep] = useState(1); // 1: Confirmation, 2: Components, 3: Preview
    const [confirmedCall, setConfirmedCall] = useState(false);
    const [offerData, setOfferData] = useState({
        baseSalary: '165,000',
        bonus: '15%',
        equity: '25,000 units',
        startDate: 'Feb 1, 2026',
        growthPath: 'Staff Engineering Track',
        onboardingLead: 'Sarah Chen'
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const generateOffer = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setStep(3);
            toast.success("Strategic offer package synthesized.");
        }, 1500);
    };

    const handleSend = () => {
        toast.success(`Formal offer sent to ${candidate.name}. 48h SLA active.`);
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
                            <Rocket className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Offer Intelligence</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Closing Excellence • {candidate.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8 py-4"
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100">
                                        <PhoneCall className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-black text-lg">Did you re-close the candidate?</h3>
                                        <p className="text-xs text-muted-foreground max-w-[320px] mx-auto leading-relaxed">
                                            Best practice: Never send an offer without a verbal confirmation. Discuss compensation and growth paths early.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 bg-muted/30 rounded-3xl border border-border/50 space-y-4">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div
                                            onClick={() => setConfirmedCall(!confirmedCall)}
                                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${confirmedCall ? 'bg-primary border-primary' : 'border-border/50 border-dashed group-hover:border-primary/50'}`}
                                        >
                                            {confirmedCall && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>
                                        <span className="text-sm font-bold">I have called {candidate.name} and confirmed verbal alignment.</span>
                                    </label>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        disabled={!confirmedCall}
                                        onClick={() => setStep(2)}
                                        className="px-10 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-30 hover:bg-zinc-800 transition-all"
                                    >
                                        Proceed to Packaging
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Base Salary (USD)</label>
                                        <input
                                            value={offerData.baseSalary}
                                            onChange={(e) => setOfferData({ ...offerData, baseSalary: e.target.value })}
                                            className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Annual Bonus</label>
                                        <input
                                            value={offerData.bonus}
                                            onChange={(e) => setOfferData({ ...offerData, bonus: e.target.value })}
                                            className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Growth Path (Rose Gold Promise)</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                        <input
                                            value={offerData.growthPath}
                                            onChange={(e) => setOfferData({ ...offerData, growthPath: e.target.value })}
                                            className="w-full bg-muted/50 border border-border/50 rounded-xl pl-12 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                        <Layout className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-primary">Onboarding Preview</p>
                                        <p className="text-xs font-bold text-muted-foreground">We'll include a 30-day impact roadmap to build confidence.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={generateOffer}
                                    disabled={isGenerating}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Synthesizing Experience...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Generate Growth-Centric Offer
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <FileText className="w-24 h-24" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black">Hey {candidate.name.split(' ')[0]}, Welcome Home.</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            We don't just see a {candidate.role}. We see a future leader on our <strong>{offerData.growthPath}</strong>.
                                            Here's how we'll build your legacy together.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-border/30">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Total Rewards</p>
                                            <p className="text-sm font-black">${offerData.baseSalary} + {offerData.bonus} Bonus</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-border/30">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Growth Promise</p>
                                            <p className="text-sm font-black">{offerData.growthPath}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">30-Day Impact Roadmap</p>
                                        <div className="space-y-2">
                                            {[
                                                "Week 1: Foundations & Cultural Immersion",
                                                "Week 2: Collaborative Contribution with Sarah Chen",
                                                "Week 4: Launch of first high-impact initiative"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs font-medium">
                                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="flex-1 py-4 bg-muted text-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Refine Package
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        className="flex-[2] py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send formal Offer
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Indicator */}
                <div className="p-4 bg-muted/10 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[8px] font-black uppercase text-muted-foreground">Expires: {offerData.startDate} (48h Window)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Closing Priority: High</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
