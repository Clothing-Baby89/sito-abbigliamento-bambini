import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart, useCartCount } from "@/lib/cart-store";
import { shopSearch } from "@/lib/catalog";
import { fieldClass } from "@/lib/ui";

function navClass(active: boolean) {
  return active
    ? "text-sm text-ink underline decoration-moss underline-offset-8"
    : "text-sm text-muted hover:text-ink";
}

export function SiteShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const setOpen = useCart((state) => state.setOpen);
  const count = useCartCount();
  const ready = useCart((state) => state.ready);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    void Promise.resolve(useCart.persist.rehydrate()).finally(() => {
      useCart.setState({ ready: true });
    });
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = String(data.get("q") ?? "");
    setMenu(false);
    void navigate({ to: "/negozio", search: shopSearch({ q }) });
  }

  const shopActive = path.startsWith("/negozio") || path.startsWith("/prodotto");
  const shown = ready ? count : 0;

  return (
    <>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
      >
        Vai al contenuto
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-md">
        <div className="bg-moss text-center text-xs text-bg">
          <p className="px-4 py-2">
            Spedizione gratuita da 79€
            <span className="hidden sm:inline"> · Resi entro 30 giorni · Cucito a Lucca</span>
          </p>
        </div>
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-6">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={menu ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menu}
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="flex shrink-0 items-baseline gap-2">
            <span className="font-display text-3xl leading-none italic">Nido</span>
            <span className="text-xs tracking-widest text-muted">LINO</span>
          </Link>
          <nav className="ml-4 hidden items-center gap-6 md:flex" aria-label="Principale">
            <Link to="/" className={navClass(path === "/")} aria-current={path === "/" ? "page" : undefined}>
              Home
            </Link>
            <Link
              to="/negozio"
              search={shopSearch()}
              className={navClass(shopActive)}
              aria-current={shopActive ? "page" : undefined}
            >
              Negozio
            </Link>
            <Link to="/" hash="atelier" className={navClass(false)}>
              Atelier
            </Link>
          </nav>
          <form onSubmit={onSearch} className="ml-auto hidden items-center lg:flex">
            <label className="sr-only" htmlFor="header-q">
              Cerca
            </label>
            <input
              id="header-q"
              name="q"
              placeholder="Cerca un capo"
              autoComplete="off"
              className="h-10 w-44 border-b border-line bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button type="submit" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Cerca">
              <Search className="size-5" />
            </button>
          </form>
          <button
            type="button"
            className="relative ml-auto inline-flex h-11 w-11 items-center justify-center lg:ml-0"
            aria-label={shown > 0 ? `Apri carrello, ${shown} articoli` : "Apri carrello"}
            onClick={() => setOpen(true)}
          >
            <ShoppingBag className="size-5" />
            {shown > 0 ? (
              <span className="absolute top-1 right-0 flex h-5 min-w-5 items-center justify-center bg-moss px-1 text-xs text-bg tabular-nums">
                {shown}
              </span>
            ) : null}
          </button>
        </div>
        {menu ? (
          <div className="border-t border-line px-4 py-4 md:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              <Link to="/" className="flex h-12 items-center font-display text-2xl">
                Home
              </Link>
              <Link to="/negozio" search={shopSearch()} className="flex h-12 items-center font-display text-2xl">
                Negozio
              </Link>
              <Link to="/" hash="atelier" className="flex h-12 items-center font-display text-2xl">
                Atelier
              </Link>
            </nav>
            <form onSubmit={onSearch} className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor="mobile-q">
                Cerca
              </label>
              <input
                id="mobile-q"
                name="q"
                placeholder="Cerca un capo"
                autoComplete="off"
                className={fieldClass}
              />
              <button type="submit" className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-moss text-bg" aria-label="Cerca">
                <Search className="size-5" />
              </button>
            </form>
          </div>
        ) : null}
      </header>
      <main id="contenuto">{children}</main>
      <footer className="bg-moss text-bg">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
          <div className="md:col-span-2">
            <p className="font-display text-4xl italic">Nido Lino</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-moss-soft">
              Abbigliamento in fibre naturali per neonati e bambini, cucito a Lucca.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase">Negozio</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/negozio" search={shopSearch()} className="underline-offset-4 hover:underline">
                  Tutti i capi
                </Link>
              </li>
              <li>
                <Link
                  to="/negozio"
                  search={shopSearch({ categoria: "tutine" })}
                  className="underline-offset-4 hover:underline"
                >
                  Tutine
                </Link>
              </li>
              <li>
                <Link
                  to="/negozio"
                  search={shopSearch({ categoria: "regalo" })}
                  className="underline-offset-4 hover:underline"
                >
                  Cofanetti
                </Link>
              </li>
              <li>
                <Link to="/" hash="aiuto" className="underline-offset-4 hover:underline">
                  Spedizione e resi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase">Atelier</p>
            <address className="mt-3 text-sm leading-relaxed text-moss-soft not-italic">
              Via della Fratta 18
              <br />
              55100 Lucca
              <br />
              <a href="mailto:ciao@nidolino.it" className="text-bg underline-offset-4 hover:underline">
                ciao@nidolino.it
              </a>
            </address>
            <p className="mt-4">
              <Link to="/" hash="contatti" className="text-sm underline-offset-4 hover:underline">
                Scrivici
              </Link>
            </p>
          </div>
        </div>
        <div className="border-t border-moss-soft/40">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-moss-soft md:px-6">
            © 2026 Nido Lino. Negozio dimostrativo: nessun pagamento reale.
          </p>
        </div>
      </footer>
      <CartDrawer />
    </>
  );
}
