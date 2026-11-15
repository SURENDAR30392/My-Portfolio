import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, ExternalLink, GraduationCap, Code2, Briefcase } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useData } from '../context/DataContext';

export const ResumePage = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const education = (data.education || []).filter(e => e.published !== false);
  const skills = (data.skills || []).filter(s => s.published !== false);
  const resume = data.resume || {};

  const handleDownload = () => {
    const downloadUrl = resume.url || '/resume.pdf';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = resume.filename || 'Marthala_Surendar_Reddy_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[860px] mx-auto px-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-[#4B5F5C] hover:text-[#0F766E] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            <button
              onClick={handleDownload}
              className="btn-primary inline-flex items-center gap-2 h-10 px-5 text-sm"
            >
              <Download size={16} />
              <span>Download Resume (PDF)</span>
            </button>
          </div>

          {/* Clean Printable Resume Sheet */}
          <div className="bg-white border border-[#DDE7E5] rounded-xl p-8 md:p-12 shadow-sm space-y-8">
            
            {/* Header / Identity */}
            <div className="border-b border-[#DDE7E5] pb-6">
              <h1 className="text-3xl font-semibold text-[#102A28]">
                {profile.name || "Marthala Surendar Reddy"}
              </h1>
              <p className="text-base text-[#0F766E] font-medium mt-1">
                {profile.title || "B.Tech Computer Science and Engineering Student"}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A9B98] mt-3">
                <span>{profile.location || "Andhra Pradesh, India"}</span>
                <span>•</span>
                <span>{profile.email || "marthalasurendarreddy@gmail.com"}</span>
                <span>•</span>
                <a href={data.social?.linkedin || "https://www.linkedin.com/in/marthalasurendarreddy/"} target="_blank" rel="noreferrer" className="text-[#0F766E] hover:underline">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={data.social?.github || "https://github.com/SURENDAR30392"} target="_blank" rel="noreferrer" className="text-[#0F766E] hover:underline">
                  GitHub
                </a>
                <span>•</span>
                <a href={data.social?.leetcode || "https://leetcode.com/u/kl_2400030392/"} target="_blank" rel="noreferrer" className="text-[#0F766E] hover:underline">
                  LeetCode
                </a>
                <span>•</span>
                <a href={data.social?.codechef || "https://www.codechef.com/users/kl2400030392"} target="_blank" rel="noreferrer" className="text-[#0F766E] hover:underline">
                  CodeChef
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-2 flex items-center gap-2">
                <FileText size={14} />
                <span>Professional Summary</span>
              </h2>
              <p className="text-sm text-[#4B5F5C] leading-relaxed">
                Dedicated Computer Science and Engineering student at KL University (Expected 2028). Strong foundation in Java, Object-Oriented Software Design, Data Structures & Algorithms, and modern web application development with React and Firebase. Seeking software engineering internship opportunities to contribute to high-impact systems.
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-3 flex items-center gap-2">
                <GraduationCap size={14} />
                <span>Education</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-semibold text-[#102A28] text-base">{edu.degree}</div>
                      <div className="text-xs text-[#8A9B98]">{edu.dates}</div>
                    </div>
                    <div className="text-sm text-[#0F766E] mt-0.5">{edu.institution}</div>
                    <p className="text-xs text-[#4B5F5C] mt-2 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-3 flex items-center gap-2">
                <Code2 size={14} />
                <span>Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-3.5">
                  <div className="text-xs font-semibold text-[#102A28] mb-1.5">Languages & Algorithms</div>
                  <div className="text-xs text-[#4B5F5C] leading-relaxed">
                    Java (Core & OOP), Python, C, C++, JavaScript (ES6+), Data Structures & Algorithms
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-3.5">
                  <div className="text-xs font-semibold text-[#102A28] mb-1.5">Backend & Databases</div>
                  <div className="text-xs text-[#4B5F5C] leading-relaxed">
                    Spring Boot, Node.js, MySQL, PostgreSQL, Firebase Firestore, REST APIs
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-3.5">
                  <div className="text-xs font-semibold text-[#102A28] mb-1.5">Frontend Technologies</div>
                  <div className="text-xs text-[#4B5F5C] leading-relaxed">
                    React.js, HTML5, CSS3, Tailwind CSS, Responsive Design, State Management
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-3.5">
                  <div className="text-xs font-semibold text-[#102A28] mb-1.5">Cloud & Developer Tools</div>
                  <div className="text-xs text-[#4B5F5C] leading-relaxed">
                    Git, GitHub, Docker, AWS (Basics), Postman, Linux CLI, Vite
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Academic Projects */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-3 flex items-center gap-2">
                <Briefcase size={14} />
                <span>Selected Projects</span>
              </h2>
              <div className="space-y-3.5">
                {(data.projects || []).slice(0, 3).map((p) => (
                  <div key={p.id} className="pb-3 border-b border-[#DDE7E5]/60 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[#102A28] text-sm">{p.title}</div>
                      <div className="text-xs text-[#8A9B98]">{p.level || "Engineering Project"}</div>
                    </div>
                    <p className="text-xs text-[#4B5F5C] mt-1 leading-relaxed">{p.description}</p>
                    <div className="text-[11px] text-[#0F766E] mt-1">
                      Tech: {Array.isArray(p.techUsed) ? p.techUsed.join(', ') : p.techUsed}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

