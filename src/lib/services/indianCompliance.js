/**
 * Indian Compliance Validation Service
 * Handles validation for Indian-specific fields
 */

class IndianComplianceService {
    /**
     * Validate PAN (Permanent Account Number)
     * Format: ABCDE1234F
     */
    validatePAN(pan) {
        if (!pan) {
            return { valid: false, error: 'PAN is required' };
        }

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (!panRegex.test(pan)) {
            return {
                valid: false,
                error: 'Invalid PAN format. Expected format: ABCDE1234F'
            };
        }

        return { valid: true };
    }

    /**
     * Validate Aadhaar Number
     * Format: 12 digits
     */
    validateAadhaar(aadhaar) {
        if (!aadhaar) {
            return { valid: false, error: 'Aadhaar is required' };
        }

        // Remove spaces and hyphens
        const cleanAadhaar = aadhaar.replace(/[\s-]/g, '');

        if (!/^\d{12}$/.test(cleanAadhaar)) {
            return {
                valid: false,
                error: 'Aadhaar must be 12 digits'
            };
        }

        return { valid: true };
    }

    /**
     * Mask Aadhaar for display (show only last 4 digits)
     */
    maskAadhaar(aadhaar) {
        if (!aadhaar) return '';
        const clean = aadhaar.replace(/[\s-]/g, '');
        return 'XXXX-XXXX-' + clean.slice(-4);
    }

    /**
     * Validate IFSC Code
     * Format: ABCD0123456 (4 letters, 0, 6 alphanumeric)
     */
    validateIFSC(ifsc) {
        if (!ifsc) {
            return { valid: false, error: 'IFSC code is required' };
        }

        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

        if (!ifscRegex.test(ifsc)) {
            return {
                valid: false,
                error: 'Invalid IFSC format. Expected format: ABCD0123456'
            };
        }

        return { valid: true };
    }

    /**
     * Get bank details from IFSC (mock - replace with actual API)
     */
    async getBankFromIFSC(ifsc) {
        // Mock implementation - in production, use RBI/bank API
        const mockBanks = {
            'SBIN': 'State Bank of India',
            'HDFC': 'HDFC Bank',
            'ICIC': 'ICICI Bank',
            'AXIS': 'Axis Bank',
            'PUNB': 'Punjab National Bank'
        };

        const bankCode = ifsc.substring(0, 4);
        const bankName = mockBanks[bankCode] || 'Unknown Bank';

        return {
            bank: bankName,
            branch: 'Branch Name (Mock)',
            address: 'Branch Address (Mock)'
        };
    }

    /**
     * Validate UAN (Universal Account Number)
     * Format: 12 digits
     */
    validateUAN(uan) {
        if (!uan) {
            return { valid: false, error: 'UAN is required' };
        }

        if (!/^\d{12}$/.test(uan)) {
            return {
                valid: false,
                error: 'UAN must be 12 digits'
            };
        }

        return { valid: true };
    }

    /**
     * Calculate EPF contribution
     * Employee: 12% of Basic + DA
     * Employer: 12% of Basic + DA (split: 3.67% EPF + 8.33% EPS)
     */
    calculateEPF(basic, da = 0) {
        const wage = basic + da;
        const maxWage = 15000; // EPF wage ceiling
        const applicableWage = Math.min(wage, maxWage);

        const employeeContribution = Math.round(applicableWage * 0.12);
        const employerEPF = Math.round(applicableWage * 0.0367);
        const employerEPS = Math.round(applicableWage * 0.0833);
        const employerTotal = employerEPF + employerEPS;

        return {
            employeeContribution,
            employerEPF,
            employerEPS,
            employerTotal,
            totalContribution: employeeContribution + employerTotal,
            applicableWage
        };
    }

    /**
     * Calculate ESIC contribution
     * Employee: 0.75% of gross
     * Employer: 3.25% of gross
     * Applicable if gross <= 21,000
     */
    calculateESIC(grossSalary) {
        const maxSalary = 21000;

        if (grossSalary > maxSalary) {
            return {
                applicable: false,
                reason: `Salary exceeds ₹${maxSalary.toLocaleString()}`
            };
        }

        const employeeContribution = Math.round(grossSalary * 0.0075);
        const employerContribution = Math.round(grossSalary * 0.0325);

        return {
            applicable: true,
            employeeContribution,
            employerContribution,
            totalContribution: employeeContribution + employerContribution
        };
    }

    /**
     * Calculate Professional Tax by state
     */
    calculateProfessionalTax(monthlySalary, state) {
        const ptSlabs = {
            'Maharashtra': [
                { min: 0, max: 7500, tax: 0 },
                { min: 7501, max: 10000, tax: 175 },
                { min: 10001, max: Infinity, tax: 200 }
            ],
            'Karnataka': [
                { min: 0, max: 15000, tax: 0 },
                { min: 15001, max: Infinity, tax: 200 }
            ],
            'Tamil Nadu': [
                { min: 0, max: 21000, tax: 0 },
                { min: 21001, max: Infinity, tax: 208.33 }
            ],
            'West Bengal': [
                { min: 0, max: 10000, tax: 0 },
                { min: 10001, max: 15000, tax: 110 },
                { min: 15001, max: 25000, tax: 130 },
                { min: 25001, max: 40000, tax: 150 },
                { min: 40001, max: Infinity, tax: 200 }
            ]
        };

        const slabs = ptSlabs[state] || [];

        if (slabs.length === 0) {
            return { tax: 0, state, note: 'PT not applicable in this state' };
        }

        const slab = slabs.find(s => monthlySalary >= s.min && monthlySalary <= s.max);

        return {
            tax: slab ? slab.tax : 0,
            state,
            monthlySalary
        };
    }

    /**
     * Generate Indian salary structure
     */
    generateSalaryStructure(ctc) {
        const basic = Math.round(ctc * 0.40); // 40% of CTC
        const hra = Math.round(ctc * 0.20); // 20% of CTC
        const specialAllowance = Math.round(ctc * 0.25); // 25% of CTC

        const epf = this.calculateEPF(basic);
        const gross = basic + hra + specialAllowance;
        const esic = this.calculateESIC(gross);

        const deductions = epf.employeeContribution + (esic.applicable ? esic.employeeContribution : 0);
        const netSalary = gross - deductions;

        return {
            ctc,
            components: {
                basic,
                hra,
                specialAllowance,
                gross
            },
            deductions: {
                epf: epf.employeeContribution,
                esic: esic.applicable ? esic.employeeContribution : 0,
                total: deductions
            },
            netSalary,
            monthlyGross: Math.round(gross / 12),
            monthlyNet: Math.round(netSalary / 12)
        };
    }

    /**
     * Calculate Gratuity
     * Formula: (Last Drawn Salary * Years of Service * 15) / 26
     * Eligibility: Minimum 5 years of service
     */
    calculateGratuity(lastDrawnSalary, yearsOfService) {
        if (yearsOfService < 5) {
            return {
                eligible: false,
                amount: 0,
                message: 'Minimum 5 years of service required for gratuity'
            };
        }

        const gratuity = Math.round((lastDrawnSalary * yearsOfService * 15) / 26);
        const maxGratuity = 2000000; // 20 Lakhs limit

        return {
            eligible: true,
            amount: Math.min(gratuity, maxGratuity),
            formula: `(${lastDrawnSalary} × ${yearsOfService} × 15) / 26`,
            capped: gratuity > maxGratuity
        };
    }
}

export const indianComplianceService = new IndianComplianceService();
export default IndianComplianceService;
