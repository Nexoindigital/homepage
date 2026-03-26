/* ============================================
   NEXO DIGITAL — main.js
   ============================================ */

/* ── CONFIGURACIÓN ── */
const WHATSAPP_NUMBER = '529511271872'; // tu número con código de país (52 + 10 dígitos)
const FORMSPREE_ID    = 'xwvwknjn';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: scroll + mobile toggle ── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── 2. ACTIVE NAV LINK on scroll ── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observerNav.observe(s));

  /* ── 3. SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');

  const observerReveal = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observerReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(r => observerReveal.observe(r));

  /* ── 4. LANGUAGE TOGGLE (ES/EN) ── */
  let currentLang = 'es';
  const langBtn = document.getElementById('langToggle');

  function applyLanguage(lang) {
    document.querySelectorAll('[data-es]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-placeholder-es]').forEach(el => {
      el.placeholder = el.getAttribute('data-placeholder-' + lang) || el.placeholder;
    });
    document.querySelectorAll('select option[data-es]').forEach(opt => {
      const text = opt.getAttribute('data-' + lang);
      if (text) opt.textContent = text;
    });
    document.querySelectorAll('.filter-btn[data-es]').forEach(btn => {
      const text = btn.getAttribute('data-' + lang);
      if (text) btn.textContent = text;
    });
    langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
    document.documentElement.lang = lang;
  }

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(currentLang);
  });

  /* ── 5. PORTFOLIO FILTER ── */
  const filterBtns     = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (match) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.pointerEvents = 'auto';
          item.style.display = '';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          item.style.pointerEvents = 'none';
          setTimeout(() => {
            if (item.style.opacity === '0') item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ── 6. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 7. CONTACT FORM ── */
  initContactForm(); // ← aquí se llama la función

  /* ── 8. FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 9. COUNTER ANIMATION ── */
  function animateCounter(el, target, duration = 1500) {
    const start     = performance.now();
    const isPlus    = el.textContent.includes('+');
    const isPercent = el.textContent.includes('%');
    const isX       = el.textContent.includes('x');

    const update = (time) => {
      const elapsed  = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = (isPlus ? '+' : '') + current + (isPercent ? '%' : isX ? 'x' : '');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          const val = parseInt(num.textContent.replace(/[^0-9]/g, ''));
          if (!isNaN(val)) animateCounter(num, val);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.hero-stats').forEach(s => statsObserver.observe(s));

}); // ← fin del DOMContentLoaded

/* ══════════════════════════════════════════
   FORMULARIO — WhatsApp + Formspree
   (fuera del DOMContentLoaded para que
    initContactForm() pueda ser llamada)
══════════════════════════════════════════ */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const campos   = form.querySelectorAll('input, select, textarea');
    const nombre   = campos[0].value.trim();
    const negocio  = campos[1].value.trim();
    const contacto = campos[2].value.trim();
    const servicio = campos[3].value;
    const mensaje  = campos[4].value.trim();

    if (!nombre || !contacto) {
      mostrarEstado(form, 'error', '⚠ Por favor llena tu nombre y correo o WhatsApp.');
      return;
    }

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Enviar email vía Formspree
    try {
      const res = await fetch(`https://formspree.io/f/xwvwknjn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nombre, negocio, contacto, servicio, mensaje })
      });

      if (res.ok) {
        mostrarEstado(form, 'success', '✅ Mensaje enviado. ¡Te respondo en menos de 24 horas!');
        form.reset();
      } else {
        mostrarEstado(form, 'error', '⚠ Hubo un error al enviar. Intenta de nuevo.');
      }

    } catch (err) {
      mostrarEstado(form, 'error', '⚠ Sin conexión. Intenta de nuevo.');
      console.warn('Formspree error:', err);
    }

    btn.disabled = false;
    btn.textContent = 'Enviar y cotizar 🚀';
  });
}
   
/* ── TERMINAL ANIMATION ── */
const terminalBody = document.getElementById('terminalBody');
if (terminalBody) {
  const lines = [
    { type: 'prompt', text: 'Quienes somos' },
    { type: 'output', text: 'Nexo Digital — Agencia Digital en Oaxaca', color: 'accent' },
    { type: 'prompt', text: 'Servicios' },
    { type: 'output', text: '→ Diseño Web & Landing Pages', color: '' },
    { type: 'output', text: '→ SEO & Posicionamiento Google', color: '' },
    { type: 'output', text: '→ Marketing Digital & Publicidad', color: '' },
    { type: 'output', text: '→ Branding & Identidad Visual', color: '' },
    { type: 'output', text: '→ Mantenimiento Web', color: '' },
    { type: 'prompt', text: 'Perfil' },
    { type: 'output', text: 'Ubicacion: "Oaxaca, México 🇲🇽",', color: 'yellow' },
    { type: 'output', text: '  Experiencia: "+3 años",', color: 'yellow' },
    { type: 'output', text: '  Proyectos: "+30 entregados",', color: 'yellow' },
    { type: 'output', text: '  Disponible: true ', color: 'yellow' },
    { type: 'prompt', text: 'nexoindigital@gmail.com' },
    { type: 'output', text: '✓ Listo para tu proyecto. ¡Hablemos!', color: 'green' },
  ];

  let i = 0;
  let started = false;

  function typeLine(lineObj, callback) {
    const div = document.createElement('div');
    div.className = 't-line';
    terminalBody.appendChild(div);

    if (lineObj.type === 'prompt') {
      div.innerHTML = `<span class="t-prompt">❯ </span><span class="t-cmd"></span><span class="t-cursor"></span>`;
      const cmd    = div.querySelector('.t-cmd');
      const cursor = div.querySelector('.t-cursor');
      let ci = 0;
      const interval = setInterval(() => {
        cmd.textContent += lineObj.text[ci++];
        terminalBody.scrollTop = terminalBody.scrollHeight;
        if (ci >= lineObj.text.length) {
          clearInterval(interval);
          cursor.remove();
          setTimeout(callback, 300);
        }
      }, 45);
    } else {
      const colorClass = lineObj.color ? lineObj.color : '';
      div.innerHTML = `<span class="t-output ${colorClass}"></span>`;
      const out = div.querySelector('.t-output');
      let ci = 0;
      const interval = setInterval(() => {
        out.textContent += lineObj.text[ci++];
        terminalBody.scrollTop = terminalBody.scrollHeight;
        if (ci >= lineObj.text.length) {
          clearInterval(interval);
          setTimeout(callback, 80);
        }
      }, 18);
    }
  }

  function runTerminal() {
    if (i >= lines.length) {
      const div = document.createElement('div');
      div.className = 't-line';
      div.innerHTML = `<span class="t-prompt">❯ </span><span class="t-cursor"></span>`;
      terminalBody.appendChild(div);
      return;
    }
    typeLine(lines[i++], runTerminal);
  }

  const termObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(runTerminal, 600);
        termObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  termObs.observe(terminalBody);
}