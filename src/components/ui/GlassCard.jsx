import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            className={`glass-card p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
