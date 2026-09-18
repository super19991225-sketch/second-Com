import { TicketCard } from "@/components/site/TicketCard";
import type { processStages } from "@/data/process";

type Step = (typeof processStages)[number];

export function ProcessStep({ step }: { step: Step }) {
  return (
    <TicketCard
      image={step.image}
      alt={step.alt}
      eyebrow={`${step.n} · Stage`}
      badge="Process"
      title={step.title}
      icon={step.icon}
      body={step.body}
      chips={step.chips}
    />
  );
}
