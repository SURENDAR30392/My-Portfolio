import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Experience = () => {
  const { data } = useData();
  const rawExperience = data.experience || [];
  const experienceList = rawExperience.filter(e => e.published !== false);

  return (
    <section id="experience" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Experience</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            Technical & Practical Experience
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            Practical development roles, academic engineering labs, and collaborative software projects.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="space-y-6 max-w-4xl">
          {experienceList.map((exp) => (
            <div 
              key={exp.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-card hover:border-[#BFDBFE] hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172554]">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-[#2563EB]">
                      {exp.organization}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#64748B]">
                  {exp.dates && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] font-medium">
                      <Calendar size={13} className="text-[#2563EB]" />
                      <span>{exp.dates}</span>
                    </span>
                  )}
                  {exp.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0]">
                      <MapPin size={13} className="text-[#94A3B8]" />
                      <span>{exp.location}</span>
                    </span>
                  )}
                  {exp.isSample && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                      Sample
                    </span>
                  )}
                </div>
              </div>

              {exp.description && (
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed pl-0 sm:pl-[52px]">
                  {exp.description}
                </p>
              )}
            </div>
          ))}

          {experienceList.length === 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 text-center">
              <p className="text-sm text-[#64748B]">No published experience records available.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
