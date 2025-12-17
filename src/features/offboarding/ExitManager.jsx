import { useState } from 'react';
import { LogOut, CheckSquare, AlertOctagon, FileCheck, ArrowRight } from 'lucide-react';

const EXITING_EMPLOYEES = [
    { id: 1, name: 'Alice Smith', role: 'Product Designer', resignation: '2023-11-01', lwd: '2023-11-30', status: 'Notice Period', progress: 40 },
    { id: 2, name: 'Bob Jones', role: 'Backend Engineer', resignation: '2023-11-10', lwd: '2023-12-10', status: 'Notice Period', progress: 10 },
];

const CHECKLIST_ITEMS = [
    { id: 'resignation', label: 'Resignation Accepted', dept: 'HR' },
    { id: 'kt', label: 'Knowledge Transfer (KT) Completed', dept: 'Manager' },
    { id: 'assets', label: 'Assets Returned (Laptop, ID)', dept: 'IT' },
    { id: 'access', label: 'System Access Revoked', dept: 'IT' },
    { id: 'fnf', label: 'Full & Final Settlement Calculated', dept: 'Finance' },
    { id: 'exit', label: 'Exit Interview Conducted', dept: 'HR' },
];

export default function ExitManager() {
    const [selectedEmployee, setSelectedEmployee] = useState(EXITING_EMPLOYEES[0]);
    const [checklist, setChecklist] = useState({ resignation: true });

    const toggleItem = (id) => {
        setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const isComplete = CHECKLIST_ITEMS.every(item => checklist[item.id]);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 border-r border-border pr-6 flex flex-col">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <LogOut className="w-5 h-5 text-red-500" />
                    Offboarding
                </h2>
                <div className="space-y-3">
                    {EXITING_EMPLOYEES.map(emp => (
                        <div
                            key={emp.id}
                            onClick={() => setSelectedEmployee(emp)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedEmployee.id === emp.id
                                    ? 'bg-red-50 border-red-200'
                                    : 'bg-card border-border hover:bg-muted'
                                }`}
                        >
                            <h3 className={`font-bold ${selectedEmployee.id === emp.id ? 'text-red-900' : 'text-foreground'}`}>{emp.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{emp.role}</p>
                            <div className="flex justify-between items-center mt-3 text-xs">
                                <span className="font-medium text-red-600">LWD: {emp.lwd}</span>
                                <span className="bg-white px-2 py-0.5 rounded border shadow-sm">{emp.progress}% Done</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                            <p className="text-sm text-muted-foreground">{selectedEmployee.role} • {selectedEmployee.status}</p>
                        </div>
                        {isComplete && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <CheckSquare className="w-3 h-3" /> Ready for Relieving
                            </span>
                        )}
                    </div>

                    <div className="space-y-4 flex-1">
                        {CHECKLIST_ITEMS.map((item) => (
                            <label key={item.id} className={`flex items-center gap-4 p-4 border rounded-xl transition-all cursor-pointer group ${checklist[item.id] ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}>
                                <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${checklist[item.id] ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'
                                    }`}>
                                    {checklist[item.id] && <CheckSquare className="w-4 h-4" />}
                                    <input type="checkbox" className="hidden" checked={!!checklist[item.id]} onChange={() => toggleItem(item.id)} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-medium ${checklist[item.id] ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                        {item.label}
                                    </h4>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded font-medium ${item.dept === 'HR' ? 'bg-blue-100 text-blue-700' :
                                        item.dept === 'IT' ? 'bg-purple-100 text-purple-700' :
                                            item.dept === 'Finance' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {item.dept}
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <button
                            disabled={!isComplete}
                            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-red-700 transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <FileCheck className="w-5 h-5" /> Generate Relieving Letter & No Dues
                        </button>
                        {!isComplete && (
                            <p className="text-center text-xs text-red-500 mt-2 font-medium flex items-center justify-center gap-1">
                                <AlertOctagon className="w-3 h-3" /> Pending clearances required
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
