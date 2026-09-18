import { Link } from "@tanstack/react-router";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { PageHero } from "@/components/site/PageHero";

const duties = [
  "Scientific AI",
  "AI/ML Engineering",
  "Web Development",
  "AI Training",
  "Data & MLOps",
  "Strategy",
];

export function Hero() {
  return (
    <PageHero
      eyebrow="Scientific AI · Engineering · Products · Training"
      title="Build intelligent software your team can trust."
      poster={{
        src: "/images/room-studio-full.png?v=keep",
        alt: "Six studio members gathered around three dashboard monitors",
      }}
      actions={
        <>
          <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
            Start a project
          </ContactOpenButton>
          <Link
            to="/services"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-background/95 px-6 text-sm font-medium"
          >
            Explore services
          </Link>
        </>
      }
      footer={
        <ul className="flex flex-wrap justify-center gap-2">
          {duties.map((duty) => (
            <li
              key={duty}
              className="rounded-full border border-border/70 bg-background/95 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase"
            >
              {duty}
            </li>
          ))}
        </ul>
      }
    >
      In this studio the work is split by duty: scientific models, machine-learning systems, the web
      products that carry them, the data that keeps them honest, and the training that lets a client
      team take over.
    </PageHero>
  );
}
