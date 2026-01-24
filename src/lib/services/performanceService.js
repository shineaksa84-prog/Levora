import { auth, db } from '../firebase/config';
import BaseService from './baseService';
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

import { APP_CONFIG } from '../../config/appConfig';

const GOALS_COLLECTION = 'performance_goals';
const REVIEWS_COLLECTION = 'performance_reviews';
const SUCCESSION_COLLECTION = 'succession_plans';
const EMPLOYEES_COLLECTION = 'employees';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local persistence
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// ============= GOALS MANAGEMENT =============

export async function createGoal(goalData) {
    BaseService.checkAuth();
    if (DEV_MODE) {
        const goals = getLocalData(GOALS_COLLECTION) || [];
        const newGoal = {
            id: 'goal_' + Math.random().toString(36).substr(2, 9),
            ...goalData,
            status: 'active',
            progress: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setLocalData(GOALS_COLLECTION, [...goals, newGoal]);
        return Promise.resolve(newGoal);
    }
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
    if (DEV_MODE) {
        const goals = getLocalData(GOALS_COLLECTION) || [];
        const updatedGoals = goals.map(g =>
            g.id === goalId ? { ...g, ...updates, progress, updatedAt: new Date().toISOString() } : g
        );
        setLocalData(GOALS_COLLECTION, updatedGoals);
        const updatedGoal = updatedGoals.find(g => g.id === goalId);
        return Promise.resolve(updatedGoal);
    }
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
    BaseService.checkAuth();
    if (DEV_MODE) {
        let goals = getLocalData(GOALS_COLLECTION);
        if (!goals) {
            goals = await seedGoals(employeeId);
            setLocalData(GOALS_COLLECTION, goals);
        }
        return Promise.resolve(goals);
    }
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
export async function getSuccessionPlan() {
    if (DEV_MODE) {
        // Mock Data moved from SuccessionPlanner.jsx
        const KEY_ROLES = [
            {
                id: 1, role: 'Chief Technology Officer', incumbent: 'Sarah Connor', risk: 'Medium', status: 'Strategizing', successors: [
                    { name: 'Kyle Reese', readiness: 'Ready Now', confidence: 94 },
                    { name: 'Marcus Wright', readiness: '1-2 Years', confidence: 78 }
                ]
            },
            {
                id: 2, role: 'VP Global Sales', incumbent: 'Julian Thorne', risk: 'High', status: 'At Risk', successors: [
                    { name: 'Elena Fisher', readiness: '2-3 Years', confidence: 62 }
                ]
            },
            {
                id: 3, role: 'Lead Architect', incumbent: 'Arthur Cobb', risk: 'Low', status: 'Stable', successors: [
                    { name: 'Ariadne Miles', readiness: 'Ready Now', confidence: 91 }
                ]
            },
        ];
        return Promise.resolve(KEY_ROLES);
    }

    try {
        const snapshot = await getDocs(collection(db, SUCCESSION_COLLECTION));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching succession plan:', error);
        return [];
    }
}

export const getTalentCalibrationMatrix = async () => {
    const BOXES = [
        { id: '1A', name: 'Rough Diamond', level: 'High Pot / Low Perf', color: 'border-primary/20 bg-primary/5' },
        { id: '1B', name: 'Future Star', level: 'High Pot / Med Perf', color: 'border-primary/30 bg-primary/10' },
        { id: '1C', name: 'Star Performer', level: 'High Pot / High Perf', color: 'border-primary/40 bg-primary/20' },
        { id: '2A', name: 'Inconsistent', level: 'Med Pot / Low Perf', color: 'border-secondary/20 bg-secondary/5' },
        { id: '2B', name: 'Core Player', level: 'Med Pot / Med Perf', color: 'border-secondary/30 bg-secondary/10' },
        { id: '2C', name: 'High Performer', level: 'Med Pot / High Perf', color: 'border-secondary/40 bg-secondary/20' },
        { id: '3A', name: 'Talent Risk', level: 'Low Pot / Low Perf', color: 'border-destructive/20 bg-destructive/5' },
        { id: '3B', name: 'Effective', level: 'Low Pot / Med Perf', color: 'border-muted/30 bg-muted/10' },
        { id: '3C', name: 'Trusted Pro', level: 'Low Pot / High Perf', color: 'border-accent/30 bg-accent/10' },
    ];

    if (DEV_MODE) {
        const EMPLOYEES = [
            { id: 1, name: 'Alex Thompson', box: '1C', role: 'Senior Engineer', avatar: 'AT' },
            { id: 2, name: 'Samantha Reed', box: '2B', role: 'Product Manager', avatar: 'SR' },
            { id: 3, name: 'Jordan Lee', box: '3A', role: 'Junior Designer', avatar: 'JL' },
            { id: 4, name: 'Casey Wright', box: '1B', role: 'Lead Architect', avatar: 'CW' },
            { id: 5, name: 'Taylor Swift', box: '2B', role: 'DevOps Specialist', avatar: 'TS' },
        ];
        return Promise.resolve({ boxes: BOXES, employees: EMPLOYEES });
    }

    try {
        const snapshot = await getDocs(collection(db, EMPLOYEES_COLLECTION));
        const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { boxes: BOXES, employees };
    } catch (error) {
        console.error('Error fetching talent matrix:', error);
        return { boxes: BOXES, employees: [] };
    }
};
