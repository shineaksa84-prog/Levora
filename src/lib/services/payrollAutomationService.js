/**
 * Payroll Automation Service (Non-AI / Deterministic)
 * Handles rule-based calculations, statutory compliance, and anomaly detection.
 */

// Statutory Constants (Sample for 2024-25)
const STATUTORY_RULES = {
    PF_RATE_EMPLOYER: 0.12,
    PF_RATE_EMPLOYEE: 0.12,
    ESI_RATE_EMPLOYER: 0.0325,
    ESI_RATE_EMPLOYEE: 0.0075,
    ESI_THRESHOLD: 21000,
    PROF_TAX_SLAB: 200,
    TAX_SLABS: [
        { limit: 300000, rate: 0 },
        { limit: 600000, rate: 0.05 },
        { limit: 900000, rate: 0.10 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 }
    ]
};

/**
 * Calculate deterministic statutory deductions for a given gross salary
 */
export function calculateStatutoryDeductions(basic, gross) {
    const pf = Math.min(basic * STATUTORY_RULES.PF_RATE_EMPLOYEE, 1800); // PF capped at 15k basic usually
    const esi = gross <= STATUTORY_RULES.ESI_THRESHOLD ? gross * STATUTORY_RULES.ESI_RATE_EMPLOYEE : 0;

    // Simple Slab-based Tax Calculation (Monthly)
    const annualGross = gross * 12;
    let tax = 0;
    let prevLimit = 0;

    for (const slab of STATUTORY_RULES.TAX_SLABS) {
        if (annualGross > prevLimit) {
            const taxableInSlab = Math.min(annualGross - prevLimit, slab.limit - prevLimit);
            tax += taxableInSlab * slab.rate;
            prevLimit = slab.limit;
        } else break;
    }

    const monthlyTax = tax / 12;

    return {
        pf: Math.round(pf),
        esi: Math.round(esi),
        tax: Math.round(monthlyTax),
        totalDeductions: Math.round(pf + esi + monthlyTax + STATUTORY_RULES.PROF_TAX_SLAB)
    };
}

/**
 * Detect deterministic anomalies in payroll records
 */
export function runAnomalyDetection(record, prevRecords = []) {
    const anomalies = [];

    // Rule 1: Negative Net Pay
    if (record.gross - record.deductions < 0) {
        anomalies.push({ rule: 'NET_NEGATIVE', severity: 'Critical', message: 'Calculated Net Pay is negative.' });
    }

    // Rule 2: Significant Variance (> 50% from base)
    if (record.basic > 500000) {
        anomalies.push({ rule: 'HIGH_VARIANCE', severity: 'Warning', message: 'Salary exceeds typical executive threshold.' });
    }

    // Rule 3: Missing Bank / Entity Data (Mock check)
    if (!record.id) {
        anomalies.push({ rule: 'DATA_MISSING', severity: 'Critical', message: 'Employee ID link is broken.' });
    }

    return anomalies;
}

/**
 * Audit record against statutory compliance rules
 */
export function runComplianceAudit(record) {
    const violations = [];

    // Rule: Minimum Wage Check (Mock)
    if (record.gross < 15000) {
        violations.push({ rule: 'MIN_WAGE', message: 'Gross salary below statutory minimum wage threshold.' });
    }

    // Rule: HRA Cap (e.g., HRA shouldn't exceed 50% of basic)
    if (record.hra > record.basic * 0.5) {
        violations.push({ rule: 'HRA_EXCESS', message: 'HRA exceeds 50% of basic salary (Compliance Risk).' });
    }

    return violations;
}

export default {
    calculateStatutoryDeductions,
    runAnomalyDetection,
    runComplianceAudit
};
