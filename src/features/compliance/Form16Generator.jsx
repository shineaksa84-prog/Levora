import { useState } from 'react';
import { FileText, Download, CheckCircle, Printer } from 'lucide-react';

const EMPLOYEES = [
    { id: 1, name: 'Rahul Sharma', pan: 'ABCDE1234F', tds: 45000, status: 'Generated' },
    { id: 2, name: 'Priya Singh', pan: 'FGHIJ5678K', tds: 125000, status: 'Generated' },
    { id: 3, name: 'Amit Kumar', pan: 'LMNOP9012Q', tds: 0, status: 'Pending' },
];

export default function Form16Generator() {
    return (
        <div className="grid lg:grid-cols-2 gap-8 h-full animate-in zoom-in-95 duration-700">
            <div className="bg-card rounded-[2.5rem] border border-border p-8 shadow-2xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="flex justify-between items-center mb-10 overflow-hidden relative z-10">
                    <div>
                        <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight uppercase">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            Tax <span className="text-primary italic">Issuance</span>
                        </h2>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-60">Fiscal Cycle: FY 2022-23 | AY 2023-24</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-4 relative z-10">
                    {EMPLOYEES.map(emp => (
                        <div key={emp.id} className="p-6 bg-muted/20 border border-border/50 rounded-3xl hover:border-primary/30 transition-all flex items-center justify-between group">
                            <div className="space-y-1">
                                <h4 className="font-black text-foreground text-sm uppercase tracking-tight">{emp.name}</h4>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">PAN: {emp.pan}</p>
                            </div>

                            <div className="text-right px-6 border-x border-border/20">
                                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">TDS Infrastructure</p>
                                <p className="font-black text-foreground tracking-tighter text-lg">₹{emp.tds.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                {emp.status === 'Generated' ? (
                                    <>
                                        <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest">
                                            <CheckCircle className="w-3 h-3" /> Certified
                                        </span>
                                        <button className="p-3 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-lg hover:shadow-primary/20" title="Download Document">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <button className="text-[10px] font-black bg-primary text-primary-foreground px-5 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-[0.2em]">
                                        Generate
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                <div className="bg-card p-8 shadow-2xl w-72 h-96 rounded-xl border border-border mb-8 relative overflow-hidden group transition-transform hover:-rotate-2 duration-500">
                    <div className="absolute top-0 left-0 w-full h-3 bg-primary"></div>
                    <div className="space-y-3 mt-6 text-left">
                        <div className="h-5 w-3/4 bg-muted rounded-lg animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-muted/50 rounded-lg"></div>
                        <div className="h-40 w-full bg-muted/20 rounded-2xl mt-6 border border-dashed border-border/50 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-muted/20" />
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="h-10 w-1/3 bg-muted rounded-xl"></div>
                            <div className="h-10 w-2/5 bg-primary/10 rounded-xl text-primary text-[10px] flex items-center justify-center font-black uppercase tracking-widest">Part A + B</div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <button className="bg-primary text-primary-foreground shadow-2xl px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform pointer-events-auto">
                            <Printer className="w-4 h-4" /> View Preview
                        </button>
                    </div>
                </div>

                <h3 className="font-black text-foreground mb-2 text-lg uppercase tracking-widest">Institutional Signature Pool</h3>
                <p className="text-[10px] font-bold text-muted-foreground w-72 leading-relaxed uppercase tracking-tighter">
                    Form 16 protocols are strictly synthesized from TRACES infrastructure. Dynamic Part A Tax Credits and Part B Compensation models are cryptographically merged.
                </p>
                <div className="mt-8 flex gap-4 relative z-10">
                    <button className="bg-foreground text-background px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                        <Download className="w-4 h-4" /> Export Batch (ZIP)
                    </button>
                    <button className="bg-background border border-border text-foreground px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-muted transition-all shadow-xl">
                        Neural Broadcast
                    </button>
                </div>
            </div>
        </div>
    );
}
