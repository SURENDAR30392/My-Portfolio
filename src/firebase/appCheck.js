import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

let appCheckInstance = null;

/**
 * Initializes Firebase App Check in a safe, non-blocking manner.
 * - In local development: Enables the App Check debug token so localhost requests pass without reCAPTCHA errors.
 * - In production: Uses reCAPTCHA v3 with automatic token refresh.
 * - Does NOT block or crash the application if reCAPTCHA site key is not yet configured.
 * - Strictly Spark (Free) plan compatible.
 * 
 * @param {import('firebase/app').FirebaseApp} app
 */
export const initAppCheck = (app) => {
  if (appCheckInstance) return appCheckInstance;
  if (typeof window === 'undefined') return null;

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Configure debug token for development
  if (isLocalhost) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || true;
  }

  if (!siteKey) {
    if (import.meta.env.DEV) {
      console.info("ℹ️ App Check notice: VITE_RECAPTCHA_SITE_KEY is not configured yet. App Check remains in passive mode.");
    }
    return null;
  }

  try {
    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true
    });
    console.info("✅ Firebase App Check initialized successfully.");
    return appCheckInstance;
  } catch (error) {
    console.warn("⚠️ App Check initialization warning:", error.message);
    return null;
  }
};
