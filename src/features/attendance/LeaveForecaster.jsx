import { useState } from 'react';
import { Calendar, Plane, Sun, AlertTriangle } from 'lucide-react';

const LEAVE_TYPES = [
    { type: 'Privilege Leave (PL)', balance: 18, expiry: 'Dec 31', risk: 'High' },
    { type: 'Casual Leave (CL)', balance: 4, expiry: 'Dec 31', risk: 'Medium' },
    { type: 'Sick Leave (SL)', balance: 6, expiry: 'Unlimited', risk: 'Low' },
];

export default function LeaveForecaster() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Plane className="w-6 h-6 text-teal-200" />
                        Leave Balance Forecaster
                    </h2>
                    <p className="text-teal-100 text-sm mt-1">
                        AI Predictions for Year-End Leave Utilization.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-white">22</p>
                    <p className="text-xs text-teal-200 uppercase font-bold tracking-wider">Leaves at Risk</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {LEAVE_TYPES.map((leave, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-900">{leave.type}</h3>
                                <p className="text-xs text-gray-500">Expires: {leave.expiry}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">{leave.balance}</p>
                                {leave.risk === 'High' && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-1">
                                        <AlertTriangle className="w-3 h-3" /> Lapse Risk
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
                    <h3 className="font-bold text-yellow-900 mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5" /> Smart Leave Suggestions
                    </h3>
                    <p className="text-sm text-yellow-800 mb-4">
                        Based on your pending PLs and team calendar, here are the best times to take a break:
                    </p>

                    <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-yellow-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Oct 20 - Oct 25</span>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Diwali Bridge</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Use 3 PLs to get 6 days off. Team availability: High.</p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-yellow-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Dec 26 - Dec 31</span>
                                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">Year End</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Use 5 PLs. Burn down your lapse balance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
