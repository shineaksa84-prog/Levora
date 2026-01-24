import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';
import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'documents';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local persistence
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const MOCK_DOCS = [
    { id: 1, name: 'Aadhaar Card.pdf', category: 'Identity', uploaded: '2023-01-15', status: 'Verified', expiry: null },
    { id: 2, name: 'Passport_Front.jpg', category: 'Identity', uploaded: '2022-06-20', status: 'Verified', expiry: '2024-02-01' },
    { id: 3, name: 'Degree_Certificate.pdf', category: 'Education', uploaded: '2023-01-20', status: 'Pending Verification', expiry: null },
];

export const getDocuments = async (employeeId) => {
    if (DEV_MODE) {
        let docs = getLocalData(COLLECTION_NAME);
        if (!docs) {
            docs = MOCK_DOCS;
            setLocalData(COLLECTION_NAME, docs);
        }
        return Promise.resolve(docs);
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
        console.error('Error fetching documents:', error);
        return MOCK_DOCS;
    }
};

export const uploadDocument = async (docData) => {
    if (DEV_MODE) {
        const docs = getLocalData(COLLECTION_NAME) || [];
        const newDoc = {
            id: Date.now(),
            ...docData,
            uploaded: new Date().toISOString().split('T')[0],
            status: 'Pending Verification'
        };
        const updatedDocs = [...docs, newDoc];
        setLocalData(COLLECTION_NAME, updatedDocs);
        return Promise.resolve(newDoc);
    }

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...docData,
            status: 'Pending Verification',
            uploaded: new Date().toISOString().split('T')[0],
            createdAt: serverTimestamp()
        });
        return { id: docRef.id, ...docData };
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error;
    }
};

export const deleteDocumentResource = async (documentId) => {
    if (DEV_MODE) {
        console.log('[DocumentService] Mock Delete:', documentId);
        return Promise.resolve(true);
    }

    try {
        await deleteDoc(doc(db, COLLECTION_NAME, documentId));
        return true;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};
