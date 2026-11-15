import React, { useState } from 'react';
import { Save, Github, Code2, GitBranch, Award, Trophy, ExternalLink, HelpCircle, Eye } from 'lucide-react';
import { CodeChefIcon } from '../../components/icons/CodeChefIcon';
import { useData } from '../../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../../data/socialLinks';

export const AdminCodingProfilesView = () => {
  const { data, updateSocialLinks } = useData();
  const social = data.social || {};

  const [saving, setSaving] = useState(false);
  const [activePlatform, setActivePlatform] = useState('github');

  const [form, setForm] = useState({
    // Section Header
    codingSectionTitle: social.codingSectionTitle || DEFAULT_SOCIAL_LINKS.codingSectionTitle || "Coding Profiles & Contributions",
    codingSectionSubtitle: social.codingSectionSubtitle || DEFAULT_SOCIAL_LINKS.codingSectionSubtitle || "Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories.",

    // GitHub
    github: social.github || DEFAULT_SOCIAL_LINKS.github,
    githubUsername: social.githubUsername || DEFAULT_SOCIAL_LINKS.githubUsername,
    githubDescription: social.githubDescription || DEFAULT_SOCIAL_LINKS.githubDescription,
    githubStat1Value: social.githubStat1Value || DEFAULT_SOCIAL_LINKS.githubStat1Value,
    githubStat1Label: social.githubStat1Label || DEFAULT_SOCIAL_LINKS.githubStat1Label,
    githubStat2Value: social.githubStat2Value || DEFAULT_SOCIAL_LINKS.githubStat2Value,
    githubStat2Label: social.githubStat2Label || DEFAULT_SOCIAL_LINKS.githubStat2Label,
    githubStat3Value: social.githubStat3Value || DEFAULT_SOCIAL_LINKS.githubStat3Value,
    githubStat3Label: social.githubStat3Label || DEFAULT_SOCIAL_LINKS.githubStat3Label,

    // LeetCode
    leetcode: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode,
    leetcodeUsername: social.leetcodeUsername || DEFAULT_SOCIAL_LINKS.leetcodeUsername,
    leetcodeDescription: social.leetcodeDescription || DEFAULT_SOCIAL_LINKS.leetcodeDescription,
    leetcodeStat1Value: social.leetcodeStat1Value || DEFAULT_SOCIAL_LINKS.leetcodeStat1Value,
    leetcodeStat1Label: social.leetcodeStat1Label || DEFAULT_SOCIAL_LINKS.leetcodeStat1Label,
    leetcodeStat2Value: social.leetcodeStat2Value || DEFAULT_SOCIAL_LINKS.leetcodeStat2Value,
    leetcodeStat2Label: social.leetcodeStat2Label || DEFAULT_SOCIAL_LINKS.leetcodeStat2Label,
    leetcodeStat3Value: social.leetcodeStat3Value || DEFAULT_SOCIAL_LINKS.leetcodeStat3Value,
    leetcodeStat3Label: social.leetcodeStat3Label || DEFAULT_SOCIAL_LINKS.leetcodeStat3Label,

    // CodeChef
    codechef: social.codechef || DEFAULT_SOCIAL_LINKS.codechef,
    codechefUsername: social.codechefUsername || DEFAULT_SOCIAL_LINKS.codechefUsername,
    codechefDescription: social.codechefDescription || DEFAULT_SOCIAL_LINKS.codechefDescription,
    codechefStat1Value: social.codechefStat1Value || DEFAULT_SOCIAL_LINKS.codechefStat1Value,
    codechefStat1Label: social.codechefStat1Label || DEFAULT_SOCIAL_LINKS.codechefStat1Label,
    codechefStat2Value: social.codechefStat2Value || DEFAULT_SOCIAL_LINKS.codechefStat2Value,
    codechefStat2Label: social.codechefStat2Label || DEFAULT_SOCIAL_LINKS.codechefStat2Label,
    codechefStat3Value: social.codechefStat3Value || DEFAULT_SOCIAL_LINKS.codechefStat3Value,
    codechefStat3Label: social.codechefStat3Label || DEFAULT_SOCIAL_LINKS.codechefStat3Label,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSocialLinks({
        ...form,
        published: true
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#172554]">
            Coding Profiles & Contributions Management
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Customize all cards, descriptions, and verified metric badges for GitHub, LeetCode, and CodeChef.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary h-11 px-6 text-sm shrink-0 flex items-center gap-2"
        >
          <Save size={16} />
          <span>{saving ? 'Saving to Firestore...' : 'Save All Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Section Header Configuration */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-3">
            Section Header & Introductory Copy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={form.codingSectionTitle}
                onChange={e => setForm({ ...form, codingSectionTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                placeholder="Coding Profiles & Contributions"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                Section Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={form.codingSectionSubtitle}
                onChange={e => setForm({ ...form, codingSectionSubtitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
                placeholder="Active technical platforms where I practice algorithmic problem solving..."
              />
            </div>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="flex border-b border-[#E2E8F0] space-x-2">
          <button
            type="button"
            onClick={() => setActivePlatform('github')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activePlatform === 'github'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-[#64748B] hover:text-[#172554]'
            }`}
          >
            <Github size={18} />
            <span>GitHub Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('leetcode')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activePlatform === 'leetcode'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-[#64748B] hover:text-[#172554]'
            }`}
          >
            <Code2 size={18} />
            <span>LeetCode Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('codechef')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activePlatform === 'codechef'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-[#64748B] hover:text-[#172554]'
            }`}
          >
            <CodeChefIcon size={18} />
            <span>CodeChef Card</span>
          </button>
        </div>

        {/* 1. GITHUB EDITOR */}
        {activePlatform === 'github' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-2 flex items-center gap-2">
                <Github size={18} className="text-[#2563EB]" />
                <span>GitHub Card Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Profile URL</label>
                  <input
                    type="url"
                    value={form.github}
                    onChange={e => setForm({ ...form, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Username Handle</label>
                  <input
                    type="text"
                    value={form.githubUsername}
                    onChange={e => setForm({ ...form, githubUsername: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1.5">Card Narrative / Description</label>
                <textarea
                  rows={3}
                  value={form.githubDescription}
                  onChange={e => setForm({ ...form, githubDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
                  placeholder="Maintaining repositories in core Java..."
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#172554] mb-2">3 Metric Tags (Badges)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 1</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Java)"
                      value={form.githubStat1Value}
                      onChange={e => setForm({ ...form, githubStat1Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Primary Tech)"
                      value={form.githubStat1Label}
                      onChange={e => setForm({ ...form, githubStat1Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 2</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Public)"
                      value={form.githubStat2Value}
                      onChange={e => setForm({ ...form, githubStat2Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Repositories)"
                      value={form.githubStat2Label}
                      onChange={e => setForm({ ...form, githubStat2Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 3</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Active)"
                      value={form.githubStat3Value}
                      onChange={e => setForm({ ...form, githubStat3Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold text-[#2563EB] focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Commits)"
                      value={form.githubStat3Label}
                      onChange={e => setForm({ ...form, githubStat3Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Eye size={14} className="text-[#2563EB]" />
                <span>Live Card Preview</span>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <Github size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#172554]">GitHub</h3>
                        <p className="text-xs text-[#94A3B8]">@{form.githubUsername || 'username'}</p>
                      </div>
                    </div>
                    <span className="link-accent text-sm inline-flex items-center gap-1 cursor-pointer">
                      <span>Visit Profile</span>
                      <ExternalLink size={14} />
                    </span>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6 min-h-[4rem]">
                    {form.githubDescription || 'Card description appears here...'}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#172554]">{form.githubStat1Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.githubStat1Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#172554]">{form.githubStat2Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.githubStat2Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#2563EB]">{form.githubStat3Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.githubStat3Label || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E8F0]/50 flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 truncate">
                    <GitBranch size={13} className="text-[#2563EB] shrink-0" />
                    <span className="truncate">github.com/{form.githubUsername}</span>
                  </span>
                  <span className="text-[#2563EB] font-medium shrink-0">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LEETCODE EDITOR */}
        {activePlatform === 'leetcode' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-2 flex items-center gap-2">
                <Code2 size={18} className="text-[#2563EB]" />
                <span>LeetCode Card Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Profile URL</label>
                  <input
                    type="url"
                    value={form.leetcode}
                    onChange={e => setForm({ ...form, leetcode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Username Handle</label>
                  <input
                    type="text"
                    value={form.leetcodeUsername}
                    onChange={e => setForm({ ...form, leetcodeUsername: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1.5">Card Narrative / Description</label>
                <textarea
                  rows={3}
                  value={form.leetcodeDescription}
                  onChange={e => setForm({ ...form, leetcodeDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
                  placeholder="Active problem solver practicing data structures..."
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#172554] mb-2">3 Metric Tags (Badges)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 1</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. 150+)"
                      value={form.leetcodeStat1Value}
                      onChange={e => setForm({ ...form, leetcodeStat1Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold text-[#15803D] focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Solved)"
                      value={form.leetcodeStat1Label}
                      onChange={e => setForm({ ...form, leetcodeStat1Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 2</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. DSA)"
                      value={form.leetcodeStat2Value}
                      onChange={e => setForm({ ...form, leetcodeStat2Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Algorithms)"
                      value={form.leetcodeStat2Label}
                      onChange={e => setForm({ ...form, leetcodeStat2Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 3</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Java)"
                      value={form.leetcodeStat3Value}
                      onChange={e => setForm({ ...form, leetcodeStat3Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold text-[#2563EB] focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Language)"
                      value={form.leetcodeStat3Label}
                      onChange={e => setForm({ ...form, leetcodeStat3Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Eye size={14} className="text-[#2563EB]" />
                <span>Live Card Preview</span>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <Code2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#172554]">LeetCode</h3>
                        <p className="text-xs text-[#94A3B8]">@{form.leetcodeUsername || 'username'}</p>
                      </div>
                    </div>
                    <span className="link-accent text-sm inline-flex items-center gap-1 cursor-pointer">
                      <span>Visit Profile</span>
                      <ExternalLink size={14} />
                    </span>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6 min-h-[4rem]">
                    {form.leetcodeDescription || 'Card description appears here...'}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#15803D]">{form.leetcodeStat1Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.leetcodeStat1Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#172554]">{form.leetcodeStat2Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.leetcodeStat2Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#2563EB]">{form.leetcodeStat3Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.leetcodeStat3Label || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E8F0]/50 flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 truncate">
                    <Award size={13} className="text-[#2563EB] shrink-0" />
                    <span className="truncate">leetcode.com/u/{form.leetcodeUsername}</span>
                  </span>
                  <span className="text-[#2563EB] font-medium shrink-0">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CODECHEF EDITOR */}
        {activePlatform === 'codechef' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-[#172554] border-b border-[#E2E8F0] pb-2 flex items-center gap-2">
                <CodeChefIcon size={18} className="text-[#2563EB]" />
                <span>CodeChef Card Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Profile URL</label>
                  <input
                    type="url"
                    value={form.codechef}
                    onChange={e => setForm({ ...form, codechef: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">Username Handle</label>
                  <input
                    type="text"
                    value={form.codechefUsername}
                    onChange={e => setForm({ ...form, codechefUsername: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1.5">Card Narrative / Description</label>
                <textarea
                  rows={3}
                  value={form.codechefDescription}
                  onChange={e => setForm({ ...form, codechefDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB] resize-none"
                  placeholder="Competitive programming participant competing in timed division rounds..."
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#172554] mb-2">3 Metric Tags (Badges)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 1</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Div 4/3)"
                      value={form.codechefStat1Value}
                      onChange={e => setForm({ ...form, codechefStat1Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Division)"
                      value={form.codechefStat1Label}
                      onChange={e => setForm({ ...form, codechefStat1Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 2</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Contests)"
                      value={form.codechefStat2Value}
                      onChange={e => setForm({ ...form, codechefStat2Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Starters)"
                      value={form.codechefStat2Label}
                      onChange={e => setForm({ ...form, codechefStat2Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-2">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Metric 3</span>
                    <input
                      type="text"
                      placeholder="Value (e.g. Active)"
                      value={form.codechefStat3Value}
                      onChange={e => setForm({ ...form, codechefStat3Value: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs font-semibold text-[#2563EB] focus:outline-none focus:border-[#2563EB]"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Rating)"
                      value={form.codechefStat3Label}
                      onChange={e => setForm({ ...form, codechefStat3Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Eye size={14} className="text-[#2563EB]" />
                <span>Live Card Preview</span>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <CodeChefIcon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#172554]">CodeChef</h3>
                        <p className="text-xs text-[#94A3B8]">@{form.codechefUsername || 'username'}</p>
                      </div>
                    </div>
                    <span className="link-accent text-sm inline-flex items-center gap-1 cursor-pointer">
                      <span>Visit Profile</span>
                      <ExternalLink size={14} />
                    </span>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6 min-h-[4rem]">
                    {form.codechefDescription || 'Card description appears here...'}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#172554]">{form.codechefStat1Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.codechefStat1Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#172554]">{form.codechefStat2Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.codechefStat2Label || '-'}</div>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 text-center">
                      <div className="text-sm font-semibold text-[#2563EB]">{form.codechefStat3Value || '-'}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">{form.codechefStat3Label || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E8F0]/50 flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 truncate">
                    <Trophy size={13} className="text-[#2563EB] shrink-0" />
                    <span className="truncate">codechef.com/users/{form.codechefUsername}</span>
                  </span>
                  <span className="text-[#2563EB] font-medium shrink-0">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <HelpCircle size={14} className="text-[#2563EB]" />
            <span>Updates are synced to Cloud Firestore under <code>socialLinks/main</code> with real-time public delivery.</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary h-11 px-8 text-sm flex items-center gap-2"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Coding Profiles'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

