import React from 'react';
import {
    Calendar, CheckCircle2,
    AlertCircle, TrendingUp,
    MessageSquare, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';

export default function DailyBriefing() {
    const brief = [
        { id: 1, type: 'interview', text: 'Strategic talent assessment: Sarah Chen @ 2:00 PM', urgency: 'high', icon: Clock },
        { id: 2, type: 'pending', text: '3 organizational nodes awaiting formal ratification', urgency: 'medium', icon: AlertCircle },
        { id: 3, type: 'success', text: '2 premium candidates have ratified their covenants!', urgency: 'low', icon: CheckCircle2 },
        { id: 4, type: 'feedback', text: '5 stakeholder evaluations awaiting synthesis', urgency: 'medium', icon: MessageSquare },
    ];

    return (
        <div className="glass-card p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-black text-lg leading-none">Daily Briefing</h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                        Critical operational signals and immediate strategic interventions.
                    </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-xl text-primary font-black text-[10px] uppercase tracking-widest px-4">
                    Dec 25
                </div>
            </div>

            <div className="space-y-4">
                {brief.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => toast.info(`Viewing details for: ${item.text}`)}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 group hover:border-primary/50 transition-all cursor-pointer"
                    >
                        <div className={`p-2 rounded-xl shrink-0 ${item.urgency === 'high' ? 'bg-accent/10 text-accent' :
                            item.urgency === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-emerald-500/10 text-emerald-500'
                            }`}>
                            <item.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold leading-tight line-clamp-2">{item.text}</p>
                            <span className="text-[10px] uppercase font-black tracking-tighter opacity-50">
                                {item.urgency} priority
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => toast.success("Reminder set for 15 minutes.")}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-border/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-all"
            >
                + Set Custom Reminder
            </button>
        </div>
    );
}
