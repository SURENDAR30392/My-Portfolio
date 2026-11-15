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

  const certs = (data.certifications || []).filter(c => c.published !== false);
  const achievements = (data.achievements || []).filter(a => a.published !== false);

  const items = [
    ...certs.map(c => ({ ...c, type: 'certification' })),
    ...achievements.map(a => ({ ...a, type: 'achievement' }))
  ];

  const filtered = tab === 'all' 
    ? items 
    : items.filter(i => i.type === tab);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="mb-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            <span className="section-badge mb-3 block w-fit">Archive</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#172554] mb-2 tracking-tight">
              Honors, Certifications & Achievements
            </h1>
            <p className="text-base text-[#64748B] max-w-2xl">
              Complete archive of technical certifications, competitive programming recognitions, and academic milestones earned at KL University.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-[#E2E8F0] pb-4">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'certification', label: 'Certifications' },
              { id: 'achievement', label: 'Achievements & Milestones' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  tab === t.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedCert(item)}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    {item.isSample && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                        Sample
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#172554] mb-1.5 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-[#64748B] mb-3">
                    {item.organization || item.issuer}
                  </p>
                  {item.description && (
                    <p className="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 font-medium text-[#64748B]">
                    <Calendar size={13} className="text-[#2563EB]" />
                    <span>{item.date || "2025"}</span>
                  </span>
                  <span className="text-[#2563EB] font-semibold group-hover:underline">
                    View Details →
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
