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
  const target = id.length > 1 ? document.querySelector(id) : null;
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
});
