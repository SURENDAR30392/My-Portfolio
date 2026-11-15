/**
 * Formats and sanitizes external URLs (e.g. project live demos, GitHub repositories).
 * Prevents the portfolio hosting domain or localhost from being prepended to external links,
 * and ensures an absolute protocol (https://) is always present so the browser never
 * resolves external links as relative paths on the portfolio website.
 */
export const formatExternalUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  if (!cleaned) return '';

  // 1. Remove any prepended portfolio hosting domains or local dev domains
  cleaned = cleaned.replace(/^https?:\/\/(?:marthala-surendar-reddy|surendar-reddy)\.web\.app\/?/i, '');
  cleaned = cleaned.replace(/^https?:\/\/(?:marthala-surendar-reddy|surendar-reddy)\.firebaseapp\.com\/?/i, '');
  cleaned = cleaned.replace(/^https?:\/\/localhost(?::\d+)?\/?/i, '');
  cleaned = cleaned.replace(/^(?:marthala-surendar-reddy|surendar-reddy)\.web\.app\/?/i, '');
  cleaned = cleaned.replace(/^(?:marthala-surendar-reddy|surendar-reddy)\.firebaseapp\.com\/?/i, '');
  cleaned = cleaned.replace(/^localhost(?::\d+)?\/?/i, '');

  cleaned = cleaned.trim();
  if (!cleaned) return '';

  // 2. If the user pasted an external URL after some relative path (e.g. "project/https://demo.com")
  const embeddedHttpIndex = cleaned.search(/https?:\/\//i);
  if (embeddedHttpIndex > 0) {
    cleaned = cleaned.slice(embeddedHttpIndex);
  }

  // 3. Fix duplicated protocol prefixes (e.g., https://https:// or http://https://)
  while (/^(?:https?:\/\/){2,}/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:https?:\/\/)+/i, 'https://');
  }

  // 4. Ensure absolute protocol is present so it never opens as a relative link
  if (cleaned.startsWith('//')) {
    cleaned = `https:${cleaned}`;
  } else if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `https://${cleaned}`;
  }

  return cleaned;
};
