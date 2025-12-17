import { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const VALIDATIONS = [
    { id: 1, category: 'Attendance', check: 'Missing Punch Ins', count: 12, severity: 'High', status: 'Failed' },
    { id: 2, category: 'Attendance', check: 'Unregularized Absences', count: 5, severity: 'High', status: 'Failed' },
    { id: 3, category: 'Leave', check: 'Pending Leave Approvals', count: 3, severity: 'Medium', status: 'Warning' },
    { id: 4, category: 'Claims', check: 'Unverified Reimbursements', count: 0, severity: 'Low', status: 'Passed' },
    { id: 5, category: 'Data', check: 'Missing Bank Details', count: 1, severity: 'Critical', status: 'Failed' },
    { id: 6, category: 'Data', check: 'PAN Card Validation', count: 0, severity: 'Critical', status: 'Passed' },
];

export default function PayCycleValidator() {
    const [scanning, setScanning] = useState(false);

    const criticalErrors = VALIDATIONS.filter(v => v.severity === 'Critical' && v.status === 'Failed').length;
    const highErrors = VALIDATIONS.filter(v => v.severity === 'High' && v.status === 'Failed').length;
    const readyScore = 65;

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className={`rounded-xl p-8 text-center border-4 ${readyScore === 100 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    } flex flex-col items-center justify-center h-64 shadow-sm relative overflow-hidden`}>
                    <ShieldCheck className={`w-20 h-20 mb-4 ${readyScore === 100 ? 'text-green-500' : 'text-red-500'}`} />
                    <h2 className="text-5xl font-black text-gray-900 mb-2">{readyScore}%</h2>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Payroll Readiness</p>

                    {readyScore < 100 && (
                        <div className="absolute bottom-0 left-0 w-full bg-red-100 py-2 text-xs font-bold text-red-700">
                            Action Required Before Processing
                        </div>
                    )}
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                            <span className="flex items-center gap-2 text-sm text-red-800 font-medium">
                                <AlertCircle className="w-4 h-4" /> Blocking Critical Errors
                            </span>
                            <span className="font-bold text-red-700">{criticalErrors}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                            <span className="flex items-center gap-2 text-sm text-orange-800 font-medium">
                                <AlertTriangle className="w-4 h-4" /> High Priority Warnings
                            </span>
                            <span className="font-bold text-orange-700">{highErrors}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                            <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
                                <CheckCircle className="w-4 h-4" /> Passed Checks
                            </span>
                            <span className="font-bold text-green-700">{VALIDATIONS.filter(v => v.status === 'Passed').length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Validation Report
                        </h2>
                        <p className="text-sm text-muted-foreground">Cycle: Nov 2023</p>
                    </div>
                    <button className="text-sm font-bold text-primary hover:underline">Re-run Scan</button>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left">Check Category</th>
                                <th className="px-6 py-3 text-left">Validation Rule</th>
                                <th className="px-6 py-3 text-right">Impact</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {VALIDATIONS.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50/50 group">
                                    <td className="px-6 py-4 font-medium text-gray-600">{item.category}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{item.check}</td>
                                    <td className="px-6 py-4 text-right">
                                        {item.count > 0 ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-700">
                                                {item.count} Employees
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${item.status === 'Passed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                item.status === 'Warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {item.status === 'Passed' && <CheckCircle className="w-3 h-3" />}
                                            {item.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                                            {item.status === 'Failed' && <AlertCircle className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status !== 'Passed' && (
                                            <button className="text-primary font-bold text-xs flex items-center gap-1 ml-auto hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                                Resolve <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
