import React, { useState, useEffect } from 'react';
import {
    Brain, ShieldAlert, Target,
    TrendingUp, LineChart as ChartIcon,
    ArrowUpRight, Users, Scale,
    AlertTriangle, CheckCircle2
} from 'lucide-react';
import { getCompIntelligence } from '../../lib/services/compensationService';
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie
} from 'recharts';
import { motion } from 'framer-motion';

export default function CompIntelligence() {
    const [intel, setIntel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getCompIntelligence();
        setIntel(data);
        setLoading(false);
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Synthesizing intelligence...</div>;

    const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-vibrant-mesh border-primary/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white rounded-2xl shadow-xl">
                            <ChartIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none italic">Market Position</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Benchmark Analysis</p>
                        </div>
                    </div>
                    <div className="text-4xl font-black mb-2 text-primary">{intel.marketPosition.percentile}th</div>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        Percentile against top-tier tech competitors. Up from <span className="text-primary font-black">70th</span> last quarter.
                    </p>
                </div>

                <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg">
                            <Scale className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none">Pay Equity</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/80">Status: {intel.payEquity.status}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">Gender Gap</div>
                            <div className="text-2xl font-black text-emerald-600">{intel.payEquity.genderGap}</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">Dept Variance</div>
                            <div className="text-2xl font-black text-emerald-600">{intel.payEquity.departmentVariance}</div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none">Retention Risk</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600/80">Comp-related Alerts</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-4xl font-black text-amber-600">{intel.retentionRisk[0].count + intel.retentionRisk[1].count}</div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground">High Risk Profiles</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-amber-500 opacity-20" />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Risk Distribution */}
                <div className="glass-card p-8">
                    <h3 className="text-xl font-black tracking-tight mb-8">Risk by Comp-Ratio</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={intel.retentionRisk}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="level" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'black' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'black' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                                    {intel.retentionRisk.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex justify-around">
                        {intel.retentionRisk.map((risk, i) => (
                            <div key={risk.level} className="text-center">
                                <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">{risk.level}</div>
                                <div className="text-sm font-black" style={{ color: COLORS[i] }}>{(risk.avgCompRatio * 100).toFixed(0)}% Avg Ratio</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strategic Insights */}
                <div className="space-y-4">
                    <h3 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        AI Strategic Advisor
                    </h3>
                    {[
                        { title: 'Salary Compression Alert', desc: 'Recent hires in Grade P3 are within 5% of Grade P4 veterans. Recommend structural adjustment.', status: 'Action Required', priority: 'High' },
                        { title: 'Bonus Elasticity', desc: 'Performance bonus increase of 10% correlates with 15% higher retention in Sales.', status: 'Validated', priority: 'Medium' },
                        { title: 'Geographic Arbitrage', desc: 'Remote compensation ranges are 12% below local hubs while maintaining same output.', status: 'Opportunity', priority: 'Low' }
                    ].map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="glass-card p-5 border-l-4 border-l-primary hover:bg-primary/5 transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${insight.priority === 'High' ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {insight.priority} Priority
                                </span>
                                <span className="text-[10px] font-black text-primary italic">{insight.status}</span>
                            </div>
                            <h4 className="font-black text-sm mb-1">{insight.title}</h4>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{insight.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
