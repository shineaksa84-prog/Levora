import { useState } from 'react';
import { Trophy, TrendingUp, Users, Gift, Medal, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const LEADERBOARD = [
    { id: 1, name: 'Sarah Johnson', department: 'Engineering', referrals: 12, hires: 4, points: 4800, rank: 1, avatar: 'SJ', trend: 'up' },
    { id: 2, name: 'Michael Chen', department: 'Product', referrals: 10, hires: 3, points: 3600, rank: 2, avatar: 'MC', trend: 'up' },
    { id: 3, name: 'Emily Rodriguez', department: 'Sales', referrals: 8, hires: 3, points: 3200, rank: 3, avatar: 'ER', trend: 'same' },
    { id: 4, name: 'David Kim', department: 'Engineering', referrals: 7, hires: 2, points: 2400, rank: 4, avatar: 'DK', trend: 'down' },
    { id: 5, name: 'Lisa Wang', department: 'Design', referrals: 6, hires: 2, points: 2200, rank: 5, avatar: 'LW', trend: 'up' },
];

const REWARDS = [
    { points: 1000, reward: '$100 Amazon Gift Card', icon: Gift },
    { points: 2500, reward: 'Extra PTO Day', icon: Star },
    { points: 5000, reward: '$500 Bonus', icon: Trophy },
    { points: 10000, reward: 'VIP Parking Spot + $1000', icon: Crown },
];

export default function ReferralLeaderboard() {
    const [leaderboard] = useState(LEADERBOARD);

    return (
        <div className="space-y-6">
            <div className="glass-card p-8 bg-gradient-to-r from-amber-500/5 to-primary/5 border-amber-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500 rounded-2xl">
                            <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Referral Leaderboard</h2>
                            <p className="text-muted-foreground font-medium">Gamified employee referral tracking with rewards</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-amber-500">Q4 2024</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Season</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Leaderboard */}
                <div className="lg:col-span-2 glass-card overflow-hidden">
                    <div className="p-6 border-b border-border/50 bg-muted/20">
                        <h3 className="font-black text-lg">Top Referrers</h3>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Ranked by total points earned</p>
                    </div>

                    <div className="divide-y divide-border/50">
                        {leaderboard.map((person, idx) => (
                            <motion.div
                                key={person.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 hover:bg-muted/30 transition-all ${idx < 3 ? 'bg-amber-500/5' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Rank */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${idx === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30' :
                                            idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-400/30' :
                                                idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30' :
                                                    'bg-muted text-muted-foreground'
                                        }`}>
                                        {idx < 3 ? <Crown className="w-6 h-6" /> : person.rank}
                                    </div>

                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white">
                                        {person.avatar}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h4 className="font-black text-sm">{person.name}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">{person.department}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden md:flex gap-8">
                                        <div className="text-center">
                                            <p className="text-lg font-black text-primary">{person.referrals}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Referrals</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-black text-emerald-500">{person.hires}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Hires</p>
                                        </div>
                                    </div>

                                    {/* Points */}
                                    <div className="text-right">
                                        <p className="text-xl font-black text-amber-500">{person.points.toLocaleString()}</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Points</p>
                                    </div>

                                    {/* Trend */}
                                    <div className={`p-2 rounded-lg ${person.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' :
                                            person.trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                                'bg-muted text-muted-foreground'
                                        }`}>
                                        <TrendingUp className={`w-4 h-4 ${person.trend === 'down' ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Rewards */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                            <Gift className="w-5 h-5 text-primary" />
                            Reward Tiers
                        </h3>

                        <div className="space-y-4">
                            {REWARDS.map((reward, idx) => (
                                <div key={idx} className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <reward.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black">{reward.reward}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold">{reward.points.toLocaleString()} points</p>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-primary/5 border-primary/20">
                        <h3 className="font-black text-sm mb-3 text-primary">How It Works</h3>
                        <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Submit referral: <strong className="text-foreground">100 points</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Candidate interviewed: <strong className="text-foreground">+200 points</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Successful hire: <strong className="text-foreground">+1000 points</strong></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
