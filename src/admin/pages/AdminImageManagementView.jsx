import React, { useState } from 'react';
import { 
  Images, 
  Save, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Briefcase, 
  Award, 
  Globe,
  FileText,
  Info,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ImageUrlInput } from '../../components/common/ImageUrlInput';

export const AdminImageManagementView = () => {
  const { 
    data, 
    updateProfile, 
    updateProject, 
    updateCertification, 
    updateAchievement,
    updateSettings
  } = useData();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'profile' | 'about' | 'projects' | 'certifications' | 'achievements' | 'other'

  const profile = data.profile || {};
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const achievements = data.achievements || [];
  const settings = data.settings || {};

  // Local state for image URLs
  const [profileImgUrl, setProfileImgUrl] = useState(profile.avatar || '/msr-portrait.svg');
  const [aboutImgUrl, setAboutImgUrl] = useState(profile.aboutImage || profile.avatar || '/msr-portrait.svg');
  const [resumeThumbUrl, setResumeThumbUrl] = useState(profile.resumeThumbnail || '');
  const [ogImageUrl, setOgImageUrl] = useState(settings.ogImage || '');

  const [projectUrls, setProjectUrls] = useState(() => {
    const map = {};
    projects.forEach(p => { map[p.id] = p.image || ''; });
    return map;
  });

  const [certUrls, setCertUrls] = useState(() => {
    const map = {};
    certs.forEach(c => { map[c.id] = c.imageUrl || ''; });
    return map;
  });

  const [achUrls, setAchUrls] = useState(() => {
    const map = {};
    achievements.forEach(a => { map[a.id] = a.imageUrl || ''; });
    return map;
  });

  // Handlers for Profile & About
  const handleSaveProfile = async () => {
    await updateProfile({ avatar: profileImgUrl });
  };

  const handleRemoveProfile = async () => {
    if (window.confirm("Reset profile image to default SVG vector?")) {
      setProfileImgUrl('/msr-portrait.svg');
      await updateProfile({ avatar: '/msr-portrait.svg' });
    }
  };

  const handlePromptReplaceProfile = () => {
    const nextUrl = window.prompt("Enter new Profile Image URL (HTTP/HTTPS):", profileImgUrl);
    if (nextUrl !== null && nextUrl.trim()) {
      setProfileImgUrl(nextUrl.trim());
    }
  };

  const handleSaveAboutImage = async () => {
    await updateProfile({ aboutImage: aboutImgUrl });
  };

  const handleRemoveAboutImage = async () => {
    if (window.confirm("Remove About section image?")) {
      setAboutImgUrl('');
      await updateProfile({ aboutImage: '' });
    }
  };

  const handlePromptReplaceAbout = () => {
    const nextUrl = window.prompt("Enter new About Section Image URL:", aboutImgUrl);
    if (nextUrl !== null && nextUrl.trim()) {
      setAboutImgUrl(nextUrl.trim());
    }
  };

  // Handlers for Projects
  const handleSaveProject = async (id) => {
    await updateProject(id, { image: projectUrls[id] || '' });
  };

  const handleRemoveProject = async (id) => {
    if (window.confirm("Remove this project cover image? A clean fallback banner will be used.")) {
      setProjectUrls(prev => ({ ...prev, [id]: '' }));
      await updateProject(id, { image: '' });
    }
  };

  const handlePromptReplaceProject = (id) => {
    const nextUrl = window.prompt("Enter new Project Image URL:", projectUrls[id] || '');
    if (nextUrl !== null) {
      setProjectUrls(prev => ({ ...prev, [id]: nextUrl.trim() }));
    }
  };

  // Handlers for Certifications
  const handleSaveCert = async (id) => {
    await updateCertification(id, { imageUrl: certUrls[id] || '' });
  };

  const handleRemoveCert = async (id) => {
    if (window.confirm("Remove this certificate image?")) {
      setCertUrls(prev => ({ ...prev, [id]: '' }));
      await updateCertification(id, { imageUrl: '' });
    }
  };

  const handlePromptReplaceCert = (id) => {
    const nextUrl = window.prompt("Enter new Certificate Image URL:", certUrls[id] || '');
    if (nextUrl !== null) {
      setCertUrls(prev => ({ ...prev, [id]: nextUrl.trim() }));
    }
  };

  // Handlers for Achievements
  const handleSaveAch = async (id) => {
    await updateAchievement(id, { imageUrl: achUrls[id] || '' });
  };

  const handleRemoveAch = async (id) => {
    if (window.confirm("Remove this achievement image?")) {
      setAchUrls(prev => ({ ...prev, [id]: '' }));
      await updateAchievement(id, { imageUrl: '' });
    }
  };

  const handlePromptReplaceAch = (id) => {
    const nextUrl = window.prompt("Enter new Achievement Image URL:", achUrls[id] || '');
    if (nextUrl !== null) {
      setAchUrls(prev => ({ ...prev, [id]: nextUrl.trim() }));
    }
  };

  // Handlers for Other Images
  const handleSaveOther = async () => {
    await updateProfile({ resumeThumbnail: resumeThumbUrl });
    await updateSettings({ ogImage: ogImageUrl });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#613E35] flex items-center gap-2.5">
          <Images size={24} className="text-[#D98C70]" />
          <span>Image Management</span>
        </h1>
        <p className="text-sm text-[#A27B6E] mt-1">
          Manage all portfolio images via direct public URLs. Optimized for Firebase Spark free plan with zero-cost external hosting.
        </p>
      </div>

      {/* Spark Free Plan Architecture Callout */}
      <div className="bg-[#FCE9DF] border border-[#F4C9B5]/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-[#D98C70] flex items-center justify-center shrink-0 shadow-xs border border-[#F0DED4]">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#613E35]">
              Firebase Spark Free Plan — URL-Based Image Pipeline
            </h3>
            <p className="text-xs text-[#A27B6E] mt-1 leading-relaxed">
              No Firebase Storage bucket billing is required. You can host images anywhere: <strong>GitHub Raw</strong>, <strong>Imgur</strong>, <strong>Cloudinary Free</strong>, <strong>PostImages</strong>, or any HTTPS CDN. Every URL provides an instant live preview before saving to Firestore.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#F0DED4] pb-3">
        {[
          { id: 'all', label: 'All Images' },
          { id: 'profile', label: '1. Profile Image', count: 1 },
          { id: 'about', label: '2. About Section', count: 1 },
          { id: 'projects', label: '3. Projects', count: projects.length },
          { id: 'certifications', label: '4. Certifications', count: certs.length },
          { id: 'achievements', label: '5. Achievements', count: achievements.length },
          { id: 'other', label: '6. Other Images', count: 2 }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === t.id
                ? 'bg-[#D98C70] text-white shadow-xs'
                : 'bg-white text-[#A27B6E] border border-[#F0DED4] hover:bg-[#FCE9DF]'
            }`}
          >
            {t.label} {t.count !== undefined ? `(${t.count})` : ''}
          </button>
        ))}
      </div>

      {/* Grid of Image Modules */}
      <div className="space-y-6">

        {/* 1. PROFILE IMAGE */}
        {(activeTab === 'all' || activeTab === 'profile') && (
          <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0DED4] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[#613E35]">
                    Image Title: Profile Image
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                    Category: Profile
                  </span>
                </div>
                <p className="text-xs text-[#A27B6E] mt-0.5">Hero section main portrait photograph</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePromptReplaceProfile}
                  className="btn-secondary text-xs h-8 px-3"
                  title="Replace with new URL"
                >
                  <RefreshCw size={13} />
                  <span>Replace URL</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveProfile}
                  className="p-2 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  title="Remove Image (reset to default)"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="btn-primary text-xs h-8 px-4"
                >
                  <Save size={13} />
                  <span>Save URL</span>
                </button>
              </div>
            </div>

            <ImageUrlInput
              label="Image URL Input"
              value={profileImgUrl}
              onChange={setProfileImgUrl}
              onRemove={handleRemoveProfile}
              placeholder="https://example.com/msr.jpg or /msr-portrait.svg"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        )}

        {/* 2. ABOUT SECTION IMAGE */}
        {(activeTab === 'all' || activeTab === 'about') && (
          <div className="bg-white border border-[#F0DED4] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0DED4] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[#613E35]">
                    Image Title: About Section Graphic / Image
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                    Category: About Section
                  </span>
                </div>
                <p className="text-xs text-[#A27B6E] mt-0.5">Secondary portrait or academic campus photo</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePromptReplaceAbout}
                  className="btn-secondary text-xs h-8 px-3"
                >
                  <RefreshCw size={13} />
                  <span>Replace URL</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveAboutImage}
                  className="p-2 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  title="Remove image"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleSaveAboutImage}
                  className="btn-primary text-xs h-8 px-4"
                >
                  <Save size={13} />
                  <span>Save URL</span>
                </button>
              </div>
            </div>

            <ImageUrlInput
              label="Image URL Input"
              value={aboutImgUrl}
              onChange={setAboutImgUrl}
              onRemove={handleRemoveAboutImage}
              placeholder="https://example.com/about-image.jpg"
              aspectRatio="aspect-[16/10]"
            />
          </div>
        )}

        {/* 3. PROJECT IMAGES */}
        {(activeTab === 'all' || activeTab === 'projects') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
                <Briefcase size={18} className="text-[#D98C70]" />
                <span>Project Images ({projects.length})</span>
              </h2>
              <span className="text-xs text-[#A27B6E]">All project cover preview banners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-[#F0DED4] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-[#F0DED4] pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                            Category: Projects
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[#613E35] mt-1 line-clamp-1">
                          Image Title: {proj.title}
                        </h3>
                      </div>
                      {proj.isSample && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                          Sample
                        </span>
                      )}
                    </div>

                    <ImageUrlInput
                      label="Image URL Input"
                      value={projectUrls[proj.id] !== undefined ? projectUrls[proj.id] : (proj.image || '')}
                      onChange={(newVal) => setProjectUrls(prev => ({ ...prev, [proj.id]: newVal }))}
                      onRemove={() => handleRemoveProject(proj.id)}
                      placeholder="https://images.unsplash.com/... or raw image URL"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#F0DED4] flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handlePromptReplaceProject(proj.id)}
                      className="btn-secondary text-xs h-8 px-2.5"
                      title="Replace URL"
                    >
                      <RefreshCw size={12} />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="p-1.5 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveProject(proj.id)}
                      className="btn-primary text-xs h-8 px-3.5 inline-flex items-center gap-1.5"
                    >
                      <Save size={13} />
                      <span>Save URL</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CERTIFICATION IMAGES */}
        {(activeTab === 'all' || activeTab === 'certifications') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
                <Award size={18} className="text-[#D98C70]" />
                <span>Certification Images ({certs.length})</span>
              </h2>
              <span className="text-xs text-[#A27B6E]">Certificate credentials & proof preview cards</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certs.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-[#F0DED4] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-[#F0DED4] pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                            Category: Certifications
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[#613E35] mt-1 line-clamp-1">
                          Image Title: {c.title}
                        </h3>
                        <span className="text-[11px] text-[#A27B6E]">{c.organization}</span>
                      </div>
                      {c.isSample && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                          Sample
                        </span>
                      )}
                    </div>

                    <ImageUrlInput
                      label="Image URL Input"
                      value={certUrls[c.id] !== undefined ? certUrls[c.id] : (c.imageUrl || '')}
                      onChange={(newVal) => setCertUrls(prev => ({ ...prev, [c.id]: newVal }))}
                      onRemove={() => handleRemoveCert(c.id)}
                      placeholder="https://example.com/certificate.jpg"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#F0DED4] flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handlePromptReplaceCert(c.id)}
                      className="btn-secondary text-xs h-8 px-2.5"
                      title="Replace URL"
                    >
                      <RefreshCw size={12} />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveCert(c.id)}
                      className="p-1.5 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveCert(c.id)}
                      className="btn-primary text-xs h-8 px-3.5 inline-flex items-center gap-1.5"
                    >
                      <Save size={13} />
                      <span>Save URL</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ACHIEVEMENT IMAGES */}
        {(activeTab === 'all' || activeTab === 'achievements') && achievements.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
              <Award size={18} className="text-[#D98C70]" />
              <span>Achievement Images ({achievements.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white border border-[#F0DED4] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="border-b border-[#F0DED4] pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                          Category: Achievements
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#613E35] mt-1">
                        Image Title: {a.title}
                      </h3>
                      <span className="text-[11px] text-[#A27B6E]">{a.organization}</span>
                    </div>

                    <ImageUrlInput
                      label="Image URL Input"
                      value={achUrls[a.id] !== undefined ? achUrls[a.id] : (a.imageUrl || '')}
                      onChange={(newVal) => setAchUrls(prev => ({ ...prev, [a.id]: newVal }))}
                      onRemove={() => handleRemoveAch(a.id)}
                      placeholder="https://example.com/trophy-or-badge.jpg"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#F0DED4] flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handlePromptReplaceAch(a.id)}
                      className="btn-secondary text-xs h-8 px-2.5"
                      title="Replace URL"
                    >
                      <RefreshCw size={12} />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveAch(a.id)}
                      className="p-1.5 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveAch(a.id)}
                      className="btn-primary text-xs h-8 px-3.5 inline-flex items-center gap-1.5"
                    >
                      <Save size={13} />
                      <span>Save URL</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. OTHER PORTFOLIO IMAGES */}
        {(activeTab === 'all' || activeTab === 'other') && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#613E35] flex items-center gap-2">
              <FileText size={18} className="text-[#D98C70]" />
              <span>Other Portfolio Images & Social Previews</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Resume Preview Thumbnail */}
              <div className="bg-white border border-[#F0DED4] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-[#F0DED4] pb-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                      Category: Other / Documents
                    </span>
                    <h3 className="text-sm font-semibold text-[#613E35] mt-1">
                      Image Title: Resume Document Preview Thumbnail
                    </h3>
                  </div>

                  <ImageUrlInput
                    label="Image URL Input"
                    value={resumeThumbUrl}
                    onChange={setResumeThumbUrl}
                    onRemove={() => setResumeThumbUrl('')}
                    placeholder="https://example.com/resume-preview.png"
                    aspectRatio="aspect-[3/4]"
                  />
                </div>

                <div className="pt-3 border-t border-[#F0DED4] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = window.prompt("Enter new Resume Thumbnail URL:", resumeThumbUrl);
                      if (next !== null) setResumeThumbUrl(next.trim());
                    }}
                    className="btn-secondary text-xs h-8 px-2.5"
                  >
                    <RefreshCw size={12} />
                    <span>Replace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeThumbUrl('')}
                    className="p-1.5 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveOther}
                    className="btn-primary text-xs h-8 px-3.5 inline-flex items-center gap-1.5"
                  >
                    <Save size={13} />
                    <span>Save URL</span>
                  </button>
                </div>
              </div>

              {/* Social Share / Open Graph Image */}
              <div className="bg-white border border-[#F0DED4] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-[#F0DED4] pb-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FCE9DF] text-[#D98C70] border border-[#F4C9B5]/40">
                      Category: Other / Social Share
                    </span>
                    <h3 className="text-sm font-semibold text-[#613E35] mt-1">
                      Image Title: Open Graph Social Preview Image (OG Banner)
                    </h3>
                  </div>

                  <ImageUrlInput
                    label="Image URL Input"
                    value={ogImageUrl}
                    onChange={setOgImageUrl}
                    onRemove={() => setOgImageUrl('')}
                    placeholder="https://example.com/og-preview.jpg"
                    aspectRatio="aspect-[16/9]"
                  />
                </div>

                <div className="pt-3 border-t border-[#F0DED4] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = window.prompt("Enter new OG Banner URL:", ogImageUrl);
                      if (next !== null) setOgImageUrl(next.trim());
                    }}
                    className="btn-secondary text-xs h-8 px-2.5"
                  >
                    <RefreshCw size={12} />
                    <span>Replace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOgImageUrl('')}
                    className="p-1.5 rounded-lg border border-[#F0DED4] text-[#A27B6E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveOther}
                    className="btn-primary text-xs h-8 px-3.5 inline-flex items-center gap-1.5"
                  >
                    <Save size={13} />
                    <span>Save URL</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
