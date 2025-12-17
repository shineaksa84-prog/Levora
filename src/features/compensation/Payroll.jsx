import { useState } from 'react';
import {
    DollarSign,
    Calendar,
    Download,
    TrendingUp,
    CreditCard,
    PieChart,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { getPayrollHistory, getSalaryStructure, getTaxDeductions } from '../../lib/services/compensationService';

export default function Payroll() {
    const [payrollHistory, setPayrollHistory] = useState([]);
    const [salaryStructure, setSalaryStructure] = useState(null);
    const [taxDeductions, setTaxDeductions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [history, structure, taxes] = await Promise.all([
                getPayrollHistory('current_user'),
                getSalaryStructure('current_user'),
                getTaxDeductions('current_user')
            ]);
            setPayrollHistory(history);
            setSalaryStructure(structure);
            setTaxDeductions(taxes);
        } catch (error) {
            console.error('Error loading payroll data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading payroll data...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <DollarSign className="w-6 h-6 text-green-500" />
                        </div>
                        <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" />
                            +2.5%
                        </span>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">Next Payout</h3>
                    <p className="text-2xl font-bold mt-1">${payrollHistory[0]?.net.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-2">Scheduled for Dec 28, 2024</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">YTD Earnings</h3>
                    <p className="text-2xl font-bold mt-1">$93,500.00</p>
                    <p className="text-xs text-muted-foreground mt-2">Gross Income</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <PieChart className="w-6 h-6 text-purple-500" />
                        </div>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">Tax Deductions</h3>
                    <p className="text-2xl font-bold mt-1">${taxDeductions?.ytdTax.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-2">YTD Taxes & Benefits</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Salary Structure */}
                <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Salary Structure
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">Basic Salary</span>
                            <span className="font-medium">${salaryStructure?.basic.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">HRA</span>
                            <span className="font-medium">${salaryStructure?.hra.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">Special Allowance</span>
                            <span className="font-medium">${salaryStructure?.specialAllowance.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Gross Salary</span>
                                <span className="font-bold text-lg">${salaryStructure?.gross.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payroll History */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Payment History
                        </h3>
                        <button className="text-sm text-primary hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-border">
                        {payrollHistory.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground">{item.month}</h4>
                                        <p className="text-sm text-muted-foreground">Ref: {item.reference}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-medium text-foreground">${item.net.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">Net Pay</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                        {item.status}
                                    </div>
                                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
