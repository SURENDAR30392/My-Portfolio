import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Award,
  Eye,
  FileCheck,
  FileX
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useData } from '../context/DataContext';
import { getResumeEmbedUrl, triggerResumeDownload, hasValidResume } from '../utils/resumeHelper';

export const ResumePage = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const education = (data.education || []).filter(e => e.published !== false);
  const skills = (data.skills || []).filter(s => s.published !== false);
  const projects = (data.projects || []).filter(p => p.published !== false);
  const certifications = (data.certifications || []).filter(c => c.published !== false);
  const resume = data.resume || {};

  const hasResume = hasValidResume(resume.url);
  const [viewMode, setViewMode] = useState(() => hasResume ? 'pdf' : 'sheet');

  const currentEmbedUrl = getResumeEmbedUrl(resume.url);
  const filename = resume.filename || 'Marthala_Surendar_Reddy_Resume.pdf';

  const handleDownload = () => {
    if (hasResume) {
      triggerResumeDownload(resume.url, filename);
    } else {
      window.print();
    }
  };

  // Group skills by category for the sheet view
  const technicalSkills = skills.filter(s => s.category !== 'Soft Skills');
  const softSkills = skills.filter(s => s.category === 'Soft Skills');

  // Bio / Summary text
  const bioSummary = Array.isArray(profile.bio) 
    ? profile.bio.join(' ') 
    : (profile.bio || profile.intro || "Motivated Computer Science and Engineering undergraduate at KL University with strong foundations in Java backend engineering, Data Structures & Algorithms, and modern web applications.");

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            {/* View Mode Toggle & Download Button */}
            <div className="flex items-center gap-2.5">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-1 flex items-center shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#172554]'
                  }`}
                >
                  <Eye size={13} />
                  <span>PDF Document</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('sheet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'sheet'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#172554]'
                  }`}
                >
                  <FileText size={13} />
                  <span>Web Sheet</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="btn-primary inline-flex items-center gap-2 h-9 px-4 text-xs shadow-xs"
              >
                <Download size={14} />
                <span>{hasResume ? "Download PDF" : "Print Web Sheet"}</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE A: Embedded PDF Document */}
          {viewMode === 'pdf' && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 shadow-card space-y-3 animate-fade-in">
              {hasResume && currentEmbedUrl ? (
                <>
                  <div className="flex items-center justify-between px-1 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <FileCheck size={16} className="text-[#2563EB]" />
                      <span className="font-semibold text-[#172554]">{filename}</span>
                    </div>
                    <a
                      href={currentEmbedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Open in fullscreen</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Responsive Iframe Container */}
                  <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC] shadow-inner h-[760px] md:h-[920px] w-full">
                    <iframe
                      key={currentEmbedUrl}
                      src={currentEmbedUrl}
                      title="Marthala Surendar Reddy Resume PDF"
                      className="w-full h-full border-0"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 px-1 text-xs text-[#94A3B8]">
                    <span>Candidate: {profile.name || "Marthala Surendar Reddy"}</span>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="text-[#2563EB] hover:underline font-medium text-left"
                    >
                      Trouble viewing? Click here to download {filename}
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-12 text-center bg-[#F8FAFC] space-y-3 my-4">
                  <FileX size={44} className="mx-auto text-[#94A3B8]" />
                  <h3 className="text-base font-bold text-[#172554]">No Official PDF Uploaded Yet</h3>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                    The official resume PDF document is currently being updated. You can view the complete interactive credentials in the Web Sheet tab.
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewMode('sheet')}
                    className="btn-primary text-xs h-9 px-4"
                  >
                    View Interactive Web Sheet
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE B: Printable Web Resume Sheet */}
          {viewMode === 'sheet' && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 md:p-12 shadow-card space-y-8 animate-fade-in">
              
              {/* Header / Identity */}
              <div className="border-b border-[#E2E8F0] pb-6">
                <h1 className="text-3xl font-bold text-[#172554]">
                  {profile.name || "Marthala Surendar Reddy"}
                </h1>
                <p className="text-base text-[#2563EB] font-medium mt-1">
                  {profile.title || "B.Tech Computer Science and Engineering Student"}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B] mt-3">
                  <span>{profile.location || "Andhra Pradesh, India"}</span>
                  <span>•</span>
                  <span>{profile.email || "marthalasurendarreddy@gmail.com"}</span>
                  {data.social?.linkedin && (
                    <>
                      <span>•</span>
                      <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
                        LinkedIn
                      </a>
                    </>
                  )}
                  {data.social?.github && (
                    <>
                      <span>•</span>
                      <a href={data.social.github} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
                        GitHub
                      </a>
                    </>
                  )}
                  {data.social?.leetcode && (
                    <>
                      <span>•</span>
                      <a href={data.social.leetcode} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
                        LeetCode
                      </a>
                    </>
                  )}
                  {data.social?.codechef && (
                    <>
                      <span>•</span>
                      <a href={data.social.codechef} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
                        CodeChef
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2 flex items-center gap-2">
                  <FileText size={14} />
                  <span>Professional Summary</span>
                </h2>
                <p className="text-sm text-[#334155] leading-relaxed">
                  {bioSummary}
                </p>
              </div>

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2">
                    <GraduationCap size={14} />
                    <span>Education</span>
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="font-bold text-[#172554] text-base">{edu.degree}</div>
                          <div className="text-xs text-[#64748B] font-medium">{edu.dates}</div>
                        </div>
                        <div className="text-sm font-medium text-[#2563EB] mt-0.5">{edu.institution}</div>
                        {edu.description && (
                          <p className="text-xs text-[#334155] mt-2 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {technicalSkills.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2">
                    <Code2 size={14} />
                    <span>Technical Skills</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {technicalSkills.map((s) => (
                      <div key={s.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-[#172554]">{s.name}</div>
                          <span className="text-[10px] text-[#2563EB] font-semibold">{s.level || s.proficiency || ''}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">{s.category || 'Skill'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Projects */}
              {projects.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2">
                    <Briefcase size={14} />
                    <span>Selected Projects</span>
                  </h2>
                  <div className="space-y-3.5">
                    {projects.slice(0, 4).map((p) => (
                      <div key={p.id} className="pb-3 border-b border-[#E2E8F0] last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-[#172554] text-sm">{p.title}</div>
                          <div className="text-xs text-[#64748B] font-medium">{p.level || "Project"}</div>
                        </div>
                        <p className="text-xs text-[#334155] mt-1 leading-relaxed">{p.description}</p>
                        {p.techUsed && (
                          <div className="text-[11px] text-[#2563EB] font-medium mt-1">
                            Tech: {Array.isArray(p.techUsed) ? p.techUsed.join(', ') : p.techUsed}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2">
                    <Award size={14} />
                    <span>Honors & Certifications</span>
                  </h2>
                  <div className="space-y-2.5">
                    {certifications.map((c) => (
                      <div key={c.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#172554] text-xs">{c.title || c.name}</div>
                          <div className="text-[11px] text-[#64748B]">{c.issuer} · {c.date}</div>
                        </div>
                        {c.credentialUrl && (
                          <a 
                            href={c.credentialUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[#2563EB] hover:underline text-xs flex items-center gap-1 font-semibold"
                          >
                            <span>Verify</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};
