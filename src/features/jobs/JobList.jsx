import { useState, useEffect } from 'react';
import { Plus, MapPin, Users, Clock, MoreHorizontal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoleGuard } from '../../components/RoleGuard';

// Static jobs removed, using state instead

import { getJobs, seedJobs } from '../../lib/services/jobService';
import { Loader2 } from 'lucide-react';

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            let data = await getJobs();
            if (data.length === 0) {
                // Auto-seed for demo
                data = await seedJobs();
            }
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
                <RoleGuard resource="jobs" action="create">
                    <Link to="/jobs/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Create Job
                    </Link>
                </RoleGuard>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">{job.title}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${job.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                                    }`}>
                                    {job.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <BriefcaseIcon className="w-3.5 h-3.5" />
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {job.posted}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-2xl font-bold">{job.applicants}</p>
                                <p className="text-xs text-muted-foreground">Applicants</p>
                            </div>
                            <div className="h-8 w-px bg-border"></div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors" title="AI Optimize">
                                    <Sparkles className="w-5 h-5 text-purple-500" />
                                </button>
                                <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BriefcaseIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    )
}
