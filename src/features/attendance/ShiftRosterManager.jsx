import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Save, AlertTriangle, Loader2 } from 'lucide-react';
import { SHIFTS, getWeeklyRoster, saveRoster } from '../../lib/services/attendanceService';
import { getEmployees } from '../../lib/services/employeeService';
import { toast } from '../../lib/services/toastService';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ShiftRosterManager() {
    // State
    const [schedule, setSchedule] = useState({});
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedShift, setSelectedShift] = useState('GS');
    const [currentWeekStart, setCurrentWeekStart] = useState('2025-12-09'); // Demo fixed date 

    useEffect(() => {
        fetchData();
    }, [currentWeekStart]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch employees and roster in parallel
            const [empData, rosterData] = await Promise.all([
                getEmployees(),
                getWeeklyRoster(currentWeekStart)
            ]);

            // If employees are empty (service handles seeding usually, but just in case)
            setEmployees(empData);

            // If roster is empty/partial, ensure every employee has an entry in local state
            const fullSchedule = { ...rosterData };
            empData.forEach(emp => {
                if (!fullSchedule[emp.id]) {
                    fullSchedule[emp.id] = ['GS', 'GS', 'GS', 'GS', 'GS', 'WO', 'WO']; // Default
                }
            });

            setSchedule(fullSchedule);
        } catch (error) {
            console.error('Error loading roster data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCellClick = (empId, dayIndex) => {
        setSchedule(prev => {
            const newSchedule = { ...prev };
            newSchedule[empId] = [...newSchedule[empId]];
            newSchedule[empId][dayIndex] = selectedShift;
            return newSchedule;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveRoster(currentWeekStart, schedule);
            toast.success('Roster transmission successful. Schedules synchronized.');
        } catch (error) {
            toast.error('Strategic failure: Roster could not be committed to the matrix.');
        } finally {
            setSaving(false);
        }
    };

    const getShiftDetails = (code) => SHIFTS.find(s => s.id === code) || SHIFTS[0];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Hub */}
            <div className="flex justify-between items-center bg-card rounded-[2.5rem] p-10 border border-border shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-black text-foreground flex items-center gap-4 uppercase tracking-tight">
                        <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
                            <Calendar className="w-8 h-8 text-primary" />
                        </div>
                        Shift Roster <span className="text-primary italic">Controller</span>
                    </h2>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-3 ml-16">Personnel Scheduling // Weekly Vector Allocation</p>
                </div>

                <div className="flex items-center gap-6 relative z-10 bg-background/50 p-4 rounded-2xl border border-border shadow-inner">
                    <button className="text-primary hover:scale-110 active:scale-95 transition-all"><ChevronLeft className="w-6 h-6" /></button>
                    <span className="text-xs font-black text-foreground uppercase tracking-widest px-4 border-x border-border/50">Dec 09 — Dec 15, 2025</span>
                    <button className="text-primary hover:scale-110 active:scale-95 transition-all"><ChevronRight className="w-6 h-6" /></button>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 disabled:opacity-70 group overflow-hidden relative"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Broadcast Roster
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>

            {/* Shift Palette Matrix */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {SHIFTS.map(shift => {
                    const isActive = selectedShift === shift.id;
                    return (
                        <button
                            key={shift.id}
                            onClick={() => setSelectedShift(shift.id)}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all shrink-0 ${isActive
                                ? 'bg-primary text-primary-foreground border-transparent shadow-2xl shadow-primary/20 scale-105'
                                : 'bg-card border-border hover:border-primary/50 text-foreground'
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full shadow-lg ${isActive ? 'bg-primary-foreground animate-pulse' : 'bg-primary'}`} />
                            <div className="text-left">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>{shift.name}</p>
                                <p className={`text-[9px] font-bold uppercase ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{shift.time}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Roster Node Matrix */}
            <div className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-primary/5 text-muted-foreground font-black uppercase text-[9px] tracking-[0.2em]">
                        <tr>
                            <th className="px-10 py-8 border-b border-border">Entity Profile</th>
                            {DAYS.map(day => (
                                <th key={day} className="px-2 py-8 text-center border-b border-border">{day}</th>
                            ))}
                            <th className="px-10 py-8 text-right border-b border-border">Cycle Hrs</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {employees.map(emp => {
                            const empShifts = schedule[emp.id] || [];
                            const totalHours = empShifts.filter(s => s !== 'WO').length * 9;
                            return (
                                <tr key={emp.id} className="hover:bg-primary/[0.02] transition-colors group">
                                    <td className="px-10 py-6 border-r border-border/10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary shadow-inner group-hover:scale-110 transition-transform">
                                                {emp.avatar || emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-foreground uppercase tracking-tight">{emp.name}</p>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {empShifts.map((shiftCode, idx) => {
                                        const shift = getShiftDetails(shiftCode);
                                        const isWO = shiftCode === 'WO';
                                        return (
                                            <td key={idx} className="p-1.5 text-center">
                                                <button
                                                    onClick={() => handleCellClick(emp.id, idx)}
                                                    className={`w-full py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${isWO
                                                        ? 'bg-muted/30 border-border text-muted-foreground italic'
                                                        : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground'
                                                        }`}
                                                >
                                                    {shiftCode}
                                                </button>
                                            </td>
                                        );
                                    })}
                                    <td className="px-10 py-6 text-right border-l border-border/10">
                                        {totalHours > 48 ? (
                                            <span className="text-rose-500 font-black flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest">
                                                <AlertTriangle className="w-3 h-3" /> {totalHours} H
                                            </span>
                                        ) : (
                                            <span className="text-foreground font-black text-[10px] uppercase tracking-widest">{totalHours} H</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Compliance Matrix Monitor */}
            <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 flex gap-6 items-start relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary group-hover:w-2 transition-all"></div>
                <div className="p-4 bg-background rounded-2xl shadow-inner shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Institutional Compliance Monitor</h4>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-relaxed opacity-80">
                        System identifies workforce vectors exceeding 48H/Week protocol.
                        Mandatory weekly off-cycles <span className="text-primary italic">("WO")</span> are required for operational integrity.
                    </p>
                </div>
            </div>
        </div>
    );
}
