import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ProductCard } from "@/components/product-card";
import {
  ages,
  categories,
  categoryLabel,
  defaultShopSearch,
  filterProducts,
  type ShopSearch,
} from "@/lib/catalog";
import { btnGhost, btnPrimary, fieldClass } from "@/lib/ui";

function Choice({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={
        pressed
          ? "h-11 bg-moss px-3 text-sm text-bg"
          : "h-11 border border-line bg-surface px-3 text-sm text-ink"
      }
    >
      {children}
    </button>
  );
}

export function ShopPage() {
  const search = useSearch({ from: "/negozio" });
  const navigate = useNavigate({ from: "/negozio" });
  const [query, setQuery] = useState(search.q);

  useEffect(() => {
    setQuery(search.q);
  }, [search.q]);

  function setSearch(patch: Partial<ShopSearch>) {
    void navigate({
      to: "/negozio",
      search: { ...search, ...patch },
      replace: true,
    });
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch({ q: query });
  }

  const list = filterProducts(search);
  const heading = search.categoria === "tutti" ? "Il negozio" : categoryLabel(search.categoria);
  const dirty =
    search.categoria !== "tutti" ||
    search.eta !== "tutte" ||
    search.q !== "" ||
    search.ordine !== "consigliati";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs tracking-widest text-moss uppercase">Collezione</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">{heading}</h1>
      <p className="mt-3 max-w-xl text-muted">
        Capi in lino e cotone per neonati e bambini, dalla nascita ai due anni.
      </p>
      {search.q ? (
        <p className="mt-2 text-sm text-muted">Risultati per «{search.q}».</p>
      ) : null}

      <form className="mt-6 flex gap-2" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="shop-q">
          Cerca nel negozio
        </label>
        <input
          id="shop-q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cerca tutina, lino, cofanetto"
          autoComplete="off"
          className={fieldClass}
        />
        <button type="submit" className={btnPrimary}>
          Cerca
        </button>
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <fieldset>
            <legend className="text-xs tracking-widest text-muted uppercase">Categoria</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((item) => (
                <Choice
                  key={item.id}
                  pressed={search.categoria === item.id}
                  onClick={() => setSearch({ categoria: item.id })}
                >
                  {item.label}
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="text-xs tracking-widest text-muted uppercase">Età</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ages.map((item) => (
                <Choice
                  key={item.id}
                  pressed={search.eta === item.id}
                  onClick={() => setSearch({ eta: item.id })}
                >
                  {item.label}
                </Choice>
              ))}
            </div>
          </fieldset>
          {dirty ? (
            <button
              type="button"
              className="mt-4 text-sm text-moss underline-offset-4 hover:underline"
              onClick={() => {
                setQuery("");
                void navigate({ to: "/negozio", search: defaultShopSearch, replace: true });
              }}
            >
              Azzera filtri
            </button>
          ) : null}
        </aside>

        <div className="min-w-0 lg:col-span-3">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted tabular-nums">
              {list.length === 1 ? "1 capo" : `${list.length} capi`}
            </p>
            <label className="text-sm text-muted" htmlFor="ordine">
              <span className="sr-only">Ordina</span>
              <select
                id="ordine"
                value={search.ordine}
                onChange={(event) => setSearch({ ordine: event.target.value })}
                className="h-11 border border-line bg-surface px-3 text-sm text-ink outline-none"
              >
                <option value="consigliati">Consigliati</option>
                <option value="prezzo-asc">Prezzo crescente</option>
                <option value="prezzo-desc">Prezzo decrescente</option>
                <option value="nome">Nome</option>
              </select>
            </label>
          </div>

          {list.length === 0 ? (
            <div className="border border-line px-6 py-16 text-center">
              <h2 className="font-display text-3xl">Nessun capo</h2>
              <p className="mt-2 text-muted">Prova un'altra età o togli la ricerca.</p>
              <button
                type="button"
                className={`${btnGhost} mt-6`}
                onClick={() => {
                  setQuery("");
                  void navigate({ to: "/negozio", search: defaultShopSearch, replace: true });
                }}
              >
                Azzera filtri
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 xl:grid-cols-3">
              {list.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
