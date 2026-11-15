import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Sparkles } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
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

  if (!project) return null;

  const techList = Array.isArray(project.techUsed)
    ? project.techUsed
    : typeof project.techUsed === 'string'
      ? project.techUsed.split(',').map(t => t.trim())
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#172554]/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E2E8F0] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] bg-[#EFF6FF] border-b border-[#E2E8F0] overflow-hidden">
          <img
            src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-[#172554] hover:bg-white transition-colors shadow-sm focus:outline-none"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {project.level && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-[#172554] border border-[#E2E8F0] shadow-xs">
              {project.level}
            </div>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-2xl font-bold text-[#172554]">
                {project.title}
              </h3>
              {project.isSample && (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                  Sample
                </span>
              )}
            </div>
            <p className="text-base text-[#334155] leading-relaxed mt-2">
              {project.description}
            </p>
          </div>

          {/* Problem / Challenge Block */}
          {project.problem && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4.5 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                The Engineering Challenge
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Solution / Approach Block */}
          {project.solution && (
            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-4.5 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Architectural Solution
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <div className="text-sm font-semibold text-[#172554] mb-2.5">
              Technologies & Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techList.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm h-10 px-4"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm h-10 px-4"
                >
                  <ExternalLink size={16} />
                  <span>Live Project</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-[#64748B] hover:text-[#172554] px-3 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
