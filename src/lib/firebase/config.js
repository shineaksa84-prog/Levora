import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBa6nTAodSkbu2_QuGXCGRfN4W3rIrb2zY",
    authDomain: "hrims-ai-platform.firebaseapp.com",
    projectId: "hrims-ai-platform",
    storageBucket: "hrims-ai-platform.firebasestorage.app",
    messagingSenderId: "257596027790",
    appId: "1:257596027790:web:658efe5a268ba862622adf",
    measurementId: "G-F01VBXBSR4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics only if supported (to prevent blocking in dev mode)
let analytics = null;
isSupported().then(yes => {
    if (yes) {
        analytics = getAnalytics(app);
    }
}).catch(err => {
    console.warn('Analytics not supported:', err);
});

export { analytics };

export default app;
