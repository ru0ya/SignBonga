document.addEventListener('DOMContentLoaded', initNavigation);

function initNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  function handleNavClick(e) {
    e.preventDefault();
    const pageId = e.target.getAttribute('data-page');
    showPage(pageId);
    updateActiveNavLink(e.target);
  }

  function showPage(pageId) {
    pages.forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId + '-page').classList.add('active');
  }

  function updateActiveNavLink(clickedLink) {
    navLinks.forEach(navLink => {
      navLink.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }
}
