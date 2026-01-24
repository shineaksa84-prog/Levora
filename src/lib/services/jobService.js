import { db } from '../firebase/config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'jobs';
const DEV_MODE = APP_CONFIG.DEV_MODE;

const MOCK_JOBS = [
    { id: 'j1', title: 'Senior React Developer', department: 'Engineering', location: 'New York, NY', type: 'Full-time', applicants: 45, status: 'Active', posted: '2 days ago', matchQuality: 98 },
    { id: 'j2', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', applicants: 28, status: 'Active', posted: '5 days ago', matchQuality: 85 },
    { id: 'j3', title: 'UX Designer', department: 'Design', location: 'San Francisco, CA', type: 'Contract', applicants: 12, status: 'Draft', posted: '1 week ago', matchQuality: 92 },
];

export const getJobs = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_JOBS);
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const createJob = async (jobData) => {
    if (DEV_MODE) {
        const newJob = { id: crypto.randomUUID(), ...jobData, createdAt: new Date(), updatedAt: new Date() };
        MOCK_JOBS.unshift(newJob);
        return Promise.resolve(newJob);
    }
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...jobData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            applicants: 0 // Default
        });
        return { id: docRef.id, ...jobData };
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

export const seedJobs = async () => {
    if (DEV_MODE) return MOCK_JOBS;
    const promises = MOCK_JOBS.map(j => {
        const { id, ...data } = j;
        return createJob(data);
    });
    await Promise.all(promises);
    return MOCK_JOBS;
};
