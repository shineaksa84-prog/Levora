import { useState } from 'react';
import { Receipt, Plus, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';

const MOCK_CLAIMS = [
    { id: 'EXP-001', category: 'Internet', amount: 1200, date: '2023-11-02', status: 'Approved', employee: 'John Doe' },
    { id: 'EXP-002', category: 'Travel', amount: 4500, date: '2023-11-15', status: 'Pending', employee: 'Jane Roe' },
    { id: 'EXP-003', category: 'Team Lunch', amount: 3200, date: '2023-11-20', status: 'Rejected', employee: 'Mike Ross' },
    { id: 'EXP-004', category: 'Fuel', amount: 2000, date: '2023-11-25', status: 'Pending', employee: 'John Doe' },
];

export default function ReimbursementManager() {
    const [claims, setClaims] = useState(MOCK_CLAIMS);

    const updateStatus = (id, newStatus) => {
        setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-primary" />
                        Claims Processing
                    </h2>
                    <div className="flex gap-2">
                        <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center">
                            {claims.filter(c => c.status === 'Pending').length} Pending
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {claims.map((claim) => (
                        <div key={claim.id} className="flex items-center justify-between p-4 border rounded-xl bg-white hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${claim.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                        claim.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                    {claim.category === 'Travel' ? <div className="w-5 h-5">✈️</div> :
                                        claim.category === 'Fuel' ? <div className="w-5 h-5">⛽</div> :
                                            <FileText className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{claim.category} - ₹{claim.amount}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                        {claim.id} • {claim.employee} • {claim.date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {claim.status === 'Pending' ? (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => updateStatus(claim.id, 'Approved')}
                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Approve"
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => updateStatus(claim.id, 'Rejected')}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Reject"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${claim.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {claim.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                    <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 mb-4">
                        <Plus className="w-5 h-5" /> Submit New Claim
                    </button>
                    <p className="text-xs text-muted-foreground">
                        Upload invoice copy (PDF/JPG). Claims &gt; ₹5,000 require Manager approval.
                    </p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-sm text-gray-900 mb-4">Policy Limits</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Internet / WiFi</span>
                            <span className="font-mono text-gray-900">₹1,500 / mo</span>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Fuel / Travel</span>
                            <span className="font-mono text-gray-900">₹5,000 / mo</span>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Team Lunch</span>
                            <span className="font-mono text-gray-900">₹1,000 / person</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
