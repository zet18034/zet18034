// src/index.ts
var e = "data-markmap-pending", t = `:where([${e}]) { display: block; height: 400px; overflow: hidden; color: transparent; }`, n = "200px", r = {}, i = /* @__PURE__ */ new WeakMap(), a;
function o(e) {
	Object.assign(r, e);
}
function s(e) {
	let t = i.get(e);
	return t || (a?.unobserve(e), t = import("./mount-C2TkKoFx.js").then(async ({ mount: t }) => e.isConnected ? t(e, r) : void 0), i.set(e, t)), t;
}
function c(e) {
	console.error("markmap:", e);
}
function l(t) {
	for (let n of t.querySelectorAll(".markmap:not(markmap-view, svg, canvas)")) n.hasAttribute(e) || (n.setAttribute(e, ""), a?.observe(n));
}
async function u(t = document) {
	l(t);
	let n = [...t.querySelectorAll(`[${e}]`)];
	return (await Promise.all(n.map(s))).filter((e) => e != null);
}
function d() {
	let e = document.createElement("style");
	e.textContent = t, document.head.prepend(e), a = new IntersectionObserver((e) => {
		for (let t of e) t.isIntersecting && s(t.target).catch(c);
	}, { rootMargin: n }), l(document);
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", d) : d());
export { o as configure, u as renderAll };
