import { useState } from 'react';
import { Calendar, MapPin, Clock, TrendingUp, Settings } from 'lucide-react';
import ShiftRosterManager from '../features/attendance/ShiftRosterManager';
import AutoShiftDetector from '../features/attendance/AutoShiftDetector';
import GeoFenceAttendance from '../features/attendance/GeoFenceAttendance';
import WFHTracker from '../features/attendance/WFHTracker';
import LeavePlanner from '../features/attendance/LeavePlanner';
import LeaveForecaster from '../features/attendance/LeaveForecaster';
import AttendanceHeatmap from '../features/attendance/AttendanceHeatmap';
import MissingPunchFixer from '../features/attendance/MissingPunchFixer';
import HolidayCalendarManager from '../features/attendance/HolidayCalendarManager';
import HolidayCalendar from '../features/attendance/HolidayCalendar';
import AttendanceRules from '../features/attendance/AttendanceRules';

export default function Attendance() {
    const [activeTab, setActiveTab] = useState('shifts');

    const tabs = [
        { id: 'shifts', label: 'Shift Management', icon: Clock },
        { id: 'geo', label: 'Geo & Remote', icon: MapPin },
        { id: 'leave', label: 'Leave Planning', icon: Calendar },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'tools', label: 'Tools', icon: Settings }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Executive Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
                        Workforce <span className="text-primary italic">Orchestration</span>
                    </h1>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">
                        Attendance Matrix // Leave Protocol v4.0
                    </p>
                </div>
            </div>

            {/* Navigation Tabs - Neural Tabs */}
            <div className="flex gap-2 bg-card p-1.5 rounded-[1.5rem] border border-border w-fit shadow-xl overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${isActive
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Horizon */}
            <div className="min-h-[600px] relative">
                <div className="animate-in slide-in-from-bottom-5 duration-500">
                    {activeTab === 'shifts' && (
                        <div className="space-y-10">
                            <ShiftRosterManager />
                            <AutoShiftDetector />
                        </div>
                    )}
                    {activeTab === 'geo' && (
                        <div className="space-y-10">
                            <GeoFenceAttendance />
                            <WFHTracker />
                        </div>
                    )}
                    {activeTab === 'leave' && (
                        <div className="space-y-10">
                            <LeavePlanner />
                            <LeaveForecaster />
                        </div>
                    )}
                    {activeTab === 'analytics' && <AttendanceHeatmap />}
                    {activeTab === 'tools' && (
                        <div className="space-y-10">
                            <AttendanceRules />
                            <MissingPunchFixer />
                            <HolidayCalendarManager />
                            <HolidayCalendar />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
