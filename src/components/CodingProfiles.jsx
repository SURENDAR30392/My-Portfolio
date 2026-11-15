import React from 'react';
import { Github, Code2, ExternalLink, GitBranch, Terminal, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CodingProfiles = () => {
  const { data } = useData();
  const social = data.social || {};

  const githubUser = social.githubUsername || "SURENDAR30392";
  const leetcodeUser = social.leetcodeUsername || "kl_2400030392";

  return (
    <section id="coding" className="py-16 md:py-24 bg-[#F7FAFA] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
            Coding Profiles & Contributions
          </h2>
          <p className="text-base text-[#4B5F5C] max-w-[620px]">
            Active technical profiles where I practice algorithmic problem solving and maintain open-source repositories.
          </p>
        </div>

        {/* 2 Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* GitHub Card */}
          <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
                    <Github size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#102A28]">GitHub</h3>
                    <p className="text-xs text-[#8A9B98]">@{githubUser}</p>
                  </div>
                </div>

                <a
                  href={social.github || `https://github.com/${githubUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent text-sm inline-flex items-center gap-1"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-sm text-[#4B5F5C] leading-relaxed mb-6">
                Maintaining repositories in core Java, Object-Oriented design patterns, full-stack prototypes, and academic project work.
              </p>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#102A28]">Java</div>
                  <div className="text-[11px] text-[#8A9B98]">Primary Tech</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#102A28]">Public</div>
                  <div className="text-[11px] text-[#8A9B98]">Repositories</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#0F766E]">Active</div>
                  <div className="text-[11px] text-[#8A9B98]">Commit Activity</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between text-xs text-[#8A9B98]">
              <span className="flex items-center gap-1.5">
                <GitBranch size={13} className="text-[#0F766E]" />
                github.com/{githubUser}
              </span>
              <span className="text-[#0F766E] font-medium">Verified Account</span>
            </div>
          </div>

          {/* LeetCode Card */}
          <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#102A28]">LeetCode</h3>
                    <p className="text-xs text-[#8A9B98]">@{leetcodeUser}</p>
                  </div>
                </div>

                <a
                  href={social.leetcode || `https://leetcode.com/u/${leetcodeUser}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent text-sm inline-flex items-center gap-1"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-sm text-[#4B5F5C] leading-relaxed mb-6">
                Active problem solver practicing data structures, arrays, strings, trees, and algorithmic complexity optimizations.
              </p>

              {/* LeetCode Topics / Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#15803D]">Easy / Med</div>
                  <div className="text-[11px] text-[#8A9B98]">Proficiency</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#102A28]">DSA</div>
                  <div className="text-[11px] text-[#8A9B98]">Core Focus</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2.5 text-center">
                  <div className="text-base font-semibold text-[#0F766E]">Java</div>
                  <div className="text-[11px] text-[#8A9B98]">Language</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between text-xs text-[#8A9B98]">
              <span className="flex items-center gap-1.5">
                <Award size={13} className="text-[#0F766E]" />
                leetcode.com/u/{leetcodeUser}
              </span>
              <span className="text-[#0F766E] font-medium">Verified Profile</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
