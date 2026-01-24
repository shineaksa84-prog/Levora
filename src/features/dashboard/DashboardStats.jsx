import { Users, Briefcase, UserCheck, Clock } from 'lucide-react';
import useStore from '../../store/useStore';

const ICON_MAP = {
    'Human Capital Base': Users,
    'Strategic Openings': Briefcase,
    'Active Candidates': UserCheck,
    'Acquisition Velocity': Clock
};

export default function DashboardStats() {
    const metrics = useStore((state) => state.metrics);

    const stats = [
        { name: 'Human Capital Base', value: metrics.humanCapitalBase.toLocaleString(), change: '+2%', color: 'text-primary', bg: 'bg-primary/10' },
        { name: 'Active Candidates', value: metrics.activeCandidates.toLocaleString(), change: '+15%', color: 'text-accent', bg: 'bg-accent/10' },
        { name: 'Strategic Openings', value: metrics.strategicOpenings.toLocaleString(), change: 'Stable', color: 'text-secondary', bg: 'bg-secondary/10' },
        { name: 'Acquisition Velocity', value: metrics.acquisitionVelocity, change: '-1 Day', color: 'text-violet', bg: 'bg-violet/10' },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = ICON_MAP[stat.name] || Users;
                return (
                    <div key={stat.name} className="p-6 bg-card rounded-xl border border-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            <p className="text-xs font-medium text-green-600 mt-1">{stat.change} <span className="text-muted-foreground">from last month</span></p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
