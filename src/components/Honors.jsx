import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Honors = ({ onSelectCert }) => {
  const { data } = useData();
  const certs = (data.certifications || []).filter(c => c.published !== false);
  const achievements = (data.achievements || []).filter(a => a.published !== false);

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
    <section id="honors" className="py-16 md:py-24 bg-white border-b border-[#F0DED4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-badge mb-3">Recognitions</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#613E35] tracking-tight">
              Certifications & Technical Honors
            </h2>
            <p className="text-base text-[#A27B6E] mt-2 max-w-2xl">
              Professional credentials, algorithmic contest recognitions, and academic awards.
            </p>
          </div>

          <Link 
            to="/honors" 
            className="link-accent shrink-0 text-sm inline-flex items-center gap-1.5 font-semibold"
          >
            <span>See all credentials & awards</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCert && onSelectCert(item.raw)}
              className="bg-[#FFF8F3] border border-[#F0DED4] rounded-2xl p-6 shadow-subtle hover:bg-white hover:border-[#F4C9B5] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#D98C70] flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  {item.isSample && (
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                      Sample
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#613E35] mb-1.5 line-clamp-2 group-hover:text-[#D98C70] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-[#A27B6E] mb-4">
                  {item.issuer}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#F0DED4] flex items-center justify-between text-xs">
                <span className="font-medium text-[#A27B6E] inline-flex items-center gap-1">
                  <Calendar size={12} className="text-[#D98C70]" />
                  <span>{item.date}</span>
                </span>
                <span className="text-[#D98C70] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayItems.length === 0 && (
          <div className="bg-[#FFF8F3] border border-[#F0DED4] rounded-2xl p-12 text-center my-6">
            <p className="text-sm text-[#A27B6E]">No published honors or certifications found.</p>
          </div>
        )}

      </div>
    </section>
  );
};
