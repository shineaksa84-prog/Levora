import { useState } from 'react';
import { Heart, Activity, Coffee, MessageSquare, Award, Coins, Zap } from 'lucide-react';

import PulseSurveys from '../features/engagement/PulseSurveys';
import MoodTracker from '../features/engagement/MoodTracker';
import SocialWall from '../features/engagement/SocialWall';
import WellnessHub from '../features/engagement/WellnessHub';
import SuggestionBox from '../features/engagement/SuggestionBox';
import GrievanceAnalyzer from '../features/engagement/GrievanceAnalyzer';
import RecognitionWall from '../features/engagement/RecognitionWall';
import CultureCoins from '../features/engagement/CultureCoins';
import Watercooler from '../features/engagement/Watercooler';

export default function Engagement() {
    const [activeTab, setActiveTab] = useState('social');

    const tabs = [
        { id: 'social', label: 'Company Wall', icon: MessageSquare },
        { id: 'watercooler', label: 'Watercooler', icon: Coffee },
        { id: 'coins', label: 'Culture Coins', icon: Coins },
        { id: 'recognition', label: 'Recognition', icon: Award },
        { id: 'pulse', label: 'Pulse Surveys', icon: Activity },
        { id: 'mood', label: 'Mood Tracker', icon: Heart },
        { id: 'wellness', label: 'Wellness Hub', icon: Zap },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Employee Engagement</h1>
                <p className="text-muted-foreground font-medium mt-1">Foster culture, recognize impact, and track sentiment.</p>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="flex border-b border-border/50 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'text-primary border-b-2 border-primary bg-primary/5'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === 'social' && <SocialWall />}
                    {activeTab === 'watercooler' && <Watercooler />}
                    {activeTab === 'coins' && <CultureCoins />}
                    {activeTab === 'recognition' && <RecognitionWall />}
                    {activeTab === 'pulse' && <PulseSurveys />}
                    {activeTab === 'mood' && <MoodTracker />}
                    {activeTab === 'wellness' && <WellnessHub />}
                </div>
            </div>
        </div>
    );
}
