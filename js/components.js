(function () {
  var path = window.location.pathname;
  var isAbout = path.endsWith('about.html');
  var isIndex = path.endsWith('index.html') || path === '/' || path.endsWith('/');
  var logoHref = isIndex ? '#page-top' : 'index.html';
  var activeClasses = 'text-primary dark:text-emerald-400 font-medium';
  var inactiveClasses = 'text-muted dark:text-gray-400 hover:text-body dark:hover:text-dark-text';

  var workActive = isIndex ? activeClasses : inactiveClasses;
  var aboutActive = isAbout ? activeClasses : inactiveClasses;

  var sidebarHTML = '<div class="hidden xl:block xl:w-2/12 px-4">' +
    '<div class="sticky top-0 flex flex-col h-screen">' +
    '<div class="pt-20">' +
    '<div class="text-center">' +
    '<a href="' + logoHref + '">' +
    '<img class="mx-auto h-[75px] hidden dark:block" src="/img/logo_dark.svg" alt="Logo" />' +
    '<img class="mx-auto h-[75px] block dark:hidden" src="/img/logo.svg" alt="Logo"/>' +
    '</a>' +
    '<p class="pt-4 mb-0 text-[13px] text-muted dark:text-gray-400">Clayton Anderson</p>' +
    '<p class="pt-2 text-[13px] text-muted dark:text-gray-400">Product Designer</p>' +
    '</div>' +
    '<div class="mt-6 border-t border-gray-200 dark:border-gray-700 w-32 mx-auto"></div>' +
    '<nav class="pt-4 text-center">' +
    '<a href="index.html" class="flex justify-center py-2 text-[13px] ' + workActive + '"><span class="border-l-4 pl-3 ' + (isIndex ? 'border-primary dark:border-emerald-400' : 'border-transparent') + '">Work</span></a>' +
    '<a href="about.html" class="flex justify-center py-2 text-[13px] ' + aboutActive + '"><span class="border-l-4 pl-3 ' + (isAbout ? 'border-primary dark:border-emerald-400' : 'border-transparent') + '">About</span></a>' +
    '</nav>' +
    '</div>' +
    '<div class="mt-auto pb-6 text-center">' +
    '<ul class="flex items-center justify-center gap-3">' +
    '<li>' +
    '<button class="js-theme-toggle text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors" aria-label="Toggle dark mode">' +
    '<svg class="w-7 h-7 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />' +
    '</svg>' +
    '<svg class="w-7 h-7 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />' +
    '</svg>' +
    '</button>' +
    '</li>' +
    '<li class="w-px h-7 bg-gray-300 dark:bg-gray-600"></li>' +
    '<li>' +
    '<a href="mailto:claytonanderson.work@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" class="w-9 h-9">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '<li>' +
    '<a href="https://www.linkedin.com/in/claytona/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">' +
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '<li>' +
    '<a href="https://bsky.app/profile/claytonanderson.design" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">' +
    '<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '</ul>' +
    '<p class="mt-3 text-[13px] text-muted dark:text-gray-400">&copy; Clayton Anderson 2026</p>' +
    '</div>' +
    '</div>' +
    '</div>';

  var navHTML = '<nav class="xl:hidden bg-white dark:bg-dark-bg py-6">' +
    '<div class="flex items-center gap-4">' +
    '<a href="' + logoHref + '">' +
    '<img class="h-[60px] hidden dark:block" src="/img/logo_dark.svg" alt="Logo" />' +
    '<img class="h-[60px] block dark:hidden" src="/img/logo.svg" alt="Logo"/>' +
    '</a>' +
    '<p class="mr-auto text-[14px] text-muted dark:text-gray-400">Clayton Anderson<br>Product Designer</p>' +
    '<div class="flex items-end gap-6">' +
    '<a href="index.html" class="pb-1 text-[14px] border-b-2 ' + (isIndex ? 'border-primary dark:border-emerald-400 ' + activeClasses : 'border-transparent ' + inactiveClasses) + '">Work</a>' +
    '<a href="about.html" class="pb-1 text-[14px] border-b-2 ' + (isAbout ? 'border-primary dark:border-emerald-400 ' + activeClasses : 'border-transparent ' + inactiveClasses) + '">About</a>' +
    '</div>' +
    '</div>' +
    '</nav>';

  var footerHTML = '<div class="text-center pt-24 xl:hidden">' +
    '<ul class="flex items-center justify-center gap-4">' +
    '<li>' +
    '<button class="js-theme-toggle text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors" aria-label="Toggle dark mode">' +
    '<svg class="w-7 h-7 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />' +
    '</svg>' +
    '<svg class="w-7 h-7 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />' +
    '</svg>' +
    '</button>' +
    '</li>' +
    '<li class="w-px h-7 bg-gray-300 dark:bg-gray-600"></li>' +
    '<li>' +
    '<a href="mailto:claytonanderson.work@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" class="w-9 h-9">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '<li>' +
    '<a href="https://www.linkedin.com/in/claytona/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">' +
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '<li>' +
    '<a href="https://bsky.app/profile/claytonanderson.design" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" class="text-muted hover:text-muted-hover dark:text-gray-400 dark:hover:text-gray-300 transition-colors">' +
    '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">' +
    '<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>' +
    '</svg>' +
    '</a>' +
    '</li>' +
    '</ul>' +
    '<p class="mt-4 text-[13px] text-muted dark:text-gray-400">&copy; Clayton Anderson 2026</p>' +
    '</div>';

  var sidebarEl = document.getElementById('sidebar-placeholder');
  if (sidebarEl) sidebarEl.outerHTML = sidebarHTML;

  var navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = navHTML;

  var footerEl = document.getElementById('footer-icons-placeholder');
  if (footerEl) footerEl.outerHTML = footerHTML;

  // Reading progress bar — case study pages only
  if (!isIndex && !isAbout) {
    var progressStyle = document.createElement('style');
    progressStyle.textContent =
      '#reading-progress{background-color:#006c4d}' +
      'html.dark #reading-progress{background-color:#34d399}' +
      '@media(prefers-reduced-motion:no-preference){#reading-progress{transition:width 80ms ease-out}}' +
      '[data-compare]{display:flex;justify-content:center}' +
      '.compare-wrap{display:inline-block}' +
      '.compare-after{display:block;height:500px;width:auto}' +
      '@media(max-width:639px){.compare-after{height:50vh}[data-compare]{margin-top:1.5rem}}';
    document.head.appendChild(progressStyle);

    var progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-label', 'Reading progress');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;z-index:9999;';
    document.body.insertAdjacentElement('afterbegin', progressBar);
  }
})();
