import { Link } from "@tanstack/react-router";
import { shopSearch } from "@/lib/catalog";
import { btnGhost, btnPrimary } from "@/lib/ui";

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <p className="text-xs tracking-widest text-moss uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">Questa pagina non c'è</h1>
      <p className="mt-4 max-w-md text-muted">
        L'indirizzo non corrisponde a un capo né a una stanza del negozio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className={btnPrimary}>
          Torna alla home
        </Link>
        <Link to="/negozio" search={shopSearch()} className={btnGhost}>
          Vai al negozio
        </Link>
      </div>
    </div>
  );
}
