/**
 * Centralized Social & Coding Profile Links for Marthala Surendar Reddy (MSR)
 * Every platform has its own strictly mapped URL and username.
 */

export const DEFAULT_SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/marthalasurendarreddy/",
  github: "https://github.com/SURENDAR30392",
  leetcode: "https://leetcode.com/u/kl_2400030392/",
  codechef: "https://www.codechef.com/users/kl2400030392",
  email: "marthalasurendarreddy@gmail.com",
  githubUsername: "SURENDAR30392",
  leetcodeUsername: "kl_2400030392",
  codechefUsername: "kl2400030392"
};

/**
 * Returns safe, independent URLs ensuring no URL reuse.
 */
export const getPlatformUrl = (platform, customLinks = {}) => {
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return customLinks.linkedin || DEFAULT_SOCIAL_LINKS.linkedin;
    case 'github':
      return customLinks.github || DEFAULT_SOCIAL_LINKS.github;
    case 'leetcode':
      return customLinks.leetcode || DEFAULT_SOCIAL_LINKS.leetcode;
    case 'codechef':
      return customLinks.codechef || DEFAULT_SOCIAL_LINKS.codechef;
    case 'email':
      return `mailto:${customLinks.email || DEFAULT_SOCIAL_LINKS.email}`;
    default:
      return '#';
  }
};
