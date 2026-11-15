import React from 'react';
import { useData } from '../context/DataContext';
import { Code2, Server, Layout, CheckCircle } from 'lucide-react';

export const Skills = () => {
  const { data } = useData();
  const allSkills = (data.skills || []).filter(s => s.published !== false);

  // Categorize skills dynamically
  const categories = [
    {
      title: "Programming Languages & DSA",
      icon: Code2,
      description: "Object-oriented programming, data structures, and algorithmic complexity",
      filter: (s) => s.category?.includes("Programming") || ["Java", "Python", "C", "C++", "JavaScript", "Algorithms"].some(k => s.name?.includes(k))
    },
    {
      title: "Backend, Databases & Cloud",
      icon: Server,
      description: "REST microservices, relational schemas, NoSQL, and containerization",
      filter: (s) => s.category?.includes("Backend") || ["Spring", "Node", "MySQL", "Postgres", "Firebase", "AWS", "Docker"].some(k => s.name?.includes(k))
    },
    {
      title: "Frontend & Engineering Tools",
      icon: Layout,
      description: "Modern component-driven web interfaces, version control, and API testing",
      filter: (s) => s.category?.includes("Frontend") || ["React", "HTML", "CSS", "Tailwind", "Git", "Postman", "Linux"].some(k => s.name?.includes(k))
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-[#FFF8F3] border-b border-[#F0DED4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Skills</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#613E35] tracking-tight">
            Skills & Technical Capabilities
          </h2>
          <p className="text-base text-[#613E35] mt-2 max-w-2xl">
            The core programming languages, distributed backend systems, and developer tools I leverage to build scalable software.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const categorySkills = allSkills.filter(cat.filter);
            const CategoryIcon = cat.icon;

            return (
              <div 
                key={idx}
                className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card hover:border-[#F4C9B5] hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#F0DED4]">
                    <div className="w-10 h-10 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center shrink-0">
                      <CategoryIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#613E35]">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-[#613E35] leading-snug mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-3.5">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D98C70]" aria-hidden="true" />
                          <span className="font-medium text-[#613E35]">{skill.name}</span>
                        </div>
                        {skill.proficiency && (
                          <div className="flex items-center gap-2.5">
                            <div className="w-20 sm:w-24 h-1.5 bg-[#FCE9DF] border border-[#F4C9B5]/40 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#D98C70] to-[#F4C9B5] rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-[#613E35] w-8 text-right">
                              {skill.proficiency}%
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Count */}
                <div className="mt-6 pt-4 border-t border-[#F0DED4] text-xs text-[#613E35] flex items-center justify-between font-medium">
                  <span>{categorySkills.length} competencies</span>
                  <span className="text-[#613E35] inline-flex items-center gap-1">
                    <CheckCircle size={13} />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {allSkills.length === 0 && (
          <div className="bg-white border border-[#F0DED4] rounded-xl p-12 text-center my-6">
            <p className="text-sm text-[#613E35]">No published skills found.</p>
          </div>
        )}

      </div>
    </section>
  );
};
