import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Database, Inbox } from 'lucide-react';

export default function EmptyState({
    title = "No Data Found",
    description = "It looks like your neural workspace is currently dormant. Let's start by adding some fresh data.",
    icon: Icon = Inbox,
    actionLabel,
    onAction
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 glass-card border-dashed border-2 border-white/5 text-center min-h-[400px]"
        >
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <Icon className="w-10 h-10 text-primary relative z-10" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-white mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
                {description}
            </p>

            {actionLabel && (
                <button
                    onClick={onAction}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black text-xs hover:scale-105 transition-all active:scale-95 shadow-xl shadow-white/5 active:shadow-none"
                >
                    <Plus className="w-4 h-4" />
                    {actionLabel}
                </button>
            )}

            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-30">
                <Database className="w-3 h-3" />
                Storage Protocol Active
            </div>
        </motion.div>
    );
}
