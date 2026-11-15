import React, { useState } from 'react';
import { Save, Settings, ToggleLeft, ToggleRight, Layout, Globe, Linkedin, Github, Code2, Phone } from 'lucide-react';
import { CodeChefIcon } from '../../components/icons/CodeChefIcon';
import { useData } from '../../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../../data/socialLinks';

export const AdminSettingsView = () => {
  const { data, updateSettings, updateSocialLinks, updateProfile } = useData();
  const settings = data.settings || {};
  const social = data.social || {};
  const profile = data.profile || {};

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
    sections: { ...sections },
    linkedin: social.linkedin || DEFAULT_SOCIAL_LINKS.linkedin,
    github: social.github || DEFAULT_SOCIAL_LINKS.github,
    leetcode: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode,
    codechef: social.codechef || DEFAULT_SOCIAL_LINKS.codechef,
    phone: profile.phone || social.phone || '+91 98765 43210'
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

    await updateSocialLinks({
      linkedin: form.linkedin,
      github: form.github,
      leetcode: form.leetcode,
      codechef: form.codechef,
      phone: form.phone
    });

    if (updateProfile) {
      await updateProfile({ phone: form.phone });
    }
  };

  const sectionLabels = [
    { key: 'hero', name: 'Hero / Home Section' },
    { key: 'work', name: 'Selected Work / Projects Section' },
    { key: 'about', name: 'About Me & B.Tech Journey' },
    { key: 'skills', name: 'Skills & Capabilities' },
    { key: 'codingProfiles', name: 'Coding Profiles (GitHub, LeetCode, CodeChef)' },
    { key: 'honors', name: 'Honors & Certifications' },
    { key: 'testimonials', name: 'Recommendations / Testimonials' },
    { key: 'contact', name: 'Contact Us Form' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#613E35]">
          Website Settings
        </h1>
        <p className="text-sm text-[#613E35] mt-1">
          Configure search engine optimization, independent social links, and toggle portfolio sections.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SEO Settings */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3">
            Search Engine Optimization (SEO)
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">SEO Title Tag</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={e => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={form.seoDescription}
              onChange={e => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
            />
          </div>
        </div>

        {/* Independent Social Links */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#613E35]" />
              <span>Independent Profile Links</span>
            </div>
            <span className="text-xs text-[#613E35] font-normal">Strict independent mapping</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#613E35]" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                value={form.linkedin}
                onChange={e => setForm({ ...form, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Github size={14} className="text-[#613E35]" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                value={form.github}
                onChange={e => setForm({ ...form, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Code2 size={14} className="text-[#613E35]" />
                <span>LeetCode URL</span>
              </label>
              <input
                type="url"
                value={form.leetcode}
                onChange={e => setForm({ ...form, leetcode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <CodeChefIcon size={14} className="text-[#613E35]" />
                <span>CodeChef URL</span>
              </label>
              <input
                type="url"
                value={form.codechef}
                onChange={e => setForm({ ...form, codechef: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-[#613E35]" />
                <span>Phone / WhatsApp Mobile Number</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3 flex items-center gap-2">
            <Layout size={18} className="text-[#613E35]" />
            <span>Enable / Disable Portfolio Sections</span>
          </h2>

          <div className="divide-y divide-[#F0DED4]">
            {sectionLabels.map(sec => {
              const isEnabled = form.sections[sec.key] !== false;
              return (
                <div key={sec.key} className="py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#613E35]">{sec.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.key)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      isEnabled
                        ? 'bg-[#FCE9DF] text-[#613E35] border border-[#F4C9B5]'
                        : 'bg-[#FFF8F3] text-[#613E35] border border-[#F0DED4]'
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
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3">
            Footer Configuration
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Footer Tagline</label>
            <input
              type="text"
              value={form.footerTagline}
              onChange={e => setForm({ ...form, footerTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Copyright Notice</label>
            <input
              type="text"
              value={form.copyrightText}
              onChange={e => setForm({ ...form, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
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
