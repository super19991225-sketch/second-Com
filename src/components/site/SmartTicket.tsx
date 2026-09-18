import type { ReactNode } from "react";

import { TicketCard } from "@/components/site/TicketCard";
import type { TitleIconName } from "@/components/site/TitleIcon";

export function SmartTicket({
  image,
  alt,
  eyebrow,
  badge,
  chips,
  title,
  icon,
  body,
  footer,
  minClass: _minClass,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  badge?: string;
  chips?: readonly string[];
  title: string;
  icon?: TitleIconName;
  body?: string;
  footer?: ReactNode;
  minClass?: string;
}) {
  return (
    <TicketCard
      image={image}
      alt={alt}
      eyebrow={eyebrow}
      badge={badge}
      chips={chips}
      title={title}
      icon={icon}
      body={body}
      footer={footer}
    />
  );
}
