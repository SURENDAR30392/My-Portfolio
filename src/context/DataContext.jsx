import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialPortfolioData } from '../data/initialData';
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

  // Save changes to localStorage
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
            // First time setup - seed initial data to Firestore
            setDoc(docRef, initialPortfolioData, { merge: true })
              .then(() => setIsFirebaseLive(true))
              .catch(err => console.warn("Firestore seed note:", err.message));
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
      // Local mode
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [persistLocally]);

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

  // CRUD for Profile
  const updateProfile = async (profileUpdates) => {
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
  };

  // CRUD for Projects
  const addProject = async (project) => {
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
  };

  const deleteProject = async (id) => {
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
  };

  // CRUD for Skills
  const addSkill = async (skill) => {
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
  };

  const updateSkill = async (id, updates) => {
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
  };

  const deleteSkill = async (id) => {
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
  };

  // CRUD for Education
  const addEducation = async (edu) => {
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
  };

  const updateEducation = async (id, updates) => {
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
  };

  const deleteEducation = async (id) => {
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
  };

  // CRUD for Experience
  const addExperience = async (exp) => {
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
  };

  const updateExperience = async (id, updates) => {
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
  };

  const deleteExperience = async (id) => {
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
  };

  // CRUD for Certifications
  const addCertification = async (cert) => {
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
  };

  const updateCertification = async (id, updates) => {
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
  };

  const deleteCertification = async (id) => {
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
  };

  // CRUD for Achievements
  const addAchievement = async (ach) => {
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
  };

  const updateAchievement = async (id, updates) => {
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
  };

  const deleteAchievement = async (id) => {
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
  };

  // Resume Update
  const updateResume = async (resumeData) => {
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
  };

  // Settings & Social Links
  const updateSettings = async (settingsUpdates) => {
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
  };

  const updateSocialLinks = async (socialUpdates) => {
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
  };

  // Contact Form - Send Message
  const sendMessage = async (messageData) => {
    const newMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    // If Firestore is live, also add to Firestore messages collection
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

    // Always update local state
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

  const markMessageRead = async (id, isRead = true) => {
    setData(prev => {
      const updated = {
        ...prev,
        messages: (prev.messages || []).map(m => m.id === id ? { ...m, read: isRead } : m)
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
  };

  const deleteMessage = async (id) => {
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
  };

  // Bulk Sample Data Management (Module 12)
  const removeSampleData = async () => {
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
  };

  // Restore Default Sample Data
  const restoreDefaultData = async () => {
    setData(initialPortfolioData);
    persistLocally(initialPortfolioData);
    syncToFirestore(initialPortfolioData);
    showNotification("Default data restored!");
  };

  // File Upload helper (Firebase Storage or local data URL preview)
  const uploadFile = async (file, path) => {
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
    // Fallback: create base64 / blob URL for local development preview
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
