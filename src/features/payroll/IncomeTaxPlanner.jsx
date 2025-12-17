import { useState } from 'react';
import { Calculator, ArrowRight, Save, TrendingDown, Info } from 'lucide-react';

export default function IncomeTaxPlanner() {
    const [income, setIncome] = useState(1500000);
    const [investments, setInvestments] = useState({ section80c: 150000, hra: 240000, nps: 50000 });

    // Simple Mock Tax Calculation Logic (FY 2023-24)
    const calculateTax = () => {
        // New Regime (Default approx rates)
        // 0-3L: 0, 3-6L: 5%, 6-9L: 10%, 9-12L: 15%, 12-15L: 20%, >15L: 30%
        // Simplified for demo:
        let newTaxable = income - 50000; // Std Deduction
        let newTax = 0;
        if (newTaxable > 700000) newTax = (newTaxable * 0.15); // Avg rate calc simplification

        // Old Regime
        let oldTaxable = income - 50000 - investments.section80c - investments.hra - investments.nps;
        let oldTax = 0;
        if (oldTaxable > 500000) oldTax = (oldTaxable * 0.20); // Avg rate calc simplification

        return { newRegime: Math.max(0, newTax), oldRegime: Math.max(0, oldTax) };
    };

    const { newRegime, oldRegime } = calculateTax();
    const savings = Math.abs(newRegime - oldRegime);
    const recommended = newRegime < oldRegime ? 'New Regime' : 'Old Regime';

    const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    Tax Optimizer
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Projected Annual Income</label>
                        <input
                            type="number"
                            className="w-full p-2.5 rounded-lg border border-input bg-background font-bold text-lg"
                            value={income}
                            onChange={e => setIncome(Number(e.target.value))}
                        />
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4">
                        <h3 className="font-bold text-sm text-gray-700">Deductions (Old Regime Only)</h3>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>Section 80C (Limit: 1.5L)</span>
                                <span>{formatCurrency(investments.section80c)}</span>
                            </div>
                            <input
                                type="range" max="150000" step="5000"
                                className="w-full accent-green-600"
                                value={investments.section80c}
                                onChange={e => setInvestments({ ...investments, section80c: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>HRA Exemption</span>
                                <span>{formatCurrency(investments.hra)}</span>
                            </div>
                            <input
                                type="range" max="400000" step="5000"
                                className="w-full accent-blue-600"
                                value={investments.hra}
                                onChange={e => setInvestments({ ...investments, hra: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>NPS (Sec 80CCD)</span>
                                <span>{formatCurrency(investments.nps)}</span>
                            </div>
                            <input
                                type="range" max="50000" step="1000"
                                className="w-full accent-purple-600"
                                value={investments.nps}
                                onChange={e => setInvestments({ ...investments, nps: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-800">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>Changes made here do not affect actual payroll. This is a simulation tool. Submit proofs in 'Documents' section to actualize.</p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white">
                <div className="w-full max-w-sm">
                    <h3 className="text-center font-bold text-gray-900 mb-8">Estimated Tax Liability</h3>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className={`p-4 rounded-xl border-2 text-center transition-all ${recommended === 'New Regime' ? 'border-green-500 bg-green-50 shadow-md transform scale-105' : 'border-gray-200 opacity-60'
                            }`}>
                            <p className="text-xs font-bold uppercase mb-1">New Regime</p>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(newRegime)}</p>
                            {recommended === 'New Regime' && <span className="text-[10px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full">Recommended</span>}
                        </div>
                        <div className={`p-4 rounded-xl border-2 text-center transition-all ${recommended === 'Old Regime' ? 'border-green-500 bg-green-50 shadow-md transform scale-105' : 'border-gray-200 opacity-60'
                            }`}>
                            <p className="text-xs font-bold uppercase mb-1">Old Regime</p>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(oldRegime)}</p>
                            {recommended === 'Old Regime' && <span className="text-[10px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full">Recommended</span>}
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Potential Savings with {recommended}</p>
                        <p className="text-3xl font-black text-green-600 flex items-center justify-center gap-2">
                            {formatCurrency(savings)} <TrendingDown className="w-6 h-6" />
                        </p>
                    </div>

                    <button className="w-full mt-8 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Save Preference
                    </button>
                </div>
            </div>
        </div>
    );
}
