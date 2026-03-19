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

// ── Long press bypass for Maintenance cards ──────────────────────
const maintenanceBtns = document.querySelectorAll('.btn-maintenance[data-bypass]');

maintenanceBtns.forEach(btn => {
  let pressTimer;
  let isLongPress = false;

  const startPress = (e) => {
    if (e.type === 'mousedown' && e.button !== 0) return; // Only left click
    const bypassUrl = btn.getAttribute('data-bypass');
    if (!bypassUrl) return;

    isLongPress = false;
    pressTimer = setTimeout(() => {
      isLongPress = true;
      window.open(bypassUrl, '_blank');
    }, 1000); // 1-second long press to bypass
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  btn.addEventListener('touchstart', startPress, { passive: true });
  btn.addEventListener('touchend', cancelPress);
  btn.addEventListener('touchcancel', cancelPress);
  
  btn.addEventListener('mousedown', startPress);
  btn.addEventListener('mouseup', cancelPress);
  btn.addEventListener('mouseleave', cancelPress);

  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Maintenance buttons normally do nothing
  });

  btn.addEventListener('contextmenu', (e) => {
    // We prevent default context menu so it doesn't interrupt long press on mobile
    e.preventDefault();
  });
});
