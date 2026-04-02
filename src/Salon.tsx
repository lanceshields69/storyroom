import { Box, Typography } from "@mui/material";
import { useState, useRef, useCallback, useMemo, useEffect, type ReactNode, type ChangeEvent, type KeyboardEvent } from "react";
import type { RoomData } from "./RoomPage";

import loveImg from "./assets/love-it.png";
import laughImg from "./assets/laugh.png";
import winkImg from "./assets/wink.png";
import coolImg from "./assets/cool.png";
import confusedImg from "./assets/confused.png";
import surprisedImg from "./assets/surprised.png";

import profile1 from "./assets/profile1.jpg";
import profile2 from "./assets/profile2.jpg";
import profile3 from "./assets/profile3.jpg";
import profile4 from "./assets/profile4.jpg";
import profile5 from "./assets/profile5.jpg";

const USER_AVATARS: Record<string, string> = {
  mireille_r: profile1,
  jakek:       profile2,
  t_ashworth:  profile3,
  ppolanski:   profile4,
  sunli:       profile5,
  nwatts:      profile5,
};

// ── Color tokens ───────────────────────────────────────────────────────────
const c = {
  navy:      "#0a005a",
  pink:      "#e2a9c9",
  cream:     "#eee9dc",
  sage:      "#d3e8e2",
  gold:      "#cdb670",
  dustyBlue: "#8BA9C6",
};
const sans  = "'Plus Jakarta Sans', sans-serif";
const serif = "'Besley', serif";

// ── Reactions ──────────────────────────────────────────────────────────────
const REACTIONS = [
  { id: "love",      src: loveImg },
  { id: "laugh",     src: laughImg },
  { id: "wink",      src: winkImg },
  { id: "cool",      src: coolImg },
  { id: "confused",  src: confusedImg },
  { id: "surprised", src: surprisedImg },
];

const REACTION_IMG_MAP: Record<string, string> = Object.fromEntries(
  REACTIONS.map(r => [r.id, r.src])
);

const INITIAL_REACTIONS: Record<string, string[]> = {
  "jakek-1":       ["love", "wink"],
  "t-ashworth-1":  ["love"],
  "storybot-road": ["cool"],
};

// ── Long-press hook ────────────────────────────────────────────────────────
function useLongPress(callback: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firedRef = useRef(false);

  const start = useCallback(() => {
    firedRef.current = false;
    timerRef.current = setTimeout(() => { firedRef.current = true; callback(); }, 500);
  }, [callback]);

  const cancel = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchCancel: cancel,
    onTouchMove: cancel,
    // Swallow the click that follows a long-press so it doesn't close the picker
    onClick: (e: { stopPropagation: () => void }) => { if (firedRef.current) { firedRef.current = false; e.stopPropagation(); } },
    onContextMenu: (e: { preventDefault: () => void }) => e.preventDefault(),
  };
}

// ── Icons ──────────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke={c.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StorybotIcon = ({ size = 22 }: { size?: number }) => (
  <Box component="span" sx={{ display: "inline-flex", flexShrink: 0 }}>
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="3" y="2" width="13" height="18" rx="2" stroke={c.sage} strokeWidth="1.2"/>
      <path d="M6 7h7M6 10.5h7M6 14h4" stroke={c.sage} strokeWidth="1.1" strokeLinecap="round"/>
      <rect x="14.5" y="4" width="4" height="14" rx="1" stroke={c.sage} strokeWidth="1"/>
    </svg>
  </Box>
);

// ── Presence strip ─────────────────────────────────────────────────────────
const PRESENCE_DOTS = [
  { size: 16, color: c.sage,  opacity: 0.55 },
  { size: 12, color: c.pink,  opacity: 0.40 },
  { size: 20, color: c.sage,  opacity: 0.35 },
  { size: 14, color: c.pink,  opacity: 0.70 },
  { size: 12, color: c.sage,  opacity: 0.50 },
  { size: 18, color: c.pink,  opacity: 0.45 },
  { size: 14, color: c.sage,  opacity: 0.60 },
  { size: 16, color: c.pink,  opacity: 0.38 },
  { size: 13, color: c.sage,  opacity: 0.48 },
];

// ── Waveform ───────────────────────────────────────────────────────────────
const BAR_COUNT = 60;
const SHEET_BAR_COUNT = 80;
const TRACK_SECS = 942; // 15:42

const fmtTime = (ratio: number) => {
  const s = Math.round(ratio * TRACK_SECS);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
};

const generateWaveform = (count: number, seed: number): number[] =>
  Array.from({ length: count }, (_, i) => {
    const position = i / count;
    const envelope = Math.sin(position * Math.PI) * 0.6 + 0.4;
    const variation = Math.sin(i * 2.3 + seed) * 0.5 + 0.5;
    const spike = Math.random() > 0.85 ? 1.4 : 1;
    return Math.max(0.15, Math.min(1, envelope * variation * spike));
  });

// ── Passage card ───────────────────────────────────────────────────────────
type PassageCardProps = {
  chapter: string;
  timestamp: string;
  quote: string;
  duration: string;
  playedRatio: number;
};

const PassageCard = ({ chapter, timestamp, quote, duration, playedRatio }: PassageCardProps) => {
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < timestamp.length; i++) h = (Math.imul(31, h) + timestamp.charCodeAt(i)) | 0;
    return h;
  }, [timestamp]);

  const bars = useMemo(() => generateWaveform(BAR_COUNT, seed), [seed]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(playedRatio);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setPlayhead(p => {
          if (p >= 1) { setIsPlaying(false); return 1; }
          return Math.min(1, p + 0.004);
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  return (
    <Box sx={{
      bgcolor: "rgba(5,0,40,0.7)",
      border: "0.5px solid rgba(238,233,220,0.10)",
      borderRadius: "10px",
      p: "12px",
      mt: "8px",
    }}>
      <Typography sx={{
        fontFamily: sans, fontSize: 9, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "rgba(205,182,112,0.8)", mb: "6px",
      }}>
        {chapter} · {timestamp}
      </Typography>
      <Typography sx={{
        fontFamily: sans, fontSize: 11, fontStyle: "italic",
        color: "rgba(238,233,220,0.65)", lineHeight: "16px", mb: "10px",
      }}>
        "{quote}"
      </Typography>

      {/* Waveform row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "6px" }}>
        {/* Play button */}
        <Box
          onClick={() => setIsPlaying(p => !p)}
          sx={{
            width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
            bgcolor: "rgba(226,169,201,0.20)",
            border: "1px solid rgba(226,169,201,0.40)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isPlaying ? (
            /* Pause icon — two 2×8 rects */
            <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
              <Box sx={{ width: 2, height: 8, bgcolor: c.pink, borderRadius: "1px" }} />
              <Box sx={{ width: 2, height: 8, bgcolor: c.pink, borderRadius: "1px" }} />
            </Box>
          ) : (
            /* Play triangle */
            <Box sx={{
              width: 0, height: 0, ml: "2px",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: `8px solid ${c.pink}`,
            }} />
          )}
        </Box>

        {/* Bars */}
        <Box sx={{ flex: 1, height: 36, display: "flex", alignItems: "center", gap: "1px" }}>
          {bars.map((v, i) => {
            const h = Math.max(4, Math.round(v * 32));
            const played = i / BAR_COUNT < playhead;
            return (
              <Box key={i} sx={{
                width: 2, height: h, borderRadius: "1px", flexShrink: 0,
                bgcolor: played ? c.pink : "rgba(238,233,220,0.20)",
                transition: "background-color 0.1s",
              }} />
            );
          })}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.3)" }}>{duration}</Typography>
        <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.3)" }}>tap to listen</Typography>
      </Box>
    </Box>
  );
};

// ── Avatar helpers ─────────────────────────────────────────────────────────
const getInitials = (name: string) =>
  name.replace(/_/g, " ").split(" ").slice(0, 2).map(p => p[0]?.toUpperCase() ?? "").join("");

const UserAvatar = ({ name, size = 28, onClick }: { name: string; size?: number; onClick?: () => void }) => {
  const src = USER_AVATARS[name];
  return (
    <Box onClick={onClick} sx={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      bgcolor: "rgba(139,169,198,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
    }}>
      {src ? (
        <Box component="img" src={src} alt={name} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <Typography sx={{ fontFamily: sans, fontSize: size * 0.36, fontWeight: 500, color: c.dustyBlue, lineHeight: 1 }}>
          {getInitials(name)}
        </Typography>
      )}
    </Box>
  );
};

// ── Reply types ─────────────────────────────────────────────────────────────
type Reply = { type: "user" | "storybot"; author?: string; text: string };

type ReplyItemProps = {
  reply: Reply;
  messageId: string;
  onLongPress: (id: string, rect: DOMRect) => void;
  userReaction?: string;
  onMemberSelect?: (name: string) => void;
};

const ReplyItem = ({ reply, messageId, onLongPress, userReaction, onMemberSelect }: ReplyItemProps) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const pressHandlers = useLongPress(useCallback(() => {
    if (bubbleRef.current) onLongPress(messageId, bubbleRef.current.getBoundingClientRect());
  }, [messageId, onLongPress]));

  const footer = (
    <MessageFooter messageId={messageId} userReaction={userReaction} showActions={false} />
  );

  if (reply.type === "storybot") {
    return (
      <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <StorybotIcon size={16} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            ref={bubbleRef}
            {...(pressHandlers as any)}
            sx={{
              bgcolor: "#20166E",
              borderLeft: `2px solid ${c.sage}`,
              borderRadius: "0 8px 8px 8px",
              px: "10px", py: "7px",
              userSelect: "none", WebkitUserSelect: "none", cursor: "default",
            }}
          >
            <Typography sx={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: c.sage, mb: "2px" }}>
              StoryBot
            </Typography>
            <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.8)", lineHeight: "17px" }}>
              {reply.text}
            </Typography>
          </Box>
          {footer}
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
      <UserAvatar name={reply.author!} size={20} onClick={reply.author ? () => onMemberSelect?.(reply.author!) : undefined} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          ref={bubbleRef}
          {...(pressHandlers as any)}
          sx={{
            bgcolor: "#20166E",
            borderRadius: "0 8px 8px 8px",
            px: "10px", py: "7px",
            userSelect: "none", WebkitUserSelect: "none", cursor: "default",
          }}
        >
          <Typography
            onClick={() => reply.author && onMemberSelect?.(reply.author)}
            sx={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: "rgba(238,233,220,0.45)", mb: "2px", cursor: onMemberSelect && reply.author ? "pointer" : "default" }}
          >
            {reply.author}
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.75)", lineHeight: "17px" }}>
            {reply.text}
          </Typography>
        </Box>
        {footer}
      </Box>
    </Box>
  );
};

type ReplyThreadProps = {
  replies: Reply[];
  parentId: string;
  onLongPress: (id: string, rect: DOMRect) => void;
  userReactions?: Record<string, string>;
  onMemberSelect?: (name: string) => void;
};

const ReplyThread = ({ replies, parentId, onLongPress, userReactions = {}, onMemberSelect }: ReplyThreadProps) => (
  <Box sx={{
    ml: "36px", mt: "8px",
    borderLeft: "1px solid rgba(226,169,201,0.20)",
    pl: "10px",
    display: "flex", flexDirection: "column", gap: "8px",
  }}>
    {replies.map((r, i) => (
      <ReplyItem
        key={i}
        reply={r}
        messageId={`${parentId}-r${i}`}
        onLongPress={onLongPress}
        userReaction={userReactions[`${parentId}-r${i}`]}
        onMemberSelect={onMemberSelect}
      />
    ))}
  </Box>
);

// ── Message footer (reactions + action buttons) ────────────────────────────
type FooterProps = {
  messageId: string;
  initialReactions?: string[];
  userReaction?: string;
  hasPassage?: boolean;
  showActions?: boolean;
};

const MessageFooter = ({ initialReactions, userReaction, hasPassage, showActions = true }: FooterProps) => {
  const all = [...(initialReactions ?? [])];
  if (userReaction && !all.includes(userReaction)) all.push(userReaction);

  const groups: Record<string, number> = {};
  all.forEach(r => { groups[r] = (groups[r] ?? 0) + 1; });
  const chips = Object.entries(groups);

  return (
    <Box sx={{ mt: "5px", display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
      {chips.map(([rid, cnt]) => (
        <Box key={rid} sx={{
          display: "flex", alignItems: "center", gap: "3px",
          bgcolor: "rgba(238,233,220,0.06)",
          border: "0.5px solid rgba(238,233,220,0.10)",
          borderRadius: "20px",
          px: "7px", py: "2px",
        }}>
          <Box component="img" src={REACTION_IMG_MAP[rid]} alt={rid} sx={{ width: 14, height: 14, display: "block" }} />
          {cnt > 1 && (
            <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.50)" }}>{cnt}</Typography>
          )}
        </Box>
      ))}
      {chips.length > 0 && showActions && <Box sx={{ flex: 1, minWidth: 4 }} />}
      {showActions && (
        <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.45)", cursor: "pointer" }}>
          Reply
        </Typography>
      )}
      {hasPassage && (
        <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.45)", cursor: "pointer", ml: "6px" }}>
          Passage
        </Typography>
      )}
    </Box>
  );
};

// ── Reaction picker ────────────────────────────────────────────────────────
type PickerState = { messageId: string; top: number; left: number; openDownward: boolean };

const ReactionPicker = ({ picker, onReact }: {
  picker: PickerState;
  onReact: (msgId: string, rid: string) => void;
}) => (
  <Box
    onClick={e => e.stopPropagation()}
    sx={{ position: "absolute", top: picker.top, left: picker.left, zIndex: 50 }}
  >
    {picker.openDownward && (
      <Box sx={{
        width: 0, height: 0, mx: "22px", mb: "-1px",
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderBottom: "7px solid #1b0ca8",
      }} />
    )}
    <Box sx={{
      bgcolor: "#1b0ca8",
      border: "0.5px solid rgba(238,233,220,0.18)",
      borderRadius: "30px",
      padding: "6px 10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", gap: "4px",
    }}>
      {REACTIONS.map(r => (
        <Box
          key={r.id}
          onClick={() => onReact(picker.messageId, r.id)}
          sx={{
            width: 34, height: 34, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.15s ease, background-color 0.15s ease",
            "&:hover": { transform: "scale(1.2)", bgcolor: "rgba(238,233,220,0.10)" },
          }}
        >
          <Box component="img" src={r.src} alt={r.id} sx={{ width: 24, height: 24, display: "block" }} />
        </Box>
      ))}
    </Box>
    {!picker.openDownward && (
      <Box sx={{
        width: 0, height: 0, mx: "22px", mt: "-1px",
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "7px solid #1b0ca8",
      }} />
    )}
  </Box>
);

// ── User post ──────────────────────────────────────────────────────────────
type UserPostProps = {
  messageId: string;
  author: string;
  time?: string;
  text?: string;
  passage?: ReactNode;
  replies?: Reply[];
  directed?: boolean;
  flash?: boolean;
  onMemberSelect?: (name: string) => void;
  initialReactions?: string[];
  userReaction?: string;
  userReactions?: Record<string, string>;
  onLongPress: (messageId: string, rect: DOMRect) => void;
};

const UserPost = ({ messageId, author, time, text, passage, replies, directed, flash, onMemberSelect, initialReactions, userReaction, userReactions, onLongPress }: UserPostProps) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const pressHandlers = useLongPress(useCallback(() => {
    if (bubbleRef.current) onLongPress(messageId, bubbleRef.current.getBoundingClientRect());
  }, [messageId, onLongPress]));

  const canNav = author !== "you" && !!onMemberSelect;
  return (
    <Box sx={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
      <UserAvatar name={author} onClick={canNav ? () => onMemberSelect!(author) : undefined} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "8px", mb: "5px" }}>
          <Typography
            onClick={canNav ? () => onMemberSelect!(author) : undefined}
            sx={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: "rgba(238,233,220,0.45)", cursor: canNav ? "pointer" : "default" }}
          >
            {author}
          </Typography>
          {time && (
            <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.28)" }}>
              {time}
            </Typography>
          )}
        </Box>
        <Box
          ref={bubbleRef}
          {...(pressHandlers as any)}
          sx={{
            bgcolor: "#20166E",
            border: directed ? `0.5px solid ${c.sage}` : "none",
            borderRadius: "0 10px 10px 10px",
            px: "12px", py: "9px",
            userSelect: "none",
            WebkitUserSelect: "none",
            cursor: "default",
            ...(flash && {
              "@keyframes flashBubble": {
                "0%": { backgroundColor: "hsl(247, 67%, 41%)" },
                "100%": { backgroundColor: "#20166E" },
              },
              animation: "flashBubble 1.8s ease forwards",
            }),
          }}
        >
          <Typography sx={{
            fontFamily: sans, fontSize: 13,
            fontStyle: directed ? "italic" : "normal",
            color: directed ? "rgba(238,233,220,0.60)" : "rgba(238,233,220,0.85)",
            lineHeight: "18px",
          }}>
            {text}
          </Typography>
          {passage}
        </Box>
        <MessageFooter
          messageId={messageId}
          initialReactions={initialReactions}
          userReaction={userReaction}
          hasPassage={!!passage}
        />
        {replies && <ReplyThread replies={replies} parentId={messageId} onLongPress={onLongPress} userReactions={userReactions} onMemberSelect={onMemberSelect} />}
      </Box>
    </Box>
  );
};

// ── StoryBot post ──────────────────────────────────────────────────────────
type StorybotPostProps = {
  messageId: string;
  text: string;
  passage?: ReactNode;
  passageFirst?: boolean;
  citation?: string;
  replies?: Reply[];
  initialReactions?: string[];
  userReaction?: string;
  userReactions?: Record<string, string>;
  onLongPress: (messageId: string, rect: DOMRect) => void;
  onMemberSelect?: (name: string) => void;
};

const StorybotPost = ({ messageId, text, passage, passageFirst, citation, replies, initialReactions, userReaction, userReactions, onLongPress, onMemberSelect }: StorybotPostProps) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const pressHandlers = useLongPress(useCallback(() => {
    if (bubbleRef.current) onLongPress(messageId, bubbleRef.current.getBoundingClientRect());
  }, [messageId, onLongPress]));

  return (
    <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
      <StorybotIcon size={22} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: c.sage, mb: "5px" }}>
          StoryBot
        </Typography>
        <Box
          ref={bubbleRef}
          {...(pressHandlers as any)}
          sx={{
            bgcolor: "#20166E",
            borderLeft: `2px solid ${c.sage}`,
            borderRadius: "0 10px 10px 10px",
            px: "12px", py: "9px",
            userSelect: "none",
            WebkitUserSelect: "none",
            cursor: "default",
          }}
        >
          {passageFirst && passage}
          <Typography sx={{ fontFamily: sans, fontSize: 13, color: "rgba(238,233,220,0.85)", lineHeight: "18px" }}>
            {text}
          </Typography>
          {!passageFirst && passage}
        </Box>
        {citation && (
          <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(211,232,226,0.50)", mt: "5px", ml: "2px" }}>
            {citation}
          </Typography>
        )}
        <MessageFooter
          messageId={messageId}
          initialReactions={initialReactions}
          userReaction={userReaction}
          hasPassage={!!passage}
        />
        {replies && <ReplyThread replies={replies} parentId={messageId} onLongPress={onLongPress} userReactions={userReactions} onMemberSelect={onMemberSelect} />}
      </Box>
    </Box>
  );
};

// ── Divider ────────────────────────────────────────────────────────────────
const FeedDivider = () => (
  <Box sx={{ height: "0.5px", bgcolor: "rgba(238,233,220,0.06)", mx: "2px" }} />
);

// ── Passage sheet ─────────────────────────────────────────────────────────
const EXCERPTS = [
  "He thought of the ancient songs that spoke of home, of fire and rain and the smell of earth after long drought...",
  "...and the valley was filled with their voices, and the night seemed more beautiful and more sad than any he had known...",
  "The road goes ever on and on, down from the door where it began, and I must follow if I can...",
];
const getExcerpt = (midpoint: number) =>
  midpoint < 0.34 ? EXCERPTS[0] : midpoint < 0.67 ? EXCERPTS[1] : EXCERPTS[2];

type SharedPost = { id: string; playedRatio: number; caption: string; excerpt: string; timestampRange: string };
type ChatPost   = { id: string; text: string };
type AskPost    = { id: string; question: string; answered: boolean };

type PassageSheetProps = {
  visible: boolean;
  room: RoomData;
  onClose: () => void;
  onShare: (playedRatio: number, caption: string, excerpt: string, timestampRange: string) => void;
};

const PassageSheet = ({ visible, room, onClose, onShare }: PassageSheetProps) => {
  const [step,           setStep]           = useState<"clip"|"write">("clip");
  const [selectionStart, setSelectionStart] = useState(0.25);
  const [selectionEnd,   setSelectionEnd]   = useState(0.60);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [playhead,       setPlayhead]       = useState(0.25);
  const [message,        setMessage]        = useState("");
  const [dragging,       setDragging]       = useState<"left"|"right"|null>(null);

  const waveRef    = useRef<HTMLDivElement | null>(null);
  const textareaRef= useRef<HTMLTextAreaElement | null>(null);
  const startRef   = useRef(selectionStart);
  const endRef     = useRef(selectionEnd);
  const playTimer  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { startRef.current = selectionStart; }, [selectionStart]);
  useEffect(() => { endRef.current   = selectionEnd;   }, [selectionEnd]);

  // Reset state when sheet opens
  useEffect(() => {
    if (visible) {
      setStep("clip");
      setSelectionStart(0.25); setSelectionEnd(0.60);
      setIsPlaying(false); setPlayhead(0.25); setMessage("");
    }
  }, [visible]);

  // Auto-focus textarea when entering write step
  useEffect(() => {
    if (step === "write") {
      const t = setTimeout(() => textareaRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [step]);

  const bars = useMemo(() => generateWaveform(SHEET_BAR_COUNT, 7.3), []);

  // ── Drag logic
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!waveRef.current) return;
      const rect = waveRef.current.getBoundingClientRect();
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const r = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
      if (dragging === "left")  setSelectionStart(Math.min(r, endRef.current   - 0.1));
      else                      setSelectionEnd  (Math.max(r, startRef.current + 0.1));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove",  onMove, { passive: true });
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("touchend",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("touchend",   onUp);
    };
  }, [dragging]);

  // ── Preview playback
  useEffect(() => {
    if (isPlaying) {
      setPlayhead(startRef.current);
      const tick = (endRef.current - startRef.current) / 60;
      playTimer.current = setInterval(() => {
        setPlayhead(p => {
          const next = p + tick;
          if (next >= endRef.current) { setIsPlaying(false); return startRef.current; }
          return next;
        });
      }, 50);
    } else {
      if (playTimer.current) clearInterval(playTimer.current);
      setPlayhead(startRef.current);
    }
    return () => { if (playTimer.current) clearInterval(playTimer.current); };
  }, [isPlaying]);

  useEffect(() => { if (!isPlaying) setPlayhead(selectionStart); }, [selectionStart, isPlaying]);

  const HandleVisual = () => (
    <Box sx={{ position: "relative", width: 2, height: "100%", bgcolor: c.gold }}>
      <Box sx={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 14, height: 20, bgcolor: c.gold, borderRadius: "4px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px",
      }}>
        {[0,1,2].map(i => <Box key={i} sx={{ width: 6, height: "1px", bgcolor: c.navy }} />)}
      </Box>
    </Box>
  );

  const CHAR_LIMIT    = 280;
  const charsLeft     = CHAR_LIMIT - message.length;
  const clipDuration  = fmtTime(selectionEnd - selectionStart);
  const midpoint      = (selectionStart + selectionEnd) / 2;
  const excerpt       = getExcerpt(midpoint);
  const timestampRange = `${fmtTime(selectionStart)} – ${fmtTime(selectionEnd)}`;

  return (
    <Box sx={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
      bgcolor: "#0D0060",
      borderTop: "0.5px solid rgba(238,233,220,0.10)",
      borderRadius: "20px 20px 0 0",
      display: "flex", flexDirection: "column",
      transform: visible ? "translateY(0)" : "translateY(105%)",
      transition: "transform 300ms ease-out",
      zIndex: 60,
      overflow: "hidden",
    }}>

      {/* ── Drag pill + fixed header ─────────────────────────────────────── */}
      <Box sx={{ flexShrink: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "center", pt: "10px", pb: "4px" }}>
          <Box sx={{ width: 36, height: 4, bgcolor: "rgba(238,233,220,0.20)", borderRadius: "2px" }} />
        </Box>

        {/* Header row */}
        <Box sx={{ px: "20px", pb: "10px", display: "flex", alignItems: "flex-start" }}>
          {/* Back chevron (step 2 only) */}
          <Box
            onClick={() => { setStep("clip"); setIsPlaying(false); }}
            sx={{
              mr: "10px", mt: "3px", cursor: "pointer", flexShrink: 0,
              opacity: step === "write" ? 1 : 0,
              pointerEvents: step === "write" ? "auto" : "none",
              transition: "opacity 150ms",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke={c.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontFamily: serif, fontSize: 15, color: c.cream, lineHeight: "22px", mb: "2px" }}>
              Add a Passage
            </Typography>
            <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.40)", lineHeight: "15px" }}>
              {step === "clip"
                ? "Drag the handles to select a section from your current listen."
                : "What made you stop here?"}
            </Typography>
          </Box>

          <Box onClick={onClose} sx={{ ml: "12px", mt: "2px", cursor: "pointer", flexShrink: 0 }}>
            <Typography sx={{ fontFamily: sans, fontSize: 20, color: "rgba(238,233,220,0.40)", lineHeight: 1 }}>×</Typography>
          </Box>
        </Box>

        {/* Book context strip */}
        <Box sx={{
          px: "20px", pb: "12px",
          display: "flex", alignItems: "center", gap: "10px",
          borderBottom: "0.5px solid rgba(238,233,220,0.06)",
        }}>
          <Box component="img" src={room.image} alt="" sx={{
            width: 22, height: 30, objectFit: "cover", flexShrink: 0,
            borderRadius: "3px", border: `1px solid ${c.gold}`, display: "block",
          }} />
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.60)", lineHeight: "15px" }}>
            Chapter 3 — A Short Rest ·{" "}
            <Box component="span" sx={{ color: c.gold }}>1:04:22</Box>
          </Typography>
        </Box>
      </Box>

      {/* ── Two-panel slider ─────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <Box sx={{
          display: "flex", width: "200%", height: "100%",
          transform: step === "clip" ? "translateX(0)" : "translateX(-50%)",
          transition: "transform 200ms ease-out",
        }}>

          {/* ── Panel 1: Clip ──────────────────────────────────────────── */}
          <Box sx={{
            width: "50%", overflowY: "auto", px: "20px", py: "14px",
            display: "flex", flexDirection: "column", gap: "12px",
            "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none",
          }}>

            {/* Waveform */}
            <Box ref={waveRef} sx={{ position: "relative", height: 64, userSelect: "none", WebkitUserSelect: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1px" }}>
                {bars.map((v, i) => {
                  const r  = i / SHEET_BAR_COUNT;
                  const inSel    = r >= selectionStart && r <= selectionEnd;
                  const previewd = inSel && r < playhead;
                  const h  = Math.max(4, Math.round(v * 58));
                  const bg = previewd ? "#f0c4da"
                           : inSel   ? "rgba(226,169,201,0.85)"
                                     : "rgba(238,233,220,0.15)";
                  return <Box key={i} sx={{ flex: 1, maxWidth: "4px", height: h, borderRadius: "1px", bgcolor: bg, transition: "background-color 0.06s" }} />;
                })}
              </Box>

              <Box sx={{
                position: "absolute", top: 0, bottom: 0,
                left: `${playhead * 100}%`, width: 1,
                bgcolor: "rgba(238,233,220,0.60)",
                zIndex: 3, pointerEvents: "none",
                opacity: isPlaying ? 1 : 0,
              }} />

              {/* Left handle */}
              <Box
                onMouseDown={e => { e.preventDefault(); setDragging("left"); }}
                onTouchStart={() => setDragging("left")}
                sx={{ position: "absolute", top: 0, bottom: 0, left: `calc(${selectionStart * 100}% - 22px)`, width: 44, zIndex: 4, cursor: "ew-resize", display: "flex", justifyContent: "center" }}
              >
                <HandleVisual />
              </Box>

              {/* Right handle */}
              <Box
                onMouseDown={e => { e.preventDefault(); setDragging("right"); }}
                onTouchStart={() => setDragging("right")}
                sx={{ position: "absolute", top: 0, bottom: 0, left: `calc(${selectionEnd * 100}% - 22px)`, width: 44, zIndex: 4, cursor: "ew-resize", display: "flex", justifyContent: "center" }}
              >
                <HandleVisual />
              </Box>
            </Box>

            {/* Time labels */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: sans, fontSize: 11, color: c.gold }}>
                  {fmtTime(selectionStart)} to {fmtTime(selectionEnd)}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.30)" }}>15:42</Typography>
            </Box>

            {/* Play button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                onClick={() => setIsPlaying(p => !p)}
                sx={{
                  width: 44, height: 44, borderRadius: "50%",
                  bgcolor: "rgba(226,169,201,0.15)", border: `1.5px solid ${c.pink}`,
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                {isPlaying ? (
                  <Box sx={{ display: "flex", gap: "3px" }}>
                    <Box sx={{ width: 3, height: 12, bgcolor: c.pink, borderRadius: "1.5px" }} />
                    <Box sx={{ width: 3, height: 12, bgcolor: c.pink, borderRadius: "1.5px" }} />
                  </Box>
                ) : (
                  <Box sx={{ width: 0, height: 0, ml: "3px", borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: `11px solid ${c.pink}` }} />
                )}
              </Box>
            </Box>

            {/* Next button */}
            <Box
              onClick={() => { setIsPlaying(false); setStep("write"); }}
              sx={{
                width: "100%", py: "16px", borderRadius: "30px", bgcolor: c.pink,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "opacity 0.15s", "&:hover": { opacity: 0.88 },
              }}
            >
              <Typography sx={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: c.navy }}>
                Next — Add a Message
              </Typography>
            </Box>
          </Box>

          {/* ── Panel 2: Write ─────────────────────────────────────────── */}
          <Box sx={{
            width: "50%", px: "20px", py: "14px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>

            {/* Passage preview card */}
            <Box sx={{
              bgcolor: "rgba(5,0,40,0.7)",
              border: "0.5px solid rgba(238,233,220,0.10)",
              borderRadius: "10px",
              p: "12px",
              pointerEvents: "none",
            }}>
              {/* Chapter + timestamp range */}
              <Typography sx={{
                fontFamily: sans, fontSize: 9, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "rgba(205,182,112,0.8)", mb: "6px",
              }}>
                ch. 3 · {timestampRange}
              </Typography>

              {/* Excerpt */}
              <Typography sx={{
                fontFamily: sans, fontSize: 11, fontStyle: "italic",
                color: "rgba(238,233,220,0.65)", lineHeight: "16px", mb: "10px",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                "{excerpt}"
              </Typography>

              {/* Compact waveform */}
              <Box sx={{ display: "flex", alignItems: "center", height: 28, gap: "1px" }}>
                {bars.map((v, i) => {
                  const r     = i / SHEET_BAR_COUNT;
                  const inSel = r >= selectionStart && r <= selectionEnd;
                  const h     = Math.max(2, Math.round(v * 24));
                  return <Box key={i} sx={{ flex: 1, maxWidth: "4px", height: h, borderRadius: "1px", bgcolor: inSel ? c.pink : "rgba(226,169,201,0.22)" }} />;
                })}
              </Box>

              {/* Duration */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: "6px" }}>
                <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.3)" }}>{clipDuration}</Typography>
                <Typography sx={{ fontFamily: sans, fontSize: 10, color: "rgba(238,233,220,0.3)" }}>tap to listen</Typography>
              </Box>
            </Box>

            {/* Multiline message input */}
            <Box sx={{ flex: 1, position: "relative", minHeight: 100 }}>
              <Box
                component="textarea"
                ref={textareaRef}
                placeholder="What made you stop here?"
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  if (e.target.value.length <= CHAR_LIMIT) setMessage(e.target.value);
                }}
                sx={{
                  width: "100%", height: "100%", boxSizing: "border-box",
                  bgcolor: "rgba(238,233,220,0.05)",
                  border: "0.5px solid rgba(238,233,220,0.12)",
                  borderRadius: "12px",
                  p: "12px",
                  fontFamily: sans, fontSize: 12, color: c.cream,
                  lineHeight: "18px",
                  outline: "none", resize: "none",
                  "&::placeholder": { color: "rgba(238,233,220,0.30)" },
                  "&:focus": { border: "0.5px solid rgba(238,233,220,0.28)" },
                }}
              />
              {/* Char counter */}
              {charsLeft <= 40 && (
                <Typography sx={{
                  position: "absolute", bottom: "10px", right: "10px",
                  fontFamily: sans, fontSize: 10,
                  color: charsLeft <= 10 ? "rgba(226,169,201,0.70)" : "rgba(238,233,220,0.30)",
                  pointerEvents: "none",
                }}>
                  {charsLeft}
                </Typography>
              )}
            </Box>

            {/* Share button */}
            <Box
              onClick={() => onShare(selectionEnd - selectionStart, message, excerpt, timestampRange)}
              sx={{
                width: "100%", py: "16px", borderRadius: "30px", bgcolor: c.pink,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "opacity 0.15s", "&:hover": { opacity: 0.88 },
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: c.navy }}>
                Share Passage
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

// ── Ask sheet ──────────────────────────────────────────────────────────────
type AskSheetProps = { visible: boolean; onClose: () => void; onAsk: (question: string) => void };

const AskSheet = ({ visible, onAsk }: AskSheetProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (visible) {
      setText("");
      const t = setTimeout(() => textareaRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const handleSubmit = () => {
    const q = text.trim();
    if (!q) return;
    onAsk(q);
    setText("");
  };

  return (
    <Box sx={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
      bgcolor: "#0D0060",
      borderTop: "0.5px solid rgba(238,233,220,0.10)",
      borderRadius: "20px 20px 0 0",
      display: "flex", flexDirection: "column",
      transform: visible ? "translateY(0)" : "translateY(105%)",
      transition: "transform 300ms ease-out",
      zIndex: 60,
      px: "20px", pb: "20px",
    }}>
      {/* Drag pill */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: "10px", pb: "8px", flexShrink: 0 }}>
        <Box sx={{ width: 36, height: 4, bgcolor: "rgba(238,233,220,0.20)", borderRadius: "2px" }} />
      </Box>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px", mb: "12px", flexShrink: 0 }}>
        <Box sx={{ mt: "1px", flexShrink: 0 }}><StorybotIcon size={22} /></Box>
        <Box>
          <Typography sx={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: c.sage, lineHeight: "18px" }}>
            Ask StoryBot
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.35)", lineHeight: "16px" }}>
            Your question and the answer will be shared with the room.
          </Typography>
        </Box>
      </Box>

      {/* Textarea */}
      <Box
        component="textarea"
        ref={textareaRef}
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
        }}
        placeholder="Ask anything about the book, the author, the context..."
        sx={{
          flex: 1,
          bgcolor: "rgba(238,233,220,0.05)",
          border: `0.5px solid rgba(211,232,226,0.20)`,
          borderRadius: "12px",
          p: "12px",
          fontFamily: sans, fontSize: 12, color: c.cream,
          lineHeight: "18px", letterSpacing: "-0.3px",
          outline: "none", resize: "none",
          boxSizing: "border-box",
          "&::placeholder": { color: "rgba(238,233,220,0.30)" },
        }}
      />

      {/* Ask button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "10px", flexShrink: 0 }}>
        <Box
          onClick={handleSubmit}
          sx={{
            height: 32, px: "16px", borderRadius: "9999px",
            bgcolor: "rgba(211,232,226,0.15)",
            border: `0.5px solid ${c.sage}`,
            display: "flex", alignItems: "center", cursor: "pointer",
          }}
        >
          <Typography sx={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: c.sage }}>Ask StoryBot</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ── Salon ──────────────────────────────────────────────────────────────────
type Props = { room: RoomData; onBack: () => void; onMemberSelect?: (id: string) => void };

export default function Salon({ room, onBack, onMemberSelect }: Props) {
  const salonRef = useRef<HTMLDivElement | null>(null);
  const [picker, setPicker] = useState<PickerState | null>(null);
  const [userReactions, setUserReactions] = useState<Record<string, string>>({});
  const [showPassageSheet, setShowPassageSheet] = useState(false);
  const [showAskSheet, setShowAskSheet] = useState(false);
  const [sharedPosts, setSharedPosts] = useState<SharedPost[]>([]);
  const [chatPosts, setChatPosts] = useState<ChatPost[]>([]);
  const [askPosts, setAskPosts] = useState<AskPost[]>([]);
  const [newPostId, setNewPostId] = useState<string | null>(null);
  const [composeText, setComposeText] = useState("");
  const composeRef = useRef<HTMLTextAreaElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const askPostRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to bottom on mount so most recent activity is visible
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, []);

  const handleComposeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComposeText(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleLongPress = useCallback((messageId: string, rect: DOMRect) => {
    if (!salonRef.current) return;
    const containerRect = salonRef.current.getBoundingClientRect();
    const pickerHeight = 54;
    const pickerWidth = 264;
    const relTop = rect.top - containerRect.top;
    const openDownward = relTop < 110;
    const top = openDownward
      ? relTop + rect.height + 6
      : relTop - pickerHeight - 6;
    const bubbleCenterX = rect.left - containerRect.left + rect.width / 2;
    const left = Math.max(8, Math.min(containerRect.width - pickerWidth - 8, bubbleCenterX - pickerWidth / 2));
    setPicker({ messageId, top, left, openDownward });
  }, []);

  const handleReact = useCallback((messageId: string, reactionId: string) => {
    setUserReactions(prev => {
      if (prev[messageId] === reactionId) {
        const next = { ...prev };
        delete next[messageId];
        return next;
      }
      return { ...prev, [messageId]: reactionId };
    });
    setPicker(null);
  }, []);

  const handleShare = useCallback((playedRatio: number, caption: string, excerpt: string, timestampRange: string) => {
    const id = `shared-${Date.now()}`;
    setSharedPosts(prev => [...prev, { id, playedRatio, caption, excerpt, timestampRange }]);
    setShowPassageSheet(false);
    requestAnimationFrame(() => {
      if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
    });
  }, []);

  const handleComposeSubmit = useCallback(() => {
    const text = composeText.trim();
    if (!text) return;
    const id = `chat-${Date.now()}`;
    setChatPosts(prev => [...prev, { id, text }]);
    setNewPostId(id);
    setComposeText("");
    if (composeRef.current) composeRef.current.style.height = "auto";
    requestAnimationFrame(() => {
      if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
    });
    setTimeout(() => setNewPostId(null), 2000);
  }, [composeText]);

  const handleAsk = useCallback((question: string) => {
    const id = `ask-${Date.now()}`;
    setAskPosts(prev => [...prev, { id, question, answered: false }]);
    setShowAskSheet(false);
    setTimeout(() => {
      askPostRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 120);
    setTimeout(() => {
      setAskPosts(prev => prev.map(p => p.id === id ? { ...p, answered: true } : p));
      setTimeout(() => {
        askPostRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }, 900);
  }, []);

  const postProps = (id: string) => ({
    messageId: id,
    initialReactions: INITIAL_REACTIONS[id],
    userReaction: userReactions[id],
    userReactions,
    onLongPress: handleLongPress,
  });

  return (
    <Box
      ref={salonRef}
      onClick={() => picker && setPicker(null)}
      sx={{
        width: 393, height: 874,
        bgcolor: c.navy,
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        borderRadius: { xs: 0, sm: "44px" },
        boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,0.45)" },
      }}
    >

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Box sx={{
        flexShrink: 0, px: "16px", pt: "56px", pb: "12px",
        borderBottom: "0.5px solid rgba(238,233,220,0.08)",
        display: "flex", alignItems: "flex-start", gap: "12px",
      }}>
        <Box sx={{ flexShrink: 0 }}>
          <Box component="img" src={room.image} alt="" sx={{
            width: 36, height: 48, objectFit: "cover",
            borderRadius: "4px", border: `1.5px solid ${c.gold}`, display: "block",
          }} />
          <Typography sx={{
            fontFamily: sans, fontSize: 8, color: c.gold,
            mt: "3px", lineHeight: "11px", maxWidth: 36,
          }}>
            {room.bookTitle}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontFamily: serif, fontWeight: 500, fontSize: 15, lineHeight: "20px", color: c.cream, mb: "3px" }}>
            Chapter 3 — A Short Rest
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: 12, color: "rgba(238,233,220,0.40)", lineHeight: "16px" }}>
            The Hobbit · 142 in the salon today
          </Typography>
        </Box>

        <Box onClick={onBack} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <IconBack />
        </Box>
      </Box>

      {/* ── Presence strip ──────────────────────────────────────────────── */}
      <Box sx={{
        flexShrink: 0, px: "16px", py: "10px",
        display: "flex", alignItems: "center", gap: "5px",
        borderBottom: "0.5px solid rgba(238,233,220,0.06)",
      }}>
        {PRESENCE_DOTS.map((d, i) => (
          <Box key={i} sx={{ width: d.size, height: d.size, borderRadius: "50%", bgcolor: d.color, opacity: d.opacity, flexShrink: 0 }} />
        ))}
        <Typography sx={{ fontFamily: sans, fontSize: 11, color: "rgba(238,233,220,0.40)", ml: "5px", whiteSpace: "nowrap" }}>
          +134 in the room
        </Typography>
      </Box>

      {/* ── Feed ────────────────────────────────────────────────────────── */}
      <Box ref={feedRef} sx={{
        flex: 1, overflowY: "auto", px: "16px", py: "16px",
        display: "flex", flexDirection: "column", gap: "16px",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}>

        <StorybotPost
          {...postProps("storybot-opening")}
          text="Tolkien lingers in Rivendell longer than the plot requires. What is this chapter doing that the quest can't?"
        />

        <UserPost
          {...postProps("mireille-1")}
          author="mireille_r" time="7:42am"
          text="It's the exhale before everything gets hard. Tolkien knew you needed to love the world before you could fear losing it."
          onMemberSelect={onMemberSelect}
        />

        <UserPost
          {...postProps("jakek-1")}
          author="jakek" time="9:11am"
          onMemberSelect={onMemberSelect}
          text="The silence before the elves sing completely stopped me."
          passage={
            <PassageCard
              chapter="ch. 3" timestamp="1:04:22"
              quote="...the valley was filled with their voices, and the night seemed more beautiful and more sad..."
              duration="0:38" playedRatio={0.5}
            />
          }
          replies={[
            { type: "user",     author: "sunli",     text: "the silence got me too" },
            { type: "user",     author: "ppolanski", text: "does anyone know if this song is based on a real elvish poem?" },
            { type: "storybot",                      text: "Yes — it's a version of a poem from the Silmarillion, written decades before The Hobbit." },
          ]}
        />

        <FeedDivider />

        <UserPost
          {...postProps("t-ashworth-1")}
          author="t_ashworth" time="10:33am"
          onMemberSelect={onMemberSelect}
          text="Bilbo doesn't want to leave. For the first time he actually doesn't want to leave."
          passage={
            <PassageCard
              chapter="ch. 3" timestamp="1:19:08"
              quote="He would gladly have stopped there forever and ever..."
              duration="0:22" playedRatio={0.65}
            />
          }
          replies={[
            { type: "user",     author: "mireille_r", text: "this is Tolkien writing from his own grief isn't it" },
            { type: "user",     author: "jakek",       text: "what was actually happening in his life when he wrote this?" },
            { type: "storybot",                        text: "He was writing this in the early 1930s, deeply homesick for a version of England he felt was vanishing. Rivendell isn't a fantasy place. It's an elegy." },
          ]}
        />

        <FeedDivider />

        <StorybotPost
          {...postProps("storybot-road")}
          passageFirst
          passage={
            <PassageCard
              chapter="ch. 3" timestamp="1:22:44"
              quote="The road goes ever on and on, down from the door where it began..."
              duration="0:44" playedRatio={0.42}
            />
          }
          text="This poem appears four times across The Hobbit and Lord of the Rings — each time with different emotional weight. This is the first. Notice how light it still feels here."
          replies={[
            { type: "user", author: "t_ashworth", text: "I had no idea it comes back" },
            { type: "user", author: "nwatts",     text: "does the meaning change each time or just the context?" },
          ]}
        />

        <FeedDivider />

        <UserPost
          {...postProps("ppolanski-1")}
          author="ppolanski" time="2:17pm"
          text="Asking StoryBot — if Tolkien was a devout Catholic, why is there no religion in Middle Earth?"
          directed
          onMemberSelect={onMemberSelect}
        />

        <StorybotPost
          {...postProps("storybot-religion")}
          text="Deliberately, yes — but not to exclude faith. He called it a 'fundamentally religious and Catholic work' but said the faith had to be absorbed into the story, not stated. Eru Ilúvatar is God. The Valar are angels."
          citation="Source: Tolkien's letters, 1953 — Letter 142 to Fr. Robert Murray"
          replies={[
            { type: "user", author: "mireille_r", text: "this completely changes how I'm hearing it" },
            { type: "user", author: "t_ashworth", text: "StoryBot citing a specific letter number is sending me" },
          ]}
        />

        {/* ── User chat & passage posts (appended newest-last) ─────────── */}
        {[
          ...chatPosts.map(cp => ({
            id: cp.id,
            ts: parseInt(cp.id.split("-")[1]),
            node: (
              <UserPost
                {...postProps(cp.id)}
                author="you" time="just now"
                text={cp.text}
                flash={cp.id === newPostId}
                onMemberSelect={onMemberSelect}
              />
            ),
          })),
          ...sharedPosts.map(sp => ({
            id: sp.id,
            ts: parseInt(sp.id.split("-")[1]),
            node: (
              <UserPost
                {...postProps(sp.id)}
                author="you" time="just now"
                text={sp.caption || undefined}
                onMemberSelect={onMemberSelect}
                passage={
                  <PassageCard
                    chapter="ch. 3" timestamp={sp.timestampRange}
                    quote={sp.excerpt}
                    duration={fmtTime(sp.playedRatio)}
                    playedRatio={0}
                  />
                }
              />
            ),
          })),
        ].sort((a, b) => a.ts - b.ts).map(({ id, node }) => (
          <Box key={id} sx={{
            "@keyframes fadeInPost": { from: { opacity: 0, transform: "translateY(6px)" }, to: { opacity: 1, transform: "translateY(0)" } },
            animation: "fadeInPost 0.35s ease forwards",
          }}>
            {node}
          </Box>
        ))}

        {/* ── Ask posts (directed questions + StoryBot answers) ────────── */}
        {askPosts.map(ap => (
          <Box
            key={ap.id}
            ref={(el: HTMLDivElement | null) => { askPostRefs.current[ap.id] = el; }}
            sx={{
              "@keyframes fadeInPost": { from: { opacity: 0, transform: "translateY(6px)" }, to: { opacity: 1, transform: "translateY(0)" } },
              animation: "fadeInPost 0.35s ease forwards",
            }}
          >
            <UserPost
              {...postProps(ap.id)}
              author="you"
              time="just now"
              directed
              text={ap.question}
              onMemberSelect={onMemberSelect}
              replies={ap.answered ? [{
                type: "storybot",
                text: "That's a great thread to pull on. Tolkien spent over 12 years building the mythology of Middle Earth before The Hobbit was published — which is why even a chapter like this one carries so much weight beneath the surface.",
              }] : undefined}
            />
          </Box>
        ))}

      </Box>

      {/* ── Compose bar ─────────────────────────────────────────────────── */}
      <Box sx={{
        flexShrink: 0,
        bgcolor: "#352a8c",
        borderTop: "1px solid rgba(106,96,191,0.4)",
        px: "15px", pt: "12px", pb: "20px",
        display: showPassageSheet || showAskSheet ? "none" : "flex", alignItems: "flex-start", gap: "8px",
      }}>
        {/* Auto-expanding textarea + send button */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <Box
            component="textarea"
            ref={composeRef}
            placeholder="Add to the salon..."
            value={composeText}
            onChange={handleComposeChange}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleComposeSubmit();
              }
            }}
            rows={1}
            sx={{
              width: "100%",
              bgcolor: "#0a005a",
              border: "1px solid #6a60bf",
              borderRadius: "16px",
              minHeight: "33px",
              pl: "14px",
              pr: composeText.trim() ? "38px" : "14px",
              py: "7px",
              fontFamily: sans, fontSize: 14, letterSpacing: "-0.5px",
              lineHeight: "19px",
              color: "#e8e6fc",
              outline: "none",
              resize: "none",
              overflow: "hidden",
              boxSizing: "border-box",
              display: "block",
              transition: "padding-right 0.15s ease",
              "&::placeholder": { color: "#6a60bf" },
              "&:focus": { border: "1px solid #9a90df" },
            }}
          />
          {/* Send button — appears when text is present */}
          <Box
            onClick={handleComposeSubmit}
            sx={{
              position: "absolute",
              right: "5px",
              top: "4px",
              width: 25, height: 25,
              borderRadius: "50%",
              bgcolor: "#6a60bf",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              opacity: composeText.trim() ? 1 : 0,
              pointerEvents: composeText.trim() ? "auto" : "none",
              transform: composeText.trim() ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 10.5V2.5M6.5 2.5L3 6M6.5 2.5L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
        </Box>
        {/* Quote button */}
        <Box
          onClick={e => { e.stopPropagation(); setShowPassageSheet(true); }}
          sx={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0, mt: "1px",
            bgcolor: "rgba(106,96,191,0.35)",
            border: "1px solid rgba(232,230,252,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <Typography sx={{ fontFamily: sans, fontSize: 14, color: "#e8e6fc", lineHeight: 1 }}>❝</Typography>
        </Box>
        {/* Ask button */}
        <Box
          onClick={e => { e.stopPropagation(); setShowAskSheet(true); }}
          sx={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0, mt: "1px",
            bgcolor: "rgba(232,230,252,0.12)",
            border: "1px solid rgba(232,230,252,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <Typography sx={{ fontFamily: sans, fontSize: 10, fontWeight: 500, color: "#e8e6fc", lineHeight: 1 }}>Ask</Typography>
        </Box>
      </Box>

      {/* ── Reaction picker ─────────────────────────────────────────────── */}
      {picker && <ReactionPicker picker={picker} onReact={handleReact} />}

      {/* ── Passage sheet backdrop ──────────────────────────────────────── */}
      {showPassageSheet && (
        <Box
          onClick={() => setShowPassageSheet(false)}
          sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.50)", zIndex: 59 }}
        />
      )}

      {/* ── Passage sheet ───────────────────────────────────────────────── */}
      <PassageSheet
        visible={showPassageSheet}
        room={room}
        onClose={() => setShowPassageSheet(false)}
        onShare={handleShare}
      />

      {/* ── Ask sheet backdrop ──────────────────────────────────────────── */}
      {showAskSheet && (
        <Box
          onClick={() => setShowAskSheet(false)}
          sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.50)", zIndex: 59 }}
        />
      )}

      {/* ── Ask sheet ───────────────────────────────────────────────────── */}
      <AskSheet
        visible={showAskSheet}
        onClose={() => setShowAskSheet(false)}
        onAsk={handleAsk}
      />

    </Box>
  );
}
