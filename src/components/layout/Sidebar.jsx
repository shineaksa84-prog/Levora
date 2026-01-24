import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_CONFIG, ROLES } from '../../config/roles';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const { user, switchRole } = useAuth();
    const navigation = ROLE_CONFIG[user.role]?.navigation || [];

    return (
        <div className="w-64 glass-sidebar flex flex-col h-full shadow-2xl relative z-50">
            {/* Logo Section */}
            {/* Logo Section */}
            <div className="p-6 border-b border-border bg-card/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/25">
                        L
                    </div>
                    <div>
                        <h1 className="font-black text-xl tracking-tighter leading-none text-foreground">
                            LEVORA
                        </h1>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-[0.25em]">Artificial Intelligence</p>
                    </div>
                </div>
            </div>

            {/* Role Switcher */}
            <div className="px-4 py-3 flex gap-2">
                <select
                    value={user.role}
                    onChange={(e) => switchRole(e.target.value)}
                    className="flex-1 text-xs font-bold p-2.5 rounded-lg border border-primary/20 bg-card/50 backdrop-blur text-foreground focus:ring-2 focus:ring-primary/40 outline-none cursor-pointer hover:bg-card/70 transition-all"
                >
                    {Object.values(ROLES).map(role => (
                        <option key={role} value={role}>{ROLE_CONFIG[role]?.label || role}</option>
                    ))}
                </select>
                <div className="shrink-0">
                    <ThemeToggle />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-hide">
                {navigation.map((item) => {
                    // Find the single best match for the current path to avoid duplicate active states
                    // We prioritize exact matches, then use the first partial match
                    const isExactlyActive = location.pathname === item.href;
                    // Check if this item should be the "one" to show the indicator
                    // If multiple items link to the same path, only the first one gets the indicator
                    // or the one that exactly matches.
                    // Simplified: specifically check if this is the *first* item in the list that matches the current path
                    const isActive = location.pathname === item.href;

                    // We need a unique way to determine which item gets the layoutId if multiple link to same place
                    // Solution: Only render layoutId if this is the first items that matches
                    const isFirstMatch = navigation.find(i => i.href === location.pathname) === item;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-[0_0_25px_rgba(226,149,120,0.3)]"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {isActive && isFirstMatch && (
                                <motion.div
                                    layoutId="active-nav-indicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 bg-primary rounded-r-full z-10 shadow-[0_0_15px_rgba(226,149,120,0.6)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <motion.div
                                className="flex items-center gap-3 w-full"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                                {item.name}
                            </motion.div>
                        </Link>
                    );
                })}

                {user.isSuperAdmin && (
                    <Link
                        to="/app/super-admin"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group relative border border-primary/20 bg-primary/5 mt-4",
                            location.pathname === '/app/super-admin'
                                ? "bg-primary text-primary-foreground"
                                : "text-primary hover:bg-primary/10"
                        )}
                    >
                        <Shield className="w-5 h-5" />
                        Command Center
                    </Link>
                )}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-border bg-card/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] shadow-lg group-hover:shadow-primary/30 transition-shadow">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-foreground font-black text-xs">
                            {user.avatar}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground font-bold truncate uppercase tracking-wider">{user.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
