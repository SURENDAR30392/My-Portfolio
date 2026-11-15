import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Honors = ({ onSelectCert }) => {
  const { data } = useData();
  const certs = data.certifications || [];
  const achievements = data.achievements || [];

  // Combine certifications & achievements for the preview section
  const combined = [
    ...certs.map(c => ({
      id: c.id,
      title: c.title,
      issuer: c.organization,
      date: c.date,
      isSample: c.isSample,
      raw: c,
      type: 'cert'
    })),
    ...achievements.map(a => ({
      id: a.id,
      title: a.title,
      issuer: a.organization,
      date: a.date,
      isSample: a.isSample,
      raw: a,
      type: 'achievement'
    }))
  ];

  const displayItems = combined.slice(0, 6);

  return (
    <section id="honors" className="py-16 md:py-24 bg-[#F7FAFA] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-2">
              Honors and certifications
            </h2>
            <p className="text-base text-[#4B5F5C]">
              Technical certifications, competitive programming milestones, and academic awards.
            </p>
          </div>

          <Link 
            to="/honors" 
            className="link-accent shrink-0 text-sm"
          >
            <span>See all honors & certifications</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCert && onSelectCert(item.raw)}
              className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
                    <Award size={16} />
                  </div>
                  {item.isSample && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309] border border-[#FCD34D]">
                      Sample
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[#102A28] mb-1.5 line-clamp-2 group-hover:text-[#0F766E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4B5F5C] mb-4">
                  {item.issuer}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DDE7E5]/50 flex items-center justify-between">
                <span className="text-xs font-medium text-[#8A9B98]">
                  {item.date}
                </span>
                <span className="text-xs text-[#0F766E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

