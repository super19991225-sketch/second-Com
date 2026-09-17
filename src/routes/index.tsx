import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Company — AI, Data & Product Engineering" },
      {
        name: "description",
        content:
          "My Company builds AI/ML systems, real-time data platforms and modern web products, and trains teams to run them.",
      },
      { property: "og:title", content: "My Company — AI, Data & Product Engineering" },
      {
        property: "og:description",
        content:
          "Selected work: predictive maintenance, streaming data platforms, customer portals, LLM assistants and applied AI training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const work = [
  {
    title: "Predictive Maintenance ML System",
    category: "AI/ML System",
    client: "Mid-size manufacturing operator",
    description:
      "Built a predictive maintenance pipeline using sensor telemetry to flag equipment failures before they happen, replacing a manual inspection schedule.",
    tech: ["Python", "scikit-learn", "Kafka", "Airflow", "AWS SageMaker"],
    outcome:
      "Reduced unplanned downtime by 34% and cut inspection labor hours by 20% in the first two quarters.",
  },
  {
    title: "Real-Time Data Platform Migration",
    category: "Data Platform",
    client: "Fintech scale-up",
    description:
      "Re-architected a legacy batch-processing data warehouse into a real-time streaming platform to support fraud detection and reporting.",
    tech: ["Snowflake", "dbt", "Apache Kafka", "Terraform"],
    outcome:
      "Reduced data latency from 24 hours to under 5 minutes and enabled same-day fraud alerts.",
  },
  {
    title: "Customer Portal Rebuild",
    category: "Web Product",
    client: "B2B logistics company",
    description:
      "Rebuilt a dated customer-facing portal into a modern, responsive web application with self-service account management and shipment tracking.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    outcome:
      "Increased self-service ticket resolution by 45%, reducing support team load.",
  },
  {
    title: "LLM-Powered Internal Knowledge Assistant",
    category: "AI/ML System",
    client: "Professional services firm",
    description:
      "Developed a retrieval-augmented internal assistant to help staff search policy documents, past proposals, and compliance guidance in natural language.",
    tech: ["Python", "LangChain", "OpenAI API", "Pinecone"],
    outcome:
      "Cut average document-search time from 12 minutes to under 90 seconds across a 200-person team.",
  },
  {
    title: "AI Training Program for Product Teams",
    category: "AI Training",
    client: "Enterprise retail company",
    description:
      "Delivered a 6-week hands-on training program to upskill product and engineering teams on applied ML fundamentals and responsible AI practices.",
    tech: ["Custom curriculum", "Jupyter notebooks", "Internal sandbox"],
    outcome:
      "40 staff certified internally; two AI-driven product initiatives launched within 6 months.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">My Company</span>
          <a
            href="#work"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Selected work
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">
            AI · Data · Product engineering
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            We build the systems that turn your data into decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From predictive models and streaming platforms to customer-facing products and
            hands-on team training — delivered end to end.
          </p>
        </section>

        <section id="work" className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {work.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col rounded-lg border border-border bg-card p-6"
                >
                  <span className="text-xs uppercase tracking-[0.15em] text-primary">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.client}</p>
                  <p className="mt-4 text-sm leading-relaxed">{item.description}</p>
                  <p className="mt-4 border-l-2 border-accent pl-3 text-sm font-medium">
                    {item.outcome}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} My Company
        </div>
      </footer>
    </div>
  );
}
