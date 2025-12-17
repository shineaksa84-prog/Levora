import { useState } from 'react';
import { Calendar, CheckCircle, Bell, ExternalLink, ShieldCheck } from 'lucide-react';

const DEADLINES = [
    { id: 1, title: 'PF Return Filing (Nov)', date: '2023-12-15', agency: 'EPFO', status: 'Pending', critical: true },
    { id: 2, title: 'ESI Payment', date: '2023-12-15', agency: 'ESIC', status: 'Pending', critical: true },
    { id: 3, title: 'TDS Payment', date: '2023-12-07', agency: 'IT Dept', status: 'Filed', critical: true },
    { id: 4, title: 'Professional Tax (Quarterly)', date: '2023-12-31', agency: 'State Govt', status: 'Pending', critical: false },
];

export default function ComplianceCalendar() {
    const [tasks, setTasks] = useState(DEADLINES);

    const toggleStatus = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Pending' ? 'Filed' : 'Pending' } : t));
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Compliance Timeline
                    </h2>
                    <span className="text-sm text-muted-foreground font-medium">December 2023</span>
                </div>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-gray-200">
                    {tasks.map(task => (
                        <div key={task.id} className="relative pl-12">
                            <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center font-bold text-xs z-10 ${task.status === 'Filed' ? 'bg-green-100 text-green-700' :
                                    task.critical ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {task.date.split('-')[2]}
                            </div>

                            <div className={`p-4 rounded-xl border transition-all ${task.status === 'Filed' ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200 shadow-sm'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className={`font-bold text-sm ${task.status === 'Filed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>{task.title}</h3>
                                        <p className="text-xs text-muted-foreground">{task.agency}</p>
                                    </div>
                                    {task.critical && task.status === 'Pending' && (
                                        <Bell className="w-4 h-4 text-red-500 animate-pulse" />
                                    )}
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => toggleStatus(task.id)}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1 transition-colors ${task.status === 'Filed'
                                                ? 'bg-white border text-gray-500 hover:bg-gray-50'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                            }`}
                                    >
                                        <CheckCircle className="w-3 h-3" /> {task.status === 'Filed' ? 'Mark Pending' : 'Mark Filed'}
                                    </button>
                                    {task.status === 'Pending' && (
                                        <button className="px-3 py-1.5 text-xs font-bold border rounded bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                                            <ExternalLink className="w-3 h-3" /> Portal
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg text-center">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Compliance Score</h3>
                    <div className="text-5xl font-black mb-2 opacity-90">92%</div>
                    <p className="text-purple-100 text-sm">2 filings pending this month. No penalties accrued in FY 23-24.</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Regional Rules</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between border-b pb-2">
                            <span>State</span>
                            <span className="font-medium text-gray-900">Karnataka</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>PT Frequency</span>
                            <span className="font-medium text-gray-900">Monthly</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>LWF Deduction</span>
                            <span className="font-medium text-gray-900">Dec 2023 (Annual)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
