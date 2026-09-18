import { Link } from "@tanstack/react-router";
import {
  Atom,
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { ContactOpenButton } from "@/components/site/ContactModal";
import { company, footerNav, headquarters, legalNav, social } from "@/data/site";

const exploreIcons: Record<(typeof footerNav)[number]["icon"], LucideIcon> = {
  services: Layers3,
  scientific: Atom,
  work: FolderKanban,
  training: GraduationCap,
  about: UsersRound,
  careers: BriefcaseBusiness,
};

const linkClass =
  "group inline-flex min-h-11 items-center gap-2.5 text-sm text-footer-foreground/90 transition-colors hover:text-footer-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.84_0.08_75)] focus-visible:ring-offset-2 focus-visible:ring-offset-footer";

const iconClass =
  "h-4 w-4 shrink-0 text-footer-foreground/80 transition-colors group-hover:text-[oklch(0.84_0.08_75)]";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-footer-foreground/75">
            {company.description}
          </p>
        </div>

        <nav aria-label="Explore">
          <h2 className="text-[11px] font-medium tracking-[0.18em] uppercase text-footer-foreground/65">
            Explore
          </h2>
          <ul className="mt-4 space-y-1">
            {footerNav.map((item) => {
              const Icon = exploreIcons[item.icon];
              return (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <Icon className={iconClass} aria-hidden />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ContactOpenButton className={linkClass}>
                <MessageSquare className={iconClass} aria-hidden />
                Contact
              </ContactOpenButton>
            </li>
          </ul>
        </nav>

        <div className="space-y-5">
          <h2 className="text-[11px] font-medium tracking-[0.18em] uppercase text-footer-foreground/65">
            Contact
          </h2>

          <a href={`mailto:${company.email}`} className={linkClass}>
            <Mail className={iconClass} aria-hidden />
            <span>{company.email}</span>
          </a>

          <address className="not-italic">
            <a
              href={headquarters.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GeniusXLab headquarters in Google Maps"
              className={`${linkClass} items-start`}
            >
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.84_0.08_75)]" aria-hidden />
              <span className="leading-6">
                <span className="block">{headquarters.street}</span>
                <span className="block">{headquarters.city}</span>
              </span>
            </a>
          </address>

          <div className="h-[180px] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <iframe
              title="GeniusXLab headquarters location in Kwun Tong, Hong Kong"
              src={headquarters.embedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href={headquarters.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} font-medium`}
          >
            <ExternalLink className={iconClass} aria-hidden />
            <span>View on Google Maps</span>
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            {social.map((item) => {
              const Icon = item.label === "GitHub" ? Github : Linkedin;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit GeniusXLab on ${item.label}`}
                  className={linkClass}
                >
                  <Icon className={iconClass} aria-hidden />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-footer-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-footer-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {company.year} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="min-h-11 inline-flex items-center hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.84_0.08_75)] focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
