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
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ImageUrlInput } from '../../components/common/ImageUrlInput';

export const AdminProjectsView = () => {
  const { data, addProject, updateProject, deleteProject } = useData();
  const projects = data.projects || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
          <h1 className="text-2xl font-semibold text-[#613E35]">
            Project Management
          </h1>
          <p className="text-sm text-[#613E35] mt-1">
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
      <div className="bg-white border border-[#F0DED4] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FFF8F3] border-b border-[#F0DED4] text-xs font-semibold text-[#613E35] uppercase">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0DED4]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#FFF8F3]/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-md bg-[#FCE9DF] border border-[#F0DED4] overflow-hidden shrink-0">
                        {proj.image ? (
                          <img src={proj.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#613E35]">No Pic</div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-[#613E35] flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.featured && (
                            <Star size={13} className="text-[#B45309] fill-[#B45309]" />
                          )}
                        </div>
                        <div className="text-xs text-[#613E35] line-clamp-1 max-w-sm">
                          {proj.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-[#FCE9DF] text-[#613E35] font-medium border border-[#F0DED4]">
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
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#613E35]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A27B6E]" />
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
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FCE9DF] text-[#613E35]">
                        Verified
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 rounded-lg text-[#613E35] hover:text-[#D98C70] hover:bg-[#FCE9DF]"
                        title="Edit Project"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg text-[#613E35] hover:text-[#DC2626] hover:bg-[#FEF2F2]"
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
          <div className="bg-white border border-[#F0DED4] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-[#F0DED4] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#613E35]">
                {currentId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="p-1 text-[#613E35] hover:text-[#613E35]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Distributed Task Orchestrator"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary shown on the project card"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">Complexity Level</label>
                  <select
                    value={form.level}
                    onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  >
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fundamental">Fundamental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={form.techUsed}
                    onChange={e => setForm({ ...form, techUsed: e.target.value })}
                    placeholder="Java, Spring Boot, React, MySQL"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/SURENDAR30392/repo"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
              </div>

              {/* Project Image (Spark Free Plan URL) */}
              <div>
                <ImageUrlInput
                  label="Project Cover Image URL (Firebase Spark Free Plan)"
                  value={form.image}
                  onChange={newVal => setForm({ ...form, image: newVal })}
                  onRemove={() => setForm({ ...form, image: '' })}
                  placeholder="https://images.unsplash.com/... or GitHub raw image URL"
                  aspectRatio="aspect-[16/10]"
                />
              </div>

              {/* Problem / Solution Detailed info */}
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">The Problem / Challenge</label>
                <textarea
                  rows={2}
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  placeholder="What technical problem does this project address?"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">The Solution / Engineering Outcome</label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={e => setForm({ ...form, solution: e.target.value })}
                  placeholder="How was it implemented and what were the outcomes?"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70] resize-none"
                />
              </div>

              {/* Checkbox Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#613E35]">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="rounded text-[#613E35] focus:ring-[#F4C9B5]"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#613E35]">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm({ ...form, published: e.target.checked })}
                    className="rounded text-[#613E35] focus:ring-[#F4C9B5]"
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

              <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-end gap-3">
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

