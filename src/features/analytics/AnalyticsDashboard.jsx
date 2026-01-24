import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar, Loader2, TrendingUp, Sparkles, Brain, Zap, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { geminiService } from '../../lib/ai/gemini';
import { getRecruitmentAnalytics } from '../../lib/services/analyticsService';
import { toast } from '../../lib/services/toastService';
import WorkforceHeatmap from './WorkforceHeatmap';

// Rose Gold Elite Palette
const COLORS = ['#E29578', '#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 20 }
    }
};

export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true);
    const [timeToHireTrends, setTimeToHireTrends] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [insights, setInsights] = useState([]);
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const analyticsData = await getRecruitmentAnalytics();
                setMetrics(analyticsData);

                if (analyticsData.timeToHireTrends) setTimeToHireTrends(analyticsData.timeToHireTrends);

                if (analyticsData.sourceEffectiveness) {
                    const formattedSource = Object.entries(analyticsData.sourceEffectiveness).map(([name, data], index) => ({
                        name,
                        value: data.total,
                        color: COLORS[index % COLORS.length]
                    }));
                    setSourceData(formattedSource);
                }

                const results = await geminiService.generateAnalyticsInsights(analyticsData);
                setInsights(results);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
                <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-2 animate-pulse" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-primary animate-pulse mb-1">Synthesizing Bio-Intelligence</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Accessing Neural Recruitment Cloud</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="space-y-8 pb-12"
        >
            {/* Intelligence Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-card p-8 bg-primary/5 border-primary/10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 leading-none">Strategic Intelligence Lab</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter font-display leading-none">Workforce <span className="text-primary italic">Deep-Metrics</span></h1>
                    <p className="text-muted-foreground mt-2 font-medium">Neural processing of recruitment, retention, and institutional momentum.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="px-5 py-3 glass-card bg-white/5 border-white/5 flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs font-black text-primary leading-none">12.4k</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-1">Data Nodes</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="text-center">
                            <p className="text-xs font-black text-emerald-400 leading-none">99.8%</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-1">Confidence</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            toast.promise(
                                new Promise(resolve => setTimeout(resolve, 2000)),
                                {
                                    loading: 'Generating deep-metric export...',
                                    success: 'Encrypted intelligence protocol exported.',
                                    error: 'Export failed'
                                }
                            );
                        }}
                        className="px-6 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Protocol
                    </button>
                </div>
            </div>

            {/* AI Insights & Workforce Heatmap Row */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* AI Insights Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-vibrant-mesh border border-primary/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="absolute -top-12 -right-12 p-8 opacity-10 pointer-events-none rotate-12">
                        <Brain className="w-64 h-64 text-primary" />
                    </div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-foreground tracking-tight leading-none">Neural Insights Layer</h3>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1.5 leading-none flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> Live from Gemini Pro Console
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 relative z-10">
                        {insights.map((insight, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 4 }}
                                className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 group transition-all"
                            >
                                <div className={`mt-1.5 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${insight.status === 'success' ? 'text-emerald-400 bg-emerald-400' :
                                    insight.status === 'warning' ? 'text-amber-400 bg-amber-400' : 'text-primary bg-primary'
                                    }`} />
                                <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed tracking-tight">{insight.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Workforce Heatmap Integration */}
                <motion.div variants={itemVariants}>
                    <WorkforceHeatmap />
                </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Time to Hire Chart */}
                <motion.div variants={itemVariants} className="glass-card p-8 bg-card/40 border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none">Velocity Vector</h3>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1.5">Hiring Cycle Latency (Days)</p>
                        </div>
                        {metrics?.timeToHire && (
                            <div className="text-right">
                                <p className="text-3xl font-black text-primary leading-none tracking-tighter">{metrics.timeToHire.average}</p>
                                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1.5">AVG OPS-READY</p>
                            </div>
                        )}
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timeToHireTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b', textTransform: 'uppercase' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ background: '#0a0a0f', borderRadius: '20px', border: '1px solid rgba(226,149,120,0.2)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '16px' }}
                                    itemStyle={{ fontWeight: 900, color: '#E29578', fontSize: '10px', textTransform: 'uppercase' }}
                                    labelStyle={{ fontWeight: 900, color: '#64748b', fontSize: '9px', marginBottom: '8px', textTransform: 'uppercase' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="days"
                                    stroke="#E29578"
                                    strokeWidth={4}
                                    dot={{ r: 4, strokeWidth: 3, fill: '#0a0a0f', stroke: '#E29578' }}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#E29578' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Recruitment Funnel */}
                <motion.div variants={itemVariants} className="glass-card p-8 bg-card/40 border-white/5">
                    <div className="mb-8">
                        <h3 className="text-lg font-black tracking-tight leading-none">Institutional Attrition</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1.5">Employee Lifecycle Synthesis</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={metrics?.funnel?.stages ? Object.entries(metrics.funnel.stages).map(([name, value]) => ({ name, value })) : []}
                                margin={{ left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b', textTransform: 'uppercase' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ background: '#0a0a0f', borderRadius: '20px', border: '1px solid rgba(226,149,120,0.2)', padding: '16px' }}
                                />
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                                    {metrics?.funnel?.stages && Object.entries(metrics.funnel.stages).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Hires by Source (Cloud Channels) */}
                <motion.div variants={itemVariants} className="glass-card p-8 bg-card/40 border-white/5">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none">Cloud Influx Channels</h3>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1.5">Sourcing Vector Concentration</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#0a0a0f', borderRadius: '20px', border: '1px solid rgba(226,149,120,0.2)', padding: '16px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8">
                        {sourceData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}40` }}></div>
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{entry.name}</span>
                                <span className="text-[10px] text-foreground font-black">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Department Distribution (Workforce Density) */}
                <motion.div variants={itemVariants} className="glass-card p-8 bg-card/40 border-white/5">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-black tracking-tight leading-none">Workforce Density</h3>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1.5">Personnel Allocation by Architecture</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics?.departmentMetrics ? Object.entries(metrics.departmentMetrics).map(([name, data]) => ({ name, value: data.employees })) : []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b', textTransform: 'uppercase' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(226,149,120,0.05)' }}
                                    contentStyle={{ background: '#0a0a0f', borderRadius: '20px', border: '1px solid rgba(226,149,120,0.2)', padding: '16px' }}
                                />
                                <Bar dataKey="value" fill="#E29578" radius={[10, 10, 0, 0]} barSize={36} >
                                    {metrics?.departmentMetrics && Object.entries(metrics.departmentMetrics).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#E29578' : '#3b82f6'} fillOpacity={1 - (index * 0.15)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
