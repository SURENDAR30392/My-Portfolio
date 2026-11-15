import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data } = useData();

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Coding", href: "/#coding" },
    { name: "Honors", href: "/honors" },
    { name: "Contact", href: "/#contact" }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Link: Monogram + Name */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB] rounded-lg"
          title="Marthala Surendar Reddy — Home"
        >
          <span className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] font-bold text-xs flex items-center justify-center tracking-tight shadow-xs group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
            MSR
          </span>
          <span className="text-[15px] font-semibold text-[#172554] tracking-tight whitespace-nowrap group-hover:text-[#2563EB] transition-colors">
            {data.profile?.name || "Marthala Surendar Reddy"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname || 
              (link.href.startsWith("/honors") && location.pathname.startsWith("/honors"));

            const baseClass = "text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]";
            const activeClass = isActive 
              ? "text-[#2563EB] font-semibold bg-[#EFF6FF]" 
              : "text-[#64748B] hover:text-[#172554] hover:bg-[#F8FAFC]";

            return isAnchor ? (
              <a 
                key={link.name} 
                href={link.href} 
                className={`${baseClass} ${activeClass}`}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`${baseClass} ${activeClass}`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Resume Quick Action */}
          <div className="ml-2 pl-3 border-l border-[#E2E8F0]">
            <Link 
              to="/resume" 
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                location.pathname === "/resume"
                  ? "bg-[#2563EB] border-[#2563EB] text-white shadow-xs"
                  : "border-[#E2E8F0] bg-white text-[#172554] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB]"
              }`}
            >
              <FileText size={14} />
              <span>Resume</span>
            </Link>
          </div>
        </nav>

        {/* Tablet / Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/resume"
            className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md border border-[#E2E8F0] bg-white text-xs font-medium text-[#172554] hover:text-[#2563EB]"
          >
            <FileText size={13} />
            <span>Resume</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#172554] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E2E8F0] px-6 py-4 space-y-1 animate-fade-in shadow-md">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname;
            const baseClass = "block px-3 py-2 text-sm font-medium rounded-lg transition-colors";
            const activeClass = isActive 
              ? "text-[#2563EB] bg-[#EFF6FF] font-semibold" 
              : "text-[#64748B] hover:text-[#172554] hover:bg-[#F8FAFC]";

            return isAnchor ? (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={handleNavClick} 
                className={`${baseClass} ${activeClass}`}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={handleNavClick} 
                className={`${baseClass} ${activeClass}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
