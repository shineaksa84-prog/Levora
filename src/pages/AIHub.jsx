import { useState } from 'react';
import VideoScreener from '../features/ai/VideoScreener';
import AISourcer from '../features/ai/AISourcer';
import HRAssistant from '../features/ai/HRAssistant';
import JDGenerator from '../features/jobs/JDGenerator';
import JDRewriter from '../features/jobs/JDRewriter';
import ScreeningGenerator from '../features/jobs/ScreeningGenerator';
import ScriptBuilder from '../features/recruitment/ScriptBuilder';
import { Video, Search, MessageSquare, FileText, RefreshCw, List, Phone } from 'lucide-react';

export default function AIHub() {
    const [activeTab, setActiveTab] = useState('screener');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">AI Hub</h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab('screener')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'screener'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Video className="w-4 h-4" />
                    Video Screener
                </button>
                <button
                    onClick={() => setActiveTab('sourcer')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'sourcer'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Search className="w-4 h-4" />
                    AI Sourcer
                </button>
                <button
                    onClick={() => setActiveTab('assistant')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'assistant'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <MessageSquare className="w-4 h-4" />
                    HR Assistant
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                    onClick={() => setActiveTab('jd-generator')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'jd-generator'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <FileText className="w-4 h-4" />
                    JD Generator
                </button>
                <button
                    onClick={() => setActiveTab('jd-rewriter')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'jd-rewriter'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <RefreshCw className="w-4 h-4" />
                    Rewriter
                </button>
                <button
                    onClick={() => setActiveTab('screening')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'screening'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <List className="w-4 h-4" />
                    Screening
                </button>
                <button
                    onClick={() => setActiveTab('scripts')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'scripts'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Phone className="w-4 h-4" />
                    Scripts
                </button>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === 'screener' && <VideoScreener />}
                {activeTab === 'sourcer' && <AISourcer />}
                {activeTab === 'assistant' && <HRAssistant />}
                {activeTab === 'jd-generator' && <JDGenerator />}
                {activeTab === 'jd-rewriter' && <JDRewriter />}
                {activeTab === 'screening' && <ScreeningGenerator />}
                {activeTab === 'scripts' && <ScriptBuilder />}
            </div>
        </div>
    );
}
