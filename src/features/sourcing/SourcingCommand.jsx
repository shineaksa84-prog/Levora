import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Command, ArrowRight, Zap, Globe, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SourcingCommand({ onCommand }) {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [suggestion, setSuggestion] = useState(null);

    const interpretCommand = (val) => {
        const query = val.toLowerCase();
        if (query.includes('find') || query.includes('search') || query.includes('market')) {
            return { action: 'marketplace', label: 'Search External Marketplace', icon: Globe };
        }
        if (query.includes('internal') || query.includes('mobility') || query.includes('hipo')) {
            return { action: 'internal', label: 'View Internal Mobility', icon: Briefcase };
        }
        if (query.includes('outreach') || query.includes('campaign') || query.includes('send')) {
            return { action: 'campaigns', label: 'Manage Outreach Campaigns', icon: Mail };
        }
        return null;
    };

    useEffect(() => {
        if (input.length > 2) {
            setSuggestion(interpretCommand(input));
        } else {
            setSuggestion(null);
        }
    }, [input]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsProcessing(true);
        // Simulate AI logic
        setTimeout(() => {
            const cmd = interpretCommand(input);
            if (cmd) {
                onCommand(cmd.action, input);
            }
            setIsProcessing(false);
            setInput('');
        }, 800);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto z-50">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 animate-pulse pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative">
                <div className={`glass-card p-2 rounded-[2rem] border-2 transition-all duration-500 shadow-2xl ${isProcessing ? 'border-primary ring-4 ring-primary/10 scale-[1.02]' : 'border-white/10'
                    }`}>
                    <div className="flex items-center gap-4 px-6 py-2">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {isProcessing ? (
                                    <motion.div
                                        key="pulse"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center"
                                    >
                                        <Zap className="w-5 h-5 text-white animate-bounce" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sparkle"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type command: 'Find node engineers' or 'Internal HiPo'..."
                            className="flex-1 bg-transparent border-none outline-none text-lg font-black text-foreground placeholder:text-muted-foreground/30 py-4"
                            spellCheck="false"
                        />

                        <div className="flex items-center gap-3">
                            <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                <Command className="w-3 h-3" /> ENTER
                            </span>
                            <button
                                type="submit"
                                className="p-4 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {suggestion && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute mt-4 left-6 right-6 flex flex-wrap gap-2"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    onCommand(suggestion.action, input);
                                    setInput('');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-primary/30 rounded-xl text-[10px] font-black uppercase text-primary tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all group"
                            >
                                <suggestion.icon className="w-3 h-3 group-hover:scale-110" />
                                {suggestion.label}
                                <ArrowRight className="w-3 h-3" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            <div className="mt-6 flex justify-center gap-8 px-8">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Neural Engine Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">Vectors Indexed: 42k</span>
                </div>
            </div>
        </div>
    );
}
