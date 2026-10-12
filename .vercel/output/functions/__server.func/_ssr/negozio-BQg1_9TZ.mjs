import { i as __toESM } from "../_runtime.mjs";
import { a as btnPrimary, c as categoryLabel, d as fieldClass, f as filterProducts, n as ages, r as btnGhost, s as categories, u as defaultShopSearch } from "./ui-DBDEPd7n.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useSearch, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ProductCard } from "./product-card-DT2cgDG0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/negozio-BQg1_9TZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Choice({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: pressed ? "h-11 bg-moss px-3 text-sm text-bg" : "h-11 border border-line bg-surface px-3 text-sm text-ink",
		children
	});
}
function ShopPage() {
	const search = useSearch({ from: "/negozio" });
	const navigate = useNavigate({ from: "/negozio" });
	const [query, setQuery] = (0, import_react.useState)(search.q);
	(0, import_react.useEffect)(() => {
		setQuery(search.q);
	}, [search.q]);
	function setSearch(patch) {
		navigate({
			to: "/negozio",
			search: {
				...search,
				...patch
			},
			replace: true
		});
	}
	function onSearch(event) {
		event.preventDefault();
		setSearch({ q: query });
	}
	const list = filterProducts(search);
	const heading = search.categoria === "tutti" ? "Il negozio" : categoryLabel(search.categoria);
	const dirty = search.categoria !== "tutti" || search.eta !== "tutte" || search.q !== "" || search.ordine !== "consigliati";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-moss uppercase",
				children: "Collezione"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl md:text-6xl",
				children: heading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: "Capi in lino e cotone per neonati e bambini, dalla nascita ai due anni."
			}),
			search.q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Risultati per «",
					search.q,
					"»."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex gap-2",
				onSubmit: onSearch,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "shop-q",
						children: "Cerca nel negozio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "shop-q",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Cerca tutina, lino, cofanetto",
						autoComplete: "off",
						className: fieldClass
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: btnPrimary,
						children: "Cerca"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs tracking-widest text-muted uppercase",
							children: "Categoria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								pressed: search.categoria === item.id,
								onClick: () => setSearch({ categoria: item.id }),
								children: item.label
							}, item.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-xs tracking-widest text-muted uppercase",
								children: "Età"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: ages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									pressed: search.eta === item.id,
									onClick: () => setSearch({ eta: item.id }),
									children: item.label
								}, item.id))
							})]
						}),
						dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 text-sm text-moss underline-offset-4 hover:underline",
							onClick: () => {
								setQuery("");
								navigate({
									to: "/negozio",
									search: defaultShopSearch,
									replace: true
								});
							},
							children: "Azzera filtri"
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted tabular-nums",
							children: list.length === 1 ? "1 capo" : `${list.length} capi`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm text-muted",
							htmlFor: "ordine",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Ordina"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "ordine",
								value: search.ordine,
								onChange: (event) => setSearch({ ordine: event.target.value }),
								className: "h-11 border border-line bg-surface px-3 text-sm text-ink outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "consigliati",
										children: "Consigliati"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "prezzo-asc",
										children: "Prezzo crescente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "prezzo-desc",
										children: "Prezzo decrescente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "nome",
										children: "Nome"
									})
								]
							})]
						})]
					}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-line px-6 py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: "Nessun capo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								children: "Prova un'altra età o togli la ricerca."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `${btnGhost} mt-6`,
								onClick: () => {
									setQuery("");
									navigate({
										to: "/negozio",
										search: defaultShopSearch,
										replace: true
									});
								},
								children: "Azzera filtri"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-x-4 gap-y-10 xl:grid-cols-3",
						children: list.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.slug))
					})]
				})]
			})
		]
	});
}
var SplitComponent = ShopPage;
//#endregion
export { SplitComponent as component };
