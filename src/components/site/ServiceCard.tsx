import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { TicketCard } from "@/components/site/TicketCard";
import type { TitleIconName } from "@/components/site/TitleIcon";
import type { services } from "@/data/services";

type Service = (typeof services)[number];

const iconMap: Record<Service["icon"], TitleIconName> = {
  brain: "brain",
  globe: "globe",
  graduation: "training",
  atom: "scientific",
  database: "database",
  compass: "compass",
};

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <TicketCard
      image={service.image}
      alt={service.alt}
      eyebrow={`${n} · Field`}
      badge="Studio"
      title={service.title}
      icon={iconMap[service.icon]}
      body={service.description}
      chips={service.contents}
      footer={
        <Link
          to="/services/$id"
          params={{ id: service.id }}
          className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:text-foreground"
        >
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      }
    />
  );
}
