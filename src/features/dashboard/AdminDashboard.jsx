import DashboardStats from './DashboardStats';
import RecruitmentFunnel from './RecruitmentFunnel';
import RecentActivity from './RecentActivity';
import DailyBriefing from './DailyBriefing';
import { Sparkles, Calendar } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(226,149,120,0.3)]">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Levora Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        Command <span className="gradient-text italic">Center</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Orchestrating organizational equilibrium through real-time data synthesis and predictive intelligence. Witness the convergence of human capital and operational excellence.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 glass-card hover:bg-white/5 rounded-2xl font-black text-xs hover:border-primary/30 transition-all active:scale-95 text-foreground">
                        <Calendar className="w-4 h-4" /> Initiate Strategic Audit
                    </button>
                    <button className="cyber-button-primary flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(226,149,120,0.3)]">
                        Extract Intelligence
                    </button>
                </div>
            </div>

            <DashboardStats />

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <RecruitmentFunnel />
                    <RecentActivity />
                </div>
                <div className="space-y-8">
                    <DailyBriefing />

                    {/* Intelligence Module 1: Institutional Momentum */}
                    <div className="glass-card p-6 bg-primary/5 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Institutional Momentum</h4>
                        <div className="flex gap-1 items-end h-20">
                            {[40, 60, 45, 90, 65, 30, 85, 45, 70, 55, 80, 40, 50, 75, 60].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-primary/30 rounded-t-sm group-hover:bg-primary transition-all duration-300"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Intelligence Module 2: AI Predictive Load (New) */}
                    <div className="glass-card p-6 bg-secondary/5 border-secondary/20 relative group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">Neural Workload Integration</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                                <span>Optimization Engine</span>
                                <span className="text-secondary">94% Stability</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-[94%]" />
                            </div>
                            <p className="text-[9px] text-muted-foreground font-medium italic">
                                "The system is currently operating at peak efficiency. Strategic bandwidth has exceeded Q4 projections by 12%."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
