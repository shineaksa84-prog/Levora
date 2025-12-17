import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContextMenu } from './ContextMenu';

export const SmartDataGrid = ({
    data,
    columns,
    title,
    searchable = true,
    pagination = true,
    itemsPerPage = 10,
    getRowContextMenuItems
}) => {
    const [sortConfig, setSortConfig] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Sorting
    const sortedData = React.useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    // Filtering
    const filteredData = React.useMemo(() => {
        return sortedData.filter(item => {
            return Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [sortedData, searchTerm]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">{filteredData.length} records found</p>
                </div>
                <div className="flex gap-3">
                    {searchable && (
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Smart Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white/50 transition-all text-sm w-64"
                            />
                        </div>
                    )}
                    <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 text-left">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors"
                                    onClick={() => requestSort(col.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {sortConfig?.key === col.key && (
                                            sortConfig.direction === 'ascending' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        <AnimatePresence mode='wait'>
                            {currentItems.map((item, index) => {
                                const RowContent = (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                                    >
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {col.render ? col.render(item[col.key], item) : item[col.key]}
                                            </td>
                                        ))}
                                    </motion.tr>
                                );

                                if (getRowContextMenuItems) {
                                    return (
                                        // IMPORTANT: wrapping 'tr' in a div/custom component can break table layout if not careful.
                                        // 'contents' display logic in ContextMenu helps, but pure HTML structure suggests 
                                        // attaching context menu event to 'tr' directly is better.
                                        // However, for this component architecture, let's wrap it in a pseudo-container 
                                        // or attaching the event listener to the TR.

                                        // Better approach: Make ContextMenu triggerable by event, not wrapper.
                                        // OR: ContextMenu component returns the children with event attached?
                                        // Current ContextMenu implementation wraps children in a div. 
                                        // We should change ContextMenu to just be a portal or similar, OR
                                        // ensure the wrapper is 'display: contents' (which we did in previous call).
                                        <ContextMenu key={index} menuItems={getRowContextMenuItems(item)} className="contents">
                                            {RowContent}
                                        </ContextMenu>
                                    );
                                }
                                return RowContent;
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <p className="text-xs text-gray-500">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} records
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-xs font-medium rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 transition-colors"
                        >
                            Previous
                        </button>
                        {/* Simple page numbers */}
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-glow-sm' : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-xs font-medium rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
