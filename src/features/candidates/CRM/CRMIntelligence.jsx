import React from 'react';
import {
    LineChart, Line, AreaChart, Area,
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    TrendingUp, Users, Clock,
    Target, Zap, Briefcase,
    ArrowUpRight, ArrowDownRight,
    Globe, Shield, Brain
} from 'lucide-react';
import { motion } from 'framer-motion';

const pipelineData = [
    { name: 'Week 1', apps: 45, interviews: 12, offers: 2 },
    { name: 'Week 2', apps: 52, interviews: 15, offers: 4 },
    { name: 'Week 3', apps: 38, interviews: 18, offers: 3 },
    { name: 'Week 4', apps: 65, interviews: 22, offers: 6 },
];

const sourceData = [
    { name: 'LinkedIn', value: 45, color: '#0077B5' },
    { name: 'Referrals', value: 25, color: '#10B981' },
    { name: 'Direct', value: 20, color: '#6366F1' },
    { name: 'Job Boards', value: 10, color: '#F59E0B' },
];

const velocityData = [
    { stage: 'Sourcing', days: 4 },
    { stage: 'Screening', days: 3 },
    { stage: 'Technical', days: 7 },
    { stage: 'Cultural', days: 2 },
    { stage: 'Offer', days: 2 },
];

export default function CRMIntelligence() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header section with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Pipeline Velocity', value: '18 Days', trend: '-2.4d', icon: Clock, color: 'text-blue-500' },
                    { label: 'Cost Per Hire', value: '$4,250', trend: '-12%', icon: Target, color: 'text-emerald-500' },
                    { label: 'Offer Acceptance', value: '92%', trend: '+4%', icon: Zap, color: 'text-amber-500' },
                    { label: 'Diversity Index', value: '0.84', trend: '+0.05', icon: Shield, color: 'text-purple-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-l-4 border-l-primary/20 hover:border-l-primary transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                {stat.trend.includes('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-3xl font-black tracking-tight mb-1">{stat.value}</h3>
                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Pipeline Growth */}
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Recruitment Funnel Growth</h3>
                            <p className="text-xs text-muted-foreground font-medium">Weekly snapshot of application to offer conversion</p>
                        </div>
                        <select className="bg-muted/50 border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-2 ring-primary/20">
                            <option>Last 30 Days</option>
                            <option>Last Quarter</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={pipelineData}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="apps" stroke="var(--primary)" fillOpacity={1} fill="url(#colorApps)" strokeWidth={4} />
                                <Area type="monotone" dataKey="interviews" stroke="#6366F1" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source ROI */}
                <div className="glass-card p-8">
                    <h3 className="text-xl font-black tracking-tight mb-2">Talent Sourcing ROI</h3>
                    <p className="text-xs text-muted-foreground font-medium mb-8">Direct impact of sourcing channels</p>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {sourceData.map(item => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="text-xs font-black">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Stage Velocity */}
                <div className="glass-card p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Stage-by-Stage Velocity</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={velocityData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="stage"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'black' }}
                                    width={100}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="days" fill="var(--primary)" radius={[0, 10, 10, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="bg-vibrant-mesh p-8 rounded-[2rem] border border-border/50 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white rounded-2xl shadow-xl">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tight leading-none italic">AI Predictions</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Strategy Recommendations</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Retention Risk High', desc: 'Candidates from source "Direct" show 20% lower offer acceptance.', action: 'Review Compensation' },
                                { title: 'Interview Bottleneck', desc: 'Technical stage avg. is 7 days, 40% above industry standard.', action: 'Auto-Schedule' },
                                { title: 'Sentiment Drift', desc: 'Positive sentiment dropped by 12% in Backend roles this week.', action: 'Analyze Feedback' }
                            ].map((insight, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/60 transition-all cursor-pointer"
                                >
                                    <h4 className="text-sm font-black mb-1">{insight.title}</h4>
                                    <p className="text-xs text-muted-foreground font-medium mb-3">{insight.desc}</p>
                                    <button className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline flex items-center gap-1">
                                        {insight.action} <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
                </div>
            </div>
        </div>
    );
}
