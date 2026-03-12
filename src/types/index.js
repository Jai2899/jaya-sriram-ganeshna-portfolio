/**
 * Shared JSDoc type definitions for portfolio data structures.
 * WHY: Documentation for recruiters; enables IDE intellisense without full TypeScript.
 */

/**
 * @typedef {Object} NavSection
 * @property {string} name - Display label for the nav item
 * @property {string} href - Hash link e.g. "#about"
 * @property {ReadonlyArray<{name: string, href: string}>} [items] - Nested sub-items for dropdown
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} label - Accessible label for screen readers (e.g. "View GitHub profile")
 * @property {string} href - URL to profile or contact
 * @property {string} icon - Icon identifier (GitHub, LinkedIn, Email, etc.)
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Project name
 * @property {readonly string[]} description - Bullet-point descriptions
 * @property {readonly string[]} technologies - Tech stack
 * @property {string} category - e.g. "Course Project", "Capstone Project"
 * @property {string} [link] - Optional project URL
 */

/**
 * @typedef {Object} ExperienceProject
 * @property {string} name - Project or product name
 * @property {string} [link] - Optional URL
 * @property {readonly string[]} description - Responsibility bullets
 * @property {readonly string[]} technologies - Tech stack
 */

/**
 * @typedef {Object} Experience
 * @property {string} title - Job title
 * @property {string} company - Company name
 * @property {string} duration - Display string e.g. "June 2022 - Present"
 * @property {string} location - Location string
 * @property {readonly ExperienceProject[]} [projects] - Sub-projects for the role
 * @property {readonly string[]} [description] - Bullets when no projects
 * @property {readonly string[]} [technologies] - Tech stack for non-project roles
 */

/**
 * @typedef {Object} Education
 * @property {{main: string, specialization: string}} degree - Degree info
 * @property {string} school - Institution name
 * @property {string} year - Graduation year
 * @property {string} location - Location string
 * @property {readonly string[]} details - Achievements (GPA, honors)
 * @property {readonly string[]} courses - Key courses
 */

/**
 * @typedef {Object} ResearchPaper
 * @property {string} title - Paper title
 * @property {string} authors - Author list
 * @property {string} journal - Publication venue
 * @property {string} year - Publication year
 * @property {string} link - PDF or article URL
 * @property {readonly string[]} tags - Keywords
 */

/**
 * @typedef {Object} Skill
 * @property {string} name - Skill name
 * @property {string} level - Proficiency (Advanced, Proficient, Intermediate)
 * @property {string} years - Experience string e.g. "3+ years"
 */
