import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Share2,
    Eye,
    EyeOff,
    MoreHorizontal,
    Mail,
    Phone,
    Linkedin,
    Github,
    Globe
} from 'lucide-react';
import CandidateTimeline from './CandidateTimeline';

export default function CandidateProfile() {
    const { id } = useParams();
    const [blindMode, setBlindMode] = useState(false);

    // Mock data - in real app fetch based on ID
    const candidate = {
        name: 'Alice Freeman',
        role: 'Senior React Developer',
        email: 'alice.freeman@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        about: 'Experienced Frontend Developer with 8+ years of expertise in React, TypeScript, and modern web technologies. Passionate about building accessible and performant user interfaces.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL'],
        experience: [
            { role: 'Senior Frontend Engineer', company: 'Tech Corp', duration: '2020 - Present' },
            { role: 'Frontend Developer', company: 'Web Solutions', duration: '2017 - 2020' },
        ]
    };

    const handleHire = () => {
        // In a real app, this would create an employee record
        alert(`Successfully hired ${candidate.name}! Redirecting to employee profile...`);
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link to="/candidates" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Candidates
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={() => setBlindMode(!blindMode)}
                        className={`px-3 py-2 border rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${blindMode ? 'bg-primary/10 text-primary border-primary/20' : 'bg-card border-border hover:bg-accent'
                            }`}
                    >
                        {blindMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {blindMode ? 'Blind Mode On' : 'Blind Mode Off'}
                    </button>
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button
                        onClick={handleHire}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Hire Candidate
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${blindMode ? 'bg-gray-200 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                                    {blindMode ? '??' : 'AF'}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{blindMode ? 'Candidate #1234' : candidate.name}</h1>
                                    <p className="text-muted-foreground">{candidate.role}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        {!blindMode && (
                                            <>
                                                <div className="flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {candidate.email}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {candidate.phone}
                                                </div>
                                            </>
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {candidate.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">About</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {candidate.about}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map(skill => (
                                    <span key={skill} className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Experience</h3>
                            <div className="space-y-4">
                                {candidate.experience.map((exp, i) => (
                                    <div key={i} className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium">{exp.role}</p>
                                            <p className="text-sm text-muted-foreground">{blindMode ? 'Confidential Company' : exp.company}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{exp.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Timeline & Meta */}
                <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                        <h3 className="font-semibold mb-4">Social Profiles</h3>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-4 h-4" />
                                LinkedIn Profile
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-4 h-4" />
                                GitHub Profile
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Globe className="w-4 h-4" />
                                Portfolio Website
                            </a>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                        <CandidateTimeline />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper icon
function MapPin({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    )
}
