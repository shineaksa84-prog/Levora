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

import { APP_CONFIG } from '../../config/appConfig';

const COLLECTION_NAME = 'employees';
const DEV_MODE = APP_CONFIG.DEV_MODE;

const MOCK_EMPLOYEES = [
    { id: 'e1', name: 'John Doe', role: 'HR Manager', department: 'Human Resources', location: 'New York, NY', status: 'Active', avatar: 'JD', email: 'john.doe@company.com' },
    { id: 'e2', name: 'Jane Smith', role: 'Senior Engineer', department: 'Engineering', location: 'Remote', status: 'Active', avatar: 'JS', email: 'jane.smith@company.com' },
    { id: 'e3', name: 'Mike Johnson', role: 'Product Designer', department: 'Design', location: 'San Francisco, CA', status: 'On Leave', avatar: 'MJ', email: 'mike.j@company.com' },
    { id: 'e4', name: 'Sarah Wilson', role: 'Marketing Lead', department: 'Marketing', location: 'London, UK', status: 'Active', avatar: 'SW', email: 'sarah.w@company.com' },
    { id: 'e5', name: 'Robert Chen', role: 'Data Scientist', department: 'Engineering', location: 'Remote', status: 'Active', avatar: 'RC', email: 'robert.chen@company.com' },
];

export const getEmployees = async () => {
    if (DEV_MODE) return Promise.resolve(MOCK_EMPLOYEES);
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
    if (DEV_MODE) {
        const newEmployee = { id: crypto.randomUUID(), ...employeeData, createdAt: new Date(), joinedAt: new Date() };
        MOCK_EMPLOYEES.unshift(newEmployee);
        return Promise.resolve(newEmployee);
    }
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
    if (DEV_MODE) {
        // Ensure mock employees have unique IDs if they don't already
        const seededMocks = MOCK_EMPLOYEES.map(e => ({
            ...e,
            id: e.id || crypto.randomUUID() // Assign a unique ID if not present
        }));
        // Clear and re-populate MOCK_EMPLOYEES to ensure fresh unique IDs on re-seed
        MOCK_EMPLOYEES.splice(0, MOCK_EMPLOYEES.length, ...seededMocks);
        return Promise.resolve(MOCK_EMPLOYEES);
    }
    const promises = MOCK_EMPLOYEES.map(e => {
        const { id, ...data } = e; // Exclude the mock 'id' when adding to Firestore
        return addEmployee(data);
    });
    await Promise.all(promises);
    return MOCK_EMPLOYEES;
};

export const updateEmployeeStatus = async (id, status) => {
    if (DEV_MODE) {
        const employee = MOCK_EMPLOYEES.find(e => e.id === id);
        if (employee) {
            employee.status = status;
            return Promise.resolve(employee);
        }
        return Promise.reject(new Error('Employee not found'));
    }
    // Firestore implementation would go here
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { status });
        return { id, status };
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};
