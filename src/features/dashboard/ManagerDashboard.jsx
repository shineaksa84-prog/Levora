import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckSquare, Calendar, Clock, AlertCircle, Briefcase } from 'lucide-react';

export default function ManagerDashboard() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Team Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        Manager <span className="text-primary italic">Command</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Orchestrate team performance, approve requests, and monitor operational cadence.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/app/attendance')}
                        className="bg-white text-muted-foreground border border-border/50 px-6 py-4 rounded-xl text-xs font-black shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                    >
                        <Calendar className="w-4 h-4" /> Team Calendar
                    </button>
                    <button
                        onClick={() => navigate('/app/approvals')}
                        className="bg-primary text-white px-6 py-4 rounded-xl text-xs font-black shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <CheckSquare className="w-4 h-4" /> Review Requests
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
