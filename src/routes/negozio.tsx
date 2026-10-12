import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/shop-page";
import { validateShopSearch } from "@/lib/catalog";

export const Route = createFileRoute("/negozio")({
  validateSearch: validateShopSearch,
  head: () => ({
    meta: [
      { title: "Negozio — Nido Lino" },
      {
        name: "description",
        content:
          "Tutine, body, completi, vestiti e cofanetti in lino e cotone organico. Taglie dalla nascita ai 24 mesi.",
      },
    ],
  }),
  component: ShopPage,
});
