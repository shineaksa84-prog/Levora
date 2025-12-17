import { useState } from 'react';
import {
    ClipboardList, Users, Clock, AlertTriangle, FileText,
    ShieldCheck, Calendar, CheckCircle2, ChevronRight
} from 'lucide-react';
import AttendanceRules from '../attendance/AttendanceRules';
import DocumentTracker from '../compliance/DocumentTracker';
import DataAuditor from '../compliance/DataAuditor';
import PolicyBuilder from '../policy/PolicyBuilder';
import TicketManager from '../services/TicketManager';
import ChangeRequestBoard from '../services/ChangeRequestBoard';
import LetterGenerator from '../documents/LetterGenerator';
import ExitManager from '../offboarding/ExitManager';
import GrievanceAnalyzer from '../engagement/GrievanceAnalyzer';

export default function OpsDashboard() {
    const [view, setView] = useState('dashboard');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">HR Operations {view === 'dashboard' ? 'Overview' : ''}</h1>
                    <div className="flex bg-muted/50 p-1 rounded-lg overflow-x-auto">
                        <button onClick={() => setView('dashboard')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'dashboard' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Dashboard</button>
                        <button onClick={() => setView('attendance')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'attendance' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Attendance Rules</button>
                        <button onClick={() => setView('documents')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'documents' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Documents</button>
                        <button onClick={() => setView('tickets')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'tickets' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Helpdesk</button>
                        <button onClick={() => setView('changes')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'changes' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Changes</button>
                        <button onClick={() => setView('letters')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'letters' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Letters</button>
                        <button onClick={() => setView('exits')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'exits' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Offboarding</button>
                        <button onClick={() => setView('grievance')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'grievance' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Grievances</button>
                        <button onClick={() => setView('auditor')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'auditor' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Data Auditor</button>
                        <button onClick={() => setView('policy')} className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${view === 'policy' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Policy Builder</button>
                    </div>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    + New Request
                </button>
            </div>

            {view === 'attendance' && <AttendanceRules />}
            {view === 'documents' && <DocumentTracker />}
            {view === 'tickets' && <TicketManager />}
            {view === 'changes' && <ChangeRequestBoard />}
            {view === 'letters' && <LetterGenerator />}
            {view === 'exits' && <ExitManager />}
            {view === 'grievance' && <GrievanceAnalyzer />}
            {view === 'auditor' && <DataAuditor />}
            {view === 'policy' && <PolicyBuilder />}

            {view === 'dashboard' && (
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Employees</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">142</h3>
                                </div>
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Attendance Today</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
                                </div>
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Clock className="w-5 h-5" /></div>
                            </div>
                            <p className="text-xs text-green-600 mt-2 font-medium">8 late arrivals</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                                </div>
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ClipboardList className="w-5 h-5" /></div>
                            </div>
                            <p className="text-xs text-orange-600 mt-2 font-medium">5 require action</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Compliance Alerts</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                                </div>
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
                            </div>
                            <p className="text-xs text-red-600 mt-2 font-medium">1 Visa expiring soon</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tasks Panel */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Operations Tasks</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Final Settlement - Sarah Smith', time: 'Due Today', type: 'Offboarding', status: 'Urgent' },
                                    { title: 'Visa Renewal - Raj Patel', time: 'Expiring in 5 days', type: 'Compliance', status: 'High' },
                                    { title: 'Laptop Allocation - 4 New Joinees', time: 'Due Tomorrow', type: 'Assets', status: 'Normal' },
                                    { title: 'Update Leave Policy (Annual)', time: 'Draft', type: 'Policy', status: 'Normal' },
                                ].map((task, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${task.status === 'Urgent' ? 'bg-red-500' : task.status === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                                <p className="text-xs text-gray-500">{task.type} • {task.time}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity / System Alerts */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">System Alerts</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-red-900">Data Consistency Warning</h4>
                                        <p className="text-sm text-red-700 mt-1">The Data Auditor detected 42 records with missing 'Emergency Contact' details. Run a scan to correct.</p>
                                        <button onClick={() => setView('auditor')} className="text-xs font-bold text-red-800 underline mt-2">Run Auditor</button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-blue-900">Upcoming Holiday</h4>
                                        <p className="text-sm text-blue-700 mt-1">Configure attendance rules for 'Independence Day' (Aug 15). Ensure optional holiday shift rules are set.</p>
                                        <button onClick={() => setView('attendance')} className="text-xs font-bold text-blue-800 underline mt-2">Configure Rules</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
