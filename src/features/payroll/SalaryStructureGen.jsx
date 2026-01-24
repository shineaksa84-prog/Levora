import { saveSalaryStructure } from '../../lib/services/payrollService';

export default function SalaryStructureGen() {
    const [ctc, setCtc] = useState(1200000);
    const [isMetro, setIsMetro] = useState(true);
    const [regime, setRegime] = useState('new');
    const [structure, setStructure] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateStructure = () => {
        const monthlyCTC = ctc / 12;
        const basic = monthlyCTC * 0.4;
        const hra = isMetro ? basic * 0.5 : basic * 0.4;
        const pf = Math.min(basic * 0.12, 1800); // Capped at 1800 for employer share usually, but simplistic here
        const lta = monthlyCTC * 0.05; // 5% approx
        const bonus = basic * 0.0833; // 8.33%
        const special = monthlyCTC - (basic + hra + pf + lta + bonus);

        const gross = basic + hra + lta + bonus + special;
        const net = gross - pf - 200; // PT approx

        setStructure({
            monthly: { basic, hra, lta, bonus, special, pf, gross, net },
            yearly: {
                basic: basic * 12,
                hra: hra * 12,
                lta: lta * 12,
                bonus: bonus * 12,
                special: special * 12,
                pf: pf * 12,
                gross: gross * 12,
                net: net * 12
            }
        });
    };

    const handleSave = async () => {
        if (!structure) return;
        try {
            setLoading(true);
            await saveSalaryStructure({
                ctc,
                isMetro,
                regime,
                structure,
                timestamp: new Date()
            });
            alert('Salary structure saved successfully.');
        } catch (error) {
            console.error('Error saving salary structure:', error);
            alert('Failed to save salary structure.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculateStructure();
    }, [ctc, isMetro, regime]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <Calculator className="w-5 h-5 text-primary" />
                        Structure Config
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Annual CTC</label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                                <input
                                    type="number"
                                    value={ctc}
                                    onChange={(e) => setCtc(parseInt(e.target.value) || 0)}
                                    className="w-full pl-8 pr-4 py-3 bg-muted/30 border border-border rounded-xl font-bold text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location Type</label>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setIsMetro(true)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${isMetro ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50'}`}
                                >
                                    Metro (50% HRA)
                                </button>
                                <button
                                    onClick={() => setIsMetro(false)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${!isMetro ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50'}`}
                                >
                                    Non-Metro (40%)
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tax Regime</label>
                            <select
                                value={regime}
                                onChange={(e) => setRegime(e.target.value)}
                                className="w-full mt-2 px-4 py-3 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                            >
                                <option value="new">New Regime (Default)</option>
                                <option value="old">Old Regime (with Deductions)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50">
                        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" onClick={calculateStructure}>
                            <RefreshCw className="w-4 h-4" /> Recalculate
                        </button>
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3 items-start">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                        <strong className="text-primary">Note:</strong> PF is capped at ₹1,800/mo for employer contribution as per standard logic. Special Allowance is the balancing component.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col">
                <div className="bg-card border border-border p-6 rounded-t-2xl flex justify-between items-center shadow-lg relative z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Estimated Monthly Net Pay</p>
                        <h3 className="text-4xl font-black mt-2 text-emerald-500 tracking-tighter">{structure ? formatCurrency(structure.monthly.net) : '...'}</h3>
                    </div>
                    <div className="flex gap-2 relative z-10">
                        <button className="bg-muted border border-border hover:bg-muted/80 text-foreground px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105">
                            <Download className="w-4 h-4" /> Export
                        </button>
                        <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 disabled:opacity-50"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                        </button>
                    </div>
                </div>

                <div className="bg-card border-x border-b border-border rounded-b-2xl flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 text-left">Salary Component</th>
                                    <th className="px-6 py-4 text-right">Monthly</th>
                                    <th className="px-6 py-4 text-right">Annually</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {[
                                    { label: 'Basic Salary', key: 'basic', highlight: true },
                                    { label: 'House Rent Allowance (HRA)', key: 'hra' },
                                    { label: 'Leave Travel Allowance', key: 'lta' },
                                    { label: 'Statutory Bonus', key: 'bonus' },
                                    { label: 'Special Allowance', key: 'special' },
                                ].map((row, i) => (
                                    <tr key={i} className={`hover:bg-muted/30 transition-colors ${row.highlight ? 'font-bold text-foreground' : 'text-muted-foreground font-medium'}`}>
                                        <td className="px-6 py-4">{row.label}</td>
                                        <td className="px-6 py-4 text-right">{structure ? formatCurrency(structure.monthly[row.key]) : '-'}</td>
                                        <td className="px-6 py-4 text-right">{structure ? formatCurrency(structure.yearly[row.key]) : '-'}</td>
                                    </tr>
                                ))}
                                <tr className="bg-emerald-500/5 font-black text-emerald-500 border-t-2 border-emerald-500/20">
                                    <td className="px-6 py-5">Gross Salary</td>
                                    <td className="px-6 py-5 text-right font-black">{structure ? formatCurrency(structure.monthly.gross) : '-'}</td>
                                    <td className="px-6 py-5 text-right font-black">{structure ? formatCurrency(structure.yearly.gross) : '-'}</td>
                                </tr>
                                <tr className="text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 font-bold transition-colors">
                                    <td className="px-6 py-4">PF (Employer Contribution)</td>
                                    <td className="px-6 py-4 text-right">-{structure ? formatCurrency(structure.monthly.pf) : '-'}</td>
                                    <td className="px-6 py-4 text-right">-{structure ? formatCurrency(structure.yearly.pf) : '-'}</td>
                                </tr>
                                <tr className="text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 font-bold transition-colors">
                                    <td className="px-6 py-4">Professional Tax (Est.)</td>
                                    <td className="px-6 py-4 text-right">-₹200</td>
                                    <td className="px-6 py-4 text-right">-₹2,400</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
