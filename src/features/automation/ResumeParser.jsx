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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        AI Resume Parser
                    </h1>
                    <p className="text-muted-foreground mt-1">Upload resumes and let AI extract candidate information automatically.</p>
                </div>
            </div>

            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="bg-card rounded-xl border-2 border-dashed border-border p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Drop resumes here or click to browse</h3>
                        <p className="text-sm text-muted-foreground">Supports PDF, DOCX, and TXT files</p>
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

            {/* Selected Files */}
            {files.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Selected Files ({files.length})</h3>
                        <button
                            onClick={handleParse}
                            disabled={parsing}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {parsing ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Parsing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Parse with AI
                                </>
                            )}
                        </button>
                    </div>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                {results[index] && (
                                    results[index].success ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.total}</p>
                                    <p className="text-sm text-muted-foreground">Total Resumes</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.successful}</p>
                                    <p className="text-sm text-muted-foreground">Successfully Parsed</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <XCircle className="w-5 h-5 text-red-500" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.failed}</p>
                                    <p className="text-sm text-muted-foreground">Failed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Parsed Candidates */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h3 className="font-semibold">Parsed Candidates</h3>
                        </div>
                        <div className="divide-y divide-border">
                            {results.filter(r => r.success).map((result, index) => (
                                <div key={index} className="p-6 hover:bg-muted/30 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-1">{result.data.name}</h4>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span>{result.data.email}</span>
                                                <span>•</span>
                                                <span>{result.data.phone}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.data.skills.map((skill, i) => (
                                                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-2">Candidate ID</p>
                                            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{result.candidateId}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
