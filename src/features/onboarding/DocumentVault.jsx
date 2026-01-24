import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle2, Clock, XCircle, Eye, Download } from 'lucide-react';
import { getDocuments, uploadDocument, updateDocumentStatus } from '../../lib/services/onboardingService';

export default function DocumentVault() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        const data = await getDocuments();
        setDocuments(data);
        setLoading(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // Simulate category selection - in real app would be a modal
            const category = 'General';
            const newDoc = await uploadDocument(file, category);
            setDocuments(prev => [...prev, newDoc]);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    const handleStatusChange = async (docId, newStatus) => {
        try {
            const updatedDoc = await updateDocumentStatus(docId, newStatus);
            setDocuments(prev => prev.map(d => d.id === docId ? updatedDoc : d));
        } catch (error) {
            console.error('Status update failed', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'verified': return 'text-green-600 bg-green-50 border-green-200';
            case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    if (loading) return <div>Loading vault...</div>;

    return (
        <div className="space-y-6">
            {/* Header / Upload */}
            <div className="flex items-center justify-between p-6 bg-card border border-border rounded-xl">
                <div>
                    <h2 className="text-xl font-bold">Secure Document Vault</h2>
                    <p className="text-muted-foreground text-sm">Manage critical employee documentation</p>
                </div>
                <div className="flex gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                        {uploading ? <Upload className="w-4 h-4 animate-bounce" /> : <Upload className="w-4 h-4" />}
                        Upload Document
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map(doc => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(doc.status)} flex items-center gap-1`}>
                                {doc.status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                                {doc.status === 'pending' && <Clock className="w-3 h-3" />}
                                {doc.status === 'rejected' && <XCircle className="w-3 h-3" />}
                                <span className="capitalize">{doc.status}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold truncate" title={doc.name}>{doc.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span className="bg-muted px-1.5 py-0.5 rounded">{doc.category}</span>
                                <span>• {doc.size}</span>
                                <span>• {doc.uploadDate}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex gap-1">
                                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors" title="View">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors" title="Download">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Validation Actions (Mock Admin View) */}
                            {doc.status === 'pending' && (
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleStatusChange(doc.id, 'verified')}
                                        className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-medium"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(doc.id, 'rejected')}
                                        className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
