/**
 * Analytics Service
 * Tracks and analyzes recruitment, hiring, and HR metrics
 */

/**
 * Track applicant metrics for analytics
 */
export const trackApplicantMetrics = (applicant, action) => {
    const metrics = JSON.parse(localStorage.getItem('applicantMetrics') || '[]');

    const metric = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        applicantId: applicant.id,
        jobId: applicant.jobId,
        action: action, // 'applied', 'screened', 'interviewed', 'offered', 'hired', 'rejected'
        stage: applicant.stage,
        timestamp: new Date().toISOString(),
        metadata: {
            source: applicant.source || 'Direct',
            location: applicant.location,
            role: applicant.role,
            department: applicant.department
        }
    };

    metrics.push(metric);
    localStorage.setItem('applicantMetrics', JSON.stringify(metrics));

    return metric;
};

/**
 * Get recruitment funnel data
 */
export const getRecruitmentFunnel = (filters = {}) => {
    const metrics = JSON.parse(localStorage.getItem('applicantMetrics') || '[]');
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');

    // Apply filters
    let filteredMetrics = metrics;
    if (filters.startDate) {
        filteredMetrics = filteredMetrics.filter(m => new Date(m.timestamp) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
        filteredMetrics = filteredMetrics.filter(m => new Date(m.timestamp) <= new Date(filters.endDate));
    }
    if (filters.department) {
        filteredMetrics = filteredMetrics.filter(m => m.metadata.department === filters.department);
    }

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
};

/**
 * Calculate conversion rate
 */
const calculateConversionRate = (from, to) => {
    if (from === 0) return 0;
    return ((to / from) * 100).toFixed(1);
};

/**
 * Get time-to-hire metrics
 */
export const getTimeToHireMetrics = () => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const hiredCandidates = candidates.filter(c => c.status === 'Hired' && c.appliedDate && c.hiredDate);

    if (hiredCandidates.length === 0) {
        return { average: 0, min: 0, max: 0, data: [] };
    }

    const timeToHireData = hiredCandidates.map(candidate => {
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

    const days = timeToHireData.map(d => d.days);

    return {
        average: (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1),
        min: Math.min(...days),
        max: Math.max(...days),
        data: timeToHireData
    };
};

/**
 * Get source effectiveness metrics
 */
export const getSourceEffectiveness = () => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');

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
};

/**
 * Get department-wise hiring metrics
 */
export const getDepartmentMetrics = () => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

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
};

/**
 * Get hiring trends over time
 */
export const getHiringTrends = (months = 6) => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const hiredCandidates = candidates.filter(c => c.status === 'Hired' && c.hiredDate);

    const trends = [];
    const today = new Date();

    for (let i = months - 1; i >= 0; i--) {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

        const hired = hiredCandidates.filter(c => {
            const hiredDate = new Date(c.hiredDate);
            return hiredDate >= month && hiredDate <= monthEnd;
        }).length;

        trends.push({
            month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            hired: hired
        });
    }

    return trends;
};

/**
 * Get diversity metrics
 */
export const getDiversityMetrics = () => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const activeEmployees = employees.filter(e => e.status !== 'Exited');

    // This is placeholder data - in a real app, you'd have actual diversity data
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
};

/**
 * Get overall recruitment analytics dashboard data
 */
export const getRecruitmentAnalytics = () => {
    return {
        funnel: getRecruitmentFunnel(),
        timeToHire: getTimeToHireMetrics(),
        sourceEffectiveness: getSourceEffectiveness(),
        departmentMetrics: getDepartmentMetrics(),
        hiringTrends: getHiringTrends(),
        diversity: getDiversityMetrics()
    };
};
