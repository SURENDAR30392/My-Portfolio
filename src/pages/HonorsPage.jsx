import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, ExternalLink, Calendar } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CertificateModal } from '../components/CertificateModal';
import { useData } from '../context/DataContext';

export const HonorsPage = () => {
  const { data } = useData();
  const [selectedCert, setSelectedCert] = useState(null);
  const [tab, setTab] = useState('all');

  const certs = data.certifications || [];
  const achievements = data.achievements || [];

  const items = [
    ...certs.map(c => ({ ...c, type: 'certification' })),
    ...achievements.map(a => ({ ...a, type: 'achievement' }))
  ];

  const filtered = tab === 'all' 
    ? items 
    : items.filter(i => i.type === tab);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-[#4B5F5C] hover:text-[#0F766E] transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            <h1 className="text-3xl font-semibold text-[#102A28] mb-2">
              Honors, Certifications & Achievements
            </h1>
            <p className="text-base text-[#4B5F5C] max-w-xl">
              Complete archive of technical certifications, competitive programming recognitions, and academic milestones earned at KL University.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-[#DDE7E5] pb-4">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'certification', label: 'Certifications' },
              { id: 'achievement', label: 'Achievements & Milestones' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.id
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-white text-[#4B5F5C] border border-[#DDE7E5] hover:bg-[#E6F4F2]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedCert(item)}
                className="bg-white border border-[#DDE7E5] rounded-xl p-5 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center">
                      <Award size={18} />
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
                  <p className="text-sm text-[#4B5F5C] mb-3">
                    {item.organization || item.issuer}
                  </p>
                  {item.description && (
                    <p className="text-xs text-[#8A9B98] line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DDE7E5]/60 flex items-center justify-between text-xs text-[#8A9B98]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {item.date || "2025"}
                  </span>
                  <span className="text-[#0F766E] font-medium group-hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />

      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};

