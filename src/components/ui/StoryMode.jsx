import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Pause, Play } from 'lucide-react';

export const StoryMode = ({ stories, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const activeStory = stories[currentIndex];

    // Progress timer
    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentIndex < stories.length - 1) {
                        setCurrentIndex(prevIndex => prevIndex + 1);
                        return 0;
                    } else {
                        onClose(); // End of stories
                        return 100;
                    }
                }
                return prev + 1; // Adjust speed here (e.g., +0.5 for slower)
            });
        }, 50); // 50ms * 100 steps = 5 seconds per story

        return () => clearInterval(interval);
    }, [currentIndex, stories.length, paused, onClose]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="relative w-full max-w-md aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">

                {/* Progress Bars */}
                <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                    {stories.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: idx < currentIndex ? "100%" : "0%" }}
                                animate={{ width: idx < currentIndex ? "100%" : idx === currentIndex ? `${progress}%` : "0%" }}
                                transition={{ ease: "linear", duration: 0 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="absolute top-8 right-4 z-20 flex gap-4">
                    <button onClick={() => setPaused(!paused)} className="text-white/80 hover:text-white">
                        {paused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                    </button>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tap Zones */}
                <div className="absolute inset-0 z-10 flex">
                    <div className="w-1/3 h-full" onClick={handlePrev} />
                    <div className="w-1/3 h-full" onClick={() => setPaused(!paused)} />
                    <div className="w-1/3 h-full" onClick={handleNext} />
                </div>

                {/* Content */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                        style={{ background: activeStory.background || 'transparent' }}
                    >
                        {activeStory.image && (
                            <motion.img
                                src={activeStory.image}
                                alt="Story visual"
                                className="w-48 h-48 object-cover rounded-2xl mb-8 shadow-2xl"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                        )}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">{activeStory.title}</h2>
                            <p className="text-xl text-white/90 font-medium leading-relaxed">{activeStory.content}</p>
                        </motion.div>

                        {activeStory.metric && (
                            <motion.div
                                className="mt-8 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.6 }}
                            >
                                <span className="text-4xl font-black text-white">{activeStory.metric}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
