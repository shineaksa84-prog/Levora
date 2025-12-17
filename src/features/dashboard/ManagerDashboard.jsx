import React from 'react';
import { Users, CheckSquare, TrendingUp, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function ManagerDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
                <div className="flex gap-3">
                    <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                        Team Calendar
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Review Requests
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Team Members</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                            <p className="text-xs text-green-600 mt-1">All present today</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
                            <p className="text-xs text-gray-500 mt-1">3 Leave, 1 Expense</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <CheckSquare className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Interviews</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
                            <p className="text-xs text-gray-500 mt-1">Today</p>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Attendance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">Present</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">10</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">On Leave</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">Absent</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">1</span>
                        </div>
                    </div>
                </div>

                {/* Action Items */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Requires Attention</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Leave Request: Alex Johnson</p>
                                <p className="text-xs text-gray-500">Dec 24 - Dec 26 (Sick Leave)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Performance Review Overdue</p>
                                <p className="text-xs text-gray-500">Submit review for Sarah Smith by EOD.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
