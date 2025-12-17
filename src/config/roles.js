import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    MessageSquare,
    Video,
    Search,
    BarChart3,
    Zap,
    Shield,
    TrendingUp,
    DollarSign,
    Heart,
    LogOut,
    ClipboardList,
    UserCheck,
    FileCheck,
    CreditCard,
    Calendar,
    Award,
    GitMerge,
    CheckSquare,
    User,
    BookOpen,
    HelpCircle,
    Building,
    Globe,
    Clock,
    Ticket
} from 'lucide-react';

export const ROLES = {
    ADMIN: 'admin',
    RECRUITER: 'recruiter',
    SUPER_ADMIN: 'super_admin',
    HR_OPS: 'hr_ops',
    HIRING_MANAGER: 'hiring_manager',
    PAYROLL: 'payroll',
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
    FINANCE: 'finance',
    IT_ADMIN: 'it_admin'
};

const BASE = '/app';

export const ROLE_CONFIG = {
    [ROLES.ADMIN]: {
        label: 'Admin',
        dashboard: 'AdminDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Candidates', href: `${BASE}/candidates`, icon: Users },
            { name: 'Jobs', href: `${BASE}/jobs`, icon: Briefcase },
            { name: 'Employees', href: `${BASE}/employees`, icon: FileText },
            { name: 'Attendance', href: `${BASE}/attendance`, icon: Clock },
            { name: 'Performance', href: `${BASE}/performance`, icon: TrendingUp },
            { name: 'Compensation', href: `${BASE}/compensation`, icon: DollarSign },
            { name: 'Engagement', href: `${BASE}/engagement`, icon: Heart },
            { name: 'Offboarding', href: `${BASE}/offboarding`, icon: LogOut },
            { name: 'Analytics', href: `${BASE}/analytics`, icon: BarChart3 },
            { name: 'AI Hub', href: `${BASE}/ai-hub`, icon: MessageSquare },
            { name: 'Automation', href: `${BASE}/automation`, icon: Zap },
            { name: 'Compliance', href: `${BASE}/compliance`, icon: Shield },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Sourcing', href: `${BASE}/sourcing`, icon: Search },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.SUPER_ADMIN]: {
        label: 'Super Admin',
        dashboard: 'SuperAdminDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Tenants', href: `${BASE}/tenants`, icon: Building },
            { name: 'Global Settings', href: `${BASE}/global-settings`, icon: Globe },
            { name: 'Admin Users', href: `${BASE}/admin-users`, icon: Users },
            { name: 'Billing Overview', href: `${BASE}/billing-overview`, icon: DollarSign },
        ]
    },
    [ROLES.RECRUITER]: {
        label: 'Recruiter',
        dashboard: 'RecruiterDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Candidates', href: `${BASE}/candidates`, icon: Users },
            { name: 'Jobs', href: `${BASE}/jobs`, icon: Briefcase },
            { name: 'Pipelines', href: `${BASE}/jobs`, icon: GitMerge },
            { name: 'AI Screening', href: `${BASE}/ai-hub`, icon: MessageSquare },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Offer Letters', href: `${BASE}/candidates`, icon: FileText },
            { name: 'Sourcing', href: `${BASE}/sourcing`, icon: Search },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.HR_OPS]: {
        label: 'HR Ops',
        dashboard: 'OpsDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Employees', href: `${BASE}/employees`, icon: Users },
            { name: 'Attendance', href: `${BASE}/attendance`, icon: Clock },
            { name: 'Onboarding', href: `${BASE}/employees`, icon: UserCheck },
            { name: 'HR Documents', href: `${BASE}/documents`, icon: FileText },
            { name: 'Exit Management', href: `${BASE}/offboarding`, icon: LogOut },
            { name: 'Compliance', href: `${BASE}/compliance`, icon: Shield },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.PAYROLL]: {
        label: 'Payroll Specialist',
        dashboard: 'PayrollDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Payroll Run', href: `${BASE}/compensation`, icon: DollarSign },
            { name: 'Salary Components', href: `${BASE}/compensation`, icon: CreditCard },
            { name: 'Reimbursements', href: `${BASE}/compensation`, icon: FileCheck },
            { name: 'Reports', href: `${BASE}/analytics`, icon: BarChart3 },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.HIRING_MANAGER]: {
        label: 'Hiring Manager',
        dashboard: 'ManagerDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'My Team', href: `${BASE}/employees`, icon: Users },
            { name: 'Attendance', href: `${BASE}/attendance`, icon: Clock },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Performance', href: `${BASE}/performance`, icon: TrendingUp },
            { name: 'Approvals', href: `${BASE}/approvals`, icon: CheckSquare },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.EMPLOYEE]: {
        label: 'Employee',
        dashboard: 'EmployeeDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'My Profile', href: `${BASE}/profile`, icon: User },
            { name: 'Self-Service', href: `${BASE}/self-service`, icon: Ticket },
            { name: 'Attendance', href: `${BASE}/attendance`, icon: Clock },
            { name: 'Leave', href: `${BASE}/leave`, icon: Calendar },
            { name: 'Payslips', href: `${BASE}/compensation`, icon: FileText },
            { name: 'Helpdesk', href: `${BASE}/helpdesk`, icon: HelpCircle },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.CANDIDATE]: {
        label: 'Candidate',
        dashboard: 'CandidateDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'My Applications', href: `${BASE}/applications`, icon: FileText },
            { name: 'Job Listings', href: `${BASE}/jobs`, icon: Briefcase },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Profile', href: `${BASE}/profile`, icon: User },
        ]
    }
};
