import { useState } from 'react';
import { Plus, Clock, Flag, LayoutGrid } from 'lucide-react';
import { FluidKanban } from '../../components/ui/FluidKanban';
import { motion, AnimatePresence } from 'framer-motion';
import AddCandidateModal from '../candidates/AddCandidateModal';

const INITIAL_DATA = {
    screening: [
        { id: '1', name: 'Alice Smith', role: 'Frontend Dev', timeInStage: '2d', priority: 'high' },
        { id: '2', name: 'Bob Jones', role: 'Backend Dev', timeInStage: '1d', priority: 'medium' }
    ],
    technical: [
        { id: '3', name: 'Charlie Day', role: 'Full Stack', timeInStage: '5d', priority: 'high' }
    ],
    manager: [
        { id: '4', name: 'David Lee', role: 'DevOps', timeInStage: '1d', priority: 'low' }
    ],
    offer: []
};

export default function PipelineBoard() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Column definitions for FluidKanban
    const kanbanColumns = [
        {
            id: 'screening',
            title: <div className="flex items-center justify-between w-full pr-2">
                <span>Screening</span>
                <span className="text-[8px] font-black uppercase text-violet/60 bg-violet/5 px-2 py-0.5 rounded-md">2.1d AVG</span>
            </div>,
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'technical',
            title: <div className="flex items-center justify-between w-full pr-2">
                <span>Technical Round</span>
                <span className="text-[8px] font-black uppercase text-secondary/60 bg-secondary/5 px-2 py-0.5 rounded-md">12.1d AVG</span>
            </div>,
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'manager',
            title: <div className="flex items-center justify-between w-full pr-2">
                <span>Manager Review</span>
                <span className="text-[8px] font-black uppercase text-primary/60 bg-primary/5 px-2 py-0.5 rounded-md">4.5d AVG</span>
            </div>,
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'offer',
            title: <div className="flex items-center justify-between w-full pr-2">
                <span>Offer Stage</span>
                <span className="text-[8px] font-black uppercase text-primary/60 bg-primary/5 px-2 py-0.5 rounded-md">8.2d AVG</span>
            </div>,
            renderItem: (item) => <CandidateCard item={item} />
        }
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <LayoutGrid className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Talent Orchestration</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter">Pipeline <span className="gradient-text italic">Flow</span></h2>
                    <p className="text-muted-foreground text-xs font-medium mt-1">Real-time candidate progression through architecture stages.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cyber-button-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Candidate
                </button>
            </div>

            {/* Fluid Kanban Board */}
            <div className="flex-1 overflow-hidden">
                <FluidKanban
                    key={refreshKey}
                    initialData={INITIAL_DATA}
                    columns={kanbanColumns}
                />
            </div>

            <AnimatePresence>
                {showAddModal && (
                    <AddCandidateModal
                        onClose={() => setShowAddModal(false)}
                        onSuccess={() => setRefreshKey(prev => prev + 1)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-component for rendering individual cards
const CandidateCard = ({ item }) => (
    <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-full bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all group"
    >
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-black border border-primary/20">
                    {item.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-black text-sm">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{item.role}</p>
                </div>
            </div>
            {item.priority === 'high' && <Flag className="w-3 h-3 text-primary fill-primary/30" />}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-3 border-t border-border/50 pt-3">
            <Clock className="w-3 h-3" />
            <span className="font-black uppercase tracking-widest">{item.timeInStage} in stage</span>
        </div>
    </motion.div>
);
