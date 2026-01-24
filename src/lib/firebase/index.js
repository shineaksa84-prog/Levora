import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import app, { db, auth } from './config';

// Initialize additional services using the already initialized app
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Re-export services from config
export { db, auth };

export default app;
