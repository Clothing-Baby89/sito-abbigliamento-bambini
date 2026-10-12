import { p as formatPrice } from "./ui-DBDEPd7n.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-DT2cgDG0.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/prodotto/$slug",
		params: { slug: product.slug },
		className: "group block min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "frame-portrait relative overflow-hidden bg-moss-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.alt,
					width: 900,
					height: 1200,
					loading: "lazy",
					className: "h-full w-full max-w-none object-cover transition-transform duration-200 group-hover:scale-105"
				}), product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 left-3 bg-surface px-2 py-1 text-xs text-clay",
					children: product.badge
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-2xl text-ink group-hover:text-moss",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: product.subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm tabular-nums",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(product.price) }), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-muted line-through",
					children: formatPrice(product.compareAt)
				}) : null]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
