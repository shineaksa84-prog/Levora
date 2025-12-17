import { UserPlus, FileCheck, MessageSquare } from 'lucide-react';

const activities = [
    { id: 1, user: 'Sarah Smith', action: 'applied for', target: 'Senior React Developer', time: '2 hours ago', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, user: 'Mike Johnson', action: 'completed interview for', target: 'Product Manager', time: '4 hours ago', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 3, user: 'Emily Davis', action: 'accepted offer for', target: 'UX Designer', time: '1 day ago', icon: FileCheck, color: 'text-green-500', bg: 'bg-green-100' },
];

export default function RecentActivity() {
    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                            <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div>
                            <p className="text-sm">
                                <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
