import { useState } from 'react';
import { UserPlus, Users, Search, ShieldAlert, Check } from 'lucide-react';

const MOCK_COMPANY_USERS = [
    { id: 'EMP001', name: 'John Doe', dept: 'Engineering', role: 'EMPLOYEE', status: 'Active' },
    { id: 'EMP002', name: 'Jane Smith', dept: 'HR', role: 'RECRUITER', status: 'Active' },
    { id: 'EMP003', name: 'Mike Ross', dept: 'Legal', role: 'NONE', status: 'Pending Setup' }, // Orphan
];

export default function TenantUserManager() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User & Access Management (Tier 3)</h1>
                    <p className="text-sm text-gray-500">Internal User Directory for Acme Corp.</p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black shadow-sm">
                    <UserPlus className="w-4 h-4" /> Create Employee ID
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-100 flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search by Name or ID..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-100 outline-none" />
                        </div>
                        <select className="border rounded-lg text-sm px-3 py-2 bg-gray-50 font-medium text-gray-600">
                            <option>All Departments</option>
                            <option>Engineering</option>
                            <option>HR</option>
                            <option>Sales</option>
                        </select>
                    </div>

                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_COMPANY_USERS.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.dept}</td>
                                        <td className="px-6 py-4">
                                            {user.role === 'NONE' ? (
                                                <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                                                    <ShieldAlert className="w-3 h-3" /> No Role
                                                </span>
                                            ) : (
                                                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                                    {user.role}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline font-medium text-xs">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
                        <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5" /> Orphan Accounts (1)
                        </h3>
                        <p className="text-xs text-orange-800 mb-4 leading-relaxed">
                            Users who have logged in but have no functional role assigned cannot access any features.
                        </p>
                        <div className="bg-white rounded-lg p-3 border border-orange-200 text-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-900">Mike Ross</span>
                                <span className="text-xs text-gray-500">Legal</span>
                            </div>
                            <button className="w-full py-1.5 bg-orange-100 text-orange-800 text-xs font-bold rounded hover:bg-orange-200 transition-colors">
                                Assign Role
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Total Licenses</span>
                                <span className="font-bold">150</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Used Licenses</span>
                                <span className="font-bold">143</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[95%]"></div>
                            </div>
                            <p className="text-xs text-right text-gray-400">95% Utilization</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
