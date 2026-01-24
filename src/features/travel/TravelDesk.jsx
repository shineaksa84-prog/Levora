import { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, DollarSign, Plus, Clock, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { getTravelRequests, createTravelRequest } from '../../lib/services/travelService';
import { toast } from '../../lib/services/toastService';

export default function TravelDesk() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        purpose: 'Client Meeting',
        advanceAmount: ''
    });

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            const data = await getTravelRequests();
            setTrips(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const newRequest = {
                ...formData,
                dates: `${new Date(formData.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${new Date(formData.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
                cost: formData.advanceAmount ? `₹${formData.advanceAmount} (Adv)` : '₹0 (TBD)'
            };
            await createTravelRequest(newRequest);
            toast.success('Travel request submitted for protocol approval.');
            setFormData({
                destination: '',
                startDate: '',
                endDate: '',
                purpose: 'Client Meeting',
                advanceAmount: ''
            });
            loadTrips();
        } catch (error) {
            toast.error('Strategic failure: Travel request sync failed.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Request Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Plane className="w-5 h-5 text-primary" /> New Trip Request
                        </h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Destination</label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <input
                                        required
                                        className="w-full pl-9 p-2 border rounded-lg text-sm bg-background"
                                        placeholder="City, Country"
                                        value={formData.destination}
                                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Start Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full p-2 border rounded-lg text-sm bg-background"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">End Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full p-2 border rounded-lg text-sm bg-background"
                                        value={formData.endDate}
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Purpose</label>
                                <select
                                    className="w-full p-2 border rounded-lg text-sm bg-background"
                                    value={formData.purpose}
                                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                >
                                    <option>Client Meeting</option>
                                    <option>Conference</option>
                                    <option>Training</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Advance Required?</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <input
                                        className="w-full pl-9 p-2 border rounded-lg text-sm bg-background"
                                        placeholder="Amount"
                                        type="number"
                                        value={formData.advanceAmount}
                                        onChange={e => setFormData({ ...formData, advanceAmount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-primary text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Submit Request
                            </button>
                        </form>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2"><FileText className="w-4 h-4" /> Policy Quick Link</h4>
                        <p className="text-xs text-blue-800 leading-relaxed">
                            Domestic travel requires 7 days notice. International requires 21 days. Max per-diem is ₹2,500.
                        </p>
                    </div>
                </div>

                {/* My Trips */}
                <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" /> My Travel History
                    </h3>

                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                        </div>
                    ) : trips.length > 0 ? (
                        trips.map(trip => (
                            <div key={trip.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${trip.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                        <Plane className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{trip.destination}</h4>
                                        <p className="text-sm text-muted-foreground">{trip.reason || trip.purpose} • {trip.dates}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:items-end gap-1">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${trip.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                                        }`}>
                                        {trip.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {trip.status}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                        Est. Cost: <span className="text-foreground font-bold">{trip.cost}</span>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground">
                            <p>No older trips found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
