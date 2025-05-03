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
  var _r2, _e2, _h2, _s2, _t2, _o2, _a2, _i2, _l2, _p2, _c2, _n2, _d2, _f2, _m, _g, _u2, _v, _w, _E, _x, _C, _b, _y, _k, _T, __, _r3, _Hs_instances, e_fn, _h3, _s3, _t3, _o3, a_fn, _i3, _l3, _p3, _c3, _n3, _d3, _f3, _m2, _g2, _u3, _v2, _r4, _e3, _h4, _s4, _t4, _o4, _a3, _i4, _l4, _p4, _c4, _n4, _d4, _f4, _m3, _g3, _u4, _v3;
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
    new MutationObserver((i) => {
      for (const r of i) if (r.type === "childList") for (const s of r.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(i) {
      const r = {};
      return i.integrity && (r.integrity = i.integrity), i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? r.credentials = "include" : i.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
    }
    function n(i) {
      if (i.ep) return;
      i.ep = true;
      const r = t(i);
      fetch(i.href, r);
    }
  })();
  var Ue = {
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
  Ue.encodeHTMLSource = function(o) {
    var e = {
      "&": "&#38;",
      "<": "&#60;",
      ">": "&#62;",
      '"': "&#34;",
      "'": "&#39;",
      "/": "&#47;"
    }, t = o ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
    return function(n) {
      return n ? n.toString().replace(t, function(i) {
        return e[i] || i;
      }) : "";
    };
  };
  var ki = {
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
  }, $e = /$^/;
  function qi(o, e, t) {
    return (typeof e == "string" ? e : e.toString()).replace(o.define || $e, function(n, i, r, s) {
      return i.indexOf("def.") === 0 && (i = i.substring(4)), i in t || (r === ":" ? (o.defineParams && s.replace(o.defineParams, function(a, d, u) {
        t[i] = {
          arg: d,
          text: u
        };
      }), i in t || (t[i] = s)) : new Function("def", "def['" + i + "']=" + s)(t)), "";
    }).replace(o.use || $e, function(n, i) {
      o.useParams && (i = i.replace(o.useParams, function(s, a, d, u) {
        if (t[d] && t[d].arg && u) {
          var p = (d + ":" + u).replace(/'|\\/g, "_");
          return t.__exp = t.__exp || {}, t.__exp[p] = t[d].text.replace(new RegExp("(^|[^\\w$])" + t[d].arg + "([^\\w$])", "g"), "$1" + u + "$2"), a + "def.__exp['" + p + "']";
        }
      }));
      var r = new Function("def", "return " + i)(t);
      return r && qi(o, r, t);
    });
  }
  function Ze(o) {
    return o.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
  }
  Ue.template = function(o, e, t) {
    e = e || Ue.templateSettings;
    var n = e.append ? ki.append : ki.split, i, r = 0, s;
    o = e.use || e.define ? qi(e, o, t || {}) : o, o = o.replace(/<([a-zA-Z0-9\-]+)([^>]*)\sdata-bind="([^"]+)"([^>]*)>/g, (d, u, p, v, b) => {
      var w = this.generateHash(), y = `<${u}${p} data-bind="${gt(v)}" data-bind-id="${w}"${b}>`;
      return y;
    });
    const a = document.createElement("div");
    this.app._originalInnerHTML.call(a, o), a.querySelectorAll("[data-bind]").forEach((d) => {
      const u = d.getAttribute("data-bind"), p = d.getAttribute("data-bind-id"), v = d.innerHTML;
      e.dataBinds.has(u) || e.dataBinds.set(u, {});
      const b = document.createElement("textarea");
      b.innerHTML = v;
      const w = e.dataBinds.get(u);
      w[p] = b.value, e.dataBinds.set(u, w);
    }), o = ("var out='" + (e.strip ? o.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : o).replace(/'|\\/g, "\\$&").replace(e.interpolate || $e, function(d, u) {
      return n.start + Ze(u) + n.end;
    }).replace(e.encode || $e, function(d, u) {
      return i = true, n.startencode + Ze(u) + n.end;
    }).replace(e.conditional || $e, function(d, u, p) {
      return u ? p ? "';}else if(" + Ze(p) + "){out+='" : "';}else{out+='" : p ? "';if(" + Ze(p) + "){out+='" : "';}out+='";
    }).replace(e.iterate || $e, function(d, u, p, v) {
      return u ? (r += 1, s = v || "i" + r, u = Ze(u), "';var arr" + r + "=" + u + ";if(arr" + r + "){var " + p + "," + s + "=-1,l" + r + "=arr" + r + ".length-1;while(" + s + "<l" + r + "){" + p + "=arr" + r + "[" + s + "+=1];out+='") : "';} } out+='";
    }).replace(e.evaluate || $e, function(d, u) {
      return "';" + Ze(u) + "out+='";
    }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), i && (o = "var encodeHTML = " + Ue.encodeHTMLSource.toString() + "(" + (e.doNotSkipEncoded || "") + ");" + o);
    try {
      return new Function(e.varname, o);
    } catch (d) {
      throw typeof console < "u" && console.log("Could not create a template function: " + o), d;
    }
  };
  Ue.compile = function(o, e) {
    return Ue.template(o, null, e);
  };
  const Ds = {
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
  function Rs(o = 1e4, e = 1) {
    return Math.floor(Math.random() * (o - e + 1)) + e;
  }
  function ge(o) {
    return function(t) {
      const n = window.structuredClone(o);
      return [
        void 0,
        null
      ].includes(n) || (this._values[t] = n), {
        get() {
          return this._values[t];
        },
        set(i) {
          this._values[t] = i, this._refreshBoundElements(gt(t));
        }
      };
    };
  }
  function me(o) {
    if ([
      void 0,
      null,
      ""
    ].includes(o)) throw new Error("Missing or invalid query selector for querySelector getter factory");
    return function() {
      const t = o;
      return {
        get() {
          return this.querySelector(t);
        }
      };
    };
  }
  function js(o) {
    if ([
      void 0,
      null,
      ""
    ].includes(o)) throw new Error("Missing or invalid query selector for querySelector getter factory");
    return function() {
      const t = o;
      return {
        get() {
          return this.querySelectorAll(t);
        }
      };
    };
  }
  const ie = String.raw, Wi = String.raw;
  const _Ne = class _Ne extends HTMLElement {
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
      __privateAdd(this, _r2);
      __privateAdd(this, _e2);
      __publicField(this, "_beforeInit");
      __publicField(this, "_beforeInitResolve");
      __publicField(this, "_afterInit");
      __publicField(this, "_beforeRerender");
      __publicField(this, "_afterRerender");
      __publicField(this, "_afterDisconnect");
      __publicField(this, "app");
      __publicField(this, "_parent");
      __privateAdd(this, _h2, "virtual-render-div");
      __publicField(this, "_values", {});
      __privateAdd(this, _s2);
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
        if (this.app = e, this.app.addEventListener(Fe.ABORTROUTETRANSITION, __privateGet(this, _a2)), this.rndId = Rs(), this.hashId = this.getAttribute("data-hash-id") || this.generateHash(), this.getAttribute("data-hash-id") || this.setAttribute("data-hash-id", this.hashId), !this.getAttribute("data-parent-id")) {
          let t = this.parentElement.closest("[data-hash-id]");
          t && (this.setAttribute("data-parent-id", t.getAttribute("data-hash-id")), this._parent = t);
        }
        if (this._templateVariables = {}, __privateSet(this, _t2, window.structuredClone(Ds)), __privateGet(this, _i2).call(this), __privateSet(this, _s2, Object.getOwnPropertyNames(this)), __privateGet(this, _p2).call(this), __privateGet(this, _l2).call(this), await __privateGet(this, _n2).call(this, this._beforeInit), this.app.addEventListener(Le.CHANGE, this._updateBoundAppDataParts), this.app.addEventListener(Le.QUERYCHANGE, this._updateBoundQueryDataParts), await __privateGet(this, _d2).call(this), await this.render(), this._abort) {
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
          if (__privateGet(this, _s2).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected property name. Can't assign property with name (${e}) that is protected or if it is of illegal format (startswith: # or _) to element ${this.tagName}`);
          if (typeof t == "function") Object.defineProperty(this, e, t.bind(this)(e));
          else {
            let n = {
              get() {
                return t.get.bind(this)();
              }
            };
            t.set && (n = {
              ...n,
              set(i) {
                t.set.bind(this)(i), this._refreshBoundElements(e);
              }
            }), Object.defineProperty(this, e, n);
          }
        }
      });
      __publicField(this, "_refreshBoundElements", (e) => {
        var _a4;
        this.renderTime = Date.now(), (_a4 = this.querySelectorAll(`[data-bind="${e}"]`)) == null ? void 0 : _a4.forEach((t) => {
          const n = __privateGet(this, _t2).dataBinds.get(e);
          if (!n) return;
          const i = t.getAttribute("data-bind-id");
          if (!i) return;
          const r = n[i];
          r && (t.setAttribute("data-render-time", `${this.renderTime}`), t.innerHTML = r);
        });
      });
      __publicField(this, "_updateBoundAppDataParts", (e) => {
        this._refreshBoundElements(`app.${e.detail.field}`);
      });
      __publicField(this, "_updateBoundQueryDataParts", (e) => {
        var _a4;
        ((_a4 = e == null ? void 0 : e.detail) == null ? void 0 : _a4.key) ? this._refreshBoundElements(`query.${e.detail.key}`) : this._refreshBoundElements("query");
      });
      __privateAdd(this, _p2, () => {
        for (const [e, t] of Object.entries(this._methods)) {
          if (__privateGet(this, _s2).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected method name. Can't assign method with name (${e}) 
                    that is protected or if it is of illegal format (startswith: # or _) to element ${this.tagName}`);
          try {
            this[e] = t.bind(this);
          } catch (n) {
            throw new Error(`${t} is probably not a function. Failed to bind method ${t} to element ${this.tagName}.` + n);
          }
        }
        this._methods = null;
      });
      __privateAdd(this, _c2, async () => {
        const e = [];
        return Array.from(this.querySelectorAll("*")).filter((n) => n instanceof _Ne).forEach((n) => {
          e.push(n.initComplete);
        }), await Promise.all(e);
      });
      __publicField(this, "awaitElementsActivation", async () => await __privateGet(this, _c2).call(this));
      __privateAdd(this, _n2, async (e) => {
        for (const [t, n] of Object.entries(e)) await n.bind(this)();
      });
      __privateAdd(this, _d2, async () => {
        var _a4, _b2;
        Wi && (__privateSet(this, _r2, ((_a4 = this == null ? void 0 : this.css) == null ? void 0 : _a4.scoped) || false), __privateSet(this, _e2, await ((_b2 = this.css) == null ? void 0 : _b2.style.bind(this)()) || null), __privateGet(this, _f2).call(this));
      });
      __privateAdd(this, _f2, () => {
        if (!__privateGet(this, _e2)) return;
        const e = `[data-element="${this.tagName.toLowerCase()}"]`;
        if (document.head.querySelector(e)) return;
        const t = document.createElement("style");
        if (t.textContent = __privateGet(this, _e2), t.setAttribute("disabled", ""), t.setAttribute("data-element", this.tagName.toLowerCase()), document.head.appendChild(t), !__privateGet(this, _r2)) {
          t.removeAttribute("disabled");
          return;
        }
        const n = t.sheet, i = (s, a) => s.split(" ").map((d) => d.replace(/([a-zA-Z0-9\.\#\-_]+)([:].*)?/, (u, p, v) => p + a + (v || ""))).join(" "), r = [];
        for (let s of n.cssRules) if (s instanceof CSSStyleRule) {
          const a = s.selectorText.split(",").map((d) => i(d.trim(), e)).join(", ");
          r.push(`${a} { ${s.style.cssText} }`);
        } else if (s instanceof CSSMediaRule) {
          const a = [];
          for (let d of s.cssRules) if (d instanceof CSSStyleRule) {
            const u = d.selectorText.split(",").map((p) => i(p.trim(), e)).join(", ");
            a.push(`${u} { ${d.style.cssText} }`);
          }
          r.push(`@media ${s.media.mediaText} { ${a.join(" ")} }`);
        }
        t.textContent = r.join(`
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
        return t.classList.add(__privateGet(this, _h2)), this.app._originalInsertAdjacentHTML.call(t, "afterbegin", e), this.lastRender = Date.now(), __privateGet(this, _x).call(this, t), __privateGet(this, __).call(this, t);
      });
      __privateAdd(this, _u2, (e) => {
        try {
          let n = Ue.template.bind(this)(e, __privateGet(this, _t2), void 0).bind(this)(this._templateVariables);
          return this._templateVariables = {}, __privateGet(this, _g).call(this, n);
        } catch {
          console.error("Failed to run #dotJSengine for element: ", this);
        }
      });
      __publicField(this, "_dotJSengine", (e) => __privateGet(this, _u2).call(this, e));
      __publicField(this, "getAttrs", (e) => {
        const t = e.dataset, n = {};
        for (const [i, r] of Object.entries(t)) if (!this.app._filterAttributeNames.includes(i)) try {
          n[i] = JSON.parse(r.trim());
        } catch {
          n[i] = r;
        }
        return n;
      });
      __publicField(this, "addTemplateVariable", (e, t) => {
        this._templateVariables[e] = t;
      });
      __publicField(this, "clearTemplateVariables", () => {
        this._templateVariables = {};
      });
      __privateAdd(this, _v, (e) => e.replace(/@(\w+)=/g, "jolt-$1="));
      __privateAdd(this, _w, (e) => e.replace(/:(\w+)=/g, "data-$1="));
      __privateAdd(this, _E, (e) => e.replace(/<([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*)([^>]*)\s*(\/?)>/g, (t, n, i, r) => {
        if (this.app._elements[n]) {
          const a = this.app._elements[n].tagName;
          return r ? `<${a}${i}/>` : `<${a}${i}></${a}>`;
        }
        return t;
      }));
      __privateAdd(this, _x, (e) => {
        e.querySelectorAll("[jolt-show-if]").forEach((t) => {
          const n = t.getAttribute("jolt-show-if");
          [
            false,
            "false",
            null,
            "null",
            void 0,
            "undefined"
          ].includes(n) && t.remove();
        });
      });
      __privateAdd(this, _C, (e) => this.getAttrs(e));
      __publicField(this, "getEventTypeAndMethod", (e) => {
        if (!e.attributes) return [
          null,
          null
        ];
        for (const n of e.attributes) if (n.name.startsWith("jolt-")) {
          const i = e.getAttribute(n.name);
          return [
            n.name,
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
          const n = t.element, i = t.eventName, r = t.methodName;
          if (n[`jolt-${i}:active`]) return;
          const s = this._createEventListenerMethod(n, r);
          n.addEventListener(i, s), n[`jolt-${i}:active`] = true, n[`jolt-${i}:active-method-${r}`] = s;
        }
      });
      __publicField(this, "_createEventListenerMethod", (e, t) => async (n) => {
        let i = __privateGet(this, _C).call(this, e);
        try {
          i && Object.keys(i).length != 0 ? await this[t](e, n, i) : await this[t](e, n);
        } catch (r) {
          throw console.error(r), new Error(`Could not run method ${t} on element ${this.tagName}`);
        }
      });
      __publicField(this, "createEventListenerMethod", (e, t) => this._createEventListenerMethod(e, t));
      __publicField(this, "_setEventListeners", (e) => {
        __privateGet(this, _b).call(this, e);
      });
      __privateAdd(this, _y, (e) => {
        const t = [];
        return e.forEach((n) => {
          t.push(...__privateGet(this, _k).call(this, n));
        }), t;
      });
      __privateAdd(this, _k, (e) => {
        const t = [];
        return Array.from(e.attributes).forEach((n) => {
          n.name.startsWith("jolt-") && !n.name.startsWith("jolt-show-if") && t.push({
            element: e,
            eventName: n.name.replace("jolt-", ""),
            methodName: n.value
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
      __privateAdd(this, __, (e) => (e.querySelectorAll(":not([data-parent-id]:not(data-render-time))").forEach((t) => {
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
      this.app.removeEventListener(Le.CHANGE, this._updateBoundAppDataParts), this.app.removeEventListener(Le.QUERYCHANGE, this._updateBoundQueryDataParts);
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
      let n = [];
      for (const [r, s] of Object.entries(t)) n.push(`:${r}="${s}"`);
      let i = n.length > 0 ? n.join(" ") : "";
      return e ? ie`<${this.tagName} data-hash-id="${e}" ${i}></${this.tagName}>` : ie`<${this.tagName} ${i}></${this.tagName}>`;
    }
  };
  _r2 = new WeakMap();
  _e2 = new WeakMap();
  _h2 = new WeakMap();
  _s2 = new WeakMap();
  _t2 = new WeakMap();
  _o2 = new WeakMap();
  _a2 = new WeakMap();
  _i2 = new WeakMap();
  _l2 = new WeakMap();
  _p2 = new WeakMap();
  _c2 = new WeakMap();
  _n2 = new WeakMap();
  _d2 = new WeakMap();
  _f2 = new WeakMap();
  _m = new WeakMap();
  _g = new WeakMap();
  _u2 = new WeakMap();
  _v = new WeakMap();
  _w = new WeakMap();
  _E = new WeakMap();
  _x = new WeakMap();
  _C = new WeakMap();
  _b = new WeakMap();
  _y = new WeakMap();
  _k = new WeakMap();
  _T = new WeakMap();
  __ = new WeakMap();
  __publicField(_Ne, "tagName");
  let Ne = _Ne;
  function de({ tagName: o, markup: e, css: t = null, methods: n = {}, beforeInit: i = {}, beforeInitResolve: r = {}, afterInit: s = {}, beforeRerender: a = {}, afterRerender: d = {}, afterDisconnect: u = {}, define: p = {}, templateFunctions: v = {} }) {
    var _a4;
    if (!o || !e) throw new Error("Missing tagName or markup method in ElementFactory");
    if (!((w) => /^[a-z]+(-[a-z]+)*$/.test(w))(o)) throw new Error("Element tagName must be in a valid kebab-case synatx");
    return _a4 = class extends Ne {
      constructor() {
        super();
        __publicField(this, "_methods", n);
        __publicField(this, "markup", e);
        __publicField(this, "css", t);
        __publicField(this, "_beforeInit", i);
        __publicField(this, "_beforeInitResolve", r);
        __publicField(this, "_afterInit", s);
        __publicField(this, "_beforeRerender", a);
        __publicField(this, "_afterRerender", d);
        __publicField(this, "_afterDisconnect", u);
        __publicField(this, "_define", p);
        __publicField(this, "_templateFunctions", v);
      }
    }, __publicField(_a4, "tagName", o), _a4;
  }
  const Fe = {
    START: "route-change.start",
    FINISHED: "route-change.finished",
    LAYOUTCHANGEFINISHED: "route-change.layout-change.finished",
    ERRORPAGESTART: "route-change.error-page.start",
    ERRORPAGEFINISHED: "route-change.error-page.finished",
    ABORTROUTETRANSITION: "route-change.abort"
  };
  class Hs {
    constructor({ baseUrl: e = "", routes: t, baseLayout: n, defaultTarget: i, pageNotFoundCode: r = 404, index: s = "/", app: a }) {
      __privateAdd(this, _Hs_instances);
      __privateAdd(this, _r3);
      __publicField(this, "_currentRoute");
      __privateAdd(this, _h3, (e, t) => {
        const n = t[0].length - e[0].length;
        return n !== 0 ? n : e[0].includes("<str:") && t[0].includes("<int:") ? -1 : e[0].includes("<int:") && t[0].includes("<str:") ? 1 : 0;
      });
      __privateAdd(this, _s3, async (e) => {
        var _a4, _b2, _c5, _d5;
        const t = (_a4 = e == null ? void 0 : e.target) == null ? void 0 : _a4.matches("a"), n = (_b2 = e == null ? void 0 : e.target) == null ? void 0 : _b2.closest("a"), i = t ? (_c5 = e == null ? void 0 : e.target) == null ? void 0 : _c5.getAttribute("router-ignore") : n == null ? void 0 : n.getAttribute("router-ignore"), r = t ? (_d5 = e == null ? void 0 : e.target) == null ? void 0 : _d5.href : n == null ? void 0 : n.href;
        if ((t || n) && !i && r && !r.startsWith("mailto:")) {
          if (e.preventDefault(), this._inTransition && this._transitionToRoute == r) {
            e.preventDefault();
            return;
          }
          this._inTransition && __privateGet(this, _c3).call(this), this._inTransition = true;
          try {
            this._transitionToRoute = r, await __privateGet(this, _o3).call(this, r);
          } catch {
            this._abort || console.error("Routing failed for route: ", r), this._abort = false;
          }
          this._transitionToRoute = "", this._inTransition = false;
        }
      });
      __privateAdd(this, _t3, async (e) => {
        if (await this.route(), e.state && e.state.scrollPosition) {
          const { x: t, y: n } = e.state.scrollPosition;
          window.scrollTo(t, n);
        }
      });
      __privateAdd(this, _o3, async (e) => {
        const t = __privateGet(this, _u3).call(this);
        history.pushState(t, null, e), await this.route();
      });
      __publicField(this, "route", async () => {
        var _a4, _b2;
        let e = location.pathname;
        e = e.replace(this.baseUrl, ""), e === "" && (e = "/");
        const t = __privateMethod(this, _Hs_instances, a_fn).call(this, e);
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
        await __privateGet(this, _p3).call(this);
      });
      __publicField(this, "redirect", async (e) => {
        const t = `${this.baseUrl}${e}`, n = __privateGet(this, _u3).call(this);
        history.pushState(n, null, t), await this.route();
      });
      __publicField(this, "home", async () => {
        const e = `${this.baseUrl}${this.index}`, t = __privateGet(this, _u3).call(this);
        history.pushState(t, null, e), await this.route();
      });
      __privateAdd(this, _i3, async (e) => {
        var _a4;
        __privateGet(this, _n3).call(this);
        const t = [];
        await __privateGet(this, _l3).call(this, e.layout), await this.app.querySelector(e.layout.tagName).initComplete;
        const i = Object.entries(e.handlers);
        for (const [r, [s, a]] of i.entries()) {
          const d = this.app.querySelector(s);
          if (!d) throw new Error(`Failed to get target (${s}) container for route ${e.route} and handler (${a})`);
          if (d.querySelector(a.tagName) && i.length != 1 && r < i.length - 1) continue;
          const p = this.app.generateHash();
          this.app._originalInnerHTML.call(d, a.generate(p, (_a4 = e.attributes) == null ? void 0 : _a4[a.tagName]));
          const v = this.app.querySelector(`[data-hash-id="${p}"]`);
          v && await v.initComplete, t.push([
            s,
            p,
            a
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
          await t.initComplete, __privateGet(this, _f3).call(this, t.tagName);
        }
      });
      __privateAdd(this, _p3, async () => {
        this.app.querySelector(this.baseLayout.tagName) || (this.app.container.innerHTML = this.baseLayout.generate(), await this.app.querySelector(this.baseLayout.tagName).initComplete, __privateGet(this, _f3).call(this, this.baseLayout.tagName));
        const e = this.app.querySelector(this.defaultTarget);
        if (!e) return;
        const t = this.app._errorPages[this.pageNotFoundCode].generate();
        e.innerHTML = t, __privateGet(this, _d3).call(this);
      });
      __publicField(this, "_abortPageLoad", async (e = null) => {
        __privateGet(this, _m2).call(this);
        let t = this.defaultTarget, n = this.baseLayout;
        this._currentRoute && (n = this._currentRoute.layout, t = this._currentRoute.renderSequence[0][0]), await __privateGet(this, _l3).call(this, n);
        const i = this.app.querySelector(t);
        if (!i) throw new Error(`Failed to get target (${t}) container for error page`);
        Object.keys(this.app._errorPages).includes(`${e}`) || (e = 500);
        const r = this.app._errorPages[e].generate();
        i.innerHTML = r, __privateGet(this, _g2).call(this);
      });
      __privateAdd(this, _c3, () => {
        const e = new CustomEvent(Fe.ABORTROUTETRANSITION, {
          bubbles: true,
          cancelable: true
        });
        this._abort = true, this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _n3, () => {
        const e = new CustomEvent(Fe.START, {
          bubbles: true,
          cancelable: true,
          detail: {
            ...this._currentRoute
          }
        });
        this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _d3, () => {
        const e = new CustomEvent(Fe.FINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            ...this._currentRoute
          }
        });
        this.app.container.dispatchEvent(e);
      });
      __privateAdd(this, _f3, (e) => {
        const t = new CustomEvent(Fe.LAYOUTCHANGEFINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            layout: e
          }
        });
        this.app.container.dispatchEvent(t);
      });
      __privateAdd(this, _m2, (e) => {
        const t = new CustomEvent(Fe.ERRORPAGESTART, {
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
        const t = new CustomEvent(Fe.ERRORPAGEFINISHED, {
          bubbles: true,
          cancelable: true,
          detail: {
            errorStatus: e,
            errorPage: this.app._errorPages[e]
          }
        });
        this.app.container.dispatchEvent(t);
      });
      __privateAdd(this, _u3, () => ({
        scrollPosition: {
          x: window.scrollX,
          y: window.scrollY
        }
      }));
      __privateAdd(this, _v2, (e) => {
        const t = document.querySelector("title");
        if (!t) throw new Error("Missing title tag in page header. This is considered bad practice!");
        if (!e) return;
        let n = e;
        t.innerText = n;
      });
      __publicField(this, "getQueryParams", (e = false) => this.app.getQueryParams(e));
      if (!a) throw new Error("Missing application object in router constructor");
      if (!t) throw new Error("Missing routes object for router.");
      if (!n && !(n instanceof Ne)) throw new Error("Missing base layout element for the application");
      __privateSet(this, _r3, a), this.baseLayout = n, this.pageNotFoundCode = r, typeof t == "function" && (t = t.bind(this)()), this.defaultTarget = i, this._inTransition = false, this._transitionToRoute = "", this._abort = false, this._parseRoutes({
        routes: t
      }), this._baseUrl = e, this.index = s, this.app.addEventListener("click", __privateGet(this, _s3)), window.addEventListener("popstate", __privateGet(this, _t3)), this._currentRoute = null;
    }
    _parseRoutes({ routes: e, parentPath: t = "", parentHandlers: n = {}, layout: i }) {
      this.routeMap = new Map(Object.entries(__privateMethod(this, _Hs_instances, e_fn).call(this, {
        routes: e,
        parentPath: t,
        parentHandlers: n,
        layout: i
      }))), this.routeMap = this.sortRouteMap();
    }
    sortRouteMap() {
      const e = Array.from(this.routeMap.entries()).sort(__privateGet(this, _h3));
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
      return __privateGet(this, _r3);
    }
    get currentRoute() {
      return this._currentRoute;
    }
  }
  _r3 = new WeakMap();
  _Hs_instances = new WeakSet();
  e_fn = function({ routes: e, parentPath: t = "", parentHandlers: n = {}, layout: i }) {
    let r = i;
    r || (r = this.baseLayout);
    const s = {};
    return e.forEach((a) => {
      const d = t + a.path;
      if (typeof a.handler != "function") throw new Error("Route handler must be of type CustomElement from ElementFactory.");
      const u = a.handler ? {
        ...n,
        [a.target]: a.handler
      } : {
        ...n
      };
      a.handlers && Object.keys(a.handlers).forEach((v) => {
        u[v] = a.handlers[v];
      });
      const p = a.layout || r;
      s[d] = {
        handlers: {
          ...u
        },
        layout: p,
        title: a == null ? void 0 : a.title,
        roles: a.roles || null,
        details: (a == null ? void 0 : a.details) || null,
        attributes: (a == null ? void 0 : a.attributes) ? {
          [a.handler.tagName]: a.attributes
        } : null,
        authenticationRequired: [
          void 0
        ].includes(a == null ? void 0 : a.authenticationRequired) ? false : a == null ? void 0 : a.authenticationRequired,
        rolesRequired: [
          void 0
        ].includes(a == null ? void 0 : a.authenticationRequired) ? [] : a == null ? void 0 : a.rolesRequired
      }, a.children && Object.assign(s, __privateMethod(this, _Hs_instances, e_fn).call(this, {
        routes: a.children,
        parentPath: d,
        parentHandlers: u,
        layout: p
      }));
    }), s;
  };
  _h3 = new WeakMap();
  _s3 = new WeakMap();
  _t3 = new WeakMap();
  _o3 = new WeakMap();
  a_fn = function(e) {
    for (const [t, n] of this.routeMap.entries()) {
      const i = [], r = [], s = t.replace(/<(\w+):(\w+)>/g, (d, u, p) => {
        if (i.push(p), r.push(u), u === "str") return "([^/]+)";
        if (u === "int") return "(\\d+)";
      }), a = e.match(new RegExp(`^${s}$`));
      if (a) {
        const d = i.reduce((u, p, v) => {
          let b = a[v + 1];
          return r[v] === "int" && (b = parseInt(b, 10)), u[p] = b, u;
        }, {});
        return this.routeParameters = d || null, {
          route: t,
          handlers: n.handlers,
          details: (n == null ? void 0 : n.details) || null,
          title: n.title,
          rolesRequired: n.rolesRequired || [],
          authenticationRequired: n.authenticationRequired || false,
          layout: n.layout,
          params: d,
          attributes: (n == null ? void 0 : n.attributes) || null
        };
      }
    }
    return null;
  };
  _i3 = new WeakMap();
  _l3 = new WeakMap();
  _p3 = new WeakMap();
  _c3 = new WeakMap();
  _n3 = new WeakMap();
  _d3 = new WeakMap();
  _f3 = new WeakMap();
  _m2 = new WeakMap();
  _g2 = new WeakMap();
  _u3 = new WeakMap();
  _v2 = new WeakMap();
  var $;
  (function(o) {
    o.Attribute = "attribute", o.Pseudo = "pseudo", o.PseudoElement = "pseudo-element", o.Tag = "tag", o.Universal = "universal", o.Adjacent = "adjacent", o.Child = "child", o.Descendant = "descendant", o.Parent = "parent", o.Sibling = "sibling", o.ColumnCombinator = "column-combinator";
  })($ || ($ = {}));
  var J;
  (function(o) {
    o.Any = "any", o.Element = "element", o.End = "end", o.Equals = "equals", o.Exists = "exists", o.Hyphen = "hyphen", o.Not = "not", o.Start = "start";
  })(J || (J = {}));
  const wi = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, Fs = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, $s = /* @__PURE__ */ new Map([
    [
      126,
      J.Element
    ],
    [
      94,
      J.Start
    ],
    [
      36,
      J.End
    ],
    [
      42,
      J.Any
    ],
    [
      33,
      J.Not
    ],
    [
      124,
      J.Hyphen
    ]
  ]), Vs = /* @__PURE__ */ new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]);
  function Us(o) {
    switch (o.type) {
      case $.Adjacent:
      case $.Child:
      case $.Descendant:
      case $.Parent:
      case $.Sibling:
      case $.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  const zs = /* @__PURE__ */ new Set([
    "contains",
    "icontains"
  ]);
  function qs(o, e, t) {
    const n = parseInt(e, 16) - 65536;
    return n !== n || t ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320);
  }
  function lt(o) {
    return o.replace(Fs, qs);
  }
  function po(o) {
    return o === 39 || o === 34;
  }
  function Ei(o) {
    return o === 32 || o === 9 || o === 10 || o === 12 || o === 13;
  }
  function Ws(o) {
    const e = [], t = Yi(e, `${o}`, 0);
    if (t < o.length) throw new Error(`Unmatched selector: ${o.slice(t)}`);
    return e;
  }
  function Yi(o, e, t) {
    let n = [];
    function i(b) {
      const w = e.slice(t + b).match(wi);
      if (!w) throw new Error(`Expected name, found ${e.slice(t)}`);
      const [y] = w;
      return t += b + y.length, lt(y);
    }
    function r(b) {
      for (t += b; t < e.length && Ei(e.charCodeAt(t)); ) t++;
    }
    function s() {
      t += 1;
      const b = t;
      let w = 1;
      for (; w > 0 && t < e.length; t++) e.charCodeAt(t) === 40 && !a(t) ? w++ : e.charCodeAt(t) === 41 && !a(t) && w--;
      if (w) throw new Error("Parenthesis not matched");
      return lt(e.slice(b, t - 1));
    }
    function a(b) {
      let w = 0;
      for (; e.charCodeAt(--b) === 92; ) w++;
      return (w & 1) === 1;
    }
    function d() {
      if (n.length > 0 && Us(n[n.length - 1])) throw new Error("Did not expect successive traversals.");
    }
    function u(b) {
      if (n.length > 0 && n[n.length - 1].type === $.Descendant) {
        n[n.length - 1].type = b;
        return;
      }
      d(), n.push({
        type: b
      });
    }
    function p(b, w) {
      n.push({
        type: $.Attribute,
        name: b,
        action: w,
        value: i(1),
        namespace: null,
        ignoreCase: "quirks"
      });
    }
    function v() {
      if (n.length && n[n.length - 1].type === $.Descendant && n.pop(), n.length === 0) throw new Error("Empty sub-selector");
      o.push(n);
    }
    if (r(0), e.length === t) return t;
    e: for (; t < e.length; ) {
      const b = e.charCodeAt(t);
      switch (b) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (n.length === 0 || n[0].type !== $.Descendant) && (d(), n.push({
            type: $.Descendant
          })), r(1);
          break;
        }
        case 62: {
          u($.Child), r(1);
          break;
        }
        case 60: {
          u($.Parent), r(1);
          break;
        }
        case 126: {
          u($.Sibling), r(1);
          break;
        }
        case 43: {
          u($.Adjacent), r(1);
          break;
        }
        case 46: {
          p("class", J.Element);
          break;
        }
        case 35: {
          p("id", J.Equals);
          break;
        }
        case 91: {
          r(1);
          let w, y = null;
          e.charCodeAt(t) === 124 ? w = i(1) : e.startsWith("*|", t) ? (y = "*", w = i(2)) : (w = i(0), e.charCodeAt(t) === 124 && e.charCodeAt(t + 1) !== 61 && (y = w, w = i(1))), r(0);
          let T = J.Exists;
          const q = $s.get(e.charCodeAt(t));
          if (q) {
            if (T = q, e.charCodeAt(t + 1) !== 61) throw new Error("Expected `=`");
            r(2);
          } else e.charCodeAt(t) === 61 && (T = J.Equals, r(1));
          let U = "", z = null;
          if (T !== "exists") {
            if (po(e.charCodeAt(t))) {
              const G = e.charCodeAt(t);
              let oe = t + 1;
              for (; oe < e.length && (e.charCodeAt(oe) !== G || a(oe)); ) oe += 1;
              if (e.charCodeAt(oe) !== G) throw new Error("Attribute value didn't end");
              U = lt(e.slice(t + 1, oe)), t = oe + 1;
            } else {
              const G = t;
              for (; t < e.length && (!Ei(e.charCodeAt(t)) && e.charCodeAt(t) !== 93 || a(t)); ) t += 1;
              U = lt(e.slice(G, t));
            }
            r(0);
            const Q = e.charCodeAt(t) | 32;
            Q === 115 ? (z = false, r(1)) : Q === 105 && (z = true, r(1));
          }
          if (e.charCodeAt(t) !== 93) throw new Error("Attribute selector didn't terminate");
          t += 1;
          const ae = {
            type: $.Attribute,
            name: w,
            action: T,
            value: U,
            namespace: y,
            ignoreCase: z
          };
          n.push(ae);
          break;
        }
        case 58: {
          if (e.charCodeAt(t + 1) === 58) {
            n.push({
              type: $.PseudoElement,
              name: i(2).toLowerCase(),
              data: e.charCodeAt(t) === 40 ? s() : null
            });
            continue;
          }
          const w = i(1).toLowerCase();
          let y = null;
          if (e.charCodeAt(t) === 40) if (Vs.has(w)) {
            if (po(e.charCodeAt(t + 1))) throw new Error(`Pseudo-selector ${w} cannot be quoted`);
            if (y = [], t = Yi(y, e, t + 1), e.charCodeAt(t) !== 41) throw new Error(`Missing closing parenthesis in :${w} (${e})`);
            t += 1;
          } else {
            if (y = s(), zs.has(w)) {
              const T = y.charCodeAt(0);
              T === y.charCodeAt(y.length - 1) && po(T) && (y = y.slice(1, -1));
            }
            y = lt(y);
          }
          n.push({
            type: $.Pseudo,
            name: w,
            data: y
          });
          break;
        }
        case 44: {
          v(), n = [], r(1);
          break;
        }
        default: {
          if (e.startsWith("/*", t)) {
            const T = e.indexOf("*/", t + 2);
            if (T < 0) throw new Error("Comment was not terminated");
            t = T + 2, n.length === 0 && r(0);
            break;
          }
          let w = null, y;
          if (b === 42) t += 1, y = "*";
          else if (b === 124) {
            if (y = "", e.charCodeAt(t + 1) === 124) {
              u($.ColumnCombinator), r(2);
              break;
            }
          } else if (wi.test(e.slice(t))) y = i(0);
          else break e;
          e.charCodeAt(t) === 124 && e.charCodeAt(t + 1) !== 124 && (w = y, e.charCodeAt(t + 1) === 42 ? (y = "*", t += 2) : y = i(1)), n.push(y === "*" ? {
            type: $.Universal,
            namespace: w
          } : {
            type: $.Tag,
            name: y,
            namespace: w
          });
        }
      }
    }
    return v(), t;
  }
  const Xi = [
    "\\",
    '"'
  ], Ki = [
    ...Xi,
    "(",
    ")"
  ], Ys = new Set(Xi.map((o) => o.charCodeAt(0))), xi = new Set(Ki.map((o) => o.charCodeAt(0))), ot = new Set([
    ...Ki,
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
  ].map((o) => o.charCodeAt(0)));
  function Gi(o) {
    return o.map((e) => e.map(Xs).join("")).join(", ");
  }
  function Xs(o, e, t) {
    switch (o.type) {
      case $.Child:
        return e === 0 ? "> " : " > ";
      case $.Parent:
        return e === 0 ? "< " : " < ";
      case $.Sibling:
        return e === 0 ? "~ " : " ~ ";
      case $.Adjacent:
        return e === 0 ? "+ " : " + ";
      case $.Descendant:
        return " ";
      case $.ColumnCombinator:
        return e === 0 ? "|| " : " || ";
      case $.Universal:
        return o.namespace === "*" && e + 1 < t.length && "name" in t[e + 1] ? "" : `${Zi(o.namespace)}*`;
      case $.Tag:
        return Ci(o);
      case $.PseudoElement:
        return `::${Be(o.name, ot)}${o.data === null ? "" : `(${Be(o.data, xi)})`}`;
      case $.Pseudo:
        return `:${Be(o.name, ot)}${o.data === null ? "" : `(${typeof o.data == "string" ? Be(o.data, xi) : Gi(o.data)})`}`;
      case $.Attribute: {
        if (o.name === "id" && o.action === J.Equals && o.ignoreCase === "quirks" && !o.namespace) return `#${Be(o.value, ot)}`;
        if (o.name === "class" && o.action === J.Element && o.ignoreCase === "quirks" && !o.namespace) return `.${Be(o.value, ot)}`;
        const n = Ci(o);
        return o.action === J.Exists ? `[${n}]` : `[${n}${Ks(o.action)}="${Be(o.value, Ys)}"${o.ignoreCase === null ? "" : o.ignoreCase ? " i" : " s"}]`;
      }
    }
  }
  function Ks(o) {
    switch (o) {
      case J.Equals:
        return "";
      case J.Element:
        return "~";
      case J.Start:
        return "^";
      case J.End:
        return "$";
      case J.Any:
        return "*";
      case J.Not:
        return "!";
      case J.Hyphen:
        return "|";
      case J.Exists:
        throw new Error("Shouldn't be here");
    }
  }
  function Ci(o) {
    return `${Zi(o.namespace)}${Be(o.name, ot)}`;
  }
  function Zi(o) {
    return o !== null ? `${o === "*" ? "*" : Be(o, ot)}|` : "";
  }
  function Be(o, e) {
    let t = 0, n = "";
    for (let i = 0; i < o.length; i++) e.has(o.charCodeAt(i)) && (n += `${o.slice(t, i)}\\${o.charAt(i)}`, t = i + 1);
    return n.length > 0 ? n + o.slice(t) : o;
  }
  function Qi(o) {
    return o.map((e) => {
      if (Array.isArray(e)) return Qi(e);
      if (e.type === "attribute") {
        let t = e.name.replace(/:/g, "data-");
        return t = t.replace(/@/g, "jolt-"), {
          ...e,
          name: gt(t)
        };
      }
      return {
        ...e
      };
    });
  }
  function Ct(o) {
    const e = Ws(o), t = Qi(e);
    return Gi(t);
  }
  var Qe = {}, Ti;
  function Gs() {
    if (Ti) return Qe;
    Ti = 1;
    var o = function() {
      return o = Object.assign || function(c) {
        for (var l = arguments, g, f = 1, m = arguments.length; f < m; f++) {
          g = l[f];
          for (var x in g) Object.prototype.hasOwnProperty.call(g, x) && (c[x] = g[x]);
        }
        return c;
      }, o.apply(this, arguments);
    };
    function e(h, c, l) {
      for (var g = 0, f = c.length, m; g < f; g++) (m || !(g in c)) && (m || (m = Array.prototype.slice.call(c, 0, g)), m[g] = c[g]);
      return h.concat(m || Array.prototype.slice.call(c));
    }
    typeof SuppressedError == "function" && SuppressedError;
    var t = function() {
      function h(c) {
        c === void 0 && (c = {});
        var l = this;
        Object.entries(c).forEach(function(g) {
          var f = g[0], m = g[1];
          return l[f] = m;
        });
      }
      return h.prototype.toString = function() {
        return JSON.stringify(this);
      }, h.prototype.setValue = function(c, l) {
        return this[c] = l, this;
      }, h;
    }();
    function n(h) {
      for (var c = arguments, l = [], g = 1; g < arguments.length; g++) l[g - 1] = c[g];
      return typeof h > "u" || h === null ? false : l.some(function(f) {
        var m, x;
        return typeof ((x = (m = h == null ? void 0 : h.ownerDocument) === null || m === void 0 ? void 0 : m.defaultView) === null || x === void 0 ? void 0 : x[f]) == "function" && h instanceof h.ownerDocument.defaultView[f];
      });
    }
    function i(h, c, l) {
      var g;
      return h.nodeName === "#text" ? g = l.document.createTextNode(h.data) : h.nodeName === "#comment" ? g = l.document.createComment(h.data) : (c ? (g = l.document.createElementNS("http://www.w3.org/2000/svg", h.nodeName), h.nodeName === "foreignObject" && (c = false)) : h.nodeName.toLowerCase() === "svg" ? (g = l.document.createElementNS("http://www.w3.org/2000/svg", "svg"), c = true) : g = l.document.createElement(h.nodeName), h.attributes && Object.entries(h.attributes).forEach(function(f) {
        var m = f[0], x = f[1];
        return g.setAttribute(m, x);
      }), h.childNodes && (g = g, h.childNodes.forEach(function(f) {
        return g.appendChild(i(f, c, l));
      })), l.valueDiffing && (h.value && n(g, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement") && (g.value = h.value), h.checked && n(g, "HTMLInputElement") && (g.checked = h.checked), h.selected && n(g, "HTMLOptionElement") && (g.selected = h.selected))), g;
    }
    var r = function(h, c) {
      for (c = c.slice(); c.length > 0; ) {
        var l = c.splice(0, 1)[0];
        h = h.childNodes[l];
      }
      return h;
    };
    function s(h, c, l) {
      var g = c[l._const.action], f = c[l._const.route], m;
      [
        l._const.addElement,
        l._const.addTextElement
      ].includes(g) || (m = r(h, f));
      var x, A, C, S = {
        diff: c,
        node: m
      };
      if (l.preDiffApply(S)) return true;
      switch (g) {
        case l._const.addAttribute:
          if (!m || !n(m, "Element")) return false;
          m.setAttribute(c[l._const.name], c[l._const.value]);
          break;
        case l._const.modifyAttribute:
          if (!m || !n(m, "Element")) return false;
          m.setAttribute(c[l._const.name], c[l._const.newValue]), n(m, "HTMLInputElement") && c[l._const.name] === "value" && (m.value = c[l._const.newValue]);
          break;
        case l._const.removeAttribute:
          if (!m || !n(m, "Element")) return false;
          m.removeAttribute(c[l._const.name]);
          break;
        case l._const.modifyTextElement:
          if (!m || !n(m, "Text")) return false;
          l.textDiff(m, m.data, c[l._const.oldValue], c[l._const.newValue]), n(m.parentNode, "HTMLTextAreaElement") && (m.parentNode.value = c[l._const.newValue]);
          break;
        case l._const.modifyValue:
          if (!m || typeof m.value > "u") return false;
          m.value = c[l._const.newValue];
          break;
        case l._const.modifyComment:
          if (!m || !n(m, "Comment")) return false;
          l.textDiff(m, m.data, c[l._const.oldValue], c[l._const.newValue]);
          break;
        case l._const.modifyChecked:
          if (!m || typeof m.checked > "u") return false;
          m.checked = c[l._const.newValue];
          break;
        case l._const.modifySelected:
          if (!m || typeof m.selected > "u") return false;
          m.selected = c[l._const.newValue];
          break;
        case l._const.replaceElement: {
          var B = c[l._const.newValue].nodeName.toLowerCase() === "svg" || m.parentNode.namespaceURI === "http://www.w3.org/2000/svg";
          m.parentNode.replaceChild(i(c[l._const.newValue], B, l), m);
          break;
        }
        case l._const.relocateGroup:
          C = e([], new Array(c[l._const.groupLength])).map(function() {
            return m.removeChild(m.childNodes[c[l._const.from]]);
          }), C.forEach(function(R, E) {
            E === 0 && (A = m.childNodes[c[l._const.to]]), m.insertBefore(R, A || null);
          });
          break;
        case l._const.removeElement:
          m.parentNode.removeChild(m);
          break;
        case l._const.addElement: {
          var P = f.slice(), F = P.splice(P.length - 1, 1)[0];
          if (m = r(h, P), !n(m, "Element")) return false;
          m.insertBefore(i(c[l._const.element], m.namespaceURI === "http://www.w3.org/2000/svg", l), m.childNodes[F] || null);
          break;
        }
        case l._const.removeTextElement: {
          if (!m || m.nodeType !== 3) return false;
          var I = m.parentNode;
          I.removeChild(m), n(I, "HTMLTextAreaElement") && (I.value = "");
          break;
        }
        case l._const.addTextElement: {
          var P = f.slice(), F = P.splice(P.length - 1, 1)[0];
          if (x = l.document.createTextNode(c[l._const.value]), m = r(h, P), !m.childNodes) return false;
          m.insertBefore(x, m.childNodes[F] || null), n(m.parentNode, "HTMLTextAreaElement") && (m.parentNode.value = c[l._const.value]);
          break;
        }
        default:
          console.log("unknown action");
      }
      return l.postDiffApply({
        diff: S.diff,
        node: S.node,
        newNode: x
      }), true;
    }
    function a(h, c, l) {
      return c.every(function(g) {
        return s(h, g, l);
      });
    }
    function d(h, c, l) {
      var g = h[c];
      h[c] = h[l], h[l] = g;
    }
    function u(h, c, l) {
      switch (c[l._const.action]) {
        case l._const.addAttribute:
          c[l._const.action] = l._const.removeAttribute, s(h, c, l);
          break;
        case l._const.modifyAttribute:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.removeAttribute:
          c[l._const.action] = l._const.addAttribute, s(h, c, l);
          break;
        case l._const.modifyTextElement:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.modifyValue:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.modifyComment:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.modifyChecked:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.modifySelected:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.replaceElement:
          d(c, l._const.oldValue, l._const.newValue), s(h, c, l);
          break;
        case l._const.relocateGroup:
          d(c, l._const.from, l._const.to), s(h, c, l);
          break;
        case l._const.removeElement:
          c[l._const.action] = l._const.addElement, s(h, c, l);
          break;
        case l._const.addElement:
          c[l._const.action] = l._const.removeElement, s(h, c, l);
          break;
        case l._const.removeTextElement:
          c[l._const.action] = l._const.addTextElement, s(h, c, l);
          break;
        case l._const.addTextElement:
          c[l._const.action] = l._const.removeTextElement, s(h, c, l);
          break;
        default:
          console.log("unknown action");
      }
    }
    function p(h, c, l) {
      c = c.slice(), c.reverse(), c.forEach(function(g) {
        u(h, g, l);
      });
    }
    var v = function(h) {
      var c = [];
      return c.push(h.nodeName), h.nodeName !== "#text" && h.nodeName !== "#comment" && (h = h, h.attributes && (h.attributes.class && c.push("".concat(h.nodeName, ".").concat(h.attributes.class.replace(/ /g, "."))), h.attributes.id && c.push("".concat(h.nodeName, "#").concat(h.attributes.id)))), c;
    }, b = function(h) {
      var c = {}, l = {};
      return h.forEach(function(g) {
        v(g).forEach(function(f) {
          var m = f in c, x = f in l;
          !m && !x ? c[f] = true : m && (delete c[f], l[f] = true);
        });
      }), c;
    }, w = function(h, c) {
      var l = b(h), g = b(c), f = {};
      return Object.keys(l).forEach(function(m) {
        g[m] && (f[m] = true);
      }), f;
    }, y = function(h) {
      return delete h.outerDone, delete h.innerDone, delete h.valueDone, h.childNodes ? h.childNodes.every(y) : true;
    }, T = function(h) {
      if (Object.prototype.hasOwnProperty.call(h, "data")) {
        var c = {
          nodeName: h.nodeName === "#text" ? "#text" : "#comment",
          data: h.data
        };
        return c;
      } else {
        var l = {
          nodeName: h.nodeName
        };
        return h = h, Object.prototype.hasOwnProperty.call(h, "attributes") && (l.attributes = o({}, h.attributes)), Object.prototype.hasOwnProperty.call(h, "checked") && (l.checked = h.checked), Object.prototype.hasOwnProperty.call(h, "value") && (l.value = h.value), Object.prototype.hasOwnProperty.call(h, "selected") && (l.selected = h.selected), Object.prototype.hasOwnProperty.call(h, "childNodes") && (l.childNodes = h.childNodes.map(function(g) {
          return T(g);
        })), l;
      }
    }, q = function(h, c) {
      if (![
        "nodeName",
        "value",
        "checked",
        "selected",
        "data"
      ].every(function(f) {
        return h[f] === c[f];
      })) return false;
      if (Object.prototype.hasOwnProperty.call(h, "data")) return true;
      if (h = h, c = c, !!h.attributes != !!c.attributes || !!h.childNodes != !!c.childNodes) return false;
      if (h.attributes) {
        var l = Object.keys(h.attributes), g = Object.keys(c.attributes);
        if (l.length !== g.length || !l.every(function(f) {
          return h.attributes[f] === c.attributes[f];
        })) return false;
      }
      return !(h.childNodes && (h.childNodes.length !== c.childNodes.length || !h.childNodes.every(function(f, m) {
        return q(f, c.childNodes[m]);
      })));
    }, U = function(h, c, l, g, f) {
      if (f === void 0 && (f = false), !h || !c || h.nodeName !== c.nodeName) return false;
      if ([
        "#text",
        "#comment"
      ].includes(h.nodeName)) return f ? true : h.data === c.data;
      if (h = h, c = c, h.nodeName in l) return true;
      if (h.attributes && c.attributes) {
        if (h.attributes.id) {
          if (h.attributes.id !== c.attributes.id) return false;
          var m = "".concat(h.nodeName, "#").concat(h.attributes.id);
          if (m in l) return true;
        }
        if (h.attributes.class && h.attributes.class === c.attributes.class) {
          var x = "".concat(h.nodeName, ".").concat(h.attributes.class.replace(/ /g, "."));
          if (x in l) return true;
        }
      }
      if (g) return true;
      var A = h.childNodes ? h.childNodes.slice().reverse() : [], C = c.childNodes ? c.childNodes.slice().reverse() : [];
      if (A.length !== C.length) return false;
      if (f) return A.every(function(B, P) {
        return B.nodeName === C[P].nodeName;
      });
      var S = w(A, C);
      return A.every(function(B, P) {
        return U(B, C[P], S, true, true);
      });
    }, z = function(h, c, l, g) {
      var f = 0, m = [], x = h.length, A = c.length, C = e([], new Array(x + 1)).map(function() {
        return [];
      }), S = w(h, c), B = x === A;
      B && h.some(function(E, X) {
        var le = v(E), se = v(c[X]);
        if (le.length !== se.length) return B = false, true;
        if (le.some(function(K, Ge) {
          if (K !== se[Ge]) return B = false, true;
        }), !B) return true;
      });
      for (var P = 0; P < x; P++) for (var F = h[P], I = 0; I < A; I++) {
        var R = c[I];
        !l[P] && !g[I] && U(F, R, S, B) ? (C[P + 1][I + 1] = C[P][I] ? C[P][I] + 1 : 1, C[P + 1][I + 1] >= f && (f = C[P + 1][I + 1], m = [
          P + 1,
          I + 1
        ])) : C[P + 1][I + 1] = 0;
      }
      return f === 0 ? false : {
        oldValue: m[0] - f,
        newValue: m[1] - f,
        length: f
      };
    }, ae = function(h, c) {
      return e([], new Array(h)).map(function() {
        return c;
      });
    }, Q = function(h, c, l) {
      var g = h.childNodes ? ae(h.childNodes.length, true) : [], f = c.childNodes ? ae(c.childNodes.length, true) : [], m = 0;
      return l.forEach(function(x) {
        for (var A = x.oldValue + x.length, C = x.newValue + x.length, S = x.oldValue; S < A; S += 1) g[S] = m;
        for (var S = x.newValue; S < C; S += 1) f[S] = m;
        m += 1;
      }), {
        gaps1: g,
        gaps2: f
      };
    }, G = function(h, c, l, g) {
      h[l.oldValue + g] = true, c[l.newValue + g] = true;
    }, oe = function(h, c) {
      for (var l = h.childNodes ? h.childNodes : [], g = c.childNodes ? c.childNodes : [], f = ae(l.length, false), m = ae(g.length, false), x = [], A = function() {
        return arguments[1];
      }, C = false, S = function() {
        var B = z(l, g, f, m);
        if (B) {
          x.push(B);
          var P = e([], new Array(B.length)).map(A);
          P.forEach(function(F) {
            return G(f, m, B, F);
          });
        } else C = true;
      }; !C; ) S();
      return h.subsets = x, h.subsetsAge = 100, x;
    }, we = function() {
      function h() {
        this.list = [];
      }
      return h.prototype.add = function(c) {
        var l;
        (l = this.list).push.apply(l, c);
      }, h.prototype.forEach = function(c) {
        this.list.forEach(function(l) {
          return c(l);
        });
      }, h;
    }();
    function M(h, c) {
      var l = h, g, f;
      for (c = c.slice(); c.length > 0; ) f = c.splice(0, 1)[0], g = l, l = l.childNodes ? l.childNodes[f] : void 0;
      return {
        node: l,
        parentNode: g,
        nodeIndex: f
      };
    }
    function _(h, c, l) {
      var g, f, m, x;
      if (![
        l._const.addElement,
        l._const.addTextElement
      ].includes(c[l._const.action])) {
        var A = M(h, c[l._const.route]);
        f = A.node, m = A.parentNode, x = A.nodeIndex;
      }
      var C = [], S = {
        diff: c,
        node: f
      };
      if (l.preVirtualDiffApply(S)) return true;
      var B, P, F;
      switch (c[l._const.action]) {
        case l._const.addAttribute:
          f.attributes || (f.attributes = {}), f.attributes[c[l._const.name]] = c[l._const.value], c[l._const.name] === "checked" ? f.checked = true : c[l._const.name] === "selected" ? f.selected = true : f.nodeName === "INPUT" && c[l._const.name] === "value" && (f.value = c[l._const.value]);
          break;
        case l._const.modifyAttribute:
          f.attributes[c[l._const.name]] = c[l._const.newValue];
          break;
        case l._const.removeAttribute:
          delete f.attributes[c[l._const.name]], Object.keys(f.attributes).length === 0 && delete f.attributes, c[l._const.name] === "checked" ? f.checked = false : c[l._const.name] === "selected" ? delete f.selected : f.nodeName === "INPUT" && c[l._const.name] === "value" && delete f.value;
          break;
        case l._const.modifyTextElement:
          f.data = c[l._const.newValue], m.nodeName === "TEXTAREA" && (m.value = c[l._const.newValue]);
          break;
        case l._const.modifyValue:
          f.value = c[l._const.newValue];
          break;
        case l._const.modifyComment:
          f.data = c[l._const.newValue];
          break;
        case l._const.modifyChecked:
          f.checked = c[l._const.newValue];
          break;
        case l._const.modifySelected:
          f.selected = c[l._const.newValue];
          break;
        case l._const.replaceElement:
          B = T(c[l._const.newValue]), m.childNodes[x] = B;
          break;
        case l._const.relocateGroup:
          P = f.childNodes.splice(c[l._const.from], c[l._const.groupLength]).reverse(), P.forEach(function(E) {
            return f.childNodes.splice(c[l._const.to], 0, E);
          }), f.subsets && f.subsets.forEach(function(E) {
            if (c[l._const.from] < c[l._const.to] && E.oldValue <= c[l._const.to] && E.oldValue > c[l._const.from]) {
              E.oldValue -= c[l._const.groupLength];
              var X = E.oldValue + E.length - c[l._const.to];
              X > 0 && (C.push({
                oldValue: c[l._const.to] + c[l._const.groupLength],
                newValue: E.newValue + E.length - X,
                length: X
              }), E.length -= X);
            } else if (c[l._const.from] > c[l._const.to] && E.oldValue > c[l._const.to] && E.oldValue < c[l._const.from]) {
              E.oldValue += c[l._const.groupLength];
              var X = E.oldValue + E.length - c[l._const.to];
              X > 0 && (C.push({
                oldValue: c[l._const.to] + c[l._const.groupLength],
                newValue: E.newValue + E.length - X,
                length: X
              }), E.length -= X);
            } else E.oldValue === c[l._const.from] && (E.oldValue = c[l._const.to]);
          });
          break;
        case l._const.removeElement:
          m.childNodes.splice(x, 1), m.subsets && m.subsets.forEach(function(E) {
            E.oldValue > x ? E.oldValue -= 1 : E.oldValue === x ? E.delete = true : E.oldValue < x && E.oldValue + E.length > x && (E.oldValue + E.length - 1 === x ? E.length-- : (C.push({
              newValue: E.newValue + x - E.oldValue,
              oldValue: x,
              length: E.length - x + E.oldValue - 1
            }), E.length = x - E.oldValue));
          }), f = m;
          break;
        case l._const.addElement: {
          F = c[l._const.route].slice();
          var I = F.splice(F.length - 1, 1)[0];
          f = (g = M(h, F)) === null || g === void 0 ? void 0 : g.node, B = T(c[l._const.element]), f.childNodes || (f.childNodes = []), I >= f.childNodes.length ? f.childNodes.push(B) : f.childNodes.splice(I, 0, B), f.subsets && f.subsets.forEach(function(E) {
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
        case l._const.removeTextElement:
          m.childNodes.splice(x, 1), m.nodeName === "TEXTAREA" && delete m.value, m.subsets && m.subsets.forEach(function(E) {
            E.oldValue > x ? E.oldValue -= 1 : E.oldValue === x ? E.delete = true : E.oldValue < x && E.oldValue + E.length > x && (E.oldValue + E.length - 1 === x ? E.length-- : (C.push({
              newValue: E.newValue + x - E.oldValue,
              oldValue: x,
              length: E.length - x + E.oldValue - 1
            }), E.length = x - E.oldValue));
          }), f = m;
          break;
        case l._const.addTextElement: {
          F = c[l._const.route].slice();
          var R = F.splice(F.length - 1, 1)[0];
          B = {
            nodeName: "#text",
            data: c[l._const.value]
          }, f = M(h, F).node, f.childNodes || (f.childNodes = []), R >= f.childNodes.length ? f.childNodes.push(B) : f.childNodes.splice(R, 0, B), f.nodeName === "TEXTAREA" && (f.value = c[l._const.newValue]), f.subsets && f.subsets.forEach(function(E) {
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
      f.subsets && (f.subsets = f.subsets.filter(function(E) {
        return !E.delete && E.oldValue !== E.newValue;
      }), C.length && (f.subsets = f.subsets.concat(C))), l.postVirtualDiffApply({
        node: S.node,
        diff: S.diff,
        newNode: B
      });
    }
    function N(h, c, l) {
      return c.forEach(function(g) {
        _(h, g, l);
      }), true;
    }
    function D(h, c) {
      c === void 0 && (c = {
        valueDiffing: true
      });
      var l = {
        nodeName: h.nodeName
      };
      if (n(h, "Text", "Comment")) l.data = h.data;
      else {
        if (h.attributes && h.attributes.length > 0) {
          l.attributes = {};
          var g = Array.prototype.slice.call(h.attributes);
          g.forEach(function(f) {
            return l.attributes[f.name] = f.value;
          });
        }
        if (h.childNodes && h.childNodes.length > 0) {
          l.childNodes = [];
          var g = Array.prototype.slice.call(h.childNodes);
          g.forEach(function(m) {
            return l.childNodes.push(D(m, c));
          });
        }
        c.valueDiffing && (n(h, "HTMLTextAreaElement") && (l.value = h.value), n(h, "HTMLInputElement") && [
          "radio",
          "checkbox"
        ].includes(h.type.toLowerCase()) && h.checked !== void 0 ? l.checked = h.checked : n(h, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement") && (l.value = h.value), n(h, "HTMLOptionElement") && (l.selected = h.selected));
      }
      return l;
    }
    var Y = /<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g, V = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
    function re(h) {
      return h.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
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
    }, ue = function(h, c) {
      var l = {
        nodeName: "",
        attributes: {}
      }, g = false, f = "tag", m = h.match(/<\/?([^\s]+?)[/\s>]/);
      if (m && (l.nodeName = c || m[1] === "svg" ? m[1] : m[1].toUpperCase(), (H[m[1]] || h.charAt(h.length - 2) === "/") && (g = true), l.nodeName.startsWith("!--"))) {
        var x = h.indexOf("-->");
        return {
          type: "comment",
          node: {
            nodeName: "#comment",
            data: x !== -1 ? h.slice(4, x) : ""
          },
          voidElement: g
        };
      }
      for (var A = new RegExp(V), C = null, S = false; !S; ) if (C = A.exec(h), C === null) S = true;
      else if (C[0].trim()) if (C[1]) {
        var B = C[1].trim(), P = [
          B,
          ""
        ];
        B.indexOf("=") > -1 && (P = B.split("=")), l.attributes[P[0]] = P[1], A.lastIndex--;
      } else C[2] && (l.attributes[C[2]] = C[3].trim().substring(1, C[3].length - 1));
      return {
        type: f,
        node: l,
        voidElement: g
      };
    }, Ee = function(h, c) {
      c === void 0 && (c = {
        valueDiffing: true,
        caseSensitive: false
      });
      var l = [], g, f = -1, m = [], x = false;
      if (h.indexOf("<") !== 0) {
        var A = h.indexOf("<");
        l.push({
          nodeName: "#text",
          data: A === -1 ? h : h.substring(0, A)
        });
      }
      return h.replace(Y, function(C, S) {
        var B = C.charAt(1) !== "/", P = C.startsWith("<!--"), F = S + C.length, I = h.charAt(F);
        if (P) {
          var R = ue(C, c.caseSensitive).node;
          if (f < 0) return l.push(R), "";
          var E = m[f];
          return E && R.nodeName && (E.node.childNodes || (E.node.childNodes = []), E.node.childNodes.push(R)), "";
        }
        if (B) {
          if (g = ue(C, c.caseSensitive || x), g.node.nodeName === "svg" && (x = true), f++, !g.voidElement && I && I !== "<") {
            g.node.childNodes || (g.node.childNodes = []);
            var X = re(h.slice(F, h.indexOf("<", F)));
            g.node.childNodes.push({
              nodeName: "#text",
              data: X
            }), c.valueDiffing && g.node.nodeName === "TEXTAREA" && (g.node.value = X);
          }
          f === 0 && g.node.nodeName && l.push(g.node);
          var le = m[f - 1];
          le && g.node.nodeName && (le.node.childNodes || (le.node.childNodes = []), le.node.childNodes.push(g.node)), m[f] = g;
        }
        if ((!B || g.voidElement) && (f > -1 && (g.voidElement || c.caseSensitive && g.node.nodeName === C.slice(2, -1) || !c.caseSensitive && g.node.nodeName.toUpperCase() === C.slice(2, -1).toUpperCase()) && (f--, f > -1 && (g.node.nodeName === "svg" && (x = false), g = m[f])), I !== "<" && I)) {
          var se = f === -1 ? l : m[f].node.childNodes || [], K = h.indexOf("<", F), X = re(h.slice(F, K === -1 ? void 0 : K));
          se.push({
            nodeName: "#text",
            data: X
          });
        }
        return "";
      }), l[0];
    }, Se = function() {
      function h(c, l, g) {
        this.options = g, this.t1 = typeof Element < "u" && n(c, "Element") ? D(c, this.options) : typeof c == "string" ? Ee(c, this.options) : JSON.parse(JSON.stringify(c)), this.t2 = typeof Element < "u" && n(l, "Element") ? D(l, this.options) : typeof l == "string" ? Ee(l, this.options) : JSON.parse(JSON.stringify(l)), this.diffcount = 0, this.foundAll = false, this.debug && (this.t1Orig = typeof Element < "u" && n(c, "Element") ? D(c, this.options) : typeof c == "string" ? Ee(c, this.options) : JSON.parse(JSON.stringify(c)), this.t2Orig = typeof Element < "u" && n(l, "Element") ? D(l, this.options) : typeof l == "string" ? Ee(l, this.options) : JSON.parse(JSON.stringify(l))), this.tracker = new we();
      }
      return h.prototype.init = function() {
        return this.findDiffs(this.t1, this.t2);
      }, h.prototype.findDiffs = function(c, l) {
        var g;
        do {
          if (this.options.debug && (this.diffcount += 1, this.diffcount > this.options.diffcap)) throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig), " -> ").concat(JSON.stringify(this.t2Orig)));
          g = this.findNextDiff(c, l, []), g.length === 0 && (q(c, l) || (this.foundAll ? console.error("Could not find remaining diffs!") : (this.foundAll = true, y(c), g = this.findNextDiff(c, l, [])))), g.length > 0 && (this.foundAll = false, this.tracker.add(g), N(c, g, this.options));
        } while (g.length > 0);
        return this.tracker.list;
      }, h.prototype.findNextDiff = function(c, l, g) {
        var f, m;
        if (this.options.maxDepth && g.length > this.options.maxDepth) return [];
        if (!c.outerDone) {
          if (f = this.findOuterDiff(c, l, g), this.options.filterOuterDiff && (m = this.options.filterOuterDiff(c, l, f), m && (f = m)), f.length > 0) return c.outerDone = true, f;
          c.outerDone = true;
        }
        if (Object.prototype.hasOwnProperty.call(c, "data")) return [];
        if (c = c, l = l, !c.innerDone) {
          if (f = this.findInnerDiff(c, l, g), f.length > 0) return f;
          c.innerDone = true;
        }
        if (this.options.valueDiffing && !c.valueDone) {
          if (f = this.findValueDiff(c, l, g), f.length > 0) return c.valueDone = true, f;
          c.valueDone = true;
        }
        return [];
      }, h.prototype.findOuterDiff = function(c, l, g) {
        var f = [], m, x, A, C, S, B;
        if (c.nodeName !== l.nodeName) {
          if (!g.length) throw new Error("Top level nodes have to be of the same kind.");
          return [
            new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(c)).setValue(this.options._const.newValue, T(l)).setValue(this.options._const.route, g)
          ];
        }
        if (g.length && this.options.diffcap < Math.abs((c.childNodes || []).length - (l.childNodes || []).length)) return [
          new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(c)).setValue(this.options._const.newValue, T(l)).setValue(this.options._const.route, g)
        ];
        if (Object.prototype.hasOwnProperty.call(c, "data") && c.data !== l.data) return c.nodeName === "#text" ? [
          new t().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, g).setValue(this.options._const.oldValue, c.data).setValue(this.options._const.newValue, l.data)
        ] : [
          new t().setValue(this.options._const.action, this.options._const.modifyComment).setValue(this.options._const.route, g).setValue(this.options._const.oldValue, c.data).setValue(this.options._const.newValue, l.data)
        ];
        for (c = c, l = l, x = c.attributes ? Object.keys(c.attributes).sort() : [], A = l.attributes ? Object.keys(l.attributes).sort() : [], C = x.length, B = 0; B < C; B++) m = x[B], S = A.indexOf(m), S === -1 ? f.push(new t().setValue(this.options._const.action, this.options._const.removeAttribute).setValue(this.options._const.route, g).setValue(this.options._const.name, m).setValue(this.options._const.value, c.attributes[m])) : (A.splice(S, 1), c.attributes[m] !== l.attributes[m] && f.push(new t().setValue(this.options._const.action, this.options._const.modifyAttribute).setValue(this.options._const.route, g).setValue(this.options._const.name, m).setValue(this.options._const.oldValue, c.attributes[m]).setValue(this.options._const.newValue, l.attributes[m])));
        for (C = A.length, B = 0; B < C; B++) m = A[B], f.push(new t().setValue(this.options._const.action, this.options._const.addAttribute).setValue(this.options._const.route, g).setValue(this.options._const.name, m).setValue(this.options._const.value, l.attributes[m]));
        return f;
      }, h.prototype.findInnerDiff = function(c, l, g) {
        var f = c.childNodes ? c.childNodes.slice() : [], m = l.childNodes ? l.childNodes.slice() : [], x = Math.max(f.length, m.length), A = Math.abs(f.length - m.length), C = [], S = 0;
        if (!this.options.maxChildCount || x < this.options.maxChildCount) {
          var B = !!(c.subsets && c.subsetsAge--), P = B ? c.subsets : c.childNodes && l.childNodes ? oe(c, l) : [];
          if (P.length > 0 && (C = this.attemptGroupRelocation(c, l, P, g, B), C.length > 0)) return C;
        }
        for (var F = 0; F < x; F += 1) {
          var I = f[F], R = m[F];
          A && (I && !R ? I.nodeName === "#text" ? (C.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, g.concat(S)).setValue(this.options._const.value, I.data)), S -= 1) : (C.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, g.concat(S)).setValue(this.options._const.element, T(I))), S -= 1) : R && !I && (R.nodeName === "#text" ? C.push(new t().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, g.concat(S)).setValue(this.options._const.value, R.data)) : C.push(new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, g.concat(S)).setValue(this.options._const.element, T(R))))), I && R && (!this.options.maxChildCount || x < this.options.maxChildCount ? C = C.concat(this.findNextDiff(I, R, g.concat(S))) : q(I, R) || (f.length > m.length ? (I.nodeName === "#text" ? C.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, g.concat(S)).setValue(this.options._const.value, I.data)) : C.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.element, T(I)).setValue(this.options._const.route, g.concat(S))), f.splice(F, 1), F -= 1, S -= 1, A -= 1) : f.length < m.length ? (C = C.concat([
            new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.element, T(R)).setValue(this.options._const.route, g.concat(S))
          ]), f.splice(F, 0, T(R)), A -= 1) : C = C.concat([
            new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(I)).setValue(this.options._const.newValue, T(R)).setValue(this.options._const.route, g.concat(S))
          ]))), S += 1;
        }
        return c.innerDone = true, C;
      }, h.prototype.attemptGroupRelocation = function(c, l, g, f, m) {
        for (var x = Q(c, l, g), A = x.gaps1, C = x.gaps2, S = c.childNodes.slice(), B = l.childNodes.slice(), P = Math.min(A.length, C.length), F, I, R, E, X, le = [], se = 0, K = 0; se < P; K += 1, se += 1) if (!(m && (A[se] === true || C[se] === true))) {
          if (A[K] === true) if (E = S[K], E.nodeName === "#text") if (B[se].nodeName === "#text") {
            if (E.data !== B[se].data) {
              for (var Ge = K; S.length > Ge + 1 && S[Ge + 1].nodeName === "#text"; ) if (Ge += 1, B[se].data === S[Ge].data) {
                X = true;
                break;
              }
              X || le.push(new t().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, f.concat(K)).setValue(this.options._const.oldValue, E.data).setValue(this.options._const.newValue, B[se].data));
            }
          } else le.push(new t().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, f.concat(K)).setValue(this.options._const.value, E.data)), A.splice(K, 1), S.splice(K, 1), P = Math.min(A.length, C.length), K -= 1, se -= 1;
          else C[se] === true ? le.push(new t().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, T(E)).setValue(this.options._const.newValue, T(B[se])).setValue(this.options._const.route, f.concat(K))) : (le.push(new t().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, f.concat(K)).setValue(this.options._const.element, T(E))), A.splice(K, 1), S.splice(K, 1), P = Math.min(A.length, C.length), K -= 1, se -= 1);
          else if (C[se] === true) E = B[se], E.nodeName === "#text" ? (le.push(new t().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, f.concat(K)).setValue(this.options._const.value, E.data)), A.splice(K, 0, true), S.splice(K, 0, {
            nodeName: "#text",
            data: E.data
          }), P = Math.min(A.length, C.length)) : (le.push(new t().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, f.concat(K)).setValue(this.options._const.element, T(E))), A.splice(K, 0, true), S.splice(K, 0, T(E)), P = Math.min(A.length, C.length));
          else if (A[K] !== C[se]) {
            if (le.length > 0) return le;
            if (R = g[A[K]], I = Math.min(R.newValue, S.length - R.length), I !== R.oldValue && I > -1) {
              F = false;
              for (var xt = 0; xt < R.length; xt += 1) U(S[I + xt], S[R.oldValue + xt], {}, false, true) || (F = true);
              if (F) return [
                new t().setValue(this.options._const.action, this.options._const.relocateGroup).setValue(this.options._const.groupLength, R.length).setValue(this.options._const.from, R.oldValue).setValue(this.options._const.to, I).setValue(this.options._const.route, f)
              ];
            }
          }
        }
        return le;
      }, h.prototype.findValueDiff = function(c, l, g) {
        var f = [];
        return c.selected !== l.selected && f.push(new t().setValue(this.options._const.action, this.options._const.modifySelected).setValue(this.options._const.oldValue, c.selected).setValue(this.options._const.newValue, l.selected).setValue(this.options._const.route, g)), (c.value || l.value) && c.value !== l.value && c.nodeName !== "OPTION" && f.push(new t().setValue(this.options._const.action, this.options._const.modifyValue).setValue(this.options._const.oldValue, c.value || "").setValue(this.options._const.newValue, l.value || "").setValue(this.options._const.route, g)), c.checked !== l.checked && f.push(new t().setValue(this.options._const.action, this.options._const.modifyChecked).setValue(this.options._const.oldValue, c.checked).setValue(this.options._const.newValue, l.checked).setValue(this.options._const.route, g)), f;
      }, h;
    }(), at = {
      debug: false,
      diffcap: 10,
      maxDepth: false,
      maxChildCount: 50,
      valueDiffing: true,
      textDiff: function(h, c, l, g) {
        h.data = g;
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
    }, uo = function() {
      function h(c) {
        if (c === void 0 && (c = {}), Object.entries(at).forEach(function(f) {
          var m = f[0], x = f[1];
          Object.prototype.hasOwnProperty.call(c, m) || (c[m] = x);
        }), !c._const) {
          var l = [
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
          ], g = {};
          c.compress ? l.forEach(function(f, m) {
            return g[f] = m;
          }) : l.forEach(function(f) {
            return g[f] = f;
          }), c._const = g;
        }
        this.options = c;
      }
      return h.prototype.apply = function(c, l) {
        return a(c, l, this.options);
      }, h.prototype.undo = function(c, l) {
        return p(c, l, this.options);
      }, h.prototype.diff = function(c, l) {
        var g = new Se(c, l, this.options);
        return g.init();
      }, h;
    }(), ho = function() {
      function h(c) {
        c === void 0 && (c = {});
        var l = this;
        this.pad = "\u2502   ", this.padding = "", this.tick = 1, this.messages = [];
        var g = function(m, x) {
          var A = m[x];
          m[x] = function() {
            for (var C = arguments, S = [], B = 0; B < arguments.length; B++) S[B] = C[B];
            l.fin(x, Array.prototype.slice.call(S));
            var P = A.apply(m, S);
            return l.fout(x, P), P;
          };
        };
        for (var f in c) typeof c[f] == "function" && g(c, f);
        this.log("\u250C TRACELOG START");
      }
      return h.prototype.fin = function(c, l) {
        this.padding += this.pad, this.log("\u251C\u2500> entering ".concat(c), l);
      }, h.prototype.fout = function(c, l) {
        this.log("\u2502<\u2500\u2500\u2518 generated return value", l), this.padding = this.padding.substring(0, this.padding.length - this.pad.length);
      }, h.prototype.format = function(c, l) {
        var g = function(f) {
          for (var m = "".concat(f); m.length < 4; ) m = "0".concat(f);
          return m;
        };
        return "".concat(g(l), "> ").concat(this.padding).concat(c);
      }, h.prototype.log = function() {
        for (var c = arguments, l = [], g = 0; g < arguments.length; g++) l[g] = c[g];
        var f = function(x) {
          return x ? typeof x == "string" ? x : n(x, "HTMLElement") ? x.outerHTML || "<empty>" : x instanceof Array ? "[".concat(x.map(f).join(","), "]") : x.toString() || x.valueOf() || "<unknown>" : "<falsey>";
        }, m = l.map(f).join(", ");
        this.messages.push(this.format(m, this.tick++));
      }, h.prototype.toString = function() {
        for (var c = "\xD7   ", l = "\u2514\u2500\u2500\u2500"; l.length <= this.padding.length + this.pad.length; ) l += c;
        var g = this.padding;
        return this.padding = "", l = this.format(l, this.tick), this.padding = g, "".concat(this.messages.join(`
`), `
`).concat(l);
      }, h;
    }();
    return Qe.DiffDOM = uo, Qe.TraceLogger = ho, Qe.nodeToObj = D, Qe.stringToObj = Ee, Qe;
  }
  var Zs = Gs();
  class Qs {
    constructor({ targetElement: e, newMarkup: t, customElement: n }) {
      __publicField(this, "performDiff", () => {
        const e = this.diffDom.diff(this.target, this.clone);
        this.diff = this.filterDiff(e);
      });
      __publicField(this, "filterDiff", (e) => {
        const t = [];
        for (const n of e) if (!(n.action == "removeAttribute" && [
          "data-hash-id",
          "data-render-time"
        ].includes(n.name)) && !(n.action == "modifyAttribute" && [
          "data-hash-id",
          "data-render-time"
        ].includes(n.name))) {
          if (n.action == "removeElement" && n.element.nodeName == "#comment") {
            t.push(n);
            continue;
          }
          n.action == "removeElement" && n.element.attributes["data-parent-id"] != this.customElement.hashId || t.push(n);
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
      this.diffDom = new Zs.DiffDOM(), this.target = e, this.customElement = n;
      const i = e.cloneNode(true), r = n._dotJSengine(t);
      n.app._originalInnerHTML.call(i, r), this.clone = i, this.diff = null;
    }
    get options() {
      return this.diffDom.options;
    }
    set options(e) {
      this.diffDom.options = e;
    }
  }
  const Le = {
    CHANGE: "app-data-change",
    QUERYCHANGE: "query-data-change"
  };
  function gt(o) {
    return o.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const Js = /* @__PURE__ */ new Set([
    "viewBox",
    "preserveAspectRatio",
    "patternTransform",
    "clipPathUnits"
  ]);
  class ea {
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
  class ta extends ea {
    constructor({ appName: e, dataStructure: t = {}, elements: n = {}, renderFunctions: i = {}, router: r = null, authenticator: s = null, extensions: a = {}, properties: d = {}, methods: u = {}, beforeInit: p = {}, afterInit: v = {}, errorPages: b = null }) {
      super();
      __publicField(this, "identifier", "app");
      __privateAdd(this, _r4);
      __privateAdd(this, _e3, /* @__PURE__ */ new Map());
      __privateAdd(this, _h4);
      __privateAdd(this, _s4);
      __privateAdd(this, _t4);
      __publicField(this, "_router");
      __privateAdd(this, _o4);
      __publicField(this, "_authenticator");
      __privateAdd(this, _a3);
      __publicField(this, "_extensions");
      __privateAdd(this, _i4);
      __privateAdd(this, _l4);
      __publicField(this, "_renderFunctions");
      __privateAdd(this, _p4);
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
        this.containerId = e, this.container = t, this.container.setAttribute("app-id", this.generateHash()), this.container.app = this, this.registerCustomElements(__privateGet(this, _l4)), this.registerCustomElements(this._errorPages), this._modifyPrototypeMethods(), this._authenticator && __privateSet(this, _a3, this._authenticator(this)), __privateGet(this, _c4).call(this), await __privateGet(this, _d4).call(this, __privateGet(this, _h4)), this._router && __privateSet(this, _o4, this._router(this)), await __privateGet(this, _n4).call(this), __privateGet(this, _o4) && await __privateGet(this, _o4).route(), await __privateGet(this, _m3).call(this), await __privateGet(this, _d4).call(this, __privateGet(this, _s4));
      });
      __privateAdd(this, _c4, () => {
        for (const [e, t] of Object.entries(this._methods)) {
          if (__privateGet(this, _p4).includes(e) || e.startsWith("#") || e.startsWith("_")) throw new Error(`Illegal or protected method name. Can't assign method with name (${e})
                    that is protected or if it is of illegal format (startswith: # or _) to application`);
          try {
            this[e] = t.bind(this);
          } catch (n) {
            throw new Error(`${t} is probably not a function. Failed to bind method ${t} to application.` + n);
          }
        }
        this._methods = null;
      });
      __publicField(this, "_modifyPrototypeMethods", () => {
        this._originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, this._originalOuterHTML = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML").set, this._originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML, this._originalAppendChild = Element.prototype.appendChild, this._originalSetAttribute = Element.prototype.setAttribute, this._originalRemoveAttribute = Element.prototype.removeAttribute;
        const e = this;
        Element.prototype.insertAdjacentHTML = function(t, n) {
          const i = this.closest("[data-hash-id]");
          if (!i) return e._originalInsertAdjacentHTML.call(this, t, n);
          const r = i._dotJSengine(n);
          e._originalInsertAdjacentHTML.call(this, t, r), i._hydrate(), i.clearTemplateVariables();
        }, Object.defineProperty(Element.prototype, "innerHTML", {
          set: function(t) {
            const n = this.closest("[data-hash-id]");
            if (!n) {
              e._originalInnerHTML.call(this, t);
              return;
            }
            new Qs({
              targetElement: this,
              newMarkup: t,
              customElement: n
            }).setInnerHTML(), n._hydrate(), n.clearTemplateVariables();
          }
        }), Object.defineProperty(Element.prototype, "outerHTML", {
          set: function(t) {
            var _a4;
            const n = (_a4 = this.parent) == null ? void 0 : _a4.closest("[data-hash-id]");
            if (n) {
              const i = n._dotJSengine(t);
              e._originalOuterHTML.call(this, i), n._hydrate();
              return;
            }
            e._originalOuterHTML.call(this, t);
          }
        }), Element.prototype.setAttribute = function(t, n) {
          let i = t.startsWith(":") ? `data-${t.substring(1)}` : t;
          this instanceof SVGElement && Js.has(i) || (i = gt(i)), e._originalSetAttribute.call(this, i, n), this instanceof Ne && this._refreshBoundElements(`attrs.${i.replace("data-", "")}`);
        }, Element.prototype.setAttributes = function(t) {
          for (const [n, i] of Object.entries(t)) this.setAttribute(n, i);
        }, Element.prototype.removeAttribute = function(t, n) {
          const i = t.startsWith(":") ? `data-${t.substring(1)}` : t;
          e._originalRemoveAttribute.call(this, i, n), this instanceof Ne && this._refreshBoundElements(`attrs.${i.replace("data-", "")}`);
        }, this._originalDocQS = Document.prototype.querySelector, this._originalDocQSA = Document.prototype.querySelectorAll, this._originalElQS = Element.prototype.querySelector, this._originalElQSA = Element.prototype.querySelectorAll, Document.prototype.querySelector = function(t) {
          const n = Ct(t);
          return e._originalDocQS.call(this, n);
        }, Document.prototype.querySelectorAll = function(t) {
          const n = Ct(t);
          return e._originalDocQSA.call(this, n);
        }, Element.prototype.querySelector = function(t) {
          const n = Ct(t);
          return e._originalElQS.call(this, n);
        }, Element.prototype.querySelectorAll = function(t) {
          const n = Ct(t);
          return e._originalElQSA.call(this, n);
        };
      });
      __privateAdd(this, _n4, async () => {
        if (this._extensions) {
          __privateSet(this, _i4, {});
          for (const [e, t] of Object.entries(this._extensions)) __privateGet(this, _i4)[e] = await t(this);
        }
      });
      __privateAdd(this, _d4, async (e) => {
        for (const [t, n] of Object.entries(e)) await n.bind(this)();
      });
      __privateAdd(this, _f4, (e) => {
        for (const [t, n] of Object.entries(e)) __privateGet(this, _e3).set(t, n);
      });
      __privateAdd(this, _m3, async () => {
        const e = [];
        return Array.from(this.querySelectorAll("*")).filter((n) => n instanceof Ne).forEach((n) => {
          e.push(n.initComplete);
        }), await Promise.all(e);
      });
      __publicField(this, "setData", (e, t) => {
        if (!__privateGet(this, _e3).has(e)) throw new Error(`Failed to set data. Missing data field ${e} in app data structure`);
        __privateGet(this, _e3).set(e, t), __privateGet(this, _g3).call(this, e);
      });
      __publicField(this, "removeData", (e) => {
        if (!__privateGet(this, _e3).has(e)) throw new Error(`Failed to set data. Missing data field ${e} in app data structure`);
        __privateGet(this, _e3).set(e, null), __privateGet(this, _g3).call(this, e);
      });
      __publicField(this, "getData", (e) => {
        if (!__privateGet(this, _e3).has(e)) throw new Error(`Failed to fetch data for field ${e}. Data field does not exist`);
        return __privateGet(this, _e3).get(e);
      });
      __publicField(this, "getAllData", (e = false) => e ? Object.fromEntries(__privateGet(this, _e3)) : __privateGet(this, _e3));
      __privateAdd(this, _g3, (e) => {
        const t = new CustomEvent(Le.CHANGE, {
          detail: {
            field: gt(e)
          }
        });
        this.container.dispatchEvent(t);
      });
      __privateAdd(this, _u4, (e, t) => {
        const n = new CustomEvent(Le.QUERYCHANGE, {
          detail: {
            key: e,
            value: t
          }
        });
        this.container.dispatchEvent(n);
      });
      __privateAdd(this, _v3, () => {
        const e = new CustomEvent(Le.QUERYCHANGE, {
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
        const t = new URLSearchParams(e), n = {};
        for (const [i, r] of t.entries()) n[i] = r;
        return n;
      });
      __publicField(this, "getQueryParams", (e = false) => e ? this.queryParamsToObject(location.search) : location.search);
      __publicField(this, "generateHash", (e = 16) => {
        const t = new Uint8Array(e);
        return window.crypto.getRandomValues(t), Array.from(t, (n) => n.toString(16).padStart(2, "0")).join("");
      });
      if (!e) throw new Error("Missing appName parameter");
      __privateSet(this, _r4, e), __privateGet(this, _f4).call(this, t), __privateSet(this, _l4, n), this._router = r, this._authenticator = s, this._extensions = a, this._renderFunctions = i, this._errorPages = b, __privateSet(this, _t4, d), __privateSet(this, _h4, p), __privateSet(this, _s4, v), this._methods = u, __privateSet(this, _p4, Object.getOwnPropertyNames(this));
    }
    isCustomElement(e) {
      return e instanceof Ne && customElements.get(e.tagName.toLowerCase());
    }
    get app() {
      return this;
    }
    get properties() {
      return __privateGet(this, _t4);
    }
    get appName() {
      return __privateGet(this, _r4);
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
      for (const [n, i] of Object.entries(e)) t.searchParams.set(n, i);
      window.history.replaceState(null, null, t);
      for (const [n, i] of Object.entries(e)) __privateGet(this, _u4).call(this, n, i);
      __privateGet(this, _v3).call(this);
    }
    removeQueryParams(e) {
      const t = this.queryParams, n = {};
      for (const [i, r] of Object.entries(t)) e.includes(i) || (n[i] = r);
      this.queryParams = n;
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
  _r4 = new WeakMap();
  _e3 = new WeakMap();
  _h4 = new WeakMap();
  _s4 = new WeakMap();
  _t4 = new WeakMap();
  _o4 = new WeakMap();
  _a3 = new WeakMap();
  _i4 = new WeakMap();
  _l4 = new WeakMap();
  _p4 = new WeakMap();
  _c4 = new WeakMap();
  _n4 = new WeakMap();
  _d4 = new WeakMap();
  _f4 = new WeakMap();
  _m3 = new WeakMap();
  _g3 = new WeakMap();
  _u4 = new WeakMap();
  _v3 = new WeakMap();
  class je extends Error {
    constructor({ msg: e, name: t, statusCode: n, response: i }) {
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
        return (e == null ? void 0 : e.headers) ? e.json().then((n) => n).catch((n) => t == 500 ? this.default500 : null) : e;
      });
      this.statusCode = n, this.name = t, this.response = i, this.init();
    }
  }
  class oa extends je {
    constructor(e) {
      super({
        msg: "Bad request",
        name: "BadRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class na extends je {
    constructor(e) {
      super({
        msg: "Unauthorized",
        name: "UnauthorizedRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class ia extends je {
    constructor(e) {
      super({
        msg: "Forbidden resource",
        name: "ForbiddenRequest",
        statusCode: e.status,
        response: e
      });
    }
  }
  class ra extends je {
    constructor(e) {
      super({
        msg: "Resource not found",
        name: "ResourceNotFound",
        statusCode: e.status,
        response: e
      });
    }
  }
  class sa extends je {
    constructor(e) {
      super({
        msg: "This HTTP method is not allowed",
        name: "MethodNotAllowed",
        statusCode: e.status,
        response: e
      });
    }
  }
  class aa extends je {
    constructor(e) {
      super({
        msg: "The request timed out.",
        name: "RequestTimeout",
        statusCode: e.status,
        response: e
      });
    }
  }
  class la extends je {
    constructor(e) {
      super({
        msg: "To many requests to the server.",
        name: "ToManyRequests",
        statusCode: e.status,
        response: e
      });
    }
  }
  class ca extends je {
    constructor(e) {
      super({
        msg: "Internal server error",
        name: "InternalServerError",
        statusCode: e.status,
        response: e
      });
    }
  }
  const da = {
    400: oa,
    401: na,
    403: ia,
    404: ra,
    405: sa,
    408: aa,
    429: la,
    500: ca
  };
  new Map(Object.entries(da));
  class ua {
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
  const _qt = class _qt {
  };
  __publicField(_qt, "requestConfigs", {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });
  __publicField(_qt, "catchError", async (e, t) => {
    try {
      const n = await e;
      return [
        void 0,
        new ua(n)
      ];
    } catch (n) {
      if (!t || t.some((i) => n instanceof i)) return [
        n,
        void 0
      ];
      throw n;
    }
  });
  __publicField(_qt, "getHTML", async ({ url: e, errors: t }) => {
    if (!e) throw new Error("Missing url parameter in GET getHTML call. Forgot to provide a config object? {}");
    const [n, i] = await _qt.catchError(fetch(e), t);
    return n ? [
      n,
      void 0
    ] : await i.text();
  });
  __publicField(_qt, "get", async ({ url: e, requestConfigs: t = {}, errors: n }) => {
    if (!e) throw new Error("Missing url parameter in GET call. Forgot to provide a config object? {}");
    return await _qt.catchError(fetch(e, {
      ..._qt.requestConfigs,
      ...t
    }), n);
  });
  __publicField(_qt, "post", async ({ url: e, data: t, requestConfigs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in POST call. Forgot to provide a config object? {}");
    return await _qt.catchError(fetch(e, {
      ..._qt.requestConfigs,
      ...n,
      method: "POST",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_qt, "postForm", async ({ url: e, data: t, requestConfigs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in POST form call. Forgot to provide a config object? {}");
    const r = _qt._multipartFormDataConfigs(n);
    return await _qt.catchError(fetch(e, {
      ...r,
      method: "POST",
      body: t
    }), i);
  });
  __publicField(_qt, "put", async ({ url: e, data: t, requestConfigs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PUT call. Forgot to provide a config object? {}");
    return await _qt.catchError(fetch(e, {
      ..._qt.requestConfigs,
      ...n,
      method: "PUT",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_qt, "putForm", async ({ url: e, data: t, requestConfigs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PUT form call. Forgot to provide a config object? {}");
    const r = _qt._multipartFormDataConfigs(n);
    return await _qt.catchError(fetch(e, {
      ...r,
      method: "PUT",
      body: t
    }), i);
  });
  __publicField(_qt, "patch", async ({ url: e, data: t, requestConfigs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PATCH call. Forgot to provide a config object? {}");
    return await _qt.catchError(fetch(e, {
      ..._qt.requestConfigs,
      ...n,
      method: "PUT",
      body: JSON.stringify(t)
    }), i);
  });
  __publicField(_qt, "patchForm", async ({ url: e, data: t, configs: n = {}, errors: i }) => {
    if (!e) throw new Error("Missing url parameter in PATCH form call. Forgot to provide a config object? {}");
    const r = _qt._multipartFormDataConfigs(n);
    return await _qt.catchError(fetch(e, {
      ...r,
      method: "PUT",
      body: t
    }), i);
  });
  __publicField(_qt, "delete", async ({ url: e, requestConfigs: t = {}, errors: n }) => {
    if (!e) throw new Error("Missing url parameter in DELETE call. Forgot to provide a config object? {}");
    return await _qt.catchError(fetch(e, {
      ..._qt.requestConfigs,
      ...t,
      method: "DELETE"
    }), n);
  });
  __publicField(_qt, "_multipartFormDataConfigs", (e) => ({
    ..._qt.requestConfigs,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...e
  }));
  let qt = _qt;
  async function ha() {
    return ie`
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
  const pa = de({
    tagName: "base-layout",
    markup: ha
  });
  function fa() {
    return ie`
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
  function yt() {
    const o = fa();
    document.body.insertAdjacentHTML("afterbegin", o);
  }
  function Wt() {
    document.querySelector("#spinner-overlay").remove();
  }
  async function ga() {
    return ie`
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
  async function ma(o, e, t) {
    e.preventDefault(), e.stopPropagation();
  }
  async function va(o, e, t) {
    e.preventDefault(), e.stopPropagation(), this.dropzone.style.borderColor = "blue", this.dropzone.classList.add("bg-secondary");
  }
  async function ba(o, e, t) {
    e.preventDefault(), e.stopPropagation(), this.dropzone.style.borderColor = "#aaa", this.dropzone.classList.remove("bg-secondary");
  }
  async function ya(o, e, t) {
    e.preventDefault(), e.stopPropagation();
    const n = e.dataTransfer.files;
    this.handleFile(n[0]), this.dropzone.style.borderColor = "#aaa", this.dropzone.classList.remove("bg-secondary");
  }
  async function Ji(o) {
    yt();
    const e = new FormData();
    e.append("file", o);
    let t = await fetch("/api/v1/files", {
      method: "POST",
      body: e
    });
    if (!t || !t.ok || (t == null ? void 0 : t.status) != 200) return this.ext.messenger.setMessage({
      msg: "Failed to parse LIF file.",
      status: "warning"
    });
    t = await t.json(), this.setData("video", t.data), Wt();
  }
  async function ka() {
    this.fileInput.click();
  }
  async function wa(o, e, t) {
    const n = o.files[0];
    await this.handleFile(n);
  }
  const Ea = de({
    tagName: "upload-dropzone",
    markup: ga,
    methods: {
      uploadLif: ka,
      handleFile: Ji,
      dropHandler: ya,
      dragEnterHandler: ma,
      dragOverHandler: va,
      dragLeaveHandler: ba,
      uploadFile: wa,
      startOverlaySpinner: yt,
      removeOverlaySpinner: Wt
    },
    define: {
      dropzone: me(".dropzone"),
      fileInput: me('input[type="file"]')
    }
  });
  async function xa() {
    return ie`
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
                <li><a href="/api/v1/files/save-project" jolt-click="saveProject" target="_blank" router-ignore="true">Save project</a></li>
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
  async function Ca(o, e, t) {
    let n = await fetch("/shutdown");
    if (console.log(n), !n.ok || (n == null ? void 0 : n.status) != 200) throw new Error("Something went wrong. Failed to shutdown");
    window.close();
  }
  async function Ta() {
    return Wi`
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
  async function _a(o, e, t) {
    o.blur(), this.pklUpload.click();
  }
  async function Sa(o) {
    if (!(o == null ? void 0 : o.files) || !o.files[0]) return;
    const e = new FormData();
    e.append("file", o.files[0]), yt();
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
  function Ba(o, e, t) {
    this.dropdownMenus.forEach(function(n) {
      n.id !== t.menu && n.classList.remove("show");
    }), document.getElementById(t.menu).classList.toggle("show");
  }
  function Oa(o) {
    o.target.matches(".menu-bar a") || this.dropdownMenus.forEach(function(e) {
      e.classList.remove("show");
    });
  }
  function Ma() {
    this.dropdownMenus.forEach((o) => {
      o.classList.remove("show");
    });
  }
  function Aa(o, e, t) {
    o.blur(), this.closeMenus();
  }
  async function Ia(o, e, t) {
    o.blur(), !(t == null ? void 0 : t.disabled) && (this.closeMenus(), this.fileUpload.click());
  }
  async function Pa(o, e, t) {
    const n = o.files[0];
    await this.handleFile(n);
  }
  async function Na(o, e, t) {
    await this.app.ext.messenger.infoModal({
      title: "About",
      content: "<about-info></about-info>"
    });
  }
  async function La(o, e, t) {
    this.closeMenus(), await this.app.ext.messenger.confirmModal({
      title: "New project",
      content: "Are you sure you want to start a new project? All current data will be deleted.",
      callbackFunction: async (n, i) => {
        await this.startNewProject();
      }
    });
  }
  async function Da() {
    let o = await fetch("/new-project");
    (!o || !(o == null ? void 0 : o.ok) || (o == null ? void 0 : o.status) != 200) && this.ext.messenger.setMessage({
      msg: "Failed to start new project. Check application.",
      status: "warning"
    }), location.reload();
  }
  const Ra = de({
    tagName: "menu-element",
    markup: xa,
    css: {
      scoped: false,
      style: Ta
    },
    methods: {
      toggleDropdown: Ba,
      closeOnMissclick: Oa,
      importLif: Ia,
      openAboutModal: Na,
      closeMenus: Ma,
      handleFile: Ji,
      uploadFile: Pa,
      shutdownApp: Ca,
      saveProject: Aa,
      openProject: _a,
      uploadPkl: Sa,
      newProject: La,
      startNewProject: Da
    },
    define: {
      dropdownMenus: js(".dropdown-menu"),
      fileUpload: me(".lif-upload"),
      pklUpload: me(".pkl-upload"),
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
  async function ja() {
    return ie`
        <div data-bind="app.video">
            {{? this.video == null }}
                <upload-dropzone></upload-dropzone>
            {{??}}
                <video-player></video-player>
            {{?}}
        </div>
    `;
  }
  const er = de({
    tagName: "home-page",
    markup: ja,
    define: {
      video: {
        get() {
          return this.getData("video");
        }
      }
    }
  });
  async function Ha() {
    return ie`
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
  const tr = de({
    tagName: "documentation-page",
    markup: Ha
  });
  async function Fa() {
    return ie`
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
  async function $a(o, e, t) {
    o.blur();
    const n = {
      [this.projectName.id]: this.projectName.value,
      [this.sampling.id]: this.sampling.value,
      [this.pxToUm.id]: this.pxToUm.value
    };
    let [i, r] = await qt.post({
      url: `${this.properties.apiUrl}/preferences`,
      data: n
    });
    if (i) return this.ext.messenger.setMessage({
      msg: "Failed to save preferences",
      status: "warning"
    });
    if ([i, r] = await r.json(), i) return this.ext.messenger.setMessage({
      msg: "Failed to parse response from save preferences.",
      status: "warning"
    });
    this.setData("preferences", r.data);
  }
  async function _i() {
    let [o, e] = await qt.get({
      url: `${this.properties.apiUrl}/preferences`
    });
    if (o) return this.ext.messenger.setMessage({
      msg: "Failed to load preferences",
      status: "warning"
    });
    if ([o, e] = await e.json(), o) return this.ext.messenger.setMessage({
      msg: "Failed to parse response from load preferences.",
      status: "warning"
    });
    this.setData("preferences", e.data);
  }
  const Va = de({
    tagName: "configurations-offcanvas",
    markup: Fa,
    methods: {
      savePreferences: $a,
      loadPreferences: _i
    },
    beforeInit: {
      loadPreferences: _i
    },
    define: {
      preferences: ge(null),
      projectName: me("#project_name"),
      sampling: me("#sampling"),
      pxToUm: me("#px_to_um"),
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
        var o = document.createElement("style");
        o.appendChild(document.createTextNode(".ce-hint--align-start{text-align:left}.ce-hint--align-center{text-align:center}.ce-hint__description{opacity:.6;margin-top:3px}")), document.head.appendChild(o);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function Yt(o) {
    return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
  }
  function Ua(o) {
    if (o.__esModule) return o;
    var e = o.default;
    if (typeof e == "function") {
      var t = function n() {
        return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
      value: true
    }), Object.keys(o).forEach(function(n) {
      var i = Object.getOwnPropertyDescriptor(o, n);
      Object.defineProperty(t, n, i.get ? i : {
        enumerable: true,
        get: function() {
          return o[n];
        }
      });
    }), t;
  }
  function fo() {
  }
  Object.assign(fo, {
    default: fo,
    register: fo,
    revert: function() {
    },
    __esModule: true
  });
  Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(o) {
    const e = (this.document || this.ownerDocument).querySelectorAll(o);
    let t = e.length;
    for (; --t >= 0 && e.item(t) !== this; ) ;
    return t > -1;
  });
  Element.prototype.closest || (Element.prototype.closest = function(o) {
    let e = this;
    if (!document.documentElement.contains(e)) return null;
    do {
      if (e.matches(o)) return e;
      e = e.parentElement || e.parentNode;
    } while (e !== null);
    return null;
  });
  Element.prototype.prepend || (Element.prototype.prepend = function(o) {
    const e = document.createDocumentFragment();
    Array.isArray(o) || (o = [
      o
    ]), o.forEach((t) => {
      const n = t instanceof Node;
      e.appendChild(n ? t : document.createTextNode(t));
    }), this.insertBefore(e, this.firstChild);
  });
  Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(o) {
    o = arguments.length === 0 ? true : !!o;
    const e = this.parentNode, t = window.getComputedStyle(e, null), n = parseInt(t.getPropertyValue("border-top-width")), i = parseInt(t.getPropertyValue("border-left-width")), r = this.offsetTop - e.offsetTop < e.scrollTop, s = this.offsetTop - e.offsetTop + this.clientHeight - n > e.scrollTop + e.clientHeight, a = this.offsetLeft - e.offsetLeft < e.scrollLeft, d = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth, u = r && !s;
    (r || s) && o && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - n + this.clientHeight / 2), (a || d) && o && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (r || s || a || d) && !o && this.scrollIntoView(u);
  });
  window.requestIdleCallback = window.requestIdleCallback || function(o) {
    const e = Date.now();
    return setTimeout(function() {
      o({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - e));
        }
      });
    }, 1);
  };
  window.cancelIdleCallback = window.cancelIdleCallback || function(o) {
    clearTimeout(o);
  };
  let za = (o = 21) => crypto.getRandomValues(new Uint8Array(o)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
  var or = ((o) => (o.VERBOSE = "VERBOSE", o.INFO = "INFO", o.WARN = "WARN", o.ERROR = "ERROR", o))(or || {});
  const L = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    DELETE: 46
  }, qa = {
    LEFT: 0
  };
  function kt(o, e, t = "log", n, i = "color: inherit") {
    if (!("console" in window) || !window.console[t]) return;
    const r = [
      "info",
      "log",
      "warn",
      "error"
    ].includes(t), s = [];
    switch (kt.logLevel) {
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
        if (!r || o) return;
        break;
    }
    n && s.push(n);
    const a = "Editor.js 2.31.0-rc.7";
    o && (r ? (s.unshift(`line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`, i), e = `%c${a}%c ${e}`) : e = `( ${a} )${e}`);
    try {
      r ? n ? console[t](`${e} %o`, ...s) : console[t](e, ...s) : console[t](e);
    } catch {
    }
  }
  kt.logLevel = "VERBOSE";
  function Wa(o) {
    kt.logLevel = o;
  }
  const W = kt.bind(window, false), ye = kt.bind(window, true);
  function qe(o) {
    return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function ee(o) {
    return qe(o) === "function" || qe(o) === "asyncfunction";
  }
  function ce(o) {
    return qe(o) === "object";
  }
  function Ie(o) {
    return qe(o) === "string";
  }
  function Ya(o) {
    return qe(o) === "boolean";
  }
  function Si(o) {
    return qe(o) === "number";
  }
  function Bi(o) {
    return qe(o) === "undefined";
  }
  function ke(o) {
    return o ? Object.keys(o).length === 0 && o.constructor === Object : true;
  }
  function nr(o) {
    return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
  }
  async function Xa(o, e = () => {
  }, t = () => {
  }) {
    async function n(i, r, s) {
      try {
        await i.function(i.data), await r(Bi(i.data) ? {} : i.data);
      } catch {
        s(Bi(i.data) ? {} : i.data);
      }
    }
    return o.reduce(async (i, r) => (await i, n(r, e, t)), Promise.resolve());
  }
  function ir(o) {
    return Array.prototype.slice.call(o);
  }
  function Lt(o, e) {
    return function() {
      const t = this, n = arguments;
      window.setTimeout(() => o.apply(t, n), e);
    };
  }
  function Ka(o) {
    return o.name.split(".").pop();
  }
  function Ga(o) {
    return /^[-\w]+\/([-+\w]+|\*)$/.test(o);
  }
  function Oi(o, e, t) {
    let n;
    return (...i) => {
      const r = this, s = () => {
        n = null, o.apply(r, i);
      };
      window.clearTimeout(n), n = window.setTimeout(s, e);
    };
  }
  function Eo(o, e, t = void 0) {
    let n, i, r, s = null, a = 0;
    t || (t = {});
    const d = function() {
      a = t.leading === false ? 0 : Date.now(), s = null, r = o.apply(n, i), s || (n = i = null);
    };
    return function() {
      const u = Date.now();
      !a && t.leading === false && (a = u);
      const p = e - (u - a);
      return n = this, i = arguments, p <= 0 || p > e ? (s && (clearTimeout(s), s = null), a = u, r = o.apply(n, i), s || (n = i = null)) : !s && t.trailing !== false && (s = setTimeout(d, p)), r;
    };
  }
  function Za() {
    const o = {
      win: false,
      mac: false,
      x11: false,
      linux: false
    }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
    return e && (o[e] = true), o;
  }
  function Dt(o) {
    return o[0].toUpperCase() + o.slice(1);
  }
  function xo(o, ...e) {
    if (!e.length) return o;
    const t = e.shift();
    if (ce(o) && ce(t)) for (const n in t) ce(t[n]) ? (o[n] || Object.assign(o, {
      [n]: {}
    }), xo(o[n], t[n])) : Object.assign(o, {
      [n]: t[n]
    });
    return xo(o, ...e);
  }
  function Po(o) {
    const e = Za();
    return o = o.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, " + "), e.mac ? o = o.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
  }
  function Qa(o) {
    try {
      return new URL(o).href;
    } catch {
    }
    return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
  }
  function Ja() {
    return za(10);
  }
  function el(o) {
    window.open(o, "_blank");
  }
  function tl(o = "") {
    return `${o}${Math.floor(Math.random() * 1e8).toString(16)}`;
  }
  function Co(o, e, t) {
    const n = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
    o && ye(n, "warn");
  }
  function rt(o, e, t) {
    const n = t.value ? "value" : "get", i = t[n], r = `#${e}Cache`;
    if (t[n] = function(...s) {
      return this[r] === void 0 && (this[r] = i.apply(this, ...s)), this[r];
    }, n === "get" && t.set) {
      const s = t.set;
      t.set = function(a) {
        delete o[r], s.apply(this, a);
      };
    }
    return t;
  }
  const rr = 650;
  function st() {
    return window.matchMedia(`(max-width: ${rr}px)`).matches;
  }
  const To = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function ol(o, e) {
    const t = Array.isArray(o) || ce(o), n = Array.isArray(e) || ce(e);
    return t || n ? JSON.stringify(o) === JSON.stringify(e) : o === e;
  }
  let k = class pe {
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
    static make(e, t = null, n = {}) {
      const i = document.createElement(e);
      if (Array.isArray(t)) {
        const r = t.filter((s) => s !== void 0);
        i.classList.add(...r);
      } else t && i.classList.add(t);
      for (const r in n) Object.prototype.hasOwnProperty.call(n, r) && (i[r] = n[r]);
      return i;
    }
    static text(e) {
      return document.createTextNode(e);
    }
    static append(e, t) {
      Array.isArray(t) ? t.forEach((n) => e.appendChild(n)) : e.appendChild(t);
    }
    static prepend(e, t) {
      Array.isArray(t) ? (t = t.reverse(), t.forEach((n) => e.prepend(n))) : e.prepend(t);
    }
    static swap(e, t) {
      const n = document.createElement("div"), i = e.parentNode;
      i.insertBefore(n, e), i.insertBefore(e, t), i.insertBefore(t, n), i.removeChild(n);
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
      return ir(e.querySelectorAll(pe.allInputsSelector)).reduce((t, n) => pe.isNativeInput(n) || pe.containsOnlyInlineElements(n) ? [
        ...t,
        n
      ] : [
        ...t,
        ...pe.getDeepestBlockElements(n)
      ], []);
    }
    static getDeepestNode(e, t = false) {
      const n = t ? "lastChild" : "firstChild", i = t ? "previousSibling" : "nextSibling";
      if (e && e.nodeType === Node.ELEMENT_NODE && e[n]) {
        let r = e[n];
        if (pe.isSingleTag(r) && !pe.isNativeInput(r) && !pe.isLineBreakTag(r)) if (r[i]) r = r[i];
        else if (r.parentNode[i]) r = r.parentNode[i];
        else return r.parentNode;
        return this.getDeepestNode(r, t);
      }
      return e;
    }
    static isElement(e) {
      return Si(e) ? false : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
    }
    static isFragment(e) {
      return Si(e) ? false : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
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
      if (pe.isNativeInput(e)) switch (e.type) {
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
      else t = pe.isContentEditable(e);
      return t;
    }
    static isNodeEmpty(e, t) {
      let n;
      return this.isSingleTag(e) && !this.isLineBreakTag(e) ? false : (this.isElement(e) && this.isNativeInput(e) ? n = e.value : n = e.textContent.replace("\u200B", ""), t && (n = n.replace(new RegExp(t, "g"), "")), n.length === 0);
    }
    static isLeaf(e) {
      return e ? e.childNodes.length === 0 : false;
    }
    static isEmpty(e, t) {
      const n = [
        e
      ];
      for (; n.length > 0; ) if (e = n.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e, t)) return false;
        e.childNodes && n.push(...Array.from(e.childNodes));
      }
      return true;
    }
    static isHTMLString(e) {
      const t = pe.make("div");
      return t.innerHTML = e, t.childElementCount > 0;
    }
    static getContentLength(e) {
      return pe.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
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
      const n = (i) => !pe.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(n);
      return Array.from(t.children).every(n);
    }
    static getDeepestBlockElements(e) {
      return pe.containsOnlyInlineElements(e) ? [
        e
      ] : Array.from(e.children).reduce((t, n) => [
        ...t,
        ...pe.getDeepestBlockElements(n)
      ], []);
    }
    static getHolder(e) {
      return Ie(e) ? document.getElementById(e) : e;
    }
    static isAnchor(e) {
      return e.tagName.toLowerCase() === "a";
    }
    static offset(e) {
      const t = e.getBoundingClientRect(), n = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, r = t.top + i, s = t.left + n;
      return {
        top: r,
        left: s,
        bottom: r + t.height,
        right: s + t.width
      };
    }
  };
  function nl(o) {
    return !/[^\t\n\r ]/.test(o);
  }
  function il(o) {
    const e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), r = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, d = (n - t) / 2;
    return s + r + i + d + a;
  }
  function sr(o) {
    o.dataset.empty = k.isEmpty(o) ? "true" : "false";
  }
  const rl = {
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
  }, sl = {
    Text: "",
    Link: "",
    Bold: "",
    Italic: ""
  }, al = {
    link: {
      "Add a link": ""
    },
    stub: {
      "The block can not be displayed correctly.": ""
    }
  }, ll = {
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
  }, ar = {
    ui: rl,
    toolNames: sl,
    tools: al,
    blockTunes: ll
  }, lr = class Je {
    static ui(e, t) {
      return Je._t(e, t);
    }
    static t(e, t) {
      return Je._t(e, t);
    }
    static setDictionary(e) {
      Je.currentDictionary = e;
    }
    static _t(e, t) {
      const n = Je.getNamespace(e);
      return !n || !n[t] ? t : n[t];
    }
    static getNamespace(e) {
      return e.split(".").reduce((t, n) => !t || !Object.keys(t).length ? {} : t[n], Je.currentDictionary);
    }
  };
  lr.currentDictionary = ar;
  let fe = lr;
  class cr extends Error {
  }
  let wt = class {
    constructor() {
      this.subscribers = {};
    }
    on(e, t) {
      e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
    }
    once(e, t) {
      e in this.subscribers || (this.subscribers[e] = []);
      const n = (i) => {
        const r = t(i), s = this.subscribers[e].indexOf(n);
        return s !== -1 && this.subscribers[e].splice(s, 1), r;
      };
      this.subscribers[e].push(n);
    }
    emit(e, t) {
      ke(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((n, i) => {
        const r = i(n);
        return r !== void 0 ? r : n;
      }, t);
    }
    off(e, t) {
      if (this.subscribers[e] === void 0) {
        console.warn(`EventDispatcher .off(): there is no subscribers for event "${e.toString()}". Probably, .off() called before .on()`);
        return;
      }
      for (let n = 0; n < this.subscribers[e].length; n++) if (this.subscribers[e][n] === t) {
        delete this.subscribers[e][n];
        break;
      }
    }
    destroy() {
      this.subscribers = {};
    }
  };
  function Oe(o) {
    Object.setPrototypeOf(this, {
      get id() {
        return o.id;
      },
      get name() {
        return o.name;
      },
      get config() {
        return o.config;
      },
      get holder() {
        return o.holder;
      },
      get isEmpty() {
        return o.isEmpty;
      },
      get selected() {
        return o.selected;
      },
      set stretched(e) {
        o.stretched = e;
      },
      get stretched() {
        return o.stretched;
      },
      get focusable() {
        return o.focusable;
      },
      call(e, t) {
        return o.call(e, t);
      },
      save() {
        return o.save();
      },
      validate(e) {
        return o.validate(e);
      },
      dispatchChange() {
        o.dispatchChange();
      },
      getActiveToolboxEntry() {
        return o.getActiveToolboxEntry();
      }
    });
  }
  let Et = class {
    constructor() {
      this.allListeners = [];
    }
    on(e, t, n, i = false) {
      const r = tl("l"), s = {
        id: r,
        element: e,
        eventType: t,
        handler: n,
        options: i
      };
      if (!this.findOne(e, t, n)) return this.allListeners.push(s), e.addEventListener(t, n, i), r;
    }
    off(e, t, n, i) {
      const r = this.findAll(e, t, n);
      r.forEach((s, a) => {
        const d = this.allListeners.indexOf(r[a]);
        d > -1 && (this.allListeners.splice(d, 1), s.element.removeEventListener(s.eventType, s.handler, s.options));
      });
    }
    offById(e) {
      const t = this.findById(e);
      t && t.element.removeEventListener(t.eventType, t.handler, t.options);
    }
    findOne(e, t, n) {
      const i = this.findAll(e, t, n);
      return i.length > 0 ? i[0] : null;
    }
    findAll(e, t, n) {
      let i;
      const r = e ? this.findByEventTarget(e) : [];
      return e && t && n ? i = r.filter((s) => s.eventType === t && s.handler === n) : e && t ? i = r.filter((s) => s.eventType === t) : i = r, i;
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
  };
  class j {
    constructor({ config: e, eventsDispatcher: t }) {
      if (this.nodes = {}, this.listeners = new Et(), this.readOnlyMutableListeners = {
        on: (n, i, r, s = false) => {
          this.mutableListenerIds.push(this.listeners.on(n, i, r, s));
        },
        clearAll: () => {
          for (const n of this.mutableListenerIds) this.listeners.offById(n);
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
  class O {
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
      return this.isSelectionAtEditor(O.get());
    }
    static isSelectionAtEditor(e) {
      if (!e) return false;
      let t = e.anchorNode || e.focusNode;
      t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
      let n = null;
      return t && t instanceof Element && (n = t.closest(`.${O.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : false;
    }
    static isRangeAtEditor(e) {
      if (!e) return;
      let t = e.startContainer;
      t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
      let n = null;
      return t && t instanceof Element && (n = t.closest(`.${O.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : false;
    }
    static get isSelectionExists() {
      return !!O.get().anchorNode;
    }
    static get range() {
      return this.getRangeFromSelection(this.get());
    }
    static getRangeFromSelection(e) {
      return e && e.rangeCount ? e.getRangeAt(0) : null;
    }
    static get rect() {
      let e = document.selection, t, n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      if (e && e.type !== "Control") return e = e, t = e.createRange(), n.x = t.boundingLeft, n.y = t.boundingTop, n.width = t.boundingWidth, n.height = t.boundingHeight, n;
      if (!window.getSelection) return W("Method window.getSelection is not supported", "warn"), n;
      if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount)) return W("Method SelectionUtils.rangeCount is not supported", "warn"), n;
      if (e.rangeCount === 0) return n;
      if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (n = t.getBoundingClientRect()), n.x === 0 && n.y === 0) {
        const i = document.createElement("span");
        if (i.getBoundingClientRect) {
          i.appendChild(document.createTextNode("\u200B")), t.insertNode(i), n = i.getBoundingClientRect();
          const r = i.parentNode;
          r.removeChild(i), r.normalize();
        }
      }
      return n;
    }
    static get text() {
      return window.getSelection ? window.getSelection().toString() : "";
    }
    static get() {
      return window.getSelection();
    }
    static setCursor(e, t = 0) {
      const n = document.createRange(), i = window.getSelection();
      return k.isNativeInput(e) ? k.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (n.setStart(e, t), n.setEnd(e, t), i.removeAllRanges(), i.addRange(n), n.getBoundingClientRect());
    }
    static isRangeInsideContainer(e) {
      const t = O.range;
      return t === null ? false : e.contains(t.startContainer);
    }
    static addFakeCursor() {
      const e = O.range;
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
      this.savedSelectionRange = O.range;
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
    findParentTag(e, t, n = 10) {
      const i = window.getSelection();
      let r = null;
      return !i || !i.anchorNode || !i.focusNode ? null : ([
        i.anchorNode,
        i.focusNode
      ].forEach((s) => {
        let a = n;
        for (; a > 0 && s.parentNode && !(s.tagName === e && (r = s, t && s.classList && !s.classList.contains(t) && (r = null), r)); ) s = s.parentNode, a--;
      }), r);
    }
    expandToTag(e) {
      const t = window.getSelection();
      t.removeAllRanges();
      const n = document.createRange();
      n.selectNodeContents(e), t.addRange(n);
    }
  }
  function cl(o, e) {
    const { type: t, target: n, addedNodes: i, removedNodes: r } = o;
    return o.type === "attributes" && o.attributeName === "data-empty" ? false : !!(e.contains(n) || t === "childList" && (Array.from(i).some((s) => s === e) || Array.from(r).some((s) => s === e)));
  }
  const _o = "redactor dom changed", dr = "block changed", ur = "fake cursor is about to be toggled", hr = "fake cursor have been set", vt = "editor mobile layout toggled";
  function So(o, e) {
    if (!o.conversionConfig) return false;
    const t = o.conversionConfig[e];
    return ee(t) || Ie(t);
  }
  function Rt(o, e) {
    return So(o.tool, e);
  }
  function pr(o, e) {
    return Object.entries(o).some(([t, n]) => e[t] && ol(e[t], n));
  }
  async function fr(o, e) {
    const t = (await o.save()).data, n = e.find((i) => i.name === o.name);
    return n !== void 0 && !So(n, "export") ? [] : e.reduce((i, r) => {
      if (!So(r, "import") || r.toolbox === void 0) return i;
      const s = r.toolbox.filter((a) => {
        if (ke(a) || a.icon === void 0) return false;
        if (a.data !== void 0) {
          if (pr(a.data, t)) return false;
        } else if (r.name === o.name) return false;
        return true;
      });
      return i.push({
        ...r,
        toolbox: s
      }), i;
    }, []);
  }
  function Mi(o, e) {
    return o.mergeable ? o.name === e.name ? true : Rt(e, "export") && Rt(o, "import") : false;
  }
  function dl(o, e) {
    const t = e == null ? void 0 : e.export;
    return ee(t) ? t(o) : Ie(t) ? o[t] : (t !== void 0 && W("Conversion \xABexport\xBB property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
  }
  function Ai(o, e, t) {
    const n = e == null ? void 0 : e.import;
    return ee(n) ? n(o, t) : Ie(n) ? {
      [n]: o
    } : (n !== void 0 && W("Conversion \xABimport\xBB property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
  }
  var Z = ((o) => (o.Default = "default", o.Separator = "separator", o.Html = "html", o))(Z || {}), Me = ((o) => (o.APPEND_CALLBACK = "appendCallback", o.RENDERED = "rendered", o.MOVED = "moved", o.UPDATED = "updated", o.REMOVED = "removed", o.ON_PASTE = "onPaste", o))(Me || {});
  let Ae = class Pe extends wt {
    constructor({ id: e = Ja(), data: t, tool: n, readOnly: i, tunesData: r }, s) {
      super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
        this.dropInputsCache(), this.updateCurrentInput();
      }, this.didMutated = (a = void 0) => {
        const d = a === void 0, u = a instanceof InputEvent;
        !d && !u && this.detectToolRootChange(a);
        let p;
        d || u ? p = true : p = !(a.length > 0 && a.every((v) => {
          const { addedNodes: b, removedNodes: w, target: y } = v;
          return [
            ...Array.from(b),
            ...Array.from(w),
            y
          ].some((T) => (k.isElement(T) || (T = T.parentElement), T && T.closest('[data-mutation-free="true"]') !== null));
        })), p && (this.dropInputsCache(), this.updateCurrentInput(), this.toggleInputsEmptyMark(), this.call("updated"), this.emit("didMutated", this));
      }, this.name = n.name, this.id = e, this.settings = n.settings, this.config = n.settings.config || {}, this.editorEventBus = s || null, this.blockAPI = new Oe(this), this.tool = n, this.toolInstance = n.create(t, this.blockAPI, i), this.tunes = n.tunes, this.composeTunes(r), this.holder = this.compose(), window.requestIdleCallback(() => {
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
      const t = this.inputs.findIndex((n) => n === e || n.contains(e));
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
      return this.save().then((e) => e && !ke(e.data) ? e.data : {});
    }
    get sanitize() {
      return this.tool.sanitizeConfig;
    }
    get mergeable() {
      return ee(this.toolInstance.merge);
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
      var t, n;
      this.holder.classList.toggle(Pe.CSS.selected, e);
      const i = e === true && O.isRangeInsideContainer(this.holder), r = e === false && O.isFakeCursorInsideContainer(this.holder);
      (i || r) && ((t = this.editorEventBus) == null || t.emit(ur, {
        state: e
      }), i ? O.addFakeCursor() : O.removeFakeCursor(this.holder), (n = this.editorEventBus) == null || n.emit(hr, {
        state: e
      }));
    }
    get selected() {
      return this.holder.classList.contains(Pe.CSS.selected);
    }
    set stretched(e) {
      this.holder.classList.toggle(Pe.CSS.wrapperStretched, e);
    }
    get stretched() {
      return this.holder.classList.contains(Pe.CSS.wrapperStretched);
    }
    set dropTarget(e) {
      this.holder.classList.toggle(Pe.CSS.dropTarget, e);
    }
    get pluginsContent() {
      return this.toolRenderedElement;
    }
    call(e, t) {
      if (ee(this.toolInstance[e])) {
        e === "appendCallback" && W("`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead", "warn");
        try {
          this.toolInstance[e].call(this.toolInstance, t);
        } catch (n) {
          W(`Error during '${e}' call: ${n.message}`, "error");
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
      ].forEach(([r, s]) => {
        if (ee(s.save)) try {
          t[r] = s.save();
        } catch (a) {
          W(`Tune ${s.constructor.name} save method throws an Error %o`, "warn", a);
        }
      });
      const n = window.performance.now();
      let i;
      return Promise.resolve(e).then((r) => (i = window.performance.now(), {
        id: this.id,
        tool: this.name,
        data: r,
        tunes: t,
        time: i - n
      })).catch((r) => {
        W(`Saving process for ${this.name} tool failed due to the ${r}`, "log", "red");
      });
    }
    async validate(e) {
      let t = true;
      return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
    }
    getTunes() {
      const e = [], t = [], n = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [];
      return k.isElement(n) ? e.push({
        type: Z.Html,
        element: n
      }) : Array.isArray(n) ? e.push(...n) : e.push(n), [
        ...this.tunesInstances.values(),
        ...this.defaultTunesInstances.values()
      ].map((i) => i.render()).forEach((i) => {
        k.isElement(i) ? t.push({
          type: Z.Html,
          element: i
        }) : Array.isArray(i) ? t.push(...i) : t.push(i);
      }), {
        toolTunes: e,
        commonTunes: t
      };
    }
    updateCurrentInput() {
      this.currentInput = k.isNativeInput(document.activeElement) || !O.anchorNode ? document.activeElement : O.anchorNode;
    }
    dispatchChange() {
      this.didMutated();
    }
    destroy() {
      this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), ee(this.toolInstance.destroy) && this.toolInstance.destroy();
    }
    async getActiveToolboxEntry() {
      const e = this.tool.toolbox;
      if (e.length === 1) return Promise.resolve(this.tool.toolbox[0]);
      const t = await this.data, n = e;
      return n == null ? void 0 : n.find((i) => pr(i.data, t));
    }
    async exportDataAsString() {
      const e = await this.data;
      return dl(e, this.tool.conversionConfig);
    }
    compose() {
      const e = k.make("div", Pe.CSS.wrapper), t = k.make("div", Pe.CSS.content), n = this.toolInstance.render();
      e.setAttribute("data-cy", "block-wrapper"), e.dataset.id = this.id, this.toolRenderedElement = n, t.appendChild(this.toolRenderedElement);
      let i = t;
      return [
        ...this.tunesInstances.values(),
        ...this.defaultTunesInstances.values()
      ].forEach((r) => {
        if (ee(r.wrap)) try {
          i = r.wrap(i);
        } catch (s) {
          W(`Tune ${r.constructor.name} wrap method throws an Error %o`, "warn", s);
        }
      }), e.appendChild(i), e;
    }
    composeTunes(e) {
      Array.from(this.tunes.values()).forEach((t) => {
        (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
      }), Object.entries(e).forEach(([t, n]) => {
        this.tunesInstances.has(t) || (this.unavailableTunesData[t] = n);
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
        const { mutations: n } = t;
        n.some((i) => cl(i, this.toolRenderedElement)) && this.didMutated(n);
      }, (e = this.editorEventBus) == null || e.on(_o, this.redactorDomChangedCallback);
    }
    unwatchBlockMutations() {
      var e;
      (e = this.editorEventBus) == null || e.off(_o, this.redactorDomChangedCallback);
    }
    detectToolRootChange(e) {
      e.forEach((t) => {
        if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
          const n = t.addedNodes[t.addedNodes.length - 1];
          this.toolRenderedElement = n;
        }
      });
    }
    dropInputsCache() {
      this.cachedInputs = [];
    }
    toggleInputsEmptyMark() {
      this.inputs.forEach(sr);
    }
  };
  class ul extends j {
    constructor() {
      super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, n = {}, i, r, s, a) => {
        const d = this.Editor.BlockManager.insert({
          id: a,
          tool: e,
          data: t,
          index: i,
          needToFocus: r,
          replace: s
        });
        return new Oe(d);
      }, this.composeBlockData = async (e) => {
        const t = this.Editor.Tools.blockTools.get(e);
        return new Ae({
          tool: t,
          api: this.Editor.API,
          readOnly: true,
          data: {},
          tunesData: {}
        }).data;
      }, this.update = async (e, t, n) => {
        const { BlockManager: i } = this.Editor, r = i.getBlockById(e);
        if (r === void 0) throw new Error(`Block with id "${e}" not found`);
        const s = await i.update(r, t, n);
        return new Oe(s);
      }, this.convert = async (e, t, n) => {
        var i, r;
        const { BlockManager: s, Tools: a } = this.Editor, d = s.getBlockById(e);
        if (!d) throw new Error(`Block with id "${e}" not found`);
        const u = a.blockTools.get(d.name), p = a.blockTools.get(t);
        if (!p) throw new Error(`Block Tool with type "${t}" not found`);
        const v = ((i = u == null ? void 0 : u.conversionConfig) == null ? void 0 : i.export) !== void 0, b = ((r = p.conversionConfig) == null ? void 0 : r.import) !== void 0;
        if (v && b) {
          const w = await s.convert(d, t, n);
          return new Oe(w);
        } else {
          const w = [
            v ? false : Dt(d.name),
            b ? false : Dt(t)
          ].filter(Boolean).join(" and ");
          throw new Error(`Conversion from "${d.name}" to "${t}" is not possible. ${w} tool(s) should provide a "conversionConfig"`);
        }
      }, this.insertMany = (e, t = this.Editor.BlockManager.blocks.length - 1) => {
        this.validateIndex(t);
        const n = e.map(({ id: i, type: r, data: s }) => this.Editor.BlockManager.composeBlock({
          id: i,
          tool: r || this.config.defaultBlock,
          data: s
        }));
        return this.Editor.BlockManager.insertMany(n, t), n.map((i) => new Oe(i));
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
        ye("There is no block with id `" + e + "`", "warn");
        return;
      }
      return this.Editor.BlockManager.getBlockIndex(t);
    }
    getBlockByIndex(e) {
      const t = this.Editor.BlockManager.getBlockByIndex(e);
      if (t === void 0) {
        ye("There is no block at index `" + e + "`", "warn");
        return;
      }
      return new Oe(t);
    }
    getById(e) {
      const t = this.Editor.BlockManager.getBlockById(e);
      return t === void 0 ? (ye("There is no block with id `" + e + "`", "warn"), null) : new Oe(t);
    }
    getBlockByElement(e) {
      const t = this.Editor.BlockManager.getBlock(e);
      if (t === void 0) {
        ye("There is no block corresponding to element `" + e + "`", "warn");
        return;
      }
      return new Oe(t);
    }
    swap(e, t) {
      W("`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead", "info"), this.Editor.BlockManager.swap(e, t);
    }
    move(e, t) {
      this.Editor.BlockManager.move(e, t);
    }
    delete(e = this.Editor.BlockManager.currentBlockIndex) {
      try {
        const t = this.Editor.BlockManager.getBlockByIndex(e);
        this.Editor.BlockManager.removeBlock(t);
      } catch (t) {
        ye(t, "warn");
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
      Co(true, "blocks.stretchBlock()", "BlockAPI");
      const n = this.Editor.BlockManager.getBlockByIndex(e);
      n && (n.stretched = t);
    }
    insertNewBlock() {
      W("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
    }
    validateIndex(e) {
      if (typeof e != "number") throw new Error("Index should be a number");
      if (e < 0) throw new Error("Index should be greater than or equal to 0");
      if (e === null) throw new Error("Index should be greater than or equal to 0");
    }
  }
  function hl(o, e) {
    return typeof o == "number" ? e.BlockManager.getBlockByIndex(o) : typeof o == "string" ? e.BlockManager.getBlockById(o) : e.BlockManager.getBlockById(o.id);
  }
  class pl extends j {
    constructor() {
      super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), true) : false, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), true) : false, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), true) : false, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), true) : false, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, n = 0) => {
        const i = hl(e, this.Editor);
        return i === void 0 ? false : (this.Editor.Caret.setToBlock(i, t, n), true);
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
  class fl extends j {
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
  class No extends j {
    static getNamespace(e, t) {
      return t ? `blockTunes.${e}` : `tools.${e}`;
    }
    get methods() {
      return {
        t: () => {
          ye("I18n.t() method can be accessed only from Tools", "warn");
        }
      };
    }
    getMethodsForTool(e, t) {
      return Object.assign(this.methods, {
        t: (n) => fe.t(No.getNamespace(e, t), n)
      });
    }
  }
  class gl extends j {
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
  class ml extends j {
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
  class vl extends j {
    get methods() {
      return {
        on: (e, t, n, i) => this.on(e, t, n, i),
        off: (e, t, n, i) => this.off(e, t, n, i),
        offById: (e) => this.offById(e)
      };
    }
    on(e, t, n, i) {
      return this.listeners.on(e, t, n, i);
    }
    off(e, t, n, i) {
      this.listeners.off(e, t, n, i);
    }
    offById(e) {
      this.listeners.offById(e);
    }
  }
  var gr = {
    exports: {}
  };
  (function(o, e) {
    (function(t, n) {
      o.exports = n();
    })(window, function() {
      return function(t) {
        var n = {};
        function i(r) {
          if (n[r]) return n[r].exports;
          var s = n[r] = {
            i: r,
            l: false,
            exports: {}
          };
          return t[r].call(s.exports, s, s.exports, i), s.l = true, s.exports;
        }
        return i.m = t, i.c = n, i.d = function(r, s, a) {
          i.o(r, s) || Object.defineProperty(r, s, {
            enumerable: true,
            get: a
          });
        }, i.r = function(r) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(r, "__esModule", {
            value: true
          });
        }, i.t = function(r, s) {
          if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule) return r;
          var a = /* @__PURE__ */ Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: true,
            value: r
          }), 2 & s && typeof r != "string") for (var d in r) i.d(a, d, (function(u) {
            return r[u];
          }).bind(null, d));
          return a;
        }, i.n = function(r) {
          var s = r && r.__esModule ? function() {
            return r.default;
          } : function() {
            return r;
          };
          return i.d(s, "a", s), s;
        }, i.o = function(r, s) {
          return Object.prototype.hasOwnProperty.call(r, s);
        }, i.p = "/", i(i.s = 0);
      }([
        function(t, n, i) {
          i(1), t.exports = function() {
            var r = i(6), s = "cdx-notify--bounce-in", a = null;
            return {
              show: function(d) {
                if (d.message) {
                  (function() {
                    if (a) return true;
                    a = r.getWrapper(), document.body.appendChild(a);
                  })();
                  var u = null, p = d.time || 8e3;
                  switch (d.type) {
                    case "confirm":
                      u = r.confirm(d);
                      break;
                    case "prompt":
                      u = r.prompt(d);
                      break;
                    default:
                      u = r.alert(d), window.setTimeout(function() {
                        u.remove();
                      }, p);
                  }
                  a.appendChild(u), u.classList.add(s);
                }
              }
            };
          }();
        },
        function(t, n, i) {
          var r = i(2);
          typeof r == "string" && (r = [
            [
              t.i,
              r,
              ""
            ]
          ]);
          var s = {
            hmr: true,
            transform: void 0,
            insertInto: void 0
          };
          i(4)(r, s), r.locals && (t.exports = r.locals);
        },
        function(t, n, i) {
          (t.exports = i(3)(false)).push([
            t.i,
            `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`,
            ""
          ]);
        },
        function(t, n) {
          t.exports = function(i) {
            var r = [];
            return r.toString = function() {
              return this.map(function(s) {
                var a = function(d, u) {
                  var p = d[1] || "", v = d[3];
                  if (!v) return p;
                  if (u && typeof btoa == "function") {
                    var b = (y = v, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(y)))) + " */"), w = v.sources.map(function(T) {
                      return "/*# sourceURL=" + v.sourceRoot + T + " */";
                    });
                    return [
                      p
                    ].concat(w).concat([
                      b
                    ]).join(`
`);
                  }
                  var y;
                  return [
                    p
                  ].join(`
`);
                }(s, i);
                return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
              }).join("");
            }, r.i = function(s, a) {
              typeof s == "string" && (s = [
                [
                  null,
                  s,
                  ""
                ]
              ]);
              for (var d = {}, u = 0; u < this.length; u++) {
                var p = this[u][0];
                typeof p == "number" && (d[p] = true);
              }
              for (u = 0; u < s.length; u++) {
                var v = s[u];
                typeof v[0] == "number" && d[v[0]] || (a && !v[2] ? v[2] = a : a && (v[2] = "(" + v[2] + ") and (" + a + ")"), r.push(v));
              }
            }, r;
          };
        },
        function(t, n, i) {
          var r, s, a = {}, d = (r = function() {
            return window && document && document.all && !window.atob;
          }, function() {
            return s === void 0 && (s = r.apply(this, arguments)), s;
          }), u = /* @__PURE__ */ function(M) {
            var _ = {};
            return function(N) {
              if (typeof N == "function") return N();
              if (_[N] === void 0) {
                var D = (function(Y) {
                  return document.querySelector(Y);
                }).call(this, N);
                if (window.HTMLIFrameElement && D instanceof window.HTMLIFrameElement) try {
                  D = D.contentDocument.head;
                } catch {
                  D = null;
                }
                _[N] = D;
              }
              return _[N];
            };
          }(), p = null, v = 0, b = [], w = i(5);
          function y(M, _) {
            for (var N = 0; N < M.length; N++) {
              var D = M[N], Y = a[D.id];
              if (Y) {
                Y.refs++;
                for (var V = 0; V < Y.parts.length; V++) Y.parts[V](D.parts[V]);
                for (; V < D.parts.length; V++) Y.parts.push(Q(D.parts[V], _));
              } else {
                var re = [];
                for (V = 0; V < D.parts.length; V++) re.push(Q(D.parts[V], _));
                a[D.id] = {
                  id: D.id,
                  refs: 1,
                  parts: re
                };
              }
            }
          }
          function T(M, _) {
            for (var N = [], D = {}, Y = 0; Y < M.length; Y++) {
              var V = M[Y], re = _.base ? V[0] + _.base : V[0], H = {
                css: V[1],
                media: V[2],
                sourceMap: V[3]
              };
              D[re] ? D[re].parts.push(H) : N.push(D[re] = {
                id: re,
                parts: [
                  H
                ]
              });
            }
            return N;
          }
          function q(M, _) {
            var N = u(M.insertInto);
            if (!N) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var D = b[b.length - 1];
            if (M.insertAt === "top") D ? D.nextSibling ? N.insertBefore(_, D.nextSibling) : N.appendChild(_) : N.insertBefore(_, N.firstChild), b.push(_);
            else if (M.insertAt === "bottom") N.appendChild(_);
            else {
              if (typeof M.insertAt != "object" || !M.insertAt.before) throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
              var Y = u(M.insertInto + " " + M.insertAt.before);
              N.insertBefore(_, Y);
            }
          }
          function U(M) {
            if (M.parentNode === null) return false;
            M.parentNode.removeChild(M);
            var _ = b.indexOf(M);
            _ >= 0 && b.splice(_, 1);
          }
          function z(M) {
            var _ = document.createElement("style");
            return M.attrs.type === void 0 && (M.attrs.type = "text/css"), ae(_, M.attrs), q(M, _), _;
          }
          function ae(M, _) {
            Object.keys(_).forEach(function(N) {
              M.setAttribute(N, _[N]);
            });
          }
          function Q(M, _) {
            var N, D, Y, V;
            if (_.transform && M.css) {
              if (!(V = _.transform(M.css))) return function() {
              };
              M.css = V;
            }
            if (_.singleton) {
              var re = v++;
              N = p || (p = z(_)), D = we.bind(null, N, re, false), Y = we.bind(null, N, re, true);
            } else M.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (N = function(H) {
              var ue = document.createElement("link");
              return H.attrs.type === void 0 && (H.attrs.type = "text/css"), H.attrs.rel = "stylesheet", ae(ue, H.attrs), q(H, ue), ue;
            }(_), D = (function(H, ue, Ee) {
              var Se = Ee.css, at = Ee.sourceMap, uo = ue.convertToAbsoluteUrls === void 0 && at;
              (ue.convertToAbsoluteUrls || uo) && (Se = w(Se)), at && (Se += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(at)))) + " */");
              var ho = new Blob([
                Se
              ], {
                type: "text/css"
              }), h = H.href;
              H.href = URL.createObjectURL(ho), h && URL.revokeObjectURL(h);
            }).bind(null, N, _), Y = function() {
              U(N), N.href && URL.revokeObjectURL(N.href);
            }) : (N = z(_), D = (function(H, ue) {
              var Ee = ue.css, Se = ue.media;
              if (Se && H.setAttribute("media", Se), H.styleSheet) H.styleSheet.cssText = Ee;
              else {
                for (; H.firstChild; ) H.removeChild(H.firstChild);
                H.appendChild(document.createTextNode(Ee));
              }
            }).bind(null, N), Y = function() {
              U(N);
            });
            return D(M), function(H) {
              if (H) {
                if (H.css === M.css && H.media === M.media && H.sourceMap === M.sourceMap) return;
                D(M = H);
              } else Y();
            };
          }
          t.exports = function(M, _) {
            if (typeof DEBUG < "u" && DEBUG && typeof document != "object") throw new Error("The style-loader cannot be used in a non-browser environment");
            (_ = _ || {}).attrs = typeof _.attrs == "object" ? _.attrs : {}, _.singleton || typeof _.singleton == "boolean" || (_.singleton = d()), _.insertInto || (_.insertInto = "head"), _.insertAt || (_.insertAt = "bottom");
            var N = T(M, _);
            return y(N, _), function(D) {
              for (var Y = [], V = 0; V < N.length; V++) {
                var re = N[V];
                (H = a[re.id]).refs--, Y.push(H);
              }
              for (D && y(T(D, _), _), V = 0; V < Y.length; V++) {
                var H;
                if ((H = Y[V]).refs === 0) {
                  for (var ue = 0; ue < H.parts.length; ue++) H.parts[ue]();
                  delete a[H.id];
                }
              }
            };
          };
          var G, oe = (G = [], function(M, _) {
            return G[M] = _, G.filter(Boolean).join(`
`);
          });
          function we(M, _, N, D) {
            var Y = N ? "" : D.css;
            if (M.styleSheet) M.styleSheet.cssText = oe(_, Y);
            else {
              var V = document.createTextNode(Y), re = M.childNodes;
              re[_] && M.removeChild(re[_]), re.length ? M.insertBefore(V, re[_]) : M.appendChild(V);
            }
          }
        },
        function(t, n) {
          t.exports = function(i) {
            var r = typeof window < "u" && window.location;
            if (!r) throw new Error("fixUrls requires window.location");
            if (!i || typeof i != "string") return i;
            var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
            return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(d, u) {
              var p, v = u.trim().replace(/^"(.*)"$/, function(b, w) {
                return w;
              }).replace(/^'(.*)'$/, function(b, w) {
                return w;
              });
              return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(v) ? d : (p = v.indexOf("//") === 0 ? v : v.indexOf("/") === 0 ? s + v : a + v.replace(/^\.\//, ""), "url(" + JSON.stringify(p) + ")");
            });
          };
        },
        function(t, n, i) {
          var r, s, a, d, u, p, v, b, w;
          t.exports = (r = "cdx-notifies", s = "cdx-notify", a = "cdx-notify__cross", d = "cdx-notify__button--confirm", u = "cdx-notify__button--cancel", p = "cdx-notify__input", v = "cdx-notify__button", b = "cdx-notify__btns-wrapper", {
            alert: w = function(y) {
              var T = document.createElement("DIV"), q = document.createElement("DIV"), U = y.message, z = y.style;
              return T.classList.add(s), z && T.classList.add(s + "--" + z), T.innerHTML = U, q.classList.add(a), q.addEventListener("click", T.remove.bind(T)), T.appendChild(q), T;
            },
            confirm: function(y) {
              var T = w(y), q = document.createElement("div"), U = document.createElement("button"), z = document.createElement("button"), ae = T.querySelector("." + a), Q = y.cancelHandler, G = y.okHandler;
              return q.classList.add(b), U.innerHTML = y.okText || "Confirm", z.innerHTML = y.cancelText || "Cancel", U.classList.add(v), z.classList.add(v), U.classList.add(d), z.classList.add(u), Q && typeof Q == "function" && (z.addEventListener("click", Q), ae.addEventListener("click", Q)), G && typeof G == "function" && U.addEventListener("click", G), U.addEventListener("click", T.remove.bind(T)), z.addEventListener("click", T.remove.bind(T)), q.appendChild(U), q.appendChild(z), T.appendChild(q), T;
            },
            prompt: function(y) {
              var T = w(y), q = document.createElement("div"), U = document.createElement("button"), z = document.createElement("input"), ae = T.querySelector("." + a), Q = y.cancelHandler, G = y.okHandler;
              return q.classList.add(b), U.innerHTML = y.okText || "Ok", U.classList.add(v), U.classList.add(d), z.classList.add(p), y.placeholder && z.setAttribute("placeholder", y.placeholder), y.default && (z.value = y.default), y.inputType && (z.type = y.inputType), Q && typeof Q == "function" && ae.addEventListener("click", Q), G && typeof G == "function" && U.addEventListener("click", function() {
                G(z.value);
              }), U.addEventListener("click", T.remove.bind(T)), q.appendChild(z), q.appendChild(U), T.appendChild(q), T;
            },
            getWrapper: function() {
              var y = document.createElement("DIV");
              return y.classList.add(r), y;
            }
          });
        }
      ]);
    });
  })(gr);
  var bl = gr.exports;
  const yl = Yt(bl);
  class kl {
    show(e) {
      yl.show(e);
    }
  }
  class wl extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.notifier = new kl();
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
  class El extends j {
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
  var mr = {
    exports: {}
  };
  (function(o, e) {
    (function(t, n) {
      o.exports = n();
    })(mt, function() {
      function t(v) {
        var b = v.tags, w = Object.keys(b), y = w.map(function(T) {
          return typeof b[T];
        }).every(function(T) {
          return T === "object" || T === "boolean" || T === "function";
        });
        if (!y) throw new Error("The configuration was invalid");
        this.config = v;
      }
      var n = [
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
        return n.indexOf(v.nodeName) !== -1;
      }
      var r = [
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
      function s(v) {
        return r.indexOf(v.nodeName) !== -1;
      }
      t.prototype.clean = function(v) {
        const b = document.implementation.createHTMLDocument(), w = b.createElement("div");
        return w.innerHTML = v, this._sanitize(b, w), w.innerHTML;
      }, t.prototype._sanitize = function(v, b) {
        var w = a(v, b), y = w.firstChild();
        if (y) do {
          if (y.nodeType === Node.TEXT_NODE) if (y.data.trim() === "" && (y.previousElementSibling && i(y.previousElementSibling) || y.nextElementSibling && i(y.nextElementSibling))) {
            b.removeChild(y), this._sanitize(v, b);
            break;
          } else continue;
          if (y.nodeType === Node.COMMENT_NODE) {
            b.removeChild(y), this._sanitize(v, b);
            break;
          }
          var T = s(y), q;
          T && (q = Array.prototype.some.call(y.childNodes, i));
          var U = !!b.parentNode, z = i(b) && i(y) && U, ae = y.nodeName.toLowerCase(), Q = d(this.config, ae, y), G = T && q;
          if (G || u(y, Q) || !this.config.keepNestedBlockElements && z) {
            if (!(y.nodeName === "SCRIPT" || y.nodeName === "STYLE")) for (; y.childNodes.length > 0; ) b.insertBefore(y.childNodes[0], y);
            b.removeChild(y), this._sanitize(v, b);
            break;
          }
          for (var oe = 0; oe < y.attributes.length; oe += 1) {
            var we = y.attributes[oe];
            p(we, Q, y) && (y.removeAttribute(we.name), oe = oe - 1);
          }
          this._sanitize(v, y);
        } while (y = w.nextSibling());
      };
      function a(v, b) {
        return v.createTreeWalker(b, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, null, false);
      }
      function d(v, b, w) {
        return typeof v.tags[b] == "function" ? v.tags[b](w) : v.tags[b];
      }
      function u(v, b) {
        return typeof b > "u" ? true : typeof b == "boolean" ? !b : false;
      }
      function p(v, b, w) {
        var y = v.name.toLowerCase();
        return b === true ? false : typeof b[y] == "function" ? !b[y](v.value, w) : typeof b[y] > "u" || b[y] === false ? true : typeof b[y] == "string" ? b[y] !== v.value : false;
      }
      return t;
    });
  })(mr);
  var xl = mr.exports;
  const Cl = Yt(xl);
  function Lo(o, e) {
    return o.map((t) => {
      const n = ee(e) ? e(t.tool) : e;
      return ke(n) || (t.data = Do(t.data, n)), t;
    });
  }
  function Te(o, e = {}) {
    const t = {
      tags: e
    };
    return new Cl(t).clean(o);
  }
  function Do(o, e) {
    return Array.isArray(o) ? Tl(o, e) : ce(o) ? _l(o, e) : Ie(o) ? Sl(o, e) : o;
  }
  function Tl(o, e) {
    return o.map((t) => Do(t, e));
  }
  function _l(o, e) {
    const t = {};
    for (const n in o) {
      if (!Object.prototype.hasOwnProperty.call(o, n)) continue;
      const i = o[n], r = Bl(e[n]) ? e[n] : e;
      t[n] = Do(i, r);
    }
    return t;
  }
  function Sl(o, e) {
    return ce(e) ? Te(o, e) : e === false ? Te(o, {}) : o;
  }
  function Bl(o) {
    return ce(o) || Ya(o) || ee(o);
  }
  class Ol extends j {
    get methods() {
      return {
        clean: (e, t) => this.clean(e, t)
      };
    }
    clean(e, t) {
      return Te(e, t);
    }
  }
  class Ml extends j {
    get methods() {
      return {
        save: () => this.save()
      };
    }
    save() {
      const e = "Editor's content can not be saved in read-only mode";
      return this.Editor.ReadOnly.isEnabled ? (ye(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
    }
  }
  class Al extends j {
    constructor() {
      super(...arguments), this.selectionUtils = new O();
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
  class Il extends j {
    get methods() {
      return {
        getBlockTools: () => Array.from(this.Editor.Tools.blockTools.values())
      };
    }
  }
  class Pl extends j {
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
  class Nl extends j {
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
        ye("Could't toggle the Toolbar because there is no block selected ", "warn");
        return;
      }
      e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
    }
    toggleToolbox(e) {
      if (this.Editor.BlockManager.currentBlockIndex === -1) {
        ye("Could't toggle the Toolbox because there is no block selected ", "warn");
        return;
      }
      e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
    }
  }
  var vr = {
    exports: {}
  };
  (function(o, e) {
    (function(t, n) {
      o.exports = n();
    })(window, function() {
      return function(t) {
        var n = {};
        function i(r) {
          if (n[r]) return n[r].exports;
          var s = n[r] = {
            i: r,
            l: false,
            exports: {}
          };
          return t[r].call(s.exports, s, s.exports, i), s.l = true, s.exports;
        }
        return i.m = t, i.c = n, i.d = function(r, s, a) {
          i.o(r, s) || Object.defineProperty(r, s, {
            enumerable: true,
            get: a
          });
        }, i.r = function(r) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(r, "__esModule", {
            value: true
          });
        }, i.t = function(r, s) {
          if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule) return r;
          var a = /* @__PURE__ */ Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: true,
            value: r
          }), 2 & s && typeof r != "string") for (var d in r) i.d(a, d, (function(u) {
            return r[u];
          }).bind(null, d));
          return a;
        }, i.n = function(r) {
          var s = r && r.__esModule ? function() {
            return r.default;
          } : function() {
            return r;
          };
          return i.d(s, "a", s), s;
        }, i.o = function(r, s) {
          return Object.prototype.hasOwnProperty.call(r, s);
        }, i.p = "", i(i.s = 0);
      }([
        function(t, n, i) {
          t.exports = i(1);
        },
        function(t, n, i) {
          i.r(n), i.d(n, "default", function() {
            return r;
          });
          class r {
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
            show(a, d, u) {
              this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
              const p = Object.assign({
                placement: "bottom",
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                delay: 70,
                hidingDelay: 0
              }, u);
              if (p.hidingDelay && (this.hidingDelay = p.hidingDelay), this.nodes.content.innerHTML = "", typeof d == "string") this.nodes.content.appendChild(document.createTextNode(d));
              else {
                if (!(d instanceof Node)) throw Error("[CodeX Tooltip] Wrong type of \xABcontent\xBB passed. It should be an instance of Node or String. But " + typeof d + " given.");
                this.nodes.content.appendChild(d);
              }
              switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), p.placement) {
                case "top":
                  this.placeTop(a, p);
                  break;
                case "left":
                  this.placeLeft(a, p);
                  break;
                case "right":
                  this.placeRight(a, p);
                  break;
                case "bottom":
                default:
                  this.placeBottom(a, p);
              }
              p && p.delay ? this.showingTimeout = setTimeout(() => {
                this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true;
              }, p.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true);
            }
            hide(a = false) {
              if (this.hidingDelay && !a) return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
                this.hide(true);
              }, this.hidingDelay));
              this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = false, this.showingTimeout && clearTimeout(this.showingTimeout);
            }
            onHover(a, d, u) {
              a.addEventListener("mouseenter", () => {
                this.show(a, d, u);
              }), a.addEventListener("mouseleave", () => {
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
              const a = "codex-tooltips-style";
              if (document.getElementById(a)) return;
              const d = i(2), u = this.make("style", null, {
                textContent: d.toString(),
                id: a
              });
              this.prepend(document.head, u);
            }
            placeBottom(a, d) {
              const u = a.getBoundingClientRect(), p = u.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, v = u.bottom + window.pageYOffset + this.offsetTop + d.marginTop;
              this.applyPlacement("bottom", p, v);
            }
            placeTop(a, d) {
              const u = a.getBoundingClientRect(), p = u.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, v = u.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
              this.applyPlacement("top", p, v);
            }
            placeLeft(a, d) {
              const u = a.getBoundingClientRect(), p = u.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - d.marginLeft, v = u.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("left", p, v);
            }
            placeRight(a, d) {
              const u = a.getBoundingClientRect(), p = u.right + this.offsetRight + d.marginRight, v = u.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("right", p, v);
            }
            applyPlacement(a, d, u) {
              this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = d + "px", this.nodes.wrapper.style.top = u + "px";
            }
            make(a, d = null, u = {}) {
              const p = document.createElement(a);
              Array.isArray(d) ? p.classList.add(...d) : d && p.classList.add(d);
              for (const v in u) u.hasOwnProperty(v) && (p[v] = u[v]);
              return p;
            }
            append(a, d) {
              Array.isArray(d) ? d.forEach((u) => a.appendChild(u)) : a.appendChild(d);
            }
            prepend(a, d) {
              Array.isArray(d) ? (d = d.reverse()).forEach((u) => a.prepend(u)) : a.prepend(d);
            }
          }
        },
        function(t, n) {
          t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
        }
      ]).default;
    });
  })(vr);
  var Ll = vr.exports;
  const Dl = Yt(Ll);
  let xe = null;
  function Ro() {
    xe || (xe = new Dl());
  }
  function Rl(o, e, t) {
    Ro(), xe == null ? void 0 : xe.show(o, e, t);
  }
  function jt(o = false) {
    Ro(), xe == null ? void 0 : xe.hide(o);
  }
  function Ht(o, e, t) {
    Ro(), xe == null ? void 0 : xe.onHover(o, e, t);
  }
  function jl() {
    xe == null ? void 0 : xe.destroy(), xe = null;
  }
  class Hl extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      });
    }
    get methods() {
      return {
        show: (e, t, n) => this.show(e, t, n),
        hide: () => this.hide(),
        onHover: (e, t, n) => this.onHover(e, t, n)
      };
    }
    show(e, t, n) {
      Rl(e, t, n);
    }
    hide() {
      jt();
    }
    onHover(e, t, n) {
      Ht(e, t, n);
    }
  }
  class Fl extends j {
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
  function br(o, e) {
    const t = {};
    return Object.entries(o).forEach(([n, i]) => {
      if (ce(i)) {
        const r = e ? `${e}.${n}` : n;
        Object.values(i).every((s) => Ie(s)) ? t[n] = r : t[n] = br(i, r);
        return;
      }
      t[n] = i;
    }), t;
  }
  const be = br(ar);
  function $l(o, e) {
    const t = {};
    return Object.keys(o).forEach((n) => {
      const i = e[n];
      i !== void 0 ? t[i] = o[n] : t[n] = o[n];
    }), t;
  }
  const yr = class ht {
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
      this.cursor = this.leafNodesAndReturnIndex(ht.directions.RIGHT);
    }
    previous() {
      this.cursor = this.leafNodesAndReturnIndex(ht.directions.LEFT);
    }
    dropCursor() {
      this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
    }
    leafNodesAndReturnIndex(e) {
      if (this.items.length === 0) return this.cursor;
      let t = this.cursor;
      return t === -1 ? t = e === ht.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), e === ht.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, k.canSetCaret(this.items[t]) && Lt(() => O.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
    }
  };
  yr.directions = {
    RIGHT: "right",
    LEFT: "left"
  };
  let ct = yr, Ft = class Bo {
    constructor(e) {
      this.iterator = null, this.activated = false, this.flipCallbacks = [], this.onKeyDown = (t) => {
        if (this.isEventReadyForHandling(t)) switch (Bo.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case L.TAB:
            this.handleTabPress(t);
            break;
          case L.LEFT:
          case L.UP:
            this.flipLeft();
            break;
          case L.RIGHT:
          case L.DOWN:
            this.flipRight();
            break;
          case L.ENTER:
            this.handleEnterPress(t);
            break;
        }
      }, this.iterator = new ct(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || Bo.usedKeys;
    }
    get isActivated() {
      return this.activated;
    }
    static get usedKeys() {
      return [
        L.TAB,
        L.LEFT,
        L.RIGHT,
        L.ENTER,
        L.UP,
        L.DOWN
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
      switch (e.shiftKey ? ct.directions.LEFT : ct.directions.RIGHT) {
        case ct.directions.RIGHT:
          this.flipRight();
          break;
        case ct.directions.LEFT:
          this.flipLeft();
          break;
      }
    }
    handleEnterPress(e) {
      this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), ee(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
    }
    flipCallback() {
      this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
    }
  };
  const Vl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', Ul = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', zl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.5 17.5L9.64142 12.6414C9.56331 12.5633 9.56331 12.4367 9.64142 12.3586L14.5 7.5"/></svg>', ql = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.58284 17.5L14.4414 12.6414C14.5195 12.5633 14.5195 12.4367 14.4414 12.3586L9.58284 7.5"/></svg>', Wl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', Yl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', Xl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', Kl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', Ii = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', Gl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', Zl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', kr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11.5 17.5L5 11M5 11V15.5M5 11H9.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12.5 6.5L19 13M19 13V8.5M19 13H14.5"/></svg>', Ql = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', Jl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', ec = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>', tc = "__", oc = "--";
  function He(o) {
    return (e, t) => [
      [
        o,
        e
      ].filter((n) => !!n).join(tc),
      t
    ].filter((n) => !!n).join(oc);
  }
  const dt = He("ce-hint"), ut = {
    root: dt(),
    alignedStart: dt(null, "align-left"),
    alignedCenter: dt(null, "align-center"),
    title: dt("title"),
    description: dt("description")
  };
  class nc {
    constructor(e) {
      this.nodes = {
        root: k.make("div", [
          ut.root,
          e.alignment === "center" ? ut.alignedCenter : ut.alignedStart
        ]),
        title: k.make("div", ut.title, {
          textContent: e.title
        })
      }, this.nodes.root.appendChild(this.nodes.title), e.description !== void 0 && (this.nodes.description = k.make("div", ut.description, {
        textContent: e.description
      }), this.nodes.root.appendChild(this.nodes.description));
    }
    getElement() {
      return this.nodes.root;
    }
  }
  let jo = class {
    constructor(e) {
      this.params = e;
    }
    get name() {
      if (this.params !== void 0 && "name" in this.params) return this.params.name;
    }
    destroy() {
      jt();
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
      const n = new nc(t);
      Ht(e, n.getElement(), {
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
  };
  const ve = He("ce-popover-item"), te = {
    container: ve(),
    active: ve(null, "active"),
    disabled: ve(null, "disabled"),
    focused: ve(null, "focused"),
    hidden: ve(null, "hidden"),
    confirmationState: ve(null, "confirmation"),
    noHover: ve(null, "no-hover"),
    noFocus: ve(null, "no-focus"),
    title: ve("title"),
    secondaryTitle: ve("secondary-title"),
    icon: ve("icon"),
    iconTool: ve("icon", "tool"),
    iconChevronRight: ve("icon", "chevron-right"),
    wobbleAnimation: He("wobble")()
  };
  let Ve = class extends jo {
    constructor(e, t) {
      super(e), this.params = e, this.nodes = {
        root: null,
        icon: null
      }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
        var n;
        (n = this.nodes.root) == null || n.classList.remove(te.noFocus);
      }, this.removeSpecialHoverBehavior = () => {
        var n;
        (n = this.nodes.root) == null || n.classList.remove(te.noHover);
      }, this.onErrorAnimationEnd = () => {
        var n, i;
        (n = this.nodes.icon) == null || n.classList.remove(te.wobbleAnimation), (i = this.nodes.icon) == null || i.removeEventListener("animationend", this.onErrorAnimationEnd);
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
      return this.nodes.root === null ? false : this.nodes.root.classList.contains(te.focused);
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
      (t = this.nodes.root) == null || t.classList.toggle(te.active, e);
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(te.hidden, e);
    }
    reset() {
      this.isConfirmationStateEnabled && this.disableConfirmationMode();
    }
    onFocus() {
      this.disableSpecialHoverAndFocusBehavior();
    }
    make(e, t) {
      var n, i;
      const r = (t == null ? void 0 : t.wrapperTag) || "div", s = k.make(r, te.container, {
        type: r === "button" ? "button" : void 0
      });
      return e.name && (s.dataset.itemName = e.name), this.nodes.icon = k.make("div", [
        te.icon,
        te.iconTool
      ], {
        innerHTML: e.icon || Xl
      }), s.appendChild(this.nodes.icon), e.title !== void 0 && s.appendChild(k.make("div", te.title, {
        innerHTML: e.title || ""
      })), e.secondaryLabel && s.appendChild(k.make("div", te.secondaryTitle, {
        textContent: e.secondaryLabel
      })), this.hasChildren && s.appendChild(k.make("div", [
        te.icon,
        te.iconChevronRight
      ], {
        innerHTML: ql
      })), this.isActive && s.classList.add(te.active), e.isDisabled && s.classList.add(te.disabled), e.hint !== void 0 && ((n = t == null ? void 0 : t.hint) == null ? void 0 : n.enabled) !== false && this.addHint(s, {
        ...e.hint,
        position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
      }), s;
    }
    enableConfirmationMode(e) {
      if (this.nodes.root === null) return;
      const t = {
        ...this.params,
        ...e,
        confirmation: "confirmation" in e ? e.confirmation : void 0
      }, n = this.make(t);
      this.nodes.root.innerHTML = n.innerHTML, this.nodes.root.classList.add(te.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
    }
    disableConfirmationMode() {
      if (this.nodes.root === null) return;
      const e = this.make(this.params);
      this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(te.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
    }
    enableSpecialHoverAndFocusBehavior() {
      var e, t, n;
      (e = this.nodes.root) == null || e.classList.add(te.noHover), (t = this.nodes.root) == null || t.classList.add(te.noFocus), (n = this.nodes.root) == null || n.addEventListener("mouseleave", this.removeSpecialHoverBehavior, {
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
      var e, t, n;
      (e = this.nodes.icon) != null && e.classList.contains(te.wobbleAnimation) || ((t = this.nodes.icon) == null || t.classList.add(te.wobbleAnimation), (n = this.nodes.icon) == null || n.addEventListener("animationend", this.onErrorAnimationEnd));
    }
  };
  const go = He("ce-popover-item-separator"), mo = {
    container: go(),
    line: go("line"),
    hidden: go(null, "hidden")
  };
  class wr extends jo {
    constructor() {
      super(), this.nodes = {
        root: k.make("div", mo.container),
        line: k.make("div", mo.line)
      }, this.nodes.root.appendChild(this.nodes.line);
    }
    getElement() {
      return this.nodes.root;
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(mo.hidden, e);
    }
  }
  var _e = ((o) => (o.Closed = "closed", o.ClosedOnActivate = "closed-on-activate", o))(_e || {});
  const he = He("ce-popover"), ne = {
    popover: he(),
    popoverContainer: he("container"),
    popoverOpenTop: he(null, "open-top"),
    popoverOpenLeft: he(null, "open-left"),
    popoverOpened: he(null, "opened"),
    search: he("search"),
    nothingFoundMessage: he("nothing-found-message"),
    nothingFoundMessageDisplayed: he("nothing-found-message", "displayed"),
    items: he("items"),
    overlay: he("overlay"),
    overlayHidden: he("overlay", "hidden"),
    popoverNested: he(null, "nested"),
    getPopoverNestedClass: (o) => he(null, `nested-level-${o.toString()}`),
    popoverInline: he(null, "inline"),
    popoverHeader: he("header")
  };
  var nt = ((o) => (o.NestingLevel = "--nesting-level", o.PopoverHeight = "--popover-height", o.InlinePopoverWidth = "--inline-popover-width", o.TriggerItemLeft = "--trigger-item-left", o.TriggerItemTop = "--trigger-item-top", o))(nt || {});
  const Pi = He("ce-popover-item-html"), Ni = {
    root: Pi(),
    hidden: Pi(null, "hidden")
  };
  let bt = class extends jo {
    constructor(e, t) {
      var n, i;
      super(e), this.nodes = {
        root: k.make("div", Ni.root)
      }, this.nodes.root.appendChild(e.element), e.name && (this.nodes.root.dataset.itemName = e.name), e.hint !== void 0 && ((n = t == null ? void 0 : t.hint) == null ? void 0 : n.enabled) !== false && this.addHint(this.nodes.root, {
        ...e.hint,
        position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
      });
    }
    getElement() {
      return this.nodes.root;
    }
    toggleHidden(e) {
      var t;
      (t = this.nodes.root) == null || t.classList.toggle(Ni.hidden, e);
    }
    getControls() {
      const e = this.nodes.root.querySelectorAll(`button, ${k.allInputsSelector}`);
      return Array.from(e);
    }
  };
  class Er extends wt {
    constructor(e, t = {}) {
      super(), this.params = e, this.itemsRenderParams = t, this.listeners = new Et(), this.messages = {
        nothingFound: "Nothing found",
        search: "Search"
      }, this.items = this.buildItems(e.items), e.messages && (this.messages = {
        ...this.messages,
        ...e.messages
      }), this.nodes = {}, this.nodes.popoverContainer = k.make("div", [
        ne.popoverContainer
      ]), this.nodes.nothingFoundMessage = k.make("div", [
        ne.nothingFoundMessage
      ], {
        textContent: this.messages.nothingFound
      }), this.nodes.popoverContainer.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = k.make("div", [
        ne.items
      ]), this.items.forEach((n) => {
        const i = n.getElement();
        i !== null && this.nodes.items.appendChild(i);
      }), this.nodes.popoverContainer.appendChild(this.nodes.items), this.listeners.on(this.nodes.popoverContainer, "click", (n) => this.handleClick(n)), this.nodes.popover = k.make("div", [
        ne.popover,
        this.params.class
      ]), this.nodes.popover.appendChild(this.nodes.popoverContainer);
    }
    get itemsDefault() {
      return this.items.filter((e) => e instanceof Ve);
    }
    getElement() {
      return this.nodes.popover;
    }
    show() {
      this.nodes.popover.classList.add(ne.popoverOpened), this.search !== void 0 && this.search.focus();
    }
    hide() {
      this.nodes.popover.classList.remove(ne.popoverOpened), this.nodes.popover.classList.remove(ne.popoverOpenTop), this.itemsDefault.forEach((e) => e.reset()), this.search !== void 0 && this.search.clear(), this.emit(_e.Closed);
    }
    destroy() {
      var e;
      this.items.forEach((t) => t.destroy()), this.nodes.popover.remove(), this.listeners.removeAll(), (e = this.search) == null || e.destroy();
    }
    activateItemByName(e) {
      const t = this.items.find((n) => n.name === e);
      this.handleItemClick(t);
    }
    buildItems(e) {
      return e.map((t) => {
        switch (t.type) {
          case Z.Separator:
            return new wr();
          case Z.Html:
            return new bt(t, this.itemsRenderParams[Z.Html]);
          default:
            return new Ve(t, this.itemsRenderParams[Z.Default]);
        }
      });
    }
    getTargetItem(e) {
      return this.items.filter((t) => t instanceof Ve || t instanceof bt).find((t) => {
        const n = t.getElement();
        return n === null ? false : e.composedPath().includes(n);
      });
    }
    handleItemClick(e) {
      if (!("isDisabled" in e && e.isDisabled)) {
        if (e.hasChildren) {
          this.showNestedItems(e), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick();
          return;
        }
        this.itemsDefault.filter((t) => t !== e).forEach((t) => t.reset()), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick(), this.toggleItemActivenessIfNeeded(e), e.closeOnActivate && (this.hide(), this.emit(_e.ClosedOnActivate));
      }
    }
    handleClick(e) {
      const t = this.getTargetItem(e);
      t !== void 0 && this.handleItemClick(t);
    }
    toggleItemActivenessIfNeeded(e) {
      if (e instanceof Ve && (e.toggle === true && e.toggleActive(), typeof e.toggle == "string")) {
        const t = this.itemsDefault.filter((n) => n.toggle === e.toggle);
        if (t.length === 1) {
          e.toggleActive();
          return;
        }
        t.forEach((n) => {
          n.toggleActive(n === e);
        });
      }
    }
  }
  var $t = ((o) => (o.Search = "search", o))($t || {});
  const vo = He("cdx-search-field"), bo = {
    wrapper: vo(),
    icon: vo("icon"),
    input: vo("input")
  };
  class ic extends wt {
    constructor({ items: e, placeholder: t }) {
      super(), this.listeners = new Et(), this.items = e, this.wrapper = k.make("div", bo.wrapper);
      const n = k.make("div", bo.icon, {
        innerHTML: Ql
      });
      this.input = k.make("input", bo.input, {
        placeholder: t,
        tabIndex: -1
      }), this.wrapper.appendChild(n), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
        this.searchQuery = this.input.value, this.emit($t.Search, {
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
      this.input.value = "", this.searchQuery = "", this.emit($t.Search, {
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
      var t, n;
      const i = ((t = e.title) == null ? void 0 : t.toLowerCase()) || "", r = (n = this.searchQuery) == null ? void 0 : n.toLowerCase();
      return r !== void 0 ? i.includes(r) : false;
    }
  }
  var rc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, ac = (o, e, t, n) => {
    for (var i = sc(e, t), r = o.length - 1, s; r >= 0; r--) (s = o[r]) && (i = s(e, t, i) || i);
    return i && rc(e, t, i), i;
  };
  const xr = class Cr extends Er {
    constructor(e, t) {
      super(e, t), this.nestingLevel = 0, this.nestedPopoverTriggerItem = null, this.previouslyHoveredItem = null, this.scopeElement = document.body, this.hide = () => {
        var n;
        super.hide(), this.destroyNestedPopoverIfExists(), (n = this.flipper) == null || n.deactivate(), this.previouslyHoveredItem = null;
      }, this.onFlip = () => {
        const n = this.itemsDefault.find((i) => i.isFocused);
        n == null ? void 0 : n.onFocus();
      }, this.onSearch = (n) => {
        var i;
        const r = n.query === "", s = n.items.length === 0;
        this.items.forEach((d) => {
          let u = false;
          d instanceof Ve ? u = !n.items.includes(d) : (d instanceof wr || d instanceof bt) && (u = s || !r), d.toggleHidden(u);
        }), this.toggleNothingFoundMessage(s);
        const a = n.query === "" ? this.flippableElements : n.items.map((d) => d.getElement());
        (i = this.flipper) != null && i.isActivated && (this.flipper.deactivate(), this.flipper.activate(a));
      }, e.nestingLevel !== void 0 && (this.nestingLevel = e.nestingLevel), this.nestingLevel > 0 && this.nodes.popover.classList.add(ne.popoverNested), e.scopeElement !== void 0 && (this.scopeElement = e.scopeElement), this.nodes.popoverContainer !== null && this.listeners.on(this.nodes.popoverContainer, "mouseover", (n) => this.handleHover(n)), e.searchable && this.addSearch(), e.flippable !== false && (this.flipper = new Ft({
        items: this.flippableElements,
        focusedItemClass: te.focused,
        allowedKeys: [
          L.TAB,
          L.UP,
          L.DOWN,
          L.ENTER
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
      this.nodes.popover.style.setProperty(nt.PopoverHeight, this.size.height + "px"), this.shouldOpenBottom || this.nodes.popover.classList.add(ne.popoverOpenTop), this.shouldOpenRight || this.nodes.popover.classList.add(ne.popoverOpenLeft), super.show(), (e = this.flipper) == null || e.activate(this.flippableElements);
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
      const n = t.getElement(), i = (n ? n.offsetTop : 0) - this.scrollTop, r = this.offsetTop + i;
      e.style.setProperty(nt.TriggerItemTop, r + "px");
    }
    destroyNestedPopoverIfExists() {
      var e, t;
      this.nestedPopover === void 0 || this.nestedPopover === null || (this.nestedPopover.off(_e.ClosedOnActivate, this.hide), this.nestedPopover.hide(), this.nestedPopover.destroy(), this.nestedPopover.getElement().remove(), this.nestedPopover = null, (e = this.flipper) == null || e.activate(this.flippableElements), (t = this.nestedPopoverTriggerItem) == null || t.onChildrenClose());
    }
    showNestedPopoverForItem(e) {
      var t;
      this.nestedPopover = new Cr({
        searchable: e.isChildrenSearchable,
        items: e.children,
        nestingLevel: this.nestingLevel + 1,
        flippable: e.isChildrenFlippable,
        messages: this.messages
      }), e.onChildrenOpen(), this.nestedPopover.on(_e.ClosedOnActivate, this.hide);
      const n = this.nestedPopover.getElement();
      return this.nodes.popover.appendChild(n), this.setTriggerItemPosition(n, e), n.style.setProperty(nt.NestingLevel, this.nestedPopover.nestingLevel.toString()), this.nestedPopover.show(), (t = this.flipper) == null || t.deactivate(), this.nestedPopover;
    }
    get shouldOpenBottom() {
      if (this.nodes.popover === void 0 || this.nodes.popover === null) return false;
      const e = this.nodes.popoverContainer.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), n = this.size.height, i = e.top + n, r = e.top - n, s = Math.min(window.innerHeight, t.bottom);
      return r < t.top || i <= s;
    }
    get shouldOpenRight() {
      if (this.nodes.popover === void 0 || this.nodes.popover === null) return false;
      const e = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), n = this.size.width, i = e.right + n, r = e.left - n, s = Math.min(window.innerWidth, t.right);
      return r < t.left || i <= s;
    }
    get size() {
      var e;
      const t = {
        height: 0,
        width: 0
      };
      if (this.nodes.popover === null) return t;
      const n = this.nodes.popover.cloneNode(true);
      n.style.visibility = "hidden", n.style.position = "absolute", n.style.top = "-1000px", n.classList.add(ne.popoverOpened), (e = n.querySelector("." + ne.popoverNested)) == null || e.remove(), document.body.appendChild(n);
      const i = n.querySelector("." + ne.popoverContainer);
      return t.height = i.offsetHeight, t.width = i.offsetWidth, n.remove(), t;
    }
    get flippableElements() {
      return this.items.map((e) => {
        if (e instanceof Ve) return e.getElement();
        if (e instanceof bt) return e.getControls();
      }).flat().filter((e) => e != null);
    }
    addSearch() {
      this.search = new ic({
        items: this.itemsDefault,
        placeholder: this.messages.search
      }), this.search.on($t.Search, this.onSearch);
      const e = this.search.getElement();
      e.classList.add(ne.search), this.nodes.popoverContainer.insertBefore(e, this.nodes.popoverContainer.firstChild);
    }
    toggleNothingFoundMessage(e) {
      this.nodes.nothingFoundMessage.classList.toggle(ne.nothingFoundMessageDisplayed, e);
    }
  };
  ac([
    rt
  ], xr.prototype, "size");
  let Ho = xr;
  class lc extends Ho {
    constructor(e) {
      const t = !st();
      super({
        ...e,
        class: ne.popoverInline
      }, {
        [Z.Default]: {
          wrapperTag: "button",
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        },
        [Z.Html]: {
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        }
      }), this.items.forEach((n) => {
        !(n instanceof Ve) && !(n instanceof bt) || n.hasChildren && n.isChildrenOpen && this.showNestedItems(n);
      });
    }
    get offsetLeft() {
      return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetLeft;
    }
    show() {
      this.nestingLevel === 0 && this.nodes.popover.style.setProperty(nt.InlinePopoverWidth, this.size.width + "px"), super.show();
    }
    handleHover() {
    }
    setTriggerItemPosition(e, t) {
      const n = t.getElement(), i = n ? n.offsetLeft : 0, r = this.offsetLeft + i;
      e.style.setProperty(nt.TriggerItemLeft, r + "px");
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
      return t.getElement().classList.add(ne.getPopoverNestedClass(t.nestingLevel)), t;
    }
    handleItemClick(e) {
      var t;
      e !== this.nestedPopoverTriggerItem && ((t = this.nestedPopoverTriggerItem) == null || t.handleClick(), super.destroyNestedPopoverIfExists()), super.handleItemClick(e);
    }
  }
  const Tr = class pt {
    constructor() {
      this.scrollPosition = null;
    }
    lock() {
      To ? this.lockHard() : document.body.classList.add(pt.CSS.scrollLocked);
    }
    unlock() {
      To ? this.unlockHard() : document.body.classList.remove(pt.CSS.scrollLocked);
    }
    lockHard() {
      this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty("--window-scroll-offset", `${this.scrollPosition}px`), document.body.classList.add(pt.CSS.scrollLockedHard);
    }
    unlockHard() {
      document.body.classList.remove(pt.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
    }
  };
  Tr.CSS = {
    scrollLocked: "ce-scroll-locked",
    scrollLockedHard: "ce-scroll-locked--hard"
  };
  let cc = Tr;
  const yo = He("ce-popover-header"), ko = {
    root: yo(),
    text: yo("text"),
    backButton: yo("back-button")
  };
  class dc {
    constructor({ text: e, onBackButtonClick: t }) {
      this.listeners = new Et(), this.text = e, this.onBackButtonClick = t, this.nodes = {
        root: k.make("div", [
          ko.root
        ]),
        backButton: k.make("button", [
          ko.backButton
        ]),
        text: k.make("div", [
          ko.text
        ])
      }, this.nodes.backButton.innerHTML = zl, this.nodes.root.appendChild(this.nodes.backButton), this.listeners.on(this.nodes.backButton, "click", this.onBackButtonClick), this.nodes.text.innerText = this.text, this.nodes.root.appendChild(this.nodes.text);
    }
    getElement() {
      return this.nodes.root;
    }
    destroy() {
      this.nodes.root.remove(), this.listeners.destroy();
    }
  }
  class uc {
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
  let _r = class extends Er {
    constructor(e) {
      super(e, {
        [Z.Default]: {
          hint: {
            enabled: false
          }
        },
        [Z.Html]: {
          hint: {
            enabled: false
          }
        }
      }), this.scrollLocker = new cc(), this.history = new uc(), this.isHidden = true, this.nodes.overlay = k.make("div", [
        ne.overlay,
        ne.overlayHidden
      ]), this.nodes.popover.insertBefore(this.nodes.overlay, this.nodes.popover.firstChild), this.listeners.on(this.nodes.overlay, "click", () => {
        this.hide();
      }), this.history.push({
        items: e.items
      });
    }
    show() {
      this.nodes.overlay.classList.remove(ne.overlayHidden), super.show(), this.scrollLocker.lock(), this.isHidden = false;
    }
    hide() {
      this.isHidden || (super.hide(), this.nodes.overlay.classList.add(ne.overlayHidden), this.scrollLocker.unlock(), this.history.reset(), this.isHidden = true);
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
        this.header = new dc({
          text: t,
          onBackButtonClick: () => {
            this.history.pop(), this.updateItemsAndHeader(this.history.currentItems, this.history.currentTitle);
          }
        });
        const n = this.header.getElement();
        n !== null && this.nodes.popoverContainer.insertBefore(n, this.nodes.popoverContainer.firstChild);
      }
      this.items.forEach((n) => {
        var i;
        return (i = n.getElement()) == null ? void 0 : i.remove();
      }), this.items = this.buildItems(e), this.items.forEach((n) => {
        var i;
        const r = n.getElement();
        r !== null && ((i = this.nodes.items) == null || i.appendChild(r));
      });
    }
  };
  class hc extends j {
    constructor() {
      super(...arguments), this.opened = false, this.selection = new O(), this.popover = null, this.close = () => {
        this.opened && (this.opened = false, O.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(_e.Closed, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
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
      ]), this.nodes.wrapper.setAttribute("data-cy", "block-tunes"), this.eventsDispatcher.on(vt, this.close);
    }
    destroy() {
      this.removeAllNodes(), this.listeners.destroy(), this.eventsDispatcher.off(vt, this.close);
    }
    async open(e = this.Editor.BlockManager.currentBlock) {
      var t;
      this.opened = true, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
      const { toolTunes: n, commonTunes: i } = e.getTunes();
      this.eventsDispatcher.emit(this.events.opened);
      const r = st() ? _r : Ho;
      this.popover = new r({
        searchable: true,
        items: await this.getTunesItems(e, i, n),
        scopeElement: this.Editor.API.methods.ui.nodes.redactor,
        messages: {
          nothingFound: fe.ui(be.ui.popover, "Nothing found"),
          search: fe.ui(be.ui.popover, "Filter")
        }
      }), this.popover.on(_e.Closed, this.onPopoverClose), (t = this.nodes.wrapper) == null || t.append(this.popover.getElement()), this.popover.show();
    }
    getElement() {
      return this.nodes.wrapper;
    }
    async getTunesItems(e, t, n) {
      const i = [];
      n !== void 0 && n.length > 0 && (i.push(...n), i.push({
        type: Z.Separator
      }));
      const r = Array.from(this.Editor.Tools.blockTools.values()), s = (await fr(e, r)).reduce((a, d) => (d.toolbox.forEach((u) => {
        a.push({
          icon: u.icon,
          title: fe.t(be.toolNames, u.title),
          name: d.name,
          closeOnActivate: true,
          onActivate: async () => {
            const { BlockManager: p, Caret: v, Toolbar: b } = this.Editor, w = await p.convert(e, d.name, u.data);
            b.close(), v.setToBlock(w, v.positions.END);
          }
        });
      }), a), []);
      return s.length > 0 && (i.push({
        icon: kr,
        name: "convert-to",
        title: fe.ui(be.ui.popover, "Convert to"),
        children: {
          searchable: true,
          items: s
        }
      }), i.push({
        type: Z.Separator
      })), i.push(...t), i.map((a) => this.resolveTuneAliases(a));
    }
    resolveTuneAliases(e) {
      if (e.type === Z.Separator || e.type === Z.Html) return e;
      const t = $l(e, {
        label: "title"
      });
      return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
    }
  }
  var Sr = {
    exports: {}
  };
  (function(o, e) {
    (function(t, n) {
      o.exports = n();
    })(window, function() {
      return function(t) {
        var n = {};
        function i(r) {
          if (n[r]) return n[r].exports;
          var s = n[r] = {
            i: r,
            l: false,
            exports: {}
          };
          return t[r].call(s.exports, s, s.exports, i), s.l = true, s.exports;
        }
        return i.m = t, i.c = n, i.d = function(r, s, a) {
          i.o(r, s) || Object.defineProperty(r, s, {
            enumerable: true,
            get: a
          });
        }, i.r = function(r) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(r, "__esModule", {
            value: true
          });
        }, i.t = function(r, s) {
          if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule) return r;
          var a = /* @__PURE__ */ Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: true,
            value: r
          }), 2 & s && typeof r != "string") for (var d in r) i.d(a, d, (function(u) {
            return r[u];
          }).bind(null, d));
          return a;
        }, i.n = function(r) {
          var s = r && r.__esModule ? function() {
            return r.default;
          } : function() {
            return r;
          };
          return i.d(s, "a", s), s;
        }, i.o = function(r, s) {
          return Object.prototype.hasOwnProperty.call(r, s);
        }, i.p = "", i(i.s = 0);
      }([
        function(t, n, i) {
          function r(d, u) {
            for (var p = 0; p < u.length; p++) {
              var v = u[p];
              v.enumerable = v.enumerable || false, v.configurable = true, "value" in v && (v.writable = true), Object.defineProperty(d, v.key, v);
            }
          }
          function s(d, u, p) {
            return u && r(d.prototype, u), p && r(d, p), d;
          }
          i.r(n);
          var a = function() {
            function d(u) {
              var p = this;
              (function(v, b) {
                if (!(v instanceof b)) throw new TypeError("Cannot call a class as a function");
              })(this, d), this.commands = {}, this.keys = {}, this.name = u.name, this.parseShortcutName(u.name), this.element = u.on, this.callback = u.callback, this.executeShortcut = function(v) {
                p.execute(v);
              }, this.element.addEventListener("keydown", this.executeShortcut, false);
            }
            return s(d, null, [
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
            ]), s(d, [
              {
                key: "parseShortcutName",
                value: function(u) {
                  u = u.split("+");
                  for (var p = 0; p < u.length; p++) {
                    u[p] = u[p].toUpperCase();
                    var v = false;
                    for (var b in d.supportedCommands) if (d.supportedCommands[b].includes(u[p])) {
                      v = this.commands[b] = true;
                      break;
                    }
                    v || (this.keys[u[p]] = true);
                  }
                  for (var w in d.supportedCommands) this.commands[w] || (this.commands[w] = false);
                }
              },
              {
                key: "execute",
                value: function(u) {
                  var p, v = {
                    CMD: u.ctrlKey || u.metaKey,
                    SHIFT: u.shiftKey,
                    ALT: u.altKey
                  }, b = true;
                  for (p in this.commands) this.commands[p] !== v[p] && (b = false);
                  var w, y = true;
                  for (w in this.keys) y = y && u.keyCode === d.keyCodes[w];
                  b && y && this.callback(u);
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
          n.default = a;
        }
      ]).default;
    });
  })(Sr);
  var pc = Sr.exports;
  const fc = Yt(pc);
  class gc {
    constructor() {
      this.registeredShortcuts = /* @__PURE__ */ new Map();
    }
    add(e) {
      if (this.findShortcut(e.on, e.name)) throw Error(`Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`);
      const t = new fc({
        name: e.name,
        on: e.on,
        callback: e.handler
      }), n = this.registeredShortcuts.get(e.on) || [];
      this.registeredShortcuts.set(e.on, [
        ...n,
        t
      ]);
    }
    remove(e, t) {
      const n = this.findShortcut(e, t);
      if (!n) return;
      n.remove();
      const i = this.registeredShortcuts.get(e);
      this.registeredShortcuts.set(e, i.filter((r) => r !== n));
    }
    findShortcut(e, t) {
      return (this.registeredShortcuts.get(e) || []).find(({ name: n }) => n === t);
    }
  }
  const it = new gc();
  var mc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Br = (o, e, t, n) => {
    for (var i = vc(e, t), r = o.length - 1, s; r >= 0; r--) (s = o[r]) && (i = s(e, t, i) || i);
    return i && mc(e, t, i), i;
  }, Ot = ((o) => (o.Opened = "toolbox-opened", o.Closed = "toolbox-closed", o.BlockAdded = "toolbox-block-added", o))(Ot || {});
  const Fo = class Or extends wt {
    constructor({ api: e, tools: t, i18nLabels: n }) {
      super(), this.opened = false, this.listeners = new Et(), this.popover = null, this.handleMobileLayoutToggle = () => {
        this.destroyPopover(), this.initPopover();
      }, this.onPopoverClose = () => {
        this.opened = false, this.emit("toolbox-closed");
      }, this.api = e, this.tools = t, this.i18nLabels = n, this.enableShortcuts(), this.nodes = {
        toolbox: k.make("div", Or.CSS.toolbox)
      }, this.initPopover(), this.nodes.toolbox.setAttribute("data-cy", "toolbox"), this.api.events.on(vt, this.handleMobileLayoutToggle);
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
      super.destroy(), this.nodes && this.nodes.toolbox && this.nodes.toolbox.remove(), this.removeAllShortcuts(), (e = this.popover) == null || e.off(_e.Closed, this.onPopoverClose), this.listeners.destroy(), this.api.events.off(vt, this.handleMobileLayoutToggle);
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
      const t = st() ? _r : Ho;
      this.popover = new t({
        scopeElement: this.api.ui.nodes.redactor,
        searchable: true,
        messages: {
          nothingFound: this.i18nLabels.nothingFound,
          search: this.i18nLabels.filter
        },
        items: this.toolboxItemsToBeDisplayed
      }), this.popover.on(_e.Closed, this.onPopoverClose), (e = this.nodes.toolbox) == null || e.append(this.popover.getElement());
    }
    destroyPopover() {
      this.popover !== null && (this.popover.hide(), this.popover.off(_e.Closed, this.onPopoverClose), this.popover.destroy(), this.popover = null), this.nodes.toolbox !== null && (this.nodes.toolbox.innerHTML = "");
    }
    get toolsToBeDisplayed() {
      const e = [];
      return this.tools.forEach((t) => {
        t.toolbox && e.push(t);
      }), e;
    }
    get toolboxItemsToBeDisplayed() {
      const e = (t, n, i = true) => ({
        icon: t.icon,
        title: fe.t(be.toolNames, t.title || Dt(n.name)),
        name: n.name,
        onActivate: () => {
          this.toolButtonActivated(n.name, t.data);
        },
        secondaryLabel: n.shortcut && i ? Po(n.shortcut) : ""
      });
      return this.toolsToBeDisplayed.reduce((t, n) => (Array.isArray(n.toolbox) ? n.toolbox.forEach((i, r) => {
        t.push(e(i, n, r === 0));
      }) : n.toolbox !== void 0 && t.push(e(n.toolbox, n)), t), []);
    }
    enableShortcuts() {
      this.toolsToBeDisplayed.forEach((e) => {
        const t = e.shortcut;
        t && this.enableShortcutForTool(e.name, t);
      });
    }
    enableShortcutForTool(e, t) {
      it.add({
        name: t,
        on: this.api.ui.nodes.redactor,
        handler: async (n) => {
          n.preventDefault();
          const i = this.api.blocks.getCurrentBlockIndex(), r = this.api.blocks.getBlockByIndex(i);
          if (r) try {
            const s = await this.api.blocks.convert(r.id, e);
            this.api.caret.setToBlock(s, "end");
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
        t && it.remove(this.api.ui.nodes.redactor, t);
      });
    }
    async insertNewBlock(e, t) {
      const n = this.api.blocks.getCurrentBlockIndex(), i = this.api.blocks.getBlockByIndex(n);
      if (!i) return;
      const r = i.isEmpty ? n : n + 1;
      let s;
      if (t) {
        const d = await this.api.blocks.composeBlockData(e);
        s = Object.assign(d, t);
      }
      const a = this.api.blocks.insert(e, s, void 0, r, void 0, i.isEmpty);
      a.call(Me.APPEND_CALLBACK), this.api.caret.setToBlock(r), this.emit("toolbox-block-added", {
        block: a
      }), this.api.toolbar.close();
    }
  };
  Br([
    rt
  ], Fo.prototype, "toolsToBeDisplayed");
  Br([
    rt
  ], Fo.prototype, "toolboxItemsToBeDisplayed");
  let bc = Fo;
  const Mr = "block hovered";
  async function yc(o, e) {
    const t = navigator.keyboard;
    if (!t) return e;
    try {
      return (await t.getLayoutMap()).get(o) || e;
    } catch (n) {
      return console.error(n), e;
    }
  }
  class kc extends j {
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
            W("toolbox.open() called before initialization is finished", "warn");
            return;
          }
          this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
        },
        toggle: () => {
          if (this.toolboxInstance === null) {
            W("toolbox.toggle() called before initialization is finished", "warn");
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
        W("Can't open Toolbar since Editor initialization is not finished yet", "warn");
        return;
      }
      if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e) return;
      this.hoveredBlock = e;
      const t = e.holder, { isMobile: n } = this.Editor.UI;
      let i;
      const r = 20, s = e.firstInput, a = t.getBoundingClientRect(), d = s !== void 0 ? s.getBoundingClientRect() : null, u = d !== null ? d.top - a.top : null, p = u !== null ? u > r : void 0;
      if (n) i = t.offsetTop + t.offsetHeight;
      else if (s === void 0 || p) {
        const v = parseInt(window.getComputedStyle(e.pluginsContent).paddingTop);
        i = t.offsetTop + v;
      } else {
        const v = il(s), b = parseInt(window.getComputedStyle(this.nodes.plusButton).height, 10);
        i = t.offsetTop + v - b + 8 + u;
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
      ].forEach((r) => {
        this.nodes[r] = k.make("div", this.CSS[r]);
      }), k.append(this.nodes.wrapper, this.nodes.content), k.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = k.make("div", this.CSS.plusButton, {
        innerHTML: Zl
      }), k.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
        jt(true), this.plusButtonClicked();
      }, false);
      const e = k.make("div");
      e.appendChild(document.createTextNode(fe.ui(be.ui.toolbar.toolbox, "Add"))), e.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
        textContent: "/"
      })), Ht(this.nodes.plusButton, e, {
        hidingDelay: 400
      }), this.nodes.settingsToggler = k.make("span", this.CSS.settingsToggler, {
        innerHTML: Gl
      }), k.append(this.nodes.actions, this.nodes.settingsToggler);
      const t = k.make("div"), n = k.text(fe.ui(be.ui.blockTunes.toggler, "Click to tune")), i = await yc("Slash", "/");
      t.appendChild(n), t.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
        textContent: Po(`CMD + ${i}`)
      })), Ht(this.nodes.settingsToggler, t, {
        hidingDelay: 400
      }), k.append(this.nodes.actions, this.makeToolbox()), k.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), k.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
    }
    makeToolbox() {
      return this.toolboxInstance = new bc({
        api: this.Editor.API.methods,
        tools: this.Editor.Tools.blockTools,
        i18nLabels: {
          filter: fe.ui(be.ui.popover, "Filter"),
          nothingFound: fe.ui(be.ui.popover, "Nothing found")
        }
      }), this.toolboxInstance.on(Ot.Opened, () => {
        this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
      }), this.toolboxInstance.on(Ot.Closed, () => {
        this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
      }), this.toolboxInstance.on(Ot.BlockAdded, ({ block: e }) => {
        const { BlockManager: t, Caret: n } = this.Editor, i = t.getBlockById(e.id);
        i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), n.setToBlock(t.lastBlock)) : n.setToBlock(t.nextBlock));
      }), this.toolboxInstance.getElement();
    }
    plusButtonClicked() {
      var e;
      this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
    }
    enableModuleBindings() {
      this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
        var t;
        e.stopPropagation(), this.settingsTogglerClicked(), (t = this.toolboxInstance) != null && t.opened && this.toolboxInstance.close(), jt(true);
      }, true), st() || this.eventsDispatcher.on(Mr, (e) => {
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
  var ze = ((o) => (o[o.Block = 0] = "Block", o[o.Inline = 1] = "Inline", o[o.Tune = 2] = "Tune", o))(ze || {}), Mt = ((o) => (o.Shortcut = "shortcut", o.Toolbox = "toolbox", o.EnabledInlineTools = "inlineToolbar", o.EnabledBlockTunes = "tunes", o.Config = "config", o))(Mt || {}), Ar = ((o) => (o.Shortcut = "shortcut", o.SanitizeConfig = "sanitize", o))(Ar || {}), et = ((o) => (o.IsEnabledLineBreaks = "enableLineBreaks", o.Toolbox = "toolbox", o.ConversionConfig = "conversionConfig", o.IsReadOnlySupported = "isReadOnlySupported", o.PasteConfig = "pasteConfig", o))(et || {}), Vt = ((o) => (o.IsInline = "isInline", o.Title = "title", o.IsReadOnlySupported = "isReadOnlySupported", o))(Vt || {}), Oo = ((o) => (o.IsTune = "isTune", o))(Oo || {});
  let $o = class {
    constructor({ name: e, constructable: t, config: n, api: i, isDefault: r, isInternal: s = false, defaultPlaceholder: a }) {
      this.api = i, this.name = e, this.constructable = t, this.config = n, this.isDefault = r, this.isInternal = s, this.defaultPlaceholder = a;
    }
    get settings() {
      const e = this.config.config || {};
      return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
    }
    reset() {
      if (ee(this.constructable.reset)) return this.constructable.reset();
    }
    prepare() {
      if (ee(this.constructable.prepare)) return this.constructable.prepare({
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
      return this.type === ze.Inline;
    }
    isBlock() {
      return this.type === ze.Block;
    }
    isTune() {
      return this.type === ze.Tune;
    }
  };
  class wc extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.CSS = {
        inlineToolbar: "ce-inline-toolbar"
      }, this.opened = false, this.popover = null, this.toolbarVerticalMargin = st() ? 20 : 6, this.tools = /* @__PURE__ */ new Map(), window.requestIdleCallback(() => {
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
        for (const [n, i] of this.tools) {
          const r = this.getToolShortcut(n.name);
          r !== void 0 && it.remove(this.Editor.UI.nodes.redactor, r), ee(i.clear) && i.clear();
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
      this.popover = new lc({
        items: t,
        scopeElement: this.Editor.API.methods.ui.nodes.redactor,
        messages: {
          nothingFound: fe.ui(be.ui.popover, "Nothing found"),
          search: fe.ui(be.ui.popover, "Filter")
        }
      }), this.move(this.popover.size.width), (e = this.nodes.wrapper) == null || e.append(this.popover.getElement()), this.popover.show();
    }
    move(e) {
      const t = O.rect, n = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), i = {
        x: t.x - n.x,
        y: t.y + t.height - n.top + this.toolbarVerticalMargin
      };
      i.x + e + n.x > this.Editor.UI.contentRect.right && (i.x = this.Editor.UI.contentRect.right - e - n.x), this.nodes.wrapper.style.left = Math.floor(i.x) + "px", this.nodes.wrapper.style.top = Math.floor(i.y) + "px";
    }
    reset() {
      this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
    }
    allowedToShow() {
      const e = [
        "IMG",
        "INPUT"
      ], t = O.get(), n = O.text;
      if (!t || !t.anchorNode || t.isCollapsed || n.length < 1) return false;
      const i = k.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
      if (i === null || t !== null && e.includes(i.tagName)) return false;
      const r = this.Editor.BlockManager.getBlock(t.anchorNode);
      return !r || this.getTools().some((s) => r.tool.inlineTools.has(s.name)) === false ? false : i.closest("[contenteditable]") !== null;
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
      for (const [n, i] of this.tools) {
        const r = await i.render(), s = this.getToolShortcut(n.name);
        if (s !== void 0) try {
          this.enableShortcuts(n.name, s);
        } catch {
        }
        const a = s !== void 0 ? Po(s) : void 0, d = fe.t(be.toolNames, n.title || Dt(n.name));
        [
          r
        ].flat().forEach((u) => {
          var p, v;
          const b = {
            name: n.name,
            onActivate: () => {
              this.toolClicked(i);
            },
            hint: {
              title: d,
              description: a
            }
          };
          if (k.isElement(u)) {
            const w = {
              ...b,
              element: u,
              type: Z.Html
            };
            if (ee(i.renderActions)) {
              const y = i.renderActions();
              w.children = {
                isOpen: (p = i.checkState) == null ? void 0 : p.call(i, O.get()),
                isFlippable: false,
                items: [
                  {
                    type: Z.Html,
                    element: y
                  }
                ]
              };
            } else (v = i.checkState) == null || v.call(i, O.get());
            e.push(w);
          } else if (u.type === Z.Html) e.push({
            ...b,
            ...u,
            type: Z.Html
          });
          else if (u.type === Z.Separator) e.push({
            type: Z.Separator
          });
          else {
            const w = {
              ...b,
              ...u,
              type: Z.Default
            };
            "children" in w && t !== 0 && e.push({
              type: Z.Separator
            }), e.push(w), "children" in w && t < this.tools.size - 1 && e.push({
              type: Z.Separator
            });
          }
        }), t++;
      }
      return e;
    }
    getToolShortcut(e) {
      const { Tools: t } = this.Editor, n = t.inlineTools.get(e), i = t.internal.inlineTools;
      return Array.from(i.keys()).includes(e) ? this.inlineTools[e][Ar.Shortcut] : n == null ? void 0 : n.shortcut;
    }
    enableShortcuts(e, t) {
      it.add({
        name: t,
        handler: (n) => {
          var i;
          const { currentBlock: r } = this.Editor.BlockManager;
          r && r.tool.enabledInlineTools && (n.preventDefault(), (i = this.popover) == null || i.activateItemByName(e));
        },
        on: document
      });
    }
    toolClicked(e) {
      var t;
      const n = O.range;
      (t = e.surround) == null || t.call(e, n), this.checkToolsState();
    }
    checkToolsState() {
      var e;
      (e = this.tools) == null || e.forEach((t) => {
        var n;
        (n = t.checkState) == null || n.call(t, O.get());
      });
    }
    get inlineTools() {
      const e = {};
      return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, n]) => {
        e[t] = n.create();
      }), e;
    }
  }
  function Ir() {
    const o = window.getSelection();
    if (o === null) return [
      null,
      0
    ];
    let e = o.focusNode, t = o.focusOffset;
    return e === null ? [
      null,
      0
    ] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], t = e.textContent.length)), [
      e,
      t
    ]);
  }
  function Pr(o, e, t, n) {
    const i = document.createRange();
    n === "left" ? (i.setStart(o, 0), i.setEnd(e, t)) : (i.setStart(e, t), i.setEnd(o, o.childNodes.length));
    const r = i.cloneContents(), s = document.createElement("div");
    s.appendChild(r);
    const a = s.textContent || "";
    return nl(a);
  }
  function At(o) {
    const e = k.getDeepestNode(o);
    if (e === null || k.isEmpty(o)) return true;
    if (k.isNativeInput(e)) return e.selectionEnd === 0;
    if (k.isEmpty(o)) return true;
    const [t, n] = Ir();
    return t === null ? false : Pr(o, t, n, "left");
  }
  function It(o) {
    const e = k.getDeepestNode(o, true);
    if (e === null) return true;
    if (k.isNativeInput(e)) return e.selectionEnd === e.value.length;
    const [t, n] = Ir();
    return t === null ? false : Pr(o, t, n, "right");
  }
  var Nr = {}, Vo = {}, Xt = {}, We = {}, Uo = {}, zo = {};
  Object.defineProperty(zo, "__esModule", {
    value: true
  });
  zo.allInputsSelector = Ec;
  function Ec() {
    var o = [
      "text",
      "password",
      "email",
      "number",
      "search",
      "tel",
      "url"
    ];
    return "[contenteditable=true], textarea, input:not([type]), " + o.map(function(e) {
      return 'input[type="'.concat(e, '"]');
    }).join(", ");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.allInputsSelector = void 0;
    var e = zo;
    Object.defineProperty(o, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
  })(Uo);
  var Ye = {}, qo = {};
  Object.defineProperty(qo, "__esModule", {
    value: true
  });
  qo.isNativeInput = xc;
  function xc(o) {
    var e = [
      "INPUT",
      "TEXTAREA"
    ];
    return o && o.tagName ? e.includes(o.tagName) : false;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isNativeInput = void 0;
    var e = qo;
    Object.defineProperty(o, "isNativeInput", {
      enumerable: true,
      get: function() {
        return e.isNativeInput;
      }
    });
  })(Ye);
  var Lr = {}, Wo = {};
  Object.defineProperty(Wo, "__esModule", {
    value: true
  });
  Wo.append = Cc;
  function Cc(o, e) {
    Array.isArray(e) ? e.forEach(function(t) {
      o.appendChild(t);
    }) : o.appendChild(e);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.append = void 0;
    var e = Wo;
    Object.defineProperty(o, "append", {
      enumerable: true,
      get: function() {
        return e.append;
      }
    });
  })(Lr);
  var Yo = {}, Xo = {};
  Object.defineProperty(Xo, "__esModule", {
    value: true
  });
  Xo.blockElements = Tc;
  function Tc() {
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
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.blockElements = void 0;
    var e = Xo;
    Object.defineProperty(o, "blockElements", {
      enumerable: true,
      get: function() {
        return e.blockElements;
      }
    });
  })(Yo);
  var Dr = {}, Ko = {};
  Object.defineProperty(Ko, "__esModule", {
    value: true
  });
  Ko.calculateBaseline = _c;
  function _c(o) {
    var e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), r = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, d = (n - t) / 2, u = s + r + i + d + a;
    return u;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.calculateBaseline = void 0;
    var e = Ko;
    Object.defineProperty(o, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return e.calculateBaseline;
      }
    });
  })(Dr);
  var Rr = {}, Go = {}, Zo = {}, Qo = {};
  Object.defineProperty(Qo, "__esModule", {
    value: true
  });
  Qo.isContentEditable = Sc;
  function Sc(o) {
    return o.contentEditable === "true";
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isContentEditable = void 0;
    var e = Qo;
    Object.defineProperty(o, "isContentEditable", {
      enumerable: true,
      get: function() {
        return e.isContentEditable;
      }
    });
  })(Zo);
  Object.defineProperty(Go, "__esModule", {
    value: true
  });
  Go.canSetCaret = Mc;
  var Bc = Ye, Oc = Zo;
  function Mc(o) {
    var e = true;
    if ((0, Bc.isNativeInput)(o)) switch (o.type) {
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
    else e = (0, Oc.isContentEditable)(o);
    return e;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.canSetCaret = void 0;
    var e = Go;
    Object.defineProperty(o, "canSetCaret", {
      enumerable: true,
      get: function() {
        return e.canSetCaret;
      }
    });
  })(Rr);
  var Kt = {}, Jo = {};
  function Ac(o, e, t) {
    const n = t.value !== void 0 ? "value" : "get", i = t[n], r = `#${e}Cache`;
    if (t[n] = function(...s) {
      return this[r] === void 0 && (this[r] = i.apply(this, s)), this[r];
    }, n === "get" && t.set) {
      const s = t.set;
      t.set = function(a) {
        delete o[r], s.apply(this, a);
      };
    }
    return t;
  }
  function jr() {
    const o = {
      win: false,
      mac: false,
      x11: false,
      linux: false
    }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
    return e !== void 0 && (o[e] = true), o;
  }
  function en(o) {
    return o != null && o !== "" && (typeof o != "object" || Object.keys(o).length > 0);
  }
  function Ic(o) {
    return !en(o);
  }
  const Pc = () => typeof window < "u" && window.navigator !== null && en(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function Nc(o) {
    const e = jr();
    return o = o.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, "+"), e.mac ? o = o.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
  }
  function Lc(o) {
    return o[0].toUpperCase() + o.slice(1);
  }
  function Dc(o) {
    const e = document.createElement("div");
    e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = o, document.body.appendChild(e);
    const t = window.getSelection(), n = document.createRange();
    if (n.selectNode(e), t === null) throw new Error("Cannot copy text to clipboard");
    t.removeAllRanges(), t.addRange(n), document.execCommand("copy"), document.body.removeChild(e);
  }
  function Rc(o, e, t) {
    let n;
    return (...i) => {
      const r = this, s = () => {
        n = void 0, t !== true && o.apply(r, i);
      }, a = t === true && n !== void 0;
      window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(r, i);
    };
  }
  function De(o) {
    return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function jc(o) {
    return De(o) === "boolean";
  }
  function Hr(o) {
    return De(o) === "function" || De(o) === "asyncfunction";
  }
  function Hc(o) {
    return Hr(o) && /^\s*class\s+/.test(o.toString());
  }
  function Fc(o) {
    return De(o) === "number";
  }
  function Pt(o) {
    return De(o) === "object";
  }
  function $c(o) {
    return Promise.resolve(o) === o;
  }
  function Vc(o) {
    return De(o) === "string";
  }
  function Uc(o) {
    return De(o) === "undefined";
  }
  function Mo(o, ...e) {
    if (!e.length) return o;
    const t = e.shift();
    if (Pt(o) && Pt(t)) for (const n in t) Pt(t[n]) ? (o[n] === void 0 && Object.assign(o, {
      [n]: {}
    }), Mo(o[n], t[n])) : Object.assign(o, {
      [n]: t[n]
    });
    return Mo(o, ...e);
  }
  function zc(o, e, t) {
    const n = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
    o && console.warn(n);
  }
  function qc(o) {
    try {
      return new URL(o).href;
    } catch {
    }
    return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
  }
  function Wc(o) {
    return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
  }
  const Yc = {
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
  }, Xc = {
    LEFT: 0,
    WHEEL: 1,
    RIGHT: 2,
    BACKWARD: 3,
    FORWARD: 4
  };
  let Kc = class {
    constructor() {
      this.completed = Promise.resolve();
    }
    add(o) {
      return new Promise((e, t) => {
        this.completed = this.completed.then(o).then(e).catch(t);
      });
    }
  };
  function Gc(o, e, t = void 0) {
    let n, i, r, s = null, a = 0;
    t || (t = {});
    const d = function() {
      a = t.leading === false ? 0 : Date.now(), s = null, r = o.apply(n, i), s === null && (n = i = null);
    };
    return function() {
      const u = Date.now();
      !a && t.leading === false && (a = u);
      const p = e - (u - a);
      return n = this, i = arguments, p <= 0 || p > e ? (s && (clearTimeout(s), s = null), a = u, r = o.apply(n, i), s === null && (n = i = null)) : !s && t.trailing !== false && (s = setTimeout(d, p)), r;
    };
  }
  const Zc = Object.freeze(Object.defineProperty({
    __proto__: null,
    PromiseQueue: Kc,
    beautifyShortcut: Nc,
    cacheable: Ac,
    capitalize: Lc,
    copyTextToClipboard: Dc,
    debounce: Rc,
    deepMerge: Mo,
    deprecationAssert: zc,
    getUserOS: jr,
    getValidUrl: qc,
    isBoolean: jc,
    isClass: Hc,
    isEmpty: Ic,
    isFunction: Hr,
    isIosDevice: Pc,
    isNumber: Fc,
    isObject: Pt,
    isPrintableKey: Wc,
    isPromise: $c,
    isString: Vc,
    isUndefined: Uc,
    keyCodes: Yc,
    mouseButtons: Xc,
    notEmpty: en,
    throttle: Gc,
    typeOf: De
  }, Symbol.toStringTag, {
    value: "Module"
  })), tn = Ua(Zc);
  Object.defineProperty(Jo, "__esModule", {
    value: true
  });
  Jo.containsOnlyInlineElements = ed;
  var Qc = tn, Jc = Yo;
  function ed(o) {
    var e;
    (0, Qc.isString)(o) ? (e = document.createElement("div"), e.innerHTML = o) : e = o;
    var t = function(n) {
      return !(0, Jc.blockElements)().includes(n.tagName.toLowerCase()) && Array.from(n.children).every(t);
    };
    return Array.from(e.children).every(t);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.containsOnlyInlineElements = void 0;
    var e = Jo;
    Object.defineProperty(o, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return e.containsOnlyInlineElements;
      }
    });
  })(Kt);
  var Fr = {}, on = {}, Gt = {}, nn = {};
  Object.defineProperty(nn, "__esModule", {
    value: true
  });
  nn.make = td;
  function td(o, e, t) {
    var n;
    e === void 0 && (e = null), t === void 0 && (t = {});
    var i = document.createElement(o);
    if (Array.isArray(e)) {
      var r = e.filter(function(a) {
        return a !== void 0;
      });
      (n = i.classList).add.apply(n, r);
    } else e !== null && i.classList.add(e);
    for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (i[s] = t[s]);
    return i;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.make = void 0;
    var e = nn;
    Object.defineProperty(o, "make", {
      enumerable: true,
      get: function() {
        return e.make;
      }
    });
  })(Gt);
  Object.defineProperty(on, "__esModule", {
    value: true
  });
  on.fragmentToString = nd;
  var od = Gt;
  function nd(o) {
    var e = (0, od.make)("div");
    return e.appendChild(o), e.innerHTML;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.fragmentToString = void 0;
    var e = on;
    Object.defineProperty(o, "fragmentToString", {
      enumerable: true,
      get: function() {
        return e.fragmentToString;
      }
    });
  })(Fr);
  var $r = {}, rn = {};
  Object.defineProperty(rn, "__esModule", {
    value: true
  });
  rn.getContentLength = rd;
  var id = Ye;
  function rd(o) {
    var e, t;
    return (0, id.isNativeInput)(o) ? o.value.length : o.nodeType === Node.TEXT_NODE ? o.length : (t = (e = o.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getContentLength = void 0;
    var e = rn;
    Object.defineProperty(o, "getContentLength", {
      enumerable: true,
      get: function() {
        return e.getContentLength;
      }
    });
  })($r);
  var sn = {}, an = {}, Li = mt && mt.__spreadArray || function(o, e, t) {
    if (t || arguments.length === 2) for (var n = 0, i = e.length, r; n < i; n++) (r || !(n in e)) && (r || (r = Array.prototype.slice.call(e, 0, n)), r[n] = e[n]);
    return o.concat(r || Array.prototype.slice.call(e));
  };
  Object.defineProperty(an, "__esModule", {
    value: true
  });
  an.getDeepestBlockElements = Vr;
  var sd = Kt;
  function Vr(o) {
    return (0, sd.containsOnlyInlineElements)(o) ? [
      o
    ] : Array.from(o.children).reduce(function(e, t) {
      return Li(Li([], e, true), Vr(t), true);
    }, []);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getDeepestBlockElements = void 0;
    var e = an;
    Object.defineProperty(o, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return e.getDeepestBlockElements;
      }
    });
  })(sn);
  var Ur = {}, ln = {}, Zt = {}, cn = {};
  Object.defineProperty(cn, "__esModule", {
    value: true
  });
  cn.isLineBreakTag = ad;
  function ad(o) {
    return [
      "BR",
      "WBR"
    ].includes(o.tagName);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isLineBreakTag = void 0;
    var e = cn;
    Object.defineProperty(o, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return e.isLineBreakTag;
      }
    });
  })(Zt);
  var Qt = {}, dn = {};
  Object.defineProperty(dn, "__esModule", {
    value: true
  });
  dn.isSingleTag = ld;
  function ld(o) {
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
    ].includes(o.tagName);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isSingleTag = void 0;
    var e = dn;
    Object.defineProperty(o, "isSingleTag", {
      enumerable: true,
      get: function() {
        return e.isSingleTag;
      }
    });
  })(Qt);
  Object.defineProperty(ln, "__esModule", {
    value: true
  });
  ln.getDeepestNode = zr;
  var cd = Ye, dd = Zt, ud = Qt;
  function zr(o, e) {
    e === void 0 && (e = false);
    var t = e ? "lastChild" : "firstChild", n = e ? "previousSibling" : "nextSibling";
    if (o.nodeType === Node.ELEMENT_NODE && o[t]) {
      var i = o[t];
      if ((0, ud.isSingleTag)(i) && !(0, cd.isNativeInput)(i) && !(0, dd.isLineBreakTag)(i)) if (i[n]) i = i[n];
      else if (i.parentNode !== null && i.parentNode[n]) i = i.parentNode[n];
      else return i.parentNode;
      return zr(i, e);
    }
    return o;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getDeepestNode = void 0;
    var e = ln;
    Object.defineProperty(o, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return e.getDeepestNode;
      }
    });
  })(Ur);
  var qr = {}, un = {}, Tt = mt && mt.__spreadArray || function(o, e, t) {
    if (t || arguments.length === 2) for (var n = 0, i = e.length, r; n < i; n++) (r || !(n in e)) && (r || (r = Array.prototype.slice.call(e, 0, n)), r[n] = e[n]);
    return o.concat(r || Array.prototype.slice.call(e));
  };
  Object.defineProperty(un, "__esModule", {
    value: true
  });
  un.findAllInputs = md;
  var hd = Kt, pd = sn, fd = Uo, gd = Ye;
  function md(o) {
    return Array.from(o.querySelectorAll((0, fd.allInputsSelector)())).reduce(function(e, t) {
      return (0, gd.isNativeInput)(t) || (0, hd.containsOnlyInlineElements)(t) ? Tt(Tt([], e, true), [
        t
      ], false) : Tt(Tt([], e, true), (0, pd.getDeepestBlockElements)(t), true);
    }, []);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.findAllInputs = void 0;
    var e = un;
    Object.defineProperty(o, "findAllInputs", {
      enumerable: true,
      get: function() {
        return e.findAllInputs;
      }
    });
  })(qr);
  var Wr = {}, hn = {};
  Object.defineProperty(hn, "__esModule", {
    value: true
  });
  hn.isCollapsedWhitespaces = vd;
  function vd(o) {
    return !/[^\t\n\r ]/.test(o);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCollapsedWhitespaces = void 0;
    var e = hn;
    Object.defineProperty(o, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return e.isCollapsedWhitespaces;
      }
    });
  })(Wr);
  var pn = {}, fn = {};
  Object.defineProperty(fn, "__esModule", {
    value: true
  });
  fn.isElement = yd;
  var bd = tn;
  function yd(o) {
    return (0, bd.isNumber)(o) ? false : !!o && !!o.nodeType && o.nodeType === Node.ELEMENT_NODE;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isElement = void 0;
    var e = fn;
    Object.defineProperty(o, "isElement", {
      enumerable: true,
      get: function() {
        return e.isElement;
      }
    });
  })(pn);
  var Yr = {}, gn = {}, mn = {}, vn = {};
  Object.defineProperty(vn, "__esModule", {
    value: true
  });
  vn.isLeaf = kd;
  function kd(o) {
    return o === null ? false : o.childNodes.length === 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isLeaf = void 0;
    var e = vn;
    Object.defineProperty(o, "isLeaf", {
      enumerable: true,
      get: function() {
        return e.isLeaf;
      }
    });
  })(mn);
  var bn = {}, yn = {};
  Object.defineProperty(yn, "__esModule", {
    value: true
  });
  yn.isNodeEmpty = Td;
  var wd = Zt, Ed = pn, xd = Ye, Cd = Qt;
  function Td(o, e) {
    var t = "";
    return (0, Cd.isSingleTag)(o) && !(0, wd.isLineBreakTag)(o) ? false : ((0, Ed.isElement)(o) && (0, xd.isNativeInput)(o) ? t = o.value : o.textContent !== null && (t = o.textContent.replace("\u200B", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isNodeEmpty = void 0;
    var e = yn;
    Object.defineProperty(o, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return e.isNodeEmpty;
      }
    });
  })(bn);
  Object.defineProperty(gn, "__esModule", {
    value: true
  });
  gn.isEmpty = Bd;
  var _d = mn, Sd = bn;
  function Bd(o, e) {
    o.normalize();
    for (var t = [
      o
    ]; t.length > 0; ) {
      var n = t.shift();
      if (n) {
        if (o = n, (0, _d.isLeaf)(o) && !(0, Sd.isNodeEmpty)(o, e)) return false;
        t.push.apply(t, Array.from(o.childNodes));
      }
    }
    return true;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isEmpty = void 0;
    var e = gn;
    Object.defineProperty(o, "isEmpty", {
      enumerable: true,
      get: function() {
        return e.isEmpty;
      }
    });
  })(Yr);
  var Xr = {}, kn = {};
  Object.defineProperty(kn, "__esModule", {
    value: true
  });
  kn.isFragment = Md;
  var Od = tn;
  function Md(o) {
    return (0, Od.isNumber)(o) ? false : !!o && !!o.nodeType && o.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isFragment = void 0;
    var e = kn;
    Object.defineProperty(o, "isFragment", {
      enumerable: true,
      get: function() {
        return e.isFragment;
      }
    });
  })(Xr);
  var Kr = {}, wn = {};
  Object.defineProperty(wn, "__esModule", {
    value: true
  });
  wn.isHTMLString = Id;
  var Ad = Gt;
  function Id(o) {
    var e = (0, Ad.make)("div");
    return e.innerHTML = o, e.childElementCount > 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isHTMLString = void 0;
    var e = wn;
    Object.defineProperty(o, "isHTMLString", {
      enumerable: true,
      get: function() {
        return e.isHTMLString;
      }
    });
  })(Kr);
  var Gr = {}, En = {};
  Object.defineProperty(En, "__esModule", {
    value: true
  });
  En.offset = Pd;
  function Pd(o) {
    var e = o.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, i = e.top + n, r = e.left + t;
    return {
      top: i,
      left: r,
      bottom: i + e.height,
      right: r + e.width
    };
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.offset = void 0;
    var e = En;
    Object.defineProperty(o, "offset", {
      enumerable: true,
      get: function() {
        return e.offset;
      }
    });
  })(Gr);
  var Zr = {}, xn = {};
  Object.defineProperty(xn, "__esModule", {
    value: true
  });
  xn.prepend = Nd;
  function Nd(o, e) {
    Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
      return o.prepend(t);
    })) : o.prepend(e);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.prepend = void 0;
    var e = xn;
    Object.defineProperty(o, "prepend", {
      enumerable: true,
      get: function() {
        return e.prepend;
      }
    });
  })(Zr);
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.prepend = o.offset = o.make = o.isLineBreakTag = o.isSingleTag = o.isNodeEmpty = o.isLeaf = o.isHTMLString = o.isFragment = o.isEmpty = o.isElement = o.isContentEditable = o.isCollapsedWhitespaces = o.findAllInputs = o.isNativeInput = o.allInputsSelector = o.getDeepestNode = o.getDeepestBlockElements = o.getContentLength = o.fragmentToString = o.containsOnlyInlineElements = o.canSetCaret = o.calculateBaseline = o.blockElements = o.append = void 0;
    var e = Uo;
    Object.defineProperty(o, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
    var t = Ye;
    Object.defineProperty(o, "isNativeInput", {
      enumerable: true,
      get: function() {
        return t.isNativeInput;
      }
    });
    var n = Lr;
    Object.defineProperty(o, "append", {
      enumerable: true,
      get: function() {
        return n.append;
      }
    });
    var i = Yo;
    Object.defineProperty(o, "blockElements", {
      enumerable: true,
      get: function() {
        return i.blockElements;
      }
    });
    var r = Dr;
    Object.defineProperty(o, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return r.calculateBaseline;
      }
    });
    var s = Rr;
    Object.defineProperty(o, "canSetCaret", {
      enumerable: true,
      get: function() {
        return s.canSetCaret;
      }
    });
    var a = Kt;
    Object.defineProperty(o, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return a.containsOnlyInlineElements;
      }
    });
    var d = Fr;
    Object.defineProperty(o, "fragmentToString", {
      enumerable: true,
      get: function() {
        return d.fragmentToString;
      }
    });
    var u = $r;
    Object.defineProperty(o, "getContentLength", {
      enumerable: true,
      get: function() {
        return u.getContentLength;
      }
    });
    var p = sn;
    Object.defineProperty(o, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return p.getDeepestBlockElements;
      }
    });
    var v = Ur;
    Object.defineProperty(o, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return v.getDeepestNode;
      }
    });
    var b = qr;
    Object.defineProperty(o, "findAllInputs", {
      enumerable: true,
      get: function() {
        return b.findAllInputs;
      }
    });
    var w = Wr;
    Object.defineProperty(o, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return w.isCollapsedWhitespaces;
      }
    });
    var y = Zo;
    Object.defineProperty(o, "isContentEditable", {
      enumerable: true,
      get: function() {
        return y.isContentEditable;
      }
    });
    var T = pn;
    Object.defineProperty(o, "isElement", {
      enumerable: true,
      get: function() {
        return T.isElement;
      }
    });
    var q = Yr;
    Object.defineProperty(o, "isEmpty", {
      enumerable: true,
      get: function() {
        return q.isEmpty;
      }
    });
    var U = Xr;
    Object.defineProperty(o, "isFragment", {
      enumerable: true,
      get: function() {
        return U.isFragment;
      }
    });
    var z = Kr;
    Object.defineProperty(o, "isHTMLString", {
      enumerable: true,
      get: function() {
        return z.isHTMLString;
      }
    });
    var ae = mn;
    Object.defineProperty(o, "isLeaf", {
      enumerable: true,
      get: function() {
        return ae.isLeaf;
      }
    });
    var Q = bn;
    Object.defineProperty(o, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return Q.isNodeEmpty;
      }
    });
    var G = Zt;
    Object.defineProperty(o, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return G.isLineBreakTag;
      }
    });
    var oe = Qt;
    Object.defineProperty(o, "isSingleTag", {
      enumerable: true,
      get: function() {
        return oe.isSingleTag;
      }
    });
    var we = Gt;
    Object.defineProperty(o, "make", {
      enumerable: true,
      get: function() {
        return we.make;
      }
    });
    var M = Gr;
    Object.defineProperty(o, "offset", {
      enumerable: true,
      get: function() {
        return M.offset;
      }
    });
    var _ = Zr;
    Object.defineProperty(o, "prepend", {
      enumerable: true,
      get: function() {
        return _.prepend;
      }
    });
  })(We);
  var Jt = {};
  Object.defineProperty(Jt, "__esModule", {
    value: true
  });
  Jt.getContenteditableSlice = Dd;
  var Ld = We;
  function Dd(o, e, t, n, i) {
    var r;
    i === void 0 && (i = false);
    var s = document.createRange();
    if (n === "left" ? (s.setStart(o, 0), s.setEnd(e, t)) : (s.setStart(e, t), s.setEnd(o, o.childNodes.length)), i === true) {
      var a = s.extractContents();
      return (0, Ld.fragmentToString)(a);
    }
    var d = s.cloneContents(), u = document.createElement("div");
    u.appendChild(d);
    var p = (r = u.textContent) !== null && r !== void 0 ? r : "";
    return p;
  }
  Object.defineProperty(Xt, "__esModule", {
    value: true
  });
  Xt.checkContenteditableSliceForEmptiness = Hd;
  var Rd = We, jd = Jt;
  function Hd(o, e, t, n) {
    var i = (0, jd.getContenteditableSlice)(o, e, t, n);
    return (0, Rd.isCollapsedWhitespaces)(i);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.checkContenteditableSliceForEmptiness = void 0;
    var e = Xt;
    Object.defineProperty(o, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
  })(Vo);
  var Qr = {};
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getContenteditableSlice = void 0;
    var e = Jt;
    Object.defineProperty(o, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return e.getContenteditableSlice;
      }
    });
  })(Qr);
  var Jr = {}, Cn = {};
  Object.defineProperty(Cn, "__esModule", {
    value: true
  });
  Cn.focus = $d;
  var Fd = We;
  function $d(o, e) {
    var t, n;
    if (e === void 0 && (e = true), (0, Fd.isNativeInput)(o)) {
      o.focus();
      var i = e ? 0 : o.value.length;
      o.setSelectionRange(i, i);
    } else {
      var r = document.createRange(), s = window.getSelection();
      if (!s) return;
      var a = function(b) {
        var w = document.createTextNode("");
        b.appendChild(w), r.setStart(w, 0), r.setEnd(w, 0);
      }, d = function(b) {
        return b != null;
      }, u = o.childNodes, p = e ? u[0] : u[u.length - 1];
      if (d(p)) {
        for (; d(p) && p.nodeType !== Node.TEXT_NODE; ) p = e ? p.firstChild : p.lastChild;
        if (d(p) && p.nodeType === Node.TEXT_NODE) {
          var v = (n = (t = p.textContent) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0, i = e ? 0 : v;
          r.setStart(p, i), r.setEnd(p, i);
        } else a(o);
      } else a(o);
      s.removeAllRanges(), s.addRange(r);
    }
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.focus = void 0;
    var e = Cn;
    Object.defineProperty(o, "focus", {
      enumerable: true,
      get: function() {
        return e.focus;
      }
    });
  })(Jr);
  var Tn = {}, eo = {};
  Object.defineProperty(eo, "__esModule", {
    value: true
  });
  eo.getCaretNodeAndOffset = Vd;
  function Vd() {
    var o = window.getSelection();
    if (o === null) return [
      null,
      0
    ];
    var e = o.focusNode, t = o.focusOffset;
    return e === null ? [
      null,
      0
    ] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [
      e,
      t
    ]);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getCaretNodeAndOffset = void 0;
    var e = eo;
    Object.defineProperty(o, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return e.getCaretNodeAndOffset;
      }
    });
  })(Tn);
  var es = {}, to = {};
  Object.defineProperty(to, "__esModule", {
    value: true
  });
  to.getRange = Ud;
  function Ud() {
    var o = window.getSelection();
    return o && o.rangeCount ? o.getRangeAt(0) : null;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getRange = void 0;
    var e = to;
    Object.defineProperty(o, "getRange", {
      enumerable: true,
      get: function() {
        return e.getRange;
      }
    });
  })(es);
  var ts = {}, _n = {};
  Object.defineProperty(_n, "__esModule", {
    value: true
  });
  _n.isCaretAtEndOfInput = Wd;
  var Di = We, zd = Tn, qd = Vo;
  function Wd(o) {
    var e = (0, Di.getDeepestNode)(o, true);
    if (e === null) return true;
    if ((0, Di.isNativeInput)(e)) return e.selectionEnd === e.value.length;
    var t = (0, zd.getCaretNodeAndOffset)(), n = t[0], i = t[1];
    return n === null ? false : (0, qd.checkContenteditableSliceForEmptiness)(o, n, i, "right");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCaretAtEndOfInput = void 0;
    var e = _n;
    Object.defineProperty(o, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtEndOfInput;
      }
    });
  })(ts);
  var os = {}, Sn = {};
  Object.defineProperty(Sn, "__esModule", {
    value: true
  });
  Sn.isCaretAtStartOfInput = Kd;
  var _t = We, Yd = eo, Xd = Xt;
  function Kd(o) {
    var e = (0, _t.getDeepestNode)(o);
    if (e === null || (0, _t.isEmpty)(o)) return true;
    if ((0, _t.isNativeInput)(e)) return e.selectionEnd === 0;
    if ((0, _t.isEmpty)(o)) return true;
    var t = (0, Yd.getCaretNodeAndOffset)(), n = t[0], i = t[1];
    return n === null ? false : (0, Xd.checkContenteditableSliceForEmptiness)(o, n, i, "left");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCaretAtStartOfInput = void 0;
    var e = Sn;
    Object.defineProperty(o, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtStartOfInput;
      }
    });
  })(os);
  var ns = {}, Bn = {};
  Object.defineProperty(Bn, "__esModule", {
    value: true
  });
  Bn.save = Qd;
  var Gd = We, Zd = to;
  function Qd() {
    var o = (0, Zd.getRange)(), e = (0, Gd.make)("span");
    if (e.id = "cursor", e.hidden = true, !!o) return o.insertNode(e), function() {
      var t = window.getSelection();
      t && (o.setStartAfter(e), o.setEndAfter(e), t.removeAllRanges(), t.addRange(o), setTimeout(function() {
        e.remove();
      }, 150));
    };
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.save = void 0;
    var e = Bn;
    Object.defineProperty(o, "save", {
      enumerable: true,
      get: function() {
        return e.save;
      }
    });
  })(ns);
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.save = o.isCaretAtStartOfInput = o.isCaretAtEndOfInput = o.getRange = o.getCaretNodeAndOffset = o.focus = o.getContenteditableSlice = o.checkContenteditableSliceForEmptiness = void 0;
    var e = Vo;
    Object.defineProperty(o, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
    var t = Qr;
    Object.defineProperty(o, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return t.getContenteditableSlice;
      }
    });
    var n = Jr;
    Object.defineProperty(o, "focus", {
      enumerable: true,
      get: function() {
        return n.focus;
      }
    });
    var i = Tn;
    Object.defineProperty(o, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return i.getCaretNodeAndOffset;
      }
    });
    var r = es;
    Object.defineProperty(o, "getRange", {
      enumerable: true,
      get: function() {
        return r.getRange;
      }
    });
    var s = ts;
    Object.defineProperty(o, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return s.isCaretAtEndOfInput;
      }
    });
    var a = os;
    Object.defineProperty(o, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return a.isCaretAtStartOfInput;
      }
    });
    var d = ns;
    Object.defineProperty(o, "save", {
      enumerable: true,
      get: function() {
        return d.save;
      }
    });
  })(Nr);
  class Jd extends j {
    keydown(e) {
      switch (this.beforeKeydownProcessing(e), e.keyCode) {
        case L.BACKSPACE:
          this.backspace(e);
          break;
        case L.DELETE:
          this.delete(e);
          break;
        case L.ENTER:
          this.enter(e);
          break;
        case L.DOWN:
        case L.RIGHT:
          this.arrowRightAndDown(e);
          break;
        case L.UP:
        case L.LEFT:
          this.arrowLeftAndUp(e);
          break;
        case L.TAB:
          this.tabPressed(e);
          break;
      }
      e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(e), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
    }
    beforeKeydownProcessing(e) {
      this.needToolbarClosing(e) && nr(e.keyCode) && (this.Editor.Toolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
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
      const { BlockSelection: t, BlockManager: n, Caret: i } = this.Editor;
      t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
        const r = n.removeSelectedBlocks(), s = n.insertDefaultBlockAtIndex(r, true);
        i.setToBlock(s, i.positions.START), t.clearSelection(e);
      });
    }
    tabPressed(e) {
      const { InlineToolbar: t, Caret: n } = this.Editor;
      t.opened || (e.shiftKey ? n.navigatePrevious(true) : n.navigateNext(true)) && e.preventDefault();
    }
    commandSlashPressed() {
      this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
    }
    slashPressed(e) {
      this.Editor.BlockManager.currentBlock.isEmpty && (e.preventDefault(), this.Editor.Caret.insertContentAtCaretPosition("/"), this.activateToolbox());
    }
    enter(e) {
      const { BlockManager: t, UI: n } = this.Editor, i = t.currentBlock;
      if (i === void 0 || i.tool.isLineBreaksEnabled || n.someToolbarOpened && n.someFlipperButtonFocused || e.shiftKey && !To) return;
      let r = i;
      i.currentInput !== void 0 && At(i.currentInput) && !i.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : i.currentInput && It(i.currentInput) ? r = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : r = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(r), this.Editor.Toolbar.moveAndOpen(r), e.preventDefault();
    }
    backspace(e) {
      const { BlockManager: t, Caret: n } = this.Editor, { currentBlock: i, previousBlock: r } = t;
      if (!(i === void 0 || !O.isCollapsed || !i.currentInput || !At(i.currentInput))) {
        if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.firstInput) {
          n.navigatePrevious();
          return;
        }
        if (r !== null) {
          if (r.isEmpty) {
            t.removeBlock(r);
            return;
          }
          if (i.isEmpty) {
            t.removeBlock(i);
            const s = t.currentBlock;
            n.setToBlock(s, n.positions.END);
            return;
          }
          Mi(r, i) ? this.mergeBlocks(r, i) : n.setToBlock(r, n.positions.END);
        }
      }
    }
    delete(e) {
      const { BlockManager: t, Caret: n } = this.Editor, { currentBlock: i, nextBlock: r } = t;
      if (!(!O.isCollapsed || !It(i.currentInput))) {
        if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.lastInput) {
          n.navigateNext();
          return;
        }
        if (r !== null) {
          if (r.isEmpty) {
            t.removeBlock(r);
            return;
          }
          if (i.isEmpty) {
            t.removeBlock(i), n.setToBlock(r, n.positions.START);
            return;
          }
          Mi(i, r) ? this.mergeBlocks(i, r) : n.setToBlock(r, n.positions.START);
        }
      }
    }
    mergeBlocks(e, t) {
      const { BlockManager: n, Toolbar: i } = this.Editor;
      e.lastInput !== void 0 && (Nr.focus(e.lastInput, false), n.mergeBlocks(e, t).then(() => {
        i.close();
      }));
    }
    arrowRightAndDown(e) {
      const t = Ft.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === L.TAB);
      if (this.Editor.UI.someToolbarOpened && t) return;
      this.Editor.Toolbar.close();
      const { currentBlock: n } = this.Editor.BlockManager, i = ((n == null ? void 0 : n.currentInput) !== void 0 ? It(n.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
      if (e.shiftKey && e.keyCode === L.DOWN && i) {
        this.Editor.CrossBlockSelection.toggleBlockSelectedState();
        return;
      }
      if (e.keyCode === L.DOWN || e.keyCode === L.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
        e.preventDefault();
        return;
      }
      Lt(() => {
        this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
      }, 20)(), this.Editor.BlockSelection.clearSelection(e);
    }
    arrowLeftAndUp(e) {
      if (this.Editor.UI.someToolbarOpened) {
        if (Ft.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === L.TAB)) return;
        this.Editor.UI.closeAllToolbars();
      }
      this.Editor.Toolbar.close();
      const { currentBlock: t } = this.Editor.BlockManager, n = ((t == null ? void 0 : t.currentInput) !== void 0 ? At(t.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
      if (e.shiftKey && e.keyCode === L.UP && n) {
        this.Editor.CrossBlockSelection.toggleBlockSelectedState(false);
        return;
      }
      if (e.keyCode === L.UP || e.keyCode === L.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
        e.preventDefault();
        return;
      }
      Lt(() => {
        this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
      }, 20)(), this.Editor.BlockSelection.clearSelection(e);
    }
    needToolbarClosing(e) {
      const t = e.keyCode === L.ENTER && this.Editor.Toolbar.toolbox.opened, n = e.keyCode === L.ENTER && this.Editor.BlockSettings.opened, i = e.keyCode === L.ENTER && this.Editor.InlineToolbar.opened, r = e.keyCode === L.TAB;
      return !(e.shiftKey || r || t || n || i);
    }
    activateToolbox() {
      this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
    }
    activateBlockSettings() {
      this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
    }
  }
  class wo {
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
      return ir(this.workingArea.children);
    }
    static set(e, t, n) {
      return isNaN(Number(t)) ? (Reflect.set(e, t, n), true) : (e.insert(+t, n), true);
    }
    static get(e, t) {
      return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
    }
    push(e) {
      this.blocks.push(e), this.insertToDOM(e);
    }
    swap(e, t) {
      const n = this.blocks[t];
      k.swap(this.blocks[e].holder, n.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = n;
    }
    move(e, t) {
      const n = this.blocks.splice(t, 1)[0], i = e - 1, r = Math.max(0, i), s = this.blocks[r];
      e > 0 ? this.insertToDOM(n, "afterend", s) : this.insertToDOM(n, "beforebegin", s), this.blocks.splice(e, 0, n);
      const a = this.composeBlockEvent("move", {
        fromIndex: t,
        toIndex: e
      });
      n.call(Me.MOVED, a);
    }
    insert(e, t, n = false) {
      if (!this.length) {
        this.push(t);
        return;
      }
      e > this.length && (e = this.length), n && (this.blocks[e].holder.remove(), this.blocks[e].call(Me.REMOVED));
      const i = n ? 1 : 0;
      if (this.blocks.splice(e, i, t), e > 0) {
        const r = this.blocks[e - 1];
        this.insertToDOM(t, "afterend", r);
      } else {
        const r = this.blocks[e + 1];
        r ? this.insertToDOM(t, "beforebegin", r) : this.insertToDOM(t);
      }
    }
    replace(e, t) {
      if (this.blocks[e] === void 0) throw Error("Incorrect index");
      this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
    }
    insertMany(e, t) {
      const n = new DocumentFragment();
      for (const i of e) n.appendChild(i.holder);
      if (this.length > 0) {
        if (t > 0) {
          const i = Math.min(t - 1, this.length - 1);
          this.blocks[i].holder.after(n);
        } else t === 0 && this.workingArea.prepend(n);
        this.blocks.splice(t, 0, ...e);
      } else this.blocks.push(...e), this.workingArea.appendChild(n);
      e.forEach((i) => i.call(Me.RENDERED));
    }
    remove(e) {
      isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(Me.REMOVED), this.blocks.splice(e, 1);
    }
    removeAll() {
      this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(Me.REMOVED)), this.blocks.length = 0;
    }
    insertAfter(e, t) {
      const n = this.blocks.indexOf(e);
      this.insert(n + 1, t);
    }
    get(e) {
      return this.blocks[e];
    }
    indexOf(e) {
      return this.blocks.indexOf(e);
    }
    insertToDOM(e, t, n) {
      t ? n.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(Me.RENDERED);
    }
    composeBlockEvent(e, t) {
      return new CustomEvent(e, {
        detail: t
      });
    }
  }
  const Ri = "block-removed", ji = "block-added", eu = "block-moved", Hi = "block-changed";
  class tu {
    constructor() {
      this.completed = Promise.resolve();
    }
    add(e) {
      return new Promise((t, n) => {
        this.completed = this.completed.then(e).then(t).catch(n);
      });
    }
  }
  class ou extends j {
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
      const e = new wo(this.Editor.UI.nodes.redactor);
      this._blocks = new Proxy(e, {
        set: wo.set,
        get: wo.get
      }), this.listeners.on(document, "copy", (t) => this.Editor.BlockEvents.handleCommandC(t));
    }
    toggleReadOnly(e) {
      e ? this.disableModuleBindings() : this.enableModuleBindings();
    }
    composeBlock({ tool: e, data: t = {}, id: n = void 0, tunes: i = {} }) {
      const r = this.Editor.ReadOnly.isEnabled, s = this.Editor.Tools.blockTools.get(e), a = new Ae({
        id: n,
        data: t,
        tool: s,
        api: this.Editor.API,
        readOnly: r,
        tunesData: i
      }, this.eventsDispatcher);
      return r || window.requestIdleCallback(() => {
        this.bindBlockEvents(a);
      }, {
        timeout: 2e3
      }), a;
    }
    insert({ id: e = void 0, tool: t = this.config.defaultBlock, data: n = {}, index: i, needToFocus: r = true, replace: s = false, tunes: a = {} } = {}) {
      let d = i;
      d === void 0 && (d = this.currentBlockIndex + (s ? 0 : 1));
      const u = this.composeBlock({
        id: e,
        tool: t,
        data: n,
        tunes: a
      });
      return s && this.blockDidMutated(Ri, this.getBlockByIndex(d), {
        index: d
      }), this._blocks.insert(d, u, s), this.blockDidMutated(ji, u, {
        index: d
      }), r ? this.currentBlockIndex = d : d <= this.currentBlockIndex && this.currentBlockIndex++, u;
    }
    insertMany(e, t = 0) {
      this._blocks.insertMany(e, t);
    }
    async update(e, t, n) {
      if (!t && !n) return e;
      const i = await e.data, r = this.composeBlock({
        id: e.id,
        tool: e.name,
        data: Object.assign({}, i, t ?? {}),
        tunes: n ?? e.tunes
      }), s = this.getBlockIndex(e);
      return this._blocks.replace(s, r), this.blockDidMutated(Hi, r, {
        index: s
      }), r;
    }
    replace(e, t, n) {
      const i = this.getBlockIndex(e);
      return this.insert({
        tool: t,
        data: n,
        index: i,
        replace: true
      });
    }
    paste(e, t, n = false) {
      const i = this.insert({
        tool: e,
        replace: n
      });
      try {
        window.requestIdleCallback(() => {
          i.call(Me.ON_PASTE, t);
        });
      } catch (r) {
        W(`${e}: onPaste callback call is failed`, "error", r);
      }
      return i;
    }
    insertDefaultBlockAtIndex(e, t = false) {
      const n = this.composeBlock({
        tool: this.config.defaultBlock
      });
      return this._blocks[e] = n, this.blockDidMutated(ji, n, {
        index: e
      }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, n;
    }
    insertAtEnd() {
      return this.currentBlockIndex = this.blocks.length - 1, this.insert();
    }
    async mergeBlocks(e, t) {
      let n;
      if (e.name === t.name && e.mergeable) {
        const i = await t.data;
        if (ke(i)) {
          console.error("Could not merge Block. Failed to extract original Block data.");
          return;
        }
        const [r] = Lo([
          i
        ], e.tool.sanitizeConfig);
        n = r;
      } else if (e.mergeable && Rt(t, "export") && Rt(e, "import")) {
        const i = await t.exportDataAsString(), r = Te(i, e.tool.sanitizeConfig);
        n = Ai(r, e.tool.conversionConfig);
      }
      n !== void 0 && (await e.mergeWith(n), this.removeBlock(t), this.currentBlockIndex = this._blocks.indexOf(e));
    }
    removeBlock(e, t = true) {
      return new Promise((n) => {
        const i = this._blocks.indexOf(e);
        if (!this.validateIndex(i)) throw new Error("Can't find a Block to remove");
        e.destroy(), this._blocks.remove(i), this.blockDidMutated(Ri, e, {
          index: i
        }), this.currentBlockIndex >= i && this.currentBlockIndex--, this.blocks.length ? i === 0 && (this.currentBlockIndex = 0) : (this.unsetCurrentBlock(), t && this.insert()), n();
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
      const n = {
        text: k.isEmpty(t) ? "" : t.innerHTML
      };
      return this.insert({
        data: n
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
      const t = this._blocks.nodes, n = e.closest(`.${Ae.CSS.wrapper}`), i = t.indexOf(n);
      if (i >= 0) return this._blocks[i];
    }
    setCurrentBlockByChildNode(e) {
      k.isElement(e) || (e = e.parentNode);
      const t = e.closest(`.${Ae.CSS.wrapper}`);
      if (!t) return;
      const n = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
      if (n != null && n.isEqualNode(this.Editor.UI.nodes.wrapper)) return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
    }
    getBlockByChildNode(e) {
      if (!e || !(e instanceof Node)) return;
      k.isElement(e) || (e = e.parentNode);
      const t = e.closest(`.${Ae.CSS.wrapper}`);
      return this.blocks.find((n) => n.holder === t);
    }
    swap(e, t) {
      this._blocks.swap(e, t), this.currentBlockIndex = t;
    }
    move(e, t = this.currentBlockIndex) {
      if (isNaN(e) || isNaN(t)) {
        W("Warning during 'move' call: incorrect indices provided.", "warn");
        return;
      }
      if (!this.validateIndex(e) || !this.validateIndex(t)) {
        W("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
        return;
      }
      this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(eu, this.currentBlock, {
        fromIndex: t,
        toIndex: e
      });
    }
    async convert(e, t, n) {
      if (!await e.save()) throw new Error("Could not convert Block. Failed to extract original Block data.");
      const i = this.Editor.Tools.blockTools.get(t);
      if (!i) throw new Error(`Could not convert Block. Tool \xAB${t}\xBB not found.`);
      const r = await e.exportDataAsString(), s = Te(r, i.sanitizeConfig);
      let a = Ai(s, i.conversionConfig, i.settings);
      return n && (a = Object.assign(a, n)), this.replace(e, i.name, a);
    }
    unsetCurrentBlock() {
      this.currentBlockIndex = -1;
    }
    async clear(e = false) {
      const t = new tu();
      this.blocks.forEach((n) => {
        t.add(async () => {
          await this.removeBlock(n, false);
        });
      }), await t.completed, this.unsetCurrentBlock(), e && this.insert(), this.Editor.UI.checkEmptiness();
    }
    async destroy() {
      await Promise.all(this.blocks.map((e) => e.destroy()));
    }
    bindBlockEvents(e) {
      const { BlockEvents: t } = this.Editor;
      this.readOnlyMutableListeners.on(e.holder, "keydown", (n) => {
        t.keydown(n);
      }), this.readOnlyMutableListeners.on(e.holder, "keyup", (n) => {
        t.keyup(n);
      }), this.readOnlyMutableListeners.on(e.holder, "dragover", (n) => {
        t.dragOver(n);
      }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (n) => {
        t.dragLeave(n);
      }), e.on("didMutated", (n) => this.blockDidMutated(Hi, n, {
        index: this.getBlockIndex(n)
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
    blockDidMutated(e, t, n) {
      const i = new CustomEvent(e, {
        detail: {
          target: new Oe(t),
          ...n
        }
      });
      return this.eventsDispatcher.emit(dr, {
        event: i
      }), t;
    }
  }
  class nu extends j {
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
      t.blocks.forEach((n) => {
        n.selected = e;
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
      this.selection = new O(), it.add({
        name: "CMD+A",
        handler: (e) => {
          const { BlockManager: t, ReadOnly: n } = this.Editor;
          if (n.isEnabled) {
            e.preventDefault(), this.selectAllBlocks();
            return;
          }
          t.currentBlock && this.handleCommandA(e);
        },
        on: this.Editor.UI.nodes.redactor
      });
    }
    toggleReadOnly() {
      O.get().removeAllRanges(), this.allBlocksSelected = false;
    }
    unSelectBlockByIndex(e) {
      const { BlockManager: t } = this.Editor;
      let n;
      isNaN(e) ? n = t.currentBlock : n = t.getBlockByIndex(e), n.selected = false, this.clearCache();
    }
    clearSelection(e, t = false) {
      const { BlockManager: n, Caret: i, RectangleSelection: r } = this.Editor;
      this.needToSelectAll = false, this.nativeInputSelected = false, this.readyToBlockSelection = false;
      const s = e && e instanceof KeyboardEvent, a = s && nr(e.keyCode);
      if (this.anyBlockSelected && s && a && !O.isSelectionExists) {
        const d = n.removeSelectedBlocks();
        n.insertDefaultBlockAtIndex(d, true), i.setToBlock(n.currentBlock), Lt(() => {
          const u = e.key;
          i.insertContentAtCaretPosition(u.length > 1 ? "" : u);
        }, 20)();
      }
      if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || r.isRectActivated()) {
        this.Editor.RectangleSelection.clearSelection();
        return;
      }
      t && this.selection.restore(), this.allBlocksSelected = false;
    }
    copySelectedBlocks(e) {
      e.preventDefault();
      const t = k.make("div");
      this.selectedBlocks.forEach((r) => {
        const s = Te(r.holder.innerHTML, this.sanitizerConfig), a = k.make("p");
        a.innerHTML = s, t.appendChild(a);
      });
      const n = Array.from(t.childNodes).map((r) => r.textContent).join(`

`), i = t.innerHTML;
      return e.clipboardData.setData("text/plain", n), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((r) => r.save())).then((r) => {
        try {
          e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(r));
        } catch {
        }
      });
    }
    selectBlockByIndex(e) {
      const { BlockManager: t } = this.Editor, n = t.getBlockByIndex(e);
      n !== void 0 && this.selectBlock(n);
    }
    selectBlock(e) {
      this.selection.save(), O.get().removeAllRanges(), e.selected = true, this.clearCache(), this.Editor.InlineToolbar.close();
    }
    unselectBlock(e) {
      e.selected = false, this.clearCache();
    }
    clearCache() {
      this.anyBlockSelectedCache = null;
    }
    destroy() {
      it.remove(this.Editor.UI.nodes.redactor, "CMD+A");
    }
    handleCommandA(e) {
      if (this.Editor.RectangleSelection.clearSelection(), k.isNativeInput(e.target) && !this.readyToBlockSelection) {
        this.readyToBlockSelection = true;
        return;
      }
      const t = this.Editor.BlockManager.getBlock(e.target), n = t.inputs;
      if (n.length > 1 && !this.readyToBlockSelection) {
        this.readyToBlockSelection = true;
        return;
      }
      if (n.length === 1 && !this.needToSelectAll) {
        this.needToSelectAll = true;
        return;
      }
      this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = false, this.readyToBlockSelection = false) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = true);
    }
    selectAllBlocks() {
      this.selection.save(), O.get().removeAllRanges(), this.allBlocksSelected = true, this.Editor.InlineToolbar.close();
    }
  }
  let iu = class Ao extends j {
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
    setToBlock(e, t = this.positions.DEFAULT, n = 0) {
      var i;
      const { BlockManager: r, BlockSelection: s } = this.Editor;
      if (s.clearSelection(), !e.focusable) {
        (i = window.getSelection()) == null || i.removeAllRanges(), s.selectBlock(e), r.currentBlock = e;
        return;
      }
      let a;
      switch (t) {
        case this.positions.START:
          a = e.firstInput;
          break;
        case this.positions.END:
          a = e.lastInput;
          break;
        default:
          a = e.currentInput;
      }
      if (!a) return;
      const d = k.getDeepestNode(a, t === this.positions.END), u = k.getContentLength(d);
      switch (true) {
        case t === this.positions.START:
          n = 0;
          break;
        case t === this.positions.END:
        case n > u:
          n = u;
          break;
      }
      this.set(d, n), r.setCurrentBlockByChildNode(e.holder), r.currentBlock.currentInput = a;
    }
    setToInput(e, t = this.positions.DEFAULT, n = 0) {
      const { currentBlock: i } = this.Editor.BlockManager, r = k.getDeepestNode(e);
      switch (t) {
        case this.positions.START:
          this.set(r, 0);
          break;
        case this.positions.END:
          this.set(r, k.getContentLength(r));
          break;
        default:
          n && this.set(r, n);
      }
      i.currentInput = e;
    }
    set(e, t = 0) {
      const { top: n, bottom: i } = O.setCursor(e, t), { innerHeight: r } = window;
      n < 0 ? window.scrollBy(0, n - 30) : i > r && window.scrollBy(0, i - r + 30);
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
      const e = O.get();
      if (e.rangeCount) {
        const t = e.getRangeAt(0), n = this.Editor.BlockManager.currentBlock.currentInput;
        if (t.deleteContents(), n) if (k.isNativeInput(n)) {
          const i = n, r = document.createDocumentFragment(), s = i.value.substring(0, i.selectionStart), a = i.value.substring(i.selectionStart);
          return r.textContent = a, i.value = s, r;
        } else {
          const i = t.cloneRange();
          return i.selectNodeContents(n), i.setStart(t.endContainer, t.endOffset), i.extractContents();
        }
      }
    }
    navigateNext(e = false) {
      const { BlockManager: t } = this.Editor, { currentBlock: n, nextBlock: i } = t;
      if (n === void 0) return false;
      const { nextInput: r, currentInput: s } = n, a = s !== void 0 ? It(s) : void 0;
      let d = i;
      const u = e || a || !n.focusable;
      if (r && u) return this.setToInput(r, this.positions.START), true;
      if (d === null) {
        if (n.tool.isDefault || !u) return false;
        d = t.insertAtEnd();
      }
      return u ? (this.setToBlock(d, this.positions.START), true) : false;
    }
    navigatePrevious(e = false) {
      const { currentBlock: t, previousBlock: n } = this.Editor.BlockManager;
      if (!t) return false;
      const { previousInput: i, currentInput: r } = t, s = r !== void 0 ? At(r) : void 0, a = e || s || !t.focusable;
      return i && a ? (this.setToInput(i, this.positions.END), true) : n !== null && a ? (this.setToBlock(n, this.positions.END), true) : false;
    }
    createShadow(e) {
      const t = document.createElement("span");
      t.classList.add(Ao.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
    }
    restoreCaret(e) {
      const t = e.querySelector(`.${Ao.CSS.shadowCaret}`);
      if (!t) return;
      new O().expandToTag(t);
      const n = document.createRange();
      n.selectNode(t), n.extractContents();
    }
    insertContentAtCaretPosition(e) {
      const t = document.createDocumentFragment(), n = document.createElement("div"), i = O.get(), r = O.range;
      n.innerHTML = e, Array.from(n.childNodes).forEach((u) => t.appendChild(u)), t.childNodes.length === 0 && t.appendChild(new Text());
      const s = t.lastChild;
      r.deleteContents(), r.insertNode(t);
      const a = document.createRange(), d = s.nodeType === Node.TEXT_NODE ? s : s.firstChild;
      d !== null && d.textContent !== null && a.setStart(d, d.textContent.length), i.removeAllRanges(), i.addRange(a);
    }
  };
  class ru extends j {
    constructor() {
      super(...arguments), this.onMouseUp = () => {
        this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
      }, this.onMouseOver = (e) => {
        const { BlockManager: t, BlockSelection: n } = this.Editor;
        if (e.relatedTarget === null && e.target === null) return;
        const i = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, r = t.getBlockByChildNode(e.target);
        if (!(!i || !r) && r !== i) {
          if (i === this.firstSelectedBlock) {
            O.get().removeAllRanges(), i.selected = true, r.selected = true, n.clearCache();
            return;
          }
          if (r === this.firstSelectedBlock) {
            i.selected = false, r.selected = false, n.clearCache();
            return;
          }
          this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(i, r), this.lastSelectedBlock = r;
        }
      };
    }
    async prepare() {
      this.listeners.on(document, "mousedown", (e) => {
        this.enableCrossBlockSelection(e);
      });
    }
    watchSelection(e) {
      if (e.button !== qa.LEFT) return;
      const { BlockManager: t } = this.Editor;
      this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
    }
    get isCrossBlockSelectionStarted() {
      return !!this.firstSelectedBlock && !!this.lastSelectedBlock && this.firstSelectedBlock !== this.lastSelectedBlock;
    }
    toggleBlockSelectedState(e = true) {
      const { BlockManager: t, BlockSelection: n } = this.Editor;
      this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = true, n.clearCache(), O.get().removeAllRanges());
      const i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), r = t.blocks[i];
      r && (this.lastSelectedBlock.selected !== r.selected ? (r.selected = true, n.clearCache()) : (this.lastSelectedBlock.selected = false, n.clearCache()), this.lastSelectedBlock = r, this.Editor.InlineToolbar.close(), r.holder.scrollIntoView({
        block: "nearest"
      }));
    }
    clear(e) {
      const { BlockManager: t, BlockSelection: n, Caret: i } = this.Editor, r = t.blocks.indexOf(this.firstSelectedBlock), s = t.blocks.indexOf(this.lastSelectedBlock);
      if (n.anyBlockSelected && r > -1 && s > -1 && e && e instanceof KeyboardEvent) switch (e.keyCode) {
        case L.DOWN:
        case L.RIGHT:
          i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
          break;
        case L.UP:
        case L.LEFT:
          i.setToBlock(t.blocks[Math.min(r, s)], i.positions.START);
          break;
        default:
          i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
      }
      this.firstSelectedBlock = this.lastSelectedBlock = null;
    }
    enableCrossBlockSelection(e) {
      const { UI: t } = this.Editor;
      O.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
    }
    toggleBlocksSelectedState(e, t) {
      const { BlockManager: n, BlockSelection: i } = this.Editor, r = n.blocks.indexOf(e), s = n.blocks.indexOf(t), a = e.selected !== t.selected;
      for (let d = Math.min(r, s); d <= Math.max(r, s); d++) {
        const u = n.blocks[d];
        u !== this.firstSelectedBlock && u !== (a ? e : t) && (n.blocks[d].selected = !n.blocks[d].selected, i.clearCache());
      }
    }
  }
  class su extends j {
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
      const { BlockManager: t, Paste: n, Caret: i } = this.Editor;
      e.preventDefault(), t.blocks.forEach((s) => {
        s.dropTarget = false;
      }), O.isAtEditor && !O.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = false;
      const r = t.setCurrentBlockByChildNode(e.target);
      if (r) this.Editor.Caret.setToBlock(r, i.positions.END);
      else {
        const s = t.setCurrentBlockByChildNode(t.lastBlock.holder);
        this.Editor.Caret.setToBlock(s, i.positions.END);
      }
      await n.processDataTransfer(e.dataTransfer, true);
    }
    processDragStart() {
      O.isAtEditor && !O.isCollapsed && (this.isStartedAtEditor = true), this.Editor.InlineToolbar.close();
    }
    processDragOver(e) {
      e.preventDefault();
    }
  }
  const au = 180, lu = 400;
  class cu extends j {
    constructor({ config: e, eventsDispatcher: t }) {
      super({
        config: e,
        eventsDispatcher: t
      }), this.disabled = false, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = lu, this.mutationObserver = new MutationObserver((n) => {
        this.redactorChanged(n);
      }), this.eventsDispatcher.on(dr, (n) => {
        this.particularBlockChanged(n.event);
      }), this.eventsDispatcher.on(ur, () => {
        this.disable();
      }), this.eventsDispatcher.on(hr, () => {
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
      this.disabled || !ee(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
        let t;
        this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
      }, this.batchTime));
    }
    redactorChanged(e) {
      this.eventsDispatcher.emit(_o, {
        mutations: e
      });
    }
  }
  const is = class rs extends j {
    constructor() {
      super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (e) => {
        try {
          const t = e.create({}, {}, false);
          if (e.pasteConfig === false) {
            this.exceptionList.push(e.name);
            return;
          }
          if (!ee(t.onPaste)) return;
          this.getTagsConfig(e), this.getFilesConfig(e), this.getPatternsConfig(e);
        } catch (t) {
          W(`Paste handling for \xAB${e.name}\xBB Tool hasn't been set up because of the error`, "warn", t);
        }
      }, this.handlePasteEvent = async (e) => {
        const { BlockManager: t, Toolbar: n } = this.Editor, i = t.setCurrentBlockByChildNode(e.target);
        !i || this.isNativeBehaviour(e.target) && !e.clipboardData.types.includes("Files") || i && this.exceptionList.includes(i.name) || (e.preventDefault(), this.processDataTransfer(e.clipboardData), n.close());
      };
    }
    async prepare() {
      this.processTools();
    }
    toggleReadOnly(e) {
      e ? this.unsetCallback() : this.setCallback();
    }
    async processDataTransfer(e, t = false) {
      const { Tools: n } = this.Editor, i = e.types;
      if ((i.includes ? i.includes("Files") : i.contains("Files")) && !ke(this.toolsFiles)) {
        await this.processFiles(e.files);
        return;
      }
      const r = e.getData(this.MIME_TYPE), s = e.getData("text/plain");
      let a = e.getData("text/html");
      if (r) try {
        this.insertEditorJSData(JSON.parse(r));
        return;
      } catch {
      }
      t && s.trim() && a.trim() && (a = "<p>" + (a.trim() ? a : s) + "</p>");
      const d = Object.keys(this.toolsTags).reduce((v, b) => (v[b.toLowerCase()] = this.toolsTags[b].sanitizationConfig ?? {}, v), {}), u = Object.assign({}, d, n.getAllInlineToolsSanitizeConfig(), {
        br: {}
      }), p = Te(a, u);
      !p.trim() || p.trim() === s || !k.isHTMLString(p) ? await this.processText(s) : await this.processText(p, true);
    }
    async processText(e, t = false) {
      const { Caret: n, BlockManager: i } = this.Editor, r = t ? this.processHTML(e) : this.processPlain(e);
      if (!r.length) return;
      if (r.length === 1) {
        r[0].isBlock ? this.processSingleBlock(r.pop()) : this.processInlinePaste(r.pop());
        return;
      }
      const s = i.currentBlock && i.currentBlock.tool.isDefault && i.currentBlock.isEmpty;
      r.map(async (a, d) => this.insertBlock(a, d === 0 && s)), i.currentBlock && n.setToBlock(i.currentBlock, n.positions.END);
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
      ] : ce(e) ? Object.keys(e) : [];
    }
    getTagsConfig(e) {
      if (e.pasteConfig === false) return;
      const t = e.pasteConfig.tags || [], n = [];
      t.forEach((i) => {
        const r = this.collectTagNames(i);
        n.push(...r), r.forEach((s) => {
          if (Object.prototype.hasOwnProperty.call(this.toolsTags, s)) {
            W(`Paste handler for \xAB${e.name}\xBB Tool on \xAB${s}\xBB tag is skipped because it is already used by \xAB${this.toolsTags[s].tool.name}\xBB Tool.`, "warn");
            return;
          }
          const a = ce(i) ? i[s] : null;
          this.toolsTags[s.toUpperCase()] = {
            tool: e,
            sanitizationConfig: a
          };
        });
      }), this.tagsByTool[e.name] = n.map((i) => i.toUpperCase());
    }
    getFilesConfig(e) {
      if (e.pasteConfig === false) return;
      const { files: t = {} } = e.pasteConfig;
      let { extensions: n, mimeTypes: i } = t;
      !n && !i || (n && !Array.isArray(n) && (W(`\xABextensions\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), n = []), i && !Array.isArray(i) && (W(`\xABmimeTypes\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), i = []), i && (i = i.filter((r) => Ga(r) ? true : (W(`MIME type value \xAB${r}\xBB for the \xAB${e.name}\xBB Tool is not a valid MIME type`, "warn"), false))), this.toolsFiles[e.name] = {
        extensions: n || [],
        mimeTypes: i || []
      });
    }
    getPatternsConfig(e) {
      e.pasteConfig === false || !e.pasteConfig.patterns || ke(e.pasteConfig.patterns) || Object.entries(e.pasteConfig.patterns).forEach(([t, n]) => {
        n instanceof RegExp || W(`Pattern ${n} for \xAB${e.name}\xBB Tool is skipped because it should be a Regexp instance.`, "warn"), this.toolsPatterns.push({
          key: t,
          pattern: n,
          tool: e
        });
      });
    }
    isNativeBehaviour(e) {
      return k.isNativeInput(e);
    }
    async processFiles(e) {
      const { BlockManager: t } = this.Editor;
      let n;
      n = await Promise.all(Array.from(e).map((r) => this.processFile(r))), n = n.filter((r) => !!r);
      const i = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
      n.forEach((r, s) => {
        t.paste(r.type, r.event, s === 0 && i);
      });
    }
    async processFile(e) {
      const t = Ka(e), n = Object.entries(this.toolsFiles).find(([r, { mimeTypes: s, extensions: a }]) => {
        const [d, u] = e.type.split("/"), p = a.find((b) => b.toLowerCase() === t.toLowerCase()), v = s.find((b) => {
          const [w, y] = b.split("/");
          return w === d && (y === u || y === "*");
        });
        return !!p || !!v;
      });
      if (!n) return;
      const [i] = n;
      return {
        event: this.composePasteEvent("file", {
          file: e
        }),
        type: i
      };
    }
    processHTML(e) {
      const { Tools: t } = this.Editor, n = k.make("DIV");
      return n.innerHTML = e, this.getNodes(n).map((i) => {
        let r, s = t.defaultTool, a = false;
        switch (i.nodeType) {
          case Node.DOCUMENT_FRAGMENT_NODE:
            r = k.make("div"), r.appendChild(i);
            break;
          case Node.ELEMENT_NODE:
            r = i, a = true, this.toolsTags[r.tagName] && (s = this.toolsTags[r.tagName].tool);
            break;
        }
        const { tags: d } = s.pasteConfig || {
          tags: []
        }, u = d.reduce((b, w) => (this.collectTagNames(w).forEach((y) => {
          const T = ce(w) ? w[y] : null;
          b[y.toLowerCase()] = T || {};
        }), b), {}), p = Object.assign({}, u, s.baseSanitizeConfig);
        if (r.tagName.toLowerCase() === "table") {
          const b = Te(r.outerHTML, p);
          r = k.make("div", void 0, {
            innerHTML: b
          }).firstChild;
        } else r.innerHTML = Te(r.innerHTML, p);
        const v = this.composePasteEvent("tag", {
          data: r
        });
        return {
          content: r,
          isBlock: a,
          tool: s.name,
          event: v
        };
      }).filter((i) => {
        const r = k.isEmpty(i.content), s = k.isSingleTag(i.content);
        return !r || s;
      });
    }
    processPlain(e) {
      const { defaultBlock: t } = this.config;
      if (!e) return [];
      const n = t;
      return e.split(/\r?\n/).filter((i) => i.trim()).map((i) => {
        const r = k.make("div");
        r.textContent = i;
        const s = this.composePasteEvent("tag", {
          data: r
        });
        return {
          content: r,
          tool: n,
          isBlock: false,
          event: s
        };
      });
    }
    async processSingleBlock(e) {
      const { Caret: t, BlockManager: n } = this.Editor, { currentBlock: i } = n;
      if (!i || e.tool !== i.name || !k.containsOnlyInlineElements(e.content.innerHTML)) {
        this.insertBlock(e, (i == null ? void 0 : i.tool.isDefault) && i.isEmpty);
        return;
      }
      t.insertContentAtCaretPosition(e.content.innerHTML);
    }
    async processInlinePaste(e) {
      const { BlockManager: t, Caret: n } = this.Editor, { content: i } = e;
      if (t.currentBlock && t.currentBlock.tool.isDefault && i.textContent.length < rs.PATTERN_PROCESSING_MAX_LENGTH) {
        const r = await this.processPattern(i.textContent);
        if (r) {
          const s = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, a = t.paste(r.tool, r.event, s);
          n.setToBlock(a, n.positions.END);
          return;
        }
      }
      if (t.currentBlock && t.currentBlock.currentInput) {
        const r = t.currentBlock.tool.baseSanitizeConfig;
        document.execCommand("insertHTML", false, Te(i.innerHTML, r));
      } else this.insertBlock(e);
    }
    async processPattern(e) {
      const t = this.toolsPatterns.find((n) => {
        const i = n.pattern.exec(e);
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
      const { BlockManager: n, Caret: i } = this.Editor, { currentBlock: r } = n;
      let s;
      if (t && r && r.isEmpty) {
        s = n.paste(e.tool, e.event, true), i.setToBlock(s, i.positions.END);
        return;
      }
      s = n.paste(e.tool, e.event), i.setToBlock(s, i.positions.END);
    }
    insertEditorJSData(e) {
      const { BlockManager: t, Caret: n, Tools: i } = this.Editor;
      Lo(e, (r) => i.blockTools.get(r).sanitizeConfig).forEach(({ tool: r, data: s }, a) => {
        let d = false;
        a === 0 && (d = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
        const u = t.insert({
          tool: r,
          data: s,
          replace: d
        });
        n.setToBlock(u, n.positions.END);
      });
    }
    processElementNode(e, t, n) {
      const i = Object.keys(this.toolsTags), r = e, { tool: s } = this.toolsTags[r.tagName] || {}, a = this.tagsByTool[s == null ? void 0 : s.name] || [], d = i.includes(r.tagName), u = k.blockElements.includes(r.tagName.toLowerCase()), p = Array.from(r.children).some(({ tagName: b }) => i.includes(b) && !a.includes(b)), v = Array.from(r.children).some(({ tagName: b }) => k.blockElements.includes(b.toLowerCase()));
      if (!u && !d && !p) return n.appendChild(r), [
        ...t,
        n
      ];
      if (d && !p || u && !v && !p) return [
        ...t,
        n,
        r
      ];
    }
    getNodes(e) {
      const t = Array.from(e.childNodes);
      let n;
      const i = (r, s) => {
        if (k.isEmpty(s) && !k.isSingleTag(s)) return r;
        const a = r[r.length - 1];
        let d = new DocumentFragment();
        switch (a && k.isFragment(a) && (d = r.pop()), s.nodeType) {
          case Node.ELEMENT_NODE:
            if (n = this.processElementNode(s, r, d), n) return n;
            break;
          case Node.TEXT_NODE:
            return d.appendChild(s), [
              ...r,
              d
            ];
          default:
            return [
              ...r,
              d
            ];
        }
        return [
          ...r,
          ...Array.from(s.childNodes).reduce(i, [])
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
  is.PATTERN_PROCESSING_MAX_LENGTH = 450;
  let du = is;
  class uu extends j {
    constructor() {
      super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = false;
    }
    get isEnabled() {
      return this.readOnlyEnabled;
    }
    async prepare() {
      const { Tools: e } = this.Editor, { blockTools: t } = e, n = [];
      Array.from(t.entries()).forEach(([i, r]) => {
        r.isReadOnlySupported || n.push(i);
      }), this.toolsDontSupportReadOnly = n, this.config.readOnly && n.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly, true);
    }
    async toggle(e = !this.readOnlyEnabled, t = false) {
      e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
      const n = this.readOnlyEnabled;
      this.readOnlyEnabled = e;
      for (const r in this.Editor) this.Editor[r].toggleReadOnly && this.Editor[r].toggleReadOnly(e);
      if (n === e) return this.readOnlyEnabled;
      if (t) return this.readOnlyEnabled;
      this.Editor.ModificationsObserver.disable();
      const i = await this.Editor.Saver.save();
      return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(i.blocks), this.Editor.ModificationsObserver.enable(), this.readOnlyEnabled;
    }
    throwCriticalError() {
      throw new cr(`To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`);
    }
  }
  class ft extends j {
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
      const n = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
      n.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = false, this.clearSelection(), this.stackOfSelected = []);
      const i = [
        `.${Ae.CSS.content}`,
        `.${this.Editor.Toolbar.CSS.toolbar}`,
        `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
      ], r = n.closest("." + this.Editor.UI.CSS.editorWrapper), s = i.some((a) => !!n.closest(a));
      !r || s || (this.mousedown = true, this.startX = e, this.startY = t);
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
      }, false), this.listeners.on(document.body, "mousemove", Eo((t) => {
        this.processMouseMove(t);
      }, 10), {
        passive: true
      }), this.listeners.on(document.body, "mouseleave", () => {
        this.processMouseLeave();
      }), this.listeners.on(window, "scroll", Eo((t) => {
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
      const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), n = k.make("div", ft.CSS.overlay, {}), i = k.make("div", ft.CSS.overlayContainer, {}), r = k.make("div", ft.CSS.rect, {});
      return i.appendChild(r), n.appendChild(i), t.appendChild(n), this.overlayRectangle = r, {
        container: t,
        overlay: n
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
      const { rightPos: t, leftPos: n, index: i } = this.genInfoForMouseSelection(), r = this.startX > t && this.mouseX > t, s = this.startX < n && this.mouseX < n;
      this.rectCrossesBlocks = !(r || s), this.isRectSelectionActivated || (this.rectCrossesBlocks = false, this.isRectSelectionActivated = true, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), O.get().removeAllRanges());
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
      const e = document.body.offsetWidth / 2, t = this.mouseY - window.pageYOffset, n = document.elementFromPoint(e, t), i = this.Editor.BlockManager.getBlockByChildNode(n);
      let r;
      i !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex((p) => p.holder === i.holder));
      const s = this.Editor.BlockManager.lastBlock.holder.querySelector("." + Ae.CSS.content), a = Number.parseInt(window.getComputedStyle(s).width, 10) / 2, d = e - a, u = e + a;
      return {
        index: r,
        leftPos: d,
        rightPos: u
      };
    }
    addBlockInSelection(e) {
      this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
    }
    trySelectNextBlock(e) {
      const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, n = this.stackOfSelected.length, i = 1, r = -1, s = 0;
      if (t) return;
      const a = this.stackOfSelected[n - 1] - this.stackOfSelected[n - 2] > 0;
      let d = s;
      n > 1 && (d = a ? i : r);
      const u = e > this.stackOfSelected[n - 1] && d === i, p = e < this.stackOfSelected[n - 1] && d === r, v = !(u || p || d === s);
      if (!v && (e > this.stackOfSelected[n - 1] || this.stackOfSelected[n - 1] === void 0)) {
        let y = this.stackOfSelected[n - 1] + 1 || e;
        for (y; y <= e; y++) this.addBlockInSelection(y);
        return;
      }
      if (!v && e < this.stackOfSelected[n - 1]) {
        for (let y = this.stackOfSelected[n - 1] - 1; y >= e; y--) this.addBlockInSelection(y);
        return;
      }
      if (!v) return;
      let b = n - 1, w;
      for (e > this.stackOfSelected[n - 1] ? w = () => e > this.stackOfSelected[b] : w = () => e < this.stackOfSelected[b]; w(); ) this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[b]), this.stackOfSelected.pop(), b--;
    }
  }
  class hu extends j {
    async render(e) {
      return new Promise((t) => {
        const { Tools: n, BlockManager: i } = this.Editor;
        if (e.length === 0) i.insert();
        else {
          const r = e.map(({ type: s, data: a, tunes: d, id: u }) => {
            n.available.has(s) === false && (ye(`Tool \xAB${s}\xBB is not found. Check 'tools' property at the Editor.js config.`, "warn"), a = this.composeStubDataForTool(s, a, u), s = n.stubTool);
            let p;
            try {
              p = i.composeBlock({
                id: u,
                tool: s,
                data: a,
                tunes: d
              });
            } catch (v) {
              W(`Block \xAB${s}\xBB skipped because of plugins error`, "error", {
                data: a,
                error: v
              }), a = this.composeStubDataForTool(s, a, u), s = n.stubTool, p = i.composeBlock({
                id: u,
                tool: s,
                data: a,
                tunes: d
              });
            }
            return p;
          });
          i.insertMany(r);
        }
        window.requestIdleCallback(() => {
          t();
        }, {
          timeout: 2e3
        });
      });
    }
    composeStubDataForTool(e, t, n) {
      const { Tools: i } = this.Editor;
      let r = e;
      if (i.unavailable.has(e)) {
        const s = i.unavailable.get(e).toolbox;
        s !== void 0 && s[0].title !== void 0 && (r = s[0].title);
      }
      return {
        savedData: {
          id: n,
          type: e,
          data: t
        },
        title: r
      };
    }
  }
  class pu extends j {
    async save() {
      const { BlockManager: e, Tools: t } = this.Editor, n = e.blocks, i = [];
      try {
        n.forEach((a) => {
          i.push(this.getSavedData(a));
        });
        const r = await Promise.all(i), s = await Lo(r, (a) => t.blockTools.get(a).sanitizeConfig);
        return this.makeOutput(s);
      } catch (r) {
        ye("Saving failed due to the Error %o", "error", r);
      }
    }
    async getSavedData(e) {
      const t = await e.save(), n = t && await e.validate(t.data);
      return {
        ...t,
        isValid: n
      };
    }
    makeOutput(e) {
      const t = [];
      return e.forEach(({ id: n, tool: i, data: r, tunes: s, isValid: a }) => {
        if (!a) {
          W(`Block \xAB${i}\xBB skipped because saved data is invalid`);
          return;
        }
        if (i === this.Editor.Tools.stubTool) {
          t.push(r);
          return;
        }
        const d = {
          id: n,
          type: i,
          data: r,
          ...!ke(s) && {
            tunes: s
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
        var o = document.createElement("style");
        o.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(o);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  const fu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
  function gu(o) {
    const e = document.createElement("div");
    e.innerHTML = o.trim();
    const t = document.createDocumentFragment();
    return t.append(...Array.from(e.childNodes)), t;
  }
  class On {
    static get DEFAULT_PLACEHOLDER() {
      return "";
    }
    constructor({ data: e, config: t, api: n, readOnly: i }) {
      this.api = n, this.readOnly = i, this._CSS = {
        block: this.api.styles.block,
        wrapper: "ce-paragraph"
      }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : On.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? false;
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
      const t = gu(e.text);
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
        icon: fu,
        title: "Text"
      };
    }
  }
  class Mn {
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
        icon: Vl,
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
  Mn.isInline = true;
  Mn.title = "Bold";
  class An {
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
      return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Kl, this.nodes.button;
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
  An.isInline = true;
  An.title = "Italic";
  class In {
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
      }, this.inputOpened = false, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new O();
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
      return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Ii, this.nodes.button;
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
        this.nodes.button.innerHTML = Jl, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
        const t = e.getAttribute("href");
        this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
      } else this.nodes.button.innerHTML = Ii, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
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
        const t = new O();
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
        }), W("Incorrect Link pasted", "warn", t);
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
      const t = /^\/[^/\s]/.test(e), n = e.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(e);
      return !t && !n && !i && (e = "http://" + e), e;
    }
    insertLink(e) {
      const t = this.selection.findParentTag("A");
      t && this.selection.expandToTag(t), document.execCommand(this.commandLink, false, e);
    }
    unlink() {
      document.execCommand(this.commandUnlink);
    }
  }
  In.isInline = true;
  In.title = "Link";
  let ss = class {
    constructor({ api: e }) {
      this.i18nAPI = e.i18n, this.blocksAPI = e.blocks, this.selectionAPI = e.selection, this.toolsAPI = e.tools, this.caretAPI = e.caret;
    }
    async render() {
      const e = O.get(), t = this.blocksAPI.getBlockByElement(e.anchorNode);
      if (t === void 0) return [];
      const n = this.toolsAPI.getBlockTools(), i = await fr(t, n);
      if (i.length === 0) return [];
      const r = i.reduce((u, p) => {
        var v;
        return (v = p.toolbox) == null || v.forEach((b) => {
          u.push({
            icon: b.icon,
            title: fe.t(be.toolNames, b.title),
            name: p.name,
            closeOnActivate: true,
            onActivate: async () => {
              const w = await this.blocksAPI.convert(t.id, p.name, b.data);
              this.caretAPI.setToBlock(w, "end");
            }
          });
        }), u;
      }, []), s = await t.getActiveToolboxEntry(), a = s !== void 0 ? s.icon : kr, d = !st();
      return {
        icon: a,
        name: "convert-to",
        hint: {
          title: this.i18nAPI.t("Convert to")
        },
        children: {
          searchable: d,
          items: r,
          onOpen: () => {
            d && (this.selectionAPI.setFakeBackground(), this.selectionAPI.save());
          },
          onClose: () => {
            d && (this.selectionAPI.restore(), this.selectionAPI.removeFakeBackground());
          }
        }
      };
    }
  };
  ss.isInline = true;
  let as = class {
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
      const e = k.make("div", this.CSS.wrapper), t = ec, n = k.make("div", this.CSS.info), i = k.make("div", this.CSS.title, {
        textContent: this.title
      }), r = k.make("div", this.CSS.subtitle, {
        textContent: this.subtitle
      });
      return e.innerHTML = t, n.appendChild(i), n.appendChild(r), e.appendChild(n), e;
    }
  };
  as.isReadOnlySupported = true;
  class mu extends $o {
    constructor() {
      super(...arguments), this.type = ze.Inline;
    }
    get title() {
      return this.constructable[Vt.Title];
    }
    create() {
      return new this.constructable({
        api: this.api,
        config: this.settings
      });
    }
    get isReadOnlySupported() {
      return this.constructable[Vt.IsReadOnlySupported] ?? false;
    }
  }
  class vu extends $o {
    constructor() {
      super(...arguments), this.type = ze.Tune;
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
  let Ce = class tt extends Map {
    get blockTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
      return new tt(e);
    }
    get inlineTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
      return new tt(e);
    }
    get blockTunes() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
      return new tt(e);
    }
    get internalTools() {
      const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
      return new tt(e);
    }
    get externalTools() {
      const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
      return new tt(e);
    }
  };
  var bu = Object.defineProperty, yu = Object.getOwnPropertyDescriptor, ls = (o, e, t, n) => {
    for (var i = yu(e, t), r = o.length - 1, s; r >= 0; r--) (s = o[r]) && (i = s(e, t, i) || i);
    return i && bu(e, t, i), i;
  };
  class Pn extends $o {
    constructor() {
      super(...arguments), this.type = ze.Block, this.inlineTools = new Ce(), this.tunes = new Ce();
    }
    create(e, t, n) {
      return new this.constructable({
        data: e,
        block: t,
        readOnly: n,
        api: this.api,
        config: this.settings
      });
    }
    get isReadOnlySupported() {
      return this.constructable[et.IsReadOnlySupported] === true;
    }
    get isLineBreaksEnabled() {
      return this.constructable[et.IsEnabledLineBreaks];
    }
    get toolbox() {
      const e = this.constructable[et.Toolbox], t = this.config[Mt.Toolbox];
      if (!ke(e) && t !== false) return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((n, i) => {
        const r = e[i];
        return r ? {
          ...r,
          ...n
        } : n;
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
      return this.constructable[et.ConversionConfig];
    }
    get enabledInlineTools() {
      return this.config[Mt.EnabledInlineTools] || false;
    }
    get enabledBlockTunes() {
      return this.config[Mt.EnabledBlockTunes];
    }
    get pasteConfig() {
      return this.constructable[et.PasteConfig] ?? {};
    }
    get sanitizeConfig() {
      const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
      if (ke(e)) return t;
      const n = {};
      for (const i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        const r = e[i];
        ce(r) ? n[i] = Object.assign({}, t, r) : n[i] = r;
      }
      return n;
    }
    get baseSanitizeConfig() {
      const e = {};
      return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
    }
  }
  ls([
    rt
  ], Pn.prototype, "sanitizeConfig");
  ls([
    rt
  ], Pn.prototype, "baseSanitizeConfig");
  class ku {
    constructor(e, t, n) {
      this.api = n, this.config = e, this.editorConfig = t;
    }
    get(e) {
      const { class: t, isInternal: n = false, ...i } = this.config[e], r = this.getConstructor(t), s = t[Oo.IsTune];
      return new r({
        name: e,
        constructable: t,
        config: i,
        api: this.api.getMethodsForTool(e, s),
        isDefault: e === this.editorConfig.defaultBlock,
        defaultPlaceholder: this.editorConfig.placeholder,
        isInternal: n
      });
    }
    getConstructor(e) {
      switch (true) {
        case e[Vt.IsInline]:
          return mu;
        case e[Oo.IsTune]:
          return vu;
        default:
          return Pn;
      }
    }
  }
  let cs = class {
    constructor({ api: e }) {
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    render() {
      return {
        icon: Ul,
        title: this.api.i18n.t("Move down"),
        onActivate: () => this.handleClick(),
        name: "move-down"
      };
    }
    handleClick() {
      const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
      if (!t) throw new Error("Unable to move Block down since it is already the last");
      const n = t.holder, i = n.getBoundingClientRect();
      let r = Math.abs(window.innerHeight - n.offsetHeight);
      i.top < window.innerHeight && (r = window.scrollY + n.offsetHeight), window.scrollTo(0, r), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(true);
    }
  };
  cs.isTune = true;
  let ds = class {
    constructor({ api: e }) {
      this.api = e;
    }
    render() {
      return {
        icon: Yl,
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
  };
  ds.isTune = true;
  let us = class {
    constructor({ api: e }) {
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    render() {
      return {
        icon: Wl,
        title: this.api.i18n.t("Move up"),
        onActivate: () => this.handleClick(),
        name: "move-up"
      };
    }
    handleClick() {
      const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), n = this.api.blocks.getBlockByIndex(e - 1);
      if (e === 0 || !t || !n) throw new Error("Unable to move Block up since it is already the first");
      const i = t.holder, r = n.holder, s = i.getBoundingClientRect(), a = r.getBoundingClientRect();
      let d;
      a.top > 0 ? d = Math.abs(s.top) - Math.abs(a.top) : d = Math.abs(s.top) + a.height, window.scrollBy(0, -1 * d), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(true);
    }
  };
  us.isTune = true;
  var wu = Object.defineProperty, Eu = Object.getOwnPropertyDescriptor, xu = (o, e, t, n) => {
    for (var i = Eu(e, t), r = o.length - 1, s; r >= 0; r--) (s = o[r]) && (i = s(e, t, i) || i);
    return i && wu(e, t, i), i;
  };
  let hs = class extends j {
    constructor() {
      super(...arguments), this.stubTool = "stub", this.toolsAvailable = new Ce(), this.toolsUnavailable = new Ce();
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
      if (this.validateTools(), this.config.tools = xo({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0) throw Error("Can't start without tools");
      const e = this.prepareConfig();
      this.factory = new ku(e, this.config, this.Editor.API);
      const t = this.getListOfPrepareFunctions(e);
      if (t.length === 0) return Promise.resolve();
      await Xa(t, (n) => {
        this.toolPrepareMethodSuccess(n);
      }, (n) => {
        this.toolPrepareMethodFallback(n);
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
        ee(e.reset) && await e.reset();
      });
    }
    get internalTools() {
      return {
        convertTo: {
          class: ss,
          isInternal: true
        },
        link: {
          class: In,
          isInternal: true
        },
        bold: {
          class: Mn,
          isInternal: true
        },
        italic: {
          class: An,
          isInternal: true
        },
        paragraph: {
          class: On,
          inlineToolbar: true,
          isInternal: true
        },
        stub: {
          class: as,
          isInternal: true
        },
        moveUp: {
          class: us,
          isInternal: true
        },
        delete: {
          class: ds,
          isInternal: true
        },
        moveDown: {
          class: cs,
          isInternal: true
        }
      };
    }
    toolPrepareMethodSuccess(e) {
      const t = this.factory.get(e.toolName);
      if (t.isInline()) {
        const n = [
          "render"
        ].filter((i) => !t.create()[i]);
        if (n.length) {
          W(`Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`, "warn", n), this.toolsUnavailable.set(t.name, t);
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
      return Object.entries(e).forEach(([n, i]) => {
        t.push({
          function: ee(i.class.prepare) ? i.class.prepare : () => {
          },
          data: {
            toolName: n,
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
          e.inlineTools = new Ce(Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [
            t,
            this.inlineTools.get(t)
          ]) : Array.from(this.inlineTools.entries()));
          return;
        }
        Array.isArray(e.enabledInlineTools) && (e.inlineTools = new Ce([
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
          const t = new Ce(e.enabledBlockTunes.map((n) => [
            n,
            this.blockTunes.get(n)
          ]));
          e.tunes = new Ce([
            ...t,
            ...this.blockTunes.internalTools
          ]);
          return;
        }
        if (Array.isArray(this.config.tunes)) {
          const t = new Ce(this.config.tunes.map((n) => [
            n,
            this.blockTunes.get(n)
          ]));
          e.tunes = new Ce([
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
        if (!ee(t) && !ee(t.class)) throw Error(`Tool \xAB${e}\xBB must be a constructor function or an object with function in the \xABclass\xBB property`);
      }
    }
    prepareConfig() {
      const e = {};
      for (const t in this.config.tools) ce(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = {
        class: this.config.tools[t]
      };
      return e;
    }
  };
  xu([
    rt
  ], hs.prototype, "getAllInlineToolsSanitizeConfig");
  const Cu = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;--color-background-icon-active: rgba(56, 138, 229, .1);--color-text-icon-active: #388AE5;--color-text-primary: black;position:absolute;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3;opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{color:var(--color-text-primary);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:0;border-radius:4px;line-height:normal;height:100%;padding:0;width:28px;background-color:transparent;cursor:pointer}@media (max-width: 650px){.ce-inline-tool{width:36px;height:36px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#f8f8f8}}.ce-inline-tool svg{display:block;width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:4px 8px;font-size:14px;line-height:22px;outline:none;margin:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-inline-tool--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #EFF0F1;--color-shadow: rgba(13, 20, 33, .1);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #F8F8F8;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;--popover-top: calc(100% + var(--offset-from-target));--popover-left: 0;--nested-popover-overlap: 4px;--icon-size: 20px;--item-padding: 3px;--item-height: calc(var(--icon-size) + 2 * var(--item-padding))}.ce-popover__container{min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:var(--popover-left);top:var(--popover-top);background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened>.ce-popover__container{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened>.ce-popover__container{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover--open-top .ce-popover__container{--popover-top: calc(-1 * (var(--offset-from-target) + var(--popover-height)))}.ce-popover--open-left .ce-popover__container{--popover-left: calc(-1 * var(--width) + 100%)}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}@media (max-width: 650px){.ce-popover .ce-popover__container{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}}.ce-popover__search{margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover--nested .ce-popover__container{--popover-left: calc(var(--nesting-level) * (var(--width) - var(--nested-popover-overlap)));top:calc(var(--trigger-item-top) - var(--nested-popover-overlap));position:absolute}.ce-popover--open-top.ce-popover--nested .ce-popover__container{top:calc(var(--trigger-item-top) - var(--popover-height) + var(--item-height) + var(--offset-from-target) + var(--nested-popover-overlap))}.ce-popover--open-left .ce-popover--nested .ce-popover__container{--popover-left: calc(-1 * (var(--nesting-level) + 1) * var(--width) + 100%)}.ce-popover-item-separator{padding:4px 3px}.ce-popover-item-separator--hidden{display:none}.ce-popover-item-separator__line{height:1px;background:var(--color-border);width:100%}.ce-popover-item-html--hidden{display:none}.ce-popover-item{--border-radius: 6px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:var(--item-padding);color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;background:transparent}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover-item__icon--tool{margin-right:4px}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:auto}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title,.ce-popover-item--confirmation .ce-popover-item__icon{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.ce-popover-header{margin-bottom:8px;margin-top:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover-header__text{font-size:18px;font-weight:600}.ce-popover-header__back-button{border:0;background:transparent;width:36px;height:36px;color:var(--color-text-primary)}.ce-popover-header__back-button svg{display:block;width:28px;height:28px}.ce-popover--inline{--height: 38px;--height-mobile: 46px;--container-padding: 4px;position:relative}.ce-popover--inline .ce-popover__custom-content{margin-bottom:0}.ce-popover--inline .ce-popover__items{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-popover--inline .ce-popover__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:var(--container-padding);height:var(--height);top:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-animation:none;animation:none}@media (max-width: 650px){.ce-popover--inline .ce-popover__container{height:var(--height-mobile);position:absolute}}.ce-popover--inline .ce-popover-item-separator{padding:0 4px}.ce-popover--inline .ce-popover-item-separator__line{height:100%;width:1px}.ce-popover--inline .ce-popover-item{border-radius:4px;padding:4px}.ce-popover--inline .ce-popover-item__icon--tool{-webkit-box-shadow:none;box-shadow:none;background:transparent;margin-right:0}.ce-popover--inline .ce-popover-item__icon{width:auto;width:initial;height:auto;height:initial}.ce-popover--inline .ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover--inline .ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover--inline .ce-popover-item:not(:last-of-type){margin-bottom:0;margin-bottom:initial}.ce-popover--inline .ce-popover-item-html{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover--inline .ce-popover-item__icon--chevron-right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{--offset: 3px;left:0;top:calc(var(--height) + var(--offset))}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{top:calc(var(--height-mobile) + var(--offset))}}.ce-popover--inline .ce-popover--nested .ce-popover__container{min-width:var(--width);width:var(--width);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:6px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ce-popover--inline .ce-popover--nested .ce-popover__items{display:block;width:100%}.ce-popover--inline .ce-popover--nested .ce-popover-item{border-radius:6px;padding:3px}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested .ce-popover-item{padding:4px}}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon--tool{margin-right:4px}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon{width:26px;height:26px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator{padding:4px 3px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator__line{width:100%;height:1px}.codex-editor [data-placeholder]:empty:before,.codex-editor [data-placeholder][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text;content:attr(data-placeholder)}.codex-editor [data-placeholder-active]:empty:before,.codex-editor [data-placeholder-active][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text}.codex-editor [data-placeholder-active]:empty:focus:before,.codex-editor [data-placeholder-active][data-empty=true]:focus:before{content:attr(data-placeholder-active)}
`;
  class Tu extends j {
    constructor() {
      super(...arguments), this.isMobile = false, this.contentRectCache = null, this.resizeDebouncer = Oi(() => {
        this.windowResize();
      }, 200), this.selectionChangeDebounced = Oi(() => {
        this.selectionChanged();
      }, au), this.documentTouchedListener = (e) => {
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
      const e = this.nodes.wrapper.querySelector(`.${Ae.CSS.content}`);
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
      const { Toolbar: e, BlockSettings: t, InlineToolbar: n } = this.Editor;
      return !!(t.opened || n.opened || e.toolbox.opened);
    }
    get someFlipperButtonFocused() {
      return this.Editor.Toolbar.toolbox.hasFocus() ? true : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof Ft).some(([e, t]) => t.flipper.hasFocus());
    }
    destroy() {
      this.nodes.holder.innerHTML = "", this.unbindReadOnlyInsensitiveListeners();
    }
    closeAllToolbars() {
      const { Toolbar: e, BlockSettings: t, InlineToolbar: n } = this.Editor;
      t.close(), n.close(), e.toolbox.close();
    }
    setIsMobile() {
      const e = window.innerWidth < rr;
      e !== this.isMobile && this.eventsDispatcher.emit(vt, {
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
        textContent: Cu.toString()
      });
      this.config.style && !ke(this.config.style) && this.config.style.nonce && t.setAttribute("nonce", this.config.style.nonce), k.prepend(document.head, t);
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
      this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", Eo((t) => {
        const n = t.target.closest(".ce-block");
        this.Editor.BlockSelection.anyBlockSelected || n && e !== n && (e = n, this.eventsDispatcher.emit(Mr, {
          block: this.Editor.BlockManager.getBlockByChildNode(n)
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
        case L.ENTER:
          this.enterPressed(e);
          break;
        case L.BACKSPACE:
        case L.DELETE:
          this.backspacePressed(e);
          break;
        case L.ESC:
          this.escapePressed(e);
          break;
        default:
          this.defaultBehaviour(e);
          break;
      }
    }
    defaultBehaviour(e) {
      const { currentBlock: t } = this.Editor.BlockManager, n = e.target.closest(`.${this.CSS.editorWrapper}`), i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
      if (t !== void 0 && n === null) {
        this.Editor.BlockEvents.keydown(e);
        return;
      }
      n || t && i || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
    }
    backspacePressed(e) {
      const { BlockManager: t, BlockSelection: n, Caret: i } = this.Editor;
      if (n.anyBlockSelected && !O.isSelectionExists) {
        const r = t.removeSelectedBlocks(), s = t.insertDefaultBlockAtIndex(r, true);
        i.setToBlock(s, i.positions.START), n.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
      }
    }
    escapePressed(e) {
      this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
    }
    enterPressed(e) {
      const { BlockManager: t, BlockSelection: n } = this.Editor;
      if (this.someToolbarOpened) return;
      const i = t.currentBlockIndex >= 0;
      if (n.anyBlockSelected && !O.isSelectionExists) {
        n.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
        return;
      }
      if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
        const r = this.Editor.BlockManager.insert();
        e.preventDefault(), this.Editor.Caret.setToBlock(r), this.Editor.Toolbar.moveAndOpen(r);
      }
      this.Editor.BlockSelection.clearSelection(e);
    }
    documentClicked(e) {
      var t, n;
      if (!e.isTrusted) return;
      const i = e.target;
      this.nodes.holder.contains(i) || O.isAtEditor || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
      const r = (t = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : t.contains(i), s = (n = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : n.contains(i), a = r || s;
      if (this.Editor.BlockSettings.opened && !a) {
        this.Editor.BlockSettings.close();
        const d = this.Editor.BlockManager.getBlockByChildNode(i);
        this.Editor.Toolbar.moveAndOpen(d);
      }
      this.Editor.BlockSelection.clearSelection(e);
    }
    documentTouched(e) {
      let t = e.target;
      if (t === this.nodes.redactor) {
        const n = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        t = document.elementFromPoint(n, i);
      }
      try {
        this.Editor.BlockManager.setCurrentBlockByChildNode(t);
      } catch {
        this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
      }
      this.Editor.ReadOnly.isEnabled || this.Editor.Toolbar.moveAndOpen();
    }
    redactorClicked(e) {
      if (!O.isCollapsed) return;
      const t = e.target, n = e.metaKey || e.ctrlKey;
      if (k.isAnchor(t) && n) {
        e.stopImmediatePropagation(), e.stopPropagation();
        const i = t.getAttribute("href"), r = Qa(i);
        el(r);
        return;
      }
      this.processBottomZoneClick(e);
    }
    processBottomZoneClick(e) {
      const t = this.Editor.BlockManager.getBlockByIndex(-1), n = k.offset(t.holder).bottom, i = e.pageY, { BlockSelection: r } = this.Editor;
      if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && !r.anyBlockSelected && n < i) {
        e.stopImmediatePropagation(), e.stopPropagation();
        const { BlockManager: s, Caret: a, Toolbar: d } = this.Editor;
        (!s.lastBlock.tool.isDefault || !s.lastBlock.isEmpty) && s.insertAtEnd(), a.setToTheLastBlock(), d.moveAndOpen(s.lastBlock);
      }
    }
    selectionChanged() {
      const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, n = O.anchorElement;
      if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && O.get().removeAllRanges(), !n) {
        O.range || this.Editor.InlineToolbar.close();
        return;
      }
      const i = n.closest(`.${Ae.CSS.content}`);
      (i === null || i.closest(`.${O.CSS.editorWrapper}`) !== this.nodes.wrapper) && (this.Editor.InlineToolbar.containsNode(n) || this.Editor.InlineToolbar.close(), n.dataset.inlineToolbar !== "true") || (this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(n), this.Editor.InlineToolbar.tryToShow(true));
    }
    enableInputsEmptyMark() {
      function e(t) {
        const n = t.target;
        sr(n);
      }
      this.readOnlyMutableListeners.on(this.nodes.wrapper, "input", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusin", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusout", e);
    }
  }
  const _u = {
    BlocksAPI: ul,
    CaretAPI: pl,
    EventsAPI: fl,
    I18nAPI: No,
    API: gl,
    InlineToolbarAPI: ml,
    ListenersAPI: vl,
    NotifierAPI: wl,
    ReadOnlyAPI: El,
    SanitizerAPI: Ol,
    SaverAPI: Ml,
    SelectionAPI: Al,
    ToolsAPI: Il,
    StylesAPI: Pl,
    ToolbarAPI: Nl,
    TooltipAPI: Hl,
    UiAPI: Fl,
    BlockSettings: hc,
    Toolbar: kc,
    InlineToolbar: wc,
    BlockEvents: Jd,
    BlockManager: ou,
    BlockSelection: nu,
    Caret: iu,
    CrossBlockSelection: ru,
    DragNDrop: su,
    ModificationsObserver: cu,
    Paste: du,
    ReadOnly: uu,
    RectangleSelection: ft,
    Renderer: hu,
    Saver: pu,
    Tools: hs,
    UI: Tu
  };
  class Su {
    constructor(e) {
      this.moduleInstances = {}, this.eventsDispatcher = new wt();
      let t, n;
      this.isReady = new Promise((i, r) => {
        t = i, n = r;
      }), Promise.resolve().then(async () => {
        this.configuration = e, this.validate(), this.init(), await this.start(), await this.render();
        const { BlockManager: i, Caret: r, UI: s, ModificationsObserver: a } = this.moduleInstances;
        s.checkEmptiness(), a.enable(), this.configuration.autofocus === true && this.configuration.readOnly !== true && r.setToBlock(i.blocks[0], r.positions.START), t();
      }).catch((i) => {
        W(`Editor.js is not ready because of ${i}`, "error"), n(i);
      });
    }
    set configuration(e) {
      var t, n;
      ce(e) ? this.config = {
        ...e
      } : this.config = {
        holder: e
      }, Co(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = or.VERBOSE), Wa(this.config.logLevel), Co(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
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
      }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : true, (ke(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = {
        blocks: [
          i
        ]
      }), this.config.readOnly = this.config.readOnly || false, (t = this.config.i18n) != null && t.messages && fe.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((n = this.config.i18n) == null ? void 0 : n.direction) || "ltr";
    }
    get configuration() {
      return this.config;
    }
    validate() {
      const { holderId: e, holder: t } = this.config;
      if (e && t) throw Error("\xABholderId\xBB and \xABholder\xBB param can't assign at the same time.");
      if (Ie(t) && !k.get(t)) throw Error(`element with ID \xAB${t}\xBB is missing. Pass correct holder's ID.`);
      if (t && ce(t) && !k.isElement(t)) throw Error("\xABholder\xBB value must be an Element node");
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
        } catch (n) {
          if (n instanceof cr) throw new Error(n.message);
          W(`Module ${t} was skipped because of %o`, "warn", n);
        }
      }), Promise.resolve());
    }
    render() {
      return this.moduleInstances.Renderer.render(this.config.data.blocks);
    }
    constructModules() {
      Object.entries(_u).forEach(([e, t]) => {
        try {
          this.moduleInstances[e] = new t({
            config: this.configuration,
            eventsDispatcher: this.eventsDispatcher
          });
        } catch (n) {
          W("[constructModules]", `Module ${e} skipped because`, "error", n);
        }
      });
    }
    configureModules() {
      for (const e in this.moduleInstances) Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
    }
    getModulesDiff(e) {
      const t = {};
      for (const n in this.moduleInstances) n !== e && (t[n] = this.moduleInstances[n]);
      return t;
    }
  }
  class Bu {
    static get version() {
      return "2.31.0-rc.7";
    }
    constructor(e) {
      let t = () => {
      };
      ce(e) && ee(e.onReady) && (t = e.onReady);
      const n = new Su(e);
      this.isReady = n.isReady.then(() => {
        this.exportAPI(n), t();
      });
    }
    exportAPI(e) {
      const t = [
        "configuration"
      ], n = () => {
        Object.values(e.moduleInstances).forEach((i) => {
          ee(i.destroy) && i.destroy(), i.listeners.removeAll();
        }), jl(), e = null;
        for (const i in this) Object.prototype.hasOwnProperty.call(this, i) && delete this[i];
        Object.setPrototypeOf(this, null);
      };
      t.forEach((i) => {
        this[i] = e[i];
      }), this.destroy = n, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
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
      }).forEach(([i, r]) => {
        Object.entries(r).forEach(([s, a]) => {
          this[a] = e.moduleInstances.API.methods[i][s];
        });
      });
    }
  }
  (function() {
    try {
      if (typeof document < "u") {
        var o = document.createElement("style");
        o.appendChild(document.createTextNode(".ce-header{padding:.6em 0 3px;margin:0;line-height:1.25em;outline:none}.ce-header p,.ce-header div{padding:0!important;margin:0!important}")), document.head.appendChild(o);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  const Ou = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>', Mu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>', Au = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>', Iu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>', Pu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>', Nu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>', Lu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>';
  class Du {
    constructor({ data: e, config: t, api: n, readOnly: i }) {
      this.api = n, this.readOnly = i, this._settings = t, this._data = this.normalizeData(e), this._element = this.getTag();
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
          svg: Ou
        },
        {
          number: 2,
          tag: "H2",
          svg: Mu
        },
        {
          number: 3,
          tag: "H3",
          svg: Au
        },
        {
          number: 4,
          tag: "H4",
          svg: Iu
        },
        {
          number: 5,
          tag: "H5",
          svg: Pu
        },
        {
          number: 6,
          tag: "H6",
          svg: Nu
        }
      ];
      return this._settings.levels ? e.filter((t) => this._settings.levels.includes(t.number)) : e;
    }
    onPaste(e) {
      const t = e.detail;
      if ("data" in t) {
        const n = t.data;
        let i = this.defaultLevel.number;
        switch (n.tagName) {
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
        this._settings.levels && (i = this._settings.levels.reduce((r, s) => Math.abs(s - i) < Math.abs(r - i) ? s : r)), this.data = {
          level: i,
          text: n.innerHTML
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
        icon: Lu,
        title: "Heading"
      };
    }
  }
  (function() {
    try {
      if (typeof document < "u") {
        var o = document.createElement("style");
        o.appendChild(document.createTextNode('.cdx-list{margin:0;padding:0;outline:none;display:grid;counter-reset:item;gap:var(--spacing-s);padding:var(--spacing-xs);--spacing-s: 8px;--spacing-xs: 6px;--list-counter-type: numeric;--radius-border: 5px;--checkbox-background: #fff;--color-border: #C9C9C9;--color-bg-checked: #369FFF;--line-height: 1.45em;--color-bg-checked-hover: #0059AB;--color-tick: #fff;--size-checkbox: 1.2em}.cdx-list__item{line-height:var(--line-height);display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;grid-template-areas:"checkbox content" ". child"}.cdx-list__item-children{display:grid;grid-area:child;gap:var(--spacing-s);padding-top:var(--spacing-s)}.cdx-list__item [contenteditable]{outline:none}.cdx-list__item-content{word-break:break-word;white-space:pre-wrap;grid-area:content;padding-left:var(--spacing-s)}.cdx-list__item:before{counter-increment:item;white-space:nowrap}.cdx-list-ordered .cdx-list__item:before{content:counters(item,".",var(--list-counter-type)) "."}.cdx-list-ordered{counter-reset:item}.cdx-list-unordered .cdx-list__item:before{content:"\u2022"}.cdx-list-checklist .cdx-list__item:before{content:""}.cdx-list__settings .cdx-settings-button{width:50%}.cdx-list__checkbox{padding-top:calc((var(--line-height) - var(--size-checkbox)) / 2);grid-area:checkbox;width:var(--size-checkbox);height:var(--size-checkbox);display:flex;cursor:pointer}.cdx-list__checkbox svg{opacity:0;height:var(--size-checkbox);width:var(--size-checkbox);left:-1px;top:-1px;position:absolute}@media (hover: hover){.cdx-list__checkbox:not(.cdx-list__checkbox--no-hover):hover .cdx-list__checkbox-check svg{opacity:1}}.cdx-list__checkbox--checked{line-height:var(--line-height)}@media (hover: hover){.cdx-list__checkbox--checked:not(.cdx-list__checkbox--checked--no-hover):hover .cdx-checklist__checkbox-check{background:var(--color-bg-checked-hover);border-color:var(--color-bg-checked-hover)}}.cdx-list__checkbox--checked .cdx-list__checkbox-check{background:var(--color-bg-checked);border-color:var(--color-bg-checked)}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg{opacity:1}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg path{stroke:var(--color-tick)}.cdx-list__checkbox--checked .cdx-list__checkbox-check:before{opacity:0;visibility:visible;transform:scale(2.5)}.cdx-list__checkbox-check{cursor:pointer;display:inline-block;position:relative;margin:0 auto;width:var(--size-checkbox);height:var(--size-checkbox);box-sizing:border-box;border-radius:var(--radius-border);border:1px solid var(--color-border);background:var(--checkbox-background)}.cdx-list__checkbox-check:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:100%;background-color:var(--color-bg-checked);visibility:hidden;pointer-events:none;transform:scale(1);transition:transform .4s ease-out,opacity .4s}.cdx-list-start-with-field{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-list-start-with-field--invalid{background:#FFECED;border:1px solid #E13F3F}.cdx-list-start-with-field--invalid .cdx-list-start-with-field__input{color:#e13f3f}.cdx-list-start-with-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - var(--toolbox-buttons-size) - var(--icon-margin-right))}.cdx-list-start-with-field__input::placeholder{color:var(--grayText);font-weight:500}')), document.head.appendChild(o);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  var Ut = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function Ru(o) {
    if (o.__esModule) return o;
    var e = o.default;
    if (typeof e == "function") {
      var t = function n() {
        return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
      };
      t.prototype = e.prototype;
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
      value: true
    }), Object.keys(o).forEach(function(n) {
      var i = Object.getOwnPropertyDescriptor(o, n);
      Object.defineProperty(t, n, i.get ? i : {
        enumerable: true,
        get: function() {
          return o[n];
        }
      });
    }), t;
  }
  var Xe = {}, Nn = {}, Ln = {};
  Object.defineProperty(Ln, "__esModule", {
    value: true
  });
  Ln.allInputsSelector = ju;
  function ju() {
    var o = [
      "text",
      "password",
      "email",
      "number",
      "search",
      "tel",
      "url"
    ];
    return "[contenteditable=true], textarea, input:not([type]), " + o.map(function(e) {
      return 'input[type="'.concat(e, '"]');
    }).join(", ");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.allInputsSelector = void 0;
    var e = Ln;
    Object.defineProperty(o, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
  })(Nn);
  var Ke = {}, Dn = {};
  Object.defineProperty(Dn, "__esModule", {
    value: true
  });
  Dn.isNativeInput = Hu;
  function Hu(o) {
    var e = [
      "INPUT",
      "TEXTAREA"
    ];
    return o && o.tagName ? e.includes(o.tagName) : false;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isNativeInput = void 0;
    var e = Dn;
    Object.defineProperty(o, "isNativeInput", {
      enumerable: true,
      get: function() {
        return e.isNativeInput;
      }
    });
  })(Ke);
  var ps = {}, Rn = {};
  Object.defineProperty(Rn, "__esModule", {
    value: true
  });
  Rn.append = Fu;
  function Fu(o, e) {
    Array.isArray(e) ? e.forEach(function(t) {
      o.appendChild(t);
    }) : o.appendChild(e);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.append = void 0;
    var e = Rn;
    Object.defineProperty(o, "append", {
      enumerable: true,
      get: function() {
        return e.append;
      }
    });
  })(ps);
  var jn = {}, Hn = {};
  Object.defineProperty(Hn, "__esModule", {
    value: true
  });
  Hn.blockElements = $u;
  function $u() {
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
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.blockElements = void 0;
    var e = Hn;
    Object.defineProperty(o, "blockElements", {
      enumerable: true,
      get: function() {
        return e.blockElements;
      }
    });
  })(jn);
  var fs = {}, Fn = {};
  Object.defineProperty(Fn, "__esModule", {
    value: true
  });
  Fn.calculateBaseline = Vu;
  function Vu(o) {
    var e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), r = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, d = (n - t) / 2, u = s + r + i + d + a;
    return u;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.calculateBaseline = void 0;
    var e = Fn;
    Object.defineProperty(o, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return e.calculateBaseline;
      }
    });
  })(fs);
  var gs = {}, $n = {}, Vn = {}, Un = {};
  Object.defineProperty(Un, "__esModule", {
    value: true
  });
  Un.isContentEditable = Uu;
  function Uu(o) {
    return o.contentEditable === "true";
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isContentEditable = void 0;
    var e = Un;
    Object.defineProperty(o, "isContentEditable", {
      enumerable: true,
      get: function() {
        return e.isContentEditable;
      }
    });
  })(Vn);
  Object.defineProperty($n, "__esModule", {
    value: true
  });
  $n.canSetCaret = Wu;
  var zu = Ke, qu = Vn;
  function Wu(o) {
    var e = true;
    if ((0, zu.isNativeInput)(o)) switch (o.type) {
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
    else e = (0, qu.isContentEditable)(o);
    return e;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.canSetCaret = void 0;
    var e = $n;
    Object.defineProperty(o, "canSetCaret", {
      enumerable: true,
      get: function() {
        return e.canSetCaret;
      }
    });
  })(gs);
  var oo = {}, zn = {};
  function Yu(o, e, t) {
    const n = t.value !== void 0 ? "value" : "get", i = t[n], r = `#${e}Cache`;
    if (t[n] = function(...s) {
      return this[r] === void 0 && (this[r] = i.apply(this, s)), this[r];
    }, n === "get" && t.set) {
      const s = t.set;
      t.set = function(a) {
        delete o[r], s.apply(this, a);
      };
    }
    return t;
  }
  function ms() {
    const o = {
      win: false,
      mac: false,
      x11: false,
      linux: false
    }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
    return e !== void 0 && (o[e] = true), o;
  }
  function qn(o) {
    return o != null && o !== "" && (typeof o != "object" || Object.keys(o).length > 0);
  }
  function Xu(o) {
    return !qn(o);
  }
  const Ku = () => typeof window < "u" && window.navigator !== null && qn(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function Gu(o) {
    const e = ms();
    return o = o.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, "+"), e.mac ? o = o.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
  }
  function Zu(o) {
    return o[0].toUpperCase() + o.slice(1);
  }
  function Qu(o) {
    const e = document.createElement("div");
    e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = o, document.body.appendChild(e);
    const t = window.getSelection(), n = document.createRange();
    if (n.selectNode(e), t === null) throw new Error("Cannot copy text to clipboard");
    t.removeAllRanges(), t.addRange(n), document.execCommand("copy"), document.body.removeChild(e);
  }
  function Ju(o, e, t) {
    let n;
    return (...i) => {
      const r = this, s = () => {
        n = void 0, t !== true && o.apply(r, i);
      }, a = t === true && n !== void 0;
      window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(r, i);
    };
  }
  function Re(o) {
    return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function eh(o) {
    return Re(o) === "boolean";
  }
  function vs(o) {
    return Re(o) === "function" || Re(o) === "asyncfunction";
  }
  function th(o) {
    return vs(o) && /^\s*class\s+/.test(o.toString());
  }
  function oh(o) {
    return Re(o) === "number";
  }
  function Nt(o) {
    return Re(o) === "object";
  }
  function nh(o) {
    return Promise.resolve(o) === o;
  }
  function ih(o) {
    return Re(o) === "string";
  }
  function rh(o) {
    return Re(o) === "undefined";
  }
  function Io(o, ...e) {
    if (!e.length) return o;
    const t = e.shift();
    if (Nt(o) && Nt(t)) for (const n in t) Nt(t[n]) ? (o[n] === void 0 && Object.assign(o, {
      [n]: {}
    }), Io(o[n], t[n])) : Object.assign(o, {
      [n]: t[n]
    });
    return Io(o, ...e);
  }
  function sh(o, e, t) {
    const n = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
    o && console.warn(n);
  }
  function ah(o) {
    try {
      return new URL(o).href;
    } catch {
    }
    return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
  }
  function lh(o) {
    return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
  }
  const ch = {
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
  }, dh = {
    LEFT: 0,
    WHEEL: 1,
    RIGHT: 2,
    BACKWARD: 3,
    FORWARD: 4
  };
  class uh {
    constructor() {
      this.completed = Promise.resolve();
    }
    add(e) {
      return new Promise((t, n) => {
        this.completed = this.completed.then(e).then(t).catch(n);
      });
    }
  }
  function hh(o, e, t = void 0) {
    let n, i, r, s = null, a = 0;
    t || (t = {});
    const d = function() {
      a = t.leading === false ? 0 : Date.now(), s = null, r = o.apply(n, i), s === null && (n = i = null);
    };
    return function() {
      const u = Date.now();
      !a && t.leading === false && (a = u);
      const p = e - (u - a);
      return n = this, i = arguments, p <= 0 || p > e ? (s && (clearTimeout(s), s = null), a = u, r = o.apply(n, i), s === null && (n = i = null)) : !s && t.trailing !== false && (s = setTimeout(d, p)), r;
    };
  }
  const ph = Object.freeze(Object.defineProperty({
    __proto__: null,
    PromiseQueue: uh,
    beautifyShortcut: Gu,
    cacheable: Yu,
    capitalize: Zu,
    copyTextToClipboard: Qu,
    debounce: Ju,
    deepMerge: Io,
    deprecationAssert: sh,
    getUserOS: ms,
    getValidUrl: ah,
    isBoolean: eh,
    isClass: th,
    isEmpty: Xu,
    isFunction: vs,
    isIosDevice: Ku,
    isNumber: oh,
    isObject: Nt,
    isPrintableKey: lh,
    isPromise: nh,
    isString: ih,
    isUndefined: rh,
    keyCodes: ch,
    mouseButtons: dh,
    notEmpty: qn,
    throttle: hh,
    typeOf: Re
  }, Symbol.toStringTag, {
    value: "Module"
  })), Wn = Ru(ph);
  Object.defineProperty(zn, "__esModule", {
    value: true
  });
  zn.containsOnlyInlineElements = mh;
  var fh = Wn, gh = jn;
  function mh(o) {
    var e;
    (0, fh.isString)(o) ? (e = document.createElement("div"), e.innerHTML = o) : e = o;
    var t = function(n) {
      return !(0, gh.blockElements)().includes(n.tagName.toLowerCase()) && Array.from(n.children).every(t);
    };
    return Array.from(e.children).every(t);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.containsOnlyInlineElements = void 0;
    var e = zn;
    Object.defineProperty(o, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return e.containsOnlyInlineElements;
      }
    });
  })(oo);
  var bs = {}, Yn = {}, no = {}, Xn = {};
  Object.defineProperty(Xn, "__esModule", {
    value: true
  });
  Xn.make = vh;
  function vh(o, e, t) {
    var n;
    e === void 0 && (e = null), t === void 0 && (t = {});
    var i = document.createElement(o);
    if (Array.isArray(e)) {
      var r = e.filter(function(a) {
        return a !== void 0;
      });
      (n = i.classList).add.apply(n, r);
    } else e !== null && i.classList.add(e);
    for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (i[s] = t[s]);
    return i;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.make = void 0;
    var e = Xn;
    Object.defineProperty(o, "make", {
      enumerable: true,
      get: function() {
        return e.make;
      }
    });
  })(no);
  Object.defineProperty(Yn, "__esModule", {
    value: true
  });
  Yn.fragmentToString = yh;
  var bh = no;
  function yh(o) {
    var e = (0, bh.make)("div");
    return e.appendChild(o), e.innerHTML;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.fragmentToString = void 0;
    var e = Yn;
    Object.defineProperty(o, "fragmentToString", {
      enumerable: true,
      get: function() {
        return e.fragmentToString;
      }
    });
  })(bs);
  var ys = {}, Kn = {};
  Object.defineProperty(Kn, "__esModule", {
    value: true
  });
  Kn.getContentLength = wh;
  var kh = Ke;
  function wh(o) {
    var e, t;
    return (0, kh.isNativeInput)(o) ? o.value.length : o.nodeType === Node.TEXT_NODE ? o.length : (t = (e = o.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getContentLength = void 0;
    var e = Kn;
    Object.defineProperty(o, "getContentLength", {
      enumerable: true,
      get: function() {
        return e.getContentLength;
      }
    });
  })(ys);
  var Gn = {}, Zn = {}, Fi = Ut && Ut.__spreadArray || function(o, e, t) {
    if (t || arguments.length === 2) for (var n = 0, i = e.length, r; n < i; n++) (r || !(n in e)) && (r || (r = Array.prototype.slice.call(e, 0, n)), r[n] = e[n]);
    return o.concat(r || Array.prototype.slice.call(e));
  };
  Object.defineProperty(Zn, "__esModule", {
    value: true
  });
  Zn.getDeepestBlockElements = ks;
  var Eh = oo;
  function ks(o) {
    return (0, Eh.containsOnlyInlineElements)(o) ? [
      o
    ] : Array.from(o.children).reduce(function(e, t) {
      return Fi(Fi([], e, true), ks(t), true);
    }, []);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getDeepestBlockElements = void 0;
    var e = Zn;
    Object.defineProperty(o, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return e.getDeepestBlockElements;
      }
    });
  })(Gn);
  var ws = {}, Qn = {}, io = {}, Jn = {};
  Object.defineProperty(Jn, "__esModule", {
    value: true
  });
  Jn.isLineBreakTag = xh;
  function xh(o) {
    return [
      "BR",
      "WBR"
    ].includes(o.tagName);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isLineBreakTag = void 0;
    var e = Jn;
    Object.defineProperty(o, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return e.isLineBreakTag;
      }
    });
  })(io);
  var ro = {}, ei = {};
  Object.defineProperty(ei, "__esModule", {
    value: true
  });
  ei.isSingleTag = Ch;
  function Ch(o) {
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
    ].includes(o.tagName);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isSingleTag = void 0;
    var e = ei;
    Object.defineProperty(o, "isSingleTag", {
      enumerable: true,
      get: function() {
        return e.isSingleTag;
      }
    });
  })(ro);
  Object.defineProperty(Qn, "__esModule", {
    value: true
  });
  Qn.getDeepestNode = Es;
  var Th = Ke, _h = io, Sh = ro;
  function Es(o, e) {
    e === void 0 && (e = false);
    var t = e ? "lastChild" : "firstChild", n = e ? "previousSibling" : "nextSibling";
    if (o.nodeType === Node.ELEMENT_NODE && o[t]) {
      var i = o[t];
      if ((0, Sh.isSingleTag)(i) && !(0, Th.isNativeInput)(i) && !(0, _h.isLineBreakTag)(i)) if (i[n]) i = i[n];
      else if (i.parentNode !== null && i.parentNode[n]) i = i.parentNode[n];
      else return i.parentNode;
      return Es(i, e);
    }
    return o;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getDeepestNode = void 0;
    var e = Qn;
    Object.defineProperty(o, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return e.getDeepestNode;
      }
    });
  })(ws);
  var xs = {}, ti = {}, St = Ut && Ut.__spreadArray || function(o, e, t) {
    if (t || arguments.length === 2) for (var n = 0, i = e.length, r; n < i; n++) (r || !(n in e)) && (r || (r = Array.prototype.slice.call(e, 0, n)), r[n] = e[n]);
    return o.concat(r || Array.prototype.slice.call(e));
  };
  Object.defineProperty(ti, "__esModule", {
    value: true
  });
  ti.findAllInputs = Ih;
  var Bh = oo, Oh = Gn, Mh = Nn, Ah = Ke;
  function Ih(o) {
    return Array.from(o.querySelectorAll((0, Mh.allInputsSelector)())).reduce(function(e, t) {
      return (0, Ah.isNativeInput)(t) || (0, Bh.containsOnlyInlineElements)(t) ? St(St([], e, true), [
        t
      ], false) : St(St([], e, true), (0, Oh.getDeepestBlockElements)(t), true);
    }, []);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.findAllInputs = void 0;
    var e = ti;
    Object.defineProperty(o, "findAllInputs", {
      enumerable: true,
      get: function() {
        return e.findAllInputs;
      }
    });
  })(xs);
  var Cs = {}, oi = {};
  Object.defineProperty(oi, "__esModule", {
    value: true
  });
  oi.isCollapsedWhitespaces = Ph;
  function Ph(o) {
    return !/[^\t\n\r ]/.test(o);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCollapsedWhitespaces = void 0;
    var e = oi;
    Object.defineProperty(o, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return e.isCollapsedWhitespaces;
      }
    });
  })(Cs);
  var ni = {}, ii = {};
  Object.defineProperty(ii, "__esModule", {
    value: true
  });
  ii.isElement = Lh;
  var Nh = Wn;
  function Lh(o) {
    return (0, Nh.isNumber)(o) ? false : !!o && !!o.nodeType && o.nodeType === Node.ELEMENT_NODE;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isElement = void 0;
    var e = ii;
    Object.defineProperty(o, "isElement", {
      enumerable: true,
      get: function() {
        return e.isElement;
      }
    });
  })(ni);
  var Ts = {}, ri = {}, si = {}, ai = {};
  Object.defineProperty(ai, "__esModule", {
    value: true
  });
  ai.isLeaf = Dh;
  function Dh(o) {
    return o === null ? false : o.childNodes.length === 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isLeaf = void 0;
    var e = ai;
    Object.defineProperty(o, "isLeaf", {
      enumerable: true,
      get: function() {
        return e.isLeaf;
      }
    });
  })(si);
  var li = {}, ci = {};
  Object.defineProperty(ci, "__esModule", {
    value: true
  });
  ci.isNodeEmpty = $h;
  var Rh = io, jh = ni, Hh = Ke, Fh = ro;
  function $h(o, e) {
    var t = "";
    return (0, Fh.isSingleTag)(o) && !(0, Rh.isLineBreakTag)(o) ? false : ((0, jh.isElement)(o) && (0, Hh.isNativeInput)(o) ? t = o.value : o.textContent !== null && (t = o.textContent.replace("\u200B", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isNodeEmpty = void 0;
    var e = ci;
    Object.defineProperty(o, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return e.isNodeEmpty;
      }
    });
  })(li);
  Object.defineProperty(ri, "__esModule", {
    value: true
  });
  ri.isEmpty = zh;
  var Vh = si, Uh = li;
  function zh(o, e) {
    o.normalize();
    for (var t = [
      o
    ]; t.length > 0; ) {
      var n = t.shift();
      if (n) {
        if (o = n, (0, Vh.isLeaf)(o) && !(0, Uh.isNodeEmpty)(o, e)) return false;
        t.push.apply(t, Array.from(o.childNodes));
      }
    }
    return true;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isEmpty = void 0;
    var e = ri;
    Object.defineProperty(o, "isEmpty", {
      enumerable: true,
      get: function() {
        return e.isEmpty;
      }
    });
  })(Ts);
  var _s = {}, di = {};
  Object.defineProperty(di, "__esModule", {
    value: true
  });
  di.isFragment = Wh;
  var qh = Wn;
  function Wh(o) {
    return (0, qh.isNumber)(o) ? false : !!o && !!o.nodeType && o.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isFragment = void 0;
    var e = di;
    Object.defineProperty(o, "isFragment", {
      enumerable: true,
      get: function() {
        return e.isFragment;
      }
    });
  })(_s);
  var Ss = {}, ui = {};
  Object.defineProperty(ui, "__esModule", {
    value: true
  });
  ui.isHTMLString = Xh;
  var Yh = no;
  function Xh(o) {
    var e = (0, Yh.make)("div");
    return e.innerHTML = o, e.childElementCount > 0;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isHTMLString = void 0;
    var e = ui;
    Object.defineProperty(o, "isHTMLString", {
      enumerable: true,
      get: function() {
        return e.isHTMLString;
      }
    });
  })(Ss);
  var Bs = {}, hi = {};
  Object.defineProperty(hi, "__esModule", {
    value: true
  });
  hi.offset = Kh;
  function Kh(o) {
    var e = o.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, i = e.top + n, r = e.left + t;
    return {
      top: i,
      left: r,
      bottom: i + e.height,
      right: r + e.width
    };
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.offset = void 0;
    var e = hi;
    Object.defineProperty(o, "offset", {
      enumerable: true,
      get: function() {
        return e.offset;
      }
    });
  })(Bs);
  var Os = {}, pi = {};
  Object.defineProperty(pi, "__esModule", {
    value: true
  });
  pi.prepend = Gh;
  function Gh(o, e) {
    Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
      return o.prepend(t);
    })) : o.prepend(e);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.prepend = void 0;
    var e = pi;
    Object.defineProperty(o, "prepend", {
      enumerable: true,
      get: function() {
        return e.prepend;
      }
    });
  })(Os);
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.prepend = o.offset = o.make = o.isLineBreakTag = o.isSingleTag = o.isNodeEmpty = o.isLeaf = o.isHTMLString = o.isFragment = o.isEmpty = o.isElement = o.isContentEditable = o.isCollapsedWhitespaces = o.findAllInputs = o.isNativeInput = o.allInputsSelector = o.getDeepestNode = o.getDeepestBlockElements = o.getContentLength = o.fragmentToString = o.containsOnlyInlineElements = o.canSetCaret = o.calculateBaseline = o.blockElements = o.append = void 0;
    var e = Nn;
    Object.defineProperty(o, "allInputsSelector", {
      enumerable: true,
      get: function() {
        return e.allInputsSelector;
      }
    });
    var t = Ke;
    Object.defineProperty(o, "isNativeInput", {
      enumerable: true,
      get: function() {
        return t.isNativeInput;
      }
    });
    var n = ps;
    Object.defineProperty(o, "append", {
      enumerable: true,
      get: function() {
        return n.append;
      }
    });
    var i = jn;
    Object.defineProperty(o, "blockElements", {
      enumerable: true,
      get: function() {
        return i.blockElements;
      }
    });
    var r = fs;
    Object.defineProperty(o, "calculateBaseline", {
      enumerable: true,
      get: function() {
        return r.calculateBaseline;
      }
    });
    var s = gs;
    Object.defineProperty(o, "canSetCaret", {
      enumerable: true,
      get: function() {
        return s.canSetCaret;
      }
    });
    var a = oo;
    Object.defineProperty(o, "containsOnlyInlineElements", {
      enumerable: true,
      get: function() {
        return a.containsOnlyInlineElements;
      }
    });
    var d = bs;
    Object.defineProperty(o, "fragmentToString", {
      enumerable: true,
      get: function() {
        return d.fragmentToString;
      }
    });
    var u = ys;
    Object.defineProperty(o, "getContentLength", {
      enumerable: true,
      get: function() {
        return u.getContentLength;
      }
    });
    var p = Gn;
    Object.defineProperty(o, "getDeepestBlockElements", {
      enumerable: true,
      get: function() {
        return p.getDeepestBlockElements;
      }
    });
    var v = ws;
    Object.defineProperty(o, "getDeepestNode", {
      enumerable: true,
      get: function() {
        return v.getDeepestNode;
      }
    });
    var b = xs;
    Object.defineProperty(o, "findAllInputs", {
      enumerable: true,
      get: function() {
        return b.findAllInputs;
      }
    });
    var w = Cs;
    Object.defineProperty(o, "isCollapsedWhitespaces", {
      enumerable: true,
      get: function() {
        return w.isCollapsedWhitespaces;
      }
    });
    var y = Vn;
    Object.defineProperty(o, "isContentEditable", {
      enumerable: true,
      get: function() {
        return y.isContentEditable;
      }
    });
    var T = ni;
    Object.defineProperty(o, "isElement", {
      enumerable: true,
      get: function() {
        return T.isElement;
      }
    });
    var q = Ts;
    Object.defineProperty(o, "isEmpty", {
      enumerable: true,
      get: function() {
        return q.isEmpty;
      }
    });
    var U = _s;
    Object.defineProperty(o, "isFragment", {
      enumerable: true,
      get: function() {
        return U.isFragment;
      }
    });
    var z = Ss;
    Object.defineProperty(o, "isHTMLString", {
      enumerable: true,
      get: function() {
        return z.isHTMLString;
      }
    });
    var ae = si;
    Object.defineProperty(o, "isLeaf", {
      enumerable: true,
      get: function() {
        return ae.isLeaf;
      }
    });
    var Q = li;
    Object.defineProperty(o, "isNodeEmpty", {
      enumerable: true,
      get: function() {
        return Q.isNodeEmpty;
      }
    });
    var G = io;
    Object.defineProperty(o, "isLineBreakTag", {
      enumerable: true,
      get: function() {
        return G.isLineBreakTag;
      }
    });
    var oe = ro;
    Object.defineProperty(o, "isSingleTag", {
      enumerable: true,
      get: function() {
        return oe.isSingleTag;
      }
    });
    var we = no;
    Object.defineProperty(o, "make", {
      enumerable: true,
      get: function() {
        return we.make;
      }
    });
    var M = Bs;
    Object.defineProperty(o, "offset", {
      enumerable: true,
      get: function() {
        return M.offset;
      }
    });
    var _ = Os;
    Object.defineProperty(o, "prepend", {
      enumerable: true,
      get: function() {
        return _.prepend;
      }
    });
  })(Xe);
  var Zh = {}, fi = {}, so = {}, ao = {};
  Object.defineProperty(ao, "__esModule", {
    value: true
  });
  ao.getContenteditableSlice = Jh;
  var Qh = Xe;
  function Jh(o, e, t, n, i) {
    var r;
    i === void 0 && (i = false);
    var s = document.createRange();
    if (n === "left" ? (s.setStart(o, 0), s.setEnd(e, t)) : (s.setStart(e, t), s.setEnd(o, o.childNodes.length)), i === true) {
      var a = s.extractContents();
      return (0, Qh.fragmentToString)(a);
    }
    var d = s.cloneContents(), u = document.createElement("div");
    u.appendChild(d);
    var p = (r = u.textContent) !== null && r !== void 0 ? r : "";
    return p;
  }
  Object.defineProperty(so, "__esModule", {
    value: true
  });
  so.checkContenteditableSliceForEmptiness = op;
  var ep = Xe, tp = ao;
  function op(o, e, t, n) {
    var i = (0, tp.getContenteditableSlice)(o, e, t, n);
    return (0, ep.isCollapsedWhitespaces)(i);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.checkContenteditableSliceForEmptiness = void 0;
    var e = so;
    Object.defineProperty(o, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
  })(fi);
  var Ms = {};
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getContenteditableSlice = void 0;
    var e = ao;
    Object.defineProperty(o, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return e.getContenteditableSlice;
      }
    });
  })(Ms);
  var As = {}, gi = {};
  Object.defineProperty(gi, "__esModule", {
    value: true
  });
  gi.focus = ip;
  var np = Xe;
  function ip(o, e) {
    var t, n;
    if (e === void 0 && (e = true), (0, np.isNativeInput)(o)) {
      o.focus();
      var i = e ? 0 : o.value.length;
      o.setSelectionRange(i, i);
    } else {
      var r = document.createRange(), s = window.getSelection();
      if (!s) return;
      var a = function(b, w) {
        w === void 0 && (w = false);
        var y = document.createTextNode("");
        w ? b.insertBefore(y, b.firstChild) : b.appendChild(y), r.setStart(y, 0), r.setEnd(y, 0);
      }, d = function(b) {
        return b != null;
      }, u = o.childNodes, p = e ? u[0] : u[u.length - 1];
      if (d(p)) {
        for (; d(p) && p.nodeType !== Node.TEXT_NODE; ) p = e ? p.firstChild : p.lastChild;
        if (d(p) && p.nodeType === Node.TEXT_NODE) {
          var v = (n = (t = p.textContent) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0, i = e ? 0 : v;
          r.setStart(p, i), r.setEnd(p, i);
        } else a(o, e);
      } else a(o);
      s.removeAllRanges(), s.addRange(r);
    }
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.focus = void 0;
    var e = gi;
    Object.defineProperty(o, "focus", {
      enumerable: true,
      get: function() {
        return e.focus;
      }
    });
  })(As);
  var mi = {}, lo = {};
  Object.defineProperty(lo, "__esModule", {
    value: true
  });
  lo.getCaretNodeAndOffset = rp;
  function rp() {
    var o = window.getSelection();
    if (o === null) return [
      null,
      0
    ];
    var e = o.focusNode, t = o.focusOffset;
    return e === null ? [
      null,
      0
    ] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [
      e,
      t
    ]);
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getCaretNodeAndOffset = void 0;
    var e = lo;
    Object.defineProperty(o, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return e.getCaretNodeAndOffset;
      }
    });
  })(mi);
  var Is = {}, co = {};
  Object.defineProperty(co, "__esModule", {
    value: true
  });
  co.getRange = sp;
  function sp() {
    var o = window.getSelection();
    return o && o.rangeCount ? o.getRangeAt(0) : null;
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.getRange = void 0;
    var e = co;
    Object.defineProperty(o, "getRange", {
      enumerable: true,
      get: function() {
        return e.getRange;
      }
    });
  })(Is);
  var Ps = {}, vi = {};
  Object.defineProperty(vi, "__esModule", {
    value: true
  });
  vi.isCaretAtEndOfInput = cp;
  var $i = Xe, ap = mi, lp = fi;
  function cp(o) {
    var e = (0, $i.getDeepestNode)(o, true);
    if (e === null) return true;
    if ((0, $i.isNativeInput)(e)) return e.selectionEnd === e.value.length;
    var t = (0, ap.getCaretNodeAndOffset)(), n = t[0], i = t[1];
    return n === null ? false : (0, lp.checkContenteditableSliceForEmptiness)(o, n, i, "right");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCaretAtEndOfInput = void 0;
    var e = vi;
    Object.defineProperty(o, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtEndOfInput;
      }
    });
  })(Ps);
  var Ns = {}, bi = {};
  Object.defineProperty(bi, "__esModule", {
    value: true
  });
  bi.isCaretAtStartOfInput = hp;
  var Bt = Xe, dp = lo, up = so;
  function hp(o) {
    var e = (0, Bt.getDeepestNode)(o);
    if (e === null || (0, Bt.isEmpty)(o)) return true;
    if ((0, Bt.isNativeInput)(e)) return e.selectionEnd === 0;
    if ((0, Bt.isEmpty)(o)) return true;
    var t = (0, dp.getCaretNodeAndOffset)(), n = t[0], i = t[1];
    return n === null ? false : (0, up.checkContenteditableSliceForEmptiness)(o, n, i, "left");
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.isCaretAtStartOfInput = void 0;
    var e = bi;
    Object.defineProperty(o, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return e.isCaretAtStartOfInput;
      }
    });
  })(Ns);
  var Ls = {}, yi = {};
  Object.defineProperty(yi, "__esModule", {
    value: true
  });
  yi.save = gp;
  var pp = Xe, fp = co;
  function gp() {
    var o = (0, fp.getRange)(), e = (0, pp.make)("span");
    if (e.id = "cursor", e.hidden = true, !!o) return o.insertNode(e), function() {
      var t = window.getSelection();
      t && (o.setStartAfter(e), o.setEndAfter(e), t.removeAllRanges(), t.addRange(o), setTimeout(function() {
        e.remove();
      }, 150));
    };
  }
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.save = void 0;
    var e = yi;
    Object.defineProperty(o, "save", {
      enumerable: true,
      get: function() {
        return e.save;
      }
    });
  })(Ls);
  (function(o) {
    Object.defineProperty(o, "__esModule", {
      value: true
    }), o.save = o.isCaretAtStartOfInput = o.isCaretAtEndOfInput = o.getRange = o.getCaretNodeAndOffset = o.focus = o.getContenteditableSlice = o.checkContenteditableSliceForEmptiness = void 0;
    var e = fi;
    Object.defineProperty(o, "checkContenteditableSliceForEmptiness", {
      enumerable: true,
      get: function() {
        return e.checkContenteditableSliceForEmptiness;
      }
    });
    var t = Ms;
    Object.defineProperty(o, "getContenteditableSlice", {
      enumerable: true,
      get: function() {
        return t.getContenteditableSlice;
      }
    });
    var n = As;
    Object.defineProperty(o, "focus", {
      enumerable: true,
      get: function() {
        return n.focus;
      }
    });
    var i = mi;
    Object.defineProperty(o, "getCaretNodeAndOffset", {
      enumerable: true,
      get: function() {
        return i.getCaretNodeAndOffset;
      }
    });
    var r = Is;
    Object.defineProperty(o, "getRange", {
      enumerable: true,
      get: function() {
        return r.getRange;
      }
    });
    var s = Ps;
    Object.defineProperty(o, "isCaretAtEndOfInput", {
      enumerable: true,
      get: function() {
        return s.isCaretAtEndOfInput;
      }
    });
    var a = Ns;
    Object.defineProperty(o, "isCaretAtStartOfInput", {
      enumerable: true,
      get: function() {
        return a.isCaretAtStartOfInput;
      }
    });
    var d = Ls;
    Object.defineProperty(o, "save", {
      enumerable: true,
      get: function() {
        return d.save;
      }
    });
  })(Zh);
  async function mp() {
    return ie`
    <div class="offcanvas offcanvas-end w-75" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" id="quickNotes" aria-labelledby="analysisConfigsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="quickNotesLabel">Quick notes</h5>
            <div class="d-flex gap-2 ms-auto">
                <a href="/api/v1/files/export-quicknotes" jolt-click="closeOffcanvas" title="Export pdf" class="btn text-reset" target="_blank" router-ignore="true"><i class="fas fa-save"></i></a>
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
  async function vp(o, e, t) {
    const n = await this.editor.save(), [i, r] = await qt.post({
      url: `${this.properties.apiUrl}/quicknotes`,
      data: n
    });
    (i || !r.ok) && this.ext.messenger.setMessage({
      msg: "Failed to save msg",
      status: "warning"
    });
  }
  function bp(o, e, t) {
    o.blur(), this.offcanvasInstance.hide();
  }
  const yp = de({
    tagName: "quick-notes-offcanvas",
    markup: mp,
    methods: {
      saveNotes: vp,
      closeOffcanvas: bp
    },
    afterInit: {
      editorInit: function() {
        this.editor = new Bu({
          autofocus: true,
          holder: "quickNotesEditor",
          tools: {
            header: {
              class: Du,
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
      editor: ge(null),
      data: {
        get() {
          return this.getData("quicknotes");
        }
      },
      offcanvasEl: me("#quickNotes"),
      offcanvasInstance: {
        get() {
          return bootstrap.Offcanvas.getInstance(this.offcanvasEl);
        }
      }
    }
  });
  async function kp() {
    return ie`
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
  async function Vi() {
    if (this.about) return;
    let [o, e] = await qt.get({
      url: "/about"
    });
    if (o) return this.ext.messenger.setMessage({
      msg: "Failed to fetch about information",
      status: "warning"
    });
    if ([o, e] = await e.json(), o) return this.ext.messenger.setMessage({
      msg: "Failed to parse about information",
      status: "warning"
    });
    this.about = e.data;
  }
  const wp = de({
    tagName: "about-info",
    markup: kp,
    methods: {
      getAboutInfo: Vi
    },
    beforeInit: {
      getAboutInfo: Vi
    },
    define: {
      about: ge(null)
    }
  });
  function Ep(o) {
    fetch("/api/v1/roi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cors: "no-cors"
      },
      body: JSON.stringify({
        roi_type: "ellipse",
        roi_data: o
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
  async function xp(o) {
    const e = o.data;
    try {
      this.drawTimeSeries(e);
    } catch (t) {
      console.error(t);
    }
    this.redrawCanvas();
  }
  async function Cp(o, e) {
    switch (e.button) {
      case 0:
        if (this.isDPressed == true) {
          const n = this.canvas.getBoundingClientRect();
          let i = e.clientX - n.left, r = e.clientY - n.top;
          const s = this.findClickedEllipseIndex(i, r);
          if (s != null) {
            if ((await fetch(`/api/v1/roi/${s}`, {
              method: "DELETE"
            })).ok) {
              this.selectedRois.splice(s, 1), this.setData("rois", this.selectedRois), this.redrawCanvas(), this.removeTrace(s);
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
  function Tp(o, e) {
    if (this.isDrawing) {
      this.redrawCanvas();
      const t = canvas.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top;
      this.drawEllipse(this.startX, this.startY, n, i, false);
    }
  }
  function _p(o, e) {
    switch (e.button) {
      case 0:
        break;
      case 2:
        if (this.isDrawing) {
          const t = this.canvas.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top;
          this.getRoiData({
            startX: Math.round(this.startX),
            startY: Math.round(this.startY),
            endX: Math.round(n),
            endY: Math.round(i)
          });
        }
        this.isDrawing = false;
        break;
    }
  }
  function Sp(o, e, t, n, i = false, r = "orange", s = 3) {
    i && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.strokeStyle = r, this.ctx.lineWidth = s, this.ctx.beginPath(), this.ctx.ellipse((o + t) / 2, (e + n) / 2, Math.abs(t - o) / 2, Math.abs(n - e) / 2, 0, 0, 2 * Math.PI), this.ctx.stroke();
  }
  function Bp() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.selectedRois.forEach((o) => {
      const e = o.roi_schema.roi_data;
      this.drawEllipse(e.startX, e.startY, e.endX, e.endY);
    });
  }
  async function Op(o, e, t) {
    const n = +o.value;
    this.video.playbackRate = n, e.target.labels[0].innerHTML = `Speed: ${n}x`;
  }
  async function Mp(o, e, t) {
    const n = e.offsetX / o.offsetWidth;
    this.video.currentTime = n * video.duration;
  }
  async function Ap() {
    const o = this.video.currentTime / this.video.duration * 100;
    this.seekbar.style.width = o + "%";
  }
  async function Ip(o, e) {
    this.video.paused || this.video.ended ? (this.video.play(), this.playPauseButton.textContent = "Pause") : (this.video.pause(), this.playPauseButton.textContent = "Play"), o.blur();
  }
  async function Pp(o) {
    (o.key === "D" || o.key === "d") && (this.isDPressed = true);
  }
  async function Np(o) {
    (o.key === "D" || o.key === "d") && (this.isDPressed = false);
  }
  async function Lp() {
    document.addEventListener("keydown", this.keyDownHandler), document.addEventListener("keyup", this.keyUpHandler);
  }
  async function Dp() {
    document.removeEventListener("keydown", this.keyDownHandler), document.removeEventListener("keyup", this.keyUpHandler);
  }
  function Rp(o) {
    this.plot.drawTimeSeries(o), this.singlePlot.removeTrace(), this.singlePlot.drawTimeSeries(o);
  }
  function jp() {
    if (this.selectedRois.length < 1) return;
    yt(), this.plot.purgeTraces(), this.plot.initPlot();
    for (const e of this.selectedRois) this.plot.drawTimeSeries(e);
    this.singlePlot.removeTrace();
    const o = this.selectedRois[this.selectedRois.length - 1];
    this.singlePlot.drawTimeSeries(o), Wt();
  }
  function Hp(o, e) {
    return this.selectedRois.reduce((n, i, r) => {
      const s = (i.roi_schema.roi_data.startX + i.roi_schema.roi_data.endX) / 2, a = (i.roi_schema.roi_data.startY + i.roi_schema.roi_data.endY) / 2, d = Math.abs(i.roi_schema.roi_data.endX - i.roi_schema.roi_data.startX) / 2, u = Math.abs(i.roi_schema.roi_data.endY - i.roi_schema.roi_data.startY) / 2;
      return (o - s) ** 2 / d ** 2 + (e - a) ** 2 / u ** 2 <= 1 && n === null ? r : n;
    }, null);
  }
  function Fp(o) {
    this.plot.removeTrace(o), this.singlePlot.removeTrace();
    const e = this.selectedRois[this.selectedRois.length - 1];
    this.singlePlot.drawTimeSeries(e);
  }
  const $p = de({
    tagName: "video-player",
    markup: async function() {
      return await this.getHTMLtemplate("/video");
    },
    methods: {
      setPlaybackSpeed: Op,
      seek: Mp,
      updateSeekBar: Ap,
      playPauseVideo: Ip,
      canvasClick: Cp,
      canvasMouseMove: Tp,
      canvasMouseUp: _p,
      drawEllipse: Sp,
      keyDownHandler: Pp,
      keyUpHandler: Np,
      getRoiData: Ep,
      redrawCanvas: Bp,
      handleResponse: xp,
      drawTimeSeries: Rp,
      findClickedEllipseIndex: Hp,
      removeTrace: Fp,
      redrawAllTS: jp
    },
    beforeInit: {
      getInitialSampling: function() {
        this.initialSampling = parseFloat(this.sampling);
      },
      addEventListeners: Lp,
      preferencesChange: function() {
        this.app.addEventListener(Le.CHANGE, (o) => {
          o.detail.field == "preferences" && this.initialSampling != parseFloat(this.sampling) && (this.initialSampling = parseFloat(this.sampling), this.redrawAllTS());
        });
      }
    },
    afterInit: {
      drawRois: function() {
        this.selectedRois && this.redrawCanvas();
      }
    },
    afterDisconnect: {
      removeEventListeners: Dp
    },
    define: {
      video: me("video"),
      seekbar: me(".seekbar"),
      playPauseButton: me("#play-pause"),
      canvas: me("#canvas"),
      ctx: {
        get() {
          return this.canvas.getContext("2d");
        }
      },
      time: ge(null),
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
      isDrawing: ge(false),
      isDPressed: ge(false),
      startX: ge(null),
      startY: ge(null),
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
      initialSampling: ge(null)
    }
  });
  async function Vp() {
    return "";
  }
  function Up({ title: o, content: e, modalId: t }) {
    return ie`
    <div class="modal" data-modal-id="${t}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${o}</h5>
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
  function zp({ title: o, content: e, modalId: t }) {
    return ie`
    <div class="modal" data-modal-id="${t}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${o}</h5>
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
  async function qp({ msg: o, status: e, msgId: t }) {
    return ie`
        <div class="toast toast-${t} show bg-${e}" role="alert" aria-live="assertive"
            aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header bg-transparent">
                <button type="button" class="btn-close btn-close-white" jolt-click="removeToast" :msgid="${t}" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${o}
            </div>
        </div>
    `;
  }
  async function Wp(o, e, t) {
    const n = this.querySelector(`.toast-${t.msgid}`);
    n && n.remove();
  }
  async function Yp({ msg: o, status: e = "info" }) {
    const t = this.app.generateHash(6), n = await this.msgMarkup({
      msg: o,
      status: e,
      msgId: t
    });
    this.insertAdjacentHTML("beforeend", n), setTimeout(() => {
      this.removeToast(null, null, {
        msgid: t
      });
    }, 6e3);
  }
  async function Xp({ title: o, content: e, modalOptions: t }) {
    const n = `modal-${this.app.generateHash(6)}`;
    return this.insertAdjacentHTML("beforeend", await this.infoModalMarkup({
      title: o,
      content: e,
      modalId: n
    })), await this.initModal(n, t);
  }
  async function Kp({ title: o, content: e, callbackFunction: t, modalOptions: n }) {
    const i = `modal-${this.app.generateHash(6)}`;
    this.insertAdjacentHTML("beforeend", await this.confirmModalMarkup({
      title: o,
      content: e,
      modalId: i
    }));
    const r = await this.initModal(i, n);
    return this.querySelector(`.confirm-button-${i}`).addEventListener("click", async (a) => {
      await t(a, r), await this.closeModal(a.target);
    }), r;
  }
  async function Gp(o, e) {
    const t = {
      ...this.defaultOptions
    };
    e && (t = {
      ...t,
      ...e
    });
    const n = this.querySelector(`[data-modal-id="${o}"]`), i = new bootstrap.Modal(n, t);
    return this.modals.push(i), i.show(), i;
  }
  async function Zp(o, e, t) {
    o.blur();
    const n = o.closest(".modal");
    if (!n) return;
    n.getAttribute("data-modal-id"), bootstrap.Modal.getInstance(n).hide(), n.remove();
  }
  const Qp = de({
    tagName: "messenger-element",
    markup: Vp,
    methods: {
      closeModal: Zp,
      infoModal: Xp,
      infoModalMarkup: Up,
      initModal: Gp,
      confirmModal: Kp,
      confirmModalMarkup: zp,
      msgMarkup: qp,
      setMessage: Yp,
      removeToast: Wp
    },
    define: {
      defaultOptions: ge({
        backdrop: true,
        focus: true,
        keyboard: true
      }),
      modals: ge([])
    }
  });
  class Jp {
    constructor(e) {
      __publicField(this, "infoModal", async ({ title: e, content: t, modalOptions: n }) => await this.messengerElement.infoModal({
        title: e,
        content: t,
        modalOptions: n
      }));
      __publicField(this, "confirmModal", async ({ title: e, content: t, callbackFunction: n, modalOptions: i }) => await this.messengerElement.confirmModal({
        title: e,
        content: t,
        callbackFunction: n,
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
  async function ef() {
    return ie`
      <div id="ts-plot-all"></div>
    `;
  }
  function tf(o) {
    const e = [
      ...Array(o.data.length).keys()
    ].map((t) => (t + 1) / this.sampling);
    Plotly.addTraces(this.plotDiv, [
      {
        x: e,
        y: o.data
      }
    ]);
  }
  function of(o) {
    Plotly.deleteTraces(this.plotDiv, o);
  }
  function nf() {
    Plotly.purge(this.plotDiv);
  }
  function zt() {
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
  const rf = de({
    tagName: "ts-plot-all",
    markup: ef,
    methods: {
      drawTimeSeries: tf,
      removeTrace: of,
      purgeTraces: nf,
      initPlot: zt
    },
    afterInit: {
      initPlot: zt,
      drawTs: function() {
        if (this.rois) for (const o of this.rois) this.drawTimeSeries(o);
      }
    },
    define: {
      plotDiv: me("#ts-plot-all"),
      plot: ge(null),
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
  async function sf() {
    return ie`
        <div id="ts-plot-single"></div>
    `;
  }
  function af(o) {
    if (!o || !o.data) {
      this.removeTrace();
      return;
    }
    const e = [
      ...Array(o.data.length).keys()
    ].map((t) => (t + 1) / this.sampling);
    Plotly.addTraces(this.plotDiv, [
      {
        x: e,
        y: o.data
      }
    ]);
  }
  const lf = de({
    tagName: "single-plot",
    markup: sf,
    methods: {
      drawTimeSeries: af,
      removeTrace: function() {
        this.plotDiv.data.length > 0 && Plotly.deleteTraces(this.plotDiv, 0);
      },
      initPlot: zt
    },
    afterInit: {
      initPlot: zt,
      drawTs: function() {
        this.roi && this.drawTimeSeries(this.roi);
      }
    },
    define: {
      plotDiv: me("#ts-plot-single"),
      plot: ge(null),
      sampling: {
        get() {
          return +this.getData("preferences").sampling;
        }
      },
      roi: {
        get() {
          const o = this.getData("rois");
          return !o || o.length == 0 ? null : o[o.length - 1];
        }
      },
      time: ge(null)
    }
  });
  async function cf() {
    return ie`
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
  const df = de({
    tagName: "license-tab",
    markup: cf
  });
  async function uf() {
    return ie`
    <p>
        Šterk, M., & Gosak, M. (2025). Beta cell analysis: roi picker (Version 1.0.) [Computer software]. https://doi.org/https://github.com/MarkoSterk/beta_cell_analysis_roi_picker
    </p>
    `;
  }
  const hf = de({
    tagName: "citation-tab",
    markup: uf
  });
  async function pf() {
    return ie`
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
  const ff = de({
    tagName: "contact-tab",
    markup: pf
  });
  async function gf() {
    return ie`
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
  async function mf(o, e, t) {
    o.blur();
  }
  const vf = de({
    tagName: "issues-tab",
    markup: gf,
    methods: {
      unfocusBtn: mf
    }
  });
  async function bf() {
    return ie`
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
  const yf = de({
    tagName: "basic-usage-tab",
    markup: bf
  }), kf = {
    baseLayout: pa,
    menuElement: Ra
  }, wf = {
    homePage: er,
    documentationPage: tr
  }, Ef = {
    configurationsOffcanvas: Va,
    quickNotesOffcanvas: yp,
    aboutInfo: wp,
    messengerElement: Qp,
    uploadDropZone: Ea,
    videoPlayer: $p,
    tsPlotAll: rf,
    singlePlot: lf,
    licenseTab: df,
    citationTab: hf,
    contactTab: ff,
    issuesTab: vf,
    basicUsageTab: yf
  }, Ui = {
    ...kf,
    ...wf,
    ...Ef
  }, zi = "#content";
  function xf() {
    return [
      {
        path: "/",
        handler: er,
        target: zi
      },
      {
        path: "/documentation",
        handler: tr,
        target: zi
      }
    ];
  }
  const Cf = {
    apiUrl: "/api/v1",
    baseUrl: "http://localhost:8080",
    filesApi: {
      uploadLif: [
        "/api/v1/files",
        "postForm"
      ]
    }
  }, Tf = new ta({
    appName: "Beta cell analysis",
    dataStructure: {
      data: null,
      video: null,
      rois: null,
      preferences: null,
      quicknotes: null
    },
    elements: Ui,
    properties: Cf,
    router: function(o) {
      return new Hs({
        baseUrl: "/app",
        routes: xf,
        baseLayout: Ui.baseLayout,
        defaultTarget: "#content",
        index: "/",
        app: o
      });
    },
    extensions: {
      messenger: function(o) {
        return new Jp(o);
      }
    },
    beforeInit: {
      startOverlaySpinner: yt,
      getState: async function() {
        let o = await fetch("/state");
        if (!(o == null ? void 0 : o.ok) && (o == null ? void 0 : o.status) != 200) throw new Error("Failed to fetch initial state");
        o = await o.json();
        for (const [e, t] of Object.entries(o.data)) this.setData(e, t);
      },
      suppressContextMenu: function() {
        document.addEventListener("contextmenu", (o) => {
          o.preventDefault();
        });
      }
    },
    afterInit: {
      removeOverlaySpinner: Wt
    }
  });
  async function _f() {
    await Tf.init("#app");
  }
  await _f();
})();
