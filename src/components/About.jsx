import React from 'react';
import { useData } from '../context/DataContext';

export const About = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const journey = data.academicJourney || [];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F7FAFA] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Bio */}
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-4">
              About me
            </h2>
            
            <div className="space-y-4 text-base text-[#4B5F5C] leading-relaxed">
              {Array.isArray(profile.bio) ? (
                profile.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{profile.bio || "Computer Science student at KL University focusing on backend development and algorithmic problem solving."}</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#DDE7E5] grid grid-cols-2 gap-4">
              {(profile.stats || []).map((stat, idx) => (
                <div key={idx} className="bg-white border border-[#DDE7E5] rounded-lg p-3.5 shadow-subtle">
                  <div className="text-xl font-semibold text-[#0F766E]">{stat.value}</div>
                  <div className="text-xs text-[#8A9B98] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Years at KL University Timeline */}
          <div className="md:col-span-7">
            <h3 className="text-xl font-semibold text-[#102A28] mb-6">
              4 years at KL University (2024 – 2028)
            </h3>

            <div className="relative pl-6 border-l border-[#DDE7E5] space-y-8">
              {journey.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div 
                    className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#FFFFFF] border-2 border-[#0F766E] group-hover:scale-125 transition-transform" 
                    aria-hidden="true" 
                  />
                  
                  {/* Year Tag */}
                  <div className="text-xs font-medium text-[#8A9B98] mb-1">
                    {milestone.year}
                  </div>
                  
                  {/* Title */}
                  <div className="text-base font-semibold text-[#102A28] mb-1">
                    {milestone.title}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-[#4B5F5C] leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

