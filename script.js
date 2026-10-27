/* ============================================================
   NyxLog — interações do site
   ============================================================ */

/* Header muda ao rolar */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Menu mobile */
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

const backdrop = document.createElement('div');
backdrop.className = 'nav-backdrop';
document.body.appendChild(backdrop);

const openMenu = () => {
  nav.classList.add('open');
  toggle.classList.add('active');
  backdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  backdrop.classList.remove('show');
  document.body.style.overflow = '';
};

toggle.addEventListener('click', () =>
  nav.classList.contains('open') ? closeMenu() : openMenu()
);
backdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* Reveal on scroll — marca seções e filhos diretos */
const revealTargets = [];
document.querySelectorAll('.section, .stats, .cta, .fiscal').forEach(sec => {
  const kids = sec.querySelectorAll(
    '.pillar, .feature, .step, .integra-card, .fiscal-card, .fin-item, .fin-visual, .section-head, .why-copy, .why-visual, .stat, .cta-inner'
  );
  (kids.length ? kids : [sec]).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealTargets.push(el);
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(t => io.observe(t));

/* Contadores animados */
const counters = document.querySelectorAll('.stat-num');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countIO.observe(c));

/* Ano no rodapé */
document.getElementById('year').textContent = new Date().getFullYear();
