import { useState } from 'react';
import { Building, Users, MoreVertical, Plus, Check, Search, ShieldOff } from 'lucide-react';

export default function TenantManagement() {
    const [searchTerm, setSearchTerm] = useState('');

    const tenants = [
        { id: 1, name: 'Tech Solutions Inc', domain: 'techsolutions.com', plan: 'Enterprise', users: 145, status: 'Active', joined: 'Oct 2024' },
        { id: 2, name: 'Global Logistics', domain: 'globallogistics.io', plan: 'Pro', users: 42, status: 'Active', joined: 'Nov 2024' },
        { id: 3, name: 'Startup Hub', domain: 'startuphub.co', plan: 'Starter', users: 8, status: 'Trial', joined: 'Dec 2024' },
        { id: 4, name: 'Legacy Corp', domain: 'legacycorp.net', plan: 'Pro', users: 89, status: 'Suspended', joined: 'Jan 2024' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tenant Management</h1>
                    <p className="text-muted-foreground mt-1">Manage client companies and their subscriptions.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Company
                </button>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="pl-9 pr-4 py-2 w-full rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Suspended</option>
                    </select>
                    <select className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Plan: All</option>
                        <option>Enterprise</option>
                        <option>Pro</option>
                        <option>Starter</option>
                    </select>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border text-left">
                            <th className="p-4 font-medium text-muted-foreground">Company</th>
                            <th className="p-4 font-medium text-muted-foreground">Plan</th>
                            <th className="p-4 font-medium text-muted-foreground">Users</th>
                            <th className="p-4 font-medium text-muted-foreground">Status</th>
                            <th className="p-4 font-medium text-muted-foreground">Joined</th>
                            <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Building className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{tenant.name}</p>
                                            <p className="text-xs text-muted-foreground">{tenant.domain}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium border border-border">
                                        {tenant.plan}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <Users className="w-4 h-4" />
                                        <span>{tenant.users}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            tenant.status === 'Trial' ? 'bg-blue-100 text-blue-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {tenant.status === 'Active' ? <Check className="w-3 h-3 mr-1" /> :
                                            tenant.status === 'Suspended' ? <ShieldOff className="w-3 h-3 mr-1" /> : null}
                                        {tenant.status}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground">
                                    {tenant.joined}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
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
