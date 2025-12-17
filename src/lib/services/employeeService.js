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

const COLLECTION_NAME = 'employees';

export const getEmployees = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const addEmployee = async (employeeData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...employeeData,
            createdAt: serverTimestamp(),
            joinedAt: serverTimestamp()
        });
        return { id: docRef.id, ...employeeData };
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

export const seedEmployees = async () => {
    const demoEmployees = [
        { name: 'John Doe', role: 'HR Manager', department: 'Human Resources', location: 'New York, NY', status: 'Active', avatar: 'JD', email: 'john.doe@company.com' },
        { name: 'Jane Smith', role: 'Senior Engineer', department: 'Engineering', location: 'Remote', status: 'Active', avatar: 'JS', email: 'jane.smith@company.com' },
        { name: 'Mike Johnson', role: 'Product Designer', department: 'Design', location: 'San Francisco, CA', status: 'On Leave', avatar: 'MJ', email: 'mike.j@company.com' },
        { name: 'Sarah Wilson', role: 'Marketing Lead', department: 'Marketing', location: 'London, UK', status: 'Active', avatar: 'SW', email: 'sarah.w@company.com' },
        { name: 'Robert Chen', role: 'Data Scientist', department: 'Engineering', location: 'Remote', status: 'Active', avatar: 'RC', email: 'robert.chen@company.com' },
    ];

    const promises = demoEmployees.map(e => addEmployee(e));
    await Promise.all(promises);
    return demoEmployees;
};
