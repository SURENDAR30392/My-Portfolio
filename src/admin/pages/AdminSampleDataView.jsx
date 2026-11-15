import React, { useState } from 'react';
import { Database, Trash2, AlertTriangle, RefreshCw, CheckCircle, Sparkles, FileText, Eye, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminSampleDataView = () => {
  const { 
    data, 
    removeSampleData, 
    restoreDefaultData,
    seedFirestoreCollections,
    deleteProject,
    deleteSkill,
    deleteCertification,
    deleteExperience,
    deleteAchievement 
  } = useData();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const sampleProjects = (data.projects || []).filter(p => p.isSample);
  const sampleSkills = (data.skills || []).filter(s => s.isSample);
  const sampleCerts = (data.certifications || []).filter(c => c.isSample);
  const sampleExp = (data.experience || []).filter(e => e.isSample);
  const sampleAchievements = (data.achievements || []).filter(a => a.isSample);

  const totalSampleCount = 
    sampleProjects.length + 
    sampleSkills.length + 
    sampleCerts.length + 
    sampleExp.length + 
    sampleAchievements.length;

  const handleBulkRemove = async () => {
    await removeSampleData();
    setConfirmModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#613E35]">
          Sample Data Management
        </h1>
        <p className="text-sm text-[#A27B6E] mt-1">
          Review, edit, or purge placeholder dummy data marked with <code className="text-xs bg-[#FCE9DF] text-[#D98C70] px-1.5 py-0.5 rounded">isSample: true</code>.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-[#613E35]">{totalSampleCount}</span>
            <span className="text-sm text-[#A27B6E]">Sample Records Total</span>
          </div>
          <p className="text-xs text-[#A27B6E] mt-1">
            {totalSampleCount > 0 
              ? "All placeholder records can be deleted in one click without affecting your real data."
              : "Great job! All records in the portfolio are verified real information."
            }
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={seedFirestoreCollections}
            className="p-2.5 px-4 rounded-lg bg-[#FCE9DF] border border-[#F4C9B5] text-[#D98C70] text-xs font-semibold hover:bg-[#F4C9B5] transition-colors inline-flex items-center gap-2"
            title="Idempotently synchronize all 10 collections to Cloud Firestore"
          >
            <Sparkles size={16} />
            <span>Sync Live Firestore Collections</span>
          </button>
          {totalSampleCount > 0 ? (
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="p-2.5 px-4 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-semibold hover:bg-[#FEE2E2] transition-colors inline-flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Purge All Sample Data</span>
            </button>
          ) : (
            <button
              onClick={restoreDefaultData}
              className="btn-secondary text-xs h-9 px-4 inline-flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Restore Default Sample Records</span>
            </button>
          )}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-6">
        
        {/* Sample / Dummy Resume Document */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0DED4] pb-3">
            <h2 className="text-sm font-semibold text-[#613E35] flex items-center gap-2">
              <FileText size={16} className="text-[#D98C70]" />
              <span>Dummy Resume Document</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
              Active (/resume.pdf)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-[#613E35]">
                {data.resume?.filename || 'Marthala_Surendar_Reddy_Resume.pdf'}
              </div>
              <div className="text-xs text-[#A27B6E] mt-0.5">
                Pre-compiled PDF resume for Marthala Surendar Reddy with KL University education & projects.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs h-8 px-3 inline-flex items-center gap-1.5"
              >
                <Eye size={13} />
                <span>Preview PDF</span>
              </a>
              <a
                href="/resume"
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs h-8 px-3 inline-flex items-center gap-1.5"
              >
                <span>Printable Sheet</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Sample Projects */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0DED4] pb-3">
            <h2 className="text-sm font-semibold text-[#613E35]">
              Sample Projects ({sampleProjects.length})
            </h2>
            <span className="text-xs text-[#A27B6E]">Flagged with isSample: true</span>
          </div>

          {sampleProjects.length === 0 ? (
            <p className="text-xs text-[#A27B6E] py-2">No sample projects present.</p>
          ) : (
            <div className="divide-y divide-[#F0DED4]">
              {sampleProjects.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-[#613E35]">{p.title}</div>
                    <div className="text-xs text-[#A27B6E]">{p.level} · {Array.isArray(p.techUsed) ? p.techUsed.join(', ') : p.techUsed}</div>
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="p-1.5 rounded-lg text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                    title="Delete individual sample project"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sample Skills */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0DED4] pb-3">
            <h2 className="text-sm font-semibold text-[#613E35]">
              Sample Skills ({sampleSkills.length})
            </h2>
            <span className="text-xs text-[#A27B6E]">Flagged with isSample: true</span>
          </div>

          {sampleSkills.length === 0 ? (
            <p className="text-xs text-[#A27B6E] py-2">No sample skills present.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sampleSkills.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#FFF8F3] border border-[#F0DED4] text-[#613E35]"
                >
                  <span>{s.name} ({s.proficiency}%)</span>
                  <button
                    onClick={() => deleteSkill(s.id)}
                    className="text-[#A27B6E] hover:text-[#DC2626]"
                    title="Delete sample skill"
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sample Certifications */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0DED4] pb-3">
            <h2 className="text-sm font-semibold text-[#613E35]">
              Sample Certifications ({sampleCerts.length})
            </h2>
            <span className="text-xs text-[#A27B6E]">Flagged with isSample: true</span>
          </div>

          {sampleCerts.length === 0 ? (
            <p className="text-xs text-[#A27B6E] py-2">No sample certifications present.</p>
          ) : (
            <div className="divide-y divide-[#F0DED4]">
              {sampleCerts.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-[#613E35]">{c.title}</div>
                    <div className="text-xs text-[#A27B6E]">{c.organization} ({c.date})</div>
                  </div>
                  <button
                    onClick={() => deleteCertification(c.id)}
                    className="p-1.5 rounded-lg text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Dialog for Bulk Purge */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#F0DED4] rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-semibold text-center text-[#613E35] mb-2">
              Confirm Bulk Deletion
            </h3>

            <p className="text-xs text-center text-[#A27B6E] leading-relaxed mb-6">
              Are you sure you want to delete all <span className="font-semibold text-[#DC2626]">{totalSampleCount} sample records</span>? This will permanently remove only records marked with <code className="text-[#D98C70]">isSample: true</code>. Your verified information and custom records will NOT be touched.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                className="btn-secondary text-xs h-10 px-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkRemove}
                className="p-2.5 px-5 rounded-lg bg-[#DC2626] text-white text-xs font-semibold hover:bg-[#B91C1C] transition-colors"
              >
                Yes, Delete Sample Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

