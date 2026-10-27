// Load a shared HTML component into the element with the given id
async function loadComponent(id, url) {
  const host = document.getElementById(id);
  if (!host) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    host.innerHTML = await res.text();
    return host;
  } catch (err) {
    console.error(`Could not load ${url}:`, err);
    return null;
  }
}

// Highlight the nav link that matches the current page
function markActiveLink(host) {
  if (!host) return;
  const current = location.pathname.split('/').pop() || 'index.html';
  host.querySelectorAll('.nav__link').forEach((link) => {
    const target = link.getAttribute('href').split('#')[0];
    link.classList.toggle('nav__link--active', target === current);
  });
  // service pages sit under the Services menu
  if (document.body.dataset.section === 'services') {
    const services = host.querySelector('.has-mega > .nav__link');
    if (services) services.classList.add('nav__link--active');
  }
}

loadComponent('navbar', 'components/navbar.html').then(markActiveLink);
loadComponent('footer', 'components/footer.html').then((host) => {
  const year = host && host.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
});

// Smooth-scroll for in-page anchor links (delegated so it covers loaded components)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (id === '#') { e.preventDefault(); return; } // placeholder links (e.g. Services opens the mega menu on hover)
  const target = id.length > 1 ? document.querySelector(id) : null;
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
});

// ---------- Interactions ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header gets a frosted background once the page scrolls
function updateHeader() {
  const header = document.querySelector('.header');
  if (header) header.classList.toggle('header--scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('load', updateHeader);

// Reveal blocks as they scroll into view (staggered inside each group)
const REVEAL = '.founder__photo, .founder__body, .services--showcase .card, .section__head, .trust__head, .trust__stats li, .marquee, .project, .service-card, .step, .authority__media, .authority__body, .dash, .quote, .faq__item, .final-cta__card, .section__action';
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      // drop the stagger delay once revealed so hover effects respond instantly
      setTimeout(() => el.style.setProperty('--reveal-delay', '0ms'), parseInt(el.style.getPropertyValue('--reveal-delay'), 10) + 700);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll(REVEAL).forEach((el) => {
    const siblings = [...el.parentElement.children].filter((n) => n.matches(REVEAL));
    el.style.setProperty('--reveal-delay', `${Math.max(siblings.indexOf(el), 0) * 90}ms`);
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Count-up numbers (e.g. 13+)
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  el.textContent = `0${suffix}`;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  io.observe(el);
});

// FAQ: keep one answer open at a time
document.querySelectorAll('.faq__item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq__item[open]').forEach((other) => { if (other !== item) other.open = false; });
  });
});
