import { Box, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef, useEffect } from "react";
import "./index.css";
import RoomPage, { type RoomData } from "./RoomPage";
import Salon from "./Salon";
import Explore from "./Explore";
import Shelf from "./Shelf";
import Profile from "./Profile";
import MemberProfile from "./MemberProfile";

// Nav icons
import catLogo1 from "./assets/cat-logo-1.svg";
import catLogo2 from "./assets/cat-logo-2.svg";
import { RoomsIcon, DiscoverIcon, LibraryIcon, ProfileIcon } from "./NavIcons";

// Book covers
import coverSilentPatient   from "./assets/the-silent-patient.jpg";
import coverHobbit          from "./assets/the-hobbit.jpg";
import coverDeepWork        from "./assets/deep-work.jpg";
import coverNormalPeople    from "./assets/normal-people.jpg";
import coverThinkingFast    from "./assets/thinking-fast-and-slow.jpg";
import coverKiteRunner      from "./assets/the-kite-runner.jpg";
import coverLittleWomen     from "./assets/little-women.jpg";
import coverManCalledOve    from "./assets/a-man-called-ove.jpg";
import coverRebecca         from "./assets/rebecca.jpg";
import coverGreatGatsby     from "./assets/the-great-gatsby.jpg";
import coverEducated        from "./assets/educated.jpg";
import coverSapiens         from "./assets/sapiens.jpg";
import coverTheBody         from "./assets/the-body.jpg";
import coverBecoming        from "./assets/becoming.jpg";
import coverGoneGirl        from "./assets/gone-girl.jpg";
import coverDragonTattoo    from "./assets/dragon-tattoo.jpg";
import coverBigLittleLies   from "./assets/big-little-lies.jpg";
import coverInTheWoods      from "./assets/in-the-woods.jpg";
import coverAndThenNone     from "./assets/and-then-there-were-none.jpg";
import coverAtomicHabits    from "./assets/atomic-habits.jpg";
import coverPowerOfNow      from "./assets/power-of-now.jpg";
import coverFlow            from "./assets/flow.jpg";
import coverFiveAmClub      from "./assets/five-am-club.jpg";
import coverGTD             from "./assets/getting-things-done.jpg";
import coverEssentialism    from "./assets/essentialism.jpg";
import coverAlchemist       from "./assets/the-alchemist.jpg";
import coverLittlePrince    from "./assets/the-little-prince.jpg";
import coverWhenBreath      from "./assets/when-breath-becomes-air.jpg";
import coverWinniePooh      from "./assets/winnie-the-pooh.jpg";
import coverStardust        from "./assets/stardust.jpg";
import coverNightCircus     from "./assets/the-night-circus.jpg";

// Fiction images
import fiction1 from "./assets/fiction-1.png";
import fiction2 from "./assets/fiction-2.jpg";
import fiction3 from "./assets/fiction-3.jpg";
import fiction4 from "./assets/fiction-4.jpg";
import fiction5 from "./assets/fiction-5.jpg";
import fiction6 from "./assets/fiction-6.jpg";
import fiction7 from "./assets/fiction-7.jpg";

// Non-Fiction images
import nonFiction1 from "./assets/non-fiction-1.jpg";
import nonFiction2 from "./assets/non-fiction-2.jpg";
import nonFiction3 from "./assets/non-fiction-3.jpg";
import nonFiction4 from "./assets/non-fiction-4.jpg";
import nonFiction5 from "./assets/non-fiction-5.jpg";

// Thriller images
import thriller1 from "./assets/thriller-1.png";
import thriller2 from "./assets/thriller-2.jpg";
import thriller3 from "./assets/thriller-3.jpg";
import thriller4 from "./assets/thriller-4.jpg";
import thriller5 from "./assets/thriller-5.jpg";
import thriller6 from "./assets/thriller-6.jpg";

// Deep Work images
import deepWork1 from "./assets/deep-work-1.png";
import deepWork2 from "./assets/deep-work-2.jpg";
import deepWork3 from "./assets/deep-work-3.jpg";
import deepWork4 from "./assets/deep-work-4.jpg";
import deepWork5 from "./assets/deep-work-5.jpg";
import deepWork6 from "./assets/deep-work-6.jpg";
import deepWork7 from "./assets/deep-work-7.jpg";

// Wind Down images
import windDown1 from "./assets/wind-down-1.png";
import windDown2 from "./assets/wind-down-2.jpg";
import windDown3 from "./assets/wind-down-3.jpg";
import windDown4 from "./assets/wind-down-4.jpg";
import windDown5 from "./assets/wind-down-5.jpg";
import windDown6 from "./assets/wind-down-6.jpg";
import paperTexture from "./assets/paper-texture.png";
import splashAnimationUrl from "./assets/splash-animation.mov?url";

// Design tokens
const c = {
  navy: "#0a005a",
  navyBorder: "#1a1070",
  pink: "#e2a9c9",
  cream: "#eee9dc",
  sage: "#d3e8e2",
  gold: "#cdb670",
  mint: "#d3e8e2",
  deepWorkTag: "#e6b3a1",
  windDownTag: "#98b9d9",
};

const serif = "'Besley', serif";
const sans = "'Plus Jakarta Sans', sans-serif";

const CATEGORY_COLORS: Record<string, string> = {
  "All": "#c1bafa",
  "Fiction": c.mint,
  "Non-Fiction": c.pink,
  "Thriller": c.gold,
  "Deep Work": c.deepWorkTag,
  "Wind Down": c.windDownTag,
};

const CATEGORY_TEXT_COLORS: Record<string, string> = {
  "All": c.navy,
  "Fiction": "#464d4b",
  "Non-Fiction": "#59424f",
  "Thriller": "#4d442c",
  "Deep Work": "#59453e",
  "Wind Down": "#36414d",
};

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Thriller", "Deep Work", "Wind Down"];

type Room = RoomData;

const ROOMS: Room[] = [
  // Fiction
  { title: "Sunday Morning Fiction", bookTitle: "The Hobbit",                     author: "J.R.R. Tolkien",         listeners: "87 listening",  genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction1,    bookCover: coverHobbit,        chapter: 3,  totalChapters: 24, day: 8  },
  { title: "Midnight Chapter Club",  bookTitle: "Normal People",                  author: "Sally Rooney",           listeners: "214 listening", genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction2,    bookCover: coverNormalPeople,  chapter: 10, totalChapters: 24, day: 20 },
  { title: "Fireside Stories",       bookTitle: "The Kite Runner",                author: "Khaled Hosseini",        listeners: "132 listening", genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction3,    bookCover: coverKiteRunner,    chapter: 11, totalChapters: 43, day: 11 },
  { title: "The Reading Den",        bookTitle: "Little Women",                   author: "Louisa May Alcott",      listeners: "76 listening",  genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction4,    bookCover: coverLittleWomen,   chapter: 7,  totalChapters: 47, day: 14 },
  { title: "Page Turners Live",      bookTitle: "A Man Called Ove",               author: "Fredrik Backman",        listeners: "189 listening", genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction5,    bookCover: coverManCalledOve,  chapter: 4,  totalChapters: 32, day: 6  },
  { title: "Stories After Dark",     bookTitle: "Rebecca",                        author: "Daphne du Maurier",      listeners: "305 listening", genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction6,    bookCover: coverRebecca,       chapter: 9,  totalChapters: 28, day: 16 },
  { title: "The Last Chapter",       bookTitle: "The Great Gatsby",               author: "F. Scott Fitzgerald",    listeners: "53 listening",  genre: "Fiction",     genreColor: c.mint,        accentColor: c.mint,        image: fiction7,    bookCover: coverGreatGatsby,   chapter: 5,  totalChapters: 9,  day: 10 },

  // Non-Fiction
  { title: "True Stories Hour",      bookTitle: "Educated",                       author: "Tara Westover",          listeners: "118 listening", genre: "Non-Fiction", genreColor: c.pink,        accentColor: c.pink,        image: nonFiction1, bookCover: coverEducated,      chapter: 6,  totalChapters: 22, day: 9  },
  { title: "Mind Expanding Reads",   bookTitle: "Sapiens",                        author: "Yuval Noah Harari",      listeners: "244 listening", genre: "Non-Fiction", genreColor: c.pink,        accentColor: c.pink,        image: nonFiction2, bookCover: coverSapiens,       chapter: 5,  totalChapters: 20, day: 7  },
  { title: "The Knowledge Room",     bookTitle: "Thinking, Fast and Slow",        author: "Daniel Kahneman",        listeners: "91 listening",  genre: "Non-Fiction", genreColor: c.pink,        accentColor: c.pink,        image: nonFiction3, bookCover: coverThinkingFast,  chapter: 3,  totalChapters: 24, day: 8  },
  { title: "Real World Reads",       bookTitle: "The Body",                       author: "Bill Bryson",            listeners: "67 listening",  genre: "Non-Fiction", genreColor: c.pink,        accentColor: c.pink,        image: nonFiction4, bookCover: coverTheBody,       chapter: 4,  totalChapters: 30, day: 5  },
  { title: "Voices & Perspectives",  bookTitle: "Becoming",                       author: "Michelle Obama",         listeners: "158 listening", genre: "Non-Fiction", genreColor: c.pink,        accentColor: c.pink,        image: nonFiction5, bookCover: coverBecoming,      chapter: 8,  totalChapters: 24, day: 12 },

  // Thriller
  { title: "Thriller Night",         bookTitle: "The Silent Patient",             author: "Alex Michaelides",       listeners: "142 listening", genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller1,   bookCover: coverSilentPatient, chapter: 5,  totalChapters: 32, day: 10 },
  { title: "Dark Pages Live",        bookTitle: "Gone Girl",                      author: "Gillian Flynn",          listeners: "278 listening", genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller2,   bookCover: coverGoneGirl,      chapter: 12, totalChapters: 38, day: 18 },
  { title: "Edge of Your Seat",      bookTitle: "The Girl with the Dragon Tattoo",author: "Stieg Larsson",          listeners: "334 listening", genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller3,   bookCover: coverDragonTattoo,  chapter: 8,  totalChapters: 40, day: 13 },
  { title: "The Suspense Room",      bookTitle: "Big Little Lies",                author: "Liane Moriarty",         listeners: "201 listening", genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller4,   bookCover: coverBigLittleLies, chapter: 14, totalChapters: 42, day: 22 },
  { title: "Midnight Murders",       bookTitle: "In the Woods",                   author: "Tana French",            listeners: "88 listening",  genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller5,   bookCover: coverInTheWoods,    chapter: 6,  totalChapters: 36, day: 9  },
  { title: "Spine Tingler",          bookTitle: "And Then There Were None",       author: "Agatha Christie",        listeners: "173 listening", genre: "Thriller",    genreColor: c.gold,        accentColor: c.gold,        image: thriller6,   bookCover: coverAndThenNone,   chapter: 3,  totalChapters: 16, day: 5  },

  // Deep Work
  { title: "Deep Work Hours",        bookTitle: "Deep Work",                      author: "Cal Newport",            listeners: "87 listening",  genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork1,   bookCover: coverDeepWork,      chapter: 3,  totalChapters: 24, day: 8  },
  { title: "Focus Flow",             bookTitle: "Atomic Habits",                  author: "James Clear",            listeners: "312 listening", genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork2,   bookCover: coverAtomicHabits,  chapter: 6,  totalChapters: 20, day: 11 },
  { title: "The Quiet Room",         bookTitle: "The Power of Now",               author: "Eckhart Tolle",          listeners: "196 listening", genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork3,   bookCover: coverPowerOfNow,    chapter: 4,  totalChapters: 10, day: 7  },
  { title: "Heads Down Hours",       bookTitle: "Flow",                           author: "Mihaly Csikszentmihalyi",listeners: "144 listening", genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork4,   bookCover: coverFlow,          chapter: 7,  totalChapters: 12, day: 13 },
  { title: "Morning Focus Block",    bookTitle: "The 5 AM Club",                  author: "Robin Sharma",           listeners: "229 listening", genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork5,   bookCover: coverFiveAmClub,    chapter: 5,  totalChapters: 28, day: 9  },
  { title: "The Productivity Pod",   bookTitle: "Getting Things Done",            author: "David Allen",            listeners: "81 listening",  genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork6,   bookCover: coverGTD,           chapter: 2,  totalChapters: 16, day: 4  },
  { title: "Flow State Room",        bookTitle: "Essentialism",                   author: "Greg McKeown",           listeners: "267 listening", genre: "Deep Work",   genreColor: c.deepWorkTag, accentColor: c.deepWorkTag, image: deepWork7,   bookCover: coverEssentialism,  chapter: 9,  totalChapters: 22, day: 15 },

  // Wind Down
  { title: "Evening Pages",          bookTitle: "The Alchemist",                  author: "Paulo Coelho",           listeners: "109 listening", genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown1,   bookCover: coverAlchemist,     chapter: 2,  totalChapters: 4,  day: 6  },
  { title: "Night Owl Reads",        bookTitle: "The Little Prince",              author: "Antoine de Saint-Exupéry",listeners: "74 listening", genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown2,   bookCover: coverLittlePrince,  chapter: 5,  totalChapters: 27, day: 8  },
  { title: "Slow Down Sunday",       bookTitle: "When Breath Becomes Air",        author: "Paul Kalanithi",         listeners: "188 listening", genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown3,   bookCover: coverWhenBreath,    chapter: 4,  totalChapters: 8,  day: 10 },
  { title: "The Cozy Corner",        bookTitle: "Winnie-the-Pooh",                author: "A.A. Milne",             listeners: "256 listening", genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown4,   bookCover: coverWinniePooh,    chapter: 3,  totalChapters: 10, day: 7  },
  { title: "Twilight Reading",       bookTitle: "Stardust",                       author: "Neil Gaiman",            listeners: "143 listening", genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown5,   bookCover: coverStardust,      chapter: 7,  totalChapters: 13, day: 14 },
  { title: "Before Bed Books",       bookTitle: "The Night Circus",               author: "Erin Morgenstern",       listeners: "98 listening",  genre: "Wind Down",   genreColor: c.windDownTag, accentColor: c.windDownTag, image: windDown6,   bookCover: coverNightCircus,   chapter: 6,  totalChapters: 38, day: 11 },
];

// Interleave rooms by category so the "All" feed mixes genres
const MIXED_ROOMS = (() => {
  const groups = CATEGORIES.filter((c) => c !== "All").map((genre) =>
    ROOMS.filter((r) => r.genre === genre)
  );
  const result: Room[] = [];
  const max = Math.max(...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) {
    groups.forEach((g) => { if (g[i]) result.push(g[i]); });
  }
  return result;
})();

const TOTAL_LISTENERS = ROOMS.reduce((sum, r) => sum + parseInt(r.listeners), 0);

const NAV_ITEMS = [
  { label: "Rooms",   Icon: RoomsIcon,    key: "rooms"   },
  { label: "Explore", Icon: DiscoverIcon, key: "discover"},
  { label: "Shelf",   Icon: LibraryIcon,  key: "shelf"   },
  { label: "Profile", Icon: ProfileIcon,  key: "profile" },
];

const SPLASH_VIDEO_MS = 7000;
const SPLASH_FADE_MS = 1000;

function SplashOverlay({ phase, videoSrc }: { phase: "splash" | "fade"; videoSrc: string }) {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        py: { xs: 0, sm: 4 },
        bgcolor: { xs: "#ffffff", sm: "#e8e8ec" },
        opacity: phase === "fade" ? 0 : 1,
        transition: phase === "fade" ? `opacity ${SPLASH_FADE_MS}ms ease` : "none",
        pointerEvents: phase === "splash" ? "auto" : "none",
      }}
    >
      {/* Same phone shell as Rooms / Explore (393×874, radius, shadow on sm+) */}
      <Box
        sx={{
          width: { xs: "100%", sm: 393 },
          height: { xs: "100dvh", sm: 874 },
          position: "relative",
          flexShrink: 0,
          bgcolor: "#ffffff",
          borderRadius: { xs: 0, sm: "44px" },
          boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" },
          overflow: "hidden",
        }}
      >
        {/* 270×184 source, 1px trim all sides → 268×182; 90px from frame left, vertical center −20px */}
        <Box
          sx={{
            position: "absolute",
            left: 90,
            top: "calc(50% - 20px)",
            transform: "translateY(-50%)",
            width: 268,
            height: 182,
            overflow: "hidden",
          }}
        >
          <Box
            component="video"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            sx={{
              position: "absolute",
              left: -1,
              top: -1,
              width: 270,
              height: 184,
              objectFit: "fill",
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const theme = createTheme({
  palette: { primary: { main: c.navy } },
  typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
});

function SkeletonCard() {
  return (
    <Box
      sx={{
        height: 114,
        borderRadius: "16px",
        flexShrink: 0,
        overflow: "hidden",
        "@keyframes shimmer": {
          "0%":   { backgroundPosition: "-600px 0" },
          "100%": { backgroundPosition: "600px 0" },
        },
        background: "linear-gradient(90deg, #e0e0e0 25%, #eeeeee 50%, #e0e0e0 75%)",
        backgroundSize: "1200px 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export default function App() {
  const [active, setActive] = useState("All");
  const [showSalon, setShowSalon] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [activeNav, setActiveNav] = useState("rooms");
  const [currentMember, setCurrentMember] = useState<string | null>(null);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [catBounceKey, setCatBounceKey] = useState(0);
  const [introPhase, setIntroPhase] = useState<"splash" | "fade" | "done">("splash");
  const lastScrollRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const t1 = window.setTimeout(() => setIntroPhase("fade"), SPLASH_VIDEO_MS);
    const t2 = window.setTimeout(() => setIntroPhase("done"), SPLASH_VIDEO_MS + SPLASH_FADE_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // Simulate content load
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Reset visible cards when filter changes
  useEffect(() => {
    setVisibleKeys(new Set());
  }, [active]);

  // IntersectionObserver — stagger cards as they enter view
  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => {
      observerRef.current?.disconnect();
      const root = cardsRef.current;
      if (!root) return;
      const obs = new IntersectionObserver(
        (entries) => {
          let delay = 0;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const key = entry.target.getAttribute("data-card-key");
              if (key) {
                const k = key;
                setTimeout(() => setVisibleKeys((prev) => new Set([...prev, k])), delay);
                delay += 70;
              }
              obs.unobserve(entry.target);
            }
          });
        },
        { root, threshold: 0.05 }
      );
      root.querySelectorAll("[data-card-key]").forEach((el) => obs.observe(el));
      observerRef.current = obs;
    }, 50);
    return () => clearTimeout(id);
  }, [loaded, active]);

  const pillsRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsDrag = useRef({ dragging: false, startY: 0, scrollTop: 0 });

  const onCardsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const curr = e.currentTarget.scrollTop;
    if (curr > lastScrollRef.current && curr > 40) setHeaderCollapsed(true);
    else if (curr < lastScrollRef.current) setHeaderCollapsed(false);
    lastScrollRef.current = curr;
  };

  const onCardsMouseDown = (e: React.MouseEvent) => {
    const el = cardsRef.current;
    if (!el) return;
    cardsDrag.current = { dragging: true, startY: e.pageY - el.offsetTop, scrollTop: el.scrollTop };
    el.style.cursor = "grabbing";
  };

  const onCardsMouseMove = (e: React.MouseEvent) => {
    const el = cardsRef.current;
    if (!cardsDrag.current.dragging || !el) return;
    e.preventDefault();
    const y = e.pageY - el.offsetTop;
    el.scrollTop = cardsDrag.current.scrollTop - (y - cardsDrag.current.startY);
  };

  const stopCardsDrag = () => {
    cardsDrag.current.dragging = false;
    if (cardsRef.current) cardsRef.current.style.cursor = "default";
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = pillsRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = pillsRef.current;
    if (!dragState.current.dragging || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
  };

  const stopDrag = () => {
    dragState.current.dragging = false;
    if (pillsRef.current) pillsRef.current.style.cursor = "grab";
  };

  const filteredRooms = active === "All" ? MIXED_ROOMS : ROOMS.filter((r) => r.genre === active);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          opacity: introPhase === "splash" ? 0 : 1,
          transition: introPhase !== "splash" ? `opacity ${SPLASH_FADE_MS}ms ease` : "none",
        }}
      >

      {currentMember !== null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <Box sx={{ width: { xs: "100%", sm: 393 }, height: { xs: "100dvh", sm: 874 }, bgcolor: "#0a005a", borderRadius: { xs: 0, sm: "44px" }, overflow: "hidden", boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" } }}>
            <MemberProfile memberId={currentMember} onBack={() => setCurrentMember(null)} />
          </Box>
        </Box>
      )}

      {currentRoom && showSalon && currentMember === null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <Salon room={currentRoom} onBack={() => setShowSalon(false)} onMemberSelect={(id) => setCurrentMember(id)} />
        </Box>
      )}

      {currentRoom && !showSalon && currentMember === null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <RoomPage room={currentRoom} onBack={() => { setCurrentRoom(null); setShowSalon(false); }} onEnterSalon={() => setShowSalon(true)} onNavigate={(tab) => { setCurrentRoom(null); setShowSalon(false); setActiveNav(tab); }} />
        </Box>
      )}

      {!currentRoom && activeNav === "discover" && currentMember === null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <Box sx={{ width: { xs: "100%", sm: 393 }, height: { xs: "100dvh", sm: 874 }, bgcolor: "#0a005a", borderRadius: { xs: 0, sm: "44px" }, overflow: "hidden", boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" } }}>
            <Explore
              rooms={ROOMS}
              onRoomSelect={(room) => { setCurrentRoom(room); }}
              onNavigate={(tab) => setActiveNav(tab)}
              onMemberSelect={(id) => setCurrentMember(id)}
            />
          </Box>
        </Box>
      )}

      {!currentRoom && activeNav === "shelf" && currentMember === null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <Box sx={{ width: { xs: "100%", sm: 393 }, height: { xs: "100dvh", sm: 874 }, bgcolor: "#0a005a", borderRadius: { xs: 0, sm: "44px" }, overflow: "hidden", boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" } }}>
            <Shelf
              rooms={ROOMS}
              onRoomSelect={(room) => { setCurrentRoom(room); }}
              onSalonOpen={(room) => { setCurrentRoom(room); setShowSalon(true); }}
              onNavigate={(tab) => setActiveNav(tab)}
            />
          </Box>
        </Box>
      )}

      {!currentRoom && activeNav === "profile" && currentMember === null && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
          <Box sx={{ width: { xs: "100%", sm: 393 }, height: { xs: "100dvh", sm: 874 }, bgcolor: "#0a005a", borderRadius: { xs: 0, sm: "44px" }, overflow: "hidden", boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" } }}>
            <Profile
              rooms={ROOMS}
              onRoomSelect={(room) => { setCurrentRoom(room); }}
              onSalonOpen={(room) => { setCurrentRoom(room); setShowSalon(true); }}
              onNavigate={(tab) => setActiveNav(tab)}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ display: currentRoom || activeNav === "discover" || activeNav === "shelf" || activeNav === "profile" || currentMember !== null ? "none" : "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: { xs: 0, sm: 4 } }}>
        {/* Mobile frame */}
        <Box
          sx={{
            width: { xs: "100%", sm: 393 },
            height: { xs: "100dvh", sm: 874 },
            position: "relative",
            bgcolor: c.navy,
            borderRadius: { xs: 0, sm: "44px" },
            boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" },
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* ── Header ────────────────────────────── */}
          <Box sx={{ px: "24px", pt: headerCollapsed ? "10px" : "15px", pb: "0px", transition: "padding 0.3s ease" }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: "8px" }}>

              {/* Logo: wordmark with animated cat */}
              <Box onMouseEnter={() => setCatBounceKey(k => k + 1)} sx={{ position: "relative", width: 102, height: 43, cursor: "pointer" }}>

                {/* Cat 1 — fades in at left, pauses, slides right (ease-in), pauses, fades out */}
                <Box sx={{
                  position: "absolute",
                  top: 0,
                  left: 54,
                  width: 43,
                  height: 28,
                  opacity: 0,
                  // transform animation: hold at -34px, then ease-in slide to 0
                  // transform animation: hold at -34px, then ease-in slide to 0
                  // transform animation: hold at -34px, then ease-in slide to 0
                  "@keyframes cat1-transform": {
                    "0%":     { transform: "translateX(-34px)" },
                    "53.6%":  { transform: "translateX(-34px)", animationTimingFunction: "ease-in" },
                    "75%":    { transform: "translateX(0px)" },
                    "100%":   { transform: "translateX(0px)" },
                  },
                  // opacity animation: fade in, hold, fade out
                  "@keyframes cat1-opacity": {
                    "0%":    { opacity: 0 },
                    "17.9%": { opacity: 1 },
                    "82.1%": { opacity: 1 },
                    "100%":  { opacity: 0 },
                  },
                  animation: "cat1-transform 2.8s linear forwards, cat1-opacity 2.8s ease forwards",
                  animationDelay: "0.5s",
                }}>
                  {/* Wobble wrapper — bobs up/down during slide to look like walking */}
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
                    <Box component="img" src={catLogo1} alt=""
                      sx={{ width: 43, height: 28, display: "block", transform: "rotate(180deg) scaleY(-1)" }}
                    />
                  </Box>
                </Box>

                {/* Cat 2 — fades in during the cross-fade at the end */}
                <Box sx={{
                  position: "absolute",
                  top: -3,
                  left: 54,
                  width: 54,
                  height: 35,
                  opacity: 0,
                  "@keyframes cat2-opacity": {
                    "0%":    { opacity: 0 },
                    "82.1%": { opacity: 0 },
                    "100%":  { opacity: 1 },
                  },
                  animation: "cat2-opacity 2.8s linear forwards",
                  animationDelay: "0.5s",
                }}>
                  {/* Wobble wrapper — single bob shortly after fade-in; replays on logo hover */}
                  <Box key={catBounceKey} sx={{
                    "@keyframes cat2-wobble": {
                      "0%":   { transform: "translateY(0) rotate(0deg)" },
                      "35%":  { transform: "translateY(-6px) rotate(5deg)" },
                      "60%":  { transform: "translateY(1px) rotate(-2.5deg)" },
                      "72%":  { transform: "translateY(-2px) rotate(1.5deg)" },
                      "84%":  { transform: "translateY(0.5px) rotate(-0.5deg)" },
                      "100%": { transform: "translateY(0) rotate(0deg)" },
                    },
                    animation: "cat2-wobble 0.55s ease forwards",
                    animationDelay: catBounceKey === 0 ? "3.5s" : "0s",
                  }}>
                    <Box component="img" src={catLogo2} alt=""
                      sx={{ width: 54, height: 35, display: "block" }}
                    />
                  </Box>
                </Box>

                {/* Wordmark — fades in first */}
                <Typography sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: "18.4px",
                  lineHeight: "22px",
                  letterSpacing: "-0.27px",
                  color: c.cream,
                  whiteSpace: "nowrap",
                  opacity: 0,
                  "@keyframes wordmark-fade": {
                    "0%":   { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                  animation: "wordmark-fade 0.5s ease forwards",
                }}>
                  Storyroom
                </Typography>
              </Box>

              {/* Avatar */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgb(226,169,201) 0%, rgb(139,169,198) 100%)",
                  p: "2px",
                  opacity: 0.9,
                }}
              >
                <Box
                  sx={{
                    width: 36, height: 36, borderRadius: "50%",
                    backgroundImage: `url(${paperTexture}), linear-gradient(135deg, #eee9dc 0%, #d3e8e2 100%)`,
                    backgroundSize: "cover, cover",
                    backgroundBlendMode: "multiply",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontFamily: serif, fontSize: 14, fontWeight: 700, lineHeight: 1, color: c.navy }}>
                    L
                  </Typography>
                </Box>
              </Box>
            </Box>

          </Box>

          {/* ── Filter pills ──────────────────────── */}
          <Box
            ref={pillsRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            sx={{
              px: "24px",
              py: headerCollapsed ? "0px" : "12px",
              maxHeight: headerCollapsed ? "0px" : "56px",
              opacity: headerCollapsed ? 0 : 1,
              overflow: "hidden",
              transition: "max-height 0.3s ease, opacity 0.2s ease, padding 0.3s ease",
              display: "flex",
              gap: "8px",
              overflowX: headerCollapsed ? "hidden" : "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              cursor: "grab",
              userSelect: "none",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === active;
              return (
                <Box
                  key={cat}
                  onClick={() => setActive(cat)}
                  sx={{
                    px: "16px",
                    py: "6px",
                    borderRadius: "9999px",
                    flexShrink: 0,
                    cursor: "pointer",
                    bgcolor: isActive ? CATEGORY_COLORS[cat] : "transparent",
                    border: isActive ? "none" : `0.556px solid ${c.sage}`,
                    boxShadow: isActive ? `0 0 20px ${CATEGORY_COLORS[cat]}66` : "none",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: sans,
                      fontSize: 14,
                      lineHeight: "20px",
                      color: isActive ? CATEGORY_TEXT_COLORS[cat] : c.sage,
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    {cat}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* ── White content area ────────────────── */}
          <Box
            ref={cardsRef}
            onScroll={onCardsScroll}
            onMouseDown={onCardsMouseDown}
            onMouseMove={onCardsMouseMove}
            onMouseUp={stopCardsDrag}
            onMouseLeave={stopCardsDrag}
            sx={{
              flex: 1,
              bgcolor: "white",
              pt: "29px",
              px: "24px",
              pb: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* Section header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 24, flexShrink: 0 }}>
              <Typography sx={{ fontFamily: serif, fontWeight: 600, fontSize: 20, lineHeight: "24px", color: c.navy }}>
                Rooms
              </Typography>

              {/* Listener count + throbbing live dot */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* Live dot with pulsing outer ring */}
                <Box sx={{ position: "relative", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Box sx={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    bgcolor: c.pink,
                    borderRadius: "50%",
                    opacity: 0.25,
                    "@keyframes throb": {
                      "0%, 100%": { transform: "scale(1)", opacity: 0.25 },
                      "50%":       { transform: "scale(1.9)", opacity: 0 },
                    },
                    animation: "throb 2s ease-out infinite",
                  }} />
                  <Box sx={{
                    width: 8,
                    height: 8,
                    bgcolor: c.pink,
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(226,169,201,0.8)",
                    flexShrink: 0,
                  }} />
                </Box>
                <Typography sx={{ fontFamily: sans, fontSize: 14, lineHeight: "20px", color: "black" }}>
                  {TOTAL_LISTENERS.toLocaleString()} listening
                </Typography>
              </Box>
            </Box>

            {/* Room cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {!loaded
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredRooms.map((room) => {
                const listenerCount = parseInt(room.listeners);
                const visible = visibleKeys.has(room.title);
                return (
                  <Box
                    key={room.title}
                    data-card-key={room.title}
                    onClick={() => setCurrentRoom(room)}
                    sx={{
                      height: 114,
                      borderRadius: "16px",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      flexShrink: 0,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(18px)",
                      transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: visible ? "scale(1.02)" : "translateY(18px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                      },
                    }}
                  >
                    {/* Background mood image */}
                    <Box component="img" src={room.image} alt=""
                      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                    />

                    {/* Dark gradient overlay */}
                    <Box sx={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.60) 100%)",
                    }} />

                    {/* Room title — top left */}
                    <Typography sx={{
                      position: "absolute", top: 14, left: 14,
                      fontFamily: serif, fontWeight: 500, fontSize: 20, lineHeight: "26px",
                      letterSpacing: "-0.3px", color: "white",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    }}>
                      {room.title}
                    </Typography>

                    {/* Listener count badge — top right */}
                    <Box sx={{
                      position: "absolute", top: 14, right: 14,
                      width: 32, height: 32, borderRadius: "50%",
                      bgcolor: c.mint,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Typography sx={{ fontFamily: sans, fontWeight: 600, fontSize: 10, color: "#2a4a43", lineHeight: 1 }}>
                        +{listenerCount > 99 ? "99" : listenerCount}
                      </Typography>
                    </Box>

                    {/* Bottom section: book cover + info + genre pill */}
                    <Box sx={{
                      position: "absolute", bottom: 12, left: 14, right: 14,
                      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                    }}>
                      {/* Book cover + text */}
                      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "9px" }}>
                        <Box component="img" src={room.bookCover} alt={room.bookTitle}
                          sx={{
                            width: 36, height: 50, objectFit: "cover", display: "block", flexShrink: 0,
                            borderRadius: "3px", border: `1.5px solid ${c.gold}`,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                          }}
                        />
                        <Box sx={{ pb: "1px" }}>
                          <Typography sx={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,0.60)", lineHeight: "13px", mb: "1px" }}>
                            Chapter {room.chapter} of {room.totalChapters} · Day {room.day}
                          </Typography>
                          <Typography sx={{ fontFamily: sans, fontWeight: 500, fontSize: 11, color: "rgba(255,255,255,0.90)", lineHeight: "15px" }}>
                            {room.bookTitle}
                          </Typography>
                          <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: "14px" }}>
                            {room.author}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Genre pill */}
                      <Box sx={{ bgcolor: room.genreColor, borderRadius: "9999px", px: "10px", py: "4px", flexShrink: 0 }}>
                        <Typography sx={{ fontFamily: sans, fontSize: 11, lineHeight: "16px", color: CATEGORY_TEXT_COLORS[room.genre] ?? "black", whiteSpace: "nowrap" }}>
                          {room.genre}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* ── Bottom navigation ─────────────────── */}
          <Box sx={{ bgcolor: c.navy, borderTop: `0.556px solid ${c.navyBorder}`, px: "24px", pt: "16px", pb: "20px", flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = item.key === "rooms";
                const color = isActive ? c.pink : "rgba(211,232,226,0.7)";
                return (
                  <Box
                    key={item.key}
                    onClick={() => { setActiveNav(item.key); }}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", minWidth: 40 }}
                  >
                    <item.Icon color={color} />
                    <Typography sx={{ fontFamily: sans, fontSize: 12, color, whiteSpace: "nowrap" }}>
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      </Box>

      {introPhase !== "done" && (
        <SplashOverlay phase={introPhase === "splash" ? "splash" : "fade"} videoSrc={splashAnimationUrl} />
      )}
    </ThemeProvider>
  );
}
