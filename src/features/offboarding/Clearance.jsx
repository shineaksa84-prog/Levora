import { useState } from 'react';
import {
    CheckSquare,
    Monitor,
    CreditCard,
    Key,
    FileText,
    AlertCircle,
    Check
} from 'lucide-react';

export default function Clearance() {
    const [checklists] = useState([
        {
            id: 1,
            department: "IT Assets",
            icon: Monitor,
            items: [
                { id: 1, label: "Laptop Return", status: "Pending" },
                { id: 2, label: "Access Revocation", status: "Completed" },
                { id: 3, label: "Email Deactivation", status: "Pending" }
            ]
        },
        {
            id: 2,
            department: "Finance",
            icon: CreditCard,
            items: [
                { id: 4, label: "Expense Settlement", status: "Pending" },
                { id: 5, label: "Corporate Card Return", status: "Pending" },
                { id: 6, label: "Final Settlement", status: "Pending" }
            ]
        },
        {
            id: 3,
            department: "Administration",
            icon: Key,
            items: [
                { id: 7, label: "ID Card Return", status: "Pending" },
                { id: 8, label: "Desk Clearance", status: "Pending" },
                { id: 9, label: "Parking Tag Return", status: "Pending" }
            ]
        }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        DK
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">David Kim</h2>
                        <p className="text-sm text-muted-foreground">Senior Developer • Last Day: Dec 28, 2024</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium">
                    <AlertCircle className="w-4 h-4" />
                    Clearance In Progress
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {checklists.map((section) => {
                    const Icon = section.icon;
                    return (
                        <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
                                <div className="p-2 bg-background rounded-lg border border-border">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-semibold">{section.department}</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {section.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.status === 'Completed'
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-muted-foreground/30'
                                                }`}>
                                                {item.status === 'Completed' && <Check className="w-3 h-3" />}
                                            </div>
                                            <span className={item.status === 'Completed' ? 'text-muted-foreground line-through' : 'text-foreground'}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'Completed'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
