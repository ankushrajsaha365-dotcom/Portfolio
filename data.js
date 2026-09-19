// ============================================================
// data.js — Portfolio Content
// Edit this file to update any content without touching layout.
// ============================================================

export const meta = {
  name: "Ankush Raj Saha",
  initials: "ARS",
  title: "AI-ML Engineer",
  tagline:
    "Don't be shy to admit your mistakes, learn from them!",
  email: "ankushrajsaha365@gmail.com",
  footerCopy: "© 2026 Ankush Raj Saha. All Good to go.",
  footerStack: "Coding is fun"
};

// ============================================================
// PROJECTS
// Each project drives both the card on the home page AND the
// detail drawer. Add a new object here to add a new project.
// ============================================================
export const projects = [
  // ──────────────────────────────────────────────────────────
  // 1. COLLEGE PLANNER
  // Source: github.com/ankushrajsaha365-dotcom/college_planner
  // ──────────────────────────────────────────────────────────
  {
    id: "college-planner",
    title: "College Planner",
    status: "LIVE",
    statusColor: "secondary",
    browserUrl: "college-planner-lyart.vercel.app",
    metric: "REACT 19",
    metricColor: "primary-container",
    description:
      "A modern, fast college planning dashboard built with React and Vite, with browser-side data storage via Dexie.",
    tags: [
      { label: "React 19", color: "primary" },
      { label: "Vite", color: "primary-fixed-dim" },
      { label: "Dexie / IndexedDB", color: "on-surface-variant" },
      { label: "Vercel", color: "secondary" },
    ],
    githubUrl: "https://github.com/ankushrajsaha365-dotcom/college_planner",
    liveUrl: "https://college-planner-lyart.vercel.app",
    // ✏️ EDIT: replace with a real screenshot, e.g. "assets/college-planner-1.png"
    previewImage:
      "https://opengraph.githubassets.com/b57c7fd78ca8be386f36d821f978bdb75577f4923ec16dfd139bcfe3936ceb28/ankushrajsaha365-dotcom/college_planner",
    detail: {
      badge: "LIVE ON VERCEL",
      // ✏️ EDIT: add your real build time, e.g. "3-Week Build"
      duration: "Self-Directed Build",
      location: "PERSONAL PROJECT",
      fullTitle: "College Planner — Planning Dashboard",
      // ✏️ EDIT: adjust if your role differs
      role: "Frontend Developer",
      fullDescription:
        "A modern, fast college planning dashboard built with React 19 and Vite. It uses Dexie (an IndexedDB wrapper) for browser-side storage and is deployed on Vercel as a live demo.",
      // ✏️ EDIT: add more screenshots — first image is the main view
      images: [
        {
          src: "https://opengraph.githubassets.com/b57c7fd78ca8be386f36d821f978bdb75577f4923ec16dfd139bcfe3936ceb28/ankushrajsaha365-dotcom/college_planner",
          label: "OVERVIEW",
          alt: "College Planner project preview",
        },
      ],
      engineBadge: "React 19 · Vite 8 · Dexie",
      githubUrl: "https://github.com/ankushrajsaha365-dotcom/college_planner",
      githubRepo: "ankushrajsaha365-dotcom/college_planner",
      githubStars: "0",
      liveUrl: "https://college-planner-lyart.vercel.app",
      liveLabel: "Open Live App",
      liveSub: "Hosted on Vercel",
      metrics: [
        { value: "React 19", label: "UI Runtime", color: "primary" },
        { value: "Vite 8", label: "Build Tooling", color: "secondary" },
        { value: "IndexedDB", label: "Dexie Storage Layer", color: "primary-container" },
      ],
      // ✏️ EDIT: these three blocks are drafts based on the repo. Rewrite in your own words.
      narrative: {
        problem: {
          title: "Scattered College Planning",
          body: "Classes, deadlines, and plans usually end up spread across notes apps, chats, and spreadsheets, with no single view of what needs attention.",
        },
        solution: {
          title: "React + Vite Dashboard",
          body: "Built a single-page planning dashboard in React 19 on a lightweight Vite toolchain, with Dexie handling structured storage in the browser so no backend is required.",
        },
        outcome: {
          title: "Live & Shareable",
          body: "Deployed to Vercel as a live demo anyone can open, with a simple local setup: clone, npm install, npm run dev.",
        },
      },
      stack: ["React 19", "Vite", "Dexie", "IndexedDB", "Lucide Icons", "Vitest", "oxlint", "Vercel"],
      features: [
        {
          icon: "dashboard",
          title: "Planning Dashboard",
          body: "A fast, modern dashboard that brings college planning into one place.",
        },
        {
          icon: "database",
          title: "Browser-Side Storage",
          body: "Dexie wraps IndexedDB for structured, persistent data that lives in the browser.",
        },
        {
          icon: "bolt",
          title: "Vite-Powered Speed",
          body: "Instant dev server startup and optimized production bundles from Vite.",
        },
        {
          icon: "rule",
          title: "Tested & Linted Toolchain",
          body: "Vitest and oxlint are wired into the project to keep the codebase reliable and clean.",
        },
      ],
      whitepaperUrl: "https://github.com/ankushrajsaha365-dotcom/college_planner#readme",
      inquireUrl: "#connect",
    },
  },

  // ──────────────────────────────────────────────────────────
  // 2. TRAVELFRIEND
  // Source: github.com/ankushrajsaha365-dotcom/TravelFriend
  // ──────────────────────────────────────────────────────────
  {
    id: "travel-friend",
    title: "TravelFriend",
    status: "AI-POWERED",
    statusColor: "primary-fixed-dim",
    browserUrl: "travel-friend-omega.vercel.app",
    metric: "GEMINI AI",
    metricColor: "secondary",
    description:
      "An AI travel companion built with React, TypeScript, and an Express server that connects to the Google Gemini API.",
    tags: [
      { label: "React 19", color: "primary" },
      { label: "TypeScript", color: "primary-fixed-dim" },
      { label: "Gemini API", color: "on-surface-variant" },
      { label: "Tailwind 4", color: "secondary" },
    ],
    githubUrl: "https://github.com/ankushrajsaha365-dotcom/TravelFriend",
    liveUrl: "https://travel-friend-omega.vercel.app",
    // ✏️ EDIT: replace with a real screenshot, e.g. "assets/travelfriend-1.png"
    previewImage:
      "https://opengraph.githubassets.com/f081eb8275b6745e353c8aa420431c122bdfb0794d7e12cb4e1cf4fe3ca14b0b/ankushrajsaha365-dotcom/TravelFriend",
    detail: {
      badge: "LIVE ON VERCEL",
      // ✏️ EDIT: add your real build time
      duration: "Self-Directed Build",
      location: "PERSONAL PROJECT",
      fullTitle: "TravelFriend — AI Travel Companion",
      // ✏️ EDIT: adjust if your role differs
      role: "Full-Stack Developer",
      fullDescription:
        "A full-stack TypeScript app pairing a React 19 front end (Vite, Tailwind CSS 4, Motion) with an Express server and the Google GenAI SDK to bring AI assistance to travel planning.",
      // ✏️ EDIT: add more screenshots — first image is the main view
      images: [
        {
          src: "https://opengraph.githubassets.com/f081eb8275b6745e353c8aa420431c122bdfb0794d7e12cb4e1cf4fe3ca14b0b/ankushrajsaha365-dotcom/TravelFriend",
          label: "OVERVIEW",
          alt: "TravelFriend project preview",
        },
      ],
      engineBadge: "Gemini API · Express · Tailwind 4",
      githubUrl: "https://github.com/ankushrajsaha365-dotcom/TravelFriend",
      githubRepo: "ankushrajsaha365-dotcom/TravelFriend",
      githubStars: "0",
      liveUrl: "https://travel-friend-omega.vercel.app",
      liveLabel: "Launch TravelFriend",
      liveSub: "Live on Vercel",
      metrics: [
        { value: "Gemini", label: "AI Engine", color: "primary" },
        { value: "React 19", label: "Front-End", color: "secondary" },
        { value: "100% TS", label: "Typed Codebase", color: "primary-container" },
      ],
      // ✏️ EDIT: these three blocks are drafts based on the repo. Rewrite in your own words.
      narrative: {
        problem: {
          title: "Trip Planning Overload",
          body: "Planning a trip means bouncing between blogs, maps, and chat threads to piece together ideas and answers.",
        },
        solution: {
          title: "Gemini-Powered Assistant",
          body: "Built a React 19 + TypeScript front end with an Express server (server.ts) and the Google GenAI SDK, so travel questions get AI-generated answers in one interface.",
        },
        outcome: {
          title: "Live AI Travel Companion",
          body: "Shipped to Vercel as a working demo with a polished Tailwind CSS 4 interface and smooth Motion-driven animations.",
        },
      },
      stack: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS 4",
        "Express",
        "Google GenAI SDK",
        "Motion",
        "Vercel",
      ],
      features: [
        {
          icon: "auto_awesome",
          title: "Gemini AI Integration",
          body: "Uses the Google GenAI SDK to generate travel help on demand.",
        },
        {
          icon: "dns",
          title: "Full-Stack TypeScript",
          body: "Vite front end plus an Express server in TypeScript, with a build script that bundles both for production.",
        },
        {
          icon: "palette",
          title: "Tailwind 4 Component Styling",
          body: "Styled with Tailwind CSS 4, class-variance-authority, and tailwind-merge for a consistent, reusable UI.",
        },
        {
          icon: "animation",
          title: "Fluid Motion",
          body: "Smooth transitions and micro-interactions powered by the Motion library.",
        },
      ],
      whitepaperUrl: "https://github.com/ankushrajsaha365-dotcom/TravelFriend#readme",
      inquireUrl: "#connect",
    },
  },

  // ──────────────────────────────────────────────────────────
  // 3. EDUCONNECT
  // Source: github.com/ankushrajsaha365-dotcom/Edu_connect_demo
  // ──────────────────────────────────────────────────────────
  {
    id: "edu-connect",
    title: "EduConnect",
    status: "PROTOTYPE",
    statusColor: "primary-fixed",
    browserUrl: "ankursa167.xyz",
    metric: "3 ROLES",
    metricColor: "primary-container",
    description:
      "Learn. Teach. Earn. A role-based education platform where students learn, teachers teach, and qualified students earn through part-time teaching.",
    tags: [
      { label: "HTML5", color: "primary" },
      { label: "CSS3", color: "primary-fixed-dim" },
      { label: "Vanilla JS", color: "on-surface-variant" },
      { label: "Role-Based Access", color: "secondary" },
    ],
    githubUrl: "https://github.com/ankushrajsaha365-dotcom/Edu_connect_demo",
    liveUrl: "http://www.ankursa167.xyz/",
    // ✏️ EDIT: replace with a real screenshot, e.g. "assets/educonnect-1.png"
    previewImage:
      "https://opengraph.githubassets.com/a53a27ca06f319831c4c21af4ed83cbd17b03f2af25971c42e53f39b676470d8/ankushrajsaha365-dotcom/Edu_connect_demo",
    detail: {
      badge: "FRONTEND PROTOTYPE",
      // ✏️ EDIT: add your real build time (repo has 26 commits)
      duration: "Iterated Over 26 Commits",
      location: "PERSONAL PROJECT",
      fullTitle: "EduConnect — Role-Based Education Platform",
      role: "Frontend Developer",
      fullDescription:
        "A role-based frontend prototype of an education platform built in pure HTML, CSS, and JavaScript. It focuses on clean UI, page-level access control, and realistic platform behavior, with a structure that is ready for a backend API.",
      // ✏️ EDIT: add more screenshots (dashboard, classes, earnings...)
      images: [
        {
          src: "https://opengraph.githubassets.com/a53a27ca06f319831c4c21af4ed83cbd17b03f2af25971c42e53f39b676470d8/ankushrajsaha365-dotcom/Edu_connect_demo",
          label: "OVERVIEW",
          alt: "EduConnect project preview",
        },
      ],
      engineBadge: "Vanilla JS · Role-Based Access",
      githubUrl: "https://github.com/ankushrajsaha365-dotcom/Edu_connect_demo",
      githubRepo: "ankushrajsaha365-dotcom/Edu_connect_demo",
      githubStars: "0",
      liveUrl: "http://www.ankursa167.xyz/",
      liveLabel: "Open Live Demo",
      liveSub: "Role-Based Prototype",
      metrics: [
        { value: "3", label: "User Roles", color: "primary" },
        { value: "10+", label: "HTML Pages", color: "secondary" },
        { value: "0", label: "Frameworks Used", color: "primary-container" },
      ],
      narrative: {
        problem: {
          title: "Learners Can't Earn While Learning",
          body: "Most education platforms keep students and teachers in separate worlds, leaving qualified students no path to teach juniors and earn from it.",
        },
        solution: {
          title: "Role-Based Vanilla Platform",
          body: "Built a multi-page prototype in pure HTML, CSS, and JavaScript with role-based dashboards, page-level route protection, and sessions simulated through localStorage.",
        },
        outcome: {
          title: "Backend-Ready Prototype",
          body: "Delivered a complete frontend covering student, teacher, and part-time teacher flows, structured so a real API can be plugged in later.",
        },
      },
      stack: ["HTML5", "CSS3", "JavaScript (Vanilla)", "localStorage", "Role-Based Routing"],
      features: [
        {
          icon: "admin_panel_settings",
          title: "Role-Based Access Control",
          body: "Dashboard modules show or hide by role, and direct URL access is blocked for unauthorized roles.",
        },
        {
          icon: "school",
          title: "Complete Learning Workflows",
          body: "Students attend virtual classes, submit assignments, ask doubts, and view grades, while teachers manage classes and resolve doubts.",
        },
        {
          icon: "payments",
          title: "Part-Time Teaching & Earnings",
          body: "Qualified students can teach juniors, solve doubts, and track what they earn.",
        },
        {
          icon: "accessibility_new",
          title: "Accessible Design",
          body: "Keyboard navigation, high-contrast colors, and a simple, readable layout.",
        },
      ],
      whitepaperUrl: "https://github.com/ankushrajsaha365-dotcom/Edu_connect_demo#readme",
      inquireUrl: "#connect",
    },
  },
];

// ============================================================
// SKILLS
// Source: GitHub profile README + dependencies used in my repos.
// Items marked "(learning)" are ones I'm currently picking up.
// ============================================================
export const skills = [
  {
    category: "Languages",
    icon: "code",
    iconColor: "primary-container",
    count: "7 LANGUAGES",
    description:
      "The languages I build with every day, plus the ones I'm currently learning to strengthen my fundamentals.",
    items: [
      { label: "Python", dot: "primary-container" },
      { label: "C", dot: "primary-container" },
      { label: "JavaScript", dot: "primary-container" },
      { label: "TypeScript", dot: "primary-container" },
      { label: "HTML5 / CSS3", dot: "primary-container" },
      { label: "C++ (learning)", dot: "outline" },
      { label: "Java (learning)", dot: "outline" },
    ],
    hoverColor: "primary-container",
  },
  {
    category: "Frameworks & Libs",
    icon: "layers",
    iconColor: "secondary",
    count: "7 LIBRARIES",
    description:
      "Frameworks and libraries I've used across my projects, from React interfaces to Gemini-powered features.",
    items: [
      { label: "React", dot: "secondary" },
      { label: "Node.js", dot: "secondary" },
      { label: "Express", dot: "secondary" },
      { label: "Tailwind CSS", dot: "primary-container" },
      { label: "Google GenAI SDK (Gemini)", dot: "secondary" },
      { label: "Dexie.js (IndexedDB)", dot: "primary-container" },
      { label: "Motion", dot: "primary-container" },
    ],
    hoverColor: "secondary",
  },
  {
    category: "Tools & Infra",
    icon: "deployed_code",
    iconColor: "primary-fixed-dim",
    count: "7 TOOLS",
    description:
      "The tooling I use to build, test, and ship my projects.",
    items: [
      { label: "Git / GitHub", dot: "primary-fixed-dim" },
      { label: "Vercel", dot: "primary-fixed-dim" },
      { label: "Vite", dot: "primary-fixed-dim" },
      { label: "npm", dot: "primary-fixed-dim" },
      { label: "Vitest", dot: "primary-container" },
      { label: "GitHub Actions", dot: "secondary" },
      { label: "Google AI Studio", dot: "secondary" },
    ],
    hoverColor: "primary-fixed-dim",
  },
];

// ============================================================
// TOPICS / FAVOURITE TOPICS
// ============================================================
export const topics = [
  {
    icon: "psychology",
    iconColor: "primary-container",
    accentColor: "primary-container",
    title: "AI & Machine Learning",
    body: "Exploring how LLMs and machine learning can power practical everyday products, like the Gemini-powered assistant in TravelFriend.",
    fieldSpec: "FIELD SPEC 01",
  },
  {
    icon: "school",
    iconColor: "secondary",
    accentColor: "secondary",
    title: "EdTech",
    body: "Interested in platforms that make learning accessible and let students grow into teachers, the idea behind EduConnect: Learn. Teach. Earn.",
    fieldSpec: "FIELD SPEC 02",
  },
  {
    icon: "touch_app",
    iconColor: "primary-fixed-dim",
    accentColor: "primary-fixed-dim",
    title: "Clean, Accessible Interfaces",
    body: "I enjoy fast, readable, keyboard-friendly web interfaces built with React and Tailwind, where good design makes the tool easier to use.",
    fieldSpec: "FIELD SPEC 03",
  },
  {
    icon: "terminal",
    iconColor: "on-surface-variant",
    accentColor: "on-surface-variant",
    title: "Core CS Fundamentals",
    body: "Sharpening my basics in C and Python while learning C++ and Java, because strong fundamentals power everything else I build.",
    fieldSpec: "FIELD SPEC 04",
  },
];

// ============================================================
// CERTIFICATES
// ✏️ EDIT: Add your real certificates here. Each entry looks like:
//
//   {
//     icon: "workspace_premium",
//     iconColor: "primary-container",
//     title: "Your Certificate Name",
//     issuer: "Issuing Organization",
//     issued: "Mon YYYY",
//     expires: "Lifetime",            // or "Mon YYYY"
//     credentialId: "YOUR-ID",
//     status: "Active",
//     verifyUrl: "https://link-to-verify-your-certificate",
//     previewImageUrl: "assets/certificates/your-cert.png",
//   },
// ============================================================
export const certificates = [];

// ============================================================
// SOCIAL / CONTACT LINKS
// ✏️ ADD more when ready, e.g.:
//   { label: "X (Twitter)", icon: "tag", iconColor: "primary-fixed-dim", url: "https://x.com/your-handle" },
// ============================================================
export const social = [
  { label: "GitHub", icon: "code", iconColor: "primary", url: "https://github.com/ankushrajsaha365-dotcom" },
  { label: "LinkedIn", icon: "badge", iconColor: "secondary", url: "https://www.linkedin.com/in/ankush-raj-saha-365x/" },
  { label: "Email", icon: "mail", iconColor: "primary-container", url: "mailto:ankushrajsaha365@gmail.com" },
];