import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const DATA = [
    { name: 'Basic & DA', value: 600000, color: '#3b82f6' },
    { name: 'HRA', value: 240000, color: '#10b981' },
    { name: 'Special Allow.', value: 360000, color: '#f59e0b' },
    { name: 'Bonus', value: 100000, color: '#8b5cf6' },
];

export default function YTDOverview() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">YTD Payroll Summary</h2>
                    <p className="text-sm text-gray-500">Financial Year 2024-2025 (Apr - Dec)</p>
                </div>
                <button className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                    <Download className="w-4 h-4" /> Download YTD Statement
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Total Gross Earnings</p>
                        <p className="text-3xl font-bold text-blue-900 mt-1">₹13.00 L</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <p className="text-xs font-bold text-red-500 uppercase tracking-wider">TDS Deducted (Tax)</p>
                        <p className="text-3xl font-bold text-red-900 mt-1">₹1.42 L</p>
                        <p className="text-xs text-red-400 mt-2">Projected Tax: ₹2.10 L</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">PF Accumulated</p>
                        <p className="text-3xl font-bold text-emerald-900 mt-1">₹86,400</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">Earnings Composition</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center flex-wrap gap-4 mt-4">
                        {DATA.map(d => (
                            <div key={d.name} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                                {d.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
