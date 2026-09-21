import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteFrame } from "@/components/site/SiteFrame";
import { SmartTicket } from "@/components/site/SmartTicket";
import { TicketCard } from "@/components/site/TicketCard";
import { applicationsEmail, careerFocus, hiringSteps, openRoles } from "@/data/careers";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — GenixaLab LLC" },
      {
        name: "description",
        content:
          "Open roles at GenixaLab LLC: Senior Web App Engineer, Physicist for Physics AI, and Senior Data Analyst.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="breathe"
          icon="careers"
          eyebrow="Careers"
          title="Build systems that have to work."
          poster={{
            src: "/images/stage-careers.png?v=safe",
            alt: "A candidate and studio members celebrating after final hiring terms",
          }}
          actions={
            <>
              <a
                href="#open-roles"
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                View open roles
              </a>
              <Link
                to="/careers/apply"
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background/95 px-6 text-sm font-medium"
              >
                Apply now
              </Link>
            </>
          }
        >
          Three roles are open now: Senior Web App Engineer, Physicist for our Physics AI model
          work, and Senior Data Analyst. Read the briefs below, then apply with a short note on what
          you have built and what you want to work on next.
        </PageHero>

        <FieldBand>
          <div id="open-roles" className="scroll-mt-28">
            <SectionHeading
              icon="careers"
              eyebrow="Open roles"
              title="Three positions. Clear work."
            >
              Each role has a defined problem space. Apply with examples of your craft and the
              problems you want to take on.
            </SectionHeading>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {openRoles.map((role, index) => {
                const n = String(index + 1).padStart(2, "0");
                return (
                  <div key={role.id} id={role.id}>
                    <TicketCard
                      image={role.image}
                      alt={role.alt}
                      eyebrow={`${n} · ${role.team}`}
                      badge={role.type}
                      title={role.title}
                      icon={role.icon}
                      body={role.summary}
                      chips={role.chips}
                      footer={
                        <Link
                          to="/careers/apply"
                          search={{ role: role.id }}
                          className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:text-foreground"
                        >
                          Apply for this role
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </FieldBand>

        <FieldBand>
          <SectionHeading
            icon="about"
            eyebrow="Where we look"
            title="The kinds of craft that fit the studio."
          >
            Beyond the open roles, these are the practices we keep hiring for when the projects need
            them.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {careerFocus.map((item) => (
              <SmartTicket
                key={item.title}
                image={item.image}
                alt={item.alt}
                eyebrow="Interest"
                badge="Studio"
                chips={item.chips}
                title={item.title}
                icon={item.icon}
                body={item.body}
                minClass="min-h-[26rem]"
              />
            ))}
          </div>
        </FieldBand>

        <FieldBand>
          <SectionHeading
            icon="process"
            eyebrow="How we hire"
            title="A clear path from note to first work."
          >
            The same path for every role: apply, review, talk through the work, agree terms, then
            start with clear first work.
          </SectionHeading>
          <ol className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hiringSteps.map((step) => (
              <li key={step.title} className="h-full">
                <TicketCard
                  image={step.image}
                  alt={step.alt}
                  eyebrow={`${step.n} · Hire`}
                  badge="Process"
                  title={step.title}
                  icon={step.icon}
                  body={step.body}
                  chips={step.chips}
                />
              </li>
            ))}
          </ol>
        </FieldBand>

        <FieldBand>
          <div className="glass-surface mx-auto max-w-2xl rounded-3xl px-6 py-12 text-center text-foreground sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
              Reach out
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight">Apply with a short note.</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-foreground">
              Open the application form, choose a role, and include a few examples of your work. You
              can also email {applicationsEmail}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/careers/apply"
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                Open application
              </Link>
              <a
                href={`mailto:${applicationsEmail}?subject=Careers%20at%20GenixaLab%20LLC`}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-6 text-sm font-medium text-card-foreground"
              >
                {applicationsEmail}
              </a>
            </div>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
