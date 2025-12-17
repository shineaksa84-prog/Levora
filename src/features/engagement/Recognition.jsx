import { useState } from 'react';
import {
    Award,
    ThumbsUp,
    MessageCircle,
    Share2,
    Star,
    Crown
} from 'lucide-react';

export default function Recognition() {
    const [recognitions] = useState([
        {
            id: 1,
            from: "Sarah Wilson",
            to: "Michael Chen",
            message: "Incredible work on the new dashboard implementation! The performance improvements are noticeable immediately.",
            tags: ["#Innovation", "#Teamwork"],
            likes: 12,
            comments: 3,
            time: "2 hours ago",
            avatarFrom: "SW",
            avatarTo: "MC"
        },
        {
            id: 2,
            from: "John Doe",
            to: "Emma Rodriguez",
            message: "Thanks for stepping in to help with the client presentation. Couldn't have done it without you!",
            tags: ["#Leadership", "#Support"],
            likes: 8,
            comments: 1,
            time: "5 hours ago",
            avatarFrom: "JD",
            avatarTo: "ER"
        }
    ]);

    const [leaderboard] = useState([
        { id: 1, name: "Michael Chen", points: 1250, avatar: "MC" },
        { id: 2, name: "Sarah Wilson", points: 980, avatar: "SW" },
        { id: 3, name: "Emma Rodriguez", points: 850, avatar: "ER" }
    ]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            JD
                        </div>
                        <div className="flex-1">
                            <textarea
                                placeholder="Recognize a colleague..."
                                className="w-full bg-muted/50 border-none rounded-lg p-3 min-h-[100px] focus:ring-1 focus:ring-primary resize-none"
                            />
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                                        <Award className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                                    Give Kudos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {recognitions.map((post) => (
                        <div key={post.id} className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold z-10 border-2 border-background">
                                            {post.avatarFrom}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold -ml-3 border-2 border-background">
                                            {post.avatarTo}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            <span className="text-foreground">{post.from}</span>
                                            <span className="text-muted-foreground mx-1">recognized</span>
                                            <span className="text-foreground">{post.to}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">{post.time}</p>
                                    </div>
                                </div>
                                <button className="text-muted-foreground hover:text-foreground">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-foreground mb-4">{post.message}</p>

                            <div className="flex gap-2 mb-4">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-border">
                                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                    {post.likes}
                                </button>
                                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    {post.comments}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard */}
            <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-amber-500" />
                        Top Contributors
                    </h3>
                    <div className="space-y-4">
                        {leaderboard.map((user, index) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 flex items-center justify-center font-bold text-sm rounded-full ${index === 0 ? 'bg-amber-100 text-amber-600' :
                                            index === 1 ? 'bg-slate-100 text-slate-600' :
                                                index === 2 ? 'bg-orange-100 text-orange-600' :
                                                    'text-muted-foreground'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                        {user.avatar}
                                    </div>
                                    <span className="font-medium text-sm">{user.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-sm font-bold">{user.points}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        View Full Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
}
