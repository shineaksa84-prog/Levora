import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ConfettiFX = ({ isExploding = false, count = 50 }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (isExploding) {
            const newParticles = Array.from({ length: count }).map((_, i) => ({
                id: i,
                x: 0,
                y: 0,
                color: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 4)],
                angle: Math.random() * 360,
                velocity: Math.random() * 200 + 100,
            }));
            setParticles(newParticles);

            // Cleanup
            const timer = setTimeout(() => setParticles([]), 2000);
            return () => clearTimeout(timer);
        }
    }, [isExploding, count]);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos(p.angle * (Math.PI / 180)) * p.velocity,
                        y: Math.sin(p.angle * (Math.PI / 180)) * p.velocity + 200, // Gravity effect
                        opacity: 0,
                        rotate: Math.random() * 360 * 5
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-sm"
                    style={{ backgroundColor: p.color }}
                />
            ))}
        </div>
    );
};
