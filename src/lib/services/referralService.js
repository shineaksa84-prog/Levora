/**
 * Referral Service
 * Handles employee referrals and tracking
 */

import { generateId } from '../utils/helpers';
import { addNotification } from './notificationService';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const REFERRALS_KEY = 'referrals';

/**
 * Submit a new referral
 * @param {string} referrerId - Employee ID of the referrer
 * @param {Object} candidateData - Basic candidate info
 * @param {string} jobId - ID of the job being referred for
 */
export const submitReferral = async (referrerId, candidateData, jobId) => {
    try {
        // Create candidate object compatible with existing candidate system
        const newCandidate = {
            id: generateId(),
            name: `${candidateData.firstName} ${candidateData.lastName}`,
            email: candidateData.email,
            phone: candidateData.phone,
            role: candidateData.role, // from job details
            stage: 'Applied',
            location: candidateData.location || 'Remote',
            rating: 0,
            avatar: getInitials(candidateData.firstName, candidateData.lastName),
            source: 'Referral',
            referrerId: referrerId,
            jobId: jobId,
            resumeUrl: candidateData.resume?.name || '', // Mock resume
            appliedDate: new Date().toISOString(),
            status: 'Active'
        };

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'candidates'), newCandidate);

        // Also update local object with Firestore ID if needed, but for now we keep the generated ID 
        // as the internal reference or just rely on the object we just created.

        // Notify the referrer
        addNotification(
            referrerId,
            'Referral Submitted',
            `You have successfully referred ${newCandidate.name} for the ${newCandidate.role} position.`,
            'success'
        );

        return newCandidate;
    } catch (error) {
        console.error('Error submitting referral:', error);
        throw error;
    }
};

/**
 * Get referrals made by a specific employee
 * @param {string} referrerId 
 */
export const getMyReferrals = async (referrerId) => {
    try {
        const q = query(collection(db, 'candidates'), where('referrerId', '==', referrerId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Error fetching referrals:', error);
        return [];
    }
};

/**
 * Get overall referral statistics
 */
export const getReferralStats = async () => {
    try {
        // Optimizing this would involve a specific query for 'Referral' source,
        // but for now fetching all referrals is fine for small datasets.
        const q = query(collection(db, 'candidates'), where('source', '==', 'Referral'));
        const querySnapshot = await getDocs(q);
        const referrals = querySnapshot.docs.map(doc => doc.data());

        return {
            total: referrals.length,
            hired: referrals.filter(c => c.stage === 'Hired' || c.status === 'Hired').length,
            inProgress: referrals.filter(c => ['Screening', 'Interview', 'Offer'].includes(c.stage)).length,
            pending: referrals.filter(c => c.stage === 'Applied').length
        };
    } catch (error) {
        return { total: 0, hired: 0, inProgress: 0, pending: 0 };
    }
};

const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};
