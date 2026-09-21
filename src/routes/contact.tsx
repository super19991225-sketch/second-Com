import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useContactModal } from "@/components/site/ContactModal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GeniusXLab" },
      {
        name: "description",
        content: "Tell GeniusXLab what you are building. Email hello@genxalab.com.",
      },
    ],
  }),
  component: ContactRedirectPage,
});

function ContactRedirectPage() {
  const navigate = useNavigate();
  const { openContact } = useContactModal();

  useEffect(() => {
    openContact();
    void navigate({ to: "/", replace: true });
  }, [navigate, openContact]);

  return null;
}
