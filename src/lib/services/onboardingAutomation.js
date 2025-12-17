/**
 * Onboarding Automation Service
 * Auto-generates onboarding tasks based on role and department
 */

const TASK_TEMPLATES = {
    // Standard tasks for all employees
    standard: [
        { title: "Complete Personal Information", category: "HR", priority: "High", duration: "1 day" },
        { title: "Sign Employment Contract", category: "HR", priority: "Critical", duration: "1 day" },
        { title: "Setup Company Email", category: "IT", priority: "High", duration: "1 day" },
        { title: "Join Slack/Teams Channels", category: "IT", priority: "Medium", duration: "1 day" },
        { title: "Review Employee Handbook", category: "HR", priority: "Medium", duration: "2 days" },
        { title: "Office Tour & Introduction", category: "Admin", priority: "Low", duration: "1 day" }
    ],

    // Department-specific tasks
    departments: {
        Engineering: [
            { title: "Setup Development Environment", category: "IT", priority: "High", duration: "2 days" },
            { title: "Grant GitHub/GitLab Access", category: "IT", priority: "High", duration: "1 day" },
            { title: "Review Code Style Guidelines", category: "Engineering", priority: "Medium", duration: "1 day" },
            { title: "Architecture Overview Session", category: "Engineering", priority: "Medium", duration: "2 hours" },
            { title: "First Commit (Good First Issue)", category: "Engineering", priority: "Low", duration: "3 days" }
        ],
        Sales: [
            { title: "CRM Access & Training", category: "Sales", priority: "High", duration: "3 days" },
            { title: "Product Knowledge Session", category: "Product", priority: "High", duration: "1 day" },
            { title: "Review Sales Playbook", category: "Sales", priority: "Medium", duration: "2 days" },
            { title: "Shadow Sales Call", category: "Sales", priority: "Medium", duration: "1 day" }
        ],
        Marketing: [
            { title: "Brand Guidelines Review", category: "Marketing", priority: "High", duration: "1 day" },
            { title: "Social Media Access", category: "IT", priority: "Medium", duration: "1 day" },
            { title: "Campaign Tools Training", category: "Marketing", priority: "Medium", duration: "2 days" }
        ],
        Product: [
            { title: "Product Roadmap Review", category: "Product", priority: "High", duration: "1 day" },
            { title: "User Persona Deep Dive", category: "Product", priority: "Medium", duration: "1 day" },
            { title: "Competitor Analysis Review", category: "Product", priority: "Medium", duration: "1 day" }
        ]
    },

    // Role-specific tasks
    roles: {
        Manager: [
            { title: "Team Budget Review", category: "Finance", priority: "High", duration: "1 day" },
            { title: "Hiring Plan Overview", category: "HR", priority: "Medium", duration: "1 day" },
            { title: "Performance Review Training", category: "HR", priority: "Medium", duration: "2 days" }
        ],
        Intern: [
            { title: "Mentorship Program Setup", category: "HR", priority: "High", duration: "1 day" },
            { title: "Internship Project Definition", category: "Manager", priority: "High", duration: "2 days" }
        ]
    }
};

/**
 * Generate onboarding tasks for a new employee
 */
export const generateOnboardingTasks = (employee) => {
    const tasks = [...TASK_TEMPLATES.standard];

    // Add department tasks
    if (employee.department && TASK_TEMPLATES.departments[employee.department]) {
        tasks.push(...TASK_TEMPLATES.departments[employee.department]);
    }

    // Add role tasks (simple keyword matching)
    if (employee.position?.toLowerCase().includes('manager') || employee.position?.toLowerCase().includes('lead')) {
        tasks.push(...TASK_TEMPLATES.roles.Manager);
    }
    if (employee.position?.toLowerCase().includes('intern')) {
        tasks.push(...TASK_TEMPLATES.roles.Intern);
    }

    // Add metadata
    return tasks.map((task, index) => ({
        id: `task-${Date.now()}-${index}`,
        ...task,
        status: 'Pending',
        assignee: employee.id,
        dueDate: calculateDueDate(task.duration)
    }));
};

/**
 * Calculate due date based on duration string
 */
const calculateDueDate = (duration) => {
    const today = new Date();
    const days = parseInt(duration) || 1;
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + days);
    return dueDate.toISOString().split('T')[0];
};

/**
 * Get onboarding progress
 */
export const getOnboardingProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
};
