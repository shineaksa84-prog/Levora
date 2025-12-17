import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const VoiceVisualizer = ({ isListening = false, barCount = 20 }) => {
    const [bars, setBars] = useState(new Array(barCount).fill(10));

    useEffect(() => {
        if (!isListening) {
            setBars(new Array(barCount).fill(10));
            return;
        }

        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.random() * 40 + 10)); // Random height between 10 and 50
        }, 100);

        return () => clearInterval(interval);
    }, [isListening, barCount]);

    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    animate={{ height: isListening ? height : 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                    style={{ minHeight: '4px' }}
                />
            ))}
        </div>
    );
};
