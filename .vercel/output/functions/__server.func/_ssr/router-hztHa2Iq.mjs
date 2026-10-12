import { i as __toESM } from "../_runtime.mjs";
import { S as validateShopSearch, a as btnPrimary, d as fieldClass, i as btnOnDark, l as colorName, m as getProduct, o as cartTotals, p as formatPrice, r as btnGhost, t as FREE_SHIPPING_CENTS, x as sizeLabel, y as shopSearch } from "./ui-DBDEPd7n.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, Y as notFound, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as Menu, n as TriangleAlert, o as Plus, r as ShoppingBag, s as Minus, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-hztHa2Iq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Si è verificato un errore imprevisto. Ricarica la pagina.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-10 text-clay",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Qualcosa non ha funzionato"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-24 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-moss uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl text-ink",
				children: "Questa pagina non c'è"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-muted",
				children: "L'indirizzo non corrisponde a un capo né a una stanza del negozio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: btnPrimary,
					children: "Torna alla home"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/negozio",
					search: shopSearch(),
					className: btnGhost,
					children: "Vai al negozio"
				})]
			})
		]
	});
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
function same(a, b) {
	return a.slug === b.slug && a.size === b.size && a.color === b.color;
}
var useCart = create()(persist((set, get) => ({
	items: [],
	open: false,
	ready: false,
	setOpen: (open) => set({ open }),
	add: (item, qty = 1) => {
		const items = get().items;
		const index = items.findIndex((entry) => same(entry, item));
		const nextQty = Math.max(1, Math.min(8, qty));
		if (index >= 0) {
			const next = items.slice();
			const current = next[index];
			if (!current) return;
			next[index] = {
				...current,
				qty: Math.min(8, current.qty + nextQty)
			};
			set({
				items: next,
				open: true
			});
			return;
		}
		set({
			items: [...items, {
				...item,
				qty: nextQty
			}],
			open: true
		});
	},
	setQty: (item, qty) => {
		const nextQty = Math.max(0, Math.min(8, qty));
		set({ items: nextQty === 0 ? get().items.filter((entry) => !same(entry, item)) : get().items.map((entry) => same(entry, item) ? {
			...entry,
			qty: nextQty
		} : entry) });
	},
	remove: (item) => set({ items: get().items.filter((entry) => !same(entry, item)) }),
	clear: () => set({ items: [] })
}), {
	name: "nido-lino-cart",
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : window.localStorage),
	skipHydration: true,
	partialize: (state) => ({ items: state.items })
}));
function useCartCount() {
	return useCart((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
}
var emptyFields = {
	nome: "",
	email: "",
	indirizzo: "",
	citta: "",
	cap: ""
};
function validate(fields) {
	const errors = {};
	if (fields.nome.trim().length < 2) errors.nome = "Scrivi nome e cognome.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Inserisci un'email valida.";
	if (fields.indirizzo.trim().length < 5) errors.indirizzo = "Scrivi via e numero.";
	if (fields.citta.trim().length < 2) errors.citta = "Scrivi la città.";
	if (!/^\d{5}$/.test(fields.cap.trim())) errors.cap = "Il CAP è di 5 cifre.";
	return errors;
}
function Field({ id, label, value, error, autoComplete, inputMode, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		htmlFor: id,
		children: [
			label,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				name: id,
				value,
				autoComplete,
				inputMode,
				onChange: (event) => onChange(event.target.value),
				"aria-invalid": error ? true : void 0,
				"aria-describedby": error ? `${id}-err` : void 0,
				className: `${fieldClass} mt-2`
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: `${id}-err`,
				className: "mt-1 block text-sm text-clay",
				children: error
			}) : null
		]
	});
}
function CartDrawer() {
	const items = useCart((state) => state.items);
	const open = useCart((state) => state.open);
	const setOpen = useCart((state) => state.setOpen);
	const setQty = useCart((state) => state.setQty);
	const remove = useCart((state) => state.remove);
	const clear = useCart((state) => state.clear);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("bag");
	const [fields, setFields] = (0, import_react.useState)(emptyFields);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) return;
		const timer = window.setTimeout(() => setStep("bag"), 200);
		return () => window.clearTimeout(timer);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (items.length === 0 && step === "checkout") setStep("bag");
	}, [items.length, step]);
	const count = items.reduce((sum, item) => sum + item.qty, 0);
	const totals = cartTotals(items);
	const missing = FREE_SHIPPING_CENTS - totals.subtotal;
	const progress = Math.min(100, Math.round(totals.subtotal / FREE_SHIPPING_CENTS * 100));
	function setField(key, value) {
		setFields((current) => ({
			...current,
			[key]: value
		}));
	}
	function placeOrder(event) {
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
			code: `NL-${Math.floor(1e3 + Math.random() * 9e3)}`,
			total: snapshot.total,
			count: pieces
		});
		clear();
		setFields(emptyFields);
		setErrors({});
		setStep("done");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "veil-in fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "drawer-in fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-3xl",
					children: step === "done" ? "Ordine annotato" : "Carrello"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-sm text-muted",
					children: step === "done" ? "Nessun pagamento è stato preso." : count === 0 ? "Ancora vuoto" : count === 1 ? "1 capo" : `${count} capi`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "inline-flex h-11 w-11 items-center justify-center",
					"aria-label": "Chiudi carrello",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), step === "done" && receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col justify-between px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl text-moss",
					children: receipt.code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: [
						receipt.count === 1 ? "1 capo" : `${receipt.count} capi`,
						" per",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-ink",
							children: formatPrice(receipt.total)
						}),
						". È una simulazione: il carrello è stato svuotato e non parte nessuna spedizione."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${btnPrimary} w-full`,
					onClick: () => {
						setOpen(false);
						navigate({
							to: "/negozio",
							search: shopSearch()
						});
					},
					children: "Continua nel negozio"
				})]
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col justify-between px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-muted",
					children: "La borsa è vuota. I capi che aggiungi restano salvati in questo browser."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/negozio",
					search: shopSearch(),
					className: `${btnPrimary} w-full`,
					onClick: () => setOpen(false),
					children: "Vai al negozio"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((item) => {
					const product = getProduct(item.slug);
					const key = `${item.slug}-${item.size}-${item.color}`;
					if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between border-b border-line py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Capo non più in collezione"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-moss",
							onClick: () => remove(item),
							children: "Rimuovi"
						})]
					}, key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 border-b border-line py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/prodotto/$slug",
							params: { slug: product.slug },
							onClick: () => setOpen(false),
							className: "block h-20 w-16 shrink-0 overflow-hidden bg-moss-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: "",
								width: 64,
								height: 80,
								className: "h-full w-full max-w-none object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/prodotto/$slug",
										params: { slug: product.slug },
										onClick: () => setOpen(false),
										className: "font-display text-xl",
										children: product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "shrink-0 text-sm tabular-nums",
										children: formatPrice(product.price * item.qty)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										colorName(product, item.color),
										" · ",
										sizeLabel[item.size] ?? item.size
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center border border-line",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "inline-flex h-11 w-11 items-center justify-center",
												"aria-label": "Diminuisci quantità",
												disabled: item.qty <= 1,
												onClick: () => setQty(item, item.qty - 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-6 text-center text-sm tabular-nums",
												children: item.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "inline-flex h-11 w-11 items-center justify-center",
												"aria-label": "Aumenta quantità",
												disabled: item.qty >= 8,
												onClick: () => setQty(item, item.qty + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-sm text-muted underline-offset-4 hover:text-ink hover:underline",
										onClick: () => remove(item),
										children: "Rimuovi"
									})]
								})
							]
						})]
					}, key);
				}) }), step === "checkout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					id: "checkout",
					className: "space-y-4 py-5",
					noValidate: true,
					onSubmit: placeOrder,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Ordine dimostrativo. I dati restano in questa pagina e non vengono inviati."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "nome",
							label: "Nome e cognome",
							value: fields.nome,
							error: errors.nome,
							autoComplete: "name",
							onChange: (value) => setField("nome", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "email",
							label: "Email",
							value: fields.email,
							error: errors.email,
							autoComplete: "email",
							inputMode: "email",
							onChange: (value) => setField("email", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "indirizzo",
							label: "Indirizzo",
							value: fields.indirizzo,
							error: errors.indirizzo,
							autoComplete: "street-address",
							onChange: (value) => setField("indirizzo", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "citta",
								label: "Città",
								value: fields.citta,
								error: errors.citta,
								autoComplete: "address-level2",
								onChange: (value) => setField("citta", value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "cap",
								label: "CAP",
								value: fields.cap,
								error: errors.cap,
								autoComplete: "postal-code",
								inputMode: "numeric",
								onChange: (value) => setField("cap", value)
							})]
						})
					]
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line px-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1 bg-moss",
							style: { width: `${progress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: missing > 0 ? `Ti mancano ${formatPrice(missing)} per la spedizione gratuita.` : "Spedizione gratuita inclusa."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Subtotale"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: formatPrice(totals.subtotal)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Spedizione"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between pt-1 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Totale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: formatPrice(totals.total)
								})]
							})
						]
					}),
					step === "bag" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${btnPrimary} mt-4 w-full`,
						onClick: () => setStep("checkout"),
						children: "Procedi all'ordine"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							form: "checkout",
							className: `${btnPrimary} w-full`,
							children: "Conferma ordine dimostrativo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${btnOnDark} w-full border border-line`,
							onClick: () => setStep("bag"),
							children: "Torna al carrello"
						})]
					})
				]
			})] })]
		})] })
	});
}
function navClass(active) {
	return active ? "text-sm text-ink underline decoration-moss underline-offset-8" : "text-sm text-muted hover:text-ink";
}
function SiteShell({ children }) {
	const navigate = useNavigate();
	const path = useRouterState({ select: (state) => state.location.pathname });
	const setOpen = useCart((state) => state.setOpen);
	const count = useCartCount();
	const ready = useCart((state) => state.ready);
	const [menu, setMenu] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useCart.persist.rehydrate()).finally(() => {
			useCart.setState({ ready: true });
		});
	}, []);
	(0, import_react.useEffect)(() => {
		setMenu(false);
	}, [path]);
	function onSearch(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const q = String(data.get("q") ?? "");
		setMenu(false);
		navigate({
			to: "/negozio",
			search: shopSearch({ q })
		});
	}
	const shopActive = path.startsWith("/negozio") || path.startsWith("/prodotto");
	const shown = ready ? count : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#contenuto",
			className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2",
			children: "Vai al contenuto"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-moss text-center text-xs text-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-4 py-2",
						children: ["Spedizione gratuita da 79€", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: " · Resi entro 30 giorni · Cucito a Lucca"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 w-11 items-center justify-center md:hidden",
							"aria-label": menu ? "Chiudi menu" : "Apri menu",
							"aria-expanded": menu,
							onClick: () => setMenu((value) => !value),
							children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex shrink-0 items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl leading-none italic",
								children: "Nido"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-muted",
								children: "LINO"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "ml-4 hidden items-center gap-6 md:flex",
							"aria-label": "Principale",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: navClass(path === "/"),
									"aria-current": path === "/" ? "page" : void 0,
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/negozio",
									search: shopSearch(),
									className: navClass(shopActive),
									"aria-current": shopActive ? "page" : void 0,
									children: "Negozio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									hash: "atelier",
									className: navClass(false),
									children: "Atelier"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onSearch,
							className: "ml-auto hidden items-center lg:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "header-q",
									children: "Cerca"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "header-q",
									name: "q",
									placeholder: "Cerca un capo",
									autoComplete: "off",
									className: "h-10 w-44 border-b border-line bg-transparent text-sm outline-none placeholder:text-muted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "inline-flex h-11 w-11 items-center justify-center",
									"aria-label": "Cerca",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "relative ml-auto inline-flex h-11 w-11 items-center justify-center lg:ml-0",
							"aria-label": shown > 0 ? `Apri carrello, ${shown} articoli` : "Apri carrello",
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), shown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1 right-0 flex h-5 min-w-5 items-center justify-center bg-moss px-1 text-xs text-bg tabular-nums",
								children: shown
							}) : null]
						})
					]
				}),
				menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line px-4 py-4 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col",
						"aria-label": "Mobile",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "flex h-12 items-center font-display text-2xl",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/negozio",
								search: shopSearch(),
								className: "flex h-12 items-center font-display text-2xl",
								children: "Negozio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "atelier",
								className: "flex h-12 items-center font-display text-2xl",
								children: "Atelier"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onSearch,
						className: "mt-3 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "mobile-q",
								children: "Cerca"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "mobile-q",
								name: "q",
								placeholder: "Cerca un capo",
								autoComplete: "off",
								className: fieldClass
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "inline-flex h-11 w-11 shrink-0 items-center justify-center bg-moss text-bg",
								"aria-label": "Cerca",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
							})
						]
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "contenuto",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "bg-moss text-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl italic",
							children: "Nido Lino"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm leading-relaxed text-moss-soft",
							children: "Abbigliamento in fibre naturali per neonati e bambini, cucito a Lucca."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest uppercase",
						children: "Negozio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/negozio",
								search: shopSearch(),
								className: "underline-offset-4 hover:underline",
								children: "Tutti i capi"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/negozio",
								search: shopSearch({ categoria: "tutine" }),
								className: "underline-offset-4 hover:underline",
								children: "Tutine"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/negozio",
								search: shopSearch({ categoria: "regalo" }),
								className: "underline-offset-4 hover:underline",
								children: "Cofanetti"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "aiuto",
								className: "underline-offset-4 hover:underline",
								children: "Spedizione e resi"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest uppercase",
							children: "Atelier"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
							className: "mt-3 text-sm leading-relaxed text-moss-soft not-italic",
							children: [
								"Via della Fratta 18",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"55100 Lucca",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:ciao@nidolino.it",
									className: "text-bg underline-offset-4 hover:underline",
									children: "ciao@nidolino.it"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "contatti",
								className: "text-sm underline-offset-4 hover:underline",
								children: "Scrivici"
							})
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-moss-soft/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-6xl px-4 py-4 text-xs text-moss-soft md:px-6",
					children: "© 2026 Nido Lino. Negozio dimostrativo: nessun pagamento reale."
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {})
	] });
}
var styles_default = "/assets/styles-DBAF57wq.css";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Nido Lino" },
			{
				name: "description",
				content: "Abbigliamento in lino e cotone organico per neonati e bambini fino ai due anni. Atelier a Lucca."
			},
			{
				name: "theme-color",
				content: "#3E4A38"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Outfit:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "it",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-bg font-sans text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	}),
	notFoundComponent: NotFound
});
var $$splitComponentImporter$2 = () => import("./routes-BYpY0Rdp.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Nido Lino — Abbigliamento neonato e bambino" }, {
		name: "description",
		content: "Lino europeo e cotone organico per neonati e bambini fino ai due anni. Tutine, body, completi e cofanetti, cuciti a Lucca."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./negozio-BQg1_9TZ.mjs");
var Route$1 = createFileRoute("/negozio")({
	validateSearch: validateShopSearch,
	head: () => ({ meta: [{ title: "Negozio — Nido Lino" }, {
		name: "description",
		content: "Tutine, body, completi, vestiti e cofanetti in lino e cotone organico. Taglie dalla nascita ai 24 mesi."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./prodotto._slug-DEFfdgjk.mjs");
var Route = createFileRoute("/prodotto/$slug")({
	loader: ({ params }) => {
		const product = getProduct(params.slug);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.product.name} — Nido Lino` : "Nido Lino" }, {
		name: "description",
		content: loaderData?.product.description ?? ""
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	NegozioRoute: Route$1.update({
		id: "/negozio",
		path: "/negozio",
		getParentRoute: () => Route$3
	}),
	ProdottoSlugRoute: Route.update({
		id: "/prodotto/$slug",
		path: "/prodotto/$slug",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true,
		defaultPreload: "intent"
	});
}
//#endregion
export { Route as n, useCart as r, router_exports as t };
