import { Link } from "@tanstack/react-router";

import { FieldBand } from "@/components/site/FieldBand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TicketCard } from "@/components/site/TicketCard";
import { scientificCapabilities } from "@/data/services";

export function ScientificAIFeature({ explore = "index" }: { explore?: "index" | "detail" }) {
  return (
    <FieldBand>
      <SectionHeading
        icon="scientific"
        eyebrow="Scientific AI"
        title="AI designed for mathematical and physical systems."
      >
        We develop domain-aware AI tools for mathematical reasoning, scientific data, engineering
        simulations, and physics-based workflows. Our approach combines modern machine learning with
        structured data, domain benchmarks, evaluation frameworks, and expert review.
      </SectionHeading>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {scientificCapabilities.map((item, index) => {
          const n = String(index + 1).padStart(2, "0");
          return (
            <TicketCard
              key={item.slug}
              image={item.image}
              alt={item.alt}
              eyebrow={`${n} · Domain`}
              badge="Research"
              title={item.title}
              icon={item.icon}
              body={item.body}
              chips={item.contents}
            />
          );
        })}
      </div>
      {explore === "detail" ? (
        <Link
          to="/scientific-ai/detail"
          className="mt-10 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Explore Scientific AI
        </Link>
      ) : (
        <Link
          to="/scientific-ai"
          className="mt-10 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Explore Scientific AI
        </Link>
      )}
      <p className="section-type mt-8 max-w-[40ch] text-sm font-medium leading-6 text-foreground">
        Specialist AI is designed for defined domains and validated use cases, with clear evaluation
        and human expert review where required.
      </p>
    </FieldBand>
  );
}
