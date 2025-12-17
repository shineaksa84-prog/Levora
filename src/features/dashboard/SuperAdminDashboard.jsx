import { Building, Users, DollarSign, Activity } from 'lucide-react';

export default function SuperAdminDashboard() {
    const stats = [
        { label: 'Total Companies', value: '124', change: '+12%', icon: Building },
        { label: 'Total Users', value: '45.2k', change: '+8%', icon: Users },
        { label: 'Monthly Revenue', value: '$84.5k', change: '+24%', icon: DollarSign },
        { label: 'System Health', value: '99.9%', change: 'Stable', icon: Activity },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Platform overview and tenant management.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-6 bg-card rounded-xl border border-border shadow-sm">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </p>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-baseline space-x-3">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs text-green-500 font-medium">
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Recent Registrations</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium">Tech Corp {i}</p>
                                    <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">System Alerts</h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                            High server load detected in US-East region.
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                            Scheduled maintenance in 2 days.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
