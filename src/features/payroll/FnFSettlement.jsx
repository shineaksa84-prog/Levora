import { useState } from 'react';
import { Calculator, UserX, FileText, AlertCircle } from 'lucide-react';

export default function FnFSettlement() {
    // Mock Exit Data
    const [data, setData] = useState({
        name: 'Alex Johnson',
        lastDay: '2023-12-31',
        basic: 50000, // Monthly Basic
        noticePeriodGap: -15, // Negative = Employee owes company (Shortfall)
        leaveBalance: 12, // PLs
        assetsReturned: false,
    });

    const perDayBasic = Math.floor(data.basic / 30);
    const noticeRecovery = Math.abs(data.noticePeriodGap) * perDayBasic; // Only on Basic usually
    const leaveEncashment = data.leaveBalance * perDayBasic;
    const gratuity = 0; // Less than 5 years tenure mock
    const assetDeduction = data.assetsReturned ? 0 : 45000; // Laptop cost if not returned

    const netPayable = leaveEncashment - noticeRecovery - assetDeduction;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserX className="w-6 h-6 text-red-400" />
                        Full & Final Settlement (FnF)
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Exit clearance and final payout calculation.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                        Settlement Breakdown for {data.name}
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Earnings */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Earnings / Credits</p>
                            <div className="flex justify-between items-center text-sm">
                                <span>Leave Encashment ({data.leaveBalance} days)</span>
                                <span className="font-mono font-bold text-green-600">+₹{leaveEncashment.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Gratuity (Tenure &lt; 5yrs)</span>
                                <span className="font-mono font-bold text-gray-400">₹0</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-2"></div>

                        {/* Deductions */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recoveries / Deductions</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2">
                                    Notice Shortfall ({Math.abs(data.noticePeriodGap)} days)
                                    <AlertCircle className="w-3 h-3 text-orange-500" />
                                </span>
                                <span className="font-mono font-bold text-red-600">-₹{noticeRecovery.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className={data.assetsReturned ? 'text-gray-600' : 'text-red-600 font-bold'}>
                                    Asset Recovery (Laptop)
                                </span>
                                <span className="font-mono font-bold text-red-600">-₹{assetDeduction.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 border-t font-bold flex justify-between items-center ${netPayable >= 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <span>Net Payable / (Recoverable)</span>
                        <span className="text-2xl">₹{netPayable.toLocaleString()}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Clearance Checklist</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked readOnly className="accent-green-600" />
                                <span className="text-sm line-through text-gray-500">IT Access Revoked</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={data.assetsReturned} onChange={() => setData(prev => ({ ...prev, assetsReturned: !prev.assetsReturned }))} className="w-4 h-4 accent-indigo-600" />
                                <span className="text-sm font-medium">Laptop & ID Card Returned</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
                                <span className="text-sm font-medium">Finance No Dues</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black shadow-lg flex justify-center items-center gap-2">
                        <FileText className="w-5 h-5" /> Generate FnF Statement
                    </button>
                    <p className="text-xs text-center text-gray-500">
                        Generates PDF and emails to {data.name} (Personal Email).
                    </p>
                </div>
            </div>
        </div>
    );
}
