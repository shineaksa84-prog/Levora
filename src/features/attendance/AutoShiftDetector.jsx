import { useState } from 'react';
import { Clock, CheckCircle, AlertOctagon, GitMerge, ArrowRight } from 'lucide-react';

const MOCK_PUNCH_DATA = [
    { id: 1, name: 'John Doe', date: '2023-12-05', assigned: 'GS (09:00 - 18:00)', punchIn: '09:05', punchOut: '18:10', actualShift: 'GS', status: 'Matched' },
    { id: 2, name: 'Jane Smith', date: '2023-12-05', assigned: 'GS (09:00 - 18:00)', punchIn: '14:05', punchOut: '23:10', actualShift: 'ES (14:00 - 23:00)', status: 'Mismatch' },
    { id: 3, name: 'Mike Ross', date: '2023-12-05', assigned: 'NS (22:00 - 07:00)', punchIn: '21:55', punchOut: '07:05', actualShift: 'NS', status: 'Matched' },
    { id: 4, name: 'Sarah Lee', date: '2023-12-05', assigned: 'MS (06:00 - 15:00)', punchIn: '09:12', punchOut: '18:30', actualShift: 'GS', status: 'Mismatch' },
];

export default function AutoShiftDetector() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Neural Monitoring Header */}
            <div className="bg-foreground text-background p-12 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group border border-white/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-[100px] animate-pulse"></div>
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-black flex items-center gap-6 uppercase tracking-tighter">
                            <div className="p-4 bg-primary text-primary-foreground rounded-2xl rotate-3 shadow-2xl">
                                <GitMerge className="w-8 h-8" />
                            </div>
                            Neural Shift <span className="text-primary italic">Auditor</span>
                        </h2>
                        <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mt-4 ml-24">
                            Anomaly Detection // Real-Time Vector Reconciliation
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-6xl font-black text-primary tracking-tighter">02</div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">Active Mismatches Detected</p>
                    </div>
                </div>
            </div>

            {/* Entity Discrepancy Matrix */}
            <div className="flex flex-col gap-6">
                {MOCK_PUNCH_DATA.map(record => {
                    const isMismatch = record.status === 'Mismatch';
                    return (
                        <div key={record.id} className={`bg-card border rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-primary/50 relative overflow-hidden group ${isMismatch ? 'border-primary/30' : 'border-border/50'
                            }`}>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-inner ${isMismatch ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground'
                                        }`}>
                                        {record.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{record.name}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <Clock className="w-3 h-3 text-primary" />
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">
                                                Cycle: {record.punchIn} — {record.punchOut}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12 bg-background/50 px-10 py-4 rounded-2xl border border-border/50 shadow-inner">
                                    <div className="text-center">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60 mb-1">Protocol Assigned</p>
                                        <div className="text-sm font-black text-foreground uppercase tracking-tighter">{record.assigned.split(' ')[0]}</div>
                                    </div>

                                    {isMismatch && (
                                        <div className="flex flex-col items-center">
                                            <ArrowRight className="w-5 h-5 text-primary animate-pulse" />
                                        </div>
                                    )}

                                    {isMismatch && (
                                        <div className="text-center">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">AI Detected Vector</p>
                                            <div className="text-sm font-black text-primary uppercase tracking-tighter underline underline-offset-4 decoration-primary/30">{record.actualShift.split(' ')[0]}</div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    {isMismatch ? (
                                        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                                            <ArrowRight className="w-3 h-3" /> Execute Realignment
                                        </button>
                                    ) : (
                                        <span className="flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/5 px-6 py-3 rounded-xl border border-emerald-500/10 shadow-inner">
                                            <CheckCircle className="w-4 h-4" /> Logic Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {isMismatch && (
                                <div className="absolute top-0 right-0 w-2 h-full bg-primary/20"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Neural Synthesis Stats */}
            <div className="p-8 bg-card rounded-[2rem] border border-border border-dashed text-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/[0.02] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center justify-center gap-4 relative z-10">
                    <AlertOctagon className="w-4 h-4 text-primary" />
                    Neural Engine processed <span className="text-foreground">145 protocols</span> // System integrity: <span className="text-primary italic">98.6%</span>
                </p>
            </div>
        </div>
    );
}
