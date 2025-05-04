var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
(async () => {
  var _s2, _e, _h, _r2, _t2, _o2, _a2, _i2, _l2, _p, _c2, _n2, _d2, _f, _m, _g, _u, _v, _w, _E, _x, _C, _b, _y, _k, _T, _S, _s3, _cs_instances, e_fn, _h2, _r3, _t3, _o3, a_fn, _i3, _l3, _p2, _c3, _n3, _d3, _f2, _m2, _g2, _u2, _v2, _s4, _e2, _h3, _r4, _t4, _o4, _a3, _i4, _l4, _p3, _c4, _n4, _d4, _f3, _m3, _g3, _u3, _v3;
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
    new MutationObserver((i) => {
      for (const s of i) if (s.type === "childList") for (const r of s.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && o(r);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(i) {
      const s = {};
      return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
    }
    function o(i) {
      if (i.ep) return;
      i.ep = true;
      const s = t(i);
      fetch(i.href, s);
    }
  })();
  var Ve = {
    name: "doT",
    version: "1.1.1",
    templateSettings: {
      evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
      encode: /\{\{!([\s\S]+?)\}\}/g,
      use: /\{\{#([\s\S]+?)\}\}/g,
      useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
      define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
      defineParams: /^\s*([\w$]+):([\s\S]+)/,
      conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
      iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
      varname: "it",
      strip: true,
      append: true,
      selfcontained: false,
      doNotSkipEncoded: false
    },
    template: void 0,
    compile: void 0,
    log: true
  };
  Ve.encodeHTMLSource = function(n) {
    var e = {
      "&": "&#38;",
      "<": "&#60;",
      ">": "&#62;",
      '"': "&#34;",
      "'": "&#39;",
      "/": "&#47;"
    }, t = n ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
    return function(o) {
      return o ? o.toString().replace(t, function(i) {
        return e[i] || i;
      }) : "";
    };
  };
  var gn = {
    append: {
      start: "'+(",
      end: ")+'",
      startencode: "'+encodeHTML("
    },
    split: {
      start: "';out+=(",
      end: ");out+='",
      startencode: "';out+=encodeHTML("
    }
  }, He = /$^/;
  function jn(n, e, t) {
    return (typeof e == "string" ? e : e.toString()).replace(n.define || He, function(o, i, s, r) {
      return i.indexOf("def.") === 0 && (i = i.substring(4)), i in t || (s === ":" ? (n.defineParams && r.replace(n.defineParams, function(l, d, h) {
        t[i] = {
          arg: d,
          text: h
        };
      }), i in t || (t[i] = r)) : new Function("def", "def['" + i + "']=" + r)(t)), "";
    }).replace(n.use || He, function(o, i) {
      n.useParams && (i = i.replace(n.useParams, function(r, l, d, h) {
        if (t[d] && t[d].arg && h) {
          var g = (d + ":" + h).replace(/'|\\/g, "_");
          return t.__exp = t.__exp || {}, t.__exp[g] = t[d].text.replace(new RegExp("(^|[^\\w$])" + t[d].arg + "([^\\w$])", "g"), "$1" + h + "$2"), l + "def.__exp['" + g + "']";
        }
      }));
      var s = new Function("def", "return " + i)(t);
      return s && jn(n, s, t);
    });
  }
  function Xe(n) {
    return n.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
  }
  Ve.template = function(n, e, t) {
    e = e || Ve.templateSettings;
    var o = e.append ? gn.append : gn.split, i, s = 0, r;
    n = e.use || e.define ? jn(e, n, t || {}) : n, n = n.replace(/<([a-zA-Z0-9\-]+)([^>]*)\sdata-bind="([^"]+)"([^>]*)>/g, (d, h, g, v, b) => {
      var w = this.generateHash(), y = `<${h}${g} data-bind="${ht(v)}" data-bind-id="${w}"${b}>`;
      return y;
    });
    const l = document.createElement("div");
    this.app._originalInnerHTML.call(l, n), l.querySelectorAll("[data-bind]").forEach((d) => {
      const h = d.getAttribute("data-bind"), g = d.getAttribute("data-bind-id"), v = d.innerHTML;
      e.dataBinds.has(h) || e.dataBinds.set(h, {});
      const b = document.createElement("textarea");
      b.innerHTML = v;
      const w = e.dataBinds.get(h);
      w[g] = b.value, e.dataBinds.set(h, w);
    }), n = ("var out='" + (e.strip ? n.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : n).replace(/'|\\/g, "\\$&").replace(e.interpolate || He, function(d, h) {
      return o.start + Xe(h) + o.end;
    }).replace(e.encode || He, function(d, h) {
      return i = true, o.startencode + Xe(h) + o.end;
    }).replace(e.conditional || He, function(d, h, g) {
      return h ? g ? "';}else if(" + Xe(g) + "){out+='" : "';}else{out+='" : g ? "';if(" + Xe(g) + "){out+='" : "';}out+='";
    }).replace(e.iterate || He, function(d, h, g, v) {
      return h ? (s += 1, r = v || "i" + s, h = Xe(h), "';var arr" + s + "=" + h + ";if(arr" + s + "){var " + g + "," + r + "=-1,l" + s + "=arr" + s + ".length-1;while(" + r + "<l" + s + "){" + g + "=arr" + s + "[" + r + "+=1];out+='") : "';} } out+='";
    }).replace(e.evaluate || He, function(d, h) {
      return "';" + Xe(h) + "out+='";
    }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), i && (n = "var encodeHTML = " + Ve.encodeHTMLSource.toString() + "(" + (e.doNotSkipEncoded || "") + ");" + n);
    try {
      return new Function(e.varname, n);
    } catch (d) {
      throw typeof console < "u" && console.log("Could not create a template function: " + n), d;
    }
  };
  Ve.compile = function(n, e) {
    return Ve.template(n, null, e);
  };
  const rs = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g,
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: "it",
    strip: true,
    append: true,
    selfcontained: false,
    dataBinds: /* @__PURE__ */ new Map(),
    def: {}
  };
  function as(n = 1e4, e = 1) {
    return Math.floor(Math.random() * (n - e + 1)) + e;
  }
  function ve(n) {
    return function(t) {
      const o = window.structuredClone(n);
      return [
        void 0,
        null
      ].includes(o) || (this._values[t] = o), {
        get() {
          return this._values[t];
        },
        set(i) {
          this._values[t] = i, this._refreshBoundElements(ht(t));
        }
      };
    };
  }
  function be(n) {
    if ([
      void 0,
      null,
      ""
    ].includes(n)) throw new Error("Missing or invalid query selector for querySelector getter factory");
    return function() {
      const t = n;
      return {
        get() {
          return this.querySelector(t);
        }
      };
    };
  }
  function ls(n) {
    if ([
      void 0,
      null,
      ""
    ].includes(n)) throw new Error("Missing or invalid query selector for querySelector getter factory");
    return function() {
      const t = n;
      return {
        get() {
          return this.querySelectorAll(t);
        }
      };
    };
  }
  const ne = String.raw, Hn = String.raw;
  const _Le = class _Le extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "_startInitilization", () => {
        this.resolveInitialization = null, this.initComplete = new Promise((e) => {
          this.resolveInitialization = e;
        });
      });
      __publicField(this, "initComplete");
      __publicField(this, "_methods");
      __publicField(this, "markup");
      __publicField(this, "css");
      __privateAdd(this, _s2);
      __privateAdd(this, _e);
      __publicField(this, "_beforeInit");
      __publicField(this, "_beforeInitResolve");
      __publicField(this, "_afterInit");
      __publicField(this, "_beforeRerender");
      __publicField(this, "_afterRerender");
      __publicField(this, "_afterDisconnect");
      __publicField(this, "app");
      __publicField(this, "_parent");
      __privateAdd(this, _h, "virtual-render-div");
      __publicField(this, "_values", {});
      __privateAdd(this, _r2);
      __privateAdd(this, _t2);
      __publicField(this, "_templateFunctions", {});
      __publicField(this, "_templateVariables");
      __publicField(this, "_define");
      __publicField(this, "initElement", () => {
        __privateGet(this, _o2).call(this);
      });
      __privateAdd(this, _o2, async () => {
        var _a4;
        this._startInitilization(), this._abort = false;
        const e = (_a4 = this.closest("[app-id]")) == null ? void 0 : _a4.app;
        if (!e) throw new Error("Could not find container with application.");
        if (this.app = e, this.app.addEventListener(je.ABORTROUTETRANSITION, __privateGet(this, _a2)), this.rndId = as(), this.hashId = this.getAttribute("data-hash-id") || this.generateHash(), this.getAttribute("data-hash-id") || this.setAttribute("data-hash-id", this.hashId), !this.getAttribute("data-parent-id")) {
          let t = this.parentElement.closest("[data-hash-id]");
          t && (this.setAttribute("data-parent-id", t.getAttribute("data-hash-id")), this._parent = t);
        }
        if (this._templateVariables = {}, __privateSet(this, _t2, window.structuredClone(rs)), __privateGet(this, _i2).call(this), __privateSet(this, _r2, Object.getOwnPropertyNames(this)), __privateGet(this, _p).call(this), __privateGet(this, _l2).call(this), await __privateGet(this, _n2).call(this, this._beforeInit), this.app.addEventListener(Ne.CHANGE, this._updateBoundAppDataParts), this.app.addEventListener(Ne.QUERYCHANGE, this._updateBoundQueryDataParts), await __privateGet(this, _d2).call(this), await this.render(), this._abort) {
          this.resolveInitialization();
          return;
        }
        await __privateGet(this, _c2).call(this), await __privateGet(this, _n2).call(this, this._beforeInitResolve), this.resolveInitialization(), await __privateGet(this, _n2).call(this, this._afterInit);
      });
      __privateAdd(this, _a2, (e) => {
        this._abort = true, this.resolveInitialization();
      });
      __privateAdd(this, _i2, () => {
        for (const [e, t] of Object.entries(this._templateFunctions)) __privateGet(this, _t2).def[e] = t.bind(this);
      });
      __privateAdd(this, _l2, () => {
        for (const [e, t] of Object.entries(this._define)) {
          if (__privateGet(this, _r2).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected property name. Can't assign property with name (${e}) that is protected or if it is of illegal format (startswith: # or _) to element ${this.tagName}`);
          if (typeof t == "function") Object.defineProperty(this, e, t.bind(this)(e));
          else {
            let o = {
              get() {
                return t.get.bind(this)();
              }
            };
            t.set && (o = {
              ...o,
              set(i) {
                t.set.bind(this)(i), this._refreshBoundElements(e);
              }
            }), Object.defineProperty(this, e, o);
          }
        }
      });
      __publicField(this, "_refreshBoundElements", (e) => {
        var _a4;
        this.renderTime = Date.now(), (_a4 = this.querySelectorAll(`[data-bind="${e}"]`)) == null ? void 0 : _a4.forEach((t) => {
          const o = __privateGet(this, _t2).dataBinds.get(e);
          if (!o) return;
          const i = t.getAttribute("data-bind-id");
          if (!i) return;
          const s = o[i];
          s && (t.setAttribute("data-render-time", `${this.renderTime}`), t.innerHTML = s);
        });
      });
      __publicField(this, "_updateBoundAppDataParts", (e) => {
        this._refreshBoundElements(`app.${e.detail.field}`);
      });
      __publicField(this, "_updateBoundQueryDataParts", (e) => {
        var _a4;
        ((_a4 = e == null ? void 0 : e.detail) == null ? void 0 : _a4.key) ? this._refreshBoundElements(`query.${e.detail.key}`) : this._refreshBoundElements("query");
      });
      __privateAdd(this, _p, () => {
        for (const [e, t] of Object.entries(this._methods)) {
          if (__privateGet(this, _r2).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected method name. Can't assign method with name (${e}) 
                    that is protected or if it is of illegal format (startswith: # or _) to element ${this.tagName}`);
          try {
            this[e] = t.bind(this);
          } catch (o) {
            throw new Error(`${t} is probably not a function. Failed to bind method ${t} to element ${this.tagName}.` + o);
          }
        }
        this._methods = null;
      });
      __privateAdd(this, _c2, async () => {
        const e = [];
        return Array.from(this.querySelectorAll("*")).filter((o) => o instanceof _Le).forEach((o) => {
          e.push(o.initComplete);
        }), await Promise.all(e);
      });
      __publicField(this, "awaitElementsActivation", async () => await __privateGet(this, _c2).call(this));
      __privateAdd(this, _n2, async (e) => {
        for (const [t, o] of Object.entries(e)) await o.bind(this)();
      });
      __privateAdd(this, _d2, async () => {
        var _a4, _b2;
        Hn && (__privateSet(this, _s2, ((_a4 = this == null ? void 0 : this.css) == null ? void 0 : _a4.scoped) || false), __privateSet(this, _e, await ((_b2 = this.css) == null ? void 0 : _b2.style.bind(this)()) || null), __privateGet(this, _f).call(this));
      });
      __privateAdd(this, _f, () => {
        if (!__privateGet(this, _e)) return;
        const e = `[data-element="${this.tagName.toLowerCase()}"]`;
        if (document.head.querySelector(e)) return;
        const t = document.createElement("style");
        if (t.textContent = __privateGet(this, _e), t.setAttribute("disabled", ""), t.setAttribute("data-element", this.tagName.toLowerCase()), document.head.appendChild(t), !__privateGet(this, _s2)) {
          t.removeAttribute("disabled");
          return;
        }
        const o = t.sheet, i = (r, l) => r.split(" ").map((d) => d.replace(/([a-zA-Z0-9\.\#\-_]+)([:].*)?/, (h, g, v) => g + l + (v || ""))).join(" "), s = [];
        for (let r of o.cssRules) if (r instanceof CSSStyleRule) {
          const l = r.selectorText.split(",").map((d) => i(d.trim(), e)).join(", ");
          s.push(`${l} { ${r.style.cssText} }`);
        } else if (r instanceof CSSMediaRule) {
          const l = [];
          for (let d of r.cssRules) if (d instanceof CSSStyleRule) {
            const h = d.selectorText.split(",").map((g) => i(g.trim(), e)).join(", ");
            l.push(`${h} { ${d.style.cssText} }`);
          }
          s.push(`@media ${r.media.mediaText} { ${l.join(" ")} }`);
        }
        t.textContent = s.join(`
`), t.removeAttribute("disabled");
      });
      __privateAdd(this, _m, async () => {
        if (!this.markup) throw new Error(`Missing markup method for element ${this.tagName}`);
        try {
          return await this.markup();
        } catch (e) {
          throw new Error(`Failed to run markup method of element: ${this.tagName} - ` + e.message);
        }
      });
      __publicField(this, "render", async () => {
        let e = await __privateGet(this, _m).call(this);
        this.innerHTML = e;
      });
      __privateAdd(this, _g, (e) => {
        e = __privateGet(this, _v).call(this, e), e = __privateGet(this, _w).call(this, e), e = __privateGet(this, _E).call(this, e);
        const t = document.createElement("div");
        return t.classList.add(__privateGet(this, _h)), this.app._originalInsertAdjacentHTML.call(t, "afterbegin", e), this.lastRender = Date.now(), __privateGet(this, _x).call(this, t), __privateGet(this, _S).call(this, t);
      });
      __privateAdd(this, _u, (e) => {
        try {
          let o = Ve.template.bind(this)(e, __privateGet(this, _t2), void 0).bind(this)(this._templateVariables);
          return this._templateVariables = {}, __privateGet(this, _g).call(this, o);
        } catch {
          console.error("Failed to run #dotJSengine for element: ", this);
        }
      });
      __publicField(this, "_dotJSengine", (e) => __privateGet(this, _u).call(this, e));
      __publicField(this, "getAttrs", (e) => {
        const t = e.dataset, o = {};
        for (const [i, s] of Object.entries(t)) if (!this.app._filterAttributeNames.includes(i)) try {
          o[i] = JSON.parse(s.trim());
        } catch {
          o[i] = s;
        }
        return o;
      });
      __publicField(this, "addTemplateVariable", (e, t) => {
        this._templateVariables[e] = t;
      });
      __publicField(this, "clearTemplateVariables", () => {
        this._templateVariables = {};
      });
      __privateAdd(this, _v, (e) => e.replace(/@(\w+)=/g, "jolt-$1="));
      __privateAdd(this, _w, (e) => e.replace(/:(\w+)=/g, "data-$1="));
      __privateAdd(this, _E, (e) => e.replace(/<([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*)([^>]*)\s*(\/?)>/g, (t, o, i, s) => {
        if (this.app._elements[o]) {
          const l = this.app._elements[o].tagName;
          return s ? `<${l}${i}/>` : `<${l}${i}></${l}>`;
        }
        return t;
      }));
      __privateAdd(this, _x, (e) => {
        e.querySelectorAll("[jolt-show-if]").forEach((t) => {
          const o = t.getAttribute("jolt-show-if");
          [
            false,
            "false",
            null,
            "null",
            void 0,
            "undefined"
          ].includes(o) && t.remove();
        });
      });
      __privateAdd(this, _C, (e) => this.getAttrs(e));
      __publicField(this, "getEventTypeAndMethod", (e) => {
        if (!e.attributes) return [
          null,
          null
        ];
        for (const o of e.attributes) if (o.name.startsWith("jolt-")) {
          const i = e.getAttribute(o.name);
          return [
            o.name,
            i
          ];
        }
        return [
          null,
          null
        ];
      });
      __privateAdd(this, _b, (e) => {
        for (let t of e) {
          const o = t.element, i = t.eventName, s = t.methodName;
          if (o[`jolt-${i}:active`]) return;
          const r = this._createEventListenerMethod(o, s);
          o.addEventListener(i, r), o[`jolt-${i}:active`] = true, o[`jolt-${i}:active-method-${s}`] = r;
        }
      });
      __publicField(this, "_createEventListenerMethod", (e, t) => async (o) => {
        let i = __privateGet(this, _C).call(this, e);
        try {
          i && Object.keys(i).length != 0 ? await this[t](e, o, i) : await this[t](e, o);
        } catch (s) {
          throw console.error(s), new Error(`Could not run method ${t} on element ${this.tagName}`);
        }
      });
      __publicField(this, "createEventListenerMethod", (e, t) => this._createEventListenerMethod(e, t));
      __publicField(this, "_setEventListeners", (e) => {
        __privateGet(this, _b).call(this, e);
      });
      __privateAdd(this, _y, (e) => {
        const t = [];
        return e.forEach((o) => {
          t.push(...__privateGet(this, _k).call(this, o));
        }), t;
      });
      __privateAdd(this, _k, (e) => {
        const t = [];
        return Array.from(e.attributes).forEach((o) => {
          o.name.startsWith("jolt-") && !o.name.startsWith("jolt-show-if") && t.push({
            element: e,
            eventName: o.name.replace("jolt-", ""),
            methodName: o.value
          });
        }), t;
      });
      __publicField(this, "_elementWithEvent", (e) => __privateGet(this, _k).call(this, e));
      __publicField(this, "_allElementsWithEvents", (e) => __privateGet(this, _y).call(this, e));
      __privateAdd(this, _T, () => {
        const e = __privateGet(this, _y).call(this, this.querySelectorAll(`[data-parent-id="${this.hashId}"][data-render-time="${this.lastRender}"]`));
        __privateGet(this, _b).call(this, e);
      });
      __publicField(this, "_hydrate", () => {
        __privateGet(this, _T).call(this);
      });
      __privateAdd(this, _S, (e) => (e.querySelectorAll(":not([data-parent-id]:not(data-render-time))").forEach((t) => {
        t.setAttribute("data-parent-id", this.hashId), t.setAttribute("data-render-time", `${this.lastRender}`);
      }), e.innerHTML));
      __publicField(this, "rerender", async (e) => (__privateGet(this, _t2).dataBinds = /* @__PURE__ */ new Map(), await __privateGet(this, _n2).call(this, this._beforeRerender), await this.render(), await __privateGet(this, _c2).call(this), await __privateGet(this, _n2).call(this, this._afterRerender)));
      __publicField(this, "generateHash", (e = 16) => this.app.generateHash(e));
      __publicField(this, "getData", (e) => this.app.getData(e));
      __publicField(this, "setData", (e, t) => {
        this.app.setData(e, t);
      });
      __publicField(this, "getQueryParams", (e = false) => this.app.getQueryParams(e));
      __publicField(this, "getHTMLtemplate", async (e) => {
        var _a4, _b2;
        try {
          const t = await fetch(e, {
            redirect: "manual"
          });
          return t.status == 200 ? await t.text() : (this._abort = true, ((_a4 = this.app) == null ? void 0 : _a4.router) ? this.app.router._abortPageLoad(t.status) : console.error(`Failed to fetch html markup for ${this.tagName} with response code ${t.status}`), "");
        } catch {
          return this._abort = true, ((_b2 = this.app) == null ? void 0 : _b2.router) ? this.app.router._abortPageLoad(500) : console.error(`Failed to fetch html markup for ${this.tagName}. Server failed to respond.`), "";
        }
      });
      this.resolveInitialization = null, this.initComplete = null, this._startInitilization();
    }
    async connectedCallback() {
      if ([
        true,
        "true",
        "",
        "defer"
      ].includes(this.getAttribute("defer"))) {
        this.resolveInitialization();
        return;
      }
      try {
        await __privateGet(this, _o2).call(this);
      } catch (e) {
        this._abort = true, this.resolveInitialization(), console.log(`Failed to initilize element ${this.tagName}`), console.error(e);
      }
    }
    disconnectedCallback() {
      this.app.removeEventListener(Ne.CHANGE, this._updateBoundAppDataParts), this.app.removeEventListener(Ne.QUERYCHANGE, this._updateBoundQueryDataParts);
      const e = document.head.querySelector(`style[data-parent-id="${this.hashId}"]`);
      e && e.remove(), __privateGet(this, _n2).call(this, this._afterDisconnect);
    }
    activateElement(e) {
      typeof e == "string" && (e = this.querySelector(e));
      const t = __privateGet(this, _y).call(this, e.querySelectorAll(`[data-parent-id="${this.hashId}"][data-render-time="${this.lastRender}"]`));
      __privateGet(this, _b).call(this, t);
    }
    get attrs() {
      return this.getAttrs(this);
    }
    get variables() {
      return this._templateVariables;
    }
    get queryParams() {
      return this.app.queryParams;
    }
    set queryParams(e) {
      this.app.queryParams = e;
    }
    addQueryParams(e) {
      this.queryParams = {
        ...this.queryParams,
        ...e
      };
    }
    removeQueryParams(e) {
      this.app.removeQueryParams(e);
    }
    get parent() {
      return this._parent;
    }
    get router() {
      return this.app.router;
    }
    get hash() {
      return this.app.hash;
    }
    get port() {
      return this.app.port;
    }
    get hostname() {
      return this.app.hostname;
    }
    get host() {
      return this.app.host;
    }
    get pathname() {
      return this.app.pathname;
    }
    get origin() {
      return this.app.origin;
    }
    get routeParameters() {
      return this.app.router.routeParameters;
    }
    get data() {
      return this.app.getAllData(true);
    }
    get functions() {
      return this.app.renderFunctions;
    }
    get properties() {
      return this.app.properties;
    }
    get ext() {
      return this.app.ext;
    }
    get authenticator() {
      return this.app.authenticator;
    }
    static generate(e, t = null) {
      t || (t = {});
      let o = [];
      for (const [s, r] of Object.entries(t)) o.push(`:${s}="${r}"`);
      let i = o.length > 0 ? o.join(" ") : "";
      return e ? ne`<${this.tagName} data-hash-id="${e}" ${i}></${this.tagName}>` : ne`<${this.tagName} ${i}></${this.tagName}>`;
    }
  };
  _s2 = new WeakMap();
  _e = new WeakMap();
  _h = new WeakMap();
  _r2 = new WeakMap();
  _t2 = new WeakMap();
  _o2 = new WeakMap();
  _a2 = new WeakMap();
  _i2 = new WeakMap();
  _l2 = new WeakMap();
  _p = new WeakMap();
  _c2 = new WeakMap();
  _n2 = new WeakMap();
  _d2 = new WeakMap();
  _f = new WeakMap();
  _m = new WeakMap();
  _g = new WeakMap();
  _u = new WeakMap();
  _v = new WeakMap();
  _w = new WeakMap();
  _E = new WeakMap();
  _x = new WeakMap();
  _C = new WeakMap();
  _b = new WeakMap();
  _y = new WeakMap();
  _k = new WeakMap();
  _T = new WeakMap();
  _S = new WeakMap();
  __publicField(_Le, "tagName");
  let Le = _Le;
  function ue({ tagName: n, markup: e, css: t = null, methods: o = {}, beforeInit: i = {}, beforeInitResolve: s = {}, afterInit: r = {}, beforeRerender: l = {}, afterRerender: d = {}, afterDisconnect: h = {}, define: g = {}, templateFunctions: v = {} }) {
    var _a4;
    if (!n || !e) throw new Error("Missing tagName or markup method in ElementFactory");
    if (!((w) => /^[a-z]+(-[a-z]+)*$/.test(w))(n)) throw new Error("Element tagName must be in a valid kebab-case synatx");
    return _a4 = class extends Le {
      constructor() {
        super();
        __publicField(this, "_methods", o);
        __publicField(this, "markup", e);
        __publicField(this, "css", t);
        __publicField(this, "_beforeInit", i);
        __publicField(this, "_beforeInitResolve", s);
        __publicField(this, "_afterInit", r);
        __publicField(this, "_beforeRerender", l);
        __publicField(this, "_afterRerender", d);
        __publicField(this, "_afterDisconnect", h);
        __publicField(this, "_define", g);
        __publicField(this, "_templateFunctions", v);
      }
    }, __publicField(_a4, "tagName", n), _a4;
  }
  const je = {
    START: "route-change.start",
    FINISHED: "route-change.finished",
    LAYOUTCHANGEFINISHED: "route-change.layout-change.finished",
    ERRORPAGESTART: "route-change.error-page.start",
    ERRORPAGEFINISHED: "route-change.error-page.finished",
    ABORTROUTETRANSITION: "route-change.abort"
  };
  class cs {
    constructor({ baseUrl: e = "", routes: t, baseLayout: o, defaultTarget: i, pageNotFoundCode: s = 404, index: r = "/", app: l }) {
      __privateAdd(this, _cs_instances);
      __privateAdd(this, _s3);
      __publicField(this, "_currentRoute");
      __privateAdd(this, _h2, (e, t) => {
        const o = t[0].length - e[0].length;
        return o !== 0 ? o : e[0].includes("<str:") && t[0].includes("<int:") ? -1 : e[0].includes("<int:") && t[0].includes("<str:") ? 1 : 0;
      });
      __privateAdd(this, _r3, async (e) => {
        var _a4, _b2, _c5, _d5;
        const t = (_a4 = e == null ? void 0 : e.target) == null ? void 0 : _a4.matches("a"), o = (_b2 = e == null ? void 0 : e.target) == null ? void 0 : _b2.closest("a"), i = t ? (_c5 = e == null ? void 0 : e.target) == null ? void 0 : _c5.getAttribute("router-ignore") : o == null ? void 0 : o.getAttribute("router-ignore"), s = t ? (_d5 = e == null ? void 0 : e.target) == null ? void 0 : _d5.href : o == null ? void 0 : o.href;
        if ((t || o) && !i && s && !s.startsWith("mailto:")) {
          if (e.preventDefault(), this._inTransition && this._transitionToRoute == s) {
            e.preventDefault();
            return;
          }
          this._inTransition && __privateGet(this, _c3).call(this), this._inTransition = true;
          try {
            this._transitionToRoute = s, await __privateGet(this, _o3).call(this, s);
          } catch {
            this._abort || console.error("Routing failed for route: ", s), this._abort = false;
          }
          this._transitionToRoute = "", this._inTransition = false;
        }
      });
      __privateAdd(this, _t3, async (e) => {
        if (await this.route(), e.state && e.state.scrollPosition) {
          const { x: t, y: o } = e.state.scrollPosition;
          window.scrollTo(t, o);
        }
      });
      __privateAdd(this, _o3, async (e) => {
        const t = __privateGet(this, _u2).call(this);
        history.pushState(t, null, e), await this.route();
      });
      __publicField(this, "route", async () => {
        var _a4, _b2;
        let e = location.pathname;
        e = e.replace(this.baseUrl, ""), e === "" && (e = "/");
        const t = __privateMethod(this, _cs_instances, a_fn).call(this, e);
        if (t && !((_a4 = this.app) == null ? void 0 : _a4.authenticatorInstalled)) {
          await __privateGet(this, _i3).call(this, t);
          return;
        }
        if (t && ((_b2 = this.app) == null ? void 0 : _b2.authenticatorInstalled)) {
          if (!t.authenticationRequired) {
            await __privateGet(this, _i3).call(this, t);
            return;
          }
          if (t.authenticationRequired && this.app.authenticator.isAuthenticated && this.app.authenticator.hasRole((t == null ? void 0 : t.rolesRequired) || [])) {
            await __privateGet(this, _i3).call(this, t);
            return;
          }
          if (t.authenticationRequired && (!this.app.authenticator.isAuthenticated() || !this.app.authenticator.hasRole((t == null ? void 0 : t.rolesRequired) || []))) {
            await this.app.authenticator.unauthorizedRedirect(), this.app.authenticator.redirectCallback && await this.app.authenticator.redirectCallback();
            return;
          }
        }
        await __privateGet(this, _p2).call(this);
      });
      __publicField(this, "redirect", async (e) => {
        const t = `${this.baseUrl}${e}`, o = __privateGet(this, _u2).call(this);
        history.pushState(o, null, t), await this.route();
      });
      __publicField(this, "home", async () => {
        const e = `${this.baseUrl}${this.index}`, t = __privateGet(this, _u2).call(this);
        history.pushState(t, null, e), await this.route();
      });
      __privateAdd(this, _i3, async (e) => {
        var _a4;
        __privateGet(this, _n3).call(this);
        const t = [];
        await __privateGet(this, _l3).call(this, e.layout), await this.app.querySelector(e.layout.tagName).initComplete;
        const i = Object.entries(e.handlers);
        for (const [s, [r, l]] of i.entries()) {
          const d = this.app.querySelector(r);
          if (!d) throw new Error(`Failed to get target (${r}) container for route ${e.route} and handler (${l})`);
          if (d.querySelector(l.tagName) && i.length != 1 && s < i.length - 1) continue;
          const g = this.app.generateHash();
          this.app._originalInnerHTML.call(d, l.generate(g, (_a4 = e.attributes) == null ? void 0 : _a4[l.tagName]));
          const v = this.app.querySelector(`[data-hash-id="${g}"]`);
          v && await v.initComplete, t.push([
            r,
            g,
            l
          ]);
        }
        __privateGet(this, _v2).call(this, e.title), this._currentRoute = {
          ...e,
          renderSequence: t,
          href: window.location.href
        }, __privateGet(this, _d3).call(this);
      });
      __privateAdd(this, _l3, async (e) => {
        if (!this.app.querySelector(e.tagName)) {
          this.app.container.innerHTML = e.generate();
          const t = this.app.querySelector(e.tagName);
          await t.initComplete, __privateGet(this, _f2).call(this, t.tagName);
        }
      });
      __privateAdd(this, _p2, async () => {
        this.app.querySelector(this.baseLayout.tagName) || (this.app.container.innerHTML = this.baseLayout.generate(), await this.app.querySelector(this.baseLayout.tagName).initComplete, __privateGet(this, _f2).call(this, this.baseLayout.tagName));
        const e = this.app.querySelector(this.defaultTarget);
        if (!e) return;
        const t = this.app._errorPages[this.pageNotFoundCode].generate();
        e.innerHTML = t, __privateGet(this, _d3).call(this);
      });
      __publicField(this, "_abortPageLoad", async (e = null) => {
        __privateGet(this, _m2).call(this);
        let t = this.defaultTarget, o = this.baseLayout;
        this._currentRoute && (o = this._currentRoute.layout, t = this._currentRoute.renderSequence[0][0]), await __privateGet(this, _l3).call(this, o);
        const i = this.app.querySelector(t);
        if (!i) throw new Error(`Failed to get target (${t}) container for error page`);
        Object.keys(this.app._errorPages).includes(`${e}`) || (e = 500);
        const s = this.app._errorPages[e].generate();
        i.innerHTML = s, __privateGet(this, _g2).call(this);
      });
      __privateAdd(this, _c3, () => {
        const e = new CustomEvent(je.ABORTROUTETRANSITION, {
          bubbles: true,
          cancelable: true
        });
        this._abort = true, this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _n3, () => {
        const e = new CustomEvent(je.START, {
          bubbles: true,
          cancelable: true,
          detail: {
            ...this._currentRoute
          }
        });
        this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _d3, () => {
        const e = new CustomEvent(je.FINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            ...this._currentRoute
          }
        });
        this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _f2, (e) => {
        const t = new CustomEvent(je.LAYOUTCHANGEFINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            layout: e
          }
        });
        this.app.container.dispatchEvent(t);
      });
      __privateAdd(this, _m2, (e) => {
        const t = new CustomEvent(je.ERRORPAGESTART, {
          bubbles: true,
          cancelable: true,
          detail: {
            errorStatus: e,
            errorPage: this.app._errorPages[e]
          }
        });
        this.app.container.dispatchEvent(t);
      });
      __privateAdd(this, _g2, (e) => {
        const t = new CustomEvent(je.ERRORPAGEFINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            errorStatus: e,
            errorPage: this.app._errorPages[e]
          }
        });
        this.app.container.dispatchEvent(t);
      });
      __privateAdd(this, _u2, () => ({
        scrollPosition: {
          x: window.scrollX,
          y: window.scrollY
        }
      }));
      __privateAdd(this, _v2, (e) => {
        const t = document.querySelector("title");
        if (!t) throw new Error("Missing title tag in page header. This is considered bad practice!");
        if (!e) return;
        let o = e;
        t.innerText = o;
      });
      __publicField(this, "getQueryParams", (e = false) => this.app.getQueryParams(e));
      if (!l) throw new Error("Missing application object in router constructor");
      if (!t) throw new Error("Missing routes object for router.");
      if (!o && !(o instanceof Le)) throw new Error("Missing base layout element for the application");
      __privateSet(this, _s3, l), this.baseLayout = o, this.pageNotFoundCode = s, typeof t == "function" && (t = t.bind(this)()), this.defaultTarget = i, this._inTransition = false, this._transitionToRoute = "", this._abort = false, this._parseRoutes({
        routes: t
      }), this._baseUrl = e, this.index = r, this.app.addEventListener("click", __privateGet(this, _r3)), window.addEventListener("popstate", __privateGet(this, _t3)), this._currentRoute = null;
    }
    _parseRoutes({ routes: e, parentPath: t = "", parentHandlers: o = {}, layout: i }) {
      this.routeMap = new Map(Object.entries(__privateMethod(this, _cs_instances, e_fn).call(this, {
        routes: e,
        parentPath: t,
        parentHandlers: o,
        layout: i
      }))), this.routeMap = this.sortRouteMap();
    }
    sortRouteMap() {
      const e = Array.from(this.routeMap.entries()).sort(__privateGet(this, _h2));
      return new Map(e);
    }
    get baseUrl() {
      return this._baseUrl;
    }
    get hash() {
      return this.app.hash;
    }
    get port() {
      return this.app.port;
    }
    get hostname() {
      return this.app.hostname;
    }
    get host() {
      return location.host;
    }
    get pathname() {
      return location.pathname;
    }
    get origin() {
      return location.origin;
    }
    get app() {
      return __privateGet(this, _s3);
    }
    get currentRoute() {
      return this._currentRoute;
    }
  }
  _s3 = new WeakMap();
  _cs_instances = new WeakSet();
  e_fn = function({ routes: e, parentPath: t = "", parentHandlers: o = {}, layout: i }) {
    let s = i;
    s || (s = this.baseLayout);
    const r = {};
    return e.forEach((l) => {
      const d = t + l.path;
      if (typeof l.handler != "function") throw new Error("Route handler must be of type CustomElement from ElementFactory.");
      const h = l.handler ? {
        ...o,
        [l.target]: l.handler
      } : {
        ...o
      };
      l.handlers && Object.keys(l.handlers).forEach((v) => {
        h[v] = l.handlers[v];
      });
      const g = l.layout || s;
      r[d] = {
        handlers: {
          ...h
        },
        layout: g,
        title: l == null ? void 0 : l.title,
        roles: l.roles || null,
        details: (l == null ? void 0 : l.details) || null,
        attributes: (l == null ? void 0 : l.attributes) ? {
          [l.handler.tagName]: l.attributes
        } : null,
        authenticationRequired: [
          void 0
        ].includes(l == null ? void 0 : l.authenticationRequired) ? false : l == null ? void 0 : l.authenticationRequired,
        rolesRequired: [
          void 0
        ].includes(l == null ? void 0 : l.authenticationRequired) ? [] : l == null ? void 0 : l.rolesRequired
      }, l.children && Object.assign(r, __privateMethod(this, _cs_instances, e_fn).call(this, {
        routes: l.children,
        parentPath: d,
        parentHandlers: h,
        layout: g
      }));
    }), r;
  };
  _h2 = new WeakMap();
  _r3 = new WeakMap();
  _t3 = new WeakMap();
  _o3 = new WeakMap();
  a_fn = function(e) {
    for (const [t, o] of this.routeMap.entries()) {
      const i = [], s = [], r = t.replace(/<(\w+):(\w+)>/g, (d, h, g) => {
        if (i.push(g), s.push(h), h === "str") return "([^/]+)";
        if (h === "int") return "(\\d+)";
      }), l = e.match(new RegExp(`^${r}$`));
      if (l) {
        const d = i.reduce((h, g, v) => {
          let b = l[v + 1];
          return s[v] === "int" && (b = parseInt(b, 10)), h[g] = b, h;
        }, {});
        return this.routeParameters = d || null, {
          route: t,
          handlers: o.handlers,
          details: (o == null ? void 0 : o.details) || null,
          title: o.title,
          rolesRequired: o.rolesRequired || [],
          authenticationRequired: o.authenticationRequired || false,
          layout: o.layout,
          params: d,
          attributes: (o == null ? void 0 : o.attributes) || null
        };
      }
    }
    return null;
  };
  _i3 = new WeakMap();
  _l3 = new WeakMap();
  _p2 = new WeakMap();
  _c3 = new WeakMap();
  _n3 = new WeakMap();
  _d3 = new WeakMap();
  _f2 = new WeakMap();
  _m2 = new WeakMap();
  _g2 = new WeakMap();
  _u2 = new WeakMap();
  _v2 = new WeakMap();
  var V;
  (function(n) {
    n.Attribute = "attribute", n.Pseudo = "pseudo", n.PseudoElement = "pseudo-element", n.Tag = "tag", n.Universal = "universal", n.Adjacent = "adjacent", n.Child = "child", n.Descendant = "descendant", n.Parent = "parent", n.Sibling = "sibling", n.ColumnCombinator = "column-combinator";
  })(V || (V = {}));
  var Z;
  (function(n) {
    n.Any = "any", n.Element = "element", n.End = "end", n.Equals = "equals", n.Exists = "exists", n.Hyphen = "hyphen", n.Not = "not", n.Start = "start";
  })(Z || (Z = {}));
  const mn = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, ds = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, us = /* @__PURE__ */ new Map([
    [
      126,
      Z.Element
    ],
    [
      94,
      Z.Start
    ],
    [
      36,
      Z.End
    ],
    [
      42,
      Z.Any
    ],
    [
      33,
      Z.Not
    ],
    [
      124,
      Z.Hyphen
    ]
  ]), hs = /* @__PURE__ */ new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]);
  function ps(n) {
    switch (n.type) {
      case V.Adjacent:
      case V.Child:
      case V.Descendant:
      case V.Parent:
      case V.Sibling:
      case V.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  const fs = /* @__PURE__ */ new Set([
    "contains",
    "icontains"
  ]);
  function gs(n, e, t) {
    const o = parseInt(e, 16) - 65536;
    return o !== o || t ? e : o < 0 ? String.fromCharCode(o + 65536) : String.fromCharCode(o >> 10 | 55296, o & 1023 | 56320);
  }
  function st(n) {
    return n.replace(ds, gs);
  }
  function Gt(n) {
    return n === 39 || n === 34;
  }
  function vn(n) {
    return n === 32 || n === 9 || n === 10 || n === 12 || n === 13;
  }
  function ms(n) {
    const e = [], t = Fn(e, `${n}`, 0);
    if (t < n.length) throw new Error(`Unmatched selector: ${n.slice(t)}`);
    return e;
  }
  function Fn(n, e, t) {
    let o = [];
    function i(b) {
      const w = e.slice(t + b).match(mn);
      if (!w) throw new Error(`Expected name, found ${e.slice(t)}`);
      const [y] = w;
      return t += b + y.length, st(y);
    }
    function s(b) {
      for (t += b; t < e.length && vn(e.charCodeAt(t)); ) t++;
    }
    function r() {
      t += 1;
      const b = t;
      let w = 1;
      for (; w > 0 && t < e.length; t++) e.charCodeAt(t) === 40 && !l(t) ? w++ : e.charCodeAt(t) === 41 && !l(t) && w--;
      if (w) throw new Error("Parenthesis not matched");
      return st(e.slice(b, t - 1));
    }
    function l(b) {
      let w = 0;
      for (; e.charCodeAt(--b) === 92; ) w++;
      return (w & 1) === 1;
    }
    function d() {
      if (o.length > 0 && ps(o[o.length - 1])) throw new Error("Did not expect successive traversals.");
    }
    function h(b) {
      if (o.length > 0 && o[o.length - 1].type === V.Descendant) {
        o[o.length - 1].type = b;
        return;
      }
      d(), o.push({
        type: b
      });
    }
    function g(b, w) {
      o.push({
        type: V.Attribute,
        name: b,
        action: w,
        value: i(1),
        namespace: null,
        ignoreCase: "quirks"
      });
    }
    function v() {
      if (o.length && o[o.length - 1].type === V.Descendant && o.pop(), o.length === 0) throw new Error("Empty sub-selector");
      n.push(o);
    }
    if (s(0), e.length === t) return t;
    e: for (; t < e.length; ) {
      const b = e.charCodeAt(t);
      switch (b) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (o.length === 0 || o[0].type !== V.Descendant) && (d(), o.push({
            type: V.Descendant
          })), s(1);
          break;
        }
        case 62: {
          h(V.Child), s(1);
          break;
        }
        case 60: {
          h(V.Parent), s(1);
          break;
        }
        case 126: {
          h(V.Sibling), s(1);
          break;
        }
        case 43: {
          h(V.Adjacent), s(1);
          break;
        }
        case 46: {
          g("class", Z.Element);
          break;
        }
        case 35: {
          g("id", Z.Equals);
          break;
        }
        case 91: {
          s(1);
          let w, y = null;
          e.charCodeAt(t) === 124 ? w = i(1) : e.startsWith("*|", t) ? (y = "*", w = i(2)) : (w = i(0), e.charCodeAt(t) === 124 && e.charCodeAt(t + 1) !== 61 && (y = w, w = i(1))), s(0);
          let T = Z.Exists;
          const W = us.get(e.charCodeAt(t));
          if (W) {
            if (T = W, e.charCodeAt(t + 1) !== 61) throw new Error("Expected `=`");
            s(2);
          } else e.charCodeAt(t) === 61 && (T = Z.Equals, s(1));
          let U = "", q = null;
          if (T !== "exists") {
            if (Gt(e.charCodeAt(t))) {
              const J = e.charCodeAt(t);
              let re = t + 1;
              for (; re < e.length && (e.charCodeAt(re) !== J || l(re)); ) re += 1;
              if (e.charCodeAt(re) !== J) throw new Error("Attribute value didn't end");
              U = st(e.slice(t + 1, re)), t = re + 1;
            } else {
              const J = t;
              for (; t < e.length && (!vn(e.charCodeAt(t)) && e.charCodeAt(t) !== 93 || l(t)); ) t += 1;
              U = st(e.slice(J, t));
            }
            s(0);
            const te = e.charCodeAt(t) | 32;
            te === 115 ? (q = false, s(1)) : te === 105 && (q = true, s(1));
          }
          if (e.charCodeAt(t) !== 93) throw new Error("Attribute selector didn't terminate");
          t += 1;
          const ae = {
            type: V.Attribute,
            name: w,
            action: T,
            value: U,
            namespace: y,
            ignoreCase: q
          };
          o.push(ae);
          break;
        }
        case 58: {
          if (e.charCodeAt(t + 1) === 58) {
            o.push({
              type: V.PseudoElement,
              name: i(2).toLowerCase(),
              data: e.charCodeAt(t) === 40 ? r() : null
            });
            continue;
          }
          const w = i(1).toLowerCase();
          let y = null;
          if (e.charCodeAt(t) === 40) if (hs.has(w)) {
            if (Gt(e.charCodeAt(t + 1))) throw new Error(`Pseudo-selector ${w} cannot be quoted`);
            if (y = [], t = Fn(y, e, t + 1), e.charCodeAt(t) !== 41) throw new Error(`Missing closing parenthesis in :${w} (${e})`);
            t += 1;
          } else {
            if (y = r(), fs.has(w)) {
              const T = y.charCodeAt(0);
              T === y.charCodeAt(y.length - 1) && Gt(T) && (y = y.slice(1, -1));
            }
            y = st(y);
          }
          o.push({
            type: V.Pseudo,
            name: w,
            data: y
          });
          break;
        }
        case 44: {
          v(), o = [], s(1);
          break;
        }
        default: {
          if (e.startsWith("/*", t)) {
            const T = e.indexOf("*/", t + 2);
            if (T < 0) throw new Error("Comment was not terminated");
            t = T + 2, o.length === 0 && s(0);
            break;
          }
          let w = null, y;
          if (b === 42) t += 1, y = "*";
          else if (b === 124) {
            if (y = "", e.charCodeAt(t + 1) === 124) {
              h(V.ColumnCombinator), s(2);
              break;
            }
          } else if (mn.test(e.slice(t))) y = i(0);
          else break e;
          e.charCodeAt(t) === 124 && e.charCodeAt(t + 1) !== 124 && (w = y, e.charCodeAt(t + 1) === 42 ? (y = "*", t += 2) : y = i(1)), o.push(y === "*" ? {
            type: V.Universal,
            namespace: w
          } : {
            type: V.Tag,
            name: y,
            namespace: w
          });
        }
      }
    }
    return v(), t;
  }
  const Vn = [
    "\\",
    '"'
  ], $n = [
    ...Vn,
    "(",
    ")"
  ], vs = new Set(Vn.map((n) => n.charCodeAt(0))), bn = new Set($n.map((n) => n.charCodeAt(0))), Qe = new Set([
    ...$n,
    "~",
    "^",
    "$",
    "*",
    "+",
    "!",
    "|",
    ":",
    "[",
    "]",
    " ",
    "."
  ].map((n) => n.charCodeAt(0)));
  function Un(n) {
    return n.map((e) => e.map(bs).join("")).join(", ");
  }
  function bs(n, e, t) {
    switch (n.type) {
      case V.Child:
        return e === 0 ? "> " : " > ";
      case V.Parent:
        return e === 0 ? "< " : " < ";
      case V.Sibling:
        return e === 0 ? "~ " : " ~ ";
      case V.Adjacent:
        return e === 0 ? "+ " : " + ";
      case V.Descendant:
        return " ";
      case V.ColumnCombinator:
        return e === 0 ? "|| " : " || ";
      case V.Universal:
        return n.namespace === "*" && e + 1 < t.length && "name" in t[e + 1] ? "" : `${zn(n.namespace)}*`;
      case V.Tag:
        return yn(n);
      case V.PseudoElement:
        return `::${Me(n.name, Qe)}${n.data === null ? "" : `(${Me(n.data, bn)})`}`;
      case V.Pseudo:
        return `:${Me(n.name, Qe)}${n.data === null ? "" : `(${typeof n.data == "string" ? Me(n.data, bn) : Un(n.data)})`}`;
      case V.Attribute: {
        if (n.name === "id" && n.action === Z.Equals && n.ignoreCase === "quirks" && !n.namespace) return `#${Me(n.value, Qe)}`;
        if (n.name === "class" && n.action === Z.Element && n.ignoreCase === "quirks" && !n.namespace) return `.${Me(n.value, Qe)}`;
        const o = yn(n);
        return n.action === Z.Exists ? `[${o}]` : `[${o}${ys(n.action)}="${Me(n.value, vs)}"${n.ignoreCase === null ? "" : n.ignoreCase ? " i" : " s"}]`;
      }
    }
  }
  function ys(n) {
    switch (n) {
      case Z.Equals:
        return "";
      case Z.Element:
        return "~";
      case Z.Start:
        return "^";
      case Z.End:
        return "$";
      case Z.Any:
        return "*";
      case Z.Not:
        return "!";
      case Z.Hyphen:
        return "|";
      case Z.Exists:
        throw new Error("Shouldn't be here");
    }
  }
  function yn(n) {
    return `${zn(n.namespace)}${Me(n.name, Qe)}`;
  }
  function zn(n) {
    return n !== null ? `${n === "*" ? "*" : Me(n, Qe)}|` : "";
  }
  function Me(n, e) {
    let t = 0, o = "";
    for (let i = 0; i < n.length; i++) e.has(n.charCodeAt(i)) && (o += `${n.slice(t, i)}\\${n.charAt(i)}`, t = i + 1);
    return o.length > 0 ? o + n.slice(t) : n;
  }
  function qn(n) {
    return n.map((e) => {
      if (Array.isArray(e)) return qn(e);
      if (e.type === "attribute") {
        let t = e.name.replace(/:/g, "data-");
        return t = t.replace(/@/g, "jolt-"), {
          ...e,
          name: ht(t)
        };
      }
      return {
        ...e
      };
    });
  }
  function wt(n) {
    const e = ms(n), t = qn(e);
    return Un(t);
  }
  var Ke = {}, kn;
  function ks() {
    if (kn) return Ke;
    kn = 1;
    var n = function() {
      return n = Object.assign || function(c) {
        for (var a = arguments, f, p = 1, m = arguments.length; p < m; p++) {
          f = a[p];
          for (var x in f) Object.prototype.hasOwnProperty.call(f, x) && (c[x] = f[x]);
        }
        return c;
      }, n.apply(this, arguments);
    };
    function e(u, c, a) {
      for (var f = 0, p = c.length, m; f < p; f++) (m || !(f in c)) && (m || (m = Array.prototype.slice.call(c, 0, f)), m[f] = c[f]);
      return u.concat(m || Array.prototype.slice.call(c));
    }
    typeof SuppressedError == "function" && SuppressedError;
    var t = function() {
      function u(c) {
        c === void 0 && (c = {});
        var a = this;
        Object.entries(c).forEach(function(f) {
          var p = f[0], m = f[1];
          return a[p] = m;
        });
      }
      return u.prototype.toString = function() {
        return JSON.stringify(this);
      }, u.prototype.setValue = function(c, a) {
        return this[c] = a, this;
      }, u;
    }();
    function o(u) {
      for (var c = arguments, a = [], f = 1; f < arguments.length; f++) a[f - 1] = c[f];
      return typeof u > "u" || u === null ? false : a.some(function(p) {
        var m, x;
        return typeof ((x = (m = u == null ? void 0 : u.ownerDocument) === null || m === void 0 ? void 0 : m.defaultView) === null || x === void 0 ? void 0 : x[p]) == "function" && u instanceof u.ownerDocument.defaultView[p];
      });
    }
    function i(u, c, a) {
      var f;
      return u.nodeName === "#text" ? f = a.document.createTextNode(u.data) : u.nodeName === "#comment" ? f = a.document.createComment(u.data) : (c ? (f = a.document.createElementNS("http://www.w3.org/2000/svg", u.nodeName), u.nodeName === "foreignObject" && (c = false)) : u.nodeName.toLowerCase() === "svg" ? (f = a.document.createElementNS("http://www.w3.org/2000/svg", "svg"), c = true) : f = a.document.createElement(u.nodeName), u.attributes && Object.entries(u.attributes).forEach(function(p) {
        var m = p[0], x = p[1];
        return f.setAttribute(m, x);
      }), u.childNodes && (f = f, u.childNodes.forEach(function(p) {
        return f.appendChild(i(p, c, a));
      })), a.valueDiffing && (u.value && o(f, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement") && (f.value = u.value), u.checked && o(f, "HTMLInputElement") && (f.checked = u.checked), u.selected && o(f, "HTMLOptionElement") && (f.selected = u.selected))), f;
    }
    var s = function(u, c) {
      for (c = c.slice(); c.length > 0; ) {
        var a = c.splice(0, 1)[0];
        u = u.childNodes[a];
      }
      return u;
    };
    function r(u, c, a) {
      var f = c[a._const.action], p = c[a._const.route], m;
      [
        a._const.addElement,
        a._const.addTextElement
      ].includes(f) || (m = s(u, p));
      var x, A, C, _ = {
        diff: c,
        node: m
      };
      if (a.preDiffApply(_)) return true;
      switch (f) {
        case a._const.addAttribute:
          if (!m || !o(m, "Element")) return false;
          m.setAttribute(c[a._const.name], c[a._const.value]);
          break;
        case a._const.modifyAttribute:
          if (!m || !o(m, "Element")) return false;
          m.setAttribute(c[a._const.name], c[a._const.newValue]), o(m, "HTMLInputElement") && c[a._const.name] === "value" && (m.value = c[a._const.newValue]);
          break;
        case a._const.removeAttribute:
          if (!m || !o(m, "Element")) return false;
          m.removeAttribute(c[a._const.name]);
          break;
        case a._const.modifyTextElement:
          if (!m || !o(m, "Text")) return false;
          a.textDiff(m, m.data, c[a._const.oldValue], c[a._const.newValue]), o(m.parentNode, "HTMLTextAreaElement") && (m.parentNode.value = c[a._const.newValue]);
          break;
        case a._const.modifyValue:
          if (!m || typeof m.value > "u") return false;
          m.value = c[a._const.newValue];
          break;
        case a._const.modifyComment:
          if (!m || !o(m, "Comment")) return false;
          a.textDiff(m, m.data, c[a._const.oldValue], c[a._const.newValue]);
          break;
        case a._const.modifyChecked:
          if (!m || typeof m.checked > "u") return false;
          m.checked = c[a._const.newValue];
          break;
        case a._const.modifySelected:
          if (!m || typeof m.selected > "u") return false;
          m.selected = c[a._const.newValue];
          break;
        case a._const.replaceElement: {
          var B = c[a._const.newValue].nodeName.toLowerCase() === "svg" || m.parentNode.namespaceURI === "http://www.w3.org/2000/svg";
          m.parentNode.replaceChild(i(c[a._const.newValue], B, a), m);
          break;
        }
        case a._const.relocateGroup:
          C = e([], new Array(c[a._const.groupLength])).map(function() {
            return m.removeChild(m.childNodes[c[a._const.from]]);
          }), C.forEach(function(R, E) {
            E === 0 && (A = m.childNodes[c[a._const.to]]), m.insertBefore(R, A || null);
          });
          break;
        case a._const.removeElement:
          m.parentNode.removeChild(m);
          break;
        case a._const.addElement: {
          var L = p.slice(), F = L.splice(L.length - 1, 1)[0];
          if (m = s(u, L), !o(m, "Element")) return false;
          m.insertBefore(i(c[a._const.element], m.namespaceURI === "http://www.w3.org/2000/svg", a), m.childNodes[F] || null);
          break;
        }
        case a._const.removeTextElement: {
          if (!m || m.nodeType !== 3) return false;
          var I = m.parentNode;
          I.removeChild(m), o(I, "HTMLTextAreaElement") && (I.value = "");
          break;
        }
        case a._const.addTextElement: {
          var L = p.slice(), F = L.splice(L.length - 1, 1)[0];
          if (x = a.document.createTextNode(c[a._const.value]), m = s(u, L), !m.childNodes) return false;
          m.insertBefore(x, m.childNodes[F] || null), o(m.parentNode, "HTMLTextAreaElement") && (m.parentNode.value = c[a._const.value]);
          break;
        }
        default:
          console.log("unknown action");
      }
      return a.postDiffApply({
        diff: _.diff,
        node: _.node,
        newNode: x
      }), true;
    }
    function l(u, c, a) {
      return c.every(function(f) {
        return r(u, f, a);
      });
    }
    function d(u, c, a) {
      var f = u[c];
      u[c] = u[a], u[a] = f;
    }
    function h(u, c, a) {
      switch (c[a._const.action]) {
        case a._const.addAttribute:
          c[a._const.action] = a._const.removeAttribute, r(u, c, a);
          break;
        case a._const.modifyAttribute:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.removeAttribute:
          c[a._const.action] = a._const.addAttribute, r(u, c, a);
          break;
        case a._const.modifyTextElement:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.modifyValue:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.modifyComment:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.modifyChecked:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.modifySelected:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.replaceElement:
          d(c, a._const.oldValue, a._const.newValue), r(u, c, a);
          break;
        case a._const.relocateGroup:
          d(c, a._const.from, a._const.to), r(u, c, a);
          break;
        case a._const.removeElement:
          c[a._const.action] = a._const.addElement, r(u, c, a);
          break;
        case a._const.addElement:
          c[a._const.action] = a._const.removeElement, r(u, c, a);
          break;
        case a._const.removeTextElement:
          c[a._const.action] = a._const.addTextElement, r(u, c, a);
          break;
        case a._const.addTextElement:
          c[a._const.action] = a._const.removeTextElement, r(u, c, a);
          break;
        default:
          console.log("unknown action");
      }
    }
    function g(u, c, a) {
      c = c.slice(), c.reverse(), c.forEach(function(f) {
        h(u, f, a);
      });
    }
    var v = function(u) {
      var c = [];
      return c.push(u.nodeName), u.nodeName !== "#text" && u.nodeName !== "#comment" && (u = u, u.attributes && (u.attributes.class && c.push("".concat(u.nodeName, ".").concat(u.attributes.class.replace(/ /g, "."))), u.attributes.id && c.push("".concat(u.nodeName, "#").concat(u.attributes.id)))), c;
    }, b = function(u) {
      var c = {}, a = {};
      return u.forEach(function(f) {
        v(f).forEach(function(p) {
          var m = p in c, x = p in a;
          !m && !x ? c[p] = true : m && (delete c[p], a[p] = true);
        });
      }), c;
    }, w = function(u, c) {
      var a = b(u), f = b(c), p = {};
      return Object.keys(a).forEach(function(m) {
        f[m] && (p[m] = true);
      }), p;
    }, y = function(u) {
      return delete u.outerDone, delete u.innerDone, delete u.valueDone, u.childNodes ? u.childNodes.every(y) : true;
    }, T = function(u) {
      if (Object.prototype.hasOwnProperty.call(u, "data")) {
        var c = {
          nodeName: u.nodeName === "#text" ? "#text" : "#comment",
          data: u.data
        };
        return c;
      } else {
        var a = {
          nodeName: u.nodeName
        };
        return u = u, Object.prototype.hasOwnProperty.call(u, "attributes") && (a.attributes = n({}, u.attributes)), Object.prototype.hasOwnProperty.call(u, "checked") && (a.checked = u.checked), Object.prototype.hasOwnProperty.call(u, "value") && (a.value = u.value), Object.prototype.hasOwnProperty.call(u, "selected") && (a.selected = u.selected), Object.prototype.hasOwnProperty.call(u, "childNodes") && (a.childNodes = u.childNodes.map(function(f) {
          return T(f);
        })), a;
      }
    }, W = function(u, c) {
      if (![
        "nodeName",
        "value",
        "checked",
        "selected",
        "data"
      ].every(function(p) {
        return u[p] === c[p];
      })) return false;
      if (Object.prototype.hasOwnProperty.call(u, "data")) return true;
      if (u = u, c = c, !!u.attributes != !!c.attributes || !!u.childNodes != !!c.childNodes) return false;
      if (u.attributes) {
        var a = Object.keys(u.attributes), f = Object.keys(c.attributes);
        if (a.length !== f.length || !a.every(function(p) {
          return u.attributes[p] === c.attributes[p];
        })) return false;
      }
      return !(u.childNodes && (u.childNodes.length !== c.childNodes.length || !u.childNodes.every(function(p, m) {
        return W(p, c.childNodes[m]);
      })));
    }, U = function(u, c, a, f, p) {
      if (p === void 0 && (p = false), !u || !c || u.nodeName !== c.nodeName) return false;
      if ([
        "#text",
        "#comment"
      ].includes(u.nodeName)) return p ? true : u.data === c.data;
      if (u = u, c = c, u.nodeName in a) return true;
      if (u.attributes && c.attributes) {
        if (u.attributes.id) {
          if (u.attributes.id !== c.attributes.id) return false;
          var m = "".concat(u.nodeName, "#").concat(u.attributes.id);
          if (m in a) return true;
        }
        if (u.attributes.class && u.attributes.class === c.attributes.class) {
          var x = "".concat(u.nodeName, ".").concat(u.attributes.class.replace(/ /g, "."));
          if (x in a) return true;
        }
      }
      if (f) return true;
      var A = u.childNodes ? u.childNodes.slice().reverse() : [], C = c.childNodes ? c.childNodes.slice().reverse() : [];
      if (A.length !== C.length) return false;
      if (p) return A.every(function(B, L) {
        return B.nodeName === C[L].nodeName;
      });
      var _ = w(A, C);
      return A.every(function(B, L) {
        return U(B, C[L], _, true, true);
      });
    }, q = function(u, c, a, f) {
      var p = 0, m = [], x = u.length, A = c.length, C = e([], new Array(x + 1)).map(function() {
        return [];
      }), _ = w(u, c), B = x === A;
      B && u.some(function(E, X) {
        var le = v(E), se = v(c[X]);
        if (le.length !== se.length) return B = false, true;
        if (le.some(function(K, Ye) {
          if (K !== se[Ye]) return B = false, true;
        }), !B) return true;
      });
      for (var L = 0; L < x; L++) for (var F = u[L], I = 0; I < A; I++) {
        var R = c[I];
        !a[L] && !f[I] && U(F, R, _, B) ? (C[L + 1][I + 1] = C[L][I] ? C[L][I] + 1 : 1, C[L + 1][I + 1] >= p && (p = C[L + 1][I + 1], m = [
          L + 1,
          I + 1
        ])) : C[L + 1][I + 1] = 0;
      }
      return p === 0 ? false : {
        oldValue: m[0] - p,
        newValue: m[1] - p,
        length: p
      };
    }, ae = function(u, c) {
      return e([], new Array(u)).map(function() {
        return c;
      });
    }, te = function(u, c, a) {
      var f = u.childNodes ? ae(u.childNodes.length, true) : [], p = c.childNodes ? ae(c.childNodes.length, true) : [], m = 0;
      return a.forEach(function(x) {
        for (var A = x.oldValue + x.length, C = x.newValue + x.length, _ = x.oldValue; _ < A; _ += 1) f[_] = m;
        for (var _ = x.newValue; _ < C; _ += 1) p[_] = m;
        m += 1;
      }), {
        gaps1: f,
        gaps2: p
      };
    }, J = function(u, c, a, f) {
      u[a.oldValue + f] = true, c[a.newValue + f] = true;
    }, re = function(u, c) {
      for (var a = u.childNodes ? u.childNodes : [], f = c.childNodes ? c.childNodes : [], p = ae(a.length, false), m = ae(f.length, false), x = [], A = function() {
        return arguments[1];
      }, C = false, _ = function() {
        var B = q(a, f, p, m);
        if (B) {
          x.push(B);
          var L = e([], new Array(B.length)).map(A);
          L.forEach(function(F) {
            return J(p, m, B, F);
          });
        } else C = true;
      }; !C; ) _();
      return u.subsets = x, u.subsetsAge = 100, x;
    }, _e3 = function() {
      function u() {
        this.list = [];
      }
      return u.prototype.add = function(c) {
        var a;
        (a = this.list).push.apply(a, c);
      }, u.prototype.forEach = function(c) {
        this.list.forEach(function(a) {
          return c(a);
        });
      }, u;
    }();
    function O(u, c) {
      var a = u, f, p;
      for (c = c.slice(); c.length > 0; ) p = c.splice(0, 1)[0], f = a, a = a.childNodes ? a.childNodes[p] : void 0;
      return {
        node: a,
        parentNode: f,
        nodeIndex: p
      };
    }
    function S(u, c, a) {
      var f, p, m, x;
      if (![
        a._const.addElement,
        a._const.addTextElement
      ].includes(c[a._const.action])) {
        var A = O(u, c[a._const.route]);
        p = A.node, m = A.parentNode, x = A.nodeIndex;
      }
      var C = [], _ = {
        diff: c,
        node: p
      };
      if (a.preVirtualDiffApply(_)) return true;
      var B, L, F;
      switch (c[a._const.action]) {
        case a._const.addAttribute:
          p.attributes || (p.attributes = {}), p.attributes[c[a._const.name]] = c[a._const.value], c[a._const.name] === "checked" ? p.checked = true : c[a._const.name] === "selected" ? p.selected = true : p.nodeName === "INPUT" && c[a._const.name] === "value" && (p.value = c[a._const.value]);
          break;
        case a._const.modifyAttribute:
          p.attributes[c[a._const.name]] = c[a._const.newValue];
          break;
        case a._const.removeAttribute:
          delete p.attributes[c[a._const.name]], Object.keys(p.attributes).length === 0 && delete p.attributes, c[a._const.name] === "checked" ? p.checked = false : c[a._const.name] === "selected" ? delete p.selected : p.nodeName === "INPUT" && c[a._const.name] === "value" && delete p.value;
          break;
        case a._const.modifyTextElement:
          p.data = c[a._const.newValue], m.nodeName === "TEXTAREA" && (m.value = c[a._const.newValue]);
          break;
        case a._const.modifyValue:
          p.value = c[a._const.newValue];
          break;
        case a._const.modifyComment:
          p.data = c[a._const.newValue];
          break;
        case a._const.modifyChecked:
          p.checked = c[a._const.newValue];
          break;
        case a._const.modifySelected:
          p.selected = c[a._const.newValue];
          break;
        case a._const.replaceElement:
          B = T(c[a._const.newValue]), m.childNodes[x] = B;
          break;
        case a._const.relocateGroup:
          L = p.childNodes.splice(c[a._const.from], c[a._const.groupLength]).reverse(), L.forEach(function(E) {
            return p.childNodes.splice(c[a._const.to], 0, E);
          }), p.subsets && p.subsets.forEach(function(E) {
            if (c[a._const.from] < c[a._const.to] && E.oldValue <= c[a._const.to] && E.oldValue > c[a._const.from]) {
              E.oldValue -= c[a._const.groupLength];
              var X = E.oldValue + E.length - c[a._const.to];
              X > 0 && (C.push({
                oldValue: c[a._const.to] + c[a._const.groupLength],
                newValue: E.newValue + E.length - X,
                length: X
              }), E.length -= X);
            } else if (c[a._const.from] > c[a._const.to] && E.oldValue > c[a._const.to] && E.oldValue < c[a._const.from]) {
              E.oldValue += c[a._const.groupLength];
              var X = E.oldValue + E.length - c[a._const.to];
              X > 0 && (C.push({
                oldValue: c[a._const.to] + c[a._const.groupLength],
                newValue: E.newValue + E.length - X,
                length: X
              }), E.length -= X);
            } else E.oldValue === c[a._const.from] && (E.oldValue = c[a._const.to]);
          });
          break;
        case a._const.removeElement:
          m.childNodes.splice(x, 1), m.subsets && m.subsets.forEach(function(E) {
            E.oldValue > x ? E.oldValue -= 1 : E.oldValue === x ? E.delete = true : E.oldValue < x && E.oldValue + E.length > x && (E.oldValue + E.length - 1 === x ? E.length-- : (C.push({
              newValue: E.newValue + x - E.oldValue,
              oldValue: x,
              length: E.length - x + E.oldValue - 1
            }), E.length = x - E.oldValue));
          }), p = m;
          break;
        case a._const.addElement: {
          F = c[a._const.route].slice();
          var I = F.splice(F.length - 1, 1)[0];
          p = (f = O(u, F)) === null || f === void 0 ? void 0 : f.node, B = T(c[a._const.element]), p.childNodes || (p.childNodes = []), I >= p.childNodes.length ? p.childNodes.push(B) : p.childNodes.splice(I, 0, B), p.subsets && p.subsets.forEach(function(E) {
            if (E.oldValue >= I) E.oldValue += 1;
            else if (E.oldValue < I && E.oldValue + E.length > I) {
              var X = E.oldValue + E.length - I;
              C.push({
                newValue: E.newValue + E.length - X,
                oldValue: I + 1,
                length: X
              }), E.length -= X;
            }
          });
          break;
        }
        case a._const.removeTextElement:
          m.childNodes.splice(x, 1), m.nodeName === "TEXTAREA" && delete m.value, m.subsets && m.subsets.forEach(function(E) {
            E.oldValue > x ? E.oldValue -= 1 : E.oldValue === x ? E.delete = true : E.oldValue < x && E.oldValue + E.length > x && (E.oldValue + E.length - 1 === x ? E.length-- : (C.push({
              newValue: E.newValue + x - E.oldValue,
              oldValue: x,
              length: E.length - x + E.oldValue - 1
            }), E.length = x - E.oldValue));
          }), p = m;
          break;
        case a._const.addTextElement: {
          F = c[a._const.route].slice();
          var R = F.splice(F.length - 1, 1)[0];
          B = {
            nodeName: "#text",
            data: c[a._const.value]
          }, p = O(u, F).node, p.childNodes || (p.childNodes = []), R >= p.childNodes.length ? p.childNodes.push(B) : p.childNodes.splice(R, 0, B), p.nodeName === "TEXTAREA" && (p.value = c[a._const.newValue]), p.subsets && p.subsets.forEach(function(E) {
            if (E.oldValue >= R && (E.oldValue += 1), E.oldValue < R && E.oldValue + E.length > R) {
              var X = E.oldValue + E.length - R;
              C.push({
                newValue: E.newValue + E.length - X,
                oldValue: R + 1,
                length: X
              }), E.length -= X;
            }
          });
          break;
        }
        default:
          console.log("unknown action");
      }
      p.subsets && (p.subsets = p.subsets.filter(function(E) {
        return !E.delete && E.oldValue !== E.newValue;
      }), C.length && (p.subsets = p.subsets.concat(C))), a.postVirtualDiffApply({
        node: _.node,
        diff: _.diff,
        newNode: B
      });
    }
    function N(u, c, a) {
      return c.forEach(function(f) {
        S(u, f, a);
      }), true;
    }
    function D(u, c) {
      c === void 0 && (c = {
        valueDiffing: true
      });
      var a = {
        nodeName: u.nodeName
      };
      if (o(u, "Text", "Comment")) a.data = u.data;
      else {
        if (u.attributes && u.attributes.length > 0) {
          a.attributes = {};
          var f = Array.prototype.slice.call(u.attributes);
          f.forEach(function(p) {
            return a.attributes[p.name] = p.value;
          });
        }
        if (u.childNodes && u.childNodes.length > 0) {
          a.childNodes = [];
          var f = Array.prototype.slice.call(u.childNodes);
          f.forEach(function(m) {
            return a.childNodes.push(D(m, c));
          });
        }
        c.valueDiffing && (o(u, "HTMLTextAreaElement") && (a.value = u.value), o(u, "HTMLInputElement") && [
          "radio",
          "checkbox"
        ].includes(u.type.toLowerCase()) && u.checked !== void 0 ? a.checked = u.checked : o(u, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement") && (a.value = u.value), o(u, "HTMLOptionElement") && (a.selected = u.selected));
      }
      return a;
    }
    var Y = /<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g, $ = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
    function ie(u) {
      return u.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    }
    var H = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      menuItem: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    }, he = function(u, c) {
      var a = {
        nodeName: "",
        attributes: {}
      }, f = false, p = "tag", m = u.match(/<\/?([^\s]+?)[/\s>]/);
      if (m && (a.nodeName = c || m[1] === "svg" ? m[1] : m[1].toUpperCase(), (H[m[1]] || u.charAt(u.length - 2) === "/") && (f = true), a.nodeName.startsWith("!--"))) {
        var x = u.indexOf("-->");
        return {
          type: "comment",
          node: {
            nodeName: "#comment",
            data: x !== -1 ? u.slice(4, x) : ""
          },
          voidElement: f
        };
      }
      for (var A = new RegExp($), C = null, _ = false; !_; ) if (C = A.exec(u), C === null) _ = true;
      else if (C[0].trim()) if (C[1]) {
        var B = C[1].trim(), L = [
          B,
          ""
        ];
        B.indexOf("=") > -1 && (L = B.split("=")), a.attributes[L[0]] = L[1], A.lastIndex--;
      } else C[2] && (a.attributes[C[2]] = C[3].trim().substring(1, C[3].length - 1));
      return {
        type: p,
        node: a,
        voidElement: f
      };
    }, xe = function(u, c) {
      c === void 0 && (c = {
        valueDiffing: true,
        caseSensitive: false
      });
      var a = [], f, p = -1, m = [], x = false;
      if (u.indexOf("<") !== 0) {
        var A = u.indexOf("<");
        a.push({
          nodeName: "#text",
          data: A === -1 ? u : u.substring(0, A)
        });
      }
      return u.replace(Y, function(C, _) {
        var B = C.charAt(1) !== "/", L = C.startsWith("<!--"), F = _ + C.length, I = u.charAt(F);
        if (L) {
          var R = he(C, c.caseSensitive).node;
          if (p < 0) return a.push(R), "";
          var E = m[p];
          return E && R.nodeName && (E.node.childNodes || (E.node.childNodes = []), E.node.childNodes.push(R)), "";
        }
        if (B) {
          if (f = he(C, c.caseSensitive || x), f.node.nodeName === "svg" && (x = true), p++, !f.voidElement && I && I !== "<") {
            f.node.childNodes || (f.node.childNodes = []);
            var X = ie(u.slice(F, u.indexOf("<", F)));
            f.node.childNodes.push({
              nodeName: "#text",
              data: X
            }), c.valueDiffing && f.node.nodeName === "TEXTAREA" && (f.node.value = X);
          }
          p === 0 && f.node.nodeName && a.push(f.node);
          var le = m[p - 1];
          le && f.node.nodeName && (le.node.childNodes || (le.node.childNodes = []), le.node.childNodes.push(f.node)), m[p] = f;
        }
        if ((!B || f.voidElement) && (p > -1 && (f.voidElement || c.caseSensitive && f.node.nodeName === C.slice(2, -1) || !c.caseSensitive && f.node.nodeName.toUpperCase() === C.slice(2, -1).toUpperCase()) && (p--, p > -1 && (f.node.nodeName === "svg" && (x = false), f = m[p])), I !== "<" && I)) {
          var se = p === -1 ? a : m[p].node.childNodes || [], K = u.indexOf("<", F), X = ie(u.slice(F, K === -1 ? void 0 : K));
          se.push({
            nodeName: "#text",
            data: X
          });
        }
        return "";
      }), a[0];
    }, Be = function() {
      function u(c, a, f) {
        this.options = f, this.t1 = typeof Element < "u" && o(c, "Element") ? D(c, this.options) : typeof c == "string" ? xe(c, this.options) : JSON.parse(JSON.stringify(c)), this.t2 = typeof Element < "u" && o(a, "Element") ? D(a, this.options) : typeof a == "string" ? xe(a, this.options) : JSON.parse(JSON.stringify(a)), this.diffcount = 0, this.foundAll = false, this.debug && (this.t1Orig = typeof Element < "u" && o(c, "Element") ? D(c, this.options) : typeof c == "string" ? xe(c, this.options) : JSON.parse(JSON.stringify(c)), this.t2Orig = typeof Element < "u" && o(a, "Element") ? D(a, this.options) : typeof a == "string" ? xe(a, this.options) : JSON.parse(JSON.stringify(a))), this.tracker = new _e3();
      }
      return u.prototype.init = function() {
        return this.findDiffs(this.t1, this.t2);
      }, u.prototype.findDiffs = function(c, a) {
        var f;
        do {
          if (this.options.debug && (this.diffcount += 1, this.diffcount > this.options.diffcap)) throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig), " -> ").concat(JSON.stringify(this.t2Orig)));
          f = this.findNextDiff(c, a, []), f.length === 0 && (W(c, a) || (this.foundAll ? console.error("Could not find remaining diffs!") : (this.foundAll = true, y(c), f = this.findNextDiff(c, a, [])))), f.length > 0 && (this.foundAll = false, this.tracker.add(f), N(c, f, this.options));
        } while (f.length > 0);
        return this.tracker.list;
      }, u.prototype.findNextDiff = function(c, a, f) {
        var p, m;
        if (this.options.maxDepth && f.length > this.options.maxDepth) return [];
        if (!c.outerDone) {
          if (p = this.findOuterDiff(c, a, f), this.options.filterOuterDiff && (m = this.options.filterOuterDiff(c, a, p), m && (p = m)), p.length > 0) return c.outerDone = true, p;
          c.outerDone = true;
        }
        if (Object.prototype.hasOwnProperty.call(c, "data")) return [];
        if (c = c, a = a, !c.innerDone) {
          if (p = this.findInnerDiff(c, a, f), p.length > 0) return p;
          c.innerDone = true;
        }
        if (this.options.valueDiffing && !c.valueDone) {
          if (p = this.findValueDiff(c, a, f), p.length > 0) return c.valueDone = true, p;
          c.valueDone = true;
        }
        return [];
      }, u.prototype.findOuterDiff = function(c, a, f) {
        var p = [], m, x, A, C, _, B;
        if (c.nodeName !== a.nodeName) {
          if (!f.length) throw new Error("Top level nodes have to be of the same kind.");
          return [
            new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(c)).setValue(this.options._const.newValue, T(a)).setValue(this.options._const.route, f)
          ];
        }
        if (f.length && this.options.diffcap < Math.abs((c.childNodes || []).length - (a.childNodes || []).length)) return [
          new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(c)).setValue(this.options._const.newValue, T(a)).setValue(this.options._const.route, f)
        ];
        if (Object.prototype.hasOwnProperty.call(c, "data") && c.data !== a.data) return c.nodeName === "#text" ? [
          new t().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, f).setValue(this.options._const.oldValue, c.data).setValue(this.options._const.newValue, a.data)
        ] : [
          new t().setValue(this.options._const.action, this.options._const.modifyComment).setValue(this.options._const.route, f).setValue(this.options._const.oldValue, c.data).setValue(this.options._const.newValue, a.data)
        ];
        for (c = c, a = a, x = c.attributes ? Object.keys(c.attributes).sort() : [], A = a.attributes ? Object.keys(a.attributes).sort() : [], C = x.length, B = 0; B < C; B++) m = x[B], _ = A.indexOf(m), _ === -1 ? p.push(new t().setValue(this.options._const.action, this.options._const.removeAttribute).setValue(this.options._const.route, f).setValue(this.options._const.name, m).setValue(this.options._const.value, c.attributes[m])) : (A.splice(_, 1), c.attributes[m] !== a.attributes[m] && p.push(new t().setValue(this.options._const.action, this.options._const.modifyAttribute).setValue(this.options._const.route, f).setValue(this.options._const.name, m).setValue(this.options._const.oldValue, c.attributes[m]).setValue(this.options._const.newValue, a.attributes[m])));
        for (C = A.length, B = 0; B < C; B++) m = A[B], p.push(new t().setValue(this.options._const.action, this.options._const.addAttribute).setValue(this.options._const.route, f).setValue(this.options._const.name, m).setValue(this.options._const.value, a.attributes[m]));
        return p;
      }, u.prototype.findInnerDiff = function(c, a, f) {
        var p = c.childNodes ? c.childNodes.slice() : [], m = a.childNodes ? a.childNodes.slice() : [], x = Math.max(p.length, m.length), A = Math.abs(p.length - m.length), C = [], _ = 0;
        if (!this.options.maxChildCount || x < this.options.maxChildCount) {
          var B = !!(c.subsets && c.subsetsAge--), L = B ? c.subsets : c.childNodes && a.childNodes ? re(c, a) : [];
          if (L.length > 0 && (C = this.attemptGroupRelocation(c, a, L, f, B), C.length > 0)) return C;
        }
        for (var F = 0; F < x; F += 1) {
          var I = p[F], R = m[F];
          A && (I && !R ? I.nodeName === "#text" ? (C.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, f.concat(_)).setValue(this.options._const.value, I.data)), _ -= 1) : (C.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, f.concat(_)).setValue(this.options._const.element, T(I))), _ -= 1) : R && !I && (R.nodeName === "#text" ? C.push(new t().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, f.concat(_)).setValue(this.options._const.value, R.data)) : C.push(new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, f.concat(_)).setValue(this.options._const.element, T(R))))), I && R && (!this.options.maxChildCount || x < this.options.maxChildCount ? C = C.concat(this.findNextDiff(I, R, f.concat(_))) : W(I, R) || (p.length > m.length ? (I.nodeName === "#text" ? C.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, f.concat(_)).setValue(this.options._const.value, I.data)) : C.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.element, T(I)).setValue(this.options._const.route, f.concat(_))), p.splice(F, 1), F -= 1, _ -= 1, A -= 1) : p.length < m.length ? (C = C.concat([
            new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.element, T(R)).setValue(this.options._const.route, f.concat(_))
          ]), p.splice(F, 0, T(R)), A -= 1) : C = C.concat([
            new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(I)).setValue(this.options._const.newValue, T(R)).setValue(this.options._const.route, f.concat(_))
          ]))), _ += 1;
        }
        return c.innerDone = true, C;
      }, u.prototype.attemptGroupRelocation = function(c, a, f, p, m) {
        for (var x = te(c, a, f), A = x.gaps1, C = x.gaps2, _ = c.childNodes.slice(), B = a.childNodes.slice(), L = Math.min(A.length, C.length), F, I, R, E, X, le = [], se = 0, K = 0; se < L; K += 1, se += 1) if (!(m && (A[se] === true || C[se] === true))) {
          if (A[K] === true) if (E = _[K], E.nodeName === "#text") if (B[se].nodeName === "#text") {
            if (E.data !== B[se].data) {
              for (var Ye = K; _.length > Ye + 1 && _[Ye + 1].nodeName === "#text"; ) if (Ye += 1, B[se].data === _[Ye].data) {
                X = true;
                break;
              }
              X || le.push(new t().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, p.concat(K)).setValue(this.options._const.oldValue, E.data).setValue(this.options._const.newValue, B[se].data));
            }
          } else le.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, p.concat(K)).setValue(this.options._const.value, E.data)), A.splice(K, 1), _.splice(K, 1), L = Math.min(A.length, C.length), K -= 1, se -= 1;
          else C[se] === true ? le.push(new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(E)).setValue(this.options._const.newValue, T(B[se])).setValue(this.options._const.route, p.concat(K))) : (le.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, p.concat(K)).setValue(this.options._const.element, T(E))), A.splice(K, 1), _.splice(K, 1), L = Math.min(A.length, C.length), K -= 1, se -= 1);
          else if (C[se] === true) E = B[se], E.nodeName === "#text" ? (le.push(new t().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, p.concat(K)).setValue(this.options._const.value, E.data)), A.splice(K, 0, true), _.splice(K, 0, {
            nodeName: "#text",
            data: E.data
          }), L = Math.min(A.length, C.length)) : (le.push(new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, p.concat(K)).setValue(this.options._const.element, T(E))), A.splice(K, 0, true), _.splice(K, 0, T(E)), L = Math.min(A.length, C.length));
          else if (A[K] !== C[se]) {
            if (le.length > 0) return le;
            if (R = f[A[K]], I = Math.min(R.newValue, _.length - R.length), I !== R.oldValue && I > -1) {
              F = false;
              for (var kt = 0; kt < R.length; kt += 1) U(_[I + kt], _[R.oldValue + kt], {}, false, true) || (F = true);
              if (F) return [
                new t().setValue(this.options._const.action, this.options._const.relocateGroup).setValue(this.options._const.groupLength, R.length).setValue(this.options._const.from, R.oldValue).setValue(this.options._const.to, I).setValue(this.options._const.route, p)
              ];
            }
          }
        }
        return le;
      }, u.prototype.findValueDiff = function(c, a, f) {
        var p = [];
        return c.selected !== a.selected && p.push(new t().setValue(this.options._const.action, this.options._const.modifySelected).setValue(this.options._const.oldValue, c.selected).setValue(this.options._const.newValue, a.selected).setValue(this.options._const.route, f)), (c.value || a.value) && c.value !== a.value && c.nodeName !== "OPTION" && p.push(new t().setValue(this.options._const.action, this.options._const.modifyValue).setValue(this.options._const.oldValue, c.value || "").setValue(this.options._const.newValue, a.value || "").setValue(this.options._const.route, f)), c.checked !== a.checked && p.push(new t().setValue(this.options._const.action, this.options._const.modifyChecked).setValue(this.options._const.oldValue, c.checked).setValue(this.options._const.newValue, a.checked).setValue(this.options._const.route, f)), p;
      }, u;
    }(), it = {
      debug: false,
      diffcap: 10,
      maxDepth: false,
      maxChildCount: 50,
      valueDiffing: true,
      textDiff: function(u, c, a, f) {
        u.data = f;
      },
      preVirtualDiffApply: function() {
      },
      postVirtualDiffApply: function() {
      },
      preDiffApply: function() {
      },
      postDiffApply: function() {
      },
      filterOuterDiff: null,
      compress: false,
      _const: false,
      document: typeof window < "u" && window.document ? window.document : false,
      components: []
    }, Xt = function() {
      function u(c) {
        if (c === void 0 && (c = {}), Object.entries(it).forEach(function(p) {
          var m = p[0], x = p[1];
          Object.prototype.hasOwnProperty.call(c, m) || (c[m] = x);
        }), !c._const) {
          var a = [
            "addAttribute",
            "modifyAttribute",
            "removeAttribute",
            "modifyTextElement",
            "relocateGroup",
            "removeElement",
            "addElement",
            "removeTextElement",
            "addTextElement",
            "replaceElement",
            "modifyValue",
            "modifyChecked",
            "modifySelected",
            "modifyComment",
            "action",
            "route",
            "oldValue",
            "newValue",
            "element",
            "group",
            "groupLength",
            "from",
            "to",
            "name",
            "value",
            "data",
            "attributes",
            "nodeName",
            "childNodes",
            "checked",
            "selected"
          ], f = {};
          c.compress ? a.forEach(function(p, m) {
            return f[p] = m;
          }) : a.forEach(function(p) {
            return f[p] = p;
          }), c._const = f;
        }
        this.options = c;
      }
      return u.prototype.apply = function(c, a) {
        return l(c, a, this.options);
      }, u.prototype.undo = function(c, a) {
        return g(c, a, this.options);
      }, u.prototype.diff = function(c, a) {
        var f = new Be(c, a, this.options);
        return f.init();
      }, u;
    }(), Kt = function() {
      function u(c) {
        c === void 0 && (c = {});
        var a = this;
        this.pad = "\u2502   ", this.padding = "", this.tick = 1, this.messages = [];
        var f = function(m, x) {
          var A = m[x];
          m[x] = function() {
            for (var C = arguments, _ = [], B = 0; B < arguments.length; B++) _[B] = C[B];
            a.fin(x, Array.prototype.slice.call(_));
            var L = A.apply(m, _);
            return a.fout(x, L), L;
          };
        };
        for (var p in c) typeof c[p] == "function" && f(c, p);
        this.log("\u250C TRACELOG START");
      }
      return u.prototype.fin = function(c, a) {
        this.padding += this.pad, this.log("\u251C\u2500> entering ".concat(c), a);
      }, u.prototype.fout = function(c, a) {
        this.log("\u2502<\u2500\u2500\u2518 generated return value", a), this.padding = this.padding.substring(0, this.padding.length - this.pad.length);
      }, u.prototype.format = function(c, a) {
        var f = function(p) {
          for (var m = "".concat(p); m.length < 4; ) m = "0".concat(p);
          return m;
        };
        return "".concat(f(a), "> ").concat(this.padding).concat(c);
      }, u.prototype.log = function() {
        for (var c = arguments, a = [], f = 0; f < arguments.length; f++) a[f] = c[f];
        var p = function(x) {
          return x ? typeof x == "string" ? x : o(x, "HTMLElement") ? x.outerHTML || "<empty>" : x instanceof Array ? "[".concat(x.map(p).join(","), "]") : x.toString() || x.valueOf() || "<unknown>" : "<falsey>";
        }, m = a.map(p).join(", ");
        this.messages.push(this.format(m, this.tick++));
      }, u.prototype.toString = function() {
        for (var c = "\xD7   ", a = "\u2514\u2500\u2500\u2500"; a.length <= this.padding.length + this.pad.length; ) a += c;
        var f = this.padding;
        return this.padding = "", a = this.format(a, this.tick), this.padding = f, "".concat(this.messages.join(`
`), `
`).concat(a);
      }, u;
    }();
    return Ke.DiffDOM = Xt, Ke.TraceLogger = Kt, Ke.nodeToObj = D, Ke.stringToObj = xe, Ke;
  }
  var ws = ks();
  class Es {
    constructor({ targetElement: e, newMarkup: t, customElement: o }) {
      __publicField(this, "performDiff", () => {
        const e = this.diffDom.diff(this.target, this.clone);
        this.diff = this.filterDiff(e);
      });
      __publicField(this, "filterDiff", (e) => {
        const t = [];
        for (const o of e) if (!(o.action == "removeAttribute" && [
          "data-hash-id",
          "data-render-time"
        ].includes(o.name)) && !(o.action == "modifyAttribute" && [
          "data-hash-id",
          "data-render-time"
        ].includes(o.name))) {
          if (o.action == "removeElement" && o.element.nodeName == "#comment") {
            t.push(o);
            continue;
          }
          o.action == "removeElement" && o.element.attributes["data-parent-id"] != this.customElement.hashId || t.push(o);
        }
        return t;
      });
      __publicField(this, "apply", () => {
        if (!this.diff) throw new Error("Perform the diffing operation first by calling Diff.diff method");
        this.diffDom.apply(this.target, this.diff);
      });
      __publicField(this, "undo", () => {
        if (!this.diff) throw new Error("Perform the diffing operation first by calling Diff.diff method");
        this.diffDom.undo(this.target, this.diff);
      });
      __publicField(this, "setInnerHTML", () => {
        this.performDiff(), this.apply();
      });
      this.diffDom = new ws.DiffDOM(), this.target = e, this.customElement = o;
      const i = e.cloneNode(true), s = o._dotJSengine(t);
      o.app._originalInnerHTML.call(i, s), this.clone = i, this.diff = null;
    }
    get options() {
      return this.diffDom.options;
    }
    set options(e) {
      this.diffDom.options = e;
    }
  }
  const Ne = {
    CHANGE: "app-data-change",
    QUERYCHANGE: "query-data-change"
  };
  function ht(n) {
    return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const xs = /* @__PURE__ */ new Set([
    "viewBox",
    "preserveAspectRatio",
    "patternTransform",
    "clipPathUnits"
  ]);
  class Cs {
    constructor() {
      __publicField(this, "container");
      __publicField(this, "querySelector", (e) => this.container.querySelector(e));
      __publicField(this, "querySelectorAll", (e) => this.container.querySelectorAll(e));
      __publicField(this, "getElementById", (e) => this.container.querySelector(`#${e}`));
      __publicField(this, "getElementsByClassName", (e) => this.container.getElementsByClassName(e));
      __publicField(this, "getElementsByTagName", (e) => this.container.getElementsByTagName(e));
      __publicField(this, "matches", (e) => this.container.matches(e));
      __publicField(this, "addEventListener", (e, t) => {
        this.container.addEventListener(e, t);
      });
      __publicField(this, "removeEventListener", (e, t) => {
        this.container.removeEventListener(e, t);
      });
      __publicField(this, "insertAdjacentHTML", (e, t) => {
        this.container.insertAdjacentHTML(e, t);
      });
    }
    get children() {
      return this.container.children;
    }
    get childNodes() {
      return this.container.childNodes;
    }
  }
  class Ts extends Cs {
    constructor({ appName: e, dataStructure: t = {}, elements: o = {}, renderFunctions: i = {}, router: s = null, authenticator: r = null, extensions: l = {}, properties: d = {}, methods: h = {}, beforeInit: g = {}, afterInit: v = {}, errorPages: b = null }) {
      super();
      __publicField(this, "identifier", "app");
      __privateAdd(this, _s4);
      __privateAdd(this, _e2, /* @__PURE__ */ new Map());
      __privateAdd(this, _h3);
      __privateAdd(this, _r4);
      __privateAdd(this, _t4);
      __publicField(this, "_router");
      __privateAdd(this, _o4);
      __publicField(this, "_authenticator");
      __privateAdd(this, _a3);
      __publicField(this, "_extensions");
      __privateAdd(this, _i4);
      __privateAdd(this, _l4);
      __publicField(this, "_renderFunctions");
      __privateAdd(this, _p3);
      __publicField(this, "_filterAttributeNames", [
        "hashId",
        "data-hash-id",
        "hash-id",
        "parentId",
        "data-parent-id",
        "parent-id",
        "renderTime",
        "data-render-time",
        "render-time",
        "bind",
        "data-bind",
        "bindId",
        "data-bind-id",
        "bind-id"
      ]);
      __publicField(this, "init", async (e) => {
        const t = document.querySelector(e);
        if (!t) throw new Error("Could not find application container with selector: " + e);
        this.containerId = e, this.container = t, this.container.setAttribute("app-id", this.generateHash()), this.container.app = this, this.registerCustomElements(__privateGet(this, _l4)), this.registerCustomElements(this._errorPages), this._modifyPrototypeMethods(), this._authenticator && __privateSet(this, _a3, this._authenticator(this)), __privateGet(this, _c4).call(this), await __privateGet(this, _d4).call(this, __privateGet(this, _h3)), this._router && __privateSet(this, _o4, this._router(this)), await __privateGet(this, _n4).call(this), __privateGet(this, _o4) && await __privateGet(this, _o4).route(), await __privateGet(this, _m3).call(this), await __privateGet(this, _d4).call(this, __privateGet(this, _r4));
      });
      __privateAdd(this, _c4, () => {
        for (const [e, t] of Object.entries(this._methods)) {
          if (__privateGet(this, _p3).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected method name. Can't assign method with name (${e})
                    that is protected or if it is of illegal format (startswith: # or _) to application`);
          try {
            this[e] = t.bind(this);
          } catch (o) {
            throw new Error(`${t} is probably not a function. Failed to bind method ${t} to application.` + o);
          }
        }
        this._methods = null;
      });
      __publicField(this, "_modifyPrototypeMethods", () => {
        this._originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, this._originalOuterHTML = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML").set, this._originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML, this._originalAppendChild = Element.prototype.appendChild, this._originalSetAttribute = Element.prototype.setAttribute, this._originalRemoveAttribute = Element.prototype.removeAttribute;
        const e = this;
        Element.prototype.insertAdjacentHTML = function(t, o) {
          const i = this.closest("[data-hash-id]");
          if (!i) return e._originalInsertAdjacentHTML.call(this, t, o);
          const s = i._dotJSengine(o);
          e._originalInsertAdjacentHTML.call(this, t, s), i._hydrate(), i.clearTemplateVariables();
        }, Object.defineProperty(Element.prototype, "innerHTML", {
          set: function(t) {
            const o = this.closest("[data-hash-id]");
            if (!o) {
              e._originalInnerHTML.call(this, t);
              return;
            }
            new Es({
              targetElement: this,
              newMarkup: t,
              customElement: o
            }).setInnerHTML(), o._hydrate(), o.clearTemplateVariables();
          }
        }), Object.defineProperty(Element.prototype, "outerHTML", {
          set: function(t) {
            var _a4;
            const o = (_a4 = this.parent) == null ? void 0 : _a4.closest("[data-hash-id]");
            if (o) {
              const i = o._dotJSengine(t);
              e._originalOuterHTML.call(this, i), o._hydrate();
              return;
            }
            e._originalOuterHTML.call(this, t);
          }
        }), Element.prototype.setAttribute = function(t, o) {
          let i = t.startsWith(":") ? `data-${t.substring(1)}` : t;
          this instanceof SVGElement && xs.has(i) || (i = ht(i)), e._originalSetAttribute.call(this, i, o), this instanceof Le && this._refreshBoundElements(`attrs.${i.replace("data-", "")}`);
        }, Element.prototype.setAttributes = function(t) {
          for (const [o, i] of Object.entries(t)) this.setAttribute(o, i);
        }, Element.prototype.removeAttribute = function(t, o) {
          const i = t.startsWith(":") ? `data-${t.substring(1)}` : t;
          e._originalRemoveAttribute.call(this, i, o), this instanceof Le && this._refreshBoundElements(`attrs.${i.replace("data-", "")}`);
        }, this._originalDocQS = Document.prototype.querySelector, this._originalDocQSA = Document.prototype.querySelectorAll, this._originalElQS = Element.prototype.querySelector, this._originalElQSA = Element.prototype.querySelectorAll, Document.prototype.querySelector = function(t) {
          const o = wt(t);
          return e._originalDocQS.call(this, o);
        }, Document.prototype.querySelectorAll = function(t) {
          const o = wt(t);
          return e._originalDocQSA.call(this, o);
        }, Element.prototype.querySelector = function(t) {
          const o = wt(t);
          return e._originalElQS.call(this, o);
        }, Element.prototype.querySelectorAll = function(t) {
          const o = wt(t);
          return e._originalElQSA.call(this, o);
        };
      });
      __privateAdd(this, _n4, async () => {
        if (this._extensions) {
          __privateSet(this, _i4, {});
          for (const [e, t] of Object.entries(this._extensions)) __privateGet(this, _i4)[e] = await t(this);
        }
      });
      __privateAdd(this, _d4, async (e) => {
        for (const [t, o] of Object.entries(e)) await o.bind(this)();
      });
      __privateAdd(this, _f3, (e) => {
        for (const [t, o] of Object.entries(e)) __privateGet(this, _e2).set(t, o);
      });
      __privateAdd(this, _m3, async () => {
        const e = [];
        return Array.from(this.querySelectorAll("*")).filter((o) => o instanceof Le).forEach((o) => {
          e.push(o.initComplete);
        }), await Promise.all(e);
      });
      __publicField(this, "setData", (e, t) => {
        if (!__privateGet(this, _e2).has(e)) throw new Error(`Failed to set data. Missing data field ${e} in app data structure`);
        __privateGet(this, _e2).set(e, t), __privateGet(this, _g3).call(this, e);
      });
      __publicField(this, "removeData", (e) => {
        if (!__privateGet(this, _e2).has(e)) throw new Error(`Failed to set data. Missing data field ${e} in app data structure`);
        __privateGet(this, _e2).set(e, null), __privateGet(this, _g3).call(this, e);
      });
      __publicField(this, "getData", (e) => {
        if (!__privateGet(this, _e2).has(e)) throw new Error(`Failed to fetch data for field ${e}. Data field does not exist`);
        return __privateGet(this, _e2).get(e);
      });
      __publicField(this, "getAllData", (e = false) => e ? Object.fromEntries(__privateGet(this, _e2)) : __privateGet(this, _e2));
      __privateAdd(this, _g3, (e) => {
        const t = new CustomEvent(Ne.CHANGE, {
          detail: {
            field: ht(e)
          }
        });
        this.container.dispatchEvent(t);
      });
      __privateAdd(this, _u3, (e, t) => {
        const o = new CustomEvent(Ne.QUERYCHANGE, {
          detail: {
            key: e,
            value: t
          }
        });
        this.container.dispatchEvent(o);
      });
      __privateAdd(this, _v3, () => {
        const e = new CustomEvent(Ne.QUERYCHANGE, {
          detail: {
            query: this.queryParams
          }
        });
        this.container.dispatchEvent(e);
      });
      __publicField(this, "redirect", (e) => {
        if (!this.router) throw new Error("Redirect is only available with Router");
        this.router.redirect(e);
      });
      __publicField(this, "registerCustomElements", (e) => {
        if (e) for (const t of Object.values(e)) customElements.get(t.tagName) || customElements.define(t.tagName, t);
      });
      __publicField(this, "queryParamsToObject", (e) => {
        const t = new URLSearchParams(e), o = {};
        for (const [i, s] of t.entries()) o[i] = s;
        return o;
      });
      __publicField(this, "getQueryParams", (e = false) => e ? this.queryParamsToObject(location.search) : location.search);
      __publicField(this, "generateHash", (e = 16) => {
        const t = new Uint8Array(e);
        return window.crypto.getRandomValues(t), Array.from(t, (o) => o.toString(16).padStart(2, "0")).join("");
      });
      if (!e) throw new Error("Missing appName parameter");
      __privateSet(this, _s4, e), __privateGet(this, _f3).call(this, t), __privateSet(this, _l4, o), this._router = s, this._authenticator = r, this._extensions = l, this._renderFunctions = i, this._errorPages = b, __privateSet(this, _t4, d), __privateSet(this, _h3, g), __privateSet(this, _r4, v), this._methods = h, __privateSet(this, _p3, Object.getOwnPropertyNames(this));
    }
    isCustomElement(e) {
      return e instanceof Le && customElements.get(e.tagName.toLowerCase());
    }
    get app() {
      return this;
    }
    get properties() {
      return __privateGet(this, _t4);
    }
    get appName() {
      return __privateGet(this, _s4);
    }
    get router() {
      if (!__privateGet(this, _o4)) throw new Error("Router is not installed with Application.");
      return __privateGet(this, _o4);
    }
    get authenticator() {
      if (!__privateGet(this, _a3)) throw new Error("Authenticator is not installed with the Application.");
      return __privateGet(this, _a3);
    }
    get authenticatorInstalled() {
      return !!__privateGet(this, _a3);
    }
    get ext() {
      return __privateGet(this, _i4);
    }
    get queryParams() {
      return this.queryParamsToObject(location.search);
    }
    set queryParams(e) {
      const t = new URL(window.location.origin + window.location.pathname);
      for (const [o, i] of Object.entries(e)) t.searchParams.set(o, i);
      window.history.replaceState(null, null, t);
      for (const [o, i] of Object.entries(e)) __privateGet(this, _u3).call(this, o, i);
      __privateGet(this, _v3).call(this);
    }
    removeQueryParams(e) {
      const t = this.queryParams, o = {};
      for (const [i, s] of Object.entries(t)) e.includes(i) || (o[i] = s);
      this.queryParams = o;
    }
    get _elements() {
      return __privateGet(this, _l4);
    }
    get hash() {
      return location.hash;
    }
    get port() {
      return location.port;
    }
    get hostname() {
      return location.hostname;
    }
    get host() {
      return location.host;
    }
    get pathname() {
      return location.pathname;
    }
    get origin() {
      return location.origin;
    }
    get routeParameters() {
      return this.router.routeParameters;
    }
    get renderFunctions() {
      return this._renderFunctions;
    }
  }
  _s4 = new WeakMap();
  _e2 = new WeakMap();
  _h3 = new WeakMap();
  _r4 = new WeakMap();
  _t4 = new WeakMap();
  _o4 = new WeakMap();
  _a3 = new WeakMap();
  _i4 = new WeakMap();
  _l4 = new WeakMap();
  _p3 = new WeakMap();
  _c4 = new WeakMap();
  _n4 = new WeakMap();
  _d4 = new WeakMap();
  _f3 = new WeakMap();
  _m3 = new WeakMap();
  _g3 = new WeakMap();
  _u3 = new WeakMap();
  _v3 = new WeakMap();
  class De extends Error {
    constructor({ msg: e, name: t, statusCode: o, response: i }) {
      super(e);
      __publicField(this, "default500", {
        statusCode: "ERR",
        responseMsg: "Internal server error",
        payload: null
      });
      __publicField(this, "init", () => {
        this.responseBody = this.handleResponse(this.response);
      });
      __publicField(this, "handleResponse", (e) => {
        const t = e.status;
        return (e == null ? void 0 : e.headers) ? e.json().then((o) => o).catch((o) => t == 500 ? this.default500 : null) : e;
      });
      this.statusCode = o, this.name = t, this.response = i, this.init();
    }
  }
  class Ss extends De {
    constructor(e) {
      super({
        msg: "Bad request",
        name: "BadRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class _s extends De {
    constructor(e) {
      super({
        msg: "Unauthorized",
        name: "UnauthorizedRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class Bs extends De {
    constructor(e) {
      super({
        msg: "Forbidden resource",
        name: "ForbiddenRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class Ms extends De {
    constructor(e) {
      super({
        msg: "Resource not found",
        name: "ResourceNotFound",
        statusCode: e.status,
        response: e
      });
    }
  }
  class Os extends De {
    constructor(e) {
      super({
        msg: "This HTTP method is not allowed",
        name: "MethodNotAllowed",
        statusCode: e.status,
        response: e
      });
    }
  }
  class As extends De {
    constructor(e) {
      super({
        msg: "The request timed out.",
        name: "RequestTimeout",
        statusCode: e.status,
        response: e
      });
    }
  }
  class Is extends De {
    constructor(e) {
      super({
        msg: "To many requests to the server.",
        name: "ToManyRequests",
        statusCode: e.status,
        response: e
      });
    }
  }
  class Ls extends De {
    constructor(e) {
      super({
        msg: "Internal server error",
        name: "InternalServerError",
        statusCode: e.status,
        response: e
      });
    }
  }
  const Ns = {
    400: Ss,
    401: _s,
    403: Bs,
    404: Ms,
    405: Os,
    408: As,
    429: Is,
    500: Ls
  };
  new Map(Object.entries(Ns));
  class Ps {
    constructor(e) {
      this._response = e, this._consumedJson = null, this._consumedText = null, this._consumedBlob = null, this._consumedArrayBuffer = null;
    }
    get status() {
      return this._response.status;
    }
    get ok() {
      return this._response.ok;
    }
    get statusText() {
      return this._response.statusText;
    }
    get bodyUsed() {
      return this._consumedArrayBuffer != null || this._consumedText != null || this._consumedJson != null || this._consumedBlob != null;
    }
    get headers() {
      return this._response.headers;
    }
    get redirected() {
      return this._response.redirected;
    }
    get type() {
      return this._response.type;
    }
    get url() {
      return this._response.url;
    }
    async text() {
      try {
        if (this._consumedText) return [
          void 0,
          this._consumedText
        ];
        const e = await this._response.text();
        return this._consumedText = e, [
          void 0,
          e
        ];
      } catch (e) {
        return [
          e,
          void 0
        ];
      }
    }
    async json() {
      try {
        if (this._consumedJson) return [
          void 0,
          this._consumedJson
        ];
        const e = await this._response.json();
        return this._consumedJson = e, [
          void 0,
          e
        ];
      } catch (e) {
        return [
          e,
          void 0
        ];
      }
    }
    async blob() {
      try {
        if (this._consumedBlob) return [
          void 0,
          this._consumedBlob
        ];
        const e = await this._response.blob();
        return this._consumedBlob = e, [
          void 0,
          e
        ];
      } catch (e) {
        return [
          e,
          void 0
        ];
      }
    }
    async arrayBuffer() {
      try {
        if (this._consumedArrayBuffer) return [
          void 0,
          this._consumedArrayBuffer
        ];
        const e = await this._response.arrayBuffer();
        return this._consumedArrayBuffer = e, [
          void 0,
          e
        ];
      } catch (e) {
        return [
          e,
          void 0
        ];
      }
    }
  }
  const _jt = class _jt {
  };
  __publicField(_jt, "requestConfigs", {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });
  __publicField(_jt, "catchError", async (e, t) => {
    try {
      const o = await e;
      return [
        void 0,
        new Ps(o)
      ];
    } catch (o) {
      if (!t || t.some((i) => o instanceof i)) return [
        o,
        void 0
      ];
      throw o;
    }
  });
  __publicField(_jt, "getHTML", async ({ url: e, errors: t }) => {
    if (!e) throw new Error("Missing url parameter in GET getHTML call. Forgot to provide a config object? {}");
    const [o, i] = await _jt.catchError(fetch(e), t);
    return o ? [
      o,
      void 0
    ] : await i.text();
  });
  __publicField(_jt, "get", async ({ url: e, requestConfigs: t = {}, errors: o }) => {
    if (!e) throw new Error("Missing url parameter in GET call. Forgot to provide a config object? {}");
    return await _jt.catchError(fetch(e, {
      ..._jt.requestConfigs,
      ...t
    }), o);
  });
  __publicField(_jt, "post", async ({ url: e, data: t, requestConfigs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in POST call. Forgot to provide a config object? {}");
    return await _jt.catchError(fetch(e, {
      ..._jt.requestConfigs,
      ...o,
      method: "POST",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_jt, "postForm", async ({ url: e, data: t, requestConfigs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in POST form call. Forgot to provide a config object? {}");
    const s = _jt._multipartFormDataConfigs(o);
    return await _jt.catchError(fetch(e, {
      ...s,
      method: "POST",
      body: t
    }), i);
  });
  __publicField(_jt, "put", async ({ url: e, data: t, requestConfigs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PUT call. Forgot to provide a config object? {}");
    return await _jt.catchError(fetch(e, {
      ..._jt.requestConfigs,
      ...o,
      method: "PUT",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_jt, "putForm", async ({ url: e, data: t, requestConfigs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PUT form call. Forgot to provide a config object? {}");
    const s = _jt._multipartFormDataConfigs(o);
    return await _jt.catchError(fetch(e, {
      ...s,
      method: "PUT",
      body: t
    }), i);
  });
  __publicField(_jt, "patch", async ({ url: e, data: t, requestConfigs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PATCH call. Forgot to provide a config object? {}");
    return await _jt.catchError(fetch(e, {
      ..._jt.requestConfigs,
      ...o,
      method: "PUT",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_jt, "patchForm", async ({ url: e, data: t, configs: o = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PATCH form call. Forgot to provide a config object? {}");
    const s = _jt._multipartFormDataConfigs(o);
    return await _jt.catchError(fetch(e, {
      ...s,
      method: "PUT",
      body: t
    }), i);
  });
  __publicField(_jt, "delete", async ({ url: e, requestConfigs: t = {}, errors: o }) => {
    if (!e) throw new Error("Missing url parameter in DELETE call. Forgot to provide a config object? {}");
    return await _jt.catchError(fetch(e, {
      ..._jt.requestConfigs,
      ...t,
      method: "DELETE"
    }), o);
  });
  __publicField(_jt, "_multipartFormDataConfigs", (e) => ({
    ..._jt.requestConfigs,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...e
  }));
  let jt = _jt;
  async function Ds() {
    return ne`
        <div class="vh-100">
            <messenger-element class="toast-container position-fixed top-0 end-0 p-3"
            style="z-index: 1080;"></messenger-element>
            <div>
                <menu-element></menu-element>
            </div>
            <div id="content" class="p-1">

            </div>
            <div id="configurations">
                <configurations-offcanvas></configurations-offcanvas>
            </div>
            <div id="quick-notes">
                <quick-notes-offcanvas></quick-notes-offcanvas>
            </div>
        </div>
    `;
  }
  const Rs = ue({
    tagName: "base-layout",
    markup: Ds
  });
  function js() {
    return ne`
    <div
        id="spinner-overlay"
        class="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
        style="z-index: 2050;"
    >
        <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
  }
  function tt() {
    const n = js();
    document.body.insertAdjacentHTML("afterbegin", n);
  }
  function mt() {
    document.querySelector("#spinner-overlay").remove();
  }
  async function Hs() {
    return ne`
        <div class="row mt-5">
            <div class="col-8 mx-auto mt-5 border rounded text-center dropzone p-3" 
            jolt-dragenter="dragEnterHandler" jolt-dragover="dragOverHandler"
            jolt-dragleave="dragLeaveHandler" jolt-drop="dropHandler" jolt-click="uploadLif" 
            style="border-color: #aaa;" role="button">
                <h2 class="text-center">Drop LIF file here or click</h2>
            </div>
            <input type="file" jolt-change="uploadFile" accept=".lif" hidden>
        </div>
    `;
  }
  async function Fs(n, e, t) {
    e.preventDefault(), e.stopPropagation();
  }
  async function Vs(n, e, t) {
    e.preventDefault(), e.stopPropagation(), this.dropzone.style.borderColor = "blue", this.dropzone.classList.add("bg-secondary");
  }
  async function $s(n, e, t) {
    e.preventDefault(), e.stopPropagation(), this.dropzone.style.borderColor = "#aaa", this.dropzone.classList.remove("bg-secondary");
  }
  async function Us(n, e, t) {
    e.preventDefault(), e.stopPropagation();
    const o = e.dataTransfer.files;
    this.handleFile(o[0]), this.dropzone.style.borderColor = "#aaa", this.dropzone.classList.remove("bg-secondary");
  }
  async function Wn(n) {
    tt();
    const e = new FormData();
    e.append("file", n);
    let t = await fetch("/api/v1/files", {
      method: "POST",
      body: e
    });
    if (!t || !t.ok || (t == null ? void 0 : t.status) != 200) return this.ext.messenger.setMessage({
      msg: "Failed to parse LIF file.",
      status: "warning"
    });
    t = await t.json(), this.setData("video", t.data), mt();
  }
  async function zs() {
    this.fileInput.click();
  }
  async function qs(n, e, t) {
    const o = n.files[0];
    await this.handleFile(o);
  }
  const Ws = ue({
    tagName: "upload-dropzone",
    markup: Hs,
    methods: {
      uploadLif: zs,
      handleFile: Wn,
      dropHandler: Us,
      dragEnterHandler: Fs,
      dragOverHandler: Vs,
      dragLeaveHandler: $s,
      uploadFile: qs,
      startOverlaySpinner: tt,
      removeOverlaySpinner: mt
    },
    define: {
      dropzone: be(".dropzone"),
      fileInput: be('input[type="file"]')
    }
  });
  async function Ys() {
    return ne`
    <ul class="menu-bar" class="m-0 p-0">
        <!-- File Menu -->
        <li class="dropdown">
            <a jolt-click="toggleDropdown" :menu="fileDropdown">File</a>
            <ul id="fileDropdown" class="dropdown-menu">
                <li data-bind="video">
                  {{? this.video != null }}
                    <a role="button" jolt-click="newProject">New</a>
                  {{?}}
                </li>
                <li data-bind="app.video">
                  {{? this.video == null }}
                    <a role="button" jolt-click="importLif">Import LIF</a>
                  {{?}}
                </li>
                <input class="lif-upload" type="file" accept=".lif" jolt-change="uploadFile" hidden>
                <li><a role="button" jolt-click="openProject">Open project</a></li>
                <input class="pkl-upload" type="file" accept=".pkl" jolt-change="uploadPkl" hidden>
                <li><a href="/api/v1/files/save-project" jolt-click="saveProject" :next="native_save_project" target="_blank" router-ignore="true">Save project</a></li>
                <hr class="p-0 m-0" />
                <li><a role="button" jolt-click="shutdownApp">Exit</a></li>
            </ul>
        </li>
        <li class="dropdown">
          <a role="button" data-bs-toggle="offcanvas" 
              data-bs-target="#analysisConfigs" aria-controls="analysisConfigs">
                Preferences
            </a>
        </li>
        <!-- Edit Menu -->
        <!-- Help Menu -->
        <li class="dropdown">
            <a jolt-click="toggleDropdown" :menu="helpDropdown">Help</a>
            <ul id="helpDropdown" class="dropdown-menu">
                <li><a href="/app/documentation" jolt-click="closeMenus">Documentation</a></li>
                <li><a role="button" jolt-click="openAboutModal">About</a></li>
            </ul>
        </li>
        <li class="w-100" data-bind="app.video">
          {{? this.video != null }}
            <span class="float-end" data-bind="app.project">
              <a role="button" data-bs-toggle="offcanvas" data-bs-target="#quickNotes" 
                aria-controls="quickNotes" title="Quick notes">
                <i class="far fa-sticky-note fa-lg"></i>
              </a>
            </span>
          {{?}}
        </li>
    </ul>
    `;
  }
  async function Xs(n, e, t) {
    tt();
    let o = await fetch("/shutdown");
    if (!o.ok || (o == null ? void 0 : o.status) != 200) return mt(), this.ext.messenger.setMessage({
      msg: "Something went wrong. Failed to shutdown.",
      status: "danger"
    });
    window.close();
  }
  async function Ks() {
    return Hn`
    /* Custom styling to mimic a Windows menu bar */
    .menu-bar {
      background-color: #0078d7; /* Windows blue */
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
    }
    .menu-bar li {
      position: relative;
    }
    .menu-bar a {
      display: block;
      padding: 10px 20px;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }
    .menu-bar a:hover {
      background-color: #005a9e;
    }
    /* Dropdown styles */
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      display: none;
      background-color: #fff;
      border: 1px solid #ccc;
      min-width: 150px;
      z-index: 1000;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .dropdown-menu li a {
      color: #000;
      padding: 10px 15px;
      display: block;
      text-decoration: none;
    }
    .dropdown-menu li a:hover {
      background-color: #f1f1f1;
    }
    .show {
      display: block;
    }
    `;
  }
  async function Gs(n, e, t) {
    n.blur(), this.pklUpload.click();
  }
  async function Zs(n) {
    if (!(n == null ? void 0 : n.files) || !n.files[0]) return;
    const e = new FormData();
    e.append("file", n.files[0]), tt();
    let t = await fetch("/api/v1/files/open-project", {
      method: "POST",
      body: e
    });
    if (!t || !t.ok || (t == null ? void 0 : t.status) != 200) return this.ext.messenger.setMessage({
      msg: "Failed to parse LIF file.",
      status: "warning"
    });
    t = await t.json(), location.reload();
  }
  function Qs(n, e, t) {
    this.dropdownMenus.forEach(function(o) {
      o.id !== t.menu && o.classList.remove("show");
    }), document.getElementById(t.menu).classList.toggle("show");
  }
  function Js(n) {
    n.target.matches(".menu-bar a") || this.dropdownMenus.forEach(function(e) {
      e.classList.remove("show");
    });
  }
  function er() {
    this.dropdownMenus.forEach((n) => {
      n.classList.remove("show");
    });
  }
  async function tr(n, e, t) {
    n.blur(), this.closeMenus(), window.pywebview && (e.preventDefault(), await window.pywebview.api[t.next]());
  }
  async function or(n, e, t) {
    n.blur(), !(t == null ? void 0 : t.disabled) && (this.closeMenus(), this.fileUpload.click());
  }
  async function nr(n, e, t) {
    const o = n.files[0];
    await this.handleFile(o);
  }
  async function ir(n, e, t) {
    await this.app.ext.messenger.infoModal({
      title: "About",
      content: "<about-info></about-info>"
    });
  }
  async function sr(n, e, t) {
    this.closeMenus(), await this.app.ext.messenger.confirmModal({
      title: "New project",
      content: "Are you sure you want to start a new project? All current data will be deleted.",
      callbackFunction: async (o, i) => {
        await this.startNewProject();
      }
    });
  }
  async function rr() {
    let n = await fetch("/new-project");
    (!n || !(n == null ? void 0 : n.ok) || (n == null ? void 0 : n.status) != 200) && this.ext.messenger.setMessage({
      msg: "Failed to start new project. Check application.",
      status: "warning"
    }), location.reload();
  }
  const ar = ue({
    tagName: "menu-element",
    markup: Ys,
    css: {
      scoped: false,
      style: Ks
    },
    methods: {
      toggleDropdown: Qs,
      closeOnMissclick: Js,
      importLif: or,
      openAboutModal: ir,
      closeMenus: er,
      handleFile: Wn,
      uploadFile: nr,
      shutdownApp: Xs,
      saveProject: tr,
      openProject: Gs,
      uploadPkl: Zs,
      newProject: sr,
      startNewProject: rr
    },
    define: {
      dropdownMenus: ls(".dropdown-menu"),
      fileUpload: be(".lif-upload"),
      pklUpload: be(".pkl-upload"),
      video: {
        get() {
          return this.getData("video");
        }
      }
    },
    afterInit: {
      addClickListener: function() {
        this.app.addEventListener("click", this.closeOnMissclick);
      }
    },
    afterDisconnect: {
      removeClickListener: function() {
        this.app.removeEventListener("click", this.closeOnMissclick);
      }
    }
  });
  async function lr() {
    return ne`
        <div data-bind="app.video">
            {{? this.video == null }}
                <upload-dropzone></upload-dropzone>
            {{??}}
                <video-player></video-player>
            {{?}}
        </div>
    `;
  }
  const Yn = ue({
    tagName: "home-page",
    markup: lr,
    define: {
      video: {
        get() {
          return this.getData("video");
        }
      }
    }
  });
  async function cr() {
    return ne`
        <div>
            <a href="/app" class="text-reset btn btn-sm"><i class="fas fa-arrow-left"></i> Go back</a>
        </div>
        <div class="container my-5">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active text-reset" id="basic-tab" data-bs-toggle="tab" 
                    data-bs-target="#basic" type="button" role="tab" aria-controls="basic" aria-selected="true">Basic usage</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="issues-tab" data-bs-toggle="tab" 
                    data-bs-target="#issues" type="button" role="tab" aria-controls="issues" aria-selected="false">Known issues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="contact-tab" data-bs-toggle="tab" 
                    data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Author and Contact</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="citation-tab" data-bs-toggle="tab" 
                    data-bs-target="#citation" type="button" role="tab" aria-controls="citation" aria-selected="false">Citation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="license-tab" data-bs-toggle="tab" 
                    data-bs-target="#license" type="button" role="tab" aria-controls="license" aria-selected="false">License</button>
                </li>
            </ul>

            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                    <basic-usage-tab></basic-usage-tab>
                </div>
                <div class="tab-pane fade" id="issues" role="tabpanel" aria-labelledby="issues-tab">
                    <issues-tab></issues-tab>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <contact-tab></contact-tab>
                </div>
                <div class="tab-pane fade" id="citation" role="tabpanel" aria-labelledby="citation-tab">
                    <citation-tab></citation-tab>
                </div>
                <div class="tab-pane fade" id="license" role="tabpanel" aria-labelledby="license-tab">
                    <license-tab></license-tab>
                </div>
            </div>
        </div>
    `;
  }
  const Xn = ue({
    tagName: "documentation-page",
    markup: cr
  });
  async function dr() {
    return ne`
    <div class="offcanvas offcanvas-start w-75" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" id="analysisConfigs" aria-labelledby="analysisConfigsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="analysisConfigsLabel">Preferences</h5>
            <button jolt-click="savePreferences" type="button" class="btn btn text-reset" title="Save and close" data-bs-dismiss="offcanvas" aria-label="Close">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div>
                <div class="row vh-100 mx-auto">
                    <form id="configurationsForm">
                        <div class="col-12" data-bind="preferences">
                            <div class="m-3">
                                <div class="row g-3 mb-2">
                                    <div class="col-12 col-md-8 mb-3">
                                        <label for="project_name" class="form-label">Experiment name</label>
                                        <input value="${this.preferences.project_name}" type="text" name="project_name" 
                                        class="form-control" id="project_name" placeholder="Project name">
                                    </div>
                                    <div class="col-12 col-md-4 mb-3">
                                        <label for="sampling" class="form-label">Sampling [Hz]</label>
                                        <input value="${this.preferences.sampling}" type="number" min="0" max="1000" step="0.1" 
                                        name="sampling" class="form-control" id="sampling" placeholder="Sampling rate (Hz)">
                                    </div>
                                </div>
                                <div class="row g-3 mb-2">
                                    <div class="col-12 col-md-6 mb-3">
                                        <label for="px_to_um" class="form-label">Coordinate transform (px to um)</label>
                                        <input value="${this.preferences.px_to_um}" type="number" min="0.01" max="100" 
                                        step="0.01" name="px_to_um" class="form-control" id="px_to_um" placeholder="Coordinate transform">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    `;
  }
  async function ur(n, e, t) {
    n.blur();
    const o = {
      [this.projectName.id]: this.projectName.value,
      [this.sampling.id]: this.sampling.value,
      [this.pxToUm.id]: this.pxToUm.value
    };
    let [i, s] = await jt.post({
      url: `${this.properties.apiUrl}/preferences`,
      data: o
    });
    if (i) return this.ext.messenger.setMessage({
      msg: "Failed to save preferences",
      status: "warning"
    });
    if ([i, s] = await s.json(), i) return this.ext.messenger.setMessage({
      msg: "Failed to parse response from save preferences.",
      status: "warning"
    });
    this.setData("preferences", s.data);
  }
  async function wn() {
    let [n, e] = await jt.get({
      url: `${this.properties.apiUrl}/preferences`
    });
    if (n) return this.ext.messenger.setMessage({
      msg: "Failed to load preferences",
      status: "warning"
    });
    if ([n, e] = await e.json(), n) return this.ext.messenger.setMessage({
      msg: "Failed to parse response from load preferences.",
      status: "warning"
    });
    this.setData("preferences", e.data);
  }
  const hr = ue({
    tagName: "configurations-offcanvas",
    markup: dr,
    methods: {
      savePreferences: ur,
      loadPreferences: wn
    },
    beforeInit: {
      loadPreferences: wn
    },
    define: {
      preferences: ve(null),
      projectName: be("#project_name"),
      sampling: be("#sampling"),
      pxToUm: be("#px_to_um"),
      preferences: {
        get() {
          return this.getData("preferences");
        }
      }
    }
  });
  (function() {
    try {
      if (typeof document < "u") {
        var n = document.createElement("style");
        n.appendChild(document.createTextNode(".ce-hint--align-start{text-align:left}.ce-hint--align-center{text-align:center}.ce-hint__description{opacity:.6;margin-top:3px}")), document.head.appendChild(n);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  var pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function Ht(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  function pr(n) {
    if (n.__esModule) return n;
    var e = n.default;
    if (typeof e == "function") {
      var t = function o() {
        return this instanceof o ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
      value: true
    }), Object.keys(n).forEach(function(o) {
      var i = Object.getOwnPropertyDescriptor(n, o);
      Object.defineProperty(t, o, i.get ? i : {
        enumerable: true,
        get: function() {
          return n[o];
        }
      });
    }), t;
  }
  function Zt() {
  }
  Object.assign(Zt, {
    default: Zt,
    register: Zt,
    revert: function() {
    },
    __esModule: true
  });
  Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(n) {
    const e = (this.document || this.ownerDocument).querySelectorAll(n);
    let t = e.length;
    for (; --t >= 0 && e.item(t) !== this; ) ;
    return t > -1;
  });
  Element.prototype.closest || (Element.prototype.closest = function(n) {
    let e = this;
    if (!document.documentElement.contains(e)) return null;
    do {
      if (e.matches(n)) return e;
      e = e.parentElement || e.parentNode;
    } while (e !== null);
    return null;
  });
  Element.prototype.prepend || (Element.prototype.prepend = function(n) {
    const e = document.createDocumentFragment();
    Array.isArray(n) || (n = [
      n
    ]), n.forEach((t) => {
      const o = t instanceof Node;
      e.appendChild(o ? t : document.createTextNode(t));
    }), this.insertBefore(e, this.firstChild);
  });
  Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(n) {
    n = arguments.length === 0 ? true : !!n;
    const e = this.parentNode, t = window.getComputedStyle(e, null), o = parseInt(t.getPropertyValue("border-top-width")), i = parseInt(t.getPropertyValue("border-left-width")), s = this.offsetTop - e.offsetTop < e.scrollTop, r = this.offsetTop - e.offsetTop + this.clientHeight - o > e.scrollTop + e.clientHeight, l = this.offsetLeft - e.offsetLeft < e.scrollLeft, d = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth, h = s && !r;
    (s || r) && n && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - o + this.clientHeight / 2), (l || d) && n && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (s || r || l || d) && !n && this.scrollIntoView(h);
  });
  window.requestIdleCallback = window.requestIdleCallback || function(n) {
    const e = Date.now();
    return setTimeout(function() {
      n({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - e));
        }
      });
    }, 1);
  };
  window.cancelIdleCallback = window.cancelIdleCallback || function(n) {
    clearTimeout(n);
  };
  let fr = (n = 21) => crypto.getRandomValues(new Uint8Array(n)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
  var Kn = ((n) => (n.VERBOSE = "VERBOSE", n.INFO = "INFO", n.WARN = "WARN", n.ERROR = "ERROR", n))(Kn || {});
  const P = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    DELETE: 46
  }, gr = {
    LEFT: 0
  };
  function vt(n, e, t = "log", o, i = "color: inherit") {
    if (!("console" in window) || !window.console[t]) return;
    const s = [
      "info",
      "log",
      "warn",
      "error"
    ].includes(t), r = [];
    switch (vt.logLevel) {
      case "ERROR":
        if (t !== "error") return;
        break;
      case "WARN":
        if (![
          "error",
          "warn"
        ].includes(t)) return;
        break;
      case "INFO":
        if (!s || n) return;
        break;
    }
    o && r.push(o);
    const l = "Editor.js 2.31.0-rc.7";
    n && (s ? (r.unshift(`line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`, i), e = `%c${l}%c ${e}`) : e = `( ${l} )${e}`);
    try {
      s ? o ? console[t](`${e} %o`, ...r) : console[t](e, ...r) : console[t](e);
    } catch {
    }
  }
  vt.logLevel = "VERBOSE";
  function mr(n) {
    vt.logLevel = n;
  }
  const z = vt.bind(window, false), we = vt.bind(window, true);
  function Ue(n) {
    return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function Q(n) {
    return Ue(n) === "function" || Ue(n) === "asyncfunction";
  }
  function de(n) {
    return Ue(n) === "object";
  }
  function Ie(n) {
    return Ue(n) === "string";
  }
  function vr(n) {
    return Ue(n) === "boolean";
  }
  function En(n) {
    return Ue(n) === "number";
  }
  function xn(n) {
    return Ue(n) === "undefined";
  }
  function Ee(n) {
    return n ? Object.keys(n).length === 0 && n.constructor === Object : true;
  }
  function Gn(n) {
    return n > 47 && n < 58 || n === 32 || n === 13 || n === 229 || n > 64 && n < 91 || n > 95 && n < 112 || n > 185 && n < 193 || n > 218 && n < 223;
  }
  async function br(n, e = () => {
  }, t = () => {
  }) {
    async function o(i, s, r) {
      try {
        await i.function(i.data), await s(xn(i.data) ? {} : i.data);
      } catch {
        r(xn(i.data) ? {} : i.data);
      }
    }
    return n.reduce(async (i, s) => (await i, o(s, e, t)), Promise.resolve());
  }
  function Zn(n) {
    return Array.prototype.slice.call(n);
  }
  function Mt(n, e) {
    return function() {
      const t = this, o = arguments;
      window.setTimeout(() => n.apply(t, o), e);
    };
  }
  function yr(n) {
    return n.name.split(".").pop();
  }
  function kr(n) {
    return /^[-\w]+\/([-+\w]+|\*)$/.test(n);
  }
  function Cn(n, e, t) {
    let o;
    return (...i) => {
      const s = this, r = () => {
        o = null, n.apply(s, i);
      };
      window.clearTimeout(o), o = window.setTimeout(r, e);
    };
  }
  function so(n, e, t = void 0) {
    let o, i, s, r = null, l = 0;
    t || (t = {});
    const d = function() {
      l = t.leading === false ? 0 : Date.now(), r = null, s = n.apply(o, i), r || (o = i = null);
    };
    return function() {
      const h = Date.now();
      !l && t.leading === false && (l = h);
      const g = e - (h - l);
      return o = this, i = arguments, g <= 0 || g > e ? (r && (clearTimeout(r), r = null), l = h, s = n.apply(o, i), r || (o = i = null)) : !r && t.trailing !== false && (r = setTimeout(d, g)), s;
    };
  }
  function wr() {
    const n = {
      win: false,
      mac: false,
      x11: false,
      linux: false
    }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
    return e && (n[e] = true), n;
  }
  function Ot(n) {
    return n[0].toUpperCase() + n.slice(1);
  }
  function ro(n, ...e) {
    if (!e.length) return n;
    const t = e.shift();
    if (de(n) && de(t)) for (const o in t) de(t[o]) ? (n[o] || Object.assign(n, {
      [o]: {}
    }), ro(n[o], t[o])) : Object.assign(n, {
      [o]: t[o]
    });
    return ro(n, ...e);
  }
  function fo(n) {
    const e = wr();
    return n = n.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, " + "), e.mac ? n = n.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
  }
  function Er(n) {
    try {
      return new URL(n).href;
    } catch {
    }
    return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
  }
  function xr() {
    return fr(10);
  }
  function Cr(n) {
    window.open(n, "_blank");
  }
  function Tr(n = "") {
    return `${n}${Math.floor(Math.random() * 1e8).toString(16)}`;
  }
  function ao(n, e, t) {
    const o = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
    n && we(o, "warn");
  }
  function ot(n, e, t) {
    const o = t.value ? "value" : "get", i = t[o], s = `#${e}Cache`;
    if (t[o] = function(...r) {
      return this[s] === void 0 && (this[s] = i.apply(this, ...r)), this[s];
    }, o === "get" && t.set) {
      const r = t.set;
      t.set = function(l) {
        delete n[s], r.apply(this, l);
      };
    }
    return t;
  }
  const Qn = 650;
  function nt() {
    return window.matchMedia(`(max-width: ${Qn}px)`).matches;
  }
  const lo = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function Sr(n, e) {
    const t = Array.isArray(n) || de(n), o = Array.isArray(e) || de(e);
    return t || o ? JSON.stringify(n) === JSON.stringify(e) : n === e;
  }
  let k = class ge {
    static isSingleTag(e) {
      return e.tagName && [
        "AREA",
        "BASE",
        "BR",
        "COL",
        "COMMAND",
        "EMBED",
        "HR",
        "IMG",
        "INPUT",
        "KEYGEN",
        "LINK",
        "META",
        "PARAM",
        "SOURCE",
        "TRACK",
        "WBR"
      ].includes(e.tagName);
    }
    static isLineBreakTag(e) {
      return e && e.tagName && [
        "BR",
        "WBR"
      ].includes(e.tagName);
    }
    static make(e, t = null, o = {}) {
      const i = document.createElement(e);
      if (Array.isArray(t)) {
        const s = t.filter((r) => r !== void 0);
        i.classList.add(...s);
      } else t && i.classList.add(t);
      for (const s in o) Object.prototype.hasOwnProperty.call(o, s) && (i[s] = o[s]);
      return i;
    }
    static text(e) {
      return document.createTextNode(e);
    }
    static append(e, t) {
      Array.isArray(t) ? t.forEach((o) => e.appendChild(o)) : e.appendChild(t);
    }
    static prepend(e, t) {
      Array.isArray(t) ? (t = t.reverse(), t.forEach((o) => e.prepend(o))) : e.prepend(t);
    }
    static swap(e, t) {
      const o = document.createElement("div"), i = e.parentNode;
      i.insertBefore(o, e), i.insertBefore(e, t), i.insertBefore(t, o), i.removeChild(o);
    }
    static find(e = document, t) {
      return e.querySelector(t);
    }
    static get(e) {
      return document.getElementById(e);
    }
    static findAll(e = document, t) {
      return e.querySelectorAll(t);
    }
    static get allInputsSelector() {
      return "[contenteditable=true], textarea, input:not([type]), " + [
        "text",
        "password",
        "email",
        "number",
        "search",
        "tel",
        "url"
      ].map((e) => `input[type="${e}"]`).join(", ");
    }
    static findAllInputs(e) {
      return Zn(e.querySelectorAll(ge.allInputsSelector)).reduce((t, o) => ge.isNativeInput(o) || ge.containsOnlyInlineElements(o) ? [
        ...t,
        o
      ] : [
        ...t,
        ...ge.getDeepestBlockElements(o)
      ], []);
    }
    static getDeepestNode(e, t = false) {
      const o = t ? "lastChild" : "firstChild", i = t ? "previousSibling" : "nextSibling";
      if (e && e.nodeType === Node.ELEMENT_NODE && e[o]) {
        let s = e[o];
        if (ge.isSingleTag(s) && !ge.isNativeInput(s) && !ge.isLineBreakTag(s)) if (s[i]) s = s[i];
        else if (s.parentNode[i]) s = s.parentNode[i];
        else return s.parentNode;
        return this.getDeepestNode(s, t);
      }
      return e;
    }
    static isElement(e) {
      return En(e) ? false : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
    }
    static isFragment(e) {
      return En(e) ? false : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
    }
    static isContentEditable(e) {
      return e.contentEditable === "true";
    }
    static isNativeInput(e) {
      const t = [
        "INPUT",
        "TEXTAREA"
      ];
      return e && e.tagName ? t.includes(e.tagName) : false;
    }
    static canSetCaret(e) {
      let t = true;
      if (ge.isNativeInput(e)) switch (e.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          t = false;
          break;
      }
      else t = ge.isContentEditable(e);
      return t;
    }
    static isNodeEmpty(e, t) {
      let o;
      return this.isSingleTag(e) && !this.isLineBreakTag(e) ? false : (this.isElement(e) && this.isNativeInput(e) ? o = e.value : o = e.textContent.replace("\u200B", ""), t && (o = o.replace(new RegExp(t, "g"), "")), o.length === 0);
    }
    static isLeaf(e) {
      return e ? e.childNodes.length === 0 : false;
    }
    static isEmpty(e, t) {
      const o = [
        e
      ];
      for (; o.length > 0; ) if (e = o.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e, t)) return false;
        e.childNodes && o.push(...Array.from(e.childNodes));
      }
      return true;
    }
    static isHTMLString(e) {
      const t = ge.make("div");
      return t.innerHTML = e, t.childElementCount > 0;
    }
    static getContentLength(e) {
      return ge.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
    }
    static get blockElements() {
      return [
        "address",
        "article",
        "aside",
        "blockquote",
        "canvas",
        "div",
        "dl",
        "dt",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hgroup",
        "hr",
        "li",
        "main",
        "nav",
        "noscript",
        "ol",
        "output",
        "p",
        "pre",
        "ruby",
        "section",
        "table",
        "tbody",
        "thead",
        "tr",
        "tfoot",
        "ul",
        "video"
      ];
    }
    static containsOnlyInlineElements(e) {
      let t;
      Ie(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
      const o = (i) => !ge.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(o);
      return Array.from(t.children).every(o);
    }
    static getDeepestBlockElements(e) {
      return ge.containsOnlyInlineElements(e) ? [
        e
      ] : Array.from(e.children).reduce((t, o) => [
        ...t,
        ...ge.getDeepestBlockElements(o)
      ], []);
    }
    static getHolder(e) {
      return Ie(e) ? document.getElementById(e) : e;
    }
    static isAnchor(e) {
      return e.tagName.toLowerCase() === "a";
    }
    static offset(e) {
      const t = e.getBoundingClientRect(), o = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, s = t.top + i, r = t.left + o;
      return {
        top: s,
        left: r,
        bottom: s + t.height,
        right: r + t.width
      };
    }
  };
  function _r(n) {
    return !/[^\t\n\r ]/.test(n);
  }
  function Br(n) {
    const e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), s = parseFloat(e.borderTopWidth), r = parseFloat(e.marginTop), l = t * 0.8, d = (o - t) / 2;
    return r + s + i + d + l;
  }
  function Jn(n) {
    n.dataset.empty = k.isEmpty(n) ? "true" : "false";
  }
  const Mr = {
    blockTunes: {
      toggler: {
        "Click to tune": "",
        "or drag to move": ""
      }
    },
    inlineToolbar: {
      converter: {
        "Convert to": ""
      }
    },
    toolbar: {
      toolbox: {
        Add: ""
      }
    },
    popover: {
      Filter: "",
      "Nothing found": "",
      "Convert to": ""
    }
  }, Or = {
    Text: "",
    Link: "",
    Bold: "",
    Italic: ""
  }, Ar = {
    link: {
      "Add a link": ""
    },
    stub: {
      "The block can not be displayed correctly.": ""
    }
  }, Ir = {
    delete: {
      Delete: "",
      "Click to delete": ""
    },
    moveUp: {
      "Move up": ""
    },
    moveDown: {
      "Move down": ""
    }
  }, ei = {
    ui: Mr,
    toolNames: Or,
    tools: Ar,
    blockTunes: Ir
  }, ti = class Ge {
    static ui(e, t) {
      return Ge._t(e, t);
    }
    static t(e, t) {
      return Ge._t(e, t);
    }
    static setDictionary(e) {
      Ge.currentDictionary = e;
    }
    static _t(e, t) {
      const o = Ge.getNamespace(e);
      return !o || !o[t] ? t : o[t];
    }
    static getNamespace(e) {
      return e.split(".").reduce((t, o) => !t || !Object.keys(t).length ? {} : t[o], Ge.currentDictionary);
    }
  };
  ti.currentDictionary = ei;
  let me = ti;
  class oi extends Error {
  }
  class bt {
    constructor() {
      this.subscribers = {};
    }
    on(e, t) {
      e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
    }
    once(e, t) {
      e in this.subscribers || (this.subscribers[e] = []);
      const o = (i) => {
        const s = t(i), r = this.subscribers[e].indexOf(o);
        return r !== -1 && this.subscribers[e].splice(r, 1), s;
      };
      this.subscribers[e].push(o);
    }
    emit(e, t) {
      Ee(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((o, i) => {
        const s = i(o);
        return s !== void 0 ? s : o;
      }, t);
    }
    off(e, t) {
      if (this.subscribers[e] === void 0) {
        console.warn(`EventDispatcher .off(): there is no subscribers for event "${e.toString()}". Probably, .off() called before .on()`);
        return;
      }
      for (let o = 0; o < this.subscribers[e].length; o++) if (this.subscribers[e][o] === t) {
        delete this.subscribers[e][o];
        break;
      }
    }
    destroy() {
      this.subscribers = {};
    }
  }
  function Oe(n) {
    Object.setPrototypeOf(this, {
      get id() {
        return n.id;
      },
      get name() {
        return n.name;
      },
      get config() {
        return n.config;
      },
      get holder() {
        return n.holder;
      },
      get isEmpty() {
        return n.isEmpty;
      },
      get selected() {
        return n.selected;
      },
      set stretched(e) {
        n.stretched = e;
      },
      get stretched() {
        return n.stretched;
      },
      get focusable() {
        return n.focusable;
      },
      call(e, t) {
        return n.call(e, t);
      },
      save() {
        return n.save();
      },
      validate(e) {
        return n.validate(e);
      },
      dispatchChange() {
        n.dispatchChange();
      },
      getActiveToolboxEntry() {
        return n.getActiveToolboxEntry();
      }
    });
  }
  class yt {
    constructor() {
      this.allListeners = [];
    }
    on(e, t, o, i = false) {
      const s = Tr("l"), r = {
        id: s,
        element: e,
        eventType: t,
        handler: o,
        options: i
      };
      if (!this.findOne(e, t, o)) return this.allListeners.push(r), e.addEventListener(t, o, i), s;
    }
    off(e, t, o, i) {
      const s = this.findAll(e, t, o);
      s.forEach((r, l) => {
        const d = this.allListeners.indexOf(s[l]);
        d > -1 && (this.allListeners.splice(d, 1), r.element.removeEventListener(r.eventType, r.handler, r.options));
      });
    }
    offById(e) {
      const t = this.findById(e);
      t && t.element.removeEventListener(t.eventType, t.handler, t.options);
    }
    findOne(e, t, o) {
      const i = this.findAll(e, t, o);
      return i.length > 0 ? i[0] : null;
    }
    findAll(e, t, o) {
      let i;
      const s = e ? this.findByEventTarget(e) : [];
      return e && t && o ? i = s.filter((r) => r.eventType === t && r.handler === o) : e && t ? i = s.filter((r) => r.eventType === t) : i = s, i;
    }
    removeAll() {
      this.allListeners.map((e) => {
        e.element.removeEventListener(e.eventType, e.handler, e.options);
      }), this.allListeners = [];
    }
    destroy() {
      this.removeAll();
    }
    findByEventTarget(e) {
      return this.allListeners.filter((t) => {
        if (t.element === e) return t;
      });
    }
    findByType(e) {
      return this.allListeners.filter((t) => {
        if (t.eventType === e) return t;
      });
    }
    findByHandler(e) {
      return this.allListeners.filter((t) => {
        if (t.handler === e) return t;
      });
    }
    findById(e) {
      return this.allListeners.find((t) => t.id === e);
    }
  }
  class j {
    constructor({ config: e, eventsDispatcher: t }) {
      if (this.nodes = {}, this.listeners = new yt(), this.readOnlyMutableListeners = {
        on: (o, i, s, r = false) => {
          this.mutableListenerIds.push(this.listeners.on(o, i, s, r));
        },
        clearAll: () => {
          for (const o of this.mutableListenerIds) this.listeners.offById(o);
          this.mutableListenerIds = [];
        }
      }, this.mutableListenerIds = [], new.target === j) throw new TypeError("Constructors for abstract class Module are not allowed.");
      this.config = e, this.eventsDispatcher = t;
    }
    set state(e) {
      this.Editor = e;
    }
    removeAllNodes() {
      for (const e in this.nodes) {
        const t = this.nodes[e];
        t instanceof HTMLElement && t.remove();
      }
    }
    get isRtl() {
      return this.config.i18n.direction === "rtl";
    }
  }
  class M {
    constructor() {
      this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = false, this.commandBackground = "backColor", this.commandRemoveFormat = "removeFormat";
    }
    static get CSS() {
      return {
        editorWrapper: "codex-editor",
        editorZone: "codex-editor__redactor"
      };
    }
    static get anchorNode() {
      const e = window.getSelection();
      return e ? e.anchorNode : null;
    }
    static get anchorElement() {
      const e = window.getSelection();
      if (!e) return null;
      const t = e.anchorNode;
      return t ? k.isElement(t) ? t : t.parentElement : null;
    }
    static get anchorOffset() {
      const e = window.getSelection();
      return e ? e.anchorOffset : null;
    }
    static get isCollapsed() {
      const e = window.getSelection();
      return e ? e.isCollapsed : null;
    }
    static get isAtEditor() {
      return this.isSelectionAtEditor(M.get());
    }
    static isSelectionAtEditor(e) {
      if (!e) return false;
      let t = e.anchorNode || e.focusNode;
      t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
      let o = null;
      return t && t instanceof Element && (o = t.closest(`.${M.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : false;
    }
    static isRangeAtEditor(e) {
      if (!e) return;
      let t = e.startContainer;
      t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
      let o = null;
      return t && t instanceof Element && (o = t.closest(`.${M.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : false;
    }
    static get isSelectionExists() {
      return !!M.get().anchorNode;
    }
    static get range() {
      return this.getRangeFromSelection(this.get());
    }
    static getRangeFromSelection(e) {
      return e && e.rangeCount ? e.getRangeAt(0) : null;
    }
    static get rect() {
      let e = document.selection, t, o = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      if (e && e.type !== "Control") return e = e, t = e.createRange(), o.x = t.boundingLeft, o.y = t.boundingTop, o.width = t.boundingWidth, o.height = t.boundingHeight, o;
      if (!window.getSelection) return z("Method window.getSelection is not supported", "warn"), o;
      if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount)) return z("Method SelectionUtils.rangeCount is not supported", "warn"), o;
      if (e.rangeCount === 0) return o;
      if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (o = t.getBoundingClientRect()), o.x === 0 && o.y === 0) {
        const i = document.createElement("span");
        if (i.getBoundingClientRect) {
          i.appendChild(document.createTextNode("\u200B")), t.insertNode(i), o = i.getBoundingClientRect();
          const s = i.parentNode;
          s.removeChild(i), s.normalize();
        }
      }
      return o;
    }
    static get text() {
      return window.getSelection ? window.getSelection().toString() : "";
    }
    static get() {
      return window.getSelection();
    }
    static setCursor(e, t = 0) {
      const o = document.createRange(), i = window.getSelection();
      return k.isNativeInput(e) ? k.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (o.setStart(e, t), o.setEnd(e, t), i.removeAllRanges(), i.addRange(o), o.getBoundingClientRect());
    }
    static isRangeInsideContainer(e) {
      const t = M.range;
      return t === null ? false : e.contains(t.startContainer);
    }
    static addFakeCursor() {
      const e = M.range;
      if (e === null) return;
      const t = k.make("span", "codex-editor__fake-cursor");
      t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
    }
    static isFakeCursorInsideContainer(e) {
      return k.find(e, ".codex-editor__fake-cursor") !== null;
    }
    static removeFakeCursor(e = document.body) {
      const t = k.find(e, ".codex-editor__fake-cursor");
      t && t.remove();
    }
    removeFakeBackground() {
      this.isFakeBackgroundEnabled && (this.isFakeBackgroundEnabled = false, document.execCommand(this.commandRemoveFormat));
    }
    setFakeBackground() {
      document.execCommand(this.commandBackground, false, "#a8d6ff"), this.isFakeBackgroundEnabled = true;
    }
    save() {
      this.savedSelectionRange = M.range;
    }
    restore() {
      if (!this.savedSelectionRange) return;
      const e = window.getSelection();
      e.removeAllRanges(), e.addRange(this.savedSelectionRange);
    }
    clearSaved() {
      this.savedSelectionRange = null;
    }
    collapseToEnd() {
      const e = window.getSelection(), t = document.createRange();
      t.selectNodeContents(e.focusNode), t.collapse(false), e.removeAllRanges(), e.addRange(t);
    }
    findParentTag(e, t, o = 10) {
      const i = window.getSelection();
      let s = null;
      return !i || !i.anchorNode || !i.focusNode ? null : ([
        i.anchorNode,
        i.focusNode
      ].forEach((r) => {
        let l = o;
        for (; l > 0 && r.parentNode && !(r.tagName === e && (s = r, t && r.classList && !r.classList.contains(t) && (s = null), s)); ) r = r.parentNode, l--;
      }), s);
    }
    expandToTag(e) {
      const t = window.getSelection();
      t.removeAllRanges();
      const o = document.createRange();
      o.selectNodeContents(e), t.addRange(o);
    }
  }
  function Lr(n, e) {
    const { type: t, target: o, addedNodes: i, removedNodes: s } = n;
    return n.type === "attributes" && n.attributeName === "data-empty" ? false : !!(e.contains(o) || t === "childList" && (Array.from(i).some((r) => r === e) || Array.from(s).some((r) => r === e)));
  }
  const co = "redactor dom changed", ni = "block changed", ii = "fake cursor is about to be toggled", si = "fake cursor have been set", ft = "editor mobile layout toggled";
  function uo(n, e) {
    if (!n.conversionConfig) return false;
    const t = n.conversionConfig[e];
    return Q(t) || Ie(t);
  }
  function At(n, e) {
    return uo(n.tool, e);
  }
  function ri(n, e) {
    return Object.entries(n).some(([t, o]) => e[t] && Sr(e[t], o));
  }
  async function ai(n, e) {
    const t = (await n.save()).data, o = e.find((i) => i.name === n.name);
    return o !== void 0 && !uo(o, "export") ? [] : e.reduce((i, s) => {
      if (!uo(s, "import") || s.toolbox === void 0) return i;
      const r = s.toolbox.filter((l) => {
        if (Ee(l) || l.icon === void 0) return false;
        if (l.data !== void 0) {
          if (ri(l.data, t)) return false;
        } else if (s.name === n.name) return false;
        return true;
      });
      return i.push({
        ...s,
        toolbox: r
      }), i;
    }, []);
  }
  function Tn(n, e) {
    return n.mergeable ? n.name === e.name ? true : At(e, "export") && At(n, "import") : false;
  }
  function Nr(n, e) {
    const t = e == null ? void 0 : e.export;
    return Q(t) ? t(n) : Ie(t) ? n[t] : (t !== void 0 && z("Conversion \xABexport\xBB property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
  }
  function Sn(n, e, t) {
    const o = e == null ? void 0 : e.import;
    return Q(o) ? o(n, t) : Ie(o) ? {
      [o]: n
    } : (o !== void 0 && z("Conversion \xABimport\xBB property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
  }
  var G = ((n) => (n.Default = "default", n.Separator = "separator", n.Html = "html", n))(G || {}), Ae = ((n) => (n.APPEND_CALLBACK = "appendCallback", n.RENDERED = "rendered", n.MOVED = "moved", n.UPDATED = "updated", n.REMOVED = "removed", n.ON_PASTE = "onPaste", n))(Ae || {});
  class ce extends bt {
    constructor({ id: e = xr(), data: t, tool: o, readOnly: i, tunesData: s }, r) {
      super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
        this.dropInputsCache(), this.updateCurrentInput();
      }, this.didMutated = (l = void 0) => {
        const d = l === void 0, h = l instanceof InputEvent;
        !d && !h && this.detectToolRootChange(l);
        let g;
        d || h ? g = true : g = !(l.length > 0 && l.every((v) => {
          const { addedNodes: b, removedNodes: w, target: y } = v;
          return [
            ...Array.from(b),
            ...Array.from(w),
            y
          ].some((T) => (k.isElement(T) || (T = T.parentElement), T && T.closest('[data-mutation-free="true"]') !== null));
        })), g && (this.dropInputsCache(), this.updateCurrentInput(), this.toggleInputsEmptyMark(), this.call("updated"), this.emit("didMutated", this));
      }, this.name = o.name, this.id = e, this.settings = o.settings, this.config = o.settings.config || {}, this.editorEventBus = r || null, this.blockAPI = new Oe(this), this.tool = o, this.toolInstance = o.create(t, this.blockAPI, i), this.tunes = o.tunes, this.composeTunes(s), this.holder = this.compose(), window.requestIdleCallback(() => {
        this.watchBlockMutations(), this.addInputEvents(), this.toggleInputsEmptyMark();
      });
    }
    static get CSS() {
      return {
        wrapper: "ce-block",
        wrapperStretched: "ce-block--stretched",
        content: "ce-block__content",
        selected: "ce-block--selected",
        dropTarget: "ce-block--drop-target"
      };
    }
    get inputs() {
      if (this.cachedInputs.length !== 0) return this.cachedInputs;
      const e = k.findAllInputs(this.holder);
      return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
    }
    get currentInput() {
      return this.inputs[this.inputIndex];
    }
    set currentInput(e) {
      const t = this.inputs.findIndex((o) => o === e || o.contains(e));
      t !== -1 && (this.inputIndex = t);
    }
    get firstInput() {
      return this.inputs[0];
    }
    get lastInput() {
      const e = this.inputs;
      return e[e.length - 1];
    }
    get nextInput() {
      return this.inputs[this.inputIndex + 1];
    }
    get previousInput() {
      return this.inputs[this.inputIndex - 1];
    }
    get data() {
      return this.save().then((e) => e && !Ee(e.data) ? e.data : {});
    }
    get sanitize() {
      return this.tool.sanitizeConfig;
    }
    get mergeable() {
      return Q(this.toolInstance.merge);
    }
    get focusable() {
      return this.inputs.length !== 0;
    }
    get isEmpty() {
      const e = k.isEmpty(this.pluginsContent, "/"), t = !this.hasMedia;
      return e && t;
    }
    get hasMedia() {
      const e = [
        "img",
        "iframe",
        "video",
        "audio",
        "source",
        "input",
        "textarea",
        "twitterwidget"
      ];
      return !!this.holder.querySelector(e.join(","));
    }
    set selected(e) {
      var t, o;
      this.holder.classList.toggle(ce.CSS.selected, e);
      const i = e === true && M.isRangeInsideContainer(this.holder), s = e === false && M.isFakeCursorInsideContainer(this.holder);
      (i || s) && ((t = this.editorEventBus) == null || t.emit(ii, {
        state: e
      }), i ? M.addFakeCursor() : M.removeFakeCursor(this.holder), (o = this.editorEventBus) == null || o.emit(si, {
        state: e
      }));
    }
    get selected() {
      return this.holder.classList.contains(ce.CSS.selected);
    }
    set stretched(e) {
      this.holder.classList.toggle(ce.CSS.wrapperStretched, e);
    }
    get stretched() {
      return this.holder.classList.contains(ce.CSS.wrapperStretched);
    }
    set dropTarget(e) {
      this.holder.classList.toggle(ce.CSS.dropTarget, e);
    }
    get pluginsContent() {
      return this.toolRenderedElement;
    }
    call(e, t) {
      if (Q(this.toolInstance[e])) {
        e === "appendCallback" && z("`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead", "warn");
        try {
          this.toolInstance[e].call(this.toolInstance, t);
        } catch (o) {
          z(`Error during '${e}' call: ${o.message}`, "error");
        }
      }
    }
    async mergeWith(e) {
      await this.toolInstance.merge(e);
    }
    async save() {
      const e = await this.toolInstance.save(this.pluginsContent), t = this.unavailableTunesData;
      [
        ...this.tunesInstances.entries(),
        ...this.defaultTunesInstances.entries()
      ].forEach(([s, r]) => {
        if (Q(r.save)) try {
          t[s] = r.save();
        } catch (l) {
          z(`Tune ${r.constructor.name} save method throws an Error %o`, "warn", l);
        }
      });
      const o = window.performance.now();
      let i;
      return Promise.resolve(e).then((s) => (i = window.performance.now(), {
        id: this.id,
        tool: this.name,
        data: s,
        tunes: t,
        time: i - o
      })).catch((s) => {
        z(`Saving process for ${this.name} tool failed due to the ${s}`, "log", "red");
      });
    }
    async validate(e) {
      let t = true;
      return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
    }
    getTunes() {
      const e = [], t = [], o = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [];
      return k.isElement(o) ? e.push({
        type: G.Html,
        element: o
      }) : Array.isArray(o) ? e.push(...o) : e.push(o), [
        ...this.tunesInstances.values(),
        ...this.defaultTunesInstances.values()
      ].map((i) => i.render()).forEach((i) => {
        k.isElement(i) ? t.push({
          type: G.Html,
          element: i
        }) : Array.isArray(i) ? t.push(...i) : t.push(i);
      }), {
        toolTunes: e,
        commonTunes: t
      };
    }
    updateCurrentInput() {
      this.currentInput = k.isNativeInput(document.activeElement) || !M.anchorNode ? document.activeElement : M.anchorNode;
    }
    dispatchChange() {
      this.didMutated();
    }
    destroy() {
      this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), Q(this.toolInstance.destroy) && this.toolInstance.destroy();
    }
    async getActiveToolboxEntry() {
      const e = this.tool.toolbox;
      if (e.length === 1) return Promise.resolve(this.tool.toolbox[0]);
      const t = await this.data, o = e;
      return o == null ? void 0 : o.find((i) => ri(i.data, t));
    }
    async exportDataAsString() {
      const e = await this.data;
      return Nr(e, this.tool.conversionConfig);
    }
    compose() {
      const e = k.make("div", ce.CSS.wrapper), t = k.make("div", ce.CSS.content), o = this.toolInstance.render();
      e.setAttribute("data-cy", "block-wrapper"), e.dataset.id = this.id, this.toolRenderedElement = o, t.appendChild(this.toolRenderedElement);
      let i = t;
      return [
        ...this.tunesInstances.values(),
        ...this.defaultTunesInstances.values()
      ].forEach((s) => {
        if (Q(s.wrap)) try {
          i = s.wrap(i);
        } catch (r) {
          z(`Tune ${s.constructor.name} wrap method throws an Error %o`, "warn", r);
        }
      }), e.appendChild(i), e;
    }
    composeTunes(e) {
      Array.from(this.tunes.values()).forEach((t) => {
        (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
      }), Object.entries(e).forEach(([t, o]) => {
        this.tunesInstances.has(t) || (this.unavailableTunesData[t] = o);
      });
    }
    addInputEvents() {
      this.inputs.forEach((e) => {
        e.addEventListener("focus", this.handleFocus), k.isNativeInput(e) && e.addEventListener("input", this.didMutated);
      });
    }
    removeInputEvents() {
      this.inputs.forEach((e) => {
        e.removeEventListener("focus", this.handleFocus), k.isNativeInput(e) && e.removeEventListener("input", this.didMutated);
      });
    }
    watchBlockMutations() {
      var e;
      this.redactorDomChangedCallback = (t) => {
        const { mutations: o } = t;
        o.some((i) => Lr(i, this.toolRenderedElement)) && this.didMutated(o);
      }, (e = this.editorEventBus) == null || e.on(co, this.redactorDomChangedCallback);
    }
    unwatchBlockMutations() {
      var e;
      (e = this.editorEventBus) == null || e.off(co, this.redactorDomChangedCallback);
    }
    detectToolRootChange(e) {
      e.forEach((t) => {
        if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
          const o = t.addedNodes[t.addedNodes.length - 1];
          this.toolRenderedElement = o;
        }
      });
    }
    dropInputsCache() {
      this.cachedInputs = [];
    }
    toggleInputsEmptyMark() {
      this.inputs.forEach(Jn);
    }
  }
  class Pr extends j {
    constructor() {
      super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, o = {}, i, s, r, l) => {
        const d = this.Editor.BlockManager.insert({
          id: l,
          tool: e,
          data: t,
          index: i,
          needToFocus: s,
          replace: r
        });
        return new Oe(d);
      }, this.composeBlockData = async (e) => {
        const t = this.Editor.Tools.blockTools.get(e);
        return new ce({
          tool: t,
          api: this.Editor.API,
          readOnly: true,
          data: {},
          tunesData: {}
        }).data;
      }, this.update = async (e, t, o) => {
        const { BlockManager: i } = this.Editor, s = i.getBlockById(e);
        if (s === void 0) throw new Error(`Block with id "${e}" not found`);
        const r = await i.update(s, t, o);
        return new Oe(r);
      }, this.convert = async (e, t, o) => {
        var i, s;
        const { BlockManager: r, Tools: l } = this.Editor, d = r.getBlockById(e);
        if (!d) throw new Error(`Block with id "${e}" not found`);
        const h = l.blockTools.get(d.name), g = l.blockTools.get(t);
        if (!g) throw new Error(`Block Tool with type "${t}" not found`);
        const v = ((i = h == null ? void 0 : h.conversionConfig) == null ? void 0 : i.export) !== void 0, b = ((s = g.conversionConfig) == null ? void 0 : s.import) !== void 0;
        if (v && b) {
          const w = await r.convert(d, t, o);
          return new Oe(w);
        } else {
          const w = [
            v ? false : Ot(d.name),
            b ? false : Ot(t)
          ].filter(Boolean).join(" and ");
          throw new Error(`Conversion from "${d.name}" to "${t}" is not possible. ${w} tool(s) should provide a "conversionConfig"`);
        }
      }, this.insertMany = (e, t = this.Editor.BlockManager.blocks.length - 1) => {
        this.validateIndex(t);
        const o = e.map(({ id: i, type: s, data: r }) => this.Editor.BlockManager.composeBlock({
          id: i,
          tool: s || this.config.defaultBlock,
          data: r
        }));
        return this.Editor.BlockManager.insertMany(o, t), o.map((i) => new Oe(i));
      };
    }
    get methods() {
      return {
        clear: () => this.clear(),
        render: (e) => this.render(e),
        renderFromHTML: (e) => this.renderFromHTML(e),
        delete: (e) => this.delete(e),
        swap: (e, t) => this.swap(e, t),
        move: (e, t) => this.move(e, t),
        getBlockByIndex: (e) => this.getBlockByIndex(e),
        getById: (e) => this.getById(e),
        getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
        getBlockIndex: (e) => this.getBlockIndex(e),
        getBlocksCount: () => this.getBlocksCount(),
        getBlockByElement: (e) => this.getBlockByElement(e),
        stretchBlock: (e, t = true) => this.stretchBlock(e, t),
        insertNewBlock: () => this.insertNewBlock(),
        insert: this.insert,
        insertMany: this.insertMany,
        update: this.update,
        composeBlockData: this.composeBlockData,
        convert: this.convert
      };
    }
    getBlocksCount() {
      return this.Editor.BlockManager.blocks.length;
    }
    getCurrentBlockIndex() {
      return this.Editor.BlockManager.currentBlockIndex;
    }
    getBlockIndex(e) {
      const t = this.Editor.BlockManager.getBlockById(e);
      if (!t) {
        we("There is no block with id `" + e + "`", "warn");
        return;
      }
      return this.Editor.BlockManager.getBlockIndex(t);
    }
    getBlockByIndex(e) {
      const t = this.Editor.BlockManager.getBlockByIndex(e);
      if (t === void 0) {
        we("There is no block at index `" + e + "`", "warn");
        return;
      }
      return new Oe(t);
    }
    getById(e) {
      const t = this.Editor.BlockManager.getBlockById(e);
      return t === void 0 ? (we("There is no block with id `" + e + "`", "warn"), null) : new Oe(t);
    }
    getBlockByElement(e) {
      const t = this.Editor.BlockManager.getBlock(e);
      if (t === void 0) {
        we("There is no block corresponding to element `" + e + "`", "warn");
        return;
      }
      return new Oe(t);
    }
    swap(e, t) {
      z("`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead", "info"), this.Editor.BlockManager.swap(e, t);
    }
    move(e, t) {
      this.Editor.BlockManager.move(e, t);
    }
    delete(e = this.Editor.BlockManager.currentBlockIndex) {
      try {
        const t = this.Editor.BlockManager.getBlockByIndex(e);
        this.Editor.BlockManager.removeBlock(t);
      } catch (t) {
        we(t, "warn");
        return;
      }
      this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
    }
    async clear() {
      await this.Editor.BlockManager.clear(true), this.Editor.InlineToolbar.close();
    }
    async render(e) {
      if (e === void 0 || e.blocks === void 0) throw new Error("Incorrect data passed to the render() method");
      this.Editor.ModificationsObserver.disable(), await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(e.blocks), this.Editor.ModificationsObserver.enable();
    }
    renderFromHTML(e) {
      return this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, true);
    }
    stretchBlock(e, t = true) {
      ao(true, "blocks.stretchBlock()", "BlockAPI");
      const o = this.Editor.BlockManager.getBlockByIndex(e);
      o && (o.stretched = t);
    }
    insertNewBlock() {
      z("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
    }
    validateIndex(e) {
      if (typeof e != "number") throw new Error("Index should be a number");
      if (e < 0) throw new Error("Index should be greater than or equal to 0");
      if (e === null) throw new Error("Index should be greater than or equal to 0");
    }
  }
  function Dr(n, e) {
    return typeof n == "number" ? e.BlockManager.getBlockByIndex(n) : typeof n == "string" ? e.BlockManager.getBlockById(n) : e.BlockManager.getBlockById(n.id);
  }
  class Rr extends j {
    constructor() {
      super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), true) : false, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), true) : false, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), true) : false, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), true) : false, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, o = 0) => {
        const i = Dr(e, this.Editor);
        return i === void 0 ? false : (this.Editor.Caret.setToBlock(i, t, o), true);
      }, this.focus = (e = false) => e ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
    }
    get methods() {
      return {
        setToFirstBlock: this.setToFirstBlock,
        setToLastBlock: this.setToLastBlock,
        setToPreviousBlock: this.setToPreviousBlock,
        setToNextBlock: this.setToNextBlock,
        setToBlock: this.setToBlock,
        focus: this.focus
      };
    }
  }
  class jr extends j {
    get methods() {
      return {
        emit: (e, t) => this.emit(e, t),
        off: (e, t) => this.off(e, t),
        on: (e, t) => this.on(e, t)
      };
    }
    on(e, t) {
      this.eventsDispatcher.on(e, t);
    }
    emit(e, t) {
      this.eventsDispatcher.emit(e, t);
    }
    off(e, t) {
      this.eventsDispatcher.off(e, t);
    }
  }
  class go extends j {
    static getNamespace(e, t) {
      return t ? `blockTunes.${e}` : `tools.${e}`;
    }
    get methods() {
      return {
        t: () => {
          we("I18n.t() method can be accessed only from Tools", "warn");
        }
      };
    }
    getMethodsForTool(e, t) {
      return Object.assign(this.methods, {
        t: (o) => me.t(go.getNamespace(e, t), o)
      });
    }
  }
  class Hr extends j {
    get methods() {
      return {
        blocks: this.Editor.BlocksAPI.methods,
        caret: this.Editor.CaretAPI.methods,
        tools: this.Editor.ToolsAPI.methods,
        events: this.Editor.EventsAPI.methods,
        listeners: this.Editor.ListenersAPI.methods,
        notifier: this.Editor.NotifierAPI.methods,
        sanitizer: this.Editor.SanitizerAPI.methods,
        saver: this.Editor.SaverAPI.methods,
        selection: this.Editor.SelectionAPI.methods,
        styles: this.Editor.StylesAPI.classes,
        toolbar: this.Editor.ToolbarAPI.methods,
        inlineToolbar: this.Editor.InlineToolbarAPI.methods,
        tooltip: this.Editor.TooltipAPI.methods,
        i18n: this.Editor.I18nAPI.methods,
        readOnly: this.Editor.ReadOnlyAPI.methods,
        ui: this.Editor.UiAPI.methods
      };
    }
    getMethodsForTool(e, t) {
      return Object.assign(this.methods, {
        i18n: this.Editor.I18nAPI.getMethodsForTool(e, t)
      });
    }
  }
  class Fr extends j {
    get methods() {
      return {
        close: () => this.close(),
        open: () => this.open()
      };
    }
    open() {
      this.Editor.InlineToolbar.tryToShow();
    }
    close() {
      this.Editor.InlineToolbar.close();
    }
  }
  class Vr extends j {
    get methods() {
      return {
        on: (e, t, o, i) => this.on(e, t, o, i),
        off: (e, t, o, i) => this.off(e, t, o, i),
        offById: (e) => this.offById(e)
      };
    }
    on(e, t, o, i) {
      return this.listeners.on(e, t, o, i);
    }
    off(e, t, o, i) {
      this.listeners.off(e, t, o, i);
    }
    offById(e) {
      this.listeners.offById(e);
    }
  }
  var li = {
    exports: {}
  };
  (function(n, e) {
    (function(t, o) {
      n.exports = o();
    })(window, function() {
      return function(t) {
        var o = {};
        function i(s) {
          if (o[s]) return o[s].exports;
          var r = o[s] = {
            i: s,
            l: false,
            exports: {}
          };
          return t[s].call(r.exports, r, r.exports, i), r.l = true, r.exports;
        }
        return i.m = t, i.c = o, i.d = function(s, r, l) {
          i.o(s, r) || Object.defineProperty(s, r, {
            enumerable: true,
            get: l
          });
        }, i.r = function(s) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(s, "__esModule", {
            value: true
          });
        }, i.t = function(s, r) {
          if (1 & r && (s = i(s)), 8 & r || 4 & r && typeof s == "object" && s && s.__esModule) return s;
          var l = /* @__PURE__ */ Object.create(null);
          if (i.r(l), Object.defineProperty(l, "default", {
            enumerable: true,
            value: s
          }), 2 & r && typeof s != "string") for (var d in s) i.d(l, d, (function(h) {
            return s[h];
          }).bind(null, d));
          return l;
        }, i.n = function(s) {
          var r = s && s.__esModule ? function() {
            return s.default;
          } : function() {
            return s;
          };
          return i.d(r, "a", r), r;
        }, i.o = function(s, r) {
          return Object.prototype.hasOwnProperty.call(s, r);
        }, i.p = "/", i(i.s = 0);
      }([
        function(t, o, i) {
          i(1), t.exports = function() {
            var s = i(6), r = "cdx-notify--bounce-in", l = null;
            return {
              show: function(d) {
                if (d.message) {
                  (function() {
                    if (l) return true;
                    l = s.getWrapper(), document.body.appendChild(l);
                  })();
                  var h = null, g = d.time || 8e3;
                  switch (d.type) {
                    case "confirm":
                      h = s.confirm(d);
                      break;
                    case "prompt":
                      h = s.prompt(d);
                      break;
                    default:
                      h = s.alert(d), window.setTimeout(function() {
                        h.remove();
                      }, g);
                  }
                  l.appendChild(h), h.classList.add(r);
                }
              }
            };
          }();
        },
        function(t, o, i) {
          var s = i(2);
          typeof s == "string" && (s = [
            [
              t.i,
              s,
              ""
            ]
          ]);
          var r = {
            hmr: true,
            transform: void 0,
            insertInto: void 0
          };
          i(4)(s, r), s.locals && (t.exports = s.locals);
        },
        function(t, o, i) {
          (t.exports = i(3)(false)).push([
            t.i,
            `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`,
            ""
          ]);
        },
        function(t, o) {
          t.exports = function(i) {
            var s = [];
            return s.toString = function() {
              return this.map(function(r) {
                var l = function(d, h) {
                  var g = d[1] || "", v = d[3];
                  if (!v) return g;
                  if (h && typeof btoa == "function") {
                    var b = (y = v, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(y)))) + " */"), w = v.sources.map(function(T) {
                      return "/*# sourceURL=" + v.sourceRoot + T + " */";
                    });
                    return [
                      g
                    ].concat(w).concat([
                      b
                    ]).join(`
`);
                  }
                  var y;
                  return [
                    g
                  ].join(`
`);
                }(r, i);
                return r[2] ? "@media " + r[2] + "{" + l + "}" : l;
              }).join("");
            }, s.i = function(r, l) {
              typeof r == "string" && (r = [
                [
                  null,
                  r,
                  ""
                ]
              ]);
              for (var d = {}, h = 0; h < this.length; h++) {
                var g = this[h][0];
                typeof g == "number" && (d[g] = true);
              }
              for (h = 0; h < r.length; h++) {
                var v = r[h];
                typeof v[0] == "number" && d[v[0]] || (l && !v[2] ? v[2] = l : l && (v[2] = "(" + v[2] + ") and (" + l + ")"), s.push(v));
              }
            }, s;
          };
        },
        function(t, o, i) {
          var s, r, l = {}, d = (s = function() {
            return window && document && document.all && !window.atob;
          }, function() {
            return r === void 0 && (r = s.apply(this, arguments)), r;
          }), h = /* @__PURE__ */ function(O) {
            var S = {};
            return function(N) {
              if (typeof N == "function") return N();
              if (S[N] === void 0) {
                var D = (function(Y) {
                  return document.querySelector(Y);
                }).call(this, N);
                if (window.HTMLIFrameElement && D instanceof window.HTMLIFrameElement) try {
                  D = D.contentDocument.head;
                } catch {
                  D = null;
                }
                S[N] = D;
              }
              return S[N];
            };
          }(), g = null, v = 0, b = [], w = i(5);
          function y(O, S) {
            for (var N = 0; N < O.length; N++) {
              var D = O[N], Y = l[D.id];
              if (Y) {
                Y.refs++;
                for (var $ = 0; $ < Y.parts.length; $++) Y.parts[$](D.parts[$]);
                for (; $ < D.parts.length; $++) Y.parts.push(te(D.parts[$], S));
              } else {
                var ie = [];
                for ($ = 0; $ < D.parts.length; $++) ie.push(te(D.parts[$], S));
                l[D.id] = {
                  id: D.id,
                  refs: 1,
                  parts: ie
                };
              }
            }
          }
          function T(O, S) {
            for (var N = [], D = {}, Y = 0; Y < O.length; Y++) {
              var $ = O[Y], ie = S.base ? $[0] + S.base : $[0], H = {
                css: $[1],
                media: $[2],
                sourceMap: $[3]
              };
              D[ie] ? D[ie].parts.push(H) : N.push(D[ie] = {
                id: ie,
                parts: [
                  H
                ]
              });
            }
            return N;
          }
          function W(O, S) {
            var N = h(O.insertInto);
            if (!N) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var D = b[b.length - 1];
            if (O.insertAt === "top") D ? D.nextSibling ? N.insertBefore(S, D.nextSibling) : N.appendChild(S) : N.insertBefore(S, N.firstChild), b.push(S);
            else if (O.insertAt === "bottom") N.appendChild(S);
            else {
              if (typeof O.insertAt != "object" || !O.insertAt.before) throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
              var Y = h(O.insertInto + " " + O.insertAt.before);
              N.insertBefore(S, Y);
            }
          }
          function U(O) {
            if (O.parentNode === null) return false;
            O.parentNode.removeChild(O);
            var S = b.indexOf(O);
            S >= 0 && b.splice(S, 1);
          }
          function q(O) {
            var S = document.createElement("style");
            return O.attrs.type === void 0 && (O.attrs.type = "text/css"), ae(S, O.attrs), W(O, S), S;
          }
          function ae(O, S) {
            Object.keys(S).forEach(function(N) {
              O.setAttribute(N, S[N]);
            });
          }
          function te(O, S) {
            var N, D, Y, $;
            if (S.transform && O.css) {
              if (!($ = S.transform(O.css))) return function() {
              };
              O.css = $;
            }
            if (S.singleton) {
              var ie = v++;
              N = g || (g = q(S)), D = _e3.bind(null, N, ie, false), Y = _e3.bind(null, N, ie, true);
            } else O.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (N = function(H) {
              var he = document.createElement("link");
              return H.attrs.type === void 0 && (H.attrs.type = "text/css"), H.attrs.rel = "stylesheet", ae(he, H.attrs), W(H, he), he;
            }(S), D = (function(H, he, xe) {
              var Be = xe.css, it = xe.sourceMap, Xt = he.convertToAbsoluteUrls === void 0 && it;
              (he.convertToAbsoluteUrls || Xt) && (Be = w(Be)), it && (Be += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(it)))) + " */");
              var Kt = new Blob([
                Be
              ], {
                type: "text/css"
              }), u = H.href;
              H.href = URL.createObjectURL(Kt), u && URL.revokeObjectURL(u);
            }).bind(null, N, S), Y = function() {
              U(N), N.href && URL.revokeObjectURL(N.href);
            }) : (N = q(S), D = (function(H, he) {
              var xe = he.css, Be = he.media;
              if (Be && H.setAttribute("media", Be), H.styleSheet) H.styleSheet.cssText = xe;
              else {
                for (; H.firstChild; ) H.removeChild(H.firstChild);
                H.appendChild(document.createTextNode(xe));
              }
            }).bind(null, N), Y = function() {
              U(N);
            });
            return D(O), function(H) {
              if (H) {
                if (H.css === O.css && H.media === O.media && H.sourceMap === O.sourceMap) return;
                D(O = H);
              } else Y();
            };
          }
          t.exports = function(O, S) {
            if (typeof DEBUG < "u" && DEBUG && typeof document != "object") throw new Error("The style-loader cannot be used in a non-browser environment");
            (S = S || {}).attrs = typeof S.attrs == "object" ? S.attrs : {}, S.singleton || typeof S.singleton == "boolean" || (S.singleton = d()), S.insertInto || (S.insertInto = "head"), S.insertAt || (S.insertAt = "bottom");
            var N = T(O, S);
            return y(N, S), function(D) {
              for (var Y = [], $ = 0; $ < N.length; $++) {
                var ie = N[$];
                (H = l[ie.id]).refs--, Y.push(H);
              }
              for (D && y(T(D, S), S), $ = 0; $ < Y.length; $++) {
                var H;
                if ((H = Y[$]).refs === 0) {
                  for (var he = 0; he < H.parts.length; he++) H.parts[he]();
                  delete l[H.id];
                }
              }
            };
          };
          var J, re = (J = [], function(O, S) {
            return J[O] = S, J.filter(Boolean).join(`
`);
          });
          function _e3(O, S, N, D) {
            var Y = N ? "" : D.css;
            if (O.styleSheet) O.styleSheet.cssText = re(S, Y);
            else {
              var $ = document.createTextNode(Y), ie = O.childNodes;
              ie[S] && O.removeChild(ie[S]), ie.length ? O.insertBefore($, ie[S]) : O.appendChild($);
            }
          }
        },
        function(t, o) {
          t.exports = function(i) {
            var s = typeof window < "u" && window.location;
            if (!s) throw new Error("fixUrls requires window.location");
            if (!i || typeof i != "string") return i;
            var r = s.protocol + "//" + s.host, l = r + s.pathname.replace(/\/[^\/]*$/, "/");
            return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(d, h) {
              var g, v = h.trim().replace(/^"(.*)"$/, function(b, w) {
                return w;
              }).replace(/^'(.*)'$/, function(b, w) {
                return w;
              });
              return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(v) ? d : (g = v.indexOf("//") === 0 ? v : v.indexOf("/") === 0 ? r + v : l + v.replace(/^\.\//, ""), "url(" + JSON.stringify(g) + ")");
            });
          };
        },
        function(t, o, i) {
          var s, r, l, d, h, g, v, b, w;
          t.exports = (s = "cdx-notifies", r = "cdx-notify", l = "cdx-notify__cross", d = "cdx-notify__button--confirm", h = "cdx-notify__button--cancel", g = "cdx-notify__input", v = "cdx-notify__button", b = "cdx-notify__btns-wrapper", {
            alert: w = function(y) {
              var T = document.createElement("DIV"), W = document.createElement("DIV"), U = y.message, q = y.style;
              return T.classList.add(r), q && T.classList.add(r + "--" + q), T.innerHTML = U, W.classList.add(l), W.addEventListener("click", T.remove.bind(T)), T.appendChild(W), T;
            },
            confirm: function(y) {
              var T = w(y), W = document.createElement("div"), U = document.createElement("button"), q = document.createElement("button"), ae = T.querySelector("." + l), te = y.cancelHandler, J = y.okHandler;
              return W.classList.add(b), U.innerHTML = y.okText || "Confirm", q.innerHTML = y.cancelText || "Cancel", U.classList.add(v), q.classList.add(v), U.classList.add(d), q.classList.add(h), te && typeof te == "function" && (q.addEventListener("click", te), ae.addEventListener("click", te)), J && typeof J == "function" && U.addEventListener("click", J), U.addEventListener("click", T.remove.bind(T)), q.addEventListener("click", T.remove.bind(T)), W.appendChild(U), W.appendChild(q), T.appendChild(W), T;
            },
            prompt: function(y) {
              var T = w(y), W = document.createElement("div"), U = document.createElement("button"), q = document.createElement("input"), ae = T.querySelector("." + l), te = y.cancelHandler, J = y.okHandler;
              return W.classList.add(b), U.innerHTML = y.okText || "Ok", U.classList.add(v), U.classList.add(d), q.classList.add(g), y.placeholder && q.setAttribute("placeholder", y.placeholder), y.default && (q.value = y.default), y.inputType && (q.type = y.inputType), te && typeof te == "function" && ae.addEventListener("click", te), J && typeof J == "function" && U.addEventListener("click", function() {
                J(q.value);
              }), U.addEventListener("click", T.remove.bind(T)), W.appendChild(q), W.appendChild(U), T.appendChild(W), T;
            },
            getWrapper: function() {
              var y = document.createElement("DIV");
              return y.classList.add(s), y;
            }
          });
        }
      ]);
    });
  })(li);
  var $r = li.exports;
  const Ur = Ht($r);
  class zr {
    show(e) {
      Ur.show(e);
    }
  }
  class qr extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.notifier = new zr();
    }
    get methods() {
      return {
        show: (e) => this.show(e)
      };
    }
    show(e) {
      return this.notifier.show(e);
    }
  }
  class Wr extends j {
    get methods() {
      const e = () => this.isEnabled;
      return {
        toggle: (t) => this.toggle(t),
        get isEnabled() {
          return e();
        }
      };
    }
    toggle(e) {
      return this.Editor.ReadOnly.toggle(e);
    }
    get isEnabled() {
      return this.Editor.ReadOnly.isEnabled;
    }
  }
  var ci = {
    exports: {}
  };
  (function(n, e) {
    (function(t, o) {
      n.exports = o();
    })(pt, function() {
      function t(v) {
        var b = v.tags, w = Object.keys(b), y = w.map(function(T) {
          return typeof b[T];
        }).every(function(T) {
          return T === "object" || T === "boolean" || T === "function";
        });
        if (!y) throw new Error("The configuration was invalid");
        this.config = v;
      }
      var o = [
        "P",
        "LI",
        "TD",
        "TH",
        "DIV",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "PRE"
      ];
      function i(v) {
        return o.indexOf(v.nodeName) !== -1;
      }
      var s = [
        "A",
        "B",
        "STRONG",
        "I",
        "EM",
        "SUB",
        "SUP",
        "U",
        "STRIKE"
      ];
      function r(v) {
        return s.indexOf(v.nodeName) !== -1;
      }
      t.prototype.clean = function(v) {
        const b = document.implementation.createHTMLDocument(), w = b.createElement("div");
        return w.innerHTML = v, this._sanitize(b, w), w.innerHTML;
      }, t.prototype._sanitize = function(v, b) {
        var w = l(v, b), y = w.firstChild();
        if (y) do {
          if (y.nodeType === Node.TEXT_NODE) if (y.data.trim() === "" && (y.previousElementSibling && i(y.previousElementSibling) || y.nextElementSibling && i(y.nextElementSibling))) {
            b.removeChild(y), this._sanitize(v, b);
            break;
          } else continue;
          if (y.nodeType === Node.COMMENT_NODE) {
            b.removeChild(y), this._sanitize(v, b);
            break;
          }
          var T = r(y), W;
          T && (W = Array.prototype.some.call(y.childNodes, i));
          var U = !!b.parentNode, q = i(b) && i(y) && U, ae = y.nodeName.toLowerCase(), te = d(this.config, ae, y), J = T && W;
          if (J || h(y, te) || !this.config.keepNestedBlockElements && q) {
            if (!(y.nodeName === "SCRIPT" || y.nodeName === "STYLE")) for (; y.childNodes.length > 0; ) b.insertBefore(y.childNodes[0], y);
            b.removeChild(y), this._sanitize(v, b);
            break;
          }
          for (var re = 0; re < y.attributes.length; re += 1) {
            var _e3 = y.attributes[re];
            g(_e3, te, y) && (y.removeAttribute(_e3.name), re = re - 1);
          }
          this._sanitize(v, y);
        } while (y = w.nextSibling());
      };
      function l(v, b) {
        return v.createTreeWalker(b, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, null, false);
      }
      function d(v, b, w) {
        return typeof v.tags[b] == "function" ? v.tags[b](w) : v.tags[b];
      }
      function h(v, b) {
        return typeof b > "u" ? true : typeof b == "boolean" ? !b : false;
      }
      function g(v, b, w) {
        var y = v.name.toLowerCase();
        return b === true ? false : typeof b[y] == "function" ? !b[y](v.value, w) : typeof b[y] > "u" || b[y] === false ? true : typeof b[y] == "string" ? b[y] !== v.value : false;
      }
      return t;
    });
  })(ci);
  var Yr = ci.exports;
  const Xr = Ht(Yr);
  function mo(n, e) {
    return n.map((t) => {
      const o = Q(e) ? e(t.tool) : e;
      return Ee(o) || (t.data = vo(t.data, o)), t;
    });
  }
  function Te(n, e = {}) {
    const t = {
      tags: e
    };
    return new Xr(t).clean(n);
  }
  function vo(n, e) {
    return Array.isArray(n) ? Kr(n, e) : de(n) ? Gr(n, e) : Ie(n) ? Zr(n, e) : n;
  }
  function Kr(n, e) {
    return n.map((t) => vo(t, e));
  }
  function Gr(n, e) {
    const t = {};
    for (const o in n) {
      if (!Object.prototype.hasOwnProperty.call(n, o)) continue;
      const i = n[o], s = Qr(e[o]) ? e[o] : e;
      t[o] = vo(i, s);
    }
    return t;
  }
  function Zr(n, e) {
    return de(e) ? Te(n, e) : e === false ? Te(n, {}) : n;
  }
  function Qr(n) {
    return de(n) || vr(n) || Q(n);
  }
  class Jr extends j {
    get methods() {
      return {
        clean: (e, t) => this.clean(e, t)
      };
    }
    clean(e, t) {
      return Te(e, t);
    }
  }
  class ea extends j {
    get methods() {
      return {
        save: () => this.save()
      };
    }
    save() {
      const e = "Editor's content can not be saved in read-only mode";
      return this.Editor.ReadOnly.isEnabled ? (we(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
    }
  }
  class ta extends j {
    constructor() {
      super(...arguments), this.selectionUtils = new M();
    }
    get methods() {
      return {
        findParentTag: (e, t) => this.findParentTag(e, t),
        expandToTag: (e) => this.expandToTag(e),
        save: () => this.selectionUtils.save(),
        restore: () => this.selectionUtils.restore(),
        setFakeBackground: () => this.selectionUtils.setFakeBackground(),
        removeFakeBackground: () => this.selectionUtils.removeFakeBackground()
      };
    }
    findParentTag(e, t) {
      return this.selectionUtils.findParentTag(e, t);
    }
    expandToTag(e) {
      this.selectionUtils.expandToTag(e);
    }
  }
  class oa extends j {
    get methods() {
      return {
        getBlockTools: () => Array.from(this.Editor.Tools.blockTools.values())
      };
    }
  }
  class na extends j {
    get classes() {
      return {
        block: "cdx-block",
        inlineToolButton: "ce-inline-tool",
        inlineToolButtonActive: "ce-inline-tool--active",
        input: "cdx-input",
        loader: "cdx-loader",
        button: "cdx-button",
        settingsButton: "cdx-settings-button",
        settingsButtonActive: "cdx-settings-button--active"
      };
    }
  }
  class ia extends j {
    get methods() {
      return {
        close: () => this.close(),
        open: () => this.open(),
        toggleBlockSettings: (e) => this.toggleBlockSettings(e),
        toggleToolbox: (e) => this.toggleToolbox(e)
      };
    }
    open() {
      this.Editor.Toolbar.moveAndOpen();
    }
    close() {
      this.Editor.Toolbar.close();
    }
    toggleBlockSettings(e) {
      if (this.Editor.BlockManager.currentBlockIndex === -1) {
        we("Could't toggle the Toolbar because there is no block selected ", "warn");
        return;
      }
      e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
    }
    toggleToolbox(e) {
      if (this.Editor.BlockManager.currentBlockIndex === -1) {
        we("Could't toggle the Toolbox because there is no block selected ", "warn");
        return;
      }
      e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
    }
  }
  var di = {
    exports: {}
  };
  (function(n, e) {
    (function(t, o) {
      n.exports = o();
    })(window, function() {
      return function(t) {
        var o = {};
        function i(s) {
          if (o[s]) return o[s].exports;
          var r = o[s] = {
            i: s,
            l: false,
            exports: {}
          };
          return t[s].call(r.exports, r, r.exports, i), r.l = true, r.exports;
        }
        return i.m = t, i.c = o, i.d = function(s, r, l) {
          i.o(s, r) || Object.defineProperty(s, r, {
            enumerable: true,
            get: l
          });
        }, i.r = function(s) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(s, "__esModule", {
            value: true
          });
        }, i.t = function(s, r) {
          if (1 & r && (s = i(s)), 8 & r || 4 & r && typeof s == "object" && s && s.__esModule) return s;
          var l = /* @__PURE__ */ Object.create(null);
          if (i.r(l), Object.defineProperty(l, "default", {
            enumerable: true,
            value: s
          }), 2 & r && typeof s != "string") for (var d in s) i.d(l, d, (function(h) {
            return s[h];
          }).bind(null, d));
          return l;
        }, i.n = function(s) {
          var r = s && s.__esModule ? function() {
            return s.default;
          } : function() {
            return s;
          };
          return i.d(r, "a", r), r;
        }, i.o = function(s, r) {
          return Object.prototype.hasOwnProperty.call(s, r);
        }, i.p = "", i(i.s = 0);
      }([
        function(t, o, i) {
          t.exports = i(1);
        },
        function(t, o, i) {
          i.r(o), i.d(o, "default", function() {
            return s;
          });
          class s {
            constructor() {
              this.nodes = {
                wrapper: null,
                content: null
              }, this.showed = false, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = () => {
                this.showed && this.hide(true);
              }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, {
                passive: true
              });
            }
            get CSS() {
              return {
                tooltip: "ct",
                tooltipContent: "ct__content",
                tooltipShown: "ct--shown",
                placement: {
                  left: "ct--left",
                  bottom: "ct--bottom",
                  right: "ct--right",
                  top: "ct--top"
                }
              };
            }
            show(l, d, h) {
              this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
              const g = Object.assign({
                placement: "bottom",
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                delay: 70,
                hidingDelay: 0
              }, h);
              if (g.hidingDelay && (this.hidingDelay = g.hidingDelay), this.nodes.content.innerHTML = "", typeof d == "string") this.nodes.content.appendChild(document.createTextNode(d));
              else {
                if (!(d instanceof Node)) throw Error("[CodeX Tooltip] Wrong type of \xABcontent\xBB passed. It should be an instance of Node or String. But " + typeof d + " given.");
                this.nodes.content.appendChild(d);
              }
              switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), g.placement) {
                case "top":
                  this.placeTop(l, g);
                  break;
                case "left":
                  this.placeLeft(l, g);
                  break;
                case "right":
                  this.placeRight(l, g);
                  break;
                case "bottom":
                default:
                  this.placeBottom(l, g);
              }
              g && g.delay ? this.showingTimeout = setTimeout(() => {
                this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true;
              }, g.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true);
            }
            hide(l = false) {
              if (this.hidingDelay && !l) return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
                this.hide(true);
              }, this.hidingDelay));
              this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = false, this.showingTimeout && clearTimeout(this.showingTimeout);
            }
            onHover(l, d, h) {
              l.addEventListener("mouseenter", () => {
                this.show(l, d, h);
              }), l.addEventListener("mouseleave", () => {
                this.hide();
              });
            }
            destroy() {
              this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
            }
            prepare() {
              this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
            }
            loadStyles() {
              const l = "codex-tooltips-style";
              if (document.getElementById(l)) return;
              const d = i(2), h = this.make("style", null, {
                textContent: d.toString(),
                id: l
              });
              this.prepend(document.head, h);
            }
            placeBottom(l, d) {
              const h = l.getBoundingClientRect(), g = h.left + l.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, v = h.bottom + window.pageYOffset + this.offsetTop + d.marginTop;
              this.applyPlacement("bottom", g, v);
            }
            placeTop(l, d) {
              const h = l.getBoundingClientRect(), g = h.left + l.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, v = h.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
              this.applyPlacement("top", g, v);
            }
            placeLeft(l, d) {
              const h = l.getBoundingClientRect(), g = h.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - d.marginLeft, v = h.top + window.pageYOffset + l.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("left", g, v);
            }
            placeRight(l, d) {
              const h = l.getBoundingClientRect(), g = h.right + this.offsetRight + d.marginRight, v = h.top + window.pageYOffset + l.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("right", g, v);
            }
            applyPlacement(l, d, h) {
              this.nodes.wrapper.classList.add(this.CSS.placement[l]), this.nodes.wrapper.style.left = d + "px", this.nodes.wrapper.style.top = h + "px";
            }
            make(l, d = null, h = {}) {
              const g = document.createElement(l);
              Array.isArray(d) ? g.classList.add(...d) : d && g.classList.add(d);
              for (const v in h) h.hasOwnProperty(v) && (g[v] = h[v]);
              return g;
            }
            append(l, d) {
              Array.isArray(d) ? d.forEach((h) => l.appendChild(h)) : l.appendChild(d);
            }
            prepend(l, d) {
              Array.isArray(d) ? (d = d.reverse()).forEach((h) => l.prepend(h)) : l.prepend(d);
            }
          }
        },
        function(t, o) {
          t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
        }
      ]).default;
    });
  })(di);
  var sa = di.exports;
  const ra = Ht(sa);
  let Ce = null;
  function bo() {
    Ce || (Ce = new ra());
  }
  function aa(n, e, t) {
    bo(), Ce == null ? void 0 : Ce.show(n, e, t);
  }
  function It(n = false) {
    bo(), Ce == null ? void 0 : Ce.hide(n);
  }
  function Lt(n, e, t) {
    bo(), Ce == null ? void 0 : Ce.onHover(n, e, t);
  }
  function la() {
    Ce == null ? void 0 : Ce.destroy(), Ce = null;
  }
  class ca extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      });
    }
    get methods() {
      return {
        show: (e, t, o) => this.show(e, t, o),
        hide: () => this.hide(),
        onHover: (e, t, o) => this.onHover(e, t, o)
      };
    }
    show(e, t, o) {
      aa(e, t, o);
    }
    hide() {
      It();
    }
    onHover(e, t, o) {
      Lt(e, t, o);
    }
  }
  class da extends j {
    get methods() {
      return {
        nodes: this.editorNodes
      };
    }
    get editorNodes() {
      return {
        wrapper: this.Editor.UI.nodes.wrapper,
        redactor: this.Editor.UI.nodes.redactor
      };
    }
  }
  function ui(n, e) {
    const t = {};
    return Object.entries(n).forEach(([o, i]) => {
      if (de(i)) {
        const s = e ? `${e}.${o}` : o;
        Object.values(i).every((r) => Ie(r)) ? t[o] = s : t[o] = ui(i, s);
        return;
      }
      t[o] = i;
    }), t;
  }
  const ke = ui(ei);
  function ua(n, e) {
    const t = {};
    return Object.keys(n).forEach((o) => {
      const i = e[o];
      i !== void 0 ? t[i] = n[o] : t[o] = n[o];
    }), t;
  }
  const hi = class ct {
    constructor(e, t) {
      this.cursor = -1, this.items = [], this.items = e || [], this.focusedCssClass = t;
    }
    get currentItem() {
      return this.cursor === -1 ? null : this.items[this.cursor];
    }
    setCursor(e) {
      e < this.items.length && e >= -1 && (this.dropCursor(), this.cursor = e, this.items[this.cursor].classList.add(this.focusedCssClass));
    }
    setItems(e) {
      this.items = e;
    }
    next() {
      this.cursor = this.leafNodesAndReturnIndex(ct.directions.RIGHT);
    }
    previous() {
      this.cursor = this.leafNodesAndReturnIndex(ct.directions.LEFT);
    }
    dropCursor() {
      this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
    }
    leafNodesAndReturnIndex(e) {
      if (this.items.length === 0) return this.cursor;
      let t = this.cursor;
      return t === -1 ? t = e === ct.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), e === ct.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, k.canSetCaret(this.items[t]) && Mt(() => M.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
    }
  };
  hi.directions = {
    RIGHT: "right",
    LEFT: "left"
  };
  let rt = hi;
  class ze {
    constructor(e) {
      this.iterator = null, this.activated = false, this.flipCallbacks = [], this.onKeyDown = (t) => {
        if (this.isEventReadyForHandling(t)) switch (ze.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case P.TAB:
            this.handleTabPress(t);
            break;
          case P.LEFT:
          case P.UP:
            this.flipLeft();
            break;
          case P.RIGHT:
          case P.DOWN:
            this.flipRight();
            break;
          case P.ENTER:
            this.handleEnterPress(t);
            break;
        }
      }, this.iterator = new rt(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || ze.usedKeys;
    }
    get isActivated() {
      return this.activated;
    }
    static get usedKeys() {
      return [
        P.TAB,
        P.LEFT,
        P.RIGHT,
        P.ENTER,
        P.UP,
        P.DOWN
      ];
    }
    activate(e, t) {
      this.activated = true, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), document.addEventListener("keydown", this.onKeyDown, true);
    }
    deactivate() {
      this.activated = false, this.dropCursor(), document.removeEventListener("keydown", this.onKeyDown);
    }
    focusFirst() {
      this.dropCursor(), this.flipRight();
    }
    flipLeft() {
      this.iterator.previous(), this.flipCallback();
    }
    flipRight() {
      this.iterator.next(), this.flipCallback();
    }
    hasFocus() {
      return !!this.iterator.currentItem;
    }
    onFlip(e) {
      this.flipCallbacks.push(e);
    }
    removeOnFlip(e) {
      this.flipCallbacks = this.flipCallbacks.filter((t) => t !== e);
    }
    dropCursor() {
      this.iterator.dropCursor();
    }
    isEventReadyForHandling(e) {
      return this.activated && this.allowedKeys.includes(e.keyCode);
    }
    handleTabPress(e) {
      switch (e.shiftKey ? rt.directions.LEFT : rt.directions.RIGHT) {
        case rt.directions.RIGHT:
          this.flipRight();
          break;
        case rt.directions.LEFT:
          this.flipLeft();
          break;
      }
    }
    handleEnterPress(e) {
      this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), Q(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
    }
    flipCallback() {
      this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
    }
  }
  const ha = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', pa = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', fa = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.5 17.5L9.64142 12.6414C9.56331 12.5633 9.56331 12.4367 9.64142 12.3586L14.5 7.5"/></svg>', ga = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.58284 17.5L14.4414 12.6414C14.5195 12.5633 14.5195 12.4367 14.4414 12.3586L9.58284 7.5"/></svg>', ma = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', va = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', ba = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', ya = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', _n = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', ka = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', wa = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', pi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11.5 17.5L5 11M5 11V15.5M5 11H9.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12.5 6.5L19 13M19 13V8.5M19 13H14.5"/></svg>', Ea = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', xa = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', Ca = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>', Ta = "__", Sa = "--";
  function Re(n) {
    return (e, t) => [
      [
        n,
        e
      ].filter((o) => !!o).join(Ta),
      t
    ].filter((o) => !!o).join(Sa);
  }
  const at = Re("ce-hint"), lt = {
    root: at(),
    alignedStart: at(null, "align-left"),
    alignedCenter: at(null, "align-center"),
    title: at("title"),
    description: at("description")
  };
  class _a {
    constructor(e) {
      this.nodes = {
        root: k.make("div", [
          lt.root,
          e.alignment === "center" ? lt.alignedCenter : lt.alignedStart
        ]),
        title: k.make("div", lt.title, {
          textContent: e.title
        })
      }, this.nodes.root.appendChild(this.nodes.title), e.description !== void 0 && (this.nodes.description = k.make("div", lt.description, {
        textContent: e.description
      }), this.nodes.root.appendChild(this.nodes.description));
    }
    getElement() {
      return this.nodes.root;
    }
  }
  class yo {
    constructor(e) {
      this.params = e;
    }
    get name() {
      if (this.params !== void 0 && "name" in this.params) return this.params.name;
    }
    destroy() {
      It();
    }
    onChildrenOpen() {
      var e;
      this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onOpen) == "function" && this.params.children.onOpen();
    }
    onChildrenClose() {
      var e;
      this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onClose) == "function" && this.params.children.onClose();
    }
    handleClick() {
      var e, t;
      this.params !== void 0 && "onActivate" in this.params && ((t = (e = this.params).onActivate) == null || t.call(e, this.params));
    }
    addHint(e, t) {
      const o = new _a(t);
      Lt(e, o.getElement(), {
        placement: t.position,
        hidingDelay: 100
      });
    }
    get children() {
      var e;
      return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.items) !== void 0 ? this.params.children.items : [];
    }
    get hasChildren() {
      return this.children.length > 0;
    }
    get isChildrenOpen() {
      var e;
      return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.isOpen) === true;
    }
    get isChildrenFlippable() {
      var e;
      return !(this.params === void 0 || !("children" in this.params) || ((e = this.params.children) == null ? void 0 : e.isFlippable) === false);
    }
    get isChildrenSearchable() {
      var e;
      return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.searchable) === true;
    }
    get closeOnActivate() {
      return this.params !== void 0 && "closeOnActivate" in this.params && this.params.closeOnActivate;
    }
    get isActive() {
      return this.params === void 0 || !("isActive" in this.params) ? false : typeof this.params.isActive == "function" ? this.params.isActive() : this.params.isActive === true;
    }
  }
  const ye = Re("ce-popover-item"), ee = {
    container: ye(),
    active: ye(null, "active"),
    disabled: ye(null, "disabled"),
    focused: ye(null, "focused"),
    hidden: ye(null, "hidden"),
    confirmationState: ye(null, "confirmation"),
    noHover: ye(null, "no-hover"),
    noFocus: ye(null, "no-focus"),
    title: ye("title"),
    secondaryTitle: ye("secondary-title"),
    icon: ye("icon"),
    iconTool: ye("icon", "tool"),
    iconChevronRight: ye("icon", "chevron-right"),
    wobbleAnimation: Re("wobble")()
  };
  class Fe extends yo {
    constructor(e, t) {
      super(e), this.params = e, this.nodes = {
        root: null,
        icon: null
      }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
        var o;
        (o = this.nodes.root) == null || o.classList.remove(ee.noFocus);
      }, this.removeSpecialHoverBehavior = () => {
        var o;
        (o = this.nodes.root) == null || o.classList.remove(ee.noHover);
      }, this.onErrorAnimationEnd = () => {
        var o, i;
        (o = this.nodes.icon) == null || o.classList.remove(ee.wobbleAnimation), (i = this.nodes.icon) == null || i.removeEventListener("animationend", this.onErrorAnimationEnd);
      }, this.nodes.root = this.make(e, t);
    }
    get isDisabled() {
      return this.params.isDisabled === true;
    }
    get toggle() {
      return this.params.toggle;
    }
    get title() {
      return this.params.title;
    }
    get isConfirmationStateEnabled() {
      return this.confirmationState !== null;
    }
    get isFocused() {
      return this.nodes.root === null ? false : this.nodes.root.classList.contains(ee.focused);
    }
    getElement() {
      return this.nodes.root;
    }
    handleClick() {
      if (this.isConfirmationStateEnabled && this.confirmationState !== null) {
        this.activateOrEnableConfirmationMode(this.confirmationState);
        return;
      }
      this.activateOrEnableConfirmationMode(this.params);
    }
    toggleActive(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(ee.active, e);
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(ee.hidden, e);
    }
    reset() {
      this.isConfirmationStateEnabled && this.disableConfirmationMode();
    }
    onFocus() {
      this.disableSpecialHoverAndFocusBehavior();
    }
    make(e, t) {
      var o, i;
      const s = (t == null ? void 0 : t.wrapperTag) || "div", r = k.make(s, ee.container, {
        type: s === "button" ? "button" : void 0
      });
      return e.name && (r.dataset.itemName = e.name), this.nodes.icon = k.make("div", [
        ee.icon,
        ee.iconTool
      ], {
        innerHTML: e.icon || ba
      }), r.appendChild(this.nodes.icon), e.title !== void 0 && r.appendChild(k.make("div", ee.title, {
        innerHTML: e.title || ""
      })), e.secondaryLabel && r.appendChild(k.make("div", ee.secondaryTitle, {
        textContent: e.secondaryLabel
      })), this.hasChildren && r.appendChild(k.make("div", [
        ee.icon,
        ee.iconChevronRight
      ], {
        innerHTML: ga
      })), this.isActive && r.classList.add(ee.active), e.isDisabled && r.classList.add(ee.disabled), e.hint !== void 0 && ((o = t == null ? void 0 : t.hint) == null ? void 0 : o.enabled) !== false && this.addHint(r, {
        ...e.hint,
        position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
      }), r;
    }
    enableConfirmationMode(e) {
      if (this.nodes.root === null) return;
      const t = {
        ...this.params,
        ...e,
        confirmation: "confirmation" in e ? e.confirmation : void 0
      }, o = this.make(t);
      this.nodes.root.innerHTML = o.innerHTML, this.nodes.root.classList.add(ee.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
    }
    disableConfirmationMode() {
      if (this.nodes.root === null) return;
      const e = this.make(this.params);
      this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(ee.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
    }
    enableSpecialHoverAndFocusBehavior() {
      var e, t, o;
      (e = this.nodes.root) == null || e.classList.add(ee.noHover), (t = this.nodes.root) == null || t.classList.add(ee.noFocus), (o = this.nodes.root) == null || o.addEventListener("mouseleave", this.removeSpecialHoverBehavior, {
        once: true
      });
    }
    disableSpecialHoverAndFocusBehavior() {
      var e;
      this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), (e = this.nodes.root) == null || e.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
    }
    activateOrEnableConfirmationMode(e) {
      var t;
      if (!("confirmation" in e) || e.confirmation === void 0) try {
        (t = e.onActivate) == null || t.call(e, e), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
      else this.enableConfirmationMode(e.confirmation);
    }
    animateError() {
      var e, t, o;
      (e = this.nodes.icon) != null && e.classList.contains(ee.wobbleAnimation) || ((t = this.nodes.icon) == null || t.classList.add(ee.wobbleAnimation), (o = this.nodes.icon) == null || o.addEventListener("animationend", this.onErrorAnimationEnd));
    }
  }
  const Qt = Re("ce-popover-item-separator"), Jt = {
    container: Qt(),
    line: Qt("line"),
    hidden: Qt(null, "hidden")
  };
  class fi extends yo {
    constructor() {
      super(), this.nodes = {
        root: k.make("div", Jt.container),
        line: k.make("div", Jt.line)
      }, this.nodes.root.appendChild(this.nodes.line);
    }
    getElement() {
      return this.nodes.root;
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(Jt.hidden, e);
    }
  }
  var Se = ((n) => (n.Closed = "closed", n.ClosedOnActivate = "closed-on-activate", n))(Se || {});
  const fe = Re("ce-popover"), oe = {
    popover: fe(),
    popoverContainer: fe("container"),
    popoverOpenTop: fe(null, "open-top"),
    popoverOpenLeft: fe(null, "open-left"),
    popoverOpened: fe(null, "opened"),
    search: fe("search"),
    nothingFoundMessage: fe("nothing-found-message"),
    nothingFoundMessageDisplayed: fe("nothing-found-message", "displayed"),
    items: fe("items"),
    overlay: fe("overlay"),
    overlayHidden: fe("overlay", "hidden"),
    popoverNested: fe(null, "nested"),
    getPopoverNestedClass: (n) => fe(null, `nested-level-${n.toString()}`),
    popoverInline: fe(null, "inline"),
    popoverHeader: fe("header")
  };
  var Je = ((n) => (n.NestingLevel = "--nesting-level", n.PopoverHeight = "--popover-height", n.InlinePopoverWidth = "--inline-popover-width", n.TriggerItemLeft = "--trigger-item-left", n.TriggerItemTop = "--trigger-item-top", n))(Je || {});
  const Bn = Re("ce-popover-item-html"), Mn = {
    root: Bn(),
    hidden: Bn(null, "hidden")
  };
  class gt extends yo {
    constructor(e, t) {
      var o, i;
      super(e), this.nodes = {
        root: k.make("div", Mn.root)
      }, this.nodes.root.appendChild(e.element), e.name && (this.nodes.root.dataset.itemName = e.name), e.hint !== void 0 && ((o = t == null ? void 0 : t.hint) == null ? void 0 : o.enabled) !== false && this.addHint(this.nodes.root, {
        ...e.hint,
        position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
      });
    }
    getElement() {
      return this.nodes.root;
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(Mn.hidden, e);
    }
    getControls() {
      const e = this.nodes.root.querySelectorAll(`button, ${k.allInputsSelector}`);
      return Array.from(e);
    }
  }
  class gi extends bt {
    constructor(e, t = {}) {
      super(), this.params = e, this.itemsRenderParams = t, this.listeners = new yt(), this.messages = {
        nothingFound: "Nothing found",
        search: "Search"
      }, this.items = this.buildItems(e.items), e.messages && (this.messages = {
        ...this.messages,
        ...e.messages
      }), this.nodes = {}, this.nodes.popoverContainer = k.make("div", [
        oe.popoverContainer
      ]), this.nodes.nothingFoundMessage = k.make("div", [
        oe.nothingFoundMessage
      ], {
        textContent: this.messages.nothingFound
      }), this.nodes.popoverContainer.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = k.make("div", [
        oe.items
      ]), this.items.forEach((o) => {
        const i = o.getElement();
        i !== null && this.nodes.items.appendChild(i);
      }), this.nodes.popoverContainer.appendChild(this.nodes.items), this.listeners.on(this.nodes.popoverContainer, "click", (o) => this.handleClick(o)), this.nodes.popover = k.make("div", [
        oe.popover,
        this.params.class
      ]), this.nodes.popover.appendChild(this.nodes.popoverContainer);
    }
    get itemsDefault() {
      return this.items.filter((e) => e instanceof Fe);
    }
    getElement() {
      return this.nodes.popover;
    }
    show() {
      this.nodes.popover.classList.add(oe.popoverOpened), this.search !== void 0 && this.search.focus();
    }
    hide() {
      this.nodes.popover.classList.remove(oe.popoverOpened), this.nodes.popover.classList.remove(oe.popoverOpenTop), this.itemsDefault.forEach((e) => e.reset()), this.search !== void 0 && this.search.clear(), this.emit(Se.Closed);
    }
    destroy() {
      var e;
      this.items.forEach((t) => t.destroy()), this.nodes.popover.remove(), this.listeners.removeAll(), (e = this.search) == null || e.destroy();
    }
    activateItemByName(e) {
      const t = this.items.find((o) => o.name === e);
      this.handleItemClick(t);
    }
    buildItems(e) {
      return e.map((t) => {
        switch (t.type) {
          case G.Separator:
            return new fi();
          case G.Html:
            return new gt(t, this.itemsRenderParams[G.Html]);
          default:
            return new Fe(t, this.itemsRenderParams[G.Default]);
        }
      });
    }
    getTargetItem(e) {
      return this.items.filter((t) => t instanceof Fe || t instanceof gt).find((t) => {
        const o = t.getElement();
        return o === null ? false : e.composedPath().includes(o);
      });
    }
    handleItemClick(e) {
      if (!("isDisabled" in e && e.isDisabled)) {
        if (e.hasChildren) {
          this.showNestedItems(e), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick();
          return;
        }
        this.itemsDefault.filter((t) => t !== e).forEach((t) => t.reset()), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick(), this.toggleItemActivenessIfNeeded(e), e.closeOnActivate && (this.hide(), this.emit(Se.ClosedOnActivate));
      }
    }
    handleClick(e) {
      const t = this.getTargetItem(e);
      t !== void 0 && this.handleItemClick(t);
    }
    toggleItemActivenessIfNeeded(e) {
      if (e instanceof Fe && (e.toggle === true && e.toggleActive(), typeof e.toggle == "string")) {
        const t = this.itemsDefault.filter((o) => o.toggle === e.toggle);
        if (t.length === 1) {
          e.toggleActive();
          return;
        }
        t.forEach((o) => {
          o.toggleActive(o === e);
        });
      }
    }
  }
  var Nt = ((n) => (n.Search = "search", n))(Nt || {});
  const eo = Re("cdx-search-field"), to = {
    wrapper: eo(),
    icon: eo("icon"),
    input: eo("input")
  };
  class Ba extends bt {
    constructor({ items: e, placeholder: t }) {
      super(), this.listeners = new yt(), this.items = e, this.wrapper = k.make("div", to.wrapper);
      const o = k.make("div", to.icon, {
        innerHTML: Ea
      });
      this.input = k.make("input", to.input, {
        placeholder: t,
        tabIndex: -1
      }), this.wrapper.appendChild(o), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
        this.searchQuery = this.input.value, this.emit(Nt.Search, {
          query: this.searchQuery,
          items: this.foundItems
        });
      });
    }
    getElement() {
      return this.wrapper;
    }
    focus() {
      this.input.focus();
    }
    clear() {
      this.input.value = "", this.searchQuery = "", this.emit(Nt.Search, {
        query: "",
        items: this.foundItems
      });
    }
    destroy() {
      this.listeners.removeAll();
    }
    get foundItems() {
      return this.items.filter((e) => this.checkItem(e));
    }
    checkItem(e) {
      var t, o;
      const i = ((t = e.title) == null ? void 0 : t.toLowerCase()) || "", s = (o = this.searchQuery) == null ? void 0 : o.toLowerCase();
      return s !== void 0 ? i.includes(s) : false;
    }
  }
  var Ma = Object.defineProperty, Oa = Object.getOwnPropertyDescriptor, Aa = (n, e, t, o) => {
    for (var i = Oa(e, t), s = n.length - 1, r; s >= 0; s--) (r = n[s]) && (i = r(e, t, i) || i);
    return i && Ma(e, t, i), i;
  };
  const mi = class vi extends gi {
    constructor(e, t) {
      super(e, t), this.nestingLevel = 0, this.nestedPopoverTriggerItem = null, this.previouslyHoveredItem = null, this.scopeElement = document.body, this.hide = () => {
        var o;
        super.hide(), this.destroyNestedPopoverIfExists(), (o = this.flipper) == null || o.deactivate(), this.previouslyHoveredItem = null;
      }, this.onFlip = () => {
        const o = this.itemsDefault.find((i) => i.isFocused);
        o == null ? void 0 : o.onFocus();
      }, this.onSearch = (o) => {
        var i;
        const s = o.query === "", r = o.items.length === 0;
        this.items.forEach((d) => {
          let h = false;
          d instanceof Fe ? h = !o.items.includes(d) : (d instanceof fi || d instanceof gt) && (h = r || !s), d.toggleHidden(h);
        }), this.toggleNothingFoundMessage(r);
        const l = o.query === "" ? this.flippableElements : o.items.map((d) => d.getElement());
        (i = this.flipper) != null && i.isActivated && (this.flipper.deactivate(), this.flipper.activate(l));
      }, e.nestingLevel !== void 0 && (this.nestingLevel = e.nestingLevel), this.nestingLevel > 0 && this.nodes.popover.classList.add(oe.popoverNested), e.scopeElement !== void 0 && (this.scopeElement = e.scopeElement), this.nodes.popoverContainer !== null && this.listeners.on(this.nodes.popoverContainer, "mouseover", (o) => this.handleHover(o)), e.searchable && this.addSearch(), e.flippable !== false && (this.flipper = new ze({
        items: this.flippableElements,
        focusedItemClass: ee.focused,
        allowedKeys: [
          P.TAB,
          P.UP,
          P.DOWN,
          P.ENTER
        ]
      }), this.flipper.onFlip(this.onFlip));
    }
    hasFocus() {
      return this.flipper === void 0 ? false : this.flipper.hasFocus();
    }
    get scrollTop() {
      return this.nodes.items === null ? 0 : this.nodes.items.scrollTop;
    }
    get offsetTop() {
      return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetTop;
    }
    show() {
      var e;
      this.nodes.popover.style.setProperty(Je.PopoverHeight, this.size.height + "px"), this.shouldOpenBottom || this.nodes.popover.classList.add(oe.popoverOpenTop), this.shouldOpenRight || this.nodes.popover.classList.add(oe.popoverOpenLeft), super.show(), (e = this.flipper) == null || e.activate(this.flippableElements);
    }
    destroy() {
      this.hide(), super.destroy();
    }
    showNestedItems(e) {
      this.nestedPopover !== null && this.nestedPopover !== void 0 || (this.nestedPopoverTriggerItem = e, this.showNestedPopoverForItem(e));
    }
    handleHover(e) {
      const t = this.getTargetItem(e);
      t !== void 0 && this.previouslyHoveredItem !== t && (this.destroyNestedPopoverIfExists(), this.previouslyHoveredItem = t, t.hasChildren && this.showNestedPopoverForItem(t));
    }
    setTriggerItemPosition(e, t) {
      const o = t.getElement(), i = (o ? o.offsetTop : 0) - this.scrollTop, s = this.offsetTop + i;
      e.style.setProperty(Je.TriggerItemTop, s + "px");
    }
    destroyNestedPopoverIfExists() {
      var e, t;
      this.nestedPopover === void 0 || this.nestedPopover === null || (this.nestedPopover.off(Se.ClosedOnActivate, this.hide), this.nestedPopover.hide(), this.nestedPopover.destroy(), this.nestedPopover.getElement().remove(), this.nestedPopover = null, (e = this.flipper) == null || e.activate(this.flippableElements), (t = this.nestedPopoverTriggerItem) == null || t.onChildrenClose());
    }
    showNestedPopoverForItem(e) {
      var t;
      this.nestedPopover = new vi({
        searchable: e.isChildrenSearchable,
        items: e.children,
        nestingLevel: this.nestingLevel + 1,
        flippable: e.isChildrenFlippable,
        messages: this.messages
      }), e.onChildrenOpen(), this.nestedPopover.on(Se.ClosedOnActivate, this.hide);
      const o = this.nestedPopover.getElement();
      return this.nodes.popover.appendChild(o), this.setTriggerItemPosition(o, e), o.style.setProperty(Je.NestingLevel, this.nestedPopover.nestingLevel.toString()), this.nestedPopover.show(), (t = this.flipper) == null || t.deactivate(), this.nestedPopover;
    }
    get shouldOpenBottom() {
      if (this.nodes.popover === void 0 || this.nodes.popover === null) return false;
      const e = this.nodes.popoverContainer.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o = this.size.height, i = e.top + o, s = e.top - o, r = Math.min(window.innerHeight, t.bottom);
      return s < t.top || i <= r;
    }
    get shouldOpenRight() {
      if (this.nodes.popover === void 0 || this.nodes.popover === null) return false;
      const e = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o = this.size.width, i = e.right + o, s = e.left - o, r = Math.min(window.innerWidth, t.right);
      return s < t.left || i <= r;
    }
    get size() {
      var e;
      const t = {
        height: 0,
        width: 0
      };
      if (this.nodes.popover === null) return t;
      const o = this.nodes.popover.cloneNode(true);
      o.style.visibility = "hidden", o.style.position = "absolute", o.style.top = "-1000px", o.classList.add(oe.popoverOpened), (e = o.querySelector("." + oe.popoverNested)) == null || e.remove(), document.body.appendChild(o);
      const i = o.querySelector("." + oe.popoverContainer);
      return t.height = i.offsetHeight, t.width = i.offsetWidth, o.remove(), t;
    }
    get flippableElements() {
      return this.items.map((e) => {
        if (e instanceof Fe) return e.getElement();
        if (e instanceof gt) return e.getControls();
      }).flat().filter((e) => e != null);
    }
    addSearch() {
      this.search = new Ba({
        items: this.itemsDefault,
        placeholder: this.messages.search
      }), this.search.on(Nt.Search, this.onSearch);
      const e = this.search.getElement();
      e.classList.add(oe.search), this.nodes.popoverContainer.insertBefore(e, this.nodes.popoverContainer.firstChild);
    }
    toggleNothingFoundMessage(e) {
      this.nodes.nothingFoundMessage.classList.toggle(oe.nothingFoundMessageDisplayed, e);
    }
  };
  Aa([
    ot
  ], mi.prototype, "size");
  let ko = mi;
  class Ia extends ko {
    constructor(e) {
      const t = !nt();
      super({
        ...e,
        class: oe.popoverInline
      }, {
        [G.Default]: {
          wrapperTag: "button",
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        },
        [G.Html]: {
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        }
      }), this.items.forEach((o) => {
        !(o instanceof Fe) && !(o instanceof gt) || o.hasChildren && o.isChildrenOpen && this.showNestedItems(o);
      });
    }
    get offsetLeft() {
      return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetLeft;
    }
    show() {
      this.nestingLevel === 0 && this.nodes.popover.style.setProperty(Je.InlinePopoverWidth, this.size.width + "px"), super.show();
    }
    handleHover() {
    }
    setTriggerItemPosition(e, t) {
      const o = t.getElement(), i = o ? o.offsetLeft : 0, s = this.offsetLeft + i;
      e.style.setProperty(Je.TriggerItemLeft, s + "px");
    }
    showNestedItems(e) {
      if (this.nestedPopoverTriggerItem === e) {
        this.destroyNestedPopoverIfExists(), this.nestedPopoverTriggerItem = null;
        return;
      }
      super.showNestedItems(e);
    }
    showNestedPopoverForItem(e) {
      const t = super.showNestedPopoverForItem(e);
      return t.getElement().classList.add(oe.getPopoverNestedClass(t.nestingLevel)), t;
    }
    handleItemClick(e) {
      var t;
      e !== this.nestedPopoverTriggerItem && ((t = this.nestedPopoverTriggerItem) == null || t.handleClick(), super.destroyNestedPopoverIfExists()), super.handleItemClick(e);
    }
  }
  const bi = class dt {
    constructor() {
      this.scrollPosition = null;
    }
    lock() {
      lo ? this.lockHard() : document.body.classList.add(dt.CSS.scrollLocked);
    }
    unlock() {
      lo ? this.unlockHard() : document.body.classList.remove(dt.CSS.scrollLocked);
    }
    lockHard() {
      this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty("--window-scroll-offset", `${this.scrollPosition}px`), document.body.classList.add(dt.CSS.scrollLockedHard);
    }
    unlockHard() {
      document.body.classList.remove(dt.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
    }
  };
  bi.CSS = {
    scrollLocked: "ce-scroll-locked",
    scrollLockedHard: "ce-scroll-locked--hard"
  };
  let La = bi;
  const oo = Re("ce-popover-header"), no = {
    root: oo(),
    text: oo("text"),
    backButton: oo("back-button")
  };
  class Na {
    constructor({ text: e, onBackButtonClick: t }) {
      this.listeners = new yt(), this.text = e, this.onBackButtonClick = t, this.nodes = {
        root: k.make("div", [
          no.root
        ]),
        backButton: k.make("button", [
          no.backButton
        ]),
        text: k.make("div", [
          no.text
        ])
      }, this.nodes.backButton.innerHTML = fa, this.nodes.root.appendChild(this.nodes.backButton), this.listeners.on(this.nodes.backButton, "click", this.onBackButtonClick), this.nodes.text.innerText = this.text, this.nodes.root.appendChild(this.nodes.text);
    }
    getElement() {
      return this.nodes.root;
    }
    destroy() {
      this.nodes.root.remove(), this.listeners.destroy();
    }
  }
  class Pa {
    constructor() {
      this.history = [];
    }
    push(e) {
      this.history.push(e);
    }
    pop() {
      return this.history.pop();
    }
    get currentTitle() {
      return this.history.length === 0 ? "" : this.history[this.history.length - 1].title;
    }
    get currentItems() {
      return this.history.length === 0 ? [] : this.history[this.history.length - 1].items;
    }
    reset() {
      for (; this.history.length > 1; ) this.pop();
    }
  }
  class yi extends gi {
    constructor(e) {
      super(e, {
        [G.Default]: {
          hint: {
            enabled: false
          }
        },
        [G.Html]: {
          hint: {
            enabled: false
          }
        }
      }), this.scrollLocker = new La(), this.history = new Pa(), this.isHidden = true, this.nodes.overlay = k.make("div", [
        oe.overlay,
        oe.overlayHidden
      ]), this.nodes.popover.insertBefore(this.nodes.overlay, this.nodes.popover.firstChild), this.listeners.on(this.nodes.overlay, "click", () => {
        this.hide();
      }), this.history.push({
        items: e.items
      });
    }
    show() {
      this.nodes.overlay.classList.remove(oe.overlayHidden), super.show(), this.scrollLocker.lock(), this.isHidden = false;
    }
    hide() {
      this.isHidden || (super.hide(), this.nodes.overlay.classList.add(oe.overlayHidden), this.scrollLocker.unlock(), this.history.reset(), this.isHidden = true);
    }
    destroy() {
      super.destroy(), this.scrollLocker.unlock();
    }
    showNestedItems(e) {
      this.updateItemsAndHeader(e.children, e.title), this.history.push({
        title: e.title,
        items: e.children
      });
    }
    updateItemsAndHeader(e, t) {
      if (this.header !== null && this.header !== void 0 && (this.header.destroy(), this.header = null), t !== void 0) {
        this.header = new Na({
          text: t,
          onBackButtonClick: () => {
            this.history.pop(), this.updateItemsAndHeader(this.history.currentItems, this.history.currentTitle);
          }
        });
        const o = this.header.getElement();
        o !== null && this.nodes.popoverContainer.insertBefore(o, this.nodes.popoverContainer.firstChild);
      }
      this.items.forEach((o) => {
        var i;
        return (i = o.getElement()) == null ? void 0 : i.remove();
      }), this.items = this.buildItems(e), this.items.forEach((o) => {
        var i;
        const s = o.getElement();
        s !== null && ((i = this.nodes.items) == null || i.appendChild(s));
      });
    }
  }
  class Da extends j {
    constructor() {
      super(...arguments), this.opened = false, this.selection = new M(), this.popover = null, this.close = () => {
        this.opened && (this.opened = false, M.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(Se.Closed, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
      }, this.onPopoverClose = () => {
        this.close();
      };
    }
    get events() {
      return {
        opened: "block-settings-opened",
        closed: "block-settings-closed"
      };
    }
    get CSS() {
      return {
        settings: "ce-settings"
      };
    }
    get flipper() {
      var e;
      if (this.popover !== null) return "flipper" in this.popover ? (e = this.popover) == null ? void 0 : e.flipper : void 0;
    }
    make() {
      this.nodes.wrapper = k.make("div", [
        this.CSS.settings
      ]), this.nodes.wrapper.setAttribute("data-cy", "block-tunes"), this.eventsDispatcher.on(ft, this.close);
    }
    destroy() {
      this.removeAllNodes(), this.listeners.destroy(), this.eventsDispatcher.off(ft, this.close);
    }
    async open(e = this.Editor.BlockManager.currentBlock) {
      var t;
      this.opened = true, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
      const { toolTunes: o, commonTunes: i } = e.getTunes();
      this.eventsDispatcher.emit(this.events.opened);
      const s = nt() ? yi : ko;
      this.popover = new s({
        searchable: true,
        items: await this.getTunesItems(e, i, o),
        scopeElement: this.Editor.API.methods.ui.nodes.redactor,
        messages: {
          nothingFound: me.ui(ke.ui.popover, "Nothing found"),
          search: me.ui(ke.ui.popover, "Filter")
        }
      }), this.popover.on(Se.Closed, this.onPopoverClose), (t = this.nodes.wrapper) == null || t.append(this.popover.getElement()), this.popover.show();
    }
    getElement() {
      return this.nodes.wrapper;
    }
    async getTunesItems(e, t, o) {
      const i = [];
      o !== void 0 && o.length > 0 && (i.push(...o), i.push({
        type: G.Separator
      }));
      const s = Array.from(this.Editor.Tools.blockTools.values()), r = (await ai(e, s)).reduce((l, d) => (d.toolbox.forEach((h) => {
        l.push({
          icon: h.icon,
          title: me.t(ke.toolNames, h.title),
          name: d.name,
          closeOnActivate: true,
          onActivate: async () => {
            const { BlockManager: g, Caret: v, Toolbar: b } = this.Editor, w = await g.convert(e, d.name, h.data);
            b.close(), v.setToBlock(w, v.positions.END);
          }
        });
      }), l), []);
      return r.length > 0 && (i.push({
        icon: pi,
        name: "convert-to",
        title: me.ui(ke.ui.popover, "Convert to"),
        children: {
          searchable: true,
          items: r
        }
      }), i.push({
        type: G.Separator
      })), i.push(...t), i.map((l) => this.resolveTuneAliases(l));
    }
    resolveTuneAliases(e) {
      if (e.type === G.Separator || e.type === G.Html) return e;
      const t = ua(e, {
        label: "title"
      });
      return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
    }
  }
  var ki = {
    exports: {}
  };
  (function(n, e) {
    (function(t, o) {
      n.exports = o();
    })(window, function() {
      return function(t) {
        var o = {};
        function i(s) {
          if (o[s]) return o[s].exports;
          var r = o[s] = {
            i: s,
            l: false,
            exports: {}
          };
          return t[s].call(r.exports, r, r.exports, i), r.l = true, r.exports;
        }
        return i.m = t, i.c = o, i.d = function(s, r, l) {
          i.o(s, r) || Object.defineProperty(s, r, {
            enumerable: true,
            get: l
          });
        }, i.r = function(s) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(s, "__esModule", {
            value: true
          });
        }, i.t = function(s, r) {
          if (1 & r && (s = i(s)), 8 & r || 4 & r && typeof s == "object" && s && s.__esModule) return s;
          var l = /* @__PURE__ */ Object.create(null);
          if (i.r(l), Object.defineProperty(l, "default", {
            enumerable: true,
            value: s
          }), 2 & r && typeof s != "string") for (var d in s) i.d(l, d, (function(h) {
            return s[h];
          }).bind(null, d));
          return l;
        }, i.n = function(s) {
          var r = s && s.__esModule ? function() {
            return s.default;
          } : function() {
            return s;
          };
          return i.d(r, "a", r), r;
        }, i.o = function(s, r) {
          return Object.prototype.hasOwnProperty.call(s, r);
        }, i.p = "", i(i.s = 0);
      }([
        function(t, o, i) {
          function s(d, h) {
            for (var g = 0; g < h.length; g++) {
              var v = h[g];
              v.enumerable = v.enumerable || false, v.configurable = true, "value" in v && (v.writable = true), Object.defineProperty(d, v.key, v);
            }
          }
          function r(d, h, g) {
            return h && s(d.prototype, h), g && s(d, g), d;
          }
          i.r(o);
          var l = function() {
            function d(h) {
              var g = this;
              (function(v, b) {
                if (!(v instanceof b)) throw new TypeError("Cannot call a class as a function");
              })(this, d), this.commands = {}, this.keys = {}, this.name = h.name, this.parseShortcutName(h.name), this.element = h.on, this.callback = h.callback, this.executeShortcut = function(v) {
                g.execute(v);
              }, this.element.addEventListener("keydown", this.executeShortcut, false);
            }
            return r(d, null, [
              {
                key: "supportedCommands",
                get: function() {
                  return {
                    SHIFT: [
                      "SHIFT"
                    ],
                    CMD: [
                      "CMD",
                      "CONTROL",
                      "COMMAND",
                      "WINDOWS",
                      "CTRL"
                    ],
                    ALT: [
                      "ALT",
                      "OPTION"
                    ]
                  };
                }
              },
              {
                key: "keyCodes",
                get: function() {
                  return {
                    0: 48,
                    1: 49,
                    2: 50,
                    3: 51,
                    4: 52,
                    5: 53,
                    6: 54,
                    7: 55,
                    8: 56,
                    9: 57,
                    A: 65,
                    B: 66,
                    C: 67,
                    D: 68,
                    E: 69,
                    F: 70,
                    G: 71,
                    H: 72,
                    I: 73,
                    J: 74,
                    K: 75,
                    L: 76,
                    M: 77,
                    N: 78,
                    O: 79,
                    P: 80,
                    Q: 81,
                    R: 82,
                    S: 83,
                    T: 84,
                    U: 85,
                    V: 86,
                    W: 87,
                    X: 88,
                    Y: 89,
                    Z: 90,
                    BACKSPACE: 8,
                    ENTER: 13,
                    ESCAPE: 27,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    INSERT: 45,
                    DELETE: 46,
                    ".": 190
                  };
                }
              }
            ]), r(d, [
              {
                key: "parseShortcutName",
                value: function(h) {
                  h = h.split("+");
                  for (var g = 0; g < h.length; g++) {
                    h[g] = h[g].toUpperCase();
                    var v = false;
                    for (var b in d.supportedCommands) if (d.supportedCommands[b].includes(h[g])) {
                      v = this.commands[b] = true;
                      break;
                    }
                    v || (this.keys[h[g]] = true);
                  }
                  for (var w in d.supportedCommands) this.commands[w] || (this.commands[w] = false);
                }
              },
              {
                key: "execute",
                value: function(h) {
                  var g, v = {
                    CMD: h.ctrlKey || h.metaKey,
                    SHIFT: h.shiftKey,
                    ALT: h.altKey
                  }, b = true;
                  for (g in this.commands) this.commands[g] !== v[g] && (b = false);
                  var w, y = true;
                  for (w in this.keys) y = y && h.keyCode === d.keyCodes[w];
                  b && y && this.callback(h);
                }
              },
              {
                key: "remove",
                value: function() {
                  this.element.removeEventListener("keydown", this.executeShortcut);
                }
              }
            ]), d;
          }();
          o.default = l;
        }
      ]).default;
    });
  })(ki);
  var Ra = ki.exports;
  const ja = Ht(Ra);
  class Ha {
    constructor() {
      this.registeredShortcuts = /* @__PURE__ */ new Map();
    }
    add(e) {
      if (this.findShortcut(e.on, e.name)) throw Error(`Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`);
      const t = new ja({
        name: e.name,
        on: e.on,
        callback: e.handler
      }), o = this.registeredShortcuts.get(e.on) || [];
      this.registeredShortcuts.set(e.on, [
        ...o,
        t
      ]);
    }
    remove(e, t) {
      const o = this.findShortcut(e, t);
      if (!o) return;
      o.remove();
      const i = this.registeredShortcuts.get(e);
      this.registeredShortcuts.set(e, i.filter((s) => s !== o));
    }
    findShortcut(e, t) {
      return (this.registeredShortcuts.get(e) || []).find(({ name: o }) => o === t);
    }
  }
  const et = new Ha();
  var Fa = Object.defineProperty, Va = Object.getOwnPropertyDescriptor, wi = (n, e, t, o) => {
    for (var i = Va(e, t), s = n.length - 1, r; s >= 0; s--) (r = n[s]) && (i = r(e, t, i) || i);
    return i && Fa(e, t, i), i;
  }, Ct = ((n) => (n.Opened = "toolbox-opened", n.Closed = "toolbox-closed", n.BlockAdded = "toolbox-block-added", n))(Ct || {});
  const wo = class Ei extends bt {
    constructor({ api: e, tools: t, i18nLabels: o }) {
      super(), this.opened = false, this.listeners = new yt(), this.popover = null, this.handleMobileLayoutToggle = () => {
        this.destroyPopover(), this.initPopover();
      }, this.onPopoverClose = () => {
        this.opened = false, this.emit("toolbox-closed");
      }, this.api = e, this.tools = t, this.i18nLabels = o, this.enableShortcuts(), this.nodes = {
        toolbox: k.make("div", Ei.CSS.toolbox)
      }, this.initPopover(), this.nodes.toolbox.setAttribute("data-cy", "toolbox"), this.api.events.on(ft, this.handleMobileLayoutToggle);
    }
    get isEmpty() {
      return this.toolsToBeDisplayed.length === 0;
    }
    static get CSS() {
      return {
        toolbox: "ce-toolbox"
      };
    }
    getElement() {
      return this.nodes.toolbox;
    }
    hasFocus() {
      if (this.popover !== null) return "hasFocus" in this.popover ? this.popover.hasFocus() : void 0;
    }
    destroy() {
      var e;
      super.destroy(), this.nodes && this.nodes.toolbox && this.nodes.toolbox.remove(), this.removeAllShortcuts(), (e = this.popover) == null || e.off(Se.Closed, this.onPopoverClose), this.listeners.destroy(), this.api.events.off(ft, this.handleMobileLayoutToggle);
    }
    toolButtonActivated(e, t) {
      this.insertNewBlock(e, t);
    }
    open() {
      var e;
      this.isEmpty || ((e = this.popover) == null || e.show(), this.opened = true, this.emit("toolbox-opened"));
    }
    close() {
      var e;
      (e = this.popover) == null || e.hide(), this.opened = false, this.emit("toolbox-closed");
    }
    toggle() {
      this.opened ? this.close() : this.open();
    }
    initPopover() {
      var e;
      const t = nt() ? yi : ko;
      this.popover = new t({
        scopeElement: this.api.ui.nodes.redactor,
        searchable: true,
        messages: {
          nothingFound: this.i18nLabels.nothingFound,
          search: this.i18nLabels.filter
        },
        items: this.toolboxItemsToBeDisplayed
      }), this.popover.on(Se.Closed, this.onPopoverClose), (e = this.nodes.toolbox) == null || e.append(this.popover.getElement());
    }
    destroyPopover() {
      this.popover !== null && (this.popover.hide(), this.popover.off(Se.Closed, this.onPopoverClose), this.popover.destroy(), this.popover = null), this.nodes.toolbox !== null && (this.nodes.toolbox.innerHTML = "");
    }
    get toolsToBeDisplayed() {
      const e = [];
      return this.tools.forEach((t) => {
        t.toolbox && e.push(t);
      }), e;
    }
    get toolboxItemsToBeDisplayed() {
      const e = (t, o, i = true) => ({
        icon: t.icon,
        title: me.t(ke.toolNames, t.title || Ot(o.name)),
        name: o.name,
        onActivate: () => {
          this.toolButtonActivated(o.name, t.data);
        },
        secondaryLabel: o.shortcut && i ? fo(o.shortcut) : ""
      });
      return this.toolsToBeDisplayed.reduce((t, o) => (Array.isArray(o.toolbox) ? o.toolbox.forEach((i, s) => {
        t.push(e(i, o, s === 0));
      }) : o.toolbox !== void 0 && t.push(e(o.toolbox, o)), t), []);
    }
    enableShortcuts() {
      this.toolsToBeDisplayed.forEach((e) => {
        const t = e.shortcut;
        t && this.enableShortcutForTool(e.name, t);
      });
    }
    enableShortcutForTool(e, t) {
      et.add({
        name: t,
        on: this.api.ui.nodes.redactor,
        handler: async (o) => {
          o.preventDefault();
          const i = this.api.blocks.getCurrentBlockIndex(), s = this.api.blocks.getBlockByIndex(i);
          if (s) try {
            const r = await this.api.blocks.convert(s.id, e);
            this.api.caret.setToBlock(r, "end");
            return;
          } catch {
          }
          this.insertNewBlock(e);
        }
      });
    }
    removeAllShortcuts() {
      this.toolsToBeDisplayed.forEach((e) => {
        const t = e.shortcut;
        t && et.remove(this.api.ui.nodes.redactor, t);
      });
    }
    async insertNewBlock(e, t) {
      const o = this.api.blocks.getCurrentBlockIndex(), i = this.api.blocks.getBlockByIndex(o);
      if (!i) return;
      const s = i.isEmpty ? o : o + 1;
      let r;
      if (t) {
        const d = await this.api.blocks.composeBlockData(e);
        r = Object.assign(d, t);
      }
      const l = this.api.blocks.insert(e, r, void 0, s, void 0, i.isEmpty);
      l.call(Ae.APPEND_CALLBACK), this.api.caret.setToBlock(s), this.emit("toolbox-block-added", {
        block: l
      }), this.api.toolbar.close();
    }
  };
  wi([
    ot
  ], wo.prototype, "toolsToBeDisplayed");
  wi([
    ot
  ], wo.prototype, "toolboxItemsToBeDisplayed");
  let $a = wo;
  const xi = "block hovered";
  async function Ua(n, e) {
    const t = navigator.keyboard;
    if (!t) return e;
    try {
      return (await t.getLayoutMap()).get(n) || e;
    } catch (o) {
      return console.error(o), e;
    }
  }
  class za extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.toolboxInstance = null;
    }
    get CSS() {
      return {
        toolbar: "ce-toolbar",
        content: "ce-toolbar__content",
        actions: "ce-toolbar__actions",
        actionsOpened: "ce-toolbar__actions--opened",
        toolbarOpened: "ce-toolbar--opened",
        openedToolboxHolderModifier: "codex-editor--toolbox-opened",
        plusButton: "ce-toolbar__plus",
        plusButtonShortcut: "ce-toolbar__plus-shortcut",
        settingsToggler: "ce-toolbar__settings-btn",
        settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
      };
    }
    get opened() {
      return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
    }
    get toolbox() {
      var e;
      return {
        opened: (e = this.toolboxInstance) == null ? void 0 : e.opened,
        close: () => {
          var t;
          (t = this.toolboxInstance) == null || t.close();
        },
        open: () => {
          if (this.toolboxInstance === null) {
            z("toolbox.open() called before initialization is finished", "warn");
            return;
          }
          this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
        },
        toggle: () => {
          if (this.toolboxInstance === null) {
            z("toolbox.toggle() called before initialization is finished", "warn");
            return;
          }
          this.toolboxInstance.toggle();
        },
        hasFocus: () => {
          var t;
          return (t = this.toolboxInstance) == null ? void 0 : t.hasFocus();
        }
      };
    }
    get blockActions() {
      return {
        hide: () => {
          this.nodes.actions.classList.remove(this.CSS.actionsOpened);
        },
        show: () => {
          this.nodes.actions.classList.add(this.CSS.actionsOpened);
        }
      };
    }
    get blockTunesToggler() {
      return {
        hide: () => this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),
        show: () => this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)
      };
    }
    toggleReadOnly(e) {
      e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : window.requestIdleCallback(() => {
        this.drawUI(), this.enableModuleBindings();
      }, {
        timeout: 2e3
      });
    }
    moveAndOpen(e = this.Editor.BlockManager.currentBlock) {
      if (this.toolboxInstance === null) {
        z("Can't open Toolbar since Editor initialization is not finished yet", "warn");
        return;
      }
      if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e) return;
      this.hoveredBlock = e;
      const t = e.holder, { isMobile: o } = this.Editor.UI;
      let i;
      const s = 20, r = e.firstInput, l = t.getBoundingClientRect(), d = r !== void 0 ? r.getBoundingClientRect() : null, h = d !== null ? d.top - l.top : null, g = h !== null ? h > s : void 0;
      if (o) i = t.offsetTop + t.offsetHeight;
      else if (r === void 0 || g) {
        const v = parseInt(window.getComputedStyle(e.pluginsContent).paddingTop);
        i = t.offsetTop + v;
      } else {
        const v = Br(r), b = parseInt(window.getComputedStyle(this.nodes.plusButton).height, 10);
        i = t.offsetTop + v - b + 8 + h;
      }
      this.nodes.wrapper.style.top = `${Math.floor(i)}px`, this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
    }
    close() {
      var e, t;
      this.Editor.ReadOnly.isEnabled || ((e = this.nodes.wrapper) == null || e.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), (t = this.toolboxInstance) == null || t.close(), this.Editor.BlockSettings.close(), this.reset());
    }
    reset() {
      this.nodes.wrapper.style.top = "unset";
    }
    open(e = true) {
      this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
    }
    async make() {
      this.nodes.wrapper = k.make("div", this.CSS.toolbar), [
        "content",
        "actions"
      ].forEach((s) => {
        this.nodes[s] = k.make("div", this.CSS[s]);
      }), k.append(this.nodes.wrapper, this.nodes.content), k.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = k.make("div", this.CSS.plusButton, {
        innerHTML: wa
      }), k.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
        It(true), this.plusButtonClicked();
      }, false);
      const e = k.make("div");
      e.appendChild(document.createTextNode(me.ui(ke.ui.toolbar.toolbox, "Add"))), e.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
        textContent: "/"
      })), Lt(this.nodes.plusButton, e, {
        hidingDelay: 400
      }), this.nodes.settingsToggler = k.make("span", this.CSS.settingsToggler, {
        innerHTML: ka
      }), k.append(this.nodes.actions, this.nodes.settingsToggler);
      const t = k.make("div"), o = k.text(me.ui(ke.ui.blockTunes.toggler, "Click to tune")), i = await Ua("Slash", "/");
      t.appendChild(o), t.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
        textContent: fo(`CMD + ${i}`)
      })), Lt(this.nodes.settingsToggler, t, {
        hidingDelay: 400
      }), k.append(this.nodes.actions, this.makeToolbox()), k.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), k.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
    }
    makeToolbox() {
      return this.toolboxInstance = new $a({
        api: this.Editor.API.methods,
        tools: this.Editor.Tools.blockTools,
        i18nLabels: {
          filter: me.ui(ke.ui.popover, "Filter"),
          nothingFound: me.ui(ke.ui.popover, "Nothing found")
        }
      }), this.toolboxInstance.on(Ct.Opened, () => {
        this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
      }), this.toolboxInstance.on(Ct.Closed, () => {
        this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
      }), this.toolboxInstance.on(Ct.BlockAdded, ({ block: e }) => {
        const { BlockManager: t, Caret: o } = this.Editor, i = t.getBlockById(e.id);
        i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), o.setToBlock(t.lastBlock)) : o.setToBlock(t.nextBlock));
      }), this.toolboxInstance.getElement();
    }
    plusButtonClicked() {
      var e;
      this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
    }
    enableModuleBindings() {
      this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
        var t;
        e.stopPropagation(), this.settingsTogglerClicked(), (t = this.toolboxInstance) != null && t.opened && this.toolboxInstance.close(), It(true);
      }, true), nt() || this.eventsDispatcher.on(xi, (e) => {
        var t;
        this.Editor.BlockSettings.opened || (t = this.toolboxInstance) != null && t.opened || this.moveAndOpen(e.block);
      });
    }
    disableModuleBindings() {
      this.readOnlyMutableListeners.clearAll();
    }
    settingsTogglerClicked() {
      this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
    }
    drawUI() {
      this.Editor.BlockSettings.make(), this.make();
    }
    destroy() {
      this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy();
    }
  }
  var $e = ((n) => (n[n.Block = 0] = "Block", n[n.Inline = 1] = "Inline", n[n.Tune = 2] = "Tune", n))($e || {}), Tt = ((n) => (n.Shortcut = "shortcut", n.Toolbox = "toolbox", n.EnabledInlineTools = "inlineToolbar", n.EnabledBlockTunes = "tunes", n.Config = "config", n))(Tt || {}), Ci = ((n) => (n.Shortcut = "shortcut", n.SanitizeConfig = "sanitize", n))(Ci || {}), Ze = ((n) => (n.IsEnabledLineBreaks = "enableLineBreaks", n.Toolbox = "toolbox", n.ConversionConfig = "conversionConfig", n.IsReadOnlySupported = "isReadOnlySupported", n.PasteConfig = "pasteConfig", n))(Ze || {}), Pt = ((n) => (n.IsInline = "isInline", n.Title = "title", n.IsReadOnlySupported = "isReadOnlySupported", n))(Pt || {}), ho = ((n) => (n.IsTune = "isTune", n))(ho || {});
  class Eo {
    constructor({ name: e, constructable: t, config: o, api: i, isDefault: s, isInternal: r = false, defaultPlaceholder: l }) {
      this.api = i, this.name = e, this.constructable = t, this.config = o, this.isDefault = s, this.isInternal = r, this.defaultPlaceholder = l;
    }
    get settings() {
      const e = this.config.config || {};
      return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
    }
    reset() {
      if (Q(this.constructable.reset)) return this.constructable.reset();
    }
    prepare() {
      if (Q(this.constructable.prepare)) return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
    }
    get shortcut() {
      const e = this.constructable.shortcut;
      return this.config.shortcut || e;
    }
    get sanitizeConfig() {
      return this.constructable.sanitize || {};
    }
    isInline() {
      return this.type === $e.Inline;
    }
    isBlock() {
      return this.type === $e.Block;
    }
    isTune() {
      return this.type === $e.Tune;
    }
  }
  class qa extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.CSS = {
        inlineToolbar: "ce-inline-toolbar"
      }, this.opened = false, this.popover = null, this.toolbarVerticalMargin = nt() ? 20 : 6, this.tools = /* @__PURE__ */ new Map(), window.requestIdleCallback(() => {
        this.make();
      }, {
        timeout: 2e3
      });
    }
    async tryToShow(e = false) {
      e && this.close(), this.allowedToShow() && (await this.open(), this.Editor.Toolbar.close());
    }
    close() {
      var e, t;
      if (this.opened) {
        for (const [o, i] of this.tools) {
          const s = this.getToolShortcut(o.name);
          s !== void 0 && et.remove(this.Editor.UI.nodes.redactor, s), Q(i.clear) && i.clear();
        }
        this.tools = /* @__PURE__ */ new Map(), this.reset(), this.opened = false, (e = this.popover) == null || e.hide(), (t = this.popover) == null || t.destroy(), this.popover = null;
      }
    }
    containsNode(e) {
      return this.nodes.wrapper === void 0 ? false : this.nodes.wrapper.contains(e);
    }
    destroy() {
      var e;
      this.removeAllNodes(), (e = this.popover) == null || e.destroy(), this.popover = null;
    }
    make() {
      this.nodes.wrapper = k.make("div", [
        this.CSS.inlineToolbar,
        ...this.isRtl ? [
          this.Editor.UI.CSS.editorRtlFix
        ] : []
      ]), this.nodes.wrapper.setAttribute("data-cy", "inline-toolbar"), k.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
    }
    async open() {
      var e;
      if (this.opened) return;
      this.opened = true, this.popover !== null && this.popover.destroy(), this.createToolsInstances();
      const t = await this.getPopoverItems();
      this.popover = new Ia({
        items: t,
        scopeElement: this.Editor.API.methods.ui.nodes.redactor,
        messages: {
          nothingFound: me.ui(ke.ui.popover, "Nothing found"),
          search: me.ui(ke.ui.popover, "Filter")
        }
      }), this.move(this.popover.size.width), (e = this.nodes.wrapper) == null || e.append(this.popover.getElement()), this.popover.show();
    }
    move(e) {
      const t = M.rect, o = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), i = {
        x: t.x - o.x,
        y: t.y + t.height - o.top + this.toolbarVerticalMargin
      };
      i.x + e + o.x > this.Editor.UI.contentRect.right && (i.x = this.Editor.UI.contentRect.right - e - o.x), this.nodes.wrapper.style.left = Math.floor(i.x) + "px", this.nodes.wrapper.style.top = Math.floor(i.y) + "px";
    }
    reset() {
      this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
    }
    allowedToShow() {
      const e = [
        "IMG",
        "INPUT"
      ], t = M.get(), o = M.text;
      if (!t || !t.anchorNode || t.isCollapsed || o.length < 1) return false;
      const i = k.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
      if (i === null || t !== null && e.includes(i.tagName)) return false;
      const s = this.Editor.BlockManager.getBlock(t.anchorNode);
      return !s || this.getTools().some((r) => s.tool.inlineTools.has(r.name)) === false ? false : i.closest("[contenteditable]") !== null;
    }
    getTools() {
      const e = this.Editor.BlockManager.currentBlock;
      return e ? Array.from(e.tool.inlineTools.values()).filter((t) => !(this.Editor.ReadOnly.isEnabled && t.isReadOnlySupported !== true)) : [];
    }
    createToolsInstances() {
      this.tools = /* @__PURE__ */ new Map(), this.getTools().forEach((e) => {
        const t = e.create();
        this.tools.set(e, t);
      });
    }
    async getPopoverItems() {
      const e = [];
      let t = 0;
      for (const [o, i] of this.tools) {
        const s = await i.render(), r = this.getToolShortcut(o.name);
        if (r !== void 0) try {
          this.enableShortcuts(o.name, r);
        } catch {
        }
        const l = r !== void 0 ? fo(r) : void 0, d = me.t(ke.toolNames, o.title || Ot(o.name));
        [
          s
        ].flat().forEach((h) => {
          var g, v;
          const b = {
            name: o.name,
            onActivate: () => {
              this.toolClicked(i);
            },
            hint: {
              title: d,
              description: l
            }
          };
          if (k.isElement(h)) {
            const w = {
              ...b,
              element: h,
              type: G.Html
            };
            if (Q(i.renderActions)) {
              const y = i.renderActions();
              w.children = {
                isOpen: (g = i.checkState) == null ? void 0 : g.call(i, M.get()),
                isFlippable: false,
                items: [
                  {
                    type: G.Html,
                    element: y
                  }
                ]
              };
            } else (v = i.checkState) == null || v.call(i, M.get());
            e.push(w);
          } else if (h.type === G.Html) e.push({
            ...b,
            ...h,
            type: G.Html
          });
          else if (h.type === G.Separator) e.push({
            type: G.Separator
          });
          else {
            const w = {
              ...b,
              ...h,
              type: G.Default
            };
            "children" in w && t !== 0 && e.push({
              type: G.Separator
            }), e.push(w), "children" in w && t < this.tools.size - 1 && e.push({
              type: G.Separator
            });
          }
        }), t++;
      }
      return e;
    }
    getToolShortcut(e) {
      const { Tools: t } = this.Editor, o = t.inlineTools.get(e), i = t.internal.inlineTools;
      return Array.from(i.keys()).includes(e) ? this.inlineTools[e][Ci.Shortcut] : o == null ? void 0 : o.shortcut;
    }
    enableShortcuts(e, t) {
      et.add({
        name: t,
        handler: (o) => {
          var i;
          const { currentBlock: s } = this.Editor.BlockManager;
          s && s.tool.enabledInlineTools && (o.preventDefault(), (i = this.popover) == null || i.activateItemByName(e));
        },
        on: document
      });
    }
    toolClicked(e) {
      var t;
      const o = M.range;
      (t = e.surround) == null || t.call(e, o), this.checkToolsState();
    }
    checkToolsState() {
      var e;
      (e = this.tools) == null || e.forEach((t) => {
        var o;
        (o = t.checkState) == null || o.call(t, M.get());
      });
    }
    get inlineTools() {
      const e = {};
      return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, o]) => {
        e[t] = o.create();
      }), e;
    }
  }
  function Ti() {
    const n = window.getSelection();
    if (n === null) return [
      null,
      0
    ];
    let e = n.focusNode, t = n.focusOffset;
    return e === null ? [
      null,
      0
    ] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], t = e.textContent.length)), [
      e,
      t
    ]);
  }
  function Si(n, e, t, o) {
    const i = document.createRange();
    o === "left" ? (i.setStart(n, 0), i.setEnd(e, t)) : (i.setStart(e, t), i.setEnd(n, n.childNodes.length));
    const s = i.cloneContents(), r = document.createElement("div");
    r.appendChild(s);
    const l = r.textContent || "";
    return _r(l);
  }
  function St(n) {
    const e = k.getDeepestNode(n);
    if (e === null || k.isEmpty(n)) return true;
    if (k.isNativeInput(e)) return e.selectionEnd === 0;
    if (k.isEmpty(n)) return true;
    const [t, o] = Ti();
    return t === null ? false : Si(n, t, o, "left");
  }
  function _t(n) {
    const e = k.getDeepestNode(n, true);
    if (e === null) return true;
    if (k.isNativeInput(e)) return e.selectionEnd === e.value.length;
    const [t, o] = Ti();
    return t === null ? false : Si(n, t, o, "right");
  }
  var _i = {}, xo = {}, Ft = {}, qe = {}, Co = {}, To = {};
  Object.defineProperty(To, "__esModule", {
    value: true
  });
  To.allInputsSelector = Wa;
  function Wa() {
    var n = [
      "text",
      "password",
      "email",
      "number",
      "search",
      "tel",
      "url"
    ];
    return "[contenteditable=true], textarea, input:not([type]), " + n.map(function(e) {
      return 'input[type="'.concat(e, '"]');
    }).join(", ");
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.allInputsSelector = void 0;
    var e = To;
    Object.defineProperty(n, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
  })(Co);
  var We = {}, So = {};
  Object.defineProperty(So, "__esModule", {
    value: true
  });
  So.isNativeInput = Ya;
  function Ya(n) {
    var e = [
      "INPUT",
      "TEXTAREA"
    ];
    return n && n.tagName ? e.includes(n.tagName) : false;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isNativeInput = void 0;
    var e = So;
    Object.defineProperty(n, "isNativeInput", {
      enumerable: true,
      get: function() {
        return e.isNativeInput;
      }
    });
  })(We);
  var Bi = {}, _o = {};
  Object.defineProperty(_o, "__esModule", {
    value: true
  });
  _o.append = Xa;
  function Xa(n, e) {
    Array.isArray(e) ? e.forEach(function(t) {
      n.appendChild(t);
    }) : n.appendChild(e);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.append = void 0;
    var e = _o;
    Object.defineProperty(n, "append", {
      enumerable: true,
      get: function() {
        return e.append;
      }
    });
  })(Bi);
  var Bo = {}, Mo = {};
  Object.defineProperty(Mo, "__esModule", {
    value: true
  });
  Mo.blockElements = Ka;
  function Ka() {
    return [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "output",
      "p",
      "pre",
      "ruby",
      "section",
      "table",
      "tbody",
      "thead",
      "tr",
      "tfoot",
      "ul",
      "video"
    ];
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.blockElements = void 0;
    var e = Mo;
    Object.defineProperty(n, "blockElements", {
      enumerable: true,
      get: function() {
        return e.blockElements;
      }
    });
  })(Bo);
  var Mi = {}, Oo = {};
  Object.defineProperty(Oo, "__esModule", {
    value: true
  });
  Oo.calculateBaseline = Ga;
  function Ga(n) {
    var e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), s = parseFloat(e.borderTopWidth), r = parseFloat(e.marginTop), l = t * 0.8, d = (o - t) / 2, h = r + s + i + d + l;
    return h;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.calculateBaseline = void 0;
    var e = Oo;
    Object.defineProperty(n, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return e.calculateBaseline;
      }
    });
  })(Mi);
  var Oi = {}, Ao = {}, Io = {}, Lo = {};
  Object.defineProperty(Lo, "__esModule", {
    value: true
  });
  Lo.isContentEditable = Za;
  function Za(n) {
    return n.contentEditable === "true";
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isContentEditable = void 0;
    var e = Lo;
    Object.defineProperty(n, "isContentEditable", {
      enumerable: true,
      get: function() {
        return e.isContentEditable;
      }
    });
  })(Io);
  Object.defineProperty(Ao, "__esModule", {
    value: true
  });
  Ao.canSetCaret = el;
  var Qa = We, Ja = Io;
  function el(n) {
    var e = true;
    if ((0, Qa.isNativeInput)(n)) switch (n.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = false;
        break;
    }
    else e = (0, Ja.isContentEditable)(n);
    return e;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.canSetCaret = void 0;
    var e = Ao;
    Object.defineProperty(n, "canSetCaret", {
      enumerable: true,
      get: function() {
        return e.canSetCaret;
      }
    });
  })(Oi);
  var Vt = {}, No = {};
  function tl(n, e, t) {
    const o = t.value !== void 0 ? "value" : "get", i = t[o], s = `#${e}Cache`;
    if (t[o] = function(...r) {
      return this[s] === void 0 && (this[s] = i.apply(this, r)), this[s];
    }, o === "get" && t.set) {
      const r = t.set;
      t.set = function(l) {
        delete n[s], r.apply(this, l);
      };
    }
    return t;
  }
  function Ai() {
    const n = {
      win: false,
      mac: false,
      x11: false,
      linux: false
    }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
    return e !== void 0 && (n[e] = true), n;
  }
  function Po(n) {
    return n != null && n !== "" && (typeof n != "object" || Object.keys(n).length > 0);
  }
  function ol(n) {
    return !Po(n);
  }
  const nl = () => typeof window < "u" && window.navigator !== null && Po(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function il(n) {
    const e = Ai();
    return n = n.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, "+"), e.mac ? n = n.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
  }
  function sl(n) {
    return n[0].toUpperCase() + n.slice(1);
  }
  function rl(n) {
    const e = document.createElement("div");
    e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = n, document.body.appendChild(e);
    const t = window.getSelection(), o = document.createRange();
    if (o.selectNode(e), t === null) throw new Error("Cannot copy text to clipboard");
    t.removeAllRanges(), t.addRange(o), document.execCommand("copy"), document.body.removeChild(e);
  }
  function al(n, e, t) {
    let o;
    return (...i) => {
      const s = this, r = () => {
        o = void 0, t !== true && n.apply(s, i);
      }, l = t === true && o !== void 0;
      window.clearTimeout(o), o = window.setTimeout(r, e), l && n.apply(s, i);
    };
  }
  function Pe(n) {
    return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function ll(n) {
    return Pe(n) === "boolean";
  }
  function Ii(n) {
    return Pe(n) === "function" || Pe(n) === "asyncfunction";
  }
  function cl(n) {
    return Ii(n) && /^\s*class\s+/.test(n.toString());
  }
  function dl(n) {
    return Pe(n) === "number";
  }
  function Bt(n) {
    return Pe(n) === "object";
  }
  function ul(n) {
    return Promise.resolve(n) === n;
  }
  function hl(n) {
    return Pe(n) === "string";
  }
  function pl(n) {
    return Pe(n) === "undefined";
  }
  function po(n, ...e) {
    if (!e.length) return n;
    const t = e.shift();
    if (Bt(n) && Bt(t)) for (const o in t) Bt(t[o]) ? (n[o] === void 0 && Object.assign(n, {
      [o]: {}
    }), po(n[o], t[o])) : Object.assign(n, {
      [o]: t[o]
    });
    return po(n, ...e);
  }
  function fl(n, e, t) {
    const o = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
    n && console.warn(o);
  }
  function gl(n) {
    try {
      return new URL(n).href;
    } catch {
    }
    return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
  }
  function ml(n) {
    return n > 47 && n < 58 || n === 32 || n === 13 || n === 229 || n > 64 && n < 91 || n > 95 && n < 112 || n > 185 && n < 193 || n > 218 && n < 223;
  }
  const vl = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    DELETE: 46,
    META: 91,
    SLASH: 191
  }, bl = {
    LEFT: 0,
    WHEEL: 1,
    RIGHT: 2,
    BACKWARD: 3,
    FORWARD: 4
  };
  let yl = class {
    constructor() {
      this.completed = Promise.resolve();
    }
    add(n) {
      return new Promise((e, t) => {
        this.completed = this.completed.then(n).then(e).catch(t);
      });
    }
  };
  function kl(n, e, t = void 0) {
    let o, i, s, r = null, l = 0;
    t || (t = {});
    const d = function() {
      l = t.leading === false ? 0 : Date.now(), r = null, s = n.apply(o, i), r === null && (o = i = null);
    };
    return function() {
      const h = Date.now();
      !l && t.leading === false && (l = h);
      const g = e - (h - l);
      return o = this, i = arguments, g <= 0 || g > e ? (r && (clearTimeout(r), r = null), l = h, s = n.apply(o, i), r === null && (o = i = null)) : !r && t.trailing !== false && (r = setTimeout(d, g)), s;
    };
  }
  const wl = Object.freeze(Object.defineProperty({
    __proto__: null,
    PromiseQueue: yl,
    beautifyShortcut: il,
    cacheable: tl,
    capitalize: sl,
    copyTextToClipboard: rl,
    debounce: al,
    deepMerge: po,
    deprecationAssert: fl,
    getUserOS: Ai,
    getValidUrl: gl,
    isBoolean: ll,
    isClass: cl,
    isEmpty: ol,
    isFunction: Ii,
    isIosDevice: nl,
    isNumber: dl,
    isObject: Bt,
    isPrintableKey: ml,
    isPromise: ul,
    isString: hl,
    isUndefined: pl,
    keyCodes: vl,
    mouseButtons: bl,
    notEmpty: Po,
    throttle: kl,
    typeOf: Pe
  }, Symbol.toStringTag, {
    value: "Module"
  })), Do = pr(wl);
  Object.defineProperty(No, "__esModule", {
    value: true
  });
  No.containsOnlyInlineElements = Cl;
  var El = Do, xl = Bo;
  function Cl(n) {
    var e;
    (0, El.isString)(n) ? (e = document.createElement("div"), e.innerHTML = n) : e = n;
    var t = function(o) {
      return !(0, xl.blockElements)().includes(o.tagName.toLowerCase()) && Array.from(o.children).every(t);
    };
    return Array.from(e.children).every(t);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.containsOnlyInlineElements = void 0;
    var e = No;
    Object.defineProperty(n, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return e.containsOnlyInlineElements;
      }
    });
  })(Vt);
  var Li = {}, Ro = {}, $t = {}, jo = {};
  Object.defineProperty(jo, "__esModule", {
    value: true
  });
  jo.make = Tl;
  function Tl(n, e, t) {
    var o;
    e === void 0 && (e = null), t === void 0 && (t = {});
    var i = document.createElement(n);
    if (Array.isArray(e)) {
      var s = e.filter(function(l) {
        return l !== void 0;
      });
      (o = i.classList).add.apply(o, s);
    } else e !== null && i.classList.add(e);
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
    return i;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.make = void 0;
    var e = jo;
    Object.defineProperty(n, "make", {
      enumerable: true,
      get: function() {
        return e.make;
      }
    });
  })($t);
  Object.defineProperty(Ro, "__esModule", {
    value: true
  });
  Ro.fragmentToString = _l;
  var Sl = $t;
  function _l(n) {
    var e = (0, Sl.make)("div");
    return e.appendChild(n), e.innerHTML;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.fragmentToString = void 0;
    var e = Ro;
    Object.defineProperty(n, "fragmentToString", {
      enumerable: true,
      get: function() {
        return e.fragmentToString;
      }
    });
  })(Li);
  var Ni = {}, Ho = {};
  Object.defineProperty(Ho, "__esModule", {
    value: true
  });
  Ho.getContentLength = Ml;
  var Bl = We;
  function Ml(n) {
    var e, t;
    return (0, Bl.isNativeInput)(n) ? n.value.length : n.nodeType === Node.TEXT_NODE ? n.length : (t = (e = n.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getContentLength = void 0;
    var e = Ho;
    Object.defineProperty(n, "getContentLength", {
      enumerable: true,
      get: function() {
        return e.getContentLength;
      }
    });
  })(Ni);
  var Fo = {}, Vo = {}, On = pt && pt.__spreadArray || function(n, e, t) {
    if (t || arguments.length === 2) for (var o = 0, i = e.length, s; o < i; o++) (s || !(o in e)) && (s || (s = Array.prototype.slice.call(e, 0, o)), s[o] = e[o]);
    return n.concat(s || Array.prototype.slice.call(e));
  };
  Object.defineProperty(Vo, "__esModule", {
    value: true
  });
  Vo.getDeepestBlockElements = Pi;
  var Ol = Vt;
  function Pi(n) {
    return (0, Ol.containsOnlyInlineElements)(n) ? [
      n
    ] : Array.from(n.children).reduce(function(e, t) {
      return On(On([], e, true), Pi(t), true);
    }, []);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getDeepestBlockElements = void 0;
    var e = Vo;
    Object.defineProperty(n, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return e.getDeepestBlockElements;
      }
    });
  })(Fo);
  var Di = {}, $o = {}, Ut = {}, Uo = {};
  Object.defineProperty(Uo, "__esModule", {
    value: true
  });
  Uo.isLineBreakTag = Al;
  function Al(n) {
    return [
      "BR",
      "WBR"
    ].includes(n.tagName);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isLineBreakTag = void 0;
    var e = Uo;
    Object.defineProperty(n, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return e.isLineBreakTag;
      }
    });
  })(Ut);
  var zt = {}, zo = {};
  Object.defineProperty(zo, "__esModule", {
    value: true
  });
  zo.isSingleTag = Il;
  function Il(n) {
    return [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR"
    ].includes(n.tagName);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isSingleTag = void 0;
    var e = zo;
    Object.defineProperty(n, "isSingleTag", {
      enumerable: true,
      get: function() {
        return e.isSingleTag;
      }
    });
  })(zt);
  Object.defineProperty($o, "__esModule", {
    value: true
  });
  $o.getDeepestNode = Ri;
  var Ll = We, Nl = Ut, Pl = zt;
  function Ri(n, e) {
    e === void 0 && (e = false);
    var t = e ? "lastChild" : "firstChild", o = e ? "previousSibling" : "nextSibling";
    if (n.nodeType === Node.ELEMENT_NODE && n[t]) {
      var i = n[t];
      if ((0, Pl.isSingleTag)(i) && !(0, Ll.isNativeInput)(i) && !(0, Nl.isLineBreakTag)(i)) if (i[o]) i = i[o];
      else if (i.parentNode !== null && i.parentNode[o]) i = i.parentNode[o];
      else return i.parentNode;
      return Ri(i, e);
    }
    return n;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getDeepestNode = void 0;
    var e = $o;
    Object.defineProperty(n, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return e.getDeepestNode;
      }
    });
  })(Di);
  var ji = {}, qo = {}, Et = pt && pt.__spreadArray || function(n, e, t) {
    if (t || arguments.length === 2) for (var o = 0, i = e.length, s; o < i; o++) (s || !(o in e)) && (s || (s = Array.prototype.slice.call(e, 0, o)), s[o] = e[o]);
    return n.concat(s || Array.prototype.slice.call(e));
  };
  Object.defineProperty(qo, "__esModule", {
    value: true
  });
  qo.findAllInputs = Fl;
  var Dl = Vt, Rl = Fo, jl = Co, Hl = We;
  function Fl(n) {
    return Array.from(n.querySelectorAll((0, jl.allInputsSelector)())).reduce(function(e, t) {
      return (0, Hl.isNativeInput)(t) || (0, Dl.containsOnlyInlineElements)(t) ? Et(Et([], e, true), [
        t
      ], false) : Et(Et([], e, true), (0, Rl.getDeepestBlockElements)(t), true);
    }, []);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.findAllInputs = void 0;
    var e = qo;
    Object.defineProperty(n, "findAllInputs", {
      enumerable: true,
      get: function() {
        return e.findAllInputs;
      }
    });
  })(ji);
  var Hi = {}, Wo = {};
  Object.defineProperty(Wo, "__esModule", {
    value: true
  });
  Wo.isCollapsedWhitespaces = Vl;
  function Vl(n) {
    return !/[^\t\n\r ]/.test(n);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isCollapsedWhitespaces = void 0;
    var e = Wo;
    Object.defineProperty(n, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return e.isCollapsedWhitespaces;
      }
    });
  })(Hi);
  var Yo = {}, Xo = {};
  Object.defineProperty(Xo, "__esModule", {
    value: true
  });
  Xo.isElement = Ul;
  var $l = Do;
  function Ul(n) {
    return (0, $l.isNumber)(n) ? false : !!n && !!n.nodeType && n.nodeType === Node.ELEMENT_NODE;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isElement = void 0;
    var e = Xo;
    Object.defineProperty(n, "isElement", {
      enumerable: true,
      get: function() {
        return e.isElement;
      }
    });
  })(Yo);
  var Fi = {}, Ko = {}, Go = {}, Zo = {};
  Object.defineProperty(Zo, "__esModule", {
    value: true
  });
  Zo.isLeaf = zl;
  function zl(n) {
    return n === null ? false : n.childNodes.length === 0;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isLeaf = void 0;
    var e = Zo;
    Object.defineProperty(n, "isLeaf", {
      enumerable: true,
      get: function() {
        return e.isLeaf;
      }
    });
  })(Go);
  var Qo = {}, Jo = {};
  Object.defineProperty(Jo, "__esModule", {
    value: true
  });
  Jo.isNodeEmpty = Kl;
  var ql = Ut, Wl = Yo, Yl = We, Xl = zt;
  function Kl(n, e) {
    var t = "";
    return (0, Xl.isSingleTag)(n) && !(0, ql.isLineBreakTag)(n) ? false : ((0, Wl.isElement)(n) && (0, Yl.isNativeInput)(n) ? t = n.value : n.textContent !== null && (t = n.textContent.replace("\u200B", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isNodeEmpty = void 0;
    var e = Jo;
    Object.defineProperty(n, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return e.isNodeEmpty;
      }
    });
  })(Qo);
  Object.defineProperty(Ko, "__esModule", {
    value: true
  });
  Ko.isEmpty = Ql;
  var Gl = Go, Zl = Qo;
  function Ql(n, e) {
    n.normalize();
    for (var t = [
      n
    ]; t.length > 0; ) {
      var o = t.shift();
      if (o) {
        if (n = o, (0, Gl.isLeaf)(n) && !(0, Zl.isNodeEmpty)(n, e)) return false;
        t.push.apply(t, Array.from(n.childNodes));
      }
    }
    return true;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isEmpty = void 0;
    var e = Ko;
    Object.defineProperty(n, "isEmpty", {
      enumerable: true,
      get: function() {
        return e.isEmpty;
      }
    });
  })(Fi);
  var Vi = {}, en = {};
  Object.defineProperty(en, "__esModule", {
    value: true
  });
  en.isFragment = ec;
  var Jl = Do;
  function ec(n) {
    return (0, Jl.isNumber)(n) ? false : !!n && !!n.nodeType && n.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isFragment = void 0;
    var e = en;
    Object.defineProperty(n, "isFragment", {
      enumerable: true,
      get: function() {
        return e.isFragment;
      }
    });
  })(Vi);
  var $i = {}, tn = {};
  Object.defineProperty(tn, "__esModule", {
    value: true
  });
  tn.isHTMLString = oc;
  var tc = $t;
  function oc(n) {
    var e = (0, tc.make)("div");
    return e.innerHTML = n, e.childElementCount > 0;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isHTMLString = void 0;
    var e = tn;
    Object.defineProperty(n, "isHTMLString", {
      enumerable: true,
      get: function() {
        return e.isHTMLString;
      }
    });
  })($i);
  var Ui = {}, on = {};
  Object.defineProperty(on, "__esModule", {
    value: true
  });
  on.offset = nc;
  function nc(n) {
    var e = n.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, o = window.pageYOffset || document.documentElement.scrollTop, i = e.top + o, s = e.left + t;
    return {
      top: i,
      left: s,
      bottom: i + e.height,
      right: s + e.width
    };
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.offset = void 0;
    var e = on;
    Object.defineProperty(n, "offset", {
      enumerable: true,
      get: function() {
        return e.offset;
      }
    });
  })(Ui);
  var zi = {}, nn = {};
  Object.defineProperty(nn, "__esModule", {
    value: true
  });
  nn.prepend = ic;
  function ic(n, e) {
    Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
      return n.prepend(t);
    })) : n.prepend(e);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.prepend = void 0;
    var e = nn;
    Object.defineProperty(n, "prepend", {
      enumerable: true,
      get: function() {
        return e.prepend;
      }
    });
  })(zi);
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.prepend = n.offset = n.make = n.isLineBreakTag = n.isSingleTag = n.isNodeEmpty = n.isLeaf = n.isHTMLString = n.isFragment = n.isEmpty = n.isElement = n.isContentEditable = n.isCollapsedWhitespaces = n.findAllInputs = n.isNativeInput = n.allInputsSelector = n.getDeepestNode = n.getDeepestBlockElements = n.getContentLength = n.fragmentToString = n.containsOnlyInlineElements = n.canSetCaret = n.calculateBaseline = n.blockElements = n.append = void 0;
    var e = Co;
    Object.defineProperty(n, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
    var t = We;
    Object.defineProperty(n, "isNativeInput", {
      enumerable: true,
      get: function() {
        return t.isNativeInput;
      }
    });
    var o = Bi;
    Object.defineProperty(n, "append", {
      enumerable: true,
      get: function() {
        return o.append;
      }
    });
    var i = Bo;
    Object.defineProperty(n, "blockElements", {
      enumerable: true,
      get: function() {
        return i.blockElements;
      }
    });
    var s = Mi;
    Object.defineProperty(n, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return s.calculateBaseline;
      }
    });
    var r = Oi;
    Object.defineProperty(n, "canSetCaret", {
      enumerable: true,
      get: function() {
        return r.canSetCaret;
      }
    });
    var l = Vt;
    Object.defineProperty(n, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return l.containsOnlyInlineElements;
      }
    });
    var d = Li;
    Object.defineProperty(n, "fragmentToString", {
      enumerable: true,
      get: function() {
        return d.fragmentToString;
      }
    });
    var h = Ni;
    Object.defineProperty(n, "getContentLength", {
      enumerable: true,
      get: function() {
        return h.getContentLength;
      }
    });
    var g = Fo;
    Object.defineProperty(n, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return g.getDeepestBlockElements;
      }
    });
    var v = Di;
    Object.defineProperty(n, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return v.getDeepestNode;
      }
    });
    var b = ji;
    Object.defineProperty(n, "findAllInputs", {
      enumerable: true,
      get: function() {
        return b.findAllInputs;
      }
    });
    var w = Hi;
    Object.defineProperty(n, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return w.isCollapsedWhitespaces;
      }
    });
    var y = Io;
    Object.defineProperty(n, "isContentEditable", {
      enumerable: true,
      get: function() {
        return y.isContentEditable;
      }
    });
    var T = Yo;
    Object.defineProperty(n, "isElement", {
      enumerable: true,
      get: function() {
        return T.isElement;
      }
    });
    var W = Fi;
    Object.defineProperty(n, "isEmpty", {
      enumerable: true,
      get: function() {
        return W.isEmpty;
      }
    });
    var U = Vi;
    Object.defineProperty(n, "isFragment", {
      enumerable: true,
      get: function() {
        return U.isFragment;
      }
    });
    var q = $i;
    Object.defineProperty(n, "isHTMLString", {
      enumerable: true,
      get: function() {
        return q.isHTMLString;
      }
    });
    var ae = Go;
    Object.defineProperty(n, "isLeaf", {
      enumerable: true,
      get: function() {
        return ae.isLeaf;
      }
    });
    var te = Qo;
    Object.defineProperty(n, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return te.isNodeEmpty;
      }
    });
    var J = Ut;
    Object.defineProperty(n, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return J.isLineBreakTag;
      }
    });
    var re = zt;
    Object.defineProperty(n, "isSingleTag", {
      enumerable: true,
      get: function() {
        return re.isSingleTag;
      }
    });
    var _e3 = $t;
    Object.defineProperty(n, "make", {
      enumerable: true,
      get: function() {
        return _e3.make;
      }
    });
    var O = Ui;
    Object.defineProperty(n, "offset", {
      enumerable: true,
      get: function() {
        return O.offset;
      }
    });
    var S = zi;
    Object.defineProperty(n, "prepend", {
      enumerable: true,
      get: function() {
        return S.prepend;
      }
    });
  })(qe);
  var qt = {};
  Object.defineProperty(qt, "__esModule", {
    value: true
  });
  qt.getContenteditableSlice = rc;
  var sc = qe;
  function rc(n, e, t, o, i) {
    var s;
    i === void 0 && (i = false);
    var r = document.createRange();
    if (o === "left" ? (r.setStart(n, 0), r.setEnd(e, t)) : (r.setStart(e, t), r.setEnd(n, n.childNodes.length)), i === true) {
      var l = r.extractContents();
      return (0, sc.fragmentToString)(l);
    }
    var d = r.cloneContents(), h = document.createElement("div");
    h.appendChild(d);
    var g = (s = h.textContent) !== null && s !== void 0 ? s : "";
    return g;
  }
  Object.defineProperty(Ft, "__esModule", {
    value: true
  });
  Ft.checkContenteditableSliceForEmptiness = cc;
  var ac = qe, lc = qt;
  function cc(n, e, t, o) {
    var i = (0, lc.getContenteditableSlice)(n, e, t, o);
    return (0, ac.isCollapsedWhitespaces)(i);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.checkContenteditableSliceForEmptiness = void 0;
    var e = Ft;
    Object.defineProperty(n, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
  })(xo);
  var qi = {};
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getContenteditableSlice = void 0;
    var e = qt;
    Object.defineProperty(n, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return e.getContenteditableSlice;
      }
    });
  })(qi);
  var Wi = {}, sn = {};
  Object.defineProperty(sn, "__esModule", {
    value: true
  });
  sn.focus = uc;
  var dc = qe;
  function uc(n, e) {
    var t, o;
    if (e === void 0 && (e = true), (0, dc.isNativeInput)(n)) {
      n.focus();
      var i = e ? 0 : n.value.length;
      n.setSelectionRange(i, i);
    } else {
      var s = document.createRange(), r = window.getSelection();
      if (!r) return;
      var l = function(b) {
        var w = document.createTextNode("");
        b.appendChild(w), s.setStart(w, 0), s.setEnd(w, 0);
      }, d = function(b) {
        return b != null;
      }, h = n.childNodes, g = e ? h[0] : h[h.length - 1];
      if (d(g)) {
        for (; d(g) && g.nodeType !== Node.TEXT_NODE; ) g = e ? g.firstChild : g.lastChild;
        if (d(g) && g.nodeType === Node.TEXT_NODE) {
          var v = (o = (t = g.textContent) === null || t === void 0 ? void 0 : t.length) !== null && o !== void 0 ? o : 0, i = e ? 0 : v;
          s.setStart(g, i), s.setEnd(g, i);
        } else l(n);
      } else l(n);
      r.removeAllRanges(), r.addRange(s);
    }
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.focus = void 0;
    var e = sn;
    Object.defineProperty(n, "focus", {
      enumerable: true,
      get: function() {
        return e.focus;
      }
    });
  })(Wi);
  var rn = {}, Wt = {};
  Object.defineProperty(Wt, "__esModule", {
    value: true
  });
  Wt.getCaretNodeAndOffset = hc;
  function hc() {
    var n = window.getSelection();
    if (n === null) return [
      null,
      0
    ];
    var e = n.focusNode, t = n.focusOffset;
    return e === null ? [
      null,
      0
    ] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [
      e,
      t
    ]);
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getCaretNodeAndOffset = void 0;
    var e = Wt;
    Object.defineProperty(n, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return e.getCaretNodeAndOffset;
      }
    });
  })(rn);
  var Yi = {}, Yt = {};
  Object.defineProperty(Yt, "__esModule", {
    value: true
  });
  Yt.getRange = pc;
  function pc() {
    var n = window.getSelection();
    return n && n.rangeCount ? n.getRangeAt(0) : null;
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.getRange = void 0;
    var e = Yt;
    Object.defineProperty(n, "getRange", {
      enumerable: true,
      get: function() {
        return e.getRange;
      }
    });
  })(Yi);
  var Xi = {}, an = {};
  Object.defineProperty(an, "__esModule", {
    value: true
  });
  an.isCaretAtEndOfInput = mc;
  var An = qe, fc = rn, gc = xo;
  function mc(n) {
    var e = (0, An.getDeepestNode)(n, true);
    if (e === null) return true;
    if ((0, An.isNativeInput)(e)) return e.selectionEnd === e.value.length;
    var t = (0, fc.getCaretNodeAndOffset)(), o = t[0], i = t[1];
    return o === null ? false : (0, gc.checkContenteditableSliceForEmptiness)(n, o, i, "right");
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isCaretAtEndOfInput = void 0;
    var e = an;
    Object.defineProperty(n, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtEndOfInput;
      }
    });
  })(Xi);
  var Ki = {}, ln = {};
  Object.defineProperty(ln, "__esModule", {
    value: true
  });
  ln.isCaretAtStartOfInput = yc;
  var xt = qe, vc = Wt, bc = Ft;
  function yc(n) {
    var e = (0, xt.getDeepestNode)(n);
    if (e === null || (0, xt.isEmpty)(n)) return true;
    if ((0, xt.isNativeInput)(e)) return e.selectionEnd === 0;
    if ((0, xt.isEmpty)(n)) return true;
    var t = (0, vc.getCaretNodeAndOffset)(), o = t[0], i = t[1];
    return o === null ? false : (0, bc.checkContenteditableSliceForEmptiness)(n, o, i, "left");
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.isCaretAtStartOfInput = void 0;
    var e = ln;
    Object.defineProperty(n, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtStartOfInput;
      }
    });
  })(Ki);
  var Gi = {}, cn = {};
  Object.defineProperty(cn, "__esModule", {
    value: true
  });
  cn.save = Ec;
  var kc = qe, wc = Yt;
  function Ec() {
    var n = (0, wc.getRange)(), e = (0, kc.make)("span");
    if (e.id = "cursor", e.hidden = true, !!n) return n.insertNode(e), function() {
      var t = window.getSelection();
      t && (n.setStartAfter(e), n.setEndAfter(e), t.removeAllRanges(), t.addRange(n), setTimeout(function() {
        e.remove();
      }, 150));
    };
  }
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.save = void 0;
    var e = cn;
    Object.defineProperty(n, "save", {
      enumerable: true,
      get: function() {
        return e.save;
      }
    });
  })(Gi);
  (function(n) {
    Object.defineProperty(n, "__esModule", {
      value: true
    }), n.save = n.isCaretAtStartOfInput = n.isCaretAtEndOfInput = n.getRange = n.getCaretNodeAndOffset = n.focus = n.getContenteditableSlice = n.checkContenteditableSliceForEmptiness = void 0;
    var e = xo;
    Object.defineProperty(n, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
    var t = qi;
    Object.defineProperty(n, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return t.getContenteditableSlice;
      }
    });
    var o = Wi;
    Object.defineProperty(n, "focus", {
      enumerable: true,
      get: function() {
        return o.focus;
      }
    });
    var i = rn;
    Object.defineProperty(n, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return i.getCaretNodeAndOffset;
      }
    });
    var s = Yi;
    Object.defineProperty(n, "getRange", {
      enumerable: true,
      get: function() {
        return s.getRange;
      }
    });
    var r = Xi;
    Object.defineProperty(n, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return r.isCaretAtEndOfInput;
      }
    });
    var l = Ki;
    Object.defineProperty(n, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return l.isCaretAtStartOfInput;
      }
    });
    var d = Gi;
    Object.defineProperty(n, "save", {
      enumerable: true,
      get: function() {
        return d.save;
      }
    });
  })(_i);
  class xc extends j {
    keydown(e) {
      switch (this.beforeKeydownProcessing(e), e.keyCode) {
        case P.BACKSPACE:
          this.backspace(e);
          break;
        case P.DELETE:
          this.delete(e);
          break;
        case P.ENTER:
          this.enter(e);
          break;
        case P.DOWN:
        case P.RIGHT:
          this.arrowRightAndDown(e);
          break;
        case P.UP:
        case P.LEFT:
          this.arrowLeftAndUp(e);
          break;
        case P.TAB:
          this.tabPressed(e);
          break;
      }
      e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(e), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
    }
    beforeKeydownProcessing(e) {
      this.needToolbarClosing(e) && Gn(e.keyCode) && (this.Editor.Toolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
    }
    keyup(e) {
      e.shiftKey || this.Editor.UI.checkEmptiness();
    }
    dragOver(e) {
      const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
      t.dropTarget = true;
    }
    dragLeave(e) {
      const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
      t.dropTarget = false;
    }
    handleCommandC(e) {
      const { BlockSelection: t } = this.Editor;
      t.anyBlockSelected && t.copySelectedBlocks(e);
    }
    handleCommandX(e) {
      const { BlockSelection: t, BlockManager: o, Caret: i } = this.Editor;
      t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
        const s = o.removeSelectedBlocks(), r = o.insertDefaultBlockAtIndex(s, true);
        i.setToBlock(r, i.positions.START), t.clearSelection(e);
      });
    }
    tabPressed(e) {
      const { InlineToolbar: t, Caret: o } = this.Editor;
      t.opened || (e.shiftKey ? o.navigatePrevious(true) : o.navigateNext(true)) && e.preventDefault();
    }
    commandSlashPressed() {
      this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
    }
    slashPressed(e) {
      this.Editor.BlockManager.currentBlock.isEmpty && (e.preventDefault(), this.Editor.Caret.insertContentAtCaretPosition("/"), this.activateToolbox());
    }
    enter(e) {
      const { BlockManager: t, UI: o } = this.Editor, i = t.currentBlock;
      if (i === void 0 || i.tool.isLineBreaksEnabled || o.someToolbarOpened && o.someFlipperButtonFocused || e.shiftKey && !lo) return;
      let s = i;
      i.currentInput !== void 0 && St(i.currentInput) && !i.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : i.currentInput && _t(i.currentInput) ? s = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : s = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(s), this.Editor.Toolbar.moveAndOpen(s), e.preventDefault();
    }
    backspace(e) {
      const { BlockManager: t, Caret: o } = this.Editor, { currentBlock: i, previousBlock: s } = t;
      if (!(i === void 0 || !M.isCollapsed || !i.currentInput || !St(i.currentInput))) {
        if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.firstInput) {
          o.navigatePrevious();
          return;
        }
        if (s !== null) {
          if (s.isEmpty) {
            t.removeBlock(s);
            return;
          }
          if (i.isEmpty) {
            t.removeBlock(i);
            const r = t.currentBlock;
            o.setToBlock(r, o.positions.END);
            return;
          }
          Tn(s, i) ? this.mergeBlocks(s, i) : o.setToBlock(s, o.positions.END);
        }
      }
    }
    delete(e) {
      const { BlockManager: t, Caret: o } = this.Editor, { currentBlock: i, nextBlock: s } = t;
      if (!(!M.isCollapsed || !_t(i.currentInput))) {
        if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.lastInput) {
          o.navigateNext();
          return;
        }
        if (s !== null) {
          if (s.isEmpty) {
            t.removeBlock(s);
            return;
          }
          if (i.isEmpty) {
            t.removeBlock(i), o.setToBlock(s, o.positions.START);
            return;
          }
          Tn(i, s) ? this.mergeBlocks(i, s) : o.setToBlock(s, o.positions.START);
        }
      }
    }
    mergeBlocks(e, t) {
      const { BlockManager: o, Toolbar: i } = this.Editor;
      e.lastInput !== void 0 && (_i.focus(e.lastInput, false), o.mergeBlocks(e, t).then(() => {
        i.close();
      }));
    }
    arrowRightAndDown(e) {
      const t = ze.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === P.TAB);
      if (this.Editor.UI.someToolbarOpened && t) return;
      this.Editor.Toolbar.close();
      const { currentBlock: o } = this.Editor.BlockManager, i = ((o == null ? void 0 : o.currentInput) !== void 0 ? _t(o.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
      if (e.shiftKey && e.keyCode === P.DOWN && i) {
        this.Editor.CrossBlockSelection.toggleBlockSelectedState();
        return;
      }
      if (e.keyCode === P.DOWN || e.keyCode === P.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
        e.preventDefault();
        return;
      }
      Mt(() => {
        this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
      }, 20)(), this.Editor.BlockSelection.clearSelection(e);
    }
    arrowLeftAndUp(e) {
      if (this.Editor.UI.someToolbarOpened) {
        if (ze.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === P.TAB)) return;
        this.Editor.UI.closeAllToolbars();
      }
      this.Editor.Toolbar.close();
      const { currentBlock: t } = this.Editor.BlockManager, o = ((t == null ? void 0 : t.currentInput) !== void 0 ? St(t.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
      if (e.shiftKey && e.keyCode === P.UP && o) {
        this.Editor.CrossBlockSelection.toggleBlockSelectedState(false);
        return;
      }
      if (e.keyCode === P.UP || e.keyCode === P.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
        e.preventDefault();
        return;
      }
      Mt(() => {
        this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
      }, 20)(), this.Editor.BlockSelection.clearSelection(e);
    }
    needToolbarClosing(e) {
      const t = e.keyCode === P.ENTER && this.Editor.Toolbar.toolbox.opened, o = e.keyCode === P.ENTER && this.Editor.BlockSettings.opened, i = e.keyCode === P.ENTER && this.Editor.InlineToolbar.opened, s = e.keyCode === P.TAB;
      return !(e.shiftKey || s || t || o || i);
    }
    activateToolbox() {
      this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
    }
    activateBlockSettings() {
      this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
    }
  }
  class io {
    constructor(e) {
      this.blocks = [], this.workingArea = e;
    }
    get length() {
      return this.blocks.length;
    }
    get array() {
      return this.blocks;
    }
    get nodes() {
      return Zn(this.workingArea.children);
    }
    static set(e, t, o) {
      return isNaN(Number(t)) ? (Reflect.set(e, t, o), true) : (e.insert(+t, o), true);
    }
    static get(e, t) {
      return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
    }
    push(e) {
      this.blocks.push(e), this.insertToDOM(e);
    }
    swap(e, t) {
      const o = this.blocks[t];
      k.swap(this.blocks[e].holder, o.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = o;
    }
    move(e, t) {
      const o = this.blocks.splice(t, 1)[0], i = e - 1, s = Math.max(0, i), r = this.blocks[s];
      e > 0 ? this.insertToDOM(o, "afterend", r) : this.insertToDOM(o, "beforebegin", r), this.blocks.splice(e, 0, o);
      const l = this.composeBlockEvent("move", {
        fromIndex: t,
        toIndex: e
      });
      o.call(Ae.MOVED, l);
    }
    insert(e, t, o = false) {
      if (!this.length) {
        this.push(t);
        return;
      }
      e > this.length && (e = this.length), o && (this.blocks[e].holder.remove(), this.blocks[e].call(Ae.REMOVED));
      const i = o ? 1 : 0;
      if (this.blocks.splice(e, i, t), e > 0) {
        const s = this.blocks[e - 1];
        this.insertToDOM(t, "afterend", s);
      } else {
        const s = this.blocks[e + 1];
        s ? this.insertToDOM(t, "beforebegin", s) : this.insertToDOM(t);
      }
    }
    replace(e, t) {
      if (this.blocks[e] === void 0) throw Error("Incorrect index");
      this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
    }
    insertMany(e, t) {
      const o = new DocumentFragment();
      for (const i of e) o.appendChild(i.holder);
      if (this.length > 0) {
        if (t > 0) {
          const i = Math.min(t - 1, this.length - 1);
          this.blocks[i].holder.after(o);
        } else t === 0 && this.workingArea.prepend(o);
        this.blocks.splice(t, 0, ...e);
      } else this.blocks.push(...e), this.workingArea.appendChild(o);
      e.forEach((i) => i.call(Ae.RENDERED));
    }
    remove(e) {
      isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(Ae.REMOVED), this.blocks.splice(e, 1);
    }
    removeAll() {
      this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(Ae.REMOVED)), this.blocks.length = 0;
    }
    insertAfter(e, t) {
      const o = this.blocks.indexOf(e);
      this.insert(o + 1, t);
    }
    get(e) {
      return this.blocks[e];
    }
    indexOf(e) {
      return this.blocks.indexOf(e);
    }
    insertToDOM(e, t, o) {
      t ? o.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(Ae.RENDERED);
    }
    composeBlockEvent(e, t) {
      return new CustomEvent(e, {
        detail: t
      });
    }
  }
  const In = "block-removed", Ln = "block-added", Cc = "block-moved", Nn = "block-changed";
  class Tc {
    constructor() {
      this.completed = Promise.resolve();
    }
    add(e) {
      return new Promise((t, o) => {
        this.completed = this.completed.then(e).then(t).catch(o);
      });
    }
  }
  class Sc extends j {
    constructor() {
      super(...arguments), this._currentBlockIndex = -1, this._blocks = null;
    }
    get currentBlockIndex() {
      return this._currentBlockIndex;
    }
    set currentBlockIndex(e) {
      this._currentBlockIndex = e;
    }
    get firstBlock() {
      return this._blocks[0];
    }
    get lastBlock() {
      return this._blocks[this._blocks.length - 1];
    }
    get currentBlock() {
      return this._blocks[this.currentBlockIndex];
    }
    set currentBlock(e) {
      this.currentBlockIndex = this.getBlockIndex(e);
    }
    get nextBlock() {
      return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
    }
    get nextContentfulBlock() {
      return this.blocks.slice(this.currentBlockIndex + 1).find((e) => !!e.inputs.length);
    }
    get previousContentfulBlock() {
      return this.blocks.slice(0, this.currentBlockIndex).reverse().find((e) => !!e.inputs.length);
    }
    get previousBlock() {
      return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
    }
    get blocks() {
      return this._blocks.array;
    }
    get isEditorEmpty() {
      return this.blocks.every((e) => e.isEmpty);
    }
    prepare() {
      const e = new io(this.Editor.UI.nodes.redactor);
      this._blocks = new Proxy(e, {
        set: io.set,
        get: io.get
      }), this.listeners.on(document, "copy", (t) => this.Editor.BlockEvents.handleCommandC(t));
    }
    toggleReadOnly(e) {
      e ? this.disableModuleBindings() : this.enableModuleBindings();
    }
    composeBlock({ tool: e, data: t = {}, id: o = void 0, tunes: i = {} }) {
      const s = this.Editor.ReadOnly.isEnabled, r = this.Editor.Tools.blockTools.get(e), l = new ce({
        id: o,
        data: t,
        tool: r,
        api: this.Editor.API,
        readOnly: s,
        tunesData: i
      }, this.eventsDispatcher);
      return s || window.requestIdleCallback(() => {
        this.bindBlockEvents(l);
      }, {
        timeout: 2e3
      }), l;
    }
    insert({ id: e = void 0, tool: t = this.config.defaultBlock, data: o = {}, index: i, needToFocus: s = true, replace: r = false, tunes: l = {} } = {}) {
      let d = i;
      d === void 0 && (d = this.currentBlockIndex + (r ? 0 : 1));
      const h = this.composeBlock({
        id: e,
        tool: t,
        data: o,
        tunes: l
      });
      return r && this.blockDidMutated(In, this.getBlockByIndex(d), {
        index: d
      }), this._blocks.insert(d, h, r), this.blockDidMutated(Ln, h, {
        index: d
      }), s ? this.currentBlockIndex = d : d <= this.currentBlockIndex && this.currentBlockIndex++, h;
    }
    insertMany(e, t = 0) {
      this._blocks.insertMany(e, t);
    }
    async update(e, t, o) {
      if (!t && !o) return e;
      const i = await e.data, s = this.composeBlock({
        id: e.id,
        tool: e.name,
        data: Object.assign({}, i, t ?? {}),
        tunes: o ?? e.tunes
      }), r = this.getBlockIndex(e);
      return this._blocks.replace(r, s), this.blockDidMutated(Nn, s, {
        index: r
      }), s;
    }
    replace(e, t, o) {
      const i = this.getBlockIndex(e);
      return this.insert({
        tool: t,
        data: o,
        index: i,
        replace: true
      });
    }
    paste(e, t, o = false) {
      const i = this.insert({
        tool: e,
        replace: o
      });
      try {
        window.requestIdleCallback(() => {
          i.call(Ae.ON_PASTE, t);
        });
      } catch (s) {
        z(`${e}: onPaste callback call is failed`, "error", s);
      }
      return i;
    }
    insertDefaultBlockAtIndex(e, t = false) {
      const o = this.composeBlock({
        tool: this.config.defaultBlock
      });
      return this._blocks[e] = o, this.blockDidMutated(Ln, o, {
        index: e
      }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, o;
    }
    insertAtEnd() {
      return this.currentBlockIndex = this.blocks.length - 1, this.insert();
    }
    async mergeBlocks(e, t) {
      let o;
      if (e.name === t.name && e.mergeable) {
        const i = await t.data;
        if (Ee(i)) {
          console.error("Could not merge Block. Failed to extract original Block data.");
          return;
        }
        const [s] = mo([
          i
        ], e.tool.sanitizeConfig);
        o = s;
      } else if (e.mergeable && At(t, "export") && At(e, "import")) {
        const i = await t.exportDataAsString(), s = Te(i, e.tool.sanitizeConfig);
        o = Sn(s, e.tool.conversionConfig);
      }
      o !== void 0 && (await e.mergeWith(o), this.removeBlock(t), this.currentBlockIndex = this._blocks.indexOf(e));
    }
    removeBlock(e, t = true) {
      return new Promise((o) => {
        const i = this._blocks.indexOf(e);
        if (!this.validateIndex(i)) throw new Error("Can't find a Block to remove");
        e.destroy(), this._blocks.remove(i), this.blockDidMutated(In, e, {
          index: i
        }), this.currentBlockIndex >= i && this.currentBlockIndex--, this.blocks.length ? i === 0 && (this.currentBlockIndex = 0) : (this.unsetCurrentBlock(), t && this.insert()), o();
      });
    }
    removeSelectedBlocks() {
      let e;
      for (let t = this.blocks.length - 1; t >= 0; t--) this.blocks[t].selected && (this.removeBlock(this.blocks[t]), e = t);
      return e;
    }
    removeAllBlocks() {
      for (let e = this.blocks.length - 1; e >= 0; e--) this._blocks.remove(e);
      this.unsetCurrentBlock(), this.insert(), this.currentBlock.firstInput.focus();
    }
    split() {
      const e = this.Editor.Caret.extractFragmentFromCaretPosition(), t = k.make("div");
      t.appendChild(e);
      const o = {
        text: k.isEmpty(t) ? "" : t.innerHTML
      };
      return this.insert({
        data: o
      });
    }
    getBlockByIndex(e) {
      return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
    }
    getBlockIndex(e) {
      return this._blocks.indexOf(e);
    }
    getBlockById(e) {
      return this._blocks.array.find((t) => t.id === e);
    }
    getBlock(e) {
      k.isElement(e) || (e = e.parentNode);
      const t = this._blocks.nodes, o = e.closest(`.${ce.CSS.wrapper}`), i = t.indexOf(o);
      if (i >= 0) return this._blocks[i];
    }
    setCurrentBlockByChildNode(e) {
      k.isElement(e) || (e = e.parentNode);
      const t = e.closest(`.${ce.CSS.wrapper}`);
      if (!t) return;
      const o = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
      if (o != null && o.isEqualNode(this.Editor.UI.nodes.wrapper)) return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
    }
    getBlockByChildNode(e) {
      if (!e || !(e instanceof Node)) return;
      k.isElement(e) || (e = e.parentNode);
      const t = e.closest(`.${ce.CSS.wrapper}`);
      return this.blocks.find((o) => o.holder === t);
    }
    swap(e, t) {
      this._blocks.swap(e, t), this.currentBlockIndex = t;
    }
    move(e, t = this.currentBlockIndex) {
      if (isNaN(e) || isNaN(t)) {
        z("Warning during 'move' call: incorrect indices provided.", "warn");
        return;
      }
      if (!this.validateIndex(e) || !this.validateIndex(t)) {
        z("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
        return;
      }
      this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(Cc, this.currentBlock, {
        fromIndex: t,
        toIndex: e
      });
    }
    async convert(e, t, o) {
      if (!await e.save()) throw new Error("Could not convert Block. Failed to extract original Block data.");
      const i = this.Editor.Tools.blockTools.get(t);
      if (!i) throw new Error(`Could not convert Block. Tool \xAB${t}\xBB not found.`);
      const s = await e.exportDataAsString(), r = Te(s, i.sanitizeConfig);
      let l = Sn(r, i.conversionConfig, i.settings);
      return o && (l = Object.assign(l, o)), this.replace(e, i.name, l);
    }
    unsetCurrentBlock() {
      this.currentBlockIndex = -1;
    }
    async clear(e = false) {
      const t = new Tc();
      this.blocks.forEach((o) => {
        t.add(async () => {
          await this.removeBlock(o, false);
        });
      }), await t.completed, this.unsetCurrentBlock(), e && this.insert(), this.Editor.UI.checkEmptiness();
    }
    async destroy() {
      await Promise.all(this.blocks.map((e) => e.destroy()));
    }
    bindBlockEvents(e) {
      const { BlockEvents: t } = this.Editor;
      this.readOnlyMutableListeners.on(e.holder, "keydown", (o) => {
        t.keydown(o);
      }), this.readOnlyMutableListeners.on(e.holder, "keyup", (o) => {
        t.keyup(o);
      }), this.readOnlyMutableListeners.on(e.holder, "dragover", (o) => {
        t.dragOver(o);
      }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (o) => {
        t.dragLeave(o);
      }), e.on("didMutated", (o) => this.blockDidMutated(Nn, o, {
        index: this.getBlockIndex(o)
      }));
    }
    disableModuleBindings() {
      this.readOnlyMutableListeners.clearAll();
    }
    enableModuleBindings() {
      this.readOnlyMutableListeners.on(document, "cut", (e) => this.Editor.BlockEvents.handleCommandX(e)), this.blocks.forEach((e) => {
        this.bindBlockEvents(e);
      });
    }
    validateIndex(e) {
      return !(e < 0 || e >= this._blocks.length);
    }
    blockDidMutated(e, t, o) {
      const i = new CustomEvent(e, {
        detail: {
          target: new Oe(t),
          ...o
        }
      });
      return this.eventsDispatcher.emit(ni, {
        event: i
      }), t;
    }
  }
  class _c extends j {
    constructor() {
      super(...arguments), this.anyBlockSelectedCache = null, this.needToSelectAll = false, this.nativeInputSelected = false, this.readyToBlockSelection = false;
    }
    get sanitizerConfig() {
      return {
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        ol: {},
        ul: {},
        li: {},
        br: true,
        img: {
          src: true,
          width: true,
          height: true
        },
        a: {
          href: true
        },
        b: {},
        i: {},
        u: {}
      };
    }
    get allBlocksSelected() {
      const { BlockManager: e } = this.Editor;
      return e.blocks.every((t) => t.selected === true);
    }
    set allBlocksSelected(e) {
      const { BlockManager: t } = this.Editor;
      t.blocks.forEach((o) => {
        o.selected = e;
      }), this.clearCache();
    }
    get anyBlockSelected() {
      const { BlockManager: e } = this.Editor;
      return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some((t) => t.selected === true)), this.anyBlockSelectedCache;
    }
    get selectedBlocks() {
      return this.Editor.BlockManager.blocks.filter((e) => e.selected);
    }
    prepare() {
      this.selection = new M(), et.add({
        name: "CMD+A",
        handler: (e) => {
          const { BlockManager: t, ReadOnly: o } = this.Editor;
          if (o.isEnabled) {
            e.preventDefault(), this.selectAllBlocks();
            return;
          }
          t.currentBlock && this.handleCommandA(e);
        },
        on: this.Editor.UI.nodes.redactor
      });
    }
    toggleReadOnly() {
      M.get().removeAllRanges(), this.allBlocksSelected = false;
    }
    unSelectBlockByIndex(e) {
      const { BlockManager: t } = this.Editor;
      let o;
      isNaN(e) ? o = t.currentBlock : o = t.getBlockByIndex(e), o.selected = false, this.clearCache();
    }
    clearSelection(e, t = false) {
      const { BlockManager: o, Caret: i, RectangleSelection: s } = this.Editor;
      this.needToSelectAll = false, this.nativeInputSelected = false, this.readyToBlockSelection = false;
      const r = e && e instanceof KeyboardEvent, l = r && Gn(e.keyCode);
      if (this.anyBlockSelected && r && l && !M.isSelectionExists) {
        const d = o.removeSelectedBlocks();
        o.insertDefaultBlockAtIndex(d, true), i.setToBlock(o.currentBlock), Mt(() => {
          const h = e.key;
          i.insertContentAtCaretPosition(h.length > 1 ? "" : h);
        }, 20)();
      }
      if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || s.isRectActivated()) {
        this.Editor.RectangleSelection.clearSelection();
        return;
      }
      t && this.selection.restore(), this.allBlocksSelected = false;
    }
    copySelectedBlocks(e) {
      e.preventDefault();
      const t = k.make("div");
      this.selectedBlocks.forEach((s) => {
        const r = Te(s.holder.innerHTML, this.sanitizerConfig), l = k.make("p");
        l.innerHTML = r, t.appendChild(l);
      });
      const o = Array.from(t.childNodes).map((s) => s.textContent).join(`

`), i = t.innerHTML;
      return e.clipboardData.setData("text/plain", o), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((s) => s.save())).then((s) => {
        try {
          e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(s));
        } catch {
        }
      });
    }
    selectBlockByIndex(e) {
      const { BlockManager: t } = this.Editor, o = t.getBlockByIndex(e);
      o !== void 0 && this.selectBlock(o);
    }
    selectBlock(e) {
      this.selection.save(), M.get().removeAllRanges(), e.selected = true, this.clearCache(), this.Editor.InlineToolbar.close();
    }
    unselectBlock(e) {
      e.selected = false, this.clearCache();
    }
    clearCache() {
      this.anyBlockSelectedCache = null;
    }
    destroy() {
      et.remove(this.Editor.UI.nodes.redactor, "CMD+A");
    }
    handleCommandA(e) {
      if (this.Editor.RectangleSelection.clearSelection(), k.isNativeInput(e.target) && !this.readyToBlockSelection) {
        this.readyToBlockSelection = true;
        return;
      }
      const t = this.Editor.BlockManager.getBlock(e.target), o = t.inputs;
      if (o.length > 1 && !this.readyToBlockSelection) {
        this.readyToBlockSelection = true;
        return;
      }
      if (o.length === 1 && !this.needToSelectAll) {
        this.needToSelectAll = true;
        return;
      }
      this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = false, this.readyToBlockSelection = false) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = true);
    }
    selectAllBlocks() {
      this.selection.save(), M.get().removeAllRanges(), this.allBlocksSelected = true, this.Editor.InlineToolbar.close();
    }
  }
  class Dt extends j {
    get positions() {
      return {
        START: "start",
        END: "end",
        DEFAULT: "default"
      };
    }
    static get CSS() {
      return {
        shadowCaret: "cdx-shadow-caret"
      };
    }
    setToBlock(e, t = this.positions.DEFAULT, o = 0) {
      var i;
      const { BlockManager: s, BlockSelection: r } = this.Editor;
      if (r.clearSelection(), !e.focusable) {
        (i = window.getSelection()) == null || i.removeAllRanges(), r.selectBlock(e), s.currentBlock = e;
        return;
      }
      let l;
      switch (t) {
        case this.positions.START:
          l = e.firstInput;
          break;
        case this.positions.END:
          l = e.lastInput;
          break;
        default:
          l = e.currentInput;
      }
      if (!l) return;
      const d = k.getDeepestNode(l, t === this.positions.END), h = k.getContentLength(d);
      switch (true) {
        case t === this.positions.START:
          o = 0;
          break;
        case t === this.positions.END:
        case o > h:
          o = h;
          break;
      }
      this.set(d, o), s.setCurrentBlockByChildNode(e.holder), s.currentBlock.currentInput = l;
    }
    setToInput(e, t = this.positions.DEFAULT, o = 0) {
      const { currentBlock: i } = this.Editor.BlockManager, s = k.getDeepestNode(e);
      switch (t) {
        case this.positions.START:
          this.set(s, 0);
          break;
        case this.positions.END:
          this.set(s, k.getContentLength(s));
          break;
        default:
          o && this.set(s, o);
      }
      i.currentInput = e;
    }
    set(e, t = 0) {
      const { top: o, bottom: i } = M.setCursor(e, t), { innerHeight: s } = window;
      o < 0 ? window.scrollBy(0, o - 30) : i > s && window.scrollBy(0, i - s + 30);
    }
    setToTheLastBlock() {
      const e = this.Editor.BlockManager.lastBlock;
      if (e) if (e.tool.isDefault && e.isEmpty) this.setToBlock(e);
      else {
        const t = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(t);
      }
    }
    extractFragmentFromCaretPosition() {
      const e = M.get();
      if (e.rangeCount) {
        const t = e.getRangeAt(0), o = this.Editor.BlockManager.currentBlock.currentInput;
        if (t.deleteContents(), o) if (k.isNativeInput(o)) {
          const i = o, s = document.createDocumentFragment(), r = i.value.substring(0, i.selectionStart), l = i.value.substring(i.selectionStart);
          return s.textContent = l, i.value = r, s;
        } else {
          const i = t.cloneRange();
          return i.selectNodeContents(o), i.setStart(t.endContainer, t.endOffset), i.extractContents();
        }
      }
    }
    navigateNext(e = false) {
      const { BlockManager: t } = this.Editor, { currentBlock: o, nextBlock: i } = t;
      if (o === void 0) return false;
      const { nextInput: s, currentInput: r } = o, l = r !== void 0 ? _t(r) : void 0;
      let d = i;
      const h = e || l || !o.focusable;
      if (s && h) return this.setToInput(s, this.positions.START), true;
      if (d === null) {
        if (o.tool.isDefault || !h) return false;
        d = t.insertAtEnd();
      }
      return h ? (this.setToBlock(d, this.positions.START), true) : false;
    }
    navigatePrevious(e = false) {
      const { currentBlock: t, previousBlock: o } = this.Editor.BlockManager;
      if (!t) return false;
      const { previousInput: i, currentInput: s } = t, r = s !== void 0 ? St(s) : void 0, l = e || r || !t.focusable;
      return i && l ? (this.setToInput(i, this.positions.END), true) : o !== null && l ? (this.setToBlock(o, this.positions.END), true) : false;
    }
    createShadow(e) {
      const t = document.createElement("span");
      t.classList.add(Dt.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
    }
    restoreCaret(e) {
      const t = e.querySelector(`.${Dt.CSS.shadowCaret}`);
      if (!t) return;
      new M().expandToTag(t);
      const o = document.createRange();
      o.selectNode(t), o.extractContents();
    }
    insertContentAtCaretPosition(e) {
      const t = document.createDocumentFragment(), o = document.createElement("div"), i = M.get(), s = M.range;
      o.innerHTML = e, Array.from(o.childNodes).forEach((h) => t.appendChild(h)), t.childNodes.length === 0 && t.appendChild(new Text());
      const r = t.lastChild;
      s.deleteContents(), s.insertNode(t);
      const l = document.createRange(), d = r.nodeType === Node.TEXT_NODE ? r : r.firstChild;
      d !== null && d.textContent !== null && l.setStart(d, d.textContent.length), i.removeAllRanges(), i.addRange(l);
    }
  }
  class Bc extends j {
    constructor() {
      super(...arguments), this.onMouseUp = () => {
        this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
      }, this.onMouseOver = (e) => {
        const { BlockManager: t, BlockSelection: o } = this.Editor;
        if (e.relatedTarget === null && e.target === null) return;
        const i = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, s = t.getBlockByChildNode(e.target);
        if (!(!i || !s) && s !== i) {
          if (i === this.firstSelectedBlock) {
            M.get().removeAllRanges(), i.selected = true, s.selected = true, o.clearCache();
            return;
          }
          if (s === this.firstSelectedBlock) {
            i.selected = false, s.selected = false, o.clearCache();
            return;
          }
          this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(i, s), this.lastSelectedBlock = s;
        }
      };
    }
    async prepare() {
      this.listeners.on(document, "mousedown", (e) => {
        this.enableCrossBlockSelection(e);
      });
    }
    watchSelection(e) {
      if (e.button !== gr.LEFT) return;
      const { BlockManager: t } = this.Editor;
      this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
    }
    get isCrossBlockSelectionStarted() {
      return !!this.firstSelectedBlock && !!this.lastSelectedBlock && this.firstSelectedBlock !== this.lastSelectedBlock;
    }
    toggleBlockSelectedState(e = true) {
      const { BlockManager: t, BlockSelection: o } = this.Editor;
      this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = true, o.clearCache(), M.get().removeAllRanges());
      const i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), s = t.blocks[i];
      s && (this.lastSelectedBlock.selected !== s.selected ? (s.selected = true, o.clearCache()) : (this.lastSelectedBlock.selected = false, o.clearCache()), this.lastSelectedBlock = s, this.Editor.InlineToolbar.close(), s.holder.scrollIntoView({
        block: "nearest"
      }));
    }
    clear(e) {
      const { BlockManager: t, BlockSelection: o, Caret: i } = this.Editor, s = t.blocks.indexOf(this.firstSelectedBlock), r = t.blocks.indexOf(this.lastSelectedBlock);
      if (o.anyBlockSelected && s > -1 && r > -1 && e && e instanceof KeyboardEvent) switch (e.keyCode) {
        case P.DOWN:
        case P.RIGHT:
          i.setToBlock(t.blocks[Math.max(s, r)], i.positions.END);
          break;
        case P.UP:
        case P.LEFT:
          i.setToBlock(t.blocks[Math.min(s, r)], i.positions.START);
          break;
        default:
          i.setToBlock(t.blocks[Math.max(s, r)], i.positions.END);
      }
      this.firstSelectedBlock = this.lastSelectedBlock = null;
    }
    enableCrossBlockSelection(e) {
      const { UI: t } = this.Editor;
      M.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
    }
    toggleBlocksSelectedState(e, t) {
      const { BlockManager: o, BlockSelection: i } = this.Editor, s = o.blocks.indexOf(e), r = o.blocks.indexOf(t), l = e.selected !== t.selected;
      for (let d = Math.min(s, r); d <= Math.max(s, r); d++) {
        const h = o.blocks[d];
        h !== this.firstSelectedBlock && h !== (l ? e : t) && (o.blocks[d].selected = !o.blocks[d].selected, i.clearCache());
      }
    }
  }
  class Mc extends j {
    constructor() {
      super(...arguments), this.isStartedAtEditor = false;
    }
    toggleReadOnly(e) {
      e ? this.disableModuleBindings() : this.enableModuleBindings();
    }
    enableModuleBindings() {
      const { UI: e } = this.Editor;
      this.readOnlyMutableListeners.on(e.nodes.holder, "drop", async (t) => {
        await this.processDrop(t);
      }, true), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", () => {
        this.processDragStart();
      }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", (t) => {
        this.processDragOver(t);
      }, true);
    }
    disableModuleBindings() {
      this.readOnlyMutableListeners.clearAll();
    }
    async processDrop(e) {
      const { BlockManager: t, Paste: o, Caret: i } = this.Editor;
      e.preventDefault(), t.blocks.forEach((r) => {
        r.dropTarget = false;
      }), M.isAtEditor && !M.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = false;
      const s = t.setCurrentBlockByChildNode(e.target);
      if (s) this.Editor.Caret.setToBlock(s, i.positions.END);
      else {
        const r = t.setCurrentBlockByChildNode(t.lastBlock.holder);
        this.Editor.Caret.setToBlock(r, i.positions.END);
      }
      await o.processDataTransfer(e.dataTransfer, true);
    }
    processDragStart() {
      M.isAtEditor && !M.isCollapsed && (this.isStartedAtEditor = true), this.Editor.InlineToolbar.close();
    }
    processDragOver(e) {
      e.preventDefault();
    }
  }
  const Oc = 180, Ac = 400;
  class Ic extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.disabled = false, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = Ac, this.mutationObserver = new MutationObserver((o) => {
        this.redactorChanged(o);
      }), this.eventsDispatcher.on(ni, (o) => {
        this.particularBlockChanged(o.event);
      }), this.eventsDispatcher.on(ii, () => {
        this.disable();
      }), this.eventsDispatcher.on(si, () => {
        this.enable();
      });
    }
    enable() {
      this.mutationObserver.observe(this.Editor.UI.nodes.redactor, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      }), this.disabled = false;
    }
    disable() {
      this.mutationObserver.disconnect(), this.disabled = true;
    }
    particularBlockChanged(e) {
      this.disabled || !Q(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
        let t;
        this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
      }, this.batchTime));
    }
    redactorChanged(e) {
      this.eventsDispatcher.emit(co, {
        mutations: e
      });
    }
  }
  const Zi = class Qi extends j {
    constructor() {
      super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (e) => {
        try {
          const t = e.create({}, {}, false);
          if (e.pasteConfig === false) {
            this.exceptionList.push(e.name);
            return;
          }
          if (!Q(t.onPaste)) return;
          this.getTagsConfig(e), this.getFilesConfig(e), this.getPatternsConfig(e);
        } catch (t) {
          z(`Paste handling for \xAB${e.name}\xBB Tool hasn't been set up because of the error`, "warn", t);
        }
      }, this.handlePasteEvent = async (e) => {
        const { BlockManager: t, Toolbar: o } = this.Editor, i = t.setCurrentBlockByChildNode(e.target);
        !i || this.isNativeBehaviour(e.target) && !e.clipboardData.types.includes("Files") || i && this.exceptionList.includes(i.name) || (e.preventDefault(), this.processDataTransfer(e.clipboardData), o.close());
      };
    }
    async prepare() {
      this.processTools();
    }
    toggleReadOnly(e) {
      e ? this.unsetCallback() : this.setCallback();
    }
    async processDataTransfer(e, t = false) {
      const { Tools: o } = this.Editor, i = e.types;
      if ((i.includes ? i.includes("Files") : i.contains("Files")) && !Ee(this.toolsFiles)) {
        await this.processFiles(e.files);
        return;
      }
      const s = e.getData(this.MIME_TYPE), r = e.getData("text/plain");
      let l = e.getData("text/html");
      if (s) try {
        this.insertEditorJSData(JSON.parse(s));
        return;
      } catch {
      }
      t && r.trim() && l.trim() && (l = "<p>" + (l.trim() ? l : r) + "</p>");
      const d = Object.keys(this.toolsTags).reduce((v, b) => (v[b.toLowerCase()] = this.toolsTags[b].sanitizationConfig ?? {}, v), {}), h = Object.assign({}, d, o.getAllInlineToolsSanitizeConfig(), {
        br: {}
      }), g = Te(l, h);
      !g.trim() || g.trim() === r || !k.isHTMLString(g) ? await this.processText(r) : await this.processText(g, true);
    }
    async processText(e, t = false) {
      const { Caret: o, BlockManager: i } = this.Editor, s = t ? this.processHTML(e) : this.processPlain(e);
      if (!s.length) return;
      if (s.length === 1) {
        s[0].isBlock ? this.processSingleBlock(s.pop()) : this.processInlinePaste(s.pop());
        return;
      }
      const r = i.currentBlock && i.currentBlock.tool.isDefault && i.currentBlock.isEmpty;
      s.map(async (l, d) => this.insertBlock(l, d === 0 && r)), i.currentBlock && o.setToBlock(i.currentBlock, o.positions.END);
    }
    setCallback() {
      this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
    }
    unsetCallback() {
      this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
    }
    processTools() {
      const e = this.Editor.Tools.blockTools;
      Array.from(e.values()).forEach(this.processTool);
    }
    collectTagNames(e) {
      return Ie(e) ? [
        e
      ] : de(e) ? Object.keys(e) : [];
    }
    getTagsConfig(e) {
      if (e.pasteConfig === false) return;
      const t = e.pasteConfig.tags || [], o = [];
      t.forEach((i) => {
        const s = this.collectTagNames(i);
        o.push(...s), s.forEach((r) => {
          if (Object.prototype.hasOwnProperty.call(this.toolsTags, r)) {
            z(`Paste handler for \xAB${e.name}\xBB Tool on \xAB${r}\xBB tag is skipped because it is already used by \xAB${this.toolsTags[r].tool.name}\xBB Tool.`, "warn");
            return;
          }
          const l = de(i) ? i[r] : null;
          this.toolsTags[r.toUpperCase()] = {
            tool: e,
            sanitizationConfig: l
          };
        });
      }), this.tagsByTool[e.name] = o.map((i) => i.toUpperCase());
    }
    getFilesConfig(e) {
      if (e.pasteConfig === false) return;
      const { files: t = {} } = e.pasteConfig;
      let { extensions: o, mimeTypes: i } = t;
      !o && !i || (o && !Array.isArray(o) && (z(`\xABextensions\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), o = []), i && !Array.isArray(i) && (z(`\xABmimeTypes\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), i = []), i && (i = i.filter((s) => kr(s) ? true : (z(`MIME type value \xAB${s}\xBB for the \xAB${e.name}\xBB Tool is not a valid MIME type`, "warn"), false))), this.toolsFiles[e.name] = {
        extensions: o || [],
        mimeTypes: i || []
      });
    }
    getPatternsConfig(e) {
      e.pasteConfig === false || !e.pasteConfig.patterns || Ee(e.pasteConfig.patterns) || Object.entries(e.pasteConfig.patterns).forEach(([t, o]) => {
        o instanceof RegExp || z(`Pattern ${o} for \xAB${e.name}\xBB Tool is skipped because it should be a Regexp instance.`, "warn"), this.toolsPatterns.push({
          key: t,
          pattern: o,
          tool: e
        });
      });
    }
    isNativeBehaviour(e) {
      return k.isNativeInput(e);
    }
    async processFiles(e) {
      const { BlockManager: t } = this.Editor;
      let o;
      o = await Promise.all(Array.from(e).map((s) => this.processFile(s))), o = o.filter((s) => !!s);
      const i = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
      o.forEach((s, r) => {
        t.paste(s.type, s.event, r === 0 && i);
      });
    }
    async processFile(e) {
      const t = yr(e), o = Object.entries(this.toolsFiles).find(([s, { mimeTypes: r, extensions: l }]) => {
        const [d, h] = e.type.split("/"), g = l.find((b) => b.toLowerCase() === t.toLowerCase()), v = r.find((b) => {
          const [w, y] = b.split("/");
          return w === d && (y === h || y === "*");
        });
        return !!g || !!v;
      });
      if (!o) return;
      const [i] = o;
      return {
        event: this.composePasteEvent("file", {
          file: e
        }),
        type: i
      };
    }
    processHTML(e) {
      const { Tools: t } = this.Editor, o = k.make("DIV");
      return o.innerHTML = e, this.getNodes(o).map((i) => {
        let s, r = t.defaultTool, l = false;
        switch (i.nodeType) {
          case Node.DOCUMENT_FRAGMENT_NODE:
            s = k.make("div"), s.appendChild(i);
            break;
          case Node.ELEMENT_NODE:
            s = i, l = true, this.toolsTags[s.tagName] && (r = this.toolsTags[s.tagName].tool);
            break;
        }
        const { tags: d } = r.pasteConfig || {
          tags: []
        }, h = d.reduce((b, w) => (this.collectTagNames(w).forEach((y) => {
          const T = de(w) ? w[y] : null;
          b[y.toLowerCase()] = T || {};
        }), b), {}), g = Object.assign({}, h, r.baseSanitizeConfig);
        if (s.tagName.toLowerCase() === "table") {
          const b = Te(s.outerHTML, g);
          s = k.make("div", void 0, {
            innerHTML: b
          }).firstChild;
        } else s.innerHTML = Te(s.innerHTML, g);
        const v = this.composePasteEvent("tag", {
          data: s
        });
        return {
          content: s,
          isBlock: l,
          tool: r.name,
          event: v
        };
      }).filter((i) => {
        const s = k.isEmpty(i.content), r = k.isSingleTag(i.content);
        return !s || r;
      });
    }
    processPlain(e) {
      const { defaultBlock: t } = this.config;
      if (!e) return [];
      const o = t;
      return e.split(/\r?\n/).filter((i) => i.trim()).map((i) => {
        const s = k.make("div");
        s.textContent = i;
        const r = this.composePasteEvent("tag", {
          data: s
        });
        return {
          content: s,
          tool: o,
          isBlock: false,
          event: r
        };
      });
    }
    async processSingleBlock(e) {
      const { Caret: t, BlockManager: o } = this.Editor, { currentBlock: i } = o;
      if (!i || e.tool !== i.name || !k.containsOnlyInlineElements(e.content.innerHTML)) {
        this.insertBlock(e, (i == null ? void 0 : i.tool.isDefault) && i.isEmpty);
        return;
      }
      t.insertContentAtCaretPosition(e.content.innerHTML);
    }
    async processInlinePaste(e) {
      const { BlockManager: t, Caret: o } = this.Editor, { content: i } = e;
      if (t.currentBlock && t.currentBlock.tool.isDefault && i.textContent.length < Qi.PATTERN_PROCESSING_MAX_LENGTH) {
        const s = await this.processPattern(i.textContent);
        if (s) {
          const r = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, l = t.paste(s.tool, s.event, r);
          o.setToBlock(l, o.positions.END);
          return;
        }
      }
      if (t.currentBlock && t.currentBlock.currentInput) {
        const s = t.currentBlock.tool.baseSanitizeConfig;
        document.execCommand("insertHTML", false, Te(i.innerHTML, s));
      } else this.insertBlock(e);
    }
    async processPattern(e) {
      const t = this.toolsPatterns.find((o) => {
        const i = o.pattern.exec(e);
        return i ? e === i.shift() : false;
      });
      return t ? {
        event: this.composePasteEvent("pattern", {
          key: t.key,
          data: e
        }),
        tool: t.tool.name
      } : void 0;
    }
    insertBlock(e, t = false) {
      const { BlockManager: o, Caret: i } = this.Editor, { currentBlock: s } = o;
      let r;
      if (t && s && s.isEmpty) {
        r = o.paste(e.tool, e.event, true), i.setToBlock(r, i.positions.END);
        return;
      }
      r = o.paste(e.tool, e.event), i.setToBlock(r, i.positions.END);
    }
    insertEditorJSData(e) {
      const { BlockManager: t, Caret: o, Tools: i } = this.Editor;
      mo(e, (s) => i.blockTools.get(s).sanitizeConfig).forEach(({ tool: s, data: r }, l) => {
        let d = false;
        l === 0 && (d = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
        const h = t.insert({
          tool: s,
          data: r,
          replace: d
        });
        o.setToBlock(h, o.positions.END);
      });
    }
    processElementNode(e, t, o) {
      const i = Object.keys(this.toolsTags), s = e, { tool: r } = this.toolsTags[s.tagName] || {}, l = this.tagsByTool[r == null ? void 0 : r.name] || [], d = i.includes(s.tagName), h = k.blockElements.includes(s.tagName.toLowerCase()), g = Array.from(s.children).some(({ tagName: b }) => i.includes(b) && !l.includes(b)), v = Array.from(s.children).some(({ tagName: b }) => k.blockElements.includes(b.toLowerCase()));
      if (!h && !d && !g) return o.appendChild(s), [
        ...t,
        o
      ];
      if (d && !g || h && !v && !g) return [
        ...t,
        o,
        s
      ];
    }
    getNodes(e) {
      const t = Array.from(e.childNodes);
      let o;
      const i = (s, r) => {
        if (k.isEmpty(r) && !k.isSingleTag(r)) return s;
        const l = s[s.length - 1];
        let d = new DocumentFragment();
        switch (l && k.isFragment(l) && (d = s.pop()), r.nodeType) {
          case Node.ELEMENT_NODE:
            if (o = this.processElementNode(r, s, d), o) return o;
            break;
          case Node.TEXT_NODE:
            return d.appendChild(r), [
              ...s,
              d
            ];
          default:
            return [
              ...s,
              d
            ];
        }
        return [
          ...s,
          ...Array.from(r.childNodes).reduce(i, [])
        ];
      };
      return t.reduce(i, []);
    }
    composePasteEvent(e, t) {
      return new CustomEvent(e, {
        detail: t
      });
    }
  };
  Zi.PATTERN_PROCESSING_MAX_LENGTH = 450;
  let Lc = Zi;
  class Nc extends j {
    constructor() {
      super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = false;
    }
    get isEnabled() {
      return this.readOnlyEnabled;
    }
    async prepare() {
      const { Tools: e } = this.Editor, { blockTools: t } = e, o = [];
      Array.from(t.entries()).forEach(([i, s]) => {
        s.isReadOnlySupported || o.push(i);
      }), this.toolsDontSupportReadOnly = o, this.config.readOnly && o.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly, true);
    }
    async toggle(e = !this.readOnlyEnabled, t = false) {
      e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
      const o = this.readOnlyEnabled;
      this.readOnlyEnabled = e;
      for (const s in this.Editor) this.Editor[s].toggleReadOnly && this.Editor[s].toggleReadOnly(e);
      if (o === e) return this.readOnlyEnabled;
      if (t) return this.readOnlyEnabled;
      this.Editor.ModificationsObserver.disable();
      const i = await this.Editor.Saver.save();
      return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(i.blocks), this.Editor.ModificationsObserver.enable(), this.readOnlyEnabled;
    }
    throwCriticalError() {
      throw new oi(`To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`);
    }
  }
  class ut extends j {
    constructor() {
      super(...arguments), this.isRectSelectionActivated = false, this.SCROLL_SPEED = 3, this.HEIGHT_OF_SCROLL_ZONE = 40, this.BOTTOM_SCROLL_ZONE = 1, this.TOP_SCROLL_ZONE = 2, this.MAIN_MOUSE_BUTTON = 0, this.mousedown = false, this.isScrolling = false, this.inScrollZone = null, this.startX = 0, this.startY = 0, this.mouseX = 0, this.mouseY = 0, this.stackOfSelected = [], this.listenerIds = [];
    }
    static get CSS() {
      return {
        overlay: "codex-editor-overlay",
        overlayContainer: "codex-editor-overlay__container",
        rect: "codex-editor-overlay__rectangle",
        topScrollZone: "codex-editor-overlay__scroll-zone--top",
        bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
      };
    }
    prepare() {
      this.enableModuleBindings();
    }
    startSelection(e, t) {
      const o = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
      o.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = false, this.clearSelection(), this.stackOfSelected = []);
      const i = [
        `.${ce.CSS.content}`,
        `.${this.Editor.Toolbar.CSS.toolbar}`,
        `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
      ], s = o.closest("." + this.Editor.UI.CSS.editorWrapper), r = i.some((l) => !!o.closest(l));
      !s || r || (this.mousedown = true, this.startX = e, this.startY = t);
    }
    endSelection() {
      this.mousedown = false, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
    }
    isRectActivated() {
      return this.isRectSelectionActivated;
    }
    clearSelection() {
      this.isRectSelectionActivated = false;
    }
    enableModuleBindings() {
      const { container: e } = this.genHTML();
      this.listeners.on(e, "mousedown", (t) => {
        this.processMouseDown(t);
      }, false), this.listeners.on(document.body, "mousemove", so((t) => {
        this.processMouseMove(t);
      }, 10), {
        passive: true
      }), this.listeners.on(document.body, "mouseleave", () => {
        this.processMouseLeave();
      }), this.listeners.on(window, "scroll", so((t) => {
        this.processScroll(t);
      }, 10), {
        passive: true
      }), this.listeners.on(document.body, "mouseup", () => {
        this.processMouseUp();
      }, false);
    }
    processMouseDown(e) {
      e.button === this.MAIN_MOUSE_BUTTON && (e.target.closest(k.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY));
    }
    processMouseMove(e) {
      this.changingRectangle(e), this.scrollByZones(e.clientY);
    }
    processMouseLeave() {
      this.clearSelection(), this.endSelection();
    }
    processScroll(e) {
      this.changingRectangle(e);
    }
    processMouseUp() {
      this.clearSelection(), this.endSelection();
    }
    scrollByZones(e) {
      if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
        this.isScrolling = false;
        return;
      }
      this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = true);
    }
    genHTML() {
      const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), o = k.make("div", ut.CSS.overlay, {}), i = k.make("div", ut.CSS.overlayContainer, {}), s = k.make("div", ut.CSS.rect, {});
      return i.appendChild(s), o.appendChild(i), t.appendChild(o), this.overlayRectangle = s, {
        container: t,
        overlay: o
      };
    }
    scrollVertical(e) {
      if (!(this.inScrollZone && this.mousedown)) return;
      const t = window.pageYOffset;
      window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(() => {
        this.scrollVertical(e);
      }, 0);
    }
    changingRectangle(e) {
      if (!this.mousedown) return;
      e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
      const { rightPos: t, leftPos: o, index: i } = this.genInfoForMouseSelection(), s = this.startX > t && this.mouseX > t, r = this.startX < o && this.mouseX < o;
      this.rectCrossesBlocks = !(s || r), this.isRectSelectionActivated || (this.rectCrossesBlocks = false, this.isRectSelectionActivated = true, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), M.get().removeAllRanges());
    }
    shrinkRectangleToPoint() {
      this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`;
    }
    inverseSelection() {
      const e = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
      if (this.rectCrossesBlocks && !e) for (const t of this.stackOfSelected) this.Editor.BlockSelection.selectBlockByIndex(t);
      if (!this.rectCrossesBlocks && e) for (const t of this.stackOfSelected) this.Editor.BlockSelection.unSelectBlockByIndex(t);
    }
    updateRectangleSize() {
      this.mouseY >= this.startY ? (this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.mouseY - window.pageYOffset}px`) : (this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.top = `${this.mouseY - window.pageYOffset}px`), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.mouseX - window.pageXOffset}px`) : (this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.left = `${this.mouseX - window.pageXOffset}px`);
    }
    genInfoForMouseSelection() {
      const e = document.body.offsetWidth / 2, t = this.mouseY - window.pageYOffset, o = document.elementFromPoint(e, t), i = this.Editor.BlockManager.getBlockByChildNode(o);
      let s;
      i !== void 0 && (s = this.Editor.BlockManager.blocks.findIndex((g) => g.holder === i.holder));
      const r = this.Editor.BlockManager.lastBlock.holder.querySelector("." + ce.CSS.content), l = Number.parseInt(window.getComputedStyle(r).width, 10) / 2, d = e - l, h = e + l;
      return {
        index: s,
        leftPos: d,
        rightPos: h
      };
    }
    addBlockInSelection(e) {
      this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
    }
    trySelectNextBlock(e) {
      const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, o = this.stackOfSelected.length, i = 1, s = -1, r = 0;
      if (t) return;
      const l = this.stackOfSelected[o - 1] - this.stackOfSelected[o - 2] > 0;
      let d = r;
      o > 1 && (d = l ? i : s);
      const h = e > this.stackOfSelected[o - 1] && d === i, g = e < this.stackOfSelected[o - 1] && d === s, v = !(h || g || d === r);
      if (!v && (e > this.stackOfSelected[o - 1] || this.stackOfSelected[o - 1] === void 0)) {
        let y = this.stackOfSelected[o - 1] + 1 || e;
        for (y; y <= e; y++) this.addBlockInSelection(y);
        return;
      }
      if (!v && e < this.stackOfSelected[o - 1]) {
        for (let y = this.stackOfSelected[o - 1] - 1; y >= e; y--) this.addBlockInSelection(y);
        return;
      }
      if (!v) return;
      let b = o - 1, w;
      for (e > this.stackOfSelected[o - 1] ? w = () => e > this.stackOfSelected[b] : w = () => e < this.stackOfSelected[b]; w(); ) this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[b]), this.stackOfSelected.pop(), b--;
    }
  }
  class Pc extends j {
    async render(e) {
      return new Promise((t) => {
        const { Tools: o, BlockManager: i } = this.Editor;
        if (e.length === 0) i.insert();
        else {
          const s = e.map(({ type: r, data: l, tunes: d, id: h }) => {
            o.available.has(r) === false && (we(`Tool \xAB${r}\xBB is not found. Check 'tools' property at the Editor.js config.`, "warn"), l = this.composeStubDataForTool(r, l, h), r = o.stubTool);
            let g;
            try {
              g = i.composeBlock({
                id: h,
                tool: r,
                data: l,
                tunes: d
              });
            } catch (v) {
              z(`Block \xAB${r}\xBB skipped because of plugins error`, "error", {
                data: l,
                error: v
              }), l = this.composeStubDataForTool(r, l, h), r = o.stubTool, g = i.composeBlock({
                id: h,
                tool: r,
                data: l,
                tunes: d
              });
            }
            return g;
          });
          i.insertMany(s);
        }
        window.requestIdleCallback(() => {
          t();
        }, {
          timeout: 2e3
        });
      });
    }
    composeStubDataForTool(e, t, o) {
      const { Tools: i } = this.Editor;
      let s = e;
      if (i.unavailable.has(e)) {
        const r = i.unavailable.get(e).toolbox;
        r !== void 0 && r[0].title !== void 0 && (s = r[0].title);
      }
      return {
        savedData: {
          id: o,
          type: e,
          data: t
        },
        title: s
      };
    }
  }
  class Dc extends j {
    async save() {
      const { BlockManager: e, Tools: t } = this.Editor, o = e.blocks, i = [];
      try {
        o.forEach((l) => {
          i.push(this.getSavedData(l));
        });
        const s = await Promise.all(i), r = await mo(s, (l) => t.blockTools.get(l).sanitizeConfig);
        return this.makeOutput(r);
      } catch (s) {
        we("Saving failed due to the Error %o", "error", s);
      }
    }
    async getSavedData(e) {
      const t = await e.save(), o = t && await e.validate(t.data);
      return {
        ...t,
        isValid: o
      };
    }
    makeOutput(e) {
      const t = [];
      return e.forEach(({ id: o, tool: i, data: s, tunes: r, isValid: l }) => {
        if (!l) {
          z(`Block \xAB${i}\xBB skipped because saved data is invalid`);
          return;
        }
        if (i === this.Editor.Tools.stubTool) {
          t.push(s);
          return;
        }
        const d = {
          id: o,
          type: i,
          data: s,
          ...!Ee(r) && {
            tunes: r
          }
        };
        t.push(d);
      }), {
        time: +/* @__PURE__ */ new Date(),
        blocks: t,
        version: "2.31.0-rc.7"
      };
    }
  }
  (function() {
    try {
      if (typeof document < "u") {
        var n = document.createElement("style");
        n.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(n);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  const Rc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
  function jc(n) {
    const e = document.createElement("div");
    e.innerHTML = n.trim();
    const t = document.createDocumentFragment();
    return t.append(...Array.from(e.childNodes)), t;
  }
  class dn {
    static get DEFAULT_PLACEHOLDER() {
      return "";
    }
    constructor({ data: e, config: t, api: o, readOnly: i }) {
      this.api = o, this.readOnly = i, this._CSS = {
        block: this.api.styles.block,
        wrapper: "ce-paragraph"
      }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : dn.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? false;
    }
    onKeyUp(e) {
      if (e.code !== "Backspace" && e.code !== "Delete" || !this._element) return;
      const { textContent: t } = this._element;
      t === "" && (this._element.innerHTML = "");
    }
    drawView() {
      const e = document.createElement("DIV");
      return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = "false", e.dataset.placeholderActive = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = "true", e.addEventListener("keyup", this.onKeyUp)), e;
    }
    render() {
      return this._element = this.drawView(), this._element;
    }
    merge(e) {
      if (!this._element) return;
      this._data.text += e.text;
      const t = jc(e.text);
      this._element.appendChild(t), this._element.normalize();
    }
    validate(e) {
      return !(e.text.trim() === "" && !this._preserveBlank);
    }
    save(e) {
      return {
        text: e.innerHTML
      };
    }
    onPaste(e) {
      const t = {
        text: e.detail.data.innerHTML
      };
      this._data = t, window.requestAnimationFrame(() => {
        this._element && (this._element.innerHTML = this._data.text || "");
      });
    }
    static get conversionConfig() {
      return {
        export: "text",
        import: "text"
      };
    }
    static get sanitize() {
      return {
        text: {
          br: true
        }
      };
    }
    static get isReadOnlySupported() {
      return true;
    }
    static get pasteConfig() {
      return {
        tags: [
          "P"
        ]
      };
    }
    static get toolbox() {
      return {
        icon: Rc,
        title: "Text"
      };
    }
  }
  class un {
    constructor() {
      this.commandName = "bold";
    }
    static get sanitize() {
      return {
        b: {}
      };
    }
    render() {
      return {
        icon: ha,
        name: "bold",
        onActivate: () => {
          document.execCommand(this.commandName);
        },
        isActive: () => document.queryCommandState(this.commandName)
      };
    }
    get shortcut() {
      return "CMD+B";
    }
  }
  un.isInline = true;
  un.title = "Bold";
  class hn {
    constructor() {
      this.commandName = "italic", this.CSS = {
        button: "ce-inline-tool",
        buttonActive: "ce-inline-tool--active",
        buttonModifier: "ce-inline-tool--italic"
      }, this.nodes = {
        button: null
      };
    }
    static get sanitize() {
      return {
        i: {}
      };
    }
    render() {
      return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = ya, this.nodes.button;
    }
    surround() {
      document.execCommand(this.commandName);
    }
    checkState() {
      const e = document.queryCommandState(this.commandName);
      return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
    }
    get shortcut() {
      return "CMD+I";
    }
  }
  hn.isInline = true;
  hn.title = "Italic";
  class pn {
    constructor({ api: e }) {
      this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
        button: "ce-inline-tool",
        buttonActive: "ce-inline-tool--active",
        buttonModifier: "ce-inline-tool--link",
        buttonUnlink: "ce-inline-tool--unlink",
        input: "ce-inline-tool-input",
        inputShowed: "ce-inline-tool-input--showed"
      }, this.nodes = {
        button: null,
        input: null
      }, this.inputOpened = false, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new M();
    }
    static get sanitize() {
      return {
        a: {
          href: true,
          target: "_blank",
          rel: "nofollow"
        }
      };
    }
    render() {
      return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = _n, this.nodes.button;
    }
    renderActions() {
      return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.enterKeyHint = "done", this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (e) => {
        e.keyCode === this.ENTER_KEY && this.enterPressed(e);
      }), this.nodes.input;
    }
    surround(e) {
      if (e) {
        this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
        const t = this.selection.findParentTag("A");
        if (t) {
          this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
          return;
        }
      }
      this.toggleActions();
    }
    checkState() {
      const e = this.selection.findParentTag("A");
      if (e) {
        this.nodes.button.innerHTML = xa, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
        const t = e.getAttribute("href");
        this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
      } else this.nodes.button.innerHTML = _n, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
      return !!e;
    }
    clear() {
      this.closeActions();
    }
    get shortcut() {
      return "CMD+K";
    }
    toggleActions() {
      this.inputOpened ? this.closeActions(false) : this.openActions(true);
    }
    openActions(e = false) {
      this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = true;
    }
    closeActions(e = true) {
      if (this.selection.isFakeBackgroundEnabled) {
        const t = new M();
        t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
      }
      this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = false;
    }
    enterPressed(e) {
      let t = this.nodes.input.value || "";
      if (!t.trim()) {
        this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
        return;
      }
      if (!this.validateURL(t)) {
        this.notifier.show({
          message: "Pasted link is not valid.",
          style: "error"
        }), z("Incorrect Link pasted", "warn", t);
        return;
      }
      t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
    }
    validateURL(e) {
      return !/\s/.test(e);
    }
    prepareLink(e) {
      return e = e.trim(), e = this.addProtocol(e), e;
    }
    addProtocol(e) {
      if (/^(\w+):(\/\/)?/.test(e)) return e;
      const t = /^\/[^/\s]/.test(e), o = e.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(e);
      return !t && !o && !i && (e = "http://" + e), e;
    }
    insertLink(e) {
      const t = this.selection.findParentTag("A");
      t && this.selection.expandToTag(t), document.execCommand(this.commandLink, false, e);
    }
    unlink() {
      document.execCommand(this.commandUnlink);
    }
  }
  pn.isInline = true;
  pn.title = "Link";
  class Ji {
    constructor({ api: e }) {
      this.i18nAPI = e.i18n, this.blocksAPI = e.blocks, this.selectionAPI = e.selection, this.toolsAPI = e.tools, this.caretAPI = e.caret;
    }
    async render() {
      const e = M.get(), t = this.blocksAPI.getBlockByElement(e.anchorNode);
      if (t === void 0) return [];
      const o = this.toolsAPI.getBlockTools(), i = await ai(t, o);
      if (i.length === 0) return [];
      const s = i.reduce((h, g) => {
        var v;
        return (v = g.toolbox) == null || v.forEach((b) => {
          h.push({
            icon: b.icon,
            title: me.t(ke.toolNames, b.title),
            name: g.name,
            closeOnActivate: true,
            onActivate: async () => {
              const w = await this.blocksAPI.convert(t.id, g.name, b.data);
              this.caretAPI.setToBlock(w, "end");
            }
          });
        }), h;
      }, []), r = await t.getActiveToolboxEntry(), l = r !== void 0 ? r.icon : pi, d = !nt();
      return {
        icon: l,
        name: "convert-to",
        hint: {
          title: this.i18nAPI.t("Convert to")
        },
        children: {
          searchable: d,
          items: s,
          onOpen: () => {
            d && (this.selectionAPI.setFakeBackground(), this.selectionAPI.save());
          },
          onClose: () => {
            d && (this.selectionAPI.restore(), this.selectionAPI.removeFakeBackground());
          }
        }
      };
    }
  }
  Ji.isInline = true;
  class es {
    constructor({ data: e, api: t }) {
      this.CSS = {
        wrapper: "ce-stub",
        info: "ce-stub__info",
        title: "ce-stub__title",
        subtitle: "ce-stub__subtitle"
      }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
    }
    render() {
      return this.wrapper;
    }
    save() {
      return this.savedData;
    }
    make() {
      const e = k.make("div", this.CSS.wrapper), t = Ca, o = k.make("div", this.CSS.info), i = k.make("div", this.CSS.title, {
        textContent: this.title
      }), s = k.make("div", this.CSS.subtitle, {
        textContent: this.subtitle
      });
      return e.innerHTML = t, o.appendChild(i), o.appendChild(s), e.appendChild(o), e;
    }
  }
  es.isReadOnlySupported = true;
  class Hc extends Eo {
    constructor() {
      super(...arguments), this.type = $e.Inline;
    }
    get title() {
      return this.constructable[Pt.Title];
    }
    create() {
      return new this.constructable({
        api: this.api,
        config: this.settings
      });
    }
    get isReadOnlySupported() {
      return this.constructable[Pt.IsReadOnlySupported] ?? false;
    }
  }
  class Fc extends Eo {
    constructor() {
      super(...arguments), this.type = $e.Tune;
    }
    create(e, t) {
      return new this.constructable({
        api: this.api,
        config: this.settings,
        block: t,
        data: e
      });
    }
  }
  class pe extends Map {
    get blockTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
      return new pe(e);
    }
    get inlineTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
      return new pe(e);
    }
    get blockTunes() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
      return new pe(e);
    }
    get internalTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
      return new pe(e);
    }
    get externalTools() {
      const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
      return new pe(e);
    }
  }
  var Vc = Object.defineProperty, $c = Object.getOwnPropertyDescriptor, ts = (n, e, t, o) => {
    for (var i = $c(e, t), s = n.length - 1, r; s >= 0; s--) (r = n[s]) && (i = r(e, t, i) || i);
    return i && Vc(e, t, i), i;
  };
  class fn extends Eo {
    constructor() {
      super(...arguments), this.type = $e.Block, this.inlineTools = new pe(), this.tunes = new pe();
    }
    create(e, t, o) {
      return new this.constructable({
        data: e,
        block: t,
        readOnly: o,
        api: this.api,
        config: this.settings
      });
    }
    get isReadOnlySupported() {
      return this.constructable[Ze.IsReadOnlySupported] === true;
    }
    get isLineBreaksEnabled() {
      return this.constructable[Ze.IsEnabledLineBreaks];
    }
    get toolbox() {
      const e = this.constructable[Ze.Toolbox], t = this.config[Tt.Toolbox];
      if (!Ee(e) && t !== false) return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((o, i) => {
        const s = e[i];
        return s ? {
          ...s,
          ...o
        } : o;
      }) : [
        t
      ] : Array.isArray(t) ? t : [
        {
          ...e,
          ...t
        }
      ] : Array.isArray(e) ? e : [
        e
      ];
    }
    get conversionConfig() {
      return this.constructable[Ze.ConversionConfig];
    }
    get enabledInlineTools() {
      return this.config[Tt.EnabledInlineTools] || false;
    }
    get enabledBlockTunes() {
      return this.config[Tt.EnabledBlockTunes];
    }
    get pasteConfig() {
      return this.constructable[Ze.PasteConfig] ?? {};
    }
    get sanitizeConfig() {
      const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
      if (Ee(e)) return t;
      const o = {};
      for (const i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        const s = e[i];
        de(s) ? o[i] = Object.assign({}, t, s) : o[i] = s;
      }
      return o;
    }
    get baseSanitizeConfig() {
      const e = {};
      return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
    }
  }
  ts([
    ot
  ], fn.prototype, "sanitizeConfig");
  ts([
    ot
  ], fn.prototype, "baseSanitizeConfig");
  class Uc {
    constructor(e, t, o) {
      this.api = o, this.config = e, this.editorConfig = t;
    }
    get(e) {
      const { class: t, isInternal: o = false, ...i } = this.config[e], s = this.getConstructor(t), r = t[ho.IsTune];
      return new s({
        name: e,
        constructable: t,
        config: i,
        api: this.api.getMethodsForTool(e, r),
        isDefault: e === this.editorConfig.defaultBlock,
        defaultPlaceholder: this.editorConfig.placeholder,
        isInternal: o
      });
    }
    getConstructor(e) {
      switch (true) {
        case e[Pt.IsInline]:
          return Hc;
        case e[ho.IsTune]:
          return Fc;
        default:
          return fn;
      }
    }
  }
  class os {
    constructor({ api: e }) {
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    render() {
      return {
        icon: pa,
        title: this.api.i18n.t("Move down"),
        onActivate: () => this.handleClick(),
        name: "move-down"
      };
    }
    handleClick() {
      const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
      if (!t) throw new Error("Unable to move Block down since it is already the last");
      const o = t.holder, i = o.getBoundingClientRect();
      let s = Math.abs(window.innerHeight - o.offsetHeight);
      i.top < window.innerHeight && (s = window.scrollY + o.offsetHeight), window.scrollTo(0, s), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(true);
    }
  }
  os.isTune = true;
  class ns {
    constructor({ api: e }) {
      this.api = e;
    }
    render() {
      return {
        icon: va,
        title: this.api.i18n.t("Delete"),
        name: "delete",
        confirmation: {
          title: this.api.i18n.t("Click to delete"),
          onActivate: () => this.handleClick()
        }
      };
    }
    handleClick() {
      this.api.blocks.delete();
    }
  }
  ns.isTune = true;
  class is {
    constructor({ api: e }) {
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    render() {
      return {
        icon: ma,
        title: this.api.i18n.t("Move up"),
        onActivate: () => this.handleClick(),
        name: "move-up"
      };
    }
    handleClick() {
      const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), o = this.api.blocks.getBlockByIndex(e - 1);
      if (e === 0 || !t || !o) throw new Error("Unable to move Block up since it is already the first");
      const i = t.holder, s = o.holder, r = i.getBoundingClientRect(), l = s.getBoundingClientRect();
      let d;
      l.top > 0 ? d = Math.abs(r.top) - Math.abs(l.top) : d = Math.abs(r.top) + l.height, window.scrollBy(0, -1 * d), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(true);
    }
  }
  is.isTune = true;
  var zc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, Wc = (n, e, t, o) => {
    for (var i = qc(e, t), s = n.length - 1, r; s >= 0; s--) (r = n[s]) && (i = r(e, t, i) || i);
    return i && zc(e, t, i), i;
  };
  class ss extends j {
    constructor() {
      super(...arguments), this.stubTool = "stub", this.toolsAvailable = new pe(), this.toolsUnavailable = new pe();
    }
    get available() {
      return this.toolsAvailable;
    }
    get unavailable() {
      return this.toolsUnavailable;
    }
    get inlineTools() {
      return this.available.inlineTools;
    }
    get blockTools() {
      return this.available.blockTools;
    }
    get blockTunes() {
      return this.available.blockTunes;
    }
    get defaultTool() {
      return this.blockTools.get(this.config.defaultBlock);
    }
    get internal() {
      return this.available.internalTools;
    }
    async prepare() {
      if (this.validateTools(), this.config.tools = ro({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0) throw Error("Can't start without tools");
      const e = this.prepareConfig();
      this.factory = new Uc(e, this.config, this.Editor.API);
      const t = this.getListOfPrepareFunctions(e);
      if (t.length === 0) return Promise.resolve();
      await br(t, (o) => {
        this.toolPrepareMethodSuccess(o);
      }, (o) => {
        this.toolPrepareMethodFallback(o);
      }), this.prepareBlockTools();
    }
    getAllInlineToolsSanitizeConfig() {
      const e = {};
      return Array.from(this.inlineTools.values()).forEach((t) => {
        Object.assign(e, t.sanitizeConfig);
      }), e;
    }
    destroy() {
      Object.values(this.available).forEach(async (e) => {
        Q(e.reset) && await e.reset();
      });
    }
    get internalTools() {
      return {
        convertTo: {
          class: Ji,
          isInternal: true
        },
        link: {
          class: pn,
          isInternal: true
        },
        bold: {
          class: un,
          isInternal: true
        },
        italic: {
          class: hn,
          isInternal: true
        },
        paragraph: {
          class: dn,
          inlineToolbar: true,
          isInternal: true
        },
        stub: {
          class: es,
          isInternal: true
        },
        moveUp: {
          class: is,
          isInternal: true
        },
        delete: {
          class: ns,
          isInternal: true
        },
        moveDown: {
          class: os,
          isInternal: true
        }
      };
    }
    toolPrepareMethodSuccess(e) {
      const t = this.factory.get(e.toolName);
      if (t.isInline()) {
        const o = [
          "render"
        ].filter((i) => !t.create()[i]);
        if (o.length) {
          z(`Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`, "warn", o), this.toolsUnavailable.set(t.name, t);
          return;
        }
      }
      this.toolsAvailable.set(t.name, t);
    }
    toolPrepareMethodFallback(e) {
      this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
    }
    getListOfPrepareFunctions(e) {
      const t = [];
      return Object.entries(e).forEach(([o, i]) => {
        t.push({
          function: Q(i.class.prepare) ? i.class.prepare : () => {
          },
          data: {
            toolName: o,
            config: i.config
          }
        });
      }), t;
    }
    prepareBlockTools() {
      Array.from(this.blockTools.values()).forEach((e) => {
        this.assignInlineToolsToBlockTool(e), this.assignBlockTunesToBlockTool(e);
      });
    }
    assignInlineToolsToBlockTool(e) {
      if (this.config.inlineToolbar !== false) {
        if (e.enabledInlineTools === true) {
          e.inlineTools = new pe(Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [
            t,
            this.inlineTools.get(t)
          ]) : Array.from(this.inlineTools.entries()));
          return;
        }
        Array.isArray(e.enabledInlineTools) && (e.inlineTools = new pe([
          "convertTo",
          ...e.enabledInlineTools
        ].map((t) => [
          t,
          this.inlineTools.get(t)
        ])));
      }
    }
    assignBlockTunesToBlockTool(e) {
      if (e.enabledBlockTunes !== false) {
        if (Array.isArray(e.enabledBlockTunes)) {
          const t = new pe(e.enabledBlockTunes.map((o) => [
            o,
            this.blockTunes.get(o)
          ]));
          e.tunes = new pe([
            ...t,
            ...this.blockTunes.internalTools
          ]);
          return;
        }
        if (Array.isArray(this.config.tunes)) {
          const t = new pe(this.config.tunes.map((o) => [
            o,
            this.blockTunes.get(o)
          ]));
          e.tunes = new pe([
            ...t,
            ...this.blockTunes.internalTools
          ]);
          return;
        }
        e.tunes = this.blockTunes.internalTools;
      }
    }
    validateTools() {
      for (const e in this.config.tools) if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
        if (e in this.internalTools) return;
        const t = this.config.tools[e];
        if (!Q(t) && !Q(t.class)) throw Error(`Tool \xAB${e}\xBB must be a constructor function or an object with function in the \xABclass\xBB property`);
      }
    }
    prepareConfig() {
      const e = {};
      for (const t in this.config.tools) de(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = {
        class: this.config.tools[t]
      };
      return e;
    }
  }
  Wc([
    ot
  ], ss.prototype, "getAllInlineToolsSanitizeConfig");
  const Yc = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;--color-background-icon-active: rgba(56, 138, 229, .1);--color-text-icon-active: #388AE5;--color-text-primary: black;position:absolute;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3;opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{color:var(--color-text-primary);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:0;border-radius:4px;line-height:normal;height:100%;padding:0;width:28px;background-color:transparent;cursor:pointer}@media (max-width: 650px){.ce-inline-tool{width:36px;height:36px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#f8f8f8}}.ce-inline-tool svg{display:block;width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:4px 8px;font-size:14px;line-height:22px;outline:none;margin:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-inline-tool--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #EFF0F1;--color-shadow: rgba(13, 20, 33, .1);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #F8F8F8;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;--popover-top: calc(100% + var(--offset-from-target));--popover-left: 0;--nested-popover-overlap: 4px;--icon-size: 20px;--item-padding: 3px;--item-height: calc(var(--icon-size) + 2 * var(--item-padding))}.ce-popover__container{min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:var(--popover-left);top:var(--popover-top);background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened>.ce-popover__container{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened>.ce-popover__container{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover--open-top .ce-popover__container{--popover-top: calc(-1 * (var(--offset-from-target) + var(--popover-height)))}.ce-popover--open-left .ce-popover__container{--popover-left: calc(-1 * var(--width) + 100%)}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}@media (max-width: 650px){.ce-popover .ce-popover__container{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}}.ce-popover__search{margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover--nested .ce-popover__container{--popover-left: calc(var(--nesting-level) * (var(--width) - var(--nested-popover-overlap)));top:calc(var(--trigger-item-top) - var(--nested-popover-overlap));position:absolute}.ce-popover--open-top.ce-popover--nested .ce-popover__container{top:calc(var(--trigger-item-top) - var(--popover-height) + var(--item-height) + var(--offset-from-target) + var(--nested-popover-overlap))}.ce-popover--open-left .ce-popover--nested .ce-popover__container{--popover-left: calc(-1 * (var(--nesting-level) + 1) * var(--width) + 100%)}.ce-popover-item-separator{padding:4px 3px}.ce-popover-item-separator--hidden{display:none}.ce-popover-item-separator__line{height:1px;background:var(--color-border);width:100%}.ce-popover-item-html--hidden{display:none}.ce-popover-item{--border-radius: 6px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:var(--item-padding);color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;background:transparent}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover-item__icon--tool{margin-right:4px}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:auto}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title,.ce-popover-item--confirmation .ce-popover-item__icon{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.ce-popover-header{margin-bottom:8px;margin-top:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover-header__text{font-size:18px;font-weight:600}.ce-popover-header__back-button{border:0;background:transparent;width:36px;height:36px;color:var(--color-text-primary)}.ce-popover-header__back-button svg{display:block;width:28px;height:28px}.ce-popover--inline{--height: 38px;--height-mobile: 46px;--container-padding: 4px;position:relative}.ce-popover--inline .ce-popover__custom-content{margin-bottom:0}.ce-popover--inline .ce-popover__items{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-popover--inline .ce-popover__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:var(--container-padding);height:var(--height);top:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-animation:none;animation:none}@media (max-width: 650px){.ce-popover--inline .ce-popover__container{height:var(--height-mobile);position:absolute}}.ce-popover--inline .ce-popover-item-separator{padding:0 4px}.ce-popover--inline .ce-popover-item-separator__line{height:100%;width:1px}.ce-popover--inline .ce-popover-item{border-radius:4px;padding:4px}.ce-popover--inline .ce-popover-item__icon--tool{-webkit-box-shadow:none;box-shadow:none;background:transparent;margin-right:0}.ce-popover--inline .ce-popover-item__icon{width:auto;width:initial;height:auto;height:initial}.ce-popover--inline .ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover--inline .ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover--inline .ce-popover-item:not(:last-of-type){margin-bottom:0;margin-bottom:initial}.ce-popover--inline .ce-popover-item-html{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover--inline .ce-popover-item__icon--chevron-right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{--offset: 3px;left:0;top:calc(var(--height) + var(--offset))}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{top:calc(var(--height-mobile) + var(--offset))}}.ce-popover--inline .ce-popover--nested .ce-popover__container{min-width:var(--width);width:var(--width);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:6px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ce-popover--inline .ce-popover--nested .ce-popover__items{display:block;width:100%}.ce-popover--inline .ce-popover--nested .ce-popover-item{border-radius:6px;padding:3px}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested .ce-popover-item{padding:4px}}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon--tool{margin-right:4px}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon{width:26px;height:26px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator{padding:4px 3px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator__line{width:100%;height:1px}.codex-editor [data-placeholder]:empty:before,.codex-editor [data-placeholder][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text;content:attr(data-placeholder)}.codex-editor [data-placeholder-active]:empty:before,.codex-editor [data-placeholder-active][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text}.codex-editor [data-placeholder-active]:empty:focus:before,.codex-editor [data-placeholder-active][data-empty=true]:focus:before{content:attr(data-placeholder-active)}
`;
  class Xc extends j {
    constructor() {
      super(...arguments), this.isMobile = false, this.contentRectCache = null, this.resizeDebouncer = Cn(() => {
        this.windowResize();
      }, 200), this.selectionChangeDebounced = Cn(() => {
        this.selectionChanged();
      }, Oc), this.documentTouchedListener = (e) => {
        this.documentTouched(e);
      };
    }
    get CSS() {
      return {
        editorWrapper: "codex-editor",
        editorWrapperNarrow: "codex-editor--narrow",
        editorZone: "codex-editor__redactor",
        editorZoneHidden: "codex-editor__redactor--hidden",
        editorEmpty: "codex-editor--empty",
        editorRtlFix: "codex-editor--rtl"
      };
    }
    get contentRect() {
      if (this.contentRectCache !== null) return this.contentRectCache;
      const e = this.nodes.wrapper.querySelector(`.${ce.CSS.content}`);
      return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
        width: 650,
        left: 0,
        right: 0
      };
    }
    async prepare() {
      this.setIsMobile(), this.make(), this.loadStyles();
    }
    toggleReadOnly(e) {
      e ? this.unbindReadOnlySensitiveListeners() : window.requestIdleCallback(() => {
        this.bindReadOnlySensitiveListeners();
      }, {
        timeout: 2e3
      });
    }
    checkEmptiness() {
      const { BlockManager: e } = this.Editor;
      this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
    }
    get someToolbarOpened() {
      const { Toolbar: e, BlockSettings: t, InlineToolbar: o } = this.Editor;
      return !!(t.opened || o.opened || e.toolbox.opened);
    }
    get someFlipperButtonFocused() {
      return this.Editor.Toolbar.toolbox.hasFocus() ? true : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof ze).some(([e, t]) => t.flipper.hasFocus());
    }
    destroy() {
      this.nodes.holder.innerHTML = "", this.unbindReadOnlyInsensitiveListeners();
    }
    closeAllToolbars() {
      const { Toolbar: e, BlockSettings: t, InlineToolbar: o } = this.Editor;
      t.close(), o.close(), e.toolbox.close();
    }
    setIsMobile() {
      const e = window.innerWidth < Qn;
      e !== this.isMobile && this.eventsDispatcher.emit(ft, {
        isEnabled: this.isMobile
      }), this.isMobile = e;
    }
    make() {
      this.nodes.holder = k.getHolder(this.config.holder), this.nodes.wrapper = k.make("div", [
        this.CSS.editorWrapper,
        ...this.isRtl ? [
          this.CSS.editorRtlFix
        ] : []
      ]), this.nodes.redactor = k.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper), this.bindReadOnlyInsensitiveListeners();
    }
    loadStyles() {
      const e = "editor-js-styles";
      if (k.get(e)) return;
      const t = k.make("style", null, {
        id: e,
        textContent: Yc.toString()
      });
      this.config.style && !Ee(this.config.style) && this.config.style.nonce && t.setAttribute("nonce", this.config.style.nonce), k.prepend(document.head, t);
    }
    bindReadOnlyInsensitiveListeners() {
      this.listeners.on(document, "selectionchange", this.selectionChangeDebounced), this.listeners.on(window, "resize", this.resizeDebouncer, {
        passive: true
      }), this.listeners.on(this.nodes.redactor, "mousedown", this.documentTouchedListener, {
        capture: true,
        passive: true
      }), this.listeners.on(this.nodes.redactor, "touchstart", this.documentTouchedListener, {
        capture: true,
        passive: true
      });
    }
    unbindReadOnlyInsensitiveListeners() {
      this.listeners.off(document, "selectionchange", this.selectionChangeDebounced), this.listeners.off(window, "resize", this.resizeDebouncer), this.listeners.off(this.nodes.redactor, "mousedown", this.documentTouchedListener), this.listeners.off(this.nodes.redactor, "touchstart", this.documentTouchedListener);
    }
    bindReadOnlySensitiveListeners() {
      this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (e) => {
        this.redactorClicked(e);
      }, false), this.readOnlyMutableListeners.on(document, "keydown", (e) => {
        this.documentKeydown(e);
      }, true), this.readOnlyMutableListeners.on(document, "mousedown", (e) => {
        this.documentClicked(e);
      }, true), this.watchBlockHoveredEvents(), this.enableInputsEmptyMark();
    }
    watchBlockHoveredEvents() {
      let e;
      this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", so((t) => {
        const o = t.target.closest(".ce-block");
        this.Editor.BlockSelection.anyBlockSelected || o && e !== o && (e = o, this.eventsDispatcher.emit(xi, {
          block: this.Editor.BlockManager.getBlockByChildNode(o)
        }));
      }, 20), {
        passive: true
      });
    }
    unbindReadOnlySensitiveListeners() {
      this.readOnlyMutableListeners.clearAll();
    }
    windowResize() {
      this.contentRectCache = null, this.setIsMobile();
    }
    documentKeydown(e) {
      switch (e.keyCode) {
        case P.ENTER:
          this.enterPressed(e);
          break;
        case P.BACKSPACE:
        case P.DELETE:
          this.backspacePressed(e);
          break;
        case P.ESC:
          this.escapePressed(e);
          break;
        default:
          this.defaultBehaviour(e);
          break;
      }
    }
    defaultBehaviour(e) {
      const { currentBlock: t } = this.Editor.BlockManager, o = e.target.closest(`.${this.CSS.editorWrapper}`), i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
      if (t !== void 0 && o === null) {
        this.Editor.BlockEvents.keydown(e);
        return;
      }
      o || t && i || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
    }
    backspacePressed(e) {
      const { BlockManager: t, BlockSelection: o, Caret: i } = this.Editor;
      if (o.anyBlockSelected && !M.isSelectionExists) {
        const s = t.removeSelectedBlocks(), r = t.insertDefaultBlockAtIndex(s, true);
        i.setToBlock(r, i.positions.START), o.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
      }
    }
    escapePressed(e) {
      this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
    }
    enterPressed(e) {
      const { BlockManager: t, BlockSelection: o } = this.Editor;
      if (this.someToolbarOpened) return;
      const i = t.currentBlockIndex >= 0;
      if (o.anyBlockSelected && !M.isSelectionExists) {
        o.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
        return;
      }
      if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
        const s = this.Editor.BlockManager.insert();
        e.preventDefault(), this.Editor.Caret.setToBlock(s), this.Editor.Toolbar.moveAndOpen(s);
      }
      this.Editor.BlockSelection.clearSelection(e);
    }
    documentClicked(e) {
      var t, o;
      if (!e.isTrusted) return;
      const i = e.target;
      this.nodes.holder.contains(i) || M.isAtEditor || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
      const s = (t = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : t.contains(i), r = (o = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : o.contains(i), l = s || r;
      if (this.Editor.BlockSettings.opened && !l) {
        this.Editor.BlockSettings.close();
        const d = this.Editor.BlockManager.getBlockByChildNode(i);
        this.Editor.Toolbar.moveAndOpen(d);
      }
      this.Editor.BlockSelection.clearSelection(e);
    }
    documentTouched(e) {
      let t = e.target;
      if (t === this.nodes.redactor) {
        const o = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        t = document.elementFromPoint(o, i);
      }
      try {
        this.Editor.BlockManager.setCurrentBlockByChildNode(t);
      } catch {
        this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
      }
      this.Editor.ReadOnly.isEnabled || this.Editor.Toolbar.moveAndOpen();
    }
    redactorClicked(e) {
      if (!M.isCollapsed) return;
      const t = e.target, o = e.metaKey || e.ctrlKey;
      if (k.isAnchor(t) && o) {
        e.stopImmediatePropagation(), e.stopPropagation();
        const i = t.getAttribute("href"), s = Er(i);
        Cr(s);
        return;
      }
      this.processBottomZoneClick(e);
    }
    processBottomZoneClick(e) {
      const t = this.Editor.BlockManager.getBlockByIndex(-1), o = k.offset(t.holder).bottom, i = e.pageY, { BlockSelection: s } = this.Editor;
      if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && !s.anyBlockSelected && o < i) {
        e.stopImmediatePropagation(), e.stopPropagation();
        const { BlockManager: r, Caret: l, Toolbar: d } = this.Editor;
        (!r.lastBlock.tool.isDefault || !r.lastBlock.isEmpty) && r.insertAtEnd(), l.setToTheLastBlock(), d.moveAndOpen(r.lastBlock);
      }
    }
    selectionChanged() {
      const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, o = M.anchorElement;
      if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && M.get().removeAllRanges(), !o) {
        M.range || this.Editor.InlineToolbar.close();
        return;
      }
      const i = o.closest(`.${ce.CSS.content}`);
      (i === null || i.closest(`.${M.CSS.editorWrapper}`) !== this.nodes.wrapper) && (this.Editor.InlineToolbar.containsNode(o) || this.Editor.InlineToolbar.close(), o.dataset.inlineToolbar !== "true") || (this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(o), this.Editor.InlineToolbar.tryToShow(true));
    }
    enableInputsEmptyMark() {
      function e(t) {
        const o = t.target;
        Jn(o);
      }
      this.readOnlyMutableListeners.on(this.nodes.wrapper, "input", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusin", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusout", e);
    }
  }
  const Kc = {
    BlocksAPI: Pr,
    CaretAPI: Rr,
    EventsAPI: jr,
    I18nAPI: go,
    API: Hr,
    InlineToolbarAPI: Fr,
    ListenersAPI: Vr,
    NotifierAPI: qr,
    ReadOnlyAPI: Wr,
    SanitizerAPI: Jr,
    SaverAPI: ea,
    SelectionAPI: ta,
    ToolsAPI: oa,
    StylesAPI: na,
    ToolbarAPI: ia,
    TooltipAPI: ca,
    UiAPI: da,
    BlockSettings: Da,
    Toolbar: za,
    InlineToolbar: qa,
    BlockEvents: xc,
    BlockManager: Sc,
    BlockSelection: _c,
    Caret: Dt,
    CrossBlockSelection: Bc,
    DragNDrop: Mc,
    ModificationsObserver: Ic,
    Paste: Lc,
    ReadOnly: Nc,
    RectangleSelection: ut,
    Renderer: Pc,
    Saver: Dc,
    Tools: ss,
    UI: Xc
  };
  class Gc {
    constructor(e) {
      this.moduleInstances = {}, this.eventsDispatcher = new bt();
      let t, o;
      this.isReady = new Promise((i, s) => {
        t = i, o = s;
      }), Promise.resolve().then(async () => {
        this.configuration = e, this.validate(), this.init(), await this.start(), await this.render();
        const { BlockManager: i, Caret: s, UI: r, ModificationsObserver: l } = this.moduleInstances;
        r.checkEmptiness(), l.enable(), this.configuration.autofocus === true && this.configuration.readOnly !== true && s.setToBlock(i.blocks[0], s.positions.START), t();
      }).catch((i) => {
        z(`Editor.js is not ready because of ${i}`, "error"), o(i);
      });
    }
    set configuration(e) {
      var t, o;
      de(e) ? this.config = {
        ...e
      } : this.config = {
        holder: e
      }, ao(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = Kn.VERBOSE), mr(this.config.logLevel), ao(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
      const i = {
        type: this.config.defaultBlock,
        data: {}
      };
      this.config.placeholder = this.config.placeholder || false, this.config.sanitizer = this.config.sanitizer || {
        p: true,
        b: true,
        a: true
      }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : false, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || {
        blocks: []
      }, this.config.onReady = this.config.onReady || (() => {
      }), this.config.onChange = this.config.onChange || (() => {
      }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : true, (Ee(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = {
        blocks: [
          i
        ]
      }), this.config.readOnly = this.config.readOnly || false, (t = this.config.i18n) != null && t.messages && me.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((o = this.config.i18n) == null ? void 0 : o.direction) || "ltr";
    }
    get configuration() {
      return this.config;
    }
    validate() {
      const { holderId: e, holder: t } = this.config;
      if (e && t) throw Error("\xABholderId\xBB and \xABholder\xBB param can't assign at the same time.");
      if (Ie(t) && !k.get(t)) throw Error(`element with ID \xAB${t}\xBB is missing. Pass correct holder's ID.`);
      if (t && de(t) && !k.isElement(t)) throw Error("\xABholder\xBB value must be an Element node");
    }
    init() {
      this.constructModules(), this.configureModules();
    }
    async start() {
      await [
        "Tools",
        "UI",
        "BlockManager",
        "Paste",
        "BlockSelection",
        "RectangleSelection",
        "CrossBlockSelection",
        "ReadOnly"
      ].reduce((e, t) => e.then(async () => {
        try {
          await this.moduleInstances[t].prepare();
        } catch (o) {
          if (o instanceof oi) throw new Error(o.message);
          z(`Module ${t} was skipped because of %o`, "warn", o);
        }
      }), Promise.resolve());
    }
    render() {
      return this.moduleInstances.Renderer.render(this.config.data.blocks);
    }
    constructModules() {
      Object.entries(Kc).forEach(([e, t]) => {
        try {
          this.moduleInstances[e] = new t({
            config: this.configuration,
            eventsDispatcher: this.eventsDispatcher
          });
        } catch (o) {
          z("[constructModules]", `Module ${e} skipped because`, "error", o);
        }
      });
    }
    configureModules() {
      for (const e in this.moduleInstances) Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
    }
    getModulesDiff(e) {
      const t = {};
      for (const o in this.moduleInstances) o !== e && (t[o] = this.moduleInstances[o]);
      return t;
    }
  }
  class Zc {
    static get version() {
      return "2.31.0-rc.7";
    }
    constructor(e) {
      let t = () => {
      };
      de(e) && Q(e.onReady) && (t = e.onReady);
      const o = new Gc(e);
      this.isReady = o.isReady.then(() => {
        this.exportAPI(o), t();
      });
    }
    exportAPI(e) {
      const t = [
        "configuration"
      ], o = () => {
        Object.values(e.moduleInstances).forEach((i) => {
          Q(i.destroy) && i.destroy(), i.listeners.removeAll();
        }), la(), e = null;
        for (const i in this) Object.prototype.hasOwnProperty.call(this, i) && delete this[i];
        Object.setPrototypeOf(this, null);
      };
      t.forEach((i) => {
        this[i] = e[i];
      }), this.destroy = o, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
        blocks: {
          clear: "clear",
          render: "render"
        },
        caret: {
          focus: "focus"
        },
        events: {
          on: "on",
          off: "off",
          emit: "emit"
        },
        saver: {
          save: "save"
        }
      }).forEach(([i, s]) => {
        Object.entries(s).forEach(([r, l]) => {
          this[l] = e.moduleInstances.API.methods[i][r];
        });
      });
    }
  }
  (function() {
    try {
      if (typeof document < "u") {
        var n = document.createElement("style");
        n.appendChild(document.createTextNode(".ce-header{padding:.6em 0 3px;margin:0;line-height:1.25em;outline:none}.ce-header p,.ce-header div{padding:0!important;margin:0!important}")), document.head.appendChild(n);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  const Qc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>', Jc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>', ed = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>', td = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>', od = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>', nd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>', id = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>';
  class sd {
    constructor({ data: e, config: t, api: o, readOnly: i }) {
      this.api = o, this.readOnly = i, this._settings = t, this._data = this.normalizeData(e), this._element = this.getTag();
    }
    get _CSS() {
      return {
        block: this.api.styles.block,
        wrapper: "ce-header"
      };
    }
    isHeaderData(e) {
      return e.text !== void 0;
    }
    normalizeData(e) {
      const t = {
        text: "",
        level: this.defaultLevel.number
      };
      return this.isHeaderData(e) && (t.text = e.text || "", e.level !== void 0 && !isNaN(parseInt(e.level.toString())) && (t.level = parseInt(e.level.toString()))), t;
    }
    render() {
      return this._element;
    }
    renderSettings() {
      return this.levels.map((e) => ({
        icon: e.svg,
        label: this.api.i18n.t(`Heading ${e.number}`),
        onActivate: () => this.setLevel(e.number),
        closeOnActivate: true,
        isActive: this.currentLevel.number === e.number,
        render: () => document.createElement("div")
      }));
    }
    setLevel(e) {
      this.data = {
        level: e,
        text: this.data.text
      };
    }
    merge(e) {
      this._element.insertAdjacentHTML("beforeend", e.text);
    }
    validate(e) {
      return e.text.trim() !== "";
    }
    save(e) {
      return {
        text: e.innerHTML,
        level: this.currentLevel.number
      };
    }
    static get conversionConfig() {
      return {
        export: "text",
        import: "text"
      };
    }
    static get sanitize() {
      return {
        level: false,
        text: {}
      };
    }
    static get isReadOnlySupported() {
      return true;
    }
    get data() {
      return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
    }
    set data(e) {
      if (this._data = this.normalizeData(e), e.level !== void 0 && this._element.parentNode) {
        const t = this.getTag();
        t.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(t, this._element), this._element = t;
      }
      e.text !== void 0 && (this._element.innerHTML = this._data.text || "");
    }
    getTag() {
      const e = document.createElement(this.currentLevel.tag);
      return e.innerHTML = this._data.text || "", e.classList.add(this._CSS.wrapper), e.contentEditable = this.readOnly ? "false" : "true", e.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), e;
    }
    get currentLevel() {
      let e = this.levels.find((t) => t.number === this._data.level);
      return e || (e = this.defaultLevel), e;
    }
    get defaultLevel() {
      if (this._settings.defaultLevel) {
        const e = this.levels.find((t) => t.number === this._settings.defaultLevel);
        if (e) return e;
        console.warn("(\u0E07'\u0300-'\u0301)\u0E07 Heading Tool: the default level specified was not found in available levels");
      }
      return this.levels[1];
    }
    get levels() {
      const e = [
        {
          number: 1,
          tag: "H1",
          svg: Qc
        },
        {
          number: 2,
          tag: "H2",
          svg: Jc
        },
        {
          number: 3,
          tag: "H3",
          svg: ed
        },
        {
          number: 4,
          tag: "H4",
          svg: td
        },
        {
          number: 5,
          tag: "H5",
          svg: od
        },
        {
          number: 6,
          tag: "H6",
          svg: nd
        }
      ];
      return this._settings.levels ? e.filter((t) => this._settings.levels.includes(t.number)) : e;
    }
    onPaste(e) {
      const t = e.detail;
      if ("data" in t) {
        const o = t.data;
        let i = this.defaultLevel.number;
        switch (o.tagName) {
          case "H1":
            i = 1;
            break;
          case "H2":
            i = 2;
            break;
          case "H3":
            i = 3;
            break;
          case "H4":
            i = 4;
            break;
          case "H5":
            i = 5;
            break;
          case "H6":
            i = 6;
            break;
        }
        this._settings.levels && (i = this._settings.levels.reduce((s, r) => Math.abs(r - i) < Math.abs(s - i) ? r : s)), this.data = {
          level: i,
          text: o.innerHTML
        };
      }
    }
    static get pasteConfig() {
      return {
        tags: [
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6"
        ]
      };
    }
    static get toolbox() {
      return {
        icon: id,
        title: "Heading"
      };
    }
  }
  async function rd() {
    return ne`
    <div class="offcanvas offcanvas-end w-75" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" id="quickNotes" aria-labelledby="analysisConfigsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="quickNotesLabel">Quick notes</h5>
            <div class="d-flex gap-2 ms-auto">
                <a href="/api/v1/files/export-quicknotes" jolt-click="closeOffcanvas" :next="native_export_quicknotes" title="Export pdf" class="btn text-reset" target="_blank" router-ignore="true"><i class="fas fa-save"></i></a>
                <button jolt-click="saveNotes" type="button" class="btn text-reset" title="Save and close" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
        <div class="offcanvas-body">
            <div id="quickNotesEditor">
                
            </div>
        </div>
    </div> 
    `;
  }
  async function ad(n, e, t) {
    const o = await this.editor.save(), [i, s] = await jt.post({
      url: `${this.properties.apiUrl}/quicknotes`,
      data: o
    });
    (i || !s.ok) && this.ext.messenger.setMessage({
      msg: "Failed to save msg",
      status: "warning"
    });
  }
  async function ld(n, e, t) {
    n.blur(), this.offcanvasInstance.hide(), window.pywebview && (e.preventDefault(), await window.pywebview.api[t.next]());
  }
  const cd = ue({
    tagName: "quick-notes-offcanvas",
    markup: rd,
    methods: {
      saveNotes: ad,
      closeOffcanvas: ld
    },
    afterInit: {
      editorInit: function() {
        this.editor = new Zc({
          autofocus: true,
          holder: "quickNotesEditor",
          tools: {
            header: {
              class: sd,
              inlineToolbar: [
                "link"
              ]
            }
          },
          data: this.data
        });
      }
    },
    define: {
      editor: ve(null),
      data: {
        get() {
          return this.getData("quicknotes");
        }
      },
      offcanvasEl: be("#quickNotes"),
      offcanvasInstance: {
        get() {
          return bootstrap.Offcanvas.getInstance(this.offcanvasEl);
        }
      }
    }
  });
  async function dd() {
    return ne`
        <div class="row">
            <div class="col-12 mx-auto text-center">
                <img src="${this.properties.baseUrl}${this.about.logo}" alt="Logo" width="250" />
            </div>
        </div>
        <div>
            <p class="m-1">Version: ${this.about.version}</p>
            <p class="m-1">Homepage: ${this.about.homepage}</p>
            <p class="m-1">Author: ${this.about.author}</p>
            <p class="mt-2 text-justify text-muted">${this.about.description}</p>
        </div>
    `;
  }
  async function Pn() {
    if (this.about) return;
    let [n, e] = await jt.get({
      url: "/about"
    });
    if (n) return this.ext.messenger.setMessage({
      msg: "Failed to fetch about information",
      status: "warning"
    });
    if ([n, e] = await e.json(), n) return this.ext.messenger.setMessage({
      msg: "Failed to parse about information",
      status: "warning"
    });
    this.about = e.data;
  }
  const ud = ue({
    tagName: "about-info",
    markup: dd,
    methods: {
      getAboutInfo: Pn
    },
    beforeInit: {
      getAboutInfo: Pn
    },
    define: {
      about: ve(null)
    }
  });
  function hd(n) {
    fetch("/api/v1/roi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cors: "no-cors"
      },
      body: JSON.stringify({
        roi_type: "ellipse",
        roi_data: n
      })
    }).then(async (e) => {
      e.ok && (e = await e.json(), this.setData("rois", [
        ...this.selectedRois,
        e.data
      ]), await this.handleResponse(e));
    }).catch((e) => {
      this.ext.messenger.setMessage({
        msg: "Failed to get ROI information.",
        status: "warning"
      });
    });
  }
  async function pd(n) {
    const e = n.data;
    try {
      this.drawTimeSeries(e);
    } catch (t) {
      console.error(t);
    }
    this.redrawCanvas();
  }
  async function fd(n, e) {
    switch (e.button) {
      case 0:
        if (this.isDPressed == true) {
          const o = this.canvas.getBoundingClientRect();
          let i = e.clientX - o.left, s = e.clientY - o.top;
          const r = this.findClickedEllipseIndex(i, s);
          if (r != null) {
            if ((await fetch(`/api/v1/roi/${r}`, {
              method: "DELETE"
            })).ok) {
              this.selectedRois.splice(r, 1), this.setData("rois", this.selectedRois), this.redrawCanvas(), this.removeTrace(r);
              return;
            }
            this.ext.messenger.setMessage({
              msg: "Failed to delete ROI",
              status: "warning"
            });
            return;
          }
        }
        break;
      case 2:
        const t = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - t.left, this.startY = e.clientY - t.top, this.isDrawing = true;
        break;
    }
  }
  function gd(n, e) {
    if (this.isDrawing) {
      this.redrawCanvas();
      const t = canvas.getBoundingClientRect(), o = e.clientX - t.left, i = e.clientY - t.top;
      this.drawEllipse(this.startX, this.startY, o, i, false);
    }
  }
  function md(n, e) {
    switch (e.button) {
      case 0:
        break;
      case 2:
        if (this.isDrawing) {
          const t = this.canvas.getBoundingClientRect(), o = e.clientX - t.left, i = e.clientY - t.top;
          this.getRoiData({
            startX: Math.round(this.startX),
            startY: Math.round(this.startY),
            endX: Math.round(o),
            endY: Math.round(i)
          });
        }
        this.isDrawing = false;
        break;
    }
  }
  function vd(n, e, t, o, i = false, s = "orange", r = 3) {
    i && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.strokeStyle = s, this.ctx.lineWidth = r, this.ctx.beginPath(), this.ctx.ellipse((n + t) / 2, (e + o) / 2, Math.abs(t - n) / 2, Math.abs(o - e) / 2, 0, 0, 2 * Math.PI), this.ctx.stroke();
  }
  function bd() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.selectedRois.forEach((n) => {
      const e = n.roi_schema.roi_data;
      this.drawEllipse(e.startX, e.startY, e.endX, e.endY);
    });
  }
  async function yd(n, e, t) {
    const o = +n.value;
    this.video.playbackRate = o, e.target.labels[0].innerHTML = `Speed: ${o}x`;
  }
  async function kd(n, e, t) {
    const o = e.offsetX / n.offsetWidth;
    this.video.currentTime = o * video.duration;
  }
  async function wd() {
    const n = this.video.currentTime / this.video.duration * 100;
    this.seekbar.style.width = n + "%";
  }
  async function Ed(n, e) {
    this.video.paused || this.video.ended ? (this.video.play(), this.playPauseButton.textContent = "Pause") : (this.video.pause(), this.playPauseButton.textContent = "Play"), n.blur();
  }
  async function xd(n) {
    (n.key === "D" || n.key === "d") && (this.isDPressed = true);
  }
  async function Cd(n) {
    (n.key === "D" || n.key === "d") && (this.isDPressed = false);
  }
  async function Td() {
    document.addEventListener("keydown", this.keyDownHandler), document.addEventListener("keyup", this.keyUpHandler);
  }
  async function Sd() {
    document.removeEventListener("keydown", this.keyDownHandler), document.removeEventListener("keyup", this.keyUpHandler);
  }
  function _d(n) {
    this.plot.drawTimeSeries(n), this.singlePlot.removeTrace(), this.singlePlot.drawTimeSeries(n);
  }
  function Bd() {
    if (this.selectedRois.length < 1) return;
    tt(), this.plot.purgeTraces(), this.plot.initPlot();
    for (const e of this.selectedRois) this.plot.drawTimeSeries(e);
    this.singlePlot.removeTrace();
    const n = this.selectedRois[this.selectedRois.length - 1];
    this.singlePlot.drawTimeSeries(n), mt();
  }
  function Md(n, e) {
    return this.selectedRois.reduce((o, i, s) => {
      const r = (i.roi_schema.roi_data.startX + i.roi_schema.roi_data.endX) / 2, l = (i.roi_schema.roi_data.startY + i.roi_schema.roi_data.endY) / 2, d = Math.abs(i.roi_schema.roi_data.endX - i.roi_schema.roi_data.startX) / 2, h = Math.abs(i.roi_schema.roi_data.endY - i.roi_schema.roi_data.startY) / 2;
      return (n - r) ** 2 / d ** 2 + (e - l) ** 2 / h ** 2 <= 1 && o === null ? s : o;
    }, null);
  }
  function Od(n) {
    this.plot.removeTrace(n), this.singlePlot.removeTrace();
    const e = this.selectedRois[this.selectedRois.length - 1];
    this.singlePlot.drawTimeSeries(e);
  }
  async function Ad(n, e, t) {
    window.pywebview && (e.preventDefault(), await window.pywebview.api[t.next]());
  }
  const Id = ue({
    tagName: "video-player",
    markup: async function() {
      return await this.getHTMLtemplate("/video");
    },
    methods: {
      setPlaybackSpeed: yd,
      seek: kd,
      updateSeekBar: wd,
      playPauseVideo: Ed,
      canvasClick: fd,
      canvasMouseMove: gd,
      canvasMouseUp: md,
      drawEllipse: vd,
      keyDownHandler: xd,
      keyUpHandler: Cd,
      getRoiData: hd,
      redrawCanvas: bd,
      handleResponse: pd,
      drawTimeSeries: _d,
      findClickedEllipseIndex: Md,
      removeTrace: Od,
      redrawAllTS: Bd,
      tryNativeExport: Ad
    },
    beforeInit: {
      getInitialSampling: function() {
        this.initialSampling = parseFloat(this.sampling);
      },
      addEventListeners: Td,
      preferencesChange: function() {
        this.app.addEventListener(Ne.CHANGE, (n) => {
          n.detail.field == "preferences" && this.initialSampling != parseFloat(this.sampling) && (this.initialSampling = parseFloat(this.sampling), this.redrawAllTS());
        });
      }
    },
    afterInit: {
      drawRois: function() {
        this.selectedRois && this.redrawCanvas();
      }
    },
    afterDisconnect: {
      removeEventListeners: Sd
    },
    define: {
      video: be("video"),
      seekbar: be(".seekbar"),
      playPauseButton: be("#play-pause"),
      canvas: be("#canvas"),
      ctx: {
        get() {
          return this.canvas.getContext("2d");
        }
      },
      time: ve(null),
      sampling: {
        get() {
          return this.getData("preferences").sampling;
        }
      },
      selectedRois: {
        get() {
          return this.getData("rois");
        }
      },
      isDrawing: ve(false),
      isDPressed: ve(false),
      startX: ve(null),
      startY: ve(null),
      tsViewer: {
        get() {
          return this.app.querySelector("#ts-viewer");
        }
      },
      plot: {
        get() {
          return this.app.querySelector("ts-plot-all");
        }
      },
      singlePlot: {
        get() {
          return this.app.querySelector("single-plot");
        }
      },
      initialSampling: ve(null)
    }
  });
  async function Ld() {
    return "";
  }
  function Nd({ title: n, content: e, modalId: t }) {
    return ne`
    <div class="modal" data-modal-id="${t}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${n}</h5>
                    <button type="button" class="btn-close" aria-label="Close" 
                    jolt-click="closeModal" :modalid="${t}"></button>
                </div>
                <div class="modal-body">
                    ${e}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" 
                    jolt-click="closeModal" :modalid="${t}">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
  }
  function Pd({ title: n, content: e, modalId: t }) {
    return ne`
    <div class="modal" data-modal-id="${t}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${n}</h5>
                    <button type="button" class="btn-close" aria-label="Close" 
                    jolt-click="closeModal" :modalid="${t}"></button>
                </div>
                <div class="modal-body">
                    ${e}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-1" 
                    jolt-click="closeModal" :modalid="${t}">Close</button>
                    <button type="button" class="btn btn-primary confirm-button-${t}" 
                    :modalid="${t}">Ok</button>
                </div>
            </div>
        </div>
    </div>`;
  }
  async function Dd({ msg: n, status: e, msgId: t }) {
    return ne`
        <div class="toast toast-${t} show bg-${e}" role="alert" aria-live="assertive"
            aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header bg-transparent">
                <button type="button" class="btn-close btn-close-white" jolt-click="removeToast" :msgid="${t}" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${n}
            </div>
        </div>
    `;
  }
  async function Rd(n, e, t) {
    const o = this.querySelector(`.toast-${t.msgid}`);
    o && o.remove();
  }
  async function jd({ msg: n, status: e = "info" }) {
    const t = this.app.generateHash(6), o = await this.msgMarkup({
      msg: n,
      status: e,
      msgId: t
    });
    this.insertAdjacentHTML("beforeend", o), setTimeout(() => {
      this.removeToast(null, null, {
        msgid: t
      });
    }, 6e3);
  }
  async function Hd({ title: n, content: e, modalOptions: t }) {
    const o = `modal-${this.app.generateHash(6)}`;
    return this.insertAdjacentHTML("beforeend", await this.infoModalMarkup({
      title: n,
      content: e,
      modalId: o
    })), await this.initModal(o, t);
  }
  async function Fd({ title: n, content: e, callbackFunction: t, modalOptions: o }) {
    const i = `modal-${this.app.generateHash(6)}`;
    this.insertAdjacentHTML("beforeend", await this.confirmModalMarkup({
      title: n,
      content: e,
      modalId: i
    }));
    const s = await this.initModal(i, o);
    return this.querySelector(`.confirm-button-${i}`).addEventListener("click", async (l) => {
      await t(l, s), await this.closeModal(l.target);
    }), s;
  }
  async function Vd(n, e) {
    const t = {
      ...this.defaultOptions
    };
    e && (t = {
      ...t,
      ...e
    });
    const o = this.querySelector(`[data-modal-id="${n}"]`), i = new bootstrap.Modal(o, t);
    return this.modals.push(i), i.show(), i;
  }
  async function $d(n, e, t) {
    n.blur();
    const o = n.closest(".modal");
    if (!o) return;
    o.getAttribute("data-modal-id"), bootstrap.Modal.getInstance(o).hide(), o.remove();
  }
  const Ud = ue({
    tagName: "messenger-element",
    markup: Ld,
    methods: {
      closeModal: $d,
      infoModal: Hd,
      infoModalMarkup: Nd,
      initModal: Vd,
      confirmModal: Fd,
      confirmModalMarkup: Pd,
      msgMarkup: Dd,
      setMessage: jd,
      removeToast: Rd
    },
    define: {
      defaultOptions: ve({
        backdrop: true,
        focus: true,
        keyboard: true
      }),
      modals: ve([])
    }
  });
  class zd {
    constructor(e) {
      __publicField(this, "infoModal", async ({ title: e, content: t, modalOptions: o }) => await this.messengerElement.infoModal({
        title: e,
        content: t,
        modalOptions: o
      }));
      __publicField(this, "confirmModal", async ({ title: e, content: t, callbackFunction: o, modalOptions: i }) => await this.messengerElement.confirmModal({
        title: e,
        content: t,
        callbackFunction: o,
        modalOptions: i
      }));
      __publicField(this, "setMessage", async ({ msg: e, status: t = "info" }) => await this.messengerElement.setMessage({
        msg: e,
        status: t
      }));
      this.app = e;
    }
    get messengerElement() {
      return this.app.querySelector("messenger-element");
    }
  }
  async function qd() {
    return ne`
      <div id="ts-plot-all"></div>
    `;
  }
  function Wd(n) {
    const e = [
      ...Array(n.data.length).keys()
    ].map((t) => (t + 1) / this.sampling);
    Plotly.addTraces(this.plotDiv, [
      {
        x: e,
        y: n.data
      }
    ]);
  }
  function Yd(n) {
    Plotly.deleteTraces(this.plotDiv, n);
  }
  function Xd() {
    Plotly.purge(this.plotDiv);
  }
  function Rt() {
    this.plotDiv && (this.plot = Plotly.newPlot(this.plotDiv, [], {
      margin: {
        t: 0,
        b: 30,
        r: 0
      },
      showlegend: false,
      height: this.attrs.height,
      xaxis: {
        title: {
          text: "time [s]",
          standoff: 5,
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        }
      },
      yaxis: {
        title: {
          text: "Cell signal (a.u.)",
          standoff: 5,
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        }
      }
    }, {
      displaylogo: false,
      modeBarButtonsToRemove: [
        "select2d",
        "lasso2d"
      ],
      responsive: true
    }));
  }
  const Kd = ue({
    tagName: "ts-plot-all",
    markup: qd,
    methods: {
      drawTimeSeries: Wd,
      removeTrace: Yd,
      purgeTraces: Xd,
      initPlot: Rt
    },
    afterInit: {
      initPlot: Rt,
      drawTs: function() {
        if (this.rois) for (const n of this.rois) this.drawTimeSeries(n);
      }
    },
    define: {
      plotDiv: be("#ts-plot-all"),
      plot: ve(null),
      sampling: {
        get() {
          return +this.getData("preferences").sampling;
        }
      },
      rois: {
        get() {
          return this.getData("rois");
        }
      }
    }
  });
  async function Gd() {
    return ne`
        <div id="ts-plot-single"></div>
    `;
  }
  function Zd(n) {
    if (!n || !n.data) {
      this.removeTrace();
      return;
    }
    const e = [
      ...Array(n.data.length).keys()
    ].map((t) => (t + 1) / this.sampling);
    Plotly.addTraces(this.plotDiv, [
      {
        x: e,
        y: n.data
      }
    ]);
  }
  const Qd = ue({
    tagName: "single-plot",
    markup: Gd,
    methods: {
      drawTimeSeries: Zd,
      removeTrace: function() {
        this.plotDiv.data.length > 0 && Plotly.deleteTraces(this.plotDiv, 0);
      },
      initPlot: Rt
    },
    afterInit: {
      initPlot: Rt,
      drawTs: function() {
        this.roi && this.drawTimeSeries(this.roi);
      }
    },
    define: {
      plotDiv: be("#ts-plot-single"),
      plot: ve(null),
      sampling: {
        get() {
          return +this.getData("preferences").sampling;
        }
      },
      roi: {
        get() {
          const n = this.getData("rois");
          return !n || n.length == 0 ? null : n[n.length - 1];
        }
      },
      time: ve(null)
    }
  });
  async function Jd() {
    return ne`
    <div>
        <p class="lead">Copyright 2025 @ Marko Šterk</p>

        <p class="text-justify">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
        associated documentation files (the “Software”), to deal in the Software without restriction, including 
        without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
        copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
        following conditions:</p>

        <p class="text-justify">The above copyright notice and this permission notice shall be included in all copies or substantial portions 
        of the Software.</p>

        <p class="text-justify">THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
        TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
        THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
        CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
        IN THE SOFTWARE.</p>
    </div>
    `;
  }
  const eu = ue({
    tagName: "license-tab",
    markup: Jd
  });
  async function tu() {
    return ne`
    <p>
        Šterk, M., & Gosak, M. (2025). Beta cell analysis: roi picker (Version 1.0.) [Computer software]. https://github.com/MarkoSterk/beta_cell_analysis_roi_picker
    </p>
    `;
  }
  const ou = ue({
    tagName: "citation-tab",
    markup: tu
  });
  async function nu() {
    return ne`
        <div class="row">
            <div class="col-2 fw-bold">Author</div>
            <div class="col-10">Marko Šterk</div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Affiliations</div>
            <div class="col-10">
                <p>Institute of Information Science, Prešernova ulica 17, 2000 Maribor, Slovenia</p>
                <p>Alma Mater Europaea University, Slovenska ulica 17, 2000 Maribor, Slovenia</p>
                <p>University of Maribor, Faculty of Medicine, Institute of Physiology, Taborska ulica 8, 2000 Maribor, Slovenia</p>
            </div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Contact</div>
            <div class="col-10"><a href="mailto:marko_sterk@hotmail.com" router-ignore="true" target="_blank">marko_sterk@hotmail.com</a></div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Social media</div>
            <div class="col-10">
                <a class="text-reset d-block" router-ignore="true" href="https://github.com/MarkoSterk" target="_blank">GitHub</a>
                <a class="text-reset d-block" router-ignore="true" href="https://www.linkedin.com/in/marko-sterk/" target="_blank">LinkedIn</a>
            </div>
        </div>
    `;
  }
  const iu = ue({
    tagName: "contact-tab",
    markup: nu
  });
  async function su() {
    return ne`
        <div>
            <div class="accordion" id="issuesAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" style="background-color: #0078d7;" jolt-click="unfocusBtn" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Video playback speed on MacOS and Safari browser
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#issuesAccordion">
                        <div class="accordion-body">
                            <p>
                                The application uses the OS' native browser engine for the application window. This means that on MacOS
                                the same engine is used as is used by the Safari browser. This means that there will be issues with video playback
                                when playback speed is increased beyond 2x. As of now the reason for this issue is unknown, however, we
                                are researching possible solutions and will provide an updated version of the application as soon as we find
                                a viable solution.
                            </p>
                            <p>
                                In the mean time, you can bypass the issue by starting the application but not using the application
                                window. Instead, use Google Chrome browser to navigate to http://localhost:8080/app and work in the
                                Chrome browser where video playback speed is not an issue.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <p class="fw-bold">If you find any other issues please feel free to contact me or open an issue ticket on the GitHub repository.</p>
        <div>
    `;
  }
  async function ru(n, e, t) {
    n.blur();
  }
  const au = ue({
    tagName: "issues-tab",
    markup: su,
    methods: {
      unfocusBtn: ru
    }
  });
  async function lu() {
    return ne`
    <ol>
        <li>
            <strong>Start or Open a Project</strong>
            <ul>
                <li>To begin with existing data, choose <em>File → Open Project</em> 
                and select your saved <code>.pkl</code> file.</li>
                <li>To load a new dataset, choose <em>File → Import LIF</em> and pick 
                your <code>.lif</code> file or drop the .lif file into the dropzone.</li>
            </ul>
        </li>
        <li>
            <strong>Set Your Preferences</strong>
            <ul>
                <li>Open <em>Preferences</em> from the menu bar.</li>
                <li>Enter your <strong>Project Name</strong>.</li>
                <li>Specify the <strong>Sampling Rate</strong> (Hz) for your time‐series data.</li>
                <li>If you need to convert pixel coordinates to micrometers, enter the 
                <strong>Coordinate transform</strong> (µm/px) coefficient.</li>
                <li>Click <i class="fa-solid fa-check"></i> to save.</li>
            </ul>
        </li>
        <li>
            <strong>Select Regions of Interest (ROIs)</strong>
            <ul>
                <li>Play or scrub the video to the frame you want.</li>
                <li>Adjust playback speed as needed.</li>
                <li>Right-click and drag on the video display to draw an ellipse for each ROI.</li>
                <li>To remove a ROI, hold down <kbd>D</kbd> and left-click on that ROI.</li>
            </ul>
        </li>
        <li>
            <strong>View Time Series</strong>
            <ul>
                <li>As you create ROIs, the <strong>upper graph</strong> on the right updates to show the time series for all selected cells.</li>
                <li>The <strong>lower graph</strong> shows only the time series for the most recently selected ROI.</li>
            </ul>
        </li>
        <li>
            <strong>Export Cell Data</strong>
            <ul>
                <li>When you’ve selected all your ROIs, click <em>Export Time Series</em> (below the video) to save time series of all ROIs as <code>.txt</code> file.</li>
                <li>Click <em>Export Coordinates</em> to save the x,y positions of each ROI as a separate <code>.txt</code> file.</li>
            </ul>
        </li>
        <li>
            <strong>Add Quick Notes</strong>
            <ul>
                <li>Click the <i class="far fa-sticky-notes"></i> icon (far right of the toolbar) to open the Quick Notes panel.</li>
                <li>Type any observations—e.g., tissue drift, multiple islets, response quality, etc.</li>
                <li>Click <i class="fa-solid fa-check"></i> to save the quicknotes.</li>
            </ul>
        </li>
        <li>
            <strong>Save Notes as PDF</strong>
            <ul>
                <li>In the Quick Notes panel, click the <i class="fas fa-save"></i> icon to export your quicknotes as a .pdf file.</li>
            </ul>
        </li>
        <li>
            <strong>Save or Export the Project</strong>
            <ul>
                <li>To bundle everything (video data, preferences, ROIs, quicknotes) into a single file for later work or sharing, choose <em>File → Save Project</em>.</li>
                <li>This creates a <code>.pkl</code> file you can re‐open at any time.</li>
            </ul>
        </li>
            <li>
            <strong>Start a New Project</strong>
            <ul>
                <li>With any project open, you can begin a fresh one by going to <em>File → New Project</em>.</li>
                <li>Repeat steps 1–8 as needed.</li>
            </ul>
        </li>
    </ol>  
    `;
  }
  const cu = ue({
    tagName: "basic-usage-tab",
    markup: lu
  }), du = {
    baseLayout: Rs,
    menuElement: ar
  }, uu = {
    homePage: Yn,
    documentationPage: Xn
  }, hu = {
    configurationsOffcanvas: hr,
    quickNotesOffcanvas: cd,
    aboutInfo: ud,
    messengerElement: Ud,
    uploadDropZone: Ws,
    videoPlayer: Id,
    tsPlotAll: Kd,
    singlePlot: Qd,
    licenseTab: eu,
    citationTab: ou,
    contactTab: iu,
    issuesTab: au,
    basicUsageTab: cu
  }, Dn = {
    ...du,
    ...uu,
    ...hu
  }, Rn = "#content";
  function pu() {
    return [
      {
        path: "/",
        handler: Yn,
        target: Rn
      },
      {
        path: "/documentation",
        handler: Xn,
        target: Rn
      }
    ];
  }
  const fu = {
    apiUrl: "/api/v1",
    baseUrl: "http://localhost:8080",
    filesApi: {
      uploadLif: [
        "/api/v1/files",
        "postForm"
      ]
    }
  }, gu = new Ts({
    appName: "Beta cell analysis",
    dataStructure: {
      data: null,
      video: null,
      rois: null,
      preferences: null,
      quicknotes: null
    },
    elements: Dn,
    properties: fu,
    router: function(n) {
      return new cs({
        baseUrl: "/app",
        routes: pu,
        baseLayout: Dn.baseLayout,
        defaultTarget: "#content",
        index: "/",
        app: n
      });
    },
    extensions: {
      messenger: function(n) {
        return new zd(n);
      }
    },
    beforeInit: {
      startOverlaySpinner: tt,
      getState: async function() {
        let n = await fetch("/state");
        if (!(n == null ? void 0 : n.ok) && (n == null ? void 0 : n.status) != 200) throw new Error("Failed to fetch initial state");
        n = await n.json();
        for (const [e, t] of Object.entries(n.data)) this.setData(e, t);
      },
      suppressContextMenu: function() {
        document.addEventListener("contextmenu", (n) => {
          n.preventDefault();
        });
      }
    },
    afterInit: {
      removeOverlaySpinner: mt
    }
  });
  async function mu() {
    await gu.init("#app");
  }
  await mu();
})();
