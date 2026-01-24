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
import HROpsHelpdesk from '../helpdesk/HROpsHelpdesk';
import GrievanceAnalyzer from '../engagement/GrievanceAnalyzer';
import DocumentVault from '../documents/DocumentVault';
import GeneralAssets from '../assets/GeneralAssets';
import VisitorLog from '../facilities/VisitorLog';

export default function OpsDashboard() {
    const [view, setView] = useState('dashboard');

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Levora Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        HR <span className="text-primary italic">Command</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Institutional control plane for compliance, attendance, and operational continuity.
                    </p>
                </div>
                <div>
                    <button className="bg-primary text-white px-6 py-4 rounded-2xl text-xs font-black shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                        + New Request
                    </button>
                </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex bg-muted/50 p-1.5 rounded-[2rem] border border-border/50 w-full overflow-x-auto no-scrollbar">
                {[
                    { id: 'dashboard', label: 'Dashboard' },
                    { id: 'attendance', label: 'Attendance' },
                    { id: 'documents', label: 'Documents' },
                    { id: 'tickets', label: 'Helpdesk' },
                    { id: 'changes', label: 'Changes' },
                    { id: 'letters', label: 'Letters' },
                    { id: 'exits', label: 'Exits' },
                    { id: 'grievance', label: 'Grievances' },
                    { id: 'auditor', label: 'Auditor' },
                    { id: 'policy', label: 'Policies' },
                    { id: 'helpdesk', label: 'HR Helpdesk' },
                    { id: 'vault', label: 'Vault' }, // Added 'Vault' tab
                    { id: 'assets', label: 'Physical Assets' },
                    { id: 'visitors', label: 'Visitors' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${view === tab.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
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
            {view === 'helpdesk' && <HROpsHelpdesk />}
            {view === 'vault' && <DocumentVault isAdmin={true} />} {/* Render DocumentVault for 'vault' view */}
            {view === 'assets' && <GeneralAssets />}
            {view === 'visitors' && <VisitorLog />}

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
