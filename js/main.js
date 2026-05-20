document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const html = document.documentElement;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark');
  }

  document.querySelectorAll('.js-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  });

  // Modals - open
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modalOpen;
      if (modalId === 'imageModal') {
        const img = document.getElementById('imageModal-img');
        const content = document.getElementById('imageModal-content');
        const footerExtra = document.getElementById('imageModal-footer-extra');

        const isDark = document.documentElement.classList.contains('dark');
        img.src = (isDark && btn.dataset.modalImgSrcDark) ? btn.dataset.modalImgSrcDark : btn.dataset.modalImgSrc;
        img.alt = btn.dataset.modalImgAlt;

        content.classList.remove('max-w-4xl', 'max-w-6xl');
        content.classList.add(btn.dataset.modalMaxw);

        if (btn.dataset.modalFooterId) {
          const tpl = document.getElementById(btn.dataset.modalFooterId);
          if (tpl) {
            footerExtra.replaceChildren(document.importNode(tpl.content, true));
            footerExtra.classList.remove('hidden');
          }
        } else {
          footerExtra.replaceChildren();
          footerExtra.classList.add('hidden');
        }
      }

      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('hidden');
    });
  });

  // Modals - close button
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal').classList.add('hidden'));
  });

  // Modals - backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => backdrop.closest('.modal').classList.add('hidden'));
  });

  // Modals - escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });

  // QR modal from URL param
  if (new URLSearchParams(window.location.search).get('source') === 'qr') {
    const qrModal = document.getElementById('qrModal');
    if (qrModal) qrModal.classList.remove('hidden');
  }

  // Scrollspy using Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const mobileTocCurrent = document.getElementById('mobile-toc-current');
  const mobileTocLinks = document.querySelectorAll('.mobile-toc-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('bg-dark', 'dark:bg-emerald-900', 'text-white', 'dark:text-emerald-300');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('bg-dark', 'dark:bg-emerald-900', 'text-white', 'dark:text-emerald-300');
            }
          });
          mobileTocLinks.forEach(link => {
            link.classList.remove('text-primary', 'dark:text-emerald-400', 'font-medium');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('text-primary', 'dark:text-emerald-400', 'font-medium');
              if (mobileTocCurrent) mobileTocCurrent.textContent = link.textContent.trim();
            }
          });
        }
      });
    }, { rootMargin: '-150px 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // Reading progress bar
  const readingProgress = document.getElementById('reading-progress');
  if (readingProgress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      readingProgress.style.width = pct + '%';
      readingProgress.setAttribute('aria-valuenow', Math.round(pct));
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // Before/after comparison sliders
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.getElementById('compare-label-style')) {
    const s = document.createElement('style');
    s.id = 'compare-label-style';
    s.textContent = '.compare-label{color:#4c6358}.dark .compare-label{color:#9ca3af}';
    document.head.appendChild(s);
  }

  document.querySelectorAll('[data-compare]').forEach(el => {
    const beforeSrc   = el.dataset.before;
    const afterSrc    = el.dataset.after;
    const beforeLabel = el.dataset.beforeLabel || 'Before';
    const afterLabel  = el.dataset.afterLabel  || 'After';

    let currentPct = 50;
    let dragging   = false;

    el.innerHTML =
      '<div class="compare-wrap" style="position:relative;cursor:col-resize;touch-action:pan-y;user-select:none;-webkit-user-select:none">' +
        // After image — base layer, sets container height
        '<img src="' + afterSrc + '" alt="' + afterLabel + '" class="compare-after">' +
        // Before image — absolute, clipped by clip-path
        '<img src="' + beforeSrc + '" alt="' + beforeLabel + '" class="compare-before" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;clip-path:inset(0 50% 0 0)">' +
        // Corner labels — both at bottom to avoid collision with top hint pill
        '<span class="compare-label" style="position:absolute;bottom:-24px;left:0;font-size:11px;pointer-events:none;white-space:nowrap;max-width:50%;overflow:hidden;text-overflow:ellipsis">' + beforeLabel + '</span>' +
        '<span class="compare-label" style="position:absolute;bottom:-24px;right:0;font-size:11px;pointer-events:none;white-space:nowrap;max-width:50%;overflow:hidden;text-overflow:ellipsis">' + afterLabel  + '</span>' +
        // Handle
        '<div class="compare-handle" tabindex="0" role="slider" aria-label="Before/after comparison" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="position:absolute;top:0;left:50%;height:100%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;cursor:grab">' +
          '<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:2px;height:100%;background:rgba(255,255,255,0.9)"></div>' +
          '<div style="position:relative;width:36px;height:36px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:14px;color:#444;z-index:1">⇔</div>' +
        '</div>' +
        // Drag hint — fades out on first interaction
        '<div class="compare-hint" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-size:11px;background:rgba(0,0,0,0.55);color:#fff;padding:3px 10px;border-radius:99px;pointer-events:none;white-space:nowrap;transition:opacity 0.3s ease">↔ Drag to compare</div>' +
      '</div>';

    const wrap     = el.querySelector('.compare-wrap');
    const beforeImg = el.querySelector('.compare-before');
    const handle   = el.querySelector('.compare-handle');
    const hint     = el.querySelector('.compare-hint');

    const setPos = (pct, animate) => {
      currentPct = Math.max(0, Math.min(100, pct));
      const t = animate ? 'clip-path 350ms ease-out' : 'none';
      beforeImg.style.transition  = t;
      beforeImg.style.clipPath    = `inset(0 ${100 - currentPct}% 0 0)`;
      handle.style.transition     = animate ? 'left 350ms ease-out' : 'none';
      handle.style.left           = currentPct + '%';
      handle.setAttribute('aria-valuenow', Math.round(currentPct));
    };

    const getPct = clientX => {
      const { left, width } = wrap.getBoundingClientRect();
      return (clientX - left) / width * 100;
    };

    const dismissHint = () => {
      hint.style.opacity      = '0';
      hint.style.pointerEvents = 'none';
    };

    // Mouse
    wrap.addEventListener('mousedown', e => {
      dragging = true;
      handle.style.cursor = wrap.style.cursor = 'grabbing';
      dismissHint();
      setPos(getPct(e.clientX), false);
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.style.cursor = 'grab';
      wrap.style.cursor   = 'col-resize';
    });
    window.addEventListener('mousemove', e => { if (dragging) setPos(getPct(e.clientX), false); });

    // Touch
    wrap.addEventListener('touchstart', e => { dismissHint(); setPos(getPct(e.touches[0].clientX), false); }, { passive: true });
    wrap.addEventListener('touchmove',  e => { setPos(getPct(e.touches[0].clientX), false); }, { passive: true });

    // Keyboard
    handle.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); setPos(currentPct - 5, false); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setPos(currentPct + 5, false); }
    });

    // Auto-nudge on first scroll-into-view
    if (!prefersReducedMotion) {
      let nudged = false;
      const nudgeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || nudged) return;
          nudged = true;
          nudgeObserver.unobserve(wrap);
          setTimeout(() => setPos(30, true),  400);
          setTimeout(() => setPos(50, true),  950);
        });
      }, { threshold: 0.6 });
      nudgeObserver.observe(wrap);
    }
  });

  // Mobile TOC dropdown
  const mobileTocBtn = document.getElementById('mobile-toc-btn');
  const mobileTocDropdown = document.getElementById('mobile-toc-dropdown');
  const mobileTocChevron = document.getElementById('mobile-toc-chevron');

  const mobileTocBar = document.getElementById('mobile-toc');

  function positionDropdown() {
    if (mobileTocBar && mobileTocDropdown) {
      mobileTocDropdown.style.top = mobileTocBar.getBoundingClientRect().bottom + 'px';
    }
  }

  if (mobileTocBtn && mobileTocDropdown) {
    mobileTocBtn.addEventListener('click', () => {
      const isOpen = !mobileTocDropdown.classList.contains('hidden');
      if (!isOpen) positionDropdown();
      mobileTocDropdown.classList.toggle('hidden', isOpen);
      mobileTocChevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    });

    window.addEventListener('scroll', () => {
      if (!mobileTocDropdown.classList.contains('hidden')) positionDropdown();
    }, { passive: true });

    mobileTocLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileTocDropdown.classList.add('hidden');
        mobileTocChevron.style.transform = '';
      });
    });
  }
});
