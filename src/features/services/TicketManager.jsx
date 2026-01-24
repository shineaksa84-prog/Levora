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
    const [selectedTicketId, setSelectedTicketId] = useState('TKT-1024');

    const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
    const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

    return (
        <div className="flex h-[calc(100vh-200px)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Ticket List */}
            <div className="w-1/3 flex flex-col bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-border bg-primary/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-black text-xl flex items-center gap-3 text-foreground">
                            <MessageSquare className="w-6 h-6 text-primary" /> Bio-Helpdesk
                        </h2>
                        <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest">
                            {tickets.length} Cycles
                        </span>
                    </div>
                    <div className="flex gap-2 text-xs overflow-x-auto pb-2 no-scrollbar">
                        {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl whitespace-nowrap font-black uppercase tracking-tighter transition-all ${filter === f ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            onClick={() => setSelectedTicketId(ticket.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedTicketId === ticket.id
                                ? 'bg-primary/10 border-primary/30 shadow-inner'
                                : 'bg-background border-border hover:border-primary/20 hover:bg-primary/5'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-black text-[10px] text-muted-foreground uppercase tracking-widest">{ticket.id}</span>
                                <span className={`text-[8px] px-2 py-0.5 rounded-lg font-black uppercase tracking-widest ${ticket.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                                    ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                    {ticket.priority}
                                </span>
                            </div>
                            <h3 className={`font-bold text-sm mb-2 transition-colors ${selectedTicketId === ticket.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{ticket.subject}</h3>
                            <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold">
                                <span className="flex items-center gap-1.5 uppercase tracking-tighter"><User className="w-3.5 h-3.5 text-primary/60" /> {ticket.requester}</span>
                                <span className="flex items-center gap-1.5 text-rose-500 uppercase tracking-tighter"><Clock className="w-3.5 h-3.5" /> {ticket.sla}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed View */}
            <div className="flex-1 bg-card rounded-2xl border border-border shadow-2xl p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="flex justify-between items-start mb-8 pb-8 border-b border-border relative z-10">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-black text-foreground tracking-tight">{selectedTicket.subject}</h2>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedTicket.priority === 'High' ? 'bg-rose-500/10 text-rose-500 shadow-sm shadow-rose-500/10' : 'bg-primary/10 text-primary'}`}>
                                {selectedTicket.priority} Priority
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <p className="text-[10px] text-muted-foreground flex items-center gap-2 font-bold uppercase tracking-widest">
                                <span>Requester: <span className="text-foreground">{selectedTicket.requester}</span></span>
                                <span className="w-1 h-1 bg-border rounded-full" />
                                <span>Category: <span className="text-foreground font-black">{selectedTicket.category}</span></span>
                                <span className="w-1 h-1 bg-border rounded-full" />
                                <span>Assigned: <span className="text-primary">{selectedTicket.assignedTo}</span></span>
                            </p>
                        </div>
                    </div>
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Resolve Protocol
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 mb-8 pr-4 relative z-10">
                    <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-lg shrink-0">
                            {selectedTicket.requester.charAt(0)}
                        </div>
                        <div className="bg-muted/30 p-6 rounded-[2rem] rounded-tl-none text-sm text-foreground border border-border/50 max-w-lg">
                            <p className="font-bold mb-2">Message from {selectedTicket.requester}:</p>
                            <p className="leading-relaxed opacity-90 italic">"I noticed my tax deduction for this month is significantly higher than usual. I checked my investment proof submission and everything seems correct. Can you please check?"</p>
                        </div>
                    </div>

                    <div className="flex gap-5 flex-row-reverse">
                        <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center font-black text-sm shadow-lg shrink-0">
                            HR
                        </div>
                        <div className="bg-primary/10 p-6 rounded-[2rem] rounded-tr-none text-sm text-foreground border border-primary/20 max-w-lg">
                            <p className="font-black text-primary mb-2 uppercase tracking-widest text-[10px]">Automated Neural Reply:</p>
                            <p className="leading-relaxed font-bold opacity-80">We have received your query. Tickets related to Payroll are typically resolved within 24 hours. A finance specialist has been assigned to this tracking ID.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto relative z-10">
                    <div className="relative group">
                        <textarea
                            className="w-full p-6 rounded-[2rem] border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none text-sm resize-none h-32 transition-all font-medium placeholder:text-muted-foreground/50"
                            placeholder="Type your strategic response here..."
                        ></textarea>
                        <div className="absolute bottom-5 right-5 flex gap-3">
                            <button className="text-[10px] font-black uppercase tracking-widest bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl transition-all">Templates</button>
                            <button className="text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground px-5 py-2 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-105">Send Signal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
