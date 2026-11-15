import React, { useState } from 'react';
import { ArrowRight, Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Projects = ({ onSelectProject }) => {
  const { data } = useData();
  const [filter, setFilter] = useState('all');

  const rawProjects = data.projects || [];
  const publishedProjects = rawProjects.filter(p => p.published !== false);

  const filteredProjects = filter === 'all' 
    ? publishedProjects 
    : filter === 'featured'
      ? publishedProjects.filter(p => p.featured)
      : publishedProjects.filter(p => p.level?.toLowerCase() === filter.toLowerCase());

  return (
    <section id="work" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-badge mb-3">Projects</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
              Featured Software Engineering Work
            </h2>
            <p className="text-base text-[#64748B] mt-2 max-w-2xl">
              Software platforms, backend architectures, data structures implementations, and full-stack web applications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['all', 'featured', 'advanced', 'intermediate'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                  filter === cat
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => {
            const techList = Array.isArray(project.techUsed) 
              ? project.techUsed 
              : typeof project.techUsed === 'string' 
                ? project.techUsed.split(',').map(t => t.trim()) 
                : [];

            const visibleTech = techList.slice(0, 3);
            const extraCount = techList.length - 3;
            const level = project.level || 'Intermediate';

            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Image Container with Badge Overlays */}
                  <div className="relative aspect-[16/10] bg-[#EFF6FF] border-b border-[#E2E8F0] overflow-hidden">
                    {level && (
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10.5px] font-semibold uppercase tracking-wider bg-white/95 text-[#172554] border border-[#E2E8F0] shadow-xs backdrop-blur-sm">
                        {level}
                      </div>
                    )}

                    {project.isSample && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                        Sample Project
                      </div>
                    )}

                    <img
                      src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-[#172554] mb-2 line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Tech tags + action links */}
                <div className="p-5 sm:p-6 pt-0">
                  {visibleTech.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {visibleTech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]"
                        >
                          {tech}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span 
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                          title={techList.slice(3).join(', ')}
                        >
                          +{extraCount}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3.5 border-t border-[#E2E8F0]">
                    <span className="link-accent text-sm inline-flex items-center gap-1.5">
                      <span>Explore details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub source code for ${project.title}`}
                          className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-md transition-colors"
                          title="Source Code"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live preview of ${project.title}`}
                          className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-md transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-12 text-center my-6">
            <FolderGit2 size={32} className="mx-auto text-[#94A3B8] mb-3" />
            <p className="text-sm font-medium text-[#64748B]">No projects found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
