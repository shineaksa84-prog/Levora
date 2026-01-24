import React, { useState } from 'react';
import {
    Plus, UserPlus, Briefcase,
    FileText, Zap, X,
    ChevronUp, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const actions = [
        { id: 'candidate', label: 'Add Candidate', icon: UserPlus, color: 'bg-primary', action: () => navigate('/app/candidates') },
        { id: 'job', label: 'Create Job', icon: Briefcase, color: 'bg-accent', action: () => navigate('/app/jobs') },
        { id: 'payroll', label: 'Run Payroll', icon: Zap, color: 'bg-violet', action: () => navigate('/app/compensation') },
        { id: 'report', label: 'New Report', icon: FileText, color: 'bg-secondary', action: () => navigate('/app/analytics') },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 mb-4 space-y-2 pointer-events-auto"
                    >
                        {actions.map((action, i) => (
                            <motion.button
                                key={action.id}
                                onClick={() => {
                                    action.action();
                                    setIsOpen(false);
                                }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 w-max ml-auto bg-white border border-border/50 p-2 pr-4 rounded-2xl shadow-xl hover:scale-105 transition-all group"
                            >
                                <div className={`p-2 rounded-xl text-white ${action.color} shadow-lg shadow-black/5`}>
                                    <action.icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                                    {action.label}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all shadow-2xl active:scale-95 ${isOpen ? 'bg-slate-900 text-white rotate-45' : 'bg-primary text-white hover:scale-110'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6 -rotate-45" /> : <ChevronUp className="w-6 h-6" />}
            </button>
        </div>
    );
}
