import { useState, useEffect } from 'react';
import { HardDrive, Monitor, Smartphone, Search, Filter, Plus, X, Loader2 } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { getAssets, addAsset } from '../lib/services/assetService';

export default function Assets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        setLoading(true);
        try {
            const data = await getAssets();
            setAssets(data);
        } catch (error) {
            console.error('Error loading assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAssets = assets.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Asset Management</h1>
                    <p className="text-muted-foreground font-medium mt-1">Track and manage hardware inventory.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cyber-button-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Asset
                </button>
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                        className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm"
                        placeholder="Search by tag, model, or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="bg-white border border-border text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            <BentoGrid>
                <BentoGridItem
                    title="Laptops"
                    description={`${assets.filter(a => a.category === 'Laptops' || a.category === 'Hardware').length} Total / 5 Spare`}
                    header={<div className="h-full bg-primary/10 flex items-center justify-center rounded-xl p-4"><Monitor className="w-12 h-12 text-primary opacity-50" /></div>}
                    icon={<Monitor className="w-4 h-4 text-primary" />}
                />
                <BentoGridItem
                    title="Mobiles"
                    description={`${assets.filter(a => a.category === 'Mobiles' || a.category === 'Telecom').length} Assigned`}
                    header={<div className="h-full bg-secondary/10 flex items-center justify-center rounded-xl p-4"><Smartphone className="w-12 h-12 text-secondary opacity-50" /></div>}
                    icon={<Smartphone className="w-4 h-4 text-secondary" />}
                />
                <BentoGridItem
                    title="Furniture/Other"
                    description={`${assets.filter(a => a.category === 'Furniture' || a.category === 'Other').length} Physical`}
                    header={<div className="h-full bg-accent/10 flex items-center justify-center rounded-xl p-4"><HardDrive className="w-12 h-12 text-accent opacity-50" /></div>}
                    icon={<HardDrive className="w-4 h-4 text-accent" />}
                />
            </BentoGrid>

            {/* Assets Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <h3 className="font-bold text-sm">Individual Assets</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/10 text-muted-foreground font-bold uppercase text-[10px] tracking-widest border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Asset Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Assigned To</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Location</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground opacity-20" />
                                    </td>
                                </tr>
                            ) : filteredAssets.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground italic">
                                        No assets found in the inventory.
                                    </td>
                                </tr>
                            ) : filteredAssets.map(asset => (
                                <tr key={asset.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-bold">{asset.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{asset.category}</td>
                                    <td className="px-6 py-4">{asset.assignedTo || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${asset.status === 'In Use' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{asset.location || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAddModal && (
                <AddAssetModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        loadAssets();
                    }}
                />
            )}
        </div>
    );
}

function AddAssetModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Hardware',
        assignedTo: '',
        location: '',
        status: 'In Use'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addAsset(formData);
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Failed to register asset protocol.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">New Asset Registration</h3>
                        <p className="text-[10px] font-medium uppercase tracking-widest opacity-80">Inventory Control Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Asset Name / Model</label>
                        <input
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white font-bold text-sm outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. MacBook Pro M3 14-inch"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Hardware</option>
                                <option>Laptops</option>
                                <option>Mobiles</option>
                                <option>Furniture</option>
                                <option>Telecom</option>
                                <option>Vehicle</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Status</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>In Use</option>
                                <option>Available</option>
                                <option>Maintenance</option>
                                <option>Lost/Damaged</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assigned To</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm"
                                value={formData.assignedTo}
                                onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                                placeholder="Employee Name"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Location</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-bold text-sm"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. Floor 2 / Remote"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Commit to Inventory
                    </button>
                </form>
            </div>
        </div>
    );
}
