import React, { useState } from 'react';
import { Save, Settings, ToggleLeft, ToggleRight, Layout } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminSettingsView = () => {
  const { data, updateSettings } = useData();
  const settings = data.settings || {};
  const sections = settings.sectionsEnabled || {
    hero: true,
    work: true,
    about: true,
    skills: true,
    codingProfiles: true,
    honors: true,
    testimonials: true,
    contact: true
  };

  const [form, setForm] = useState({
    seoTitle: settings.seoTitle || '',
    seoDescription: settings.seoDescription || '',
    footerTagline: settings.footerTagline || '',
    copyrightText: settings.copyrightText || '',
    sections: { ...sections }
  });

  const toggleSection = (key) => {
    setForm(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [key]: !prev.sections[key]
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSettings({
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      footerTagline: form.footerTagline,
      copyrightText: form.copyrightText,
      sectionsEnabled: form.sections
    });
  };

  const sectionLabels = [
    { key: 'hero', name: 'Hero / Home Section' },
    { key: 'work', name: 'Selected Work / Projects Section' },
    { key: 'about', name: 'About Me & B.Tech Journey' },
    { key: 'skills', name: 'Skills & Capabilities' },
    { key: 'codingProfiles', name: 'GitHub & LeetCode Profiles' },
    { key: 'honors', name: 'Honors & Certifications' },
    { key: 'testimonials', name: 'Recommendations / Testimonials' },
    { key: 'contact', name: 'Contact Us Form' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#102A28]">
          Website Settings
        </h1>
        <p className="text-sm text-[#4B5F5C] mt-1">
          Configure search engine optimization, toggle portfolio sections, and customize footer text.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SEO Settings */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3">
            Search Engine Optimization (SEO)
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">SEO Title Tag</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={e => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={form.seoDescription}
              onChange={e => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3 flex items-center gap-2">
            <Layout size={18} className="text-[#0F766E]" />
            <span>Enable / Disable Portfolio Sections</span>
          </h2>

          <div className="divide-y divide-[#DDE7E5]">
            {sectionLabels.map(sec => {
              const isEnabled = form.sections[sec.key] !== false;
              return (
                <div key={sec.key} className="py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#102A28]">{sec.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.key)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      isEnabled
                        ? 'bg-[#E6F4F2] text-[#0F766E] border border-[#7CC7BD]'
                        : 'bg-[#F7FAFA] text-[#8A9B98] border border-[#DDE7E5]'
                    }`}
                  >
                    <span>{isEnabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3">
            Footer Configuration
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Footer Tagline</label>
            <input
              type="text"
              value={form.footerTagline}
              onChange={e => setForm({ ...form, footerTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Copyright Notice</label>
            <input
              type="text"
              value={form.copyrightText}
              onChange={e => setForm({ ...form, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary h-11 px-6 text-sm"
        >
          <Save size={16} />
          <span>Save Website Settings</span>
        </button>

      </form>
    </div>
  );
};
