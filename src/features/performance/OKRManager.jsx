import { useState } from 'react';
import { Target, TrendingUp, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const MOCK_OKRS = [
    {
        id: 1,
        title: 'Company: Achieve $10M ARR',
        owner: 'CEO',
        progress: 72,
        keyResults: [
            { id: 101, title: 'Close 50 Enterprise Deals', current: 38, target: 50, unit: 'Deals' },
            { id: 102, title: 'Launch 3 New Products', current: 2, target: 3, unit: 'Products' },
        ],
        isOpen: true,
    },
    {
        id: 2,
        title: 'Product Team: Ship "Advanced Payroll" Module',
        owner: 'Product Head',
        progress: 85,
        keyResults: [
            { id: 201, title: 'Complete Backend API', current: 100, target: 100, unit: '%' },
            { id: 202, title: 'Run Beta with 5 Clients', current: 3, target: 5, unit: 'Clients' },
        ],
        isOpen: false,
    },
];

export default function OKRManager() {
    const [okrs, setOkrs] = useState(MOCK_OKRS);

    const toggleOpen = (id) => {
        setOkrs(okrs.map(okr => okr.id === id ? { ...okr, isOpen: !okr.isOpen } : okr));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-500" />
                        Objectives & Key Results (OKR)
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Track strategic alignment from Company to Individual levels.
                    </p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-colors">
                    <Plus className="w-4 h-4" /> Add Objective
                </button>
            </div>

            <div className="space-y-4">
                {okrs.map(okr => (
                    <div key={okr.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Header */}
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleOpen(okr.id)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`p-2 rounded-lg ${okr.progress >= 80 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{okr.title}</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Owner: {okr.owner}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-32">
                                    <div className="flex justify-between text-xs mb-1 font-bold text-gray-600">
                                        <span>Progress</span>
                                        <span>{okr.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${okr.progress >= 80 ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${okr.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {okr.isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </div>
                        </div>

                        {/* Key Results Body */}
                        {okr.isOpen && (
                            <div className="bg-gray-50 border-t border-gray-100 p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Key Results</p>
                                {okr.keyResults.map(kr => {
                                    const percent = Math.floor((kr.current / kr.target) * 100);
                                    return (
                                        <div key={kr.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 rounded text-gray-500">
                                                <TrendingUp className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-gray-800 text-sm">{kr.title}</span>
                                                    <span className="text-xs font-bold text-gray-500">{kr.current} / {kr.target} {kr.unit}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${percent >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                                        style={{ width: `${Math.min(percent, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={kr.target}
                                                    value={kr.current}
                                                    readOnly // Mock interaction for now
                                                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
