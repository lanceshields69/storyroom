import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import type { RoomData } from "./RoomPage";

// Book covers (used by AudiobooksSection)
import swimPondCover from "./assets/A-swim-in-a-pond.jpg";
import magicMountainCover from "./assets/the-magic-mountain.jpg";
// Profile avatars
import profile1 from "./assets/profile1.jpg";
import profile2 from "./assets/profile2.jpg";
import profile3 from "./assets/profile3.jpg";

// Logo assets
import catLogo1 from "./assets/cat-logo-1.svg";
import catLogo2 from "./assets/cat-logo-2.svg";
// Nav icons (inline SVG components for controllable color)
import { RoomsIcon, DiscoverIcon, LibraryIcon, ProfileIcon } from "./NavIcons";

const sans = "'Plus Jakarta Sans', sans-serif";
const serif = "'Besley', serif";
const c = {
  navy: "#0a005a",
  cream: "#eee9dc",
  pink: "#e2a9c9",
  sage: "#d3e8e2",
  gold: "#cdb670",
  lavender: "#c1baff",
};

// ── Drag-to-scroll hook (enables mouse drag on horizontal carousels) ───────────
function useDragScroll(externalRef?: React.RefObject<HTMLDivElement | null>) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = externalRef ?? internalRef;
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      moved.current = false;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const x = e.pageX - el.offsetLeft;
      const delta = x - startX.current;
      if (Math.abs(delta) > 4) moved.current = true;
      el.scrollLeft = scrollLeft.current - delta;
    };

    const onMouseUp = () => {
      dragging.current = false;
      el.style.cursor = "";
      el.style.userSelect = "";
    };

    // Suppress click on children when a drag occurred
    const onClickCapture = (e: MouseEvent) => {
      if (moved.current) { e.stopPropagation(); moved.current = false; }
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return ref;
}

// ── Mini waveform ─────────────────────────────────────────────────────────────
const WAVE = [6, 12, 8, 16, 10, 18, 8, 14, 6, 12, 16, 10, 14, 8, 12, 6];
function MiniWave() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "2px", height: 18 }}>
      {WAVE.map((h, i) => (
        <Box key={i} sx={{ width: 2, height: h, bgcolor: c.pink, borderRadius: "9999px", flexShrink: 0 }} />
      ))}
    </Box>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHead({ label, sub }: { label: string; sub?: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "10px" }}>
      <Box>
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, lineHeight: "19.5px" }}>
          {label}
        </Typography>
        {sub && (
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.45)", lineHeight: "16.5px" }}>
            {sub}
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.5)", cursor: "pointer", "&:hover": { color: c.cream } }}>
        See all
      </Typography>
    </Box>
  );
}

// ── Hero carousel ─────────────────────────────────────────────────────────────
function HeroCarousel({ rooms, onSelect }: { rooms: RoomData[]; onSelect: (r: RoomData) => void }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollRef);
  const slides = rooms.slice(0, 3);

  const goTo = (i: number) => {
    setActive(i);
    scrollRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / 340);
    setActive(Math.min(idx, slides.length - 1));
  };

  return (
    <Box sx={{ position: "relative", mb: "8px" }}>
      {/* Slides */}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: "0px",
          pl: "16px",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {slides.map((room, i) => (
          <Box
            key={i}
            onClick={() => onSelect(room)}
            sx={{
              width: 340, height: 220, borderRadius: "20px", flexShrink: 0, mr: "12px",
              position: "relative", overflow: "hidden", scrollSnapAlign: "start",
              cursor: "pointer",
            }}
          >
            {/* Background image */}
            <Box component="img" src={room.image} alt="" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            {/* Gradient */}
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,0,90,0.95) 0%, rgba(0,0,0,0) 60%)" }} />

            {/* Room badge + dot */}
            <Box sx={{
              position: "absolute", top: 10, left: 10,
              bgcolor: "rgba(10,0,90,0.7)", border: "0.556px solid rgba(238,233,220,0.2)",
              borderRadius: "9999px", px: "10px", py: "4px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <Box sx={{ position: "relative", width: 6, height: 6 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: c.pink }} />
                <Box sx={{ position: "absolute", inset: "-4px", borderRadius: "50%", bgcolor: c.pink, opacity: 0.2 }} />
              </Box>
              <Typography sx={{ fontFamily: sans, fontSize: 10, color: c.cream, lineHeight: "15px", whiteSpace: "nowrap" }}>
                {room.title}
              </Typography>
            </Box>

            {/* Bottom: book cover + info + button */}
            <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, px: "20px", pb: "16px", display: "flex", gap: "8px", alignItems: "flex-end" }}>
              <Box component="img" src={room.bookCover} alt="" sx={{ width: 44, height: 64, objectFit: "cover", borderRadius: "4px", flexShrink: 0, border: `1.667px solid ${c.gold}` }} />
              <Box sx={{ flex: 1, pb: "2px" }}>
                {/* Chapter badge */}
                <Box sx={{ display: "inline-flex", bgcolor: "rgba(226,169,201,0.2)", border: "0.556px solid rgba(226,169,201,0.4)", borderRadius: "9999px", px: "8px", py: "2px", mb: "4px" }}>
                  <Typography sx={{ fontFamily: sans, fontSize: 10, color: c.pink, lineHeight: "15px" }}>
                    {i === 0 ? `Ch. ${room.chapter} · Today` : `Ch. ${room.chapter}`}
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: serif, fontWeight: 700, fontSize: 22, color: c.cream, lineHeight: "27.5px", textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}>
                  {room.bookTitle}
                </Typography>
              </Box>
              <Box sx={{
                bgcolor: c.pink, borderRadius: "9999px", px: "14px", height: 36,
                display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer",
              }}>
                <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 12, color: c.navy, whiteSpace: "nowrap" }}>
                  Join Room
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pagination dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "6px", mt: "12px" }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              height: 6, borderRadius: "9999px", cursor: "pointer",
              width: i === active ? 24 : 6,
              bgcolor: i === active ? c.cream : "rgba(238,233,220,0.25)",
              transition: "width 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

// ── StoryBot card ─────────────────────────────────────────────────────────────
function StorybotCard() {
  const [text, setText] = useState("");
  return (
    <Box sx={{
      bgcolor: "rgba(211,232,226,0.06)", border: "0.556px solid rgba(211,232,226,0.2)",
      borderRadius: "14px", p: "14px", mb: "0px",
    }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "10px" }}>
        <Box sx={{ bgcolor: "rgba(211,232,226,0.15)", border: "0.556px solid rgba(211,232,226,0.3)", borderRadius: "9999px", px: "8px", py: "4px" }}>
          <Typography sx={{ fontFamily: sans, fontSize: 10, color: c.sage }}>✦</Typography>
        </Box>
        <Typography sx={{ fontFamily: sans, fontSize: 11, color: c.sage }}>StoryBot</Typography>
      </Box>

      <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: c.cream, lineHeight: "22.75px", mb: "10px" }}>
        What kind of book are you in the mood for?
      </Typography>

      {/* Suggestion pills */}
      <Box sx={{ display: "flex", gap: "6px", mb: "10px", flexWrap: "wrap" }}>
        {["Something epic", "A quiet read", "Surprise me"].map((p) => (
          <Box key={p} sx={{
            bgcolor: "rgba(238,233,220,0.08)", border: "0.556px solid rgba(238,233,220,0.12)",
            borderRadius: "9999px", px: "10px", py: "5px", cursor: "pointer",
            "&:hover": { bgcolor: "rgba(238,233,220,0.14)" },
          }}>
            <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: "rgba(238,233,220,0.75)", lineHeight: "16.5px", whiteSpace: "nowrap" }}>
              {p}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="input"
          placeholder="Tell StoryBot..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          sx={{
            width: "100%", bgcolor: "rgba(238,233,220,0.1)", border: "0.556px solid rgba(238,233,220,0.08)",
            borderRadius: "10px", px: "12px", py: "10px",
            fontFamily: sans, fontSize: 13, color: c.cream, outline: "none",
            boxSizing: "border-box", pr: "36px",
            "&::placeholder": { color: "rgba(238,233,220,0.35)" },
          }}
        />
        <Typography sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "rgba(238,233,220,0.4)", cursor: "pointer" }}>
          ↑
        </Typography>
      </Box>
    </Box>
  );
}

// ── Room cards (Rooms for you) ─────────────────────────────────────────────────
const GENRE_CHAPTER_COLORS: Record<string, { bg: string; border: string }> = {
  "Fiction":     { bg: "rgba(211,232,226,0.63)", border: "#d3e8e2" },
  "Thriller":    { bg: "rgba(205,182,112,0.67)", border: "rgba(205,182,112,0.38)" },
  "Non-Fiction": { bg: "rgba(226,169,201,0.25)", border: "rgba(226,169,201,0.38)" },
  "Deep Work":   { bg: "rgba(230,179,161,0.25)", border: "rgba(230,179,161,0.38)" },
  "Wind Down":   { bg: "rgba(152,185,217,0.25)", border: "rgba(152,185,217,0.38)" },
};

function RoomsForYou({ rooms, onSelect }: { rooms: RoomData[]; onSelect: (r: RoomData) => void }) {
  const dragRef = useDragScroll();
  return (
    <Box>
      <SectionHead label="Rooms for you" />
      <Box ref={dragRef} sx={{ display: "flex", gap: "8px", overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none", pb: "4px" }}>
        {rooms.map((room) => {
          const chColor = GENRE_CHAPTER_COLORS[room.genre] ?? { bg: "rgba(211,232,226,0.63)", border: "#d3e8e2" };
          return (
            <Box key={room.title} onClick={() => onSelect(room)} sx={{ width: 150, height: 190, borderRadius: "14px", flexShrink: 0, position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <Box component="img" src={room.image} alt="" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,0,90,0.95) 0%, rgba(0,0,0,0) 50%)" }} />

              {/* Avatar stack (3 circles top-right) */}
              <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex" }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} sx={{ width: 16, height: 16, borderRadius: "50%", border: "0.556px solid rgba(238,233,220,0.3)", bgcolor: "rgba(10,0,90,0.5)", ml: i > 0 ? "-4px" : 0 }} />
                ))}
              </Box>

              {/* Bottom info */}
              <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: "12px" }}>
                <Box component="img" src={room.bookCover} alt="" sx={{ width: 36, height: 52, objectFit: "cover", borderRadius: "4px", border: `1px solid ${c.cream}`, mb: "6px" }} />

                {/* Chapter badge */}
                <Box sx={{ display: "inline-flex", bgcolor: chColor.bg, border: `0.556px solid ${chColor.border}`, borderRadius: "9999px", px: "8px", py: "1px", mb: "4px" }}>
                  <Typography sx={{ fontFamily: sans, fontSize: 9, color: c.navy, lineHeight: "13.5px", fontWeight: 600 }}>{`Ch. ${room.chapter}`}</Typography>
                </Box>

                <Typography sx={{ fontFamily: serif, fontWeight: 500, fontSize: 10, color: c.cream, lineHeight: "15px", display: "block" }}>
                  {room.bookTitle}
                </Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.5)", lineHeight: "13.5px" }}>
                  {`${room.genre} · ${room.listeners}`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Continue listening ─────────────────────────────────────────────────────────
function ContinueListening({ room, onSelect }: { room: RoomData; onSelect: (r: RoomData) => void }) {
  const [playing, setPlaying] = useState(false);
  const progress = `${Math.round((room.chapter / room.totalChapters) * 100)}%`;
  return (
    <Box>
      <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mb: "10px" }}>Continue listening</Typography>
      <Box
        onClick={() => onSelect(room)}
        sx={{
          bgcolor: "rgba(139,169,198,0.12)", border: "0.556px solid rgba(139,169,198,0.2)",
          borderRadius: "12px", p: "12px", display: "flex", alignItems: "center", gap: "12px",
          cursor: "pointer",
        }}
      >
        <Box component="img" src={room.bookCover} alt="" sx={{ width: 44, height: 44, objectFit: "cover", borderRadius: "4px", flexShrink: 0 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, lineHeight: "19.5px" }}>{room.bookTitle}</Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.5)", lineHeight: "16.5px", mb: "6px" }}>{`Chapter ${room.chapter} · 1:04:22`}</Typography>
          <Box sx={{ height: 4, bgcolor: "rgba(238,233,220,0.1)", borderRadius: "9999px", overflow: "hidden" }}>
            <Box sx={{ width: progress, height: "100%", bgcolor: c.gold, borderRadius: "9999px" }} />
          </Box>
        </Box>
        <Box
          onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
          sx={{ width: 36, height: 36, borderRadius: "50%", border: `1.667px solid ${c.pink}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          {playing
            ? <Box sx={{ display: "flex", gap: "2px" }}><Box sx={{ width: 3, height: 12, bgcolor: c.pink, borderRadius: "2px" }} /><Box sx={{ width: 3, height: 12, bgcolor: c.pink, borderRadius: "2px" }} /></Box>
            : <Box sx={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `10px solid ${c.pink}`, ml: "2px" }} />
          }
        </Box>
      </Box>
    </Box>
  );
}

// ── This week in rooms ─────────────────────────────────────────────────────────
const WEEK_LABELS = ["Top passage this week", "Most echoed", "Trending now"];

function ThisWeek({ rooms, onSelect }: { rooms: RoomData[]; onSelect: (r: RoomData) => void }) {
  return (
    <Box>
      <Box sx={{ mb: "10px" }}>
        <Typography sx={{ fontFamily: serif, fontWeight: 500, fontSize: 16, color: c.cream, lineHeight: "24px" }}>This week in rooms</Typography>
        <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.45)" }}>Passages the room is talking about</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {rooms.map((room, idx) => (
          <Box key={room.title} onClick={() => onSelect(room)} sx={{
            bgcolor: "rgba(238,233,220,0.03)", border: "0.556px solid rgba(238,233,220,0.08)",
            borderRadius: "12px", p: "12px", display: "flex", gap: "12px", alignItems: "flex-start",
            cursor: "pointer",
          }}>
            <Box component="img" src={room.bookCover} alt="" sx={{ width: 44, height: 60, objectFit: "cover", borderRadius: "4px", flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.4)", lineHeight: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", mb: "4px" }}>
                {WEEK_LABELS[idx] ?? WEEK_LABELS[0]}
              </Typography>
              <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 12, color: c.cream, lineHeight: "19.5px", mb: "8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {`A passage from ${room.bookTitle}...`}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MiniWave />
                <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.4)" }}>{room.title}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Audiobooks for you ─────────────────────────────────────────────────────────
const AUDIOBOOKS = [
  {
    cover: swimPondCover,
    title: "A Swim in a Pond in the Rain",
    author: "George Saunders",
    date: "Jan 11, 2021 · 14 hr, 44 min",
    blurb: "From the New York Times bestselling, Booker Prize–winning author of Lincoln in the Bardo and Tenth of December. The story follows...",
  },
  {
    cover: magicMountainCover,
    title: "The Magic Mountain",
    author: "Thomas Mann",
    date: "May 11, 2005 · 32 hr, 7 min",
    blurb: "It was the Magic Mountain that confirmed Thomas Mann as a Nobel prizewinner for literature. The story follows Hans Castorp's transformative journey at a...",
  },
];

function AudiobooksSection() {
  return (
    <Box>
      <SectionHead label="Audiobooks for you" sub="AI-powered recommendations based on your taste" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {AUDIOBOOKS.map((a) => (
          <Box key={a.title} sx={{
            bgcolor: "rgba(139,169,198,0.15)", border: "0.556px solid rgba(139,169,198,0.2)",
            borderRadius: "14px", p: "16px",
          }}>
            <Box sx={{ display: "flex", gap: "12px", mb: "12px" }}>
              <Box component="img" src={a.cover} alt="" sx={{ width: 80, height: 120, objectFit: "cover", borderRadius: "10px", flexShrink: 0, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontFamily: serif, fontWeight: 500, fontSize: 15, color: c.cream, lineHeight: "22.5px", mb: "4px" }}>{a.title}</Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.6)", lineHeight: "18px", mb: "4px" }}>{a.author}</Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.35)", lineHeight: "16.5px" }}>{a.date}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.55)", lineHeight: "21px", mb: "12px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {a.blurb}
            </Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Box sx={{
                bgcolor: "rgba(10,0,90,0.6)", border: "0.556px solid rgba(238,233,220,0.2)",
                borderRadius: "9999px", px: "14px", py: "7px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
              }}>
                <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.7)" }}>▶</Typography>
                <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: "rgba(238,233,220,0.7)", whiteSpace: "nowrap" }}>Preview audiobook</Typography>
              </Box>
              <Box sx={{
                bgcolor: "rgba(10,0,90,0.6)", border: "0.556px solid rgba(238,233,220,0.2)",
                borderRadius: "9999px", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Typography sx={{ fontSize: 12, color: "rgba(238,233,220,0.7)" }}>+</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Mood finder wizard ───────────────────────────────────────────────────────────
type WizardAnswers = { mood: string | null; pace: string | null; intent: string | null };

const WIZARD_STEPS: Array<{
  label: string;
  subtitle: string;
  key: keyof WizardAnswers;
  options: string[];
}> = [
  {
    label: "Find your perfect listen",
    subtitle: "What's your reading mood today?",
    key: "mood",
    options: ["Lost in another world", "Learning something new", "Relaxing escape", "Deep thinking"],
  },
  {
    label: "How do you like to read?",
    subtitle: "Pick the one that feels most like you.",
    key: "pace",
    options: [
      "Slow and deep, one chapter at a time",
      "A few chapters in one sitting",
      "I binge when I find the right book",
      "I'm trying to build a habit",
    ],
  },
  {
    label: "What do you want from the room?",
    subtitle: "This helps us find the right fit.",
    key: "intent",
    options: [
      "Just listen alongside others",
      "I want to talk about what I'm reading",
      "Surprise me with what others are reading",
      "I have a specific book in mind",
    ],
  },
];

const MOOD_TO_GENRE: Record<string, string> = {
  "Lost in another world": "Fiction",
  "Learning something new": "Non-Fiction",
  "Relaxing escape": "Wind Down",
  "Deep thinking": "Deep Work",
};

type WizardState = "quiz" | "thinking" | "results";

function MoodFinder({ rooms, onRoomSelect }: { rooms: RoomData[]; onRoomSelect: (r: RoomData) => void }) {
  const [step, setStep] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [answers, setAnswers] = useState<WizardAnswers>({ mood: null, pace: null, intent: null });
  const [wizState, setWizState] = useState<WizardState>("quiz");
  const [dotCount, setDotCount] = useState(1);
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    if (wizState !== "thinking") return;
    const id = setInterval(() => setDotCount((d) => (d === 3 ? 1 : d + 1)), 500);
    return () => clearInterval(id);
  }, [wizState]);

  const current = WIZARD_STEPS[step];
  const selected = answers[current.key];

  const transitionTo = (nextStep: number) => {
    setContentVisible(false);
    setTimeout(() => { setStep(nextStep); setContentVisible(true); }, 180);
  };

  const handleNext = () => {
    if (step < WIZARD_STEPS.length - 1) {
      transitionTo(step + 1);
    } else {
      console.log(answers);
      setWizState("thinking");
      setTimeout(() => {
        setWizState("results");
        setTimeout(() => setResultsVisible(true), 16);
      }, 2000);
    }
  };

  const handleBack = () => { if (step > 0) transitionTo(step - 1); };

  // Pick 3 rooms matching the selected mood genre, or fall back to spread picks
  const genre = answers.mood ? MOOD_TO_GENRE[answers.mood] ?? null : null;
  const recs = (genre ? rooms.filter((r) => r.genre === genre) : rooms).slice(0, 3);

  const cardShell = (children: React.ReactNode) => (
    <Box sx={{ bgcolor: "rgba(193,186,250,0.08)", border: "0.556px solid rgba(193,186,250,0.15)", borderRadius: "14px", p: "16px" }}>
      {children}
    </Box>
  );

  if (wizState === "thinking") {
    return cardShell(
      <Box sx={{ minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: "rgba(238,233,220,0.6)" }}>
          {"AI is thinking" + ".".repeat(dotCount)}
        </Typography>
      </Box>
    );
  }

  if (wizState === "results") {
    return cardShell(
      <Box sx={{ opacity: resultsVisible ? 1 : 0, transform: resultsVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "8px" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c.pink }} />
          <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.4)" }}>AI</Typography>
        </Box>
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mb: "2px" }}>
          Rooms picked for you
        </Typography>
        <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 13, color: "rgba(238,233,220,0.55)", mb: "12px" }}>
          Based on your answers
        </Typography>

        {/* 3 mini room cards */}
        <Box sx={{ display: "flex", gap: "8px" }}>
          {recs.map((room) => {
            const chColor = GENRE_CHAPTER_COLORS[room.genre] ?? { bg: "rgba(211,232,226,0.63)", border: "#d3e8e2" };
            return (
              <Box
                key={room.title}
                onClick={() => onRoomSelect(room)}
                sx={{ flex: 1, minWidth: 0, height: 138, borderRadius: "10px", position: "relative", overflow: "hidden", cursor: "pointer", flexShrink: 1 }}
              >
                <Box component="img" src={room.image} alt="" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,0,90,0.96) 0%, rgba(0,0,0,0) 55%)" }} />
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: "8px" }}>
                  <Box component="img" src={room.bookCover} alt="" sx={{ width: 26, height: 38, objectFit: "cover", borderRadius: "3px", border: `0.5px solid rgba(238,233,220,0.5)`, mb: "5px", display: "block" }} />
                  <Box sx={{ display: "inline-flex", bgcolor: chColor.bg, border: `0.556px solid ${chColor.border}`, borderRadius: "9999px", px: "5px", py: "1px", mb: "3px" }}>
                    <Typography sx={{ fontFamily: sans, fontSize: 8, color: c.navy, fontWeight: 600 }}>{`Ch. ${room.chapter}`}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: serif, fontWeight: 500, fontSize: 9, color: c.cream, lineHeight: "13px", display: "block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {room.bookTitle}
                  </Typography>
                  <Typography sx={{ fontFamily: sans, fontSize: 8, color: "rgba(238,233,220,0.45)", lineHeight: "12px" }}>
                    {room.genre}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  // quiz state
  return cardShell(
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "4px" }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c.pink }} />
        <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.4)" }}>AI</Typography>
      </Box>

      {/* Animated step content */}
      <Box sx={{ opacity: contentVisible ? 1 : 0, transform: contentVisible ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.18s ease, transform 0.18s ease" }}>
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, lineHeight: "19.5px", mb: "2px" }}>
          {current.label}
        </Typography>
        <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: "rgba(238,233,220,0.75)", mb: "14px" }}>
          {current.subtitle}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px", mb: "12px" }}>
          {current.options.map((opt) => (
            <Box
              key={opt}
              onClick={() => setAnswers((prev) => ({ ...prev, [current.key]: opt }))}
              sx={{
                border: `0.556px solid ${selected === opt ? "rgba(226,169,201,0.4)" : "rgba(238,233,220,0.1)"}`,
                bgcolor: selected === opt ? "rgba(226,169,201,0.08)" : "rgba(238,233,220,0.04)",
                borderRadius: "10px", px: "14px", py: "9px", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Typography sx={{ fontFamily: sans, fontSize: 12, color: selected === opt ? c.pink : "rgba(238,233,220,0.6)" }}>
                {opt}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Step progress dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "5px", mb: "12px" }}>
        {WIZARD_STEPS.map((_, i) => (
          <Box key={i} sx={{ height: 5, borderRadius: "9999px", width: i === step ? 16 : 5, bgcolor: i === step ? c.pink : "rgba(238,233,220,0.2)", transition: "width 0.3s ease, background-color 0.3s ease" }} />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography onClick={handleBack} sx={{ fontFamily: sans, fontSize: 11, color: step > 0 ? "rgba(238,233,220,0.5)" : "rgba(238,233,220,0.15)", cursor: step > 0 ? "pointer" : "default" }}>
          Back
        </Typography>
        <Box onClick={handleNext} sx={{ bgcolor: c.pink, borderRadius: "9999px", px: "16px", py: "6px", cursor: "pointer" }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: c.navy }}>
            {step === WIZARD_STEPS.length - 1 ? "Find my room" : "Next"}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

// ── Narrators to follow ─────────────────────────────────────────────────────────
const NARRATORS = [
  { name: "Sienna Wilson", room: "The Midnight Arc...", avatar: profile1 },
  { name: "Marcus Chan", room: "Soap Hotel Hour...", avatar: profile2 },
  { name: "Clara Osei", room: "Sunday Slow Room...", avatar: profile3 },
];

function Narrators() {
  const dragRef = useDragScroll();
  return (
    <Box>
      <SectionHead label="Story narrators to follow" />
      <Box ref={dragRef} sx={{ display: "flex", gap: "10px", overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
        {NARRATORS.map((n) => (
          <Box key={n.name} sx={{
            bgcolor: "rgba(238,233,220,0.04)", border: "0.556px solid rgba(238,233,220,0.1)",
            borderRadius: "14px", p: "14px", flexShrink: 0, width: 140,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}>
            <Box component="img" src={n.avatar} alt="" sx={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: c.cream, lineHeight: "16px" }}>{n.name}</Typography>
              <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.4)", lineHeight: "14px" }}>{n.room}</Typography>
            </Box>
            <Box sx={{
              border: `0.556px solid rgba(238,233,220,0.25)`, borderRadius: "9999px",
              px: "12px", py: "4px", cursor: "pointer", "&:hover": { bgcolor: "rgba(238,233,220,0.06)" },
            }}>
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 10, color: c.cream }}>Follow</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Bottom nav ──────────────────────────────────────────────────────────────────
function BottomNav({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const tabs = [
    { label: "Rooms",   Icon: RoomsIcon,    key: "rooms"   },
    { label: "Explore", Icon: DiscoverIcon, key: "discover"},
    { label: "Shelf",   Icon: LibraryIcon,  key: "shelf"   },
    { label: "Profile", Icon: ProfileIcon,  key: "profile" },
  ];
  return (
    <Box sx={{ bgcolor: c.navy, borderTop: "0.556px solid #1a1070", px: "24px", pt: "16px", pb: "20px", flexShrink: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {tabs.map((t) => {
          const isActive = t.key === "discover"; // Discover tab is always active on this screen
          const color = isActive ? c.pink : "rgba(211,232,226,0.7)";
          return (
            <Box key={t.key} onClick={() => onNavigate?.(t.key)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", minWidth: 40 }}>
              <t.Icon color={color} />
              <Typography sx={{ fontFamily: sans, fontSize: 12, color, whiteSpace: "nowrap" }}>
                {t.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Main Explore page ───────────────────────────────────────────────────────────
const FILTER_TABS = ["For you", "Fiction", "Non-fiction", "Thriller", "Romance"];

type ExploreProps = {
  rooms: RoomData[];
  onRoomSelect: (room: RoomData) => void;
  onNavigate?: (tab: string) => void;
};

export default function Explore({ rooms, onRoomSelect, onNavigate }: ExploreProps) {
  const [activeTab, setActiveTab] = useState("For you");
  const filterTabsRef = useDragScroll();

  const heroRooms = rooms.slice(0, 3);
  const forYouRooms = rooms.slice(3, 7);
  const continueRoom = rooms[0];
  const weekRooms = rooms.slice(0, 3);

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: c.navy, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Fixed header ───────────────────────────── */}
      <Box sx={{ flexShrink: 0, px: "24px", pt: "15px", pb: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo: animated cat + wordmark */}
          <Box sx={{ position: "relative", width: 102, height: 43 }}>
            {/* Cat 1 — slides in from left then fades out */}
            <Box sx={{
              position: "absolute", top: 0, left: 54, width: 43, height: 28, opacity: 0,
              "@keyframes cat1-transform": {
                "0%":    { transform: "translateX(-34px)" },
                "53.6%": { transform: "translateX(-34px)", animationTimingFunction: "ease-in" },
                "75%":   { transform: "translateX(0px)" },
                "100%":  { transform: "translateX(0px)" },
              },
              "@keyframes cat1-opacity": {
                "0%":    { opacity: 0 },
                "17.9%": { opacity: 1 },
                "82.1%": { opacity: 1 },
                "100%":  { opacity: 0 },
              },
              animation: "cat1-transform 2.8s linear forwards, cat1-opacity 2.8s ease forwards",
              animationDelay: "0.5s",
            }}>
              <Box sx={{
                "@keyframes cat1-wobble": {
                  "0%":    { transform: "translateY(0) rotate(0deg)" },
                  "53.6%": { transform: "translateY(0) rotate(0deg)" },
                  "57.1%": { transform: "translateY(-2px) rotate(1.5deg)" },
                  "60.7%": { transform: "translateY(0) rotate(0deg)" },
                  "64.3%": { transform: "translateY(-2px) rotate(-1.5deg)" },
                  "67.9%": { transform: "translateY(0) rotate(0deg)" },
                  "71.4%": { transform: "translateY(-2px) rotate(1.5deg)" },
                  "75%":   { transform: "translateY(0) rotate(0deg)" },
                  "100%":  { transform: "translateY(0) rotate(0deg)" },
                },
                animation: "cat1-wobble 2.8s linear forwards",
                animationDelay: "0.5s",
              }}>
                <Box component="img" src={catLogo1} alt="" sx={{ width: 43, height: 28, display: "block", transform: "rotate(180deg) scaleY(-1)" }} />
              </Box>
            </Box>
            {/* Cat 2 — fades in at end */}
            <Box sx={{
              position: "absolute", top: -3, left: 54, width: 54, height: 35, opacity: 0,
              "@keyframes cat2-opacity": {
                "0%":    { opacity: 0 },
                "82.1%": { opacity: 0 },
                "100%":  { opacity: 1 },
              },
              animation: "cat2-opacity 2.8s linear forwards",
              animationDelay: "0.5s",
            }}>
              <Box sx={{
                "@keyframes cat2-wobble": {
                  "0%":   { transform: "translateY(0) rotate(0deg)" },
                  "35%":  { transform: "translateY(-6px) rotate(5deg)" },
                  "60%":  { transform: "translateY(1px) rotate(-2.5deg)" },
                  "72%":  { transform: "translateY(-2px) rotate(1.5deg)" },
                  "84%":  { transform: "translateY(0.5px) rotate(-0.5deg)" },
                  "100%": { transform: "translateY(0) rotate(0deg)" },
                },
                animation: "cat2-wobble 0.55s ease forwards",
                animationDelay: "3.5s",
              }}>
                <Box component="img" src={catLogo2} alt="" sx={{ width: 54, height: 35, display: "block" }} />
              </Box>
            </Box>
            {/* Wordmark */}
            <Typography sx={{
              position: "absolute", bottom: 0, left: 0,
              fontFamily: serif, fontWeight: 600, fontSize: "18.4px", lineHeight: "22px",
              letterSpacing: "-0.27px", color: c.cream, whiteSpace: "nowrap",
              opacity: 0,
              "@keyframes wordmark-fade": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
              animation: "wordmark-fade 0.5s ease forwards",
            }}>
              storyroom
            </Typography>
          </Box>
          {/* Profile avatar */}
          <Box sx={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, #e2a9c9 0%, #d3e8e2 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: "50%", m: "2px",
              background: "linear-gradient(135deg, #eee9dc 0%, #d3e8e2 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Typography sx={{ fontFamily: serif, fontSize: 14, color: c.navy, fontWeight: 700 }}>L</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Filter tabs ────────────────────────────── */}
      <Box ref={filterTabsRef} sx={{
        flexShrink: 0, display: "flex", gap: "8px", overflowX: "auto", px: "16px", pb: "10px",
        "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none",
      }}>
        {FILTER_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Box
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                flexShrink: 0, height: 30, px: "14px", borderRadius: "9999px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                bgcolor: isActive ? "rgba(226,169,201,0.2)" : "rgba(193,186,250,0.15)",
                border: `0.556px solid ${isActive ? c.pink : "rgba(193,186,250,0.3)"}`,
              }}
            >
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: isActive ? c.pink : "rgba(193,186,250,0.8)", whiteSpace: "nowrap", lineHeight: "16.5px" }}>
                {tab}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── Scrollable content ─────────────────────── */}
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "28px", pb: "20px" }}>

          {/* Hero carousel */}
          <HeroCarousel rooms={heroRooms} onSelect={onRoomSelect} />

          {/* Inner sections with horizontal padding */}
          <Box sx={{ px: "16px", display: "flex", flexDirection: "column", gap: "28px" }}>
            <StorybotCard />
            <RoomsForYou rooms={forYouRooms} onSelect={onRoomSelect} />
            {continueRoom && <ContinueListening room={continueRoom} onSelect={onRoomSelect} />}
            <ThisWeek rooms={weekRooms} onSelect={onRoomSelect} />
            <AudiobooksSection />
            <MoodFinder rooms={rooms} onRoomSelect={onRoomSelect} />
            <Narrators />
          </Box>
        </Box>
      </Box>

      {/* ── Bottom nav ─────────────────────────────── */}
      <BottomNav onNavigate={onNavigate} />
    </Box>
  );
}
