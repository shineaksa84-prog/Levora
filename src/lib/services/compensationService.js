import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';

/**
 * Compensation & Benefits Service
 * Handles payroll, salary structure, and benefits enrollment
 */

// ============= PAYROLL MANAGEMENT =============

/**
 * Get payroll history for an employee
 */
export async function getPayrollHistory(employeeId) {
    // Mock data
    return [
        {
            id: 1,
            month: "November 2024",
            date: "2024-11-28",
            gross: 8500.00,
            net: 6250.00,
            status: "Paid",
            reference: "PAY-2024-11"
        },
        {
            id: 2,
            month: "October 2024",
            date: "2024-10-28",
            gross: 8500.00,
            net: 6250.00,
            status: "Paid",
            reference: "PAY-2024-10"
        },
        {
            id: 3,
            month: "September 2024",
            date: "2024-09-28",
            gross: 8500.00,
            net: 6250.00,
            status: "Paid",
            reference: "PAY-2024-09"
        }
    ];
}

/**
 * Get current salary structure
 */
export async function getSalaryStructure(employeeId) {
    // Mock data
    return {
        basic: 5000.00,
        hra: 2000.00,
        specialAllowance: 1500.00,
        gross: 8500.00,
        currency: 'USD'
    };
}

/**
 * Get tax deductions
 */
export async function getTaxDeductions(employeeId) {
    // Mock data
    return {
        ytdTax: 24750.00,
        projectedTax: 33000.00,
        deductions: [
            { name: 'Federal Tax', amount: 1200.00 },
            { name: 'State Tax', amount: 450.00 },
            { name: 'Social Security', amount: 500.00 },
            { name: 'Medicare', amount: 100.00 }
        ]
    };
}

// ============= BENEFITS MANAGEMENT =============

/**
 * Get enrolled benefits
 */
export async function getEnrolledBenefits(employeeId) {
    // Mock data
    return [
        {
            id: 1,
            name: "Health Insurance Premium",
            provider: "BlueCross BlueShield",
            type: "Health",
            coverage: "$500,000",
            cost: "$250/mo",
            status: "Active",
            color: "text-red-500 bg-red-500/10"
        },
        {
            id: 2,
            name: "401(k) Retirement Plan",
            provider: "Fidelity",
            type: "Retirement",
            coverage: "5% Match",
            cost: "5% of Salary",
            status: "Active",
            color: "text-blue-500 bg-blue-500/10"
        },
        {
            id: 3,
            name: "Dental & Vision",
            provider: "Delta Dental",
            type: "Health",
            coverage: "Full Coverage",
            cost: "$45/mo",
            status: "Active",
            color: "text-cyan-500 bg-cyan-500/10"
        }
    ];
}

/**
 * Get available benefits for enrollment
 */
export async function getAvailableBenefits() {
    // Mock data
    return [
        {
            id: 4,
            name: "Gym Membership",
            provider: "Equinox",
            description: "Access to all Equinox locations worldwide",
            cost: "$80/mo"
        },
        {
            id: 5,
            name: "Life Insurance",
            provider: "MetLife",
            description: "Term life insurance up to 3x salary",
            cost: "$20/mo"
        }
    ];
}

/**
 * Enroll in a benefit
 */
export async function enrollInBenefit(employeeId, benefitId) {
    // Mock implementation
    const enrollment = {
        id: `enroll_${Date.now()}`,
        employeeId,
        benefitId,
        status: 'Pending',
        enrolledAt: new Date().toISOString()
    };

    // await addDoc(collection(db, 'compensation/benefits_enrollments'), enrollment);
    return enrollment;
}

/**
 * Get full salary structure for administration
 */
export async function getFullSalaryStructure() {
    return [
        { grade: 'M1', role: 'Staff Engineer', min: 140000, mid: 170000, max: 210000, currency: 'USD', count: 12 },
        { grade: 'P4', role: 'Senior Engineer', min: 110000, mid: 135000, max: 165000, currency: 'USD', count: 45 },
        { grade: 'P3', role: 'Engineer II', min: 90000, mid: 110000, max: 135000, currency: 'USD', count: 82 },
        { grade: 'P2', role: 'Engineer I', min: 70000, mid: 85000, max: 105000, currency: 'USD', count: 34 }
    ];
}

/**
 * Get variable pay history (Bonus, Commission)
 */
export async function getVariablePayHistory(employeeId) {
    return [
        { id: 1, type: 'Performance Bonus', amount: 12000, date: '2024-03-15', status: 'Paid', period: 'FY23 Annual' },
        { id: 2, type: 'Stock Grant (RSU)', amount: 25000, date: '2024-06-01', status: 'Vesting', period: 'Retention 2024' },
        { id: 3, type: 'Sales Commission', amount: 4500, date: '2024-11-20', status: 'Processing', period: 'Q3 2024' }
    ];
}

/**
 * Get compensation intelligence analytics
 */
export async function getCompIntelligence() {
    return {
        retentionRisk: [
            { level: 'Critical', count: 5, avgCompRatio: 0.82, impact: 'High' },
            { level: 'Elevated', count: 12, avgCompRatio: 0.88, impact: 'Medium' },
            { level: 'Low', count: 145, avgCompRatio: 1.05, impact: 'Low' }
        ],
        marketPosition: {
            percentile: 75,
            trend: '+5%',
            competitorAvg: 115000
        },
        payEquity: {
            genderGap: '2%',
            departmentVariance: '4.5%',
            status: 'Healthy'
        }
    };
}

// ============= GLOBAL PAYROLL ADMINISTRATION =============

/**
 * Get all employee payroll records (Admin/Payroll role only)
 */
export async function getAllPayrollRecords() {
    // Mock data for major employees
    return [
        { id: 'emp_1', name: 'Sarah Connor', department: 'Engineering', role: 'CTO', basic: 150000, hra: 60000, special: 40000, gross: 250000, payStatus: 'Verified' },
        { id: 'emp_2', name: 'Kyle Reese', department: 'Engineering', role: 'Lead Dev', basic: 120000, hra: 48000, special: 32000, gross: 200000, payStatus: 'Pending' },
        { id: 'emp_3', name: 'Julian Thorne', department: 'Sales', role: 'VP Sales', basic: 130000, hra: 52000, special: 78000, gross: 260000, payStatus: 'Verified' },
        { id: 'emp_4', name: 'Elena Fisher', department: 'Sales', role: 'Director', basic: 90000, hra: 36000, special: 24000, gross: 150000, payStatus: 'On Hold' },
    ];
}

/**
 * Update salary components for an employee
 */
export async function updateEmployeeSalary(employeeId, components) {
    console.log(`System: Salary protocol updated for ${employeeId}`, components);
    return { success: true, timestamp: new Date().toISOString() };
}

/**
 * Process bulk payroll run for all verified employees
 */
export async function processPayrollRun(batchId) {
    console.log(`System: Processing bulk pay run ${batchId}`);
    return { success: true, processedCount: 142, totalAmount: 1245000, status: 'Completed' };
}

export default {
    getPayrollHistory,
    getSalaryStructure,
    getTaxDeductions,
    getEnrolledBenefits,
    getAvailableBenefits,
    enrollInBenefit,
    getFullSalaryStructure,
    getVariablePayHistory,
    getCompIntelligence,
    getAllPayrollRecords,
    updateEmployeeSalary,
    processPayrollRun
};
