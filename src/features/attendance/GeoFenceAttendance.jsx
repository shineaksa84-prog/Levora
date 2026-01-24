import { useState, useEffect } from 'react';
import { MapPin, Navigation, Smartphone, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const OFFICE_COORDS = { lat: 12.9716, lng: 77.5946, name: 'Bangalore HQ' }; // Example Coords

export default function GeoFenceAttendance() {
    const [userLoc, setUserLoc] = useState(null);
    const [status, setStatus] = useState('Checking...');
    const [distance, setDistance] = useState(0);

    // Mock geolocation check
    // Mock geographic protocol check
    const checkLocation = () => {
        setStatus('Initializing Signal...');

        setTimeout(() => {
            // Non-deterministic logic moved here to ensure component purity
            const isRange = Math.random() > 0.2;
            const mockDist = isRange ? Math.floor(Math.random() * 200) : Math.floor(Math.random() * 5000) + 500;

            setDistance(mockDist);
            setStatus(mockDist <= 500 ? 'Authorized' : 'Restricted');
            setUserLoc(isRange ? 'HQ Perimeter Verified' : 'External Vector Detected');
        }, 1200);
    };

    useEffect(() => {
        checkLocation();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-card border border-border rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Mobile App Viewport */}
            <div className="p-8 text-center relative z-10 border-b border-border bg-foreground text-background">
                <div className="flex items-center justify-center gap-4">
                    <div className="p-2 bg-primary rounded-xl shadow-lg">
                        <Smartphone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tighter">
                        PROXIMITY <span className="text-primary italic">PUNCH</span>
                    </h2>
                </div>
                <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mt-3">Neural Perimeter Validation v2.1</p>
            </div>

            {/* Neural Map Horizon */}
            <div className="h-80 bg-background relative w-full flex items-center justify-center overflow-hidden border-b border-border">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                {/* Tactical Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-48 h-48 rounded-full border-2 border-primary/20 animate-ping absolute top-0 left-0"></div>
                    <div className="w-48 h-48 rounded-full border border-primary/30 absolute top-0 left-0 flex items-center justify-center bg-primary/5 backdrop-blur-sm">
                        <div className="bg-primary text-primary-foreground p-5 rounded-[1.5rem] shadow-2xl rotate-3">
                            <MapPin className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Distance Node */}
                <div className="absolute bottom-8 bg-card/90 backdrop-blur-xl border border-border px-8 py-3 rounded-2xl text-[10px] font-black shadow-2xl flex items-center gap-4 text-foreground uppercase tracking-widest">
                    <Navigation className="w-4 h-4 text-primary animate-pulse" />
                    Proximity: <span className="text-primary">{distance}M</span>
                </div>
            </div>

            {/* Action Matrix */}
            <div className="p-10 text-center relative z-10">
                <div className={`mb-10 p-8 rounded-[2rem] border-2 transition-all duration-500 ${status === 'Authorized' ? 'border-primary/50 bg-primary/5 shadow-2xl shadow-primary/10' :
                        status === 'Restricted' ? 'border-rose-500/30 bg-rose-500/5' : 'border-border/30 bg-muted/20'
                    }`}>
                    {status === 'Initializing Signal...' && (
                        <div className="relative">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        </div>
                    )}
                    {status === 'Authorized' && <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4 animate-in zoom-in" />}
                    {status === 'Restricted' && <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-in shake" />}

                    <h3 className={`text-xl font-black uppercase tracking-tighter ${status === 'Authorized' ? 'text-primary' :
                            status === 'Restricted' ? 'text-rose-500' : 'text-foreground'
                        }`}>
                        {status === 'Initializing Signal...' ? 'Scanning Vector...' : status === 'Authorized' ? 'Perimeter Verified' : 'Access Restricted'}
                    </h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{userLoc || 'Awaiting Authorization...'}</p>
                </div>

                <button
                    disabled={status !== 'Authorized'}
                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all relative overflow-hidden group/btn ${status === 'Authorized'
                            ? 'bg-primary text-primary-foreground hover:scale-[1.02] shadow-primary/30'
                            : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                        }`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        Initialize Terminal Punch
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </button>

                <button
                    onClick={checkLocation}
                    className="mt-6 text-[9px] font-black text-primary hover:text-primary/80 uppercase tracking-widest flex items-center justify-center gap-2 w-full transition-colors"
                >
                    <RefreshCw className="w-3 h-3" /> Re-Scan Neural Vector
                </button>
            </div>
        </div>
    );
}
