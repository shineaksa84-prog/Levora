import React from 'react';
import { Briefcase, CheckCircle, Calendar, FileText, Upload } from 'lucide-react';

export default function CandidateDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Candidate Portal</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Browse Jobs
                </button>
            </div>

            {/* Application Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">My Application Status</h2>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2" />
                    <div className="relative flex justify-between">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white z-10">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">Applied</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white z-10">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">Screening</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white z-10 ring-4 ring-blue-50">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-blue-600">Interview</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 z-10">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-400">Offer</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interview Checklist */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Checklist</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-600 line-through">Upload Resume</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-600 line-through">Complete Profile</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-blue-600" />
                            <span className="text-gray-900 font-medium">Upload ID Proof</span>
                            <button className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Upload</button>
                        </div>
                    </div>
                </div>

                {/* Job Recommendations */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Jobs</h2>
                    <div className="space-y-4">
                        <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <h3 className="font-medium text-gray-900">Senior Frontend Developer</h3>
                            <p className="text-sm text-gray-500">Engineering • Remote</p>
                        </div>
                        <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <h3 className="font-medium text-gray-900">Product Designer</h3>
                            <p className="text-sm text-gray-500">Design • Bangalore</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
