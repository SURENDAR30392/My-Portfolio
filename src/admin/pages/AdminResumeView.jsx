import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  Eye, 
  UploadCloud, 
  AlertCircle, 
  Trash2, 
  Link as LinkIcon,
  FileX
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { 
  getResumeEmbedUrl, 
  hasValidResume, 
  normalizeResumeUrl, 
  triggerResumeDownload 
} from '../../utils/resumeHelper';

export const AdminResumeView = () => {
  const { data, updateResume } = useData();
  const resume = data.resume || {};

  // If previous url was the built-in '/resume.pdf', treat it as no custom resume
  const initialUrl = normalizeResumeUrl(resume.url);
  const initialFilename = initialUrl ? (resume.filename || 'Resume.pdf') : '';

  const [url, setUrl] = useState(initialUrl);
  const [enabled, setEnabled] = useState(resume.enabled !== false);
  const [filename, setFilename] = useState(initialFilename);
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(true);
  const [sourceType, setSourceType] = useState('upload'); // 'upload' | 'link'
  const [fileError, setFileError] = useState('');
  const [fileSuccess, setFileSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  // Synchronize state when data loads from Firestore
  useEffect(() => {
    const cleanUrl = normalizeResumeUrl(resume.url);
    setUrl(cleanUrl);
    setFilename(cleanUrl ? (resume.filename || 'Resume.pdf') : '');
    if (resume.enabled !== undefined) setEnabled(resume.enabled);
  }, [resume.url, resume.filename, resume.enabled]);

  const hasResume = hasValidResume(url);
  const isDataUrl = url?.startsWith('data:application/pdf');
  const isGoogleDrive = url?.includes('drive.google.com');

  const getSourceBadge = () => {
    if (!hasResume) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          No Resume Uploaded
        </span>
      );
    }
    if (isDataUrl) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Uploaded PDF File
        </span>
      );
    }
    if (isGoogleDrive) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#613E35] border border-blue-200">
          Google Drive Document
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
        url: url.trim(),
        enabled,
        filename: filename.trim() || 'Resume.pdf',
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

  const handleRemoveResume = async () => {
    if (window.confirm("Are you sure you want to remove the current resume document from the portfolio?")) {
      setUrl('');
      setFilename('');
      setFileSuccess('Resume document removed.');
      setTimeout(() => setFileSuccess(''), 3000);
      await updateResume({
        url: '',
        filename: '',
        enabled: false,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
  };

  const currentEmbedUrl = getResumeEmbedUrl(url);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#613E35] flex items-center gap-2.5">
          <FileText size={26} className="text-[#613E35]" />
          <span>Resume Management & Live Preview</span>
        </h1>
        <p className="text-sm text-[#613E35] mt-1">
          Upload your official resume PDF or link an external document. Updates reflect live across your portfolio.
        </p>
      </div>

      {/* Current Resume Status Card */}
      <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0DED4] pb-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              hasResume 
                ? 'bg-[#FCE9DF] text-[#613E35] border-[#F4C9B5]' 
                : 'bg-amber-50 text-amber-600 border-amber-200'
            }`}>
              {hasResume ? <FileText size={26} /> : <FileX size={26} />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-[#613E35] truncate max-w-sm">
                  {hasResume ? filename : "No Resume Uploaded"}
                </h2>
                {getSourceBadge()}
              </div>
              <p className="text-xs text-[#613E35] mt-1">
                {hasResume ? (
                  <>
                    Last updated: <span className="text-[#613E35] font-medium">{resume.lastUpdated || 'Recently'}</span>
                    {isDataUrl && <span className="ml-2 text-emerald-600 font-medium">· Stored in Cloud Firestore</span>}
                  </>
                ) : (
                  <span>Please upload your official resume PDF or paste a link below.</span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {hasResume && (
              <>
                <button
                  type="button"
                  onClick={() => triggerResumeDownload(url, filename)}
                  className="btn-secondary text-xs h-9 px-3.5 inline-flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="p-2 rounded-lg border border-[#F0DED4] text-[#613E35] hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove current resume document"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}

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
            <label className="block text-xs font-bold text-[#613E35] mb-2">
              Provide Your Official Resume
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  sourceType === 'upload'
                    ? 'bg-[#D98C70] text-white border-[#D98C70] shadow-xs'
                    : 'bg-white text-[#613E35] border-[#F0DED4] hover:bg-[#FCE9DF] hover:text-[#D98C70]'
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
                    ? 'bg-[#D98C70] text-white border-[#D98C70] shadow-xs'
                    : 'bg-white text-[#613E35] border-[#F0DED4] hover:bg-[#FCE9DF] hover:text-[#D98C70]'
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
                className="border-2 border-dashed border-[#F4C9B5] hover:border-[#D98C70] bg-[#FCE9DF]/50 hover:bg-[#FCE9DF] rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-[#613E35] border border-[#F4C9B5] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <div className="text-sm font-bold text-[#613E35]">
                  Click to browse or drag and drop your Resume PDF
                </div>
                <p className="text-xs text-[#613E35] max-w-sm">
                  Upload your real single-page or multi-page PDF document (under 800 KB).
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
              <label className="block text-xs font-semibold text-[#613E35]">
                External Resume Document URL *
              </label>
              <input
                type="text"
                required={sourceType === 'link'}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://drive.google.com/file/d/... or https://example.com/resume.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm text-[#613E35] focus:outline-none focus:border-[#D98C70] font-mono text-xs"
              />
              <p className="text-[11px] text-[#613E35]">
                Supports Google Drive sharing links (automatically normalized for embedding), Dropbox, ImageKit, or any direct PDF URL.
              </p>
            </div>
          )}

          {/* Filename configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Download Filename
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Marthala_Surendar_Reddy_Resume.pdf"
                className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#613E35]">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#613E35] focus:ring-[#F4C9B5]"
                />
                <span>Display "Resume" button in public Navbar and Hero</span>
              </label>
            </div>
          </div>

          {/* Save Button Row */}
          <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-between">
            {hasResume ? (
              <button
                type="button"
                onClick={handleRemoveResume}
                className="text-xs text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>Remove Resume</span>
              </button>
            ) : <div />}

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
      <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0DED4] pb-3">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-[#613E35]" />
            <h2 className="text-base font-bold text-[#613E35]">
              Live Document Preview
            </h2>
          </div>
          {hasResume && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => triggerResumeDownload(url, filename)}
                className="text-xs text-[#613E35] hover:underline font-semibold flex items-center gap-1"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
              <span className="text-[#F0DED4]">|</span>
              <button
                type="button"
                onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
                className="text-xs text-[#613E35] hover:text-[#613E35] font-medium"
              >
                {showEmbeddedPdf ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          )}
        </div>

        {showEmbeddedPdf && (
          <div className="space-y-3 animate-fade-in">
            {hasResume && currentEmbedUrl ? (
              <>
                <div className="border border-[#F0DED4] rounded-xl overflow-hidden bg-[#FFF8F3] shadow-inner h-[680px] w-full">
                  <iframe
                    key={currentEmbedUrl}
                    src={currentEmbedUrl}
                    title="Resume PDF Preview"
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#613E35] px-1">
                  <span>Dynamic preview of currently configured resume</span>
                  <a 
                    href={currentEmbedUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#613E35] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Open in fullscreen</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </>
            ) : (
              <div className="border-2 border-dashed border-[#F0DED4] rounded-2xl p-12 text-center bg-[#FFF8F3] space-y-3">
                <FileX size={40} className="mx-auto text-[#613E35]" />
                <h3 className="text-base font-bold text-[#613E35]">No Resume File Attached</h3>
                <p className="text-xs text-[#613E35] max-w-sm mx-auto">
                  Upload your official resume PDF above to activate the live document preview.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary text-xs h-8 px-4"
                >
                  Choose PDF to Upload
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
