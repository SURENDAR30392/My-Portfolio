import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

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

  const email = profile.email || social.email || "marthalasurendarreddy@gmail.com";
  const phone = profile.phone || "+91 98765 43210";
  const location = profile.location || "Andhra Pradesh, India";

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
    <section id="contact" className="py-16 md:py-24 bg-[#F7FAFA] border-t border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102A28] mb-3">
              Contact
            </h2>
            <p className="text-base text-[#4B5F5C] leading-relaxed mb-8">
              Feel free to reach out for software project discussions, technical inquiries, or internship opportunities. I typically respond within 24 hours.
            </p>

            <div className="space-y-3.5">
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-[#DDE7E5] bg-[#FFFFFF] hover:bg-[#E6F4F2] hover:border-[#7CC7BD] transition-all text-sm text-[#102A28] font-medium"
              >
                <div className="w-8 h-8 rounded-md bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div className="truncate">
                  <div className="text-xs text-[#8A9B98]">Email</div>
                  <div className="truncate">{email}</div>
                </div>
              </a>

              <a 
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-[#DDE7E5] bg-[#FFFFFF] hover:bg-[#E6F4F2] hover:border-[#7CC7BD] transition-all text-sm text-[#102A28] font-medium"
              >
                <div className="w-8 h-8 rounded-md bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-xs text-[#8A9B98]">Phone</div>
                  <div>{phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-[#DDE7E5] bg-[#FFFFFF] text-sm text-[#102A28]">
                <div className="w-8 h-8 rounded-md bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-xs text-[#8A9B98]">Location</div>
                  <div>{location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#DDE7E5] rounded-xl p-6 md:p-8 shadow-sm">
              
              {status === 'success' ? (
                <div className="py-8 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#E6F4F2] text-[#0F766E] flex items-center justify-center mx-auto mb-4 border border-[#7CC7BD]/40">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#102A28] mb-2">
                    Message sent successfully!
                  </h3>
                  <p className="text-sm text-[#4B5F5C] max-w-sm mx-auto mb-6">
                    Thank you for reaching out, Marthala Surendar Reddy will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for anti-spam bots */}
                  <input
                    type="text"
                    name="hp_check"
                    value={formData.hp_check}
                    onChange={(e) => setFormData({ ...formData, hp_check: e.target.value })}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-sm flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[#102A28] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm text-[#102A28] bg-white placeholder-[#8A9B98] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#7CC7BD]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#102A28] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm text-[#102A28] bg-white placeholder-[#8A9B98] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#7CC7BD]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-[#102A28] mb-1.5">
                      Subject (Optional)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project inquiry, collaboration, etc."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm text-[#102A28] bg-white placeholder-[#8A9B98] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#7CC7BD]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#102A28] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm text-[#102A28] bg-white placeholder-[#8A9B98] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#7CC7BD]/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <span>Send message</span>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
