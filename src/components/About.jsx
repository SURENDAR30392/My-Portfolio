import React from 'react';
import { useData } from '../context/DataContext';
import { Code2, Compass, Cpu, GraduationCap, Sparkles } from 'lucide-react';

export const About = () => {
  const { data } = useData();
  const profile = data.profile || {};

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">About Me</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            Engineering Software with Precision & Discipline
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            A closer look at my background, technical focus, and software craftsmanship principles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Narrative Bio & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[#334155] leading-relaxed">
              {Array.isArray(profile.bio) ? (
                profile.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{profile.bio || "Computer Science student at KL University focusing on backend development, scalable architectures, and algorithmic problem solving."}</p>
              )}
            </div>

            {/* Core Stats Grid */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {(profile.stats || [
                { label: "DSA Problems", value: "200+" },
                { label: "Projects Built", value: "8+" },
                { label: "Competitive Coding", value: "Active" },
                { label: "Graduation", value: "2028" }
              ]).map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 shadow-subtle hover:border-[#BFDBFE] hover:shadow-xs transition-all duration-150 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#2563EB]">{stat.value}</div>
                  <div className="text-xs text-[#64748B] font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Philosophy & Technical Pillars */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Philosophy Card */}
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#2563EB] flex items-center justify-center shadow-xs">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#172554]">
                Software Craftsmanship
              </h3>
              <p className="text-sm text-[#334155] leading-relaxed">
                "I believe in building software that balances computational rigor with clean, intuitive design. Whether architecting backend microservices, optimizing database schemas, or writing frontend modules, I prioritize readability, efficiency, and maintainability."
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 space-y-4 shadow-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Key Engineering Focus
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#172554]">Backend Systems & Java</h5>
                    <p className="text-xs text-[#64748B] mt-0.5">Object-oriented architecture, RESTful services, and relational database modeling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#172554]">Data Structures & Algorithms</h5>
                    <p className="text-xs text-[#64748B] mt-0.5">Continuous problem solving across arrays, trees, dynamic programming, and graphs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#172554]">Continuous Academic Learning</h5>
                    <p className="text-xs text-[#64748B] mt-0.5">B.Tech CSE student at KL University actively participating in technical communities.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
