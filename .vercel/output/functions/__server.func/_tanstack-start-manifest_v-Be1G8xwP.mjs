//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Be1G8xwP.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/negozio",
			"/prodotto/$slug"
		],
		preloads: ["/assets/index-oDzDho0W.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-oDzDho0W.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-CER7WAgu.js", "/assets/product-card-svmjf9Te.js"]
	},
	"/negozio": {
		filePath: "/workspace/src/routes/negozio.tsx",
		children: void 0,
		preloads: ["/assets/negozio-C_8_UV1_.js", "/assets/product-card-svmjf9Te.js"]
	},
	"/prodotto/$slug": {
		filePath: "/workspace/src/routes/prodotto.$slug.tsx",
		children: void 0,
		preloads: ["/assets/prodotto._slug-CXvuH_aa.js", "/assets/product-card-svmjf9Te.js"]
	}
} });
//#endregion
export { tsrStartManifest };
