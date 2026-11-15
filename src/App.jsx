import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { MSRLoader } from './components/MSRLoader';
import { HomePage } from './pages/HomePage';
import { ResumePage } from './pages/ResumePage';
import { HonorsPage } from './pages/HonorsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './admin/pages/AdminPage';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';

export function App() {
  const [initialLoadingComplete, setInitialLoadingComplete] = useState(() => {
    // Check if initial animation was already shown in this session
    return sessionStorage.getItem('msr_initial_loaded') === 'true';
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('msr_initial_loaded', 'true');
    setInitialLoadingComplete(true);
  };

  return (
    <AuthProvider>
      <DataProvider>
        {!initialLoadingComplete && (
          <MSRLoader onComplete={handleLoadingComplete} />
        )}

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/honors" element={<HonorsPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
