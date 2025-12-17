import { useState } from 'react';
import { Building2, Plus, DollarSign, Users, Activity, MoreVertical, Globe } from 'lucide-react';

const MOCK_TENANTS = [
    { id: 1, name: 'Acme Corp', plan: 'Enterprise', status: 'Active', users: 142, revenue: 2400, region: 'India' },
    { id: 2, name: 'TechStart Inc', plan: 'Growth', status: 'Active', users: 45, revenue: 800, region: 'USA' },
    { id: 3, name: 'Global Logistics', plan: 'Enterprise', status: 'Payment Failed', users: 320, revenue: 4500, region: 'UAE' },
    { id: 4, name: 'Tiny Studio', plan: 'Starter', status: 'Trial', users: 8, revenue: 0, region: 'India' },
];

export default function SaaSConsole() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <Globe className="w-8 h-8 text-blue-400" />
                        SaaS Command Center
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Platform Overview for Super User (shineaksa84)</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25">
                    <Plus className="w-5 h-5" /> Onboard New Company
                </button>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total MRR</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">$7,700</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Companies</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">515</h3>
                        </div>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">System Health</p>
                            <h3 className="text-2xl font-bold text-green-600 mt-1">99.9%</h3>
                        </div>
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Activity className="w-5 h-5" /></div>
                    </div>
                </div>
            </div>

            {/* Tenant List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Client Companies</h2>
                    <input type="text" placeholder="Search tenants..." className="bg-white border text-sm px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Company Name</th>
                            <th className="px-6 py-4">Plan Tier</th>
                            <th className="px-6 py-4">Region</th>
                            <th className="px-6 py-4">Users</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_TENANTS.map(tenant => (
                            <tr key={tenant.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                            {tenant.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{tenant.name}</p>
                                            <p className="text-xs text-gray-500">ID: #{tenant.id + 1000}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">{tenant.plan}</td>
                                <td className="px-6 py-4 text-gray-500">{tenant.region}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono">{tenant.users}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            tenant.status === 'Trial' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {tenant.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
