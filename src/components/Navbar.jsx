import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { data } = useData();

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Honors", href: "/honors" },
    { name: "Profiles", href: "/#coding" },
    { name: "Contact", href: "/#contact" }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#DDE7E5]">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Link */}
        <Link 
          to="/" 
          className="text-base font-semibold text-[#102A28] hover:bg-[#E6F4F2] px-3 py-1.5 rounded-[8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD]"
        >
          {data.profile?.name || "Marthala Surendar Reddy"}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname || 
              (link.href.startsWith("/honors") && location.pathname.startsWith("/honors"));

            const baseClass = "text-sm px-3 py-1.5 rounded-[8px] transition-colors hover:bg-[#E6F4F2] hover:text-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD]";
            const activeClass = isActive 
              ? "text-[#0F766E] font-medium underline decoration-2 decoration-[#0F766E] underline-offset-8" 
              : "text-[#4B5F5C]";

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

          <div className="ml-3 pl-3 border-l border-[#DDE7E5] flex items-center gap-2">
            <Link 
              to="/resume" 
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD] ${
                location.pathname === "/resume"
                  ? "bg-[#E6F4F2] border-[#7CC7BD] text-[#0F766E]"
                  : "border-[#DDE7E5] bg-white text-[#102A28] hover:bg-[#E6F4F2] hover:border-[#7CC7BD]"
              }`}
            >
              <span>Resume</span>
            </Link>

            <Link 
              to="/admin" 
              className={`text-sm font-medium px-3 py-1.5 rounded-[8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD] ${
                isAdmin 
                  ? "text-[#0F766E] bg-[#E6F4F2] font-semibold" 
                  : "text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2]"
              }`}
              title="Super Admin Dashboard"
            >
              {isAdmin ? "Admin (Active)" : "Admin"}
            </Link>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#102A28] hover:bg-[#E6F4F2] rounded-[8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#DDE7E5] px-6 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = link.href === location.pathname;
            const baseClass = "block px-3 py-2 text-base rounded-[8px] transition-colors hover:bg-[#E6F4F2] hover:text-[#0F766E]";
            const activeClass = isActive 
              ? "text-[#0F766E] font-medium underline decoration-2 decoration-[#0F766E] underline-offset-4" 
              : "text-[#4B5F5C]";

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

          <div className="pt-2 border-t border-[#DDE7E5] space-y-2">
            <Link 
              to="/resume" 
              onClick={handleNavClick} 
              className="inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-lg border border-[#DDE7E5] bg-white text-sm font-medium text-[#102A28] hover:bg-[#E6F4F2] hover:border-[#7CC7BD] transition-colors"
            >
              Resume
            </Link>
            <Link 
              to="/admin" 
              onClick={handleNavClick} 
              className="block text-center py-2 text-sm font-medium text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2] rounded-[8px] transition-colors"
            >
              Super Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

