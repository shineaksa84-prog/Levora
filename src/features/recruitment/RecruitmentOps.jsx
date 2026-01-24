import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    X, Settings, BarChart3, PieChart,
    TrendingUp, ShieldCheck, Search, Filter,
    Target, Users, Zap, AlertCircle,
    CheckCircle2, Info
} from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function RecruitmentOps({ onClose }) {
    const [activeSection, setActiveSection] = useState('efficiency'); // efficiency, quality, integrity

    const metrics = [
        { label: 'Quality of Hire (90d)', value: '88%', trend: '+4%', icon: Target, color: 'text-primary' },
        { label: 'Candidate NPS (cNPS)', value: '72', trend: '+12', icon: Zap, color: 'text-amber' },
        { label: 'Time-to-Hire (Avg)', value: '22d', trend: '-3d', icon: BarChart3, color: 'text-violet' },
        { label: 'Data Integrity', value: '94%', trend: '+2%', icon: ShieldCheck, color: 'text-green' }
    ];

    const bottlenecks = [
        { stage: 'Screening', time: '1.2d', status: 'Optimal', color: 'bg-green-500' },
        { stage: 'Technical Interview', time: '4.8d', status: 'Alert', color: 'bg-amber-500' },
        { stage: 'Hiring Manager Review', time: '5.2d', status: 'Critical', color: 'bg-red-500' },
        { stage: 'Offer Stage', time: '1.1d', status: 'Optimal', color: 'bg-green-500' }
    ];

    const audits = [
        { label: 'Job Description Audit', lastRun: '12d ago', status: 'In Review', progress: 65 },
        { label: 'Sourcing Channel ROI', lastRun: '45d ago', status: 'Completed', progress: 100 },
        { label: 'Recruiter Load Balance', lastRun: '1d ago', status: 'Healthy', progress: 88 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-8 border-b border-border/50 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Recruitment Operations</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Process Efficiency • Quality of Hire • structural Audit</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 flex gap-10">
                    {/* Sidebar Nav */}
                    <aside className="w-64 space-y-2">
                        {[
                            { id: 'efficiency', label: 'Flow Efficiency', icon: BarChart3, desc: 'Bottleneck analysis' },
                            { id: 'quality', label: 'Quality of Hire', icon: Target, desc: '90-day retention & perf' },
                            { id: 'integrity', label: 'Data & Audit', icon: ShieldCheck, desc: 'SOP & Tag compliance' },
                            { id: 'diversity', label: 'Inclusion Pulse', icon: Users, desc: 'Aggregate diversity data' }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full p-4 rounded-2xl text-left transition-all border ${activeSection === item.id ? 'bg-white border-primary/20 shadow-lg' : 'hover:bg-muted/50 border-transparent'}`}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`text-xs font-black uppercase tracking-widest ${activeSection === item.id ? 'text-primary' : ''}`}>{item.label}</span>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground">{item.desc}</p>
                            </button>
                        ))}

                        <div className="mt-10 p-4 bg-muted/30 rounded-2xl border border-dashed border-border/50">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                                <Info className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-widest">SOP Reminder</span>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed italic">
                                "Screen for skills before culture fit. Always close the loop within 5 days."
                            </p>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 space-y-8">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            {metrics.map(m => (
                                <div key={m.label} className="p-5 bg-white border border-border/50 rounded-2xl space-y-2 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <m.icon className={`w-4 h-4 ${m.color}`} />
                                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{m.trend}</span>
                                    </div>
                                    <p className="text-2xl font-black">{m.value}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{m.label}</p>
                                </div>
                            ))}
                        </div>

                        {activeSection === 'efficiency' && (
                            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="p-8 bg-black/5 rounded-3xl border border-border/50">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-primary" />
                                        Hiring Bottleneck Analyzer
                                    </h3>
                                    <div className="space-y-6">
                                        {bottlenecks.map(b => (
                                            <div key={b.stage} className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-xs font-black">{b.stage}</p>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Stage Time: {b.time}</p>
                                                    </div>
                                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${b.status === 'Optimal' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {b.status}
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: b.status === 'Optimal' ? '20%' : b.status === 'Alert' ? '60%' : '90%' }}
                                                        className={`h-full ${b.color}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                        <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">Sourcing ROI Review</h4>
                                        <p className="text-xs font-black mb-1">LinkedIn Recruiter - 42% Yield</p>
                                        <p className="text-[10px] font-bold text-muted-foreground mb-4">Down 12% vs. Previous Quarter</p>
                                        <button className="text-[10px] font-black uppercase text-primary underline">Download Full ROI Audit</button>
                                    </div>
                                    <div className="p-6 bg-violet-50 border border-violet-100 rounded-2xl">
                                        <h4 className="text-[10px] font-black uppercase text-violet-600 tracking-widest mb-4">Recruiter Load Balance</h4>
                                        <p className="text-xs font-black mb-1">Elena: 12 Active Roles</p>
                                        <p className="text-[10px] font-bold text-muted-foreground mb-4">Status: Optimal Capacity</p>
                                        <div className="flex gap-1 h-1.5">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => <div key={i} className="flex-1 bg-violet-500 rounded-full" />)}
                                            {[1, 2, 3].map(i => <div key={i} className="flex-1 bg-muted-foreground/10 rounded-full" />)}
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'quality' && (
                            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/20">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-primary" />
                                        90-Day Quality of Hire Loop
                                    </h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Retention Rate</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-black text-primary">96%</span>
                                                <span className="text-[10px] font-bold text-green-600 mb-2">+2.1% YoY</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full">
                                                <div className="h-full bg-primary w-[96%] rounded-full" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Manager Satisfaction</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-black text-violet-600">4.8/5</span>
                                                <span className="text-[10px] font-bold text-muted-foreground mb-2">High Performance</span>
                                            </div>
                                            <div className="flex gap-1 h-1.5 w-full">
                                                {[1, 2, 3, 4, 5].map(i => <div key={i} className={`flex-1 rounded-full ${i <= 4 ? 'bg-violet-600' : 'bg-muted'}`} />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white border border-border/50 rounded-2xl">
                                    <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">Post-Hire Performance Correlation</h4>
                                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-xl border border-dashed border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                                <TrendingUp className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black">Top 10% Hires</p>
                                                <p className="text-[10px] font-bold text-muted-foreground">Source: Employee Referrals</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-primary">0.82 Pearson Coeff.</span>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'integrity' && (
                            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {audits.map(audit => (
                                        <div key={audit.label} className="p-6 bg-white border border-border/50 rounded-2xl flex items-center justify-between group hover:border-primary/50 transition-all">
                                            <div className="space-y-1">
                                                <p className="text-sm font-black">{audit.label}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Last Run: {audit.lastRun}</p>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: `${audit.progress}%` }} />
                                                </div>
                                                <button className="p-2 bg-muted/50 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                                                    <TrendingUp className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <AlertCircle className="w-5 h-5 text-amber-600" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-amber-700">Data Hygiene Alerts</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-amber-600 uppercase tracking-widest border-b border-amber-200 pb-2">
                                            <span>Observation</span>
                                            <span>Action Required</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <p className="text-amber-800">12% of hired candidates missing retention tags.</p>
                                            <button className="underline font-black text-amber-700">Auto-Fix Sync</button>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <p className="text-amber-800">Quarterly JD Audit overdue for Engineering roles.</p>
                                            <button className="underline font-black text-amber-700">Initiate Audit</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'diversity' && (
                            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="p-8 bg-black/5 rounded-3xl border border-border/50">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                            <Users className="w-4 h-4 text-primary" />
                                            Inclusion Pulse (Responsible Anonymity)
                                        </h3>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                                            <ShieldCheck className="w-3 h-3" />
                                            <span className="text-[8px] font-black uppercase">GDPR/EEOC Shield Active</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="p-4 bg-white rounded-2xl border border-border/50 text-center">
                                            <p className="text-[20px] font-black">34%</p>
                                            <p className="text-[8px] font-black uppercase text-muted-foreground">Underrepresented</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-border/50 text-center">
                                            <p className="text-[20px] font-black">12%</p>
                                            <p className="text-[8px] font-black uppercase text-muted-foreground">Neurodivergent</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-border/50 text-center">
                                            <p className="text-[20px] font-black">8%</p>
                                            <p className="text-[8px] font-black uppercase text-muted-foreground">Veteran Status</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">Pipeline Equity Audit</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                                            <span>Sourcing Mix</span>
                                            <span>Benchmark Gap</span>
                                        </div>
                                        <div className="p-3 bg-white border border-border/50 rounded-xl flex items-center justify-between">
                                            <span className="text-xs font-bold">Diverse Candidate Pipeline</span>
                                            <span className="text-xs font-black text-amber-600">-5.2% below target</span>
                                        </div>
                                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
                                            <span className="text-xs font-bold">Bias Training Compliance</span>
                                            <span className="text-xs font-black text-green-600">100% (Recruiters)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border border-blue-100 bg-blue-50 rounded-2xl text-center">
                                    <p className="text-[10px] font-black text-blue-700 uppercase mb-1">Impact Opportunity</p>
                                    <p className="text-xs font-medium text-blue-900">Expanding veteran outreach could improve technical hiring velocity by 12% based on historical referral loops.</p>
                                </div>
                            </motion.section>
                        )}
                    </main>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Next Process Iteration: Q1 2026 Strategy Review
                    </div>
                    <button
                        onClick={() => toast.success("Recruitment SOP exported to central knowledge base.")}
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                        <Search className="w-3 h-3" />
                        Full Compliance Audit
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
