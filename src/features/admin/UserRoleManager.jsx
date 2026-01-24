import { useState, useEffect } from 'react';
import { Users, Shield, Edit2, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import MagneticButton from '../../components/ui/MagneticButton';
import ConfettiFX from '../../components/ui/ConfettiFX';
import { getUsers, addUser, updateUserRole, updateUserStatus } from '../../lib/services/userService';
import { toast } from '../../lib/services/toastService';

const ROLES = [
    'SUPER_ADMIN', 'RECRUITER', 'PAYROLL_ADMIN', 'HIRING_MANAGER', 'EMPLOYEE', 'INTERVIEWER'
];

export default function UserRoleManager() {
    const [users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleProvisionUser = async () => {
        // Mocking a new user provision
        const mockNewUser = {
            name: `New User ${Math.floor(Math.random() * 1000)}`,
            email: `user${Date.now()}@company.com`,
            role: 'EMPLOYEE'
        };

        await addUser(mockNewUser);
        await loadUsers();

        // Trigger confetti for demo purposes "Success" feel
        setShowConfetti(true);
        toast.success(`Provisioned ${mockNewUser.email} successfully.`);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const handleRoleChange = async (userId, newRole) => {
        await updateUserRole(userId, newRole);
        toast.success("Access protocols updated immediately.");
        loadUsers();
    };

    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        await updateUserStatus(userId, newStatus);
        toast.info(`User identity ${newStatus === 'Active' ? 'restored' : 'suspended'}.`);
        loadUsers();
    };

    return (
        <div className="space-y-8 h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-1000">
            <ConfettiFX active={showConfetti} />
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-foreground flex items-center gap-3 tracking-tighter">
                        <Shield className="w-8 h-8 text-primary" />
                        Access <span className="text-primary italic">Governance</span>
                    </h2>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Institutional Permissions & Neural Guardrails</p>
                </div>
                <div className="flex gap-4">
                    <MagneticButton>
                        <button
                            onClick={handleProvisionUser}
                            className="cyber-button-primary flex items-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 text-xs font-black uppercase tracking-widest px-8 py-4"
                        >
                            <UserPlus className="w-4 h-4" /> Provision User
                        </button>
                    </MagneticButton>
                </div>
            </div>

            <div className="glass-card flex-1 overflow-hidden flex flex-col border border-border/50">
                <div className="overflow-auto flex-1 scrollbar-hide">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-primary/5 text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] sticky top-0 z-10">
                            <tr>
                                <th className="px-8 py-5">Personnel Node</th>
                                <th className="px-8 py-5">Assigned Role</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Last Cycle</th>
                                <th className="px-8 py-5 text-right">Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-foreground tracking-tight">{user.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="relative inline-block w-full max-w-[160px]">
                                            <select
                                                className="appearance-none bg-background border border-border text-foreground py-2 pl-4 pr-10 rounded-xl font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer w-full"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-primary">
                                                <Edit2 className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button
                                            onClick={() => handleStatusToggle(user.id, user.status)}
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                                }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 text-muted-foreground font-black text-[10px] uppercase tracking-tighter">
                                        {user.last_login}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-muted-foreground hover:text-primary transition-all p-3 rounded-2xl hover:bg-primary/10 border border-transparent hover:border-primary/20">
                                            <Shield className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 flex gap-4 items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                    <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-foreground uppercase tracking-widest">Neural Security Protocol 04</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-medium italic">
                        Role alterations are instantaneous. Super Admin privileges provide unrestricted access to the Neural Core and Institutional Data Siphons. Use with extreme discretion.
                    </p>
                </div>
            </div>
        </div>
    );
}
