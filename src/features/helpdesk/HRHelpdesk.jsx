import { useState } from 'react';
import { MessageSquare, Plus, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const CATEGORIES = [
    { id: 'payroll', label: 'Payroll & Salary', color: 'bg-green-100 text-green-700' },
    { id: 'benefits', label: 'Benefits & Insurance', color: 'bg-blue-100 text-blue-700' },
    { id: 'policy', label: 'Policy Clarification', color: 'bg-purple-100 text-purple-700' },
    { id: 'harassment', label: 'POSH / Grievance', color: 'bg-red-100 text-red-700' },
    { id: 'other', label: 'General Inquiry', color: 'bg-gray-100 text-gray-700' },
];

const MY_TICKETS = [
    { id: 1, subject: 'Tax deduction mismatch', category: 'payroll', status: 'Open', date: '2023-11-20', priority: 'High' },
    { id: 2, subject: 'Insurance card not received', category: 'benefits', status: 'Resolved', date: '2023-10-15', priority: 'Medium' },
];

export default function HRHelpdesk() {
    const [tickets, setTickets] = useState(MY_TICKETS);
    const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
    const [newTicket, setNewTicket] = useState({ subject: '', category: 'payroll', description: '', priority: 'Medium' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticket = {
            id: Date.now(),
            ...newTicket,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };
        setTickets([ticket, ...tickets]);
        setIsNewTicketOpen(false);
        setNewTicket({ subject: '', category: 'payroll', description: '', priority: 'Medium' });
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <button
                        onClick={() => setIsNewTicketOpen(true)}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                    >
                        <Plus className="w-5 h-5" /> Raise New Ticket
                    </button>

                    <div className="mt-6 space-y-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-500" /> Recent Activity
                        </h3>
                        <div className="text-sm space-y-3">
                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                <p className="text-gray-900 font-medium">Ticket #1 Updated</p>
                                <p className="text-xs text-muted-foreground mt-1">HR Ops added a comment: "Checking with finance team."</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> SLA Promise
                    </h3>
                    <ul className="text-xs text-blue-800 space-y-2 list-disc pl-4">
                        <li>Payroll Queries: <span className="font-bold">24 Hours</span></li>
                        <li>Policy Queries: <span className="font-bold">48 Hours</span></li>
                        <li>Grievances: <span className="font-bold">Urgent Priority</span></li>
                    </ul>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col">
                <div className="bg-card rounded-xl border border-border flex-1 flex flex-col shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" /> My Tickets
                        </h2>
                        <span className="text-sm text-muted-foreground">{tickets.length} Total</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="p-4 rounded-xl border border-border hover:shadow-md transition-all bg-white group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${CATEGORIES.find(c => c.id === ticket.category)?.color}`}>
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{ticket.subject}</h4>
                                            <p className="text-xs text-muted-foreground">#{ticket.id} • {ticket.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="flex gap-4 pl-[3.25rem] text-xs">
                                    <span className="font-medium text-gray-500">category: {CATEGORIES.find(c => c.id === ticket.category)?.label}</span>
                                    <span className="font-medium text-gray-500">priority: {ticket.priority}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isNewTicketOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Raise New Ticket</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={newTicket.category}
                                    onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={newTicket.subject}
                                    onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                                    placeholder="Brief summary of issue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    required
                                    className="w-full p-2 border rounded-lg h-24"
                                    value={newTicket.description}
                                    onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                                    placeholder="Detailed explanation..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Priority</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={newTicket.priority}
                                    onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsNewTicketOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold">Submit Ticket</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
