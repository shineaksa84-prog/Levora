import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, ChevronRight, CheckCircle2 } from 'lucide-react';

const DEADLINES = [
    { id: 1, title: 'TDS Payment (Previous Month)', date: '2023-12-07', type: 'Payment', status: 'Pending', critical: true },
    { id: 2, title: 'PF & ESI Payment', date: '2023-12-15', type: 'Payment', status: 'Upcoming', critical: true },
    { id: 3, title: 'Q3 Returns Filing', date: '2023-12-31', type: 'Return', status: 'Upcoming', critical: false },
    { id: 4, title: 'Professional Tax (PT)', date: '2023-12-10', type: 'Payment', status: 'Paid', critical: false },
];

export default function StatutoryCalendar() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                    <Clock className="absolute right-4 top-4 w-24 h-24 opacity-10 rotate-12" />
                    <p className="font-medium text-red-100 mb-1 uppercase tracking-wider text-xs">Next Critical Deadline</p>
                    <h2 className="text-3xl font-black mb-2">Dec 07</h2>
                    <p className="font-bold text-lg">TDS Payment</p>
                    <p className="text-sm opacity-90 mt-4 bg-white/20 inline-block px-3 py-1 rounded-lg">2 Days Remaining</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-orange-500" /> Reminder Settings
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Email Alerts</span>
                            <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">SMS Notifications</span>
                            <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 border-t pt-2">Alerts sent to finance@company.com 3 days before due date.</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col shadow-sm">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-gray-500" />
                        Compliance Timeline (Dec 2023)
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                        {DEADLINES.map((item, i) => (
                            <div key={item.id} className="relative pl-8 group">
                                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${item.status === 'Paid' ? 'bg-green-500' :
                                        item.critical ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
                                    }`}></div>

                                <div className={`p-4 rounded-xl border transition-all hover:shadow-md ${item.critical && item.status !== 'Paid' ? 'bg-red-50/50 border-red-100' :
                                        item.status === 'Paid' ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200'
                                    }`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.date}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.type === 'Payment' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                                            }`}>{item.type}</span>
                                    </div>

                                    <h3 className={`font-bold text-lg ${item.status === 'Paid' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                        {item.title}
                                    </h3>

                                    <div className="mt-4 flex items-center justify-between">
                                        {item.status === 'Paid' ? (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                                <CheckCircle2 className="w-4 h-4" /> Completed
                                            </span>
                                        ) : (
                                            <span className={`text-xs font-bold ${item.critical ? 'text-red-600' : 'text-gray-500'}`}>
                                                Status: {item.status}
                                            </span>
                                        )}

                                        {item.status !== 'Paid' && (
                                            <button className="flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                                                Take Action <ChevronRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
