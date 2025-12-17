import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { MobileNav } from './MobileNav';
import CommandPalette from '../CommandPalette';
import Breadcrumb from '../Breadcrumb';
import MotionProvider from '../ui/MotionProvider';
import { useAuth } from '../../contexts/AuthContext';

export default function Layout() {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
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
            // Ctrl+K or Cmd+K to open command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className="flex h-screen overflow-hidden bg-background"
            style={{ background: 'linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%)' }}
        >
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block h-full relative z-20">
                <Sidebar />
            </div>

            {/* Mobile Nav - visible only on mobile */}
            <MobileNav />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-transparent">
                {/* Top Header */}
                <Topbar onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 scroll-smooth pb-20 md:pb-6">
                    <Breadcrumb />
                    <Outlet />
                </main>
            </div>

            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
            />
        </div>
    );
}
