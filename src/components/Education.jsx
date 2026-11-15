import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Education = () => {
  const { data } = useData();
  const rawEducation = data.education || [];
  const educationList = rawEducation.filter(e => e.published !== false);
  const journey = data.academicJourney || [];
  const settings = data.settings || {};

  return (
    <section id="education" className="py-16 md:py-24 bg-white border-b border-[#F0DED4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">
            {settings.educationBadge || "Education"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#613E35] tracking-tight">
            {settings.educationTitle || "Academic Background & Journey"}
          </h2>
          <p className="text-base text-[#613E35] mt-2 max-w-2xl">
            {settings.educationSubtitle || "My undergraduate Computer Science engineering curriculum and academic progression at KL University."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Formal Degree Cards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#613E35]">
              {settings.degreesTitle || "Degrees & Formal Coursework"}
            </h3>

            {educationList.map((edu) => (
              <div 
                key={edu.id}
                className="bg-[#FFF8F3] border border-[#F0DED4] rounded-2xl p-6 md:p-8 shadow-card hover:border-[#F4C9B5] transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#F4C9B5] text-[#613E35] flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#613E35]">
                      {edu.degree}
                    </h4>
                    <p className="text-base font-medium text-[#613E35]">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#613E35] mt-1.5">
                      <span className="inline-flex items-center gap-1 font-medium text-[#613E35]">
                        <Calendar size={12} className="text-[#613E35]" />
                        {edu.dates}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-[#613E35]" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-sm text-[#613E35] leading-relaxed mb-5">
                    {edu.description}
                  </p>
                )}

                {/* Highlights / Coursework */}
                {Array.isArray(edu.highlights) && edu.highlights.length > 0 && (
                  <div className="pt-4 border-t border-[#F0DED4] space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#613E35]">
                      Curriculum Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {edu.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#613E35]">
                          <CheckCircle2 size={15} className="text-[#613E35] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {educationList.length === 0 && (
              <div className="bg-[#FFF8F3] border border-[#F0DED4] rounded-xl p-8 text-center">
                <p className="text-sm text-[#613E35]">No published education records available.</p>
              </div>
            )}
          </div>

          {/* Right Column: 4-Year Academic Progression Track */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#613E35]">
              {settings.journeyTitle || "4 Years at KL University (2024 – 2028)"}
            </h3>

            <div className="relative pl-6 border-l-2 border-[#F4C9B5] space-y-6 py-2">
              {journey.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div 
                    className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#D98C70] group-hover:scale-125 transition-transform duration-150" 
                    aria-hidden="true" 
                  />
                  
                  <div className="bg-[#FFF8F3] border border-[#F0DED4] rounded-xl p-4.5 group-hover:border-[#F4C9B5] group-hover:bg-[#FCE9DF]/40 transition-all duration-150 shadow-subtle">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#613E35] mb-1">
                      {milestone.year}
                    </span>
                    <h5 className="text-base font-semibold text-[#613E35] mb-1">
                      {milestone.title}
                    </h5>
                    <p className="text-sm text-[#613E35] leading-relaxed">
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

