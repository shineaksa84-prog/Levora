import { useState } from 'react';
import { Calendar, Plane, Sun, AlertTriangle } from 'lucide-react';

const LEAVE_TYPES = [
    { type: 'Privilege Leave (PL)', balance: 18, expiry: 'Dec 31', risk: 'High' },
    { type: 'Casual Leave (CL)', balance: 4, expiry: 'Dec 31', risk: 'Medium' },
    { type: 'Sick Leave (SL)', balance: 6, expiry: 'Unlimited', risk: 'Low' },
];

export default function LeaveForecaster() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Forecasting Header */}
            <div className="bg-foreground text-background p-12 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group border border-white/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-[100px] animate-pulse"></div>
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-black flex items-center gap-6 uppercase tracking-tighter">
                            <div className="p-4 bg-primary text-primary-foreground rounded-2xl rotate-3 shadow-2xl">
                                <Plane className="w-8 h-8" />
                            </div>
                            Neural Balance <span className="text-primary italic">Forecaster</span>
                        </h2>
                        <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mt-4 ml-24">
                            Predictive Utilization // Lapse Risk Assessment v4.0
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-6xl font-black text-primary tracking-tighter">22</div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">Vector Units at Risk</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Balance Matrix */}
                <div className="space-y-6">
                    {LEAVE_TYPES.map((leave, idx) => (
                        <div key={idx} className="bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 relative overflow-hidden group">
                            <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{leave.type}</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-60 italic">Lapse Protocol: {leave.expiry}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-4xl font-black text-foreground tracking-tighter">{leave.balance}</p>
                                    {leave.risk === 'High' && (
                                        <span className="flex items-center gap-2 text-[9px] font-black text-rose-500 bg-rose-500/5 px-4 py-1.5 rounded-full mt-2 border border-rose-500/10 uppercase tracking-widest animate-pulse">
                                            <AlertTriangle className="w-3 h-3" /> Critical Lapse
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Synthesis Suggestions */}
                <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-sm font-black text-foreground mb-8 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Sun className="w-5 h-5 text-primary" />
                        </div>
                        Strategic Optimization
                    </h3>
                    <p className="text-xs font-black text-muted-foreground/80 leading-relaxed uppercase tracking-widest mb-10 border-l-2 border-primary/20 pl-6 italic">
                        Based on your pending <span className="text-foreground">PL Balance</span> and neural team alignment, the following optimization windows are proposed:
                    </p>

                    <div className="space-y-6">
                        <div className="bg-background/50 p-6 rounded-[2rem] border border-border shadow-inner cursor-pointer hover:border-primary/50 transition-all group/node relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <span className="text-lg font-black text-foreground uppercase tracking-tighter">Oct 20 — Oct 25</span>
                                <span className="text-[9px] font-black bg-primary text-primary-foreground px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                                    Diwali Bridge
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wide opacity-70 leading-relaxed">Utilize 03 PL units to yield <span className="text-foreground">06 total rest days</span>. Team saturation: Low.</p>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover/node:bg-primary/10 transition-all"></div>
                        </div>

                        <div className="bg-background/50 p-6 rounded-[2rem] border border-border shadow-inner cursor-pointer hover:border-primary/50 transition-all group/node relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <span className="text-lg font-black text-foreground uppercase tracking-tighter">Dec 26 — Dec 31</span>
                                <span className="text-[9px] font-black bg-foreground text-background px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    Year-End Flush
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wide opacity-70 leading-relaxed">Utilize 05 PL units to prevent institutional balance lapse. Integrity: 100%.</p>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover/node:bg-primary/10 transition-all"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
