import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase/config';
import { ROLES } from '../config/roles';

import { APP_CONFIG } from '../config/appConfig';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Development mode - controlled by appConfig
const DEV_MODE = APP_CONFIG.DEV_MODE;
const MOCK_USER = {
    uid: 'dev-user-123',
    email: 'demo@talentflow.ai',
    role: 'admin', // Can be: 'super_admin', 'admin', 'hr_manager', 'recruiter', 'employee'
    tenantId: 'tenant-123',
    name: 'Demo User',
    displayName: 'Demo User',
    title: 'Senior HR Administrator',
    department: 'Engineering',
    avatar: 'DU'
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(DEV_MODE ? MOCK_USER : null);
    const [loading, setLoading] = useState(!DEV_MODE); // Start with loading=true only for real auth

    console.log('[AuthProvider] Rendering,  loading:', loading, 'user:', user);

    useEffect(() => {
        console.log('[AuthProvider] useEffect started, DEV_MODE:', DEV_MODE);
        // If in dev mode, skip firebase auth
        if (DEV_MODE) {
            console.log('[AuthProvider] DEV_MODE is true, setting mock user');
            setUser(MOCK_USER);
            setLoading(false);
            return () => { }; // No cleanup needed
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in, fetch role from Firestore
                try {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            isSuperAdmin: firebaseUser.email === 'shineaksa84@gmail.com',
                            ...userData
                        });
                    } else {
                        // Fallback if user document doesn't exist (shouldn't happen in normal flow)
                        console.warn('User document not found in Firestore');
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: ROLES.EMPLOYEE // Default role
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    // Handle error appropriately
                }
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, password) => {
        if (DEV_MODE) {
            // Simulate switching user based on email input
            let simulatedRole = ROLES.ADMIN;
            let displayName = 'Admin User';

            if (email.includes('recruiter')) { simulatedRole = ROLES.RECRUITER; displayName = 'Recruiter User'; }
            if (email.includes('employee')) { simulatedRole = ROLES.EMPLOYEE; displayName = 'Employee User'; }
            if (email.includes('manager')) { simulatedRole = ROLES.HIRING_MANAGER; displayName = 'Hiring Manager'; }
            if (email.includes('ops')) { simulatedRole = ROLES.HR_OPS; displayName = 'HR Ops User'; }
            if (email.includes('payroll')) { simulatedRole = ROLES.PAYROLL; displayName = 'Payroll User'; }
            if (email.includes('agency')) { simulatedRole = ROLES.VENDOR; displayName = 'Agency Partner'; }
            if (email.includes('it')) { simulatedRole = ROLES.IT_ADMIN; displayName = 'IT Admin'; }

            // Update main user state
            setUser({
                ...MOCK_USER,
                email,
                role: simulatedRole,
                isSuperAdmin: email === 'shineaksa84@gmail.com',
                displayName
            });
            return Promise.resolve();
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, role = ROLES.CANDIDATE, additionalData = {}) => {
        if (DEV_MODE) {
            console.log('[AuthContext] Mock Signup:', { email, role, additionalData });
            const mockNewUser = {
                ...MOCK_USER,
                email,
                role,
                ...additionalData,
                uid: 'dev-new-user-' + Date.now()
            };
            setUser(mockNewUser);
            return Promise.resolve(mockNewUser);
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: role,
            createdAt: new Date(),
            ...additionalData
        });

        return user;
    };

    const logout = () => {
        return signOut(auth);
    };

    const switchRole = async (newRole) => {
        if (DEV_MODE) {
            setUser(prev => ({ ...prev, role: newRole }));
            return Promise.resolve();
        }
        // Not implemented for real auth yet
        console.warn('Switch Role not implemented for production');
        return Promise.resolve();
    };

    // Update user data in Firestore and local state
    const updateUserData = async (newData) => {
        if (DEV_MODE) {
            setUser(prev => ({ ...prev, ...newData }));
            return Promise.resolve();
        }

        if (!user || !user.uid) return;

        try {
            await setDoc(doc(db, 'users', user.uid), {
                ...newData,
                updatedAt: new Date()
            }, { merge: true });

            setUser(prev => ({ ...prev, ...newData }));
        } catch (error) {
            console.error('[AuthContext] Error updating user data:', error);
            throw error;
        }
    };

    const value = {
        user,
        login,
        signup,
        logout,
        switchRole,
        updateUserData, // New function added
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
