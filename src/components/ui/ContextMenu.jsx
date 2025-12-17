import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContextMenu = ({ children, menuItems, className }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();

        // Calculate position (keep within bounds)
        let x = e.pageX;
        let y = e.pageY;

        // Simple bound check (can be improved)
        if (x + 200 > window.innerWidth) x = window.innerWidth - 210;

        setPosition({ x, y });
        setVisible(true);
    }, []);

    const handleClick = useCallback(() => {
        if (visible) setVisible(false);
    }, [visible]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return (
        <div onContextMenu={handleContextMenu} className={className}>
            {children}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        style={{ top: position.y, left: position.x }}
                        className="fixed z-50 w-48 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 p-1.5 overflow-hidden"
                    >
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.onClick();
                                    setVisible(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                {item.icon && <span className="opacity-70">{item.icon}</span>}
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
