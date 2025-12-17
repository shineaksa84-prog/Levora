import { useState } from 'react';
import { Target, BookOpen, TrendingUp, Award } from 'lucide-react';
import GoalsDashboard from '../features/performance/GoalsDashboard';
import LearningHub from '../features/learning/LearningHub';
import SkillsMatrix from '../features/learning/SkillsMatrix';
import PerformanceReviews from '../features/performance/PerformanceReviews';

export default function Performance() {
    const [activeTab, setActiveTab] = useState('goals');

    const tabs = [
        { id: 'goals', label: 'Goals & OKRs', icon: Target },
        { id: 'learning', label: 'Learning', icon: BookOpen },
        { id: 'skills', label: 'Skills Matrix', icon: Award },
        { id: 'reviews', label: 'Reviews', icon: TrendingUp }
    ];

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-card border border-border rounded-xl p-2 flex gap-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
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
                {activeTab === 'goals' && <GoalsDashboard />}
                {activeTab === 'learning' && <LearningHub />}
                {activeTab === 'skills' && <SkillsMatrix />}
                {activeTab === 'reviews' && <PerformanceReviews />}
            </div>
        </div>
    );
}
