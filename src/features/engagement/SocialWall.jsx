import { useState } from 'react';
import { Image, Heart, MessageSquare, Send, Award, Pin } from 'lucide-react';

const INITIAL_POSTS = [
    {
        id: 1,
        author: 'Sarah (HR)',
        avatar: 'bg-purple-100 text-purple-600',
        content: '🎉 Big congratulations to the Engineering Team for the successful launch of Phase 1! Pizza party at 5 PM today! 🍕',
        time: '2 hours ago',
        likes: 24,
        comments: 5,
        isPinned: true
    },
    {
        id: 2,
        author: 'Mike Ross',
        avatar: 'bg-blue-100 text-blue-600',
        content: 'Just closed the Acme Corp deal! Excited to welcome them onboard. 🚀 #SalesWin',
        time: '4 hours ago',
        likes: 18,
        comments: 2,
        isPinned: false
    },
];

export default function SocialWall() {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [newPost, setNewPost] = useState('');

    const handlePost = () => {
        if (!newPost.trim()) return;
        const post = {
            id: Date.now(),
            author: 'You',
            avatar: 'bg-indigo-100 text-indigo-600',
            content: newPost,
            time: 'Just now',
            likes: 0,
            comments: 0
        };
        setPosts([post, ...posts]);
        setNewPost('');
    };

    const handleLike = (id) => {
        setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    Me
                </div>
                <div className="flex-1">
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share a win, an update, or appreciate a colleague..."
                        className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none h-20"
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <Image className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <Award className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={handlePost}
                            disabled={!newPost.trim()}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${newPost.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400'
                                }`}
                        >
                            <Send className="w-4 h-4" /> Post
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                        {post.isPinned && (
                            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-bl-xl text-[10px] font-bold flex items-center gap-1">
                                <Pin className="w-3 h-3 fill-current" /> Pinned
                            </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${post.avatar}`}>
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                                <p className="text-xs text-gray-500">{post.time}</p>
                            </div>
                        </div>

                        <p className="text-gray-800 text-sm leading-relaxed mb-4 whitespace-pre-line">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-gray-500 text-sm font-medium">
                            <button
                                onClick={() => handleLike(post.id)}
                                className="flex items-center gap-2 hover:text-pink-500 transition-colors group"
                            >
                                <Heart className="w-5 h-5 group-hover:fill-pink-500 transition-all" /> {post.likes} Likes
                            </button>
                            <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                                <MessageSquare className="w-5 h-5" /> {post.comments} Comments
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
