import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const AIGhostText = ({
    value,
    onChange,
    placeholder,
    suggestion,
    onAcceptSuggestion,
    className,
    rows = 4
}) => {
    const textareaRef = useRef(null);
    const [cursorCoords, setCursorCoords] = useState({ top: 0, left: 0 });

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            onAcceptSuggestion();
        }
    };

    // Note: True inline ghost text usually requires a mirrored div or canvas to calculate exact cursor position.
    // For this "Magic UI" implementation, we will use a simpler approach:
    // Displaying the suggestion as a floating bubble or overlaid text if the field is empty, 
    // or appended if we track the cursor. 

    // Improved Approach: A "Shadow" overlay for the suggestion if it matches the typing prefix,
    // or a floating "AI Whisper" bubble. Let's go with the "Whisper Bubble" for better UX visibility.

    return (
        <div className="relative group">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={rows}
                className={`w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none font-sans text-gray-800 dark:text-gray-100 ${className}`}
            />

            {/* The "Ghost" Suggestion Overlay */}
            {suggestion && (
                <div className="absolute inset-0 pointer-events-none p-4 font-sans text-transparent select-none whitespace-pre-wrap overflow-hidden">
                    {value}
                    <span className="text-gray-400/70 dark:text-gray-500/70 inline-block animate-pulse">
                        {suggestion}
                    </span>
                </div>
            )}

            {/* AI Action Hint */}
            {suggestion && (
                <div className="absolute right-3 bottom-3 flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-bold">Tab</span> to accept
                </div>
            )}
        </div>
    );
};
