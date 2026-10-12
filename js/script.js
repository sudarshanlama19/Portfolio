/**
 * Sudarshan Lama - Personal Portfolio Scripts
 * BIT Student • Developer • AI Enthusiast
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle synchronization
  const currentTheme = localStorage.getItem('sudarshan_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Smooth scroll helper for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')?.substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
