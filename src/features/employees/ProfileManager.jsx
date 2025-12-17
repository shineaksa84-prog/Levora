import { useState } from 'react';
import { User, Phone, MapPin, FileText, Save, Lock } from 'lucide-react';

export default function ProfileManager() {
    const [profile, setProfile] = useState({
        phone: '+91 98765 43210',
        email: 'alice.smith@acme.com',
        address: 'Flat 402, Green Valley Apts, Bangalore',
        emergencyName: 'Bob Smith',
        emergencyRel: 'Spouse',
        emergencyPhone: '+91 99999 88888'
    });

    return (
        <div className="flex gap-6 h-[calc(100vh-200px)]">
            <div className="w-64 shrink-0 bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 border-4 border-white shadow-sm overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Alice+Smith&background=random" alt="Alice" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Alice Smith</h3>
                <p className="text-sm text-muted-foreground">UX Designer</p>
                <p className="text-xs text-gray-400 mt-1">EMP023 • Product</p>

                <div className="mt-8 w-full space-y-1">
                    <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-lg">Personal Info</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-600 font-medium text-sm rounded-lg">Documents</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-600 font-medium text-sm rounded-lg">Bank Details</button>
                </div>
            </div>

            <div className="flex-1 bg-card rounded-xl border border-border p-8 shadow-sm overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" /> Personal Information
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Corporate Email <Lock className="w-3 h-3 inline ml-1 opacity-50" /></label>
                        <input className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" value={profile.email} readOnly />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                className="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700 block mb-2">Current Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                className="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                rows={2}
                                value={profile.address}
                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-4 pt-4 border-t">Emergency Contact</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Contact Name</label>
                        <input
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg"
                            value={profile.emergencyName}
                            onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Relationship</label>
                        <select className="w-full p-2.5 bg-white border border-gray-300 rounded-lg">
                            <option>Spouse</option>
                            <option>Parent</option>
                            <option>Sibling</option>
                            <option>Friend</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Emergency Phone</label>
                        <input
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg"
                            value={profile.emergencyPhone}
                            onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-black flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
