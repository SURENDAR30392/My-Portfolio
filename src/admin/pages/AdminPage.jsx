import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboardView } from './AdminDashboardView';
import { AdminProfileView } from './AdminProfileView';
import { AdminImageManagementView } from './AdminImageManagementView';
import { AdminProjectsView } from './AdminProjectsView';
import { AdminSkillsView } from './AdminSkillsView';
import { AdminEducationView } from './AdminEducationView';
import { AdminExperienceView } from './AdminExperienceView';
import { AdminCertificationsView } from './AdminCertificationsView';
import { AdminResumeView } from './AdminResumeView';
import { AdminMessagesView } from './AdminMessagesView';
import { AdminSettingsView } from './AdminSettingsView';
import { AdminSampleDataView } from './AdminSampleDataView';

export const AdminPage = () => {
  const { isAdmin, authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFA] text-[#102A28]">
        <div className="flex flex-col items-center gap-3">
          <span className="font-semibold text-2xl text-[#0F766E] animate-pulse">MSR Admin</span>
          <span className="text-xs text-[#8A9B98]">Verifying Security Access...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardView setActiveTab={setActiveTab} />;
      case 'profile':
        return <AdminProfileView />;
      case 'images':
        return <AdminImageManagementView />;
      case 'projects':
        return <AdminProjectsView />;
      case 'skills':
        return <AdminSkillsView />;
      case 'education':
        return <AdminEducationView />;
      case 'experience':
        return <AdminExperienceView />;
      case 'certifications':
        return <AdminCertificationsView />;
      case 'resume':
        return <AdminResumeView />;
      case 'messages':
        return <AdminMessagesView />;
      case 'settings':
        return <AdminSettingsView />;
      case 'sampleData':
        return <AdminSampleDataView />;
      default:
        return <AdminDashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderModule()}
    </AdminLayout>
  );
};

