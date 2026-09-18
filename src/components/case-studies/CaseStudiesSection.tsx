import type { ReactNode } from "react";

import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesSection({ footer }: { footer?: ReactNode }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
      {footer}
    </div>
  );
}
