import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { TicketCard } from "@/components/site/TicketCard";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div id={study.slug} className="case-card h-full">
      <TicketCard
        image={study.image}
        alt={study.imageAlt}
        eyebrow={study.category}
        badge={study.label}
        title={study.title}
        body={`${study.description} ${study.outcome}`}
        chips={study.tags}
        footer={
          <Link
            to="/case-studies/$slug"
            params={{ slug: study.slug }}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground"
          >
            View case study
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        }
      />
    </div>
  );
}
