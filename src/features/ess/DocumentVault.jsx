import { useState } from 'react';
import { FileText, Upload, Shield, AlertTriangle, Download, Trash2, Eye } from 'lucide-react';

const MOCK_DOCS = [
    { id: 1, name: 'Aadhaar Card.pdf', category: 'Identity', uploaded: '2023-01-15', status: 'Verified', expiry: null },
    { id: 2, name: 'Passport_Front.jpg', category: 'Identity', uploaded: '2022-06-20', status: 'Verified', expiry: '2024-02-01' }, // Near expiry
    { id: 3, name: 'Degree_Certificate.pdf', category: 'Education', uploaded: '2023-01-20', status: 'Pending Verification', expiry: null },
];

export default function DocumentVault() {
    const [docs, setDocs] = useState(MOCK_DOCS);
    const [filter, setFilter] = useState('All');

    const handleDelete = (id) => {
        setDocs(docs.filter(d => d.id !== id));
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-colors">
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
                        {docs.filter(d => filter === 'All' || d.category === filter).map(doc => (
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

                {docs.length === 0 && (
                    <div className="p-12 text-center text-gray-400 text-sm">
                        <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        No documents found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
