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

// Authorized admin email - configured via env or fallback
const AUTHORIZED_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "marthalasurendarreddy@gmail.com").toLowerCase();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    // Check local admin session backup
    const savedLocalAdmin = sessionStorage.getItem('msr_admin_authenticated');
    if (savedLocalAdmin === 'true') {
      setIsAdmin(true);
      setCurrentUser({
        email: AUTHORIZED_ADMIN_EMAIL,
        displayName: "Marthala Surendar Reddy (Owner)",
        photoURL: "/msr-portrait.svg"
      });
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Check custom claim first, then fallback to authorized email check
          try {
            const idTokenResult = await user.getIdTokenResult(true);
            const hasAdminClaim = Boolean(idTokenResult.claims.admin);
            const isAuthorizedEmail = user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL;

            if (hasAdminClaim || isAuthorizedEmail) {
              setCurrentUser(user);
              setIsAdmin(true);
              sessionStorage.setItem('msr_admin_authenticated', 'true');
              setAuthError('');
            } else {
              // Unauthorized user
              setCurrentUser(user);
              setIsAdmin(false);
              sessionStorage.removeItem('msr_admin_authenticated');
              setAuthError(`Access Denied: ${user.email} is not authorized to access this private Super Admin panel.`);
            }
          } catch (e) {
            console.error("Token verification error:", e);
            if (user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL) {
              setCurrentUser(user);
              setIsAdmin(true);
            }
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
        const idTokenResult = await user.getIdTokenResult();
        const hasAdminClaim = Boolean(idTokenResult.claims.admin);
        const isAuthorizedEmail = user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL;

        if (hasAdminClaim || isAuthorizedEmail) {
          setCurrentUser(user);
          setIsAdmin(true);
          sessionStorage.setItem('msr_admin_authenticated', 'true');
          return true;
        } else {
          await signOut(auth);
          setCurrentUser(null);
          setIsAdmin(false);
          sessionStorage.removeItem('msr_admin_authenticated');
          setAuthError(`Access Denied: ${user.email} is not authorized.`);
          return false;
        }
      } catch (err) {
        console.error("Google sign-in error:", err);
        setAuthError(err.message);
        return false;
      }
    } else {
      // Offline / Developer bypass for local inspection
      setCurrentUser({
        email: AUTHORIZED_ADMIN_EMAIL,
        displayName: "Marthala Surendar Reddy (Owner)",
        photoURL: "/msr-portrait.svg"
      });
      setIsAdmin(true);
      sessionStorage.setItem('msr_admin_authenticated', 'true');
      return true;
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('msr_admin_authenticated');
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("SignOut error:", e);
      }
    }
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const value = {
    currentUser,
    isAdmin,
    authLoading,
    authError,
    loginWithGoogle,
    logout,
    authorizedEmail: AUTHORIZED_ADMIN_EMAIL
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

