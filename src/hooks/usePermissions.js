import { useAuth } from '../contexts/AuthContext';
import { hasPermission, getRolePermissions, canAccessRoute } from '../config/permissions';

/**
 * Custom hook for checking permissions
 * Usage:
 *   const { can, canAccess } = usePermissions();
 *   if (can('candidates', 'edit')) { ... }
 *   if (canAccess('/candidates')) { ... }
 */
export function usePermissions() {
    const { user } = useAuth();

    const can = (resource, action) => {
        if (!user || !user.role) return false;
        return hasPermission(user.role, resource, action);
    };

    const canAccess = (route) => {
        if (!user || !user.role) return false;
        return canAccessRoute(user.role, route);
    };

    const getAllPermissions = () => {
        if (!user || !user.role) return {};
        return getRolePermissions(user.role);
    };

    return {
        can,
        canAccess,
        getAllPermissions,
        role: user?.role
    };
}
