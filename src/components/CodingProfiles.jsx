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
    <section id="coding" className="py-16 md:py-24 bg-[#F7FAFA] border-t border-[#DDE7E5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
            {social.codingSectionTitle || DEFAULT_SOCIAL_LINKS.codingSectionTitle || "Coding Profiles & Contributions"}
          </h2>
          <p className="text-base text-[#4B5F5C] max-w-[680px]">
            {social.codingSectionSubtitle || DEFAULT_SOCIAL_LINKS.codingSectionSubtitle || "Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories."}
          </p>
        </div>

        {/* 3 Column Grid for GitHub, LeetCode, CodeChef */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. GitHub Card */}
          <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                    <Github size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#102A28]">GitHub</h3>
                    <p className="text-xs text-[#8A9B98]">@{githubUser}</p>
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

              <p className="text-sm text-[#4B5F5C] leading-relaxed mb-6">
                {social.githubDescription || DEFAULT_SOCIAL_LINKS.githubDescription}
              </p>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">
                    {social.githubStat1Value || DEFAULT_SOCIAL_LINKS.githubStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.githubStat1Label || DEFAULT_SOCIAL_LINKS.githubStat1Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">
                    {social.githubStat2Value || DEFAULT_SOCIAL_LINKS.githubStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.githubStat2Label || DEFAULT_SOCIAL_LINKS.githubStat2Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">
                    {social.githubStat3Value || DEFAULT_SOCIAL_LINKS.githubStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.githubStat3Label || DEFAULT_SOCIAL_LINKS.githubStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#DDE7E5]/50 flex items-center justify-between text-xs text-[#8A9B98]">
              <span className="flex items-center gap-1.5 truncate">
                <GitBranch size={13} className="text-[#0F766E] shrink-0" />
                <span className="truncate">github.com/{githubUser}</span>
              </span>
              <span className="text-[#0F766E] font-medium shrink-0">Verified</span>
            </div>
          </div>

          {/* 2. LeetCode Card */}
          <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#102A28]">LeetCode</h3>
                    <p className="text-xs text-[#8A9B98]">@{leetcodeUser}</p>
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

              <p className="text-sm text-[#4B5F5C] leading-relaxed mb-6">
                {social.leetcodeDescription || DEFAULT_SOCIAL_LINKS.leetcodeDescription}
              </p>

              {/* LeetCode Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#15803D]">
                    {social.leetcodeStat1Value || DEFAULT_SOCIAL_LINKS.leetcodeStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.leetcodeStat1Label || DEFAULT_SOCIAL_LINKS.leetcodeStat1Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">
                    {social.leetcodeStat2Value || DEFAULT_SOCIAL_LINKS.leetcodeStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.leetcodeStat2Label || DEFAULT_SOCIAL_LINKS.leetcodeStat2Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">
                    {social.leetcodeStat3Value || DEFAULT_SOCIAL_LINKS.leetcodeStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.leetcodeStat3Label || DEFAULT_SOCIAL_LINKS.leetcodeStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#DDE7E5]/50 flex items-center justify-between text-xs text-[#8A9B98]">
              <span className="flex items-center gap-1.5 truncate">
                <Award size={13} className="text-[#0F766E] shrink-0" />
                <span className="truncate">leetcode.com/u/{leetcodeUser}</span>
              </span>
              <span className="text-[#0F766E] font-medium shrink-0">Verified</span>
            </div>
          </div>

          {/* 3. CodeChef Card */}
          <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                    <CodeChefIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#102A28]">CodeChef</h3>
                    <p className="text-xs text-[#8A9B98]">@{codechefUser}</p>
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

              <p className="text-sm text-[#4B5F5C] leading-relaxed mb-6">
                {social.codechefDescription || DEFAULT_SOCIAL_LINKS.codechefDescription}
              </p>

              {/* CodeChef Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">
                    {social.codechefStat1Value || DEFAULT_SOCIAL_LINKS.codechefStat1Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.codechefStat1Label || DEFAULT_SOCIAL_LINKS.codechefStat1Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">
                    {social.codechefStat2Value || DEFAULT_SOCIAL_LINKS.codechefStat2Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.codechefStat2Label || DEFAULT_SOCIAL_LINKS.codechefStat2Label}
                  </div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">
                    {social.codechefStat3Value || DEFAULT_SOCIAL_LINKS.codechefStat3Value}
                  </div>
                  <div className="text-[10.5px] text-[#8A9B98]">
                    {social.codechefStat3Label || DEFAULT_SOCIAL_LINKS.codechefStat3Label}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#DDE7E5]/50 flex items-center justify-between text-xs text-[#8A9B98]">
              <span className="flex items-center gap-1.5 truncate">
                <Trophy size={13} className="text-[#0F766E] shrink-0" />
                <span className="truncate">codechef.com/users/{codechefUser}</span>
              </span>
              <span className="text-[#0F766E] font-medium shrink-0">Verified</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
