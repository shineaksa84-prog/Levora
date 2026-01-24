import { auth, db } from '../firebase/config';
import BaseService from './baseService';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'candidates';
const DEV_MODE = APP_CONFIG.DEV_MODE;

const MOCK_CANDIDATES = [
    { id: 'c1', name: 'Alice Freeman', role: 'Senior React Developer', stage: 'Interview', location: 'New York, NY', rating: 4.8, avatar: 'AF', email: 'alice@example.com', updatedAt: new Date() },
    { id: 'c2', name: 'Bob Smith', role: 'Product Manager', stage: 'Screening', location: 'Remote', rating: 4.2, avatar: 'BS', email: 'bob@example.com', updatedAt: new Date() },
    { id: 'c3', name: 'Charlie Brown', role: 'UX Designer', stage: 'Offer', location: 'San Francisco, CA', rating: 4.9, avatar: 'CB', email: 'charlie@example.com', updatedAt: new Date() },
    { id: 'c4', name: 'Diana Prince', role: 'Backend Engineer', stage: 'Sourcing', location: 'London, UK', rating: 4.5, avatar: 'DP', email: 'diana@example.com', updatedAt: new Date() },
    { id: 'c5', name: 'Evan Wright', role: 'Data Scientist', stage: 'Applied', location: 'Austin, TX', rating: 3.8, avatar: 'EW', email: 'evan@example.com', updatedAt: new Date() },
];

export const getCandidates = async () => {
    BaseService.checkAuth();
    if (DEV_MODE) {
        return Promise.resolve(MOCK_CANDIDATES);
    }
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('updatedAt', 'desc'));
        const snapshot = await getDocs(q);

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
    if (DEV_MODE) {
        const newCandidate = { id: crypto.randomUUID(), ...candidateData, createdAt: new Date(), updatedAt: new Date() };
        MOCK_CANDIDATES.unshift(newCandidate);
        return Promise.resolve(newCandidate);
    }
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
    if (DEV_MODE) {
        const index = MOCK_CANDIDATES.findIndex(c => c.id === id);
        if (index !== -1) {
            MOCK_CANDIDATES[index] = { ...MOCK_CANDIDATES[index], ...updates, updatedAt: new Date() };
            return Promise.resolve(MOCK_CANDIDATES[index]);
        }
    }
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
    if (DEV_MODE) return MOCK_CANDIDATES;

    const promises = MOCK_CANDIDATES.map(c => {
        const { id, ...data } = c;
        return addCandidate(data);
    });
    await Promise.all(promises);
    return MOCK_CANDIDATES;
};

import { geminiService } from '../ai/gemini';

export const getCandidateChatResponse = async (query, candidateId) => {
    if (DEV_MODE) {
        const CHAT_RESPONSES = {
            'application status': 'Your application for Senior React Developer is currently under review. Our recruitment team will contact you within 3-5 business days.',
            'interview': 'We conduct interviews in 3 stages: Phone Screen (30 min), Technical Round (90 min), and Culture Fit (45 min). You\'ll receive detailed information via email.',
            'benefits': 'We offer comprehensive benefits including health insurance, 401(k) matching, unlimited PTO, remote work options, and professional development budget.',
            'salary': 'Salary ranges are competitive and based on experience. Specific compensation will be discussed during the offer stage.',
            'timeline': 'Our typical hiring process takes 2-3 weeks from application to offer. We\'ll keep you updated at every stage.',
            'default': 'I\'m here to help! You can ask about application status, interview process, benefits, salary, or hiring timeline. For specific questions, please email careers@company.com.'
        };
        const lowerInput = query.toLowerCase();
        let response = CHAT_RESPONSES.default;
        for (const [key, value] of Object.entries(CHAT_RESPONSES)) {
            if (lowerInput.includes(key)) {
                response = value;
                break;
            }
        }
        return Promise.resolve(response);
    }

    try {
        // Fetch candidate context from Firestore if candidateId is provided
        let context = "";
        if (candidateId) {
            const docRef = doc(db, COLLECTION_NAME, candidateId);
            const snapshot = await getDocs(query(collection(db, COLLECTION_NAME), where('__name__', '==', candidateId)));
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                context = `Candidate Context: Name: ${data.name}, Applied for: ${data.role}, Current Stage: ${data.stage}.`;
            }
        }

        const prompt = `${context} Candidate is asking: "${query}". Provide a helpful, professional response based on their application status and general recruitment protocols.`;
        const aiResponse = await geminiService.chat(prompt);
        return aiResponse.content;
    } catch (error) {
        console.error('Chatbot error:', error);
        return "I'm having trouble accessing the recruitment database. Please contact careers@company.com for assistance.";
    }
};
