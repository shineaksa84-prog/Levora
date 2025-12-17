import { useState, useEffect } from 'react';
import { Calculator, Save, Download, RefreshCw, Info } from 'lucide-react';

export default function SalaryStructureGen() {
    const [ctc, setCtc] = useState(1200000);
    const [isMetro, setIsMetro] = useState(true);
    const [regime, setRegime] = useState('new');
    const [structure, setStructure] = useState(null);

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
                            <label className="text-xs font-bold text-gray-500 uppercase">Annual CTC</label>
                            <div className="relative mt-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={ctc}
                                    onChange={(e) => setCtc(parseInt(e.target.value) || 0)}
                                    className="w-full pl-8 pr-4 py-2 border rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Location Type</label>
                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={() => setIsMetro(true)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border ${isMetro ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'}`}
                                >
                                    Metro (50% HRA)
                                </button>
                                <button
                                    onClick={() => setIsMetro(false)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border ${!isMetro ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'}`}
                                >
                                    Non-Metro (40%)
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Tax Regime</label>
                            <select
                                value={regime}
                                onChange={(e) => setRegime(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm font-bold bg-white"
                            >
                                <option value="new">New Regime (Default)</option>
                                <option value="old">Old Regime (with Deductions)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all" onClick={calculateStructure}>
                            <RefreshCw className="w-4 h-4" /> Recalculate
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        <strong>Note:</strong> PF is capped at ₹1,800/mo for employer contribution as per standard logic. Special Allowance is the balancing component.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col">
                <div className="bg-gray-900 text-white p-6 rounded-t-xl flex justify-between items-center shadow-lg z-10">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Estimated Monthly Net Pay</p>
                        <h3 className="text-3xl font-black mt-1 text-green-400">{structure ? formatCurrency(structure.monthly.net) : '...'}</h3>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors">
                            <Download className="w-4 h-4" /> Export PDF
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors shadow-lg">
                            <Save className="w-4 h-4" /> Save Structure
                        </button>
                    </div>
                </div>

                <div className="bg-white border-x border-b border-gray-200 rounded-b-xl flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left">Salary Component</th>
                                    <th className="px-6 py-3 text-right">Monthly</th>
                                    <th className="px-6 py-3 text-right">Annually</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { label: 'Basic Salary', key: 'basic', highlight: true },
                                    { label: 'House Rent Allowance (HRA)', key: 'hra' },
                                    { label: 'Leave Travel Allowance', key: 'lta' },
                                    { label: 'Statutory Bonus', key: 'bonus' },
                                    { label: 'Special Allowance', key: 'special' },
                                ].map((row, i) => (
                                    <tr key={i} className={`hover:bg-gray-50/50 ${row.highlight ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                        <td className="px-6 py-3">{row.label}</td>
                                        <td className="px-6 py-3 text-right">{structure ? formatCurrency(structure.monthly[row.key]) : '-'}</td>
                                        <td className="px-6 py-3 text-right">{structure ? formatCurrency(structure.yearly[row.key]) : '-'}</td>
                                    </tr>
                                ))}
                                <tr className="bg-green-50/50 font-bold text-gray-900 border-t-2 border-green-100">
                                    <td className="px-6 py-4">Gross Salary</td>
                                    <td className="px-6 py-4 text-right">{structure ? formatCurrency(structure.monthly.gross) : '-'}</td>
                                    <td className="px-6 py-4 text-right">{structure ? formatCurrency(structure.yearly.gross) : '-'}</td>
                                </tr>
                                <tr className="text-red-600 bg-red-50/10 hover:bg-red-50/30">
                                    <td className="px-6 py-3">PF (Employer Contribution)</td>
                                    <td className="px-6 py-3 text-right">-{structure ? formatCurrency(structure.monthly.pf) : '-'}</td>
                                    <td className="px-6 py-3 text-right">-{structure ? formatCurrency(structure.yearly.pf) : '-'}</td>
                                </tr>
                                <tr className="text-red-600 bg-red-50/10 hover:bg-red-50/30">
                                    <td className="px-6 py-3">Professional Tax (Est.)</td>
                                    <td className="px-6 py-3 text-right">-₹200</td>
                                    <td className="px-6 py-3 text-right">-₹2,400</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
