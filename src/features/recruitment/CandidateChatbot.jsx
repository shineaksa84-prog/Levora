import { useState } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCandidateChatResponse } from '../../lib/services/candidateService';

export default function CandidateChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi! I\'m your AI recruitment assistant. How can I help you today?', timestamp: new Date() }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputText; // Capture for async call
        setInputText('');

        try {
            // Simulate typing delay handled in service or UI
            const responseText = await getCandidateChatResponse(currentInput);

            const botMessage = {
                id: Date.now() + 1,
                sender: 'bot',
                text: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all"
            >
                {isOpen ? <MessageCircle className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-pulse" />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-50 w-96 h-[600px] glass-card flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border/50 bg-primary/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary rounded-xl">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm">AI Recruitment Assistant</h3>
                                    <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Online 24/7
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                                        }`}>
                                        {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                        <div className={`inline-block p-3 rounded-2xl text-sm font-medium ${msg.sender === 'bot'
                                            ? 'bg-muted/50 text-foreground'
                                            : 'bg-primary text-white'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className="text-[9px] text-muted-foreground mt-1 font-medium">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border/50 bg-muted/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ask about your application..."
                                    className="flex-1 p-3 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none font-medium"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-3">
                                {['Application Status', 'Interview Process', 'Benefits'].map((quick) => (
                                    <button
                                        key={quick}
                                        onClick={() => { setInputText(quick); handleSend(); }}
                                        className="px-3 py-1 bg-white border border-border rounded-full text-[10px] font-bold hover:bg-primary/10 hover:border-primary/20 transition-all"
                                    >
                                        {quick}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
