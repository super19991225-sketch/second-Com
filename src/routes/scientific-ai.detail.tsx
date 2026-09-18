import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { TitleIcon, type TitleIconName } from "@/components/site/TitleIcon";
import { scientificCapabilities } from "@/data/services";

export const Route = createFileRoute("/scientific-ai/detail")({
  head: () => ({
    meta: [
      { title: "Scientific AI — How the work is built — GeniusXLab" },
      {
        name: "description",
        content:
          "How GeniusXLab builds mathematical reasoning, physics-informed models, and scientific data systems.",
      },
    ],
  }),
  component: ScientificAIDetailPage,
});

function ScientificAIDetailPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="orbit"
          icon="scientific"
          eyebrow="Scientific AI"
          title="How specialist scientific models are built."
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
          Each domain is a defined problem: the data, the constraints, the evaluation, and the
          people who review the result. The tickets below are the three practices behind that work.
        </PageHero>

        <FieldBand>
          <div className="space-y-8">
            {scientificCapabilities.map((item, index) => (
              <article
                key={item.slug}
                className="glass-surface grid gap-8 rounded-3xl px-6 py-10 text-foreground lg:grid-cols-[1.15fr_0.85fr] lg:items-start sm:px-10 sm:py-12"
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                      {String(index + 1).padStart(2, "0")} · Domain
                    </p>
                    <h2 className="font-display mt-3 flex items-center gap-2.5 text-4xl leading-tight">
                      <TitleIcon name={item.icon as TitleIconName} />
                      {item.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-foreground">{item.body}</p>
                  </div>
                  <section>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                      Challenge
                    </p>
                    <p className="mt-3 text-base leading-7 text-foreground">{item.challenge}</p>
                  </section>
                  <section>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                      Approach
                    </p>
                    <ul className="mt-3 space-y-3">
                      {item.approach.map((step) => (
                        <li
                          key={step}
                          className="border-l-2 border-primary pl-4 text-base leading-7 text-foreground"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <aside className="glass-panel overflow-hidden rounded-2xl border border-white/15 text-panel-foreground">
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.alt} className="size-full object-cover" />
                  </div>
                  <div className="p-6">
                    <ul className="flex flex-wrap gap-1.5">
                      {item.contents.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-amber-300"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/scientific-ai"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Scientific AI
            </Link>
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Discuss a similar project
            </ContactOpenButton>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
