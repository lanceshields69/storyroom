// Salon Screen — Figma Plugin Script
// Paste into the "Script" community plugin and click Run.

(async function () {

  // ── Font loading ─────────────────────────────────────────────────────────────
  await figma.loadFontAsync({ family: "Besley",            style: "Regular" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Italic" });

  // ── Paper texture image (from design system node I15:606;171:4446)
  const paperImg = await figma.createImageAsync(
    "http://localhost:3845/assets/37ea7b34ac3b0cc4dfa8aaabb3675afe16f7339b.png"
  );

  // ── Color helpers ─────────────────────────────────────────────────────────────
  function solid(hex, a) {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    return [{ type:"SOLID", color:{r,g,b}, opacity: a ?? 1 }];
  }

  // ── Main frame (taller to fit passage card) ───────────────────────────────────
  const salon = figma.createFrame();
  salon.name = "Salon";
  salon.resize(393, 1154);
  salon.fills = solid("#0A005A");
  salon.clipsContent = true;
  figma.currentPage.appendChild(salon);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function txt(str, x, y, opts) {
    const t = figma.createText();
    t.fontName = { family: opts.family || "Plus Jakarta Sans", style: opts.style || "Regular" };
    t.fontSize = opts.size || 12;
    t.fills = solid(opts.color || "#EEE9DC", opts.alpha);
    t.characters = str;
    t.x = x; t.y = y;
    if (opts.w) { t.resize(opts.w, 20); t.textAutoResize = "HEIGHT"; }
    salon.appendChild(t);
    return t;
  }

  function rct(name, x, y, w, h, opts) {
    const r = figma.createRectangle();
    r.name = name;
    r.resize(w, h);
    r.x = x; r.y = y;
    r.fills = opts.fill ? solid(opts.fill, opts.fillAlpha) : [];
    if (opts.radius) r.cornerRadius = opts.radius;
    if (opts.stroke) {
      r.strokes = solid(opts.stroke, opts.strokeAlpha);
      r.strokeWeight = opts.strokeWeight || 1;
      r.strokeAlign = "INSIDE";
    }
    salon.appendChild(r);
    return r;
  }

  function circle(x, y, size, fillHex, alpha) {
    const e = figma.createEllipse();
    e.resize(size, size);
    e.x = x; e.y = y - size/2;
    e.fills = solid(fillHex, alpha || 1);
    salon.appendChild(e);
    return e;
  }

  // ════════════════════════════════════════════════════════════════════════════
  // HEADER  y 0–108
  // ════════════════════════════════════════════════════════════════════════════
  const bookCover = rct("Book Cover", 18, 18, 40, 52, { radius:3, stroke:"#CDB670", strokeAlpha:0.7 });
  bookCover.fills = [{ type:"IMAGE", scaleMode:"FILL", imageHash: paperImg.hash }];
  txt("Chapter 3 — A Short Rest", 68, 22, { family:"Besley", size:15 });
  txt("The Hobbit · 142 in the salon today", 68, 44, { size:11, alpha:0.50 });
  txt("The\nHobbit", 18, 76, { size:8.5, color:"#CDB670", alpha:0.80 });
  txt("‹", 366, 20, { size:22, alpha:0.75 });

  // ════════════════════════════════════════════════════════════════════════════
  // PRESENCE STRIP  y 108–143
  // ════════════════════════════════════════════════════════════════════════════
  rct("Presence Strip", 0, 108, 393, 35, { fill:"#0C0065" });
  const dots = [
    {x:16,s:14,c:"#D3E8E2",a:0.55},{x:33,s:10,c:"#E2A9C9",a:0.40},
    {x:46,s:18,c:"#D3E8E2",a:0.35},{x:67,s:12,c:"#E2A9C9",a:0.70},
    {x:82,s:10,c:"#D3E8E2",a:0.50},{x:95,s:16,c:"#E2A9C9",a:0.45},
    {x:114,s:12,c:"#D3E8E2",a:0.60},{x:129,s:14,c:"#E2A9C9",a:0.38},
    {x:146,s:11,c:"#D3E8E2",a:0.48},
  ];
  for (const d of dots) circle(d.x, 126, d.s, d.c, d.a);
  txt("+134 in the room", 168, 120, { size:11, color:"#D3E8E2", alpha:0.70 });

  // ════════════════════════════════════════════════════════════════════════════
  // PASSAGE POST (t_ashworth · 10:33am)  y 145–436
  // ════════════════════════════════════════════════════════════════════════════
  circle(29, 160, 30, "#8BA9C6", 0.25);
  txt("t_ashworth", 54, 148, { style:"SemiBold", size:11, alpha:0.88 });
  txt("10:33am",    126, 148, { size:10, alpha:0.35 });

  // Outer message bubble
  rct("Bubble t_ashworth passage", 54, 168, 323, 228, { fill:"#20166E", radius:10 });

  // Message text
  txt("Bilbo doesn't want to leave. For the first time he actually doesn't want to leave.",
    66, 178, { size:13, alpha:0.90, w:299 });

  // ── Passage card (embedded inside bubble) ───────────────────────────────────
  rct("Passage Card", 66, 222, 299, 162,
    { fill:"#050028", fillAlpha:0.70, radius:9, stroke:"#EEE9DC", strokeAlpha:0.10 });

  txt("CH. 3 · 1:19:08", 78, 234, { size:9, color:"#CDB670", alpha:0.80 });

  txt('"He would gladly have stopped there forever and ever..."',
    78, 250, { style:"Italic", size:11, alpha:0.65, w:275 });

  // Play button circle
  rct("Play Btn", 78, 284, 28, 28, { fill:"#1a1060", radius:14, stroke:"#E2A9C9", strokeAlpha:0.35 });
  txt("▶", 87, 290, { size:9, color:"#E2A9C9" });

  // Waveform bars (35 bars, first 13 = played pink, rest = dim)
  const barH = [12,16,22,26,20,28,24,18,26,28,22,18,24,
                20,26,22,16,12,18,24,20,14,18,26,20,16,12,18,22,18,14,10,14,18,12];
  const played = 13;
  for (let i = 0; i < barH.length; i++) {
    const bh = barH[i];
    const bx = 114 + i * 5;
    const by = 298 - bh / 2;
    rct("Bar", bx, by, 3, bh, {
      fill: i < played ? "#E2A9C9" : "#EEE9DC",
      fillAlpha: i < played ? 0.85 : 0.20,
      radius: 1,
    });
  }

  txt("0:22",         78,  332, { size:10, alpha:0.30 });
  txt("tap to listen", 253, 332, { size:10, alpha:0.30 });

  // Reaction pill (😊)
  rct("Reaction Pill", 54, 404, 34, 22, { fill:"#1b0ca8", radius:11 });
  txt("😊", 57, 405, { size:12 });

  txt("Reply",   294, 410, { size:10, alpha:0.30 });
  txt("Passage", 340, 410, { size:10, alpha:0.30 });

  // ════════════════════════════════════════════════════════════════════════════
  // REPLY THREAD 1 (t_ashworth · nwatts) — shifted +291 from original
  // ════════════════════════════════════════════════════════════════════════════
  rct("Thread Line 1", 120, 439, 2, 188, { fill:"#EEE9DC", fillAlpha:0.12 });

  circle(127, 459, 26, "#8BA9C6", 0.25);
  txt("t_ashworth", 160, 448, { style:"SemiBold", size:11, alpha:0.85 });
  rct("Bubble t_ashworth reply", 160, 463, 213, 36, { fill:"#20166E", radius:9 });
  txt("I had no idea it comes back", 172, 471, { size:12, alpha:0.90 });

  circle(127, 533, 26, "#8BA9C6", 0.25);
  txt("nwatts", 160, 522, { style:"SemiBold", size:11, alpha:0.85 });
  rct("Bubble nwatts", 160, 537, 213, 52, { fill:"#20166E", radius:9 });
  txt("does the meaning change each time or just the context?", 172, 545, { size:12, alpha:0.90, w:193 });

  // ════════════════════════════════════════════════════════════════════════════
  // PPOLANSKI POST — shifted +291
  // ════════════════════════════════════════════════════════════════════════════
  circle(29, 618, 30, "#8BA9C6", 0.25);
  txt("ppolanski", 52, 605, { style:"SemiBold", size:11, alpha:0.88 });
  txt("2:17pm",    126, 605, { size:10, alpha:0.35 });

  rct("Bubble ppolanski", 52, 623, 323, 74,
    { fill:"#1a1280", radius:10, stroke:"#D3E8E2", strokeAlpha:0.35 });
  txt("Asking StoryBot — if Tolkien was a devout Catholic, why is there no religion in Middle Earth?",
    64, 631, { style:"Italic", size:12.5, alpha:0.85, w:299 });

  txt("Reply", 52, 705, { size:10, alpha:0.30 });

  // ════════════════════════════════════════════════════════════════════════════
  // STORYBOT POST — shifted +291
  // ════════════════════════════════════════════════════════════════════════════
  rct("StoryBot Icon", 16, 721, 20, 20,
    { fill:"#0A005A", radius:3, stroke:"#D3E8E2", strokeAlpha:0.65 });
  txt("StoryBot", 44, 723, { style:"SemiBold", size:12, color:"#D3E8E2" });

  rct("Sage Bar",        16, 744, 3, 152, { fill:"#D3E8E2", fillAlpha:0.60 });
  rct("Bubble StoryBot", 22, 744, 353, 152, { fill:"#20166E", fillAlpha:0.88, radius:10 });
  txt("Deliberately, yes — but not to exclude faith. He called it a 'fundamentally religious and Catholic work' but said the faith had to be absorbed into the story, not stated. Eru Ilúvatar is God. The Valar are angels.",
    34, 752, { size:13, alpha:0.90, w:329 });

  txt("Source: Tolkien's letters, 1953 — Letter 142 to Fr. Robert Murray",
    22, 903, { size:10, alpha:0.30, w:353 });
  txt("Reply", 22, 919, { size:10, alpha:0.30 });

  // ════════════════════════════════════════════════════════════════════════════
  // REPLY THREAD 2 (mireille_r · t_ashworth) — shifted +291
  // ════════════════════════════════════════════════════════════════════════════
  rct("Thread Line 2", 120, 935, 2, 188, { fill:"#EEE9DC", fillAlpha:0.12 });

  circle(127, 953, 26, "#8BA9C6", 0.25);
  txt("mireille_r", 160, 942, { style:"SemiBold", size:11, alpha:0.85 });
  rct("Bubble mireille_r", 160, 957, 213, 52, { fill:"#20166E", radius:9 });
  txt("this completely changes how I'm hearing it", 172, 965, { size:12, alpha:0.90, w:193 });

  circle(127, 1025, 26, "#8BA9C6", 0.25);
  txt("t_ashworth", 160, 1014, { style:"SemiBold", size:11, alpha:0.85 });
  rct("Bubble t_ashworth 2", 160, 1029, 213, 52, { fill:"#20166E", radius:9 });
  txt("StoryBot citing a specific letter number is sending me", 172, 1037, { size:12, alpha:0.90, w:193 });

  // ════════════════════════════════════════════════════════════════════════════
  // COMPOSE BAR  y 1094–1154
  // ════════════════════════════════════════════════════════════════════════════
  rct("Compose Bar", 0, 1094, 393, 60,
    { fill:"#352a8c", stroke:"#EEE9DC", strokeAlpha:0.10, strokeWeight:1 });
  rct("Input Field", 12, 1103, 295, 36,
    { fill:"#0A005A", radius:18, stroke:"#6a60bf", strokeAlpha:0.60 });
  txt("Add to the salon…", 28, 1115, { size:13, alpha:0.30 });
  rct("Quote Btn", 315, 1103, 36, 36, { fill:"#20166E", radius:18 });
  txt("❝", 323, 1109, { size:14, alpha:0.70 });
  rct("Ask Btn", 359, 1105, 46, 32, { fill:"#1b0ca8", radius:16 });
  txt("Ask", 369, 1113, { style:"SemiBold", size:12, color:"#D3E8E2" });

  // ── Done ──────────────────────────────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([salon]);
  figma.closePlugin("✅ Salon screen created");

})();
