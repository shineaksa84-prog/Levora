/**
 * Notification Service
 * Handles creating and retrieving notifications for users using Firebase Firestore.
 */

import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    orderBy,
    serverTimestamp,
    limit,
    onSnapshot
} from 'firebase/firestore';

const NOTIFICATIONS_COLLECTION = 'user_notifications';

/**
 * Add a notification for a user
 * @param {string} userId - The ID of the user to notify
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, warning, error)
 */
export const addNotification = async (userId, title, message, type = 'info') => {
    try {
        const newNotification = {
            userId,
            title,
            message,
            type,
            isRead: false,
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), newNotification);

        const returnData = { id: docRef.id, ...newNotification };

        // Dispatch event for real-time updates if needed (local tab only)
        window.dispatchEvent(new CustomEvent('notification_added', { detail: returnData }));

        return returnData;
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

/**
 * Get notifications for a specific user
 * @param {string} userId 
 */
export const getUserNotifications = async (userId) => {
    try {
        const q = query(
            collection(db, NOTIFICATIONS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to ISO string for compatibility
            createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error getting notifications:', error);
        return [];
    }
};

/**
 * Mark a notification as read
 * @param {string} notificationId 
 */
export const markNotificationAsRead = async (notificationId) => {
    try {
        const notificationRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
        await updateDoc(notificationRef, { isRead: true });
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

/**
 * Get unread count for a user
 * @param {string} userId 
 */
export const getUnreadCount = async (userId) => {
    try {
        const q = query(
            collection(db, NOTIFICATIONS_COLLECTION),
            where('userId', '==', userId),
            where('isRead', '==', false)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error('Error getting unread count:', error);
        return 0;
    }
};

/**
 * Listen for new notifications (Real-time)
 * @param {string} userId 
 * @param {Function} callback 
 */
export const subscribeToNotifications = (userId, callback) => {
    const q = query(
        collection(db, NOTIFICATIONS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(20)
    );

    return onSnapshot(q, (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
        }));
        callback(notifications);
    });
};
