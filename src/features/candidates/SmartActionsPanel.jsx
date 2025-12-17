import { Pin, CheckSquare, UserPlus, BellOff, Ban } from 'lucide-react';

export default function SmartActionsPanel() {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
            <div className="bg-card border border-border shadow-lg rounded-xl p-2 flex flex-col gap-1 w-12 hover:w-auto hover:items-start items-center transition-all duration-300 group overflow-hidden whitespace-nowrap">
                <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground flex items-center gap-3 w-full">
                    <Pin className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Pin Note</span>
                </button>
                <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground flex items-center gap-3 w-full">
                    <CheckSquare className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Convert to Task</span>
                </button>
                <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground flex items-center gap-3 w-full">
                    <UserPlus className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Follow Candidate</span>
                </button>
                <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground flex items-center gap-3 w-full">
                    <BellOff className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Snooze Profile</span>
                </button>
                <div className="h-px bg-border w-full my-1"></div>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600 flex items-center gap-3 w-full">
                    <Ban className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">Do Not Contact</span>
                </button>
            </div>
        </div>
    );
}
