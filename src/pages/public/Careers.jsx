import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, ArrowRight, Building2, Globe } from 'lucide-react';

const OPEN_JOBS = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote / New York', type: 'Full-time' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time' },
    { id: 3, title: 'HR Generalist', department: 'People Operations', location: 'London, UK', type: 'Contract' },
    { id: 4, title: 'UX Designer', department: 'Design', location: 'Remote', type: 'Full-time' }
];

export default function Careers() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('');

    const filteredJobs = OPEN_JOBS.filter(job =>
        job.title.toLowerCase().includes(filter.toLowerCase()) ||
        job.department.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-900 py-6 px-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">L</div>
                    <span className="text-white font-bold text-xl tracking-tight">Levora Careers</span>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="text-white/70 hover:text-white font-medium text-sm"
                >
                    Employee Login
                </button>
            </div>

            {/* Hero */}
            <div className="bg-slate-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                    Build the Future of <span className="text-primary italic">Work</span>.
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                    Join a team of visionaries, builders, and dreamers. We are redefining how organizations operate.
                </p>

                <div className="max-w-xl mx-auto relative">
                    <input
                        className="w-full py-4 pl-12 pr-4 rounded-full text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-primary/50"
                        placeholder="Search for roles (e.g. Engineer, Designer)"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                </div>
            </div>

            {/* Job List */}
            <div className="max-w-5xl mx-auto py-20 px-6">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-primary" /> Open Positions
                </h2>

                <div className="grid gap-4">
                    {filteredJobs.length > 0 ? filteredJobs.map(job => (
                        <div key={job.id} className="group border border-gray-200 p-6 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer" onClick={() => navigate(`/careers/${job.id}`)}>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.department}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                Apply Now <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-slate-500 font-medium">No roles found matching "{filter}".</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 py-12 text-center text-slate-500 text-sm">
                <p>© 2024 Levora Inc. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4">
                    <span className="flex items-center gap-1 hover:text-slate-900 cursor-pointer"><Globe className="w-3 h-3" /> Website</span>
                    <span className="hover:text-slate-900 cursor-pointer">LinkedIn</span>
                    <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
                </div>
            </div>
        </div>
    );
}
