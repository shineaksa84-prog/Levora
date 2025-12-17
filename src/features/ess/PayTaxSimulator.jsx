import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, HelpCircle } from 'lucide-react';

export default function PayTaxSimulator() {
    const [salary, setSalary] = useState(1200000); // 12 LPA
    const [regime, setRegime] = useState('New');
    const [investment80C, setInvestment80C] = useState(150000);

    const calculateTax = () => {
        // Very simplified tax logic for demo
        let taxable = salary;
        if (regime === 'Old') {
            taxable -= investment80C; // 80C Deduction
            taxable -= 50000; // Standard Deduction
        } else {
            taxable -= 50000; // Standard Deduction allowed in New too now
        }

        let tax = 0;
        // Mock slab logic
        if (taxable > 300000) tax = (taxable * 0.1);

        return Math.floor(tax);
    };

    const tax = calculateTax();
    const monthlyInHand = Math.floor((salary - tax) / 12);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-emerald-200" />
                    Salary & Tax Simulator
                </h2>
                <p className="text-emerald-100 text-sm mt-1">
                    Estimate your monthly in-hand salary under Old vs New Tax Regimes.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Annual CTC (₹)</label>
                        <input
                            type="range"
                            min="500000"
                            max="5000000"
                            step="100000"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="text-right font-mono font-bold text-lg text-gray-900 mt-1">₹{salary.toLocaleString()}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tax Regime Preference</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {['New', 'Old'].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRegime(r)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${regime === r ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {r} Regime
                                </button>
                            ))}
                        </div>
                    </div>

                    {regime === 'Old' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-bold text-gray-700 mb-2">80C Investments (PPF, ELSS, LIC)</label>
                            <input
                                type="range"
                                min="0"
                                max="150000"
                                step="5000"
                                value={investment80C}
                                onChange={(e) => setInvestment80C(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>₹0</span>
                                <span className="font-bold text-blue-700">₹{investment80C.toLocaleString()}</span>
                                <span>₹1.5L (Max)</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                        <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Estimated Monthly In-Hand</p>
                        <p className="text-4xl font-extrabold text-emerald-600">₹{monthlyInHand.toLocaleString()}</p>
                        <p className="text-xs text-emerald-700 mt-2">
                            Annual Tax: <span className="font-bold">₹{tax.toLocaleString()}</span>
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" /> Smart Insight
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {regime === 'New'
                                ? "The New Regime offers lower tax rates but no deductions. Great if you don't have many investments."
                                : "The Old Regime allows you to save tax via investments. Ensure you max out your 80C limit (₹1.5L) to see benefits."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
