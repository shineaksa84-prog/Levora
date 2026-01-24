/**
 * Candidate Experience Service
 * Manages post-interview NPS surveys and candidate feedback collection
 */

const MOCK_SURVEY_RESPONSES = [
    {
        id: 'sr1',
        candidateId: 'c1',
        candidateName: 'Alice Freeman',
        role: 'Senior React Developer',
        npsScore: 9,
        category: 'Promoter',
        submittedAt: '2024-12-10',
        feedback: 'The interview process was smooth and professional. The team was welcoming and the technical challenge was fair.',
        interviewStage: 'Final Round',
        interviewer: 'Sarah Chen',
        sentiment: 'Positive',
        tags: ['Communication', 'Professionalism']
    },
    {
        id: 'sr2',
        candidateId: 'c2',
        candidateName: 'Bob Smith',
        role: 'Product Manager',
        npsScore: 7,
        category: 'Passive',
        submittedAt: '2024-12-12',
        feedback: 'Good experience overall, but the timeline was a bit unclear at times.',
        interviewStage: 'Phone Screen',
        interviewer: 'Mike Ross',
        sentiment: 'Neutral',
        tags: ['Timeline Clarity']
    },
    {
        id: 'sr3',
        candidateId: 'c3',
        candidateName: 'Charlie Brown',
        role: 'UX Designer',
        npsScore: 10,
        category: 'Promoter',
        submittedAt: '2024-12-14',
        feedback: 'Exceptional experience! The recruiter was responsive and the design challenge was creative and relevant.',
        interviewStage: 'Technical Round',
        interviewer: 'Elena G.',
        sentiment: 'Positive',
        tags: ['Responsiveness', 'Relevant Challenge']
    },
    {
        id: 'sr4',
        candidateId: 'c4',
        candidateName: 'Diana Prince',
        role: 'Backend Engineer',
        npsScore: 5,
        category: 'Detractor',
        submittedAt: '2024-12-08',
        feedback: 'The process took too long and I didn\'t receive feedback after my technical interview.',
        interviewStage: 'Technical Round',
        interviewer: 'John Doe',
        sentiment: 'Negative',
        tags: ['Delayed Feedback', 'Long Process']
    },
    {
        id: 'sr5',
        candidateId: 'c5',
        candidateName: 'Evan Wright',
        role: 'Data Scientist',
        npsScore: 8,
        category: 'Promoter',
        submittedAt: '2024-12-15',
        feedback: 'Great experience. The team was knowledgeable and the questions were challenging but fair.',
        interviewStage: 'Final Round',
        interviewer: 'Jane Smith',
        sentiment: 'Positive',
        tags: ['Challenging Questions', 'Knowledgeable Team']
    }
];

/**
 * Get all survey responses
 */
export const getSurveyResponses = async () => {
    return Promise.resolve(MOCK_SURVEY_RESPONSES);
};

/**
 * Get survey responses for a specific candidate
 */
export const getCandidateSurvey = async (candidateId) => {
    const response = MOCK_SURVEY_RESPONSES.find(r => r.candidateId === candidateId);
    return Promise.resolve(response || null);
};

/**
 * Submit a new survey response
 */
export const submitSurvey = async (surveyData) => {
    const newResponse = {
        id: `sr${Date.now()}`,
        ...surveyData,
        category: categorizeNPS(surveyData.npsScore),
        submittedAt: new Date().toISOString().split('T')[0],
        sentiment: analyzeSentiment(surveyData.feedback)
    };

    MOCK_SURVEY_RESPONSES.push(newResponse);
    return Promise.resolve(newResponse);
};

/**
 * Categorize NPS score
 * 0-6: Detractor
 * 7-8: Passive
 * 9-10: Promoter
 */
const categorizeNPS = (score) => {
    if (score >= 9) return 'Promoter';
    if (score >= 7) return 'Passive';
    return 'Detractor';
};

/**
 * Simple sentiment analysis based on keywords
 */
const analyzeSentiment = (feedback) => {
    const positive = ['great', 'excellent', 'smooth', 'professional', 'responsive', 'exceptional', 'good'];
    const negative = ['long', 'delayed', 'unclear', 'poor', 'bad', 'slow', 'unprofessional'];

    const lowerFeedback = feedback.toLowerCase();
    const positiveCount = positive.filter(word => lowerFeedback.includes(word)).length;
    const negativeCount = negative.filter(word => lowerFeedback.includes(word)).length;

    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
};

/**
 * Calculate NPS metrics
 */
export const calculateNPSMetrics = async () => {
    const responses = await getSurveyResponses();

    const promoters = responses.filter(r => r.category === 'Promoter').length;
    const passives = responses.filter(r => r.category === 'Passive').length;
    const detractors = responses.filter(r => r.category === 'Detractor').length;
    const total = responses.length;

    const npsScore = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0;

    return {
        npsScore,
        promoters,
        passives,
        detractors,
        total,
        promoterPercentage: total > 0 ? Math.round((promoters / total) * 100) : 0,
        passivePercentage: total > 0 ? Math.round((passives / total) * 100) : 0,
        detractorPercentage: total > 0 ? Math.round((detractors / total) * 100) : 0
    };
};

/**
 * Get common feedback themes
 */
export const getFeedbackThemes = async () => {
    const responses = await getSurveyResponses();
    const allTags = responses.flatMap(r => r.tags);

    const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Get sentiment distribution
 */
export const getSentimentDistribution = async () => {
    const responses = await getSurveyResponses();

    const positive = responses.filter(r => r.sentiment === 'Positive').length;
    const neutral = responses.filter(r => r.sentiment === 'Neutral').length;
    const negative = responses.filter(r => r.sentiment === 'Negative').length;

    return {
        positive,
        neutral,
        negative,
        total: responses.length
    };
};

/**
 * Get responses by date range
 */
export const getResponsesByDateRange = async (startDate, endDate) => {
    const responses = await getSurveyResponses();

    return responses.filter(r => {
        const responseDate = new Date(r.submittedAt);
        return responseDate >= new Date(startDate) && responseDate <= new Date(endDate);
    });
};

/**
 * Get action items based on negative feedback
 */
export const getActionItems = async () => {
    const responses = await getSurveyResponses();
    const detractors = responses.filter(r => r.category === 'Detractor');

    const actionItems = [];

    detractors.forEach(response => {
        if (response.tags.includes('Delayed Feedback')) {
            actionItems.push({
                priority: 'High',
                category: 'Process Improvement',
                action: 'Implement automated feedback reminders for interviewers',
                relatedTo: response.candidateName,
                impact: 'Reduce time-to-feedback by 50%'
            });
        }
        if (response.tags.includes('Long Process')) {
            actionItems.push({
                priority: 'Medium',
                category: 'Timeline Optimization',
                action: 'Review and streamline interview stages',
                relatedTo: response.candidateName,
                impact: 'Reduce average time-to-hire by 3-5 days'
            });
        }
        if (response.tags.includes('Timeline Clarity')) {
            actionItems.push({
                priority: 'Medium',
                category: 'Communication',
                action: 'Create standardized timeline communication template',
                relatedTo: response.candidateName,
                impact: 'Improve candidate clarity and reduce anxiety'
            });
        }
    });

    return actionItems;
};

export default {
    getSurveyResponses,
    getCandidateSurvey,
    submitSurvey,
    calculateNPSMetrics,
    getFeedbackThemes,
    getSentimentDistribution,
    getResponsesByDateRange,
    getActionItems
};
