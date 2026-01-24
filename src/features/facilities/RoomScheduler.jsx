import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, X, Loader2 } from 'lucide-react';
import { bookRoom, getRoomBookings } from '../../lib/services/facilityService';
import { toast } from '../../lib/services/toastService';

const ROOMS = [
    { id: 1, name: 'Glass Room', capacity: 4, floor: '3F', type: 'Meeting' },
    { id: 2, name: 'Boardroom A', capacity: 12, floor: '3F', type: 'Board' },
    { id: 3, name: 'Thinking Pod', capacity: 1, floor: '3F', type: 'Focus' },
];

export default function RoomScheduler() {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        duration: '1h',
        purpose: ''
    });

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const data = await getRoomBookings();
        setBookings(data);
    };

    const handleBookClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await bookRoom({
                roomId: selectedRoom.id,
                roomName: selectedRoom.name,
                ...formData
            });
            toast.success('Room reservation synchronized successfully.');
            setShowModal(false);
            loadBookings();
        } catch (error) {
            toast.error('Booking failed: Spatial collision detected.');
        } finally {
            setLoading(false);
        }
    };

    const getRoomStatus = (roomId) => {
        const roomBooking = bookings.find(b => b.roomId === roomId);
        if (roomBooking) {
            return `Booked (${roomBooking.startTime})`;
        }
        return 'Available';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Room Scheduler
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div> Available
                    <div className="w-3 h-3 bg-red-500 rounded-full ml-2"></div> Booked
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROOMS.map(room => {
                    const status = getRoomStatus(room.id);
                    const isAvailable = status === 'Available';
                    return (
                        <div key={room.id} className="bg-card p-4 rounded-xl border border-border hover:shadow-sm transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-foreground">{room.name}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {status}
                                </span>
                            </div>
                            <div className="flex gap-3 text-xs text-muted-foreground font-medium mb-3">
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {room.capacity} ppl</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {room.floor}</span>
                            </div>
                            {isAvailable && (
                                <button
                                    onClick={() => handleBookClick(room)}
                                    className="w-full py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors"
                                >
                                    Book Now
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Book {selectedRoom.name}</h3>
                            <button onClick={() => setShowModal(false)} className="hover:bg-accent p-1 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2.5 border rounded-xl text-sm bg-background/50"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">Start Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full p-2.5 border rounded-xl text-sm bg-background/50"
                                        value={formData.startTime}
                                        onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">Duration</label>
                                <select
                                    className="w-full p-2.5 border rounded-xl text-sm bg-background/50"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                >
                                    <option value="30m">30 Minutes</option>
                                    <option value="1h">1 Hour</option>
                                    <option value="1.5h">1.5 Hours</option>
                                    <option value="2h">2 Hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">Purpose / Meeting Title</label>
                                <input
                                    placeholder="e.g. Sprint Planning"
                                    required
                                    className="w-full p-2.5 border rounded-xl text-sm bg-background/50"
                                    value={formData.purpose}
                                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Confirm Reservation
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
