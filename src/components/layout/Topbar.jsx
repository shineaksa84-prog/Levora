import { Bell, Search, Command, Menu, Cloud, AlertCircle, Clock as ClockIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import NotificationCenter from '../ui/NotificationCenter';

export default function Topbar({ onCommandPaletteOpen, onMenuClick }) {
    const [time, setTime] = useState(new Date());
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shadow-lg sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <button
                    onClick={onCommandPaletteOpen}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card/30 backdrop-blur-md hover:border-primary/50 hover:bg-card/50 hover:shadow-[0_0_20px_rgba(226,149,120,0.15)] transition-all duration-300 group cursor-pointer w-96"
                >
                    <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <span className="text-xs text-muted-foreground flex-1 text-left font-bold uppercase tracking-wider group-hover:text-foreground transition-colors">
                        Search or jump to...
                    </span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted/50 rounded text-[10px] font-mono text-muted-foreground border border-border group-hover:border-primary/30 group-hover:text-primary transition-all">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </div>
                </button>
            </div>

            <div className="flex items-center gap-6">
                {/* System Health & Time */}
                <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-card/40 rounded-xl border border-border backdrop-blur-sm">
                    <div className="flex items-center gap-2 pr-4 border-r border-border">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-black tabular-nums text-foreground">{formattedTime}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`relative p-2 rounded-xl transition-all group ${showNotifications ? 'bg-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'hover:bg-muted'}`}
                        >
                            <Bell className={`w-4 h-4 ${showNotifications ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
                        </button>
                        {showNotifications && (
                            <NotificationCenter onClose={() => setShowNotifications(false)} />
                        )}
                    </div>
                    <div className="h-8 w-px bg-border mx-1" />
                    <div className="flex items-center gap-3 pl-1">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-black leading-none text-foreground">John Doe</div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-1">Admin</div>
                        </div>
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-xl shadow-primary/30 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
