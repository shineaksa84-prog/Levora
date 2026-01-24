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
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* AI Prompt Section - Neural Command Center */}
            <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-[3rem] border border-primary/20 p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="flex items-start gap-8 relative z-10">
                    <div className="p-5 bg-primary/10 rounded-3xl shadow-inner">
                        <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight uppercase">Neural <span className="text-primary italic">Synthesis Hub</span></h3>
                        <p className="text-[10px] font-black text-muted-foreground mb-8 uppercase tracking-[0.2em] leading-relaxed max-w-2xl">
                            Initialize autonomous logic sequences via natural language primitives. Define your protocol, and the core will synthesize the execution nodes.
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={naturalLanguageInput}
                                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                                placeholder="e.g., When a candidate is shortlisted, execute interview protocols..."
                                className="flex-1 px-8 py-5 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black transition-all placeholder:text-muted-foreground/20 shadow-inner"
                            />
                            <button
                                onClick={handleGenerateWorkflow}
                                disabled={isGenerating || !naturalLanguageInput.trim()}
                                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Synthesizing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4" />
                                            Execute Generation
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tight uppercase">Active <span className="text-primary italic">Automations</span></h2>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-60">Real-time logic monitoring</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-foreground text-background rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl"
                >
                    <Plus className="w-4 h-4" /> Manual Node Build
                </button>
            </div>

            {/* Workflows List - Node Grid */}
            <div className="grid gap-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-card rounded-[2.5rem] border border-border animate-pulse">
                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-6" />
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Synchronizing Automation Node List...</p>
                    </div>
                ) : workflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-card rounded-[2.5rem] border border-border border-dashed text-center px-10">
                        <Workflow className="w-16 h-16 text-muted-foreground/20 mb-6" />
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Zero Logic Detected</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-3 max-w-sm leading-relaxed">
                            Describe an autonomous vector above or utilize a legacy template to initialize your first operational sequence.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {workflows.map((workflow) => (
                            <div key={workflow.id} className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl hover:border-primary/50 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-6 mb-4">
                                            <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{workflow.name}</h3>
                                            <button
                                                onClick={async () => {
                                                    const newStatus = workflow.status === 'active' ? 'draft' : 'active';
                                                    try {
                                                        await workflowService.updateWorkflow(workflow.id, { status: newStatus });
                                                        setWorkflows(prev => prev.map(w => w.id === workflow.id ? { ...w, status: newStatus } : w));
                                                    } catch (e) { console.error(e); }
                                                }}
                                                className={`px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border transition-all ${workflow.status === 'active'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                                                    : 'bg-muted text-muted-foreground border-border hover:bg-muted-foreground hover:text-white'
                                                    }`}
                                            >
                                                {workflow.status}
                                            </button>
                                        </div>
                                        <p className="text-[11px] font-black text-muted-foreground mb-8 uppercase tracking-widest leading-relaxed max-w-3xl">{workflow.description}</p>
                                        <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em]">
                                            <div className="flex items-center gap-3">
                                                <span className="text-muted-foreground opacity-40 italic">Trigger Source:</span>
                                                <span className="text-primary font-black group-hover:underline underline-offset-4">{workflow.trigger}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-muted-foreground opacity-40 italic">Logic Units:</span>
                                                <span className="text-foreground">{workflow.actions?.length || workflow.actions || 0} Nodes</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-muted-foreground opacity-40 italic">Cycle Count:</span>
                                                <span className="text-foreground tracking-tighter">{workflow.executionCount} Units</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button title="Execute Sequence" className="p-4 bg-primary/5 hover:bg-primary hover:text-primary-foreground rounded-2xl text-primary transition-all duration-300 shadow-xl shadow-transparent hover:shadow-primary/20 scale-100 group-hover:scale-105 active:scale-95">
                                            <Play className="w-5 h-5 fill-current" />
                                        </button>
                                        <button title="Refine Logic" className="p-4 bg-muted/30 hover:bg-foreground hover:text-background rounded-2xl text-muted-foreground transition-all duration-300">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(workflow.id)}
                                            title="Purge Node"
                                            className="p-4 bg-rose-500/5 hover:bg-rose-500 hover:text-white rounded-2xl text-rose-500 transition-all duration-300"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Templates - Neural Samples */}
            <div className="bg-card rounded-[3rem] border border-border p-12 shadow-2xl">
                <h3 className="text-lg font-black text-foreground mb-8 uppercase tracking-widest">Pre-configured <span className="text-primary italic">Logic Samples</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        "Purge low match candidate clusters",
                        "Sync weekly intelligence recap",
                        "Broadcast pending task protocols"
                    ].map((template, index) => (
                        <button
                            key={index}
                            onClick={() => setNaturalLanguageInput(template)}
                            className="p-6 text-left rounded-3xl border border-border bg-muted/20 hover:bg-primary/5 hover:border-primary/50 transition-all duration-500 group animate-in slide-in-from-left-2"
                        >
                            <p className="text-[10px] font-black text-foreground uppercase tracking-widest group-hover:text-primary transition-colors leading-relaxed">{template}</p>
                            <div className="w-full h-1 bg-border/20 rounded-full mt-4 overflow-hidden">
                                <div className="w-0 group-hover:w-full h-full bg-primary transition-all duration-1000"></div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
