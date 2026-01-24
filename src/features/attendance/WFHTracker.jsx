import { useState } from 'react';
import { Home, Globe, Laptop, Check, X, AlertTriangle } from 'lucide-react';

const MOCK_WFH_REQUESTS = [
    { id: 1, employee: 'John Doe', date: '2023-12-10', reason: 'Plumber visit', status: 'Pending', ip_risk: 'Low' },
    { id: 2, employee: 'Jane Smith', date: '2023-12-11', reason: 'Not feeling well', status: 'Approved', ip_risk: 'Low' },
    { id: 3, employee: 'Mike Ross', date: '2023-12-12', reason: 'Personal work', status: 'Pending', ip_risk: 'High (Unusual ISP)' },
];

export default function WFHTracker() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Command Header */}
            <div className="bg-card border border-border p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-[100px] animate-pulse"></div>
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-black text-foreground flex items-center gap-6 uppercase tracking-tighter">
                            <div className="p-4 bg-foreground text-background rounded-2xl -rotate-3 shadow-2xl">
                                <Laptop className="w-8 h-8" />
                            </div>
                            Remote Work <span className="text-primary italic">Command</span>
                        </h2>
                        <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mt-4 ml-24">
                            Connectivity Validation // Distributed Workforce Protocol
                        </p>
                    </div>
                    <div className="flex gap-12 bg-background/50 p-6 rounded-[2rem] border border-border shadow-inner">
                        <div className="text-right">
                            <p className="text-4xl font-black text-primary tracking-tighter">14%</p>
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Remote Saturation</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Protocol Queue */}
                <div className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden relative group">
                    <div className="p-8 border-b border-border flex justify-between items-center bg-primary/[0.02]">
                        <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em]">Active Request Protocol</h3>
                        <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
                            02 Critical
                        </span>
                    </div>
                    <div className="divide-y divide-border/30">
                        {MOCK_WFH_REQUESTS.map(req => (
                            <div key={req.id} className="p-8 hover:bg-primary/[0.02] transition-all duration-300 group/item">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center font-black text-lg transition-transform group-hover/item:scale-110">
                                            {req.employee.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-foreground text-sm uppercase tracking-tight">{req.employee}</p>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60 mt-1">{req.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'
                                        }`}>{req.status}</span>
                                </div>
                                <div className="bg-background/50 border border-border p-5 rounded-2xl mb-6 italic relative overflow-hidden">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-primary/20"></div>
                                    <p className="text-xs font-black text-muted-foreground/80 leading-relaxed uppercase tracking-tight">"{req.reason}"</p>
                                </div>

                                {req.ip_risk.includes('High') && (
                                    <div className="flex items-center gap-3 text-[10px] text-rose-500 font-black mb-6 uppercase tracking-widest bg-rose-500/5 p-3 rounded-xl border border-rose-500/10">
                                        <AlertTriangle className="w-3 h-3 animate-pulse" /> Security Anomaly: {req.ip_risk}
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                                        <Check className="w-3 h-3" /> Authorize
                                    </button>
                                    <button className="flex-1 bg-background text-foreground border border-border text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-3">
                                        <X className="w-3 h-3" /> Terminate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Governance & Matrix */}
                <div className="space-y-10">
                    <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1 h-full bg-primary/20"></div>
                        <h3 className="text-sm font-black text-foreground mb-8 uppercase tracking-[0.2em]">Institutional Compliance Matrix</h3>
                        <div className="space-y-10">
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                                    <span className="text-muted-foreground/60">Department Saturation Limit (20%)</span>
                                    <span className="text-primary">14% Utilized</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner p-0.5 border border-border">
                                    <div className="h-full bg-primary rounded-full w-[70%] shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                                    <span className="text-muted-foreground/60">Squad Rotation Health</span>
                                    <span className="text-rose-500 italic">Audit Required</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner p-0.5 border border-border">
                                    <div className="h-full bg-foreground rounded-full w-[40%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-foreground text-background rounded-[3rem] p-10 shadow-2xl border border-white/10 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-sm font-black text-primary mb-4 flex items-center gap-4 uppercase tracking-[0.2em]">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Globe className="w-5 h-5 text-primary" />
                            </div>
                            Neural IP Watchtower
                        </h3>
                        <p className="text-[11px] font-black text-white/50 leading-relaxed uppercase tracking-widest opacity-80">
                            System automatically quarantines sessions from <span className="text-white">non-authorized jurisdictions</span> or legacy ISPs.
                            Currently governing <span className="text-primary italic">04 active remote nodes</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
