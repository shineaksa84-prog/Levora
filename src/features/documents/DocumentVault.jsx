import { useState } from 'react';
import { Folder, FileText, Upload, AlertTriangle, Eye, Trash2, Calendar, Lock, PenTool } from 'lucide-react';
import ESignStub from './ESignStub';

const FOLDERS = [
    { id: 'id_proof', name: 'Identity Proofs', count: 2 },
    { id: 'education', name: 'Education Certs', count: 3 },
    { id: 'employment', name: 'Previous Employment', count: 1 },
    { id: 'tax', name: 'Tax Documents', count: 4 },
];

const DOCUMENTS = [
    { id: 1, name: 'Passport_Front.pdf', folder: 'id_proof', size: '2.4 MB', uploaded: '2023-01-15', expiry: '2028-05-20', status: 'Verified' },
    { id: 2, name: 'Aadhar_Card.pdf', folder: 'id_proof', size: '1.1 MB', uploaded: '2023-01-15', expiry: null, status: 'Verified' },
    { id: 3, name: 'HDFC_Statement_FV23.pdf', folder: 'tax', size: '500 KB', uploaded: '2024-03-20', expiry: null, status: 'Pending' },
    { id: 4, name: 'Employment_Offer.pdf', folder: 'employment', size: '150 KB', uploaded: '2024-04-01', expiry: null, status: 'Needs Signature' },
];

export default function DocumentVault({ isAdmin = false }) {
    const [selectedFolder, setSelectedFolder] = useState('id_proof');
    const [showUpload, setShowUpload] = useState(false);
    const [signingDoc, setSigningDoc] = useState(null);

    const filteredDocs = DOCUMENTS.filter(d => d.folder === selectedFolder);

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-card rounded-xl border border-border p-4 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Secure Vault
                </h3>
                <div className="space-y-2">
                    {FOLDERS.map(folder => (
                        <button
                            key={folder.id}
                            onClick={() => setSelectedFolder(folder.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all ${selectedFolder === folder.id
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'hover:bg-muted text-muted-foreground'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Folder className={`w-4 h-4 ${selectedFolder === folder.id ? 'fill-primary/20' : ''}`} />
                                {folder.name}
                            </div>
                            <span className="text-xs bg-background px-2 py-0.5 rounded border">{folder.count}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                    <button
                        onClick={() => setShowUpload(true)}
                        className="w-full bg-primary text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md"
                    >
                        <Upload className="w-4 h-4" /> Upload Document
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                        Max size: 10MB • PDF, JPG, PNG
                    </p>
                </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Folder className="w-5 h-5 text-muted-foreground" />
                        {FOLDERS.find(f => f.id === selectedFolder)?.name}
                    </h2>
                    {isAdmin && (
                        <div className="flex gap-2">
                            <button className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100 font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> 2 Docs Expiring
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDocs.map(doc => (
                        <div key={doc.id} className="p-4 rounded-xl border border-border hover:shadow-md transition-all group bg-white">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-900 truncate max-w-[150px]" title={doc.name}>{doc.name}</h4>
                                        <p className="text-xs text-muted-foreground">{doc.size} • {doc.uploaded}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button title="View" className="p-1.5 hover:bg-gray-100 rounded text-gray-600"><Eye className="w-4 h-4" /></button>
                                    <button title="Delete" className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-3 border-t">
                                <span className={`px-2 py-0.5 rounded font-bold border ${doc.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                                    doc.status === 'Needs Signature' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {doc.status}
                                </span>
                                {doc.status === 'Needs Signature' && (
                                    <button
                                        onClick={() => setSigningDoc(doc.name)}
                                        className="flex items-center gap-1 text-primary font-bold hover:underline"
                                    >
                                        <PenTool className="w-3 h-3" /> Sign Now
                                    </button>
                                )}
                                {doc.expiry && (
                                    <span className="flex items-center gap-1 text-orange-600 font-medium">
                                        <Calendar className="w-3 h-3" /> Exp: {doc.expiry}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Upload Placeholder */}
                    <div
                        onClick={() => setShowUpload(true)}
                        className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-accent/5 transition-all flex flex-col items-center justify-center text-muted-foreground cursor-pointer min-h-[140px]"
                    >
                        <Upload className="w-8 h-8 opacity-20 mb-2" />
                        <span className="text-sm font-medium">Drop files here or click to upload</span>
                    </div>
                </div>
            </div>

            {/* Upload Modal (Simplified) */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="font-bold text-lg mb-4">Upload Document</h3>
                        <div className="space-y-4">
                            <div className="p-8 border-2 border-dashed rounded-xl text-center bg-gray-50">
                                <p className="text-sm text-muted-foreground">Select file from computer</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Expiry Date (Optional)</label>
                                <input type="date" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setShowUpload(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                                <button className="flex-1 py-2 bg-primary text-white rounded-lg font-bold">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* E-Sign Modal */}
            {signingDoc && (
                <ESignStub
                    documentName={signingDoc}
                    onComplete={() => setSigningDoc(null)}
                />
            )}
        </div>
    );
}
