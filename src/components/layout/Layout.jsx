import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CommandPalette from '../CommandPalette';
import QuickActions from '../dashboard/QuickActions';
import Breadcrumb from '../Breadcrumb';
import MotionProvider from '../ui/MotionProvider';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHRAssistant from '../../features/ai/GlobalHRAssistant';
import AccessDebug from '../debug/AccessDebug';

export default function Layout() {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [window.location.hash, window.location.pathname]); // Listen to location changes

    return (
        <div className="flex h-screen overflow-hidden bg-background relative">
            {/* Ambient Background Effects - Cyber-Corporate */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block h-full relative z-20">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    {/* Sidebar container */}
                    <div className="absolute inset-y-0 left-0 w-64 h-full glass-sidebar shadow-xl transform transition-transform duration-300 animate-in slide-in-from-left">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-transparent relative">
                {/* Top Header */}
                <Topbar
                    onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 scroll-smooth pb-20 md:pb-6 relative z-10">
                    <Breadcrumb />
                    <MotionProvider>
                        <Outlet />
                    </MotionProvider>
                </main>

                <QuickActions />
            </div>

            <GlobalHRAssistant />

            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
            />

            <AccessDebug />
        </div>
    );
}
