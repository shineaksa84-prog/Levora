import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MoreVertical, Paperclip, Mic, Mail, BarChart3, Users, Zap, Hash, Globe, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../../lib/ai/gemini';

export default function HRAssistant() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: "Welcome to the Strategic Command Center. I've integrated the new Talent Benchmarking and AI Outreach protocols. \n\nI can help you analyze market salary data, generate personalized outreach for the 'Alice Freeman' search, or run a side-by-side comparison of your short-listed silver medalists.",
            timestamp: new Date().toISOString()
        }
    ]);
    const [activeMode, setActiveMode] = useState('chat'); // chat, benchmarking, outreach
    const [marketStats, setMarketStats] = useState({
        avgSalary: '$145k',
        demandLevel: 'Critically High',
        competitorVelocity: 'Top 5%',
        topSkills: ['React', 'Next.js', 'System Design']
    });
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
            // Get current chat history for context (excluding this newest message)
            const history = messages.map(m => ({
                role: m.type === 'bot' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const response = await geminiService.chat(text, history);

            // Intelligence for rich data triggers based on response content
            let richData = null;
            if (response.toLowerCase().includes('outreach') || response.toLowerCase().includes('sequence')) {
                richData = {
                    type: 'outreach',
                    preview: "Hi [Candidate], I noticed your work on the system architecture... we're scaling our core framework and your expertise is exactly what we need."
                };
            } else if (response.toLowerCase().includes('benchmark') || response.toLowerCase().includes('compare')) {
                richData = {
                    type: 'benchmark',
                    comparison: [
                        { name: 'Selected Candidate A', match: 94, risk: 'Low' },
                        { name: 'Selected Candidate B', match: 88, risk: 'Medium' }
                    ]
                };
            }

            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                content: response,
                richData,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('HR Assistant Error:', error);
            const errorMsg = {
                id: Date.now() + 1,
                type: 'bot',
                content: "I apologize, my neural link is temporarily disrupted. Please try our query again in a moment.",
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "Generate outreach for Senior React devs",
        "Bench candidates Alice vs. Bob",
        "Market Pulse: Senior Dev salary in NY",
        "Summarize feedback for the Engineering lead role"
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
                                        {message.richData?.type === 'outreach' && (
                                            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                                    <Mail className="w-3 h-3" /> Outreach Draft
                                                </div>
                                                <p className="text-xs font-medium text-slate-700 italic">"{message.richData.preview}"</p>
                                                <button className="w-full py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">Apply Outreach Protocol</button>
                                            </div>
                                        )}
                                        {message.richData?.type === 'benchmark' && (
                                            <div className="mt-4 p-4 bg-slate-900 rounded-xl space-y-3 text-white">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                                    <BarChart3 className="w-3 h-3" /> Benchmark Summary
                                                </div>
                                                <div className="space-y-2">
                                                    {message.richData.comparison.map(c => (
                                                        <div key={c.name} className="flex items-center justify-between">
                                                            <span className="text-xs font-bold">{c.name}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-black text-primary">{c.match}% Match</span>
                                                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase ${c.risk === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{c.risk} Risk</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Launch Full Comparison Bench</button>
                                            </div>
                                        )}
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
                    className="bg-slate-900 rounded-2xl p-5 text-white overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-primary" />
                        Market Pulse Intelligence
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400">Avg. Market Rate</p>
                                <p className="text-lg font-black">{marketStats.avgSalary}</p>
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span>Demand Density</span>
                                <span className="text-primary">{marketStats.demandLevel}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[85%]" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                            <p className="text-[10px] uppercase font-black text-slate-400 mb-2">High-Velocity Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {marketStats.topSkills.map(s => (
                                    <span key={s} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold border border-white/10">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-5"
                >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        Active Selection
                    </h3>
                    <div className="p-3 bg-muted/20 rounded-xl border border-border border-dashed text-center">
                        <p className="text-[10px] font-medium text-muted-foreground">Select candidates from the Talent Pool to run AI benchmarking or outreach campaigns.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
