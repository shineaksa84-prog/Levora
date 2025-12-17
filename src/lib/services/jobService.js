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

const COLLECTION_NAME = 'jobs';

export const getJobs = async () => {
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
    const demoJobs = [
        { title: 'Senior React Developer', department: 'Engineering', location: 'New York, NY', type: 'Full-time', applicants: 45, status: 'Active', posted: '2 days ago' },
        { title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', applicants: 28, status: 'Active', posted: '5 days ago' },
        { title: 'UX Designer', department: 'Design', location: 'San Francisco, CA', type: 'Contract', applicants: 12, status: 'Draft', posted: '1 week ago' },
    ];

    const promises = demoJobs.map(j => createJob(j));
    await Promise.all(promises);
    return demoJobs;
};
