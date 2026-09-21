import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { CareerApplicationForm } from "@/components/site/CareerApplicationForm";
import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { TitleIcon } from "@/components/site/TitleIcon";
import { applicationsEmail, getOpenRole, openRoles } from "@/data/careers";

type ApplySearch = {
  role?: string;
};

export const Route = createFileRoute("/careers/apply")({
  validateSearch: (search: Record<string, unknown>): ApplySearch => ({
    role: typeof search.role === "string" ? search.role : undefined,
  }),
  head: ({ match }) => {
    const role = match.search.role ? getOpenRole(match.search.role) : undefined;
    return {
      meta: [
        {
          title: role ? `Apply — ${role.title} — GeniusXLab` : "Apply — Careers — GeniusXLab",
        },
        {
          name: "description",
          content: role
            ? `Apply for ${role.title} at GeniusXLab.`
            : "Apply for an open role at GeniusXLab.",
        },
      ],
    };
  },
  component: CareerApplyPage,
});

function CareerApplyPage() {
  const { role: roleFromSearch } = Route.useSearch();
  const initialRoleId =
    roleFromSearch && getOpenRole(roleFromSearch) ? roleFromSearch : (openRoles[0]?.id ?? "");
  const [roleId, setRoleId] = useState(initialRoleId);
  const role = getOpenRole(roleId);

  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="breathe"
          icon="careers"
          eyebrow="Application"
          title={role ? `Apply for ${role.title}` : "Apply to GeniusXLab"}
          poster={{
            src: role?.image ?? "/images/stage-careers.png?v=hire",
            alt: role?.alt ?? "A candidate and studio members after hiring terms",
          }}
          actions={
            <Link
              to="/careers"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-background/95 px-6 text-sm font-medium"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to careers
            </Link>
          }
        >
          {role
            ? `${role.summary} Complete the form below. We reply with a practical next step.`
            : "Choose a role, share your background, and tell us what you want to work on next."}
        </PageHero>

        <FieldBand>
          <div className="glass-surface mx-auto grid max-w-5xl gap-10 rounded-3xl px-6 py-10 text-foreground lg:grid-cols-[0.95fr_1.05fr] lg:items-start sm:px-10 sm:py-12">
            <aside className="space-y-6">
              {role ? (
                <div className="space-y-5">
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                    Job description
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                      {role.team}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                      {role.type}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                      {role.location}
                    </span>
                  </div>
                  <h2 className="font-display flex items-center gap-2.5 text-3xl leading-tight text-foreground">
                    <TitleIcon name={role.icon} />
                    {role.title}
                  </h2>
                  <p className="text-base leading-7 text-foreground">{role.summary}</p>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                      Focus
                    </p>
                    <ul className="mt-3 space-y-3">
                      {role.focus.map((item) => (
                        <li
                          key={item}
                          className="border-l-2 border-primary pl-4 text-base leading-7 text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="flex flex-wrap gap-1.5 pt-2">
                    {role.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-foreground"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-base leading-7 text-foreground">
                  Select a role in the form to see its description here.
                </p>
              )}

              <div className="border-t border-border/70 pt-6">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                  Before you send
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-foreground">
                  <li className="border-l-2 border-primary pl-4">
                    Upload a current resume (PDF or Word) and your LinkedIn profile.
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    Include a short Loom introduction so we can hear how you work.
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-6 text-foreground">
                  Prefer email? Write to{" "}
                  <a href={`mailto:${applicationsEmail}`} className="text-primary hover:underline">
                    {applicationsEmail}
                  </a>
                  .
                </p>
              </div>
            </aside>

            <div>
              <h2 className="font-display text-3xl leading-tight text-foreground">
                Application form
              </h2>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Changing the role updates the job description on the left. Fields marked in the form
                are required.
              </p>
              <div className="mt-8">
                <CareerApplicationForm roleId={roleId} onRoleChange={setRoleId} />
              </div>
            </div>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
