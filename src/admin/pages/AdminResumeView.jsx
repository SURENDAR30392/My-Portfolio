import React, { useState, useEffect, useRef } from 'react';
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
  UploadCloud,
  AlertCircle,
  Trash2,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getResumeEmbedUrl, getResumeDownloadUrl, triggerResumeDownload } from '../../utils/resumeHelper';

export const AdminResumeView = () => {
  const { data, updateResume } = useData();
  const resume = data.resume || {};

  const defaultUrl = '/resume.pdf';
  const defaultFilename = 'Marthala_Surendar_Reddy_Resume.pdf';

  const [url, setUrl] = useState(resume.url || defaultUrl);
  const [enabled, setEnabled] = useState(resume.enabled !== false);
  const [filename, setFilename] = useState(resume.filename || defaultFilename);
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(true);
  const [sourceType, setSourceType] = useState('upload'); // 'upload' | 'link'
  const [fileError, setFileError] = useState('');
  const [fileSuccess, setFileSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  // Synchronize state when data loads from Firestore
  useEffect(() => {
    if (resume.url) setUrl(resume.url);
    if (resume.filename) setFilename(resume.filename);
    if (resume.enabled !== undefined) setEnabled(resume.enabled);
  }, [resume.url, resume.filename, resume.enabled]);

  // Determine source type for badge
  const isDefaultPdf = !url || url === defaultUrl || url === '/resume.pdf';
  const isDataUrl = url?.startsWith('data:application/pdf');
  const isGoogleDrive = url?.includes('drive.google.com');

  const getSourceBadge = () => {
    if (isDataUrl) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Uploaded PDF File
        </span>
      );
    }
    if (isGoogleDrive) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
          Google Drive Document
        </span>
      );
    }
    if (isDefaultPdf) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          Default Portfolio PDF
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
        External Direct Link
      </span>
    );
  };

  // Handle local PDF file selection
  const handleFileSelect = (file) => {
    setFileError('');
    setFileSuccess('');

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setFileError('Please select a valid PDF file (.pdf).');
      return;
    }

    // Check size limit: Firestore allows ~1MB per document
    const sizeInKb = file.size / 1024;
    if (sizeInKb > 800) {
      setFileError(`File is ${sizeInKb.toFixed(0)} KB. For optimal Firestore performance, files should be under 800 KB. Alternatively, host the PDF on Google Drive and paste the share link below.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setUrl(result);
      setFilename(file.name);
      setFileSuccess(`Selected: ${file.name} (${sizeInKb.toFixed(1)} KB) - Ready to save.`);
    };
    reader.onerror = () => {
      setFileError('Failed to read the file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setFileError('');

    try {
      await updateResume({
        url: url.trim() || defaultUrl,
        enabled,
        filename: filename.trim() || defaultFilename,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
      setFileSuccess('Resume settings saved successfully to Firestore!');
      setTimeout(() => setFileSuccess(''), 4000);
    } catch (err) {
      setFileError(err.message || 'Failed to save resume settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (window.confirm("Reset resume to the default portfolio PDF?")) {
      setUrl(defaultUrl);
      setFilename(defaultFilename);
      setFileSuccess('');
      setFileError('');
      await updateResume({
        url: defaultUrl,
        filename: defaultFilename,
        enabled: true,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
  };

  const currentEmbedUrl = getResumeEmbedUrl(url);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172554] flex items-center gap-2.5">
          <FileText size={26} className="text-[#2563EB]" />
          <span>Resume Management & Live Preview</span>
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Upload your resume PDF or link an external document. Your live resume is immediately updated for public visitors.
        </p>
      </div>

      {/* Current Resume Status Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
              <FileText size={26} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-[#172554] truncate max-w-sm">
                  {filename}
                </h2>
                {getSourceBadge()}
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                Last updated: <span className="text-[#172554] font-medium">{resume.lastUpdated || 'Recently'}</span>
                {isDataUrl && <span className="ml-2 text-emerald-600 font-medium">· Stored in Cloud Firestore</span>}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => triggerResumeDownload(url, filename)}
              className="btn-secondary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Download</span>
            </button>

            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
              title="Open public resume viewer in a new tab"
            >
              <ExternalLink size={14} />
              <span>Public Page</span>
            </a>

            {!isDefaultPdf && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                title="Reset to default portfolio resume"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Feedback alerts */}
        {fileSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle size={16} className="shrink-0 text-emerald-600" />
            <span>{fileSuccess}</span>
          </div>
        )}

        {fileError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle size={16} className="shrink-0 text-red-600" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Source Configuration Form */}
        <form onSubmit={handleSave} className="space-y-5 pt-2">
          
          {/* Method Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-[#172554] mb-2">
              Choose How to Provide Your Resume
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  sourceType === 'upload'
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#2563EB]'
                }`}
              >
                <UploadCloud size={16} />
                <span>Upload PDF File</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('link')}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  sourceType === 'link'
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#2563EB]'
                }`}
              >
                <LinkIcon size={16} />
                <span>External PDF Link</span>
              </button>
            </div>
          </div>

          {/* Option A: Direct File Upload */}
          {sourceType === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#BFDBFE] hover:border-[#2563EB] bg-[#EFF6FF]/50 hover:bg-[#EFF6FF] rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <div className="text-sm font-bold text-[#172554]">
                  Click to browse or drag and drop your Resume PDF
                </div>
                <p className="text-xs text-[#64748B] max-w-sm">
                  Upload a standard single-page PDF document (under 800 KB). It will be saved directly and displayed in the live viewer.
                </p>
                <button
                  type="button"
                  className="btn-primary text-xs h-8 px-4 mt-1 pointer-events-none"
                >
                  Choose File from Computer
                </button>
              </div>
            </div>
          ) : (
            /* Option B: External Link */
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#172554]">
                External Resume Document URL *
              </label>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://drive.google.com/file/d/... or https://example.com/resume.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#172554] focus:outline-none focus:border-[#2563EB] font-mono text-xs"
              />
              <p className="text-[11px] text-[#64748B]">
                Supports Google Drive sharing links (automatically normalized for embedding), Dropbox, ImageKit, or any public PDF URL.
              </p>
            </div>
          )}

          {/* Filename configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Download Filename
              </label>
              <input
                type="text"
                required
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Marthala_Surendar_Reddy_Resume.pdf"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#172554]">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#60A5FA]"
                />
                <span>Display "Resume" button in public Navbar and Hero</span>
              </label>
            </div>
          </div>

          {/* Save Button Row */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="btn-secondary text-xs h-9 px-4 inline-flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Reset to Default</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary text-xs h-9 px-6 inline-flex items-center gap-2"
            >
              <CheckCircle size={15} />
              <span>{isSaving ? "Saving to Cloud..." : "Save Resume Settings"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Embedded Resume Viewer Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-[#2563EB]" />
            <h2 className="text-base font-bold text-[#172554]">
              Live Document Preview
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => triggerResumeDownload(url, filename)}
              className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              <Download size={13} />
              <span>Download</span>
            </button>
            <span className="text-[#E2E8F0]">|</span>
            <button
              type="button"
              onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
              className="text-xs text-[#64748B] hover:text-[#172554] font-medium"
            >
              {showEmbeddedPdf ? "Hide Preview" : "Show Preview"}
            </button>
          </div>
        </div>

        {showEmbeddedPdf && (
          <div className="space-y-3 animate-fade-in">
            {/* Embedded Responsive Iframe */}
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC] shadow-inner h-[680px] w-full">
              <iframe
                key={currentEmbedUrl}
                src={currentEmbedUrl}
                title="Resume PDF Preview"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
              <span>Dynamic preview of currently configured resume</span>
              <a 
                href={currentEmbedUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
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
