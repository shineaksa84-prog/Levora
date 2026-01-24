import { useState } from 'react';
import { X, Target, Calendar } from 'lucide-react';

export default function AddGoalModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        type: 'SMART', // OKR | SMART
        description: '',
        dueDate: '',
        priority: 'medium'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
        setFormData({ title: '', type: 'SMART', description: '', dueDate: '', priority: 'medium' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 border-b border-border">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        New Goal
                    </h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Goal Title</label>
                        <input
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. Increase Code Coverage"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none"
                            >
                                <option value="SMART">SMART</option>
                                <option value="OKR">OKR</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none resize-none h-24"
                            placeholder="Describe expected outcome..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Due Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                value={formData.dueDate}
                                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none pl-10"
                            />
                            <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-muted-foreground font-bold hover:bg-muted rounded-xl transition-colors">Cancel</button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity">Create Goal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
