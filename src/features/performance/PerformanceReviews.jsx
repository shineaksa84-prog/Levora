import { useState } from 'react';
import {
    CheckCircle,
    Clock,
    AlertCircle,
    ChevronRight,
    User,
    Calendar,
    Star,
    FileText
} from 'lucide-react';

export default function PerformanceReviews() {
    const [reviews] = useState([
        {
            id: 1,
            employee: "Sarah Wilson",
            role: "Senior UX Designer",
            type: "Annual Review",
            period: "2024",
            status: "In Progress",
            dueDate: "2024-12-15",
            progress: 60,
            avatar: "SW"
        },
        {
            id: 2,
            employee: "Michael Chen",
            role: "Frontend Developer",
            type: "Probation Review",
            period: "Q4 2024",
            status: "Pending Manager",
            dueDate: "2024-12-10",
            progress: 80,
            avatar: "MC"
        },
        {
            id: 3,
            employee: "Emma Rodriguez",
            role: "Product Manager",
            type: "Quarterly Check-in",
            period: "Q3 2024",
            status: "Completed",
            dueDate: "2024-10-15",
            progress: 100,
            rating: 4.5,
            avatar: "ER"
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-500 bg-green-500/10';
            case 'In Progress': return 'text-blue-500 bg-blue-500/10';
            case 'Pending Manager': return 'text-amber-500 bg-amber-500/10';
            default: return 'text-slate-500 bg-slate-500/10';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-2xl font-bold">12</span>
                    </div>
                    <h3 className="text-muted-foreground font-medium">Pending Reviews</h3>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-muted-foreground font-medium">Overdue</h3>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <span className="text-2xl font-bold">45</span>
                    </div>
                    <h3 className="text-muted-foreground font-medium">Completed (YTD)</h3>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Active Reviews</h2>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Start New Review
                    </button>
                </div>

                <div className="divide-y divide-border">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4 hover:bg-muted/50 transition-colors group cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">{review.employee}</h3>
                                        <p className="text-sm text-muted-foreground">{review.role} • {review.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>Due {review.dueDate}</span>
                                    </div>

                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                                        {review.status}
                                    </div>

                                    {review.status === 'Completed' ? (
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-medium">{review.rating}</span>
                                        </div>
                                    ) : (
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-500"
                                                style={{ width: `${review.progress}%` }}
                                            />
                                        </div>
                                    )}

                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
