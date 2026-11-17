import { a as e, c as t, d as n, f as r, i, l as a, n as o, o as s, r as c, s as l, t as u, u as d } from "./micromark-util-character-BJPn79sr.js";
// \0rolldown/runtime.js
var f = Object.create, p = Object.defineProperty, m = Object.getOwnPropertyDescriptor, h = Object.getOwnPropertyNames, g = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty, v = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), y = (e, t) => {
	let n = {};
	for (var r in e) p(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || p(n, Symbol.toStringTag, { value: "Module" }), n;
}, b = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = h(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !_.call(e, s) && s !== n && p(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = m(t, s)) || r.enumerable
	});
	return e;
}, x = (e, t, n) => (n = e == null ? {} : f(g(e)), b(t || !e || !e.__esModule || !_.call(e, "default") ? p(n, "default", {
	value: e,
	enumerable: !0
}) : n, e));
// ../core/dist/index.js
function S(e, t) {
	return [
		1,
		0,
		0,
		1,
		e,
		t
	];
}
function C(e, t, n) {
	return [
		e,
		0,
		0,
		e,
		t * (1 - e),
		n * (1 - e)
	];
}
function w(e, t) {
	let [n, r, i, a, o, s] = e, [c, l, u, d, f, p] = t;
	return [
		n * c + i * l,
		r * c + a * l,
		n * u + i * d,
		r * u + a * d,
		n * f + i * p + o,
		r * f + a * p + s
	];
}
function T(e) {
	let [t, n, r, i] = [
		Infinity,
		Infinity,
		-Infinity,
		-Infinity
	];
	for (let a of e) t = Math.min(t, a.x), n = Math.min(n, a.y), r = Math.max(r, a.x + a.width), i = Math.max(i, a.y + a.height);
	return t > r ? {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	} : {
		x: t,
		y: n,
		width: r - t,
		height: i - n
	};
}
function E(e, t) {
	return {
		x: e.x - t,
		y: e.y - t,
		width: e.width + t * 2,
		height: e.height + t * 2
	};
}
var D = {
	left: "right",
	right: "left",
	top: "bottom",
	bottom: "top"
};
function ee(e) {
	return D[e];
}
function te(e, t) {
	if (e.id === t) return [e];
	for (let n of e.children) {
		let r = te(n, t);
		if (r) return [e, ...r];
	}
}
function ne(e, t) {
	return te(e, t)?.at(-1);
}
function re(e) {
	let t = "";
	for (let n of e) "value" in n ? t += n.value : n.type === "image" || n.type === "imageReference" ? t += n.alt ?? "" : n.type === "break" ? t += "\n" : "children" in n && (t += re(n.children));
	return t;
}
var ie = "root";
function O(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(36).padStart(7, "0");
}
function ae(e) {
	let t = (e, n) => {
		e.id = n;
		let r = /* @__PURE__ */ new Map();
		for (let i of e.children) {
			let e = re(i.content), a = r.get(e) ?? 0;
			r.set(e, a + 1), t(i, O(`${n}\0${e}${a ? `\0${a}` : ""}`));
		}
	};
	return t(e, ie), e;
}
function oe(e) {
	return e.length > 0 && e.length <= 100 && !/[;{}<>\\'"]|\/\*/.test(e);
}
var k = {
	number(e, t = !1) {
		return (n, r) => typeof n != "number" || !Number.isFinite(n) ? { warning: `\`${r}\` must be a number` } : n < e || t && !Number.isInteger(n) ? { warning: `\`${r}\` must be ${t ? "an integer " : ""}>= ${e}` } : { value: n };
	},
	string() {
		return (e, t) => typeof e == "string" && e.trim() && e.length <= 100 ? { value: e.trim() } : { warning: `\`${t}\` must be a non-empty string` };
	},
	oneOf(e) {
		return (t, n) => e.includes(t) ? { value: t } : { warning: `\`${n}\` must be one of ${e.map((e) => `\`${e}\``).join(", ")}` };
	},
	boolean() {
		return (e, t) => typeof e == "boolean" ? { value: e } : { warning: `\`${t}\` must be true or false` };
	},
	colors() {
		return (e, t) => {
			let n = typeof e == "string" ? [e] : e;
			if (!Array.isArray(n) || !n.length) return { warning: `\`${t}\` must be a color or a list of colors` };
			let r = n.filter((e) => typeof e == "string" && oe(e.trim())).map((e) => e.trim());
			return {
				value: r.length ? r : void 0,
				warning: r.length < n.length ? `\`${t}\` has invalid colors, which were ignored` : void 0
			};
		};
	}
}, se = {
	foldLevel: k.number(0, !0),
	wrapWidth: k.number(0),
	levelGap: k.number(0),
	siblingGap: k.number(0),
	zoom: k.boolean(),
	pan: k.boolean(),
	fitPadding: k.number(0),
	fitMaxScale: k.number(.01),
	minScale: k.number(.001),
	maxScale: k.number(.01),
	duration: k.number(0),
	layout: k.string(),
	theme: k.string(),
	colorScheme: k.oneOf([
		"light",
		"dark",
		"auto"
	])
};
function A(e, t) {
	let n = {}, r = {}, i = [];
	if (e == null) return {
		options: n,
		rest: r,
		warnings: i
	};
	if (typeof e != "object" || Array.isArray(e)) return {
		options: n,
		rest: r,
		warnings: ["`markmap` options must be an object"]
	};
	for (let [a, o] of Object.entries(e)) {
		let e = Object.hasOwn(t, a) ? t[a] : void 0;
		if (!e) {
			r[a] = o;
			continue;
		}
		let { value: s, warning: c } = e(o, a);
		c && i.push(c), s !== void 0 && (n[a] = s);
	}
	return {
		options: n,
		rest: r,
		warnings: i
	};
}
function ce(e) {
	return A(e, se);
}
function le(e) {
	return Object.keys(e).map((e) => `Unknown option \`${e}\``);
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/count.js
function ue(e) {
	var t = 0, n = e.children, r = n && n.length;
	if (!r) t = 1;
	else for (; --r >= 0;) t += n[r].value;
	e.value = t;
}
function de() {
	return this.eachAfter(ue);
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/each.js
function fe(e) {
	var t = this, n, r = [t], i, a, o;
	do
		for (n = r.reverse(), r = []; t = n.pop();) if (e(t), i = t.children, i) for (a = 0, o = i.length; a < o; ++a) r.push(i[a]);
	while (r.length);
	return this;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function pe(e) {
	for (var t = this, n = [t], r, i; t = n.pop();) if (e(t), r = t.children, r) for (i = r.length - 1; i >= 0; --i) n.push(r[i]);
	return this;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function me(e) {
	for (var t = this, n = [t], r = [], i, a, o; t = n.pop();) if (r.push(t), i = t.children, i) for (a = 0, o = i.length; a < o; ++a) n.push(i[a]);
	for (; t = r.pop();) e(t);
	return this;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/sum.js
function he(e) {
	return this.eachAfter(function(t) {
		for (var n = +e(t.data) || 0, r = t.children, i = r && r.length; --i >= 0;) n += r[i].value;
		t.value = n;
	});
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/sort.js
function ge(e) {
	return this.eachBefore(function(t) {
		t.children && t.children.sort(e);
	});
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/path.js
function _e(e) {
	for (var t = this, n = ve(t, e), r = [t]; t !== n;) t = t.parent, r.push(t);
	for (var i = r.length; e !== n;) r.splice(i, 0, e), e = e.parent;
	return r;
}
function ve(e, t) {
	if (e === t) return e;
	var n = e.ancestors(), r = t.ancestors(), i = null;
	for (e = n.pop(), t = r.pop(); e === t;) i = e, e = n.pop(), t = r.pop();
	return i;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ye() {
	for (var e = this, t = [e]; e = e.parent;) t.push(e);
	return t;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/descendants.js
function be() {
	var e = [];
	return this.each(function(t) {
		e.push(t);
	}), e;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/leaves.js
function xe() {
	var e = [];
	return this.eachBefore(function(t) {
		t.children || e.push(t);
	}), e;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/links.js
function Se() {
	var e = this, t = [];
	return e.each(function(n) {
		n !== e && t.push({
			source: n.parent,
			target: n
		});
	}), t;
}
// ../../node_modules/.pnpm/d3-hierarchy@1.1.9/node_modules/d3-hierarchy/src/hierarchy/index.js
function Ce(e, t) {
	var n = new Oe(e), r = +e.value && (n.value = e.value), i, a = [n], o, s, c, l;
	for (t ??= Te; i = a.pop();) if (r && (i.value = +i.data.value), (s = t(i.data)) && (l = s.length)) for (i.children = Array(l), c = l - 1; c >= 0; --c) a.push(o = i.children[c] = new Oe(s[c])), o.parent = i, o.depth = i.depth + 1;
	return n.eachBefore(De);
}
function we() {
	return Ce(this).eachBefore(Ee);
}
function Te(e) {
	return e.children;
}
function Ee(e) {
	e.data = e.data.data;
}
function De(e) {
	var t = 0;
	do
		e.height = t;
	while ((e = e.parent) && e.height < ++t);
}
function Oe(e) {
	this.data = e, this.depth = this.height = 0, this.parent = null;
}
Oe.prototype = Ce.prototype = {
	constructor: Oe,
	count: de,
	each: fe,
	eachAfter: me,
	eachBefore: pe,
	sum: he,
	sort: ge,
	path: _e,
	ancestors: ye,
	descendants: be,
	leaves: xe,
	links: Se,
	copy: we
};
// ../../node_modules/.pnpm/d3-flextree@2.1.2/node_modules/d3-flextree/src/flextree.js
var { version: ke } = {
	name: "d3-flextree",
	version: "2.1.2",
	main: "build/d3-flextree.js",
	module: "index",
	"jsnext:main": "index",
	author: {
		name: "Chris Maloney",
		url: "http://chrismaloney.org"
	},
	description: "Flexible tree layout algorithm that allows for variable node sizes.",
	keywords: [
		"d3",
		"d3-module",
		"layout",
		"tree",
		"hierarchy",
		"d3-hierarchy",
		"plugin",
		"d3-plugin",
		"infovis",
		"visualization",
		"2d"
	],
	homepage: "https://github.com/klortho/d3-flextree",
	license: "WTFPL",
	repository: {
		type: "git",
		url: "https://github.com/klortho/d3-flextree.git"
	},
	scripts: {
		clean: "rm -rf build demo test",
		"build:demo": "rollup -c --environment BUILD:demo",
		"build:dev": "rollup -c --environment BUILD:dev",
		"build:prod": "rollup -c --environment BUILD:prod",
		"build:test": "rollup -c --environment BUILD:test",
		build: "rollup -c",
		lint: "eslint index.js src",
		"test:main": "node test/bundle.js",
		"test:browser": "node test/browser-tests.js",
		test: "npm-run-all test:*",
		prepare: "npm-run-all clean build lint test"
	},
	dependencies: { "d3-hierarchy": "^1.1.5" },
	devDependencies: {
		"babel-plugin-external-helpers": "^6.22.0",
		"babel-preset-es2015-rollup": "^3.0.0",
		d3: "^4.13.0",
		"d3-selection-multi": "^1.0.1",
		eslint: "^4.19.1",
		jsdom: "^11.6.2",
		"npm-run-all": "^4.1.2",
		rollup: "^0.55.3",
		"rollup-plugin-babel": "^2.7.1",
		"rollup-plugin-commonjs": "^8.0.2",
		"rollup-plugin-copy": "^0.2.3",
		"rollup-plugin-json": "^2.3.0",
		"rollup-plugin-node-resolve": "^3.0.2",
		"rollup-plugin-uglify": "^3.0.0",
		"uglify-es": "^3.3.9"
	}
}, Ae = Object.freeze({
	children: (e) => e.children,
	nodeSize: (e) => e.data.size,
	spacing: 0
});
function je(e) {
	let t = Object.assign({}, Ae, e);
	function n(e) {
		let n = t[e];
		return typeof n == "function" ? n : () => n;
	}
	function r(e) {
		let t = o(a(), e, (e) => e.children);
		return t.update(), t.data;
	}
	function i() {
		let e = n("nodeSize"), t = n("spacing");
		return class n extends Ce.prototype.constructor {
			constructor(e) {
				super(e);
			}
			copy() {
				let e = o(this.constructor, this, (e) => e.children);
				return e.each((e) => e.data = e.data.data), e;
			}
			get size() {
				return e(this);
			}
			spacing(e) {
				return t(this, e);
			}
			get nodes() {
				return this.descendants();
			}
			get xSize() {
				return this.size[0];
			}
			get ySize() {
				return this.size[1];
			}
			get top() {
				return this.y;
			}
			get bottom() {
				return this.y + this.ySize;
			}
			get left() {
				return this.x - this.xSize / 2;
			}
			get right() {
				return this.x + this.xSize / 2;
			}
			get root() {
				let e = this.ancestors();
				return e[e.length - 1];
			}
			get numChildren() {
				return this.hasChildren ? this.children.length : 0;
			}
			get hasChildren() {
				return !this.noChildren;
			}
			get noChildren() {
				return this.children === null;
			}
			get firstChild() {
				return this.hasChildren ? this.children[0] : null;
			}
			get lastChild() {
				return this.hasChildren ? this.children[this.numChildren - 1] : null;
			}
			get extents() {
				return (this.children || []).reduce((e, t) => n.maxExtents(e, t.extents), this.nodeExtents);
			}
			get nodeExtents() {
				return {
					top: this.top,
					bottom: this.bottom,
					left: this.left,
					right: this.right
				};
			}
			static maxExtents(e, t) {
				return {
					top: Math.min(e.top, t.top),
					bottom: Math.max(e.bottom, t.bottom),
					left: Math.min(e.left, t.left),
					right: Math.max(e.right, t.right)
				};
			}
		};
	}
	function a() {
		let e = i(), t = n("nodeSize"), r = n("spacing");
		return class extends e {
			constructor(e) {
				super(e), Object.assign(this, {
					x: 0,
					y: 0,
					relX: 0,
					prelim: 0,
					shift: 0,
					change: 0,
					lExt: this,
					lExtRelX: 0,
					lThr: null,
					rExt: this,
					rExtRelX: 0,
					rThr: null
				});
			}
			get size() {
				return t(this.data);
			}
			spacing(e) {
				return r(this.data, e.data);
			}
			get x() {
				return this.data.x;
			}
			set x(e) {
				this.data.x = e;
			}
			get y() {
				return this.data.y;
			}
			set y(e) {
				this.data.y = e;
			}
			update() {
				return Me(this), Ne(this), this;
			}
		};
	}
	function o(e, t, n) {
		let r = (t, i) => {
			let a = new e(t);
			Object.assign(a, {
				parent: i,
				depth: i === null ? 0 : i.depth + 1,
				height: 0,
				length: 1
			});
			let o = n(t) || [];
			return a.children = o.length === 0 ? null : o.map((e) => r(e, a)), a.children && Object.assign(a, a.children.reduce((e, t) => ({
				height: Math.max(e.height, t.height + 1),
				length: e.length + t.length
			}), a)), a;
		};
		return r(t, null);
	}
	return Object.assign(r, {
		nodeSize(e) {
			return arguments.length ? (t.nodeSize = e, r) : t.nodeSize;
		},
		spacing(e) {
			return arguments.length ? (t.spacing = e, r) : t.spacing;
		},
		children(e) {
			return arguments.length ? (t.children = e, r) : t.children;
		},
		hierarchy(e, n) {
			let r = n === void 0 ? t.children : n;
			return o(i(), e, r);
		},
		dump(e) {
			let t = n("nodeSize"), r = (e) => (n) => {
				let i = e + "  ", a = e + "    ", { x: o, y: s } = n, c = t(n), l = n.children || [], u = l.length === 0 ? " " : `,${i}children: [${a}${l.map(r(a)).join(a)}${i}],${e}`;
				return `{ size: [${c.join(", ")}],${i}x: ${o}, y: ${s}${u}},`;
			};
			return r("\n")(e);
		}
	}), r;
}
je.version = ke;
var Me = (e, t = 0) => (e.y = t, (e.children || []).reduce((t, n) => {
	let [r, i] = t;
	Me(n, e.y + e.ySize);
	let a = (r === 0 ? n.lExt : n.rExt).bottom;
	r !== 0 && Fe(e, r, i);
	let o = Ue(a, r, i);
	return [r + 1, o];
}, [0, null]), Pe(e), He(e), e), Ne = (e, t, n) => {
	t === void 0 && (t = -e.relX - e.prelim, n = 0);
	let r = t + e.relX;
	return e.relX = r + e.prelim - n, e.prelim = 0, e.x = n + e.relX, (e.children || []).forEach((t) => Ne(t, r, e.x)), e;
}, Pe = (e) => {
	(e.children || []).reduce((e, t) => {
		let [n, r] = e, i = n + t.shift, a = r + i + t.change;
		return t.relX += a, [i, a];
	}, [0, 0]);
}, Fe = (e, t, n) => {
	let r = e.children[t - 1], i = e.children[t], a = r, o = r.relX, s = i, c = i.relX, l = !0;
	for (; a && s;) {
		a.bottom > n.lowY && (n = n.next);
		let r = o + a.prelim - (c + s.prelim) + a.xSize / 2 + s.xSize / 2 + a.spacing(s);
		(r > 0 || r < 0 && l) && (c += r, Ie(i, r), Le(e, t, n.index, r)), l = !1;
		let u = a.bottom, d = s.bottom;
		u <= d && (a = ze(a), a && (o += a.relX)), u >= d && (s = Re(s), s && (c += s.relX));
	}
	!a && s ? Be(e, t, s, c) : a && !s && Ve(e, t, a, o);
}, Ie = (e, t) => {
	e.relX += t, e.lExtRelX += t, e.rExtRelX += t;
}, Le = (e, t, n, r) => {
	let i = e.children[t], a = t - n;
	if (a > 1) {
		let t = r / a;
		e.children[n + 1].shift += t, i.shift -= t, i.change -= r - t;
	}
}, Re = (e) => e.hasChildren ? e.firstChild : e.lThr, ze = (e) => e.hasChildren ? e.lastChild : e.rThr, Be = (e, t, n, r) => {
	let i = e.firstChild, a = i.lExt, o = e.children[t];
	a.lThr = n;
	let s = r - n.relX - i.lExtRelX;
	a.relX += s, a.prelim -= s, i.lExt = o.lExt, i.lExtRelX = o.lExtRelX;
}, Ve = (e, t, n, r) => {
	let i = e.children[t], a = i.rExt, o = e.children[t - 1];
	a.rThr = n;
	let s = r - n.relX - i.rExtRelX;
	a.relX += s, a.prelim -= s, i.rExt = o.rExt, i.rExtRelX = o.rExtRelX;
}, He = (e) => {
	if (e.hasChildren) {
		let t = e.firstChild, n = e.lastChild, r = (t.prelim + t.relX - t.xSize / 2 + n.relX + n.prelim + n.xSize / 2) / 2;
		Object.assign(e, {
			prelim: r,
			lExt: t.lExt,
			lExtRelX: t.lExtRelX,
			rExt: n.rExt,
			rExtRelX: n.rExtRelX
		});
	}
}, Ue = (e, t, n) => {
	for (; n !== null && e >= n.lowY;) n = n.next;
	return {
		lowY: e,
		index: t,
		next: n
	};
}, We = /^(?:https?:|mailto:|tel:|#|\/|\.{1,2}\/|[^:/?#]*(?:[/?#]|$))/i;
function Ge(e) {
	let t = e.trim();
	return We.test(t) ? t : void 0;
}
var Ke = {
	name: "basic",
	transform(e, t) {
		let { checked: n } = t.data;
		return typeof n == "boolean" ? [{
			type: "checkbox",
			checked: n
		}, ...e] : e;
	},
	styles: {
		strong: () => ({ font: { weight: 700 } }),
		emphasis: () => ({ font: { style: "italic" } }),
		delete: (e, t) => ({ decoration: { strike: t.fill } }),
		mark: () => ({ decoration: {
			background: "var(--mm-mark-bg)",
			radius: 2
		} }),
		inlineCode: (e, t, n) => ({
			font: {
				family: n.theme.codeFontFamily,
				size: t.font.size * .875,
				weight: 400,
				style: "normal"
			},
			fill: "var(--mm-code-text)",
			decoration: {
				background: "var(--mm-code-bg)",
				radius: 3,
				padding: t.font.size * .2
			}
		}),
		link: (e) => {
			let t = Ge(e.url);
			return {
				fill: "var(--mm-link)",
				decoration: t ? { href: t } : void 0
			};
		}
	},
	atoms: { checkbox: {
		measure(e, t) {
			let n = Math.round(t.font.size * .8);
			return {
				width: n + t.font.size * .35,
				height: n,
				baseline: n
			};
		},
		render(e, t, n) {
			let r = t.height, i = Math.max(1, n.font.size / 12), a = {
				kind: "rect",
				x: t.x + i / 2,
				y: t.y + i / 2,
				w: r - i,
				h: r - i,
				r: r * .2,
				stroke: "var(--mm-checkbox)",
				strokeWidth: i,
				fill: e.checked ? "var(--mm-checkbox)" : "none"
			};
			if (!e.checked) return [a];
			let [o, s] = [t.x, t.y];
			return [a, {
				kind: "path",
				d: `M${o + r * .25},${s + r * .52}L${o + r * .43},${s + r * .7}L${o + r * .76},${s + r * .32}`,
				stroke: "var(--mm-bg)",
				strokeWidth: i * 1.5
			}];
		}
	} }
}, qe = {
	name: "notes",
	transform(e, t) {
		let n = t.notes.length;
		return n ? [...e, {
			type: "noteMarker",
			count: n
		}] : e;
	},
	atoms: { noteMarker: {
		measure(e, t) {
			let n = Math.round(t.font.size * .4);
			return {
				width: t.font.size * .35 + n,
				height: n,
				baseline: n / 2 + t.font.size * .27
			};
		},
		render(e, t) {
			let n = t.height, r = t.x + t.width - n, i = Math.max(16, n * 2.5);
			return [{
				kind: "rect",
				x: r,
				y: t.y,
				w: n,
				h: n,
				r: n / 2,
				fill: "var(--mm-note-dot)"
			}, {
				kind: "hit",
				action: "notes",
				rect: {
					x: r + n / 2 - i / 2,
					y: t.y + n / 2 - i / 2,
					width: i,
					height: i
				}
			}];
		}
	} }
}, Je = {
	width: 40,
	height: 30
}, Ye = 320, Xe = /^data:image\/(?:png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i;
function Ze(e) {
	let t = e.trim();
	return Xe.test(t) ? t : Ge(t);
}
function Qe() {
	if (typeof Image < "u") return (e) => new Promise((t, n) => {
		let r = new Image();
		r.addEventListener("load", () => t({
			width: r.naturalWidth,
			height: r.naturalHeight
		})), r.addEventListener("error", () => n(/* @__PURE__ */ Error(`Could not load ${e}`))), r.src = e;
	});
}
function $e(e, t) {
	let { width: n, height: r } = e;
	if (n && r) return {
		width: n,
		height: r
	};
	if (!t?.width || !t.height) return;
	let i = t.width / t.height;
	return n ? {
		width: n,
		height: n / i
	} : r ? {
		width: r * i,
		height: r
	} : t;
}
var et = ({ width: e, height: t }) => e || t ? {
	width: e ?? t,
	height: t ?? e
} : Je;
function tt(e, t, n) {
	let { font: r } = t;
	return {
		width: n.measurer.measure(e, r),
		height: r.lineHeight,
		baseline: (r.lineHeight + r.size * .7) / 2
	};
}
function nt(e, t, n, r) {
	if (!e) return [];
	let { baseline: i } = tt(e, n, r), a = {
		text: e,
		x: 0,
		y: i,
		font: n.font,
		fill: n.fill
	};
	return [{
		kind: "text",
		x: t.x,
		y: t.y,
		runs: [a]
	}];
}
function rt(e = {}) {
	let t = e.loadSize ?? Qe(), n = e.allow ?? (() => !0), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = (e, n) => {
		if (!t || r.has(e)) return;
		let a = i.get(e);
		a || (a = t(e).then((t) => r.set(e, t), () => r.set(e, null)).finally(() => i.delete(e)), i.set(e, a)), n.defer?.(a);
	}, o = (t, i) => {
		let o = Ze(t.url);
		if (!o || !n(o)) return;
		let s = t.data ?? {}, c = r.get(o), l = $e(s, c ?? void 0);
		if (!l) {
			if (c === null) return;
			a(o, i), l = et(s);
		}
		let u = i.wrapWidth && i.wrapWidth > 0 ? i.wrapWidth : e.maxWidth ?? Ye;
		return l.width > u ? {
			width: u,
			height: l.height * u / l.width
		} : l;
	};
	return {
		name: "images",
		atoms: { image: {
			measure(e, t, n) {
				let r = o(e, n);
				return r ? {
					...r,
					baseline: r.height
				} : tt(e.alt ?? "", t, n);
			},
			render(e, t, n, r) {
				let i = o(e, r) && Ze(e.url), a = nt(e.alt, t, n, r);
				if (!i) return a;
				let { x: s, y: c, width: l, height: u } = t, d = {
					kind: "image",
					x: s,
					y: c,
					w: l,
					h: u,
					src: i
				};
				return a.length && (d.fallback = [{
					kind: "group",
					clip: t,
					children: a
				}]), [d];
			}
		} }
	};
}
var it = [
	Ke,
	rt(),
	qe
];
function at(e, t) {
	let n = [], r = (e) => {
		n.push(e), t?.has(e.id) || e.children.forEach(r);
	};
	return r(e), n;
}
function ot(e, t) {
	let { sizes: n, folded: r, levelGap: i = 80, siblingGap: a = 5 } = t, o = (e) => {
		let t = n.get(e.id);
		if (!t) throw Error(`Missing size for node ${e.id}`);
		return t;
	}, s = je({
		children: (e) => r?.has(e.id) ? void 0 : e.children,
		nodeSize: (e) => {
			let { width: t, height: n } = o(e.data);
			return [n, t + i];
		},
		spacing: (e, t) => e.parent === t.parent ? a : a * 2
	}), c = s.hierarchy(e);
	s(c);
	let l = [], u = /* @__PURE__ */ new Map(), d = (e, t) => {
		let { width: n, height: i } = o(e.data), a = {
			node: e.data,
			parent: t,
			children: [],
			depth: e.depth,
			folded: !!r?.has(e.data.id) && e.data.children.length > 0,
			rect: {
				x: e.y,
				y: e.x - i / 2,
				width: n,
				height: i
			},
			direction: "right"
		};
		l.push(a), u.set(a.node.id, a);
		for (let t of e.children ?? []) a.children.push(d(t, a));
		return a;
	};
	return d(c), {
		nodes: l,
		byId: u,
		bounds: T(l.map((e) => e.rect))
	};
}
var st = {
	name: "tree",
	layout: ot
};
function ct(e) {
	return e.children.length ? e.children.reduce((e, t) => e + ct(t), 0) : 1;
}
function lt(e) {
	let t = e.map(ct), n = t.reduce((e, t) => e + t, 0), r = e.length, i = Infinity, a = 0;
	for (let o = 1; o <= e.length; o++) {
		a += t[o - 1];
		let e = Math.abs(a - (n - a));
		e <= i && (r = o, i = e);
	}
	return r;
}
function ut(e, t) {
	if (t.folded?.has(e.id) || e.children.length < 2) return ot(e, t);
	let n = lt(e.children), r = (n) => ot({
		...e,
		children: n
	}, t), i = r(e.children.slice(0, n)), a = r(e.children.slice(n)), o = i.nodes[0].rect, s = /* @__PURE__ */ new Map();
	for (let e of i.nodes) s.set(e.node.id, {
		rect: e.rect,
		direction: "right"
	});
	for (let e of a.nodes.slice(1)) {
		let { rect: t } = e, n = o.x * 2 + o.width - t.x - t.width;
		s.set(e.node.id, {
			rect: {
				...t,
				x: n
			},
			direction: "left"
		});
	}
	let c = [], l = /* @__PURE__ */ new Map(), u = (e, n, r) => {
		let { rect: i, direction: a } = s.get(e.id), o = !!t.folded?.has(e.id) && e.children.length > 0, d = {
			node: e,
			parent: r,
			children: [],
			depth: n,
			folded: o,
			rect: i,
			direction: a
		};
		if (c.push(d), l.set(e.id, d), !o) for (let t of e.children) d.children.push(u(t, n + 1, d));
		return d;
	};
	return u(e, 0), {
		nodes: c,
		byId: l,
		bounds: T(c.map((e) => e.rect))
	};
}
var dt = {
	name: "two-sided",
	layout: ut
}, ft = 3;
function pt(e, t) {
	let { sizes: n, folded: r, levelGap: i = 80, siblingGap: a = 5 } = t, o = a * ft, s = (e) => {
		let t = n.get(e.id);
		if (!t) throw Error(`Missing size for node ${e.id}`);
		return t;
	}, c = je({
		children: (e) => r?.has(e.id) ? void 0 : e.children,
		nodeSize: (e) => {
			let { width: t, height: n } = s(e.data);
			return [t, n + i];
		},
		spacing: (e, t) => e.parent === t.parent ? o : o * 2
	}), l = c.hierarchy(e);
	c(l);
	let u = [], d = /* @__PURE__ */ new Map(), f = (e, t) => {
		let { width: n, height: i } = s(e.data), a = {
			node: e.data,
			parent: t,
			children: [],
			depth: e.depth,
			folded: !!r?.has(e.data.id) && e.data.children.length > 0,
			rect: {
				x: e.x - n / 2,
				y: e.y,
				width: n,
				height: i
			},
			direction: "bottom"
		};
		u.push(a), d.set(a.node.id, a);
		for (let t of e.children ?? []) a.children.push(f(t, a));
		return a;
	};
	return f(l), {
		nodes: u,
		byId: d,
		bounds: T(u.map((e) => e.rect))
	};
}
var mt = {
	name: "org-chart",
	layout: pt
};
function ht(e) {
	return `${e.style} ${e.weight} ${e.size}px ${e.family}`;
}
function gt(e) {
	let t = e ?? _t(), n = /* @__PURE__ */ new Map();
	return { measure(e, r) {
		let i = ht(r), a = `${i}\n${e}`, o = n.get(a);
		return o ?? (t.font !== i && (t.font = i), o = t.measureText(e).width, n.set(a, o)), o;
	} };
}
function _t() {
	let e = (typeof OffscreenCanvas > "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1)).getContext("2d");
	if (!e) throw Error("Canvas 2D is not available");
	return e;
}
function vt(e, t, n = 0) {
	let r = n > 0 && e.length > n ? e[n - 1] : e.at(-1);
	return Number.parseInt(O(r), 36) % Math.max(1, t);
}
var yt = [
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf"
];
function bt(e) {
	let t = e.color?.length ? e.color : yt, n = e.colorDepth ?? 0;
	return {
		tokens: Object.fromEntries(t.map((e, t) => [`mm-branch-${t}`, e])),
		colorOf: (e) => `var(--mm-branch-${vt(e, t.length, n)})`
	};
}
var xt = {
	"mm-link": "#0097e6",
	"mm-code-bg": "#f0f0f0",
	"mm-code-text": "#555",
	"mm-mark-bg": "#ffeaa7",
	"mm-checkbox": "#555",
	"mm-note-dot": "#999",
	"mm-syntax-keyword": "#cf222e",
	"mm-syntax-string": "#0a3069",
	"mm-syntax-comment": "#6e7781",
	"mm-syntax-number": "#0550ae",
	"mm-syntax-title": "#8250df",
	"mm-syntax-attr": "#116329"
}, St = {
	"mm-link": "#4fb3f6",
	"mm-code-bg": "#2f2f33",
	"mm-code-text": "#d4d4d4",
	"mm-mark-bg": "#6b5a1e",
	"mm-checkbox": "#bbb",
	"mm-note-dot": "#888",
	"mm-syntax-keyword": "#ff7b72",
	"mm-syntax-string": "#a5d6ff",
	"mm-syntax-comment": "#8b949e",
	"mm-syntax-number": "#79c0ff",
	"mm-syntax-title": "#d2a8ff",
	"mm-syntax-attr": "#7ee787"
}, Ct = {
	family: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif",
	size: 16,
	weight: 400,
	style: "normal",
	lineHeight: 20
}, wt = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
function Tt(e) {
	return e === "left" ? "end" : e === "right" ? "start" : "center";
}
function Et(e, t) {
	let n = e.side === "top" || e.side === "bottom", r = (e.x + t.x) / 2, i = (e.y + t.y) / 2, a = n ? `${e.x},${i},${t.x},${i}` : `${r},${e.y},${r},${t.y}`;
	return `M${e.x},${e.y}C${a},${t.x},${t.y}`;
}
function Dt(e, t, n, r = 0) {
	return n === "left" ? {
		x: -r,
		y: t / 2
	} : n === "right" ? {
		x: e + r,
		y: t / 2
	} : n === "top" ? {
		x: e / 2,
		y: -r
	} : {
		x: e / 2,
		y: t + r
	};
}
var Ot = 8, kt = 5;
function At(e = {}) {
	let { tokens: t, colorOf: n } = bt(e);
	return {
		name: "cards",
		options: {
			color: k.colors(),
			colorDepth: k.number(0, !0)
		},
		configure: (t) => At({
			...e,
			...t
		}),
		tokens: {
			"mm-text": "#222",
			"mm-bg": "#f6f7f9",
			"mm-card-bg": "#fff",
			...xt,
			...t
		},
		darkTokens: {
			"mm-text": "#e6e6e6",
			"mm-bg": "#17181b",
			"mm-card-bg": "#25262b",
			...St
		},
		font: Ct,
		codeFontFamily: wt,
		textFill: "var(--mm-text)",
		node: {
			padding: [
				6,
				12,
				6,
				12
			],
			minHeight: 32,
			textAlign: (e) => Tt(e.direction),
			presence: (e, t) => ({
				opacity: e,
				transform: C(.6 + .4 * e, t.width / 2, t.height / 2)
			}),
			render(e, t, r) {
				let i = n(r.path), a = {
					kind: "rect",
					x: 0,
					y: 0,
					w: t.width,
					h: t.height,
					r: Ot,
					fill: "var(--mm-card-bg)",
					stroke: i,
					strokeWidth: r.depth === 0 ? 2.5 : 1.5
				};
				if (!r.hasChildren) return [a];
				let o = Dt(t.width, t.height, r.direction);
				return [a, {
					kind: "rect",
					x: o.x - kt,
					y: o.y - kt,
					w: 10,
					h: 10,
					r: kt,
					fill: r.folded ? i : "var(--mm-card-bg)",
					stroke: i,
					strokeWidth: 1.5
				}];
			},
			anchor(e, t) {
				let n = Dt(e.width, e.height, t);
				return {
					x: e.x + n.x,
					y: e.y + n.y,
					side: t
				};
			}
		},
		edge: { render: (e, t, r) => [{
			kind: "path",
			d: Et(e, t),
			stroke: n(r.node.path),
			strokeWidth: 1.5
		}] }
	};
}
var jt = At(), Mt = 6, Nt = 4, Pt = (e) => 1 + 3 / 2 ** e;
function Ft(e = {}) {
	let { tokens: t, colorOf: n } = bt(e);
	return {
		name: "classic",
		options: {
			color: k.colors(),
			colorDepth: k.number(0, !0)
		},
		configure: (t) => Ft({
			...e,
			...t
		}),
		tokens: {
			"mm-text": "#333",
			"mm-bg": "#fff",
			"mm-toggle-bg": "#fff",
			...xt,
			...t
		},
		darkTokens: {
			"mm-text": "#ddd",
			"mm-bg": "#1e1e1e",
			"mm-toggle-bg": "#1e1e1e",
			...St
		},
		font: Ct,
		codeFontFamily: wt,
		textFill: "var(--mm-text)",
		node: {
			padding: [
				0,
				8,
				0,
				8
			],
			minHeight: 16,
			textAlign: (e) => Tt(e.direction),
			render(e, t, r) {
				let i = n(r.path), a = Pt(r.depth), o = t.height + a / 2, s = {
					left: 0,
					right: t.width,
					top: t.width / 2,
					bottom: t.width / 2
				}[r.direction], c = [{
					kind: "path",
					d: `M0,${o}H${t.width}`,
					stroke: i,
					strokeWidth: a
				}];
				return r.hasChildren ? [...c, {
					kind: "rect",
					x: s - Mt,
					y: o - Mt,
					w: 12,
					h: 12,
					r: Mt,
					fill: r.folded ? i : "var(--mm-toggle-bg)",
					stroke: i,
					strokeWidth: 1.5
				}] : c;
			},
			anchor(e, t, n) {
				let r = e.y + e.height + Pt(n.depth) / 2;
				return t === "left" ? {
					x: e.x,
					y: r,
					side: t
				} : t === "right" ? {
					x: e.x + e.width,
					y: r,
					side: t
				} : {
					x: e.x + e.width / 2,
					y: t === "top" ? e.y - Nt : r,
					side: t
				};
			}
		},
		edge: { render: (e, t, r) => [{
			kind: "path",
			d: Et(e, t),
			stroke: n(r.node.path),
			strokeWidth: Pt(r.node.depth)
		}] }
	};
}
var It = Ft(), Lt = 6, Rt = 3.5, zt = {
	name: "minimal",
	tokens: {
		"mm-text": "#333",
		"mm-bg": "#fff",
		"mm-edge": "#c4c4c4",
		...xt
	},
	darkTokens: {
		"mm-text": "#ddd",
		"mm-bg": "#1e1e1e",
		"mm-edge": "#555",
		...St
	},
	font: Ct,
	codeFontFamily: wt,
	textFill: "var(--mm-text)",
	node: {
		padding: [
			2,
			4,
			2,
			4
		],
		textAlign: (e) => Tt(e.direction),
		render(e, t, n) {
			if (!n.hasChildren) return [];
			let r = Dt(t.width, t.height, n.direction, Lt);
			return [{
				kind: "rect",
				x: r.x - Rt,
				y: r.y - Rt,
				w: Rt * 2,
				h: Rt * 2,
				r: Rt,
				fill: n.folded ? "var(--mm-edge)" : "var(--mm-bg)",
				stroke: "var(--mm-edge)",
				strokeWidth: 1.5
			}];
		},
		anchor(e, t) {
			let n = Dt(e.width, e.height, t, Lt);
			return {
				x: e.x + n.x,
				y: e.y + n.y,
				side: t
			};
		}
	},
	edge: { render: (e, t) => [{
		kind: "path",
		d: Et(e, t),
		stroke: "var(--mm-edge)",
		strokeWidth: 1
	}] }
}, Bt = Object.freeze({
	[st.name]: st,
	[dt.name]: dt,
	[mt.name]: mt
}), Vt = Object.freeze({
	[It.name]: It,
	[jt.name]: jt,
	[zt.name]: zt
});
function Ht(e, t, n, r) {
	if (t == null) return;
	if (Object.hasOwn(n, t)) return n[t];
	let i = Object.keys(n).map((e) => `\`${e}\``);
	r.push(`Unknown ${e} \`${t}\`; available: ${i.join(", ")}`);
}
function Ut(e, t) {
	if (!e.options) return {
		theme: e,
		rest: t,
		warnings: []
	};
	let { options: n, rest: r, warnings: i } = A(t, e.options);
	return {
		theme: Object.keys(n).length && e.configure ? e.configure(n) : e,
		rest: r,
		warnings: i
	};
}
var Wt = [
	"wrapWidth",
	"levelGap",
	"siblingGap"
];
function Gt(e, t, { layouts: n = Bt, themes: r = Vt } = {}) {
	let i = ce(t), a = { ...e };
	for (let e of Wt) i.options[e] != null && (a[e] = i.options[e]);
	let o = [], s = Ht("layout", i.options.layout, n, o);
	s && (a.layout = s);
	let c = Ut(Ht("theme", i.options.theme, r, o) ?? e.theme ?? It, i.rest);
	return c.theme !== (e.theme ?? It) && (a.theme = c.theme), {
		options: a,
		json: i.options,
		warnings: [
			...i.warnings,
			...o,
			...c.warnings,
			...le(c.rest)
		]
	};
}
var Kt = 8;
function qt(e, t) {
	if (e != null) return Jt(e, typeof t == "function" ? t : (e) => t[e], 0);
}
function Jt(e, t, n) {
	if (n > Kt) return;
	let r = "", i = 0;
	for (;;) {
		let a = e.indexOf("var(", i);
		if (a < 0) return r + e.slice(i);
		let o = Yt(e, a + 4);
		if (o < 0) return;
		let s = e.slice(a + 4, o), c = Xt(s), l = (c < 0 ? s : s.slice(0, c)).trim();
		if (!l.startsWith("--")) return;
		let u = t(l.slice(2))?.trim(), d = u ? Jt(u, t, n + 1) : c < 0 ? void 0 : Jt(s.slice(c + 1).trim(), t, n + 1);
		if (d == null) return;
		r += e.slice(i, a) + d, i = o + 1;
	}
}
function Yt(e, t) {
	let n = 1;
	for (let r = t; r < e.length; r += 1) if (e[r] === "(") n += 1;
	else if (e[r] === ")" && --n === 0) return r;
	return -1;
}
function Xt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n += 1) if (e[n] === "(") t += 1;
	else if (e[n] === ")") --t;
	else if (e[n] === "," && t === 0) return n;
	return -1;
}
function Zt(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e) {
		for (let [e, n] of Object.entries(r.styles ?? {})) t.set(e, n);
		for (let [e, t] of Object.entries(r.atoms ?? {})) n.set(e, t);
	}
	return {
		styles: t,
		atoms: n
	};
}
function Qt(e, t) {
	let n = t.node.content;
	for (let r of e) r.transform && (n = r.transform(n, t.node));
	return n;
}
function $t(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		e && i.push({
			kind: "text",
			text: e.replace(/\s*\n\s*/g, " "),
			style: t,
			spans: n,
			width: 0
		});
	}, o = (e, t, s) => {
		for (let c of e) {
			let e = n.atoms.get(c.type);
			if (e) {
				let n = e.measure(c, t, r);
				i.push({
					kind: "atom",
					inline: c,
					renderer: e,
					size: n,
					style: t,
					spans: s,
					width: n.width
				});
				continue;
			}
			if (c.type === "break") {
				i.push({
					kind: "newline",
					style: t,
					spans: s,
					width: 0
				});
				continue;
			}
			let l = n.styles.get(c.type);
			if (l) {
				let e = l(c, t, r), n = {
					font: {
						...t.font,
						...e.font
					},
					fill: e.fill ?? t.fill
				}, u = e.decoration && {
					decoration: e.decoration,
					style: n
				}, d = u ? [...s, u] : s, f = e.decoration?.padding ?? 0;
				f && i.push({
					kind: "pad",
					style: n,
					spans: d,
					width: f
				}), "value" in c ? a(c.value, n, d) : "children" in c && o(c.children, n, d), f && i.push({
					kind: "pad",
					style: n,
					spans: d,
					width: f
				});
			} else c.type === "image" ? a(c.alt ?? "", t, s) : "value" in c ? a(c.value, t, s) : "children" in c && o(c.children, t, s);
		}
	};
	return o(e, t, []), i;
}
var en = new Intl.Segmenter(void 0, { granularity: "word" }), tn = new Intl.Segmenter(void 0, { granularity: "grapheme" }), nn = /[⺀-鿿가-힣豈-﫿＀-￯]/u, rn = /^[\p{Pe}\p{Pf}\p{Po}、。，！？]/u;
function an(e, t) {
	let n = [], r, i = !0, a = "", o = (e) => (r = {
		items: [],
		width: 0,
		space: e,
		newline: !1
	}, n.push(r), r);
	for (let s of e) if (s.kind === "newline") n.push({
		items: [],
		width: 0,
		space: !1,
		newline: !0
	}), r = void 0, i = !0;
	else if (s.kind === "atom") o(!1).items.push(s), r.width = s.width, r = void 0, i = !0;
	else if (s.kind === "pad") {
		let e = !r || r.space || i ? o(!1) : r;
		e.items.push(s), e.width += s.width, i = !1;
	} else for (let { segment: e } of en.segment(s.text)) {
		let n = /^\s+$/.test(e), c = n || i || (nn.test(e[0]) || nn.test(a.at(-1) ?? "")) && !rn.test(e), l = n ? " " : e, u = !r || c || r.space ? o(n) : r, d = t.measurer.measure(l, s.style.font), f = u.items.at(-1);
		f?.kind === "text" && f.style === s.style && f.spans === s.spans ? (f.text += l, f.width += d) : u.items.push({
			...s,
			text: l,
			width: d
		}), u.width += d, i = n, a = e;
	}
	return n;
}
function on(e, t) {
	let n = [];
	for (let r of e.items) if (r.kind !== "text") n.push({
		items: [r],
		width: r.width,
		space: !1,
		newline: !1
	});
	else for (let { segment: e } of tn.segment(r.text)) {
		let i = t.measurer.measure(e, r.style.font);
		n.push({
			items: [{
				...r,
				text: e,
				width: i
			}],
			width: i,
			space: !1,
			newline: !1
		});
	}
	return n;
}
function sn(e, t, n) {
	let r = [[]], i = 0, a = (e) => {
		let o = r.at(-1);
		if (e.newline) r.push([]), i = 0;
		else if (!e.space || o.length) {
			if (t > 0 && !e.space && o.length && i + e.width > t) {
				for (; o.at(-1)?.space;) i -= o.pop().width;
				if (r.push([]), i = 0, e.width > t) return void on(e, n).forEach(a);
			} else if (t > 0 && !o.length && e.width > t) {
				let t = on(e, n);
				if (t.length > 1) return void t.forEach(a);
			}
			r.at(-1).push(e), i += e.width;
		}
	};
	e.forEach(a);
	for (let e of r) for (; e.at(-1)?.space;) e.pop();
	return r;
}
function cn(e, t) {
	let { style: n, plugins: r, ctx: i } = t, a = sn(an($t(e, n, Zt(r), i), i), t.wrapWidth ?? 0, i), { font: o } = n, s = (o.lineHeight + o.size * .7) / 2, c = [], l = [], u = [], d = [], f = [], p = a.map((e) => e.reduce((e, t) => e + t.items.reduce((e, t) => e + t.width, 0), 0)), m = Math.max(0, ...p), h = {
		start: 0,
		center: .5,
		end: 1
	}[t.align ?? "start"], g = 0;
	for (let [e, t] of a.entries()) {
		let n = [], r = (m - p[e]) * h;
		for (let e of t.flatMap((e) => e.items)) n.push({
			item: e,
			x: r
		}), r += e.width;
		let a = s, _ = o.lineHeight - s;
		for (let { item: e } of n) e.kind === "atom" && (a = Math.max(a, e.size.baseline), _ = Math.max(_, e.size.height - e.size.baseline));
		let v = g + a, y = a + _;
		for (let { item: e, x: t } of n) if (e.kind === "text") {
			let n = f.at(-1);
			if (n && n.y === v && n.font === e.style.font && n.fill === e.style.fill && n.x + (n.width ?? 0) === t) n.text += e.text, n.width = (n.width ?? 0) + e.width;
			else {
				let n = {
					text: e.text,
					x: t,
					y: v,
					font: e.style.font,
					fill: e.style.fill,
					width: e.width
				};
				f.push(n);
			}
		} else if (e.kind === "atom") {
			let n = {
				x: t,
				y: v - e.size.baseline,
				width: e.size.width,
				height: e.size.height
			};
			u.push(...e.renderer.render(e.inline, n, e.style, i));
		}
		let b = /* @__PURE__ */ new Map();
		for (let { item: e, x: t } of n) for (let n of e.spans) {
			let r = b.get(n);
			r ? r[1] = t + e.width : b.set(n, [t, t + e.width]);
		}
		for (let [e, [t, n]] of b) {
			let { decoration: r, style: i } = e;
			if (r.background && c.push({
				kind: "rect",
				x: t,
				y: v - i.font.size * .95,
				w: n - t,
				h: i.font.size * 1.3,
				r: r.radius,
				fill: r.background
			}), r.strike) {
				let e = v - i.font.size * .3;
				l.push({
					kind: "path",
					d: `M${t},${e}H${n}`,
					stroke: r.strike,
					strokeWidth: Math.max(1, i.font.size / 14)
				});
			}
			r.href && d.push({
				kind: "link",
				href: r.href,
				rect: {
					x: t,
					y: g,
					width: n - t,
					height: y
				}
			});
		}
		g += y;
	}
	return {
		primitives: [
			...c,
			...f.length ? [{
				kind: "text",
				x: 0,
				y: 0,
				runs: f
			}] : [],
			...l,
			...u,
			...d
		],
		runs: f,
		width: m,
		height: g,
		lines: a.length
	};
}
function ln(e) {
	let t = /* @__PURE__ */ new Map(), n = (e, r) => {
		let i = [...r, e.id];
		t.set(e.id, i);
		for (let t of e.children) n(t, i);
	};
	return n(e, []), t;
}
function un(e, t, n, r, i) {
	let a = n.plugins ?? it, o = {
		theme: t,
		measurer: n.measurer,
		node: e,
		wrapWidth: n.wrapWidth,
		defer: i
	};
	return cn(Qt(a, o), {
		style: {
			font: t.font,
			fill: t.textFill
		},
		wrapWidth: n.wrapWidth,
		plugins: a,
		ctx: o,
		align: r
	});
}
function dn(e, t, n) {
	let r = t.theme ?? It, [i, a, o, s] = r.node.padding, c = /* @__PURE__ */ new Map(), l = ln(e);
	for (let u of at(e, t.folded)) {
		let e = l.get(u.id), d = e.length - 1, f = un(u, r, t, void 0, n), p = {
			depth: d,
			path: e,
			hasChildren: u.children.length > 0,
			folded: !!t.folded?.has(u.id)
		}, m = r.node.measure ? r.node.measure(f, u, p) : {
			width: f.width + s + a,
			height: Math.max(f.height + i + o, r.node.minHeight ?? 0)
		};
		c.set(u.id, {
			text: f,
			box: m
		});
	}
	return c;
}
function fn(e, t) {
	let n = t.theme ?? It, r = [], i = dn(e, t, (e) => r.push(e)), a = ln(e), o = /* @__PURE__ */ new Map(), s = (e) => {
		let t = o.get(e.node.id);
		return t || (t = {
			depth: e.depth,
			path: a.get(e.node.id),
			hasChildren: e.node.children.length > 0,
			folded: e.folded,
			direction: e.direction
		}, o.set(e.node.id, t)), t;
	}, c = (t.layout ?? st).layout(e, {
		sizes: new Map([...i].map(([e, { box: t }]) => [e, t])),
		folded: t.folded,
		levelGap: t.levelGap,
		siblingGap: t.siblingGap
	}), l = { nodes: c.nodes.map((e) => {
		let r = s(e), { text: a } = i.get(e.node.id), o = n.node.textAlign?.(r) ?? "start";
		return o !== "start" && a.lines > 1 && (a = un(e.node, n, t, o)), {
			node: e.node,
			parentId: e.parent?.node.id,
			rect: e.rect,
			ctx: r,
			text: a,
			presence: 1
		};
	}) }, u = pn(l, n), d = T([c.bounds, vn(u)]), f = r.length ? Promise.allSettled(r).then(() => void 0) : void 0;
	return {
		theme: n,
		layout: c,
		primitives: u,
		bounds: d,
		contexts: o,
		state: l,
		...f && { pending: f }
	};
}
function pn(e, t) {
	let n = new Map(e.nodes.map((e) => [e.node.id, e])), r = /* @__PURE__ */ new Map(), i = (e) => {
		if (e.presence >= 1) return {};
		let n = r.get(e.node.id);
		if (!n) {
			let i = {
				width: e.rect.width,
				height: e.rect.height
			};
			n = t.node.presence?.(e.presence, i, e.ctx) ?? { opacity: e.presence }, r.set(e.node.id, n);
		}
		return n;
	}, a = [];
	for (let r of e.nodes) {
		let e = r.parentId ? n.get(r.parentId) : void 0;
		if (!e) continue;
		let o = t.node.anchor(e.rect, r.ctx.direction, e.ctx), s = t.node.anchor(r.rect, ee(r.ctx.direction), r.ctx);
		a.push({
			kind: "group",
			key: `edge:${r.node.id}`,
			nodeId: r.node.id,
			bounds: hn(o, s),
			...gn(i(r)),
			children: t.edge.render(o, s, {
				source: e.node,
				target: r.node,
				node: r.ctx
			})
		});
	}
	let [o, , , s] = t.node.padding, c = e.nodes.map((e) => ({
		kind: "group",
		key: `node:${e.node.id}`,
		nodeId: e.node.id,
		bounds: E(e.rect, mn),
		transform: i(e).transform ? w(S(e.rect.x, e.rect.y), i(e).transform) : S(e.rect.x, e.rect.y),
		...gn(i(e)),
		children: [...t.node.render(e.node, {
			width: e.rect.width,
			height: e.rect.height
		}, e.ctx), {
			kind: "group",
			transform: S(s, o),
			children: e.text.primitives
		}]
	}));
	return [...a, ...c];
}
var mn = 24, hn = (e, t) => E({
	x: Math.min(e.x, t.x),
	y: Math.min(e.y, t.y),
	width: Math.abs(e.x - t.x),
	height: Math.abs(e.y - t.y)
}, mn), gn = ({ opacity: e }) => e != null && e < 1 ? { opacity: Math.max(0, e) } : {};
function _n(e) {
	let t = [], [n, r] = [0, 0];
	for (let [, i, a] of e.matchAll(/([MLHVC])([^MLHVC]*)/g)) {
		let e = a.match(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
		if (i === "H") for (let i of e) t.push([n = i, r]);
		else if (i === "V") for (let i of e) t.push([n, r = i]);
		else for (let i = 0; i + 1 < e.length; i += 2) t.push([n = e[i], r = e[i + 1]]);
	}
	return t;
}
function vn(e) {
	let t = [], n = ([e, n, r, i, a, o], s, c, l) => {
		let u = l * Math.max(Math.hypot(e, n), Math.hypot(r, i));
		t.push({
			x: e * s + r * c + a - u,
			y: n * s + i * c + o - u,
			width: 2 * u,
			height: 2 * u
		});
	}, r = (e, { x: t, y: r, width: i, height: a }, o) => {
		n(e, t, r, o), n(e, t + i, r, o), n(e, t, r + a, o), n(e, t + i, r + a, o);
	}, i = (e, t) => {
		for (let a of e) if (a.kind === "group") {
			let e = a.transform ? w(t, a.transform) : t;
			a.clip ? r(e, a.clip, 0) : i(a.children, e);
		} else if (a.kind === "rect" || a.kind === "image") {
			let e = {
				x: a.x,
				y: a.y,
				width: a.w,
				height: a.h
			};
			r(t, e, a.kind === "rect" ? yn(a) : 0);
		} else if (a.kind === "path") {
			let e = yn(a);
			for (let [r, i] of _n(a.d)) n(t, r, i, e);
		}
	};
	return i(e, S(0, 0)), T(t);
}
function yn(e) {
	return e.stroke ? (e.strokeWidth ?? 1) / 2 : 0;
}
var bn = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function xn(e) {
	return e.replace(/[&<>"']/g, (e) => bn[e]);
}
var Sn = (e) => String(Math.round(e * 100) / 100);
function Cn(e) {
	let t = "";
	for (let [n, r] of Object.entries(e)) r != null && r !== "" && (t += ` ${n}="${xn(typeof r == "number" ? Sn(r) : r)}"`);
	return t;
}
function wn(e) {
	let t = Object.entries(e).filter(([, e]) => e != null).map(([e, t]) => `${e}:${typeof t == "number" ? Sn(t) : t}`);
	return t.length ? t.join(";") : void 0;
}
function Tn(e) {
	return wn({
		fill: e.fill ?? "none",
		stroke: e.stroke,
		"stroke-width": e.stroke ? e.strokeWidth : void 0
	});
}
function En(e) {
	let { font: t } = e;
	return `<tspan${Cn({
		x: e.x,
		y: e.y,
		style: wn({
			"font-family": t.family,
			"font-size": `${Sn(t.size)}px`,
			"font-weight": t.weight,
			"font-style": t.style === "italic" ? "italic" : void 0,
			fill: e.fill
		})
	})}>${xn(e.text)}</tspan>`;
}
var Dn = {
	plain: /* @__PURE__ */ new WeakMap(),
	interactive: /* @__PURE__ */ new WeakMap()
};
function On(e, t = {}) {
	let n = t.interactive ? Dn.interactive : Dn.plain, r = n.get(e);
	return r ?? (r = kn(e, t), n.set(e, r)), r;
}
function kn(e, t) {
	let n = "";
	for (let r of e) if (!r.backends || r.backends.includes("svg")) switch (r.kind) {
		case "group": {
			let e = On(r.children, t);
			n += `<g${Cn({
				transform: r.transform && `matrix(${r.transform.map(Sn).join(" ")})`,
				opacity: r.opacity,
				"data-node-id": r.nodeId
			})}>${r.clip ? An(e, r.clip) : e}</g>`;
			break;
		}
		case "rect":
			n += `<rect${Cn({
				x: r.x,
				y: r.y,
				width: r.w,
				height: r.h,
				rx: r.r,
				style: Tn(r)
			})}/>`;
			break;
		case "path":
			n += `<path${Cn({
				d: r.d,
				style: Tn(r)
			})}/>`;
			break;
		case "text":
			n += `<text${Cn({
				transform: `translate(${Sn(r.x)} ${Sn(r.y)})`,
				"xml:space": "preserve"
			})}>${r.runs.map(En).join("")}</text>`;
			break;
		case "image":
			n += `<image${Cn({
				x: r.x,
				y: r.y,
				width: r.w,
				height: r.h,
				href: r.src
			})}/>`;
			break;
		case "link":
			n += `<a${Cn({
				href: r.href,
				target: "_blank"
			})}><rect${Cn({
				x: r.rect.x,
				y: r.rect.y,
				width: r.rect.width,
				height: r.rect.height,
				style: "fill:transparent"
			})}/></a>`;
			break;
		case "custom":
			n += r.svg?.() ?? "";
			break;
		case "hit": t.interactive && (n += `<rect${Cn({
			x: r.rect.x,
			y: r.rect.y,
			width: r.rect.width,
			height: r.rect.height,
			"data-action": r.action,
			style: "fill:transparent;cursor:pointer"
		})}/>`);
	}
	return n;
}
function An(e, { x: t, y: n, width: r, height: i }) {
	return `<svg${Cn({
		x: t,
		y: n,
		width: r,
		height: i,
		viewBox: [
			t,
			n,
			r,
			i
		].map(Sn).join(" ")
	})}>${e}</svg>`;
}
function jn(e) {
	let t = Mn(e) ? e.tokens : e;
	return Object.entries(t).filter(([e, t]) => /^[\w-]+$/.test(e) && oe(t)).map(([e, t]) => `--${e}:${t};`).join("");
}
var Mn = (e) => typeof e.tokens == "object";
function Nn(e, t = "light", n = ".markmap") {
	let r = `${n}{${jn(e.tokens)}}`;
	if (!e.darkTokens || t === "light") return r;
	let i = `${n}{${jn(e.darkTokens)}}`;
	return t === "dark" ? r + i : `${r}@media (prefers-color-scheme: dark){${i}}`;
}
var Pn = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, Fn = (e, t, n) => e + (t - e) * n, In = (e, t, n) => ({
	x: Fn(e.x, t.x, n),
	y: Fn(e.y, t.y, n),
	width: Fn(e.width, t.width, n),
	height: Fn(e.height, t.height, n)
});
function Ln(e, t) {
	let { path: n } = e.ctx;
	for (let e = n.length - 2; e >= 0; e--) {
		let r = t.get(n[e]);
		if (r) return r;
	}
}
function Rn(e, t, n, r) {
	let i = new Map(e.nodes.map((e) => [e.node.id, e])), a = new Map(t.nodes.map((e) => [e.node.id, e])), o = (e, t) => {
		let n = e.ctx.direction, i = r.anchor(t, n), a = r.anchor({
			...e,
			rect: {
				...e.rect,
				x: 0,
				y: 0
			}
		}, ee(n));
		return {
			...e.rect,
			x: i.x - a.x,
			y: i.y - a.y
		};
	}, s = t.nodes.map((e) => {
		let t = i.get(e.node.id);
		if (t) return {
			...e,
			rect: In(t.rect, e.rect, n),
			presence: Fn(t.presence, e.presence, n)
		};
		let r = Ln(e, i), a = r ? o(e, r) : e.rect;
		return {
			...e,
			rect: In(a, e.rect, n),
			presence: e.presence * n
		};
	});
	for (let t of e.nodes) {
		if (a.has(t.node.id)) continue;
		let e = Ln(t, a), r = e ? o(t, e) : t.rect;
		s.push({
			...t,
			rect: In(t.rect, r, n),
			presence: t.presence * (1 - n)
		});
	}
	return { nodes: s };
}
function zn(e, t, n, r, i) {
	return (i?.interpolate ?? Rn)(e, t, n, { anchor: (e, t) => r.node.anchor(e.rect, t, e.ctx) });
}
// ../canvas/dist/export-D0aKjidm.js
var Bn = /* @__PURE__ */ new Set();
function Vn(e) {
	Bn.has(e) || (Bn.add(e), console.warn(e));
}
var Hn = "#000", Un = 3, Wn = 6, Gn = .4, Kn = "#888", qn = /* @__PURE__ */ new WeakMap(), Jn = (e, t) => e.x < t.x + t.width && t.x < e.x + e.width && e.y < t.y + t.height && t.y < e.y + e.height, Yn = (e) => e.width ?? e.text.length * e.font.size * .5;
function Xn(e, t, n) {
	let { view: r } = n, i = r?.scale, a = n.warn ?? Vn, o = n.createPath ?? ((e) => new Path2D(e)), s = /* @__PURE__ */ new Map(), c, l = (e) => {
		if (e != null && e !== "none") return s.has(e) || s.set(e, qt(e, n.tokens)), s.get(e);
	}, u = (t, n, r) => {
		let i = l(t.fill);
		i && (e.fillStyle = i, n());
		let a = l(t.stroke);
		a && (e.strokeStyle = a, e.lineWidth = t.strokeWidth ?? 1, r());
	}, d = (e) => {
		let t = qn.get(e);
		return t || (t = o(e.d), qn.set(e, t)), t;
	}, f = (t) => {
		let { globalAlpha: n } = e;
		e.globalAlpha = n * Gn;
		for (let n of t.runs) {
			let { size: r } = n.font;
			e.fillStyle = l(n.fill) ?? Hn, e.fillRect(t.x + n.x, t.y + n.y - r * .7, Yn(n), r * .8);
		}
		e.globalAlpha = n;
	}, p = (t) => {
		let { globalAlpha: n } = e;
		e.globalAlpha = n * Gn, e.fillStyle = Kn, e.fillRect(t.x, t.y, t.w, t.h), e.globalAlpha = n;
	}, m = (t) => {
		if (i && t.runs.every((e) => e.font.size * i < Un)) f(t);
		else for (let r of t.runs) {
			let i = ht(r.font), a = n.fontFallback ? `${i}, ${n.fontFallback}` : i;
			a !== c && (e.font = a, c = a), e.fillStyle = l(r.fill) ?? Hn, e.fillText(r.text, t.x + r.x, t.y + r.y);
		}
	}, h = (t, o = !1) => {
		for (let s of t) if (!s.backends || s.backends.includes("canvas")) switch (s.kind) {
			case "group": {
				if (o && s.bounds && r && !Jn(s.bounds, r.rect)) break;
				let t = s.transform || s.opacity != null || s.clip, n = c;
				t && e.save(), s.transform && e.transform(...s.transform), s.opacity != null && (e.globalAlpha *= s.opacity), s.clip && (e.beginPath(), e.rect(s.clip.x, s.clip.y, s.clip.width, s.clip.height), e.clip()), h(s.children), t && (e.restore(), c = n);
				break;
			}
			case "rect":
				e.beginPath(), s.r ? e.roundRect(s.x, s.y, s.w, s.h, s.r) : e.rect(s.x, s.y, s.w, s.h), u(s, () => e.fill(), () => e.stroke());
				break;
			case "path": {
				let t = d(s);
				u(s, () => e.fill(t), () => e.stroke(t));
				break;
			}
			case "text":
				m(s);
				break;
			case "image": {
				if (i && Math.max(s.w, s.h) * i < Wn) {
					p(s);
					break;
				}
				let t = n.image?.(s.src);
				if (t) {
					let { x: n, y: r, w: i, h: a } = Zn(s, t);
					e.drawImage(t.source, n, r, i, a);
				} else t === null && s.fallback && h(s.fallback);
				break;
			}
			case "custom":
				s.canvas ? (e.save(), s.canvas(e), e.restore()) : a("Skipped a custom primitive with no canvas drawing");
				break;
			case "overlay": a("Skipped an overlay primitive: canvas does not draw them yet");
		}
	};
	e.textAlign = "start", e.textBaseline = "alphabetic", h(t, !0);
}
function Zn(e, { width: t, height: n }) {
	if (!t || !n) return e;
	let r = Math.min(e.w / t, e.h / n), i = t * r, a = n * r;
	return {
		x: e.x + (e.w - i) / 2,
		y: e.y + (e.h - a) / 2,
		w: i,
		h: a
	};
}
function Qn(e, t) {
	return new Promise((n, r) => {
		let i = new Image();
		t && (i.crossOrigin = t), i.addEventListener("load", () => n({
			source: i,
			width: i.naturalWidth,
			height: i.naturalHeight
		})), i.addEventListener("error", () => r(/* @__PURE__ */ Error(`Could not load ${e}`))), i.src = e;
	});
}
var $n = class {
	images = /* @__PURE__ */ new Map();
	loading = /* @__PURE__ */ new Map();
	load;
	onLoad;
	constructor(e = {}) {
		this.load = e.load ?? ((t) => Qn(t, e.crossOrigin)), this.onLoad = e.onLoad;
	}
	get(e) {
		let t = this.images.get(e);
		return t === void 0 && this.start(e), t;
	}
	async preload(e) {
		await Promise.all(Array.from(e, (e) => this.start(e)));
	}
	start(e) {
		let t = this.loading.get(e);
		return t || (t = this.load(e).then((t) => {
			this.images.set(e, t), this.onLoad?.();
		}, () => {
			this.images.set(e, null), this.onLoad?.();
		}), this.loading.set(e, t)), t;
	}
}, er = class {
	element;
	themeSelector;
	ctx;
	style;
	primitives = [];
	transform = {
		k: 1,
		x: 0,
		y: 0
	};
	images = new $n({ onLoad: () => this.schedule() });
	env;
	frame;
	resizeObserver;
	darkQuery;
	constructor(e, { themeSelector: t } = {}) {
		let n = e.getContext("2d");
		if (!n) throw Error("Canvas 2D is not available");
		this.element = e, this.themeSelector = t, this.ctx = n;
		let r = e.ownerDocument;
		this.style = r.createElement("style");
		let i = e.getRootNode();
		(i.host ? i : r.head).append(this.style);
		let a = r.defaultView?.getComputedStyle(e);
		this.env = {
			tokens: (e) => a?.getPropertyValue(`--${e}`),
			image: (e) => this.images.get(e)
		}, typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.paint()), this.resizeObserver.observe(e)), this.darkQuery = r.defaultView?.matchMedia?.("(prefers-color-scheme: dark)"), this.darkQuery?.addEventListener("change", this.schedule);
	}
	draw(e) {
		this.primitives = e, this.schedule();
	}
	setTransform(e) {
		this.transform = e, this.schedule();
	}
	setCSS(e) {
		this.style.textContent = e, this.schedule();
	}
	schedule = () => {
		if (this.frame != null) return;
		let e = this.element.ownerDocument.defaultView;
		this.frame = e?.requestAnimationFrame(() => {
			this.frame = void 0, this.paint();
		});
	};
	paint() {
		let { ctx: e, element: t } = this, n = this.fitToElement();
		if (!n) return;
		e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height);
		let { k: r, x: i, y: a } = this.transform;
		e.setTransform(r * n, 0, 0, r * n, i * n, a * n), Xn(e, this.primitives, {
			...this.env,
			view: {
				rect: {
					x: -i / r,
					y: -a / r,
					width: t.width / n / r,
					height: t.height / n / r
				},
				scale: r
			}
		});
	}
	fitToElement() {
		let { element: e } = this, { width: t, height: n } = e.getBoundingClientRect();
		if (!t || !n) return 0;
		let r = e.ownerDocument.defaultView?.devicePixelRatio || 1, i = Math.round(t * r), a = Math.round(n * r);
		if (e.width !== i || e.height !== a) {
			e.width = i, e.height = a;
			let r = e.getBoundingClientRect();
			(r.width !== t || r.height !== n) && (e.style.width = `${t}px`, e.style.height = `${n}px`);
		}
		return r;
	}
	destroy() {
		let e = this.element.ownerDocument.defaultView;
		this.frame != null && e?.cancelAnimationFrame(this.frame), this.frame = void 0, this.resizeObserver?.disconnect(), this.darkQuery?.removeEventListener("change", this.schedule), this.style.remove(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}
}, tr = /* @__PURE__ */ x((/* @__PURE__ */ v(((e, t) => {
	(function() {
		var e = t === void 0 ? function() {
			return this || (0, eval)("this");
		}() : t.exports = i;
		e.format = i, e.vsprintf = r, typeof console < "u" && typeof console.log == "function" && (e.printf = n);
		function n() {
			console.log(i.apply(null, arguments));
		}
		function r(e, t) {
			return i.apply(null, [e].concat(t));
		}
		function i(e) {
			for (var t = 1, n = [].slice.call(arguments), r = 0, i = e.length, a = "", o, s = !1, c, l, u = !1, d, f = function() {
				return n[t++];
			}, p = function() {
				for (var t = ""; /\d/.test(e[r]);) t += e[r++], o = e[r];
				return t.length > 0 ? parseInt(t) : null;
			}; r < i; ++r) if (o = e[r], s) switch (s = !1, o == "." ? (u = !1, o = e[++r]) : o == "0" && e[r + 1] == "." ? (u = !0, r += 2, o = e[r]) : u = !0, d = p(), o) {
				case "b":
					a += parseInt(f(), 10).toString(2);
					break;
				case "c":
					c = f(), typeof c == "string" || c instanceof String ? a += c : a += String.fromCharCode(parseInt(c, 10));
					break;
				case "d":
					a += parseInt(f(), 10);
					break;
				case "f":
					l = String(parseFloat(f()).toFixed(d || 6)), a += u ? l : l.replace(/^0/, "");
					break;
				case "j":
					a += JSON.stringify(f());
					break;
				case "o":
					a += "0" + parseInt(f(), 10).toString(8);
					break;
				case "s":
					a += f();
					break;
				case "x":
					a += "0x" + parseInt(f(), 10).toString(16);
					break;
				case "X":
					a += "0x" + parseInt(f(), 10).toString(16).toUpperCase();
					break;
				default: a += o;
			}
			else o === "%" ? s = !0 : a += o;
			return a;
		}
	})();
})))(), 1), nr = Object.assign(rr(Error), {
	eval: rr(EvalError),
	range: rr(RangeError),
	reference: rr(ReferenceError),
	syntax: rr(SyntaxError),
	type: rr(TypeError),
	uri: rr(URIError)
});
function rr(e) {
	return t.displayName = e.displayName || e.name, t;
	function t(t, ...n) {
		return new e(t && (0, tr.default)(t, ...n));
	}
}
// ../../node_modules/.pnpm/micromark-extension-frontmatter@2.0.0/node_modules/micromark-extension-frontmatter/lib/to-matters.js
var ir = {}.hasOwnProperty, ar = {
	yaml: "-",
	toml: "+"
};
function or(e) {
	let t = [], n = -1, r = Array.isArray(e) ? e : e ? [e] : ["yaml"];
	for (; ++n < r.length;) t[n] = sr(r[n]);
	return t;
}
function sr(e) {
	let t = e;
	if (typeof t == "string") {
		if (!ir.call(ar, t)) throw nr("Missing matter definition for `%s`", t);
		t = {
			type: t,
			marker: ar[t]
		};
	} else if (typeof t != "object") throw nr("Expected matter to be an object, not `%j`", t);
	if (!ir.call(t, "type")) throw nr("Missing `type` in matter `%j`", t);
	if (!ir.call(t, "fence") && !ir.call(t, "marker")) throw nr("Missing `marker` or `fence` in matter `%j`", t);
	return t;
}
// ../../node_modules/.pnpm/micromark-extension-frontmatter@2.0.0/node_modules/micromark-extension-frontmatter/lib/syntax.js
function cr(e) {
	let t = or(e), n = {}, r = -1;
	for (; ++r < t.length;) {
		let e = t[r], i = ur(e, "open").charCodeAt(0), a = lr(e), o = n[i];
		Array.isArray(o) ? o.push(a) : n[i] = [a];
	}
	return { flow: n };
}
function lr(e) {
	let n = e.anywhere, r = e.type, i = r + "Fence", a = i + "Sequence", o = r + "Value", s = {
		tokenize: f,
		partial: !0
	}, c, l = 0;
	return {
		tokenize: u,
		concrete: !0
	};
	function u(u, f, p) {
		let m = this;
		return h;
		function h(t) {
			let o = m.now();
			return o.column === 1 && (o.line === 1 || n) && (c = ur(e, "open"), l = 0, t === c.charCodeAt(l)) ? (u.enter(r), u.enter(i), u.enter(a), g(t)) : p(t);
		}
		function g(e) {
			return l === c.length ? (u.exit(a), d(e) ? (u.enter("whitespace"), _(e)) : v(e)) : e === c.charCodeAt(l++) ? (u.consume(e), g) : p(e);
		}
		function _(e) {
			return d(e) ? (u.consume(e), _) : (u.exit("whitespace"), v(e));
		}
		function v(n) {
			return t(n) ? (u.exit(i), u.enter("lineEnding"), u.consume(n), u.exit("lineEnding"), c = ur(e, "close"), l = 0, u.attempt(s, S, y)) : p(n);
		}
		function y(e) {
			return e === null || t(e) ? x(e) : (u.enter(o), b(e));
		}
		function b(e) {
			return e === null || t(e) ? (u.exit(o), x(e)) : (u.consume(e), b);
		}
		function x(e) {
			return e === null ? p(e) : (u.enter("lineEnding"), u.consume(e), u.exit("lineEnding"), u.attempt(s, S, y));
		}
		function S(e) {
			return u.exit(r), f(e);
		}
	}
	function f(e, n, r) {
		let o = 0;
		return s;
		function s(t) {
			return t === c.charCodeAt(o) ? (e.enter(i), e.enter(a), l(t)) : r(t);
		}
		function l(t) {
			return o === c.length ? (e.exit(a), d(t) ? (e.enter("whitespace"), u(t)) : f(t)) : t === c.charCodeAt(o++) ? (e.consume(t), l) : r(t);
		}
		function u(t) {
			return d(t) ? (e.consume(t), u) : (e.exit("whitespace"), f(t));
		}
		function f(a) {
			return a === null || t(a) ? (e.exit(i), n(a)) : r(a);
		}
	}
}
function ur(e, t) {
	return e.marker ? dr(e.marker, t).repeat(3) : dr(e.fence, t);
}
function dr(e, t) {
	return typeof e == "string" ? e : e[t];
}
// ../../node_modules/.pnpm/escape-string-regexp@5.0.0/node_modules/escape-string-regexp/index.js
function fr(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
// ../../node_modules/.pnpm/mdast-util-frontmatter@2.0.1/node_modules/mdast-util-frontmatter/lib/index.js
function pr(e) {
	let t = or(e), n = {}, r = {}, i = -1;
	for (; ++i < t.length;) {
		let e = t[i];
		n[e.type] = mr(e), r[e.type] = hr, r[e.type + "Value"] = gr;
	}
	return {
		enter: n,
		exit: r
	};
}
function mr(e) {
	return t;
	function t(t) {
		this.enter({
			type: e.type,
			value: ""
		}, t), this.buffer();
	}
}
function hr(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	"value" in n, this.exit(e), n.value = t.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
}
function gr(e) {
	this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
}
function _r(e) {
	let t = [], n = {}, r = or(e), i = -1;
	for (; ++i < r.length;) {
		let e = r[i];
		n[e.type] = vr(e);
		let a = yr(e, "open");
		t.push({
			atBreak: !0,
			character: a.charAt(0),
			after: fr(a.charAt(1))
		});
	}
	return {
		unsafe: t,
		handlers: n
	};
}
function vr(e) {
	let t = yr(e, "open"), n = yr(e, "close");
	return r;
	function r(e) {
		return t + (e.value ? "\n" + e.value : "") + "\n" + n;
	}
}
function yr(e, t) {
	return e.marker ? br(e.marker, t).repeat(3) : br(e.fence, t);
}
function br(e, t) {
	return typeof e == "string" ? e : e[t];
}
// ../../node_modules/.pnpm/remark-frontmatter@5.0.0/node_modules/remark-frontmatter/lib/index.js
var xr = "yaml";
function Sr(e) {
	let t = this, n = e || xr, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(cr(n)), a.push(pr(n)), o.push(_r(n));
}
// ../../node_modules/.pnpm/ccount@2.0.1/node_modules/ccount/index.js
function Cr(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
// ../../node_modules/.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/lib/index.js
var wr = (function(e) {
	if (e == null) return kr;
	if (typeof e == "function") return Or(e);
	if (typeof e == "object") return Array.isArray(e) ? Tr(e) : Er(e);
	if (typeof e == "string") return Dr(e);
	throw Error("Expected function, string, or object as test");
});
function Tr(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = wr(e[n]);
	return Or(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function Er(e) {
	let t = e;
	return Or(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function Dr(e) {
	return Or(t);
	function t(t) {
		return t && t.type === e;
	}
}
function Or(e) {
	return t;
	function t(t, n, r) {
		return !!(Ar(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function kr() {
	return !0;
}
function Ar(e) {
	return typeof e == "object" && !!e && "type" in e;
}
// ../../node_modules/.pnpm/unist-util-visit-parents@6.1.0/node_modules/unist-util-visit-parents/lib/color.js
function jr(e) {
	return e;
}
// ../../node_modules/.pnpm/unist-util-visit-parents@6.1.0/node_modules/unist-util-visit-parents/lib/index.js
var Mr = [], Nr = "skip";
function Pr(e, t, n, r) {
	if (!e || typeof e != "object") throw Error("Unexpected value `" + e + "` for `tree`, expected node");
	let i = !0, a, o, s, c;
	if (typeof n == "function" || n && typeof n == "object" ? (a = t, o = n, r && (i = !1)) : (o = t, n && (i = !1)), typeof o == "function") s = o;
	else if (o && typeof o == "object") {
		if (o.enter !== null && o.enter !== void 0) {
			if (typeof o.enter == "function") s = o.enter;
			else throw Error("Unexpected value `" + o.enter + "` for `visitors.enter`, expected optional visitor");
		}
		if (typeof o.exit == "function") c = o.exit;
		else throw Error("Unexpected value `" + o.exit + "` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)");
	} else throw Error("Unexpected value `" + o + "` for `enter` or `visitors`, expected visitor or object with visitors");
	let l = wr(a), u = i ? 1 : -1;
	d(e, void 0, [])();
	function d(e, t, n) {
		let r = e && typeof e == "object" ? e : {};
		if (typeof r.type == "string") {
			let t = typeof r.tagName == "string" ? r.tagName : typeof r.name == "string" ? r.name : void 0;
			Object.defineProperty(o, "name", { value: "node (" + jr(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return o;
		function o() {
			let r = !a || l(e, t, n[n.length - 1] || void 0), o = Mr;
			if (s && r && (o = Fr(s(e, n, t)), o[0] === !1)) return o;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && o[0] !== "skip") {
					let e = (i ? -1 : t.children.length) + u, r = [...n, t];
					for (; e > -1 && e < t.children.length;) {
						let n = t.children[e], i = d(n, e, r)();
						if (i[0] === !1) return i;
						e = typeof i[1] == "number" ? i[1] : e + u;
					}
				}
			}
			if (c && r) {
				let r = Fr(c(e, n, t));
				if (r[0] === "skip") throw Error("Unexpected value `" + r[0] + "` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing");
				if (r[0] === !1 || typeof r[1] == "number") return r;
			}
			return o;
		}
	}
}
function Fr(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? Mr : [e];
}
// ../../node_modules/.pnpm/mdast-util-find-and-replace@3.0.4/node_modules/mdast-util-find-and-replace/lib/index.js
function Ir(e, t, n) {
	let r = wr((n || {}).ignore || []), i = Lr(t), a = -1;
	for (; ++a < i.length;) Pr(e, o);
	function o(e, t, n) {
		if (e.type === "text" && typeof n == "number") return s(e, t, n);
		if (r(e, n, t[t.length - 1])) return Nr;
	}
	function s(e, t, n) {
		let r = t[t.length - 1], o = i[a][0], s = i[a][1], c = 0, l = !1, u = [];
		o.lastIndex = 0;
		let d = o.exec(e.value);
		for (; d;) {
			let n = d.index, r = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, i = s(...d, r);
			if (typeof i == "string" && (i = i.length > 0 ? {
				type: "text",
				value: i
			} : void 0), i === !1) o.lastIndex = n + 1;
			else {
				if (c !== n && f({
					type: "text",
					value: e.value.slice(c, n)
				}), Array.isArray(i)) for (let e of i) f(e);
				else i && f(i);
				c = n + d[0].length, l = !0;
			}
			if (!o.global) break;
			d = o.exec(e.value);
		}
		return l ? (c < e.value.length && f({
			type: "text",
			value: e.value.slice(c)
		}), r.children.splice(n, 1, ...u)) : u = [e], n + u.length;
		function f(e) {
			let t = u[u.length - 1];
			t && t.type === "text" && e.type === "text" ? t.value += e.value : u.push(e);
		}
	}
}
function Lr(e) {
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let t = [], n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([Rr(e[0]), zr(e[1])]);
	}
	return t;
}
function Rr(e) {
	return typeof e == "string" ? new RegExp(fr(e), "g") : e;
}
function zr(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
// ../../node_modules/.pnpm/mdast-util-gfm-autolink-literal@2.0.1/node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var Br = "phrasing", Vr = [
	"autolink",
	"link",
	"image",
	"label"
];
function Hr() {
	return {
		transforms: [Xr],
		enter: {
			literalAutolink: Wr,
			literalAutolinkEmail: Gr,
			literalAutolinkHttp: Gr,
			literalAutolinkWww: Gr
		},
		exit: {
			literalAutolink: Yr,
			literalAutolinkEmail: Jr,
			literalAutolinkHttp: Kr,
			literalAutolinkWww: qr
		}
	};
}
function Ur() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: Br,
			notInConstruct: Vr
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: Br,
			notInConstruct: Vr
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: Br,
			notInConstruct: Vr
		}
	] };
}
function Wr(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function Gr(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function Kr(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function qr(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Jr(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Yr(e) {
	this.exit(e);
}
function Xr(e) {
	Ir(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Zr], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, Qr]], { ignore: ["link", "linkReference"] });
}
function Zr(e, t, n, r, i) {
	let a = "";
	if (!ti(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !$r(n))) return !1;
	let o = ei(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function Qr(e, t, n, r) {
	return !ti(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function $r(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function ei(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = Cr(e, "("), a = Cr(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function ti(e, t) {
	let i = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || r(i) || n(i)) && (!t || i !== 47);
}
// ../../node_modules/.pnpm/micromark-util-normalize-identifier@2.0.1/node_modules/micromark-util-normalize-identifier/index.js
function j(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
// ../../node_modules/.pnpm/mdast-util-gfm-footnote@2.1.0/node_modules/mdast-util-gfm-footnote/lib/index.js
di.peek = ui;
function ni() {
	this.buffer();
}
function ri(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function ii() {
	this.buffer();
}
function ai(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function oi(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = j(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function si(e) {
	this.exit(e);
}
function ci(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = j(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function li(e) {
	this.exit(e);
}
function ui() {
	return "[";
}
function di(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function fi() {
	return {
		enter: {
			gfmFootnoteCallString: ni,
			gfmFootnoteCall: ri,
			gfmFootnoteDefinitionLabelString: ii,
			gfmFootnoteDefinition: ai
		},
		exit: {
			gfmFootnoteCallString: oi,
			gfmFootnoteCall: si,
			gfmFootnoteDefinitionLabelString: ci,
			gfmFootnoteDefinition: li
		}
	};
}
function pi(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: di
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? hi : mi))), s(), o;
	}
}
function mi(e, t, n) {
	return t === 0 ? e : hi(e, t, n);
}
function hi(e, t, n) {
	return (n ? "" : "    ") + e;
}
// ../../node_modules/.pnpm/mdast-util-gfm-strikethrough@2.0.1/node_modules/mdast-util-gfm-strikethrough/lib/index.js
var gi = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
xi.attention = Si, xi.peek = Ci;
function _i() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: yi },
		exit: { strikethrough: bi }
	};
}
function vi() {
	return {
		handlers: { delete: xi },
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: gi
		}]
	};
}
function yi(e) {
	this.enter({
		type: "delete",
		children: [],
		position: void 0
	}, e);
}
function bi(e) {
	this.exit(e);
}
function xi(e, t, n, r) {
	let i = n.createTracker(r), a = n.stack.includes("strikethrough") ? "~" : "~~", o = n.enter("strikethrough"), s = i.move(a);
	return s += n.containerPhrasing(e, {
		...i.current(),
		before: s,
		after: "~"
	}), s += i.move(a), o(), s;
}
function Si() {
	return {
		construct: "strikethrough",
		markers: ["~"],
		sizes: [2, 1]
	};
}
function Ci() {
	return "~";
}
// ../../node_modules/.pnpm/markdown-table@3.1.0/node_modules/markdown-table/index.js
function wi(e) {
	return e.length;
}
function Ti(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || wi, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = Ei(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = Di(r[d]);
	else {
		let e = Di(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u], r = n.fillRows === !1 ? Math.max(1, o[u === 1 ? 0 : u].length) : l;
		d = -1;
		let i = [];
		for (; ++d < r;) {
			let o = e[d] || "", s = "", l = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				if (n === 114) s = " ".repeat(e);
				else if (n === 99) {
					let t = e / 2;
					e % 2 ? (s = " ".repeat(t + .5), l = " ".repeat(t - .5)) : (s = " ".repeat(t), l = s);
				} else l = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && i.push("|"), n.padding === !1 || n.alignDelimiters === !1 && o === "" || n.delimiterStart === !1 && !d || i.push(" "), n.alignDelimiters !== !1 && i.push(s), i.push(o), n.alignDelimiters !== !1 && i.push(l), n.padding !== !1 && i.push(" "), (n.delimiterEnd !== !1 || d !== r - 1) && i.push("|");
		}
		m.push(n.delimiterEnd === !1 ? i.join("").replace(/ +$/, "") : i.join(""));
	}
	return m.join("\n");
}
function Ei(e) {
	return e == null ? "" : String(e);
}
function Di(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
// ../../node_modules/.pnpm/mdast-util-phrasing@4.1.0/node_modules/mdast-util-phrasing/lib/index.js
var Oi = wr([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function ki(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), Ai);
	return i(), o;
}
function Ai(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function ji(e, t) {
	return Mi(e, t.inConstruct, !0) && !Mi(e, t.notInConstruct, !1);
}
function Mi(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/break.js
function Ni(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) {
		let e = n.unsafe[i];
		if (e.character === "\n" && !e.before && !e.after && ji(n.stack, e)) return /[\t ]/.test(r.before) ? "" : " ";
	}
	return "\\\n";
}
// ../../node_modules/.pnpm/longest-streak@3.1.0/node_modules/longest-streak/index.js
function Pi(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function Fi(e, t) {
	return !(t.options.fences !== !1 || !e.value || e.lang || !/[^\n\r ]/.test(e.value) || /^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(e.value));
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function Ii(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/code.js
function Li(e, t, n, r) {
	let i = Ii(n), a = e.value || "";
	if (Fi(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, Ri);
		return e(), t;
	}
	let o = n.createTracker(r), s = i.repeat(Math.max(Pi(a, i) + 1, 3)), c = n.enter("codeFenced"), l = i === "`" ? "GraveAccent" : "Tilde", u = o.move(s);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${l}`);
		u += o.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...o.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${l}`);
		u += o.move(" "), u += o.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...o.current()
		})), t();
	}
	return u += o.move("\n"), a && (u += o.move(a + "\n")), u += o.move(s), c(), u;
}
function Ri(e, t, n) {
	return (n ? "" : "    ") + e;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function zi(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/definition.js
function Bi(e, t, n, r) {
	let i = zi(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function Vi(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
// ../../node_modules/.pnpm/micromark-util-classify-character@2.0.1/node_modules/micromark-util-classify-character/index.js
function Hi(e) {
	if (e === null || a(e) || r(e)) return 1;
	if (n(e)) return 2;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/character.js
function Ui(e) {
	let t = e.codePointAt(0);
	return t === void 0 ? "" : String.fromCodePoint(t);
}
function Wi(e) {
	let t = e.codePointAt(e.length - 2);
	return t !== void 0 && t > 65535 ? e.slice(-2) : e.slice(-1);
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function Gi(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function Ki(e, t, n) {
	let r = Hi(e), i = Hi(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
// ../../node_modules/.pnpm/micromark-util-html-tag-name@2.0.1/node_modules/micromark-util-html-tag-name/index.js
var qi = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), Ji = [
	"pre",
	"script",
	"style",
	"textarea"
];
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/html-kind.js
function Yi(e) {
	if (e.charCodeAt(0) !== 60) return;
	let t = e.charCodeAt(1);
	if (t === 33) {
		let t = e.charCodeAt(2);
		return t === 45 ? 2 : t === 91 ? 5 : u(t) ? 4 : void 0;
	}
	if (t === 63) return 3;
	let n = t === 47, r = n ? 2 : 1, i = r, a = e.charCodeAt(i);
	if (!u(a)) return;
	for (; a === 45 || o(a);) a = e.charCodeAt(++i);
	let s = e.slice(r, i).toLowerCase();
	return !n && a !== 47 && Ji.includes(s) ? 1 : qi.includes(s) ? 6 : 7;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
var Xi = /* @__PURE__ */ new Map([["*", !1], ["_", !0]]);
function Zi(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let i of e) {
		let e = n.get(i);
		if (e && i.attention && t.some((e) => e.attention === i.attention)) for (let t of e.tokens) r.add(t.attention);
	}
	let i = [];
	for (let t of e) t.attention && r.delete(t.attention) && i.push(t.attention);
	return i.reverse(), i;
}
function Qi(e, t, n) {
	let r = [], i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = 0;
	for (; o < e.length;) {
		if (!e[o].attention) {
			o++;
			continue;
		}
		let s = e[o].value.charAt(0), c = Xi.get(s), l = o + 1;
		for (; l < e.length && e[l].attention && e[l].value.charAt(0) === s;) l++;
		let u = o ? e[o - 1].value : t, d = Hi(u.charCodeAt(u.length - 1)), f = Hi((l < e.length ? e[l].value : n).charCodeAt(0)), p = !f || f === 2 && !!d, m = !d || d === 2 && !!f, h = {
			tokens: e.slice(o, l),
			markers: [],
			start: 0,
			end: 0,
			open: c ? p && (!!d || !m) : p,
			close: c ? m && (!!f || !p) : m,
			split: c !== void 0
		};
		for (let e of h.tokens) {
			i.set(e, [...h.tokens]), a.set(e, h);
			let t = e.value.length;
			for (; t--;) h.markers.push(e);
		}
		h.end = h.markers.length, r.push(h), o = l;
	}
	for (ta(r, i), o = -1; ++o < e.length;) {
		let t = i.get(e[o]);
		if (t) return {
			attention: Zi(e, t, a),
			index: o
		};
	}
}
function $i(e, t) {
	let n = e[t ? 0 : e.length - 1];
	if (!n || n.attention) return;
	let r = t ? Ui(n.value) : Wi(n.value), i = Gi(r.codePointAt(0));
	if (t) n.value = i + n.value.slice(r.length);
	else {
		let e = n.value.slice(0, n.value.length - r.length), t = 0;
		for (; e.charCodeAt(e.length - 1 - t) === 92;) t++;
		t % 2 && (e += "\\"), n.value = e + i;
	}
}
function ea(e, t, n, r, i) {
	for (let a of n.attention) {
		let o = t.get(a) || a.sequences[0];
		for (let s of a.sequences) {
			if (s === o) continue;
			let c = new Map(t);
			c.set(a, s);
			let l = aa(e, c, r, i), u = Qi(l, r, i);
			if (!u || u.index > n.index) return {
				chosen: c,
				mistake: u,
				tokens: l
			};
		}
	}
}
function ta(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.tokens[0].value.charAt(0), i = n.get(e);
		i || (i = [], n.set(e, i));
		let a = r.close ? i.length : 0;
		for (; a-- && r.start < r.end;) {
			let e = i[a], n = e.end - e.start, o = r.end - r.start;
			if (r.split ? (e.close || r.open) && o % 3 && !((n + o) % 3) : n !== e.markers.length || n !== o) continue;
			let s = r.split ? n > 1 && o > 1 ? 2 : 1 : o, c = e.markers.slice(e.end - s, e.end), l = r.markers.slice(r.start, r.start + s), u = c[0], d = l[0];
			if (u === c[s - 1] && u.value.length === s && d === l[s - 1] && d.value.length === s && u.attention === d.attention) t.delete(u), t.delete(d);
			else {
				let e = [.../* @__PURE__ */ new Set([...c, ...l])];
				for (let n of e) {
					let r = t.get(n);
					r && r.push(...e);
				}
			}
			e.end -= s, r.start += s, e.start === e.end && i.splice(a, 1), a = i.length;
		}
		r.open && r.start < r.end && i.push(r);
	}
}
function na(e, t, n) {
	if (t.length === 0) throw Error("Cannot serialize `" + e + "` as attention without markers, expected one or more markers");
	if (n.length === 0) throw Error("Cannot serialize `" + e + "` as attention without sizes, expected one or more sizes");
	for (let t of n) if (!Number.isSafeInteger(t) || t < 1) throw Error("Cannot serialize `" + e + "` as attention with `" + t + "` as size, expected positive integer");
	let r = [];
	for (let i of t) {
		if (i.length !== 1) throw Error("Cannot serialize `" + e + "` as attention with `" + i + "` as marker, expected a single ascii character");
		if (!l(i.charCodeAt(0))) throw Error("Cannot serialize `" + e + "` as attention with `" + i + "` as marker, expected ascii punctuation");
		for (let e of n) r.push(i.repeat(e));
	}
	return r;
}
function ra(e, t, n) {
	let r = t.indexStack, i = e.children || [], a = [], o = -1, s = n.before;
	r.push(-1);
	let c = t.createTracker(n);
	for (; ++o < i.length;) {
		let l = i[o], u;
		if (r[r.length - 1] = o, o + 1 < i.length) {
			let n = t.handle.handlers[i[o + 1].type];
			n && n.peek && (n = n.peek), u = n ? Ui(n(i[o + 1], e, t, {
				before: "",
				after: "",
				...c.current()
			})) : "";
		} else u = n.after;
		let d = a[a.length - 1];
		typeof d == "string" && (s === "\r" || s === "\n") && l.type === "html" && Yi(l.value) !== 7 && (a[a.length - 1] = d.replace(/(\r?\n|\r)$/, " "), s = " ", c = t.createTracker(n), c.move(oa(a, n.before, n.after)));
		let f = t.handle.handlers[l.type];
		if (f && f.attention) {
			let e = ia(l, f.attention, t, c);
			a.push(e), s = Wi(e.sequences[0]);
		} else {
			let n = t.handle(l, e, t, {
				...c.current(),
				after: u,
				before: s
			});
			if (!n) continue;
			c.move(n), a.push(n), s = Wi(n);
		}
	}
	return r.pop(), a;
}
function ia(e, t, n, r) {
	let { construct: i, markers: a, sizes: o } = t(e, n), s = na(e.type, a, o), c = s[0], l = n.enter(i);
	r.move(c);
	let u = ra(e, n, {
		...r.current(),
		before: c,
		after: c
	});
	return r.move(oa(u, c, c)), r.move(c), l(), {
		children: u,
		sequences: s
	};
}
function aa(e, t, n, r) {
	let i = [], a, o = Wi(n), s = -1;
	for (; ++s < e.length;) {
		let n = e[s];
		if (typeof n == "string") {
			let e = {
				value: n,
				attention: void 0
			};
			a && a === Ui(n) && $i([e], !0), a = void 0, i.push(e), e.value && (o = Wi(e.value));
			continue;
		}
		let c = t.get(n) || n.sequences[0], l = c.charAt(0), u = e[s + 1], d = o, f = Ui(u === void 0 ? r : typeof u == "string" ? u : t.get(u) || u.sequences[0]), p = aa(n.children, t, c, c), m = p.length > 0 ? p[0].value : "", h = Ki(d.charCodeAt(d.length - 1), m.charCodeAt(0), l);
		h.inside && $i(p, !0);
		let g = p.length > 0 ? Wi(p[p.length - 1].value) : "", _ = Ki(f.charCodeAt(0), g.charCodeAt(g.length - 1), l);
		_.inside && $i(p, !1), h.outside && d !== "\n" && d !== "\r" && $i(i, !1), _.outside && (a = f), i.push({
			value: c,
			attention: n
		}, ...p, {
			value: c,
			attention: n
		}), o = c.charAt(c.length - 1);
	}
	return i;
}
function oa(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = aa(e, r, t, n), a = i, o = Qi(a, t, n);
	for (; o;) {
		let s = ea(e, r, o, t, n);
		if (!s) {
			a = i;
			break;
		}
		r = s.chosen, a = s.tokens, o = s.mistake;
	}
	let s = "";
	for (let e of a) s += e.value;
	return s;
}
sa.attention = ca, sa.peek = la;
function sa(e, t, n, r) {
	let i = n.enter("phrasing"), a = oa([ia(e, ca, n, n.createTracker(r))], r.before, r.after);
	return i(), a;
}
function ca(e, t) {
	return {
		construct: "emphasis",
		markers: Vi(t) === "*" ? ["*", "_"] : ["_", "*"],
		sizes: [1]
	};
}
function la(e, t, n) {
	return n.options.emphasis || "*";
}
// ../../node_modules/.pnpm/unist-util-visit@5.2.0/node_modules/unist-util-visit/lib/index.js
function ua(e, t, n, r) {
	let i, a, o;
	typeof n == "function" || n && typeof n == "object" ? (i = t, a = n, o = r) : (a = t, o = n), typeof a == "function" ? Pr(e, i, fa(a), o) : Pr(e, i, da(a), o);
}
function da(e) {
	return !e || typeof e != "object" ? e : {
		enter: typeof e.enter == "function" ? fa(e.enter) : e.enter,
		exit: typeof e.exit == "function" ? fa(e.exit) : e.exit
	};
}
function fa(e) {
	return t;
	function t(t, n, r) {
		return e(t, r, n[n.length - 1]);
	}
}
// ../../node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js
var pa = {};
function ma(e, t) {
	let n = t || pa;
	return ha(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function ha(e, t, n) {
	if (_a(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return ga(e.children, t, n);
	}
	return Array.isArray(e) ? ga(e, t, n) : "";
}
function ga(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = ha(e[i], t, n);
	return r.join("");
}
function _a(e) {
	return !!(e && typeof e == "object");
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function va(e, t) {
	let n = !1;
	return ua(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && ma(e) && (t.options.setext || n));
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/heading.js
function ya(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (va(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	}), u = l.charCodeAt(0);
	return (u === 9 || u === 32) && (l = Gi(u) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/html.js
ba.peek = xa;
function ba(e) {
	return e.value || "";
}
function xa() {
	return "<";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/image.js
Sa.peek = Ca;
function Sa(e, t, n, r) {
	let i = zi(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function Ca() {
	return "!";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
wa.peek = Ta;
function wa(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = u.filter(function(e) {
		return e !== "phrasing";
	}), o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Ta() {
	return "!";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
Ea.peek = Da;
function Ea(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^\n\r ]/.test(r) && (/^[\n\r ]/.test(r) && /[\n\r ]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e);
		if (!e.atBreak) continue;
		let i;
		for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function Da() {
	return "`";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function Oa(e, t) {
	let n = ma(e);
	return !(t.options.resourceLink || !e.url || e.title || !e.children || e.children.length !== 1 || e.children[0].type !== "text" || n !== e.url && "mailto:" + n !== e.url || !/^[a-z][+\-.a-z]+:/i.test(e.url) || /[\0- <>\u007F]/.test(e.url));
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/link.js
ka.peek = Aa;
function ka(e, t, n, r) {
	let i = zi(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r);
	if (Oa(e, n)) {
		let t = n.stack;
		n.stack = t.filter(function(e) {
			return e !== "phrasing";
		});
		let r = n.enter("autolink"), i = o.move("<");
		return i += o.move(n.containerPhrasing(e, {
			before: i,
			after: ">",
			...o.current()
		})), i += o.move(">"), r(), n.stack = t, i;
	}
	let s = n.enter("link"), c = n.enter("label"), l = o.move("["), u = n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	});
	l += o.move(u), c(), l += o.move("](");
	let d = /[\0- \u007F]/.test(e.url), f = r.before.charAt(r.before.length - 1), p = e.title || void 0;
	if (!p && !d && (f === "\n" || f === "\r")) {
		let e = 0;
		for (; e < u.length && u.charCodeAt(e) !== 93;) e += u.charCodeAt(e) === 92 ? 2 : 1;
		u.charCodeAt(e + 1) === 58 && (p = "");
	}
	return !e.url && typeof p == "string" || d ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: typeof p == "string" ? " " : ")",
		...o.current()
	}))), c(), typeof p == "string" && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(p, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function Aa(e, t, n) {
	return Oa(e, n) ? "<" : "[";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
ja.peek = Ma;
function ja(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = u.filter(function(e) {
		return e !== "phrasing";
	}), o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Ma() {
	return "[";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function Na(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function Pa(e) {
	let t = Na(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function Fa(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function Ia(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/list.js
function La(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? Fa(n) : Na(n), s = e.ordered ? o === "." ? ")" : "." : Pa(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if (o !== "*" && o !== "-" || !t || t.children && t.children[0] || n.stack[n.stack.length - 1] !== "list" || n.stack[n.stack.length - 2] !== "listItem" || n.stack[n.stack.length - 3] !== "list" || n.stack[n.stack.length - 4] !== "listItem" || n.indexStack[n.indexStack.length - 1] !== 0 || n.indexStack[n.indexStack.length - 2] !== 0 || n.indexStack[n.indexStack.length - 3] !== 0 || (c = !0), Ia(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function Ra(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function za(e, t, n, r) {
	let i = Ra(n), a = n.bulletCurrent || Na(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function Ba(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/root.js
function Va(e, t, n, r) {
	if (!e.children.some(function(e) {
		return Oi(e);
	})) return n.containerFlow(e, r);
	let i = n.enter("phrasing"), a = n.containerPhrasing(e, r);
	return i(), a;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function Ha(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
Ua.attention = Wa, Ua.peek = Ga;
function Ua(e, t, n, r) {
	let i = n.enter("phrasing"), a = oa([ia(e, Wa, n, n.createTracker(r))], r.before, r.after);
	return i(), a;
}
function Wa(e, t) {
	return {
		construct: "strong",
		markers: Ha(t) === "*" ? ["*", "_"] : ["_", "*"],
		sizes: [2]
	};
}
function Ga(e, t, n) {
	return n.options.strong || "*";
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/text.js
function Ka(e, t, n, r) {
	/* c8 ignore next -- parent always passed */
	let i = t ? t.children : [], a = n.indexStack[n.indexStack.length - 1];
	return n.safe(e.value, {
		...r,
		afterNode: i[a + 1],
		beforeNode: i[a - 1]
	});
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function qa(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function Ja(e, t, n) {
	let r = (Ia(n) + (n.options.ruleSpaces ? " " : "")).repeat(qa(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
// ../../node_modules/.pnpm/mdast-util-to-markdown@2.2.2/node_modules/mdast-util-to-markdown/lib/handle/index.js
var Ya = {
	blockquote: ki,
	break: Ni,
	code: Li,
	definition: Bi,
	emphasis: sa,
	hardBreak: Ni,
	heading: ya,
	html: ba,
	image: Sa,
	imageReference: wa,
	inlineCode: Ea,
	link: ka,
	linkReference: ja,
	list: La,
	listItem: za,
	paragraph: Ba,
	root: Va,
	strong: Ua,
	text: Ka,
	thematicBreak: Ja
}, Xa = document.createElement("i");
function Za(e) {
	let t = "&" + e + ";";
	Xa.innerHTML = t;
	let n = Xa.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
// ../../node_modules/.pnpm/micromark-util-decode-numeric-character-reference@2.0.2/node_modules/micromark-util-decode-numeric-character-reference/index.js
function Qa(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
// ../../node_modules/.pnpm/micromark-util-decode-string@2.0.1/node_modules/micromark-util-decode-string/index.js
var $a = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function eo(e) {
	return e.replace($a, to);
}
function to(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return Qa(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return Za(n) || e;
}
// ../../node_modules/.pnpm/mdast-util-gfm-table@2.0.1/node_modules/mdast-util-gfm-table/lib/index.js
function no() {
	return {
		enter: {
			table: ro,
			tableData: so,
			tableHeader: so,
			tableRow: ao
		},
		exit: {
			codeText: co,
			table: io,
			tableData: oo,
			tableHeader: oo,
			tableRow: oo
		}
	};
}
function ro(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: [],
		position: void 0
	}, e), this.data.inTable = !0;
}
function io(e) {
	this.exit(e), this.data.inTable = void 0;
}
function ao(e) {
	this.enter({
		type: "tableRow",
		children: [],
		position: void 0
	}, e);
}
function oo(e) {
	this.exit(e);
}
function so(e) {
	this.enter({
		type: "tableCell",
		children: [],
		position: void 0
	}, e);
}
function co(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, lo));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function lo(e, t) {
	return t === "|" ? t : e;
}
function uo(e) {
	let { tableCellPadding: t, tablePipeAlign: n, stringLength: r } = e || {}, i = t ? " " : "|";
	return {
		handlers: {
			inlineCode: d,
			table: a,
			tableCell: s,
			tableRow: o
		},
		join: [fo],
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		]
	};
	function a(e, t, n, r) {
		let i = l(e, n, r), a = i[0];
		if (a) {
			let t = e.align ? e.align.length : 0, n = -1;
			if (!t) for (; ++n < i.length;) i[n].length > t && (t = i[n].length);
			for (; a.length < t;) a.push("");
		}
		return c(i, e.align);
	}
	function o(e, t, n, r) {
		let i = c([u(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function s(e, t, n, r) {
		let a = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: i,
			after: i
		});
		return o(), a(), s;
	}
	function c(e, i) {
		return Ti(e, {
			align: i,
			alignDelimiters: n,
			fillRows: !1,
			padding: t,
			stringLength: r
		});
	}
	function l(e, t, n) {
		let { children: r } = e, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = u(r[i], t, n);
		return o(), a;
	}
	function u(e, t, n) {
		let { children: r } = e, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = s(r[i], e, t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = Ya.inlineCode(e, t, n);
		if (!n.stack.includes("tableCell")) return r;
		let i = [], a = 0, o = r.indexOf("|");
		for (; o !== -1;) {
			let e = o;
			for (; e > a && r.charCodeAt(e - 1) === 92;) e--;
			i.push(r.slice(a, o)), (o - e) % 2 == 0 && i.push("\\"), a = o, o = r.indexOf("|", o + 1);
		}
		return i.push(r.slice(a)), i.join("");
	}
}
function fo(e, t, n, r) {
	if (e.type === "table" && n.type === "listItem" && n.spread === !1 && (t.type === "definition" || t.type === "heading" && po(t, r) || t.type === "paragraph" || t.type === "table")) return 1;
}
function po(e, t) {
	let n = !1;
	return ua(e, function(e) {
		if (e.type === "break" || "value" in e && /\r?\n|\r/.test(e.value)) return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && ma(e) && (t.options.setext || n));
}
// ../../node_modules/.pnpm/mdast-util-gfm-task-list-item@2.0.0/node_modules/mdast-util-gfm-task-list-item/lib/index.js
function mo() {
	return { exit: {
		taskListCheckValueChecked: go,
		taskListCheckValueUnchecked: go,
		paragraph: _o
	} };
}
function ho() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: vo }
	};
}
function go(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function _o(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function vo(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = Ya.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
// ../../node_modules/.pnpm/mdast-util-gfm@3.1.0/node_modules/mdast-util-gfm/lib/index.js
function yo() {
	return [
		Hr(),
		fi(),
		_i(),
		no(),
		mo()
	];
}
function bo(e) {
	return { extensions: [
		Ur(),
		pi(e),
		vi(),
		uo(e),
		ho()
	] };
}
// ../../node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/index.js
function M(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function N(e, t) {
	return e.length > 0 ? (M(e, e.length, 0, t), e) : t;
}
// ../../node_modules/.pnpm/micromark-util-combine-extensions@2.0.1/node_modules/micromark-util-combine-extensions/index.js
var xo = {}.hasOwnProperty;
function So(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) Co(t, e[n]);
	return t;
}
function Co(e, t) {
	let n;
	for (n in t) {
		let r = (xo.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			xo.call(r, a) || (r[a] = []);
			let e = i[a];
			wo(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function wo(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	M(e, 0, 0, r);
}
// ../../node_modules/.pnpm/micromark-extension-gfm-autolink-literal@2.1.0/node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var To = {
	tokenize: zo,
	partial: !0
}, Eo = {
	tokenize: Bo,
	partial: !0
}, Do = {
	tokenize: Vo,
	partial: !0
}, Oo = {
	tokenize: Ho,
	partial: !0
}, ko = {
	tokenize: Uo,
	partial: !0
}, Ao = {
	name: "wwwAutolink",
	tokenize: Lo,
	previous: Wo
}, jo = {
	name: "protocolAutolink",
	tokenize: Ro,
	previous: Go
}, Mo = {
	name: "emailAutolink",
	tokenize: Io,
	previous: Ko
}, No = {};
function Po() {
	return { text: No };
}
for (var Fo = 48; Fo < 123;) No[Fo] = Mo, Fo++, Fo === 58 ? Fo = 65 : Fo === 91 && (Fo = 97);
No[43] = Mo, No[45] = Mo, No[46] = Mo, No[95] = Mo, No[72] = [Mo, jo], No[104] = [Mo, jo], No[87] = [Mo, Ao], No[119] = [Mo, Ao];
function Io(e, t, n) {
	let r = this, i, a;
	return s;
	function s(t) {
		return !qo(t) || !Ko.call(r, r.previous) || Jo(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), c(t));
	}
	function c(t) {
		return qo(t) ? (e.consume(t), c) : t === 64 ? (e.consume(t), l) : n(t);
	}
	function l(t) {
		return t === 46 ? e.check(ko, f, d)(t) : t === 45 || t === 95 || o(t) ? (a = !0, e.consume(t), l) : f(t);
	}
	function d(t) {
		return e.consume(t), i = !0, l;
	}
	function f(o) {
		return a && i && u(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function Lo(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !Wo.call(r, r.previous) || Jo(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(To, e.attempt(Eo, e.attempt(Do, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function Ro(e, t, o) {
	let s = this, c = "", l = !1;
	return d;
	function d(t) {
		return (t === 72 || t === 104) && Go.call(s, s.previous) && !Jo(s.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), c += String.fromCodePoint(t), e.consume(t), f) : o(t);
	}
	function f(t) {
		if (u(t) && c.length < 5) return c += String.fromCodePoint(t), e.consume(t), f;
		if (t === 58) {
			let n = c.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), p;
		}
		return o(t);
	}
	function p(t) {
		return t === 47 ? (e.consume(t), l ? m : (l = !0, p)) : o(t);
	}
	function m(t) {
		return t === null || i(t) || a(t) || r(t) || n(t) ? o(t) : e.attempt(Eo, e.attempt(Do, h), o)(t);
	}
	function h(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function zo(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function Bo(e, t, i) {
	let o, s, c;
	return l;
	function l(t) {
		return t === 46 || t === 95 ? e.check(Oo, d, u)(t) : t === null || a(t) || r(t) || t !== 45 && n(t) ? d(t) : (c = !0, e.consume(t), l);
	}
	function u(t) {
		return t === 95 ? o = !0 : (s = o, o = void 0), e.consume(t), l;
	}
	function d(e) {
		return s || o || !c ? i(e) : t(e);
	}
}
function Vo(e, t) {
	let n = 0, i = 0;
	return o;
	function o(c) {
		return c === 40 ? (n++, e.consume(c), o) : c === 41 && i < n ? s(c) : c === 33 || c === 34 || c === 38 || c === 39 || c === 41 || c === 42 || c === 44 || c === 46 || c === 58 || c === 59 || c === 60 || c === 63 || c === 93 || c === 95 || c === 126 ? e.check(Oo, t, s)(c) : c === null || a(c) || r(c) ? t(c) : (e.consume(c), o);
	}
	function s(t) {
		return t === 41 && i++, e.consume(t), o;
	}
}
function Ho(e, t, n) {
	return i;
	function i(c) {
		return c === 33 || c === 34 || c === 39 || c === 41 || c === 42 || c === 44 || c === 46 || c === 58 || c === 59 || c === 63 || c === 95 || c === 126 ? (e.consume(c), i) : c === 38 ? (e.consume(c), s) : c === 93 ? (e.consume(c), o) : c === 60 || c === null || a(c) || r(c) ? t(c) : n(c);
	}
	function o(e) {
		return e === null || e === 40 || e === 91 || a(e) || r(e) ? t(e) : i(e);
	}
	function s(e) {
		return u(e) ? c(e) : n(e);
	}
	function c(t) {
		return t === 59 ? (e.consume(t), i) : u(t) ? (e.consume(t), c) : n(t);
	}
}
function Uo(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return o(e) ? n(e) : t(e);
	}
}
function Wo(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || a(e);
}
function Go(e) {
	return !u(e);
}
function Ko(e) {
	return !(e === 47 || qo(e));
}
function qo(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || o(e);
}
function Jo(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
// ../../node_modules/.pnpm/micromark-util-resolve-all@2.0.1/node_modules/micromark-util-resolve-all/index.js
function Yo(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/attention.js
var Xo = {
	name: "attention",
	resolveAll: Zo,
	tokenize: Qo
};
function Zo(e, t) {
	let n = -1, r;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		let i = n;
		for (; i--;) if (e[i][0] === "exit" && e[i][1].type === "attentionSequence" && e[i][1]._open && t.sliceSerialize(e[i][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[i][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[i][1].end.offset - e[i][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			let a = e[i][1].end.offset - e[i][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1, o = { ...e[i][1].end }, s = { ...e[n][1].start };
			$o(o, -a), $o(s, a);
			let c = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: o,
				end: { ...e[i][1].end }
			}, l = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: s
			}, u = {
				type: a > 1 ? "strongText" : "emphasisText",
				start: { ...e[i][1].end },
				end: { ...e[n][1].start }
			}, d = {
				type: a > 1 ? "strong" : "emphasis",
				start: { ...c.start },
				end: { ...l.end }
			};
			e[i][1].end = { ...c.start }, e[n][1].start = { ...l.end }, r = [], e[i][1].end.offset - e[i][1].start.offset && (r = N(r, [[
				"enter",
				e[i][1],
				t
			], [
				"exit",
				e[i][1],
				t
			]])), r = N(r, [
				[
					"enter",
					d,
					t
				],
				[
					"enter",
					c,
					t
				],
				[
					"exit",
					c,
					t
				],
				[
					"enter",
					u,
					t
				]
			]), r = N(r, Yo(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t)), r = N(r, [
				[
					"exit",
					u,
					t
				],
				[
					"enter",
					l,
					t
				],
				[
					"exit",
					l,
					t
				],
				[
					"exit",
					d,
					t
				]
			]);
			let f = 0;
			e[n][1].end.offset - e[n][1].start.offset && (f = 2, r = N(r, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])), M(e, i - 1, n - i + 3, r), n = i + r.length - f - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function Qo(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Hi(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = Hi(o), u = !l || l === 2 && i || n.includes(o) && o !== 42 && o !== 95, d = !i || i === 2 && l || n.includes(r) && r !== 42 && r !== 95;
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function $o(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/autolink.js
var es = {
	name: "autolink",
	tokenize: ts
};
function ts(e, t, n) {
	let r = 0;
	return a;
	function a(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), s;
	}
	function s(t) {
		return u(t) ? (e.consume(t), l) : t === 64 ? n(t) : p(t);
	}
	function l(e) {
		return e === 43 || e === 45 || e === 46 || o(e) ? (r = 1, d(e)) : p(e);
	}
	function d(t) {
		return t === 58 ? (e.consume(t), r = 0, f) : (t === 43 || t === 45 || t === 46 || o(t)) && r++ < 32 ? (e.consume(t), d) : (r = 0, p(t));
	}
	function f(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || i(r) ? n(r) : (e.consume(r), f);
	}
	function p(t) {
		return t === 64 ? (e.consume(t), m) : c(t) ? (e.consume(t), p) : n(t);
	}
	function m(e) {
		return o(e) ? h(e) : n(e);
	}
	function h(n) {
		return n === 46 ? (e.consume(n), r = 0, m) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(n);
	}
	function g(t) {
		if ((t === 45 || o(t)) && r++ < 63) {
			let n = t === 45 ? g : h;
			return e.consume(t), n;
		}
		return n(t);
	}
}
// ../../node_modules/.pnpm/micromark-factory-space@2.1.0/node_modules/micromark-factory-space/index.js
function P(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return d(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return d(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
function ns(e, t, n, r, i, a) {
	let o = 0;
	return s;
	function s(t) {
		return a > 0 && d(t) ? (e.enter(r), c(t)) : l(t);
	}
	function c(t) {
		return d(t) && o < a ? (e.consume(t), o++, c) : (e.exit(r), l(t));
	}
	function l(e) {
		return o >= i ? t(e) : n(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/blank-line.js
var rs = {
	partial: !0,
	tokenize: is
};
function is(e, n, r) {
	return i;
	function i(t) {
		return d(t) ? P(e, a, "linePrefix")(t) : a(t);
	}
	function a(e) {
		return e === null || t(e) ? n(e) : r(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/block-quote.js
var as = {
	continuation: { tokenize: ss },
	exit: cs,
	name: "blockQuote",
	tokenize: os
};
function os(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return d(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function ss(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return d(t) ? P(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(as, t, n)(r);
	}
}
function cs(e) {
	e.exit("blockQuote");
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/character-escape.js
var ls = {
	name: "characterEscape",
	tokenize: us
};
function us(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return l(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/character-reference.js
var ds = {
	name: "characterReference",
	tokenize: fs
};
function fs(t, n, r) {
	let i = this, a = 0, c, l;
	return u;
	function u(e) {
		return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(e), t.exit("characterReferenceMarker"), d;
	}
	function d(e) {
		return e === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(e), t.exit("characterReferenceMarkerNumeric"), f) : (t.enter("characterReferenceValue"), c = 31, l = o, p(e));
	}
	function f(n) {
		return n === 88 || n === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(n), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), c = 6, l = s, p) : (t.enter("characterReferenceValue"), c = 7, l = e, p(n));
	}
	function p(e) {
		if (e === 59 && a) {
			let a = t.exit("characterReferenceValue");
			return l === o && !Za(i.sliceSerialize(a)) ? r(e) : (t.enter("characterReferenceMarker"), t.consume(e), t.exit("characterReferenceMarker"), t.exit("characterReference"), n);
		}
		return l(e) && a++ < c ? (t.consume(e), p) : r(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/partial-non-lazy-continuation.js
var ps = {
	partial: !0,
	tokenize: ms
};
function ms(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-fenced.js
var hs = {
	concrete: !0,
	name: "codeFenced",
	tokenize: gs
};
function gs(e, n, r) {
	let i = this, a = {
		partial: !0,
		tokenize: C
	}, o = 0, s = 0, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		let n = i.events[i.events.length - 1];
		return o = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, c = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(t);
	}
	function f(t) {
		return t === c ? (s++, e.consume(t), f) : s < 3 ? r(t) : (e.exit("codeFencedFenceSequence"), d(t) ? P(e, p, "whitespace")(t) : p(t));
	}
	function p(r) {
		return r === null || t(r) ? (e.exit("codeFencedFence"), i.interrupt ? n(r) : e.check(ps, _, S)(r)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), m(r));
	}
	function m(n) {
		return n === null || t(n) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(n)) : d(n) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), P(e, h, "whitespace")(n)) : n === 96 && n === c ? r(n) : (e.consume(n), m);
	}
	function h(n) {
		return n === null || t(n) ? p(n) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), g(n));
	}
	function g(n) {
		return n === null || t(n) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(n)) : n === 96 && n === c ? r(n) : (e.consume(n), g);
	}
	function _(t) {
		return e.attempt(a, S, v)(t);
	}
	function v(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), y;
	}
	function y(t) {
		return o > 0 && d(t) ? P(e, b, "linePrefix", o + 1)(t) : b(t);
	}
	function b(n) {
		return n === null || t(n) ? e.check(ps, _, S)(n) : (e.enter("codeFlowValue"), x(n));
	}
	function x(n) {
		return n === null || t(n) ? (e.exit("codeFlowValue"), b(n)) : (e.consume(n), x);
	}
	function S(t) {
		return e.exit("codeFenced"), n(t);
	}
	function C(e, n, r) {
		let a = 0;
		return o;
		function o(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), l;
		}
		function l(t) {
			return e.enter("codeFencedFence"), d(t) ? P(e, u, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : u(t);
		}
		function u(t) {
			return t === c ? (e.enter("codeFencedFenceSequence"), f(t)) : r(t);
		}
		function f(t) {
			return t === c ? (a++, e.consume(t), f) : a >= s ? (e.exit("codeFencedFenceSequence"), d(t) ? P(e, p, "whitespace")(t) : p(t)) : r(t);
		}
		function p(i) {
			return i === null || t(i) ? (e.exit("codeFencedFence"), n(i)) : r(i);
		}
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-indented.js
var _s = {
	name: "codeIndented",
	tokenize: ys
}, vs = {
	partial: !0,
	tokenize: bs
};
function ys(e, n, r) {
	return i;
	function i(t) {
		return e.enter("codeIndented"), ns(e, a, r, "linePrefix", 4, 4)(t);
	}
	function a(n) {
		return n === null ? s(n) : t(n) ? e.attempt(vs, a, s)(n) : (e.enter("codeFlowValue"), o(n));
	}
	function o(n) {
		return n === null || t(n) ? (e.exit("codeFlowValue"), a(n)) : (e.consume(n), o);
	}
	function s(t) {
		return e.exit("codeIndented"), n(t);
	}
}
function bs(e, n, r) {
	let i = this;
	return a;
	function a(s) {
		return i.parser.lazy[i.now().line] ? r(s) : t(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a) : ns(e, n, o, "linePrefix", 4, 4)(s);
	}
	function o(e) {
		return t(e) ? a(e) : r(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-text.js
var xs = {
	name: "codeText",
	previous: Cs,
	resolve: Ss,
	tokenize: ws
};
function Ss(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function Cs(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ws(e, n, r) {
	let i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), c(t);
	}
	function c(t) {
		return t === 96 ? (e.consume(t), i++, c) : (e.exit("codeTextSequence"), l(t));
	}
	function l(n) {
		return n === null ? r(n) : n === 32 ? (e.enter("space"), e.consume(n), e.exit("space"), l) : n === 96 ? (o = e.enter("codeTextSequence"), a = 0, d(n)) : t(n) ? (e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(n));
	}
	function u(n) {
		return n === null || n === 32 || n === 96 || t(n) ? (e.exit("codeTextData"), l(n)) : (e.consume(n), u);
	}
	function d(t) {
		return t === 96 ? (e.consume(t), a++, d) : a === i ? (e.exit("codeTextSequence"), e.exit("codeText"), n(t)) : (o.type = "codeTextData", u(t));
	}
}
// ../../node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var Ts = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && Es(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), Es(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), Es(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				Es(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				Es(this.left, t.reverse());
			}
		}
	}
};
function Es(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
// ../../node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/index.js
function Ds(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new Ts(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, Os(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return M(e, 0, Infinity, u.slice(0)), !l;
}
function Os(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/content.js
var ks = {
	resolve: js,
	tokenize: Ms
}, As = {
	partial: !0,
	tokenize: Ns
};
function js(e) {
	return Ds(e), e;
}
function Ms(e, n) {
	let r;
	return i;
	function i(t) {
		return e.enter("content"), r = e.enter("chunkContent", { contentType: "content" }), a(t);
	}
	function a(n) {
		return n === null ? o(n) : t(n) ? e.check(As, s, o)(n) : (e.consume(n), a);
	}
	function o(t) {
		return e.exit("chunkContent"), e.exit("content"), n(t);
	}
	function s(t) {
		return e.consume(t), e.exit("chunkContent"), r.next = e.enter("chunkContent", {
			contentType: "content",
			previous: r
		}), r = r.next, a;
	}
}
function Ns(e, n, r) {
	let i = this;
	return a;
	function a(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), P(e, o, "linePrefix");
	}
	function o(a) {
		if (a === null || t(a)) return r(a);
		let o = i.events[i.events.length - 1];
		return !i.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? n(a) : e.interrupt(i.parser.constructs.flow, r, n)(a);
	}
}
// ../../node_modules/.pnpm/micromark-factory-destination@2.0.1/node_modules/micromark-factory-destination/index.js
function Ps(e, n, r, o, s, c, l, u, d) {
	let f = d || Infinity, p = 0;
	return m;
	function m(t) {
		return t === 60 ? (e.enter(o), e.enter(s), e.enter(c), e.consume(t), e.exit(c), h) : t === null || t === 32 || t === 41 || i(t) ? r(t) : (e.enter(o), e.enter(l), e.enter(u), e.enter("chunkString", { contentType: "string" }), v(t));
	}
	function h(t) {
		return t === 62 ? (e.enter(c), e.consume(t), e.exit(c), e.exit(s), e.exit(o), n) : (e.enter(u), e.enter("chunkString", { contentType: "string" }), g(t));
	}
	function g(n) {
		return n === 62 ? (e.exit("chunkString"), e.exit(u), h(n)) : n === null || n === 60 || t(n) ? r(n) : (e.consume(n), n === 92 ? _ : g);
	}
	function _(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), g) : g(t);
	}
	function v(t) {
		return !p && (t === null || t === 41 || a(t)) ? (e.exit("chunkString"), e.exit(u), e.exit(l), e.exit(o), n(t)) : p < f && t === 40 ? (e.consume(t), p++, v) : t === 41 ? (e.consume(t), p--, v) : t === null || t === 32 || t === 40 || i(t) ? r(t) : (e.consume(t), t === 92 ? y : v);
	}
	function y(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), v) : v(t);
	}
}
// ../../node_modules/.pnpm/micromark-factory-label@2.0.1/node_modules/micromark-factory-label/index.js
function Fs(e, n, r, i, a, o) {
	let s = this, c = 0, l;
	return u;
	function u(t) {
		return e.enter(i), e.enter(a), e.consume(t), e.exit(a), e.enter(o), f;
	}
	function f(u) {
		return c > 999 || u === null || u === 91 || u === 93 && !l || 
		/* c8 ignore next 3 */
		u === 94 && !c && "_hiddenFootnoteSupport" in s.parser.constructs ? r(u) : u === 93 ? (e.exit(o), e.enter(a), e.consume(u), e.exit(a), e.exit(i), n) : t(u) ? (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), f) : (e.enter("chunkString", { contentType: "string" }), p(u));
	}
	function p(n) {
		return n === null || n === 91 || n === 93 || t(n) || c++ > 999 ? (e.exit("chunkString"), f(n)) : (e.consume(n), l ||= !d(n), n === 92 ? m : p);
	}
	function m(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), c++, p) : p(t);
	}
}
// ../../node_modules/.pnpm/micromark-factory-title@2.0.1/node_modules/micromark-factory-title/index.js
function Is(e, n, r, i, a, o) {
	let s;
	return c;
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(i), e.enter(a), e.consume(t), e.exit(a), s = t === 40 ? 41 : t, l) : r(t);
	}
	function l(t) {
		return t === s ? (e.enter(a), e.consume(t), e.exit(a), e.exit(i), n) : (e.enter(o), u(t));
	}
	function u(n) {
		return n === s ? (e.exit(o), l(s)) : n === null ? r(n) : t(n) ? (e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), P(e, u, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), d(n));
	}
	function d(n) {
		return n === s || n === null || t(n) ? (e.exit("chunkString"), u(n)) : (e.consume(n), n === 92 ? f : d);
	}
	function f(t) {
		return t === s || t === 92 ? (e.consume(t), d) : d(t);
	}
}
// ../../node_modules/.pnpm/micromark-factory-whitespace@2.0.1/node_modules/micromark-factory-whitespace/index.js
function Ls(e, n) {
	let r;
	return i;
	function i(a) {
		return t(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), r = !0, i) : d(a) ? P(e, i, r ? "linePrefix" : "lineSuffix")(a) : n(a);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/definition.js
var Rs = {
	name: "definition",
	tokenize: Bs
}, zs = {
	partial: !0,
	tokenize: Vs
};
function Bs(e, n, r) {
	let i = this, o;
	return s;
	function s(t) {
		return e.enter("definition"), c(t);
	}
	function c(t) {
		return Fs.call(i, e, l, r, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function l(t) {
		return o = j(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), u) : r(t);
	}
	function u(t) {
		return a(t) ? Ls(e, f)(t) : f(t);
	}
	function f(t) {
		return Ps(e, p, r, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function p(t) {
		return e.attempt(zs, m, m)(t);
	}
	function m(t) {
		return d(t) ? P(e, h, "whitespace")(t) : h(t);
	}
	function h(a) {
		return a === null || t(a) ? (e.exit("definition"), i.parser.defined.push(o), n(a)) : r(a);
	}
}
function Vs(e, n, r) {
	return i;
	function i(t) {
		return a(t) ? Ls(e, o)(t) : r(t);
	}
	function o(t) {
		return Is(e, s, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function s(t) {
		return d(t) ? P(e, c, "whitespace")(t) : c(t);
	}
	function c(e) {
		return e === null || t(e) ? n(e) : r(e);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Hs = {
	name: "hardBreakEscape",
	tokenize: Us
};
function Us(e, n, r) {
	return i;
	function i(t) {
		return e.enter("hardBreakEscape"), e.consume(t), a;
	}
	function a(i) {
		return t(i) ? (e.exit("hardBreakEscape"), n(i)) : r(i);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/heading-atx.js
var Ws = {
	name: "headingAtx",
	resolve: Gs,
	tokenize: Ks
};
function Gs(e, t) {
	let n = e.length - 2, r = 3;
	if (e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r) {
		let i = {
			type: "atxHeadingText",
			start: e[r][1].start,
			end: e[n][1].end
		}, a = {
			type: "chunkText",
			start: e[r][1].start,
			end: e[n][1].end,
			contentType: "text"
		};
		M(e, r, n - r + 1, [
			[
				"enter",
				i,
				t
			],
			[
				"enter",
				a,
				t
			],
			[
				"exit",
				a,
				t
			],
			[
				"exit",
				i,
				t
			]
		]);
	}
	return e;
}
function Ks(e, n, r) {
	let i = 0;
	return o;
	function o(t) {
		return e.enter("atxHeading"), s(t);
	}
	function s(t) {
		return e.enter("atxHeadingSequence"), c(t);
	}
	function c(t) {
		return t === 35 && i++ < 6 ? (e.consume(t), c) : t === null || a(t) ? (e.exit("atxHeadingSequence"), l(t)) : r(t);
	}
	function l(r) {
		return r === 35 ? (e.enter("atxHeadingSequence"), u(r)) : r === null || t(r) ? (e.exit("atxHeading"), n(r)) : d(r) ? P(e, l, "whitespace")(r) : (e.enter("atxHeadingText"), f(r));
	}
	function u(t) {
		return t === 35 ? (e.consume(t), u) : (e.exit("atxHeadingSequence"), l(t));
	}
	function f(t) {
		return t === null || t === 35 || a(t) ? (e.exit("atxHeadingText"), l(t)) : (e.consume(t), f);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/html-flow.js
var qs = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: Ys,
	tokenize: Xs
}, Js = {
	partial: !0,
	tokenize: Zs
};
function Ys(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Xs(e, n, r) {
	let i = this, s, c, l, f, p;
	return m;
	function m(e) {
		return h(e);
	}
	function h(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), g;
	}
	function g(t) {
		return t === 33 ? (e.consume(t), _) : t === 47 ? (e.consume(t), c = !0, b) : t === 63 ? (e.consume(t), s = 3, i.interrupt ? n : ue) : u(t) ? (e.consume(t), l = String.fromCharCode(t), x) : r(t);
	}
	function _(t) {
		return t === 45 ? (e.consume(t), s = 2, v) : t === 91 ? (e.consume(t), s = 5, f = 0, y) : u(t) ? (e.consume(t), s = 4, i.interrupt ? n : ue) : r(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), i.interrupt ? n : ue) : r(t);
	}
	function y(t) {
		return t === "CDATA[".charCodeAt(f++) ? (e.consume(t), f === 6 ? i.interrupt ? n : O : y) : r(t);
	}
	function b(t) {
		return u(t) ? (e.consume(t), l = String.fromCharCode(t), x) : r(t);
	}
	function x(t) {
		if (t === null || t === 47 || t === 62 || a(t)) {
			let a = t === 47, o = l.toLowerCase();
			return !a && !c && Ji.includes(o) ? (s = 1, i.interrupt ? n(t) : O(t)) : qi.includes(l.toLowerCase()) ? (s = 6, a ? (e.consume(t), S) : i.interrupt ? n(t) : O(t)) : (s = 7, i.interrupt && !i.parser.lazy[i.now().line] ? r(t) : c ? C(t) : w(t));
		}
		return t === 45 || o(t) ? (e.consume(t), l += String.fromCharCode(t), x) : r(t);
	}
	function S(t) {
		return t === 62 ? (e.consume(t), i.interrupt ? n : O) : r(t);
	}
	function C(t) {
		return d(t) ? (e.consume(t), C) : re(t);
	}
	function w(t) {
		return t === 47 ? (e.consume(t), re) : t === 58 || t === 95 || u(t) ? (e.consume(t), T) : d(t) ? (e.consume(t), w) : re(t);
	}
	function T(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || o(t) ? (e.consume(t), T) : E(t);
	}
	function E(t) {
		return t === 61 ? (e.consume(t), D) : d(t) ? (e.consume(t), E) : w(t);
	}
	function D(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? r(t) : t === 34 || t === 39 ? (e.consume(t), p = t, ee) : d(t) ? (e.consume(t), D) : te(t);
	}
	function ee(n) {
		return n === p ? (e.consume(n), p = null, ne) : n === null || t(n) ? r(n) : (e.consume(n), ee);
	}
	function te(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || a(t) ? E(t) : (e.consume(t), te);
	}
	function ne(e) {
		return e === 47 || e === 62 || d(e) ? w(e) : r(e);
	}
	function re(t) {
		return t === 62 ? (e.consume(t), ie) : r(t);
	}
	function ie(n) {
		return n === null || t(n) ? O(n) : d(n) ? (e.consume(n), ie) : r(n);
	}
	function O(n) {
		return n === 45 && s === 2 ? (e.consume(n), se) : n === 60 && s === 1 ? (e.consume(n), A) : n === 62 && s === 4 ? (e.consume(n), de) : n === 63 && s === 3 ? (e.consume(n), ue) : n === 93 && s === 5 ? (e.consume(n), le) : t(n) && (s === 6 || s === 7) ? (e.exit("htmlFlowData"), e.check(Js, fe, ae)(n)) : n === null || t(n) ? (e.exit("htmlFlowData"), ae(n)) : (e.consume(n), O);
	}
	function ae(t) {
		return e.check(ps, oe, fe)(t);
	}
	function oe(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), k;
	}
	function k(n) {
		return n === null || t(n) ? ae(n) : (e.enter("htmlFlowData"), O(n));
	}
	function se(t) {
		return t === 45 ? (e.consume(t), ue) : O(t);
	}
	function A(t) {
		return t === 47 ? (e.consume(t), l = "", ce) : O(t);
	}
	function ce(t) {
		if (t === 62) {
			let n = l.toLowerCase();
			return Ji.includes(n) ? (e.consume(t), de) : O(t);
		}
		return u(t) && l.length < 8 ? (e.consume(t), l += String.fromCharCode(t), ce) : O(t);
	}
	function le(t) {
		return t === 93 ? (e.consume(t), ue) : O(t);
	}
	function ue(t) {
		return t === 62 ? (e.consume(t), de) : t === 45 && s === 2 ? (e.consume(t), ue) : O(t);
	}
	function de(n) {
		return n === null || t(n) ? (e.exit("htmlFlowData"), fe(n)) : (e.consume(n), de);
	}
	function fe(t) {
		return e.exit("htmlFlow"), n(t);
	}
}
function Zs(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(rs, t, n);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/html-text.js
var Qs = {
	name: "htmlText",
	tokenize: $s
};
function $s(e, n, r) {
	let i = this, s, c, l;
	return f;
	function f(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), p;
	}
	function p(t) {
		return t === 33 ? (e.consume(t), m) : t === 47 ? (e.consume(t), E) : t === 63 ? (e.consume(t), w) : u(t) ? (e.consume(t), te) : r(t);
	}
	function m(t) {
		return t === 45 ? (e.consume(t), h) : t === 91 ? (e.consume(t), c = 0, y) : u(t) ? (e.consume(t), C) : r(t);
	}
	function h(t) {
		return t === 45 ? (e.consume(t), v) : r(t);
	}
	function g(n) {
		return n === null ? r(n) : n === 45 ? (e.consume(n), _) : t(n) ? (l = g, A(n)) : (e.consume(n), g);
	}
	function _(t) {
		return t === 45 ? (e.consume(t), v) : g(t);
	}
	function v(e) {
		return e === 62 ? se(e) : e === 45 ? _(e) : g(e);
	}
	function y(t) {
		return t === "CDATA[".charCodeAt(c++) ? (e.consume(t), c === 6 ? b : y) : r(t);
	}
	function b(n) {
		return n === null ? r(n) : n === 93 ? (e.consume(n), x) : t(n) ? (l = b, A(n)) : (e.consume(n), b);
	}
	function x(t) {
		return t === 93 ? (e.consume(t), S) : b(t);
	}
	function S(t) {
		return t === 62 ? se(t) : t === 93 ? (e.consume(t), S) : b(t);
	}
	function C(n) {
		return n === null || n === 62 ? se(n) : t(n) ? (l = C, A(n)) : (e.consume(n), C);
	}
	function w(n) {
		return n === null ? r(n) : n === 63 ? (e.consume(n), T) : t(n) ? (l = w, A(n)) : (e.consume(n), w);
	}
	function T(e) {
		return e === 62 ? se(e) : w(e);
	}
	function E(t) {
		return u(t) ? (e.consume(t), D) : r(t);
	}
	function D(t) {
		return t === 45 || o(t) ? (e.consume(t), D) : ee(t);
	}
	function ee(n) {
		return t(n) ? (l = ee, A(n)) : d(n) ? (e.consume(n), ee) : se(n);
	}
	function te(t) {
		return t === 45 || o(t) ? (e.consume(t), te) : t === 47 || t === 62 || a(t) ? ne(t) : r(t);
	}
	function ne(n) {
		return n === 47 ? (e.consume(n), se) : n === 58 || n === 95 || u(n) ? (e.consume(n), re) : t(n) ? (l = ne, A(n)) : d(n) ? (e.consume(n), ne) : se(n);
	}
	function re(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || o(t) ? (e.consume(t), re) : ie(t);
	}
	function ie(n) {
		return n === 61 ? (e.consume(n), O) : t(n) ? (l = ie, A(n)) : d(n) ? (e.consume(n), ie) : ne(n);
	}
	function O(n) {
		return n === null || n === 60 || n === 61 || n === 62 || n === 96 ? r(n) : n === 34 || n === 39 ? (e.consume(n), s = n, ae) : t(n) ? (l = O, A(n)) : d(n) ? (e.consume(n), O) : (e.consume(n), oe);
	}
	function ae(n) {
		return n === s ? (e.consume(n), s = void 0, k) : n === null ? r(n) : t(n) ? (l = ae, A(n)) : (e.consume(n), ae);
	}
	function oe(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? r(t) : t === 47 || t === 62 || a(t) ? ne(t) : (e.consume(t), oe);
	}
	function k(e) {
		return e === 47 || e === 62 || a(e) ? ne(e) : r(e);
	}
	function se(t) {
		return t === 62 ? (e.consume(t), e.exit("htmlTextData"), e.exit("htmlText"), n) : r(t);
	}
	function A(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), ce;
	}
	function ce(t) {
		return d(t) ? P(e, le, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : le(t);
	}
	function le(t) {
		return e.enter("htmlTextData"), l(t);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-end.js
var ec = {
	name: "labelEnd",
	resolveAll: ic,
	resolveTo: ac,
	tokenize: oc
}, tc = { tokenize: sc }, nc = { tokenize: cc }, rc = { tokenize: lc };
function ic(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && M(e, 0, e.length, n), e;
}
function ac(e, t) {
	let n = e.length, r = 0, i, a, o;
	for (; n--;) {
		let t = e[n][1];
		if (i) {
			if (t.type === "link" || t.type === "labelLink" && t._inactive) break;
			e[n][0] === "enter" && t.type === "labelLink" && (t._inactive = !0);
		} else if (a) {
			if (e[n][0] === "enter" && (t.type === "labelImage" || t.type === "labelLink") && !t._balanced && (i = n, t.type !== "labelLink")) {
				r = 2;
				break;
			}
		} else t.type === "labelEnd" && (a = n);
	}
	let s = {
		type: e[i][1].type === "labelLink" ? "link" : "image",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	}, c = {
		type: "label",
		start: { ...e[i][1].start },
		end: { ...e[a][1].end }
	}, l = {
		type: "labelText",
		start: { ...e[i + r + 2][1].end },
		end: { ...e[a - 2][1].start }
	};
	return o = [[
		"enter",
		s,
		t
	], [
		"enter",
		c,
		t
	]], o = N(o, e.slice(i + 1, i + r + 3)), o = N(o, [[
		"enter",
		l,
		t
	]]), o = N(o, Yo(t.parser.constructs.insideSpan.null, e.slice(i + r + 4, a - 3), t)), o = N(o, [
		[
			"exit",
			l,
			t
		],
		e[a - 2],
		e[a - 1],
		[
			"exit",
			c,
			t
		]
	]), o = N(o, e.slice(a + 1)), o = N(o, [[
		"exit",
		s,
		t
	]]), M(e, i, e.length, o), e;
}
function oc(e, t, n) {
	let r = this, i = r._labelStarts, a, o;
	if (i) {
		for (; i.length > 0 && i[i.length - 1]._balanced;) i.pop();
		a = i[i.length - 1];
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(j(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(tc, u, o ? u : d)(t) : t === 91 ? e.attempt(nc, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(rc, u, d)(t);
	}
	function u(e) {
		return i.pop(), t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function sc(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return a(t) ? Ls(e, o)(t) : o(t);
	}
	function o(t) {
		return t === 41 ? d(t) : Ps(e, s, c, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function s(t) {
		return a(t) ? Ls(e, l)(t) : d(t);
	}
	function c(e) {
		return n(e);
	}
	function l(t) {
		return t === 34 || t === 39 || t === 40 ? Is(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : d(t);
	}
	function u(t) {
		return a(t) ? Ls(e, d)(t) : d(t);
	}
	function d(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function cc(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Fs.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(j(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function lc(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-start-image.js
var uc = {
	name: "labelStartImage",
	resolveAll: ec.resolveAll,
	tokenize: dc
};
function dc(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), o;
	}
	function o(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelImage"), s) : n(t);
	}
	function s(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-start-link.js
var fc = {
	name: "labelStartLink",
	resolveAll: ec.resolveAll,
	tokenize: pc
};
function pc(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelLink"), o;
	}
	function o(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/line-ending.js
var mc = {
	name: "lineEnding",
	tokenize: hc
};
function hc(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), P(e, t, "linePrefix");
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/thematic-break.js
var gc = {
	name: "thematicBreak",
	tokenize: _c
};
function _c(e, n, r) {
	let i = 0, a;
	return o;
	function o(t) {
		return e.enter("thematicBreak"), s(t);
	}
	function s(e) {
		return a = e, c(e);
	}
	function c(o) {
		return o === a ? (e.enter("thematicBreakSequence"), l(o)) : i >= 3 && (o === null || t(o)) ? (e.exit("thematicBreak"), n(o)) : r(o);
	}
	function l(t) {
		return t === a ? (e.consume(t), i++, l) : (e.exit("thematicBreakSequence"), d(t) ? P(e, c, "whitespace")(t) : c(t));
	}
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/list.js
var F = {
	continuation: { tokenize: xc },
	exit: Cc,
	name: "list",
	tokenize: bc
}, vc = {
	partial: !0,
	tokenize: wc
}, yc = {
	partial: !0,
	tokenize: Sc
};
function bc(t, n, r) {
	let i = this, a = i.events[i.events.length - 1], o = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, s = 0;
	return c;
	function c(n) {
		let a = i.containerState.type || (n === 42 || n === 43 || n === 45 ? "listUnordered" : "listOrdered");
		if (a === "listUnordered" ? !i.containerState.marker || n === i.containerState.marker : e(n)) {
			if (i.containerState.type || (i.containerState.type = a, t.enter(a, { _container: !0 })), a === "listUnordered") return t.enter("listItemPrefix"), n === 42 || n === 45 ? t.check(gc, r, u)(n) : u(n);
			if (!i.interrupt || n === 49) return t.enter("listItemPrefix"), t.enter("listItemValue"), l(n);
		}
		return r(n);
	}
	function l(n) {
		return e(n) && ++s < 10 ? (t.consume(n), l) : (!i.interrupt || s < 2) && (i.containerState.marker ? n === i.containerState.marker : n === 41 || n === 46) ? (t.exit("listItemValue"), u(n)) : r(n);
	}
	function u(e) {
		return t.enter("listItemMarker"), t.consume(e), t.exit("listItemMarker"), i.containerState.marker = i.containerState.marker || e, t.check(rs, i.interrupt ? r : f, t.attempt(vc, m, p));
	}
	function f(e) {
		return i.containerState.initialBlankLine = !0, o++, m(e);
	}
	function p(e) {
		return d(e) ? (t.enter("listItemPrefixWhitespace"), t.consume(e), t.exit("listItemPrefixWhitespace"), m) : r(e);
	}
	function m(e) {
		return i.containerState.size = o + i.sliceSerialize(t.exit("listItemPrefix"), !0).length, n(e);
	}
}
function xc(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(rs, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, P(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !d(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(yc, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, P(e, e.attempt(F, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function Sc(e, t, n) {
	let r = this;
	return P(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function Cc(e) {
	e.exit(this.containerState.type);
}
function wc(e, t, n) {
	let r = this;
	return P(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !d(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
// ../../node_modules/.pnpm/micromark-util-edit-map@1.0.0/node_modules/micromark-util-edit-map/index.js
var Tc = class {
	constructor() {
		this.index = /* @__PURE__ */ new Map(), this.map = [];
	}
	add(e, t, n) {
		Ec(this, e, t, n, !1);
	}
	addBefore(e, t, n) {
		Ec(this, e, t, n, !0);
	}
	consume(e) {
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function Ec(e, t, n, r, i) {
	if (n === 0 && r.length === 0) return;
	let a = e.index.get(t);
	if (a) {
		a[1] += n, i ? (r.push(...a[2]), a[2] = r) : a[2].push(...r);
		return;
	}
	let o = [
		t,
		n,
		r
	];
	e.map.push(o), e.index.set(t, o);
}
// ../../node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/setext-underline.js
var Dc = {
	name: "setextUnderline",
	resolveTo: Oc,
	tokenize: kc
};
function Oc(e, t) {
	let n = new Tc(), r = e.length, i, a, o;
	for (; r--;) if (e[r][0] === "enter") {
		if (e[r][1].type === "content") {
			i = r;
			break;
		}
		e[r][1].type === "paragraph" && (a = r);
	} else e[r][1].type === "content" && n.add(r, 1, []), !o && e[r][1].type === "definition" && (o = r);
	let s = {
		type: "setextHeading",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[a][1].type = "setextHeadingText", o ? (n.add(a, 0, [[
		"enter",
		s,
		t
	]]), n.add(o + 1, 0, [[
		"exit",
		e[i][1],
		t
	]]), e[i][1].end = { ...e[o][1].end }) : e[i][1] = s, n.add(e.length, 0, [[
		"exit",
		s,
		t
	]]), n.consume(e), e;
}
function kc(e, n, r) {
	let i = this, a;
	return o;
	function o(t) {
		let n = i.events.length, o;
		for (; n--;) if (i.events[n][1].type !== "lineEnding" && i.events[n][1].type !== "linePrefix" && i.events[n][1].type !== "content") {
			o = i.events[n][1].type === "paragraph";
			break;
		}
		return !i.parser.lazy[i.now().line] && (i.interrupt || o) ? (e.enter("setextHeadingLine"), a = t, s(t)) : r(t);
	}
	function s(t) {
		return e.enter("setextHeadingLineSequence"), c(t);
	}
	function c(t) {
		return t === a ? (e.consume(t), c) : (e.exit("setextHeadingLineSequence"), d(t) ? P(e, l, "lineSuffix")(t) : l(t));
	}
	function l(i) {
		return i === null || t(i) ? (e.exit("setextHeadingLine"), n(i)) : r(i);
	}
}
// ../../node_modules/.pnpm/micromark-extension-gfm-footnote@2.1.0/node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var Ac = {
	tokenize: Rc,
	partial: !0
};
function jc() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: Fc,
			continuation: { tokenize: Ic },
			exit: Lc
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: Pc
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: Mc,
				resolveTo: Nc
			}
		}
	};
}
function Mc(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = j(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function Nc(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function Pc(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(c) {
		if (o > 999 || c === 93 && !s || c === null || c === 91 || a(c)) return n(c);
		if (c === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(j(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(c);
		}
		return a(c) || (s = !0), o++, e.consume(c), c === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
}
function Fc(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o, s = 0, c;
	return l;
	function l(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
	}
	function u(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", d) : n(t);
	}
	function d(t) {
		if (s > 999 || t === 93 && !c || t === null || t === 91 || a(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return o = j(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
		}
		return a(t) || (c = !0), s++, e.consume(t), t === 92 ? f : d;
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
	function p(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(o) || i.push(o), P(e, m, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function m(e) {
		return t(e);
	}
}
function Ic(e, t, n) {
	return e.check(rs, t, e.attempt(Ac, t, n));
}
function Lc(e) {
	e.exit("gfmFootnoteDefinition");
}
function Rc(e, t, n) {
	let r = this;
	return P(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
// ../../node_modules/.pnpm/micromark-extension-gfm-strikethrough@2.1.0/node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function zc(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && M(o, o.length, 0, Yo(s, e.slice(r + 1, n), t)), M(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), M(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = Hi(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = Hi(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
// ../../node_modules/.pnpm/micromark-extension-gfm-table@2.1.2/node_modules/micromark-extension-gfm-table/lib/edit-map.js
var Bc = class {
	constructor() {
		this.map = [], this.index = /* @__PURE__ */ new Map();
	}
	add(e, t, n) {
		Vc(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function Vc(e, t, n, r) {
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (n === 0 && r.length === 0) return;
	let i = e.index.get(t);
	if (i) {
		i[1] += n, i[2].push(...r);
		return;
	}
	let a = [
		t,
		n,
		r
	];
	e.map.push(a), e.index.set(t, a);
}
// ../../node_modules/.pnpm/micromark-extension-gfm-table@2.1.2/node_modules/micromark-extension-gfm-table/lib/infer.js
function Hc(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
// ../../node_modules/.pnpm/micromark-extension-gfm-table@2.1.2/node_modules/micromark-extension-gfm-table/lib/syntax.js
function Uc() {
	return { flow: { null: {
		name: "table",
		tokenize: Wc,
		resolveAll: Gc
	} } };
}
function Wc(e, n, r) {
	let i = this, o = 0, s = 0, c;
	return l;
	function l(e) {
		let t = i.events.length - 1;
		for (; t > -1;) {
			let { type: e } = i.events[t][1];
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let n = t > -1 ? i.events[t][1].type : null, a = n === "tableHead" || n === "tableRow" ? T : u;
		return a === T && i.parser.lazy[i.now().line] ? r(e) : a(e);
	}
	function u(t) {
		return e.enter("tableHead"), e.enter("tableRow"), f(t);
	}
	function f(e) {
		return e === 124 || (c = !0, s += 1), p(e);
	}
	function p(n) {
		return n === null ? r(n) : t(n) ? s > 1 ? (s = 0, i.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), g) : r(n) : d(n) ? P(e, p, "whitespace")(n) : (s += 1, c && (c = !1, o += 1), n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), c = !0, p) : (e.enter("data"), m(n)));
	}
	function m(t) {
		return t === null || t === 124 || a(t) ? (e.exit("data"), p(t)) : (e.consume(t), t === 92 ? h : m);
	}
	function h(t) {
		return t === 92 || t === 124 ? (e.consume(t), m) : m(t);
	}
	function g(t) {
		return i.interrupt = !1, i.parser.lazy[i.now().line] ? r(t) : (e.enter("tableDelimiterRow"), c = !1, d(t) ? P(e, _, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : _(t));
	}
	function _(t) {
		return t === 45 || t === 58 ? y(t) : t === 124 ? (c = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), v) : w(t);
	}
	function v(t) {
		return d(t) ? P(e, y, "whitespace")(t) : y(t);
	}
	function y(n) {
		return n === 58 ? (s += 1, c = !0, e.enter("tableDelimiterMarker"), e.consume(n), e.exit("tableDelimiterMarker"), b) : n === 45 ? (s += 1, b(n)) : n === null || t(n) ? C(n) : w(n);
	}
	function b(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), x(t)) : w(t);
	}
	function x(t) {
		return t === 45 ? (e.consume(t), x) : t === 58 ? (c = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), S) : (e.exit("tableDelimiterFiller"), S(t));
	}
	function S(t) {
		return d(t) ? P(e, C, "whitespace")(t) : C(t);
	}
	function C(r) {
		return r === 124 ? _(r) : r === null || t(r) ? !c || o !== s ? w(r) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(r)) : w(r);
	}
	function w(e) {
		return r(e);
	}
	function T(t) {
		return e.enter("tableRow"), E(t);
	}
	function E(r) {
		return r === 124 ? (e.enter("tableCellDivider"), e.consume(r), e.exit("tableCellDivider"), E) : r === null || t(r) ? (e.exit("tableRow"), n(r)) : d(r) ? P(e, E, "whitespace")(r) : (e.enter("data"), D(r));
	}
	function D(t) {
		return t === null || t === 124 || a(t) ? (e.exit("data"), E(t)) : (e.consume(t), t === 92 ? ee : D);
	}
	function ee(t) {
		return t === 92 || t === 124 ? (e.consume(t), D) : D(t);
	}
}
function Gc(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new Bc();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (qc(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = Kc(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = Kc(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = Kc(f, t, o, i, n, d)) : (o[0] = o[1], d = Kc(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && qc(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = Hc(t.events, n));
	}
	return e;
}
function Kc(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, Jc(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = Jc(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = Jc(t.events, n[2]), a = Jc(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, Jc(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function qc(e, t, n, r, i) {
	let a = [], o = Jc(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function Jc(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
// ../../node_modules/.pnpm/micromark-extension-gfm-task-list-item@2.1.0/node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var Yc = {
	name: "tasklistCheck",
	tokenize: Zc
};
function Xc() {
	return { text: { 91: Yc } };
}
function Zc(e, n, r) {
	let i = this;
	return o;
	function o(t) {
		return i.previous !== null || !i._gfmTasklistFirstContentOfListItem ? r(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), s);
	}
	function s(t) {
		return a(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), c) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), c) : r(t);
	}
	function c(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), l) : r(t);
	}
	function l(i) {
		return t(i) ? n(i) : d(i) ? e.check({ tokenize: Qc }, n, r)(i) : r(i);
	}
}
function Qc(e, t, n) {
	return P(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
// ../../node_modules/.pnpm/micromark-extension-gfm@3.0.0/node_modules/micromark-extension-gfm/index.js
function $c(e) {
	return So([
		Po(),
		jc(),
		zc(e),
		Uc(),
		Xc()
	]);
}
// ../../node_modules/.pnpm/remark-gfm@4.0.1/node_modules/remark-gfm/lib/index.js
var el = {};
function tl(e) {
	let t = this, n = e || el, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push($c(n)), a.push(yo()), o.push(bo(n));
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/content.js
var nl = { tokenize: rl };
function rl(e) {
	let n = e.attempt(this.parser.constructs.contentInitial, i, a), r;
	return n;
	function i(t) {
		if (t === null) e.consume(t);
		else return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), P(e, n, "linePrefix");
	}
	function a(t) {
		return e.enter("paragraph"), o(t);
	}
	function o(t) {
		let n = e.enter("chunkText", {
			contentType: "text",
			previous: r
		});
		return r && (r.next = n), r = n, s(t);
	}
	function s(n) {
		if (n === null) e.exit("chunkText"), e.exit("paragraph"), e.consume(n);
		else return t(n) ? (e.consume(n), e.exit("chunkText"), o) : (e.consume(n), s);
	}
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/document.js
var il = { tokenize: ol }, al = { tokenize: sl };
function ol(e) {
	let n = this, r = [], i = 0, a, o, s;
	return c;
	function c(t) {
		if (i < r.length) {
			let a = r[i];
			return n.containerState = a[1], e.attempt(a[0].continuation, l, u)(t);
		}
		return u(t);
	}
	function l(e) {
		if (i++, n.containerState._closeFlow) {
			n.containerState._closeFlow = void 0, a && y();
			let t = n.events.length, r = t, o;
			for (; r--;) if (n.events[r][0] === "exit" && n.events[r][1].type === "chunkFlow") {
				o = n.events[r][1].end;
				break;
			}
			v(i);
			let s = t;
			for (; s < n.events.length;) n.events[s][1].end = { ...o }, s++;
			let c = new Tc();
			return c.add(r + 1, 0, n.events.slice(t)), c.add(t, s - t, []), c.consume(n.events), u(e);
		}
		return c(e);
	}
	function u(t) {
		if (i === r.length) {
			if (!a) return p(t);
			if (a.currentConstruct && a.currentConstruct.concrete) return h(t);
			n.interrupt = !(!a.currentConstruct || a._gfmTableDynamicInterruptHack);
		}
		return n.containerState = {}, e.check(al, d, f)(t);
	}
	function d(e) {
		return a && y(), v(i), p(e);
	}
	function f(e) {
		return n.parser.lazy[n.now().line] = i !== r.length, s = n.now().offset, h(e);
	}
	function p(t) {
		return n.containerState = {}, e.attempt(al, m, h)(t);
	}
	function m(e) {
		return i++, r.push([n.currentConstruct, n.containerState]), p(e);
	}
	function h(t) {
		if (t === null) a && y(), v(0), e.consume(t);
		else return a ||= n.parser.flow(n.now()), e.enter("chunkFlow", {
			_tokenizer: a,
			contentType: "flow",
			previous: o
		}), g(t);
	}
	function g(r) {
		if (r === null) _(e.exit("chunkFlow"), !0), v(0), e.consume(r);
		else return t(r) ? (e.consume(r), _(e.exit("chunkFlow")), i = 0, n.interrupt = void 0, c) : (e.consume(r), g);
	}
	function _(e, t) {
		let r = n.sliceStream(e);
		if (t && r.push(null), e.previous = o, o && (o.next = e), o = e, a.defineSkip(e.start), a.write(r), n.parser.lazy[e.start.line]) {
			let e = a.events.length;
			for (; e--;) if (a.events[e][1].start.offset < s && (!a.events[e][1].end || a.events[e][1].end.offset > s)) return;
			let t = n.events.length, r = t, o, c;
			for (; r--;) if (n.events[r][0] === "exit" && n.events[r][1].type === "chunkFlow") {
				if (o) {
					c = n.events[r][1].end;
					break;
				}
				o = !0;
			}
			for (v(i), e = t; e < n.events.length;) n.events[e][1].end = { ...c }, e++;
			let l = new Tc();
			l.add(r + 1, 0, n.events.slice(t)), l.add(t, e - t, []), l.consume(n.events);
		}
	}
	function v(t) {
		let i = r.length;
		for (; i-- > t;) {
			let t = r[i];
			n.containerState = t[1], t[0].exit.call(n, e);
		}
		r.length = t;
	}
	function y() {
		a.write([null]), o = void 0, a = void 0, n.containerState._closeFlow = void 0;
	}
}
function sl(e, t, n) {
	return P(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/flow.js
var cl = { tokenize: ll };
function ll(e) {
	let t = this, n = e.attempt(rs, r, e.attempt(this.parser.constructs.flowInitial, i, P(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ks, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/text.js
var ul = { resolveAll: ml() }, dl = pl("string"), fl = pl("text");
function pl(e) {
	return {
		resolveAll: ml(e === "text" ? hl : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) t.consume(e);
			else return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function ml(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : t[r] && t[r][1].type === "data" || (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function hl(e, t) {
	let n = new Tc(), r = 0;
	for (; ++r <= e.length;) if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
		let i = e[r - 1][1], a = t.sliceStream(i), o = a.length, s = -1, c = 0, l;
		for (; o--;) {
			let e = a[o];
			if (typeof e == "string") {
				for (s = e.length; e.charCodeAt(s - 1) === 32;) c++, s--;
				if (s) break;
				s = -1;
			} else if (e === -2) l = !0, c++;
			else if (e !== -1) {
				o++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && r === e.length && (c = 0), c) {
			let a = {
				type: r === e.length || l || c < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: o ? s : i.start._bufferIndex + s,
					_index: i.start._index + o,
					line: i.end.line,
					column: i.end.column - c,
					offset: i.end.offset - c
				},
				end: { ...i.end }
			};
			i.end = { ...a.start }, i.start.offset === i.end.offset ? Object.assign(i, a) : n.add(r, 0, [[
				"enter",
				a,
				t
			], [
				"exit",
				a,
				t
			]]);
		}
		r++;
	}
	return n.consume(e), e;
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/constructs.js
var gl = /* @__PURE__ */ y({
	attentionMarkers: () => wl,
	contentInitial: () => vl,
	disable: () => Tl,
	document: () => _l,
	flow: () => bl,
	flowInitial: () => yl,
	insideSpan: () => Cl,
	string: () => xl,
	text: () => Sl
}), _l = {
	42: F,
	43: F,
	45: F,
	48: F,
	49: F,
	50: F,
	51: F,
	52: F,
	53: F,
	54: F,
	55: F,
	56: F,
	57: F,
	62: as
}, vl = { 91: Rs }, yl = {
	[-2]: _s,
	[-1]: _s,
	32: _s
}, bl = {
	35: Ws,
	42: gc,
	45: [Dc, gc],
	60: qs,
	61: Dc,
	95: gc,
	96: hs,
	126: hs
}, xl = {
	38: ds,
	92: ls
}, Sl = {
	[-5]: mc,
	[-4]: mc,
	[-3]: mc,
	33: uc,
	38: ds,
	42: Xo,
	60: [es, Qs],
	91: fc,
	92: [Hs, ls],
	93: ec,
	95: Xo,
	96: xs
}, Cl = { null: [Xo, ul] }, wl = { null: [42, 95] }, Tl = { null: [] };
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/create-tokenizer.js
function El(e, n, r) {
	let i = {
		_bufferIndex: -1,
		_index: 0,
		line: r && r.line || 1,
		column: r && r.column || 1,
		offset: r && r.offset || 0
	}, a = {}, o = [], s = [], c = [], l = {
		attempt: w(S),
		check: w(C),
		consume: y,
		enter: b,
		exit: x,
		interrupt: w(C, { interrupt: !0 })
	}, u = {
		code: null,
		containerState: {},
		defineSkip: g,
		events: [],
		now: h,
		parser: e,
		previous: null,
		sliceSerialize: p,
		sliceStream: m,
		write: f
	}, d = n.tokenize.call(u, l);
	return n.resolveAll && o.push(n), u;
	function f(e) {
		return s = N(s, e), _(), s[s.length - 1] === null ? (T(n, 0), u.events = Yo(o, u.events, u), u.events) : [];
	}
	function p(e, t) {
		return Ol(m(e), t);
	}
	function m(e) {
		return Dl(s, e);
	}
	function h() {
		let { _bufferIndex: e, _index: t, line: n, column: r, offset: a } = i;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: r,
			offset: a
		};
	}
	function g(e) {
		a[e.line] = e.column, D();
	}
	function _() {
		for (; i._index < s.length;) {
			let e = s[i._index];
			if (typeof e == "string") {
				let t = i._index;
				for (i._bufferIndex < 0 && (i._bufferIndex = 0); i._index === t && i._bufferIndex < e.length;) v(e.charCodeAt(i._bufferIndex));
			} else v(e);
		}
	}
	function v(e) {
		d = d(e);
	}
	function y(e) {
		t(e) ? (i.line++, i.column = 1, i.offset += e === -3 ? 2 : 1, D()) : e !== -1 && (i.column++, i.offset++), i._bufferIndex < 0 ? i._index++ : (i._bufferIndex++, i._bufferIndex === s[i._index].length && (i._bufferIndex = -1, i._index++)), u.previous = e;
	}
	function b(e, t) {
		let n = t || {};
		return n.type = e, n.start = h(), u.events.push([
			"enter",
			n,
			u
		]), c.push(n), n;
	}
	function x(e) {
		let t = c.pop();
		return t.end = h(), u.events.push([
			"exit",
			t,
			u
		]), t;
	}
	function S(e, t) {
		T(e, t.from);
	}
	function C(e, t) {
		t.restore();
	}
	function w(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, c;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return c = E(), s = e, e.partial || (u.currentConstruct = e), e.name && u.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(u), t) : u, l, m, h)(n);
				}
			}
			function m(t) {
				return e(s, c), r;
			}
			function h(e) {
				return c.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function T(e, t) {
		e.resolveAll && !o.includes(e) && o.push(e), e.resolve && M(u.events, t, u.events.length - t, e.resolve(u.events.slice(t), u)), e.resolveTo && (u.events = e.resolveTo(u.events, u));
	}
	function E() {
		let e = h(), t = u.previous, n = u.currentConstruct, r = u.events.length, a = Array.from(c);
		return {
			from: r,
			restore: o
		};
		function o() {
			i = e, u.previous = t, u.currentConstruct = n, u.events.length = r, c = a, D();
		}
	}
	function D() {
		i.line in a && i.column < 2 && (i.column = a[i.line], i.offset += a[i.line] - 1);
	}
}
function Dl(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Ol(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/parse.js
function kl(e) {
	let t = {
		constructs: So([gl, ...(e || {}).extensions || []]),
		content: n(nl),
		defined: [],
		document: n(il),
		flow: n(cl),
		lazy: {},
		string: n(dl),
		text: n(fl)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return El(t, e, n);
		}
	}
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/postprocess.js
function Al(e) {
	for (; !Ds(e););
	return e;
}
// ../../node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/preprocess.js
var jl = /[\0\t\n\r]/g;
function Ml() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i));
		let s = [], c = 0;
		for (t = "", n &&= (i.charCodeAt(0) === 65279 && c++, void 0); c < i.length;) {
			jl.lastIndex = c;
			let n = jl.exec(i), a = n && n.index !== void 0 ? n.index : i.length, o = i.charCodeAt(a);
			if (!n) {
				t = i.slice(c);
				break;
			}
			if (o === 10 && c === a && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), c < a && (s.push(i.slice(c, a)), e += a - c), o) {
				case 0:
					s.push(65533), e++;
					break;
				case 9: {
					let t = Math.ceil(e / 4) * 4;
					for (s.push(-2); e++ < t;) s.push(-1);
					break;
				}
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			c = a + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
// ../../node_modules/.pnpm/unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/lib/index.js
function Nl(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Fl(e.position) : "start" in e || "end" in e ? Fl(e) : "line" in e || "column" in e ? Pl(e) : "";
}
function Pl(e) {
	return Il(e && e.line) + ":" + Il(e && e.column);
}
function Fl(e) {
	return Pl(e && e.start) + "-" + Pl(e && e.end);
}
function Il(e) {
	return e && typeof e == "number" ? e : 1;
}
// ../../node_modules/.pnpm/mdast-util-from-markdown@2.1.0/node_modules/mdast-util-from-markdown/lib/index.js
var Ll = {}.hasOwnProperty;
function Rl(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), zl(n)(Al(kl(n).document().write(Ml()(e, t, !0))));
}
function zl(e) {
	let t = {
		afterExit: [],
		beforeEnter: [],
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: o(Te),
			autolinkProtocol: E,
			autolinkEmail: E,
			atxHeading: o(xe),
			blockQuote: o(ge),
			characterEscape: E,
			characterReference: E,
			codeFenced: o(_e),
			codeFencedFenceInfo: s,
			codeFencedFenceMeta: s,
			codeIndented: o(_e, s),
			codeText: o(ve, s),
			codeTextData: E,
			data: E,
			codeFlowValue: E,
			definition: o(ye),
			definitionDestinationString: s,
			definitionLabelString: s,
			definitionTitleString: s,
			emphasis: o(be),
			hardBreakEscape: o(Se),
			hardBreakTrailing: o(Se),
			htmlFlow: o(Ce, s),
			htmlFlowData: E,
			htmlText: o(Ce, s),
			htmlTextData: E,
			image: o(we),
			label: s,
			link: o(Te),
			listItem: o(De),
			listItemValue: p,
			listOrdered: o(Ee, f),
			listUnordered: o(Ee),
			paragraph: o(Oe),
			reference: le,
			referenceString: s,
			resourceDestinationString: s,
			resourceTitleString: s,
			setextHeading: o(xe),
			strong: o(ke),
			thematicBreak: o(je)
		},
		exit: {
			atxHeading: l(),
			atxHeadingSequence: S,
			autolink: l(),
			autolinkEmail: he,
			autolinkProtocol: me,
			blockQuote: l(),
			characterEscapeValue: D,
			characterReferenceMarkerHexadecimal: de,
			characterReferenceMarkerNumeric: de,
			characterReferenceValue: fe,
			characterReference: pe,
			codeFenced: l(_),
			codeFencedFence: g,
			codeFencedFenceInfo: m,
			codeFencedFenceMeta: h,
			codeFlowValue: D,
			codeIndented: l(v),
			codeText: l(ie),
			codeTextData: D,
			data: D,
			definition: l(),
			definitionDestinationString: x,
			definitionLabelString: y,
			definitionTitleString: b,
			emphasis: l(),
			hardBreakEscape: l(te),
			hardBreakTrailing: l(te),
			htmlFlow: l(ne),
			htmlFlowData: D,
			htmlText: l(re),
			htmlTextData: D,
			image: l(ae),
			label: k,
			labelText: oe,
			lineEnding: ee,
			link: l(O),
			listItem: l(),
			listOrdered: l(),
			listUnordered: l(),
			paragraph: l(),
			referenceString: ue,
			resourceDestinationString: se,
			resourceTitleString: A,
			resource: ce,
			setextHeading: l(T),
			setextHeadingLineSequence: w,
			setextHeadingText: C,
			strong: l(),
			thematicBreak: l()
		}
	};
	Vl(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: [],
			position: void 0
		}, o = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: c,
			exit: u,
			buffer: s,
			resume: d,
			data: n
		}, l = [], f = [], p = -1;
		for (; ++p < e.length;) f.push(e[p]), (e[p][1].type === "listOrdered" || e[p][1].type === "listUnordered") && (e[p][0] === "enter" ? l.push(f.length - 1) : a(f, l.pop()));
		for (e = f, p = -1; ++p < e.length;) {
			let n = t[e[p][0]];
			e[p][0] === "enter" && t.beforeEnter.length > 0 && i(t.beforeEnter, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), Ll.call(n, e[p][1].type) && n[e[p][1].type].call({
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), e[p][0] === "exit" && t.afterExit.length > 0 && i(t.afterExit, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]);
		}
		if (o.tokenStack.length > 0) {
			let e = o.tokenStack[o.tokenStack.length - 1];
			(e[1] || Ul).call(o, void 0, e[0]);
		}
		for (r.position = {
			start: Bl(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: Bl(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, p = -1; ++p < t.transforms.length;) r = t.transforms[p](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = -1;
		for (; ++r < e.length;) e[r].call(t, n);
	}
	function a(e, t) {
		let n = e.length - 1, r = t - 1, i = -1, a = !1, o, s, c, l, u = [];
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let n = r;
					for (s = void 0; n--;) {
						let t = e[n];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = n;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), u.push({
						at: s || r,
						event: [
							"exit",
							o,
							t[2]
						]
					});
				}
				if (t[1].type === "listItemPrefix") {
					let e = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = e, u.push({
						at: r,
						event: [
							"enter",
							e,
							t[2]
						]
					}), c = void 0, l = !0;
				}
			}
		}
		let d = e.splice(t), f = 0;
		for (r = -1; ++r < d.length;) {
			for (; f < u.length && u[f].at === t + r;) e.push(u[f++].event);
			e.push(d[r]);
		}
		e[t][1]._spread = a;
	}
	function o(e, t) {
		return n;
		function n(n) {
			c.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function s() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function c(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: Bl(t.start),
			end: void 0
		};
	}
	function l(e) {
		return t;
		function t(t) {
			e && e.call(this, t), u.call(this, t);
		}
	}
	function u(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (!r) throw Error("Cannot close `" + e.type + "` (" + Nl({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || Ul).call(this, e, r[0])), n.position.end = Bl(e.end);
	}
	function d() {
		return ma(this.stack.pop());
	}
	function f() {
		this.data.expectingFirstListItemValue = !0;
	}
	function p(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function h() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function g() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function v() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function y(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = j(this.sliceSerialize(e)).toLowerCase();
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function x() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function S(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function C() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function w(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function T() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function E(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		n && n.type === "text" || (n = Ae(), n.position = {
			start: Bl(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function D(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = Bl(e.end);
	}
	function ee(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = Bl(e.end), this.data.atHardBreak = void 0;
		} else !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (E.call(this, e), D.call(this, e));
	}
	function te() {
		this.data.atHardBreak = !0;
	}
	function ne() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function re() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ie() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function O() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function ae() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function oe(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = eo(t), n.identifier = j(t).toLowerCase();
	}
	function k() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function se() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function A() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function ce() {
		this.data.inReference = void 0;
	}
	function le() {
		this.data.referenceType = "collapsed";
	}
	function ue(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = j(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function de(e) {
		this.data.characterReferenceType = e.type;
	}
	function fe(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = Qa(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = Za(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function pe(e) {
		let t = this.stack.pop();
		t.position.end = Bl(e.end);
	}
	function me(e) {
		D.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function he(e) {
		D.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function ge() {
		return {
			type: "blockquote",
			children: [],
			position: void 0
		};
	}
	function _e() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: "",
			position: void 0
		};
	}
	function ve() {
		return {
			type: "inlineCode",
			value: "",
			position: void 0
		};
	}
	function ye() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: "",
			position: void 0
		};
	}
	function be() {
		return {
			type: "emphasis",
			children: [],
			position: void 0
		};
	}
	function xe() {
		return {
			type: "heading",
			depth: 0,
			children: [],
			position: void 0
		};
	}
	function Se() {
		return {
			type: "break",
			position: void 0
		};
	}
	function Ce() {
		return {
			type: "html",
			value: "",
			position: void 0
		};
	}
	function we() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null,
			position: void 0
		};
	}
	function Te() {
		return {
			type: "link",
			title: null,
			url: "",
			children: [],
			position: void 0
		};
	}
	function Ee(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: [],
			position: void 0
		};
	}
	function De(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: [],
			position: void 0
		};
	}
	function Oe() {
		return {
			type: "paragraph",
			children: [],
			position: void 0
		};
	}
	function ke() {
		return {
			type: "strong",
			children: [],
			position: void 0
		};
	}
	function Ae() {
		return {
			type: "text",
			value: "",
			position: void 0
		};
	}
	function je() {
		return {
			type: "thematicBreak",
			position: void 0
		};
	}
}
function Bl(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function Vl(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? Vl(e, r) : Hl(e, r);
	}
}
function Hl(e, t) {
	let n;
	for (n in t) if (Ll.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "afterExit":
		case "beforeEnter": {
			let r = t[n];
			r && e[n].push(r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function Ul(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + Nl({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + Nl({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + Nl({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
// ../../node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/lib/index.js
function Wl(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return Rl(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
// ../../node_modules/.pnpm/bail@2.0.2/node_modules/bail/index.js
function Gl(e) {
	if (e) throw e;
}
// ../../node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js
var Kl = /* @__PURE__ */ v(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
// ../../node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function ql(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
// ../../node_modules/.pnpm/trough@2.2.0/node_modules/trough/lib/index.js
function Jl() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) r(a);
			else {
				for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
				t = o, s ? Yl(s, i)(...o) : r(null, ...o);
			}
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function Yl(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
// ../../node_modules/.pnpm/vfile-message@4.0.3/node_modules/vfile-message/lib/index.js
var I = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = Nl(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
I.prototype.file = "", I.prototype.name = "", I.prototype.reason = "", I.prototype.message = "", I.prototype.stack = "", I.prototype.column = void 0, I.prototype.line = void 0, I.prototype.ancestors = void 0, I.prototype.cause = void 0, I.prototype.fatal = void 0, I.prototype.place = void 0, I.prototype.ruleId = void 0, I.prototype.source = void 0;
// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minpath.browser.js
var L = {
	basename: Xl,
	dirname: Zl,
	extname: Ql,
	join: $l,
	sep: "/"
};
function Xl(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	nu(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Zl(e) {
	if (nu(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Ql(e) {
	nu(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
		} else n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function $l(...e) {
	let t = -1, n;
	for (; ++t < e.length;) nu(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : eu(n);
}
function eu(e) {
	nu(e);
	let t = e.codePointAt(0) === 47, n = tu(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function tu(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function nu(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minproc.browser.js
var ru = { cwd: iu };
function iu() {
	return "/";
}
// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.shared.js
function au(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.browser.js
function ou(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!au(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return su(e);
}
function su(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/index.js
var cu = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], lu = class {
	constructor(e) {
		let t;
		t = e ? au(e) ? { path: e } : typeof e == "string" || pu(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : ru.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < cu.length;) {
			let e = cu[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) cu.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? L.basename(this.path) : void 0;
	}
	set basename(e) {
		du(e, "basename"), uu(e, "basename"), this.path = L.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? L.dirname(this.path) : void 0;
	}
	set dirname(e) {
		fu(this.basename, "dirname"), this.path = L.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? L.extname(this.path) : void 0;
	}
	set extname(e) {
		if (uu(e, "extname"), fu(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = L.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		au(e) && (e = ou(e)), du(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? L.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		du(e, "stem"), uu(e, "stem"), this.path = L.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new I(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function uu(e, t) {
	if (e && e.includes(L.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + L.sep + "`");
}
function du(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function fu(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function pu(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
// ../../node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/callable-instance.js
var mu = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), hu = /* @__PURE__ */ x(Kl(), 1), gu = {}.hasOwnProperty, _u = new class e extends mu {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Jl();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, hu.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (bu("data", this.frozen), this.namespace[e] = t, this) : gu.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (bu("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = Cu(e), n = this.parser || this.Parser;
		return vu("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), vu("process", this.parser || this.Parser), yu("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = Cu(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				Tu(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), vu("processSync", this.parser || this.Parser), yu("processSync", this.compiler || this.Compiler), this.process(e, r), Su("processSync", "process", t), n;
		function r(e, r) {
			t = !0, Gl(e), n = r;
		}
	}
	run(e, t, n) {
		xu(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = Cu(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), Su("runSync", "run", n), r;
		function i(e, t) {
			Gl(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = Cu(t), r = this.compiler || this.Compiler;
		return yu("stringify", r), xu(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (bu("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, hu.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				ql(o) && ql(r) && (r = (0, hu.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function vu(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function yu(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function bu(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function xu(e) {
	if (!ql(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function Su(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Cu(e) {
	return wu(e) ? e : new lu(e);
}
function wu(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Tu(e) {
	return typeof e == "string" || Eu(e);
}
function Eu(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/identity.js
var Du = Symbol.for("yaml.alias"), Ou = Symbol.for("yaml.document"), ku = Symbol.for("yaml.map"), Au = Symbol.for("yaml.pair"), ju = Symbol.for("yaml.scalar"), Mu = Symbol.for("yaml.seq"), R = Symbol.for("yaml.node.type"), Nu = (e) => !!e && typeof e == "object" && e[R] === Du, Pu = (e) => !!e && typeof e == "object" && e[R] === Ou, Fu = (e) => !!e && typeof e == "object" && e[R] === ku, z = (e) => !!e && typeof e == "object" && e[R] === Au, B = (e) => !!e && typeof e == "object" && e[R] === ju, Iu = (e) => !!e && typeof e == "object" && e[R] === Mu;
function V(e) {
	if (e && typeof e == "object") switch (e[R]) {
		case ku:
		case Mu: return !0;
	}
	return !1;
}
function H(e) {
	if (e && typeof e == "object") switch (e[R]) {
		case Du:
		case ku:
		case ju:
		case Mu: return !0;
	}
	return !1;
}
var Lu = (e) => (B(e) || V(e)) && !!e.anchor, Ru = Symbol("break visit"), zu = Symbol("skip children"), Bu = Symbol("remove node");
function Vu(e, t) {
	let n = Uu(t);
	Pu(e) ? Hu(null, e.contents, n, Object.freeze([e])) === Bu && (e.contents = null) : Hu(null, e, n, Object.freeze([]));
}
Vu.BREAK = Ru, Vu.SKIP = zu, Vu.REMOVE = Bu;
function Hu(e, t, n, r) {
	let i = Wu(e, t, n, r);
	if (H(i) || z(i)) return Gu(e, r, i), Hu(e, i, n, r);
	if (typeof i != "symbol") {
		if (V(t)) {
			r = Object.freeze(r.concat(t));
			for (let e = 0; e < t.items.length; ++e) {
				let i = Hu(e, t.items[e], n, r);
				if (typeof i == "number") e = i - 1;
				else if (i === Ru) return Ru;
				else i === Bu && (t.items.splice(e, 1), --e);
			}
		} else if (z(t)) {
			r = Object.freeze(r.concat(t));
			let e = Hu("key", t.key, n, r);
			if (e === Ru) return Ru;
			e === Bu && (t.key = null);
			let i = Hu("value", t.value, n, r);
			if (i === Ru) return Ru;
			i === Bu && (t.value = null);
		}
	}
	return i;
}
function Uu(e) {
	return typeof e == "object" && (e.Collection || e.Node || e.Value) ? Object.assign({
		Alias: e.Node,
		Map: e.Node,
		Scalar: e.Node,
		Seq: e.Node
	}, e.Value && {
		Map: e.Value,
		Scalar: e.Value,
		Seq: e.Value
	}, e.Collection && {
		Map: e.Collection,
		Seq: e.Collection
	}, e) : e;
}
function Wu(e, t, n, r) {
	if (typeof n == "function") return n(e, t, r);
	if (Fu(t)) return n.Map?.(e, t, r);
	if (Iu(t)) return n.Seq?.(e, t, r);
	if (z(t)) return n.Pair?.(e, t, r);
	if (B(t)) return n.Scalar?.(e, t, r);
	if (Nu(t)) return n.Alias?.(e, t, r);
}
function Gu(e, t, n) {
	let r = t[t.length - 1];
	if (V(r)) r.items[e] = n;
	else if (z(r)) e === "key" ? r.key = n : r.value = n;
	else if (Pu(r)) r.contents = n;
	else {
		let e = Nu(r) ? "alias" : "scalar";
		throw Error(`Cannot replace node with ${e} parent`);
	}
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/doc/directives.js
var Ku = {
	"!": "%21",
	",": "%2C",
	"[": "%5B",
	"]": "%5D",
	"{": "%7B",
	"}": "%7D"
}, qu = (e) => e.replace(/[!,[\]{}]/g, (e) => Ku[e]), Ju = class e {
	constructor(t, n) {
		this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, e.defaultYaml, t), this.tags = Object.assign({}, e.defaultTags, n);
	}
	clone() {
		let t = new e(this.yaml, this.tags);
		return t.docStart = this.docStart, t;
	}
	atDocument() {
		let t = new e(this.yaml, this.tags);
		switch (this.yaml.version) {
			case "1.1":
				this.atNextDocument = !0;
				break;
			case "1.2": this.atNextDocument = !1, this.yaml = {
				explicit: e.defaultYaml.explicit,
				version: "1.2"
			}, this.tags = Object.assign({}, e.defaultTags);
		}
		return t;
	}
	add(t, n) {
		this.atNextDocument &&= (this.yaml = {
			explicit: e.defaultYaml.explicit,
			version: "1.1"
		}, this.tags = Object.assign({}, e.defaultTags), !1);
		let r = t.trim().split(/[ \t]+/), i = r.shift();
		switch (i) {
			case "%TAG": {
				if (r.length !== 2 && (n(0, "%TAG directive should contain exactly two parts"), r.length < 2)) return !1;
				let [e, t] = r;
				return this.tags[e] = t, !0;
			}
			case "%YAML": {
				if (this.yaml.explicit = !0, r.length !== 1) return n(0, "%YAML directive should contain exactly one part"), !1;
				let [e] = r;
				if (e === "1.1" || e === "1.2") return this.yaml.version = e, !0;
				{
					let t = /^\d+\.\d+$/.test(e);
					return n(6, `Unsupported YAML version ${e}`, t), !1;
				}
			}
			default: return n(0, `Unknown directive ${i}`, !0), !1;
		}
	}
	tagName(e, t) {
		if (e === "!") return "!";
		if (e[0] !== "!") return t(`Not a valid tag: ${e}`), null;
		if (e[1] === "<") {
			let n = e.slice(2, -1);
			return n === "!" || n === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), n);
		}
		let [, n, r] = e.match(/^(.*!)([^!]*)$/s);
		r || t(`The ${e} tag has no suffix`);
		let i = this.tags[n];
		if (i) try {
			return i + decodeURIComponent(r);
		} catch (e) {
			return t(String(e)), null;
		}
		return n === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
	}
	tagString(e) {
		for (let [t, n] of Object.entries(this.tags)) if (e.startsWith(n)) return t + qu(e.substring(n.length));
		return e[0] === "!" ? e : `!<${e}>`;
	}
	toString(e) {
		let t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags), r;
		if (e && n.length > 0 && H(e.contents)) {
			let t = {};
			Vu(e.contents, (e, n) => {
				H(n) && n.tag && (t[n.tag] = !0);
			}), r = Object.keys(t);
		} else r = [];
		for (let [i, a] of n) i === "!!" && a === "tag:yaml.org,2002:" || e && !r.some((e) => e.startsWith(a)) || t.push(`%TAG ${i} ${a}`);
		return t.join("\n");
	}
};
Ju.defaultYaml = {
	explicit: !1,
	version: "1.2"
}, Ju.defaultTags = { "!!": "tag:yaml.org,2002:" };
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/doc/anchors.js
function Yu(e) {
	if (/[\x00-\x19\s,[\]{}]/.test(e)) {
		let t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(e)}`;
		throw Error(t);
	}
	return !0;
}
function Xu(e) {
	let t = /* @__PURE__ */ new Set();
	return Vu(e, { Value(e, n) {
		n.anchor && t.add(n.anchor);
	} }), t;
}
function Zu(e, t) {
	for (let n = 1;; ++n) {
		let r = `${e}${n}`;
		if (!t.has(r)) return r;
	}
}
function Qu(e, t) {
	let n = [], r = /* @__PURE__ */ new Map(), i = null;
	return {
		onAnchor: (r) => {
			n.push(r), i ??= Xu(e);
			let a = Zu(t, i);
			return i.add(a), a;
		},
		setAnchors: () => {
			for (let e of n) {
				let t = r.get(e);
				if (typeof t == "object" && t.anchor && (B(t.node) || V(t.node))) t.node.anchor = t.anchor;
				else {
					let t = /* @__PURE__ */ Error("Failed to resolve repeated object (this should not happen)");
					throw t.source = e, t;
				}
			}
		},
		sourceObjects: r
	};
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/doc/applyReviver.js
function $u(e, t, n, r) {
	if (r && typeof r == "object") {
		if (Array.isArray(r)) for (let t = 0, n = r.length; t < n; ++t) {
			let n = r[t], i = $u(e, r, String(t), n);
			i === void 0 ? delete r[t] : i !== n && (r[t] = i);
		}
		else if (r instanceof Map) for (let t of Array.from(r.keys())) {
			let n = r.get(t), i = $u(e, r, t, n);
			i === void 0 ? r.delete(t) : i !== n && r.set(t, i);
		}
		else if (r instanceof Set) for (let t of Array.from(r)) {
			let n = $u(e, r, t, t);
			n === void 0 ? r.delete(t) : n !== t && (r.delete(t), r.add(n));
		}
		else for (let [t, n] of Object.entries(r)) {
			let i = $u(e, r, t, n);
			i === void 0 ? delete r[t] : i !== n && (r[t] = i);
		}
	}
	return e.call(t, n, r);
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/toJS.js
function U(e, t, n) {
	if (Array.isArray(e)) return e.map((e, t) => U(e, String(t), n));
	if (e && typeof e.toJSON == "function") {
		if (!n || !Lu(e)) return e.toJSON(t, n);
		let r = {
			aliasCount: 0,
			count: 1,
			res: void 0
		};
		n.anchors.set(e, r), n.onCreate = (e) => {
			r.res = e, delete n.onCreate;
		};
		let i = e.toJSON(t, n);
		return n.onCreate && n.onCreate(i), i;
	}
	return typeof e == "bigint" && !n?.keep ? Number(e) : e;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/Node.js
var ed = class {
	constructor(e) {
		Object.defineProperty(this, R, { value: e });
	}
	clone() {
		let e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
		return this.range && (e.range = this.range.slice()), e;
	}
	toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: r, reviver: i } = {}) {
		if (!Pu(e)) throw TypeError("A document argument is required");
		let a = {
			anchors: /* @__PURE__ */ new Map(),
			doc: e,
			keep: !0,
			mapAsMap: t === !0,
			mapKeyWarned: !1,
			maxAliasCount: typeof n == "number" ? n : 100
		}, o = U(this, "", a);
		if (typeof r == "function") for (let { count: e, res: t } of a.anchors.values()) r(t, e);
		return typeof i == "function" ? $u(i, { "": o }, "", o) : o;
	}
}, td = class extends ed {
	constructor(e) {
		super(Du), this.source = e, Object.defineProperty(this, "tag", { set() {
			throw Error("Alias nodes cannot have tags");
		} });
	}
	resolve(e, t) {
		if (t?.maxAliasCount === 0) throw ReferenceError("Alias resolution is disabled");
		let n;
		t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], Vu(e, { Node: (e, t) => {
			(Nu(t) || Lu(t)) && n.push(t);
		} }), t && (t.aliasResolveCache = n));
		let r;
		for (let e of n) {
			if (e === this) break;
			e.anchor === this.source && (r = e);
		}
		if (r && t) {
			let { anchors: e, doc: n, maxAliasCount: i } = t, a = e.get(r);
			/* istanbul ignore if */
			if (a ||= (U(r, null, t), e.get(r)), a?.res === void 0) throw ReferenceError("This should not happen: Alias anchor was not resolved?");
			if (i >= 0 && (a.count += 1, a.aliasCount === 0 && (a.aliasCount = nd(n, r, e)), a.count * a.aliasCount > i)) throw ReferenceError("Excessive alias count indicates a resource exhaustion attack");
		}
		return r;
	}
	toJSON(e, t) {
		if (!t) return { source: this.source };
		let n = this.resolve(t.doc, t);
		if (!n) {
			let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
			throw ReferenceError(e);
		}
		return t.anchors.get(n).res;
	}
	toString(e, t, n) {
		let r = `*${this.source}`;
		if (e) {
			if (Yu(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
				let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
				throw Error(e);
			}
			if (e.implicitKey) return `${r} `;
		}
		return r;
	}
};
function nd(e, t, n) {
	if (Nu(t)) {
		let r = t.resolve(e), i = n && r && n.get(r);
		return i ? i.count * i.aliasCount : 0;
	}
	if (V(t)) {
		let r = 0;
		for (let i of t.items) {
			let t = nd(e, i, n);
			t > r && (r = t);
		}
		return r;
	}
	if (z(t)) {
		let r = nd(e, t.key, n), i = nd(e, t.value, n);
		return Math.max(r, i);
	}
	return 1;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/Scalar.js
var rd = (e) => !e || typeof e != "function" && typeof e != "object", W = class extends ed {
	constructor(e) {
		super(ju), this.value = e;
	}
	toJSON(e, t) {
		return t?.keep ? this.value : U(this.value, e, t);
	}
	toString() {
		return String(this.value);
	}
};
W.BLOCK_FOLDED = "BLOCK_FOLDED", W.BLOCK_LITERAL = "BLOCK_LITERAL", W.PLAIN = "PLAIN", W.QUOTE_DOUBLE = "QUOTE_DOUBLE", W.QUOTE_SINGLE = "QUOTE_SINGLE";
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/doc/createNode.js
var id = "tag:yaml.org,2002:";
function ad(e, t, n) {
	if (t) {
		let e = n.filter((e) => e.tag === t), r = e.find((e) => !e.format) ?? e[0];
		if (!r) throw Error(`Tag ${t} not found`);
		return r;
	}
	return n.find((t) => t.identify?.(e) && !t.format);
}
function od(e, t, n) {
	if (Pu(e) && (e = e.contents), H(e)) return e;
	if (z(e)) {
		let t = n.schema[ku].createNode?.(n.schema, null, n);
		return t.items.push(e), t;
	}
	(e instanceof String || e instanceof Number || e instanceof Boolean || typeof BigInt < "u" && e instanceof BigInt) && (e = e.valueOf());
	let { aliasDuplicateObjects: r, onAnchor: i, onTagObj: a, schema: o, sourceObjects: s } = n, c;
	if (r && e && typeof e == "object") {
		if (c = s.get(e), c) return c.anchor ?? (c.anchor = i(e)), new td(c.anchor);
		c = {
			anchor: null,
			node: null
		}, s.set(e, c);
	}
	t?.startsWith("!!") && (t = id + t.slice(2));
	let l = ad(e, t, o.tags);
	if (!l) {
		if (e && typeof e.toJSON == "function" && (e = e.toJSON()), !e || typeof e != "object") {
			let t = new W(e);
			return c && (c.node = t), t;
		}
		l = e instanceof Map ? o[ku] : Symbol.iterator in Object(e) ? o[Mu] : o[ku];
	}
	a && (a(l), delete n.onTagObj);
	let u = l?.createNode ? l.createNode(n.schema, e, n) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(n.schema, e, n) : new W(e);
	return t ? u.tag = t : l.default || (u.tag = l.tag), c && (c.node = u), u;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/Collection.js
function sd(e, t, n) {
	let r = n;
	for (let e = t.length - 1; e >= 0; --e) {
		let n = t[e];
		if (typeof n == "number" && Number.isInteger(n) && n >= 0) {
			let e = [];
			e[n] = r, r = e;
		} else r = /* @__PURE__ */ new Map([[n, r]]);
	}
	return od(r, void 0, {
		aliasDuplicateObjects: !1,
		keepUndefined: !1,
		onAnchor: () => {
			throw Error("This should not happen, please report a bug.");
		},
		schema: e,
		sourceObjects: /* @__PURE__ */ new Map()
	});
}
var cd = (e) => e == null || typeof e == "object" && !!e[Symbol.iterator]().next().done, ld = class extends ed {
	constructor(e, t) {
		super(e), Object.defineProperty(this, "schema", {
			value: t,
			configurable: !0,
			enumerable: !1,
			writable: !0
		});
	}
	clone(e) {
		let t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
		return e && (t.schema = e), t.items = t.items.map((t) => H(t) || z(t) ? t.clone(e) : t), this.range && (t.range = this.range.slice()), t;
	}
	addIn(e, t) {
		if (cd(e)) this.add(t);
		else {
			let [n, ...r] = e, i = this.get(n, !0);
			if (V(i)) i.addIn(r, t);
			else if (i === void 0 && this.schema) this.set(n, sd(this.schema, r, t));
			else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`);
		}
	}
	deleteIn(e) {
		let [t, ...n] = e;
		if (n.length === 0) return this.delete(t);
		let r = this.get(t, !0);
		if (V(r)) return r.deleteIn(n);
		throw Error(`Expected YAML collection at ${t}. Remaining path: ${n}`);
	}
	getIn(e, t) {
		let [n, ...r] = e, i = this.get(n, !0);
		return r.length === 0 ? !t && B(i) ? i.value : i : V(i) ? i.getIn(r, t) : void 0;
	}
	hasAllNullValues(e) {
		return this.items.every((t) => {
			if (!z(t)) return !1;
			let n = t.value;
			return n == null || e && B(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
		});
	}
	hasIn(e) {
		let [t, ...n] = e;
		if (n.length === 0) return this.has(t);
		let r = this.get(t, !0);
		return V(r) ? r.hasIn(n) : !1;
	}
	setIn(e, t) {
		let [n, ...r] = e;
		if (r.length === 0) this.set(n, t);
		else {
			let e = this.get(n, !0);
			if (V(e)) e.setIn(r, t);
			else if (e === void 0 && this.schema) this.set(n, sd(this.schema, r, t));
			else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`);
		}
	}
}, ud = (e) => e.replace(/^(?!$)(?: $)?/gm, "#");
function dd(e, t) {
	return /^\n+$/.test(e) ? e.substring(1) : t ? e.replace(/^(?! *$)/gm, t) : e;
}
var fd = (e, t, n) => e.endsWith("\n") ? dd(n, t) : n.includes("\n") ? "\n" + dd(n, t) : (e.endsWith(" ") ? "" : " ") + n, pd = "flow", md = "block", hd = "quoted";
function gd(e, t, n = "flow", { indentAtStart: r, lineWidth: i = 80, minContentWidth: a = 20, onFold: o, onOverflow: s } = {}) {
	if (!i || i < 0) return e;
	i < a && (a = 0);
	let c = Math.max(1 + a, 1 + i - t.length);
	if (e.length <= c) return e;
	let l = [], u = {}, d = i - t.length;
	typeof r == "number" && (r > i - Math.max(2, a) ? l.push(0) : d = i - r);
	let f, p, m = !1, h = -1, g = -1, _ = -1;
	n === "block" && (h = _d(e, h, t.length), h !== -1 && (d = h + c));
	for (let r; r = e[h += 1];) {
		if (n === "quoted" && r === "\\") {
			switch (g = h, e[h + 1]) {
				case "x":
					h += 3;
					break;
				case "u":
					h += 5;
					break;
				case "U":
					h += 9;
					break;
				default: h += 1;
			}
			_ = h;
		}
		if (r === "\n") n === "block" && (h = _d(e, h, t.length)), d = h + t.length + c, f = void 0;
		else {
			if (r === " " && p && p !== " " && p !== "\n" && p !== "	") {
				let t = e[h + 1];
				t && t !== " " && t !== "\n" && t !== "	" && (f = h);
			}
			if (h >= d) {
				if (f) l.push(f), d = f + c, f = void 0;
				else if (n === "quoted") {
					for (; p === " " || p === "	";) p = r, r = e[h += 1], m = !0;
					let t = h > _ + 1 ? h - 2 : g - 1;
					if (u[t]) return e;
					l.push(t), u[t] = !0, d = t + c, f = void 0;
				} else m = !0;
			}
		}
		p = r;
	}
	if (m && s && s(), l.length === 0) return e;
	o && o();
	let v = e.slice(0, l[0]);
	for (let r = 0; r < l.length; ++r) {
		let i = l[r], a = l[r + 1] || e.length;
		i === 0 ? v = `\n${t}${e.slice(0, a)}` : (n === "quoted" && u[i] && (v += `${e[i]}\\`), v += `\n${t}${e.slice(i + 1, a)}`);
	}
	return v;
}
function _d(e, t, n) {
	let r = t, i = t + 1, a = e[i];
	for (; a === " " || a === "	";) if (t < i + n) a = e[++t];
	else {
		do
			a = e[++t];
		while (a && a !== "\n");
		r = t, i = t + 1, a = e[i];
	}
	return r;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringifyString.js
var vd = (e, t) => ({
	indentAtStart: t ? e.indent.length : e.indentAtStart,
	lineWidth: e.options.lineWidth,
	minContentWidth: e.options.minContentWidth
}), yd = (e) => /^(%|---|\.\.\.)/m.test(e);
function bd(e, t, n) {
	if (!t || t < 0) return !1;
	let r = t - n, i = e.length;
	if (i <= r) return !1;
	for (let t = 0, n = 0; t < i; ++t) if (e[t] === "\n") {
		if (t - n > r) return !0;
		if (n = t + 1, i - n <= r) return !1;
	}
	return !0;
}
function xd(e, t) {
	let n = JSON.stringify(e);
	if (t.options.doubleQuotedAsJSON) return n;
	let { implicitKey: r } = t, i = t.options.doubleQuotedMinMultiLineLength, a = t.indent || (yd(e) ? "  " : ""), o = "", s = 0;
	for (let e = 0, t = n[e]; t; t = n[++e]) if (t === " " && n[e + 1] === "\\" && n[e + 2] === "n" && (o += n.slice(s, e) + "\\ ", e += 1, s = e, t = "\\"), t === "\\") switch (n[e + 1]) {
		case "u":
			{
				o += n.slice(s, e);
				let t = n.substr(e + 2, 4);
				switch (t) {
					case "0000":
						o += "\\0";
						break;
					case "0007":
						o += "\\a";
						break;
					case "000b":
						o += "\\v";
						break;
					case "001b":
						o += "\\e";
						break;
					case "0085":
						o += "\\N";
						break;
					case "00a0":
						o += "\\_";
						break;
					case "2028":
						o += "\\L";
						break;
					case "2029":
						o += "\\P";
						break;
					default: t.substr(0, 2) === "00" ? o += "\\x" + t.substr(2) : o += n.substr(e, 6);
				}
				e += 5, s = e + 1;
			}
			break;
		case "n":
			if (r || n[e + 2] === "\"" || n.length < i) e += 1;
			else {
				for (o += n.slice(s, e) + "\n\n"; n[e + 2] === "\\" && n[e + 3] === "n" && n[e + 4] !== "\"";) o += "\n", e += 2;
				o += a, n[e + 2] === " " && (o += "\\"), e += 1, s = e + 1;
			}
			break;
		default: e += 1;
	}
	return o = s ? o + n.slice(s) : n, r ? o : gd(o, a, hd, vd(t, !1));
}
function Sd(e, t) {
	if (t.options.singleQuote === !1 || t.implicitKey && e.includes("\n") || /[ \t]\n|\n[ \t]/.test(e)) return xd(e, t);
	let n = t.indent || (yd(e) ? "  " : ""), r = "'" + e.replace(/'/g, "''").replace(/\n+/g, `$&\n${n}`) + "'";
	return t.implicitKey ? r : gd(r, n, pd, vd(t, !1));
}
function Cd(e, t) {
	let { singleQuote: n } = t.options, r;
	if (n === !1) r = xd;
	else {
		let t = e.includes("\""), i = e.includes("'");
		r = t && !i ? Sd : i && !t ? xd : n ? Sd : xd;
	}
	return r(e, t);
}
var wd;
try {
	wd = /* @__PURE__ */ RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
	wd = /\n+(?!\n|$)/g;
}
function Td({ comment: e, type: t, value: n }, r, i, a) {
	let { blockQuote: o, commentString: s, lineWidth: c } = r.options;
	if (!o || /\n[\t ]+$/.test(n)) return Cd(n, r);
	let l = r.indent || (r.forceBlockIndent || yd(n) ? "  " : ""), u = o === "literal" ? !0 : o === "folded" || t === W.BLOCK_FOLDED ? !1 : t === W.BLOCK_LITERAL || !bd(n, c, l.length);
	if (!n) return u ? "|\n" : ">\n";
	let d, f;
	for (f = n.length; f > 0; --f) {
		let e = n[f - 1];
		if (e !== "\n" && e !== "	" && e !== " ") break;
	}
	let p = n.substring(f), m = p.indexOf("\n");
	m === -1 ? d = "-" : n === p || m !== p.length - 1 ? (d = "+", a && a()) : d = "", p &&= (n = n.slice(0, -p.length), p[p.length - 1] === "\n" && (p = p.slice(0, -1)), p.replace(wd, `$&${l}`));
	let h = !1, g, _ = -1;
	for (g = 0; g < n.length; ++g) {
		let e = n[g];
		if (e === " ") h = !0;
		else if (e === "\n") _ = g;
		else break;
	}
	let v = n.substring(0, _ < g ? _ + 1 : g);
	v &&= (n = n.substring(v.length), v.replace(/\n+/g, `$&${l}`));
	let y = (h ? l ? "2" : "1" : "") + d;
	if (e && (y += " " + s(e.replace(/ ?[\r\n]+/g, " ")), i && i()), !u) {
		let e = n.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`), i = !1, a = vd(r, !0);
		o !== "folded" && t !== W.BLOCK_FOLDED && (a.onOverflow = () => {
			i = !0;
		});
		let s = gd(`${v}${e}${p}`, l, md, a);
		if (!i) return `>${y}\n${l}${s}`;
	}
	return n = n.replace(/\n+/g, `$&${l}`), `|${y}\n${l}${v}${n}${p}`;
}
function Ed(e, t, n, r) {
	let { type: i, value: a } = e, { actualString: o, implicitKey: s, indent: c, indentStep: l, inFlow: u } = t;
	if (s && a.includes("\n") || u && /[[\]{},]/.test(a)) return Cd(a, t);
	if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a)) return s || u || !a.includes("\n") ? Cd(a, t) : Td(e, t, n, r);
	if (!s && !u && i !== W.PLAIN && a.includes("\n")) return Td(e, t, n, r);
	if (yd(a)) {
		if (c === "") return t.forceBlockIndent = !0, Td(e, t, n, r);
		if (s && c === l) return Cd(a, t);
	}
	let d = a.replace(/\n+/g, `$&\n${c}`);
	if (o) {
		let e = (e) => e.default && e.tag !== "tag:yaml.org,2002:str" && e.test?.test(d), { compat: n, tags: r } = t.doc.schema;
		if (r.some(e) || n?.some(e)) return Cd(a, t);
	}
	return s ? d : gd(d, c, pd, vd(t, !1));
}
function Dd(e, t, n, r) {
	let { implicitKey: i, inFlow: a } = t, o = typeof e.value == "string" ? e : Object.assign({}, e, { value: String(e.value) }), { type: s } = e;
	s !== W.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (s = W.QUOTE_DOUBLE);
	let c = (e) => {
		switch (e) {
			case W.BLOCK_FOLDED:
			case W.BLOCK_LITERAL: return i || a ? Cd(o.value, t) : Td(o, t, n, r);
			case W.QUOTE_DOUBLE: return xd(o.value, t);
			case W.QUOTE_SINGLE: return Sd(o.value, t);
			case W.PLAIN: return Ed(o, t, n, r);
			default: return null;
		}
	}, l = c(s);
	if (l === null) {
		let { defaultKeyType: e, defaultStringType: n } = t.options, r = i && e || n;
		if (l = c(r), l === null) throw Error(`Unsupported default string type ${r}`);
	}
	return l;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringify.js
function Od(e, t) {
	let n = Object.assign({
		blockQuote: !0,
		commentString: ud,
		defaultKeyType: null,
		defaultStringType: "PLAIN",
		directives: null,
		doubleQuotedAsJSON: !1,
		doubleQuotedMinMultiLineLength: 40,
		falseStr: "false",
		flowCollectionPadding: !0,
		indentSeq: !0,
		lineWidth: 80,
		minContentWidth: 20,
		nullStr: "null",
		simpleKeys: !1,
		singleQuote: null,
		trailingComma: !1,
		trueStr: "true",
		verifyAliasOrder: !0
	}, e.schema.toStringOptions, t), r;
	switch (n.collectionStyle) {
		case "block":
			r = !1;
			break;
		case "flow":
			r = !0;
			break;
		default: r = null;
	}
	return {
		anchors: /* @__PURE__ */ new Set(),
		doc: e,
		flowCollectionPadding: n.flowCollectionPadding ? " " : "",
		indent: "",
		indentStep: typeof n.indent == "number" ? " ".repeat(n.indent) : "  ",
		inFlow: r,
		options: n
	};
}
function kd(e, t) {
	if (t.tag) {
		let n = e.filter((e) => e.tag === t.tag);
		if (n.length > 0) return n.find((e) => e.format === t.format) ?? n[0];
	}
	let n, r;
	if (B(t)) {
		r = t.value;
		let i = e.filter((e) => e.identify?.(r));
		if (i.length > 1) {
			let e = i.filter((e) => e.test);
			e.length > 0 && (i = e);
		}
		n = i.find((e) => e.format === t.format) ?? i.find((e) => !e.format);
	} else r = t, n = e.find((e) => e.nodeClass && r instanceof e.nodeClass);
	if (!n) {
		let e = r?.constructor?.name ?? (r === null ? "null" : typeof r);
		throw Error(`Tag not resolved for ${e} value`);
	}
	return n;
}
function Ad(e, t, { anchors: n, doc: r }) {
	if (!r.directives) return "";
	let i = [], a = (B(e) || V(e)) && e.anchor;
	a && Yu(a) && (n.add(a), i.push(`&${a}`));
	let o = e.tag ?? (t.default ? null : t.tag);
	return o && i.push(r.directives.tagString(o)), i.join(" ");
}
function jd(e, t, n, r) {
	if (z(e)) return e.toString(t, n, r);
	if (Nu(e)) {
		if (t.doc.directives) return e.toString(t);
		if (t.resolvedAliases?.has(e)) throw TypeError("Cannot stringify circular structure without alias nodes");
		t.resolvedAliases ? t.resolvedAliases.add(e) : t.resolvedAliases = /* @__PURE__ */ new Set([e]), e = e.resolve(t.doc);
	}
	let i, a = H(e) ? e : t.doc.createNode(e, { onTagObj: (e) => i = e });
	i ??= kd(t.doc.schema.tags, a);
	let o = Ad(a, i, t);
	o.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + o.length + 1);
	let s = typeof i.stringify == "function" ? i.stringify(a, t, n, r) : B(a) ? Dd(a, t, n, r) : a.toString(t, n, r);
	return o ? B(a) || s[0] === "{" || s[0] === "[" ? `${o} ${s}` : `${o}\n${t.indent}${s}` : s;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringifyPair.js
function Md({ key: e, value: t }, n, r, i) {
	let { allNullValues: a, doc: o, indent: s, indentStep: c, options: { commentString: l, indentSeq: u, simpleKeys: d } } = n, f = H(e) && e.comment || null;
	if (d) {
		if (f) throw Error("With simple keys, key nodes cannot have comments");
		if (V(e) || !H(e) && typeof e == "object") throw Error("With simple keys, collection cannot be used as a key value");
	}
	let p = !d && (!e || f && t == null && !n.inFlow || V(e) || (B(e) ? e.type === W.BLOCK_FOLDED || e.type === W.BLOCK_LITERAL : typeof e == "object"));
	n = Object.assign({}, n, {
		allNullValues: !1,
		implicitKey: !p && (d || !a),
		indent: s + c
	});
	let m = !1, h = !1, g = jd(e, n, () => m = !0, () => h = !0);
	if (!p && !n.inFlow && g.length > 1024) {
		if (d) throw Error("With simple keys, single line scalar must not span more than 1024 characters");
		p = !0;
	}
	if (n.inFlow) {
		if (a || t == null) return m && r && r(), g === "" ? "?" : p ? `? ${g}` : g;
	} else if (a && !d || t == null && p) return g = `? ${g}`, f && !m ? g += fd(g, n.indent, l(f)) : h && i && i(), g;
	m && (f = null), p ? (f && (g += fd(g, n.indent, l(f))), g = `? ${g}\n${s}:`) : (g = `${g}:`, f && (g += fd(g, n.indent, l(f))));
	let _, v, y;
	H(t) ? (_ = !!t.spaceBefore, v = t.commentBefore, y = t.comment) : (_ = !1, v = null, y = null, t && typeof t == "object" && (t = o.createNode(t))), n.implicitKey = !1, !p && !f && B(t) && (n.indentAtStart = g.length + 1), h = !1, !u && c.length >= 2 && !n.inFlow && !p && Iu(t) && !t.flow && !t.tag && !t.anchor && (n.indent = n.indent.substring(2));
	let b = !1, x = jd(t, n, () => b = !0, () => h = !0), S = " ";
	if (f || _ || v) {
		if (S = _ ? "\n" : "", v) {
			let e = l(v);
			S += `\n${dd(e, n.indent)}`;
		}
		x === "" && !n.inFlow ? S === "\n" && y && (S = "\n\n") : S += `\n${n.indent}`;
	} else if (!p && V(t)) {
		let e = x[0], r = x.indexOf("\n"), i = r !== -1, a = n.inFlow ?? t.flow ?? t.items.length === 0;
		if (i || !a) {
			let t = !1;
			if (i && (e === "&" || e === "!")) {
				let n = x.indexOf(" ");
				e === "&" && n !== -1 && n < r && x[n + 1] === "!" && (n = x.indexOf(" ", n + 1)), (n === -1 || r < n) && (t = !0);
			}
			t || (S = `\n${n.indent}`);
		}
	} else (x === "" || x[0] === "\n") && (S = "");
	return g += S + x, n.inFlow ? b && r && r() : y && !b ? g += fd(g, n.indent, l(y)) : h && i && i(), g;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/log.js
function Nd(e, t) {
	(e === "debug" || e === "warn") && console.warn(t);
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var Pd = "<<", Fd = {
	identify: (e) => e === Pd || typeof e == "symbol" && e.description === Pd,
	default: "key",
	tag: "tag:yaml.org,2002:merge",
	test: /^<<$/,
	resolve: () => Object.assign(new W(Symbol(Pd)), { addToJSMap: Ld }),
	stringify: () => Pd
}, Id = (e, t) => (Fd.identify(t) || B(t) && (!t.type || t.type === W.PLAIN) && Fd.identify(t.value)) && e?.doc.schema.tags.some((e) => e.tag === Fd.tag && e.default);
function Ld(e, t, n) {
	let r = zd(e, n);
	if (Iu(r)) for (let n of r.items) Rd(e, t, n);
	else if (Array.isArray(r)) for (let n of r) Rd(e, t, n);
	else Rd(e, t, r);
}
function Rd(e, t, n) {
	let r = zd(e, n);
	if (!Fu(r)) throw Error("Merge sources must be maps or map aliases");
	let i = r.toJSON(null, e, Map);
	for (let [e, n] of i) t instanceof Map ? t.has(e) || t.set(e, n) : t instanceof Set ? t.add(e) : Object.prototype.hasOwnProperty.call(t, e) || Object.defineProperty(t, e, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
	return t;
}
function zd(e, t) {
	return e && Nu(t) ? t.resolve(e.doc, e) : t;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function Bd(e, t, { key: n, value: r }) {
	if (H(n) && n.addToJSMap) n.addToJSMap(e, t, r);
	else if (Id(e, n)) Ld(e, t, r);
	else {
		let i = U(n, "", e);
		if (t instanceof Map) t.set(i, U(r, i, e));
		else if (t instanceof Set) t.add(i);
		else {
			let a = Vd(n, i, e), o = U(r, a, e);
			a in t ? Object.defineProperty(t, a, {
				value: o,
				writable: !0,
				enumerable: !0,
				configurable: !0
			}) : t[a] = o;
		}
	}
	return t;
}
function Vd(e, t, n) {
	if (t === null) return "";
	if (typeof t != "object") return String(t);
	if (H(e) && n?.doc) {
		let t = Od(n.doc, {});
		t.anchors = /* @__PURE__ */ new Set();
		for (let e of n.anchors.keys()) t.anchors.add(e.anchor);
		t.inFlow = !0, t.inStringifyKey = !0;
		let r = e.toString(t);
		if (!n.mapKeyWarned) {
			let e = JSON.stringify(r);
			e.length > 40 && (e = e.substring(0, 36) + "...\""), Nd(n.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${e}. Set mapAsMap: true to use object keys.`), n.mapKeyWarned = !0;
		}
		return r;
	}
	return JSON.stringify(t);
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/Pair.js
function Hd(e, t, n) {
	return new G(od(e, void 0, n), od(t, void 0, n));
}
var G = class e {
	constructor(e, t = null) {
		Object.defineProperty(this, R, { value: Au }), this.key = e, this.value = t;
	}
	clone(t) {
		let { key: n, value: r } = this;
		return H(n) && (n = n.clone(t)), H(r) && (r = r.clone(t)), new e(n, r);
	}
	toJSON(e, t) {
		return Bd(t, t?.mapAsMap ? /* @__PURE__ */ new Map() : {}, this);
	}
	toString(e, t, n) {
		return e?.doc ? Md(this, e, t, n) : JSON.stringify(this);
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function Ud(e, t, n) {
	return (t.inFlow ?? e.flow ? Gd : Wd)(e, t, n);
}
function Wd({ comment: e, items: t }, n, { blockItemPrefix: r, flowChars: i, itemIndent: a, onChompKeep: o, onComment: s }) {
	let { indent: c, options: { commentString: l } } = n, u = Object.assign({}, n, {
		indent: a,
		type: null
	}), d = !1, f = [];
	for (let e = 0; e < t.length; ++e) {
		let i = t[e], o = null;
		if (H(i)) !d && i.spaceBefore && f.push(""), Kd(n, f, i.commentBefore, d), i.comment && (o = i.comment);
		else if (z(i)) {
			let e = H(i.key) ? i.key : null;
			e && (!d && e.spaceBefore && f.push(""), Kd(n, f, e.commentBefore, d));
		}
		d = !1;
		let s = jd(i, u, () => o = null, () => d = !0);
		o && (s += fd(s, a, l(o))), d && o && (d = !1), f.push(r + s);
	}
	let p;
	if (f.length === 0) p = i.start + i.end;
	else {
		p = f[0];
		for (let e = 1; e < f.length; ++e) {
			let t = f[e];
			p += t ? `\n${c}${t}` : "\n";
		}
	}
	return e ? (p += "\n" + dd(l(e), c), s && s()) : d && o && o(), p;
}
function Gd({ items: e }, t, { flowChars: n, itemIndent: r }) {
	let { indent: i, indentStep: a, flowCollectionPadding: o, options: { commentString: s } } = t;
	r += a;
	let c = Object.assign({}, t, {
		indent: r,
		inFlow: !0,
		type: null
	}), l = !1, u = 0, d = [];
	for (let n = 0; n < e.length; ++n) {
		let i = e[n], a = null;
		if (H(i)) i.spaceBefore && d.push(""), Kd(t, d, i.commentBefore, !1), i.comment && (a = i.comment);
		else if (z(i)) {
			let e = H(i.key) ? i.key : null;
			e && (e.spaceBefore && d.push(""), Kd(t, d, e.commentBefore, !1), e.comment && (l = !0));
			let n = H(i.value) ? i.value : null;
			n ? (n.comment && (a = n.comment), n.commentBefore && (l = !0)) : i.value == null && e?.comment && (a = e.comment);
		}
		a && (l = !0);
		let o = jd(i, c, () => a = null);
		l ||= d.length > u || o.includes("\n"), n < e.length - 1 ? o += "," : t.options.trailingComma && (t.options.lineWidth > 0 && (l ||= d.reduce((e, t) => e + t.length + 2, 2) + (o.length + 2) > t.options.lineWidth), l && (o += ",")), a && (o += fd(o, r, s(a))), d.push(o), u = d.length;
	}
	let { start: f, end: p } = n;
	if (d.length === 0) return f + p;
	if (!l) {
		let e = d.reduce((e, t) => e + t.length + 2, 2);
		l = t.options.lineWidth > 0 && e > t.options.lineWidth;
	}
	if (l) {
		let e = f;
		for (let t of d) e += t ? `\n${a}${i}${t}` : "\n";
		return `${e}\n${i}${p}`;
	}
	return `${f}${o}${d.join(" ")}${o}${p}`;
}
function Kd({ indent: e, options: { commentString: t } }, n, r, i) {
	if (r && i && (r = r.replace(/^\n+/, "")), r) {
		let i = dd(t(r), e);
		n.push(i.trimStart());
	}
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/nodes/YAMLMap.js
function qd(e, t) {
	let n = B(t) ? t.value : t;
	for (let r of e) if (z(r) && (r.key === t || r.key === n || B(r.key) && r.key.value === n)) return r;
}
var K = class extends ld {
	static get tagName() {
		return "tag:yaml.org,2002:map";
	}
	constructor(e) {
		super(ku, e), this.items = [];
	}
	static from(e, t, n) {
		let { keepUndefined: r, replacer: i } = n, a = new this(e), o = (e, o) => {
			if (typeof i == "function") o = i.call(t, e, o);
			else if (Array.isArray(i) && !i.includes(e)) return;
			(o !== void 0 || r) && a.items.push(Hd(e, o, n));
		};
		if (t instanceof Map) for (let [e, n] of t) o(e, n);
		else if (t && typeof t == "object") for (let e of Object.keys(t)) o(e, t[e]);
		return typeof e.sortMapEntries == "function" && a.items.sort(e.sortMapEntries), a;
	}
	add(e, t) {
		let n;
		n = z(e) ? e : !e || typeof e != "object" || !("key" in e) ? new G(e, e?.value) : new G(e.key, e.value);
		let r = qd(this.items, n.key), i = this.schema?.sortMapEntries;
		if (r) {
			if (!t) throw Error(`Key ${n.key} already set`);
			B(r.value) && rd(n.value) ? r.value.value = n.value : r.value = n.value;
		} else if (i) {
			let e = this.items.findIndex((e) => i(n, e) < 0);
			e === -1 ? this.items.push(n) : this.items.splice(e, 0, n);
		} else this.items.push(n);
	}
	delete(e) {
		let t = qd(this.items, e);
		return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
	}
	get(e, t) {
		let n = qd(this.items, e)?.value;
		return (!t && B(n) ? n.value : n) ?? void 0;
	}
	has(e) {
		return !!qd(this.items, e);
	}
	set(e, t) {
		this.add(new G(e, t), !0);
	}
	toJSON(e, t, n) {
		let r = n ? new n() : t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
		t?.onCreate && t.onCreate(r);
		for (let e of this.items) Bd(t, r, e);
		return r;
	}
	toString(e, t, n) {
		if (!e) return JSON.stringify(this);
		for (let e of this.items) if (!z(e)) throw Error(`Map items must all be pairs; found ${JSON.stringify(e)} instead`);
		return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Ud(this, e, {
			blockItemPrefix: "",
			flowChars: {
				start: "{",
				end: "}"
			},
			itemIndent: e.indent || "",
			onChompKeep: n,
			onComment: t
		});
	}
}, Jd = {
	collection: "map",
	default: !0,
	nodeClass: K,
	tag: "tag:yaml.org,2002:map",
	resolve(e, t) {
		return Fu(e) || t("Expected a mapping for this tag"), e;
	},
	createNode: (e, t, n) => K.from(e, t, n)
}, Yd = class extends ld {
	static get tagName() {
		return "tag:yaml.org,2002:seq";
	}
	constructor(e) {
		super(Mu, e), this.items = [];
	}
	add(e) {
		this.items.push(e);
	}
	delete(e) {
		let t = Xd(e);
		return typeof t == "number" && this.items.splice(t, 1).length > 0;
	}
	get(e, t) {
		let n = Xd(e);
		if (typeof n != "number") return;
		let r = this.items[n];
		return !t && B(r) ? r.value : r;
	}
	has(e) {
		let t = Xd(e);
		return typeof t == "number" && t < this.items.length;
	}
	set(e, t) {
		let n = Xd(e);
		if (typeof n != "number") throw Error(`Expected a valid index, not ${e}.`);
		let r = this.items[n];
		B(r) && rd(t) ? r.value = t : this.items[n] = t;
	}
	toJSON(e, t) {
		let n = [];
		t?.onCreate && t.onCreate(n);
		let r = 0;
		for (let e of this.items) n.push(U(e, String(r++), t));
		return n;
	}
	toString(e, t, n) {
		return e ? Ud(this, e, {
			blockItemPrefix: "- ",
			flowChars: {
				start: "[",
				end: "]"
			},
			itemIndent: (e.indent || "") + "  ",
			onChompKeep: n,
			onComment: t
		}) : JSON.stringify(this);
	}
	static from(e, t, n) {
		let { replacer: r } = n, i = new this(e);
		if (t && Symbol.iterator in Object(t)) {
			let e = 0;
			for (let a of t) {
				if (typeof r == "function") {
					let n = t instanceof Set ? a : String(e++);
					a = r.call(t, n, a);
				}
				i.items.push(od(a, void 0, n));
			}
		}
		return i;
	}
};
function Xd(e) {
	let t = B(e) ? e.value : e;
	return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/common/seq.js
var Zd = {
	collection: "seq",
	default: !0,
	nodeClass: Yd,
	tag: "tag:yaml.org,2002:seq",
	resolve(e, t) {
		return Iu(e) || t("Expected a sequence for this tag"), e;
	},
	createNode: (e, t, n) => Yd.from(e, t, n)
}, Qd = {
	identify: (e) => typeof e == "string",
	default: !0,
	tag: "tag:yaml.org,2002:str",
	resolve: (e) => e,
	stringify(e, t, n, r) {
		return t = Object.assign({ actualString: !0 }, t), Dd(e, t, n, r);
	}
}, $d = {
	identify: (e) => e == null,
	createNode: () => new W(null),
	default: !0,
	tag: "tag:yaml.org,2002:null",
	test: /^(?:~|[Nn]ull|NULL)?$/,
	resolve: () => new W(null),
	stringify: ({ source: e }, t) => typeof e == "string" && $d.test.test(e) ? e : t.options.nullStr
}, ef = {
	identify: (e) => typeof e == "boolean",
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
	resolve: (e) => new W(e[0] === "t" || e[0] === "T"),
	stringify({ source: e, value: t }, n) {
		return e && ef.test.test(e) && t === (e[0] === "t" || e[0] === "T") ? e : t ? n.options.trueStr : n.options.falseStr;
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function q({ format: e, minFractionDigits: t, tag: n, value: r }) {
	if (typeof r == "bigint") return String(r);
	let i = typeof r == "number" ? r : Number(r);
	if (!isFinite(i)) return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
	let a = Object.is(r, -0) ? "-0" : JSON.stringify(r);
	if (!e && t && (!n || n === "tag:yaml.org,2002:float") && /^-?\d/.test(a) && !a.includes("e")) {
		let e = a.indexOf(".");
		e < 0 && (e = a.length, a += ".");
		let n = t - (a.length - e - 1);
		for (; n-- > 0;) a += "0";
	}
	return a;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/core/float.js
var tf = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
	resolve: (e) => e.slice(-3).toLowerCase() === "nan" ? NaN : e[0] === "-" ? -Infinity : Infinity,
	stringify: q
}, nf = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "EXP",
	test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
	resolve: (e) => parseFloat(e),
	stringify(e) {
		let t = Number(e.value);
		return isFinite(t) ? t.toExponential() : q(e);
	}
}, rf = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
	resolve(e) {
		let t = new W(parseFloat(e)), n = e.indexOf(".");
		return n !== -1 && e[e.length - 1] === "0" && (t.minFractionDigits = e.length - n - 1), t;
	},
	stringify: q
}, af = (e) => typeof e == "bigint" || Number.isInteger(e), of = (e, t, n, { intAsBigInt: r }) => r ? BigInt(e) : parseInt(e.substring(t), n);
function sf(e, t, n) {
	let { value: r } = e;
	return af(r) && r >= 0 ? n + r.toString(t) : q(e);
}
var cf = {
	identify: (e) => af(e) && e >= 0,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "OCT",
	test: /^0o[0-7]+$/,
	resolve: (e, t, n) => of(e, 2, 8, n),
	stringify: (e) => sf(e, 8, "0o")
}, lf = {
	identify: af,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	test: /^[-+]?[0-9]+$/,
	resolve: (e, t, n) => of(e, 0, 10, n),
	stringify: q
}, uf = {
	identify: (e) => af(e) && e >= 0,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "HEX",
	test: /^0x[0-9a-fA-F]+$/,
	resolve: (e, t, n) => of(e, 2, 16, n),
	stringify: (e) => sf(e, 16, "0x")
}, df = [
	Jd,
	Zd,
	Qd,
	$d,
	ef,
	cf,
	lf,
	uf,
	tf,
	nf,
	rf
];
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/json/schema.js
function ff(e) {
	return typeof e == "bigint" || Number.isInteger(e);
}
var pf = ({ value: e }) => JSON.stringify(e), mf = [
	{
		identify: (e) => typeof e == "string",
		default: !0,
		tag: "tag:yaml.org,2002:str",
		resolve: (e) => e,
		stringify: pf
	},
	{
		identify: (e) => e == null,
		createNode: () => new W(null),
		default: !0,
		tag: "tag:yaml.org,2002:null",
		test: /^null$/,
		resolve: () => null,
		stringify: pf
	},
	{
		identify: (e) => typeof e == "boolean",
		default: !0,
		tag: "tag:yaml.org,2002:bool",
		test: /^true$|^false$/,
		resolve: (e) => e === "true",
		stringify: pf
	},
	{
		identify: ff,
		default: !0,
		tag: "tag:yaml.org,2002:int",
		test: /^-?(?:0|[1-9][0-9]*)$/,
		resolve: (e, t, { intAsBigInt: n }) => n ? BigInt(e) : parseInt(e, 10),
		stringify: ({ value: e }) => ff(e) ? e.toString() : JSON.stringify(e)
	},
	{
		identify: (e) => typeof e == "number",
		default: !0,
		tag: "tag:yaml.org,2002:float",
		test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
		resolve: (e) => parseFloat(e),
		stringify: pf
	}
], hf = [Jd, Zd].concat(mf, {
	default: !0,
	tag: "",
	test: /^/,
	resolve(e, t) {
		return t(`Unresolved plain scalar ${JSON.stringify(e)}`), e;
	}
}), gf = {
	identify: (e) => e instanceof Uint8Array,
	default: !1,
	tag: "tag:yaml.org,2002:binary",
	resolve(e, t) {
		if (typeof atob == "function") {
			let t = atob(e.replace(/[\n\r]/g, "")), n = new Uint8Array(t.length);
			for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e);
			return n;
		}
		return t("This environment does not support reading binary tags; either Buffer or atob is required"), e;
	},
	stringify({ comment: e, type: t, value: n }, r, i, a) {
		if (!n) return "";
		let o = n, s;
		if (typeof btoa == "function") {
			let e = "";
			for (let t = 0; t < o.length; ++t) e += String.fromCharCode(o[t]);
			s = btoa(e);
		} else throw Error("This environment does not support writing binary tags; either Buffer or btoa is required");
		if (t ??= W.BLOCK_LITERAL, t !== W.QUOTE_DOUBLE) {
			let e = Math.max(r.options.lineWidth - r.indent.length, r.options.minContentWidth), n = Math.ceil(s.length / e), i = Array(n);
			for (let t = 0, r = 0; t < n; ++t, r += e) i[t] = s.substr(r, e);
			s = i.join(t === W.BLOCK_LITERAL ? "\n" : " ");
		}
		return Dd({
			comment: e,
			type: t,
			value: s
		}, r, i, a);
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function _f(e, t) {
	if (Iu(e)) for (let n = 0; n < e.items.length; ++n) {
		let r = e.items[n];
		if (!z(r)) {
			if (Fu(r)) {
				r.items.length > 1 && t("Each pair must have its own sequence indicator");
				let e = r.items[0] || new G(new W(null));
				if (r.commentBefore && (e.key.commentBefore = e.key.commentBefore ? `${r.commentBefore}\n${e.key.commentBefore}` : r.commentBefore), r.comment) {
					let t = e.value ?? e.key;
					t.comment = t.comment ? `${r.comment}\n${t.comment}` : r.comment;
				}
				r = e;
			}
			e.items[n] = z(r) ? r : new G(r);
		}
	}
	else t("Expected a sequence for this tag");
	return e;
}
function vf(e, t, n) {
	let { replacer: r } = n, i = new Yd(e);
	i.tag = "tag:yaml.org,2002:pairs";
	let a = 0;
	if (t && Symbol.iterator in Object(t)) for (let e of t) {
		typeof r == "function" && (e = r.call(t, String(a++), e));
		let o, s;
		if (Array.isArray(e)) {
			if (e.length === 2) o = e[0], s = e[1];
			else throw TypeError(`Expected [key, value] tuple: ${e}`);
		} else if (e && e instanceof Object) {
			let t = Object.keys(e);
			if (t.length === 1) o = t[0], s = e[o];
			else throw TypeError(`Expected tuple with one key, not ${t.length} keys`);
		} else o = e;
		i.items.push(Hd(o, s, n));
	}
	return i;
}
var yf = {
	collection: "seq",
	default: !1,
	tag: "tag:yaml.org,2002:pairs",
	resolve: _f,
	createNode: vf
}, bf = class e extends Yd {
	constructor() {
		super(), this.add = K.prototype.add.bind(this), this.delete = K.prototype.delete.bind(this), this.get = K.prototype.get.bind(this), this.has = K.prototype.has.bind(this), this.set = K.prototype.set.bind(this), this.tag = e.tag;
	}
	toJSON(e, t) {
		if (!t) return super.toJSON(e);
		let n = /* @__PURE__ */ new Map();
		t?.onCreate && t.onCreate(n);
		for (let e of this.items) {
			let r, i;
			if (z(e) ? (r = U(e.key, "", t), i = U(e.value, r, t)) : r = U(e, "", t), n.has(r)) throw Error("Ordered maps must not include duplicate keys");
			n.set(r, i);
		}
		return n;
	}
	static from(e, t, n) {
		let r = vf(e, t, n), i = new this();
		return i.items = r.items, i;
	}
};
bf.tag = "tag:yaml.org,2002:omap";
var xf = {
	collection: "seq",
	identify: (e) => e instanceof Map,
	nodeClass: bf,
	default: !1,
	tag: "tag:yaml.org,2002:omap",
	resolve(e, t) {
		let n = _f(e, t), r = [];
		for (let { key: e } of n.items) B(e) && (r.includes(e.value) ? t(`Ordered maps must not include duplicate keys: ${e.value}`) : r.push(e.value));
		return Object.assign(new bf(), n);
	},
	createNode: (e, t, n) => bf.from(e, t, n)
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function Sf({ value: e, source: t }, n) {
	return t && (e ? Cf : wf).test.test(t) ? t : e ? n.options.trueStr : n.options.falseStr;
}
var Cf = {
	identify: (e) => e === !0,
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
	resolve: () => new W(!0),
	stringify: Sf
}, wf = {
	identify: (e) => e === !1,
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
	resolve: () => new W(!1),
	stringify: Sf
}, Tf = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
	resolve: (e) => e.slice(-3).toLowerCase() === "nan" ? NaN : e[0] === "-" ? -Infinity : Infinity,
	stringify: q
}, Ef = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "EXP",
	test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
	resolve: (e) => parseFloat(e.replace(/_/g, "")),
	stringify(e) {
		let t = Number(e.value);
		return isFinite(t) ? t.toExponential() : q(e);
	}
}, Df = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
	resolve(e) {
		let t = new W(parseFloat(e.replace(/_/g, ""))), n = e.indexOf(".");
		if (n !== -1) {
			let r = e.substring(n + 1).replace(/_/g, "");
			r[r.length - 1] === "0" && (t.minFractionDigits = r.length);
		}
		return t;
	},
	stringify: q
}, Of = (e) => typeof e == "bigint" || Number.isInteger(e);
function kf(e, t, n, { intAsBigInt: r }) {
	let i = e[0];
	if ((i === "-" || i === "+") && (t += 1), e = e.substring(t).replace(/_/g, ""), r) {
		switch (n) {
			case 2:
				e = `0b${e}`;
				break;
			case 8:
				e = `0o${e}`;
				break;
			case 16: e = `0x${e}`;
		}
		let t = BigInt(e);
		return i === "-" ? BigInt(-1) * t : t;
	}
	let a = parseInt(e, n);
	return i === "-" ? -1 * a : a;
}
function Af(e, t, n) {
	let { value: r } = e;
	if (Of(r)) {
		let e = r.toString(t);
		return r < 0 ? "-" + n + e.substr(1) : n + e;
	}
	return q(e);
}
var jf = {
	identify: Of,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "BIN",
	test: /^[-+]?0b[0-1_]+$/,
	resolve: (e, t, n) => kf(e, 2, 2, n),
	stringify: (e) => Af(e, 2, "0b")
}, Mf = {
	identify: Of,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "OCT",
	test: /^[-+]?0[0-7_]+$/,
	resolve: (e, t, n) => kf(e, 1, 8, n),
	stringify: (e) => Af(e, 8, "0")
}, Nf = {
	identify: Of,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	test: /^[-+]?[0-9][0-9_]*$/,
	resolve: (e, t, n) => kf(e, 0, 10, n),
	stringify: q
}, Pf = {
	identify: Of,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "HEX",
	test: /^[-+]?0x[0-9a-fA-F_]+$/,
	resolve: (e, t, n) => kf(e, 2, 16, n),
	stringify: (e) => Af(e, 16, "0x")
}, Ff = class e extends K {
	constructor(t) {
		super(t), this.tag = e.tag;
	}
	add(e) {
		let t;
		t = z(e) ? e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? new G(e.key, null) : new G(e, null), qd(this.items, t.key) || this.items.push(t);
	}
	get(e, t) {
		let n = qd(this.items, e);
		return !t && z(n) ? B(n.key) ? n.key.value : n.key : n;
	}
	set(e, t) {
		if (typeof t != "boolean") throw Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
		let n = qd(this.items, e);
		n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new G(e));
	}
	toJSON(e, t) {
		return super.toJSON(e, t, Set);
	}
	toString(e, t, n) {
		if (!e) return JSON.stringify(this);
		if (this.hasAllNullValues(!0)) return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, n);
		throw Error("Set items must all have null values");
	}
	static from(e, t, n) {
		let { replacer: r } = n, i = new this(e);
		if (t && Symbol.iterator in Object(t)) for (let e of t) typeof r == "function" && (e = r.call(t, e, e)), i.items.push(Hd(e, null, n));
		return i;
	}
};
Ff.tag = "tag:yaml.org,2002:set";
var If = {
	collection: "map",
	identify: (e) => e instanceof Set,
	nodeClass: Ff,
	default: !1,
	tag: "tag:yaml.org,2002:set",
	createNode: (e, t, n) => Ff.from(e, t, n),
	resolve(e, t) {
		if (Fu(e)) {
			if (e.hasAllNullValues(!0)) return Object.assign(new Ff(), e);
			t("Set items must all have null values");
		} else t("Expected a mapping for this tag");
		return e;
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function Lf(e, t) {
	let n = e[0], r = n === "-" || n === "+" ? e.substring(1) : e, i = (e) => t ? BigInt(e) : Number(e), a = r.replace(/_/g, "").split(":").reduce((e, t) => e * i(60) + i(t), i(0));
	return n === "-" ? i(-1) * a : a;
}
function Rf(e) {
	let { value: t } = e, n = (e) => e;
	if (typeof t == "bigint") n = (e) => BigInt(e);
	else if (isNaN(t) || !isFinite(t)) return q(e);
	let r = "";
	t < 0 && (r = "-", t *= n(-1));
	let i = n(60), a = [t % i];
	return t < 60 ? a.unshift(0) : (t = (t - a[0]) / i, a.unshift(t % i), t >= 60 && (t = (t - a[0]) / i, a.unshift(t))), r + a.map((e) => String(e).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var zf = {
	identify: (e) => typeof e == "bigint" || Number.isInteger(e),
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "TIME",
	test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
	resolve: (e, t, { intAsBigInt: n }) => Lf(e, n),
	stringify: Rf
}, Bf = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "TIME",
	test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
	resolve: (e) => Lf(e, !1),
	stringify: Rf
}, Vf = {
	identify: (e) => e instanceof Date,
	default: !0,
	tag: "tag:yaml.org,2002:timestamp",
	test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
	resolve(e) {
		let t = e.match(Vf.test);
		if (!t) throw Error("!!timestamp expects a date, starting with yyyy-mm-dd");
		let [, n, r, i, a, o, s] = t.map(Number), c = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0, l = Date.UTC(n, r - 1, i, a || 0, o || 0, s || 0, c), u = t[8];
		if (u && u !== "Z") {
			let e = Lf(u, !1);
			Math.abs(e) < 30 && (e *= 60), l -= 6e4 * e;
		}
		return new Date(l);
	},
	stringify: ({ value: e }) => e?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Hf = [
	Jd,
	Zd,
	Qd,
	$d,
	Cf,
	wf,
	jf,
	Mf,
	Nf,
	Pf,
	Tf,
	Ef,
	Df,
	gf,
	Fd,
	xf,
	yf,
	If,
	zf,
	Bf,
	Vf
], Uf = /* @__PURE__ */ new Map([
	["core", df],
	["failsafe", [
		Jd,
		Zd,
		Qd
	]],
	["json", hf],
	["yaml11", Hf],
	["yaml-1.1", Hf]
]), Wf = {
	binary: gf,
	bool: ef,
	float: rf,
	floatExp: nf,
	floatNaN: tf,
	floatTime: Bf,
	int: lf,
	intHex: uf,
	intOct: cf,
	intTime: zf,
	map: Jd,
	merge: Fd,
	null: $d,
	omap: xf,
	pairs: yf,
	seq: Zd,
	set: If,
	timestamp: Vf
}, Gf = {
	"tag:yaml.org,2002:binary": gf,
	"tag:yaml.org,2002:merge": Fd,
	"tag:yaml.org,2002:omap": xf,
	"tag:yaml.org,2002:pairs": yf,
	"tag:yaml.org,2002:set": If,
	"tag:yaml.org,2002:timestamp": Vf
};
function Kf(e, t, n) {
	let r = Uf.get(t);
	if (r && !e) return n && !r.includes(Fd) ? r.concat(Fd) : r.slice();
	let i = r;
	if (!i) {
		if (Array.isArray(e)) i = [];
		else {
			let e = Array.from(Uf.keys()).filter((e) => e !== "yaml11").map((e) => JSON.stringify(e)).join(", ");
			throw Error(`Unknown schema "${t}"; use one of ${e} or define customTags array`);
		}
	}
	if (Array.isArray(e)) for (let t of e) i = i.concat(t);
	else typeof e == "function" && (i = e(i.slice()));
	return n && (i = i.concat(Fd)), i.reduce((e, t) => {
		let n = typeof t == "string" ? Wf[t] : t;
		if (!n) {
			let e = JSON.stringify(t), n = Object.keys(Wf).map((e) => JSON.stringify(e)).join(", ");
			throw Error(`Unknown custom tag ${e}; use one of ${n}`);
		}
		return e.includes(n) || e.push(n), e;
	}, []);
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/schema/Schema.js
var qf = (e, t) => e.key < t.key ? -1 : +(e.key > t.key), Jf = class e {
	constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: r, schema: i, sortMapEntries: a, toStringDefaults: o }) {
		this.compat = Array.isArray(e) ? Kf(e, "compat") : e ? Kf(null, e) : null, this.name = typeof i == "string" && i || "core", this.knownTags = r ? Gf : {}, this.tags = Kf(t, this.name, n), this.toStringOptions = o ?? null, Object.defineProperty(this, ku, { value: Jd }), Object.defineProperty(this, ju, { value: Qd }), Object.defineProperty(this, Mu, { value: Zd }), this.sortMapEntries = typeof a == "function" ? a : a === !0 ? qf : null;
	}
	clone() {
		let t = Object.create(e.prototype, Object.getOwnPropertyDescriptors(this));
		return t.tags = this.tags.slice(), t;
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function Yf(e, t) {
	let n = [], r = t.directives === !0;
	if (t.directives !== !1 && e.directives) {
		let t = e.directives.toString(e);
		t ? (n.push(t), r = !0) : e.directives.docStart && (r = !0);
	}
	r && n.push("---");
	let i = Od(e, t), { commentString: a } = i.options;
	if (e.commentBefore) {
		n.length !== 1 && n.unshift("");
		let t = a(e.commentBefore);
		n.unshift(dd(t, ""));
	}
	let o = !1, s = null;
	if (e.contents) {
		if (H(e.contents)) {
			if (e.contents.spaceBefore && r && n.push(""), e.contents.commentBefore) {
				let t = a(e.contents.commentBefore);
				n.push(dd(t, ""));
			}
			i.forceBlockIndent = !!e.comment, s = e.contents.comment;
		}
		let t = s ? void 0 : () => o = !0, c = jd(e.contents, i, () => s = null, t);
		s && (c += fd(c, "", a(s))), (c[0] === "|" || c[0] === ">") && n[n.length - 1] === "---" ? n[n.length - 1] = `--- ${c}` : n.push(c);
	} else n.push(jd(e.contents, i));
	if (e.directives?.docEnd) {
		if (e.comment) {
			let t = a(e.comment);
			t.includes("\n") ? (n.push("..."), n.push(dd(t, ""))) : n.push(`... ${t}`);
		} else n.push("...");
	} else {
		let t = e.comment;
		t && o && (t = t.replace(/^\n+/, "")), t && ((!o || s) && n[n.length - 1] !== "" && n.push(""), n.push(dd(a(t), "")));
	}
	return n.join("\n") + "\n";
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/doc/Document.js
var Xf = class e {
	constructor(e, t, n) {
		this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, R, { value: Ou });
		let r = null;
		typeof t == "function" || Array.isArray(t) ? r = t : n === void 0 && t && (n = t, t = void 0);
		let i = Object.assign({
			intAsBigInt: !1,
			keepSourceTokens: !1,
			logLevel: "warn",
			prettyErrors: !0,
			strict: !0,
			stringKeys: !1,
			uniqueKeys: !0,
			version: "1.2"
		}, n);
		this.options = i;
		let { version: a } = i;
		n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (a = this.directives.yaml.version)) : this.directives = new Ju({ version: a }), this.setSchema(a, n), this.contents = e === void 0 ? null : this.createNode(e, r, n);
	}
	clone() {
		let t = Object.create(e.prototype, { [R]: { value: Ou } });
		return t.commentBefore = this.commentBefore, t.comment = this.comment, t.errors = this.errors.slice(), t.warnings = this.warnings.slice(), t.options = Object.assign({}, this.options), this.directives && (t.directives = this.directives.clone()), t.schema = this.schema.clone(), t.contents = H(this.contents) ? this.contents.clone(t.schema) : this.contents, this.range && (t.range = this.range.slice()), t;
	}
	add(e) {
		Zf(this.contents) && this.contents.add(e);
	}
	addIn(e, t) {
		Zf(this.contents) && this.contents.addIn(e, t);
	}
	createAlias(e, t) {
		if (!e.anchor) {
			let n = Xu(this);
			e.anchor = !t || n.has(t) ? Zu(t || "a", n) : t;
		}
		return new td(e.anchor);
	}
	createNode(e, t, n) {
		let r;
		if (typeof t == "function") e = t.call({ "": e }, "", e), r = t;
		else if (Array.isArray(t)) {
			let e = t.filter((e) => typeof e == "number" || e instanceof String || e instanceof Number).map(String);
			e.length > 0 && (t = t.concat(e)), r = t;
		} else n === void 0 && t && (n = t, t = void 0);
		let { aliasDuplicateObjects: i, anchorPrefix: a, flow: o, keepUndefined: s, onTagObj: c, tag: l } = n ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: f } = Qu(this, a || "a"), p = {
			aliasDuplicateObjects: i ?? !0,
			keepUndefined: s ?? !1,
			onAnchor: u,
			onTagObj: c,
			replacer: r,
			schema: this.schema,
			sourceObjects: f
		}, m = od(e, l, p);
		return o && V(m) && (m.flow = !0), d(), m;
	}
	createPair(e, t, n = {}) {
		return new G(this.createNode(e, null, n), this.createNode(t, null, n));
	}
	delete(e) {
		return Zf(this.contents) ? this.contents.delete(e) : !1;
	}
	deleteIn(e) {
		return cd(e) ? this.contents != null && (this.contents = null, !0) : Zf(this.contents) ? this.contents.deleteIn(e) : !1;
	}
	get(e, t) {
		return V(this.contents) ? this.contents.get(e, t) : void 0;
	}
	getIn(e, t) {
		return cd(e) ? !t && B(this.contents) ? this.contents.value : this.contents : V(this.contents) ? this.contents.getIn(e, t) : void 0;
	}
	has(e) {
		return V(this.contents) ? this.contents.has(e) : !1;
	}
	hasIn(e) {
		return cd(e) ? this.contents !== void 0 : V(this.contents) ? this.contents.hasIn(e) : !1;
	}
	set(e, t) {
		this.contents == null ? this.contents = sd(this.schema, [e], t) : Zf(this.contents) && this.contents.set(e, t);
	}
	setIn(e, t) {
		cd(e) ? this.contents = t : this.contents == null ? this.contents = sd(this.schema, Array.from(e), t) : Zf(this.contents) && this.contents.setIn(e, t);
	}
	setSchema(e, t = {}) {
		typeof e == "number" && (e = String(e));
		let n;
		switch (e) {
			case "1.1":
				this.directives ? this.directives.yaml.version = "1.1" : this.directives = new Ju({ version: "1.1" }), n = {
					resolveKnownTags: !1,
					schema: "yaml-1.1"
				};
				break;
			case "1.2":
			case "next":
				this.directives ? this.directives.yaml.version = e : this.directives = new Ju({ version: e }), n = {
					resolveKnownTags: !0,
					schema: "core"
				};
				break;
			case null:
				this.directives && delete this.directives, n = null;
				break;
			default: {
				let t = JSON.stringify(e);
				throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${t}`);
			}
		}
		if (t.schema instanceof Object) this.schema = t.schema;
		else if (n) this.schema = new Jf(Object.assign(n, t));
		else throw Error("With a null YAML version, the { schema: Schema } option is required");
	}
	toJS({ json: e, jsonArg: t, mapAsMap: n, maxAliasCount: r, onAnchor: i, reviver: a } = {}) {
		let o = {
			anchors: /* @__PURE__ */ new Map(),
			doc: this,
			keep: !e,
			mapAsMap: n === !0,
			mapKeyWarned: !1,
			maxAliasCount: typeof r == "number" ? r : 100
		}, s = U(this.contents, t ?? "", o);
		if (typeof i == "function") for (let { count: e, res: t } of o.anchors.values()) i(t, e);
		return typeof a == "function" ? $u(a, { "": s }, "", s) : s;
	}
	toJSON(e, t) {
		return this.toJS({
			json: !0,
			jsonArg: e,
			mapAsMap: !1,
			onAnchor: t
		});
	}
	toString(e = {}) {
		if (this.errors.length > 0) throw Error("Document with errors cannot be stringified");
		if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
			let t = JSON.stringify(e.indent);
			throw Error(`"indent" option must be a positive integer, not ${t}`);
		}
		return Yf(this, e);
	}
};
function Zf(e) {
	if (V(e)) return !0;
	throw Error("Expected a YAML collection as document contents");
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/errors.js
var Qf = class extends Error {
	constructor(e, t, n, r) {
		super(), this.name = e, this.code = n, this.message = r, this.pos = t;
	}
}, $f = class extends Qf {
	constructor(e, t, n) {
		super("YAMLParseError", e, t, n);
	}
}, ep = class extends Qf {
	constructor(e, t, n) {
		super("YAMLWarning", e, t, n);
	}
}, tp = (e, t) => (n) => {
	if (n.pos[0] === -1) return;
	n.linePos = n.pos.map((e) => t.linePos(e));
	let { line: r, col: i } = n.linePos[0];
	n.message += ` at line ${r}, column ${i}`;
	let a = i - 1, o = e.substring(t.lineStarts[r - 1], t.lineStarts[r]).replace(/[\n\r]+$/, "");
	if (a >= 60 && o.length > 80) {
		let e = Math.min(a - 39, o.length - 79);
		o = "…" + o.substring(e), a -= e - 1;
	}
	if (o.length > 80 && (o = o.substring(0, 79) + "…"), r > 1 && /^ *$/.test(o.substring(0, a))) {
		let n = e.substring(t.lineStarts[r - 2], t.lineStarts[r - 1]);
		n.length > 80 && (n = n.substring(0, 79) + "…\n"), o = n + o;
	}
	if (/[^ ]/.test(o)) {
		let e = 1, t = n.linePos[1];
		t?.line === r && t.col > i && (e = Math.max(1, Math.min(t.col - i, 80 - a)));
		let s = " ".repeat(a) + "^".repeat(e);
		n.message += `:\n\n${o}\n${s}\n`;
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-props.js
function np(e, { flow: t, indicator: n, next: r, offset: i, onError: a, parentIndent: o, startOnNewline: s }) {
	let c = !1, l = s, u = s, d = "", f = "", p = !1, m = !1, h = null, g = null, _ = null, v = null, y = null, b = null, x = null;
	for (let i of e) switch (m &&= (i.type !== "space" && i.type !== "newline" && i.type !== "comma" && a(i.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), !1), h &&= (l && i.type !== "comment" && i.type !== "newline" && a(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), null), i.type) {
		case "space":
			!t && (n !== "doc-start" || r?.type !== "flow-collection") && i.source.includes("	") && (h = i), u = !0;
			break;
		case "comment": {
			u || a(i, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
			let e = i.source.substring(1) || " ";
			d ? d += f + e : d = e, f = "", l = !1;
			break;
		}
		case "newline":
			l ? d ? d += i.source : b && n === "seq-item-ind" || (c = !0) : f += i.source, l = !0, p = !0, (g || _) && (v = i), u = !0;
			break;
		case "anchor":
			g && a(i, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), i.source.endsWith(":") && a(i.offset + i.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), g = i, x ??= i.offset, l = !1, u = !1, m = !0;
			break;
		case "tag":
			_ && a(i, "MULTIPLE_TAGS", "A node can have at most one tag"), _ = i, x ??= i.offset, l = !1, u = !1, m = !0;
			break;
		case n:
			(g || _) && a(i, "BAD_PROP_ORDER", `Anchors and tags must be after the ${i.source} indicator`), b && a(i, "UNEXPECTED_TOKEN", `Unexpected ${i.source} in ${t ?? "collection"}`), b = i, l = n === "seq-item-ind" || n === "explicit-key-ind", u = !1;
			break;
		case "comma": if (t) {
			y && a(i, "UNEXPECTED_TOKEN", `Unexpected , in ${t}`), y = i, l = !1, u = !1;
			break;
		}
		default: a(i, "UNEXPECTED_TOKEN", `Unexpected ${i.type} token`), l = !1, u = !1;
	}
	let S = e[e.length - 1], C = S ? S.offset + S.source.length : i;
	return m && r && r.type !== "space" && r.type !== "newline" && r.type !== "comma" && (r.type !== "scalar" || r.source !== "") && a(r.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (l && h.indent <= o || r?.type === "block-map" || r?.type === "block-seq") && a(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
		comma: y,
		found: b,
		spaceBefore: c,
		comment: d,
		hasNewline: p,
		anchor: g,
		tag: _,
		newlineAfterProp: v,
		end: C,
		start: x ?? C
	};
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/util-contains-newline.js
function rp(e) {
	if (!e) return null;
	switch (e.type) {
		case "alias":
		case "scalar":
		case "double-quoted-scalar":
		case "single-quoted-scalar":
			if (e.source.includes("\n")) return !0;
			if (e.end) {
				for (let t of e.end) if (t.type === "newline") return !0;
			}
			return !1;
		case "flow-collection":
			for (let t of e.items) {
				for (let e of t.start) if (e.type === "newline") return !0;
				if (t.sep) {
					for (let e of t.sep) if (e.type === "newline") return !0;
				}
				if (rp(t.key) || rp(t.value)) return !0;
			}
			return !1;
		default: return !0;
	}
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/util-flow-indent-check.js
function ip(e, t, n) {
	if (t?.type === "flow-collection") {
		let r = t.end[0];
		r.indent === e && (r.source === "]" || r.source === "}") && rp(t) && n(r, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
	}
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/util-map-includes.js
function ap(e, t, n) {
	let { uniqueKeys: r } = e.options;
	if (r === !1) return !1;
	let i = typeof r == "function" ? r : (e, t) => e === t || B(e) && B(t) && e.value === t.value;
	return t.some((e) => i(e.key, n));
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-block-map.js
var op = "All mapping items must start at the same column";
function sp({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
	let o = new ((a?.nodeClass) ?? K)(n.schema);
	n.atRoot &&= !1;
	let s = r.offset, c = null;
	for (let a of r.items) {
		let { start: l, key: u, sep: d, value: f } = a, p = np(l, {
			indicator: "explicit-key-ind",
			next: u ?? d?.[0],
			offset: s,
			onError: i,
			parentIndent: r.indent,
			startOnNewline: !0
		}), m = !p.found;
		if (m) {
			if (u && (u.type === "block-seq" ? i(s, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in u && u.indent !== r.indent && i(s, "BAD_INDENT", op)), !p.anchor && !p.tag && !d) {
				c = p.end, p.comment && (o.comment ? o.comment += "\n" + p.comment : o.comment = p.comment);
				continue;
			}
			(p.newlineAfterProp || rp(u)) && i(u ?? l[l.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
		} else p.found?.indent !== r.indent && i(s, "BAD_INDENT", op);
		n.atKey = !0;
		let h = p.end, g = u ? e(n, u, p, i) : t(n, h, l, null, p, i);
		n.schema.compat && ip(r.indent, u, i), n.atKey = !1, ap(n, o.items, g) && i(h, "DUPLICATE_KEY", "Map keys must be unique");
		let _ = np(d ?? [], {
			indicator: "map-value-ind",
			next: f,
			offset: g.range[2],
			onError: i,
			parentIndent: r.indent,
			startOnNewline: !u || u.type === "block-scalar"
		});
		if (s = _.end, _.found) {
			m && (f?.type === "block-map" && !_.hasNewline && i(s, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), n.options.strict && p.start < _.found.offset - 1024 && i(g.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
			let c = f ? e(n, f, _, i) : t(n, s, d, null, _, i);
			n.schema.compat && ip(r.indent, f, i), s = c.range[2];
			let l = new G(g, c);
			n.options.keepSourceTokens && (l.srcToken = a), o.items.push(l);
		} else {
			m && i(g.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), _.comment && (g.comment ? g.comment += "\n" + _.comment : g.comment = _.comment);
			let e = new G(g);
			n.options.keepSourceTokens && (e.srcToken = a), o.items.push(e);
		}
	}
	return c && c < s && i(c, "IMPOSSIBLE", "Map comment with trailing content"), o.range = [
		r.offset,
		s,
		c ?? s
	], o;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-block-seq.js
function cp({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
	let o = new ((a?.nodeClass) ?? Yd)(n.schema);
	n.atRoot &&= !1, n.atKey &&= !1;
	let s = r.offset, c = null;
	for (let { start: a, value: l } of r.items) {
		let u = np(a, {
			indicator: "seq-item-ind",
			next: l,
			offset: s,
			onError: i,
			parentIndent: r.indent,
			startOnNewline: !0
		});
		if (!u.found) {
			if (u.anchor || u.tag || l) l?.type === "block-seq" ? i(u.end, "BAD_INDENT", "All sequence items must start at the same column") : i(s, "MISSING_CHAR", "Sequence item without - indicator");
			else {
				c = u.end, u.comment && (o.comment = u.comment);
				continue;
			}
		}
		let d = l ? e(n, l, u, i) : t(n, u.end, a, null, u, i);
		n.schema.compat && ip(r.indent, l, i), s = d.range[2], o.items.push(d);
	}
	return o.range = [
		r.offset,
		s,
		c ?? s
	], o;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-end.js
function lp(e, t, n, r) {
	let i = "";
	if (e) {
		let a = !1, o = "";
		for (let s of e) {
			let { source: e, type: c } = s;
			switch (c) {
				case "space":
					a = !0;
					break;
				case "comment": {
					n && !a && r(s, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
					let t = e.substring(1) || " ";
					i ? i += o + t : i = t, o = "";
					break;
				}
				case "newline":
					i && (o += e), a = !0;
					break;
				default: r(s, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
			}
			t += e.length;
		}
	}
	return {
		comment: i,
		offset: t
	};
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-flow-collection.js
var up = "Block collections are not allowed within flow collections", dp = (e) => e && (e.type === "block-map" || e.type === "block-seq");
function fp({ composeNode: e, composeEmptyNode: t }, n, r, i, a) {
	let o = r.start.source === "{", s = o ? "flow map" : "flow sequence", c = new ((a?.nodeClass) ?? (o ? K : Yd))(n.schema);
	c.flow = !0;
	let l = n.atRoot;
	l && (n.atRoot = !1), n.atKey &&= !1;
	let u = r.offset + r.start.source.length;
	for (let a = 0; a < r.items.length; ++a) {
		let l = r.items[a], { start: d, key: f, sep: p, value: m } = l, h = np(d, {
			flow: s,
			indicator: "explicit-key-ind",
			next: f ?? p?.[0],
			offset: u,
			onError: i,
			parentIndent: r.indent,
			startOnNewline: !1
		});
		if (!h.found) {
			if (!h.anchor && !h.tag && !p && !m) {
				a === 0 && h.comma ? i(h.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${s}`) : a < r.items.length - 1 && i(h.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${s}`), h.comment && (c.comment ? c.comment += "\n" + h.comment : c.comment = h.comment), u = h.end;
				continue;
			}
			!o && n.options.strict && rp(f) && i(f, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
		}
		if (a === 0) h.comma && i(h.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${s}`);
		else if (h.comma || i(h.start, "MISSING_CHAR", `Missing , between ${s} items`), h.comment) {
			let e = "";
			loop: for (let t of d) switch (t.type) {
				case "comma":
				case "space": break;
				case "comment":
					e = t.source.substring(1);
					break loop;
				default: break loop;
			}
			if (e) {
				let t = c.items[c.items.length - 1];
				z(t) && (t = t.value ?? t.key), t.comment ? t.comment += "\n" + e : t.comment = e, h.comment = h.comment.substring(e.length + 1);
			}
		}
		if (!o && !p && !h.found) {
			let r = m ? e(n, m, h, i) : t(n, h.end, p, null, h, i);
			c.items.push(r), u = r.range[2], dp(m) && i(r.range, "BLOCK_IN_FLOW", up);
		} else {
			n.atKey = !0;
			let a = h.end, g = f ? e(n, f, h, i) : t(n, a, d, null, h, i);
			dp(f) && i(g.range, "BLOCK_IN_FLOW", up), n.atKey = !1;
			let _ = np(p ?? [], {
				flow: s,
				indicator: "map-value-ind",
				next: m,
				offset: g.range[2],
				onError: i,
				parentIndent: r.indent,
				startOnNewline: !1
			});
			if (_.found) {
				if (!o && !h.found && n.options.strict) {
					if (p) for (let e of p) {
						if (e === _.found) break;
						if (e.type === "newline") {
							i(e, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
							break;
						}
					}
					h.start < _.found.offset - 1024 && i(_.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
				}
			} else m && ("source" in m && m.source?.[0] === ":" ? i(m, "MISSING_CHAR", `Missing space after : in ${s}`) : i(_.start, "MISSING_CHAR", `Missing , or : between ${s} items`));
			let v = m ? e(n, m, _, i) : _.found ? t(n, _.end, p, null, _, i) : null;
			v ? dp(m) && i(v.range, "BLOCK_IN_FLOW", up) : _.comment && (g.comment ? g.comment += "\n" + _.comment : g.comment = _.comment);
			let y = new G(g, v);
			if (n.options.keepSourceTokens && (y.srcToken = l), o) {
				let e = c;
				ap(n, e.items, g) && i(a, "DUPLICATE_KEY", "Map keys must be unique"), e.items.push(y);
			} else {
				let e = new K(n.schema);
				e.flow = !0, e.items.push(y);
				let t = (v ?? g).range;
				e.range = [
					g.range[0],
					t[1],
					t[2]
				], c.items.push(e);
			}
			u = v ? v.range[2] : _.end;
		}
	}
	let d = o ? "}" : "]", [f, ...p] = r.end, m = u;
	if (f?.source === d) m = f.offset + f.source.length;
	else {
		let e = s[0].toUpperCase() + s.substring(1), t = l ? `${e} must end with a ${d}` : `${e} in block collection must be sufficiently indented and end with a ${d}`;
		i(u, l ? "MISSING_CHAR" : "BAD_INDENT", t), f && f.source.length !== 1 && p.unshift(f);
	}
	if (p.length > 0) {
		let e = lp(p, m, n.options.strict, i);
		e.comment && (c.comment ? c.comment += "\n" + e.comment : c.comment = e.comment), c.range = [
			r.offset,
			m,
			e.offset
		];
	} else c.range = [
		r.offset,
		m,
		m
	];
	return c;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/compose-collection.js
function pp(e, t, n, r, i, a) {
	let o = n.type === "block-map" ? sp(e, t, n, r, a) : n.type === "block-seq" ? cp(e, t, n, r, a) : fp(e, t, n, r, a), s = o.constructor;
	return i === "!" || i === s.tagName ? (o.tag = s.tagName, o) : (i && (o.tag = i), o);
}
function mp(e, t, n, r, i) {
	let a = r.tag, o = a ? t.directives.tagName(a.source, (e) => i(a, "TAG_RESOLVE_FAILED", e)) : null;
	if (n.type === "block-seq") {
		let { anchor: e, newlineAfterProp: t } = r, n = e && a ? e.offset > a.offset ? e : a : e ?? a;
		n && (!t || t.offset < n.offset) && i(n, "MISSING_CHAR", "Missing newline after block sequence props");
	}
	let s = n.type === "block-map" ? "map" : n.type === "block-seq" ? "seq" : n.start.source === "{" ? "map" : "seq";
	if (!a || !o || o === "!" || o === K.tagName && s === "map" || o === Yd.tagName && s === "seq") return pp(e, t, n, i, o);
	let c = t.schema.tags.find((e) => e.tag === o && e.collection === s);
	if (!c) {
		let r = t.schema.knownTags[o];
		if (r?.collection === s) t.schema.tags.push(Object.assign({}, r, { default: !1 })), c = r;
		else return r ? i(a, "BAD_COLLECTION_TYPE", `${r.tag} used for ${s} collection, but expects ${r.collection ?? "scalar"}`, !0) : i(a, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), pp(e, t, n, i, o);
	}
	let l = pp(e, t, n, i, o, c), u = c.resolve?.(l, (e) => i(a, "TAG_RESOLVE_FAILED", e), t.options) ?? l, d = H(u) ? u : new W(u);
	return d.range = l.range, d.tag = o, c?.format && (d.format = c.format), d;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-block-scalar.js
function hp(e, t, n) {
	let r = t.offset, i = gp(t, e.options.strict, n);
	if (!i) return {
		value: "",
		type: null,
		comment: "",
		range: [
			r,
			r,
			r
		]
	};
	let a = i.mode === ">" ? W.BLOCK_FOLDED : W.BLOCK_LITERAL, o = t.source ? _p(t.source) : [], s = o.length;
	for (let e = o.length - 1; e >= 0; --e) {
		let t = o[e][1];
		if (t === "" || t === "\r") s = e;
		else break;
	}
	if (s === 0) {
		let e = i.chomp === "+" && o.length > 0 ? "\n".repeat(Math.max(1, o.length - 1)) : "", n = r + i.length;
		return t.source && (n += t.source.length), {
			value: e,
			type: a,
			comment: i.comment,
			range: [
				r,
				n,
				n
			]
		};
	}
	let c = t.indent + i.indent, l = t.offset + i.length, u = 0;
	for (let t = 0; t < s; ++t) {
		let [r, a] = o[t];
		if (a === "" || a === "\r") i.indent === 0 && r.length > c && (c = r.length);
		else {
			r.length < c && n(l + r.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (c = r.length), u = t, c === 0 && !e.atRoot && n(l, "BAD_INDENT", "Block scalar values in collections must be indented");
			break;
		}
		l += r.length + a.length + 1;
	}
	for (let e = o.length - 1; e >= s; --e) o[e][0].length > c && (s = e + 1);
	let d = "", f = "", p = !1;
	for (let e = 0; e < u; ++e) d += o[e][0].slice(c) + "\n";
	for (let e = u; e < s; ++e) {
		let [t, r] = o[e];
		l += t.length + r.length + 1;
		let s = r[r.length - 1] === "\r";
		/* istanbul ignore if already caught in lexer */
		if (s && (r = r.slice(0, -1)), r && t.length < c) {
			let e = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
			n(l - r.length - (s ? 2 : 1), "BAD_INDENT", e), t = "";
		}
		a === W.BLOCK_LITERAL ? (d += f + t.slice(c) + r, f = "\n") : t.length > c || r[0] === "	" ? (f === " " ? f = "\n" : !p && f === "\n" && (f = "\n\n"), d += f + t.slice(c) + r, f = "\n", p = !0) : r === "" ? f === "\n" ? d += "\n" : f = "\n" : (d += f + r, f = " ", p = !1);
	}
	switch (i.chomp) {
		case "-": break;
		case "+":
			for (let e = s; e < o.length; ++e) d += "\n" + o[e][0].slice(c);
			d[d.length - 1] !== "\n" && (d += "\n");
			break;
		default: d += "\n";
	}
	let m = r + i.length + t.source.length;
	return {
		value: d,
		type: a,
		comment: i.comment,
		range: [
			r,
			m,
			m
		]
	};
}
function gp({ offset: e, props: t }, n, r) {
	/* istanbul ignore if should not happen */
	if (t[0].type !== "block-scalar-header") return r(t[0], "IMPOSSIBLE", "Block scalar header not found"), null;
	let { source: i } = t[0], a = i[0], o = 0, s = "", c = -1;
	for (let t = 1; t < i.length; ++t) {
		let n = i[t];
		if (!s && (n === "-" || n === "+")) s = n;
		else {
			let r = Number(n);
			!o && r ? o = r : c === -1 && (c = e + t);
		}
	}
	c !== -1 && r(c, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
	let l = !1, u = "", d = i.length;
	for (let e = 1; e < t.length; ++e) {
		let i = t[e];
		switch (i.type) {
			case "space": l = !0;
			case "newline":
				d += i.source.length;
				break;
			case "comment":
				n && !l && r(i, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += i.source.length, u = i.source.substring(1);
				break;
			case "error":
				r(i, "UNEXPECTED_TOKEN", i.message), d += i.source.length;
				break;
			/* istanbul ignore next should not happen */
			default: {
				r(i, "UNEXPECTED_TOKEN", `Unexpected token in block scalar header: ${i.type}`);
				let e = i.source;
				e && typeof e == "string" && (d += e.length);
			}
		}
	}
	return {
		mode: a,
		indent: o,
		chomp: s,
		comment: u,
		length: d
	};
}
function _p(e) {
	let t = e.split(/\n( *)/), n = t[0], r = n.match(/^( *)/), i = [r?.[1] ? [r[1], n.slice(r[1].length)] : ["", n]];
	for (let e = 1; e < t.length; e += 2) i.push([t[e], t[e + 1]]);
	return i;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js
function vp(e, t, n) {
	let { offset: r, type: i, source: a, end: o } = e, s, c, l = (e, t, i) => n(r + e, t, i);
	switch (i) {
		case "scalar":
			s = W.PLAIN, c = yp(a, l);
			break;
		case "single-quoted-scalar":
			s = W.QUOTE_SINGLE, c = bp(a, l);
			break;
		case "double-quoted-scalar":
			s = W.QUOTE_DOUBLE, c = Sp(a, l);
			break;
		/* istanbul ignore next should not happen */
		default: return n(e, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
			value: "",
			type: null,
			comment: "",
			range: [
				r,
				r + a.length,
				r + a.length
			]
		};
	}
	let u = r + a.length, d = lp(o, u, t, n);
	return {
		value: c,
		type: s,
		comment: d.comment,
		range: [
			r,
			u,
			d.offset
		]
	};
}
function yp(e, t) {
	let n = "";
	switch (e[0]) {
		/* istanbul ignore next should not happen */
		case "	":
			n = "a tab character";
			break;
		case ",":
			n = "flow indicator character ,";
			break;
		case "%":
			n = "directive indicator character %";
			break;
		case "|":
		case ">":
			n = `block scalar indicator ${e[0]}`;
			break;
		case "@":
		case "`": n = `reserved character ${e[0]}`;
	}
	return n && t(0, "BAD_SCALAR_START", `Plain value cannot start with ${n}`), xp(e);
}
function bp(e, t) {
	return (e[e.length - 1] !== "'" || e.length === 1) && t(e.length, "MISSING_CHAR", "Missing closing 'quote"), xp(e.slice(1, -1)).replace(/''/g, "'");
}
function xp(e) {
	let t = /(.*?)\r?\n/sy, n = t.exec(e);
	if (!n) return e;
	let r, i;
	try {
		r = /* @__PURE__ */ RegExp("(?<![ 	])[ 	]+$"), i = /* @__PURE__ */ RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
	} catch {
		r = /[ \t]+$/, i = /^[ \t]+|[ \t]+$/g;
	}
	let a = n[1].replace(r, ""), o = " ", s = t.lastIndex;
	for (; n = t.exec(e);) {
		let e = n[1].replace(i, "");
		e === "" ? o === "\n" ? a += o : o = "\n" : (a += o + e, o = " "), s = t.lastIndex;
	}
	let c = /[ \t]*(.*)/sy;
	return c.lastIndex = s, n = c.exec(e), a + o + (n?.[1] ?? "");
}
function Sp(e, t) {
	let n = "";
	for (let r = 1; r < e.length - 1; ++r) {
		let i = e[r];
		if (i !== "\r" || e[r + 1] !== "\n") {
			if (i === "\n") {
				let { fold: t, offset: i } = Cp(e, r);
				n += t, r = i;
			} else if (i === "\\") {
				let i = e[++r], a = wp[i];
				if (a) n += a;
				else if (i === "\n") for (i = e[r + 1]; i === " " || i === "	";) i = e[++r + 1];
				else if (i === "\r" && e[r + 1] === "\n") for (i = e[++r + 1]; i === " " || i === "	";) i = e[++r + 1];
				else if (i === "x" || i === "u" || i === "U") {
					let a = i === "x" ? 2 : i === "u" ? 4 : 8;
					n += Tp(e, r + 1, a, t), r += a;
				} else {
					let i = e.substr(r - 1, 2);
					t(r - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${i}`), n += i;
				}
			} else if (i === " " || i === "	") {
				let t = r, a = e[r + 1];
				for (; a === " " || a === "	";) a = e[++r + 1];
				a !== "\n" && (a !== "\r" || e[r + 2] !== "\n") && (n += r > t ? e.slice(t, r + 1) : i);
			} else n += i;
		}
	}
	return (e[e.length - 1] !== "\"" || e.length === 1) && t(e.length, "MISSING_CHAR", "Missing closing \"quote"), n;
}
function Cp(e, t) {
	let n = "", r = e[t + 1];
	for (; (r === " " || r === "	" || r === "\n" || r === "\r") && (r !== "\r" || e[t + 2] === "\n");) r === "\n" && (n += "\n"), t += 1, r = e[t + 1];
	return n ||= " ", {
		fold: n,
		offset: t
	};
}
var wp = {
	0: "\0",
	a: "\x07",
	b: "\b",
	e: "\x1B",
	f: "\f",
	n: "\n",
	r: "\r",
	t: "	",
	v: "\v",
	N: "",
	_: "\xA0",
	L: "\u2028",
	P: "\u2029",
	" ": " ",
	"\"": "\"",
	"/": "/",
	"\\": "\\",
	"	": "	"
};
function Tp(e, t, n, r) {
	let i = e.substr(t, n), a = i.length === n && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
	try {
		return String.fromCodePoint(a);
	} catch {
		let i = e.substr(t - 2, n + 2);
		return r(t - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${i}`), i;
	}
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/compose-scalar.js
function Ep(e, t, n, r) {
	let { value: i, type: a, comment: o, range: s } = t.type === "block-scalar" ? hp(e, t, r) : vp(t, e.options.strict, r), c = n ? e.directives.tagName(n.source, (e) => r(n, "TAG_RESOLVE_FAILED", e)) : null, l;
	l = e.options.stringKeys && e.atKey ? e.schema[ju] : c ? Dp(e.schema, i, c, n, r) : t.type === "scalar" ? Op(e, i, t, r) : e.schema[ju];
	let u;
	try {
		let a = l.resolve(i, (e) => r(n ?? t, "TAG_RESOLVE_FAILED", e), e.options);
		u = B(a) ? a : new W(a);
	} catch (e) {
		let a = e instanceof Error ? e.message : String(e);
		r(n ?? t, "TAG_RESOLVE_FAILED", a), u = new W(i);
	}
	return u.range = s, u.source = i, a && (u.type = a), c && (u.tag = c), l.format && (u.format = l.format), o && (u.comment = o), u;
}
function Dp(e, t, n, r, i) {
	if (n === "!") return e[ju];
	let a = [];
	for (let t of e.tags) if (!t.collection && t.tag === n) {
		if (t.default && t.test) a.push(t);
		else return t;
	}
	for (let e of a) if (e.test?.test(t)) return e;
	let o = e.knownTags[n];
	return o && !o.collection ? (e.tags.push(Object.assign({}, o, {
		default: !1,
		test: void 0
	})), o) : (i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${n}`, n !== "tag:yaml.org,2002:str"), e[ju]);
}
function Op({ atKey: e, directives: t, schema: n }, r, i, a) {
	let o = n.tags.find((t) => (t.default === !0 || e && t.default === "key") && t.test?.test(r)) || n[ju];
	if (n.compat) {
		let e = n.compat.find((e) => e.default && e.test?.test(r)) ?? n[ju];
		o.tag !== e.tag && a(i, "TAG_RESOLVE_FAILED", `Value may be parsed as either ${t.tagString(o.tag)} or ${t.tagString(e.tag)}`, !0);
	}
	return o;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/util-empty-scalar-position.js
function kp(e, t, n) {
	if (t) {
		n ??= t.length;
		for (let r = n - 1; r >= 0; --r) {
			let n = t[r];
			switch (n.type) {
				case "space":
				case "comment":
				case "newline":
					e -= n.source.length;
					continue;
			}
			for (n = t[++r]; n?.type === "space";) e += n.source.length, n = t[++r];
			break;
		}
	}
	return e;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/compose-node.js
var Ap = {
	composeNode: jp,
	composeEmptyNode: Mp
};
function jp(e, t, n, r) {
	let i = e.atKey, { spaceBefore: a, comment: o, anchor: s, tag: c } = n, l, u = !0;
	switch (t.type) {
		case "alias":
			l = Np(e, t, r), (s || c) && r(t, "ALIAS_PROPS", "An alias node must not specify any properties");
			break;
		case "scalar":
		case "single-quoted-scalar":
		case "double-quoted-scalar":
		case "block-scalar":
			l = Ep(e, t, c, r), s && (l.anchor = s.source.substring(1));
			break;
		case "block-map":
		case "block-seq":
		case "flow-collection":
			try {
				l = mp(Ap, e, t, n, r), s && (l.anchor = s.source.substring(1));
			} catch (e) {
				r(t, "RESOURCE_EXHAUSTION", e instanceof Error ? e.message : String(e));
			}
			break;
		default: r(t, "UNEXPECTED_TOKEN", t.type === "error" ? t.message : `Unsupported token (type: ${t.type})`), u = !1;
	}
	return l ??= Mp(e, t.offset, void 0, null, n, r), s && l.anchor === "" && r(s, "BAD_ALIAS", "Anchor cannot be an empty string"), i && e.options.stringKeys && (!B(l) || typeof l.value != "string" || l.tag && l.tag !== "tag:yaml.org,2002:str") && r(c ?? t, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), a && (l.spaceBefore = !0), o && (t.type === "scalar" && t.source === "" ? l.comment = o : l.commentBefore = o), e.options.keepSourceTokens && u && (l.srcToken = t), l;
}
function Mp(e, t, n, r, { spaceBefore: i, comment: a, anchor: o, tag: s, end: c }, l) {
	let u = Ep(e, {
		type: "scalar",
		offset: kp(t, n, r),
		indent: -1,
		source: ""
	}, s, l);
	return o && (u.anchor = o.source.substring(1), u.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), a && (u.comment = a, u.range[2] = c), u;
}
function Np({ options: e }, { offset: t, source: n, end: r }, i) {
	let a = new td(n.substring(1));
	a.source === "" && i(t, "BAD_ALIAS", "Alias cannot be an empty string"), a.source.endsWith(":") && i(t + n.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
	let o = t + n.length, s = lp(r, o, e.strict, i);
	return a.range = [
		t,
		o,
		s.offset
	], s.comment && (a.comment = s.comment), a;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/compose-doc.js
function Pp(e, t, { offset: n, start: r, value: i, end: a }, o) {
	let s = new Xf(void 0, Object.assign({ _directives: t }, e)), c = {
		atKey: !1,
		atRoot: !0,
		directives: s.directives,
		options: s.options,
		schema: s.schema
	}, l = np(r, {
		indicator: "doc-start",
		next: i ?? a?.[0],
		offset: n,
		onError: o,
		parentIndent: 0,
		startOnNewline: !0
	});
	l.found && (s.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !l.hasNewline && o(l.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), s.contents = i ? jp(c, i, l, o) : Mp(c, l.end, r, null, l, o);
	let u = s.contents.range[2], d = lp(a, u, !1, o);
	return d.comment && (s.comment = d.comment), s.range = [
		n,
		u,
		d.offset
	], s;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/compose/composer.js
function Fp(e) {
	if (typeof e == "number") return [e, e + 1];
	if (Array.isArray(e)) return e.length === 2 ? e : [e[0], e[1]];
	let { offset: t, source: n } = e;
	return [t, t + (typeof n == "string" ? n.length : 1)];
}
function Ip(e) {
	let t = "", n = !1, r = !1;
	for (let i = 0; i < e.length; ++i) {
		let a = e[i];
		switch (a[0]) {
			case "#":
				t += (t === "" ? "" : r ? "\n\n" : "\n") + (a.substring(1) || " "), n = !0, r = !1;
				break;
			case "%":
				e[i + 1]?.[0] !== "#" && (i += 1), n = !1;
				break;
			default: n || (r = !0), n = !1;
		}
	}
	return {
		comment: t,
		afterEmptyLine: r
	};
}
var Lp = class {
	constructor(e = {}) {
		this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (e, t, n, r) => {
			let i = Fp(e);
			r ? this.warnings.push(new ep(i, t, n)) : this.errors.push(new $f(i, t, n));
		}, this.directives = new Ju({ version: e.version || "1.2" }), this.options = e;
	}
	decorate(e, t) {
		let { comment: n, afterEmptyLine: r } = Ip(this.prelude);
		if (n) {
			let i = e.contents;
			if (t) e.comment = e.comment ? `${e.comment}\n${n}` : n;
			else if (r || e.directives.docStart || !i) e.commentBefore = n;
			else if (V(i) && !i.flow && i.items.length > 0) {
				let e = i.items[0];
				z(e) && (e = e.key);
				let t = e.commentBefore;
				e.commentBefore = t ? `${n}\n${t}` : n;
			} else {
				let e = i.commentBefore;
				i.commentBefore = e ? `${n}\n${e}` : n;
			}
		}
		if (t) {
			for (let t = 0; t < this.errors.length; ++t) e.errors.push(this.errors[t]);
			for (let t = 0; t < this.warnings.length; ++t) e.warnings.push(this.warnings[t]);
		} else e.errors = this.errors, e.warnings = this.warnings;
		this.prelude = [], this.errors = [], this.warnings = [];
	}
	streamInfo() {
		return {
			comment: Ip(this.prelude).comment,
			directives: this.directives,
			errors: this.errors,
			warnings: this.warnings
		};
	}
	*compose(e, t = !1, n = -1) {
		for (let t of e) yield* this.next(t);
		yield* this.end(t, n);
	}
	*next(e) {
		switch (e.type) {
			case "directive":
				this.directives.add(e.source, (t, n, r) => {
					let i = Fp(e);
					i[0] += t, this.onError(i, "BAD_DIRECTIVE", n, r);
				}), this.prelude.push(e.source), this.atDirectives = !0;
				break;
			case "document": {
				let t = Pp(this.options, this.directives, e, this.onError);
				this.atDirectives && !t.directives.docStart && this.onError(e, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(t, !1), this.doc && (yield this.doc), this.doc = t, this.atDirectives = !1;
				break;
			}
			case "byte-order-mark":
			case "space": break;
			case "comment":
			case "newline":
				this.prelude.push(e.source);
				break;
			case "error": {
				let t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new $f(Fp(e), "UNEXPECTED_TOKEN", t);
				this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
				break;
			}
			case "doc-end": {
				if (!this.doc) {
					this.errors.push(new $f(Fp(e), "UNEXPECTED_TOKEN", "Unexpected doc-end without preceding document"));
					break;
				}
				this.doc.directives.docEnd = !0;
				let t = lp(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
				if (this.decorate(this.doc, !0), t.comment) {
					let e = this.doc.comment;
					this.doc.comment = e ? `${e}\n${t.comment}` : t.comment;
				}
				this.doc.range[2] = t.offset;
				break;
			}
			default: this.errors.push(new $f(Fp(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
		}
	}
	*end(e = !1, t = -1) {
		if (this.doc) this.decorate(this.doc, !0), yield this.doc, this.doc = null;
		else if (e) {
			let e = new Xf(void 0, Object.assign({ _directives: this.directives }, this.options));
			this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), e.range = [
				0,
				t,
				t
			], this.decorate(e, !1), yield e;
		}
	}
}, Rp = Symbol("break visit"), zp = Symbol("skip children"), Bp = Symbol("remove item");
function Vp(e, t) {
	"type" in e && e.type === "document" && (e = {
		start: e.start,
		value: e.value
	}), Hp(Object.freeze([]), e, t);
}
Vp.BREAK = Rp, Vp.SKIP = zp, Vp.REMOVE = Bp, Vp.itemAtPath = (e, t) => {
	let n = e;
	for (let [e, r] of t) {
		let t = n?.[e];
		if (t && "items" in t) n = t.items[r];
		else return;
	}
	return n;
}, Vp.parentCollection = (e, t) => {
	let n = Vp.itemAtPath(e, t.slice(0, -1)), r = t[t.length - 1][0], i = n?.[r];
	if (i && "items" in i) return i;
	throw Error("Parent collection not found");
};
function Hp(e, t, n) {
	let r = n(t, e);
	if (typeof r == "symbol") return r;
	for (let i of ["key", "value"]) {
		let a = t[i];
		if (a && "items" in a) {
			for (let t = 0; t < a.items.length; ++t) {
				let r = Hp(Object.freeze(e.concat([[i, t]])), a.items[t], n);
				if (typeof r == "number") t = r - 1;
				else if (r === Rp) return Rp;
				else r === Bp && (a.items.splice(t, 1), --t);
			}
			typeof r == "function" && i === "key" && (r = r(t, e));
		}
	}
	return typeof r == "function" ? r(t, e) : r;
}
function Up(e) {
	switch (e) {
		case "﻿": return "byte-order-mark";
		case "": return "doc-mode";
		case "": return "flow-error-end";
		case "": return "scalar";
		case "---": return "doc-start";
		case "...": return "doc-end";
		case "":
		case "\n":
		case "\r\n": return "newline";
		case "-": return "seq-item-ind";
		case "?": return "explicit-key-ind";
		case ":": return "map-value-ind";
		case "{": return "flow-map-start";
		case "}": return "flow-map-end";
		case "[": return "flow-seq-start";
		case "]": return "flow-seq-end";
		case ",": return "comma";
	}
	switch (e[0]) {
		case " ":
		case "	": return "space";
		case "#": return "comment";
		case "%": return "directive-line";
		case "*": return "alias";
		case "&": return "anchor";
		case "!": return "tag";
		case "'": return "single-quoted-scalar";
		case "\"": return "double-quoted-scalar";
		case "|":
		case ">": return "block-scalar-header";
	}
	return null;
}
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/parse/lexer.js
function J(e) {
	switch (e) {
		case void 0:
		case " ":
		case "\n":
		case "\r":
		case "	": return !0;
		default: return !1;
	}
}
var Wp = /* @__PURE__ */ new Set("0123456789ABCDEFabcdef"), Gp = /* @__PURE__ */ new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Kp = /* @__PURE__ */ new Set(",[]{}"), qp = /* @__PURE__ */ new Set(" ,[]{}\n\r	"), Jp = (e) => !e || qp.has(e), Yp = class {
	constructor() {
		this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
	}
	*lex(e, t = !1) {
		if (e) {
			if (typeof e != "string") throw TypeError("source is not a string");
			this.buffer = this.buffer ? this.buffer + e : e, this.lineEndPos = null;
		}
		this.atEnd = !t;
		let n = this.next ?? "stream";
		for (; n && (t || this.hasChars(1));) n = yield* this.parseNext(n);
	}
	atLineEnd() {
		let e = this.pos, t = this.buffer[e];
		for (; t === " " || t === "	";) t = this.buffer[++e];
		return !t || t === "#" || t === "\n" || t === "\r" && this.buffer[e + 1] === "\n";
	}
	charAt(e) {
		return this.buffer[this.pos + e];
	}
	continueScalar(e) {
		let t = this.buffer[e];
		if (this.indentNext > 0) {
			let n = 0;
			for (; t === " ";) t = this.buffer[++n + e];
			if (t === "\r") {
				let t = this.buffer[n + e + 1];
				if (t === "\n" || !t && !this.atEnd) return e + n + 1;
			}
			return t === "\n" || n >= this.indentNext || !t && !this.atEnd ? e + n : -1;
		}
		if (t === "-" || t === ".") {
			let t = this.buffer.substr(e, 3);
			if ((t === "---" || t === "...") && J(this.buffer[e + 3])) return -1;
		}
		return e;
	}
	getLine() {
		let e = this.lineEndPos;
		return (typeof e != "number" || e !== -1 && e < this.pos) && (e = this.buffer.indexOf("\n", this.pos), this.lineEndPos = e), e === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[e - 1] === "\r" && --e, this.buffer.substring(this.pos, e));
	}
	hasChars(e) {
		return this.pos + e <= this.buffer.length;
	}
	setNext(e) {
		return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = e, null;
	}
	peek(e) {
		return this.buffer.substr(this.pos, e);
	}
	*parseNext(e) {
		switch (e) {
			case "stream": return yield* this.parseStream();
			case "line-start": return yield* this.parseLineStart();
			case "block-start": return yield* this.parseBlockStart();
			case "doc": return yield* this.parseDocument();
			case "flow": return yield* this.parseFlowCollection();
			case "quoted-scalar": return yield* this.parseQuotedScalar();
			case "block-scalar": return yield* this.parseBlockScalar();
			case "plain-scalar": return yield* this.parsePlainScalar();
		}
	}
	*parseStream() {
		let e = this.getLine();
		if (e === null) return this.setNext("stream");
		if (e[0] === "﻿" && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
			let t = e.length, n = e.indexOf("#");
			for (; n !== -1;) {
				let r = e[n - 1];
				if (r === " " || r === "	") {
					t = n - 1;
					break;
				}
				n = e.indexOf("#", n + 1);
			}
			for (;;) {
				let n = e[t - 1];
				if (n === " " || n === "	") --t;
				else break;
			}
			let r = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0));
			return yield* this.pushCount(e.length - r), this.pushNewline(), "stream";
		}
		if (this.atLineEnd()) {
			let t = yield* this.pushSpaces(!0);
			return yield* this.pushCount(e.length - t), yield* this.pushNewline(), "stream";
		}
		return yield "", yield* this.parseLineStart();
	}
	*parseLineStart() {
		let e = this.charAt(0);
		if (!e && !this.atEnd) return this.setNext("line-start");
		if (e === "-" || e === ".") {
			if (!this.atEnd && !this.hasChars(4)) return this.setNext("line-start");
			let e = this.peek(3);
			if ((e === "---" || e === "...") && J(this.charAt(3))) return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, e === "---" ? "doc" : "stream";
		}
		return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !J(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
	}
	*parseBlockStart() {
		let [e, t] = this.peek(2);
		if (!t && !this.atEnd) return this.setNext("block-start");
		if ((e === "-" || e === "?" || e === ":") && J(t)) {
			let e = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
			return this.indentNext = this.indentValue + 1, this.indentValue += e, "block-start";
		}
		return "doc";
	}
	*parseDocument() {
		yield* this.pushSpaces(!0);
		let e = this.getLine();
		if (e === null) return this.setNext("doc");
		let t = yield* this.pushIndicators();
		switch (e[t]) {
			case "#": yield* this.pushCount(e.length - t);
			case void 0: return yield* this.pushNewline(), yield* this.parseLineStart();
			case "{":
			case "[": return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
			case "}":
			case "]": return yield* this.pushCount(1), "doc";
			case "*": return yield* this.pushUntil(Jp), "doc";
			case "\"":
			case "'": return yield* this.parseQuotedScalar();
			case "|":
			case ">": return t += yield* this.parseBlockScalarHeader(), t += yield* this.pushSpaces(!0), yield* this.pushCount(e.length - t), yield* this.pushNewline(), yield* this.parseBlockScalar();
			default: return yield* this.parsePlainScalar();
		}
	}
	*parseFlowCollection() {
		let e, t, n = -1;
		do
			e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = n = t) : t = 0, t += yield* this.pushSpaces(!0);
		while (e + t > 0);
		let r = this.getLine();
		if (r === null) return this.setNext("flow");
		if ((n !== -1 && n < this.indentNext && r[0] !== "#" || n === 0 && (r.startsWith("---") || r.startsWith("...")) && J(r[3])) && (n !== this.indentNext - 1 || this.flowLevel !== 1 || r[0] !== "]" && r[0] !== "}")) return this.flowLevel = 0, yield "", yield* this.parseLineStart();
		let i = 0;
		for (; r[i] === ",";) i += yield* this.pushCount(1), i += yield* this.pushSpaces(!0), this.flowKey = !1;
		switch (i += yield* this.pushIndicators(), r[i]) {
			case void 0: return "flow";
			case "#": return yield* this.pushCount(r.length - i), "flow";
			case "{":
			case "[": return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
			case "}":
			case "]": return yield* this.pushCount(1), this.flowKey = !0, --this.flowLevel, this.flowLevel ? "flow" : "doc";
			case "*": return yield* this.pushUntil(Jp), "flow";
			case "\"":
			case "'": return this.flowKey = !0, yield* this.parseQuotedScalar();
			case ":": {
				let e = this.charAt(1);
				if (this.flowKey || J(e) || e === ",") return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
			}
			default: return this.flowKey = !1, yield* this.parsePlainScalar();
		}
	}
	*parseQuotedScalar() {
		let e = this.charAt(0), t = this.buffer.indexOf(e, this.pos + 1);
		if (e === "'") for (; t !== -1 && this.buffer[t + 1] === "'";) t = this.buffer.indexOf("'", t + 2);
		else for (; t !== -1;) {
			let e = 0;
			for (; this.buffer[t - 1 - e] === "\\";) e += 1;
			if (e % 2 == 0) break;
			t = this.buffer.indexOf("\"", t + 1);
		}
		let n = this.buffer.substring(0, t), r = n.indexOf("\n", this.pos);
		if (r !== -1) {
			for (; r !== -1;) {
				let e = this.continueScalar(r + 1);
				if (e === -1) break;
				r = n.indexOf("\n", e);
			}
			r !== -1 && (t = r - (n[r - 1] === "\r" ? 2 : 1));
		}
		if (t === -1) {
			if (!this.atEnd) return this.setNext("quoted-scalar");
			t = this.buffer.length;
		}
		return yield* this.pushToIndex(t + 1, !1), this.flowLevel ? "flow" : "doc";
	}
	*parseBlockScalarHeader() {
		this.blockScalarIndent = -1, this.blockScalarKeep = !1;
		let e = this.pos;
		for (;;) {
			let t = this.buffer[++e];
			if (t === "+") this.blockScalarKeep = !0;
			else if (t > "0" && t <= "9") this.blockScalarIndent = Number(t) - 1;
			else if (t !== "-") break;
		}
		return yield* this.pushUntil((e) => J(e) || e === "#");
	}
	*parseBlockScalar() {
		let e = this.pos - 1, t = 0, n;
		loop: for (let r = this.pos; n = this.buffer[r]; ++r) switch (n) {
			case " ":
				t += 1;
				break;
			case "\n":
				e = r, t = 0;
				break;
			case "\r": {
				let e = this.buffer[r + 1];
				if (!e && !this.atEnd) return this.setNext("block-scalar");
				if (e === "\n") break;
			}
			default: break loop;
		}
		if (!n && !this.atEnd) return this.setNext("block-scalar");
		if (t >= this.indentNext) {
			this.indentNext = this.blockScalarIndent === -1 ? t : this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
			do {
				let t = this.continueScalar(e + 1);
				if (t === -1) break;
				e = this.buffer.indexOf("\n", t);
			} while (e !== -1);
			if (e === -1) {
				if (!this.atEnd) return this.setNext("block-scalar");
				e = this.buffer.length;
			}
		}
		let r = e + 1;
		for (n = this.buffer[r]; n === " ";) n = this.buffer[++r];
		if (n === "	") {
			for (; n === "	" || n === " " || n === "\r" || n === "\n";) n = this.buffer[++r];
			e = r - 1;
		} else if (!this.blockScalarKeep) do {
			let n = e - 1, r = this.buffer[n];
			r === "\r" && (r = this.buffer[--n]);
			let i = n;
			for (; r === " ";) r = this.buffer[--n];
			if (r === "\n" && n >= this.pos && n + 1 + t > i) e = n;
			else break;
		} while (1);
		return yield "", yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
	}
	*parsePlainScalar() {
		let e = this.flowLevel > 0, t = this.pos - 1, n = this.pos - 1, r;
		for (; r = this.buffer[++n];) if (r === ":") {
			let r = this.buffer[n + 1];
			if (J(r) || e && Kp.has(r)) break;
			t = n;
		} else if (J(r)) {
			let i = this.buffer[n + 1];
			if (r === "\r" && (i === "\n" ? (n += 1, r = "\n", i = this.buffer[n + 1]) : t = n), i === "#" || e && Kp.has(i)) break;
			if (r === "\n") {
				let e = this.continueScalar(n + 1);
				if (e === -1) break;
				n = Math.max(n, e - 2);
			}
		} else {
			if (e && Kp.has(r)) break;
			t = n;
		}
		return !r && !this.atEnd ? this.setNext("plain-scalar") : (yield "", yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
	}
	*pushCount(e) {
		return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
	}
	*pushToIndex(e, t) {
		let n = this.buffer.slice(this.pos, e);
		return n ? (yield n, this.pos += n.length, n.length) : (t && (yield ""), 0);
	}
	*pushIndicators() {
		let e = 0;
		loop: for (;;) {
			switch (this.charAt(0)) {
				case "!":
					e += yield* this.pushTag(), e += yield* this.pushSpaces(!0);
					continue loop;
				case "&":
					e += yield* this.pushUntil(Jp), e += yield* this.pushSpaces(!0);
					continue loop;
				case "-":
				case "?":
				case ":": {
					let t = this.flowLevel > 0, n = this.charAt(1);
					if (J(n) || t && Kp.has(n)) {
						t ? this.flowKey &&= !1 : this.indentNext = this.indentValue + 1, e += yield* this.pushCount(1), e += yield* this.pushSpaces(!0);
						continue loop;
					}
				}
			}
			break loop;
		}
		return e;
	}
	*pushTag() {
		if (this.charAt(1) === "<") {
			let e = this.pos + 2, t = this.buffer[e];
			for (; !J(t) && t !== ">";) t = this.buffer[++e];
			return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
		}
		{
			let e = this.pos + 1, t = this.buffer[e];
			for (; t;) if (Gp.has(t)) t = this.buffer[++e];
			else if (t === "%" && Wp.has(this.buffer[e + 1]) && Wp.has(this.buffer[e + 2])) t = this.buffer[e += 3];
			else break;
			return yield* this.pushToIndex(e, !1);
		}
	}
	*pushNewline() {
		let e = this.buffer[this.pos];
		return e === "\n" ? yield* this.pushCount(1) : e === "\r" && this.charAt(1) === "\n" ? yield* this.pushCount(2) : 0;
	}
	*pushSpaces(e) {
		let t = this.pos - 1, n;
		do
			n = this.buffer[++t];
		while (n === " " || e && n === "	");
		let r = t - this.pos;
		return r > 0 && (yield this.buffer.substr(this.pos, r), this.pos = t), r;
	}
	*pushUntil(e) {
		let t = this.pos, n = this.buffer[t];
		for (; !e(n);) n = this.buffer[++t];
		return yield* this.pushToIndex(t, !1);
	}
}, Xp = class {
	constructor() {
		this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
			let t = 0, n = this.lineStarts.length;
			for (; t < n;) {
				let r = t + n >> 1;
				this.lineStarts[r] < e ? t = r + 1 : n = r;
			}
			if (this.lineStarts[t] === e) return {
				line: t + 1,
				col: 1
			};
			if (t === 0) return {
				line: 0,
				col: e
			};
			let r = this.lineStarts[t - 1];
			return {
				line: t,
				col: e - r + 1
			};
		};
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/parse/parser.js
function Zp(e, t) {
	for (let n = 0; n < e.length; ++n) if (e[n].type === t) return !0;
	return !1;
}
function Qp(e) {
	for (let t = 0; t < e.length; ++t) switch (e[t].type) {
		case "space":
		case "comment":
		case "newline": break;
		default: return t;
	}
	return -1;
}
function $p(e) {
	switch (e?.type) {
		case "alias":
		case "scalar":
		case "single-quoted-scalar":
		case "double-quoted-scalar":
		case "flow-collection": return !0;
		default: return !1;
	}
}
function em(e) {
	switch (e.type) {
		case "document": return e.start;
		case "block-map": {
			let t = e.items[e.items.length - 1];
			return t.sep ?? t.start;
		}
		case "block-seq": return e.items[e.items.length - 1].start;
		/* istanbul ignore next should not happen */
		default: return [];
	}
}
function tm(e) {
	if (e.length === 0) return [];
	let t = e.length;
	loop: for (; --t >= 0;) switch (e[t].type) {
		case "doc-start":
		case "explicit-key-ind":
		case "map-value-ind":
		case "seq-item-ind":
		case "newline": break loop;
	}
	for (; e[++t]?.type === "space";);
	return e.splice(t, e.length);
}
function nm(e, t) {
	if (t.length < 1e5) Array.prototype.push.apply(e, t);
	else for (let n = 0; n < t.length; ++n) e.push(t[n]);
}
function rm(e) {
	if (e.start.type === "flow-seq-start") for (let t of e.items) t.sep && !t.value && !Zp(t.start, "explicit-key-ind") && !Zp(t.sep, "map-value-ind") && (t.key && (t.value = t.key), delete t.key, $p(t.value) ? t.value.end ? nm(t.value.end, t.sep) : t.value.end = t.sep : nm(t.start, t.sep), delete t.sep);
}
var im = class {
	constructor(e) {
		this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Yp(), this.onNewLine = e;
	}
	*parse(e, t = !1) {
		this.onNewLine && this.offset === 0 && this.onNewLine(0);
		for (let n of this.lexer.lex(e, t)) yield* this.next(n);
		t || (yield* this.end());
	}
	*next(e) {
		if (this.source = e, this.atScalar) {
			this.atScalar = !1, yield* this.step(), this.offset += e.length;
			return;
		}
		let t = Up(e);
		if (!t) {
			let t = `Not a YAML token: ${e}`;
			yield* this.pop({
				type: "error",
				offset: this.offset,
				message: t,
				source: e
			}), this.offset += e.length;
		} else if (t === "scalar") this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
		else {
			switch (this.type = t, yield* this.step(), t) {
				case "newline":
					this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + e.length);
					break;
				case "space":
					this.atNewLine && e[0] === " " && (this.indent += e.length);
					break;
				case "explicit-key-ind":
				case "map-value-ind":
				case "seq-item-ind":
					this.atNewLine && (this.indent += e.length);
					break;
				case "doc-mode":
				case "flow-error-end": return;
				default: this.atNewLine = !1;
			}
			this.offset += e.length;
		}
	}
	*end() {
		for (; this.stack.length > 0;) yield* this.pop();
	}
	get sourceToken() {
		return {
			type: this.type,
			offset: this.offset,
			indent: this.indent,
			source: this.source
		};
	}
	*step() {
		let e = this.peek(1);
		if (this.type === "doc-end" && e?.type !== "doc-end") {
			for (; this.stack.length > 0;) yield* this.pop();
			this.stack.push({
				type: "doc-end",
				offset: this.offset,
				source: this.source
			});
		} else {
			if (!e) return yield* this.stream();
			switch (e.type) {
				case "document": return yield* this.document(e);
				case "alias":
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": return yield* this.scalar(e);
				case "block-scalar": return yield* this.blockScalar(e);
				case "block-map": return yield* this.blockMap(e);
				case "block-seq": return yield* this.blockSequence(e);
				case "flow-collection": return yield* this.flowCollection(e);
				case "doc-end": return yield* this.documentEnd(e);
			}
			/* istanbul ignore next should not happen */
			yield* this.pop();
		}
	}
	peek(e) {
		return this.stack[this.stack.length - e];
	}
	*pop(e) {
		let t = e ?? this.stack.pop();
		/* istanbul ignore if should not happen */
		if (!t) yield {
			type: "error",
			offset: this.offset,
			source: "",
			message: "Tried to pop an empty stack"
		};
		else if (this.stack.length === 0) yield t;
		else {
			let e = this.peek(1);
			switch (t.type === "block-scalar" ? t.indent = "indent" in e ? e.indent : 0 : t.type === "flow-collection" && e.type === "document" && (t.indent = 0), t.type === "flow-collection" && rm(t), e.type) {
				case "document":
					e.value = t;
					break;
				case "block-scalar":
					e.props.push(t);
					break;
				case "block-map": {
					let n = e.items[e.items.length - 1];
					if (n.value) {
						e.items.push({
							start: [],
							key: t,
							sep: []
						}), this.onKeyLine = !0;
						return;
					}
					if (n.sep) n.value = t;
					else {
						Object.assign(n, {
							key: t,
							sep: []
						}), this.onKeyLine = !n.explicitKey;
						return;
					}
					break;
				}
				case "block-seq": {
					let n = e.items[e.items.length - 1];
					n.value ? e.items.push({
						start: [],
						value: t
					}) : n.value = t;
					break;
				}
				case "flow-collection": {
					let n = e.items[e.items.length - 1];
					!n || n.value ? e.items.push({
						start: [],
						key: t,
						sep: []
					}) : n.sep ? n.value = t : Object.assign(n, {
						key: t,
						sep: []
					});
					return;
				}
				/* istanbul ignore next should not happen */
				default: yield* this.pop(), yield* this.pop(t);
			}
			if ((e.type === "document" || e.type === "block-map" || e.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
				let n = t.items[t.items.length - 1];
				n && !n.sep && !n.value && n.start.length > 0 && Qp(n.start) === -1 && (t.indent === 0 || n.start.every((e) => e.type !== "comment" || e.indent < t.indent)) && (e.type === "document" ? e.end = n.start : e.items.push({ start: n.start }), t.items.splice(-1, 1));
			}
		}
	}
	*stream() {
		switch (this.type) {
			case "directive-line":
				yield {
					type: "directive",
					offset: this.offset,
					source: this.source
				};
				return;
			case "byte-order-mark":
			case "space":
			case "comment":
			case "newline":
				yield this.sourceToken;
				return;
			case "doc-mode":
			case "doc-start": {
				let e = {
					type: "document",
					offset: this.offset,
					start: []
				};
				this.type === "doc-start" && e.start.push(this.sourceToken), this.stack.push(e);
				return;
			}
		}
		yield {
			type: "error",
			offset: this.offset,
			message: `Unexpected ${this.type} token in YAML stream`,
			source: this.source
		};
	}
	*document(e) {
		if (e.value) return yield* this.lineEnd(e);
		switch (this.type) {
			case "doc-start":
				Qp(e.start) === -1 ? e.start.push(this.sourceToken) : (yield* this.pop(), yield* this.step());
				return;
			case "anchor":
			case "tag":
			case "space":
			case "comment":
			case "newline":
				e.start.push(this.sourceToken);
				return;
		}
		let t = this.startBlockValue(e);
		t ? this.stack.push(t) : yield {
			type: "error",
			offset: this.offset,
			message: `Unexpected ${this.type} token in YAML document`,
			source: this.source
		};
	}
	*scalar(e) {
		if (this.type === "map-value-ind") {
			let t = tm(em(this.peek(2))), n;
			e.end ? (n = e.end, n.push(this.sourceToken), delete e.end) : n = [this.sourceToken];
			let r = {
				type: "block-map",
				offset: e.offset,
				indent: e.indent,
				items: [{
					start: t,
					key: e,
					sep: n
				}]
			};
			this.onKeyLine = !0, this.stack[this.stack.length - 1] = r;
		} else yield* this.lineEnd(e);
	}
	*blockScalar(e) {
		switch (this.type) {
			case "space":
			case "comment":
			case "newline":
				e.props.push(this.sourceToken);
				return;
			case "scalar":
				if (e.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
					let e = this.source.indexOf("\n") + 1;
					for (; e !== 0;) this.onNewLine(this.offset + e), e = this.source.indexOf("\n", e) + 1;
				}
				yield* this.pop();
				break;
			/* istanbul ignore next should not happen */
			default: yield* this.pop(), yield* this.step();
		}
	}
	*blockMap(e) {
		let t = e.items[e.items.length - 1];
		switch (this.type) {
			case "newline":
				if (this.onKeyLine = !1, t.value) {
					let n = "end" in t.value ? t.value.end : void 0;
					(Array.isArray(n) ? n[n.length - 1] : void 0)?.type === "comment" ? n?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
				} else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
				return;
			case "space":
			case "comment":
				if (t.value) e.items.push({ start: [this.sourceToken] });
				else if (t.sep) t.sep.push(this.sourceToken);
				else {
					if (this.atIndentedComment(t.start, e.indent)) {
						let n = e.items[e.items.length - 2]?.value?.end;
						if (Array.isArray(n)) {
							nm(n, t.start), n.push(this.sourceToken), e.items.pop();
							return;
						}
					}
					t.start.push(this.sourceToken);
				}
				return;
		}
		if (this.indent >= e.indent) {
			let n = !this.onKeyLine && this.indent === e.indent, r = n && (t.sep || t.explicitKey) && this.type !== "seq-item-ind", i = [];
			if (r && t.sep && !t.value) {
				let n = [];
				for (let r = 0; r < t.sep.length; ++r) {
					let i = t.sep[r];
					switch (i.type) {
						case "newline":
							n.push(r);
							break;
						case "space": break;
						case "comment":
							i.indent > e.indent && (n.length = 0);
							break;
						default: n.length = 0;
					}
				}
				n.length >= 2 && (i = t.sep.splice(n[1]));
			}
			switch (this.type) {
				case "anchor":
				case "tag":
					r || t.value ? (i.push(this.sourceToken), e.items.push({ start: i }), this.onKeyLine = !0) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
					return;
				case "explicit-key-ind":
					!t.sep && !t.explicitKey ? (t.start.push(this.sourceToken), t.explicitKey = !0) : r || t.value ? (i.push(this.sourceToken), e.items.push({
						start: i,
						explicitKey: !0
					})) : this.stack.push({
						type: "block-map",
						offset: this.offset,
						indent: this.indent,
						items: [{
							start: [this.sourceToken],
							explicitKey: !0
						}]
					}), this.onKeyLine = !0;
					return;
				case "map-value-ind":
					if (t.explicitKey) {
						if (!t.sep) {
							if (Zp(t.start, "newline")) Object.assign(t, {
								key: null,
								sep: [this.sourceToken]
							});
							else {
								let e = tm(t.start);
								this.stack.push({
									type: "block-map",
									offset: this.offset,
									indent: this.indent,
									items: [{
										start: e,
										key: null,
										sep: [this.sourceToken]
									}]
								});
							}
						} else if (t.value) e.items.push({
							start: [],
							key: null,
							sep: [this.sourceToken]
						});
						else if (Zp(t.sep, "map-value-ind")) this.stack.push({
							type: "block-map",
							offset: this.offset,
							indent: this.indent,
							items: [{
								start: i,
								key: null,
								sep: [this.sourceToken]
							}]
						});
						else if ($p(t.key) && !Zp(t.sep, "newline")) {
							let e = tm(t.start), n = t.key, r = t.sep;
							r.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
								type: "block-map",
								offset: this.offset,
								indent: this.indent,
								items: [{
									start: e,
									key: n,
									sep: r
								}]
							});
						} else i.length > 0 ? t.sep = t.sep.concat(i, this.sourceToken) : t.sep.push(this.sourceToken);
					} else t.sep ? t.value || r ? e.items.push({
						start: i,
						key: null,
						sep: [this.sourceToken]
					}) : Zp(t.sep, "map-value-ind") ? this.stack.push({
						type: "block-map",
						offset: this.offset,
						indent: this.indent,
						items: [{
							start: [],
							key: null,
							sep: [this.sourceToken]
						}]
					}) : t.sep.push(this.sourceToken) : Object.assign(t, {
						key: null,
						sep: [this.sourceToken]
					});
					this.onKeyLine = !0;
					return;
				case "alias":
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": {
					let n = this.flowScalar(this.type);
					r || t.value ? (e.items.push({
						start: i,
						key: n,
						sep: []
					}), this.onKeyLine = !0) : t.sep ? this.stack.push(n) : (Object.assign(t, {
						key: n,
						sep: []
					}), this.onKeyLine = !0);
					return;
				}
				default: {
					let r = this.startBlockValue(e);
					if (r) {
						if (r.type === "block-seq") {
							if (!t.explicitKey && t.sep && !Zp(t.sep, "newline")) {
								yield* this.pop({
									type: "error",
									offset: this.offset,
									message: "Unexpected block-seq-ind on same line with key",
									source: this.source
								});
								return;
							}
						} else n && e.items.push({ start: i });
						this.stack.push(r);
						return;
					}
				}
			}
		}
		yield* this.pop(), yield* this.step();
	}
	*blockSequence(e) {
		let t = e.items[e.items.length - 1];
		switch (this.type) {
			case "newline":
				if (t.value) {
					let n = "end" in t.value ? t.value.end : void 0;
					(Array.isArray(n) ? n[n.length - 1] : void 0)?.type === "comment" ? n?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
				} else t.start.push(this.sourceToken);
				return;
			case "space":
			case "comment":
				if (t.value) e.items.push({ start: [this.sourceToken] });
				else {
					if (this.atIndentedComment(t.start, e.indent)) {
						let n = e.items[e.items.length - 2]?.value?.end;
						if (Array.isArray(n)) {
							nm(n, t.start), n.push(this.sourceToken), e.items.pop();
							return;
						}
					}
					t.start.push(this.sourceToken);
				}
				return;
			case "anchor":
			case "tag":
				if (t.value || this.indent <= e.indent) break;
				t.start.push(this.sourceToken);
				return;
			case "seq-item-ind":
				if (this.indent !== e.indent) break;
				t.value || Zp(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
				return;
		}
		if (this.indent > e.indent) {
			let t = this.startBlockValue(e);
			if (t) {
				this.stack.push(t);
				return;
			}
		}
		yield* this.pop(), yield* this.step();
	}
	*flowCollection(e) {
		let t = e.items[e.items.length - 1];
		if (this.type === "flow-error-end") {
			let e;
			do
				yield* this.pop(), e = this.peek(1);
			while (e?.type === "flow-collection");
		} else if (e.end.length === 0) {
			switch (this.type) {
				case "comma":
				case "explicit-key-ind":
					!t || t.sep ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
					return;
				case "map-value-ind":
					!t || t.value ? e.items.push({
						start: [],
						key: null,
						sep: [this.sourceToken]
					}) : t.sep ? t.sep.push(this.sourceToken) : Object.assign(t, {
						key: null,
						sep: [this.sourceToken]
					});
					return;
				case "space":
				case "comment":
				case "newline":
				case "anchor":
				case "tag":
					!t || t.value ? e.items.push({ start: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
					return;
				case "alias":
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": {
					let n = this.flowScalar(this.type);
					!t || t.value ? e.items.push({
						start: [],
						key: n,
						sep: []
					}) : t.sep ? this.stack.push(n) : Object.assign(t, {
						key: n,
						sep: []
					});
					return;
				}
				case "flow-map-end":
				case "flow-seq-end":
					e.end.push(this.sourceToken);
					return;
			}
			let n = this.startBlockValue(e);
			/* istanbul ignore else should not happen */
			n ? this.stack.push(n) : (yield* this.pop(), yield* this.step());
		} else {
			let t = this.peek(2);
			if (t.type === "block-map" && (this.type === "map-value-ind" && t.indent === e.indent || this.type === "newline" && !t.items[t.items.length - 1].sep)) yield* this.pop(), yield* this.step();
			else if (this.type === "map-value-ind" && t.type !== "flow-collection") {
				let n = tm(em(t));
				rm(e);
				let r = e.end.splice(1, e.end.length);
				r.push(this.sourceToken);
				let i = {
					type: "block-map",
					offset: e.offset,
					indent: e.indent,
					items: [{
						start: n,
						key: e,
						sep: r
					}]
				};
				this.onKeyLine = !0, this.stack[this.stack.length - 1] = i;
			} else yield* this.lineEnd(e);
		}
	}
	flowScalar(e) {
		if (this.onNewLine) {
			let e = this.source.indexOf("\n") + 1;
			for (; e !== 0;) this.onNewLine(this.offset + e), e = this.source.indexOf("\n", e) + 1;
		}
		return {
			type: e,
			offset: this.offset,
			indent: this.indent,
			source: this.source
		};
	}
	startBlockValue(e) {
		switch (this.type) {
			case "alias":
			case "scalar":
			case "single-quoted-scalar":
			case "double-quoted-scalar": return this.flowScalar(this.type);
			case "block-scalar-header": return {
				type: "block-scalar",
				offset: this.offset,
				indent: this.indent,
				props: [this.sourceToken],
				source: ""
			};
			case "flow-map-start":
			case "flow-seq-start": return {
				type: "flow-collection",
				offset: this.offset,
				indent: this.indent,
				start: this.sourceToken,
				items: [],
				end: []
			};
			case "seq-item-ind": return {
				type: "block-seq",
				offset: this.offset,
				indent: this.indent,
				items: [{ start: [this.sourceToken] }]
			};
			case "explicit-key-ind": {
				this.onKeyLine = !0;
				let t = tm(em(e));
				return t.push(this.sourceToken), {
					type: "block-map",
					offset: this.offset,
					indent: this.indent,
					items: [{
						start: t,
						explicitKey: !0
					}]
				};
			}
			case "map-value-ind": {
				this.onKeyLine = !0;
				let t = tm(em(e));
				return {
					type: "block-map",
					offset: this.offset,
					indent: this.indent,
					items: [{
						start: t,
						key: null,
						sep: [this.sourceToken]
					}]
				};
			}
		}
		return null;
	}
	atIndentedComment(e, t) {
		return this.type !== "comment" || this.indent <= t ? !1 : e.every((e) => e.type === "newline" || e.type === "space");
	}
	*documentEnd(e) {
		this.type !== "doc-mode" && (e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
	}
	*lineEnd(e) {
		switch (this.type) {
			case "comma":
			case "doc-start":
			case "doc-end":
			case "flow-seq-end":
			case "flow-map-end":
			case "map-value-ind":
				yield* this.pop(), yield* this.step();
				break;
			case "newline": this.onKeyLine = !1;
			default: e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
		}
	}
};
// ../../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/browser/dist/public-api.js
function am(e) {
	let t = e.prettyErrors !== !1;
	return {
		lineCounter: e.lineCounter || t && new Xp() || null,
		prettyErrors: t
	};
}
function om(e, t = {}) {
	let { lineCounter: n, prettyErrors: r } = am(t), i = new im(n?.addNewLine), a = new Lp(t), o = null;
	for (let t of a.compose(i.parse(e), !0, e.length)) if (!o) o = t;
	else if (o.options.logLevel !== "silent") {
		o.errors.push(new $f(t.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
		break;
	}
	return r && n && (o.errors.forEach(tp(e, n)), o.warnings.forEach(tp(e, n))), o;
}
function sm(e, t, n) {
	let r;
	typeof t == "function" ? r = t : n === void 0 && t && typeof t == "object" && (n = t);
	let i = om(e, n);
	if (!i) return null;
	if (i.warnings.forEach((e) => Nd(i.options.logLevel, e)), i.errors.length > 0) {
		if (i.options.logLevel !== "silent") throw i.errors[0];
		i.errors = [];
	}
	return i.toJS(Object.assign({ reviver: r }, n));
}
// ../parse/dist/index.js
var cm = /^<img((?:\s+[a-z][a-z0-9-]*(?:\s*=\s*(?:"[^"<>]*"|'[^'<>]*'|[^\s"'=<>`]+))?)*)\s*\/?>$/i, lm = /([a-z][a-z0-9-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gi, um = /^(\d+(?:\.\d+)?)(?:px)?$/, dm = {
	"&amp;": "&",
	"&quot;": "\"",
	"&#39;": "'",
	"&lt;": "<",
	"&gt;": ">"
}, fm = (e) => e.replace(/&(?:amp|quot|#39|lt|gt);/g, (e) => dm[e]);
function pm(e) {
	let t = e && um.exec(e.trim()), n = t ? Number(t[1]) : 0;
	return n > 0 ? n : void 0;
}
function mm(e) {
	let t = cm.exec(e.trim());
	if (!t) return;
	let n = /* @__PURE__ */ new Map();
	for (let [, e, ...r] of t[1].matchAll(lm)) {
		let t = e.toLowerCase();
		n.has(t) || n.set(t, fm(r.find((e) => e != null) ?? ""));
	}
	let r = n.get("src")?.trim();
	if (r) return {
		src: r,
		alt: n.get("alt") ?? "",
		width: pm(n.get("width")),
		height: pm(n.get("height"))
	};
}
function hm(e) {
	let t = mm(e.value);
	if (!t) return;
	let n = {
		...t.width && { width: t.width },
		...t.height && { height: t.height }
	};
	return {
		type: "image",
		url: t.src,
		alt: t.alt,
		data: {
			...n,
			hProperties: n
		}
	};
}
var gm = /* @__PURE__ */ new Set([
	"root",
	"listItem",
	"blockquote",
	"footnoteDefinition"
]);
function _m() {
	let e = (t) => {
		if (!("children" in t)) return;
		let n = t;
		n.children = n.children.map((t) => {
			if (t.type !== "html") return e(t), t;
			let r = hm(t);
			return r ? gm.has(n.type) ? {
				type: "paragraph",
				children: [r]
			} : r : t;
		});
	};
	return (t) => e(t);
}
var vm = 61, ym = 2, bm = /* @__PURE__ */ new WeakMap();
function xm() {
	let e = {
		name: "mark",
		tokenize: Cm,
		resolveAll: Sm
	};
	return {
		text: { [vm]: e },
		insideSpan: { null: [e] },
		attentionMarkers: { null: [vm] }
	};
}
var Sm = (e, t) => {
	for (let n = 0; n < e.length; n += 1) {
		let r = e[n][1];
		if (e[n][0] === "enter" && r.type === "markSequenceTemporary" && bm.get(r)?.close) for (let i = n - 1; i >= 0; --i) {
			let a = e[i][1];
			if (e[i][0] !== "exit" || a.type !== "markSequenceTemporary" || !bm.get(a)?.open) continue;
			a.type = "markSequence", r.type = "markSequence";
			let o = {
				type: "mark",
				start: { ...a.start },
				end: { ...r.end }
			}, s = {
				type: "markText",
				start: { ...a.end },
				end: { ...r.start }
			}, c = [
				[
					"enter",
					o,
					t
				],
				[
					"enter",
					a,
					t
				],
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				]
			], l = t.parser.constructs.insideSpan.null;
			l && M(c, c.length, 0, Yo(l, e.slice(i + 1, n), t)), M(c, c.length, 0, [
				[
					"exit",
					s,
					t
				],
				[
					"enter",
					r,
					t
				],
				[
					"exit",
					r,
					t
				],
				[
					"exit",
					o,
					t
				]
			]), M(e, i - 1, n - i + 3, c), n = i + c.length - 2;
			break;
		}
	}
	for (let [, t] of e) t.type === "markSequenceTemporary" && (t.type = "data");
	return e;
}, Cm = function(e, t, n) {
	let { previous: r, events: i } = this, a = 0, o = (i) => {
		if (i === vm) return a > 1 ? n(i) : (e.consume(i), a += 1, o);
		if (a < 2) return n(i);
		let s = e.exit("markSequenceTemporary"), c = Hi(r), l = Hi(i);
		return bm.set(s, {
			open: !l || l === ym && !!c,
			close: !c || c === ym && !!l
		}), t(i);
	};
	return (t) => r === vm && i.at(-1)?.[1].type !== "characterEscape" ? n(t) : (e.enter("markSequenceTemporary"), o(t));
};
function wm() {
	return {
		canContainEols: ["mark"],
		enter: { mark(e) {
			this.enter({
				type: "mark",
				children: []
			}, e);
		} },
		exit: { mark(e) {
			this.exit(e);
		} }
	};
}
var Tm = function() {
	let e = this.data();
	(e.micromarkExtensions ??= []).push(xm()), (e.fromMarkdownExtensions ??= []).push(wm());
};
function Em(e, t) {
	if ("children" in e) {
		for (let n of e.children) Em(n, t);
		t(e);
	}
}
function Dm() {
	return (e) => {
		let t = /* @__PURE__ */ new Map();
		Em(e, (e) => {
			for (let n of e.children) n.type === "definition" && t.set(n.identifier, n);
		}), Em(e, (e) => {
			e.children = e.children.flatMap((e) => {
				if (e.type === "linkReference") {
					let n = t.get(e.identifier);
					return n ? [{
						type: "link",
						url: n.url,
						title: n.title,
						children: e.children
					}] : e.children;
				}
				if (e.type === "imageReference") {
					let n = t.get(e.identifier);
					return n ? [{
						type: "image",
						url: n.url,
						title: n.title,
						alt: e.alt
					}] : [{
						type: "text",
						value: e.alt ?? ""
					}];
				}
				return [e];
			});
		});
	};
}
function Om(e, t = {}) {
	let n = km("root", t.title ? [{
		type: "text",
		value: t.title
	}] : []), r = [{
		depth: 0,
		node: n
	}];
	for (let t of e.children) if (t.type === "heading") {
		for (; r.length > 1 && r.at(-1).depth >= t.depth;) r.pop();
		let e = km("heading", t.children, t);
		e.data.depth = t.depth, r.at(-1).node.children.push(e), r.push({
			depth: t.depth,
			node: e
		});
	} else Am(r.at(-1).node, t);
	return t.title || (n = Pm(n)), ae(n);
}
function km(e, t, n) {
	let { content: r, directives: i } = Lm(t), a = {
		id: "",
		type: e,
		content: r,
		notes: [],
		data: {},
		children: []
	};
	i.has("fold") && (a.data.fold = !0), i.has("foldAll") && (a.data.foldAll = !0);
	let o = n?.position?.start.offset, s = n?.position?.end.offset;
	return o != null && s != null && (a.position = {
		start: o,
		end: s
	}), a;
}
function Am(e, t) {
	switch (t.type) {
		case "list":
			jm(e, t);
			return;
		case "html":
		case "yaml":
		case "definition": return;
		default: Nm(e, t);
	}
}
function jm(e, t) {
	for (let n of t.children) e.children.push(Mm(n, t));
}
function Mm(e, t) {
	let [n, ...r] = e.children, i = n?.type === "paragraph" || n?.type === "heading", a = km("listItem", i ? n.children : [], e);
	t.ordered && (a.data.ordered = !0), e.checked != null && (a.data.checked = e.checked);
	for (let t of i ? r : e.children) Am(a, t);
	return a;
}
function Nm(e, t) {
	let n = {
		block: Fm(t),
		after: e.children.length
	};
	e.notes.push(n);
}
function Pm(e) {
	let [t] = e.children;
	return e.children.length !== 1 || t.type !== "heading" || t.data.depth !== 1 ? e : (t.notes = [...e.notes.map((e) => ({
		...e,
		after: 0
	})), ...t.notes], t);
}
function Fm(e) {
	if (Array.isArray(e)) return e.map(Fm);
	if (e && typeof e == "object") {
		let t = {};
		for (let [n, r] of Object.entries(e)) n !== "position" && (t[n] = Fm(r));
		return t;
	}
	return e;
}
var Im = /^<!--\s*markmap:\s*([\s\S]*?)\s*-->$/;
function Lm(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => e.flatMap((e) => {
		if (e.type === "html") {
			let n = e.value.trim().match(Im);
			for (let e of n?.[1].split(/\s+/) ?? []) e && t.add(e);
			return [];
		}
		return "children" in e ? [{
			...e,
			children: n(e.children)
		}] : [e];
	}), r = Fm(n(e)), i = r.at(-1);
	return i?.type === "text" && (i.value = i.value.trimEnd(), i.value || r.pop()), {
		content: r,
		directives: t
	};
}
function Rm(e, t = {}) {
	let { mdast: n, gfm: r } = zm(e, t.plugins ?? []), i = Bm(n);
	return {
		root: Om(n, { title: typeof i.title == "string" ? i.title : void 0 }),
		frontmatter: i,
		gfm: r
	};
}
function zm(e, t, n = !0) {
	let r = _u().use(Wl).use(n ? [tl] : []).use(Sr, ["yaml"]).use(_m).use(Tm).use(Dm).use(t);
	try {
		return {
			mdast: r.runSync(r.parse(e)),
			gfm: n
		};
	} catch (r) {
		if (!n || !(r instanceof SyntaxError)) throw r;
		return zm(e, t, !1);
	}
}
function Bm(e) {
	let t = e.children.find((e) => e.type === "yaml");
	if (!t) return {};
	try {
		let e = sm(t.value);
		return e && typeof e == "object" && !Array.isArray(e) ? e : {};
	} catch {
		return {};
	}
}
// ../toolbar/dist/index.js
var Vm = "http://www.w3.org/2000/svg", Hm = {
	"zoom-in": {
		label: "Zoom in",
		icon: "M8 3v10M3 8h10",
		disabled: (e) => !e.result || Gm(e.transform.k, e.scaleLimits[1]),
		onClick: (e) => {
			e.zoomIn();
		}
	},
	"zoom-out": {
		label: "Zoom out",
		icon: "M3 8h10",
		disabled: (e) => !e.result || Gm(e.transform.k, e.scaleLimits[0]),
		onClick: (e) => {
			e.zoomOut();
		}
	},
	fit: {
		label: "Fit to view",
		icon: "M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4",
		disabled: (e) => !e.result,
		onClick: (e) => {
			e.fit();
		}
	},
	"expand-all": {
		label: "Expand all",
		icon: "M4 6l4-4 4 4M4 10l4 4 4-4",
		disabled: (e) => !e.foldedIds.size,
		onClick: (e) => {
			e.expandAll();
		}
	}
}, Um = [
	"zoom-in",
	"zoom-out",
	"fit",
	"expand-all",
	"fold-level"
], Wm = "\n.markmap-toolbar {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  padding: 3px;\n  border: 1px solid color-mix(in srgb, var(--mm-text, #333) 20%, transparent);\n  border-radius: 6px;\n  background: var(--mm-bg, #fff);\n  color: var(--mm-text, #333);\n  font: 13px system-ui, sans-serif;\n}\n.markmap-toolbar button, .markmap-toolbar select {\n  height: 26px;\n  border: 0;\n  border-radius: 4px;\n  background: none;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n}\n.markmap-toolbar button { min-width: 26px; padding: 0 5px; }\n.markmap-toolbar button:hover:enabled, .markmap-toolbar select:hover:enabled {\n  background: color-mix(in srgb, var(--mm-text, #333) 12%, transparent);\n}\n.markmap-toolbar button:disabled, .markmap-toolbar select:disabled { opacity: 0.35; cursor: default; }\n.markmap-toolbar :focus-visible { outline: 2px solid var(--mm-link, #0097e6); outline-offset: -2px; }\n.markmap-toolbar option { background: Canvas; color: CanvasText; }\n.markmap-toolbar img { display: block; margin: auto; width: 16px; height: 16px; }\n.markmap-toolbar svg { display: block; margin: auto; width: 16px; height: 16px; }\n.markmap-toolbar path { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }\n", Gm = (e, t) => Math.abs(e / t - 1) < 1e-6;
function Km(e, t) {
	let n = e.createElementNS(Vm, "svg");
	n.setAttribute("viewBox", "0 0 16 16"), n.setAttribute("aria-hidden", "true");
	let r = e.createElementNS(Vm, "path");
	return r.setAttribute("d", t), n.append(r), n;
}
function qm(e, t) {
	let n = e.createElement("img");
	return n.src = t, n.alt = "", n;
}
function Jm(e, t = 0) {
	return e?.children.length ? Math.max(t, ...e.children.map((e) => Jm(e, t + 1))) : 0;
}
function Ym(e, t = {}) {
	let n = e.element.ownerDocument, r = n.createElement("div");
	r.className = `markmap-toolbar ${e.themeClass}`, r.setAttribute("role", "toolbar"), r.setAttribute("aria-label", "Map controls"), r.setAttribute("part", "toolbar");
	let i = n.createElement("style");
	i.textContent = Wm, r.append(i);
	let a = [], o, s = () => {
		for (let { el: t, item: n } of a) t.disabled = n.disabled?.(e) ?? !1;
	}, c = () => {
		if (!o) return;
		let t = Jm(e.tree);
		if (o.disabled = !t, o.options.length === t + 1) return;
		let r = Array.from({ length: t + 1 }, (e, t) => {
			let r = n.createElement("option");
			return r.value = t ? `${t}` : "", r.textContent = t ? `${t}` : "Level", r;
		});
		o.replaceChildren(...r);
	}, l = () => {
		s(), c();
	};
	for (let i of t.items ?? Um) {
		if (i === "fold-level") {
			let t = n.createElement("select");
			t.title = "Fold to level", t.setAttribute("aria-label", t.title), t.addEventListener("change", () => {
				t.value && e.foldToLevel(Number(t.value)), t.value = "";
			}), o = t, r.append(t);
			continue;
		}
		let t = typeof i == "string" ? Hm[i] : i, s = n.createElement("button");
		s.type = "button", s.title = t.label, s.setAttribute("aria-label", t.label), t.image ? s.append(qm(n, t.image)) : t.icon ? s.append(Km(n, t.icon)) : s.textContent = t.label, s.addEventListener("click", () => {
			t.onClick(e), l();
		}), a.push({
			el: s,
			item: t
		}), r.append(s);
	}
	let u = [
		e.on("zoom", s),
		e.on("fold", s),
		e.on("render", l)
	];
	return l(), {
		element: r,
		update: l,
		destroy() {
			for (let e of u) e();
			r.remove();
		}
	};
}
// ../../node_modules/.pnpm/d3-selection@3.0.1/node_modules/d3-selection/dist/d3-selection.mjs
var Xm = "http://www.w3.org/1999/xhtml", Zm = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: Xm,
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function Qm(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Zm.hasOwnProperty(t) ? {
		space: Zm[t],
		local: e
	} : e;
}
function $m(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === Xm && t.documentElement.namespaceURI === Xm ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function eh(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function th(e) {
	var t = Qm(e);
	return (t.local ? eh : $m)(t);
}
function nh() {}
function rh(e) {
	return e == null ? nh : function() {
		return this.querySelector(e);
	};
}
function ih(e) {
	typeof e != "function" && (e = rh(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new Y(r, this._parents);
}
function ah(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function oh() {
	return [];
}
function sh(e) {
	return e == null ? oh : function() {
		return this.querySelectorAll(e);
	};
}
function ch(e) {
	return function() {
		return ah(e.apply(this, arguments));
	};
}
function lh(e) {
	e = typeof e == "function" ? ch(e) : sh(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new Y(r, i);
}
function uh(e) {
	return function() {
		return this.matches(e);
	};
}
function dh(e) {
	return function(t) {
		return t.matches(e);
	};
}
var fh = Array.prototype.find;
function ph(e) {
	return function() {
		return fh.call(this.children, e);
	};
}
function mh() {
	return this.firstElementChild;
}
function hh(e) {
	return this.select(e == null ? mh : ph(typeof e == "function" ? e : dh(e)));
}
var gh = Array.prototype.filter;
function _h() {
	return Array.from(this.children);
}
function vh(e) {
	return function() {
		return gh.call(this.children, e);
	};
}
function yh(e) {
	return this.selectAll(e == null ? _h : vh(typeof e == "function" ? e : dh(e)));
}
function bh(e) {
	typeof e != "function" && (e = uh(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Y(r, this._parents);
}
function xh(e) {
	return Array(e.length);
}
function Sh() {
	return new Y(this._enter || this._groups.map(xh), this._parents);
}
function Ch(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ch.prototype = {
	constructor: Ch,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
function wh(e) {
	return function() {
		return e;
	};
}
function Th(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Ch(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Eh(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Ch(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function Dh(e) {
	return e.__data__;
}
function Oh(e, t) {
	if (!arguments.length) return Array.from(this, Dh);
	var n = t ? Eh : Th, r = this._parents, i = this._groups;
	typeof e != "function" && (e = wh(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = kh(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new Y(o, r), o._enter = s, o._exit = c, o;
}
function kh(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ah() {
	return new Y(this._exit || this._groups.map(xh), this._parents);
}
function jh(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function Mh(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new Y(s, this._parents);
}
function Nh() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
function Ph(e) {
	e ||= Fh;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new Y(i, this._parents).order();
}
function Fh(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ih() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
function Lh() {
	return Array.from(this);
}
function Rh() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
function zh() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
function Bh() {
	return !this.node();
}
function Vh(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
function Hh(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Uh(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Wh(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function Gh(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function Kh(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function qh(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function Jh(e, t) {
	var n = Qm(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? Uh : Hh : typeof t == "function" ? n.local ? qh : Kh : n.local ? Gh : Wh)(n, t));
}
function Yh(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Xh(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Zh(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function Qh(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function $h(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? Xh : typeof t == "function" ? Qh : Zh)(e, t, n ?? "")) : eg(this.node(), e);
}
function eg(e, t) {
	return e.style.getPropertyValue(t) || Yh(e).getComputedStyle(e, null).getPropertyValue(t);
}
function tg(e) {
	return function() {
		delete this[e];
	};
}
function ng(e, t) {
	return function() {
		this[e] = t;
	};
}
function rg(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function ig(e, t) {
	return arguments.length > 1 ? this.each((t == null ? tg : typeof t == "function" ? rg : ng)(e, t)) : this.node()[e];
}
function ag(e) {
	return e.trim().split(/^|\s+/);
}
function og(e) {
	return e.classList || new sg(e);
}
function sg(e) {
	this._node = e, this._names = ag(e.getAttribute("class") || "");
}
sg.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function cg(e, t) {
	for (var n = og(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function lg(e, t) {
	for (var n = og(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function ug(e) {
	return function() {
		cg(this, e);
	};
}
function dg(e) {
	return function() {
		lg(this, e);
	};
}
function fg(e, t) {
	return function() {
		(t.apply(this, arguments) ? cg : lg)(this, e);
	};
}
function pg(e, t) {
	var n = ag(e + "");
	if (arguments.length < 2) {
		for (var r = og(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? fg : t ? ug : dg)(n, t));
}
function mg() {
	this.textContent = "";
}
function hg(e) {
	return function() {
		this.textContent = e;
	};
}
function gg(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function _g(e) {
	return arguments.length ? this.each(e == null ? mg : (typeof e == "function" ? gg : hg)(e)) : this.node().textContent;
}
function vg() {
	this.innerHTML = "";
}
function yg(e) {
	return function() {
		this.innerHTML = e;
	};
}
function bg(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function xg(e) {
	return arguments.length ? this.each(e == null ? vg : (typeof e == "function" ? bg : yg)(e)) : this.node().innerHTML;
}
function Sg() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Cg() {
	return this.each(Sg);
}
function wg() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Tg() {
	return this.each(wg);
}
function Eg(e) {
	var t = typeof e == "function" ? e : th(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
function Dg() {
	return null;
}
function Og(e, t) {
	var n = typeof e == "function" ? e : th(e), r = t == null ? Dg : typeof t == "function" ? t : rh(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
function kg() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function Ag() {
	return this.each(kg);
}
function jg() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Mg() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ng(e) {
	return this.select(e ? Mg : jg);
}
function Pg(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Fg(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function Ig(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function Lg(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function Rg(e, t, n) {
	return function() {
		var r = this.__on, i, a = Fg(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function zg(e, t, n) {
	var r = Ig(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
	} else {
		for (s = t ? Rg : Lg, i = 0; i < a; ++i) this.each(s(r[i], t, n));
		return this;
	}
}
function Bg(e, t, n) {
	var r = Yh(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Vg(e, t) {
	return function() {
		return Bg(this, e, t);
	};
}
function Hg(e, t) {
	return function() {
		return Bg(this, e, t.apply(this, arguments));
	};
}
function Ug(e, t) {
	return this.each((typeof t == "function" ? Hg : Vg)(e, t));
}
function* Wg() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
var Gg = [null];
function Y(e, t) {
	this._groups = e, this._parents = t;
}
function Kg() {
	return new Y([[document.documentElement]], Gg);
}
function qg() {
	return this;
}
Y.prototype = Kg.prototype = {
	constructor: Y,
	select: ih,
	selectAll: lh,
	selectChild: hh,
	selectChildren: yh,
	filter: bh,
	data: Oh,
	enter: Sh,
	exit: Ah,
	join: jh,
	merge: Mh,
	selection: qg,
	order: Nh,
	sort: Ph,
	call: Ih,
	nodes: Lh,
	node: Rh,
	size: zh,
	empty: Bh,
	each: Vh,
	attr: Jh,
	style: $h,
	property: ig,
	classed: pg,
	text: _g,
	html: xg,
	raise: Cg,
	lower: Tg,
	append: Eg,
	insert: Og,
	remove: Ag,
	clone: Ng,
	datum: Pg,
	on: zg,
	dispatch: Ug,
	[Symbol.iterator]: Wg
};
function Jg(e) {
	return typeof e == "string" ? new Y([[document.querySelector(e)]], [document.documentElement]) : new Y([[e]], Gg);
}
var Yg = 0;
function Xg() {
	return new Zg();
}
function Zg() {
	this._ = "@" + (++Yg).toString(36);
}
Zg.prototype = Xg.prototype = {
	constructor: Zg,
	get: function(e) {
		for (var t = this._; !(t in e);) if (!(e = e.parentNode)) return;
		return e[t];
	},
	set: function(e, t) {
		return e[this._] = t;
	},
	remove: function(e) {
		return this._ in e && delete e[this._];
	},
	toString: function() {
		return this._;
	}
};
function Qg(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
function $g(e, t) {
	if (e = Qg(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
// ../../node_modules/.pnpm/flatqueue@3.1.0/node_modules/flatqueue/index.js
var e_ = class {
	constructor(e = Infinity, t = Float64Array, n = Uint32Array) {
		let r = e !== Infinity;
		this.ids = r ? new n(e) : [], this.values = r ? new t(e) : [], this.capacity = e, this.length = 0;
	}
	clear() {
		this.length = 0;
	}
	push(e, t) {
		if (this.length === this.capacity) throw RangeError("Queue is at capacity.");
		let n = this.length++;
		for (; n > 0;) {
			let e = n - 1 >> 1, r = this.values[e];
			if (t >= r) break;
			this.ids[n] = this.ids[e], this.values[n] = r, n = e;
		}
		this.ids[n] = e, this.values[n] = t;
	}
	pop() {
		if (this.length === 0) return;
		let e = this.ids, t = this.values, n = e[0], r = --this.length;
		if (r > 0) {
			let n = e[r], i = t[r], a = 0, o = r >> 1;
			for (; a < o;) {
				let n = (a << 1) + 1, o = n + 1, s = n + (+(o < r) & t[o] < t[n]);
				if (t[s] >= i) break;
				e[a] = e[s], t[a] = t[s], a = s;
			}
			e[a] = n, t[a] = i;
		}
		return n;
	}
	peek() {
		return this.length > 0 ? this.ids[0] : void 0;
	}
	peekValue() {
		return this.length > 0 ? this.values[0] : void 0;
	}
	shrink() {
		Array.isArray(this.ids) && (this.ids.length = this.length), Array.isArray(this.values) && (this.values.length = this.length);
	}
}, t_ = [
	Int8Array,
	Uint8Array,
	Uint8ClampedArray,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
], n_ = 3, r_ = class e {
	static from(t, n = 0) {
		if (n % 8 != 0) throw Error("byteOffset must be 8-byte aligned.");
		if (!t || t.byteLength === void 0 || "buffer" in t) throw Error("Data must be an instance of ArrayBuffer or SharedArrayBuffer.");
		let [r, i] = new Uint8Array(t, n + 0, 2);
		if (r !== 251) throw Error("Data does not appear to be in a Flatbush format.");
		let a = i >> 4;
		if (a !== n_) throw Error(`Got v${a} data when expected v${n_}.`);
		let o = t_[i & 15];
		if (!o) throw Error("Unrecognized array type.");
		let [s] = new Uint16Array(t, n + 2, 1), [c] = new Uint32Array(t, n + 4, 1);
		return new e(c, s, o, void 0, t, n);
	}
	constructor(e, t = 16, n = Float64Array, r = ArrayBuffer, i, a = 0) {
		if (e === void 0) throw Error("Missing required argument: numItems.");
		if (isNaN(e) || e <= 0) throw Error(`Unexpected numItems value: ${e}.`);
		this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.byteOffset = a;
		let o = e, s = o;
		this._levelBounds = [o * 4];
		do
			o = Math.ceil(o / this.nodeSize), s += o, this._levelBounds.push(s * 4);
		while (o !== 1);
		this.ArrayType = n, this.IndexArrayType = s < 16384 ? Uint16Array : Uint32Array;
		let c = t_.indexOf(n), l = s * 4 * n.BYTES_PER_ELEMENT;
		if (c < 0) throw Error(`Unexpected typed array class: ${n}.`);
		let u = n, d = this.IndexArrayType;
		if (i) this.data = i, this._boxes = new u(i, a + 8, s * 4), this._indices = new d(i, a + 8 + l, s), this._pos = s * 4, this.minX = this._boxes[this._pos - 4], this.minY = this._boxes[this._pos - 3], this.maxX = this._boxes[this._pos - 2], this.maxY = this._boxes[this._pos - 1];
		else {
			let t = this.data = new r(8 + l + s * this.IndexArrayType.BYTES_PER_ELEMENT);
			this._boxes = new u(t, 8, s * 4), this._indices = new d(t, 8 + l, s), this._pos = 0, this.minX = Infinity, this.minY = Infinity, this.maxX = -Infinity, this.maxY = -Infinity, new Uint8Array(t, 0, 2).set([251, 48 + c]), new Uint16Array(t, 2, 1)[0] = this.nodeSize, new Uint32Array(t, 4, 1)[0] = e;
		}
		this._queue = new e_();
	}
	add(e, t, n = e, r = t) {
		let i = this._pos, a = i >> 2, o = this._boxes;
		return this._indices[a] = a, o[i] = e, o[i + 1] = t, o[i + 2] = n, o[i + 3] = r, this._pos = i + 4, e < this.minX && (this.minX = e), t < this.minY && (this.minY = t), n > this.maxX && (this.maxX = n), r > this.maxY && (this.maxY = r), a;
	}
	finish() {
		if (this._pos >> 2 !== this.numItems) throw Error(`Added ${this._pos >> 2} items when expected ${this.numItems}.`);
		let e = this._boxes;
		if (this.numItems <= this.nodeSize) {
			e[this._pos++] = this.minX, e[this._pos++] = this.minY, e[this._pos++] = this.maxX, e[this._pos++] = this.maxY;
			return;
		}
		let { numItems: t, minX: n, minY: r, nodeSize: i, _indices: a, _levelBounds: o } = this, s = this.maxX - n || 1, c = this.maxY - r || 1, l = new Int32Array(t), u = 65535, d = u / s, f = u / c;
		for (let i = 0, a = 0; i < t; i++) {
			let t = e[a++], o = e[a++], s = e[a++], c = e[a++], u = d * ((t + s) / 2 - n) | 0, p = f * ((o + c) / 2 - r) | 0;
			l[i] = s_(u, p);
		}
		a_(l, e, a, 0, t - 1, i);
		let p = t * 4;
		for (let t = 0, n = 0; t < o.length - 1; t++) {
			let r = o[t];
			for (; n < r;) {
				let t = n, o = e[n++], s = e[n++], c = e[n++], l = e[n++];
				for (let t = 1; t < i && n < r; t++) o = Math.min(o, e[n++]), s = Math.min(s, e[n++]), c = Math.max(c, e[n++]), l = Math.max(l, e[n++]);
				a[p >> 2] = t, e[p++] = o, e[p++] = s, e[p++] = c, e[p++] = l;
			}
		}
		this._pos = p;
	}
	search(e, t, n, r, i) {
		if (this._pos !== this._boxes.length) throw Error("Data not yet indexed - call index.finish().");
		let { _boxes: a, _levelBounds: o, _indices: s, nodeSize: c } = this, l = this.numItems * 4, u = a.length - 4, d = o.length - 1, f = [], p = [], m = !1;
		for (; u !== void 0;) {
			let h = Math.min(u + c * 4, o[d]), g = u >= l;
			if (m) this._collectContained(u, h, d, l, p, i);
			else for (let o = u; o < h; o += 4) {
				let c = a[o];
				if (n < c) continue;
				let l = a[o + 1];
				if (r < l) continue;
				let u = a[o + 2];
				if (e > u) continue;
				let m = a[o + 3];
				if (t > m) continue;
				let h = s[o >> 2] | 0;
				if (g) {
					let i = +(e <= c && t <= l && n >= u && r >= m);
					f.push(h | i, d - 1);
				} else (i === void 0 || i(h, c, l, u, m)) && p.push(h);
			}
			d = f.pop(), u = f.pop(), u !== void 0 && (m = (u & 1) == 1, u &= -2);
		}
		return p;
	}
	_collectContained(e, t, n, r, i, a) {
		let o = this._boxes, s = this._indices, c = e;
		for (let e = n; e > 0; e--) c = s[c >> 2];
		let l = Math.min(c + (t - e) * this.nodeSize ** n, r);
		if (a === void 0) for (; c < l; c += 4) i.push(s[c >> 2] | 0);
		else for (; c < l; c += 4) {
			let e = s[c >> 2] | 0;
			a(e, o[c], o[c + 1], o[c + 2], o[c + 3]) && i.push(e);
		}
	}
	collides(e, t, n, r, i) {
		if (this._pos !== this._boxes.length) throw Error("Data not yet indexed - call index.finish().");
		let { _boxes: a, _levelBounds: o, _indices: s, nodeSize: c } = this, l = this.numItems * 4, u = a.length - 4, d = o.length - 1, f = [];
		for (; u !== void 0;) {
			let p = Math.min(u + c * 4, o[d]), m = u >= l;
			for (let o = u; o < p; o += 4) {
				let c = a[o];
				if (n < c) continue;
				let l = a[o + 1];
				if (r < l) continue;
				let u = a[o + 2];
				if (e > u) continue;
				let p = a[o + 3];
				if (t > p) continue;
				let h = s[o >> 2] | 0;
				if (m) f.push(h, d - 1);
				else if (i === void 0 || i(h, c, l, u, p)) return !0;
			}
			d = f.pop(), u = f.pop();
		}
		return !1;
	}
	neighbors(e, t, n = Infinity, r = Infinity, i) {
		if (this._pos !== this._boxes.length) throw Error("Data not yet indexed - call index.finish().");
		let { _boxes: a, _levelBounds: o, _indices: s, _queue: c, nodeSize: l } = this, u = this.numItems * 4, d = l * 4, f = [], p = r * r, m = n === 1, h = p;
		for (c.push(a.length - 4 << 1, 0); c.length;) {
			let r = c.ids[0];
			if (r & 1) {
				if (c.pop(), f.push(r >> 1), f.length === n) break;
				continue;
			}
			c.pop();
			let l = r >> 1, p = l < u, g = Math.min(l + d, i_(l, o));
			for (let n = l; n < g; n += 4) {
				let r = a[n], o = a[n + 1], l = a[n + 2], u = a[n + 3], d = Math.max(Math.max(r - e, e - l), 0), f = Math.max(Math.max(o - t, t - u), 0), g = d * d + f * f;
				if (g > h) continue;
				let _ = s[n >> 2] | 0;
				p ? (i === void 0 || i(_)) && (c.push(_ << 1 | 1, g), m && g < h && (h = g)) : c.push(_ << 1, g);
			}
		}
		return c.clear(), f;
	}
};
function i_(e, t) {
	let n = 0, r = t.length - 1;
	for (; n < r;) {
		let i = n + r >> 1;
		t[i] > e ? r = i : n = i + 1;
	}
	return t[n];
}
function a_(e, t, n, r, i, a) {
	let o = [r, i];
	for (; o.length;) {
		let r = o.pop() || 0, i = o.pop() || 0;
		if (r - i <= a && Math.floor(i / a) >= Math.floor(r / a)) continue;
		let s = e[i], c = e[i + r >> 1], l = e[r], u = s > c == s > l ? c < s == c < l ? l : c : s, d = i - 1, f = r + 1;
		for (;;) {
			do
				d++;
			while (e[d] < u);
			do
				f--;
			while (e[f] > u);
			if (d >= f) break;
			o_(e, t, n, d, f);
		}
		o.push(i, f, f + 1, r);
	}
}
function o_(e, t, n, r, i) {
	let a = e[r];
	e[r] = e[i], e[i] = a;
	let o = 4 * r, s = 4 * i, c = t[o], l = t[o + 1], u = t[o + 2], d = t[o + 3];
	t[o] = t[s], t[o + 1] = t[s + 1], t[o + 2] = t[s + 2], t[o + 3] = t[s + 3], t[s] = c, t[s + 1] = l, t[s + 2] = u, t[s + 3] = d;
	let f = n[r];
	n[r] = n[i], n[i] = f;
}
function s_(e, t) {
	let n = e ^ t, r = 65535 ^ n, i = 65535 ^ (e | t), a = e & (t ^ 65535), o = n | r >> 1, s = n >> 1 ^ n, c = i ^ (i >> 1 ^ r & a >> 1), l = a ^ (n & i >> 1 ^ a >> 1);
	return n = o & o >> 2 ^ s & s >> 2, r = o & s >> 2 ^ s & (o ^ s) >> 2, i = c ^ (o & c >> 2 ^ s & l >> 2), a = l ^ (s & c >> 2 ^ (o ^ s) & l >> 2), o = n & n >> 4 ^ r & r >> 4, s = n & r >> 4 ^ r & (n ^ r) >> 4, c = i ^ (n & i >> 4 ^ r & a >> 4), l = a ^ (r & i >> 4 ^ (n ^ r) & a >> 4), i = c ^ (o & c >> 8 ^ s & l >> 8), a = l ^ (s & c >> 8 ^ (o ^ s) & l >> 8), i ^= i >> 1, a ^= a >> 1, n = e ^ t, r = a | 65535 ^ (n | i), n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, ((r << 1 | n) >>> 0) - 2147483648;
}
// ../../node_modules/.pnpm/d3-dispatch@3.0.2/node_modules/d3-dispatch/dist/d3-dispatch.mjs
var c_ = { value: () => {} };
function l_() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new u_(n);
}
function u_(e) {
	this._ = e;
}
function d_(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
u_.prototype = l_.prototype = {
	constructor: u_,
	on: function(e, t) {
		var n = this._, r = d_(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = f_(n[i], e.name))) return i;
		} else {
			if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
			for (; ++a < o;) if (i = (e = r[a]).type) n[i] = p_(n[i], e.name, t);
			else if (t == null) for (i in n) n[i] = p_(n[i], e.name, null);
			return this;
		}
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new u_(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function f_(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function p_(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = c_, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
// ../../node_modules/.pnpm/d3-drag@3.0.1/node_modules/d3-drag/dist/d3-drag.mjs
var m_ = {
	capture: !0,
	passive: !1
};
function h_(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
function g_(e) {
	var t = e.document.documentElement, n = Jg(e).on("dragstart.drag", h_, m_);
	"onselectstart" in t ? n.on("selectstart.drag", h_, m_) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function __(e, t) {
	var n = e.document.documentElement, r = Jg(e).on("dragstart.drag", null);
	t && (r.on("click.drag", h_, m_), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function v_(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
v_.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
// ../../node_modules/.pnpm/d3-color@3.1.1/node_modules/d3-color/dist/d3-color.mjs
function y_(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function b_(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
function x_() {}
var S_ = .7, C_ = 1 / S_, w_ = "\\s*([+-]?\\d+)\\s*", T_ = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", E_ = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", D_ = /^#([0-9a-f]{3,8})$/, O_ = RegExp(`^rgb\\(${w_},${w_},${w_}\\)$`), k_ = RegExp(`^rgb\\(${E_},${E_},${E_}\\)$`), A_ = RegExp(`^rgba\\(${w_},${w_},${w_},${T_}\\)$`), j_ = RegExp(`^rgba\\(${E_},${E_},${E_},${T_}\\)$`), M_ = RegExp(`^hsl\\(${T_},${E_},${E_}\\)$`), N_ = RegExp(`^hsla\\(${T_},${E_},${E_},${T_}\\)$`), P_ = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
y_(x_, z_, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: F_,
	formatHex: F_,
	formatHex8: I_,
	formatHsl: L_,
	formatRgb: R_,
	toString: R_
});
function F_() {
	return this.rgb().formatHex();
}
function I_() {
	return this.rgb().formatHex8();
}
function L_() {
	return Z_(this).formatHsl();
}
function R_() {
	return this.rgb().formatRgb();
}
function z_(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = D_.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? B_(t) : n === 3 ? new X(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? V_(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? V_(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = O_.exec(e)) ? new X(t[1], t[2], t[3], 1) : (t = k_.exec(e)) ? new X(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = A_.exec(e)) ? V_(t[1], t[2], t[3], t[4]) : (t = j_.exec(e)) ? V_(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = M_.exec(e)) ? X_(t[1], t[2] / 100, t[3] / 100, 1) : (t = N_.exec(e)) ? X_(t[1], t[2] / 100, t[3] / 100, t[4]) : P_.hasOwnProperty(e) ? B_(P_[e]) : e === "transparent" ? new X(NaN, NaN, NaN, 0) : null;
}
function B_(e) {
	return new X(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function V_(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new X(e, t, n, r);
}
function H_(e) {
	return e instanceof x_ || (e = z_(e)), e ? (e = e.rgb(), new X(e.r, e.g, e.b, e.opacity)) : new X();
}
function U_(e, t, n, r) {
	return arguments.length === 1 ? H_(e) : new X(e, t, n, r ?? 1);
}
function X(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
y_(X, U_, b_(x_, {
	brighter(e) {
		return e = e == null ? C_ : C_ ** +e, new X(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? S_ : S_ ** +e, new X(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new X(J_(this.r), J_(this.g), J_(this.b), q_(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: W_,
	formatHex: W_,
	formatHex8: G_,
	formatRgb: K_,
	toString: K_
}));
function W_() {
	return `#${Y_(this.r)}${Y_(this.g)}${Y_(this.b)}`;
}
function G_() {
	return `#${Y_(this.r)}${Y_(this.g)}${Y_(this.b)}${Y_((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function K_() {
	let e = q_(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${J_(this.r)}, ${J_(this.g)}, ${J_(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function q_(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function J_(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Y_(e) {
	return e = J_(e), (e < 16 ? "0" : "") + e.toString(16);
}
function X_(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Z(e, t, n, r);
}
function Z_(e) {
	if (e instanceof Z) return new Z(e.h, e.s, e.l, e.opacity);
	if (e instanceof x_ || (e = z_(e)), !e) return new Z();
	if (e instanceof Z) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new Z(o, s, c, e.opacity);
}
function Q_(e, t, n, r) {
	return arguments.length === 1 ? Z_(e) : new Z(e, t, n, r ?? 1);
}
function Z(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
y_(Z, Q_, b_(x_, {
	brighter(e) {
		return e = e == null ? C_ : C_ ** +e, new Z(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? S_ : S_ ** +e, new Z(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new X(tv(e >= 240 ? e - 240 : e + 120, i, r), tv(e, i, r), tv(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new Z($_(this.h), ev(this.s), ev(this.l), q_(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = q_(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${$_(this.h)}, ${ev(this.s) * 100}%, ${ev(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function $_(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ev(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function tv(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
var nv = Math.PI / 180, rv = 180 / Math.PI, iv = 18, av = .96422, ov = 1, sv = .82521, cv = 4 / 29, lv = 6 / 29, uv = 3 * lv * lv, dv = lv * lv * lv;
function fv(e) {
	if (e instanceof mv) return new mv(e.l, e.a, e.b, e.opacity);
	if (e instanceof xv) return Sv(e);
	e instanceof X || (e = H_(e));
	var t = vv(e.r), n = vv(e.g), r = vv(e.b), i = hv((.2225045 * t + .7168786 * n + .0606169 * r) / ov), a, o;
	return t === n && n === r ? a = o = i : (a = hv((.4360747 * t + .3850649 * n + .1430804 * r) / av), o = hv((.0139322 * t + .0971045 * n + .7141733 * r) / sv)), new mv(116 * i - 16, 500 * (a - i), 200 * (i - o), e.opacity);
}
function pv(e, t, n, r) {
	return arguments.length === 1 ? fv(e) : new mv(e, t, n, r ?? 1);
}
function mv(e, t, n, r) {
	this.l = +e, this.a = +t, this.b = +n, this.opacity = +r;
}
y_(mv, pv, b_(x_, {
	brighter(e) {
		return new mv(this.l + iv * (e ?? 1), this.a, this.b, this.opacity);
	},
	darker(e) {
		return new mv(this.l - iv * (e ?? 1), this.a, this.b, this.opacity);
	},
	rgb() {
		var e = (this.l + 16) / 116, t = isNaN(this.a) ? e : e + this.a / 500, n = isNaN(this.b) ? e : e - this.b / 200;
		return t = av * gv(t), e = ov * gv(e), n = sv * gv(n), new X(_v(3.1338561 * t - 1.6168667 * e - .4906146 * n), _v(-.9787684 * t + 1.9161415 * e + .033454 * n), _v(.0719453 * t - .2289914 * e + 1.4052427 * n), this.opacity);
	}
}));
function hv(e) {
	return e > dv ? e ** (1 / 3) : e / uv + cv;
}
function gv(e) {
	return e > lv ? e * e * e : uv * (e - cv);
}
function _v(e) {
	return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055);
}
function vv(e) {
	return (e /= 255) <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
}
function yv(e) {
	if (e instanceof xv) return new xv(e.h, e.c, e.l, e.opacity);
	if (e instanceof mv || (e = fv(e)), e.a === 0 && e.b === 0) return new xv(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
	var t = Math.atan2(e.b, e.a) * rv;
	return new xv(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity);
}
function bv(e, t, n, r) {
	return arguments.length === 1 ? yv(e) : new xv(e, t, n, r ?? 1);
}
function xv(e, t, n, r) {
	this.h = +e, this.c = +t, this.l = +n, this.opacity = +r;
}
function Sv(e) {
	if (isNaN(e.h)) return new mv(e.l, 0, 0, e.opacity);
	var t = e.h * nv;
	return new mv(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
}
y_(xv, bv, b_(x_, {
	brighter(e) {
		return new xv(this.h, this.c, this.l + iv * (e ?? 1), this.opacity);
	},
	darker(e) {
		return new xv(this.h, this.c, this.l - iv * (e ?? 1), this.opacity);
	},
	rgb() {
		return Sv(this).rgb();
	}
}));
var Cv = -.14861, wv = 1.78277, Tv = -.29227, Ev = -.90649, Dv = 1.97294, Ov = Dv * Ev, kv = Dv * wv, Av = wv * Tv - Ev * Cv;
function jv(e) {
	if (e instanceof Nv) return new Nv(e.h, e.s, e.l, e.opacity);
	e instanceof X || (e = H_(e));
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = (Av * r + Ov * t - kv * n) / (Av + Ov - kv), a = r - i, o = (Dv * (n - i) - Tv * a) / Ev, s = Math.sqrt(o * o + a * a) / (Dv * i * (1 - i)), c = s ? Math.atan2(o, a) * rv - 120 : NaN;
	return new Nv(c < 0 ? c + 360 : c, s, i, e.opacity);
}
function Mv(e, t, n, r) {
	return arguments.length === 1 ? jv(e) : new Nv(e, t, n, r ?? 1);
}
function Nv(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
y_(Nv, Mv, b_(x_, {
	brighter(e) {
		return e = e == null ? C_ : C_ ** +e, new Nv(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? S_ : S_ ** +e, new Nv(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = isNaN(this.h) ? 0 : (this.h + 120) * nv, t = +this.l, n = isNaN(this.s) ? 0 : this.s * t * (1 - t), r = Math.cos(e), i = Math.sin(e);
		return new X(255 * (t + n * (Cv * r + wv * i)), 255 * (t + n * (Tv * r + Ev * i)), 255 * (t + Dv * r * n), this.opacity);
	}
}));
var Pv = (e) => () => e;
function Fv(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Iv(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Lv(e, t) {
	var n = t - e;
	return n ? Fv(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Pv(isNaN(e) ? t : e);
}
function Rv(e) {
	return (e = +e) == 1 ? zv : function(t, n) {
		return n - t ? Iv(t, n, e) : Pv(isNaN(t) ? n : t);
	};
}
function zv(e, t) {
	var n = t - e;
	return n ? Fv(e, n) : Pv(isNaN(e) ? t : e);
}
var Bv = (function e(t) {
	var n = Rv(t);
	function r(e, t) {
		var r = n((e = U_(e)).r, (t = U_(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = zv(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
function Vv(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
var Hv = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Uv = new RegExp(Hv.source, "g");
function Wv(e) {
	return function() {
		return e;
	};
}
function Gv(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Kv(e, t) {
	var n = Hv.lastIndex = Uv.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Hv.exec(e)) && (i = Uv.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Vv(r, i)
	})), n = Uv.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Gv(c[0].x) : Wv(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
var qv = 180 / Math.PI, Jv = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Yv(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * qv,
		skewX: Math.atan(c) * qv,
		scaleX: o,
		scaleY: s
	};
}
var Xv;
function Zv(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Jv : Yv(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Qv(e) {
	return e == null || (Xv ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Xv.setAttribute("transform", e), !(e = Xv.transform.baseVal.consolidate())) ? Jv : (e = e.matrix, Yv(e.a, e.b, e.c, e.d, e.e, e.f));
}
function $v(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Vv(e, i)
			}, {
				i: c - 2,
				x: Vv(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Vv(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Vv(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Vv(e, n)
			}, {
				i: s - 2,
				x: Vv(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var ey = $v(Zv, "px, ", "px)", "deg)"), ty = $v(Qv, ", ", ")", ")"), ny = 1e-12;
function ry(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function iy(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ay(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var oy = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < ny) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = ry(y), c = s / (n * g) * (i * ay(t * r + y) - iy(y));
				return [
					a + c * d,
					o + c * f,
					s * i / ry(t * r + y)
				];
			};
		}
		return m.duration = Math.abs(h) * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4);
function sy(e) {
	return (function t(n) {
		n = +n;
		function r(t, r) {
			var i = e((t = Mv(t)).h, (r = Mv(r)).h), a = zv(t.s, r.s), o = zv(t.l, r.l), s = zv(t.opacity, r.opacity);
			return function(e) {
				return t.h = i(e), t.s = a(e), t.l = o(e ** +n), t.opacity = s(e), t + "";
			};
		}
		return r.gamma = t, r;
	})(1);
}
sy(Lv), sy(zv);
// ../../node_modules/.pnpm/d3-timer@3.0.2/node_modules/d3-timer/dist/d3-timer.mjs
var cy = 0, ly = 0, uy = 0, dy = 1e3, fy, py, my = 0, hy = 0, gy = 0, _y = typeof performance == "object" && performance.now ? performance : Date, vy = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function yy() {
	return hy ||= (vy(by), _y.now() + gy);
}
function by() {
	hy = 0;
}
function xy() {
	this._call = this._time = this._next = null;
}
xy.prototype = Sy.prototype = {
	constructor: xy,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? yy() : +n) + (t == null ? 0 : +t), !this._next && py !== this && (py ? py._next = this : fy = this, py = this), this._call = e, this._time = n, Dy();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, Dy());
	}
};
function Sy(e, t, n) {
	var r = new xy();
	return r.restart(e, t, n), r;
}
function Cy() {
	yy(), ++cy;
	for (var e = fy, t; e;) (t = hy - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--cy;
}
function wy() {
	hy = (my = _y.now()) + gy, cy = ly = 0;
	try {
		Cy();
	} finally {
		cy = 0, Ey(), hy = 0;
	}
}
function Ty() {
	var e = _y.now(), t = e - my;
	t > dy && (gy -= t, my = e);
}
function Ey() {
	for (var e, t = fy, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : fy = n);
	py = e, Dy(r);
}
function Dy(e) {
	cy || (ly &&= clearTimeout(ly), e - hy > 24 ? (e < Infinity && (ly = setTimeout(wy, Math.ceil(e - _y.now() - gy) + 1)), uy &&= clearInterval(uy)) : (uy ||= (my = _y.now(), setInterval(Ty, dy)), cy = 1, vy(wy)));
}
function Oy(e, t, n) {
	var r = new xy();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
// ../../node_modules/.pnpm/d3-ease@3.0.2/node_modules/d3-ease/dist/d3-ease.mjs
function ky(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ay = 3;
(function e(t) {
	t = +t;
	function n(e) {
		return e ** +t;
	}
	return n.exponent = e, n;
})(Ay), (function e(t) {
	t = +t;
	function n(e) {
		return 1 - (1 - e) ** t;
	}
	return n.exponent = e, n;
})(Ay), (function e(t) {
	t = +t;
	function n(e) {
		return ((e *= 2) <= 1 ? e ** +t : 2 - (2 - e) ** t) / 2;
	}
	return n.exponent = e, n;
})(Ay);
function jy(e) {
	return (2 ** (-10 * e) - .0009765625) * 1.0009775171065494;
}
var My = 4 / 11;
1 / My / My;
var Ny = 1.70158;
(function e(t) {
	t = +t;
	function n(e) {
		return (e = +e) * e * (t * (e - 1) + e);
	}
	return n.overshoot = e, n;
})(Ny), (function e(t) {
	t = +t;
	function n(e) {
		return --e * e * ((e + 1) * t + e) + 1;
	}
	return n.overshoot = e, n;
})(Ny), (function e(t) {
	t = +t;
	function n(e) {
		return ((e *= 2) < 1 ? e * e * ((t + 1) * e - t) : (e -= 2) * e * ((t + 1) * e + t) + 2) / 2;
	}
	return n.overshoot = e, n;
})(Ny);
var Py = 2 * Math.PI, Fy = 1, Iy = .3;
(function e(t, n) {
	var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Py);
	function i(e) {
		return t * jy(- --e) * Math.sin((r - e) / n);
	}
	return i.amplitude = function(t) {
		return e(t, n * Py);
	}, i.period = function(n) {
		return e(t, n);
	}, i;
})(Fy, Iy), (function e(t, n) {
	var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Py);
	function i(e) {
		return 1 - t * jy(e = +e) * Math.sin((e + r) / n);
	}
	return i.amplitude = function(t) {
		return e(t, n * Py);
	}, i.period = function(n) {
		return e(t, n);
	}, i;
})(Fy, Iy), (function e(t, n) {
	var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Py);
	function i(e) {
		return ((e = e * 2 - 1) < 0 ? t * jy(-e) * Math.sin((r - e) / n) : 2 - t * jy(e) * Math.sin((r + e) / n)) / 2;
	}
	return i.amplitude = function(t) {
		return e(t, n * Py);
	}, i.period = function(n) {
		return e(t, n);
	}, i;
})(Fy, Iy);
// ../../node_modules/.pnpm/d3-transition@3.0.2_d3-selection@3.0.1/node_modules/d3-transition/dist/d3-transition.mjs
var Ly = l_("start", "end", "cancel", "interrupt"), Ry = [], zy = 0, By = 1, Vy = 2, Hy = 3, Uy = 4, Wy = 5, Gy = 6;
function Ky(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	Jy(e, n, {
		name: t,
		index: r,
		group: i,
		on: Ly,
		tween: Ry,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: zy
	});
}
function qy(e, t) {
	var n = $(e, t);
	if (n.state > zy) throw Error("too late; already scheduled");
	return n;
}
function Q(e, t) {
	var n = $(e, t);
	if (n.state > Hy) throw Error("too late; already running");
	return n;
}
function $(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function Jy(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = Sy(a, 0, n.time);
	function a(e) {
		n.state = By, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== By) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === Hy) return Oy(o);
			f.state === Uy ? (f.state = Gy, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = Gy, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (Oy(function() {
			n.state === Hy && (n.state = Uy, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = Vy, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Vy) {
			for (n.state = Hy, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = Wy, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === Wy && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = Gy, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
function Yy(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) (r = n[o]).name === t ? (i = r.state > Vy && r.state < Wy, r.state = Gy, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o]) : a = !1;
		a && delete e.__transition;
	}
}
function Xy(e) {
	return this.each(function() {
		Yy(this, e);
	});
}
function Zy(e, t) {
	var n, r;
	return function() {
		var i = Q(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function Qy(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = Q(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function $y(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = $(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? Zy : Qy)(n, e, t));
}
function eb(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = Q(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return $(e, r).value[t];
	};
}
function tb(e, t) {
	var n;
	return (typeof t == "number" ? Vv : t instanceof z_ ? Bv : (n = z_(t)) ? (t = n, Bv) : Kv)(e, t);
}
function nb(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function rb(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function ib(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function ab(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function ob(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function sb(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function cb(e, t) {
	var n = Qm(e), r = n === "transform" ? ty : tb;
	return this.attrTween(e, typeof t == "function" ? (n.local ? sb : ob)(n, r, eb(this, "attr." + e, t)) : t == null ? (n.local ? rb : nb)(n) : (n.local ? ab : ib)(n, r, t));
}
function lb(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function ub(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function db(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && ub(e, i)), n;
	}
	return i._value = t, i;
}
function fb(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && lb(e, i)), n;
	}
	return i._value = t, i;
}
function pb(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = Qm(e);
	return this.tween(n, (r.local ? db : fb)(r, t));
}
function mb(e, t) {
	return function() {
		qy(this, e).delay = +t.apply(this, arguments);
	};
}
function hb(e, t) {
	return t = +t, function() {
		qy(this, e).delay = t;
	};
}
function gb(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? mb : hb)(t, e)) : $(this.node(), t).delay;
}
function _b(e, t) {
	return function() {
		Q(this, e).duration = +t.apply(this, arguments);
	};
}
function vb(e, t) {
	return t = +t, function() {
		Q(this, e).duration = t;
	};
}
function yb(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? _b : vb)(t, e)) : $(this.node(), t).duration;
}
function bb(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		Q(this, e).ease = t;
	};
}
function xb(e) {
	var t = this._id;
	return arguments.length ? this.each(bb(t, e)) : $(this.node(), t).ease;
}
function Sb(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		Q(this, e).ease = n;
	};
}
function Cb(e) {
	if (typeof e != "function") throw Error();
	return this.each(Sb(this._id, e));
}
function wb(e) {
	typeof e != "function" && (e = uh(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new $b(r, this._parents, this._name, this._id);
}
function Tb(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new $b(o, this._parents, this._name, this._id);
}
function Eb(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function Db(e, t, n) {
	var r, i, a = Eb(t) ? qy : Q;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function Ob(e, t) {
	var n = this._id;
	return arguments.length < 2 ? $(this.node(), n).on.on(e) : this.each(Db(n, e, t));
}
function kb(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function Ab() {
	return this.on("end.remove", kb(this._id));
}
function jb(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = rh(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, Ky(l[f], t, n, f, l, $(u, n)));
	return new $b(a, this._parents, t, n);
}
function Mb(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = sh(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = $(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && Ky(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new $b(a, o, t, n);
}
var Nb = Kg.prototype.constructor;
function Pb() {
	return new Nb(this._groups, this._parents);
}
function Fb(e, t) {
	var n, r, i;
	return function() {
		var a = eg(this, e), o = (this.style.removeProperty(e), eg(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function Ib(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Lb(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = eg(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Rb(e, t, n) {
	var r, i, a;
	return function() {
		var o = eg(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), eg(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function zb(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = Q(this, e), l = c.on, u = c.value[a] == null ? s ||= Ib(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function Bb(e, t, n) {
	var r = (e += "") == "transform" ? ey : tb;
	return t == null ? this.styleTween(e, Fb(e, r)).on("end.style." + e, Ib(e)) : typeof t == "function" ? this.styleTween(e, Rb(e, r, eb(this, "style." + e, t))).each(zb(this._id, e)) : this.styleTween(e, Lb(e, r, t), n).on("end.style." + e, null);
}
function Vb(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function Hb(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && Vb(e, a, n)), r;
	}
	return a._value = t, a;
}
function Ub(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, Hb(e, t, n ?? ""));
}
function Wb(e) {
	return function() {
		this.textContent = e;
	};
}
function Gb(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function Kb(e) {
	return this.tween("text", typeof e == "function" ? Gb(eb(this, "text", e)) : Wb(e == null ? "" : e + ""));
}
function qb(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function Jb(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && qb(r)), t;
	}
	return r._value = e, r;
}
function Yb(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, Jb(e));
}
function Xb() {
	for (var e = this._name, t = this._id, n = ex(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = $(c, t);
		Ky(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new $b(r, this._parents, e, n);
}
function Zb() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = Q(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
var Qb = 0;
function $b(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function ex() {
	return ++Qb;
}
var tx = Kg.prototype;
$b.prototype = {
	constructor: $b,
	select: jb,
	selectAll: Mb,
	selectChild: tx.selectChild,
	selectChildren: tx.selectChildren,
	filter: wb,
	merge: Tb,
	selection: Pb,
	transition: Xb,
	call: tx.call,
	nodes: tx.nodes,
	node: tx.node,
	size: tx.size,
	empty: tx.empty,
	each: tx.each,
	on: Ob,
	attr: cb,
	attrTween: pb,
	style: Bb,
	styleTween: Ub,
	text: Kb,
	textTween: Yb,
	remove: Ab,
	tween: $y,
	delay: gb,
	duration: yb,
	ease: xb,
	easeVarying: Cb,
	end: Zb,
	[Symbol.iterator]: tx[Symbol.iterator]
};
var nx = {
	time: null,
	delay: 0,
	duration: 250,
	ease: ky
};
function rx(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function ix(e) {
	var t, n;
	e instanceof $b ? (t = e._id, e = e._name) : (t = ex(), (n = nx).time = yy(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && Ky(c, e, t, l, o, n || rx(c, t));
	return new $b(r, this._parents, e, t);
}
Kg.prototype.interrupt = Xy, Kg.prototype.transition = ix;
// ../../node_modules/.pnpm/d3-zoom@3.0.1/node_modules/d3-zoom/dist/d3-zoom.mjs
var ax = (e) => () => e;
function ox(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		transform: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		_: { value: i }
	});
}
function sx(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
sx.prototype = {
	constructor: sx,
	scale: function(e) {
		return e === 1 ? this : new sx(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new sx(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var cx = new sx(1, 0, 0);
lx.prototype = sx.prototype;
function lx(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return cx;
	return e.__zoom;
}
function ux(e) {
	e.stopImmediatePropagation();
}
function dx(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
function fx(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function px() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function mx() {
	return this.__zoom || cx;
}
function hx(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function gx() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _x(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function vx() {
	var e = fx, t = px, n = _x, r = hx, i = gx, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = oy, l = l_("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", mx).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", ee).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", mx), e === i ? i.interrupt().each(function() {
			S(this, arguments).event(r).start().zoom(null, typeof t == "function" ? t.apply(this, arguments) : t).end();
		}) : x(e, t, n, r);
	}, _.scaleBy = function(e, t, n, r) {
		_.scaleTo(e, function() {
			return this.__zoom.k * (typeof t == "function" ? t.apply(this, arguments) : t);
		}, n, r);
	}, _.scaleTo = function(e, r, i, a) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), a = this.__zoom, s = i == null ? b(e) : typeof i == "function" ? i.apply(this, arguments) : i, c = a.invert(s), l = typeof r == "function" ? r.apply(this, arguments) : r;
			return n(y(v(a, l), s, c), e, o);
		}, i, a);
	}, _.translateBy = function(e, r, i, a) {
		_.transform(e, function() {
			return n(this.__zoom.translate(typeof r == "function" ? r.apply(this, arguments) : r, typeof i == "function" ? i.apply(this, arguments) : i), t.apply(this, arguments), o);
		}, null, a);
	}, _.translateTo = function(e, r, i, a, s) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), s = this.__zoom, c = a == null ? b(e) : typeof a == "function" ? a.apply(this, arguments) : a;
			return n(cx.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new sx(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new sx(e.k, r, i);
	}
	function b(e) {
		return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2];
	}
	function x(e, n, r, i) {
		e.on("start.zoom", function() {
			S(this, arguments).event(i).start();
		}).on("interrupt.zoom end.zoom", function() {
			S(this, arguments).event(i).end();
		}).tween("zoom", function() {
			var e = this, a = arguments, o = S(e, a).event(i), s = t.apply(e, a), l = r == null ? b(s) : typeof r == "function" ? r.apply(e, a) : r, u = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1]), d = e.__zoom, f = typeof n == "function" ? n.apply(e, a) : n, p = c(d.invert(l).concat(u / d.k), f.invert(l).concat(u / f.k));
			return function(e) {
				if (e === 1) e = f;
				else {
					var t = p(e), n = u / t[2];
					e = new sx(n, l[0] - t[0] * n, l[1] - t[1] * n);
				}
				o.zoom(null, e);
			};
		});
	}
	function S(e, t, n) {
		return !n && e.__zooming || new C(e, t);
	}
	function C(e, n) {
		this.that = e, this.args = n, this.active = 0, this.sourceEvent = null, this.extent = t.apply(e, n), this.taps = 0;
	}
	C.prototype = {
		event: function(e) {
			return e && (this.sourceEvent = e), this;
		},
		start: function() {
			return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
		},
		zoom: function(e, t) {
			return this.mouse && e !== "mouse" && (this.mouse[1] = t.invert(this.mouse[0])), this.touch0 && e !== "touch" && (this.touch0[1] = t.invert(this.touch0[0])), this.touch1 && e !== "touch" && (this.touch1[1] = t.invert(this.touch1[0])), this.that.__zoom = t, this.emit("zoom"), this;
		},
		end: function() {
			return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
		},
		emit: function(e) {
			var t = Jg(this.that).datum();
			l.call(e, this.that, new ox(e, {
				sourceEvent: this.sourceEvent,
				target: _,
				transform: this.that.__zoom,
				dispatch: l
			}), t);
		}
	};
	function w(t, ...i) {
		if (!e.apply(this, arguments)) return;
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = $g(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], Yy(this), s.start();
		dx(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = Jg(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = $g(t, i), l = t.clientX, u = t.clientY;
		g_(t.view), ux(t), a.mouse = [c, this.__zoom.invert(c)], Yy(this), a.start();
		function d(e) {
			if (dx(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = $g(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), __(e.view, a.moved), dx(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = $g(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			dx(r), s > 0 ? Jg(this).transition().duration(s).call(x, d, c, r) : Jg(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (ux(t), s = 0; s < i; ++s) c = r[s], l = $g(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), Yy(this), a.start());
		}
	}
	function ee(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (dx(e), s = 0; s < a; ++s) c = i[s], l = $g(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
			if (c = r.that.__zoom, r.touch1) {
				var d = r.touch0[0], f = r.touch0[1], p = r.touch1[0], m = r.touch1[1], h = (h = p[0] - d[0]) * h + (h = p[1] - d[1]) * h, g = (g = m[0] - f[0]) * g + (g = m[1] - f[1]) * g;
				c = v(c, Math.sqrt(h / g)), l = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2], u = [(f[0] + m[0]) / 2, (f[1] + m[1]) / 2];
			} else if (r.touch0) l = r.touch0[0], u = r.touch0[1];
			else return;
			r.zoom("touch", n(y(c, l, u), r.extent, o));
		}
	}
	function te(e, ...t) {
		if (this.__zooming) {
			var n = S(this, t).event(e), r = e.changedTouches, i = r.length, a, o;
			for (ux(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = $g(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = Jg(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : ax(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : ax(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : ax(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : ax([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
	}, _.scaleExtent = function(e) {
		return arguments.length ? (a[0] = +e[0], a[1] = +e[1], _) : [a[0], a[1]];
	}, _.translateExtent = function(e) {
		return arguments.length ? (o[0][0] = +e[0][0], o[1][0] = +e[1][0], o[0][1] = +e[0][1], o[1][1] = +e[1][1], _) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
	}, _.constrain = function(e) {
		return arguments.length ? (n = e, _) : n;
	}, _.duration = function(e) {
		return arguments.length ? (s = +e, _) : s;
	}, _.interpolate = function(e) {
		return arguments.length ? (c = e, _) : c;
	}, _.on = function() {
		var e = l.on.apply(l, arguments);
		return e === l ? _ : e;
	}, _.clickDistance = function(e) {
		return arguments.length ? (h = (e = +e) * e, _) : Math.sqrt(h);
	}, _.tapDistance = function(e) {
		return arguments.length ? (g = +e, _) : g;
	}, _;
}
// ../view/dist/index.js
function yx(...e) {
	return (t) => {
		let n = e.map((e) => e(t));
		return () => {
			for (let e of n) e();
		};
	};
}
var bx = yx((e) => {
	let t = Jg(e.element);
	return e.zoomBehavior.filter((t) => {
		if (t.type === "wheel") return !!e.options.zoom;
		if (t.type === "dblclick") return !1;
		let { button: n = 0, ctrlKey: r = !1 } = t;
		return !!e.options.pan && !r && !n;
	}), t.call(e.zoomBehavior), () => {
		t.on(".zoom", null);
	};
}, (e) => {
	let t = e.element, n = ({ clientX: t, clientY: n }) => e.hitAt(...e.layoutPoint(t, n)), r = (r) => {
		if (r.defaultPrevented) return;
		let i = r, a = n(i);
		a?.kind === "action" && a.action === "notes" ? a.nodeId === e.openNoteId ? e.closeNotes() : e.openNotes(a.nodeId) : a?.kind === "link" ? e.backend.nativeLinks || t.ownerDocument.defaultView?.open(a.href, "_blank", "noopener,noreferrer") : a?.kind === "toggle" && (!i.ctrlKey && !i.metaKey ? e.toggle(a.nodeId) : e.foldedIds.has(a.nodeId) ? e.expandAll(a.nodeId) : e.foldAll(a.nodeId));
	}, i = (e) => {
		let r = e;
		if (r.buttons) return;
		let i = n(r);
		t.style.cursor = i && i.kind !== "node" ? "pointer" : "";
	};
	return t.addEventListener("click", r), t.addEventListener("pointermove", i), () => {
		t.removeEventListener("click", r), t.removeEventListener("pointermove", i), t.style.cursor = "";
	};
}), xx = [
	1,
	0,
	0,
	1,
	0,
	0
], Sx = class {
	entries = [];
	index;
	radius;
	constructor(e, t = {}) {
		let n = t.include ?? (() => !0), r = this.radius = t.toggleRadius ?? 10, i = [], a = (e, t, n) => {
			this.entries.push({
				target: e,
				center: n
			}), i.push(t);
		}, o = (e, t, r) => {
			for (let i of e) if (i.kind === "group") {
				let e = i.nodeId ?? r;
				if (e && !n(e)) continue;
				o(i.children, i.transform ? w(t, i.transform) : t, e);
			} else i.kind === "hit" && r ? a({
				kind: "action",
				nodeId: r,
				action: i.action
			}, Cx(t, i.rect)) : i.kind === "link" && a({
				kind: "link",
				nodeId: r,
				href: i.href
			}, Cx(t, i.rect));
		};
		o(e, xx);
		for (let { x: e, y: i, nodeId: o } of t.toggles ?? []) n(o) && a({
			kind: "toggle",
			nodeId: o
		}, {
			x: e - r,
			y: i - r,
			width: r * 2,
			height: r * 2
		}, {
			x: e,
			y: i
		});
		for (let { nodeId: e, rect: r } of t.nodes ?? []) n(e) && a({
			kind: "node",
			nodeId: e
		}, r);
		if (i.length) {
			this.index = new r_(i.length);
			for (let e of i) this.index.add(e.x, e.y, e.x + e.width, e.y + e.height);
			this.index.finish();
		}
	}
	hit(e, t) {
		if (!this.index) return;
		let n = -1, r = -1, i;
		for (let a of this.index.search(e, t, e, t)) {
			let { center: o, target: s } = this.entries[a];
			if (s.kind === "node") {
				r = Math.max(r, a);
				continue;
			}
			if (!o) {
				n = Math.max(n, a);
				continue;
			}
			let c = Math.hypot(o.x - e, o.y - t);
			c <= this.radius && (!i || c < i.distance) && (i = {
				index: a,
				distance: c
			});
		}
		let a = n >= 0 ? n : i?.index ?? r;
		return a < 0 ? void 0 : this.entries[a].target;
	}
};
function Cx([e, t, n, r, i, a], o) {
	let s = [], c = [];
	for (let [l, u] of [
		[o.x, o.y],
		[o.x + o.width, o.y],
		[o.x, o.y + o.height],
		[o.x + o.width, o.y + o.height]
	]) s.push(e * l + n * u + i), c.push(t * l + r * u + a);
	let l = Math.min(...s), u = Math.min(...c);
	return {
		x: l,
		y: u,
		width: Math.max(...s) - l,
		height: Math.max(...c) - u
	};
}
var wx = "markmap-popover-style", Tx = "\n.markmap-popover {\n  position: fixed;\n  z-index: 1000;\n  box-sizing: border-box;\n  max-width: min(420px, calc(100vw - 16px));\n  max-height: min(50vh, 480px);\n  overflow: auto;\n  padding: 8px 12px;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 6px;\n  background: var(--mm-bg, #fff);\n  color: var(--mm-text, #333);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  font: 14px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif;\n}\n/* Focused programmatically so Escape and screen readers land here; no ring needed. */\n.markmap-popover:focus { outline: none; }\n.markmap-popover > :first-child { margin-top: 0; }\n.markmap-popover > :last-child { margin-bottom: 0; }\n.markmap-popover p, .markmap-popover pre, .markmap-popover blockquote,\n.markmap-popover table, .markmap-popover ul, .markmap-popover ol { margin: 0.5em 0; }\n.markmap-popover a { color: var(--mm-link, #0097e6); }\n.markmap-popover code {\n  padding: 0.1em 0.3em;\n  border-radius: 3px;\n  background: var(--mm-code-bg, #f0f0f0);\n  color: var(--mm-code-text, #555);\n  font: 0.9em ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n}\n.markmap-popover pre { padding: 8px; overflow: auto; border-radius: 4px; background: var(--mm-code-bg, #f0f0f0); }\n.markmap-popover pre code { padding: 0; background: none; }\n.markmap-popover blockquote { padding-left: 0.8em; border-left: 3px solid rgba(0, 0, 0, 0.15); color: inherit; opacity: 0.85; }\n.markmap-popover table { border-collapse: collapse; }\n.markmap-popover th, .markmap-popover td { padding: 2px 8px; border: 1px solid rgba(0, 0, 0, 0.15); }\n.markmap-popover mark { background: var(--mm-mark-bg, #ffeaa7); color: inherit; }\n.markmap-popover img { max-width: 100%; }\n.markmap-popover .hljs-keyword, .markmap-popover .hljs-type, .markmap-popover .hljs-meta .hljs-keyword,\n.markmap-popover .hljs-selector-tag, .markmap-popover .hljs-doctag { color: var(--mm-syntax-keyword, #cf222e); }\n.markmap-popover .hljs-string, .markmap-popover .hljs-regexp, .markmap-popover .hljs-char,\n.markmap-popover .hljs-meta .hljs-string { color: var(--mm-syntax-string, #0a3069); }\n.markmap-popover .hljs-comment, .markmap-popover .hljs-quote { color: var(--mm-syntax-comment, #6e7781); font-style: italic; }\n.markmap-popover .hljs-number, .markmap-popover .hljs-literal, .markmap-popover .hljs-symbol,\n.markmap-popover .hljs-variable.constant_, .markmap-popover .hljs-built_in { color: var(--mm-syntax-number, #0550ae); }\n.markmap-popover .hljs-title, .markmap-popover .hljs-section { color: var(--mm-syntax-title, #8250df); }\n.markmap-popover .hljs-attr, .markmap-popover .hljs-attribute, .markmap-popover .hljs-property,\n.markmap-popover .hljs-name, .markmap-popover .hljs-selector-class { color: var(--mm-syntax-attr, #116329); }\n";
function Ex(e) {
	if (e.getElementById(wx)) return;
	let t = e.createElement("style");
	t.id = wx, t.textContent = Tx, e.head.append(t);
}
var Dx = 6, Ox = 8, kx = class {
	el;
	constructor(e, t, n) {
		Ex(e), this.el = e.createElement("div"), this.el.className = "markmap-popover", this.el.setAttribute("role", "dialog"), this.el.tabIndex = -1;
		for (let [e, t] of Object.entries(n)) this.el.style.setProperty(`--${e}`, t);
		this.el.innerHTML = t, e.body.append(this.el);
	}
	position(e) {
		let t = this.el.ownerDocument.defaultView, n = t?.innerWidth ?? 0, r = t?.innerHeight ?? 0, { width: i, height: a } = this.el.getBoundingClientRect(), o = e.y + e.height + Dx, s = e.y - Dx - a, c = o + a <= r - Ox || s < Ox ? o : s, l = Math.min(Math.max(Ox, e.x), Math.max(Ox, n - i - Ox));
		this.el.style.top = `${Math.round(c)}px`, this.el.style.left = `${Math.round(l)}px`;
	}
	contains(e) {
		return !!e && this.el.contains(e);
	}
	destroy() {
		this.el.remove();
	}
}, Ax = "http://www.w3.org/2000/svg", jx = class {
	element;
	nativeLinks = !0;
	themeSelector;
	root;
	style;
	items = /* @__PURE__ */ new Map();
	constructor(e, { themeSelector: t } = {}) {
		this.element = e, this.themeSelector = t;
		let n = e.ownerDocument;
		this.style = n.createElementNS(Ax, "style"), this.root = n.createElementNS(Ax, "g"), e.append(this.style, this.root);
	}
	setCSS(e) {
		this.style.textContent = e;
	}
	setTransform({ k: e, x: t, y: n }) {
		this.root.setAttribute("transform", `translate(${t},${n}) scale(${e})`);
	}
	get(e) {
		return this.items.get(e)?.el;
	}
	draw(e) {
		let t = /* @__PURE__ */ new Set(), n = null;
		e.forEach((e, r) => {
			if (e.backends && !e.backends.includes("svg")) return;
			let i = e.kind === "group", a = i && e.key ? e.key : `#${r}`;
			t.add(a);
			let o = this.items.get(a);
			o || (o = {
				el: this.root.ownerDocument.createElementNS(Ax, "g"),
				markup: ""
			}, this.items.set(a, o));
			let { el: s } = o;
			Mx(s, "transform", i && e.transform ? `matrix(${e.transform.join(" ")})` : null), Mx(s, "opacity", i && e.opacity != null ? String(e.opacity) : null), Mx(s, "data-node-id", i ? e.nodeId ?? null : null), Mx(s, "data-key", a);
			let c = On(i ? e.clip ? [{
				...e,
				transform: void 0,
				opacity: void 0
			}] : e.children : [e], { interactive: !0 });
			c !== o.markup && (Px(s, o.markup, c) || (s.innerHTML = c), o.markup = c);
			let l = n ? n.nextSibling : this.root.firstChild;
			l !== s && this.root.insertBefore(s, l), n = s;
		});
		for (let [e, n] of this.items) t.has(e) || (n.el.remove(), this.items.delete(e));
	}
	destroy() {
		this.style.remove(), this.root.remove(), this.items.clear();
	}
};
function Mx(e, t, n) {
	n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
var Nx = /^<path d="([^"]*)"([^>]*)\/>$/;
function Px(e, t, n) {
	let r = Nx.exec(t), i = Nx.exec(n), a = e.firstElementChild;
	return !r || !i || r[2] !== i[2] || i[1].includes("&") || !a || a !== e.lastElementChild ? !1 : (a.setAttribute("d", i[1]), !0);
}
var Fx = {
	now: () => performance.now(),
	request: (e) => requestAnimationFrame(e),
	cancel: (e) => cancelAnimationFrame(e)
}, Ix = class {
	scheduler;
	handle;
	constructor(e = Fx) {
		this.scheduler = e;
	}
	get running() {
		return this.handle != null;
	}
	start(e, t) {
		if (this.stop(), e <= 0) {
			t(1);
			return;
		}
		let n = this.scheduler.now(), r = () => {
			let i = Math.min(1, (this.scheduler.now() - n) / e);
			this.handle = i < 1 ? this.scheduler.request(r) : void 0, t(i);
		};
		this.handle = this.scheduler.request(r);
	}
	stop() {
		this.handle != null && (this.scheduler.cancel(this.handle), this.handle = void 0);
	}
}, Lx = {
	zoom: !0,
	pan: !0,
	fitPadding: 20,
	fitMaxScale: 2,
	minScale: .1,
	maxScale: 8,
	duration: 500
};
function Rx(e, t, n) {
	let { options: r, json: i, warnings: a } = Gt(e, t, n);
	for (let e of [
		"zoom",
		"pan",
		"fitPadding",
		"fitMaxScale",
		"minScale",
		"maxScale",
		"foldLevel",
		"duration",
		"colorScheme"
	]) i[e] != null && (r[e] = i[e]);
	return {
		options: r,
		warnings: a
	};
}
var zx = 1.25;
function Bx(e, t, n = 0) {
	t(e, n);
	for (let r of e.children) Bx(r, t, n + 1);
}
var Vx = 10, Hx = () => `markmap-${Math.random().toString(36).slice(2, 10)}`;
function Ux(e, t) {
	if (e.id === t) return [e];
	for (let n of e.children) {
		let r = Ux(n, t);
		if (r) return [e, ...r];
	}
}
var Wx = (e) => typeof e.draw == "function", Gx = class e {
	backend;
	scopeClass = Hx();
	viewOptions = Lx;
	zoomBehavior = vx();
	gestures;
	selection;
	measurer;
	root;
	folded = /* @__PURE__ */ new Set();
	known = /* @__PURE__ */ new Set();
	current;
	pendingFit;
	popover;
	popoverRequest = 0;
	frame;
	primitives = [];
	hits;
	stateTween = new Ix();
	zoomTween = new Ix();
	placed = !1;
	fitScale;
	zoomTarget;
	pin;
	constructor(e, t = {}) {
		this.backend = Wx(e) ? e : new jx(e);
		let { element: n } = this.backend;
		n.classList.add("markmap", this.scopeClass), this.measurer = t.measurer ?? gt(), this.applyOptions(t), this.selection = Jg(n), this.zoomBehavior.on("zoom", (e) => {
			e.sourceEvent && (this.zoomTween.stop(), this.pin = void 0), this.backend.setTransform(e.transform), this.positionPopover(), this.emit("zoom", e.transform);
		}), this.applyGestures();
	}
	applyGestures() {
		let e = this.options.gestures ?? bx;
		this.gestures?.use !== e && (this.gestures?.stop?.(), this.gestures = {
			use: e,
			stop: e ? e(this) : void 0
		});
	}
	updateScaleLimits() {
		let { minScale: e = 0, maxScale: t = Infinity } = this.viewOptions, n = this.fitScale ?? e;
		this.zoomBehavior.scaleExtent([Math.min(e, n), Math.max(t, n)]);
	}
	get scaleLimits() {
		let [e, t] = this.zoomBehavior.scaleExtent();
		return [e, t];
	}
	get themeClass() {
		return this.scopeClass;
	}
	get tree() {
		return this.root;
	}
	get element() {
		return this.backend.element;
	}
	get options() {
		return this.viewOptions;
	}
	setOptions(e) {
		this.applyOptions(e), this.render();
	}
	applyOptions(e) {
		this.viewOptions = {
			...Lx,
			...e
		}, e.measurer && (this.measurer = e.measurer);
		let t = this.backend.themeSelector ?? `.${this.scopeClass}`;
		this.backend.setCSS(Nn(this.theme, this.viewOptions.colorScheme, t)), this.updateScaleLimits(), this.gestures && this.applyGestures();
	}
	static create(t, n, r) {
		let i = new e(t, r);
		return n && (i.setTree(n), i.fit()), i;
	}
	get theme() {
		return this.options.theme ?? It;
	}
	get foldedIds() {
		return this.folded;
	}
	get result() {
		return this.current;
	}
	setTree(e, t) {
		t && this.applyOptions(t), this.root = e;
		let n = /* @__PURE__ */ new Set(), r = this.options.foldLevel, i = (e, t, a) => {
			n.add(e.id);
			let o = a || !!e.data.foldAll;
			!this.known.has(e.id) && e.children.length && (o || e.data.fold || r != null && t >= r) && this.folded.add(e.id);
			for (let n of e.children) i(n, t + 1, o);
		}, a = new Set(this.folded);
		i(e, 0, !1);
		for (let e of this.folded) n.has(e) || this.folded.delete(e);
		this.known = n, this.render(), qx(a, this.folded) || this.emit("fold", this.folded);
	}
	render({ animate: e = !0 } = {}) {
		if (!this.root) return;
		this.current = fn(this.root, {
			...this.viewOptions,
			measurer: this.measurer,
			folded: this.folded
		});
		let t = this.current.state, n = this.frame, r = e ? this.duration : 0;
		if (n && r > 0) {
			let e = this.theme, i = this.options.layout;
			this.stateTween.start(r, (r) => {
				this.drawFrame(r < 1 ? zn(n, t, Pn(r), e, i) : t), r >= 1 && (this.pin = void 0);
			});
		} else this.stateTween.stop(), this.drawFrame(t), this.pin = void 0;
		this.popover && (this.current.layout.byId.get(this.popover.id)?.node.notes.length ? this.positionPopover() : this.closeNotes()), this.emit("render", this.current);
		let { pending: i } = this.current;
		if (i) {
			let e = this.current;
			i.then(() => {
				this.current === e && this.render();
			});
		}
		return this.current;
	}
	drawFrame(e) {
		this.frame = e, this.primitives = pn(e, this.theme), this.backend.draw(this.primitives), this.applyPin(), this.positionPopover();
	}
	applyPin() {
		let e = this.pin && this.frameNode(this.pin.id)?.rect;
		if (!this.pin || !e) return;
		let { k: t, x: n, y: r } = this.transform, i = this.pin.x - (n + e.x * t), a = this.pin.y - (r + e.y * t);
		Math.abs(i) < 1e-6 && Math.abs(a) < 1e-6 || this.zoomBehavior.transform(this.selection, cx.translate(n + i, r + a).scale(t));
	}
	get duration() {
		return this.element.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : this.options.duration ?? 0;
	}
	frameNode(e) {
		return this.frame?.nodes.find((t) => t.node.id === e);
	}
	setFolded(e, t) {
		t !== this.folded.has(e) && this.updateFolded(e, () => {
			t ? this.folded.add(e) : this.folded.delete(e);
		});
	}
	setFoldedIds(e, { animate: t = !0 } = {}) {
		if (!this.root) return;
		let n = new Set(e);
		this.updateFolded(this.root.id, () => {
			this.folded.clear(), Bx(this.root, (e) => {
				n.has(e.id) && e.children.length && this.folded.add(e.id);
			});
		}, t);
	}
	focusNode(e, t = {}) {
		let n = this.root && Ux(this.root, e);
		if (!n) return !1;
		let { animate: r = !0 } = t, i = n.slice(0, -1).filter((e) => this.folded.has(e.id));
		if (i.length) {
			for (let e of i) this.folded.delete(e.id);
			this.render({ animate: r }), this.emit("fold", this.folded);
		}
		let a = this.current?.layout.byId.get(e)?.rect, { width: o, height: s } = this.element.getBoundingClientRect();
		if (a && o && s) {
			let [e, n] = this.zoomBehavior.scaleExtent(), i = Math.min(n, Math.max(e, t.scale ?? this.transform.k)), c = o / 2 - (a.x + a.width / 2) * i, l = s / 2 - (a.y + a.height / 2) * i;
			this.zoomTo(cx.translate(c, l).scale(i), r);
		}
		return !0;
	}
	expandAll(e) {
		let t = this.subtree(e);
		t && this.updateFolded(t.id, () => {
			Bx(t, (e) => this.folded.delete(e.id));
		});
	}
	foldAll(e) {
		let t = this.subtree(e);
		t && this.updateFolded(t.id, () => {
			Bx(t, (e) => {
				e.children.length && this.folded.add(e.id);
			});
		});
	}
	foldToLevel(e) {
		this.root && this.updateFolded(this.root.id, () => {
			Bx(this.root, (t, n) => {
				n >= e && t.children.length ? this.folded.add(t.id) : this.folded.delete(t.id);
			});
		});
	}
	subtree(e) {
		if (this.root) return e == null ? this.root : ne(this.root, e);
	}
	updateFolded(e, t, n = !0) {
		let r = new Set(this.folded);
		if (t(), qx(r, this.folded)) return;
		let i = this.frameNode(e) ?? (this.root && this.frameNode(this.root.id));
		if (i) {
			let [e, t] = this.transform.apply([i.rect.x, i.rect.y]);
			this.zoomTween.stop(), this.pin = {
				id: i.node.id,
				x: e,
				y: t
			};
		}
		this.render({ animate: n }), this.emit("fold", this.folded);
	}
	listeners = /* @__PURE__ */ new Map();
	on(e, t) {
		let n = this.listeners.get(e);
		return n || this.listeners.set(e, n = /* @__PURE__ */ new Set()), n.add(t), () => n.delete(t);
	}
	emit(e, t) {
		for (let n of this.listeners.get(e) ?? []) n(t);
	}
	zoomBy(e) {
		let { width: t, height: n } = this.element.getBoundingClientRect(), r = this.zoomTween.running && this.zoomTarget || this.transform, [i, a] = this.zoomBehavior.scaleExtent(), o = Math.min(a, Math.max(i, r.k * e)), s = t / 2, c = n / 2, l = (s - r.x) / r.k, u = (c - r.y) / r.k;
		this.zoomTo(cx.translate(s - l * o, c - u * o).scale(o));
	}
	zoomIn() {
		this.zoomBy(zx);
	}
	zoomOut() {
		this.zoomBy(1 / zx);
	}
	zoomTo(e, t = !0) {
		this.pin = void 0, this.zoomTarget = e;
		let n = this.transform, { width: r, height: i } = this.element.getBoundingClientRect(), a = (e) => this.zoomBehavior.transform(this.selection, e), o = t ? this.duration : 0;
		this.zoomTween.start(o, (t) => a(t < 1 ? Kx(n, e, Pn(t), r / 2, i / 2) : e));
	}
	toggle(e) {
		this.setFolded(e, !this.folded.has(e));
	}
	fit() {
		if (!this.current) return;
		let { width: e, height: t } = this.element.getBoundingClientRect();
		if (!e || !t) {
			this.fitWhenSized();
			return;
		}
		this.pendingFit?.disconnect(), this.pendingFit = void 0;
		let n = this.current.bounds, r = this.options.fitPadding ?? 0, i = Math.min((e - r * 2) / n.width, (t - r * 2) / n.height, this.options.fitMaxScale ?? 2);
		this.fitScale = i, this.updateScaleLimits();
		let a = cx.translate(e / 2, t / 2).scale(i).translate(-(n.x + n.width / 2), -(n.y + n.height / 2));
		this.zoomTo(a, this.placed), this.placed = !0;
	}
	fitWhenSized() {
		this.pendingFit || typeof ResizeObserver > "u" || (this.pendingFit = new ResizeObserver(() => {
			let { width: e, height: t } = this.element.getBoundingClientRect();
			e && t && this.fit();
		}), this.pendingFit.observe(this.element));
	}
	get transform() {
		return lx(this.element);
	}
	hitAt(e, t) {
		let { frame: n, result: r } = this;
		if (n && r) {
			if (this.hits?.frame !== n) {
				let e = n.nodes.filter((e) => e.ctx.hasChildren).map((e) => ({
					nodeId: e.node.id,
					...this.theme.node.anchor(e.rect, e.ctx.direction, e.ctx)
				})), t = new Sx(this.primitives, {
					toggles: e,
					toggleRadius: Vx,
					nodes: n.nodes.map((e) => ({
						nodeId: e.node.id,
						rect: e.rect
					})),
					include: (e) => r.layout.byId.has(e)
				});
				this.hits = {
					frame: n,
					index: t
				};
			}
			return this.hits.index.hit(e, t);
		}
	}
	layoutPoint(e, t) {
		let n = this.element.getBoundingClientRect();
		return this.transform.invert([e - n.x, t - n.y]);
	}
	get openNoteId() {
		return this.popover?.id;
	}
	async openNotes(e) {
		let t = this.current?.layout.byId.get(e);
		if (!t?.node.notes.length) return;
		this.closeNotes();
		let n = this.popoverRequest, { notesToHtml: r } = await import("./notes-html-DIYxB3aO-CGnzPcdc.js"), i = await r(t.node.notes, {
			plugins: this.options.plugins ?? it,
			highlight: this.options.highlight
		});
		if (n !== this.popoverRequest) return;
		let a = new kx(this.element.ownerDocument, i, this.currentTokens());
		a.el.setAttribute("aria-label", "Notes"), this.popover = {
			id: e,
			popover: a
		}, this.positionPopover();
		let o = this.element.ownerDocument;
		o.addEventListener("click", this.handleOutside, !0), o.addEventListener("keydown", this.handleKey), o.defaultView?.addEventListener("scroll", this.handleScroll, !0), a.el.focus({ preventScroll: !0 });
	}
	closeNotes() {
		if (this.popoverRequest += 1, !this.popover) return;
		this.popover.popover.destroy(), this.popover = void 0;
		let e = this.element.ownerDocument;
		e.removeEventListener("click", this.handleOutside, !0), e.removeEventListener("keydown", this.handleKey), e.defaultView?.removeEventListener("scroll", this.handleScroll, !0);
	}
	currentTokens() {
		let { tokens: e, darkTokens: t = {} } = this.theme, n = this.element.ownerDocument.defaultView?.getComputedStyle(this.element), r = {};
		for (let i of /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])) r[i] = n?.getPropertyValue(`--${i}`).trim() || e[i] || "";
		return r;
	}
	screenRect(e) {
		let t = this.frameNode(e)?.rect;
		if (!t) return;
		let n = this.element.getBoundingClientRect(), r = this.transform;
		return {
			x: n.x + r.applyX(t.x),
			y: n.y + r.applyY(t.y),
			width: t.width * r.k,
			height: t.height * r.k
		};
	}
	positionPopover() {
		if (!this.popover) return;
		let e = this.screenRect(this.popover.id);
		e && this.popover.popover.position(e);
	}
	handleOutside = (e) => {
		let t = e.composedPath()[0];
		if (!this.popover?.popover.contains(t)) {
			if (t && this.element.contains(t) && e instanceof MouseEvent) {
				let t = this.hitAt(...this.layoutPoint(e.clientX, e.clientY));
				if (t?.kind === "action" && t.action === "notes") return;
			}
			this.closeNotes();
		}
	};
	handleKey = (e) => {
		e.key === "Escape" && this.closeNotes();
	};
	handleScroll = (e) => {
		this.popover?.popover.contains(e.target) || this.closeNotes();
	};
	destroy() {
		this.root = void 0, this.listeners.clear(), this.stateTween.stop(), this.zoomTween.stop(), this.closeNotes(), this.gestures?.stop?.(), this.gestures = void 0, this.pendingFit?.disconnect(), this.backend.destroy(), this.element.classList.remove("markmap", this.scopeClass);
	}
};
function Kx(e, t, n, r, i) {
	let a = e.k * (t.k / e.k) ** n, o = (r - e.x) / e.k * (1 - n) + (r - t.x) / t.k * n, s = (i - e.y) / e.k * (1 - n) + (i - t.y) / t.k * n;
	return cx.translate(r - o * a, i - s * a).scale(a);
}
function qx(e, t) {
	return e.size === t.size && [...e].every((e) => t.has(e));
}
// ../element/dist/index.js
var Jx = "http://www.w3.org/2000/svg", Yx = ":host", Xx = "\n:host { display: block; position: relative; height: 400px; overflow: hidden; background: var(--mm-bg); }\n:host([hidden]) { display: none; }\n.markmap { display: block; width: 100%; height: 100%; }\n.markmap-toolbar { position: absolute; right: 8px; bottom: 8px; }\n", Zx = [
	"markdown",
	"options",
	"parseOptions",
	"src",
	"theme",
	"layout",
	"colorScheme",
	"renderer",
	"toolbar",
	"toolbarItems"
], Qx = globalThis.HTMLElement ?? Object;
function $x(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n");
	for (; t.length && !t[0].trim();) t.shift();
	for (; t.length && !t[t.length - 1].trim();) t.pop();
	let n = t.filter((e) => e.trim()).map((e) => /^[ \t]*/.exec(e)[0].length), r = Math.min(...n);
	return t.map((e) => e.slice(r)).join("\n");
}
var eS = (e) => typeof e == "object" && !!e && !Array.isArray(e), tS = class extends Qx {
	static observedAttributes = [
		"src",
		"theme",
		"layout",
		"color-scheme",
		"renderer",
		"toolbar"
	];
	map;
	controls;
	controlItems;
	sheet;
	content = null;
	viewOptions = {};
	parserOptions = {};
	optionWarnings = [];
	text;
	needsFit = !0;
	request;
	observer = new MutationObserver(() => {
		if (this.content != null || this.src != null) return;
		let e = this.inlineMarkdown();
		e !== this.text && this.show(e);
	});
	constructor() {
		super(), this.sheet = this.ownerDocument.createElement("style"), this.sheet.textContent = Xx, this.attachShadow({ mode: "open" }).append(this.sheet);
	}
	get mm() {
		return this.map;
	}
	get markdown() {
		return this.content;
	}
	set markdown(e) {
		this.content = e ?? null, this.load();
	}
	get options() {
		return this.viewOptions;
	}
	set options(e) {
		this.viewOptions = e, this.update();
	}
	get parseOptions() {
		return this.parserOptions;
	}
	set parseOptions(e) {
		this.parserOptions = e, this.update();
	}
	get warnings() {
		return this.optionWarnings;
	}
	get src() {
		return this.getAttribute("src");
	}
	set src(e) {
		this.reflect("src", e);
	}
	get theme() {
		return this.getAttribute("theme");
	}
	set theme(e) {
		this.reflect("theme", e);
	}
	get layout() {
		return this.getAttribute("layout");
	}
	set layout(e) {
		this.reflect("layout", e);
	}
	get colorScheme() {
		return this.getAttribute("color-scheme");
	}
	set colorScheme(e) {
		this.reflect("color-scheme", e);
	}
	get renderer() {
		return this.getAttribute("renderer");
	}
	set renderer(e) {
		this.reflect("renderer", e);
	}
	get toolbar() {
		return this.hasAttribute("toolbar");
	}
	set toolbar(e) {
		this.toggleAttribute("toolbar", e);
	}
	get toolbarItems() {
		return this.controlItems;
	}
	set toolbarItems(e) {
		this.controlItems = e, this.updateToolbar();
	}
	reflect(e, t) {
		t == null ? this.removeAttribute(e) : this.setAttribute(e, t);
	}
	connectedCallback() {
		this.upgradeProperties(), this.observer.observe(this, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), this.map || (this.createMap(), this.load());
	}
	disconnectedCallback() {
		queueMicrotask(() => {
			this.isConnected || (this.observer.disconnect(), this.request?.abort(), this.controls?.destroy(), this.controls = void 0, this.map?.destroy(), this.map = void 0);
		});
	}
	attributeChangedCallback(e, t, n) {
		if (t !== n && this.map) {
			if (e === "toolbar") this.updateToolbar();
			else if (e === "renderer") {
				let e = [...this.map.foldedIds];
				this.createMap(), this.update(), this.map.setFoldedIds(e, { animate: !1 });
			} else e === "src" ? (this.needsFit = !0, this.load()) : (this.needsFit ||= e !== "color-scheme", this.update());
		}
	}
	upgradeProperties() {
		for (let e of Zx) {
			if (!Object.hasOwn(this, e)) continue;
			let t = this[e];
			delete this[e], this[e] = t;
		}
	}
	updateToolbar() {
		this.controls?.destroy(), this.controls = void 0, this.map && this.toolbar && (this.controls = Ym(this.map, { items: this.controlItems }), this.shadowRoot.append(this.controls.element));
	}
	createMap() {
		this.map?.destroy();
		let e = this.ownerDocument, t = this.renderer === "canvas", n = t ? e.createElement("canvas") : e.createElementNS(Jx, "svg");
		this.shadowRoot.replaceChildren(this.sheet, n);
		let r = { themeSelector: Yx }, i = new Gx(t ? new er(n, r) : new jx(n, r), this.viewOptions);
		i.on("render", (e) => this.fire("render", e)), i.on("fold", (e) => this.fire("fold", e)), this.map = i, this.needsFit = !0, this.updateToolbar();
	}
	fire(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			detail: t,
			bubbles: !0,
			composed: !0
		}));
	}
	inlineMarkdown() {
		let e = this.querySelector("script[type=\"text/markdown\"]");
		return e ? $x(e.textContent ?? "") : void 0;
	}
	load() {
		this.request?.abort();
		let { src: e } = this;
		if (!this.map) return;
		if (this.content != null || e == null) {
			this.show(this.content ?? this.inlineMarkdown());
			return;
		}
		let t = new AbortController();
		this.request = t, fetch(new URL(e, this.baseURI), { signal: t.signal }).then((t) => {
			if (!t.ok) throw Error(`${e}: ${t.status} ${t.statusText}`);
			return t.text();
		}).then((e) => {
			t.signal.aborted || this.show(e);
		}, (e) => {
			t.signal.aborted || this.fire("error", e);
		});
	}
	show(e) {
		this.text = e, this.update();
	}
	update() {
		let { map: e, text: t } = this;
		if (!e || t == null) return;
		let { root: n, frontmatter: r, gfm: i } = Rm(t, this.parserOptions), a = {
			...this.theme != null && { theme: this.theme },
			...this.layout != null && { layout: this.layout },
			...this.colorScheme != null && { colorScheme: this.colorScheme }
		}, o = eS(r.markmap) ? r.markmap : {}, { options: s, warnings: c } = Rx(this.viewOptions, {
			...o,
			...a
		});
		this.optionWarnings = c, e.setTree(n, s), this.needsFit && (this.needsFit = !1, e.fit()), i || this.fire("gfmfallback", void 0);
	}
};
typeof customElements < "u" && !customElements.get("markmap-view") && customElements.define("markmap-view", tS);
// src/mount.ts
var nS = /* @__PURE__ */ new Set([
	"src",
	"theme",
	"layout",
	"color-scheme",
	"renderer",
	"toolbar"
]);
async function rS(e) {
	let { mathContent: t, remarkMath: n } = await import("./dist-CeLc_GN3.js");
	e.options = {
		...e.options,
		plugins: [...e.options.plugins ?? it, t]
	}, e.parseOptions = { plugins: [n] };
}
async function iS(e, t) {
	let n = document.createElement("markmap-view"), { theme: r, layout: i, colorScheme: a, renderer: o, toolbar: s } = t, c = {
		theme: r,
		layout: i,
		"color-scheme": a,
		renderer: o
	};
	for (let [e, t] of Object.entries(c)) t != null && n.setAttribute(e, t);
	n.toolbar = !!s;
	for (let { name: t, value: r } of e.attributes) {
		if (t === "data-markmap-pending" || t === "data-math") continue;
		let e = t.replace(/^data-/, "");
		n.setAttribute(nS.has(e) ? e : t, r);
	}
	n.options = t.options ?? {}, (t.math || e.hasAttribute("data-math")) && await rS(n);
	let l = e.querySelector("script[type=\"text/markdown\"]");
	return l ? n.append(l) : n.src || (n.markdown = $x(e.textContent ?? "")), e.replaceWith(n), n;
}
export { w as a, y as c, Cr as i, x as l, iS as mount, ua as n, S as o, Pi as r, v as s, P as t };
