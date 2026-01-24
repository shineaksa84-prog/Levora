import React, { useState, useEffect } from 'react';
import {
    Zap, TrendingUp, Calendar,
    DollarSign, ArrowUpRight, CheckCircle2,
    Clock, Plus, Gift, Award
} from 'lucide-react';
import { getVariablePayHistory } from '../../lib/services/compensationService';
import { motion } from 'framer-motion';

export default function VariablePay() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getVariablePayHistory('current_user');
        setHistory(data);
        setLoading(false);
    };

    const stats = [
        {
            label: 'Total Annual Bonus',
            value: `$${history.filter(h => h.type.includes('Bonus')).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`,
            sub: 'Projected: $15k',
            icon: Award,
            color: 'text-amber-500'
        },
        {
            label: 'YTD Commission',
            value: `$${history.filter(h => h.type.includes('Commission')).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`,
            sub: 'Q3 Target Met',
            icon: TrendingUp,
            color: 'text-emerald-500'
        },
        {
            label: 'Equity Value',
            value: '$84,200',
            sub: '25% Vested',
            icon: Gift,
            color: 'text-purple-500'
        },
    ];

    const handleExport = () => {
        toast.info('Exporting financial summary protocol...');
    };

    const handleViewBreakdown = (item) => {
        toast.info(`Strategic breakdown for ${item.type} synchronized.`);
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-b-4 border-b-transparent hover:border-b-primary transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <button className="p-2 bg-muted/30 rounded-lg hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100">
                                <Plus className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black mb-1">{stat.value}</p>
                        <p className="text-[10px] font-bold text-primary italic">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card overflow-hidden">
                <div className="p-8 border-b border-border bg-muted/20 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black tracking-tight">Incentive Timeline</h3>
                        <p className="text-xs text-muted-foreground font-medium">Tracking bonuses, commissions, and vesting events</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-black shadow-sm hover:bg-muted transition-all"
                        >
                            Export Report
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-border">
                    {history.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.05) }}
                            className="p-6 hover:bg-muted/30 transition-all flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type.includes('Stock') ? 'bg-purple-500/10 text-purple-500' :
                                    item.type.includes('Bonus') ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                    {item.type.includes('Stock') ? <Gift className="w-6 h-6" /> :
                                        item.type.includes('Bonus') ? <Award className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="font-black text-sm">{item.type}</h4>
                                        <span className="text-[8px] font-black bg-muted px-2 py-0.5 rounded uppercase tracking-tighter">{item.period}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1">
                                            {item.status === 'Paid' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-black">${item.amount.toLocaleString()}</div>
                                <button
                                    onClick={() => handleViewBreakdown(item)}
                                    className="text-[8px] font-black uppercase text-primary group-hover:underline"
                                >
                                    View Breakdown
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
