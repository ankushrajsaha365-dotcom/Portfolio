// main.js — Portfolio interactivity
// All content is read from data.js; this file is layout/behaviour only.

import { meta, projects, skills, topics, certificates, social } from './data.js';

// ================================================================
// HELPERS
// ================================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const textColor = (token) => `text-${token}`;
const dotColor  = (token) => `bg-${token}`;

// ================================================================
// THEME TOGGLE
// ================================================================
const htmlEl    = document.documentElement;
const themeIcon = $('#theme-icon');

function applyTheme(theme) {
  if (theme === 'light') {
    htmlEl.classList.remove('dark');
    htmlEl.classList.add('light');
    themeIcon.textContent = 'dark_mode';
  } else {
    htmlEl.classList.remove('light');
    htmlEl.classList.add('dark');
    themeIcon.textContent = 'light_mode';
  }
}

$('#theme-toggle').addEventListener('click', () => {
  const isDark = htmlEl.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

applyTheme(localStorage.getItem('theme') || 'dark');

// ================================================================
// MOBILE MENU
// ================================================================
const mobileMenuBtn = $('#mobile-menu-btn');
const mobileMenu    = $('#mobile-menu');
const hamburgerIcon = $('#hamburger-icon');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('menu-open');
  mobileMenu.classList.toggle('menu-open', !isOpen);
  hamburgerIcon.textContent = isOpen ? 'menu' : 'close';
  mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
});

$$('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('menu-open');
    hamburgerIcon.textContent = 'menu';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ================================================================
// STICKY NAV — ACTIVE SECTION HIGHLIGHT (IntersectionObserver)
// ================================================================
const navLinks = $$('#desktop-nav a[data-section]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.dataset.section === id;
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
        link.classList.toggle('bg-surface-container-high', isActive);
        link.classList.toggle('text-primary', isActive);
        link.classList.toggle('text-on-surface-variant', !isActive);
      });
    }
  });
}, { rootMargin: '-50% 0px -45% 0px' });

['featured-projects', 'skills', 'interests', 'certificates', 'connect'].forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ================================================================
// BACK TO TOP
// ================================================================
const backToTop = $('#back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

// ================================================================
// EMAIL COPY
// ================================================================
$('#copy-email-btn').addEventListener('click', () => {
  navigator.clipboard.writeText(meta.email).then(() => {
    const label = $('#copy-label');
    label.textContent = 'Copied!';
    setTimeout(() => label.textContent = 'Copy Address', 2000);
  });
});

// ================================================================
// POPULATE META (hero, footer, nav)
// All fields in meta are optional — missing ones hide the element.
// ================================================================
function populateMeta() {
  // Safe setter — skips if text is falsy or element doesn't exist
  const setT = (id, text) => {
    if (!text) return;
    const el = $(id);
    if (el) el.textContent = text;
  };
  // Hides the nearest ancestor that has a class attribute
  const hide = (id) => {
    const el = $(id);
    if (el) el.classList.add('hidden');
  };

  // ── Nav logo ─────────────────────────────────────────────
  const initials = meta.initials
    || (meta.name ? meta.name.split(' ').map(w => w[0]).join('') : '');
  setT('#nav-logo-text', meta.name ? `${meta.name.toUpperCase()} // ${initials}` : '');

  // ── Nav availability badge ────────────────────────────────
  if (meta.availabilityLabel) {
    setT('#nav-availability-label', meta.availabilityLabel);
  } else {
    // Hide the pill container
    const pill = $('#nav-availability-label')?.parentElement;
    if (pill) pill.classList.add('!hidden');
  }

  // ── Hero ─────────────────────────────────────────────────
  setT('#hero-name', meta.name);
  setT('#hero-title', meta.title);
  setT('#hero-tagline', meta.tagline);

  if (meta.heroAvailabilityLabel) {
    setT('#hero-availability-label', meta.heroAvailabilityLabel);
  } else {
    const badge = $('#hero-availability-label')?.closest('div');
    if (badge) badge.classList.add('hidden');
  }

  if (meta.location && meta.timezone) {
    setT('#hero-location', `LOC // ${meta.location} [${meta.timezone}]`);
  } else {
    hide('#hero-location');
  }

  if (meta.coordinates) {
    setT('#hero-coordinates', meta.coordinates);
  } else {
    hide('#hero-coordinates');
  }

  if (meta.systemStatus) {
    const statusEl = $('#hero-system-status span:last-child');
    if (statusEl) statusEl.textContent = meta.systemStatus;
  } else {
    hide('#hero-system-status');
  }

  // ── Contact ───────────────────────────────────────────────
  setT('#email-address-text', meta.email);

  const scheduleLink = $('#schedule-call-link');
  if (scheduleLink) scheduleLink.href = meta.scheduleUrl || '#connect';

  // ── Footer ────────────────────────────────────────────────
  setT('#footer-copy', meta.footerCopy);
  setT('#footer-stack', meta.footerStack);
  if (meta.footerTechLabel) {
    setT('#footer-tech', meta.footerTechLabel);
  } else {
    hide('#footer-tech');
  }

  // ── Nav icon links (from social array) ───────────────────
  const navGithub   = social.find(s => s.label === 'GitHub');
  const navLinkedin = social.find(s => s.label === 'LinkedIn');
  if (navGithub)   { const a = $('#nav-github-link');   if (a) a.href = navGithub.url; }
  if (navLinkedin) { const a = $('#nav-linkedin-link'); if (a) a.href = navLinkedin.url; }
}

// ================================================================
// RENDER — PROJECT CARDS
// ================================================================
function renderProjectCards() {
  const grid = $('#projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, idx) => {
    const tagsHtml = p.tags.map(t =>
      `<span class="font-label-tag text-label-tag px-2 py-1 rounded bg-surface-container-high ${textColor(t.color)}">${t.label}</span>`
    ).join('');

    const dotColors = ['bg-error/70', 'bg-secondary-container', 'bg-secondary'];
    const dotHtml = dotColors.map(c => `<span class="w-2.5 h-2.5 rounded-full ${c}"></span>`).join('');

    return `
    <article class="project-card group relative flex flex-col justify-between rounded-xl bg-surface-container hover:bg-surface-container-high transition-all duration-300 shadow-xl overflow-hidden hover:-translate-y-1 cursor-pointer"
             data-project-id="${p.id}" data-project-index="${idx}" tabindex="0" role="button"
             aria-label="View case study for ${p.title}">
      <!-- Browser mockup -->
      <div class="p-space-lg pb-0">
        <div class="w-full rounded-lg bg-surface-container-lowest overflow-hidden shadow-inner">
          <div class="flex items-center justify-between px-space-md py-2 bg-surface-container-low">
            <div class="flex items-center gap-1.5">${dotHtml}</div>
            <span class="font-caption-meta text-caption-meta text-on-surface-variant">${p.browserUrl}</span>
            <span class="font-label-tag text-label-tag ${textColor(p.metricColor)}">${p.metric}</span>
          </div>
          <div class="relative h-44 w-full bg-surface-container-lowest overflow-hidden">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                 src="${p.previewImage}" alt="${p.title} project preview" loading="lazy"/>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
      <!-- Card body -->
      <div class="p-space-lg flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-space-xs">
            <h3 class="font-title-card text-title-card text-primary group-hover:text-primary-container transition-colors">${p.title}</h3>
            <span class="font-caption-meta text-caption-meta ${textColor(p.statusColor)} font-medium">${p.status}</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md">${p.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-space-lg">${tagsHtml}</div>
        </div>
        <div class="pt-space-sm">
          <div class="flex items-center justify-between gap-space-sm mb-space-xs">
            <a class="card-action-btn flex-1 inline-flex items-center justify-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-code-inline text-code-inline transition-colors"
               href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="View ${p.title} on GitHub">
              <span class="material-symbols-outlined text-[18px]">terminal</span>
              <span>GitHub</span>
            </a>
            <a class="card-action-btn flex-1 inline-flex items-center justify-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary-fixed-dim font-code-inline text-code-inline font-semibold transition-all"
               href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="View live demo of ${p.title}">
              <span>Live Demo</span>
              <span class="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
          </div>
          <button class="card-case-btn inline-flex items-center gap-1 font-caption-meta text-caption-meta text-outline hover:text-primary-container transition-colors mt-space-xs w-full text-left">
            <span>Click card for case study</span>
            <span class="material-symbols-outlined text-[12px]">arrow_right_alt</span>
          </button>
        </div>
      </div>
    </article>`;
  }).join('');

  // Card click / keyboard events
  $$('.project-card').forEach(card => {
    const openDrawer = () => openProjectDrawer(parseInt(card.dataset.projectIndex));

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.card-action-btn')) openDrawer();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(); }
    });

    $$('.card-action-btn', card).forEach(btn => {
      btn.addEventListener('click', e => e.stopPropagation());
    });

    // Radial glow
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// ================================================================
// RENDER — SKILLS
// ================================================================
function renderSkills() {
  const grid = $('#skills-grid');
  if (!grid) return;

  grid.innerHTML = skills.map(s => {
    const itemsHtml = s.items.map(item => `
      <div class="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-high text-primary font-code-inline text-body-sm shadow-sm hover:${textColor(s.hoverColor)} transition-colors">
        <span class="w-1.5 h-1.5 rounded-full ${dotColor(item.dot)}"></span>
        <span>${item.label}</span>
      </div>`).join('');

    return `
    <div class="p-space-lg rounded-xl bg-surface-container shadow-lg flex flex-col justify-between hover:bg-surface-container-high transition-colors">
      <div>
        <div class="flex items-center justify-between mb-space-md">
          <div class="flex items-center gap-space-xs">
            <span class="material-symbols-outlined ${textColor(s.iconColor)} text-[24px]">${s.icon}</span>
            <h3 class="font-title-card text-title-card text-primary">${s.category}</h3>
          </div>
          <span class="font-caption-meta text-caption-meta text-outline">${s.count}</span>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">${s.description}</p>
      </div>
      <div class="flex flex-wrap gap-space-xs">${itemsHtml}</div>
    </div>`;
  }).join('');
}

// ================================================================
// RENDER — TOPICS
// ================================================================
function renderTopics() {
  const grid = $('#topics-grid');
  if (!grid) return;

  grid.innerHTML = topics.map(t => `
    <div class="group relative p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
      <div class="topic-accent-bar h-1 rounded-full ${dotColor(t.accentColor)} mb-space-md group-hover:w-full"></div>
      <div>
        <span class="material-symbols-outlined ${textColor(t.iconColor)} text-[28px] mb-space-sm block">${t.icon}</span>
        <h3 class="font-title-card text-title-card text-primary mb-space-xs">${t.title}</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${t.body}</p>
      </div>
      <div class="mt-space-lg pt-space-sm font-caption-meta text-caption-meta text-outline flex items-center justify-between">
        <span>${t.fieldSpec}</span>
        <span class="material-symbols-outlined text-[16px] ${textColor(t.iconColor)}">arrow_outward</span>
      </div>
    </div>`).join('');
}

// ================================================================
// RENDER — CERTIFICATES
// ================================================================
function renderCertificates() {
  const grid = $('#certs-grid');
  if (!grid) return;

  grid.innerHTML = certificates.map((c, i) => `
    <div class="relative p-space-lg rounded-xl bg-surface-container shadow-lg flex flex-col justify-between hover:bg-surface-container-high transition-all duration-300">
      <div>
        <div class="flex items-center justify-between mb-space-md">
          <div class="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center ${textColor(c.iconColor)} shadow-inner">
            <span class="material-symbols-outlined text-[26px]">${c.icon}</span>
          </div>
          <button class="cert-preview-btn flex items-center gap-1 px-space-xs py-1 rounded bg-surface-container-high text-primary-fixed-dim hover:text-primary font-caption-meta text-caption-meta transition-colors"
                  data-cert-index="${i}" title="Preview certificate">
            <span class="material-symbols-outlined text-[14px]">zoom_in</span>
            <span>Preview</span>
          </button>
        </div>
        <h3 class="font-title-card text-title-card text-primary mb-1">${c.title}</h3>
        <p class="font-caption-meta text-caption-meta text-secondary font-medium mb-space-sm">${c.issuer}</p>
        <div class="space-y-1 mb-space-md">
          <p class="font-caption-meta text-caption-meta text-on-surface-variant">Issued: ${c.issued} · ${c.expires === 'Lifetime' ? 'Lifetime' : 'Exp: ' + c.expires}</p>
          <p class="font-code-inline text-caption-meta text-outline truncate">ID: ${c.credentialId}</p>
        </div>
      </div>
      <div class="pt-space-sm flex items-center justify-between">
        <span class="inline-flex items-center gap-1 font-caption-meta text-caption-meta text-secondary">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          ${c.status}
        </span>
        <a href="${c.verifyUrl}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-1 font-code-inline text-caption-meta text-primary-container hover:text-primary transition-colors font-medium">
          <span>Verify</span>
          <span class="material-symbols-outlined text-[14px]">verified</span>
        </a>
      </div>
    </div>`).join('');

  $$('.cert-preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cert = certificates[parseInt(btn.dataset.certIndex)];
      openCertLightbox(cert);
    });
  });
}

// ================================================================
// RENDER — SOCIAL LINKS
// ================================================================
function renderSocial() {
  const container = $('#social-links');
  if (!container) return;

  container.innerHTML = social.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer"
       class="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-code-inline text-body-sm transition-colors shadow-sm">
      <span class="material-symbols-outlined ${textColor(s.iconColor)} text-[18px]">${s.icon}</span>
      <span>${s.label}</span>
    </a>`).join('');
}

// ================================================================
// PROJECT DRAWER
// ================================================================
let drawerCurrentIndex = -1;
const drawer          = $('#project-drawer');
const drawerBackdrop  = $('#drawer-backdrop');
const drawerContent   = $('#drawer-content');
const drawerClose     = $('#drawer-close');
const drawerPrev      = $('#drawer-prev');
const drawerNext      = $('#drawer-next');
const drawerCaseLabel = $('#drawer-case-label');

function buildCarousel(images) {
  if (!images || images.length === 0) return '';
  const thumbs = images.map((img, i) => `
    <button class="thumb-btn${i === 0 ? ' thumb-active' : ''} h-16 sm:h-20 rounded-lg overflow-hidden relative bg-surface-container-high transition-all"
            data-thumb-index="${i}">
      <img class="w-full h-full object-cover" src="${img.src}" alt="${img.alt}" loading="lazy"/>
      <span class="absolute bottom-1 left-1 bg-surface-container-lowest/90 px-1 rounded font-caption-meta text-[9px] ${i === 0 ? 'text-primary' : 'text-on-surface-variant'}">${img.label}</span>
    </button>`).join('');

  return `
    <div class="flex flex-col gap-space-sm bg-surface-container-lowest p-space-sm sm:p-space-md rounded-xl" id="carousel-container">
      <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-surface group">
        <img id="carousel-main-img" class="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.01]"
             src="${images[0].src}" alt="${images[0].alt}"/>
        <div id="carousel-badge" class="absolute top-space-md left-space-md bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-1 rounded flex items-center gap-space-xs shadow-md">
          <span class="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
          <span class="font-caption-meta text-caption-meta text-primary uppercase" id="carousel-badge-text"></span>
        </div>
        <div class="absolute top-space-md right-space-md bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-1 rounded font-code-inline text-caption-meta text-on-surface">
          <span class="text-primary-container font-semibold" id="carousel-counter">01</span> / ${String(images.length).padStart(2,'0')}
        </div>
        <div class="absolute inset-y-0 left-0 flex items-center px-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <button id="carousel-prev" class="w-10 h-10 rounded-full bg-surface-container-high/90 hover:bg-surface-bright text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Previous image">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center px-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <button id="carousel-next" class="w-10 h-10 rounded-full bg-surface-container-high/90 hover:bg-surface-bright text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Next image">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
      <div class="grid gap-space-xs" style="grid-template-columns: repeat(${images.length}, 1fr)">
        ${thumbs}
      </div>
    </div>`;
}

function buildDrawerContent(project) {
  const d = project.detail;
  const metricsHtml = d.metrics.map(m => `
    <div class="flex flex-col">
      <div class="font-headline-md text-headline-md ${textColor(m.color)} tracking-tight">${m.value}</div>
      <div class="font-caption-meta text-caption-meta text-on-surface-variant uppercase mt-1">${m.label}</div>
    </div>`).join('');

  const stackHtml = d.stack.map(s =>
    `<span class="px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-tag text-label-tag shadow-sm">${s}</span>`
  ).join('');

  const featuresHtml = d.features.map(f => `
    <div class="flex items-start gap-space-sm">
      <div class="mt-1 w-6 h-6 rounded bg-primary-container/15 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[14px] text-primary-container">${f.icon}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-body-md text-primary font-semibold">${f.title}</span>
        <span class="font-body-sm text-body-sm text-on-surface-variant">${f.body}</span>
      </div>
    </div>`).join('');

  return `
    <div class="flex flex-col gap-space-sm">
      <div class="flex flex-wrap items-center gap-space-sm">
        <span class="bg-secondary/15 text-secondary px-space-sm py-0.5 rounded font-label-tag text-label-tag flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          ${d.badge}
        </span>
        <span class="text-outline-variant text-caption-meta font-caption-meta">•</span>
        <span class="font-caption-meta text-caption-meta text-on-surface-variant">${d.duration}</span>
        <span class="text-outline-variant text-caption-meta font-caption-meta">•</span>
        <span class="font-caption-meta text-caption-meta text-primary-fixed-dim">${d.location}</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">${d.fullTitle}</h1>
      <div class="flex items-center gap-space-sm text-secondary font-code-inline text-body-md">
        <span class="material-symbols-outlined text-[18px]">verified_user</span>
        <span>${d.role}</span>
      </div>
      <p class="font-body-lg text-body-lg text-on-surface-variant mt-space-xs max-w-3xl leading-relaxed">${d.fullDescription}</p>
    </div>

    ${buildCarousel(d.images)}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      <a href="${d.githubUrl}" target="_blank" rel="noopener noreferrer"
         class="flex items-center justify-between px-space-lg py-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-all group shadow-md">
        <div class="flex items-center gap-space-sm">
          <span class="material-symbols-outlined text-[24px] text-primary group-hover:rotate-12 transition-transform">code</span>
          <div class="flex flex-col text-left">
            <span class="font-title-card text-body-md text-primary font-semibold">View Source Code</span>
            <span class="font-caption-meta text-caption-meta text-on-surface-variant">${d.githubRepo}</span>
          </div>
        </div>
        <div class="flex items-center gap-1 bg-surface-container px-space-sm py-1 rounded font-code-inline text-caption-meta text-secondary">
          <span class="material-symbols-outlined text-[14px]">star</span>
          <span>${d.githubStars}</span>
        </div>
      </a>
      <a href="${d.liveUrl}" target="_blank" rel="noopener noreferrer"
         class="flex items-center justify-between px-space-lg py-space-md rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container transition-all group shadow-[0_0_28px_-4px_rgba(0,242,254,0.45)]">
        <div class="flex items-center gap-space-sm">
          <span class="material-symbols-outlined text-[24px] text-on-primary-container">rocket_launch</span>
          <div class="flex flex-col text-left">
            <span class="font-title-card text-body-md font-bold text-on-primary-container">${d.liveLabel}</span>
            <span class="font-caption-meta text-caption-meta text-on-primary-container/80">${d.liveSub}</span>
          </div>
        </div>
        <span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_outward</span>
      </a>
    </div>

    <div class="grid grid-cols-3 gap-space-sm p-space-md bg-surface-container-lowest rounded-xl">
      ${metricsHtml}
    </div>

    <div class="flex flex-col gap-space-md">
      <div class="flex items-center gap-space-xs">
        <span class="material-symbols-outlined text-primary-container text-[18px]">terminal</span>
        <span class="font-headline-sm text-title-card text-primary">Technical Narrative</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div class="flex flex-col p-space-lg bg-surface-container rounded-xl gap-space-sm">
          <div class="w-8 h-8 rounded bg-error-container/40 flex items-center justify-center text-error mb-space-xs">
            <span class="material-symbols-outlined text-[18px]">priority_high</span>
          </div>
          <span class="font-label-tag text-label-tag uppercase tracking-wider text-error">01 // Problem</span>
          <h3 class="font-title-card text-title-card text-primary font-semibold">${d.narrative.problem.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${d.narrative.problem.body}</p>
        </div>
        <div class="flex flex-col p-space-lg bg-surface-container rounded-xl gap-space-sm">
          <div class="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary-container mb-space-xs">
            <span class="material-symbols-outlined text-[18px]">memory</span>
          </div>
          <span class="font-label-tag text-label-tag uppercase tracking-wider text-primary-container">02 // Solution</span>
          <h3 class="font-title-card text-title-card text-primary font-semibold">${d.narrative.solution.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${d.narrative.solution.body}</p>
        </div>
        <div class="flex flex-col p-space-lg bg-surface-container rounded-xl gap-space-sm">
          <div class="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center text-secondary mb-space-xs">
            <span class="material-symbols-outlined text-[18px]">trending_up</span>
          </div>
          <span class="font-label-tag text-label-tag uppercase tracking-wider text-secondary">03 // Outcome</span>
          <h3 class="font-title-card text-title-card text-primary font-semibold">${d.narrative.outcome.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${d.narrative.outcome.body}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-space-sm">
      <span class="font-caption-meta text-caption-meta text-on-surface-variant uppercase tracking-wider">Engine Components &amp; Environment</span>
      <div class="flex flex-wrap gap-space-xs">${stackHtml}</div>
    </div>

    <div class="flex flex-col gap-space-md bg-surface-container p-space-lg rounded-xl">
      <div class="flex items-center justify-between">
        <span class="font-headline-sm text-title-card text-primary">Core Innovations</span>
        <span class="font-caption-meta text-caption-meta text-secondary uppercase tracking-widest">PROJECT DETAILS</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">${featuresHtml}</div>
    </div>

    <div class="pt-space-md pb-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-high/40 p-space-lg rounded-xl">
      <div class="flex flex-col text-left">
        <span class="font-title-card text-body-md text-primary font-semibold">Want to know more?</span>
        <span class="font-body-sm text-body-sm text-on-surface-variant">Read the README or get in touch to discuss this project further.</span>
      </div>
      <div class="flex items-center gap-space-sm shrink-0 w-full sm:w-auto">
        <a href="${d.whitepaperUrl}" target="_blank" rel="noopener noreferrer"
           class="w-full sm:w-auto px-space-md py-space-sm rounded bg-surface-container-high hover:bg-surface-bright text-primary font-code-inline text-code-inline flex items-center justify-center gap-1.5 transition-colors">
          <span class="material-symbols-outlined text-[16px]">description</span>
          <span>README</span>
        </a>
        <a href="${d.inquireUrl}"
           class="w-full sm:w-auto px-space-md py-space-sm rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary font-code-inline text-code-inline flex items-center justify-center gap-1.5 transition-colors">
          <span class="material-symbols-outlined text-[16px]">mail</span>
          <span>Get in Touch</span>
        </a>
      </div>
    </div>`;
}

function openProjectDrawer(index) {
  drawerCurrentIndex = index;
  const project = projects[index];

  const prevP = projects[(index - 1 + projects.length) % projects.length];
  const nextP = projects[(index + 1) % projects.length];
  $('#drawer-prev-label').textContent = `Prev: ${prevP.title}`;
  $('#drawer-next-label').textContent = `Next: ${nextP.title}`;
  drawerCaseLabel.textContent = `Case Study // ${String(index + 1).padStart(2,'0')}`;

  drawerContent.innerHTML = buildDrawerContent(project);

  drawer.removeAttribute('hidden');
  requestAnimationFrame(() => {
    drawer.classList.add('drawer-open');
    drawerBackdrop.classList.add('backdrop-visible');
  });

  document.body.style.overflow = 'hidden';
  setupCarousel(project.detail.images, project.detail.engineBadge);
  drawer.scrollTop = 0;
}

function closeDrawer() {
  drawer.classList.remove('drawer-open');
  drawerBackdrop.classList.remove('backdrop-visible');
  document.body.style.overflow = '';
  drawerCurrentIndex = -1;
  setTimeout(() => { drawer.setAttribute('hidden', ''); }, 320);
}

drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);
drawerPrev.addEventListener('click', () => {
  if (drawerCurrentIndex < 0) return;
  openProjectDrawer((drawerCurrentIndex - 1 + projects.length) % projects.length);
});
drawerNext.addEventListener('click', () => {
  if (drawerCurrentIndex < 0) return;
  openProjectDrawer((drawerCurrentIndex + 1) % projects.length);
});

// ================================================================
// CAROUSEL (inside drawer)
// ================================================================
function setupCarousel(images, badgeText) {
  if (!images || images.length === 0) return;
  let current = 0;

  const mainImg   = $('#carousel-main-img', drawerContent);
  const counter   = $('#carousel-counter', drawerContent);
  const badgeEl   = $('#carousel-badge-text', drawerContent);
  const thumbBtns = $$('.thumb-btn', drawerContent);
  const prevBtn   = $('#carousel-prev', drawerContent);
  const nextBtn   = $('#carousel-next', drawerContent);

  if (badgeEl) badgeEl.textContent = badgeText || '';

  function goTo(idx) {
    current = (idx + images.length) % images.length;
    if (mainImg) { mainImg.src = images[current].src; mainImg.alt = images[current].alt; }
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
    thumbBtns.forEach((btn, i) => btn.classList.toggle('thumb-active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  thumbBtns.forEach((btn, i) => btn.addEventListener('click', () => goTo(i)));
}

// ================================================================
// KEYBOARD SHORTCUTS
// ================================================================
document.addEventListener('keydown', (e) => {
  if (!drawer.classList.contains('drawer-open')) return;
  if (e.key === 'Escape')     { e.preventDefault(); closeDrawer(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); drawerPrev.click(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); drawerNext.click(); }
});

// ================================================================
// CERTIFICATE LIGHTBOX
// ================================================================
const certLightbox       = $('#cert-lightbox');
const lightboxTitle      = $('#lightbox-title');
const lightboxImage      = $('#lightbox-image');
const lightboxIssuer     = $('#lightbox-issuer');
const lightboxCredential = $('#lightbox-credential');
const lightboxVerifyLink = $('#lightbox-verify-link');
const lightboxClose      = $('#lightbox-close');

function openCertLightbox(cert) {
  lightboxTitle.textContent      = cert.title;
  lightboxImage.src              = cert.previewImageUrl;
  lightboxImage.alt              = `${cert.title} certificate preview`;
  lightboxIssuer.textContent     = cert.issuer;
  lightboxCredential.textContent = `ID: ${cert.credentialId}`;
  lightboxVerifyLink.href        = cert.verifyUrl;
  certLightbox.showModal();
}

lightboxClose.addEventListener('click', () => certLightbox.close());

certLightbox.addEventListener('click', (e) => {
  if (e.target === certLightbox) certLightbox.close();
});

// ================================================================
// INIT
// ================================================================
function init() {
  populateMeta();
  renderProjectCards();
  renderSkills();
  renderTopics();
  renderCertificates();
  renderSocial();
}

init();
