import { useState } from 'react';
import { Users, Shield, Edit2, UserPlus, CheckCircle, XCircle } from 'lucide-react';

const MOCK_USERS = [
    { id: 1, name: 'Alice Admin', email: 'alice@company.com', role: 'SUPER_ADMIN', status: 'Active', last_login: 'Now' },
    { id: 2, name: 'Bob Recruiter', email: 'bob@company.com', role: 'RECRUITER', status: 'Active', last_login: '2 hrs ago' },
    { id: 3, name: 'Charlie Payroll', email: 'charlie@company.com', role: 'PAYROLL_ADMIN', status: 'Active', last_login: '1 day ago' },
    { id: 4, name: 'Dave Manager', email: 'dave@company.com', role: 'HIRING_MANAGER', status: 'Active', last_login: '5 hrs ago' },
    { id: 5, name: 'Eve Employee', email: 'eve@company.com', role: 'EMPLOYEE', status: 'Inactive', last_login: 'Never' },
];

const ROLES = [
    'SUPER_ADMIN', 'RECRUITER', 'PAYROLL_ADMIN', 'HIRING_MANAGER', 'EMPLOYEE', 'INTERVIEWER'
];

export default function UserRoleManager() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-6 h-6 text-indigo-600" />
                        User & Role Management
                    </h2>
                    <p className="text-sm text-gray-500">Manage system access and permissions.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-sm"
                >
                    <UserPlus className="w-4 h-4" /> Add New User
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Current Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last Active</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative inline-block">
                                            <select
                                                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 pl-3 pr-8 rounded font-medium text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                                                defaultValue={user.role}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium text-xs">
                                        {user.last_login}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-blue-900">Security Note</h4>
                    <p className="text-xs text-blue-700 mt-1">
                        Changing a user's role will immediately revoke their access to current sessions.
                        Users assigned 'SUPER_ADMIN' have unrestricted access to all modules including Payroll and Audit Logs.
                    </p>
                </div>
            </div>
        </div>
    );
}
