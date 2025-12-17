import { useState } from 'react';
import { Award, FileText, Upload, Calendar, CheckCircle, Clock } from 'lucide-react';

const CERTS = [
    { id: 1, name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2023-05-15', expiry: '2026-05-15', status: 'Active', img: 'bg-orange-100 text-orange-600' },
    { id: 2, name: 'Certified Scrum Master', issuer: 'Scrum Alliance', date: '2021-08-10', expiry: '2023-08-10', status: 'Expired', img: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'Google UX Design Professional', issuer: 'Coursera', date: '2023-11-01', expiry: null, status: 'Active', img: 'bg-green-100 text-green-600' },
];

export default function CertificationVault() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Award className="w-6 h-6 text-yellow-500" />
                            My Credentials
                        </h2>
                        <p className="text-sm text-muted-foreground">Manage your professional certifications and licenses.</p>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-md">
                        <Upload className="w-4 h-4" /> Upload New
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 overflow-y-auto max-h-[500px] pr-2">
                    {CERTS.map(cert => (
                        <div key={cert.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg ${cert.img} flex items-center justify-center`}>
                                    <Award className="w-6 h-6" />
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${cert.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {cert.status}
                                </span>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-1 pr-4">{cert.name}</h3>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-4">{cert.issuer}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Issued: {cert.date}
                                </div>
                                {cert.expiry && (
                                    <div className="flex items-center gap-1 text-orange-600 font-medium">
                                        <Clock className="w-3 h-3" /> Expires: {cert.expiry}
                                    </div>
                                )}
                            </div>

                            <button className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white p-2 rounded-lg shadow-lg">
                                <FileText className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg">
                    <h3 className="font-bold mb-4">Verification Status</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Verified</span>
                        <span className="font-bold text-green-400">2</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full mb-4">
                        <div className="bg-green-400 h-full w-[66%] rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Pending</span>
                        <span className="font-bold text-yellow-400">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Expired</span>
                        <span className="font-bold text-red-400">1</span>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
                    <h4 className="font-bold text-yellow-900 text-sm mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Renewal Alert
                    </h4>
                    <p className="text-xs text-yellow-800 leading-relaxed">
                        Your <strong>Certified Scrum Master</strong> certification has expired. Renew it by Nov 30 to maintain your eligibility for 'Project Lead' roles.
                    </p>
                    <button className="mt-3 w-full bg-white border border-yellow-200 text-yellow-700 text-xs font-bold py-2 rounded-lg hover:bg-yellow-100">
                        View Renewal Options
                    </button>
                </div>
            </div>
        </div>
    );
}
