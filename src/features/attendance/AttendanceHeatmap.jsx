import { useState } from 'react';
import { TrendingDown, Users, Calendar } from 'lucide-react';
import { Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const ATTENDANCE_DATA = [
    { day: 'Mon', late: 12, absent: 2, present: 128, total: 142 },
    { day: 'Tue', late: 5, absent: 1, present: 136, total: 142 },
    { day: 'Wed', late: 3, absent: 4, present: 135, total: 142 },
    { day: 'Thu', late: 8, absent: 2, present: 132, total: 142 },
    { day: 'Fri', late: 18, absent: 8, present: 116, total: 142 },
];

export default function AttendanceHeatmap() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        Attendance Heatmap & Analytics
                    </h2>
                    <p className="text-sm text-gray-500">Spot patterns in absenteeism and punctuality.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-6">Weekly Trends (Late vs Absent)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ATTENDANCE_DATA}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="late" stackId="a" fill="#fbbf24" radius={[0, 0, 4, 4]} name="Late Marks" />
                                <Bar dataKey="absent" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absentees" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                        <h3 className="text-red-900 font-bold mb-1">High Risk Day</h3>
                        <p className="text-2xl font-bold text-red-600">Friday</p>
                        <p className="text-xs text-red-800 mt-2">
                            18% Late Mark rate. Highest absenteeism observed. Consider "Fun Friday" initiative to boost morale.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Team Compliance</h3>
                        <div className="space-y-3">
                            {['Engineering', 'Sales', 'Support'].map(team => (
                                <div key={team} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{team}</span>
                                    <span className="font-bold text-green-600">92%</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Marketing</span>
                                <span className="font-bold text-orange-500">84%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
