import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';

const pageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.99 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -10, scale: 1 }
};

const pageTransition = {
    type: "tween",
    ease: "circOut",
    duration: 0.3
};

export default function MotionProvider() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="w-full h-full"
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    );
}
