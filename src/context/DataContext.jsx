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
  query,
  where,
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
        const parsed = JSON.parse(saved);
        return { messages: [], ...parsed };
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return { messages: [], ...initialPortfolioData };
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

  // Save changes to localStorage
  const persistLocally = useCallback((updatedData) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.warn("Failed to persist to localStorage:", e);
    }
  }, []);

  // Real-time synchronization across all 10 collections
  useEffect(() => {
    const unsubs = [];
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (isFirebaseConfigured && db) {
      try {
        // 1. Profile Listener (doc: profile/main)
        const profileRef = doc(db, 'profile', 'main');
        unsubs.push(onSnapshot(profileRef, (snap) => {
          if (snap.exists()) {
            setData(prev => ({
              ...prev,
              profile: { ...prev.profile, ...snap.data() }
            }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Profile listener:", err.message)));

        // 2. Social Links Listener (doc: socialLinks/main)
        const socialRef = doc(db, 'socialLinks', 'main');
        unsubs.push(onSnapshot(socialRef, (snap) => {
          if (snap.exists()) {
            setData(prev => ({
              ...prev,
              social: { ...prev.social, ...snap.data() }
            }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Social links listener:", err.message)));

        // 3. Settings Listener (doc: settings/general)
        const settingsRef = doc(db, 'settings', 'general');
        unsubs.push(onSnapshot(settingsRef, (snap) => {
          if (snap.exists()) {
            setData(prev => ({
              ...prev,
              settings: { ...prev.settings, ...snap.data() }
            }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Settings listener:", err.message)));

        // 3b. Resume Settings Listener (doc: settings/resume)
        const resumeRef = doc(db, 'settings', 'resume');
        unsubs.push(onSnapshot(resumeRef, (snap) => {
          if (snap.exists()) {
            setData(prev => ({
              ...prev,
              resume: { ...prev.resume, ...snap.data() }
            }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Resume settings listener:", err.message)));

        // 4. Skills Listener (Collection: skills)
        // Public visitors query only published == true; Admin queries all
        const skillsQuery = isAdmin 
          ? collection(db, 'skills')
          : query(collection(db, 'skills'), where('published', '==', true));
        unsubs.push(onSnapshot(skillsQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setData(prev => ({ ...prev, skills: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Skills listener:", err.message)));

        // 5. Projects Listener (Collection: projects)
        // Public visitors query only published == true; Admin queries all
        const projectsQuery = isAdmin 
          ? collection(db, 'projects')
          : query(collection(db, 'projects'), where('published', '==', true));
        unsubs.push(onSnapshot(projectsQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setData(prev => ({ ...prev, projects: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Projects listener:", err.message)));

        // 6. Education Listener (Collection: education)
        const eduQuery = isAdmin 
          ? collection(db, 'education')
          : query(collection(db, 'education'), where('published', '==', true));
        unsubs.push(onSnapshot(eduQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setData(prev => ({ ...prev, education: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Education listener:", err.message)));

        // 7. Experience Listener (Collection: experience)
        const expQuery = isAdmin 
          ? collection(db, 'experience')
          : query(collection(db, 'experience'), where('published', '==', true));
        unsubs.push(onSnapshot(expQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setData(prev => ({ ...prev, experience: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Experience listener:", err.message)));

        // 8. Certifications Listener (Collection: certifications)
        const certQuery = isAdmin 
          ? collection(db, 'certifications')
          : query(collection(db, 'certifications'), where('published', '==', true));
        unsubs.push(onSnapshot(certQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setData(prev => ({ ...prev, certifications: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Certifications listener:", err.message)));

        // 9. Achievements Listener (Collection: achievements)
        const achQuery = isAdmin 
          ? collection(db, 'achievements')
          : query(collection(db, 'achievements'), where('published', '==', true));
        unsubs.push(onSnapshot(achQuery, (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setData(prev => ({ ...prev, achievements: items }));
            setIsFirebaseLive(true);
          }
        }, err => console.warn("Achievements listener:", err.message)));

        // 10. Contact Messages Listener (Super Admin ONLY)
        if (isAdmin) {
          const msgQuery = collection(db, 'messages');
          unsubs.push(onSnapshot(msgQuery, (snap) => {
            const items = snap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
            setData(prev => ({ ...prev, messages: items }));
            setIsFirebaseLive(true);
          }, err => console.warn("Messages listener (Admin):", err.message)));
        }

        // 11. Legacy / Aggregate Document Fallback (content/portfolioData)
        // Ensures complete continuity for academicJourney, resume, testimonials
        const docRef = doc(db, 'content', 'portfolioData');
        unsubs.push(onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const remoteData = docSnap.data();
            setData(prev => {
              const merged = { ...prev, ...remoteData };
              persistLocally(merged);
              return merged;
            });
            setIsFirebaseLive(true);
          }
          setLoading(false);
          clearTimeout(timeoutId);
        }, (err) => {
          console.warn("Firestore aggregate listener fallback:", err.message);
          setLoading(false);
          clearTimeout(timeoutId);
        }));

      } catch (e) {
        console.warn("Firebase snapshot error:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      unsubs.forEach(unsub => {
        try { unsub(); } catch (_) {}
      });
    };
  }, [persistLocally, isAdmin]);

  // Sync to Firestore helper (Never sync contact messages to public content document)
  const syncToFirestore = async (newFullData) => {
    if (isFirebaseConfigured && db) {
      try {
        const { messages, ...publicData } = newFullData;
        const docRef = doc(db, 'content', 'portfolioData');
        await setDoc(docRef, { ...publicData, published: true, lastUpdated: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.error("Firestore sync error:", err);
      }
    }
  };

  // CRUD for Profile (Strictly Super Admin only)
  const updateProfile = async (profileUpdates) => {
    if (!verifySuperAdmin()) return false;
    const updatedProfile = { ...data.profile, ...profileUpdates, published: true };
    setData(prev => {
      const updated = { ...prev, profile: updatedProfile };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'profile', 'main'), updatedProfile, { merge: true });
      } catch (e) {
        console.warn("Profile direct write notice:", e.message);
      }
    }
    showNotification("Profile updated successfully!");
    return true;
  };

  // CRUD for Projects (Strictly Super Admin only)
  const addProject = async (project) => {
    if (!verifySuperAdmin()) return false;
    const newProject = {
      ...project,
      id: project.id || `proj-${Date.now()}`,
      displayOrder: (data.projects?.length || 0) + 1,
      published: project.published !== undefined ? project.published : true,
      isSample: project.isSample !== undefined ? project.isSample : false,
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'projects', newProject.id), newProject);
      } catch (e) {
        console.warn("Project direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'projects', id), { ...projectUpdates, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (e) {
        console.warn("Project direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (e) {
        console.warn("Project direct delete notice:", e.message);
      }
    }
    showNotification("Project removed successfully!");
    return true;
  };

  // CRUD for Skills (Strictly Super Admin only)
  const addSkill = async (skill) => {
    if (!verifySuperAdmin()) return false;
    const newSkill = {
      ...skill,
      id: skill.id || `sk-${Date.now()}`,
      displayOrder: (data.skills?.length || 0) + 1,
      published: skill.published !== undefined ? skill.published : true,
      isSample: skill.isSample !== undefined ? skill.isSample : false,
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'skills', newSkill.id), newSkill);
      } catch (e) {
        console.warn("Skill direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'skills', id), updates, { merge: true });
      } catch (e) {
        console.warn("Skill direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'skills', id));
      } catch (e) {
        console.warn("Skill direct delete notice:", e.message);
      }
    }
    showNotification("Skill deleted successfully!");
    return true;
  };

  // CRUD for Education (Strictly Super Admin only)
  const addEducation = async (edu) => {
    if (!verifySuperAdmin()) return false;
    const newEdu = { 
      ...edu, 
      id: edu.id || `edu-${Date.now()}`,
      published: edu.published !== undefined ? edu.published : true,
      isSample: edu.isSample !== undefined ? edu.isSample : false
    };
    setData(prev => {
      const updated = {
        ...prev,
        education: [newEdu, ...(prev.education || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'education', newEdu.id), newEdu);
      } catch (e) {
        console.warn("Education direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'education', id), updates, { merge: true });
      } catch (e) {
        console.warn("Education direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'education', id));
      } catch (e) {
        console.warn("Education direct delete notice:", e.message);
      }
    }
    showNotification("Education entry deleted!");
    return true;
  };

  // Update 4-Year Academic Progression Journey (Strictly Super Admin only)
  const updateAcademicJourney = async (newJourney) => {
    if (!verifySuperAdmin()) return false;
    setData(prev => {
      const updated = {
        ...prev,
        academicJourney: newJourney
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'content', 'portfolioData'), { 
          academicJourney: newJourney, 
          published: true, 
          lastUpdated: new Date().toISOString() 
        }, { merge: true });
      } catch (e) {
        console.warn("Academic journey direct write notice:", e.message);
      }
    }
    showNotification("Academic progression journey updated!");
    return true;
  };

  // CRUD for Experience (Strictly Super Admin only)
  const addExperience = async (exp) => {
    if (!verifySuperAdmin()) return false;
    const newExp = { 
      ...exp, 
      id: exp.id || `exp-${Date.now()}`,
      published: exp.published !== undefined ? exp.published : true,
      isSample: exp.isSample !== undefined ? exp.isSample : false
    };
    setData(prev => {
      const updated = {
        ...prev,
        experience: [newExp, ...(prev.experience || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'experience', newExp.id), newExp);
      } catch (e) {
        console.warn("Experience direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'experience', id), updates, { merge: true });
      } catch (e) {
        console.warn("Experience direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'experience', id));
      } catch (e) {
        console.warn("Experience direct delete notice:", e.message);
      }
    }
    showNotification("Experience deleted!");
    return true;
  };

  // CRUD for Certifications (Strictly Super Admin only)
  const addCertification = async (cert) => {
    if (!verifySuperAdmin()) return false;
    const newCert = { 
      ...cert, 
      id: cert.id || `cert-${Date.now()}`, 
      published: cert.published !== undefined ? cert.published : true,
      isSample: cert.isSample !== undefined ? cert.isSample : false
    };
    setData(prev => {
      const updated = {
        ...prev,
        certifications: [newCert, ...(prev.certifications || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'certifications', newCert.id), newCert);
      } catch (e) {
        console.warn("Certification direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'certifications', id), updates, { merge: true });
      } catch (e) {
        console.warn("Certification direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
      } catch (e) {
        console.warn("Certification direct delete notice:", e.message);
      }
    }
    showNotification("Certification deleted!");
    return true;
  };

  // CRUD for Achievements (Strictly Super Admin only)
  const addAchievement = async (ach) => {
    if (!verifySuperAdmin()) return false;
    const newAch = { 
      ...ach, 
      id: ach.id || `ach-${Date.now()}`,
      published: ach.published !== undefined ? ach.published : true,
      isSample: ach.isSample !== undefined ? ach.isSample : false
    };
    setData(prev => {
      const updated = {
        ...prev,
        achievements: [newAch, ...(prev.achievements || [])]
      };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'achievements', newAch.id), newAch);
      } catch (e) {
        console.warn("Achievement direct write notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'achievements', id), updates, { merge: true });
      } catch (e) {
        console.warn("Achievement direct update notice:", e.message);
      }
    }
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
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'achievements', id));
      } catch (e) {
        console.warn("Achievement direct delete notice:", e.message);
      }
    }
    showNotification("Achievement deleted!");
    return true;
  };

  // Resume Update (Strictly Super Admin only)
  const updateResume = async (resumeData) => {
    if (!verifySuperAdmin()) return false;
    const updatedResume = { 
      ...data.resume, 
      ...resumeData, 
      isPublic: true,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    };
    setData(prev => {
      const updated = { ...prev, resume: updatedResume };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'resume'), updatedResume, { merge: true });
      } catch (e) {
        console.warn("Resume direct write notice:", e.message);
      }
    }
    showNotification("Resume details updated!");
    return true;
  };

  // Settings & Social Links (Strictly Super Admin only)
  const updateSettings = async (settingsUpdates) => {
    if (!verifySuperAdmin()) return false;
    const updatedSettings = { ...data.settings, ...settingsUpdates, isPublic: true };
    setData(prev => {
      const updated = { ...prev, settings: updatedSettings };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'general'), updatedSettings, { merge: true });
      } catch (e) {
        console.warn("Settings direct write notice:", e.message);
      }
    }
    showNotification("Settings updated!");
    return true;
  };

  const updateSocialLinks = async (socialUpdates) => {
    if (!verifySuperAdmin()) return false;
    const updatedSocial = { ...data.social, ...socialUpdates, published: true };
    setData(prev => {
      const updated = { ...prev, social: updatedSocial };
      persistLocally(updated);
      syncToFirestore(updated);
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'socialLinks', 'main'), updatedSocial, { merge: true });
      } catch (e) {
        console.warn("Social links direct write notice:", e.message);
      }
    }
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
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'messages', id), { read: isRead });
      } catch (e) {
        console.warn("Message mark read direct notice:", e.message);
      }
    }
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
      return updated;
    });
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (e) {
        console.warn("Message delete direct notice:", e.message);
      }
    }
    showNotification("Message deleted!");
    return true;
  };

  // Bulk Sample Data Management (Strictly Super Admin only)
  const removeSampleData = async () => {
    if (!verifySuperAdmin()) return false;
    const sampleProjects = (data.projects || []).filter(p => p.isSample);
    const sampleSkills = (data.skills || []).filter(s => s.isSample);
    const sampleCerts = (data.certifications || []).filter(c => c.isSample);
    const sampleExp = (data.experience || []).filter(e => e.isSample);
    const sampleAchievements = (data.achievements || []).filter(a => a.isSample);

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

    if (isFirebaseConfigured && db) {
      for (const p of sampleProjects) {
        try { await deleteDoc(doc(db, 'projects', p.id)); } catch (_) {}
      }
      for (const s of sampleSkills) {
        try { await deleteDoc(doc(db, 'skills', s.id)); } catch (_) {}
      }
      for (const c of sampleCerts) {
        try { await deleteDoc(doc(db, 'certifications', c.id)); } catch (_) {}
      }
      for (const e of sampleExp) {
        try { await deleteDoc(doc(db, 'experience', e.id)); } catch (_) {}
      }
      for (const a of sampleAchievements) {
        try { await deleteDoc(doc(db, 'achievements', a.id)); } catch (_) {}
      }
    }

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

  // Idempotent Multi-Collection Firestore Synchronizer (Strictly Super Admin only)
  // NEVER overwrites existing documents; checks getDoc() and skips existing completely.
  const seedFirestoreCollections = async () => {
    if (!verifySuperAdmin()) return false;
    if (!isFirebaseConfigured || !db) {
      showNotification("Firebase is not configured.", "error");
      return false;
    }

    try {
      showNotification("Checking Firestore for missing documents...", "info");
      let createdCount = 0;
      let skippedCount = 0;

      const safeCreateIfMissing = async (collectionName, docId, data) => {
        const ref = doc(db, collectionName, docId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          console.log(`[SKIP - ALREADY EXISTS] ${collectionName}/${docId}`);
          skippedCount++;
          return false;
        } else {
          // Document does NOT exist -> create only missing document, NO merge
          await setDoc(ref, data);
          console.log(`[CREATED MISSING] ${collectionName}/${docId}`);
          createdCount++;
          return true;
        }
      };

      // 1. Profile (Skip if exists)
      await safeCreateIfMissing('profile', 'main', { ...initialPortfolioData.profile, published: true });

      // 2. Social Links (Skip if exists)
      await safeCreateIfMissing('socialLinks', 'main', { ...initialPortfolioData.social, published: true });

      // 3. Settings (Skip if exists)
      await safeCreateIfMissing('settings', 'general', { ...initialPortfolioData.settings, isPublic: true });

      // 4. Skills (Create only missing skill documents)
      for (const skill of initialPortfolioData.skills) {
        await safeCreateIfMissing('skills', skill.id, { ...skill, published: true });
      }

      // 5. Projects (Create only missing project documents)
      for (const proj of initialPortfolioData.projects) {
        await safeCreateIfMissing('projects', proj.id, { ...proj, published: true });
      }

      // 6. Education (Create only missing education documents)
      for (const edu of initialPortfolioData.education) {
        await safeCreateIfMissing('education', edu.id, { ...edu, published: true });
      }

      // 7. Experience (Create only missing experience documents)
      for (const exp of initialPortfolioData.experience) {
        await safeCreateIfMissing('experience', exp.id, { ...exp, published: true });
      }

      // 8. Certifications (Create only missing certification documents)
      for (const cert of initialPortfolioData.certifications) {
        await safeCreateIfMissing('certifications', cert.id, { ...cert, published: true });
      }

      // 9. Achievements (Create only missing achievement documents)
      for (const ach of initialPortfolioData.achievements) {
        await safeCreateIfMissing('achievements', ach.id, { ...ach, published: true });
      }

      showNotification(`Sync Complete: ${createdCount} created, ${skippedCount} existing preserved.`, "success");
      return { createdCount, skippedCount };
    } catch (err) {
      console.error("Firestore seeding error:", err);
      showNotification(`Seeding error: ${err.message}`, "error");
      return false;
    }
  };

  // File Upload helper (Local preview fallback)
  const uploadFile = async (file) => {
    if (!verifySuperAdmin()) {
      throw new Error("Unauthorized: Super Admin permission required to upload media.");
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
    updateAcademicJourney,
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
    seedFirestoreCollections,
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

