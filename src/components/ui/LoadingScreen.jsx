import { motion } from "framer-motion";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50">
            <div className="relative">
                {/* Glowing Orb Effect */}
                <div className="absolute inset-0 bg-violet-500 blur-3xl opacity-20 animate-pulse rounded-full" />

                {/* Logo/Spinner */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full"
                />

                {/* Inner Dot */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
            >
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    TalentFlow AI
                </h2>
                <p className="text-xs text-slate-400 mt-2 tracking-widest uppercase">Initializing Workspace</p>
            </motion.div>
        </div>
    );
}
