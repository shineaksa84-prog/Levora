import { useState } from 'react';
import { Search, MapPin, Mail, Phone, Filter } from 'lucide-react';

const EMPLOYEES = [
    { id: 1, name: 'Alice Smith', role: 'UX Designer', dept: 'Product', loc: 'Bangalore', email: 'alice@acme.com', img: 'AS' },
    { id: 2, name: 'Bob Jones', role: 'Senior Engineer', dept: 'Engineering', loc: 'Mumbai', email: 'bob@acme.com', img: 'BJ' },
    { id: 3, name: 'Charlie Day', role: 'HR Manager', dept: 'HR', loc: 'Bangalore', email: 'charlie@acme.com', img: 'CD' },
    { id: 4, name: 'Diana Prince', role: 'Product Manager', dept: 'Product', loc: 'Delhi', email: 'diana@acme.com', img: 'DP' },
    { id: 5, name: 'Evan Peters', role: 'Sales Lead', dept: 'Sales', loc: 'Mumbai', email: 'evan@acme.com', img: 'EP' },
    { id: 6, name: 'Fiona Gallagher', role: 'Marketing Specialist', dept: 'Marketing', loc: 'Remote', email: 'fiona@acme.com', img: 'FG' },
];

export default function CompanyDirectory() {
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const filtered = EMPLOYEES.filter(emp => {
        const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.role.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'All' || emp.dept === deptFilter;
        return matchSearch && matchDept;
    });

    const depts = ['All', ...new Set(EMPLOYEES.map(e => e.dept))];

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col gap-6">
            <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm"
                        placeholder="Search by name, role, or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {depts.map(d => (
                        <button
                            key={d}
                            onClick={() => setDeptFilter(d)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${deptFilter === d ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(emp => (
                        <div key={emp.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                                    {emp.img}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{emp.name}</h4>
                                    <p className="text-sm text-primary font-medium truncate">{emp.role}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{emp.dept}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> {emp.loc}
                                </div>
                                <div className="flex items-center gap-2 truncate">
                                    <Mail className="w-3 h-3" /> {emp.email.split('@')[0]}
                                </div>
                            </div>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button className="flex-1 bg-gray-900 text-white py-1.5 rounded text-xs font-bold hover:bg-black">View Profile</button>
                                <button className="flex-1 border border-gray-200 py-1.5 rounded text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-1">
                                    <Phone className="w-3 h-3" /> Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No employees found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
