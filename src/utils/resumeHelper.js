/**
 * Helper utilities for Resume PDF viewing, downloading, and URL normalization.
 */

export const normalizeResumeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (trimmed === '/resume.pdf') return '';
  return trimmed;
};

export const hasValidResume = (rawUrl) => {
  const normalized = normalizeResumeUrl(rawUrl);
  return Boolean(normalized && normalized.length > 0);
};

/**
 * Returns an embeddable URL suitable for an <iframe>.
 * Automatically converts Google Drive sharing links to preview links.
 */
export const getResumeEmbedUrl = (rawUrl) => {
  const url = normalizeResumeUrl(rawUrl);
  if (!url) return '';

  // Google Drive conversion: /view -> /preview
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
  }

  // Base64 Data URL (self-contained uploaded PDF)
  if (url.startsWith('data:application/pdf')) {
    return url;
  }

  // Local static asset
  if (url.startsWith('/')) {
    return `${url}#toolbar=0&navpanes=0`;
  }

  return url;
};

/**
 * Returns a direct download URL.
 * Automatically handles Google Drive and Data URLs.
 */
export const getResumeDownloadUrl = (rawUrl) => {
  const url = normalizeResumeUrl(rawUrl);
  if (!url) return '';

  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
    }
  }

  return url;
};

/**
 * Trigger download of the resume file.
 */
export const triggerResumeDownload = (url, filename = 'Marthala_Surendar_Reddy_Resume.pdf') => {
  const downloadUrl = getResumeDownloadUrl(url);
  if (!downloadUrl) return;

  if (downloadUrl.startsWith('data:application/pdf')) {
    // For base64 data URLs, use an anchor with download attribute
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename || 'Marthala_Surendar_Reddy_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // For external / HTTP URLs
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename || 'Marthala_Surendar_Reddy_Resume.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
