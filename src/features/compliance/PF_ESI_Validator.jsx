import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

const EMPLOYEES = [
    { id: 101, name: 'Rahul Sharma', basic: 12000, gross: 18000, pf_status: 'Covered', esi_status: 'Covered' },
    { id: 102, name: 'Priya Singh', basic: 25000, gross: 45000, pf_status: 'Covered', esi_status: 'Not Covered' },
    { id: 103, name: 'Amit Kumar', basic: 14000, gross: 20000, pf_status: 'Not Covered', esi_status: 'Covered' }, // Flag: Basic < 15k but no PF
    { id: 104, name: 'Sneha Gupta', basic: 18000, gross: 25000, pf_status: 'Exempt', esi_status: 'Not Covered' },
    { id: 105, name: 'Vikram Raj', basic: 10000, gross: 15000, pf_status: 'Covered', esi_status: 'Not Covered' }, // Flag: Gross < 21k but no ESI
];

export default function PF_ESI_Validator() {
    return (
        <div className="grid lg:grid-cols-3 gap-8 h-full animate-in fade-in duration-700">
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <h2 className="text-xl font-black flex items-center gap-3 mb-8 text-foreground tracking-tight uppercase">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        Compliance <span className="text-primary italic">Protocols</span>
                    </h2>

                    <div className="space-y-6 relative z-10">
                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all group">
                            <h3 className="font-black text-primary text-xs uppercase tracking-[0.2em] mb-2 group-hover:translate-x-1 transition-transform">Provident Fund (PF)</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4 leading-relaxed">Mandatory if Basic Salary ≤ ₹15,000.</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Employer Share: 12.00%
                            </div>
                        </div>

                        <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                            <h3 className="font-black text-emerald-500 text-xs uppercase tracking-[0.2em] mb-2 group-hover:translate-x-1 transition-transform">ESI Infrastructure</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4 leading-relaxed">Mandatory if Gross Salary ≤ ₹21,000.</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Employer Share: 3.25%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl relative overflow-hidden">
                    <h3 className="font-black text-foreground mb-6 uppercase tracking-widest text-xs">Infrastructure Pulse</h3>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Monitored Nodes</span>
                        <span className="text-lg font-black text-foreground">142</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Breach Detected</span>
                        <span className="text-lg font-black text-rose-500">2 Anomalies</span>
                    </div>
                    <div className="w-full bg-muted h-3 rounded-full mt-4 overflow-hidden shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '98%' }}
                            className="bg-primary h-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        />
                    </div>
                    <p className="text-[8px] font-black text-right text-muted-foreground mt-3 uppercase tracking-[0.2em]">98% Legislative Compliance Score</p>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-[2.5rem] border border-border flex flex-col shadow-2xl overflow-hidden relative">
                <div className="p-8 border-b border-border flex justify-between items-center bg-primary/5">
                    <h2 className="text-xl font-black text-foreground tracking-tight uppercase">
                        Audit <span className="text-primary italic">Vector</span>
                    </h2>
                    <button className="text-[10px] font-black bg-primary text-primary-foreground px-6 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-[0.2em]">
                        Execute New Audit
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
                    <table className="w-full text-xs">
                        <thead className="bg-muted/50 text-muted-foreground font-black uppercase text-[10px] sticky top-0 z-20">
                            <tr>
                                <th className="px-8 py-5 text-left tracking-widest">Employee Node</th>
                                <th className="px-8 py-5 text-right tracking-widest">Comp Vector</th>
                                <th className="px-8 py-5 text-center tracking-widest">PF Integrity</th>
                                <th className="px-8 py-5 text-center tracking-widest">ESI Integrity</th>
                                <th className="px-8 py-5 text-center tracking-widest">Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {EMPLOYEES.map(emp => {
                                const isPFNonCompliant = emp.basic <= 15000 && emp.pf_status === 'Not Covered';
                                const isESINonCompliant = emp.gross <= 21000 && emp.esi_status === 'Not Covered';
                                const hasError = isPFNonCompliant || isESINonCompliant;

                                return (
                                    <tr key={emp.id} className={`group transition-colors ${hasError ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-primary/5'}`}>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-foreground text-sm tracking-tight">{emp.name}</p>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">ID://{emp.id}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-[10px] font-black text-foreground opacity-80 uppercase">B: ₹{emp.basic.toLocaleString()}</p>
                                            <p className="text-[10px] font-black text-primary uppercase">G: ₹{emp.gross.toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${isPFNonCompliant ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' :
                                                emp.pf_status === 'Exempt' ? 'bg-muted text-muted-foreground border border-border' :
                                                    'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                }`}>
                                                {isPFNonCompliant ? 'Breached' : emp.pf_status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${isESINonCompliant ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' :
                                                'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                }`}>
                                                {isESINonCompliant ? 'Breached' : emp.esi_status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {hasError && (
                                                <button className="text-rose-500 font-black text-[9px] uppercase tracking-widest hover:scale-110 transition-transform flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
                                                    <AlertCircle className="w-3 h-3" /> Patch
                                                </button>
                                            )}
                                            {!hasError && <FileCheck className="w-5 h-5 text-muted/30 mx-auto" />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
