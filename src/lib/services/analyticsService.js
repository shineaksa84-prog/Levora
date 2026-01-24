import { db, auth } from '../firebase/config';
import BaseService from './baseService';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from 'firebase/firestore';
import { APP_CONFIG } from '../../config/appConfig';

const METRICS_COLLECTION = 'applicant_metrics';
const CANDIDATES_COLLECTION = 'candidates';
const EMPLOYEES_COLLECTION = 'employees';
const HUBS_COLLECTION = 'workforce_hubs';
const MARKET_BENCHMARKS_COLLECTION = 'market_salary_benchmarks';
const DEV_MODE = APP_CONFIG.DEV_MODE;

/**
 * Mock Data for Analytics
 */
const MOCK_FUNNEL = {
    stages: { 'Applied': 120, 'Screening': 85, 'Interview': 40, 'Offer': 12, 'Hired': 8 },
    conversionRates: { 'Applied to Screening': '70.8', 'Screening to Interview': '47.1', 'Interview to Offer': '30.0', 'Offer to Hired': '66.7', 'Overall': '6.7' },
    totalApplicants: 120, totalHired: 8
};

const MOCK_TIME_TO_HIRE = {
    average: '22.5', min: 14, max: 45,
    data: [
        { candidateId: 'c1', name: 'Alice Freeman', role: 'Senior React Developer', days: 18 },
        { candidateId: 'c3', name: 'Charlie Brown', role: 'UX Designer', days: 25 }
    ]
};

const MOCK_SOURCE_EFFECTIVENESS = {
    'LinkedIn': { total: 50, screened: 35, interviewed: 15, hired: 4, conversionRate: '8.0', interviewRate: '30.0' },
    'Referral': { total: 20, screened: 18, interviewed: 12, hired: 6, conversionRate: '30.0', interviewRate: '60.0' },
    'Direct': { total: 30, screened: 10, interviewed: 5, hired: 2, conversionRate: '6.7', interviewRate: '16.7' }
};

const MOCK_DEPT_METRICS = {
    'Engineering': { applicants: 60, inProgress: 15, hired: 12, employees: 45 },
    'Human Resources': { applicants: 15, inProgress: 4, hired: 3, employees: 10 },
    'Product': { applicants: 25, inProgress: 8, hired: 5, employees: 18 }
};

const MOCK_HIRING_TRENDS = [
    { month: 'Oct 2025', hired: 5 },
    { month: 'Nov 2025', hired: 8 },
    { month: 'Dec 2025', hired: 12 },
    { month: 'Jan 2026', hired: 6 }
];

const MOCK_DEI_METRICS = {
    overall: {
        diversity: 42,
        inclusion: 78,
        equity: 65
    },
    pipeline: [
        { stage: 'Applications', total: 1250, diverse: 485, percentage: 39 },
        { stage: 'Phone Screen', total: 420, diverse: 168, percentage: 40 },
        { stage: 'Technical', total: 180, diverse: 75, percentage: 42 },
        { stage: 'Final Round', total: 85, diverse: 38, percentage: 45 },
        { stage: 'Offers', total: 32, diverse: 15, percentage: 47 },
    ],
    demographics: [
        { category: 'Gender', male: 58, female: 38, nonBinary: 4 },
        { category: 'Ethnicity', asian: 28, black: 12, hispanic: 15, white: 40, other: 5 },
        { category: 'Age', under30: 35, age30to40: 42, age40to50: 18, over50: 5 },
    ],
    goals: [
        { metric: 'Women in Tech Roles', current: 38, target: 50, status: 'In Progress' },
        { metric: 'Underrepresented Minorities', current: 32, target: 40, status: 'On Track' },
        { metric: 'Leadership Diversity', current: 28, target: 35, status: 'At Risk' },
    ]
};

/**
 * Functions
 */
export const trackApplicantMetrics = async (applicant, action) => {
    BaseService.checkAuth();
    if (DEV_MODE) return Promise.resolve({ id: crypto.randomUUID(), applicantId: applicant.id, action });
    try {
        const metric = {
            applicantId: applicant.id,
            jobId: applicant.jobId,
            action: action,
            stage: applicant.stage,
            timestamp: serverTimestamp(),
            metadata: { source: applicant.source || 'Direct', location: applicant.location, role: applicant.role, department: applicant.department }
        };
        const docRef = await addDoc(collection(db, METRICS_COLLECTION), metric);
        return { id: docRef.id, ...metric };
    } catch (error) { console.error('Error tracking metrics:', error); }
};

export const getRecruitmentFunnel = async () => {
    BaseService.checkAuth();
    if (DEV_MODE) return Promise.resolve(MOCK_FUNNEL);
    try {
        const candidateSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = candidateSnapshot.docs.map(doc => doc.data());
        const stages = {
            'Applied': candidates.filter(c => ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Screening': candidates.filter(c => ['Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Interview': candidates.filter(c => ['Interview', 'Offer', 'Hired'].includes(c.stage)).length,
            'Offer': candidates.filter(c => ['Offer', 'Hired'].includes(c.stage)).length,
            'Hired': candidates.filter(c => c.status === 'Hired' || c.stage === 'Hired').length
        };
        const conversionRates = {
            'Applied to Screening': calculateConversionRate(stages.Applied, stages.Screening),
            'Screening to Interview': calculateConversionRate(stages.Screening, stages.Interview),
            'Interview to Offer': calculateConversionRate(stages.Interview, stages.Offer),
            'Offer to Hired': calculateConversionRate(stages.Offer, stages.Hired),
            'Overall': calculateConversionRate(stages.Applied, stages.Hired)
        };
        return { stages, conversionRates, totalApplicants: stages.Applied, totalHired: stages.Hired };
    } catch (error) { console.error('Error funnel:', error); return { stages: {}, conversionRates: {}, totalApplicants: 0, totalHired: 0 }; }
};

const calculateConversionRate = (from, to) => {
    if (from === 0) return 0;
    return ((to / from) * 100).toFixed(1);
};

export const getTimeToHireMetrics = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_TIME_TO_HIRE);
    try {
        const snapshot = await getDocs(query(collection(db, CANDIDATES_COLLECTION), where('status', '==', 'Hired')));
        const hiredCandidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (hiredCandidates.length === 0) return { average: 0, min: 0, max: 0, data: [] };
        const timeToHireData = hiredCandidates.filter(c => c.appliedDate && c.hiredDate).map(c => {
            const days = Math.ceil((new Date(c.hiredDate) - new Date(c.appliedDate)) / (1000 * 60 * 60 * 24));
            return { candidateId: c.id, name: c.name, role: c.role, days };
        });
        if (timeToHireData.length === 0) return { average: 0, min: 0, max: 0, data: [] };
        const days = timeToHireData.map(d => d.days);
        return { average: (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1), min: Math.min(...days), max: Math.max(...days), data: timeToHireData };
    } catch (error) { console.error('Error time-to-hire:', error); return { average: 0, min: 0, max: 0, data: [] }; }
};

export const getSourceEffectiveness = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_SOURCE_EFFECTIVENESS);
    try {
        const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = snapshot.docs.map(doc => doc.data());
        const sourceData = candidates.reduce((acc, c) => {
            const source = c.source || 'Direct';
            if (!acc[source]) acc[source] = { total: 0, screened: 0, interviewed: 0, hired: 0 };
            acc[source].total++;
            if (['Screening', 'Interview', 'Offer', 'Hired'].includes(c.stage)) acc[source].screened++;
            if (['Interview', 'Offer', 'Hired'].includes(c.stage)) acc[source].interviewed++;
            if (c.status === 'Hired') acc[source].hired++;
            return acc;
        }, {});
        Object.keys(sourceData).forEach(source => {
            const data = sourceData[source];
            data.conversionRate = calculateConversionRate(data.total, data.hired);
            data.interviewRate = calculateConversionRate(data.total, data.interviewed);
        });
        return sourceData;
    } catch (error) { console.error('Error sources:', error); return {}; }
};

export const getDepartmentMetrics = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_DEPT_METRICS);
    try {
        const [candidateSnap, employeeSnap] = await Promise.all([getDocs(collection(db, CANDIDATES_COLLECTION)), getDocs(collection(db, EMPLOYEES_COLLECTION))]);
        const candidates = candidateSnap.docs.map(doc => doc.data());
        const employees = employeeSnap.docs.map(doc => doc.data());
        const departmentData = {};
        candidates.forEach(c => {
            const dept = c.department || 'Unassigned';
            if (!departmentData[dept]) departmentData[dept] = { applicants: 0, inProgress: 0, hired: 0, employees: 0 };
            departmentData[dept].applicants++;
            if (['Screening', 'Interview', 'Offer'].includes(c.stage)) departmentData[dept].inProgress++;
            if (c.status === 'Hired') departmentData[dept].hired++;
        });
        employees.forEach(e => {
            const dept = e.department || 'Unassigned';
            if (!departmentData[dept]) departmentData[dept] = { applicants: 0, inProgress: 0, hired: 0, employees: 0 };
            if (e.status !== 'Exited') departmentData[dept].employees++;
        });
        return departmentData;
    } catch (error) { console.error('Error dept metrics:', error); return {}; }
};

export const getHiringTrends = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_HIRING_TRENDS);
    try {
        const snapshot = await getDocs(query(collection(db, CANDIDATES_COLLECTION), where('status', '==', 'Hired'), orderBy('hiredDate', 'desc')));
        const hiredCandidates = snapshot.docs.map(doc => doc.data());
        const trends = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
            const hiredCount = hiredCandidates.filter(c => {
                if (!c.hiredDate) return false;
                const date = new Date(c.hiredDate);
                return date >= month && date <= monthEnd;
            }).length;
            trends.push({ month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), hired: hiredCount });
        }
        return trends;
    } catch (error) { console.error('Error trends:', error); return []; }
};

export const getDiversityMetrics = async () => {
    if (DEV_MODE) return Promise.resolve({ total: 100, gender: { male: 55, female: 40, other: 5 }, ageGroups: { '20-30': 40, '31-40': 35, '41-50': 20, '50+': 5 } });
    try {
        const snapshot = await getDocs(query(collection(db, EMPLOYEES_COLLECTION), where('status', '!=', 'Exited')));
        const activeEmployees = snapshot.docs.map(doc => doc.data());
        return { total: activeEmployees.length, gender: { male: Math.floor(activeEmployees.length * 0.6), female: Math.floor(activeEmployees.length * 0.35), other: Math.floor(activeEmployees.length * 0.05) }, ageGroups: { '20-30': Math.floor(activeEmployees.length * 0.4), '31-40': Math.floor(activeEmployees.length * 0.35), '41-50': Math.floor(activeEmployees.length * 0.2), '50+': Math.floor(activeEmployees.length * 0.05) } };
    } catch (error) { console.error('Error diversity:', error); return { total: 0, gender: {}, ageGroups: {} }; }
};

export const getTimeToHireTrends = async () => {
    if (DEV_MODE) return Promise.resolve([{ name: 'Oct', days: 22 }, { name: 'Nov', days: 24 }, { name: 'Dec', days: 21 }, { name: 'Jan', days: 19 }]);
    try {
        const snapshot = await getDocs(query(collection(db, CANDIDATES_COLLECTION), where('status', '==', 'Hired')));
        const hiredCandidates = snapshot.docs.map(doc => doc.data());
        const trends = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const start = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const end = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
            const monthHires = hiredCandidates.filter(c => c.appliedDate && c.hiredDate && new Date(c.hiredDate) >= start && new Date(c.hiredDate) <= end);
            const avg = monthHires.length > 0 ? monthHires.reduce((acc, c) => acc + Math.ceil((new Date(c.hiredDate) - new Date(c.appliedDate)) / (1000 * 60 * 60 * 24)), 0) / monthHires.length : 0;
            trends.push({ name: start.toLocaleDateString('en-US', { month: 'short' }), days: Math.round(avg) });
        }
        return trends;
    } catch (error) { console.error('Error tth trends:', error); return []; }
};

export const getCandidatePredictorData = async () => {
    if (DEV_MODE) return Promise.resolve([{ id: 'p1', name: 'Alice Freeman', role: 'Senior React Developer', probability: 92, status: 'Interview', signals: ['High Engagement', 'Technical Fit'], priority: 'High' }, { id: 'p2', name: 'Bob Smith', role: 'Product Manager', probability: 78, status: 'Screening', signals: ['Culture Match'], priority: 'Medium' }]);
    try {
        const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return candidates.filter(c => !['Hired', 'Rejected'].includes(c.status)).map(c => {
            let prob = 50; const signals = [];
            if (c.stage === 'Interview') { prob += 15; signals.push('High Engagement'); }
            if (c.stage === 'Offer') { prob += 30; signals.push('Offer Stage'); }
            if (c.source === 'Referral') { prob += 10; signals.push('Internal Referral'); }
            prob = Math.min(prob, 95);
            return { id: c.id, name: c.name, role: c.role || 'Unknown', probability: prob, status: c.stage, signals, priority: prob > 80 ? 'High' : prob > 60 ? 'Medium' : 'Low' };
        }).sort((a, b) => b.probability - a.probability);
    } catch (error) { console.error('Error predictor:', error); return []; }
};

export const getInternalSalaryStats = async () => {
    if (DEV_MODE) return Promise.resolve([{ role: 'Senior React Developer', internalAverage: 120000 }, { role: 'Product Manager', internalAverage: 110000 }]);
    try {
        const snapshot = await getDocs(query(collection(db, EMPLOYEES_COLLECTION), where('status', '!=', 'Exited')));
        const employees = snapshot.docs.map(doc => doc.data());
        const stats = employees.reduce((acc, emp) => {
            const role = emp.role || 'Other';
            if (!acc[role]) acc[role] = { totalSalary: 0, count: 0 };
            const sal = emp.salary || 600000;
            acc[role].totalSalary += sal; acc[role].count++;
            return acc;
        }, {});
        return Object.entries(stats).map(([role, data]) => ({ role, internalAverage: Math.round(data.totalSalary / data.count) }));
    } catch (error) { console.error('Error salary stats:', error); return []; }
};

export const getDashboardStats = async () => {
    if (DEV_MODE) {
        return Promise.resolve([
            { name: 'Human Capital Base', value: '1,234', change: '+12%', color: 'text-primary', bg: 'bg-primary/10' },
            { name: 'Strategic Openings', value: '42', change: '+4', color: 'text-secondary', bg: 'bg-secondary/10' },
            { name: 'Vetted Talent Pool', value: '1,564', change: '+23%', color: 'text-accent', bg: 'bg-accent/10' },
            { name: 'Acquisition Velocity', value: '18 Days', change: '-2 Days', color: 'text-violet', bg: 'bg-violet/10' },
        ]);
    }

    try {
        const [empSnap, candSnap, jobSnap] = await Promise.all([
            getDocs(query(collection(db, EMPLOYEES_COLLECTION), where('status', '==', 'Active'))),
            getDocs(query(collection(db, CANDIDATES_COLLECTION), where('stage', 'not-in', ['Rejected', 'Hired']))),
            getDocs(query(collection(db, 'jobs'), where('status', '==', 'Active')))
        ]);

        const empCount = empSnap.size;
        const candCount = candSnap.size;
        const jobCount = jobSnap.size;

        // Acquisition Velocity (Mocked logic for now, could be dynamic)
        const tth = await getTimeToHireMetrics();
        const velocity = tth.average > 0 ? `${tth.average} Days` : '18 Days';

        return [
            { name: 'Human Capital Base', value: empCount.toLocaleString(), change: '+2%', color: 'text-primary', bg: 'bg-primary/10' },
            { name: 'Active Candidates', value: candCount.toLocaleString(), change: '+15%', color: 'text-accent', bg: 'bg-accent/10' },
            { name: 'Strategic Openings', value: jobCount.toLocaleString(), change: 'Stable', color: 'text-secondary', bg: 'bg-secondary/10' },
            { name: 'Acquisition Velocity', value: velocity, change: '-1 Day', color: 'text-violet', bg: 'bg-violet/10' },
        ];

    } catch (error) {
        console.error("Error fetching dashboard stats", error);
        return [];
    }
};

export const getRecruitmentAnalytics = async () => {
    const [funnel, timeToHire, timeToHireTrends, sourceEffectiveness, departmentMetrics, hiringTrends, diversity, predictorData, salaryStats, dashboardStats] = await Promise.all([
        getRecruitmentFunnel(), getTimeToHireMetrics(), getTimeToHireTrends(), getSourceEffectiveness(), getDepartmentMetrics(), getHiringTrends(), getDiversityMetrics(), getCandidatePredictorData(), getInternalSalaryStats(), getDashboardStats()
    ]);
    return { funnel, timeToHire, timeToHireTrends, sourceEffectiveness, departmentMetrics, hiringTrends, diversity, predictorData, salaryStats, dashboardStats };
};

export const getDEIDashboardMetrics = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_DEI_METRICS);
    try {
        // In real impl, this would aggregate data from employees and candidates collections
        // For now, we'll return the mock structure even in non-dev mode or implement basic aggregation
        // Returning mock structure for structure consistency until complex aggregation is implemented
        return Promise.resolve(MOCK_DEI_METRICS);
    } catch (error) { console.error('Error DEI metrics:', error); return null; }
};

export const getRecentActivity = async () => {
    if (DEV_MODE) {
        // Mock Data moved from RecentActivity.jsx
        const activities = [
            { id: 1, user: 'Sarah Smith', action: 'initiated engagement for', target: 'Senior React Developer', time: '2 hours ago', icon: 'UserPlus', color: 'text-primary', bg: 'bg-primary/10' },
            { id: 2, user: 'Mike Johnson', action: 'concluded collaborative analysis for', target: 'Product Manager', time: '4 hours ago', icon: 'MessageSquare', color: 'text-secondary', bg: 'bg-secondary/10' },
            { id: 3, user: 'Emily Davis', action: 'ratified covenant for', target: 'UX Designer', time: '1 day ago', icon: 'FileCheck', color: 'text-accent', bg: 'bg-accent/10' },
        ];
        return Promise.resolve(activities);
    }

    try {
        const snapshot = await getDocs(query(collection(db, 'activities'), orderBy('timestamp', 'desc'), limit(10)));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

export const getWorkforceHubs = async () => {
    if (DEV_MODE) {
        const HUBS = [
            { id: 1, name: 'San Francisco', staff: 45, sentiment: 88, load: 92, coord: { t: '25%', l: '15%' } },
            { id: 2, name: 'London Tech City', staff: 32, sentiment: 74, load: 85, coord: { t: '35%', l: '45%' } },
            { id: 3, name: 'Bangalore Hub', staff: 78, sentiment: 91, load: 60, coord: { t: '60%', l: '70%' } },
            { id: 4, name: 'Berlin Labs', staff: 22, sentiment: 82, load: 45, coord: { t: '38%', l: '52%' } },
            { id: 5, name: 'Singapore HQ', staff: 15, sentiment: 95, load: 70, coord: { t: '65%', l: '85%' } },
        ];
        return Promise.resolve(HUBS);
    }

    try {
        const snapshot = await getDocs(collection(db, HUBS_COLLECTION));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching hubs:', error);
        return [];
    }
};

export const getMarketSalaryBenchmarks = async () => {
    if (DEV_MODE) {
        const MARKET_DATA = {
            'SDE I': 1400000,
            'SDE II': 2200000,
            'Product Manager': 2500000,
            'Designer': 1000000,
            'Senior Software Engineer': 3200000,
            'HR Manager': 1500000
        };
        return Promise.resolve(MARKET_DATA);
    }

    try {
        const snapshot = await getDocs(collection(db, MARKET_BENCHMARKS_COLLECTION));
        const data = {};
        snapshot.docs.forEach(doc => {
            const entry = doc.data();
            data[entry.role] = entry.median;
        });
        return data;
    } catch (error) {
        console.error('Error fetching market benchmarks:', error);
        return {};
    }
};
