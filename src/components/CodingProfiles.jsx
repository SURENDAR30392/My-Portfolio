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
            Coding Profiles & Contributions
          </h2>
          <p className="text-base text-[#4B5F5C] max-w-[680px]">
            Active technical platforms where I practice algorithmic problem solving, participate in competitive programming contests, and maintain open-source software repositories.
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
                Maintaining repositories in core Java, Object-Oriented design patterns, full-stack prototypes, and open-source project code.
              </p>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">Java</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Primary Tech</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">Public</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Repositories</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">Active</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Commits</div>
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
                Active problem solver practicing data structures, arrays, strings, binary trees, and algorithmic complexity optimizations in Java.
              </p>

              {/* LeetCode Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#15803D]">150+</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Solved</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">DSA</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Algorithms</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">Java</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Language</div>
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
                Competitive programming participant competing in timed division rounds, Starters contests, and algorithmic challenges.
              </p>

              {/* CodeChef Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE7E5]">
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">Div 4/3</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Division</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#102A28]">Contests</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Starters</div>
                </div>
                <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-[#0F766E]">Active</div>
                  <div className="text-[10.5px] text-[#8A9B98]">Rating</div>
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
