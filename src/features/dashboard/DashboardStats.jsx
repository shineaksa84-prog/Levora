import { Users, Briefcase, UserCheck, Clock } from 'lucide-react';

const stats = [
    { name: 'Total Employees', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Open Positions', value: '42', change: '+4', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Active Candidates', value: '156', change: '+23%', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Avg Time to Hire', value: '18 Days', change: '-2 Days', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.name} className="p-6 bg-card rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <p className="text-xs font-medium text-green-600 mt-1">{stat.change} <span className="text-muted-foreground">from last month</span></p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}
