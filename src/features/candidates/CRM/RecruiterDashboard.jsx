import { useState } from 'react';
import {
    Calendar, Clock, Users, CheckCircle2,
    ArrowRight, Sparkles, Filter,
    MessageSquare, Phone, MoreHorizontal,
    TrendingUp, Zap, Target, Globe,
    ShieldAlert, ShieldCheck, Rocket, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../../lib/services/toastService';
import RecruitmentOps from '../../recruitment/RecruitmentOps';

export default function RecruiterDashboard() {
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [showOps, setShowOps] = useState(false);

    const metrics = [
        { label: 'Quality of Hire', value: '88%', trend: '+4%', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Decision Velocity', value: '4.2d', trend: '-18%', icon: Zap, color: 'text-amber', bg: 'bg-amber/10' },
        { label: 'Candidate NPS', value: '72', trend: '+12', icon: MessageSquare, color: 'text-violet', bg: 'bg-violet/10' },
        { label: 'Data Integrity', value: '94%', trend: '+2%', icon: ShieldCheck, color: 'text-green', bg: 'bg-green/10' },
    ];

    const tasks = [
        { id: 1, type: 'call', candidate: 'Sarah Chen', role: 'Sr. Backend Eng', time: '10:00 AM', priority: 'High', status: 'Pending' },
        { id: 2, type: 'interview', candidate: 'Alex Rivera', role: 'Product Design', time: '11:30 AM', priority: 'High', status: 'Confirmed' },
        { id: 3, type: 'followup', candidate: 'Jordan Smith', role: 'Staff React Dev', time: '2:00 PM', priority: 'Medium', status: 'Pending' },
        { id: 4, type: 'feedback', candidate: 'Lisa Wong', role: 'Cloud Architect', time: '4:30 PM', priority: 'Critical', status: 'Ghosting Risk', sla: '4h left' },
    ];

    const slaBreaches = [
        { candidate: 'Tom Hardy', role: 'DevOps', overdue: '2 days', type: 'Rejection SLA' },
        { candidate: 'Emma Watson', role: 'UX lead', overdue: '18h', type: 'Interview Feedback' },
    ];

    const pipeline = [
        { stage: 'Sourcing', count: 145, color: 'bg-primary' },
        { stage: 'Screening', count: 82, color: 'bg-violet' },
        { stage: 'Interview', count: 34, color: 'bg-accent' },
        { stage: 'Offer', count: 12, color: 'bg-secondary' },
    ];

    const sourceEfficiency = [
        { name: 'LinkedIn', value: 35, color: 'bg-blue-500' },
        { name: 'Referral', value: 25, color: 'bg-green-500' },
        { name: 'Niche Community', value: 20, color: 'bg-amber-500' },
        { name: 'Alumni', value: 15, color: 'bg-violet' },
        { name: 'Direct', value: 5, color: 'bg-secondary' },
    ];

    const sourcerPerformance = [
        { name: 'Elena G.', responseRate: '72%', status: 'Top Performer' },
        { name: 'Marcus R.', responseRate: '64%', status: 'Improving' },
        { name: 'Tasha W.', responseRate: '58%', status: 'Stable' },
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
                        <p className="text-muted-foreground font-medium max-w-sm flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Synchronizing 428 active candidates across 12 high-priority roles.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => toast.info("Batch Review Mode initialized. Synchronizing 42 profiles...")}
                            className="px-6 py-4 bg-white/70 backdrop-blur-xl border border-border/50 rounded-2xl font-black text-sm hover:bg-white transition-all shadow-xl active:scale-95"
                        >
                            Batch Review Mode
                        </button>
                        <button
                            onClick={() => toast.success("New Hiring Drive protocol initiated.")}
                            className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
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
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="glass-card p-6 group hover:border-primary/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-primary/5"
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
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm uppercase ${task.type === 'call' ? 'bg-primary/10 text-primary' :
                                        task.type === 'interview' ? 'bg-violet/10 text-violet' : 'bg-accent/10 text-accent'
                                        }`}>
                                        {task.candidate[0]}{task.candidate.split(' ')[1][0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-black text-sm">{task.candidate}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.1em] relative ${task.priority === 'Critical' ? 'bg-red-100 text-red-600 shadow-[0_0_15px_-3px_rgba(220,38,38,0.5)] animate-pulse' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {task.priority === 'Critical' && (
                                                    <span className="absolute -left-1 -top-1 flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                    </span>
                                                )}
                                                {task.status === 'Ghosting Risk' ? `Ghosting Risk: ${task.sla}` : task.priority}
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
                                    <button
                                        onClick={() => toast.success(`Task for ${task.candidate} marked as complete.`)}
                                        className="p-2.5 rounded-xl bg-white border border-border shadow-sm hover:border-primary group-hover:bg-primary group-hover:text-white transition-all active:scale-95"
                                    >
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

                    <section className="glass-card p-8 bg-black/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                Source Attribution
                            </h3>
                            <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-1 rounded">Top: LinkedIn</span>
                        </div>
                        <div className="space-y-4">
                            {sourceEfficiency.map(source => (
                                <div key={source.name} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span>{source.name}</span>
                                        <span>{source.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${source.value}%` }}
                                            className={`h-full ${source.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass-card p-8 bg-black/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Settings className="w-4 h-4 text-primary" />
                                Operations Pulse
                            </h3>
                            <button
                                onClick={() => setShowOps(true)}
                                className="text-[10px] font-black uppercase text-primary underline"
                            >
                                Full Audit
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-2xl border border-border/50 space-y-2">
                                <p className="text-[8px] font-black uppercase text-muted-foreground">Manager Satisfaction</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-xl font-black">4.8</p>
                                    <p className="text-[10px] font-bold text-green-600 mb-1">/ 5.0</p>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full">
                                    <div className="h-full bg-green-500 w-[96%]" />
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-border/50 space-y-2">
                                <p className="text-[8px] font-black uppercase text-muted-foreground">Recruiter Load</p>
                                <div className="flex gap-1 h-2 items-end">
                                    {[20, 45, 80, 40, 60].map((h, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-sm ${h > 70 ? 'bg-red-500' : 'bg-primary'}`}
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-[6px] font-black uppercase text-muted-foreground">Team Heatmap</p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-muted/30 rounded-2xl border border-dashed border-border/50">
                            <p className="text-[8px] font-black uppercase text-muted-foreground mb-2">Hiring Bottlenecks</p>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <span>HM Review (Engineering)</span>
                                <span className="text-red-600">5.2d (High Risk)</span>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary rounded-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest text-primary">Strategic Pulse</div>
                        </div>
                        <h4 className="font-black text-xl leading-tight mb-2">Referral Nudge Protocol</h4>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
                            Elena, 14 of your top referral sources haven't been engaged in &gt;60 days. Nudge them now to keep the talent pipeline healthy.
                        </p>
                        <button
                            onClick={() => toast.success("Referral nudge sequence initiated for 14 contacts.")}
                            className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Execute Nudge Protocol
                        </button>
                    </section>
                </div>
            </div>

            <AnimatePresence>
                {showOps && (
                    <RecruitmentOps onClose={() => setShowOps(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
