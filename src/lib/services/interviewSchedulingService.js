/**
 * Interview Scheduling Service
 * Handles video interview scheduling with Zoom/Teams integration
 */

const MOCK_INTERVIEWS = [
    { id: 1, candidateName: 'Sarah Chen', role: 'Senior React Developer', date: '2024-12-15', time: '10:00 AM', platform: 'Zoom', link: 'https://zoom.us/j/123456789', interviewer: 'John Doe', status: 'Scheduled' },
    { id: 2, candidateName: 'Michael Torres', role: 'Product Manager', date: '2024-12-16', time: '2:00 PM', platform: 'Teams', link: 'https://teams.microsoft.com/l/meetup-join/...', interviewer: 'Jane Smith', status: 'Scheduled' },
    { id: 3, candidateName: 'Emily Watson', role: 'UX Designer', date: '2024-12-14', time: '11:30 AM', platform: 'Zoom', link: 'https://zoom.us/j/987654321', interviewer: 'Bob Wilson', status: 'Completed' },
];

export async function getScheduledInterviews() {
    return MOCK_INTERVIEWS;
}

export async function scheduleInterview(interviewData) {
    const newInterview = {
        id: Date.now(),
        ...interviewData,
        status: 'Scheduled',
        link: interviewData.platform === 'Zoom'
            ? `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`
            : `https://teams.microsoft.com/l/meetup-join/${Math.random().toString(36).substring(7)}`
    };

    console.log('Interview scheduled:', newInterview);
    return newInterview;
}

export async function cancelInterview(interviewId) {
    console.log('Interview cancelled:', interviewId);
    return { success: true };
}

export async function rescheduleInterview(interviewId, newDateTime) {
    console.log('Interview rescheduled:', interviewId, newDateTime);
    return { success: true };
}

export async function sendInterviewReminder(interviewId) {
    console.log('Reminder sent for interview:', interviewId);
    return { success: true };
}

export default {
    getScheduledInterviews,
    scheduleInterview,
    cancelInterview,
    rescheduleInterview,
    sendInterviewReminder
};
