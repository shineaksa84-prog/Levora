import React from 'react';
import { Search, MapPin, Briefcase, Star, ExternalLink, PlusCircle, Sparkles } from 'lucide-react';

const TALENT = [
    {
        id: 1,
        name: "Elena V.",
        role: "Senior Product Designer",
        location: "San Francisco, CA",
        source: "Behance",
        skills: ["Figma", "Design Systems", "Prototyping"],
        match: 98,
        image: "EV"
    },
    {
        id: 2,
        name: "Marcus J.",
        role: "Full Stack Engineer",
        location: "London, UK",
        source: "GitHub",
        skills: ["React", "Node.js", "GraphQL"],
        match: 94,
        image: "MJ"
    },
    {
        id: 3,
        name: "Sarah L.",
        role: "AI Research Scientist",
        location: "Toronto, Canada",
        source: "LinkedIn",
        skills: ["Python", "TensorFlow", "NLP"],
        match: 99,
        image: "SL"
    },
    {
        id: 4,
        name: "David K.",
        role: "DevOps Architect",
        location: "Berlin, Germany",
        source: "StackOverflow",
        skills: ["Kubernetes", "AWS", "Terraform"],
        match: 91,
        image: "DK"
    }
];

export default function TalentMarketplace() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Search Hub */}
            <div className="glass-card p-4 flex items-center gap-4 sticky top-4 z-20 backdrop-blur-xl">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search global talent vectors (e.g., 'React Developer in NYC')..."
                    className="bg-transparent border-none outline-none text-sm font-bold text-foreground placeholder:text-muted-foreground/50 w-full"
                />
                <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-border/30 text-[10px] font-black uppercase tracking-wider text-muted-foreground cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors">Remote Only</span>
                    <span className="px-3 py-1.5 rounded-lg bg-border/30 text-[10px] font-black uppercase tracking-wider text-muted-foreground cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors">Top 5%</span>
                </div>
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {TALENT.map((profile) => (
                    <div key={profile.id} className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/50 relative overflow-hidden">
                        {/* Match Badge */}
                        <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            {profile.match}% MATCH
                        </div>

                        {/* Profile Header */}
                        <div className="flex flex-col items-center text-center mt-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px] shadow-xl shadow-primary/20 mb-4 group-hover:scale-110 transition-transform">
                                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-xl font-black text-foreground">
                                    {profile.image}
                                </div>
                            </div>
                            <h3 className="text-lg font-black text-foreground">{profile.name}</h3>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">{profile.role}</p>

                            <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                                <MapPin className="w-3 h-3" />
                                {profile.location}
                            </div>
                        </div>

                        {/* Skills Matrix */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {profile.skills.map(skill => (
                                <span key={skill} className="px-2.5 py-1 rounded-md bg-border/20 border border-white/5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/30 hover:bg-foreground hover:text-background text-xs font-black uppercase tracking-wide transition-colors">
                                <ExternalLink className="w-3 h-3" />
                                View
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black uppercase tracking-wide transition-colors shadow-lg shadow-primary/20">
                                <PlusCircle className="w-3 h-3" />
                                Acquire
                            </button>
                        </div>
                    </div>
                ))}

                {/* Upsell Card */}
                <div className="glass-card p-6 border-dashed border-2 border-primary/30 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/5 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Search className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-sm font-black text-foreground uppercase tracking-wide">Explore Global Pool</h3>
                    <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">Access 50M+ additional profiles via our AI partner network.</p>
                </div>
            </div>
        </div>
    );
}
