// ── Loader dismiss ────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1400);
});

// ── Dynamic year ──────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Staggered card reveal on scroll (IntersectionObserver) ───
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = Array.from(cards).indexOf(card) * 150;
      setTimeout(() => {
        card.classList.add('card-animate', 'visible');
      }, delay);
      observer.unobserve(card);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));

// ── Card tilt on mouse move ───────────────────────────────────
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    const rotX  = -dy * 4;
    const rotY  =  dx * 4;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
