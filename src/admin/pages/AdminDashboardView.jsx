import React from 'react';
import { 
  Briefcase, 
  Code2, 
  Award, 
  Mail, 
  Plus, 
  ExternalLink, 
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardView = ({ setActiveTab }) => {
  const { data, isFirebaseLive } = useData();
  const { currentUser } = useAuth();

  const totalProjects = data.projects?.length || 0;
  const totalSkills = data.skills?.length || 0;
  const totalCerts = (data.certifications?.length || 0) + (data.achievements?.length || 0);
  const totalMessages = data.messages?.length || 0;
  const unreadMessages = (data.messages || []).filter(m => !m.read).length;

  const sampleCount = 
    (data.projects || []).filter(p => p.isSample).length +
    (data.skills || []).filter(s => s.isSample).length +
    (data.certifications || []).filter(c => c.isSample).length +
    (data.experience || []).filter(e => e.isSample).length +
    (data.achievements || []).filter(a => a.isSample).length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#102A28]">
            Welcome, Marthala Surendar Reddy
          </h1>
          <p className="text-sm text-[#4B5F5C] mt-1">
            Manage your personal portfolio content, review incoming inquiries, and update technical projects.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('projects')}
            className="btn-primary text-sm h-10 px-4"
          >
            <Plus size={16} />
            <span>Add Project</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className="btn-secondary text-sm h-10 px-4 relative"
          >
            <Mail size={16} />
            <span>View Inbox</span>
            {unreadMessages > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#0F766E] absolute top-2 right-2" />
            )}
          </button>
        </div>
      </div>

      {/* Sample Data Alert Notice */}
      {sampleCount > 0 && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-[#B45309]">
                {sampleCount} Sample Records Detected
              </div>
              <p className="text-xs text-[#92400E] mt-0.5">
                The portfolio is currently seeded with sample skills, projects, and certifications. You can review or clear them in the Sample Data tab.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('sampleData')}
            className="btn-secondary bg-white text-xs h-9 px-3.5 shrink-0 border-[#FCD34D] hover:bg-[#FEF3C7]"
          >
            Manage Sample Data
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div 
          onClick={() => setActiveTab('projects')}
          className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8A9B98] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="text-3xl font-semibold text-[#102A28]">{totalProjects}</div>
          <div className="text-xs text-[#4B5F5C] mt-1">
            {(data.projects || []).filter(p => p.featured).length} featured projects
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('skills')}
          className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8A9B98] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Skills</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
              <Code2 size={16} />
            </div>
          </div>
          <div className="text-3xl font-semibold text-[#102A28]">{totalSkills}</div>
          <div className="text-xs text-[#4B5F5C] mt-1">
            Across 3 core categories
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('certifications')}
          className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8A9B98] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Certifications</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div className="text-3xl font-semibold text-[#102A28]">{totalCerts}</div>
          <div className="text-xs text-[#4B5F5C] mt-1">
            Honors & verified credentials
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('messages')}
          className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8A9B98] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Messages</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
              <Mail size={16} />
            </div>
          </div>
          <div className="text-3xl font-semibold text-[#102A28]">{totalMessages}</div>
          <div className="text-xs text-[#0F766E] font-medium mt-1">
            {unreadMessages} unread inquiries
          </div>
        </div>

      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Messages */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#102A28]">
              Recent Contact Inquiries
            </h3>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs text-[#0F766E] hover:underline font-medium"
            >
              View all ({totalMessages})
            </button>
          </div>

          {(data.messages || []).length === 0 ? (
            <p className="text-sm text-[#8A9B98] py-8 text-center">
              No messages received yet. Submissions through the Contact form will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {(data.messages || []).slice(0, 3).map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setActiveTab('messages')}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    !msg.read 
                      ? 'bg-[#E6F4F2]/50 border-[#7CC7BD]' 
                      : 'bg-[#F7FAFA] border-[#DDE7E5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#102A28]">{msg.name}</span>
                    <span className="text-xs text-[#8A9B98]">
                      {new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#4B5F5C] mt-1 line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database & Sync Status */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#102A28] mb-4">
              System Architecture & Health
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F7FAFA] border border-[#DDE7E5] text-xs">
                <span className="text-[#4B5F5C]">Database Engine</span>
                <span className="font-semibold text-[#102A28]">
                  {isFirebaseLive ? 'Cloud Firestore (Live)' : 'Local Storage Cache'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F7FAFA] border border-[#DDE7E5] text-xs">
                <span className="text-[#4B5F5C]">Admin Identity</span>
                <div className="text-right">
                  <span className="font-semibold text-[#102A28] block">Super Admin</span>
                  <span className="text-[10.5px] text-[#0F766E] font-medium block">Authorized Account</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#E6F4F2] border border-[#7CC7BD]/50 text-xs">
                <div>
                  <span className="text-[#0F766E] font-medium block">Firebase Auth UID</span>
                  <span className="text-[10px] text-[#8A9B98]">Verified Authorization Key</span>
                </div>
                <span className="font-mono font-semibold text-[#102A28] bg-white px-2 py-1 rounded border border-[#DDE7E5] select-all">
                  {currentUser?.uid || "HOHTgjkAZlTPOO7bH98ukkw2vip1"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F7FAFA] border border-[#DDE7E5] text-xs">
                <span className="text-[#4B5F5C]">Image Pipeline</span>
                <span className="font-semibold text-[#102A28]">Spark Plan (Image URLs)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE7E5] flex items-center justify-between text-xs text-[#8A9B98]">
            <span>Portfolio Version: 1.0.0</span>
            <span className="text-[#0F766E] font-medium">KL University 2028</span>
          </div>
        </div>

      </div>

    </div>
  );
};

