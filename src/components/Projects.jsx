import React, { useState } from 'react';
import { ArrowRight, Github, ExternalLink, Sparkles } from 'lucide-react';
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
    <section id="work" className="py-16 md:py-24 bg-[#EEF4F3] border-t border-[#DDE7E5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
              Selected work
            </h2>
            <p className="text-base text-[#4B5F5C] max-w-[620px]">
              A selection of software projects I've built, spanning backend systems, data structures, and full-stack web applications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'featured', 'advanced', 'intermediate'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === cat
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#4B5F5C] border border-[#DDE7E5] hover:bg-[#E6F4F2] hover:text-[#0F766E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl overflow-hidden shadow-sm hover:border-[#7CC7BD] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Aspect Ratio Image Container */}
                  <div className="relative aspect-[16/10] bg-[#E6F4F2] border-b border-[#DDE7E5] overflow-hidden">
                    {level && (
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10.5px] font-semibold uppercase tracking-wider bg-white/95 text-[#102A28] border border-[#DDE7E5] shadow-xs backdrop-blur-sm">
                        {level}
                      </div>
                    )}

                    {project.isSample && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309] border border-[#FCD34D]">
                        Sample Project
                      </div>
                    )}

                    <img
                      src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#102A28] mb-1.5 line-clamp-1 group-hover:text-[#0F766E] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#4B5F5C] leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Tech tags + action */}
                <div className="p-5 pt-0">
                  {visibleTech.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {visibleTech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#E6F4F2] text-[#0F766E] border border-[#DDE7E5]"
                        >
                          {tech}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span 
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#EEF4F3] text-[#4B5F5C] border border-[#DDE7E5]"
                          title={techList.slice(3).join(', ')}
                        >
                          +{extraCount}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-[#DDE7E5]">
                    <span className="link-accent text-sm inline-flex items-center gap-1.5">
                      <span>View details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="p-1.5 rounded-md text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2] transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="p-1.5 rounded-md text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2] transition-colors"
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

      </div>
    </section>
  );
};

