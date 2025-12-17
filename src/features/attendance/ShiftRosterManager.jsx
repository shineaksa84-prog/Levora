import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Save, AlertTriangle, Loader2 } from 'lucide-react';
import { SHIFTS, getWeeklyRoster, saveRoster } from '../../lib/services/attendanceService';
import { getEmployees } from '../../lib/services/employeeService';

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
            alert('Roster saved successfully!');
        } catch (error) {
            alert('Failed to save roster');
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        Shift Roster Manager
                    </h2>
                    <p className="text-sm text-gray-500">Plan and assign weekly shifts.</p>
                </div>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-900"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="font-bold text-gray-700">Dec 09 - Dec 15, 2025</span>
                    <button className="text-gray-500 hover:text-gray-900"><ChevronRight className="w-5 h-5" /></button>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-sm disabled:opacity-70"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Publish Roster
                </button>
            </div>

            {/* Shift Palette */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {SHIFTS.map(shift => (
                    <button
                        key={shift.id}
                        onClick={() => setSelectedShift(shift.id)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${selectedShift === shift.id
                            ? 'ring-2 ring-indigo-500 ring-offset-2 border-transparent shadow-md'
                            : 'border-gray-200 hover:bg-gray-50'
                            } ${shift.color.replace('text-', 'bg-opacity-10 ')}`}
                    >
                        <div className={`w-3 h-3 rounded-full ${shift.color.replace('bg-', 'bg-').split(' ')[0].replace('100', '500')}`} />
                        <div className="text-left">
                            <p className="text-xs font-bold text-gray-900">{shift.name}</p>
                            <p className="text-[10px] text-gray-500">{shift.time}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Roster Grid */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 w-48">Employee</th>
                            {DAYS.map(day => (
                                <th key={day} className="px-2 py-4 text-center">{day}</th>
                            ))}
                            <th className="px-6 py-4 text-right">Total Hrs</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {employees.map(emp => {
                            const empShifts = schedule[emp.id] || [];
                            const totalHours = empShifts.filter(s => s !== 'WO').length * 9; // Approx 9 hours
                            return (
                                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {emp.avatar || emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p>{emp.name}</p>
                                                <p className="text-xs text-gray-400 font-normal">{emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {empShifts.map((shiftCode, idx) => {
                                        const shift = getShiftDetails(shiftCode);
                                        return (
                                            <td key={idx} className="p-1 text-center">
                                                <button
                                                    onClick={() => handleCellClick(emp.id, idx)}
                                                    className={`w-full py-2 rounded-md text-xs font-bold border transition-all ${shift.color}`}
                                                >
                                                    {shiftCode}
                                                </button>
                                            </td>
                                        );
                                    })}
                                    <td className="px-6 py-4 text-right font-mono font-bold text-gray-700">
                                        {totalHours > 48 ? (
                                            <span className="text-red-500 flex items-center justify-end gap-1">
                                                <AlertTriangle className="w-3 h-3" /> {totalHours}
                                            </span>
                                        ) : (
                                            <span>{totalHours}</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-2 text-xs text-blue-800">
                <Clock className="w-4 h-4 mt-0.5" />
                <p>
                    <strong>Compliance Check:</strong> System highlights employees exceeding 48 hours/week.
                    Ensure mandatory Weekly Offs ("WO") are assigned.
                </p>
            </div>
        </div>
    );
}
