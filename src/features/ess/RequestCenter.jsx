import { useState } from 'react';
import { LifeBuoy, Plus, MessageSquare, Clock, CheckCircle, Search } from 'lucide-react';

const MOCK_TICKETS = [
    { id: 'TKT-1001', subject: 'Laptop battery draining fast', category: 'IT Support', date: '2023-12-05', status: 'In Progress', priority: 'Medium' },
    { id: 'TKT-1002', subject: 'Payslip Discrepancy - Nov', category: 'Payroll', date: '2023-12-01', status: 'Resolved', priority: 'High' },
    { id: 'TKT-1003', subject: 'Need access to Jira', category: 'Access Request', date: '2023-12-06', status: 'Open', priority: 'Low' },
];

export default function RequestCenter() {
    const [tickets, setTickets] = useState(MOCK_TICKETS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LifeBuoy className="w-5 h-5 text-indigo-600" />
                        Help & Support Center
                    </h2>
                    <p className="text-sm text-gray-500">Raise requests and track their resolution.</p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black shadow-sm transition-colors">
                    <Plus className="w-4 h-4" /> New Ticket
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Quick Categories */}
                <div className="space-y-3 lg:col-span-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Common Requests</p>

                    {['IT Support', 'HR General', 'Payroll', 'Facilities', 'Travel Desk'].map(cat => (
                        <div key={cat} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all group">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">{cat}</span>
                                <span className="w-5 h-5 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600">
                                    <Plus className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ticket List */}
                <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 border-b border-gray-100 flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search tickets..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-100 outline-none" />
                        </div>
                        <select className="border rounded-lg text-sm px-3 py-2 bg-gray-50 font-medium text-gray-600">
                            <option>All Status</option>
                            <option>Open</option>
                            <option>Resolved</option>
                        </select>
                    </div>

                    <div className="overflow-y-auto flex-1">
                        <div className="divide-y divide-gray-100">
                            {tickets.map(ticket => (
                                <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' :
                                                ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {ticket.status === 'Resolved' ? <CheckCircle className="w-5 h-5" /> :
                                                ticket.status === 'In Progress' ? <Clock className="w-5 h-5" /> :
                                                    <LifeBuoy className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{ticket.subject}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <span>#{ticket.id}</span>
                                                <span>•</span>
                                                <span>{ticket.category}</span>
                                                <span>•</span>
                                                <span>{ticket.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ticket.status === 'Resolved' ? 'bg-gray-100 text-gray-600' :
                                                ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                                                    'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                            <MessageSquare className="w-3 h-3" /> View Updates
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
