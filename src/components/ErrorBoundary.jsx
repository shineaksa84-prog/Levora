import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

/**
 * Global ErrorBoundary Component
 * Catches errors in the component tree and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error("[ErrorBoundary] Caught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.hash = '#/'; // Go back to landing
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6 font-sans">
                    <div className="max-w-md w-full glass-card p-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)] text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>

                        <h1 className="text-2xl font-black tracking-tighter text-white mb-2">
                            Workspace <span className="text-red-500 italic">Interrupted</span>
                        </h1>

                        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                            A critical error occurred while rendering this component. This usually happens due to missing data or broken imports.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-8 p-4 bg-black/40 border border-border rounded-xl text-left overflow-hidden">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">Error Details</p>
                                <p className="text-xs font-mono text-white/70 break-words">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={this.handleReset}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-black text-xs shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
                            >
                                <RefreshCw className="w-4 h-4" /> Reload Workspace
                            </button>

                            <button
                                onClick={() => {
                                    window.location.hash = '#/';
                                    window.location.reload();
                                }}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white rounded-2xl font-black text-xs border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <Home className="w-4 h-4" /> Back to Landing
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Levora Intelligence System</p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
