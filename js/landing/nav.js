/**
 * landing/nav.js
 * Perilaku navigasi landing page:
 * - Highlight link aktif saat scroll melewati section (pill shape via main.css)
 * - Toggle menu mobile (hamburger)
 * - Tambah shadow pada header saat scroll
 */

function initLandingNav() {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a[href*="#"]');

  // Shadow on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-md', window.scrollY > 10);
    }, { passive: true });
  }

  // Fungsi set link aktif
  function setActive(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const isMatch = href.endsWith('#' + id);
      link.classList.toggle('active', isMatch);
    });
    // Juga sync mobile menu
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href.endsWith('#' + id));
    });
  }

  // Active link on scroll via IntersectionObserver
  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
  }

  // Mobile hamburger toggle
  const hamburger = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      // Swap icon
      const icon = hamburger.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isOpen ? 'menu' : 'close';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initLandingNav);
