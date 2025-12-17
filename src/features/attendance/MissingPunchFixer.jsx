import { useState } from 'react';
import { Clock, Check, Edit2, AlertCircle } from 'lucide-react';

const MISSING_PUNCHES = [
    { id: 1, date: '2023-12-04', in: '09:05 AM', predicted_out: '06:15 PM', confidence: '92%' },
    { id: 2, date: '2023-12-07', in: '09:30 AM', predicted_out: '06:45 PM', confidence: '88%' },
];

export default function MissingPunchFixer() {
    return (
        <div className="space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-6 h-6 text-yellow-400" />
                        Smart Regularization
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        AI-predicted fixes for missing punches based on your average hours.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Punch In</th>
                            <th className="px-6 py-4">AI Predicted Out</th>
                            <th className="px-6 py-4">Confidence</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MISSING_PUNCHES.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">{item.date}</td>
                                <td className="px-6 py-4 text-green-600 font-mono">{item.in}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-900 font-bold font-mono text-lg">{item.predicted_out}</span>
                                        <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold">AVG</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-600">{item.confidence}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all">
                                        <Check className="w-3 h-3" /> Accept
                                    </button>
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all">
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Predicted times are based on your 30-day average working hours (9h 10m).</span>
                </div>
            </div>
        </div>
    );
}
