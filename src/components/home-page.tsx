import { Link } from "@tanstack/react-router";
import { Droplets, Leaf, MapPin, Shirt } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  formatPrice,
  getProduct,
  products,
  shopSearch,
} from "@/lib/catalog";
import { btnGhost, btnOnDark, btnPrimary, fieldClass } from "@/lib/ui";

const trusts = [
  { icon: Leaf, title: "Fibre certificate", text: "Lino europeo e cotone organico." },
  { icon: Shirt, title: "Cuciture piatte", text: "Nessuna etichetta sulla pelle." },
  { icon: Droplets, title: "Lavabile a 30°", text: "Pensati per il bucato vero." },
  { icon: MapPin, title: "Cucito a Lucca", text: "Controllati in atelier prima di partire." },
];

export function HomePage() {
  const featured = products.filter((product) => product.featured);
  const families = categories.filter((item) => item.id !== "tutti");
  const gift = getProduct("cofanetto-nido");
  const [news, setNews] = useState<"idle" | "done" | "bad">("idle");
  const [contact, setContact] = useState<"idle" | "done" | "bad">("idle");

  function onNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNews("bad");
      return;
    }
    setNews("done");
    event.currentTarget.reset();
  }

  function onContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const messaggio = String(data.get("messaggio") ?? "").trim();
    if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || messaggio.length < 8) {
      setContact("bad");
      return;
    }
    setContact("done");
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-16">
        <div>
          <p className="text-xs tracking-widest text-moss uppercase">Collezione autunno · 0–24 mesi</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl">
            Vestiti morbidi, fatti per essere <span className="italic text-moss">vissuti.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Lino europeo e cotone organico per neonati e bambini. Cuciture piatte, tinture in piccoli
            lotti, confezionati a Lucca.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/negozio" search={shopSearch()} className={btnPrimary}>
              Vai al negozio
            </Link>
            <Link to="/" hash="atelier" className={btnGhost}>
              L'atelier
            </Link>
          </div>
        </div>
        <figure>
          <div className="frame-wide overflow-hidden bg-moss-soft">
            <img
              src="/images/hero.jpg"
              alt="Capi in lino piegati su un tavolo di rovere, con un ramoscello di olivo"
              width={1200}
              height={800}
              fetchPriority="high"
              className="h-full w-full max-w-none object-cover"
            />
          </div>
          <figcaption className="mt-3 flex justify-between text-xs tracking-widest text-muted uppercase">
            <span>Lino lavato</span>
            <span>Lucca</span>
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-line">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
          {trusts.map((item) => (
            <li key={item.title} className="flex gap-3">
              <item.icon className="mt-0.5 size-5 shrink-0 text-moss" aria-hidden="true" />
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="font-display text-4xl md:text-5xl">Le famiglie di capi</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          {families.map((family) => {
            const cover = products.find((product) => product.category === family.id) ?? products[0];
            const count = products.filter((product) => product.category === family.id).length;
            if (!cover) return null;
            return (
              <Link
                key={family.id}
                to="/negozio"
                search={shopSearch({ categoria: family.id })}
                className="group min-w-0"
              >
                <div className="frame-story overflow-hidden bg-moss-soft">
                  <img
                    src={cover.image}
                    alt=""
                    width={900}
                    height={675}
                    loading="lazy"
                    className="h-full w-full max-w-none object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl group-hover:text-moss">{family.label}</span>
                  <span className="text-xs text-muted tabular-nums">
                    {count === 1 ? "1 capo" : `${count} capi`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-5xl">Scelti in atelier</h2>
          <Link
            to="/negozio"
            search={shopSearch()}
            className="shrink-0 text-sm text-moss underline-offset-4 hover:underline"
          >
            Vedi tutto
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section
        id="atelier"
        className="scroll-mt-32 mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-2 md:px-6 md:py-16"
      >
        <div className="frame-story overflow-hidden bg-moss-soft">
          <img
            src="/images/atelier.jpg"
            alt="Tavolo da lavoro con cardigan color miele, forbici e filo verde"
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full max-w-none object-cover"
          />
        </div>
        <div>
          <p className="text-xs tracking-widest text-moss uppercase">Lucca, dal 2019</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Un nido di lino</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Nido Lino è un laboratorio piccolo quanto basta. Scegliamo lino europeo e cotone organico,
            li tingiamo in lotti brevi e li cuciamo con cuciture piatte. I capi vengono lavati prima di
            partire, così il lino arriva già morbido.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Le taglie coprono i primi due anni: dal primo body fino ai pantaloni di chi cammina già.
          </p>
          <p className="mt-6 text-sm">Via della Fratta 18, Lucca</p>
        </div>
      </section>

      {gift ? (
        <section className="bg-moss text-bg">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
            <div className="frame-portrait overflow-hidden">
              <img
                src={gift.image}
                alt={gift.alt}
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full max-w-none object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase">Per un arrivo</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Il cofanetto Nido</h2>
              <p className="mt-4 max-w-md leading-relaxed text-moss-soft">
                Tutina Olivo e copertina Latte, pronti da regalare. Scatola in tela, nastro di cotone,
                niente plastica. {formatPrice(gift.price)}.
              </p>
              <Link
                to="/prodotto/$slug"
                params={{ slug: gift.slug }}
                className={`${btnOnDark} mt-8`}
              >
                Guarda il cofanetto
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <blockquote className="font-display text-3xl leading-snug italic md:text-5xl">
          «La pelle nuova non ha bisogno di etichette che grattano.»
        </blockquote>
        <p className="mt-6 text-xs tracking-widest text-muted uppercase">Giulia Ferrè · fondatrice</p>
      </section>

      <section id="aiuto" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:px-6">
          <div>
            <h2 className="font-display text-3xl">Spedizione</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              In Italia in 2–4 giorni lavorativi. Gratuita da 79€, altrimenti 5,90€. Pacco in carta e
              nastro di cotone.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Resi</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              30 giorni se il capo non è stato lavato. In questa demo il reso è solo descritto: non
              c'è un pagamento da stornare.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Taglie</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Dalla nascita ai 24 mesi. Ogni scheda ha la guida altezza e peso. Gli accessori in mussola
              sono in taglia unica.
            </p>
          </div>
        </div>
      </section>

      <section id="contatti" className="scroll-mt-32 border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
          <div id="novita">
            <h2 className="font-display text-4xl">Resta nel nido</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Una nota quando esce una collezione. Niente altro. In questa demo l'indirizzo non lascia
              la pagina.
            </p>
            <form className="mt-6" onSubmit={onNews}>
              <label className="block text-sm" htmlFor="news-email">
                Email
                <input
                  id="news-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`${fieldClass} mt-2`}
                />
              </label>
              <button type="submit" className={`${btnPrimary} mt-4`}>
                Iscrivimi
              </button>
              {news === "bad" ? (
                <p className="mt-3 text-sm text-clay">Controlla l'email e riprova.</p>
              ) : null}
              {news === "done" ? (
                <p className="mt-3 text-sm text-moss">Annotata. Nessuna email è partita.</p>
              ) : null}
            </form>
          </div>
          <div>
            <h2 className="font-display text-4xl">Scrivici</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Per una taglia, un regalo o una tinta. Risposta d'atelier, non di un centralino.
            </p>
            <form className="mt-6 space-y-4" onSubmit={onContact}>
              <label className="block text-sm" htmlFor="contact-nome">
                Nome
                <input id="contact-nome" name="nome" autoComplete="name" className={`${fieldClass} mt-2`} />
              </label>
              <label className="block text-sm" htmlFor="contact-email">
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`${fieldClass} mt-2`}
                />
              </label>
              <label className="block text-sm" htmlFor="contact-msg">
                Messaggio
                <textarea
                  id="contact-msg"
                  name="messaggio"
                  rows={4}
                  className="mt-2 w-full border border-line bg-bg px-3 py-3 text-sm text-ink outline-none"
                />
              </label>
              <button type="submit" className={btnPrimary}>
                Invia
              </button>
              {contact === "bad" ? (
                <p className="text-sm text-clay">Servono nome, email e un messaggio di qualche parola.</p>
              ) : null}
              {contact === "done" ? (
                <p className="text-sm text-moss">Ricevuto qui. In demo non parte nessuna email.</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
