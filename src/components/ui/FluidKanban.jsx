import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus } from 'lucide-react';

export const FluidKanban = ({ initialData, columns: columnDefinitions }) => {
    const [data, setData] = useState(initialData);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item, sourceCol) => {
        setDraggedItem({ item, sourceCol });
        e.dataTransfer.effectAllowed = 'move';
        // Create a ghost image if needed, or rely on browser default
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e, targetColId) => {
        e.preventDefault();

        if (!draggedItem) return;
        const { item, sourceCol } = draggedItem;

        if (sourceCol === targetColId) return;

        // Move item
        setData(prev => {
            const newData = { ...prev };
            // Remove from source
            newData[sourceCol] = newData[sourceCol].filter(i => i.id !== item.id);
            // Add to target
            newData[targetColId] = [...newData[targetColId], item];
            return newData;
        });

        setDraggedItem(null);
    };

    return (
        <div className="flexh-full overflow-x-auto">
            <div className="flex gap-6 h-full min-w-[1000px] pb-4">
                {columnDefinitions.map((col) => (
                    <div
                        key={col.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.id)}
                        className={`flex-1 min-w-[300px] flex flex-col rounded-xl border border-gray-200/50 transition-colors ${draggedItem && draggedItem.sourceCol !== col.id ? 'bg-indigo-50/30' : 'bg-gray-50/50'}`}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between rounded-t-xl sticky top-0 bg-opacity-90 backdrop-blur-sm z-10">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-700 capitalize">{col.title}</h3>
                                <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500 font-medium">
                                    {data[col.id]?.length || 0}
                                </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-700">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Drop Zone */}
                        <div className="p-3 flex-1 space-y-3 min-h-[200px]">
                            <AnimatePresence>
                                {data[col.id]?.map((item) => (
                                    <motion.div
                                        layoutId={item.id}
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item, col.id)}
                                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-glow-sm cursor-grab active:cursor-grabbing group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {col.renderItem ? col.renderItem(item) : (
                                            <div>{item.content}</div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {data[col.id]?.length === 0 && (
                                <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                                    Drop items here
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
