import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    query,
    where,
    writeBatch,
    serverTimestamp
} from 'firebase/firestore';

const ROSTERS_COLLECTION = 'attendance_rosters';

export const SHIFTS = [
    { id: 'GS', name: 'General Shift', time: '09:00 - 18:00', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'MS', name: 'Morning Shift', time: '06:00 - 15:00', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'ES', name: 'Evening Shift', time: '14:00 - 23:00', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'NS', name: 'Night Shift', time: '22:00 - 07:00 (Next Day)', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { id: 'WO', name: 'Weekly Off', time: '-', color: 'bg-gray-100 text-gray-500 border-gray-200' },
];

export const getWeeklyRoster = async (startDate) => {
    try {
        // Query rosters starting on or covering this week.
        // For simplicity, we assume 'weekStartDate' matches exactly.
        const q = query(collection(db, ROSTERS_COLLECTION), where('weekStartDate', '==', startDate));
        const snapshot = await getDocs(q);

        let rosterData = {};

        if (snapshot.empty) {
            // Return empty object, let UI or controller handle seeding or empty state
            // But to match our pattern, let's seed a demo roster if absolutely nothing exists
            const allRosters = await getDocs(collection(db, ROSTERS_COLLECTION));
            if (allRosters.empty) {
                return await seedRoster(startDate);
            }
        }

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            rosterData[data.employeeId] = data.shifts;
        });

        return rosterData;
    } catch (error) {
        console.error('Error fetching roster:', error);
        throw error;
    }
};

export const saveRoster = async (weekStartDate, rosterMap) => {
    try {
        const batch = writeBatch(db);

        // This is a bit inefficient (N reads before writes) but safe
        // For each employee in the map, find their doc for this week and update/create
        for (const [employeeId, shifts] of Object.entries(rosterMap)) {
            const q = query(
                collection(db, ROSTERS_COLLECTION),
                where('weekStartDate', '==', weekStartDate),
                where('employeeId', '==', employeeId)
            );
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                const newDocRef = doc(collection(db, ROSTERS_COLLECTION));
                batch.set(newDocRef, {
                    employeeId,
                    weekStartDate,
                    shifts,
                    updatedAt: serverTimestamp()
                });
            } else {
                const docRef = snapshot.docs[0].ref;
                batch.update(docRef, {
                    shifts,
                    updatedAt: serverTimestamp()
                });
            }
        }

        await batch.commit();
        return true;
    } catch (error) {
        console.error('Error saving roster:', error);
        throw error;
    }
};

// Seed function
async function seedRoster(startDate) {
    // Initial demo roster
    // We need employee IDs. For this demo we'll use string IDs matchinig what we might expect or generic ones.
    // Ideally we fetch employees first, but for 'seed' we can just create some dummy data entries.
    const demoRoster = {
        '1': ['GS', 'GS', 'GS', 'GS', 'GS', 'WO', 'WO'],
        '2': ['MS', 'MS', 'MS', 'MS', 'MS', 'WO', 'WO'],
        '3': ['NS', 'NS', 'NS', 'NS', 'NS', 'WO', 'WO'],
        '4': ['GS', 'GS', 'GS', 'GS', 'GS', 'WO', 'WO'],
    };

    await saveRoster(startDate, demoRoster);
    return demoRoster;
}
