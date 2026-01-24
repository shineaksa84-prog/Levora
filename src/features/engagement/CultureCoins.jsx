import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, ShoppingBag, History, TrendingUp, Sparkles } from 'lucide-react';
import RewardStore from './RewardStore';
import Recognition from './Recognition'; // Reusing existing recognition feed
import { toast } from '../../lib/services/toastService';

export default function CultureCoins() {
    const [balance, setBalance] = useState(1250);
    const [activeTab, setActiveTab] = useState('earn'); // 'earn' | 'spend'
    const [history, setHistory] = useState([
        { id: 1, action: 'Received Kudos', from: 'Sarah Wilson', amount: 50, time: '2h ago' },
        { id: 2, action: 'Weekly Login Bonus', from: 'System', amount: 100, time: '1d ago' },
    ]);

    const handleRedeem = (item) => {
        setBalance(prev => prev - item.cost);
        setHistory(prev => [
            { id: Date.now(), action: `Redeemed: ${item.name}`, from: 'Store', amount: -item.cost, time: 'Just now' },
            ...prev
        ]);
        toast.success(`Successfully redeemed ${item.name}! Check your email for details.`);
    };

    return (
        <div className="space-y-8">
            {/* Wallet Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <p className="text-white/80 font-medium text-sm uppercase tracking-widest mb-1">Current Balance</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black tracking-tight">{balance.toLocaleString()}</h2>
                            <span className="text-2xl font-bold opacity-80">CC</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveTab('earn')}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'earn' ? 'bg-white text-orange-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Earn Coins
                        </button>
                        <button
                            onClick={() => setActiveTab('spend')}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'spend' ? 'bg-white text-orange-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Spend Coins
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'earn' ? (
                    <motion.div
                        key="earn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <TrendingUp className="w-5 h-5" />
                            <h3>Recent Activity</h3>
                        </div>

                        {/* Mini History for Earn Tab */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {history.slice(0, 3).map(item => (
                                <div key={item.id} className="bg-card border border-border/50 p-4 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm">{item.action}</p>
                                        <p className="text-[10px] text-muted-foreground">{item.time}</p>
                                    </div>
                                    <span className={`font-black text-sm ${item.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.amount > 0 ? '+' : ''}{item.amount}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Recognition />
                    </motion.div>
                ) : (
                    <motion.div
                        key="spend"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <RewardStore balance={balance} onRedeem={handleRedeem} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
