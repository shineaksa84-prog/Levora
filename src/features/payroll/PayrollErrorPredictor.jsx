import { useState } from 'react';
import { AlertOctagon, CheckCircle, Search, ArrowRight } from 'lucide-react';

const RISKS = [
    { id: 1, type: 'Critical', msg: 'Zero Attendance but Active Salary', count: 2, impact: 'High Financial Loss' },
    { id: 2, type: 'Critical', msg: 'Negative Net Pay detected', count: 5, impact: 'Compliance Risk' },
    { id: 3, type: 'Warning', msg: 'Sudden Salary Jump (>50%)', count: 1, impact: 'Audit Flag' },
    { id: 4, type: 'Warning', msg: 'Missing Date of Joining', count: 12, impact: 'Gratuity Calculation Error' },
];

export default function PayrollErrorPredictor() {
    const [scanStatus, setScanStatus] = useState('Idle');

    const runScan = () => {
        setScanStatus('Scanning');
        setTimeout(() => setScanStatus('Complete'), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <AlertOctagon className="w-6 h-6 text-pink-400" />
                        AI Payroll Auditor
                    </h2>
                    <p className="text-purple-200 text-sm mt-1">
                        Predicts and prevents errors before the payout run.
                    </p>
                </div>
                {scanStatus === 'Idle' && (
                    <button onClick={runScan} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all animate-pulse">
                        Run Pre-Flight Check
                    </button>
                )}
            </div>

            {scanStatus === 'Scanning' && (
                <div className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Scanning 142 employee records for anomalies...</p>
                </div>
            )}

            {scanStatus === 'Complete' && (
                <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Risk List */}
                    <div className="space-y-4">
                        {RISKS.map(risk => (
                            <div key={risk.id} className={`bg-white border-l-4 rounded-r-xl p-4 shadow-sm flex justify-between items-center ${risk.type === 'Critical' ? 'border-red-500' : 'border-yellow-500'
                                }`}>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${risk.type === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>{risk.type}</span>
                                        <span className="text-xs text-gray-500">{risk.impact}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900">{risk.msg}</h4>
                                </div>
                                <div className="text-center bg-gray-50 p-2 rounded-lg">
                                    <span className="block text-xl font-bold text-gray-900">{risk.count}</span>
                                    <span className="text-[10px] text-gray-500 uppercase">Records</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Panel */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Recommended Actions</h3>

                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="font-bold text-gray-800 block">Fix Zero Attendance</span>
                                    <span className="text-xs text-gray-500">Auto-convert to LOP (Loss of Pay)</span>
                                </div>
                                <button className="text-blue-600 hover:underline text-xs font-bold">Apply Fix</button>
                            </div>

                            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="font-bold text-gray-800 block">Investigate Salary Jumps</span>
                                    <span className="text-xs text-gray-500">View detailed audit trail</span>
                                </div>
                                <button className="text-blue-600 hover:underline text-xs font-bold">View List</button>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg text-sm text-center font-bold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                            <CheckCircle className="w-4 h-4" /> Resolve Critical Errors to Proceed
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
