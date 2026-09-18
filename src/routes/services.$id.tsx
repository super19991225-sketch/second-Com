import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ContactOpenButton } from "@/components/site/ContactModal";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { SiteFrame } from "@/components/site/SiteFrame";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$id")({
  loader: ({ params }) => {
    const service = getService(params.id);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.service
          ? `${loaderData.service.title} — GeniusXLab`
          : "Service — GeniusXLab",
      },
      {
        name: "description",
        content: loaderData?.service?.description ?? "GeniusXLab service.",
      },
    ],
  }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const related = services.filter((item) => item.id !== service.id).slice(0, 2);

  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="mosaic"
          icon="services"
          eyebrow="Services"
          title={service.title}
          poster={{ src: service.image, alt: service.alt }}
        >
          {service.description}
        </PageHero>

        <FieldBand>
          <div className="glass-surface grid gap-10 rounded-3xl px-6 py-10 text-foreground lg:grid-cols-[1.15fr_0.85fr] lg:items-start sm:px-10 sm:py-12">
            <div className="space-y-8">
              <section>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                  Challenge
                </p>
                <p className="mt-4 text-base leading-7 text-foreground">{service.challenge}</p>
              </section>
              <section>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                  Approach
                </p>
                <ul className="mt-4 space-y-3">
                  {service.approach.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-primary pl-4 text-base leading-7 text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="glass-panel overflow-hidden rounded-2xl border border-white/15 text-panel-foreground">
              <div className="h-52 overflow-hidden">
                <img src={service.image} alt={service.alt} className="size-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-display flex items-center gap-2.5 text-2xl leading-tight text-panel-foreground">
                  <ServiceIcon name={service.icon} />
                  {service.title}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {service.contents.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-amber-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to services
            </Link>
            <ContactOpenButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
              Discuss a similar project
            </ContactOpenButton>
          </div>

          {related.length > 0 ? (
            <div className="mt-16 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to="/services/$id"
                  params={{ id: item.id }}
                  className="glass-surface rounded-2xl p-5 text-foreground transition-colors hover:border-primary/40"
                >
                  <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-primary">
                    Service
                  </p>
                  <h3 className="font-display mt-2 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-card-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
