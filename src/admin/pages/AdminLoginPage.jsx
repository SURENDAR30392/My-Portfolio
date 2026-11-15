import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, LogIn, ArrowLeft, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const { loginWithGoogle, isAdmin, authError, superAdminEmail } = useAuth();
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAFA] p-6 text-[#102A28]">
      <div className="max-w-md w-full bg-white border border-[#DDE7E5] rounded-xl p-8 shadow-sm">
        
        {/* Shield Icon */}
        <div className="w-14 h-14 bg-[#E6F4F2] text-[#0F766E] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#7CC7BD]/40">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-2xl font-semibold text-center text-[#102A28] mb-1">
          Super Admin Panel
        </h1>
        <p className="text-sm text-center text-[#4B5F5C] mb-6">
          Single-owner management system for Marthala Surendar Reddy (MSR).
        </p>

        {authError && (
          <div className="mb-6 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs leading-relaxed flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-4 mb-6 space-y-2 text-xs text-[#4B5F5C]">
          <div className="font-semibold text-[#102A28] flex items-center gap-1.5">
            <Lock size={13} className="text-[#0F766E]" />
            <span>Sole Authorized Administrator</span>
          </div>
          <p>
            This dashboard is strictly private. Exactly one administrator account is authorized to sign in:
          </p>
          <div className="font-mono text-[11.5px] font-semibold text-[#0F766E] bg-white px-2.5 py-1.5 rounded border border-[#DDE7E5]">
            {superAdminEmail}
          </div>
          <p className="text-[11px] text-[#8A9B98]">
            Any other Google account will be automatically denied and immediately signed out.
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

        <div className="pt-4 border-t border-[#DDE7E5] text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#8A9B98] hover:text-[#0F766E] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Portfolio</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
