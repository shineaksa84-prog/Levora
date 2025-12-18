/**
 * Unified Search Service
 * Provides global search across all entities in the HRIMS system using Firebase Firestore
 */

import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

/**
 * Search across all entities
 */
export const globalSearch = async (queryText) => {
    if (!queryText || queryText.trim().length < 2) {
        return [];
    }

    const searchTerm = queryText.toLowerCase().trim();
    const results = [];

    try {
        // 1. Search Employees
        const employeeSnapshot = await getDocs(collection(db, 'employees'));
        const employeeResults = employeeSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(emp =>
                emp.firstName?.toLowerCase().includes(searchTerm) ||
                emp.lastName?.toLowerCase().includes(searchTerm) ||
                emp.employeeId?.toLowerCase().includes(searchTerm) ||
                emp.email?.toLowerCase().includes(searchTerm) ||
                emp.department?.toLowerCase().includes(searchTerm) ||
                emp.position?.toLowerCase().includes(searchTerm)
            )
            .map(emp => ({
                id: emp.id,
                type: 'employee',
                title: `${emp.firstName} ${emp.lastName}`,
                subtitle: `${emp.position} • ${emp.department}`,
                metadata: emp.employeeId,
                url: `/employees/${emp.id}`,
                icon: 'User'
            }));

        results.push(...employeeResults);

        // 2. Search Candidates
        const candidateSnapshot = await getDocs(collection(db, 'candidates'));
        const candidateResults = candidateSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(candidate =>
                candidate.name?.toLowerCase().includes(searchTerm) ||
                candidate.email?.toLowerCase().includes(searchTerm) ||
                candidate.role?.toLowerCase().includes(searchTerm) ||
                candidate.stage?.toLowerCase().includes(searchTerm) ||
                candidate.location?.toLowerCase().includes(searchTerm)
            )
            .map(candidate => ({
                id: candidate.id,
                type: 'candidate',
                title: candidate.name,
                subtitle: `${candidate.role} • ${candidate.stage}`,
                metadata: candidate.location,
                url: `/candidates/${candidate.id}`,
                icon: 'UserPlus'
            }));

        results.push(...candidateResults);

        // 3. Search Jobs
        const jobSnapshot = await getDocs(collection(db, 'jobs'));
        const jobResults = jobSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(job =>
                job.title?.toLowerCase().includes(searchTerm) ||
                job.department?.toLowerCase().includes(searchTerm) ||
                job.location?.toLowerCase().includes(searchTerm)
            )
            .map(job => ({
                id: job.id,
                type: 'job',
                title: job.title,
                subtitle: `${job.department} • ${job.location}`,
                metadata: job.status,
                url: `/jobs/${job.id}`,
                icon: 'Briefcase'
            }));

        results.push(...jobResults);

    } catch (error) {
        console.error('Error during global search:', error);
    }

    return results;
};

/**
 * Search by entity type
 */
export const searchByType = async (queryText, type) => {
    const allResults = await globalSearch(queryText);
    return allResults.filter(result => result.type === type);
};

/**
 * Get search suggestions based on partial query
 */
export const getSearchSuggestions = async (queryText) => {
    if (!queryText || queryText.trim().length < 2) {
        return [];
    }

    const results = await globalSearch(queryText);

    // Group by type and limit to 3 per type
    const grouped = results.reduce((acc, result) => {
        if (!acc[result.type]) {
            acc[result.type] = [];
        }
        if (acc[result.type].length < 3) {
            acc[result.type].push(result);
        }
        return acc;
    }, {});

    return Object.values(grouped).flat();
};

/**
 * Track recent searches
 */
export const addToRecentSearches = (queryText) => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [queryText, ...recent.filter(q => q !== queryText)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
};

/**
 * Get recent searches
 */
export const getRecentSearches = () => {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
};
