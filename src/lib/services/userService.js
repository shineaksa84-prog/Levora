import { APP_CONFIG } from '../../config/appConfig';
// Mock database
let USERS = [
    { id: 1, name: 'Alice Admin', email: 'alice@company.com', role: 'SUPER_ADMIN', status: 'Active', last_login: 'Now' },
    { id: 2, name: 'Bob Recruiter', email: 'bob@company.com', role: 'RECRUITER', status: 'Active', last_login: '2 hrs ago' },
    { id: 3, name: 'Charlie Payroll', email: 'charlie@company.com', role: 'PAYROLL_ADMIN', status: 'Active', last_login: '1 day ago' },
    { id: 4, name: 'Dave Manager', email: 'dave@company.com', role: 'HIRING_MANAGER', status: 'Active', last_login: '5 hrs ago' },
    { id: 5, name: 'Eve Employee', email: 'eve@company.com', role: 'EMPLOYEE', status: 'Inactive', last_login: 'Never' },
];

const DEV_MODE = APP_CONFIG.DEV_MODE;

export const getUsers = async () => {
    // In dev mode, return mock data
    return Promise.resolve([...USERS]);
};

export const addUser = async (userData) => {
    const newUser = {
        id: Date.now(),
        ...userData,
        status: 'Active',
        last_login: 'Never'
    };
    USERS = [newUser, ...USERS];
    return Promise.resolve(newUser);
};

export const updateUserRole = async (userId, newRole) => {
    USERS = USERS.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
    );
    return Promise.resolve({ id: userId, role: newRole });
};

export const updateUserStatus = async (userId, newStatus) => {
    USERS = USERS.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
    );
    return Promise.resolve({ id: userId, status: newStatus });
};
