import { auth } from '../firebase/config';
import useStore from '../../store/useStore';

/**
 * Base Service class to enforce security, multi-tenancy, and standardized error handling.
 */
export class BaseService {
    /**
     * Ensures the user is authenticated and returns the user object.
     */
    static checkAuth() {
        const user = auth.currentUser;
        // In DEV_MODE, we might not have a firebase user, so we check the store
        const storeUser = useStore.getState().userProfile;

        if (!user && !storeUser) {
            throw new Error('UNAUTHENTICATED: Neural link established but authorization token missing.');
        }
        return user || storeUser;
    }

    /**
     * Ensures the user is the Super Admin (System Owner).
     */
    static checkSuperAuth() {
        const user = this.checkAuth();
        if (user.role !== 'admin' || user.email !== 'shineaksa84@gmail.com') {
            console.error('[BaseService] UNSANCTIONED ACCESS: Intrusion detected from', user.email);
            throw new Error('ROOT_ACCESS_DENIED: Your neural signature does not match the system owner.');
        }
        return user;
    }

    /**
     * Returns the current tenantId from the global store.
     */
    static getTenantId() {
        const profile = useStore.getState().userProfile;
        if (!profile?.tenantId) {
            console.warn('[BaseService] Warning: Critical system failure - tenantId not found in user workspace.');
            return 'default_tenant';
        }
        return profile.tenantId;
    }

    /**
     * Standardized wrapper for service calls that injects tenantId.
     */
    static async execute(operation, ...args) {
        this.checkAuth();
        try {
            return await operation(...args);
        } catch (error) {
            console.error(`[Service Error]: ${error.message}`, error);
            throw error;
        }
    }
}

export default BaseService;
