import { useState } from 'react';
import { Clock, CheckSquare, XSquare, DollarSign, Calendar } from 'lucide-react';

const OT_CLAIMS = [
    { id: 1, emp: 'John Doe', date: '2023-11-20', hours: 2.5, type: 'Weekday (1.5x)', reason: 'Server Maintenance', status: 'Pending', cost: 1250 },
    { id: 2, emp: 'Jane Smith', date: '2023-11-21', hours: 4.0, type: 'Holiday (2.0x)', reason: 'Urgent Client Call', status: 'Approved', cost: 4000 },
    { id: 3, emp: 'Mike Ross', date: '2023-11-20', hours: 1.0, type: 'Weekday (1.5x)', reason: 'Late Meeting', status: 'Rejected', cost: 500 },
];

export default function OvertimeManager() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <Clock className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Nov 2023 OT Spend</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black">₹ 45,200</span>
                        <span className="text-sm font-medium opacity-70">/ ₹ 50k Budget</span>
                    </div>
                    <div className="w-full bg-black/20 h-1.5 rounded-full mt-4">
                        <div className="bg-white h-full w-[90%] rounded-full opacity-80"></div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">OT Policy Rules</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg text-xs">
                            <div className="flex justify-between font-bold mb-1">
                                <span>Weekday OT</span>
                                <span className="text-blue-600">1.5x Hourly Rate</span>
                            </div>
                            <p className="text-muted-foreground">Applies after 9 hours of shift.</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-xs">
                            <div className="flex justify-between font-bold mb-1">
                                <span>Weekend/Holiday OT</span>
                                <span className="text-green-600">2.0x Hourly Rate</span>
                            </div>
                            <p className="text-muted-foreground">Pre-approval required.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold">OT Approvals Queue</h2>
                    <div className="flex gap-2 text-sm bg-gray-100 p-1 rounded-lg">
                        <button className="px-3 py-1 bg-white shadow rounded font-bold">Pending</button>
                        <button className="px-3 py-1 text-gray-500 hover:text-gray-900 font-medium transition-colors">History</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {OT_CLAIMS.map(claim => (
                        <div key={claim.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                        claim.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    OT
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{claim.emp}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                        <Calendar className="w-3 h-3" /> {claim.date} • {claim.hours} Hrs • {claim.type}
                                    </p>
                                    <p className="text-xs text-gray-700 mt-1 italic">"{claim.reason}"</p>
                                </div>
                            </div>

                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Est. Cost</p>
                                    <p className="font-bold text-gray-900">₹ {claim.cost}</p>
                                </div>
                                {claim.status === 'Pending' && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 border border-green-200">
                                            <CheckSquare className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200">
                                            <XSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                {claim.status !== 'Pending' && (
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${claim.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                        }`}>
                                        {claim.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
