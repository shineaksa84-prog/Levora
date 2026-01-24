import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    where,
    serverTimestamp
} from 'firebase/firestore';
import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'support_tickets';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local persistence
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const MOCK_TICKETS = [
    { id: 'TKT-1001', subject: 'Laptop battery draining fast', category: 'IT Support', date: '2023-12-05', status: 'In Progress', priority: 'Medium' },
    { id: 'TKT-1002', subject: 'Payslip Discrepancy - Nov', category: 'Payroll', date: '2023-12-01', status: 'Resolved', priority: 'High' },
    { id: 'TKT-1003', subject: 'Need access to Jira', category: 'Access Request', date: '2023-12-06', status: 'Open', priority: 'Low' },
];

export const getTickets = async (employeeId) => {
    if (DEV_MODE) {
        let tickets = getLocalData(COLLECTION_NAME);
        if (!tickets) {
            tickets = MOCK_TICKETS;
            setLocalData(COLLECTION_NAME, tickets);
        }
        return Promise.resolve(tickets);
    }

    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('employeeId', '==', employeeId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return MOCK_TICKETS;
    }
};

export const createTicket = async (ticketData) => {
    if (DEV_MODE) {
        const tickets = getLocalData(COLLECTION_NAME) || [];
        const newTicket = {
            id: 'TKT-' + Math.floor(Math.random() * 1000 + 1000),
            ...ticketData,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        const updatedTickets = [...tickets, newTicket];
        setLocalData(COLLECTION_NAME, updatedTickets);
        return Promise.resolve(newTicket);
    }

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...ticketData,
            status: 'Open',
            createdAt: serverTimestamp()
        });
        return { id: docRef.id, ...ticketData };
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};
