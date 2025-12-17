import { ROLES } from './roles';

/**
 * Permission configuration for each role
 * Format: { resource: { action: [allowedRoles] } }
 */
export const PERMISSIONS = {
    candidates: {
        view: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
        create: [ROLES.ADMIN, ROLES.RECRUITER],
        edit: [ROLES.ADMIN, ROLES.RECRUITER],
        delete: [ROLES.ADMIN],
        assign: [ROLES.ADMIN, ROLES.RECRUITER],
    },
    jobs: {
        view: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
        create: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
        edit: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
        delete: [ROLES.ADMIN],
        publish: [ROLES.ADMIN, ROLES.RECRUITER],
    },
    employees: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER, ROLES.PAYROLL],
        viewAll: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.PAYROLL],
        viewTeam: [ROLES.HIRING_MANAGER],
        viewOwn: [ROLES.EMPLOYEE],
        create: [ROLES.ADMIN, ROLES.HR_OPS],
        edit: [ROLES.ADMIN, ROLES.HR_OPS],
        delete: [ROLES.ADMIN],
        editOwn: [ROLES.EMPLOYEE], // For profile updates
    },
    payroll: {
        view: [ROLES.ADMIN, ROLES.PAYROLL, ROLES.FINANCE],
        viewOwn: [ROLES.EMPLOYEE],
        runPayroll: [ROLES.ADMIN, ROLES.PAYROLL],
        editSalary: [ROLES.ADMIN, ROLES.PAYROLL],
        approveReimbursement: [ROLES.ADMIN, ROLES.PAYROLL, ROLES.HIRING_MANAGER],
    },
    performance: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER],
        viewOwn: [ROLES.EMPLOYEE],
        createReview: [ROLES.ADMIN, ROLES.HIRING_MANAGER],
        editReview: [ROLES.ADMIN, ROLES.HIRING_MANAGER],
        viewTeam: [ROLES.HIRING_MANAGER],
    },
    compliance: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.PAYROLL],
        edit: [ROLES.ADMIN, ROLES.HR_OPS],
        viewOwn: [ROLES.EMPLOYEE],
    },
    analytics: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.RECRUITER, ROLES.HIRING_MANAGER, ROLES.PAYROLL],
        viewRecruitment: [ROLES.ADMIN, ROLES.RECRUITER],
        viewPayroll: [ROLES.ADMIN, ROLES.PAYROLL, ROLES.FINANCE],
        viewPerformance: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER],
    },
    settings: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.PAYROLL],
        edit: [ROLES.ADMIN],
        viewOwn: [ROLES.EMPLOYEE, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
    },
    interviews: {
        view: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
        schedule: [ROLES.ADMIN, ROLES.RECRUITER],
        giveFeedback: [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
    },
    onboarding: {
        view: [ROLES.ADMIN, ROLES.HR_OPS],
        create: [ROLES.ADMIN, ROLES.HR_OPS],
        edit: [ROLES.ADMIN, ROLES.HR_OPS],
    },
    offboarding: {
        view: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER],
        initiate: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.EMPLOYEE],
        approve: [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER],
    },
};

/**
 * Check if a role has permission for a resource action
 */
export function hasPermission(role, resource, action) {
    if (!role || !resource || !action) return false;

    // Admin has all permissions
    if (role === ROLES.ADMIN) return true;

    const resourcePermissions = PERMISSIONS[resource];
    if (!resourcePermissions) return false;

    const allowedRoles = resourcePermissions[action];
    if (!allowedRoles) return false;

    return allowedRoles.includes(role);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role) {
    if (!role) return {};

    const permissions = {};

    Object.keys(PERMISSIONS).forEach(resource => {
        permissions[resource] = {};
        Object.keys(PERMISSIONS[resource]).forEach(action => {
            permissions[resource][action] = hasPermission(role, resource, action);
        });
    });

    return permissions;
}

/**
 * Check if role can access a specific route
 */
export const ROUTE_PERMISSIONS = {
    '/': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HR_OPS, ROLES.PAYROLL, ROLES.HIRING_MANAGER, ROLES.EMPLOYEE],
    '/candidates': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
    '/jobs': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
    '/employees': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER, ROLES.PAYROLL],
    '/performance': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER, ROLES.EMPLOYEE],
    '/compensation': [ROLES.ADMIN, ROLES.PAYROLL, ROLES.EMPLOYEE],
    '/engagement': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.EMPLOYEE],
    '/offboarding': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.HIRING_MANAGER],
    '/analytics': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.RECRUITER, ROLES.HIRING_MANAGER, ROLES.PAYROLL],
    '/ai-hub': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HR_OPS],
    '/automation': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HR_OPS],
    '/compliance': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.PAYROLL],
    '/interviews': [ROLES.ADMIN, ROLES.RECRUITER, ROLES.HIRING_MANAGER],
    '/sourcing': [ROLES.ADMIN, ROLES.RECRUITER],
    '/settings': [ROLES.ADMIN, ROLES.HR_OPS, ROLES.PAYROLL, ROLES.RECRUITER, ROLES.HIRING_MANAGER, ROLES.EMPLOYEE],
};

export function canAccessRoute(role, route) {
    if (!role || !route) return false;

    // Admin can access everything
    if (role === ROLES.ADMIN) return true;

    const allowedRoles = ROUTE_PERMISSIONS[route];
    if (!allowedRoles) return true; // Allow if not specified

    return allowedRoles.includes(role);
}
