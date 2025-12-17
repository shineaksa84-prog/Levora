import { useState, useEffect } from 'react';
import { MapPin, Navigation, Smartphone, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const OFFICE_COORDS = { lat: 12.9716, lng: 77.5946, name: 'Bangalore HQ' }; // Example Coords

export default function GeoFenceAttendance() {
    const [userLoc, setUserLoc] = useState(null);
    const [status, setStatus] = useState('Checking...');
    const [distance, setDistance] = useState(0);

    // Mock geolocation check
    const checkLocation = () => {
        setStatus('Locating...');
        // Simulating random location near office
        setTimeout(() => {
            // Randomly simulate In-Range (80% chance) vs Out-Range (20%)
            const isRange = Math.random() > 0.2;
            const mockDist = isRange ? Math.floor(Math.random() * 200) : Math.floor(Math.random() * 5000) + 500;

            setDistance(mockDist);
            setStatus(mockDist <= 500 ? 'Allowed' : 'Denied');
            setUserLoc(isRange ? 'Within Office Perimeter' : 'Unknown Location (Remote)');
        }, 1500);
    };

    useEffect(() => {
        checkLocation();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden relative">
            {/* Mobile App Frame Header */}
            <div className="bg-indigo-600 p-6 text-center text-white relative z-10">
                <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                    <Smartphone className="w-5 h-5" /> QuickPunch
                </h2>
                <p className="text-indigo-200 text-xs mt-1">Geo-Fenced Attendance System</p>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-100 relative w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                {/* Office Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 rounded-full border-2 border-indigo-500/30 animate-ping absolute top-0 left-0"></div>
                    <div className="w-32 h-32 rounded-full border border-indigo-500/50 absolute top-0 left-0 flex items-center justify-center">
                        <div className="bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                            <MapPin className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                    <Navigation className="w-3 h-3 text-indigo-600" />
                    Distance to Office: {distance}m
                </div>
            </div>

            {/* Action Area */}
            <div className="p-6 text-center">
                <div className={`mb-6 p-4 rounded-xl border-2 ${status === 'Allowed' ? 'border-green-100 bg-green-50' :
                        status === 'Denied' ? 'border-red-100 bg-red-50' : 'border-gray-100 bg-gray-50'
                    }`}>
                    {status === 'Locating...' && <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />}
                    {status === 'Allowed' && <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />}
                    {status === 'Denied' && <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />}

                    <h3 className={`text-lg font-bold ${status === 'Allowed' ? 'text-green-900' :
                            status === 'Denied' ? 'text-red-900' : 'text-gray-900'
                        }`}>
                        {status === 'Locating...' ? 'Acquiring Signal...' : status === 'Allowed' ? 'You are In Range' : 'Out of Office Bounds'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{userLoc || 'Waiting for GPS...'}</p>
                </div>

                <button
                    disabled={status !== 'Allowed'}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${status === 'Allowed'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    PUNCH IN
                </button>
                <button onClick={checkLocation} className="mt-4 text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 w-full">
                    <RefreshCw className="w-3 h-3" /> Retry GPS
                </button>
            </div>
        </div>
    );
}
