import { Box, Typography } from "@mui/material";
import type { RoomData } from "./RoomPage";
import { RoomsIcon, DiscoverIcon, LibraryIcon, ProfileIcon } from "./NavIcons";

import catLogo1    from "./assets/cat-logo-1.svg";
import catLogo2    from "./assets/cat-logo-2.svg";
import profile1    from "./assets/profile1.jpg";
import profile2    from "./assets/profile2.jpg";
import profile3    from "./assets/profile3.jpg";
import profile4    from "./assets/profile4.jpg";
import profile5    from "./assets/profile5.jpg";
import coverHobbit from "./assets/the-hobbit.jpg";

const sans  = "'Plus Jakarta Sans', sans-serif";
const serif = "'Besley', serif";
const c = {
  navy:       "#0a005a",
  navyBorder: "#1a1070",
  cream:      "#eee9dc",
  pink:       "#e2a9c9",
  gold:       "#cdb670",
  sage:       "#d3e8e2",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const PROFILE_ROOMS = [
  {
    name: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien",
    chapter: 3, totalChapters: 24, memberCount: 189, active: true, progress: 12,
    avatars: [profile1, profile2, profile3], cover: coverHobbit, coverColor: "#2D1B5E",
  },
  {
    name: "Sunday Slow room", bookTitle: "Piranesi", author: "Susanna Clarke",
    chapter: 11, totalChapters: 18, memberCount: 94, active: true, progress: 61,
    avatars: [profile4, profile5, profile1], cover: null, coverColor: "#6B3A2A",
  },
];

const WAVE_HEIGHTS = [5,9,7,13,9,15,7,11,17,9,13,7,15,9,11,7,13,9,7,11];

const PASSAGES = [
  {
    bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E",
    chapter: 3, timestamp: "1:04:22",
    quote: "...and the night seemed more beautiful and more sad than any he had known...",
    room: "The Midnight Archive", played: 0.4, reactions: ["❤️", "😉"],
  },
  {
    bookTitle: "Piranesi", cover: null, coverColor: "#6B3A2A",
    chapter: 11, timestamp: "2:18:05",
    quote: "I am not lost. I have always been exactly where I am...",
    room: "Sunday Slow room", played: 0.6, reactions: ["❤️", "😮"],
  },
  {
    bookTitle: "The Name of the Wind", cover: null, coverColor: "#0D3D3A",
    chapter: 22, timestamp: "3:44:10",
    quote: "It's the questions we can't answer that teach us the most...",
    room: "Deep Readers room", played: 0.3, reactions: ["😎", "❤️"],
  },
];

const FINISHED_BOOKS = [
  { title: "The Name of the Wind", color: "#0D3D3A" },
  { title: "Never Let Me Go",      color: "#2A4A6B" },
  { title: "Station Eleven",       color: "#1A1A5C" },
];

// ── Passage waveform ──────────────────────────────────────────────────────────
function PassageWave({ played }: { played: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1px", height: 18 }}>
      {WAVE_HEIGHTS.map((h, i) => (
        <Box key={i} sx={{
          width: 2, height: h, borderRadius: "9999px", flexShrink: 0,
          bgcolor: i / WAVE_HEIGHTS.length < played ? c.pink : "rgba(238,233,220,0.18)",
        }} />
      ))}
    </Box>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────
function BottomNav({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const tabs = [
    { label: "Rooms",   Icon: RoomsIcon,    key: "rooms"   },
    { label: "Explore", Icon: DiscoverIcon, key: "discover"},
    { label: "Shelf",   Icon: LibraryIcon,  key: "shelf"   },
    { label: "Profile", Icon: ProfileIcon,  key: "profile" },
  ];
  return (
    <Box sx={{ bgcolor: c.navy, borderTop: `0.556px solid ${c.navyBorder}`, px: "24px", pt: "16px", pb: "20px", flexShrink: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {tabs.map((t) => {
          const isActive = t.key === "profile";
          const color = isActive ? c.pink : c.sage;
          return (
            <Box key={t.key} onClick={() => onNavigate?.(t.key)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", minWidth: 40 }}>
              <t.Icon color={color} />
              <Typography sx={{ fontFamily: sans, fontSize: 12, color, whiteSpace: "nowrap" }}>{t.label}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Main Profile component ─────────────────────────────────────────────────────
type ProfileProps = {
  rooms: RoomData[];
  onRoomSelect: (room: RoomData) => void;
  onSalonOpen: (room: RoomData) => void;
  onNavigate?: (tab: string) => void;
};

export default function Profile({ rooms, onRoomSelect, onSalonOpen, onNavigate }: ProfileProps) {
  const findRoom = (bookTitle: string) =>
    rooms.find((r) => r.bookTitle === bookTitle) ?? rooms[0];

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: c.navy, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Logo row ───────────────────────────────────── */}
      <Box sx={{ flexShrink: 0, px: "24px", pt: "15px", pb: "0px" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box sx={{ position: "relative", width: 102, height: 43 }}>
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
            <Typography sx={{
              position: "absolute", bottom: 0, left: 0, fontFamily: serif, fontWeight: 600, fontSize: "18.4px", lineHeight: "22px", letterSpacing: "-0.27px", color: c.cream, whiteSpace: "nowrap",
              opacity: 0,
              "@keyframes wordmark-fade": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
              animation: "wordmark-fade 0.5s ease forwards",
            }}>
              storyroom
            </Typography>
          </Box>
          {/* Settings + Share icons */}
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Box
              onClick={() => console.log("settings tapped")}
              sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "rgba(238,233,220,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3"/>
                <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </Box>
            <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "rgba(238,233,220,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="12.5" cy="3.5" r="2" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3"/>
                <circle cx="3.5"  cy="8"   r="2" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3"/>
                <circle cx="12.5" cy="12.5" r="2" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3"/>
                <line x1="5.4" y1="7"   x2="10.6" y2="4.5"  stroke="rgba(238,233,220,0.6)" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="5.4" y1="9"   x2="10.6" y2="11.5" stroke="rgba(238,233,220,0.6)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Scrollable content ─────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>

        {/* ── Atmospheric header block ────────────────── */}
        <Box sx={{
          width: "100%", height: 220,
          background: "linear-gradient(to bottom, #1a0850 0%, #0A005A 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          pt: "24px", pb: "20px", boxSizing: "border-box",
        }}>
          {/* Profile photo */}
          <Box component="img" src={profile1} alt="mireille_r" sx={{
            width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
            border: "2px solid rgba(238,233,220,0.3)", mb: "8px", flexShrink: 0,
          }} />
          {/* Display name */}
          <Typography sx={{ fontFamily: serif, fontSize: 20, color: c.cream, lineHeight: "26px", mb: "2px" }}>
            mireille_r
          </Typography>
          {/* Handle */}
          <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.45)", mb: "4px" }}>
            @mireille
          </Typography>
          {/* Reader fingerprint */}
          <Typography sx={{ fontFamily: sans, fontStyle: "italic", fontSize: 11, color: "rgba(238,233,220,0.4)", mb: "12px", textAlign: "center", px: "24px" }}>
            Literary fiction · finishes most books · active in salons
          </Typography>
          {/* Action buttons */}
          <Box sx={{ display: "flex", gap: "8px" }}>
            {["Edit profile", "Share profile"].map((label) => (
              <Box key={label} sx={{ height: 36, px: "16px", borderRadius: "9999px", bgcolor: "rgba(238,233,220,0.08)", border: "0.5px solid rgba(238,233,220,0.15)", display: "flex", alignItems: "center", cursor: "pointer" }}>
                <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 12, color: c.cream, whiteSpace: "nowrap" }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Stat chips ─────────────────────────────── */}
        <Box sx={{ display: "flex", gap: "8px", mx: "16px", mt: "16px" }}>
          {[
            { value: "9",  label: "books finished" },
            { value: "3",  label: "rooms joined"   },
            { value: "14", label: "passages shared" },
          ].map((s) => (
            <Box key={s.label} sx={{ flex: 1, bgcolor: "rgba(238,233,220,0.04)", border: "0.5px solid rgba(238,233,220,0.08)", borderRadius: "12px", py: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ fontFamily: serif, fontSize: 20, color: c.cream, lineHeight: "26px" }}>{s.value}</Typography>
              <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.4)", mt: "2px", textAlign: "center", px: "4px", lineHeight: "14px" }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Thin divider */}
        <Box sx={{ height: "0.5px", bgcolor: "rgba(238,233,220,0.06)", mx: 0, mt: "16px" }} />

        {/* ── Section 1: Currently reading ─────────── */}
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mx: "16px", mt: "14px", mb: "10px" }}>
          Currently reading
        </Typography>

        <Box sx={{ mx: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {PROFILE_ROOMS.map((card) => {
            const roomData = findRoom(card.bookTitle);
            return (
              <Box
                key={card.name}
                onClick={() => onRoomSelect(roomData)}
                sx={{ bgcolor: "rgba(238,233,220,0.04)", border: "0.5px solid rgba(238,233,220,0.08)", borderRadius: "14px", p: "12px", display: "flex", gap: "12px", cursor: "pointer" }}
              >
                {card.cover ? (
                  <Box component="img" src={card.cover} alt={card.bookTitle} sx={{ width: 44, height: 64, objectFit: "cover", borderRadius: "4px", border: `0.5px solid ${c.gold}`, flexShrink: 0 }} />
                ) : (
                  <Box sx={{ width: 44, height: 64, borderRadius: "4px", border: `0.5px solid ${c.gold}`, bgcolor: card.coverColor, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontFamily: sans, fontSize: 6, color: c.gold, textAlign: "center", px: "2px", lineHeight: "9px" }}>{card.bookTitle}</Typography>
                  </Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "3px" }}>
                    <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: "6px" }}>
                      {card.name}
                    </Typography>
                    <Box sx={{ bgcolor: "rgba(226,169,201,0.15)", border: `0.5px solid ${c.pink}`, borderRadius: "9999px", px: "7px", py: "2px", flexShrink: 0 }}>
                      <Typography sx={{ fontFamily: sans, fontSize: 9, color: c.pink, whiteSpace: "nowrap" }}>
                        {`Active · Ch. ${card.chapter}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.5)", mb: "7px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {card.bookTitle} · {card.author}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: "8px" }}>
                    {card.avatars.map((src, i) => (
                      <Box key={i} component="img" src={src} sx={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(10,0,90,0.6)", ml: i > 0 ? "-6px" : 0, zIndex: card.avatars.length - i }} />
                    ))}
                    <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.35)", ml: "6px" }}>
                      {card.memberCount} members
                    </Typography>
                    <Typography
                      component="span"
                      onClick={(e) => { e.stopPropagation(); onSalonOpen(roomData); }}
                      sx={{ fontFamily: sans, fontSize: 10, color: "rgba(211,232,226,0.6)", ml: "3px", cursor: "pointer" }}
                    >
                      · Salon open
                    </Typography>
                  </Box>
                  <Box sx={{ height: 3, bgcolor: "rgba(238,233,220,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                    <Box sx={{ width: `${card.progress}%`, height: "100%", bgcolor: c.gold, borderRadius: "9999px" }} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ── Section 2: Your passages ──────────────── */}
        <Box sx={{ mx: "16px", mt: "20px", mb: "10px" }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mb: "4px" }}>
            Your passages
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.35)" }}>
            Moments you've shared in salons
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "8px", pl: "16px", pr: "8px", overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
          {PASSAGES.map((p, idx) => (
            <Box key={idx} sx={{
              width: 160, flexShrink: 0, bgcolor: "rgba(5,0,40,0.7)",
              border: "0.5px solid rgba(238,233,220,0.1)", borderRadius: "12px", p: "10px",
              display: "flex", flexDirection: "column", gap: "8px",
            }}>
              {/* Cover + chapter/timestamp */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                {p.cover ? (
                  <Box component="img" src={p.cover} alt={p.bookTitle} sx={{ width: 24, height: 36, objectFit: "cover", borderRadius: "2px", border: `0.5px solid ${c.gold}`, flexShrink: 0 }} />
                ) : (
                  <Box sx={{ width: 24, height: 36, borderRadius: "2px", border: `0.5px solid ${c.gold}`, bgcolor: p.coverColor, flexShrink: 0 }} />
                )}
                <Typography sx={{ fontFamily: sans, fontSize: 9, color: `rgba(205,182,112,0.8)`, textTransform: "uppercase", letterSpacing: "0.4px", lineHeight: "13px", mt: "2px" }}>
                  {`Ch. ${p.chapter} · ${p.timestamp}`}
                </Typography>
              </Box>

              {/* Quote */}
              <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 11, color: "rgba(238,233,220,0.65)", lineHeight: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.quote}
              </Typography>

              {/* Waveform */}
              <PassageWave played={p.played} />

              {/* Room name */}
              <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.35)", lineHeight: "13px" }}>
                {p.room}
              </Typography>

              {/* Reaction chips */}
              <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {p.reactions.map((emoji, i) => (
                  <Box key={i} sx={{ bgcolor: "rgba(238,233,220,0.06)", border: "0.5px solid rgba(238,233,220,0.1)", borderRadius: "9999px", px: "6px", py: "2px" }}>
                    <Typography sx={{ fontSize: 12, lineHeight: 1.4 }}>{emoji}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── Section 3: Books finished ──────────────── */}
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mx: "16px", mt: "20px", mb: "10px" }}>
          Books finished
        </Typography>

        <Box sx={{ px: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {FINISHED_BOOKS.map((book) => (
            <Box key={book.title} sx={{ aspectRatio: "1", borderRadius: "10px", overflow: "hidden", position: "relative", bgcolor: book.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontFamily: sans, fontSize: 7, color: c.gold, textAlign: "center", px: "6px", lineHeight: "10px", userSelect: "none" }}>
                {book.title}
              </Typography>
              {/* Antique Gold completed indicator */}
              <Box sx={{ position: "absolute", bottom: 5, right: 5, height: 16, px: "6px", borderRadius: "9999px", bgcolor: c.gold, display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography sx={{ fontFamily: sans, fontSize: 7, fontWeight: 600, color: c.navy, whiteSpace: "nowrap", lineHeight: 1 }}>Completed</Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 8, fontWeight: 700, color: c.navy, lineHeight: 1 }}>✓</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* See all button */}
        <Box sx={{ mx: "16px", mt: "12px" }}>
          <Box sx={{ bgcolor: "rgba(238,233,220,0.06)", border: "0.5px solid rgba(238,233,220,0.12)", borderRadius: "20px", py: "14px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.6)" }}>
              See all finished books
            </Typography>
          </Box>
        </Box>

        {/* Bottom clearance */}
        <Box sx={{ height: 32 }} />
      </Box>

      {/* ── Bottom nav ──────────────────────────────── */}
      <BottomNav onNavigate={onNavigate} />
    </Box>
  );
}
