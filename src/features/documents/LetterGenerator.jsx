import { useState } from 'react';
import { FileText, Download, Printer, Edit3, ArrowRight } from 'lucide-react';

const LETTER_TYPES = [
    { id: 'promotion', label: 'Promotion Letter', template: 'Dear {name},\n\nWe are pleased to inform you that you have been promoted to the position of {designation} effective {date}.\n\nYour new annual compensation will be {ctc}.\n\nCongratulations!' },
    { id: 'address', label: 'Address Proof', template: 'To Whom It May Concern,\n\nThis is to certify that {name} works at Acme Corp as a {designation}.\n\nTheir registered address is {address}.' },
    { id: 'warning', label: 'Warning Letter', template: 'Dear {name},\n\nThis letter serves as a formal warning regarding your recent conduct.\n\nPlease refer to the employee handbook.' },
];

export default function LetterGenerator() {
    const [selectedType, setSelectedType] = useState(LETTER_TYPES[0]);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        designation: 'Senior Manager',
        date: '2023-12-01',
        ctc: '₹24,00,000',
        address: '123, Tech Park, Bangalore'
    });
    const [preview, setPreview] = useState('');

    const generatePreview = () => {
        let text = selectedType.template;
        Object.keys(formData).forEach(key => {
            text = text.replace(`{${key}}`, formData[key]);
        });
        setPreview(text);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Letter Generator
                </h2>

                <div className="space-y-4 flex-1">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Letter Type</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background"
                            value={selectedType.id}
                            onChange={(e) => {
                                const type = LETTER_TYPES.find(t => t.id === e.target.value);
                                setSelectedType(type);
                                setPreview('');
                            }}
                        >
                            {LETTER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Employee Name</label>
                            <input
                                className="w-full p-2.5 rounded-lg border border-input bg-background"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Designation</label>
                            <input
                                className="w-full p-2.5 rounded-lg border border-input bg-background"
                                value={formData.designation}
                                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                            />
                        </div>
                        {selectedType.id === 'promotion' && (
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">New CTC</label>
                                <input
                                    className="w-full p-2.5 rounded-lg border border-input bg-background"
                                    value={formData.ctc}
                                    onChange={e => setFormData({ ...formData, ctc: e.target.value })}
                                />
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Effective Date</label>
                            <input
                                type="date"
                                className="w-full p-2.5 rounded-lg border border-input bg-background"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={generatePreview}
                        className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                        <Edit3 className="w-4 h-4" /> Generate Preview
                    </button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col items-center justify-center bg-gray-50">
                {preview ? (
                    <div className="w-full max-w-md bg-white shadow-lg p-8 border border-gray-100 min-h-[400px] flex flex-col">
                        <div className="mb-8 border-b pb-4 flex justify-between items-center">
                            <div className="font-bold text-xl tracking-tight text-gray-800">Acme Corp</div>
                            <div className="text-xs text-gray-500">HR Department</div>
                        </div>
                        <div className="flex-1 whitespace-pre-wrap font-serif text-gray-800 leading-relaxed text-sm">
                            {preview}
                        </div>
                        <div className="mt-8 pt-4 border-t flex justify-between items-end">
                            <div className="text-center">
                                <div className="h-10 w-24 mb-1 border-b border-gray-300"></div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Authorized Signatory</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Fill details to preview letter</p>
                    </div>
                )}

                {preview && (
                    <div className="mt-6 flex gap-4">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-900 transition-colors">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
