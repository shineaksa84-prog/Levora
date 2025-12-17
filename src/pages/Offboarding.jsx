import { useState } from 'react';
import { FileText, MessageCircle, CheckSquare } from 'lucide-react';
import Resignation from '../features/offboarding/Resignation';
import ExitInterviews from '../features/offboarding/ExitInterviews';
import Clearance from '../features/offboarding/Clearance';

export default function Offboarding() {
    const [activeTab, setActiveTab] = useState('resignation');

    const tabs = [
        { id: 'resignation', label: 'Resignations', icon: FileText },
        { id: 'interviews', label: 'Exit Interviews', icon: MessageCircle },
        { id: 'clearance', label: 'Clearance Checklist', icon: CheckSquare }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Offboarding</h1>
                    <p className="text-muted-foreground mt-1">Manage employee exits, interviews, and clearance</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-card border border-border rounded-xl p-2 flex gap-2 w-full md:w-fit">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'gradient-primary text-white shadow-lg'
                                : 'text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'resignation' && <Resignation />}
                {activeTab === 'interviews' && <ExitInterviews />}
                {activeTab === 'clearance' && <Clearance />}
            </div>
        </div>
    );
}
