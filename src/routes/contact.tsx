import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useContactModal } from "@/components/site/ContactModal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GenixaLab LLC" },
      {
        name: "description",
        content: "Tell GenixaLab LLC what you are building. Email hello@genixalab.com.",
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
