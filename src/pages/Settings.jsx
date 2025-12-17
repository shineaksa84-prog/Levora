import { useState } from 'react';
import { User, Bell, Users, Link as LinkIcon, CreditCard, Save, Globe, MoreVertical, Plus, Check, Database } from 'lucide-react';
import { migrateToCloud } from '../lib/services/migrationService';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [migrating, setMigrating] = useState(false);
    const [migrationResult, setMigrationResult] = useState(null);

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        weeklyDigest: true,
        candidateAlerts: true
    });

    const handleMigration = async () => {
        if (!confirm('This will upload your local data to the cloud. Proceed?')) return;

        setMigrating(true);
        const result = await migrateToCloud();
        setMigrating(false);

        if (result.success) {
            setMigrationResult(`Migration successful! Uploaded ${result.results.candidates.success} candidates, ${result.results.employees.success} employees.`);
        } else {
            setMigrationResult(`Migration failed: ${result.error}`);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'integrations', label: 'Integrations', icon: LinkIcon },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'migration', label: 'Migration', icon: Database },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your organization preferences and account settings.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Company Profile</h2>
                                    <p className="text-sm text-muted-foreground">Update your company details and branding.</p>
                                </div>
                                <div className="grid gap-4 max-w-xl">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Company Name</label>
                                        <input type="text" defaultValue="Acme Corp" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Website</label>
                                        <input type="url" defaultValue="https://acme.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Regional Settings</h2>
                                    <p className="text-sm text-muted-foreground">Set your default timezone and currency.</p>
                                </div>
                                <div className="grid gap-4 max-w-xl">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Timezone</label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                            <option>Pacific Time (US & Canada)</option>
                                            <option>Eastern Time (US & Canada)</option>
                                            <option>UTC</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Email Notifications</h2>
                                    <p className="text-sm text-muted-foreground">Choose what updates you want to receive via email.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Weekly Digest</label>
                                            <p className="text-sm text-muted-foreground">Summary of candidate activity and new applications.</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notifications.weeklyDigest}
                                            onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">New Candidate Alerts</label>
                                            <p className="text-sm text-muted-foreground">Get notified when a high-match candidate applies.</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notifications.candidateAlerts}
                                            onChange={(e) => setNotifications({ ...notifications, candidateAlerts: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">User Management</h2>
                                        <p className="text-sm text-muted-foreground">Manage access and roles for your team members.</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add User
                                    </button>
                                </div>

                                <div className="rounded-md border border-border">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-muted/50 border-b border-border text-left">
                                                <th className="p-4 font-medium text-muted-foreground">User</th>
                                                <th className="p-4 font-medium text-muted-foreground">Role</th>
                                                <th className="p-4 font-medium text-muted-foreground">Status</th>
                                                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { id: 1, name: 'Sarah Wilson', email: 'sarah.w@company.com', role: 'Admin', status: 'Active' },
                                                { id: 2, name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Recruiter', status: 'Active' },
                                                { id: 3, name: 'Emily Chen', email: 'emily.c@company.com', role: 'Hiring Manager', status: 'Invited' },
                                                { id: 4, name: 'David Brown', email: 'david.b@company.com', role: 'Employee', status: 'Inactive' },
                                            ].map((user) => (
                                                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{user.name}</p>
                                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium border border-border">
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                            user.status === 'Invited' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {user.status === 'Active' && <Check className="w-3 h-3 mr-1" />}
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Connected Apps</h2>
                                    <p className="text-sm text-muted-foreground">Manage your third-party integrations.</p>
                                </div>
                                <div className="grid gap-4">
                                    {['Slack', 'Google Calendar', 'Zoom', 'LinkedIn'].map((app) => (
                                        <div key={app} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                    <LinkIcon className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{app}</p>
                                                    <p className="text-sm text-muted-foreground">Sync data and automate workflows.</p>
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors">
                                                Connect
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Current Plan</h2>
                                    <p className="text-sm text-muted-foreground">You are currently on the Pro plan.</p>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                                    <div>
                                        <p className="font-semibold text-primary">Pro Plan</p>
                                        <p className="text-sm text-muted-foreground">$49/month per user</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                        Upgrade
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'migration' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Cloud Sync</h2>
                                        <p className="text-sm text-muted-foreground">Move your local data to the cloud database</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm mb-4">
                                        Your application is currently running with local data.
                                        Click below to sync your Candidates and Employees to the central database.
                                    </p>

                                    <button
                                        onClick={handleMigration}
                                        disabled={migrating}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {migrating ? 'Migrating data...' : 'Start Cloud Migration'}
                                    </button>

                                    {migrationResult && (
                                        <p className={`mt-3 text-sm font-medium ${migrationResult.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
                                            {migrationResult}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
