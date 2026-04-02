// Salon — Passage Sheet open
// Paste into the Scripter plugin and click Run.

(async function () {

  await figma.loadFontAsync({ family:"Besley",            style:"Regular" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"Regular" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"SemiBold" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"Italic" });

  // Paper texture image (from design system node I15:606;171:4446)
  const paperImg = await figma.createImageAsync(
    "http://localhost:3845/assets/37ea7b34ac3b0cc4dfa8aaabb3675afe16f7339b.png"
  );

  function solid(hex, a) {
    const r=parseInt(hex.slice(1,3),16)/255,
          g=parseInt(hex.slice(3,5),16)/255,
          b=parseInt(hex.slice(5,7),16)/255;
    return [{type:"SOLID",color:{r,g,b},opacity:a??1}];
  }

  const phone = figma.createFrame();
  phone.name = "Salon — Passage Sheet";
  phone.resize(393, 874);
  phone.fills = solid("#0A005A");
  phone.clipsContent = true;
  figma.currentPage.appendChild(phone);

  function rct(name,x,y,w,h,opts={}) {
    const r=figma.createRectangle();
    r.name=name; r.resize(w,h); r.x=x; r.y=y;
    r.fills = opts.fill ? solid(opts.fill,opts.fillAlpha) : [];
    if (opts.radius!==undefined) r.cornerRadius=opts.radius;
    if (opts.tlr!==undefined) { r.topLeftRadius=opts.tlr; r.topRightRadius=opts.tlr; r.bottomLeftRadius=0; r.bottomRightRadius=0; }
    if (opts.stroke) { r.strokes=solid(opts.stroke,opts.strokeAlpha??1); r.strokeWeight=opts.sw??1; r.strokeAlign="INSIDE"; }
    phone.appendChild(r); return r;
  }

  function circ(x,y,size,fillHex,alpha) {
    const e=figma.createEllipse();
    e.resize(size,size); e.x=x; e.y=y-size/2;
    e.fills=solid(fillHex,alpha??1);
    phone.appendChild(e); return e;
  }

  function txt(str,x,y,opts={}) {
    const t=figma.createText();
    t.fontName={family:opts.fam??"Plus Jakarta Sans",style:opts.style??"Regular"};
    t.fontSize=opts.size??12;
    t.fills=solid(opts.color??"#EEE9DC",opts.alpha);
    t.characters=String(str);
    t.x=x; t.y=y;
    if (opts.w) { t.resize(opts.w,20); t.textAutoResize="HEIGHT"; }
    phone.appendChild(t); return t;
  }

  // ═══════════════════════════════════════════════════════
  // BACKGROUND — dimmed Salon screen
  // ═══════════════════════════════════════════════════════

  // Header
  const bookCover = rct("Book Cover",14,14,40,50,{radius:3,stroke:"#CDB670",strokeAlpha:.7});
  bookCover.fills = [{ type:"IMAGE", scaleMode:"FILL", imageHash: paperImg.hash }];
  txt("Chapter 3 — A Short Rest",62,18,{fam:"Besley",size:14});
  txt("The Hobbit · 142 in the salon today",62,40,{size:10,alpha:.50});
  txt("Educated",14,70,{size:8,color:"#CDB670",alpha:.75});
  txt("‹",362,18,{size:20,alpha:.65});

  // Presence strip
  rct("Presence",0,100,393,30,{fill:"#0C0065"});
  const dpx=[{x:14,s:13,c:"#D3E8E2",a:.5},{x:30,s:10,c:"#E2A9C9",a:.38},
             {x:43,s:17,c:"#D3E8E2",a:.32},{x:63,s:11,c:"#E2A9C9",a:.65},
             {x:77,s:9, c:"#D3E8E2",a:.45},{x:89,s:15,c:"#E2A9C9",a:.40},
             {x:107,s:11,c:"#D3E8E2",a:.55},{x:121,s:13,c:"#E2A9C9",a:.34},
             {x:137,s:10,c:"#D3E8E2",a:.44}];
  for (const d of dpx) circ(d.x,115,d.s,d.c,d.a);
  txt("+134 in the room",160,109,{size:10,color:"#D3E8E2",alpha:.65});

  // Passage card (background, visible behind sheet)
  rct("Passage Card bg",14,134,365,136,{fill:"#050028",fillAlpha:.72,radius:10,stroke:"#EEE9DC",strokeAlpha:.10});
  txt('"…the valley was filled with their voices, and the night seemed more beautiful and more sad…"',
    26,144,{style:"Italic",size:11,alpha:.60,w:341});
  // play button
  rct("Play Btn bg",26,196,24,24,{fill:"#1a1060",radius:12,stroke:"#E2A9C9",strokeAlpha:.30});
  txt("▶",34,202,{size:8,color:"#E2A9C9"});
  // small waveform bars (26 bars)
  const smH=[10,16,20,14,22,26,18,22,28,22,18,14,20,26,22,16,12,18,24,18,14,10,14,20,14,10];
  for (let i=0;i<smH.length;i++) {
    const bh=smH[i], bx=58+i*4, by=208-bh/2;
    rct("sb",bx,by,2,bh,{fill:i<10?"#E2A9C9":"#EEE9DC",fillAlpha:i<10?.80:.18,radius:1});
  }
  txt("0:38",26,240,{size:10,alpha:.28});
  txt("tap to listen",292,240,{size:10,alpha:.28});

  // Reactions + links
  rct("React 1",14,272,26,20,{fill:"#1b0ca8",radius:10});
  txt("😊",16,273,{size:11});
  rct("React 2",46,272,26,20,{fill:"#1b0ca8",radius:10});
  txt("😆",48,273,{size:11});
  txt("Reply",296,276,{size:10,alpha:.28});
  txt("Passage",338,276,{size:10,alpha:.28});

  // Reply: sunli
  circ(14,306,20,"#8BA9C6",.25);
  txt("sunli",42,296,{style:"SemiBold",size:11,alpha:.80});
  rct("Bubble sunli",42,310,337,34,{fill:"#20166E",radius:9});
  txt("the silence got me too",54,319,{size:12,alpha:.88});

  // Another avatar visible at top of sheet boundary
  circ(14,362,20,"#8BA9C6",.25);

  // ── Dark overlay ────────────────────────────────────────
  rct("Overlay",0,0,393,874,{fill:"#020018",fillAlpha:.52});

  // ═══════════════════════════════════════════════════════
  // BOTTOM SHEET  y=372–874
  // ═══════════════════════════════════════════════════════
  const sh = figma.createRectangle();
  sh.name="Sheet"; sh.resize(393,502); sh.x=0; sh.y=372;
  sh.fills=solid("#16108e");
  sh.topLeftRadius=20; sh.topRightRadius=20;
  sh.bottomLeftRadius=0; sh.bottomRightRadius=0;
  phone.appendChild(sh);

  // Drag handle
  rct("Drag Handle",179,380,36,4,{fill:"#EEE9DC",fillAlpha:.25,radius:2});

  // Title + close
  txt("Add a Passage",22,396,{style:"SemiBold",size:20});
  rct("Close Btn",357,398,22,22,{fill:"#EEE9DC",fillAlpha:.12,radius:11});
  txt("×",362,400,{size:15,alpha:.60});

  // Subtitle
  txt("Drag the handles to select a section from your current listen.",
    22,428,{size:13,alpha:.50,w:316});

  // Book row
  const bookThumb = rct("Book Thumb",22,468,28,34,{radius:3,stroke:"#CDB670",strokeAlpha:.6});
  bookThumb.fills = [{ type:"IMAGE", scaleMode:"FILL", imageHash: paperImg.hash }];
  txt("Chapter 3 — A Short Rest · ",58,478,{size:12,alpha:.78});
  txt("1:04:22",232,478,{size:12,color:"#CDB670"});

  // ── Big Waveform  y center=536 ───────────────────────────
  // 72 bars, step 5px, from x=14
  const BH=[8,12,18,22,16,20,24,18,14,20,26,20,16,22,18,14,10,16,20,14,
            22,32,42,46,38,44,50,42,36,44,50,42,38,46,40,34,42,48,40,34,40,46,38,28,
            18,14,20,26,20,14,18,24,18,12,10,16,22,16,12,16,20,14,10,12,16,20,14,10,8,12,14,8];
  const SEL_START=20, SEL_END=43, CY=536;
  for (let i=0;i<BH.length;i++) {
    const bh=BH[i], bx=14+i*5, by=CY-bh/2;
    const sel=i>=SEL_START&&i<=SEL_END;
    rct("wbar",bx,by,3,bh,{fill:sel?"#E2A9C9":"#EEE9DC",fillAlpha:sel?.82:.18,radius:1});
  }

  // Drag handles (gold pills with lines)
  // Left handle — at bar SEL_START
  const lhx = 14 + SEL_START*5 - 7;  // center on bar, pill width=18
  rct("Handle L",lhx,510,18,30,{fill:"#CDB670",radius:5});
  rct("HL line1",lhx+4,517,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});
  rct("HL line2",lhx+4,522,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});
  rct("HL line3",lhx+4,527,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});

  // Right handle — at bar SEL_END
  const rhx = 14 + SEL_END*5 - 7;
  rct("Handle R",rhx,510,18,30,{fill:"#CDB670",radius:5});
  rct("HR line1",rhx+4,517,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});
  rct("HR line2",rhx+4,522,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});
  rct("HR line3",rhx+4,527,10,2,{fill:"#0A005A",fillAlpha:.5,radius:1});

  // Time display
  txt("3:56 to 9:25",148,574,{size:12,color:"#CDB670"});
  txt("15:42",350,574,{size:11,alpha:.30});

  // Play button (large)
  circ(197,620,48,"#0d0058",1);
  const pbCircle=figma.createEllipse();
  pbCircle.resize(48,48); pbCircle.x=173; pbCircle.y=596;
  pbCircle.fills=solid("#0d0058");
  pbCircle.strokes=solid("#EEE9DC",.20);
  pbCircle.strokeWeight=1.5;
  pbCircle.strokeAlign="INSIDE";
  phone.appendChild(pbCircle);
  txt("▶",186,610,{size:14,alpha:.80});

  // CTA button
  rct("CTA",14,658,365,52,{fill:"#F2CAD8",radius:26});
  txt("Next — Add a Message",112,675,{style:"SemiBold",size:15,color:"#0A005A"});

  figma.viewport.scrollAndZoomIntoView([phone]);
  figma.closePlugin("✅ Passage sheet created");

})();
