import { useState } from 'react';
import { ShoppingBag, Heart, Coffee, Shirt, Gift, Monitor, Ticket, Zap } from 'lucide-react';
import { toast } from '../../lib/services/toastService';

const REWARDS = [
    {
        id: 1,
        name: "Company Swag Pack",
        description: "Premium hoodie, t-shirt, and water bottle.",
        cost: 500,
        icon: Shirt,
        color: "bg-blue-500",
        stock: 12
    },
    {
        id: 2,
        name: "$50 Amazon Gift Card",
        description: "Treat yourself to something nice.",
        cost: 1000,
        icon: Gift,
        color: "bg-amber-500",
        stock: 5
    },
    {
        id: 3,
        name: "Lunch with CEO",
        description: "1-on-1 lunch to discuss your ideas.",
        cost: 2500,
        icon: Coffee,
        color: "bg-emerald-500",
        stock: 2
    },
    {
        id: 4,
        name: "Charity Donation",
        description: "We donate $100 to a charity of your choice.",
        cost: 2000,
        icon: Heart,
        color: "bg-rose-500",
        stock: 99
    },
    {
        id: 5,
        name: "Tech Upgrade",
        description: "Noise-cancelling headphones or mechanical keyboard.",
        cost: 3000,
        icon: Monitor,
        color: "bg-purple-500",
        stock: 3
    },
    {
        id: 6,
        name: "Movie Night",
        description: "2 tickets + snacks for any movie.",
        cost: 300,
        icon: Ticket,
        color: "bg-indigo-500",
        stock: 20
    }
];

export default function RewardStore({ balance, onRedeem }) {
    const [filter, setFilter] = useState('all');

    const handleRedeem = (item) => {
        if (balance < item.cost) {
            toast.error(`Not enough Culture Coins! You need ${item.cost - balance} more.`);
            return;
        }
        onRedeem(item);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black tracking-tight">Reward Store</h3>
                    <p className="text-muted-foreground text-sm font-medium">Exchange your hard-earned Culture Coins for real perks.</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'under-500', 'under-1000'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                        >
                            {f === 'all' ? 'All Rewards' : f.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REWARDS.filter(r => {
                    if (filter === 'under-500') return r.cost <= 500;
                    if (filter === 'under-1000') return r.cost <= 1000;
                    return true;
                }).map((item) => (
                    <div key={item.id} className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:border-primary/20">
                        <div className={`h-32 ${item.color}/10 relative flex items-center justify-center overflow-hidden`}>
                            <div className={`absolute inset-0 ${item.color}/5 group-hover:scale-110 transition-transform duration-500`} />
                            <item.icon className={`w-12 h-12 ${item.color.replace('bg-', 'text-')} relative z-10 drop-shadow-lg`} />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {item.stock} left
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <h4 className="font-bold text-lg leading-tight">{item.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <div className="flex items-center gap-1.5 text-amber-500">
                                    <Zap className="w-4 h-4 fill-current" />
                                    <span className="font-black text-sm">{item.cost}</span>
                                </div>
                                <button
                                    onClick={() => handleRedeem(item)}
                                    disabled={balance < item.cost}
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${balance >= item.cost
                                            ? 'bg-primary text-white hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
                                            : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'
                                        }`}
                                >
                                    <ShoppingBag className="w-3 h-3" />
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
