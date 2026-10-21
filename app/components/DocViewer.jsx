'use client';

import { useState, useEffect } from 'react';

export default function DocViewer({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Scrollspy using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    // Global escape key handler for lightbox and mobile menu
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContentClick = (e) => {
    // Handle click on screenshot cards for lightbox
    const card = e.target.closest('.doc-screenshot-card');
    if (card) {
      const img = card.querySelector('img');
      if (img) {
        setLightboxImg({ src: img.src, alt: img.alt });
      }
      return;
    }

    // Handle click on copy buttons
    const copyBtn = e.target.closest('.code-copy-btn');
    if (copyBtn) {
      let rawText = copyBtn.getAttribute('data-copy') || '';
      try {
        rawText = decodeURIComponent(rawText);
      } catch (err) {}

      if (rawText) {
        navigator.clipboard.writeText(rawText).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C875" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
          copyBtn.classList.add('border-emerald-500', 'text-emerald-400');
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('border-emerald-500', 'text-emerald-400');
          }, 2000);
        });
      }
    }
  };

  // Group sections by category for sidebar
  const categories = [];
  sections.forEach((sec) => {
    let cat = categories.find((c) => c.name === sec.category);
    if (!cat) {
      cat = { name: sec.category, items: [] };
      categories.push(cat);
    }
    cat.items.push(sec);
  });

  return (
    <div className="min-h-screen bg-gray-50/60 text-gray-900 font-sans">
      {/* Top Navigation Header (Light Mode Only, Tailwind Styled) */}
      <header className="fixed top-0 left-0 right-0 h-[68px] bg-white/95 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-7 z-30">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-vtn-red hover:border-vtn-red transition-colors cursor-pointer shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <a href="#overview" className="flex items-center gap-3 no-underline text-gray-900 font-display font-extrabold text-lg sm:text-xl tracking-tight group">
            <div className="flex items-center justify-center w-8 h-9 shrink-0">
              <img src="/icons/vtn-logo.svg" alt="Voice to notes" className="w-full h-full object-contain block transition-transform group-hover:scale-105" />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-gray-900">
              Voice to notes docs
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-vtn-red/10 text-vtn-red border border-vtn-red/25 font-sans">
              SSO ADMIN CONFIGURATION
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-vtn-red/10 text-vtn-red border border-vtn-red/25">
            Enterprise
          </span>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Main Documentation Shell */}
      <div className="flex justify-center mt-[68px] min-h-[calc(100vh-68px)]">
        <div className="flex w-full max-w-[1440px]">
          {/* Left Sticky Sidebar */}
          <aside
            className={`w-[290px] h-[calc(100vh-68px)] sticky top-[68px] bg-gray-100/70 border-r border-gray-200 overflow-y-auto px-3.5 py-6 shrink-0 transition-transform duration-300 z-40 lg:translate-x-0 ${
              mobileOpen
                ? 'fixed top-0 bottom-0 left-0 h-screen z-50 bg-white translate-x-0 shadow-2xl pt-5'
                : 'fixed lg:sticky -translate-x-full lg:translate-x-0'
            }`}
          >
            {categories.map((cat, i) => (
              <div key={i} className="mb-6">
                <div className="font-display text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-3 py-1.5 mb-1.5">
                  {cat.name}
                </div>
                <ul className="list-none space-y-1">
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] transition-colors leading-snug cursor-pointer ${
                          activeSection === item.id
                            ? 'text-vtn-red bg-vtn-red/10 font-semibold'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 font-medium'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span
                          className={`font-mono text-[11px] font-semibold min-w-[18px] ${
                            activeSection === item.id ? 'text-vtn-red' : 'text-gray-400'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Center Content Pane (All Markdown Files Rendered on One Page) */}
          <main
            className="flex-1 max-w-[860px] px-5 sm:px-10 lg:px-12 py-10 pb-32 break-words"
            onClick={handleContentClick}
          >
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="doc-section pb-12 mb-12 border-b border-gray-200 last:border-b-0">
                <div dangerouslySetInnerHTML={{ __html: sec.htmlContent }} />
              </section>
            ))}
          </main>

          {/* Right Table of Contents Pane */}
          <aside className="hidden xl:block w-[240px] h-[calc(100vh-68px)] sticky top-[68px] overflow-y-auto px-5 py-9 shrink-0">
            <div className="font-display text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-3">
              On this page
            </div>
            <ul className="list-none space-y-1">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className={`text-[12.5px] block py-1.5 pl-2.5 border-l-2 transition-colors leading-snug ${
                      activeSection === sec.id
                        ? 'text-vtn-red border-vtn-red font-semibold'
                        : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {sec.num}. {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fadeIn"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-[95vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/70 hover:bg-vtn-red text-white w-9 h-9 rounded-full flex items-center justify-center text-xl transition-colors cursor-pointer"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image zoom"
            >
              &times;
            </button>
            <img src={lightboxImg.src} alt={lightboxImg.alt} className="w-full max-h-[85vh] object-contain block" />
          </div>
        </div>
      )}
    </div>
  );
}
