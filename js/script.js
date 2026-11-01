// ---------- Custom cursor ----------
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

(function animateCursor() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, .card, .feature, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('grow'));
  el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
});

// ---------- Smooth anchor scrolling ----------
const navMenu = document.getElementById('navMenu');
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu.classList.remove('open');
    }
  });
});

// ---------- Hamburger toggle ----------
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(sec => {
    if (sec.offsetTop - 120 <= window.scrollY) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ---------- Scroll progress + header shadow ----------
const progressBar = document.getElementById('progressBar');
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  const scrolled = document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (scrolled / max) * 100 + '%';
  header.classList.toggle('scrolled', scrolled > 40);
});

// ---------- Reveal on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  observer.observe(el);
});
