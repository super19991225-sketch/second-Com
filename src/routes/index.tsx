import { createFileRoute, Link } from "@tanstack/react-router";

import { CaseStudiesSection } from "@/components/case-studies/CaseStudiesSection";
import { CollaborationCard } from "@/components/site/CollaborationCard";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { Hero } from "@/components/site/Hero";
import { ProcessStep } from "@/components/site/ProcessStep";
import { ProofStrip } from "@/components/site/ProofStrip";
import { ScientificAIFeature } from "@/components/site/ScientificAIFeature";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFrame } from "@/components/site/SiteFrame";
import { TitleIcon } from "@/components/site/TitleIcon";
import { TrainingTopics } from "@/components/site/TrainingTopics";
import { processStages } from "@/data/process";
import { services } from "@/data/services";
import { company, seo } from "@/data/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: seo.description,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { "script:ld+json": organizationJsonLd },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteFrame>
      <main>
        <Hero />
        <ProofStrip />

        <FieldBand>
          <SectionHeading
            icon="services"
            eyebrow="Capabilities"
            title="Engineering intelligence into useful products."
          >
            We combine machine learning, product engineering, data systems, and practical training
            to help teams build, deploy, and confidently use AI.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </FieldBand>

        <ScientificAIFeature />

        <FieldBand>
          <SectionHeading
            icon="process"
            eyebrow="How we work"
            title="From problem definition to production impact."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processStages.map((step) => (
              <ProcessStep key={step.n} step={step} />
            ))}
          </div>
        </FieldBand>

        <FieldBand>
          <SectionHeading
            icon="work"
            eyebrow="Selected Work"
            title="Case Studies Built for Complex Problems"
          >
            A selection of AI, software, and data products designed to turn complex information into
            practical, reliable workflows.
          </SectionHeading>
          <div className="mt-12">
            <CaseStudiesSection />
          </div>
          <Link
            to="/case-studies"
            className="mt-10 inline-flex min-h-11 items-center text-sm font-medium text-primary"
          >
            View all case studies
          </Link>
        </FieldBand>

        <FieldBand>
          <SectionHeading
            icon="training"
            eyebrow="AI Training"
            title="Help your team build and use AI with confidence."
          >
            Our training programs are designed around your team’s roles, tools, data, and real
            workflows. Sessions can support engineers, analysts, researchers, product teams, and
            business leaders.
          </SectionHeading>
          <div className="mt-10">
            <TrainingTopics />
          </div>
          <ContactOpenButton className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
            Discuss training for your team
          </ContactOpenButton>
        </FieldBand>

        <FieldBand>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                icon="about"
                eyebrow="About GeniusXLab"
                title="Built for difficult problems worth solving."
              >
                GeniusXLab is an applied AI and software engineering company. We partner with
                ambitious organizations to design intelligent systems that are useful, maintainable,
                and ready for real-world adoption.
              </SectionHeading>
              <p className="section-type mt-5 max-w-[40ch] text-base font-medium leading-7 text-foreground">
                Our work sits at the intersection of AI/ML engineering, web development, data
                systems, and technical education. From an early proof of concept to a production
                platform or specialist model for mathematics and physics, we bring practical product
                thinking and technical rigor to every engagement.
              </p>
            </div>
            <CollaborationCard />
          </div>
        </FieldBand>

        <FieldBand>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-type inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-primary">
              <TitleIcon name="contact" className="size-3.5" />
              Contact
            </p>
            <h2 className="section-type font-display mt-3 text-4xl text-foreground md:text-5xl">
              Tell us what you are building.
            </h2>
            <span aria-hidden className="mx-auto mt-4 block h-px w-12 bg-primary/50" />
            <p className="section-type mx-auto mt-5 max-w-[40ch] text-base font-medium leading-7 text-foreground">
              Share the challenge, users, available data, and desired outcome. Whether you need an
              AI system, a web platform, a specialist scientific model, or team training, we will
              help identify a practical next step.
            </p>
            <p className="mt-6 text-sm">
              <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                {company.email}
              </a>
            </p>
            <ContactOpenButton className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Start a project
            </ContactOpenButton>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
