import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductView } from "@/components/product-view";
import { getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/prodotto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.product.name} — Nido Lino` : "Nido Lino",
      },
      {
        name: "description",
        content: loaderData?.product.description ?? "",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return <ProductView key={product.slug} product={product} />;
}
