import { useState, useEffect } from 'react';
import { toast } from '../../lib/services/toastService';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        return toast.subscribe((message, type, duration) => {
            const id = Date.now();
            setToasts(prev => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        });
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const colors = {
        success: 'border-emerald-100 bg-emerald-50/90',
        error: 'border-red-100 bg-red-50/90',
        warning: 'border-amber-100 bg-amber-50/90',
        info: 'border-blue-100 bg-blue-50/90'
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md min-w-[300px] ${colors[t.type]}`}
                    >
                        {icons[t.type]}
                        <span className="flex-1 text-sm font-semibold text-slate-800">{t.message}</span>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
