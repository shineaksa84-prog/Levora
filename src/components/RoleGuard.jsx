import { usePermissions } from '../hooks/usePermissions';

/**
 * RoleGuard component
 * Conditionally renders children based on permission check
 * 
 * Usage:
 *   <RoleGuard resource="candidates" action="delete">
 *     <button>Delete</button>
 *   </RoleGuard>
 * 
 *   OR with allowedRoles:
 *   <RoleGuard allowedRoles={['admin', 'recruiter']}>
 *     <button>Edit</button>
 *   </RoleGuard>
 */
export function RoleGuard({ children, resource, action, allowedRoles, fallback = null }) {
    const { can, role } = usePermissions();

    // Check by resource and action
    if (resource && action) {
        return can(resource, action) ? children : fallback;
    }

    // Check by allowed roles
    if (allowedRoles) {
        return allowedRoles.includes(role) ? children : fallback;
    }

    // If no checks specified, render children
    return children;
}

/**
 * Can component (alternative naming)
 * Same as RoleGuard but more semantic for permissions
 */
export function Can({ children, resource, action, fallback = null }) {
    return (
        <RoleGuard
            resource={resource}
            action={action}
            fallback={fallback}
        >
            {children}
        </RoleGuard>
    );
}
