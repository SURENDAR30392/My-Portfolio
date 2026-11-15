import React from 'react';
import { useData } from '../context/DataContext';

export const Skills = () => {
  const { data } = useData();
  const allSkills = data.skills || [];

  // Categorize skills dynamically
  const categories = [
    {
      title: "Programming Languages & Algorithms",
      filter: (s) => s.category?.includes("Programming") || ["Java", "Python", "C", "C++", "JavaScript", "Algorithms"].some(k => s.name?.includes(k))
    },
    {
      title: "Backend & Cloud Systems",
      filter: (s) => s.category?.includes("Backend") || ["Spring", "Node", "MySQL", "Postgres", "Firebase", "AWS", "Docker"].some(k => s.name?.includes(k))
    },
    {
      title: "Frontend & Developer Tools",
      filter: (s) => s.category?.includes("Frontend") || ["React", "HTML", "CSS", "Tailwind", "Git", "Postman", "Linux"].some(k => s.name?.includes(k))
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-[#EEF4F3] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
            Skills & capabilities
          </h2>
          <p className="text-base text-[#4B5F5C] max-w-[620px]">
            The core programming languages, distributed backend systems, and developer tools I leverage to build scalable software.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, idx) => {
            const categorySkills = allSkills.filter(cat.filter);

            return (
              <div 
                key={idx}
                className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#102A28] mb-5 pb-3 border-b border-[#DDE7E5]">
                    {cat.title}
                  </h3>

                  <ul className="space-y-3.5">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="flex items-center justify-between text-sm text-[#4B5F5C]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" aria-hidden="true" />
                          <span className="font-medium text-[#102A28]">{skill.name}</span>
                        </div>
                        {skill.proficiency && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#EEF4F3] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#0F766E] rounded-full" 
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#8A9B98] w-7 text-right">{skill.proficiency}%</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE7E5]/60 text-xs text-[#8A9B98] flex items-center justify-between">
                  <span>{categorySkills.length} competencies</span>
                  <span className="text-[#0F766E] font-medium">Production-ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {allSkills.length === 0 && (
          <div className="bg-white border border-[#DDE7E5] rounded-xl p-12 text-center my-6">
            <p className="text-sm text-[#4B5F5C]">No published skills found.</p>
          </div>
        )}

      </div>
    </section>
  );
};

