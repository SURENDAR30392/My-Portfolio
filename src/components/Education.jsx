import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Education = () => {
  const { data } = useData();
  const rawEducation = data.education || [];
  const educationList = rawEducation.filter(e => e.published !== false);
  const journey = data.academicJourney || [];

  return (
    <section id="education" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Education</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            Academic Background & Journey
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            My undergraduate Computer Science engineering curriculum and academic progression at KL University.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Formal Degree Cards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#172554]">
              Degrees & Formal Coursework
            </h3>

            {educationList.map((edu) => (
              <div 
                key={edu.id}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-card hover:border-[#BFDBFE] transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#172554]">
                      {edu.degree}
                    </h4>
                    <p className="text-base font-medium text-[#2563EB]">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B] mt-1.5">
                      <span className="inline-flex items-center gap-1 font-medium text-[#172554]">
                        <Calendar size={12} className="text-[#2563EB]" />
                        {edu.dates}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-[#94A3B8]" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-sm text-[#334155] leading-relaxed mb-5">
                    {edu.description}
                  </p>
                )}

                {/* Highlights / Coursework */}
                {Array.isArray(edu.highlights) && edu.highlights.length > 0 && (
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Curriculum Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {edu.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#334155]">
                          <CheckCircle2 size={15} className="text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {educationList.length === 0 && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 text-center">
                <p className="text-sm text-[#64748B]">No published education records available.</p>
              </div>
            )}
          </div>

          {/* Right Column: 4-Year Academic Progression Track */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#172554]">
              4 Years at KL University (2024 – 2028)
            </h3>

            <div className="relative pl-6 border-l-2 border-[#DBEAFE] space-y-6 py-2">
              {journey.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div 
                    className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#2563EB] group-hover:scale-125 transition-transform duration-150" 
                    aria-hidden="true" 
                  />
                  
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4.5 group-hover:border-[#BFDBFE] group-hover:bg-[#EFF6FF]/40 transition-all duration-150 shadow-subtle">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                      {milestone.year}
                    </span>
                    <h5 className="text-base font-semibold text-[#172554] mb-1">
                      {milestone.title}
                    </h5>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
