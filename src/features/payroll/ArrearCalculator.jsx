import { useState } from 'react';
import { History, Calculator, ArrowRight, Save, Zap } from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function ArrearCalculator() {
    const [emp, setEmp] = useState('John Doe');
    const [type, setType] = useState('Salary Hike'); // Salary Hike, Attendance Correction
    const [effectiveDate, setEffectiveDate] = useState('2023-09-01');
    const [currentMonth, setCurrentMonth] = useState('2023-11-01');

    // Mock diff calculation
    const [oldSalary, setOldSalary] = useState(50000);
    const [newSalary, setNewSalary] = useState(60000);
    const diffPerMonth = newSalary - oldSalary;
    const totalArrear = diffPerMonth * months;

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h2 className="text-xl font-black flex items-center gap-2 mb-8 relative z-10">
                    <History className="w-5 h-5 text-primary" />
                    Arrear Computation
                </h2>

                <div className="space-y-6 relative z-10 font-bold">
                    <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Employee Profile</label>
                        <input className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" value={emp} onChange={e => setEmp(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Adjustment Type</label>
                            <select className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" value={type} onChange={e => setType(e.target.value)}>
                                <option>Salary Hike</option>
                                <option>Attendance Correction</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Effective Date</label>
                            <input type="date" className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Historical Baseline</label>
                            <input type="number" className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" value={oldSalary} onChange={e => setOldSalary(Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Revised Parameter</label>
                            <input type="number" className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" value={newSalary} onChange={e => setNewSalary(Number(e.target.value))} />
                        </div>
                    </div>

                    <button
                        onClick={() => toast.success('Delta auto-populated from historical payroll records.')}
                        className="w-full px-4 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
                    >
                        <Zap className="w-4 h-4" /> Auto-Populate Delta
                    </button>



                    <div className="text-center py-4 bg-muted/20 rounded-2xl border border-dashed border-border">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Computation Window</span>
                        <p className="text-foreground font-black mt-1">2 Months (Sept, Oct)</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-xl text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 transition-colors group-hover:bg-primary/10"></div>
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">Total Arrear Liability</p>
                    <h3 className="text-6xl font-black mb-4 text-foreground tracking-tighter relative z-10">₹ {totalArrear.toLocaleString()}</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest relative z-10">
                        Ready for Disbursement
                    </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-8">Temporal Breakdown</h3>
                    <div className="space-y-0 relative border-l-2 border-border ml-2 pl-8 pb-4 flex-1">
                        {[
                            { month: 'September 2023', paid: 50000, actual: 60000, diff: 10000 },
                            { month: 'October 2023', paid: 50000, actual: 60000, diff: 10000 },
                        ].map((item, i) => (
                            <div key={i} className="mb-8 relative last:mb-0">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-card shadow-lg"></div>
                                <h4 className="font-black text-foreground text-sm uppercase tracking-tight">{item.month}</h4>
                                <div className="flex justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2">
                                    <span>Baseline: {item.paid.toLocaleString()}</span>
                                    <span>Target: {item.actual.toLocaleString()}</span>
                                </div>
                                <div className="mt-3 text-sm font-black text-emerald-500 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    Delta: + ₹ {item.diff.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 bg-primary text-primary-foreground py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <Save className="w-5 h-5" /> Commit to Payroll
                    </button>
                </div>
            </div>
        </div>
    );
}
