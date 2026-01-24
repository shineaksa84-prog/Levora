import { APP_CONFIG } from '../../config/appConfig';

const TRAVEL_COLLECTION = 'travel_requests';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local data
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const MOCK_TRIPS = [
    { id: 1, destination: 'Bangalore, IN', reason: 'Client Meeting', dates: '24 Jan - 26 Jan', status: 'Approved', cost: '₹12,000', startDate: '2026-01-24', endDate: '2026-01-26' },
    { id: 2, destination: 'Mumbai, IN', reason: 'Conference', dates: '10 Feb - 12 Feb', status: 'Pending', cost: '₹15,000 (Est)', startDate: '2026-02-10', endDate: '2026-02-12' },
];

export const getTravelRequests = async () => {
    if (DEV_MODE) {
        let trips = getLocalData(TRAVEL_COLLECTION);
        if (!trips) {
            trips = MOCK_TRIPS;
            setLocalData(TRAVEL_COLLECTION, trips);
        }
        return Promise.resolve(trips);
    }
    // Firebase implementation would go here
    return [];
};

export const createTravelRequest = async (requestData) => {
    const newRequest = {
        id: 'TRP-' + Math.floor(Math.random() * 1000 + 1000),
        ...requestData,
        status: 'Pending',
        submittedAt: new Date().toISOString()
    };

    if (DEV_MODE) {
        const trips = getLocalData(TRAVEL_COLLECTION) || [];
        const updatedTrips = [newRequest, ...trips];
        setLocalData(TRAVEL_COLLECTION, updatedTrips);
        return Promise.resolve(newRequest);
    }

    // Firebase implementation would go here
    return newRequest;
};
