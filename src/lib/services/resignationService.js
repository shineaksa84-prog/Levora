/**
 * Resignation Service
 * Handles resignation workflow and auto-generates offboarding checklists
 */

import { generateId } from '../utils/helpers';

/**
 * Submit a resignation request
 * @param {Object} resignationData - Resignation details
 * @returns {Object} - Created resignation with offboarding checklist
 */
export const submitResignation = async (resignationData) => {
    try {
        const resignation = {
            id: generateId(),
            employeeId: resignationData.employeeId,
            employee: resignationData.employee,
            role: resignationData.role,
            department: resignationData.department,
            date: new Date().toISOString().split('T')[0],
            lastDay: resignationData.lastDay,
            reason: resignationData.reason,
            reasonDetails: resignationData.reasonDetails || '',
            status: 'Pending',
            submittedAt: new Date().toISOString()
        };

        // Store resignation
        const resignations = JSON.parse(localStorage.getItem('resignations') || '[]');
        resignations.push(resignation);
        localStorage.setItem('resignations', JSON.stringify(resignations));

        return resignation;
    } catch (error) {
        console.error('Error submitting resignation:', error);
        throw error;
    }
};

/**
 * Approve resignation and auto-generate offboarding checklist
 */
export const approveResignation = async (resignationId) => {
    try {
        // Update resignation status
        const resignations = JSON.parse(localStorage.getItem('resignations') || '[]');
        const resignation = resignations.find(r => r.id === resignationId);

        if (!resignation) {
            throw new Error('Resignation not found');
        }

        resignation.status = 'Approved';
        resignation.approvedAt = new Date().toISOString();

        localStorage.setItem('resignations', JSON.stringify(resignations));

        // Auto-generate offboarding checklist
        const checklist = await generateOffboardingChecklist(resignation);

        return { resignation, checklist };
    } catch (error) {
        console.error('Error approving resignation:', error);
        throw error;
    }
};

/**
 * Generate comprehensive offboarding checklist
 */
export const generateOffboardingChecklist = async (resignation) => {
    const checklist = {
        id: generateId(),
        resignationId: resignation.id,
        employeeId: resignation.employeeId,
        employee: resignation.employee,
        lastDay: resignation.lastDay,
        status: 'In Progress',
        createdAt: new Date().toISOString(),
        tasks: generateOffboardingTasks(resignation)
    };

    // Store checklist
    const checklists = JSON.parse(localStorage.getItem('offboardingChecklists') || '[]');
    checklists.push(checklist);
    localStorage.setItem('offboardingChecklists', JSON.stringify(checklists));

    // Update employee status
    updateEmployeeStatus(resignation.employeeId, 'Notice Period');

    return checklist;
};

/**
 * Generate offboarding tasks based on employee details
 */
const generateOffboardingTasks = (resignation) => {
    const lastDay = new Date(resignation.lastDay);
    const today = new Date();
    const daysRemaining = Math.ceil((lastDay - today) / (1000 * 60 * 60 * 24));

    // Calculate task deadlines
    const getDeadline = (daysBeforeLastDay) => {
        const deadline = new Date(lastDay);
        deadline.setDate(deadline.getDate() - daysBeforeLastDay);
        return deadline.toISOString().split('T')[0];
    };

    const tasks = [
        // HR Tasks
        {
            id: 1,
            category: 'HR',
            title: 'Schedule exit interview',
            description: 'Conduct exit interview to gather feedback',
            assignedTo: 'HR Team',
            deadline: getDeadline(5),
            status: 'pending',
            priority: 'high'
        },
        {
            id: 2,
            category: 'HR',
            title: 'Process final settlement',
            description: 'Calculate and process final salary, leave encashment, and benefits',
            assignedTo: 'HR Team',
            deadline: getDeadline(2),
            status: 'pending',
            priority: 'high'
        },
        {
            id: 3,
            category: 'HR',
            title: 'Issue relieving letter',
            description: 'Prepare and issue relieving letter and experience certificate',
            assignedTo: 'HR Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'high'
        },

        // IT Tasks
        {
            id: 4,
            category: 'IT',
            title: 'Revoke system access',
            description: 'Disable all system accounts and email access',
            assignedTo: 'IT Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'critical'
        },
        {
            id: 5,
            category: 'IT',
            title: 'Collect company assets',
            description: 'Retrieve laptop, phone, access cards, and other company property',
            assignedTo: 'IT Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'high'
        },
        {
            id: 6,
            category: 'IT',
            title: 'Data backup and transfer',
            description: 'Backup employee data and transfer to team',
            assignedTo: 'IT Team',
            deadline: getDeadline(3),
            status: 'pending',
            priority: 'medium'
        },

        // Manager Tasks
        {
            id: 7,
            category: 'Manager',
            title: 'Knowledge transfer',
            description: 'Ensure complete handover of responsibilities and ongoing projects',
            assignedTo: 'Reporting Manager',
            deadline: getDeadline(7),
            status: 'pending',
            priority: 'critical'
        },
        {
            id: 8,
            category: 'Manager',
            title: 'Update team structure',
            description: 'Redistribute responsibilities and update team hierarchy',
            assignedTo: 'Reporting Manager',
            deadline: getDeadline(5),
            status: 'pending',
            priority: 'medium'
        },

        // Finance Tasks
        {
            id: 9,
            category: 'Finance',
            title: 'Clear pending expenses',
            description: 'Process and clear all pending expense claims',
            assignedTo: 'Finance Team',
            deadline: getDeadline(3),
            status: 'pending',
            priority: 'medium'
        },
        {
            id: 10,
            category: 'Finance',
            title: 'Update payroll',
            description: 'Remove from payroll system and update records',
            assignedTo: 'Finance Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'high'
        },

        // Admin Tasks
        {
            id: 11,
            category: 'Admin',
            title: 'Update organizational chart',
            description: 'Remove from org chart and update directory',
            assignedTo: 'Admin Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'low'
        },
        {
            id: 12,
            category: 'Admin',
            title: 'Deactivate building access',
            description: 'Revoke physical access to office premises',
            assignedTo: 'Admin Team',
            deadline: resignation.lastDay,
            status: 'pending',
            priority: 'high'
        }
    ];

    return tasks;
};

/**
 * Update employee status
 */
const updateEmployeeStatus = (employeeId, status) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.map(emp =>
        emp.id === employeeId || emp.employeeId === employeeId
            ? { ...emp, status, offboardingStarted: new Date().toISOString() }
            : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
};

/**
 * Update checklist task status
 */
export const updateChecklistTask = (checklistId, taskId, status) => {
    const checklists = JSON.parse(localStorage.getItem('offboardingChecklists') || '[]');
    const updatedChecklists = checklists.map(checklist => {
        if (checklist.id === checklistId) {
            const updatedTasks = checklist.tasks.map(task =>
                task.id === taskId ? { ...task, status, completedAt: status === 'completed' ? new Date().toISOString() : null } : task
            );

            // Update overall checklist status
            const allCompleted = updatedTasks.every(task => task.status === 'completed');
            const checklistStatus = allCompleted ? 'Completed' : 'In Progress';

            return { ...checklist, tasks: updatedTasks, status: checklistStatus };
        }
        return checklist;
    });

    localStorage.setItem('offboardingChecklists', JSON.stringify(updatedChecklists));
};

/**
 * Get offboarding checklist by resignation ID
 */
export const getOffboardingChecklist = (resignationId) => {
    const checklists = JSON.parse(localStorage.getItem('offboardingChecklists') || '[]');
    return checklists.find(c => c.resignationId === resignationId);
};

/**
 * Get resignation statistics
 */
export const getResignationStats = () => {
    const resignations = JSON.parse(localStorage.getItem('resignations') || '[]');
    const currentYear = new Date().getFullYear();

    return {
        total: resignations.length,
        pending: resignations.filter(r => r.status === 'Pending').length,
        approved: resignations.filter(r => r.status === 'Approved').length,
        thisYear: resignations.filter(r => new Date(r.date).getFullYear() === currentYear).length,
        byReason: getResignationsByReason(resignations)
    };
};

/**
 * Group resignations by reason
 */
const getResignationsByReason = (resignations) => {
    return resignations.reduce((acc, resignation) => {
        const reason = resignation.reason || 'Other';
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
    }, {});
};
