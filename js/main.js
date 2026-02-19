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

        img.src = btn.dataset.modalImgSrc;
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
