document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.tab-section');

  // Update active nav state and horizontally scroll active tab pill into view
  function syncActiveState() {
    const hash = window.location.hash || '#overview';
    const activeSection = document.querySelector(hash);

    sections.forEach(sec => sec.classList.remove('active'));
    if (activeSection) {
      activeSection.classList.add('active');
    }

    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
        // Ensure the active tab is comfortably in view on mobile devices
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('hashchange', syncActiveState);
  syncActiveState();

  // Print Resume Functionality
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  // Keyboard arrow navigation between sections (Left / Right keys)
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const linksArray = Array.from(navLinks);
      const currentIdx = linksArray.findIndex(l => l.getAttribute('href') === (window.location.hash || '#overview'));
      if (currentIdx !== -1) {
        let nextIdx = e.key === 'ArrowRight' ? currentIdx + 1 : currentIdx - 1;
        if (nextIdx >= linksArray.length) nextIdx = 0;
        if (nextIdx < 0) nextIdx = linksArray.length - 1;
        linksArray[nextIdx].click();
      }
    }
  });
});

