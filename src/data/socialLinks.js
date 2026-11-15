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
  codechefUsername: "kl2400030392",

  // Section Header
  codingSectionTitle: "Coding Profiles & Contributions",
  codingSectionSubtitle: "Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories.",

  // GitHub Card Custom Content
  githubDescription: "Maintaining repositories in core Java, Object-Oriented design patterns, full-stack prototypes, and open-source project code.",
  githubStat1Value: "Java",
  githubStat1Label: "Primary Tech",
  githubStat2Value: "Public",
  githubStat2Label: "Repositories",
  githubStat3Value: "Active",
  githubStat3Label: "Commits",

  // LeetCode Card Custom Content
  leetcodeDescription: "Active problem solver practicing data structures, arrays, strings, binary trees, and algorithmic complexity optimizations in Java.",
  leetcodeStat1Value: "150+",
  leetcodeStat1Label: "Solved",
  leetcodeStat2Value: "DSA",
  leetcodeStat2Label: "Algorithms",
  leetcodeStat3Value: "Java",
  leetcodeStat3Label: "Language",

  // CodeChef Card Custom Content
  codechefDescription: "Competitive programming participant competing in timed division rounds, Starters contests, and algorithmic challenges.",
  codechefStat1Value: "Div 4/3",
  codechefStat1Label: "Division",
  codechefStat2Value: "Contests",
  codechefStat2Label: "Starters",
  codechefStat3Value: "Active",
  codechefStat3Label: "Rating"
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

