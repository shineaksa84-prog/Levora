import { useState, useEffect } from 'react';
import { MoreHorizontal, Mail, Phone, MapPin, Filter, Plus, Search, Eye, FileEdit, Trash2, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoleGuard } from '../../components/RoleGuard';
import { SmartDataGrid } from '../../components/ui/SmartDataGrid';

// Static employees removed, using state instead

import { getEmployees, seedEmployees, updateEmployeeStatus } from '../../lib/services/employeeService';
import { Loader2 } from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            let data = await getEmployees();
            if (data.length === 0) {
                data = await seedEmployees();
            }
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const getContextMenuItems = (employee) => [
        {
            label: 'View Profile',
            icon: <Eye className="w-4 h-4" />,
            onClick: () => window.location.hash = `#/employees/${employee.id}`
        },
        {
            label: 'Edit Details',
            icon: <FileEdit className="w-4 h-4" />,
            onClick: () => toast.info(`Editing ${employee.name}... (Modal Opening)`)
        },
        {
            label: employee.status === 'Suspended' ? 'Activate Account' : 'Suspend Account',
            icon: <Ban className="w-4 h-4" />,
            onClick: async () => {
                try {
                    const newStatus = employee.status === 'Suspended' ? 'Active' : 'Suspended';
                    await updateEmployeeStatus(employee.id, newStatus);
                    toast.success(`Employee ${newStatus === 'Suspended' ? 'suspended' : 'activated'} successfully.`);
                    fetchEmployees(); // Refresh list
                } catch (error) {
                    toast.error("Failed to update status.");
                }
            },
            danger: employee.status !== 'Suspended'
        }
    ];

    const columns = [
        {
            key: 'name',
            label: 'Employee',
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 shadow-sm">
                        {row.avatar}
                    </div>
                    <div>
                        <Link to={`/employees/${row.id}`} className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                            {value}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{row.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department' },
        {
            key: 'location',
            label: 'Location',
            render: (value) => (
                <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-3.5 h-3.5" />
                    {value}
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${value === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                    value === 'On Leave' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            key: 'actions',
            label: '',
            render: () => (
                <div className="text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Employees</h1>
                    <p className="text-gray-500 mt-1">Manage your team members and roles.</p>
                </div>
                <RoleGuard resource="employees" action="create">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-glow hover:shadow-glow-lg flex items-center gap-2 transform hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </button>
                </RoleGuard>
            </div>

            <SmartDataGrid
                data={employees}
                columns={columns}
                title="All Employees"
                itemsPerPage={5}
                getRowContextMenuItems={getContextMenuItems}
            />
        </div>
    );
}
