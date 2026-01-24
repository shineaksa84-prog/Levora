import { useState } from 'react';
import { Briefcase, Users, Target, TrendingUp, Smile, FileText, DollarSign, GraduationCap } from 'lucide-react';
import VideoInterviewScheduler from '../features/recruitment/VideoInterviewScheduler';
import SkillAssessmentPortal from '../features/recruitment/SkillAssessmentPortal';
import ReferralLeaderboard from '../features/recruitment/ReferralLeaderboard';
import DiversityAnalyticsDashboard from '../features/recruitment/DiversityAnalyticsDashboard';
import CandidateExperienceSurvey from '../features/recruitment/CandidateExperienceSurvey';
import TalentPoolSegmentation from '../features/recruitment/TalentPoolSegmentation';
import InterviewFeedbackTemplates from '../features/recruitment/InterviewFeedbackTemplates';
import OfferNegotiationTracker from '../features/recruitment/OfferNegotiationTracker';
import CampusRecruitmentModule from '../features/recruitment/CampusRecruitmentModule';

export default function RecruitmentExcellence() {
    const [activeTab, setActiveTab] = useState('interviews');

    const tabs = [
        { id: 'interviews', label: 'Video Interviews', icon: Briefcase },
        { id: 'assessments', label: 'Skill Assessments', icon: Target },
        { id: 'referrals', label: 'Referral Leaderboard', icon: TrendingUp },
        { id: 'diversity', label: 'Diversity Analytics', icon: Users },
        { id: 'experience', label: 'Candidate Experience', icon: Smile },
        { id: 'talentPool', label: 'Talent Pool', icon: Users },
        { id: 'templates', label: 'Interview Templates', icon: FileText },
        { id: 'negotiations', label: 'Offer Negotiations', icon: DollarSign },
        { id: 'campus', label: 'Campus Recruitment', icon: GraduationCap },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Recruitment Excellence</h1>
                <p className="text-muted-foreground font-medium mt-1">Advanced recruitment tools and analytics</p>
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
                    {activeTab === 'interviews' && <VideoInterviewScheduler />}
                    {activeTab === 'assessments' && <SkillAssessmentPortal />}
                    {activeTab === 'referrals' && <ReferralLeaderboard />}
                    {activeTab === 'diversity' && <DiversityAnalyticsDashboard />}
                    {activeTab === 'experience' && <CandidateExperienceSurvey />}
                    {activeTab === 'talentPool' && <TalentPoolSegmentation />}
                    {activeTab === 'templates' && <InterviewFeedbackTemplates />}
                    {activeTab === 'negotiations' && <OfferNegotiationTracker />}
                    {activeTab === 'campus' && <CampusRecruitmentModule />}
                </div>
            </div>
        </div>
    );
}
