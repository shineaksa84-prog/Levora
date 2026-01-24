import { useState, useEffect } from 'react';
import { Users, TrendingUp, PieChart, BarChart3, Target, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDEIDashboardMetrics } from '../../lib/services/analyticsService';

export default function DiversityAnalyticsDashboard() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDEIDashboardMetrics();
                setMetrics(data);
            } catch (err) {
                console.error("Failed to load DEI metrics", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!metrics) return null;

    return (
        <div className="space-y-6">
            <div className="glass-card p-8 bg-gradient-to-r from-violet-500/5 to-primary/5 border-violet-500/20">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-500 rounded-2xl">
                        <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Diversity Analytics Dashboard</h2>
                        <p className="text-muted-foreground font-medium">Real-time DEI metrics across hiring pipeline</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-3xl font-black text-violet-500">{metrics.overall.diversity}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Diversity Index</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-3xl font-black text-emerald-500">{metrics.overall.inclusion}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inclusion Score</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-3xl font-black text-primary">{metrics.overall.equity}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pay Equity</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Pipeline Funnel */}
                <div className="glass-card p-6">
                    <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Diversity Through Pipeline
                    </h3>

                    <div className="space-y-4">
                        {metrics.pipeline.map((stage, idx) => (
                            <motion.div
                                key={stage.stage}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold">{stage.stage}</span>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-primary">{stage.percentage}%</span>
                                        <span className="text-xs text-muted-foreground ml-2">({stage.diverse}/{stage.total})</span>
                                    </div>
                                </div>
                                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-500"
                                        style={{ width: `${stage.percentage}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <TrendingUp className="w-4 h-4" />
                            <p className="text-xs font-black">+8% improvement from last quarter</p>
                        </div>
                    </div>
                </div>

                {/* Goals Tracker */}
                <div className="glass-card p-6">
                    <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        DEI Goals & Progress
                    </h3>

                    <div className="space-y-4">
                        {metrics.goals.map((goal, idx) => (
                            <motion.div
                                key={goal.metric}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 bg-muted/30 rounded-xl border border-border/50"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-black text-sm">{goal.metric}</h4>
                                        <p className="text-xs text-muted-foreground font-medium mt-1">
                                            Current: {goal.current}% • Target: {goal.target}%
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${goal.status === 'On Track' ? 'bg-emerald-500/10 text-emerald-500' :
                                        goal.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                        {goal.status}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${goal.status === 'On Track' ? 'bg-emerald-500' :
                                            goal.status === 'In Progress' ? 'bg-amber-500' :
                                                'bg-red-500'
                                            }`}
                                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Demographics Breakdown */}
            <div className="glass-card p-6">
                <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Demographic Breakdown
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    {metrics.demographics.map((demo) => (
                        <div key={demo.category} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                            <h4 className="font-black text-sm mb-4 text-primary">{demo.category}</h4>
                            <div className="space-y-2">
                                {Object.entries(demo).filter(([key]) => key !== 'category').map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center">
                                        <span className="text-xs font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-sm font-black">{value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compliance Notice */}
            <div className="glass-card p-6 bg-amber-500/5 border-amber-500/20">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-black text-sm text-amber-600 mb-1">GDPR & EEOC Compliance</h4>
                        <p className="text-xs text-muted-foreground font-medium">
                            All demographic data is anonymized and aggregated. Individual candidate information is protected under data privacy regulations.
                            This dashboard is for internal DEI tracking purposes only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
