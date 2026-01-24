import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, ChevronRight, CheckCircle2 } from 'lucide-react';

const DEADLINES = [
    { id: 1, title: 'TDS Payment (Previous Month)', date: '2023-12-07', type: 'Payment', status: 'Pending', critical: true },
    { id: 2, title: 'PF & ESI Payment', date: '2023-12-15', type: 'Payment', status: 'Upcoming', critical: true },
    { id: 3, title: 'Q3 Returns Filing', date: '2023-12-31', type: 'Return', status: 'Upcoming', critical: false },
    { id: 4, title: 'Professional Tax (PT)', date: '2023-12-10', type: 'Payment', status: 'Paid', critical: false },
];

export default function StatutoryCalendar() {
    return (
        <div className="grid lg:grid-cols-3 gap-8 h-full animate-in slide-in-from-bottom-5 duration-700">
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-gradient-to-br from-rose-600 to-rose-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] group-hover:scale-110 transition-transform duration-1000"></div>
                    <Clock className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />

                    <p className="font-black text-rose-100 mb-2 uppercase tracking-[0.3em] text-[10px]">Critical Temporal Node</p>
                    <h2 className="text-5xl font-black mb-4 tracking-tighter">Dec 07</h2>
                    <p className="font-black text-xl uppercase tracking-widest text-white/90">TDS Payment Alpha</p>
                    <div className="mt-8 bg-white/10 backdrop-blur-md inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">48h Protocol Remaining</span>
                    </div>
                </div>

                <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl relative overflow-hidden">
                    <h3 className="font-black text-foreground mb-8 flex items-center gap-3 uppercase tracking-widest text-xs">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Bell className="w-5 h-5 text-primary" />
                        </div>
                        Broadcast <span className="text-primary italic">Sync</span>
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Neural Email Alerts</span>
                            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between group">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Mobile Mesh Notify</span>
                            <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer shadow-inner">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground mt-4 border-t border-border pt-4 uppercase tracking-tighter leading-relaxed">
                            Protocols routed to <span className="text-primary">finance@levora.ai</span> 72 hours before terminal date.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-[2.5rem] border border-border flex flex-col shadow-2xl overflow-hidden relative">
                <div className="p-8 border-b border-border bg-primary/5">
                    <h2 className="text-xl font-black text-foreground tracking-tight uppercase">
                        Compliance <span className="text-primary italic">Timeline</span> <span className="text-[10px] text-muted-foreground ml-2 opacity-60">Q4-2023 EX-V1</span>
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide p-10">
                    <div className="relative border-l-2 border-primary/20 ml-4 space-y-10">
                        {DEADLINES.map((item, i) => (
                            <div key={item.id} className="relative pl-10 group">
                                <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-background shadow-xl scale-125 transition-transform group-hover:scale-150 ${item.status === 'Paid' ? 'bg-emerald-500' :
                                    item.critical ? 'bg-rose-500 animate-pulse' : 'bg-primary'
                                    }`}></div>

                                <div className={`p-8 rounded-[2rem] border transition-all duration-500 group-hover:scale-[1.02] ${item.critical && item.status !== 'Paid' ? 'bg-rose-500/5 border-rose-500/20 shadow-xl' :
                                    item.status === 'Paid' ? 'bg-muted/30 border-border opacity-60' : 'bg-card border-border shadow-xl'
                                    }`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.date}</span>
                                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${item.type === 'Payment' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                            }`}>{item.type}</span>
                                    </div>

                                    <h3 className={`font-black text-xl tracking-tight mb-6 ${item.status === 'Paid' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center justify-between border-t border-border/50 pt-6">
                                        {item.status === 'Paid' ? (
                                            <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                                <CheckCircle2 className="w-4 h-4" /> Integrity Verified
                                            </span>
                                        ) : (
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${item.critical ? 'text-rose-500' : 'text-primary'}`}>
                                                Status: {item.status}
                                            </span>
                                        )}

                                        {item.status !== 'Paid' && (
                                            <button className="flex items-center gap-2 text-[10px] font-black text-primary px-5 py-2.5 bg-primary/5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest">
                                                Protocol Execute <ChevronRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
