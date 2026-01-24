/**
 * Interview Feedback Service
 * Manages interview feedback and links it to employee onboarding
 */

import { linkInterviewToOnboarding } from './hiringFlow';

/**
 * Submit interview feedback for a candidate
 */
export const submitInterviewFeedback = (candidateId, feedback) => {
    const feedbackData = {
        candidateId,
        interviewerId: feedback.interviewerId,
        interviewerName: feedback.interviewerName,
        date: new Date().toISOString().split('T')[0],

        // Technical Assessment
        technicalSkills: {
            programming: feedback.technicalSkills?.programming || 0,
            problemSolving: feedback.technicalSkills?.problemSolving || 0,
            systemDesign: feedback.technicalSkills?.systemDesign || 0,
            codeQuality: feedback.technicalSkills?.codeQuality || 0
        },

        // Soft Skills
        softSkills: {
            communication: feedback.softSkills?.communication || 0,
            teamwork: feedback.softSkills?.teamwork || 0,
            leadership: feedback.softSkills?.leadership || 0,
            adaptability: feedback.softSkills?.adaptability || 0
        },

        // Overall Assessment
        cultureFit: feedback.cultureFit || 0,
        overallRating: feedback.overallRating || 0,

        // Detailed Feedback
        strengths: feedback.strengths || [],
        areasForDevelopment: feedback.areasForDevelopment || [],
        notes: feedback.notes || '',

        // Recommendation
        recommendation: feedback.recommendation || 'pending', // 'hire', 'reject', 'pending'

        timestamp: new Date().toISOString()
    };

    // Store feedback
    const allFeedback = JSON.parse(localStorage.getItem('interviewFeedback') || '[]');
    allFeedback.push(feedbackData);
    localStorage.setItem('interviewFeedback', JSON.stringify(allFeedback));

    // If candidate is hired, link feedback to onboarding
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const candidate = candidates.find(c => c.id === candidateId);

    if (candidate && candidate.status === 'Hired') {
        linkInterviewToOnboarding(candidateId, feedbackData);
    }

    return feedbackData;
};

/**
 * Get interview feedback for a candidate
 */
export const getInterviewFeedback = (candidateId) => {
    const allFeedback = JSON.parse(localStorage.getItem('interviewFeedback') || '[]');
    return allFeedback.filter(f => f.candidateId === candidateId);
};

/**
 * Get all interview feedback
 */
export const getAllInterviewFeedback = () => {
    return JSON.parse(localStorage.getItem('interviewFeedback') || '[]');
};

/**
 * Calculate average ratings from multiple interview rounds
 */
export const calculateAverageRatings = (candidateId) => {
    const feedback = getInterviewFeedback(candidateId);

    if (feedback.length === 0) {
        return null;
    }

    const avgTechnical = {
        programming: average(feedback.map(f => f.technicalSkills.programming)),
        problemSolving: average(feedback.map(f => f.technicalSkills.problemSolving)),
        systemDesign: average(feedback.map(f => f.technicalSkills.systemDesign)),
        codeQuality: average(feedback.map(f => f.technicalSkills.codeQuality))
    };

    const avgSoftSkills = {
        communication: average(feedback.map(f => f.softSkills.communication)),
        teamwork: average(feedback.map(f => f.softSkills.teamwork)),
        leadership: average(feedback.map(f => f.softSkills.leadership)),
        adaptability: average(feedback.map(f => f.softSkills.adaptability))
    };

    return {
        technical: avgTechnical,
        soft: avgSoftSkills,
        cultureFit: average(feedback.map(f => f.cultureFit)),
        overall: average(feedback.map(f => f.overallRating)),
        totalRounds: feedback.length
    };
};

/**
 * Helper function to calculate average
 */
const average = (numbers) => {
    if (numbers.length === 0) return 0;
    return (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1);
};

/**
 * Generate personalized onboarding plan based on interview feedback
 */
export const generatePersonalizedOnboarding = (candidateId) => {
    const feedback = getInterviewFeedback(candidateId);
    const avgRatings = calculateAverageRatings(candidateId);

    if (!avgRatings) {
        return getDefaultOnboardingPlan();
    }

    const plan = {
        candidateId,
        focusAreas: [],
        trainingModules: [],
        mentorshipNeeds: [],
        timeline: '90 days'
    };

    // Identify areas needing improvement (rating < 3.5)
    if (avgRatings.technical.programming < 3.5) {
        plan.focusAreas.push('Programming Skills Enhancement');
        plan.trainingModules.push({
            title: 'Advanced Programming Techniques',
            duration: '2 weeks',
            priority: 'High'
        });
    }

    if (avgRatings.technical.systemDesign < 3.5) {
        plan.focusAreas.push('System Design & Architecture');
        plan.trainingModules.push({
            title: 'System Design Fundamentals',
            duration: '3 weeks',
            priority: 'High'
        });
    }

    if (avgRatings.soft.communication < 3.5) {
        plan.focusAreas.push('Communication Skills');
        plan.mentorshipNeeds.push('Communication & Presentation Skills Mentor');
    }

    if (avgRatings.soft.leadership < 3.5) {
        plan.focusAreas.push('Leadership Development');
        plan.trainingModules.push({
            title: 'Leadership Essentials',
            duration: '4 weeks',
            priority: 'Medium'
        });
    }

    // Add strengths-based opportunities
    const allStrengths = feedback.flatMap(f => f.strengths);
    plan.strengths = [...new Set(allStrengths)];

    // Add areas for development
    const allAreas = feedback.flatMap(f => f.areasForDevelopment);
    plan.developmentAreas = [...new Set(allAreas)];

    return plan;
};

/**
 * Get default onboarding plan
 */
const getDefaultOnboardingPlan = () => {
    return {
        focusAreas: ['General Onboarding'],
        trainingModules: [
            { title: 'Company Orientation', duration: '1 week', priority: 'High' },
            { title: 'Role-specific Training', duration: '2 weeks', priority: 'High' }
        ],
        mentorshipNeeds: [],
        timeline: '90 days'
    };
};
