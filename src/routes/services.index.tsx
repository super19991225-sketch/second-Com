import { createFileRoute, Link } from "@tanstack/react-router";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFrame } from "@/components/site/SiteFrame";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — GeniusXLab" },
      {
        name: "description",
        content:
          "AI/ML engineering, web development, AI training, scientific AI, data engineering, and technical consulting.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="mosaic"
          icon="services"
          eyebrow="What we build"
          title="Services"
          poster={{
            src: "/images/poster-services.png",
            alt: "Laptop, notebook, and a glass scientific model on a studio table",
          }}
          actions={
            <>
              <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
                Start a project
              </ContactOpenButton>
              <Link
                to="/scientific-ai"
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background/95 px-6 text-sm font-medium"
              >
                Explore Scientific AI
              </Link>
            </>
          }
        >
          We build the scientific AI models at the center of the work, then the machine-learning
          systems, web products, data infrastructure, and training that put those models in front of
          a real team. Each engagement is scoped to a defined problem, not a generic platform.
        </PageHero>
        <FieldBand>
          <SectionHeading
            icon="services"
            eyebrow="Capabilities"
            title="Engineering intelligence into useful products."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={service.id} id={service.id}>
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
