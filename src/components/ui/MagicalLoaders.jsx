import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const SparkleLoader = ({ text = "Generating Magic..." }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                >
                    <Sparkles className="w-12 h-12 text-indigo-500" />
                </motion.div>
                <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-50 animate-pulse" />
            </div>
            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            >
                {text}
            </motion.p>
        </div>
    );
};

export const GradientShimmer = ({ className }) => {
    return (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
            />
        </div>
    );
};
