import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

const GOALS_COLLECTION = 'performance_goals';
const REVIEWS_COLLECTION = 'performance_reviews';

// ============= GOALS MANAGEMENT =============

export async function createGoal(goalData) {
    try {
        const docRef = await addDoc(collection(db, GOALS_COLLECTION), {
            ...goalData,
            status: 'active',
            progress: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { id: docRef.id, ...goalData };
    } catch (error) {
        console.error('Error creating goal:', error);
        throw error;
    }
}

export async function updateGoalProgress(goalId, progress, updates = {}) {
    try {
        const docRef = doc(db, GOALS_COLLECTION, goalId);
        const updatedData = {
            ...updates,
            progress,
            updatedAt: serverTimestamp()
        };
        await updateDoc(docRef, updatedData);
        return { id: goalId, ...updatedData };
    } catch (error) {
        console.error('Error updating goal:', error);
        throw error;
    }
}

export async function getEmployeeGoals(employeeId) {
    try {
        // For demo/dev simplicity, if employeeId is 'current_user' or null, fetch all goals
        // In prod, you'd filter by userId.
        let q;
        if (!employeeId || employeeId === 'current_user') {
            q = query(collection(db, GOALS_COLLECTION), orderBy('createdAt', 'desc'));
        } else {
            q = query(collection(db, GOALS_COLLECTION), where('employeeId', '==', employeeId), orderBy('createdAt', 'desc'));
        }

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            // Auto-seed if empty (only for demo purposes)
            return await seedGoals(employeeId);
        }

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert timestamps to dates/strings if needed for UI, 
            // but usually Firestore SDK returns Timestamp objects which .toDate() works on.
            // For simplicity/safety with existing UI code, let's keep it somewhat raw or standard.
            // The UI expects properties like 'createdAt' etc. 
        }));
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw error;
    }
}

// Seeding function
async function seedGoals(employeeId) {
    const demoGoals = [
        {
            employeeId: employeeId || 'demo_user',
            type: 'OKR',
            title: 'Improve Recruitment Efficiency',
            objective: 'Reduce time-to-hire by 30%',
            keyResults: [
                { id: 'kr_1', description: 'Automate resume screening', target: 100, current: 75, unit: '%' },
                { id: 'kr_2', description: 'Implement AI matching', target: 100, current: 50, unit: '%' },
                { id: 'kr_3', description: 'Reduce avg. time-to-hire', target: 21, current: 28, unit: 'days' }
            ],
            progress: 65,
            status: 'on-track',
            dueDate: '2024-12-31',
            category: 'Recruitment',
            priority: 'high'
        },
        {
            employeeId: employeeId || 'demo_user',
            type: 'SMART',
            title: 'Complete HR Analytics Certification',
            description: 'Obtain SHRM Analytics certification',
            specific: 'Complete SHRM People Analytics Specialty Credential',
            measurable: 'Pass certification exam with 80%+ score',
            achievable: 'Dedicate 5 hours/week for 12 weeks',
            relevant: 'Aligns with company focus on data-driven HR',
            timeBound: '2024-06-30',
            progress: 40,
            status: 'on-track',
            category: 'Professional Development',
            priority: 'medium'
        }
    ];

    const results = [];
    for (const goal of demoGoals) {
        const res = await createGoal(goal);
        results.push(res);
    }
    return results;
}

// ============= PERFORMANCE REVIEWS =============
// (Keeping mock for reviews for now as UI might not be fully ready for it, but enabling skeletal structure)

export async function createPerformanceReview(reviewData) {
    // Placeholder for now
    return { id: 'mock_review', ...reviewData };
}

export async function getEmployeeReviews(employeeId) {
    // Mock data preserved for now to ensure UI doesn't break if it depends on it
    return [
        {
            id: 'review_1',
            employeeId,
            reviewerId: 'manager_1',
            reviewerName: 'Sarah Johnson',
            reviewType: 'annual',
            period: 'Q4 2023',
            status: 'completed',
            overallRating: 4.5,
            ratings: {
                technical: 5,
                communication: 4,
                leadership: 4,
                problemSolving: 5,
                teamwork: 4
            },
            strengths: ['Excellent technical skills'],
            areasForImprovement: ['Presentation skills'],
            goals: ['goal_1'],
            comments: 'Outstanding performance.',
            createdAt: '2023-12-15T00:00:00Z',
            completedAt: '2023-12-20T00:00:00Z'
        }
    ];
}

export async function submit360Feedback(feedbackData) { return {}; }
export async function giveFeedback(feedbackData) { return {}; }
export async function getEmployeeFeedback(employeeId) { return []; }
export async function createOneOnOneNotes(notesData) { return {}; }
export function calculatePerformanceScore(ratings) { return 4.5; }
export async function getPerformanceDistribution(deptId) { return {}; }
export async function getPerformanceTrends(empId) { return []; }
