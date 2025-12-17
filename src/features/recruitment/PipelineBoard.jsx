import { useState } from 'react';
import { Plus, Clock, Flag } from 'lucide-react';
import { FluidKanban } from '../../components/ui/FluidKanban';

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

    // Column definitions for FluidKanban
    const kanbanColumns = [
        {
            id: 'screening',
            title: 'Screening',
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'technical',
            title: 'Technical Round',
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'manager',
            title: 'Manager Review',
            renderItem: (item) => <CandidateCard item={item} />
        },
        {
            id: 'offer',
            title: 'Offer Stage',
            renderItem: (item) => <CandidateCard item={item} />
        }
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Pipeline</h2>
                    <p className="text-gray-500 mt-1">Manage candidate progress across stages.</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-glow transition-all">
                    <Plus className="w-4 h-4" /> Add Candidate
                </button>
            </div>

            {/* Fluid Kanban Board */}
            <div className="flex-1 overflow-hidden">
                <FluidKanban
                    initialData={INITIAL_DATA}
                    columns={kanbanColumns}
                />
            </div>
        </div>
    );
}

// Sub-component for rendering individual cards
const CandidateCard = ({ item }) => (
    <div className="w-full">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-700 text-xs font-bold border border-indigo-100">
                    {item.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.role}</p>
                </div>
            </div>
            {item.priority === 'high' && <Flag className="w-3 h-3 text-rose-500" fill="currentColor" />}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 border-t border-gray-100 pt-3">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{item.timeInStage} in stage</span>
        </div>
    </div>
);
