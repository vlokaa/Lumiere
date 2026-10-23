// ===== Lumière: dark / light mode (JS only) =====
// Walang babaguhin sa CSS. Ang JS na ang gumagawa ng toggle button
// at nag-iinject ng dark mode styles (kasama yung faded orange lighting).

(function () {
  "use strict";

  const STORAGE_KEY = "lumiere-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  let toggle = null;

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function save(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* hindi langma-save */ }
  }

  // ---------- Styles na ini-inject ng JS ----------
  const THEME_CSS = `
/* Toggle button */
.header-actions { display: flex; align-items: center; gap: 0.8rem; }

#theme-toggle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--orange);
  background: transparent;
  color: var(--orange);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(242, 106, 27, 0.35);
  transition: background 0.2s, color 0.2s;
}
#theme-toggle:hover { background: var(--orange); color: var(--white); }

#form-status {
  min-height: 1.5em;
  margin: 0.6rem 0 0;
  font-weight: 500;
  color: var(--orange-deep);
}

/* Smooth na palit ng theme */
body, header, main > section, .feature-list article, .gallery-grid figure,
blockquote, form, input, textarea, body > footer {
  transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}

/* Dark mode */
:root[data-theme="dark"] {
  color-scheme: dark;
  --warm-white: #1a0d06;
  --peach: #3a1b0c;
  --ink: #ffeadb;
  --orange-deep: #ff9a4d;
  --surface: #25120a;
  --shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
}

:root[data-theme="dark"] header {
  background: var(--surface);
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
}

:root[data-theme="dark"] .feature-list article,
:root[data-theme="dark"] blockquote,
:root[data-theme="dark"] form,
:root[data-theme="dark"] #gallery { background: var(--surface); }

:root[data-theme="dark"] #about > img { border-color: var(--peach); }

:root[data-theme="dark"] .btn:hover,
:root[data-theme="dark"] button[type="submit"]:hover { background: #d9540f; }

:root[data-theme="dark"] .btn-secondary { color: #c94d0a; }
:root[data-theme="dark"] .btn-secondary:hover { color: var(--white); background: transparent; }


:root[data-theme="dark"] body > footer { background: #0e0603; color: #ffe3cc; }

/* Faded orange lighting, andito pa rin sa dark mode */
:root[data-theme="dark"] #features::before {
  background: radial-gradient(circle at 95% 0%, rgba(242, 106, 27, 0.34), transparent 55%);
}
:root[data-theme="dark"] #about::before {
  background: radial-gradient(circle at 0% 50%, rgba(242, 106, 27, 0.38), transparent 55%);
}

/* ===== Dark mode: black hero with orange light ===== */
:root[data-theme="dark"] #hero {
  background: #090604;
  color: #fff3e6;
}

:root[data-theme="dark"] #hero::before {
  background:
    radial-gradient(ellipse 55% 75% at 78% 45%, rgba(242, 106, 27, 0.6), transparent 70%),
    radial-gradient(ellipse 70% 40% at 50% 115%, rgba(255, 140, 60, 0.38), transparent 70%),
    radial-gradient(circle at 10% 0%, rgba(242, 106, 27, 0.14), transparent 45%);
}

:root[data-theme="dark"] #hero h1 {
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #fff3e6;
  text-shadow: 0 0 45px rgba(242, 106, 27, 0.4);
}

:root[data-theme="dark"] #hero p { color: rgba(255, 243, 230, 0.78); }

:root[data-theme="dark"] #hero .btn {
  background: var(--orange);
  color: #fff;
  box-shadow: 0 0 26px rgba(242, 106, 27, 0.55);
}
:root[data-theme="dark"] #hero .btn:hover {
  background: #ff8a3d;
  box-shadow: 0 0 36px rgba(255, 138, 61, 0.75);
}

:root[data-theme="dark"] #hero .btn-secondary {
  background: transparent;
  color: #fff3e6;
  border-color: rgba(255, 200, 150, 0.55);
}
:root[data-theme="dark"] #hero .btn-secondary:hover {
  background: #fff3e6;
  color: #090604;
  border-color: #fff3e6;
}

:root[data-theme="dark"] #hero > img {
  border: 1px solid rgba(255, 190, 130, 0.6);
  box-shadow: 0 0 90px rgba(242, 106, 27, 0.55), 0 30px 60px rgba(0, 0, 0, 0.6);
}

/* ===== Light mode: ivory hero with orange light ===== */
:root[data-theme="light"] #hero {
  background: #fff7ef;
  color: #3b1507;
}

:root[data-theme="light"] #hero::before {
  background:
    radial-gradient(ellipse 55% 75% at 78% 45%, rgba(242, 106, 27, 0.38), transparent 70%),
    radial-gradient(ellipse 70% 40% at 50% 115%, rgba(255, 150, 80, 0.3), transparent 70%),
    radial-gradient(circle at 10% 0%, rgba(255, 190, 130, 0.35), transparent 45%);
}

:root[data-theme="light"] #hero h1 {
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #3b1507;
  text-shadow: 0 0 40px rgba(242, 106, 27, 0.22);
}

:root[data-theme="light"] #hero p { color: rgba(59, 21, 7, 0.8); }

:root[data-theme="light"] #hero .btn {
  background: var(--orange);
  color: #fff;
  box-shadow: 0 0 24px rgba(242, 106, 27, 0.45);
}
:root[data-theme="light"] #hero .btn:hover {
  background: #c94d0a;
  box-shadow: 0 0 32px rgba(242, 106, 27, 0.6);
}

:root[data-theme="light"] #hero .btn-secondary {
  background: transparent;
  color: #c94d0a;
  border-color: rgba(201, 77, 10, 0.5);
}
:root[data-theme="light"] #hero .btn-secondary:hover {
  background: #c94d0a;
  color: #fff;
  border-color: #c94d0a;
}

:root[data-theme="light"] #hero > img {
  border: 1px solid rgba(201, 77, 10, 0.35);
  box-shadow: 0 0 80px rgba(242, 106, 27, 0.35), 0 24px 50px rgba(120, 50, 10, 0.18);
}


/* ===== Testimonials: colors flow from gallery -> orange light -> contact ===== */

/* Neighbour glows pulled away from the edges so the seams are plain colors */
:root[data-theme] #gallery::before {
  background: radial-gradient(ellipse 45% 50% at 8% 50%, rgba(242, 106, 27, 0.28), transparent 100%);
}
:root[data-theme] #contact::before {
  background: radial-gradient(ellipse 55% 45% at 50% 45%, rgba(242, 106, 27, 0.28), transparent 100%);
}

/* Dark mode: top = gallery color, bottom = contact color, orange light in the middle */
:root[data-theme="dark"] #testimonials {
  background: linear-gradient(to bottom, var(--surface) 0%, var(--warm-white) 100%);
}
:root[data-theme="dark"] #testimonials::before {
  background:
    radial-gradient(ellipse 90% 60% at 50% 50%,
      rgba(242, 106, 27, 0.8) 0%,
      rgba(200, 75, 12, 0.55) 40%,
      rgba(120, 45, 8, 0.24) 65%,
      transparent 85%),
    radial-gradient(ellipse 35% 25% at 50% 42%, rgba(255, 170, 100, 0.22), transparent 100%);
}
:root[data-theme="dark"] #testimonials h2 {
  text-shadow: 0 0 40px rgba(242, 106, 27, 0.5);
}
:root[data-theme="dark"] blockquote {
  background: rgba(24, 11, 5, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 154, 77, 0.28);
  box-shadow: 0 0 44px rgba(242, 106, 27, 0.25), 0 20px 40px rgba(0, 0, 0, 0.45);
}

/* Light mode: top = white (gallery), bottom = ivory (contact), orange light in the middle */
:root[data-theme="light"] #testimonials {
  background: linear-gradient(to bottom, var(--white) 0%, var(--warm-white) 100%);
  color: var(--ink);
}
:root[data-theme="light"] #testimonials::before {
  background: radial-gradient(ellipse 90% 60% at 50% 50%,
    rgba(242, 106, 27, 0.72) 0%,
    rgba(255, 140, 70, 0.5) 40%,
    rgba(255, 190, 130, 0.25) 65%,
    transparent 85%);
}
:root[data-theme="light"] blockquote {
  border: 1px solid rgba(201, 77, 10, 0.18);
}

/* ===== About: colors flow from features (above) to gallery (below) ===== */
:root[data-theme="dark"] #about {
  background: linear-gradient(to bottom,
    var(--warm-white) 0%, var(--peach) 22%, var(--peach) 78%, var(--surface) 100%);
}
:root[data-theme="light"] #about {
  background: linear-gradient(to bottom,
    var(--warm-white) 0%, var(--peach) 22%, var(--peach) 78%, var(--white) 100%);
}

/* Glow stays inside the section so it never touches the top/bottom edges */
:root[data-theme="dark"] #about::before {
  background: radial-gradient(ellipse 60% 50% at 0% 50%, rgba(242, 106, 27, 0.38), transparent 100%);
}
:root[data-theme="light"] #about::before {
  background: radial-gradient(ellipse 60% 50% at 0% 50%, rgba(242, 106, 27, 0.3), transparent 100%);
}

/* ===== Features: glow stays inside the section, so no line at the top or bottom ===== */
:root[data-theme="dark"] #features::before {
  background: radial-gradient(ellipse 60% 50% at 95% 50%, rgba(242, 106, 27, 0.34), transparent 100%);
}
:root[data-theme="light"] #features::before {
  background: radial-gradient(ellipse 60% 50% at 95% 50%, rgba(242, 106, 27, 0.25), transparent 100%);
}

/* ===== Gallery: pictures lift and glow on hover ===== */
.gallery-grid figure {
  transition:
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.5s ease,
    background-color 0.4s ease,
    color 0.4s ease,
    border-color 0.4s ease;
  will-change: transform;
}

.gallery-grid img {
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.gallery-grid figcaption {
  transition: letter-spacing 0.4s ease, color 0.4s ease;
}

.gallery-grid figure:hover,
.gallery-grid figure:active {
  transform: translateY(-14px);
  box-shadow: 0 0 44px rgba(242, 106, 27, 0.5), 0 28px 50px rgba(0, 0, 0, 0.35);
}

.gallery-grid figure:hover img,
.gallery-grid figure:active img {
  transform: scale(1.08);
}

.gallery-grid figure:hover figcaption,
.gallery-grid figure:active figcaption {
  letter-spacing: 0.05em;
}

:root[data-theme="light"] .gallery-grid figure:hover,
:root[data-theme="light"] .gallery-grid figure:active {
  box-shadow: 0 0 36px rgba(242, 106, 27, 0.35), 0 24px 44px rgba(120, 50, 10, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .gallery-grid figure:hover,
  .gallery-grid figure:active,
  .gallery-grid figure:hover img,
  .gallery-grid figure:active img { transform: none; }
}

/* ===== Features + What people say: cards lift and glow on hover ===== */
.feature-list article,
.testimonial-list blockquote {
  transition:
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.5s ease,
    background-color 0.4s ease,
    color 0.4s ease,
    border-color 0.4s ease;
  will-change: transform;
}

.feature-list article:hover,
.feature-list article:active {
  transform: translateY(-12px);
  box-shadow: 0 0 40px rgba(242, 106, 27, 0.45), 0 24px 44px rgba(0, 0, 0, 0.3);
}

:root[data-theme] .testimonial-list blockquote:hover,
:root[data-theme] .testimonial-list blockquote:active {
  transform: translateY(-12px);
  box-shadow: 0 0 48px rgba(242, 106, 27, 0.55), 0 24px 44px rgba(0, 0, 0, 0.4);
}

:root[data-theme="dark"] .testimonial-list blockquote:hover,
:root[data-theme="dark"] .testimonial-list blockquote:active {
  border-color: rgba(255, 154, 77, 0.65);
}

:root[data-theme="light"] .feature-list article:hover,
:root[data-theme="light"] .feature-list article:active {
  box-shadow: 0 0 36px rgba(242, 106, 27, 0.35), 0 24px 44px rgba(120, 50, 10, 0.2);
}

:root[data-theme="light"] .testimonial-list blockquote:hover,
:root[data-theme="light"] .testimonial-list blockquote:active {
  border-color: rgba(201, 77, 10, 0.5);
  box-shadow: 0 0 40px rgba(242, 106, 27, 0.4), 0 24px 44px rgba(120, 50, 10, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .feature-list article:hover,
  .feature-list article:active,
  :root[data-theme] .testimonial-list blockquote:hover,
  :root[data-theme] .testimonial-list blockquote:active { transform: none; }
}

/* ===== Glow that slowly fades out and fades back in (each section on its own timing) ===== */
@keyframes lumiere-glow {
  from { opacity: var(--glow-min, 0.3); }
  to   { opacity: 1; }
}

#features::before     { --glow-min: 0.25; animation: lumiere-glow 6s ease-in-out -1s infinite alternate; }
#about::before        { --glow-min: 0.3;  animation: lumiere-glow 7s ease-in-out -3s infinite alternate; }
#gallery::before      { --glow-min: 0.3;  animation: lumiere-glow 8s ease-in-out -5s infinite alternate; }
#testimonials::before { --glow-min: 0.5;  animation: lumiere-glow 7s ease-in-out -2s infinite alternate; }
#contact::before      { --glow-min: 0.3;  animation: lumiere-glow 9s ease-in-out -4s infinite alternate; }

@media (prefers-reduced-motion: reduce) {
  #features::before,
  #about::before,
  #gallery::before,
  #testimonials::before,
  #contact::before { animation: none; }
}

/* ===== Light mode: richer, warmer colors ===== */
:root[data-theme="light"] {
  --warm-white: #fff5e9;
  --white: #fffcf8;
  --peach: #ffd9b5;
  --ink: #3a1405;
  --shadow: 0 14px 40px rgba(242, 106, 27, 0.2), 0 2px 8px rgba(120, 50, 10, 0.08);
}

/* Header: warm frosted glass */
:root[data-theme="light"] header {
  background: rgba(255, 248, 238, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 rgba(242, 106, 27, 0.2), 0 10px 30px rgba(242, 106, 27, 0.12);
}

/* Hero: stronger orange light on warm ivory */
:root[data-theme="light"] #hero {
  background: #fff3e4;
}
:root[data-theme="light"] #hero::before {
  background:
    radial-gradient(ellipse 55% 75% at 78% 45%, rgba(242, 106, 27, 0.55), transparent 70%),
    radial-gradient(ellipse 70% 40% at 50% 115%, rgba(255, 140, 60, 0.42), transparent 70%),
    radial-gradient(circle at 10% 0%, rgba(255, 196, 130, 0.55), transparent 45%);
}

/* Section glows: deeper orange */
:root[data-theme="light"] #features::before {
  background: radial-gradient(ellipse 60% 50% at 95% 50%, rgba(242, 106, 27, 0.38), transparent 100%);
}
:root[data-theme="light"] #about::before {
  background: radial-gradient(ellipse 60% 50% at 0% 50%, rgba(242, 106, 27, 0.42), transparent 100%);
}
:root[data-theme="light"] #gallery::before {
  background: radial-gradient(ellipse 45% 50% at 8% 50%, rgba(242, 106, 27, 0.4), transparent 100%);
}
:root[data-theme="light"] #contact::before {
  background: radial-gradient(ellipse 55% 45% at 50% 45%, rgba(242, 106, 27, 0.4), transparent 100%);
}
:root[data-theme="light"] #testimonials::before {
  background: radial-gradient(ellipse 90% 60% at 50% 50%,
    rgba(234, 88, 12, 0.85) 0%,
    rgba(255, 128, 50, 0.6) 40%,
    rgba(255, 184, 120, 0.32) 65%,
    transparent 85%);
}

/* Headings: dark espresso fading into burnt orange */
:root[data-theme="light"] #features h2,
:root[data-theme="light"] #about h2,
:root[data-theme="light"] #gallery h2,
:root[data-theme="light"] #contact h2 {
  width: fit-content;
  background: linear-gradient(100deg, #3a1405 0%, #b84408 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Buttons: orange gradient */
:root[data-theme="light"] .btn,
:root[data-theme="light"] #hero .btn,
:root[data-theme="light"] button[type="submit"] {
  background: linear-gradient(135deg, #ff8a3d 0%, #f2661a 55%, #d9540f 100%);
  color: #fff;
}
:root[data-theme="light"] .btn:hover,
:root[data-theme="light"] #hero .btn:hover,
:root[data-theme="light"] button[type="submit"]:hover {
  background: linear-gradient(135deg, #ff9a4d 0%, #f2661a 50%, #c94d0a 100%);
}

/* Cards + form */
:root[data-theme="light"] .feature-list article {
  background: linear-gradient(180deg, #ffffff 0%, #fff8ef 100%);
}
:root[data-theme="light"] form {
  border: 1px solid rgba(242, 106, 27, 0.28);
}

/* Footer: deep espresso with an orange hairline */
:root[data-theme="light"] body > footer {
  background: linear-gradient(180deg, #3a1405 0%, #260c03 100%);
  border-top: 1px solid rgba(255, 154, 77, 0.35);
  color: #ffd9b5;
}

/* ===== Contact heading: keep it centered in light mode ===== */
:root[data-theme="light"] #contact h2 {
  margin-left: auto;
  margin-right: auto;
}

/* ===== Light mode v2: champagne + amber + orange ===== */
:root[data-theme="light"] #features::before {
  background:
    radial-gradient(ellipse 55% 50% at 95% 50%, rgba(242, 106, 27, 0.4), transparent 100%),
    radial-gradient(ellipse 40% 35% at 12% 62%, rgba(255, 176, 60, 0.3), transparent 100%);
}
:root[data-theme="light"] #about::before {
  background:
    radial-gradient(ellipse 60% 50% at 0% 50%, rgba(242, 106, 27, 0.42), transparent 100%),
    radial-gradient(ellipse 35% 30% at 85% 30%, rgba(255, 176, 60, 0.3), transparent 100%);
}
:root[data-theme="light"] #gallery::before {
  background:
    radial-gradient(ellipse 45% 50% at 8% 50%, rgba(242, 106, 27, 0.4), transparent 100%),
    radial-gradient(ellipse 40% 35% at 92% 55%, rgba(255, 176, 60, 0.3), transparent 100%);
}
:root[data-theme="light"] #contact::before {
  background:
    radial-gradient(ellipse 55% 45% at 50% 45%, rgba(242, 106, 27, 0.4), transparent 100%),
    radial-gradient(ellipse 30% 30% at 85% 60%, rgba(255, 176, 60, 0.28), transparent 100%),
    radial-gradient(ellipse 30% 30% at 15% 35%, rgba(255, 176, 60, 0.25), transparent 100%);
}
:root[data-theme="light"] #testimonials::before {
  background:
    radial-gradient(ellipse 40% 25% at 25% 35%, rgba(255, 215, 150, 0.55), transparent 100%),
    radial-gradient(ellipse 90% 60% at 50% 50%,
      rgba(255, 138, 40, 0.9) 0%,
      rgba(234, 88, 12, 0.7) 38%,
      rgba(255, 184, 120, 0.35) 66%,
      transparent 85%);
}

/* Frosted warm-glass cards */
:root[data-theme="light"] blockquote {
  background: rgba(255, 252, 247, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.85);
}
:root[data-theme="light"] .feature-list article {
  border-left: 1px solid rgba(242, 106, 27, 0.14);
  border-right: 1px solid rgba(242, 106, 27, 0.14);
  border-bottom: 1px solid rgba(242, 106, 27, 0.14);
}

/* Image + form details */
:root[data-theme="light"] #about > img {
  border-color: var(--white);
  box-shadow: 0 24px 60px rgba(242, 106, 27, 0.32);
}
:root[data-theme="light"] input:focus,
:root[data-theme="light"] textarea:focus {
  box-shadow: 0 0 0 4px rgba(242, 106, 27, 0.18);
}
:root[data-theme="light"] ::selection {
  background: #ffb066;
  color: #3a1405;
}

/* ===== Scroll progress line under the nav bar ===== */
#scroll-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  transform: scaleX(0);
  transform-origin: left center;
  background: linear-gradient(90deg, #ffb03c, #f2661a 60%, #ff8a3d);
  box-shadow: 0 0 12px rgba(242, 106, 27, 0.8);
  pointer-events: none;
  will-change: transform;
}
`;

  // ---------- Tumatakbo agad (para walang flash) ----------
  if (!document.getElementById("lumiere-theme-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "lumiere-theme-styles";
    styleEl.textContent = THEME_CSS;
    document.head.appendChild(styleEl);
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
    }
  }

  applyTheme(getSaved() || (media.matches ? "dark" : "light"));

  // ---------- Kailangan na ng page elements ----------
  function init() {
    const header = document.querySelector("header");

    // Scroll progress line: grows as you scroll, full width at the end of the page
    if (header && !document.getElementById("scroll-progress")) {
      const bar = document.createElement("div");
      bar.id = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      header.appendChild(bar);

      let ticking = false;
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    }

    // Gumawa ng toggle button kung wala pa sa HTML
    toggle = document.getElementById("theme-toggle");
    if (!toggle && header) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.id = "theme-toggle";
      toggle.innerHTML = '<span class="theme-icon" aria-hidden="true"></span>';

      const cta = header.querySelector(":scope > .btn");
      if (cta) {
        const wrap = document.createElement("div");
        wrap.className = "header-actions";
        cta.before(wrap);
        wrap.append(toggle, cta);
      } else {
        header.append(toggle);
      }
    }
    if (!toggle) return;

    applyTheme(root.getAttribute("data-theme"));

    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      save(next);
    });

    // Sundan ang device setting hangga't wala pang pinipili ang user
    media.addEventListener("change", (e) => {
      if (!getSaved()) applyTheme(e.matches ? "dark" : "light");
    });

    // Contact form: confirmation message imbes na mag-reload
    const form = document.querySelector("#contact form");
    if (form) {
      let status = document.getElementById("form-status");
      if (!status) {
        status = document.createElement("p");
        status.id = "form-status";
        status.setAttribute("role", "status");
        form.appendChild(status);
      }
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.elements["name"] ? form.elements["name"].value.trim() : "";
        status.textContent = `Thanks${name ? ", " + name : ""}! We'll get back to you soon.`;
        form.reset();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();