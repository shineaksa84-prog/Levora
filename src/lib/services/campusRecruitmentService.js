/**
 * Campus Recruitment Service
 * Manages university partnerships, campus events, and student recruitment
 */

const MOCK_UNIVERSITIES = [
    {
        id: 'uni1',
        name: 'Stanford University',
        location: 'Stanford, CA',
        tier: 'Tier 1',
        partnershipStatus: 'Active',
        partnerSince: '2020-01-15',
        primaryContact: {
            name: 'Dr. Sarah Johnson',
            email: 'sjohnson@stanford.edu',
            phone: '+1-650-555-0123'
        },
        programs: ['Computer Science', 'Data Science', 'Product Management'],
        stats: {
            totalApplications: 145,
            interviewed: 42,
            hired: 12,
            interns: 8,
            conversionRate: 29
        }
    },
    {
        id: 'uni2',
        name: 'MIT',
        location: 'Cambridge, MA',
        tier: 'Tier 1',
        partnershipStatus: 'Active',
        partnerSince: '2019-08-20',
        primaryContact: {
            name: 'Prof. Michael Chen',
            email: 'mchen@mit.edu',
            phone: '+1-617-555-0456'
        },
        programs: ['Engineering', 'AI/ML', 'Robotics'],
        stats: {
            totalApplications: 128,
            interviewed: 38,
            hired: 10,
            interns: 6,
            conversionRate: 26
        }
    },
    {
        id: 'uni3',
        name: 'UC Berkeley',
        location: 'Berkeley, CA',
        tier: 'Tier 1',
        partnershipStatus: 'Active',
        partnerSince: '2021-03-10',
        primaryContact: {
            name: 'Dr. Emily Rodriguez',
            email: 'erodriguez@berkeley.edu',
            phone: '+1-510-555-0789'
        },
        programs: ['Computer Science', 'Business Analytics', 'Design'],
        stats: {
            totalApplications: 167,
            interviewed: 51,
            hired: 15,
            interns: 10,
            conversionRate: 29
        }
    }
];

const MOCK_EVENTS = [
    {
        id: 'evt1',
        universityId: 'uni1',
        universityName: 'Stanford University',
        type: 'Career Fair',
        name: 'Stanford Tech Career Fair 2025',
        date: '2025-02-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Tresidder Union',
        status: 'Upcoming',
        attendees: 0,
        expectedStudents: 500,
        recruiters: ['Sarah Chen', 'Mike Ross'],
        budget: 5000,
        registrationLink: 'https://stanford.edu/career-fair',
        notes: 'Booth #12. Bring swag and company brochures.'
    },
    {
        id: 'evt2',
        universityId: 'uni2',
        universityName: 'MIT',
        type: 'Info Session',
        name: 'Tech Talk: Building Scalable Systems',
        date: '2025-01-25',
        time: '6:00 PM - 8:00 PM',
        location: 'Stata Center, Room 32-123',
        status: 'Upcoming',
        attendees: 45,
        expectedStudents: 60,
        recruiters: ['Jane Smith'],
        budget: 1500,
        registrationLink: 'https://mit.edu/tech-talk',
        notes: 'Pizza and networking session after talk.'
    },
    {
        id: 'evt3',
        universityId: 'uni3',
        universityName: 'UC Berkeley',
        type: 'Hackathon',
        name: 'Cal Hacks Sponsorship',
        date: '2025-03-20',
        time: '9:00 AM - 9:00 PM',
        location: 'MLK Student Union',
        status: 'Confirmed',
        attendees: 0,
        expectedStudents: 300,
        recruiters: ['Alex Johnson', 'Sarah Chen'],
        budget: 10000,
        registrationLink: 'https://calhacks.io',
        notes: 'Gold sponsor. Judging panel + recruiting booth.'
    },
    {
        id: 'evt4',
        universityId: 'uni1',
        universityName: 'Stanford University',
        type: 'Coffee Chat',
        name: 'Engineering Coffee Chats',
        date: '2024-12-10',
        time: '3:00 PM - 5:00 PM',
        location: 'CoHo Cafe',
        status: 'Completed',
        attendees: 12,
        expectedStudents: 15,
        recruiters: ['Mike Ross'],
        budget: 500,
        registrationLink: null,
        notes: 'Great turnout. 3 strong candidates identified.'
    }
];

const MOCK_STUDENT_PIPELINE = [
    {
        id: 'sp1',
        name: 'Alex Thompson',
        university: 'Stanford University',
        major: 'Computer Science',
        graduationYear: 2025,
        gpa: 3.8,
        stage: 'Interview',
        type: 'Full-Time',
        appliedDate: '2024-12-01',
        source: 'Career Fair',
        resumeUrl: '/resumes/alex-thompson.pdf',
        skills: ['React', 'Python', 'AWS'],
        campusAmbassador: false
    },
    {
        id: 'sp2',
        name: 'Priya Patel',
        university: 'MIT',
        major: 'Data Science',
        graduationYear: 2026,
        gpa: 3.9,
        stage: 'Offer',
        type: 'Internship',
        appliedDate: '2024-11-28',
        source: 'Info Session',
        resumeUrl: '/resumes/priya-patel.pdf',
        skills: ['Python', 'Machine Learning', 'SQL'],
        campusAmbassador: true
    },
    {
        id: 'sp3',
        name: 'James Wilson',
        university: 'UC Berkeley',
        major: 'Product Management',
        graduationYear: 2025,
        gpa: 3.7,
        stage: 'Applied',
        type: 'Full-Time',
        appliedDate: '2024-12-05',
        source: 'Hackathon',
        resumeUrl: '/resumes/james-wilson.pdf',
        skills: ['Product Strategy', 'Analytics', 'Figma'],
        campusAmbassador: false
    }
];

const MOCK_AMBASSADORS = [
    {
        id: 'amb1',
        name: 'Priya Patel',
        university: 'MIT',
        major: 'Data Science',
        joinedDate: '2024-09-01',
        referrals: 8,
        eventsAttended: 3,
        points: 850,
        rank: 1,
        status: 'Active'
    },
    {
        id: 'amb2',
        name: 'David Kim',
        university: 'Stanford University',
        major: 'Computer Science',
        joinedDate: '2024-08-15',
        referrals: 6,
        eventsAttended: 4,
        points: 720,
        rank: 2,
        status: 'Active'
    }
];

/**
 * Get all university partnerships
 */
export const getUniversities = async () => {
    return Promise.resolve(MOCK_UNIVERSITIES);
};

/**
 * Get university by ID
 */
export const getUniversityById = async (id) => {
    const university = MOCK_UNIVERSITIES.find(u => u.id === id);
    return Promise.resolve(university || null);
};

/**
 * Add new university partnership
 */
export const addUniversity = async (universityData) => {
    const newUniversity = {
        id: `uni${Date.now()}`,
        ...universityData,
        partnerSince: new Date().toISOString().split('T')[0],
        stats: {
            totalApplications: 0,
            interviewed: 0,
            hired: 0,
            interns: 0,
            conversionRate: 0
        }
    };

    MOCK_UNIVERSITIES.push(newUniversity);
    return Promise.resolve(newUniversity);
};

/**
 * Get all campus events
 */
export const getCampusEvents = async () => {
    return Promise.resolve(MOCK_EVENTS);
};

/**
 * Get upcoming events
 */
export const getUpcomingEvents = async () => {
    const today = new Date();
    return Promise.resolve(
        MOCK_EVENTS.filter(e => new Date(e.date) >= today && e.status !== 'Completed')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    );
};

/**
 * Create new campus event
 */
export const createEvent = async (eventData) => {
    const newEvent = {
        id: `evt${Date.now()}`,
        ...eventData,
        status: 'Upcoming',
        attendees: 0
    };

    MOCK_EVENTS.push(newEvent);
    return Promise.resolve(newEvent);
};

/**
 * Update event status
 */
export const updateEventStatus = async (eventId, status, actualAttendees = null) => {
    const event = MOCK_EVENTS.find(e => e.id === eventId);

    if (!event) {
        throw new Error('Event not found');
    }

    event.status = status;
    if (actualAttendees !== null) {
        event.attendees = actualAttendees;
    }

    return Promise.resolve(event);
};

/**
 * Get student pipeline
 */
export const getStudentPipeline = async () => {
    return Promise.resolve(MOCK_STUDENT_PIPELINE);
};

/**
 * Add student to pipeline
 */
export const addStudent = async (studentData) => {
    const newStudent = {
        id: `sp${Date.now()}`,
        ...studentData,
        appliedDate: new Date().toISOString().split('T')[0],
        stage: 'Applied'
    };

    MOCK_STUDENT_PIPELINE.push(newStudent);
    return Promise.resolve(newStudent);
};

/**
 * Get campus ambassadors
 */
export const getCampusAmbassadors = async () => {
    return Promise.resolve(MOCK_AMBASSADORS);
};

/**
 * Add campus ambassador
 */
export const addAmbassador = async (ambassadorData) => {
    const newAmbassador = {
        id: `amb${Date.now()}`,
        ...ambassadorData,
        joinedDate: new Date().toISOString().split('T')[0],
        referrals: 0,
        eventsAttended: 0,
        points: 0,
        rank: MOCK_AMBASSADORS.length + 1,
        status: 'Active'
    };

    MOCK_AMBASSADORS.push(newAmbassador);
    return Promise.resolve(newAmbassador);
};

/**
 * Get campus recruitment metrics
 */
export const getCampusMetrics = async () => {
    const universities = await getUniversities();
    const events = await getCampusEvents();
    const students = await getStudentPipeline();

    const totalApplications = universities.reduce((sum, u) => sum + u.stats.totalApplications, 0);
    const totalHired = universities.reduce((sum, u) => sum + u.stats.hired, 0);
    const totalInterns = universities.reduce((sum, u) => sum + u.stats.interns, 0);

    const internToFTE = students.filter(s => s.type === 'Full-Time' && s.source === 'Internship').length;
    const conversionRate = totalInterns > 0 ? Math.round((internToFTE / totalInterns) * 100) : 0;

    return {
        totalPartnerships: universities.length,
        activePartnerships: universities.filter(u => u.partnershipStatus === 'Active').length,
        totalEvents: events.length,
        upcomingEvents: events.filter(e => e.status === 'Upcoming').length,
        totalApplications,
        totalHired,
        totalInterns,
        internToFTEConversion: conversionRate,
        avgConversionRate: universities.length > 0
            ? Math.round(universities.reduce((sum, u) => sum + u.stats.conversionRate, 0) / universities.length)
            : 0
    };
};

/**
 * Get event ROI analytics
 */
export const getEventROI = async () => {
    const events = await getCampusEvents();
    const completedEvents = events.filter(e => e.status === 'Completed');

    const totalBudget = completedEvents.reduce((sum, e) => sum + e.budget, 0);
    const totalAttendees = completedEvents.reduce((sum, e) => sum + e.attendees, 0);
    const costPerAttendee = totalAttendees > 0 ? Math.round(totalBudget / totalAttendees) : 0;

    return {
        totalBudget,
        totalAttendees,
        costPerAttendee,
        eventsCompleted: completedEvents.length,
        avgAttendeesPerEvent: completedEvents.length > 0
            ? Math.round(totalAttendees / completedEvents.length)
            : 0
    };
};

export default {
    getUniversities,
    getUniversityById,
    addUniversity,
    getCampusEvents,
    getUpcomingEvents,
    createEvent,
    updateEventStatus,
    getStudentPipeline,
    addStudent,
    getCampusAmbassadors,
    addAmbassador,
    getCampusMetrics,
    getEventROI
};
