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
import {
    approveResignation,
    getOffboardingChecklist,
    updateChecklistTask,
    getResignations,
    submitResignation,
    getResignationStats
} from '../../lib/services/resignationService';
import OffboardingChecklist from './OffboardingChecklist';

export default function Resignation() {
    const [resignations, setResignations] = useState([]);
    const [selectedResignation, setSelectedResignation] = useState(null);
    const [checklist, setChecklist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [stats, setStats] = useState({ pending: 0, thisYear: 0, notice: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [data, s] = await Promise.all([
                getResignations(),
                getResignationStats()
            ]);
            setResignations(data);
            setStats({
                pending: s.pending,
                thisYear: s.thisYear,
                notice: data.filter(r => r.status === 'Approved').length
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
        setLoading(true);
        try {
            const existingChecklist = await getOffboardingChecklist(resignationId);
            if (existingChecklist) {
                setChecklist(existingChecklist);
                setSelectedResignation(resignations.find(r => r.id === resignationId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskUpdate = async (checklistId, taskId, status) => {
        try {
            await updateChecklistTask(checklistId, taskId, status);
            // Refresh checklist from server to be sure, or just update local state if we trust it.
            // Let's refetch to be safe since we edited a subfield
            const updatedChecklist = await getOffboardingChecklist(selectedResignation.id);
            setChecklist(updatedChecklist);
        } catch (error) {
            console.error('Failed to update task', error);
        }
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
                        <p className="text-2xl font-bold mt-1">{stats.pending}</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Notice Period</h3>
                        <p className="text-2xl font-bold mt-1">{stats.notice}</p>
                        <p className="text-xs text-muted-foreground mt-2">Employees serving notice</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">Completed Exits</h3>
                        <p className="text-2xl font-bold mt-1">{stats.thisYear}</p>
                        <p className="text-xs text-muted-foreground mt-2">This year</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Resignation Requests</h2>
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
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
            {showSubmitModal && (
                <SubmitResignationModal
                    onClose={() => setShowSubmitModal(false)}
                    onSuccess={() => {
                        setShowSubmitModal(false);
                        fetchData();
                    }}
                />
            )}
        </div>
    );
}

function SubmitResignationModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        employee: 'Current User', // Mock
        employeeId: 'EMP-001',
        role: 'Senior Developer',
        department: 'Engineering',
        lastDay: '',
        reason: 'Better Opportunity',
        reasonDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitResignation(formData);
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Failed to submit resignation protocol.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Post Resignation Protocol</h3>
                        <p className="text-[10px] font-medium uppercase tracking-widest opacity-80">Offboarding Initiation Module</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Working Day</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.lastDay}
                                onChange={e => setFormData({ ...formData, lastDay: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Reason Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.reason}
                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            >
                                <option>Better Opportunity</option>
                                <option>Personal Reasons</option>
                                <option>Relocation</option>
                                <option>Higher Studies</option>
                                <option>Career Change</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Explanatory Notes</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-medium text-sm outline-none resize-none focus:bg-white transition-all"
                            placeholder="Please provide additional context for your departure..."
                            value={formData.reasonDetails}
                            onChange={e => setFormData({ ...formData, reasonDetails: e.target.value })}
                        />
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-800 text-xs">
                        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>
                            <span className="font-black">Notice Period:</span> Your submission will initiate a 60-day notice period sequence as per institutional protocols.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Submit Resignation
                    </button>
                </form>
            </div>
        </div>
    );
}
