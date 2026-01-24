import { Box, Truck, User, Search, Filter, AlertTriangle, Plus, X, Loader2 } from 'lucide-react';
import { getAssets, addAsset } from '../../lib/services/assetService';

export default function GeneralAssets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        setLoading(true);
        const data = await getAssets();
        setAssets(data);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                        <input className="w-full pl-9 p-2 border rounded-lg text-sm" placeholder="Search Physical Assets..." />
                    </div>
                    <button className="p-2 border rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4" /></button>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Asset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Box className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Total Stock</p>
                        <p className="text-2xl font-black">1,240</p>
                    </div>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><User className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Assigned</p>
                        <p className="text-2xl font-black">985</p>
                    </div>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Truck className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">In Repair</p>
                        <p className="text-2xl font-black">12</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="p-4">Asset Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Assigned To</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary opacity-20" />
                                </td>
                            </tr>
                        ) : assets.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-muted-foreground italic">No assets registered in the matrix.</td>
                            </tr>
                        ) : assets.map(asset => (
                            <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4 font-medium text-gray-900">
                                    {asset.name}
                                    <div className="text-xs text-muted-foreground font-normal">{asset.id}</div>
                                </td>
                                <td className="p-4">{asset.category}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                        <User className="w-3 h-3" />
                                    </div>
                                    {asset.assignedTo}
                                </td>
                                <td className="p-4">{asset.location}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${asset.status === 'In Use' ? 'bg-green-50 text-green-700 border-green-200' :
                                        asset.status === 'Maintenance' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-gray-100'
                                        }`}>
                                        {asset.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        category: 'Furniture',
        assignedTo: '',
        location: '',
        status: 'In Use'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await addAsset(formData);
            onSuccess();
        } catch (err) {
            setError('Failed to register asset in inventory matrix.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card w-full max-w-md rounded-[2rem] border border-border shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Register Asset</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Inventory Vector Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs font-bold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Asset Name</label>
                        <input
                            required
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-bold text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. MacBook Pro M3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-bold text-sm outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Furniture</option>
                                <option>IT Hardware</option>
                                <option>Vehicle</option>
                                <option>Telecom</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-bold text-sm outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>In Use</option>
                                <option>In Stock</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Assigned To</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-bold text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
                            value={formData.assignedTo}
                            onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                            placeholder="Employee Name"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-bold text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Floor 4, Bay 12"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-primary text-primary-foreground py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Deploy Asset
                    </button>
                </form>
            </div>
        </div>
    );
}
