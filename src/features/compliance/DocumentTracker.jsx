import { useState } from 'react';
import { FileText, AlertTriangle, Calendar, Bell, ShieldCheck, Mail, RefreshCw } from 'lucide-react';

const DOCUMENTS = [
    { id: 1, employee: 'Raj Patel', type: 'Work Visa', expiry: '2023-11-20', daysLeft: 5, status: 'Critical' },
    { id: 2, employee: 'Sarah Smith', type: 'Contract', expiry: '2023-12-01', daysLeft: 16, status: 'Warning' },
    { id: 3, employee: 'Mike Ross', type: 'Passport', expiry: '2024-01-15', daysLeft: 60, status: 'Normal' },
    { id: 4, employee: 'Jessica Pearson', type: 'Certification', expiry: '2023-11-25', daysLeft: 10, status: 'Critical' },
];

export default function DocumentTracker() {
    const [docs, setDocs] = useState(DOCUMENTS);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Compliance & Document Alerts
                    </h2>

                    <div className="space-y-3">
                        {docs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${doc.status === 'Critical' ? 'bg-red-100 text-red-600' :
                                            doc.status === 'Warning' ? 'bg-orange-100 text-orange-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{doc.employee}</h4>
                                        <p className="text-sm text-muted-foreground">{doc.type} • Expires {doc.expiry}</p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={`font-bold ${doc.status === 'Critical' ? 'text-red-600' :
                                                doc.status === 'Warning' ? 'text-orange-600' :
                                                    'text-blue-600'
                                            }`}>
                                            {doc.daysLeft} days left
                                        </p>
                                        <p className="text-xs text-muted-foreground">Action Required</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors" title="Send Reminder">
                                            <Bell className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors" title="Start Renewal">
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Expiry Timeline</h3>
                    <div className="relative border-l-2 border-muted pl-4 space-y-6">
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white"></span>
                            <p className="text-xs font-bold text-muted-foreground uppercase">This Week</p>
                            <p className="text-sm font-medium mt-1">2 Documents Expiring</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white"></span>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Next 30 Days</p>
                            <p className="text-sm font-medium mt-1">1 Document Expiring</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></span>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Next Quarter</p>
                            <p className="text-sm font-medium mt-1">15 Documents Expiring</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">Automated Renewals</h4>
                            <p className="text-xs text-blue-800 mt-1">
                                Emails act as triggers. Enabling "Auto-Remind" sends notifications to employees 60, 30, and 7 days before expiry.
                            </p>
                            <button className="text-xs font-bold text-blue-800 underline mt-2">Configure Workflows</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
