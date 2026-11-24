export const site = {
  name: "Huy Vu Tran",
  handle: "Vuntra",
  role: "Software Engineer",
  location: "Hanoi, Vietnam",
  email: "vuhuytran188@gmail.com",
  description:
    "Frontend developer in Hanoi building production React and Next.js apps, real-time games and AI tools that run in the browser.",
  links: {
    linkedin: "https://www.linkedin.com/in/huyvutran/",
    github: "https://github.com/hvuuuu",
  },
} as const;

type ExternalUrl = `https://${string}`;

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavItem[];

export type ProjectId = "pablo" | "freefined" | "tarot-reader";

export type Project = {
  id: ProjectId;
  kicker: string;
  title: string;
  pitch: string;
  points: readonly string[];
  stack: readonly string[];
  live: { label: string; href: ExternalUrl };
  repo: ExternalUrl;
};

export const projects = [
  {
    id: "pablo",
    kicker: "Real-time multiplayer",
    title: "Pablo",
    pitch:
      "A memory card game for 2 to 6 players. Create a room, share its six-character code, and play in the browser.",
    points: [
      "The server owns the game: state lives in Upstash Redis, rooms expire after 24 hours",
      "API responses mask hidden cards and the draw pile per player",
      "Pusher Channels pushes room updates, so clients never poll",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Upstash Redis", "Pusher"],
    live: { label: "Play it live", href: "https://pablo-vuntra.vercel.app/" },
    repo: "https://github.com/hvuuuu/Pablo",
  },
  {
    id: "freefined",
    kicker: "AI in the browser",
    title: "FreeFined",
    pitch: "Background removal and upscaling that run entirely on your device. Your image never leaves the browser.",
    points: [
      "BiRefNet and Real-ESRGAN running on ONNX Runtime Web",
      "Picks WebGPU first, then falls back to WebGL and WASM",
      "Inference runs in Web Workers; models are cached with the Cache API and IndexedDB",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "ONNX Runtime Web", "Web Workers"],
    live: { label: "Try it live", href: "https://freefined.vercel.app" },
    repo: "https://github.com/hvuuuu/FreeFined",
  },
  {
    id: "tarot-reader",
    kicker: "LLM integration",
    title: "Tarot Reader",
    pitch:
      "AI-guided tarot readings in English and Vietnamese, across a full 78-card deck with 3-card and 5-card spreads.",
    points: [
      "Gemini through Firebase AI Logic and App Check, with no secrets in the client",
      "Streams the answer, can be cancelled, and falls back to a second model on rate limits",
      "Request logic, reducer and UI covered with Vitest",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Vitest"],
    live: { label: "Get a reading", href: "https://tarotreader-vuntra.vercel.app/" },
    repo: "https://github.com/hvuuuu/TarotReader",
  },
] as const satisfies readonly Project[];

export type Role = {
  period: string;
  company: string;
  title: string;
  summary: string;
};

export const roles = [
  {
    period: "2025 to 26",
    company: "Glis Games",
    title: "Frontend Developer",
    summary: "React, Next.js, TypeScript, shadcn/ui and custom hooks",
  },
  {
    period: "2025",
    company: "BMBSoft",
    title: "Frontend Developer",
    summary: "Zustand, Fluent UI and SCSS, working directly with clients",
  },
  {
    period: "2025",
    company: "FPT Software",
    title: "Frontend Developer Intern",
    summary: "Redux Toolkit, Ant Design and MUI, integrating REST APIs with the back-end team",
  },
] as const satisfies readonly Role[];

export const experienceNote =
  "Across these roles I built 10+ pages for a B2C e-commerce platform and a B2B construction marketplace, with role-based UI for contractors, suppliers and admins.";

export type MarqueeRow = readonly string[];

export const marquee = [
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Zustand"],
  ["Node.js", "Redis", "Firebase", "ONNX Runtime Web", "Vitest", "Docker"],
] as const satisfies readonly MarqueeRow[];

export type ToolkitGroup = {
  label: string;
  items: string;
};

export const toolkit = [
  { label: "Frontend", items: "React, Next.js, TypeScript, Tailwind CSS, SCSS" },
  { label: "State", items: "Redux Toolkit, Zustand, useReducer" },
  { label: "UI libraries", items: "shadcn/ui, Ant Design, MUI, Fluent UI" },
  { label: "Back end", items: "Node.js, Express, Next.js API routes, Redis, Firebase" },
  { label: "AI in the product", items: "Gemini via Firebase AI Logic, ONNX Runtime Web" },
  { label: "Testing and tools", items: "Vitest, Git, GitLab CI/CD, Docker, Claude Code" },
] as const satisfies readonly ToolkitGroup[];

export type Fact = {
  label: string;
  value: string;
};

export const facts = [
  { label: "Based in", value: "Hanoi, Vietnam" },
  { label: "Studied", value: "Computer Science, Swinburne" },
  { label: "English", value: "IELTS 6.5" },
] as const satisfies readonly Fact[];
