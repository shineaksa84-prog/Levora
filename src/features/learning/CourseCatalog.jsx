import { useState } from 'react';
import { Search, BookOpen, Clock, PlayCircle, Star, Filter } from 'lucide-react';

const COURSES = [
    { id: 1, title: 'Advanced React Patterns', author: 'Kent C. Dodds', duration: '4h 30m', type: 'Video', category: 'Technical', rating: 4.8, img: 'bg-blue-100 text-blue-600' },
    { id: 2, title: 'Leadership 101: Managing Teams', author: 'Simon Sinek', duration: '2h 15m', type: 'Workshop', category: 'Soft Skills', rating: 4.9, img: 'bg-orange-100 text-orange-600' },
    { id: 3, title: 'Enterprise Design Systems', author: 'Figma Team', duration: '6h 00m', type: 'Interactive', category: 'Design', rating: 4.7, img: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Effective Communication', author: 'Harvard Business', duration: '1h 45m', type: 'Video', category: 'Soft Skills', rating: 4.5, img: 'bg-green-100 text-green-600' },
    { id: 5, title: 'Node.js Microservices', author: 'Stephen Grider', duration: '8h 20m', type: 'Video', category: 'Technical', rating: 4.6, img: 'bg-yellow-100 text-yellow-600' },
];

export default function CourseCatalog() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = COURSES.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || c.category === filter;
        return matchSearch && matchFilter;
    });

    const categories = ['All', 'Technical', 'Soft Skills', 'Design'];

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col gap-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary"
                        placeholder="Search for courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(course => (
                        <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                            <div className={`h-32 ${course.img} flex items-center justify-center`}>
                                <BookOpen className="w-12 h-12 opacity-50" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{course.category}</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold text-gray-700">{course.rating}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                                <p className="text-xs text-muted-foreground mb-4">by {course.author}</p>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex gap-3 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                                        <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {course.type}</span>
                                    </div>
                                    <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No courses found matching criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
