import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-[#172554] p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-card">
        <div className="w-16 h-16 bg-[#EFF6FF] text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#DBEAFE] font-bold text-2xl shadow-xs">
          404
        </div>
        <h2 className="text-2xl font-bold text-[#172554] mb-2">Page Not Found</h2>
        <p className="text-sm text-[#64748B] mb-8 leading-relaxed">
          The requested page could not be located. It might have been moved or removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <Home size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
