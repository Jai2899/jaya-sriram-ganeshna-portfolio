/**
 * Centralized section IDs, nav config, and social links — single source of truth.
 * WHY: Eliminates magic strings across 10+ files; enables safe refactors.
 */

/** @readonly Section anchor IDs for scroll targets and URL hash navigation */
export const SECTION_IDS = Object.freeze({
  HOME: 'jganeshna',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EDUCATION: 'education',
  RESEARCH: 'research',
  CONTACT: 'contact',
});

/** @readonly Navigation structure — used by Navbar and Footer */
export const NAV_SECTIONS = Object.freeze([
  { name: 'Home', href: `#${SECTION_IDS.HOME}` },
  { name: 'About', href: `#${SECTION_IDS.ABOUT}` },
  {
    name: 'Experience & Projects',
    items: Object.freeze([
      { name: 'Experience', href: `#${SECTION_IDS.EXPERIENCE}` },
      { name: 'Projects', href: `#${SECTION_IDS.PROJECTS}` },
    ]),
  },
  { name: 'Skills', href: `#${SECTION_IDS.SKILLS}` },
  {
    name: 'Education & Research',
    items: Object.freeze([
      { name: 'Education', href: `#${SECTION_IDS.EDUCATION}` },
      { name: 'Research', href: `#${SECTION_IDS.RESEARCH}` },
    ]),
  },
  { name: 'Contact', href: `#${SECTION_IDS.CONTACT}` },
]);

/** @readonly Footer quick links — name, href, display icon/number */
export const QUICK_LINKS = Object.freeze([
  { name: 'About', href: `#${SECTION_IDS.ABOUT}`, icon: '01' },
  { name: 'Experience', href: `#${SECTION_IDS.EXPERIENCE}`, icon: '02' },
  { name: 'Projects', href: `#${SECTION_IDS.PROJECTS}`, icon: '03' },
  { name: 'Skills', href: `#${SECTION_IDS.SKILLS}`, icon: '04' },
]);

/** @readonly Social media and contact links — label for aria-label, href, icon identifier */
export const SOCIAL_LINKS = Object.freeze([
  { label: 'GitHub', href: 'https://github.com/Jai2899', icon: 'GitHub' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jaya-sriram-g', icon: 'LinkedIn' },
  { label: 'Email', href: 'mailto:gjayasriram@gmail.com', icon: 'Email' },
  { label: 'X (formerly Twitter)', href: 'https://x.com/J_a_ii', icon: 'X' },
  { label: 'Instagram', href: 'https://www.instagram.com/j_a_ii/', icon: 'Instagram' },
]);
