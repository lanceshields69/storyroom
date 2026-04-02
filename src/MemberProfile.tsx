import { Box, Typography } from "@mui/material";
import { useState } from "react";

import profile1 from "./assets/profile1.jpg";
import profile2 from "./assets/profile2.jpg";
import profile3 from "./assets/profile3.jpg";
import profile4 from "./assets/profile4.jpg";
import profile5 from "./assets/profile5.jpg";

import coverHobbit        from "./assets/the-hobbit.jpg";
import coverRebecca       from "./assets/rebecca.jpg";
import coverNormalPeople  from "./assets/normal-people.jpg";
import coverGreatGatsby   from "./assets/the-great-gatsby.jpg";
import coverStardust      from "./assets/stardust.jpg";
import coverLittleWomen   from "./assets/little-women.jpg";
import coverManCalledOve  from "./assets/a-man-called-ove.jpg";
import coverNightCircus   from "./assets/the-night-circus.jpg";
import coverInTheWoods    from "./assets/in-the-woods.jpg";
import coverBigLittleLies from "./assets/big-little-lies.jpg";
import coverGoneGirl      from "./assets/gone-girl.jpg";
import coverEducated      from "./assets/educated.jpg";
import coverSapiens       from "./assets/sapiens.jpg";
import coverTheBody       from "./assets/the-body.jpg";
import coverFlow          from "./assets/flow.jpg";
import coverSilentPatient from "./assets/the-silent-patient.jpg";
import coverAndThenNone   from "./assets/and-then-there-were-none.jpg";
import coverAtomicHabits  from "./assets/atomic-habits.jpg";
import coverBecoming      from "./assets/becoming.jpg";
import coverKiteRunner    from "./assets/the-kite-runner.jpg";

const sans  = "'Plus Jakarta Sans', sans-serif";
const serif = "'Besley', serif";
const c = { navy: "#0a005a", cream: "#eee9dc", pink: "#e2a9c9", gold: "#cdb670", sage: "#d3e8e2" };

const WAVE_HEIGHTS = [5,9,7,13,9,15,7,11,17,9,13,7,15,9,11,7,13,9,7,11];

function PassageWave({ played }: { played: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1px", height: 18 }}>
      {WAVE_HEIGHTS.map((h, i) => (
        <Box key={i} sx={{ width: 2, height: h, borderRadius: "9999px", flexShrink: 0, bgcolor: i / WAVE_HEIGHTS.length < played ? c.pink : "rgba(238,233,220,0.18)" }} />
      ))}
    </Box>
  );
}

type Passage = { bookTitle: string; cover: string; coverColor: string; chapter: number; timestamp: string; quote: string; room: string; played: number; reactions: string[] };
type ReadingRoom = { roomName: string; bookTitle: string; author: string; chapter: number; totalChapters: number; progress: number; cover: string; coverColor: string; memberCount: number; avatars: string[] };
type FinishedBook = { title: string; cover: string; color: string };
type MemberData = { displayName: string; handle: string; avatar: string; fingerprint: string; stats: { books: number; rooms: number; passages: number }; currentlyReading: ReadingRoom[]; passages: Passage[]; booksFinished: FinishedBook[] };

const MEMBERS: Record<string, MemberData> = {
  mireille_r: {
    displayName: "Mireille Rousseau", handle: "@mireille_r", avatar: profile1,
    fingerprint: "Literary fiction · slow reader · thinks out loud in salons",
    stats: { books: 9, rooms: 3, passages: 14 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile2, profile3, profile4] },
      { roomName: "Sunday Slow Room", bookTitle: "Piranesi", author: "Susanna Clarke", chapter: 11, totalChapters: 18, progress: 61, cover: coverRebecca, coverColor: "#6B3A2A", memberCount: 94, avatars: [profile4, profile5, profile1] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "1:04:22", quote: "...and the night seemed more beautiful and more sad than any he had known...", room: "The Midnight Archive", played: 0.4, reactions: ["❤️", "😉"] },
      { bookTitle: "Piranesi", cover: coverRebecca, coverColor: "#6B3A2A", chapter: 11, timestamp: "2:18:05", quote: "I am not lost. I have always been exactly where I am.", room: "Sunday Slow Room", played: 0.6, reactions: ["❤️", "😮"] },
    ],
    booksFinished: [
      { title: "A Man Called Ove", cover: coverManCalledOve, color: "#2A4030" },
      { title: "Normal People",    cover: coverNormalPeople, color: "#2A3560" },
      { title: "The Night Circus", cover: coverNightCircus,  color: "#1A1A30" },
    ],
  },
  jakek: {
    displayName: "Jake Kessler", handle: "@jakek", avatar: profile2,
    fingerprint: "Fantasy & literary fiction · notices what others miss",
    stats: { books: 6, rooms: 2, passages: 8 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile1, profile3, profile4] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "0:52:14", quote: "The silence before the elves sing — that moment of held breath between worlds.", room: "The Midnight Archive", played: 0.3, reactions: ["❤️"] },
      { bookTitle: "Stardust", cover: coverStardust, coverColor: "#1E2845", chapter: 7, timestamp: "2:34:00", quote: "In the land of the living, the dead walk beside us always.", room: "Twilight Reading", played: 0.55, reactions: ["😎", "❤️"] },
    ],
    booksFinished: [
      { title: "Normal People",    cover: coverNormalPeople, color: "#2A3560" },
      { title: "Stardust",         cover: coverStardust,     color: "#1E2845" },
      { title: "The Great Gatsby", cover: coverGreatGatsby,  color: "#1E3828" },
    ],
  },
  t_ashworth: {
    displayName: "T. Ashworth", handle: "@t_ashworth", avatar: profile3,
    fingerprint: "Classics & literary fiction · always has a theory · salon regular",
    stats: { books: 12, rooms: 4, passages: 21 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile1, profile2, profile4] },
      { roomName: "The Reading Den", bookTitle: "Little Women", author: "Louisa May Alcott", chapter: 7, totalChapters: 47, progress: 15, cover: coverLittleWomen, coverColor: "#5C2A1E", memberCount: 76, avatars: [profile2, profile5, profile1] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "1:12:40", quote: "Bilbo doesn't want to leave. For the first time he actually doesn't want to leave.", room: "The Midnight Archive", played: 0.45, reactions: ["❤️", "😮"] },
      { bookTitle: "The Great Gatsby", cover: coverGreatGatsby, coverColor: "#1E3828", chapter: 5, timestamp: "1:44:10", quote: "Can't repeat the past? Why of course you can!", room: "The Last Chapter", played: 0.7, reactions: ["❤️", "😎"] },
    ],
    booksFinished: [
      { title: "Rebecca",          cover: coverRebecca,     color: "#6B3A2A" },
      { title: "The Great Gatsby", cover: coverGreatGatsby, color: "#1E3828" },
      { title: "In the Woods",     cover: coverInTheWoods,  color: "#1A2F1A" },
    ],
  },
  ppolanski: {
    displayName: "P. Polanski", handle: "@ppolanski", avatar: profile4,
    fingerprint: "Philosophical nonfiction & literary fiction · asks the big questions",
    stats: { books: 5, rooms: 2, passages: 6 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile1, profile2, profile3] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "1:22:55", quote: "If Tolkien was a devout Catholic, why is there no religion in Middle Earth?", room: "The Midnight Archive", played: 0.5, reactions: ["😮", "❤️"] },
      { bookTitle: "Sapiens", cover: coverSapiens, coverColor: "#1A2D40", chapter: 5, timestamp: "3:08:30", quote: "History is something that very few people have been doing while everyone else was ploughing fields.", room: "Mind Expanding Reads", played: 0.4, reactions: ["😎"] },
    ],
    booksFinished: [
      { title: "Sapiens",  cover: coverSapiens, color: "#1A2D40" },
      { title: "The Body", cover: coverTheBody, color: "#2A2030" },
      { title: "Flow",     cover: coverFlow,    color: "#1A3040" },
    ],
  },
  sunli: {
    displayName: "Sun Li", handle: "@sunli", avatar: profile5,
    fingerprint: "Contemporary fiction · reads fast · clips the emotional moments",
    stats: { books: 7, rooms: 3, passages: 11 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile1, profile2, profile3] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "0:44:18", quote: "The silence got me too. That moment before the elves appear.", room: "The Midnight Archive", played: 0.25, reactions: ["❤️"] },
      { bookTitle: "Big Little Lies", cover: coverBigLittleLies, coverColor: "#3D1A45", chapter: 14, timestamp: "4:02:50", quote: "Sometimes it's the smallest decisions that can change your life forever.", room: "The Suspense Room", played: 0.8, reactions: ["❤️", "😮"] },
    ],
    booksFinished: [
      { title: "Gone Girl",       cover: coverGoneGirl,      color: "#2A1A10" },
      { title: "Big Little Lies", cover: coverBigLittleLies, color: "#3D1A45" },
      { title: "Educated",        cover: coverEducated,      color: "#2D3A20" },
    ],
  },
  nwatts: {
    displayName: "N. Watts", handle: "@nwatts", avatar: profile5,
    fingerprint: "Fiction & thrillers · asks questions more than answers them",
    stats: { books: 4, rooms: 2, passages: 5 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile1, profile2, profile3] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "1:33:07", quote: "Does the meaning change each time or just the context?", room: "The Midnight Archive", played: 0.6, reactions: ["😮"] },
      { bookTitle: "And Then There Were None", cover: coverAndThenNone, coverColor: "#1A2A1A", chapter: 3, timestamp: "0:58:40", quote: "Ten little Indian boys went out to dine; one choked his little self and then there were nine.", room: "Spine Tingler", played: 0.35, reactions: ["😮", "❤️"] },
    ],
    booksFinished: [
      { title: "The Silent Patient",       cover: coverSilentPatient, color: "#2D1A30" },
      { title: "And Then There Were None", cover: coverAndThenNone,   color: "#1A2A1A" },
      { title: "Gone Girl",                cover: coverGoneGirl,      color: "#2A1A10" },
    ],
  },
  sienna_wilson: {
    displayName: "Sienna Wilson", handle: "@sienna.reads", avatar: profile1,
    fingerprint: "Literary fiction narrator · 23 books narrated · slow & emotional",
    stats: { books: 23, rooms: 4, passages: 32 },
    currentlyReading: [
      { roomName: "The Midnight Archive", bookTitle: "The Hobbit", author: "J.R.R. Tolkien", chapter: 3, totalChapters: 24, progress: 12, cover: coverHobbit, coverColor: "#2D1B5E", memberCount: 189, avatars: [profile2, profile3, profile4] },
    ],
    passages: [
      { bookTitle: "The Hobbit", cover: coverHobbit, coverColor: "#2D1B5E", chapter: 3, timestamp: "1:04:22", quote: "The moment where the world opens and you feel the weight of every story that came before.", room: "The Midnight Archive", played: 0.4, reactions: ["❤️", "😮"] },
      { bookTitle: "Rebecca", cover: coverRebecca, coverColor: "#6B3A2A", chapter: 9, timestamp: "2:55:10", quote: "Last night I dreamt I went to Manderley again.", room: "Stories After Dark", played: 0.65, reactions: ["❤️", "😎"] },
    ],
    booksFinished: [
      { title: "Rebecca",          cover: coverRebecca,     color: "#6B3A2A" },
      { title: "A Man Called Ove", cover: coverManCalledOve, color: "#2A4030" },
      { title: "The Night Circus", cover: coverNightCircus,  color: "#1A1A30" },
    ],
  },
  marcus_chan: {
    displayName: "Marcus Chan", handle: "@marcus.chan", avatar: profile2,
    fingerprint: "Non-fiction & thriller narrator · 18 books narrated · precise & clear",
    stats: { books: 18, rooms: 5, passages: 24 },
    currentlyReading: [
      { roomName: "True Stories Hour", bookTitle: "Educated", author: "Tara Westover", chapter: 6, totalChapters: 22, progress: 27, cover: coverEducated, coverColor: "#2D3A20", memberCount: 118, avatars: [profile3, profile4, profile5] },
      { roomName: "Thriller Night", bookTitle: "The Silent Patient", author: "Alex Michaelides", chapter: 5, totalChapters: 32, progress: 16, cover: coverSilentPatient, coverColor: "#2D1A30", memberCount: 142, avatars: [profile1, profile5, profile3] },
    ],
    passages: [
      { bookTitle: "Educated", cover: coverEducated, coverColor: "#2D3A20", chapter: 6, timestamp: "1:55:40", quote: "The decisions of your past are the seams of your present.", room: "True Stories Hour", played: 0.5, reactions: ["❤️", "😮"] },
      { bookTitle: "The Body", cover: coverTheBody, coverColor: "#2A2030", chapter: 4, timestamp: "0:48:20", quote: "Of all the things that happen to you in this life, none is stranger than the arrival of death.", room: "Real World Reads", played: 0.3, reactions: ["😮"] },
    ],
    booksFinished: [
      { title: "Educated",      cover: coverEducated,     color: "#2D3A20" },
      { title: "Sapiens",       cover: coverSapiens,      color: "#1A2D40" },
      { title: "Atomic Habits", cover: coverAtomicHabits, color: "#3A2010" },
    ],
  },
  clara_osei: {
    displayName: "Clara Osei", handle: "@clara.osei", avatar: profile3,
    fingerprint: "Contemporary fiction narrator · 31 books narrated · warm & intimate",
    stats: { books: 31, rooms: 6, passages: 41 },
    currentlyReading: [
      { roomName: "Midnight Chapter Club", bookTitle: "Normal People", author: "Sally Rooney", chapter: 10, totalChapters: 24, progress: 42, cover: coverNormalPeople, coverColor: "#2A3560", memberCount: 214, avatars: [profile1, profile2, profile4] },
      { roomName: "The Reading Den", bookTitle: "Little Women", author: "Louisa May Alcott", chapter: 7, totalChapters: 47, progress: 15, cover: coverLittleWomen, coverColor: "#5C2A1E", memberCount: 76, avatars: [profile2, profile5, profile1] },
    ],
    passages: [
      { bookTitle: "Normal People", cover: coverNormalPeople, coverColor: "#2A3560", chapter: 10, timestamp: "2:12:30", quote: "She'd been told that he was a particular kind of attractive, that his face was serious and made you feel serious too.", room: "Midnight Chapter Club", played: 0.55, reactions: ["❤️", "😉"] },
      { bookTitle: "Becoming", cover: coverBecoming, coverColor: "#3A1030", chapter: 8, timestamp: "3:24:15", quote: "Becoming isn't about arriving somewhere or achieving a certain aim.", room: "Voices & Perspectives", played: 0.7, reactions: ["❤️"] },
    ],
    booksFinished: [
      { title: "Normal People",   cover: coverNormalPeople, color: "#2A3560" },
      { title: "Becoming",        cover: coverBecoming,     color: "#3A1030" },
      { title: "The Kite Runner", cover: coverKiteRunner,   color: "#3A2010" },
    ],
  },
};

type Props = { memberId: string; onBack: () => void };

export default function MemberProfile({ memberId, onBack }: Props) {
  const member = MEMBERS[memberId];
  const [following, setFollowing] = useState(false);

  if (!member) return null;

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: c.navy, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>

        {/* ── Header ───────────────────────────────────── */}
        <Box sx={{
          width: "100%",
          background: "linear-gradient(to bottom, #1a0850 0%, #0A005A 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          pt: "56px", pb: "20px", boxSizing: "border-box", position: "relative",
        }}>
          {/* Back button */}
          <Box onClick={onBack} sx={{
            position: "absolute", top: "16px", left: "16px",
            width: 32, height: 32, borderRadius: "50%",
            bgcolor: "rgba(238,233,220,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="rgba(238,233,220,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>

          <Box component="img" src={member.avatar} alt={member.displayName} sx={{
            width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
            border: "2px solid rgba(238,233,220,0.3)", mb: "8px", flexShrink: 0,
          }} />
          <Typography sx={{ fontFamily: serif, fontSize: 20, color: c.cream, lineHeight: "26px", mb: "2px" }}>
            {member.displayName}
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.45)", mb: "4px" }}>
            {member.handle}
          </Typography>
          <Typography sx={{ fontFamily: sans, fontStyle: "italic", fontSize: 11, color: "rgba(238,233,220,0.4)", mb: "12px", textAlign: "center", px: "24px" }}>
            {member.fingerprint}
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Box
              onClick={() => setFollowing(f => !f)}
              sx={{
                height: 36, px: "20px", borderRadius: "9999px",
                bgcolor: following ? "rgba(226,169,201,0.15)" : c.pink,
                border: `0.5px solid ${following ? c.pink : "transparent"}`,
                display: "flex", alignItems: "center", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 12, color: following ? c.pink : c.navy }}>
                {following ? "Following" : "Follow"}
              </Typography>
            </Box>
            <Box sx={{
              height: 36, px: "16px", borderRadius: "9999px",
              bgcolor: "rgba(238,233,220,0.08)", border: "0.5px solid rgba(238,233,220,0.15)",
              display: "flex", alignItems: "center", cursor: "pointer",
            }}>
              <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 12, color: c.cream }}>Message</Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Stats ────────────────────────────────────── */}
        <Box sx={{ display: "flex", gap: "8px", mx: "16px", mt: "16px" }}>
          {[
            { value: String(member.stats.books),    label: "books finished"  },
            { value: String(member.stats.rooms),    label: "rooms joined"    },
            { value: String(member.stats.passages), label: "passages shared" },
          ].map((s) => (
            <Box key={s.label} sx={{ flex: 1, bgcolor: "rgba(238,233,220,0.04)", border: "0.5px solid rgba(238,233,220,0.08)", borderRadius: "12px", py: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ fontFamily: serif, fontSize: 20, color: c.cream, lineHeight: "26px" }}>{s.value}</Typography>
              <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.4)", mt: "2px", textAlign: "center", px: "4px", lineHeight: "14px" }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ height: "0.5px", bgcolor: "rgba(238,233,220,0.06)", mt: "16px" }} />

        {/* ── Currently reading ────────────────────────── */}
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mx: "16px", mt: "14px", mb: "10px" }}>
          Currently reading
        </Typography>
        <Box sx={{ mx: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {member.currentlyReading.map((card) => (
            <Box key={card.roomName} sx={{ bgcolor: "rgba(238,233,220,0.04)", border: "0.5px solid rgba(238,233,220,0.08)", borderRadius: "14px", p: "12px", display: "flex", gap: "12px" }}>
              <Box component="img" src={card.cover} alt={card.bookTitle} sx={{ width: 44, height: 64, objectFit: "cover", borderRadius: "4px", border: `0.5px solid ${c.gold}`, flexShrink: 0 }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "3px" }}>
                  <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: "6px" }}>
                    {card.roomName}
                  </Typography>
                  <Box sx={{ bgcolor: "rgba(226,169,201,0.15)", border: `0.5px solid ${c.pink}`, borderRadius: "9999px", px: "7px", py: "2px", flexShrink: 0 }}>
                    <Typography sx={{ fontFamily: sans, fontSize: 9, color: c.pink, whiteSpace: "nowrap" }}>
                      Active · Ch. {card.chapter}
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
                </Box>
                <Box sx={{ height: 3, bgcolor: "rgba(238,233,220,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                  <Box sx={{ width: `${card.progress}%`, height: "100%", bgcolor: c.gold, borderRadius: "9999px" }} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ height: "0.5px", bgcolor: "rgba(238,233,220,0.06)", mt: "20px" }} />

        {/* ── Passages ─────────────────────────────────── */}
        <Box sx={{ mx: "16px", mt: "14px", mb: "10px" }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mb: "4px" }}>Passages shared</Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.35)" }}>Moments shared in salons</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px", pl: "16px", pr: "8px", overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
          {member.passages.map((p, idx) => (
            <Box key={idx} sx={{ width: 160, flexShrink: 0, bgcolor: "rgba(5,0,40,0.7)", border: "0.5px solid rgba(238,233,220,0.1)", borderRadius: "12px", p: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Box component="img" src={p.cover} alt={p.bookTitle} sx={{ width: 24, height: 36, objectFit: "cover", borderRadius: "2px", border: `0.5px solid ${c.gold}`, flexShrink: 0 }} />
                <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(205,182,112,0.8)", textTransform: "uppercase", letterSpacing: "0.4px", lineHeight: "13px", mt: "2px" }}>
                  Ch. {p.chapter} · {p.timestamp}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: serif, fontStyle: "italic", fontSize: 11, color: "rgba(238,233,220,0.65)", lineHeight: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.quote}
              </Typography>
              <PassageWave played={p.played} />
              <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(238,233,220,0.35)", lineHeight: "13px" }}>{p.room}</Typography>
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

        <Box sx={{ height: "0.5px", bgcolor: "rgba(238,233,220,0.06)", mt: "20px" }} />

        {/* ── Books finished ───────────────────────────── */}
        <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 13, color: c.cream, mx: "16px", mt: "14px", mb: "10px" }}>
          Books finished
        </Typography>
        <Box sx={{ px: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {member.booksFinished.map((book) => (
            <Box key={book.title} sx={{ aspectRatio: "1", borderRadius: "10px", overflow: "hidden", position: "relative", bgcolor: book.color }}>
              <Box component="img" src={book.cover} alt={book.title} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <Box sx={{ position: "absolute", bottom: 5, right: 5, height: 16, px: "6px", borderRadius: "9999px", bgcolor: c.gold, display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography sx={{ fontFamily: sans, fontSize: 7, fontWeight: 600, color: c.navy, whiteSpace: "nowrap", lineHeight: 1 }}>Completed</Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 8, fontWeight: 700, color: c.navy, lineHeight: 1 }}>✓</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ height: 32 }} />
      </Box>
    </Box>
  );
}
