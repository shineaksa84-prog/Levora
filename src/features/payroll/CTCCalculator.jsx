import { useState } from 'react';
import { DollarSign, PieChart, TrendingDown, ArrowRight } from 'lucide-react';

export default function CTCCalculator() {
    const [ctc, setCtc] = useState(1500000);
    const [regime, setRegime] = useState('New'); // New vs Old

    // Quick mock logic for demonstration
    const calculateTakeHome = () => {
        const monthlyGross = ctc / 12;
        const pf = 1800;
        const pt = 200;

        let tax = 0;
        if (regime === 'New') {
            // Very simplified new regime logic
            if (ctc > 700000) tax = (ctc * 0.1) / 12;
        } else {
            // Simplified old regime (higher tax but deductions allowed - mocked here)
            tax = (ctc * 0.15) / 12;
        }

        const deductions = pf + pt + tax;
        const net = monthlyGross - deductions;

        return { monthlyGross, pf, pt, tax, deductions, net };
    };

    const { monthlyGross, pf, pt, tax, deductions, net } = calculateTakeHome();

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Salary Simulator
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Annual CTC (₹)</label>
                        <input
                            type="range"
                            min="500000"
                            max="5000000"
                            step="100000"
                            className="w-full"
                            value={ctc}
                            onChange={(e) => setCtc(Number(e.target.value))}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">₹5L</span>
                            <span className="text-2xl font-bold">{formatCurrency(ctc)}</span>
                            <span className="text-xs text-muted-foreground">₹50L</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-3 block">Tax Regime</label>
                        <div className="flex bg-muted p-1 rounded-lg">
                            {['New', 'Old'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRegime(r)}
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${regime === r
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {r} Regime 2024
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {regime === 'New' ? 'Lower tax rates, but no exemptions (HRA, 80C).' : 'Higher tax rates, but allows exemptions (HRA, 80C, etc.).'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                <h3 className="text-lg font-medium opacity-80 mb-6">Monthly Breakdown</h3>

                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center text-lg">
                        <span>Gross Earnings</span>
                        <span className="font-bold">{formatCurrency(monthlyGross)}</span>
                    </div>

                    <div className="my-4 border-t border-white/10"></div>

                    <div className="space-y-2 text-sm text-red-200">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4" /> PF Contribution</span>
                            <span>- {formatCurrency(pf)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Professional Tax</span>
                            <span>- {formatCurrency(pt)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Income Tax (TDS)</span>
                            <span>- {formatCurrency(tax)}</span>
                        </div>
                    </div>

                    <div className="my-4 border-t border-white/10"></div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs uppercase tracking-widest opacity-60 font-bold mb-1">Net In-Hand Salary</p>
                            <p className="text-4xl font-bold text-green-400">{formatCurrency(net)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs opacity-60">Total Deductions</p>
                            <p className="font-mono text-red-300">{formatCurrency(deductions)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
