import { useState, useEffect } from 'react';
import { LifeBuoy, Plus, MessageSquare, Clock, CheckCircle, Search, X, Loader2, AlertCircle } from 'lucide-react';
import { getTickets, createTicket } from '../../lib/services/ticketService';

export default function RequestCenter() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setLoading(true);
        const data = await getTickets('EMP-001'); // Mock ID
        setTickets(data);
        setLoading(false);
    };

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
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black shadow-sm transition-colors"
                >
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
                            {loading ? (
                                <div className="p-12 text-center text-gray-400">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto opacity-20" />
                                </div>
                            ) : tickets.length === 0 ? (
                                <div className="p-12 text-center text-gray-400 italic text-sm">No tickets found in the resolution matrix.</div>
                            ) : tickets.map(ticket => (
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
            {showAddModal && (
                <NewTicketModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        loadTickets();
                    }}
                />
            )}
        </div>
    );
}

function NewTicketModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        subject: '',
        category: 'IT Support',
        priority: 'Medium',
        description: '',
        employeeId: 'EMP-001'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTicket({
                ...formData,
                date: new Date().toISOString().split('T')[0]
            });
            onSuccess();
        } catch (err) {
            setError('System error: Ticket could not be synchronized with the helpdesk.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Initiate Service Request</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Support Matrix Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                        <input
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white font-bold text-sm outline-none transition-all"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Brief summary of the issue"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>IT Support</option>
                                <option>Payroll</option>
                                <option>HR General</option>
                                <option>Facilities</option>
                                <option>Access Request</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Priority</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Detailed Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-medium text-sm outline-none resize-none focus:bg-white transition-all"
                            placeholder="Provide full context for faster resolution..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}
