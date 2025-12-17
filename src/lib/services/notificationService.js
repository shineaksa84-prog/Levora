/**
 * Notification Service
 * Handles creating and retrieving notifications for users.
 */

import { generateId } from '../utils/helpers';

const NOTIFICATIONS_KEY = 'user_notifications';

/**
 * Add a notification for a user
 * @param {string} userId - The ID of the user to notify
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, warning, error)
 */
export const addNotification = (userId, title, message, type = 'info') => {
    try {
        const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');

        const newNotification = {
            id: generateId(),
            userId,
            title,
            message,
            type,
            isRead: false,
            createdAt: new Date().toISOString()
        };

        notifications.unshift(newNotification);
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));

        // Dispatch event for real-time updates if needed
        window.dispatchEvent(new CustomEvent('notification_added', { detail: newNotification }));

        return newNotification;
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

/**
 * Get notifications for a specific user
 * @param {string} userId 
 */
export const getUserNotifications = (userId) => {
    try {
        const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
        return notifications.filter(n => n.userId === userId);
    } catch (error) {
        console.error('Error getting notifications:', error);
        return [];
    }
};

/**
 * Mark a notification as read
 * @param {string} notificationId 
 */
export const markNotificationAsRead = (notificationId) => {
    try {
        const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
        const updatedNotifications = notifications.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
        );
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

/**
 * Get unread count for a user
 * @param {string} userId 
 */
export const getUnreadCount = (userId) => {
    try {
        const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
        return notifications.filter(n => n.userId === userId && !n.isRead).length;
    } catch (error) {
        return 0;
    }
};
