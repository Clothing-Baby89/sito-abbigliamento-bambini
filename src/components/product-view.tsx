import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart-store";
import {
  categoryLabel,
  colorName,
  formatPrice,
  relatedProducts,
  returnsNote,
  shippingNote,
  shopSearch,
  sizeGuide,
  sizeLabel,
  type Product,
  type SizeId,
} from "@/lib/catalog";
import { btnPrimary } from "@/lib/ui";

export function ProductView({ product }: { product: Product }) {
  const add = useCart((state) => state.add);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [sizeId, setSizeId] = useState<SizeId>(product.sizes[0] ?? "unica");
  const [qty, setQty] = useState(1);
  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const related = relatedProducts(product.slug);

  function onAdd() {
    if (!colorId || !sizeId) return;
    add({ slug: product.slug, color: colorId, size: sizeId }, qty);
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <nav aria-label="Percorso" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to="/negozio"
          search={shopSearch({ categoria: product.category })}
          className="hover:text-ink"
        >
          {categoryLabel(product.category)}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div className="frame-portrait overflow-hidden bg-moss-soft">
          <img
            src={product.image}
            alt={product.alt}
            width={900}
            height={1200}
            fetchPriority="high"
            className="h-full w-full max-w-none object-cover"
          />
        </div>

        <div className="md:sticky md:top-28 md:self-start">
          {product.badge ? <p className="text-xs tracking-widest text-clay uppercase">{product.badge}</p> : null}
          <h1 className="mt-2 font-display text-5xl">{product.name}</h1>
          <p className="mt-2 text-muted">{product.subtitle}</p>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-2xl tabular-nums">{formatPrice(product.price)}</p>
            {product.compareAt ? (
              <p className="text-sm text-muted tabular-nums line-through">
                {formatPrice(product.compareAt)}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <p className="text-sm">
              Colore <span className="text-muted">{color ? colorName(product, color.id) : ""}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={item.id === colorId}
                  onClick={() => setColorId(item.id)}
                  className={
                    item.id === colorId
                      ? "h-11 w-11 border border-ink p-1"
                      : "h-11 w-11 border border-line p-1"
                  }
                >
                  <span className="block h-full w-full" style={{ backgroundColor: item.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm">Taglia</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={size === sizeId}
                  onClick={() => setSizeId(size)}
                  className={
                    size === sizeId
                      ? "h-11 border border-moss bg-moss px-3 text-sm text-bg"
                      : "h-11 border border-line px-3 text-sm text-ink"
                  }
                >
                  {sizeLabel[size]}
                </button>
              ))}
            </div>
            {product.measure ? <p className="mt-2 text-sm text-muted">{product.measure}</p> : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center border border-line">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-label="Diminuisci quantità"
                disabled={qty <= 1}
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-label="Aumenta quantità"
                disabled={qty >= 8}
                onClick={() => setQty((value) => Math.min(8, value + 1))}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button type="button" onClick={onAdd} className={`${btnPrimary} sm:flex-1`}>
              Aggiungi al carrello
            </button>
          </div>
          <p className="mt-4 text-sm text-muted">Cucito a Lucca · spedizione in 2–4 giorni</p>
        </div>
      </div>

      <div className="mt-12 border-t border-line">
        <details className="border-b border-line" open>
          <summary className="flex h-14 items-center text-sm">Il capo</summary>
          <div className="pb-5">
            <p className="max-w-2xl text-sm leading-relaxed text-muted">{product.description}</p>
            <ul className="mt-4 max-w-2xl">
              {product.points.map((point) => (
                <li key={point} className="border-t border-line py-3 text-sm">
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{product.composition}</p>
            <p className="mt-1 text-sm text-muted">{product.care}</p>
          </div>
        </details>
        <details className="border-b border-line">
          <summary className="flex h-14 items-center text-sm">Guida taglie</summary>
          <div className="max-w-xl pb-5">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 font-medium">Taglia</th>
                  <th className="py-2 font-medium">Altezza</th>
                  <th className="py-2 font-medium">Peso</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map((row) => (
                  <tr key={row.size} className="border-t border-line">
                    <td className="py-2">{row.size}</td>
                    <td className="py-2">{row.height}</td>
                    <td className="py-2">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className="border-b border-line">
          <summary className="flex h-14 items-center text-sm">Spedizione e resi</summary>
          <div className="max-w-2xl space-y-2 pb-5 text-sm leading-relaxed text-muted">
            <p>{shippingNote}</p>
            <p>{returnsNote}</p>
          </div>
        </details>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-4xl">Altri capi</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
