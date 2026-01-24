import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'assets';
const DEV_MODE = APP_CONFIG.DEV_MODE;

// Helper for local persistence
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || null;
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const MOCK_ASSETS = [
    { id: 'AST-001', name: 'Ergo Chair V2', category: 'Furniture', assignedTo: 'Alice Freeman', location: 'Floor 3', status: 'In Use' },
    { id: 'AST-002', name: 'Standing Desk', category: 'Furniture', assignedTo: 'Bob Jones', location: 'Floor 3', status: 'In Use' },
    { id: 'VEH-001', name: 'Toyota Innova (KA-01-AB-1234)', category: 'Vehicle', assignedTo: 'Transport Team', location: 'Parking B1', status: 'Maintenance' },
    { id: 'SIM-099', name: 'Corporate SIM (+91 9900...)', category: 'Telecom', assignedTo: 'Sales Head', location: '-', status: 'In Use' },
];

export const getAssets = async () => {
    if (DEV_MODE) {
        let assets = getLocalData(COLLECTION_NAME);
        if (!assets) {
            assets = MOCK_ASSETS;
            setLocalData(COLLECTION_NAME, assets);
        }
        return Promise.resolve(assets);
    }

    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching assets:', error);
        return MOCK_ASSETS;
    }
};

export const addAsset = async (assetData) => {
    if (DEV_MODE) {
        const assets = getLocalData(COLLECTION_NAME) || [];
        const newAsset = { id: 'AST-' + Math.floor(Math.random() * 1000), ...assetData };
        const updatedAssets = [...assets, newAsset];
        setLocalData(COLLECTION_NAME, updatedAssets);
        return Promise.resolve(newAsset);
    }

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...assetData,
            createdAt: serverTimestamp()
        });
        return { id: docRef.id, ...assetData };
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    }
};
