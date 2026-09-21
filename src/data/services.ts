export const services = [
  {
    id: "ai-ml",
    title: "AI/ML Engineering",
    description:
      "Design, train, evaluate, deploy, and improve machine-learning systems, LLM applications, RAG platforms, AI agents, computer vision systems, and predictive models.",
    challenge:
      "A model demo is not a product. Teams need systems that can be trained, evaluated, deployed, and improved without losing the problem they were built to solve.",
    approach: [
      "Define the task, the data, and the decision the model is meant to support.",
      "Build LLM applications, RAG platforms, agents, vision systems, or predictive models around that task.",
      "Evaluate quality before deployment, then keep a path for later improvement.",
      "Hand the system to the team that will run it, not only the people who trained it.",
    ],
    icon: "brain",
    image: "/images/ticket-aiml-smart.png",
    alt: "Multi-monitor AI model training desk with coffee and a water bottle",
    contents: ["LLM applications", "RAG platforms", "Computer vision", "Predictive models"],
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Build fast, secure, scalable web applications, SaaS products, dashboards, APIs, internal tools, and AI-enabled customer experiences.",
    challenge:
      "Useful software has to be fast, secure, and clear to the people who use it. A dashboard or API that cannot be maintained does not stay useful.",
    approach: [
      "Scope the product around the workflow, not a generic platform.",
      "Build SaaS products, dashboards, APIs, and internal tools that fit that workflow.",
      "Keep access, performance, and security part of the build, not a later pass.",
      "Leave the product ready for the team that will operate it.",
    ],
    icon: "globe",
    image: "/images/ticket-web-smart.png",
    alt: "Product laptop, phone, coffee, and a water bottle on a development desk",
    contents: ["SaaS products", "Dashboards", "APIs", "Internal tools"],
  },
  {
    id: "training",
    title: "AI Training",
    description:
      "Deliver tailored, hands-on programs that help technical and business teams understand, evaluate, build, and use AI responsibly.",
    challenge:
      "A general AI course rarely matches a team’s tools, data, or roles. People need practice on the work they already do.",
    approach: [
      "Start from the roles in the room: engineers, analysts, product, and leadership.",
      "Use the team’s tools, data, and workflows as the training material.",
      "Practice evaluation and responsible use, not only model concepts.",
      "Leave a path the team can repeat after the sessions end.",
    ],
    icon: "graduation",
    image: "/images/ticket-training-smart.png",
    alt: "Training notebook, lesson laptop, coffee, and a water bottle",
    contents: ["Engineers", "Analysts", "Product teams", "Leadership"],
  },
  {
    id: "scientific",
    title: "Mathematics & Physics AI",
    description:
      "Develop specialist AI tools for mathematical reasoning, symbolic workflows, scientific computing, simulation analysis, and physics-based research.",
    challenge:
      "General models are a poor fit for equations, simulations, and physical constraints. The tool has to respect the domain, not only the text around it.",
    approach: [
      "Work from the mathematical or physical problem, not a generic chat interface.",
      "Support symbolic reasoning, scientific computing, and simulation analysis.",
      "Keep evaluation tied to domain examples and expert review.",
      "Connect the result to the research or engineering workflow that will use it.",
    ],
    icon: "atom",
    image: "/images/ticket-math-smart.png?v=gaze",
    alt: "Four researchers looking at mathematical proofs on their own laptop screens",
    contents: ["Symbolic reasoning", "Simulations", "Scientific computing", "Research tools"],
  },
  {
    id: "mlops",
    title: "Data Engineering & MLOps",
    description:
      "Create dependable data pipelines, model-serving infrastructure, observability, evaluation workflows, governance, and deployment systems.",
    challenge:
      "A model that cannot be served, observed, or governed does not stay in production. Data and deployment have to be as deliberate as the model itself.",
    approach: [
      "Map the data path from source to the decision the model supports.",
      "Build pipelines, serving, and deployment that a team can operate.",
      "Add observability, evaluation, and governance so quality stays visible.",
      "Keep the system maintainable after the first release.",
    ],
    icon: "database",
    image: "/images/ticket-mlops-smart.png",
    alt: "Pipeline dashboards, coffee, and a water bottle on an operations desk",
    contents: ["Data pipelines", "Model serving", "Observability", "Governance"],
  },
  {
    id: "strategy",
    title: "AI Strategy & Consulting",
    description:
      "Turn promising AI ideas into a practical roadmap through use-case discovery, architecture planning, prototyping, risk assessment, and delivery guidance.",
    challenge:
      "An AI idea is not a plan. Teams need a use case, an architecture, a sense of risk, and a delivery path they can actually staff.",
    approach: [
      "Find the use case that is worth building, and the ones that are not.",
      "Plan the architecture around available data, users, and constraints.",
      "Prototype only far enough to test the risk and the value.",
      "Leave a delivery roadmap the team can follow.",
    ],
    icon: "compass",
    image: "/images/ticket-strategy-smart.png",
    alt: "Strategy roadmap, tablet, coffee, and a water bottle on a planning table",
    contents: ["Use-case discovery", "Architecture", "Prototyping", "Delivery"],
  },
] as const;

export function getService(id: string) {
  return services.find((service) => service.id === id);
}

export const scientificCapabilities = [
  {
    slug: "mathematical-reasoning",
    title: "Mathematical Reasoning",
    body: "Build AI systems for equation interpretation, symbolic reasoning, proof-support workflows, problem solving, and technical education.",
    challenge:
      "Equation work is precise. A useful assistant has to read symbols, keep steps explicit, and support proofs or teaching without inventing a result.",
    approach: [
      "Interpret equations and symbolic expressions in the form a team already uses.",
      "Support proof and problem-solving workflows with visible intermediate steps.",
      "Shape the tool for technical education so learners can follow the reasoning.",
      "Check outputs against domain examples before the workflow is trusted.",
    ],
    image: "/images/ticket-reason-smart.png?v=gaze",
    alt: "Three professionals looking at mathematical equations on their own laptop screens",
    contents: ["Equations", "Symbolic reasoning", "Proof support", "Education"],
    icon: "triangle" as const,
  },
  {
    slug: "physics-informed-ai",
    title: "Physics-Informed AI",
    body: "Develop models that learn from physical laws, simulations, sensor data, experiments, and engineering constraints.",
    challenge:
      "A model that only fits data can violate the physics it is supposed to describe. Teams need learning that respects laws, simulations, sensors, and engineering limits.",
    approach: [
      "Bring physical laws and engineering constraints into the model, not only after the fact.",
      "Learn from simulations, sensor streams, and experimental results together.",
      "Keep outputs comparable to the runs and measurements a team already trusts.",
      "Review results with people who know the physical system.",
    ],
    image: "/images/ticket-physics-smart.png?v=distinct",
    alt: "Four diverse professionals looking at a monitor of physics simulations",
    contents: ["Simulations", "Sensor data", "Constraints", "Experiments"],
    icon: "scientific" as const,
  },
  {
    slug: "scientific-data-intelligence",
    title: "Scientific Data Intelligence",
    body: "Transform research, experimental, and simulation data into searchable knowledge systems, prediction tools, anomaly detection, and interactive analysis platforms.",
    challenge:
      "Research data is scattered across experiments and simulation runs. Teams need to search it, spot anomalies, and turn it into predictions without losing the source.",
    approach: [
      "Organize experimental and simulation outputs into a searchable knowledge system.",
      "Add prediction and anomaly views that stay tied to the underlying records.",
      "Build an interactive analysis surface for comparing runs and results.",
      "Keep evaluation and expert review in the path from data to decision.",
    ],
    image: "/images/ticket-data-smart.png?v=gaze",
    alt: "Research team facing a wall display and individual laptops showing scientific data dashboards",
    contents: ["Knowledge systems", "Predictions", "Anomaly detection", "Analysis"],
    icon: "chart" as const,
  },
] as const;

export function getScientificCapability(slug: string) {
  return scientificCapabilities.find((item) => item.slug === slug);
}
