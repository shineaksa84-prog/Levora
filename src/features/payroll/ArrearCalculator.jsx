import { useState } from 'react';
import { History, Calculator, ArrowRight, Save } from 'lucide-react';

export default function ArrearCalculator() {
    const [emp, setEmp] = useState('John Doe');
    const [type, setType] = useState('Salary Hike'); // Salary Hike, Attendance Correction
    const [effectiveDate, setEffectiveDate] = useState('2023-09-01');
    const [currentMonth, setCurrentMonth] = useState('2023-11-01');

    // Mock diff calculation
    const months = 2; // Sept, Oct
    const oldSalary = 50000;
    const newSalary = 60000;
    const diffPerMonth = newSalary - oldSalary; // 10000
    const totalArrear = diffPerMonth * months; // 20000

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <History className="w-5 h-5 text-indigo-600" />
                    Arrear Computation
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Employee</label>
                        <input className="w-full mt-1 px-4 py-2 border rounded-lg font-medium" value={emp} onChange={e => setEmp(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Input Type</label>
                            <select className="w-full mt-1 px-4 py-2 border rounded-lg font-medium bg-white" value={type} onChange={e => setType(e.target.value)}>
                                <option>Salary Hike</option>
                                <option>Attendance Correction</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Effective From</label>
                            <input type="date" className="w-full mt-1 px-4 py-2 border rounded-lg font-medium" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-indigo-800">Old Monthly Basic</span>
                            <span className="font-bold text-indigo-900">₹ {oldSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-indigo-800">New Monthly Basic</span>
                            <span className="font-bold text-indigo-900">₹ {newSalary.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-indigo-200 pt-2 flex justify-between text-sm">
                            <span className="text-indigo-800 font-bold">Difference</span>
                            <span className="font-bold text-indigo-900">+ ₹ {diffPerMonth.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <span className="text-xs font-bold text-gray-400 uppercase">Applicable Period</span>
                        <p className="text-gray-900 font-medium">2 Months (Sept, Oct)</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-8 text-white shadow-lg text-center">
                    <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Total Arrear Payable</p>
                    <h3 className="text-5xl font-black mb-4">₹ {totalArrear.toLocaleString()}</h3>
                    <p className="text-xs opacity-60">To be added in Nov 2023 Payroll</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex-1">
                    <h3 className="font-bold text-gray-900 mb-4">Breakdown</h3>
                    <div className="space-y-0 relative border-l-2 border-gray-100 ml-2 pl-6 pb-2">
                        {[
                            { month: 'September 2023', paid: 50000, actual: 60000, diff: 10000 },
                            { month: 'October 2023', paid: 50000, actual: 60000, diff: 10000 },
                        ].map((item, i) => (
                            <div key={i} className="mb-6 relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                                <h4 className="font-bold text-gray-900 text-sm">{item.month}</h4>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>Paid: {item.paid}</span>
                                    <span>Should be: {item.actual}</span>
                                </div>
                                <div className="mt-2 text-sm font-bold text-green-600">
                                    Arrear: + ₹ {item.diff.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Confirm & Add to Payroll
                    </button>
                </div>
            </div>
        </div>
    );
}
