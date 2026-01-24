// Simulating backend delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
let workflows = [
    {
        id: 'wf1',
        title: 'Engineering Onboarding',
        role: 'engineer',
        tasks: [
            { id: 't1', title: 'Setup Dev Environment', type: 'technical', dueDay: 1 },
            { id: 't2', title: 'Codebase Walkthrough', type: 'technical', dueDay: 2 },
            { id: 't3', title: 'Security Compliance', type: 'compliance', dueDay: 1 }
        ]
    },
    {
        id: 'wf2',
        title: 'Sales Onboarding',
        role: 'sales',
        tasks: [
            { id: 't4', title: 'CRM Access Setup', type: 'tooling', dueDay: 1 },
            { id: 't5', title: 'Product Demo Certification', type: 'training', dueDay: 5 }
        ]
    }
];

let documents = [
    { id: 'd1', name: 'Passport Copy.pdf', category: 'Identity', status: 'verified', uploadDate: '2024-01-20', size: '2.4 MB' },
    { id: 'd2', name: 'Tax Form 16.pdf', category: 'Finance', status: 'pending', uploadDate: '2024-01-22', size: '1.1 MB' },
    { id: 'd3', name: 'Degree Certificate.pdf', category: 'Academic', status: 'pending', uploadDate: '2024-01-22', size: '3.5 MB' }
];

let assets = [
    { id: 'a1', name: 'MacBook Pro M3', type: 'Hardware', serial: 'MBP-2024-001', status: 'assigned', assignedTo: 'emp1' },
    { id: 'a2', name: 'Dell UltraSharp Monitor', type: 'Hardware', serial: 'DEL-2024-055', status: 'available', assignedTo: null },
    { id: 'a3', name: 'Slack Enterprise', type: 'Software', serial: 'N/A', status: 'assigned', assignedTo: 'emp1' }
];

let buddies = [
    { id: 'b1', name: 'Alex Rivera', role: 'Staff Engineer', department: 'Engineering', available: true, expertise: ['React', 'Node.js'] },
    { id: 'b2', name: 'Sarah Chen', role: 'Product Manager', department: 'Product', available: true, expertise: ['Strategy', 'Agile'] },
    { id: 'b3', name: 'Mike Ross', role: 'Sales Lead', department: 'Sales', available: false, expertise: ['Negotiation'] }
];

let events = [
    { id: 'e1', title: 'HR Induction', start: new Date(Date.now() + 86400000).toISOString(), end: new Date(Date.now() + 93600000).toISOString(), type: 'mandatory' },
    { id: 'e2', title: 'Team Lunch', start: new Date(Date.now() + 172800000).toISOString(), end: new Date(Date.now() + 180000000).toISOString(), type: 'social' }
];

// Workflow Service
export const getWorkflows = async () => {
    await delay(600);
    return [...workflows];
};

export const saveWorkflow = async (workflow) => {
    await delay(800);
    if (workflow.id) {
        workflows = workflows.map(w => w.id === workflow.id ? workflow : w);
    } else {
        const newWorkflow = { ...workflow, id: `wf${Date.now()}` };
        workflows.push(newWorkflow);
        return newWorkflow;
    }
    return workflow;
};

// Document Service
export const getDocuments = async (employeeId) => {
    await delay(500);
    return [...documents];
};

export const updateDocumentStatus = async (docId, status) => {
    await delay(400);
    documents = documents.map(d => d.id === docId ? { ...d, status } : d);
    return documents.find(d => d.id === docId);
};

export const uploadDocument = async (file, category) => {
    await delay(1200);
    const newDoc = {
        id: `d${Date.now()}`,
        name: file.name,
        category,
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0],
        size: '1.2 MB' // Mock size
    };
    documents.push(newDoc);
    return newDoc;
};

// Asset Service
export const getAssets = async () => {
    await delay(500);
    return [...assets];
};

export const assignAsset = async (assetId, employeeId) => {
    await delay(600);
    assets = assets.map(a => a.id === assetId ? { ...a, status: 'assigned', assignedTo: employeeId } : a);
    return assets.find(a => a.id === assetId);
};

// Mentorship Service
export const getAvailableBuddies = async (department) => {
    await delay(500);
    if (!department) return [...buddies];
    return buddies.filter(b => b.department === department);
};

export const assignBuddy = async (buddyId, newHireId) => {
    await delay(700);
    // In a real app, this would create a relationship record
    return { success: true, message: 'Buddy assigned successfully' };
};

// Calendar Service
export const getOnboardingEvents = async () => {
    await delay(600);
    return [...events];
};

export const scheduleEvent = async (eventDetails) => {
    await delay(800);
    const newEvent = { ...eventDetails, id: `e${Date.now()}` };
    events.push(newEvent);
    return newEvent;
};
