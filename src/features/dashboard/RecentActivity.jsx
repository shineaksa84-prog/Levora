import { UserPlus, FileCheck, MessageSquare } from 'lucide-react';
import useStore from '../../store/useStore';

const ICON_MAP = {
    'UserPlus': UserPlus,
    'MessageSquare': MessageSquare,
    'FileCheck': FileCheck
};

export default function RecentActivity() {
    const activities = useStore((state) => state.recentActivities);

    if (activities.length === 0) return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6 uppercase tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground italic">No recent neural transmissions...</p>
        </div>
    );


    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6 uppercase tracking-tight">Recent Activity</h3>
            <div className="space-y-6">
                {activities.map((activity) => {
                    const Icon = ICON_MAP[activity.icon] || UserPlus;
                    return (
                        <div key={activity.id} className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                                <Icon className={`w-5 h-5 ${activity.color}`} />
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
