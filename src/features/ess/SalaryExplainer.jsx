import { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

const COMPONENTS = [
    { code: 'BASIC', name: 'Basic Salary', type: 'Earning', desc: 'The core component of your salary. Fully taxable. Usually 40-50% of CTC.', color: 'border-l-4 border-blue-500' },
    { code: 'HRA', name: 'House Rent Allowance', type: 'Earning', desc: 'Allowance for rental accommodation. Tax exempt if you pay rent (subject to limits).', color: 'border-l-4 border-blue-400' },
    { code: 'SA', name: 'Special Allowance', type: 'Earning', desc: 'Balancing component. Fully taxable. Used to adjust CTC.', color: 'border-l-4 border-blue-300' },
    { code: 'PF', name: 'Provident Fund', type: 'Deduction', desc: 'Social security contribution. 12% of Basic. Tax-free savings for retirement.', color: 'border-l-4 border-red-500' },
    { code: 'PT', name: 'Professional Tax', type: 'Deduction', desc: 'State government tax on employment. Usually ₹200/month in most states.', color: 'border-l-4 border-red-400' },
];

export default function SalaryExplainer() {
    const [activeComp, setActiveComp] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-yellow-400" />
                        Know Your Pay
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Interact with the payslip items to understand what they mean.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Payslip */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-1 rounded-b-lg text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Sample Payslip
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between border-b pb-2 mb-4">
                            <span className="font-bold text-gray-900">Component</span>
                            <span className="font-bold text-gray-900">Amount</span>
                        </div>

                        {COMPONENTS.map(comp => (
                            <div
                                key={comp.code}
                                onMouseEnter={() => setActiveComp(comp)}
                                onClick={() => setActiveComp(comp)} // Mobile tap
                                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${activeComp?.code === comp.code ? 'bg-indigo-50 shadow-inner scale-[1.02]' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Info className={`w-4 h-4 ${comp.type === 'Earning' ? 'text-blue-400' : 'text-red-400'}`} />
                                    <span className="font-medium text-gray-700">{comp.name}</span>
                                </div>
                                <span className="font-mono text-gray-600">₹XXXX</span>
                            </div>
                        ))}

                        <div className="border-t pt-4 flex justify-between items-center">
                            <span className="font-bold text-lg">Net Pay</span>
                            <span className="font-bold text-lg text-green-600">₹XXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Explanation Card */}
                <div className="flex items-center">
                    {activeComp ? (
                        <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-xl w-full animate-in fade-in slide-in-from-left-4 duration-300 ${activeComp.color}`}>
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-4 inline-block ${activeComp.type === 'Earning' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {activeComp.type}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeComp.name}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {activeComp.desc}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 w-full p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Hover over any pay component on the left to learn more about it.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
