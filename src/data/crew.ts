export interface MemberStats {
  label: string;
  value: number; // 0 to 100
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
  bio: string;
  specialty: string;
  color: string; // CSS color
  gradient: string; // CSS gradient
  stats: MemberStats[];
}

export const crewMembers: CrewMember[] = [
  {
    id: "randelf",
    name: "Randelf",
    role: "Lead Catalyst // Logic Core",
    initials: "RF",
    quote: "Connected by chaos, powered by code.",
    bio: "Randelf keeps the system operating at peak efficiency. Equal parts strategic thinker and wildcard, he translates the group's chaotic energy into clean executions.",
    specialty: "Fullstack Architecture & Code Wizardry",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    stats: [
      { label: "Technical Logic", value: 95 },
      { label: "Chaos Factor", value: 85 },
      { label: "Coffee Level", value: 90 },
      { label: "Humor Index", value: 80 }
    ]
  },
  {
    id: "paola",
    name: "Paola",
    role: "Creative Director // Anchor",
    initials: "PL",
    quote: "Aesthetics aren't optional, they're essential.",
    bio: "Paola controls the creative pulse of the crew. She has a sharp eye for design and is the anchor who brings structure to the infinite ideas floating around.",
    specialty: "Art Direction & Aesthetic Integrity",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
    stats: [
      { label: "Creative Vision", value: 96 },
      { label: "Aesthetics", value: 98 },
      { label: "Patience", value: 80 },
      { label: "Sarcasm", value: 92 }
    ]
  },
  {
    id: "krishanna",
    name: "Krishanna",
    role: "Guardian Core // Voice of Reason",
    initials: "KS",
    quote: "Let's make sure we actually build this right.",
    bio: "Krishanna balances the crew's eccentric schemes with level-headed diplomacy. She holds the group together through organization, high empathy, and detailed execution plans.",
    specialty: "Project Integrity & Team Synchronization",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    stats: [
      { label: "Diplomacy", value: 95 },
      { label: "Organization", value: 90 },
      { label: "Vibe Quality", value: 92 },
      { label: "Reasoning", value: 94 }
    ]
  },
  {
    id: "francis",
    name: "Francis",
    role: "Architect Prime // Machine Architect",
    initials: "FC",
    quote: "If it's stupid and it works, it's not stupid.",
    bio: "Francis specializes in building out robust engines. He handles the raw components and loves tweaking systems until they perform exactly as designed.",
    specialty: "High-Performance Systems & Hardware Craft",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #164e63 0%, #06b6d4 100%)",
    stats: [
      { label: "System Dev", value: 94 },
      { label: "Coffee Intake", value: 95 },
      { label: "Troubleshooting", value: 88 },
      { label: "Execution Speed", value: 90 }
    ]
  },
  {
    id: "rheanne",
    name: "Rheanne",
    role: "PR Director // Trend Analyst",
    initials: "RN",
    quote: "Always ahead of the curve, never behind.",
    bio: "Rheanne has her finger on the pulse of everything new. She ensures the d1ggas crew is always styled perfectly and knows the exact vibes that match the occasion.",
    specialty: "Trendspotting & Communications Core",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)",
    stats: [
      { label: "Trend Sensing", value: 95 },
      { label: "Styling Logic", value: 94 },
      { label: "Network Effect", value: 90 },
      { label: "Social IQ", value: 92 }
    ]
  },
  {
    id: "ayeisha",
    name: "Ayeisha",
    role: "Chief Storyteller // Visual Archivist",
    initials: "AS",
    quote: "Capturing the frame before it fades.",
    bio: "Ayeisha makes sure the memories aren't just lived, but recorded. She acts as the group's chief archiver, documenting all highlights with sharp lenses and aesthetic angles.",
    specialty: "Visual Composition & Storytelling",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
    stats: [
      { label: "Photography", value: 96 },
      { label: "Vibe Sensing", value: 92 },
      { label: "Memory Capture", value: 98 },
      { label: "Visual Curation", value: 90 }
    ]
  },
  {
    id: "xian",
    name: "Xian",
    role: "Operations Command // Enforcer",
    initials: "XN",
    quote: "Plans are nothing; planning is everything.",
    bio: "Xian operates behind the scenes to make sure projects and trips go smoothly. He excels at coordination, handling logistics, and maintaining group momentum.",
    specialty: "Strategic Logistics & Group Synchronization",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    stats: [
      { label: "Strategy & Ops", value: 92 },
      { label: "Logistics Flow", value: 94 },
      { label: "Execution", value: 90 },
      { label: "Composure", value: 95 }
    ]
  },
  {
    id: "jeremy",
    name: "Jeremy",
    role: "Hype Dynamo // Wildcard Factor",
    initials: "JM",
    quote: "Why stand still when we can fly?",
    bio: "Jeremy brings infinite energy to the table. An adventurer who thrives on spontaneity, he is the fuel that powers the crew's legendary outings and memorable ideas.",
    specialty: "Extreme Enthusiasm & Vibe Multiplication",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)",
    stats: [
      { label: "Energy Level", value: 99 },
      { label: "Reflex Quotient", value: 92 },
      { label: "Risk Appetite", value: 95 },
      { label: "Social Drive", value: 94 }
    ]
  }
];
