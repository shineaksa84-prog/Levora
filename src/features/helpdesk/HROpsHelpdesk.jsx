import { useState } from 'react';
import { Filter, Search, CheckCircle2, Clock, AlertTriangle, MoreHorizontal } from 'lucide-react';

const ALL_TICKETS = [
    { id: 1, subject: 'Tax deduction mismatch', employee: 'Alice Smith', category: 'payroll', status: 'Open', date: '2023-11-20', priority: 'High', sla: '4 hours left' },
    { id: 2, subject: 'Insurance card not received', employee: 'Bob Jones', category: 'benefits', status: 'Resolved', date: '2023-10-15', priority: 'Medium', sla: 'Met' },
    { id: 3, subject: 'WFH Policy clarification', employee: 'Charlie Day', category: 'policy', status: 'In Progress', date: '2023-11-21', priority: 'Low', sla: '2 days left' },
];

export default function HROpsHelpdesk() {
    const [tickets, setTickets] = useState(ALL_TICKETS);
    const [filter, setFilter] = useState('All');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-red-100 text-red-700 border-red-200';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Helpdesk Queue</h2>
                    <p className="text-muted-foreground">Manage employee inquiries and track SLAs.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            placeholder="Search tickets..."
                            className="pl-9 w-full p-2 border rounded-lg text-sm"
                        />
                    </div>
                    <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Open Tickets</p>
                    <p className="text-2xl font-bold mt-1 text-red-600">12</p>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-xs font-medium text-muted-foreground uppercase">SLA Breaches</p>
                    <p className="text-2xl font-bold mt-1 text-orange-600">2</p>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Avg Response Time</p>
                    <p className="text-2xl font-bold mt-1 text-blue-600">1.5h</p>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Resolved Today</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">8</p>
                </div>
            </div>

            {/* Ticket List */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                            <tr>
                                <th className="p-4">Ticket Details</th>
                                <th className="p-4">Employee</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status & SLA</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="p-4">
                                        <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{ticket.subject}</p>
                                        <p className="text-xs text-muted-foreground">#{ticket.id} • Created {ticket.date}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                                {ticket.employee.charAt(0)}
                                            </div>
                                            <span>{ticket.employee}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="capitalize">{ticket.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {ticket.sla}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-full">
                                            <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
