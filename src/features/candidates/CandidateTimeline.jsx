import { Mail, Phone, Calendar, FileText, MessageSquare } from 'lucide-react';

const activities = [
    { id: 1, type: 'email', title: 'Email Sent', desc: 'Interview invitation sent to candidate.', date: 'Today, 10:30 AM', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, type: 'note', title: 'Note Added', desc: 'Candidate has strong React skills but limited Vue experience.', date: 'Yesterday, 2:15 PM', icon: FileText, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 3, type: 'call', title: 'Phone Screen', desc: 'Passed initial screening. Good communication skills.', date: 'Oct 24, 11:00 AM', icon: Phone, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 4, type: 'interview', title: 'Interview Scheduled', desc: 'Technical interview scheduled for Oct 28.', date: 'Oct 23, 4:00 PM', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-100' },
];

export default function CandidateTimeline() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Activity Timeline</h3>
            <div className="relative border-l border-border ml-3 space-y-8 pb-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="relative pl-8">
                        <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center ${activity.bg}`}>
                            <activity.icon className={`w-3 h-3 ${activity.color}`} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{activity.title}</p>
                                <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{activity.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Log an interaction..."
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                    Log
                </button>
            </div>
        </div>
    );
}
