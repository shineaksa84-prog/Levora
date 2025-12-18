import { useState, useEffect } from 'react';
import { Workflow, Plus, Play, Trash2, Edit, Sparkles, Zap, Loader2 } from 'lucide-react';
import { workflowService } from '../../lib/services/workflow';
import { useAuth } from '../../contexts/AuthContext';

export default function WorkflowBuilder() {
    const { user } = useAuth();
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchWorkflows = async () => {
            setLoading(true);
            try {
                const result = await workflowService.getWorkflows(user?.uid);
                if (result.success) {
                    setWorkflows(result.workflows);
                }
            } catch (error) {
                console.error('Error fetching workflows:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkflows();
    }, [user?.uid]);

    const handleGenerateWorkflow = async () => {
        if (!naturalLanguageInput.trim()) return;

        setIsGenerating(true);
        try {
            const result = await workflowService.createWorkflowFromText(naturalLanguageInput, user?.uid);
            if (result.success) {
                setWorkflows(prev => [result.workflow, ...prev]);
                setNaturalLanguageInput('');
                setShowCreateModal(false);
            }
        } catch (error) {
            console.error('Workflow generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this workflow?')) return;
        try {
            const result = await workflowService.deleteWorkflow(id);
            if (result.success) {
                setWorkflows(prev => prev.filter(w => w.id !== id));
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Workflow className="w-8 h-8 text-primary" />
                        AI Workflow Builder
                    </h1>
                    <p className="text-muted-foreground mt-1">Automate your recruitment processes with AI-powered workflows.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Workflow
                </button>
            </div>

            {/* AI Prompt Section */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Describe Your Workflow in Plain English</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Tell me what you want to automate, and I'll create the workflow for you.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={naturalLanguageInput}
                                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                                placeholder="e.g., When a candidate is shortlisted, send them an email and schedule an interview"
                                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                                onClick={handleGenerateWorkflow}
                                disabled={isGenerating || !naturalLanguageInput.trim()}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        Generate
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workflows List */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                        <p className="text-sm text-muted-foreground">Loading your automations...</p>
                    </div>
                ) : workflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border text-center px-4">
                        <Workflow className="w-12 h-12 text-muted-foreground/30 mb-4" />
                        <h3 className="font-semibold text-lg">No workflows yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                            Describe an automation above or use a template to get started with AI-powered recruiting.
                        </p>
                    </div>
                ) : (
                    workflows.map((workflow) => (
                        <div key={workflow.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{workflow.name}</h3>
                                        <button
                                            onClick={async () => {
                                                const newStatus = workflow.status === 'active' ? 'draft' : 'active';
                                                try {
                                                    await workflowService.updateWorkflow(workflow.id, { status: newStatus });
                                                    setWorkflows(prev => prev.map(w => w.id === workflow.id ? { ...w, status: newStatus } : w));
                                                } catch (e) { console.error(e); }
                                            }}
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${workflow.status === 'active'
                                                ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                                }`}
                                        >
                                            {workflow.status}
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">{workflow.description}</p>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">Trigger:</span>
                                            <span className="font-medium">{workflow.trigger}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">Actions:</span>
                                            <span className="font-medium">{workflow.actions?.length || workflow.actions || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">Executions:</span>
                                            <span className="font-medium">{workflow.executionCount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                        <Play className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(workflow.id)}
                                        className="p-2 hover:bg-accent rounded-lg text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Quick Templates */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Quick Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        "Auto-reject low match candidates",
                        "Send weekly digest to recruiters",
                        "Remind candidates about pending tasks"
                    ].map((template, index) => (
                        <button
                            key={index}
                            onClick={() => setNaturalLanguageInput(template)}
                            className="p-3 text-left rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-colors text-sm"
                        >
                            {template}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
