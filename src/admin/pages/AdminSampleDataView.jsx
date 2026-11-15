import React, { useState } from 'react';
import { Database, Trash2, AlertTriangle, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminSampleDataView = () => {
  const { 
    data, 
    removeSampleData, 
    restoreDefaultData,
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
        <h1 className="text-2xl font-semibold text-[#102A28]">
          Sample Data Management
        </h1>
        <p className="text-sm text-[#4B5F5C] mt-1">
          Review, edit, or purge placeholder dummy data marked with <code className="text-xs bg-[#E6F4F2] text-[#0F766E] px-1.5 py-0.5 rounded">isSample: true</code>.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-[#102A28]">{totalSampleCount}</span>
            <span className="text-sm text-[#4B5F5C]">Sample Records Total</span>
          </div>
          <p className="text-xs text-[#8A9B98] mt-1">
            {totalSampleCount > 0 
              ? "All placeholder records can be deleted in one click without affecting your real data."
              : "Great job! All records in the portfolio are verified real information."
            }
          </p>
        </div>

        <div className="flex items-center gap-3">
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
        
        {/* Sample Projects */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#DDE7E5] pb-3">
            <h2 className="text-sm font-semibold text-[#102A28]">
              Sample Projects ({sampleProjects.length})
            </h2>
            <span className="text-xs text-[#8A9B98]">Flagged with isSample: true</span>
          </div>

          {sampleProjects.length === 0 ? (
            <p className="text-xs text-[#8A9B98] py-2">No sample projects present.</p>
          ) : (
            <div className="divide-y divide-[#DDE7E5]">
              {sampleProjects.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-[#102A28]">{p.title}</div>
                    <div className="text-xs text-[#8A9B98]">{p.level} · {Array.isArray(p.techUsed) ? p.techUsed.join(', ') : p.techUsed}</div>
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="p-1.5 rounded-lg text-[#8A9B98] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
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
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#DDE7E5] pb-3">
            <h2 className="text-sm font-semibold text-[#102A28]">
              Sample Skills ({sampleSkills.length})
            </h2>
            <span className="text-xs text-[#8A9B98]">Flagged with isSample: true</span>
          </div>

          {sampleSkills.length === 0 ? (
            <p className="text-xs text-[#8A9B98] py-2">No sample skills present.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sampleSkills.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#F7FAFA] border border-[#DDE7E5] text-[#102A28]"
                >
                  <span>{s.name} ({s.proficiency}%)</span>
                  <button
                    onClick={() => deleteSkill(s.id)}
                    className="text-[#8A9B98] hover:text-[#DC2626]"
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
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#DDE7E5] pb-3">
            <h2 className="text-sm font-semibold text-[#102A28]">
              Sample Certifications ({sampleCerts.length})
            </h2>
            <span className="text-xs text-[#8A9B98]">Flagged with isSample: true</span>
          </div>

          {sampleCerts.length === 0 ? (
            <p className="text-xs text-[#8A9B98] py-2">No sample certifications present.</p>
          ) : (
            <div className="divide-y divide-[#DDE7E5]">
              {sampleCerts.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-[#102A28]">{c.title}</div>
                    <div className="text-xs text-[#8A9B98]">{c.organization} ({c.date})</div>
                  </div>
                  <button
                    onClick={() => deleteCertification(c.id)}
                    className="p-1.5 rounded-lg text-[#8A9B98] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
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
          <div className="bg-white border border-[#DDE7E5] rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-semibold text-center text-[#102A28] mb-2">
              Confirm Bulk Deletion
            </h3>

            <p className="text-xs text-center text-[#4B5F5C] leading-relaxed mb-6">
              Are you sure you want to delete all <span className="font-semibold text-[#DC2626]">{totalSampleCount} sample records</span>? This will permanently remove only records marked with <code className="text-[#0F766E]">isSample: true</code>. Your verified information and custom records will NOT be touched.
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

