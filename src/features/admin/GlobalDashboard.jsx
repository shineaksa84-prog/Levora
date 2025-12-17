import { useState } from 'react';
import {
    Users, Briefcase, DollarSign, TrendingUp,
    Activity, AlertTriangle, CheckCircle, Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock Data
const SYSTEM_HEALTH = [
    { module: 'Recruitment', status: 'Healthy', active_users: 12, alerts: 2 },
    { module: 'Payroll', status: 'Attention', active_users: 3, alerts: 1 },
    { module: 'HR Ops', status: 'Healthy', active_users: 5, alerts: 0 },
    { module: 'Performance', status: 'Healthy', active_users: 48, alerts: 5 },
];

const PAYROLL_TREND = [
    { month: 'Aug', cost: 1.2 },
    { month: 'Sep', cost: 1.25 },
    { month: 'Oct', cost: 1.3 },
    { month: 'Nov', cost: 1.42 },
];

const RECRUITMENT_FUNNEL = [
    { stage: 'Applied', count: 145 },
    { stage: 'Screened', count: 89 },
    { stage: 'Interview', count: 34 },
    { stage: 'Offer', count: 12 },
    { stage: 'Hired', count: 8 },
];

export default function GlobalDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Company Administration (Tier 2)</h1>
                    <p className="text-sm text-gray-500">Overview for Acme Corp (Tenant ID: #1001)</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <Activity className="w-3 h-3" /> System Operational
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Audit Logging Active
                    </span>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Workforce</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">142</h3>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-indigo-600 mt-2 font-medium">+4 this month</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Open Positions</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">18</h3>
                        </div>
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-pink-600 mt-2 font-medium">3 Critical Priority</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Payroll Run (Nov)</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">₹1.42 Cr</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-medium">processed on Dec 01</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Avg. Engagement</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">8.2/10</h3>
                        </div>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 font-medium">Top 10% in industry</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Module Health */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Module Health Status</h2>
                    <div className="space-y-4">
                        {SYSTEM_HEALTH.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.status === 'Healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{item.module}</p>
                                        <p className="text-xs text-gray-500">{item.active_users} Active Users</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {item.alerts > 0 && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">
                                            <AlertTriangle className="w-3 h-3" /> {item.alerts} Alerts
                                        </span>
                                    )}
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recruitment Funnel Preview */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Hiring Pipeline Overview</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={RECRUITMENT_FUNNEL} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" width={80} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={25} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
