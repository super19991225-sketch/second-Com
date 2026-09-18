import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WorldGround } from "@/components/site/WorldGround";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      <WorldGround />
      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
