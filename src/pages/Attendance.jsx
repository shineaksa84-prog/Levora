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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Attendance & Leave</h1>
                    <p className="text-muted-foreground mt-1">Manage shifts, attendance tracking, and leave planning</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-card border border-border rounded-xl p-2 flex gap-2 overflow-x-auto">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'gradient-primary text-white shadow-lg'
                                : 'text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'shifts' && (
                    <div className="space-y-6">
                        <ShiftRosterManager />
                        <AutoShiftDetector />
                    </div>
                )}
                {activeTab === 'geo' && (
                    <div className="space-y-6">
                        <GeoFenceAttendance />
                        <WFHTracker />
                    </div>
                )}
                {activeTab === 'leave' && (
                    <div className="space-y-6">
                        <LeavePlanner />
                        <LeaveForecaster />
                    </div>
                )}
                {activeTab === 'analytics' && <AttendanceHeatmap />}
                {activeTab === 'tools' && (
                    <div className="space-y-6">
                        <MissingPunchFixer />
                        <HolidayCalendarManager />
                    </div>
                )}
            </div>
        </div>
    );
}
