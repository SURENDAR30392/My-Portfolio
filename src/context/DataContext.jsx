import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialPortfolioData } from '../data/initialData';
import { useAuth } from './AuthContext';
import { 
  db, 
  storage, 
  isFirebaseConfigured, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  storageRef,
  uploadBytes,
  getDownloadURL
} from '../services/firebase';

const LOCAL_STORAGE_KEY = 'msr_portfolio_data_backup_v1';
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { isAdmin } = useAuth();

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return initialPortfolioData;
  });

  const [loading, setLoading] = useState(true);
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.id ? null : prev));
    }, 4000);
  }, []);

  // Strict Super Admin Access Verification
  const verifySuperAdmin = useCallback(() => {
    if (!isAdmin) {
      showNotification("Access Denied: Only Super Admin (Marthala Surendar Reddy) has permission to make changes.", "error");
      console.warn("Unauthorized modification attempt blocked: Caller is not the authorized Super Admin.");
      return false;
    }
    return true;
  }, [isAdmin, showNotification]);

  // Save changes to localStorage only if authorized
  const persistLocally = useCallback((updatedData) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.warn("Failed to persist to localStorage:", e);
    }
  }, []);

  // Sync with Firestore if configured
  useEffect(() => {
    let unsubscribe = () => {};
    let timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'content', 'portfolioData');
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const remoteData = docSnap.data();
            setData(prev => {
              const merged = { ...prev, ...remoteData };
              persistLocally(merged);
              return merged;
            });
            setIsFirebaseLive(true);
          } else {
            // First time setup - seed initial data to Firestore if authorized
            if (isAdmin) {
              setDoc(docRef, initialPortfolioData, { merge: true })
                .then(() => setIsFirebaseLive(true))
                .catch(err => console.warn("Firestore seed note:", err.message));
            }
          }
          setLoading(false);
          clearTimeout(timeoutId);
        }, (err) => {
          console.warn("Firestore listener fallback to local:", err.message);
          setLoading(false);
          clearTimeout(timeoutId);
        });
      } catch (e) {
        console.warn("Firebase snapshot error:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [persistLocally, isAdmin]);

  // Sync to Firestore helper
  const syncToFirestore = async (newFullData) => {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'content', 'portfolioData');
        await setDoc(docRef, { ...newFullData, lastUpdated: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.error("Firestore sync error:", err);
      }
    }
  };

  // CRUD for Profile (Strictly Super Admin only)
  const updateProfile = async (profileUpdates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        profile: { ...prev.profile, ...profileUpdates }
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Profile updated successfully!");
    return true;
  };

  // CRUD for Projects (Strictly Super Admin only)
  const addProject = async (project) => {
    if (!verifySuperAdmin()) return false;
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
      displayOrder: (data.projects?.length || 0) + 1,
      published: project.published !== undefined ? project.published : true,
      createdAt: new Date().toISOString()
    };
    setData(prev => {
      const updated = {
        ...prev,
        projects: [newProject, ...(prev.projects || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Project added successfully!");
    return newProject;
  };

  const updateProject = async (id, projectUpdates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        projects: (prev.projects || []).map(p => p.id === id ? { ...p, ...projectUpdates, updatedAt: new Date().toISOString() } : p)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Project updated successfully!");
    return true;
  };

  const deleteProject = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        projects: (prev.projects || []).filter(p => p.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Project removed successfully!");
    return true;
  };

  // CRUD for Skills (Strictly Super Admin only)
  const addSkill = async (skill) => {
    if (!verifySuperAdmin()) return false;
    const newSkill = {
      ...skill,
      id: `sk-${Date.now()}`,
      displayOrder: (data.skills?.length || 0) + 1,
      createdAt: new Date().toISOString()
    };
    setData(prev => {
      const updated = {
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Skill added successfully!");
    return true;
  };

  const updateSkill = async (id, updates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        skills: (prev.skills || []).map(s => s.id === id ? { ...s, ...updates } : s)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Skill updated successfully!");
    return true;
  };

  const deleteSkill = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        skills: (prev.skills || []).filter(s => s.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Skill deleted successfully!");
    return true;
  };

  // CRUD for Education (Strictly Super Admin only)
  const addEducation = async (edu) => {
    if (!verifySuperAdmin()) return false;
    const newEdu = { ...edu, id: `edu-${Date.now()}` };
    setData(prev => {
      const updated = {
        ...prev,
        education: [newEdu, ...(prev.education || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Education entry added!");
    return true;
  };

  const updateEducation = async (id, updates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        education: (prev.education || []).map(e => e.id === id ? { ...e, ...updates } : e)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Education entry updated!");
    return true;
  };

  const deleteEducation = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        education: (prev.education || []).filter(e => e.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Education entry deleted!");
    return true;
  };

  // CRUD for Experience (Strictly Super Admin only)
  const addExperience = async (exp) => {
    if (!verifySuperAdmin()) return false;
    const newExp = { ...exp, id: `exp-${Date.now()}` };
    setData(prev => {
      const updated = {
        ...prev,
        experience: [newExp, ...(prev.experience || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Experience added!");
    return true;
  };

  const updateExperience = async (id, updates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        experience: (prev.experience || []).map(e => e.id === id ? { ...e, ...updates } : e)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Experience updated!");
    return true;
  };

  const deleteExperience = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        experience: (prev.experience || []).filter(e => e.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Experience deleted!");
    return true;
  };

  // CRUD for Certifications (Strictly Super Admin only)
  const addCertification = async (cert) => {
    if (!verifySuperAdmin()) return false;
    const newCert = { ...cert, id: `cert-${Date.now()}`, published: true };
    setData(prev => {
      const updated = {
        ...prev,
        certifications: [newCert, ...(prev.certifications || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Certification added!");
    return true;
  };

  const updateCertification = async (id, updates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        certifications: (prev.certifications || []).map(c => c.id === id ? { ...c, ...updates } : c)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Certification updated!");
    return true;
  };

  const deleteCertification = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        certifications: (prev.certifications || []).filter(c => c.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Certification deleted!");
    return true;
  };

  // CRUD for Achievements (Strictly Super Admin only)
  const addAchievement = async (ach) => {
    if (!verifySuperAdmin()) return false;
    const newAch = { ...ach, id: `ach-${Date.now()}` };
    setData(prev => {
      const updated = {
        ...prev,
        achievements: [newAch, ...(prev.achievements || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Achievement added!");
    return true;
  };

  const updateAchievement = async (id, updates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        achievements: (prev.achievements || []).map(a => a.id === id ? { ...a, ...updates } : a)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Achievement updated!");
    return true;
  };

  const deleteAchievement = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        achievements: (prev.achievements || []).filter(a => a.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Achievement deleted!");
    return true;
  };

  // Resume Update (Strictly Super Admin only)
  const updateResume = async (resumeData) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        resume: { ...prev.resume, ...resumeData, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Resume details updated!");
    return true;
  };

  // Settings & Social Links (Strictly Super Admin only)
  const updateSettings = async (settingsUpdates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        settings: { ...prev.settings, ...settingsUpdates }
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Settings updated!");
    return true;
  };

  const updateSocialLinks = async (socialUpdates) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        social: { ...prev.social, ...socialUpdates }
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Social links updated!");
    return true;
  };

  // PUBLIC CONTACT FORM SUBMISSION (Normal visitors are permitted to send messages)
  const sendMessage = async (messageData) => {
    const newMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'messages'), {
          ...newMessage,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn("Could not write message directly to collection:", err);
      }
    }

    setData(prev => {
      const updated = {
        ...prev,
        messages: [newMessage, ...(prev.messages || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });

    return true;
  };

  // Managing Messages (Strictly Super Admin only)
  const markMessageRead = async (id, isRead = true) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        messages: (prev.messages || []).map(m => m.id === id ? { ...m, read: isRead } : m)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    return true;
  };

  const deleteMessage = async (id) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        messages: (prev.messages || []).filter(m => m.id !== id)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("Message deleted!");
    return true;
  };

  // Bulk Sample Data Management (Strictly Super Admin only)
  const removeSampleData = async () => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        projects: (prev.projects || []).filter(p => !p.isSample),
        skills: (prev.skills || []).filter(s => !s.isSample),
        certifications: (prev.certifications || []).filter(c => !c.isSample),
        experience: (prev.experience || []).filter(e => !e.isSample),
        achievements: (prev.achievements || []).filter(a => !a.isSample)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    showNotification("All sample records removed safely!");
    return true;
  };

  // Restore Default Sample Data (Strictly Super Admin only)
  const restoreDefaultData = async () => {
    if (!verifySuperAdmin()) return false;
    setData(initialPortfolioData);
    persistLocally(initialPortfolioData);
    syncToFirestore(initialPortfolioData);
    showNotification("Default data restored!");
    return true;
  };

  // File Upload helper (Strictly Super Admin only)
  const uploadFile = async (file, path) => {
    if (!verifySuperAdmin()) {
      throw new Error("Unauthorized: Super Admin permission required to upload media.");
    }
    if (isFirebaseConfigured && storage) {
      try {
        const fileRef = storageRef(storage, `${path}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      } catch (e) {
        console.warn("Storage upload fallback:", e);
      }
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const value = {
    data,
    loading,
    isFirebaseLive,
    notification,
    showNotification,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertification,
    updateCertification,
    deleteCertification,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    updateResume,
    updateSettings,
    updateSocialLinks,
    sendMessage,
    markMessageRead,
    deleteMessage,
    removeSampleData,
    restoreDefaultData,
    uploadFile
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
