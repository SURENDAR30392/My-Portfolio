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
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#F0DED4] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Link: Monogram + Name */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70] rounded-lg"
          title="Marthala Surendar Reddy — Home"
        >
          <span className="w-8 h-8 rounded-lg bg-[#FCE9DF] border border-[#F4C9B5] text-[#D98C70] font-bold text-xs flex items-center justify-center tracking-tight shadow-xs group-hover:bg-[#D98C70] group-hover:text-white transition-all duration-200">
            MSR
          </span>
          <span className="text-[15px] font-semibold text-[#613E35] tracking-tight whitespace-nowrap group-hover:text-[#D98C70] transition-colors">
            {data.profile?.name || "Marthala Surendar Reddy"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname || 
              (link.href.startsWith("/honors") && location.pathname.startsWith("/honors"));

            const baseClass = "text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70]";
            const activeClass = isActive 
              ? "text-[#D98C70] font-semibold bg-[#FCE9DF]" 
              : "text-[#A27B6E] hover:text-[#613E35] hover:bg-[#FFF8F3]";

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
          <div className="ml-2 pl-3 border-l border-[#F0DED4]">
            <Link 
              to="/resume" 
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70] ${
                location.pathname === "/resume"
                  ? "bg-[#D98C70] border-[#D98C70] text-white shadow-xs"
                  : "border-[#F0DED4] bg-white text-[#613E35] hover:bg-[#FCE9DF] hover:border-[#F4C9B5] hover:text-[#D98C70]"
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
            className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md border border-[#F0DED4] bg-white text-xs font-medium text-[#613E35] hover:text-[#D98C70]"
          >
            <FileText size={13} />
            <span>Resume</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#613E35] hover:bg-[#FCE9DF] hover:text-[#D98C70] rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#F0DED4] px-6 py-4 space-y-1 animate-fade-in shadow-md">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname;
            const baseClass = "block px-3 py-2 text-sm font-medium rounded-lg transition-colors";
            const activeClass = isActive 
              ? "text-[#D98C70] bg-[#FCE9DF] font-semibold" 
              : "text-[#A27B6E] hover:text-[#613E35] hover:bg-[#FFF8F3]";

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
