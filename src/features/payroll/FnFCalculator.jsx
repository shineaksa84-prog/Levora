import { useState } from 'react';
import { Calculator, UserMinus, Printer, CheckSquare } from 'lucide-react';

export default function FnFCalculator() {
    const [emp, setEmp] = useState({ name: 'Alice Smith', id: 'EMP045', lwd: '2023-11-30' });
    const [components, setComponents] = useState({
        pendingSalary: 45000,
        leaveEncashment: 12000, // 10 days
        noticePay: 0,
        bonus: 50000,
        gratuity: 0,
        assetRecovery: 0,
        otherDeductions: 0
    });

    const totalPayable =
        components.pendingSalary + components.leaveEncashment + components.noticePay + components.bonus + components.gratuity
        - (components.assetRecovery + components.otherDeductions);

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserMinus className="w-5 h-5 text-gray-700" />
                        Full & Final Settlement
                    </h2>
                    <div className="text-right">
                        <p className="font-bold text-gray-900">{emp.name} ({emp.id})</p>
                        <p className="text-xs text-muted-foreground">Last Working Day: {emp.lwd}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 content-start">
                    <div className="col-span-2 font-bold text-sm text-green-700 bg-green-50 p-2 rounded uppercase tracking-wider mb-2">Earnings</div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Pending Salary (Nov)</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 font-mono"
                            value={components.pendingSalary} onChange={e => setComponents({ ...components, pendingSalary: Number(e.target.value) })} />
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Leave Encashment (10 days)</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 font-mono"
                            value={components.leaveEncashment} onChange={e => setComponents({ ...components, leaveEncashment: Number(e.target.value) })} />
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Notice Period Pay</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 font-mono"
                            value={components.noticePay} onChange={e => setComponents({ ...components, noticePay: Number(e.target.value) })} />
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Annual Bonus (Pro-rata)</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 font-mono"
                            value={components.bonus} onChange={e => setComponents({ ...components, bonus: Number(e.target.value) })} />
                    </div>

                    <div className="col-span-2 font-bold text-sm text-red-700 bg-red-50 p-2 rounded uppercase tracking-wider mb-2 mt-4">Deductions</div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Asset Recovery / Damage</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-500 font-mono text-red-600"
                            value={components.assetRecovery} onChange={e => setComponents({ ...components, assetRecovery: Number(e.target.value) })} />
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <label className="text-sm font-medium">Other Deductions (Advance, etc)</label>
                        <input type="number" className="w-24 text-right bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-500 font-mono text-red-600"
                            value={components.otherDeductions} onChange={e => setComponents({ ...components, otherDeductions: Number(e.target.value) })} />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-6">Settlement Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Total Earnings</span>
                            <span className="font-mono">{formatCurrency(components.pendingSalary + components.leaveEncashment + components.noticePay + components.bonus + components.gratuity)}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>Total Deductions</span>
                            <span className="font-mono">- {formatCurrency(components.assetRecovery + components.otherDeductions)}</span>
                        </div>
                        <div className="my-4 border-t-2 border-dashed border-gray-200"></div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Net Payable</span>
                            <span className="text-green-600">{formatCurrency(totalPayable)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
                        <CheckSquare className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                        <p>Clearance from IT, Admin, and Finance has been received. This amount is final.</p>
                    </div>
                    <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                        <Printer className="w-4 h-4" /> Generate Statement
                    </button>
                </div>
            </div>
        </div>
    );
}
