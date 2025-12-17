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
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div>
                {activeTab === 'workflows' && <WorkflowBuilder />}
                {activeTab === 'parser' && <ResumeParser />}
                {activeTab === 'matching' && <CandidateMatching />}
            </div>
        </div>
    );
}
