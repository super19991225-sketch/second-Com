import { createFileRoute } from "@tanstack/react-router";

import { FieldBand } from "@/components/site/FieldBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFrame } from "@/components/site/SiteFrame";
import { company } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Use — GenixaLab LLC" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          kind="paper"
          compact
          icon="terms"
          eyebrow="Legal"
          title="Terms of Use"
          poster={{
            src: "/images/stage-legal.png",
            alt: "Stacked linen documents on a stone desk",
          }}
        />
        <FieldBand>
          <div className="mx-auto max-w-3xl space-y-4 text-base font-light leading-7 text-muted-foreground">
            <p>
              This website describes {company.name} services. It is not an offer of professional
              advice and does not create a client relationship. Project work is governed by a
              separate written agreement.
            </p>
            <p>
              Case studies describe types of work, not named clients or guaranteed results.
              Specialist AI is intended for defined domains and validated use cases.
            </p>
          </div>
        </FieldBand>
      </main>
    </SiteFrame>
  );
}
