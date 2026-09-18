import { createFileRoute } from "@tanstack/react-router";

import { CaseStudiesSection } from "@/components/case-studies/CaseStudiesSection";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — GeniusXLab" },
      {
        name: "description",
        content:
          "Selected AI, software, and data products designed to turn complex information into practical workflows.",
      },
    ],
  }),
  component: CaseStudiesIndexPage,
});

function CaseStudiesIndexPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="film"
          icon="work"
          eyebrow="Selected Work"
          title="Case Studies Built for Complex Problems"
          poster={{
            src: "/images/stage-work.png?v=light",
            alt: "Selected work boards and a laptop on a light studio desk",
          }}
          actions={
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Start a project
            </ContactOpenButton>
          }
        >
          A selection of AI, software, and data products designed to turn complex information into
          practical, reliable workflows.
        </PageHero>
        <FieldBand>
          <CaseStudiesSection
            footer={
              <ContactOpenButton className="mt-12 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
                Discuss a similar project
              </ContactOpenButton>
            }
          />
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
