import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Code2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminSkillsView = () => {
  const { data, addSkill, updateSkill, deleteSkill } = useData();
  const skills = data.skills || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const emptyForm = {
    name: '',
    category: 'Programming Languages',
    proficiency: 85,
    isSample: false
  };

  const [form, setForm] = useState(emptyForm);

  const openAddModal = () => {
    setForm(emptyForm);
    setCurrentId(null);
    setIsEditing(true);
  };

  const openEditModal = (s) => {
    setForm({
      name: s.name || '',
      category: s.category || 'Programming Languages',
      proficiency: s.proficiency || 85,
      isSample: Boolean(s.isSample)
    });
    setCurrentId(s.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateSkill(currentId, form);
    } else {
      await addSkill(form);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      await deleteSkill(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#102A28]">
            Skills Management
          </h1>
          <p className="text-sm text-[#4B5F5C] mt-1">
            Configure technical proficiencies, programming languages, and engineering tools.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-sm h-10 px-4"
        >
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="bg-white border border-[#DDE7E5] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F7FAFA] border-b border-[#DDE7E5] text-xs font-semibold text-[#8A9B98] uppercase">
            <tr>
              <th className="px-6 py-4">Skill Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Proficiency</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE7E5]">
            {skills.map((s) => (
              <tr key={s.id} className="hover:bg-[#F7FAFA]/60 transition-colors">
                <td className="px-6 py-4 font-semibold text-[#102A28]">
                  {s.name}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#E6F4F2] text-[#0F766E] font-medium border border-[#DDE7E5]">
                    {s.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[#EEF4F3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0F766E]" style={{ width: `${s.proficiency || 80}%` }} />
                    </div>
                    <span className="text-xs text-[#8A9B98]">{s.proficiency}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {s.isSample ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FDE68A] text-[#B45309]">
                      Sample
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#E6F4F2] text-[#0F766E]">
                      Verified
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2]"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id, s.name)}
                      className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DDE7E5] rounded-xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E5] mb-4">
              <h2 className="text-base font-semibold text-[#102A28]">
                {currentId ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#8A9B98] hover:text-[#102A28]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Java (OOP, Multithreading)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                >
                  <option value="Programming Languages">Programming Languages & Algorithms</option>
                  <option value="Backend & Cloud">Backend & Cloud Systems</option>
                  <option value="Frontend & Tools">Frontend & Developer Tools</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#102A28]">Proficiency Level</label>
                  <span className="text-xs font-medium text-[#0F766E]">{form.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={form.proficiency}
                  onChange={e => setForm({ ...form, proficiency: Number(e.target.value) })}
                  className="w-full accent-[#0F766E]"
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
                  <span>Mark as Sample Skill</span>
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

