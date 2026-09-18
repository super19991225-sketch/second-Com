export const company = {
  name: "GeniusXLab",
  shortName: "GX",
  tagline: "Applied AI, Software Engineering, and Technical Training",
  description:
    "Applied AI, software engineering, and technical training for useful, dependable systems.",
  email: "hello@geniusxlab.com",
  location: "Los Angeles, California",
  year: 2026,
} as const;

export const headquarters = {
  name: "GeniusXLab Headquarters",
  building: "CORE45",
  street: "43–45 Tsun Yip Street",
  city: "Kwun Tong, Kowloon, Hong Kong",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=CORE45%2C%2043-45%20Tsun%20Yip%20Street%2C%20Kwun%20Tong%2C%20Kowloon%2C%20Hong%20Kong",
  embedUrl:
    "https://maps.google.com/maps?q=CORE45%2C%2043-45%20Tsun%20Yip%20Street%2C%20Kwun%20Tong%2C%20Kowloon%2C%20Hong%20Kong&t=&z=15&ie=UTF8&iwloc=&output=embed",
} as const;

export const primaryNav = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/services", label: "Services", icon: "services" },
  { to: "/scientific-ai", label: "Scientific AI", icon: "scientific" },
  { to: "/case-studies", label: "Case Studies", icon: "work" },
  { to: "/training", label: "Training", icon: "training" },
  { to: "/about", label: "About", icon: "about" },
  { to: "/careers", label: "Careers", icon: "careers" },
] as const;

export const footerNav = [
  { to: "/services", label: "Services", icon: "services" },
  { to: "/scientific-ai", label: "Scientific AI", icon: "scientific" },
  { to: "/case-studies", label: "Case Studies", icon: "work" },
  { to: "/training", label: "Training", icon: "training" },
  { to: "/about", label: "About", icon: "about" },
  { to: "/careers", label: "Careers", icon: "careers" },
] as const;

export const legalNav = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
] as const;

// Platform roots only — no verified GeniusXLab org URLs exist in the repo yet.
export const social = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://github.com/", label: "GitHub" },
] as const;

export const serviceOptions = [
  "AI/ML Engineering",
  "Web Development",
  "AI Training",
  "Mathematics & Physics AI",
  "Data Engineering & MLOps",
  "AI Strategy & Consulting",
  "Other",
] as const;

export const stageOptions = [
  "Exploring an idea",
  "Planning a prototype",
  "Building a product",
  "Improving an existing system",
  "Training a team",
  "Other",
] as const;

export const seo = {
  title: "GeniusXLab — Applied AI, Software Engineering, and Technical Training",
  description:
    "GeniusXLab designs AI systems, web platforms, and practical training programs for organizations turning complex data and technical ideas into useful products.",
};
