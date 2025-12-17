import { Bell, Search, Command } from 'lucide-react';

export default function Topbar({ onCommandPaletteOpen }) {
    return (
        <div className="h-16 border-b border-border bg-gradient-to-r from-card via-primary/5 to-secondary/5 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={onCommandPaletteOpen}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg border border-input bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all group cursor-pointer w-96"
                >
                    <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-muted-foreground flex-1 text-left">
                        Search or jump to...
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </div>
                </button>
            </div>
            <div className="flex items-center gap-3">
                <button className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors group">
                    <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                </button>
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    JD
                </div>
            </div>
        </div>
    );
}
