import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, LogIn, ArrowLeft, AlertCircle, Lock, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const { loginWithGoogle, isAdmin, authError } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSignIn = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F3] p-6 text-[#613E35]">
      <div className="max-w-md w-full bg-white border border-[#F0DED4] rounded-2xl p-8 shadow-card">

        {/* Shield Icon */}
        <div className="w-14 h-14 bg-[#FCE9DF] text-[#613E35] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#F4C9B5] shadow-xs">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-2xl font-bold text-center text-[#613E35] mb-1">
          Super Admin Panel
        </h1>
        <p className="text-sm text-center text-[#613E35] mb-6">
          Single-owner management system for Marthala Surendar Reddy (MSR).
        </p>

        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-[#FFF8F3] border border-[#F4C9B5] text-[#613E35] text-xs leading-relaxed animate-fade-in space-y-2.5">
            <div className="flex items-start gap-2 text-[#D98C70] font-semibold">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>Authentication Notice</span>
            </div>
            <p className="text-xs text-[#613E35]">{authError}</p>
            {authError.toLowerCase().includes('unauthorized') && (
              <div className="pt-2.5 border-t border-[#F0DED4] space-y-2 text-[#613E35]">
                <p className="text-[11px] leading-relaxed">
                  <strong>Quick 1-step fix:</strong> Go to Firebase Console &rarr; <strong>Authentication</strong> &rarr; <strong>Settings</strong> &rarr; <strong>Authorized domains</strong>, click <strong>Add domain</strong> and add:
                </p>
                <div className="p-2 rounded bg-white border border-[#F0DED4] font-mono text-[11px] text-[#613E35] select-all">
                  marthala-surendar-reddy.web.app
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href="https://console.firebase.google.com/project/msr-portfolio-5c52f/authentication/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#D98C70] hover:underline text-xs"
                  >
                    <span>Open Firebase Console Auth Settings</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://msr-portfolio-5c52f.web.app/admin"
                    className="inline-flex items-center gap-1 font-medium text-[#A27B6E] hover:text-[#613E35] text-[11px]"
                  >
                    <span>Or log in via default domain: msr-portfolio-5c52f.web.app/admin</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-[#FFF8F3] border border-[#F0DED4] rounded-xl p-4 mb-6 space-y-2 text-xs text-[#613E35]">
          <div className="font-semibold text-[#613E35] flex items-center gap-1.5">
            <Lock size={13} className="text-[#613E35]" />
            <span>Sole Authorized Administrator</span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-[#F0DED4] flex items-center justify-between">
            <span className="font-bold text-[#613E35] text-sm">Super Admin</span>
            <span className="text-[10.5px] text-[#613E35] font-semibold bg-[#FCE9DF] px-2.5 py-1 rounded-full border border-[#F4C9B5]">
              Authorized Account
            </span>
          </div>
          <p className="text-[11px] text-[#613E35]">
            Restricted single-owner dashboard. Any unauthorized Google account will be automatically denied and signed out.
          </p>
        </div>

        {/* Single Google Sign-In Button */}
        <button
          type="button"
          onClick={handleSignIn}
          className="btn-primary w-full justify-center h-11 text-sm font-medium gap-2.5 mb-4 shadow-sm"
        >
          <LogIn size={18} />
          <span>Sign In with Google</span>
        </button>

        <div className="pt-4 border-t border-[#F0DED4] text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#613E35] hover:text-[#D98C70] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Portfolio</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
