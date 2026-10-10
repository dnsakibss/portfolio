const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
const yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();

// ---- Project cards ----
(function () {
  const root = document.getElementById('projects-root');
  if (!root || !window.PROJECTS) return;
  const groups = {};
  PROJECTS.forEach(p => (groups[p.group] = groups[p.group] || []).push(p));
  Object.keys(groups).forEach(name => {
    const wrap = document.createElement('div');
    wrap.className = 'project-group';
    wrap.innerHTML = '<h3 class="group-title"></h3><div class="project-grid"></div>';
    wrap.querySelector('.group-title').textContent = name;
    const grid = wrap.querySelector('.project-grid');
    groups[name].forEach((p, i) => {
      const a = document.createElement('a');
      a.className = 'project-card has-thumb' + (groups[name].length === 1 ? ' large' : '');
      a.href = 'project.html?id=' + encodeURIComponent(p.id);
      a.innerHTML =
        '<div class="project-thumb' + (p.fit === 'contain' ? ' contain' : '') + '"><img loading="lazy" alt=""></div>' +
        '<div class="project-body"><p class="project-type"></p><h3></h3><p class="project-desc"></p><div class="tags"></div>' +
        '<span class="project-more">View project details →</span></div>';
      const img = a.querySelector('img');
      img.alt = p.title + ' preview';
      img.src = 'assets/projects/' + p.id + '/' + p.cover;
      img.onerror = () => { img.parentElement.textContent = p.type; };
      a.querySelector('.project-type').textContent = p.type;
      a.querySelector('h3').textContent = p.title;
      a.querySelector('.project-desc').textContent = p.summary;
      p.tags.forEach(t => { const s = document.createElement('span'); s.textContent = t; a.querySelector('.tags').appendChild(s); });
      grid.appendChild(a);
    });
    root.appendChild(wrap);
  });
})();

// ---- Click-to-enlarge for certificates and gallery images ----
function openLightbox(src, alt) {
  const box = document.createElement('div');
  box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Image viewer');
  const img = document.createElement('img'); img.src = src; img.alt = alt || '';
  box.appendChild(img);
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  box.addEventListener('click', close); document.addEventListener('keydown', onKey);
  document.body.appendChild(box);
}
document.querySelectorAll('[data-lightbox]').forEach(a => {
  a.addEventListener('click', e => {
    const img = a.querySelector('img');
    if (img && img.isConnected) { e.preventDefault(); openLightbox(img.src, img.alt); }
  });
});
