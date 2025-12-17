import { useState } from 'react';
import { Trophy, Star, Heart, ThumbsUp, Medal, Award, Plus, Search } from 'lucide-react';

const KUDOS_TYPES = [
    { id: 'star', label: 'Star Performer', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { id: 'help', label: 'Team Player', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200' },
    { id: 'idea', label: 'Innovator', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { id: 'done', label: 'Getting it Done', icon: ThumbsUp, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
];

const POSTS = [
    { id: 1, from: 'Alice', to: 'Bob', type: 'star', msg: 'Crushed the Q3 targets! Amazing work leading the sales sprint.', date: '2h ago', reactions: 5 },
    { id: 2, from: 'Mike', to: 'Sarah', type: 'help', msg: 'Thanks for helping me debug that critical issue late last night.', date: '4h ago', reactions: 12 },
    { id: 3, from: 'Jessica', to: 'Team', type: 'idea', msg: 'The new design system proposal is brilliant. Can’t wait to implement it.', date: '1d ago', reactions: 8 },
];

export default function RecognitionWall() {
    const [posts, setPosts] = useState(POSTS);
    const [showCompose, setShowCompose] = useState(false);

    // Compose State
    const [recipient, setRecipient] = useState('');
    const [selectedType, setSelectedType] = useState(KUDOS_TYPES[0]);
    const [message, setMessage] = useState('');

    const postKudos = () => {
        const newPost = {
            id: Date.now(),
            from: 'You',
            to: recipient,
            type: selectedType.id,
            msg: message,
            date: 'Just now',
            reactions: 0
        };
        setPosts([newPost, ...posts]);
        setShowCompose(false);
        setMessage('');
        setRecipient('');
    };

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Award className="w-6 h-6 text-orange-500" />
                    Wall of Fame
                </h2>
                <button
                    onClick={() => setShowCompose(true)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all"
                >
                    <Plus className="w-4 h-4" /> Give Kudos
                </button>
            </div>

            {showCompose && (
                <div className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-gray-900 mb-4">Appreciate a Colleague</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {KUDOS_TYPES.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type)}
                                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${selectedType.id === type.id
                                            ? `${type.bg} ${type.border} ${type.color} ring-2 ring-offset-1 ring-${type.color.split('-')[1]}-200`
                                            : 'hover:bg-gray-50 border-gray-200 grayscale'
                                        }`}
                                >
                                    <type.icon className="w-5 h-5" />
                                    <span className="font-bold text-sm">{type.label}</span>
                                </button>
                            ))}
                        </div>
                        <input
                            placeholder="Who do you want to thank? (e.g. Sarah)"
                            className="w-full p-3 rounded-lg border bg-background"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                        <textarea
                            placeholder="Write a message..."
                            rows={2}
                            className="w-full p-3 rounded-lg border bg-background resize-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowCompose(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button onClick={postKudos} className="px-6 py-2 text-sm font-bold bg-gray-900 text-white rounded-lg hover:bg-black">Post</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto pr-2">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-6">
                    {posts.map(post => {
                        const type = KUDOS_TYPES.find(t => t.id === post.type);
                        return (
                            <div key={post.id} className="break-inside-avoid bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${type.bg.replace('50', '100')} to-transparent rounded-bl-full opacity-50 -mr-8 -mt-8`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`p-2 rounded-full ${type.bg} ${type.color}`}>
                                            <type.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${type.color}`}>
                                            {type.label}
                                        </span>
                                    </div>

                                    <p className="text-gray-900 text-lg font-medium leading-relaxed mb-4">
                                        "{post.msg}"
                                    </p>

                                    <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">To: {post.to}</p>
                                            <p className="text-xs text-muted-foreground">From: {post.from}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                                            <ThumbsUp className="w-3 h-3" /> {post.reactions}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
