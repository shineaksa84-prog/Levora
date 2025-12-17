import { useState, useEffect } from 'react';
import { MoreHorizontal, Star, Mail, Phone, MapPin, Filter, Plus, UserPlus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HireCandidateModal from './HireCandidateModal';
import { RoleGuard } from '../../components/RoleGuard';
import { getCandidates, seedCandidates } from '../../lib/services/candidateService';

export default function CandidateList() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showHireModal, setShowHireModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            setLoading(true);
            let data = await getCandidates();
            if (data.length === 0) {
                // Auto-seed for demo purposes if empty
                data = await seedCandidates();
            }
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleHireClick = (candidate) => {
        setSelectedCandidate(candidate);
        setShowHireModal(true);
    };

    const handleHireSuccess = (employee) => {
        setSuccessMessage(`${employee.firstName} ${employee.lastName} has been successfully added as an employee!`);
        setTimeout(() => setSuccessMessage(''), 5000);
        // Refresh list to update stage if needed (though local update is faster)
        fetchCandidates();
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
                <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <RoleGuard resource="candidates" action="create">
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Candidate
                        </button>
                    </RoleGuard>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-4">Candidate</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Stage</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {candidates.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                            {candidate.avatar}
                                        </div>
                                        <div>
                                            <Link to={`/candidates/${candidate.id}`} className="font-medium hover:text-primary hover:underline">
                                                {candidate.name}
                                            </Link>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                <Mail className="w-3 h-3" />
                                                <span>{candidate.email || 'email@example.com'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">{candidate.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${candidate.stage === 'Offer' ? 'bg-green-100 text-green-700 border-green-200' :
                                        candidate.stage === 'Interview' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                            'bg-gray-100 text-gray-700 border-gray-200'
                                        }`}>
                                        {candidate.stage}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {candidate.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-foreground font-medium">{candidate.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {candidate.stage === 'Offer' && (
                                            <RoleGuard resource="candidates" action="assign">
                                                <button
                                                    onClick={() => handleHireClick(candidate)}
                                                    className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
                                                >
                                                    <UserPlus className="w-4 h-4" />
                                                    Hire
                                                </button>
                                            </RoleGuard>
                                        )}
                                        <button className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {successMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top">
                    <UserPlus className="w-5 h-5" />
                    {successMessage}
                </div>
            )}

            {showHireModal && (
                <HireCandidateModal
                    candidate={selectedCandidate}
                    onClose={() => setShowHireModal(false)}
                    onSuccess={handleHireSuccess}
                />
            )}
        </div>
    );
}

