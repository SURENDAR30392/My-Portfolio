import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  RefreshCw, 
  Eye, 
  Globe, 
  Printer, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminResumeView = () => {
  const { data, updateResume } = useData();
  const resume = data.resume || {};

  const defaultUrl = '/resume.pdf';
  const defaultFilename = 'Marthala_Surendar_Reddy_Resume.pdf';

  const [url, setUrl] = useState(resume.url || defaultUrl);
  const [enabled, setEnabled] = useState(resume.enabled !== false);
  const [filename, setFilename] = useState(resume.filename || defaultFilename);
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(true);

  const isBuiltInDummy = !url || url === defaultUrl || url === '/resume.pdf';

  const handleSave = async (e) => {
    e.preventDefault();
    await updateResume({
      url: url.trim() || defaultUrl,
      enabled,
      filename: filename.trim() || defaultFilename,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
  };

  const handleSetBuiltInDummy = async () => {
    setUrl(defaultUrl);
    setFilename(defaultFilename);
    await updateResume({
      url: defaultUrl,
      filename: defaultFilename,
      enabled: true,
      lastUpdated: 'November 2026'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#172554] flex items-center gap-2.5">
          <FileText size={24} className="text-[#2563EB]" />
          <span>Resume Management & Dummy Resume Preview</span>
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Review, preview, and configure the official resume PDF served to recruiters and visitors on your portfolio.
        </p>
      </div>

      {/* Spark Free Plan Zero-Cost Architecture Notice */}
      <div className="bg-[#EFF6FF] border border-[#60A5FA]/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs border border-[#E2E8F0]">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#172554]">
              Zero-Cost Resume Pipeline (Firebase Spark Free Plan)
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Your portfolio includes a pre-compiled, valid <strong>Dummy Resume PDF</strong> (<code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] text-[#2563EB]">/resume.pdf</code>) containing all your personal academic details for KL University. You can use this built-in resume or link any external PDF (Google Drive, GitHub raw, Dropbox) without paid storage.
            </p>
          </div>
        </div>
      </div>

      {/* Built-in Dummy Resume Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#60A5FA]/30">
              <FileText size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-[#172554]">
                  {filename}
                </h2>
                {isBuiltInDummy ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#60A5FA]/40">
                    Built-in Dummy Resume
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#93C5FD]">
                    External URL
                  </span>
                )}
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Path: <span className="font-mono text-[#172554]">{url || defaultUrl}</span> · Last updated: {resume.lastUpdated || "November 2026"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={url || defaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Preview PDF</span>
            </a>

            <a
              href={url || defaultUrl}
              download={filename}
              className="btn-secondary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>

            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
              title="View Public Printable Web Page"
            >
              <Printer size={14} />
              <span>Public Sheet</span>
            </a>

            {!isBuiltInDummy && (
              <button
                type="button"
                onClick={handleSetBuiltInDummy}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                title="Reset to Built-in Dummy Resume"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Details of the Dummy Resume */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#94A3B8] block">Candidate Identity</span>
            <span className="font-semibold text-[#172554] text-sm mt-0.5 block">
              Marthala Surendar Reddy
            </span>
            <span className="text-[#64748B] text-[11px]">B.Tech CSE · KL University (2024–2028)</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#94A3B8] block">Competitive Coding</span>
            <span className="font-semibold text-[#2563EB] text-sm mt-0.5 block">
              200+ Solved Problems
            </span>
            <span className="text-[#64748B] text-[11px]">LeetCode & CodeChef Division Active</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#94A3B8] block">Core Tech Stack</span>
            <span className="font-semibold text-[#172554] text-sm mt-0.5 block">
              Java, Spring Boot, React
            </span>
            <span className="text-[#64748B] text-[11px]">PostgreSQL, MySQL, Firebase, Docker</span>
          </div>
        </div>
      </div>

      {/* Resume Configuration Form */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-3">
          Resume Settings & Hosting URL
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#172554]">
                Resume File URL *
              </label>
              <button
                type="button"
                onClick={() => setUrl(defaultUrl)}
                className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
              >
                <Sparkles size={11} />
                <span>Use Built-in Dummy PDF (/resume.pdf)</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="e.g. /resume.pdf or https://drive.google.com/..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#172554] focus:outline-none focus:border-[#2563EB] font-mono text-xs"
            />
            <p className="text-[11px] text-[#94A3B8] mt-1">
              Enter <code className="text-[#2563EB] font-mono">/resume.pdf</code> to use the bundled PDF, or paste an external direct PDF link.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#172554] mb-1.5">
              Download Filename
            </label>
            <input
              type="text"
              required
              value={filename}
              onChange={e => setFilename(e.target.value)}
              placeholder="Marthala_Surendar_Reddy_Resume.pdf"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#172554]">
              <input
                type="checkbox"
                checked={enabled}
                onChange={e => setEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#60A5FA]"
              />
              <span>Display "Resume" button in the public Navbar and Hero section</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              onClick={handleSetBuiltInDummy}
              className="btn-secondary text-xs h-9 px-4 inline-flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Reset to Default Dummy Resume</span>
            </button>

            <button
              type="submit"
              className="btn-primary text-xs h-9 px-5 inline-flex items-center gap-1.5"
            >
              <CheckCircle size={14} />
              <span>Save Resume Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Embedded Resume Viewer Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#2563EB]" />
            <h2 className="text-base font-semibold text-[#172554]">
              Live Dummy Resume Document Preview
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
            className="text-xs text-[#2563EB] hover:underline font-medium"
          >
            {showEmbeddedPdf ? "Hide Viewer" : "Show Viewer"}
          </button>
        </div>

        {showEmbeddedPdf && (
          <div className="space-y-4 animate-fade-in">
            {/* Embedded Iframe Preview */}
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC] shadow-inner h-[600px] w-full">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0"
                title="MSR Dummy Resume PDF Preview"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#94A3B8] px-1">
              <span>Standard A4 PDF Document · 1 Page · Marthala Surendar Reddy</span>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in fullscreen</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
