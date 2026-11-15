import React, { useState } from 'react';
import { Save, Upload, User, Globe, Mail, Phone, MapPin, Linkedin, Github, Code2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminProfileView = () => {
  const { data, updateProfile, updateSocialLinks, uploadFile } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const [form, setForm] = useState({
    name: profile.name || '',
    title: profile.title || '',
    intro: profile.intro || '',
    university: profile.university || '',
    graduationYear: profile.graduationYear || '2028',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    avatar: profile.avatar || '',
    bio1: Array.isArray(profile.bio) ? profile.bio[0] || '' : profile.bio || '',
    bio2: Array.isArray(profile.bio) ? profile.bio[1] || '' : '',
    bio3: Array.isArray(profile.bio) ? profile.bio[2] || '' : '',
    linkedin: social.linkedin || '',
    github: social.github || '',
    leetcode: social.leetcode || '',
    githubUsername: social.githubUsername || 'SURENDAR30392',
    leetcodeUsername: social.leetcodeUsername || 'kl_2400030392'
  });

  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'avatars');
      setForm(prev => ({ ...prev, avatar: url }));
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

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
      githubUsername: form.githubUsername,
      leetcodeUsername: form.leetcodeUsername,
      email: form.email
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#102A28]">
          Personal Information
        </h1>
        <p className="text-sm text-[#4B5F5C] mt-1">
          Update your public profile, bio narratives, portrait image, and professional links.
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

          {/* Avatar Picture */}
          <div>
            <label className="block text-xs font-semibold text-[#102A28] mb-2">
              Hero Portrait Image
            </label>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-[#E6F4F2] border border-[#DDE7E5] overflow-hidden shrink-0 flex items-center justify-center">
                {form.avatar ? (
                  <img src={form.avatar} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <User size={32} className="text-[#0F766E]" />
                )}
              </div>
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  value={form.avatar}
                  onChange={e => setForm({ ...form, avatar: e.target.value })}
                  placeholder="Image URL or upload below"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DDE7E5] text-xs focus:outline-none focus:border-[#0F766E]"
                />
                <label className="btn-secondary text-xs h-8 px-3 cursor-pointer inline-flex items-center gap-1.5">
                  <Upload size={14} />
                  <span>{uploading ? "Uploading..." : "Upload Local Photo"}</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
            </div>
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

        {/* Contact & Social Links */}
        <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#102A28] border-b border-[#DDE7E5] pb-3 flex items-center gap-2">
            <Globe size={18} className="text-[#0F766E]" />
            <span>Contact Channels & Verified Profiles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Contact Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Contact Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={e => setForm({ ...form, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">GitHub Profile URL</label>
              <input
                type="url"
                value={form.github}
                onChange={e => setForm({ ...form, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A28] mb-1.5">LeetCode Profile URL</label>
              <input
                type="url"
                value={form.leetcode}
                onChange={e => setForm({ ...form, leetcode: e.target.value })}
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
