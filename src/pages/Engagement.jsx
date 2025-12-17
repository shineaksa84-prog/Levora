import { useState } from 'react';
import { MessageSquare, Heart, Award } from 'lucide-react';
import PulseSurveys from '../features/engagement/PulseSurveys';
import WellnessHub from '../features/engagement/WellnessHub';
import Recognition from '../features/engagement/Recognition';

export default function Engagement() {
    const [activeTab, setActiveTab] = useState('surveys');

    const tabs = [
        { id: 'surveys', label: 'Pulse Surveys', icon: MessageSquare },
        { id: 'wellness', label: 'Wellness Hub', icon: Heart },
        { id: 'recognition', label: 'Recognition', icon: Award }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Engagement</h1>
                    <p className="text-muted-foreground mt-1">Foster a positive work culture and track employee sentiment</p>
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
                {activeTab === 'surveys' && <PulseSurveys />}
                {activeTab === 'wellness' && <WellnessHub />}
                {activeTab === 'recognition' && <Recognition />}
            </div>
        </div>
    );
}
