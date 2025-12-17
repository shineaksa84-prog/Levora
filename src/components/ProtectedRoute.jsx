import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { canAccessRoute } from '../config/permissions';

/**
 * ProtectedRoute component
 * Wraps routes that require specific role permissions
 * 
 * Usage:
 *   <ProtectedRoute allowedRoles={['admin', 'recruiter']}>
 *     <Candidates />
 *   </ProtectedRoute>
 */
export function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-card border border-border rounded-xl">
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-muted-foreground">
                        You don't have permission to access this page.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Current role: <span className="font-medium">{user.role}</span>
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
}

/**
 * RouteGuard component
 * Checks route permissions based on current path
 * 
 * Usage in Route:
 *   <Route path="/candidates" element={
 *     <RouteGuard><Candidates /></RouteGuard>
 *   } />
 */
export function RouteGuard({ children }) {
    const { user } = useAuth();
    const currentPath = window.location.pathname;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!canAccessRoute(user.role, currentPath)) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-card border border-border rounded-xl">
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-muted-foreground">
                        You don't have permission to access this page.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Current role: <span className="font-medium">{user.role}</span>
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
}
