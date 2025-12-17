import { useState } from 'react';
import { Download, FileSpreadsheet, Building2, AlertTriangle, Check } from 'lucide-react';

const BANKS = [
    { id: 'HDFC', name: 'HDFC Bank', format: '.txt (CMS)', logo: 'bg-blue-800' },
    { id: 'ICICI', name: 'ICICI Bank', format: '.csv (Corporate)', logo: 'bg-orange-700' },
    { id: 'SBI', name: 'State Bank of India', format: '.xls (Bulk)', logo: 'bg-blue-600' },
];

export default function BankFileGenerator() {
    const [selectedBank, setSelectedBank] = useState('HDFC');
    const [status, setStatus] = useState('Ready');

    // Mock validation
    const totalRecords = 142;
    const totalAmount = 8520000;
    const invalidRecords = 2; // e.g. Missing IFSC

    const handleDownload = () => {
        setStatus('Generating...');
        setTimeout(() => {
            setStatus('Downloaded');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gray-600" />
                        Bank Advice Generator
                    </h2>
                    <p className="text-sm text-gray-500">Export salary payment files for banking portals.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Bank Select */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Corporate Bank</p>
                    {BANKS.map(bank => (
                        <button
                            key={bank.id}
                            onClick={() => setSelectedBank(bank.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedBank === bank.id ? 'ring-2 ring-indigo-500 border-transparent shadow-md bg-white' : 'border-gray-200 hover:bg-gray-50 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${bank.logo} flex items-center justify-center text-white font-bold text-xs`}>
                                    {bank.id}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">{bank.name}</p>
                                    <p className="text-xs text-gray-500">Format: {bank.format}</p>
                                </div>
                            </div>
                            {selectedBank === bank.id && <Check className="w-5 h-5 text-indigo-600" />}
                        </button>
                    ))}
                </div>

                {/* Preview & Action */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">File Summary ({selectedBank})</h3>

                        <div className="grid grid-cols-2 gap-8 mb-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Records</p>
                                <p className="text-3xl font-mono font-bold text-gray-900">{totalRecords}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Payout</p>
                                <p className="text-3xl font-mono font-bold text-gray-900">₹{(totalAmount / 100000).toFixed(2)} Lakhs</p>
                            </div>
                        </div>

                        {invalidRecords > 0 && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-800 text-sm flex items-center gap-2 mb-6">
                                <AlertTriangle className="w-4 h-4" />
                                <strong>Blocking Error:</strong> {invalidRecords} employees have missing/invalid IFSC codes.
                                <button className="underline ml-1">View List</button>
                            </div>
                        )}

                        <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs text-gray-500 break-all border border-gray-200">
                            {/* Mock File CSV Preview */}
                            HDR,SALARY_DEC_2024,{totalRecords},{totalAmount},INR<br />
                            DTL,EMP001,JOHN DOE,HDFC0001234,ACCT987654321,50000<br />
                            DTL,EMP002,JANE SMITH,ICIC0005678,ACCT123456789,65000<br />
                            ... (140 more rows) ...
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={invalidRecords > 0}
                        className={`mt-6 w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${invalidRecords > 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                            }`}
                    >
                        {status === 'Ready' ? <><Download className="w-5 h-5" /> Download {selectedBank} File</> : 'Processing...'}
                    </button>
                </div>
            </div>
        </div>
    );
}
