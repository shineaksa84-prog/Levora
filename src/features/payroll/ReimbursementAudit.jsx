import { useState } from 'react';
import { Scan, AlertTriangle, CheckCircle, FileText, Search } from 'lucide-react';

const AUDIT_LOGS = [
    { id: 1, emp: 'Alice Smith', category: 'Travel', amount: 5400, risk: 'High', anomalies: ['Weekend Expense detected', 'Duplicate Receipt ID'], receipt: 'IMG_2023.jpg' },
    { id: 2, emp: 'Bob Jones', category: 'Internet', amount: 1200, risk: 'Low', anomalies: [], receipt: 'Bill_Nov.pdf' },
    { id: 3, emp: 'David Miller', category: 'Team Lunch', amount: 15000, risk: 'Medium', anomalies: ['Amount exceeds policy limit (₹10k)'], receipt: 'Lunch_Receipt.png' },
];

export default function ReimbursementAudit() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-900 text-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
                    <div className="relative mb-4">
                        <Scan className="w-16 h-16 text-cyan-400 animate-pulse" />
                        <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-xl font-bold mb-1">AI Audit Active</h2>
                    <p className="text-sm text-gray-400">Scanning uploaded receipts for fraud patterns, duplicates, and policy violations.</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Audit Stats (Nov)</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Total Claims Scanned</span>
                            <span className="font-bold">142</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-red-600 font-medium">Flagged High Risk</span>
                            <span className="font-bold text-red-600">3</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-orange-600 font-medium">Policy Warnings</span>
                            <span className="font-bold text-orange-600">12</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-green-600 font-medium">Auto-Verified</span>
                            <span className="font-bold text-green-600">127</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" /> Flagged Claims
                    </h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input className="w-full pl-10 py-1.5 rounded-lg border bg-gray-50 text-sm" placeholder="Search claims..." />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {AUDIT_LOGS.filter(l => l.risk !== 'Low').map(log => (
                        <div key={log.id} className="border border-red-100 bg-red-50/30 rounded-xl p-4 flex gap-4">
                            <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${log.risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                !
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{log.emp}</h4>
                                        <p className="text-xs text-muted-foreground">{log.category} • ₹{log.amount}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${log.risk === 'High' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                                        }`}>
                                        {log.risk} Risk
                                    </span>
                                </div>

                                <div className="bg-white border border-red-100 rounded-lg p-3 mb-3">
                                    <p className="text-xs font-bold text-red-800 mb-1">Detected Anomalies:</p>
                                    <ul className="list-disc list-inside text-xs text-red-700">
                                        {log.anomalies.map((a, i) => <li key={i}>{a}</li>)}
                                    </ul>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-1">
                                        <FileText className="w-3 h-3" /> View Receipt
                                    </button>
                                    <button className="flex-1 bg-red-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-red-700">
                                        Reject Claim
                                    </button>
                                    <button className="flex-1 bg-green-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-green-700">
                                        Override & Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center py-6">
                        <p className="text-xs font-medium text-gray-400">Showing only flagged items. 127 low-risk items hidden.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
