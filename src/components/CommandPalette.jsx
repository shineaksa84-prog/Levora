import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    X,
    Home,
    Users,
    UserPlus,
    Briefcase,
    BarChart3,
    Settings,
    FileText,
    Calendar,
    TrendingUp,
    Award,
    Heart,
    LogOut,
    Clock,
    ArrowRight,
    Command
} from 'lucide-react';
import { globalSearch, getRecentSearches, addToRecentSearches } from '../lib/services/searchService';

const iconMap = {
    Home, Users, UserPlus, Briefcase, BarChart3, Settings, FileText,
    Calendar, TrendingUp, Award, Heart, LogOut, Clock, User: Users
};

export default function CommandPalette({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    // Navigation commands
    const navigationCommands = [
        { id: 'nav-dashboard', title: 'Dashboard', category: 'Navigation', icon: 'Home', url: '/', keywords: ['home', 'overview'] },
        { id: 'nav-candidates', title: 'Candidates', category: 'Navigation', icon: 'UserPlus', url: '/candidates', keywords: ['applicants', 'recruitment'] },
        { id: 'nav-employees', title: 'Employees', category: 'Navigation', icon: 'Users', url: '/employees', keywords: ['staff', 'team'] },
        { id: 'nav-jobs', title: 'Jobs', category: 'Navigation', icon: 'Briefcase', url: '/jobs', keywords: ['positions', 'openings'] },
        { id: 'nav-analytics', title: 'Analytics', category: 'Navigation', icon: 'BarChart3', url: '/analytics', keywords: ['reports', 'metrics'] },
        { id: 'nav-performance', title: 'Performance', category: 'Navigation', icon: 'TrendingUp', url: '/performance', keywords: ['reviews', 'goals'] },
        { id: 'nav-learning', title: 'Learning', category: 'Navigation', icon: 'Award', url: '/learning', keywords: ['training', 'courses'] },
        { id: 'nav-compensation', title: 'Compensation', category: 'Navigation', icon: 'FileText', url: '/compensation', keywords: ['payroll', 'salary'] },
        { id: 'nav-engagement', title: 'Engagement', category: 'Navigation', icon: 'Heart', url: '/engagement', keywords: ['surveys', 'wellness'] },
        { id: 'nav-offboarding', title: 'Offboarding', category: 'Navigation', icon: 'LogOut', url: '/offboarding', keywords: ['exit', 'resignation'] },
        { id: 'nav-automation', title: 'Automation', category: 'Navigation', icon: 'Settings', url: '/automation', keywords: ['workflows', 'ai'] }
    ];

    useEffect(() => {
        if (isOpen) {
            setRecentSearches(getRecentSearches());
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults(navigationCommands);
                return;
            }

            const searchTerm = query.toLowerCase();

            // Search navigation commands
            const navResults = navigationCommands.filter(cmd =>
                cmd.title.toLowerCase().includes(searchTerm) ||
                cmd.keywords.some(k => k.includes(searchTerm))
            );

            try {
                // Search entities (now async)
                const entityResults = await globalSearch(query);
                setResults([...navResults, ...entityResults]);
            } catch (error) {
                console.error('Search failed:', error);
                setResults(navResults);
            }

            setSelectedIndex(0);
        };

        fetchResults();
    }, [query]);

    const handleSelect = useCallback((item) => {
        if (item.url) {
            navigate(item.url);
            if (query.trim()) {
                addToRecentSearches(query);
            }
            onClose();
        }
    }, [navigate, onClose, query]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [results, selectedIndex, handleSelect, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const getIcon = (iconName) => {
        const Icon = iconMap[iconName] || Search;
        return Icon;
    };

    const groupedResults = results.reduce((acc, result) => {
        const category = result.category || result.type || 'Results';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(result);
        return acc;
    }, {});

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search or jump to..."
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                        autoFocus
                    />
                    <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground">Esc</kbd>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-accent rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {!query && recentSearches.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                Recent Searches
                            </div>
                            {recentSearches.slice(0, 5).map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => setQuery(search)}
                                    className="w-full px-3 py-2 text-left hover:bg-accent rounded-lg transition-colors flex items-center gap-3"
                                >
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{search}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category} className="p-2">
                            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                                {category}
                            </div>
                            {items.map((item, index) => {
                                const globalIndex = results.indexOf(item);
                                const Icon = getIcon(item.icon);

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        className={`w-full px-3 py-2.5 text-left rounded-lg transition-colors flex items-center gap-3 ${globalIndex === selectedIndex
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent'
                                            }`}
                                    >
                                        <div className={`p-1.5 rounded-lg ${globalIndex === selectedIndex
                                            ? 'bg-primary-foreground/20'
                                            : 'bg-muted'
                                            }`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">{item.title}</div>
                                            {item.subtitle && (
                                                <div className={`text-xs truncate ${globalIndex === selectedIndex
                                                    ? 'text-primary-foreground/70'
                                                    : 'text-muted-foreground'
                                                    }`}>
                                                    {item.subtitle}
                                                </div>
                                            )}
                                        </div>
                                        {item.metadata && (
                                            <span className={`text-xs px-2 py-0.5 rounded ${globalIndex === selectedIndex
                                                ? 'bg-primary-foreground/20 text-primary-foreground'
                                                : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {item.metadata}
                                            </span>
                                        )}
                                        <ArrowRight className={`w-4 h-4 ${globalIndex === selectedIndex ? 'opacity-100' : 'opacity-0'
                                            }`} />
                                    </button>
                                );
                            })}
                        </div>
                    ))}

                    {results.length === 0 && query && (
                        <div className="p-8 text-center text-muted-foreground">
                            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No results found for "{query}"</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-background rounded font-mono">↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-background rounded font-mono">Enter</kbd>
                            Select
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <Command className="w-3 h-3" />
                        <kbd className="px-1.5 py-0.5 bg-background rounded font-mono">K</kbd>
                    </span>
                </div>
            </div>
        </div>
    );
}
