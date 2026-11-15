import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { CodingProfiles } from '../components/CodingProfiles';
import { Honors } from '../components/Honors';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ProjectModal } from '../components/ProjectModal';
import { CertificateModal } from '../components/CertificateModal';
import { useData } from '../context/DataContext';

export const HomePage = () => {
  const { data } = useData();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const sections = data.settings?.sectionsEnabled || {
    hero: true,
    work: true,
    about: true,
    skills: true,
    codingProfiles: true,
    honors: true,
    testimonials: true,
    contact: true
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA]">
      <Navbar />

      <main className="flex-1">
        {sections.hero !== false && <Hero />}
        {sections.work !== false && <Projects onSelectProject={setSelectedProject} />}
        {sections.about !== false && <About />}
        {sections.skills !== false && <Skills />}
        {sections.codingProfiles !== false && <CodingProfiles />}
        {sections.honors !== false && <Honors onSelectCert={setSelectedCert} />}
        {sections.testimonials !== false && <Testimonials />}
        {sections.contact !== false && <Contact />}
      </main>

      <Footer />

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};

