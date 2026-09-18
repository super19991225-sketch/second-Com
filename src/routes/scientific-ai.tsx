import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/scientific-ai")({
  component: ScientificAILayout,
});

function ScientificAILayout() {
  return <Outlet />;
}
