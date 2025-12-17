import { useState } from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

export default function SalaryBenchmark() {
    const DATA = [
        { role: 'SDE I', internal: 1200000, market: 1400000, gap: -14 },
        { role: 'SDE II', internal: 2400000, market: 2200000, gap: +9 },
        { role: 'Product Mgr', internal: 2000000, market: 2500000, gap: -20 },
        { role: 'Designer', internal: 1000000, market: 1000000, gap: 0 },
    ];

    const formatK = (val) => `₹${val / 100000}L`;

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] gap-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-primary" />
                        Compensation Benchmarking (2024)
                    </h2>
                    <span className="text-sm text-muted-foreground">Source: Glassdoor & LinkedIn Data</span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {DATA.map((item) => (
                        <div key={item.role} className="p-4 rounded-xl border bg-white flex flex-col justify-between group hover:shadow-md transition-shadow">
                            <div>
                                <h4 className="font-bold text-gray-900">{item.role}</h4>
                                <div className="flex items-end gap-2 mt-4 text-sm mb-6">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Us</span>
                                            <span>Market</span>
                                        </div>
                                        <div className="h-24 flex items-end justify-between px-2 gap-4">
                                            {/* Bars */}
                                            <div className="w-8 bg-blue-600 rounded-t-md relative group-hover:bg-blue-700 transition-colors" style={{ height: `${(item.internal / 3000000) * 100}%` }}>
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold">{formatK(item.internal)}</span>
                                            </div>
                                            <div className="w-8 bg-gray-300 rounded-t-md relative" style={{ height: `${(item.market / 3000000) * 100}%` }}>
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500">{formatK(item.market)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center py-2 rounded font-bold text-xs ${item.gap < -10 ? 'bg-red-100 text-red-700' :
                                    item.gap > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {item.gap === 0 ? 'At Par' : item.gap > 0 ? `${item.gap}% Above Market` : `${Math.abs(item.gap)}% Below Market`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-blue-900">Insight</h4>
                    <p className="text-sm text-blue-800 mt-1">
                        SDE I and Product Manager roles are significantly underpaid compared to the current market median.
                        This poses a high attrition risk. Consider corrections in the upcoming appraisal cycle.
                    </p>
                </div>
            </div>
        </div>
    );
}
