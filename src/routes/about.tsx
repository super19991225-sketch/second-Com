import { createFileRoute } from "@tanstack/react-router";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteFrame } from "@/components/site/SiteFrame";
import { SmartTicket } from "@/components/site/SmartTicket";
import { cultureMoments, leadership, workModels } from "@/data/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GeniusXLab" },
      {
        name: "description",
        content:
          "Leadership, work model, and studio culture at GeniusXLab, an applied AI studio in Los Angeles.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="sweep"
          icon="about"
          eyebrow="About GeniusXLab"
          title="Built for difficult problems worth solving."
          poster={{
            src: "/images/stage-about.png?v=walk",
            alt: "Looking down a studio hall with people working at different distances",
          }}
          actions={
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Start a project
            </ContactOpenButton>
          }
        >
          GeniusXLab is a Los Angeles studio for applied AI. The page is the people who lead the
          work, the model we use with a client team, and the life around the desks.
        </PageHero>

        <FieldBand>
          <SectionHeading icon="about" eyebrow="Leadership" title="The people who hold the work.">
            Four leads. Different faces, different clothes, different duties: scientific models,
            engineering, products, and training.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <SmartTicket
                key={person.name}
                image={person.image}
                alt={person.alt}
                eyebrow={person.role}
                badge="Lead"
                chips={person.chips}
                title={person.name}
                icon={person.icon}
                body={person.body}
                minClass="min-h-[28rem]"
              />
            ))}
          </div>
        </FieldBand>

        <FieldBand>
          <SectionHeading icon="process" eyebrow="Work model" title="How an engagement actually runs.">
            The model sits at the center. Around it: the client problem, the product that carries
            the result, and the training that lets their team keep the system.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {workModels.map((model) => (
              <SmartTicket
                key={model.title}
                image={model.image}
                alt={model.alt}
                eyebrow="Model"
                badge="Studio"
                chips={model.chips}
                title={model.title}
                icon={model.icon}
                body={model.body}
                minClass="min-h-[26rem]"
              />
            ))}
          </div>
        </FieldBand>

        <FieldBand>
          <SectionHeading icon="spark" eyebrow="Culture" title="The studio outside the monitors.">
            Climbing, a game with a score, a long table, ordinary weekends. These photos are the
            culture: people on a ridge, in a match, at dinner, on a walk.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cultureMoments.map((moment) => (
              <SmartTicket
                key={moment.title}
                image={moment.image}
                alt={moment.alt}
                eyebrow="Life"
                badge="Culture"
                chips={moment.chips}
                title={moment.title}
                icon={moment.icon}
                body={moment.body}
                minClass="min-h-[26rem]"
              />
            ))}
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
