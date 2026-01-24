import { useState } from 'react';
import { Calendar as CalendarIcon, Sun, Umbrella, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = Array.from({ length: 35 }, (_, i) => {
    const d = i - 2; // Offset to start month
    return d > 0 && d <= 31 ? d : null;
});

const HOLIDAYS = [25];
const WEEKENDS = [2, 3, 9, 10, 16, 17, 23, 24, 30, 31];
const MY_LEAVES = [14, 15]; // Applied

export default function LeavePlanner() {
    return (
        <div className="h-[calc(100vh-200px)] flex gap-10 animate-in fade-in duration-700">
            {/* Primary Calendar Hub */}
            <div className="flex-1 bg-card rounded-[3rem] border border-border p-10 shadow-2xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-center mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl shadow-inner rotate-3">
                            <Umbrella className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">
                                December <span className="text-primary italic">2023</span>
                            </h2>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-60">Annual Leave Orchestration Matrix</p>
                        </div>
                        <div className="flex gap-2 ml-6 bg-background/50 p-2 rounded-xl border border-border shadow-inner">
                            <button className="p-2 rounded-lg hover:bg-muted text-primary transition-all hover:scale-110"><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-2 rounded-lg hover:bg-muted text-primary transition-all hover:scale-110"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <button className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 group/btn relative overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                            <Plus className="w-4 h-4" /> Initialize Request
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>

                {/* Neural Calendar Grid */}
                <div className="grid grid-cols-7 gap-px flex-1 border border-border bg-border/30 rounded-[2rem] overflow-hidden shadow-inner">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="bg-primary/5 p-4 text-center text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">
                            {d}
                        </div>
                    ))}

                    {DAYS.map((day, i) => {
                        const isWeekend = WEEKENDS.includes(day);
                        const isHoliday = HOLIDAYS.includes(day);
                        const isLeave = MY_LEAVES.includes(day);

                        return (
                            <div key={i} className={`bg-card p-4 min-h-[100px] hover:bg-primary/[0.02] transition-all relative group/cell ${!day ? 'bg-muted/10' : 'cursor-pointer'}`}>
                                {day && (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <span className={`text-xs font-black ${isWeekend ? 'text-rose-500 italic opacity-60' : 'text-foreground hover:text-primary transition-colors'}`}>{day}</span>
                                            {isHoliday && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
                                        </div>

                                        {isHoliday && (
                                            <div className="mt-3 text-[8px] font-black bg-primary/10 text-primary p-2 rounded-lg border border-primary/20 uppercase tracking-widest truncate">
                                                CHRISTMAS PROTOCOL
                                            </div>
                                        )}
                                        {isLeave && (
                                            <div className="mt-3 text-[8px] font-black bg-foreground text-background p-2 rounded-lg uppercase tracking-widest shadow-lg">
                                                PLANNED ABSENCE
                                            </div>
                                        )}
                                        {!isHoliday && !isWeekend && !isLeave && (
                                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                                <button className="bg-primary/10 text-primary p-2 rounded-lg border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all scale-75 group-hover/cell:scale-100">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sidebar Intel */}
            <div className="w-96 space-y-10">
                <div className="bg-foreground text-background rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-white/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[80px] group-hover:bg-primary/30 transition-all"></div>
                    <h3 className="text-sm font-black mb-6 flex items-center gap-4 uppercase tracking-[0.2em] text-primary relative z-10">
                        <Sun className="w-5 h-5 animate-spin-slow" /> Strategic Break Alert
                    </h3>
                    <div className="bg-white/5 rounded-[1.5rem] p-6 border border-white/10 relative z-10 transition-transform group-hover:scale-[1.02]">
                        <p className="text-xl font-black text-white uppercase tracking-tighter">Dec 23 — Dec 25</p>
                        <p className="opacity-60 text-[9px] font-black uppercase tracking-widest mt-2">Sat, Sun, Mon (Institutional Holiday)</p>
                        <div className="bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest inline-block px-4 py-1.5 rounded-full mt-6 shadow-xl shadow-primary/20">
                            03 Cycle Optimization
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-primary/30"></div>
                    <h3 className="text-[10px] font-black text-foreground mb-8 uppercase tracking-[0.2em]">Vector Legend</h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-6 h-6 bg-foreground rounded-lg border border-white/10 shadow-lg group-hover:scale-110 transition-transform"></div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Institutional Leave</span>
                        </div>
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-6 h-6 bg-primary/20 border border-primary/30 rounded-lg shadow-inner group-hover:scale-110 transition-transform"></div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Public Holidays</span>
                        </div>
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-6 h-6 bg-background border border-border rounded-lg shadow-inner group-hover:scale-110 transition-transform"></div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Standard Cycle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
