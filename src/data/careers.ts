import { company } from "./site";

export const applicationsEmail = company.email;

export const openRoles = [
  {
    id: "senior-web-app-engineer",
    title: "Senior Web App Engineer",
    team: "Product Engineering",
    location: "Remote / Los Angeles",
    type: "Full-time",
    summary:
      "Lead the web applications, dashboards, and APIs that carry GenixaLab LLC models into real team workflows.",
    focus: [
      "Design and ship secure, maintainable web apps and internal tools.",
      "Build the interfaces and APIs around AI and scientific systems.",
      "Own performance, access, and reliability for products in active use.",
      "Partner with model and data leads so the software matches the problem.",
    ],
    image: "/images/ticket-web-smart.png",
    alt: "Product laptop and phone on a development desk",
    chips: ["Web apps", "APIs", "Dashboards", "React"],
    icon: "globe" as const,
  },
  {
    id: "physicist-physics-ai",
    title: "Physicist — Physics AI Model",
    team: "Scientific AI",
    location: "Remote / Los Angeles",
    type: "Full-time",
    summary:
      "Guide physics-informed AI models with domain judgment: constraints, simulations, evaluation, and expert review.",
    focus: [
      "Define the physical problem, constraints, and success criteria for each model.",
      "Work with engineers on physics-informed learning, simulation data, and sensor inputs.",
      "Review model outputs against known physical behavior and experiments.",
      "Keep evaluation and documentation clear for research and engineering partners.",
    ],
    image: "/images/ticket-physics-smart.png?v=distinct",
    alt: "Professionals reviewing physics simulations on a monitor",
    chips: ["Physics", "Simulations", "Constraints", "Evaluation"],
    icon: "scientific" as const,
  },
  {
    id: "senior-data-analyst",
    title: "Senior Data Analyst",
    team: "Data & Insight",
    location: "Remote / Los Angeles",
    type: "Full-time",
    summary:
      "Turn research, product, and operational data into clear analysis that guides model work and delivery decisions.",
    focus: [
      "Structure experimental, product, and operational datasets for reliable analysis.",
      "Build reporting and exploration surfaces that teams can trust and reuse.",
      "Spot patterns, anomalies, and gaps before they become delivery risks.",
      "Partner with engineering and scientific leads on what the numbers actually mean.",
    ],
    image: "/images/team-group.png?v=safe",
    alt: "Four colleagues collaborating around laptops in a shared discussion",
    chips: ["Analysis", "Reporting", "Discussion", "Insight"],
    icon: "chart" as const,
  },
] as const;

export const careerFocus = [
  {
    title: "Scientific Models",
    body: "Work on mathematical reasoning, physics-informed systems, and research data tools with clear evaluation.",
    image: "/images/ticket-math-smart.png?v=ots2",
    alt: "Over-the-shoulder view of three people coding at a library table",
    chips: ["Math", "Physics", "Research"],
    icon: "scientific" as const,
  },
  {
    title: "Applied Machine Learning",
    body: "Build LLM applications, RAG systems, agents, and predictive models that a real team can run.",
    image: "/images/ticket-aiml-smart.png",
    alt: "AI model training desk with monitors",
    chips: ["LLM", "RAG", "Agents"],
    icon: "brain" as const,
  },
  {
    title: "Product Engineering",
    body: "Ship the web products, APIs, and interfaces that carry the models into daily work.",
    image: "/images/ticket-web-smart.png",
    alt: "Product laptop and phone on a development desk",
    chips: ["Web", "APIs", "UX"],
    icon: "globe" as const,
  },
  {
    title: "Training & Handoff",
    body: "Design the programs that leave a client team able to keep and improve the system.",
    image: "/images/ticket-training-smart.png",
    alt: "Training notebook and lesson laptop",
    chips: ["Teaching", "Practice", "Handoff"],
    icon: "training" as const,
  },
] as const;

export const hiringSteps = [
  {
    n: "01",
    title: "Apply online",
    body: "Choose a role, share your background, and tell us what you want to work on next.",
    image: "/images/hire-apply.png?v=cast3",
    alt: "A candidate completing an online job application on a laptop",
    chips: ["Role", "Background", "Note"],
    icon: "search" as const,
  },
  {
    n: "02",
    title: "We review your note",
    body: "We read your examples against the role brief and reply with a clear yes, no, or follow-up question.",
    image: "/images/hire-review.png?v=cast3",
    alt: "Two different studio reviewers reading a candidate application together",
    chips: ["Resume", "Examples", "Reply"],
    icon: "book" as const,
  },
  {
    n: "03",
    title: "Talk through the work",
    body: "If there is a fit, we discuss a real problem, your approach, and how you prefer to collaborate — all online.",
    image: "/images/hire-talk.png?v=cast3",
    alt: "A candidate in a remote video interview discussing a real problem",
    chips: ["Problem", "Approach", "Online"],
    icon: "about" as const,
  },
  {
    n: "04",
    title: "A short working session",
    body: "We spend focused time online on a real slice of work together so both sides can see how the collaboration feels.",
    image: "/images/hire-session.png?v=cast3",
    alt: "A candidate pairing online with an engineer over a shared editor",
    chips: ["Work sample", "Remote", "Fit"],
    icon: "spark" as const,
  },
  {
    n: "05",
    title: "Agree final terms",
    body: "We align on scope, cadence, and expectations so both sides know what the engagement is.",
    image: "/images/hire-terms.png?v=cast3",
    alt: "A candidate agreeing hiring terms on a video call",
    chips: ["Scope", "Cadence", "Expectations"],
    icon: "terms" as const,
  },
  {
    n: "06",
    title: "Start with clear work",
    body: "You begin with defined first work, shared context, and room for the craft the problem requires.",
    image: "/images/hire-start.png?v=cast3",
    alt: "A new teammate starting defined first work with a project brief on screen",
    chips: ["First work", "Context", "Craft"],
    icon: "rocket" as const,
  },
] as const;

export function getOpenRole(id: string) {
  return openRoles.find((role) => role.id === id);
}
