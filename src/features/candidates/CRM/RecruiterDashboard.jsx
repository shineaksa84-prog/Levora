import { useState } from 'react';
import {
    Calendar, Clock, Users, CheckCircle2,
    ArrowRight, Sparkles, Filter,
    MessageSquare, Phone, MoreHorizontal,
    TrendingUp, Zap, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecruiterDashboard() {
    const [selectedRole, setSelectedRole] = useState('All Roles');

    const metrics = [
        { label: 'Active Candidates', value: '428', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Avg. Time to Close', value: '18d', trend: '-2d', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Offer Accept Rate', value: '88%', trend: '+5%', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Pipeline Velocity', value: 'High', trend: 'Stable', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    const tasks = [
        { id: 1, type: 'call', candidate: 'Sarah Chen', role: 'Sr. Backend Eng', time: '10:00 AM', priority: 'High', status: 'Pending' },
        { id: 2, type: 'interview', candidate: 'Alex Rivera', role: 'Product Design', time: '11:30 AM', priority: 'High', status: 'Confirmed' },
        { id: 3, type: 'followup', candidate: 'Jordan Smith', role: 'Staff React Dev', time: '2:00 PM', priority: 'Medium', status: 'Pending' },
        { id: 4, type: 'feedback', candidate: 'Lisa Wong', role: 'Cloud Architect', time: '4:30 PM', priority: 'Critical', status: 'Urgent' },
    ];

    const pipeline = [
        { stage: 'Sourcing', count: 145, color: 'bg-blue-500' },
        { stage: 'Screening', count: 82, color: 'bg-indigo-500' },
        { stage: 'Interview', count: 34, color: 'bg-purple-500' },
        { stage: 'Offer', count: 12, color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-vibrant-mesh p-10 border border-border/50">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/80">Recruiter Command Center</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            Global <span className="text-primary italic">Talent Hub</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Synchronizing 428 active candidates across 12 high-priority roles.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-6 py-4 bg-white/70 backdrop-blur-xl border border-border/50 rounded-2xl font-black text-sm hover:bg-white transition-all shadow-xl active:scale-95">
                            Batch Review Mode
                        </button>
                        <button className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            New Hiring Drive
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, idx) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 group hover:border-primary/50 transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color}`}>
                                <metric.icon className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                                <TrendingUp className="w-3 h-3" />
                                {metric.trend}
                            </div>
                        </div>
                        <div className="text-2xl font-black mb-1">{metric.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                            {metric.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Daily Roadmap */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Daily Roadmap
                        </h2>
                        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-xl border border-border/50">
                            {['Today', 'Upcoming', 'Needs Action'].map(tab => (
                                <button
                                    key={tab}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${tab === 'Today' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tasks.map((task, idx) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (idx * 0.05) }}
                                className="group glass-card p-5 flex items-center justify-between hover:bg-primary/5 transition-all border-l-4 border-l-border hover:border-l-primary"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm uppercase ${task.type === 'call' ? 'bg-blue-50 text-blue-600' :
                                            task.type === 'interview' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                                        }`}>
                                        {task.candidate[0]}{task.candidate.split(' ')[1][0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-black text-sm">{task.candidate}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.1em] ${task.priority === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{task.role} • {task.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-muted border-2 border-white text-[8px] flex items-center justify-center font-bold">HM</div>
                                        ))}
                                    </div>
                                    <button className="p-2.5 rounded-xl bg-white border border-border shadow-sm hover:border-primary group-hover:bg-primary group-hover:text-white transition-all active:scale-95">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pipeline Health */}
                <div className="space-y-8">
                    <section className="glass-card p-8 bg-black/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Funnel Health
                            </h3>
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-end justify-between h-48 gap-4 px-4">
                            {pipeline.map(item => (
                                <div key={item.stage} className="flex flex-col items-center flex-1 group">
                                    <div className="mb-2 text-xs font-black text-foreground">
                                        {item.count}
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(item.count / 150) * 100}%` }}
                                        className={`w-full rounded-t-xl ${item.color} opacity-80 group-hover:opacity-100 transition-opacity shadow-lg`}
                                    />
                                    <div className="mt-4 text-[8px] font-black uppercase tracking-tighter text-muted-foreground text-center">
                                        {item.stage}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass-card p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary rounded-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest text-primary">AI Strategy Pick</div>
                        </div>
                        <h4 className="font-black text-xl leading-tight mb-2">High Rejection Trend in Frontend Round 2</h4>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
                            AI synthesis shows a 24% increase in drop-offs during live coding. Recommend adjusting problem complexity.
                        </p>
                        <button className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                            Review Skill Matrix
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
