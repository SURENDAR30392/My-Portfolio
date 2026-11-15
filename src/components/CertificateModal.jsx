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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#102A28]/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-[#DDE7E5] rounded-xl max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-[#DDE7E5] flex items-start justify-between bg-[#F7FAFA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#102A28] leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs text-[#8A9B98] mt-0.5">
                {cert.organization || "Verified Credential"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A9B98] hover:text-[#102A28] hover:bg-[#E6F4F2] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {cert.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-[#DDE7E5] bg-[#E6F4F2] aspect-[16/10]">
              <img 
                src={cert.imageUrl} 
                alt={cert.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}

          {cert.description && (
            <p className="text-sm text-[#4B5F5C] leading-relaxed">
              {cert.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-[#8A9B98]">
            <Calendar size={14} className="text-[#0F766E]" />
            <span>Issued: {cert.date || cert.issueDate || "2025"}</span>
            {cert.isSample && (
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309] border border-[#FCD34D]">
                Sample Record
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-[#DDE7E5] flex items-center justify-between">
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
              <span className="text-xs text-[#8A9B98]">Verified by institution</span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm h-10 px-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

