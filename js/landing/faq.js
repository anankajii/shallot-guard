/**
 * landing/faq.js
 * Accordion interactivity untuk seksi FAQ di halaman landing.
 */

function toggleFaq(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');
  if (!el || !icon) return;

  const isHidden = el.classList.contains('hidden');
  // Tutup semua FAQ lain dulu
  document.querySelectorAll('[id^="faq-"]:not([id$="-icon"])').forEach(panel => {
    if (panel.id !== id) {
      panel.classList.add('hidden');
      const otherIcon = document.getElementById(panel.id + '-icon');
      if (otherIcon) otherIcon.classList.remove('rotate-180');
    }
  });

  if (isHidden) {
    el.classList.remove('hidden');
    icon.classList.add('rotate-180');
  } else {
    el.classList.add('hidden');
    icon.classList.remove('rotate-180');
  }
}

// Ekspor global agar bisa dipanggil dari onclick HTML
window.toggleFaq = toggleFaq;
