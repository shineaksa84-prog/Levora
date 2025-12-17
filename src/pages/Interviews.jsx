import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, MoreHorizontal, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function Interviews() {
    const [view, setView] = useState('list'); // 'list' or 'calendar'

    const upcomingInterviews = [
        {
            id: 1,
            candidate: "Sarah Wilson",
            role: "Senior Product Designer",
            type: "Technical Interview",
            date: "Today",
            time: "2:00 PM - 3:00 PM",
            interviewer: "Mike Johnson",
            status: "Confirmed",
            platform: "Zoom"
        },
        {
            id: 2,
            candidate: "James Chen",
            role: "Frontend Developer",
            type: "Initial Screen",
            date: "Tomorrow",
            time: "10:00 AM - 10:30 AM",
            interviewer: "Emily Davis",
            status: "Pending",
            platform: "Google Meet"
        },
        {
            id: 3,
            candidate: "Alex Thompson",
            role: "Product Manager",
            type: "Final Round",
            date: "Nov 15",
            time: "11:00 AM - 12:00 PM",
            interviewer: "Sarah Wilson",
            status: "Confirmed",
            platform: "In-person"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground mt-1">Manage and schedule candidate interviews.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-muted/50 p-1 rounded-lg flex">
                        <button
                            onClick={() => setView('list')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'calendar' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Calendar
                        </button>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Schedule Interview
                    </button>
                </div>
            </div>

            {view === 'list' ? (
                <div className="grid gap-4">
                    {upcomingInterviews.map((interview) => (
                        <div key={interview.id} className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary font-bold">
                                    <span className="text-xs uppercase">{interview.date.split(' ')[0]}</span>
                                    <span className="text-lg">{interview.date.includes(' ') ? interview.date.split(' ')[1] : new Date().getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{interview.role}</span>
                                        <span>•</span>
                                        <span>{interview.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex flex-col gap-1 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        {interview.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        {interview.platform === 'In-person' ? <MapPin className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                        {interview.platform}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium">Interviewer</p>
                                        <p className="text-sm text-muted-foreground">{interview.interviewer}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${interview.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                                        }`}>
                                        {interview.status}
                                    </span>
                                    <button className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="font-semibold text-lg">November 2025</h2>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-accent rounded-md"><ChevronLeft className="w-5 h-5" /></button>
                                <button className="p-1 hover:bg-accent rounded-md"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent">Today</button>
                            <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 border-b border-border bg-muted/30">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[120px]">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className={`p-2 border-b border-r border-border hover:bg-muted/10 transition-colors ${i < 3 || i > 32 ? 'bg-muted/20' : ''}`}>
                                <span className={`text-sm ${i === 15 ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center' : 'text-muted-foreground'}`}>
                                    {i < 3 ? 29 + i : i > 32 ? i - 32 : i - 2}
                                </span>
                                {i === 15 && (
                                    <div className="mt-2 p-1.5 bg-primary/10 border border-primary/20 rounded text-xs text-primary font-medium truncate">
                                        2:00 PM - Sarah W.
                                    </div>
                                )}
                                {i === 16 && (
                                    <div className="mt-2 p-1.5 bg-yellow-100 border border-yellow-200 rounded text-xs text-yellow-800 font-medium truncate">
                                        10:00 AM - James C.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
