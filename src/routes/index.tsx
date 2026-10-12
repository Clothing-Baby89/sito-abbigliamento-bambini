import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nido Lino — Abbigliamento neonato e bambino" },
      {
        name: "description",
        content:
          "Lino europeo e cotone organico per neonati e bambini fino ai due anni. Tutine, body, completi e cofanetti, cuciti a Lucca.",
      },
    ],
  }),
  component: HomePage,
});
