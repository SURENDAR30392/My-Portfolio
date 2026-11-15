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
  AlertTriangle,
  GitBranch
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
      <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 md:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#613E35]">
            Welcome, Marthala Surendar Reddy
          </h1>
          <p className="text-sm text-[#613E35] mt-1">
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
            onClick={() => setActiveTab('codingProfiles')}
            className="btn-secondary text-sm h-10 px-4"
          >
            <GitBranch size={16} />
            <span>Coding Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className="btn-secondary text-sm h-10 px-4 relative"
          >
            <Mail size={16} />
            <span>View Inbox</span>
            {unreadMessages > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#D98C70] absolute -top-1 -right-1" />
            )}
          </button>
        </div>
      </div>

      {/* Sample Data Alert Notice */}
      {sampleCount > 0 && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#B45309]">
                {sampleCount} Sample Records Detected
              </div>
              <p className="text-xs text-[#92400E] mt-0.5">
                The portfolio has sample records. You can review or clear them in the Sample Data tab.
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
          className="bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-card hover:border-[#F4C9B5] hover:shadow-card-hover transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#613E35] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Projects</span>
            <div className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#613E35]">{totalProjects}</div>
          <div className="text-xs text-[#613E35] mt-1 font-medium">
            {(data.projects || []).filter(p => p.featured).length} featured projects
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('skills')}
          className="bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-card hover:border-[#F4C9B5] hover:shadow-card-hover transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#613E35] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Skills</span>
            <div className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center">
              <Code2 size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#613E35]">{totalSkills}</div>
          <div className="text-xs text-[#613E35] mt-1 font-medium">
            Across 3 core categories
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('certifications')}
          className="bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-card hover:border-[#F4C9B5] hover:shadow-card-hover transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#613E35] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Certifications</span>
            <div className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#613E35]">{totalCerts}</div>
          <div className="text-xs text-[#613E35] mt-1 font-medium">
            Honors & verified credentials
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('messages')}
          className="bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-card hover:border-[#F4C9B5] hover:shadow-card-hover transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#613E35] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Messages</span>
            <div className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center">
              <Mail size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#613E35]">{totalMessages}</div>
          <div className="text-xs text-[#613E35] font-bold mt-1">
            {unreadMessages} unread inquiries
          </div>
        </div>

      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Messages */}
        <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#613E35]">
              Recent Contact Inquiries
            </h3>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs text-[#613E35] hover:underline font-semibold"
            >
              View all ({totalMessages})
            </button>
          </div>

          {(data.messages || []).length === 0 ? (
            <p className="text-sm text-[#613E35] py-8 text-center">
              No messages received yet. Submissions through the Contact form will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {(data.messages || []).slice(0, 3).map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setActiveTab('messages')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    !msg.read 
                      ? 'bg-[#FCE9DF]/60 border-[#F4C9B5]' 
                      : 'bg-[#FFF8F3] border-[#F0DED4]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#613E35]">{msg.name}</span>
                    <span className="text-xs text-[#613E35]">
                      {new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#613E35] mt-1 line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database & Sync Status */}
        <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#613E35] mb-4">
              System Architecture & Health
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8F3] border border-[#F0DED4] text-xs">
                <span className="text-[#613E35]">Database Engine</span>
                <span className="font-bold text-[#613E35]">
                  {isFirebaseLive ? 'Cloud Firestore (Live)' : 'Local Storage Cache'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8F3] border border-[#F0DED4] text-xs">
                <span className="text-[#613E35]">Admin Identity</span>
                <div className="text-right">
                  <span className="font-bold text-[#613E35] block">Super Admin</span>
                  <span className="text-[10.5px] text-[#613E35] font-semibold block">Authorized Account</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-xs">
                <div>
                  <span className="text-[#613E35] font-bold block">Firebase Auth UID</span>
                  <span className="text-[10px] text-[#613E35]">Verified Authorization Key</span>
                </div>
                <span className="font-mono font-bold text-[#613E35] bg-white px-2 py-1 rounded-md border border-[#F0DED4] select-all">
                  {currentUser?.uid || "HOHTgjkAZlTPOO7bH98ukkw2vip1"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8F3] border border-[#F0DED4] text-xs">
                <span className="text-[#613E35]">Image Pipeline</span>
                <span className="font-bold text-[#613E35]">Spark Plan (Image URLs)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8F3] border border-[#F0DED4] text-xs">
                <span className="text-[#613E35]">Production Live URL</span>
                <a
                  href="https://marthala-surendar-reddy.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#613E35] hover:underline inline-flex items-center gap-1"
                >
                  <span>marthala-surendar-reddy.web.app</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-between text-xs text-[#613E35]">
            <span>Portfolio Version: 2.0.0 Light</span>
            <span className="text-[#613E35] font-semibold">KL University · 2028</span>
          </div>
        </div>

      </div>

    </div>
  );
};
