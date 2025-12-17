import { useState } from 'react';
import { Home, Globe, Laptop, Check, X, AlertTriangle } from 'lucide-react';

const MOCK_WFH_REQUESTS = [
    { id: 1, employee: 'John Doe', date: '2023-12-10', reason: 'Plumber visit', status: 'Pending', ip_risk: 'Low' },
    { id: 2, employee: 'Jane Smith', date: '2023-12-11', reason: 'Not feeling well', status: 'Approved', ip_risk: 'Low' },
    { id: 3, employee: 'Mike Ross', date: '2023-12-12', reason: 'Personal work', status: 'Pending', ip_risk: 'High (Unusual ISP)' },
];

export default function WFHTracker() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Laptop className="w-6 h-6 text-blue-300" />
                        Remote Work Command
                    </h2>
                    <p className="text-blue-200 text-sm mt-1">
                        Manage WFH requests and validate connectivity security.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-blue-300">14%</p>
                        <p className="text-xs text-blue-200/60 uppercase font-bold tracking-wider">Remote Today</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Request Queue */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Pending Requests</h3>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">2 New</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {MOCK_WFH_REQUESTS.map(req => (
                            <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">
                                            {req.employee.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{req.employee}</p>
                                            <p className="text-xs text-gray-500">{req.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>{req.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded italic">"{req.reason}"</p>

                                {req.ip_risk.includes('High') && (
                                    <div className="flex items-center gap-2 text-xs text-red-600 font-bold mb-3">
                                        <AlertTriangle className="w-3 h-3" /> Risk Alert: {req.ip_risk}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-1">
                                        <Check className="w-3 h-3" /> Approve
                                    </button>
                                    <button className="flex-1 bg-red-50 text-red-600 text-xs font-bold py-2 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1">
                                        <X className="w-3 h-3" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy & Stats */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-4">WFH Policy Compliance</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Department Limit (20%)</span>
                                    <span className="font-bold text-gray-900">14% Used</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[70%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Team Rotation Health</span>
                                    <span className="font-bold text-orange-600">Needs Review</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 w-[40%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                        <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Global IP Watch
                        </h3>
                        <p className="text-xs text-indigo-700 leading-relaxed">
                            System automatically flags login attempts from non-whitelisted countries or suspicious ISPs.
                            Currently monitoring <strong>4 active remote sessions</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
