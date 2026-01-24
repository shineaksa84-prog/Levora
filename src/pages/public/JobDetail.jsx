import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Upload, MapPin, Building2, Clock, DollarSign } from 'lucide-react';

const JOB_DETAILS = {
    1: { title: 'Senior React Developer', department: 'Engineering', location: 'Remote / New York', type: 'Full-time', salary: '$140k - $180k', description: 'We are looking for an experienced React developer...' },
    2: { title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time', salary: '$130k - $160k', description: 'Lead the product vision for our core platform...' },
    3: { title: 'HR Generalist', department: 'People Operations', location: 'London, UK', type: 'Contract', salary: '£50k - £65k', description: 'Manage daily HR operations...' },
    4: { title: 'UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', salary: '$110k - $150k', description: 'Design intuitive and beautiful user interfaces...' },
};

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const job = JOB_DETAILS[id];
    const [submitted, setSubmitted] = useState(false);

    if (!job) return <div className="p-20 text-center">Job not found</div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => navigate('/careers'), 3000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center p-8 glass-card max-w-md">
                    <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-2">Application Received!</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Thanks for applying to be <strong className="text-primary">{job.title}</strong>. We will review your profile and get back to you shortly.
                    </p>
                    <button onClick={() => navigate('/careers')} className="cyber-button-primary">
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="glass-card border-b border-white/10 sticky top-0 z-10 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                        <button onClick={() => navigate('/careers')} className="hover:text-foreground transition-colors">Careers</button>
                        <span>/</span>
                        <span className="text-foreground font-bold truncate max-w-[200px]">{job.title}</span>
                    </div>
                    <button onClick={() => navigate('/careers')} className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Jobs
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                <div className="glass-card overflow-hidden">
                    <div className="p-8 border-b border-white/10 gradient-primary">
                        <div className="flex flex-wrap gap-3 mb-4 text-sm font-bold text-primary-foreground/80">
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><Building2 className="w-3 h-3" /> {job.department}</span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><MapPin className="w-3 h-3" /> {job.location}</span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><Clock className="w-3 h-3" /> {job.type}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-primary-foreground">{job.title}</h1>
                        <p className="text-primary-foreground/70 font-bold flex items-center gap-2 mt-2">
                            <DollarSign className="w-4 h-4" /> {job.salary}
                        </p>
                    </div>

                    <div className="p-8 grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="font-bold text-lg mb-4 text-slate-900">About the Role</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {job.description}
                                    <br /><br />
                                    At Levora, we believe in empowering people. As a {job.title}, you will play a crucial role in our mission. You will work with a world-class team of engineers and designers to build products that matter.
                                </p>
                            </section>
                            <section>
                                <h3 className="font-bold text-lg mb-4 text-slate-900">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                    <li>3+ years of relevant experience.</li>
                                    <li>Strong communication and problem-solving skills.</li>
                                    <li>Passion for building high-quality software.</li>
                                    <li>Ability to work in a fast-paced environment.</li>
                                </ul>
                            </section>
                        </div>

                        <div className="md:col-span-1">
                            <div className="glass-card p-6 sticky top-24">
                                <h3 className="font-black text-lg mb-6 text-foreground">Apply Now</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Full Name</label>
                                        <input required className="w-full p-2.5 border border-white/10 bg-card/50 rounded-lg text-sm text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Email</label>
                                        <input required type="email" className="w-full p-2.5 border border-white/10 bg-card/50 rounded-lg text-sm text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Phone</label>
                                        <input required className="w-full p-2.5 border border-white/10 bg-card/50 rounded-lg text-sm text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Resume / CV</label>
                                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-all">
                                            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                            <span className="text-xs text-muted-foreground">Upload PDF</span>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full cyber-button-primary mt-2">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
