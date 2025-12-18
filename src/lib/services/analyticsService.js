/**
 * Analytics Service
 * Tracks and analyzes recruitment, hiring, and HR metrics using Firebase Firestore
 */

import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    limit
} from 'firebase/firestore';

const METRICS_COLLECTION = 'applicant_metrics';
const CANDIDATES_COLLECTION = 'candidates';
const EMPLOYEES_COLLECTION = 'employees';

/**
 * Track applicant metrics for analytics in Firestore
 */
export const trackApplicantMetrics = async (applicant, action) => {
    try {
        const metric = {
            applicantId: applicant.id,
            jobId: applicant.jobId,
            action: action, // 'applied', 'screened', 'interviewed', 'offered', 'hired', 'rejected'
            stage: applicant.stage,
            timestamp: serverTimestamp(),
            metadata: {
                source: applicant.source || 'Direct',
                location: applicant.location,
                role: applicant.role,
                department: applicant.department
            }
        };

        const docRef = await addDoc(collection(db, METRICS_COLLECTION), metric);
        return { id: docRef.id, ...metric };
    } catch (error) {
        console.error('Error tracking applicant metrics:', error);
    }
};

/**
 * Get recruitment funnel data from Firestore
 */
export const getRecruitmentFunnel = async (filters = {}) => {
    try {
        // Fetch candidates for funnel calculation
        const candidateSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = candidateSnapshot.docs.map(doc => doc.data());

        // Calculate funnel stages
        const stages = {
            'Applied': candidates.filter(c => ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Screening': candidates.filter(c => ['Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Interview': candidates.filter(c => ['Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Offer': candidates.filter(c => ['Offer', 'Hired'].includes(c.stage)).length,
            'Hired': candidates.filter(c => c.status === 'Hired' || c.stage === 'Hired').length
        };

        // Calculate conversion rates
        const conversionRates = {
            'Applied to Screening': calculateConversionRate(stages.Applied, stages.Screening),
            'Screening to Interview': calculateConversionRate(stages.Screening, stages.Interview),
            'Interview to Offer': calculateConversionRate(stages.Interview, stages.Offer),
            'Offer to Hired': calculateConversionRate(stages.Offer, stages.Hired),
            'Overall': calculateConversionRate(stages.Applied, stages.Hired)
        };

        return {
            stages,
            conversionRates,
            totalApplicants: stages.Applied,
            totalHired: stages.Hired
        };
    } catch (error) {
        console.error('Error getting recruitment funnel:', error);
        return { stages: {}, conversionRates: {}, totalApplicants: 0, totalHired: 0 };
    }
};

/**
 * Calculate conversion rate (Helper)
 */
const calculateConversionRate = (from, to) => {
    if (from === 0) return 0;
    return ((to / from) * 100).toFixed(1);
};

/**
 * Get time-to-hire metrics from Firestore
 */
export const getTimeToHireMetrics = async () => {
    try {
        const candidateSnapshot = await getDocs(
            query(collection(db, CANDIDATES_COLLECTION), where('status', '==', 'Hired'))
        );
        const hiredCandidates = candidateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (hiredCandidates.length === 0) {
            return { average: 0, min: 0, max: 0, data: [] };
        }

        const timeToHireData = hiredCandidates
            .filter(c => c.appliedDate && c.hiredDate)
            .map(candidate => {
                const applied = new Date(candidate.appliedDate);
                const hired = new Date(candidate.hiredDate);
                const days = Math.ceil((hired - applied) / (1000 * 60 * 60 * 24));

                return {
                    candidateId: candidate.id,
                    name: candidate.name,
                    role: candidate.role,
                    days: days
                };
            });

        if (timeToHireData.length === 0) return { average: 0, min: 0, max: 0, data: [] };

        const days = timeToHireData.map(d => d.days);

        return {
            average: (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1),
            min: Math.min(...days),
            max: Math.max(...days),
            data: timeToHireData
        };
    } catch (error) {
        console.error('Error getting time-to-hire metrics:', error);
        return { average: 0, min: 0, max: 0, data: [] };
    }
};

/**
 * Get source effectiveness metrics from Firestore
 */
export const getSourceEffectiveness = async () => {
    try {
        const candidateSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = candidateSnapshot.docs.map(doc => doc.data());

        const sourceData = candidates.reduce((acc, candidate) => {
            const source = candidate.source || 'Direct';

            if (!acc[source]) {
                acc[source] = {
                    total: 0,
                    screened: 0,
                    interviewed: 0,
                    hired: 0
                };
            }

            acc[source].total++;

            if (['Screening', 'Interview', 'Offer', 'Hired'].includes(candidate.stage)) {
                acc[source].screened++;
            }
            if (['Interview', 'Offer', 'Hired'].includes(candidate.stage)) {
                acc[source].interviewed++;
            }
            if (candidate.status === 'Hired') {
                acc[source].hired++;
            }

            return acc;
        }, {});

        // Calculate conversion rates for each source
        Object.keys(sourceData).forEach(source => {
            const data = sourceData[source];
            data.conversionRate = calculateConversionRate(data.total, data.hired);
            data.interviewRate = calculateConversionRate(data.total, data.interviewed);
        });

        return sourceData;
    } catch (error) {
        console.error('Error getting source effectiveness:', error);
        return {};
    }
};

/**
 * Get department-wise hiring metrics from Firestore
 */
export const getDepartmentMetrics = async () => {
    try {
        const [candidateSnap, employeeSnap] = await Promise.all([
            getDocs(collection(db, CANDIDATES_COLLECTION)),
            getDocs(collection(db, EMPLOYEES_COLLECTION))
        ]);

        const candidates = candidateSnap.docs.map(doc => doc.data());
        const employees = employeeSnap.docs.map(doc => doc.data());

        const departmentData = {};

        // Count candidates by department
        candidates.forEach(candidate => {
            const dept = candidate.department || 'Unassigned';

            if (!departmentData[dept]) {
                departmentData[dept] = {
                    applicants: 0,
                    inProgress: 0,
                    hired: 0,
                    employees: 0
                };
            }

            departmentData[dept].applicants++;

            if (['Screening', 'Interview', 'Offer'].includes(candidate.stage)) {
                departmentData[dept].inProgress++;
            }

            if (candidate.status === 'Hired') {
                departmentData[dept].hired++;
            }
        });

        // Count current employees by department
        employees.forEach(employee => {
            const dept = employee.department || 'Unassigned';

            if (!departmentData[dept]) {
                departmentData[dept] = {
                    applicants: 0,
                    inProgress: 0,
                    hired: 0,
                    employees: 0
                };
            }

            if (employee.status !== 'Exited') {
                departmentData[dept].employees++;
            }
        });

        return departmentData;
    } catch (error) {
        console.error('Error getting department metrics:', error);
        return {};
    }
};

/**
 * Get hiring trends over time from Firestore
 */
export const getHiringTrends = async (months = 6) => {
    try {
        const candidateSnapshot = await getDocs(
            query(
                collection(db, CANDIDATES_COLLECTION),
                where('status', '==', 'Hired'),
                orderBy('hiredDate', 'desc')
            )
        );
        const hiredCandidates = candidateSnapshot.docs.map(doc => doc.data());

        const trends = [];
        const today = new Date();

        for (let i = months - 1; i >= 0; i--) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

            const hired = hiredCandidates.filter(c => {
                if (!c.hiredDate) return false;
                const hiredDate = new Date(c.hiredDate);
                return hiredDate >= month && hiredDate <= monthEnd;
            }).length;

            trends.push({
                month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                hired: hired
            });
        }

        return trends;
    } catch (error) {
        console.error('Error getting hiring trends:', error);
        return [];
    }
};

/**
 * Get diversity metrics from Firestore
 */
export const getDiversityMetrics = async () => {
    try {
        const employeeSnapshot = await getDocs(
            query(collection(db, EMPLOYEES_COLLECTION), where('status', '!=', 'Exited'))
        );
        const activeEmployees = employeeSnapshot.docs.map(doc => doc.data());

        // This is placeholder data - in a real app, you'd have actual diversity data stored
        return {
            total: activeEmployees.length,
            gender: {
                male: Math.floor(activeEmployees.length * 0.6),
                female: Math.floor(activeEmployees.length * 0.35),
                other: Math.floor(activeEmployees.length * 0.05)
            },
            ageGroups: {
                '20-30': Math.floor(activeEmployees.length * 0.4),
                '31-40': Math.floor(activeEmployees.length * 0.35),
                '41-50': Math.floor(activeEmployees.length * 0.2),
                '50+': Math.floor(activeEmployees.length * 0.05)
            }
        };
    } catch (error) {
        console.error('Error getting diversity metrics:', error);
        return { total: 0, gender: {}, ageGroups: {} };
    }
};

/**
 * Get time-to-hire trends over the last 6 months from Firestore
 */
export const getTimeToHireTrends = async (months = 6) => {
    try {
        const candidateSnapshot = await getDocs(
            query(collection(db, CANDIDATES_COLLECTION), where('status', '==', 'Hired'))
        );
        const hiredCandidates = candidateSnapshot.docs.map(doc => doc.data());

        const trends = [];
        const today = new Date();

        for (let i = months - 1; i >= 0; i--) {
            const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

            const monthHires = hiredCandidates.filter(c => {
                if (!c.appliedDate || !c.hiredDate) return false;
                const hiredDate = new Date(c.hiredDate);
                return hiredDate >= monthStart && hiredDate <= monthEnd;
            });

            const avgDays = monthHires.length > 0
                ? monthHires.reduce((acc, c) => {
                    const days = Math.ceil((new Date(c.hiredDate) - new Date(c.appliedDate)) / (1000 * 60 * 60 * 24));
                    return acc + days;
                }, 0) / monthHires.length
                : 0;

            trends.push({
                name: monthStart.toLocaleDateString('en-US', { month: 'short' }),
                days: Math.round(avgDays)
            });
        }

        return trends;
    } catch (error) {
        console.error('Error getting time-to-hire trends:', error);
        return [];
    }
};

/**
 * Get data for Candidate Predictor dashboard
 */
export const getCandidatePredictorData = async () => {
    try {
        const candidateSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = candidateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return candidates
            .filter(c => c.status !== 'Hired' && c.status !== 'Rejected')
            .map(c => {
                // Heuristic for probability (in a real app, this would be an ML model)
                let probability = 50;
                const signals = [];

                if (c.stage === 'Interview') { probability += 15; signals.push('High Engagement'); }
                if (c.stage === 'Offer') { probability += 30; signals.push('Offer Stage'); }
                if (c.source === 'Referral') { probability += 10; signals.push('Internal Referral'); }
                if (c.skills?.length > 5) { probability += 5; }

                // Cap at 95
                probability = Math.min(probability, 95);

                return {
                    id: c.id,
                    name: c.name,
                    role: c.role || 'Unknown Role',
                    probability,
                    status: c.stage,
                    signals,
                    priority: probability > 80 ? 'High' : probability > 60 ? 'Medium' : 'Low'
                };
            })
            .sort((a, b) => b.probability - a.probability);
    } catch (error) {
        console.error('Error getting candidate predictor data:', error);
        return [];
    }
};

/**
 * Get internal salary statistics by role for benchmarking
 */
export const getInternalSalaryStats = async () => {
    try {
        const employeeSnapshot = await getDocs(
            query(collection(db, EMPLOYEES_COLLECTION), where('status', '!=', 'Exited'))
        );
        const employees = employeeSnapshot.docs.map(doc => doc.data());

        const stats = employees.reduce((acc, emp) => {
            const role = emp.role || 'Other';
            if (!acc[role]) {
                acc[role] = { totalSalary: 0, count: 0 };
            }
            // Assume 'salary' field exists, or use 'ctc'
            const salary = emp.salary || emp.ctc || 600000;
            acc[role].totalSalary += salary;
            acc[role].count++;
            return acc;
        }, {});

        return Object.entries(stats).map(([role, data]) => ({
            role,
            internalAverage: Math.round(data.totalSalary / data.count)
        }));
    } catch (error) {
        console.error('Error getting internal salary stats:', error);
        return [];
    }
};

/**
 * Get overall recruitment analytics dashboard data from Firestore
 */
export const getRecruitmentAnalytics = async () => {
    const [
        funnel,
        timeToHire,
        timeToHireTrends,
        sourceEffectiveness,
        departmentMetrics,
        hiringTrends,
        diversity,
        predictorData,
        salaryStats
    ] = await Promise.all([
        getRecruitmentFunnel(),
        getTimeToHireMetrics(),
        getTimeToHireTrends(),
        getSourceEffectiveness(),
        getDepartmentMetrics(),
        getHiringTrends(),
        getDiversityMetrics(),
        getCandidatePredictorData(),
        getInternalSalaryStats()
    ]);

    return {
        funnel,
        timeToHire,
        timeToHireTrends,
        sourceEffectiveness,
        departmentMetrics,
        hiringTrends,
        diversity,
        predictorData,
        salaryStats
    };
};
