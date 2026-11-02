/* =========================================================
   Portfolio interactions (no libraries, works on GitHub Pages)
   Shared by index.html and project.html — every block checks
   that its elements exist before running.
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Footer year ---------- */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (saved in localStorage) ---------- */
  const themeBtn = $('.theme-toggle');
  themeBtn?.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  const navLinks = $('.nav-links');
  const setMenu = open => {
    navLinks?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn?.addEventListener('click', e => { e.stopPropagation(); setMenu(!navLinks.classList.contains('open')); });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', e => { if (navLinks?.classList.contains('open') && !navLinks.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Scroll: progress bar, nav shadow, back-to-top ---------- */
  const progress = $('.scroll-progress');
  const navWrap = $('.nav-wrap');
  const toTop = $('.to-top');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    navWrap?.classList.toggle('scrolled', y > 10);
    toTop?.classList.toggle('show', y > 700);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Active nav link (scrollspy) ---------- */
  const sections = $$('main section[id]');
  const linkFor = id => $('.nav-links a[href="#' + id + '"]');
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('.nav-links a.active').forEach(a => a.classList.remove('active'));
        linkFor(en.target.id)?.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Typing effect in hero ---------- */
  const typed = $('.typed');
  if (typed && !reduceMotion) {
    let words = [];
    try { words = JSON.parse(typed.dataset.words); } catch (e) {}
    let w = 0, c = words[0] ? words[0].length : 0, deleting = true;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 40 : 75;
      if (!deleting && c === word.length) { deleting = true; delay = 2000; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    if (words.length > 1) setTimeout(tick, 2600);
  }

  /* ---------- Projects: cards + filters ---------- */
  const projectsRoot = $('#projects-root');
  const filtersEl = $('.filters');
  let applyFilter = null;

  if (projectsRoot && window.PROJECTS) {
    const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

    const cards = PROJECTS.map((p, i) => {
      const a = document.createElement('a');
      a.className = 'project-card has-thumb spotlight';
      a.href = 'project.html?id=' + encodeURIComponent(p.id);
      a.dataset.group = p.group;
      a.dataset.tags = p.tags.join('|').toLowerCase();
      a.innerHTML =
        (i === 0 ? '<span class="featured-badge">FEATURED</span>' : '') +
        '<div class="project-thumb' + (p.fit === 'contain' ? ' contain' : '') + '">' +
          '<img loading="lazy" alt="' + esc(p.title) + ' preview" src="assets/projects/' + esc(p.id) + '/' + esc(p.cover) + '">' +
        '</div>' +
        '<div class="project-body">' +
          '<p class="project-type">' + esc(p.type) + '</p>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p class="project-desc">' + esc(p.summary) + '</p>' +
          '<div class="tags">' + p.tags.map(t => '<span>' + esc(t) + '</span>').join('') + '</div>' +
          '<span class="project-more">View project details <i>→</i></span>' +
        '</div>';
      const img = $('img', a);
      img.onerror = () => { img.parentElement.innerHTML = '<div class="thumb-fallback">' + esc(p.title) + '<small>' + esc(p.type) + '</small></div>'; };
      return a;
    });

    const groups = [...new Set(PROJECTS.map(p => p.group))];

    const render = (predicate, opts = {}) => {
      const visible = cards.filter(predicate);
      const go = () => {
        projectsRoot.innerHTML = '';
        visible.forEach((card, i) => {
          card.classList.remove('is-hiding', 'large', 'is-entering');
          // The first card is shown wide when viewing everything, or when it is alone
          if ((opts.featureFirst && i === 0) || visible.length === 1) card.classList.add('large');
          card.style.setProperty('--i', i);
          void card.offsetWidth; // restart animation
          card.classList.add('is-entering');
          projectsRoot.appendChild(card);
        });
        if (!visible.length) projectsRoot.innerHTML = '<p class="empty-note">No projects match this filter yet.</p>';
        // highlight the matching tag on each card
        $$('.tags span', projectsRoot).forEach(s => s.classList.toggle('hit', !!opts.tag && s.textContent.toLowerCase().includes(opts.tag)));
      };
      const current = $$('.project-card', projectsRoot);
      if (!current.length || reduceMotion) return go();
      current.forEach(c => c.classList.add('is-hiding'));
      setTimeout(go, 220);
    };

    const setSelected = btn => $$('.filter-btn', filtersEl).forEach(b => b.setAttribute('aria-selected', String(b === btn)));

    const makeBtn = (label, count, onClick, extraClass) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (extraClass ? ' ' + extraClass : '');
      b.setAttribute('role', 'tab');
      b.innerHTML = esc(label) + (count != null ? '<span class="count">' + count + '</span>' : '');
      b.addEventListener('click', () => { setSelected(b); onClick(); });
      filtersEl?.appendChild(b);
      return b;
    };

    const allBtn = makeBtn('All', PROJECTS.length, () => { removeTagBtn(); render(() => true, { featureFirst: true }); });
    groups.forEach(g => makeBtn(g, PROJECTS.filter(p => p.group === g).length, () => { removeTagBtn(); render(c => c.dataset.group === g); }));

    // Temporary "tag" filter (used when a skill chip is clicked)
    let tagBtn = null;
    const removeTagBtn = () => { tagBtn?.remove(); tagBtn = null; };
    applyFilter = (tag, label) => {
      removeTagBtn();
      const t = tag.toLowerCase();
      tagBtn = makeBtn('Using ' + label + '  ✕', null, () => { allBtn.click(); }, 'tag-filter');
      setSelected(tagBtn);
      render(c => c.dataset.tags.split('|').some(x => x.includes(t)), { tag: t });
    };

    setSelected(allBtn);
    render(() => true, { featureFirst: true });
  }

  /* ---------- Skill chips → linked to projects ---------- */
  if (window.PROJECTS && $('.chips')) {
    $$('.chips span').forEach(span => {
      const name = span.textContent.trim();
      const key = name.toLowerCase();
      const used = PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(key)));
      if (!used.length) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = name;
      b.title = 'Used in: ' + used.map(p => p.title).join(', ');
      b.addEventListener('click', () => {
        if (applyFilter) {
          applyFilter(key, name);
          $('#projects').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
      span.replaceWith(b);
    });
  }

  /* ---------- Cursor spotlight + gentle 3D tilt on cards ---------- */
  if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', e => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      if (card.classList.contains('has-thumb') && !card.classList.contains('large')) {
        card.style.setProperty('--ry', ((x / r.width) - .5) * 6 + 'deg');
        card.style.setProperty('--rx', ((y / r.height) - .5) * -6 + 'deg');
      }
    });
    document.addEventListener('pointerout', e => {
      const card = e.target.closest?.('.spotlight');
      if (card && !card.contains(e.relatedTarget)) { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
    });

    // "Magnetic" buttons drift slightly toward the cursor
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * .18 + 'px,' + (e.clientY - r.top - r.height / 2) * .3 + 'px)';
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Scroll-reveal ---------- */
  const revealGroups = [
    ['.section-kicker, .section-title, .section-subtitle, .section-intro', 'up', false],
    ['.research-card', 'up', true],
    ['.stat', 'zoom', true],
    ['.skill-box', 'up', true],
    ['.timeline-item', 'left', true],
    ['.certificate-card', 'zoom', true],
    ['.contact-links a, .copy-email', 'up', true],
    ['.filters', 'up', false],
    ['.pd-hero, .pd h1, .pd h2, .pd > p, .pd-highlights li, .pd-gallery figure, .pd-actions, .pd-nav', 'up', false]
  ];
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealGroups.forEach(([sel, kind, stagger]) => {
      $$(sel).forEach(el => {
        el.setAttribute('data-reveal', kind);
        if (stagger) el.style.setProperty('--stagger', Array.from(el.parentElement.children).indexOf(el) % 6);
      });
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        // once visible, release the element so hover transforms work normally
        setTimeout(() => { el.removeAttribute('data-reveal'); el.style.removeProperty('--stagger'); }, 1400);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
    // timeline line also needs .in
    $$('.timeline-item').forEach(el => io.observe(el));
  } else {
    $$('.timeline-item').forEach(el => el.classList.add('in'));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$('.stat strong');
  counters.forEach(el => {
    const src = el.dataset.countFrom;
    let target = Number(el.dataset.count || el.textContent) || 0;
    if (src === 'projects') target = window.PROJECTS ? PROJECTS.length : 0;
    else if (src) target = $$(src).length;
    el.dataset.target = target;
    el.textContent = el.hasAttribute('data-plain') ? target : '0';
  });
  const runCounter = el => {
    const target = +el.dataset.target;
    if (el.hasAttribute('data-plain') || reduceMotion) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
    }), { threshold: .6 });
    counters.forEach(el => cio.observe(el));
  } else counters.forEach(runCounter);

  /* ---------- Toast ---------- */
  const toastEl = $('.toast');
  let toastTimer;
  const toast = msg => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  };

  /* ---------- Copy email ---------- */
  $$('.copy-email').forEach(btn => btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      toast('Email copied to clipboard ✓');
      const hint = $('.copy-hint', btn);
      if (hint) { hint.textContent = 'Copied!'; setTimeout(() => (hint.textContent = 'Click to copy'), 2000); }
    } catch (e) {
      location.href = 'mailto:' + email;
    }
  }));

  /* ---------- Lightbox with gallery navigation ---------- */
  // items: [{src, alt}], index: which one to show first
  window.openLightbox = function (items, index) {
    if (typeof items === 'string') { items = [{ src: items, alt: typeof index === 'string' ? index : '' }]; index = 0; }
    let i = index || 0;
    const opener = document.activeElement;
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    const many = items.length > 1;
    box.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close">✕</button>' +
      (many ? '<button class="lb-btn lb-prev" type="button" aria-label="Previous">←</button>' +
              '<button class="lb-btn lb-next" type="button" aria-label="Next">→</button>' +
              '<span class="lb-count"></span>' : '');
    const img = $('img', box), cap = $('figcaption', box), count = $('.lb-count', box);
    const show = n => {
      i = (n + items.length) % items.length;
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
      img.src = items[i].src; img.alt = items[i].alt || '';
      cap.textContent = items[i].alt || '';
      if (count) count.textContent = (i + 1) + ' / ' + items.length;
    };
    const close = () => {
      box.remove();
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
    const onKey = e => {
      if (e.key === 'Escape') close();
      else if (many && e.key === 'ArrowRight') show(i + 1);
      else if (many && e.key === 'ArrowLeft') show(i - 1);
    };
    box.addEventListener('click', e => { if (e.target === box || e.target.tagName === 'FIGURE') close(); });
    $('.lb-close', box).addEventListener('click', close);
    $('.lb-prev', box)?.addEventListener('click', () => show(i - 1));
    $('.lb-next', box)?.addEventListener('click', () => show(i + 1));
    // swipe on touch screens
    let sx = null;
    box.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
      if (sx === null || !many) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
      sx = null;
    });
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    document.body.appendChild(box);
    show(i);
    $('.lb-close', box).focus();
  };

  // Links marked data-lightbox="groupName" open as a browsable gallery
  $$('[data-lightbox]').forEach(a => {
    a.addEventListener('click', e => {
      const img = $('img', a);
      if (!img || !img.isConnected) return; // image missing: fall back to opening the link
      e.preventDefault();
      const group = $$('[data-lightbox="' + a.dataset.lightbox + '"]').filter(x => $('img', x));
      const items = group.map(x => ({ src: $('img', x).src, alt: ($('strong', x)?.textContent) || $('img', x).alt }));
      window.openLightbox(items, group.indexOf(a));
    });
  });
})();
