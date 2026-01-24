import { useState } from 'react';
import { Calendar, MapPin, Sun, Umbrella, PartyPopper } from 'lucide-react';

const HOLIDAYS = [
    { date: '2023-01-26', name: 'Republic Day', type: 'National', passed: true },
    { date: '2023-03-08', name: 'Holi', type: 'Festival', passed: true },
    { date: '2023-08-15', name: 'Independence Day', type: 'National', passed: true },
    { date: '2023-10-02', name: 'Gandhi Jayanti', type: 'National', passed: true },
    { date: '2023-11-12', name: 'Diwali', type: 'Festival', passed: true },
    { date: '2023-12-25', name: 'Christmas', type: 'Festival', passed: false },
    { date: '2024-01-01', name: 'New Year', type: 'Optional', passed: false },
];

export default function HolidayCalendar() {
    return (
        <div className="grid lg:grid-cols-3 gap-10 h-[calc(100vh-200px)] animate-in fade-in duration-700">
            <div className="lg:col-span-2 space-y-10 overflow-y-auto no-scrollbar pb-10">
                {/* Active Temporal Matrix */}
                <div className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-2xl font-black mb-10 flex items-center gap-6 uppercase tracking-tighter">
                        <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
                            <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        Institutional <span className="text-primary italic">Calendar 2023-24</span>
                    </h2>

                    <div className="space-y-6">
                        {HOLIDAYS.filter(h => !h.passed).map((holiday, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-background/50 border border-border shadow-inner relative overflow-hidden group/item hover:border-primary/50 transition-all">
                                <div className="absolute right-0 top-0 h-full w-1 bg-primary/20 group-hover/item:bg-primary transition-all"></div>
                                <div className="bg-foreground text-background p-4 rounded-2xl shadow-xl text-center min-w-[90px] group-hover/item:scale-105 transition-transform">
                                    <span className="block text-[10px] font-black uppercase tracking-widest opacity-60">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-3xl font-black tracking-tighter">{new Date(holiday.date).getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-foreground uppercase tracking-tight">{holiday.name}</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-60">
                                        {new Date(holiday.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-[9px] font-black px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary uppercase tracking-widest shadow-xl shadow-primary/5 animate-pulse">
                                        Active Vector
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Historical Temporal Archive */}
                <div className="bg-card/50 rounded-[3rem] border border-border p-10 shadow-xl opacity-60 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                    <h3 className="text-xs font-black text-muted-foreground mb-8 uppercase tracking-[0.3em]">Temporal Archive // COMPLETED PROTOCOLS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {HOLIDAYS.filter(h => h.passed).map((holiday, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-muted/20 relative overflow-hidden">
                                <div className="text-center min-w-[60px]">
                                    <span className="block text-[9px] font-black uppercase tracking-widest opacity-40">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-xl font-black tracking-tighter text-foreground">{new Date(holiday.date).getDate()}</span>
                                </div>
                                <div>
                                    <p className="font-black text-xs text-foreground uppercase tracking-tight">{holiday.name}</p>
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">{holiday.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {/* Balance Command Card */}
                <div className="bg-foreground text-background rounded-[3.5rem] p-10 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative group overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Sun className="w-16 h-16 mx-auto mb-8 text-primary animate-spin-slow opacity-80" />
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-10">Neural Balance Control</h3>
                    <div className="flex justify-between items-center bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-inner">
                        <div className="text-center group/unit cursor-pointer">
                            <p className="text-4xl font-black text-primary tracking-tighter group-hover:scale-110 transition-transform">12</p>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-2">Privilege</p>
                        </div>
                        <div className="w-px h-12 bg-white/10"></div>
                        <div className="text-center group/unit cursor-pointer">
                            <p className="text-4xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">05</p>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-2">Sick</p>
                        </div>
                        <div className="w-px h-12 bg-white/10"></div>
                        <div className="text-center group/unit cursor-pointer">
                            <p className="text-4xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">02</p>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-2">Optional</p>
                        </div>
                    </div>
                    <button className="mt-10 w-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 relative overflow-hidden group/btn">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <Umbrella className="w-4 h-4" /> Initialize Request
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>

                {/* Geographic Context Node */}
                <div className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute left-0 top-0 w-1 h-full bg-primary/30"></div>
                    <h3 className="text-[10px] font-black text-foreground mb-8 uppercase tracking-[0.2em] opacity-60">Regional Node</h3>
                    <div className="flex items-center justify-between p-6 bg-background rounded-2xl border border-border shadow-inner group-hover:border-primary/30 transition-all">
                        <span className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            <MapPin className="w-5 h-5 text-primary" /> Institutional Base
                        </span>
                        <span className="font-black text-foreground text-sm uppercase tracking-tighter transition-colors group-hover:text-primary">Bangalore, IN</span>
                    </div>
                    <p className="text-[9px] font-black text-muted-foreground mt-6 leading-relaxed uppercase tracking-widest opacity-40 italic">
                        Temporal nodes synchronized to your institutional base. Contact System Admin to realign regional vectors.
                    </p>
                </div>
            </div>
        </div>
    );
}
