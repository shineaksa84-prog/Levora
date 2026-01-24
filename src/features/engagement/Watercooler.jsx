import { useState, useEffect } from 'react';
import { MessageSquare, Coffee, Hash, Zap, Send, Heart, MoreHorizontal, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = [
    { id: 'general', name: 'General', icon: Hash },
    { id: 'foodies', name: 'Foodies', icon: Coffee },
    { id: 'pets', name: 'Pet Lovers', icon: Heart },
    { id: 'movies', name: 'Movie Buffs', icon: Zap },
    { id: 'random', name: 'Random', icon: Smile },
];

const DAILY_QUESTIONS = [
    "What's the best thing you ate this weekend?",
    "If you could have any superpower, what would it be?",
    "Show us a picture of your workspace!",
    "What's your favorite productivity hack?",
    "Coffee or Tea? Fight in the comments! ☕🍵"
];

const MOCK_POSTS = {
    general: [
        { id: 1, author: 'Alex Morgan', avatar: 'bg-blue-100 text-blue-600', content: 'Does anyone have a spare monitor cable?', time: '10m ago', likes: 2 },
    ],
    foodies: [
        { id: 2, author: 'Sarah Chen', avatar: 'bg-emerald-100 text-emerald-600', content: 'Just tried that new Thai place downtown. 10/10 recommend! 🍜', time: '1h ago', likes: 15 },
    ],
    pets: [
        { id: 3, author: 'Mike Ross', avatar: 'bg-purple-100 text-purple-600', content: 'My dog ate my homework... literally. 🐶', time: '3h ago', likes: 42 },
    ],
    movies: [],
    random: []
};

export default function Watercooler() {
    const [activeChannel, setActiveChannel] = useState('general');
    const [dailyQuestion, setDailyQuestion] = useState('');
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Pick a random question on mount (simulating daily update)
        setDailyQuestion(DAILY_QUESTIONS[Math.floor(Math.random() * DAILY_QUESTIONS.length)]);
    }, []);

    const handlePost = () => {
        if (!input.trim()) return;

        const newPost = {
            id: Date.now(),
            author: 'You',
            avatar: 'bg-gray-100 text-gray-600',
            content: input,
            time: 'Just now',
            likes: 0
        };

        setPosts(prev => ({
            ...prev,
            [activeChannel]: [newPost, ...prev[activeChannel]]
        }));
        setInput('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            {/* Sidebar Channels */}
            <div className="lg:col-span-1 bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-2">
                <div className="p-4 bg-primary/5 rounded-xl mb-2">
                    <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-primary" />
                        Watercooler
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Virtual Break Room</p>
                </div>

                {CHANNELS.map(channel => (
                    <button
                        key={channel.id}
                        onClick={() => setActiveChannel(channel.id)}
                        className={`p-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all ${activeChannel === channel.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            }`}
                    >
                        <channel.icon className="w-4 h-4" />
                        {channel.name}
                    </button>
                ))}
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                {/* Daily Icebreaker */}
                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden shrink-0">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 font-black text-white/80 uppercase text-[10px] tracking-widest">
                            <Zap className="w-3 h-3" />
                            Daily Icebreaker
                        </div>
                        <h2 className="text-xl md:text-2xl font-black leading-tight">"{dailyQuestion}"</h2>
                    </div>
                    <div className="absolute -right-4 -bottom-8 opacity-20">
                        <MessageSquare className="w-32 h-32 rotate-12" />
                    </div>
                </div>

                {/* Feed */}
                <div className="flex-1 bg-card border border-border/50 rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            {CHANNELS.find(c => c.id === activeChannel)?.name}
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {posts[activeChannel].length > 0 ? (
                                posts[activeChannel].map((post) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        layout
                                        className="flex gap-4 group"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${post.avatar}`}>
                                            {post.author.charAt(0)}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-baseline justify-between">
                                                <h4 className="font-bold text-sm">{post.author}</h4>
                                                <span className="text-[10px] text-muted-foreground font-medium">{post.time}</span>
                                            </div>
                                            <div className="bg-muted/30 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm leading-relaxed">
                                                {post.content}
                                            </div>
                                            <div className="flex items-center gap-4 pt-1">
                                                <button className="text-xs font-bold text-muted-foreground hover:text-pink-500 flex items-center gap-1 transition-colors">
                                                    <Heart className="w-3 h-3" /> {post.likes}
                                                </button>
                                                <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                                    <MessageSquare className="w-12 h-12 mb-2" />
                                    <p className="text-sm font-bold">No messages yet. Be the first!</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-background border-t border-border/50">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handlePost()}
                                placeholder={`Message #${activeChannel}...`}
                                className="flex-1 bg-muted/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none font-medium"
                            />
                            <button
                                onClick={handlePost}
                                disabled={!input.trim()}
                                className="p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-primary/20"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
