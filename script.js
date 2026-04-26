// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }));
  }
});

// ===== SCROLL REVEAL =====
const revealElements = () => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('active');
  });
};
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
  document.querySelectorAll('[data-count]').forEach(el => {
    if (el.dataset.animated) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + current.toLocaleString() + suffix;
    }, 30);
  });
};
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== HERO SPARKLE PARTICLES =====
function createSparkles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${2 + Math.random() * 4}px;height:${2 + Math.random() * 4}px;animation-delay:${Math.random() * 6}s;animation-duration:${4 + Math.random() * 4}s;`;
    container.appendChild(p);
  }
}
document.addEventListener('DOMContentLoaded', createSparkles);

// ===== DIAMOND SPARKLE ANIMATION =====
function createDiamondSparkles() {
  document.querySelectorAll('.diamond-ring-anim').forEach(container => {
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.cssText = `left:${10 + Math.random() * 80}%;top:${10 + Math.random() * 80}%;animation-delay:${Math.random() * 2}s;`;
      container.appendChild(s);
    }
  });
}
document.addEventListener('DOMContentLoaded', createDiamondSparkles);

// ===== FALLING DIAMONDS ON SCROLL =====
(function () {
  let lastScroll = 0;
  let throttle = false;
  const types = ['', 'alt', 'gold'];

  function spawnDiamond() {
    // Spawn one from left, one from right
    const sides = ['left', 'right'];
    sides.forEach(side => {
      const d = document.createElement('div');
      const type = types[Math.floor(Math.random() * types.length)];
      d.className = `scroll-diamond ${type} from-${side}`;

      const topPos = Math.random() * 30; // spawn in top 30% of viewport
      if (side === 'left') {
        d.style.left = (5 + Math.random() * 8) + '%';
      } else {
        d.style.right = (5 + Math.random() * 8) + '%';
      }
      d.style.top = topPos + 'vh';
      d.style.animationDuration = (2 + Math.random() * 1.5) + 's';

      document.body.appendChild(d);
      // Remove after animation completes
      setTimeout(() => d.remove(), 3500);
    });
  }

  window.addEventListener('scroll', () => {
    if (throttle) return;
    const scrollDelta = Math.abs(window.scrollY - lastScroll);
    if (scrollDelta < 30) return; // only on meaningful scroll

    throttle = true;
    lastScroll = window.scrollY;
    spawnDiamond();

    setTimeout(() => { throttle = false; }, 400); // max ~2.5 spawns/sec
  });
})();

// ===== BRAND TIMELINE MOVING DIAMOND =====
(function () {
  const timeline = document.querySelector('.brand-timeline');
  const movingDiamond = document.querySelector('.brand-timeline-moving-diamond');

  if (timeline && movingDiamond) {
    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll position relative to timeline
      const scrollPos = windowHeight / 2 - rect.top;
      const timelineHeight = rect.height;

      // Calculate progress between 0% and 100%
      let progress = scrollPos / timelineHeight;
      progress = Math.max(0, Math.min(1, progress));

      // If we are at 100%, we might want to offset slightly so it aligns with the last dot
      // But 100% top is exactly the bottom of the timeline box.
      movingDiamond.style.top = (progress * 100) + '%';
    });

    // Initial call to set position on load
    window.dispatchEvent(new Event('scroll'));
  }
})();