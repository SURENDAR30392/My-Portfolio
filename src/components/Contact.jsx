import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, AlertCircle, Loader2, Linkedin, Github, Code2, Send } from 'lucide-react';
import { CodeChefIcon } from './icons/CodeChefIcon';
import { useData } from '../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../data/socialLinks';

export const Contact = () => {
  const { data, sendMessage } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp_check: '' // Honeypot anti-spam
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const email = profile.email || social.email || DEFAULT_SOCIAL_LINKS.email;
  const phone = profile.phone || "+91 98765 43210";
  const location = profile.location || "Andhra Pradesh, India";

  const directLinks = [
    { name: "LinkedIn", url: social.linkedin || DEFAULT_SOCIAL_LINKS.linkedin, icon: Linkedin },
    { name: "GitHub", url: social.github || DEFAULT_SOCIAL_LINKS.github, icon: Github },
    { name: "LeetCode", url: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode, icon: Code2 },
    { name: "CodeChef", url: social.codechef || DEFAULT_SOCIAL_LINKS.codechef, icon: CodeChefIcon }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot check
    if (formData.hp_check) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', hp_check: '' });
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    // Validation
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus('sending');

    try {
      await sendMessage({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject || "General Inquiry",
        message: trimmedMessage
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', hp_check: '' });
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus('error');
      setErrorMessage("Unable to send message right now. Please email directly at " + email);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-badge mb-3">Contact</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight">
            Let's Discuss Software Opportunities
          </h2>
          <p className="text-base text-[#64748B] mt-2 max-w-2xl">
            Whether for software engineering internships, technical collaborations, or general questions, I'm always open to connecting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-[#172554]">
              Direct Contact Information
            </h3>

            <div className="space-y-3.5">
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-3.5 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-all duration-150 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-[#94A3B8] uppercase">Email Address</div>
                  <div className="text-sm font-semibold text-[#172554] group-hover:text-[#2563EB] transition-colors truncate">
                    {email}
                  </div>
                </div>
              </a>

              <a 
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-all duration-150 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#94A3B8] uppercase">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-[#172554] group-hover:text-[#2563EB] transition-colors">
                    {phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#94A3B8] uppercase">Campus Location</div>
                  <div className="text-sm font-semibold text-[#172554]">
                    {location} (KL University)
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Social Grid */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                Technical Profiles
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {directLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-all duration-150 group"
                    >
                      <Icon size={16} className="text-[#2563EB]" />
                      <span className="text-xs font-semibold text-[#172554] group-hover:text-[#2563EB] transition-colors">
                        {item.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-card">
            <h3 className="text-lg font-bold text-[#172554] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#64748B] mb-6">
              Messages are routed securely to Cloud Firestore and accessible only to the authorized Super Admin.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-start gap-3 animate-fade-in">
                <Check size={18} className="text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#172554]">Message Sent Successfully</div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Thank you for reaching out. I have received your message and will reply shortly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-fade-in">
                <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-red-900">Message Delivery Notice</div>
                  <div className="text-xs text-red-700 mt-0.5">{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="hp_check"
                value={formData.hp_check}
                onChange={e => setFormData({ ...formData, hp_check: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity / Technical question"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172554] mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Surendar, I'd like to discuss..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full sm:w-auto h-11 px-7 text-sm flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
