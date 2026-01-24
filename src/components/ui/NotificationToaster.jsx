import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const ICON_MAP = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
};

const COLOR_MAP = {
    info: 'bg-primary border-primary/20 text-primary-foreground',
    warning: 'bg-amber-500 border-amber-500/20 text-white',
    success: 'bg-emerald-500 border-emerald-500/20 text-white',
};

export default function NotificationToaster() {
    const { notifications, removeNotification } = useStore();

    return (
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 max-w-sm w-full">
            <AnimatePresence>
                {notifications.map((n) => {
                    const Icon = ICON_MAP[n.type] || Info;
                    return (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`glass-card p-4 shadow-2xl border flex items-start gap-4 ${COLOR_MAP[n.type] || COLOR_MAP.info}`}
                        >
                            <div className="p-2 rounded-lg bg-white/20">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black text-xs uppercase tracking-widest">{n.title}</h4>
                                <p className="text-sm mt-1 opacity-90 leading-tight font-medium">{n.message}</p>
                            </div>
                            <button
                                onClick={() => removeNotification(n.id)}
                                className="p-1 hover:bg-white/10 rounded-md transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
