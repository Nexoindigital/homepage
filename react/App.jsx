/*
  NEXO DIGITAL — App.jsx
  React standalone component (prueba/preview)
  Requiere: React 18+, Tailwind (opcional), o CSS propio
  
  Para usar:
    npm create vite@latest nexo-digital -- --template react
    Reemplaza src/App.jsx con este archivo
    npm run dev
*/

import { useState, useEffect, useRef } from 'react';

// ── Data ──────────────────────────────────────────
const SERVICES = [
  { icon: '🌐', title: { es: 'Diseño Web', en: 'Web Design' },
    desc: { es: 'Sitios modernos, rápidos y optimizados que convierten desde el primer click.', en: 'Modern, fast and optimized sites that convert from the first click.' },
    tags: ['HTML/CSS', 'JavaScript', 'React'] },
  { icon: '🚀', title: { es: 'Landing Pages', en: 'Landing Pages' },
    desc: { es: 'Una página, un objetivo, máximos resultados para campañas y lanzamientos.', en: 'One page, one goal, maximum results for campaigns and launches.' },
    tags: ['CRO', 'Copywriting', 'A/B Testing'] },
  { icon: '🔍', title: { es: 'SEO & Posicionamiento', en: 'SEO & Positioning' },
    desc: { es: 'Aparece primero en Google cuando tus clientes te buscan.', en: 'Appear first on Google when your customers search for you.' },
    tags: ['On-Page SEO', 'Analytics', 'Auditoría'] },
  { icon: '📣', title: { es: 'Marketing Digital', en: 'Digital Marketing' },
    desc: { es: 'Estrategias que conectan tu marca con las personas correctas.', en: 'Strategies that connect your brand with the right people.' },
    tags: ['Social Media', 'Email', 'Ads'] },
  { icon: '🎨', title: { es: 'Branding & Identidad', en: 'Branding & Identity' },
    desc: { es: 'Crea una imagen de marca que se recuerde y transmita profesionalismo.', en: 'Create a brand image that\'s remembered and conveys professionalism.' },
    tags: ['Logo', 'Identidad Visual', 'Brand Guidelines'] },
  { icon: '🔧', title: { es: 'Mantenimiento Web', en: 'Web Maintenance' },
    desc: { es: 'Tu sitio siempre actualizado, seguro y al 100%.', en: 'Your site always updated, secure and running at 100%.' },
    tags: ['Soporte', 'Backups', 'Seguridad'] },
];

const PORTFOLIO = [
  { id: 1, category: 'web',      tag: 'Diseño Web',    title: { es: 'Sitio Web — Restaurante', en: 'Website — Restaurant' },      desc: { es: 'Diseño y desarrollo completo', en: 'Full design and development' } },
  { id: 2, category: 'branding', tag: 'Branding',      title: { es: 'Identidad — Tienda Local', en: 'Identity — Local Store' },   desc: { es: 'Logo y guía de marca', en: 'Logo and brand guide' } },
  { id: 3, category: 'seo',      tag: 'SEO',           title: { es: 'SEO — Despacho Contable', en: 'SEO — Accounting Firm' },     desc: { es: '+300% visitas orgánicas', en: '+300% organic visits' } },
  { id: 4, category: 'web',      tag: 'Landing Page',  title: { es: 'Landing — Clínica Dental', en: 'Landing — Dental Clinic' }, desc: { es: 'Alta conversión', en: 'High conversion' } },
  { id: 5, category: 'branding', tag: 'Branding',      title: { es: 'Branding — Startup Tech', en: 'Branding — Tech Startup' },  desc: { es: 'Identidad moderna', en: 'Modern identity' } },
];

const TESTIMONIALS = [
  { initials: 'MA', name: 'María A.', role: { es: 'Restaurante, Oaxaca', en: 'Restaurant, Oaxaca' },
    text: { es: '"Desde que renovamos nuestra presencia digital, las llamadas de nuevos clientes se triplicaron."', en: '"Since we renewed our digital presence, calls from new clients tripled."' } },
  { initials: 'CR', name: 'Carlos R.', role: { es: 'Despacho Contable, Oaxaca', en: 'Accounting Firm, Oaxaca' },
    text: { es: '"El SEO nos puso en el top 3 de Google en menos de 2 meses. La inversión se recuperó rapidísimo."', en: '"The SEO put us in the top 3 on Google in less than 2 months. The investment was recovered quickly."' } },
  { initials: 'LG', name: 'Lucía G.', role: { es: 'Boutique, Oaxaca', en: 'Boutique, Oaxaca' },
    text: { es: '"La atención es increíble. El branding le dio una imagen totalmente profesional a mi negocio."', en: '"The attention is incredible. The branding gave my business a totally professional image."' } },
];

// ── CSS-in-JS (inline styles) ──────────────────────
const colors = {
  bg:         '#080B10',
  bgSec:      '#0D1117',
  bgCard:     '#111820',
  accent:     '#00DCC8',
  accent2:    '#5B6BF8',
  border:     'rgba(0,220,200,0.12)',
  borderH:    'rgba(0,220,200,0.35)',
  textPri:    '#F0F4F8',
  textSec:    '#8A9BAE',
  textMuted:  '#4A5568',
};

const s = {
  // Layout
  page:     { background: colors.bg, color: colors.textPri, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" },
  container:{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' },
  section:  { padding: '6rem 0' },
  flex:     { display: 'flex', alignItems: 'center' },
  // Text
  label:    { fontFamily: "'Syne', sans-serif", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' },
  h2:       { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: colors.textPri },
  // Card
  card:     { background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 16, padding: '2rem', transition: 'all 0.3s ease', cursor: 'default' },
  // Button
  btnPri:   { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', background: colors.accent, color: '#080B10', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: `0 0 24px rgba(0,220,200,0.25)` },
  btnGhost: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', background: 'transparent', color: colors.textPri, border: `1px solid ${colors.border}`, cursor: 'pointer', transition: 'all 0.3s ease' },
};

// ── Hook: useReveal (IntersectionObserver) ─────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Reveal wrapper ─────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Service Card ───────────────────────────────────
function ServiceCard({ service, lang, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        style={{ ...s.card, borderColor: hovered ? colors.borderH : colors.border, transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? `0 0 40px rgba(0,220,200,0.15)` : 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ width: 50, height: 50, borderRadius: 8, background: hovered ? colors.accent : 'rgba(0,220,200,0.08)', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem', transition: 'all 0.3s ease', boxShadow: hovered ? `0 0 20px rgba(0,220,200,0.25)` : 'none' }}>
          {service.icon}
        </div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem', color: colors.textPri }}>{service.title[lang]}</h3>
        <p style={{ color: colors.textSec, fontSize: '0.92rem', lineHeight: 1.7 }}>{service.desc[lang]}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
          {service.tags.map(t => (
            <span key={t} style={{ fontSize: '0.72rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, padding: '0.2rem 0.65rem', borderRadius: 100, border: `1px solid ${colors.border}`, color: colors.textMuted }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ── Portfolio Item ─────────────────────────────────
function PortfolioItem({ item, lang }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', background: colors.bgCard, border: `1px solid ${hovered ? colors.borderH : colors.border}`, transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: hovered ? `0 0 40px rgba(0,220,200,0.15)` : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: '100%', aspectRatio: '16/10', background: 'linear-gradient(135deg, rgba(0,220,200,0.07), rgba(91,107,248,0.07))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted, fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }}>
        IMAGEN DEL PROYECTO
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,11,16,0.95) 0%, transparent 60%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
        <span style={{ fontSize: '0.7rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, color: colors.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{item.tag}</span>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', marginBottom: '0.3rem', color: colors.textPri }}>{item.title[lang]}</h3>
        <p style={{ fontSize: '0.82rem', color: colors.textSec }}>{item.desc[lang]}</p>
      </div>
    </div>
  );
}

// ── NAVBAR ─────────────────────────────────────────
function Navbar({ lang, onToggleLang, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navStyle = { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? '0.85rem 0' : '1.25rem 0', background: scrolled ? 'rgba(8,11,16,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${colors.border}` : 'none', transition: 'all 0.3s ease' };

  const navItems = [
    { href: '#hero',       es: 'Inicio',        en: 'Home' },
    { href: '#sobre',      es: 'Sobre Nosotros', en: 'About Us' },
    { href: '#servicios',  es: 'Servicios',      en: 'Services' },
    { href: '#portafolio', es: 'Portafolio',     en: 'Portfolio' },
    { href: '#blog',       es: 'Blog',           en: 'Blog' },
    { href: '#contacto',   es: 'Contacto',       en: 'Contact' },
  ];

  return (
    <nav style={navStyle}>
      <div style={{ ...s.container, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#hero" style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: colors.textPri, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Nexo<span style={{ display: 'inline-block', width: 8, height: 8, background: colors.accent, borderRadius: '50%', marginBottom: 2, boxShadow: `0 0 10px ${colors.accent}` }}></span>Digital
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map(item => (
            <li key={item.href} style={{ display: 'none' }}
              className="nav-desktop-item"
            >
              <a href={item.href} style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.88rem', fontWeight: 600, color: colors.textSec, textDecoration: 'none' }}
                onClick={e => { e.preventDefault(); onNav(item.href); }}>
                {item[lang]}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={onToggleLang} style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 700, padding: '0.4rem 0.9rem', border: `1px solid ${colors.border}`, borderRadius: 8, background: 'transparent', color: colors.textSec, cursor: 'pointer' }}>
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contacto" style={{ ...s.btnPri, padding: '0.6rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}
            onClick={e => { e.preventDefault(); onNav('#contacto'); }}>
            {lang === 'es' ? 'Cotizar' : 'Get Quote'}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── MAIN APP ───────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('es');
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [formSent, setFormSent] = useState(false);

  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es');

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };

  const filteredPortfolio = portfolioFilter === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category === portfolioFilter);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3500);
  };

  // Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={s.page}>
      <Navbar lang={lang} onToggleLang={toggleLang} onNav={scrollTo} />

      {/* ── HERO ── */}
      <section id="hero" style={{ ...s.section, paddingTop: '8rem', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', width: 500, height: 500, top: -100, right: -100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,220,200,0.18) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, bottom: -50, left: -80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,107,248,0.14) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

        <div style={s.container}>
          <div style={{ maxWidth: 680 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', border: `1px solid ${colors.border}`, borderRadius: 100, fontSize: '0.8rem', color: colors.textSec, marginBottom: '1.5rem', background: 'rgba(0,220,200,0.08)' }}>
              <span style={{ width: 7, height: 7, background: colors.accent, borderRadius: '50%', animation: 'pulse 2s ease infinite' }} />
              {lang === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: colors.textPri }}>
              {lang === 'es' ? 'Tu negocio,' : 'Your business,'}<br />
              <span style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {lang === 'es' ? 'conectado' : 'connected'}
              </span><br />
              {lang === 'es' ? 'al mundo digital' : 'to the digital world'}
            </h1>

            <p style={{ fontSize: '1.15rem', color: colors.textSec, marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: 500 }}>
              {lang === 'es'
                ? 'Diseñamos presencias digitales que convierten visitantes en clientes. Sitios web, SEO, marketing digital y branding para negocios en Oaxaca y todo México.'
                : 'We design digital presences that turn visitors into customers. Websites, SEO, digital marketing and branding for businesses in Oaxaca and all of Mexico.'}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={s.btnPri} onClick={() => scrollTo('#contacto')}>
                🚀 {lang === 'es' ? 'Quiero cotizar' : 'Get a quote'}
              </button>
              <button style={s.btnGhost} onClick={() => scrollTo('#portafolio')}>
                {lang === 'es' ? 'Ver proyectos' : 'See projects'}
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: `1px solid ${colors.border}`, flexWrap: 'wrap' }}>
              {[
                { num: '+30', label: lang === 'es' ? 'Proyectos' : 'Projects' },
                { num: '100%', label: lang === 'es' ? 'Clientes satisfechos' : 'Happy clients' },
                { num: '3x', label: lang === 'es' ? 'Más visibilidad' : 'More visibility' },
              ].map(stat => (
                <div key={stat.label}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, color: colors.accent, display: 'block' }}>{stat.num}</span>
                  <span style={{ fontSize: '0.82rem', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ ...s.section }}>
        <div style={s.container}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 4rem' }}>
              <div style={s.label}>— {lang === 'es' ? 'Servicios' : 'Services'}</div>
              <h2 style={s.h2}>{lang === 'es' ? 'Todo lo que tu negocio necesita para crecer online' : 'Everything your business needs to grow online'}</h2>
              <p style={{ color: colors.textSec, marginTop: '1rem' }}>
                {lang === 'es' ? 'Desde una landing page hasta una estrategia digital completa. Desde $5,000 MXN.' : 'From a landing page to a complete digital strategy. From $5,000 MXN.'}
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {SERVICES.map((svc, i) => <ServiceCard key={i} service={svc} lang={lang} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── PORTAFOLIO ── */}
      <section id="portafolio" style={{ ...s.section, background: colors.bgSec }}>
        <div style={s.container}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div style={s.label}>— {lang === 'es' ? 'Portafolio' : 'Portfolio'}</div>
                <h2 style={s.h2}>{lang === 'es' ? 'Proyectos que generan resultados' : 'Projects that generate results'}</h2>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { val: 'all',      es: 'Todos',       en: 'All' },
                  { val: 'web',      es: 'Diseño Web',  en: 'Web Design' },
                  { val: 'branding', es: 'Branding',    en: 'Branding' },
                  { val: 'seo',      es: 'SEO',         en: 'SEO' },
                ].map(f => (
                  <button key={f.val}
                    onClick={() => setPortfolioFilter(f.val)}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: 100, fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, border: `1px solid ${portfolioFilter === f.val ? colors.accent : colors.border}`, background: portfolioFilter === f.val ? colors.accent : 'transparent', color: portfolioFilter === f.val ? '#080B10' : colors.textSec, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    {f[lang]}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredPortfolio.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <PortfolioItem item={item} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" style={{ ...s.section }}>
        <div style={s.container}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 4rem' }}>
              <div style={s.label}>— {lang === 'es' ? 'Testimonios' : 'Testimonials'}</div>
              <h2 style={s.h2}>{lang === 'es' ? 'Lo que dicen nuestros clientes' : 'What our clients say'}</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={s.card}>
                  <div style={{ color: colors.accent, fontSize: '0.9rem', letterSpacing: 2, marginBottom: '1rem' }}>★★★★★</div>
                  <p style={{ color: colors.textSec, fontSize: '0.95rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>{t.text[lang]}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#080B10', flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.9rem', fontWeight: 700, display: 'block', color: colors.textPri }}>{t.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: colors.textMuted }}>{t.role[lang]}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ ...s.section, background: colors.bgSec }}>
        <div style={s.container}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>
            <Reveal>
              <div>
                <div style={s.label}>— {lang === 'es' ? 'Contacto' : 'Contact'}</div>
                <h2 style={s.h2}>{lang === 'es' ? '¿Listo para crecer? Hablemos.' : 'Ready to grow? Let\'s talk.'}</h2>
                <p style={{ color: colors.textSec, marginTop: '1rem', marginBottom: '2rem' }}>
                  {lang === 'es' ? 'Cuéntame sobre tu proyecto y te doy una respuesta en menos de 24 horas.' : 'Tell me about your project and I\'ll get back to you in less than 24 hours.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { href: 'mailto:nexodigital@gmail.com', icon: '📧', label: 'Gmail', sub: 'nexodigital@gmail.com' },
                    { href: 'https://instagram.com/nexodigital', icon: '📸', label: 'Instagram', sub: '@nexodigital' },
                    { href: 'https://facebook.com/nexodigital', icon: '👍', label: 'Facebook', sub: '/nexodigital' },
                    { href: 'https://wa.me/529511234567', icon: '💬', label: 'WhatsApp', sub: lang === 'es' ? 'Respuesta rápida' : 'Quick response' },
                  ].map(m => (
                    <a key={m.label} href={m.href} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: `1px solid ${colors.border}`, borderRadius: 8, background: colors.bgCard, transition: 'all 0.3s ease', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0,220,200,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{m.icon}</div>
                      <div>
                        <strong style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: colors.textPri }}>{m.label}</strong>
                        <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>{m.sub}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ ...s.card, borderRadius: 24, padding: '2.5rem' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.75rem', color: colors.textPri }}>
                  {lang === 'es' ? 'Cuéntame sobre tu proyecto 👋' : 'Tell me about your project 👋'}
                </p>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { label: lang === 'es' ? 'Nombre' : 'Name', ph: lang === 'es' ? 'Tu nombre' : 'Your name' },
                      { label: lang === 'es' ? 'Negocio' : 'Business', ph: lang === 'es' ? 'Tu negocio' : 'Your business' },
                    ].map(f => (
                      <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                        <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', color: colors.textSec, textTransform: 'uppercase' }}>{f.label}</label>
                        <input type="text" placeholder={f.ph} style={{ background: colors.bgSec, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '0.85rem 1rem', color: colors.textPri, fontFamily: "'DM Sans', sans-serif", outline: 'none' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', color: colors.textSec, textTransform: 'uppercase' }}>{lang === 'es' ? 'Correo o WhatsApp' : 'Email or WhatsApp'}</label>
                    <input type="text" placeholder={lang === 'es' ? 'Para responderte' : 'To reply to you'} style={{ background: colors.bgSec, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '0.85rem 1rem', color: colors.textPri, fontFamily: "'DM Sans', sans-serif", outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', color: colors.textSec, textTransform: 'uppercase' }}>{lang === 'es' ? 'Cuéntame más' : 'Tell me more'}</label>
                    <textarea placeholder={lang === 'es' ? '¿Qué necesitas? ¿Tienes fecha límite?' : 'What do you need? Any deadline?'} style={{ background: colors.bgSec, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '0.85rem 1rem', color: colors.textPri, fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'vertical', minHeight: 110 }} />
                  </div>
                  <button type="submit" style={{ ...s.btnPri, width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem', background: formSent ? '#22c55e' : colors.accent }}>
                    {formSent
                      ? (lang === 'es' ? '✅ ¡Enviado! Pronto me pondré en contacto.' : '✅ Sent! I\'ll be in touch soon.')
                      : (lang === 'es' ? 'Enviar y cotizar 🚀' : 'Send and get a quote 🚀')}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: colors.bgSec, borderTop: `1px solid ${colors.border}`, padding: '3rem 0 2rem' }}>
        <div style={{ ...s.container, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="#hero" style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: colors.textPri, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Nexo<span style={{ display: 'inline-block', width: 7, height: 7, background: colors.accent, borderRadius: '50%', marginBottom: 2, boxShadow: `0 0 8px ${colors.accent}` }}></span>Digital
          </a>
          <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
            © 2025 Nexo Digital — {lang === 'es' ? 'Oaxaca, México 🇲🇽' : 'Oaxaca, Mexico 🇲🇽'}
          </p>
          <p style={{ fontSize: '0.82rem', color: colors.textMuted }}>
            {lang === 'es' ? 'Hecho con' : 'Made with'} <span style={{ color: colors.accent }}>❤️</span> {lang === 'es' ? 'en Oaxaca' : 'in Oaxaca'}
          </p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/529511234567?text=Hola,%20vi%20tu%20portafolio%20y%20me%20interesa%20cotizar" target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: 56, height: 56, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', zIndex: 1000, fontSize: '1.6rem' }}>
        💬
      </a>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.7; transform:scale(1.3); }
        }
      `}</style>
    </div>
  );
}
