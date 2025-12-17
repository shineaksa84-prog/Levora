// Gemini AI Service
// This is a mock implementation. Replace with actual Gemini API calls.

class GeminiService {
    constructor(apiKey) {
        this.apiKey = apiKey || 'YOUR_GEMINI_API_KEY';
    }

    /**
     * Parse resume text and extract structured data
     */
    async parseResume(resumeText) {
        // Mock implementation - replace with actual Gemini API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "Extracted Name",
                    email: "email@example.com",
                    phone: "+91-XXXXXXXXXX",
                    skills: ["JavaScript", "React", "Node.js", "Python"],
                    experience: [
                        {
                            company: "Tech Corp",
                            role: "Software Engineer",
                            duration: "2020-2023",
                            description: "Developed web applications"
                        }
                    ],
                    education: [
                        {
                            degree: "B.Tech in Computer Science",
                            institution: "IIT Delhi",
                            year: "2020"
                        }
                    ],
                    summary: "Experienced software engineer with 3+ years in web development"
                });
            }, 1500);
        });
    }

    /**
     * Parse email content and extract candidate information
     */
    async parseEmail(emailContent) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    candidateName: "John Doe",
                    candidateEmail: "john@example.com",
                    subject: "Application for Software Engineer",
                    hasResume: true,
                    intent: "job_application",
                    extractedInfo: {
                        position: "Software Engineer",
                        experience: "3 years",
                        currentCompany: "ABC Tech"
                    }
                });
            }, 1000);
        });
    }

    /**
     * Optimize job description
     */
    async optimizeJobDescription(jobDescription) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    original: jobDescription,
                    optimized: jobDescription + "\n\nOptimized for clarity and inclusivity.",
                    suggestions: [
                        "Use gender-neutral language",
                        "Clarify required vs preferred qualifications",
                        "Add salary range for transparency"
                    ],
                    inclusivityScore: 85,
                    clarityScore: 90
                });
            }, 2000);
        });
    }

    /**
     * Match candidate to job
     */
    /**
     * Match candidate to job with detailed scoring
     */
    async matchCandidateToJob(candidateProfile, jobRequirements) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 1. Skills Match (30%)
                const requiredSkills = jobRequirements.requiredSkills || [];
                const candidateSkills = candidateProfile.skills || [];
                const matchedSkills = requiredSkills.filter(skill =>
                    candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
                );
                const missingSkills = requiredSkills.filter(skill =>
                    !candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
                );

                const skillScore = requiredSkills.length > 0
                    ? (matchedSkills.length / requiredSkills.length) * 100
                    : 100;

                // 2. Experience Match (25%)
                // Mock logic: assume string parsing "X years" -> number
                const reqExp = parseInt(jobRequirements.minExperience) || 0;
                const candExp = parseInt(candidateProfile.experience) || 0;
                let expScore = 0;
                if (candExp >= reqExp) expScore = 100;
                else if (candExp >= reqExp - 1) expScore = 70;
                else expScore = 40;

                // 3. Location Match (15%)
                const jobLoc = jobRequirements.location || '';
                const candLoc = candidateProfile.location || '';
                const locationScore = (jobLoc.toLowerCase() === candLoc.toLowerCase() || jobLoc === 'Remote') ? 100 : 0;

                // 4. Salary Match (10%) - Mock logic
                const salaryScore = 80; // Placeholder

                // 5. Culture Fit (10%) - Mock logic based on keywords
                const cultureScore = 85; // Placeholder

                // 6. Availability (10%) - Mock logic
                const availabilityScore = 90; // Placeholder

                // Calculate Weighted Score
                const overallScore = Math.round(
                    (skillScore * 0.30) +
                    (expScore * 0.25) +
                    (locationScore * 0.15) +
                    (salaryScore * 0.10) +
                    (cultureScore * 0.10) +
                    (availabilityScore * 0.10)
                );

                // Generate Reasoning
                let reasoning = [];
                if (skillScore > 80) reasoning.push("Strong technical skills match.");
                else if (skillScore < 50) reasoning.push("Missing key technical skills.");

                if (expScore === 100) reasoning.push("Meets experience requirements.");
                else if (expScore < 50) reasoning.push("Less experience than required.");

                if (locationScore === 100) reasoning.push("Location preference aligns.");

                const recommendation = overallScore >= 85 ? "Strong Match" :
                    overallScore >= 70 ? "Good Match" :
                        overallScore >= 50 ? "Potential Match" : "Low Match";

                resolve({
                    overallScore,
                    breakdown: {
                        skills: Math.round(skillScore),
                        experience: expScore,
                        location: locationScore,
                        salary: salaryScore,
                        culture: cultureScore,
                        availability: availabilityScore
                    },
                    matchedSkills,
                    missingSkills,
                    recommendation,
                    reasoning: reasoning.join(" ")
                });
            }, 1000);
        });
    }

    /**
     * Generate interview questions
     */
    async generateInterviewQuestions(jobDescription, questionType = 'mixed') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    technical: [
                        "Explain the difference between var, let, and const in JavaScript.",
                        "How would you optimize a slow React application?",
                        "Describe your experience with RESTful API design."
                    ],
                    behavioral: [
                        "Tell me about a time you faced a challenging bug. How did you resolve it?",
                        "How do you handle disagreements with team members?",
                        "Describe a project you're most proud of."
                    ],
                    situational: [
                        "If you had to learn a new technology in 2 weeks, how would you approach it?",
                        "How would you handle a situation where a project deadline is at risk?"
                    ]
                });
            }, 1500);
        });
    }

    /**
     * Generate workflow from natural language
     */
    async generateWorkflow(description) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "Auto-generated Workflow",
                    trigger: {
                        type: "status_change",
                        condition: "candidate.status === 'shortlisted'"
                    },
                    actions: [
                        {
                            type: "send_email",
                            template: "interview_invitation",
                            to: "candidate.email"
                        },
                        {
                            type: "schedule_interview",
                            duration: 60,
                            interviewType: "technical"
                        },
                        {
                            type: "notify",
                            recipients: ["recruiter", "hiring_manager"],
                            message: "New candidate shortlisted"
                        }
                    ]
                });
            }, 2000);
        });
    }

    /**
     * Analyze sentiment from text
     */
    async analyzeSentiment(text) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    sentiment: "positive",
                    score: 0.75,
                    confidence: 0.85,
                    emotions: {
                        joy: 0.6,
                        confidence: 0.7,
                        neutral: 0.3
                    }
                });
            }, 1000);
        });
    }

    /**
     * Generate personalized message
     */
    async generateMessage(context, messageType) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const messages = {
                    rejection: "Thank you for your interest in our company. While your background is impressive, we've decided to move forward with other candidates whose experience more closely aligns with our current needs.",
                    interview_invitation: "We're impressed with your application and would like to invite you for an interview. Please let us know your availability.",
                    offer: "We're pleased to extend an offer for the position. We believe your skills and experience will be a great addition to our team."
                };

                resolve({
                    message: messages[messageType] || "Generated message based on context.",
                    tone: "professional",
                    personalization: ["candidate_name", "position", "company"]
                });
            }, 1500);
        });
    }
    /**
     * Chat with HR Assistant
     */
    async chat(message, history = []) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple keyword-based mock response logic
                const lowerMsg = message.toLowerCase();
                let response = "I'm not sure how to help with that yet. Could you try asking about job descriptions, candidates, or interview questions?";

                if (lowerMsg.includes('job description') || lowerMsg.includes('jd')) {
                    response = "I can help you draft a job description. What is the job title and key requirements?";
                } else if (lowerMsg.includes('candidate') || lowerMsg.includes('resume')) {
                    response = "I can analyze candidate resumes or help you find the best match for a role. You can upload resumes in the Resume Parser tab.";
                } else if (lowerMsg.includes('interview') || lowerMsg.includes('question')) {
                    response = "I can generate interview questions for you. What role are you interviewing for?";
                } else if (lowerMsg.includes('salary') || lowerMsg.includes('compensation')) {
                    response = "I can provide salary benchmarks based on market data. Which role and location are you interested in?";
                } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                    response = "Hello! How can I assist you with your HR tasks today?";
                }

                resolve({
                    content: response,
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });
    }
}

// Export singleton instance
export const geminiService = new GeminiService();
export default GeminiService;
