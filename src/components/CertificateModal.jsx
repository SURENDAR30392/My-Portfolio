import React, { useEffect } from 'react';
import { X, ExternalLink, Award, Calendar } from 'lucide-react';

export const CertificateModal = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#613E35]/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-[#F0DED4] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-[#F0DED4] flex items-start justify-between bg-[#FFF8F3]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#D98C70] flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#613E35] leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-[#A27B6E] mt-0.5">
                {cert.organization || "Verified Credential"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A27B6E] hover:text-[#613E35] hover:bg-[#FCE9DF] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {cert.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[#F0DED4] bg-[#FCE9DF] aspect-[16/10]">
              <img 
                src={cert.imageUrl} 
                alt={cert.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {cert.description && (
            <p className="text-sm text-[#613E35] leading-relaxed">
              {cert.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-[#A27B6E]">
            <Calendar size={14} className="text-[#D98C70]" />
            <span>Issued: {cert.date || cert.issueDate || "2025"}</span>
            {cert.isSample && (
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                Sample Record
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-between">
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm h-10 px-4"
              >
                <span>Verify Credential</span>
                <ExternalLink size={15} />
              </a>
            ) : (
              <span className="text-xs text-[#A27B6E]">Verified academic milestone</span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-[#A27B6E] hover:text-[#613E35] px-3 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
