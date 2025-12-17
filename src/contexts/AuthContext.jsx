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

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Development mode - set to true to bypass authentication
const DEV_MODE = false;
const MOCK_USER = {
    uid: 'dev-user-123',
    email: 'demo@talentflow.ai',
    role: 'admin', // Can be: 'super_admin', 'admin', 'hr_manager', 'recruiter', 'employee'
    displayName: 'Demo User',
    department: 'Engineering'
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(DEV_MODE ? MOCK_USER : null);
    const [loading, setLoading] = useState(!DEV_MODE); // Start with loading=false in dev mode

    console.log('[AuthProvider] Rendering,  loading:', loading, 'user:', user);

    useEffect(() => {
        console.log('[AuthProvider] useEffect started, DEV_MODE:', DEV_MODE);
        // If in dev mode, skip firebase auth
        if (DEV_MODE) {
            console.log('[AuthProvider] DEV_MODE is true, already set mock user in useState');
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
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, role = ROLES.CANDIDATE, additionalData = {}) => {
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

    // Temporary helper for development to switch roles (simulated by updating local state, 
    // but in real app this would require admin rights to update Firestore)
    const switchRole = async (newRole) => {
        if (user && Object.values(ROLES).includes(newRole)) {
            // In a real app, you'd update Firestore here:
            // await updateDoc(doc(db, 'users', user.uid), { role: newRole });

            // For now, just update local state to reflect the change immediately in UI
            setUser(prev => ({
                ...prev,
                role: newRole
            }));
        }
    };

    const value = {
        user,
        login,
        signup,
        logout,
        switchRole, // Kept for demo purposes
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
