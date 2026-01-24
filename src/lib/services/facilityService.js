import { APP_CONFIG } from '../../config/appConfig';

const ROOM_BOOKINGS_COLLECTION = 'room_bookings';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local data
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const getRoomBookings = async () => {
    if (DEV_MODE) {
        return Promise.resolve(getLocalData(ROOM_BOOKINGS_COLLECTION) || []);
    }
    return [];
};

export const bookRoom = async (bookingData) => {
    const newBooking = {
        id: 'BKG-' + Date.now(),
        ...bookingData,
        bookedAt: new Date().toISOString(),
        status: 'Confirmed'
    };

    if (DEV_MODE) {
        const bookings = getLocalData(ROOM_BOOKINGS_COLLECTION) || [];
        const updatedBookings = [...bookings, newBooking];
        setLocalData(ROOM_BOOKINGS_COLLECTION, updatedBookings);
        return Promise.resolve(newBooking);
    }

    return newBooking;
};
