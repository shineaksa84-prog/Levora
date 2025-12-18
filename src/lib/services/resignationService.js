/**
 * Resignation Service
 * Handles resignation workflow and auto-generates offboarding checklists
 */

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

const RESIGNATIONS_COLLECTION = 'resignations';
const CHECKLISTS_COLLECTION = 'offboarding_checklists';

/**
 * Get all resignations
 */
export const getResignations = async () => {
    try {
        const q = query(collection(db, RESIGNATIONS_COLLECTION), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching resignations:', error);
        return [];
    }
};

/**
 * Submit a resignation request
 */
export const submitResignation = async (resignationData) => {
    try {
        const resignation = {
            employeeId: resignationData.employeeId,
            employee: resignationData.employee,
            role: resignationData.role,
            department: resignationData.department,
            date: new Date().toISOString().split('T')[0],
            lastDay: resignationData.lastDay,
            reason: resignationData.reason,
            reasonDetails: resignationData.reasonDetails || '',
            status: 'Pending',
            submittedAt: new Date().toISOString(),
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, RESIGNATIONS_COLLECTION), resignation);
        return { id: docRef.id, ...resignation };
    } catch (error) {
        console.error('Error submitting resignation:', error);
        throw error;
    }
};

/**
 * Approve resignation and auto-generate offboarding checklist
 */
export const approveResignation = async (resignationId) => {
    try {
        // 1. Update resignation status
        const resignationRef = doc(db, RESIGNATIONS_COLLECTION, resignationId);
        const resignationSnap = await getDoc(resignationRef);

        if (!resignationSnap.exists()) {
            throw new Error('Resignation not found');
        }

        const resignationData = { id: resignationSnap.id, ...resignationSnap.data() };

        await updateDoc(resignationRef, {
            status: 'Approved',
            approvedAt: new Date().toISOString()
        });

        // 2. Generate offboarding checklist
        const checklist = await generateOffboardingChecklist(resignationData);

        return { resignation: { ...resignationData, status: 'Approved' }, checklist };
    } catch (error) {
        console.error('Error approving resignation:', error);
        throw error;
    }
};

/**
 * Generate comprehensive offboarding checklist in Firestore
 */
export const generateOffboardingChecklist = async (resignation) => {
    const tasks = generateOffboardingTasks(resignation);

    const checklist = {
        resignationId: resignation.id,
        employeeId: resignation.employeeId,
        employee: resignation.employee,
        lastDay: resignation.lastDay,
        status: 'In Progress',
        createdAt: new Date().toISOString(),
        tasks: tasks
    };

    const docRef = await addDoc(collection(db, CHECKLISTS_COLLECTION), checklist);

    // Ideally update user status here too via cloud function or separate call
    // updateEmployeeStatus(resignation.employeeId, 'Notice Period'); 

    return { id: docRef.id, ...checklist };
};

/**
 * Generate offboarding tasks based on employee details
 */
const generateOffboardingTasks = (resignation) => {
    const lastDay = new Date(resignation.lastDay);
    const today = new Date();

    // Helper to format date
    const getDeadline = (daysBeforeLastDay) => {
        const deadline = new Date(lastDay);
        deadline.setDate(deadline.getDate() - daysBeforeLastDay);
        return deadline.toISOString().split('T')[0];
    };

    return [
        // HR Tasks
        {
            id: 'hr-1',
            category: 'HR',
            title: 'Schedule exit interview',
            description: 'Conduct exit interview to gather feedback',
            assignedTo: 'HR Team',
            deadline: getDeadline(5),
            status: 'pending',
            priority: 'high'
        },
        {
            id: 'hr-2',
            category: 'HR',
            title: 'Process final settlement',
            description: 'Calculate and process final salary, leave encashment, and benefits',
            assignedTo: 'HR Team',
            deadline: getDeadline(2),
            status: 'pending',
            priority: 'high'
        },
        // IT Tasks
        {
            id: 'it-1',
            category: 'IT',
            title: 'Revoke system access',
            description: 'Disable all system accounts and email access',
            assignedTo: 'IT Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'critical'
        },
        {
            id: 'it-2',
            category: 'IT',
            title: 'Collect company assets',
            description: 'Retrieve laptop, phone, access cards, and other company property',
            assignedTo: 'IT Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'high'
        },
        // Manager Tasks
        {
            id: 'mgr-1',
            category: 'Manager',
            title: 'Knowledge transfer',
            description: 'Ensure complete handover of responsibilities and ongoing projects',
            assignedTo: 'Reporting Manager',
            deadline: getDeadline(7),
            status: 'pending',
            priority: 'critical'
        }
    ];
};

/**
 * Update checklist task status
 */
export const updateChecklistTask = async (checklistId, taskId, status) => {
    try {
        const checklistRef = doc(db, CHECKLISTS_COLLECTION, checklistId);
        const checklistSnap = await getDoc(checklistRef);

        if (!checklistSnap.exists()) throw new Error('Checklist not found');

        const data = checklistSnap.data();
        const updatedTasks = data.tasks.map(task =>
            task.id === taskId
                ? { ...task, status, completedAt: status === 'completed' ? new Date().toISOString() : null }
                : task
        );

        const allCompleted = updatedTasks.every(task => task.status === 'completed');
        const checklistStatus = allCompleted ? 'Completed' : 'In Progress';

        await updateDoc(checklistRef, {
            tasks: updatedTasks,
            status: checklistStatus
        });

        return { ...data, tasks: updatedTasks, status: checklistStatus };
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

/**
 * Get offboarding checklist by resignation ID
 */
export const getOffboardingChecklist = async (resignationId) => {
    try {
        const q = query(collection(db, CHECKLISTS_COLLECTION), where('resignationId', '==', resignationId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error fetching checklist:', error);
        return null;
    }
};

/**
 * Get resignation statistics
 */
export const getResignationStats = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, RESIGNATIONS_COLLECTION));
        const resignations = querySnapshot.docs.map(doc => doc.data());
        const currentYear = new Date().getFullYear();

        return {
            total: resignations.length,
            pending: resignations.filter(r => r.status === 'Pending').length,
            approved: resignations.filter(r => r.status === 'Approved').length,
            thisYear: resignations.filter(r => new Date(r.date).getFullYear() === currentYear).length,
            byReason: getResignationsByReason(resignations)
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { total: 0, pending: 0, approved: 0, thisYear: 0, byReason: {} };
    }
};

/**
 * Group resignations by reason (Helper)
 */
const getResignationsByReason = (resignations) => {
    return resignations.reduce((acc, resignation) => {
        const reason = resignation.reason || 'Other';
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
    }, {});
};
