import { useState } from 'react';
import { ShieldCheck, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

const EMPLOYEES = [
    { id: 101, name: 'Rahul Sharma', basic: 12000, gross: 18000, pf_status: 'Covered', esi_status: 'Covered' },
    { id: 102, name: 'Priya Singh', basic: 25000, gross: 45000, pf_status: 'Covered', esi_status: 'Not Covered' },
    { id: 103, name: 'Amit Kumar', basic: 14000, gross: 20000, pf_status: 'Not Covered', esi_status: 'Covered' }, // Flag: Basic < 15k but no PF
    { id: 104, name: 'Sneha Gupta', basic: 18000, gross: 25000, pf_status: 'Exempt', esi_status: 'Not Covered' },
    { id: 105, name: 'Vikram Raj', basic: 10000, gross: 15000, pf_status: 'Covered', esi_status: 'Not Covered' }, // Flag: Gross < 21k but no ESI
];

export default function PF_ESI_Validator() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                        Compliance Rules
                    </h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 text-sm mb-1">Provident Fund (PF)</h3>
                            <p className="text-xs text-blue-700 mb-2">Mandatory if Basic Salary ≤ ₹15,000.</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-blue-800">
                                <CheckCircle2 className="w-3 h-3" /> Employer Share: 12%
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <h3 className="font-bold text-emerald-900 text-sm mb-1">ESI Scheme</h3>
                            <p className="text-xs text-emerald-700 mb-2">Mandatory if Gross Salary ≤ ₹21,000.</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800">
                                <CheckCircle2 className="w-3 h-3" /> Employer Share: 3.25%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Scan Summary</h3>
                    <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-500">Total Employees</span>
                        <span className="font-bold">142</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm text-red-600">
                        <span className="font-medium">Non-Compliant</span>
                        <span className="font-bold">2 Detected</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-green-500 h-full w-[98%]"></div>
                    </div>
                    <p className="text-[10px] text-right text-gray-400 mt-1">98% Compliance Score</p>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Validation Report
                    </h2>
                    <button className="text-sm font-bold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors">
                        Run New Scan
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left">Employee</th>
                                <th className="px-6 py-3 text-right">Compensation</th>
                                <th className="px-6 py-3 text-center">PF Status</th>
                                <th className="px-6 py-3 text-center">ESI Status</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {EMPLOYEES.map(emp => {
                                const isPFNonCompliant = emp.basic <= 15000 && emp.pf_status === 'Not Covered';
                                const isESINonCompliant = emp.gross <= 21000 && emp.esi_status === 'Not Covered';
                                const hasError = isPFNonCompliant || isESINonCompliant;

                                return (
                                    <tr key={emp.id} className={`hover:bg-gray-50/50 ${hasError ? 'bg-red-50/10' : ''}`}>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{emp.name}</p>
                                            <p className="text-xs text-muted-foreground">ID: {emp.id}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="text-xs text-gray-500">Basic: ₹{emp.basic.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">Gross: ₹{emp.gross.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${isPFNonCompliant ? 'bg-red-100 text-red-700 border border-red-200' :
                                                    emp.pf_status === 'Exempt' ? 'bg-gray-100 text-gray-600' :
                                                        'bg-green-50 text-green-700'
                                                }`}>
                                                {isPFNonCompliant ? 'Non-Compliant' : emp.pf_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${isESINonCompliant ? 'bg-red-100 text-red-700 border border-red-200' :
                                                    'bg-green-50 text-green-700'
                                                }`}>
                                                {isESINonCompliant ? 'Non-Compliant' : emp.esi_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {hasError && (
                                                <button className="text-red-600 font-bold text-xs hover:underline flex items-center justify-center gap-1 mx-auto">
                                                    <AlertCircle className="w-3 h-3" /> Fix Issue
                                                </button>
                                            )}
                                            {!hasError && <FileCheck className="w-4 h-4 text-gray-300 mx-auto" />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
