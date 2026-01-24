import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import { useLocation } from 'react-router-dom';
import { Shield, ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react';
import { APP_CONFIG } from '../../config/appConfig';

/**
 * AccessDebug Component
 * Visible only in DEV_MODE. Shows current user role, route access status, and permissions.
 */
export default function AccessDebug() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { canAccess, getAllPermissions } = usePermissions();
    const location = useLocation();

    if (!APP_CONFIG.DEV_MODE) return null;

    const currentPath = location.pathname;
    const hasAccess = canAccess(currentPath);
    const permissions = getAllPermissions();

    return (
        <div className="fixed bottom-4 left-4 z-[9999]">
            <div className={`bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 w-80 ${isOpen ? 'max-h-[600px]' : 'max-h-12'}`}>
                {/* Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-3 bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Shield className={`w-4 h-4 ${hasAccess ? 'text-green-500' : 'text-red-500'}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Access Debugger</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>

                {/* Content */}
                <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
                    {/* User Info */}
                    <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">User Identity</p>
                        <div className="p-2 rounded-lg bg-muted/50 border border-border">
                            <p className="text-sm font-bold">{user?.name || 'Guest'}</p>
                            <p className="text-xs font-mono text-primary uppercase">{user?.role || 'none'}</p>
                        </div>
                    </div>

                    {/* Route Info */}
                    <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Current Route</p>
                        <div className={`p-2 rounded-lg border flex items-center justify-between ${hasAccess ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                            <p className="text-xs font-mono truncate mr-2">{currentPath}</p>
                            {hasAccess ? <Unlock className="w-3 h-3 text-green-500" /> : <Lock className="w-3 h-3 text-red-500" />}
                        </div>
                    </div>

                    {/* All Permissions */}
                    <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Active Permissions</p>
                        <div className="grid grid-cols-1 gap-2">
                            {Object.entries(permissions).map(([resource, actions]) => (
                                <div key={resource} className="p-2 rounded-lg bg-muted/30 border border-border">
                                    <p className="text-[10px] font-bold uppercase text-foreground mb-1">{resource}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {Object.entries(actions).map(([action, allowed]) => (
                                            <span
                                                key={action}
                                                className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter ${allowed ? 'bg-green-500/20 text-green-600' : 'bg-red-500/10 text-red-400 opacity-50'
                                                    }`}
                                            >
                                                {action}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
