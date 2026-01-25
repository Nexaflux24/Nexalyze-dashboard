document.addEventListener("DOMContentLoaded", () => {
  // === 1. Tab Switching Logic ===
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      // Highlight active nav item
      document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Show correct section and hide others
      const pageId = item.getAttribute("data-page");
      document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
      });

      const activePage = document.getElementById(pageId);
      if (activePage) activePage.classList.add("active");

      // If dashboard selected, render charts
      if (pageId === "dashboard") renderCharts();
    });
  });

  // === 2. Render Charts (only for Dashboard) ===
  function renderCharts() {
    const trafficCanvas = document.getElementById('trafficChart');
    const bounceCanvas = document.getElementById('bounceChart');

    if (trafficCanvas && !trafficCanvas.classList.contains("chart-rendered")) {
      const ctx = trafficCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Sessions',
            data: [120, 190, 300, 280, 350],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
      trafficCanvas.classList.add("chart-rendered");
    }

    if (bounceCanvas && !bounceCanvas.classList.contains("chart-rendered")) {
      const ctx = bounceCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Bounce Rate',
            data: [40, 50, 30, 45, 35],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
      bounceCanvas.classList.add("chart-rendered");
    }
  }

  // Initial load (dashboard is default active page)
  renderCharts();
});
