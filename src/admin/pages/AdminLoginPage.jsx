import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, LogIn, ArrowLeft, AlertCircle, Lock } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-[#172554]">
      <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-card">

        {/* Shield Icon */}
        <div className="w-14 h-14 bg-[#EFF6FF] text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#DBEAFE] shadow-xs">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-2xl font-bold text-center text-[#172554] mb-1">
          Super Admin Panel
        </h1>
        <p className="text-sm text-center text-[#64748B] mb-6">
          Single-owner management system for Marthala Surendar Reddy (MSR).
        </p>

        {authError && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs leading-relaxed flex items-start gap-2 animate-fade-in">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-6 space-y-2 text-xs text-[#64748B]">
          <div className="font-semibold text-[#172554] flex items-center gap-1.5">
            <Lock size={13} className="text-[#2563EB]" />
            <span>Sole Authorized Administrator</span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between">
            <span className="font-bold text-[#172554] text-sm">Super Admin</span>
            <span className="text-[10.5px] text-[#2563EB] font-semibold bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#DBEAFE]">
              Authorized Account
            </span>
          </div>
          <p className="text-[11px] text-[#94A3B8]">
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

        <div className="pt-4 border-t border-[#E2E8F0] text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Portfolio</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
