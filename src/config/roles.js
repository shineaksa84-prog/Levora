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
    ShieldAlert,
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
    IT_ADMIN: 'it_admin',
    VENDOR: 'vendor'
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
            { name: 'Attrition Risk', href: `${BASE}/attrition-risk`, icon: ShieldAlert },
            { name: 'AI Hub', href: `${BASE}/ai-hub`, icon: MessageSquare },
            { name: 'Automation', href: `${BASE}/automation`, icon: Zap },
            { name: 'Compliance', href: `${BASE}/compliance`, icon: Shield },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Sourcing', href: `${BASE}/sourcing`, icon: Search },
            { name: 'Admin Toolkit', href: `${BASE}/toolkit`, icon: Zap },
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
            { name: 'Compliance', href: `${BASE}/compliance`, icon: Shield },
            { name: 'Offboarding', href: `${BASE}/offboarding`, icon: LogOut },
            { name: 'Attrition Risk', href: `${BASE}/attrition-risk`, icon: ShieldAlert },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.PAYROLL]: {
        label: 'Payroll Specialist',
        dashboard: 'PayrollDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Salary Run', href: `${BASE}/compensation`, icon: DollarSign },
            { name: 'Components', href: `${BASE}/compensation`, icon: CreditCard },
            { name: 'Analytics', href: `${BASE}/analytics`, icon: BarChart3 },
            { name: 'Compliance', href: `${BASE}/compliance`, icon: Shield },
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
            { name: 'Automation', href: `${BASE}/automation`, icon: Zap },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.EMPLOYEE]: {
        label: 'Employee',
        dashboard: 'EmployeeDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Self Service', href: `${BASE}/self-service`, icon: Ticket },
            { name: 'Attendance', href: `${BASE}/attendance`, icon: Clock },
            { name: 'Performance', href: `${BASE}/performance`, icon: TrendingUp },
            { name: 'Compensation', href: `${BASE}/compensation`, icon: FileText },
            { name: 'Engagement', href: `${BASE}/engagement`, icon: Heart },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.CANDIDATE]: {
        label: 'Candidate',
        dashboard: 'CandidateDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Jobs', href: `${BASE}/jobs`, icon: Briefcase },
            { name: 'Interviews', href: `${BASE}/interviews`, icon: Video },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.IT_ADMIN]: {
        label: 'IT Administrator',
        dashboard: 'ITAdminDashboard',
        navigation: [
            { name: 'Dashboard', href: `${BASE}`, icon: LayoutDashboard },
            { name: 'Assets', href: `${BASE}/assets`, icon: Briefcase },
            { name: 'Tickets', href: `${BASE}/tickets`, icon: Ticket },
            { name: 'Systems', href: `${BASE}/systems`, icon: Zap },
            { name: 'Security', href: `${BASE}/security`, icon: Shield },
            { name: 'Users', href: `${BASE}/admin-users`, icon: Users },
            { name: 'Settings', href: `${BASE}/settings`, icon: Settings },
        ]
    },
    [ROLES.VENDOR]: {
        label: 'Agency Partner',
        dashboard: 'VendorDashboard',
        navigation: [
            { name: 'Portal', href: '/agency/app', icon: LayoutDashboard },
        ]
    }
};
