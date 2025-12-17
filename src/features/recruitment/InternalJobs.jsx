import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, UserPlus, X, Loader2 } from 'lucide-react';
import { submitReferral, getMyReferrals } from '../../lib/services/referralService';

const JOBS = [
    { id: 1, title: 'Senior Product Manager', dept: 'Product', location: 'Bangalore', type: 'Full-time', posted: '2 days ago' },
    { id: 2, title: 'Tech Lead - Frontend', dept: 'Engineering', location: 'Remote', type: 'Full-time', posted: '1 week ago' },
    { id: 3, title: 'HR Business Partner', dept: 'HR', location: 'Mumbai', type: 'Full-time', posted: '3 days ago' },
];

export default function InternalJobs() {
    const [applied, setApplied] = useState([]);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [myReferrals, setMyReferrals] = useState([]);
    const currentUser = { id: 'EMP001', name: 'John Doe' }; // Mock current user

    useEffect(() => {
        loadReferrals();
    }, []);

    const loadReferrals = () => {
        const refs = getMyReferrals(currentUser.id);
        setMyReferrals(refs);
    };

    const apply = (id) => {
        setApplied([...applied, id]);
    };

    const handleReferClick = (jobId) => {
        setSelectedJobId(jobId);
        setShowReferralModal(true);
    };

    const handleReferralSuccess = (candidate) => {
        loadReferrals();
        setShowReferralModal(false);
        // Toast or notification could go here
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Internal Mobility (IJP)
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">{JOBS.length} Openings</span>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2">
                    {JOBS.map(job => {
                        const isApplied = applied.includes(job.id);
                        return (
                            <div key={job.id} className="p-4 rounded-xl border bg-white hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                        <p className="text-sm text-gray-600">{job.dept}</p>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded">{job.posted}</span>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                                </div>

                                <div className="flex gap-2">
                                    {isApplied ? (
                                        <button disabled className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border border-green-200">
                                            <CheckCircle2 className="w-4 h-4" /> Broker Submitted
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => apply(job.id)}
                                            className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-all"
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleReferClick(job.id)}
                                        className="px-4 py-2 border border-border rounded-lg hover:bg-accent text-sm font-medium flex items-center gap-2"
                                        title="Refer a Friend"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">Grow with Us</h3>
                    <p className="text-blue-100 text-sm mb-6">
                        We prioritize internal talent. 40% of our leadership roles are filled internally.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <p className="text-2xl font-bold">₹50k</p>
                            <p className="text-xs opacity-70">Referral Bonus</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <p className="text-2xl font-bold">{myReferrals.length}</p>
                            <p className="text-xs opacity-70">My Referrals</p>
                        </div>
                    </div>
                </div>

                {/* My Referrals List */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                        My Referrals
                        <span className="text-xs font-normal text-muted-foreground">{myReferrals.length} active</span>
                    </h3>

                    {myReferrals.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            <UserPlus className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p>No referrals yet. Start referring!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {myReferrals.map(ref => (
                                <div key={ref.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                            {ref.avatar}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{ref.name}</p>
                                            <p className="text-xs text-muted-foreground">{ref.role}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${ref.status === 'Hired' ? 'bg-green-50 text-green-700 border-green-200' :
                                            'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {ref.stage || ref.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showReferralModal && (
                <ReferralModal
                    jobId={selectedJobId}
                    onClose={() => setShowReferralModal(false)}
                    onSuccess={handleReferralSuccess}
                    referrerId={currentUser.id}
                />
            )}
        </div>
    );
}

function ReferralModal({ jobId, onClose, onSuccess, referrerId }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: JOBS.find(j => j.id === jobId)?.title || '',
        resume: null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitReferral(referrerId, formData, jobId);
            onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Refer a Candidate</h3>
                    <button onClick={onClose} className="p-1 hover:bg-accent rounded"><X className="w-4 h-4" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium mb-1 block">First Name</label>
                            <input
                                required
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 block">Last Name</label>
                            <input
                                required
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium mb-1 block">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium mb-1 block">Position</label>
                        <input
                            readOnly
                            className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm text-muted-foreground"
                            value={formData.role}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                            Submit Referral
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
