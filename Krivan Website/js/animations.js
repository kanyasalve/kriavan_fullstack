/* ==========================================================================
   KRIVAN INDUSTRIES PVT. LTD. - Animations & 3D Interactive Controller
   Handles Vanilla JS Mouse Tilt, IntersectionObserver Scroll Reveals & Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  init3DTiltCards();
  initCounterAnimations();
});

/* 1. IntersectionObserver for Smooth Scroll Reveal */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* 2. Lightweight Vanilla JS 3D Perspective Card Tilt */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-3d, .product-card, .hero-3d-card');
  
  // Disable 3D mouse tracking on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

function handleMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
  const rotateY = ((x - centerX) / centerX) * 6;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function handleMouseLeave(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease';
}

/* 3. Number Counter Animation for Verified Key Statistics */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const duration = 1500;
        const start = 0;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        let current = start;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.ceil(current);
          }
        }, stepTime);

        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
