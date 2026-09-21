import { createFileRoute } from "@tanstack/react-router";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { TrainingTopics } from "@/components/site/TrainingTopics";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "AI Training — GenixaLab LLC" },
      {
        name: "description",
        content:
          "Hands-on AI training for engineers, researchers, product teams, and business leaders.",
      },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="float"
          icon="training"
          eyebrow="AI Training"
          title="Help your team build and use AI with confidence."
          poster={{
            src: "/images/stage-training.png?v=session",
            alt: "Instructor and learners in a hands-on AI training workshop",
          }}
          actions={
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Discuss training for your team
            </ContactOpenButton>
          }
        >
          Sessions are built around the models, tools, and decisions your people already face —
          engineers who will ship systems, researchers who must trust outputs, and leaders who need
          to judge risk. The aim is practical fluency, not a slide tour of AI.
        </PageHero>
        <FieldBand>
          <TrainingTopics />
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
