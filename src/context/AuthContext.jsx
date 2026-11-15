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

// EXACTLY ONE SUPER ADMIN: Strictly authorized by Firebase Authentication UID
export const SUPER_ADMIN_UID = import.meta.env.VITE_ADMIN_UID || "HOHTgjkAZlTPOO7bH98ukkw2vip1";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Validate if a user is strictly the single Super Admin by verified UID
  const isSuperAdminUser = (user) => {
    if (!user || !user.uid) return false;
    const uidMatch = user.uid === SUPER_ADMIN_UID;
    const verifiedMatch = user.emailVerified !== false;
    return uidMatch && verifiedMatch;
  };

  useEffect(() => {
    // Check saved session
    const savedLocalAdmin = sessionStorage.getItem('msr_single_super_admin_auth');
    if (savedLocalAdmin === 'true') {
      setIsAdmin(true);
      setCurrentUser({
        uid: SUPER_ADMIN_UID,
        displayName: "Super Admin",
        role: "Authorized Account",
        photoURL: "/msr-portrait.svg",
        emailVerified: true
      });
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (isSuperAdminUser(user)) {
            setCurrentUser({
              ...user,
              displayName: user.displayName || "Super Admin",
              role: "Authorized Account"
            });
            setIsAdmin(true);
            sessionStorage.setItem('msr_single_super_admin_auth', 'true');
            setAuthError('');
          } else {
            // Unauthorized account: immediately sign out and reject
            console.warn("Unauthorized login attempt blocked.");
            await signOut(auth);
            setCurrentUser(null);
            setIsAdmin(false);
            sessionStorage.removeItem('msr_single_super_admin_auth');
            setAuthError("Access Denied: This Google account is not authorized. Access is strictly restricted to the Super Admin (Authorized Account only).");
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
          setCurrentUser({
            ...user,
            displayName: user.displayName || "Super Admin",
            role: "Authorized Account"
          });
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
          setAuthError("Access Denied: This Google account is not authorized. Access is strictly restricted to the Super Admin (Authorized Account only).");
          return false;
        }
      } catch (err) {
        console.error("Google authentication error:", err.code || err.message);
        setAuthError(err.message || "Authentication failed. Please try again.");
        return false;
      }
    } else {
      // Local development fallback
      setCurrentUser({
        uid: SUPER_ADMIN_UID,
        displayName: "Super Admin",
        role: "Authorized Account",
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
    superAdminUid: SUPER_ADMIN_UID
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
