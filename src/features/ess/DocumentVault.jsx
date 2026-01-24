import { useState, useEffect } from 'react';
import { FileText, Upload, Shield, AlertTriangle, Download, Trash2, Eye, X, Loader2 } from 'lucide-react';
import { getDocuments, uploadDocument, deleteDocumentResource } from '../../lib/services/documentService';

export default function DocumentVault() {
    const [docs, setDocs] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        setLoading(true);
        const data = await getDocuments('EMP-001'); // Mock ID
        setDocs(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document protocol?')) return;
        try {
            await deleteDocumentResource(id);
            setDocs(docs.filter(d => d.id !== id));
        } catch (error) {
            alert('Failed to delete document.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="w-6 h-6 text-blue-400" />
                        My Document Vault
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Securely store and manage your personal records.
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-colors"
                >
                    <Upload className="w-4 h-4" /> Upload Document
                </button>
            </div>

            {/* Expiry Alert */}
            {docs.some(d => d.expiry && new Date(d.expiry) < new Date('2024-03-01')) && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 text-orange-800 text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <div>
                        <span className="font-bold block">Document Expiry Alert</span>
                        One or more documents (e.g. Passport) are expiring soon. Please renew and upload the latest version.
                    </div>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 p-4 bg-gray-50 flex gap-4 text-sm font-medium text-gray-600 overflow-x-auto">
                    {['All', 'Identity', 'Education', 'Financial', 'Payslips'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${filter === cat ? 'bg-gray-900 text-white' : 'hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <table className="w-full text-sm text-left">
                    <thead className="bg-white text-gray-500 font-bold uppercase text-xs border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Document Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Upload Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto opacity-20" />
                                </td>
                            </tr>
                        ) : docs.filter(d => filter === 'All' || d.category === filter).length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">No document vectors found in this category.</td>
                            </tr>
                        ) : docs.filter(d => filter === 'All' || d.category === filter).map(doc => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{doc.name}</p>
                                            {doc.expiry && <p className="text-[10px] text-orange-600 font-medium">Expires: {doc.expiry}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{doc.category}</td>
                                <td className="px-6 py-4 text-gray-500">{doc.uploaded}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showUploadModal && (
                <UploadDocumentModal
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={() => {
                        setShowUploadModal(false);
                        loadDocuments();
                    }}
                />
            )}
        </div>
    );
}

function UploadDocumentModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Identity',
        expiry: '',
        employeeId: 'EMP-001'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await uploadDocument(formData);
            onSuccess();
        } catch (err) {
            setError('Vault error: Document could not be committed to secure storage.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Secure Document Upload</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Vault Protocol Initiation</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Document Label</label>
                        <input
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white font-bold text-sm outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Passport Front Page"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Identity</option>
                                <option>Education</option>
                                <option>Financial</option>
                                <option>Certifications</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Expiry (Optional)</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.expiry}
                                onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-xs text-gray-500 font-medium">Click to select or drag document file</p>
                        <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Upload to Vault
                    </button>
                </form>
            </div>
        </div>
    );
}
