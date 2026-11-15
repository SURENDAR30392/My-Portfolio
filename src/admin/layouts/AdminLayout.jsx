import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  Settings, 
  Database, 
  LogOut, 
  ExternalLink, 
  CheckCircle, 
  Menu, 
  X,
  History,
  ShieldCheck,
  Images,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminLayout = ({ activeTab, setActiveTab, children }) => {
  const { logout, currentUser } = useAuth();
  const { data, isFirebaseLive, notification } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Calculate badges
  const unreadMessagesCount = (data.messages || []).filter(m => !m.read).length;
  
  const sampleItemsCount = 
    (data.projects || []).filter(p => p.isSample).length +
    (data.skills || []).filter(s => s.isSample).length +
    (data.certifications || []).filter(c => c.isSample).length +
    (data.experience || []).filter(e => e.isSample).length +
    (data.achievements || []).filter(a => a.isSample).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Personal Information', icon: User },
    { id: 'codingProfiles', label: 'Coding Profiles', icon: GitBranch },
    { id: 'images', label: 'Image Management', icon: Images },
    { id: 'projects', label: 'Projects', icon: Briefcase, badge: data.projects?.length },
    { id: 'skills', label: 'Skills', icon: Code2, badge: data.skills?.length },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: History },
    { id: 'certifications', label: 'Certifications', icon: Award, badge: (data.certifications?.length || 0) + (data.achievements?.length || 0) },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'messages', label: 'Contact Messages', icon: Mail, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null, badgeColor: 'bg-[#D98C70] text-white' },
    { id: 'sampleData', label: 'Sample Data', icon: Database, badge: sampleItemsCount > 0 ? sampleItemsCount : null, badgeColor: 'bg-[#FEF3C7] text-[#92400E]' },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col font-sans text-[#613E35]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#613E35] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm animate-fade-in border border-[#F4C9B5]/30">
          <CheckCircle size={18} className="text-[#F4C9B5]" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#F0DED4] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-[#613E35] hover:bg-[#FCE9DF] md:hidden"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="text-base font-bold text-[#613E35] flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#D98C70] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              MSR
            </span>
            <span className="hidden sm:inline">Super Admin Panel</span>
          </Link>

          {/* Sync indicator */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FCE9DF] text-[#613E35] border border-[#F4C9B5]">
            <span className={`w-2 h-2 rounded-full ${isFirebaseLive ? 'bg-[#10B981]' : 'bg-[#D98C70]'} animate-pulse`} />
            <span>{isFirebaseLive ? 'Firestore Live Sync' : 'Local Storage Mode'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="text-xs font-semibold text-[#613E35] hover:text-[#D98C70] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F0DED4] hover:bg-[#FCE9DF] hover:border-[#F4C9B5] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink size={13} />
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#F0DED4] text-xs">
            <ShieldCheck size={16} className="text-[#613E35]" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-[#613E35] leading-tight">Super Admin</span>
              <span className="text-[10px] text-[#613E35] font-medium leading-tight">MSR Verified</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-[#613E35] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:static inset-y-16 left-0 z-30 w-64 bg-white border-r border-[#F0DED4] p-4 flex flex-col justify-between transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#613E35]">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FCE9DF] text-[#613E35] font-bold border border-[#F4C9B5]/60'
                      : 'text-[#613E35] hover:bg-[#FFF8F3] hover:text-[#613E35]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-[#613E35]' : 'text-[#613E35]'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge !== null && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor || 'bg-[#FCE9DF] text-[#613E35]'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#F0DED4] space-y-2">
            <div className="text-[11px] text-[#613E35] px-3 font-medium">
              MSR Portfolio · v2.0 Light
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/20 md:hidden"
          />
        )}

        {/* Main Content Pane */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
