import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Monitor, Smartphone, AppWindow, Check, Plus, AlertCircle, ShoppingBag } from 'lucide-react';
import { getAssets, assignAsset } from '../../lib/services/onboardingService';

export default function AssetAllocation() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        const data = await getAssets();
        setAssets(data);
        setLoading(false);
    };

    const handleAssign = async (assetId) => {
        try {
            // Mock employee selection
            const employeeId = 'emp1';
            const updatedAsset = await assignAsset(assetId, employeeId);
            setAssets(prev => prev.map(a => a.id === assetId ? updatedAsset : a));
        } catch (error) {
            console.error('Assignment failed', error);
        }
    };

    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'hardware': return <Laptop className="w-5 h-5" />;
            case 'software': return <AppWindow className="w-5 h-5" />;
            case 'mobile': return <Smartphone className="w-5 h-5" />;
            case 'accessory': return <Monitor className="w-5 h-5" />;
            default: return <ShoppingBag className="w-5 h-5" />;
        }
    };

    const filteredAssets = assets.filter(a => filter === 'all' || a.type.toLowerCase() === filter.toLowerCase());

    if (loading) return <div>Loading assets...</div>;

    return (
        <div className="space-y-6">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-card border border-border rounded-xl">
                <div>
                    <h2 className="text-xl font-bold">Asset Allocation</h2>
                    <p className="text-muted-foreground text-sm">Provision hardware & software accesses</p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                        <option value="all">All Types</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                    </select>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Request Asset
                    </button>
                </div>
            </div>

            {/* Assets List */}
            <div className="grid grid-cols-1 gap-3">
                {filteredAssets.map(asset => (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${asset.status === 'assigned' ? 'bg-green-100 text-green-600' : 'bg-secondary/20 text-secondary'}`}>
                                {getIcon(asset.type)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{asset.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="capitalize">{asset.type}</span>
                                    {asset.serial && <span>• {asset.serial}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${asset.status === 'assigned'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                {asset.status}
                            </div>

                            {asset.status !== 'assigned' && (
                                <button
                                    onClick={() => handleAssign(asset.id)}
                                    className="px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    Assign
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="text-2xl font-bold">{assets.length}</div>
                    <div className="text-xs text-muted-foreground uppercase font-bold">Total Assets</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-green-600">{assets.filter(a => a.status === 'assigned').length}</div>
                    <div className="text-xs text-muted-foreground uppercase font-bold">Assigned</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-blue-600">{assets.filter(a => a.status === 'available').length}</div>
                    <div className="text-xs text-muted-foreground uppercase font-bold">Available</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-orange-600">{assets.filter(a => a.type === 'Hardware').length}</div>
                    <div className="text-xs text-muted-foreground uppercase font-bold">Hardware</div>
                </div>
            </div>
        </div>
    );
}
