import React, { useState } from 'react';
import { Plus, Edit3, Trash2, GraduationCap, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminEducationView = () => {
  const { data, addEducation, updateEducation, deleteEducation } = useData();
  const education = data.education || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const emptyForm = {
    institution: '',
    degree: '',
    dates: '',
    location: '',
    description: '',
    isSample: false
  };

  const [form, setForm] = useState(emptyForm);

  const openAddModal = () => {
    setForm(emptyForm);
    setCurrentId(null);
    setIsEditing(true);
  };

  const openEditModal = (e) => {
    setForm({
      institution: e.institution || '',
      degree: e.degree || '',
      dates: e.dates || '',
      location: e.location || '',
      description: e.description || '',
      isSample: Boolean(e.isSample)
    });
    setCurrentId(e.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateEducation(currentId, form);
    } else {
      await addEducation(form);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, degree) => {
    if (window.confirm(`Delete education entry "${degree}"?`)) {
      await deleteEducation(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#172554]">
            Education Management
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Manage academic degrees, university records, and coursework at KL University.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-sm h-10 px-4"
        >
          <Plus size={16} />
          <span>Add Education Record</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[#172554]">{edu.degree}</h3>
                  {edu.isSample && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                      Sample
                    </span>
                  )}
                </div>
                <div className="text-sm text-[#2563EB] font-medium mt-0.5">{edu.institution}</div>
                <div className="text-xs text-[#94A3B8] mt-1">{edu.dates} · {edu.location}</div>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed max-w-xl">{edu.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => openEditModal(edu)}
                className="btn-secondary text-xs h-9 px-3"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(edu.id, edu.degree)}
                className="p-2 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2]"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
              <h2 className="text-base font-semibold text-[#172554]">
                {currentId ? 'Edit Education' : 'Add Education Record'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#94A3B8] hover:text-[#172554]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1">Degree & Branch *</label>
                <input
                  type="text"
                  required
                  value={form.degree}
                  onChange={e => setForm({ ...form, degree: e.target.value })}
                  placeholder="e.g. B.Tech in Computer Science and Engineering"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={e => setForm({ ...form, institution: e.target.value })}
                  placeholder="KL University"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1">Dates / Timeline</label>
                  <input
                    type="text"
                    value={form.dates}
                    onChange={e => setForm({ ...form, dates: e.target.value })}
                    placeholder="2024 – 2028 (Expected)"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="Andhra Pradesh, India"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1">Description / Coursework</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563EB] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
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

