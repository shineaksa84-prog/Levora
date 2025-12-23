import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar, Loader2, TrendingUp, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { geminiService } from '../../lib/ai/gemini';
import { getRecruitmentAnalytics } from '../../lib/services/analyticsService';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#8b5cf6'];

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
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
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
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse leading-none">Synthesizing Cloud Intelligence</p>
            </div>
        );
    }

    const handleExport = () => {
        if (!metrics) return;
        const csvRows = [
            ['Metric', 'Value'],
            ['Total Applicants', metrics.funnel?.totalApplicants || 0],
            ['Total Hired', metrics.funnel?.totalHired || 0],
            ['Conversion Overall', `${metrics.funnel?.conversionRates?.Overall || 0}%`],
            ['Avg Time to Hire (Days)', metrics.timeToHire?.average || 0]
        ];
        const csvString = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Levora_Intelligence_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="space-y-8 pb-12"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 font-display">Analytics</h1>
                    <p className="text-slate-500 mt-1 font-medium">Strategic intelligence across your recruitment cloud</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                        <Calendar className="w-4 h-4" />
                        H2 2025
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-5 py-2.5 gradient-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/10 active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Export Data
                    </button>
                </div>
            </div>

            {/* AI Insights Card */}
            <motion.div
                variants={itemVariants}
                className="bg-vibrant-mesh border border-indigo-200/50 rounded-3xl p-8 shadow-2xl shadow-indigo-900/5 overflow-hidden relative"
            >
                <div className="absolute -top-12 -right-12 p-8 opacity-5 pointer-events-none rotate-12">
                    <Sparkles className="w-64 h-64 text-indigo-900" />
                </div>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 leading-none">AI Intelligence Layer</h3>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Live from Gemini Pro</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="flex flex-col gap-4 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm transition-all group"
                        >
                            <div className={`w-10 h-1.5 rounded-full ${insight.status === 'success' ? 'bg-emerald-500' :
                                    insight.status === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                                }`} />
                            <p className="text-sm font-bold text-slate-700 leading-relaxed tracking-tight">{insight.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Time to Hire Chart */}
                <motion.div variants={itemVariants} className="glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 font-display leading-none">Velocity Trends</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Hiring Speed (Days)</p>
                        </div>
                        {metrics?.timeToHire && (
                            <div className="text-right">
                                <p className="text-3xl font-black text-indigo-600 font-display leading-none">{metrics.timeToHire.average}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">AVG DAYS</p>
                            </div>
                        )}
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timeToHireTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="days"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    dot={{ r: 4, strokeWidth: 3, fill: '#fff', stroke: '#6366f1' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Recruitment Funnel */}
                <motion.div variants={itemVariants} className="glass-card p-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-slate-900 font-display leading-none">Conversion Funnel</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Lifecycle Stages</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={metrics?.funnel?.stages ? Object.entries(metrics.funnel.stages).map(([name, value]) => ({ name, value })) : []}
                                margin={{ left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                                    {metrics?.funnel?.stages && Object.entries(metrics.funnel.stages).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Hires by Source */}
                <motion.div variants={itemVariants} className="glass-card p-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-slate-900 font-display leading-none">Cloud Channels</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Hiring Source mix</p>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={6}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8">
                        {sourceData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{entry.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Department Distribution */}
                <motion.div variants={itemVariants} className="glass-card p-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-slate-900 font-display leading-none">Workforce Density</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Employees by Department</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics?.departmentMetrics ? Object.entries(metrics.departmentMetrics).map(([name, data]) => ({ name, value: data.employees })) : []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
