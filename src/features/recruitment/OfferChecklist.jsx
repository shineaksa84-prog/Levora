import { useState } from 'react';
import { ClipboardCheck, CheckSquare, AlertCircle, FileCheck, DollarSign, Users, ChevronRight } from 'lucide-react';

const STEPS = [
    { id: 'budget', label: 'Budget Approval Verified', description: 'Confirm role is within approved Q4 headcount budget.', icon: DollarSign },
    { id: 'benchmark', label: 'Salary Benchmarking', description: 'Ensure offer falls within P50-P75 band for this level.', icon: Users },
    { id: 'equity', label: 'Equity Grant Calculation', description: 'Verify standard option grant with Finance.', icon: TrendingUp => <span className="text-xs font-bold">$</span> },
    { id: 'references', label: 'Reference Checks Completed', description: 'Minimum 2 positive management references on file.', icon: FileCheck },
    { id: 'manager', label: 'Hiring Manager Sign-off', description: 'Final approval from hiring manager received.', icon: CheckSquare }
];

export default function OfferChecklist() {
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [checkedSteps, setCheckedSteps] = useState({});
    const [status, setStatus] = useState('pending'); // pending, approved

    const progress = (Object.keys(checkedSteps).length / STEPS.length) * 100;
    const isComplete = progress === 100;

    const toggleStep = (id) => {
        setCheckedSteps(prev => {
            const next = { ...prev };
            if (next[id]) delete next[id];
            else next[id] = true;
            return next;
        });
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ClipboardCheck className="w-6 h-6 text-primary" />
                        Offer Readiness Checklist
                    </h2>

                    <div className="mb-6">
                        <label className="text-sm font-medium mb-1.5 block">Select Candidate</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                            value={selectedCandidate}
                            onChange={(e) => setSelectedCandidate(e.target.value)}
                        >
                            <option value="">-- Select Candidate for Offer --</option>
                            <option value="john">John Doe - Senior React Engineer</option>
                            <option value="sarah">Sarah Smith - Product Manager</option>
                        </select>
                    </div>

                    <div className={`space-y-3 ${!selectedCandidate ? 'opacity-50 pointer-events-none filter blur-[1px]' : ''}`}>
                        {STEPS.map((step) => {
                            const Icon = step.icon;
                            // Fix for the icon inline function issue in STEPS definition above
                            // Replacing with generic icon rendered below for simplicity
                            const StepIcon = step.id === 'equity' ? DollarSign : step.icon;

                            return (
                                <div
                                    key={step.id}
                                    onClick={() => toggleStep(step.id)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${checkedSteps[step.id]
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-background border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checkedSteps[step.id] ? 'bg-green-600 border-green-600 text-white' : 'border-gray-400 bg-white'
                                        }`}>
                                        {checkedSteps[step.id] && <CheckSquare className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium ${checkedSteps[step.id] ? 'text-green-900' : 'text-foreground'}`}>
                                            {step.label}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                                    </div>
                                    <div className={`p-2 rounded-full ${checkedSteps[step.id] ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                                        <StepIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm h-full flex flex-col sticky top-6">
                    <h3 className="font-semibold text-lg mb-4">Offer Status</h3>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Compliance Progress</span>
                            <span className="font-bold">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-blue-500" /> Policy Reminder
                            </h4>
                            <p className="text-muted-foreground">
                                All offers above $150k require VP Finance approval. Offers including equity must be verified against the current 409A valuation.
                            </p>
                        </div>
                    </div>

                    <button
                        disabled={!isComplete || !selectedCandidate}
                        className="w-full mt-auto bg-green-600 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-green-700 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                        <FileCheck className="w-5 h-5" /> Generate Offer Letter
                    </button>
                    {!isComplete && selectedCandidate && (
                        <p className="text-xs text-center text-red-500 mt-2 font-medium">Complete all checklist items to proceed</p>
                    )}
                </div>
            </div>
        </div>
    );
}
