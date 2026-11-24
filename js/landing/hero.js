/**
 * landing/hero.js
 * Animasi dan interaktivitas untuk Hero Section.
 * - Counter animasi pada badge statistik
 * - Smooth scroll untuk tombol "Pelajari Fitur & Demo"
 */

function animateCounter(el, target, suffix = '', duration = 1600) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (ease * target).toFixed(1)
      : Math.floor(ease * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initHeroCounters() {
  const counters = [
    { selector: '[data-counter="accuracy"]', target: 98.2, suffix: '%' },
    { selector: '[data-counter="poktan"]', target: 12, suffix: '' },  // parent HTML already has "+" text
    { selector: '[data-counter="savings"]', target: 34, suffix: '' }, // parent HTML already has "%" text
  ];

  counters.forEach(({ selector, target, suffix }) => {
    const el = document.querySelector(selector);
    if (el) animateCounter(el, target, suffix);
  });
}

function initHeroSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Jalankan saat counter masuk viewport (IntersectionObserver)
function initHero() {
  const badges = document.querySelector('[data-hero-stats]');
  if (!badges) {
    // Fallback: langsung animasi jika marker tidak ada
    initHeroCounters();
  } else {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          initHeroCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(badges);
  }
  initHeroSmoothScroll();
}

document.addEventListener('DOMContentLoaded', initHero);
