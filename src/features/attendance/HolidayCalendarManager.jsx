import { useState } from 'react';
import { Calendar, MapPin, Plus, Trash2, Edit } from 'lucide-react';

const MOCK_HOLIDAYS = [
    { id: 1, name: 'New Year', date: '2025-01-01', location: 'Global', type: 'Fixed' },
    { id: 2, name: 'Republic Day', date: '2025-01-26', location: 'India', type: 'National' },
    { id: 3, name: 'Independence Day', date: '2025-07-04', location: 'USA', type: 'National' },
    { id: 4, name: 'Diwali', date: '2025-10-20', location: 'India', type: 'Optional' },
];

export default function HolidayCalendarManager() {
    const [filter, setFilter] = useState('All');

    const filteredHolidays = filter === 'All' ? MOCK_HOLIDAYS : MOCK_HOLIDAYS.filter(h => h.location === filter || h.location === 'Global');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-pink-600" />
                        Multi-Country Holiday Calendar
                    </h2>
                    <p className="text-sm text-gray-500">Manage statutory and optional holidays per region.</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white"
                    >
                        <option value="All">All Locations</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UAE">UAE</option>
                    </select>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                        <Plus className="w-4 h-4" /> Add Holiday
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Holiday Name</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredHolidays.map(holiday => (
                            <tr key={holiday.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">{holiday.name}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {holiday.date}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${holiday.location === 'India' ? 'bg-orange-100 text-orange-700' :
                                            holiday.location === 'USA' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {holiday.location}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{holiday.type}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors">
                                        <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
