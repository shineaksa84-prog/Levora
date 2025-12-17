import { useState } from 'react';
import {
    MessageCircle,
    Calendar,
    Clock,
    CheckCircle,
    ChevronRight,
    User
} from 'lucide-react';

export default function ExitInterviews() {
    const [interviews] = useState([
        {
            id: 1,
            employee: "David Kim",
            interviewer: "Sarah Wilson",
            date: "2024-12-20",
            time: "14:00",
            status: "Scheduled",
            avatar: "DK"
        },
        {
            id: 2,
            employee: "Lisa Wang",
            interviewer: "John Doe",
            date: "2024-12-10",
            time: "10:00",
            status: "Completed",
            avatar: "LW"
        }
    ]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Interviews */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Exit Interviews</h2>
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                                Schedule Interview
                            </button>
                        </div>

                        <div className="divide-y divide-border">
                            {interviews.map((interview) => (
                                <div key={interview.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                            {interview.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground">{interview.employee}</h3>
                                            <p className="text-sm text-muted-foreground">Interviewer: {interview.interviewer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>{interview.date}</span>
                                            <Clock className="w-4 h-4 ml-2" />
                                            <span>{interview.time}</span>
                                        </div>

                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${interview.status === 'Completed'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {interview.status}
                                        </span>

                                        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback Summary */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold mb-4">Common Reasons for Leaving</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Better Opportunity</span>
                                <span className="font-medium">45%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[45%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Relocation</span>
                                <span className="font-medium">20%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[20%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Career Change</span>
                                <span className="font-medium">15%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[15%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
