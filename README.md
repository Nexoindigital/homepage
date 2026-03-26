# 🚀 NEXO DIGITAL — Portafolio Web

## 📁 Estructura de Archivos

```
nexo-digital/
│
├── index.html              ← Página principal (HTML puro)
│
├── css/
│   ├── styles.css          ← Variables, reset, tipografía, botones, utilidades
│   ├── navbar.css          ← Estilos del menú de navegación
│   └── sections.css        ← Estilos de cada sección (Hero, Servicios, etc.)
│
├── js/
│   └── main.js             ← JavaScript: navbar, animaciones, idioma, portafolio, formulario
│
├── react/
│   └── App.jsx             ← Versión React standalone (prueba/preview)
│
└── img/                    ← (Crea esta carpeta para tus imágenes)
    ├── foto-perfil.jpg
    └── proyectos/
        ├── proyecto-1.jpg
        └── ...
```

---

## 🎨 Paleta de Colores
| Elemento       | Color       |
|----------------|-------------|
| Fondo primario | `#080B10`   |
| Fondo cards    | `#111820`   |
| Acento cian    | `#00DCC8`   |
| Acento morado  | `#5B6BF8`   |
| Texto primario | `#F0F4F8`   |
| Texto secundario | `#8A9BAE` |

---

## ✅ Funcionalidades incluidas

- [x] Navbar fija con efecto glassmorphism al scroll
- [x] Menú hamburguesa en móvil
- [x] Botón ES / EN para cambiar idioma
- [x] Hero con animación flotante y stats con contador
- [x] Sección Sobre Nosotros con valores
- [x] 6 tarjetas de servicios con hover effects
- [x] Portafolio filtrable por categoría
- [x] Proceso de trabajo (4 pasos)
- [x] Testimonios de clientes
- [x] Blog con 3 artículos de ejemplo
- [x] Formulario de contacto
- [x] Botones de contacto: Gmail, Instagram, Facebook, WhatsApp
- [x] Botón flotante de WhatsApp
- [x] Footer completo con navegación
- [x] Animaciones de scroll reveal
- [x] 100% Responsive (móvil, tablet, desktop)

---

## 🔧 Personalización rápida

### 1. Cambia tu número de WhatsApp
Busca `529511234567` en todos los archivos y reemplázalo con tu número real.

### 2. Cambia tu email
Busca `nexodigital@gmail.com` y reemplázalo.

### 3. Agrega tus imágenes de proyectos
En `index.html`, busca los divs con clase `portfolio-thumb-placeholder` y reemplázalos:
```html
<!-- ANTES -->
<div class="portfolio-thumb-placeholder">IMAGEN DEL PROYECTO</div>

<!-- DESPUÉS -->
<img src="img/proyectos/tu-proyecto.jpg" alt="Nombre del proyecto" class="portfolio-thumb" />
```

### 4. Actualiza la foto de perfil (sección Sobre Nosotros)
Descomenta esta línea en `index.html`:
```html
<!-- <img src="img/foto-perfil.jpg" alt="Nexo Digital" /> -->
```

### 5. Cambia las estadísticas del Hero
Busca `.stat-num` en `index.html` y actualiza los números.

---

## ⚛️ Versión React

Para usar `App.jsx`:
```bash
npm create vite@latest nexo-react -- --template react
cd nexo-react
npm install
# Copia App.jsx a src/App.jsx
npm run dev
```

---

## 📱 Secciones del sitio

1. **#hero**        → Inicio / llamada a la acción principal
2. **#sobre**       → Sobre Nexo Digital (valores, propuesta de valor)
3. **#servicios**   → 6 servicios con descripción y tags
4. **#portafolio**  → Galería filtrable de proyectos
5. **#proceso**     → 4 pasos del proceso de trabajo
6. **#testimonios** → 3 testimonios de clientes
7. **#blog**        → 3 artículos del blog
8. **#contacto**    → Formulario + botones de contacto

---

## 💡 Próximos pasos sugeridos

- [ ] Conectar el formulario a EmailJS o Formspree para recibir emails reales
- [ ] Subir a GitHub Pages, Netlify o Vercel (gratis)
- [ ] Agregar Google Analytics para rastrear visitas
- [ ] Crear un dominio: `nexodigital.mx`
- [ ] Agregar más proyectos reales al portafolio
- [ ] Escribir los primeros artículos del blog

---

**Desarrollado con ❤️ — Nexo Digital, Oaxaca 🇲🇽**
