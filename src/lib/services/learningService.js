import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';

/**
 * Learning & Development Service
 * Handles training, courses, skills matrix, and learning paths
 */

// ============= TRAINING MANAGEMENT =============

/**
 * Get all available courses
 */
export async function getCourses(filters = {}) {
    // Mock data
    return [
        {
            id: 'course_1',
            title: 'Advanced HR Analytics',
            description: 'Master data-driven HR decision making with advanced analytics techniques',
            category: 'Analytics',
            type: 'online',
            provider: 'Internal',
            duration: '40 hours',
            level: 'Advanced',
            skills: ['Data Analysis', 'HR Metrics', 'Predictive Analytics'],
            rating: 4.8,
            enrollments: 45,
            thumbnail: 'https://via.placeholder.com/300x200',
            status: 'active'
        },
        {
            id: 'course_2',
            title: 'Leadership Essentials',
            description: 'Develop core leadership skills for managing teams effectively',
            category: 'Leadership',
            type: 'hybrid',
            provider: 'External',
            duration: '24 hours',
            level: 'Intermediate',
            skills: ['Leadership', 'Team Management', 'Communication'],
            rating: 4.6,
            enrollments: 78,
            thumbnail: 'https://via.placeholder.com/300x200',
            status: 'active'
        },
        {
            id: 'course_3',
            title: 'AI in Recruitment',
            description: 'Learn how to leverage AI tools for modern recruitment',
            category: 'Recruitment',
            type: 'online',
            provider: 'Internal',
            duration: '16 hours',
            level: 'Beginner',
            skills: ['AI Tools', 'Recruitment', 'Automation'],
            rating: 4.9,
            enrollments: 92,
            thumbnail: 'https://via.placeholder.com/300x200',
            status: 'active'
        }
    ];
}

/**
 * Enroll in a course
 */
export async function enrollInCourse(employeeId, courseId) {
    const enrollment = {
        id: `enrollment_${Date.now()}`,
        employeeId,
        courseId,
        status: 'in-progress',
        progress: 0,
        enrolledAt: new Date().toISOString(),
        completedAt: null
    };

    // await addDoc(collection(db, 'learning/enrollments'), enrollment);
    return enrollment;
}

/**
 * Get employee enrollments
 */
export async function getEmployeeEnrollments(employeeId) {
    // Mock data
    return [
        {
            id: 'enroll_1',
            employeeId,
            courseId: 'course_1',
            courseTitle: 'Advanced HR Analytics',
            status: 'in-progress',
            progress: 65,
            enrolledAt: '2024-01-10T00:00:00Z',
            dueDate: '2024-03-10',
            completedAt: null
        },
        {
            id: 'enroll_2',
            employeeId,
            courseId: 'course_3',
            courseTitle: 'AI in Recruitment',
            status: 'completed',
            progress: 100,
            enrolledAt: '2023-11-01T00:00:00Z',
            completedAt: '2023-12-15T00:00:00Z',
            certificateUrl: '/certificates/cert_123.pdf',
            score: 92
        }
    ];
}

/**
 * Update course progress
 */
export async function updateCourseProgress(enrollmentId, progress) {
    const updates = {
        progress,
        updatedAt: new Date().toISOString()
    };

    if (progress >= 100) {
        updates.status = 'completed';
        updates.completedAt = new Date().toISOString();
    }

    // await updateDoc(doc(db, 'learning/enrollments', enrollmentId), updates);
    return updates;
}

// ============= SKILLS MATRIX =============

/**
 * Get all available skills
 */
export async function getAllSkills() {
    // Mock data - comprehensive skills list
    return [
        // Technical Skills
        { id: 'skill_1', name: 'JavaScript', category: 'Technical', subcategory: 'Programming' },
        { id: 'skill_2', name: 'Python', category: 'Technical', subcategory: 'Programming' },
        { id: 'skill_3', name: 'React', category: 'Technical', subcategory: 'Frontend' },
        { id: 'skill_4', name: 'Node.js', category: 'Technical', subcategory: 'Backend' },
        { id: 'skill_5', name: 'SQL', category: 'Technical', subcategory: 'Database' },

        // HR Skills
        { id: 'skill_10', name: 'Recruitment', category: 'HR', subcategory: 'Talent Acquisition' },
        { id: 'skill_11', name: 'Onboarding', category: 'HR', subcategory: 'Talent Acquisition' },
        { id: 'skill_12', name: 'Performance Management', category: 'HR', subcategory: 'Talent Management' },
        { id: 'skill_13', name: 'Employee Relations', category: 'HR', subcategory: 'Employee Experience' },
        { id: 'skill_14', name: 'Compensation & Benefits', category: 'HR', subcategory: 'Total Rewards' },

        // Soft Skills
        { id: 'skill_20', name: 'Leadership', category: 'Soft Skills', subcategory: 'Management' },
        { id: 'skill_21', name: 'Communication', category: 'Soft Skills', subcategory: 'Interpersonal' },
        { id: 'skill_22', name: 'Problem Solving', category: 'Soft Skills', subcategory: 'Critical Thinking' },
        { id: 'skill_23', name: 'Teamwork', category: 'Soft Skills', subcategory: 'Collaboration' },
        { id: 'skill_24', name: 'Time Management', category: 'Soft Skills', subcategory: 'Productivity' },

        // Analytics
        { id: 'skill_30', name: 'Data Analysis', category: 'Analytics', subcategory: 'Data Science' },
        { id: 'skill_31', name: 'Excel Advanced', category: 'Analytics', subcategory: 'Tools' },
        { id: 'skill_32', name: 'Power BI', category: 'Analytics', subcategory: 'Visualization' },
        { id: 'skill_33', name: 'Tableau', category: 'Analytics', subcategory: 'Visualization' },
        { id: 'skill_34', name: 'Predictive Analytics', category: 'Analytics', subcategory: 'Advanced' }
    ];
}

/**
 * Get employee skills with proficiency levels
 */
export async function getEmployeeSkills(employeeId) {
    // Mock data
    return [
        { skillId: 'skill_10', skillName: 'Recruitment', proficiency: 5, lastAssessed: '2024-01-15', endorsements: 8 },
        { skillId: 'skill_12', skillName: 'Performance Management', proficiency: 4, lastAssessed: '2024-01-10', endorsements: 5 },
        { skillId: 'skill_20', skillName: 'Leadership', proficiency: 4, lastAssessed: '2023-12-20', endorsements: 6 },
        { skillId: 'skill_21', skillName: 'Communication', proficiency: 5, lastAssessed: '2024-01-05', endorsements: 12 },
        { skillId: 'skill_30', skillName: 'Data Analysis', proficiency: 3, lastAssessed: '2023-11-30', endorsements: 3 }
    ];
}

/**
 * Update employee skill proficiency
 */
export async function updateSkillProficiency(employeeId, skillId, proficiency) {
    const skillUpdate = {
        employeeId,
        skillId,
        proficiency,
        lastAssessed: new Date().toISOString()
    };

    // await updateDoc(doc(db, 'learning/employeeSkills', `${employeeId}_${skillId}`), skillUpdate);
    return skillUpdate;
}

/**
 * Identify skill gaps
 */
export async function identifySkillGaps(employeeId, targetRole) {
    // Mock skill gap analysis
    return {
        currentSkills: [
            { skill: 'Recruitment', current: 5, required: 5, gap: 0 },
            { skill: 'Data Analysis', current: 3, required: 4, gap: 1 },
            { skill: 'Leadership', current: 4, required: 5, gap: 1 }
        ],
        missingSkills: [
            { skill: 'Predictive Analytics', required: 4, gap: 4 },
            { skill: 'Strategic Planning', required: 4, gap: 4 }
        ],
        recommendations: [
            { courseId: 'course_1', courseTitle: 'Advanced HR Analytics', relevance: 'high' },
            { courseId: 'course_2', courseTitle: 'Leadership Essentials', relevance: 'medium' }
        ]
    };
}

// ============= LEARNING PATHS =============

/**
 * Get learning paths
 */
export async function getLearningPaths(filters = {}) {
    // Mock data
    return [
        {
            id: 'path_1',
            title: 'HR Analytics Professional',
            description: 'Complete path to become an HR analytics expert',
            role: 'HR Analyst',
            duration: '6 months',
            courses: ['course_1', 'course_30', 'course_31'],
            skills: ['Data Analysis', 'HR Metrics', 'Predictive Analytics', 'Power BI'],
            level: 'Intermediate to Advanced',
            enrollments: 23,
            completions: 8
        },
        {
            id: 'path_2',
            title: 'Recruitment Specialist',
            description: 'Master modern recruitment techniques and tools',
            role: 'Recruiter',
            duration: '3 months',
            courses: ['course_3', 'course_10', 'course_11'],
            skills: ['Recruitment', 'AI Tools', 'Candidate Assessment', 'Employer Branding'],
            level: 'Beginner to Intermediate',
            enrollments: 45,
            completions: 18
        }
    ];
}

/**
 * Get personalized learning recommendations
 */
export async function getPersonalizedRecommendations(employeeId) {
    // Mock AI-powered recommendations
    return [
        {
            courseId: 'course_1',
            courseTitle: 'Advanced HR Analytics',
            reason: 'Based on your current role and skill gaps',
            relevance: 95,
            estimatedImpact: 'high'
        },
        {
            courseId: 'course_2',
            courseTitle: 'Leadership Essentials',
            reason: 'Recommended for your career progression',
            relevance: 88,
            estimatedImpact: 'high'
        },
        {
            courseId: 'course_3',
            courseTitle: 'AI in Recruitment',
            reason: 'Trending in your department',
            relevance: 75,
            estimatedImpact: 'medium'
        }
    ];
}

/**
 * Get team skills overview
 */
export async function getTeamSkillsOverview(teamId) {
    // Mock team skills data
    return {
        teamSize: 12,
        totalSkills: 45,
        averageProficiency: 3.8,
        topSkills: [
            { skill: 'Recruitment', avgProficiency: 4.5, coverage: 100 },
            { skill: 'Communication', avgProficiency: 4.2, coverage: 100 },
            { skill: 'Data Analysis', avgProficiency: 3.5, coverage: 75 }
        ],
        skillGaps: [
            { skill: 'Predictive Analytics', coverage: 25, avgProficiency: 2.0 },
            { skill: 'AI Tools', coverage: 33, avgProficiency: 2.5 }
        ]
    };
}

export default {
    getCourses,
    enrollInCourse,
    getEmployeeEnrollments,
    updateCourseProgress,
    getAllSkills,
    getEmployeeSkills,
    updateSkillProficiency,
    identifySkillGaps,
    getLearningPaths,
    getPersonalizedRecommendations,
    getTeamSkillsOverview
};
