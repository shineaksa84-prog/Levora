import { useState } from 'react';
import { DollarSign, PieChart, CheckCircle2, XCircle } from 'lucide-react';

const REQUESTS = [
    { id: 1, emp: 'Alice Smith', course: 'Advanced UX Workshop', cost: 450, status: 'Pending' },
    { id: 2, emp: 'Bob Jones', course: 'AWS Certification Exam', cost: 150, status: 'Approved' },
    { id: 3, emp: 'Charlie Day', course: 'React Conference Ticket', cost: 800, status: 'Rejected' },
];

export default function TrainingBudget() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                    <DollarSign className="absolute right-4 top-4 w-24 h-24 opacity-10 rotate-12" />
                    <p className="font-medium text-emerald-100 mb-1">Total Team Budget (FY 23-24)</p>
                    <h2 className="text-4xl font-black mb-6">$10,000</h2>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-2xl font-bold">$3,450</p>
                            <p className="text-xs opacity-80 uppercase tracking-widest">Utilized</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">$6,550</p>
                            <p className="text-xs opacity-80 uppercase tracking-widest">Remaining</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Approval Requests
                    </h3>
                    <div className="space-y-4">
                        {REQUESTS.map(req => (
                            <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900">{req.course}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">{req.emp} • ${req.cost}</p>
                                </div>
                                <div>
                                    {req.status === 'Pending' ? (
                                        <div className="flex gap-2">
                                            <button className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"><CheckCircle2 className="w-4 h-4" /></button>
                                            <button className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"><XCircle className="w-4 h-4" /></button>
                                        </div>
                                    ) : (
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-gray-500" />
                    Utilization by Employee
                </h3>

                <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                    {[
                        { name: 'Alice Smith', used: 1200, total: 2000, color: 'bg-blue-500' },
                        { name: 'Bob Jones', used: 450, total: 2000, color: 'bg-emerald-500' },
                        { name: 'Charlie Day', used: 1800, total: 2000, color: 'bg-orange-500' },
                        { name: 'Diana Prince', used: 0, total: 2000, color: 'bg-gray-300' },
                    ].map((emp, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-700">{emp.name}</span>
                                <span className="text-muted-foreground">${emp.used} / ${emp.total}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${emp.color}`} style={{ width: `${(emp.used / emp.total) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-xl text-xs leading-relaxed border border-blue-100">
                    <p className="font-bold mb-1">Budget Insight</p>
                    <p>Charlie Day is nearing his annual allocation limit (90%). Consider discussing future training needs before approving further requests.</p>
                </div>
            </div>
        </div>
    );
}
