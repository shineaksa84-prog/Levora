import { useState } from 'react';
import { Calendar, MapPin, Sun, Umbrella, PartyPopper } from 'lucide-react';

const HOLIDAYS = [
    { date: '2023-01-26', name: 'Republic Day', type: 'National', passed: true },
    { date: '2023-03-08', name: 'Holi', type: 'Festival', passed: true },
    { date: '2023-08-15', name: 'Independence Day', type: 'National', passed: true },
    { date: '2023-10-02', name: 'Gandhi Jayanti', type: 'National', passed: true },
    { date: '2023-11-12', name: 'Diwali', type: 'Festival', passed: true },
    { date: '2023-12-25', name: 'Christmas', type: 'Festival', passed: false },
    { date: '2024-01-01', name: 'New Year', type: 'Optional', passed: false },
];

export default function HolidayCalendar() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Holiday Calendar 2023-24
                    </h2>

                    <div className="space-y-4">
                        {HOLIDAYS.filter(h => !h.passed).map((holiday, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border border-green-100 shadow-sm relative overflow-hidden">
                                <div className="absolute right-0 top-0 h-full w-2 bg-green-500"></div>
                                <div className="bg-white p-3 rounded-lg shadow-sm border border-green-200 text-center min-w-[70px]">
                                    <span className="block text-xs font-bold text-green-600 uppercase">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-2xl font-bold text-gray-900">{new Date(holiday.date).getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{holiday.name}</h3>
                                    <p className="text-sm text-gray-600">{new Date(holiday.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric' })}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-xs font-bold px-3 py-1 bg-white border border-green-200 rounded-full text-green-700">
                                        Upcoming
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm opacity-80">
                    <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase tracking-wider">Passsed Holidays</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {HOLIDAYS.filter(h => h.passed).map((holiday, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 text-gray-500 grayscale">
                                <div className="text-center min-w-[50px]">
                                    <span className="block text-[10px] font-bold uppercase">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-lg font-bold">{new Date(holiday.date).getDate()}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{holiday.name}</p>
                                    <p className="text-xs">{holiday.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white text-center shadow-lg">
                    <Sun className="w-12 h-12 mx-auto mb-3 opacity-90 animate-spin-slow" />
                    <h3 className="font-bold text-lg">Leave Balance</h3>
                    <div className="flex justify-center gap-8 mt-4">
                        <div>
                            <p className="text-3xl font-black">12</p>
                            <p className="text-xs opacity-80">Privilege</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">5</p>
                            <p className="text-xs opacity-80">Sick</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">2</p>
                            <p className="text-xs opacity-80">Optional</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-sm font-bold py-2 rounded-lg transition-colors">
                        Apply Leave
                    </button>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-sm text-gray-900 mb-4">Location</h3>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" /> Policy Location
                        </span>
                        <span className="font-bold text-gray-900">Bangalore, KA</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Holidays are shown based on your base location. Contact HR to change region.
                    </p>
                </div>
            </div>
        </div>
    );
}
