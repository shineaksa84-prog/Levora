import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🤔</span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display">Page not found</h1>
            <p className="text-slate-600 mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>

                <Link
                    to="/app"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
                >
                    <Home className="w-4 h-4" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
