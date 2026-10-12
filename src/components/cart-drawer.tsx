import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-store";
import {
  FREE_SHIPPING_CENTS,
  cartTotals,
  colorName,
  formatPrice,
  getProduct,
  shopSearch,
  sizeLabel,
} from "@/lib/catalog";
import { btnOnDark, btnPrimary, fieldClass } from "@/lib/ui";

type Fields = {
  nome: string;
  email: string;
  indirizzo: string;
  citta: string;
  cap: string;
};

type FieldKey = keyof Fields;

const emptyFields: Fields = {
  nome: "",
  email: "",
  indirizzo: "",
  citta: "",
  cap: "",
};

function validate(fields: Fields): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  if (fields.nome.trim().length < 2) errors.nome = "Scrivi nome e cognome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Inserisci un'email valida.";
  }
  if (fields.indirizzo.trim().length < 5) errors.indirizzo = "Scrivi via e numero.";
  if (fields.citta.trim().length < 2) errors.citta = "Scrivi la città.";
  if (!/^\d{5}$/.test(fields.cap.trim())) errors.cap = "Il CAP è di 5 cifre.";
  return errors;
}

function Field({
  id,
  label,
  value,
  error,
  autoComplete,
  inputMode,
  onChange,
}: {
  id: FieldKey;
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  inputMode?: "numeric" | "email" | "text";
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${fieldClass} mt-2`}
      />
      {error ? (
        <span id={`${id}-err`} className="mt-1 block text-sm text-clay">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function CartDrawer() {
  const items = useCart((state) => state.items);
  const open = useCart((state) => state.open);
  const setOpen = useCart((state) => state.setOpen);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const navigate = useNavigate();
  const [step, setStep] = useState<"bag" | "checkout" | "done">("bag");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [receipt, setReceipt] = useState<{ code: string; total: number; count: number } | null>(
    null,
  );

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => setStep("bag"), 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (items.length === 0 && step === "checkout") setStep("bag");
  }, [items.length, step]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const totals = cartTotals(items);
  const missing = FREE_SHIPPING_CENTS - totals.subtotal;
  const progress = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_CENTS) * 100));

  function setField(key: FieldKey, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const snapshot = cartTotals(items);
    const pieces = items.reduce((sum, item) => sum + item.qty, 0);
    setReceipt({
      code: `NL-${Math.floor(1000 + Math.random() * 9000)}`,
      total: snapshot.total,
      count: pieces,
    });
    clear();
    setFields(emptyFields);
    setErrors({});
    setStep("done");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="veil-in fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="drawer-in fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface outline-none">
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <Dialog.Title className="font-display text-3xl">
                {step === "done" ? "Ordine annotato" : "Carrello"}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted">
                {step === "done"
                  ? "Nessun pagamento è stato preso."
                  : count === 0
                    ? "Ancora vuoto"
                    : count === 1
                      ? "1 capo"
                      : `${count} capi`}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="inline-flex h-11 w-11 items-center justify-center"
              aria-label="Chiudi carrello"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          {step === "done" && receipt ? (
            <div className="flex flex-1 flex-col justify-between px-5 py-8">
              <div>
                <p className="font-display text-5xl text-moss">{receipt.code}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {receipt.count === 1 ? "1 capo" : `${receipt.count} capi`} per{" "}
                  <span className="tabular-nums text-ink">{formatPrice(receipt.total)}</span>.
                  È una simulazione: il carrello è stato svuotato e non parte nessuna spedizione.
                </p>
              </div>
              <button
                type="button"
                className={`${btnPrimary} w-full`}
                onClick={() => {
                  setOpen(false);
                  void navigate({ to: "/negozio", search: shopSearch() });
                }}
              >
                Continua nel negozio
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-1 flex-col justify-between px-5 py-8">
              <p className="max-w-xs text-muted">
                La borsa è vuota. I capi che aggiungi restano salvati in questo browser.
              </p>
              <Link
                to="/negozio"
                search={shopSearch()}
                className={`${btnPrimary} w-full`}
                onClick={() => setOpen(false)}
              >
                Vai al negozio
              </Link>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto px-5">
                <ul>
                  {items.map((item) => {
                    const product = getProduct(item.slug);
                    const key = `${item.slug}-${item.size}-${item.color}`;
                    if (!product) {
                      return (
                        <li key={key} className="flex items-center justify-between border-b border-line py-4">
                          <p className="text-sm">Capo non più in collezione</p>
                          <button type="button" className="text-sm text-moss" onClick={() => remove(item)}>
                            Rimuovi
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li key={key} className="flex gap-3 border-b border-line py-4">
                        <Link
                          to="/prodotto/$slug"
                          params={{ slug: product.slug }}
                          onClick={() => setOpen(false)}
                          className="block h-20 w-16 shrink-0 overflow-hidden bg-moss-soft"
                        >
                          <img
                            src={product.image}
                            alt=""
                            width={64}
                            height={80}
                            className="h-full w-full max-w-none object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <Link
                              to="/prodotto/$slug"
                              params={{ slug: product.slug }}
                              onClick={() => setOpen(false)}
                              className="font-display text-xl"
                            >
                              {product.name}
                            </Link>
                            <p className="shrink-0 text-sm tabular-nums">
                              {formatPrice(product.price * item.qty)}
                            </p>
                          </div>
                          <p className="text-sm text-muted">
                            {colorName(product, item.color)} · {sizeLabel[item.size] ?? item.size}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-line">
                              <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center"
                                aria-label="Diminuisci quantità"
                                disabled={item.qty <= 1}
                                onClick={() => setQty(item, item.qty - 1)}
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                              <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center"
                                aria-label="Aumenta quantità"
                                disabled={item.qty >= 8}
                                onClick={() => setQty(item, item.qty + 1)}
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                              onClick={() => remove(item)}
                            >
                              Rimuovi
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {step === "checkout" ? (
                  <form id="checkout" className="space-y-4 py-5" noValidate onSubmit={placeOrder}>
                    <p className="text-sm text-muted">
                      Ordine dimostrativo. I dati restano in questa pagina e non vengono inviati.
                    </p>
                    <Field id="nome" label="Nome e cognome" value={fields.nome} error={errors.nome} autoComplete="name" onChange={(value) => setField("nome", value)} />
                    <Field id="email" label="Email" value={fields.email} error={errors.email} autoComplete="email" inputMode="email" onChange={(value) => setField("email", value)} />
                    <Field id="indirizzo" label="Indirizzo" value={fields.indirizzo} error={errors.indirizzo} autoComplete="street-address" onChange={(value) => setField("indirizzo", value)} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="citta" label="Città" value={fields.citta} error={errors.citta} autoComplete="address-level2" onChange={(value) => setField("citta", value)} />
                      <Field id="cap" label="CAP" value={fields.cap} error={errors.cap} autoComplete="postal-code" inputMode="numeric" onChange={(value) => setField("cap", value)} />
                    </div>
                  </form>
                ) : null}
              </div>

              <div className="border-t border-line px-5 py-4">
                <div className="h-1 bg-line">
                  <div className="h-1 bg-moss" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted">
                  {missing > 0
                    ? `Ti mancano ${formatPrice(missing)} per la spedizione gratuita.`
                    : "Spedizione gratuita inclusa."}
                </p>
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotale</dt>
                    <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Spedizione</dt>
                    <dd className="tabular-nums">
                      {totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between pt-1 text-base">
                    <dt>Totale</dt>
                    <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
                  </div>
                </dl>
                {step === "bag" ? (
                  <button type="button" className={`${btnPrimary} mt-4 w-full`} onClick={() => setStep("checkout")}>
                    Procedi all'ordine
                  </button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <button type="submit" form="checkout" className={`${btnPrimary} w-full`}>
                      Conferma ordine dimostrativo
                    </button>
                    <button type="button" className={`${btnOnDark} w-full border border-line`} onClick={() => setStep("bag")}>
                      Torna al carrello
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
