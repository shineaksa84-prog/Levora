import { useState } from 'react';
import { Grid, BarChart3, Info } from 'lucide-react';

export default function PerformanceAnalytics() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Grid className="w-5 h-5 text-indigo-600" />
                        9-Box Grid Analysis
                    </h2>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Dept: Engineering</span>
                </div>

                <div className="flex-1 relative border-l-2 border-b-2 border-gray-300 m-4 ml-8 mb-8">
                    {/* Y-Axis Label */}
                    <div className="absolute -left-8 bottom-0 w-full h-full flex items-center justify-center -rotate-90 text-xs font-bold text-gray-500 tracking-widest origin-left">
                        POTENTIAL
                    </div>
                    {/* X-Axis Label */}
                    <div className="absolute bottom-[-30px] w-full text-center text-xs font-bold text-gray-500 tracking-widest">
                        PERFORMANCE
                    </div>

                    <div className="grid grid-cols-3 grid-rows-3 h-full gap-1">
                        {/* Row 1: High Potential */}
                        <div className="bg-yellow-100 hover:bg-yellow-200 transition-colors p-2 text-[10px] font-bold text-yellow-800 relative">
                            Rough Diamond
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">2</div>
                        </div>
                        <div className="bg-green-100 hover:bg-green-200 transition-colors p-2 text-[10px] font-bold text-green-800 relative">
                            Future Leader
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900 border-2 border-green-500">8</div>
                        </div>
                        <div className="bg-green-200 hover:bg-green-300 transition-colors p-2 text-[10px] font-bold text-green-900 relative">
                            Star Performer
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900 border-2 border-green-600">4</div>
                        </div>

                        {/* Row 2: Med Potential */}
                        <div className="bg-red-50 hover:bg-red-100 transition-colors p-2 text-[10px] font-bold text-red-800 relative">
                            Inconsistent
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">3</div>
                        </div>
                        <div className="bg-yellow-50 hover:bg-yellow-100 transition-colors p-2 text-[10px] font-bold text-yellow-800 relative">
                            Core Player
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">12</div>
                        </div>
                        <div className="bg-green-100 hover:bg-green-200 transition-colors p-2 text-[10px] font-bold text-green-800 relative">
                            High Performer
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">6</div>
                        </div>

                        {/* Row 3: Low Potential */}
                        <div className="bg-red-100 hover:bg-red-200 transition-colors p-2 text-[10px] font-bold text-red-800 relative">
                            Talent Risk
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900 border-2 border-red-500">1</div>
                        </div>
                        <div className="bg-red-50 hover:bg-red-100 transition-colors p-2 text-[10px] font-bold text-red-800 relative">
                            Effective
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">5</div>
                        </div>
                        <div className="bg-yellow-50 hover:bg-yellow-100 transition-colors p-2 text-[10px] font-bold text-yellow-800 relative">
                            Trusted Pro
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900">7</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm h-64 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-gray-500" />
                        Bell Curve Distribution
                    </h3>
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2 border-b border-gray-200">
                        {/* Bars for 1-5 Ratings */}
                        {[
                            { label: '1 - Poor', count: 2, h: '10%', color: 'bg-red-400' },
                            { label: '2 - Need Imp', count: 5, h: '25%', color: 'bg-orange-400' },
                            { label: '3 - Meets', count: 25, h: '80%', color: 'bg-yellow-400' },
                            { label: '4 - Exceeds', count: 12, h: '40%', color: 'bg-green-400' },
                            { label: '5 - Outstanding', count: 4, h: '15%', color: 'bg-green-600' },
                        ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{bar.count}</span>
                                <div className={`w-full rounded-t-lg ${bar.color} hover:opacity-80 transition-opacity`} style={{ height: bar.h }}></div>
                                <span className="text-[10px] font-bold text-muted-foreground text-center leading-tight">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm">Calibration Insight</h4>
                        <p className="text-blue-800 text-xs mt-1 leading-relaxed">
                            The current distribution is slightly skewed towards 'Meets Expectations' (52%), which is healthy.
                            However, we have 4 'Start Performers' who are also rated as 'High Potential' - consider them for imminent promotion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
