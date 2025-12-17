import { useState } from 'react';
import { GitBranch, User, Play, Save, Trash2, Plus } from 'lucide-react';

export default function SmartRouter() {
    const [rules, setRules] = useState([
        { id: 1, condition: 'Skill', operator: 'contains', value: 'React', assignee: 'John Doe', assigneeRole: 'Senior Tech Recruiter' },
        { id: 2, condition: 'Job Family', operator: 'equals', value: 'Marketing', assignee: 'Sarah Smith', assigneeRole: 'Non-Tech Recruiter' }
    ]);

    const [simulation, setSimulation] = useState({
        input: '',
        result: null
    });

    const runSimulation = () => {
        // Simple mock logic
        const matchedRule = rules.find(r =>
            simulation.input.toLowerCase().includes(r.value.toLowerCase())
        );

        if (matchedRule) {
            setSimulation(prev => ({
                ...prev,
                result: { success: true, assignee: matchedRule.assignee, ruleId: matchedRule.id }
            }));
        } else {
            setSimulation(prev => ({
                ...prev,
                result: { success: false, message: 'No matching rule found. Routing to Default Pool.' }
            }));
        }
    };

    const addRule = () => {
        setRules([...rules, {
            id: Date.now(),
            condition: 'Skill',
            operator: 'contains',
            value: '',
            assignee: 'Unassigned',
            assigneeRole: ''
        }]);
    };

    const deleteRule = (id) => {
        setRules(rules.filter(r => r.id !== id));
    };

    const updateRule = (id, field, val) => {
        setRules(rules.map(r => r.id === id ? { ...r, [field]: val } : r));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex-1 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <GitBranch className="w-5 h-5 text-primary" />
                                Routing Rules
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">Configure how candidates are assigned to recruiters.</p>
                        </div>
                        <button onClick={addRule} className="flex items-center gap-1 text-sm bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-md transition-colors">
                            <Plus className="w-4 h-4" /> Add Rule
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {rules.map((rule) => (
                            <div key={rule.id} className="bg-background border border-border p-4 rounded-lg flex items-center gap-3 shadow-sm group">
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="text-sm font-medium text-muted-foreground">IF</span>
                                    <select
                                        className="bg-muted px-2 py-1 rounded text-sm border border-transparent focus:border-primary focus:outline-none"
                                        value={rule.condition}
                                        onChange={(e) => updateRule(rule.id, 'condition', e.target.value)}
                                    >
                                        <option>Skill</option>
                                        <option>Job Family</option>
                                        <option>Location</option>
                                        <option>Experience</option>
                                    </select>
                                    <select
                                        className="bg-muted px-2 py-1 rounded text-sm border border-transparent focus:border-primary focus:outline-none"
                                        value={rule.operator}
                                        onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
                                    >
                                        <option value="contains">contains</option>
                                        <option value="equals">equals</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="bg-muted px-2 py-1 rounded text-sm border border-transparent focus:border-primary focus:outline-none flex-1 min-w-[100px]"
                                        value={rule.value}
                                        onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                                        placeholder="Value..."
                                    />
                                </div>

                                <div className="flex items-center gap-2 flex-1">
                                    <span className="text-sm font-medium text-muted-foreground">THEN ASSIGN TO</span>
                                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm border border-blue-100 flex-1">
                                        <User className="w-3 h-3" />
                                        <input
                                            type="text"
                                            className="bg-transparent border-none focus:outline-none w-full text-blue-700 placeholder-blue-300"
                                            value={rule.assignee}
                                            onChange={(e) => updateRule(rule.id, 'assignee', e.target.value)}
                                            placeholder="Recruiter Name"
                                        />
                                    </div>
                                </div>

                                <button onClick={() => deleteRule(rule.id)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex justify-end">
                        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-muted/30 border border-border p-6 rounded-xl h-full shadow-inner">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Play className="w-4 h-4 text-green-600" />
                        Test Simulation
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Test Input (Skill/context)</label>
                            <textarea
                                className="w-full h-32 p-3 rounded-md border border-input bg-background resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                                placeholder="Paste a candidate profile snippet or list skills here to test the routing logic..."
                                value={simulation.input}
                                onChange={(e) => setSimulation(s => ({ ...s, input: e.target.value }))}
                            />
                        </div>

                        <button
                            onClick={runSimulation}
                            disabled={!simulation.input}
                            className="w-full bg-background text-foreground border border-input hover:bg-muted py-2 rounded-md font-medium text-sm transition-colors"
                        >
                            Run Test
                        </button>

                        {simulation.result && (
                            <div className={`p-4 rounded-lg border text-sm ${simulation.result.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                                {simulation.result.success ? (
                                    <div key={Date.now()} className="animate-in fade-in slide-in-from-top-2">
                                        <p className="font-semibold flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Assigned to: {simulation.result.assignee}
                                        </p>
                                        <p className="text-xs opacity-80 mt-1">Matched Rule #{simulation.result.ruleId}</p>
                                    </div>
                                ) : (
                                    <p>{simulation.result.message}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
