import { useState } from 'react';
import { Calendar as CalendarIcon, Sun, Umbrella, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = Array.from({ length: 35 }, (_, i) => {
    const d = i - 2; // Offset to start month
    return d > 0 && d <= 31 ? d : null;
});

const HOLIDAYS = [25];
const WEEKENDS = [2, 3, 9, 10, 16, 17, 23, 24, 30, 31];
const MY_LEAVES = [14, 15]; // Applied

export default function LeavePlanner() {
    return (
        <div className="h-[calc(100vh-200px)] flex gap-6">
            <div className="flex-1 bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Umbrella className="w-6 h-6 text-orange-500" />
                            December 2023
                        </h2>
                        <div className="flex gap-1">
                            <button className="p-1 rounded hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-1 rounded hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90">
                        <Plus className="w-4 h-4" /> Apply Leave
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-px flex-1 border border-gray-200 bg-gray-200 rounded-lg overflow-hidden">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="bg-gray-50 p-2 text-center text-xs font-bold uppercase text-gray-500">
                            {d}
                        </div>
                    ))}

                    {DAYS.map((day, i) => {
                        const isWeekend = WEEKENDS.includes(day);
                        const isHoliday = HOLIDAYS.includes(day);
                        const isLeave = MY_LEAVES.includes(day);

                        return (
                            <div key={i} className={`bg-white p-3 min-h-[80px] hover:bg-gray-50 transition-colors relative group ${!day && 'bg-gray-50/50'}`}>
                                {day && (
                                    <>
                                        <span className={`text-sm ${isWeekend ? 'text-red-400 font-bold' : 'text-gray-700'}`}>{day}</span>

                                        {isHoliday && (
                                            <div className="mt-2 text-[10px] font-bold bg-purple-100 text-purple-700 p-1 rounded truncate">
                                                Christmas
                                            </div>
                                        )}
                                        {isLeave && (
                                            <div className="mt-2 text-[10px] font-bold bg-orange-100 text-orange-700 p-1 rounded">
                                                Planned Leave
                                            </div>
                                        )}
                                        {!isHoliday && !isWeekend && !isLeave && (
                                            <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center bg-gray-900/5 text-xs font-bold text-gray-600">
                                                <Plus className="w-4 h-4" /> Plan
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-80 space-y-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-300" /> Long Weekend Alert
                    </h3>
                    <div className="bg-white/10 rounded-lg p-3 text-sm">
                        <p className="font-bold">Dec 23 - Dec 25</p>
                        <p className="opacity-80 text-xs">Sat, Sun, Mon (Christmas)</p>
                        <p className="bg-white/20 text-xs inline-block px-2 py-0.5 rounded mt-2 font-bold">3 Days Off</p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm">Legend</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
                            <span>My Leaves</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
                            <span>Public Holidays</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                            <span>Working Day</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
