import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, category, status = 'active' }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/40 rounded-3xl shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
        >
            {/* Background Gradient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />

            <div className="relative flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                        {status === 'beta' && (
                            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/20">
                                Beta
                            </span>
                        )}
                        <div className="w-8 h-8 rounded-full bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all cursor-pointer">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{category}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                    {description}
                </p>

                {/* Micro-interaction line */}
                <div className="mt-auto pt-6">
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            className="h-full bg-gradient-to-r from-primary to-accent"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
