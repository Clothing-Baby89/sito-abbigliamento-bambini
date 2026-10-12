import { i as __toESM } from "../_runtime.mjs";
import { _ as returnsNote, a as btnPrimary, b as sizeGuide, c as categoryLabel, g as relatedProducts, l as colorName, p as formatPrice, v as shippingNote, x as sizeLabel, y as shopSearch } from "./ui-DBDEPd7n.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ProductCard } from "./product-card-DT2cgDG0.mjs";
import { o as Plus, s as Minus } from "../_libs/lucide-react.mjs";
import { n as Route, r as useCart } from "./router-hztHa2Iq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prodotto._slug-DEFfdgjk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductView({ product }) {
	const add = useCart((state) => state.add);
	const [colorId, setColorId] = (0, import_react.useState)(product.colors[0]?.id ?? "");
	const [sizeId, setSizeId] = (0, import_react.useState)(product.sizes[0] ?? "unica");
	const [qty, setQty] = (0, import_react.useState)(1);
	const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
	const related = relatedProducts(product.slug);
	function onAdd() {
		if (!colorId || !sizeId) return;
		add({
			slug: product.slug,
			color: colorId,
			size: sizeId
		}, qty);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Percorso",
				className: "mb-6 flex flex-wrap items-center gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-ink",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/negozio",
						search: shopSearch({ categoria: product.category }),
						className: "hover:text-ink",
						children: categoryLabel(product.category)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-8 md:grid-cols-2 md:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "frame-portrait overflow-hidden bg-moss-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.alt,
						width: 900,
						height: 1200,
						fetchPriority: "high",
						className: "h-full w-full max-w-none object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:sticky md:top-28 md:self-start",
					children: [
						product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-clay uppercase",
							children: product.badge
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: product.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl tabular-nums",
								children: formatPrice(product.price)
							}), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted tabular-nums line-through",
								children: formatPrice(product.compareAt)
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: ["Colore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: color ? colorName(product, color.id) : ""
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: product.colors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": item.name,
									"aria-pressed": item.id === colorId,
									onClick: () => setColorId(item.id),
									className: item.id === colorId ? "h-11 w-11 border border-ink p-1" : "h-11 w-11 border border-line p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block h-full w-full",
										style: { backgroundColor: item.hex }
									})
								}, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Taglia"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: product.sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": size === sizeId,
										onClick: () => setSizeId(size),
										className: size === sizeId ? "h-11 border border-moss bg-moss px-3 text-sm text-bg" : "h-11 border border-line px-3 text-sm text-ink",
										children: sizeLabel[size]
									}, size))
								}),
								product.measure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: product.measure
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center border border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex h-11 w-11 items-center justify-center",
										"aria-label": "Diminuisci quantità",
										disabled: qty <= 1,
										onClick: () => setQty((value) => Math.max(1, value - 1)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-center text-sm tabular-nums",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex h-11 w-11 items-center justify-center",
										"aria-label": "Aumenta quantità",
										disabled: qty >= 8,
										onClick: () => setQty((value) => Math.min(8, value + 1)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onAdd,
								className: `${btnPrimary} sm:flex-1`,
								children: "Aggiungi al carrello"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "Cucito a Lucca · spedizione in 2–4 giorni"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "border-b border-line",
						open: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "flex h-14 items-center text-sm",
							children: "Il capo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pb-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-2xl text-sm leading-relaxed text-muted",
									children: product.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 max-w-2xl",
									children: product.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "border-t border-line py-3 text-sm",
										children: point
									}, point))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted",
									children: product.composition
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: product.care
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "flex h-14 items-center text-sm",
							children: "Guida taglie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-xl pb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 font-medium",
											children: "Taglia"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 font-medium",
											children: "Altezza"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 font-medium",
											children: "Peso"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sizeGuide.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: row.size
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: row.height
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: row.weight
										})
									]
								}, row.size)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "flex h-14 items-center text-sm",
							children: "Spedizione e resi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl space-y-2 pb-5 text-sm leading-relaxed text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: shippingNote }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: returnsNote })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Altri capi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: item }, item.slug))
				})]
			})
		]
	});
}
function ProductPage() {
	const { product } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductView, { product }, product.slug);
}
//#endregion
export { ProductPage as component };
