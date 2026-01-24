import { useState } from 'react';
import { Clock, Check, Edit2, AlertCircle } from 'lucide-react';

const MISSING_PUNCHES = [
    { id: 1, date: '2023-12-04', in: '09:05 AM', predicted_out: '06:15 PM', confidence: '92%' },
    { id: 2, date: '2023-12-07', in: '09:30 AM', predicted_out: '06:45 PM', confidence: '88%' },
];

export default function MissingPunchFixer() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Intel Header */}
            <div className="bg-foreground text-background p-12 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group border border-white/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-[100px] animate-pulse"></div>
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-black flex items-center gap-6 uppercase tracking-tighter text-white">
                            <div className="p-4 bg-primary text-primary-foreground rounded-2xl rotate-3 shadow-2xl">
                                <Clock className="w-8 h-8" />
                            </div>
                            Neural <span className="text-primary italic">Regularization</span>
                        </h2>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-4 ml-24">
                            AI-Predicted Vector Correction // Attendance Integrity v4.1
                        </p>
                    </div>
                </div>
            </div>

            {/* Prediction Matrix */}
            <div className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-1 h-full bg-primary/20"></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Temporal Node</th>
                                <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Terminal In</th>
                                <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Neural Predicted Out</th>
                                <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Vector Confidence</th>
                                <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Protocol Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {MISSING_PUNCHES.map(item => (
                                <tr key={item.id} className="hover:bg-primary/[0.02] transition-colors group/row">
                                    <td className="px-10 py-8 font-black text-foreground text-sm uppercase tracking-tight">{item.date}</td>
                                    <td className="px-10 py-8 text-emerald-500 font-black text-xs uppercase tracking-widest">{item.in}</td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl font-black text-foreground tracking-tighter">{item.predicted_out}</span>
                                            <span className="bg-primary/10 text-primary text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-primary/20">AI VECTOR</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 font-black text-primary text-xs italic tracking-[0.2em]">{item.confidence}</td>
                                    <td className="px-10 py-8 text-right flex justify-end gap-4">
                                        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                                            <Check className="w-3 h-3" /> Authorize
                                        </button>
                                        <button className="bg-background border border-border text-foreground hover:bg-muted px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                                            <Edit2 className="w-3 h-3" /> Adjust
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Synthesis Logic Footer */}
                <div className="p-8 bg-muted/30 border-t border-border flex items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>Predictions synthesized from 30-day temporal drift analysis: <span className="text-foreground">9H 10M institutional average</span>.</span>
                </div>
            </div>
        </div>
    );
}
