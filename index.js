
/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(36px)';
  el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
  revealObserver.observe(el);
});

/* ── Form validation ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const fname = document.getElementById('fname');
  const fnameErr = document.getElementById('fnameErr');
  if (!fname.value.trim() || fname.value.trim().length < 2) {
    fnameErr.classList.add('show');
    fname.style.borderColor = '#ff4d4d';
    valid = false;
  } else {
    fnameErr.classList.remove('show');
    fname.style.borderColor = '';
  }

  const phone = document.getElementById('phone');
  const phoneErr = document.getElementById('phoneErr');
  const phoneVal = phone.value.trim().replace(/\s+/g, '');
  if (!phoneVal || phoneVal.length < 8) {
    phoneErr.classList.add('show');
    phone.style.borderColor = '#ff4d4d';
    valid = false;
  } else {
    phoneErr.classList.remove('show');
    phone.style.borderColor = '';
  }

  const email = document.getElementById('email');
  const emailErr = document.getElementById('emailErr');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.value.trim())) {
    emailErr.classList.add('show');
    email.style.borderColor = '#ff4d4d';
    valid = false;
  } else {
    emailErr.classList.remove('show');
    email.style.borderColor = '';
  }

  if (valid) {
    const btn = this.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22cc88';
      btn.style.opacity = '1';
      document.getElementById('formSuccess').classList.add('show');
      this.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        document.getElementById('formSuccess').classList.remove('show');
      }, 4000);
    }, 1400);
  }
});

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active-link'));
      const active = document.querySelector(`.nav-menu a[href="#${id}"]`);
      if (active) active.classList.add('active-link');
    }
  });
});
