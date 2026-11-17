import { a as e, o as t, r as n, t as r } from "./mount-C2TkKoFx.js";
import { c as i } from "./micromark-util-character-BJPn79sr.js";
// ../plugin-math/dist/shapes-Bx9ID-CD.js
var a = "currentColor", o = class extends Error {}, s = [
	"transform",
	"fill",
	"stroke",
	"stroke-width"
], c = {
	g: s,
	path: [...s, "d"],
	rect: [
		...s,
		"x",
		"y",
		"width",
		"height"
	],
	line: [
		...s,
		"x1",
		"y1",
		"x2",
		"y2"
	],
	ellipse: [
		...s,
		"cx",
		"cy",
		"rx",
		"ry"
	],
	svg: [
		"x",
		"y",
		"width",
		"height",
		"viewBox"
	]
};
function l(e, t) {
	if (e == null && t != null) return t;
	let n = Number(e);
	if (e == null || e.trim() === "" || !Number.isFinite(n)) throw new o();
	return n;
}
var u = (e) => e.trim().split(/[\s,]+/).map((e) => l(e));
function d(n) {
	let r = [
		1,
		0,
		0,
		1,
		0,
		0
	];
	if (n.replace(/(\w+)\(([^)]*)\)/g, (n, i, a) => {
		let s = u(a), c;
		if (i === "translate" && s.length <= 2) c = t(s[0], s[1] ?? 0);
		else if (i === "scale" && s.length <= 2) c = [
			s[0],
			0,
			0,
			s[1] ?? s[0],
			0,
			0
		];
		else if (i === "matrix" && s.length === 6) c = s;
		else throw new o();
		return r = e(r, c), "";
	}).trim()) throw new o();
	return r;
}
var f = (e, t) => e == null ? t : e === "none" ? void 0 : e;
function p(e, t) {
	return {
		fill: f(e.fill, t.fill),
		stroke: f(e.stroke, t.stroke),
		strokeWidth: l(e["stroke-width"], t.strokeWidth)
	};
}
var m = ({ fill: e, stroke: t, strokeWidth: n }) => ({
	fill: e,
	...t && n > 0 ? {
		stroke: t,
		strokeWidth: n
	} : {}
});
function h(e, t) {
	let { attrs: n } = e;
	switch (e.tag) {
		case "path":
			if (!n.d) throw new o();
			return {
				kind: "path",
				d: n.d,
				...m(t)
			};
		case "rect": return {
			kind: "rect",
			x: l(n.x, 0),
			y: l(n.y, 0),
			w: l(n.width),
			h: l(n.height),
			...m(t)
		};
		case "line": {
			let [e, r] = [l(n.x1, 0), l(n.y1, 0)], [i, a] = [l(n.x2, 0), l(n.y2, 0)];
			return {
				kind: "path",
				d: `M${e},${r}L${i},${a}`,
				...m(t)
			};
		}
		case "ellipse": {
			let [e, r] = [l(n.cx, 0), l(n.cy, 0)], [i, a] = [l(n.rx), l(n.ry)], o = `A${i},${a} 0 1 0`;
			return {
				kind: "path",
				d: `M${e - i},${r}${o} ${e + i},${r}${o} ${e - i},${r}Z`,
				...m(t)
			};
		}
		default: throw new o();
	}
}
function g({ x: e, y: t, width: n, height: r, viewBox: i }) {
	let [a, s, c, d] = u(i ?? ""), [f, p] = [l(n), l(r)];
	if (!(c > 0) || !(d > 0)) throw new o();
	let m = Math.min(f / c, p / d), h = a - (f / m - c) / 2, g = s - (p / m - d) / 2;
	return {
		transform: [
			m,
			0,
			0,
			m,
			l(e, 0) - h * m,
			l(t, 0) - g * m
		],
		clip: {
			x: h,
			y: g,
			width: f / m,
			height: p / m
		}
	};
}
function _(e, t) {
	let n = c[e.tag];
	if (!n) throw new o();
	for (let t of Object.keys(e.attrs)) if (!n.includes(t) && !t.startsWith("data-")) throw new o();
	let r = p(e.attrs, t), i = e.tag === "g" || e.tag === "svg";
	if (!i && e.children.length) throw new o();
	let a = i ? e.children.map((e) => _(e, r)) : [h(e, r)];
	if (e.tag === "svg") return {
		kind: "group",
		...g(e.attrs),
		children: a
	};
	let { transform: s } = e.attrs;
	return !i && !s ? a[0] : {
		kind: "group",
		...s ? { transform: d(s) } : {},
		children: a
	};
}
function v(e) {
	try {
		let t = {
			fill: a,
			strokeWidth: 1
		};
		return e.map((e) => _(e, t));
	} catch (e) {
		if (e instanceof o) return;
		throw e;
	}
}
function y(e, t) {
	let n = (e) => e === a ? t : e;
	return e.map((e) => e.kind === "group" ? {
		...e,
		children: y(e.children, t)
	} : e.kind === "rect" || e.kind === "path" ? {
		...e,
		fill: n(e.fill),
		stroke: n(e.stroke)
	} : e);
}
// ../../node_modules/.pnpm/mdast-util-math@3.0.0/node_modules/mdast-util-math/lib/index.js
function b() {
	return {
		enter: {
			mathFlow: e,
			mathFlowFenceMeta: t,
			mathText: a
		},
		exit: {
			mathFlow: i,
			mathFlowFence: r,
			mathFlowFenceMeta: n,
			mathFlowValue: s,
			mathText: o,
			mathTextData: s
		}
	};
	function e(e) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, e);
	}
	function t() {
		this.buffer();
	}
	function n() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.type, t.meta = e;
	}
	function r() {
		this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
	}
	function i(e) {
		let t = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t;
		let r = n.data.hChildren[0];
		r.type, r.tagName, r.children.push({
			type: "text",
			value: t
		}), this.data.mathFlowInside = void 0;
	}
	function a(e) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, e), this.buffer();
	}
	function o(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t, n.data.hChildren.push({
			type: "text",
			value: t
		});
	}
	function s(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
}
function x(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ??= !0, i.peek = a, {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: t ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: !0,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math: r,
			inlineMath: i
		}
	};
	function r(e, t, r, i) {
		let a = e.value || "", o = r.createTracker(i), s = "$".repeat(Math.max(n(a, "$") + 1, 2)), c = r.enter("mathFlow"), l = o.move(s);
		if (e.meta) {
			let t = r.enter("mathFlowMeta");
			l += o.move(r.safe(e.meta, {
				after: "\n",
				before: l,
				encode: ["$"],
				...o.current()
			})), t();
		}
		return l += o.move("\n"), a && (l += o.move(a + "\n")), l += o.move(s), c(), l;
	}
	function i(e, n, r) {
		let i = e.value || "", a = 1;
		for (t || a++; RegExp("(^|[^$])" + "\\$".repeat(a) + "([^$]|$)").test(i);) a++;
		let o = "$".repeat(a);
		/[^ \r\n]/.test(i) && (/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i) || /^\$|\$$/.test(i)) && (i = " " + i + " ");
		let s = -1;
		for (; ++s < r.unsafe.length;) {
			let e = r.unsafe[s];
			if (!e.atBreak) continue;
			let t = r.compilePattern(e), n;
			for (; n = t.exec(i);) {
				let e = n.index;
				i.codePointAt(e) === 10 && i.codePointAt(e - 1) === 13 && e--, i = i.slice(0, e) + " " + i.slice(n.index + 1);
			}
		}
		return o + i + o;
	}
	function a() {
		return "$";
	}
}
// ../../node_modules/.pnpm/micromark-extension-math@3.1.0/node_modules/micromark-extension-math/lib/math-flow.js
var S = {
	tokenize: w,
	concrete: !0,
	name: "mathFlow"
}, C = {
	tokenize: T,
	partial: !0
};
function w(e, t, n) {
	let a = this, o = a.events[a.events.length - 1], s = o && o[1].type === "linePrefix" ? o[2].sliceSerialize(o[1], !0).length : 0, c = 0;
	return l;
	function l(t) {
		return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), u(t);
	}
	function u(t) {
		return t === 36 ? (e.consume(t), c++, u) : c < 2 ? n(t) : (e.exit("mathFlowFenceSequence"), r(e, d, "whitespace")(t));
	}
	function d(t) {
		return t === null || i(t) ? p(t) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", { contentType: "string" }), f(t));
	}
	function f(t) {
		return t === null || i(t) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), p(t)) : t === 36 ? n(t) : (e.consume(t), f);
	}
	function p(n) {
		return e.exit("mathFlowFence"), a.interrupt ? t(n) : e.attempt(C, m, v)(n);
	}
	function m(t) {
		return e.attempt({
			tokenize: y,
			partial: !0
		}, v, h)(t);
	}
	function h(t) {
		return (s ? r(e, g, "linePrefix", s + 1) : g)(t);
	}
	function g(t) {
		return t === null ? v(t) : i(t) ? e.attempt(C, m, v)(t) : (e.enter("mathFlowValue"), _(t));
	}
	function _(t) {
		return t === null || i(t) ? (e.exit("mathFlowValue"), g(t)) : (e.consume(t), _);
	}
	function v(n) {
		return e.exit("mathFlow"), t(n);
	}
	function y(e, t, n) {
		let o = 0;
		return r(e, s, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function s(t) {
			return e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), l(t);
		}
		function l(t) {
			return t === 36 ? (o++, e.consume(t), l) : o < c ? n(t) : (e.exit("mathFlowFenceSequence"), r(e, u, "whitespace")(t));
		}
		function u(r) {
			return r === null || i(r) ? (e.exit("mathFlowFence"), t(r)) : n(r);
		}
	}
}
function T(e, t, n) {
	let r = this;
	return i;
	function i(n) {
		return n === null ? t(n) : (e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
// ../../node_modules/.pnpm/micromark-extension-math@3.1.0/node_modules/micromark-extension-math/lib/math-text.js
function E(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ??= !0, {
		tokenize: n,
		resolve: D,
		previous: O,
		name: "mathText"
	};
	function n(e, n, r) {
		let a = 0, o, s;
		return c;
		function c(t) {
			return e.enter("mathText"), e.enter("mathTextSequence"), l(t);
		}
		function l(n) {
			return n === 36 ? (e.consume(n), a++, l) : a < 2 && !t ? r(n) : (e.exit("mathTextSequence"), u(n));
		}
		function u(t) {
			return t === null ? r(t) : t === 36 ? (s = e.enter("mathTextSequence"), o = 0, f(t)) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), u) : i(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), u) : (e.enter("mathTextData"), d(t));
		}
		function d(t) {
			return t === null || t === 32 || t === 36 || i(t) ? (e.exit("mathTextData"), u(t)) : (e.consume(t), d);
		}
		function f(t) {
			return t === 36 ? (e.consume(t), o++, f) : o === a ? (e.exit("mathTextSequence"), e.exit("mathText"), n(t)) : (s.type = "mathTextData", d(t));
		}
	}
}
function D(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "mathTextData") {
			e[t][1].type = "mathTextPadding", e[n][1].type = "mathTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "mathTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function O(e) {
	return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
// ../../node_modules/.pnpm/micromark-extension-math@3.1.0/node_modules/micromark-extension-math/lib/syntax.js
function k(e) {
	return {
		flow: { 36: S },
		text: { 36: E(e) }
	};
}
// ../../node_modules/.pnpm/remark-math@6.0.0/node_modules/remark-math/lib/index.js
var A = {};
function j(e) {
	let t = this, n = e || A, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(k(n)), a.push(b()), o.push(x(n));
}
// ../plugin-math/dist/index.js
function M(e, t) {
	return {
		font: {
			...e.font,
			family: t.theme.codeFontFamily,
			size: e.font.size * .875
		},
		fill: "var(--mm-code-text)"
	};
}
function N(e, t, n) {
	let { font: r } = M(t, n);
	return {
		width: n.measurer.measure(e, r),
		height: t.font.lineHeight,
		baseline: (t.font.lineHeight + t.font.size * .7) / 2
	};
}
function P(e, t) {
	let [n, r, i, a] = e.split(/\s+/).map(Number), o = Math.min(t.width / i, t.height / a);
	return [
		o,
		0,
		0,
		o,
		t.x + (t.width - i * o) / 2 - n * o,
		t.y + (t.height - a * o) / 2 - r * o
	];
}
var F = (e) => e.replace(/[&"<>]/g, (e) => `&#${e.charCodeAt(0)};`), I = (e) => e?.type === "element" && e.tagName === "code" && Array.isArray(e.properties.className) && e.properties.className.includes("language-math"), L = (e) => e.children.map((e) => e.type === "text" ? e.value : "").join("");
function R(e, t) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${t.width}ex" height="${t.height}ex" viewBox="${F(t.viewBox)}" style="vertical-align:${t.verticalAlign}ex" role="img" focusable="false" aria-label="${F(e)}">${t.body}</svg>`;
}
function z(e = {}) {
	let t = e.load ?? (() => import("./mathjax-ClZ0hICZ-D5cvv4Ve.js")), n = e.exFactor ?? .5, r, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = (e, n) => {
		let o = a.get(e);
		o || (r ??= t(), o = r.then(({ texToSvg: t }) => {
			try {
				i.set(e, t(e, !1));
			} catch (t) {
				i.set(e, t instanceof Error ? t : Error(String(t)));
			}
		}).catch((t) => {
			r = void 0, i.set(e, t instanceof Error ? t : Error(String(t)));
		}).finally(() => a.delete(e)), a.set(e, o)), n.defer?.(o);
	}, s = async (e) => {
		let n = [], i = (e) => {
			e.children.forEach((t, r) => {
				if (t.type !== "element") return;
				let [a] = t.children;
				t.tagName === "pre" && t.children.length === 1 && I(a) ? n.push({
					parent: e,
					index: r,
					tex: L(a),
					display: !0
				}) : I(t) ? n.push({
					parent: e,
					index: r,
					tex: L(t),
					display: !1
				}) : i(t);
			});
		};
		if (i(e), !n.length) return;
		let a;
		try {
			r ??= t(), {texToSvg: a} = await r;
		} catch {
			r = void 0;
			return;
		}
		for (let { parent: e, index: t, tex: r, display: i } of n) {
			let n;
			try {
				n = a(r, i);
			} catch {
				continue;
			}
			let o = R(r, n), s = {
				type: "raw",
				value: i ? `<div class="markmap-math-display" style="margin:0.5em 0;text-align:center;overflow-x:auto">${o}</div>` : o
			};
			e.children[t] = s;
		}
	}, c = (e, t) => {
		let n = i.get(e.value);
		return n || o(e.value, t), n instanceof Error ? void 0 : n;
	};
	return {
		name: "math",
		popover: s,
		atoms: { inlineMath: {
			measure(e, t, r) {
				let i = c(e, r);
				if (!i) return N(e.value, t, r);
				let a = t.font.size * n, o = i.height * a;
				return {
					width: i.width * a,
					height: o,
					baseline: o + i.verticalAlign * a
				};
			},
			render(e, t, n, r) {
				let a = i.get(e.value), o = () => {
					let i = M(n, r), { baseline: a } = N(e.value, n, r), o = {
						text: e.value,
						x: 0,
						y: a,
						...i
					};
					return {
						kind: "text",
						x: t.x,
						y: t.y,
						runs: [o]
					};
				};
				if (!a || a instanceof Error) return [o()];
				let s = [
					`x="${t.x}"`,
					`y="${t.y}"`,
					`width="${t.width}"`,
					`height="${t.height}"`,
					`viewBox="${F(a.viewBox)}"`,
					`style="color:${F(n.fill)};overflow:visible"`
				].join(" ");
				return [{
					kind: "custom",
					backends: ["svg"],
					svg: () => `<svg ${s}>${a.body}</svg>`
				}, a.shapes ? {
					kind: "group",
					backends: ["canvas"],
					transform: P(a.viewBox, t),
					children: y(a.shapes, n.fill)
				} : {
					...o(),
					backends: ["canvas"]
				}];
			}
		} }
	};
}
var B = z();
export { B as mathContent, j as remarkMath, v as t };
