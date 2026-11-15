import React, { useState } from 'react';
import { Save, User, Globe, Mail, Phone, MapPin, Linkedin, Github, Code2, Trophy } from 'lucide-react';
import { CodeChefIcon } from '../../components/icons/CodeChefIcon';
import { useData } from '../../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../../data/socialLinks';
import { ImageUrlInput } from '../../components/common/ImageUrlInput';

export const AdminProfileView = () => {
  const { data, updateProfile, updateSocialLinks } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const [form, setForm] = useState({
    name: profile.name || '',
    title: profile.title || '',
    intro: profile.intro || '',
    university: profile.university || 'KL University',
    graduationYear: profile.graduationYear || '2028',
    location: profile.location || 'Andhra Pradesh, India',
    email: profile.email || DEFAULT_SOCIAL_LINKS.email,
    phone: profile.phone || '+91 98765 43210',
    avatar: profile.avatar || '/msr-portrait.svg',
    bio1: Array.isArray(profile.bio) ? profile.bio[0] || '' : profile.bio || '',
    bio2: Array.isArray(profile.bio) ? profile.bio[1] || '' : '',
    bio3: Array.isArray(profile.bio) ? profile.bio[2] || '' : '',
    linkedin: social.linkedin || DEFAULT_SOCIAL_LINKS.linkedin,
    github: social.github || DEFAULT_SOCIAL_LINKS.github,
    leetcode: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode,
    codechef: social.codechef || DEFAULT_SOCIAL_LINKS.codechef,
    githubUsername: social.githubUsername || DEFAULT_SOCIAL_LINKS.githubUsername,
    leetcodeUsername: social.leetcodeUsername || DEFAULT_SOCIAL_LINKS.leetcodeUsername,
    codechefUsername: social.codechefUsername || DEFAULT_SOCIAL_LINKS.codechefUsername
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({
      name: form.name,
      title: form.title,
      intro: form.intro,
      university: form.university,
      graduationYear: form.graduationYear,
      location: form.location,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar,
      bio: [form.bio1, form.bio2, form.bio3].filter(Boolean)
    });

    await updateSocialLinks({
      linkedin: form.linkedin,
      github: form.github,
      leetcode: form.leetcode,
      codechef: form.codechef,
      githubUsername: form.githubUsername,
      leetcodeUsername: form.leetcodeUsername,
      codechefUsername: form.codechefUsername,
      email: form.email
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#102A28]">
          Personal Information & Professional Profiles
        </h1>
        <p className="text-sm text-[#4B5F5C] mt-1">
          Update your public profile, bio narratives, portrait image, and independent coding links.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Identity */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3 flex items-center gap-2">
            <User size={18} className="text-[#0F766E]" />
            <span>Identity & Academic Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
                Professional Role / Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
                University
              </label>
              <input
                type="text"
                value={form.university}
                onChange={e => setForm({ ...form, university: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
                Expected Graduation Year
              </label>
              <input
                type="text"
                value={form.graduationYear}
                onChange={e => setForm({ ...form, graduationYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">
              Hero Section Intro Tagline
            </label>
            <input
              type="text"
              value={form.intro}
              onChange={e => setForm({ ...form, intro: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Hero Portrait Image (Image URL) */}
          <div className="pt-2">
            <ImageUrlInput
              label="Hero Portrait Image URL (Firebase Spark Free Plan)"
              value={form.avatar}
              onChange={val => setForm({ ...form, avatar: val })}
              onRemove={() => setForm({ ...form, avatar: '/msr-portrait.svg' })}
              placeholder="https://example.com/msr.jpg or /msr-portrait.svg"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        </div>

        {/* Narrative Bio */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3">
            About Me — Narrative Paragraphs
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Paragraph 1 (Introduction & Academic Focus)</label>
            <textarea
              rows={3}
              value={form.bio1}
              onChange={e => setForm({ ...form, bio1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Paragraph 2 (Engineering Philosophy & Tech Stack)</label>
            <textarea
              rows={3}
              value={form.bio2}
              onChange={e => setForm({ ...form, bio2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Paragraph 3 (Continuous Learning & Aspirations)</label>
            <textarea
              rows={2}
              value={form.bio3}
              onChange={e => setForm({ ...form, bio3: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>
        </div>

        {/* Independent Social & Coding Platform Links */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#0F766E]" />
              <span>Independent Profile Links (4 Platforms)</span>
            </div>
            <span className="text-xs text-[#8A9B98] font-normal">Strict 1:1 platform mapping</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5 flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#0F766E]" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                required
                value={form.linkedin}
                onChange={e => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/marthalasurendarreddy/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5 flex items-center gap-1.5">
                <Github size={14} className="text-[#0F766E]" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                required
                value={form.github}
                onChange={e => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/SURENDAR30392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5 flex items-center gap-1.5">
                <Code2 size={14} className="text-[#0F766E]" />
                <span>LeetCode URL</span>
              </label>
              <input
                type="url"
                required
                value={form.leetcode}
                onChange={e => setForm({ ...form, leetcode: e.target.value })}
                placeholder="https://leetcode.com/u/kl_2400030392/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5 flex items-center gap-1.5">
                <CodeChefIcon size={14} className="text-[#0F766E]" />
                <span>CodeChef URL</span>
              </label>
              <input
                type="url"
                required
                value={form.codechef}
                onChange={e => setForm({ ...form, codechef: e.target.value })}
                placeholder="https://www.codechef.com/users/kl2400030392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">GitHub Username</label>
              <input
                type="text"
                value={form.githubUsername}
                onChange={e => setForm({ ...form, githubUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">LeetCode Username</label>
              <input
                type="text"
                value={form.leetcodeUsername}
                onChange={e => setForm({ ...form, leetcodeUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">CodeChef Username</label>
              <input
                type="text"
                value={form.codechefUsername}
                onChange={e => setForm({ ...form, codechefUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Contact Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary h-11 px-6 text-sm"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>

      </form>
    </div>
  );
};
