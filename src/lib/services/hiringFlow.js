/**
 * Hiring Flow Service
 * Handles the conversion of candidates to employees and manages the hiring workflow
 */

import { generateId } from '../utils/helpers';
import { addNotification } from './notificationService';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';

/**
 * Convert a candidate to an employee
 * @param {Object} candidate - The candidate object
 * @param {Object} hiringDetails - Additional hiring details
 * @returns {Object} - The newly created employee object
 */
export const convertCandidateToEmployee = async (candidate, hiringDetails) => {
    try {
        const employee = {
            id: generateId(),
            // Basic Info from Candidate
            firstName: candidate.name?.split(' ')[0] || '',
            lastName: candidate.name?.split(' ').slice(1).join(' ') || '',
            email: candidate.email || '',
            phone: candidate.phone || '',

            // Hiring Details
            employeeId: hiringDetails.employeeId || `EMP${Date.now()}`,
            department: hiringDetails.department || '',
            position: candidate.role || hiringDetails.position || '',
            joiningDate: hiringDetails.joiningDate || new Date().toISOString().split('T')[0],
            salary: hiringDetails.salary || 0,
            employmentType: hiringDetails.employmentType || 'Full-time',

            // Location
            location: candidate.location || hiringDetails.location || '',
            workMode: hiringDetails.workMode || 'Hybrid',

            // Manager & Reporting
            reportingManager: hiringDetails.reportingManager || '',

            // Status
            status: 'Pending Onboarding',

            // Metadata
            candidateId: candidate.id,
            hiredDate: new Date().toISOString(),
            source: 'Recruitment',

            // Onboarding
            onboardingStatus: 'Not Started',
            onboardingTasks: generateOnboardingTasks(hiringDetails)
        };

        // Save to Firestore 'employees' collection
        await addDoc(collection(db, 'employees'), employee);

        // Update candidate status in Firestore
        // We need to find the document ID for the candidate. 
        // Assuming we kept the 'id' field in the document or can query by it.
        // For efficiency, best practice is to store the Firestore Doc ID, but we might not have it here easily 
        // without querying unless we changed the model to store it.
        // Let's query by internal ID for now to be safe.
        await updateFirestoreCandidateStatus(candidate.id, 'Hired');

        return employee;
    } catch (error) {
        console.error('Error converting candidate to employee:', error);
        throw error;
    }
};

/**
 * Generate onboarding tasks based on hiring details
 */
const generateOnboardingTasks = (hiringDetails) => {
    const baseTasks = [
        { id: 1, title: 'Complete documentation', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 1) },
        { id: 2, title: 'IT setup - laptop & accounts', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 0) },
        { id: 3, title: 'Office tour & introduction', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 1) },
        { id: 4, title: 'HR orientation', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 2) },
        { id: 5, title: 'Team introduction meeting', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 3) },
        { id: 6, title: 'Training schedule setup', status: 'pending', dueDate: addDays(hiringDetails.joiningDate, 5) }
    ];

    // Add department-specific tasks
    const deptTasks = getDepartmentSpecificTasks(hiringDetails.department, hiringDetails.joiningDate);

    return [...baseTasks, ...deptTasks];
};

/**
 * Get department-specific onboarding tasks
 */
const getDepartmentSpecificTasks = (department, joiningDate) => {
    const tasks = {
        'Engineering': [
            { id: 100, title: 'Setup development environment', status: 'pending', dueDate: addDays(joiningDate, 2) },
            { id: 101, title: 'Code repository access', status: 'pending', dueDate: addDays(joiningDate, 1) },
            { id: 102, title: 'Technical architecture overview', status: 'pending', dueDate: addDays(joiningDate, 3) }
        ],
        'Sales': [
            { id: 200, title: 'CRM system training', status: 'pending', dueDate: addDays(joiningDate, 2) },
            { id: 201, title: 'Product knowledge session', status: 'pending', dueDate: addDays(joiningDate, 3) },
            { id: 202, title: 'Sales process overview', status: 'pending', dueDate: addDays(joiningDate, 4) }
        ],
        'Marketing': [
            { id: 300, title: 'Brand guidelines review', status: 'pending', dueDate: addDays(joiningDate, 2) },
            { id: 301, title: 'Marketing tools access', status: 'pending', dueDate: addDays(joiningDate, 1) },
            { id: 302, title: 'Campaign strategy overview', status: 'pending', dueDate: addDays(joiningDate, 5) }
        ]
    };

    return tasks[department] || [];
};

/**
 * Update candidate status in Firestore
 */
const updateFirestoreCandidateStatus = async (candidateId, status, stage = null) => {
    try {
        const q = query(collection(db, 'candidates'), where('id', '==', candidateId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const data = querySnapshot.docs[0].data();

            const updates = { status };
            if (stage) updates.stage = stage;
            if (status === 'Hired') updates.hiredDate = new Date().toISOString();

            await updateDoc(docRef, updates);

            // Notify referrer
            if (data.referrerId) {
                addNotification(
                    data.referrerId,
                    'Referral Update',
                    `Your referral ${data.name} has moved to ${stage || status}.`,
                    'info'
                );
            }
        }
    } catch (error) {
        console.error('Error updating candidate status:', error);
    }
};

/**
 * Update candidate status (Legacy/Storage Wrapper)
 * Kept for backward compatibility if needed, but redirects to Firestore
 */
const updateCandidateStatus = async (candidateId, status) => {
    await updateFirestoreCandidateStatus(candidateId, status);
};

/**
 * Add days to a date
 */
const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

/**
 * Get hiring pipeline statistics
 */
export const getHiringPipelineStats = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'candidates'));
        const candidates = snapshot.docs.map(doc => doc.data());

        return {
            total: candidates.length,
            byStage: {
                'Sourcing': candidates.filter(c => c.stage === 'Sourcing').length,
                'Applied': candidates.filter(c => c.stage === 'Applied').length,
                'Screening': candidates.filter(c => c.stage === 'Screening').length,
                'Interview': candidates.filter(c => c.stage === 'Interview').length,
                'Offer': candidates.filter(c => c.stage === 'Offer').length,
                'Hired': candidates.filter(c => c.status === 'Hired').length
            },
            conversionRate: calculateConversionRate(candidates)
        };
    } catch (error) {
        console.error('Error fetching pipeline stats:', error);
        return { total: 0, byStage: {}, conversionRate: 0 };
    }
};

/**
 * Calculate conversion rate from applied to hired
 */
const calculateConversionRate = (candidates) => {
    const applied = candidates.filter(c => ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage || c.status)).length;
    const hired = candidates.filter(c => c.status === 'Hired').length;

    return applied > 0 ? ((hired / applied) * 100).toFixed(1) : 0;
};

/**
 * Link interview feedback to employee onboarding
 */
export const linkInterviewToOnboarding = (candidateId, interviewFeedback) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.map(emp => {
        if (emp.candidateId === candidateId) {
            return {
                ...emp,
                interviewFeedback: {
                    strengths: interviewFeedback.strengths || [],
                    areasForDevelopment: interviewFeedback.areasForDevelopment || [],
                    technicalSkills: interviewFeedback.technicalSkills || {},
                    cultureFit: interviewFeedback.cultureFit || 0,
                    notes: interviewFeedback.notes || ''
                },
                // Auto-generate training plan based on feedback
                trainingPlan: generateTrainingPlan(interviewFeedback)
            };
        }
        return emp;
    });

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
};

/**
 * Generate training plan based on interview feedback
 */
const generateTrainingPlan = (feedback) => {
    const trainingModules = [];

    // Add training for areas of development
    if (feedback.areasForDevelopment && feedback.areasForDevelopment.length > 0) {
        feedback.areasForDevelopment.forEach((area, index) => {
            trainingModules.push({
                id: index + 1,
                title: `${area} - Skill Development`,
                priority: 'High',
                duration: '2 weeks',
                status: 'Scheduled'
            });
        });
    }

    return trainingModules;
};
