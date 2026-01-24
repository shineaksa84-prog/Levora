import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../config/roles';

// Import Dashboards (we'll create these next)
import AdminDashboard from '../../features/dashboard/AdminDashboard';
import SuperAdminDashboard from '../../features/dashboard/SuperAdminDashboard';
import RecruiterDashboard from '../../features/dashboard/RecruiterDashboard';
import OpsDashboard from '../../features/dashboard/OpsDashboard';
import PayrollDashboard from '../../features/dashboard/PayrollDashboard';
import EmployeeDashboard from '../../features/dashboard/EmployeeDashboard';
import CandidateDashboard from '../../features/dashboard/CandidateDashboard';
import ManagerDashboard from '../../features/dashboard/ManagerDashboard';
import ITAdminDashboard from '../../features/dashboard/ITAdminDashboard';

export default function RoleBasedDashboard() {
    const { user } = useAuth();

    if (!user || !user.role) {
        return <div className="p-6">Unauthorized or missing user role.</div>;
    }

    switch (user.role) {
        case ROLES.ADMIN:
            return <AdminDashboard />;
        case ROLES.SUPER_ADMIN:
            return <SuperAdminDashboard />;
        case ROLES.RECRUITER:
            return <RecruiterDashboard />;
        case ROLES.HR_OPS:
            return <OpsDashboard />;
        case ROLES.PAYROLL:
            return <PayrollDashboard />;
        case ROLES.HIRING_MANAGER:
            return <ManagerDashboard />;
        case ROLES.EMPLOYEE:
            return <EmployeeDashboard />;
        case ROLES.CANDIDATE:
            return <CandidateDashboard />;
        case ROLES.IT_ADMIN:
            return <ITAdminDashboard />;
        default:
            return <div className="p-6">Dashboard not implemented for this role yet.</div>;
    }
}
