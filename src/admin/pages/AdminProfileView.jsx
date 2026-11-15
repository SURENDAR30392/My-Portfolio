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
    codechefUsername: social.codechefUsername || DEFAULT_SOCIAL_LINKS.codechefUsername,

    // Coding Profile Cards Content
    codingSectionTitle: social.codingSectionTitle || DEFAULT_SOCIAL_LINKS.codingSectionTitle || "Coding Profiles & Contributions",
    codingSectionSubtitle: social.codingSectionSubtitle || DEFAULT_SOCIAL_LINKS.codingSectionSubtitle || "Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories.",

    githubDescription: social.githubDescription || DEFAULT_SOCIAL_LINKS.githubDescription,
    githubStat1Value: social.githubStat1Value || DEFAULT_SOCIAL_LINKS.githubStat1Value,
    githubStat1Label: social.githubStat1Label || DEFAULT_SOCIAL_LINKS.githubStat1Label,
    githubStat2Value: social.githubStat2Value || DEFAULT_SOCIAL_LINKS.githubStat2Value,
    githubStat2Label: social.githubStat2Label || DEFAULT_SOCIAL_LINKS.githubStat2Label,
    githubStat3Value: social.githubStat3Value || DEFAULT_SOCIAL_LINKS.githubStat3Value,
    githubStat3Label: social.githubStat3Label || DEFAULT_SOCIAL_LINKS.githubStat3Label,

    leetcodeDescription: social.leetcodeDescription || DEFAULT_SOCIAL_LINKS.leetcodeDescription,
    leetcodeStat1Value: social.leetcodeStat1Value || DEFAULT_SOCIAL_LINKS.leetcodeStat1Value,
    leetcodeStat1Label: social.leetcodeStat1Label || DEFAULT_SOCIAL_LINKS.leetcodeStat1Label,
    leetcodeStat2Value: social.leetcodeStat2Value || DEFAULT_SOCIAL_LINKS.leetcodeStat2Value,
    leetcodeStat2Label: social.leetcodeStat2Label || DEFAULT_SOCIAL_LINKS.leetcodeStat2Label,
    leetcodeStat3Value: social.leetcodeStat3Value || DEFAULT_SOCIAL_LINKS.leetcodeStat3Value,
    leetcodeStat3Label: social.leetcodeStat3Label || DEFAULT_SOCIAL_LINKS.leetcodeStat3Label,

    codechefDescription: social.codechefDescription || DEFAULT_SOCIAL_LINKS.codechefDescription,
    codechefStat1Value: social.codechefStat1Value || DEFAULT_SOCIAL_LINKS.codechefStat1Value,
    codechefStat1Label: social.codechefStat1Label || DEFAULT_SOCIAL_LINKS.codechefStat1Label,
    codechefStat2Value: social.codechefStat2Value || DEFAULT_SOCIAL_LINKS.codechefStat2Value,
    codechefStat2Label: social.codechefStat2Label || DEFAULT_SOCIAL_LINKS.codechefStat2Label,
    codechefStat3Value: social.codechefStat3Value || DEFAULT_SOCIAL_LINKS.codechefStat3Value,
    codechefStat3Label: social.codechefStat3Label || DEFAULT_SOCIAL_LINKS.codechefStat3Label
  });

  React.useEffect(() => {
    if (profile.name || social.github || profile.phone) {
      setForm(prev => ({
        ...prev,
        name: profile.name ?? prev.name,
        title: profile.title ?? prev.title,
        intro: profile.intro ?? prev.intro,
        university: profile.university ?? prev.university,
        graduationYear: profile.graduationYear ?? prev.graduationYear,
        location: profile.location ?? prev.location,
        email: profile.email ?? social.email ?? prev.email,
        phone: profile.phone ?? social.phone ?? prev.phone,
        avatar: profile.avatar ?? prev.avatar,
        bio1: Array.isArray(profile.bio) ? profile.bio[0] || '' : profile.bio || prev.bio1,
        bio2: Array.isArray(profile.bio) ? profile.bio[1] || '' : prev.bio2,
        bio3: Array.isArray(profile.bio) ? profile.bio[2] || '' : prev.bio3,
        linkedin: social.linkedin ?? prev.linkedin,
        github: social.github ?? prev.github,
        leetcode: social.leetcode ?? prev.leetcode,
        codechef: social.codechef ?? prev.codechef,
        githubUsername: social.githubUsername ?? prev.githubUsername,
        leetcodeUsername: social.leetcodeUsername ?? prev.leetcodeUsername,
        codechefUsername: social.codechefUsername ?? prev.codechefUsername,
        codingSectionTitle: social.codingSectionTitle ?? prev.codingSectionTitle,
        codingSectionSubtitle: social.codingSectionSubtitle ?? prev.codingSectionSubtitle,
        githubDescription: social.githubDescription ?? prev.githubDescription,
        githubStat1Value: social.githubStat1Value ?? prev.githubStat1Value,
        githubStat1Label: social.githubStat1Label ?? prev.githubStat1Label,
        githubStat2Value: social.githubStat2Value ?? prev.githubStat2Value,
        githubStat2Label: social.githubStat2Label ?? prev.githubStat2Label,
        githubStat3Value: social.githubStat3Value ?? prev.githubStat3Value,
        githubStat3Label: social.githubStat3Label ?? prev.githubStat3Label,
        leetcodeDescription: social.leetcodeDescription ?? prev.leetcodeDescription,
        leetcodeStat1Value: social.leetcodeStat1Value ?? prev.leetcodeStat1Value,
        leetcodeStat1Label: social.leetcodeStat1Label ?? prev.leetcodeStat1Label,
        leetcodeStat2Value: social.leetcodeStat2Value ?? prev.leetcodeStat2Value,
        leetcodeStat2Label: social.leetcodeStat2Label ?? prev.leetcodeStat2Label,
        leetcodeStat3Value: social.leetcodeStat3Value ?? prev.leetcodeStat3Value,
        leetcodeStat3Label: social.leetcodeStat3Label ?? prev.leetcodeStat3Label,
        codechefDescription: social.codechefDescription ?? prev.codechefDescription,
        codechefStat1Value: social.codechefStat1Value ?? prev.codechefStat1Value,
        codechefStat1Label: social.codechefStat1Label ?? prev.codechefStat1Label,
        codechefStat2Value: social.codechefStat2Value ?? prev.codechefStat2Value,
        codechefStat2Label: social.codechefStat2Label ?? prev.codechefStat2Label,
        codechefStat3Value: social.codechefStat3Value ?? prev.codechefStat3Value,
        codechefStat3Label: social.codechefStat3Label ?? prev.codechefStat3Label
      }));
    }
  }, [profile, social]);

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
      email: form.email,
      phone: form.phone,
      codingSectionTitle: form.codingSectionTitle,
      codingSectionSubtitle: form.codingSectionSubtitle,
      githubDescription: form.githubDescription,
      githubStat1Value: form.githubStat1Value,
      githubStat1Label: form.githubStat1Label,
      githubStat2Value: form.githubStat2Value,
      githubStat2Label: form.githubStat2Label,
      githubStat3Value: form.githubStat3Value,
      githubStat3Label: form.githubStat3Label,
      leetcodeDescription: form.leetcodeDescription,
      leetcodeStat1Value: form.leetcodeStat1Value,
      leetcodeStat1Label: form.leetcodeStat1Label,
      leetcodeStat2Value: form.leetcodeStat2Value,
      leetcodeStat2Label: form.leetcodeStat2Label,
      leetcodeStat3Value: form.leetcodeStat3Value,
      leetcodeStat3Label: form.leetcodeStat3Label,
      codechefDescription: form.codechefDescription,
      codechefStat1Value: form.codechefStat1Value,
      codechefStat1Label: form.codechefStat1Label,
      codechefStat2Value: form.codechefStat2Value,
      codechefStat2Label: form.codechefStat2Label,
      codechefStat3Value: form.codechefStat3Value,
      codechefStat3Label: form.codechefStat3Label
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#172554]">
          Personal Information & Professional Profiles
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Update your public profile, bio narratives, portrait image, and independent coding links.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Identity */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-3 flex items-center gap-2">
            <User size={18} className="text-[#2563EB]" />
            <span>Identity & Academic Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Professional Role / Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                University
              </label>
              <input
                type="text"
                value={form.university}
                onChange={e => setForm({ ...form, university: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Expected Graduation Year
              </label>
              <input
                type="text"
                value={form.graduationYear}
                onChange={e => setForm({ ...form, graduationYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#2563EB]" />
                <span>Campus Location</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Andhra Pradesh, India"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-[#2563EB]" />
                <span>Phone / WhatsApp Mobile Number</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#172554] mb-1.5">
              Hero Section Intro Tagline
            </label>
            <input
              type="text"
              value={form.intro}
              onChange={e => setForm({ ...form, intro: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
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
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-3">
            About Me — Narrative Paragraphs
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#172554] mb-1.5">Paragraph 1 (Introduction & Academic Focus)</label>
            <textarea
              rows={3}
              value={form.bio1}
              onChange={e => setForm({ ...form, bio1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#172554] mb-1.5">Paragraph 2 (Engineering Philosophy & Tech Stack)</label>
            <textarea
              rows={3}
              value={form.bio2}
              onChange={e => setForm({ ...form, bio2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#172554] mb-1.5">Paragraph 3 (Continuous Learning & Aspirations)</label>
            <textarea
              rows={2}
              value={form.bio3}
              onChange={e => setForm({ ...form, bio3: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
            />
          </div>
        </div>

        {/* Independent Social & Coding Platform Links */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#2563EB]" />
              <span>Independent Profile Links (4 Platforms)</span>
            </div>
            <span className="text-xs text-[#94A3B8] font-normal">Strict 1:1 platform mapping</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#2563EB]" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                required
                value={form.linkedin}
                onChange={e => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/marthalasurendarreddy/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Github size={14} className="text-[#2563EB]" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                required
                value={form.github}
                onChange={e => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/SURENDAR30392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Code2 size={14} className="text-[#2563EB]" />
                <span>LeetCode URL</span>
              </label>
              <input
                type="url"
                required
                value={form.leetcode}
                onChange={e => setForm({ ...form, leetcode: e.target.value })}
                placeholder="https://leetcode.com/u/kl_2400030392/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <CodeChefIcon size={14} className="text-[#2563EB]" />
                <span>CodeChef URL</span>
              </label>
              <input
                type="url"
                required
                value={form.codechef}
                onChange={e => setForm({ ...form, codechef: e.target.value })}
                placeholder="https://www.codechef.com/users/kl2400030392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">GitHub Username</label>
              <input
                type="text"
                value={form.githubUsername}
                onChange={e => setForm({ ...form, githubUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">LeetCode Username</label>
              <input
                type="text"
                value={form.leetcodeUsername}
                onChange={e => setForm({ ...form, leetcodeUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">CodeChef Username</label>
              <input
                type="text"
                value={form.codechefUsername}
                onChange={e => setForm({ ...form, codechefUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Mail size={14} className="text-[#2563EB]" />
                <span>Contact Email</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="marthalasurendarreddy@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-[#2563EB]" />
                <span>Phone / WhatsApp Mobile Number</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>
        </div>

        {/* Coding Profiles & Contributions Cards Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-semibold text-[#172554] flex items-center gap-2">
              <Code2 size={18} className="text-[#2563EB]" />
              <span>Coding Profiles Cards Content (Descriptions & Stat Badges)</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Edit the card descriptions and the 3 metric tags displayed on GitHub, LeetCode, and CodeChef cards.
            </p>
          </div>

          {/* GitHub Card Editor */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#172554]">
              <Github size={16} className="text-[#2563EB]" />
              <span>GitHub Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.githubDescription}
                onChange={e => setForm({ ...form, githubDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Java)"
                  value={form.githubStat1Value}
                  onChange={e => setForm({ ...form, githubStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Primary Tech)"
                  value={form.githubStat1Label}
                  onChange={e => setForm({ ...form, githubStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Public)"
                  value={form.githubStat2Value}
                  onChange={e => setForm({ ...form, githubStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Repositories)"
                  value={form.githubStat2Label}
                  onChange={e => setForm({ ...form, githubStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Active)"
                  value={form.githubStat3Value}
                  onChange={e => setForm({ ...form, githubStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#2563EB] font-semibold focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Commits)"
                  value={form.githubStat3Label}
                  onChange={e => setForm({ ...form, githubStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* LeetCode Card Editor */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#172554]">
              <Code2 size={16} className="text-[#2563EB]" />
              <span>LeetCode Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.leetcodeDescription}
                onChange={e => setForm({ ...form, leetcodeDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. 150+)"
                  value={form.leetcodeStat1Value}
                  onChange={e => setForm({ ...form, leetcodeStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#15803D] font-semibold focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Solved)"
                  value={form.leetcodeStat1Label}
                  onChange={e => setForm({ ...form, leetcodeStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. DSA)"
                  value={form.leetcodeStat2Value}
                  onChange={e => setForm({ ...form, leetcodeStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Algorithms)"
                  value={form.leetcodeStat2Label}
                  onChange={e => setForm({ ...form, leetcodeStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Java)"
                  value={form.leetcodeStat3Value}
                  onChange={e => setForm({ ...form, leetcodeStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#2563EB] font-semibold focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Language)"
                  value={form.leetcodeStat3Label}
                  onChange={e => setForm({ ...form, leetcodeStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* CodeChef Card Editor */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#172554]">
              <CodeChefIcon size={16} className="text-[#2563EB]" />
              <span>CodeChef Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.codechefDescription}
                onChange={e => setForm({ ...form, codechefDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Div 4/3)"
                  value={form.codechefStat1Value}
                  onChange={e => setForm({ ...form, codechefStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Division)"
                  value={form.codechefStat1Label}
                  onChange={e => setForm({ ...form, codechefStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Contests)"
                  value={form.codechefStat2Value}
                  onChange={e => setForm({ ...form, codechefStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Starters)"
                  value={form.codechefStat2Label}
                  onChange={e => setForm({ ...form, codechefStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Active)"
                  value={form.codechefStat3Value}
                  onChange={e => setForm({ ...form, codechefStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#2563EB] font-semibold focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Rating)"
                  value={form.codechefStat3Label}
                  onChange={e => setForm({ ...form, codechefStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
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
