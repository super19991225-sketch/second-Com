import { Atom, Brain, Compass, Database, Globe, GraduationCap } from "lucide-react";

const icons = {
  brain: Brain,
  globe: Globe,
  graduation: GraduationCap,
  atom: Atom,
  database: Database,
  compass: Compass,
} as const;

export function ServiceIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon className="size-5" aria-hidden />;
}
