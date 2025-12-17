import DashboardStats from './DashboardStats';
import RecruitmentFunnel from './RecruitmentFunnel';
import RecentActivity from './RecentActivity';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Overview of system activity and recruitment metrics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                        Generate Report
                    </button>
                </div>
            </div>

            <DashboardStats />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <RecruitmentFunnel />
                </div>
                <div className="lg:col-span-3">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
}
