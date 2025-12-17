import { useState, useEffect } from 'react';
import {
    Archive,
    RefreshCw,
    Search,
    Calendar,
    AlertTriangle,
    CheckSquare,
    Square,
    Trash2
} from 'lucide-react';
import { getArchivedCandidates, restoreCandidates } from '../../lib/services/archivalService';

export default function ArchivedCandidates() {
    const [archivedCandidates, setArchivedCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArchivedCandidates();
    }, []);

    const loadArchivedCandidates = () => {
        setLoading(true);
        const data = getArchivedCandidates();
        setArchivedCandidates(data);
        setLoading(false);
    };

    const handleRestore = () => {
        if (selectedCandidates.length === 0) return;

        if (confirm(`Are you sure you want to restore ${selectedCandidates.length} candidates?`)) {
            restoreCandidates(selectedCandidates);
            loadArchivedCandidates();
            setSelectedCandidates([]);
        }
    };

    const toggleSelect = (id) => {
        if (selectedCandidates.includes(id)) {
            setSelectedCandidates(selectedCandidates.filter(c => c !== id));
        } else {
            setSelectedCandidates([...selectedCandidates, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedCandidates.length === archivedCandidates.length) {
            setSelectedCandidates([]);
        } else {
            setSelectedCandidates(archivedCandidates.map(c => c.id));
        }
    };

    const filteredCandidates = archivedCandidates.filter(c =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading archived candidates...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Archive className="w-5 h-5 text-muted-foreground" />
                        Archived Candidates
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage inactive and archived candidate records
                    </p>
                </div>

                {selectedCandidates.length > 0 && (
                    <button
                        onClick={handleRestore}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Restore Selected ({selectedCandidates.length})
                    </button>
                )}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search archived candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                />
            </div>

            {/* Candidates List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <button onClick={toggleSelectAll}>
                                        {selectedCandidates.length === archivedCandidates.length && archivedCandidates.length > 0 ? (
                                            <CheckSquare className="w-4 h-4 text-primary" />
                                        ) : (
                                            <Square className="w-4 h-4" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3">Candidate</th>
                                <th className="px-4 py-3">Original Role</th>
                                <th className="px-4 py-3">Archived Date</th>
                                <th className="px-4 py-3">Reason</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredCandidates.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">
                                        No archived candidates found
                                    </td>
                                </tr>
                            ) : (
                                filteredCandidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <button onClick={() => toggleSelect(candidate.id)}>
                                                {selectedCandidates.includes(candidate.id) ? (
                                                    <CheckSquare className="w-4 h-4 text-primary" />
                                                ) : (
                                                    <Square className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            <div>{candidate.name}</div>
                                            <div className="text-xs text-muted-foreground">{candidate.email}</div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {candidate.role || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {candidate.archivedDate ? new Date(candidate.archivedDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                                {candidate.archivalReason || 'Manual Archive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => {
                                                    restoreCandidates([candidate.id]);
                                                    loadArchivedCandidates();
                                                }}
                                                className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                                                title="Restore Candidate"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
