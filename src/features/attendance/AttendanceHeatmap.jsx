import { useState } from 'react';
import { TrendingDown, Users, Calendar } from 'lucide-react';
import { Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const ATTENDANCE_DATA = [
    { day: 'Mon', late: 12, absent: 2, present: 128, total: 142 },
    { day: 'Tue', late: 5, absent: 1, present: 136, total: 142 },
    { day: 'Wed', late: 3, absent: 4, present: 135, total: 142 },
    { day: 'Thu', late: 8, absent: 2, present: 132, total: 142 },
    { day: 'Fri', late: 18, absent: 8, present: 116, total: 142 },
];

export default function AttendanceHeatmap() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Intel Header */}
            <div className="flex justify-between items-center bg-card border border-border p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20"></div>
                <div>
                    <h2 className="text-2xl font-black text-foreground flex items-center gap-6 uppercase tracking-tighter">
                        <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
                            <TrendingDown className="w-6 h-6 text-primary" />
                        </div>
                        Neural Attendance <span className="text-primary italic">Heatmap</span>
                    </h2>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">Pattern Analysis // Punctuality Vector Matrix</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Visual Analytics */}
                <div className="lg:col-span-2 bg-card border border-border rounded-[3rem] shadow-2xl p-10 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-sm font-black text-foreground mb-10 uppercase tracking-[0.2em]">Institutional Trends <span className="text-primary italic">// LATE VS ABSENT</span></h3>
                    <div className="h-80 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ATTENDANCE_DATA}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'hsl(var(--muted-foreground))' }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--primary) / 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '1rem',
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}
                                />
                                <Bar dataKey="late" stackId="a" fill="var(--primary)" radius={[0, 0, 4, 4]} name="LATE VECTOR" />
                                <Bar dataKey="absent" stackId="a" fill="var(--foreground)" radius={[4, 4, 0, 0]} name="TOTAL ABSENCE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Anomaly Highlight */}
                    <div className="bg-foreground text-background border border-white/10 rounded-[3rem] p-10 shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-primary font-black mb-1 uppercase tracking-[0.2em] text-[10px]">Critical Anomaly Day</h3>
                        <p className="text-4xl font-black text-white tracking-tighter uppercase italic">Friday</p>
                        <p className="text-[10px] font-black text-white/40 mt-6 leading-relaxed uppercase tracking-widest italic border-l border-primary/30 pl-4">
                            18% Latency rate. Highest institutional absence observed. Recommend <span className="text-primary">"Strategic Morale Protocol"</span> to mitigate drift.
                        </p>
                    </div>

                    {/* Team Compliance Node */}
                    <div className="bg-card border border-border rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-1 h-full bg-primary/20"></div>
                        <h3 className="text-[11px] font-black text-foreground mb-8 uppercase tracking-[0.2em]">Compliance Matrix</h3>
                        <div className="space-y-8">
                            {['Engineering', 'Sales', 'Support'].map(team => (
                                <div key={team} className="group">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{team}</span>
                                        <span className="text-emerald-500 italic">92%</span>
                                    </div>
                                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500/30 w-[92%]"></div>
                                    </div>
                                </div>
                            ))}
                            <div className="group">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-2">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">Marketing</span>
                                    <span className="text-primary italic">84%</span>
                                </div>
                                <div className="h-1 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary/30 w-[84%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
