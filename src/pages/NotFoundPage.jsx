import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F3] text-[#613E35] p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white border border-[#F0DED4] rounded-2xl p-8 shadow-card">
        <div className="w-16 h-16 bg-[#FCE9DF] text-[#D98C70] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#F4C9B5] font-bold text-2xl shadow-xs">
          404
        </div>
        <h2 className="text-2xl font-bold text-[#613E35] mb-2">Page Not Found</h2>
        <p className="text-sm text-[#A27B6E] mb-8 leading-relaxed">
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
