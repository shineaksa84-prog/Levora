import { useState } from 'react';
import { Lock, Shield, Send, Users, FileText } from 'lucide-react';

export default function POSH_Manager() {
    const [view, setView] = useState('report'); // report, admin

    return (
        <div className="grid lg:grid-cols-3 gap-8 h-full animate-in fade-in duration-700">
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6">
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-foreground mb-3 tracking-tight uppercase">POSH <span className="text-primary italic">Integrity</span></h2>
                    <p className="text-[10px] font-bold text-muted-foreground mb-8 uppercase tracking-widest leading-relaxed">Secure Internal Complaints Committee (ICC) node for zero-tolerance institutional safety.</p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setView('report')}
                            className={`px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-left flex items-center gap-4 transition-all duration-300 ${view === 'report' ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30' : 'bg-muted/30 hover:bg-muted text-muted-foreground border border-border'}`}
                        >
                            <Lock className="w-4 h-4" /> Signal Incident
                        </button>
                        <button
                            onClick={() => setView('admin')}
                            className={`px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-left flex items-center gap-4 transition-all duration-300 ${view === 'admin' ? 'bg-foreground text-background shadow-2xl shadow-foreground/20' : 'bg-muted/30 hover:bg-muted text-muted-foreground border border-border'}`}
                        >
                            <Users className="w-4 h-4" /> ICC Admin Vector
                        </button>
                    </div>
                </div>

                <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl">
                    <h3 className="font-black text-foreground mb-6 uppercase tracking-widest text-[10px]">Legislative Assets</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> POSH Protocol Policy
                        </li>
                        <li className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> ICC Council Roster
                        </li>
                        <li className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Institutional Awareness
                        </li>
                    </ul>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-[3rem] border border-border shadow-2xl flex flex-col overflow-hidden relative">
                {view === 'report' && (
                    <div className="p-12 animate-in slide-in-from-right-10 duration-500">
                        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 mb-10 flex gap-4 text-[10px] font-black text-primary uppercase tracking-widest leading-relaxed">
                            <Lock className="w-6 h-6 shrink-0" />
                            <p>Transmission is <span className="underline underline-offset-4 decoration-primary/50">End-to-End Encrypted</span>. Data persists only within ICC Presiding Officer clearance. Anonymous shielding enabled.</p>
                        </div>

                        <div className="space-y-8 max-w-xl">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Incident Vector Class</label>
                                <select className="w-full mt-1 px-5 py-4 border border-border rounded-2xl font-black bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-xs uppercase tracking-widest outline-none appearance-none">
                                    <option>Define Category...</option>
                                    <option>Physical Breach</option>
                                    <option>Verbal Anomaly</option>
                                    <option>Hostile Environment Vector</option>
                                    <option>Quid Pro Quo Conflict</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Detailed Protocol Narrative</label>
                                <textarea className="w-full mt-1 px-5 py-5 border border-border rounded-2xl font-black bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all h-40 resize-none outline-none text-sm placeholder:text-muted-foreground/30" placeholder="Initialize report data..."></textarea>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id="anon" className="w-6 h-6 rounded-lg border-2 border-border text-primary focus:ring-primary bg-background cursor-pointer" />
                                </div>
                                <label htmlFor="anon" className="text-[10px] font-black text-foreground uppercase tracking-widest cursor-pointer group-hover:text-primary transition-colors">Ghost Mode Submission (Anonymous)</label>
                            </div>

                            <button className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30">
                                <Send className="w-4 h-4" /> Execute Broadcast
                            </button>
                        </div>
                    </div>
                )}

                {view === 'admin' && (
                    <div className="flex-1 flex flex-col animate-in slide-in-from-right-10 duration-500">
                        <div className="p-8 border-b border-border bg-primary/5 flex justify-between items-center">
                            <h3 className="font-black text-lg text-foreground tracking-tight uppercase">Active Case <span className="text-primary italic">Matrix</span></h3>
                            <span className="text-[8px] font-black bg-background border border-border px-4 py-1.5 rounded-full text-rose-500 uppercase tracking-widest">Confidential Clearance: Level 4</span>
                        </div>
                        <div className="p-4 scrollbar-hide overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-muted/50 text-muted-foreground font-black uppercase text-[10px] sticky top-0 z-10">
                                    <tr>
                                        <th className="px-8 py-5 text-left tracking-widest">Case ID</th>
                                        <th className="px-8 py-5 text-left tracking-widest">Log Date</th>
                                        <th className="px-8 py-5 text-left tracking-widest">Anomaly Class</th>
                                        <th className="px-8 py-5 text-left tracking-widest">Phase</th>
                                        <th className="px-8 py-5 text-right tracking-widest">Vector</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    <tr className="group hover:bg-primary/5 transition-colors">
                                        <td className="px-8 py-6 font-mono font-black text-foreground tracking-widest text-[10px]">#ICC-2023-004</td>
                                        <td className="px-8 py-6 text-muted-foreground font-black uppercase text-[10px]">Oct 12, 2023</td>
                                        <td className="px-8 py-6 font-black text-foreground uppercase text-[10px]">Verbal Anomaly</td>
                                        <td className="px-8 py-6">
                                            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em]">Investigation</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-primary font-black text-[9px] uppercase tracking-widest hover:underline underline-offset-4">Decrypt Protocol</button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-primary/5 transition-colors">
                                        <td className="px-8 py-6 font-mono font-black text-foreground tracking-widest text-[10px]">#ICC-2023-003</td>
                                        <td className="px-8 py-6 text-muted-foreground font-black uppercase text-[10px]">Sep 28, 2023</td>
                                        <td className="px-8 py-6 font-black text-foreground uppercase text-[10px]">Hostile Environment</td>
                                        <td className="px-8 py-6">
                                            <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em]">Resolved</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-primary font-black text-[9px] uppercase tracking-widest hover:underline underline-offset-4">Archive Report</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
