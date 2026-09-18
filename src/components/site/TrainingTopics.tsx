import { SmartTicket } from "@/components/site/SmartTicket";
import { trainingTopics } from "@/data/training";

export function TrainingTopics() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {trainingTopics.map((topic, index) => (
        <li key={topic.title}>
          <SmartTicket
            image={topic.image}
            alt={topic.alt}
            eyebrow={`${String(index + 1).padStart(2, "0")} · Topic`}
            badge="Training"
            title={topic.title}
            icon={topic.icon}
            minClass="min-h-[16rem]"
          />
        </li>
      ))}
    </ul>
  );
}
