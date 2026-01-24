import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function GlobalHRAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'init',
            type: 'bot',
            content: "Hello! I'm your AI Recruiter Assistant. I'm monitoring all active pipelines. How can I assist you today?"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();

    // Context-aware suggestions based on current route
    const getSuggestions = () => {
        const path = location.pathname;
        if (path.includes('candidates')) return ["Summarize candidate profile", "Draft rejection email", "Schedule interview"];
        if (path.includes('jobs')) return ["Generate JD based on market", "Suggest salary range", "List missing skills"];
        if (path.includes('analytics')) return ["Explain this trend", "Predict next month's attrition", "Export report"];
        return ["Show daily summary", "Pending approvals", "Sourcing status"];
    };

    const suggestions = getSuggestions();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        const text = inputValue.trim();
        if (!text) return;

        const newUserMessage = {
            id: Date.now(),
            type: 'user',
            content: text,
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let responseText = "I've processed that request. Is there anything else you need?";

            if (text.toLowerCase().includes('candidate')) {
                responseText = "I've analyzed the candidate profiles. The top match suggests a 92% fit based on technical skills.";
            } else if (text.toLowerCase().includes('schedule')) {
                responseText = "I've checked the calendar. The next available slot for all interviewers is Tuesday at 2 PM.";
            } else if (text.toLowerCase().includes('reject')) {
                responseText = "Drafting a polite rejection email focusing on 'future opportunities' to maintain a positive employer brand.";
            }

            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                content: responseText,
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'bg-primary text-primary-foreground'
                    }`}
            >
                <div className="relative">
                    <Bot className="w-8 h-8" />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary animate-pulse" />
                </div>
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-8 right-8 z-50 w-[400px] h-[600px] flex flex-col bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Levora Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted/50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.type === 'user' ? 'bg-foreground text-background' : 'bg-card border border-border text-primary'
                                        }`}>
                                        {msg.type === 'user' ? <div className="text-xs font-bold">ME</div> : <Sparkles className="w-4 h-4" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.type === 'user'
                                            ? 'bg-foreground text-background rounded-tr-none'
                                            : 'bg-card border border-border rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        <div className="px-4 pb-2">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mask-fade-right">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInputValue(s); handleSendMessage(); }}
                                        className="whitespace-nowrap px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/10 transition-colors flex items-center gap-1.5"
                                    >
                                        <Zap className="w-3 h-3" />
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-muted/20 border-t border-border/50">
                            <form
                                onSubmit={handleSendMessage}
                                className="relative flex items-center gap-2 bg-background border border-border p-2 pr-2 rounded-2xl shadow-sm focus-within:ring-2 ring-primary/20 transition-all"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask AI anything..."
                                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-2"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
