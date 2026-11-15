import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  GraduationCap, 
  X, 
  Milestone, 
  Layers, 
  CheckCircle, 
  CheckCircle2,
  Calendar, 
  MapPin, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw,
  Eye,
  Sliders,
  Type
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminEducationView = () => {
  const { 
    data, 
    addEducation, 
    updateEducation, 
    deleteEducation, 
    updateAcademicJourney,
    updateSettings 
  } = useData();

  const education = data.education || [];
  const journey = data.academicJourney || [];
  const settings = data.settings || {};

  // Active Tab: 'degrees' | 'journey' | 'titles'
  const [activeTab, setActiveTab] = useState('degrees');

  // Modal states for Degrees
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const [currentDegreeId, setCurrentDegreeId] = useState(null);
  const emptyDegreeForm = {
    institution: '',
    degree: '',
    dates: '',
    location: '',
    description: '',
    highlightsText: '',
    published: true,
    isSample: false
  };
  const [degreeForm, setDegreeForm] = useState(emptyDegreeForm);

  // Modal states for Timeline Milestones
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [currentJourneyIdx, setCurrentJourneyIdx] = useState(null);
  const emptyJourneyForm = {
    year: '',
    title: '',
    desc: ''
  };
  const [journeyForm, setJourneyForm] = useState(emptyJourneyForm);

  // Section Titles Form State
  const [titlesForm, setTitlesForm] = useState({
    educationBadge: settings.educationBadge || 'Education',
    educationTitle: settings.educationTitle || 'Academic Background & Journey',
    educationSubtitle: settings.educationSubtitle || 'My undergraduate Computer Science engineering curriculum and academic progression at KL University.',
    degreesTitle: settings.degreesTitle || 'Degrees & Formal Coursework',
    journeyTitle: settings.journeyTitle || '4 Years at KL University (2024 – 2028)'
  });
  const [titlesSaved, setTitlesSaved] = useState(false);

  // ================= DEGREE HANDLERS =================
  const openAddDegreeModal = () => {
    setDegreeForm(emptyDegreeForm);
    setCurrentDegreeId(null);
    setIsDegreeModalOpen(true);
  };

  const openEditDegreeModal = (edu) => {
    setDegreeForm({
      institution: edu.institution || '',
      degree: edu.degree || '',
      dates: edu.dates || '',
      location: edu.location || '',
      description: edu.description || '',
      highlightsText: Array.isArray(edu.highlights) ? edu.highlights.join('\n') : (edu.highlights || ''),
      published: edu.published !== false,
      isSample: Boolean(edu.isSample)
    });
    setCurrentDegreeId(edu.id);
    setIsDegreeModalOpen(true);
  };

  const handleDegreeSubmit = async (e) => {
    e.preventDefault();
    const highlights = degreeForm.highlightsText
      ? degreeForm.highlightsText.split('\n').map(h => h.trim()).filter(Boolean)
      : [];

    const payload = {
      institution: degreeForm.institution.trim(),
      degree: degreeForm.degree.trim(),
      dates: degreeForm.dates.trim(),
      location: degreeForm.location.trim(),
      description: degreeForm.description.trim(),
      highlights,
      published: degreeForm.published,
      isSample: degreeForm.isSample
    };

    if (currentDegreeId) {
      await updateEducation(currentDegreeId, payload);
    } else {
      await addEducation(payload);
    }
    setIsDegreeModalOpen(false);
  };

  const handleDegreeDelete = async (id, degreeName) => {
    if (window.confirm(`Delete education record "${degreeName}"?`)) {
      await deleteEducation(id);
    }
  };

  const handleDegreeTogglePublish = async (edu) => {
    await updateEducation(edu.id, { published: !edu.published });
  };

  // ================= JOURNEY / PROGRESSION TRACK HANDLERS =================
  const openAddJourneyModal = () => {
    setJourneyForm({
      year: `YEAR ${journey.length + 1} · ${new Date().getFullYear()} – ${new Date().getFullYear() + 1}`,
      title: '',
      desc: ''
    });
    setCurrentJourneyIdx(null);
    setIsJourneyModalOpen(true);
  };

  const openEditJourneyModal = (item, idx) => {
    setJourneyForm({
      year: item.year || '',
      title: item.title || '',
      desc: item.desc || ''
    });
    setCurrentJourneyIdx(idx);
    setIsJourneyModalOpen(true);
  };

  const handleJourneySubmit = async (e) => {
    e.preventDefault();
    const updatedJourney = [...journey];
    const newItem = {
      year: journeyForm.year.trim(),
      title: journeyForm.title.trim(),
      desc: journeyForm.desc.trim()
    };

    if (currentJourneyIdx !== null && currentJourneyIdx >= 0) {
      updatedJourney[currentJourneyIdx] = newItem;
    } else {
      updatedJourney.push(newItem);
    }

    await updateAcademicJourney(updatedJourney);
    setIsJourneyModalOpen(false);
  };

  const handleJourneyDelete = async (idx, title) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      const updatedJourney = journey.filter((_, i) => i !== idx);
      await updateAcademicJourney(updatedJourney);
    }
  };

  const handleJourneyMove = async (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= journey.length) return;
    const updatedJourney = [...journey];
    const temp = updatedJourney[idx];
    updatedJourney[idx] = updatedJourney[targetIdx];
    updatedJourney[targetIdx] = temp;
    await updateAcademicJourney(updatedJourney);
  };

  const handleResetJourneyToDefault = async () => {
    if (window.confirm("Reset the 4-year progression track to standard KL University milestones?")) {
      const defaultMilestones = [
        {
          year: "YEAR 4 · 2027 – 2028",
          title: "Advanced Systems, Capstone & Graduation",
          desc: "Architecting cloud-native distributed systems, completing senior capstone engineering projects, and transitioning into full-time software engineering roles."
        },
        {
          year: "YEAR 3 · 2026 – 2027",
          title: "Full Stack & Cloud Architecture",
          desc: "Deepening expertise in Spring Boot microservices, Docker containerization, AWS cloud infrastructure, and large-scale web systems."
        },
        {
          year: "YEAR 2 · 2025 – 2026",
          title: "Web Platforms, Databases & Hackathons",
          desc: "Building production React web applications with Firebase, designing relational schemas in MySQL/PostgreSQL, and competing in state & national hackathons."
        },
        {
          year: "YEAR 1 · 2024 – 2025",
          title: "Foundations, Data Structures & Java",
          desc: "Enrolled in B.Tech Computer Science at KL University. Mastered core Java, Object-Oriented Programming, algorithmic problem solving on LeetCode and CodeChef."
        }
      ];
      await updateAcademicJourney(defaultMilestones);
    }
  };

  // ================= TITLES & HEADINGS HANDLER =================
  const handleTitlesSubmit = async (e) => {
    e.preventDefault();
    await updateSettings({
      educationBadge: titlesForm.educationBadge.trim(),
      educationTitle: titlesForm.educationTitle.trim(),
      educationSubtitle: titlesForm.educationSubtitle.trim(),
      degreesTitle: titlesForm.degreesTitle.trim(),
      journeyTitle: titlesForm.journeyTitle.trim()
    });
    setTitlesSaved(true);
    setTimeout(() => setTitlesSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#613E35] flex items-center gap-2.5">
          <GraduationCap size={26} className="text-[#613E35]" />
          <span>Academic Background & Journey Management</span>
        </h1>
        <p className="text-sm text-[#613E35] mt-1">
          Manage your degrees, university coursework, and the 4-year progression track shown on your portfolio.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#F0DED4] pb-3">
        <button
          onClick={() => setActiveTab('degrees')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'degrees'
              ? 'bg-[#D98C70] text-white shadow-xs'
              : 'bg-white text-[#613E35] border border-[#F0DED4] hover:bg-[#FCE9DF] hover:text-[#D98C70]'
          }`}
        >
          <GraduationCap size={15} />
          <span>Degrees & Formal Coursework ({education.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('journey')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'journey'
              ? 'bg-[#D98C70] text-white shadow-xs'
              : 'bg-white text-[#613E35] border border-[#F0DED4] hover:bg-[#FCE9DF] hover:text-[#D98C70]'
          }`}
        >
          <Milestone size={15} />
          <span>4-Year Academic Progression Track ({journey.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('titles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'titles'
              ? 'bg-[#D98C70] text-white shadow-xs'
              : 'bg-white text-[#613E35] border border-[#F0DED4] hover:bg-[#FCE9DF] hover:text-[#D98C70]'
          }`}
        >
          <Sliders size={15} />
          <span>Section Headings & Titles</span>
        </button>
      </div>

      {/* ================= TAB 1: DEGREES & COURSEWORK ================= */}
      {activeTab === 'degrees' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#613E35]">
                {settings.degreesTitle || 'Degrees & Formal Coursework'}
              </h2>
              <p className="text-xs text-[#613E35] mt-0.5">
                These records appear in the left column of your Education section.
              </p>
            </div>
            <button
              onClick={openAddDegreeModal}
              className="btn-primary text-xs h-9 px-4 gap-1.5 self-start sm:self-auto"
            >
              <Plus size={15} />
              <span>Add Degree Record</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {education.map((edu) => (
              <div 
                key={edu.id} 
                className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card hover:border-[#F4C9B5] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FCE9DF] text-[#613E35] border border-[#F4C9B5] flex items-center justify-center shrink-0 shadow-xs">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-[#613E35]">{edu.degree}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          edu.published !== false 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {edu.published !== false ? 'Published' : 'Hidden'}
                        </span>
                        {edu.isSample && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDE68A] text-[#B45309]">
                            Sample
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-[#613E35] font-medium mt-1">
                        {edu.institution}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#613E35] mt-1.5">
                        <span className="inline-flex items-center gap-1 font-medium text-[#613E35]">
                          <Calendar size={12} className="text-[#613E35]" />
                          {edu.dates}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} className="text-[#613E35]" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDegreeTogglePublish(edu)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                        edu.published !== false
                          ? 'border-[#F0DED4] text-[#613E35] hover:text-[#613E35] hover:bg-[#FFF8F3]'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                      title={edu.published !== false ? "Hide from public view" : "Publish to live website"}
                    >
                      {edu.published !== false ? "Hide" : "Publish"}
                    </button>

                    <button
                      onClick={() => openEditDegreeModal(edu)}
                      className="btn-secondary text-xs h-8 px-3 gap-1"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDegreeDelete(edu.id, edu.degree)}
                      className="p-1.5 rounded-lg border border-[#F0DED4] text-[#613E35] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete education record"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-[#613E35] leading-relaxed pt-2 border-t border-[#F0DED4]">
                    {edu.description}
                  </p>
                )}

                {Array.isArray(edu.highlights) && edu.highlights.length > 0 && (
                  <div className="pt-3 border-t border-[#F0DED4] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#613E35]">
                      Curriculum Highlights
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {edu.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#613E35]">
                          <CheckCircle2 size={13} className="text-[#613E35] shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {education.length === 0 && (
              <div className="bg-white border border-[#F0DED4] rounded-2xl p-12 text-center space-y-3">
                <GraduationCap size={36} className="mx-auto text-[#613E35]" />
                <h3 className="text-base font-semibold text-[#613E35]">No Education Records Found</h3>
                <p className="text-xs text-[#613E35]">Click "Add Degree Record" to create your first degree or academic credential.</p>
                <button onClick={openAddDegreeModal} className="btn-primary text-xs h-8 px-4">
                  Add Degree Record
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: ACADEMIC PROGRESSION TRACK ================= */}
      {activeTab === 'journey' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#613E35]">
                {settings.journeyTitle || '4 Years at KL University (2024 – 2028)'}
              </h2>
              <p className="text-xs text-[#613E35] mt-0.5">
                These milestone cards appear in the right column timeline on your Education section.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleResetJourneyToDefault}
                className="btn-secondary text-xs h-9 px-3 gap-1.5"
                title="Reset track to standard 4 years"
              >
                <RefreshCw size={13} />
                <span>Reset to Default 4 Years</span>
              </button>

              <button
                onClick={openAddJourneyModal}
                className="btn-primary text-xs h-9 px-4 gap-1.5"
              >
                <Plus size={15} />
                <span>Add Milestone</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {journey.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#F0DED4] rounded-2xl p-5 shadow-card hover:border-[#F4C9B5] transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#613E35]">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-[#613E35]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#613E35] leading-relaxed max-w-2xl pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Milestone Controls */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleJourneyMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg border border-[#F0DED4] text-[#613E35] hover:text-[#D98C70] hover:bg-[#FCE9DF] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Move milestone up"
                  >
                    <ArrowUp size={14} />
                  </button>

                  <button
                    onClick={() => handleJourneyMove(idx, 1)}
                    disabled={idx === journey.length - 1}
                    className="p-1.5 rounded-lg border border-[#F0DED4] text-[#613E35] hover:text-[#D98C70] hover:bg-[#FCE9DF] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Move milestone down"
                  >
                    <ArrowDown size={14} />
                  </button>

                  <button
                    onClick={() => openEditJourneyModal(item, idx)}
                    className="btn-secondary text-xs h-8 px-3 gap-1"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleJourneyDelete(idx, item.title)}
                    className="p-1.5 rounded-lg border border-[#F0DED4] text-[#613E35] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete milestone"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {journey.length === 0 && (
              <div className="bg-white border border-[#F0DED4] rounded-2xl p-12 text-center space-y-3">
                <Milestone size={36} className="mx-auto text-[#613E35]" />
                <h3 className="text-base font-semibold text-[#613E35]">No Timeline Milestones Defined</h3>
                <p className="text-xs text-[#613E35]">Add annual milestones to showcase your academic progression across your engineering degree.</p>
                <button onClick={openAddJourneyModal} className="btn-primary text-xs h-8 px-4">
                  Add Milestone
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: SECTION HEADINGS & TITLES ================= */}
      {activeTab === 'titles' && (
        <div className="bg-white border border-[#F0DED4] rounded-2xl p-6 shadow-card space-y-5 animate-fade-in">
          <div className="border-b border-[#F0DED4] pb-3">
            <h2 className="text-base font-bold text-[#613E35]">
              Customize Education Section Headings
            </h2>
            <p className="text-xs text-[#613E35] mt-0.5">
              Edit the headings, badge, and subtitles displayed on the public Education section.
            </p>
          </div>

          {titlesSaved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle size={16} className="shrink-0 text-emerald-600" />
              <span>Section headings saved successfully to Firestore!</span>
            </div>
          )}

          <form onSubmit={handleTitlesSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                  Small Section Badge
                </label>
                <input
                  type="text"
                  required
                  value={titlesForm.educationBadge}
                  onChange={e => setTitlesForm({ ...titlesForm, educationBadge: e.target.value })}
                  placeholder="Education"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  required
                  value={titlesForm.educationTitle}
                  onChange={e => setTitlesForm({ ...titlesForm, educationTitle: e.target.value })}
                  placeholder="Academic Background & Journey"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                Section Subtitle / Description
              </label>
              <textarea
                rows={2}
                required
                value={titlesForm.educationSubtitle}
                onChange={e => setTitlesForm({ ...titlesForm, educationSubtitle: e.target.value })}
                placeholder="My undergraduate Computer Science engineering curriculum and academic progression at KL University."
                className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0DED4]">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                  Left Column Title (Degrees)
                </label>
                <input
                  type="text"
                  required
                  value={titlesForm.degreesTitle}
                  onChange={e => setTitlesForm({ ...titlesForm, degreesTitle: e.target.value })}
                  placeholder="Degrees & Formal Coursework"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1.5">
                  Right Column Title (Progression Track)
                </label>
                <input
                  type="text"
                  required
                  value={titlesForm.journeyTitle}
                  onChange={e => setTitlesForm({ ...titlesForm, journeyTitle: e.target.value })}
                  placeholder="4 Years at KL University (2024 – 2028)"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-end">
              <button
                type="submit"
                className="btn-primary text-xs h-9 px-6 gap-2"
              >
                <CheckCircle size={15} />
                <span>Save Section Titles</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT DEGREE ================= */}
      {isDegreeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#613E35]/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#F0DED4] rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0DED4] mb-4">
              <h2 className="text-base font-bold text-[#613E35] flex items-center gap-2">
                <GraduationCap size={18} className="text-[#613E35]" />
                <span>{currentDegreeId ? 'Edit Degree Record' : 'Add Degree Record'}</span>
              </h2>
              <button 
                onClick={() => setIsDegreeModalOpen(false)} 
                className="text-[#613E35] hover:text-[#613E35] p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleDegreeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Degree & Major *
                </label>
                <input
                  type="text"
                  required
                  value={degreeForm.degree}
                  onChange={e => setDegreeForm({ ...degreeForm, degree: e.target.value })}
                  placeholder="e.g. B.Tech in Computer Science and Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Institution / University *
                </label>
                <input
                  type="text"
                  required
                  value={degreeForm.institution}
                  onChange={e => setDegreeForm({ ...degreeForm, institution: e.target.value })}
                  placeholder="KL University"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">
                    Timeline / Academic Period *
                  </label>
                  <input
                    type="text"
                    required
                    value={degreeForm.dates}
                    onChange={e => setDegreeForm({ ...degreeForm, dates: e.target.value })}
                    placeholder="2024 – 2028"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#613E35] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={degreeForm.location}
                    onChange={e => setDegreeForm({ ...degreeForm, location: e.target.value })}
                    placeholder="Vijayawada, Andhra Pradesh, India"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Description / Academic Summary
                </label>
                <textarea
                  rows={4}
                  value={degreeForm.description}
                  onChange={e => setDegreeForm({ ...degreeForm, description: e.target.value })}
                  placeholder="Provide an overview of your studies, core focus areas, or skills acquired..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Curriculum Highlights (Optional, one per line)
                </label>
                <textarea
                  rows={3}
                  value={degreeForm.highlightsText}
                  onChange={e => setDegreeForm({ ...degreeForm, highlightsText: e.target.value })}
                  placeholder={"Core Java & Object-Oriented Software Design\nData Structures and Algorithms\nDBMS & Relational Databases"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-xs focus:outline-none focus:border-[#D98C70] font-mono resize-none"
                />
                <p className="text-[11px] text-[#613E35] mt-1">
                  Enter each key highlight on a new line to display as checkmark bullet points.
                </p>
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#613E35]">
                  <input
                    type="checkbox"
                    checked={degreeForm.published}
                    onChange={e => setDegreeForm({ ...degreeForm, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#613E35] focus:ring-[#F4C9B5]"
                  />
                  <span>Publish this degree record on the public website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDegreeModalOpen(false)}
                  className="btn-secondary text-xs h-9 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs h-9 px-5 gap-1.5"
                >
                  <CheckCircle size={14} />
                  <span>{currentDegreeId ? 'Save Changes' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT MILESTONE ================= */}
      {isJourneyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#613E35]/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#F0DED4] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0DED4] mb-4">
              <h2 className="text-base font-bold text-[#613E35] flex items-center gap-2">
                <Milestone size={18} className="text-[#613E35]" />
                <span>{currentJourneyIdx !== null ? 'Edit Progression Milestone' : 'Add Progression Milestone'}</span>
              </h2>
              <button 
                onClick={() => setIsJourneyModalOpen(false)} 
                className="text-[#613E35] hover:text-[#613E35] p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleJourneySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Year / Timeline Tag *
                </label>
                <input
                  type="text"
                  required
                  value={journeyForm.year}
                  onChange={e => setJourneyForm({ ...journeyForm, year: e.target.value })}
                  placeholder="e.g. YEAR 1 · 2024 – 2025"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Milestone Focus Title *
                </label>
                <input
                  type="text"
                  required
                  value={journeyForm.title}
                  onChange={e => setJourneyForm({ ...journeyForm, title: e.target.value })}
                  placeholder="e.g. Foundations, Data Structures & Java"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#613E35] mb-1">
                  Milestone Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={journeyForm.desc}
                  onChange={e => setJourneyForm({ ...journeyForm, desc: e.target.value })}
                  placeholder="Describe your achievements, technical progression, projects, or milestones during this period..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DED4] text-sm focus:outline-none focus:border-[#D98C70] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#F0DED4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJourneyModalOpen(false)}
                  className="btn-secondary text-xs h-9 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs h-9 px-5 gap-1.5"
                >
                  <CheckCircle size={14} />
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
