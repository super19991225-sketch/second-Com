import { SmartTicket } from "@/components/site/SmartTicket";
import { collaborationPoints } from "@/data/training";

export function CollaborationCard() {
  return (
    <SmartTicket
      image="/images/ticket-collab.png?v=safe"
      alt="Client meeting around a table with documents and a tablet"
      eyebrow="Collaboration"
      badge="Studio"
      title="Technical depth, communicated clearly."
      icon="about"
      footer={
        <ul className="mt-4 space-y-2.5">
          {collaborationPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm font-medium leading-6 text-foreground">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      }
      minClass="min-h-[32rem]"
    />
  );
}
