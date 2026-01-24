import { Pin, CheckSquare, UserPlus, BellOff, Ban } from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function SmartActionsPanel() {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
            <div className="bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl p-2 flex flex-col gap-1 w-12 hover:w-48 hover:items-start items-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) group overflow-hidden whitespace-nowrap">
                <button
                    onClick={() => toast.success("Note pinned to candidate profile.")}
                    className="p-2 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary flex items-center gap-3 w-full transition-all"
                >
                    <Pin className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-black uppercase tracking-widest">Pin Note</span>
                </button>
                <button
                    onClick={() => toast.success("Interaction converted to follow-up task.")}
                    className="p-2 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary flex items-center gap-3 w-full transition-all"
                >
                    <CheckSquare className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-black uppercase tracking-widest">Convert Task</span>
                </button>
                <button
                    onClick={() => toast.success("Now following this candidate's journey.")}
                    className="p-2 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary flex items-center gap-3 w-full transition-all"
                >
                    <UserPlus className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-black uppercase tracking-widest">Follow</span>
                </button>
                <div className="h-px bg-primary/10 w-full my-1"></div>
                <button
                    onClick={() => toast.error("Candidate added to DNC protocol.")}
                    className="p-2 hover:bg-red-500/10 rounded-xl text-red-400 hover:text-red-500 flex items-center gap-3 w-full transition-all"
                >
                    <Ban className="w-5 h-5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-black uppercase tracking-widest text-red-500">Block Contact</span>
                </button>
            </div>
        </div>
    );
}
