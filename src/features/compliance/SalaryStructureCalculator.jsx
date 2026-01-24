import { useState } from 'react';
import { DollarSign, TrendingUp, Info } from 'lucide-react';
import { indianComplianceService } from '../../lib/services/indianCompliance';

export default function SalaryStructureCalculator() {
    const [ctc, setCtc] = useState('');
    const [structure, setStructure] = useState(null);

    const handleCalculate = () => {
        const ctcValue = parseFloat(ctc);
        if (ctcValue > 0) {
            const result = indianComplianceService.generateSalaryStructure(ctcValue);
            setStructure(result);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="bg-card rounded-[2.5rem] border border-border p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>

                <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 bg-primary/10 rounded-[1.5rem] shadow-inner">
                        <DollarSign className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-foreground tracking-tight">Financial <span className="text-primary italic">Architecture</span></h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">CTC Breakdown & Statutory Protocol Engine</p>
                    </div>
                </div>

                <div className="flex gap-4 relative z-10">
                    <div className="flex-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">Annual CTC (Institutional Value)</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-black text-xl">₹</span>
                            <input
                                type="number"
                                value={ctc}
                                onChange={(e) => setCtc(e.target.value)}
                                placeholder="600000"
                                className="w-full pl-12 pr-5 py-5 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none text-xl font-black tracking-widest transition-all placeholder:text-muted-foreground/30"
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleCalculate}
                            disabled={!ctc || parseFloat(ctc) <= 0}
                            className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            Execute Calc
                        </button>
                    </div>
                </div>
            </div>

            {structure && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-card rounded-3xl border border-border p-6 shadow-xl hover:border-primary/30 transition-all group">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Gross CTC</p>
                            <p className="text-3xl font-black text-primary tracking-tighter group-hover:scale-105 transition-transform origin-left">{formatCurrency(structure.ctc)}</p>
                        </div>
                        <div className="bg-card rounded-3xl border border-border p-6 shadow-xl hover:border-emerald-500/30 transition-all group">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Annual Gross</p>
                            <p className="text-3xl font-black text-emerald-500 tracking-tighter group-hover:scale-105 transition-transform origin-left">{formatCurrency(structure.components.gross)}</p>
                        </div>
                        <div className="bg-card rounded-3xl border border-border p-6 shadow-xl hover:border-primary/30 transition-all group">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Neural Net (In-Hand)</p>
                            <p className="text-3xl font-black text-foreground tracking-tighter group-hover:scale-105 transition-transform origin-left">{formatCurrency(structure.netSalary)}</p>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Earnings */}
                        <div className="bg-card rounded-[2rem] border border-border shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-border bg-emerald-500/5">
                                <h3 className="font-black text-sm text-emerald-500 uppercase tracking-widest">Inflow Matrix (Earnings)</h3>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex justify-between items-center group">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Basic Salary (40%)</span>
                                    <span className="font-black text-foreground">{formatCurrency(structure.components.basic)}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">HRA Allocation (20%)</span>
                                    <span className="font-black text-foreground">{formatCurrency(structure.components.hra)}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Special Protocol (25%)</span>
                                    <span className="font-black text-foreground">{formatCurrency(structure.components.specialAllowance)}</span>
                                </div>
                                <div className="pt-6 border-t border-border flex justify-between items-center">
                                    <span className="font-black text-xs uppercase tracking-widest text-foreground">Total Inflow</span>
                                    <span className="text-xl font-black text-emerald-500">{formatCurrency(structure.components.gross)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="bg-card rounded-[2rem] border border-border shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-border bg-rose-500/5">
                                <h3 className="font-black text-sm text-rose-500 uppercase tracking-widest">Drain Protocol (Deductions)</h3>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex justify-between items-center group">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">EPF Contribution</span>
                                    <span className="font-black text-foreground">{formatCurrency(structure.deductions.epf)}</span>
                                </div>
                                {structure.deductions.esic > 0 && (
                                    <div className="flex justify-between items-center group">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">ESIC Siphon</span>
                                        <span className="font-black text-foreground">{formatCurrency(structure.deductions.esic)}</span>
                                    </div>
                                )}
                                <div className="pt-6 border-t border-border flex justify-between items-center">
                                    <span className="font-black text-xs uppercase tracking-widest text-foreground">Total Outflow</span>
                                    <span className="text-xl font-black text-rose-500">{formatCurrency(structure.deductions.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2.5rem] border border-primary/20 p-8 shadow-inner overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-primary rounded-xl">
                                <TrendingUp className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h3 className="font-black text-lg text-foreground tracking-tight uppercase tracking-widest">Monthly Neural Pulse</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-background/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-primary/20 transition-all">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Monthly Gross Cycle</p>
                                <p className="text-2xl font-black text-foreground">{formatCurrency(structure.monthlyGross)}</p>
                            </div>
                            <div className="bg-background/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-primary/20 transition-all">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Monthly Neural In-Hand</p>
                                <p className="text-2xl font-black text-primary">{formatCurrency(structure.monthlyNet)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="flex items-start gap-4 p-6 bg-primary/5 border border-primary/20 rounded-[2rem]">
                        <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <div className="text-[10px] text-muted-foreground">
                            <p className="font-black text-foreground mb-3 uppercase tracking-widest">Institutional Guardrails & Calculation Logic:</p>
                            <ul className="space-y-2 font-bold uppercase tracking-tighter list-none pl-0">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div> EPF calculated at 12% of Basic (Legislative Cap: ₹15,000)</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div> ESIC activation protocol: Gross Salary ≤ ₹21,000</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div> PT and TDS streams not calculated in this simulation</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div> Actual architecture subject to corporate policy drift</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
