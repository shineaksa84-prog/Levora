// Gemini AI Service
// Uses Google's Gemini Pro API with fallback to mock data

class GeminiService {
    constructor() {
        this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || '';
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    }

    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('GEMINI_API_KEY', key);
    }

    async callGeminiAPI(prompt, systemInstruction = '') {
        if (!this.apiKey) return null;

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    // system_instruction: { parts: [{ text: systemInstruction }] } // Note: Check API version for system support
                })
            });

            if (!response.ok) throw new Error('Gemini API Error');

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.warn('Gemini API call failed, falling back to mock:', error);
            return null;
        }
    }

    /**
     * Chat with HR Assistant
     */
    async chat(message, history = []) {
        // Try Real AI
        const realResponse = await this.callGeminiAPI(
            `You are an expert HR AI Assistant named Levora. Help the user with: ${message}. 
            Context: ${JSON.stringify(history.slice(-3))}. 
            Keep it professional, helpful, and concise.`
        );

        if (realResponse) {
            return {
                content: realResponse,
                timestamp: new Date().toISOString()
            };
        }

        // Fallback Mock
        return new Promise((resolve) => {
            setTimeout(() => {
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
                    response = "Hello! I am Levora AI, your advanced HR assistant. I can help with recruiting, analysis, and drafting documents. How can I assist?";
                }

                resolve({
                    content: response,
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });
    }

    /**
     * Optimize job description
     */
    async optimizeJobDescription(jobDescription) {
        const realResponse = await this.callGeminiAPI(
            `Optimize this job description for clarity, inclusivity, and impact. Return valid JSON only with keys: original, optimized, suggestions (array), inclusivityScore (number), clarityScore (number).
            JD: ${jobDescription}`
        );

        if (realResponse) {
            try {
                // Attempt to clean markdown json blocks if present
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) {
                console.error("Failed to parse Gemini JSON", e);
            }
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    original: jobDescription,
                    optimized: jobDescription + "\n\n[Optimized: Enhanced for gender-neutral language and clearer structure.]",
                    suggestions: [
                        "Use gender-neutral language (e.g., 'they' instead of 'he/she')",
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
     * Generate interview questions
     */
    async generateInterviewQuestions(jobDescription, questionType = 'mixed') {
        const realResponse = await this.callGeminiAPI(
            `Generate 3 technical, 3 behavioral, and 2 situational interview questions for this role. Return valid JSON with keys: technical, behavioral, situational (arrays of strings).
            Role Context: ${jobDescription}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    technical: [
                        "Explain the difference between var, let, and const.",
                        "How would you optimize a slow application?",
                        "Describe your experience with this tech stack."
                    ],
                    behavioral: [
                        "Tell me about a time you faced a challenging bug.",
                        "How do you handle conflict?",
                        "Describe a project you're proud of."
                    ],
                    situational: [
                        "If you had to learn a new tool in 2 days, how would you start?",
                        "How would you handle a missed deadline?"
                    ]
                });
            }, 1500);
        });
    }

    // ... Other methods (parseResume, parseEmail, etc.) can keep their mocks or be upgraded similarly ...

    // Keeping existing mock methods for stability where simple logic suffices for demo
    async parseResume(resumeText) {
        const realResponse = await this.callGeminiAPI(
            `Extract structured information from this resume text. Return valid JSON only with keys: 
            name, email, phone, skills (array), 
            experience (array of objects with company, role, duration, description), 
            education (array of objects with degree, institution, year), 
            summary (string).
            
            Resume Text: ${resumeText}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) {
                console.error("Failed to parse Gemini Resume JSON", e);
            }
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "Extracted Name",
                    email: "email@example.com",
                    phone: "+91-XXXXXXXXXX",
                    skills: ["JavaScript", "React", "Node.js", "Python"],
                    experience: [{ company: "Tech Corp", role: "Software Engineer", duration: "2020-2023", description: "Developed web applications" }],
                    education: [{ degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2020" }],
                    summary: "Experienced software engineer with 3+ years in web development"
                });
            }, 1000);
        });
    }

    async parseEmail(emailContent) {
        const realResponse = await this.callGeminiAPI(
            `Analyze this email content. Return valid JSON only with keys:
            candidateName, candidateEmail, subject, hasResume (boolean), intent (job_application, inquiry, resignation, other),
            extractedInfo (object).
            
            Email: ${emailContent}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return new Promise(resolve => setTimeout(() => resolve({
            candidateName: "John Doe", candidateEmail: "john@example.com", subject: "Application", hasResume: true, intent: "job_application",
            extractedInfo: { position: "Software Engineer", experience: "3 years", currentCompany: "ABC Tech" }
        }), 1000));
    }

    async generateWorkflow(description) {
        const realResponse = await this.callGeminiAPI(
            `Generate an automation workflow for HR based on this description: "${description}". 
            Return valid JSON only with keys: name, trigger (object with type, condition), actions (array of objects with type, template/duration, to/recipients).
            
            Example triggers: status_change, application_received, document_upload.
            Example actions: send_email, schedule_interview, notify, create_task.`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return new Promise(resolve => setTimeout(() => resolve({
            name: "Auto-generated Workflow", trigger: { type: "status_change", condition: "candidate.status === 'shortlisted'" },
            actions: [{ type: "send_email", template: "interview_invitation", to: "candidate.email" }, { type: "schedule_interview", duration: 60, interviewType: "technical" }, { type: "notify", recipients: ["recruiter"], message: "New candidate shortlisted" }]
        }), 2000));
    }

    /**
     * Analyze employee grievance
     */
    async analyzeGrievance(text) {
        const realResponse = await this.callGeminiAPI(
            `Analyze this employee grievance report for severity and policy violations. Return valid JSON only with keys:
            category (string), sentiment (string, e.g. "Negative (-0.8)"), severity (string, e.g. "High (8/10)"), 
            summary (string, concise), recommendation (string, actionable).
            
            Report: ${text}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return {
            category: 'General Inquiry',
            sentiment: 'Neutral',
            severity: 'Low',
            summary: 'Analysis failed, using fallback.',
            recommendation: 'Review manually.'
        };
    }

    /**
     * Generate HR Analytics Insights
     */
    async generateAnalyticsInsights(dataSummary) {
        const realResponse = await this.callGeminiAPI(
            `Based on this HR data summary, provide 3 key insights. Return valid JSON only as an array of objects with keys:
            text (string), status (success, info, warning - based on the trend).
            
            Data Summary: ${JSON.stringify(dataSummary)}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return [
            { text: "Time to hire has decreased by 15% over the last 3 months.", status: 'success' },
            { text: "LinkedIn remains the top performing source.", status: 'info' },
            { text: "Engineering attrition risk is slightly elevated.", status: 'warning' }
        ];
    }

    /**
     * Generate Wellness/Mood tip
     */
    async generateWellnessTip(moodLabel) {
        const realResponse = await this.callGeminiAPI(
            `The employee is feeling "${moodLabel}" today. Generate a short, one-sentence wellness tip or encouraging message. 
            Return valid JSON only with key: tip.`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                const data = JSON.parse(cleanJson);
                return data.tip;
            } catch (e) { console.error(e); }
        }

        return "Taking regular short breaks improves focus and prevents burnout.";
    }

    async analyzeSentiment(text) {
        const realResponse = await this.callGeminiAPI(
            `Analyze the sentiment of this text. Return valid JSON only with keys:
            sentiment (positive, negative, neutral), score (0 to 1), confidence (0 to 1), emotions (object with joy, confidence, frustration, neutral scores).
            
            Text: ${text}`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return new Promise(resolve => setTimeout(() => resolve({
            sentiment: "positive", score: 0.75, confidence: 0.85, emotions: { joy: 0.6, confidence: 0.7, neutral: 0.3 }
        }), 1000));
    }

    async generateMessage(context, messageType) {
        // Using a simple template generator for now, could be AI
        return new Promise(resolve => setTimeout(() => {
            const messages = {
                rejection: "Thank you for your interest. We have decided to move forward with other candidates.",
                interview_invitation: "We'd like to invite you for an interview. Please share your availability.",
                offer: "We are pleased to offer you the position!"
            };
            resolve({ message: messages[messageType] || "Message", tone: "professional", personalization: [] });
        }, 1000));
    }

    async matchCandidateToJob(candidateProfile, jobRequirements) {
        const realResponse = await this.callGeminiAPI(
            `Compare this candidate profile with these job requirements. 
            Candidate: ${JSON.stringify(candidateProfile)}
            Job: ${JSON.stringify(jobRequirements)}
            
            Return valid JSON only with keys: 
            overallScore (0-100), 
            breakdown (object: skills, experience, location, cultural_fit), 
            matchedSkills (array), 
            missingSkills (array), 
            recommendation (Strong Match, Potential Match, No Match), 
            reasoning (summary string).`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        // Fallback Logic-based scorer
        return new Promise((resolve) => {
            setTimeout(() => {
                const requiredSkills = jobRequirements.requiredSkills || [];
                const candidateSkills = candidateProfile.skills || [];
                const matchedSkills = requiredSkills.filter(skill => candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase())));
                const missingSkills = requiredSkills.filter(skill => !candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase())));
                const skillScore = requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) * 100 : 100;

                const overallScore = Math.round(skillScore * 0.8 + 20); // Simple weight

                resolve({
                    overallScore,
                    breakdown: { skills: Math.round(skillScore), experience: 80, location: 100, salary: 80, culture: 85, availability: 90 },
                    matchedSkills,
                    missingSkills,
                    recommendation: overallScore > 80 ? "Strong Match" : "Potential Match",
                    reasoning: `Matched ${matchedSkills.length} of ${requiredSkills.length} required skills.`
                });
            }, 1000);
        });
    }

    /**
     * Get market salary benchmarks using AI
     */
    async getMarketSalaryData(role, location) {
        const realResponse = await this.callGeminiAPI(
            `Research the current market salary for "${role}" in "${location}". 
            Return valid JSON only with keys:
            role (string), location (string), currency (string, e.g. "INR"), 
            ranges (object: low, median, high - as numbers), 
            trend (string, e.g. "+5.4%"), 
            confidence (number, 0-100), 
            demandIndex (string, e.g. "High"),
            timeToFillAvg (number, days).`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return {
            role: role || 'Software Engineer',
            location: location || 'Bangalore, India',
            currency: 'INR',
            ranges: { low: 800000, median: 1500000, high: 2500000 },
            trend: '+8%',
            confidence: 85,
            demandIndex: 'High',
            timeToFillAvg: 35
        };
    }

    /**
     * Predict time to fill for a role
     */
    async predictTimeFill(inputs, historicalAvg = 45) {
        const realResponse = await this.callGeminiAPI(
            `Predict the time to fill a vacancy based on these parameters: ${JSON.stringify(inputs)}. 
            The historical company average is ${historicalAvg} days.
            Return valid JSON only with keys:
            days (number), confidence (number), range (string, e.g. "30-40 days"), 
            factors (array of objects with keys: name, impact, effect).`
        );

        if (realResponse) {
            try {
                const cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
                return JSON.parse(cleanJson);
            } catch (e) { console.error(e); }
        }

        return {
            days: historicalAvg,
            confidence: 75,
            range: `${historicalAvg - 5}-${historicalAvg + 5} days`,
            factors: [
                { name: 'Role Complexity', impact: 'Medium', effect: '+0 days' },
                { name: 'Market Demand', impact: 'High', effect: '+5 days' },
                { name: 'Internal Priority', impact: inputs.priority, effect: '-5 days' }
            ]
        };
    }
}

export const geminiService = new GeminiService();
export default GeminiService;
