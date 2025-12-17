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

export const ROLE_CONFIG = {
    [ROLES.ADMIN]: {
        label: 'Admin',
        dashboard: 'AdminDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Candidates', href: '/candidates', icon: Users },
            { name: 'Jobs', href: '/jobs', icon: Briefcase },
            { name: 'Employees', href: '/employees', icon: FileText },
            { name: 'Attendance', href: '/attendance', icon: Clock },
            { name: 'Performance', href: '/performance', icon: TrendingUp },
            { name: 'Compensation', href: '/compensation', icon: DollarSign },
            { name: 'Engagement', href: '/engagement', icon: Heart },
            { name: 'Offboarding', href: '/offboarding', icon: LogOut },
            { name: 'Analytics', href: '/analytics', icon: BarChart3 },
            { name: 'AI Hub', href: '/ai-hub', icon: MessageSquare },
            { name: 'Automation', href: '/automation', icon: Zap },
            { name: 'Compliance', href: '/compliance', icon: Shield },
            { name: 'Interviews', href: '/interviews', icon: Video },
            { name: 'Sourcing', href: '/sourcing', icon: Search },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.SUPER_ADMIN]: {
        label: 'Super Admin',
        dashboard: 'SuperAdminDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Tenants', href: '/tenants', icon: Building },
            { name: 'Global Settings', href: '/global-settings', icon: Globe },
            { name: 'Admin Users', href: '/admin-users', icon: Users },
            { name: 'Billing Overview', href: '/billing-overview', icon: DollarSign },
        ]
    },
    [ROLES.RECRUITER]: {
        label: 'Recruiter',
        dashboard: 'RecruiterDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Candidates', href: '/candidates', icon: Users },
            { name: 'Jobs', href: '/jobs', icon: Briefcase },
            { name: 'Pipelines', href: '/jobs', icon: GitMerge },
            { name: 'AI Screening', href: '/ai-hub', icon: MessageSquare },
            { name: 'Interviews', href: '/interviews', icon: Video },
            { name: 'Offer Letters', href: '/candidates', icon: FileText },
            { name: 'Sourcing', href: '/sourcing', icon: Search },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.HR_OPS]: {
        label: 'HR Ops',
        dashboard: 'OpsDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Employees', href: '/employees', icon: Users },
            { name: 'Attendance', href: '/attendance', icon: Clock },
            { name: 'Onboarding', href: '/employees', icon: UserCheck },
            { name: 'HR Documents', href: '/documents', icon: FileText },
            { name: 'Exit Management', href: '/offboarding', icon: LogOut },
            { name: 'Compliance', href: '/compliance', icon: Shield },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.PAYROLL]: {
        label: 'Payroll Specialist',
        dashboard: 'PayrollDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Payroll Run', href: '/compensation', icon: DollarSign },
            { name: 'Salary Components', href: '/compensation', icon: CreditCard },
            { name: 'Reimbursements', href: '/compensation', icon: FileCheck },
            { name: 'Reports', href: '/analytics', icon: BarChart3 },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.HIRING_MANAGER]: {
        label: 'Hiring Manager',
        dashboard: 'ManagerDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'My Team', href: '/employees', icon: Users },
            { name: 'Attendance', href: '/attendance', icon: Clock },
            { name: 'Interviews', href: '/interviews', icon: Video },
            { name: 'Performance', href: '/performance', icon: TrendingUp },
            { name: 'Approvals', href: '/approvals', icon: CheckSquare },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.EMPLOYEE]: {
        label: 'Employee',
        dashboard: 'EmployeeDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'My Profile', href: '/profile', icon: User },
            { name: 'Self-Service', href: '/self-service', icon: Ticket },
            { name: 'Attendance', href: '/attendance', icon: Clock },
            { name: 'Leave', href: '/leave', icon: Calendar },
            { name: 'Payslips', href: '/compensation', icon: FileText },
            { name: 'Helpdesk', href: '/helpdesk', icon: HelpCircle },
            { name: 'Settings', href: '/settings', icon: Settings },
        ]
    },
    [ROLES.CANDIDATE]: {
        label: 'Candidate',
        dashboard: 'CandidateDashboard',
        navigation: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'My Applications', href: '/applications', icon: FileText },
            { name: 'Job Listings', href: '/jobs', icon: Briefcase },
            { name: 'Interviews', href: '/interviews', icon: Video },
            { name: 'Profile', href: '/profile', icon: User },
        ]
    }
};
