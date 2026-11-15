import React from 'react';
import { Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Testimonials = () => {
  const { data } = useData();
  const testimonials = data.testimonials || [];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Recommendations</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            Endorsements & Feedback
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            Observations from academic mentors, hackathon teammates, and peer developers at KL University.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-card hover:border-[#BFDBFE] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-4">
                  <Quote size={18} />
                </div>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <div className="text-sm font-bold text-[#172554]">
                  {t.author}
                </div>
                <div className="text-xs font-medium text-[#2563EB] mt-0.5">
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
