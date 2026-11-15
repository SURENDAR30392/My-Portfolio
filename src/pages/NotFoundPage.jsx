import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAFA] text-[#102A28] p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white border border-[#DDE7E5] rounded-[12px] p-8 shadow-sm">
        <div className="w-14 h-14 bg-[#E6F4F2] text-[#0F766E] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#7CC7BD]/40 font-semibold text-xl">
          404
        </div>
        <h2 className="text-2xl font-semibold text-[#102A28] mb-2">Page Not Found</h2>
        <p className="text-sm text-[#4B5F5C] mb-8 leading-relaxed">
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

