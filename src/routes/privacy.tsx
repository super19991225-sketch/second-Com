import { createFileRoute } from "@tanstack/react-router";

import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { company } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — GenixaLab LLC" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="paper"
          compact
          icon="privacy"
          eyebrow="Legal"
          title="Privacy Policy"
          poster={{
            src: "/images/stage-legal.png",
            alt: "Stacked linen documents on a stone desk",
          }}
        >
          Last updated 2026.
        </PageHero>
        <FieldBand>
          <div className="mx-auto max-w-3xl space-y-4 text-base font-light leading-7 text-muted-foreground">
            <p>
              {company.name} collects only the information you send through the contact form or
              email: name, work email, organization, and project details. We use that information to
              reply and to discuss a possible engagement.
            </p>
            <p>
              We do not sell contact data. This site does not currently run advertising trackers. If
              you want a record removed, email {company.email}.
            </p>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
