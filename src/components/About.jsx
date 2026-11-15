import React from 'react';
import { useData } from '../context/DataContext';
import { Code2, Cpu, GraduationCap } from 'lucide-react';

export const About = () => {
  const { data } = useData();
  const profile = data.profile || {};

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-[#F0DED4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">About Me</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#613E35] tracking-tight">
            Engineering Software with Precision & Discipline
          </h2>
          <p className="text-base text-[#613E35] mt-2 max-w-2xl">
            A closer look at my background, technical focus, and software craftsmanship principles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Narrative Bio & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[#613E35] leading-relaxed">
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
                { label: "CodeChef / LeetCode", value: "Active" },
                { label: "Expected Grad", value: "2028" }
              ]).map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FFF8F3] border border-[#F0DED4] rounded-xl p-4 shadow-subtle hover:border-[#F4C9B5] hover:shadow-xs transition-all duration-150 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#613E35]">{stat.value}</div>
                  <div className="text-xs text-[#613E35] font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Philosophy & Technical Pillars */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Philosophy Card */}
            <div className="bg-[#FCE9DF] border border-[#F4C9B5] rounded-2xl p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-semibold text-[#613E35]">
                {profile.craftsmanshipTitle || "Software Craftsmanship"}
              </h3>
              <p className="text-sm text-[#613E35] leading-relaxed">
                "{profile.craftsmanshipQuote || profile.craftsmanshipText || "I believe in building software that balances computational rigor with clean, intuitive design. Whether architecting backend microservices, optimizing database schemas, or writing frontend modules, I prioritize readability, efficiency, and maintainability."}"
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="bg-[#FFF8F3] border border-[#F0DED4] rounded-2xl p-6 space-y-4 shadow-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#613E35]">
                {profile.focusHeading || "Key Engineering Focus"}
              </h4>

              <div className="space-y-3">
                {(profile.engineeringFocus || [
                  {
                    title: "Backend Systems & Java",
                    desc: "Object-oriented architecture, RESTful services, and relational database modeling.",
                    icon: "Cpu"
                  },
                  {
                    title: "Data Structures & Algorithms",
                    desc: "Continuous problem solving across arrays, trees, dynamic programming, and graphs.",
                    icon: "Code2"
                  },
                  {
                    title: "Continuous Academic Learning",
                    desc: "B.Tech CSE student at KL University actively participating in technical communities.",
                    icon: "GraduationCap"
                  }
                ]).map((pillar, idx) => {
                  const Icon = pillar.icon === 'Code2' ? Code2 : pillar.icon === 'GraduationCap' ? GraduationCap : Cpu;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#F0DED4] text-[#613E35] flex items-center justify-center shrink-0 shadow-xs">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#613E35]">{pillar.title}</h5>
                        <p className="text-xs text-[#613E35] mt-0.5">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
