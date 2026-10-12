import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/prodotto/$slug"
      params={{ slug: product.slug }}
      className="group block min-w-0"
    >
      <div className="frame-portrait relative overflow-hidden bg-moss-soft">
        <img
          src={product.image}
          alt={product.alt}
          width={900}
          height={1200}
          loading="lazy"
          className="h-full w-full max-w-none object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute top-3 left-3 bg-surface px-2 py-1 text-xs text-clay">
            {product.badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-2xl text-ink group-hover:text-moss">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-muted">{product.subtitle}</p>
      <p className="mt-2 text-sm tabular-nums">
        <span>{formatPrice(product.price)}</span>
        {product.compareAt ? (
          <span className="ml-2 text-muted line-through">
            {formatPrice(product.compareAt)}
          </span>
        ) : null}
      </p>
    </Link>
  );
}
