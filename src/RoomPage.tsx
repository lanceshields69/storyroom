import { Box, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import narratorAudio from "./assets/narrator-2.mp3";

// Inline SVG icons — no dependency on Figma MCP server
const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke="#EEE9DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconMore = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5"  r="1.5" fill="#EEE9DC"/>
    <circle cx="12" cy="12" r="1.5" fill="#EEE9DC"/>
    <circle cx="12" cy="19" r="1.5" fill="#EEE9DC"/>
  </svg>
);
const IconRewind = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.5 5L4 12l8.5 7V5z" fill="#D3E8E2"/>
    <path d="M20.5 5L12 12l8.5 7V5z" fill="#D3E8E2"/>
  </svg>
);
const IconPlay = ({ playing }: { playing: boolean }) =>
  playing ? (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6"  y="5" width="5" height="18" rx="2" fill="#0a005a"/>
      <rect x="17" y="5" width="5" height="18" rx="2" fill="#0a005a"/>
    </svg>
  ) : (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M8 5l16 9-16 9V5z" fill="#0a005a"/>
    </svg>
  );
const IconForward = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.5 5l8.5 7-8.5 7V5z" fill="#D3E8E2"/>
    <path d="M3.5 5L12 12 3.5 19V5z" fill="#D3E8E2"/>
  </svg>
);
const IconSleep = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#D3E8E2" strokeWidth="1.2"/>
    <path d="M8 4.5V8l2.5 2.5" stroke="#D3E8E2" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="#D3E8E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
import { RoomsIcon, DiscoverIcon, LibraryIcon, ProfileIcon } from "./NavIcons";

const c = {
  navy: "#0a005a",
  navyBorder: "#1a1070",
  pink: "#e2a9c9",
  cream: "#eee9dc",
  sage: "#d3e8e2",
};

const serif = "'Besley', serif";
const sans = "'Plus Jakarta Sans', sans-serif";

// Decorative listening dots — positions scaled to fit inside the image card
const DOTS = [
  { left: 250.78, top: 36.55,  size: 6,  color: c.pink, opacity: 0.76, glow: true  },
  { left: 127.71, top: 76.43,  size: 14, color: c.pink, opacity: 0.62, glow: true  },
  { left: 110,    top: 62.77,  size: 6,  color: c.sage, opacity: 0.61, glow: false },
  { left: 224.63, top: 42.85,  size: 14, color: c.sage, opacity: 0.45, glow: false },
  { left: 66.42,  top: 1.88,   size: 10, color: c.pink, opacity: 0.77, glow: true  },
  { left: 282.15, top: 70.78,  size: 12, color: c.sage, opacity: 0.63, glow: false },
  { left: 91.15,  top: 35.74,  size: 10, color: c.sage, opacity: 0.58, glow: false },
  { left: 35.25,  top: 47.93,  size: 14, color: c.pink, opacity: 0.52, glow: true  },
  { left: 101.92, top: 59.63,  size: 8,  color: c.sage, opacity: 0.69, glow: false },
  { left: 162.52, top: 9.09,   size: 10, color: c.sage, opacity: 0.42, glow: false },
  { left: 282.64, top: 4.82,   size: 8,  color: c.sage, opacity: 0.58, glow: false },
  { left: 60.17,  top: 72.08,  size: 14, color: c.sage, opacity: 0.68, glow: false },
  { left: 91.38,  top: 63.45,  size: 8,  color: c.sage, opacity: 0.75, glow: false },
  { left: 284.65, top: 46.12,  size: 10, color: c.pink, opacity: 0.47, glow: true  },
  { left: 186.18, top: 42.39,  size: 6,  color: c.sage, opacity: 0.50, glow: false },
  { left: 208.2,  top: 28.27,  size: 14, color: c.sage, opacity: 0.79, glow: false },
  { left: 130.82, top: 8.99,   size: 8,  color: c.pink, opacity: 0.77, glow: true  },
  { left: 263.65, top: 40.86,  size: 12, color: c.sage, opacity: 0.76, glow: false },
  { left: 144.97, top: 10.16,  size: 6,  color: c.pink, opacity: 0.71, glow: true  },
  { left: 75.06,  top: 54.22,  size: 12, color: c.sage, opacity: 0.43, glow: false },
  { left: 209.31, top: 0.16,   size: 12, color: c.pink, opacity: 0.52, glow: true  },
  { left: 142.79, top: 54.51,  size: 14, color: c.sage, opacity: 0.71, glow: false },
  { left: 171.06, top: 11.52,  size: 8,  color: c.pink, opacity: 0.72, glow: true  },
  { left: 209.48, top: 89.51,  size: 12, color: c.pink, opacity: 0.76, glow: true  },
  { left: 230,    top: 68.91,  size: 8,  color: c.pink, opacity: 0.70, glow: true  },
  { left: 229.1,  top: 84.06,  size: 14, color: c.sage, opacity: 0.51, glow: false },
];

export type RoomData = {
  title: string;
  bookTitle: string;
  author: string;
  listeners: string;
  genre: string;
  genreColor: string;
  accentColor: string;
  image: string;
  bookCover: string;
  chapter: number;
  totalChapters: number;
  day: number;
};

type Props = {
  room: RoomData;
  onBack: () => void;
  onEnterSalon: () => void;
  onNavigate?: (tab: string) => void;
};

export default function RoomPage({ room, onBack, onEnterSalon, onNavigate }: Props) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(narratorAudio);
    audioRef.current = audio;
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play();
    else audio.pause();
  }, [playing]);

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const [dotOffsets, setDotOffsets] = useState<{ x: number; y: number }[]>(
    DOTS.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (!playing) {
      setDotOffsets(DOTS.map(() => ({ x: 0, y: 0 })));
      return;
    }
    const move = () =>
      setDotOffsets(DOTS.map(() => ({
        x: (Math.random() - 0.5) * 32,
        y: (Math.random() - 0.5) * 22,
      })));
    move();
    const id = setInterval(move, 2200);
    return () => clearInterval(id);
  }, [playing]);

  // Parse listener count number from e.g. "214 listening"
  const listenerCount = parseInt(room.listeners.replace(/\D/g, ""), 10) || 0;

  // Build chapter pills
  const chapterPills = Array.from({ length: room.totalChapters }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        width: 393,
        height: 874,
        bgcolor: c.navy,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 0, sm: "44px" },
        boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" },
      }}
    >
      {/* ── Header ─────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          pt: "56px",
          pb: "10px",
          flexShrink: 0,
        }}
      >
        <Box
          onClick={onBack}
          sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <IconBack />
        </Box>

        <Typography
          sx={{
            fontFamily: sans,
            fontSize: 20,
            lineHeight: "30px",
            letterSpacing: "-0.5px",
            color: c.cream,
          }}
        >
          {room.title}
        </Typography>

        <Box sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IconMore />
        </Box>
      </Box>

      {/* ── Book cover + animated dots ─────────── */}
      <Box
        sx={{
          mx: "24px",
          height: 228,
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Book photo */}
        <Box
          component="img"
          src={room.image}
          alt=""
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient fade */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(10,0,90,0.45) 65%, rgba(10,0,90,0.9) 100%)",
          }}
        />

        {/* Animated listening dots — overlaid on image */}
        {DOTS.map((dot, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              bgcolor: dot.color,
              borderRadius: "50%",
              opacity: dot.opacity,
              boxShadow: dot.glow ? `0 0 8px rgba(226,169,201,0.4)` : "none",
              transform: `translate(${dotOffsets[i].x}px, ${dotOffsets[i].y}px)`,
              transition: playing
                ? `transform ${1.8 + (i % 5) * 0.3}s ease-in-out`
                : "transform 1.2s ease-in-out",
              zIndex: 2,
            }}
          />
        ))}

        {/* Book cover + title + author overlay */}
        <Box
          sx={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            px: "20px", pb: "16px", zIndex: 3,
            display: "flex", alignItems: "flex-end", gap: "14px",
          }}
        >
          {/* Book cover thumbnail */}
          <Box
            component="img"
            src={room.bookCover}
            alt=""
            sx={{
              width: 64,
              height: 94,
              objectFit: "cover",
              borderRadius: "6px",
              flexShrink: 0,
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          />
          {/* Title + author */}
          <Box sx={{ pb: "4px" }}>
            <Typography
              sx={{
                fontFamily: serif,
                fontWeight: 500,
                fontSize: 22,
                lineHeight: "30px",
                letterSpacing: "-0.55px",
                color: c.cream,
                mb: "4px",
              }}
            >
              {room.bookTitle}
            </Typography>
            <Typography
              sx={{ fontFamily: sans, fontSize: 14, lineHeight: "21px", color: c.sage }}
            >
              {room.author}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Reading schedule ────────────────────── */}
      <Box sx={{ px: "24px", mt: "14px", flexShrink: 0 }}>
        <Typography sx={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: c.cream, mb: "10px" }}>
          Reading schedule:
        </Typography>

        {/* Chapter pills — horizontal scroll */}
        <Box
          sx={{
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            pb: "2px",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {chapterPills.map((ch) => {
            const done = ch < room.chapter;
            const active = ch === room.chapter;
            return (
              <Box
                key={ch}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  flexShrink: 0,
                  height: "36px",
                  px: "14px",
                  borderRadius: "9999px",
                  bgcolor: active
                    ? c.pink
                    : done
                    ? "rgba(90,72,190,0.55)"
                    : "transparent",
                  border: active
                    ? "none"
                    : done
                    ? "none"
                    : "1px solid rgba(120,100,200,0.5)",
                  cursor: "pointer",
                }}
              >
                {done && <IconCheck />}
                <Typography
                  sx={{
                    fontFamily: sans,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: active
                      ? "#3a1a4a"
                      : done
                      ? "rgba(238,233,220,0.75)"
                      : "rgba(238,233,220,0.45)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {active ? `Ch. ${ch} · Today` : `Ch. ${ch}`}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Pace status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mt: "8px" }}>
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#7ed8a4" }} />
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.5)" }}>
            You're on pace with the room
          </Typography>
        </Box>
      </Box>

      {/* ── Stats row ───────────────────────────── */}
      <Box
        sx={{
          mx: "24px",
          mt: "12px",
          display: "flex",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        {[
          { value: room.chapter, label: "current chapter" },
          { value: room.day, label: "days in" },
          { value: listenerCount, label: "reading with you" },
        ].map(({ value, label }) => (
          <Box
            key={label}
            sx={{
              flex: 1,
              bgcolor: "#352A8C",
              borderRadius: "12px",
              py: "10px",
              px: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <Typography
              sx={{
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1,
                color: c.cream,
                letterSpacing: "0px",
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontFamily: sans,
                fontSize: 10,
                color: "rgba(238,233,220,0.45)",
                textAlign: "center",
                lineHeight: "14px",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Listener count ──────────────────────── */}
      <Typography
        sx={{
          fontFamily: sans,
          fontSize: 14,
          lineHeight: "21px",
          color: c.sage,
          textAlign: "center",
          flexShrink: 0,
          mt: "36px",
          mb: "4px",
        }}
      >
        {listenerCount} people listening with you
      </Typography>

      {/* ── Player controls ─────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          flexShrink: 0,
          mb: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: c.sage }}>15</Typography>
          <IconRewind />
        </Box>

        <Box
          onClick={() => setPlaying(!playing)}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: c.pink,
            boxShadow: "0 0 24px rgba(226,169,201,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            "&:hover": { transform: "scale(1.06)", boxShadow: "0 0 36px rgba(226,169,201,0.7)" },
          }}
        >
          <IconPlay playing={playing} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
          <IconForward />
          <Typography sx={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: c.sage }}>15</Typography>
        </Box>
      </Box>

      {/* ── Scrubber ────────────────────────────── */}
      <Box sx={{ mx: "24px", flexShrink: 0, mb: "8px" }}>
        <Box
          onClick={handleScrubberClick}
          sx={{
            height: 4,
            bgcolor: "rgba(255,255,255,0.25)",
            borderRadius: "9999px",
            overflow: "hidden",
            mb: "8px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: duration ? `${(currentTime / duration) * 100}%` : "0%",
              height: "100%",
              bgcolor: c.pink,
              borderRadius: "9999px",
              boxShadow: "0 0 8px rgba(226,169,201,0.4)",
              transition: "width 0.5s linear",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: sans, fontSize: 12, lineHeight: "18px", color: c.sage }}>
            {fmt(currentTime)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 12, lineHeight: "18px", color: c.sage, cursor: "pointer" }}>
              1x
            </Typography>
            <IconSleep />
          </Box>
          <Typography sx={{ fontFamily: sans, fontSize: 12, lineHeight: "18px", color: c.sage }}>
            {fmt(duration)}
          </Typography>
        </Box>
      </Box>

      {/* ── Spacer ──────────────────────────────── */}
      <Box sx={{ flex: 1, maxHeight: "20px" }} />

      {/* ── Enter the Salon button ──────────────── */}
      <Box sx={{ px: "24px", pb: "16px", flexShrink: 0 }}>
        <Box
          onClick={onEnterSalon}
          sx={{
            width: "100%",
            py: "14px",
            borderRadius: "9999px",
            bgcolor: "#e2a9c9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
            "&:hover": { opacity: 0.88 },
          }}
        >
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#0a005a" }}>
            Enter the Salon
          </Typography>
        </Box>
      </Box>

      {/* ── Bottom navigation ───────────────────── */}
      <Box
        sx={{
          bgcolor: c.navy,
          borderTop: `0.556px solid ${c.navyBorder}`,
          px: "24px",
          pt: "16px",
          pb: "20px",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {[
            { label: "Rooms",   Icon: RoomsIcon,    key: "rooms"   },
            { label: "Explore", Icon: DiscoverIcon, key: "discover"},
            { label: "Shelf",   Icon: LibraryIcon,  key: "shelf"   },
            { label: "Profile", Icon: ProfileIcon,  key: "profile" },
          ].map((item) => {
            const isActive = item.key === "rooms";
            const color = isActive ? c.pink : "rgba(211,232,226,0.7)";
            return (
              <Box
                key={item.key}
                onClick={() => { if (item.key === "rooms") { onBack(); } else { onBack(); onNavigate?.(item.key); } }}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", minWidth: 40 }}
              >
                <item.Icon color={color} />
                <Typography sx={{ fontFamily: sans, fontSize: 12, lineHeight: "16px", color, whiteSpace: "nowrap" }}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
