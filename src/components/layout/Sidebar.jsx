import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_CONFIG, ROLES } from '../../config/roles';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Sidebar() {
    const location = useLocation();
    const { user, switchRole } = useAuth();
    const navigation = ROLE_CONFIG[user.role]?.navigation || [];

    return (
        <div className="w-64 glass-sidebar bg-white/60 flex flex-col h-full shadow-2xl relative z-50">
            <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <img src="/levora-logo.jpg" alt="Levora" className="h-10 w-auto rounded-lg shadow-sm" />
                </div>
            </div>

            {/* Role Switcher (Styled) */}
            <div className="px-4 py-3 flex gap-2">
                <select
                    value={user.role}
                    onChange={(e) => switchRole(e.target.value)}
                    className="flex-1 text-xs font-medium p-2 rounded-lg border border-white/40 bg-white/50 backdrop-blur focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer hover:bg-white/80 transition-colors"
                >
                    {Object.values(ROLES).map(role => (
                        <option key={role} value={role}>{ROLE_CONFIG[role]?.label || role}</option>
                    ))}
                </select>
                <div className="shrink-0">
                    <ThemeToggle />
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-hide">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-slate-100/80 text-slate-900 shadow-sm"
                                    : "text-gray-500 hover:bg-slate-50/50 hover:text-gray-900 hover:shadow-sm"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-indicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-slate-900 rounded-r-full z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <motion.div
                                className="flex items-center gap-3 w-full"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-slate-900" : "text-gray-400 group-hover:text-gray-600")} />
                                {item.name}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/30 bg-white/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/40 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-slate-100 p-[2px] shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-slate-200">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-700 font-bold text-xs">
                            {user.avatar}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium truncate uppercase tracking-tight">{user.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
