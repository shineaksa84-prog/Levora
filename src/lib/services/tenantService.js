import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import BaseService from './baseService';
import { APP_CONFIG } from '../../config/appConfig';

const TENANTS_COLLECTION = 'tenants';
const DEV_MODE = APP_CONFIG.DEV_MODE;

export class TenantService extends BaseService {
    /**
     * Helper to generate a unique Company ID
     */
    static generateCid(name) {
        const prefix = name.substring(0, 2).toUpperCase();
        const rand = Math.floor(100000 + Math.random() * 900000);
        return `cid_${prefix}_${rand}`;
    }

    /**
     * Create a new company tenant (onboarding).
     */
    static async createTenant(tenantData) {
        this.checkSuperAuth();

        const cid = this.generateCid(tenantData.name);
        const finalTenantData = {
            ...tenantData,
            cid,
            status: 'Active',
            createdAt: serverTimestamp()
        };

        if (DEV_MODE) {
            console.log('[TenantService] Mock Onboarding:', finalTenantData);
            return { id: cid, ...finalTenantData };
        }

        try {
            const docRef = await addDoc(collection(db, TENANTS_COLLECTION), finalTenantData);
            return { id: docRef.id, ...finalTenantData };
        } catch (error) {
            console.error('[TenantService] Onboarding failed:', error);
            throw error;
        }
    }

    /**
     * Get all tenants (Super Admin only).
     */
    static async getTenants() {
        this.checkSuperAuth();

        if (DEV_MODE) {
            return [
                { id: 't1', name: 'Tech Solutions Inc', domain: 'techsolutions.com', plan: 'Enterprise', users: 145, status: 'Active', joined: 'Oct 2024' },
                { id: 't2', name: 'Global Logistics', domain: 'globallogistics.io', plan: 'Pro', users: 42, status: 'Active', joined: 'Nov 2024' },
            ];
        }

        const snapshot = await getDocs(collection(db, TENANTS_COLLECTION));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}

export default TenantService;
