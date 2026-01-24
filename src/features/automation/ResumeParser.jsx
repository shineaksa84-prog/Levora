import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader, Sparkles, Users } from 'lucide-react';
import { resumeParserService } from '../../lib/services/resumeParser';

export default function ResumeParser() {
    const [files, setFiles] = useState([]);
    const [parsing, setParsing] = useState(false);
    const [results, setResults] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setResults([]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
        setResults([]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleParse = async () => {
        if (files.length === 0) return;

        setParsing(true);

        // Simulate parsing with mock data
        try {
            const result = await resumeParserService.bulkParseResumes(files);
            setResults(result.results);
        } catch (error) {
            console.error("Error parsing resumes:", error);
        } finally {
            setParsing(false);
        }
    };

    const stats = {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
    };

    return (
        <div className="space-y-10">
            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="bg-card rounded-[3rem] border-2 border-dashed border-primary/20 p-20 text-center hover:border-primary hover:bg-primary/5 transition-all duration-700 cursor-pointer group shadow-2xl relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col items-center gap-8 relative z-10">
                    <div className="p-6 bg-primary/10 rounded-[2rem] shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Upload className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight uppercase">Ingest Neural <span className="text-primary italic">Resume Hub</span></h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Supports PDF, DOCX, and TXT vectors // Multi-cluster upload</p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Selected Files Hub */}
            {files.length > 0 && (
                <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
                        <div>
                            <h3 className="text-lg font-black text-foreground tracking-tight uppercase">Queued Assets <span className="text-primary ml-2 italic">[{files.length}]</span></h3>
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Ready for AI pattern synthesis</p>
                        </div>
                        <button
                            onClick={handleParse}
                            disabled={parsing}
                            className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden relative group"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {parsing ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Synthesizing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Initialize AI Extraction
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-5 bg-primary/5 rounded-2xl border border-primary/10 group hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-background rounded-xl">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-foreground uppercase tracking-widest truncate max-w-[150px]">{file.name}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                {results[index] && (
                                    results[index].success ? (
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shadow-xl" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-rose-500" />
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Synthesis Results */}
            {results.length > 0 && (
                <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-700">
                    {/* Stats Matrix */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="bg-card rounded-3xl border border-border p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users className="w-12 h-12 text-primary" />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Total Vectors</p>
                            <h4 className="text-4xl font-black text-foreground tracking-tighter">{stats.total}</h4>
                        </div>
                        <div className="bg-card rounded-3xl border border-border p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CheckCircle className="w-12 h-12 text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 text-emerald-500/80">Success Rate</p>
                            <h4 className="text-4xl font-black text-emerald-500 tracking-tighter">{stats.successful}</h4>
                        </div>
                        <div className="bg-card rounded-3xl border border-border p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <XCircle className="w-12 h-12 text-rose-500" />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 text-rose-500/80">Anomaly Count</p>
                            <h4 className="text-4xl font-black text-rose-500 tracking-tighter">{stats.failed}</h4>
                        </div>
                    </div>

                    {/* Parsed Node Matrix */}
                    <div className="bg-card rounded-[3rem] border border-border shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-border bg-primary/5 flex justify-between items-center">
                            <h3 className="text-xl font-black text-foreground tracking-tight uppercase">Synthesized <span className="text-primary italic">Candidates</span></h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline underline-offset-4">Bulk Commit to Talent Pool</button>
                        </div>
                        <div className="divide-y divide-border/50">
                            {results.filter(r => r.success).map((result, index) => (
                                <div key={index} className="px-10 py-10 hover:bg-primary/[0.02] transition-colors group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <h4 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{result.data.name}</h4>
                                                <div className="flex items-center gap-6 mt-2">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                        <FileText className="w-3 h-3 text-primary/50" /> {result.data.email}
                                                    </span>
                                                    <span className="text-muted-foreground/30">•</span>
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{result.data.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.data.skills.map((skill, i) => (
                                                    <span key={i} className="px-4 py-1.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-primary/10 hover:border-primary/30 transition-colors">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-3">
                                            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em]">Neural ID Sequence</p>
                                            <p className="text-[10px] font-black font-mono bg-muted/50 border border-border px-5 py-2 rounded-xl text-primary tracking-widest shadow-inner">{result.candidateId}</p>
                                            <button className="mt-4 px-6 py-2.5 bg-foreground text-background rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Profile Deep Dive</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
