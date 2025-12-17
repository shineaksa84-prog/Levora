import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Filter, Search, User } from 'lucide-react';

const MOCK_TICKETS = [
    { id: 'TKT-1024', subject: 'Incorrect Tax Deduction', category: 'Payroll', priority: 'High', requester: 'Sarah Smith', status: 'Open', sla: '2 hrs left', assignedTo: 'Finance Team' },
    { id: 'TKT-1025', subject: 'Laptop Screen Flickering', category: 'IT Asset', priority: 'Medium', requester: 'Mike Ross', status: 'In Progress', sla: '1 day left', assignedTo: 'IT Admin' },
    { id: 'TKT-1026', subject: 'Leave Balance Discrepancy', category: 'HR Ops', priority: 'Low', requester: 'Raj Patel', status: 'Open', sla: '3 days left', assignedTo: 'HR Ops' },
    { id: 'TKT-1027', subject: 'WiFi Access for Guest', category: 'Admin', priority: 'Low', requester: 'Jessica Pearson', status: 'Resolved', sla: 'Completed', assignedTo: 'Admin Info' },
];

export default function TicketManager() {
    const [tickets, setTickets] = useState(MOCK_TICKETS);
    const [filter, setFilter] = useState('All');

    const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

    return (
        <div className="flex h-[calc(100vh-200px)] gap-6">
            {/* Ticket List */}
            <div className="w-1/3 flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" /> Helpdesk
                        </h2>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full font-medium">{tickets.length} Tickets</span>
                    </div>
                    <div className="flex gap-2 text-sm overflow-x-auto pb-2">
                        {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredTickets.map(ticket => (
                        <div key={ticket.id} className="p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${ticket.priority === 'High' ? 'bg-red-100 text-red-600' :
                                        ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {ticket.priority}
                                </span>
                            </div>
                            <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{ticket.subject}</h3>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ticket.requester}</span>
                                <span className="flex items-center gap-1 text-orange-600 font-medium"><Clock className="w-3 h-3" /> {ticket.sla}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed View */}
            <div className="flex-1 bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-border">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-gray-900">Incorrect Tax Deduction</h2>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded uppercase">High Priority</span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-4">
                            <span>Requester: <span className="text-foreground font-medium">Sarah Smith</span></span>
                            <span>Category: <span className="text-foreground font-medium">Payroll</span></span>
                            <span>Created: <span className="text-foreground font-medium">2 hours ago</span></span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                            Resolve Ticket
                        </button>
                        <span className="text-xs text-muted-foreground">Assigned to: <strong>Finance Team</strong></span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">SS</div>
                        <div className="bg-muted/30 p-4 rounded-r-xl rounded-bl-xl text-sm text-foreground">
                            <p>Hi HR,</p>
                            <p className="mt-2">I noticed my tax deduction for this month is significantly higher than usual. I checked my investment proof submission and everything seems correct. Can you please check?</p>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">HR</div>
                        <div className="bg-blue-50 p-4 rounded-l-xl rounded-br-xl text-sm text-blue-900">
                            <p><strong>Automated Reply:</strong></p>
                            <p className="mt-1">Hi Sarah, we have received your query. Tickets related to Payroll are typically resolved within 24 hours. A finance specialist has been assigned to this tracking ID.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="relative">
                        <textarea
                            className="w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm resize-none h-24"
                            placeholder="Type your reply here..."
                        ></textarea>
                        <div className="absolute bottom-3 right-3 flex gap-2">
                            <button className="text-xs font-medium bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors">Use Template</button>
                            <button className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded transition-colors">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
