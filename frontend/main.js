// Nexalyze Dashboard Application with Responsive & Accessibility Support
(function() {
  'use strict';

  const features = {
    hasCanvas: () => !!document.createElement('canvas').getContext,
    hasLocalStorage: () => { try { localStorage.setItem('__test__', '__test__'); localStorage.removeItem('__test__'); return true; } catch(e) { return false; } },
    hasChart: () => typeof Chart !== 'undefined'
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else { initApp(); }

  function initApp() {
    if (!features.hasCanvas()) { showFallback('Canvas not supported'); return; }
    
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const state = { chartInstances: {}, chartsInitialized: false, currentPage: 'dashboard', isMobile: window.innerWidth < 768 };

    initializeNavigation(navItems, pages, state);
    initializeKeyboardNavigation(navItems, state);
    initializeResponsiveness(state);
    initializeAccessibility();

    if (features.hasChart()) renderCharts(state);
  }

  function initializeNavigation(navItems, pages, state) {
    navItems.forEach(item => {
      item.addEventListener('click', handleNavClick);
      item.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNavClick.call(item); } });
    });
    function handleNavClick() { const pageId = this.getAttribute('data-page'); if (!pageId) return; switchPage(pageId, navItems, pages, state); }
  }

  function initializeKeyboardNavigation(navItems, state) {
    document.addEventListener('keydown', (e) => {
      const currentIndex = Array.from(navItems).findIndex(item => item === document.activeElement);
      if (currentIndex === -1) return;
      let nextIndex;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); nextIndex = (currentIndex + 1) % navItems.length; navItems[nextIndex].focus(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); nextIndex = (currentIndex - 1 + navItems.length) % navItems.length; navItems[nextIndex].focus(); }
    });
  }

  function initializeResponsiveness(state) {
    window.addEventListener('resize', debounce(() => {
      state.isMobile = window.innerWidth < 768;
      if (state.chartInstances.traffic) state.chartInstances.traffic.resize();
      if (state.chartInstances.bounce) state.chartInstances.bounce.resize();
    }, 250));
    window.addEventListener('orientationchange', () => { setTimeout(() => { if (state.chartInstances.traffic) state.chartInstances.traffic.resize(); if (state.chartInstances.bounce) state.chartInstances.bounce.resize(); }, 100); });
  }

  function initializeAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#dashboard';
    skipLink.className = 'sr-only focus:not-sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  function switchPage(pageId, navItems, pages, state) {
    navItems.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-current', 'false'); });
    const activeNav = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNav) { activeNav.classList.add('active'); activeNav.setAttribute('aria-current', 'true'); }
    pages.forEach(page => { page.classList.remove('active'); page.setAttribute('hidden', ''); });
    const activePage = document.getElementById(pageId);
    if (activePage) { activePage.classList.add('active'); activePage.removeAttribute('hidden'); }
    state.currentPage = pageId;
    if (features.hasLocalStorage()) localStorage.setItem('lastPage', pageId);
    if (pageId === 'logout') setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    if (pageId === 'dashboard' && features.hasChart()) renderCharts(state);
  }

  function renderCharts(state) {
    if (state.chartsInitialized) return;
    const trafficCanvas = document.getElementById('trafficChart');
    const bounceCanvas = document.getElementById('bounceChart');
    if (!features.hasChart()) { showFallback('Charts require Chart.js'); return; }
    if (trafficCanvas && !state.chartInstances.traffic) { try { const ctx = trafficCanvas.getContext('2d'); if (!ctx) throw new Error('Cannot get 2D context'); state.chartInstances.traffic = new Chart(ctx, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ label: 'Sessions', data: [120, 190, 300, 280, 350], backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 2, tension: 0.4, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } } }); } catch (error) { console.error('Error rendering traffic chart:', error); showChartFallback(trafficCanvas); } }
    if (bounceCanvas && !state.chartInstances.bounce) { try { const ctx = bounceCanvas.getContext('2d'); if (!ctx) throw new Error('Cannot get 2D context'); state.chartInstances.bounce = new Chart(ctx, { type: 'bar', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ label: 'Bounce Rate (%)', data: [40, 50, 30, 45, 35], backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false, indexAxis: 'x', plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true, max: 100 } } } }); } catch (error) { console.error('Error rendering bounce chart:', error); showChartFallback(bounceCanvas); } }
    state.chartsInitialized = true;
  }

  function showFallback(message) { const fallback = document.createElement('div'); fallback.className = 'p-4 bg-yellow-100 text-yellow-800 rounded'; fallback.textContent = message; document.body.insertBefore(fallback, document.body.firstChild); }
  function showChartFallback(canvas) { const parent = canvas.parentElement; if (!parent) return; const fallback = document.createElement('div'); fallback.className = 'p-4 bg-gray-100 text-gray-600 rounded flex items-center justify-center h-full'; fallback.textContent = 'Chart could not be rendered'; parent.replaceChild(fallback, canvas); }
  function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; }

  window.addEventListener('offline', () => console.warn('Application is offline'));
  window.addEventListener('online', () => console.log('Application is online'));

})();
