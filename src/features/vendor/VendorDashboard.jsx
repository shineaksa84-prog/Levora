import AgencyCenter from '../agency/AgencyCenter';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VendorDashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/agency/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Dedicated Agency Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20">
                        {user?.displayName?.[0] || 'A'}
                    </div>
                    <div>
                        <span className="font-black text-slate-900 block leading-none">{user?.displayName || 'Agency Partner'}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Partner Portal 2026</span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl transition-all font-bold text-xs"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-8">
                <AgencyCenter />
            </main>

            <footer className="p-8 border-t border-slate-200 text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    TalentFlow Protocol • Secure Agency Channel • v4.2.0
                </p>
            </footer>
        </div>
    );
}
