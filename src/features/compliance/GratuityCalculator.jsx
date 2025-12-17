import { useState } from 'react';
import { Calculator, Banknote, HelpCircle } from 'lucide-react';

export default function GratuityCalculator() {
    const [years, setYears] = useState(6);
    const [basic, setBasic] = useState(50000);

    const isEligible = years >= 5;
    const gratuityAmount = isEligible ? Math.round((15 * basic * years) / 26) : 0;
    const maxTaxFree = 2000000;

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
                    <Calculator className="w-6 h-6 text-purple-600" />
                    Gratuity Estimator
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Years of Service</label>
                        <input
                            type="number"
                            className="w-full mt-1 px-4 py-2 border rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-primary"
                            value={years}
                            onChange={e => setYears(Number(e.target.value))}
                        />
                        {!isEligible && <p className="text-xs text-red-500 mt-1 font-medium">Minimum 5 years required for eligibility.</p>}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Last Drawn Basic Salary</label>
                        <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 border rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-primary"
                                value={basic}
                                onChange={e => setBasic(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
                        <div className="text-xs text-purple-900 leading-relaxed">
                            <span className="font-bold">Formula:</span> (15 × Last Basic Pay × Tenure) ÷ 26.
                            <br />Calculated on working days basis (26 days/month).
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className={`rounded-xl p-8 text-white shadow-lg text-center transition-colors ${isEligible ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gray-200'}`}>
                    <Banknote className={`w-12 h-12 mx-auto mb-4 ${isEligible ? 'text-purple-200' : 'text-gray-400'}`} />
                    <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${isEligible ? 'text-purple-200' : 'text-gray-500'}`}>
                        {isEligible ? 'Payable Gratuity' : 'Not Eligible'}
                    </p>
                    <h3 className={`text-5xl font-black ${isEligible ? 'text-white' : 'text-gray-400'}`}>
                        ₹ {gratuityAmount.toLocaleString()}
                    </h3>
                    {isEligible && (
                        <p className="text-xs opacity-70 mt-4 bg-black/20 inline-block px-3 py-1 rounded-lg">
                            Subject to Govt limit of ₹20 Lakhs
                        </p>
                    )}
                </div>

                {isEligible && gratuityAmount > maxTaxFree && (
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-xs text-orange-800 font-medium text-center">
                        Note: Amount exceeding ₹20 Lakhs is taxable.
                    </div>
                )}
            </div>
        </div>
    );
}
