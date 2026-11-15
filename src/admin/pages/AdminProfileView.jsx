import React, { useState } from 'react';
import { Save, User, Globe, Mail, Phone, MapPin, Linkedin, Github, Code2, Trophy, BarChart2, Cpu, GraduationCap, Quote } from 'lucide-react';
import { CodeChefIcon } from '../../components/icons/CodeChefIcon';
import { useData } from '../../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../../data/socialLinks';
import { ImageUrlInput } from '../../components/common/ImageUrlInput';

const DEFAULT_ABOUT_STATS = [
  { label: "DSA Problems", value: "200+" },
  { label: "Projects Built", value: "8+" },
  { label: "CodeChef / LeetCode", value: "Active" },
  { label: "Expected Grad", value: "2028" }
];

const DEFAULT_ENGINEERING_FOCUS = [
  {
    title: "Backend Systems & Java",
    desc: "Object-oriented architecture, RESTful services, and relational database modeling.",
    icon: "Cpu"
  },
  {
    title: "Data Structures & Algorithms",
    desc: "Continuous problem solving across arrays, trees, dynamic programming, and graphs.",
    icon: "Code2"
  },
  {
    title: "Continuous Academic Learning",
    desc: "B.Tech CSE student at KL University actively participating in technical communities.",
    icon: "GraduationCap"
  }
];

export const AdminProfileView = () => {
  const { data, updateProfile, updateSocialLinks } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const currentStats = Array.isArray(profile.stats) && profile.stats.length >= 4
    ? profile.stats
    : DEFAULT_ABOUT_STATS;

  const currentFocus = Array.isArray(profile.engineeringFocus) && profile.engineeringFocus.length >= 3
    ? profile.engineeringFocus
    : DEFAULT_ENGINEERING_FOCUS;

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

    // About Section 4 Stats
    stat1Value: currentStats[0]?.value || '200+',
    stat1Label: currentStats[0]?.label || 'DSA Problems',
    stat2Value: currentStats[1]?.value || '8+',
    stat2Label: currentStats[1]?.label || 'Projects Built',
    stat3Value: currentStats[2]?.value || 'Active',
    stat3Label: currentStats[2]?.label || 'CodeChef / LeetCode',
    stat4Value: currentStats[3]?.value || '2028',
    stat4Label: currentStats[3]?.label || 'Expected Grad',

    // Software Craftsmanship Card
    craftsmanshipTitle: profile.craftsmanshipTitle || 'Software Craftsmanship',
    craftsmanshipQuote: profile.craftsmanshipQuote || profile.craftsmanshipText || "I believe in building software that balances computational rigor with clean, intuitive design. Whether architecting backend microservices, optimizing database schemas, or writing frontend modules, I prioritize readability, efficiency, and maintainability.",

    // Key Engineering Focus Pillars
    focusHeading: profile.focusHeading || 'Key Engineering Focus',
    focus1Title: currentFocus[0]?.title || 'Backend Systems & Java',
    focus1Desc: currentFocus[0]?.desc || 'Object-oriented architecture, RESTful services, and relational database modeling.',
    focus2Title: currentFocus[1]?.title || 'Data Structures & Algorithms',
    focus2Desc: currentFocus[1]?.desc || 'Continuous problem solving across arrays, trees, dynamic programming, and graphs.',
    focus3Title: currentFocus[2]?.title || 'Continuous Academic Learning',
    focus3Desc: currentFocus[2]?.desc || 'B.Tech CSE student at KL University actively participating in technical communities.',

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
    if (profile.name || social.github || profile.phone || profile.stats || profile.engineeringFocus) {
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

        stat1Value: (Array.isArray(profile.stats) && profile.stats[0]?.value) ?? prev.stat1Value,
        stat1Label: (Array.isArray(profile.stats) && profile.stats[0]?.label) ?? prev.stat1Label,
        stat2Value: (Array.isArray(profile.stats) && profile.stats[1]?.value) ?? prev.stat2Value,
        stat2Label: (Array.isArray(profile.stats) && profile.stats[1]?.label) ?? prev.stat2Label,
        stat3Value: (Array.isArray(profile.stats) && profile.stats[2]?.value) ?? prev.stat3Value,
        stat3Label: (Array.isArray(profile.stats) && profile.stats[2]?.label) ?? prev.stat3Label,
        stat4Value: (Array.isArray(profile.stats) && profile.stats[3]?.value) ?? prev.stat4Value,
        stat4Label: (Array.isArray(profile.stats) && profile.stats[3]?.label) ?? prev.stat4Label,

        craftsmanshipTitle: profile.craftsmanshipTitle ?? prev.craftsmanshipTitle,
        craftsmanshipQuote: profile.craftsmanshipQuote ?? profile.craftsmanshipText ?? prev.craftsmanshipQuote,

        focusHeading: profile.focusHeading ?? prev.focusHeading,
        focus1Title: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[0]?.title) ?? prev.focus1Title,
        focus1Desc: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[0]?.desc) ?? prev.focus1Desc,
        focus2Title: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[1]?.title) ?? prev.focus2Title,
        focus2Desc: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[1]?.desc) ?? prev.focus2Desc,
        focus3Title: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[2]?.title) ?? prev.focus3Title,
        focus3Desc: (Array.isArray(profile.engineeringFocus) && profile.engineeringFocus[2]?.desc) ?? prev.focus3Desc,

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
      bio: [form.bio1, form.bio2, form.bio3].filter(Boolean),
      stats: [
        { value: form.stat1Value, label: form.stat1Label },
        { value: form.stat2Value, label: form.stat2Label },
        { value: form.stat3Value, label: form.stat3Label },
        { value: form.stat4Value, label: form.stat4Label }
      ],
      craftsmanshipTitle: form.craftsmanshipTitle,
      craftsmanshipQuote: form.craftsmanshipQuote,
      focusHeading: form.focusHeading,
      engineeringFocus: [
        {
          title: form.focus1Title,
          desc: form.focus1Desc,
          icon: "Cpu"
        },
        {
          title: form.focus2Title,
          desc: form.focus2Desc,
          icon: "Code2"
        },
        {
          title: form.focus3Title,
          desc: form.focus3Desc,
          icon: "GraduationCap"
        }
      ]
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
        <h1 className="text-2xl font-semibold text-[#613E35]">
          Personal Information & Professional Profiles
        </h1>
        <p className="text-sm text-[#A27B6E] mt-1">
          Update your public profile, bio narratives, portrait image, and independent coding links.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Identity */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3 flex items-center gap-2">
            <User size={18} className="text-[#D98C70]" />
            <span>Identity & Academic Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Professional Role / Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                University
              </label>
              <input
                type="text"
                value={form.university}
                onChange={e => setForm({ ...form, university: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Expected Graduation Year
              </label>
              <input
                type="text"
                value={form.graduationYear}
                onChange={e => setForm({ ...form, graduationYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Mail size={14} className="text-[#D98C70]" />
                <span>Email Address (Gmail) *</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="marthalasurendarreddy@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-[#D98C70]" />
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

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#D98C70]" />
                <span>Campus Location</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Andhra Pradesh, India"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
              Hero Section Intro Tagline
            </label>
            <input
              type="text"
              value={form.intro}
              onChange={e => setForm({ ...form, intro: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
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
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3">
            About Me — Narrative Paragraphs
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Paragraph 1 (Introduction & Academic Focus)</label>
            <textarea
              rows={3}
              value={form.bio1}
              onChange={e => setForm({ ...form, bio1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Paragraph 2 (Engineering Philosophy & Tech Stack)</label>
            <textarea
              rows={3}
              value={form.bio2}
              onChange={e => setForm({ ...form, bio2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Paragraph 3 (Continuous Learning & Aspirations)</label>
            <textarea
              rows={2}
              value={form.bio3}
              onChange={e => setForm({ ...form, bio3: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
            />
          </div>
        </div>

        {/* Core Stats Grid (About Section) */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-[#F0DED4] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-[#D98C70]" />
              <h2 className="text-base font-semibold text-[#613E35]">
                About Section Key Metrics & Statistics (4 Badges)
              </h2>
            </div>
            <span className="text-xs text-[#A27B6E] font-normal">Homepage stats row</span>
          </div>
          <p className="text-xs text-[#A27B6E]">
            Configure the 4 numeric/status metric badges displayed directly below your narrative biography in the About Me section.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-xl space-y-2.5">
              <span className="text-[10.5px] font-bold text-[#A27B6E] uppercase tracking-wider block">Metric 1</span>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Value / Count</label>
                <input
                  type="text"
                  required
                  value={form.stat1Value}
                  onChange={e => setForm({ ...form, stat1Value: e.target.value })}
                  placeholder="200+"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-sm font-bold text-[#D98C70] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Badge Label</label>
                <input
                  type="text"
                  required
                  value={form.stat1Label}
                  onChange={e => setForm({ ...form, stat1Label: e.target.value })}
                  placeholder="DSA Problems"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-medium text-[#613E35] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-xl space-y-2.5">
              <span className="text-[10.5px] font-bold text-[#A27B6E] uppercase tracking-wider block">Metric 2</span>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Value / Count</label>
                <input
                  type="text"
                  required
                  value={form.stat2Value}
                  onChange={e => setForm({ ...form, stat2Value: e.target.value })}
                  placeholder="8+"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-sm font-bold text-[#D98C70] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Badge Label</label>
                <input
                  type="text"
                  required
                  value={form.stat2Label}
                  onChange={e => setForm({ ...form, stat2Label: e.target.value })}
                  placeholder="Projects Built"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-medium text-[#613E35] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-xl space-y-2.5">
              <span className="text-[10.5px] font-bold text-[#A27B6E] uppercase tracking-wider block">Metric 3</span>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Value / Status</label>
                <input
                  type="text"
                  required
                  value={form.stat3Value}
                  onChange={e => setForm({ ...form, stat3Value: e.target.value })}
                  placeholder="Active"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-sm font-bold text-[#D98C70] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Badge Label</label>
                <input
                  type="text"
                  required
                  value={form.stat3Label}
                  onChange={e => setForm({ ...form, stat3Label: e.target.value })}
                  placeholder="CodeChef / LeetCode"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-medium text-[#613E35] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-xl space-y-2.5">
              <span className="text-[10.5px] font-bold text-[#A27B6E] uppercase tracking-wider block">Metric 4</span>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Value / Year</label>
                <input
                  type="text"
                  required
                  value={form.stat4Value}
                  onChange={e => setForm({ ...form, stat4Value: e.target.value })}
                  placeholder="2028"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-sm font-bold text-[#D98C70] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Badge Label</label>
                <input
                  type="text"
                  required
                  value={form.stat4Label}
                  onChange={e => setForm({ ...form, stat4Label: e.target.value })}
                  placeholder="Expected Grad"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-medium text-[#613E35] bg-white focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Engineering Focus & Philosophy (About Section) */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#F0DED4] pb-3">
            <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
              <Cpu size={18} className="text-[#D98C70]" />
              <span>Key Engineering Focus Pillars & Philosophy Card</span>
            </h2>
            <p className="text-xs text-[#A27B6E] mt-1">
              Edit the Software Craftsmanship card and the 3 technical specialization pillars rendered in the About Me section.
            </p>
          </div>

          {/* Software Craftsmanship Philosophy Card */}
          <div className="p-4 bg-[#FCE9DF] border border-[#F4C9B5] rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#613E35]">
              <Quote size={16} className="text-[#D98C70]" />
              <span>Software Craftsmanship Callout Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Card Headline</label>
              <input
                type="text"
                required
                value={form.craftsmanshipTitle}
                onChange={e => setForm({ ...form, craftsmanshipTitle: e.target.value })}
                placeholder="Software Craftsmanship"
                className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-sm bg-white focus:outline-none focus:border-[#D98C70]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">Philosophy Statement / Quote</label>
              <textarea
                rows={3}
                required
                value={form.craftsmanshipQuote}
                onChange={e => setForm({ ...form, craftsmanshipQuote: e.target.value })}
                placeholder="I believe in building software that balances computational rigor with clean, intuitive design..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-sm bg-white focus:outline-none focus:border-[#D98C70] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Key Engineering Focus Pillars Header & 3 Items */}
          <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Focus Section Header Title
              </label>
              <input
                type="text"
                required
                value={form.focusHeading}
                onChange={e => setForm({ ...form, focusHeading: e.target.value })}
                placeholder="Key Engineering Focus"
                className="w-full px-3.5 py-2 rounded-lg border border-[#F0DED4] text-sm font-semibold text-[#613E35] bg-white focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div className="space-y-3 pt-2">
              {/* Pillar 1 */}
              <div className="p-3.5 bg-white border border-[#F0DED4] rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D98C70]">
                  <Cpu size={14} />
                  <span>Pillar 1 (Backend Systems & Architecture)</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={form.focus1Title}
                    onChange={e => setForm({ ...form, focus1Title: e.target.value })}
                    placeholder="Backend Systems & Java"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-semibold text-[#613E35] focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={form.focus1Desc}
                    onChange={e => setForm({ ...form, focus1Desc: e.target.value })}
                    placeholder="Object-oriented architecture, RESTful services, and relational database modeling."
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs text-[#613E35] focus:outline-none focus:border-[#D98C70] resize-none"
                  />
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-3.5 bg-white border border-[#F0DED4] rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D98C70]">
                  <Code2 size={14} />
                  <span>Pillar 2 (Data Structures & Algorithms)</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={form.focus2Title}
                    onChange={e => setForm({ ...form, focus2Title: e.target.value })}
                    placeholder="Data Structures & Algorithms"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-semibold text-[#613E35] focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={form.focus2Desc}
                    onChange={e => setForm({ ...form, focus2Desc: e.target.value })}
                    placeholder="Continuous problem solving across arrays, trees, dynamic programming, and graphs."
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs text-[#613E35] focus:outline-none focus:border-[#D98C70] resize-none"
                  />
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-3.5 bg-white border border-[#F0DED4] rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D98C70]">
                  <GraduationCap size={14} />
                  <span>Pillar 3 (Academic & Community)</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={form.focus3Title}
                    onChange={e => setForm({ ...form, focus3Title: e.target.value })}
                    placeholder="Continuous Academic Learning"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs font-semibold text-[#613E35] focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#613E35] mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={form.focus3Desc}
                    onChange={e => setForm({ ...form, focus3Desc: e.target.value })}
                    placeholder="B.Tech CSE student at KL University actively participating in technical communities."
                    className="w-full px-3 py-1.5 rounded-lg border border-[#F0DED4] text-xs text-[#613E35] focus:outline-none focus:border-[#D98C70] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Independent Social & Coding Platform Links */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-[#613E35] border-b border-[#F0DED4] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#D98C70]" />
              <span>Independent Profile Links (4 Platforms)</span>
            </div>
            <span className="text-xs text-[#A27B6E] font-normal">Strict 1:1 platform mapping</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#D98C70]" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                required
                value={form.linkedin}
                onChange={e => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/marthalasurendarreddy/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Github size={14} className="text-[#D98C70]" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                required
                value={form.github}
                onChange={e => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/SURENDAR30392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Code2 size={14} className="text-[#D98C70]" />
                <span>LeetCode URL</span>
              </label>
              <input
                type="url"
                required
                value={form.leetcode}
                onChange={e => setForm({ ...form, leetcode: e.target.value })}
                placeholder="https://leetcode.com/u/kl_2400030392/"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <CodeChefIcon size={14} className="text-[#D98C70]" />
                <span>CodeChef URL</span>
              </label>
              <input
                type="url"
                required
                value={form.codechef}
                onChange={e => setForm({ ...form, codechef: e.target.value })}
                placeholder="https://www.codechef.com/users/kl2400030392"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">GitHub Username</label>
              <input
                type="text"
                value={form.githubUsername}
                onChange={e => setForm({ ...form, githubUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">LeetCode Username</label>
              <input
                type="text"
                value={form.leetcodeUsername}
                onChange={e => setForm({ ...form, leetcodeUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">CodeChef Username</label>
              <input
                type="text"
                value={form.codechefUsername}
                onChange={e => setForm({ ...form, codechefUsername: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Mail size={14} className="text-[#D98C70]" />
                <span>Contact Email</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="marthalasurendarreddy@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-[#D98C70]" />
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

        {/* Coding Profiles & Contributions Cards Section */}
        <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#F0DED4] pb-3">
            <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
              <Code2 size={18} className="text-[#D98C70]" />
              <span>Coding Profiles Cards Content (Descriptions & Stat Badges)</span>
            </h2>
            <p className="text-xs text-[#A27B6E] mt-1">
              Edit the card descriptions and the 3 metric tags displayed on GitHub, LeetCode, and CodeChef cards.
            </p>
          </div>

          {/* GitHub Card Editor */}
          <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#613E35]">
              <Github size={16} className="text-[#D98C70]" />
              <span>GitHub Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.githubDescription}
                onChange={e => setForm({ ...form, githubDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Java)"
                  value={form.githubStat1Value}
                  onChange={e => setForm({ ...form, githubStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Primary Tech)"
                  value={form.githubStat1Label}
                  onChange={e => setForm({ ...form, githubStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Public)"
                  value={form.githubStat2Value}
                  onChange={e => setForm({ ...form, githubStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Repositories)"
                  value={form.githubStat2Label}
                  onChange={e => setForm({ ...form, githubStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Active)"
                  value={form.githubStat3Value}
                  onChange={e => setForm({ ...form, githubStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#D98C70] font-semibold focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Commits)"
                  value={form.githubStat3Label}
                  onChange={e => setForm({ ...form, githubStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>
          </div>

          {/* LeetCode Card Editor */}
          <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#613E35]">
              <Code2 size={16} className="text-[#D98C70]" />
              <span>LeetCode Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.leetcodeDescription}
                onChange={e => setForm({ ...form, leetcodeDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. 150+)"
                  value={form.leetcodeStat1Value}
                  onChange={e => setForm({ ...form, leetcodeStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#15803D] font-semibold focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Solved)"
                  value={form.leetcodeStat1Label}
                  onChange={e => setForm({ ...form, leetcodeStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. DSA)"
                  value={form.leetcodeStat2Value}
                  onChange={e => setForm({ ...form, leetcodeStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Algorithms)"
                  value={form.leetcodeStat2Label}
                  onChange={e => setForm({ ...form, leetcodeStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Java)"
                  value={form.leetcodeStat3Value}
                  onChange={e => setForm({ ...form, leetcodeStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#D98C70] font-semibold focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Language)"
                  value={form.leetcodeStat3Label}
                  onChange={e => setForm({ ...form, leetcodeStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>
          </div>

          {/* CodeChef Card Editor */}
          <div className="p-4 bg-[#FFF8F3] border border-[#F0DED4] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#613E35]">
              <CodeChefIcon size={16} className="text-[#D98C70]" />
              <span>CodeChef Card</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1">Card Narrative Description</label>
              <textarea
                rows={2}
                value={form.codechefDescription}
                onChange={e => setForm({ ...form, codechefDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Div 4/3)"
                  value={form.codechefStat1Value}
                  onChange={e => setForm({ ...form, codechefStat1Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Division)"
                  value={form.codechefStat1Label}
                  onChange={e => setForm({ ...form, codechefStat1Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Contests)"
                  value={form.codechefStat2Value}
                  onChange={e => setForm({ ...form, codechefStat2Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Starters)"
                  value={form.codechefStat2Label}
                  onChange={e => setForm({ ...form, codechefStat2Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
                />
              </div>
              <div className="bg-white p-2.5 rounded border border-[#F0DED4] space-y-1.5">
                <span className="text-[10px] font-bold text-[#A27B6E] uppercase">Badge 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. Active)"
                  value={form.codechefStat3Value}
                  onChange={e => setForm({ ...form, codechefStat3Value: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#D98C70] font-semibold focus:outline-none focus:border-[#D98C70]"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Rating)"
                  value={form.codechefStat3Label}
                  onChange={e => setForm({ ...form, codechefStat3Label: e.target.value })}
                  className="w-full px-2 py-1 text-xs border rounded text-[#A27B6E] focus:outline-none focus:border-[#D98C70]"
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
