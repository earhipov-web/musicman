export type Plan = {
  id: "free" | "upgraded" | "ultimate";
  name: string;
  price: number;
  summary: string;
  includesFrom?: string;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    summary: "Listen to everything you already have, in one place.",
    features: [
      "Link all five streaming services",
      "Play any track from any linked service",
      "One search across every catalogue",
      "Your saved music in a single library",
    ],
    cta: "Start free",
  },
  {
    id: "upgraded",
    name: "Upgraded",
    price: 5.99,
    summary: "Let AI mix your whole collection into one endless station.",
    includesFrom: "Everything in Free, plus",
    features: [
      "Mix Radio: AI picks the next track from whichever service fits your taste best",
      "Playlists that mix tracks from different services",
      "Move playlists between services in one click",
      "Gapless playback and crossfade across services",
      "Synced lyrics wherever a service provides them",
      "Monthly taste report: your top artists, genres and listening hours across every service",
    ],
    cta: "Get Upgraded",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 11.99,
    summary: "For artists: release your own tracks everywhere at once.",
    includesFrom: "Everything in Upgraded, plus",
    features: [
      "Publish one track to every linked platform at once",
      "AI release check for metadata, artwork size and loudness",
      "Schedule releases to go live at the same minute everywhere",
      "Plays, likes and followers from every platform in one dashboard",
      "Priority support from a person, not a bot",
    ],
    cta: "Get Ultimate",
  },
];

export const formatPrice = (p: number) => (p === 0 ? "$0" : `$${p.toFixed(2)}`);
