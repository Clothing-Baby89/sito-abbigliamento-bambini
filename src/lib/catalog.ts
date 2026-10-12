export type SizeId = "0-3" | "3-6" | "6-12" | "12-24" | "unica";

export type CategoryId =
  | "tutine"
  | "body"
  | "completi"
  | "vestiti"
  | "accessori"
  | "regalo";

export type Colorway = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  category: CategoryId;
  colors: Colorway[];
  sizes: SizeId[];
  image: string;
  alt: string;
  description: string;
  points: string[];
  composition: string;
  care: string;
  measure?: string;
  featured?: boolean;
  badge?: string;
};

export type ShopSearch = {
  categoria: string;
  eta: string;
  q: string;
  ordine: string;
};

const CARE =
  "Lavaggio delicato a 30°. Asciugare all'ombra. Stirare a medio calore sul rovescio.";

export const categories = [
  { id: "tutti", label: "Tutto" },
  { id: "tutine", label: "Tutine" },
  { id: "body", label: "Body" },
  { id: "completi", label: "Completi" },
  { id: "vestiti", label: "Vestiti" },
  { id: "accessori", label: "Accessori" },
  { id: "regalo", label: "Cofanetti" },
] as const;

export const ages = [
  { id: "tutte", label: "Tutte le età" },
  { id: "0-3", label: "0–3 mesi" },
  { id: "3-6", label: "3–6 mesi" },
  { id: "6-12", label: "6–12 mesi" },
  { id: "12-24", label: "12–24 mesi" },
] as const;

export const sizeLabel: Record<string, string> = {
  "0-3": "0–3 mesi",
  "3-6": "3–6 mesi",
  "6-12": "6–12 mesi",
  "12-24": "12–24 mesi",
  unica: "Taglia unica",
};

export const sizeGuide = [
  { size: "0–3 mesi", height: "50–62 cm", weight: "fino a 6 kg" },
  { size: "3–6 mesi", height: "62–68 cm", weight: "6–8 kg" },
  { size: "6–12 mesi", height: "68–80 cm", weight: "8–10 kg" },
  { size: "12–24 mesi", height: "80–92 cm", weight: "10–13 kg" },
];

export const FREE_SHIPPING_CENTS = 7900;
export const SHIPPING_CENTS = 590;

export const shippingNote =
  "In Italia in 2–4 giorni lavorativi. Gratuita da 79€, altrimenti 5,90€. Il pacco è carta e nastro di cotone.";

export const returnsNote =
  "Entro 30 giorni, se il capo non è stato lavato. Questo è un negozio dimostrativo: nessun pagamento viene addebitato.";

export const defaultShopSearch: ShopSearch = {
  categoria: "tutti",
  eta: "tutte",
  q: "",
  ordine: "consigliati",
};

export function shopSearch(patch: Partial<ShopSearch> = {}): ShopSearch {
  return { ...defaultShopSearch, ...patch };
}

const orders = ["consigliati", "prezzo-asc", "prezzo-desc", "nome"];

export function validateShopSearch(search: Record<string, unknown>): ShopSearch {
  const categoria = typeof search.categoria === "string" ? search.categoria : "tutti";
  const eta = typeof search.eta === "string" ? search.eta : "tutte";
  const ordine = typeof search.ordine === "string" ? search.ordine : "consigliati";
  const q = typeof search.q === "string" ? search.q : "";
  return {
    categoria: categories.some((item) => item.id === categoria) ? categoria : "tutti",
    eta: ages.some((item) => item.id === eta) ? eta : "tutte",
    ordine: orders.includes(ordine) ? ordine : "consigliati",
    q: q.slice(0, 80),
  };
}

export const products: Product[] = [
  {
    slug: "tutina-olivo",
    name: "Tutina Olivo",
    subtitle: "Lino lavato, bottoni in cocco",
    price: 4800,
    category: "tutine",
    colors: [
      { id: "oliva", name: "Oliva", hex: "#5E6B4E" },
      { id: "sabbia", name: "Sabbia", hex: "#E4D3B4" },
    ],
    sizes: ["0-3", "3-6", "6-12"],
    image: "/images/tutina-olivo.jpg",
    alt: "Tutina in lino verde oliva appesa a una gruccia di legno",
    description:
      "Tutina in lino lavato, morbida già al primo contatto. Le spalle a kimono si infilano senza tirare e i bottoni in cocco aprono tutto il davanti, per il cambio.",
    points: [
      "Spalle a kimono, si infila senza sfilare il capo",
      "Bottoni in cocco sul davanti",
      "Cuciture piatte, nessuna etichetta sulla pelle",
    ],
    composition: "100% lino europeo",
    care: CARE,
    featured: true,
    badge: "Novità",
  },
  {
    slug: "salopette-argilla",
    name: "Salopette Argilla",
    subtitle: "Twill di cotone, bottoni in ottone",
    price: 5800,
    category: "tutine",
    colors: [
      { id: "argilla", name: "Argilla", hex: "#C46A4A" },
      { id: "sabbia", name: "Sabbia", hex: "#E4D3B4" },
    ],
    sizes: ["3-6", "6-12", "12-24"],
    image: "/images/salopette-argilla.jpg",
    alt: "Salopette color argilla appesa a una gruccia di legno",
    description:
      "Salopette in twill di cotone color argilla, con bretelle che si allacciano a bottone. Il cavallo si apre, così il cambio resta un gesto solo.",
    points: [
      "Bretelle regolabili con bottoni",
      "Apertura al cavallo",
      "Taschino sul petto, cucito piatto",
    ],
    composition: "100% cotone organico",
    care: CARE,
  },
  {
    slug: "body-nuvola",
    name: "Body Nuvola",
    subtitle: "Cotone organico a maniche lunghe",
    price: 2800,
    category: "body",
    colors: [
      { id: "nuvola", name: "Nuvola", hex: "#F3EDE2" },
      { id: "grano", name: "Grano", hex: "#E6D3A8" },
    ],
    sizes: ["0-3", "3-6", "6-12", "12-24"],
    image: "/images/body-nuvola.jpg",
    alt: "Body crema in cotone a maniche lunghe, piegato su lino",
    description:
      "Body a maniche lunghe in cotone organico pettinato. Lo scollo a busta passa dalla testa senza pressione e i bottoni al cavallo sono privi di nichel.",
    points: [
      "Scollo a busta",
      "Bottoni al cavallo, nichel free",
      "Costine morbide, che non segnano",
    ],
    composition: "100% cotone organico",
    care: CARE,
    featured: true,
  },
  {
    slug: "completo-neve",
    name: "Completo Neve",
    subtitle: "Cardigan e pantalone in maglia",
    price: 7200,
    category: "completi",
    colors: [{ id: "neve", name: "Neve", hex: "#F4F0E8" }],
    sizes: ["3-6", "6-12", "12-24"],
    image: "/images/completo-neve.jpg",
    alt: "Completo panna in maglia di cotone, cardigan e pantalone",
    description:
      "Cardigan e pantalone in maglia di cotone, per la casa e per le mezze stagioni. I bottoni in legno sono cuciti con filo rinforzato.",
    points: [
      "Due pezzi, stessa maglia",
      "Bottoni in legno",
      "Vita del pantalone morbida, con elastico coperto",
    ],
    composition: "100% cotone",
    care: CARE,
    featured: true,
  },
  {
    slug: "cardigan-miele",
    name: "Cardigan Miele",
    subtitle: "Maglia di cotone, bottoni in legno",
    price: 6400,
    category: "completi",
    colors: [
      { id: "miele", name: "Miele", hex: "#C6A15B" },
      { id: "panna", name: "Panna", hex: "#F6F1E8" },
    ],
    sizes: ["0-3", "3-6", "6-12", "12-24"],
    image: "/images/cardigan-miele.jpg",
    alt: "Cardigan color miele appoggiato su uno sgabello di legno",
    description:
      "Cardigan in maglia di cotone color miele, spalla appena scesa. Si mette sopra il body quando la mattina è ancora fresca.",
    points: [
      "Spalla scesa, non stringe",
      "Bottoni in legno",
      "Orlo che copre la schiena anche da seduti",
    ],
    composition: "100% cotone",
    care: CARE,
    featured: true,
  },
  {
    slug: "vestitino-pesca",
    name: "Vestitino Pesca",
    subtitle: "Cotone garzato, fiocco in lino",
    price: 4600,
    compareAt: 5400,
    category: "vestiti",
    colors: [
      { id: "pesca", name: "Pesca", hex: "#E8B59A" },
      { id: "panna", name: "Panna", hex: "#F6F1E8" },
    ],
    sizes: ["6-12", "12-24"],
    image: "/images/vestitino-pesca.jpg",
    alt: "Vestitino color pesca in cotone, steso su lino avorio",
    description:
      "Vestitino in cotone garzato color pesca, gonna appena raccolta e fiocco in lino. Si chiude sulla schiena con bottoni a pressione.",
    points: [
      "Gonna morbida, non gonfia",
      "Chiusura a pressione sulla schiena",
      "Fodera in cotone sulla parte alta",
    ],
    composition: "100% cotone organico",
    care: CARE,
    badge: "Saldo",
  },
  {
    slug: "copertina-latte",
    name: "Copertina Latte",
    subtitle: "Mussola doppia",
    price: 3600,
    category: "accessori",
    colors: [{ id: "latte", name: "Latte", hex: "#E7DCC8" }],
    sizes: ["unica"],
    image: "/images/copertina-latte.jpg",
    alt: "Copertina in mussola color latte, piegata su legno chiaro",
    description:
      "Mussola doppia color latte. Leggera sulla culla e abbastanza ampia da avvolgere nel passeggino, senza diventare un fagotto.",
    points: [
      "Tessuto doppio, non trasparente",
      "Orlo arrotolato, niente frange che si impigliano",
      "Diventa più morbida a ogni lavaggio",
    ],
    composition: "100% cotone",
    care: CARE,
    measure: "80×80 cm.",
  },
  {
    slug: "cofanetto-nido",
    name: "Cofanetto Nido",
    subtitle: "Tutina Olivo e copertina Latte",
    price: 9800,
    category: "regalo",
    colors: [{ id: "oliva", name: "Oliva", hex: "#5E6B4E" }],
    sizes: ["0-3", "3-6"],
    image: "/images/cofanetto-nido.jpg",
    alt: "Scatola di lino aperta con tutina verde e mussola color latte",
    description:
      "La tutina Olivo e la copertina Latte, chiuse in una scatola di tela con nastro di cotone. Un arrivo, già impacchettato.",
    points: [
      "Tutina nella taglia scelta",
      "Copertina Latte 80×80 cm",
      "Scatola riutilizzabile, niente plastica",
    ],
    composition: "Lino e cotone, come i capi singoli",
    care: CARE,
    badge: "Regalo",
  },
];

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(cents: number) {
  return euro.format(cents / 100);
}

export function categoryLabel(id: string) {
  return categories.find((item) => item.id === id)?.label ?? id;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function colorName(product: Product, id: string) {
  return product.colors.find((color) => color.id === id)?.name ?? id;
}

export function filterProducts(query: ShopSearch) {
  const needle = query.q.trim().toLowerCase();
  const list = products.filter((product) => {
    if (query.categoria !== "tutti" && product.category !== query.categoria) return false;
    if (
      query.eta !== "tutte" &&
      !product.sizes.includes("unica") &&
      !product.sizes.includes(query.eta as SizeId)
    ) {
      return false;
    }
    if (!needle) return true;
    const hay =
      `${product.name} ${product.subtitle} ${product.description} ${categoryLabel(product.category)}`.toLowerCase();
    return hay.includes(needle);
  });
  const sorted = [...list];
  if (query.ordine === "prezzo-asc") sorted.sort((a, b) => a.price - b.price);
  else if (query.ordine === "prezzo-desc") sorted.sort((a, b) => b.price - a.price);
  else if (query.ordine === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "it"));
  return sorted;
}

export function relatedProducts(slug: string) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, 3);
  const same = products.filter(
    (product) => product.category === current.category && product.slug !== slug,
  );
  const rest = products.filter(
    (product) => product.slug !== slug && product.category !== current.category,
  );
  return [...same, ...rest].slice(0, 3);
}

export function cartTotals(items: { slug: string; qty: number }[]) {
  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.slug);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS;
  return { subtotal, shipping, total: subtotal + shipping };
}
