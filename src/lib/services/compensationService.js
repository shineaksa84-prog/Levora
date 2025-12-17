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

export default {
    getPayrollHistory,
    getSalaryStructure,
    getTaxDeductions,
    getEnrolledBenefits,
    getAvailableBenefits,
    enrollInBenefit
};
