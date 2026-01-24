import { useState, useEffect } from 'react';
import { Target, TrendingUp, ChevronDown, ChevronUp, Plus, X, Loader2, AlertCircle } from 'lucide-react';
import { getEmployeeGoals, updateGoalProgress, createGoal } from '../../lib/services/performanceService';

export default function OKRManager() {
    const [okrs, setOkrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        loadOKRs();
    }, []);

    const loadOKRs = async () => {
        setLoading(true);
        try {
            const data = await getEmployeeGoals('current_user');
            setOkrs(data.filter(g => g.type === 'OKR').map(g => ({ ...g, isOpen: false })));
        } catch (error) {
            console.error('Error loading OKRs:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleOpen = (id) => {
        setOkrs(okrs.map(okr => okr.id === id ? { ...okr, isOpen: !okr.isOpen } : okr));
    };

    const handleProgressUpdate = async (okrId, krId, newValue) => {
        const okr = okrs.find(o => o.id === okrId);
        const updatedKRs = okr.keyResults.map(kr =>
            kr.id === krId ? { ...kr, current: parseInt(newValue) } : kr
        );

        // Calculate new overall progress
        const avgProgress = Math.round(
            updatedKRs.reduce((acc, kr) => acc + (kr.current / kr.target), 0) / updatedKRs.length * 100
        );

        try {
            await updateGoalProgress(okrId, avgProgress, { keyResults: updatedKRs });
            setOkrs(prev => prev.map(o =>
                o.id === okrId ? { ...o, keyResults: updatedKRs, progress: avgProgress } : o
            ));
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-500" />
                        Objectives & Key Results (OKR)
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Track strategic alignment from Company to Individual levels.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Objective
                </button>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                    </div>
                ) : okrs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-medium">No active objectives found in the matrix.</p>
                    </div>
                ) : okrs.map(okr => (
                    <div key={okr.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Header */}
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleOpen(okr.id)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`p-2 rounded-lg ${okr.progress >= 80 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{okr.title}</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Owner: {okr.owner}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-32">
                                    <div className="flex justify-between text-xs mb-1 font-bold text-gray-600">
                                        <span>Progress</span>
                                        <span>{okr.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${okr.progress >= 80 ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${okr.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {okr.isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </div>
                        </div>

                        {/* Key Results Body */}
                        {okr.isOpen && (
                            <div className="bg-gray-50 border-t border-gray-100 p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Key Results</p>
                                {okr.keyResults.map(kr => {
                                    const percent = Math.floor((kr.current / kr.target) * 100);
                                    return (
                                        <div key={kr.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 rounded text-gray-500">
                                                <TrendingUp className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-gray-800 text-sm">{kr.title}</span>
                                                    <span className="text-xs font-bold text-gray-500">{kr.current} / {kr.target} {kr.unit}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${percent >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                                        style={{ width: `${Math.min(percent, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={kr.target}
                                                    value={kr.current}
                                                    onChange={(e) => handleProgressUpdate(okr.id, kr.id, e.target.value)}
                                                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:accent-indigo-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showAddModal && (
                <AddObjectiveModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        loadOKRs();
                    }}
                />
            )}
        </div>
    );
}

function AddObjectiveModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        owner: 'Product Team',
        keyResults: [
            { id: 'kr_1', description: '', target: 100, current: 0, unit: '%' }
        ]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createGoal({
                ...formData,
                type: 'OKR',
                progress: 0,
                status: 'active'
            });
            onSuccess();
        } catch (err) {
            setError('Strategic failure: Objective could not be committed to the matrix.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold italic tracking-tight">New Strategic Objective</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-500">OKR Vector Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Objective Title</label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-2 ring-red-500/20 outline-none transition-all"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Achive $10M ARR"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Key Results</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        keyResults: [...formData.keyResults, { id: `kr_${Date.now()}`, description: '', target: 100, current: 0, unit: '%' }]
                                    })}
                                    className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline"
                                >
                                    <Plus className="w-3 h-3" /> Add KR
                                </button>
                            </div>

                            {formData.keyResults.map((kr, index) => (
                                <div key={kr.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group">
                                    {formData.keyResults.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                keyResults: formData.keyResults.filter((_, i) => i !== index)
                                            })}
                                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}

                                    <div className="space-y-3">
                                        <input
                                            required
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white font-medium text-sm focus:ring-1 ring-red-500/20 outline-none"
                                            value={kr.description}
                                            onChange={e => {
                                                const newKRs = [...formData.keyResults];
                                                newKRs[index].description = e.target.value;
                                                setFormData({ ...formData, keyResults: newKRs });
                                            }}
                                            placeholder="Key Result Description"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[9px] font-bold text-gray-400 uppercase">Target</label>
                                                <input
                                                    type="number"
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none"
                                                    value={kr.target}
                                                    onChange={e => {
                                                        const newKRs = [...formData.keyResults];
                                                        newKRs[index].target = parseInt(e.target.value) || 0;
                                                        setFormData({ ...formData, keyResults: newKRs });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[9px] font-bold text-gray-400 uppercase">Unit</label>
                                                <input
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none"
                                                    value={kr.unit}
                                                    onChange={e => {
                                                        const newKRs = [...formData.keyResults];
                                                        newKRs[index].unit = e.target.value;
                                                        setFormData({ ...formData, keyResults: newKRs });
                                                    }}
                                                    placeholder="e.g. %"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Deploy Objective
                    </button>
                </form>
            </div>
        </div>
    );
}
