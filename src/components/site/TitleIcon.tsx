import {
  Atom,
  BookOpen,
  Briefcase,
  ChartLine,
  FileSearch,
  FileText,
  FolderKanban,
  GraduationCap,
  House,
  Layers,
  Mail,
  Microscope,
  Scale,
  Shield,
  Sparkles,
  Tags,
  Users,
  Workflow,
  Bot,
  Brain,
  Compass,
  Database,
  Globe,
  Rocket,
  Triangle,
} from "lucide-react";

const icons = {
  home: House,
  services: Layers,
  scientific: Atom,
  work: FolderKanban,
  training: GraduationCap,
  about: Users,
  contact: Mail,
  careers: Briefcase,
  privacy: Scale,
  terms: FileText,
  process: Workflow,
  spark: Sparkles,
  brain: Brain,
  globe: Globe,
  database: Database,
  compass: Compass,
  bot: Bot,
  search: FileSearch,
  chart: ChartLine,
  tags: Tags,
  rocket: Rocket,
  shield: Shield,
  triangle: Triangle,
  scope: Microscope,
  book: BookOpen,
} as const;

export type TitleIconName = keyof typeof icons;

export function TitleIcon({
  name,
  className = "size-5",
}: {
  name: TitleIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
