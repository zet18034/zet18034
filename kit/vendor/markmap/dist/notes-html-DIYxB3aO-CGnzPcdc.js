import { c as e, i as t, n } from "./mount-C2TkKoFx.js";
import { n as r } from "./micromark-util-character-BJPn79sr.js";
// ../../node_modules/.pnpm/zwitch@2.0.4/node_modules/zwitch/index.js
var i = {}.hasOwnProperty;
function a(e, t) {
	let n = t || {};
	function r(t, ...n) {
		let a = r.invalid, o = r.handlers;
		if (t && i.call(t, e)) {
			let n = String(t[e]);
			a = i.call(o, n) ? o[n] : r.unknown;
		}
		if (a) return a.call(this, t, ...n);
	}
	return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
// ../../node_modules/.pnpm/micromark-util-sanitize-uri@2.0.1/node_modules/micromark-util-sanitize-uri/index.js
function o(e) {
	let t = [], n = -1, i = 0, a = 0;
	for (; ++n < e.length;) {
		let o = e.charCodeAt(n), s = "";
		if (o === 37 && r(e.charCodeAt(n + 1)) && r(e.charCodeAt(n + 2))) a = 2;
		else if (o < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (s = String.fromCharCode(o));
		else if (o > 55295 && o < 57344) {
			let t = e.charCodeAt(n + 1);
			o < 56320 && t > 56319 && t < 57344 ? (s = String.fromCharCode(o, t), a = 1) : s = "�";
		} else s = String.fromCharCode(o);
		s &&= (t.push(e.slice(i, n), encodeURIComponent(s)), i = n + a + 1, ""), a &&= (n += a, 0);
	}
	return t.join("") + e.slice(i);
}
// ../../node_modules/.pnpm/@ungap+structured-clone@1.4.0/node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: s } = Object, c = typeof self == "object" ? self : globalThis, l = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new c[e](t);
}, u = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? s(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof c[e] == "function" ? l(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n(l(a, o), i);
	};
	return r;
}, d = (e) => u(/* @__PURE__ */ new Map(), e)(0), f = "", { toString: p } = {}, { keys: m, is: h } = Object, g = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = p.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, f];
		case "Object": return [2, f];
		case "Date": return [3, f];
		case "RegExp": return [4, f];
		case "Map": return [5, f];
		case "Set": return [6, f];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, _ = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), ee = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = g(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && h(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of m(o)) (e || !_(g(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? f : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(_(g(n)) || _(g(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !_(g(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, te = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return ee(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, v = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? d(te(e, t)) : structuredClone(e) : (e, t) => d(te(e, t)), ne = ie("end"), re = ie("start");
function ie(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function ae(e) {
	let t = re(e), n = ne(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
// ../../node_modules/.pnpm/hast-util-sanitize@5.0.2/node_modules/hast-util-sanitize/lib/schema.js
var y = [
	"ariaDescribedBy",
	"ariaLabel",
	"ariaLabelledBy"
], b = {
	ancestors: {
		tbody: ["table"],
		td: ["table"],
		th: ["table"],
		thead: ["table"],
		tfoot: ["table"],
		tr: ["table"]
	},
	attributes: {
		a: [
			...y,
			"dataFootnoteBackref",
			"dataFootnoteRef",
			["className", "data-footnote-backref"],
			"href"
		],
		blockquote: ["cite"],
		code: [["className", /^language-./]],
		del: ["cite"],
		div: ["itemScope", "itemType"],
		dl: [...y],
		h2: [["className", "sr-only"]],
		img: [
			...y,
			"longDesc",
			"src"
		],
		input: [["disabled", !0], ["type", "checkbox"]],
		ins: ["cite"],
		li: [["className", "task-list-item"]],
		ol: [...y, ["className", "contains-task-list"]],
		q: ["cite"],
		section: ["dataFootnotes", ["className", "footnotes"]],
		source: ["srcSet"],
		summary: [...y],
		table: [...y],
		ul: [...y, ["className", "contains-task-list"]],
		"*": /* @__PURE__ */ "abbr.accept.acceptCharset.accessKey.action.align.alt.axis.border.cellPadding.cellSpacing.char.charOff.charSet.checked.clear.colSpan.color.cols.compact.coords.dateTime.dir.encType.frame.hSpace.headers.height.hrefLang.htmlFor.id.isMap.itemProp.label.lang.maxLength.media.method.multiple.name.noHref.noShade.noWrap.open.prompt.readOnly.rev.rowSpan.rows.rules.scope.selected.shape.size.span.start.summary.tabIndex.title.useMap.vAlign.value.width".split(".")
	},
	clobber: [
		"ariaDescribedBy",
		"ariaLabelledBy",
		"id",
		"name"
	],
	clobberPrefix: "user-content-",
	protocols: {
		cite: ["http", "https"],
		href: [
			"http",
			"https",
			"irc",
			"ircs",
			"mailto",
			"xmpp"
		],
		longDesc: ["http", "https"],
		src: ["http", "https"]
	},
	required: { input: {
		disabled: !0,
		type: "checkbox"
	} },
	strip: ["script"],
	tagNames: /* @__PURE__ */ "a.b.blockquote.br.code.dd.del.details.div.dl.dt.em.h1.h2.h3.h4.h5.h6.hr.i.img.input.ins.kbd.li.ol.p.picture.pre.q.rp.rt.ruby.s.samp.section.source.span.strike.strong.sub.summary.sup.table.tbody.td.tfoot.th.thead.tr.tt.ul.var".split(".")
}, x = {}.hasOwnProperty;
function oe(e, t) {
	let n = {
		type: "root",
		children: []
	}, r = se({
		schema: t ? {
			...b,
			...t
		} : b,
		stack: []
	}, e);
	return r && (Array.isArray(r) ? r.length === 1 ? n = r[0] : n.children = r : n = r), n;
}
function se(e, t) {
	if (t && typeof t == "object") {
		let n = t;
		switch (typeof n.type == "string" ? n.type : "") {
			case "comment": return ce(e, n);
			case "doctype": return le(e, n);
			case "element": return ue(e, n);
			case "root": return de(e, n);
			case "text": return fe(e, n);
		}
	}
}
function ce(e, t) {
	if (e.schema.allowComments) {
		let e = typeof t.value == "string" ? t.value : "", n = e.indexOf("-->"), r = {
			type: "comment",
			value: n < 0 ? e : e.slice(0, n)
		};
		return S(r, t), r;
	}
}
function le(e, t) {
	if (e.schema.allowDoctypes) {
		let e = { type: "doctype" };
		return S(e, t), e;
	}
}
function ue(e, t) {
	let n = typeof t.tagName == "string" ? t.tagName : "";
	e.stack.push(n);
	let r = pe(e, t.children), i = me(e, t.properties);
	e.stack.pop();
	let a = !1;
	if (n && n !== "*" && (!e.schema.tagNames || e.schema.tagNames.includes(n)) && (a = !0, e.schema.ancestors && x.call(e.schema.ancestors, n))) {
		let t = e.schema.ancestors[n], r = -1;
		for (a = !1; ++r < t.length;) e.stack.includes(t[r]) && (a = !0);
	}
	if (!a) return e.schema.strip && !e.schema.strip.includes(n) ? r : void 0;
	let o = {
		type: "element",
		tagName: n,
		properties: i,
		children: r
	};
	return S(o, t), o;
}
function de(e, t) {
	let n = {
		type: "root",
		children: pe(e, t.children)
	};
	return S(n, t), n;
}
function fe(e, t) {
	let n = {
		type: "text",
		value: typeof t.value == "string" ? t.value : ""
	};
	return S(n, t), n;
}
function pe(e, t) {
	let n = [];
	if (Array.isArray(t)) {
		let r = t, i = -1;
		for (; ++i < r.length;) {
			let t = se(e, r[i]);
			t && (Array.isArray(t) ? n.push(...t) : n.push(t));
		}
	}
	return n;
}
function me(e, t) {
	let n = e.stack[e.stack.length - 1], r = e.schema.attributes, i = e.schema.required, a = r && x.call(r, n) ? r[n] : void 0, o = r && x.call(r, "*") ? r["*"] : void 0, s = t && typeof t == "object" ? t : {}, c = {}, l;
	for (l in s) if (x.call(s, l)) {
		let t = s[l], n = he(e, ye(a, l), l, t);
		n ??= he(e, ye(o, l), l, t), n != null && (c[l] = n);
	}
	if (i && x.call(i, n)) {
		let e = i[n];
		for (l in e) x.call(e, l) && !x.call(c, l) && (c[l] = e[l]);
	}
	return c;
}
function he(e, t, n, r) {
	return t ? Array.isArray(r) ? ge(e, t, n, r) : _e(e, t, n, r) : void 0;
}
function ge(e, t, n, r) {
	let i = -1, a = [];
	for (; ++i < r.length;) {
		let o = _e(e, t, n, r[i]);
		(typeof o == "number" || typeof o == "string") && a.push(o);
	}
	return a;
}
function _e(e, t, n, r) {
	if ((typeof r == "boolean" || typeof r == "number" || typeof r == "string") && ve(e, n, r)) {
		if (typeof t == "object" && t.length > 1) {
			let e = !1, n = 0;
			for (; ++n < t.length;) {
				let i = t[n];
				if (i && typeof i == "object" && "flags" in i) {
					if (i.test(String(r))) {
						e = !0;
						break;
					}
				} else if (i === r) {
					e = !0;
					break;
				}
			}
			if (!e) return;
		}
		return e.schema.clobber && e.schema.clobberPrefix && e.schema.clobber.includes(n) ? e.schema.clobberPrefix + r : r;
	}
}
function ve(e, t, n) {
	let r = e.schema.protocols && x.call(e.schema.protocols, t) ? e.schema.protocols[t] : void 0;
	if (!r || r.length === 0) return !0;
	let i = String(n), a = i.indexOf(":"), o = i.indexOf("?"), s = i.indexOf("#"), c = i.indexOf("/");
	if (a < 0 || c > -1 && a > c || o > -1 && a > o || s > -1 && a > s) return !0;
	let l = -1;
	for (; ++l < r.length;) {
		let e = r[l];
		if (a === e.length && i.slice(0, e.length) === e) return !0;
	}
	return !1;
}
function S(e, t) {
	let n = ae(t);
	t.data && (e.data = v(t.data)), n && (e.position = n);
}
function ye(e, t) {
	let n, r = -1;
	if (e) for (; ++r < e.length;) {
		let i = e[r], a = typeof i == "string" ? i : i[0];
		if (a === t) return i;
		a === "data*" && (n = i);
	}
	if (t.length > 4 && t.slice(0, 4).toLowerCase() === "data") return n;
}
// ../../node_modules/.pnpm/html-void-elements@3.0.0/node_modules/html-void-elements/index.js
var be = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
], C = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
C.prototype.normal = {}, C.prototype.property = {}, C.prototype.space = void 0;
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/merge.js
function xe(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new C(n, r, t);
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/normalize.js
function w(e) {
	return e.toLowerCase();
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/info.js
var T = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
T.prototype.attribute = "", T.prototype.booleanish = !1, T.prototype.boolean = !1, T.prototype.commaOrSpaceSeparated = !1, T.prototype.commaSeparated = !1, T.prototype.defined = !1, T.prototype.mustUseProperty = !1, T.prototype.number = !1, T.prototype.overloadedBoolean = !1, T.prototype.property = "", T.prototype.spaceSeparated = !1, T.prototype.space = void 0;
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/types.js
var E = /* @__PURE__ */ e({
	boolean: () => D,
	booleanish: () => O,
	commaOrSpaceSeparated: () => N,
	commaSeparated: () => M,
	number: () => A,
	overloadedBoolean: () => k,
	spaceSeparated: () => j
}), Se = 0, D = P(), O = P(), k = P(), A = P(), j = P(), M = P(), N = P();
function P() {
	return 2 ** ++Se;
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/defined-info.js
var F = Object.keys(E), I = class extends T {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), Ce(this, "space", r), typeof n == "number") for (; ++i < F.length;) {
			let e = F[i];
			Ce(this, F[i], (n & E[e]) === E[e]);
		}
	}
};
I.prototype.defined = !0;
function Ce(e, t, n) {
	n && (e[t] = n);
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/create.js
function L(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new I(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[w(r)] = r, n[w(a.attribute)] = r;
	}
	return new C(t, n, e.space);
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/aria.js
var we = L({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: O,
		ariaAutoComplete: null,
		ariaBusy: O,
		ariaChecked: O,
		ariaColCount: A,
		ariaColIndex: A,
		ariaColSpan: A,
		ariaControls: j,
		ariaCurrent: null,
		ariaDescribedBy: j,
		ariaDetails: null,
		ariaDisabled: O,
		ariaDropEffect: j,
		ariaErrorMessage: null,
		ariaExpanded: O,
		ariaFlowTo: j,
		ariaGrabbed: O,
		ariaHasPopup: null,
		ariaHidden: O,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: j,
		ariaLevel: A,
		ariaLive: null,
		ariaModal: O,
		ariaMultiLine: O,
		ariaMultiSelectable: O,
		ariaOrientation: null,
		ariaOwns: j,
		ariaPlaceholder: null,
		ariaPosInSet: A,
		ariaPressed: O,
		ariaReadOnly: O,
		ariaRelevant: null,
		ariaRequired: O,
		ariaRoleDescription: j,
		ariaRowCount: A,
		ariaRowIndex: A,
		ariaRowSpan: A,
		ariaSelected: O,
		ariaSetSize: A,
		ariaSort: null,
		ariaValueMax: A,
		ariaValueMin: A,
		ariaValueNow: A,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-sensitive-transform.js
function Te(e, t) {
	return t in e ? e[t] : t;
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-insensitive-transform.js
function Ee(e, t) {
	return Te(e, t.toLowerCase());
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/html.js
var De = L({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: M,
		acceptCharset: j,
		accessKey: j,
		action: null,
		allow: null,
		allowFullScreen: D,
		allowPaymentRequest: D,
		allowUserMedia: D,
		alpha: D,
		alt: null,
		as: null,
		async: D,
		autoCapitalize: null,
		autoComplete: j,
		autoFocus: D,
		autoPlay: D,
		blocking: j,
		capture: null,
		charSet: null,
		checked: D,
		cite: null,
		className: j,
		closedBy: null,
		colorSpace: null,
		cols: A,
		colSpan: A,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: O,
		controls: D,
		controlsList: j,
		coords: A | M,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: D,
		defer: D,
		dir: null,
		dirName: null,
		disabled: D,
		download: k,
		draggable: O,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: D,
		formTarget: null,
		headers: j,
		height: A,
		hidden: k,
		high: A,
		href: null,
		hrefLang: null,
		htmlFor: j,
		httpEquiv: j,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: D,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: D,
		itemId: null,
		itemProp: j,
		itemRef: j,
		itemScope: D,
		itemType: j,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: D,
		low: A,
		manifest: null,
		max: null,
		maxLength: A,
		media: null,
		method: null,
		min: null,
		minLength: A,
		multiple: D,
		muted: D,
		name: null,
		nonce: null,
		noModule: D,
		noValidate: D,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: D,
		optimum: A,
		pattern: null,
		ping: j,
		placeholder: null,
		playsInline: D,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: D,
		referrerPolicy: null,
		rel: j,
		required: D,
		reversed: D,
		rows: A,
		rowSpan: A,
		sandbox: j,
		scope: null,
		scoped: D,
		seamless: D,
		selected: D,
		shadowRootClonable: D,
		shadowRootCustomElementRegistry: D,
		shadowRootDelegatesFocus: D,
		shadowRootMode: null,
		shadowRootSerializable: D,
		shape: null,
		size: A,
		sizes: null,
		slot: null,
		span: A,
		spellCheck: O,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: A,
		step: null,
		style: null,
		tabIndex: A,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: D,
		useMap: null,
		value: O,
		width: A,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: j,
		axis: null,
		background: null,
		bgColor: null,
		border: A,
		borderColor: null,
		bottomMargin: A,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: D,
		declare: D,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: A,
		leftMargin: A,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: A,
		marginWidth: A,
		noResize: D,
		noHref: D,
		noShade: D,
		noWrap: D,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: A,
		rules: null,
		scheme: null,
		scrolling: O,
		standby: null,
		summary: null,
		text: null,
		topMargin: A,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: A,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: D,
		disablePictureInPicture: D,
		disableRemotePlayback: D,
		exportParts: M,
		part: j,
		prefix: null,
		property: null,
		results: A,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Ee
}), Oe = L({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: N,
		accentHeight: A,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: A,
		amplitude: A,
		arabicForm: null,
		ascent: A,
		attributeName: null,
		attributeType: null,
		azimuth: A,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: A,
		by: null,
		calcMode: null,
		capHeight: A,
		className: j,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: A,
		diffuseConstant: A,
		direction: null,
		display: null,
		dur: null,
		divisor: A,
		dominantBaseline: null,
		download: D,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: A,
		enableBackground: null,
		end: null,
		event: null,
		exponent: A,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: A,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: M,
		g2: M,
		glyphName: M,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: A,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: A,
		horizOriginX: A,
		horizOriginY: A,
		id: null,
		ideographic: A,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: A,
		k: A,
		k1: A,
		k2: A,
		k3: A,
		k4: A,
		kernelMatrix: N,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: A,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: A,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: A,
		overlineThickness: A,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: A,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: j,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: A,
		pointsAtY: A,
		pointsAtZ: A,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: N,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: N,
		rev: N,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: N,
		requiredFeatures: N,
		requiredFonts: N,
		requiredFormats: N,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: A,
		specularExponent: A,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: A,
		strikethroughThickness: A,
		string: null,
		stroke: null,
		strokeDashArray: N,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: A,
		strokeOpacity: A,
		strokeWidth: null,
		style: null,
		surfaceScale: A,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: N,
		tabIndex: A,
		tableValues: null,
		target: null,
		targetX: A,
		targetY: A,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: N,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: A,
		underlineThickness: A,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: A,
		values: null,
		vAlphabetic: A,
		vMathematical: A,
		vectorEffect: null,
		vHanging: A,
		vIdeographic: A,
		version: null,
		vertAdvY: A,
		vertOriginX: A,
		vertOriginY: A,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: A,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: Te
}), R = L({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), z = L({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Ee
}), B = L({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), ke = /[A-Z]/g, Ae = /-[a-z]/g, je = /^data[-\w.:]+$/i;
function Me(e, t) {
	let n = w(t), r = t, i = T;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && je.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(Ae, Pe);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!Ae.test(e)) {
				let n = e.replace(ke, Ne);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = I;
	}
	return new i(r, t);
}
function Ne(e) {
	return "-" + e.toLowerCase();
}
function Pe(e) {
	return e.charAt(1).toUpperCase();
}
// ../../node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/index.js
var Fe = xe([
	we,
	De,
	R,
	z,
	B
], "html"), V = xe([
	we,
	Oe,
	R,
	z,
	B
], "svg"), Ie = /["&'<>`]/g, Le = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Re = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, ze = /[|\\{}()[\]^$+*?.]/g, Be = /* @__PURE__ */ new WeakMap();
function Ve(e, t) {
	return e = e.replace(t.subset ? He(t.subset) : Ie, r), t.subset || t.escapeOnly ? e : e.replace(Le, n).replace(Re, r);
	function n(e, n, r) {
		return t.format((e.charCodeAt(0) - 55296) * 1024 + e.charCodeAt(1) - 56320 + 65536, r.charCodeAt(n + 2), t);
	}
	function r(e, n, r) {
		return t.format(e.charCodeAt(0), r.charCodeAt(n + 1), t);
	}
}
function He(e) {
	let t = Be.get(e);
	return t || (t = Ue(e), Be.set(e, t)), t;
}
function Ue(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t.push(e[n].replace(ze, "\\$&"));
	return RegExp("(?:" + t.join("|") + ")", "g");
}
// ../../node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/to-hexadecimal.js
var We = /[\dA-Fa-f]/;
function Ge(e, t, n) {
	let r = "&#x" + e.toString(16).toUpperCase();
	return n && t && !We.test(String.fromCharCode(t)) ? r : r + ";";
}
// ../../node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/to-decimal.js
var Ke = /\d/;
function qe(e, t, n) {
	let r = "&#" + String(e);
	return n && t && !Ke.test(String.fromCharCode(t)) ? r : r + ";";
}
// ../../node_modules/.pnpm/character-entities-legacy@3.0.0/node_modules/character-entities-legacy/index.js
var Je = /* @__PURE__ */ "AElig.AMP.Aacute.Acirc.Agrave.Aring.Atilde.Auml.COPY.Ccedil.ETH.Eacute.Ecirc.Egrave.Euml.GT.Iacute.Icirc.Igrave.Iuml.LT.Ntilde.Oacute.Ocirc.Ograve.Oslash.Otilde.Ouml.QUOT.REG.THORN.Uacute.Ucirc.Ugrave.Uuml.Yacute.aacute.acirc.acute.aelig.agrave.amp.aring.atilde.auml.brvbar.ccedil.cedil.cent.copy.curren.deg.divide.eacute.ecirc.egrave.eth.euml.frac12.frac14.frac34.gt.iacute.icirc.iexcl.igrave.iquest.iuml.laquo.lt.macr.micro.middot.nbsp.not.ntilde.oacute.ocirc.ograve.ordf.ordm.oslash.otilde.ouml.para.plusmn.pound.quot.raquo.reg.sect.shy.sup1.sup2.sup3.szlig.thorn.times.uacute.ucirc.ugrave.uml.uuml.yacute.yen.yuml".split("."), H = {
	nbsp: "\xA0",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	Agrave: "À",
	Aacute: "Á",
	Acirc: "Â",
	Atilde: "Ã",
	Auml: "Ä",
	Aring: "Å",
	AElig: "Æ",
	Ccedil: "Ç",
	Egrave: "È",
	Eacute: "É",
	Ecirc: "Ê",
	Euml: "Ë",
	Igrave: "Ì",
	Iacute: "Í",
	Icirc: "Î",
	Iuml: "Ï",
	ETH: "Ð",
	Ntilde: "Ñ",
	Ograve: "Ò",
	Oacute: "Ó",
	Ocirc: "Ô",
	Otilde: "Õ",
	Ouml: "Ö",
	times: "×",
	Oslash: "Ø",
	Ugrave: "Ù",
	Uacute: "Ú",
	Ucirc: "Û",
	Uuml: "Ü",
	Yacute: "Ý",
	THORN: "Þ",
	szlig: "ß",
	agrave: "à",
	aacute: "á",
	acirc: "â",
	atilde: "ã",
	auml: "ä",
	aring: "å",
	aelig: "æ",
	ccedil: "ç",
	egrave: "è",
	eacute: "é",
	ecirc: "ê",
	euml: "ë",
	igrave: "ì",
	iacute: "í",
	icirc: "î",
	iuml: "ï",
	eth: "ð",
	ntilde: "ñ",
	ograve: "ò",
	oacute: "ó",
	ocirc: "ô",
	otilde: "õ",
	ouml: "ö",
	divide: "÷",
	oslash: "ø",
	ugrave: "ù",
	uacute: "ú",
	ucirc: "û",
	uuml: "ü",
	yacute: "ý",
	thorn: "þ",
	yuml: "ÿ",
	fnof: "ƒ",
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigmaf: "ς",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",
	thetasym: "ϑ",
	upsih: "ϒ",
	piv: "ϖ",
	bull: "•",
	hellip: "…",
	prime: "′",
	Prime: "″",
	oline: "‾",
	frasl: "⁄",
	weierp: "℘",
	image: "ℑ",
	real: "ℜ",
	trade: "™",
	alefsym: "ℵ",
	larr: "←",
	uarr: "↑",
	rarr: "→",
	darr: "↓",
	harr: "↔",
	crarr: "↵",
	lArr: "⇐",
	uArr: "⇑",
	rArr: "⇒",
	dArr: "⇓",
	hArr: "⇔",
	forall: "∀",
	part: "∂",
	exist: "∃",
	empty: "∅",
	nabla: "∇",
	isin: "∈",
	notin: "∉",
	ni: "∋",
	prod: "∏",
	sum: "∑",
	minus: "−",
	lowast: "∗",
	radic: "√",
	prop: "∝",
	infin: "∞",
	ang: "∠",
	and: "∧",
	or: "∨",
	cap: "∩",
	cup: "∪",
	int: "∫",
	there4: "∴",
	sim: "∼",
	cong: "≅",
	asymp: "≈",
	ne: "≠",
	equiv: "≡",
	le: "≤",
	ge: "≥",
	sub: "⊂",
	sup: "⊃",
	nsub: "⊄",
	sube: "⊆",
	supe: "⊇",
	oplus: "⊕",
	otimes: "⊗",
	perp: "⊥",
	sdot: "⋅",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	lang: "〈",
	rang: "〉",
	loz: "◊",
	spades: "♠",
	clubs: "♣",
	hearts: "♥",
	diams: "♦",
	quot: "\"",
	amp: "&",
	lt: "<",
	gt: ">",
	OElig: "Œ",
	oelig: "œ",
	Scaron: "Š",
	scaron: "š",
	Yuml: "Ÿ",
	circ: "ˆ",
	tilde: "˜",
	ensp: " ",
	emsp: " ",
	thinsp: " ",
	zwnj: "‌",
	zwj: "‍",
	lrm: "‎",
	rlm: "‏",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	sbquo: "‚",
	ldquo: "“",
	rdquo: "”",
	bdquo: "„",
	dagger: "†",
	Dagger: "‡",
	permil: "‰",
	lsaquo: "‹",
	rsaquo: "›",
	euro: "€"
}, Ye = [
	"cent",
	"copy",
	"divide",
	"gt",
	"lt",
	"not",
	"para",
	"times"
], Xe = {}.hasOwnProperty, U = {}, W;
for (W in H) Xe.call(H, W) && (U[H[W]] = W);
var Ze = /[^\dA-Za-z]/;
function Qe(e, t, n, r) {
	let i = String.fromCharCode(e);
	if (Xe.call(U, i)) {
		let e = U[i], a = "&" + e;
		return n && Je.includes(e) && !Ye.includes(e) && (!r || t && t !== 61 && Ze.test(String.fromCharCode(t))) ? a : a + ";";
	}
	return "";
}
// ../../node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/format-smart.js
function $e(e, t, n) {
	let r = Ge(e, t, n.omitOptionalSemicolons), i;
	if ((n.useNamedReferences || n.useShortestReferences) && (i = Qe(e, t, n.omitOptionalSemicolons, n.attribute)), (n.useShortestReferences || !i) && n.useShortestReferences) {
		let i = qe(e, t, n.omitOptionalSemicolons);
		i.length < r.length && (r = i);
	}
	return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
// ../../node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/index.js
function G(e, t) {
	return Ve(e, Object.assign({ format: $e }, t));
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/comment.js
var et = /^>|^->|<!--|-->|--!>|<!-$/g, tt = [">"], nt = ["<", ">"];
function rt(e, t, n, r) {
	return r.settings.bogusComments ? "<?" + G(e.value, Object.assign({}, r.settings.characterReferences, { subset: tt })) + ">" : "<!--" + e.value.replace(et, i) + "-->";
	function i(e) {
		return G(e, Object.assign({}, r.settings.characterReferences, { subset: nt }));
	}
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/doctype.js
function it(e, t, n, r) {
	return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
// ../../node_modules/.pnpm/comma-separated-tokens@2.0.3/node_modules/comma-separated-tokens/index.js
function at(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
// ../../node_modules/.pnpm/space-separated-tokens@2.0.2/node_modules/space-separated-tokens/index.js
function ot(e) {
	return e.join(" ").trim();
}
// ../../node_modules/.pnpm/hast-util-whitespace@3.0.0/node_modules/hast-util-whitespace/lib/index.js
var st = /[ \t\n\f\r]/g;
function K(e) {
	return typeof e == "object" ? e.type === "text" && ct(e.value) : ct(e);
}
function ct(e) {
	return e.replace(st, "") === "";
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/omission/util/siblings.js
var q = dt(1), lt = dt(-1), ut = [];
function dt(e) {
	return t;
	function t(t, n, r) {
		let i = t ? t.children : ut, a = (n || 0) + e, o = i[a];
		if (!r) for (; o && K(o);) a += e, o = i[a];
		return o;
	}
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/omission/omission.js
var ft = {}.hasOwnProperty;
function pt(e) {
	return t;
	function t(t, n, r) {
		return ft.call(e, t.tagName) && e[t.tagName](t, n, r);
	}
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/omission/closing.js
var J = pt({
	body: ht,
	caption: Y,
	colgroup: Y,
	dd: yt,
	dt: vt,
	head: Y,
	html: mt,
	li: _t,
	optgroup: xt,
	option: St,
	p: gt,
	rp: bt,
	rt: bt,
	tbody: wt,
	td: Dt,
	tfoot: Tt,
	th: Dt,
	thead: Ct,
	tr: Et
});
function Y(e, t, n) {
	let r = q(n, t, !0);
	return !r || r.type !== "comment" && !(r.type === "text" && K(r.value.charAt(0)));
}
function mt(e, t, n) {
	let r = q(n, t);
	return !r || r.type !== "comment";
}
function ht(e, t, n) {
	let r = q(n, t);
	return !r || r.type !== "comment";
}
function gt(e, t, n) {
	let r = q(n, t);
	return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !n || n.type !== "element" || n.tagName !== "a" && n.tagName !== "audio" && n.tagName !== "del" && n.tagName !== "ins" && n.tagName !== "map" && n.tagName !== "noscript" && n.tagName !== "video" && !n.tagName.includes("-");
}
function _t(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && r.tagName === "li";
}
function vt(e, t, n) {
	let r = q(n, t);
	return !(!r || r.type !== "element" || r.tagName !== "dt" && r.tagName !== "dd");
}
function yt(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function bt(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function xt(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && r.tagName === "optgroup";
}
function St(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function Ct(e, t, n) {
	let r = q(n, t);
	return !(!r || r.type !== "element" || r.tagName !== "tbody" && r.tagName !== "tfoot");
}
function wt(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function Tt(e, t, n) {
	return !q(n, t);
}
function Et(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && r.tagName === "tr";
}
function Dt(e, t, n) {
	let r = q(n, t);
	return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/omission/opening.js
var Ot = pt({
	body: jt,
	colgroup: Mt,
	head: At,
	html: kt,
	tbody: Nt
});
function kt(e) {
	let t = q(e, -1);
	return !t || t.type !== "comment";
}
function At(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.children) if (n.type === "element" && (n.tagName === "base" || n.tagName === "title")) {
		if (t.has(n.tagName)) return !1;
		t.add(n.tagName);
	}
	let n = e.children[0];
	return !n || n.type === "element";
}
function jt(e) {
	let t = q(e, -1, !0);
	return !t || t.type !== "comment" && !(t.type === "text" && K(t.value.charAt(0))) && (t.type !== "element" || t.tagName !== "meta" && t.tagName !== "link" && t.tagName !== "script" && t.tagName !== "style" && t.tagName !== "template");
}
function Mt(e, t, n) {
	let r = lt(n, t);
	if (n && r && r.type === "element" && r.tagName === "colgroup" && J(r, n.children.indexOf(r), n)) return !1;
	let i = q(e, -1, !0);
	return !!(i && i.type === "element" && i.tagName === "col");
}
function Nt(e, t, n) {
	let r = lt(n, t);
	if (n && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && J(r, n.children.indexOf(r), n)) return !1;
	let i = q(e, -1);
	return !!(i && i.type === "element" && i.tagName === "tr");
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/element.js
var X = {
	name: [["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")], ["\0	\n\f\r \"&'/<=>".split(""), "\0	\n\f\r \"&'/<=>`".split("")]],
	unquoted: [["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")], ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]],
	single: [["&'".split(""), "\"&'`".split("")], ["\0&'".split(""), "\0\"&'`".split("")]],
	double: [["\"&".split(""), "\"&'`".split("")], ["\0\"&".split(""), "\0\"&'`".split("")]]
}, Pt = /* @__PURE__ */ new Set([
	"desc",
	"foreignObject",
	"title"
]);
function Ft(e, t, n, r) {
	let { schema: i } = r, a = i.space !== "svg" && r.settings.omitOptionalTags, o = i.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(e.tagName.toLowerCase()), s = [];
	i.space === "html" && e.tagName === "svg" && (r.schema = V);
	let c = It(r, e.properties);
	r.schema.space === "svg" && Pt.has(e.tagName) && (r.schema = Fe);
	let l = r.all(i.space === "html" && e.tagName === "template" ? e.content : e);
	if (r.schema = i, l && (o = !1), c || !a || !Ot(e, t, n)) {
		if (s.push("<", e.tagName, c ? " " + c : ""), o && (i.space === "svg" || r.settings.closeSelfClosing)) {
			let e = c.charAt(c.length - 1);
			(!r.settings.tightSelfClosing || e === "/" || e && e !== "\"" && e !== "'") && s.push(" "), s.push("/");
		}
		s.push(">");
	}
	return s.push(l), o || a && J(e, t, n) || s.push("</" + e.tagName + ">"), s.join("");
}
function It(e, t) {
	let n = [], r = -1, i;
	if (t) {
		for (i in t) if (t[i] !== null && t[i] !== void 0) {
			let r = Lt(e, i, t[i]);
			r && n.push(r);
		}
	}
	for (; ++r < n.length;) {
		let t = e.settings.tightAttributes ? n[r].charAt(n[r].length - 1) : void 0;
		r !== n.length - 1 && t !== "\"" && t !== "'" && (n[r] += " ");
	}
	return n.join("");
}
function Lt(e, n, r) {
	let i = Me(e.schema, n), a = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1, o = +!e.settings.allowDangerousCharacters;
	if (i.overloadedBoolean && (r === i.attribute || r === "") ? r = !0 : (i.boolean || i.overloadedBoolean) && (typeof r != "string" || r === i.attribute || r === "") && (r = !!r), r == null || r === !1 || typeof r == "number" && Number.isNaN(r)) return "";
	let s = G(i.attribute, Object.assign({}, e.settings.characterReferences, { subset: X.name[a][o] }));
	if (r === !0 || (r = Array.isArray(r) ? (i.commaSeparated ? at : ot)(r, { padLeft: !e.settings.tightCommaSeparatedLists }) : String(r), e.settings.collapseEmptyAttributes && !r)) return s;
	let c;
	if (e.settings.preferUnquoted && (c = G(r, Object.assign({}, e.settings.characterReferences, {
		attribute: !0,
		subset: X.unquoted[a][o]
	}))), c !== r) {
		let { quote: n } = e;
		e.settings.quoteSmart && t(r, n) > t(r, e.alternative) && (n = e.alternative), c = n + G(r, Object.assign({}, e.settings.characterReferences, {
			subset: (n === "'" ? X.single : X.double)[a][o],
			attribute: !0
		})) + n;
	}
	return s + (c && "=" + c);
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/text.js
var Rt = ["<", "&"];
function zt(e, t, n, r) {
	return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? e.value : G(e.value, Object.assign({}, r.settings.characterReferences, { subset: Rt }));
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/raw.js
function Bt(e, t, n, r) {
	return r.settings.allowDangerousHtml ? e.value : zt(e, t, n, r);
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/root.js
function Vt(e, t, n, r) {
	return r.all(e);
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/handle/index.js
var Ht = a("type", {
	invalid: Ut,
	unknown: Wt,
	handlers: {
		comment: rt,
		doctype: it,
		element: Ft,
		raw: Bt,
		root: Vt,
		text: zt
	}
});
function Ut(e) {
	throw Error("Expected node, not `" + e + "`");
}
function Wt(e) {
	throw Error("Cannot compile unknown node `" + e.type + "`");
}
// ../../node_modules/.pnpm/hast-util-to-html@9.0.6/node_modules/hast-util-to-html/lib/index.js
var Gt = {}, Kt = {}, qt = [];
function Jt(e, t) {
	let n = t || Gt, r = n.quote || "\"";
	if (r !== "\"" && r !== "'") throw Error("Invalid quote `" + r + "`, expected `'` or `\"`");
	let i = r === "\"" ? "'" : "\"";
	return {
		one: Yt,
		all: Xt,
		settings: {
			omitOptionalTags: n.omitOptionalTags || !1,
			allowParseErrors: n.allowParseErrors || !1,
			allowDangerousCharacters: n.allowDangerousCharacters || !1,
			quoteSmart: n.quoteSmart || !1,
			preferUnquoted: n.preferUnquoted || !1,
			tightAttributes: n.tightAttributes || !1,
			upperDoctype: n.upperDoctype || !1,
			tightDoctype: n.tightDoctype || !1,
			bogusComments: n.bogusComments || !1,
			tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
			tightSelfClosing: n.tightSelfClosing || !1,
			collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
			allowDangerousHtml: n.allowDangerousHtml || !1,
			voids: n.voids || be,
			characterReferences: n.characterReferences || Kt,
			closeSelfClosing: n.closeSelfClosing || !1,
			closeEmptyElements: n.closeEmptyElements || !1
		},
		schema: n.space === "svg" ? V : Fe,
		quote: r,
		alternative: i
	}.one(Array.isArray(e) ? {
		type: "root",
		children: e
	} : e, void 0, void 0);
}
function Yt(e, t, n) {
	return Ht(e, t, n, this);
}
function Xt(e) {
	let t = [], n = e && e.children || qt, r = -1;
	for (; ++r < n.length;) t[r] = this.one(n[r], r, e);
	return t.join("");
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function Zt(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/break.js
function Qt(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/code.js
function $t(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/delete.js
function en(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function tn(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function nn(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = o(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), s, c = e.footnoteCounts.get(r);
	c === void 0 ? (c = 0, e.footnoteOrder.push(r), s = e.footnoteOrder.length) : s = a + 1, c += 1, e.footnoteCounts.set(r, c);
	let l = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (c > 1 ? "-" + c : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(s)
		}]
	};
	e.patch(t, l);
	let u = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [l]
	};
	return e.patch(t, u), e.applyData(t, u);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/heading.js
function rn(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/html.js
function an(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/revert.js
function on(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function sn(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return on(e, t);
	let i = {
		src: o(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/image.js
function cn(e, t) {
	let n = { src: o(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function ln(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function un(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return on(e, t);
	let i = { href: o(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/link.js
function dn(e, t) {
	let n = { href: o(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function fn(e, t, n) {
	let r = e.all(t), i = n ? pn(n) : mn(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function pn(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = mn(n[r]);
	}
	return t;
}
function mn(e) {
	return e.spread ?? e.children.length > 1;
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/list.js
function hn(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function gn(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/root.js
function _n(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/strong.js
function vn(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table.js
function yn(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = re(t.children[1]), o = ne(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function bn(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function xn(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/trim-lines@3.0.1/node_modules/trim-lines/index.js
var Sn = 9, Cn = 32;
function wn(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(Tn(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(Tn(t.slice(i), i > 0, !1)), a.join("");
}
function Tn(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Sn || t === Cn;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Sn || t === Cn;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/text.js
function En(e, t) {
	let n = {
		type: "text",
		value: wn(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function Dn(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/index.js
var On = {
	blockquote: Zt,
	break: Qt,
	code: $t,
	delete: en,
	emphasis: tn,
	footnoteReference: nn,
	heading: rn,
	html: an,
	imageReference: sn,
	image: cn,
	inlineCode: ln,
	linkReference: un,
	link: dn,
	listItem: fn,
	list: hn,
	paragraph: gn,
	root: _n,
	strong: vn,
	table: yn,
	tableCell: xn,
	tableRow: bn,
	text: En,
	thematicBreak: Dn,
	toml: Z,
	yaml: Z,
	definition: Z,
	footnoteDefinition: Z
};
function Z() {}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/footer.js
function kn(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function An(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function jn(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || kn, r = e.options.footnoteBackLabel || An, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || { className: ["sr-only"] }, c = [], l = -1;
	for (; ++l < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[l]);
		if (!i) continue;
		let a = e.all(i), s = String(i.identifier).toUpperCase(), u = o(s.toLowerCase()), d = 0, f = [], p = e.footnoteCounts.get(s);
		for (; p !== void 0 && ++d <= p;) {
			f.length > 0 && f.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(l, d);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), f.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + u + (d > 1 ? "-" + d : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(l, d),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let m = a[a.length - 1];
		if (m && m.type === "element" && m.tagName === "p") {
			let e = m.children[m.children.length - 1];
			e && e.type === "text" ? e.value += " " : m.children.push({
				type: "text",
				value: " "
			}), m.children.push(...f);
		} else a.push(...f);
		let h = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + u },
			children: e.wrap(a, !0)
		};
		e.patch(i, h), c.push(h);
	}
	if (c.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...v(s),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(c, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/state.js
var Q = {}.hasOwnProperty, Mn = {};
function Nn(e, t) {
	let r = t || Mn, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = {
		all: c,
		applyData: Fn,
		definitionById: i,
		footnoteById: a,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...On,
			...r.handlers
		},
		one: s,
		options: r,
		patch: Pn,
		wrap: Ln
	};
	return n(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? i : a, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), o;
	function s(e, t) {
		let n = e.type, r = o.handlers[n];
		if (Q.call(o.handlers, n) && r) return r(o, e, t);
		if (o.options.passThrough && o.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = v(n);
				return r.children = o.all(e), r;
			}
			return v(e);
		}
		return (o.options.unknownHandler || In)(o, e, t);
	}
	function c(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = o.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = Rn(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = Rn(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function Pn(e, t) {
	e.position && (t.position = ae(e));
}
function Fn(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, v(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function In(e, t) {
	let n = t.data || {}, r = "value" in t && !(Q.call(n, "hProperties") || Q.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Ln(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function Rn(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/index.js
function zn(e, t) {
	let n = Nn(e, t), r = n.one(e, void 0), i = jn(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
// ../view/dist/notes-html-DIYxB3aO.js
function Bn(e) {
	let t = [];
	for (let n of $(e, "pre")) {
		let e = Vn(n.children.find((e) => e.type === "element"));
		e && t.push(e);
	}
	return t;
}
function Vn(e) {
	if (e?.tagName !== "code") return;
	let t = e.properties.className, n = (Array.isArray(t) ? t : []).find((e) => typeof e == "string" && e.startsWith("language-"));
	return typeof n == "string" ? n.slice(9) : void 0;
}
function* $(e, t) {
	for (let n of e.children) n.type === "element" && (n.tagName === t && (yield n), yield* $(n, t));
}
var Hn = {
	...b,
	tagNames: [...b.tagNames ?? [], "mark"],
	protocols: {
		...b.protocols,
		src: [...b.protocols?.src ?? [], "data"]
	},
	clobberPrefix: "mm-"
};
async function Un(e, t = {}) {
	let n = oe(zn({
		type: "root",
		children: e.map((e) => e.block)
	}, { handlers: { mark: (e, t) => ({
		type: "element",
		tagName: "mark",
		properties: {},
		children: e.all(t)
	}) } }), Hn);
	for (let e of $(n, "a")) e.properties.target = "_blank", e.properties.rel = ["noopener", "noreferrer"];
	if (t.highlight !== !1 && Bn(n).length) {
		let { highlightCode: e } = await import("./highlight-C7UPduaR-CP09YrCl.js");
		e(n);
	}
	for (let e of t.plugins ?? []) await e.popover?.(n);
	return Jt(n, { allowDangerousHtml: !0 });
}
export { $ as n, Un as notesToHtml, Vn as t };
