import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Award, X, Trophy } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ImageUrlInput } from '../../components/common/ImageUrlInput';

export const AdminCertificationsView = () => {
  const { 
    data, 
    addCertification, 
    updateCertification, 
    deleteCertification,
    addAchievement, 
    updateAchievement, 
    deleteAchievement 
  } = useData();

  const certs = data.certifications || [];
  const achievements = data.achievements || [];

  const [activeSubTab, setActiveSubTab] = useState('certs'); // 'certs' | 'achievements'
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const emptyCertForm = {
    title: '',
    organization: '',
    date: '2025',
    credentialUrl: '',
    imageUrl: '',
    description: '',
    isSample: false
  };

  const [form, setForm] = useState(emptyCertForm);

  const openAddModal = () => {
    setForm(emptyCertForm);
    setCurrentId(null);
    setIsEditing(true);
  };

  const openEditModal = (item) => {
    setForm({
      title: item.title || '',
      organization: item.organization || '',
      date: item.date || '2025',
      credentialUrl: item.credentialUrl || '',
      imageUrl: item.imageUrl || '',
      description: item.description || '',
      isSample: Boolean(item.isSample)
    });
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeSubTab === 'certs') {
      if (currentId) {
        await updateCertification(currentId, form);
      } else {
        await addCertification(form);
      }
    } else {
      if (currentId) {
        await updateAchievement(currentId, form);
      } else {
        await addAchievement(form);
      }
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      if (activeSubTab === 'certs') {
        await deleteCertification(id);
      } else {
        await deleteAchievement(id);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#102A28]">
            Certifications & Achievements
          </h1>
          <p className="text-sm text-[#4B5F5C] mt-1">
            Manage industry credentials, competitive programming honors, and hackathon awards.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-sm h-10 px-4"
        >
          <Plus size={16} />
          <span>Add {activeSubTab === 'certs' ? 'Certification' : 'Achievement'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DDE7E5] pb-3">
        <button
          onClick={() => setActiveSubTab('certs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeSubTab === 'certs'
              ? 'bg-[#E6F4F2] text-[#0F766E] font-semibold'
              : 'text-[#4B5F5C] hover:bg-[#F7FAFA]'
          }`}
        >
          <Award size={16} />
          <span>Certifications ({certs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeSubTab === 'achievements'
              ? 'bg-[#E6F4F2] text-[#0F766E] font-semibold'
              : 'text-[#4B5F5C] hover:bg-[#F7FAFA]'
          }`}
        >
          <Trophy size={16} />
          <span>Achievements ({achievements.length})</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeSubTab === 'certs' ? certs : achievements).map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                    {activeSubTab === 'certs' ? <Award size={18} /> : <Trophy size={18} />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#102A28] leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-xs text-[#8A9B98] mt-0.5">{item.organization}</div>
                  </div>
                </div>

                {item.isSample && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                    Sample
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs text-[#4B5F5C] line-clamp-2 mb-3 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#DDE7E5] flex items-center justify-between text-xs text-[#8A9B98]">
              <span>Issued: {item.date}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2]"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DDE7E5] rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E5] mb-4">
              <h2 className="text-base font-semibold text-[#102A28]">
                {currentId ? 'Edit Record' : 'Add New Record'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#8A9B98] hover:text-[#102A28]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Java SE Professional Certification"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Organization / Issuer *</label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={e => setForm({ ...form, organization: e.target.value })}
                  placeholder="e.g. Oracle / KL University"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">Date / Year</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">Verification Link</label>
                  <input
                    type="url"
                    value={form.credentialUrl}
                    onChange={e => setForm({ ...form, credentialUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div>
                <ImageUrlInput
                  label="Certificate Image / Proof URL (Firebase Spark Free Plan)"
                  value={form.imageUrl}
                  onChange={newVal => setForm({ ...form, imageUrl: newVal })}
                  onRemove={() => setForm({ ...form, imageUrl: '' })}
                  placeholder="https://... direct image link"
                  aspectRatio="aspect-[16/10]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E] resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#B45309]">
                  <input
                    type="checkbox"
                    checked={form.isSample}
                    onChange={e => setForm({ ...form, isSample: e.target.checked })}
                    className="rounded text-[#B45309]"
                  />
                  <span>Mark as Sample Record</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#DDE7E5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary text-xs h-9 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs h-9 px-4"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

