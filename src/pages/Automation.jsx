import { useState } from 'react';
import WorkflowBuilder from '../features/automation/WorkflowBuilder';
import ResumeParser from '../features/automation/ResumeParser';
import CandidateMatching from '../features/automation/CandidateMatching';
import { Workflow, FileText, Target } from 'lucide-react';

export default function Automation() {
    const [activeTab, setActiveTab] = useState('workflows');

    const tabs = [
        { id: 'workflows', label: 'Workflow Builder', icon: Workflow },
        { id: 'parser', label: 'Resume Parser', icon: FileText },
        { id: 'matching', label: 'Candidate Matching', icon: Target },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
                        Neural <span className="text-primary italic">Automation</span>
                    </h1>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">
                        Task Orchestration // Logic Synthesis Engine v8.2
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-card p-1.5 rounded-[1.5rem] border border-border w-fit shadow-xl">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${isActive
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] relative">
                <div className="animate-in slide-in-from-bottom-5 duration-500">
                    {activeTab === 'workflows' && <WorkflowBuilder />}
                    {activeTab === 'parser' && <ResumeParser />}
                    {activeTab === 'matching' && <CandidateMatching />}
                </div>
            </div>
        </div>
    );
}
