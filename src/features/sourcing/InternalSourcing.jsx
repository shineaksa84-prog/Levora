import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Star, ArrowUpRight, ShieldCheck, UserPlus, Heart, Zap, Sparkles } from 'lucide-react';

const INTERNAL_TALENT = [
    {
        id: 'int-1',
        name: 'Arjun Mehta',
        role: 'Senior Software Engineer',
        currentDept: 'Engineering',
        tenure: '3.5 Years',
        potential: 'High',
        mobilityMatch: 95,
        skills: ['Distributed Systems', 'Go', 'Kubernetes'],
        type: 'HiPo Employee'
    },
    {
        id: 'int-2',
        name: 'Priya Sharma',
        role: 'Marketing Specialist',
        currentDept: 'Growth',
        tenure: '2 Years',
        potential: 'Moderate',
        mobilityMatch: 88,
        skills: ['Data Ops', 'Content Strategy', 'SEO'],
        type: 'Internal Applicant'
    },
    {
        id: 'ref-1',
        name: 'Vikram Singh',
        role: 'Product Lead',
        referredBy: 'Sarah Connor',
        relationship: 'Ex-Colleague',
        mobilityMatch: 92,
        skills: ['Product Roadmap', 'FinTech', 'Agile'],
        type: 'Employee Referral'
    }
];

export default function InternalSourcing() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mobility Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mr-6 -mt-6"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Internal Pipeline</p>
                            <h3 className="text-2xl font-black text-foreground mt-1">24</h3>
                        </div>
                        <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">8 NEW</span>
                        <span className="text-[10px] text-muted-foreground font-medium">this week</span>
                    </div>
                </div>

                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">HiPo Score</p>
                            <h3 className="text-2xl font-black text-emerald-500 mt-1">92%</h3>
                        </div>
                        <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg border border-emerald-500/20">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-wider">Avg. Mobility Index</p>
                </div>

                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Referral ROI</p>
                            <h3 className="text-2xl font-black text-foreground mt-1">4.2x</h3>
                        </div>
                        <div className="p-2 bg-pink-500/10 text-pink-600 rounded-lg border border-pink-500/20">
                            <Heart className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-wider">Hiring Velocity Impact</p>
                </div>

                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Alumni Revisits</p>
                            <h3 className="text-2xl font-black text-blue-500 mt-1">12</h3>
                        </div>
                        <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg border border-blue-500/20">
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-wider">Active Boomerangs</p>
                </div>
            </div>

            {/* Internal Talent Matrix */}
            <div className="glass-card overflow-hidden">
                <div className="p-8 border-b border-border bg-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-foreground flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                            Internal Mobility Matrix
                        </h2>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Surfacing internal stars & verified referrals</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Filter HiPo
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 divide-y divide-border/50">
                    {INTERNAL_TALENT.map((talent, idx) => (
                        <div key={talent.id} className="p-6 hover:bg-white/5 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-primary to-accent p-[2px] shadow-lg">
                                            <div className="w-full h-full rounded-[2rem] bg-card flex items-center justify-center font-black text-xl text-foreground">
                                                {talent.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-border">
                                            {talent.type.includes('Employee') ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <UserPlus className="w-3 h-3 text-pink-500" />}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-lg font-black text-foreground">{talent.name}</h4>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${talent.type === 'HiPo Employee' ? 'bg-emerald-500/10 text-emerald-600' :
                                                    talent.type === 'Employee Referral' ? 'bg-pink-500/10 text-pink-600' :
                                                        'bg-blue-500/10 text-blue-600'
                                                }`}>
                                                {talent.type}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wider">
                                            {talent.role} {talent.currentDept && `• ${talent.currentDept}`} {talent.referredBy && `• Referred by ${talent.referredBy}`}
                                        </p>
                                        <div className="flex gap-2 mt-3">
                                            {talent.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-muted/40 border border-border/50 rounded-md text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-center">
                                        <div className="flex items-center gap-1.5 justify-center">
                                            <Sparkles className="w-3 h-3 text-primary" />
                                            <span className="text-xl font-black text-foreground">{talent.mobilityMatch}%</span>
                                        </div>
                                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Match Index</div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                                            Initialize Transition
                                        </button>
                                        <button className="text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">
                                            View Performance DNA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-muted/20 border-t border-border text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        Showing top {INTERNAL_TALENT.length} internal mobility vectors ranked by AI match index
                    </p>
                </div>
            </div>
        </div>
    );
}
