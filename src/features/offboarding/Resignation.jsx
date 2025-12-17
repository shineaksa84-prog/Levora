import { useState, useEffect } from 'react';
import {
    FileText,
    Calendar,
    User,
    CheckCircle,
    XCircle,
    Clock,
    ChevronRight,
    Plus
} from 'lucide-react';
import { approveResignation, getOffboardingChecklist, updateChecklistTask } from '../../lib/services/resignationService';
import OffboardingChecklist from './OffboardingChecklist';

export default function Resignation() {
    const [resignations, setResignations] = useState([
        {
            id: 1,
            employee: "David Kim",
            role: "Senior Developer",
            date: "2024-11-28",
            lastDay: "2024-12-28",
            reason: "Better Opportunity",
            status: "Pending",
            avatar: "DK"
        },
        {
            id: 2,
            employee: "Lisa Wang",
            role: "Product Designer",
            date: "2024-11-15",
            lastDay: "2024-12-15",
            reason: "Relocation",
            status: "Approved",
            avatar: "LW"
        }
    ]);
    const [selectedResignation, setSelectedResignation] = useState(null);
    const [checklist, setChecklist] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApprove = async (resignationId) => {
        setLoading(true);
        try {
            const result = await approveResignation(resignationId);

            // Update resignations list
            setResignations(prev => prev.map(r =>
                r.id === resignationId ? { ...r, status: 'Approved' } : r
            ));

            // Show checklist
            setSelectedResignation(result.resignation);
            setChecklist(result.checklist);
        } catch (error) {
            console.error('Error approving resignation:', error);
            alert('Failed to approve resignation');
        } finally {
            setLoading(false);
        }
    };

    const handleViewChecklist = async (resignationId) => {
        const existingChecklist = getOffboardingChecklist(resignationId);
        if (existingChecklist) {
            setChecklist(existingChecklist);
            setSelectedResignation(resignations.find(r => r.id === resignationId));
        }
    };

    const handleTaskUpdate = (checklistId, taskId, status) => {
        updateChecklistTask(checklistId, taskId, status);
        // Refresh checklist
        const updatedChecklist = getOffboardingChecklist(selectedResignation.id);
        setChecklist(updatedChecklist);
    };

    const handleCloseChecklist = () => {
        setChecklist(null);
        setSelectedResignation(null);
    };

    if (checklist) {
        return (
            <div className="space-y-4">
                <button
                    onClick={handleCloseChecklist}
                    className="text-primary hover:underline flex items-center gap-2"
                >
                    ← Back to Resignations
                </button>
                <OffboardingChecklist
                    checklist={checklist}
                    onTaskUpdate={handleTaskUpdate}
                />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-500 bg-green-500/10';
            case 'Rejected': return 'text-red-500 bg-red-500/10';
            case 'Pending': return 'text-amber-500 bg-amber-500/10';
            default: return 'text-slate-500 bg-slate-500/10';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <Clock className="w-6 h-6 text-amber-500" />
                            </div>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Pending Requests</h3>
                        <p className="text-2xl font-bold mt-1">1</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Notice Period</h3>
                        <p className="text-2xl font-bold mt-1">2</p>
                        <p className="text-xs text-muted-foreground mt-2">Employees serving notice</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Completed Exits</h3>
                        <p className="text-2xl font-bold mt-1">12</p>
                        <p className="text-xs text-muted-foreground mt-2">This year</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Resignation Requests</h2>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Submit Resignation
                    </button>
                </div>

                <div className="divide-y divide-border">
                    {resignations.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors group cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                        {item.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">{item.employee}</h3>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 flex-1 justify-end">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-foreground">{item.lastDay}</p>
                                        <p className="text-xs text-muted-foreground">Last Working Day</p>
                                    </div>

                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {item.status === 'Pending' && (
                                            <button
                                                onClick={() => handleApprove(item.id)}
                                                disabled={loading}
                                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                        )}

                                        {item.status === 'Approved' && (
                                            <button
                                                onClick={() => handleViewChecklist(item.id)}
                                                className="text-sm text-primary hover:underline font-medium"
                                            >
                                                View Checklist
                                            </button>
                                        )}

                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
