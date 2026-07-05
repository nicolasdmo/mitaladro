/* ============================================================================
   Motor de gráficos — SVG + HTML sin dependencias. Lee window.DATA.
   Se re-renderiza al cambiar tema para tomar los colores correctos.
   ============================================================================ */
(function () {
  const D = window.DATA;
  const $ = (id) => document.getElementById(id);
  const cssv = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const SERIES = () => ["--s1","--s2","--s3","--s4","--s5","--s6","--s7","--s8"].map(cssv);

  /* ---------- tooltip ---------- */
  let tip = document.querySelector(".tt");
  if (!tip) { tip = document.createElement("div"); tip.className = "tt"; document.body.appendChild(tip); }
  function bindTip(node, html) {
    node.style.cursor = "default";
    node.addEventListener("mousemove", (e) => {
      tip.innerHTML = html; tip.style.opacity = "1";
      let x = e.clientX + 14, y = e.clientY + 14;
      const r = tip.getBoundingClientRect();
      if (x + r.width > innerWidth) x = e.clientX - r.width - 14;
      if (y + r.height > innerHeight) y = e.clientY - r.height - 14;
      tip.style.left = x + "px"; tip.style.top = y + "px";
    });
    node.addEventListener("mouseleave", () => { tip.style.opacity = "0"; });
  }

  const NS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, kids) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(c => n.appendChild(c));
    return n;
  }
  function txt(x, y, str, cls, extra) {
    return s("text", Object.assign({ x, y, class: cls || "" }, extra || {}), document.createTextNode(str));
  }

  function legend(container, items) {
    const l = document.createElement("div"); l.className = "legend";
    items.forEach(([label, color]) => {
      const sp = document.createElement("span");
      sp.innerHTML = `<i style="background:${color}"></i>${esc(label)}`;
      l.appendChild(sp);
    });
    container.appendChild(l);
  }

  /* ---------- HTML bar-list (magnitud horizontal, 1 serie) ---------- */
  function barList(id, cfg) {
    const box = $(id); box.innerHTML = "";
    const color = cssv(cfg.colorVar || "--s1");
    const max = cfg.max || Math.max(...cfg.filas.map(f => f.valor)) * 1.02;
    cfg.filas.forEach(f => {
      const row = document.createElement("div");
      row.style.margin = "0 0 13px";
      row.innerHTML =
        `<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px">
           <span style="color:var(--ink-2)">${esc(f.label)}</span>
           <b style="font-variant-numeric:tabular-nums">${f.valor}${cfg.suffix||""}</b>
         </div>
         <div style="height:10px;border-radius:5px;background:var(--surface-2);overflow:hidden">
           <div style="height:100%;width:${(f.valor/max*100).toFixed(1)}%;background:${color};border-radius:5px"></div>
         </div>`;
      bindTip(row, `<b>${esc(f.label)}</b><br>${f.valor}${cfg.suffix||""} ${esc(cfg.unit||"")}`);
      box.appendChild(row);
    });
  }

  /* ---------- SVG vertical columns (1 serie) ---------- */
  function columns(id, cfg) {
    const box = $(id); box.innerHTML = "";
    const W = 640, H = 300, mL = 40, mR = 12, mT = 14, mB = 46;
    const iw = W - mL - mR, ih = H - mT - mB;
    const color = cssv(cfg.colorVar || "--s2");
    const max = cfg.max || Math.max(...cfg.filas.map(f => f.valor)) * 1.12;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" });
    // gridlines
    for (let g = 0; g <= 4; g++) {
      const y = mT + ih - (ih * g / 4), v = Math.round(max * g / 4);
      svg.appendChild(s("line", { x1: mL, y1: y, x2: W - mR, y2: y, stroke: cssv("--grid"), "stroke-width": 1 }));
      svg.appendChild(txt(mL - 8, y + 3, v, "axislabel", { "text-anchor": "end" }));
    }
    const n = cfg.filas.length, bw = iw / n * 0.52, gap = iw / n;
    cfg.filas.forEach((f, i) => {
      const cx = mL + gap * i + gap / 2, bh = f.valor / max * ih, y = mT + ih - bh;
      const rect = s("rect", { x: cx - bw / 2, y, width: bw, height: bh, rx: 4, fill: color });
      bindTip(rect, `<b>${esc(f.label)}</b><br>${f.valor}${cfg.suffix||""} ${esc(cfg.unit||"")}`);
      svg.appendChild(rect);
      svg.appendChild(txt(cx, y - 7, f.valor + (cfg.suffix||""), "", { "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: cssv("--ink") }));
      svg.appendChild(txt(cx, H - mB + 20, f.label, "", { "text-anchor": "middle", "font-size": 12, fill: cssv("--ink-2") }));
    });
    box.appendChild(svg);
  }

  /* ---------- SVG grouped columns (2 series) ---------- */
  function groupedColumns(id, cfg) {
    const box = $(id); box.innerHTML = "";
    const cols = SERIES();
    const c1 = cols[cfg.colorIdx ? cfg.colorIdx[0] : 0], c2 = cols[cfg.colorIdx ? cfg.colorIdx[1] : 1];
    legend(box, [[cfg.series[0], c1], [cfg.series[1], c2]]);
    const W = 640, H = 300, mL = 42, mR = 12, mT = 14, mB = 44;
    const iw = W - mL - mR, ih = H - mT - mB;
    const vals = cfg.groups.flatMap(g => g.values);
    const max = cfg.max || Math.max(...vals) * 1.15;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" });
    for (let g = 0; g <= 4; g++) {
      const y = mT + ih - (ih * g / 4);
      svg.appendChild(s("line", { x1: mL, y1: y, x2: W - mR, y2: y, stroke: cssv("--grid"), "stroke-width": 1 }));
      svg.appendChild(txt(mL - 8, y + 3, (max * g / 4).toFixed(1).replace(/\.0$/,""), "axislabel", { "text-anchor": "end" }));
    }
    const gap = iw / cfg.groups.length, bw = Math.min(46, gap * 0.28);
    cfg.groups.forEach((grp, i) => {
      const cx = mL + gap * i + gap / 2;
      [[grp.values[0], c1, cfg.series[0]], [grp.values[1], c2, cfg.series[1]]].forEach((d, j) => {
        const bh = d[0] / max * ih, x = cx - bw - 3 + j * (bw + 6), y = mT + ih - bh;
        const rect = s("rect", { x, y, width: bw, height: bh, rx: 4, fill: d[1] });
        bindTip(rect, `<b>${esc(grp.label)}</b><br>${esc(d[2])}: ${d[0]} ${esc(cfg.unit||"")}`);
        svg.appendChild(rect);
      });
      svg.appendChild(txt(cx, H - mB + 20, grp.label, "", { "text-anchor": "middle", "font-size": 12, fill: cssv("--ink-2") }));
    });
    box.appendChild(svg);
  }

  /* ---------- SVG area/line (serie temporal) ---------- */
  function area(id, cfg) {
    const box = $(id); box.innerHTML = "";
    const color = cssv("--s1");
    const W = 640, H = 300, mL = 40, mR = 16, mT = 16, mB = 40;
    const iw = W - mL - mR, ih = H - mT - mB;
    const pts = cfg.puntos, max = Math.max(...pts.map(p => p.valor)) * 1.12, min = 0;
    const X = (i) => mL + iw * i / (pts.length - 1);
    const Y = (v) => mT + ih - (v - min) / (max - min) * ih;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" });
    for (let g = 0; g <= 4; g++) {
      const y = mT + ih - (ih * g / 4);
      svg.appendChild(s("line", { x1: mL, y1: y, x2: W - mR, y2: y, stroke: cssv("--grid"), "stroke-width": 1 }));
      svg.appendChild(txt(mL - 8, y + 3, Math.round(max * g / 4), "axislabel", { "text-anchor": "end" }));
    }
    let dLine = "", dArea = "";
    pts.forEach((p, i) => { const x = X(i), y = Y(p.valor); dLine += (i ? "L" : "M") + x + " " + y + " "; });
    dArea = dLine + `L${X(pts.length - 1)} ${mT + ih} L${X(0)} ${mT + ih} Z`;
    const gid = "grad-" + id;
    const defs = s("defs");
    const lg = s("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    lg.appendChild(s("stop", { offset: "0%", "stop-color": color, "stop-opacity": .28 }));
    lg.appendChild(s("stop", { offset: "100%", "stop-color": color, "stop-opacity": .02 }));
    defs.appendChild(lg); svg.appendChild(defs);
    svg.appendChild(s("path", { d: dArea, fill: `url(#${gid})` }));
    svg.appendChild(s("path", { d: dLine, fill: "none", stroke: color, "stroke-width": 2.4, "stroke-linjoin": "round", "stroke-linecap": "round" }));
    pts.forEach((p, i) => {
      const x = X(i), y = Y(p.valor);
      const c = s("circle", { cx: x, cy: y, r: p.real ? 5 : 4, fill: p.real ? color : cssv("--surface"), stroke: color, "stroke-width": 2 });
      bindTip(c, `<b>${p.anio}</b><br>${p.valor} ${esc(cfg.unit||"")}${p.real ? "" : " (estimado)"}`);
      svg.appendChild(c);
      if (p.real) svg.appendChild(txt(x, y - 12, p.valor + "M", "", { "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: cssv("--ink") }));
      svg.appendChild(txt(x, H - mB + 20, p.anio, "", { "text-anchor": "middle", "font-size": 11.5, fill: cssv("--ink-2") }));
    });
    box.appendChild(svg);
  }

  /* ---------- SVG bubble map (oportunidades) ---------- */
  function bubble(id, cfg) {
    const box = $(id); box.innerHTML = "";
    const W = 680, H = 440, mL = 54, mR = 20, mT = 18, mB = 52;
    const iw = W - mL - mR, ih = H - mT - mB;
    const cols = SERIES();
    const X = (v) => mL + v / 100 * iw, Y = (v) => mT + ih - v / 100 * ih;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" });
    // quadrant guides
    svg.appendChild(s("line", { x1: X(50), y1: mT, x2: X(50), y2: mT + ih, stroke: cssv("--grid"), "stroke-width": 1, "stroke-dasharray": "4 4" }));
    svg.appendChild(s("line", { x1: mL, y1: Y(50), x2: mL + iw, y2: Y(50), stroke: cssv("--grid"), "stroke-width": 1, "stroke-dasharray": "4 4" }));
    // frame
    svg.appendChild(s("rect", { x: mL, y: mT, width: iw, height: ih, fill: "none", stroke: cssv("--axis"), "stroke-width": 1 }));
    // best-quadrant wash
    svg.appendChild(s("rect", { x: X(50), y: mT, width: X(100) - X(50), height: Y(50) - mT, fill: cssv("--s2"), opacity: .06 }));
    svg.appendChild(txt(X(98), Y(96) + 4, "★ zona ideal", "", { "text-anchor": "end", "font-size": 11, "font-weight": 700, fill: cssv("--s2") }));
    // axes labels
    svg.appendChild(txt(mL + iw / 2, H - 12, "→  " + cfg.ejeX, "axislabel", { "text-anchor": "middle" }));
    const yl = txt(16, mT + ih / 2, "→  " + cfg.ejeY, "axislabel", { "text-anchor": "middle" });
    yl.setAttribute("transform", `rotate(-90 16 ${mT + ih / 2})`); svg.appendChild(yl);
    cfg.items.forEach((it, i) => {
      const x = X(it.demanda), y = Y(it.facilidad), r = 9 + it.monetizacion / 100 * 22, col = cols[i % cols.length];
      const c = s("circle", { cx: x, cy: y, r, fill: col, "fill-opacity": .78, stroke: cssv("--surface"), "stroke-width": 2 });
      bindTip(c, `<b>${esc(it.nombre)}</b><br>Demanda: ${it.demanda} · Facilidad: ${it.facilidad}<br>Monetización: ${it.monetizacion}`);
      svg.appendChild(c);
      svg.appendChild(txt(x, y - r - 5, it.nombre, "", { "text-anchor": "middle", "font-size": 10.5, "font-weight": 600, fill: cssv("--ink-2") }));
    });
    box.appendChild(svg);
  }

  /* ---------- scoring table ---------- */
  function scoreColor(v) {
    if (v >= 70) return cssv("--good");
    if (v >= 55) return cssv("--s3");
    return cssv("--serious");
  }
  function scoringTable(id) {
    const box = $(id);
    const rows = D.scoring.map(r => {
      const score = Math.round(r.demanda * .35 + r.monetizacion * .30 + (100 - r.competencia) * .20 + (100 - r.dificultad) * .15);
      return Object.assign({ score }, r);
    }).sort((a, b) => b.score - a.score);
    const cell = (v, colorVar) => {
      const c = cssv(colorVar || "--s1");
      return `<td class="num databar"><span class="bar" style="width:${v}%;background:${c}"></span><span>${v}</span></td>`;
    };
    let html = `<div class="tablewrap"><table class="data"><thead><tr>
      <th>Oportunidad</th><th class="num">Demanda</th><th class="num">Monetización</th>
      <th class="num">Competencia</th><th class="num">Dificultad</th><th class="num">Puntaje</th></tr></thead><tbody>`;
    rows.forEach(r => {
      const sc = scoreColor(r.score);
      html += `<tr><td>${esc(r.nombre)}</td>
        ${cell(r.demanda, "--s1")}${cell(r.monetizacion, "--s2")}
        ${cell(r.competencia, "--s6")}${cell(r.dificultad, "--s8")}
        <td class="num"><span class="scorepill" style="color:${sc};background:color-mix(in srgb, ${sc} 16%, transparent)">${r.score}</span></td></tr>`;
    });
    html += `</tbody></table></div>`;
    box.innerHTML = html;
  }

  /* ---------- KPIs, bullets, playbook, sources ---------- */
  function kpis() {
    const box = $("kpis"); box.innerHTML = "";
    D.kpis.forEach(k => {
      const el = document.createElement("div"); el.className = "card tile";
      const tone = k.tono === "good" ? "good" : k.tono === "warning" ? "warning" : "neutral";
      el.innerHTML = `<div class="v">${esc(k.valor)}</div><div class="s">${esc(k.sub)}</div><span class="d ${tone}">${esc(k.delta)}</span>`;
      box.appendChild(el);
    });
  }
  function bullets(id, arr, cls) {
    const ul = $(id); ul.className = "bullets" + (cls ? " " + cls : "");
    ul.innerHTML = arr.map(t => `<li>${t}</li>`).join("");
  }
  function playbook() {
    const box = $("playbook-steps"); box.innerHTML = "";
    D.playbook.forEach(p => {
      const el = document.createElement("div"); el.className = "step";
      el.innerHTML = `<div class="n">${p.n}</div><div><h4>${esc(p.titulo)}</h4><p>${esc(p.texto)}</p></div>`;
      box.appendChild(el);
    });
  }
  function sources() {
    const ul = $("sources");
    ul.innerHTML = D.fuentes.map(f => `<li><a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)} ↗</a></li>`).join("");
  }

  /* ---------- render all ---------- */
  function renderAll() {
    kpis();
    barList("chart-dispositivos", { filas: D.dispositivos.filas, unit: D.dispositivos.unidad, suffix: "%", colorVar: "--s5", max: 100 });
    barList("chart-brechas", { filas: D.brechasSectores.filas, unit: D.brechasSectores.unidad, colorVar: "--s1", max: 100 });
    columns("chart-gaming", { filas: D.gamingPais.filas, unit: D.gamingPais.unidad, suffix: "%", colorVar: "--s2", max: 100 });
    area("chart-streaming", D.streamingCrecimiento);
    groupedColumns("chart-tiempo", {
      series: D.tiempoConsumo.series, unit: D.tiempoConsumo.unidad, colorIdx: [0, 2],
      groups: D.tiempoConsumo.filas.map(f => ({ label: f.label, values: [f.latam, f.global] })),
    });
    groupedColumns("chart-pagos", {
      series: D.pagos.series, unit: D.pagos.unidad, colorIdx: [0, 1], max: 60,
      groups: D.pagos.filas.map(f => ({ label: f.label, values: [f.ecommerce, f.tienda] })),
    });
    bubble("chart-oportunidades", D.oportunidades);
    scoringTable("scoring-table");
    bullets("bullets-entretenimiento", D.entretenimientoInsights);
    bullets("bullets-problemas", D.problemasInsights, "aqua");
    playbook();
    sources();
  }

  window.__renderAll = renderAll;
  document.addEventListener("DOMContentLoaded", renderAll);
})();
