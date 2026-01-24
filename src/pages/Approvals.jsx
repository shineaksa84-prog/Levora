import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, FileText, ChevronRight } from 'lucide-react';

const REQUESTS = [
    { id: 1, type: 'Leave', employee: 'Alex Johnson', details: 'Sick Leave (2 days)', date: 'Dec 24-25', status: 'Pending' },
    { id: 2, type: 'Expense', employee: 'Sarah Smith', details: 'Client Dinner', amount: '₹4,500', status: 'Pending' },
    { id: 3, type: 'WFH', employee: 'Mike Ross', details: 'Medical Appointment', date: 'Tomorrow', status: 'Pending' },
];

export default function Approvals() {
    const [requests, setRequests] = useState(REQUESTS);

    const handleAction = (id, action) => {
        setRequests(requests.filter(r => r.id !== id));
        // In real app, call API
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500 opacity-20" />
                        <p>All caught up! No pending requests.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {requests.map(req => (
                            <div key={req.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${req.type === 'Leave' ? 'bg-blue-100 text-blue-600' :
                                            req.type === 'Expense' ? 'bg-green-100 text-green-600' :
                                                'bg-purple-100 text-purple-600'
                                        }`}>
                                        {req.type === 'Leave' ? <Clock className="w-5 h-5" /> :
                                            req.type === 'Expense' ? <FileText className="w-5 h-5" /> :
                                                <Clock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.employee}</h3>
                                        <p className="text-sm text-muted-foreground">{req.type} • {req.details} {req.amount && `• ${req.amount}`}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{req.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleAction(req.id, 'reject')}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Reject"
                                    >
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, 'approve')}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                        title="Approve"
                                    >
                                        <CheckCircle2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                <p><strong>Note:</strong> Approved requests are automatically synced with Payroll and Attendance modules.</p>
            </div>
        </div>
    );
}
