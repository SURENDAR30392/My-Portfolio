import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Github, 
  Star, 
  Eye, 
  EyeOff, 
  Upload, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminProjectsView = () => {
  const { data, addProject, updateProject, deleteProject, uploadFile } = useData();
  const projects = data.projects || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const emptyForm = {
    title: '',
    description: '',
    level: 'Advanced',
    problem: '',
    solution: '',
    techUsed: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: true,
    isSample: false
  };

  const [form, setForm] = useState(emptyForm);

  const openAddModal = () => {
    setForm(emptyForm);
    setCurrentId(null);
    setIsEditing(true);
  };

  const openEditModal = (proj) => {
    setForm({
      title: proj.title || '',
      description: proj.description || '',
      level: proj.level || 'Advanced',
      problem: proj.problem || '',
      solution: proj.solution || '',
      techUsed: Array.isArray(proj.techUsed) ? proj.techUsed.join(', ') : proj.techUsed || '',
      image: proj.image || '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: Boolean(proj.featured),
      published: proj.published !== false,
      isSample: Boolean(proj.isSample)
    });
    setCurrentId(proj.id);
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'projects');
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Project image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techUsed: form.techUsed.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (currentId) {
      await updateProject(currentId, payload);
    } else {
      await addProject(payload);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete project "${title}"?`)) {
      await deleteProject(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#102A28]">
            Project Management
          </h1>
          <p className="text-sm text-[#4B5F5C] mt-1">
            Add, update, reorder, or publish software engineering projects with full details.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-sm h-10 px-4"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Table / Cards */}
      <div className="bg-white border border-[#DDE7E5] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7FAFA] border-b border-[#DDE7E5] text-xs font-semibold text-[#8A9B98] uppercase">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E5]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#F7FAFA]/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-md bg-[#E6F4F2] border border-[#DDE7E5] overflow-hidden shrink-0">
                        {proj.image ? (
                          <img src={proj.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#0F766E]">No Pic</div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-[#102A28] flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.featured && (
                            <Star size={13} className="text-[#B45309] fill-[#B45309]" />
                          )}
                        </div>
                        <div className="text-xs text-[#8A9B98] line-clamp-1 max-w-sm">
                          {proj.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-[#E6F4F2] text-[#0F766E] font-medium border border-[#DDE7E5]">
                      {proj.level || 'Advanced'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {proj.published !== false ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#15803D] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#8A9B98]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A9B98]" />
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {proj.isSample ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FDE68A] text-[#B45309]">
                        Sample Data
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
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2]"
                        title="Edit Project"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg text-[#4B5F5C] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DDE7E5] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-[#DDE7E5] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#102A28]">
                {currentId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="p-1 text-[#8A9B98] hover:text-[#102A28]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Distributed Task Orchestrator"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary shown on the project card"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">Complexity Level</label>
                  <select
                    value={form.level}
                    onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                  >
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fundamental">Fundamental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={form.techUsed}
                    onChange={e => setForm({ ...form, techUsed: e.target.value })}
                    placeholder="Java, Spring Boot, React, MySQL"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/SURENDAR30392/repo"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A28] mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {/* Project Image */}
              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">Project Cover Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                    placeholder="https://... or upload file"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                  <label className="btn-secondary text-xs h-9 px-3 cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                    <Upload size={14} />
                    <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Problem / Solution Detailed info */}
              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">The Problem / Challenge</label>
                <textarea
                  rows={2}
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  placeholder="What technical problem does this project address?"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A28] mb-1">The Solution / Engineering Outcome</label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={e => setForm({ ...form, solution: e.target.value })}
                  placeholder="How was it implemented and what were the outcomes?"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E] resize-none"
                />
              </div>

              {/* Checkbox Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#102A28]">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="rounded text-[#0F766E] focus:ring-[#7CC7BD]"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#102A28]">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm({ ...form, published: e.target.checked })}
                    className="rounded text-[#0F766E] focus:ring-[#7CC7BD]"
                  />
                  <span>Published on Website</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#B45309]">
                  <input
                    type="checkbox"
                    checked={form.isSample}
                    onChange={e => setForm({ ...form, isSample: e.target.checked })}
                    className="rounded text-[#B45309] focus:ring-[#FCD34D]"
                  />
                  <span>Flag as Sample Record</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#DDE7E5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary text-xs h-10 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs h-10 px-5"
                >
                  {currentId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
