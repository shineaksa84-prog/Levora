import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

const lifecycleSteps = [
    { id: 1, title: 'Hired', date: 'Jan 15, 2023', status: 'completed', description: 'Offer accepted and contract signed.' },
    { id: 2, title: 'Onboarding', date: 'Jan 16 - Jan 30', status: 'completed', description: 'Completed orientation and IT setup.' },
    { id: 3, title: 'Probation', date: 'Jan 16 - Apr 16', status: 'completed', description: 'Passed 90-day probation review.' },
    { id: 4, title: 'First Review', date: 'Jul 2023', status: 'completed', description: 'Performance rating: Exceeds Expectations.' },
    { id: 5, title: 'Promotion', date: 'Jan 2024', status: 'current', description: 'Promoted to Senior Engineer.' },
    { id: 6, title: 'Leadership Training', date: 'Q3 2024', status: 'upcoming', description: 'Scheduled for management track.' },
    { id: 7, title: 'Retirement', date: 'Future', status: 'upcoming', description: 'Long-term career planning.' },
];

export default function LifecycleDashboard() {
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Employee Lifecycle</h3>
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-border"></div>

                <div className="space-y-8">
                    {lifecycleSteps.map((step) => (
                        <div key={step.id} className="relative flex gap-6 group">
                            {/* Icon */}
                            <div className={`relative z-10 w-16 h-16 rounded-full border-4 border-background flex items-center justify-center shrink-0 transition-colors ${step.status === 'completed' ? 'bg-green-100 text-green-600' :
                                    step.status === 'current' ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                                        'bg-muted text-muted-foreground'
                                }`}>
                                {step.status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> :
                                    step.status === 'current' ? <Clock className="w-8 h-8" /> :
                                        <Circle className="w-8 h-8" />}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 p-4 rounded-lg border transition-all ${step.status === 'current' ? 'bg-accent/50 border-primary/50 shadow-sm' : 'bg-card border-border hover:border-primary/30'
                                }`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={`font-semibold text-lg ${step.status === 'current' ? 'text-primary' : ''}`}>
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                                    </div>
                                    {step.status === 'current' && (
                                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                            Current Stage
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                                {step.status === 'current' && (
                                    <button className="mt-4 text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
