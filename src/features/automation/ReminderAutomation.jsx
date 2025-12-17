import { useState } from 'react';
import { Bell, Clock, Calendar, Mail, MessageSquare, Plus, Trash2 } from 'lucide-react';

export default function ReminderAutomation() {
    const [reminders, setReminders] = useState([
        { id: 1, type: 'email', timing: '24h before', trigger: 'Interview Scheduled', message: 'Reminder: Interview tomorrow at {time}.' },
        { id: 2, type: 'sms', timing: '1h before', trigger: 'Interview Scheduled', message: 'Hi {name}, your interview is in 1 hour!' },
        { id: 3, type: 'email', timing: '2 days after', trigger: 'Offer Sent', message: 'Hi {name}, checking if you have questions about the offer.' },
    ]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Automated Reminders</h2>
                    <p className="text-muted-foreground">Configure automated follow-ups and notifications.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> Add Reminder
                </button>
            </div>

            <div className="relative border-l-2 border-border ml-6 space-y-8 pb-12">
                {reminders.map((reminder, idx) => (
                    <div key={reminder.id} className="relative pl-8">
                        {/* Timeline node */}
                        <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-background ${reminder.trigger.includes('Interview') ? 'bg-blue-500' : 'bg-green-500'
                            }`} />

                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${reminder.type === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                        {reminder.type === 'email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold flex items-center gap-2">
                                            {reminder.timing}
                                            <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                                                Trigger: {reminder.trigger}
                                            </span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground capitalize">{reminder.type} Notification</p>
                                    </div>
                                </div>
                                <button className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-md border border-border">
                                <p className="text-sm font-mono text-muted-foreground">"{reminder.message}"</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Step Placeholder */}
                <div className="relative pl-8 pt-4">
                    <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-muted border-2 border-background" />
                    <button className="w-full border-2 border-dashed border-border rounded-xl p-6 text-muted-foreground hover:border-primary/50 hover:bg-muted/20 transition-all flex flex-col items-center justify-center gap-2">
                        <Clock className="w-6 h-6" />
                        <span className="font-medium">Add Timeline Step</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
