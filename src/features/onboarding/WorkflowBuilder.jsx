import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Save, Trash2, CheckCircle2, Layout, Calendar } from 'lucide-react';
import { getWorkflows, saveWorkflow } from '../../lib/services/onboardingService';

export default function WorkflowBuilder() {
    const [workflows, setWorkflows] = useState([]);
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadWorkflows();
    }, []);

    const loadWorkflows = async () => {
        const data = await getWorkflows();
        setWorkflows(data);
        if (data.length > 0 && !selectedWorkflow) {
            setSelectedWorkflow(data[0]);
        }
        setLoading(false);
    };

    const handleAddTask = () => {
        if (!selectedWorkflow) return;
        const newTask = {
            id: `t${Date.now()}`,
            title: 'New Task',
            type: 'general',
            dueDay: 1
        };
        setSelectedWorkflow({
            ...selectedWorkflow,
            tasks: [...selectedWorkflow.tasks, newTask]
        });
    };

    const handleTaskChange = (taskId, field, value) => {
        const updatedTasks = selectedWorkflow.tasks.map(t =>
            t.id === taskId ? { ...t, [field]: value } : t
        );
        setSelectedWorkflow({ ...selectedWorkflow, tasks: updatedTasks });
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = selectedWorkflow.tasks.filter(t => t.id !== taskId);
        setSelectedWorkflow({ ...selectedWorkflow, tasks: updatedTasks });
    };

    const handleSave = async () => {
        setSaving(true);
        await saveWorkflow(selectedWorkflow);
        // Update local list
        setWorkflows(workflows.map(w => w.id === selectedWorkflow.id ? selectedWorkflow : w));
        setSaving(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex h-[600px] gap-6">
            {/* Sidebar List */}
            <div className="w-1/4 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-border bg-muted/30">
                    <h3 className="font-bold flex items-center gap-2">
                        <Layout className="w-4 h-4" />
                        Templates
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {workflows.map(wf => (
                        <button
                            key={wf.id}
                            onClick={() => setSelectedWorkflow(wf)}
                            className={`w-full text-left p-3 rounded-lg transition-colors border ${selectedWorkflow?.id === wf.id
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-transparent border-transparent hover:bg-muted'
                                }`}
                        >
                            <div className="font-medium text-sm">{wf.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{wf.tasks.length} tasks</div>
                        </button>
                    ))}
                    <button className="w-full p-3 rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm">
                        <Plus className="w-4 h-4" />
                        New Template
                    </button>
                </div>
            </div>

            {/* Builder Area */}
            <div className="flex-1 bg-card border border-border rounded-xl flex flex-col">
                {selectedWorkflow ? (
                    <>
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <input
                                    type="text"
                                    value={selectedWorkflow.title}
                                    onChange={(e) => setSelectedWorkflow({ ...selectedWorkflow, title: e.target.value })}
                                    className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-foreground"
                                />
                                <div className="text-sm text-muted-foreground mt-1">
                                    Target Role: <span className="font-medium text-foreground capitalize">{selectedWorkflow.role}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {saving ? <Layout className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-3">
                            {selectedWorkflow.tasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group flex items-center gap-4 bg-muted/20 border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                                >
                                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab active:cursor-grabbing" />

                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={task.title}
                                            onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                                            className="w-full bg-transparent font-medium focus:outline-none text-sm"
                                            placeholder="Task title"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <select
                                            value={task.type}
                                            onChange={(e) => handleTaskChange(task.id, 'type', e.target.value)}
                                            className="bg-background border border-border rounded-lg text-xs px-2 py-1 focus:outline-none focus:border-primary"
                                        >
                                            <option value="general">General</option>
                                            <option value="technical">Technical</option>
                                            <option value="compliance">Compliance</option>
                                            <option value="training">Training</option>
                                        </select>

                                        <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1">
                                            <Calendar className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">Day</span>
                                            <input
                                                type="number"
                                                value={task.dueDay}
                                                onChange={(e) => handleTaskChange(task.id, 'dueDay', parseInt(e.target.value))}
                                                className="w-8 bg-transparent text-xs font-medium focus:outline-none text-center"
                                                min="1"
                                            />
                                        </div>

                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            <button
                                onClick={handleAddTask}
                                className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Add Onboarding Task
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select a workflow template to edit
                    </div>
                )}
            </div>
        </div>
    );
}
