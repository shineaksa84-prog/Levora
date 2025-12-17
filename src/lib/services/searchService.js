/**
 * Unified Search Service
 * Provides global search across all entities in the HRIMS system
 */

/**
 * Search across all entities
 */
export const globalSearch = (query) => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Search Employees
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employeeResults = employees
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

    // Search Candidates
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const candidateResults = candidates
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

    // Search Jobs
    const jobs = [
        { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote', status: 'Open' },
        { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', status: 'Open' },
        { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco', status: 'Open' },
        { id: 4, title: 'Backend Engineer', department: 'Engineering', location: 'Remote', status: 'Open' },
        { id: 5, title: 'Data Scientist', department: 'Analytics', location: 'Austin', status: 'Open' }
    ];

    const jobResults = jobs
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

    return results;
};

/**
 * Search by entity type
 */
export const searchByType = (query, type) => {
    const allResults = globalSearch(query);
    return allResults.filter(result => result.type === type);
};

/**
 * Get search suggestions based on partial query
 */
export const getSearchSuggestions = (query) => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const results = globalSearch(query);

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
export const addToRecentSearches = (query) => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [query, ...recent.filter(q => q !== query)].slice(0, 10);
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
