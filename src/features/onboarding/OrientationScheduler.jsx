import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOnboardingEvents, scheduleEvent } from '../../lib/services/onboardingService';

export default function OrientationScheduler() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const data = await getOnboardingEvents();
        // Convert ISO strings back to Date objects
        const parsedEvents = data.map(e => ({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end)
        }));
        setEvents(parsedEvents);
        setLoading(false);
    };

    const handleSchedule = async () => {
        // Mock event creation
        const newEvent = {
            title: 'New Hire Welcome Lunch',
            start: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
            end: new Date(new Date().setHours(13, 30, 0, 0)).toISOString(),
            type: 'social',
            location: 'Cafeteria'
        };
        try {
            const created = await scheduleEvent(newEvent);
            setEvents(prev => [...prev, { ...created, start: new Date(created.start), end: new Date(created.end) }]);
        } catch (error) {
            console.error('Scheduling failed', error);
        }
    };

    // Helper to get days in current month view
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(viewDate);

    if (loading) return <div>Loading calendar...</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
            {/* Calendar View */}
            <div className="flex-1 bg-card border border-border rounded-xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Orientation Calendar
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                            className="p-1 hover:bg-muted rounded text-muted-foreground"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-bold w-32 text-center">
                            {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                            className="p-1 hover:bg-muted rounded text-muted-foreground"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-muted/20 border border-border rounded-lg overflow-hidden flex-1">
                    {/* Days Header */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-muted/50 p-2 text-center text-xs font-bold text-muted-foreground">
                            {day}
                        </div>
                    ))}

                    {/* Blank Days */}
                    {[...Array(firstDay)].map((_, i) => (
                        <div key={`blank-${i}`} className="bg-card p-2" />
                    ))}

                    {/* Calendar Days */}
                    {[...Array(days)].map((_, i) => {
                        const day = i + 1;
                        const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                        const dayEvents = events.filter(e =>
                            e.start.getDate() === day &&
                            e.start.getMonth() === viewDate.getMonth() &&
                            e.start.getFullYear() === viewDate.getFullYear()
                        );
                        const isToday = new Date().toDateString() === date.toDateString();

                        return (
                            <div key={day} className={`bg-card p-2 min-h-[80px] hover:bg-muted/10 transition-colors border-t border-r border-border/10 relative ${isToday ? 'bg-primary/5' : ''}`}>
                                <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {day}
                                </span>
                                <div className="space-y-1 mt-1">
                                    {dayEvents.map(event => (
                                        <div
                                            key={event.id}
                                            className={`text-[9px] px-1.5 py-0.5 rounded truncate font-medium ${event.type === 'mandatory'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                }`}
                                            title={event.title}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="w-full lg:w-80 bg-card border border-border rounded-xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Upcoming</h3>
                    <button
                        onClick={handleSchedule}
                        className="p-2 bg-primary text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                    {events
                        .sort((a, b) => a.start - b.start)
                        .filter(e => e.start >= new Date())
                        .map(event => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-xl border border-border bg-muted/10 space-y-3"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-bold text-sm">{event.title}</h4>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${event.type === 'mandatory' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </div>
                                    <div className="bg-background border border-border rounded-lg p-2 text-center min-w-[3rem]">
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold">{event.start.toLocaleString('default', { month: 'short' })}</div>
                                        <div className="text-lg font-black leading-none">{event.start.getDate()}</div>
                                    </div>
                                </div>

                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            {event.location}
                                        </div>
                                    )}
                                </div>

                                <button className="w-full py-1.5 text-xs font-medium border border-border rounded hover:bg-background transition-colors">
                                    View Details
                                </button>
                            </motion.div>
                        ))}

                    {events.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            No upcoming events
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
