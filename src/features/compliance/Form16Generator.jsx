import { useState } from 'react';
import { FileText, Download, CheckCircle, Printer } from 'lucide-react';

const EMPLOYEES = [
    { id: 1, name: 'Rahul Sharma', pan: 'ABCDE1234F', tds: 45000, status: 'Generated' },
    { id: 2, name: 'Priya Singh', pan: 'FGHIJ5678K', tds: 125000, status: 'Generated' },
    { id: 3, name: 'Amit Kumar', pan: 'LMNOP9012Q', tds: 0, status: 'Pending' },
];

export default function Form16Generator() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            Form 16 Issuance
                        </h2>
                        <p className="text-sm text-muted-foreground">FY 2022-23 (AY 2023-24)</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-3">
                        {EMPLOYEES.map(emp => (
                            <div key={emp.id} className="p-4 border rounded-xl hover:shadow-sm transition-all flex items-center justify-between group bg-white">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{emp.name}</h4>
                                    <p className="text-xs text-muted-foreground">PAN: {emp.pan}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase">TDS Deducted</p>
                                    <p className="font-bold text-gray-900">₹ {emp.tds.toLocaleString()}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {emp.status === 'Generated' ? (
                                        <>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Ready
                                            </span>
                                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download PDF">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <button className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700">
                                            Generate
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-6 shadow-xl w-64 h-80 rounded-sm border border-gray-100 mb-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                    <div className="space-y-2 mt-4 text-left">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                        <div className="h-32 w-full bg-gray-50 rounded mt-4 border border-dashed border-gray-200"></div>
                        <div className="flex justify-between mt-4">
                            <div className="h-8 w-1/3 bg-gray-100 rounded"></div>
                            <div className="h-8 w-1/3 bg-indigo-100 rounded text-indigo-800 text-[10px] flex items-center justify-center font-bold">Part A + B</div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-gray-900 shadow-xl px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                            <Printer className="w-4 h-4" /> Print Preview
                        </button>
                    </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-1">Digitally Signed Certificates</h3>
                <p className="text-xs text-muted-foreground w-64 leading-relaxed">
                    Form 16s are generated using the TDS data filed in TRACES. Part A contains tax credits, Part B details salary components.
                </p>
                <div className="mt-6 flex gap-3">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-black">
                        <Download className="w-4 h-4" /> Download All (ZIP)
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
                        Email to Employees
                    </button>
                </div>
            </div>
        </div>
    );
}
