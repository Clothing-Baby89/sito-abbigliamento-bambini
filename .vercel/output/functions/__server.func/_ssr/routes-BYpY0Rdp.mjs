import { i as __toESM } from "../_runtime.mjs";
import { a as btnPrimary, d as fieldClass, h as products, i as btnOnDark, m as getProduct, p as formatPrice, r as btnGhost, s as categories, y as shopSearch } from "./ui-DBDEPd7n.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ProductCard } from "./product-card-DT2cgDG0.mjs";
import { d as Droplets, i as Shirt, l as MapPin, u as Leaf } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BYpY0Rdp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var trusts = [
	{
		icon: Leaf,
		title: "Fibre certificate",
		text: "Lino europeo e cotone organico."
	},
	{
		icon: Shirt,
		title: "Cuciture piatte",
		text: "Nessuna etichetta sulla pelle."
	},
	{
		icon: Droplets,
		title: "Lavabile a 30°",
		text: "Pensati per il bucato vero."
	},
	{
		icon: MapPin,
		title: "Cucito a Lucca",
		text: "Controllati in atelier prima di partire."
	}
];
function HomePage() {
	const featured = products.filter((product) => product.featured);
	const families = categories.filter((item) => item.id !== "tutti");
	const gift = getProduct("cofanetto-nido");
	const [news, setNews] = (0, import_react.useState)("idle");
	const [contact, setContact] = (0, import_react.useState)("idle");
	function onNews(event) {
		event.preventDefault();
		const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setNews("bad");
			return;
		}
		setNews("done");
		event.currentTarget.reset();
	}
	function onContact(event) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-moss uppercase",
					children: "Collezione autunno · 0–24 mesi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl",
					children: ["Vestiti morbidi, fatti per essere ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-moss",
						children: "vissuti."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-base leading-relaxed text-muted",
					children: "Lino europeo e cotone organico per neonati e bambini. Cuciture piatte, tinture in piccoli lotti, confezionati a Lucca."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/negozio",
						search: shopSearch(),
						className: btnPrimary,
						children: "Vai al negozio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "atelier",
						className: btnGhost,
						children: "L'atelier"
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "frame-wide overflow-hidden bg-moss-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "Capi in lino piegati su un tavolo di rovere, con un ramoscello di olivo",
					width: 1200,
					height: 800,
					fetchPriority: "high",
					className: "h-full w-full max-w-none object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "mt-3 flex justify-between text-xs tracking-widest text-muted uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lino lavato" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lucca" })]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 md:px-6",
				children: trusts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
						className: "mt-0.5 size-5 shrink-0 text-moss",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: item.text
					})] })]
				}, item.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl md:text-5xl",
				children: "Le famiglie di capi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3",
				children: families.map((family) => {
					const cover = products.find((product) => product.category === family.id) ?? products[0];
					const count = products.filter((product) => product.category === family.id).length;
					if (!cover) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/negozio",
						search: shopSearch({ categoria: family.id }),
						className: "group min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "frame-story overflow-hidden bg-moss-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cover.image,
								alt: "",
								width: 900,
								height: 675,
								loading: "lazy",
								className: "h-full w-full max-w-none object-cover transition-transform duration-200 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl group-hover:text-moss",
								children: family.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted tabular-nums",
								children: count === 1 ? "1 capo" : `${count} capi`
							})]
						})]
					}, family.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl md:text-5xl",
					children: "Scelti in atelier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/negozio",
					search: shopSearch(),
					className: "shrink-0 text-sm text-moss underline-offset-4 hover:underline",
					children: "Vedi tutto"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4",
				children: featured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "atelier",
			className: "scroll-mt-32 mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-2 md:px-6 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "frame-story overflow-hidden bg-moss-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/atelier.jpg",
					alt: "Tavolo da lavoro con cardigan color miele, forbici e filo verde",
					width: 1200,
					height: 900,
					loading: "lazy",
					className: "h-full w-full max-w-none object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-moss uppercase",
					children: "Lucca, dal 2019"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl md:text-5xl",
					children: "Un nido di lino"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted",
					children: "Nido Lino è un laboratorio piccolo quanto basta. Scegliamo lino europeo e cotone organico, li tingiamo in lotti brevi e li cuciamo con cuciture piatte. I capi vengono lavati prima di partire, così il lino arriva già morbido."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted",
					children: "Le taglie coprono i primi due anni: dal primo body fino ai pantaloni di chi cammina già."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm",
					children: "Via della Fratta 18, Lucca"
				})
			] })]
		}),
		gift ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-moss text-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "frame-portrait overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: gift.image,
						alt: gift.alt,
						width: 900,
						height: 1200,
						loading: "lazy",
						className: "h-full w-full max-w-none object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest uppercase",
						children: "Per un arrivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl md:text-5xl",
						children: "Il cofanetto Nido"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-md leading-relaxed text-moss-soft",
						children: [
							"Tutina Olivo e copertina Latte, pronti da regalare. Scatola in tela, nastro di cotone, niente plastica. ",
							formatPrice(gift.price),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/prodotto/$slug",
						params: { slug: gift.slug },
						className: `${btnOnDark} mt-8`,
						children: "Guarda il cofanetto"
					})
				] })]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-20 text-center md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "font-display text-3xl leading-snug italic md:text-5xl",
				children: "«La pelle nuova non ha bisogno di etichette che grattano.»"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs tracking-widest text-muted uppercase",
				children: "Giulia Ferrè · fondatrice"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "aiuto",
			className: "scroll-mt-32 border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Spedizione"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "In Italia in 2–4 giorni lavorativi. Gratuita da 79€, altrimenti 5,90€. Pacco in carta e nastro di cotone."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Resi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "30 giorni se il capo non è stato lavato. In questa demo il reso è solo descritto: non c'è un pagamento da stornare."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Taglie"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "Dalla nascita ai 24 mesi. Ogni scheda ha la guida altezza e peso. Gli accessori in mussola sono in taglia unica."
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "contatti",
			className: "scroll-mt-32 border-t border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "novita",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl",
							children: "Resta nel nido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "Una nota quando esce una collezione. Niente altro. In questa demo l'indirizzo non lascia la pagina."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-6",
							onSubmit: onNews,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm",
									htmlFor: "news-email",
									children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "news-email",
										name: "email",
										type: "email",
										autoComplete: "email",
										className: `${fieldClass} mt-2`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: `${btnPrimary} mt-4`,
									children: "Iscrivimi"
								}),
								news === "bad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-clay",
									children: "Controlla l'email e riprova."
								}) : null,
								news === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-moss",
									children: "Annotata. Nessuna email è partita."
								}) : null
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl",
						children: "Scrivici"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "Per una taglia, un regalo o una tinta. Risposta d'atelier, non di un centralino."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 space-y-4",
						onSubmit: onContact,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								htmlFor: "contact-nome",
								children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "contact-nome",
									name: "nome",
									autoComplete: "name",
									className: `${fieldClass} mt-2`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								htmlFor: "contact-email",
								children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "contact-email",
									name: "email",
									type: "email",
									autoComplete: "email",
									className: `${fieldClass} mt-2`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								htmlFor: "contact-msg",
								children: ["Messaggio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "contact-msg",
									name: "messaggio",
									rows: 4,
									className: "mt-2 w-full border border-line bg-bg px-3 py-3 text-sm text-ink outline-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: btnPrimary,
								children: "Invia"
							}),
							contact === "bad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-clay",
								children: "Servono nome, email e un messaggio di qualche parola."
							}) : null,
							contact === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-moss",
								children: "Ricevuto qui. In demo non parte nessuna email."
							}) : null
						]
					})
				] })]
			})
		})
	] });
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
