import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MoreVertical, Paperclip, Mic } from 'lucide-react';
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
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: messages.length + 1,
            type: 'user',
            content: inputValue,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        // Call Gemini Service
        try {
            const response = await geminiService.chat(inputValue, messages);

            const botResponse = {
                id: messages.length + 2,
                type: 'bot',
                content: response.content,
                timestamp: response.timestamp
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            const errorResponse = {
                id: messages.length + 2,
                type: 'bot',
                content: "I'm having trouble connecting to the server right now. Please try again later.",
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
            <div className="flex-1 flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">HR Assistant Pro</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-muted-foreground">Online</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                                }`}>
                                {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`flex flex-col max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`p-4 rounded-2xl ${message.type === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                    : 'bg-muted rounded-tl-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1 px-1">
                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="bg-muted p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything about candidates, jobs, or HR tasks..."
                            className="w-full pl-4 pr-32 py-4 rounded-xl border border-input bg-muted/30 focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button type="button" className="p-2 hover:bg-accent rounded-lg text-muted-foreground transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <button type="button" className="p-2 hover:bg-accent rounded-lg text-muted-foreground transition-colors">
                                <Mic className="w-5 h-5" />
                            </button>
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sidebar / Context Panel */}
            <div className="w-80 flex flex-col gap-6">
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Suggested Actions
                    </h3>
                    <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => setInputValue(suggestion)}
                                className="w-full text-left p-3 rounded-lg text-sm bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors border border-transparent hover:border-border"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-4">
                    <h3 className="font-semibold mb-2 text-primary">Pro Tip</h3>
                    <p className="text-sm text-muted-foreground">
                        You can ask me to analyze resumes directly. Just upload a PDF and I'll extract key skills and experience!
                    </p>
                </div>
            </div>
        </div>
    );
}
