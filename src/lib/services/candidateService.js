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

const COLLECTION_NAME = 'candidates';

export const getCandidates = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('updatedAt', 'desc'));
        const snapshot = await getDocs(q);

        // If empty, return null so we can trigger seed
        if (snapshot.empty) return [];

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

export const addCandidate = async (candidateData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...candidateData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { id: docRef.id, ...candidateData };
    } catch (error) {
        console.error('Error adding candidate:', error);
        throw error;
    }
};

export const updateCandidate = async (id, updates) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        return { id, ...updates };
    } catch (error) {
        console.error('Error updating candidate:', error);
        throw error;
    }
};

// Function to seed initial data if empty
export const seedCandidates = async () => {
    const demoCandidates = [
        { name: 'Alice Freeman', role: 'Senior React Developer', stage: 'Interview', location: 'New York, NY', rating: 4.8, avatar: 'AF', email: 'alice@example.com' },
        { name: 'Bob Smith', role: 'Product Manager', stage: 'Screening', location: 'Remote', rating: 4.2, avatar: 'BS', email: 'bob@example.com' },
        { name: 'Charlie Brown', role: 'UX Designer', stage: 'Offer', location: 'San Francisco, CA', rating: 4.9, avatar: 'CB', email: 'charlie@example.com' },
        { name: 'Diana Prince', role: 'Backend Engineer', stage: 'Sourcing', location: 'London, UK', rating: 4.5, avatar: 'DP', email: 'diana@example.com' },
        { name: 'Evan Wright', role: 'Data Scientist', stage: 'Applied', location: 'Austin, TX', rating: 3.8, avatar: 'EW', email: 'evan@example.com' },
    ];

    const promises = demoCandidates.map(c => addCandidate(c));
    await Promise.all(promises);
    return demoCandidates;
};
