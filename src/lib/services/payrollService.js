import { auth, db } from '../firebase/config';
import BaseService from './baseService';
import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from 'firebase/firestore';

import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'payroll_structures';
const AUDITS_COLLECTION = 'payroll_audits';
const VALIDATIONS_COLLECTION = 'payroll_validations';
const DEV_MODE = APP_CONFIG.DEV_MODE;

export const saveSalaryStructure = async (structureData) => {
    BaseService.checkAuth();
    if (DEV_MODE) {
        console.log('[PayrollService] Mock Save:', structureData);
        return Promise.resolve({ id: 'mock-ps-' + Date.now(), ...structureData });
    }

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...structureData,
            createdAt: serverTimestamp()
        });
        return { id: docRef.id, ...structureData };
    } catch (error) {
        console.error('Error saving salary structure:', error);
        throw error;
    }
};

export const createPayRun = async (cycleId, totalAmount, recordCount) => {
    if (DEV_MODE) {
        return Promise.resolve({
            id: 'run-' + Date.now(),
            cycleId,
            status: 'Completed',
            totalAmount,
            processedAt: new Date()
        });
    }
    // Firestore impl
    try {
        await addDoc(collection(db, 'payroll_runs'), {
            cycleId,
            totalAmount,
            recordCount,
            status: 'Completed',
            processedAt: serverTimestamp()
        });
        return { cycleId, status: 'Completed' };
    } catch (error) {
        console.error("Pay run failed", error);
        throw error;
    }
};

export const addArrear = async ({ employeeId, amount, type, effectiveDate }) => {
    // Mock
    return Promise.resolve({
        id: 'arrear-' + Date.now(),
        employeeId,
        amount,
        type,
        effectiveDate,
        status: 'Pending'
    });
};

export const getReimbursementAudits = async () => {
    if (DEV_MODE) {
        // Mock Data moved from ReimbursementAudit.jsx
        const AUDIT_LOGS = [
            { id: 1, emp: 'Alice Smith', category: 'Travel', amount: 5400, risk: 'High', anomalies: ['Weekend Expense detected', 'Duplicate Receipt ID'], receipt: 'IMG_2023.jpg' },
            { id: 2, emp: 'Bob Jones', category: 'Internet', amount: 1200, risk: 'Low', anomalies: [], receipt: 'Bill_Nov.pdf' },
            { id: 3, emp: 'David Miller', category: 'Team Lunch', amount: 15000, risk: 'Medium', anomalies: ['Amount exceeds policy limit (₹10k)'], receipt: 'Lunch_Receipt.png' },
        ];
        return Promise.resolve(AUDIT_LOGS);
    }

    try {
        const snapshot = await getDocs(collection(db, AUDITS_COLLECTION));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching audits:', error);
        return [];
    }
};

export const getPayrollRisks = async () => {
    if (DEV_MODE) {
        const RISKS = [
            { id: 1, type: 'Critical', msg: 'Zero Attendance / Active Salary', count: 2, impact: 'Financial Leakage', icon: 'AlertOctagon', color: 'text-rose-600' },
            { id: 2, type: 'Critical', msg: 'Net Pay < Minimum Wage', count: 5, impact: 'Compliance Violation', icon: 'Scale', color: 'text-rose-600' },
            { id: 3, type: 'Warning', msg: 'Salary Variance (>50%)', count: 1, impact: 'Audit Flag', icon: 'FileSearch', color: 'text-amber-600' },
            { id: 4, type: 'Warning', msg: 'Missing Tax ID / DOJ', count: 12, impact: 'Regulatory Risk', icon: 'ShieldAlert', color: 'text-amber-600' },
        ];
        return Promise.resolve(RISKS);
    }

    try {
        // Risks can be part of the latest audit or its own collection. 
        // For now, fetching from 'payroll_risks' or similar if we decide to split.
        // Let's assume they are stored in 'payroll_audits' as summary or separate collection.
        const snapshot = await getDocs(collection(db, 'payroll_risks'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching payroll risks:', error);
        return [];
    }
};

export const getPayCycleValidations = async () => {
    if (DEV_MODE) {
        const VALIDATIONS = [
            { id: 1, category: 'Attendance', check: 'Missing Punch Ins', count: 12, severity: 'High', status: 'Failed' },
            { id: 2, category: 'Attendance', check: 'Unregularized Absences', count: 5, severity: 'High', status: 'Failed' },
            { id: 3, category: 'Leave', check: 'Pending Leave Approvals', count: 3, severity: 'Medium', status: 'Warning' },
            { id: 4, category: 'Claims', check: 'Unverified Reimbursements', count: 0, severity: 'Low', status: 'Passed' },
            { id: 5, category: 'Data', check: 'Missing Bank Details', count: 1, severity: 'Critical', status: 'Failed' },
            { id: 6, category: 'Data', check: 'PAN Card Validation', count: 0, severity: 'Critical', status: 'Passed' },
        ];
        return Promise.resolve({ validations: VALIDATIONS, readyScore: 65 });
    }

    try {
        const snapshot = await getDocs(collection(db, VALIDATIONS_COLLECTION));
        const validations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Calculate readyScore based on failures if needed, or fetch from doc
        const readyScore = validations.length > 0 ? Math.round((validations.filter(v => v.status === 'Passed').length / validations.length) * 100) : 100;
        return { validations, readyScore };
    } catch (error) {
        console.error('Error fetching validations:', error);
        return { validations: [], readyScore: 0 };
    }
};
