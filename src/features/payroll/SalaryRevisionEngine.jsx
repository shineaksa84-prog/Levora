import { useState } from 'react';
import { TrendingUp, Calendar, ArrowRight, History, CheckCircle } from 'lucide-react';

const REVISION_HISTORY = [
    { id: 1, date: '2023-04-01', type: 'Annual Appraisal', oldCTC: 1000000, newCTC: 1200000, hike: '20%' },
    { id: 2, date: '2022-04-01', type: 'Annual Appraisal', oldCTC: 800000, newCTC: 1000000, hike: '25%' },
];

export default function SalaryRevisionEngine() {
    const [currentCTC, setCurrentCTC] = useState(1200000);
    const [hikePercent, setHikePercent] = useState(10);
    const [effectiveDate, setEffectiveDate] = useState('2024-04-01');

    const newCTC = currentCTC + (currentCTC * (hikePercent / 100));
    const monthlyInc = (newCTC - currentCTC) / 12;

    // Arrear Check: If effective date is in past (mock logic)
    const isArrearApplicable = new Date(effectiveDate) < new Date('2024-05-01'); // Assume current date May
    const arrearMonths = isArrearApplicable ? 1 : 0;
    const arrearAmount = monthlyInc * arrearMonths;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        Salary Revision & Increments
                    </h2>
                    <p className="text-indigo-200 text-sm mt-1">
                        Manage appraisals, promotions, and correction history.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Calculator */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-900 border-b pb-2">New Revision Proposal</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Current CTC</label>
                            <div className="text-xl font-mono font-bold text-gray-900">₹{currentCTC.toLocaleString()}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Effective Date</label>
                            <input
                                type="date"
                                value={effectiveDate}
                                onChange={(e) => setEffectiveDate(e.target.value)}
                                className="border rounded px-2 py-1 text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Hike Percentage: {hikePercent}%</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="0.5"
                            value={hikePercent}
                            onChange={(e) => setHikePercent(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">New CTC</span>
                            <span className="text-2xl font-bold text-indigo-700">₹{newCTC.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-indigo-600">
                            <span>Monthly Increment</span>
                            <span className="font-bold">+₹{Math.floor(monthlyInc).toLocaleString()}</span>
                        </div>
                    </div>

                    {isArrearApplicable && (
                        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-orange-800 flex gap-2 items-start">
                            <Calendar className="w-4 h-4 mt-0.5" />
                            <div>
                                <span className="font-bold block">Arrear Detected</span>
                                Effective date is in the past. System will auto-add <strong>₹{Math.floor(arrearAmount).toLocaleString()}</strong> as "Arrears" in next payroll.
                            </div>
                        </div>
                    )}

                    <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg flex justify-center items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Approve & Update Payroll
                    </button>
                </div>

                {/* History */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-50 font-bold text-gray-700 flex items-center gap-2 border-b border-gray-100">
                        <History className="w-4 h-4" /> Revision History
                    </div>
                    <div className="divide-y divide-gray-100">
                        {REVISION_HISTORY.map(rev => (
                            <div key={rev.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-gray-900">{rev.type}</span>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">+{rev.hike}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2">{rev.date}</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-mono text-gray-500">₹{(rev.oldCTC / 100000).toFixed(1)}L</span>
                                    <ArrowRight className="w-3 h-3 text-gray-400" />
                                    <span className="font-mono font-bold text-gray-900">₹{(rev.newCTC / 100000).toFixed(1)}L</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
