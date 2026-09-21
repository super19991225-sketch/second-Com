export type CaseStudy = {
  slug: string;
  category: string;
  label: string;
  title: string;
  description: string;
  challenge: string;
  approach: readonly string[];
  tags: readonly string[];
  outcome: string;
  image: string;
  imageAlt: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "technical-knowledge-assistant",
    category: "AI / ML System",
    label: "Selected Project",
    title: "Technical Knowledge Assistant",
    description:
      "A retrieval-augmented AI assistant for finding trusted technical information, summarizing documents, and answering questions with source-grounded context.",
    challenge:
      "Technical teams needed faster access to trusted documentation without losing the source context behind each answer. Search alone was too noisy, and generic chat tools could not be relied on for support-quality responses.",
    approach: [
      "Indexed curated technical documents into a retrieval layer with clear source attribution.",
      "Designed answer flows that summarize findings while keeping citations visible and reviewable.",
      "Scoped the assistant to support workflows so responses stayed practical and grounded.",
      "Added evaluation checks for relevance, grounding, and answer consistency before wider use.",
    ],
    tags: ["RAG", "Technical Documents", "Source-Grounded Answers", "Support"],
    outcome: "Faster knowledge access and more consistent technical support.",
    image: "/images/case-knowledge-ui.png?v=light",
    imageAlt: "Amber and purple knowledge graph on a warm cream canvas",
  },
  {
    slug: "ai-enabled-workflow-platform",
    category: "Web Platform",
    label: "Selected Project",
    title: "AI-Enabled Workflow Platform",
    description:
      "A secure operational platform combining dashboards, workflow automation, API integrations, role-based access, and AI-assisted decision support.",
    challenge:
      "Operational work was spread across dashboards, manual handoffs, and disconnected APIs. Teams needed one place to monitor activity, automate routine steps, and apply AI assistance without weakening access control.",
    approach: [
      "Mapped core operational workflows and the systems each step depended on.",
      "Built a secure web platform with role-based access, dashboards, and API integrations.",
      "Added automation for repetitive handoffs while keeping human review where decisions mattered.",
      "Introduced AI-assisted decision support inside the same operational surface, not as a separate tool.",
    ],
    tags: ["Dashboards", "Automation", "APIs", "Access Control"],
    outcome: "Reduced manual work and improved operational visibility.",
    image: "/images/case-workflow-ui.png?v=light",
    imageAlt: "Blue-to-orange workflow pipeline of geometric nodes on a light canvas",
  },
  {
    slug: "simulation-intelligence-prototype",
    category: "Scientific AI",
    label: "Selected Project",
    title: "Simulation Intelligence Prototype",
    description:
      "An interactive prototype for organizing simulation outputs, detecting patterns, and exploring complex scientific and engineering data.",
    challenge:
      "Simulation outputs were rich but hard to explore. Researchers needed a faster way to organize results, spot patterns, and move from raw runs to usable scientific insight.",
    approach: [
      "Structured simulation outputs into an interactive exploration surface for scientific and engineering data.",
      "Added pattern-detection views that helped teams scan across runs instead of inspecting files one by one.",
      "Kept the prototype focused on research workflows: organize, compare, and investigate.",
      "Designed the interface so complex visual results stayed readable without hiding underlying detail.",
    ],
    tags: ["Simulation", "Pattern Detection", "Research", "Exploration"],
    outcome: "Faster analysis of scientific and engineering results.",
    image: "/images/case-sim-ui.png?v=light",
    imageAlt:
      "Scientific visualization of particle simulations, heatmaps, and waveforms on a light canvas",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
