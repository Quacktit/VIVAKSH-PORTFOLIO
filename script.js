/* ============================
   BOLD PORTFOLIO — script.js
   ============================ */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '0.7';
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children reveals
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

// ---- SKILL BARS ----
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.dataset.w;
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

barFills.forEach(bar => barObserver.observe(bar));

// ---- PROJECT CARD COLOR ----
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  const color = card.dataset.color;
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = color + '55';
    card.style.boxShadow = `0 24px 48px ${color}22`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '';
    card.style.boxShadow = '';
  });
});

// ---- HERO TITLE STAGGER ----
const heroLines = document.querySelectorAll('.hero-title .line');
heroLines.forEach((line, i) => {
  line.style.animationDelay = `${i * 0.15}s`;
  line.style.opacity = '0';
  line.style.transform = 'translateY(60px)';
  line.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  }, 300 + i * 150);
});

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#059669';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ---- SMOOTH NAV LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PARALLAX HERO BG TEXT ----
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (bgText) {
    const y = window.scrollY * 0.3;
    bgText.style.transform = `translate(-50%, calc(-50% + ${y}px))`;
  }
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text)';
    }
  });
});

/* --- MOBILE & BUG FIXES --- */

/* Disable custom cursor on touch devices */
@media (hover: none) and (pointer: coarse) {
  .cursor, .cursor-follower, .hero-scroll { 
    display: none !important; 
  }
  body { cursor: auto !important; }
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(255, 77, 0, 0.4);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

/* Hamburger Menu Icon */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  z-index: 1100;
}

.nav-toggle span {
  width: 30px;
  height: 2px;
  background: var(--accent);
  transition: 0.3s;
}

/* Responsive Mobile Navigation */
@media (max-width: 900px) {
  .nav-toggle { display: flex; }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%; /* Hidden off-screen */
    width: 100%;
    height: 100vh;
    background: var(--bg);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
  }

  .nav-links.active { right: 0; } /* Slides in */
  
  .nav-links a { font-size: 32px; font-family: var(--font-display); }

  /* Hamburger to 'X' Animation */
  .nav-toggle.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .nav-toggle.active span:nth-child(2) { opacity: 0; }
  .nav-toggle.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  /* Fix hero text on small screens */
  .hero-title { font-size: 70px; }
  .hero-bg-text { display: none; }
}
