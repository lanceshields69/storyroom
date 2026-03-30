import { Box, Typography } from "@mui/material";
import { useState } from "react";
import type { RoomData } from "./RoomPage";
import { RoomsIcon, DiscoverIcon, LibraryIcon, ProfileIcon } from "./NavIcons";

// Profile avatars for room cards
import profile1 from "./assets/profile1.jpg";
import profile2 from "./assets/profile2.jpg";
import profile3 from "./assets/profile3.jpg";
import profile4 from "./assets/profile4.jpg";
import profile5 from "./assets/profile5.jpg";

// Logo
import catLogo2 from "./assets/cat-logo-2.svg";
// Book covers — grid + room cards
import coverHobbit       from "./assets/the-hobbit.jpg";
import coverNormalPeople from "./assets/normal-people.jpg";
import coverKiteRunner   from "./assets/the-kite-runner.jpg";
import coverSilentPatient from "./assets/the-silent-patient.jpg";
import coverAtomicHabits from "./assets/atomic-habits.jpg";
import coverAlchemist    from "./assets/the-alchemist.jpg";
import coverEducated     from "./assets/educated.jpg";
import coverSapiens      from "./assets/sapiens.jpg";
import coverNightCircus  from "./assets/the-night-circus.jpg";

const sans = "'Plus Jakarta Sans', sans-serif";
const serif = "'Besley', serif";
const c = {
  navy:       "#0a005a",
  navyBorder: "#1a1070",
  cream:      "#eee9dc",
  pink:       "#e2a9c9",  // Dusty Pink
  gold:       "#cdb670",  // Antique Gold
  sage:       "#d3e8e2",  // Pale Mint
};

// ── Book grid ──────────────────────────────────────────────────────────────────
type BookStatus = "reading" | "none" | "completed";

const SHELF_BOOKS: Array<{ title: string; color: string; status: BookStatus; cover: string }> = [
  { title: "The Hobbit",          color: "#2D1B5E", status: "reading",   cover: coverHobbit        },
  { title: "Normal People",       color: "#3D2040", status: "reading",   cover: coverNormalPeople  },
  { title: "The Kite Runner",     color: "#3D2A18", status: "reading",   cover: coverKiteRunner    },
  { title: "The Silent Patient",  color: "#1E2A3A", status: "none",      cover: coverSilentPatient },
  { title: "Atomic Habits",       color: "#0D2A1A", status: "none",      cover: coverAtomicHabits  },
  { title: "The Alchemist",       color: "#3A2A0A", status: "none",      cover: coverAlchemist     },
  { title: "Educated",            color: "#2A2A3A", status: "completed", cover: coverEducated      },
  { title: "Sapiens",             color: "#3A2A08", status: "completed", cover: coverSapiens       },
  { title: "The Night Circus",    color: "#0A0A1A", status: "completed", cover: coverNightCircus   },
];

// ── Room cards ─────────────────────────────────────────────────────────────────
type ShelfRoomCard = {
  name: string;
  bookTitle: string;
  author: string;
  chapter: number;
  totalChapters: number;
  memberCount: number;
  active: boolean;
  progress: number;
  avatars: string[];
  cover?: string;
  coverColor: string;
};

const SHELF_ROOM_CARDS: ShelfRoomCard[] = [
  {
    name: "The Midnight Archive",
    bookTitle: "The Hobbit",
    author: "J.R.R. Tolkien",
    chapter: 3, totalChapters: 24,
    memberCount: 189, active: true, progress: 12,
    avatars: [profile1, profile2, profile3],
    cover: coverHobbit, coverColor: "#2D1B5E",
  },
  {
    name: "Sunday Slow room",
    bookTitle: "Piranesi",
    author: "Susanna Clarke",
    chapter: 11, totalChapters: 18,
    memberCount: 94, active: true, progress: 61,
    avatars: [profile4, profile5, profile1],
    coverColor: "#6B3A2A",
  },
  {
    name: "Deep Readers room",
    bookTitle: "The Name of the Wind",
    author: "Patrick Rothfuss",
    chapter: 36, totalChapters: 36,
    memberCount: 203, active: false, progress: 100,
    avatars: [profile2, profile3, profile5],
    coverColor: "#0D3D3A",
  },
];

const FILTER_PILLS = ["Books", "Rooms", "Finished", "Abandoned"];

// ── Bottom nav ─────────────────────────────────────────────────────────────────
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
          const isActive = t.key === "shelf";
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

// ── Main Shelf component ────────────────────────────────────────────────────────
type ShelfProps = {
  rooms: RoomData[];
  onRoomSelect: (room: RoomData) => void;
  onSalonOpen: (room: RoomData) => void;
  onNavigate?: (tab: string) => void;
};

export default function Shelf({ rooms, onRoomSelect, onSalonOpen, onNavigate }: ShelfProps) {
  const [activeFilter, setActiveFilter] = useState("Books");

  const findRoom = (bookTitle: string) =>
    rooms.find((r) => r.bookTitle === bookTitle) ?? rooms[0];

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: c.navy, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Header ──────────────────────────────────────── */}
      <Box sx={{ flexShrink: 0, px: "24px", pt: "15px", pb: "0px" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: "8px" }}>
          {/* Logo: cat icon + wordmark — same as Home and Explore */}
          <Box sx={{ position: "relative", width: 102, height: 43 }}>
            <Box component="img" src={catLogo2} alt="" sx={{ position: "absolute", top: -3, left: 54, width: 54, height: 35, display: "block" }} />
            <Typography sx={{ position: "absolute", bottom: 0, left: 0, fontFamily: serif, fontWeight: 600, fontSize: "18.4px", lineHeight: "22px", letterSpacing: "-0.27px", color: c.cream, whiteSpace: "nowrap" }}>
              storyroom
            </Typography>
          </Box>
          {/* Profile avatar */}
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #e2a9c9 0%, #d3e8e2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "50%", m: "2px", background: "linear-gradient(135deg, #eee9dc 0%, #d3e8e2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontFamily: serif, fontSize: 14, lineHeight: 1, color: c.navy }}>L</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Filter pills ────────────────────────────────── */}
      <Box sx={{ flexShrink: 0, display: "flex", gap: "8px", px: "16px", py: "12px", overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
        {/* Settings/filter icon pill */}
        <Box sx={{ height: 32, px: "10px", borderRadius: "9999px", flexShrink: 0, bgcolor: "rgba(193,186,250,0.15)", border: "0.556px solid rgba(193,186,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <line x1="1" y1="1.5" x2="13" y2="1.5" stroke="rgba(238,233,220,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="3" y1="5"   x2="11" y2="5"   stroke="rgba(238,233,220,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="5" y1="8.5" x2="9"  y2="8.5" stroke="rgba(238,233,220,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </Box>
        {FILTER_PILLS.map((pill) => {
          const isActive = pill === activeFilter;
          return (
            <Box key={pill} onClick={() => setActiveFilter(pill)} sx={{ height: 32, px: "14px", borderRadius: "9999px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: isActive ? "rgba(226,169,201,0.2)" : "rgba(193,186,250,0.15)", border: `0.556px solid ${isActive ? c.pink : "rgba(193,186,250,0.3)"}`, cursor: "pointer" }}>
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: isActive ? c.pink : "rgba(193,186,250,0.8)", whiteSpace: "nowrap", lineHeight: "16.5px" }}>
                {pill}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── Sort row ────────────────────────────────────── */}
      <Box sx={{ flexShrink: 0, px: "16px", pb: "6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.5)" }}>Recents</Typography>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 4.5L6 2.5L8.5 4.5" stroke="rgba(238,233,220,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 7.5L6 9.5L8.5 7.5" stroke="rgba(238,233,220,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
          <line x1="1" y1="2"  x2="15" y2="2"  stroke="rgba(238,233,220,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="1" y1="7"  x2="15" y2="7"  stroke="rgba(238,233,220,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="1" y1="12" x2="15" y2="12" stroke="rgba(238,233,220,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </Box>

      {/* ── Scrollable content ───────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>

        {/* ─ Section 1: Your Books ────────────────────── */}
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mx: "16px", mt: "14px", mb: "10px" }}>
          Your books
        </Typography>
        <Box sx={{ px: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {SHELF_BOOKS.map((book) => (
            <Box
              key={book.title}
              onClick={() => onRoomSelect(findRoom(book.title))}
              sx={{ aspectRatio: "1", borderRadius: "10px", overflow: "hidden", position: "relative", bgcolor: book.color, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Full-bleed cover image */}
              <Box component="img" src={book.cover} alt={book.title} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

              {/* Currently reading: "Listening to" + white dot on Dusty Pink */}
              {book.status === "reading" && (
                <Box sx={{ position: "absolute", bottom: 5, right: 5, height: 16, px: "6px", borderRadius: "9999px", bgcolor: c.pink, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Typography sx={{ fontFamily: sans, fontSize: 7, fontWeight: 600, color: c.navy, whiteSpace: "nowrap", lineHeight: 1 }}>Listening to</Typography>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "white", flexShrink: 0 }} />
                </Box>
              )}

              {/* Completed: "Completed" + ✓ on Antique Gold */}
              {book.status === "completed" && (
                <Box sx={{ position: "absolute", bottom: 5, right: 5, height: 16, px: "6px", borderRadius: "9999px", bgcolor: c.gold, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Typography sx={{ fontFamily: sans, fontSize: 7, fontWeight: 600, color: c.navy, whiteSpace: "nowrap", lineHeight: 1 }}>Completed</Typography>
                  <Typography sx={{ fontFamily: sans, fontSize: 8, fontWeight: 700, color: c.navy, lineHeight: 1 }}>✓</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* ─ Section 2: Your Rooms ────────────────────── */}
        <Box sx={{ mx: "16px", mt: "20px", mb: "10px" }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mb: "4px" }}>
            Your rooms
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.35)" }}>
            Communities you've read with
          </Typography>
        </Box>

        <Box sx={{ mx: "16px", display: "flex", flexDirection: "column", gap: "8px", pb: "24px" }}>
          {SHELF_ROOM_CARDS.map((card) => {
            const roomData = findRoom(card.bookTitle);
            return (
              <Box
                key={card.name}
                onClick={() => onRoomSelect(roomData)}
                sx={{ bgcolor: "rgba(238,233,220,0.04)", border: "0.5px solid rgba(238,233,220,0.08)", borderRadius: "14px", p: "12px", display: "flex", gap: "12px", cursor: "pointer", "&:active": { bgcolor: "rgba(238,233,220,0.07)" } }}
              >
                {/* Cover thumbnail */}
                {card.cover ? (
                  <Box component="img" src={card.cover} alt={card.bookTitle} sx={{ width: 44, height: 64, objectFit: "cover", borderRadius: "4px", border: `0.5px solid ${c.gold}`, flexShrink: 0 }} />
                ) : (
                  <Box sx={{ width: 44, height: 64, borderRadius: "4px", border: `0.5px solid ${c.gold}`, bgcolor: card.coverColor, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontFamily: sans, fontSize: 6, color: c.gold, textAlign: "center", px: "2px", lineHeight: "9px" }}>{card.bookTitle}</Typography>
                  </Box>
                )}

                {/* Right info column */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Name + status pill */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "3px" }}>
                    <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: "6px" }}>
                      {card.name}
                    </Typography>
                    <Box sx={{ bgcolor: card.active ? "rgba(226,169,201,0.15)" : "rgba(205,182,112,0.15)", border: `0.5px solid ${card.active ? c.pink : c.gold}`, borderRadius: "9999px", px: "7px", py: "2px", flexShrink: 0 }}>
                      <Typography sx={{ fontFamily: sans, fontSize: 9, color: card.active ? c.pink : c.gold, whiteSpace: "nowrap" }}>
                        {card.active ? `Active · Ch. ${card.chapter}` : "Finished"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Book + author */}
                  <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.5)", mb: "7px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {card.bookTitle} · {card.author}
                  </Typography>

                  {/* Avatar stack + member count */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: "8px" }}>
                    {card.avatars.map((src, i) => (
                      <Box key={i} component="img" src={src} sx={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(10,0,90,0.6)", ml: i > 0 ? "-6px" : 0, zIndex: card.avatars.length - i }} />
                    ))}
                    <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.35)", ml: "6px" }}>
                      {card.memberCount} members
                    </Typography>
                    {card.active && (
                      <Typography
                        component="span"
                        onClick={(e) => { e.stopPropagation(); onSalonOpen(roomData); }}
                        sx={{ fontFamily: sans, fontSize: 10, color: "rgba(211,232,226,0.6)", ml: "3px", cursor: "pointer" }}
                      >
                        · Salon open
                      </Typography>
                    )}
                  </Box>

                  {/* Progress bar */}
                  <Box sx={{ height: 3, bgcolor: "rgba(238,233,220,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                    <Box sx={{ width: `${card.progress}%`, height: "100%", bgcolor: !card.active ? "rgba(205,182,112,0.5)" : c.gold, borderRadius: "9999px" }} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── Bottom nav ──────────────────────────────────── */}
      <BottomNav onNavigate={onNavigate} />
    </Box>
  );
}
