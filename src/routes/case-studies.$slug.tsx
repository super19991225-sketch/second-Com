import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CaseStudyTags } from "@/components/case-studies/CaseStudyTags";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.study
          ? `${loaderData.study.title} — GeniusXLab`
          : "Case Study — GeniusXLab",
      },
      {
        name: "description",
        content: loaderData?.study?.description ?? "Selected GeniusXLab case study.",
      },
    ],
  }),
  component: CaseStudyDetailPage,
});

function CaseStudyDetailPage() {
  const { study } = Route.useLoaderData();
  const related = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="film"
          icon="work"
          eyebrow={study.category}
          title={study.title}
          poster={{ src: study.image, alt: study.imageAlt }}
          actions={
            <>
              <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
                Discuss a similar project
              </ContactOpenButton>
              <Link
                to="/case-studies"
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background/95 px-6 text-sm font-medium"
              >
                All case studies
              </Link>
            </>
          }
        >
          {study.description}
        </PageHero>

        <FieldBand>
          <div className="glass-surface rounded-3xl px-6 py-10 text-foreground sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-10">
                <section>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                    Challenge
                  </p>
                  <p className="mt-4 text-base leading-7 text-foreground">{study.challenge}</p>
                </section>

                <section>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                    Approach
                  </p>
                  <ul className="mt-4 space-y-3">
                    {study.approach.map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-primary pl-4 text-base leading-7 text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                    Outcome
                  </p>
                  <p className="mt-4 text-lg font-medium leading-8 text-foreground">
                    {study.outcome}
                  </p>
                </section>
              </div>

              <aside className="glass-panel overflow-hidden rounded-2xl border border-white/15 text-panel-foreground shadow-xl">
                <div className="h-52 overflow-hidden">
                  <img src={study.image} alt={study.imageAlt} className="size-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-300">
                    {study.label}
                  </p>
                  <h2 className="font-display mt-2 text-2xl leading-tight text-panel-foreground">
                    {study.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-panel-foreground">
                    {study.description}
                  </p>
                  <div className="mt-5">
                    <CaseStudyTags tags={study.tags} />
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-4">
              <Link
                to="/case-studies"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back to case studies
              </Link>
              <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
                Discuss a similar project
              </ContactOpenButton>
            </div>

            {related.length > 0 ? (
              <div className="mt-16 border-t border-border/60 pt-12">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                  More work
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      to="/case-studies/$slug"
                      params={{ slug: item.slug }}
                      className="glass-surface group rounded-2xl p-5 text-foreground transition-colors hover:border-primary/40"
                    >
                      <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-primary">
                        {item.category}
                      </p>
                      <h3 className="font-display mt-2 text-xl text-foreground group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground">{item.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        View case study
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
