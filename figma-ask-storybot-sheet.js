// Salon — Ask StoryBot Sheet open
// Paste into the Scripter plugin and click Run.

(async function () {

  await figma.loadFontAsync({ family:"Besley",            style:"Regular" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"Regular" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"SemiBold" });
  await figma.loadFontAsync({ family:"Plus Jakarta Sans", style:"Italic" });

  // Paper texture image (from design system node I15:606;171:4446)
  const _paperRes = await fetch("http://localhost:3845/assets/37ea7b34ac3b0cc4dfa8aaabb3675afe16f7339b.png");
  const _paperBuf = await _paperRes.arrayBuffer();
  const paperImg = figma.createImage(new Uint8Array(_paperBuf));

  function solid(hex, a) {
    const r=parseInt(hex.slice(1,3),16)/255,
          g=parseInt(hex.slice(3,5),16)/255,
          b=parseInt(hex.slice(5,7),16)/255;
    return [{type:"SOLID",color:{r,g,b},opacity:a??1}];
  }

  const phone = figma.createFrame();
  phone.name = "Salon — Ask StoryBot Sheet";
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
  txt("Deep\nWork",14,70,{size:8,color:"#CDB670",alpha:.75});
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

  // Partial message visible at top of chat area
  rct("Sage Bar bg",16,140,3,70,{fill:"#D3E8E2",fillAlpha:.40});
  rct("Bubble partial",22,140,353,70,{fill:"#20166E",fillAlpha:.70,radius:10});
  txt("emotional weight. This is the first. Notice how light\nit still feels here.",
    34,150,{size:13,alpha:.60,w:329});

  // Reaction
  rct("React",16,218,34,22,{fill:"#1b0ca8",radius:11});
  txt("😄",19,219,{size:11});
  txt("Reply",290,222,{size:10,alpha:.28});
  txt("Passage",332,222,{size:10,alpha:.28});

  // Reply thread — t_ashworth + nwatts
  rct("Thread Line",120,248,2,145,{fill:"#EEE9DC",fillAlpha:.12});

  circ(127,268,26,"#8BA9C6",.25);
  txt("t_ashworth",160,257,{style:"SemiBold",size:11,alpha:.85});
  rct("Bubble t_ashworth",160,272,213,36,{fill:"#20166E",radius:9});
  txt("I had no idea it comes back",172,280,{size:12,alpha:.90});

  circ(127,336,26,"#8BA9C6",.25);
  txt("nwatts",160,324,{style:"SemiBold",size:11,alpha:.85});
  rct("Bubble nwatts",160,338,213,52,{fill:"#20166E",radius:9});
  txt("does the meaning change each time or just the context?",172,346,{size:12,alpha:.90,w:193});

  // ppolanski post
  circ(29,412,30,"#8BA9C6",.25);
  txt("ppolanski",52,399,{style:"SemiBold",size:11,alpha:.88});
  txt("2:17pm",116,399,{size:10,alpha:.35});
  rct("Bubble ppolanski",52,417,323,68,{fill:"#1a1280",radius:10,stroke:"#D3E8E2",strokeAlpha:.35});
  txt("Asking StoryBot — if Tolkien was a devout Catholic, why is there no religion in Middle Earth?",
    64,425,{style:"Italic",size:12,alpha:.82,w:299});
  txt("Reply",52,493,{size:10,alpha:.28});

  // StoryBot peeking above sheet
  rct("StoryBot Icon",16,508,20,20,{fill:"#0A005A",radius:3,stroke:"#D3E8E2",strokeAlpha:.65});
  txt("StoryBot",44,510,{style:"SemiBold",size:12,color:"#D3E8E2"});
  rct("Sage Bar StoryBot",16,532,3,40,{fill:"#D3E8E2",fillAlpha:.50});
  rct("Bubble StoryBot partial",22,532,353,40,{fill:"#20166E",fillAlpha:.70,radius:10});
  txt("Deliberately, yes — but not to exclude faith. He…",34,542,{size:13,alpha:.45,w:329});

  // Dark overlay
  rct("Overlay",0,0,393,874,{fill:"#020018",fillAlpha:.55});

  // ═══════════════════════════════════════════════════════
  // BOTTOM SHEET  y=580–874
  // ═══════════════════════════════════════════════════════
  const sh = figma.createRectangle();
  sh.name="Ask Sheet"; sh.resize(393,294); sh.x=0; sh.y=580;
  sh.fills=solid("#16108e");
  sh.topLeftRadius=20; sh.topRightRadius=20;
  sh.bottomLeftRadius=0; sh.bottomRightRadius=0;
  phone.appendChild(sh);

  // Drag handle
  rct("Drag Handle",179,588,36,4,{fill:"#EEE9DC",fillAlpha:.25,radius:2});

  // StoryBot icon + title
  rct("Bot Icon",22,606,26,26,{fill:"#0A005A",radius:5,stroke:"#D3E8E2",strokeAlpha:.60});
  txt("⊟",28,611,{size:12,color:"#D3E8E2",alpha:.80});
  txt("Ask StoryBot",58,609,{style:"SemiBold",size:17});

  // Subtitle
  txt("Your question and the answer will be shared with the room.",
    22,638,{size:13,alpha:.48,w:349});

  // Text input area
  rct("Input Area",22,666,349,158,{fill:"#050028",fillAlpha:.80,radius:10,stroke:"#4a40af",strokeAlpha:.40});
  txt("Ask anything about the book, the author, the context…",
    34,680,{size:13,alpha:.28,w:325});

  // Ask StoryBot CTA button
  rct("Ask Btn",218,836,155,42,{fill:"#EEE9DC",radius:21});
  txt("Ask StoryBot",238,849,{style:"SemiBold",size:14,color:"#0A005A"});

  figma.viewport.scrollAndZoomIntoView([phone]);
  figma.closePlugin("✅ Ask StoryBot sheet created");

})();
