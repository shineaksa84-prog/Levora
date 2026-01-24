import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Command } from 'lucide-react';

export default function VendorLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('/agency/app');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen grid items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-40"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Agency Portal</h1>
                        <p className="text-slate-500 font-medium">Secure access for recruitment partners</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Agency ID</label>
                            <input
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                placeholder="AG-XXXX"
                                defaultValue="AG-8821"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Access Key</label>
                            <input
                                type="password"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                placeholder="••••••••"
                                defaultValue="pass123"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? 'Verifying Credentials...' : 'Access Portal'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400 font-medium">
                            Need help? Contact <a href="#" className="text-blue-600 hover:underline">Vendor Support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
