import { useState } from 'react';
import { Mail, Plus, Edit2, Trash, Save, LayoutTemplate } from 'lucide-react';

const INITIAL_TEMPLATES = [
    { id: 1, name: 'Initial Outreach', subject: 'Opportunity at Generic Corp', content: 'Hi {name},\n\nI came across your profile and was impressed by your experience with {skills}...' },
    { id: 2, name: 'Interview Invite', subject: 'Interview Request', content: 'Hi {name},\n\nWe would love to invite you for a technical round for the {role} position.' },
    { id: 3, name: 'Rejection (Polite)', subject: 'Update on your application', content: 'Hi {name},\n\nThank you for your interest. Unfortunately, we have decided to proceed with other candidates.' }
];

export default function TemplateManager() {
    const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form state handling would go here for a real implementation
    const [editForm, setEditForm] = useState({ name: '', subject: '', content: '' });

    const handleSelect = (template) => {
        setSelectedTemplate(template);
        setEditForm(template);
        setIsEditing(false);
    };

    const handleNew = () => {
        const newTemplate = { id: Date.now(), name: 'New Template', subject: '', content: '' };
        setEditForm(newTemplate);
        setSelectedTemplate(newTemplate);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (templates.find(t => t.id === editForm.id)) {
            setTemplates(templates.map(t => t.id === editForm.id ? editForm : t));
        } else {
            setTemplates([...templates, editForm]);
        }
        setIsEditing(false);
    };

    const insertPlaceholder = (placeholder) => {
        setEditForm({ ...editForm, content: editForm.content + placeholder });
    };

    return (
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar list */}
            <div className="md:col-span-1 bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                    <h3 className="font-semibold flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-primary" />
                        Templates
                    </h3>
                    <button onClick={handleNew} className="p-1 hover:bg-muted rounded-md text-primary">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {templates.map(template => (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template)}
                            className={`w-full text-left p-3 rounded-md text-sm transition-colors ${selectedTemplate?.id === template.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                        >
                            {template.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor Area */}
            <div className="md:col-span-2 bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
                {selectedTemplate ? (
                    <>
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            {isEditing ? (
                                <input
                                    className="font-semibold text-lg bg-transparent border-none focus:outline-none w-full"
                                    value={editForm.name}
                                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Template Name"
                                />
                            ) : (
                                <h2 className="font-semibold text-lg">{selectedTemplate.name}</h2>
                            )}

                            <div className="flex gap-2">
                                {isEditing ? (
                                    <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm hover:bg-primary/90">
                                        <Save className="w-4 h-4" /> Save
                                    </button>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 border border-input px-3 py-1.5 rounded-md text-sm hover:bg-muted">
                                        <Edit2 className="w-4 h-4" /> Edit
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Subject Line</label>
                                <input
                                    className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none"
                                    value={isEditing ? editForm.subject : selectedTemplate.subject}
                                    onChange={e => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                                    disabled={!isEditing}
                                    placeholder="Email Subject"
                                />
                            </div>

                            <div className="flex-1 flex flex-col h-full min-h-[300px]">
                                <label className="text-sm font-medium mb-1.5 block text-muted-foreground flex justify-between">
                                    Email Content
                                    {isEditing && (
                                        <div className="flex gap-2 text-xs">
                                            <button onClick={() => insertPlaceholder('{name}')} className="hover:text-primary bg-muted px-2 py-0.5 rounded cursor-pointer">+ Name</button>
                                            <button onClick={() => insertPlaceholder('{role}')} className="hover:text-primary bg-muted px-2 py-0.5 rounded cursor-pointer">+ Role</button>
                                            <button onClick={() => insertPlaceholder('{company}')} className="hover:text-primary bg-muted px-2 py-0.5 rounded cursor-pointer">+ Company</button>
                                        </div>
                                    )}
                                </label>
                                <textarea
                                    className="flex-1 w-full p-4 rounded-md border border-input bg-background font-mono text-sm resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                                    value={isEditing ? editForm.content : selectedTemplate.content}
                                    onChange={e => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                                    disabled={!isEditing}
                                    placeholder="Write your email template here..."
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Mail className="w-12 h-12 mb-4" />
                        <p>Select a template to view or edit</p>
                    </div>
                )}
            </div>
        </div>
    );
}
