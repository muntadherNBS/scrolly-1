/* =========================================================
   NBS (nbs.iq) runtime — language & theme, chrome, scroll scenes,
   canvas helper, maths, procedural glass profiles
   ========================================================= */
(function () {
  "use strict";
  const LOGO = "https://nbs.iq/wp-content/uploads/2025/07/cropped-Asset-64@72xd-270x270.png";
  const store = {
    get(k, d) { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const root = document.documentElement;
  const L = { lang: [], theme: [] };

  const M = {
    clamp: (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)),
    lerp: (a, b, t) => a + (b - a) * t,
    seg: (v, a, b) => Math.min(1, Math.max(0, (v - a) / (b - a))),
    easeOut: t => 1 - Math.pow(1 - t, 3),
    easeIn: t => t * t * t,
    easeInOut: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
    noise: (x, y) => (Math.sin(x * 1.7 + Math.sin(y * 1.3) * 1.1) + Math.sin(y * 2.1 + Math.sin(x * .7) * 1.7) * .7 + Math.sin((x + y) * .9) * .5) / 2.2
  };

  function applyLang(l) {
    root.lang = l; root.dir = l === "ar" ? "rtl" : "ltr"; store.set("nbsiq.lang", l);
    document.querySelectorAll("[data-ph-ar]").forEach(el => el.placeholder = el.dataset[l === "ar" ? "phAr" : "phEn"]);
    const tt = document.body && document.body.dataset[l === "ar" ? "titleAr" : "titleEn"]; if (tt) document.title = tt;
    L.lang.forEach(f => f(l));
  }
  function applyTheme(t) {
    root.dataset.theme = t; store.set("nbsiq.theme", t);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === "day" ? "#f2efe6" : "#0a1618";
    L.theme.forEach(f => f(t));
  }
  const NBS = {
    M, store, LOGO,
    get lang() { return root.lang === "en" ? "en" : "ar"; },
    get theme() { return root.dataset.theme === "day" ? "day" : "night"; },
    setLang: applyLang, setTheme: applyTheme,
    onLang: f => L.lang.push(f), onTheme: f => L.theme.push(f),
    t: o => o == null ? "" : typeof o === "string" ? o : (o[NBS.lang] ?? o.ar),
    css: n => getComputedStyle(root).getPropertyValue(n).trim(),
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    arDigits: s => String(s).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d])
  };

  const I = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    // chat bubble — WhatsApp is reached through our own turquoise, not its green
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 9.5Z" fill="currentColor" stroke="none"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };
  NBS.icons = I;

  const PAGES = [
    { id: "home", href: "index.html", ar: "الرئيسية", en: "Home" },
    { id: "glass", href: "glass.html", ar: "زجاج العطور", en: "Perfume Glass" },
    { id: "partners", href: "partners.html", ar: "الشركاء", en: "Partners" },
    { id: "about", href: "about.html", ar: "من نحن", en: "About" },
    { id: "contact", href: "contact.html", ar: "تواصل", en: "Contact" }
  ];
  NBS.mark = () => `<span class="mark"><img src="${LOGO}" alt="" onerror="this.parentNode.classList.add('noimg')"><span class="mono">ن</span></span>`;
  const bi = (ar, en) => `<span lang="ar">${ar}</span><span lang="en">${en}</span>`;
  NBS.bi = bi;

  function header() {
    const host = document.querySelector("[data-nbs-header]"); if (!host) return;
    const page = host.dataset.page, D = window.NBS_DATA;
    host.outerHTML = `
    <header class="hdr" id="hdr">
      <a class="brand" href="index.html">${NBS.mark()}<span class="brand-name"><b>${bi("نور النبراس", "Noor Al Nibras")}</b><small>SINCE 1980 · BAGHDAD</small></span></a>
      <nav class="nav" aria-label="Main">${PAGES.map(p => `<a href="${p.href}" ${p.id === page ? 'aria-current="page"' : ""}>${bi(p.ar, p.en)}</a>`).join("")}
        <a class="ext" href="${D.LIBRARY}" target="_blank" rel="noopener">${bi("مكتبة العطور", "Fragrance Library")}</a></nav>
      <div class="tools">
        <button class="pill" id="langBtn" aria-label="Language">${bi("EN", "عربي")}</button>
        <button class="pill" id="themeBtn" aria-label="Theme"></button>
        <a class="btn sm cta" href="contact.html">${I.chat}${bi("اطلب عرض سعر", "Get a quote")}</a>
        <button class="pill menu-btn" id="menuBtn" aria-label="Menu">${I.menu}</button>
      </div>
    </header>
    <div class="sheet" id="sheet" aria-hidden="true">
      <button class="pill close" id="closeBtn" aria-label="Close">${I.close}</button>
      ${PAGES.map(p => `<a href="${p.href}">${bi(p.ar, p.en)}</a>`).join("")}
      <a href="${D.LIBRARY}" target="_blank" rel="noopener">${bi("مكتبة العطور ↗", "Fragrance Library ↗")}</a>
    </div>`;
    const hdr = document.getElementById("hdr"), tb = document.getElementById("themeBtn");
    const paint = () => tb.innerHTML = NBS.theme === "night" ? I.sun : I.moon;
    paint(); NBS.onTheme(paint);
    tb.onclick = () => applyTheme(NBS.theme === "night" ? "day" : "night");
    document.getElementById("langBtn").onclick = () => applyLang(NBS.lang === "ar" ? "en" : "ar");
    const sh = document.getElementById("sheet");
    document.getElementById("menuBtn").onclick = () => { sh.classList.add("open"); sh.setAttribute("aria-hidden", "false"); };
    document.getElementById("closeBtn").onclick = () => { sh.classList.remove("open"); sh.setAttribute("aria-hidden", "true"); };
    let ly = 0;
    addEventListener("scroll", () => { const y = scrollY; hdr.classList.toggle("solid", y > 40); if (y > ly + 4 && y > 400) hdr.classList.add("hide"); else if (y < ly - 4) hdr.classList.remove("hide"); ly = y; }, { passive: true });
  }

  function footer() {
    const host = document.querySelector("[data-nbs-footer]"); if (!host) return;
    const D = window.NBS_DATA;
    host.outerHTML = `
    <footer class="ftr"><div class="girih"></div>
      <div class="wrap">
        <div class="cols">
          <div>
            <div class="big">${bi("عطور العالم،<br>بميزان الثقة.", "The world's scents,<br>weighed in trust.")}</div>
            <p class="muted small" style="max-width:40ch">${bi("تاجر عراقي مرخّص للزيوت العطرية المركّزة ومستلزماتها، ووكيل حصري لدور عطور عالمية — منذ 1980.", "A licensed Iraqi trader of concentrated perfume oils and accessories, and exclusive agent for global fragrance houses — since 1980.")}</p>
          </div>
          <div><h4>${bi("الموقع", "Site")}</h4><ul>${PAGES.map(p => `<li><a href="${p.href}">${bi(p.ar, p.en)}</a></li>`).join("")}<li><a href="${D.LIBRARY}" target="_blank" rel="noopener">${bi("مكتبة العطور ↗", "Fragrance Library ↗")}</a></li></ul></div>
          <div><h4>${bi("الفروع", "Branches")}</h4><ul>${D.BRANCHES.map(b => `<li>${bi(b.short.ar, b.short.en)}<br><a href="https://wa.me/${b.wa}" target="_blank" rel="noopener" dir="ltr">${b.phone}</a></li>`).join("")}<li><a href="mailto:${D.EMAIL}">${D.EMAIL}</a></li></ul></div>
          <div><h4>${bi("تابعنا", "Follow")}</h4><ul>${D.SOCIAL.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join("")}</ul></div>
        </div>
        <div class="base"><span>© 2026 ${bi("نور النبراس", "Noor Al Nibras")}</span><span>${bi("بغداد، العراق", "Baghdad, Iraq")}</span></div>
      </div>
    </footer>`;
  }

  /* ---------- scroll scenes ---------- */
  const scenes = [], ticks = [];
  NBS.scene = (el, o) => { const s = { el, raw: 0, p: 0, smooth: o.smooth ?? .14, render: o.render }; scenes.push(s); return s; };
  NBS.onFrame = f => ticks.push(f);
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(64, now - last) / 1000; last = now;
    for (const s of scenes) {
      const r = s.el.getBoundingClientRect();
      s.raw = M.clamp(-r.top / Math.max(1, r.height - innerHeight));
      if (!(r.bottom > -innerHeight * .25 && r.top < innerHeight * 1.25)) continue;
      const k = NBS.reduced ? 1 : 1 - Math.pow(1 - s.smooth, dt * 60);
      s.p += (s.raw - s.p) * k; if (Math.abs(s.raw - s.p) < 1e-4) s.p = s.raw;
      s.render(s.p, now / 1000, dt);
    }
    ticks.forEach(f => f(now / 1000, dt));
    requestAnimationFrame(frame);
  }

  NBS.canvas = function (cv, onResize) {
    const ctx = cv.getContext("2d"), o = { cv, ctx, w: 0, h: 0 };
    let first = true;
    const fit = () => {
      const r = cv.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
      if (!first && w === o.w && Math.abs(h - o.h) < 120) return;
      const dpr = Math.min(2, devicePixelRatio || 1); o.w = w; o.h = h;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) { first = false; onResize && queueMicrotask(() => onResize(o)); } else onResize && onResize(o);
    };
    fit(); new ResizeObserver(fit).observe(cv);
    return o;
  };

  function rail() {
    const chs = [...document.querySelectorAll("[data-chapter]")]; if (chs.length < 2) return;
    const r = document.createElement("nav"); r.className = "rail"; r.setAttribute("aria-label", "Chapters");
    r.innerHTML = chs.map(c => `<a href="#${c.id}"><i></i><span>${bi(c.dataset.ar, c.dataset.en)}</span></a>`).join("");
    document.body.appendChild(r);
    const as = [...r.children];
    NBS.onFrame(() => { const mid = innerHeight / 2; chs.forEach((c, i) => { const b = c.getBoundingClientRect(); as[i].style.setProperty("--fill", M.clamp((mid - b.top) / Math.max(1, b.height)).toFixed(3)); as[i].classList.toggle("on", b.top <= mid && b.bottom > mid); }); });
  }
  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
  }

  /* ---------- glass profiles ----------
     Each bottle type is a half-profile r(y) sampled at the same N heights,
     so any two types can be interpolated point-by-point (a true morph). */
  const PN = 64;
  const PROFILES = {
    // y from 0 (top) to 1 (base); returns radius in units of max radius
    spray: y => y < .1 ? .2 : y < .2 ? .34 : y < .25 ? .22 : y < .3 ? .55 + (y - .25) * 8 : y < .95 ? .95 : .95 - (y - .95) * 4,
    crimp: y => y < .06 ? .26 : y < .14 ? .26 : y < .2 ? .16 : y < .32 ? .16 + (y - .2) * 5.6 : y < .94 ? .84 : .84 - (y - .94) * 5,
    tola: y => y < .14 ? .3 - y * .6 : y < .3 ? .14 : y < .34 ? .14 + (y - .3) * 6 : .38 + Math.sin(Math.PI * M.seg(y, .34, 1)) * .62 * (y < .99 ? 1 : .2),
    oil: y => y < .22 ? .22 : y < .26 ? .3 : y < .32 ? .18 : y < .4 ? .18 + (y - .32) * 4.5 : y < .96 ? .54 : .54 - (y - .96) * 6
  };
  NBS.profile = (type, n = PN) => Array.from({ length: n + 1 }, (_, i) => Math.max(.04, PROFILES[type](i / n)));
  NBS.profilePath = (rs, cx, top, h, maxR) => {
    const n = rs.length - 1;
    let d = `M${cx} ${top}`;
    for (let i = 0; i <= n; i++) d += ` L${(cx + rs[i] * maxR).toFixed(2)} ${(top + h * i / n).toFixed(2)}`;
    for (let i = n; i >= 0; i--) d += ` L${(cx - rs[i] * maxR).toFixed(2)} ${(top + h * i / n).toFixed(2)}`;
    return d + "Z";
  };

  /* ---------- girih rosette: every line is its own path so it can be drawn in by scroll ---------- */
  NBS.girih = function (R = 200, cls = "") {
    const P = (r, a) => [Math.cos(a) * r, Math.sin(a) * r], lines = [];
    const ring = (r, step, off = 0, n = 8) => { for (let i = 0; i < n; i++) { const a = P(r, off + i * Math.PI * 2 / n), b = P(r, off + (i + step) * Math.PI * 2 / n); lines.push([a, b, r]); } };
    ring(R, 2, 0); ring(R, 2, Math.PI / 8);          // two squares → 16-point outline
    ring(R * .62, 3, Math.PI / 8);                    // inner {8/3}
    ring(R * .62, 1, 0, 8);                           // octagon
    ring(R * .3, 3, 0);                               // heart star
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; lines.push([P(R * .3, a), P(R, a), 1]); }
    const f = v => v.toFixed(1);
    return lines.map(([a, b], i) => `<path class="gl ${cls}" data-i="${i}" d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join("");
  };

  NBS.boot = function () {
    header(); footer();
    applyLang(store.get("nbsiq.lang", root.lang || "ar"));
    applyTheme(store.get("nbsiq.theme", root.dataset.theme || "night"));
    rail(); reveal(); requestAnimationFrame(frame);
  };
  window.NBS = NBS;
})();
