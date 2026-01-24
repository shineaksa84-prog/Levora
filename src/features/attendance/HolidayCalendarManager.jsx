import { useState } from 'react';
import { Calendar, MapPin, Plus, Trash2, Edit } from 'lucide-react';

const MOCK_HOLIDAYS = [
    { id: 1, name: 'New Year', date: '2025-01-01', location: 'Global', type: 'Fixed' },
    { id: 2, name: 'Republic Day', date: '2025-01-26', location: 'India', type: 'National' },
    { id: 3, name: 'Independence Day', date: '2025-07-04', location: 'USA', type: 'National' },
    { id: 4, name: 'Diwali', date: '2025-10-20', location: 'India', type: 'Optional' },
];

export default function HolidayCalendarManager() {
    const [filter, setFilter] = useState('All');

    const filteredHolidays = filter === 'All' ? MOCK_HOLIDAYS : MOCK_HOLIDAYS.filter(h => h.location === filter || h.location === 'Global');

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Executive Hub Header */}
            <div className="flex justify-between items-center bg-card border border-border p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20"></div>
                <div>
                    <h2 className="text-2xl font-black text-foreground flex items-center gap-6 uppercase tracking-tighter">
                        <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        Global Holiday <span className="text-primary italic">Orchestration</span>
                    </h2>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">Statutory Compliance // Regional Vector Management</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest px-6 py-3 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                        <option value="All">Institutional Vectors</option>
                        <option value="India">IND Region</option>
                        <option value="USA">USA Region</option>
                        <option value="UAE">UAE Region</option>
                    </select>
                    <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 group/btn relative overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                            <Plus className="w-4 h-4" /> Initialize Entry
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>

            {/* Institutional Matrix */}
            <div className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-1 h-full bg-primary/20"></div>
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Institutional Designation</th>
                            <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Temporal Node</th>
                            <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Geographic Vector</th>
                            <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Protocol Type</th>
                            <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Governance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {filteredHolidays.map(holiday => (
                            <tr key={holiday.id} className="hover:bg-primary/[0.02] transition-colors group/row">
                                <td className="px-10 py-8 font-black text-foreground text-sm uppercase tracking-tight">{holiday.name}</td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3 text-primary font-black text-[11px] uppercase tracking-widest italic group-hover/row:translate-x-2 transition-transform">
                                        <Calendar className="w-4 h-4 opacity-40" />
                                        {holiday.date}
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${holiday.location === 'Global' ? 'bg-foreground text-background border-white/10' :
                                        holiday.location === 'India' ? 'bg-primary/10 text-primary border-primary/20' :
                                            'bg-muted text-muted-foreground border-border'
                                        }`}>
                                        {holiday.location}
                                    </span>
                                </td>
                                <td className="px-10 py-8 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{holiday.type}</td>
                                <td className="px-10 py-8 text-right flex justify-end gap-3">
                                    <button className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-3 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all hover:scale-110">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
