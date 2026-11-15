import React, { useState } from 'react';
import { Plus, Edit3, Trash2, History, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminExperienceView = () => {
  const { data, addExperience, updateExperience, deleteExperience } = useData();
  const experience = data.experience || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const emptyForm = {
    role: '',
    organization: '',
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

  const openEditModal = (exp) => {
    setForm({
      role: exp.role || '',
      organization: exp.organization || '',
      dates: exp.dates || '',
      location: exp.location || '',
      description: exp.description || '',
      isSample: Boolean(exp.isSample)
    });
    setCurrentId(exp.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateExperience(currentId, form);
    } else {
      await addExperience(form);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, role) => {
    if (window.confirm(`Delete experience entry "${role}"?`)) {
      await deleteExperience(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#613E35]">
            Experience Management
          </h1>
          <p className="text-sm text-[#A27B6E] mt-1">
            Manage internships, software engineering roles, and student laboratory contributions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-sm h-10 px-4"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#FCE9DF] text-[#D98C70] flex items-center justify-center shrink-0">
                <History size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[#613E35]">{exp.role}</h3>
                  {exp.isSample && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                      Sample
                    </span>
                  )}
                </div>
                <div className="text-sm text-[#D98C70] font-medium mt-0.5">{exp.organization}</div>
                <div className="text-xs text-[#A27B6E] mt-1">{exp.dates} · {exp.location}</div>
                <p className="text-xs text-[#A27B6E] mt-2 leading-relaxed max-w-xl">{exp.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => openEditModal(exp)}
                className="btn-secondary text-xs h-9 px-3"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(exp.id, exp.role)}
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
          <div className="bg-white border border-[#F0DED4] rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0DED4] mb-4">
              <h2 className="text-base font-semibold text-[#613E35]">
                {currentId ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#A27B6E] hover:text-[#613E35]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">Role / Title *</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Backend Engineering Intern"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={e => setForm({ ...form, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">Dates</label>
                  <input
                    type="text"
                    value={form.dates}
                    onChange={e => setForm({ ...form, dates: e.target.value })}
                    placeholder="2025 – Present"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70] resize-none"
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
                  <span>Mark as Sample Experience</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-end gap-3">
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

