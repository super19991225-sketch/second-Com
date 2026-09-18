import { createFileRoute } from "@tanstack/react-router";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { PageHero } from "@/components/site/PageHero";
import { ScientificAIFeature } from "@/components/site/ScientificAIFeature";
import { SiteFrame } from "@/components/site/SiteFrame";

export const Route = createFileRoute("/scientific-ai/")({
  head: () => ({
    meta: [
      { title: "Scientific AI — GeniusXLab" },
      {
        name: "description",
        content:
          "Domain-aware AI for mathematical reasoning, physics-informed models, and scientific data intelligence.",
      },
    ],
  }),
  component: ScientificAIPage,
});

function ScientificAIPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="orbit"
          icon="scientific"
          eyebrow="Scientific AI"
          title="AI designed for mathematical and physical systems."
          poster={{
            src: "/images/poster-scientific.png",
            alt: "Glass prism and cube on a stone plinth",
          }}
          actions={
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Start a project
            </ContactOpenButton>
          }
        >
          We create specialist models for equation reasoning, physics-informed simulation, and
          research data — evaluated against domain benchmarks and reviewed by people who know the
          field. This is not a general chatbot with a science theme.
        </PageHero>
        <ScientificAIFeature explore="detail" />
      </main>
    </SiteFrame>
  );
}
