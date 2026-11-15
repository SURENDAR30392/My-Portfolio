import React from 'react';
import { Github, Code2, ExternalLink, GitBranch, Award, Trophy } from 'lucide-react';
import { CodeChefIcon } from './icons/CodeChefIcon';
import { useData } from '../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../data/socialLinks';

export const CodingProfiles = () => {
  const { data } = useData();
  const social = data.social || {};

  const githubUrl = social.github || DEFAULT_SOCIAL_LINKS.github;
  const leetcodeUrl = social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode;
  const codechefUrl = social.codechef || DEFAULT_SOCIAL_LINKS.codechef;

  const githubUser = social.githubUsername || DEFAULT_SOCIAL_LINKS.githubUsername;
  const leetcodeUser = social.leetcodeUsername || DEFAULT_SOCIAL_LINKS.leetcodeUsername;
  const codechefUser = social.codechefUsername || DEFAULT_SOCIAL_LINKS.codechefUsername;

  return (
    <section id="coding" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Competitive Coding</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            {social.codingSectionTitle || DEFAULT_SOCIAL_LINKS.codingSectionTitle || "Coding Profiles & Contributions"}
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            {social.codingSectionSubtitle || DEFAULT_SOCIAL_LINKS.codingSectionSubtitle || "Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories."}
          </p>
        </div>

        {/* 3 Column Grid for GitHub, LeetCode, CodeChef */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 1. GitHub Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                    <Github size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172554]">GitHub</h3>
                    <p className="text-xs text-[#64748B] font-mono">@{githubUser}</p>
                  </div>
                </div>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub Profile of Marthala Surendar Reddy"
                  className="link-accent text-sm inline-flex items-center gap-1"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-sm text-[#334155] leading-relaxed mb-6 min-h-[4.2rem]">
                {social.githubDescription || DEFAULT_SOCIAL_LINKS.githubDescription}
              </p>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#172554]">
                    {social.githubStat1Value || DEFAULT_SOCIAL_LINKS.githubStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.githubStat1Label || DEFAULT_SOCIAL_LINKS.githubStat1Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#172554]">
                    {social.githubStat2Value || DEFAULT_SOCIAL_LINKS.githubStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.githubStat2Label || DEFAULT_SOCIAL_LINKS.githubStat2Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#2563EB]">
                    {social.githubStat3Value || DEFAULT_SOCIAL_LINKS.githubStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.githubStat3Label || DEFAULT_SOCIAL_LINKS.githubStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 truncate">
                <GitBranch size={13} className="text-[#2563EB] shrink-0" />
                <span className="truncate">github.com/{githubUser}</span>
              </span>
              <span className="text-[#2563EB] font-semibold shrink-0">Verified</span>
            </div>
          </div>

          {/* 2. LeetCode Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172554]">LeetCode</h3>
                    <p className="text-xs text-[#64748B] font-mono">@{leetcodeUser}</p>
                  </div>
                </div>

                <a
                  href={leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LeetCode Profile of Marthala Surendar Reddy"
                  className="link-accent text-sm inline-flex items-center gap-1"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-sm text-[#334155] leading-relaxed mb-6 min-h-[4.2rem]">
                {social.leetcodeDescription || DEFAULT_SOCIAL_LINKS.leetcodeDescription}
              </p>

              {/* LeetCode Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#10B981]">
                    {social.leetcodeStat1Value || DEFAULT_SOCIAL_LINKS.leetcodeStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.leetcodeStat1Label || DEFAULT_SOCIAL_LINKS.leetcodeStat1Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#172554]">
                    {social.leetcodeStat2Value || DEFAULT_SOCIAL_LINKS.leetcodeStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.leetcodeStat2Label || DEFAULT_SOCIAL_LINKS.leetcodeStat2Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#2563EB]">
                    {social.leetcodeStat3Value || DEFAULT_SOCIAL_LINKS.leetcodeStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.leetcodeStat3Label || DEFAULT_SOCIAL_LINKS.leetcodeStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 truncate">
                <Award size={13} className="text-[#2563EB] shrink-0" />
                <span className="truncate">leetcode.com/u/{leetcodeUser}</span>
              </span>
              <span className="text-[#2563EB] font-semibold shrink-0">Verified</span>
            </div>
          </div>

          {/* 3. CodeChef Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                    <CodeChefIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172554]">CodeChef</h3>
                    <p className="text-xs text-[#64748B] font-mono">@{codechefUser}</p>
                  </div>
                </div>

                <a
                  href={codechefUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open CodeChef Profile of Marthala Surendar Reddy"
                  className="link-accent text-sm inline-flex items-center gap-1"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-sm text-[#334155] leading-relaxed mb-6 min-h-[4.2rem]">
                {social.codechefDescription || DEFAULT_SOCIAL_LINKS.codechefDescription}
              </p>

              {/* CodeChef Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0]">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#172554]">
                    {social.codechefStat1Value || DEFAULT_SOCIAL_LINKS.codechefStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.codechefStat1Label || DEFAULT_SOCIAL_LINKS.codechefStat1Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#172554]">
                    {social.codechefStat2Value || DEFAULT_SOCIAL_LINKS.codechefStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.codechefStat2Label || DEFAULT_SOCIAL_LINKS.codechefStat2Label}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center">
                  <div className="text-sm font-bold text-[#2563EB]">
                    {social.codechefStat3Value || DEFAULT_SOCIAL_LINKS.codechefStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] font-medium">
                    {social.codechefStat3Label || DEFAULT_SOCIAL_LINKS.codechefStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 truncate">
                <Trophy size={13} className="text-[#2563EB] shrink-0" />
                <span className="truncate">codechef.com/users/{codechefUser}</span>
              </span>
              <span className="text-[#2563EB] font-semibold shrink-0">Verified</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
