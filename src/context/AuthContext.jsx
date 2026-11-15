import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  isFirebaseConfigured 
} from '../services/firebase';

const AuthContext = createContext(null);

// EXACTLY ONE SUPER ADMIN: Strictly Marthala Surendar Reddy
export const SUPER_ADMIN_EMAIL = "marthalasurendarreddy@gmail.com";
export const SUPER_ADMIN_UID = import.meta.env.VITE_ADMIN_UID || "";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Validate if a user is strictly the single Super Admin
  const isSuperAdminUser = (user) => {
    if (!user || !user.email) return false;
    const emailMatch = user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    
    // In live Firebase, verify email_verified is true
    const verifiedMatch = user.emailVerified !== false;

    // If a specific UID is pinned in environment variables, verify it matches
    const uidMatch = !SUPER_ADMIN_UID || user.uid === SUPER_ADMIN_UID;

    return emailMatch && verifiedMatch && uidMatch;
  };

  useEffect(() => {
    // Check saved session
    const savedLocalAdmin = sessionStorage.getItem('msr_single_super_admin_auth');
    if (savedLocalAdmin === 'true') {
      setIsAdmin(true);
      setCurrentUser({
        email: SUPER_ADMIN_EMAIL,
        displayName: "Marthala Surendar Reddy (Sole Owner & Super Admin)",
        photoURL: "/msr-portrait.svg",
        emailVerified: true
      });
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (isSuperAdminUser(user)) {
            setCurrentUser(user);
            setIsAdmin(true);
            sessionStorage.setItem('msr_single_super_admin_auth', 'true');
            setAuthError('');
          } else {
            // Unauthorized account: immediately sign out and reject
            console.warn(`Unauthorized login attempt blocked for: ${user.email}`);
            await signOut(auth);
            setCurrentUser(null);
            setIsAdmin(false);
            sessionStorage.removeItem('msr_single_super_admin_auth');
            setAuthError(`Access Denied: ${user.email} is not authorized. Only Marthala Surendar Reddy (${SUPER_ADMIN_EMAIL}) has Super Admin access.`);
          }
        } else {
          if (savedLocalAdmin !== 'true') {
            setCurrentUser(null);
            setIsAdmin(false);
          }
        }
        setAuthLoading(false);
      });

      return () => unsubscribe();
    } else {
      setAuthLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    setAuthError('');
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (isSuperAdminUser(user)) {
          setCurrentUser(user);
          setIsAdmin(true);
          sessionStorage.setItem('msr_single_super_admin_auth', 'true');
          setAuthError('');
          return true;
        } else {
          // Immediately kick out unauthorized account
          await signOut(auth);
          setCurrentUser(null);
          setIsAdmin(false);
          sessionStorage.removeItem('msr_single_super_admin_auth');
          setAuthError(`Access Denied: ${user.email} is not authorized. Exactly one Super Admin (${SUPER_ADMIN_EMAIL}) can access this panel.`);
          return false;
        }
      } catch (err) {
        console.error("Google authentication error:", err);
        setAuthError(err.message);
        return false;
      }
    } else {
      // Local development evaluation for the owner
      setCurrentUser({
        email: SUPER_ADMIN_EMAIL,
        displayName: "Marthala Surendar Reddy (Sole Owner & Super Admin)",
        photoURL: "/msr-portrait.svg",
        emailVerified: true
      });
      setIsAdmin(true);
      sessionStorage.setItem('msr_single_super_admin_auth', 'true');
      return true;
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('msr_single_super_admin_auth');
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("SignOut error:", e);
      }
    }
    setCurrentUser(null);
    setIsAdmin(false);
    setAuthError('');
  };

  const value = {
    currentUser,
    isAdmin,
    authLoading,
    authError,
    loginWithGoogle,
    logout,
    superAdminEmail: SUPER_ADMIN_EMAIL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
