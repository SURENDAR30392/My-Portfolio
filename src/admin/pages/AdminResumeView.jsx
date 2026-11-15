import React, { useState } from 'react';
import { FileText, Upload, Download, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminResumeView = () => {
  const { data, updateResume, uploadFile } = useData();
  const resume = data.resume || {};

  const [url, setUrl] = useState(resume.url || '');
  const [enabled, setEnabled] = useState(resume.enabled !== false);
  const [filename, setFilename] = useState(resume.filename || 'Marthala_Surendar_Reddy_Resume.pdf');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const downloadUrl = await uploadFile(file, 'resumes');
      setUrl(downloadUrl);
      setFilename(file.name);
      await updateResume({
        url: downloadUrl,
        filename: file.name,
        enabled: true
      });
    } catch (err) {
      console.error("Resume upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateResume({
      url,
      enabled,
      filename
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#102A28]">
          Resume Management
        </h1>
        <p className="text-sm text-[#4B5F5C] mt-1">
          Upload and manage your official resume PDF served to visitors on the public portfolio.
        </p>
      </div>

      <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-6">
        
        {/* Current Status */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#F7FAFA] border border-[#DDE7E5]">
          <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div className="flex-1 truncate">
            <div className="text-sm font-semibold text-[#102A28] truncate">
              {filename}
            </div>
            <div className="text-xs text-[#8A9B98] mt-0.5">
              Last updated: {resume.lastUpdated || "November 2026"}
            </div>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs h-9 px-3 shrink-0"
            >
              <ExternalLink size={14} />
              <span>Preview</span>
            </a>
          )}
        </div>

        {/* Upload New Resume */}
        <div className="border-2 border-dashed border-[#DDE7E5] rounded-xl p-8 text-center bg-[#F7FAFA]/50 hover:bg-[#E6F4F2]/30 transition-colors">
          <Upload size={32} className="text-[#0F766E] mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-[#102A28] mb-1">
            Upload New Resume File (PDF)
          </h3>
          <p className="text-xs text-[#8A9B98] mb-4">
            Supports PDF format up to 10MB
          </p>
          <label className="btn-primary text-xs h-9 px-4 cursor-pointer inline-flex items-center gap-2">
            <span>{uploading ? "Uploading to Cloud Storage..." : "Choose PDF Document"}</span>
            <input 
              type="file" 
              accept=".pdf,application/pdf" 
              onChange={handleFileUpload} 
              disabled={uploading}
              className="hidden" 
            />
          </label>
        </div>

        {/* Form settings */}
        <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-[#DDE7E5]">
          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
              Direct Resume File URL
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://... or uploaded URL"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
              Download Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={e => setFilename(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#102A28]">
              <input
                type="checkbox"
                checked={enabled}
                onChange={e => setEnabled(e.target.checked)}
                className="rounded text-[#0F766E]"
              />
              <span>Enable Resume button in Navigation Bar and Hero Section</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#DDE7E5] flex justify-end">
            <button
              type="submit"
              className="btn-primary text-xs h-10 px-5"
            >
              Save Resume Settings
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
