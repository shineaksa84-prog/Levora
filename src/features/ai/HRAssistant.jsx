import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MoreVertical, Paperclip, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../../lib/ai/gemini';

export default function HRAssistant() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Hello! I\'m your AI HR Assistant. I can help you with drafting job descriptions, screening candidates, analyzing salary data, and more. How can I assist you today?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const text = inputValue.trim();
        if (!text) return;

        const newUserMessage = {
            id: Date.now(),
            type: 'user',
            content: text,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await geminiService.chat(text, messages);
            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                content: response.content,
                timestamp: response.timestamp
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            const errorResponse = {
                id: Date.now() + 2,
                type: 'bot',
                content: "I'm having trouble connecting right now. Let's try that again in a moment.",
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "Draft a Senior React Developer job description",
        "Analyze Q3 hiring metrics",
        "Schedule interviews for candidate #1234",
        "Generate an offer letter template"
    ];

    return (
        <div className="flex h-[calc(100vh-12rem)] gap-6">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col glass-card overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Levora AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">System Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
                    <AnimatePresence initial={false}>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-800'
                                    }`}>
                                    {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`flex flex-col max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-4 rounded-2xl shadow-sm ${message.type === 'user'
                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 rounded-tl-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-2 px-1 tracking-widest">
                                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 text-slate-800 shadow-sm flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 border-t border-border bg-white/50 backdrop-blur-sm">
                    <form onSubmit={handleSendMessage} className="relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-focus-within:bg-primary/10 transition-colors" />
                        <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm focus-within:border-primary/30 transition-all">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Message Levora AI..."
                                className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm"
                            />
                            <div className="flex items-center gap-1 pr-1">
                                <button type="button" className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-slate-900/10 active:scale-95"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sidebar / Context Panel */}
            <div className="w-80 flex flex-col gap-4">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-5"
                >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        Suggested Prompts
                    </h3>
                    <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ x: 4 }}
                                onClick={() => setInputValue(suggestion)}
                                className="w-full text-left p-3 rounded-xl text-xs font-medium bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-transparent hover:border-indigo-100"
                            >
                                {suggestion}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 rounded-2xl p-5 text-white"
                >
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        AI Analysis
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        I can analyze resumes, draft personalized offer letters, and even predict hiring velocity based on your pipeline.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
