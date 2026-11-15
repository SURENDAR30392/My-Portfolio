/**
 * Formats and sanitizes external URLs (e.g. project live demos, GitHub repositories).
 * Prevents the portfolio hosting domain or localhost from being prepended to external links,
 * and fixes missing, duplicated, or malformed protocols (like https:mrds.in or mrds.in)
 * so clicking external links always navigates directly to the target external site.
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

  // 2. If the user pasted an external URL after some relative path (e.g. "prefix/https:demo.com")
  const embeddedHttpIndex = cleaned.search(/https?:/i);
  if (embeddedHttpIndex > 0) {
    cleaned = cleaned.slice(embeddedHttpIndex);
  }

  // 3. Strip any broken, duplicate, or malformed protocol prefixes (e.g., https:mrds.in, https:/mrds.in, https://https://mrds.in, http:mrds.in)
  cleaned = cleaned.replace(/^(?:https?:*\/+)+/i, '');
  cleaned = cleaned.replace(/^https?:*/i, '');

  cleaned = cleaned.trim();
  if (!cleaned) return '';

  // 4. Prepend standard https://
  return `https://${cleaned}`;
};
