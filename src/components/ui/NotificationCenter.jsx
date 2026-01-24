import { useState } from 'react';
import { Bell, Check, X, MessageSquare, Briefcase, Calendar } from 'lucide-react';

const NOTIFICATIONS = [
    { id: 1, type: 'approval', title: 'Leave Request Approved', message: 'Your leave for Dec 24 was approved.', time: '2m ago', read: false },
    { id: 2, type: 'alert', title: 'Ticket Updated', message: 'HR responded to Ticket #10293', time: '1h ago', read: false },
    { id: 3, type: 'event', title: 'Team Meeting', message: 'Starting in 15 minutes', time: '15m ago', read: true },
];

export default function NotificationCenter({ onClose }) {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    return (
        <div className="absolute right-0 top-12 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                        No new notifications
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {notifications.map(notif => (
                            <div key={notif.id} className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-primary' : 'bg-transparent'}`} />
                                <div>
                                    <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                        {notif.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                                    <span className="text-[10px] text-muted-foreground mt-2 block">{notif.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 border-t bg-gray-50 rounded-b-xl text-center">
                <button className="text-xs font-bold text-primary hover:underline">
                    Mark all as read
                </button>
            </div>
        </div>
    );
}
