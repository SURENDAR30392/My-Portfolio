import React from 'react';
import { useData } from '../context/DataContext';

export const Testimonials = () => {
  const { data } = useData();
  const testimonials = data.testimonials || [];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#EEF4F3] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
            Endorsements & Recommendations
          </h2>
          <p className="text-base text-[#4B5F5C] max-w-[620px]">
            Observations and feedback from academic mentors, hackathon peers, and technical collaborators.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 shadow-sm hover:border-[#7CC7BD] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <p className="text-base text-[#4B5F5C] leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-[#DDE7E5]">
                <div className="text-sm font-semibold text-[#102A28]">
                  {t.author}
                </div>
                <div className="text-xs text-[#8A9B98] mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
