function J_(e, t) {
  for (var r = 0; r < t.length; r++) {
    const o = t[r];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const s in o)
        if (s !== "default" && !(s in e)) {
          const l = Object.getOwnPropertyDescriptor(o, s);
          l && Object.defineProperty(e, s, l.get ? l : {
            enumerable: !0,
            get: () => o[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function Qr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yd = { exports: {} }, as = {}, Jd = { exports: {} }, Ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function X_() {
  if (ey) return Ee;
  ey = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.iterator;
  function v(D) {
    return D === null || typeof D != "object" ? null : (D = y && D[y] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var _ = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, S = Object.assign, b = {};
  function C(D, G, oe) {
    this.props = D, this.context = G, this.refs = b, this.updater = oe || _;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(D, G) {
    if (typeof D != "object" && typeof D != "function" && D != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, D, G, "setState");
  }, C.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function R() {
  }
  R.prototype = C.prototype;
  function O(D, G, oe) {
    this.props = D, this.context = G, this.refs = b, this.updater = oe || _;
  }
  var x = O.prototype = new R();
  x.constructor = O, S(x, C.prototype), x.isPureReactComponent = !0;
  var P = Array.isArray, E = Object.prototype.hasOwnProperty, M = { current: null }, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function I(D, G, oe) {
    var te, se = {}, le = null, de = null;
    if (G != null) for (te in G.ref !== void 0 && (de = G.ref), G.key !== void 0 && (le = "" + G.key), G) E.call(G, te) && !A.hasOwnProperty(te) && (se[te] = G[te]);
    var he = arguments.length - 2;
    if (he === 1) se.children = oe;
    else if (1 < he) {
      for (var fe = Array(he), ue = 0; ue < he; ue++) fe[ue] = arguments[ue + 2];
      se.children = fe;
    }
    if (D && D.defaultProps) for (te in he = D.defaultProps, he) se[te] === void 0 && (se[te] = he[te]);
    return { $$typeof: e, type: D, key: le, ref: de, props: se, _owner: M.current };
  }
  function L(D, G) {
    return { $$typeof: e, type: D.type, key: G, ref: D.ref, props: D.props, _owner: D._owner };
  }
  function w(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function T(D) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(oe) {
      return G[oe];
    });
  }
  var N = /\/+/g;
  function V(D, G) {
    return typeof D == "object" && D !== null && D.key != null ? T("" + D.key) : G.toString(36);
  }
  function F(D, G, oe, te, se) {
    var le = typeof D;
    (le === "undefined" || le === "boolean") && (D = null);
    var de = !1;
    if (D === null) de = !0;
    else switch (le) {
      case "string":
      case "number":
        de = !0;
        break;
      case "object":
        switch (D.$$typeof) {
          case e:
          case t:
            de = !0;
        }
    }
    if (de) return de = D, se = se(de), D = te === "" ? "." + V(de, 0) : te, P(se) ? (oe = "", D != null && (oe = D.replace(N, "$&/") + "/"), F(se, G, oe, "", function(ue) {
      return ue;
    })) : se != null && (w(se) && (se = L(se, oe + (!se.key || de && de.key === se.key ? "" : ("" + se.key).replace(N, "$&/") + "/") + D)), G.push(se)), 1;
    if (de = 0, te = te === "" ? "." : te + ":", P(D)) for (var he = 0; he < D.length; he++) {
      le = D[he];
      var fe = te + V(le, he);
      de += F(le, G, oe, fe, se);
    }
    else if (fe = v(D), typeof fe == "function") for (D = fe.call(D), he = 0; !(le = D.next()).done; ) le = le.value, fe = te + V(le, he++), de += F(le, G, oe, fe, se);
    else if (le === "object") throw G = String(D), Error("Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead.");
    return de;
  }
  function j(D, G, oe) {
    if (D == null) return D;
    var te = [], se = 0;
    return F(D, te, "", "", function(le) {
      return G.call(oe, le, se++);
    }), te;
  }
  function H(D) {
    if (D._status === -1) {
      var G = D._result;
      G = G(), G.then(function(oe) {
        (D._status === 0 || D._status === -1) && (D._status = 1, D._result = oe);
      }, function(oe) {
        (D._status === 0 || D._status === -1) && (D._status = 2, D._result = oe);
      }), D._status === -1 && (D._status = 0, D._result = G);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var Y = { current: null }, U = { transition: null }, W = { ReactCurrentDispatcher: Y, ReactCurrentBatchConfig: U, ReactCurrentOwner: M };
  function K() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Ee.Children = { map: j, forEach: function(D, G, oe) {
    j(D, function() {
      G.apply(this, arguments);
    }, oe);
  }, count: function(D) {
    var G = 0;
    return j(D, function() {
      G++;
    }), G;
  }, toArray: function(D) {
    return j(D, function(G) {
      return G;
    }) || [];
  }, only: function(D) {
    if (!w(D)) throw Error("React.Children.only expected to receive a single React element child.");
    return D;
  } }, Ee.Component = C, Ee.Fragment = r, Ee.Profiler = s, Ee.PureComponent = O, Ee.StrictMode = o, Ee.Suspense = p, Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W, Ee.act = K, Ee.cloneElement = function(D, G, oe) {
    if (D == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + D + ".");
    var te = S({}, D.props), se = D.key, le = D.ref, de = D._owner;
    if (G != null) {
      if (G.ref !== void 0 && (le = G.ref, de = M.current), G.key !== void 0 && (se = "" + G.key), D.type && D.type.defaultProps) var he = D.type.defaultProps;
      for (fe in G) E.call(G, fe) && !A.hasOwnProperty(fe) && (te[fe] = G[fe] === void 0 && he !== void 0 ? he[fe] : G[fe]);
    }
    var fe = arguments.length - 2;
    if (fe === 1) te.children = oe;
    else if (1 < fe) {
      he = Array(fe);
      for (var ue = 0; ue < fe; ue++) he[ue] = arguments[ue + 2];
      te.children = he;
    }
    return { $$typeof: e, type: D.type, key: se, ref: le, props: te, _owner: de };
  }, Ee.createContext = function(D) {
    return D = { $$typeof: u, _currentValue: D, _currentValue2: D, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, D.Provider = { $$typeof: l, _context: D }, D.Consumer = D;
  }, Ee.createElement = I, Ee.createFactory = function(D) {
    var G = I.bind(null, D);
    return G.type = D, G;
  }, Ee.createRef = function() {
    return { current: null };
  }, Ee.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Ee.isValidElement = w, Ee.lazy = function(D) {
    return { $$typeof: g, _payload: { _status: -1, _result: D }, _init: H };
  }, Ee.memo = function(D, G) {
    return { $$typeof: f, type: D, compare: G === void 0 ? null : G };
  }, Ee.startTransition = function(D) {
    var G = U.transition;
    U.transition = {};
    try {
      D();
    } finally {
      U.transition = G;
    }
  }, Ee.unstable_act = K, Ee.useCallback = function(D, G) {
    return Y.current.useCallback(D, G);
  }, Ee.useContext = function(D) {
    return Y.current.useContext(D);
  }, Ee.useDebugValue = function() {
  }, Ee.useDeferredValue = function(D) {
    return Y.current.useDeferredValue(D);
  }, Ee.useEffect = function(D, G) {
    return Y.current.useEffect(D, G);
  }, Ee.useId = function() {
    return Y.current.useId();
  }, Ee.useImperativeHandle = function(D, G, oe) {
    return Y.current.useImperativeHandle(D, G, oe);
  }, Ee.useInsertionEffect = function(D, G) {
    return Y.current.useInsertionEffect(D, G);
  }, Ee.useLayoutEffect = function(D, G) {
    return Y.current.useLayoutEffect(D, G);
  }, Ee.useMemo = function(D, G) {
    return Y.current.useMemo(D, G);
  }, Ee.useReducer = function(D, G, oe) {
    return Y.current.useReducer(D, G, oe);
  }, Ee.useRef = function(D) {
    return Y.current.useRef(D);
  }, Ee.useState = function(D) {
    return Y.current.useState(D);
  }, Ee.useSyncExternalStore = function(D, G, oe) {
    return Y.current.useSyncExternalStore(D, G, oe);
  }, Ee.useTransition = function() {
    return Y.current.useTransition();
  }, Ee.version = "18.3.1", Ee;
}
var ty;
function Au() {
  return ty || (ty = 1, Jd.exports = X_()), Jd.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function Z_() {
  if (ny) return as;
  ny = 1;
  var e = Au(), t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(d, p, f) {
    var g, y = {}, v = null, _ = null;
    f !== void 0 && (v = "" + f), p.key !== void 0 && (v = "" + p.key), p.ref !== void 0 && (_ = p.ref);
    for (g in p) o.call(p, g) && !l.hasOwnProperty(g) && (y[g] = p[g]);
    if (d && d.defaultProps) for (g in p = d.defaultProps, p) y[g] === void 0 && (y[g] = p[g]);
    return { $$typeof: t, type: d, key: v, ref: _, props: y, _owner: s.current };
  }
  return as.Fragment = r, as.jsx = u, as.jsxs = u, as;
}
var ry;
function e1() {
  return ry || (ry = 1, Yd.exports = Z_()), Yd.exports;
}
var B = e1();
const As = {
  black: "#000",
  white: "#fff"
}, Ji = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, Xi = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Zi = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, eo = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, to = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
}, ls = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, t1 = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
function Si(e, ...t) {
  const r = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((o) => r.searchParams.append("args[]", o)), `Minified MUI error #${e}; visit ${r} for the full message.`;
}
const Vn = "$$material";
function ou() {
  return ou = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) ({}).hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, ou.apply(null, arguments);
}
var k = Au();
const Wt = /* @__PURE__ */ Qr(k), Nf = /* @__PURE__ */ J_({
  __proto__: null,
  default: Wt
}, [k]);
function n1(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function r1(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var i1 = /* @__PURE__ */ function() {
  function e(r) {
    var o = this;
    this._insertTag = function(s) {
      var l;
      o.tags.length === 0 ? o.insertionPoint ? l = o.insertionPoint.nextSibling : o.prepend ? l = o.container.firstChild : l = o.before : l = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(s, l), o.tags.push(s);
    }, this.isSpeedy = r.speedy === void 0 ? !0 : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(o) {
    o.forEach(this._insertTag);
  }, t.insert = function(o) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(r1(this));
    var s = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var l = n1(s);
      try {
        l.insertRule(o, l.cssRules.length);
      } catch {
      }
    } else
      s.appendChild(document.createTextNode(o));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(o) {
      var s;
      return (s = o.parentNode) == null ? void 0 : s.removeChild(o);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), Lt = "-ms-", su = "-moz-", Ae = "-webkit-", Dw = "comm", xp = "rule", kp = "decl", o1 = "@import", Fw = "@keyframes", s1 = "@layer", a1 = Math.abs, Iu = String.fromCharCode, l1 = Object.assign;
function u1(e, t) {
  return kt(e, 0) ^ 45 ? (((t << 2 ^ kt(e, 0)) << 2 ^ kt(e, 1)) << 2 ^ kt(e, 2)) << 2 ^ kt(e, 3) : 0;
}
function zw(e) {
  return e.trim();
}
function c1(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ie(e, t, r) {
  return e.replace(t, r);
}
function Lf(e, t) {
  return e.indexOf(t);
}
function kt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Is(e, t, r) {
  return e.slice(t, r);
}
function jn(e) {
  return e.length;
}
function Cp(e) {
  return e.length;
}
function wl(e, t) {
  return t.push(e), e;
}
function d1(e, t) {
  return e.map(t).join("");
}
var Ou = 1, po = 1, jw = 0, Jt = 0, lt = 0, vo = "";
function Nu(e, t, r, o, s, l, u) {
  return { value: e, root: t, parent: r, type: o, props: s, children: l, line: Ou, column: po, length: u, return: "" };
}
function us(e, t) {
  return l1(Nu("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function f1() {
  return lt;
}
function p1() {
  return lt = Jt > 0 ? kt(vo, --Jt) : 0, po--, lt === 10 && (po = 1, Ou--), lt;
}
function on() {
  return lt = Jt < jw ? kt(vo, Jt++) : 0, po++, lt === 10 && (po = 1, Ou++), lt;
}
function Hn() {
  return kt(vo, Jt);
}
function Kl() {
  return Jt;
}
function Hs(e, t) {
  return Is(vo, e, t);
}
function Os(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Bw(e) {
  return Ou = po = 1, jw = jn(vo = e), Jt = 0, [];
}
function Uw(e) {
  return vo = "", e;
}
function Ql(e) {
  return zw(Hs(Jt - 1, Df(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function h1(e) {
  for (; (lt = Hn()) && lt < 33; )
    on();
  return Os(e) > 2 || Os(lt) > 3 ? "" : " ";
}
function g1(e, t) {
  for (; --t && on() && !(lt < 48 || lt > 102 || lt > 57 && lt < 65 || lt > 70 && lt < 97); )
    ;
  return Hs(e, Kl() + (t < 6 && Hn() == 32 && on() == 32));
}
function Df(e) {
  for (; on(); )
    switch (lt) {
      // ] ) " '
      case e:
        return Jt;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Df(lt);
        break;
      // (
      case 40:
        e === 41 && Df(e);
        break;
      // \
      case 92:
        on();
        break;
    }
  return Jt;
}
function m1(e, t) {
  for (; on() && e + lt !== 57; )
    if (e + lt === 84 && Hn() === 47)
      break;
  return "/*" + Hs(t, Jt - 1) + "*" + Iu(e === 47 ? e : on());
}
function y1(e) {
  for (; !Os(Hn()); )
    on();
  return Hs(e, Jt);
}
function v1(e) {
  return Uw(Gl("", null, null, null, [""], e = Bw(e), 0, [0], e));
}
function Gl(e, t, r, o, s, l, u, d, p) {
  for (var f = 0, g = 0, y = u, v = 0, _ = 0, S = 0, b = 1, C = 1, R = 1, O = 0, x = "", P = s, E = l, M = o, A = x; C; )
    switch (S = O, O = on()) {
      // (
      case 40:
        if (S != 108 && kt(A, y - 1) == 58) {
          Lf(A += Ie(Ql(O), "&", "&\f"), "&\f") != -1 && (R = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        A += Ql(O);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        A += h1(S);
        break;
      // \
      case 92:
        A += g1(Kl() - 1, 7);
        continue;
      // /
      case 47:
        switch (Hn()) {
          case 42:
          case 47:
            wl(w1(m1(on(), Kl()), t, r), p);
            break;
          default:
            A += "/";
        }
        break;
      // {
      case 123 * b:
        d[f++] = jn(A) * R;
      // } ; \0
      case 125 * b:
      case 59:
      case 0:
        switch (O) {
          // \0 }
          case 0:
          case 125:
            C = 0;
          // ;
          case 59 + g:
            R == -1 && (A = Ie(A, /\f/g, "")), _ > 0 && jn(A) - y && wl(_ > 32 ? oy(A + ";", o, r, y - 1) : oy(Ie(A, " ", "") + ";", o, r, y - 2), p);
            break;
          // @ ;
          case 59:
            A += ";";
          // { rule/at-rule
          default:
            if (wl(M = iy(A, t, r, f, g, s, d, x, P = [], E = [], y), l), O === 123)
              if (g === 0)
                Gl(A, t, M, M, P, l, y, d, E);
              else
                switch (v === 99 && kt(A, 3) === 110 ? 100 : v) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Gl(e, M, M, o && wl(iy(e, M, M, 0, 0, s, d, x, s, P = [], y), E), s, E, y, d, o ? P : E);
                    break;
                  default:
                    Gl(A, M, M, M, [""], E, 0, d, E);
                }
        }
        f = g = _ = 0, b = R = 1, x = A = "", y = u;
        break;
      // :
      case 58:
        y = 1 + jn(A), _ = S;
      default:
        if (b < 1) {
          if (O == 123)
            --b;
          else if (O == 125 && b++ == 0 && p1() == 125)
            continue;
        }
        switch (A += Iu(O), O * b) {
          // &
          case 38:
            R = g > 0 ? 1 : (A += "\f", -1);
            break;
          // ,
          case 44:
            d[f++] = (jn(A) - 1) * R, R = 1;
            break;
          // @
          case 64:
            Hn() === 45 && (A += Ql(on())), v = Hn(), g = y = jn(x = A += y1(Kl())), O++;
            break;
          // -
          case 45:
            S === 45 && jn(A) == 2 && (b = 0);
        }
    }
  return l;
}
function iy(e, t, r, o, s, l, u, d, p, f, g) {
  for (var y = s - 1, v = s === 0 ? l : [""], _ = Cp(v), S = 0, b = 0, C = 0; S < o; ++S)
    for (var R = 0, O = Is(e, y + 1, y = a1(b = u[S])), x = e; R < _; ++R)
      (x = zw(b > 0 ? v[R] + " " + O : Ie(O, /&\f/g, v[R]))) && (p[C++] = x);
  return Nu(e, t, r, s === 0 ? xp : d, p, f, g);
}
function w1(e, t, r) {
  return Nu(e, t, r, Dw, Iu(f1()), Is(e, 2, -2), 0);
}
function oy(e, t, r, o) {
  return Nu(e, t, r, kp, Is(e, 0, o), Is(e, o + 1, -1), o);
}
function lo(e, t) {
  for (var r = "", o = Cp(e), s = 0; s < o; s++)
    r += t(e[s], s, e, t) || "";
  return r;
}
function S1(e, t, r, o) {
  switch (e.type) {
    case s1:
      if (e.children.length) break;
    case o1:
    case kp:
      return e.return = e.return || e.value;
    case Dw:
      return "";
    case Fw:
      return e.return = e.value + "{" + lo(e.children, o) + "}";
    case xp:
      e.value = e.props.join(",");
  }
  return jn(r = lo(e.children, o)) ? e.return = e.value + "{" + r + "}" : "";
}
function b1(e) {
  var t = Cp(e);
  return function(r, o, s, l) {
    for (var u = "", d = 0; d < t; d++)
      u += e[d](r, o, s, l) || "";
    return u;
  };
}
function _1(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Ww(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var x1 = function(t, r, o) {
  for (var s = 0, l = 0; s = l, l = Hn(), s === 38 && l === 12 && (r[o] = 1), !Os(l); )
    on();
  return Hs(t, Jt);
}, k1 = function(t, r) {
  var o = -1, s = 44;
  do
    switch (Os(s)) {
      case 0:
        s === 38 && Hn() === 12 && (r[o] = 1), t[o] += x1(Jt - 1, r, o);
        break;
      case 2:
        t[o] += Ql(s);
        break;
      case 4:
        if (s === 44) {
          t[++o] = Hn() === 58 ? "&\f" : "", r[o] = t[o].length;
          break;
        }
      // fallthrough
      default:
        t[o] += Iu(s);
    }
  while (s = on());
  return t;
}, C1 = function(t, r) {
  return Uw(k1(Bw(t), r));
}, sy = /* @__PURE__ */ new WeakMap(), E1 = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, o = t.parent, s = t.column === o.column && t.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !sy.get(o)) && !s) {
      sy.set(t, !0);
      for (var l = [], u = C1(r, l), d = o.props, p = 0, f = 0; p < u.length; p++)
        for (var g = 0; g < d.length; g++, f++)
          t.props[f] = l[p] ? u[p].replace(/&\f/g, d[g]) : d[g] + " " + u[p];
    }
  }
}, P1 = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Vw(e, t) {
  switch (u1(e, t)) {
    // color-adjust
    case 5103:
      return Ae + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Ae + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ae + e + su + e + Lt + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return Ae + e + Lt + e + e;
    // order
    case 6165:
      return Ae + e + Lt + "flex-" + e + e;
    // align-items
    case 5187:
      return Ae + e + Ie(e, /(\w+).+(:[^]+)/, Ae + "box-$1$2" + Lt + "flex-$1$2") + e;
    // align-self
    case 5443:
      return Ae + e + Lt + "flex-item-" + Ie(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return Ae + e + Lt + "flex-line-pack" + Ie(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return Ae + e + Lt + Ie(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return Ae + e + Lt + Ie(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return Ae + "box-" + Ie(e, "-grow", "") + Ae + e + Lt + Ie(e, "grow", "positive") + e;
    // transition
    case 4554:
      return Ae + Ie(e, /([^-])(transform)/g, "$1" + Ae + "$2") + e;
    // cursor
    case 6187:
      return Ie(Ie(Ie(e, /(zoom-|grab)/, Ae + "$1"), /(image-set)/, Ae + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return Ie(e, /(image-set\([^]*)/, Ae + "$1$`$1");
    // justify-content
    case 4968:
      return Ie(Ie(e, /(.+:)(flex-)?(.*)/, Ae + "box-pack:$3" + Lt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ae + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ie(e, /(.+)-inline(.+)/, Ae + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (jn(e) - 1 - t > 6) switch (kt(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (kt(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return Ie(e, /(.+:)(.+)-([^]+)/, "$1" + Ae + "$2-$3$1" + su + (kt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Lf(e, "stretch") ? Vw(Ie(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (kt(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (kt(e, jn(e) - 3 - (~Lf(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return Ie(e, ":", ":" + Ae) + e;
        // (inline-)?fl(e)x
        case 101:
          return Ie(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ae + (kt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ae + "$2$3$1" + Lt + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (kt(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return Ae + e + Lt + Ie(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return Ae + e + Lt + Ie(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return Ae + e + Lt + Ie(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Ae + e + Lt + e + e;
  }
  return e;
}
var R1 = function(t, r, o, s) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case kp:
      t.return = Vw(t.value, t.length);
      break;
    case Fw:
      return lo([us(t, {
        value: Ie(t.value, "@", "@" + Ae)
      })], s);
    case xp:
      if (t.length) return d1(t.props, function(l) {
        switch (c1(l, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return lo([us(t, {
              props: [Ie(l, /:(read-\w+)/, ":" + su + "$1")]
            })], s);
          // :placeholder
          case "::placeholder":
            return lo([us(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + Ae + "input-$1")]
            }), us(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + su + "$1")]
            }), us(t, {
              props: [Ie(l, /:(plac\w+)/, Lt + "input-$1")]
            })], s);
        }
        return "";
      });
  }
}, T1 = [R1], $1 = function(t) {
  var r = t.key;
  if (r === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(b) {
      var C = b.getAttribute("data-emotion");
      C.indexOf(" ") !== -1 && (document.head.appendChild(b), b.setAttribute("data-s", ""));
    });
  }
  var s = t.stylisPlugins || T1, l = {}, u, d = [];
  u = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(b) {
      for (var C = b.getAttribute("data-emotion").split(" "), R = 1; R < C.length; R++)
        l[C[R]] = !0;
      d.push(b);
    }
  );
  var p, f = [E1, P1];
  {
    var g, y = [S1, _1(function(b) {
      g.insert(b);
    })], v = b1(f.concat(s, y)), _ = function(C) {
      return lo(v1(C), v);
    };
    p = function(C, R, O, x) {
      g = O, _(C ? C + "{" + R.styles + "}" : R.styles), x && (S.inserted[R.name] = !0);
    };
  }
  var S = {
    key: r,
    sheet: new i1({
      key: r,
      container: u,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: l,
    registered: {},
    insert: p
  };
  return S.sheet.hydrate(d), S;
}, Xd = { exports: {} }, Oe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function M1() {
  if (ay) return Oe;
  ay = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, l = e ? Symbol.for("react.profiler") : 60114, u = e ? Symbol.for("react.provider") : 60109, d = e ? Symbol.for("react.context") : 60110, p = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, g = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, _ = e ? Symbol.for("react.memo") : 60115, S = e ? Symbol.for("react.lazy") : 60116, b = e ? Symbol.for("react.block") : 60121, C = e ? Symbol.for("react.fundamental") : 60117, R = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function x(E) {
    if (typeof E == "object" && E !== null) {
      var M = E.$$typeof;
      switch (M) {
        case t:
          switch (E = E.type, E) {
            case p:
            case f:
            case o:
            case l:
            case s:
            case y:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case d:
                case g:
                case S:
                case _:
                case u:
                  return E;
                default:
                  return M;
              }
          }
        case r:
          return M;
      }
    }
  }
  function P(E) {
    return x(E) === f;
  }
  return Oe.AsyncMode = p, Oe.ConcurrentMode = f, Oe.ContextConsumer = d, Oe.ContextProvider = u, Oe.Element = t, Oe.ForwardRef = g, Oe.Fragment = o, Oe.Lazy = S, Oe.Memo = _, Oe.Portal = r, Oe.Profiler = l, Oe.StrictMode = s, Oe.Suspense = y, Oe.isAsyncMode = function(E) {
    return P(E) || x(E) === p;
  }, Oe.isConcurrentMode = P, Oe.isContextConsumer = function(E) {
    return x(E) === d;
  }, Oe.isContextProvider = function(E) {
    return x(E) === u;
  }, Oe.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, Oe.isForwardRef = function(E) {
    return x(E) === g;
  }, Oe.isFragment = function(E) {
    return x(E) === o;
  }, Oe.isLazy = function(E) {
    return x(E) === S;
  }, Oe.isMemo = function(E) {
    return x(E) === _;
  }, Oe.isPortal = function(E) {
    return x(E) === r;
  }, Oe.isProfiler = function(E) {
    return x(E) === l;
  }, Oe.isStrictMode = function(E) {
    return x(E) === s;
  }, Oe.isSuspense = function(E) {
    return x(E) === y;
  }, Oe.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === o || E === f || E === l || E === s || E === y || E === v || typeof E == "object" && E !== null && (E.$$typeof === S || E.$$typeof === _ || E.$$typeof === u || E.$$typeof === d || E.$$typeof === g || E.$$typeof === C || E.$$typeof === R || E.$$typeof === O || E.$$typeof === b);
  }, Oe.typeOf = x, Oe;
}
var ly;
function A1() {
  return ly || (ly = 1, Xd.exports = M1()), Xd.exports;
}
var Zd, uy;
function I1() {
  if (uy) return Zd;
  uy = 1;
  var e = A1(), t = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, r = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, o = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, s = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, l = {};
  l[e.ForwardRef] = o, l[e.Memo] = s;
  function u(S) {
    return e.isMemo(S) ? s : l[S.$$typeof] || t;
  }
  var d = Object.defineProperty, p = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols, g = Object.getOwnPropertyDescriptor, y = Object.getPrototypeOf, v = Object.prototype;
  function _(S, b, C) {
    if (typeof b != "string") {
      if (v) {
        var R = y(b);
        R && R !== v && _(S, R, C);
      }
      var O = p(b);
      f && (O = O.concat(f(b)));
      for (var x = u(S), P = u(b), E = 0; E < O.length; ++E) {
        var M = O[E];
        if (!r[M] && !(C && C[M]) && !(P && P[M]) && !(x && x[M])) {
          var A = g(b, M);
          try {
            d(S, M, A);
          } catch {
          }
        }
      }
    }
    return S;
  }
  return Zd = _, Zd;
}
I1();
var O1 = !0;
function Hw(e, t, r) {
  var o = "";
  return r.split(" ").forEach(function(s) {
    e[s] !== void 0 ? t.push(e[s] + ";") : s && (o += s + " ");
  }), o;
}
var Ep = function(t, r, o) {
  var s = t.key + "-" + r.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (o === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  O1 === !1) && t.registered[s] === void 0 && (t.registered[s] = r.styles);
}, Pp = function(t, r, o) {
  Ep(t, r, o);
  var s = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var l = r;
    do
      t.insert(r === l ? "." + s : "", l, t.sheet, !0), l = l.next;
    while (l !== void 0);
  }
};
function N1(e) {
  for (var t = 0, r, o = 0, s = e.length; s >= 4; ++o, s -= 4)
    r = e.charCodeAt(o) & 255 | (e.charCodeAt(++o) & 255) << 8 | (e.charCodeAt(++o) & 255) << 16 | (e.charCodeAt(++o) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (s) {
    case 3:
      t ^= (e.charCodeAt(o + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(o + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(o) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var L1 = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, D1 = /[A-Z]|^ms/g, F1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, qw = function(t) {
  return t.charCodeAt(1) === 45;
}, cy = function(t) {
  return t != null && typeof t != "boolean";
}, ef = /* @__PURE__ */ Ww(function(e) {
  return qw(e) ? e : e.replace(D1, "-$&").toLowerCase();
}), dy = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(F1, function(o, s, l) {
          return Bn = {
            name: s,
            styles: l,
            next: Bn
          }, s;
        });
  }
  return L1[t] !== 1 && !qw(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
function Ns(e, t, r) {
  if (r == null)
    return "";
  var o = r;
  if (o.__emotion_styles !== void 0)
    return o;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      var s = r;
      if (s.anim === 1)
        return Bn = {
          name: s.name,
          styles: s.styles,
          next: Bn
        }, s.name;
      var l = r;
      if (l.styles !== void 0) {
        var u = l.next;
        if (u !== void 0)
          for (; u !== void 0; )
            Bn = {
              name: u.name,
              styles: u.styles,
              next: Bn
            }, u = u.next;
        var d = l.styles + ";";
        return d;
      }
      return z1(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var p = Bn, f = r(e);
        return Bn = p, Ns(e, t, f);
      }
      break;
    }
  }
  var g = r;
  if (t == null)
    return g;
  var y = t[g];
  return y !== void 0 ? y : g;
}
function z1(e, t, r) {
  var o = "";
  if (Array.isArray(r))
    for (var s = 0; s < r.length; s++)
      o += Ns(e, t, r[s]) + ";";
  else
    for (var l in r) {
      var u = r[l];
      if (typeof u != "object") {
        var d = u;
        t != null && t[d] !== void 0 ? o += l + "{" + t[d] + "}" : cy(d) && (o += ef(l) + ":" + dy(l, d) + ";");
      } else if (Array.isArray(u) && typeof u[0] == "string" && (t == null || t[u[0]] === void 0))
        for (var p = 0; p < u.length; p++)
          cy(u[p]) && (o += ef(l) + ":" + dy(l, u[p]) + ";");
      else {
        var f = Ns(e, t, u);
        switch (l) {
          case "animation":
          case "animationName": {
            o += ef(l) + ":" + f + ";";
            break;
          }
          default:
            o += l + "{" + f + "}";
        }
      }
    }
  return o;
}
var fy = /label:\s*([^\s;{]+)\s*(;|$)/g, Bn;
function qs(e, t, r) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, s = "";
  Bn = void 0;
  var l = e[0];
  if (l == null || l.raw === void 0)
    o = !1, s += Ns(r, t, l);
  else {
    var u = l;
    s += u[0];
  }
  for (var d = 1; d < e.length; d++)
    if (s += Ns(r, t, e[d]), o) {
      var p = l;
      s += p[d];
    }
  fy.lastIndex = 0;
  for (var f = "", g; (g = fy.exec(s)) !== null; )
    f += "-" + g[1];
  var y = N1(s) + f;
  return {
    name: y,
    styles: s,
    next: Bn
  };
}
var j1 = function(t) {
  return t();
}, Kw = Nf.useInsertionEffect ? Nf.useInsertionEffect : !1, Qw = Kw || j1, py = Kw || k.useLayoutEffect, Gw = /* @__PURE__ */ k.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ $1({
    key: "css"
  }) : null
);
Gw.Provider;
var Rp = function(t) {
  return /* @__PURE__ */ k.forwardRef(function(r, o) {
    var s = k.useContext(Gw);
    return t(r, s, o);
  });
}, Ks = /* @__PURE__ */ k.createContext({}), Tp = {}.hasOwnProperty, Ff = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", B1 = function(t, r) {
  var o = {};
  for (var s in r)
    Tp.call(r, s) && (o[s] = r[s]);
  return o[Ff] = t, o;
}, U1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Ep(r, o, s), Qw(function() {
    return Pp(r, o, s);
  }), null;
}, W1 = /* @__PURE__ */ Rp(function(e, t, r) {
  var o = e.css;
  typeof o == "string" && t.registered[o] !== void 0 && (o = t.registered[o]);
  var s = e[Ff], l = [o], u = "";
  typeof e.className == "string" ? u = Hw(t.registered, l, e.className) : e.className != null && (u = e.className + " ");
  var d = qs(l, void 0, k.useContext(Ks));
  u += t.key + "-" + d.name;
  var p = {};
  for (var f in e)
    Tp.call(e, f) && f !== "css" && f !== Ff && (p[f] = e[f]);
  return p.className = u, r && (p.ref = r), /* @__PURE__ */ k.createElement(k.Fragment, null, /* @__PURE__ */ k.createElement(U1, {
    cache: t,
    serialized: d,
    isStringTag: typeof s == "string"
  }), /* @__PURE__ */ k.createElement(s, p));
}), V1 = W1, hy = function(t, r) {
  var o = arguments;
  if (r == null || !Tp.call(r, "css"))
    return k.createElement.apply(void 0, o);
  var s = o.length, l = new Array(s);
  l[0] = V1, l[1] = B1(t, r);
  for (var u = 2; u < s; u++)
    l[u] = o[u];
  return k.createElement.apply(null, l);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(hy || (hy = {}));
var H1 = /* @__PURE__ */ Rp(function(e, t) {
  var r = e.styles, o = qs([r], void 0, k.useContext(Ks)), s = k.useRef();
  return py(function() {
    var l = t.key + "-global", u = new t.sheet.constructor({
      key: l,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), d = !1, p = document.querySelector('style[data-emotion="' + l + " " + o.name + '"]');
    return t.sheet.tags.length && (u.before = t.sheet.tags[0]), p !== null && (d = !0, p.setAttribute("data-emotion", l), u.hydrate([p])), s.current = [u, d], function() {
      u.flush();
    };
  }, [t]), py(function() {
    var l = s.current, u = l[0], d = l[1];
    if (d) {
      l[1] = !1;
      return;
    }
    if (o.next !== void 0 && Pp(t, o.next, !0), u.tags.length) {
      var p = u.tags[u.tags.length - 1].nextElementSibling;
      u.before = p, u.flush();
    }
    t.insert("", o, u, !1);
  }, [t, o.name]), null;
});
function Qs() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return qs(t);
}
function Ei() {
  var e = Qs.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var q1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, K1 = /* @__PURE__ */ Ww(
  function(e) {
    return q1.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), Q1 = K1, G1 = function(t) {
  return t !== "theme";
}, gy = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? Q1 : G1;
}, my = function(t, r, o) {
  var s;
  if (r) {
    var l = r.shouldForwardProp;
    s = t.__emotion_forwardProp && l ? function(u) {
      return t.__emotion_forwardProp(u) && l(u);
    } : l;
  }
  return typeof s != "function" && o && (s = t.__emotion_forwardProp), s;
}, Y1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Ep(r, o, s), Qw(function() {
    return Pp(r, o, s);
  }), null;
}, J1 = function e(t, r) {
  var o = t.__emotion_real === t, s = o && t.__emotion_base || t, l, u;
  r !== void 0 && (l = r.label, u = r.target);
  var d = my(t, r, o), p = d || gy(s), f = !p("as");
  return function() {
    var g = arguments, y = o && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (l !== void 0 && y.push("label:" + l + ";"), g[0] == null || g[0].raw === void 0)
      y.push.apply(y, g);
    else {
      var v = g[0];
      y.push(v[0]);
      for (var _ = g.length, S = 1; S < _; S++)
        y.push(g[S], v[S]);
    }
    var b = Rp(function(C, R, O) {
      var x = f && C.as || s, P = "", E = [], M = C;
      if (C.theme == null) {
        M = {};
        for (var A in C)
          M[A] = C[A];
        M.theme = k.useContext(Ks);
      }
      typeof C.className == "string" ? P = Hw(R.registered, E, C.className) : C.className != null && (P = C.className + " ");
      var I = qs(y.concat(E), R.registered, M);
      P += R.key + "-" + I.name, u !== void 0 && (P += " " + u);
      var L = f && d === void 0 ? gy(x) : p, w = {};
      for (var T in C)
        f && T === "as" || L(T) && (w[T] = C[T]);
      return w.className = P, O && (w.ref = O), /* @__PURE__ */ k.createElement(k.Fragment, null, /* @__PURE__ */ k.createElement(Y1, {
        cache: R,
        serialized: I,
        isStringTag: typeof x == "string"
      }), /* @__PURE__ */ k.createElement(x, w));
    });
    return b.displayName = l !== void 0 ? l : "Styled(" + (typeof s == "string" ? s : s.displayName || s.name || "Component") + ")", b.defaultProps = t.defaultProps, b.__emotion_real = b, b.__emotion_base = s, b.__emotion_styles = y, b.__emotion_forwardProp = d, Object.defineProperty(b, "toString", {
      value: function() {
        return "." + u;
      }
    }), b.withComponent = function(C, R) {
      var O = e(C, ou({}, r, R, {
        shouldForwardProp: my(b, R, !0)
      }));
      return O.apply(void 0, y);
    }, b;
  };
}, X1 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
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
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], zf = J1.bind(null);
X1.forEach(function(e) {
  zf[e] = zf(e);
});
var tf = { exports: {} }, nf, yy;
function Z1() {
  if (yy) return nf;
  yy = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return nf = e, nf;
}
var rf, vy;
function ex() {
  if (vy) return rf;
  vy = 1;
  var e = /* @__PURE__ */ Z1();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, rf = function() {
    function o(u, d, p, f, g, y) {
      if (y !== e) {
        var v = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw v.name = "Invariant Violation", v;
      }
    }
    o.isRequired = o;
    function s() {
      return o;
    }
    var l = {
      array: o,
      bigint: o,
      bool: o,
      func: o,
      number: o,
      object: o,
      string: o,
      symbol: o,
      any: o,
      arrayOf: s,
      element: o,
      elementType: o,
      instanceOf: s,
      node: o,
      objectOf: s,
      oneOf: s,
      oneOfType: s,
      shape: s,
      exact: s,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return l.PropTypes = l, l;
  }, rf;
}
var wy;
function tx() {
  return wy || (wy = 1, tf.exports = /* @__PURE__ */ ex()()), tf.exports;
}
var nx = /* @__PURE__ */ tx();
const Ne = /* @__PURE__ */ Qr(nx);
function rx(e) {
  return e == null || Object.keys(e).length === 0;
}
function Yw(e) {
  const {
    styles: t,
    defaultTheme: r = {}
  } = e, o = typeof t == "function" ? (s) => t(rx(s) ? r : s) : t;
  return /* @__PURE__ */ B.jsx(H1, {
    styles: o
  });
}
function Jw(e, t) {
  return zf(e, t);
}
function ix(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Sy = [];
function by(e) {
  return Sy[0] = e, qs(Sy);
}
var of = { exports: {} }, Fe = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _y;
function ox() {
  if (_y) return Fe;
  _y = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), v = Symbol.for("react.view_transition"), _ = Symbol.for("react.client.reference");
  function S(b) {
    if (typeof b == "object" && b !== null) {
      var C = b.$$typeof;
      switch (C) {
        case e:
          switch (b = b.type, b) {
            case r:
            case s:
            case o:
            case p:
            case f:
            case v:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case u:
                case d:
                case y:
                case g:
                  return b;
                case l:
                  return b;
                default:
                  return C;
              }
          }
        case t:
          return C;
      }
    }
  }
  return Fe.ContextConsumer = l, Fe.ContextProvider = u, Fe.Element = e, Fe.ForwardRef = d, Fe.Fragment = r, Fe.Lazy = y, Fe.Memo = g, Fe.Portal = t, Fe.Profiler = s, Fe.StrictMode = o, Fe.Suspense = p, Fe.SuspenseList = f, Fe.isContextConsumer = function(b) {
    return S(b) === l;
  }, Fe.isContextProvider = function(b) {
    return S(b) === u;
  }, Fe.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, Fe.isForwardRef = function(b) {
    return S(b) === d;
  }, Fe.isFragment = function(b) {
    return S(b) === r;
  }, Fe.isLazy = function(b) {
    return S(b) === y;
  }, Fe.isMemo = function(b) {
    return S(b) === g;
  }, Fe.isPortal = function(b) {
    return S(b) === t;
  }, Fe.isProfiler = function(b) {
    return S(b) === s;
  }, Fe.isStrictMode = function(b) {
    return S(b) === o;
  }, Fe.isSuspense = function(b) {
    return S(b) === p;
  }, Fe.isSuspenseList = function(b) {
    return S(b) === f;
  }, Fe.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === s || b === o || b === p || b === f || typeof b == "object" && b !== null && (b.$$typeof === y || b.$$typeof === g || b.$$typeof === u || b.$$typeof === l || b.$$typeof === d || b.$$typeof === _ || b.getModuleId !== void 0);
  }, Fe.typeOf = S, Fe;
}
var xy;
function sx() {
  return xy || (xy = 1, of.exports = /* @__PURE__ */ ox()), of.exports;
}
var Xw = /* @__PURE__ */ sx();
function Un(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Zw(e) {
  if (/* @__PURE__ */ k.isValidElement(e) || Xw.isValidElementType(e) || !Un(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Zw(e[r]);
  }), t;
}
function sn(e, t, r = {
  clone: !0
}) {
  const o = r.clone ? {
    ...e
  } : e;
  return Un(e) && Un(t) && Object.keys(t).forEach((s) => {
    /* @__PURE__ */ k.isValidElement(t[s]) || Xw.isValidElementType(t[s]) ? o[s] = t[s] : Un(t[s]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, s) && Un(e[s]) ? o[s] = sn(e[s], t[s], r) : r.clone ? o[s] = Un(t[s]) ? Zw(t[s]) : t[s] : o[s] = t[s];
  }), o;
}
const ax = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, o) => r.val - o.val), t.reduce((r, o) => ({
    ...r,
    [o.key]: o.val
  }), {});
};
function lx(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: r = "px",
    step: o = 5,
    ...s
  } = e, l = ax(t), u = Object.keys(l);
  function d(v) {
    return `@media (min-width:${typeof t[v] == "number" ? t[v] : v}${r})`;
  }
  function p(v) {
    return `@media (max-width:${(typeof t[v] == "number" ? t[v] : v) - o / 100}${r})`;
  }
  function f(v, _) {
    const S = u.indexOf(_);
    return `@media (min-width:${typeof t[v] == "number" ? t[v] : v}${r}) and (max-width:${(S !== -1 && typeof t[u[S]] == "number" ? t[u[S]] : _) - o / 100}${r})`;
  }
  function g(v) {
    return u.indexOf(v) + 1 < u.length ? f(v, u[u.indexOf(v) + 1]) : d(v);
  }
  function y(v) {
    const _ = u.indexOf(v);
    return _ === 0 ? d(u[1]) : _ === u.length - 1 ? p(u[_]) : f(v, u[u.indexOf(v) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: u,
    values: l,
    up: d,
    down: p,
    between: f,
    only: g,
    not: y,
    unit: r,
    ...s
  };
}
function ux(e, t) {
  if (!e.containerQueries)
    return t;
  const r = Object.keys(t).filter((o) => o.startsWith("@container")).sort((o, s) => {
    const l = /min-width:\s*([0-9.]+)/;
    return +(o.match(l)?.[1] || 0) - +(s.match(l)?.[1] || 0);
  });
  return r.length ? r.reduce((o, s) => {
    const l = t[s];
    return delete o[s], o[s] = l, o;
  }, {
    ...t
  }) : t;
}
function cx(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((r) => t.startsWith(`@${r}`)) || !!t.match(/^@\d/));
}
function dx(e, t) {
  const r = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!r)
    return null;
  const [, o, s] = r, l = Number.isNaN(+o) ? o || 0 : +o;
  return e.containerQueries(s).up(l);
}
function fx(e) {
  const t = (l, u) => l.replace("@media", u ? `@container ${u}` : "@container");
  function r(l, u) {
    l.up = (...d) => t(e.breakpoints.up(...d), u), l.down = (...d) => t(e.breakpoints.down(...d), u), l.between = (...d) => t(e.breakpoints.between(...d), u), l.only = (...d) => t(e.breakpoints.only(...d), u), l.not = (...d) => {
      const p = t(e.breakpoints.not(...d), u);
      return p.includes("not all and") ? p.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : p;
    };
  }
  const o = {}, s = (l) => (r(o, l), o);
  return r(s), {
    ...e,
    containerQueries: s
  };
}
const px = {
  borderRadius: 4
};
function Cs(e, t) {
  return t ? sn(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Lu = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, ky = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Lu[e]}px)`
}, hx = {
  containerQueries: (e) => ({
    up: (t) => {
      let r = typeof t == "number" ? t : Lu[t] || t;
      return typeof r == "number" && (r = `${r}px`), e ? `@container ${e} (min-width:${r})` : `@container (min-width:${r})`;
    }
  })
};
function fr(e, t, r) {
  const o = e.theme || {};
  if (Array.isArray(t)) {
    const l = o.breakpoints || ky;
    return t.reduce((u, d, p) => (u[l.up(l.keys[p])] = r(t[p]), u), {});
  }
  if (typeof t == "object") {
    const l = o.breakpoints || ky;
    return Object.keys(t).reduce((u, d) => {
      if (cx(l.keys, d)) {
        const p = dx(o.containerQueries ? o : hx, d);
        p && (u[p] = r(t[d], d));
      } else if (Object.keys(l.values || Lu).includes(d)) {
        const p = l.up(d);
        u[p] = r(t[d], d);
      } else {
        const p = d;
        u[p] = t[p];
      }
      return u;
    }, {});
  }
  return r(t);
}
function gx(e = {}) {
  return e.keys?.reduce((r, o) => {
    const s = e.up(o);
    return r[s] = {}, r;
  }, {}) || {};
}
function mx(e, t) {
  return e.reduce((r, o) => {
    const s = r[o];
    return (!s || Object.keys(s).length === 0) && delete r[o], r;
  }, t);
}
function Pe(e) {
  if (typeof e != "string")
    throw new Error(Si(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Du(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const o = `vars.${t}`.split(".").reduce((s, l) => s && s[l] ? s[l] : null, e);
    if (o != null)
      return o;
  }
  return t.split(".").reduce((o, s) => o && o[s] != null ? o[s] : null, e);
}
function au(e, t, r, o = r) {
  let s;
  return typeof e == "function" ? s = e(r) : Array.isArray(e) ? s = e[r] || o : s = Du(e, r) || o, t && (s = t(s, o, e)), s;
}
function ot(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: o,
    transform: s
  } = e, l = (u) => {
    if (u[t] == null)
      return null;
    const d = u[t], p = u.theme, f = Du(p, o) || {};
    return fr(u, d, (y) => {
      let v = au(f, s, y);
      return y === v && typeof y == "string" && (v = au(f, s, `${t}${y === "default" ? "" : Pe(y)}`, y)), r === !1 ? v : {
        [r]: v
      };
    });
  };
  return l.propTypes = {}, l.filterProps = [t], l;
}
function yx(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const vx = {
  m: "margin",
  p: "padding"
}, wx = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Cy = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Sx = yx((e) => {
  if (e.length > 2)
    if (Cy[e])
      e = Cy[e];
    else
      return [e];
  const [t, r] = e.split(""), o = vx[t], s = wx[r] || "";
  return Array.isArray(s) ? s.map((l) => o + l) : [o + s];
}), $p = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Mp = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...$p, ...Mp];
function Gs(e, t, r, o) {
  const s = Du(e, t, !0) ?? r;
  return typeof s == "number" || typeof s == "string" ? (l) => typeof l == "string" ? l : typeof s == "string" ? `calc(${l} * ${s})` : s * l : Array.isArray(s) ? (l) => {
    if (typeof l == "string")
      return l;
    const u = Math.abs(l), d = s[u];
    return l >= 0 ? d : typeof d == "number" ? -d : `-${d}`;
  } : typeof s == "function" ? s : () => {
  };
}
function Ap(e) {
  return Gs(e, "spacing", 8);
}
function Ys(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function bx(e, t) {
  return (r) => e.reduce((o, s) => (o[s] = Ys(t, r), o), {});
}
function _x(e, t, r, o) {
  if (!t.includes(r))
    return null;
  const s = Sx(r), l = bx(s, o), u = e[r];
  return fr(e, u, l);
}
function e0(e, t) {
  const r = Ap(e.theme);
  return Object.keys(e).map((o) => _x(e, t, o, r)).reduce(Cs, {});
}
function tt(e) {
  return e0(e, $p);
}
tt.propTypes = {};
tt.filterProps = $p;
function nt(e) {
  return e0(e, Mp);
}
nt.propTypes = {};
nt.filterProps = Mp;
function t0(e = 8, t = Ap({
  spacing: e
})) {
  if (e.mui)
    return e;
  const r = (...o) => (o.length === 0 ? [1] : o).map((l) => {
    const u = t(l);
    return typeof u == "number" ? `${u}px` : u;
  }).join(" ");
  return r.mui = !0, r;
}
function Fu(...e) {
  const t = e.reduce((o, s) => (s.filterProps.forEach((l) => {
    o[l] = s;
  }), o), {}), r = (o) => Object.keys(o).reduce((s, l) => t[l] ? Cs(s, t[l](o)) : s, {});
  return r.propTypes = {}, r.filterProps = e.reduce((o, s) => o.concat(s.filterProps), []), r;
}
function mn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Sn(e, t) {
  return ot({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const xx = Sn("border", mn), kx = Sn("borderTop", mn), Cx = Sn("borderRight", mn), Ex = Sn("borderBottom", mn), Px = Sn("borderLeft", mn), Rx = Sn("borderColor"), Tx = Sn("borderTopColor"), $x = Sn("borderRightColor"), Mx = Sn("borderBottomColor"), Ax = Sn("borderLeftColor"), Ix = Sn("outline", mn), Ox = Sn("outlineColor"), zu = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Gs(e.theme, "shape.borderRadius", 4), r = (o) => ({
      borderRadius: Ys(t, o)
    });
    return fr(e, e.borderRadius, r);
  }
  return null;
};
zu.propTypes = {};
zu.filterProps = ["borderRadius"];
Fu(xx, kx, Cx, Ex, Px, Rx, Tx, $x, Mx, Ax, zu, Ix, Ox);
const ju = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Gs(e.theme, "spacing", 8), r = (o) => ({
      gap: Ys(t, o)
    });
    return fr(e, e.gap, r);
  }
  return null;
};
ju.propTypes = {};
ju.filterProps = ["gap"];
const Bu = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Gs(e.theme, "spacing", 8), r = (o) => ({
      columnGap: Ys(t, o)
    });
    return fr(e, e.columnGap, r);
  }
  return null;
};
Bu.propTypes = {};
Bu.filterProps = ["columnGap"];
const Uu = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Gs(e.theme, "spacing", 8), r = (o) => ({
      rowGap: Ys(t, o)
    });
    return fr(e, e.rowGap, r);
  }
  return null;
};
Uu.propTypes = {};
Uu.filterProps = ["rowGap"];
const Nx = ot({
  prop: "gridColumn"
}), Lx = ot({
  prop: "gridRow"
}), Dx = ot({
  prop: "gridAutoFlow"
}), Fx = ot({
  prop: "gridAutoColumns"
}), zx = ot({
  prop: "gridAutoRows"
}), jx = ot({
  prop: "gridTemplateColumns"
}), Bx = ot({
  prop: "gridTemplateRows"
}), Ux = ot({
  prop: "gridTemplateAreas"
}), Wx = ot({
  prop: "gridArea"
});
Fu(ju, Bu, Uu, Nx, Lx, Dx, Fx, zx, jx, Bx, Ux, Wx);
function uo(e, t) {
  return t === "grey" ? t : e;
}
const Vx = ot({
  prop: "color",
  themeKey: "palette",
  transform: uo
}), Hx = ot({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: uo
}), qx = ot({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: uo
});
Fu(Vx, Hx, qx);
function nn(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Kx = ot({
  prop: "width",
  transform: nn
}), Ip = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      const o = e.theme?.breakpoints?.values?.[r] || Lu[r];
      return o ? e.theme?.breakpoints?.unit !== "px" ? {
        maxWidth: `${o}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: o
      } : {
        maxWidth: nn(r)
      };
    };
    return fr(e, e.maxWidth, t);
  }
  return null;
};
Ip.filterProps = ["maxWidth"];
const Qx = ot({
  prop: "minWidth",
  transform: nn
}), Gx = ot({
  prop: "height",
  transform: nn
}), Yx = ot({
  prop: "maxHeight",
  transform: nn
}), Jx = ot({
  prop: "minHeight",
  transform: nn
});
ot({
  prop: "size",
  cssProperty: "width",
  transform: nn
});
ot({
  prop: "size",
  cssProperty: "height",
  transform: nn
});
const Xx = ot({
  prop: "boxSizing"
});
Fu(Kx, Ip, Qx, Gx, Yx, Jx, Xx);
const Js = {
  // borders
  border: {
    themeKey: "borders",
    transform: mn
  },
  borderTop: {
    themeKey: "borders",
    transform: mn
  },
  borderRight: {
    themeKey: "borders",
    transform: mn
  },
  borderBottom: {
    themeKey: "borders",
    transform: mn
  },
  borderLeft: {
    themeKey: "borders",
    transform: mn
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: mn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: zu
  },
  // palette
  color: {
    themeKey: "palette",
    transform: uo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: uo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: uo
  },
  // spacing
  p: {
    style: nt
  },
  pt: {
    style: nt
  },
  pr: {
    style: nt
  },
  pb: {
    style: nt
  },
  pl: {
    style: nt
  },
  px: {
    style: nt
  },
  py: {
    style: nt
  },
  padding: {
    style: nt
  },
  paddingTop: {
    style: nt
  },
  paddingRight: {
    style: nt
  },
  paddingBottom: {
    style: nt
  },
  paddingLeft: {
    style: nt
  },
  paddingX: {
    style: nt
  },
  paddingY: {
    style: nt
  },
  paddingInline: {
    style: nt
  },
  paddingInlineStart: {
    style: nt
  },
  paddingInlineEnd: {
    style: nt
  },
  paddingBlock: {
    style: nt
  },
  paddingBlockStart: {
    style: nt
  },
  paddingBlockEnd: {
    style: nt
  },
  m: {
    style: tt
  },
  mt: {
    style: tt
  },
  mr: {
    style: tt
  },
  mb: {
    style: tt
  },
  ml: {
    style: tt
  },
  mx: {
    style: tt
  },
  my: {
    style: tt
  },
  margin: {
    style: tt
  },
  marginTop: {
    style: tt
  },
  marginRight: {
    style: tt
  },
  marginBottom: {
    style: tt
  },
  marginLeft: {
    style: tt
  },
  marginX: {
    style: tt
  },
  marginY: {
    style: tt
  },
  marginInline: {
    style: tt
  },
  marginInlineStart: {
    style: tt
  },
  marginInlineEnd: {
    style: tt
  },
  marginBlock: {
    style: tt
  },
  marginBlockStart: {
    style: tt
  },
  marginBlockEnd: {
    style: tt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: ju
  },
  rowGap: {
    style: Uu
  },
  columnGap: {
    style: Bu
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: nn
  },
  maxWidth: {
    style: Ip
  },
  minWidth: {
    transform: nn
  },
  height: {
    transform: nn
  },
  maxHeight: {
    transform: nn
  },
  minHeight: {
    transform: nn
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function Zx(...e) {
  const t = e.reduce((o, s) => o.concat(Object.keys(s)), []), r = new Set(t);
  return e.every((o) => r.size === Object.keys(o).length);
}
function ek(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tk() {
  function e(r, o, s, l) {
    const u = {
      [r]: o,
      theme: s
    }, d = l[r];
    if (!d)
      return {
        [r]: o
      };
    const {
      cssProperty: p = r,
      themeKey: f,
      transform: g,
      style: y
    } = d;
    if (o == null)
      return null;
    if (f === "typography" && o === "inherit")
      return {
        [r]: o
      };
    const v = Du(s, f) || {};
    return y ? y(u) : fr(u, o, (S) => {
      let b = au(v, g, S);
      return S === b && typeof S == "string" && (b = au(v, g, `${r}${S === "default" ? "" : Pe(S)}`, S)), p === !1 ? b : {
        [p]: b
      };
    });
  }
  function t(r) {
    const {
      sx: o,
      theme: s = {}
    } = r || {};
    if (!o)
      return null;
    const l = s.unstable_sxConfig ?? Js;
    function u(d) {
      let p = d;
      if (typeof d == "function")
        p = d(s);
      else if (typeof d != "object")
        return d;
      if (!p)
        return null;
      const f = gx(s.breakpoints), g = Object.keys(f);
      let y = f;
      return Object.keys(p).forEach((v) => {
        const _ = ek(p[v], s);
        if (_ != null)
          if (typeof _ == "object")
            if (l[v])
              y = Cs(y, e(v, _, s, l));
            else {
              const S = fr({
                theme: s
              }, _, (b) => ({
                [v]: b
              }));
              Zx(S, _) ? y[v] = t({
                sx: _,
                theme: s
              }) : y = Cs(y, S);
            }
          else
            y = Cs(y, e(v, _, s, l));
      }), ux(s, mx(g, y));
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return t;
}
const Ur = tk();
Ur.filterProps = ["sx"];
function nk(e, t) {
  const r = this;
  if (r.vars) {
    if (!r.colorSchemes?.[e] || typeof r.getColorSchemeSelector != "function")
      return {};
    let o = r.getColorSchemeSelector(e);
    return o === "&" ? t : ((o.includes("data-") || o.includes(".")) && (o = `*:where(${o.replace(/\s*&$/, "")}) &`), {
      [o]: t
    });
  }
  return r.palette.mode === e ? t : {};
}
function Op(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: o = {},
    spacing: s,
    shape: l = {},
    ...u
  } = e, d = lx(r), p = t0(s);
  let f = sn({
    breakpoints: d,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...o
    },
    spacing: p,
    shape: {
      ...px,
      ...l
    }
  }, u);
  return f = fx(f), f.applyStyles = nk, f = t.reduce((g, y) => sn(g, y), f), f.unstable_sxConfig = {
    ...Js,
    ...u?.unstable_sxConfig
  }, f.unstable_sx = function(y) {
    return Ur({
      sx: y,
      theme: this
    });
  }, f;
}
function rk(e) {
  return Object.keys(e).length === 0;
}
function n0(e = null) {
  const t = k.useContext(Ks);
  return !t || rk(t) ? e : t;
}
const ik = Op();
function Np(e = ik) {
  return n0(e);
}
function ok({
  styles: e,
  themeId: t,
  defaultTheme: r = {}
}) {
  const o = Np(r), s = typeof e == "function" ? e(t && o[t] || o) : e;
  return /* @__PURE__ */ B.jsx(Yw, {
    styles: s
  });
}
const sk = (e) => {
  const t = {
    systemProps: {},
    otherProps: {}
  }, r = e?.theme?.unstable_sxConfig ?? Js;
  return Object.keys(e).forEach((o) => {
    r[o] ? t.systemProps[o] = e[o] : t.otherProps[o] = e[o];
  }), t;
};
function r0(e) {
  const {
    sx: t,
    ...r
  } = e, {
    systemProps: o,
    otherProps: s
  } = sk(r);
  let l;
  return Array.isArray(t) ? l = [o, ...t] : typeof t == "function" ? l = (...u) => {
    const d = t(...u);
    return Un(d) ? {
      ...o,
      ...d
    } : o;
  } : l = {
    ...o,
    ...t
  }, {
    ...s,
    sx: l
  };
}
const Ey = (e) => e, ak = () => {
  let e = Ey;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ey;
    }
  };
}, i0 = ak();
function o0(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (r = o0(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function Re() {
  for (var e, t, r = 0, o = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (t = o0(e)) && (o && (o += " "), o += t);
  return o;
}
function lk(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: o = "MuiBox-root",
    generateClassName: s
  } = e, l = Jw("div", {
    shouldForwardProp: (d) => d !== "theme" && d !== "sx" && d !== "as"
  })(Ur);
  return /* @__PURE__ */ k.forwardRef(function(p, f) {
    const g = Np(r), {
      className: y,
      component: v = "div",
      ..._
    } = r0(p);
    return /* @__PURE__ */ B.jsx(l, {
      as: v,
      ref: f,
      className: Re(y, s ? s(o) : o),
      theme: t && g[t] || g,
      ..._
    });
  });
}
const uk = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function pt(e, t, r = "Mui") {
  const o = uk[t];
  return o ? `${r}-${o}` : `${i0.generate(e)}-${t}`;
}
function Xe(e, t, r = "Mui") {
  const o = {};
  return t.forEach((s) => {
    o[s] = pt(e, s, r);
  }), o;
}
function s0(e) {
  const {
    variants: t,
    ...r
  } = e, o = {
    variants: t,
    style: by(r),
    isProcessed: !0
  };
  return o.style === r || t && t.forEach((s) => {
    typeof s.style != "function" && (s.style = by(s.style));
  }), o;
}
const ck = Op();
function sf(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function dk(e) {
  return e ? (t, r) => r[e] : null;
}
function fk(e, t, r) {
  e.theme = gk(e.theme) ? r : e.theme[t] || e.theme;
}
function Yl(e, t) {
  const r = typeof t == "function" ? t(e) : t;
  if (Array.isArray(r))
    return r.flatMap((o) => Yl(e, o));
  if (Array.isArray(r?.variants)) {
    let o;
    if (r.isProcessed)
      o = r.style;
    else {
      const {
        variants: s,
        ...l
      } = r;
      o = l;
    }
    return a0(e, r.variants, [o]);
  }
  return r?.isProcessed ? r.style : r;
}
function a0(e, t, r = []) {
  let o;
  e: for (let s = 0; s < t.length; s += 1) {
    const l = t[s];
    if (typeof l.props == "function") {
      if (o ??= {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }, !l.props(o))
        continue;
    } else
      for (const u in l.props)
        if (e[u] !== l.props[u] && e.ownerState?.[u] !== l.props[u])
          continue e;
    typeof l.style == "function" ? (o ??= {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }, r.push(l.style(o))) : r.push(l.style);
  }
  return r;
}
function pk(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = ck,
    rootShouldForwardProp: o = sf,
    slotShouldForwardProp: s = sf
  } = e;
  function l(d) {
    fk(d, t, r);
  }
  return (d, p = {}) => {
    ix(d, (E) => E.filter((M) => M !== Ur));
    const {
      name: f,
      slot: g,
      skipVariantsResolver: y,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: _ = dk(yk(g)),
      ...S
    } = p, b = y !== void 0 ? y : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      g && g !== "Root" && g !== "root" || !1
    ), C = v || !1;
    let R = sf;
    g === "Root" || g === "root" ? R = o : g ? R = s : mk(d) && (R = void 0);
    const O = Jw(d, {
      shouldForwardProp: R,
      label: hk(),
      ...S
    }), x = (E) => {
      if (typeof E == "function" && E.__emotion_real !== E)
        return function(A) {
          return Yl(A, E);
        };
      if (Un(E)) {
        const M = s0(E);
        return M.variants ? function(I) {
          return Yl(I, M);
        } : M.style;
      }
      return E;
    }, P = (...E) => {
      const M = [], A = E.map(x), I = [];
      if (M.push(l), f && _ && I.push(function(N) {
        const F = N.theme.components?.[f]?.styleOverrides;
        if (!F)
          return null;
        const j = {};
        for (const H in F)
          j[H] = Yl(N, F[H]);
        return _(N, j);
      }), f && !b && I.push(function(N) {
        const F = N.theme?.components?.[f]?.variants;
        return F ? a0(N, F) : null;
      }), C || I.push(Ur), Array.isArray(A[0])) {
        const T = A.shift(), N = new Array(M.length).fill(""), V = new Array(I.length).fill("");
        let F;
        F = [...N, ...T, ...V], F.raw = [...N, ...T.raw, ...V], M.unshift(F);
      }
      const L = [...M, ...A, ...I], w = O(...L);
      return d.muiName && (w.muiName = d.muiName), w;
    };
    return O.withConfig && (P.withConfig = O.withConfig), P;
  };
}
function hk(e, t) {
  return void 0;
}
function gk(e) {
  for (const t in e)
    return !1;
  return !0;
}
function mk(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function yk(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function lu(e, t) {
  const r = {
    ...t
  };
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const s = o;
      if (s === "components" || s === "slots")
        r[s] = {
          ...e[s],
          ...r[s]
        };
      else if (s === "componentsProps" || s === "slotProps") {
        const l = e[s], u = t[s];
        if (!u)
          r[s] = l || {};
        else if (!l)
          r[s] = u;
        else {
          r[s] = {
            ...u
          };
          for (const d in l)
            if (Object.prototype.hasOwnProperty.call(l, d)) {
              const p = d;
              r[s][p] = lu(l[p], u[p]);
            }
        }
      } else r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
const ho = typeof window < "u" ? k.useLayoutEffect : k.useEffect;
function vk(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function Lp(e, t = 0, r = 1) {
  return vk(e, t, r);
}
function wk(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((o) => o + o)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((o, s) => s < 3 ? parseInt(o, 16) : Math.round(parseInt(o, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Wr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Wr(wk(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(r))
    throw new Error(Si(9, e));
  let o = e.substring(t + 1, e.length - 1), s;
  if (r === "color") {
    if (o = o.split(" "), s = o.shift(), o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(s))
      throw new Error(Si(10, s));
  } else
    o = o.split(",");
  return o = o.map((l) => parseFloat(l)), {
    type: r,
    values: o,
    colorSpace: s
  };
}
const Sk = (e) => {
  const t = Wr(e);
  return t.values.slice(0, 3).map((r, o) => t.type.includes("hsl") && o !== 0 ? `${r}%` : r).join(" ");
}, vs = (e, t) => {
  try {
    return Sk(e);
  } catch {
    return e;
  }
};
function Wu(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: o
  } = e;
  return t.includes("rgb") ? o = o.map((s, l) => l < 3 ? parseInt(s, 10) : s) : t.includes("hsl") && (o[1] = `${o[1]}%`, o[2] = `${o[2]}%`), t.includes("color") ? o = `${r} ${o.join(" ")}` : o = `${o.join(", ")}`, `${t}(${o})`;
}
function l0(e) {
  e = Wr(e);
  const {
    values: t
  } = e, r = t[0], o = t[1] / 100, s = t[2] / 100, l = o * Math.min(s, 1 - s), u = (f, g = (f + r / 30) % 12) => s - l * Math.max(Math.min(g - 3, 9 - g, 1), -1);
  let d = "rgb";
  const p = [Math.round(u(0) * 255), Math.round(u(8) * 255), Math.round(u(4) * 255)];
  return e.type === "hsla" && (d += "a", p.push(t[3])), Wu({
    type: d,
    values: p
  });
}
function jf(e) {
  e = Wr(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Wr(l0(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function bk(e, t) {
  const r = jf(e), o = jf(t);
  return (Math.max(r, o) + 0.05) / (Math.min(r, o) + 0.05);
}
function Ct(e, t) {
  return e = Wr(e), t = Lp(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Wu(e);
}
function Sl(e, t, r) {
  try {
    return Ct(e, t);
  } catch {
    return e;
  }
}
function Dp(e, t) {
  if (e = Wr(e), t = Lp(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Wu(e);
}
function je(e, t, r) {
  try {
    return Dp(e, t);
  } catch {
    return e;
  }
}
function Fp(e, t) {
  if (e = Wr(e), t = Lp(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Wu(e);
}
function Be(e, t, r) {
  try {
    return Fp(e, t);
  } catch {
    return e;
  }
}
function _k(e, t = 0.15) {
  return jf(e) > 0.5 ? Dp(e, t) : Fp(e, t);
}
function bl(e, t, r) {
  try {
    return _k(e, t);
  } catch {
    return e;
  }
}
function Py(...e) {
  return e.reduce((t, r) => r == null ? t : function(...s) {
    t.apply(this, s), r.apply(this, s);
  }, () => {
  });
}
function xk(e, t = 166) {
  let r;
  function o(...s) {
    const l = () => {
      e.apply(this, s);
    };
    clearTimeout(r), r = setTimeout(l, t);
  }
  return o.clear = () => {
    clearTimeout(r);
  }, o;
}
function Kn(e) {
  return e && e.ownerDocument || document;
}
function bi(e) {
  return Kn(e).defaultView || window;
}
function Ry(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
let Ty = 0;
function kk(e) {
  const [t, r] = k.useState(e), o = e || t;
  return k.useEffect(() => {
    t == null && (Ty += 1, r(`mui-${Ty}`));
  }, [t]), o;
}
const Ck = {
  ...Nf
}, $y = Ck.useId;
function u0(e) {
  if ($y !== void 0) {
    const t = $y();
    return e ?? t;
  }
  return kk(e);
}
function Ek({
  controlled: e,
  default: t,
  name: r,
  state: o = "value"
}) {
  const {
    current: s
  } = k.useRef(e !== void 0), [l, u] = k.useState(t), d = s ? e : l, p = k.useCallback((f) => {
    s || u(f);
  }, []);
  return [d, p];
}
function co(e) {
  const t = k.useRef(e);
  return ho(() => {
    t.current = e;
  }), k.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function An(...e) {
  const t = k.useRef(void 0), r = k.useCallback((o) => {
    const s = e.map((l) => {
      if (l == null)
        return null;
      if (typeof l == "function") {
        const u = l, d = u(o);
        return typeof d == "function" ? d : () => {
          u(null);
        };
      }
      return l.current = o, () => {
        l.current = null;
      };
    });
    return () => {
      s.forEach((l) => l?.());
    };
  }, e);
  return k.useMemo(() => e.every((o) => o == null) ? null : (o) => {
    t.current && (t.current(), t.current = void 0), o != null && (t.current = r(o));
  }, e);
}
const My = {};
function c0(e, t) {
  const r = k.useRef(My);
  return r.current === My && (r.current = e(t)), r;
}
const Pk = [];
function Rk(e) {
  k.useEffect(e, Pk);
}
class zp {
  static create() {
    return new zp();
  }
  currentId = null;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, r();
    }, t);
  }
  clear = () => {
    this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
  };
  disposeEffect = () => this.clear;
}
function d0() {
  const e = c0(zp.create).current;
  return Rk(e.disposeEffect), e;
}
function Ay(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return !1;
}
function f0(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function wt(e, t, r = void 0) {
  const o = {};
  for (const s in e) {
    const l = e[s];
    let u = "", d = !0;
    for (let p = 0; p < l.length; p += 1) {
      const f = l[p];
      f && (u += (d === !0 ? "" : " ") + t(f), d = !1, r && r[f] && (u += " " + r[f]));
    }
    o[s] = u;
  }
  return o;
}
function Tk(e) {
  return typeof e == "string";
}
function p0(e, t, r) {
  return e === void 0 || Tk(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...r
    }
  };
}
function h0(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((o) => o.match(/^on[A-Z]/) && typeof e[o] == "function" && !t.includes(o)).forEach((o) => {
    r[o] = e[o];
  }), r;
}
function Iy(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function g0(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: o,
    externalForwardedProps: s,
    className: l
  } = e;
  if (!t) {
    const _ = Re(r?.className, l, s?.className, o?.className), S = {
      ...r?.style,
      ...s?.style,
      ...o?.style
    }, b = {
      ...r,
      ...s,
      ...o
    };
    return _.length > 0 && (b.className = _), Object.keys(S).length > 0 && (b.style = S), {
      props: b,
      internalRef: void 0
    };
  }
  const u = h0({
    ...s,
    ...o
  }), d = Iy(o), p = Iy(s), f = t(u), g = Re(f?.className, r?.className, l, s?.className, o?.className), y = {
    ...f?.style,
    ...r?.style,
    ...s?.style,
    ...o?.style
  }, v = {
    ...f,
    ...r,
    ...p,
    ...d
  };
  return g.length > 0 && (v.className = g), Object.keys(y).length > 0 && (v.style = y), {
    props: v,
    internalRef: f.ref
  };
}
function m0(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function $k(e) {
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: s = !1,
    ...l
  } = e, u = s ? {} : m0(r, o), {
    props: d,
    internalRef: p
  } = g0({
    ...l,
    externalSlotProps: u
  }), f = An(p, u?.ref, e.additionalProps?.ref);
  return p0(t, {
    ...d,
    ref: f
  }, o);
}
function Vu(e) {
  return parseInt(k.version, 10) >= 19 ? e?.props?.ref || null : e?.ref || null;
}
const y0 = /* @__PURE__ */ k.createContext(null);
function jp() {
  return k.useContext(y0);
}
const Mk = typeof Symbol == "function" && Symbol.for, Ak = Mk ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function Ik(e, t) {
  return typeof t == "function" ? t(e) : {
    ...e,
    ...t
  };
}
function Ok(e) {
  const {
    children: t,
    theme: r
  } = e, o = jp(), s = k.useMemo(() => {
    const l = o === null ? {
      ...r
    } : Ik(o, r);
    return l != null && (l[Ak] = o !== null), l;
  }, [r, o]);
  return /* @__PURE__ */ B.jsx(y0.Provider, {
    value: s,
    children: t
  });
}
const v0 = /* @__PURE__ */ k.createContext();
function Nk({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ B.jsx(v0.Provider, {
    value: e ?? !0,
    ...t
  });
}
const Lk = () => k.useContext(v0) ?? !1, w0 = /* @__PURE__ */ k.createContext(void 0);
function Dk({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ B.jsx(w0.Provider, {
    value: e,
    children: t
  });
}
function Fk(e) {
  const {
    theme: t,
    name: r,
    props: o
  } = e;
  if (!t || !t.components || !t.components[r])
    return o;
  const s = t.components[r];
  return s.defaultProps ? lu(s.defaultProps, o) : !s.styleOverrides && !s.variants ? lu(s, o) : o;
}
function zk({
  props: e,
  name: t
}) {
  const r = k.useContext(w0);
  return Fk({
    props: e,
    name: t,
    theme: {
      components: r
    }
  });
}
const Oy = {};
function Ny(e, t, r, o = !1) {
  return k.useMemo(() => {
    const s = e && t[e] || t;
    if (typeof r == "function") {
      const l = r(s), u = e ? {
        ...t,
        [e]: l
      } : l;
      return o ? () => u : u;
    }
    return e ? {
      ...t,
      [e]: r
    } : {
      ...t,
      ...r
    };
  }, [e, t, r, o]);
}
function S0(e) {
  const {
    children: t,
    theme: r,
    themeId: o
  } = e, s = n0(Oy), l = jp() || Oy, u = Ny(o, s, r), d = Ny(o, l, r, !0), p = (o ? u[o] : u).direction === "rtl";
  return /* @__PURE__ */ B.jsx(Ok, {
    theme: d,
    children: /* @__PURE__ */ B.jsx(Ks.Provider, {
      value: u,
      children: /* @__PURE__ */ B.jsx(Nk, {
        value: p,
        children: /* @__PURE__ */ B.jsx(Dk, {
          value: o ? u[o].components : u.components,
          children: t
        })
      })
    })
  });
}
const Ly = {
  theme: void 0
};
function jk(e) {
  let t, r;
  return function(s) {
    let l = t;
    return (l === void 0 || s.theme !== r) && (Ly.theme = s.theme, l = s0(e(Ly)), t = l, r = s.theme), l;
  };
}
const Bp = "mode", Up = "color-scheme", Bk = "data-color-scheme";
function Uk(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: r = "light",
    defaultDarkColorScheme: o = "dark",
    modeStorageKey: s = Bp,
    colorSchemeStorageKey: l = Up,
    attribute: u = Bk,
    colorSchemeNode: d = "document.documentElement",
    nonce: p
  } = e || {};
  let f = "", g = u;
  if (u === "class" && (g = ".%s"), u === "data" && (g = "[data-%s]"), g.startsWith(".")) {
    const v = g.substring(1);
    f += `${d}.classList.remove('${v}'.replace('%s', light), '${v}'.replace('%s', dark));
      ${d}.classList.add('${v}'.replace('%s', colorScheme));`;
  }
  const y = g.match(/\[([^\]]+)\]/);
  if (y) {
    const [v, _] = y[1].split("=");
    _ || (f += `${d}.removeAttribute('${v}'.replace('%s', light));
      ${d}.removeAttribute('${v}'.replace('%s', dark));`), f += `
      ${d}.setAttribute('${v}'.replace('%s', colorScheme), ${_ ? `${_}.replace('%s', colorScheme)` : '""'});`;
  } else
    f += `${d}.setAttribute('${g}', colorScheme);`;
  return /* @__PURE__ */ B.jsx("script", {
    suppressHydrationWarning: !0,
    nonce: typeof window > "u" ? p : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${s}') || '${t}';
  const dark = localStorage.getItem('${l}-dark') || '${o}';
  const light = localStorage.getItem('${l}-light') || '${r}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${f}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
function Wk() {
}
const Vk = ({
  key: e,
  storageWindow: t
}) => (!t && typeof window < "u" && (t = window), {
  get(r) {
    if (typeof window > "u")
      return;
    if (!t)
      return r;
    let o;
    try {
      o = t.localStorage.getItem(e);
    } catch {
    }
    return o || r;
  },
  set: (r) => {
    if (t)
      try {
        t.localStorage.setItem(e, r);
      } catch {
      }
  },
  subscribe: (r) => {
    if (!t)
      return Wk;
    const o = (s) => {
      const l = s.newValue;
      s.key === e && r(l);
    };
    return t.addEventListener("storage", o), () => {
      t.removeEventListener("storage", o);
    };
  }
});
function af() {
}
function Dy(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function b0(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function Hk(e) {
  return b0(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function qk(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: r,
    defaultDarkColorScheme: o,
    supportedColorSchemes: s = [],
    modeStorageKey: l = Bp,
    colorSchemeStorageKey: u = Up,
    storageWindow: d = typeof window > "u" ? void 0 : window,
    storageManager: p = Vk,
    noSsr: f = !1
  } = e, g = s.join(","), y = s.length > 1, v = k.useMemo(() => p?.({
    key: l,
    storageWindow: d
  }), [p, l, d]), _ = k.useMemo(() => p?.({
    key: `${u}-light`,
    storageWindow: d
  }), [p, u, d]), S = k.useMemo(() => p?.({
    key: `${u}-dark`,
    storageWindow: d
  }), [p, u, d]), [b, C] = k.useState(() => {
    const I = v?.get(t) || t, L = _?.get(r) || r, w = S?.get(o) || o;
    return {
      mode: I,
      systemMode: Dy(I),
      lightColorScheme: L,
      darkColorScheme: w
    };
  }), [R, O] = k.useState(f || !y);
  k.useEffect(() => {
    O(!0);
  }, []);
  const x = Hk(b), P = k.useCallback((I) => {
    C((L) => {
      if (I === L.mode)
        return L;
      const w = I ?? t;
      return v?.set(w), {
        ...L,
        mode: w,
        systemMode: Dy(w)
      };
    });
  }, [v, t]), E = k.useCallback((I) => {
    I ? typeof I == "string" ? I && !g.includes(I) ? console.error(`\`${I}\` does not exist in \`theme.colorSchemes\`.`) : C((L) => {
      const w = {
        ...L
      };
      return b0(L, (T) => {
        T === "light" && (_?.set(I), w.lightColorScheme = I), T === "dark" && (S?.set(I), w.darkColorScheme = I);
      }), w;
    }) : C((L) => {
      const w = {
        ...L
      }, T = I.light === null ? r : I.light, N = I.dark === null ? o : I.dark;
      return T && (g.includes(T) ? (w.lightColorScheme = T, _?.set(T)) : console.error(`\`${T}\` does not exist in \`theme.colorSchemes\`.`)), N && (g.includes(N) ? (w.darkColorScheme = N, S?.set(N)) : console.error(`\`${N}\` does not exist in \`theme.colorSchemes\`.`)), w;
    }) : C((L) => (_?.set(r), S?.set(o), {
      ...L,
      lightColorScheme: r,
      darkColorScheme: o
    }));
  }, [g, _, S, r, o]), M = k.useCallback((I) => {
    b.mode === "system" && C((L) => {
      const w = I?.matches ? "dark" : "light";
      return L.systemMode === w ? L : {
        ...L,
        systemMode: w
      };
    });
  }, [b.mode]), A = k.useRef(M);
  return A.current = M, k.useEffect(() => {
    if (typeof window.matchMedia != "function" || !y)
      return;
    const I = (...w) => A.current(...w), L = window.matchMedia("(prefers-color-scheme: dark)");
    return L.addListener(I), I(L), () => {
      L.removeListener(I);
    };
  }, [y]), k.useEffect(() => {
    if (y) {
      const I = v?.subscribe((T) => {
        (!T || ["light", "dark", "system"].includes(T)) && P(T || t);
      }) || af, L = _?.subscribe((T) => {
        (!T || g.match(T)) && E({
          light: T
        });
      }) || af, w = S?.subscribe((T) => {
        (!T || g.match(T)) && E({
          dark: T
        });
      }) || af;
      return () => {
        I(), L(), w();
      };
    }
  }, [E, P, g, t, d, y, v, _, S]), {
    ...b,
    mode: R ? b.mode : void 0,
    systemMode: R ? b.systemMode : void 0,
    colorScheme: R ? x : void 0,
    setMode: P,
    setColorScheme: E
  };
}
const Kk = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function Qk(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: r = {},
    modeStorageKey: o = Bp,
    colorSchemeStorageKey: s = Up,
    disableTransitionOnChange: l = !1,
    defaultColorScheme: u,
    resolveTheme: d
  } = e, p = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  }, f = /* @__PURE__ */ k.createContext(void 0), g = () => k.useContext(f) || p, y = {}, v = {};
  function _(R) {
    const {
      children: O,
      theme: x,
      modeStorageKey: P = o,
      colorSchemeStorageKey: E = s,
      disableTransitionOnChange: M = l,
      storageManager: A,
      storageWindow: I = typeof window > "u" ? void 0 : window,
      documentNode: L = typeof document > "u" ? void 0 : document,
      colorSchemeNode: w = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: T = !1,
      disableStyleSheetGeneration: N = !1,
      defaultMode: V = "system",
      noSsr: F
    } = R, j = k.useRef(!1), H = jp(), Y = k.useContext(f), U = !!Y && !T, W = k.useMemo(() => x || (typeof r == "function" ? r() : r), [x]), K = W[t], D = K || W, {
      colorSchemes: G = y,
      components: oe = v,
      cssVarPrefix: te
    } = D, se = Object.keys(G).filter((Tt) => !!G[Tt]).join(","), le = k.useMemo(() => se.split(","), [se]), de = typeof u == "string" ? u : u.light, he = typeof u == "string" ? u : u.dark, fe = G[de] && G[he] ? V : G[D.defaultColorScheme]?.palette?.mode || D.palette?.mode, {
      mode: ue,
      setMode: we,
      systemMode: _e,
      lightColorScheme: qe,
      darkColorScheme: ze,
      colorScheme: st,
      setColorScheme: ut
    } = qk({
      supportedColorSchemes: le,
      defaultLightColorScheme: de,
      defaultDarkColorScheme: he,
      modeStorageKey: P,
      colorSchemeStorageKey: E,
      defaultMode: fe,
      storageManager: A,
      storageWindow: I,
      noSsr: F
    });
    let Ze = ue, De = st;
    U && (Ze = Y.mode, De = Y.colorScheme);
    const Rt = k.useMemo(() => {
      const Tt = De || D.defaultColorScheme, St = D.generateThemeVars?.() || D.vars, $t = {
        ...D,
        components: oe,
        colorSchemes: G,
        cssVarPrefix: te,
        vars: St
      };
      if (typeof $t.generateSpacing == "function" && ($t.spacing = $t.generateSpacing()), Tt) {
        const Vt = G[Tt];
        Vt && typeof Vt == "object" && Object.keys(Vt).forEach((Mt) => {
          Vt[Mt] && typeof Vt[Mt] == "object" ? $t[Mt] = {
            ...$t[Mt],
            ...Vt[Mt]
          } : $t[Mt] = Vt[Mt];
        });
      }
      return d ? d($t) : $t;
    }, [D, De, oe, G, te]), ct = D.colorSchemeSelector;
    ho(() => {
      if (De && w && ct && ct !== "media") {
        const Tt = ct;
        let St = ct;
        if (Tt === "class" && (St = ".%s"), Tt === "data" && (St = "[data-%s]"), Tt?.startsWith("data-") && !Tt.includes("%s") && (St = `[${Tt}="%s"]`), St.startsWith("."))
          w.classList.remove(...le.map(($t) => St.substring(1).replace("%s", $t))), w.classList.add(St.substring(1).replace("%s", De));
        else {
          const $t = St.replace("%s", De).match(/\[([^\]]+)\]/);
          if ($t) {
            const [Vt, Mt] = $t[1].split("=");
            Mt || le.forEach((da) => {
              w.removeAttribute(Vt.replace(De, da));
            }), w.setAttribute(Vt, Mt ? Mt.replace(/"|'/g, "") : "");
          } else
            w.setAttribute(St, De);
        }
      }
    }, [De, ct, w, le]), k.useEffect(() => {
      let Tt;
      if (M && j.current && L) {
        const St = L.createElement("style");
        St.appendChild(L.createTextNode(Kk)), L.head.appendChild(St), window.getComputedStyle(L.body), Tt = setTimeout(() => {
          L.head.removeChild(St);
        }, 1);
      }
      return () => {
        clearTimeout(Tt);
      };
    }, [De, M, L]), k.useEffect(() => (j.current = !0, () => {
      j.current = !1;
    }), []);
    const We = k.useMemo(() => ({
      allColorSchemes: le,
      colorScheme: De,
      darkColorScheme: ze,
      lightColorScheme: qe,
      mode: Ze,
      setColorScheme: ut,
      setMode: we,
      systemMode: _e
    }), [le, De, ze, qe, Ze, ut, we, _e, Rt.colorSchemeSelector]);
    let xe = !0;
    (N || D.cssVariables === !1 || U && H?.cssVarPrefix === te) && (xe = !1);
    const _o = /* @__PURE__ */ B.jsxs(k.Fragment, {
      children: [/* @__PURE__ */ B.jsx(S0, {
        themeId: K ? t : void 0,
        theme: Rt,
        children: O
      }), xe && /* @__PURE__ */ B.jsx(Yw, {
        styles: Rt.generateStyleSheets?.() || []
      })]
    });
    return U ? _o : /* @__PURE__ */ B.jsx(f.Provider, {
      value: We,
      children: _o
    });
  }
  const S = typeof u == "string" ? u : u.light, b = typeof u == "string" ? u : u.dark;
  return {
    CssVarsProvider: _,
    useColorScheme: g,
    getInitColorSchemeScript: (R) => Uk({
      colorSchemeStorageKey: s,
      defaultLightColorScheme: S,
      defaultDarkColorScheme: b,
      modeStorageKey: o,
      ...R
    })
  };
}
function Gk(e = "") {
  function t(...o) {
    if (!o.length)
      return "";
    const s = o[0];
    return typeof s == "string" && !s.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${s}${t(...o.slice(1))})` : `, ${s}`;
  }
  return (o, ...s) => `var(--${e ? `${e}-` : ""}${o}${t(...s)})`;
}
const Fy = (e, t, r, o = []) => {
  let s = e;
  t.forEach((l, u) => {
    u === t.length - 1 ? Array.isArray(s) ? s[Number(l)] = r : s && typeof s == "object" && (s[l] = r) : s && typeof s == "object" && (s[l] || (s[l] = o.includes(l) ? [] : {}), s = s[l]);
  });
}, Yk = (e, t, r) => {
  function o(s, l = [], u = []) {
    Object.entries(s).forEach(([d, p]) => {
      (!r || r && !r([...l, d])) && p != null && (typeof p == "object" && Object.keys(p).length > 0 ? o(p, [...l, d], Array.isArray(p) ? [...u, d] : u) : t([...l, d], p, u));
    });
  }
  o(e);
}, Jk = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((o) => e.includes(o)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function lf(e, t) {
  const {
    prefix: r,
    shouldSkipGeneratingVar: o
  } = t || {}, s = {}, l = {}, u = {};
  return Yk(
    e,
    (d, p, f) => {
      if ((typeof p == "string" || typeof p == "number") && (!o || !o(d, p))) {
        const g = `--${r ? `${r}-` : ""}${d.join("-")}`, y = Jk(d, p);
        Object.assign(s, {
          [g]: y
        }), Fy(l, d, `var(${g})`, f), Fy(u, d, `var(${g}, ${y})`, f);
      }
    },
    (d) => d[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: s,
    vars: l,
    varsWithDefaults: u
  };
}
function Xk(e, t = {}) {
  const {
    getSelector: r = C,
    disableCssColorScheme: o,
    colorSchemeSelector: s
  } = t, {
    colorSchemes: l = {},
    components: u,
    defaultColorScheme: d = "light",
    ...p
  } = e, {
    vars: f,
    css: g,
    varsWithDefaults: y
  } = lf(p, t);
  let v = y;
  const _ = {}, {
    [d]: S,
    ...b
  } = l;
  if (Object.entries(b || {}).forEach(([x, P]) => {
    const {
      vars: E,
      css: M,
      varsWithDefaults: A
    } = lf(P, t);
    v = sn(v, A), _[x] = {
      css: M,
      vars: E
    };
  }), S) {
    const {
      css: x,
      vars: P,
      varsWithDefaults: E
    } = lf(S, t);
    v = sn(v, E), _[d] = {
      css: x,
      vars: P
    };
  }
  function C(x, P) {
    let E = s;
    if (s === "class" && (E = ".%s"), s === "data" && (E = "[data-%s]"), s?.startsWith("data-") && !s.includes("%s") && (E = `[${s}="%s"]`), x) {
      if (E === "media")
        return e.defaultColorScheme === x ? ":root" : {
          [`@media (prefers-color-scheme: ${l[x]?.palette?.mode || x})`]: {
            ":root": P
          }
        };
      if (E)
        return e.defaultColorScheme === x ? `:root, ${E.replace("%s", String(x))}` : E.replace("%s", String(x));
    }
    return ":root";
  }
  return {
    vars: v,
    generateThemeVars: () => {
      let x = {
        ...f
      };
      return Object.entries(_).forEach(([, {
        vars: P
      }]) => {
        x = sn(x, P);
      }), x;
    },
    generateStyleSheets: () => {
      const x = [], P = e.defaultColorScheme || "light";
      function E(I, L) {
        Object.keys(L).length && x.push(typeof I == "string" ? {
          [I]: {
            ...L
          }
        } : I);
      }
      E(r(void 0, {
        ...g
      }), g);
      const {
        [P]: M,
        ...A
      } = _;
      if (M) {
        const {
          css: I
        } = M, L = l[P]?.palette?.mode, w = !o && L ? {
          colorScheme: L,
          ...I
        } : {
          ...I
        };
        E(r(P, {
          ...w
        }), w);
      }
      return Object.entries(A).forEach(([I, {
        css: L
      }]) => {
        const w = l[I]?.palette?.mode, T = !o && w ? {
          colorScheme: w,
          ...L
        } : {
          ...L
        };
        E(r(I, {
          ...T
        }), T);
      }), x;
    }
  };
}
function Zk(e) {
  return function(r) {
    return e === "media" ? `@media (prefers-color-scheme: ${r})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${r}"] &` : e === "class" ? `.${r} &` : e === "data" ? `[data-${r}] &` : `${e.replace("%s", r)} &` : "&";
  };
}
function _0() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: As.white,
      default: As.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const eC = _0();
function x0() {
  return {
    text: {
      primary: As.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: As.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const zy = x0();
function jy(e, t, r, o) {
  const s = o.light || o, l = o.dark || o * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Fp(e.main, s) : t === "dark" && (e.dark = Dp(e.main, l)));
}
function tC(e = "light") {
  return e === "dark" ? {
    main: Zi[200],
    light: Zi[50],
    dark: Zi[400]
  } : {
    main: Zi[700],
    light: Zi[400],
    dark: Zi[800]
  };
}
function nC(e = "light") {
  return e === "dark" ? {
    main: Xi[200],
    light: Xi[50],
    dark: Xi[400]
  } : {
    main: Xi[500],
    light: Xi[300],
    dark: Xi[700]
  };
}
function rC(e = "light") {
  return e === "dark" ? {
    main: Ji[500],
    light: Ji[300],
    dark: Ji[700]
  } : {
    main: Ji[700],
    light: Ji[400],
    dark: Ji[800]
  };
}
function iC(e = "light") {
  return e === "dark" ? {
    main: eo[400],
    light: eo[300],
    dark: eo[700]
  } : {
    main: eo[700],
    light: eo[500],
    dark: eo[900]
  };
}
function oC(e = "light") {
  return e === "dark" ? {
    main: to[400],
    light: to[300],
    dark: to[700]
  } : {
    main: to[800],
    light: to[500],
    dark: to[900]
  };
}
function sC(e = "light") {
  return e === "dark" ? {
    main: ls[400],
    light: ls[300],
    dark: ls[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ls[500],
    dark: ls[900]
  };
}
function Wp(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: o = 0.2,
    ...s
  } = e, l = e.primary || tC(t), u = e.secondary || nC(t), d = e.error || rC(t), p = e.info || iC(t), f = e.success || oC(t), g = e.warning || sC(t);
  function y(b) {
    return bk(b, zy.text.primary) >= r ? zy.text.primary : eC.text.primary;
  }
  const v = ({
    color: b,
    name: C,
    mainShade: R = 500,
    lightShade: O = 300,
    darkShade: x = 700
  }) => {
    if (b = {
      ...b
    }, !b.main && b[R] && (b.main = b[R]), !b.hasOwnProperty("main"))
      throw new Error(Si(11, C ? ` (${C})` : "", R));
    if (typeof b.main != "string")
      throw new Error(Si(12, C ? ` (${C})` : "", JSON.stringify(b.main)));
    return jy(b, "light", O, o), jy(b, "dark", x, o), b.contrastText || (b.contrastText = y(b.main)), b;
  };
  let _;
  return t === "light" ? _ = _0() : t === "dark" && (_ = x0()), sn({
    // A collection of common colors.
    common: {
      ...As
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: v({
      color: l,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: v({
      color: u,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: v({
      color: d,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: v({
      color: g,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: v({
      color: p,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: v({
      color: f,
      name: "success"
    }),
    // The grey colors.
    grey: t1,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: y,
    // Generate a rich color object.
    augmentColor: v,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: o,
    // The light and dark mode object.
    ..._
  }, s);
}
function aC(e) {
  const t = {};
  return Object.entries(e).forEach((o) => {
    const [s, l] = o;
    typeof l == "object" && (t[s] = `${l.fontStyle ? `${l.fontStyle} ` : ""}${l.fontVariant ? `${l.fontVariant} ` : ""}${l.fontWeight ? `${l.fontWeight} ` : ""}${l.fontStretch ? `${l.fontStretch} ` : ""}${l.fontSize || ""}${l.lineHeight ? `/${l.lineHeight} ` : ""}${l.fontFamily || ""}`);
  }), t;
}
function lC(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    },
    ...t
  };
}
function uC(e) {
  return Math.round(e * 1e5) / 1e5;
}
const By = {
  textTransform: "uppercase"
}, Uy = '"Roboto", "Helvetica", "Arial", sans-serif';
function k0(e, t) {
  const {
    fontFamily: r = Uy,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: s = 300,
    fontWeightRegular: l = 400,
    fontWeightMedium: u = 500,
    fontWeightBold: d = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: p = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: g,
    ...y
  } = typeof t == "function" ? t(e) : t, v = o / 14, _ = g || ((C) => `${C / p * v}rem`), S = (C, R, O, x, P) => ({
    fontFamily: r,
    fontWeight: C,
    fontSize: _(R),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: O,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...r === Uy ? {
      letterSpacing: `${uC(x / R)}em`
    } : {},
    ...P,
    ...f
  }), b = {
    h1: S(s, 96, 1.167, -1.5),
    h2: S(s, 60, 1.2, -0.5),
    h3: S(l, 48, 1.167, 0),
    h4: S(l, 34, 1.235, 0.25),
    h5: S(l, 24, 1.334, 0),
    h6: S(u, 20, 1.6, 0.15),
    subtitle1: S(l, 16, 1.75, 0.15),
    subtitle2: S(u, 14, 1.57, 0.1),
    body1: S(l, 16, 1.5, 0.15),
    body2: S(l, 14, 1.43, 0.15),
    button: S(u, 14, 1.75, 0.4, By),
    caption: S(l, 12, 1.66, 0.4),
    overline: S(l, 12, 2.66, 1, By),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return sn({
    htmlFontSize: p,
    pxToRem: _,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: s,
    fontWeightRegular: l,
    fontWeightMedium: u,
    fontWeightBold: d,
    ...b
  }, y, {
    clone: !1
    // No need to clone deep
  });
}
const cC = 0.2, dC = 0.14, fC = 0.12;
function Qe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${cC})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${dC})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${fC})`].join(",");
}
const pC = ["none", Qe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Qe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Qe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Qe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Qe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Qe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Qe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Qe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Qe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Qe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Qe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Qe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Qe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Qe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Qe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Qe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Qe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Qe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Qe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Qe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Qe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Qe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Qe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Qe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], hC = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, gC = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Wy(e) {
  return `${Math.round(e)}ms`;
}
function mC(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function yC(e) {
  const t = {
    ...hC,
    ...e.easing
  }, r = {
    ...gC,
    ...e.duration
  };
  return {
    getAutoHeightDuration: mC,
    create: (s = ["all"], l = {}) => {
      const {
        duration: u = r.standard,
        easing: d = t.easeInOut,
        delay: p = 0,
        ...f
      } = l;
      return (Array.isArray(s) ? s : [s]).map((g) => `${g} ${typeof u == "string" ? u : Wy(u)} ${d} ${typeof p == "string" ? p : Wy(p)}`).join(",");
    },
    ...e,
    easing: t,
    duration: r
  };
}
const vC = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function wC(e) {
  return Un(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function C0(e = {}) {
  const t = {
    ...e
  };
  function r(o) {
    const s = Object.entries(o);
    for (let l = 0; l < s.length; l++) {
      const [u, d] = s[l];
      !wC(d) || u.startsWith("unstable_") ? delete o[u] : Un(d) && (o[u] = {
        ...d
      }, r(o[u]));
    }
  }
  return r(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Bf(e = {}, ...t) {
  const {
    breakpoints: r,
    mixins: o = {},
    spacing: s,
    palette: l = {},
    transitions: u = {},
    typography: d = {},
    shape: p,
    ...f
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(Si(20));
  const g = Wp(l), y = Op(e);
  let v = sn(y, {
    mixins: lC(y.breakpoints, o),
    palette: g,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: pC.slice(),
    typography: k0(g, d),
    transitions: yC(u),
    zIndex: {
      ...vC
    }
  });
  return v = sn(v, f), v = t.reduce((_, S) => sn(_, S), v), v.unstable_sxConfig = {
    ...Js,
    ...f?.unstable_sxConfig
  }, v.unstable_sx = function(S) {
    return Ur({
      sx: S,
      theme: this
    });
  }, v.toRuntimeSource = C0, v;
}
function Uf(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const SC = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const r = Uf(t);
  return `linear-gradient(rgba(255 255 255 / ${r}), rgba(255 255 255 / ${r}))`;
});
function E0(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function P0(e) {
  return e === "dark" ? SC : [];
}
function bC(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: r,
    overlays: o,
    ...s
  } = e, l = Wp(t);
  return {
    palette: l,
    opacity: {
      ...E0(l.mode),
      ...r
    },
    overlays: o || P0(l.mode),
    ...s
  };
}
function _C(e) {
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
const xC = (e) => [...[...Array(25)].map((t, r) => `--${e ? `${e}-` : ""}overlays-${r}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], kC = (e) => (t, r) => {
  const o = e.rootSelector || ":root", s = e.colorSchemeSelector;
  let l = s;
  if (s === "class" && (l = ".%s"), s === "data" && (l = "[data-%s]"), s?.startsWith("data-") && !s.includes("%s") && (l = `[${s}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const u = {};
      return xC(e.cssVarPrefix).forEach((d) => {
        u[d] = r[d], delete r[d];
      }), l === "media" ? {
        [o]: r,
        "@media (prefers-color-scheme: dark)": {
          [o]: u
        }
      } : l ? {
        [l.replace("%s", t)]: u,
        [`${o}, ${l.replace("%s", t)}`]: r
      } : {
        [o]: {
          ...r,
          ...u
        }
      };
    }
    if (l && l !== "media")
      return `${o}, ${l.replace("%s", String(t))}`;
  } else if (t) {
    if (l === "media")
      return {
        [`@media (prefers-color-scheme: ${String(t)})`]: {
          [o]: r
        }
      };
    if (l)
      return l.replace("%s", String(t));
  }
  return o;
};
function CC(e, t) {
  t.forEach((r) => {
    e[r] || (e[r] = {});
  });
}
function ee(e, t, r) {
  !e[t] && r && (e[t] = r);
}
function ws(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : l0(e);
}
function or(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = vs(ws(e[t])));
}
function EC(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const zn = (e) => {
  try {
    return e();
  } catch {
  }
}, PC = (e = "mui") => Gk(e);
function uf(e, t, r, o) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const s = o === "dark" ? "dark" : "light";
  if (!r) {
    e[o] = bC({
      ...t,
      palette: {
        mode: s,
        ...t?.palette
      }
    });
    return;
  }
  const {
    palette: l,
    ...u
  } = Bf({
    ...r,
    palette: {
      mode: s,
      ...t?.palette
    }
  });
  return e[o] = {
    ...t,
    palette: l,
    opacity: {
      ...E0(s),
      ...t?.opacity
    },
    overlays: t?.overlays || P0(s)
  }, u;
}
function RC(e = {}, ...t) {
  const {
    colorSchemes: r = {
      light: !0
    },
    defaultColorScheme: o,
    disableCssColorScheme: s = !1,
    cssVarPrefix: l = "mui",
    shouldSkipGeneratingVar: u = _C,
    colorSchemeSelector: d = r.light && r.dark ? "media" : void 0,
    rootSelector: p = ":root",
    ...f
  } = e, g = Object.keys(r)[0], y = o || (r.light && g !== "light" ? "light" : g), v = PC(l), {
    [y]: _,
    light: S,
    dark: b,
    ...C
  } = r, R = {
    ...C
  };
  let O = _;
  if ((y === "dark" && !("dark" in r) || y === "light" && !("light" in r)) && (O = !0), !O)
    throw new Error(Si(21, y));
  const x = uf(R, O, f, y);
  S && !R.light && uf(R, S, void 0, "light"), b && !R.dark && uf(R, b, void 0, "dark");
  let P = {
    defaultColorScheme: y,
    ...x,
    cssVarPrefix: l,
    colorSchemeSelector: d,
    rootSelector: p,
    getCssVar: v,
    colorSchemes: R,
    font: {
      ...aC(x.typography),
      ...x.font
    },
    spacing: EC(f.spacing)
  };
  Object.keys(P.colorSchemes).forEach((L) => {
    const w = P.colorSchemes[L].palette, T = (N) => {
      const V = N.split("-"), F = V[1], j = V[2];
      return v(N, w[F][j]);
    };
    if (w.mode === "light" && (ee(w.common, "background", "#fff"), ee(w.common, "onBackground", "#000")), w.mode === "dark" && (ee(w.common, "background", "#000"), ee(w.common, "onBackground", "#fff")), CC(w, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), w.mode === "light") {
      ee(w.Alert, "errorColor", je(w.error.light, 0.6)), ee(w.Alert, "infoColor", je(w.info.light, 0.6)), ee(w.Alert, "successColor", je(w.success.light, 0.6)), ee(w.Alert, "warningColor", je(w.warning.light, 0.6)), ee(w.Alert, "errorFilledBg", T("palette-error-main")), ee(w.Alert, "infoFilledBg", T("palette-info-main")), ee(w.Alert, "successFilledBg", T("palette-success-main")), ee(w.Alert, "warningFilledBg", T("palette-warning-main")), ee(w.Alert, "errorFilledColor", zn(() => w.getContrastText(w.error.main))), ee(w.Alert, "infoFilledColor", zn(() => w.getContrastText(w.info.main))), ee(w.Alert, "successFilledColor", zn(() => w.getContrastText(w.success.main))), ee(w.Alert, "warningFilledColor", zn(() => w.getContrastText(w.warning.main))), ee(w.Alert, "errorStandardBg", Be(w.error.light, 0.9)), ee(w.Alert, "infoStandardBg", Be(w.info.light, 0.9)), ee(w.Alert, "successStandardBg", Be(w.success.light, 0.9)), ee(w.Alert, "warningStandardBg", Be(w.warning.light, 0.9)), ee(w.Alert, "errorIconColor", T("palette-error-main")), ee(w.Alert, "infoIconColor", T("palette-info-main")), ee(w.Alert, "successIconColor", T("palette-success-main")), ee(w.Alert, "warningIconColor", T("palette-warning-main")), ee(w.AppBar, "defaultBg", T("palette-grey-100")), ee(w.Avatar, "defaultBg", T("palette-grey-400")), ee(w.Button, "inheritContainedBg", T("palette-grey-300")), ee(w.Button, "inheritContainedHoverBg", T("palette-grey-A100")), ee(w.Chip, "defaultBorder", T("palette-grey-400")), ee(w.Chip, "defaultAvatarColor", T("palette-grey-700")), ee(w.Chip, "defaultIconColor", T("palette-grey-700")), ee(w.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ee(w.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ee(w.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ee(w.LinearProgress, "primaryBg", Be(w.primary.main, 0.62)), ee(w.LinearProgress, "secondaryBg", Be(w.secondary.main, 0.62)), ee(w.LinearProgress, "errorBg", Be(w.error.main, 0.62)), ee(w.LinearProgress, "infoBg", Be(w.info.main, 0.62)), ee(w.LinearProgress, "successBg", Be(w.success.main, 0.62)), ee(w.LinearProgress, "warningBg", Be(w.warning.main, 0.62)), ee(w.Skeleton, "bg", `rgba(${T("palette-text-primaryChannel")} / 0.11)`), ee(w.Slider, "primaryTrack", Be(w.primary.main, 0.62)), ee(w.Slider, "secondaryTrack", Be(w.secondary.main, 0.62)), ee(w.Slider, "errorTrack", Be(w.error.main, 0.62)), ee(w.Slider, "infoTrack", Be(w.info.main, 0.62)), ee(w.Slider, "successTrack", Be(w.success.main, 0.62)), ee(w.Slider, "warningTrack", Be(w.warning.main, 0.62));
      const N = bl(w.background.default, 0.8);
      ee(w.SnackbarContent, "bg", N), ee(w.SnackbarContent, "color", zn(() => w.getContrastText(N))), ee(w.SpeedDialAction, "fabHoverBg", bl(w.background.paper, 0.15)), ee(w.StepConnector, "border", T("palette-grey-400")), ee(w.StepContent, "border", T("palette-grey-400")), ee(w.Switch, "defaultColor", T("palette-common-white")), ee(w.Switch, "defaultDisabledColor", T("palette-grey-100")), ee(w.Switch, "primaryDisabledColor", Be(w.primary.main, 0.62)), ee(w.Switch, "secondaryDisabledColor", Be(w.secondary.main, 0.62)), ee(w.Switch, "errorDisabledColor", Be(w.error.main, 0.62)), ee(w.Switch, "infoDisabledColor", Be(w.info.main, 0.62)), ee(w.Switch, "successDisabledColor", Be(w.success.main, 0.62)), ee(w.Switch, "warningDisabledColor", Be(w.warning.main, 0.62)), ee(w.TableCell, "border", Be(Sl(w.divider, 1), 0.88)), ee(w.Tooltip, "bg", Sl(w.grey[700], 0.92));
    }
    if (w.mode === "dark") {
      ee(w.Alert, "errorColor", Be(w.error.light, 0.6)), ee(w.Alert, "infoColor", Be(w.info.light, 0.6)), ee(w.Alert, "successColor", Be(w.success.light, 0.6)), ee(w.Alert, "warningColor", Be(w.warning.light, 0.6)), ee(w.Alert, "errorFilledBg", T("palette-error-dark")), ee(w.Alert, "infoFilledBg", T("palette-info-dark")), ee(w.Alert, "successFilledBg", T("palette-success-dark")), ee(w.Alert, "warningFilledBg", T("palette-warning-dark")), ee(w.Alert, "errorFilledColor", zn(() => w.getContrastText(w.error.dark))), ee(w.Alert, "infoFilledColor", zn(() => w.getContrastText(w.info.dark))), ee(w.Alert, "successFilledColor", zn(() => w.getContrastText(w.success.dark))), ee(w.Alert, "warningFilledColor", zn(() => w.getContrastText(w.warning.dark))), ee(w.Alert, "errorStandardBg", je(w.error.light, 0.9)), ee(w.Alert, "infoStandardBg", je(w.info.light, 0.9)), ee(w.Alert, "successStandardBg", je(w.success.light, 0.9)), ee(w.Alert, "warningStandardBg", je(w.warning.light, 0.9)), ee(w.Alert, "errorIconColor", T("palette-error-main")), ee(w.Alert, "infoIconColor", T("palette-info-main")), ee(w.Alert, "successIconColor", T("palette-success-main")), ee(w.Alert, "warningIconColor", T("palette-warning-main")), ee(w.AppBar, "defaultBg", T("palette-grey-900")), ee(w.AppBar, "darkBg", T("palette-background-paper")), ee(w.AppBar, "darkColor", T("palette-text-primary")), ee(w.Avatar, "defaultBg", T("palette-grey-600")), ee(w.Button, "inheritContainedBg", T("palette-grey-800")), ee(w.Button, "inheritContainedHoverBg", T("palette-grey-700")), ee(w.Chip, "defaultBorder", T("palette-grey-700")), ee(w.Chip, "defaultAvatarColor", T("palette-grey-300")), ee(w.Chip, "defaultIconColor", T("palette-grey-300")), ee(w.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ee(w.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ee(w.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ee(w.LinearProgress, "primaryBg", je(w.primary.main, 0.5)), ee(w.LinearProgress, "secondaryBg", je(w.secondary.main, 0.5)), ee(w.LinearProgress, "errorBg", je(w.error.main, 0.5)), ee(w.LinearProgress, "infoBg", je(w.info.main, 0.5)), ee(w.LinearProgress, "successBg", je(w.success.main, 0.5)), ee(w.LinearProgress, "warningBg", je(w.warning.main, 0.5)), ee(w.Skeleton, "bg", `rgba(${T("palette-text-primaryChannel")} / 0.13)`), ee(w.Slider, "primaryTrack", je(w.primary.main, 0.5)), ee(w.Slider, "secondaryTrack", je(w.secondary.main, 0.5)), ee(w.Slider, "errorTrack", je(w.error.main, 0.5)), ee(w.Slider, "infoTrack", je(w.info.main, 0.5)), ee(w.Slider, "successTrack", je(w.success.main, 0.5)), ee(w.Slider, "warningTrack", je(w.warning.main, 0.5));
      const N = bl(w.background.default, 0.98);
      ee(w.SnackbarContent, "bg", N), ee(w.SnackbarContent, "color", zn(() => w.getContrastText(N))), ee(w.SpeedDialAction, "fabHoverBg", bl(w.background.paper, 0.15)), ee(w.StepConnector, "border", T("palette-grey-600")), ee(w.StepContent, "border", T("palette-grey-600")), ee(w.Switch, "defaultColor", T("palette-grey-300")), ee(w.Switch, "defaultDisabledColor", T("palette-grey-600")), ee(w.Switch, "primaryDisabledColor", je(w.primary.main, 0.55)), ee(w.Switch, "secondaryDisabledColor", je(w.secondary.main, 0.55)), ee(w.Switch, "errorDisabledColor", je(w.error.main, 0.55)), ee(w.Switch, "infoDisabledColor", je(w.info.main, 0.55)), ee(w.Switch, "successDisabledColor", je(w.success.main, 0.55)), ee(w.Switch, "warningDisabledColor", je(w.warning.main, 0.55)), ee(w.TableCell, "border", je(Sl(w.divider, 1), 0.68)), ee(w.Tooltip, "bg", Sl(w.grey[700], 0.92));
    }
    or(w.background, "default"), or(w.background, "paper"), or(w.common, "background"), or(w.common, "onBackground"), or(w, "divider"), Object.keys(w).forEach((N) => {
      const V = w[N];
      N !== "tonalOffset" && V && typeof V == "object" && (V.main && ee(w[N], "mainChannel", vs(ws(V.main))), V.light && ee(w[N], "lightChannel", vs(ws(V.light))), V.dark && ee(w[N], "darkChannel", vs(ws(V.dark))), V.contrastText && ee(w[N], "contrastTextChannel", vs(ws(V.contrastText))), N === "text" && (or(w[N], "primary"), or(w[N], "secondary")), N === "action" && (V.active && or(w[N], "active"), V.selected && or(w[N], "selected")));
    });
  }), P = t.reduce((L, w) => sn(L, w), P);
  const E = {
    prefix: l,
    disableCssColorScheme: s,
    shouldSkipGeneratingVar: u,
    getSelector: kC(P)
  }, {
    vars: M,
    generateThemeVars: A,
    generateStyleSheets: I
  } = Xk(P, E);
  return P.vars = M, Object.entries(P.colorSchemes[P.defaultColorScheme]).forEach(([L, w]) => {
    P[L] = w;
  }), P.generateThemeVars = A, P.generateStyleSheets = I, P.generateSpacing = function() {
    return t0(f.spacing, Ap(this));
  }, P.getColorSchemeSelector = Zk(d), P.spacing = P.generateSpacing(), P.shouldSkipGeneratingVar = u, P.unstable_sxConfig = {
    ...Js,
    ...f?.unstable_sxConfig
  }, P.unstable_sx = function(w) {
    return Ur({
      sx: w,
      theme: this
    });
  }, P.toRuntimeSource = C0, P;
}
function Vy(e, t, r) {
  e.colorSchemes && r && (e.colorSchemes[t] = {
    ...r !== !0 && r,
    palette: Wp({
      ...r === !0 ? {} : r.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function Xs(e = {}, ...t) {
  const {
    palette: r,
    cssVariables: o = !1,
    colorSchemes: s = r ? void 0 : {
      light: !0
    },
    defaultColorScheme: l = r?.mode,
    ...u
  } = e, d = l || "light", p = s?.[d], f = {
    ...s,
    ...r ? {
      [d]: {
        ...typeof p != "boolean" && p,
        palette: r
      }
    } : void 0
  };
  if (o === !1) {
    if (!("colorSchemes" in e))
      return Bf(e, ...t);
    let g = r;
    "palette" in e || f[d] && (f[d] !== !0 ? g = f[d].palette : d === "dark" && (g = {
      mode: "dark"
    }));
    const y = Bf({
      ...e,
      palette: g
    }, ...t);
    return y.defaultColorScheme = d, y.colorSchemes = f, y.palette.mode === "light" && (y.colorSchemes.light = {
      ...f.light !== !0 && f.light,
      palette: y.palette
    }, Vy(y, "dark", f.dark)), y.palette.mode === "dark" && (y.colorSchemes.dark = {
      ...f.dark !== !0 && f.dark,
      palette: y.palette
    }, Vy(y, "light", f.light)), y;
  }
  return !r && !("light" in f) && d === "light" && (f.light = !0), RC({
    ...u,
    colorSchemes: f,
    defaultColorScheme: d,
    ...typeof o != "boolean" && o
  }, ...t);
}
function TC(e) {
  return String(e).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function $C(e) {
  return parseFloat(e);
}
const Vp = Xs();
function Hp() {
  const e = Np(Vp);
  return e[Vn] || e;
}
function MC(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const wo = (e) => MC(e) && e !== "classes", Me = pk({
  themeId: Vn,
  defaultTheme: Vp,
  rootShouldForwardProp: wo
});
function cf({
  theme: e,
  ...t
}) {
  const r = Vn in e ? e[Vn] : void 0;
  return /* @__PURE__ */ B.jsx(S0, {
    ...t,
    themeId: r ? Vn : void 0,
    theme: r || e
  });
}
const _l = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
}, {
  CssVarsProvider: AC
} = Qk({
  themeId: Vn,
  // @ts-ignore ignore module augmentation tests
  theme: () => Xs({
    cssVariables: !0
  }),
  colorSchemeStorageKey: _l.colorSchemeStorageKey,
  modeStorageKey: _l.modeStorageKey,
  defaultColorScheme: {
    light: _l.defaultLightColorScheme,
    dark: _l.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: k0(e.palette, e.typography)
    };
    return t.unstable_sx = function(o) {
      return Ur({
        sx: o,
        theme: this
      });
    }, t;
  }
}), IC = AC;
function OC({
  theme: e,
  ...t
}) {
  if (typeof e == "function")
    return /* @__PURE__ */ B.jsx(cf, {
      theme: e,
      ...t
    });
  const r = Vn in e ? e[Vn] : e;
  return "colorSchemes" in r ? /* @__PURE__ */ B.jsx(IC, {
    theme: e,
    ...t
  }) : "vars" in r ? /* @__PURE__ */ B.jsx(cf, {
    theme: e,
    ...t
  }) : /* @__PURE__ */ B.jsx(cf, {
    theme: {
      ...e,
      vars: null
    },
    ...t
  });
}
function NC(e) {
  return /* @__PURE__ */ B.jsx(ok, {
    ...e,
    defaultTheme: Vp,
    themeId: Vn
  });
}
function R0(e) {
  return function(r) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ B.jsx(NC, {
        styles: typeof e == "function" ? (o) => e({
          theme: o,
          ...r
        }) : e
      })
    );
  };
}
function LC() {
  return r0;
}
const wn = jk;
function ht(e) {
  return zk(e);
}
function DC(e) {
  return pt("MuiSvgIcon", e);
}
Xe("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const FC = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: o
  } = e, s = {
    root: ["root", t !== "inherit" && `color${Pe(t)}`, `fontSize${Pe(r)}`]
  };
  return wt(s, DC, o);
}, zC = Me("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${Pe(r.color)}`], t[`fontSize${Pe(r.fontSize)}`]];
  }
})(wn(({
  theme: e
}) => ({
  userSelect: "none",
  width: "1em",
  height: "1em",
  display: "inline-block",
  flexShrink: 0,
  transition: e.transitions?.create?.("fill", {
    duration: (e.vars ?? e).transitions?.duration?.shorter
  }),
  variants: [
    {
      props: (t) => !t.hasSvgAsChild,
      style: {
        // the <svg> will define the property that has `currentColor`
        // for example heroicons uses fill="none" and stroke="currentColor"
        fill: "currentColor"
      }
    },
    {
      props: {
        fontSize: "inherit"
      },
      style: {
        fontSize: "inherit"
      }
    },
    {
      props: {
        fontSize: "small"
      },
      style: {
        fontSize: e.typography?.pxToRem?.(20) || "1.25rem"
      }
    },
    {
      props: {
        fontSize: "medium"
      },
      style: {
        fontSize: e.typography?.pxToRem?.(24) || "1.5rem"
      }
    },
    {
      props: {
        fontSize: "large"
      },
      style: {
        fontSize: e.typography?.pxToRem?.(35) || "2.1875rem"
      }
    },
    // TODO v5 deprecate color prop, v6 remove for sx
    ...Object.entries((e.vars ?? e).palette).filter(([, t]) => t && t.main).map(([t]) => ({
      props: {
        color: t
      },
      style: {
        color: (e.vars ?? e).palette?.[t]?.main
      }
    })),
    {
      props: {
        color: "action"
      },
      style: {
        color: (e.vars ?? e).palette?.action?.active
      }
    },
    {
      props: {
        color: "disabled"
      },
      style: {
        color: (e.vars ?? e).palette?.action?.disabled
      }
    },
    {
      props: {
        color: "inherit"
      },
      style: {
        color: void 0
      }
    }
  ]
}))), Wf = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: s,
    className: l,
    color: u = "inherit",
    component: d = "svg",
    fontSize: p = "medium",
    htmlColor: f,
    inheritViewBox: g = !1,
    titleAccess: y,
    viewBox: v = "0 0 24 24",
    ..._
  } = o, S = /* @__PURE__ */ k.isValidElement(s) && s.type === "svg", b = {
    ...o,
    color: u,
    component: d,
    fontSize: p,
    instanceFontSize: t.fontSize,
    inheritViewBox: g,
    viewBox: v,
    hasSvgAsChild: S
  }, C = {};
  g || (C.viewBox = v);
  const R = FC(b);
  return /* @__PURE__ */ B.jsxs(zC, {
    as: d,
    className: Re(R.root, l),
    focusable: "false",
    color: f,
    "aria-hidden": y ? void 0 : !0,
    role: y ? "img" : void 0,
    ref: r,
    ...C,
    ..._,
    ...S && s.props,
    ownerState: b,
    children: [S ? s.props.children : s, y ? /* @__PURE__ */ B.jsx("title", {
      children: y
    }) : null]
  });
});
Wf.muiName = "SvgIcon";
function Gr(e, t) {
  function r(o, s) {
    return /* @__PURE__ */ B.jsx(Wf, {
      "data-testid": `${t}Icon`,
      ref: s,
      ...o,
      children: e
    });
  }
  return r.muiName = Wf.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(r));
}
function T0(e, t) {
  if (!e)
    return t;
  if (typeof e == "function" || typeof t == "function")
    return (s) => {
      const l = typeof t == "function" ? t(s) : t, u = typeof e == "function" ? e({
        ...s,
        ...l
      }) : e, d = Re(s?.className, l?.className, u?.className);
      return {
        ...l,
        ...u,
        ...!!d && {
          className: d
        },
        ...l?.style && u?.style && {
          style: {
            ...l.style,
            ...u.style
          }
        },
        ...l?.sx && u?.sx && {
          sx: [...Array.isArray(l.sx) ? l.sx : [l.sx], ...Array.isArray(u.sx) ? u.sx : [u.sx]]
        }
      };
    };
  const r = t, o = Re(r?.className, e?.className);
  return {
    ...t,
    ...e,
    ...!!o && {
      className: o
    },
    ...r?.style && e?.style && {
      style: {
        ...r.style,
        ...e.style
      }
    },
    ...r?.sx && e?.sx && {
      sx: [...Array.isArray(r.sx) ? r.sx : [r.sx], ...Array.isArray(e.sx) ? e.sx : [e.sx]]
    }
  };
}
function $0(e, t) {
  if (e == null) return {};
  var r = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (t.indexOf(o) !== -1) continue;
    r[o] = e[o];
  }
  return r;
}
function Vf(e, t) {
  return Vf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Vf(e, t);
}
function M0(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Vf(e, t);
}
var df = { exports: {} }, Yt = {}, ff = { exports: {} }, pf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hy;
function jC() {
  return Hy || (Hy = 1, function(e) {
    function t(U, W) {
      var K = U.length;
      U.push(W);
      e: for (; 0 < K; ) {
        var D = K - 1 >>> 1, G = U[D];
        if (0 < s(G, W)) U[D] = W, U[K] = G, K = D;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function o(U) {
      if (U.length === 0) return null;
      var W = U[0], K = U.pop();
      if (K !== W) {
        U[0] = K;
        e: for (var D = 0, G = U.length, oe = G >>> 1; D < oe; ) {
          var te = 2 * (D + 1) - 1, se = U[te], le = te + 1, de = U[le];
          if (0 > s(se, K)) le < G && 0 > s(de, se) ? (U[D] = de, U[le] = K, D = le) : (U[D] = se, U[te] = K, D = te);
          else if (le < G && 0 > s(de, K)) U[D] = de, U[le] = K, D = le;
          else break e;
        }
      }
      return W;
    }
    function s(U, W) {
      var K = U.sortIndex - W.sortIndex;
      return K !== 0 ? K : U.id - W.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var l = performance;
      e.unstable_now = function() {
        return l.now();
      };
    } else {
      var u = Date, d = u.now();
      e.unstable_now = function() {
        return u.now() - d;
      };
    }
    var p = [], f = [], g = 1, y = null, v = 3, _ = !1, S = !1, b = !1, C = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function x(U) {
      for (var W = r(f); W !== null; ) {
        if (W.callback === null) o(f);
        else if (W.startTime <= U) o(f), W.sortIndex = W.expirationTime, t(p, W);
        else break;
        W = r(f);
      }
    }
    function P(U) {
      if (b = !1, x(U), !S) if (r(p) !== null) S = !0, H(E);
      else {
        var W = r(f);
        W !== null && Y(P, W.startTime - U);
      }
    }
    function E(U, W) {
      S = !1, b && (b = !1, R(I), I = -1), _ = !0;
      var K = v;
      try {
        for (x(W), y = r(p); y !== null && (!(y.expirationTime > W) || U && !T()); ) {
          var D = y.callback;
          if (typeof D == "function") {
            y.callback = null, v = y.priorityLevel;
            var G = D(y.expirationTime <= W);
            W = e.unstable_now(), typeof G == "function" ? y.callback = G : y === r(p) && o(p), x(W);
          } else o(p);
          y = r(p);
        }
        if (y !== null) var oe = !0;
        else {
          var te = r(f);
          te !== null && Y(P, te.startTime - W), oe = !1;
        }
        return oe;
      } finally {
        y = null, v = K, _ = !1;
      }
    }
    var M = !1, A = null, I = -1, L = 5, w = -1;
    function T() {
      return !(e.unstable_now() - w < L);
    }
    function N() {
      if (A !== null) {
        var U = e.unstable_now();
        w = U;
        var W = !0;
        try {
          W = A(!0, U);
        } finally {
          W ? V() : (M = !1, A = null);
        }
      } else M = !1;
    }
    var V;
    if (typeof O == "function") V = function() {
      O(N);
    };
    else if (typeof MessageChannel < "u") {
      var F = new MessageChannel(), j = F.port2;
      F.port1.onmessage = N, V = function() {
        j.postMessage(null);
      };
    } else V = function() {
      C(N, 0);
    };
    function H(U) {
      A = U, M || (M = !0, V());
    }
    function Y(U, W) {
      I = C(function() {
        U(e.unstable_now());
      }, W);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, e.unstable_continueExecution = function() {
      S || _ || (S = !0, H(E));
    }, e.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < U ? Math.floor(1e3 / U) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, e.unstable_getFirstCallbackNode = function() {
      return r(p);
    }, e.unstable_next = function(U) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = v;
      }
      var K = v;
      v = W;
      try {
        return U();
      } finally {
        v = K;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(U, W) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var K = v;
      v = U;
      try {
        return W();
      } finally {
        v = K;
      }
    }, e.unstable_scheduleCallback = function(U, W, K) {
      var D = e.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? D + K : D) : K = D, U) {
        case 1:
          var G = -1;
          break;
        case 2:
          G = 250;
          break;
        case 5:
          G = 1073741823;
          break;
        case 4:
          G = 1e4;
          break;
        default:
          G = 5e3;
      }
      return G = K + G, U = { id: g++, callback: W, priorityLevel: U, startTime: K, expirationTime: G, sortIndex: -1 }, K > D ? (U.sortIndex = K, t(f, U), r(p) === null && U === r(f) && (b ? (R(I), I = -1) : b = !0, Y(P, K - D))) : (U.sortIndex = G, t(p, U), S || _ || (S = !0, H(E))), U;
    }, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(U) {
      var W = v;
      return function() {
        var K = v;
        v = W;
        try {
          return U.apply(this, arguments);
        } finally {
          v = K;
        }
      };
    };
  }(pf)), pf;
}
var qy;
function BC() {
  return qy || (qy = 1, ff.exports = jC()), ff.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ky;
function UC() {
  if (Ky) return Yt;
  Ky = 1;
  var e = Au(), t = BC();
  function r(n) {
    for (var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, a = 1; a < arguments.length; a++) i += "&args[]=" + encodeURIComponent(arguments[a]);
    return "Minified React error #" + n + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var o = /* @__PURE__ */ new Set(), s = {};
  function l(n, i) {
    u(n, i), u(n + "Capture", i);
  }
  function u(n, i) {
    for (s[n] = i, n = 0; n < i.length; n++) o.add(i[n]);
  }
  var d = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), p = Object.prototype.hasOwnProperty, f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, y = {};
  function v(n) {
    return p.call(y, n) ? !0 : p.call(g, n) ? !1 : f.test(n) ? y[n] = !0 : (g[n] = !0, !1);
  }
  function _(n, i, a, c) {
    if (a !== null && a.type === 0) return !1;
    switch (typeof i) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return c ? !1 : a !== null ? !a.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function S(n, i, a, c) {
    if (i === null || typeof i > "u" || _(n, i, a, c)) return !0;
    if (c) return !1;
    if (a !== null) switch (a.type) {
      case 3:
        return !i;
      case 4:
        return i === !1;
      case 5:
        return isNaN(i);
      case 6:
        return isNaN(i) || 1 > i;
    }
    return !1;
  }
  function b(n, i, a, c, h, m, $) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = c, this.attributeNamespace = h, this.mustUseProperty = a, this.propertyName = n, this.type = i, this.sanitizeURL = m, this.removeEmptyString = $;
  }
  var C = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    C[n] = new b(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var i = n[0];
    C[i] = new b(i, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    C[n] = new b(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    C[n] = new b(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    C[n] = new b(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    C[n] = new b(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    C[n] = new b(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    C[n] = new b(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    C[n] = new b(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var R = /[\-:]([a-z])/g;
  function O(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var i = n.replace(
      R,
      O
    );
    C[i] = new b(i, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var i = n.replace(R, O);
    C[i] = new b(i, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var i = n.replace(R, O);
    C[i] = new b(i, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    C[n] = new b(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), C.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    C[n] = new b(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function x(n, i, a, c) {
    var h = C.hasOwnProperty(i) ? C[i] : null;
    (h !== null ? h.type !== 0 : c || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (S(i, a, h, c) && (a = null), c || h === null ? v(i) && (a === null ? n.removeAttribute(i) : n.setAttribute(i, "" + a)) : h.mustUseProperty ? n[h.propertyName] = a === null ? h.type === 3 ? !1 : "" : a : (i = h.attributeName, c = h.attributeNamespace, a === null ? n.removeAttribute(i) : (h = h.type, a = h === 3 || h === 4 && a === !0 ? "" : "" + a, c ? n.setAttributeNS(c, i, a) : n.setAttribute(i, a))));
  }
  var P = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, E = Symbol.for("react.element"), M = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), T = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), U = Symbol.iterator;
  function W(n) {
    return n === null || typeof n != "object" ? null : (n = U && n[U] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var K = Object.assign, D;
  function G(n) {
    if (D === void 0) try {
      throw Error();
    } catch (a) {
      var i = a.stack.trim().match(/\n( *(at )?)/);
      D = i && i[1] || "";
    }
    return `
` + D + n;
  }
  var oe = !1;
  function te(n, i) {
    if (!n || oe) return "";
    oe = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (i) if (i = function() {
        throw Error();
      }, Object.defineProperty(i.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(i, []);
        } catch (Z) {
          var c = Z;
        }
        Reflect.construct(n, [], i);
      } else {
        try {
          i.call();
        } catch (Z) {
          c = Z;
        }
        n.call(i.prototype);
      }
      else {
        try {
          throw Error();
        } catch (Z) {
          c = Z;
        }
        n();
      }
    } catch (Z) {
      if (Z && c && typeof Z.stack == "string") {
        for (var h = Z.stack.split(`
`), m = c.stack.split(`
`), $ = h.length - 1, z = m.length - 1; 1 <= $ && 0 <= z && h[$] !== m[z]; ) z--;
        for (; 1 <= $ && 0 <= z; $--, z--) if (h[$] !== m[z]) {
          if ($ !== 1 || z !== 1)
            do
              if ($--, z--, 0 > z || h[$] !== m[z]) {
                var q = `
` + h[$].replace(" at new ", " at ");
                return n.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", n.displayName)), q;
              }
            while (1 <= $ && 0 <= z);
          break;
        }
      }
    } finally {
      oe = !1, Error.prepareStackTrace = a;
    }
    return (n = n ? n.displayName || n.name : "") ? G(n) : "";
  }
  function se(n) {
    switch (n.tag) {
      case 5:
        return G(n.type);
      case 16:
        return G("Lazy");
      case 13:
        return G("Suspense");
      case 19:
        return G("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = te(n.type, !1), n;
      case 11:
        return n = te(n.type.render, !1), n;
      case 1:
        return n = te(n.type, !0), n;
      default:
        return "";
    }
  }
  function le(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case A:
        return "Fragment";
      case M:
        return "Portal";
      case L:
        return "Profiler";
      case I:
        return "StrictMode";
      case V:
        return "Suspense";
      case F:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case T:
        return (n.displayName || "Context") + ".Consumer";
      case w:
        return (n._context.displayName || "Context") + ".Provider";
      case N:
        var i = n.render;
        return n = n.displayName, n || (n = i.displayName || i.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case j:
        return i = n.displayName || null, i !== null ? i : le(n.type) || "Memo";
      case H:
        i = n._payload, n = n._init;
        try {
          return le(n(i));
        } catch {
        }
    }
    return null;
  }
  function de(n) {
    var i = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (i.displayName || "Context") + ".Consumer";
      case 10:
        return (i._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = i.render, n = n.displayName || n.name || "", i.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return i;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return le(i);
      case 8:
        return i === I ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof i == "function") return i.displayName || i.name || null;
        if (typeof i == "string") return i;
    }
    return null;
  }
  function he(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function fe(n) {
    var i = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function ue(n) {
    var i = fe(n) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(n.constructor.prototype, i), c = "" + n[i];
    if (!n.hasOwnProperty(i) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var h = a.get, m = a.set;
      return Object.defineProperty(n, i, { configurable: !0, get: function() {
        return h.call(this);
      }, set: function($) {
        c = "" + $, m.call(this, $);
      } }), Object.defineProperty(n, i, { enumerable: a.enumerable }), { getValue: function() {
        return c;
      }, setValue: function($) {
        c = "" + $;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[i];
      } };
    }
  }
  function we(n) {
    n._valueTracker || (n._valueTracker = ue(n));
  }
  function _e(n) {
    if (!n) return !1;
    var i = n._valueTracker;
    if (!i) return !0;
    var a = i.getValue(), c = "";
    return n && (c = fe(n) ? n.checked ? "true" : "false" : n.value), n = c, n !== a ? (i.setValue(n), !0) : !1;
  }
  function qe(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function ze(n, i) {
    var a = i.checked;
    return K({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: a ?? n._wrapperState.initialChecked });
  }
  function st(n, i) {
    var a = i.defaultValue == null ? "" : i.defaultValue, c = i.checked != null ? i.checked : i.defaultChecked;
    a = he(i.value != null ? i.value : a), n._wrapperState = { initialChecked: c, initialValue: a, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function ut(n, i) {
    i = i.checked, i != null && x(n, "checked", i, !1);
  }
  function Ze(n, i) {
    ut(n, i);
    var a = he(i.value), c = i.type;
    if (a != null) c === "number" ? (a === 0 && n.value === "" || n.value != a) && (n.value = "" + a) : n.value !== "" + a && (n.value = "" + a);
    else if (c === "submit" || c === "reset") {
      n.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? Rt(n, i.type, a) : i.hasOwnProperty("defaultValue") && Rt(n, i.type, he(i.defaultValue)), i.checked == null && i.defaultChecked != null && (n.defaultChecked = !!i.defaultChecked);
  }
  function De(n, i, a) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var c = i.type;
      if (!(c !== "submit" && c !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + n._wrapperState.initialValue, a || i === n.value || (n.value = i), n.defaultValue = i;
    }
    a = n.name, a !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, a !== "" && (n.name = a);
  }
  function Rt(n, i, a) {
    (i !== "number" || qe(n.ownerDocument) !== n) && (a == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + a && (n.defaultValue = "" + a));
  }
  var ct = Array.isArray;
  function We(n, i, a, c) {
    if (n = n.options, i) {
      i = {};
      for (var h = 0; h < a.length; h++) i["$" + a[h]] = !0;
      for (a = 0; a < n.length; a++) h = i.hasOwnProperty("$" + n[a].value), n[a].selected !== h && (n[a].selected = h), h && c && (n[a].defaultSelected = !0);
    } else {
      for (a = "" + he(a), i = null, h = 0; h < n.length; h++) {
        if (n[h].value === a) {
          n[h].selected = !0, c && (n[h].defaultSelected = !0);
          return;
        }
        i !== null || n[h].disabled || (i = n[h]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function xe(n, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(r(91));
    return K({}, i, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function _o(n, i) {
    var a = i.value;
    if (a == null) {
      if (a = i.children, i = i.defaultValue, a != null) {
        if (i != null) throw Error(r(92));
        if (ct(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        i = a;
      }
      i == null && (i = ""), a = i;
    }
    n._wrapperState = { initialValue: he(a) };
  }
  function Tt(n, i) {
    var a = he(i.value), c = he(i.defaultValue);
    a != null && (a = "" + a, a !== n.value && (n.value = a), i.defaultValue == null && n.defaultValue !== a && (n.defaultValue = a)), c != null && (n.defaultValue = "" + c);
  }
  function St(n) {
    var i = n.textContent;
    i === n._wrapperState.initialValue && i !== "" && i !== null && (n.value = i);
  }
  function $t(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Vt(n, i) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? $t(i) : n === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Mt, da = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, a, c, h) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(i, a, c, h);
      });
    } : n;
  }(function(n, i) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = i;
    else {
      for (Mt = Mt || document.createElement("div"), Mt.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = Mt.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; i.firstChild; ) n.appendChild(i.firstChild);
    }
  });
  function xo(n, i) {
    if (i) {
      var a = n.firstChild;
      if (a && a === n.lastChild && a.nodeType === 3) {
        a.nodeValue = i;
        return;
      }
    }
    n.textContent = i;
  }
  var ko = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, tb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ko).forEach(function(n) {
    tb.forEach(function(i) {
      i = i + n.charAt(0).toUpperCase() + n.substring(1), ko[i] = ko[n];
    });
  });
  function gh(n, i, a) {
    return i == null || typeof i == "boolean" || i === "" ? "" : a || typeof i != "number" || i === 0 || ko.hasOwnProperty(n) && ko[n] ? ("" + i).trim() : i + "px";
  }
  function mh(n, i) {
    n = n.style;
    for (var a in i) if (i.hasOwnProperty(a)) {
      var c = a.indexOf("--") === 0, h = gh(a, i[a], c);
      a === "float" && (a = "cssFloat"), c ? n.setProperty(a, h) : n[a] = h;
    }
  }
  var nb = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function lc(n, i) {
    if (i) {
      if (nb[n] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(r(137, n));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(r(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(r(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(r(62));
    }
  }
  function uc(n, i) {
    if (n.indexOf("-") === -1) return typeof i.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var cc = null;
  function dc(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var fc = null, Pi = null, Ri = null;
  function yh(n) {
    if (n = qo(n)) {
      if (typeof fc != "function") throw Error(r(280));
      var i = n.stateNode;
      i && (i = Oa(i), fc(n.stateNode, n.type, i));
    }
  }
  function vh(n) {
    Pi ? Ri ? Ri.push(n) : Ri = [n] : Pi = n;
  }
  function wh() {
    if (Pi) {
      var n = Pi, i = Ri;
      if (Ri = Pi = null, yh(n), i) for (n = 0; n < i.length; n++) yh(i[n]);
    }
  }
  function Sh(n, i) {
    return n(i);
  }
  function bh() {
  }
  var pc = !1;
  function _h(n, i, a) {
    if (pc) return n(i, a);
    pc = !0;
    try {
      return Sh(n, i, a);
    } finally {
      pc = !1, (Pi !== null || Ri !== null) && (bh(), wh());
    }
  }
  function Co(n, i) {
    var a = n.stateNode;
    if (a === null) return null;
    var c = Oa(a);
    if (c === null) return null;
    a = c[i];
    e: switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (n = n.type, c = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !c;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (a && typeof a != "function") throw Error(r(231, i, typeof a));
    return a;
  }
  var hc = !1;
  if (d) try {
    var Eo = {};
    Object.defineProperty(Eo, "passive", { get: function() {
      hc = !0;
    } }), window.addEventListener("test", Eo, Eo), window.removeEventListener("test", Eo, Eo);
  } catch {
    hc = !1;
  }
  function rb(n, i, a, c, h, m, $, z, q) {
    var Z = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(a, Z);
    } catch (re) {
      this.onError(re);
    }
  }
  var Po = !1, fa = null, pa = !1, gc = null, ib = { onError: function(n) {
    Po = !0, fa = n;
  } };
  function ob(n, i, a, c, h, m, $, z, q) {
    Po = !1, fa = null, rb.apply(ib, arguments);
  }
  function sb(n, i, a, c, h, m, $, z, q) {
    if (ob.apply(this, arguments), Po) {
      if (Po) {
        var Z = fa;
        Po = !1, fa = null;
      } else throw Error(r(198));
      pa || (pa = !0, gc = Z);
    }
  }
  function Xr(n) {
    var i = n, a = n;
    if (n.alternate) for (; i.return; ) i = i.return;
    else {
      n = i;
      do
        i = n, (i.flags & 4098) !== 0 && (a = i.return), n = i.return;
      while (n);
    }
    return i.tag === 3 ? a : null;
  }
  function xh(n) {
    if (n.tag === 13) {
      var i = n.memoizedState;
      if (i === null && (n = n.alternate, n !== null && (i = n.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function kh(n) {
    if (Xr(n) !== n) throw Error(r(188));
  }
  function ab(n) {
    var i = n.alternate;
    if (!i) {
      if (i = Xr(n), i === null) throw Error(r(188));
      return i !== n ? null : n;
    }
    for (var a = n, c = i; ; ) {
      var h = a.return;
      if (h === null) break;
      var m = h.alternate;
      if (m === null) {
        if (c = h.return, c !== null) {
          a = c;
          continue;
        }
        break;
      }
      if (h.child === m.child) {
        for (m = h.child; m; ) {
          if (m === a) return kh(h), n;
          if (m === c) return kh(h), i;
          m = m.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== c.return) a = h, c = m;
      else {
        for (var $ = !1, z = h.child; z; ) {
          if (z === a) {
            $ = !0, a = h, c = m;
            break;
          }
          if (z === c) {
            $ = !0, c = h, a = m;
            break;
          }
          z = z.sibling;
        }
        if (!$) {
          for (z = m.child; z; ) {
            if (z === a) {
              $ = !0, a = m, c = h;
              break;
            }
            if (z === c) {
              $ = !0, c = m, a = h;
              break;
            }
            z = z.sibling;
          }
          if (!$) throw Error(r(189));
        }
      }
      if (a.alternate !== c) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? n : i;
  }
  function Ch(n) {
    return n = ab(n), n !== null ? Eh(n) : null;
  }
  function Eh(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var i = Eh(n);
      if (i !== null) return i;
      n = n.sibling;
    }
    return null;
  }
  var Ph = t.unstable_scheduleCallback, Rh = t.unstable_cancelCallback, lb = t.unstable_shouldYield, ub = t.unstable_requestPaint, rt = t.unstable_now, cb = t.unstable_getCurrentPriorityLevel, mc = t.unstable_ImmediatePriority, Th = t.unstable_UserBlockingPriority, ha = t.unstable_NormalPriority, db = t.unstable_LowPriority, $h = t.unstable_IdlePriority, ga = null, On = null;
  function fb(n) {
    if (On && typeof On.onCommitFiberRoot == "function") try {
      On.onCommitFiberRoot(ga, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var _n = Math.clz32 ? Math.clz32 : gb, pb = Math.log, hb = Math.LN2;
  function gb(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (pb(n) / hb | 0) | 0;
  }
  var ma = 64, ya = 4194304;
  function Ro(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function va(n, i) {
    var a = n.pendingLanes;
    if (a === 0) return 0;
    var c = 0, h = n.suspendedLanes, m = n.pingedLanes, $ = a & 268435455;
    if ($ !== 0) {
      var z = $ & ~h;
      z !== 0 ? c = Ro(z) : (m &= $, m !== 0 && (c = Ro(m)));
    } else $ = a & ~h, $ !== 0 ? c = Ro($) : m !== 0 && (c = Ro(m));
    if (c === 0) return 0;
    if (i !== 0 && i !== c && (i & h) === 0 && (h = c & -c, m = i & -i, h >= m || h === 16 && (m & 4194240) !== 0)) return i;
    if ((c & 4) !== 0 && (c |= a & 16), i = n.entangledLanes, i !== 0) for (n = n.entanglements, i &= c; 0 < i; ) a = 31 - _n(i), h = 1 << a, c |= n[a], i &= ~h;
    return c;
  }
  function mb(n, i) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return i + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function yb(n, i) {
    for (var a = n.suspendedLanes, c = n.pingedLanes, h = n.expirationTimes, m = n.pendingLanes; 0 < m; ) {
      var $ = 31 - _n(m), z = 1 << $, q = h[$];
      q === -1 ? ((z & a) === 0 || (z & c) !== 0) && (h[$] = mb(z, i)) : q <= i && (n.expiredLanes |= z), m &= ~z;
    }
  }
  function yc(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Mh() {
    var n = ma;
    return ma <<= 1, (ma & 4194240) === 0 && (ma = 64), n;
  }
  function vc(n) {
    for (var i = [], a = 0; 31 > a; a++) i.push(n);
    return i;
  }
  function To(n, i, a) {
    n.pendingLanes |= i, i !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, i = 31 - _n(i), n[i] = a;
  }
  function vb(n, i) {
    var a = n.pendingLanes & ~i;
    n.pendingLanes = i, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= i, n.mutableReadLanes &= i, n.entangledLanes &= i, i = n.entanglements;
    var c = n.eventTimes;
    for (n = n.expirationTimes; 0 < a; ) {
      var h = 31 - _n(a), m = 1 << h;
      i[h] = 0, c[h] = -1, n[h] = -1, a &= ~m;
    }
  }
  function wc(n, i) {
    var a = n.entangledLanes |= i;
    for (n = n.entanglements; a; ) {
      var c = 31 - _n(a), h = 1 << c;
      h & i | n[c] & i && (n[c] |= i), a &= ~h;
    }
  }
  var Le = 0;
  function Ah(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Ih, Sc, Oh, Nh, Lh, bc = !1, wa = [], Sr = null, br = null, _r = null, $o = /* @__PURE__ */ new Map(), Mo = /* @__PURE__ */ new Map(), xr = [], wb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Dh(n, i) {
    switch (n) {
      case "focusin":
      case "focusout":
        Sr = null;
        break;
      case "dragenter":
      case "dragleave":
        br = null;
        break;
      case "mouseover":
      case "mouseout":
        _r = null;
        break;
      case "pointerover":
      case "pointerout":
        $o.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mo.delete(i.pointerId);
    }
  }
  function Ao(n, i, a, c, h, m) {
    return n === null || n.nativeEvent !== m ? (n = { blockedOn: i, domEventName: a, eventSystemFlags: c, nativeEvent: m, targetContainers: [h] }, i !== null && (i = qo(i), i !== null && Sc(i)), n) : (n.eventSystemFlags |= c, i = n.targetContainers, h !== null && i.indexOf(h) === -1 && i.push(h), n);
  }
  function Sb(n, i, a, c, h) {
    switch (i) {
      case "focusin":
        return Sr = Ao(Sr, n, i, a, c, h), !0;
      case "dragenter":
        return br = Ao(br, n, i, a, c, h), !0;
      case "mouseover":
        return _r = Ao(_r, n, i, a, c, h), !0;
      case "pointerover":
        var m = h.pointerId;
        return $o.set(m, Ao($o.get(m) || null, n, i, a, c, h)), !0;
      case "gotpointercapture":
        return m = h.pointerId, Mo.set(m, Ao(Mo.get(m) || null, n, i, a, c, h)), !0;
    }
    return !1;
  }
  function Fh(n) {
    var i = Zr(n.target);
    if (i !== null) {
      var a = Xr(i);
      if (a !== null) {
        if (i = a.tag, i === 13) {
          if (i = xh(a), i !== null) {
            n.blockedOn = i, Lh(n.priority, function() {
              Oh(a);
            });
            return;
          }
        } else if (i === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Sa(n) {
    if (n.blockedOn !== null) return !1;
    for (var i = n.targetContainers; 0 < i.length; ) {
      var a = xc(n.domEventName, n.eventSystemFlags, i[0], n.nativeEvent);
      if (a === null) {
        a = n.nativeEvent;
        var c = new a.constructor(a.type, a);
        cc = c, a.target.dispatchEvent(c), cc = null;
      } else return i = qo(a), i !== null && Sc(i), n.blockedOn = a, !1;
      i.shift();
    }
    return !0;
  }
  function zh(n, i, a) {
    Sa(n) && a.delete(i);
  }
  function bb() {
    bc = !1, Sr !== null && Sa(Sr) && (Sr = null), br !== null && Sa(br) && (br = null), _r !== null && Sa(_r) && (_r = null), $o.forEach(zh), Mo.forEach(zh);
  }
  function Io(n, i) {
    n.blockedOn === i && (n.blockedOn = null, bc || (bc = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, bb)));
  }
  function Oo(n) {
    function i(h) {
      return Io(h, n);
    }
    if (0 < wa.length) {
      Io(wa[0], n);
      for (var a = 1; a < wa.length; a++) {
        var c = wa[a];
        c.blockedOn === n && (c.blockedOn = null);
      }
    }
    for (Sr !== null && Io(Sr, n), br !== null && Io(br, n), _r !== null && Io(_r, n), $o.forEach(i), Mo.forEach(i), a = 0; a < xr.length; a++) c = xr[a], c.blockedOn === n && (c.blockedOn = null);
    for (; 0 < xr.length && (a = xr[0], a.blockedOn === null); ) Fh(a), a.blockedOn === null && xr.shift();
  }
  var Ti = P.ReactCurrentBatchConfig, ba = !0;
  function _b(n, i, a, c) {
    var h = Le, m = Ti.transition;
    Ti.transition = null;
    try {
      Le = 1, _c(n, i, a, c);
    } finally {
      Le = h, Ti.transition = m;
    }
  }
  function xb(n, i, a, c) {
    var h = Le, m = Ti.transition;
    Ti.transition = null;
    try {
      Le = 4, _c(n, i, a, c);
    } finally {
      Le = h, Ti.transition = m;
    }
  }
  function _c(n, i, a, c) {
    if (ba) {
      var h = xc(n, i, a, c);
      if (h === null) jc(n, i, c, _a, a), Dh(n, c);
      else if (Sb(h, n, i, a, c)) c.stopPropagation();
      else if (Dh(n, c), i & 4 && -1 < wb.indexOf(n)) {
        for (; h !== null; ) {
          var m = qo(h);
          if (m !== null && Ih(m), m = xc(n, i, a, c), m === null && jc(n, i, c, _a, a), m === h) break;
          h = m;
        }
        h !== null && c.stopPropagation();
      } else jc(n, i, c, null, a);
    }
  }
  var _a = null;
  function xc(n, i, a, c) {
    if (_a = null, n = dc(c), n = Zr(n), n !== null) if (i = Xr(n), i === null) n = null;
    else if (a = i.tag, a === 13) {
      if (n = xh(i), n !== null) return n;
      n = null;
    } else if (a === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      n = null;
    } else i !== n && (n = null);
    return _a = n, null;
  }
  function jh(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (cb()) {
          case mc:
            return 1;
          case Th:
            return 4;
          case ha:
          case db:
            return 16;
          case $h:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kr = null, kc = null, xa = null;
  function Bh() {
    if (xa) return xa;
    var n, i = kc, a = i.length, c, h = "value" in kr ? kr.value : kr.textContent, m = h.length;
    for (n = 0; n < a && i[n] === h[n]; n++) ;
    var $ = a - n;
    for (c = 1; c <= $ && i[a - c] === h[m - c]; c++) ;
    return xa = h.slice(n, 1 < c ? 1 - c : void 0);
  }
  function ka(n) {
    var i = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && i === 13 && (n = 13)) : n = i, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Ca() {
    return !0;
  }
  function Uh() {
    return !1;
  }
  function Xt(n) {
    function i(a, c, h, m, $) {
      this._reactName = a, this._targetInst = h, this.type = c, this.nativeEvent = m, this.target = $, this.currentTarget = null;
      for (var z in n) n.hasOwnProperty(z) && (a = n[z], this[z] = a ? a(m) : m[z]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Ca : Uh, this.isPropagationStopped = Uh, this;
    }
    return K(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ca);
    }, stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ca);
    }, persist: function() {
    }, isPersistent: Ca }), i;
  }
  var $i = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Cc = Xt($i), No = K({}, $i, { view: 0, detail: 0 }), kb = Xt(No), Ec, Pc, Lo, Ea = K({}, No, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Tc, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Lo && (Lo && n.type === "mousemove" ? (Ec = n.screenX - Lo.screenX, Pc = n.screenY - Lo.screenY) : Pc = Ec = 0, Lo = n), Ec);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Pc;
  } }), Wh = Xt(Ea), Cb = K({}, Ea, { dataTransfer: 0 }), Eb = Xt(Cb), Pb = K({}, No, { relatedTarget: 0 }), Rc = Xt(Pb), Rb = K({}, $i, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Tb = Xt(Rb), $b = K({}, $i, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Mb = Xt($b), Ab = K({}, $i, { data: 0 }), Vh = Xt(Ab), Ib = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ob = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Nb = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Lb(n) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(n) : (n = Nb[n]) ? !!i[n] : !1;
  }
  function Tc() {
    return Lb;
  }
  var Db = K({}, No, { key: function(n) {
    if (n.key) {
      var i = Ib[n.key] || n.key;
      if (i !== "Unidentified") return i;
    }
    return n.type === "keypress" ? (n = ka(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Ob[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Tc, charCode: function(n) {
    return n.type === "keypress" ? ka(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? ka(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Fb = Xt(Db), zb = K({}, Ea, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hh = Xt(zb), jb = K({}, No, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Tc }), Bb = Xt(jb), Ub = K({}, $i, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wb = Xt(Ub), Vb = K({}, Ea, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hb = Xt(Vb), qb = [9, 13, 27, 32], $c = d && "CompositionEvent" in window, Do = null;
  d && "documentMode" in document && (Do = document.documentMode);
  var Kb = d && "TextEvent" in window && !Do, qh = d && (!$c || Do && 8 < Do && 11 >= Do), Kh = " ", Qh = !1;
  function Gh(n, i) {
    switch (n) {
      case "keyup":
        return qb.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Yh(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Mi = !1;
  function Qb(n, i) {
    switch (n) {
      case "compositionend":
        return Yh(i);
      case "keypress":
        return i.which !== 32 ? null : (Qh = !0, Kh);
      case "textInput":
        return n = i.data, n === Kh && Qh ? null : n;
      default:
        return null;
    }
  }
  function Gb(n, i) {
    if (Mi) return n === "compositionend" || !$c && Gh(n, i) ? (n = Bh(), xa = kc = kr = null, Mi = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length) return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return qh && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var Yb = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Jh(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i === "input" ? !!Yb[n.type] : i === "textarea";
  }
  function Xh(n, i, a, c) {
    vh(c), i = Ma(i, "onChange"), 0 < i.length && (a = new Cc("onChange", "change", null, a, c), n.push({ event: a, listeners: i }));
  }
  var Fo = null, zo = null;
  function Jb(n) {
    mg(n, 0);
  }
  function Pa(n) {
    var i = Li(n);
    if (_e(i)) return n;
  }
  function Xb(n, i) {
    if (n === "change") return i;
  }
  var Zh = !1;
  if (d) {
    var Mc;
    if (d) {
      var Ac = "oninput" in document;
      if (!Ac) {
        var eg = document.createElement("div");
        eg.setAttribute("oninput", "return;"), Ac = typeof eg.oninput == "function";
      }
      Mc = Ac;
    } else Mc = !1;
    Zh = Mc && (!document.documentMode || 9 < document.documentMode);
  }
  function tg() {
    Fo && (Fo.detachEvent("onpropertychange", ng), zo = Fo = null);
  }
  function ng(n) {
    if (n.propertyName === "value" && Pa(zo)) {
      var i = [];
      Xh(i, zo, n, dc(n)), _h(Jb, i);
    }
  }
  function Zb(n, i, a) {
    n === "focusin" ? (tg(), Fo = i, zo = a, Fo.attachEvent("onpropertychange", ng)) : n === "focusout" && tg();
  }
  function e_(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Pa(zo);
  }
  function t_(n, i) {
    if (n === "click") return Pa(i);
  }
  function n_(n, i) {
    if (n === "input" || n === "change") return Pa(i);
  }
  function r_(n, i) {
    return n === i && (n !== 0 || 1 / n === 1 / i) || n !== n && i !== i;
  }
  var xn = typeof Object.is == "function" ? Object.is : r_;
  function jo(n, i) {
    if (xn(n, i)) return !0;
    if (typeof n != "object" || n === null || typeof i != "object" || i === null) return !1;
    var a = Object.keys(n), c = Object.keys(i);
    if (a.length !== c.length) return !1;
    for (c = 0; c < a.length; c++) {
      var h = a[c];
      if (!p.call(i, h) || !xn(n[h], i[h])) return !1;
    }
    return !0;
  }
  function rg(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function ig(n, i) {
    var a = rg(n);
    n = 0;
    for (var c; a; ) {
      if (a.nodeType === 3) {
        if (c = n + a.textContent.length, n <= i && c >= i) return { node: a, offset: i - n };
        n = c;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = rg(a);
    }
  }
  function og(n, i) {
    return n && i ? n === i ? !0 : n && n.nodeType === 3 ? !1 : i && i.nodeType === 3 ? og(n, i.parentNode) : "contains" in n ? n.contains(i) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function sg() {
    for (var n = window, i = qe(); i instanceof n.HTMLIFrameElement; ) {
      try {
        var a = typeof i.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) n = i.contentWindow;
      else break;
      i = qe(n.document);
    }
    return i;
  }
  function Ic(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i && (i === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || i === "textarea" || n.contentEditable === "true");
  }
  function i_(n) {
    var i = sg(), a = n.focusedElem, c = n.selectionRange;
    if (i !== a && a && a.ownerDocument && og(a.ownerDocument.documentElement, a)) {
      if (c !== null && Ic(a)) {
        if (i = c.start, n = c.end, n === void 0 && (n = i), "selectionStart" in a) a.selectionStart = i, a.selectionEnd = Math.min(n, a.value.length);
        else if (n = (i = a.ownerDocument || document) && i.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var h = a.textContent.length, m = Math.min(c.start, h);
          c = c.end === void 0 ? m : Math.min(c.end, h), !n.extend && m > c && (h = c, c = m, m = h), h = ig(a, m);
          var $ = ig(
            a,
            c
          );
          h && $ && (n.rangeCount !== 1 || n.anchorNode !== h.node || n.anchorOffset !== h.offset || n.focusNode !== $.node || n.focusOffset !== $.offset) && (i = i.createRange(), i.setStart(h.node, h.offset), n.removeAllRanges(), m > c ? (n.addRange(i), n.extend($.node, $.offset)) : (i.setEnd($.node, $.offset), n.addRange(i)));
        }
      }
      for (i = [], n = a; n = n.parentNode; ) n.nodeType === 1 && i.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof a.focus == "function" && a.focus(), a = 0; a < i.length; a++) n = i[a], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var o_ = d && "documentMode" in document && 11 >= document.documentMode, Ai = null, Oc = null, Bo = null, Nc = !1;
  function ag(n, i, a) {
    var c = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Nc || Ai == null || Ai !== qe(c) || (c = Ai, "selectionStart" in c && Ic(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }), Bo && jo(Bo, c) || (Bo = c, c = Ma(Oc, "onSelect"), 0 < c.length && (i = new Cc("onSelect", "select", null, i, a), n.push({ event: i, listeners: c }), i.target = Ai)));
  }
  function Ra(n, i) {
    var a = {};
    return a[n.toLowerCase()] = i.toLowerCase(), a["Webkit" + n] = "webkit" + i, a["Moz" + n] = "moz" + i, a;
  }
  var Ii = { animationend: Ra("Animation", "AnimationEnd"), animationiteration: Ra("Animation", "AnimationIteration"), animationstart: Ra("Animation", "AnimationStart"), transitionend: Ra("Transition", "TransitionEnd") }, Lc = {}, lg = {};
  d && (lg = document.createElement("div").style, "AnimationEvent" in window || (delete Ii.animationend.animation, delete Ii.animationiteration.animation, delete Ii.animationstart.animation), "TransitionEvent" in window || delete Ii.transitionend.transition);
  function Ta(n) {
    if (Lc[n]) return Lc[n];
    if (!Ii[n]) return n;
    var i = Ii[n], a;
    for (a in i) if (i.hasOwnProperty(a) && a in lg) return Lc[n] = i[a];
    return n;
  }
  var ug = Ta("animationend"), cg = Ta("animationiteration"), dg = Ta("animationstart"), fg = Ta("transitionend"), pg = /* @__PURE__ */ new Map(), hg = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Cr(n, i) {
    pg.set(n, i), l(i, [n]);
  }
  for (var Dc = 0; Dc < hg.length; Dc++) {
    var Fc = hg[Dc], s_ = Fc.toLowerCase(), a_ = Fc[0].toUpperCase() + Fc.slice(1);
    Cr(s_, "on" + a_);
  }
  Cr(ug, "onAnimationEnd"), Cr(cg, "onAnimationIteration"), Cr(dg, "onAnimationStart"), Cr("dblclick", "onDoubleClick"), Cr("focusin", "onFocus"), Cr("focusout", "onBlur"), Cr(fg, "onTransitionEnd"), u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Uo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), l_ = new Set("cancel close invalid load scroll toggle".split(" ").concat(Uo));
  function gg(n, i, a) {
    var c = n.type || "unknown-event";
    n.currentTarget = a, sb(c, i, void 0, n), n.currentTarget = null;
  }
  function mg(n, i) {
    i = (i & 4) !== 0;
    for (var a = 0; a < n.length; a++) {
      var c = n[a], h = c.event;
      c = c.listeners;
      e: {
        var m = void 0;
        if (i) for (var $ = c.length - 1; 0 <= $; $--) {
          var z = c[$], q = z.instance, Z = z.currentTarget;
          if (z = z.listener, q !== m && h.isPropagationStopped()) break e;
          gg(h, z, Z), m = q;
        }
        else for ($ = 0; $ < c.length; $++) {
          if (z = c[$], q = z.instance, Z = z.currentTarget, z = z.listener, q !== m && h.isPropagationStopped()) break e;
          gg(h, z, Z), m = q;
        }
      }
    }
    if (pa) throw n = gc, pa = !1, gc = null, n;
  }
  function Ve(n, i) {
    var a = i[qc];
    a === void 0 && (a = i[qc] = /* @__PURE__ */ new Set());
    var c = n + "__bubble";
    a.has(c) || (yg(i, n, 2, !1), a.add(c));
  }
  function zc(n, i, a) {
    var c = 0;
    i && (c |= 4), yg(a, n, c, i);
  }
  var $a = "_reactListening" + Math.random().toString(36).slice(2);
  function Wo(n) {
    if (!n[$a]) {
      n[$a] = !0, o.forEach(function(a) {
        a !== "selectionchange" && (l_.has(a) || zc(a, !1, n), zc(a, !0, n));
      });
      var i = n.nodeType === 9 ? n : n.ownerDocument;
      i === null || i[$a] || (i[$a] = !0, zc("selectionchange", !1, i));
    }
  }
  function yg(n, i, a, c) {
    switch (jh(i)) {
      case 1:
        var h = _b;
        break;
      case 4:
        h = xb;
        break;
      default:
        h = _c;
    }
    a = h.bind(null, i, a, n), h = void 0, !hc || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (h = !0), c ? h !== void 0 ? n.addEventListener(i, a, { capture: !0, passive: h }) : n.addEventListener(i, a, !0) : h !== void 0 ? n.addEventListener(i, a, { passive: h }) : n.addEventListener(i, a, !1);
  }
  function jc(n, i, a, c, h) {
    var m = c;
    if ((i & 1) === 0 && (i & 2) === 0 && c !== null) e: for (; ; ) {
      if (c === null) return;
      var $ = c.tag;
      if ($ === 3 || $ === 4) {
        var z = c.stateNode.containerInfo;
        if (z === h || z.nodeType === 8 && z.parentNode === h) break;
        if ($ === 4) for ($ = c.return; $ !== null; ) {
          var q = $.tag;
          if ((q === 3 || q === 4) && (q = $.stateNode.containerInfo, q === h || q.nodeType === 8 && q.parentNode === h)) return;
          $ = $.return;
        }
        for (; z !== null; ) {
          if ($ = Zr(z), $ === null) return;
          if (q = $.tag, q === 5 || q === 6) {
            c = m = $;
            continue e;
          }
          z = z.parentNode;
        }
      }
      c = c.return;
    }
    _h(function() {
      var Z = m, re = dc(a), ae = [];
      e: {
        var ne = pg.get(n);
        if (ne !== void 0) {
          var pe = Cc, me = n;
          switch (n) {
            case "keypress":
              if (ka(a) === 0) break e;
            case "keydown":
            case "keyup":
              pe = Fb;
              break;
            case "focusin":
              me = "focus", pe = Rc;
              break;
            case "focusout":
              me = "blur", pe = Rc;
              break;
            case "beforeblur":
            case "afterblur":
              pe = Rc;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              pe = Wh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pe = Eb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pe = Bb;
              break;
            case ug:
            case cg:
            case dg:
              pe = Tb;
              break;
            case fg:
              pe = Wb;
              break;
            case "scroll":
              pe = kb;
              break;
            case "wheel":
              pe = Hb;
              break;
            case "copy":
            case "cut":
            case "paste":
              pe = Mb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pe = Hh;
          }
          var ye = (i & 4) !== 0, it = !ye && n === "scroll", J = ye ? ne !== null ? ne + "Capture" : null : ne;
          ye = [];
          for (var Q = Z, X; Q !== null; ) {
            X = Q;
            var ce = X.stateNode;
            if (X.tag === 5 && ce !== null && (X = ce, J !== null && (ce = Co(Q, J), ce != null && ye.push(Vo(Q, ce, X)))), it) break;
            Q = Q.return;
          }
          0 < ye.length && (ne = new pe(ne, me, null, a, re), ae.push({ event: ne, listeners: ye }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (ne = n === "mouseover" || n === "pointerover", pe = n === "mouseout" || n === "pointerout", ne && a !== cc && (me = a.relatedTarget || a.fromElement) && (Zr(me) || me[Jn])) break e;
          if ((pe || ne) && (ne = re.window === re ? re : (ne = re.ownerDocument) ? ne.defaultView || ne.parentWindow : window, pe ? (me = a.relatedTarget || a.toElement, pe = Z, me = me ? Zr(me) : null, me !== null && (it = Xr(me), me !== it || me.tag !== 5 && me.tag !== 6) && (me = null)) : (pe = null, me = Z), pe !== me)) {
            if (ye = Wh, ce = "onMouseLeave", J = "onMouseEnter", Q = "mouse", (n === "pointerout" || n === "pointerover") && (ye = Hh, ce = "onPointerLeave", J = "onPointerEnter", Q = "pointer"), it = pe == null ? ne : Li(pe), X = me == null ? ne : Li(me), ne = new ye(ce, Q + "leave", pe, a, re), ne.target = it, ne.relatedTarget = X, ce = null, Zr(re) === Z && (ye = new ye(J, Q + "enter", me, a, re), ye.target = X, ye.relatedTarget = it, ce = ye), it = ce, pe && me) t: {
              for (ye = pe, J = me, Q = 0, X = ye; X; X = Oi(X)) Q++;
              for (X = 0, ce = J; ce; ce = Oi(ce)) X++;
              for (; 0 < Q - X; ) ye = Oi(ye), Q--;
              for (; 0 < X - Q; ) J = Oi(J), X--;
              for (; Q--; ) {
                if (ye === J || J !== null && ye === J.alternate) break t;
                ye = Oi(ye), J = Oi(J);
              }
              ye = null;
            }
            else ye = null;
            pe !== null && vg(ae, ne, pe, ye, !1), me !== null && it !== null && vg(ae, it, me, ye, !0);
          }
        }
        e: {
          if (ne = Z ? Li(Z) : window, pe = ne.nodeName && ne.nodeName.toLowerCase(), pe === "select" || pe === "input" && ne.type === "file") var ve = Xb;
          else if (Jh(ne)) if (Zh) ve = n_;
          else {
            ve = e_;
            var Se = Zb;
          }
          else (pe = ne.nodeName) && pe.toLowerCase() === "input" && (ne.type === "checkbox" || ne.type === "radio") && (ve = t_);
          if (ve && (ve = ve(n, Z))) {
            Xh(ae, ve, a, re);
            break e;
          }
          Se && Se(n, ne, Z), n === "focusout" && (Se = ne._wrapperState) && Se.controlled && ne.type === "number" && Rt(ne, "number", ne.value);
        }
        switch (Se = Z ? Li(Z) : window, n) {
          case "focusin":
            (Jh(Se) || Se.contentEditable === "true") && (Ai = Se, Oc = Z, Bo = null);
            break;
          case "focusout":
            Bo = Oc = Ai = null;
            break;
          case "mousedown":
            Nc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Nc = !1, ag(ae, a, re);
            break;
          case "selectionchange":
            if (o_) break;
          case "keydown":
          case "keyup":
            ag(ae, a, re);
        }
        var be;
        if ($c) e: {
          switch (n) {
            case "compositionstart":
              var ke = "onCompositionStart";
              break e;
            case "compositionend":
              ke = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ke = "onCompositionUpdate";
              break e;
          }
          ke = void 0;
        }
        else Mi ? Gh(n, a) && (ke = "onCompositionEnd") : n === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
        ke && (qh && a.locale !== "ko" && (Mi || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && Mi && (be = Bh()) : (kr = re, kc = "value" in kr ? kr.value : kr.textContent, Mi = !0)), Se = Ma(Z, ke), 0 < Se.length && (ke = new Vh(ke, n, null, a, re), ae.push({ event: ke, listeners: Se }), be ? ke.data = be : (be = Yh(a), be !== null && (ke.data = be)))), (be = Kb ? Qb(n, a) : Gb(n, a)) && (Z = Ma(Z, "onBeforeInput"), 0 < Z.length && (re = new Vh("onBeforeInput", "beforeinput", null, a, re), ae.push({ event: re, listeners: Z }), re.data = be));
      }
      mg(ae, i);
    });
  }
  function Vo(n, i, a) {
    return { instance: n, listener: i, currentTarget: a };
  }
  function Ma(n, i) {
    for (var a = i + "Capture", c = []; n !== null; ) {
      var h = n, m = h.stateNode;
      h.tag === 5 && m !== null && (h = m, m = Co(n, a), m != null && c.unshift(Vo(n, m, h)), m = Co(n, i), m != null && c.push(Vo(n, m, h))), n = n.return;
    }
    return c;
  }
  function Oi(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function vg(n, i, a, c, h) {
    for (var m = i._reactName, $ = []; a !== null && a !== c; ) {
      var z = a, q = z.alternate, Z = z.stateNode;
      if (q !== null && q === c) break;
      z.tag === 5 && Z !== null && (z = Z, h ? (q = Co(a, m), q != null && $.unshift(Vo(a, q, z))) : h || (q = Co(a, m), q != null && $.push(Vo(a, q, z)))), a = a.return;
    }
    $.length !== 0 && n.push({ event: i, listeners: $ });
  }
  var u_ = /\r\n?/g, c_ = /\u0000|\uFFFD/g;
  function wg(n) {
    return (typeof n == "string" ? n : "" + n).replace(u_, `
`).replace(c_, "");
  }
  function Aa(n, i, a) {
    if (i = wg(i), wg(n) !== i && a) throw Error(r(425));
  }
  function Ia() {
  }
  var Bc = null, Uc = null;
  function Wc(n, i) {
    return n === "textarea" || n === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Vc = typeof setTimeout == "function" ? setTimeout : void 0, d_ = typeof clearTimeout == "function" ? clearTimeout : void 0, Sg = typeof Promise == "function" ? Promise : void 0, f_ = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sg < "u" ? function(n) {
    return Sg.resolve(null).then(n).catch(p_);
  } : Vc;
  function p_(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Hc(n, i) {
    var a = i, c = 0;
    do {
      var h = a.nextSibling;
      if (n.removeChild(a), h && h.nodeType === 8) if (a = h.data, a === "/$") {
        if (c === 0) {
          n.removeChild(h), Oo(i);
          return;
        }
        c--;
      } else a !== "$" && a !== "$?" && a !== "$!" || c++;
      a = h;
    } while (a);
    Oo(i);
  }
  function Er(n) {
    for (; n != null; n = n.nextSibling) {
      var i = n.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = n.data, i === "$" || i === "$!" || i === "$?") break;
        if (i === "/$") return null;
      }
    }
    return n;
  }
  function bg(n) {
    n = n.previousSibling;
    for (var i = 0; n; ) {
      if (n.nodeType === 8) {
        var a = n.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (i === 0) return n;
          i--;
        } else a === "/$" && i++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Ni = Math.random().toString(36).slice(2), Nn = "__reactFiber$" + Ni, Ho = "__reactProps$" + Ni, Jn = "__reactContainer$" + Ni, qc = "__reactEvents$" + Ni, h_ = "__reactListeners$" + Ni, g_ = "__reactHandles$" + Ni;
  function Zr(n) {
    var i = n[Nn];
    if (i) return i;
    for (var a = n.parentNode; a; ) {
      if (i = a[Jn] || a[Nn]) {
        if (a = i.alternate, i.child !== null || a !== null && a.child !== null) for (n = bg(n); n !== null; ) {
          if (a = n[Nn]) return a;
          n = bg(n);
        }
        return i;
      }
      n = a, a = n.parentNode;
    }
    return null;
  }
  function qo(n) {
    return n = n[Nn] || n[Jn], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Li(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(r(33));
  }
  function Oa(n) {
    return n[Ho] || null;
  }
  var Kc = [], Di = -1;
  function Pr(n) {
    return { current: n };
  }
  function He(n) {
    0 > Di || (n.current = Kc[Di], Kc[Di] = null, Di--);
  }
  function Ue(n, i) {
    Di++, Kc[Di] = n.current, n.current = i;
  }
  var Rr = {}, At = Pr(Rr), Ht = Pr(!1), ei = Rr;
  function Fi(n, i) {
    var a = n.type.contextTypes;
    if (!a) return Rr;
    var c = n.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === i) return c.__reactInternalMemoizedMaskedChildContext;
    var h = {}, m;
    for (m in a) h[m] = i[m];
    return c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = i, n.__reactInternalMemoizedMaskedChildContext = h), h;
  }
  function qt(n) {
    return n = n.childContextTypes, n != null;
  }
  function Na() {
    He(Ht), He(At);
  }
  function _g(n, i, a) {
    if (At.current !== Rr) throw Error(r(168));
    Ue(At, i), Ue(Ht, a);
  }
  function xg(n, i, a) {
    var c = n.stateNode;
    if (i = i.childContextTypes, typeof c.getChildContext != "function") return a;
    c = c.getChildContext();
    for (var h in c) if (!(h in i)) throw Error(r(108, de(n) || "Unknown", h));
    return K({}, a, c);
  }
  function La(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Rr, ei = At.current, Ue(At, n), Ue(Ht, Ht.current), !0;
  }
  function kg(n, i, a) {
    var c = n.stateNode;
    if (!c) throw Error(r(169));
    a ? (n = xg(n, i, ei), c.__reactInternalMemoizedMergedChildContext = n, He(Ht), He(At), Ue(At, n)) : He(Ht), Ue(Ht, a);
  }
  var Xn = null, Da = !1, Qc = !1;
  function Cg(n) {
    Xn === null ? Xn = [n] : Xn.push(n);
  }
  function m_(n) {
    Da = !0, Cg(n);
  }
  function Tr() {
    if (!Qc && Xn !== null) {
      Qc = !0;
      var n = 0, i = Le;
      try {
        var a = Xn;
        for (Le = 1; n < a.length; n++) {
          var c = a[n];
          do
            c = c(!0);
          while (c !== null);
        }
        Xn = null, Da = !1;
      } catch (h) {
        throw Xn !== null && (Xn = Xn.slice(n + 1)), Ph(mc, Tr), h;
      } finally {
        Le = i, Qc = !1;
      }
    }
    return null;
  }
  var zi = [], ji = 0, Fa = null, za = 0, un = [], cn = 0, ti = null, Zn = 1, er = "";
  function ni(n, i) {
    zi[ji++] = za, zi[ji++] = Fa, Fa = n, za = i;
  }
  function Eg(n, i, a) {
    un[cn++] = Zn, un[cn++] = er, un[cn++] = ti, ti = n;
    var c = Zn;
    n = er;
    var h = 32 - _n(c) - 1;
    c &= ~(1 << h), a += 1;
    var m = 32 - _n(i) + h;
    if (30 < m) {
      var $ = h - h % 5;
      m = (c & (1 << $) - 1).toString(32), c >>= $, h -= $, Zn = 1 << 32 - _n(i) + h | a << h | c, er = m + n;
    } else Zn = 1 << m | a << h | c, er = n;
  }
  function Gc(n) {
    n.return !== null && (ni(n, 1), Eg(n, 1, 0));
  }
  function Yc(n) {
    for (; n === Fa; ) Fa = zi[--ji], zi[ji] = null, za = zi[--ji], zi[ji] = null;
    for (; n === ti; ) ti = un[--cn], un[cn] = null, er = un[--cn], un[cn] = null, Zn = un[--cn], un[cn] = null;
  }
  var Zt = null, en = null, Ke = !1, kn = null;
  function Pg(n, i) {
    var a = hn(5, null, null, 0);
    a.elementType = "DELETED", a.stateNode = i, a.return = n, i = n.deletions, i === null ? (n.deletions = [a], n.flags |= 16) : i.push(a);
  }
  function Rg(n, i) {
    switch (n.tag) {
      case 5:
        var a = n.type;
        return i = i.nodeType !== 1 || a.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (n.stateNode = i, Zt = n, en = Er(i.firstChild), !0) : !1;
      case 6:
        return i = n.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (n.stateNode = i, Zt = n, en = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (a = ti !== null ? { id: Zn, overflow: er } : null, n.memoizedState = { dehydrated: i, treeContext: a, retryLane: 1073741824 }, a = hn(18, null, null, 0), a.stateNode = i, a.return = n, n.child = a, Zt = n, en = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Jc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Xc(n) {
    if (Ke) {
      var i = en;
      if (i) {
        var a = i;
        if (!Rg(n, i)) {
          if (Jc(n)) throw Error(r(418));
          i = Er(a.nextSibling);
          var c = Zt;
          i && Rg(n, i) ? Pg(c, a) : (n.flags = n.flags & -4097 | 2, Ke = !1, Zt = n);
        }
      } else {
        if (Jc(n)) throw Error(r(418));
        n.flags = n.flags & -4097 | 2, Ke = !1, Zt = n;
      }
    }
  }
  function Tg(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Zt = n;
  }
  function ja(n) {
    if (n !== Zt) return !1;
    if (!Ke) return Tg(n), Ke = !0, !1;
    var i;
    if ((i = n.tag !== 3) && !(i = n.tag !== 5) && (i = n.type, i = i !== "head" && i !== "body" && !Wc(n.type, n.memoizedProps)), i && (i = en)) {
      if (Jc(n)) throw $g(), Error(r(418));
      for (; i; ) Pg(n, i), i = Er(i.nextSibling);
    }
    if (Tg(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
      e: {
        for (n = n.nextSibling, i = 0; n; ) {
          if (n.nodeType === 8) {
            var a = n.data;
            if (a === "/$") {
              if (i === 0) {
                en = Er(n.nextSibling);
                break e;
              }
              i--;
            } else a !== "$" && a !== "$!" && a !== "$?" || i++;
          }
          n = n.nextSibling;
        }
        en = null;
      }
    } else en = Zt ? Er(n.stateNode.nextSibling) : null;
    return !0;
  }
  function $g() {
    for (var n = en; n; ) n = Er(n.nextSibling);
  }
  function Bi() {
    en = Zt = null, Ke = !1;
  }
  function Zc(n) {
    kn === null ? kn = [n] : kn.push(n);
  }
  var y_ = P.ReactCurrentBatchConfig;
  function Ko(n, i, a) {
    if (n = a.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (a._owner) {
        if (a = a._owner, a) {
          if (a.tag !== 1) throw Error(r(309));
          var c = a.stateNode;
        }
        if (!c) throw Error(r(147, n));
        var h = c, m = "" + n;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === m ? i.ref : (i = function($) {
          var z = h.refs;
          $ === null ? delete z[m] : z[m] = $;
        }, i._stringRef = m, i);
      }
      if (typeof n != "string") throw Error(r(284));
      if (!a._owner) throw Error(r(290, n));
    }
    return n;
  }
  function Ba(n, i) {
    throw n = Object.prototype.toString.call(i), Error(r(31, n === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : n));
  }
  function Mg(n) {
    var i = n._init;
    return i(n._payload);
  }
  function Ag(n) {
    function i(J, Q) {
      if (n) {
        var X = J.deletions;
        X === null ? (J.deletions = [Q], J.flags |= 16) : X.push(Q);
      }
    }
    function a(J, Q) {
      if (!n) return null;
      for (; Q !== null; ) i(J, Q), Q = Q.sibling;
      return null;
    }
    function c(J, Q) {
      for (J = /* @__PURE__ */ new Map(); Q !== null; ) Q.key !== null ? J.set(Q.key, Q) : J.set(Q.index, Q), Q = Q.sibling;
      return J;
    }
    function h(J, Q) {
      return J = Dr(J, Q), J.index = 0, J.sibling = null, J;
    }
    function m(J, Q, X) {
      return J.index = X, n ? (X = J.alternate, X !== null ? (X = X.index, X < Q ? (J.flags |= 2, Q) : X) : (J.flags |= 2, Q)) : (J.flags |= 1048576, Q);
    }
    function $(J) {
      return n && J.alternate === null && (J.flags |= 2), J;
    }
    function z(J, Q, X, ce) {
      return Q === null || Q.tag !== 6 ? (Q = Vd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function q(J, Q, X, ce) {
      var ve = X.type;
      return ve === A ? re(J, Q, X.props.children, ce, X.key) : Q !== null && (Q.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === H && Mg(ve) === Q.type) ? (ce = h(Q, X.props), ce.ref = Ko(J, Q, X), ce.return = J, ce) : (ce = dl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Ko(J, Q, X), ce.return = J, ce);
    }
    function Z(J, Q, X, ce) {
      return Q === null || Q.tag !== 4 || Q.stateNode.containerInfo !== X.containerInfo || Q.stateNode.implementation !== X.implementation ? (Q = Hd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X.children || []), Q.return = J, Q);
    }
    function re(J, Q, X, ce, ve) {
      return Q === null || Q.tag !== 7 ? (Q = ci(X, J.mode, ce, ve), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function ae(J, Q, X) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return Q = Vd("" + Q, J.mode, X), Q.return = J, Q;
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case E:
            return X = dl(Q.type, Q.key, Q.props, null, J.mode, X), X.ref = Ko(J, null, Q), X.return = J, X;
          case M:
            return Q = Hd(Q, J.mode, X), Q.return = J, Q;
          case H:
            var ce = Q._init;
            return ae(J, ce(Q._payload), X);
        }
        if (ct(Q) || W(Q)) return Q = ci(Q, J.mode, X, null), Q.return = J, Q;
        Ba(J, Q);
      }
      return null;
    }
    function ne(J, Q, X, ce) {
      var ve = Q !== null ? Q.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return ve !== null ? null : z(J, Q, "" + X, ce);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case E:
            return X.key === ve ? q(J, Q, X, ce) : null;
          case M:
            return X.key === ve ? Z(J, Q, X, ce) : null;
          case H:
            return ve = X._init, ne(
              J,
              Q,
              ve(X._payload),
              ce
            );
        }
        if (ct(X) || W(X)) return ve !== null ? null : re(J, Q, X, ce, null);
        Ba(J, X);
      }
      return null;
    }
    function pe(J, Q, X, ce, ve) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number") return J = J.get(X) || null, z(Q, J, "" + ce, ve);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case E:
            return J = J.get(ce.key === null ? X : ce.key) || null, q(Q, J, ce, ve);
          case M:
            return J = J.get(ce.key === null ? X : ce.key) || null, Z(Q, J, ce, ve);
          case H:
            var Se = ce._init;
            return pe(J, Q, X, Se(ce._payload), ve);
        }
        if (ct(ce) || W(ce)) return J = J.get(X) || null, re(Q, J, ce, ve, null);
        Ba(Q, ce);
      }
      return null;
    }
    function me(J, Q, X, ce) {
      for (var ve = null, Se = null, be = Q, ke = Q = 0, yt = null; be !== null && ke < X.length; ke++) {
        be.index > ke ? (yt = be, be = null) : yt = be.sibling;
        var $e = ne(J, be, X[ke], ce);
        if ($e === null) {
          be === null && (be = yt);
          break;
        }
        n && be && $e.alternate === null && i(J, be), Q = m($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e, be = yt;
      }
      if (ke === X.length) return a(J, be), Ke && ni(J, ke), ve;
      if (be === null) {
        for (; ke < X.length; ke++) be = ae(J, X[ke], ce), be !== null && (Q = m(be, Q, ke), Se === null ? ve = be : Se.sibling = be, Se = be);
        return Ke && ni(J, ke), ve;
      }
      for (be = c(J, be); ke < X.length; ke++) yt = pe(be, J, ke, X[ke], ce), yt !== null && (n && yt.alternate !== null && be.delete(yt.key === null ? ke : yt.key), Q = m(yt, Q, ke), Se === null ? ve = yt : Se.sibling = yt, Se = yt);
      return n && be.forEach(function(Fr) {
        return i(J, Fr);
      }), Ke && ni(J, ke), ve;
    }
    function ye(J, Q, X, ce) {
      var ve = W(X);
      if (typeof ve != "function") throw Error(r(150));
      if (X = ve.call(X), X == null) throw Error(r(151));
      for (var Se = ve = null, be = Q, ke = Q = 0, yt = null, $e = X.next(); be !== null && !$e.done; ke++, $e = X.next()) {
        be.index > ke ? (yt = be, be = null) : yt = be.sibling;
        var Fr = ne(J, be, $e.value, ce);
        if (Fr === null) {
          be === null && (be = yt);
          break;
        }
        n && be && Fr.alternate === null && i(J, be), Q = m(Fr, Q, ke), Se === null ? ve = Fr : Se.sibling = Fr, Se = Fr, be = yt;
      }
      if ($e.done) return a(
        J,
        be
      ), Ke && ni(J, ke), ve;
      if (be === null) {
        for (; !$e.done; ke++, $e = X.next()) $e = ae(J, $e.value, ce), $e !== null && (Q = m($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
        return Ke && ni(J, ke), ve;
      }
      for (be = c(J, be); !$e.done; ke++, $e = X.next()) $e = pe(be, J, ke, $e.value, ce), $e !== null && (n && $e.alternate !== null && be.delete($e.key === null ? ke : $e.key), Q = m($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
      return n && be.forEach(function(Y_) {
        return i(J, Y_);
      }), Ke && ni(J, ke), ve;
    }
    function it(J, Q, X, ce) {
      if (typeof X == "object" && X !== null && X.type === A && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case E:
            e: {
              for (var ve = X.key, Se = Q; Se !== null; ) {
                if (Se.key === ve) {
                  if (ve = X.type, ve === A) {
                    if (Se.tag === 7) {
                      a(J, Se.sibling), Q = h(Se, X.props.children), Q.return = J, J = Q;
                      break e;
                    }
                  } else if (Se.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === H && Mg(ve) === Se.type) {
                    a(J, Se.sibling), Q = h(Se, X.props), Q.ref = Ko(J, Se, X), Q.return = J, J = Q;
                    break e;
                  }
                  a(J, Se);
                  break;
                } else i(J, Se);
                Se = Se.sibling;
              }
              X.type === A ? (Q = ci(X.props.children, J.mode, ce, X.key), Q.return = J, J = Q) : (ce = dl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Ko(J, Q, X), ce.return = J, J = ce);
            }
            return $(J);
          case M:
            e: {
              for (Se = X.key; Q !== null; ) {
                if (Q.key === Se) if (Q.tag === 4 && Q.stateNode.containerInfo === X.containerInfo && Q.stateNode.implementation === X.implementation) {
                  a(J, Q.sibling), Q = h(Q, X.children || []), Q.return = J, J = Q;
                  break e;
                } else {
                  a(J, Q);
                  break;
                }
                else i(J, Q);
                Q = Q.sibling;
              }
              Q = Hd(X, J.mode, ce), Q.return = J, J = Q;
            }
            return $(J);
          case H:
            return Se = X._init, it(J, Q, Se(X._payload), ce);
        }
        if (ct(X)) return me(J, Q, X, ce);
        if (W(X)) return ye(J, Q, X, ce);
        Ba(J, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, Q !== null && Q.tag === 6 ? (a(J, Q.sibling), Q = h(Q, X), Q.return = J, J = Q) : (a(J, Q), Q = Vd(X, J.mode, ce), Q.return = J, J = Q), $(J)) : a(J, Q);
    }
    return it;
  }
  var Ui = Ag(!0), Ig = Ag(!1), Ua = Pr(null), Wa = null, Wi = null, ed = null;
  function td() {
    ed = Wi = Wa = null;
  }
  function nd(n) {
    var i = Ua.current;
    He(Ua), n._currentValue = i;
  }
  function rd(n, i, a) {
    for (; n !== null; ) {
      var c = n.alternate;
      if ((n.childLanes & i) !== i ? (n.childLanes |= i, c !== null && (c.childLanes |= i)) : c !== null && (c.childLanes & i) !== i && (c.childLanes |= i), n === a) break;
      n = n.return;
    }
  }
  function Vi(n, i) {
    Wa = n, ed = Wi = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & i) !== 0 && (Kt = !0), n.firstContext = null);
  }
  function dn(n) {
    var i = n._currentValue;
    if (ed !== n) if (n = { context: n, memoizedValue: i, next: null }, Wi === null) {
      if (Wa === null) throw Error(r(308));
      Wi = n, Wa.dependencies = { lanes: 0, firstContext: n };
    } else Wi = Wi.next = n;
    return i;
  }
  var ri = null;
  function id(n) {
    ri === null ? ri = [n] : ri.push(n);
  }
  function Og(n, i, a, c) {
    var h = i.interleaved;
    return h === null ? (a.next = a, id(i)) : (a.next = h.next, h.next = a), i.interleaved = a, tr(n, c);
  }
  function tr(n, i) {
    n.lanes |= i;
    var a = n.alternate;
    for (a !== null && (a.lanes |= i), a = n, n = n.return; n !== null; ) n.childLanes |= i, a = n.alternate, a !== null && (a.childLanes |= i), a = n, n = n.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var $r = !1;
  function od(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Ng(n, i) {
    n = n.updateQueue, i.updateQueue === n && (i.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function nr(n, i) {
    return { eventTime: n, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function Mr(n, i, a) {
    var c = n.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (Te & 2) !== 0) {
      var h = c.pending;
      return h === null ? i.next = i : (i.next = h.next, h.next = i), c.pending = i, tr(n, a);
    }
    return h = c.interleaved, h === null ? (i.next = i, id(c)) : (i.next = h.next, h.next = i), c.interleaved = i, tr(n, a);
  }
  function Va(n, i, a) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (a & 4194240) !== 0)) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, wc(n, a);
    }
  }
  function Lg(n, i) {
    var a = n.updateQueue, c = n.alternate;
    if (c !== null && (c = c.updateQueue, a === c)) {
      var h = null, m = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var $ = { eventTime: a.eventTime, lane: a.lane, tag: a.tag, payload: a.payload, callback: a.callback, next: null };
          m === null ? h = m = $ : m = m.next = $, a = a.next;
        } while (a !== null);
        m === null ? h = m = i : m = m.next = i;
      } else h = m = i;
      a = { baseState: c.baseState, firstBaseUpdate: h, lastBaseUpdate: m, shared: c.shared, effects: c.effects }, n.updateQueue = a;
      return;
    }
    n = a.lastBaseUpdate, n === null ? a.firstBaseUpdate = i : n.next = i, a.lastBaseUpdate = i;
  }
  function Ha(n, i, a, c) {
    var h = n.updateQueue;
    $r = !1;
    var m = h.firstBaseUpdate, $ = h.lastBaseUpdate, z = h.shared.pending;
    if (z !== null) {
      h.shared.pending = null;
      var q = z, Z = q.next;
      q.next = null, $ === null ? m = Z : $.next = Z, $ = q;
      var re = n.alternate;
      re !== null && (re = re.updateQueue, z = re.lastBaseUpdate, z !== $ && (z === null ? re.firstBaseUpdate = Z : z.next = Z, re.lastBaseUpdate = q));
    }
    if (m !== null) {
      var ae = h.baseState;
      $ = 0, re = Z = q = null, z = m;
      do {
        var ne = z.lane, pe = z.eventTime;
        if ((c & ne) === ne) {
          re !== null && (re = re.next = {
            eventTime: pe,
            lane: 0,
            tag: z.tag,
            payload: z.payload,
            callback: z.callback,
            next: null
          });
          e: {
            var me = n, ye = z;
            switch (ne = i, pe = a, ye.tag) {
              case 1:
                if (me = ye.payload, typeof me == "function") {
                  ae = me.call(pe, ae, ne);
                  break e;
                }
                ae = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = ye.payload, ne = typeof me == "function" ? me.call(pe, ae, ne) : me, ne == null) break e;
                ae = K({}, ae, ne);
                break e;
              case 2:
                $r = !0;
            }
          }
          z.callback !== null && z.lane !== 0 && (n.flags |= 64, ne = h.effects, ne === null ? h.effects = [z] : ne.push(z));
        } else pe = { eventTime: pe, lane: ne, tag: z.tag, payload: z.payload, callback: z.callback, next: null }, re === null ? (Z = re = pe, q = ae) : re = re.next = pe, $ |= ne;
        if (z = z.next, z === null) {
          if (z = h.shared.pending, z === null) break;
          ne = z, z = ne.next, ne.next = null, h.lastBaseUpdate = ne, h.shared.pending = null;
        }
      } while (!0);
      if (re === null && (q = ae), h.baseState = q, h.firstBaseUpdate = Z, h.lastBaseUpdate = re, i = h.shared.interleaved, i !== null) {
        h = i;
        do
          $ |= h.lane, h = h.next;
        while (h !== i);
      } else m === null && (h.shared.lanes = 0);
      si |= $, n.lanes = $, n.memoizedState = ae;
    }
  }
  function Dg(n, i, a) {
    if (n = i.effects, i.effects = null, n !== null) for (i = 0; i < n.length; i++) {
      var c = n[i], h = c.callback;
      if (h !== null) {
        if (c.callback = null, c = a, typeof h != "function") throw Error(r(191, h));
        h.call(c);
      }
    }
  }
  var Qo = {}, Ln = Pr(Qo), Go = Pr(Qo), Yo = Pr(Qo);
  function ii(n) {
    if (n === Qo) throw Error(r(174));
    return n;
  }
  function sd(n, i) {
    switch (Ue(Yo, i), Ue(Go, n), Ue(Ln, Qo), n = i.nodeType, n) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Vt(null, "");
        break;
      default:
        n = n === 8 ? i.parentNode : i, i = n.namespaceURI || null, n = n.tagName, i = Vt(i, n);
    }
    He(Ln), Ue(Ln, i);
  }
  function Hi() {
    He(Ln), He(Go), He(Yo);
  }
  function Fg(n) {
    ii(Yo.current);
    var i = ii(Ln.current), a = Vt(i, n.type);
    i !== a && (Ue(Go, n), Ue(Ln, a));
  }
  function ad(n) {
    Go.current === n && (He(Ln), He(Go));
  }
  var Ge = Pr(0);
  function qa(n) {
    for (var i = n; i !== null; ) {
      if (i.tag === 13) {
        var a = i.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || a.data === "$!")) return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === n) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === n) return null;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
    return null;
  }
  var ld = [];
  function ud() {
    for (var n = 0; n < ld.length; n++) ld[n]._workInProgressVersionPrimary = null;
    ld.length = 0;
  }
  var Ka = P.ReactCurrentDispatcher, cd = P.ReactCurrentBatchConfig, oi = 0, Ye = null, dt = null, gt = null, Qa = !1, Jo = !1, Xo = 0, v_ = 0;
  function It() {
    throw Error(r(321));
  }
  function dd(n, i) {
    if (i === null) return !1;
    for (var a = 0; a < i.length && a < n.length; a++) if (!xn(n[a], i[a])) return !1;
    return !0;
  }
  function fd(n, i, a, c, h, m) {
    if (oi = m, Ye = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, Ka.current = n === null || n.memoizedState === null ? __ : x_, n = a(c, h), Jo) {
      m = 0;
      do {
        if (Jo = !1, Xo = 0, 25 <= m) throw Error(r(301));
        m += 1, gt = dt = null, i.updateQueue = null, Ka.current = k_, n = a(c, h);
      } while (Jo);
    }
    if (Ka.current = Ja, i = dt !== null && dt.next !== null, oi = 0, gt = dt = Ye = null, Qa = !1, i) throw Error(r(300));
    return n;
  }
  function pd() {
    var n = Xo !== 0;
    return Xo = 0, n;
  }
  function Dn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return gt === null ? Ye.memoizedState = gt = n : gt = gt.next = n, gt;
  }
  function fn() {
    if (dt === null) {
      var n = Ye.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = dt.next;
    var i = gt === null ? Ye.memoizedState : gt.next;
    if (i !== null) gt = i, dt = n;
    else {
      if (n === null) throw Error(r(310));
      dt = n, n = { memoizedState: dt.memoizedState, baseState: dt.baseState, baseQueue: dt.baseQueue, queue: dt.queue, next: null }, gt === null ? Ye.memoizedState = gt = n : gt = gt.next = n;
    }
    return gt;
  }
  function Zo(n, i) {
    return typeof i == "function" ? i(n) : i;
  }
  function hd(n) {
    var i = fn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = dt, h = c.baseQueue, m = a.pending;
    if (m !== null) {
      if (h !== null) {
        var $ = h.next;
        h.next = m.next, m.next = $;
      }
      c.baseQueue = h = m, a.pending = null;
    }
    if (h !== null) {
      m = h.next, c = c.baseState;
      var z = $ = null, q = null, Z = m;
      do {
        var re = Z.lane;
        if ((oi & re) === re) q !== null && (q = q.next = { lane: 0, action: Z.action, hasEagerState: Z.hasEagerState, eagerState: Z.eagerState, next: null }), c = Z.hasEagerState ? Z.eagerState : n(c, Z.action);
        else {
          var ae = {
            lane: re,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          };
          q === null ? (z = q = ae, $ = c) : q = q.next = ae, Ye.lanes |= re, si |= re;
        }
        Z = Z.next;
      } while (Z !== null && Z !== m);
      q === null ? $ = c : q.next = z, xn(c, i.memoizedState) || (Kt = !0), i.memoizedState = c, i.baseState = $, i.baseQueue = q, a.lastRenderedState = c;
    }
    if (n = a.interleaved, n !== null) {
      h = n;
      do
        m = h.lane, Ye.lanes |= m, si |= m, h = h.next;
      while (h !== n);
    } else h === null && (a.lanes = 0);
    return [i.memoizedState, a.dispatch];
  }
  function gd(n) {
    var i = fn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = a.dispatch, h = a.pending, m = i.memoizedState;
    if (h !== null) {
      a.pending = null;
      var $ = h = h.next;
      do
        m = n(m, $.action), $ = $.next;
      while ($ !== h);
      xn(m, i.memoizedState) || (Kt = !0), i.memoizedState = m, i.baseQueue === null && (i.baseState = m), a.lastRenderedState = m;
    }
    return [m, c];
  }
  function zg() {
  }
  function jg(n, i) {
    var a = Ye, c = fn(), h = i(), m = !xn(c.memoizedState, h);
    if (m && (c.memoizedState = h, Kt = !0), c = c.queue, md(Wg.bind(null, a, c, n), [n]), c.getSnapshot !== i || m || gt !== null && gt.memoizedState.tag & 1) {
      if (a.flags |= 2048, es(9, Ug.bind(null, a, c, h, i), void 0, null), mt === null) throw Error(r(349));
      (oi & 30) !== 0 || Bg(a, i, h);
    }
    return h;
  }
  function Bg(n, i, a) {
    n.flags |= 16384, n = { getSnapshot: i, value: a }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.stores = [n]) : (a = i.stores, a === null ? i.stores = [n] : a.push(n));
  }
  function Ug(n, i, a, c) {
    i.value = a, i.getSnapshot = c, Vg(i) && Hg(n);
  }
  function Wg(n, i, a) {
    return a(function() {
      Vg(i) && Hg(n);
    });
  }
  function Vg(n) {
    var i = n.getSnapshot;
    n = n.value;
    try {
      var a = i();
      return !xn(n, a);
    } catch {
      return !0;
    }
  }
  function Hg(n) {
    var i = tr(n, 1);
    i !== null && Rn(i, n, 1, -1);
  }
  function qg(n) {
    var i = Dn();
    return typeof n == "function" && (n = n()), i.memoizedState = i.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zo, lastRenderedState: n }, i.queue = n, n = n.dispatch = b_.bind(null, Ye, n), [i.memoizedState, n];
  }
  function es(n, i, a, c) {
    return n = { tag: n, create: i, destroy: a, deps: c, next: null }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.lastEffect = n.next = n) : (a = i.lastEffect, a === null ? i.lastEffect = n.next = n : (c = a.next, a.next = n, n.next = c, i.lastEffect = n)), n;
  }
  function Kg() {
    return fn().memoizedState;
  }
  function Ga(n, i, a, c) {
    var h = Dn();
    Ye.flags |= n, h.memoizedState = es(1 | i, a, void 0, c === void 0 ? null : c);
  }
  function Ya(n, i, a, c) {
    var h = fn();
    c = c === void 0 ? null : c;
    var m = void 0;
    if (dt !== null) {
      var $ = dt.memoizedState;
      if (m = $.destroy, c !== null && dd(c, $.deps)) {
        h.memoizedState = es(i, a, m, c);
        return;
      }
    }
    Ye.flags |= n, h.memoizedState = es(1 | i, a, m, c);
  }
  function Qg(n, i) {
    return Ga(8390656, 8, n, i);
  }
  function md(n, i) {
    return Ya(2048, 8, n, i);
  }
  function Gg(n, i) {
    return Ya(4, 2, n, i);
  }
  function Yg(n, i) {
    return Ya(4, 4, n, i);
  }
  function Jg(n, i) {
    if (typeof i == "function") return n = n(), i(n), function() {
      i(null);
    };
    if (i != null) return n = n(), i.current = n, function() {
      i.current = null;
    };
  }
  function Xg(n, i, a) {
    return a = a != null ? a.concat([n]) : null, Ya(4, 4, Jg.bind(null, i, n), a);
  }
  function yd() {
  }
  function Zg(n, i) {
    var a = fn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && dd(i, c[1]) ? c[0] : (a.memoizedState = [n, i], n);
  }
  function em(n, i) {
    var a = fn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && dd(i, c[1]) ? c[0] : (n = n(), a.memoizedState = [n, i], n);
  }
  function tm(n, i, a) {
    return (oi & 21) === 0 ? (n.baseState && (n.baseState = !1, Kt = !0), n.memoizedState = a) : (xn(a, i) || (a = Mh(), Ye.lanes |= a, si |= a, n.baseState = !0), i);
  }
  function w_(n, i) {
    var a = Le;
    Le = a !== 0 && 4 > a ? a : 4, n(!0);
    var c = cd.transition;
    cd.transition = {};
    try {
      n(!1), i();
    } finally {
      Le = a, cd.transition = c;
    }
  }
  function nm() {
    return fn().memoizedState;
  }
  function S_(n, i, a) {
    var c = Nr(n);
    if (a = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null }, rm(n)) im(i, a);
    else if (a = Og(n, i, a, c), a !== null) {
      var h = jt();
      Rn(a, n, c, h), om(a, i, c);
    }
  }
  function b_(n, i, a) {
    var c = Nr(n), h = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null };
    if (rm(n)) im(i, h);
    else {
      var m = n.alternate;
      if (n.lanes === 0 && (m === null || m.lanes === 0) && (m = i.lastRenderedReducer, m !== null)) try {
        var $ = i.lastRenderedState, z = m($, a);
        if (h.hasEagerState = !0, h.eagerState = z, xn(z, $)) {
          var q = i.interleaved;
          q === null ? (h.next = h, id(i)) : (h.next = q.next, q.next = h), i.interleaved = h;
          return;
        }
      } catch {
      } finally {
      }
      a = Og(n, i, h, c), a !== null && (h = jt(), Rn(a, n, c, h), om(a, i, c));
    }
  }
  function rm(n) {
    var i = n.alternate;
    return n === Ye || i !== null && i === Ye;
  }
  function im(n, i) {
    Jo = Qa = !0;
    var a = n.pending;
    a === null ? i.next = i : (i.next = a.next, a.next = i), n.pending = i;
  }
  function om(n, i, a) {
    if ((a & 4194240) !== 0) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, wc(n, a);
    }
  }
  var Ja = { readContext: dn, useCallback: It, useContext: It, useEffect: It, useImperativeHandle: It, useInsertionEffect: It, useLayoutEffect: It, useMemo: It, useReducer: It, useRef: It, useState: It, useDebugValue: It, useDeferredValue: It, useTransition: It, useMutableSource: It, useSyncExternalStore: It, useId: It, unstable_isNewReconciler: !1 }, __ = { readContext: dn, useCallback: function(n, i) {
    return Dn().memoizedState = [n, i === void 0 ? null : i], n;
  }, useContext: dn, useEffect: Qg, useImperativeHandle: function(n, i, a) {
    return a = a != null ? a.concat([n]) : null, Ga(
      4194308,
      4,
      Jg.bind(null, i, n),
      a
    );
  }, useLayoutEffect: function(n, i) {
    return Ga(4194308, 4, n, i);
  }, useInsertionEffect: function(n, i) {
    return Ga(4, 2, n, i);
  }, useMemo: function(n, i) {
    var a = Dn();
    return i = i === void 0 ? null : i, n = n(), a.memoizedState = [n, i], n;
  }, useReducer: function(n, i, a) {
    var c = Dn();
    return i = a !== void 0 ? a(i) : i, c.memoizedState = c.baseState = i, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: i }, c.queue = n, n = n.dispatch = S_.bind(null, Ye, n), [c.memoizedState, n];
  }, useRef: function(n) {
    var i = Dn();
    return n = { current: n }, i.memoizedState = n;
  }, useState: qg, useDebugValue: yd, useDeferredValue: function(n) {
    return Dn().memoizedState = n;
  }, useTransition: function() {
    var n = qg(!1), i = n[0];
    return n = w_.bind(null, n[1]), Dn().memoizedState = n, [i, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, i, a) {
    var c = Ye, h = Dn();
    if (Ke) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else {
      if (a = i(), mt === null) throw Error(r(349));
      (oi & 30) !== 0 || Bg(c, i, a);
    }
    h.memoizedState = a;
    var m = { value: a, getSnapshot: i };
    return h.queue = m, Qg(Wg.bind(
      null,
      c,
      m,
      n
    ), [n]), c.flags |= 2048, es(9, Ug.bind(null, c, m, a, i), void 0, null), a;
  }, useId: function() {
    var n = Dn(), i = mt.identifierPrefix;
    if (Ke) {
      var a = er, c = Zn;
      a = (c & ~(1 << 32 - _n(c) - 1)).toString(32) + a, i = ":" + i + "R" + a, a = Xo++, 0 < a && (i += "H" + a.toString(32)), i += ":";
    } else a = v_++, i = ":" + i + "r" + a.toString(32) + ":";
    return n.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, x_ = {
    readContext: dn,
    useCallback: Zg,
    useContext: dn,
    useEffect: md,
    useImperativeHandle: Xg,
    useInsertionEffect: Gg,
    useLayoutEffect: Yg,
    useMemo: em,
    useReducer: hd,
    useRef: Kg,
    useState: function() {
      return hd(Zo);
    },
    useDebugValue: yd,
    useDeferredValue: function(n) {
      var i = fn();
      return tm(i, dt.memoizedState, n);
    },
    useTransition: function() {
      var n = hd(Zo)[0], i = fn().memoizedState;
      return [n, i];
    },
    useMutableSource: zg,
    useSyncExternalStore: jg,
    useId: nm,
    unstable_isNewReconciler: !1
  }, k_ = { readContext: dn, useCallback: Zg, useContext: dn, useEffect: md, useImperativeHandle: Xg, useInsertionEffect: Gg, useLayoutEffect: Yg, useMemo: em, useReducer: gd, useRef: Kg, useState: function() {
    return gd(Zo);
  }, useDebugValue: yd, useDeferredValue: function(n) {
    var i = fn();
    return dt === null ? i.memoizedState = n : tm(i, dt.memoizedState, n);
  }, useTransition: function() {
    var n = gd(Zo)[0], i = fn().memoizedState;
    return [n, i];
  }, useMutableSource: zg, useSyncExternalStore: jg, useId: nm, unstable_isNewReconciler: !1 };
  function Cn(n, i) {
    if (n && n.defaultProps) {
      i = K({}, i), n = n.defaultProps;
      for (var a in n) i[a] === void 0 && (i[a] = n[a]);
      return i;
    }
    return i;
  }
  function vd(n, i, a, c) {
    i = n.memoizedState, a = a(c, i), a = a == null ? i : K({}, i, a), n.memoizedState = a, n.lanes === 0 && (n.updateQueue.baseState = a);
  }
  var Xa = { isMounted: function(n) {
    return (n = n._reactInternals) ? Xr(n) === n : !1;
  }, enqueueSetState: function(n, i, a) {
    n = n._reactInternals;
    var c = jt(), h = Nr(n), m = nr(c, h);
    m.payload = i, a != null && (m.callback = a), i = Mr(n, m, h), i !== null && (Rn(i, n, h, c), Va(i, n, h));
  }, enqueueReplaceState: function(n, i, a) {
    n = n._reactInternals;
    var c = jt(), h = Nr(n), m = nr(c, h);
    m.tag = 1, m.payload = i, a != null && (m.callback = a), i = Mr(n, m, h), i !== null && (Rn(i, n, h, c), Va(i, n, h));
  }, enqueueForceUpdate: function(n, i) {
    n = n._reactInternals;
    var a = jt(), c = Nr(n), h = nr(a, c);
    h.tag = 2, i != null && (h.callback = i), i = Mr(n, h, c), i !== null && (Rn(i, n, c, a), Va(i, n, c));
  } };
  function sm(n, i, a, c, h, m, $) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(c, m, $) : i.prototype && i.prototype.isPureReactComponent ? !jo(a, c) || !jo(h, m) : !0;
  }
  function am(n, i, a) {
    var c = !1, h = Rr, m = i.contextType;
    return typeof m == "object" && m !== null ? m = dn(m) : (h = qt(i) ? ei : At.current, c = i.contextTypes, m = (c = c != null) ? Fi(n, h) : Rr), i = new i(a, m), n.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Xa, n.stateNode = i, i._reactInternals = n, c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = h, n.__reactInternalMemoizedMaskedChildContext = m), i;
  }
  function lm(n, i, a, c) {
    n = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, c), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, c), i.state !== n && Xa.enqueueReplaceState(i, i.state, null);
  }
  function wd(n, i, a, c) {
    var h = n.stateNode;
    h.props = a, h.state = n.memoizedState, h.refs = {}, od(n);
    var m = i.contextType;
    typeof m == "object" && m !== null ? h.context = dn(m) : (m = qt(i) ? ei : At.current, h.context = Fi(n, m)), h.state = n.memoizedState, m = i.getDerivedStateFromProps, typeof m == "function" && (vd(n, i, m, a), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (i = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), i !== h.state && Xa.enqueueReplaceState(h, h.state, null), Ha(n, a, h, c), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function qi(n, i) {
    try {
      var a = "", c = i;
      do
        a += se(c), c = c.return;
      while (c);
      var h = a;
    } catch (m) {
      h = `
Error generating stack: ` + m.message + `
` + m.stack;
    }
    return { value: n, source: i, stack: h, digest: null };
  }
  function Sd(n, i, a) {
    return { value: n, source: null, stack: a ?? null, digest: i ?? null };
  }
  function bd(n, i) {
    try {
      console.error(i.value);
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  var C_ = typeof WeakMap == "function" ? WeakMap : Map;
  function um(n, i, a) {
    a = nr(-1, a), a.tag = 3, a.payload = { element: null };
    var c = i.value;
    return a.callback = function() {
      ol || (ol = !0, Ld = c), bd(n, i);
    }, a;
  }
  function cm(n, i, a) {
    a = nr(-1, a), a.tag = 3;
    var c = n.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = i.value;
      a.payload = function() {
        return c(h);
      }, a.callback = function() {
        bd(n, i);
      };
    }
    var m = n.stateNode;
    return m !== null && typeof m.componentDidCatch == "function" && (a.callback = function() {
      bd(n, i), typeof c != "function" && (Ir === null ? Ir = /* @__PURE__ */ new Set([this]) : Ir.add(this));
      var $ = i.stack;
      this.componentDidCatch(i.value, { componentStack: $ !== null ? $ : "" });
    }), a;
  }
  function dm(n, i, a) {
    var c = n.pingCache;
    if (c === null) {
      c = n.pingCache = new C_();
      var h = /* @__PURE__ */ new Set();
      c.set(i, h);
    } else h = c.get(i), h === void 0 && (h = /* @__PURE__ */ new Set(), c.set(i, h));
    h.has(a) || (h.add(a), n = z_.bind(null, n, i, a), i.then(n, n));
  }
  function fm(n) {
    do {
      var i;
      if ((i = n.tag === 13) && (i = n.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function pm(n, i, a, c, h) {
    return (n.mode & 1) === 0 ? (n === i ? n.flags |= 65536 : (n.flags |= 128, a.flags |= 131072, a.flags &= -52805, a.tag === 1 && (a.alternate === null ? a.tag = 17 : (i = nr(-1, 1), i.tag = 2, Mr(a, i, 1))), a.lanes |= 1), n) : (n.flags |= 65536, n.lanes = h, n);
  }
  var E_ = P.ReactCurrentOwner, Kt = !1;
  function zt(n, i, a, c) {
    i.child = n === null ? Ig(i, null, a, c) : Ui(i, n.child, a, c);
  }
  function hm(n, i, a, c, h) {
    a = a.render;
    var m = i.ref;
    return Vi(i, h), c = fd(n, i, a, c, m, h), a = pd(), n !== null && !Kt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, rr(n, i, h)) : (Ke && a && Gc(i), i.flags |= 1, zt(n, i, c, h), i.child);
  }
  function gm(n, i, a, c, h) {
    if (n === null) {
      var m = a.type;
      return typeof m == "function" && !Wd(m) && m.defaultProps === void 0 && a.compare === null && a.defaultProps === void 0 ? (i.tag = 15, i.type = m, mm(n, i, m, c, h)) : (n = dl(a.type, null, c, i, i.mode, h), n.ref = i.ref, n.return = i, i.child = n);
    }
    if (m = n.child, (n.lanes & h) === 0) {
      var $ = m.memoizedProps;
      if (a = a.compare, a = a !== null ? a : jo, a($, c) && n.ref === i.ref) return rr(n, i, h);
    }
    return i.flags |= 1, n = Dr(m, c), n.ref = i.ref, n.return = i, i.child = n;
  }
  function mm(n, i, a, c, h) {
    if (n !== null) {
      var m = n.memoizedProps;
      if (jo(m, c) && n.ref === i.ref) if (Kt = !1, i.pendingProps = c = m, (n.lanes & h) !== 0) (n.flags & 131072) !== 0 && (Kt = !0);
      else return i.lanes = n.lanes, rr(n, i, h);
    }
    return _d(n, i, a, c, h);
  }
  function ym(n, i, a) {
    var c = i.pendingProps, h = c.children, m = n !== null ? n.memoizedState : null;
    if (c.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ue(Qi, tn), tn |= a;
    else {
      if ((a & 1073741824) === 0) return n = m !== null ? m.baseLanes | a : a, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, i.updateQueue = null, Ue(Qi, tn), tn |= n, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, c = m !== null ? m.baseLanes : a, Ue(Qi, tn), tn |= c;
    }
    else m !== null ? (c = m.baseLanes | a, i.memoizedState = null) : c = a, Ue(Qi, tn), tn |= c;
    return zt(n, i, h, a), i.child;
  }
  function vm(n, i) {
    var a = i.ref;
    (n === null && a !== null || n !== null && n.ref !== a) && (i.flags |= 512, i.flags |= 2097152);
  }
  function _d(n, i, a, c, h) {
    var m = qt(a) ? ei : At.current;
    return m = Fi(i, m), Vi(i, h), a = fd(n, i, a, c, m, h), c = pd(), n !== null && !Kt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, rr(n, i, h)) : (Ke && c && Gc(i), i.flags |= 1, zt(n, i, a, h), i.child);
  }
  function wm(n, i, a, c, h) {
    if (qt(a)) {
      var m = !0;
      La(i);
    } else m = !1;
    if (Vi(i, h), i.stateNode === null) el(n, i), am(i, a, c), wd(i, a, c, h), c = !0;
    else if (n === null) {
      var $ = i.stateNode, z = i.memoizedProps;
      $.props = z;
      var q = $.context, Z = a.contextType;
      typeof Z == "object" && Z !== null ? Z = dn(Z) : (Z = qt(a) ? ei : At.current, Z = Fi(i, Z));
      var re = a.getDerivedStateFromProps, ae = typeof re == "function" || typeof $.getSnapshotBeforeUpdate == "function";
      ae || typeof $.UNSAFE_componentWillReceiveProps != "function" && typeof $.componentWillReceiveProps != "function" || (z !== c || q !== Z) && lm(i, $, c, Z), $r = !1;
      var ne = i.memoizedState;
      $.state = ne, Ha(i, c, $, h), q = i.memoizedState, z !== c || ne !== q || Ht.current || $r ? (typeof re == "function" && (vd(i, a, re, c), q = i.memoizedState), (z = $r || sm(i, a, z, c, ne, q, Z)) ? (ae || typeof $.UNSAFE_componentWillMount != "function" && typeof $.componentWillMount != "function" || (typeof $.componentWillMount == "function" && $.componentWillMount(), typeof $.UNSAFE_componentWillMount == "function" && $.UNSAFE_componentWillMount()), typeof $.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof $.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = c, i.memoizedState = q), $.props = c, $.state = q, $.context = Z, c = z) : (typeof $.componentDidMount == "function" && (i.flags |= 4194308), c = !1);
    } else {
      $ = i.stateNode, Ng(n, i), z = i.memoizedProps, Z = i.type === i.elementType ? z : Cn(i.type, z), $.props = Z, ae = i.pendingProps, ne = $.context, q = a.contextType, typeof q == "object" && q !== null ? q = dn(q) : (q = qt(a) ? ei : At.current, q = Fi(i, q));
      var pe = a.getDerivedStateFromProps;
      (re = typeof pe == "function" || typeof $.getSnapshotBeforeUpdate == "function") || typeof $.UNSAFE_componentWillReceiveProps != "function" && typeof $.componentWillReceiveProps != "function" || (z !== ae || ne !== q) && lm(i, $, c, q), $r = !1, ne = i.memoizedState, $.state = ne, Ha(i, c, $, h);
      var me = i.memoizedState;
      z !== ae || ne !== me || Ht.current || $r ? (typeof pe == "function" && (vd(i, a, pe, c), me = i.memoizedState), (Z = $r || sm(i, a, Z, c, ne, me, q) || !1) ? (re || typeof $.UNSAFE_componentWillUpdate != "function" && typeof $.componentWillUpdate != "function" || (typeof $.componentWillUpdate == "function" && $.componentWillUpdate(c, me, q), typeof $.UNSAFE_componentWillUpdate == "function" && $.UNSAFE_componentWillUpdate(c, me, q)), typeof $.componentDidUpdate == "function" && (i.flags |= 4), typeof $.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof $.componentDidUpdate != "function" || z === n.memoizedProps && ne === n.memoizedState || (i.flags |= 4), typeof $.getSnapshotBeforeUpdate != "function" || z === n.memoizedProps && ne === n.memoizedState || (i.flags |= 1024), i.memoizedProps = c, i.memoizedState = me), $.props = c, $.state = me, $.context = q, c = Z) : (typeof $.componentDidUpdate != "function" || z === n.memoizedProps && ne === n.memoizedState || (i.flags |= 4), typeof $.getSnapshotBeforeUpdate != "function" || z === n.memoizedProps && ne === n.memoizedState || (i.flags |= 1024), c = !1);
    }
    return xd(n, i, a, c, m, h);
  }
  function xd(n, i, a, c, h, m) {
    vm(n, i);
    var $ = (i.flags & 128) !== 0;
    if (!c && !$) return h && kg(i, a, !1), rr(n, i, m);
    c = i.stateNode, E_.current = i;
    var z = $ && typeof a.getDerivedStateFromError != "function" ? null : c.render();
    return i.flags |= 1, n !== null && $ ? (i.child = Ui(i, n.child, null, m), i.child = Ui(i, null, z, m)) : zt(n, i, z, m), i.memoizedState = c.state, h && kg(i, a, !0), i.child;
  }
  function Sm(n) {
    var i = n.stateNode;
    i.pendingContext ? _g(n, i.pendingContext, i.pendingContext !== i.context) : i.context && _g(n, i.context, !1), sd(n, i.containerInfo);
  }
  function bm(n, i, a, c, h) {
    return Bi(), Zc(h), i.flags |= 256, zt(n, i, a, c), i.child;
  }
  var kd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Cd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function _m(n, i, a) {
    var c = i.pendingProps, h = Ge.current, m = !1, $ = (i.flags & 128) !== 0, z;
    if ((z = $) || (z = n !== null && n.memoizedState === null ? !1 : (h & 2) !== 0), z ? (m = !0, i.flags &= -129) : (n === null || n.memoizedState !== null) && (h |= 1), Ue(Ge, h & 1), n === null)
      return Xc(i), n = i.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : n.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : ($ = c.children, n = c.fallback, m ? (c = i.mode, m = i.child, $ = { mode: "hidden", children: $ }, (c & 1) === 0 && m !== null ? (m.childLanes = 0, m.pendingProps = $) : m = fl($, c, 0, null), n = ci(n, c, a, null), m.return = i, n.return = i, m.sibling = n, i.child = m, i.child.memoizedState = Cd(a), i.memoizedState = kd, n) : Ed(i, $));
    if (h = n.memoizedState, h !== null && (z = h.dehydrated, z !== null)) return P_(n, i, $, c, z, h, a);
    if (m) {
      m = c.fallback, $ = i.mode, h = n.child, z = h.sibling;
      var q = { mode: "hidden", children: c.children };
      return ($ & 1) === 0 && i.child !== h ? (c = i.child, c.childLanes = 0, c.pendingProps = q, i.deletions = null) : (c = Dr(h, q), c.subtreeFlags = h.subtreeFlags & 14680064), z !== null ? m = Dr(z, m) : (m = ci(m, $, a, null), m.flags |= 2), m.return = i, c.return = i, c.sibling = m, i.child = c, c = m, m = i.child, $ = n.child.memoizedState, $ = $ === null ? Cd(a) : { baseLanes: $.baseLanes | a, cachePool: null, transitions: $.transitions }, m.memoizedState = $, m.childLanes = n.childLanes & ~a, i.memoizedState = kd, c;
    }
    return m = n.child, n = m.sibling, c = Dr(m, { mode: "visible", children: c.children }), (i.mode & 1) === 0 && (c.lanes = a), c.return = i, c.sibling = null, n !== null && (a = i.deletions, a === null ? (i.deletions = [n], i.flags |= 16) : a.push(n)), i.child = c, i.memoizedState = null, c;
  }
  function Ed(n, i) {
    return i = fl({ mode: "visible", children: i }, n.mode, 0, null), i.return = n, n.child = i;
  }
  function Za(n, i, a, c) {
    return c !== null && Zc(c), Ui(i, n.child, null, a), n = Ed(i, i.pendingProps.children), n.flags |= 2, i.memoizedState = null, n;
  }
  function P_(n, i, a, c, h, m, $) {
    if (a)
      return i.flags & 256 ? (i.flags &= -257, c = Sd(Error(r(422))), Za(n, i, $, c)) : i.memoizedState !== null ? (i.child = n.child, i.flags |= 128, null) : (m = c.fallback, h = i.mode, c = fl({ mode: "visible", children: c.children }, h, 0, null), m = ci(m, h, $, null), m.flags |= 2, c.return = i, m.return = i, c.sibling = m, i.child = c, (i.mode & 1) !== 0 && Ui(i, n.child, null, $), i.child.memoizedState = Cd($), i.memoizedState = kd, m);
    if ((i.mode & 1) === 0) return Za(n, i, $, null);
    if (h.data === "$!") {
      if (c = h.nextSibling && h.nextSibling.dataset, c) var z = c.dgst;
      return c = z, m = Error(r(419)), c = Sd(m, c, void 0), Za(n, i, $, c);
    }
    if (z = ($ & n.childLanes) !== 0, Kt || z) {
      if (c = mt, c !== null) {
        switch ($ & -$) {
          case 4:
            h = 2;
            break;
          case 16:
            h = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            h = 32;
            break;
          case 536870912:
            h = 268435456;
            break;
          default:
            h = 0;
        }
        h = (h & (c.suspendedLanes | $)) !== 0 ? 0 : h, h !== 0 && h !== m.retryLane && (m.retryLane = h, tr(n, h), Rn(c, n, h, -1));
      }
      return Ud(), c = Sd(Error(r(421))), Za(n, i, $, c);
    }
    return h.data === "$?" ? (i.flags |= 128, i.child = n.child, i = j_.bind(null, n), h._reactRetry = i, null) : (n = m.treeContext, en = Er(h.nextSibling), Zt = i, Ke = !0, kn = null, n !== null && (un[cn++] = Zn, un[cn++] = er, un[cn++] = ti, Zn = n.id, er = n.overflow, ti = i), i = Ed(i, c.children), i.flags |= 4096, i);
  }
  function xm(n, i, a) {
    n.lanes |= i;
    var c = n.alternate;
    c !== null && (c.lanes |= i), rd(n.return, i, a);
  }
  function Pd(n, i, a, c, h) {
    var m = n.memoizedState;
    m === null ? n.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: c, tail: a, tailMode: h } : (m.isBackwards = i, m.rendering = null, m.renderingStartTime = 0, m.last = c, m.tail = a, m.tailMode = h);
  }
  function km(n, i, a) {
    var c = i.pendingProps, h = c.revealOrder, m = c.tail;
    if (zt(n, i, c.children, a), c = Ge.current, (c & 2) !== 0) c = c & 1 | 2, i.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = i.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && xm(n, a, i);
        else if (n.tag === 19) xm(n, a, i);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === i) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === i) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      c &= 1;
    }
    if (Ue(Ge, c), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (h) {
      case "forwards":
        for (a = i.child, h = null; a !== null; ) n = a.alternate, n !== null && qa(n) === null && (h = a), a = a.sibling;
        a = h, a === null ? (h = i.child, i.child = null) : (h = a.sibling, a.sibling = null), Pd(i, !1, h, a, m);
        break;
      case "backwards":
        for (a = null, h = i.child, i.child = null; h !== null; ) {
          if (n = h.alternate, n !== null && qa(n) === null) {
            i.child = h;
            break;
          }
          n = h.sibling, h.sibling = a, a = h, h = n;
        }
        Pd(i, !0, a, null, m);
        break;
      case "together":
        Pd(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function el(n, i) {
    (i.mode & 1) === 0 && n !== null && (n.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function rr(n, i, a) {
    if (n !== null && (i.dependencies = n.dependencies), si |= i.lanes, (a & i.childLanes) === 0) return null;
    if (n !== null && i.child !== n.child) throw Error(r(153));
    if (i.child !== null) {
      for (n = i.child, a = Dr(n, n.pendingProps), i.child = a, a.return = i; n.sibling !== null; ) n = n.sibling, a = a.sibling = Dr(n, n.pendingProps), a.return = i;
      a.sibling = null;
    }
    return i.child;
  }
  function R_(n, i, a) {
    switch (i.tag) {
      case 3:
        Sm(i), Bi();
        break;
      case 5:
        Fg(i);
        break;
      case 1:
        qt(i.type) && La(i);
        break;
      case 4:
        sd(i, i.stateNode.containerInfo);
        break;
      case 10:
        var c = i.type._context, h = i.memoizedProps.value;
        Ue(Ua, c._currentValue), c._currentValue = h;
        break;
      case 13:
        if (c = i.memoizedState, c !== null)
          return c.dehydrated !== null ? (Ue(Ge, Ge.current & 1), i.flags |= 128, null) : (a & i.child.childLanes) !== 0 ? _m(n, i, a) : (Ue(Ge, Ge.current & 1), n = rr(n, i, a), n !== null ? n.sibling : null);
        Ue(Ge, Ge.current & 1);
        break;
      case 19:
        if (c = (a & i.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (c) return km(n, i, a);
          i.flags |= 128;
        }
        if (h = i.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), Ue(Ge, Ge.current), c) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, ym(n, i, a);
    }
    return rr(n, i, a);
  }
  var Cm, Rd, Em, Pm;
  Cm = function(n, i) {
    for (var a = i.child; a !== null; ) {
      if (a.tag === 5 || a.tag === 6) n.appendChild(a.stateNode);
      else if (a.tag !== 4 && a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === i) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === i) return;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }, Rd = function() {
  }, Em = function(n, i, a, c) {
    var h = n.memoizedProps;
    if (h !== c) {
      n = i.stateNode, ii(Ln.current);
      var m = null;
      switch (a) {
        case "input":
          h = ze(n, h), c = ze(n, c), m = [];
          break;
        case "select":
          h = K({}, h, { value: void 0 }), c = K({}, c, { value: void 0 }), m = [];
          break;
        case "textarea":
          h = xe(n, h), c = xe(n, c), m = [];
          break;
        default:
          typeof h.onClick != "function" && typeof c.onClick == "function" && (n.onclick = Ia);
      }
      lc(a, c);
      var $;
      a = null;
      for (Z in h) if (!c.hasOwnProperty(Z) && h.hasOwnProperty(Z) && h[Z] != null) if (Z === "style") {
        var z = h[Z];
        for ($ in z) z.hasOwnProperty($) && (a || (a = {}), a[$] = "");
      } else Z !== "dangerouslySetInnerHTML" && Z !== "children" && Z !== "suppressContentEditableWarning" && Z !== "suppressHydrationWarning" && Z !== "autoFocus" && (s.hasOwnProperty(Z) ? m || (m = []) : (m = m || []).push(Z, null));
      for (Z in c) {
        var q = c[Z];
        if (z = h?.[Z], c.hasOwnProperty(Z) && q !== z && (q != null || z != null)) if (Z === "style") if (z) {
          for ($ in z) !z.hasOwnProperty($) || q && q.hasOwnProperty($) || (a || (a = {}), a[$] = "");
          for ($ in q) q.hasOwnProperty($) && z[$] !== q[$] && (a || (a = {}), a[$] = q[$]);
        } else a || (m || (m = []), m.push(
          Z,
          a
        )), a = q;
        else Z === "dangerouslySetInnerHTML" ? (q = q ? q.__html : void 0, z = z ? z.__html : void 0, q != null && z !== q && (m = m || []).push(Z, q)) : Z === "children" ? typeof q != "string" && typeof q != "number" || (m = m || []).push(Z, "" + q) : Z !== "suppressContentEditableWarning" && Z !== "suppressHydrationWarning" && (s.hasOwnProperty(Z) ? (q != null && Z === "onScroll" && Ve("scroll", n), m || z === q || (m = [])) : (m = m || []).push(Z, q));
      }
      a && (m = m || []).push("style", a);
      var Z = m;
      (i.updateQueue = Z) && (i.flags |= 4);
    }
  }, Pm = function(n, i, a, c) {
    a !== c && (i.flags |= 4);
  };
  function ts(n, i) {
    if (!Ke) switch (n.tailMode) {
      case "hidden":
        i = n.tail;
        for (var a = null; i !== null; ) i.alternate !== null && (a = i), i = i.sibling;
        a === null ? n.tail = null : a.sibling = null;
        break;
      case "collapsed":
        a = n.tail;
        for (var c = null; a !== null; ) a.alternate !== null && (c = a), a = a.sibling;
        c === null ? i || n.tail === null ? n.tail = null : n.tail.sibling = null : c.sibling = null;
    }
  }
  function Ot(n) {
    var i = n.alternate !== null && n.alternate.child === n.child, a = 0, c = 0;
    if (i) for (var h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags & 14680064, c |= h.flags & 14680064, h.return = n, h = h.sibling;
    else for (h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags, c |= h.flags, h.return = n, h = h.sibling;
    return n.subtreeFlags |= c, n.childLanes = a, i;
  }
  function T_(n, i, a) {
    var c = i.pendingProps;
    switch (Yc(i), i.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ot(i), null;
      case 1:
        return qt(i.type) && Na(), Ot(i), null;
      case 3:
        return c = i.stateNode, Hi(), He(Ht), He(At), ud(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (ja(i) ? i.flags |= 4 : n === null || n.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, kn !== null && (zd(kn), kn = null))), Rd(n, i), Ot(i), null;
      case 5:
        ad(i);
        var h = ii(Yo.current);
        if (a = i.type, n !== null && i.stateNode != null) Em(n, i, a, c, h), n.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(r(166));
            return Ot(i), null;
          }
          if (n = ii(Ln.current), ja(i)) {
            c = i.stateNode, a = i.type;
            var m = i.memoizedProps;
            switch (c[Nn] = i, c[Ho] = m, n = (i.mode & 1) !== 0, a) {
              case "dialog":
                Ve("cancel", c), Ve("close", c);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ve("load", c);
                break;
              case "video":
              case "audio":
                for (h = 0; h < Uo.length; h++) Ve(Uo[h], c);
                break;
              case "source":
                Ve("error", c);
                break;
              case "img":
              case "image":
              case "link":
                Ve(
                  "error",
                  c
                ), Ve("load", c);
                break;
              case "details":
                Ve("toggle", c);
                break;
              case "input":
                st(c, m), Ve("invalid", c);
                break;
              case "select":
                c._wrapperState = { wasMultiple: !!m.multiple }, Ve("invalid", c);
                break;
              case "textarea":
                _o(c, m), Ve("invalid", c);
            }
            lc(a, m), h = null;
            for (var $ in m) if (m.hasOwnProperty($)) {
              var z = m[$];
              $ === "children" ? typeof z == "string" ? c.textContent !== z && (m.suppressHydrationWarning !== !0 && Aa(c.textContent, z, n), h = ["children", z]) : typeof z == "number" && c.textContent !== "" + z && (m.suppressHydrationWarning !== !0 && Aa(
                c.textContent,
                z,
                n
              ), h = ["children", "" + z]) : s.hasOwnProperty($) && z != null && $ === "onScroll" && Ve("scroll", c);
            }
            switch (a) {
              case "input":
                we(c), De(c, m, !0);
                break;
              case "textarea":
                we(c), St(c);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof m.onClick == "function" && (c.onclick = Ia);
            }
            c = h, i.updateQueue = c, c !== null && (i.flags |= 4);
          } else {
            $ = h.nodeType === 9 ? h : h.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = $t(a)), n === "http://www.w3.org/1999/xhtml" ? a === "script" ? (n = $.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof c.is == "string" ? n = $.createElement(a, { is: c.is }) : (n = $.createElement(a), a === "select" && ($ = n, c.multiple ? $.multiple = !0 : c.size && ($.size = c.size))) : n = $.createElementNS(n, a), n[Nn] = i, n[Ho] = c, Cm(n, i, !1, !1), i.stateNode = n;
            e: {
              switch ($ = uc(a, c), a) {
                case "dialog":
                  Ve("cancel", n), Ve("close", n), h = c;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ve("load", n), h = c;
                  break;
                case "video":
                case "audio":
                  for (h = 0; h < Uo.length; h++) Ve(Uo[h], n);
                  h = c;
                  break;
                case "source":
                  Ve("error", n), h = c;
                  break;
                case "img":
                case "image":
                case "link":
                  Ve(
                    "error",
                    n
                  ), Ve("load", n), h = c;
                  break;
                case "details":
                  Ve("toggle", n), h = c;
                  break;
                case "input":
                  st(n, c), h = ze(n, c), Ve("invalid", n);
                  break;
                case "option":
                  h = c;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!c.multiple }, h = K({}, c, { value: void 0 }), Ve("invalid", n);
                  break;
                case "textarea":
                  _o(n, c), h = xe(n, c), Ve("invalid", n);
                  break;
                default:
                  h = c;
              }
              lc(a, h), z = h;
              for (m in z) if (z.hasOwnProperty(m)) {
                var q = z[m];
                m === "style" ? mh(n, q) : m === "dangerouslySetInnerHTML" ? (q = q ? q.__html : void 0, q != null && da(n, q)) : m === "children" ? typeof q == "string" ? (a !== "textarea" || q !== "") && xo(n, q) : typeof q == "number" && xo(n, "" + q) : m !== "suppressContentEditableWarning" && m !== "suppressHydrationWarning" && m !== "autoFocus" && (s.hasOwnProperty(m) ? q != null && m === "onScroll" && Ve("scroll", n) : q != null && x(n, m, q, $));
              }
              switch (a) {
                case "input":
                  we(n), De(n, c, !1);
                  break;
                case "textarea":
                  we(n), St(n);
                  break;
                case "option":
                  c.value != null && n.setAttribute("value", "" + he(c.value));
                  break;
                case "select":
                  n.multiple = !!c.multiple, m = c.value, m != null ? We(n, !!c.multiple, m, !1) : c.defaultValue != null && We(
                    n,
                    !!c.multiple,
                    c.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof h.onClick == "function" && (n.onclick = Ia);
              }
              switch (a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break e;
                case "img":
                  c = !0;
                  break e;
                default:
                  c = !1;
              }
            }
            c && (i.flags |= 4);
          }
          i.ref !== null && (i.flags |= 512, i.flags |= 2097152);
        }
        return Ot(i), null;
      case 6:
        if (n && i.stateNode != null) Pm(n, i, n.memoizedProps, c);
        else {
          if (typeof c != "string" && i.stateNode === null) throw Error(r(166));
          if (a = ii(Yo.current), ii(Ln.current), ja(i)) {
            if (c = i.stateNode, a = i.memoizedProps, c[Nn] = i, (m = c.nodeValue !== a) && (n = Zt, n !== null)) switch (n.tag) {
              case 3:
                Aa(c.nodeValue, a, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Aa(c.nodeValue, a, (n.mode & 1) !== 0);
            }
            m && (i.flags |= 4);
          } else c = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(c), c[Nn] = i, i.stateNode = c;
        }
        return Ot(i), null;
      case 13:
        if (He(Ge), c = i.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Ke && en !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) $g(), Bi(), i.flags |= 98560, m = !1;
          else if (m = ja(i), c !== null && c.dehydrated !== null) {
            if (n === null) {
              if (!m) throw Error(r(318));
              if (m = i.memoizedState, m = m !== null ? m.dehydrated : null, !m) throw Error(r(317));
              m[Nn] = i;
            } else Bi(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Ot(i), m = !1;
          } else kn !== null && (zd(kn), kn = null), m = !0;
          if (!m) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = a, i) : (c = c !== null, c !== (n !== null && n.memoizedState !== null) && c && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (n === null || (Ge.current & 1) !== 0 ? ft === 0 && (ft = 3) : Ud())), i.updateQueue !== null && (i.flags |= 4), Ot(i), null);
      case 4:
        return Hi(), Rd(n, i), n === null && Wo(i.stateNode.containerInfo), Ot(i), null;
      case 10:
        return nd(i.type._context), Ot(i), null;
      case 17:
        return qt(i.type) && Na(), Ot(i), null;
      case 19:
        if (He(Ge), m = i.memoizedState, m === null) return Ot(i), null;
        if (c = (i.flags & 128) !== 0, $ = m.rendering, $ === null) if (c) ts(m, !1);
        else {
          if (ft !== 0 || n !== null && (n.flags & 128) !== 0) for (n = i.child; n !== null; ) {
            if ($ = qa(n), $ !== null) {
              for (i.flags |= 128, ts(m, !1), c = $.updateQueue, c !== null && (i.updateQueue = c, i.flags |= 4), i.subtreeFlags = 0, c = a, a = i.child; a !== null; ) m = a, n = c, m.flags &= 14680066, $ = m.alternate, $ === null ? (m.childLanes = 0, m.lanes = n, m.child = null, m.subtreeFlags = 0, m.memoizedProps = null, m.memoizedState = null, m.updateQueue = null, m.dependencies = null, m.stateNode = null) : (m.childLanes = $.childLanes, m.lanes = $.lanes, m.child = $.child, m.subtreeFlags = 0, m.deletions = null, m.memoizedProps = $.memoizedProps, m.memoizedState = $.memoizedState, m.updateQueue = $.updateQueue, m.type = $.type, n = $.dependencies, m.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), a = a.sibling;
              return Ue(Ge, Ge.current & 1 | 2), i.child;
            }
            n = n.sibling;
          }
          m.tail !== null && rt() > Gi && (i.flags |= 128, c = !0, ts(m, !1), i.lanes = 4194304);
        }
        else {
          if (!c) if (n = qa($), n !== null) {
            if (i.flags |= 128, c = !0, a = n.updateQueue, a !== null && (i.updateQueue = a, i.flags |= 4), ts(m, !0), m.tail === null && m.tailMode === "hidden" && !$.alternate && !Ke) return Ot(i), null;
          } else 2 * rt() - m.renderingStartTime > Gi && a !== 1073741824 && (i.flags |= 128, c = !0, ts(m, !1), i.lanes = 4194304);
          m.isBackwards ? ($.sibling = i.child, i.child = $) : (a = m.last, a !== null ? a.sibling = $ : i.child = $, m.last = $);
        }
        return m.tail !== null ? (i = m.tail, m.rendering = i, m.tail = i.sibling, m.renderingStartTime = rt(), i.sibling = null, a = Ge.current, Ue(Ge, c ? a & 1 | 2 : a & 1), i) : (Ot(i), null);
      case 22:
      case 23:
        return Bd(), c = i.memoizedState !== null, n !== null && n.memoizedState !== null !== c && (i.flags |= 8192), c && (i.mode & 1) !== 0 ? (tn & 1073741824) !== 0 && (Ot(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Ot(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function $_(n, i) {
    switch (Yc(i), i.tag) {
      case 1:
        return qt(i.type) && Na(), n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 3:
        return Hi(), He(Ht), He(At), ud(), n = i.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (i.flags = n & -65537 | 128, i) : null;
      case 5:
        return ad(i), null;
      case 13:
        if (He(Ge), n = i.memoizedState, n !== null && n.dehydrated !== null) {
          if (i.alternate === null) throw Error(r(340));
          Bi();
        }
        return n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 19:
        return He(Ge), null;
      case 4:
        return Hi(), null;
      case 10:
        return nd(i.type._context), null;
      case 22:
      case 23:
        return Bd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var tl = !1, Nt = !1, M_ = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function Ki(n, i) {
    var a = n.ref;
    if (a !== null) if (typeof a == "function") try {
      a(null);
    } catch (c) {
      et(n, i, c);
    }
    else a.current = null;
  }
  function Td(n, i, a) {
    try {
      a();
    } catch (c) {
      et(n, i, c);
    }
  }
  var Rm = !1;
  function A_(n, i) {
    if (Bc = ba, n = sg(), Ic(n)) {
      if ("selectionStart" in n) var a = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        a = (a = n.ownerDocument) && a.defaultView || window;
        var c = a.getSelection && a.getSelection();
        if (c && c.rangeCount !== 0) {
          a = c.anchorNode;
          var h = c.anchorOffset, m = c.focusNode;
          c = c.focusOffset;
          try {
            a.nodeType, m.nodeType;
          } catch {
            a = null;
            break e;
          }
          var $ = 0, z = -1, q = -1, Z = 0, re = 0, ae = n, ne = null;
          t: for (; ; ) {
            for (var pe; ae !== a || h !== 0 && ae.nodeType !== 3 || (z = $ + h), ae !== m || c !== 0 && ae.nodeType !== 3 || (q = $ + c), ae.nodeType === 3 && ($ += ae.nodeValue.length), (pe = ae.firstChild) !== null; )
              ne = ae, ae = pe;
            for (; ; ) {
              if (ae === n) break t;
              if (ne === a && ++Z === h && (z = $), ne === m && ++re === c && (q = $), (pe = ae.nextSibling) !== null) break;
              ae = ne, ne = ae.parentNode;
            }
            ae = pe;
          }
          a = z === -1 || q === -1 ? null : { start: z, end: q };
        } else a = null;
      }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Uc = { focusedElem: n, selectionRange: a }, ba = !1, ge = i; ge !== null; ) if (i = ge, n = i.child, (i.subtreeFlags & 1028) !== 0 && n !== null) n.return = i, ge = n;
    else for (; ge !== null; ) {
      i = ge;
      try {
        var me = i.alternate;
        if ((i.flags & 1024) !== 0) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (me !== null) {
              var ye = me.memoizedProps, it = me.memoizedState, J = i.stateNode, Q = J.getSnapshotBeforeUpdate(i.elementType === i.type ? ye : Cn(i.type, ye), it);
              J.__reactInternalSnapshotBeforeUpdate = Q;
            }
            break;
          case 3:
            var X = i.stateNode.containerInfo;
            X.nodeType === 1 ? X.textContent = "" : X.nodeType === 9 && X.documentElement && X.removeChild(X.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(r(163));
        }
      } catch (ce) {
        et(i, i.return, ce);
      }
      if (n = i.sibling, n !== null) {
        n.return = i.return, ge = n;
        break;
      }
      ge = i.return;
    }
    return me = Rm, Rm = !1, me;
  }
  function ns(n, i, a) {
    var c = i.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var h = c = c.next;
      do {
        if ((h.tag & n) === n) {
          var m = h.destroy;
          h.destroy = void 0, m !== void 0 && Td(i, a, m);
        }
        h = h.next;
      } while (h !== c);
    }
  }
  function nl(n, i) {
    if (i = i.updateQueue, i = i !== null ? i.lastEffect : null, i !== null) {
      var a = i = i.next;
      do {
        if ((a.tag & n) === n) {
          var c = a.create;
          a.destroy = c();
        }
        a = a.next;
      } while (a !== i);
    }
  }
  function $d(n) {
    var i = n.ref;
    if (i !== null) {
      var a = n.stateNode;
      switch (n.tag) {
        case 5:
          n = a;
          break;
        default:
          n = a;
      }
      typeof i == "function" ? i(n) : i.current = n;
    }
  }
  function Tm(n) {
    var i = n.alternate;
    i !== null && (n.alternate = null, Tm(i)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (i = n.stateNode, i !== null && (delete i[Nn], delete i[Ho], delete i[qc], delete i[h_], delete i[g_])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function $m(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Mm(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || $m(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Md(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.nodeType === 8 ? a.parentNode.insertBefore(n, i) : a.insertBefore(n, i) : (a.nodeType === 8 ? (i = a.parentNode, i.insertBefore(n, a)) : (i = a, i.appendChild(n)), a = a._reactRootContainer, a != null || i.onclick !== null || (i.onclick = Ia));
    else if (c !== 4 && (n = n.child, n !== null)) for (Md(n, i, a), n = n.sibling; n !== null; ) Md(n, i, a), n = n.sibling;
  }
  function Ad(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.insertBefore(n, i) : a.appendChild(n);
    else if (c !== 4 && (n = n.child, n !== null)) for (Ad(n, i, a), n = n.sibling; n !== null; ) Ad(n, i, a), n = n.sibling;
  }
  var bt = null, En = !1;
  function Ar(n, i, a) {
    for (a = a.child; a !== null; ) Am(n, i, a), a = a.sibling;
  }
  function Am(n, i, a) {
    if (On && typeof On.onCommitFiberUnmount == "function") try {
      On.onCommitFiberUnmount(ga, a);
    } catch {
    }
    switch (a.tag) {
      case 5:
        Nt || Ki(a, i);
      case 6:
        var c = bt, h = En;
        bt = null, Ar(n, i, a), bt = c, En = h, bt !== null && (En ? (n = bt, a = a.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(a) : n.removeChild(a)) : bt.removeChild(a.stateNode));
        break;
      case 18:
        bt !== null && (En ? (n = bt, a = a.stateNode, n.nodeType === 8 ? Hc(n.parentNode, a) : n.nodeType === 1 && Hc(n, a), Oo(n)) : Hc(bt, a.stateNode));
        break;
      case 4:
        c = bt, h = En, bt = a.stateNode.containerInfo, En = !0, Ar(n, i, a), bt = c, En = h;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Nt && (c = a.updateQueue, c !== null && (c = c.lastEffect, c !== null))) {
          h = c = c.next;
          do {
            var m = h, $ = m.destroy;
            m = m.tag, $ !== void 0 && ((m & 2) !== 0 || (m & 4) !== 0) && Td(a, i, $), h = h.next;
          } while (h !== c);
        }
        Ar(n, i, a);
        break;
      case 1:
        if (!Nt && (Ki(a, i), c = a.stateNode, typeof c.componentWillUnmount == "function")) try {
          c.props = a.memoizedProps, c.state = a.memoizedState, c.componentWillUnmount();
        } catch (z) {
          et(a, i, z);
        }
        Ar(n, i, a);
        break;
      case 21:
        Ar(n, i, a);
        break;
      case 22:
        a.mode & 1 ? (Nt = (c = Nt) || a.memoizedState !== null, Ar(n, i, a), Nt = c) : Ar(n, i, a);
        break;
      default:
        Ar(n, i, a);
    }
  }
  function Im(n) {
    var i = n.updateQueue;
    if (i !== null) {
      n.updateQueue = null;
      var a = n.stateNode;
      a === null && (a = n.stateNode = new M_()), i.forEach(function(c) {
        var h = B_.bind(null, n, c);
        a.has(c) || (a.add(c), c.then(h, h));
      });
    }
  }
  function Pn(n, i) {
    var a = i.deletions;
    if (a !== null) for (var c = 0; c < a.length; c++) {
      var h = a[c];
      try {
        var m = n, $ = i, z = $;
        e: for (; z !== null; ) {
          switch (z.tag) {
            case 5:
              bt = z.stateNode, En = !1;
              break e;
            case 3:
              bt = z.stateNode.containerInfo, En = !0;
              break e;
            case 4:
              bt = z.stateNode.containerInfo, En = !0;
              break e;
          }
          z = z.return;
        }
        if (bt === null) throw Error(r(160));
        Am(m, $, h), bt = null, En = !1;
        var q = h.alternate;
        q !== null && (q.return = null), h.return = null;
      } catch (Z) {
        et(h, i, Z);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) Om(i, n), i = i.sibling;
  }
  function Om(n, i) {
    var a = n.alternate, c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Pn(i, n), Fn(n), c & 4) {
          try {
            ns(3, n, n.return), nl(3, n);
          } catch (ye) {
            et(n, n.return, ye);
          }
          try {
            ns(5, n, n.return);
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 1:
        Pn(i, n), Fn(n), c & 512 && a !== null && Ki(a, a.return);
        break;
      case 5:
        if (Pn(i, n), Fn(n), c & 512 && a !== null && Ki(a, a.return), n.flags & 32) {
          var h = n.stateNode;
          try {
            xo(h, "");
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        if (c & 4 && (h = n.stateNode, h != null)) {
          var m = n.memoizedProps, $ = a !== null ? a.memoizedProps : m, z = n.type, q = n.updateQueue;
          if (n.updateQueue = null, q !== null) try {
            z === "input" && m.type === "radio" && m.name != null && ut(h, m), uc(z, $);
            var Z = uc(z, m);
            for ($ = 0; $ < q.length; $ += 2) {
              var re = q[$], ae = q[$ + 1];
              re === "style" ? mh(h, ae) : re === "dangerouslySetInnerHTML" ? da(h, ae) : re === "children" ? xo(h, ae) : x(h, re, ae, Z);
            }
            switch (z) {
              case "input":
                Ze(h, m);
                break;
              case "textarea":
                Tt(h, m);
                break;
              case "select":
                var ne = h._wrapperState.wasMultiple;
                h._wrapperState.wasMultiple = !!m.multiple;
                var pe = m.value;
                pe != null ? We(h, !!m.multiple, pe, !1) : ne !== !!m.multiple && (m.defaultValue != null ? We(
                  h,
                  !!m.multiple,
                  m.defaultValue,
                  !0
                ) : We(h, !!m.multiple, m.multiple ? [] : "", !1));
            }
            h[Ho] = m;
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 6:
        if (Pn(i, n), Fn(n), c & 4) {
          if (n.stateNode === null) throw Error(r(162));
          h = n.stateNode, m = n.memoizedProps;
          try {
            h.nodeValue = m;
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 3:
        if (Pn(i, n), Fn(n), c & 4 && a !== null && a.memoizedState.isDehydrated) try {
          Oo(i.containerInfo);
        } catch (ye) {
          et(n, n.return, ye);
        }
        break;
      case 4:
        Pn(i, n), Fn(n);
        break;
      case 13:
        Pn(i, n), Fn(n), h = n.child, h.flags & 8192 && (m = h.memoizedState !== null, h.stateNode.isHidden = m, !m || h.alternate !== null && h.alternate.memoizedState !== null || (Nd = rt())), c & 4 && Im(n);
        break;
      case 22:
        if (re = a !== null && a.memoizedState !== null, n.mode & 1 ? (Nt = (Z = Nt) || re, Pn(i, n), Nt = Z) : Pn(i, n), Fn(n), c & 8192) {
          if (Z = n.memoizedState !== null, (n.stateNode.isHidden = Z) && !re && (n.mode & 1) !== 0) for (ge = n, re = n.child; re !== null; ) {
            for (ae = ge = re; ge !== null; ) {
              switch (ne = ge, pe = ne.child, ne.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ns(4, ne, ne.return);
                  break;
                case 1:
                  Ki(ne, ne.return);
                  var me = ne.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    c = ne, a = ne.return;
                    try {
                      i = c, me.props = i.memoizedProps, me.state = i.memoizedState, me.componentWillUnmount();
                    } catch (ye) {
                      et(c, a, ye);
                    }
                  }
                  break;
                case 5:
                  Ki(ne, ne.return);
                  break;
                case 22:
                  if (ne.memoizedState !== null) {
                    Dm(ae);
                    continue;
                  }
              }
              pe !== null ? (pe.return = ne, ge = pe) : Dm(ae);
            }
            re = re.sibling;
          }
          e: for (re = null, ae = n; ; ) {
            if (ae.tag === 5) {
              if (re === null) {
                re = ae;
                try {
                  h = ae.stateNode, Z ? (m = h.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none") : (z = ae.stateNode, q = ae.memoizedProps.style, $ = q != null && q.hasOwnProperty("display") ? q.display : null, z.style.display = gh("display", $));
                } catch (ye) {
                  et(n, n.return, ye);
                }
              }
            } else if (ae.tag === 6) {
              if (re === null) try {
                ae.stateNode.nodeValue = Z ? "" : ae.memoizedProps;
              } catch (ye) {
                et(n, n.return, ye);
              }
            } else if ((ae.tag !== 22 && ae.tag !== 23 || ae.memoizedState === null || ae === n) && ae.child !== null) {
              ae.child.return = ae, ae = ae.child;
              continue;
            }
            if (ae === n) break e;
            for (; ae.sibling === null; ) {
              if (ae.return === null || ae.return === n) break e;
              re === ae && (re = null), ae = ae.return;
            }
            re === ae && (re = null), ae.sibling.return = ae.return, ae = ae.sibling;
          }
        }
        break;
      case 19:
        Pn(i, n), Fn(n), c & 4 && Im(n);
        break;
      case 21:
        break;
      default:
        Pn(
          i,
          n
        ), Fn(n);
    }
  }
  function Fn(n) {
    var i = n.flags;
    if (i & 2) {
      try {
        e: {
          for (var a = n.return; a !== null; ) {
            if ($m(a)) {
              var c = a;
              break e;
            }
            a = a.return;
          }
          throw Error(r(160));
        }
        switch (c.tag) {
          case 5:
            var h = c.stateNode;
            c.flags & 32 && (xo(h, ""), c.flags &= -33);
            var m = Mm(n);
            Ad(n, m, h);
            break;
          case 3:
          case 4:
            var $ = c.stateNode.containerInfo, z = Mm(n);
            Md(n, z, $);
            break;
          default:
            throw Error(r(161));
        }
      } catch (q) {
        et(n, n.return, q);
      }
      n.flags &= -3;
    }
    i & 4096 && (n.flags &= -4097);
  }
  function I_(n, i, a) {
    ge = n, Nm(n);
  }
  function Nm(n, i, a) {
    for (var c = (n.mode & 1) !== 0; ge !== null; ) {
      var h = ge, m = h.child;
      if (h.tag === 22 && c) {
        var $ = h.memoizedState !== null || tl;
        if (!$) {
          var z = h.alternate, q = z !== null && z.memoizedState !== null || Nt;
          z = tl;
          var Z = Nt;
          if (tl = $, (Nt = q) && !Z) for (ge = h; ge !== null; ) $ = ge, q = $.child, $.tag === 22 && $.memoizedState !== null ? Fm(h) : q !== null ? (q.return = $, ge = q) : Fm(h);
          for (; m !== null; ) ge = m, Nm(m), m = m.sibling;
          ge = h, tl = z, Nt = Z;
        }
        Lm(n);
      } else (h.subtreeFlags & 8772) !== 0 && m !== null ? (m.return = h, ge = m) : Lm(n);
    }
  }
  function Lm(n) {
    for (; ge !== null; ) {
      var i = ge;
      if ((i.flags & 8772) !== 0) {
        var a = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              Nt || nl(5, i);
              break;
            case 1:
              var c = i.stateNode;
              if (i.flags & 4 && !Nt) if (a === null) c.componentDidMount();
              else {
                var h = i.elementType === i.type ? a.memoizedProps : Cn(i.type, a.memoizedProps);
                c.componentDidUpdate(h, a.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
              }
              var m = i.updateQueue;
              m !== null && Dg(i, m, c);
              break;
            case 3:
              var $ = i.updateQueue;
              if ($ !== null) {
                if (a = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    a = i.child.stateNode;
                    break;
                  case 1:
                    a = i.child.stateNode;
                }
                Dg(i, $, a);
              }
              break;
            case 5:
              var z = i.stateNode;
              if (a === null && i.flags & 4) {
                a = z;
                var q = i.memoizedProps;
                switch (i.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    q.autoFocus && a.focus();
                    break;
                  case "img":
                    q.src && (a.src = q.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (i.memoizedState === null) {
                var Z = i.alternate;
                if (Z !== null) {
                  var re = Z.memoizedState;
                  if (re !== null) {
                    var ae = re.dehydrated;
                    ae !== null && Oo(ae);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(r(163));
          }
          Nt || i.flags & 512 && $d(i);
        } catch (ne) {
          et(i, i.return, ne);
        }
      }
      if (i === n) {
        ge = null;
        break;
      }
      if (a = i.sibling, a !== null) {
        a.return = i.return, ge = a;
        break;
      }
      ge = i.return;
    }
  }
  function Dm(n) {
    for (; ge !== null; ) {
      var i = ge;
      if (i === n) {
        ge = null;
        break;
      }
      var a = i.sibling;
      if (a !== null) {
        a.return = i.return, ge = a;
        break;
      }
      ge = i.return;
    }
  }
  function Fm(n) {
    for (; ge !== null; ) {
      var i = ge;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var a = i.return;
            try {
              nl(4, i);
            } catch (q) {
              et(i, a, q);
            }
            break;
          case 1:
            var c = i.stateNode;
            if (typeof c.componentDidMount == "function") {
              var h = i.return;
              try {
                c.componentDidMount();
              } catch (q) {
                et(i, h, q);
              }
            }
            var m = i.return;
            try {
              $d(i);
            } catch (q) {
              et(i, m, q);
            }
            break;
          case 5:
            var $ = i.return;
            try {
              $d(i);
            } catch (q) {
              et(i, $, q);
            }
        }
      } catch (q) {
        et(i, i.return, q);
      }
      if (i === n) {
        ge = null;
        break;
      }
      var z = i.sibling;
      if (z !== null) {
        z.return = i.return, ge = z;
        break;
      }
      ge = i.return;
    }
  }
  var O_ = Math.ceil, rl = P.ReactCurrentDispatcher, Id = P.ReactCurrentOwner, pn = P.ReactCurrentBatchConfig, Te = 0, mt = null, at = null, _t = 0, tn = 0, Qi = Pr(0), ft = 0, rs = null, si = 0, il = 0, Od = 0, is = null, Qt = null, Nd = 0, Gi = 1 / 0, ir = null, ol = !1, Ld = null, Ir = null, sl = !1, Or = null, al = 0, os = 0, Dd = null, ll = -1, ul = 0;
  function jt() {
    return (Te & 6) !== 0 ? rt() : ll !== -1 ? ll : ll = rt();
  }
  function Nr(n) {
    return (n.mode & 1) === 0 ? 1 : (Te & 2) !== 0 && _t !== 0 ? _t & -_t : y_.transition !== null ? (ul === 0 && (ul = Mh()), ul) : (n = Le, n !== 0 || (n = window.event, n = n === void 0 ? 16 : jh(n.type)), n);
  }
  function Rn(n, i, a, c) {
    if (50 < os) throw os = 0, Dd = null, Error(r(185));
    To(n, a, c), ((Te & 2) === 0 || n !== mt) && (n === mt && ((Te & 2) === 0 && (il |= a), ft === 4 && Lr(n, _t)), Gt(n, c), a === 1 && Te === 0 && (i.mode & 1) === 0 && (Gi = rt() + 500, Da && Tr()));
  }
  function Gt(n, i) {
    var a = n.callbackNode;
    yb(n, i);
    var c = va(n, n === mt ? _t : 0);
    if (c === 0) a !== null && Rh(a), n.callbackNode = null, n.callbackPriority = 0;
    else if (i = c & -c, n.callbackPriority !== i) {
      if (a != null && Rh(a), i === 1) n.tag === 0 ? m_(jm.bind(null, n)) : Cg(jm.bind(null, n)), f_(function() {
        (Te & 6) === 0 && Tr();
      }), a = null;
      else {
        switch (Ah(c)) {
          case 1:
            a = mc;
            break;
          case 4:
            a = Th;
            break;
          case 16:
            a = ha;
            break;
          case 536870912:
            a = $h;
            break;
          default:
            a = ha;
        }
        a = Qm(a, zm.bind(null, n));
      }
      n.callbackPriority = i, n.callbackNode = a;
    }
  }
  function zm(n, i) {
    if (ll = -1, ul = 0, (Te & 6) !== 0) throw Error(r(327));
    var a = n.callbackNode;
    if (Yi() && n.callbackNode !== a) return null;
    var c = va(n, n === mt ? _t : 0);
    if (c === 0) return null;
    if ((c & 30) !== 0 || (c & n.expiredLanes) !== 0 || i) i = cl(n, c);
    else {
      i = c;
      var h = Te;
      Te |= 2;
      var m = Um();
      (mt !== n || _t !== i) && (ir = null, Gi = rt() + 500, li(n, i));
      do
        try {
          D_();
          break;
        } catch (z) {
          Bm(n, z);
        }
      while (!0);
      td(), rl.current = m, Te = h, at !== null ? i = 0 : (mt = null, _t = 0, i = ft);
    }
    if (i !== 0) {
      if (i === 2 && (h = yc(n), h !== 0 && (c = h, i = Fd(n, h))), i === 1) throw a = rs, li(n, 0), Lr(n, c), Gt(n, rt()), a;
      if (i === 6) Lr(n, c);
      else {
        if (h = n.current.alternate, (c & 30) === 0 && !N_(h) && (i = cl(n, c), i === 2 && (m = yc(n), m !== 0 && (c = m, i = Fd(n, m))), i === 1)) throw a = rs, li(n, 0), Lr(n, c), Gt(n, rt()), a;
        switch (n.finishedWork = h, n.finishedLanes = c, i) {
          case 0:
          case 1:
            throw Error(r(345));
          case 2:
            ui(n, Qt, ir);
            break;
          case 3:
            if (Lr(n, c), (c & 130023424) === c && (i = Nd + 500 - rt(), 10 < i)) {
              if (va(n, 0) !== 0) break;
              if (h = n.suspendedLanes, (h & c) !== c) {
                jt(), n.pingedLanes |= n.suspendedLanes & h;
                break;
              }
              n.timeoutHandle = Vc(ui.bind(null, n, Qt, ir), i);
              break;
            }
            ui(n, Qt, ir);
            break;
          case 4:
            if (Lr(n, c), (c & 4194240) === c) break;
            for (i = n.eventTimes, h = -1; 0 < c; ) {
              var $ = 31 - _n(c);
              m = 1 << $, $ = i[$], $ > h && (h = $), c &= ~m;
            }
            if (c = h, c = rt() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * O_(c / 1960)) - c, 10 < c) {
              n.timeoutHandle = Vc(ui.bind(null, n, Qt, ir), c);
              break;
            }
            ui(n, Qt, ir);
            break;
          case 5:
            ui(n, Qt, ir);
            break;
          default:
            throw Error(r(329));
        }
      }
    }
    return Gt(n, rt()), n.callbackNode === a ? zm.bind(null, n) : null;
  }
  function Fd(n, i) {
    var a = is;
    return n.current.memoizedState.isDehydrated && (li(n, i).flags |= 256), n = cl(n, i), n !== 2 && (i = Qt, Qt = a, i !== null && zd(i)), n;
  }
  function zd(n) {
    Qt === null ? Qt = n : Qt.push.apply(Qt, n);
  }
  function N_(n) {
    for (var i = n; ; ) {
      if (i.flags & 16384) {
        var a = i.updateQueue;
        if (a !== null && (a = a.stores, a !== null)) for (var c = 0; c < a.length; c++) {
          var h = a[c], m = h.getSnapshot;
          h = h.value;
          try {
            if (!xn(m(), h)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (a = i.child, i.subtreeFlags & 16384 && a !== null) a.return = i, i = a;
      else {
        if (i === n) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === n) return !0;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    return !0;
  }
  function Lr(n, i) {
    for (i &= ~Od, i &= ~il, n.suspendedLanes |= i, n.pingedLanes &= ~i, n = n.expirationTimes; 0 < i; ) {
      var a = 31 - _n(i), c = 1 << a;
      n[a] = -1, i &= ~c;
    }
  }
  function jm(n) {
    if ((Te & 6) !== 0) throw Error(r(327));
    Yi();
    var i = va(n, 0);
    if ((i & 1) === 0) return Gt(n, rt()), null;
    var a = cl(n, i);
    if (n.tag !== 0 && a === 2) {
      var c = yc(n);
      c !== 0 && (i = c, a = Fd(n, c));
    }
    if (a === 1) throw a = rs, li(n, 0), Lr(n, i), Gt(n, rt()), a;
    if (a === 6) throw Error(r(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = i, ui(n, Qt, ir), Gt(n, rt()), null;
  }
  function jd(n, i) {
    var a = Te;
    Te |= 1;
    try {
      return n(i);
    } finally {
      Te = a, Te === 0 && (Gi = rt() + 500, Da && Tr());
    }
  }
  function ai(n) {
    Or !== null && Or.tag === 0 && (Te & 6) === 0 && Yi();
    var i = Te;
    Te |= 1;
    var a = pn.transition, c = Le;
    try {
      if (pn.transition = null, Le = 1, n) return n();
    } finally {
      Le = c, pn.transition = a, Te = i, (Te & 6) === 0 && Tr();
    }
  }
  function Bd() {
    tn = Qi.current, He(Qi);
  }
  function li(n, i) {
    n.finishedWork = null, n.finishedLanes = 0;
    var a = n.timeoutHandle;
    if (a !== -1 && (n.timeoutHandle = -1, d_(a)), at !== null) for (a = at.return; a !== null; ) {
      var c = a;
      switch (Yc(c), c.tag) {
        case 1:
          c = c.type.childContextTypes, c != null && Na();
          break;
        case 3:
          Hi(), He(Ht), He(At), ud();
          break;
        case 5:
          ad(c);
          break;
        case 4:
          Hi();
          break;
        case 13:
          He(Ge);
          break;
        case 19:
          He(Ge);
          break;
        case 10:
          nd(c.type._context);
          break;
        case 22:
        case 23:
          Bd();
      }
      a = a.return;
    }
    if (mt = n, at = n = Dr(n.current, null), _t = tn = i, ft = 0, rs = null, Od = il = si = 0, Qt = is = null, ri !== null) {
      for (i = 0; i < ri.length; i++) if (a = ri[i], c = a.interleaved, c !== null) {
        a.interleaved = null;
        var h = c.next, m = a.pending;
        if (m !== null) {
          var $ = m.next;
          m.next = h, c.next = $;
        }
        a.pending = c;
      }
      ri = null;
    }
    return n;
  }
  function Bm(n, i) {
    do {
      var a = at;
      try {
        if (td(), Ka.current = Ja, Qa) {
          for (var c = Ye.memoizedState; c !== null; ) {
            var h = c.queue;
            h !== null && (h.pending = null), c = c.next;
          }
          Qa = !1;
        }
        if (oi = 0, gt = dt = Ye = null, Jo = !1, Xo = 0, Id.current = null, a === null || a.return === null) {
          ft = 1, rs = i, at = null;
          break;
        }
        e: {
          var m = n, $ = a.return, z = a, q = i;
          if (i = _t, z.flags |= 32768, q !== null && typeof q == "object" && typeof q.then == "function") {
            var Z = q, re = z, ae = re.tag;
            if ((re.mode & 1) === 0 && (ae === 0 || ae === 11 || ae === 15)) {
              var ne = re.alternate;
              ne ? (re.updateQueue = ne.updateQueue, re.memoizedState = ne.memoizedState, re.lanes = ne.lanes) : (re.updateQueue = null, re.memoizedState = null);
            }
            var pe = fm($);
            if (pe !== null) {
              pe.flags &= -257, pm(pe, $, z, m, i), pe.mode & 1 && dm(m, Z, i), i = pe, q = Z;
              var me = i.updateQueue;
              if (me === null) {
                var ye = /* @__PURE__ */ new Set();
                ye.add(q), i.updateQueue = ye;
              } else me.add(q);
              break e;
            } else {
              if ((i & 1) === 0) {
                dm(m, Z, i), Ud();
                break e;
              }
              q = Error(r(426));
            }
          } else if (Ke && z.mode & 1) {
            var it = fm($);
            if (it !== null) {
              (it.flags & 65536) === 0 && (it.flags |= 256), pm(it, $, z, m, i), Zc(qi(q, z));
              break e;
            }
          }
          m = q = qi(q, z), ft !== 4 && (ft = 2), is === null ? is = [m] : is.push(m), m = $;
          do {
            switch (m.tag) {
              case 3:
                m.flags |= 65536, i &= -i, m.lanes |= i;
                var J = um(m, q, i);
                Lg(m, J);
                break e;
              case 1:
                z = q;
                var Q = m.type, X = m.stateNode;
                if ((m.flags & 128) === 0 && (typeof Q.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (Ir === null || !Ir.has(X)))) {
                  m.flags |= 65536, i &= -i, m.lanes |= i;
                  var ce = cm(m, z, i);
                  Lg(m, ce);
                  break e;
                }
            }
            m = m.return;
          } while (m !== null);
        }
        Vm(a);
      } catch (ve) {
        i = ve, at === a && a !== null && (at = a = a.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Um() {
    var n = rl.current;
    return rl.current = Ja, n === null ? Ja : n;
  }
  function Ud() {
    (ft === 0 || ft === 3 || ft === 2) && (ft = 4), mt === null || (si & 268435455) === 0 && (il & 268435455) === 0 || Lr(mt, _t);
  }
  function cl(n, i) {
    var a = Te;
    Te |= 2;
    var c = Um();
    (mt !== n || _t !== i) && (ir = null, li(n, i));
    do
      try {
        L_();
        break;
      } catch (h) {
        Bm(n, h);
      }
    while (!0);
    if (td(), Te = a, rl.current = c, at !== null) throw Error(r(261));
    return mt = null, _t = 0, ft;
  }
  function L_() {
    for (; at !== null; ) Wm(at);
  }
  function D_() {
    for (; at !== null && !lb(); ) Wm(at);
  }
  function Wm(n) {
    var i = Km(n.alternate, n, tn);
    n.memoizedProps = n.pendingProps, i === null ? Vm(n) : at = i, Id.current = null;
  }
  function Vm(n) {
    var i = n;
    do {
      var a = i.alternate;
      if (n = i.return, (i.flags & 32768) === 0) {
        if (a = T_(a, i, tn), a !== null) {
          at = a;
          return;
        }
      } else {
        if (a = $_(a, i), a !== null) {
          a.flags &= 32767, at = a;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          ft = 6, at = null;
          return;
        }
      }
      if (i = i.sibling, i !== null) {
        at = i;
        return;
      }
      at = i = n;
    } while (i !== null);
    ft === 0 && (ft = 5);
  }
  function ui(n, i, a) {
    var c = Le, h = pn.transition;
    try {
      pn.transition = null, Le = 1, F_(n, i, a, c);
    } finally {
      pn.transition = h, Le = c;
    }
    return null;
  }
  function F_(n, i, a, c) {
    do
      Yi();
    while (Or !== null);
    if ((Te & 6) !== 0) throw Error(r(327));
    a = n.finishedWork;
    var h = n.finishedLanes;
    if (a === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, a === n.current) throw Error(r(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var m = a.lanes | a.childLanes;
    if (vb(n, m), n === mt && (at = mt = null, _t = 0), (a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0 || sl || (sl = !0, Qm(ha, function() {
      return Yi(), null;
    })), m = (a.flags & 15990) !== 0, (a.subtreeFlags & 15990) !== 0 || m) {
      m = pn.transition, pn.transition = null;
      var $ = Le;
      Le = 1;
      var z = Te;
      Te |= 4, Id.current = null, A_(n, a), Om(a, n), i_(Uc), ba = !!Bc, Uc = Bc = null, n.current = a, I_(a), ub(), Te = z, Le = $, pn.transition = m;
    } else n.current = a;
    if (sl && (sl = !1, Or = n, al = h), m = n.pendingLanes, m === 0 && (Ir = null), fb(a.stateNode), Gt(n, rt()), i !== null) for (c = n.onRecoverableError, a = 0; a < i.length; a++) h = i[a], c(h.value, { componentStack: h.stack, digest: h.digest });
    if (ol) throw ol = !1, n = Ld, Ld = null, n;
    return (al & 1) !== 0 && n.tag !== 0 && Yi(), m = n.pendingLanes, (m & 1) !== 0 ? n === Dd ? os++ : (os = 0, Dd = n) : os = 0, Tr(), null;
  }
  function Yi() {
    if (Or !== null) {
      var n = Ah(al), i = pn.transition, a = Le;
      try {
        if (pn.transition = null, Le = 16 > n ? 16 : n, Or === null) var c = !1;
        else {
          if (n = Or, Or = null, al = 0, (Te & 6) !== 0) throw Error(r(331));
          var h = Te;
          for (Te |= 4, ge = n.current; ge !== null; ) {
            var m = ge, $ = m.child;
            if ((ge.flags & 16) !== 0) {
              var z = m.deletions;
              if (z !== null) {
                for (var q = 0; q < z.length; q++) {
                  var Z = z[q];
                  for (ge = Z; ge !== null; ) {
                    var re = ge;
                    switch (re.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ns(8, re, m);
                    }
                    var ae = re.child;
                    if (ae !== null) ae.return = re, ge = ae;
                    else for (; ge !== null; ) {
                      re = ge;
                      var ne = re.sibling, pe = re.return;
                      if (Tm(re), re === Z) {
                        ge = null;
                        break;
                      }
                      if (ne !== null) {
                        ne.return = pe, ge = ne;
                        break;
                      }
                      ge = pe;
                    }
                  }
                }
                var me = m.alternate;
                if (me !== null) {
                  var ye = me.child;
                  if (ye !== null) {
                    me.child = null;
                    do {
                      var it = ye.sibling;
                      ye.sibling = null, ye = it;
                    } while (ye !== null);
                  }
                }
                ge = m;
              }
            }
            if ((m.subtreeFlags & 2064) !== 0 && $ !== null) $.return = m, ge = $;
            else e: for (; ge !== null; ) {
              if (m = ge, (m.flags & 2048) !== 0) switch (m.tag) {
                case 0:
                case 11:
                case 15:
                  ns(9, m, m.return);
              }
              var J = m.sibling;
              if (J !== null) {
                J.return = m.return, ge = J;
                break e;
              }
              ge = m.return;
            }
          }
          var Q = n.current;
          for (ge = Q; ge !== null; ) {
            $ = ge;
            var X = $.child;
            if (($.subtreeFlags & 2064) !== 0 && X !== null) X.return = $, ge = X;
            else e: for ($ = Q; ge !== null; ) {
              if (z = ge, (z.flags & 2048) !== 0) try {
                switch (z.tag) {
                  case 0:
                  case 11:
                  case 15:
                    nl(9, z);
                }
              } catch (ve) {
                et(z, z.return, ve);
              }
              if (z === $) {
                ge = null;
                break e;
              }
              var ce = z.sibling;
              if (ce !== null) {
                ce.return = z.return, ge = ce;
                break e;
              }
              ge = z.return;
            }
          }
          if (Te = h, Tr(), On && typeof On.onPostCommitFiberRoot == "function") try {
            On.onPostCommitFiberRoot(ga, n);
          } catch {
          }
          c = !0;
        }
        return c;
      } finally {
        Le = a, pn.transition = i;
      }
    }
    return !1;
  }
  function Hm(n, i, a) {
    i = qi(a, i), i = um(n, i, 1), n = Mr(n, i, 1), i = jt(), n !== null && (To(n, 1, i), Gt(n, i));
  }
  function et(n, i, a) {
    if (n.tag === 3) Hm(n, n, a);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        Hm(i, n, a);
        break;
      } else if (i.tag === 1) {
        var c = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Ir === null || !Ir.has(c))) {
          n = qi(a, n), n = cm(i, n, 1), i = Mr(i, n, 1), n = jt(), i !== null && (To(i, 1, n), Gt(i, n));
          break;
        }
      }
      i = i.return;
    }
  }
  function z_(n, i, a) {
    var c = n.pingCache;
    c !== null && c.delete(i), i = jt(), n.pingedLanes |= n.suspendedLanes & a, mt === n && (_t & a) === a && (ft === 4 || ft === 3 && (_t & 130023424) === _t && 500 > rt() - Nd ? li(n, 0) : Od |= a), Gt(n, i);
  }
  function qm(n, i) {
    i === 0 && ((n.mode & 1) === 0 ? i = 1 : (i = ya, ya <<= 1, (ya & 130023424) === 0 && (ya = 4194304)));
    var a = jt();
    n = tr(n, i), n !== null && (To(n, i, a), Gt(n, a));
  }
  function j_(n) {
    var i = n.memoizedState, a = 0;
    i !== null && (a = i.retryLane), qm(n, a);
  }
  function B_(n, i) {
    var a = 0;
    switch (n.tag) {
      case 13:
        var c = n.stateNode, h = n.memoizedState;
        h !== null && (a = h.retryLane);
        break;
      case 19:
        c = n.stateNode;
        break;
      default:
        throw Error(r(314));
    }
    c !== null && c.delete(i), qm(n, a);
  }
  var Km;
  Km = function(n, i, a) {
    if (n !== null) if (n.memoizedProps !== i.pendingProps || Ht.current) Kt = !0;
    else {
      if ((n.lanes & a) === 0 && (i.flags & 128) === 0) return Kt = !1, R_(n, i, a);
      Kt = (n.flags & 131072) !== 0;
    }
    else Kt = !1, Ke && (i.flags & 1048576) !== 0 && Eg(i, za, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var c = i.type;
        el(n, i), n = i.pendingProps;
        var h = Fi(i, At.current);
        Vi(i, a), h = fd(null, i, c, n, h, a);
        var m = pd();
        return i.flags |= 1, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, qt(c) ? (m = !0, La(i)) : m = !1, i.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, od(i), h.updater = Xa, i.stateNode = h, h._reactInternals = i, wd(i, c, n, a), i = xd(null, i, c, !0, m, a)) : (i.tag = 0, Ke && m && Gc(i), zt(null, i, h, a), i = i.child), i;
      case 16:
        c = i.elementType;
        e: {
          switch (el(n, i), n = i.pendingProps, h = c._init, c = h(c._payload), i.type = c, h = i.tag = W_(c), n = Cn(c, n), h) {
            case 0:
              i = _d(null, i, c, n, a);
              break e;
            case 1:
              i = wm(null, i, c, n, a);
              break e;
            case 11:
              i = hm(null, i, c, n, a);
              break e;
            case 14:
              i = gm(null, i, c, Cn(c.type, n), a);
              break e;
          }
          throw Error(r(
            306,
            c,
            ""
          ));
        }
        return i;
      case 0:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Cn(c, h), _d(n, i, c, h, a);
      case 1:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Cn(c, h), wm(n, i, c, h, a);
      case 3:
        e: {
          if (Sm(i), n === null) throw Error(r(387));
          c = i.pendingProps, m = i.memoizedState, h = m.element, Ng(n, i), Ha(i, c, null, a);
          var $ = i.memoizedState;
          if (c = $.element, m.isDehydrated) if (m = { element: c, isDehydrated: !1, cache: $.cache, pendingSuspenseBoundaries: $.pendingSuspenseBoundaries, transitions: $.transitions }, i.updateQueue.baseState = m, i.memoizedState = m, i.flags & 256) {
            h = qi(Error(r(423)), i), i = bm(n, i, c, a, h);
            break e;
          } else if (c !== h) {
            h = qi(Error(r(424)), i), i = bm(n, i, c, a, h);
            break e;
          } else for (en = Er(i.stateNode.containerInfo.firstChild), Zt = i, Ke = !0, kn = null, a = Ig(i, null, c, a), i.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Bi(), c === h) {
              i = rr(n, i, a);
              break e;
            }
            zt(n, i, c, a);
          }
          i = i.child;
        }
        return i;
      case 5:
        return Fg(i), n === null && Xc(i), c = i.type, h = i.pendingProps, m = n !== null ? n.memoizedProps : null, $ = h.children, Wc(c, h) ? $ = null : m !== null && Wc(c, m) && (i.flags |= 32), vm(n, i), zt(n, i, $, a), i.child;
      case 6:
        return n === null && Xc(i), null;
      case 13:
        return _m(n, i, a);
      case 4:
        return sd(i, i.stateNode.containerInfo), c = i.pendingProps, n === null ? i.child = Ui(i, null, c, a) : zt(n, i, c, a), i.child;
      case 11:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Cn(c, h), hm(n, i, c, h, a);
      case 7:
        return zt(n, i, i.pendingProps, a), i.child;
      case 8:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 12:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 10:
        e: {
          if (c = i.type._context, h = i.pendingProps, m = i.memoizedProps, $ = h.value, Ue(Ua, c._currentValue), c._currentValue = $, m !== null) if (xn(m.value, $)) {
            if (m.children === h.children && !Ht.current) {
              i = rr(n, i, a);
              break e;
            }
          } else for (m = i.child, m !== null && (m.return = i); m !== null; ) {
            var z = m.dependencies;
            if (z !== null) {
              $ = m.child;
              for (var q = z.firstContext; q !== null; ) {
                if (q.context === c) {
                  if (m.tag === 1) {
                    q = nr(-1, a & -a), q.tag = 2;
                    var Z = m.updateQueue;
                    if (Z !== null) {
                      Z = Z.shared;
                      var re = Z.pending;
                      re === null ? q.next = q : (q.next = re.next, re.next = q), Z.pending = q;
                    }
                  }
                  m.lanes |= a, q = m.alternate, q !== null && (q.lanes |= a), rd(
                    m.return,
                    a,
                    i
                  ), z.lanes |= a;
                  break;
                }
                q = q.next;
              }
            } else if (m.tag === 10) $ = m.type === i.type ? null : m.child;
            else if (m.tag === 18) {
              if ($ = m.return, $ === null) throw Error(r(341));
              $.lanes |= a, z = $.alternate, z !== null && (z.lanes |= a), rd($, a, i), $ = m.sibling;
            } else $ = m.child;
            if ($ !== null) $.return = m;
            else for ($ = m; $ !== null; ) {
              if ($ === i) {
                $ = null;
                break;
              }
              if (m = $.sibling, m !== null) {
                m.return = $.return, $ = m;
                break;
              }
              $ = $.return;
            }
            m = $;
          }
          zt(n, i, h.children, a), i = i.child;
        }
        return i;
      case 9:
        return h = i.type, c = i.pendingProps.children, Vi(i, a), h = dn(h), c = c(h), i.flags |= 1, zt(n, i, c, a), i.child;
      case 14:
        return c = i.type, h = Cn(c, i.pendingProps), h = Cn(c.type, h), gm(n, i, c, h, a);
      case 15:
        return mm(n, i, i.type, i.pendingProps, a);
      case 17:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Cn(c, h), el(n, i), i.tag = 1, qt(c) ? (n = !0, La(i)) : n = !1, Vi(i, a), am(i, c, h), wd(i, c, h, a), xd(null, i, c, !0, n, a);
      case 19:
        return km(n, i, a);
      case 22:
        return ym(n, i, a);
    }
    throw Error(r(156, i.tag));
  };
  function Qm(n, i) {
    return Ph(n, i);
  }
  function U_(n, i, a, c) {
    this.tag = n, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function hn(n, i, a, c) {
    return new U_(n, i, a, c);
  }
  function Wd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function W_(n) {
    if (typeof n == "function") return Wd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === N) return 11;
      if (n === j) return 14;
    }
    return 2;
  }
  function Dr(n, i) {
    var a = n.alternate;
    return a === null ? (a = hn(n.tag, i, n.key, n.mode), a.elementType = n.elementType, a.type = n.type, a.stateNode = n.stateNode, a.alternate = n, n.alternate = a) : (a.pendingProps = i, a.type = n.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = n.flags & 14680064, a.childLanes = n.childLanes, a.lanes = n.lanes, a.child = n.child, a.memoizedProps = n.memoizedProps, a.memoizedState = n.memoizedState, a.updateQueue = n.updateQueue, i = n.dependencies, a.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, a.sibling = n.sibling, a.index = n.index, a.ref = n.ref, a;
  }
  function dl(n, i, a, c, h, m) {
    var $ = 2;
    if (c = n, typeof n == "function") Wd(n) && ($ = 1);
    else if (typeof n == "string") $ = 5;
    else e: switch (n) {
      case A:
        return ci(a.children, h, m, i);
      case I:
        $ = 8, h |= 8;
        break;
      case L:
        return n = hn(12, a, i, h | 2), n.elementType = L, n.lanes = m, n;
      case V:
        return n = hn(13, a, i, h), n.elementType = V, n.lanes = m, n;
      case F:
        return n = hn(19, a, i, h), n.elementType = F, n.lanes = m, n;
      case Y:
        return fl(a, h, m, i);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case w:
            $ = 10;
            break e;
          case T:
            $ = 9;
            break e;
          case N:
            $ = 11;
            break e;
          case j:
            $ = 14;
            break e;
          case H:
            $ = 16, c = null;
            break e;
        }
        throw Error(r(130, n == null ? n : typeof n, ""));
    }
    return i = hn($, a, i, h), i.elementType = n, i.type = c, i.lanes = m, i;
  }
  function ci(n, i, a, c) {
    return n = hn(7, n, c, i), n.lanes = a, n;
  }
  function fl(n, i, a, c) {
    return n = hn(22, n, c, i), n.elementType = Y, n.lanes = a, n.stateNode = { isHidden: !1 }, n;
  }
  function Vd(n, i, a) {
    return n = hn(6, n, null, i), n.lanes = a, n;
  }
  function Hd(n, i, a) {
    return i = hn(4, n.children !== null ? n.children : [], n.key, i), i.lanes = a, i.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, i;
  }
  function V_(n, i, a, c, h) {
    this.tag = i, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = vc(0), this.expirationTimes = vc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = vc(0), this.identifierPrefix = c, this.onRecoverableError = h, this.mutableSourceEagerHydrationData = null;
  }
  function qd(n, i, a, c, h, m, $, z, q) {
    return n = new V_(n, i, a, z, q), i === 1 ? (i = 1, m === !0 && (i |= 8)) : i = 0, m = hn(3, null, null, i), n.current = m, m.stateNode = n, m.memoizedState = { element: c, isDehydrated: a, cache: null, transitions: null, pendingSuspenseBoundaries: null }, od(m), n;
  }
  function H_(n, i, a) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: M, key: c == null ? null : "" + c, children: n, containerInfo: i, implementation: a };
  }
  function Gm(n) {
    if (!n) return Rr;
    n = n._reactInternals;
    e: {
      if (Xr(n) !== n || n.tag !== 1) throw Error(r(170));
      var i = n;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (qt(i.type)) {
              i = i.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        i = i.return;
      } while (i !== null);
      throw Error(r(171));
    }
    if (n.tag === 1) {
      var a = n.type;
      if (qt(a)) return xg(n, a, i);
    }
    return i;
  }
  function Ym(n, i, a, c, h, m, $, z, q) {
    return n = qd(a, c, !0, n, h, m, $, z, q), n.context = Gm(null), a = n.current, c = jt(), h = Nr(a), m = nr(c, h), m.callback = i ?? null, Mr(a, m, h), n.current.lanes = h, To(n, h, c), Gt(n, c), n;
  }
  function pl(n, i, a, c) {
    var h = i.current, m = jt(), $ = Nr(h);
    return a = Gm(a), i.context === null ? i.context = a : i.pendingContext = a, i = nr(m, $), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = Mr(h, i, $), n !== null && (Rn(n, h, $, m), Va(n, h, $)), $;
  }
  function hl(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Jm(n, i) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var a = n.retryLane;
      n.retryLane = a !== 0 && a < i ? a : i;
    }
  }
  function Kd(n, i) {
    Jm(n, i), (n = n.alternate) && Jm(n, i);
  }
  function q_() {
    return null;
  }
  var Xm = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Qd(n) {
    this._internalRoot = n;
  }
  gl.prototype.render = Qd.prototype.render = function(n) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    pl(n, i, null, null);
  }, gl.prototype.unmount = Qd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var i = n.containerInfo;
      ai(function() {
        pl(null, n, null, null);
      }), i[Jn] = null;
    }
  };
  function gl(n) {
    this._internalRoot = n;
  }
  gl.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var i = Nh();
      n = { blockedOn: null, target: n, priority: i };
      for (var a = 0; a < xr.length && i !== 0 && i < xr[a].priority; a++) ;
      xr.splice(a, 0, n), a === 0 && Fh(n);
    }
  };
  function Gd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function ml(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Zm() {
  }
  function K_(n, i, a, c, h) {
    if (h) {
      if (typeof c == "function") {
        var m = c;
        c = function() {
          var Z = hl($);
          m.call(Z);
        };
      }
      var $ = Ym(i, c, n, 0, null, !1, !1, "", Zm);
      return n._reactRootContainer = $, n[Jn] = $.current, Wo(n.nodeType === 8 ? n.parentNode : n), ai(), $;
    }
    for (; h = n.lastChild; ) n.removeChild(h);
    if (typeof c == "function") {
      var z = c;
      c = function() {
        var Z = hl(q);
        z.call(Z);
      };
    }
    var q = qd(n, 0, !1, null, null, !1, !1, "", Zm);
    return n._reactRootContainer = q, n[Jn] = q.current, Wo(n.nodeType === 8 ? n.parentNode : n), ai(function() {
      pl(i, q, a, c);
    }), q;
  }
  function yl(n, i, a, c, h) {
    var m = a._reactRootContainer;
    if (m) {
      var $ = m;
      if (typeof h == "function") {
        var z = h;
        h = function() {
          var q = hl($);
          z.call(q);
        };
      }
      pl(i, $, n, h);
    } else $ = K_(a, i, n, h, c);
    return hl($);
  }
  Ih = function(n) {
    switch (n.tag) {
      case 3:
        var i = n.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var a = Ro(i.pendingLanes);
          a !== 0 && (wc(i, a | 1), Gt(i, rt()), (Te & 6) === 0 && (Gi = rt() + 500, Tr()));
        }
        break;
      case 13:
        ai(function() {
          var c = tr(n, 1);
          if (c !== null) {
            var h = jt();
            Rn(c, n, 1, h);
          }
        }), Kd(n, 1);
    }
  }, Sc = function(n) {
    if (n.tag === 13) {
      var i = tr(n, 134217728);
      if (i !== null) {
        var a = jt();
        Rn(i, n, 134217728, a);
      }
      Kd(n, 134217728);
    }
  }, Oh = function(n) {
    if (n.tag === 13) {
      var i = Nr(n), a = tr(n, i);
      if (a !== null) {
        var c = jt();
        Rn(a, n, i, c);
      }
      Kd(n, i);
    }
  }, Nh = function() {
    return Le;
  }, Lh = function(n, i) {
    var a = Le;
    try {
      return Le = n, i();
    } finally {
      Le = a;
    }
  }, fc = function(n, i, a) {
    switch (i) {
      case "input":
        if (Ze(n, a), i = a.name, a.type === "radio" && i != null) {
          for (a = n; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < a.length; i++) {
            var c = a[i];
            if (c !== n && c.form === n.form) {
              var h = Oa(c);
              if (!h) throw Error(r(90));
              _e(c), Ze(c, h);
            }
          }
        }
        break;
      case "textarea":
        Tt(n, a);
        break;
      case "select":
        i = a.value, i != null && We(n, !!a.multiple, i, !1);
    }
  }, Sh = jd, bh = ai;
  var Q_ = { usingClientEntryPoint: !1, Events: [qo, Li, Oa, vh, wh, jd] }, ss = { findFiberByHostInstance: Zr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, G_ = { bundleType: ss.bundleType, version: ss.version, rendererPackageName: ss.rendererPackageName, rendererConfig: ss.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: P.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Ch(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ss.findFiberByHostInstance || q_, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      ga = vl.inject(G_), On = vl;
    } catch {
    }
  }
  return Yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q_, Yt.createPortal = function(n, i) {
    var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Gd(i)) throw Error(r(200));
    return H_(n, i, null, a);
  }, Yt.createRoot = function(n, i) {
    if (!Gd(n)) throw Error(r(299));
    var a = !1, c = "", h = Xm;
    return i != null && (i.unstable_strictMode === !0 && (a = !0), i.identifierPrefix !== void 0 && (c = i.identifierPrefix), i.onRecoverableError !== void 0 && (h = i.onRecoverableError)), i = qd(n, 1, !1, null, null, a, !1, c, h), n[Jn] = i.current, Wo(n.nodeType === 8 ? n.parentNode : n), new Qd(i);
  }, Yt.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var i = n._reactInternals;
    if (i === void 0)
      throw typeof n.render == "function" ? Error(r(188)) : (n = Object.keys(n).join(","), Error(r(268, n)));
    return n = Ch(i), n = n === null ? null : n.stateNode, n;
  }, Yt.flushSync = function(n) {
    return ai(n);
  }, Yt.hydrate = function(n, i, a) {
    if (!ml(i)) throw Error(r(200));
    return yl(null, n, i, !0, a);
  }, Yt.hydrateRoot = function(n, i, a) {
    if (!Gd(n)) throw Error(r(405));
    var c = a != null && a.hydratedSources || null, h = !1, m = "", $ = Xm;
    if (a != null && (a.unstable_strictMode === !0 && (h = !0), a.identifierPrefix !== void 0 && (m = a.identifierPrefix), a.onRecoverableError !== void 0 && ($ = a.onRecoverableError)), i = Ym(i, null, n, 1, a ?? null, h, !1, m, $), n[Jn] = i.current, Wo(n), c) for (n = 0; n < c.length; n++) a = c[n], h = a._getVersion, h = h(a._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [a, h] : i.mutableSourceEagerHydrationData.push(
      a,
      h
    );
    return new gl(i);
  }, Yt.render = function(n, i, a) {
    if (!ml(i)) throw Error(r(200));
    return yl(null, n, i, !1, a);
  }, Yt.unmountComponentAtNode = function(n) {
    if (!ml(n)) throw Error(r(40));
    return n._reactRootContainer ? (ai(function() {
      yl(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Jn] = null;
      });
    }), !0) : !1;
  }, Yt.unstable_batchedUpdates = jd, Yt.unstable_renderSubtreeIntoContainer = function(n, i, a, c) {
    if (!ml(a)) throw Error(r(200));
    if (n == null || n._reactInternals === void 0) throw Error(r(38));
    return yl(n, i, a, !1, c);
  }, Yt.version = "18.3.1-next-f1338f8080-20240426", Yt;
}
var Qy;
function A0() {
  if (Qy) return df.exports;
  Qy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), df.exports = UC(), df.exports;
}
var I0 = A0();
const xl = /* @__PURE__ */ Qr(I0), Gy = {
  disabled: !1
}, uu = Wt.createContext(null);
var WC = function(t) {
  return t.scrollTop;
}, Ss = "unmounted", hi = "exited", gi = "entering", so = "entered", Hf = "exiting", Qn = /* @__PURE__ */ function(e) {
  M0(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = s, d = u && !u.isMounting ? o.enter : o.appear, p;
    return l.appearStatus = null, o.in ? d ? (p = hi, l.appearStatus = gi) : p = so : o.unmountOnExit || o.mountOnEnter ? p = Ss : p = hi, l.state = {
      status: p
    }, l.nextCallback = null, l;
  }
  t.getDerivedStateFromProps = function(s, l) {
    var u = s.in;
    return u && l.status === Ss ? {
      status: hi
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(s) {
    var l = null;
    if (s !== this.props) {
      var u = this.state.status;
      this.props.in ? u !== gi && u !== so && (l = gi) : (u === gi || u === so) && (l = Hf);
    }
    this.updateStatus(!1, l);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var s = this.props.timeout, l, u, d;
    return l = u = d = s, s != null && typeof s != "number" && (l = s.exit, u = s.enter, d = s.appear !== void 0 ? s.appear : u), {
      exit: l,
      enter: u,
      appear: d
    };
  }, r.updateStatus = function(s, l) {
    if (s === void 0 && (s = !1), l !== null)
      if (this.cancelNextCallback(), l === gi) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var u = this.props.nodeRef ? this.props.nodeRef.current : xl.findDOMNode(this);
          u && WC(u);
        }
        this.performEnter(s);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === hi && this.setState({
      status: Ss
    });
  }, r.performEnter = function(s) {
    var l = this, u = this.props.enter, d = this.context ? this.context.isMounting : s, p = this.props.nodeRef ? [d] : [xl.findDOMNode(this), d], f = p[0], g = p[1], y = this.getTimeouts(), v = d ? y.appear : y.enter;
    if (!s && !u || Gy.disabled) {
      this.safeSetState({
        status: so
      }, function() {
        l.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, g), this.safeSetState({
      status: gi
    }, function() {
      l.props.onEntering(f, g), l.onTransitionEnd(v, function() {
        l.safeSetState({
          status: so
        }, function() {
          l.props.onEntered(f, g);
        });
      });
    });
  }, r.performExit = function() {
    var s = this, l = this.props.exit, u = this.getTimeouts(), d = this.props.nodeRef ? void 0 : xl.findDOMNode(this);
    if (!l || Gy.disabled) {
      this.safeSetState({
        status: hi
      }, function() {
        s.props.onExited(d);
      });
      return;
    }
    this.props.onExit(d), this.safeSetState({
      status: Hf
    }, function() {
      s.props.onExiting(d), s.onTransitionEnd(u.exit, function() {
        s.safeSetState({
          status: hi
        }, function() {
          s.props.onExited(d);
        });
      });
    });
  }, r.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, r.safeSetState = function(s, l) {
    l = this.setNextCallback(l), this.setState(s, l);
  }, r.setNextCallback = function(s) {
    var l = this, u = !0;
    return this.nextCallback = function(d) {
      u && (u = !1, l.nextCallback = null, s(d));
    }, this.nextCallback.cancel = function() {
      u = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(s, l) {
    this.setNextCallback(l);
    var u = this.props.nodeRef ? this.props.nodeRef.current : xl.findDOMNode(this), d = s == null && !this.props.addEndListener;
    if (!u || d) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var p = this.props.nodeRef ? [this.nextCallback] : [u, this.nextCallback], f = p[0], g = p[1];
      this.props.addEndListener(f, g);
    }
    s != null && setTimeout(this.nextCallback, s);
  }, r.render = function() {
    var s = this.state.status;
    if (s === Ss)
      return null;
    var l = this.props, u = l.children;
    l.in, l.mountOnEnter, l.unmountOnExit, l.appear, l.enter, l.exit, l.timeout, l.addEndListener, l.onEnter, l.onEntering, l.onEntered, l.onExit, l.onExiting, l.onExited, l.nodeRef;
    var d = $0(l, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Wt.createElement(uu.Provider, {
        value: null
      }, typeof u == "function" ? u(s, d) : Wt.cloneElement(Wt.Children.only(u), d))
    );
  }, t;
}(Wt.Component);
Qn.contextType = uu;
Qn.propTypes = {};
function no() {
}
Qn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: no,
  onEntering: no,
  onEntered: no,
  onExit: no,
  onExiting: no,
  onExited: no
};
Qn.UNMOUNTED = Ss;
Qn.EXITED = hi;
Qn.ENTERING = gi;
Qn.ENTERED = so;
Qn.EXITING = Hf;
function VC(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function qp(e, t) {
  var r = function(l) {
    return t && k.isValidElement(l) ? t(l) : l;
  }, o = /* @__PURE__ */ Object.create(null);
  return e && k.Children.map(e, function(s) {
    return s;
  }).forEach(function(s) {
    o[s.key] = r(s);
  }), o;
}
function HC(e, t) {
  e = e || {}, t = t || {};
  function r(g) {
    return g in t ? t[g] : e[g];
  }
  var o = /* @__PURE__ */ Object.create(null), s = [];
  for (var l in e)
    l in t ? s.length && (o[l] = s, s = []) : s.push(l);
  var u, d = {};
  for (var p in t) {
    if (o[p])
      for (u = 0; u < o[p].length; u++) {
        var f = o[p][u];
        d[o[p][u]] = r(f);
      }
    d[p] = r(p);
  }
  for (u = 0; u < s.length; u++)
    d[s[u]] = r(s[u]);
  return d;
}
function vi(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function qC(e, t) {
  return qp(e.children, function(r) {
    return k.cloneElement(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: vi(r, "appear", e),
      enter: vi(r, "enter", e),
      exit: vi(r, "exit", e)
    });
  });
}
function KC(e, t, r) {
  var o = qp(e.children), s = HC(t, o);
  return Object.keys(s).forEach(function(l) {
    var u = s[l];
    if (k.isValidElement(u)) {
      var d = l in t, p = l in o, f = t[l], g = k.isValidElement(f) && !f.props.in;
      p && (!d || g) ? s[l] = k.cloneElement(u, {
        onExited: r.bind(null, u),
        in: !0,
        exit: vi(u, "exit", e),
        enter: vi(u, "enter", e)
      }) : !p && d && !g ? s[l] = k.cloneElement(u, {
        in: !1
      }) : p && d && k.isValidElement(f) && (s[l] = k.cloneElement(u, {
        onExited: r.bind(null, u),
        in: f.props.in,
        exit: vi(u, "exit", e),
        enter: vi(u, "enter", e)
      }));
    }
  }), s;
}
var QC = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, GC = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, Kp = /* @__PURE__ */ function(e) {
  M0(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = l.handleExited.bind(VC(l));
    return l.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: u,
      firstRender: !0
    }, l;
  }
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, r.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(s, l) {
    var u = l.children, d = l.handleExited, p = l.firstRender;
    return {
      children: p ? qC(s, d) : KC(s, u, d),
      firstRender: !1
    };
  }, r.handleExited = function(s, l) {
    var u = qp(this.props.children);
    s.key in u || (s.props.onExited && s.props.onExited(l), this.mounted && this.setState(function(d) {
      var p = ou({}, d.children);
      return delete p[s.key], {
        children: p
      };
    }));
  }, r.render = function() {
    var s = this.props, l = s.component, u = s.childFactory, d = $0(s, ["component", "childFactory"]), p = this.state.contextValue, f = QC(this.state.children).map(u);
    return delete d.appear, delete d.enter, delete d.exit, l === null ? /* @__PURE__ */ Wt.createElement(uu.Provider, {
      value: p
    }, f) : /* @__PURE__ */ Wt.createElement(uu.Provider, {
      value: p
    }, /* @__PURE__ */ Wt.createElement(l, d, f));
  }, t;
}(Wt.Component);
Kp.propTypes = {};
Kp.defaultProps = GC;
const O0 = (e) => e.scrollTop;
function cu(e, t) {
  const {
    timeout: r,
    easing: o,
    style: s = {}
  } = e;
  return {
    duration: s.transitionDuration ?? (typeof r == "number" ? r : r[t.mode] || 0),
    easing: s.transitionTimingFunction ?? (typeof o == "object" ? o[t.mode] : o),
    delay: s.transitionDelay
  };
}
function YC(e) {
  return pt("MuiPaper", e);
}
Xe("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const JC = (e) => {
  const {
    square: t,
    elevation: r,
    variant: o,
    classes: s
  } = e, l = {
    root: ["root", o, !t && "rounded", o === "elevation" && `elevation${r}`]
  };
  return wt(l, YC, s);
}, XC = Me("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], !r.square && t.rounded, r.variant === "elevation" && t[`elevation${r.elevation}`]];
  }
})(wn(({
  theme: e
}) => ({
  backgroundColor: (e.vars || e).palette.background.paper,
  color: (e.vars || e).palette.text.primary,
  transition: e.transitions.create("box-shadow"),
  variants: [{
    props: ({
      ownerState: t
    }) => !t.square,
    style: {
      borderRadius: e.shape.borderRadius
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      border: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: {
      variant: "elevation"
    },
    style: {
      boxShadow: "var(--Paper-shadow)",
      backgroundImage: "var(--Paper-overlay)"
    }
  }]
}))), N0 = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiPaper"
  }), s = Hp(), {
    className: l,
    component: u = "div",
    elevation: d = 1,
    square: p = !1,
    variant: f = "elevation",
    ...g
  } = o, y = {
    ...o,
    component: u,
    elevation: d,
    square: p,
    variant: f
  }, v = JC(y);
  return /* @__PURE__ */ B.jsx(XC, {
    as: u,
    ownerState: y,
    className: Re(v.root, l),
    ref: r,
    ...g,
    style: {
      ...f === "elevation" && {
        "--Paper-shadow": (s.vars || s).shadows[d],
        ...s.vars && {
          "--Paper-overlay": s.vars.overlays?.[d]
        },
        ...!s.vars && s.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${Ct("#fff", Uf(d))}, ${Ct("#fff", Uf(d))})`
        }
      },
      ...g.style
    }
  });
});
function yn(e, t) {
  const {
    className: r,
    elementType: o,
    ownerState: s,
    externalForwardedProps: l,
    internalForwardedProps: u,
    shouldForwardComponentProp: d = !1,
    ...p
  } = t, {
    component: f,
    slots: g = {
      [e]: void 0
    },
    slotProps: y = {
      [e]: void 0
    },
    ...v
  } = l, _ = g[e] || o, S = m0(y[e], s), {
    props: {
      component: b,
      ...C
    },
    internalRef: R
  } = g0({
    className: r,
    ...p,
    externalForwardedProps: e === "root" ? v : void 0,
    externalSlotProps: S
  }), O = An(R, S?.ref, t.ref), x = e === "root" ? b || f : b, P = p0(_, {
    ...e === "root" && !f && !g[e] && u,
    ...e !== "root" && !g[e] && u,
    ...C,
    ...x && !d && {
      as: x
    },
    ...x && d && {
      component: x
    },
    ref: O
  }, s);
  return [_, P];
}
class du {
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new du();
  }
  static use() {
    const t = c0(du.create).current, [r, o] = k.useState(!1);
    return t.shouldMount = r, t.setShouldMount = o, k.useEffect(t.mountEffect, [r]), t;
  }
  constructor() {
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  mount() {
    return this.mounted || (this.mounted = eE(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  mountEffect = () => {
    this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve());
  };
  /* Ripple API */
  start(...t) {
    this.mount().then(() => this.ref.current?.start(...t));
  }
  stop(...t) {
    this.mount().then(() => this.ref.current?.stop(...t));
  }
  pulsate(...t) {
    this.mount().then(() => this.ref.current?.pulsate(...t));
  }
}
function ZC() {
  return du.use();
}
function eE() {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}
function tE(e) {
  const {
    className: t,
    classes: r,
    pulsate: o = !1,
    rippleX: s,
    rippleY: l,
    rippleSize: u,
    in: d,
    onExited: p,
    timeout: f
  } = e, [g, y] = k.useState(!1), v = Re(t, r.ripple, r.rippleVisible, o && r.ripplePulsate), _ = {
    width: u,
    height: u,
    top: -(u / 2) + l,
    left: -(u / 2) + s
  }, S = Re(r.child, g && r.childLeaving, o && r.childPulsate);
  return !d && !g && y(!0), k.useEffect(() => {
    if (!d && p != null) {
      const b = setTimeout(p, f);
      return () => {
        clearTimeout(b);
      };
    }
  }, [p, d, f]), /* @__PURE__ */ B.jsx("span", {
    className: v,
    style: _,
    children: /* @__PURE__ */ B.jsx("span", {
      className: S
    })
  });
}
const gn = Xe("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), qf = 550, nE = 80, rE = Ei`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, iE = Ei`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, oE = Ei`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, sE = Me("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), aE = Me(tE, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${gn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${rE};
    animation-duration: ${qf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${gn.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${gn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${gn.childLeaving} {
    opacity: 0;
    animation-name: ${iE};
    animation-duration: ${qf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${gn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${oE};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, lE = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: s = !1,
    classes: l = {},
    className: u,
    ...d
  } = o, [p, f] = k.useState([]), g = k.useRef(0), y = k.useRef(null);
  k.useEffect(() => {
    y.current && (y.current(), y.current = null);
  }, [p]);
  const v = k.useRef(!1), _ = d0(), S = k.useRef(null), b = k.useRef(null), C = k.useCallback((P) => {
    const {
      pulsate: E,
      rippleX: M,
      rippleY: A,
      rippleSize: I,
      cb: L
    } = P;
    f((w) => [...w, /* @__PURE__ */ B.jsx(aE, {
      classes: {
        ripple: Re(l.ripple, gn.ripple),
        rippleVisible: Re(l.rippleVisible, gn.rippleVisible),
        ripplePulsate: Re(l.ripplePulsate, gn.ripplePulsate),
        child: Re(l.child, gn.child),
        childLeaving: Re(l.childLeaving, gn.childLeaving),
        childPulsate: Re(l.childPulsate, gn.childPulsate)
      },
      timeout: qf,
      pulsate: E,
      rippleX: M,
      rippleY: A,
      rippleSize: I
    }, g.current)]), g.current += 1, y.current = L;
  }, [l]), R = k.useCallback((P = {}, E = {}, M = () => {
  }) => {
    const {
      pulsate: A = !1,
      center: I = s || E.pulsate,
      fakeElement: L = !1
      // For test purposes
    } = E;
    if (P?.type === "mousedown" && v.current) {
      v.current = !1;
      return;
    }
    P?.type === "touchstart" && (v.current = !0);
    const w = L ? null : b.current, T = w ? w.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let N, V, F;
    if (I || P === void 0 || P.clientX === 0 && P.clientY === 0 || !P.clientX && !P.touches)
      N = Math.round(T.width / 2), V = Math.round(T.height / 2);
    else {
      const {
        clientX: j,
        clientY: H
      } = P.touches && P.touches.length > 0 ? P.touches[0] : P;
      N = Math.round(j - T.left), V = Math.round(H - T.top);
    }
    if (I)
      F = Math.sqrt((2 * T.width ** 2 + T.height ** 2) / 3), F % 2 === 0 && (F += 1);
    else {
      const j = Math.max(Math.abs((w ? w.clientWidth : 0) - N), N) * 2 + 2, H = Math.max(Math.abs((w ? w.clientHeight : 0) - V), V) * 2 + 2;
      F = Math.sqrt(j ** 2 + H ** 2);
    }
    P?.touches ? S.current === null && (S.current = () => {
      C({
        pulsate: A,
        rippleX: N,
        rippleY: V,
        rippleSize: F,
        cb: M
      });
    }, _.start(nE, () => {
      S.current && (S.current(), S.current = null);
    })) : C({
      pulsate: A,
      rippleX: N,
      rippleY: V,
      rippleSize: F,
      cb: M
    });
  }, [s, C, _]), O = k.useCallback(() => {
    R({}, {
      pulsate: !0
    });
  }, [R]), x = k.useCallback((P, E) => {
    if (_.clear(), P?.type === "touchend" && S.current) {
      S.current(), S.current = null, _.start(0, () => {
        x(P, E);
      });
      return;
    }
    S.current = null, f((M) => M.length > 0 ? M.slice(1) : M), y.current = E;
  }, [_]);
  return k.useImperativeHandle(r, () => ({
    pulsate: O,
    start: R,
    stop: x
  }), [O, R, x]), /* @__PURE__ */ B.jsx(sE, {
    className: Re(gn.root, l.root, u),
    ref: b,
    ...d,
    children: /* @__PURE__ */ B.jsx(Kp, {
      component: null,
      exit: !0,
      children: p
    })
  });
});
function uE(e) {
  return pt("MuiButtonBase", e);
}
const cE = Xe("MuiButtonBase", ["root", "disabled", "focusVisible"]), dE = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: o,
    classes: s
  } = e, u = wt({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, uE, s);
  return r && o && (u.root += ` ${o}`), u;
}, fE = Me("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${cE.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Hu = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: s,
    centerRipple: l = !1,
    children: u,
    className: d,
    component: p = "button",
    disabled: f = !1,
    disableRipple: g = !1,
    disableTouchRipple: y = !1,
    focusRipple: v = !1,
    focusVisibleClassName: _,
    LinkComponent: S = "a",
    onBlur: b,
    onClick: C,
    onContextMenu: R,
    onDragLeave: O,
    onFocus: x,
    onFocusVisible: P,
    onKeyDown: E,
    onKeyUp: M,
    onMouseDown: A,
    onMouseLeave: I,
    onMouseUp: L,
    onTouchEnd: w,
    onTouchMove: T,
    onTouchStart: N,
    tabIndex: V = 0,
    TouchRippleProps: F,
    touchRippleRef: j,
    type: H,
    ...Y
  } = o, U = k.useRef(null), W = ZC(), K = An(W.ref, j), [D, G] = k.useState(!1);
  f && D && G(!1), k.useImperativeHandle(s, () => ({
    focusVisible: () => {
      G(!0), U.current.focus();
    }
  }), []);
  const oe = W.shouldMount && !g && !f;
  k.useEffect(() => {
    D && v && !g && W.pulsate();
  }, [g, v, D, W]);
  const te = sr(W, "start", A, y), se = sr(W, "stop", R, y), le = sr(W, "stop", O, y), de = sr(W, "stop", L, y), he = sr(W, "stop", (xe) => {
    D && xe.preventDefault(), I && I(xe);
  }, y), fe = sr(W, "start", N, y), ue = sr(W, "stop", w, y), we = sr(W, "stop", T, y), _e = sr(W, "stop", (xe) => {
    Ay(xe.target) || G(!1), b && b(xe);
  }, !1), qe = co((xe) => {
    U.current || (U.current = xe.currentTarget), Ay(xe.target) && (G(!0), P && P(xe)), x && x(xe);
  }), ze = () => {
    const xe = U.current;
    return p && p !== "button" && !(xe.tagName === "A" && xe.href);
  }, st = co((xe) => {
    v && !xe.repeat && D && xe.key === " " && W.stop(xe, () => {
      W.start(xe);
    }), xe.target === xe.currentTarget && ze() && xe.key === " " && xe.preventDefault(), E && E(xe), xe.target === xe.currentTarget && ze() && xe.key === "Enter" && !f && (xe.preventDefault(), C && C(xe));
  }), ut = co((xe) => {
    v && xe.key === " " && D && !xe.defaultPrevented && W.stop(xe, () => {
      W.pulsate(xe);
    }), M && M(xe), C && xe.target === xe.currentTarget && ze() && xe.key === " " && !xe.defaultPrevented && C(xe);
  });
  let Ze = p;
  Ze === "button" && (Y.href || Y.to) && (Ze = S);
  const De = {};
  Ze === "button" ? (De.type = H === void 0 ? "button" : H, De.disabled = f) : (!Y.href && !Y.to && (De.role = "button"), f && (De["aria-disabled"] = f));
  const Rt = An(r, U), ct = {
    ...o,
    centerRipple: l,
    component: p,
    disabled: f,
    disableRipple: g,
    disableTouchRipple: y,
    focusRipple: v,
    tabIndex: V,
    focusVisible: D
  }, We = dE(ct);
  return /* @__PURE__ */ B.jsxs(fE, {
    as: Ze,
    className: Re(We.root, d),
    ownerState: ct,
    onBlur: _e,
    onClick: C,
    onContextMenu: se,
    onFocus: qe,
    onKeyDown: st,
    onKeyUp: ut,
    onMouseDown: te,
    onMouseLeave: he,
    onMouseUp: de,
    onDragLeave: le,
    onTouchEnd: ue,
    onTouchMove: we,
    onTouchStart: fe,
    ref: Rt,
    tabIndex: f ? -1 : V,
    type: H,
    ...De,
    ...Y,
    children: [u, oe ? /* @__PURE__ */ B.jsx(lE, {
      ref: K,
      center: l,
      ...F
    }) : null]
  });
});
function sr(e, t, r, o = !1) {
  return co((s) => (r && r(s), o || e[t](s), !0));
}
function pE(e) {
  return typeof e.main == "string";
}
function hE(e, t = []) {
  if (!pE(e))
    return !1;
  for (const r of t)
    if (!e.hasOwnProperty(r) || typeof e[r] != "string")
      return !1;
  return !0;
}
function _i(e = []) {
  return ([, t]) => t && hE(t, e);
}
function gE(e) {
  return pt("MuiCircularProgress", e);
}
Xe("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "circle", "circleDeterminate", "circleIndeterminate", "circleDisableShrink"]);
const zr = 44, Kf = Ei`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, Qf = Ei`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`, mE = typeof Kf != "string" ? Qs`
        animation: ${Kf} 1.4s linear infinite;
      ` : null, yE = typeof Qf != "string" ? Qs`
        animation: ${Qf} 1.4s ease-in-out infinite;
      ` : null, vE = (e) => {
  const {
    classes: t,
    variant: r,
    color: o,
    disableShrink: s
  } = e, l = {
    root: ["root", r, `color${Pe(o)}`],
    svg: ["svg"],
    circle: ["circle", `circle${Pe(r)}`, s && "circleDisableShrink"]
  };
  return wt(l, gE, t);
}, wE = Me("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`color${Pe(r.color)}`]];
  }
})(wn(({
  theme: e
}) => ({
  display: "inline-block",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: e.transitions.create("transform")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: mE || {
      animation: `${Kf} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), SE = Me("svg", {
  name: "MuiCircularProgress",
  slot: "Svg",
  overridesResolver: (e, t) => t.svg
})({
  display: "block"
  // Keeps the progress centered
}), bE = Me("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.circle, t[`circle${Pe(r.variant)}`], r.disableShrink && t.circleDisableShrink];
  }
})(wn(({
  theme: e
}) => ({
  stroke: "currentColor",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: e.transitions.create("stroke-dashoffset")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: "80px, 200px",
      strokeDashoffset: 0
      // Add the unit to fix a Edge 16 and below bug.
    }
  }, {
    props: ({
      ownerState: t
    }) => t.variant === "indeterminate" && !t.disableShrink,
    style: yE || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${Qf} 1.4s ease-in-out infinite`
    }
  }]
}))), L0 = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiCircularProgress"
  }), {
    className: s,
    color: l = "primary",
    disableShrink: u = !1,
    size: d = 40,
    style: p,
    thickness: f = 3.6,
    value: g = 0,
    variant: y = "indeterminate",
    ...v
  } = o, _ = {
    ...o,
    color: l,
    disableShrink: u,
    size: d,
    thickness: f,
    value: g,
    variant: y
  }, S = vE(_), b = {}, C = {}, R = {};
  if (y === "determinate") {
    const O = 2 * Math.PI * ((zr - f) / 2);
    b.strokeDasharray = O.toFixed(3), R["aria-valuenow"] = Math.round(g), b.strokeDashoffset = `${((100 - g) / 100 * O).toFixed(3)}px`, C.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ B.jsx(wE, {
    className: Re(S.root, s),
    style: {
      width: d,
      height: d,
      ...C,
      ...p
    },
    ownerState: _,
    ref: r,
    role: "progressbar",
    ...R,
    ...v,
    children: /* @__PURE__ */ B.jsx(SE, {
      className: S.svg,
      ownerState: _,
      viewBox: `${zr / 2} ${zr / 2} ${zr} ${zr}`,
      children: /* @__PURE__ */ B.jsx(bE, {
        className: S.circle,
        style: b,
        ownerState: _,
        cx: zr,
        cy: zr,
        r: (zr - f) / 2,
        fill: "none",
        strokeWidth: f
      })
    })
  });
});
function _E(e) {
  return pt("MuiIconButton", e);
}
const Yy = Xe("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), xE = (e) => {
  const {
    classes: t,
    disabled: r,
    color: o,
    edge: s,
    size: l,
    loading: u
  } = e, d = {
    root: ["root", u && "loading", r && "disabled", o !== "default" && `color${Pe(o)}`, s && `edge${Pe(s)}`, `size${Pe(l)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  return wt(d, _E, t);
}, kE = Me(Hu, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.loading && t.loading, r.color !== "default" && t[`color${Pe(r.color)}`], r.edge && t[`edge${Pe(r.edge)}`], t[`size${Pe(r.size)}`]];
  }
})(wn(({
  theme: e
}) => ({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  variants: [{
    props: (t) => !t.disableRipple,
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette.action.active, e.palette.action.hoverOpacity),
      "&:hover": {
        backgroundColor: "var(--IconButton-hoverBg)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }, {
    props: {
      edge: "start"
    },
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: {
      edge: "end"
    },
    style: {
      marginRight: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }]
})), wn(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${(e.vars || e).palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct((e.vars || e).palette[t].main, e.palette.action.hoverOpacity)
    }
  })), {
    props: {
      size: "small"
    },
    style: {
      padding: 5,
      fontSize: e.typography.pxToRem(18)
    }
  }, {
    props: {
      size: "large"
    },
    style: {
      padding: 12,
      fontSize: e.typography.pxToRem(28)
    }
  }],
  [`&.${Yy.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${Yy.loading}`]: {
    color: "transparent"
  }
}))), CE = Me("span", {
  name: "MuiIconButton",
  slot: "LoadingIndicator",
  overridesResolver: (e, t) => t.loadingIndicator
})(({
  theme: e
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: (e.vars || e).palette.action.disabled,
  variants: [{
    props: {
      loading: !0
    },
    style: {
      display: "flex"
    }
  }]
})), fu = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: s = !1,
    children: l,
    className: u,
    color: d = "default",
    disabled: p = !1,
    disableFocusRipple: f = !1,
    size: g = "medium",
    id: y,
    loading: v = null,
    loadingIndicator: _,
    ...S
  } = o, b = u0(y), C = _ ?? /* @__PURE__ */ B.jsx(L0, {
    "aria-labelledby": b,
    color: "inherit",
    size: 16
  }), R = {
    ...o,
    edge: s,
    color: d,
    disabled: p,
    disableFocusRipple: f,
    loading: v,
    loadingIndicator: C,
    size: g
  }, O = xE(R);
  return /* @__PURE__ */ B.jsxs(kE, {
    id: v ? b : y,
    className: Re(O.root, u),
    centerRipple: !0,
    focusRipple: !f,
    disabled: p || v,
    ref: r,
    ...S,
    ownerState: R,
    children: [typeof v == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ B.jsx("span", {
      className: O.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ B.jsx(CE, {
        className: O.loadingIndicator,
        ownerState: R,
        children: v && C
      })
    }), l]
  });
});
function EE(e) {
  return pt("MuiTypography", e);
}
Xe("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const PE = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, RE = LC(), TE = (e) => {
  const {
    align: t,
    gutterBottom: r,
    noWrap: o,
    paragraph: s,
    variant: l,
    classes: u
  } = e, d = {
    root: ["root", l, e.align !== "inherit" && `align${Pe(t)}`, r && "gutterBottom", o && "noWrap", s && "paragraph"]
  };
  return wt(d, EE, u);
}, $E = Me("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.variant && t[r.variant], r.align !== "inherit" && t[`align${Pe(r.align)}`], r.noWrap && t.noWrap, r.gutterBottom && t.gutterBottom, r.paragraph && t.paragraph];
  }
})(wn(({
  theme: e
}) => ({
  margin: 0,
  variants: [{
    props: {
      variant: "inherit"
    },
    style: {
      // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
      font: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  }, ...Object.entries(e.typography).filter(([t, r]) => t !== "inherit" && r && typeof r == "object").map(([t, r]) => ({
    props: {
      variant: t
    },
    style: r
  })), ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), ...Object.entries(e.palette?.text || {}).filter(([, t]) => typeof t == "string").map(([t]) => ({
    props: {
      color: `text${Pe(t)}`
    },
    style: {
      color: (e.vars || e).palette.text[t]
    }
  })), {
    props: ({
      ownerState: t
    }) => t.align !== "inherit",
    style: {
      textAlign: "var(--Typography-textAlign)"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.noWrap,
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.gutterBottom,
    style: {
      marginBottom: "0.35em"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.paragraph,
    style: {
      marginBottom: 16
    }
  }]
}))), Jy = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, qu = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const {
    color: o,
    ...s
  } = ht({
    props: t,
    name: "MuiTypography"
  }), l = !PE[o], u = RE({
    ...s,
    ...l && {
      color: o
    }
  }), {
    align: d = "inherit",
    className: p,
    component: f,
    gutterBottom: g = !1,
    noWrap: y = !1,
    paragraph: v = !1,
    variant: _ = "body1",
    variantMapping: S = Jy,
    ...b
  } = u, C = {
    ...u,
    align: d,
    color: o,
    className: p,
    component: f,
    gutterBottom: g,
    noWrap: y,
    paragraph: v,
    variant: _,
    variantMapping: S
  }, R = f || (v ? "p" : S[_] || Jy[_]) || "span", O = TE(C);
  return /* @__PURE__ */ B.jsx($E, {
    as: R,
    ref: r,
    className: Re(O.root, p),
    ...b,
    ownerState: C,
    style: {
      ...d !== "inherit" && {
        "--Typography-textAlign": d
      },
      ...b.style
    }
  });
});
function ME(e) {
  return typeof e == "function" ? e() : e;
}
const AE = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const {
    children: o,
    container: s,
    disablePortal: l = !1
  } = t, [u, d] = k.useState(null), p = An(/* @__PURE__ */ k.isValidElement(o) ? Vu(o) : null, r);
  if (ho(() => {
    l || d(ME(s) || document.body);
  }, [s, l]), ho(() => {
    if (u && !l)
      return Ry(r, u), () => {
        Ry(r, null);
      };
  }, [r, u, l]), l) {
    if (/* @__PURE__ */ k.isValidElement(o)) {
      const f = {
        ref: p
      };
      return /* @__PURE__ */ k.cloneElement(o, f);
    }
    return o;
  }
  return u && /* @__PURE__ */ I0.createPortal(o, u);
});
function IE(e) {
  return typeof e == "string";
}
function OE({
  props: e,
  states: t,
  muiFormControl: r
}) {
  return t.reduce((o, s) => (o[s] = e[s], r && typeof e[s] > "u" && (o[s] = r[s]), o), {});
}
const NE = /* @__PURE__ */ k.createContext(void 0);
function D0() {
  return k.useContext(NE);
}
const LE = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, DE = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = Hp(), s = {
    enter: o.transitions.duration.enteringScreen,
    exit: o.transitions.duration.leavingScreen
  }, {
    addEndListener: l,
    appear: u = !0,
    children: d,
    easing: p,
    in: f,
    onEnter: g,
    onEntered: y,
    onEntering: v,
    onExit: _,
    onExited: S,
    onExiting: b,
    style: C,
    timeout: R = s,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = Qn,
    ...x
  } = t, P = k.useRef(null), E = An(P, Vu(d), r), M = (F) => (j) => {
    if (F) {
      const H = P.current;
      j === void 0 ? F(H) : F(H, j);
    }
  }, A = M(v), I = M((F, j) => {
    O0(F);
    const H = cu({
      style: C,
      timeout: R,
      easing: p
    }, {
      mode: "enter"
    });
    F.style.webkitTransition = o.transitions.create("opacity", H), F.style.transition = o.transitions.create("opacity", H), g && g(F, j);
  }), L = M(y), w = M(b), T = M((F) => {
    const j = cu({
      style: C,
      timeout: R,
      easing: p
    }, {
      mode: "exit"
    });
    F.style.webkitTransition = o.transitions.create("opacity", j), F.style.transition = o.transitions.create("opacity", j), _ && _(F);
  }), N = M(S), V = (F) => {
    l && l(P.current, F);
  };
  return /* @__PURE__ */ B.jsx(O, {
    appear: u,
    in: f,
    nodeRef: P,
    onEnter: I,
    onEntered: L,
    onEntering: A,
    onExit: T,
    onExited: N,
    onExiting: w,
    addEndListener: V,
    timeout: R,
    ...x,
    children: (F, {
      ownerState: j,
      ...H
    }) => /* @__PURE__ */ k.cloneElement(d, {
      style: {
        opacity: 0,
        visibility: F === "exited" && !f ? "hidden" : void 0,
        ...LE[F],
        ...C,
        ...d.props.style
      },
      ref: E,
      ...H
    })
  });
});
function FE(e) {
  return pt("MuiBackdrop", e);
}
Xe("MuiBackdrop", ["root", "invisible"]);
const zE = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return wt({
    root: ["root", r && "invisible"]
  }, FE, t);
}, jE = Me("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.invisible && t.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: !0
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
}), BE = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: s,
    className: l,
    component: u = "div",
    invisible: d = !1,
    open: p,
    components: f = {},
    componentsProps: g = {},
    slotProps: y = {},
    slots: v = {},
    TransitionComponent: _,
    transitionDuration: S,
    ...b
  } = o, C = {
    ...o,
    component: u,
    invisible: d
  }, R = zE(C), O = {
    transition: _,
    root: f.Root,
    ...v
  }, x = {
    ...g,
    ...y
  }, P = {
    slots: O,
    slotProps: x
  }, [E, M] = yn("root", {
    elementType: jE,
    externalForwardedProps: P,
    className: Re(R.root, l),
    ownerState: C
  }), [A, I] = yn("transition", {
    elementType: DE,
    externalForwardedProps: P,
    ownerState: C
  });
  return /* @__PURE__ */ B.jsx(A, {
    in: p,
    timeout: S,
    ...b,
    ...I,
    children: /* @__PURE__ */ B.jsx(E, {
      "aria-hidden": !0,
      ...M,
      classes: R,
      ref: r,
      children: s
    })
  });
}), UE = Xe("MuiBox", ["root"]), WE = Xs(), pr = lk({
  themeId: Vn,
  defaultTheme: WE,
  defaultClassName: UE.root,
  generateClassName: i0.generate
});
function VE(e) {
  return pt("MuiButton", e);
}
const di = Xe("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), HE = /* @__PURE__ */ k.createContext({}), qE = /* @__PURE__ */ k.createContext(void 0), KE = (e) => {
  const {
    color: t,
    disableElevation: r,
    fullWidth: o,
    size: s,
    variant: l,
    loading: u,
    loadingPosition: d,
    classes: p
  } = e, f = {
    root: ["root", u && "loading", l, `${l}${Pe(t)}`, `size${Pe(s)}`, `${l}Size${Pe(s)}`, `color${Pe(t)}`, r && "disableElevation", o && "fullWidth", u && `loadingPosition${Pe(d)}`],
    startIcon: ["icon", "startIcon", `iconSize${Pe(s)}`],
    endIcon: ["icon", "endIcon", `iconSize${Pe(s)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  }, g = wt(f, VE, p);
  return {
    ...p,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...g
  };
}, F0 = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}], QE = Me(Hu, {
  shouldForwardProp: (e) => wo(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`${r.variant}${Pe(r.color)}`], t[`size${Pe(r.size)}`], t[`${r.variant}Size${Pe(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth, r.loading && t.loading];
  }
})(wn(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], r = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return {
    ...e.typography.button,
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${di.disabled}`]: {
      color: (e.vars || e).palette.action.disabled
    },
    variants: [{
      props: {
        variant: "contained"
      },
      style: {
        color: "var(--variant-containedColor)",
        backgroundColor: "var(--variant-containedBg)",
        boxShadow: (e.vars || e).shadows[2],
        "&:hover": {
          boxShadow: (e.vars || e).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (e.vars || e).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[8]
        },
        [`&.${di.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${di.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
          boxShadow: (e.vars || e).shadows[0],
          backgroundColor: (e.vars || e).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: "var(--variant-outlinedBorder, currentColor)",
        backgroundColor: "var(--variant-outlinedBg)",
        color: "var(--variant-outlinedColor)",
        [`&.${di.disabled}`]: {
          border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: "var(--variant-textColor)",
        backgroundColor: "var(--variant-textBg)"
      }
    }, ...Object.entries(e.palette).filter(_i()).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        "--variant-textColor": (e.vars || e).palette[o].main,
        "--variant-outlinedColor": (e.vars || e).palette[o].main,
        "--variant-outlinedBorder": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / 0.5)` : Ct(e.palette[o].main, 0.5),
        "--variant-containedColor": (e.vars || e).palette[o].contrastText,
        "--variant-containedBg": (e.vars || e).palette[o].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (e.vars || e).palette[o].dark,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette[o].main, e.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (e.vars || e).palette[o].main,
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette[o].main, e.palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit",
        borderColor: "currentColor",
        "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : t,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : r,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette.text.primary, e.palette.action.hoverOpacity),
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette.text.primary, e.palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: !0
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${di.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${di.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: !0
      },
      style: {
        width: "100%"
      }
    }, {
      props: {
        loadingPosition: "center"
      },
      style: {
        transition: e.transitions.create(["background-color", "box-shadow", "border-color"], {
          duration: e.transitions.duration.short
        }),
        [`&.${di.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), GE = Me("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.startIcon, r.loading && t.startIconLoadingStart, t[`iconSize${Pe(r.size)}`]];
  }
})(({
  theme: e
}) => ({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: !0
    },
    style: {
      transition: e.transitions.create(["opacity"], {
        duration: e.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: !0,
      fullWidth: !0
    },
    style: {
      marginRight: -8
    }
  }, ...F0]
})), YE = Me("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.endIcon, r.loading && t.endIconLoadingEnd, t[`iconSize${Pe(r.size)}`]];
  }
})(({
  theme: e
}) => ({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: !0
    },
    style: {
      transition: e.transitions.create(["opacity"], {
        duration: e.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: !0,
      fullWidth: !0
    },
    style: {
      marginLeft: -8
    }
  }, ...F0]
})), JE = Me("span", {
  name: "MuiButton",
  slot: "LoadingIndicator",
  overridesResolver: (e, t) => t.loadingIndicator
})(({
  theme: e
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  variants: [{
    props: {
      loading: !0
    },
    style: {
      display: "flex"
    }
  }, {
    props: {
      loadingPosition: "start"
    },
    style: {
      left: 14
    }
  }, {
    props: {
      loadingPosition: "start",
      size: "small"
    },
    style: {
      left: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "start"
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: "center"
    },
    style: {
      left: "50%",
      transform: "translate(-50%)",
      color: (e.vars || e).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: "end"
    },
    style: {
      right: 14
    }
  }, {
    props: {
      loadingPosition: "end",
      size: "small"
    },
    style: {
      right: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "end"
    },
    style: {
      right: 6
    }
  }, {
    props: {
      loadingPosition: "start",
      fullWidth: !0
    },
    style: {
      position: "relative",
      left: -10
    }
  }, {
    props: {
      loadingPosition: "end",
      fullWidth: !0
    },
    style: {
      position: "relative",
      right: -10
    }
  }]
})), Xy = Me("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder",
  overridesResolver: (e, t) => t.loadingIconPlaceholder
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), Vr = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = k.useContext(HE), s = k.useContext(qE), l = lu(o, t), u = ht({
    props: l,
    name: "MuiButton"
  }), {
    children: d,
    color: p = "primary",
    component: f = "button",
    className: g,
    disabled: y = !1,
    disableElevation: v = !1,
    disableFocusRipple: _ = !1,
    endIcon: S,
    focusVisibleClassName: b,
    fullWidth: C = !1,
    id: R,
    loading: O = null,
    loadingIndicator: x,
    loadingPosition: P = "center",
    size: E = "medium",
    startIcon: M,
    type: A,
    variant: I = "text",
    ...L
  } = u, w = u0(R), T = x ?? /* @__PURE__ */ B.jsx(L0, {
    "aria-labelledby": w,
    color: "inherit",
    size: 16
  }), N = {
    ...u,
    color: p,
    component: f,
    disabled: y,
    disableElevation: v,
    disableFocusRipple: _,
    fullWidth: C,
    loading: O,
    loadingIndicator: T,
    loadingPosition: P,
    size: E,
    type: A,
    variant: I
  }, V = KE(N), F = (M || O && P === "start") && /* @__PURE__ */ B.jsx(GE, {
    className: V.startIcon,
    ownerState: N,
    children: M || /* @__PURE__ */ B.jsx(Xy, {
      className: V.loadingIconPlaceholder,
      ownerState: N
    })
  }), j = (S || O && P === "end") && /* @__PURE__ */ B.jsx(YE, {
    className: V.endIcon,
    ownerState: N,
    children: S || /* @__PURE__ */ B.jsx(Xy, {
      className: V.loadingIconPlaceholder,
      ownerState: N
    })
  }), H = s || "", Y = typeof O == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ B.jsx("span", {
      className: V.loadingWrapper,
      style: {
        display: "contents"
      },
      children: O && /* @__PURE__ */ B.jsx(JE, {
        className: V.loadingIndicator,
        ownerState: N,
        children: T
      })
    })
  ) : null;
  return /* @__PURE__ */ B.jsxs(QE, {
    ownerState: N,
    className: Re(o.className, V.root, g, H),
    component: f,
    disabled: y || O,
    focusRipple: !_,
    focusVisibleClassName: Re(V.focusVisible, b),
    ref: r,
    type: A,
    id: O ? w : R,
    ...L,
    classes: V,
    children: [F, P !== "end" && Y, d, P === "end" && Y, j]
  });
});
function XE(e) {
  return pt("MuiCard", e);
}
Xe("MuiCard", ["root"]);
const ZE = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"]
  }, XE, t);
}, eP = Me(N0, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  overflow: "hidden"
}), Ku = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiCard"
  }), {
    className: s,
    raised: l = !1,
    ...u
  } = o, d = {
    ...o,
    raised: l
  }, p = ZE(d);
  return /* @__PURE__ */ B.jsx(eP, {
    className: Re(p.root, s),
    elevation: l ? 8 : void 0,
    ref: r,
    ownerState: d,
    ...u
  });
});
function tP(e) {
  return pt("PrivateSwitchBase", e);
}
Xe("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const nP = (e) => {
  const {
    classes: t,
    checked: r,
    disabled: o,
    edge: s
  } = e, l = {
    root: ["root", r && "checked", o && "disabled", s && `edge${Pe(s)}`],
    input: ["input"]
  };
  return wt(l, tP, t);
}, rP = Me(Hu)({
  padding: 9,
  borderRadius: "50%",
  variants: [{
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge: e,
      ownerState: t
    }) => e === "start" && t.size !== "small",
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge: e,
      ownerState: t
    }) => e === "end" && t.size !== "small",
    style: {
      marginRight: -12
    }
  }]
}), iP = Me("input", {
  shouldForwardProp: wo
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
}), oP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const {
    autoFocus: o,
    checked: s,
    checkedIcon: l,
    defaultChecked: u,
    disabled: d,
    disableFocusRipple: p = !1,
    edge: f = !1,
    icon: g,
    id: y,
    inputProps: v,
    inputRef: _,
    name: S,
    onBlur: b,
    onChange: C,
    onFocus: R,
    readOnly: O,
    required: x = !1,
    tabIndex: P,
    type: E,
    value: M,
    slots: A = {},
    slotProps: I = {},
    ...L
  } = t, [w, T] = Ek({
    controlled: s,
    default: !!u,
    name: "SwitchBase",
    state: "checked"
  }), N = D0(), V = (se) => {
    R && R(se), N && N.onFocus && N.onFocus(se);
  }, F = (se) => {
    b && b(se), N && N.onBlur && N.onBlur(se);
  }, j = (se) => {
    if (se.nativeEvent.defaultPrevented)
      return;
    const le = se.target.checked;
    T(le), C && C(se, le);
  };
  let H = d;
  N && typeof H > "u" && (H = N.disabled);
  const Y = E === "checkbox" || E === "radio", U = {
    ...t,
    checked: w,
    disabled: H,
    disableFocusRipple: p,
    edge: f
  }, W = nP(U), K = {
    slots: A,
    slotProps: {
      input: v,
      ...I
    }
  }, [D, G] = yn("root", {
    ref: r,
    elementType: rP,
    className: W.root,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...K,
      component: "span",
      ...L
    },
    getSlotProps: (se) => ({
      ...se,
      onFocus: (le) => {
        se.onFocus?.(le), V(le);
      },
      onBlur: (le) => {
        se.onBlur?.(le), F(le);
      }
    }),
    ownerState: U,
    additionalProps: {
      centerRipple: !0,
      focusRipple: !p,
      disabled: H,
      role: void 0,
      tabIndex: null
    }
  }), [oe, te] = yn("input", {
    ref: _,
    elementType: iP,
    className: W.input,
    externalForwardedProps: K,
    getSlotProps: (se) => ({
      onChange: (le) => {
        se.onChange?.(le), j(le);
      }
    }),
    ownerState: U,
    additionalProps: {
      autoFocus: o,
      checked: s,
      defaultChecked: u,
      disabled: H,
      id: Y ? y : void 0,
      name: S,
      readOnly: O,
      required: x,
      tabIndex: P,
      type: E,
      ...E === "checkbox" && M === void 0 ? {} : {
        value: M
      }
    }
  });
  return /* @__PURE__ */ B.jsxs(D, {
    ...G,
    children: [/* @__PURE__ */ B.jsx(oe, {
      ...te
    }), w ? l : g]
  });
}), sP = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), aP = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), lP = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function uP(e) {
  return pt("MuiCheckbox", e);
}
const hf = Xe("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), cP = (e) => {
  const {
    classes: t,
    indeterminate: r,
    color: o,
    size: s
  } = e, l = {
    root: ["root", r && "indeterminate", `color${Pe(o)}`, `size${Pe(s)}`]
  }, u = wt(l, uP, t);
  return {
    ...t,
    // forward the disabled and checked classes to the SwitchBase
    ...u
  };
}, dP = Me(oP, {
  shouldForwardProp: (e) => wo(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.indeterminate && t.indeterminate, t[`size${Pe(r.size)}`], r.color !== "default" && t[`color${Pe(r.color)}`]];
  }
})(wn(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  variants: [{
    props: {
      color: "default",
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette.action.active, e.palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t,
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.vars ? `rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ct(e.palette[t].main, e.palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(e.palette).filter(_i()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${hf.checked}, &.${hf.indeterminate}`]: {
        color: (e.vars || e).palette[t].main
      },
      [`&.${hf.disabled}`]: {
        color: (e.vars || e).palette.action.disabled
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: !1
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      "&:hover": {
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
}))), fP = /* @__PURE__ */ B.jsx(aP, {}), pP = /* @__PURE__ */ B.jsx(sP, {}), hP = /* @__PURE__ */ B.jsx(lP, {}), gP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: s = fP,
    color: l = "primary",
    icon: u = pP,
    indeterminate: d = !1,
    indeterminateIcon: p = hP,
    inputProps: f,
    size: g = "medium",
    disableRipple: y = !1,
    className: v,
    slots: _ = {},
    slotProps: S = {},
    ...b
  } = o, C = d ? p : u, R = d ? p : s, O = {
    ...o,
    disableRipple: y,
    color: l,
    indeterminate: d,
    size: g
  }, x = cP(O), P = S.input ?? f, [E, M] = yn("root", {
    ref: r,
    elementType: dP,
    className: Re(x.root, v),
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      slots: _,
      slotProps: S,
      ...b
    },
    ownerState: O,
    additionalProps: {
      type: "checkbox",
      icon: /* @__PURE__ */ k.cloneElement(C, {
        fontSize: C.props.fontSize ?? g
      }),
      checkedIcon: /* @__PURE__ */ k.cloneElement(R, {
        fontSize: R.props.fontSize ?? g
      }),
      disableRipple: y,
      slots: _,
      slotProps: {
        input: T0(typeof P == "function" ? P(O) : P, {
          "data-indeterminate": d
        })
      }
    }
  });
  return /* @__PURE__ */ B.jsx(E, {
    ...M,
    classes: x
  });
}), Gf = typeof R0({}) == "function", mP = (e, t) => ({
  WebkitFontSmoothing: "antialiased",
  // Antialiasing.
  MozOsxFontSmoothing: "grayscale",
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%",
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...t && !e.vars && {
    colorScheme: e.palette.mode
  }
}), yP = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), z0 = (e, t = !1) => {
  const r = {};
  t && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([l, u]) => {
    const d = e.getColorSchemeSelector(l);
    d.startsWith("@") ? r[d] = {
      ":root": {
        colorScheme: u.palette?.mode
      }
    } : r[d.replace(/\s*&/, "")] = {
      colorScheme: u.palette?.mode
    };
  });
  let o = {
    html: mP(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...yP(e),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (e.vars || e).palette.background.default
      }
    },
    ...r
  };
  const s = e.components?.MuiCssBaseline?.styleOverrides;
  return s && (o = [o, s]), o;
}, Jl = "mui-ecs", vP = (e) => {
  const t = z0(e, !1), r = Array.isArray(t) ? t[0] : t;
  return !e.vars && r && (r.html[`:root:has(${Jl})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([o, s]) => {
    const l = e.getColorSchemeSelector(o);
    l.startsWith("@") ? r[l] = {
      [`:root:not(:has(.${Jl}))`]: {
        colorScheme: s.palette?.mode
      }
    } : r[l.replace(/\s*&/, "")] = {
      [`&:not(:has(.${Jl}))`]: {
        colorScheme: s.palette?.mode
      }
    };
  }), t;
}, wP = R0(Gf ? ({
  theme: e,
  enableColorScheme: t
}) => z0(e, t) : ({
  theme: e
}) => vP(e));
function SP(e) {
  const t = ht({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: r,
    enableColorScheme: o = !1
  } = t;
  return /* @__PURE__ */ B.jsxs(k.Fragment, {
    children: [Gf && /* @__PURE__ */ B.jsx(wP, {
      enableColorScheme: o
    }), !Gf && !o && /* @__PURE__ */ B.jsx("span", {
      className: Jl,
      style: {
        display: "none"
      }
    }), r]
  });
}
function bP(e) {
  const t = Kn(e);
  return t.body === e ? bi(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Es(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Zy(e) {
  return parseInt(bi(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function _P(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), o = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || o;
}
function ev(e, t, r, o, s) {
  const l = [t, r, ...o];
  [].forEach.call(e.children, (u) => {
    const d = !l.includes(u), p = !_P(u);
    d && p && Es(u, s);
  });
}
function gf(e, t) {
  let r = -1;
  return e.some((o, s) => t(o) ? (r = s, !0) : !1), r;
}
function xP(e, t) {
  const r = [], o = e.container;
  if (!t.disableScrollLock) {
    if (bP(o)) {
      const u = f0(bi(o));
      r.push({
        value: o.style.paddingRight,
        property: "padding-right",
        el: o
      }), o.style.paddingRight = `${Zy(o) + u}px`;
      const d = Kn(o).querySelectorAll(".mui-fixed");
      [].forEach.call(d, (p) => {
        r.push({
          value: p.style.paddingRight,
          property: "padding-right",
          el: p
        }), p.style.paddingRight = `${Zy(p) + u}px`;
      });
    }
    let l;
    if (o.parentNode instanceof DocumentFragment)
      l = Kn(o).body;
    else {
      const u = o.parentElement, d = bi(o);
      l = u?.nodeName === "HTML" && d.getComputedStyle(u).overflowY === "scroll" ? u : o;
    }
    r.push({
      value: l.style.overflow,
      property: "overflow",
      el: l
    }, {
      value: l.style.overflowX,
      property: "overflow-x",
      el: l
    }, {
      value: l.style.overflowY,
      property: "overflow-y",
      el: l
    }), l.style.overflow = "hidden";
  }
  return () => {
    r.forEach(({
      value: l,
      el: u,
      property: d
    }) => {
      l ? u.style.setProperty(d, l) : u.style.removeProperty(d);
    });
  };
}
function kP(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class CP {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, r) {
    let o = this.modals.indexOf(t);
    if (o !== -1)
      return o;
    o = this.modals.length, this.modals.push(t), t.modalRef && Es(t.modalRef, !1);
    const s = kP(r);
    ev(r, t.mount, t.modalRef, s, !0);
    const l = gf(this.containers, (u) => u.container === r);
    return l !== -1 ? (this.containers[l].modals.push(t), o) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: s
    }), o);
  }
  mount(t, r) {
    const o = gf(this.containers, (l) => l.modals.includes(t)), s = this.containers[o];
    s.restore || (s.restore = xP(s, r));
  }
  remove(t, r = !0) {
    const o = this.modals.indexOf(t);
    if (o === -1)
      return o;
    const s = gf(this.containers, (u) => u.modals.includes(t)), l = this.containers[s];
    if (l.modals.splice(l.modals.indexOf(t), 1), this.modals.splice(o, 1), l.modals.length === 0)
      l.restore && l.restore(), t.modalRef && Es(t.modalRef, r), ev(l.container, t.mount, t.modalRef, l.hiddenSiblings, !1), this.containers.splice(s, 1);
    else {
      const u = l.modals[l.modals.length - 1];
      u.modalRef && Es(u.modalRef, !1);
    }
    return o;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
const EP = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function PP(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function RP(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (o) => e.ownerDocument.querySelector(`input[type="radio"]${o}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function TP(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || RP(e));
}
function $P(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(EP)).forEach((o, s) => {
    const l = PP(o);
    l === -1 || !TP(o) || (l === 0 ? t.push(o) : r.push({
      documentOrder: s,
      tabIndex: l,
      node: o
    }));
  }), r.sort((o, s) => o.tabIndex === s.tabIndex ? o.documentOrder - s.documentOrder : o.tabIndex - s.tabIndex).map((o) => o.node).concat(t);
}
function MP() {
  return !0;
}
function AP(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: o = !1,
    disableRestoreFocus: s = !1,
    getTabbable: l = $P,
    isEnabled: u = MP,
    open: d
  } = e, p = k.useRef(!1), f = k.useRef(null), g = k.useRef(null), y = k.useRef(null), v = k.useRef(null), _ = k.useRef(!1), S = k.useRef(null), b = An(Vu(t), S), C = k.useRef(null);
  k.useEffect(() => {
    !d || !S.current || (_.current = !r);
  }, [r, d]), k.useEffect(() => {
    if (!d || !S.current)
      return;
    const x = Kn(S.current);
    return S.current.contains(x.activeElement) || (S.current.hasAttribute("tabIndex") || S.current.setAttribute("tabIndex", "-1"), _.current && S.current.focus()), () => {
      s || (y.current && y.current.focus && (p.current = !0, y.current.focus()), y.current = null);
    };
  }, [d]), k.useEffect(() => {
    if (!d || !S.current)
      return;
    const x = Kn(S.current), P = (A) => {
      C.current = A, !(o || !u() || A.key !== "Tab") && x.activeElement === S.current && A.shiftKey && (p.current = !0, g.current && g.current.focus());
    }, E = () => {
      const A = S.current;
      if (A === null)
        return;
      if (!x.hasFocus() || !u() || p.current) {
        p.current = !1;
        return;
      }
      if (A.contains(x.activeElement) || o && x.activeElement !== f.current && x.activeElement !== g.current)
        return;
      if (x.activeElement !== v.current)
        v.current = null;
      else if (v.current !== null)
        return;
      if (!_.current)
        return;
      let I = [];
      if ((x.activeElement === f.current || x.activeElement === g.current) && (I = l(S.current)), I.length > 0) {
        const L = !!(C.current?.shiftKey && C.current?.key === "Tab"), w = I[0], T = I[I.length - 1];
        typeof w != "string" && typeof T != "string" && (L ? T.focus() : w.focus());
      } else
        A.focus();
    };
    x.addEventListener("focusin", E), x.addEventListener("keydown", P, !0);
    const M = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && E();
    }, 50);
    return () => {
      clearInterval(M), x.removeEventListener("focusin", E), x.removeEventListener("keydown", P, !0);
    };
  }, [r, o, s, u, d, l]);
  const R = (x) => {
    y.current === null && (y.current = x.relatedTarget), _.current = !0, v.current = x.target;
    const P = t.props.onFocus;
    P && P(x);
  }, O = (x) => {
    y.current === null && (y.current = x.relatedTarget), _.current = !0;
  };
  return /* @__PURE__ */ B.jsxs(k.Fragment, {
    children: [/* @__PURE__ */ B.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: O,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: b,
      onFocus: R
    }), /* @__PURE__ */ B.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: O,
      ref: g,
      "data-testid": "sentinelEnd"
    })]
  });
}
function IP(e) {
  return typeof e == "function" ? e() : e;
}
function OP(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const tv = () => {
}, kl = new CP();
function NP(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: o = !1,
    closeAfterTransition: s = !1,
    onTransitionEnter: l,
    onTransitionExited: u,
    children: d,
    onClose: p,
    open: f,
    rootRef: g
  } = e, y = k.useRef({}), v = k.useRef(null), _ = k.useRef(null), S = An(_, g), [b, C] = k.useState(!f), R = OP(d);
  let O = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (O = !1);
  const x = () => Kn(v.current), P = () => (y.current.modalRef = _.current, y.current.mount = v.current, y.current), E = () => {
    kl.mount(P(), {
      disableScrollLock: o
    }), _.current && (_.current.scrollTop = 0);
  }, M = co(() => {
    const j = IP(t) || x().body;
    kl.add(P(), j), _.current && E();
  }), A = () => kl.isTopModal(P()), I = co((j) => {
    v.current = j, j && (f && A() ? E() : _.current && Es(_.current, O));
  }), L = k.useCallback(() => {
    kl.remove(P(), O);
  }, [O]);
  k.useEffect(() => () => {
    L();
  }, [L]), k.useEffect(() => {
    f ? M() : (!R || !s) && L();
  }, [f, L, R, s, M]);
  const w = (j) => (H) => {
    j.onKeyDown?.(H), !(H.key !== "Escape" || H.which === 229 || // Wait until IME is settled.
    !A()) && (r || (H.stopPropagation(), p && p(H, "escapeKeyDown")));
  }, T = (j) => (H) => {
    j.onClick?.(H), H.target === H.currentTarget && p && p(H, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const H = h0(e);
      delete H.onTransitionEnter, delete H.onTransitionExited;
      const Y = {
        ...H,
        ...j
      };
      return {
        /*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */
        role: "presentation",
        ...Y,
        onKeyDown: w(Y),
        ref: S
      };
    },
    getBackdropProps: (j = {}) => {
      const H = j;
      return {
        "aria-hidden": !0,
        ...H,
        onClick: T(H),
        open: f
      };
    },
    getTransitionProps: () => {
      const j = () => {
        C(!1), l && l();
      }, H = () => {
        C(!0), u && u(), s && L();
      };
      return {
        onEnter: Py(j, d?.props.onEnter ?? tv),
        onExited: Py(H, d?.props.onExited ?? tv)
      };
    },
    rootRef: S,
    portalRef: I,
    isTopModal: A,
    exited: b,
    hasTransition: R
  };
}
function LP(e) {
  return pt("MuiModal", e);
}
Xe("MuiModal", ["root", "hidden", "backdrop"]);
const DP = (e) => {
  const {
    open: t,
    exited: r,
    classes: o
  } = e;
  return wt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, LP, o);
}, FP = Me("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.open && r.exited && t.hidden];
  }
})(wn(({
  theme: e
}) => ({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState: t
    }) => !t.open && t.exited,
    style: {
      visibility: "hidden"
    }
  }]
}))), zP = Me(BE, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), jP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: s = zP,
    BackdropProps: l,
    classes: u,
    className: d,
    closeAfterTransition: p = !1,
    children: f,
    container: g,
    component: y,
    components: v = {},
    componentsProps: _ = {},
    disableAutoFocus: S = !1,
    disableEnforceFocus: b = !1,
    disableEscapeKeyDown: C = !1,
    disablePortal: R = !1,
    disableRestoreFocus: O = !1,
    disableScrollLock: x = !1,
    hideBackdrop: P = !1,
    keepMounted: E = !1,
    onBackdropClick: M,
    onClose: A,
    onTransitionEnter: I,
    onTransitionExited: L,
    open: w,
    slotProps: T = {},
    slots: N = {},
    // eslint-disable-next-line react/prop-types
    theme: V,
    ...F
  } = o, j = {
    ...o,
    closeAfterTransition: p,
    disableAutoFocus: S,
    disableEnforceFocus: b,
    disableEscapeKeyDown: C,
    disablePortal: R,
    disableRestoreFocus: O,
    disableScrollLock: x,
    hideBackdrop: P,
    keepMounted: E
  }, {
    getRootProps: H,
    getBackdropProps: Y,
    getTransitionProps: U,
    portalRef: W,
    isTopModal: K,
    exited: D,
    hasTransition: G
  } = NP({
    ...j,
    rootRef: r
  }), oe = {
    ...j,
    exited: D
  }, te = DP(oe), se = {};
  if (f.props.tabIndex === void 0 && (se.tabIndex = "-1"), G) {
    const {
      onEnter: we,
      onExited: _e
    } = U();
    se.onEnter = we, se.onExited = _e;
  }
  const le = {
    slots: {
      root: v.Root,
      backdrop: v.Backdrop,
      ...N
    },
    slotProps: {
      ..._,
      ...T
    }
  }, [de, he] = yn("root", {
    ref: r,
    elementType: FP,
    externalForwardedProps: {
      ...le,
      ...F,
      component: y
    },
    getSlotProps: H,
    ownerState: oe,
    className: Re(d, te?.root, !oe.open && oe.exited && te?.hidden)
  }), [fe, ue] = yn("backdrop", {
    ref: l?.ref,
    elementType: s,
    externalForwardedProps: le,
    shouldForwardComponentProp: !0,
    additionalProps: l,
    getSlotProps: (we) => Y({
      ...we,
      onClick: (_e) => {
        M && M(_e), we?.onClick && we.onClick(_e);
      }
    }),
    className: Re(l?.className, te?.backdrop),
    ownerState: oe
  });
  return !E && !w && (!G || D) ? null : /* @__PURE__ */ B.jsx(AE, {
    ref: W,
    container: g,
    disablePortal: R,
    children: /* @__PURE__ */ B.jsxs(de, {
      ...he,
      children: [!P && s ? /* @__PURE__ */ B.jsx(fe, {
        ...ue
      }) : null, /* @__PURE__ */ B.jsx(AP, {
        disableEnforceFocus: b,
        disableAutoFocus: S,
        disableRestoreFocus: O,
        isEnabled: K,
        open: w,
        children: /* @__PURE__ */ k.cloneElement(f, se)
      })]
    })
  });
}), nv = Xe("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function BP(e) {
  return pt("MuiFormGroup", e);
}
Xe("MuiFormGroup", ["root", "row", "error"]);
const UP = (e) => {
  const {
    classes: t,
    row: r,
    error: o
  } = e;
  return wt({
    root: ["root", r && "row", o && "error"]
  }, BP, t);
}, WP = Me("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.row && t.row];
  }
})({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  variants: [{
    props: {
      row: !0
    },
    style: {
      flexDirection: "row"
    }
  }]
}), VP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiFormGroup"
  }), {
    className: s,
    row: l = !1,
    ...u
  } = o, d = D0(), p = OE({
    props: o,
    muiFormControl: d,
    states: ["error"]
  }), f = {
    ...o,
    row: l,
    error: p.error
  }, g = UP(f);
  return /* @__PURE__ */ B.jsx(WP, {
    className: Re(g.root, s),
    ownerState: f,
    ref: r,
    ...u
  });
});
function Yf(e) {
  return `scale(${e}, ${e ** 2})`;
}
const HP = {
  entering: {
    opacity: 1,
    transform: Yf(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, mf = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Jf = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const {
    addEndListener: o,
    appear: s = !0,
    children: l,
    easing: u,
    in: d,
    onEnter: p,
    onEntered: f,
    onEntering: g,
    onExit: y,
    onExited: v,
    onExiting: _,
    style: S,
    timeout: b = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: C = Qn,
    ...R
  } = t, O = d0(), x = k.useRef(), P = Hp(), E = k.useRef(null), M = An(E, Vu(l), r), A = (j) => (H) => {
    if (j) {
      const Y = E.current;
      H === void 0 ? j(Y) : j(Y, H);
    }
  }, I = A(g), L = A((j, H) => {
    O0(j);
    const {
      duration: Y,
      delay: U,
      easing: W
    } = cu({
      style: S,
      timeout: b,
      easing: u
    }, {
      mode: "enter"
    });
    let K;
    b === "auto" ? (K = P.transitions.getAutoHeightDuration(j.clientHeight), x.current = K) : K = Y, j.style.transition = [P.transitions.create("opacity", {
      duration: K,
      delay: U
    }), P.transitions.create("transform", {
      duration: mf ? K : K * 0.666,
      delay: U,
      easing: W
    })].join(","), p && p(j, H);
  }), w = A(f), T = A(_), N = A((j) => {
    const {
      duration: H,
      delay: Y,
      easing: U
    } = cu({
      style: S,
      timeout: b,
      easing: u
    }, {
      mode: "exit"
    });
    let W;
    b === "auto" ? (W = P.transitions.getAutoHeightDuration(j.clientHeight), x.current = W) : W = H, j.style.transition = [P.transitions.create("opacity", {
      duration: W,
      delay: Y
    }), P.transitions.create("transform", {
      duration: mf ? W : W * 0.666,
      delay: mf ? Y : Y || W * 0.333,
      easing: U
    })].join(","), j.style.opacity = 0, j.style.transform = Yf(0.75), y && y(j);
  }), V = A(v), F = (j) => {
    b === "auto" && O.start(x.current || 0, j), o && o(E.current, j);
  };
  return /* @__PURE__ */ B.jsx(C, {
    appear: s,
    in: d,
    nodeRef: E,
    onEnter: L,
    onEntered: w,
    onEntering: I,
    onExit: N,
    onExited: V,
    onExiting: T,
    addEndListener: F,
    timeout: b === "auto" ? null : b,
    ...R,
    children: (j, {
      ownerState: H,
      ...Y
    }) => /* @__PURE__ */ k.cloneElement(l, {
      style: {
        opacity: 0,
        transform: Yf(0.75),
        visibility: j === "exited" && !d ? "hidden" : void 0,
        ...HP[j],
        ...S,
        ...l.props.style
      },
      ref: M,
      ...Y
    })
  });
});
Jf && (Jf.muiSupportAuto = !0);
const Xf = /* @__PURE__ */ k.createContext({});
function qP(e) {
  return pt("MuiList", e);
}
Xe("MuiList", ["root", "padding", "dense", "subheader"]);
const KP = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: o,
    subheader: s
  } = e;
  return wt({
    root: ["root", !r && "padding", o && "dense", s && "subheader"]
  }, qP, t);
}, QP = Me("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.disablePadding && t.padding, r.dense && t.dense, r.subheader && t.subheader];
  }
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
    props: ({
      ownerState: e
    }) => !e.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState: e
    }) => e.subheader,
    style: {
      paddingTop: 0
    }
  }]
}), GP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiList"
  }), {
    children: s,
    className: l,
    component: u = "ul",
    dense: d = !1,
    disablePadding: p = !1,
    subheader: f,
    ...g
  } = o, y = k.useMemo(() => ({
    dense: d
  }), [d]), v = {
    ...o,
    component: u,
    dense: d,
    disablePadding: p
  }, _ = KP(v);
  return /* @__PURE__ */ B.jsx(Xf.Provider, {
    value: y,
    children: /* @__PURE__ */ B.jsxs(QP, {
      as: u,
      className: Re(_.root, l),
      ref: r,
      ownerState: v,
      ...g,
      children: [f, s]
    })
  });
}), rv = Xe("MuiListItemIcon", ["root", "alignItemsFlexStart"]), iv = Xe("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
function yf(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function ov(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function j0(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.startsWith(t.keys.join(""));
}
function cs(e, t, r, o, s, l) {
  let u = !1, d = s(e, t, t ? r : !1);
  for (; d; ) {
    if (d === e.firstChild) {
      if (u)
        return !1;
      u = !0;
    }
    const p = o ? !1 : d.disabled || d.getAttribute("aria-disabled") === "true";
    if (!d.hasAttribute("tabindex") || !j0(d, l) || p)
      d = s(e, d, r);
    else
      return d.focus(), !0;
  }
  return !1;
}
const YP = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: o,
    autoFocus: s = !1,
    autoFocusItem: l = !1,
    children: u,
    className: d,
    disabledItemsFocusable: p = !1,
    disableListWrap: f = !1,
    onKeyDown: g,
    variant: y = "selectedMenu",
    ...v
  } = t, _ = k.useRef(null), S = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  ho(() => {
    s && _.current.focus();
  }, [s]), k.useImperativeHandle(o, () => ({
    adjustStyleForScrollbar: (x, {
      direction: P
    }) => {
      const E = !_.current.style.width;
      if (x.clientHeight < _.current.clientHeight && E) {
        const M = `${f0(bi(x))}px`;
        _.current.style[P === "rtl" ? "paddingLeft" : "paddingRight"] = M, _.current.style.width = `calc(100% + ${M})`;
      }
      return _.current;
    }
  }), []);
  const b = (x) => {
    const P = _.current, E = x.key;
    if (x.ctrlKey || x.metaKey || x.altKey) {
      g && g(x);
      return;
    }
    const A = Kn(P).activeElement;
    if (E === "ArrowDown")
      x.preventDefault(), cs(P, A, f, p, yf);
    else if (E === "ArrowUp")
      x.preventDefault(), cs(P, A, f, p, ov);
    else if (E === "Home")
      x.preventDefault(), cs(P, null, f, p, yf);
    else if (E === "End")
      x.preventDefault(), cs(P, null, f, p, ov);
    else if (E.length === 1) {
      const I = S.current, L = E.toLowerCase(), w = performance.now();
      I.keys.length > 0 && (w - I.lastTime > 500 ? (I.keys = [], I.repeating = !0, I.previousKeyMatched = !0) : I.repeating && L !== I.keys[0] && (I.repeating = !1)), I.lastTime = w, I.keys.push(L);
      const T = A && !I.repeating && j0(A, I);
      I.previousKeyMatched && (T || cs(P, A, !1, p, yf, I)) ? x.preventDefault() : I.previousKeyMatched = !1;
    }
    g && g(x);
  }, C = An(_, r);
  let R = -1;
  k.Children.forEach(u, (x, P) => {
    if (!/* @__PURE__ */ k.isValidElement(x)) {
      R === P && (R += 1, R >= u.length && (R = -1));
      return;
    }
    x.props.disabled || (y === "selectedMenu" && x.props.selected || R === -1) && (R = P), R === P && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (R += 1, R >= u.length && (R = -1));
  });
  const O = k.Children.map(u, (x, P) => {
    if (P === R) {
      const E = {};
      return l && (E.autoFocus = !0), x.props.tabIndex === void 0 && y === "selectedMenu" && (E.tabIndex = 0), /* @__PURE__ */ k.cloneElement(x, E);
    }
    return x;
  });
  return /* @__PURE__ */ B.jsx(GP, {
    role: "menu",
    ref: C,
    className: d,
    onKeyDown: b,
    tabIndex: s ? 0 : -1,
    ...v,
    children: O
  });
});
function JP(e) {
  return pt("MuiPopover", e);
}
Xe("MuiPopover", ["root", "paper"]);
function sv(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function av(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function lv(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Cl(e) {
  return typeof e == "function" ? e() : e;
}
const XP = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"],
    paper: ["paper"]
  }, JP, t);
}, ZP = Me(jP, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), B0 = Me(N0, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), eR = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiPopover"
  }), {
    action: s,
    anchorEl: l,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: p = "anchorEl",
    children: f,
    className: g,
    container: y,
    elevation: v = 8,
    marginThreshold: _ = 16,
    open: S,
    PaperProps: b = {},
    // TODO: remove in v7
    slots: C = {},
    slotProps: R = {},
    transformOrigin: O = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: x,
    // TODO: remove in v7
    transitionDuration: P = "auto",
    TransitionProps: E = {},
    // TODO: remove in v7
    disableScrollLock: M = !1,
    ...A
  } = o, I = k.useRef(), L = {
    ...o,
    anchorOrigin: u,
    anchorReference: p,
    elevation: v,
    marginThreshold: _,
    transformOrigin: O,
    TransitionComponent: x,
    transitionDuration: P,
    TransitionProps: E
  }, w = XP(L), T = k.useCallback(() => {
    if (p === "anchorPosition")
      return d;
    const ue = Cl(l), _e = (ue && ue.nodeType === 1 ? ue : Kn(I.current).body).getBoundingClientRect();
    return {
      top: _e.top + sv(_e, u.vertical),
      left: _e.left + av(_e, u.horizontal)
    };
  }, [l, u.horizontal, u.vertical, d, p]), N = k.useCallback((ue) => ({
    vertical: sv(ue, O.vertical),
    horizontal: av(ue, O.horizontal)
  }), [O.horizontal, O.vertical]), V = k.useCallback((ue) => {
    const we = {
      width: ue.offsetWidth,
      height: ue.offsetHeight
    }, _e = N(we);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: lv(_e)
      };
    const qe = T();
    let ze = qe.top - _e.vertical, st = qe.left - _e.horizontal;
    const ut = ze + we.height, Ze = st + we.width, De = bi(Cl(l)), Rt = De.innerHeight - _, ct = De.innerWidth - _;
    if (_ !== null && ze < _) {
      const We = ze - _;
      ze -= We, _e.vertical += We;
    } else if (_ !== null && ut > Rt) {
      const We = ut - Rt;
      ze -= We, _e.vertical += We;
    }
    if (_ !== null && st < _) {
      const We = st - _;
      st -= We, _e.horizontal += We;
    } else if (Ze > ct) {
      const We = Ze - ct;
      st -= We, _e.horizontal += We;
    }
    return {
      top: `${Math.round(ze)}px`,
      left: `${Math.round(st)}px`,
      transformOrigin: lv(_e)
    };
  }, [l, p, T, N, _]), [F, j] = k.useState(S), H = k.useCallback(() => {
    const ue = I.current;
    if (!ue)
      return;
    const we = V(ue);
    we.top !== null && ue.style.setProperty("top", we.top), we.left !== null && (ue.style.left = we.left), ue.style.transformOrigin = we.transformOrigin, j(!0);
  }, [V]);
  k.useEffect(() => (M && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [l, M, H]);
  const Y = () => {
    H();
  }, U = () => {
    j(!1);
  };
  k.useEffect(() => {
    S && H();
  }), k.useImperativeHandle(s, () => S ? {
    updatePosition: () => {
      H();
    }
  } : null, [S, H]), k.useEffect(() => {
    if (!S)
      return;
    const ue = xk(() => {
      H();
    }), we = bi(Cl(l));
    return we.addEventListener("resize", ue), () => {
      ue.clear(), we.removeEventListener("resize", ue);
    };
  }, [l, S, H]);
  let W = P;
  const K = {
    slots: {
      transition: x,
      ...C
    },
    slotProps: {
      transition: E,
      paper: b,
      ...R
    }
  }, [D, G] = yn("transition", {
    elementType: Jf,
    externalForwardedProps: K,
    ownerState: L,
    getSlotProps: (ue) => ({
      ...ue,
      onEntering: (we, _e) => {
        ue.onEntering?.(we, _e), Y();
      },
      onExited: (we) => {
        ue.onExited?.(we), U();
      }
    }),
    additionalProps: {
      appear: !0,
      in: S
    }
  });
  P === "auto" && !D.muiSupportAuto && (W = void 0);
  const oe = y || (l ? Kn(Cl(l)).body : void 0), [te, {
    slots: se,
    slotProps: le,
    ...de
  }] = yn("root", {
    ref: r,
    elementType: ZP,
    externalForwardedProps: {
      ...K,
      ...A
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: C.backdrop
      },
      slotProps: {
        backdrop: T0(typeof R.backdrop == "function" ? R.backdrop(L) : R.backdrop, {
          invisible: !0
        })
      },
      container: oe,
      open: S
    },
    ownerState: L,
    className: Re(w.root, g)
  }), [he, fe] = yn("paper", {
    ref: I,
    className: w.paper,
    elementType: B0,
    externalForwardedProps: K,
    shouldForwardComponentProp: !0,
    additionalProps: {
      elevation: v,
      style: F ? void 0 : {
        opacity: 0
      }
    },
    ownerState: L
  });
  return /* @__PURE__ */ B.jsx(te, {
    ...de,
    ...!IE(te) && {
      slots: se,
      slotProps: le,
      disableScrollLock: M
    },
    children: /* @__PURE__ */ B.jsx(D, {
      ...G,
      timeout: W,
      children: /* @__PURE__ */ B.jsx(he, {
        ...fe,
        children: f
      })
    })
  });
});
function tR(e) {
  return pt("MuiMenu", e);
}
Xe("MuiMenu", ["root", "paper", "list"]);
const nR = {
  vertical: "top",
  horizontal: "right"
}, rR = {
  vertical: "top",
  horizontal: "left"
}, iR = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, tR, t);
}, oR = Me(eR, {
  shouldForwardProp: (e) => wo(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), sR = Me(B0, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), aR = Me(YP, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), lR = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: u,
    disableAutoFocusItem: d = !1,
    MenuListProps: p = {},
    onClose: f,
    open: g,
    PaperProps: y = {},
    PopoverClasses: v,
    transitionDuration: _ = "auto",
    TransitionProps: {
      onEntering: S,
      ...b
    } = {},
    variant: C = "selectedMenu",
    slots: R = {},
    slotProps: O = {},
    ...x
  } = o, P = Lk(), E = {
    ...o,
    autoFocus: s,
    disableAutoFocusItem: d,
    MenuListProps: p,
    onEntering: S,
    PaperProps: y,
    transitionDuration: _,
    TransitionProps: b,
    variant: C
  }, M = iR(E), A = s && !d && g, I = k.useRef(null), L = (W, K) => {
    I.current && I.current.adjustStyleForScrollbar(W, {
      direction: P ? "rtl" : "ltr"
    }), S && S(W, K);
  }, w = (W) => {
    W.key === "Tab" && (W.preventDefault(), f && f(W, "tabKeyDown"));
  };
  let T = -1;
  k.Children.map(l, (W, K) => {
    /* @__PURE__ */ k.isValidElement(W) && (W.props.disabled || (C === "selectedMenu" && W.props.selected || T === -1) && (T = K));
  });
  const N = {
    slots: R,
    slotProps: {
      list: p,
      transition: b,
      paper: y,
      ...O
    }
  }, V = $k({
    elementType: R.root,
    externalSlotProps: O.root,
    ownerState: E,
    className: [M.root, u]
  }), [F, j] = yn("paper", {
    className: M.paper,
    elementType: sR,
    externalForwardedProps: N,
    shouldForwardComponentProp: !0,
    ownerState: E
  }), [H, Y] = yn("list", {
    className: Re(M.list, p.className),
    elementType: aR,
    shouldForwardComponentProp: !0,
    externalForwardedProps: N,
    getSlotProps: (W) => ({
      ...W,
      onKeyDown: (K) => {
        w(K), W.onKeyDown?.(K);
      }
    }),
    ownerState: E
  }), U = typeof N.slotProps.transition == "function" ? N.slotProps.transition(E) : N.slotProps.transition;
  return /* @__PURE__ */ B.jsx(oR, {
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? nR : rR,
    slots: {
      root: R.root,
      paper: F,
      backdrop: R.backdrop,
      ...R.transition && {
        // TODO: pass `slots.transition` directly once `TransitionComponent` is removed from Popover
        transition: R.transition
      }
    },
    slotProps: {
      root: V,
      paper: j,
      backdrop: typeof O.backdrop == "function" ? O.backdrop(E) : O.backdrop,
      transition: {
        ...U,
        onEntering: (...W) => {
          L(...W), U?.onEntering?.(...W);
        }
      }
    },
    open: g,
    ref: r,
    transitionDuration: _,
    ownerState: E,
    ...x,
    classes: v,
    children: /* @__PURE__ */ B.jsx(H, {
      actions: I,
      autoFocus: s && (T === -1 || d),
      autoFocusItem: A,
      variant: C,
      ...Y,
      children: l
    })
  });
});
function uR(e) {
  return pt("MuiMenuItem", e);
}
const ds = Xe("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), cR = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.divider && t.divider, !r.disableGutters && t.gutters];
}, dR = (e) => {
  const {
    disabled: t,
    dense: r,
    divider: o,
    disableGutters: s,
    selected: l,
    classes: u
  } = e, p = wt({
    root: ["root", r && "dense", t && "disabled", !s && "gutters", o && "divider", l && "selected"]
  }, uR, u);
  return {
    ...u,
    ...p
  };
}, fR = Me(Hu, {
  shouldForwardProp: (e) => wo(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: cR
})(wn(({
  theme: e
}) => ({
  ...e.typography.body1,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${ds.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Ct(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${ds.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Ct(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${ds.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Ct(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Ct(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${ds.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${ds.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${nv.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${nv.inset}`]: {
    marginLeft: 52
  },
  [`& .${iv.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${iv.inset}`]: {
    paddingLeft: 36
  },
  [`& .${rv.root}`]: {
    minWidth: 36
  },
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.dense,
    style: {
      [e.breakpoints.up("sm")]: {
        minHeight: "auto"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.dense,
    style: {
      minHeight: 32,
      // https://m2.material.io/components/menus#specs > Dense
      paddingTop: 4,
      paddingBottom: 4,
      ...e.typography.body2,
      [`& .${rv.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), pR = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiMenuItem"
  }), {
    autoFocus: s = !1,
    component: l = "li",
    dense: u = !1,
    divider: d = !1,
    disableGutters: p = !1,
    focusVisibleClassName: f,
    role: g = "menuitem",
    tabIndex: y,
    className: v,
    ..._
  } = o, S = k.useContext(Xf), b = k.useMemo(() => ({
    dense: u || S.dense || !1,
    disableGutters: p
  }), [S.dense, u, p]), C = k.useRef(null);
  ho(() => {
    s && C.current && C.current.focus();
  }, [s]);
  const R = {
    ...o,
    dense: b.dense,
    divider: d,
    disableGutters: p
  }, O = dR(o), x = An(C, r);
  let P;
  return o.disabled || (P = y !== void 0 ? y : -1), /* @__PURE__ */ B.jsx(Xf.Provider, {
    value: b,
    children: /* @__PURE__ */ B.jsx(fR, {
      ref: x,
      role: g,
      tabIndex: P,
      component: l,
      focusVisibleClassName: Re(O.focusVisible, f),
      className: Re(O.root, v),
      ..._,
      ownerState: R,
      classes: O
    })
  });
});
function hR(e) {
  return pt("MuiSkeleton", e);
}
Xe("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]);
const gR = (e) => {
  const {
    classes: t,
    variant: r,
    animation: o,
    hasChildren: s,
    width: l,
    height: u
  } = e;
  return wt({
    root: ["root", r, o, s && "withChildren", s && !l && "fitContent", s && !u && "heightAuto"]
  }, hR, t);
}, Zf = Ei`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`, ep = Ei`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`, mR = typeof Zf != "string" ? Qs`
        animation: ${Zf} 2s ease-in-out 0.5s infinite;
      ` : null, yR = typeof ep != "string" ? Qs`
        &::after {
          animation: ${ep} 2s linear 0.5s infinite;
        }
      ` : null, vR = Me("span", {
  name: "MuiSkeleton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], r.animation !== !1 && t[r.animation], r.hasChildren && t.withChildren, r.hasChildren && !r.width && t.fitContent, r.hasChildren && !r.height && t.heightAuto];
  }
})(wn(({
  theme: e
}) => {
  const t = TC(e.shape.borderRadius) || "px", r = $C(e.shape.borderRadius);
  return {
    display: "block",
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: e.vars ? e.vars.palette.Skeleton.bg : Ct(e.palette.text.primary, e.palette.mode === "light" ? 0.11 : 0.13),
    height: "1.2em",
    variants: [{
      props: {
        variant: "text"
      },
      style: {
        marginTop: 0,
        marginBottom: 0,
        height: "auto",
        transformOrigin: "0 55%",
        transform: "scale(1, 0.60)",
        borderRadius: `${r}${t}/${Math.round(r / 0.6 * 10) / 10}${t}`,
        "&:empty:before": {
          content: '"\\00a0"'
        }
      }
    }, {
      props: {
        variant: "circular"
      },
      style: {
        borderRadius: "50%"
      }
    }, {
      props: {
        variant: "rounded"
      },
      style: {
        borderRadius: (e.vars || e).shape.borderRadius
      }
    }, {
      props: ({
        ownerState: o
      }) => o.hasChildren,
      style: {
        "& > *": {
          visibility: "hidden"
        }
      }
    }, {
      props: ({
        ownerState: o
      }) => o.hasChildren && !o.width,
      style: {
        maxWidth: "fit-content"
      }
    }, {
      props: ({
        ownerState: o
      }) => o.hasChildren && !o.height,
      style: {
        height: "auto"
      }
    }, {
      props: {
        animation: "pulse"
      },
      style: mR || {
        animation: `${Zf} 2s ease-in-out 0.5s infinite`
      }
    }, {
      props: {
        animation: "wave"
      },
      style: {
        position: "relative",
        overflow: "hidden",
        /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        "&::after": {
          background: `linear-gradient(
                90deg,
                transparent,
                ${(e.vars || e).palette.action.hover},
                transparent
              )`,
          content: '""',
          position: "absolute",
          transform: "translateX(-100%)",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }
      }
    }, {
      props: {
        animation: "wave"
      },
      style: yR || {
        "&::after": {
          animation: `${ep} 2s linear 0.5s infinite`
        }
      }
    }]
  };
})), wR = /* @__PURE__ */ k.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiSkeleton"
  }), {
    animation: s = "pulse",
    className: l,
    component: u = "span",
    height: d,
    style: p,
    variant: f = "text",
    width: g,
    ...y
  } = o, v = {
    ...o,
    animation: s,
    component: u,
    variant: f,
    hasChildren: !!y.children
  }, _ = gR(v);
  return /* @__PURE__ */ B.jsx(vR, {
    as: u,
    ref: r,
    className: Re(_.root, l),
    ownerState: v,
    ...y,
    style: {
      width: g,
      height: d,
      ...p
    }
  });
});
var El = {}, uv;
function SR() {
  if (uv) return El;
  uv = 1;
  var e = A0();
  return El.createRoot = e.createRoot, El.hydrateRoot = e.hydrateRoot, El;
}
var bR = SR();
const _R = /* @__PURE__ */ Qr(bR);
var fs = {}, cv;
function xR() {
  if (cv) return fs;
  cv = 1, Object.defineProperty(fs, "__esModule", { value: !0 }), fs.parse = u, fs.serialize = f;
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, t = /^[\u0021-\u003A\u003C-\u007E]*$/, r = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, s = Object.prototype.toString, l = /* @__PURE__ */ (() => {
    const v = function() {
    };
    return v.prototype = /* @__PURE__ */ Object.create(null), v;
  })();
  function u(v, _) {
    const S = new l(), b = v.length;
    if (b < 2)
      return S;
    const C = _?.decode || g;
    let R = 0;
    do {
      const O = v.indexOf("=", R);
      if (O === -1)
        break;
      const x = v.indexOf(";", R), P = x === -1 ? b : x;
      if (O > P) {
        R = v.lastIndexOf(";", O - 1) + 1;
        continue;
      }
      const E = d(v, R, O), M = p(v, O, E), A = v.slice(E, M);
      if (S[A] === void 0) {
        let I = d(v, O + 1, P), L = p(v, P, I);
        const w = C(v.slice(I, L));
        S[A] = w;
      }
      R = P + 1;
    } while (R < b);
    return S;
  }
  function d(v, _, S) {
    do {
      const b = v.charCodeAt(_);
      if (b !== 32 && b !== 9)
        return _;
    } while (++_ < S);
    return S;
  }
  function p(v, _, S) {
    for (; _ > S; ) {
      const b = v.charCodeAt(--_);
      if (b !== 32 && b !== 9)
        return _ + 1;
    }
    return S;
  }
  function f(v, _, S) {
    const b = S?.encode || encodeURIComponent;
    if (!e.test(v))
      throw new TypeError(`argument name is invalid: ${v}`);
    const C = b(_);
    if (!t.test(C))
      throw new TypeError(`argument val is invalid: ${_}`);
    let R = v + "=" + C;
    if (!S)
      return R;
    if (S.maxAge !== void 0) {
      if (!Number.isInteger(S.maxAge))
        throw new TypeError(`option maxAge is invalid: ${S.maxAge}`);
      R += "; Max-Age=" + S.maxAge;
    }
    if (S.domain) {
      if (!r.test(S.domain))
        throw new TypeError(`option domain is invalid: ${S.domain}`);
      R += "; Domain=" + S.domain;
    }
    if (S.path) {
      if (!o.test(S.path))
        throw new TypeError(`option path is invalid: ${S.path}`);
      R += "; Path=" + S.path;
    }
    if (S.expires) {
      if (!y(S.expires) || !Number.isFinite(S.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${S.expires}`);
      R += "; Expires=" + S.expires.toUTCString();
    }
    if (S.httpOnly && (R += "; HttpOnly"), S.secure && (R += "; Secure"), S.partitioned && (R += "; Partitioned"), S.priority)
      switch (typeof S.priority == "string" ? S.priority.toLowerCase() : void 0) {
        case "low":
          R += "; Priority=Low";
          break;
        case "medium":
          R += "; Priority=Medium";
          break;
        case "high":
          R += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${S.priority}`);
      }
    if (S.sameSite)
      switch (typeof S.sameSite == "string" ? S.sameSite.toLowerCase() : S.sameSite) {
        case !0:
        case "strict":
          R += "; SameSite=Strict";
          break;
        case "lax":
          R += "; SameSite=Lax";
          break;
        case "none":
          R += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${S.sameSite}`);
      }
    return R;
  }
  function g(v) {
    if (v.indexOf("%") === -1)
      return v;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  }
  function y(v) {
    return s.call(v) === "[object Date]";
  }
  return fs;
}
xR();
/**
 * react-router v7.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var dv = "popstate";
function kR(e = {}) {
  function t(o, s) {
    let { pathname: l, search: u, hash: d } = o.location;
    return tp(
      "",
      { pathname: l, search: u, hash: d },
      // state defaults to `null` because `window.history.state` does
      s.state && s.state.usr || null,
      s.state && s.state.key || "default"
    );
  }
  function r(o, s) {
    return typeof s == "string" ? s : Ls(s);
  }
  return ER(
    t,
    r,
    null,
    e
  );
}
function Je(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function In(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function CR() {
  return Math.random().toString(36).substring(2, 10);
}
function fv(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function tp(e, t, r = null, o) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof t == "string" ? So(t) : t,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || o || CR()
  };
}
function Ls({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function So(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let o = e.indexOf("?");
    o >= 0 && (t.search = e.substring(o), e = e.substring(0, o)), e && (t.pathname = e);
  }
  return t;
}
function ER(e, t, r, o = {}) {
  let { window: s = document.defaultView, v5Compat: l = !1 } = o, u = s.history, d = "POP", p = null, f = g();
  f == null && (f = 0, u.replaceState({ ...u.state, idx: f }, ""));
  function g() {
    return (u.state || { idx: null }).idx;
  }
  function y() {
    d = "POP";
    let C = g(), R = C == null ? null : C - f;
    f = C, p && p({ action: d, location: b.location, delta: R });
  }
  function v(C, R) {
    d = "PUSH";
    let O = tp(b.location, C, R);
    f = g() + 1;
    let x = fv(O, f), P = b.createHref(O);
    try {
      u.pushState(x, "", P);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError")
        throw E;
      s.location.assign(P);
    }
    l && p && p({ action: d, location: b.location, delta: 1 });
  }
  function _(C, R) {
    d = "REPLACE";
    let O = tp(b.location, C, R);
    f = g();
    let x = fv(O, f), P = b.createHref(O);
    u.replaceState(x, "", P), l && p && p({ action: d, location: b.location, delta: 0 });
  }
  function S(C) {
    let R = s.location.origin !== "null" ? s.location.origin : s.location.href, O = typeof C == "string" ? C : Ls(C);
    return O = O.replace(/ $/, "%20"), Je(
      R,
      `No window.location.(origin|href) available to create URL for href: ${O}`
    ), new URL(O, R);
  }
  let b = {
    get action() {
      return d;
    },
    get location() {
      return e(s, u);
    },
    listen(C) {
      if (p)
        throw new Error("A history only accepts one active listener");
      return s.addEventListener(dv, y), p = C, () => {
        s.removeEventListener(dv, y), p = null;
      };
    },
    createHref(C) {
      return t(s, C);
    },
    createURL: S,
    encodeLocation(C) {
      let R = S(C);
      return {
        pathname: R.pathname,
        search: R.search,
        hash: R.hash
      };
    },
    push: v,
    replace: _,
    go(C) {
      return u.go(C);
    }
  };
  return b;
}
function U0(e, t, r = "/") {
  return PR(e, t, r, !1);
}
function PR(e, t, r, o) {
  let s = typeof t == "string" ? So(t) : t, l = hr(s.pathname || "/", r);
  if (l == null)
    return null;
  let u = W0(e);
  RR(u);
  let d = null;
  for (let p = 0; d == null && p < u.length; ++p) {
    let f = zR(l);
    d = DR(
      u[p],
      f,
      o
    );
  }
  return d;
}
function W0(e, t = [], r = [], o = "") {
  let s = (l, u, d) => {
    let p = {
      relativePath: d === void 0 ? l.path || "" : d,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: u,
      route: l
    };
    p.relativePath.startsWith("/") && (Je(
      p.relativePath.startsWith(o),
      `Absolute route path "${p.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
    ), p.relativePath = p.relativePath.slice(o.length));
    let f = dr([o, p.relativePath]), g = r.concat(p);
    l.children && l.children.length > 0 && (Je(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      l.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${f}".`
    ), W0(l.children, t, g, f)), !(l.path == null && !l.index) && t.push({
      path: f,
      score: NR(f, l.index),
      routesMeta: g
    });
  };
  return e.forEach((l, u) => {
    if (l.path === "" || !l.path?.includes("?"))
      s(l, u);
    else
      for (let d of V0(l.path))
        s(l, u, d);
  }), t;
}
function V0(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...o] = t, s = r.endsWith("?"), l = r.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [l, ""] : [l];
  let u = V0(o.join("/")), d = [];
  return d.push(
    ...u.map(
      (p) => p === "" ? l : [l, p].join("/")
    )
  ), s && d.push(...u), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function RR(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : LR(
      t.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var TR = /^:[\w-]+$/, $R = 3, MR = 2, AR = 1, IR = 10, OR = -2, pv = (e) => e === "*";
function NR(e, t) {
  let r = e.split("/"), o = r.length;
  return r.some(pv) && (o += OR), t && (o += MR), r.filter((s) => !pv(s)).reduce(
    (s, l) => s + (TR.test(l) ? $R : l === "" ? AR : IR),
    o
  );
}
function LR(e, t) {
  return e.length === t.length && e.slice(0, -1).every((o, s) => o === t[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function DR(e, t, r = !1) {
  let { routesMeta: o } = e, s = {}, l = "/", u = [];
  for (let d = 0; d < o.length; ++d) {
    let p = o[d], f = d === o.length - 1, g = l === "/" ? t : t.slice(l.length) || "/", y = pu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: f },
      g
    ), v = p.route;
    if (!y && f && r && !o[o.length - 1].route.index && (y = pu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      g
    )), !y)
      return null;
    Object.assign(s, y.params), u.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: dr([l, y.pathname]),
      pathnameBase: WR(
        dr([l, y.pathnameBase])
      ),
      route: v
    }), y.pathnameBase !== "/" && (l = dr([l, y.pathnameBase]));
  }
  return u;
}
function pu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, o] = FR(
    e.path,
    e.caseSensitive,
    e.end
  ), s = t.match(r);
  if (!s) return null;
  let l = s[0], u = l.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: o.reduce(
      (f, { paramName: g, isOptional: y }, v) => {
        if (g === "*") {
          let S = d[v] || "";
          u = l.slice(0, l.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const _ = d[v];
        return y && !_ ? f[g] = void 0 : f[g] = (_ || "").replace(/%2F/g, "/"), f;
      },
      {}
    ),
    pathname: l,
    pathnameBase: u,
    pattern: e
  };
}
function FR(e, t = !1, r = !0) {
  In(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (u, d, p) => (o.push({ paramName: d, isOptional: p != null }), p ? "/?([^\\/]+)?" : "/([^\\/]+)")
  );
  return e.endsWith("*") ? (o.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), o];
}
function zR(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return In(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function hr(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, o = e.charAt(r);
  return o && o !== "/" ? null : e.slice(r) || "/";
}
function jR(e, t = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: s = ""
  } = typeof e == "string" ? So(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : BR(r, t) : t,
    search: VR(o),
    hash: HR(s)
  };
}
function BR(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function vf(e, t, r, o) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function UR(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function H0(e) {
  let t = UR(e);
  return t.map(
    (r, o) => o === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function q0(e, t, r, o = !1) {
  let s;
  typeof e == "string" ? s = So(e) : (s = { ...e }, Je(
    !s.pathname || !s.pathname.includes("?"),
    vf("?", "pathname", "search", s)
  ), Je(
    !s.pathname || !s.pathname.includes("#"),
    vf("#", "pathname", "hash", s)
  ), Je(
    !s.search || !s.search.includes("#"),
    vf("#", "search", "hash", s)
  ));
  let l = e === "" || s.pathname === "", u = l ? "/" : s.pathname, d;
  if (u == null)
    d = r;
  else {
    let y = t.length - 1;
    if (!o && u.startsWith("..")) {
      let v = u.split("/");
      for (; v[0] === ".."; )
        v.shift(), y -= 1;
      s.pathname = v.join("/");
    }
    d = y >= 0 ? t[y] : "/";
  }
  let p = jR(s, d), f = u && u !== "/" && u.endsWith("/"), g = (l || u === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (f || g) && (p.pathname += "/"), p;
}
var dr = (e) => e.join("/").replace(/\/\/+/g, "/"), WR = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), VR = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, HR = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function qR(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var K0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  K0
);
var KR = [
  "GET",
  ...K0
];
new Set(KR);
var bo = k.createContext(null);
bo.displayName = "DataRouter";
var Qu = k.createContext(null);
Qu.displayName = "DataRouterState";
var Q0 = k.createContext({
  isTransitioning: !1
});
Q0.displayName = "ViewTransition";
var QR = k.createContext(
  /* @__PURE__ */ new Map()
);
QR.displayName = "Fetchers";
var GR = k.createContext(null);
GR.displayName = "Await";
var Gn = k.createContext(
  null
);
Gn.displayName = "Navigation";
var Zs = k.createContext(
  null
);
Zs.displayName = "Location";
var Yn = k.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Yn.displayName = "Route";
var Qp = k.createContext(null);
Qp.displayName = "RouteError";
function YR(e, { relative: t } = {}) {
  Je(
    ea(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: o } = k.useContext(Gn), { hash: s, pathname: l, search: u } = ta(e, { relative: t }), d = l;
  return r !== "/" && (d = l === "/" ? r : dr([r, l])), o.createHref({ pathname: d, search: u, hash: s });
}
function ea() {
  return k.useContext(Zs) != null;
}
function Yr() {
  return Je(
    ea(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), k.useContext(Zs).location;
}
var G0 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Y0(e) {
  k.useContext(Gn).static || k.useLayoutEffect(e);
}
function J0() {
  let { isDataRoute: e } = k.useContext(Yn);
  return e ? cT() : JR();
}
function JR() {
  Je(
    ea(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = k.useContext(bo), { basename: t, navigator: r } = k.useContext(Gn), { matches: o } = k.useContext(Yn), { pathname: s } = Yr(), l = JSON.stringify(H0(o)), u = k.useRef(!1);
  return Y0(() => {
    u.current = !0;
  }), k.useCallback(
    (p, f = {}) => {
      if (In(u.current, G0), !u.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let g = q0(
        p,
        JSON.parse(l),
        s,
        f.relative === "path"
      );
      e == null && t !== "/" && (g.pathname = g.pathname === "/" ? t : dr([t, g.pathname])), (f.replace ? r.replace : r.push)(
        g,
        f.state,
        f
      );
    },
    [
      t,
      r,
      l,
      s,
      e
    ]
  );
}
k.createContext(null);
function XR() {
  let { matches: e } = k.useContext(Yn), t = e[e.length - 1];
  return t ? t.params : {};
}
function ta(e, { relative: t } = {}) {
  let { matches: r } = k.useContext(Yn), { pathname: o } = Yr(), s = JSON.stringify(H0(r));
  return k.useMemo(
    () => q0(
      e,
      JSON.parse(s),
      o,
      t === "path"
    ),
    [e, s, o, t]
  );
}
function ZR(e, t) {
  return X0(e, t);
}
function X0(e, t, r, o) {
  Je(
    ea(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s, static: l } = k.useContext(Gn), { matches: u } = k.useContext(Yn), d = u[u.length - 1], p = d ? d.params : {}, f = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", y = d && d.route;
  {
    let O = y && y.path || "";
    Z0(
      f,
      !y || O.endsWith("*") || O.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${O}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${O}"> to <Route path="${O === "/" ? "*" : `${O}/*`}">.`
    );
  }
  let v = Yr(), _;
  if (t) {
    let O = typeof t == "string" ? So(t) : t;
    Je(
      g === "/" || O.pathname?.startsWith(g),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${O.pathname}" was given in the \`location\` prop.`
    ), _ = O;
  } else
    _ = v;
  let S = _.pathname || "/", b = S;
  if (g !== "/") {
    let O = g.replace(/^\//, "").split("/");
    b = "/" + S.replace(/^\//, "").split("/").slice(O.length).join("/");
  }
  let C = !l && r && r.matches && r.matches.length > 0 ? r.matches : U0(e, { pathname: b });
  In(
    y || C != null,
    `No routes matched location "${_.pathname}${_.search}${_.hash}" `
  ), In(
    C == null || C[C.length - 1].route.element !== void 0 || C[C.length - 1].route.Component !== void 0 || C[C.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let R = iT(
    C && C.map(
      (O) => Object.assign({}, O, {
        params: Object.assign({}, p, O.params),
        pathname: dr([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          s.encodeLocation ? s.encodeLocation(O.pathname).pathname : O.pathname
        ]),
        pathnameBase: O.pathnameBase === "/" ? g : dr([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          s.encodeLocation ? s.encodeLocation(O.pathnameBase).pathname : O.pathnameBase
        ])
      })
    ),
    u,
    r,
    o
  );
  return t && R ? /* @__PURE__ */ k.createElement(
    Zs.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          ..._
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    R
  ) : R;
}
function eT() {
  let e = uT(), t = qR(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, l = { padding: "2px 4px", backgroundColor: o }, u = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), u = /* @__PURE__ */ k.createElement(k.Fragment, null, /* @__PURE__ */ k.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ k.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ k.createElement("code", { style: l }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ k.createElement("code", { style: l }, "errorElement"), " prop on your route.")), /* @__PURE__ */ k.createElement(k.Fragment, null, /* @__PURE__ */ k.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ k.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ k.createElement("pre", { style: s }, r) : null, u);
}
var tT = /* @__PURE__ */ k.createElement(eT, null), nT = class extends k.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    console.error(
      "React Router caught the following error during render",
      e,
      t
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ k.createElement(Yn.Provider, { value: this.props.routeContext }, /* @__PURE__ */ k.createElement(
      Qp.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function rT({ routeContext: e, match: t, children: r }) {
  let o = k.useContext(bo);
  return o && o.static && o.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ k.createElement(Yn.Provider, { value: e }, r);
}
function iT(e, t = [], r = null, o = null) {
  if (e == null) {
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let s = e, l = r?.errors;
  if (l != null) {
    let p = s.findIndex(
      (f) => f.route.id && l?.[f.route.id] !== void 0
    );
    Je(
      p >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        l
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, p + 1)
    );
  }
  let u = !1, d = -1;
  if (r)
    for (let p = 0; p < s.length; p++) {
      let f = s[p];
      if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (d = p), f.route.id) {
        let { loaderData: g, errors: y } = r, v = f.route.loader && !g.hasOwnProperty(f.route.id) && (!y || y[f.route.id] === void 0);
        if (f.route.lazy || v) {
          u = !0, d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  return s.reduceRight((p, f, g) => {
    let y, v = !1, _ = null, S = null;
    r && (y = l && f.route.id ? l[f.route.id] : void 0, _ = f.route.errorElement || tT, u && (d < 0 && g === 0 ? (Z0(
      "route-fallback",
      !1,
      "No `HydrateFallback` element provided to render during initial hydration"
    ), v = !0, S = null) : d === g && (v = !0, S = f.route.hydrateFallbackElement || null)));
    let b = t.concat(s.slice(0, g + 1)), C = () => {
      let R;
      return y ? R = _ : v ? R = S : f.route.Component ? R = /* @__PURE__ */ k.createElement(f.route.Component, null) : f.route.element ? R = f.route.element : R = p, /* @__PURE__ */ k.createElement(
        rT,
        {
          match: f,
          routeContext: {
            outlet: p,
            matches: b,
            isDataRoute: r != null
          },
          children: R
        }
      );
    };
    return r && (f.route.ErrorBoundary || f.route.errorElement || g === 0) ? /* @__PURE__ */ k.createElement(
      nT,
      {
        location: r.location,
        revalidation: r.revalidation,
        component: _,
        error: y,
        children: C(),
        routeContext: { outlet: null, matches: b, isDataRoute: !0 }
      }
    ) : C();
  }, null);
}
function Gp(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function oT(e) {
  let t = k.useContext(bo);
  return Je(t, Gp(e)), t;
}
function sT(e) {
  let t = k.useContext(Qu);
  return Je(t, Gp(e)), t;
}
function aT(e) {
  let t = k.useContext(Yn);
  return Je(t, Gp(e)), t;
}
function Yp(e) {
  let t = aT(e), r = t.matches[t.matches.length - 1];
  return Je(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function lT() {
  return Yp(
    "useRouteId"
    /* UseRouteId */
  );
}
function uT() {
  let e = k.useContext(Qp), t = sT(
    "useRouteError"
    /* UseRouteError */
  ), r = Yp(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : t.errors?.[r];
}
function cT() {
  let { router: e } = oT(
    "useNavigate"
    /* UseNavigateStable */
  ), t = Yp(
    "useNavigate"
    /* UseNavigateStable */
  ), r = k.useRef(!1);
  return Y0(() => {
    r.current = !0;
  }), k.useCallback(
    async (s, l = {}) => {
      In(r.current, G0), r.current && (typeof s == "number" ? e.navigate(s) : await e.navigate(s, { fromRouteId: t, ...l }));
    },
    [e, t]
  );
}
var hv = {};
function Z0(e, t, r) {
  !t && !hv[e] && (hv[e] = !0, In(!1, r));
}
k.memo(dT);
function dT({
  routes: e,
  future: t,
  state: r
}) {
  return X0(e, void 0, r, t);
}
function ao(e) {
  Je(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function fT({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: o = "POP",
  navigator: s,
  static: l = !1
}) {
  Je(
    !ea(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let u = e.replace(/^\/*/, "/"), d = k.useMemo(
    () => ({
      basename: u,
      navigator: s,
      static: l,
      future: {}
    }),
    [u, s, l]
  );
  typeof r == "string" && (r = So(r));
  let {
    pathname: p = "/",
    search: f = "",
    hash: g = "",
    state: y = null,
    key: v = "default"
  } = r, _ = k.useMemo(() => {
    let S = hr(p, u);
    return S == null ? null : {
      location: {
        pathname: S,
        search: f,
        hash: g,
        state: y,
        key: v
      },
      navigationType: o
    };
  }, [u, p, f, g, y, v, o]);
  return In(
    _ != null,
    `<Router basename="${u}"> is not able to match the URL "${p}${f}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), _ == null ? null : /* @__PURE__ */ k.createElement(Gn.Provider, { value: d }, /* @__PURE__ */ k.createElement(Zs.Provider, { children: t, value: _ }));
}
function pT({
  children: e,
  location: t
}) {
  return ZR(np(e), t);
}
function np(e, t = []) {
  let r = [];
  return k.Children.forEach(e, (o, s) => {
    if (!k.isValidElement(o))
      return;
    let l = [...t, s];
    if (o.type === k.Fragment) {
      r.push.apply(
        r,
        np(o.props.children, l)
      );
      return;
    }
    Je(
      o.type === ao,
      `[${typeof o.type == "string" ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), Je(
      !o.props.index || !o.props.children,
      "An index route cannot have child routes."
    );
    let u = {
      id: o.props.id || l.join("-"),
      caseSensitive: o.props.caseSensitive,
      element: o.props.element,
      Component: o.props.Component,
      index: o.props.index,
      path: o.props.path,
      loader: o.props.loader,
      action: o.props.action,
      hydrateFallbackElement: o.props.hydrateFallbackElement,
      HydrateFallback: o.props.HydrateFallback,
      errorElement: o.props.errorElement,
      ErrorBoundary: o.props.ErrorBoundary,
      hasErrorBoundary: o.props.hasErrorBoundary === !0 || o.props.ErrorBoundary != null || o.props.errorElement != null,
      shouldRevalidate: o.props.shouldRevalidate,
      handle: o.props.handle,
      lazy: o.props.lazy
    };
    o.props.children && (u.children = np(
      o.props.children,
      l
    )), r.push(u);
  }), r;
}
var Xl = "get", Zl = "application/x-www-form-urlencoded";
function Gu(e) {
  return e != null && typeof e.tagName == "string";
}
function hT(e) {
  return Gu(e) && e.tagName.toLowerCase() === "button";
}
function gT(e) {
  return Gu(e) && e.tagName.toLowerCase() === "form";
}
function mT(e) {
  return Gu(e) && e.tagName.toLowerCase() === "input";
}
function yT(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function vT(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !yT(e);
}
function rp(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
      let o = e[r];
      return t.concat(
        Array.isArray(o) ? o.map((s) => [r, s]) : [[r, o]]
      );
    }, [])
  );
}
function wT(e, t) {
  let r = rp(e);
  return t && t.forEach((o, s) => {
    r.has(s) || t.getAll(s).forEach((l) => {
      r.append(s, l);
    });
  }), r;
}
var Pl = null;
function ST() {
  if (Pl === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Pl = !1;
    } catch {
      Pl = !0;
    }
  return Pl;
}
var bT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function wf(e) {
  return e != null && !bT.has(e) ? (In(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zl}"`
  ), null) : e;
}
function _T(e, t) {
  let r, o, s, l, u;
  if (gT(e)) {
    let d = e.getAttribute("action");
    o = d ? hr(d, t) : null, r = e.getAttribute("method") || Xl, s = wf(e.getAttribute("enctype")) || Zl, l = new FormData(e);
  } else if (hT(e) || mT(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (o = p ? hr(p, t) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Xl, s = wf(e.getAttribute("formenctype")) || wf(d.getAttribute("enctype")) || Zl, l = new FormData(d, e), !ST()) {
      let { name: f, type: g, value: y } = e;
      if (g === "image") {
        let v = f ? `${f}.` : "";
        l.append(`${v}x`, "0"), l.append(`${v}y`, "0");
      } else f && l.append(f, y);
    }
  } else {
    if (Gu(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Xl, o = null, s = Zl, u = e;
  }
  return l && s === "text/plain" && (u = l, l = void 0), { action: o, method: r.toLowerCase(), encType: s, formData: l, body: u };
}
function Jp(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
async function xT(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function kT(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function CT(e, t, r) {
  let o = await Promise.all(
    e.map(async (s) => {
      let l = t.routes[s.route.id];
      if (l) {
        let u = await xT(l, r);
        return u.links ? u.links() : [];
      }
      return [];
    })
  );
  return TT(
    o.flat(1).filter(kT).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function gv(e, t, r, o, s, l) {
  let u = (p, f) => r[f] ? p.route.id !== r[f].route.id : !0, d = (p, f) => (
    // param change, /users/123 -> /users/456
    r[f].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[f].route.path?.endsWith("*") && r[f].params["*"] !== p.params["*"]
  );
  return l === "assets" ? t.filter(
    (p, f) => u(p, f) || d(p, f)
  ) : l === "data" ? t.filter((p, f) => {
    let g = o.routes[p.route.id];
    if (!g || !g.hasLoader)
      return !1;
    if (u(p, f) || d(p, f))
      return !0;
    if (p.route.shouldRevalidate) {
      let y = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof y == "boolean")
        return y;
    }
    return !0;
  }) : [];
}
function ET(e, t, { includeHydrateFallback: r } = {}) {
  return PT(
    e.map((o) => {
      let s = t.routes[o.route.id];
      if (!s) return [];
      let l = [s.module];
      return s.clientActionModule && (l = l.concat(s.clientActionModule)), s.clientLoaderModule && (l = l.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (l = l.concat(s.hydrateFallbackModule)), s.imports && (l = l.concat(s.imports)), l;
    }).flat(1)
  );
}
function PT(e) {
  return [...new Set(e)];
}
function RT(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let o of r)
    t[o] = e[o];
  return t;
}
function TT(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((o, s) => {
    let l = JSON.stringify(RT(s));
    return r.has(l) || (r.add(l), o.push({ key: l, link: s })), o;
  }, []);
}
function $T(e, t) {
  let r = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r.pathname === "/" ? r.pathname = "_root.data" : t && hr(r.pathname, t) === "/" ? r.pathname = `${t.replace(/\/$/, "")}/_root.data` : r.pathname = `${r.pathname.replace(/\/$/, "")}.data`, r;
}
function eS() {
  let e = k.useContext(bo);
  return Jp(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function MT() {
  let e = k.useContext(Qu);
  return Jp(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Xp = k.createContext(void 0);
Xp.displayName = "FrameworkContext";
function tS() {
  let e = k.useContext(Xp);
  return Jp(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function AT(e, t) {
  let r = k.useContext(Xp), [o, s] = k.useState(!1), [l, u] = k.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: f, onMouseLeave: g, onTouchStart: y } = t, v = k.useRef(null);
  k.useEffect(() => {
    if (e === "render" && u(!0), e === "viewport") {
      let b = (R) => {
        R.forEach((O) => {
          u(O.isIntersecting);
        });
      }, C = new IntersectionObserver(b, { threshold: 0.5 });
      return v.current && C.observe(v.current), () => {
        C.disconnect();
      };
    }
  }, [e]), k.useEffect(() => {
    if (o) {
      let b = setTimeout(() => {
        u(!0);
      }, 100);
      return () => {
        clearTimeout(b);
      };
    }
  }, [o]);
  let _ = () => {
    s(!0);
  }, S = () => {
    s(!1), u(!1);
  };
  return r ? e !== "intent" ? [l, v, {}] : [
    l,
    v,
    {
      onFocus: ps(d, _),
      onBlur: ps(p, S),
      onMouseEnter: ps(f, _),
      onMouseLeave: ps(g, S),
      onTouchStart: ps(y, _)
    }
  ] : [!1, v, {}];
}
function ps(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function IT({
  page: e,
  ...t
}) {
  let { router: r } = eS(), o = k.useMemo(
    () => U0(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return o ? /* @__PURE__ */ k.createElement(NT, { page: e, matches: o, ...t }) : null;
}
function OT(e) {
  let { manifest: t, routeModules: r } = tS(), [o, s] = k.useState([]);
  return k.useEffect(() => {
    let l = !1;
    return CT(e, t, r).then(
      (u) => {
        l || s(u);
      }
    ), () => {
      l = !0;
    };
  }, [e, t, r]), o;
}
function NT({
  page: e,
  matches: t,
  ...r
}) {
  let o = Yr(), { manifest: s, routeModules: l } = tS(), { basename: u } = eS(), { loaderData: d, matches: p } = MT(), f = k.useMemo(
    () => gv(
      e,
      t,
      p,
      s,
      o,
      "data"
    ),
    [e, t, p, s, o]
  ), g = k.useMemo(
    () => gv(
      e,
      t,
      p,
      s,
      o,
      "assets"
    ),
    [e, t, p, s, o]
  ), y = k.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let S = /* @__PURE__ */ new Set(), b = !1;
    if (t.forEach((R) => {
      let O = s.routes[R.route.id];
      !O || !O.hasLoader || (!f.some((x) => x.route.id === R.route.id) && R.route.id in d && l[R.route.id]?.shouldRevalidate || O.hasClientLoader ? b = !0 : S.add(R.route.id));
    }), S.size === 0)
      return [];
    let C = $T(e, u);
    return b && S.size > 0 && C.searchParams.set(
      "_routes",
      t.filter((R) => S.has(R.route.id)).map((R) => R.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    u,
    d,
    o,
    s,
    f,
    t,
    e,
    l
  ]), v = k.useMemo(
    () => ET(g, s),
    [g, s]
  ), _ = OT(g);
  return /* @__PURE__ */ k.createElement(k.Fragment, null, y.map((S) => /* @__PURE__ */ k.createElement("link", { key: S, rel: "prefetch", as: "fetch", href: S, ...r })), v.map((S) => /* @__PURE__ */ k.createElement("link", { key: S, rel: "modulepreload", href: S, ...r })), _.map(({ key: S, link: b }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ k.createElement("link", { key: S, ...b })
  )));
}
function LT(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var nS = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  nS && (window.__reactRouterVersion = "7.4.1");
} catch {
}
function DT({
  basename: e,
  children: t,
  window: r
}) {
  let o = k.useRef();
  o.current == null && (o.current = kR({ window: r, v5Compat: !0 }));
  let s = o.current, [l, u] = k.useState({
    action: s.action,
    location: s.location
  }), d = k.useCallback(
    (p) => {
      k.startTransition(() => u(p));
    },
    [u]
  );
  return k.useLayoutEffect(() => s.listen(d), [s, d]), /* @__PURE__ */ k.createElement(
    fT,
    {
      basename: e,
      children: t,
      location: l.location,
      navigationType: l.action,
      navigator: s
    }
  );
}
var rS = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, iS = k.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: l,
    replace: u,
    state: d,
    target: p,
    to: f,
    preventScrollReset: g,
    viewTransition: y,
    ...v
  }, _) {
    let { basename: S } = k.useContext(Gn), b = typeof f == "string" && rS.test(f), C, R = !1;
    if (typeof f == "string" && b && (C = f, nS))
      try {
        let L = new URL(window.location.href), w = f.startsWith("//") ? new URL(L.protocol + f) : new URL(f), T = hr(w.pathname, S);
        w.origin === L.origin && T != null ? f = T + w.search + w.hash : R = !0;
      } catch {
        In(
          !1,
          `<Link to="${f}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let O = YR(f, { relative: s }), [x, P, E] = AT(
      o,
      v
    ), M = BT(f, {
      replace: u,
      state: d,
      target: p,
      preventScrollReset: g,
      relative: s,
      viewTransition: y
    });
    function A(L) {
      t && t(L), L.defaultPrevented || M(L);
    }
    let I = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ k.createElement(
        "a",
        {
          ...v,
          ...E,
          href: C || O,
          onClick: R || l ? t : A,
          ref: LT(_, P),
          target: p,
          "data-discover": !b && r === "render" ? "true" : void 0
        }
      )
    );
    return x && !b ? /* @__PURE__ */ k.createElement(k.Fragment, null, I, /* @__PURE__ */ k.createElement(IT, { page: O })) : I;
  }
);
iS.displayName = "Link";
var FT = k.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: o = "",
    end: s = !1,
    style: l,
    to: u,
    viewTransition: d,
    children: p,
    ...f
  }, g) {
    let y = ta(u, { relative: f.relative }), v = Yr(), _ = k.useContext(Qu), { navigator: S, basename: b } = k.useContext(Gn), C = _ != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    KT(y) && d === !0, R = S.encodeLocation ? S.encodeLocation(y).pathname : y.pathname, O = v.pathname, x = _ && _.navigation && _.navigation.location ? _.navigation.location.pathname : null;
    r || (O = O.toLowerCase(), x = x ? x.toLowerCase() : null, R = R.toLowerCase()), x && b && (x = hr(x, b) || x);
    const P = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let E = O === R || !s && O.startsWith(R) && O.charAt(P) === "/", M = x != null && (x === R || !s && x.startsWith(R) && x.charAt(R.length) === "/"), A = {
      isActive: E,
      isPending: M,
      isTransitioning: C
    }, I = E ? t : void 0, L;
    typeof o == "function" ? L = o(A) : L = [
      o,
      E ? "active" : null,
      M ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let w = typeof l == "function" ? l(A) : l;
    return /* @__PURE__ */ k.createElement(
      iS,
      {
        ...f,
        "aria-current": I,
        className: L,
        ref: g,
        style: w,
        to: u,
        viewTransition: d
      },
      typeof p == "function" ? p(A) : p
    );
  }
);
FT.displayName = "NavLink";
var zT = k.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: o,
    replace: s,
    state: l,
    method: u = Xl,
    action: d,
    onSubmit: p,
    relative: f,
    preventScrollReset: g,
    viewTransition: y,
    ...v
  }, _) => {
    let S = HT(), b = qT(d, { relative: f }), C = u.toLowerCase() === "get" ? "get" : "post", R = typeof d == "string" && rS.test(d), O = (x) => {
      if (p && p(x), x.defaultPrevented) return;
      x.preventDefault();
      let P = x.nativeEvent.submitter, E = P?.getAttribute("formmethod") || u;
      S(P || x.currentTarget, {
        fetcherKey: t,
        method: E,
        navigate: r,
        replace: s,
        state: l,
        relative: f,
        preventScrollReset: g,
        viewTransition: y
      });
    };
    return /* @__PURE__ */ k.createElement(
      "form",
      {
        ref: _,
        method: C,
        action: b,
        onSubmit: o ? p : O,
        ...v,
        "data-discover": !R && e === "render" ? "true" : void 0
      }
    );
  }
);
zT.displayName = "Form";
function jT(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function oS(e) {
  let t = k.useContext(bo);
  return Je(t, jT(e)), t;
}
function BT(e, {
  target: t,
  replace: r,
  state: o,
  preventScrollReset: s,
  relative: l,
  viewTransition: u
} = {}) {
  let d = J0(), p = Yr(), f = ta(e, { relative: l });
  return k.useCallback(
    (g) => {
      if (vT(g, t)) {
        g.preventDefault();
        let y = r !== void 0 ? r : Ls(p) === Ls(f);
        d(e, {
          replace: y,
          state: o,
          preventScrollReset: s,
          relative: l,
          viewTransition: u
        });
      }
    },
    [
      p,
      d,
      f,
      r,
      o,
      t,
      e,
      s,
      l,
      u
    ]
  );
}
function UT(e) {
  In(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let t = k.useRef(rp(e)), r = k.useRef(!1), o = Yr(), s = k.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      wT(
        o.search,
        r.current ? null : t.current
      )
    ),
    [o.search]
  ), l = J0(), u = k.useCallback(
    (d, p) => {
      const f = rp(
        typeof d == "function" ? d(s) : d
      );
      r.current = !0, l("?" + f, p);
    },
    [l, s]
  );
  return [s, u];
}
var WT = 0, VT = () => `__${String(++WT)}__`;
function HT() {
  let { router: e } = oS(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = k.useContext(Gn), r = lT();
  return k.useCallback(
    async (o, s = {}) => {
      let { action: l, method: u, encType: d, formData: p, body: f } = _T(
        o,
        t
      );
      if (s.navigate === !1) {
        let g = s.fetcherKey || VT();
        await e.fetch(g, r, s.action || l, {
          preventScrollReset: s.preventScrollReset,
          formData: p,
          body: f,
          formMethod: s.method || u,
          formEncType: s.encType || d,
          flushSync: s.flushSync
        });
      } else
        await e.navigate(s.action || l, {
          preventScrollReset: s.preventScrollReset,
          formData: p,
          body: f,
          formMethod: s.method || u,
          formEncType: s.encType || d,
          replace: s.replace,
          state: s.state,
          fromRouteId: r,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition
        });
    },
    [e, t, r]
  );
}
function qT(e, { relative: t } = {}) {
  let { basename: r } = k.useContext(Gn), o = k.useContext(Yn);
  Je(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), l = { ...ta(e || ".", { relative: t }) }, u = Yr();
  if (e == null) {
    l.search = u.search;
    let d = new URLSearchParams(l.search), p = d.getAll("index");
    if (p.some((g) => g === "")) {
      d.delete("index"), p.filter((y) => y).forEach((y) => d.append("index", y));
      let g = d.toString();
      l.search = g ? `?${g}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (l.pathname = l.pathname === "/" ? r : dr([r, l.pathname])), Ls(l);
}
function KT(e, t = {}) {
  let r = k.useContext(Q0);
  Je(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = oS(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = ta(e, { relative: t.relative });
  if (!r.isTransitioning)
    return !1;
  let l = hr(r.currentLocation.pathname, o) || r.currentLocation.pathname, u = hr(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return pu(s.pathname, u) != null || pu(s.pathname, l) != null;
}
new TextEncoder();
const Ce = (e) => typeof e == "string", hs = () => {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}, mv = (e) => e == null ? "" : "" + e, QT = (e, t, r) => {
  e.forEach((o) => {
    t[o] && (r[o] = t[o]);
  });
}, GT = /###/g, yv = (e) => e && e.indexOf("###") > -1 ? e.replace(GT, ".") : e, vv = (e) => !e || Ce(e), Ps = (e, t, r) => {
  const o = Ce(t) ? t.split(".") : t;
  let s = 0;
  for (; s < o.length - 1; ) {
    if (vv(e)) return {};
    const l = yv(o[s]);
    !e[l] && r && (e[l] = new r()), Object.prototype.hasOwnProperty.call(e, l) ? e = e[l] : e = {}, ++s;
  }
  return vv(e) ? {} : {
    obj: e,
    k: yv(o[s])
  };
}, wv = (e, t, r) => {
  const {
    obj: o,
    k: s
  } = Ps(e, t, Object);
  if (o !== void 0 || t.length === 1) {
    o[s] = r;
    return;
  }
  let l = t[t.length - 1], u = t.slice(0, t.length - 1), d = Ps(e, u, Object);
  for (; d.obj === void 0 && u.length; )
    l = `${u[u.length - 1]}.${l}`, u = u.slice(0, u.length - 1), d = Ps(e, u, Object), d?.obj && typeof d.obj[`${d.k}.${l}`] < "u" && (d.obj = void 0);
  d.obj[`${d.k}.${l}`] = r;
}, YT = (e, t, r, o) => {
  const {
    obj: s,
    k: l
  } = Ps(e, t, Object);
  s[l] = s[l] || [], s[l].push(r);
}, hu = (e, t) => {
  const {
    obj: r,
    k: o
  } = Ps(e, t);
  if (r && Object.prototype.hasOwnProperty.call(r, o))
    return r[o];
}, JT = (e, t, r) => {
  const o = hu(e, r);
  return o !== void 0 ? o : hu(t, r);
}, sS = (e, t, r) => {
  for (const o in t)
    o !== "__proto__" && o !== "constructor" && (o in e ? Ce(e[o]) || e[o] instanceof String || Ce(t[o]) || t[o] instanceof String ? r && (e[o] = t[o]) : sS(e[o], t[o], r) : e[o] = t[o]);
  return e;
}, ro = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var XT = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const ZT = (e) => Ce(e) ? e.replace(/[&<>"'\/]/g, (t) => XT[t]) : e;
class e$ {
  constructor(t) {
    this.capacity = t, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(t) {
    const r = this.regExpMap.get(t);
    if (r !== void 0)
      return r;
    const o = new RegExp(t);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(t, o), this.regExpQueue.push(t), o;
  }
}
const t$ = [" ", ",", "?", "!", ";"], n$ = new e$(20), r$ = (e, t, r) => {
  t = t || "", r = r || "";
  const o = t$.filter((u) => t.indexOf(u) < 0 && r.indexOf(u) < 0);
  if (o.length === 0) return !0;
  const s = n$.getRegExp(`(${o.map((u) => u === "?" ? "\\?" : u).join("|")})`);
  let l = !s.test(e);
  if (!l) {
    const u = e.indexOf(r);
    u > 0 && !s.test(e.substring(0, u)) && (l = !0);
  }
  return l;
}, ip = function(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e) return;
  if (e[t])
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
  const o = t.split(r);
  let s = e;
  for (let l = 0; l < o.length; ) {
    if (!s || typeof s != "object")
      return;
    let u, d = "";
    for (let p = l; p < o.length; ++p)
      if (p !== l && (d += r), d += o[p], u = s[d], u !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof u) > -1 && p < o.length - 1)
          continue;
        l += p - l + 1;
        break;
      }
    s = u;
  }
  return s;
}, gu = (e) => e?.replace("_", "-"), i$ = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, t) {
    console?.[e]?.apply?.(console, t);
  }
};
class mu {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, r);
  }
  init(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = r.prefix || "i18next:", this.logger = t || i$, this.options = r, this.debug = r.debug;
  }
  log() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.forward(r, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.forward(r, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.forward(r, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.forward(r, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, r, o, s) {
    return s && !this.debug ? null : (Ce(t[0]) && (t[0] = `${o}${this.prefix} ${t[0]}`), this.logger[r](t));
  }
  create(t) {
    return new mu(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new mu(this.logger, t);
  }
}
var Wn = new mu();
class Yu {
  constructor() {
    this.observers = {};
  }
  on(t, r) {
    return t.split(" ").forEach((o) => {
      this.observers[o] || (this.observers[o] = /* @__PURE__ */ new Map());
      const s = this.observers[o].get(r) || 0;
      this.observers[o].set(r, s + 1);
    }), this;
  }
  off(t, r) {
    if (this.observers[t]) {
      if (!r) {
        delete this.observers[t];
        return;
      }
      this.observers[t].delete(r);
    }
  }
  emit(t) {
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
      o[s - 1] = arguments[s];
    this.observers[t] && Array.from(this.observers[t].entries()).forEach((u) => {
      let [d, p] = u;
      for (let f = 0; f < p; f++)
        d(...o);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach((u) => {
      let [d, p] = u;
      for (let f = 0; f < p; f++)
        d.apply(d, [t, ...o]);
    });
  }
}
class Sv extends Yu {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const r = this.options.ns.indexOf(t);
    r > -1 && this.options.ns.splice(r, 1);
  }
  getResource(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const l = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, u = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let d;
    t.indexOf(".") > -1 ? d = t.split(".") : (d = [t, r], o && (Array.isArray(o) ? d.push(...o) : Ce(o) && l ? d.push(...o.split(l)) : d.push(o)));
    const p = hu(this.data, d);
    return !p && !r && !o && t.indexOf(".") > -1 && (t = d[0], r = d[1], o = d.slice(2).join(".")), p || !u || !Ce(o) ? p : ip(this.data?.[t]?.[r], o, l);
  }
  addResource(t, r, o, s) {
    let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const u = l.keySeparator !== void 0 ? l.keySeparator : this.options.keySeparator;
    let d = [t, r];
    o && (d = d.concat(u ? o.split(u) : o)), t.indexOf(".") > -1 && (d = t.split("."), s = r, r = d[1]), this.addNamespaces(r), wv(this.data, d, s), l.silent || this.emit("added", t, r, o, s);
  }
  addResources(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const l in o)
      (Ce(o[l]) || Array.isArray(o[l])) && this.addResource(t, r, l, o[l], {
        silent: !0
      });
    s.silent || this.emit("added", t, r, o);
  }
  addResourceBundle(t, r, o, s, l) {
    let u = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1,
      skipCopy: !1
    }, d = [t, r];
    t.indexOf(".") > -1 && (d = t.split("."), s = o, o = r, r = d[1]), this.addNamespaces(r);
    let p = hu(this.data, d) || {};
    u.skipCopy || (o = JSON.parse(JSON.stringify(o))), s ? sS(p, o, l) : p = {
      ...p,
      ...o
    }, wv(this.data, d, p), u.silent || this.emit("added", t, r, o);
  }
  removeResourceBundle(t, r) {
    this.hasResourceBundle(t, r) && delete this.data[t][r], this.removeNamespaces(r), this.emit("removed", t, r);
  }
  hasResourceBundle(t, r) {
    return this.getResource(t, r) !== void 0;
  }
  getResourceBundle(t, r) {
    return r || (r = this.options.defaultNS), this.getResource(t, r);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const r = this.getDataByLanguage(t);
    return !!(r && Object.keys(r) || []).find((s) => r[s] && Object.keys(r[s]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var aS = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, r, o, s) {
    return e.forEach((l) => {
      t = this.processors[l]?.process(t, r, o, s) ?? t;
    }), t;
  }
};
const bv = {}, _v = (e) => !Ce(e) && typeof e != "boolean" && typeof e != "number";
class yu extends Yu {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), QT(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Wn.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    return t == null ? !1 : this.resolve(t, r)?.res !== void 0;
  }
  extractFromKey(t, r) {
    let o = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
    o === void 0 && (o = ":");
    const s = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = r.ns || this.options.defaultNS || [];
    const u = o && t.indexOf(o) > -1, d = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !r$(t, o, s);
    if (u && !d) {
      const p = t.match(this.interpolator.nestingRegexp);
      if (p && p.length > 0)
        return {
          key: t,
          namespaces: Ce(l) ? [l] : l
        };
      const f = t.split(o);
      (o !== s || o === s && this.options.ns.indexOf(f[0]) > -1) && (l = f.shift()), t = f.join(s);
    }
    return {
      key: t,
      namespaces: Ce(l) ? [l] : l
    };
  }
  translate(t, r, o) {
    if (typeof r != "object" && this.options.overloadTranslationOptionHandler && (r = this.options.overloadTranslationOptionHandler(arguments)), typeof r == "object" && (r = {
      ...r
    }), r || (r = {}), t == null) return "";
    Array.isArray(t) || (t = [String(t)]);
    const s = r.returnDetails !== void 0 ? r.returnDetails : this.options.returnDetails, l = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator, {
      key: u,
      namespaces: d
    } = this.extractFromKey(t[t.length - 1], r), p = d[d.length - 1], f = r.lng || this.language, g = r.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (f?.toLowerCase() === "cimode") {
      if (g) {
        const T = r.nsSeparator || this.options.nsSeparator;
        return s ? {
          res: `${p}${T}${u}`,
          usedKey: u,
          exactUsedKey: u,
          usedLng: f,
          usedNS: p,
          usedParams: this.getUsedParamsDetails(r)
        } : `${p}${T}${u}`;
      }
      return s ? {
        res: u,
        usedKey: u,
        exactUsedKey: u,
        usedLng: f,
        usedNS: p,
        usedParams: this.getUsedParamsDetails(r)
      } : u;
    }
    const y = this.resolve(t, r);
    let v = y?.res;
    const _ = y?.usedKey || u, S = y?.exactUsedKey || u, b = ["[object Number]", "[object Function]", "[object RegExp]"], C = r.joinArrays !== void 0 ? r.joinArrays : this.options.joinArrays, R = !this.i18nFormat || this.i18nFormat.handleAsObject, O = r.count !== void 0 && !Ce(r.count), x = yu.hasDefaultValue(r), P = O ? this.pluralResolver.getSuffix(f, r.count, r) : "", E = r.ordinal && O ? this.pluralResolver.getSuffix(f, r.count, {
      ordinal: !1
    }) : "", M = O && !r.ordinal && r.count === 0, A = M && r[`defaultValue${this.options.pluralSeparator}zero`] || r[`defaultValue${P}`] || r[`defaultValue${E}`] || r.defaultValue;
    let I = v;
    R && !v && x && (I = A);
    const L = _v(I), w = Object.prototype.toString.apply(I);
    if (R && I && L && b.indexOf(w) < 0 && !(Ce(C) && Array.isArray(I))) {
      if (!r.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const T = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(_, I, {
          ...r,
          ns: d
        }) : `key '${u} (${this.language})' returned an object instead of string.`;
        return s ? (y.res = T, y.usedParams = this.getUsedParamsDetails(r), y) : T;
      }
      if (l) {
        const T = Array.isArray(I), N = T ? [] : {}, V = T ? S : _;
        for (const F in I)
          if (Object.prototype.hasOwnProperty.call(I, F)) {
            const j = `${V}${l}${F}`;
            x && !v ? N[F] = this.translate(j, {
              ...r,
              defaultValue: _v(A) ? A[F] : void 0,
              joinArrays: !1,
              ns: d
            }) : N[F] = this.translate(j, {
              ...r,
              joinArrays: !1,
              ns: d
            }), N[F] === j && (N[F] = I[F]);
          }
        v = N;
      }
    } else if (R && Ce(C) && Array.isArray(v))
      v = v.join(C), v && (v = this.extendTranslation(v, t, r, o));
    else {
      let T = !1, N = !1;
      !this.isValidLookup(v) && x && (T = !0, v = A), this.isValidLookup(v) || (N = !0, v = u);
      const F = (r.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && N ? void 0 : v, j = x && A !== v && this.options.updateMissing;
      if (N || T || j) {
        if (this.logger.log(j ? "updateKey" : "missingKey", f, p, u, j ? A : v), l) {
          const W = this.resolve(u, {
            ...r,
            keySeparator: !1
          });
          W && W.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let H = [];
        const Y = this.languageUtils.getFallbackCodes(this.options.fallbackLng, r.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && Y && Y[0])
          for (let W = 0; W < Y.length; W++)
            H.push(Y[W]);
        else this.options.saveMissingTo === "all" ? H = this.languageUtils.toResolveHierarchy(r.lng || this.language) : H.push(r.lng || this.language);
        const U = (W, K, D) => {
          const G = x && D !== v ? D : F;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(W, p, K, G, j, r) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(W, p, K, G, j, r), this.emit("missingKey", W, p, K, v);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && O ? H.forEach((W) => {
          const K = this.pluralResolver.getSuffixes(W, r);
          M && r[`defaultValue${this.options.pluralSeparator}zero`] && K.indexOf(`${this.options.pluralSeparator}zero`) < 0 && K.push(`${this.options.pluralSeparator}zero`), K.forEach((D) => {
            U([W], u + D, r[`defaultValue${D}`] || A);
          });
        }) : U(H, u, A));
      }
      v = this.extendTranslation(v, t, r, y, o), N && v === u && this.options.appendNamespaceToMissingKey && (v = `${p}:${u}`), (N || T) && this.options.parseMissingKeyHandler && (v = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${p}:${u}` : u, T ? v : void 0));
    }
    return s ? (y.res = v, y.usedParams = this.getUsedParamsDetails(r), y) : v;
  }
  extendTranslation(t, r, o, s, l) {
    var u = this;
    if (this.i18nFormat?.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...o
      }, o.lng || this.language || s.usedLng, s.usedNS, s.usedKey, {
        resolved: s
      });
    else if (!o.skipInterpolation) {
      o.interpolation && this.interpolator.init({
        ...o,
        interpolation: {
          ...this.options.interpolation,
          ...o.interpolation
        }
      });
      const f = Ce(t) && (o?.interpolation?.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let g;
      if (f) {
        const v = t.match(this.interpolator.nestingRegexp);
        g = v && v.length;
      }
      let y = o.replace && !Ce(o.replace) ? o.replace : o;
      if (this.options.interpolation.defaultVariables && (y = {
        ...this.options.interpolation.defaultVariables,
        ...y
      }), t = this.interpolator.interpolate(t, y, o.lng || this.language || s.usedLng, o), f) {
        const v = t.match(this.interpolator.nestingRegexp), _ = v && v.length;
        g < _ && (o.nest = !1);
      }
      !o.lng && s && s.res && (o.lng = this.language || s.usedLng), o.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var v = arguments.length, _ = new Array(v), S = 0; S < v; S++)
          _[S] = arguments[S];
        return l?.[0] === _[0] && !o.context ? (u.logger.warn(`It seems you are nesting recursively key: ${_[0]} in key: ${r[0]}`), null) : u.translate(..._, r);
      }, o)), o.interpolation && this.interpolator.reset();
    }
    const d = o.postProcess || this.options.postProcess, p = Ce(d) ? [d] : d;
    return t != null && p?.length && o.applyPostProcessor !== !1 && (t = aS.handle(p, t, r, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...s,
        usedParams: this.getUsedParamsDetails(o)
      },
      ...o
    } : o, this)), t;
  }
  resolve(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o, s, l, u, d;
    return Ce(t) && (t = [t]), t.forEach((p) => {
      if (this.isValidLookup(o)) return;
      const f = this.extractFromKey(p, r), g = f.key;
      s = g;
      let y = f.namespaces;
      this.options.fallbackNS && (y = y.concat(this.options.fallbackNS));
      const v = r.count !== void 0 && !Ce(r.count), _ = v && !r.ordinal && r.count === 0, S = r.context !== void 0 && (Ce(r.context) || typeof r.context == "number") && r.context !== "", b = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
      y.forEach((C) => {
        this.isValidLookup(o) || (d = C, !bv[`${b[0]}-${C}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(d) && (bv[`${b[0]}-${C}`] = !0, this.logger.warn(`key "${s}" for languages "${b.join(", ")}" won't get resolved as namespace "${d}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), b.forEach((R) => {
          if (this.isValidLookup(o)) return;
          u = R;
          const O = [g];
          if (this.i18nFormat?.addLookupKeys)
            this.i18nFormat.addLookupKeys(O, g, R, C, r);
          else {
            let P;
            v && (P = this.pluralResolver.getSuffix(R, r.count, r));
            const E = `${this.options.pluralSeparator}zero`, M = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (v && (O.push(g + P), r.ordinal && P.indexOf(M) === 0 && O.push(g + P.replace(M, this.options.pluralSeparator)), _ && O.push(g + E)), S) {
              const A = `${g}${this.options.contextSeparator}${r.context}`;
              O.push(A), v && (O.push(A + P), r.ordinal && P.indexOf(M) === 0 && O.push(A + P.replace(M, this.options.pluralSeparator)), _ && O.push(A + E));
            }
          }
          let x;
          for (; x = O.pop(); )
            this.isValidLookup(o) || (l = x, o = this.getResource(R, C, x, r));
        }));
      });
    }), {
      res: o,
      usedKey: s,
      exactUsedKey: l,
      usedLng: u,
      usedNS: d
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat?.getResource ? this.i18nFormat.getResource(t, r, o, s) : this.resourceStore.getResource(t, r, o, s);
  }
  getUsedParamsDetails() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const r = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], o = t.replace && !Ce(t.replace);
    let s = o ? t.replace : t;
    if (o && typeof t.count < "u" && (s.count = t.count), this.options.interpolation.defaultVariables && (s = {
      ...this.options.interpolation.defaultVariables,
      ...s
    }), !o) {
      s = {
        ...s
      };
      for (const l of r)
        delete s[l];
    }
    return s;
  }
  static hasDefaultValue(t) {
    const r = "defaultValue";
    for (const o in t)
      if (Object.prototype.hasOwnProperty.call(t, o) && r === o.substring(0, r.length) && t[o] !== void 0)
        return !0;
    return !1;
  }
}
class xv {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Wn.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = gu(t), !t || t.indexOf("-") < 0) return null;
    const r = t.split("-");
    return r.length === 2 || (r.pop(), r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = gu(t), !t || t.indexOf("-") < 0) return t;
    const r = t.split("-");
    return this.formatLanguageCode(r[0]);
  }
  formatLanguageCode(t) {
    if (Ce(t) && t.indexOf("-") > -1) {
      let r;
      try {
        r = Intl.getCanonicalLocales(t)[0];
      } catch {
      }
      return r && this.options.lowerCaseLng && (r = r.toLowerCase()), r || (this.options.lowerCaseLng ? t.toLowerCase() : t);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t) return null;
    let r;
    return t.forEach((o) => {
      if (r) return;
      const s = this.formatLanguageCode(o);
      (!this.options.supportedLngs || this.isSupportedCode(s)) && (r = s);
    }), !r && this.options.supportedLngs && t.forEach((o) => {
      if (r) return;
      const s = this.getLanguagePartFromCode(o);
      if (this.isSupportedCode(s)) return r = s;
      r = this.options.supportedLngs.find((l) => {
        if (l === s) return l;
        if (!(l.indexOf("-") < 0 && s.indexOf("-") < 0) && (l.indexOf("-") > 0 && s.indexOf("-") < 0 && l.substring(0, l.indexOf("-")) === s || l.indexOf(s) === 0 && s.length > 1))
          return l;
      });
    }), r || (r = this.getFallbackCodes(this.options.fallbackLng)[0]), r;
  }
  getFallbackCodes(t, r) {
    if (!t) return [];
    if (typeof t == "function" && (t = t(r)), Ce(t) && (t = [t]), Array.isArray(t)) return t;
    if (!r) return t.default || [];
    let o = t[r];
    return o || (o = t[this.getScriptPartFromCode(r)]), o || (o = t[this.formatLanguageCode(r)]), o || (o = t[this.getLanguagePartFromCode(r)]), o || (o = t.default), o || [];
  }
  toResolveHierarchy(t, r) {
    const o = this.getFallbackCodes(r || this.options.fallbackLng || [], t), s = [], l = (u) => {
      u && (this.isSupportedCode(u) ? s.push(u) : this.logger.warn(`rejecting language code not found in supportedLngs: ${u}`));
    };
    return Ce(t) && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && l(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && l(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && l(this.getLanguagePartFromCode(t))) : Ce(t) && l(this.formatLanguageCode(t)), o.forEach((u) => {
      s.indexOf(u) < 0 && l(this.formatLanguageCode(u));
    }), s;
  }
}
const kv = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, Cv = {
  select: (e) => e === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class o$ {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = r, this.logger = Wn.create("pluralResolver"), this.pluralRulesCache = {};
  }
  addRule(t, r) {
    this.rules[t] = r;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = gu(t === "dev" ? "en" : t), s = r.ordinal ? "ordinal" : "cardinal", l = JSON.stringify({
      cleanedCode: o,
      type: s
    });
    if (l in this.pluralRulesCache)
      return this.pluralRulesCache[l];
    let u;
    try {
      u = new Intl.PluralRules(o, {
        type: s
      });
    } catch {
      if (!Intl)
        return this.logger.error("No Intl support, please use an Intl polyfill!"), Cv;
      if (!t.match(/-|_/)) return Cv;
      const p = this.languageUtils.getLanguagePartFromCode(t);
      u = this.getRule(p, r);
    }
    return this.pluralRulesCache[l] = u, u;
  }
  needsPlural(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = this.getRule(t, r);
    return o || (o = this.getRule("dev", r)), o?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(t, r) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, o).map((s) => `${r}${s}`);
  }
  getSuffixes(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = this.getRule(t, r);
    return o || (o = this.getRule("dev", r)), o ? o.resolvedOptions().pluralCategories.sort((s, l) => kv[s] - kv[l]).map((s) => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : [];
  }
  getSuffix(t, r) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = this.getRule(t, o);
    return s ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(r)}` : (this.logger.warn(`no plural rule found for: ${t}`), this.getSuffix("dev", r, o));
  }
}
const Ev = function(e, t, r) {
  let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, l = JT(e, t, r);
  return !l && s && Ce(r) && (l = ip(e, r, o), l === void 0 && (l = ip(t, r, o))), l;
}, Sf = (e) => e.replace(/\$/g, "$$$$");
class s$ {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = Wn.create("interpolator"), this.options = t, this.format = t?.interpolation?.format || ((r) => r), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const {
      escape: r,
      escapeValue: o,
      useRawValueToEscape: s,
      prefix: l,
      prefixEscaped: u,
      suffix: d,
      suffixEscaped: p,
      formatSeparator: f,
      unescapeSuffix: g,
      unescapePrefix: y,
      nestingPrefix: v,
      nestingPrefixEscaped: _,
      nestingSuffix: S,
      nestingSuffixEscaped: b,
      nestingOptionsSeparator: C,
      maxReplaces: R,
      alwaysFormat: O
    } = t.interpolation;
    this.escape = r !== void 0 ? r : ZT, this.escapeValue = o !== void 0 ? o : !0, this.useRawValueToEscape = s !== void 0 ? s : !1, this.prefix = l ? ro(l) : u || "{{", this.suffix = d ? ro(d) : p || "}}", this.formatSeparator = f || ",", this.unescapePrefix = g ? "" : y || "-", this.unescapeSuffix = this.unescapePrefix ? "" : g || "", this.nestingPrefix = v ? ro(v) : _ || ro("$t("), this.nestingSuffix = S ? ro(S) : b || ro(")"), this.nestingOptionsSeparator = C || ",", this.maxReplaces = R || 1e3, this.alwaysFormat = O !== void 0 ? O : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (r, o) => r?.source === o ? (r.lastIndex = 0, r) : new RegExp(o, "g");
    this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = t(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = t(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(t, r, o, s) {
    let l, u, d;
    const p = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, f = (_) => {
      if (_.indexOf(this.formatSeparator) < 0) {
        const R = Ev(r, p, _, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(R, void 0, o, {
          ...s,
          ...r,
          interpolationkey: _
        }) : R;
      }
      const S = _.split(this.formatSeparator), b = S.shift().trim(), C = S.join(this.formatSeparator).trim();
      return this.format(Ev(r, p, b, this.options.keySeparator, this.options.ignoreJSONStructure), C, o, {
        ...s,
        ...r,
        interpolationkey: b
      });
    };
    this.resetRegExp();
    const g = s?.missingInterpolationHandler || this.options.missingInterpolationHandler, y = s?.interpolation?.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (_) => Sf(_)
    }, {
      regex: this.regexp,
      safeValue: (_) => this.escapeValue ? Sf(this.escape(_)) : Sf(_)
    }].forEach((_) => {
      for (d = 0; l = _.regex.exec(t); ) {
        const S = l[1].trim();
        if (u = f(S), u === void 0)
          if (typeof g == "function") {
            const C = g(t, l, s);
            u = Ce(C) ? C : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, S))
            u = "";
          else if (y) {
            u = l[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${S} for interpolating ${t}`), u = "";
        else !Ce(u) && !this.useRawValueToEscape && (u = mv(u));
        const b = _.safeValue(u);
        if (t = t.replace(l[0], b), y ? (_.regex.lastIndex += u.length, _.regex.lastIndex -= l[0].length) : _.regex.lastIndex = 0, d++, d >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, r) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, l, u;
    const d = (p, f) => {
      const g = this.nestingOptionsSeparator;
      if (p.indexOf(g) < 0) return p;
      const y = p.split(new RegExp(`${g}[ ]*{`));
      let v = `{${y[1]}`;
      p = y[0], v = this.interpolate(v, u);
      const _ = v.match(/'/g), S = v.match(/"/g);
      ((_?.length ?? 0) % 2 === 0 && !S || S.length % 2 !== 0) && (v = v.replace(/'/g, '"'));
      try {
        u = JSON.parse(v), f && (u = {
          ...f,
          ...u
        });
      } catch (b) {
        return this.logger.warn(`failed parsing options string in nesting for key ${p}`, b), `${p}${g}${v}`;
      }
      return u.defaultValue && u.defaultValue.indexOf(this.prefix) > -1 && delete u.defaultValue, p;
    };
    for (; s = this.nestingRegexp.exec(t); ) {
      let p = [];
      u = {
        ...o
      }, u = u.replace && !Ce(u.replace) ? u.replace : u, u.applyPostProcessor = !1, delete u.defaultValue;
      let f = !1;
      if (s[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(s[1])) {
        const g = s[1].split(this.formatSeparator).map((y) => y.trim());
        s[1] = g.shift(), p = g, f = !0;
      }
      if (l = r(d.call(this, s[1].trim(), u), u), l && s[0] === t && !Ce(l)) return l;
      Ce(l) || (l = mv(l)), l || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`), l = ""), f && (l = p.reduce((g, y) => this.format(g, y, o.lng, {
        ...o,
        interpolationkey: s[1].trim()
      }), l.trim())), t = t.replace(s[0], l), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
const a$ = (e) => {
  let t = e.toLowerCase().trim();
  const r = {};
  if (e.indexOf("(") > -1) {
    const o = e.split("(");
    t = o[0].toLowerCase().trim();
    const s = o[1].substring(0, o[1].length - 1);
    t === "currency" && s.indexOf(":") < 0 ? r.currency || (r.currency = s.trim()) : t === "relativetime" && s.indexOf(":") < 0 ? r.range || (r.range = s.trim()) : s.split(";").forEach((u) => {
      if (u) {
        const [d, ...p] = u.split(":"), f = p.join(":").trim().replace(/^'+|'+$/g, ""), g = d.trim();
        r[g] || (r[g] = f), f === "false" && (r[g] = !1), f === "true" && (r[g] = !0), isNaN(f) || (r[g] = parseInt(f, 10));
      }
    });
  }
  return {
    formatName: t,
    formatOptions: r
  };
}, io = (e) => {
  const t = {};
  return (r, o, s) => {
    let l = s;
    s && s.interpolationkey && s.formatParams && s.formatParams[s.interpolationkey] && s[s.interpolationkey] && (l = {
      ...l,
      [s.interpolationkey]: void 0
    });
    const u = o + JSON.stringify(l);
    let d = t[u];
    return d || (d = e(gu(o), s), t[u] = d), d(r);
  };
};
class l$ {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = Wn.create("formatter"), this.options = t, this.formats = {
      number: io((r, o) => {
        const s = new Intl.NumberFormat(r, {
          ...o
        });
        return (l) => s.format(l);
      }),
      currency: io((r, o) => {
        const s = new Intl.NumberFormat(r, {
          ...o,
          style: "currency"
        });
        return (l) => s.format(l);
      }),
      datetime: io((r, o) => {
        const s = new Intl.DateTimeFormat(r, {
          ...o
        });
        return (l) => s.format(l);
      }),
      relativetime: io((r, o) => {
        const s = new Intl.RelativeTimeFormat(r, {
          ...o
        });
        return (l) => s.format(l, o.range || "day");
      }),
      list: io((r, o) => {
        const s = new Intl.ListFormat(r, {
          ...o
        });
        return (l) => s.format(l);
      })
    }, this.init(t);
  }
  init(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    this.formatSeparator = r.interpolation.formatSeparator || ",";
  }
  add(t, r) {
    this.formats[t.toLowerCase().trim()] = r;
  }
  addCached(t, r) {
    this.formats[t.toLowerCase().trim()] = io(r);
  }
  format(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const l = r.split(this.formatSeparator);
    if (l.length > 1 && l[0].indexOf("(") > 1 && l[0].indexOf(")") < 0 && l.find((d) => d.indexOf(")") > -1)) {
      const d = l.findIndex((p) => p.indexOf(")") > -1);
      l[0] = [l[0], ...l.splice(1, d)].join(this.formatSeparator);
    }
    return l.reduce((d, p) => {
      const {
        formatName: f,
        formatOptions: g
      } = a$(p);
      if (this.formats[f]) {
        let y = d;
        try {
          const v = s?.formatParams?.[s.interpolationkey] || {}, _ = v.locale || v.lng || s.locale || s.lng || o;
          y = this.formats[f](d, _, {
            ...g,
            ...s,
            ...v
          });
        } catch (v) {
          this.logger.warn(v);
        }
        return y;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return d;
    }, t);
  }
}
const u$ = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class c$ extends Yu {
  constructor(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = r, this.services = o, this.languageUtils = o.languageUtils, this.options = s, this.logger = Wn.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(o, s.backend, s);
  }
  queueLoad(t, r, o, s) {
    const l = {}, u = {}, d = {}, p = {};
    return t.forEach((f) => {
      let g = !0;
      r.forEach((y) => {
        const v = `${f}|${y}`;
        !o.reload && this.store.hasResourceBundle(f, y) ? this.state[v] = 2 : this.state[v] < 0 || (this.state[v] === 1 ? u[v] === void 0 && (u[v] = !0) : (this.state[v] = 1, g = !1, u[v] === void 0 && (u[v] = !0), l[v] === void 0 && (l[v] = !0), p[y] === void 0 && (p[y] = !0)));
      }), g || (d[f] = !0);
    }), (Object.keys(l).length || Object.keys(u).length) && this.queue.push({
      pending: u,
      pendingCount: Object.keys(u).length,
      loaded: {},
      errors: [],
      callback: s
    }), {
      toLoad: Object.keys(l),
      pending: Object.keys(u),
      toLoadLanguages: Object.keys(d),
      toLoadNamespaces: Object.keys(p)
    };
  }
  loaded(t, r, o) {
    const s = t.split("|"), l = s[0], u = s[1];
    r && this.emit("failedLoading", l, u, r), !r && o && this.store.addResourceBundle(l, u, o, void 0, void 0, {
      skipCopy: !0
    }), this.state[t] = r ? -1 : 2, r && o && (this.state[t] = 0);
    const d = {};
    this.queue.forEach((p) => {
      YT(p.loaded, [l], u), u$(p, t), r && p.errors.push(r), p.pendingCount === 0 && !p.done && (Object.keys(p.loaded).forEach((f) => {
        d[f] || (d[f] = {});
        const g = p.loaded[f];
        g.length && g.forEach((y) => {
          d[f][y] === void 0 && (d[f][y] = !0);
        });
      }), p.done = !0, p.errors.length ? p.callback(p.errors) : p.callback());
    }), this.emit("loaded", d), this.queue = this.queue.filter((p) => !p.done);
  }
  read(t, r, o) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, u = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length) return u(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: r,
        fcName: o,
        tried: s,
        wait: l,
        callback: u
      });
      return;
    }
    this.readingCalls++;
    const d = (f, g) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const y = this.waitingReads.shift();
        this.read(y.lng, y.ns, y.fcName, y.tried, y.wait, y.callback);
      }
      if (f && g && s < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, r, o, s + 1, l * 2, u);
        }, l);
        return;
      }
      u(f, g);
    }, p = this.backend[o].bind(this.backend);
    if (p.length === 2) {
      try {
        const f = p(t, r);
        f && typeof f.then == "function" ? f.then((g) => d(null, g)).catch(d) : d(null, f);
      } catch (f) {
        d(f);
      }
      return;
    }
    return p(t, r, d);
  }
  prepareLoading(t, r) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), s && s();
    Ce(t) && (t = this.languageUtils.toResolveHierarchy(t)), Ce(r) && (r = [r]);
    const l = this.queueLoad(t, r, o, s);
    if (!l.toLoad.length)
      return l.pending.length || s(), null;
    l.toLoad.forEach((u) => {
      this.loadOne(u);
    });
  }
  load(t, r, o) {
    this.prepareLoading(t, r, {}, o);
  }
  reload(t, r, o) {
    this.prepareLoading(t, r, {
      reload: !0
    }, o);
  }
  loadOne(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const o = t.split("|"), s = o[0], l = o[1];
    this.read(s, l, "read", void 0, void 0, (u, d) => {
      u && this.logger.warn(`${r}loading namespace ${l} for language ${s} failed`, u), !u && d && this.logger.log(`${r}loaded namespace ${l} for language ${s}`, d), this.loaded(t, u, d);
    });
  }
  saveMissing(t, r, o, s, l) {
    let u = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, d = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(r)) {
      this.logger.warn(`did not save key "${o}" as the namespace "${r}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(o == null || o === "")) {
      if (this.backend?.create) {
        const p = {
          ...u,
          isUpdate: l
        }, f = this.backend.create.bind(this.backend);
        if (f.length < 6)
          try {
            let g;
            f.length === 5 ? g = f(t, r, o, s, p) : g = f(t, r, o, s), g && typeof g.then == "function" ? g.then((y) => d(null, y)).catch(d) : d(null, g);
          } catch (g) {
            d(g);
          }
        else
          f(t, r, o, s, d, p);
      }
      !t || !t[0] || this.store.addResource(t[0], r, o, s);
    }
  }
}
const Pv = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  simplifyPluralSuffix: !0,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (e) => {
    let t = {};
    if (typeof e[1] == "object" && (t = e[1]), Ce(e[1]) && (t.defaultValue = e[1]), Ce(e[2]) && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
      const r = e[3] || e[2];
      Object.keys(r).forEach((o) => {
        t[o] = r[o];
      });
    }
    return t;
  },
  interpolation: {
    escapeValue: !0,
    format: (e) => e,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  }
}), Rv = (e) => (Ce(e.ns) && (e.ns = [e.ns]), Ce(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), Ce(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs?.indexOf?.("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), typeof e.initImmediate == "boolean" && (e.initAsync = e.initImmediate), e), Rl = () => {
}, d$ = (e) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((r) => {
    typeof e[r] == "function" && (e[r] = e[r].bind(e));
  });
};
class Ds extends Yu {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = Rv(t), this.services = {}, this.logger = Wn, this.modules = {
      external: []
    }, d$(this), r && !this.isInitialized && !t.isClone) {
      if (!this.options.initAsync)
        return this.init(t, r), this;
      setTimeout(() => {
        this.init(t, r);
      }, 0);
    }
  }
  init() {
    var t = this;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = arguments.length > 1 ? arguments[1] : void 0;
    this.isInitializing = !0, typeof r == "function" && (o = r, r = {}), r.defaultNS == null && r.ns && (Ce(r.ns) ? r.defaultNS = r.ns : r.ns.indexOf("translation") < 0 && (r.defaultNS = r.ns[0]));
    const s = Pv();
    this.options = {
      ...s,
      ...this.options,
      ...Rv(r)
    }, this.options.interpolation = {
      ...s.interpolation,
      ...this.options.interpolation
    }, r.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = r.keySeparator), r.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = r.nsSeparator);
    const l = (g) => g ? typeof g == "function" ? new g() : g : null;
    if (!this.options.isClone) {
      this.modules.logger ? Wn.init(l(this.modules.logger), this.options) : Wn.init(null, this.options);
      let g;
      this.modules.formatter ? g = this.modules.formatter : g = l$;
      const y = new xv(this.options);
      this.store = new Sv(this.options.resources, this.options);
      const v = this.services;
      v.logger = Wn, v.resourceStore = this.store, v.languageUtils = y, v.pluralResolver = new o$(y, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), g && (!this.options.interpolation.format || this.options.interpolation.format === s.interpolation.format) && (v.formatter = l(g), v.formatter.init(v, this.options), this.options.interpolation.format = v.formatter.format.bind(v.formatter)), v.interpolator = new s$(this.options), v.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, v.backendConnector = new c$(l(this.modules.backend), v.resourceStore, v, this.options), v.backendConnector.on("*", function(_) {
        for (var S = arguments.length, b = new Array(S > 1 ? S - 1 : 0), C = 1; C < S; C++)
          b[C - 1] = arguments[C];
        t.emit(_, ...b);
      }), this.modules.languageDetector && (v.languageDetector = l(this.modules.languageDetector), v.languageDetector.init && v.languageDetector.init(v, this.options.detection, this.options)), this.modules.i18nFormat && (v.i18nFormat = l(this.modules.i18nFormat), v.i18nFormat.init && v.i18nFormat.init(this)), this.translator = new yu(this.services, this.options), this.translator.on("*", function(_) {
        for (var S = arguments.length, b = new Array(S > 1 ? S - 1 : 0), C = 1; C < S; C++)
          b[C - 1] = arguments[C];
        t.emit(_, ...b);
      }), this.modules.external.forEach((_) => {
        _.init && _.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, o || (o = Rl), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((g) => {
      this[g] = function() {
        return t.store[g](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((g) => {
      this[g] = function() {
        return t.store[g](...arguments), t;
      };
    });
    const p = hs(), f = () => {
      const g = (y, v) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), p.resolve(v), o(y, v);
      };
      if (this.languages && !this.isInitialized) return g(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, g);
    };
    return this.options.resources || !this.options.initAsync ? f() : setTimeout(f, 0), p;
  }
  loadResources(t) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Rl;
    const s = Ce(t) ? t : this.language;
    if (typeof t == "function" && (o = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (s?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return o();
      const l = [], u = (d) => {
        if (!d || d === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(d).forEach((f) => {
          f !== "cimode" && l.indexOf(f) < 0 && l.push(f);
        });
      };
      s ? u(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((p) => u(p)), this.options.preload?.forEach?.((d) => u(d)), this.services.backendConnector.load(l, this.options.ns, (d) => {
        !d && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), o(d);
      });
    } else
      o(null);
  }
  reloadResources(t, r, o) {
    const s = hs();
    return typeof t == "function" && (o = t, t = void 0), typeof r == "function" && (o = r, r = void 0), t || (t = this.languages), r || (r = this.options.ns), o || (o = Rl), this.services.backendConnector.reload(t, r, (l) => {
      s.resolve(), o(l);
    }), s;
  }
  use(t) {
    if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && aS.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let r = 0; r < this.languages.length; r++) {
        const o = this.languages[r];
        if (!(["cimode", "dev"].indexOf(o) > -1) && this.store.hasLanguageSomeTranslations(o)) {
          this.resolvedLanguage = o;
          break;
        }
      }
  }
  changeLanguage(t, r) {
    var o = this;
    this.isLanguageChangingTo = t;
    const s = hs();
    this.emit("languageChanging", t);
    const l = (p) => {
      this.language = p, this.languages = this.services.languageUtils.toResolveHierarchy(p), this.resolvedLanguage = void 0, this.setResolvedLanguage(p);
    }, u = (p, f) => {
      f ? (l(f), this.translator.changeLanguage(f), this.isLanguageChangingTo = void 0, this.emit("languageChanged", f), this.logger.log("languageChanged", f)) : this.isLanguageChangingTo = void 0, s.resolve(function() {
        return o.t(...arguments);
      }), r && r(p, function() {
        return o.t(...arguments);
      });
    }, d = (p) => {
      !t && !p && this.services.languageDetector && (p = []);
      const f = Ce(p) ? p : this.services.languageUtils.getBestMatchFromCodes(p);
      f && (this.language || l(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector?.cacheUserLanguage?.(f)), this.loadResources(f, (g) => {
        u(g, f);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? d(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(d) : this.services.languageDetector.detect(d) : d(t), s;
  }
  getFixedT(t, r, o) {
    var s = this;
    const l = function(u, d) {
      let p;
      if (typeof d != "object") {
        for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), y = 2; y < f; y++)
          g[y - 2] = arguments[y];
        p = s.options.overloadTranslationOptionHandler([u, d].concat(g));
      } else
        p = {
          ...d
        };
      p.lng = p.lng || l.lng, p.lngs = p.lngs || l.lngs, p.ns = p.ns || l.ns, p.keyPrefix !== "" && (p.keyPrefix = p.keyPrefix || o || l.keyPrefix);
      const v = s.options.keySeparator || ".";
      let _;
      return p.keyPrefix && Array.isArray(u) ? _ = u.map((S) => `${p.keyPrefix}${v}${S}`) : _ = p.keyPrefix ? `${p.keyPrefix}${v}${u}` : u, s.t(_, p);
    };
    return Ce(t) ? l.lng = t : l.lngs = t, l.ns = r, l.keyPrefix = o, l;
  }
  t() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.translator?.translate(...r);
  }
  exists() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return this.translator?.exists(...r);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const o = r.lng || this.resolvedLanguage || this.languages[0], s = this.options ? this.options.fallbackLng : !1, l = this.languages[this.languages.length - 1];
    if (o.toLowerCase() === "cimode") return !0;
    const u = (d, p) => {
      const f = this.services.backendConnector.state[`${d}|${p}`];
      return f === -1 || f === 0 || f === 2;
    };
    if (r.precheck) {
      const d = r.precheck(this, u);
      if (d !== void 0) return d;
    }
    return !!(this.hasResourceBundle(o, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || u(o, t) && (!s || u(l, t)));
  }
  loadNamespaces(t, r) {
    const o = hs();
    return this.options.ns ? (Ce(t) && (t = [t]), t.forEach((s) => {
      this.options.ns.indexOf(s) < 0 && this.options.ns.push(s);
    }), this.loadResources((s) => {
      o.resolve(), r && r(s);
    }), o) : (r && r(), Promise.resolve());
  }
  loadLanguages(t, r) {
    const o = hs();
    Ce(t) && (t = [t]);
    const s = this.options.preload || [], l = t.filter((u) => s.indexOf(u) < 0 && this.services.languageUtils.isSupportedCode(u));
    return l.length ? (this.options.preload = s.concat(l), this.loadResources((u) => {
      o.resolve(), r && r(u);
    }), o) : (r && r(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)), !t) return "rtl";
    const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], o = this.services?.languageUtils || new xv(Pv());
    return r.indexOf(o.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    return new Ds(t, r);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Rl;
    const o = t.forkResourceStore;
    o && delete t.forkResourceStore;
    const s = {
      ...this.options,
      ...t,
      isClone: !0
    }, l = new Ds(s);
    if ((t.debug !== void 0 || t.prefix !== void 0) && (l.logger = l.logger.clone(t)), ["store", "services", "language"].forEach((d) => {
      l[d] = this[d];
    }), l.services = {
      ...this.services
    }, l.services.utils = {
      hasLoadedNamespace: l.hasLoadedNamespace.bind(l)
    }, o) {
      const d = Object.keys(this.store.data).reduce((p, f) => (p[f] = {
        ...this.store.data[f]
      }, Object.keys(p[f]).reduce((g, y) => (g[y] = {
        ...p[f][y]
      }, g), {})), {});
      l.store = new Sv(d, s), l.services.resourceStore = l.store;
    }
    return l.translator = new yu(l.services, s), l.translator.on("*", function(d) {
      for (var p = arguments.length, f = new Array(p > 1 ? p - 1 : 0), g = 1; g < p; g++)
        f[g - 1] = arguments[g];
      l.emit(d, ...f);
    }), l.init(s, r), l.translator.options = s, l.translator.backendConnector.services.utils = {
      hasLoadedNamespace: l.hasLoadedNamespace.bind(l)
    }, l;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const Pt = Ds.createInstance();
Pt.createInstance = Ds.createInstance;
Pt.createInstance;
Pt.dir;
Pt.init;
Pt.loadResources;
Pt.reloadResources;
Pt.use;
Pt.changeLanguage;
Pt.getFixedT;
Pt.t;
Pt.exists;
Pt.setDefaultNamespace;
Pt.hasLoadedNamespace;
Pt.loadNamespaces;
Pt.loadLanguages;
const f$ = (e, t, r, o) => {
  const s = [r, {
    code: t,
    ...o || {}
  }];
  if (e?.services?.logger?.forward)
    return e.services.logger.forward(s, "warn", "react-i18next::", !0);
  wi(s[0]) && (s[0] = `react-i18next:: ${s[0]}`), e?.services?.logger?.warn ? e.services.logger.warn(...s) : console?.warn && console.warn(...s);
}, Tv = {}, op = (e, t, r, o) => {
  wi(r) && Tv[r] || (wi(r) && (Tv[r] = /* @__PURE__ */ new Date()), f$(e, t, r, o));
}, lS = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const r = () => {
      setTimeout(() => {
        e.off("initialized", r);
      }, 0), t();
    };
    e.on("initialized", r);
  }
}, sp = (e, t, r) => {
  e.loadNamespaces(t, lS(e, r));
}, $v = (e, t, r, o) => {
  if (wi(r) && (r = [r]), e.options.preload && e.options.preload.indexOf(t) > -1) return sp(e, r, o);
  r.forEach((s) => {
    e.options.ns.indexOf(s) < 0 && e.options.ns.push(s);
  }), e.loadLanguages(t, lS(e, o));
}, p$ = (e, t, r = {}) => !t.languages || !t.languages.length ? (op(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: t.languages
}), !0) : t.hasLoadedNamespace(e, {
  lng: r.lng,
  precheck: (o, s) => {
    if (r.bindI18n?.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !s(o.isLanguageChangingTo, e)) return !1;
  }
}), wi = (e) => typeof e == "string", h$ = (e) => typeof e == "object" && e !== null, g$ = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, m$ = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, y$ = (e) => m$[e], v$ = (e) => e.replace(g$, y$);
let ap = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: v$
};
const w$ = (e = {}) => {
  ap = {
    ...ap,
    ...e
  };
}, S$ = () => ap;
let uS;
const b$ = (e) => {
  uS = e;
}, _$ = () => uS, x$ = {
  type: "3rdParty",
  init(e) {
    w$(e.options.react), b$(e);
  }
}, k$ = k.createContext();
class C$ {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((r) => {
      this.usedNamespaces[r] || (this.usedNamespaces[r] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const E$ = (e, t) => {
  const r = k.useRef();
  return k.useEffect(() => {
    r.current = e;
  }, [e, t]), r.current;
}, cS = (e, t, r, o) => e.getFixedT(t, r, o), P$ = (e, t, r, o) => k.useCallback(cS(e, t, r, o), [e, t, r, o]), Jr = (e, t = {}) => {
  const {
    i18n: r
  } = t, {
    i18n: o,
    defaultNS: s
  } = k.useContext(k$) || {}, l = r || o || _$();
  if (l && !l.reportNamespaces && (l.reportNamespaces = new C$()), !l) {
    op(l, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const P = (M, A) => wi(A) ? A : h$(A) && wi(A.defaultValue) ? A.defaultValue : Array.isArray(M) ? M[M.length - 1] : M, E = [P, {}, !1];
    return E.t = P, E.i18n = {}, E.ready = !1, E;
  }
  l.options.react?.wait && op(l, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const u = {
    ...S$(),
    ...l.options.react,
    ...t
  }, {
    useSuspense: d,
    keyPrefix: p
  } = u;
  let f = s || l.options?.defaultNS;
  f = wi(f) ? [f] : f || ["translation"], l.reportNamespaces.addUsedNamespaces?.(f);
  const g = (l.isInitialized || l.initializedStoreOnce) && f.every((P) => p$(P, l, u)), y = P$(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), v = () => y, _ = () => cS(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), [S, b] = k.useState(v);
  let C = f.join();
  t.lng && (C = `${t.lng}${C}`);
  const R = E$(C), O = k.useRef(!0);
  k.useEffect(() => {
    const {
      bindI18n: P,
      bindI18nStore: E
    } = u;
    O.current = !0, !g && !d && (t.lng ? $v(l, t.lng, f, () => {
      O.current && b(_);
    }) : sp(l, f, () => {
      O.current && b(_);
    })), g && R && R !== C && O.current && b(_);
    const M = () => {
      O.current && b(_);
    };
    return P && l?.on(P, M), E && l?.store.on(E, M), () => {
      O.current = !1, l && P?.split(" ").forEach((A) => l.off(A, M)), E && l && E.split(" ").forEach((A) => l.store.off(A, M));
    };
  }, [l, C]), k.useEffect(() => {
    O.current && g && b(v);
  }, [l, p, g]);
  const x = [S, l, g];
  if (x.t = S, x.i18n = l, x.ready = g, g || !g && !d) return x;
  throw new Promise((P) => {
    t.lng ? $v(l, t.lng, f, () => P()) : sp(l, f, () => P());
  });
}, R$ = "An", T$ = "Aus", $$ = "Auswählen", M$ = "Erfolgreich", A$ = "Ok", I$ = "Abbrechen", O$ = "Lautstärke", N$ = "Medien überspringen (Shortcut)", L$ = "Alert überspringen (Shortcut)", D$ = { title: "Autorisierung", code: "Code anfordern", sign_in: "Anmelden", phone: "Telefonnummer", telegram_code: "Code aus Telegram", your_code: "Dein Code", "2fa_password": "2FA-Passwort", password: "Passwort", streamelements: "Du musst zuerst StreamElements JWT verbinden", you_can_find_by_url: "Du findest es unter dieser URL", set_id_and_jwt: "Du musst die StreamElements Account ID und JWT für {{service}} festlegen" }, F$ = { wrong_lots_format: "Falsches Lots-Format", not_connected: "Nicht verbunden", request_error: "Anfragefehler" }, z$ = { title: "Update", description: "Eine neue Version der App ist verfügbar. Möchtest du aktualisieren?", update: "Aktualisieren", later: "Später", downloading: "Wird heruntergeladen..." }, j$ = { title: "Medien", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, B$ = { tribute: "Tribute-Nachrichten anzeigen" }, U$ = { lots: "Lose", wheel: "Rad", settings: "Einstellungen" }, W$ = { set_point: "Punkt setzen", meter_price: "Preis pro 1 Meter", amount: "Betrag", finish: "Abschließen", lat_error: "Breitengrad muss zwischen -90 und 90 liegen", lng_error: "Längengrad muss zwischen -180 und 180 liegen", rules: "Damit der Zeiger automatisch die Position in der Nachricht ändert, darf nur ein Wort aus folgender Liste enthalten sein:" }, V$ = { enabled: "Aktiviert", min_amount: "Mindestbetrag", video_volume: "Video-Lautstärke", min_views: "Mindestaufrufe" }, H$ = { messages: "Nachrichten", settings: "Einstellungen", services: "Dienste", alerts: "Alerts", media: "Medien", goals: "Ziele", auction: "Auktion", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info" }, q$ = { title: "Letzte Nachrichten" }, K$ = { skip: "Überspringen", replay: "Wiederholen", donated: "{{user_name}} hat {{amount}}{{currency}} gespendet", followed: "{{user_name}} folgt jetzt", subscribed: "{{user_name}} hat abonniert", gifted_subscriptions: "{{user_name}} hat {{total}} Abonnements verschenkt", raided_with: "{{user_name}} hat mit {{viewers}} Zuschauern geraidet" }, Q$ = { title: "Nachrichten filtern", exclude_donations: "Spenden ausschließen", exclude_follows: "Follows ausschließen", exclude_subscriptions: "Abonnements ausschließen", exclude_raids: "Raids ausschließen" }, G$ = { title: "Einstellungen", pause: "Alert-Nachrichten pausieren", moderation_duration: "Moderationsdauer", black_list: "Sperrliste", remove_links: "Links entfernen", language: "Sprache", sec: "Sek.", currency: "Währung", tts_type: "TTS-Typ" }, Y$ = { normal: "Normal", dropout: "Dropout", spin: "Drehen", speed: "Rad-Geschwindigkeit" }, J$ = { continue: "Fortsetzen", pause: "Pausieren", reset: "Zurücksetzen", add_time: "Zeit hinzufügen", reduce_time: "Zeit reduzieren", add_timex2: "Zeit ×2 hinzufügen" }, X$ = { title: "Fighter", match: "Match", final: "Finale", game: "Spiel", cancel: "Spiel abbrechen", winner: "Gewinner", settings: "Einstellungen", create_game: "Spiel aus Losen erstellen", start: "Starten", pause: "Pausieren", rematch: "Rematch", resume: "Fortsetzen" }, Z$ = { name: "Name", delete: "Löschen", add: "Betrag hinzufügen" }, eM = { delete: "Löschen", to_lot: "Zum Los", new: "Neu", add_to_random_slot: "Zum zufälligen Los hinzufügen" }, tM = { add: "Hinzufügen", new_lot_name: "Name des neuen Loses", search: "Los suchen", total: "Gesamt" }, nM = { leader_change: "Führungswechsel", new_lot: "Neues Los", new_donation: "Neue Spende", show_odds: "Quoten anzeigen", show_total_sum: "Gesamtsumme anzeigen", greater_timer_adding_time: "Zeit hinzufügen bei höherem Gebot", not_add_time_if: "Keine Zeit hinzufügen, wenn", adding_time: "Zeit" }, rM = { import_lots: "Lose importieren", clear_lots: "Lose löschen" }, iM = { round_duration: "Rundendauer", add_players: "Spieler hinzufügen" }, oM = { title: "Alerts", group: "Gruppe" }, sM = { title: "Dienste", tribute: "Tribute", streamelements: "StreamElements", connect: "Verbinden", integrations: "Integrationen", sign_out: "Abmelden", confirm_sign_out: "Möchtest du dich wirklich von diesem Dienst abmelden?" }, aM = { device_code_expired: "Der Gerätecode ist abgelaufen. Bitte versuche es erneut.", user_code: "Benutzercode", authorize_with_code: "Mit Code autorisieren", waiting_authorization: "Warte auf Autorisierung..." }, lM = { donation_account_name: "Name des Spendenkontos", donation_url: "Spenden-URL", create_donation_account: "Widy-Spendenkonto erstellen", connect_to_existing_account: "Mit bestehendem Konto verbinden", create_donation_account_pending: "Spendenkonto wird erstellt..." }, uM = { title: "Twitch-Einstellungen", points_currency_ratio: "Points-zu-Währung-Verhältnis", rewards_name: "Belohnungsname", rewards_list: "Belohnungsliste", add_reward: "Belohnung hinzufügen", cost: "Kosten", color: "Farbe" }, cM = { image: "Bild", audio: "Audio", view: "Ansicht", title: "Titel", message: "Nachricht", test_name: "Test", test_text: "Dies ist ein Test-Alert!", configure: "Konfigurieren", test: "Testen", add_new_variant: "Neue Variante hinzufügen", new_variant: "Neue Variante", variant_title: "Varianten-Titel", variant_group: "Varianten-Gruppe", status: "Status", variation_condition: "Variationsbedingung", group: "Gruppe", Random: "Zufällig", AmountIsGreater: "Betrag ist größer", AmountIsEqual: "Betrag ist gleich", delete: "Löschen", sure_delete: "Möchtest du diese Variation wirklich löschen?", type: "Typ", Donation: "Spende", Subscription: "Abonnement", Follow: "Follow", Raid: "Raid" }, dM = "Allgemein", fM = { title: "Ziele", create: "Neues Ziel erstellen" }, pM = { new: "Neues Ziel", goal: "Ziel", type: "Typ", elements: "Elemente", progress: "Fortschritt", goal_title: "Ziel-Titel", amount_raise: "Zielbetrag", start_raising: "Startbetrag", end_date: "Ziel-Enddatum", bar_height: "Balkenhöhe", rounding_radius: "Abrundungsradius", bar_stroke_thickness: "Balken-Strichstärke", background_bar_color: "Hintergrundfarbe des Balkens", progress_bar_color: "Fortschrittsbalken-Farbe", goal_progress_bar: "Ziel-Fortschrittsbalken", progress_bar_layout: "Fortschrittsbalken-Layout", remaining_time: "Verbleibende Zeit", goal_amount_limits: "Zielbetragslimits", widget_background: "Widget-Hintergrund", background_color: "Hintergrundfarbe", OnTop: "Oben", Inside: "Innerhalb", Below: "Unten", DoNotDisplay: "Nicht anzeigen", title: "Titel", limits: "Limits", raised: "Erreicht", days_left: "Tage übrig", finish_goal: "Ziel abschließen", sure_finish: "Möchtest du dieses Ziel wirklich abschließen?", Donation: "Spende", TwitchSubscription: "Twitch-Abonnement", TwitchFollow: "Twitch-Follow", goal_not_finished: "Du hast ein noch nicht abgeschlossenes Ziel dieses Typs." }, hM = "Speichern", gM = "Zurück", mM = { copy: "Kopieren", launch: "Starten", url: "Widget-URL", obs_dock_url: "OBS Dock-URL" }, yM = { top: "Bild oben, Text unten", bottom: "Bild unten, Text oben", left: "Bild links, Text rechts", right: "Bild rechts, Text links", overlay: "Text über Bild" }, vM = { show: "Bild anzeigen" }, wM = { font: "Schriftart", font_size: "Schriftgröße", text_color: "Textfarbe", bold: "Fett", italics: "Kursiv", underline: "Unterstrichen", transformation: "Transformation", letter_spacing: "Buchstabenabstand", word_spacing: "Wortabstand", horizontal_alignment: "Horizontale Ausrichtung", vertical_alignment: "Vertikale Ausrichtung", text_preview: "Dies ist eine Vorschau!", name: "Name" }, SM = { play: "Abspielen", stop: "Stoppen" }, bM = "Version", _M = { title: "Widgets", add: "Widget hinzufügen", install: "Installieren", delete: "Löschen", installed: "Installiert", all: "Alle", settings: "Einstellungen", control: "Steuerung", delete_confirm: "Möchtest du dieses Widget wirklich löschen?", invalid_manifest: "Ungültiges Widget-Manifest", add_confirm: "Das Hinzufügen erlaubt {{widget_name}} folgendes:", installing: "Wird installiert...", view_url: "URL ansehen" }, xM = { "widgets:messages.read": "Nachrichten lesen", "widgets:goals.read": "Ziele lesen", "widgets:auc-fighter:settings.read": "Auc-Fighter-Einstellungen lesen", "widgets:settings.read": "Widget-Einstellungen lesen", "widgets:alerts.read": "Alerts lesen", "widgets:media:settings.read": "Medien-Einstellungen lesen", "widgets:auc-fighter:match-playing.send": "Match wird gespielt senden", "widgets:auc-fighter:match-winner.send": "Match-Gewinner senden", "widgets:auc-fighter:match-paused.send": "Match pausiert senden", "widgets:auc-fighter:match-id.send": "Match-ID senden", "widgets:alert:played.send": "Alert abgespielt senden", "widgets:alert:playing.send": "Alert wird abgespielt senden", "widgets:media:played.send": "Medien abgespielt senden", "widgets:media:end.send": "Medien-Ende senden", "widgets:media:playing.send": "Medien wird abgespielt senden", "widgets:media:paused.send": "Medien pausiert senden", "widgets:media:error.send": "Medien-Fehler senden", "widgets:media:replay.send": "Medien-Wiederholung senden", "widgets:alert:replay.send": "Alert-Wiederholung senden", "widgets:alert:skip.send": "Alert überspringen senden", "widgets:messages.subscription": "Nachrichten abonnieren", "widgets:goal.subscription": "Ziel abonnieren", "widgets:settings.subscription": "Einstellungen abonnieren", "widgets:auc-fighter:start-match.subscription": "Match-Start abonnieren", "widgets:auc-fighter:pause-match.subscription": "Match-Pause abonnieren", "widgets:auc-fighter:resume-match.subscription": "Match-Fortsetzung abonnieren", "widgets:auc-fighter:cancel-match.subscription": "Match-Abbruch abonnieren", "widgets:auc-fighter:update-match.subscription": "Match-Update abonnieren", "widgets:auc-fighter:settings.subscription": "Auc-Fighter-Einstellungen abonnieren", "widgets:alert:replay.subscription": "Alert-Wiederholung abonnieren", "widgets:alert:skip.subscription": "Alert-Überspringen abonnieren", "widgets:alert:test.subscription": "Alert-Test abonnieren", "widgets:alert:skip-playing.subscription": "Alert-Überspringen während Wiedergabe abonnieren", "widgets:alert:alerts.subscription": "Alerts abonnieren", "widgets:media:replay.subscription": "Medien-Wiederholung abonnieren", "widgets:media:settings.subscription": "Medien-Einstellungen abonnieren", "widgets:media:skip.subscription": "Medien-Überspringen abonnieren", "widgets:media:skip-playing-media.subscription": "Medien-Überspringen während Wiedergabe abonnieren", "widgets:media:end.subscription": "Medien-Ende abonnieren", "widgets:media:error.subscription": "Medien-Fehler abonnieren", "widgets:media:pause.subscription": "Medien-Pause abonnieren", "widgets:media:play.subscription": "Medien-Play abonnieren", "widgets:alert:played.subscription": "Alert abgespielt abonnieren", "widgets:storage.read": "Widget-Speicher lesen", "widgets:storage.write": "In Widget-Speicher schreiben" }, kM = {
  on: R$,
  off: T$,
  select: $$,
  success: M$,
  ok: A$,
  cancel: I$,
  sound_volume: O$,
  skip_media: N$,
  skip_alert: L$,
  authorization: D$,
  error: F$,
  updater: z$,
  media: j$,
  integration: B$,
  auction: U$,
  maption: W$,
  media_settings: V$,
  dashboard: H$,
  messages: q$,
  message: K$,
  filter: Q$,
  settings: G$,
  wheel: Y$,
  timer: J$,
  fighter: X$,
  lot: Z$,
  bid: eM,
  lots: tM,
  auction_settings: nM,
  lots_options: rM,
  auc_fighter_settings: iM,
  alerts: oM,
  services: sM,
  twitch: aM,
  widy: lM,
  twitch_service_settings: uM,
  alert: cM,
  general: dM,
  goals: fM,
  goal: pM,
  save: hM,
  back: gM,
  widget: mM,
  view: yM,
  image: vM,
  text: wM,
  audio: SM,
  version: bM,
  widgets: _M,
  scopes: xM
}, CM = "On", EM = "Off", PM = "Select", RM = "Success", TM = "Ok", $M = "Cancel", MM = "Sound volume", AM = "Shortcut skip media", IM = "Shortcut skip alert", OM = { title: "Authorization", code: "Request code", sign_in: "Sign in", phone: "Phone number", telegram_code: "Code from telegram", your_code: "Your code", "2fa_password": "2fa Password", password: "Password", streamelements: "You need connect with StreamElements JWT first", you_can_find_by_url: "You can find it by this url", set_id_and_jwt: "You need set StreamElements Account ID and JWT for {{service}}" }, NM = { wrong_lots_format: "Wrong lots format", not_connected: "Not connected", request_error: "Request error" }, LM = { title: "Update", description: "A new version of the app is available. Do you want to update?", update: "Update", later: "Later", downloading: "Downloading..." }, DM = { title: "Media", youtube: "Youtube", twitch: "Twitch", tiktok: "Tiktok" }, FM = { tribute: "Show tribute messages" }, zM = { lots: "Lots", wheel: "Wheel", settings: "Settings" }, jM = { set_point: "Set point", meter_price: "Price for 1 meter", amount: "Amount", finish: "Finish", lat_error: "Latitude must be between -90 and 90", lng_error: "Longitude must be between -180 and 180", rules: "For the pointer to automatically change position in the message there should be only one word from:" }, BM = { enabled: "Enabled", min_amount: "Min amount", video_volume: "Video volume", min_views: "Min views" }, UM = { messages: "Messages", settings: "Settings", services: "Services", alerts: "Alerts", media: "Media", goals: "Goals", auction: "Auction", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info" }, WM = { title: "Last messages" }, VM = { skip: "Skip", replay: "Replay", donated: "{{user_name}} donated {{amount}}{{currency}}", followed: "{{user_name}} followed", subscribed: "{{user_name}} subscribed", gifted_subscriptions: "{{user_name}} gift {{total}} subscriptions", raided_with: "{{user_name}} raided with {{viewers}} viewers" }, HM = { title: "Filter messages", exclude_donations: "Exclude donations", exclude_follows: "Exclude follows", exclude_subscriptions: "Exclude subscriptions", exclude_raids: "Exclude raids" }, qM = { title: "Settings", pause: "Pause alert messages", moderation_duration: "Moderation duration", black_list: "Black list", remove_links: "Remove links", language: "Language", sec: "Sec", currency: "Currency", tts_type: "TTS type" }, KM = { normal: "Normal", dropout: "Dropout", spin: "Spin", speed: "Wheel speed" }, QM = { continue: "Continue", pause: "Pause", reset: "Reset", add_time: "Add time", reduce_time: "Reduce time", add_timex2: "Add time x2" }, GM = { title: "Fighter", match: "Match", final: "Final", game: "Game", cancel: "Cancel game", winner: "Winner", settings: "Settings", create_game: "Create game from lots", start: "Start", pause: "Pause", rematch: "Rematch", resume: "Resume" }, YM = { name: "Name", delete: "Delete", add: "Add amount" }, JM = { delete: "Delete", to_lot: "To lot", new: "New", add_to_random_slot: "Add to random lot" }, XM = { add: "Add", new_lot_name: "New lot name", search: "Search lot", total: "Total" }, ZM = { leader_change: "Leader change", new_lot: "New lot", new_donation: "New donation", show_odds: "Show odds", show_total_sum: "Show total sum", greater_timer_adding_time: "Greater timer adding time", not_add_time_if: "Not add time if", adding_time: "Time" }, e2 = { import_lots: "Import lots", clear_lots: "Clear lots" }, t2 = { round_duration: "Round duration", add_players: "Add players" }, n2 = { title: "Alerts", group: "Group" }, r2 = { title: "Services", tribute: "Tribute", streamelements: "Streamelements", connect: "Connect", integrations: "Integrations", sign_out: "Sign out", confirm_sign_out: "Are you sure you want to sign out from this service?" }, i2 = { device_code_expired: "Device code expired. Please try again.", user_code: "User code", authorize_with_code: "Authorize with code", waiting_authorization: "Waiting for authorization..." }, o2 = { donation_account_name: "Name of donation account", donation_url: "Donation url", create_donation_account: "Create Widy donation account", connect_to_existing_account: "Connect to existing account", create_donation_account_pending: "Creating donation account..." }, s2 = { title: "Twitch settings", points_currency_ratio: "Points currency ratio", rewards_name: "Rewards name", rewards_list: "Rewards list", add_reward: "Add reward", cost: "Cost", color: "Color" }, a2 = { image: "Image", audio: "Audio", view: "View", title: "Title", message: "Message", test_name: "Test", test_text: "This is a test alert!", configure: "Configure", test: "Test", add_new_variant: "Add new variant", new_variant: "New variant", variant_title: "Variant title", variant_group: "Variant group", status: "Status", variation_condition: "Variation condition", group: "Group", Random: "Random", AmountIsGreater: "Amount is greater", AmountIsEqual: "Amount is equal", delete: "Delete", sure_delete: "Are you sure you want to delete this variation?", type: "Type", Donation: "Donation", Subscription: "Subscription", Follow: "Follow", Raid: "Raid" }, l2 = "General", u2 = { title: "Goals", create: "Crate new goal" }, c2 = { new: "New goal", goal: "View", type: "Type", elements: "Elements", progress: "Progress", goal_title: "Goal title", amount_raise: "Amount to raise", start_raising: "Start raising from", end_date: "End goal date", bar_height: "Bar height", rounding_radius: "Rounding radius", bar_stroke_thickness: "Bar stroke thickness", background_bar_color: "Background bar color", progress_bar_color: "Progress bar color", goal_progress_bar: "Goal progress bar", progress_bar_layout: "Progress bar layout", remaining_time: "Remaining time", goal_amount_limits: "Goal amount limits", widget_background: "Widget background", background_color: "Background color", OnTop: "On top", Inside: "Inside", Below: "Below", DoNotDisplay: "Do not display", title: "Title", limits: "limits", raised: "Raised", days_left: "Days left", finish_goal: "Finish goal", sure_finish: "Are you sure you want to finish this goal?", Donation: "Donation", TwitchSubscription: "Twitch Subscription", TwitchFollow: "Twitch Follow", goal_not_finished: "You have an unfinished goal of this type." }, d2 = "Save", f2 = "Back", p2 = { copy: "Copy", launch: "Launch", url: "Widget url", obs_dock_url: "Obs dock url" }, h2 = { top: "Image top, text bottom", bottom: "Image bottom, text top", left: "Image left, text right", right: "Image right, text left", overlay: "Text overlay image" }, g2 = { show: "Show image" }, m2 = { font: "Font", font_size: "Font size", text_color: "Text color", bold: "Bold", italics: "Italics", underline: "Underline", transformation: "Transformation", letter_spacing: "Letter spacing", word_spacing: "Word spacing", horizontal_alignment: "Horizontal alignment", vertical_alignment: "Vertical alignment", text_preview: "This is a preview!", name: "Name" }, y2 = { play: "Play", stop: "Stop" }, v2 = "Version", w2 = { title: "Widgets", add: "Add widget", install: "Install", delete: "Delete", installed: "Installed", all: "All", settings: "Settings", control: "Control", delete_confirm: "Are you sure you want to delete this widget?", invalid_manifest: "Invalid widget manifest", add_confirm: "Adding will allow {{widget_name}} to:", installing: "Installing...", view_url: "View url" }, S2 = { "widgets:messages.read": "Read messages", "widgets:goals.read": "Read goals", "widgets:auc-fighter:settings.read": "Read auc-fighter settings", "widgets:settings.read": "Read widget settings", "widgets:alerts.read": "Read alerts", "widgets:media:settings.read": "Read media settings", "widgets:auc-fighter:match-playing.send": "Send match playing", "widgets:auc-fighter:match-winner.send": "Send match winner", "widgets:auc-fighter:match-paused.send": "Send match paused", "widgets:auc-fighter:match-id.send": "Send match ID", "widgets:alert:played.send": "Send alert played", "widgets:alert:playing.send": "Send alert playing", "widgets:media:played.send": "Send media played", "widgets:media:end.send": "Send media end", "widgets:media:playing.send": "Send media playing", "widgets:media:paused.send": "Send media paused", "widgets:media:error.send": "Send media error", "widgets:media:replay.send": "Send media replay", "widgets:alert:replay.send": "Send alert replay", "widgets:alert:skip.send": "Send alert skip", "widgets:messages.subscription": "Subscribe messages", "widgets:goal.subscription": "Subscribe goal", "widgets:settings.subscription": "Subscribe settings", "widgets:auc-fighter:start-match.subscription": "Subscribe start match", "widgets:auc-fighter:pause-match.subscription": "Subscribe pause match", "widgets:auc-fighter:resume-match.subscription": "Subscribe resume match", "widgets:auc-fighter:cancel-match.subscription": "Subscribe cancel match", "widgets:auc-fighter:update-match.subscription": "Subscribe update match", "widgets:auc-fighter:settings.subscription": "Subscribe auc-fighter settings", "widgets:alert:replay.subscription": "Subscribe alert replay", "widgets:alert:skip.subscription": "Subscribe alert skip", "widgets:alert:test.subscription": "Subscribe alert test", "widgets:alert:skip-playing.subscription": "Subscribe alert skip playing", "widgets:alert:alerts.subscription": "Subscribe alerts", "widgets:media:replay.subscription": "Subscribe media replay", "widgets:media:settings.subscription": "Subscribe media settings", "widgets:media:skip.subscription": "Subscribe media skip", "widgets:media:skip-playing-media.subscription": "Subscribe media skip playing", "widgets:media:end.subscription": "Subscribe media end", "widgets:media:error.subscription": "Subscribe media error", "widgets:media:pause.subscription": "Subscribe media pause", "widgets:media:play.subscription": "Subscribe media play", "widgets:alert:played.subscription": "Subscribe alert played", "widgets:storage.read": "Read widget storage", "widgets:storage.write": "Write to widget storage" }, b2 = {
  on: CM,
  off: EM,
  select: PM,
  success: RM,
  ok: TM,
  cancel: $M,
  sound_volume: MM,
  skip_media: AM,
  skip_alert: IM,
  authorization: OM,
  error: NM,
  updater: LM,
  media: DM,
  integration: FM,
  auction: zM,
  maption: jM,
  media_settings: BM,
  dashboard: UM,
  messages: WM,
  message: VM,
  filter: HM,
  settings: qM,
  wheel: KM,
  timer: QM,
  fighter: GM,
  lot: YM,
  bid: JM,
  lots: XM,
  auction_settings: ZM,
  lots_options: e2,
  auc_fighter_settings: t2,
  alerts: n2,
  services: r2,
  twitch: i2,
  widy: o2,
  twitch_service_settings: s2,
  alert: a2,
  general: l2,
  goals: u2,
  goal: c2,
  save: d2,
  back: f2,
  widget: p2,
  view: h2,
  image: g2,
  text: m2,
  audio: y2,
  version: v2,
  widgets: w2,
  scopes: S2
}, _2 = "Encendido", x2 = "Apagado", k2 = "Seleccionar", C2 = "Éxito", E2 = "Aceptar", P2 = "Cancelar", R2 = "Volumen del sonido", T2 = "Atajo para saltar medio", $2 = "Atajo para saltar alerta", M2 = { title: "Autorización", code: "Solicitar código", sign_in: "Iniciar sesión", phone: "Número de teléfono", telegram_code: "Código de Telegram", your_code: "Tu código", "2fa_password": "Contraseña 2FA", password: "Contraseña", streamelements: "Primero necesitas conectar con StreamElements JWT", you_can_find_by_url: "Puedes encontrarlo en esta URL", set_id_and_jwt: "Necesitas configurar el ID de cuenta de StreamElements y el JWT para {{service}}" }, A2 = { wrong_lots_format: "Formato de lotes incorrecto", not_connected: "No conectado", request_error: "Error en la solicitud" }, I2 = { title: "Actualización", description: "Hay una nueva versión de la aplicación disponible. ¿Quieres actualizar?", update: "Actualizar", later: "Más tarde", downloading: "Descargando..." }, O2 = { title: "Medios", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, N2 = { tribute: "Mostrar mensajes de tributo" }, L2 = { lots: "Lotes", wheel: "Ruleta", settings: "Ajustes" }, D2 = { set_point: "Establecer punto", meter_price: "Precio por 1 metro", amount: "Cantidad", finish: "Finalizar", lat_error: "La latitud debe estar entre -90 y 90", lng_error: "La longitud debe estar entre -180 y 180", rules: "Para que el puntero cambie automáticamente de posición en el mensaje, debe haber solo una palabra de:" }, F2 = { enabled: "Activado", min_amount: "Cantidad mínima", video_volume: "Volumen del vídeo", min_views: "Vistas mínimas" }, z2 = { messages: "Mensajes", settings: "Ajustes", services: "Servicios", alerts: "Alertas", media: "Medios", goals: "Metas", auction: "Subasta", maption: "Maption", fighter: "Luchador", widgets: "Widgets", info: "Información" }, j2 = { title: "Últimos mensajes" }, B2 = { skip: "Saltar", replay: "Repetir", donated: "{{user_name}} donó {{amount}}{{currency}}", followed: "{{user_name}} te siguió", subscribed: "{{user_name}} se suscribió", gifted_subscriptions: "{{user_name}} regaló {{total}} suscripciones", raided_with: "{{user_name}} hizo raid con {{viewers}} espectadores" }, U2 = { title: "Filtrar mensajes", exclude_donations: "Excluir donaciones", exclude_follows: "Excluir follows", exclude_subscriptions: "Excluir suscripciones", exclude_raids: "Excluir raids" }, W2 = { title: "Ajustes", pause: "Pausar mensajes de alerta", moderation_duration: "Duración de moderación", black_list: "Lista negra", remove_links: "Eliminar enlaces", language: "Idioma", sec: "Seg", currency: "Moneda", tts_type: "Tipo de TTS" }, V2 = { normal: "Normal", dropout: "Eliminación", spin: "Girar", speed: "Velocidad de la ruleta" }, H2 = { continue: "Continuar", pause: "Pausar", reset: "Reiniciar", add_time: "Añadir tiempo", reduce_time: "Reducir tiempo", add_timex2: "Añadir tiempo x2" }, q2 = { title: "Luchador", match: "Combate", final: "Final", game: "Partida", cancel: "Cancelar partida", winner: "Ganador", settings: "Ajustes", create_game: "Crear partida desde lotes", start: "Iniciar", pause: "Pausar", rematch: "Revancha", resume: "Reanudar" }, K2 = { name: "Nombre", delete: "Eliminar", add: "Añadir cantidad" }, Q2 = { delete: "Eliminar", to_lot: "Al lote", new: "Nuevo", add_to_random_slot: "Añadir a lote aleatorio" }, G2 = { add: "Añadir", new_lot_name: "Nombre del nuevo lote", search: "Buscar lote", total: "Total" }, Y2 = { leader_change: "Cambio de líder", new_lot: "Nuevo lote", new_donation: "Nueva donación", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar suma total", greater_timer_adding_time: "Añadir tiempo al temporizador mayor", not_add_time_if: "No añadir tiempo si", adding_time: "Tiempo" }, J2 = { import_lots: "Importar lotes", clear_lots: "Borrar lotes" }, X2 = { round_duration: "Duración de la ronda", add_players: "Añadir jugadores" }, Z2 = { title: "Alertas", group: "Grupo" }, eA = { title: "Servicios", tribute: "Tributo", streamelements: "StreamElements", connect: "Conectar", integrations: "Integraciones", sign_out: "Cerrar sesión", confirm_sign_out: "¿Estás seguro de que quieres cerrar sesión de este servicio?" }, tA = { device_code_expired: "El código del dispositivo ha expirado. Por favor, inténtalo de nuevo.", user_code: "Código de usuario", authorize_with_code: "Autorizar con código", waiting_authorization: "Esperando autorización..." }, nA = { donation_account_name: "Nombre de la cuenta de donaciones", donation_url: "URL de donación", create_donation_account: "Crear cuenta de donaciones de Widy", connect_to_existing_account: "Conectar a cuenta existente", create_donation_account_pending: "Creando cuenta de donaciones..." }, rA = { title: "Ajustes de Twitch", points_currency_ratio: "Ratio de puntos a moneda", rewards_name: "Nombre de recompensas", rewards_list: "Lista de recompensas", add_reward: "Añadir recompensa", cost: "Coste", color: "Color" }, iA = { image: "Imagen", audio: "Audio", view: "Vista", title: "Título", message: "Mensaje", test_name: "Prueba", test_text: "¡Esta es una alerta de prueba!", configure: "Configurar", test: "Probar", add_new_variant: "Añadir nueva variante", new_variant: "Nueva variante", variant_title: "Título de la variante", variant_group: "Grupo de la variante", status: "Estado", variation_condition: "Condición de variación", group: "Grupo", Random: "Aleatorio", AmountIsGreater: "La cantidad es mayor", AmountIsEqual: "La cantidad es igual", delete: "Eliminar", sure_delete: "¿Estás seguro de que quieres eliminar esta variación?", type: "Tipo", Donation: "Donación", Subscription: "Suscripción", Follow: "Follow", Raid: "Raid" }, oA = "General", sA = { title: "Metas", create: "Crear nueva meta" }, aA = { new: "Nueva meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progreso", goal_title: "Título de la meta", amount_raise: "Cantidad a recaudar", start_raising: "Comenzar recaudación desde", end_date: "Fecha de finalización de la meta", bar_height: "Altura de la barra", rounding_radius: "Radio de redondeo", bar_stroke_thickness: "Grosor del borde de la barra", background_bar_color: "Color de la barra de fondo", progress_bar_color: "Color de la barra de progreso", goal_progress_bar: "Barra de progreso de la meta", progress_bar_layout: "Diseño de la barra de progreso", remaining_time: "Tiempo restante", goal_amount_limits: "Límites de cantidad de la meta", widget_background: "Fondo del widget", background_color: "Color de fondo", OnTop: "Encima", Inside: "Dentro", Below: "Debajo", DoNotDisplay: "No mostrar", title: "Título", limits: "límites", raised: "Recaudado", days_left: "Días restantes", finish_goal: "Finalizar meta", sure_finish: "¿Estás seguro de que quieres finalizar esta meta?", Donation: "Donación", TwitchSubscription: "Suscripción de Twitch", TwitchFollow: "Follow de Twitch", goal_not_finished: "Ya tienes una meta sin finalizar de este tipo." }, lA = "Guardar", uA = "Atrás", cA = { copy: "Copiar", launch: "Lanzar", url: "URL del widget", obs_dock_url: "URL de OBS Dock" }, dA = { top: "Imagen arriba, texto abajo", bottom: "Imagen abajo, texto arriba", left: "Imagen a la izquierda, texto a la derecha", right: "Imagen a la derecha, texto a la izquierda", overlay: "Texto superpuesto sobre la imagen" }, fA = { show: "Mostrar imagen" }, pA = { font: "Fuente", font_size: "Tamaño de fuente", text_color: "Color del texto", bold: "Negrita", italics: "Cursiva", underline: "Subrayado", transformation: "Transformación", letter_spacing: "Espaciado entre letras", word_spacing: "Espaciado entre palabras", horizontal_alignment: "Alineación horizontal", vertical_alignment: "Alineación vertical", text_preview: "¡Esta es una vista previa!", name: "Nombre" }, hA = { play: "Reproducir", stop: "Detener" }, gA = "Versión", mA = { title: "Widgets", add: "Añadir widget", install: "Instalar", delete: "Eliminar", installed: "Instalados", all: "Todos", settings: "Ajustes", control: "Control", delete_confirm: "¿Estás seguro de que quieres eliminar este widget?", invalid_manifest: "Manifiesto del widget inválido", add_confirm: "Añadir permitirá a {{widget_name}}:", installing: "Instalando...", view_url: "Ver URL" }, yA = { "widgets:messages.read": "Leer mensajes", "widgets:goals.read": "Leer metas", "widgets:auc-fighter:settings.read": "Leer ajustes de auc-fighter", "widgets:settings.read": "Leer ajustes del widget", "widgets:alerts.read": "Leer alertas", "widgets:media:settings.read": "Leer ajustes de medios", "widgets:auc-fighter:match-playing.send": "Enviar combate en curso", "widgets:auc-fighter:match-winner.send": "Enviar ganador del combate", "widgets:auc-fighter:match-paused.send": "Enviar combate pausado", "widgets:auc-fighter:match-id.send": "Enviar ID del combate", "widgets:alert:played.send": "Enviar alerta reproducida", "widgets:alert:playing.send": "Enviar alerta en reproducción", "widgets:media:played.send": "Enviar medio reproducido", "widgets:media:end.send": "Enviar fin de medio", "widgets:media:playing.send": "Enviar medio en reproducción", "widgets:media:paused.send": "Enviar medio pausado", "widgets:media:error.send": "Enviar error de medio", "widgets:media:replay.send": "Enviar repetición de medio", "widgets:alert:replay.send": "Enviar repetición de alerta", "widgets:alert:skip.send": "Enviar salto de alerta", "widgets:messages.subscription": "Suscribirse a mensajes", "widgets:goal.subscription": "Suscribirse a metas", "widgets:settings.subscription": "Suscribirse a ajustes", "widgets:auc-fighter:start-match.subscription": "Suscribirse al inicio de combate", "widgets:auc-fighter:pause-match.subscription": "Suscribirse a pausa de combate", "widgets:auc-fighter:resume-match.subscription": "Suscribirse a reanudación de combate", "widgets:auc-fighter:cancel-match.subscription": "Suscribirse a cancelación de combate", "widgets:auc-fighter:update-match.subscription": "Suscribirse a actualización de combate", "widgets:auc-fighter:settings.subscription": "Suscribirse a ajustes de auc-fighter", "widgets:alert:replay.subscription": "Suscribirse a repetición de alerta", "widgets:alert:skip.subscription": "Suscribirse a salto de alerta", "widgets:alert:test.subscription": "Suscribirse a prueba de alerta", "widgets:alert:skip-playing.subscription": "Suscribirse a salto de alerta en reproducción", "widgets:alert:alerts.subscription": "Suscribirse a alertas", "widgets:media:replay.subscription": "Suscribirse a repetición de medio", "widgets:media:settings.subscription": "Suscribirse a ajustes de medios", "widgets:media:skip.subscription": "Suscribirse a salto de medio", "widgets:media:skip-playing-media.subscription": "Suscribirse a salto de medio en reproducción", "widgets:media:end.subscription": "Suscribirse al fin de medio", "widgets:media:error.subscription": "Suscribirse a error de medio", "widgets:media:pause.subscription": "Suscribirse a pausa de medio", "widgets:media:play.subscription": "Suscribirse a reproducción de medio", "widgets:alert:played.subscription": "Suscribirse a alerta reproducida", "widgets:storage.read": "Leer almacenamiento del widget", "widgets:storage.write": "Escribir en el almacenamiento del widget" }, vA = {
  on: _2,
  off: x2,
  select: k2,
  success: C2,
  ok: E2,
  cancel: P2,
  sound_volume: R2,
  skip_media: T2,
  skip_alert: $2,
  authorization: M2,
  error: A2,
  updater: I2,
  media: O2,
  integration: N2,
  auction: L2,
  maption: D2,
  media_settings: F2,
  dashboard: z2,
  messages: j2,
  message: B2,
  filter: U2,
  settings: W2,
  wheel: V2,
  timer: H2,
  fighter: q2,
  lot: K2,
  bid: Q2,
  lots: G2,
  auction_settings: Y2,
  lots_options: J2,
  auc_fighter_settings: X2,
  alerts: Z2,
  services: eA,
  twitch: tA,
  widy: nA,
  twitch_service_settings: rA,
  alert: iA,
  general: oA,
  goals: sA,
  goal: aA,
  save: lA,
  back: uA,
  widget: cA,
  view: dA,
  image: fA,
  text: pA,
  audio: hA,
  version: gA,
  widgets: mA,
  scopes: yA
}, wA = "Activé", SA = "Désactivé", bA = "Sélectionner", _A = "Succès", xA = "Ok", kA = "Annuler", CA = "Volume du son", EA = "Raccourci pour passer le média", PA = "Raccourci pour passer l'alerte", RA = { title: "Autorisation", code: "Demander un code", sign_in: "Se connecter", phone: "Numéro de téléphone", telegram_code: "Code de Telegram", your_code: "Votre code", "2fa_password": "Mot de passe 2FA", password: "Mot de passe", streamelements: "Vous devez d'abord connecter StreamElements avec un JWT", you_can_find_by_url: "Vous pouvez le trouver à cette URL", set_id_and_jwt: "Vous devez définir l'ID de compte StreamElements et le JWT pour {{service}}" }, TA = { wrong_lots_format: "Format des lots incorrect", not_connected: "Non connecté", request_error: "Erreur de requête" }, $A = { title: "Mise à jour", description: "Une nouvelle version de l'application est disponible. Voulez-vous mettre à jour ?", update: "Mettre à jour", later: "Plus tard", downloading: "Téléchargement en cours..." }, MA = { title: "Média", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, AA = { tribute: "Afficher les messages de tribut" }, IA = { lots: "Lots", wheel: "Roulette", settings: "Paramètres" }, OA = { set_point: "Définir le point", meter_price: "Prix par mètre", amount: "Montant", finish: "Terminer", lat_error: "La latitude doit être comprise entre -90 et 90", lng_error: "La longitude doit être comprise entre -180 et 180", rules: "Pour que le pointeur change automatiquement de position dans le message, il ne doit y avoir qu'un seul mot parmi :" }, NA = { enabled: "Activé", min_amount: "Montant minimum", video_volume: "Volume de la vidéo", min_views: "Vues minimum" }, LA = { messages: "Messages", settings: "Paramètres", services: "Services", alerts: "Alertes", media: "Média", goals: "Objectifs", auction: "Enchères", maption: "Maption", fighter: "Combattant", widgets: "Widgets", info: "Info" }, DA = { title: "Derniers messages" }, FA = { skip: "Passer", replay: "Rejouer", donated: "{{user_name}} a donné {{amount}}{{currency}}", followed: "{{user_name}} s'est abonné", subscribed: "{{user_name}} s'est abonné", gifted_subscriptions: "{{user_name}} a offert {{total}} abonnements", raided_with: "{{user_name}} a raidé avec {{viewers}} viewers" }, zA = { title: "Filtrer les messages", exclude_donations: "Exclure les dons", exclude_follows: "Exclure les follows", exclude_subscriptions: "Exclure les abonnements", exclude_raids: "Exclure les raids" }, jA = { title: "Paramètres", pause: "Mettre en pause les messages d'alerte", moderation_duration: "Durée de modération", black_list: "Liste noire", remove_links: "Supprimer les liens", language: "Langue", sec: "Sec", currency: "Devise", tts_type: "Type de TTS" }, BA = { normal: "Normal", dropout: "Élimination", spin: "Tourner", speed: "Vitesse de la roue" }, UA = { continue: "Continuer", pause: "Pause", reset: "Réinitialiser", add_time: "Ajouter du temps", reduce_time: "Réduire le temps", add_timex2: "Ajouter du temps x2" }, WA = { title: "Combattant", match: "Match", final: "Finale", game: "Partie", cancel: "Annuler la partie", winner: "Gagnant", settings: "Paramètres", create_game: "Créer une partie à partir des lots", start: "Démarrer", pause: "Pause", rematch: "Revanche", resume: "Reprendre" }, VA = { name: "Nom", delete: "Supprimer", add: "Ajouter un montant" }, HA = { delete: "Supprimer", to_lot: "Vers le lot", new: "Nouveau", add_to_random_slot: "Ajouter à un lot aléatoire" }, qA = { add: "Ajouter", new_lot_name: "Nom du nouveau lot", search: "Rechercher un lot", total: "Total" }, KA = { leader_change: "Changement de leader", new_lot: "Nouveau lot", new_donation: "Nouveau don", show_odds: "Afficher les cotes", show_total_sum: "Afficher la somme totale", greater_timer_adding_time: "Ajout de temps pour le timer supérieur", not_add_time_if: "Ne pas ajouter de temps si", adding_time: "Temps" }, QA = { import_lots: "Importer des lots", clear_lots: "Effacer les lots" }, GA = { round_duration: "Durée du round", add_players: "Ajouter des joueurs" }, YA = { title: "Alertes", group: "Groupe" }, JA = { title: "Services", tribute: "Tribute", streamelements: "StreamElements", connect: "Connecter", integrations: "Intégrations", sign_out: "Se déconnecter", confirm_sign_out: "Êtes-vous sûr de vouloir vous déconnecter de ce service ?" }, XA = { device_code_expired: "Code appareil expiré. Veuillez réessayer.", user_code: "Code utilisateur", authorize_with_code: "Autoriser avec le code", waiting_authorization: "En attente d'autorisation..." }, ZA = { donation_account_name: "Nom du compte de dons", donation_url: "URL de don", create_donation_account: "Créer un compte de dons Widy", connect_to_existing_account: "Se connecter à un compte existant", create_donation_account_pending: "Création du compte de dons..." }, eI = { title: "Paramètres Twitch", points_currency_ratio: "Ratio points / devise", rewards_name: "Nom des récompenses", rewards_list: "Liste des récompenses", add_reward: "Ajouter une récompense", cost: "Coût", color: "Couleur" }, tI = { image: "Image", audio: "Audio", view: "Vue", title: "Titre", message: "Message", test_name: "Test", test_text: "Ceci est une alerte de test !", configure: "Configurer", test: "Tester", add_new_variant: "Ajouter une nouvelle variante", new_variant: "Nouvelle variante", variant_title: "Titre de la variante", variant_group: "Groupe de la variante", status: "Statut", variation_condition: "Condition de variation", group: "Groupe", Random: "Aléatoire", AmountIsGreater: "Le montant est supérieur", AmountIsEqual: "Le montant est égal", delete: "Supprimer", sure_delete: "Êtes-vous sûr de vouloir supprimer cette variation ?", type: "Type", Donation: "Don", Subscription: "Abonnement", Follow: "Follow", Raid: "Raid" }, nI = "Général", rI = { title: "Objectifs", create: "Créer un nouvel objectif" }, iI = { new: "Nouvel objectif", goal: "Objectif", type: "Type", elements: "Éléments", progress: "Progression", goal_title: "Titre de l'objectif", amount_raise: "Montant à collecter", start_raising: "Commencer la collecte à partir de", end_date: "Date de fin de l'objectif", bar_height: "Hauteur de la barre", rounding_radius: "Rayon d'arrondi", bar_stroke_thickness: "Épaisseur du contour de la barre", background_bar_color: "Couleur de la barre d'arrière-plan", progress_bar_color: "Couleur de la barre de progression", goal_progress_bar: "Barre de progression de l'objectif", progress_bar_layout: "Disposition de la barre de progression", remaining_time: "Temps restant", goal_amount_limits: "Limites de montant de l'objectif", widget_background: "Arrière-plan du widget", background_color: "Couleur d'arrière-plan", OnTop: "Au-dessus", Inside: "À l'intérieur", Below: "En dessous", DoNotDisplay: "Ne pas afficher", title: "Titre", limits: "limites", raised: "Collecté", days_left: "Jours restants", finish_goal: "Terminer l'objectif", sure_finish: "Êtes-vous sûr de vouloir terminer cet objectif ?", Donation: "Don", TwitchSubscription: "Abonnement Twitch", TwitchFollow: "Follow Twitch", goal_not_finished: "Vous avez un objectif non terminé de ce type." }, oI = "Enregistrer", sI = "Retour", aI = { copy: "Copier", launch: "Lancer", url: "URL du widget", obs_dock_url: "URL du dock OBS" }, lI = { top: "Image en haut, texte en bas", bottom: "Image en bas, texte en haut", left: "Image à gauche, texte à droite", right: "Image à droite, texte à gauche", overlay: "Texte superposé sur l'image" }, uI = { show: "Afficher l'image" }, cI = { font: "Police", font_size: "Taille de police", text_color: "Couleur du texte", bold: "Gras", italics: "Italique", underline: "Souligné", transformation: "Transformation", letter_spacing: "Espacement des lettres", word_spacing: "Espacement des mots", horizontal_alignment: "Alignement horizontal", vertical_alignment: "Alignement vertical", text_preview: "Ceci est un aperçu !", name: "Nom" }, dI = { play: "Jouer", stop: "Arrêter" }, fI = "Version", pI = { title: "Widgets", add: "Ajouter un widget", install: "Installer", delete: "Supprimer", installed: "Installé", all: "Tous", settings: "Paramètres", control: "Contrôle", delete_confirm: "Êtes-vous sûr de vouloir supprimer ce widget ?", invalid_manifest: "Manifeste du widget invalide", add_confirm: "L'ajout permettra à {{widget_name}} de :", installing: "Installation en cours...", view_url: "URL de visualisation" }, hI = { "widgets:messages.read": "Lire les messages", "widgets:goals.read": "Lire les objectifs", "widgets:auc-fighter:settings.read": "Lire les paramètres auc-fighter", "widgets:settings.read": "Lire les paramètres du widget", "widgets:alerts.read": "Lire les alertes", "widgets:media:settings.read": "Lire les paramètres média", "widgets:auc-fighter:match-playing.send": "Envoyer match en cours", "widgets:auc-fighter:match-winner.send": "Envoyer gagnant du match", "widgets:auc-fighter:match-paused.send": "Envoyer match en pause", "widgets:auc-fighter:match-id.send": "Envoyer l'ID du match", "widgets:alert:played.send": "Envoyer alerte jouée", "widgets:alert:playing.send": "Envoyer alerte en cours", "widgets:media:played.send": "Envoyer média joué", "widgets:media:end.send": "Envoyer fin du média", "widgets:media:playing.send": "Envoyer média en cours", "widgets:media:paused.send": "Envoyer média en pause", "widgets:media:error.send": "Envoyer erreur média", "widgets:media:replay.send": "Envoyer relecture média", "widgets:alert:replay.send": "Envoyer relecture alerte", "widgets:alert:skip.send": "Envoyer passer alerte", "widgets:messages.subscription": "S'abonner aux messages", "widgets:goal.subscription": "S'abonner à l'objectif", "widgets:settings.subscription": "S'abonner aux paramètres", "widgets:auc-fighter:start-match.subscription": "S'abonner au démarrage du match", "widgets:auc-fighter:pause-match.subscription": "S'abonner à la pause du match", "widgets:auc-fighter:resume-match.subscription": "S'abonner à la reprise du match", "widgets:auc-fighter:cancel-match.subscription": "S'abonner à l'annulation du match", "widgets:auc-fighter:update-match.subscription": "S'abonner à la mise à jour du match", "widgets:auc-fighter:settings.subscription": "S'abonner aux paramètres auc-fighter", "widgets:alert:replay.subscription": "S'abonner à la relecture d'alerte", "widgets:alert:skip.subscription": "S'abonner au passage d'alerte", "widgets:alert:test.subscription": "S'abonner au test d'alerte", "widgets:alert:skip-playing.subscription": "S'abonner au passage d'alerte en cours", "widgets:alert:alerts.subscription": "S'abonner aux alertes", "widgets:media:replay.subscription": "S'abonner à la relecture média", "widgets:media:settings.subscription": "S'abonner aux paramètres média", "widgets:media:skip.subscription": "S'abonner au passage média", "widgets:media:skip-playing-media.subscription": "S'abonner au passage du média en cours", "widgets:media:end.subscription": "S'abonner à la fin du média", "widgets:media:error.subscription": "S'abonner à l'erreur média", "widgets:media:pause.subscription": "S'abonner à la pause média", "widgets:media:play.subscription": "S'abonner à la lecture média", "widgets:alert:played.subscription": "S'abonner à l'alerte jouée", "widgets:storage.read": "Lire le stockage du widget", "widgets:storage.write": "Écrire dans le stockage du widget" }, gI = {
  on: wA,
  off: SA,
  select: bA,
  success: _A,
  ok: xA,
  cancel: kA,
  sound_volume: CA,
  skip_media: EA,
  skip_alert: PA,
  authorization: RA,
  error: TA,
  updater: $A,
  media: MA,
  integration: AA,
  auction: IA,
  maption: OA,
  media_settings: NA,
  dashboard: LA,
  messages: DA,
  message: FA,
  filter: zA,
  settings: jA,
  wheel: BA,
  timer: UA,
  fighter: WA,
  lot: VA,
  bid: HA,
  lots: qA,
  auction_settings: KA,
  lots_options: QA,
  auc_fighter_settings: GA,
  alerts: YA,
  services: JA,
  twitch: XA,
  widy: ZA,
  twitch_service_settings: eI,
  alert: tI,
  general: nI,
  goals: rI,
  goal: iI,
  save: oI,
  back: sI,
  widget: aI,
  view: lI,
  image: uI,
  text: cI,
  audio: dI,
  version: fI,
  widgets: pI,
  scopes: hI
}, mI = "चालू", yI = "बंद", vI = "चुनें", wI = "सफलता", SI = "ठीक है", bI = "रद्द करें", _I = "ध्वनि की मात्रा", xI = "मीडिया स्किप शॉर्टकट", kI = "अलर्ट स्किप शॉर्टकट", CI = { title: "प्राधिकरण", code: "कोड का अनुरोध करें", sign_in: "साइन इन करें", phone: "फ़ोन नंबर", telegram_code: "टेलीग्राम से कोड", your_code: "आपका कोड", "2fa_password": "2FA पासवर्ड", password: "पासवर्ड", streamelements: "आपको पहले StreamElements JWT से कनेक्ट करना होगा", you_can_find_by_url: "आप इसे इस URL से ढूंढ सकते हैं", set_id_and_jwt: "{{service}} के लिए आपको StreamElements Account ID और JWT सेट करना होगा" }, EI = { wrong_lots_format: "लॉट्स का फॉर्मेट गलत है", not_connected: "कनेक्ट नहीं है", request_error: "अनुरोध में त्रुटि" }, PI = { title: "अपडेट", description: "ऐप का नया वर्जन उपलब्ध है। क्या आप अपडेट करना चाहते हैं?", update: "अपडेट करें", later: "बाद में", downloading: "डाउनलोड हो रहा है..." }, RI = { title: "मीडिया", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, TI = { tribute: "ट्रिब्यूट संदेश दिखाएं" }, $I = { lots: "लॉट्स", wheel: "व्हील", settings: "सेटिंग्स" }, MI = { set_point: "पॉइंट सेट करें", meter_price: "1 मीटर का मूल्य", amount: "राशि", finish: "समाप्त करें", lat_error: "अक्षांश -90 से 90 के बीच होना चाहिए", lng_error: "देशांतर -180 से 180 के बीच होना चाहिए", rules: "पॉइंटर को मैसेज में अपने आप पोजीशन बदलने के लिए केवल एक शब्द होना चाहिए:" }, AI = { enabled: "सक्षम", min_amount: "न्यूनतम राशि", video_volume: "वीडियो वॉल्यूम", min_views: "न्यूनतम व्यूज" }, II = { messages: "संदेश", settings: "सेटिंग्स", services: "सेवाएं", alerts: "अलर्ट्स", media: "मीडिया", goals: "गोल्स", auction: "नीलामी", maption: "मैप्शन", fighter: "फाइटर", widgets: "विजेट्स", info: "जानकारी" }, OI = { title: "अंतिम संदेश" }, NI = { skip: "स्किप करें", replay: "रीप्ले", donated: "{{user_name}} ने {{amount}}{{currency}} दान किया", followed: "{{user_name}} ने फॉलो किया", subscribed: "{{user_name}} ने सब्सक्राइब किया", gifted_subscriptions: "{{user_name}} ने {{total}} सब्सक्रिप्शन गिफ्ट किए", raided_with: "{{user_name}} ने {{viewers}} व्यूअर्स के साथ रेड किया" }, LI = { title: "संदेश फिल्टर करें", exclude_donations: "दान को बाहर करें", exclude_follows: "फॉलो को बाहर करें", exclude_subscriptions: "सब्सक्रिप्शन को बाहर करें", exclude_raids: "रेड्स को बाहर करें" }, DI = { title: "सेटिंग्स", pause: "अलर्ट संदेश रोकें", moderation_duration: "मॉडरेशन अवधि", black_list: "ब्लैक लिस्ट", remove_links: "लिंक्स हटाएं", language: "भाषा", sec: "सेकंड", currency: "मुद्रा", tts_type: "TTS प्रकार" }, FI = { normal: "नॉर्मल", dropout: "ड्रॉपआउट", spin: "स्पिन", speed: "व्हील की स्पीड" }, zI = { continue: "जारी रखें", pause: "रोकें", reset: "रीसेट करें", add_time: "समय जोड़ें", reduce_time: "समय कम करें", add_timex2: "समय x2 जोड़ें" }, jI = { title: "फाइटर", match: "मैच", final: "फाइनल", game: "गेम", cancel: "गेम रद्द करें", winner: "विजेता", settings: "सेटिंग्स", create_game: "लॉट्स से गेम बनाएं", start: "शुरू करें", pause: "रोकें", rematch: "रीमैच", resume: "जारी रखें" }, BI = { name: "नाम", delete: "हटाएं", add: "राशि जोड़ें" }, UI = { delete: "हटाएं", to_lot: "लॉट में", new: "नया", add_to_random_slot: "रैंडम लॉट में जोड़ें" }, WI = { add: "जोड़ें", new_lot_name: "नया लॉट नाम", search: "लॉट खोजें", total: "कुल" }, VI = { leader_change: "लीडर बदलाव", new_lot: "नया लॉट", new_donation: "नया दान", show_odds: "ऑड्स दिखाएं", show_total_sum: "कुल राशि दिखाएं", greater_timer_adding_time: "बड़ा टाइमर समय जोड़ना", not_add_time_if: "समय न जोड़ें अगर", adding_time: "समय" }, HI = { import_lots: "लॉट्स आयात करें", clear_lots: "लॉट्स साफ करें" }, qI = { round_duration: "राउंड अवधि", add_players: "खिलाड़ी जोड़ें" }, KI = { title: "अलर्ट्स", group: "समूह" }, QI = { title: "सेवाएं", tribute: "ट्रिब्यूट", streamelements: "StreamElements", connect: "कनेक्ट करें", integrations: "इंटीग्रेशन", sign_out: "साइन आउट", confirm_sign_out: "क्या आप वाकई इस सेवा से साइन आउट करना चाहते हैं?" }, GI = { device_code_expired: "डिवाइस कोड समाप्त हो गया। कृपया दोबारा प्रयास करें।", user_code: "यूजर कोड", authorize_with_code: "कोड से अधिकृत करें", waiting_authorization: "अधिकृत होने की प्रतीक्षा कर रहा है..." }, YI = { donation_account_name: "दान खाते का नाम", donation_url: "दान URL", create_donation_account: "Widy दान खाता बनाएं", connect_to_existing_account: "मौजूदा खाते से कनेक्ट करें", create_donation_account_pending: "दान खाता बनाया जा रहा है..." }, JI = { title: "Twitch सेटिंग्स", points_currency_ratio: "पॉइंट्स मुद्रा अनुपात", rewards_name: "रिवॉर्ड नाम", rewards_list: "रिवॉर्ड सूची", add_reward: "रिवॉर्ड जोड़ें", cost: "लागत", color: "रंग" }, XI = { image: "छवि", audio: "ऑडियो", view: "दृश्य", title: "शीर्षक", message: "संदेश", test_name: "टेस्ट", test_text: "यह एक टेस्ट अलर्ट है!", configure: "कॉन्फ़िगर करें", test: "टेस्ट", add_new_variant: "नया वैरिएंट जोड़ें", new_variant: "नया वैरिएंट", variant_title: "वैरिएंट शीर्षक", variant_group: "वैरिएंट समूह", status: "स्थिति", variation_condition: "वैरिएशन शर्त", group: "समूह", Random: "रैंडम", AmountIsGreater: "राशि इससे अधिक है", AmountIsEqual: "राशि बराबर है", delete: "हटाएं", sure_delete: "क्या आप वाकई इस वैरिएशन को हटाना चाहते हैं?", type: "प्रकार", Donation: "दान", Subscription: "सब्सक्रिप्शन", Follow: "फॉलो", Raid: "रेड" }, ZI = "सामान्य", eO = { title: "गोल्स", create: "नया गोल बनाएं" }, tO = { new: "नया गोल", goal: "दृश्य", type: "प्रकार", elements: "तत्व", progress: "प्रगति", goal_title: "गोल शीर्षक", amount_raise: "एकत्र करने की राशि", start_raising: "इससे एकत्र करना शुरू करें", end_date: "गोल समाप्ति तिथि", bar_height: "बार की ऊंचाई", rounding_radius: "गोलाई त्रिज्या", bar_stroke_thickness: "बार स्ट्रोक मोटाई", background_bar_color: "बैकग्राउंड बार रंग", progress_bar_color: "प्रगति बार रंग", goal_progress_bar: "गोल प्रगति बार", progress_bar_layout: "प्रगति बार लेआउट", remaining_time: "शेष समय", goal_amount_limits: "गोल राशि सीमाएं", widget_background: "विजेट बैकग्राउंड", background_color: "बैकग्राउंड रंग", OnTop: "ऊपर", Inside: "अंदर", Below: "नीचे", DoNotDisplay: "प्रदर्शित न करें", title: "शीर्षक", limits: "सीमाएं", raised: "एकत्र किया गया", days_left: "बचे दिन", finish_goal: "गोल समाप्त करें", sure_finish: "क्या आप वाकई इस गोल को समाप्त करना चाहते हैं?", Donation: "दान", TwitchSubscription: "Twitch सब्सक्रिप्शन", TwitchFollow: "Twitch फॉलो", goal_not_finished: "इस प्रकार का एक अधूरा गोल अभी भी है।" }, nO = "सेव करें", rO = "वापस", iO = { copy: "कॉपी करें", launch: "लॉन्च करें", url: "विजेट URL", obs_dock_url: "OBS डॉक URL" }, oO = { top: "छवि ऊपर, टेक्स्ट नीचे", bottom: "छवि नीचे, टेक्स्ट ऊपर", left: "छवि बाएं, टेक्स्ट दाएं", right: "छवि दाएं, टेक्स्ट बाएं", overlay: "टेक्स्ट छवि पर ओवरले" }, sO = { show: "छवि दिखाएं" }, aO = { font: "फॉन्ट", font_size: "फॉन्ट साइज", text_color: "टेक्स्ट रंग", bold: "बोल्ड", italics: "इटैलिक", underline: "अंडरलाइन", transformation: "ट्रांसफॉर्मेशन", letter_spacing: "अक्षर स्पेसिंग", word_spacing: "शब्द स्पेसिंग", horizontal_alignment: "क्षैतिज संरेखण", vertical_alignment: "ऊर्ध्वाधर संरेखण", text_preview: "यह एक पूर्वावलोकन है!", name: "नाम" }, lO = { play: "प्ले करें", stop: "रोकें" }, uO = "वर्जन", cO = { title: "विजेट्स", add: "विजेट जोड़ें", install: "इंस्टॉल करें", delete: "हटाएं", installed: "इंस्टॉल किया गया", all: "सभी", settings: "सेटिंग्स", control: "कंट्रोल", delete_confirm: "क्या आप वाकई इस विजेट को हटाना चाहते हैं?", invalid_manifest: "अमान्य विजेट मैनिफेस्ट", add_confirm: "जोड़ने से {{widget_name}} को निम्नलिखित की अनुमति मिलेगी:", installing: "इंस्टॉल हो रहा है...", view_url: "देखने का URL" }, dO = { "widgets:messages.read": "संदेश पढ़ें", "widgets:goals.read": "गोल्स पढ़ें", "widgets:auc-fighter:settings.read": "auc-fighter सेटिंग्स पढ़ें", "widgets:settings.read": "विजेट सेटिंग्स पढ़ें", "widgets:alerts.read": "अलर्ट्स पढ़ें", "widgets:media:settings.read": "मीडिया सेटिंग्स पढ़ें", "widgets:auc-fighter:match-playing.send": "मैच चल रहा है भेजें", "widgets:auc-fighter:match-winner.send": "मैच विजेता भेजें", "widgets:auc-fighter:match-paused.send": "मैच रोका गया भेजें", "widgets:auc-fighter:match-id.send": "मैच ID भेजें", "widgets:alert:played.send": "अलर्ट प्ले किया गया भेजें", "widgets:alert:playing.send": "अलर्ट चल रहा है भेजें", "widgets:media:played.send": "मीडिया प्ले किया गया भेजें", "widgets:media:end.send": "मीडिया समाप्त भेजें", "widgets:media:playing.send": "मीडिया चल रहा है भेजें", "widgets:media:paused.send": "मीडिया रोका गया भेजें", "widgets:media:error.send": "मीडिया त्रुटि भेजें", "widgets:media:replay.send": "मीडिया रीप्ले भेजें", "widgets:alert:replay.send": "अलर्ट रीप्ले भेजें", "widgets:alert:skip.send": "अलर्ट स्किप भेजें", "widgets:messages.subscription": "संदेश सब्सक्राइब करें", "widgets:goal.subscription": "गोल सब्सक्राइब करें", "widgets:settings.subscription": "सेटिंग्स सब्सक्राइब करें", "widgets:auc-fighter:start-match.subscription": "मैच शुरू सब्सक्राइब करें", "widgets:auc-fighter:pause-match.subscription": "मैच रोकना सब्सक्राइब करें", "widgets:auc-fighter:resume-match.subscription": "मैच जारी रखना सब्सक्राइब करें", "widgets:auc-fighter:cancel-match.subscription": "मैच रद्द सब्सक्राइब करें", "widgets:auc-fighter:update-match.subscription": "मैच अपडेट सब्सक्राइब करें", "widgets:auc-fighter:settings.subscription": "auc-fighter सेटिंग्स सब्सक्राइब करें", "widgets:alert:replay.subscription": "अलर्ट रीप्ले सब्सक्राइब करें", "widgets:alert:skip.subscription": "अलर्ट स्किप सब्सक्राइब करें", "widgets:alert:test.subscription": "अलर्ट टेस्ट सब्सक्राइब करें", "widgets:alert:skip-playing.subscription": "अलर्ट स्किप प्लेइंग सब्सक्राइब करें", "widgets:alert:alerts.subscription": "अलर्ट्स सब्सक्राइब करें", "widgets:media:replay.subscription": "मीडिया रीप्ले सब्सक्राइब करें", "widgets:media:settings.subscription": "मीडिया सेटिंग्स सब्सक्राइब करें", "widgets:media:skip.subscription": "मीडिया स्किप सब्सक्राइब करें", "widgets:media:skip-playing-media.subscription": "मीडिया स्किप प्लेइंग सब्सक्राइब करें", "widgets:media:end.subscription": "मीडिया समाप्त सब्सक्राइब करें", "widgets:media:error.subscription": "मीडिया त्रुटि सब्सक्राइब करें", "widgets:media:pause.subscription": "मीडिया रोकना सब्सक्राइब करें", "widgets:media:play.subscription": "मीडिया प्ले सब्सक्राइब करें", "widgets:alert:played.subscription": "अलर्ट प्ले किया गया सब्सक्राइब करें", "widgets:storage.read": "विजेट स्टोरेज पढ़ें", "widgets:storage.write": "विजेट स्टोरेज में लिखें" }, fO = {
  on: mI,
  off: yI,
  select: vI,
  success: wI,
  ok: SI,
  cancel: bI,
  sound_volume: _I,
  skip_media: xI,
  skip_alert: kI,
  authorization: CI,
  error: EI,
  updater: PI,
  media: RI,
  integration: TI,
  auction: $I,
  maption: MI,
  media_settings: AI,
  dashboard: II,
  messages: OI,
  message: NI,
  filter: LI,
  settings: DI,
  wheel: FI,
  timer: zI,
  fighter: jI,
  lot: BI,
  bid: UI,
  lots: WI,
  auction_settings: VI,
  lots_options: HI,
  auc_fighter_settings: qI,
  alerts: KI,
  services: QI,
  twitch: GI,
  widy: YI,
  twitch_service_settings: JI,
  alert: XI,
  general: ZI,
  goals: eO,
  goal: tO,
  save: nO,
  back: rO,
  widget: iO,
  view: oO,
  image: sO,
  text: aO,
  audio: lO,
  version: uO,
  widgets: cO,
  scopes: dO
}, pO = "Ativado", hO = "Desativado", gO = "Selecionar", mO = "Sucesso", yO = "Ok", vO = "Cancelar", wO = "Volume do som", SO = "Atalho para pular mídia", bO = "Atalho para pular alerta", _O = { title: "Autorização", code: "Solicitar código", sign_in: "Entrar", phone: "Número de telefone", telegram_code: "Código do Telegram", your_code: "Seu código", "2fa_password": "Senha 2FA", password: "Senha", streamelements: "Você precisa conectar com o StreamElements JWT primeiro", you_can_find_by_url: "Você pode encontrar em esta URL", set_id_and_jwt: "Você precisa definir o ID da conta StreamElements e o JWT para {{service}}" }, xO = { wrong_lots_format: "Formato de lotes incorreto", not_connected: "Não conectado", request_error: "Erro na solicitação" }, kO = { title: "Atualização", description: "Uma nova versão do aplicativo está disponível. Deseja atualizar?", update: "Atualizar", later: "Mais tarde", downloading: "Baixando..." }, CO = { title: "Mídia", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, EO = { tribute: "Mostrar mensagens de tributo" }, PO = { lots: "Lotes", wheel: "Roda", settings: "Configurações" }, RO = { set_point: "Definir ponto", meter_price: "Preço por 1 metro", amount: "Quantidade", finish: "Finalizar", lat_error: "A latitude deve estar entre -90 e 90", lng_error: "A longitude deve estar entre -180 e 180", rules: "Para o ponteiro mudar automaticamente de posição na mensagem, deve haver apenas uma palavra de:" }, TO = { enabled: "Ativado", min_amount: "Valor mínimo", video_volume: "Volume do vídeo", min_views: "Visualizações mínimas" }, $O = { messages: "Mensagens", settings: "Configurações", services: "Serviços", alerts: "Alertas", media: "Mídia", goals: "Metas", auction: "Leilão", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Informações" }, MO = { title: "Últimas mensagens" }, AO = { skip: "Pular", replay: "Reproduzir novamente", donated: "{{user_name}} doou {{amount}}{{currency}}", followed: "{{user_name}} seguiu", subscribed: "{{user_name}} assinou", gifted_subscriptions: "{{user_name}} presenteou {{total}} assinaturas", raided_with: "{{user_name}} invadiu com {{viewers}} espectadores" }, IO = { title: "Filtrar mensagens", exclude_donations: "Excluir doações", exclude_follows: "Excluir seguidores", exclude_subscriptions: "Excluir assinaturas", exclude_raids: "Excluir raids" }, OO = { title: "Configurações", pause: "Pausar mensagens de alerta", moderation_duration: "Duração da moderação", black_list: "Lista negra", remove_links: "Remover links", language: "Idioma", sec: "Seg", currency: "Moeda", tts_type: "Tipo de TTS" }, NO = { normal: "Normal", dropout: "Eliminação", spin: "Girar", speed: "Velocidade da roda" }, LO = { continue: "Continuar", pause: "Pausar", reset: "Reiniciar", add_time: "Adicionar tempo", reduce_time: "Reduzir tempo", add_timex2: "Adicionar tempo x2" }, DO = { title: "Fighter", match: "Partida", final: "Final", game: "Jogo", cancel: "Cancelar jogo", winner: "Vencedor", settings: "Configurações", create_game: "Criar jogo a partir dos lotes", start: "Iniciar", pause: "Pausar", rematch: "Revanche", resume: "Retomar" }, FO = { name: "Nome", delete: "Excluir", add: "Adicionar quantidade" }, zO = { delete: "Excluir", to_lot: "Para o lote", new: "Novo", add_to_random_slot: "Adicionar a um lote aleatório" }, jO = { add: "Adicionar", new_lot_name: "Nome do novo lote", search: "Buscar lote", total: "Total" }, BO = { leader_change: "Mudança de líder", new_lot: "Novo lote", new_donation: "Nova doação", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar soma total", greater_timer_adding_time: "Maior tempo de adição do timer", not_add_time_if: "Não adicionar tempo se", adding_time: "Tempo" }, UO = { import_lots: "Importar lotes", clear_lots: "Limpar lotes" }, WO = { round_duration: "Duração da rodada", add_players: "Adicionar jogadores" }, VO = { title: "Alertas", group: "Grupo" }, HO = { title: "Serviços", tribute: "Tributo", streamelements: "StreamElements", connect: "Conectar", integrations: "Integrações", sign_out: "Sair", confirm_sign_out: "Tem certeza que deseja sair deste serviço?" }, qO = { device_code_expired: "Código do dispositivo expirado. Por favor, tente novamente.", user_code: "Código do usuário", authorize_with_code: "Autorizar com código", waiting_authorization: "Aguardando autorização..." }, KO = { donation_account_name: "Nome da conta de doações", donation_url: "URL de doação", create_donation_account: "Criar conta de doação Widy", connect_to_existing_account: "Conectar a uma conta existente", create_donation_account_pending: "Criando conta de doação..." }, QO = { title: "Configurações do Twitch", points_currency_ratio: "Taxa de conversão de pontos para moeda", rewards_name: "Nome das recompensas", rewards_list: "Lista de recompensas", add_reward: "Adicionar recompensa", cost: "Custo", color: "Cor" }, GO = { image: "Imagem", audio: "Áudio", view: "Visualização", title: "Título", message: "Mensagem", test_name: "Teste", test_text: "Este é um alerta de teste!", configure: "Configurar", test: "Testar", add_new_variant: "Adicionar nova variante", new_variant: "Nova variante", variant_title: "Título da variante", variant_group: "Grupo da variante", status: "Status", variation_condition: "Condição da variação", group: "Grupo", Random: "Aleatório", AmountIsGreater: "Valor é maior que", AmountIsEqual: "Valor é igual a", delete: "Excluir", sure_delete: "Tem certeza que deseja excluir esta variação?", type: "Tipo", Donation: "Doação", Subscription: "Assinatura", Follow: "Seguidor", Raid: "Raid" }, YO = "Geral", JO = { title: "Metas", create: "Criar nova meta" }, XO = { new: "Nova meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progresso", goal_title: "Título da meta", amount_raise: "Valor a ser arrecadado", start_raising: "Começar a arrecadar a partir de", end_date: "Data de término da meta", bar_height: "Altura da barra", rounding_radius: "Raio de arredondamento", bar_stroke_thickness: "Espessura do traço da barra", background_bar_color: "Cor da barra de fundo", progress_bar_color: "Cor da barra de progresso", goal_progress_bar: "Barra de progresso da meta", progress_bar_layout: "Layout da barra de progresso", remaining_time: "Tempo restante", goal_amount_limits: "Limites de valor da meta", widget_background: "Fundo do widget", background_color: "Cor de fundo", OnTop: "Acima", Inside: "Dentro", Below: "Abaixo", DoNotDisplay: "Não exibir", title: "Título", limits: "limites", raised: "Arrecadado", days_left: "Dias restantes", finish_goal: "Finalizar meta", sure_finish: "Tem certeza que deseja finalizar esta meta?", Donation: "Doação", TwitchSubscription: "Assinatura Twitch", TwitchFollow: "Seguidor Twitch", goal_not_finished: "Você tem uma meta não finalizada deste tipo." }, ZO = "Salvar", eN = "Voltar", tN = { copy: "Copiar", launch: "Iniciar", url: "URL do widget", obs_dock_url: "URL do dock OBS" }, nN = { top: "Imagem acima, texto abaixo", bottom: "Imagem abaixo, texto acima", left: "Imagem à esquerda, texto à direita", right: "Imagem à direita, texto à esquerda", overlay: "Texto sobreposto na imagem" }, rN = { show: "Mostrar imagem" }, iN = { font: "Fonte", font_size: "Tamanho da fonte", text_color: "Cor do texto", bold: "Negrito", italics: "Itálico", underline: "Sublinhado", transformation: "Transformação", letter_spacing: "Espaçamento entre letras", word_spacing: "Espaçamento entre palavras", horizontal_alignment: "Alinhamento horizontal", vertical_alignment: "Alinhamento vertical", text_preview: "Esta é uma prévia!", name: "Nome" }, oN = { play: "Reproduzir", stop: "Parar" }, sN = "Versão", aN = { title: "Widgets", add: "Adicionar widget", install: "Instalar", delete: "Excluir", installed: "Instalado", all: "Todos", settings: "Configurações", control: "Controle", delete_confirm: "Tem certeza que deseja excluir este widget?", invalid_manifest: "Manifesto do widget inválido", add_confirm: "Adicionar permitirá que {{widget_name}}:", installing: "Instalando...", view_url: "URL de visualização" }, lN = { "widgets:messages.read": "Ler mensagens", "widgets:goals.read": "Ler metas", "widgets:auc-fighter:settings.read": "Ler configurações do auc-fighter", "widgets:settings.read": "Ler configurações do widget", "widgets:alerts.read": "Ler alertas", "widgets:media:settings.read": "Ler configurações de mídia", "widgets:auc-fighter:match-playing.send": "Enviar partida em andamento", "widgets:auc-fighter:match-winner.send": "Enviar vencedor da partida", "widgets:auc-fighter:match-paused.send": "Enviar partida pausada", "widgets:auc-fighter:match-id.send": "Enviar ID da partida", "widgets:alert:played.send": "Enviar alerta reproduzido", "widgets:alert:playing.send": "Enviar alerta em reprodução", "widgets:media:played.send": "Enviar mídia reproduzida", "widgets:media:end.send": "Enviar fim da mídia", "widgets:media:playing.send": "Enviar mídia em reprodução", "widgets:media:paused.send": "Enviar mídia pausada", "widgets:media:error.send": "Enviar erro na mídia", "widgets:media:replay.send": "Enviar repetição da mídia", "widgets:alert:replay.send": "Enviar repetição do alerta", "widgets:alert:skip.send": "Enviar pulo de alerta", "widgets:messages.subscription": "Inscrever-se em mensagens", "widgets:goal.subscription": "Inscrever-se em metas", "widgets:settings.subscription": "Inscrever-se em configurações", "widgets:auc-fighter:start-match.subscription": "Inscrever-se no início da partida", "widgets:auc-fighter:pause-match.subscription": "Inscrever-se na pausa da partida", "widgets:auc-fighter:resume-match.subscription": "Inscrever-se na retomada da partida", "widgets:auc-fighter:cancel-match.subscription": "Inscrever-se no cancelamento da partida", "widgets:auc-fighter:update-match.subscription": "Inscrever-se na atualização da partida", "widgets:auc-fighter:settings.subscription": "Inscrever-se nas configurações do auc-fighter", "widgets:alert:replay.subscription": "Inscrever-se na repetição do alerta", "widgets:alert:skip.subscription": "Inscrever-se no pulo do alerta", "widgets:alert:test.subscription": "Inscrever-se no teste de alerta", "widgets:alert:skip-playing.subscription": "Inscrever-se no pulo de alerta em reprodução", "widgets:alert:alerts.subscription": "Inscrever-se em alertas", "widgets:media:replay.subscription": "Inscrever-se na repetição da mídia", "widgets:media:settings.subscription": "Inscrever-se nas configurações de mídia", "widgets:media:skip.subscription": "Inscrever-se no pulo de mídia", "widgets:media:skip-playing-media.subscription": "Inscrever-se no pulo de mídia em reprodução", "widgets:media:end.subscription": "Inscrever-se no fim da mídia", "widgets:media:error.subscription": "Inscrever-se no erro da mídia", "widgets:media:pause.subscription": "Inscrever-se na pausa da mídia", "widgets:media:play.subscription": "Inscrever-se na reprodução da mídia", "widgets:alert:played.subscription": "Inscrever-se em alerta reproduzido", "widgets:storage.read": "Ler armazenamento do widget", "widgets:storage.write": "Escrever no armazenamento do widget" }, uN = {
  on: pO,
  off: hO,
  select: gO,
  success: mO,
  ok: yO,
  cancel: vO,
  sound_volume: wO,
  skip_media: SO,
  skip_alert: bO,
  authorization: _O,
  error: xO,
  updater: kO,
  media: CO,
  integration: EO,
  auction: PO,
  maption: RO,
  media_settings: TO,
  dashboard: $O,
  messages: MO,
  message: AO,
  filter: IO,
  settings: OO,
  wheel: NO,
  timer: LO,
  fighter: DO,
  lot: FO,
  bid: zO,
  lots: jO,
  auction_settings: BO,
  lots_options: UO,
  auc_fighter_settings: WO,
  alerts: VO,
  services: HO,
  twitch: qO,
  widy: KO,
  twitch_service_settings: QO,
  alert: GO,
  general: YO,
  goals: JO,
  goal: XO,
  save: ZO,
  back: eN,
  widget: tN,
  view: nN,
  image: rN,
  text: iN,
  audio: oN,
  version: sN,
  widgets: aN,
  scopes: lN
}, cN = "Вкл", dN = "Выкл", fN = "Выбрать", pN = "Успешно", hN = "Ок", gN = "Отмена", mN = "Громкость звука", yN = "Сокращение пропуска медиа", vN = "Сокращение пропуска алерта", wN = { title: "Авторизация", code: "Запросить код", sign_in: "Войти", phone: "Номер телефона", telegram_code: "Код из Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Сначала нужно подключить StreamElements JWT", you_can_find_by_url: "Вы можете найти его по этой ссылке", set_id_and_jwt: "Нужно установить StreamElements Account ID и JWT для {{service}}" }, SN = { wrong_lots_format: "Неверный формат лотов", not_connected: "Не подключено", request_error: "Ошибка запроса" }, bN = { title: "Обновление", description: "Доступна новая версия приложения. Хотите обновить?", update: "Обновить", later: "Позже", downloading: "Загрузка..." }, _N = { title: "Медиа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, xN = { tribute: "Показывать tribute-сообщения" }, kN = { lots: "Лоты", wheel: "Колесо", settings: "Настройки" }, CN = { set_point: "Установить точку", meter_price: "Цена за 1 метр", amount: "Сумма", finish: "Завершить", lat_error: "Широта должна быть от -90 до 90", lng_error: "Долгота должна быть от -180 до 180", rules: "Для автоматического изменения позиции указателя в сообщении должно быть только одно слово из:" }, EN = { enabled: "Включено", min_amount: "Минимальная сумма", video_volume: "Громкость видео", min_views: "Минимальное количество просмотров" }, PN = { messages: "Сообщения", settings: "Настройки", services: "Сервисы", alerts: "Алерты", media: "Медиа", goals: "Цели", auction: "Аукцион", maption: "Maption", fighter: "Файтер", widgets: "Виджеты", info: "Инфо" }, RN = { title: "Последние сообщения" }, TN = { skip: "Пропустить", replay: "Повторить", donated: "{{user_name}} задонатил {{amount}}{{currency}}", followed: "{{user_name}} подписался", subscribed: "{{user_name}} оформил подписку", gifted_subscriptions: "{{user_name}} подарил {{total}} подписок", raided_with: "{{user_name}} зарейдил с {{viewers}} зрителями" }, $N = { title: "Фильтр сообщений", exclude_donations: "Исключить донаты", exclude_follows: "Исключить фолловы", exclude_subscriptions: "Исключить подписки", exclude_raids: "Исключить рейды" }, MN = { title: "Настройки", pause: "Приостановить алерт-сообщения", moderation_duration: "Длительность модерации", black_list: "Чёрный список", remove_links: "Удалять ссылки", language: "Язык", sec: "Сек", currency: "Валюта", tts_type: "Тип TTS" }, AN = { normal: "Обычное", dropout: "Выпадение", spin: "Крутить", speed: "Скорость колеса" }, IN = { continue: "Продолжить", pause: "Пауза", reset: "Сбросить", add_time: "Добавить время", reduce_time: "Уменьшить время", add_timex2: "Добавить время ×2" }, ON = { title: "Файтер", match: "Матч", final: "Финал", game: "Игра", cancel: "Отменить игру", winner: "Победитель", settings: "Настройки", create_game: "Создать игру из лотов", start: "Начать", pause: "Пауза", rematch: "Реванш", resume: "Возобновить" }, NN = { name: "Название", delete: "Удалить", add: "Добавить сумму" }, LN = { delete: "Удалить", to_lot: "К лоту", new: "Новый", add_to_random_slot: "Добавить в случайный лот" }, DN = { add: "Добавить", new_lot_name: "Название нового лота", search: "Поиск лота", total: "Итого" }, FN = { leader_change: "Смена лидера", new_lot: "Новый лот", new_donation: "Новый донат", show_odds: "Показывать шансы", show_total_sum: "Показывать общую сумму", greater_timer_adding_time: "Добавление времени при большем таймере", not_add_time_if: "Не добавлять время если", adding_time: "Время" }, zN = { import_lots: "Импортировать лоты", clear_lots: "Очистить лоты" }, jN = { round_duration: "Длительность раунда", add_players: "Добавить игроков" }, BN = { title: "Алерты", group: "Группа" }, UN = { title: "Сервисы", tribute: "Tribute", streamelements: "Streamelements", connect: "Подключить", integrations: "Интеграции", sign_out: "Выйти", confirm_sign_out: "Вы уверены, что хотите выйти из этого сервиса?" }, WN = { device_code_expired: "Срок действия кода устройства истёк. Попробуйте снова.", user_code: "Код пользователя", authorize_with_code: "Авторизоваться по коду", waiting_authorization: "Ожидание авторизации..." }, VN = { donation_account_name: "Название донат-аккаунта", donation_url: "URL доната", create_donation_account: "Создать донат-аккаунт Widy", connect_to_existing_account: "Подключиться к существующему аккаунту", create_donation_account_pending: "Создание донат-аккаунта..." }, HN = { title: "Настройки Twitch", points_currency_ratio: "Соотношение баллов к валюте", rewards_name: "Название наград", rewards_list: "Список наград", add_reward: "Добавить награду", cost: "Стоимость", color: "Цвет" }, qN = { image: "Изображение", audio: "Аудио", view: "Вид", title: "Заголовок", message: "Сообщение", test_name: "Тест", test_text: "Это тестовый алерт!", configure: "Настроить", test: "Протестировать", add_new_variant: "Добавить новый вариант", new_variant: "Новый вариант", variant_title: "Название варианта", variant_group: "Группа варианта", status: "Статус", variation_condition: "Условие вариации", group: "Группа", Random: "Случайный", AmountIsGreater: "Сумма больше", AmountIsEqual: "Сумма равна", delete: "Удалить", sure_delete: "Вы уверены, что хотите удалить эту вариацию?", type: "Тип", Donation: "Донат", Subscription: "Подписка", Follow: "Подписка (фоллов)", Raid: "Рейд" }, KN = "Общее", QN = { title: "Цели", create: "Создать новую цель" }, GN = { new: "Новая цель", goal: "Цель", type: "Тип", elements: "Элементы", progress: "Прогресс", goal_title: "Название цели", amount_raise: "Сумма для сбора", start_raising: "Начинать сбор с", end_date: "Дата окончания цели", bar_height: "Высота бара", rounding_radius: "Радиус скругления", bar_stroke_thickness: "Толщина обводки бара", background_bar_color: "Цвет фона бара", progress_bar_color: "Цвет прогресс-бара", goal_progress_bar: "Прогресс-бар цели", progress_bar_layout: "Расположение прогресс-бара", remaining_time: "Оставшееся время", goal_amount_limits: "Лимиты суммы цели", widget_background: "Фон виджета", background_color: "Цвет фона", OnTop: "Сверху", Inside: "Внутри", Below: "Снизу", DoNotDisplay: "Не отображать", title: "Заголовок", limits: "лимиты", raised: "Собрано", days_left: "Осталось дней", finish_goal: "Завершить цель", sure_finish: "Вы уверены, что хотите завершить эту цель?", Donation: "Донат", TwitchSubscription: "Подписка Twitch", TwitchFollow: "Фоллов Twitch", goal_not_finished: "У вас есть незавершённая цель этого типа." }, YN = "Сохранить", JN = "Назад", XN = { copy: "Копировать", launch: "Запустить", url: "URL виджета", obs_dock_url: "OBS Dock URL" }, ZN = { top: "Изображение сверху, текст снизу", bottom: "Изображение снизу, текст сверху", left: "Изображение слева, текст справа", right: "Изображение справа, текст слева", overlay: "Текст поверх изображения" }, eL = { show: "Показывать изображение" }, tL = { font: "Шрифт", font_size: "Размер шрифта", text_color: "Цвет текста", bold: "Жирный", italics: "Курсив", underline: "Подчёркнутый", transformation: "Трансформация", letter_spacing: "Межбуквенный интервал", word_spacing: "Межсловный интервал", horizontal_alignment: "Горизонтальное выравнивание", vertical_alignment: "Вертикальное выравнивание", text_preview: "Это превью!", name: "Название" }, nL = { play: "Воспроизвести", stop: "Остановить" }, rL = "Версия", iL = { title: "Виджеты", add: "Добавить виджет", install: "Установить", delete: "Удалить", installed: "Установлено", all: "Все", settings: "Настройки", control: "Управление", delete_confirm: "Вы уверены, что хотите удалить этот виджет?", invalid_manifest: "Неверный манифест виджета", add_confirm: "Добавление позволит {{widget_name}}:", installing: "Установка...", view_url: "URL просмотра" }, oL = { "widgets:messages.read": "Читать сообщения", "widgets:goals.read": "Читать цели", "widgets:auc-fighter:settings.read": "Читать настройки auc-fighter", "widgets:settings.read": "Читать настройки виджета", "widgets:alerts.read": "Читать алерты", "widgets:media:settings.read": "Читать настройки медиа", "widgets:auc-fighter:match-playing.send": "Отправлять статус матча (играется)", "widgets:auc-fighter:match-winner.send": "Отправлять победителя матча", "widgets:auc-fighter:match-paused.send": "Отправлять статус матча (пауза)", "widgets:auc-fighter:match-id.send": "Отправлять ID матча", "widgets:alert:played.send": "Отправлять алерт воспроизведён", "widgets:alert:playing.send": "Отправлять алерт проигрывается", "widgets:media:played.send": "Отправлять медиа воспроизведено", "widgets:media:end.send": "Отправлять окончание медиа", "widgets:media:playing.send": "Отправлять медиа проигрывается", "widgets:media:paused.send": "Отправлять медиа на паузе", "widgets:media:error.send": "Отправлять ошибку медиа", "widgets:media:replay.send": "Отправлять повтор медиа", "widgets:alert:replay.send": "Отправлять повтор алерта", "widgets:alert:skip.send": "Отправлять пропуск алерта", "widgets:messages.subscription": "Подписка на сообщения", "widgets:goal.subscription": "Подписка на цель", "widgets:settings.subscription": "Подписка на настройки", "widgets:auc-fighter:start-match.subscription": "Подписка на начало матча", "widgets:auc-fighter:pause-match.subscription": "Подписка на паузу матча", "widgets:auc-fighter:resume-match.subscription": "Подписка на возобновление матча", "widgets:auc-fighter:cancel-match.subscription": "Подписка на отмену матча", "widgets:auc-fighter:update-match.subscription": "Подписка на обновление матча", "widgets:auc-fighter:settings.subscription": "Подписка на настройки auc-fighter", "widgets:alert:replay.subscription": "Подписка на повтор алерта", "widgets:alert:skip.subscription": "Подписка на пропуск алерта", "widgets:alert:test.subscription": "Подписка на тестовый алерт", "widgets:alert:skip-playing.subscription": "Подписка на пропуск проигрываемого алерта", "widgets:alert:alerts.subscription": "Подписка на алерты", "widgets:media:replay.subscription": "Подписка на повтор медиа", "widgets:media:settings.subscription": "Подписка на настройки медиа", "widgets:media:skip.subscription": "Подписка на пропуск медиа", "widgets:media:skip-playing-media.subscription": "Подписка на пропуск проигрываемого медиа", "widgets:media:end.subscription": "Подписка на окончание медиа", "widgets:media:error.subscription": "Подписка на ошибку медиа", "widgets:media:pause.subscription": "Подписка на паузу медиа", "widgets:media:play.subscription": "Подписка на воспроизведение медиа", "widgets:alert:played.subscription": "Подписка на воспроизведённый алерт", "widgets:storage.read": "Читать хранилище виджета", "widgets:storage.write": "Записывать в хранилище виджета" }, sL = {
  on: cN,
  off: dN,
  select: fN,
  success: pN,
  ok: hN,
  cancel: gN,
  sound_volume: mN,
  skip_media: yN,
  skip_alert: vN,
  authorization: wN,
  error: SN,
  updater: bN,
  media: _N,
  integration: xN,
  auction: kN,
  maption: CN,
  media_settings: EN,
  dashboard: PN,
  messages: RN,
  message: TN,
  filter: $N,
  settings: MN,
  wheel: AN,
  timer: IN,
  fighter: ON,
  lot: NN,
  bid: LN,
  lots: DN,
  auction_settings: FN,
  lots_options: zN,
  auc_fighter_settings: jN,
  alerts: BN,
  services: UN,
  twitch: WN,
  widy: VN,
  twitch_service_settings: HN,
  alert: qN,
  general: KN,
  goals: QN,
  goal: GN,
  save: YN,
  back: JN,
  widget: XN,
  view: ZN,
  image: eL,
  text: tL,
  audio: nL,
  version: rL,
  widgets: iL,
  scopes: oL
}, aL = "Увімкнено", lL = "Вимкнено", uL = "Вибрати", cL = "Успіх", dL = "Ок", fL = "Скасувати", pL = "Гучність звуку", hL = "Скорочення пропуску медіа", gL = "Скорочення пропуску сповіщення", mL = { title: "Авторизація", code: "Запитати код", sign_in: "Увійти", phone: "Номер телефону", telegram_code: "Код з Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Спочатку потрібно підключити StreamElements JWT", you_can_find_by_url: "Ви можете знайти його за цим посиланням", set_id_and_jwt: "Потрібно встановити StreamElements Account ID та JWT для {{service}}" }, yL = { wrong_lots_format: "Неправильний формат лотів", not_connected: "Не підключено", request_error: "Помилка запиту" }, vL = { title: "Оновлення", description: "Доступна нова версія додатка. Бажаєте оновити?", update: "Оновити", later: "Пізніше", downloading: "Завантаження..." }, wL = { title: "Медіа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, SL = { tribute: "Показувати tribute-повідомлення" }, bL = { lots: "Лоти", wheel: "Колесо", settings: "Налаштування" }, _L = { set_point: "Встановити точку", meter_price: "Ціна за 1 метр", amount: "Сума", finish: "Завершити", lat_error: "Широта повинна бути від -90 до 90", lng_error: "Довгота повинна бути від -180 до 180", rules: "Щоб вказівник автоматично змінював позицію в повідомленні, має бути лише одне слово з:" }, xL = { enabled: "Увімкнено", min_amount: "Мінімальна сума", video_volume: "Гучність відео", min_views: "Мінімальна кількість переглядів" }, kL = { messages: "Повідомлення", settings: "Налаштування", services: "Сервіси", alerts: "Сповіщення", media: "Медіа", goals: "Цілі", auction: "Аукціон", maption: "Maption", fighter: "Бій", widgets: "Віджети", info: "Інформація" }, CL = { title: "Останні повідомлення" }, EL = { skip: "Пропустити", replay: "Повторити", donated: "{{user_name}} задонатив {{amount}}{{currency}}", followed: "{{user_name}} підписався", subscribed: "{{user_name}} оформив підписку", gifted_subscriptions: "{{user_name}} подарував {{total}} підписок", raided_with: "{{user_name}} зарейдив з {{viewers}} глядачами" }, PL = { title: "Фільтр повідомлень", exclude_donations: "Виключити донати", exclude_follows: "Виключити підписки", exclude_subscriptions: "Виключити підписки", exclude_raids: "Виключити рейди" }, RL = { title: "Налаштування", pause: "Призупинити сповіщення", moderation_duration: "Тривалість модерації", black_list: "Чорний список", remove_links: "Видаляти посилання", language: "Мова", sec: "Сек", currency: "Валюта", tts_type: "Тип TTS" }, TL = { normal: "Звичайне", dropout: "Випадання", spin: "Обертання", speed: "Швидкість колеса" }, $L = { continue: "Продовжити", pause: "Призупинити", reset: "Скинути", add_time: "Додати час", reduce_time: "Зменшити час", add_timex2: "Додати час ×2" }, ML = { title: "Бій", match: "Матч", final: "Фінал", game: "Гра", cancel: "Скасувати гру", winner: "Переможець", settings: "Налаштування", create_game: "Створити гру з лотів", start: "Почати", pause: "Призупинити", rematch: "Реванш", resume: "Відновити" }, AL = { name: "Назва", delete: "Видалити", add: "Додати суму" }, IL = { delete: "Видалити", to_lot: "До лоту", new: "Новий", add_to_random_slot: "Додати до випадкового лоту" }, OL = { add: "Додати", new_lot_name: "Назва нового лоту", search: "Пошук лоту", total: "Всього" }, NL = { leader_change: "Зміна лідера", new_lot: "Новий лот", new_donation: "Новий донат", show_odds: "Показувати шанси", show_total_sum: "Показувати загальну суму", greater_timer_adding_time: "Додавання часу при більшому таймері", not_add_time_if: "Не додавати час якщо", adding_time: "Час" }, LL = { import_lots: "Імпортувати лоти", clear_lots: "Очистити лоти" }, DL = { round_duration: "Тривалість раунду", add_players: "Додати гравців" }, FL = { title: "Сповіщення", group: "Група" }, zL = { title: "Сервіси", tribute: "Tribute", streamelements: "StreamElements", connect: "Підключити", integrations: "Інтеграції", sign_out: "Вийти", confirm_sign_out: "Ви впевнені, що хочете вийти з цього сервісу?" }, jL = { device_code_expired: "Термін дії коду пристрою закінчився. Спробуйте ще раз.", user_code: "Код користувача", authorize_with_code: "Авторизуватися за кодом", waiting_authorization: "Очікування авторизації..." }, BL = { donation_account_name: "Назва акаунту для донатів", donation_url: "URL донатів", create_donation_account: "Створити акаунт донатів Widy", connect_to_existing_account: "Підключитися до існуючого акаунту", create_donation_account_pending: "Створення акаунту донатів..." }, UL = { title: "Налаштування Twitch", points_currency_ratio: "Співвідношення балів до валюти", rewards_name: "Назва нагород", rewards_list: "Список нагород", add_reward: "Додати нагороду", cost: "Вартість", color: "Колір" }, WL = { image: "Зображення", audio: "Аудіо", view: "Вигляд", title: "Заголовок", message: "Повідомлення", test_name: "Тест", test_text: "Це тестове сповіщення!", configure: "Налаштувати", test: "Тестувати", add_new_variant: "Додати новий варіант", new_variant: "Новий варіант", variant_title: "Назва варіанту", variant_group: "Група варіанту", status: "Статус", variation_condition: "Умова варіації", group: "Група", Random: "Випадковий", AmountIsGreater: "Сума більша за", AmountIsEqual: "Сума дорівнює", delete: "Видалити", sure_delete: "Ви впевнені, що хочете видалити цей варіант?", type: "Тип", Donation: "Донат", Subscription: "Підписка", Follow: "Підписка", Raid: "Рейд" }, VL = "Загальне", HL = { title: "Цілі", create: "Створити нову ціль" }, qL = { new: "Нова ціль", goal: "Ціль", type: "Тип", elements: "Елементи", progress: "Прогрес", goal_title: "Назва цілі", amount_raise: "Сума для збору", start_raising: "Почати збір з", end_date: "Дата завершення цілі", bar_height: "Висота бару", rounding_radius: "Радіус округлення", bar_stroke_thickness: "Товщина обводки бару", background_bar_color: "Колір фонового бару", progress_bar_color: "Колір бару прогресу", goal_progress_bar: "Бар прогресу цілі", progress_bar_layout: "Розташування бару прогресу", remaining_time: "Залишок часу", goal_amount_limits: "Ліміти суми цілі", widget_background: "Фон віджета", background_color: "Колір фону", OnTop: "Зверху", Inside: "Всередині", Below: "Знизу", DoNotDisplay: "Не відображати", title: "Заголовок", limits: "ліміти", raised: "Зібрано", days_left: "Залишилось днів", finish_goal: "Завершити ціль", sure_finish: "Ви впевнені, що хочете завершити цю ціль?", Donation: "Донат", TwitchSubscription: "Підписка Twitch", TwitchFollow: "Підписка Twitch", goal_not_finished: "У вас є незавершена ціль цього типу." }, KL = "Зберегти", QL = "Назад", GL = { copy: "Копіювати", launch: "Запустити", url: "URL віджета", obs_dock_url: "OBS dock URL" }, YL = { top: "Зображення зверху, текст знизу", bottom: "Зображення знизу, текст зверху", left: "Зображення ліворуч, текст праворуч", right: "Зображення праворуч, текст ліворуч", overlay: "Текст поверх зображення" }, JL = { show: "Показувати зображення" }, XL = { font: "Шрифт", font_size: "Розмір шрифту", text_color: "Колір тексту", bold: "Жирний", italics: "Курсив", underline: "Підкреслений", transformation: "Трансформація", letter_spacing: "Міжлітерний інтервал", word_spacing: "Міжслівний інтервал", horizontal_alignment: "Горизонтальне вирівнювання", vertical_alignment: "Вертикальне вирівнювання", text_preview: "Це попередній перегляд!", name: "Назва" }, ZL = { play: "Відтворити", stop: "Зупинити" }, eD = "Версія", tD = { title: "Віджети", add: "Додати віджет", install: "Встановити", delete: "Видалити", installed: "Встановлено", all: "Всі", settings: "Налаштування", control: "Керування", delete_confirm: "Ви впевнені, що хочете видалити цей віджет?", invalid_manifest: "Невірний маніфест віджета", add_confirm: "Додавання дозволить {{widget_name}}:", installing: "Встановлення...", view_url: "URL перегляду" }, nD = { "widgets:messages.read": "Читати повідомлення", "widgets:goals.read": "Читати цілі", "widgets:auc-fighter:settings.read": "Читати налаштування auc-fighter", "widgets:settings.read": "Читати налаштування віджета", "widgets:alerts.read": "Читати сповіщення", "widgets:media:settings.read": "Читати налаштування медіа", "widgets:auc-fighter:match-playing.send": "Надсилати стан матчу (грає)", "widgets:auc-fighter:match-winner.send": "Надсилати переможця матчу", "widgets:auc-fighter:match-paused.send": "Надсилати стан матчу (призупинено)", "widgets:auc-fighter:match-id.send": "Надсилати ID матчу", "widgets:alert:played.send": "Надсилати сповіщення відтворено", "widgets:alert:playing.send": "Надсилати сповіщення відтворюється", "widgets:media:played.send": "Надсилати медіа відтворено", "widgets:media:end.send": "Надсилати завершення медіа", "widgets:media:playing.send": "Надсилати медіа відтворюється", "widgets:media:paused.send": "Надсилати медіа призупинено", "widgets:media:error.send": "Надсилати помилку медіа", "widgets:media:replay.send": "Надсилати повтор медіа", "widgets:alert:replay.send": "Надсилати повтор сповіщення", "widgets:alert:skip.send": "Надсилати пропуск сповіщення", "widgets:messages.subscription": "Підписка на повідомлення", "widgets:goal.subscription": "Підписка на ціль", "widgets:settings.subscription": "Підписка на налаштування", "widgets:auc-fighter:start-match.subscription": "Підписка на початок матчу", "widgets:auc-fighter:pause-match.subscription": "Підписка на призупинення матчу", "widgets:auc-fighter:resume-match.subscription": "Підписка на відновлення матчу", "widgets:auc-fighter:cancel-match.subscription": "Підписка на скасування матчу", "widgets:auc-fighter:update-match.subscription": "Підписка на оновлення матчу", "widgets:auc-fighter:settings.subscription": "Підписка на налаштування auc-fighter", "widgets:alert:replay.subscription": "Підписка на повтор сповіщення", "widgets:alert:skip.subscription": "Підписка на пропуск сповіщення", "widgets:alert:test.subscription": "Підписка на тест сповіщення", "widgets:alert:skip-playing.subscription": "Підписка на пропуск відтворюваного сповіщення", "widgets:alert:alerts.subscription": "Підписка на сповіщення", "widgets:media:replay.subscription": "Підписка на повтор медіа", "widgets:media:settings.subscription": "Підписка на налаштування медіа", "widgets:media:skip.subscription": "Підписка на пропуск медіа", "widgets:media:skip-playing-media.subscription": "Підписка на пропуск відтворюваного медіа", "widgets:media:end.subscription": "Підписка на завершення медіа", "widgets:media:error.subscription": "Підписка на помилку медіа", "widgets:media:pause.subscription": "Підписка на паузу медіа", "widgets:media:play.subscription": "Підписка на відтворення медіа", "widgets:alert:played.subscription": "Підписка на відтворене сповіщення", "widgets:storage.read": "Читати сховище віджета", "widgets:storage.write": "Записувати в сховище віджета" }, rD = {
  on: aL,
  off: lL,
  select: uL,
  success: cL,
  ok: dL,
  cancel: fL,
  sound_volume: pL,
  skip_media: hL,
  skip_alert: gL,
  authorization: mL,
  error: yL,
  updater: vL,
  media: wL,
  integration: SL,
  auction: bL,
  maption: _L,
  media_settings: xL,
  dashboard: kL,
  messages: CL,
  message: EL,
  filter: PL,
  settings: RL,
  wheel: TL,
  timer: $L,
  fighter: ML,
  lot: AL,
  bid: IL,
  lots: OL,
  auction_settings: NL,
  lots_options: LL,
  auc_fighter_settings: DL,
  alerts: FL,
  services: zL,
  twitch: jL,
  widy: BL,
  twitch_service_settings: UL,
  alert: WL,
  general: VL,
  goals: HL,
  goal: qL,
  save: KL,
  back: QL,
  widget: GL,
  view: YL,
  image: JL,
  text: XL,
  audio: ZL,
  version: eD,
  widgets: tD,
  scopes: nD
}, iD = "开启", oD = "关闭", sD = "选择", aD = "成功", lD = "确定", uD = "取消", cD = "声音音量", dD = "快捷键跳过媒体", fD = "快捷键跳过提醒", pD = { title: "授权", code: "请求验证码", sign_in: "登录", phone: "手机号码", telegram_code: "Telegram 收到的验证码", your_code: "您的验证码", "2fa_password": "两步验证密码", password: "密码", streamelements: "您需要先连接 StreamElements JWT", you_can_find_by_url: "您可以通过以下链接找到它", set_id_and_jwt: "您需要为 {{service}} 设置 StreamElements 账户 ID 和 JWT" }, hD = { wrong_lots_format: "抽奖格式错误", not_connected: "未连接", request_error: "请求错误" }, gD = { title: "更新", description: "有新版本可用，是否立即更新？", update: "更新", later: "稍后", downloading: "下载中..." }, mD = { title: "媒体", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, yD = { tribute: "显示致敬消息" }, vD = { lots: "奖品", wheel: "转盘", settings: "设置" }, wD = { set_point: "设置点位", meter_price: "每米价格", amount: "金额", finish: "完成", lat_error: "纬度必须在 -90 到 90 之间", lng_error: "经度必须在 -180 到 180 之间", rules: "指针要在消息中自动改变位置时，只能包含以下其中一个词：" }, SD = { enabled: "启用", min_amount: "最小金额", video_volume: "视频音量", min_views: "最小观看次数" }, bD = { messages: "消息", settings: "设置", services: "服务", alerts: "提醒", media: "媒体", goals: "目标", auction: "拍卖", maption: "地图", fighter: "对战", widgets: "小部件", info: "信息" }, _D = { title: "最新消息" }, xD = { skip: "跳过", replay: "重播", donated: "{{user_name}} 捐赠了 {{amount}}{{currency}}", followed: "{{user_name}} 关注了", subscribed: "{{user_name}} 订阅了", gifted_subscriptions: "{{user_name}} 赠送了 {{total}} 个订阅", raided_with: "{{user_name}} 带 {{viewers}} 名观众突袭" }, kD = { title: "过滤消息", exclude_donations: "排除捐赠", exclude_follows: "排除关注", exclude_subscriptions: "排除订阅", exclude_raids: "排除突袭" }, CD = { title: "设置", pause: "暂停提醒消息", moderation_duration: "消息停留时长", black_list: "黑名单", remove_links: "移除链接", language: "语言", sec: "秒", currency: "货币", tts_type: "语音播报类型" }, ED = { normal: "普通", dropout: "淘汰", spin: "旋转", speed: "转盘速度" }, PD = { continue: "继续", pause: "暂停", reset: "重置", add_time: "增加时间", reduce_time: "减少时间", add_timex2: "增加时间 ×2" }, RD = { title: "对战", match: "对战", final: "决赛", game: "游戏", cancel: "取消对战", winner: "获胜者", settings: "设置", create_game: "从奖品创建对战", start: "开始", pause: "暂停", rematch: "重新对战", resume: "继续" }, TD = { name: "名称", delete: "删除", add: "增加金额" }, $D = { delete: "删除", to_lot: "添加到奖品", new: "新建", add_to_random_slot: "添加到随机奖品" }, MD = { add: "添加", new_lot_name: "新奖品名称", search: "搜索奖品", total: "总计" }, AD = { leader_change: "领先者变更", new_lot: "新奖品", new_donation: "新捐赠", show_odds: "显示赔率", show_total_sum: "显示总金额", greater_timer_adding_time: "领先时增加时间", not_add_time_if: "以下情况不增加时间", adding_time: "时间" }, ID = { import_lots: "导入奖品", clear_lots: "清空奖品" }, OD = { round_duration: "回合时长", add_players: "添加选手" }, ND = { title: "提醒", group: "分组" }, LD = { title: "服务", tribute: "致敬", streamelements: "StreamElements", connect: "连接", integrations: "集成", sign_out: "退出登录", confirm_sign_out: "确定要退出此服务吗？" }, DD = { device_code_expired: "设备验证码已过期，请重试。", user_code: "用户验证码", authorize_with_code: "使用验证码授权", waiting_authorization: "等待授权中..." }, FD = { donation_account_name: "捐赠账户名称", donation_url: "捐赠链接", create_donation_account: "创建 Widy 捐赠账户", connect_to_existing_account: "连接到现有账户", create_donation_account_pending: "正在创建捐赠账户..." }, zD = { title: "Twitch 设置", points_currency_ratio: "积分与货币比例", rewards_name: "奖励名称", rewards_list: "奖励列表", add_reward: "添加奖励", cost: "价格", color: "颜色" }, jD = { image: "图片", audio: "音频", view: "显示方式", title: "标题", message: "消息", test_name: "测试", test_text: "这是一条测试提醒！", configure: "配置", test: "测试", add_new_variant: "添加新变体", new_variant: "新变体", variant_title: "变体标题", variant_group: "变体分组", status: "状态", variation_condition: "变体条件", group: "分组", Random: "随机", AmountIsGreater: "金额大于", AmountIsEqual: "金额等于", delete: "删除", sure_delete: "确定要删除此变体吗？", type: "类型", Donation: "捐赠", Subscription: "订阅", Follow: "关注", Raid: "突袭" }, BD = "常规", UD = { title: "目标", create: "创建新目标" }, WD = { new: "新目标", goal: "目标", type: "类型", elements: "元素", progress: "进度", goal_title: "目标标题", amount_raise: "目标金额", start_raising: "起始金额", end_date: "结束日期", bar_height: "进度条高度", rounding_radius: "圆角半径", bar_stroke_thickness: "进度条边框粗细", background_bar_color: "背景条颜色", progress_bar_color: "进度条颜色", goal_progress_bar: "目标进度条", progress_bar_layout: "进度条布局", remaining_time: "剩余时间", goal_amount_limits: "目标金额限制", widget_background: "小部件背景", background_color: "背景颜色", OnTop: "在顶部", Inside: "在内部", Below: "在下方", DoNotDisplay: "不显示", title: "标题", limits: "限制", raised: "已筹集", days_left: "剩余天数", finish_goal: "完成目标", sure_finish: "确定要完成此目标吗？", Donation: "捐赠", TwitchSubscription: "Twitch 订阅", TwitchFollow: "Twitch 关注", goal_not_finished: "该类型存在未完成的目标。" }, VD = "保存", HD = "返回", qD = { copy: "复制", launch: "启动", url: "小部件链接", obs_dock_url: "OBS 停靠链接" }, KD = { top: "图片在上，文字在下", bottom: "图片在下，文字在上", left: "图片在左，文字在右", right: "图片在右，文字在左", overlay: "文字覆盖在图片上" }, QD = { show: "显示图片" }, GD = { font: "字体", font_size: "字体大小", text_color: "文字颜色", bold: "加粗", italics: "斜体", underline: "下划线", transformation: "变换", letter_spacing: "字母间距", word_spacing: "单词间距", horizontal_alignment: "水平对齐", vertical_alignment: "垂直对齐", text_preview: "这是预览文字！", name: "名称" }, YD = { play: "播放", stop: "停止" }, JD = "版本", XD = { title: "小部件", add: "添加小部件", install: "安装", delete: "删除", installed: "已安装", all: "全部", settings: "设置", control: "控制", delete_confirm: "确定要删除此小部件吗？", invalid_manifest: "无效的小部件清单", add_confirm: "添加后将允许 {{widget_name}}：", installing: "安装中...", view_url: "查看链接" }, ZD = { "widgets:messages.read": "读取消息", "widgets:goals.read": "读取目标", "widgets:auc-fighter:settings.read": "读取拍卖对战设置", "widgets:settings.read": "读取小部件设置", "widgets:alerts.read": "读取提醒", "widgets:media:settings.read": "读取媒体设置", "widgets:auc-fighter:match-playing.send": "发送对战进行中", "widgets:auc-fighter:match-winner.send": "发送对战获胜者", "widgets:auc-fighter:match-paused.send": "发送对战暂停", "widgets:auc-fighter:match-id.send": "发送对战 ID", "widgets:alert:played.send": "发送提醒已播放", "widgets:alert:playing.send": "发送提醒播放中", "widgets:media:played.send": "发送媒体已播放", "widgets:media:end.send": "发送媒体结束", "widgets:media:playing.send": "发送媒体播放中", "widgets:media:paused.send": "发送媒体暂停", "widgets:media:error.send": "发送媒体错误", "widgets:media:replay.send": "发送媒体重播", "widgets:alert:replay.send": "发送提醒重播", "widgets:alert:skip.send": "发送提醒跳过", "widgets:messages.subscription": "订阅消息", "widgets:goal.subscription": "订阅目标", "widgets:settings.subscription": "订阅设置", "widgets:auc-fighter:start-match.subscription": "订阅开始对战", "widgets:auc-fighter:pause-match.subscription": "订阅暂停对战", "widgets:auc-fighter:resume-match.subscription": "订阅继续对战", "widgets:auc-fighter:cancel-match.subscription": "订阅取消对战", "widgets:auc-fighter:update-match.subscription": "订阅更新对战", "widgets:auc-fighter:settings.subscription": "订阅拍卖对战设置", "widgets:alert:replay.subscription": "订阅提醒重播", "widgets:alert:skip.subscription": "订阅提醒跳过", "widgets:alert:test.subscription": "订阅提醒测试", "widgets:alert:skip-playing.subscription": "订阅跳过正在播放的提醒", "widgets:alert:alerts.subscription": "订阅提醒", "widgets:media:replay.subscription": "订阅媒体重播", "widgets:media:settings.subscription": "订阅媒体设置", "widgets:media:skip.subscription": "订阅媒体跳过", "widgets:media:skip-playing-media.subscription": "订阅跳过正在播放的媒体", "widgets:media:end.subscription": "订阅媒体结束", "widgets:media:error.subscription": "订阅媒体错误", "widgets:media:pause.subscription": "订阅媒体暂停", "widgets:media:play.subscription": "订阅媒体播放", "widgets:alert:played.subscription": "订阅提醒已播放", "widgets:storage.read": "读取小部件存储", "widgets:storage.write": "写入小部件存储" }, eF = {
  on: iD,
  off: oD,
  select: sD,
  success: aD,
  ok: lD,
  cancel: uD,
  sound_volume: cD,
  skip_media: dD,
  skip_alert: fD,
  authorization: pD,
  error: hD,
  updater: gD,
  media: mD,
  integration: yD,
  auction: vD,
  maption: wD,
  media_settings: SD,
  dashboard: bD,
  messages: _D,
  message: xD,
  filter: kD,
  settings: CD,
  wheel: ED,
  timer: PD,
  fighter: RD,
  lot: TD,
  bid: $D,
  lots: MD,
  auction_settings: AD,
  lots_options: ID,
  auc_fighter_settings: OD,
  alerts: ND,
  services: LD,
  twitch: DD,
  widy: FD,
  twitch_service_settings: zD,
  alert: jD,
  general: BD,
  goals: UD,
  goal: WD,
  save: VD,
  back: HD,
  widget: qD,
  view: KD,
  image: QD,
  text: GD,
  audio: YD,
  version: JD,
  widgets: XD,
  scopes: ZD
};
Pt.use(x$).init({
  resources: {
    en: {
      translation: b2
    },
    ua: {
      translation: rD
    },
    ru: {
      translation: sL
    },
    de: {
      translation: kM
    },
    es: {
      translation: vA
    },
    fr: {
      translation: gI
    },
    hi: {
      translation: fO
    },
    pt: {
      translation: uN
    },
    zh: {
      translation: eF
    }
  },
  lng: "en",
  fallbackLng: "en",
  nsSeparator: !1
});
var vu;
(function(e) {
  e.error = "error", e.info = "info", e.success = "success", e.warning = "warning";
})(vu || (vu = {}));
var Mv;
(function(e) {
  e.en = "en", e.es = "es", e.de = "de", e.zh = "zh", e.fr = "fr", e.hi = "hi", e.ar = "ar", e.pt = "pt", e.ru = "ru", e.ua = "ua";
})(Mv || (Mv = {}));
var ie;
(function(e) {
  e.Message = "Message", e.MediaMessage = "MediaMessage", e.SkipAlert = "SkipAlert", e.ReplayAlert = "ReplayAlert", e.AlertPlaying = "AlertPlaying", e.AlertPlayed = "AlertPlayed", e.MediaPlaying = "MediaPlaying", e.SkipPlayingMedia = "SkipPlayingMedia", e.SkipPlayingAlert = "SkipPlayingAlert", e.MediaEnd = "MediaEnd", e.MediaError = "MediaError", e.MediaPaused = "MediaPaused", e.PauseMedia = "PauseMedia", e.MediaPlayed = "MediaPlayed", e.PlayMedia = "PlayMedia", e.SkipMedia = "SkipMedia", e.ReplayMedia = "ReplayMedia", e.Alerts = "Alerts", e.MakeAudioError = "MakeAudioError", e.Settings = "Settings", e.MediaSettings = "MediaSettings", e.StartAucFighterMatch = "StartAucFighterMatch", e.AucFighterMatchEnd = "AucFighterMatchEnd", e.PauseAucFighterMatch = "PauseAucFighterMatch", e.ResumeAucFighterMatch = "ResumeAucFighterMatch", e.AucFighterMatchPlaying = "AucFighterMatchPlaying", e.AucFighterMatchPaused = "AucFighterMatchPaused", e.UpdateAucFighterMatch = "UpdateAucFighterMatch", e.CancelAucFighterMatch = "CancelAucFighterMatch", e.AucFighterSettings = "AucFighterSettings", e.TestAlert = "TestAlert", e.Goal = "Goal", e.TwitchRewardRedemptionAdd = "TwitchRewardRedemptionAdd", e.CreateDonationAccount = "CreateDonationAccount", e.WidgetViewStorage = "WidgetViewStorage", e.WidgetControlStorage = "WidgetControlStorage";
})(ie || (ie = {}));
var Av;
(function(e) {
  e.Connect = "Connect", e.Authenticated = "Authenticated";
})(Av || (Av = {}));
var Dt;
(function(e) {
  e.Top = "Top", e.Bottom = "Bottom", e.Left = "Left", e.Right = "Right", e.Overlay = "Overlay";
})(Dt || (Dt = {}));
var cr;
(function(e) {
  e.UAH = "UAH", e.RUB = "RUB", e.EUR = "EUR", e.USD = "USD", e.BRL = "BRL", e.TRY = "TRY", e.BYN = "BYN", e.KZT = "KZT", e.AUD = "AUD", e.CAD = "CAD", e.CZK = "CZK", e.DKK = "DKK", e.HKD = "HKD", e.ILS = "ILS", e.MYR = "MYR", e.MXN = "MXN", e.NOK = "NOK", e.NZD = "NZD", e.PHP = "PHP", e.PLN = "PLN", e.GBP = "GBP", e.SGD = "SGD", e.SEK = "SEK", e.CHF = "CHF", e.THB = "THB", e.NONE = "NONE";
})(cr || (cr = {}));
var Br;
(function(e) {
  e.Youtube = "Youtube", e.Twitch = "Twitch", e.TikTok = "TikTok";
})(Br || (Br = {}));
var Iv;
(function(e) {
  e.normal = "normal", e.dropout = "dropout";
})(Iv || (Iv = {}));
var fo;
(function(e) {
  e.Random = "Random", e.AmountIsGreater = "AmountIsGreater", e.AmountIsEqual = "AmountIsEqual";
})(fo || (fo = {}));
var jr;
(function(e) {
  e.OnTop = "OnTop", e.Inside = "Inside", e.Below = "Below", e.DoNotDisplay = "DoNotDisplay";
})(jr || (jr = {}));
var mi;
(function(e) {
  e.Percent = "Percent", e.CurrentAmount = "CurrentAmount", e.CurrentAmountPercent = "CurrentAmountPercent", e.CurrentAmountRemainingAmount = "CurrentAmountRemainingAmount", e.CurrentAmountRemainingAmountPercent = "CurrentAmountRemainingAmountPercent";
})(mi || (mi = {}));
var Bt;
(function(e) {
  e.TributeBot = "TributeBot", e.Streamelements = "Streamelements", e.Twitch = "Twitch", e.WidySol = "WidySol", e.WidyTon = "WidyTon", e.DonationAlerts = "DonationAlerts", e.StreamLabs = "StreamLabs", e.Donatello = "Donatello", e.Donatik = "Donatik";
})(Bt || (Bt = {}));
var Ov;
(function(e) {
  e.tip = "tip";
})(Ov || (Ov = {}));
var Ft;
(function(e) {
  e.Donation = "Donation", e.Subscription = "Subscription", e.Follow = "Follow", e.Raid = "Raid";
})(Ft || (Ft = {}));
var lp;
(function(e) {
  e.Donation = "Donation", e.TwitchSubscription = "TwitchSubscription", e.TwitchFollow = "TwitchFollow";
})(lp || (lp = {}));
var wu;
(function(e) {
  e.Sol = "sol", e.Ton = "ton";
})(wu || (wu = {}));
var Nv;
(function(e) {
  e.Google = "Google", e.Edge = "Edge";
})(Nv || (Nv = {}));
var Lv;
(function(e) {
  e.Male = "Male", e.Female = "Edge";
})(Lv || (Lv = {}));
var bf = { exports: {} }, _f = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dv;
function tF() {
  if (Dv) return _f;
  Dv = 1;
  var e = Au();
  function t(p, f) {
    return p === f && (p !== 0 || 1 / p === 1 / f) || p !== p && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, o = e.useSyncExternalStore, s = e.useRef, l = e.useEffect, u = e.useMemo, d = e.useDebugValue;
  return _f.useSyncExternalStoreWithSelector = function(p, f, g, y, v) {
    var _ = s(null);
    if (_.current === null) {
      var S = { hasValue: !1, value: null };
      _.current = S;
    } else S = _.current;
    _ = u(
      function() {
        function C(E) {
          if (!R) {
            if (R = !0, O = E, E = y(E), v !== void 0 && S.hasValue) {
              var M = S.value;
              if (v(M, E))
                return x = M;
            }
            return x = E;
          }
          if (M = x, r(O, E)) return M;
          var A = y(E);
          return v !== void 0 && v(M, A) ? (O = E, M) : (O = E, x = A);
        }
        var R = !1, O, x, P = g === void 0 ? null : g;
        return [
          function() {
            return C(f());
          },
          P === null ? void 0 : function() {
            return C(P());
          }
        ];
      },
      [f, g, y, v]
    );
    var b = o(p, _[0], _[1]);
    return l(
      function() {
        S.hasValue = !0, S.value = b;
      },
      [b]
    ), d(b), b;
  }, _f;
}
var Fv;
function nF() {
  return Fv || (Fv = 1, bf.exports = tF()), bf.exports;
}
var rF = nF();
function dS(e) {
  e();
}
function iF() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      dS(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let o = e;
      for (; o; )
        r.push(o), o = o.next;
      return r;
    },
    subscribe(r) {
      let o = !0;
      const s = t = {
        callback: r,
        next: null,
        prev: t
      };
      return s.prev ? s.prev.next = s : e = s, function() {
        !o || e === null || (o = !1, s.next ? s.next.prev = s.prev : t = s.prev, s.prev ? s.prev.next = s.next : e = s.next);
      };
    }
  };
}
var zv = {
  notify() {
  },
  get: () => []
};
function oF(e, t) {
  let r, o = zv, s = 0, l = !1;
  function u(b) {
    g();
    const C = o.subscribe(b);
    let R = !1;
    return () => {
      R || (R = !0, C(), y());
    };
  }
  function d() {
    o.notify();
  }
  function p() {
    S.onStateChange && S.onStateChange();
  }
  function f() {
    return l;
  }
  function g() {
    s++, r || (r = e.subscribe(p), o = iF());
  }
  function y() {
    s--, r && s === 0 && (r(), r = void 0, o.clear(), o = zv);
  }
  function v() {
    l || (l = !0, g());
  }
  function _() {
    l && (l = !1, y());
  }
  const S = {
    addNestedSub: u,
    notifyNestedSubs: d,
    handleChangeWrapper: p,
    isSubscribed: f,
    trySubscribe: v,
    tryUnsubscribe: _,
    getListeners: () => o
  };
  return S;
}
var sF = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", aF = /* @__PURE__ */ sF(), lF = () => typeof navigator < "u" && navigator.product === "ReactNative", uF = /* @__PURE__ */ lF(), cF = () => aF || uF ? k.useLayoutEffect : k.useEffect, dF = /* @__PURE__ */ cF();
function jv(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Rs(e, t) {
  if (jv(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length) return !1;
  for (let s = 0; s < r.length; s++)
    if (!Object.prototype.hasOwnProperty.call(t, r[s]) || !jv(e[r[s]], t[r[s]]))
      return !1;
  return !0;
}
var fF = /* @__PURE__ */ Symbol.for("react-redux-context"), pF = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function hF() {
  if (!k.createContext) return {};
  const e = pF[fF] ??= /* @__PURE__ */ new Map();
  let t = e.get(k.createContext);
  return t || (t = k.createContext(
    null
  ), e.set(k.createContext, t)), t;
}
var Hr = /* @__PURE__ */ hF();
function gF(e) {
  const { children: t, context: r, serverState: o, store: s } = e, l = k.useMemo(() => {
    const p = oF(s);
    return {
      store: s,
      subscription: p,
      getServerState: o ? () => o : void 0
    };
  }, [s, o]), u = k.useMemo(() => s.getState(), [s]);
  dF(() => {
    const { subscription: p } = l;
    return p.onStateChange = p.notifyNestedSubs, p.trySubscribe(), u !== s.getState() && p.notifyNestedSubs(), () => {
      p.tryUnsubscribe(), p.onStateChange = void 0;
    };
  }, [l, u]);
  const d = r || Hr;
  return /* @__PURE__ */ k.createElement(d.Provider, { value: l }, t);
}
var mF = gF;
function Zp(e = Hr) {
  return function() {
    return k.useContext(e);
  };
}
var fS = /* @__PURE__ */ Zp();
function pS(e = Hr) {
  const t = e === Hr ? fS : (
    // @ts-ignore
    Zp(e)
  ), r = () => {
    const { store: o } = t();
    return o;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var hS = /* @__PURE__ */ pS();
function yF(e = Hr) {
  const t = e === Hr ? hS : pS(e), r = () => t().dispatch;
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Ju = /* @__PURE__ */ yF(), vF = (e, t) => e === t;
function wF(e = Hr) {
  const t = e === Hr ? fS : Zp(e), r = (o, s = {}) => {
    const { equalityFn: l = vF } = typeof s == "function" ? { equalityFn: s } : s, u = t(), { store: d, subscription: p, getServerState: f } = u;
    k.useRef(!0);
    const g = k.useCallback(
      {
        [o.name](v) {
          return o(v);
        }
      }[o.name],
      [o]
    ), y = rF.useSyncExternalStoreWithSelector(
      p.addNestedSub,
      d.getState,
      f || d.getState,
      g,
      l
    );
    return k.useDebugValue(y), y;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var qn = /* @__PURE__ */ wF(), SF = dS;
const gS = k.createContext(null), bF = ({
  children: e,
  context: t,
  eventsService: r
}) => /* @__PURE__ */ B.jsx(t.Provider, { value: r, children: e });
class _F {
  subscribers;
  constructor() {
    this.subscribers = [];
  }
  notifySubscribers(t, r) {
    for (const o of this.subscribers)
      o.id === t && o.callback(r);
  }
  subscribe(t, r) {
    return this.subscribers.push({ id: t, callback: r }), () => {
      this.subscribers = this.subscribers.filter(
        (o) => o.callback !== r
      );
    };
  }
}
class eh extends _F {
  constructor(t) {
    super(), this.url = t;
  }
  socket = null;
  reconnectTimer = null;
  static RECONNECT_DELAY_MS = 1e3;
  connect() {
    this.isConnected() || (this.clearReconnectTimer(), this.socket = new WebSocket(this.url), this.socket.onmessage = ({ data: t }) => {
      const r = JSON.parse(t);
      this.notifySubscribers(r.event, r.data);
    }, this.socket.onclose = () => {
      this.scheduleReconnect();
    });
  }
  disconnect() {
    this.clearReconnectTimer(), this.socket && (this.socket.onclose = null, this.socket.close(), this.socket = null);
  }
  send(t) {
    if (this.isConnected())
      try {
        this.socket.send(JSON.stringify(t));
      } catch (r) {
        console.error(
          "[WebsocketTransportService] Failed to send message:",
          r
        );
      }
  }
  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
  scheduleReconnect() {
    this.reconnectTimer = setTimeout(
      () => this.connect(),
      eh.RECONNECT_DELAY_MS
    );
  }
  clearReconnectTimer() {
    this.reconnectTimer !== null && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
}
function xt(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var xF = typeof Symbol == "function" && Symbol.observable || "@@observable", Bv = xF, xf = () => Math.random().toString(36).substring(7).split("").join("."), kF = {
  INIT: `@@redux/INIT${/* @__PURE__ */ xf()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ xf()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${xf()}`
}, Su = kF;
function qr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function mS(e, t, r) {
  if (typeof e != "function")
    throw new Error(xt(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(xt(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(xt(1));
    return r(mS)(e, t);
  }
  let o = e, s = t, l = /* @__PURE__ */ new Map(), u = l, d = 0, p = !1;
  function f() {
    u === l && (u = /* @__PURE__ */ new Map(), l.forEach((C, R) => {
      u.set(R, C);
    }));
  }
  function g() {
    if (p)
      throw new Error(xt(3));
    return s;
  }
  function y(C) {
    if (typeof C != "function")
      throw new Error(xt(4));
    if (p)
      throw new Error(xt(5));
    let R = !0;
    f();
    const O = d++;
    return u.set(O, C), function() {
      if (R) {
        if (p)
          throw new Error(xt(6));
        R = !1, f(), u.delete(O), l = null;
      }
    };
  }
  function v(C) {
    if (!qr(C))
      throw new Error(xt(7));
    if (typeof C.type > "u")
      throw new Error(xt(8));
    if (typeof C.type != "string")
      throw new Error(xt(17));
    if (p)
      throw new Error(xt(9));
    try {
      p = !0, s = o(s, C);
    } finally {
      p = !1;
    }
    return (l = u).forEach((O) => {
      O();
    }), C;
  }
  function _(C) {
    if (typeof C != "function")
      throw new Error(xt(10));
    o = C, v({
      type: Su.REPLACE
    });
  }
  function S() {
    const C = y;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(R) {
        if (typeof R != "object" || R === null)
          throw new Error(xt(11));
        function O() {
          const P = R;
          P.next && P.next(g());
        }
        return O(), {
          unsubscribe: C(O)
        };
      },
      [Bv]() {
        return this;
      }
    };
  }
  return v({
    type: Su.INIT
  }), {
    dispatch: v,
    subscribe: y,
    getState: g,
    replaceReducer: _,
    [Bv]: S
  };
}
function CF(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Su.INIT
    }) > "u")
      throw new Error(xt(12));
    if (typeof r(void 0, {
      type: Su.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(xt(13));
  });
}
function th(e) {
  const t = Object.keys(e), r = {};
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    typeof e[u] == "function" && (r[u] = e[u]);
  }
  const o = Object.keys(r);
  let s;
  try {
    CF(r);
  } catch (l) {
    s = l;
  }
  return function(u = {}, d) {
    if (s)
      throw s;
    let p = !1;
    const f = {};
    for (let g = 0; g < o.length; g++) {
      const y = o[g], v = r[y], _ = u[y], S = v(_, d);
      if (typeof S > "u")
        throw d && d.type, new Error(xt(14));
      f[y] = S, p = p || S !== _;
    }
    return p = p || o.length !== Object.keys(u).length, p ? f : u;
  };
}
function bu(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...o) => t(r(...o)));
}
function EF(...e) {
  return (t) => (r, o) => {
    const s = t(r, o);
    let l = () => {
      throw new Error(xt(15));
    };
    const u = {
      getState: s.getState,
      dispatch: (p, ...f) => l(p, ...f)
    }, d = e.map((p) => p(u));
    return l = bu(...d)(s.dispatch), {
      ...s,
      dispatch: l
    };
  };
}
function yS(e) {
  return qr(e) && "type" in e && typeof e.type == "string";
}
var nh = Symbol.for("immer-nothing"), Ts = Symbol.for("immer-draftable"), vt = Symbol.for("immer-state");
function Et(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var rn = Object, xi = rn.getPrototypeOf, Fs = "constructor", na = "prototype", up = "configurable", _u = "enumerable", eu = "writable", zs = "value", an = (e) => !!e && !!e[vt];
function ln(e) {
  return e ? vS(e) || ia(e) || !!e[Ts] || !!e[Fs]?.[Ts] || oa(e) || sa(e) : !1;
}
var PF = rn[na][Fs].toString(), Uv = /* @__PURE__ */ new WeakMap();
function vS(e) {
  if (!e || !go(e))
    return !1;
  const t = xi(e);
  if (t === null || t === rn[na])
    return !0;
  const r = rn.hasOwnProperty.call(t, Fs) && t[Fs];
  if (r === Object)
    return !0;
  if (!yi(r))
    return !1;
  let o = Uv.get(r);
  return o === void 0 && (o = Function.toString.call(r), Uv.set(r, o)), o === PF;
}
function RF(e) {
  return an(e) || Et(15, e), e[vt].base_;
}
function ra(e, t, r = !0) {
  ki(e) === 0 ? (r ? Reflect.ownKeys(e) : rn.keys(e)).forEach((s) => {
    t(s, e[s], e);
  }) : e.forEach((o, s) => t(s, o, e));
}
function ki(e) {
  const t = e[vt];
  return t ? t.type_ : ia(e) ? 1 : oa(e) ? 2 : sa(e) ? 3 : 0;
}
var $s = (e, t, r = ki(e)) => r === 2 ? e.has(t) : rn[na].hasOwnProperty.call(e, t), lr = (e, t, r = ki(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), xu = (e, t, r, o = ki(e)) => {
  o === 2 ? e.set(t, r) : o === 3 ? e.add(r) : e[t] = r;
};
function TF(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var ia = Array.isArray, oa = (e) => e instanceof Map, sa = (e) => e instanceof Set, go = (e) => typeof e == "object", yi = (e) => typeof e == "function", kf = (e) => typeof e == "boolean";
function $F(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var MF = (e) => go(e) ? e?.[vt] : null, ur = (e) => e.copy_ || e.base_, rh = (e) => e.modified_ ? e.copy_ : e.base_;
function cp(e, t) {
  if (oa(e))
    return new Map(e);
  if (sa(e))
    return new Set(e);
  if (ia(e))
    return Array[na].slice.call(e);
  const r = vS(e);
  if (t === !0 || t === "class_only" && !r) {
    const o = rn.getOwnPropertyDescriptors(e);
    delete o[vt];
    let s = Reflect.ownKeys(o);
    for (let l = 0; l < s.length; l++) {
      const u = s[l], d = o[u];
      d[eu] === !1 && (d[eu] = !0, d[up] = !0), (d.get || d.set) && (o[u] = {
        [up]: !0,
        [eu]: !0,
        // could live with !!desc.set as well here...
        [_u]: d[_u],
        [zs]: e[u]
      });
    }
    return rn.create(xi(e), o);
  } else {
    const o = xi(e);
    if (o !== null && r)
      return { ...e };
    const s = rn.create(o);
    return rn.assign(s, e);
  }
}
function ih(e, t = !1) {
  return Xu(e) || an(e) || !ln(e) || (ki(e) > 1 && rn.defineProperties(e, {
    set: Tl,
    add: Tl,
    clear: Tl,
    delete: Tl
  }), rn.freeze(e), t && ra(
    e,
    (r, o) => {
      ih(o, !0);
    },
    !1
  )), e;
}
function AF() {
  Et(2);
}
var Tl = {
  [zs]: AF
};
function Xu(e) {
  return e === null || !go(e) ? !0 : rn.isFrozen(e);
}
var ku = "MapSet", Cu = "Patches", Wv = "ArrayMethods", Eu = {};
function Ci(e) {
  const t = Eu[e];
  return t || Et(0, e), t;
}
var Vv = (e) => !!Eu[e];
function IF(e, t) {
  Eu[e] || (Eu[e] = t);
}
var js, wS = () => js, OF = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: Vv(ku) ? Ci(ku) : void 0,
  arrayMethodsPlugin_: Vv(Wv) ? Ci(Wv) : void 0
});
function Hv(e, t) {
  t && (e.patchPlugin_ = Ci(Cu), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function dp(e) {
  fp(e), e.drafts_.forEach(NF), e.drafts_ = null;
}
function fp(e) {
  e === js && (js = e.parent_);
}
var qv = (e) => js = OF(js, e);
function NF(e) {
  const t = e[vt];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Kv(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[vt].modified_ && (dp(t), Et(4)), ln(e) && (e = Qv(t, e));
    const { patchPlugin_: s } = t;
    s && s.generateReplacementPatches_(
      r[vt].base_,
      e,
      t
    );
  } else
    e = Qv(t, r);
  return LF(t, e, !0), dp(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== nh ? e : void 0;
}
function Qv(e, t) {
  if (Xu(t))
    return t;
  const r = t[vt];
  if (!r)
    return Pu(t, e.handledSet_, e);
  if (!Zu(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: o } = r;
    if (o)
      for (; o.length > 0; )
        o.pop()(e);
    _S(r, e);
  }
  return r.copy_;
}
function LF(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && ih(t, r);
}
function SS(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var Zu = (e, t) => e.scope_ === t, DF = [];
function bS(e, t, r, o) {
  const s = ur(e), l = e.type_;
  if (o !== void 0 && lr(s, o, l) === t) {
    xu(s, o, r, l);
    return;
  }
  if (!e.draftLocations_) {
    const d = e.draftLocations_ = /* @__PURE__ */ new Map();
    ra(s, (p, f) => {
      if (an(f)) {
        const g = d.get(f) || [];
        g.push(p), d.set(f, g);
      }
    });
  }
  const u = e.draftLocations_.get(t) ?? DF;
  for (const d of u)
    xu(s, d, r, l);
}
function FF(e, t, r) {
  e.callbacks_.push(function(s) {
    const l = t;
    if (!l || !Zu(l, s))
      return;
    s.mapSetPlugin_?.fixSetContents(l);
    const u = rh(l);
    bS(e, l.draft_ ?? l, u, r), _S(l, s);
  });
}
function _S(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: o } = t;
    if (o) {
      const s = o.getPath(e);
      s && o.generatePatches_(e, s, t);
    }
    SS(e);
  }
}
function zF(e, t, r) {
  const { scope_: o } = e;
  if (an(r)) {
    const s = r[vt];
    Zu(s, o) && s.callbacks_.push(function() {
      tu(e);
      const u = rh(s);
      bS(e, r, u, t);
    });
  } else ln(r) && e.callbacks_.push(function() {
    const l = ur(e);
    e.type_ === 3 ? l.has(r) && Pu(r, o.handledSet_, o) : lr(l, t, e.type_) === r && o.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && Pu(
      lr(e.copy_, t, e.type_),
      o.handledSet_,
      o
    );
  });
}
function Pu(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || an(e) || t.has(e) || !ln(e) || Xu(e) || (t.add(e), ra(e, (o, s) => {
    if (an(s)) {
      const l = s[vt];
      if (Zu(l, r)) {
        const u = rh(l);
        xu(e, o, u, e.type_), SS(l);
      }
    } else ln(s) && Pu(s, t, r);
  })), e;
}
function jF(e, t) {
  const r = ia(e), o = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : wS(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let s = o, l = Ru;
  r && (s = [o], l = Bs);
  const { revoke: u, proxy: d } = Proxy.revocable(s, l);
  return o.draft_ = d, o.revoke_ = u, [d, o];
}
var Ru = {
  get(e, t) {
    if (t === vt)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const o = e.type_ === 1 && typeof t == "string";
    if (o && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const s = ur(e);
    if (!$s(s, t, e.type_))
      return BF(e, s, t);
    const l = s[t];
    if (e.finalized_ || !ln(l) || o && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && $F(t))
      return l;
    if (l === Cf(e.base_, t)) {
      tu(e);
      const u = e.type_ === 1 ? +t : t, d = hp(e.scope_, l, e, u);
      return e.copy_[u] = d;
    }
    return l;
  },
  has(e, t) {
    return t in ur(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(ur(e));
  },
  set(e, t, r) {
    const o = xS(ur(e), t);
    if (o?.set)
      return o.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const s = Cf(ur(e), t), l = s?.[vt];
      if (l && l.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (TF(r, s) && (r !== void 0 || $s(e.base_, t, e.type_)))
        return !0;
      tu(e), pp(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), zF(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return tu(e), Cf(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), pp(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = ur(e), o = Reflect.getOwnPropertyDescriptor(r, t);
    return o && {
      [eu]: !0,
      [up]: e.type_ !== 1 || t !== "length",
      [_u]: o[_u],
      [zs]: r[t]
    };
  },
  defineProperty() {
    Et(11);
  },
  getPrototypeOf(e) {
    return xi(e.base_);
  },
  setPrototypeOf() {
    Et(12);
  }
}, Bs = {};
for (let e in Ru) {
  let t = Ru[e];
  Bs[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Bs.deleteProperty = function(e, t) {
  return Bs.set.call(this, e, t, void 0);
};
Bs.set = function(e, t, r) {
  return Ru.set.call(this, e[0], t, r, e[0]);
};
function Cf(e, t) {
  const r = e[vt];
  return (r ? ur(r) : e)[t];
}
function BF(e, t, r) {
  const o = xS(t, r);
  return o ? zs in o ? o[zs] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    o.get?.call(e.draft_)
  ) : void 0;
}
function xS(e, t) {
  if (!(t in e))
    return;
  let r = xi(e);
  for (; r; ) {
    const o = Object.getOwnPropertyDescriptor(r, t);
    if (o)
      return o;
    r = xi(r);
  }
}
function pp(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && pp(e.parent_));
}
function tu(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = cp(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var UF = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (t, r, o) => {
      if (yi(t) && !yi(r)) {
        const l = r;
        r = t;
        const u = this;
        return function(p = l, ...f) {
          return u.produce(p, (g) => r.call(this, g, ...f));
        };
      }
      yi(r) || Et(6), o !== void 0 && !yi(o) && Et(7);
      let s;
      if (ln(t)) {
        const l = qv(this), u = hp(l, t, void 0);
        let d = !0;
        try {
          s = r(u), d = !1;
        } finally {
          d ? dp(l) : fp(l);
        }
        return Hv(l, o), Kv(s, l);
      } else if (!t || !go(t)) {
        if (s = r(t), s === void 0 && (s = t), s === nh && (s = void 0), this.autoFreeze_ && ih(s, !0), o) {
          const l = [], u = [];
          Ci(Cu).generateReplacementPatches_(t, s, {
            patches_: l,
            inversePatches_: u
          }), o(l, u);
        }
        return s;
      } else
        Et(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (yi(t))
        return (u, ...d) => this.produceWithPatches(u, (p) => t(p, ...d));
      let o, s;
      return [this.produce(t, r, (u, d) => {
        o = u, s = d;
      }), o, s];
    }, kf(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), kf(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), kf(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    ln(e) || Et(8), an(e) && (e = kS(e));
    const t = qv(this), r = hp(t, e, void 0);
    return r[vt].isManual_ = !0, fp(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[vt];
    (!r || !r.isManual_) && Et(9);
    const { scope_: o } = r;
    return Hv(o, t), Kv(void 0, o);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const s = t[r];
      if (s.path.length === 0 && s.op === "replace") {
        e = s.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const o = Ci(Cu).applyPatches_;
    return an(e) ? o(e, t) : this.produce(
      e,
      (s) => o(s, t)
    );
  }
};
function hp(e, t, r, o) {
  const [s, l] = oa(t) ? Ci(ku).proxyMap_(t, r) : sa(t) ? Ci(ku).proxySet_(t, r) : jF(t, r);
  return (r?.scope_ ?? wS()).drafts_.push(s), l.callbacks_ = r?.callbacks_ ?? [], l.key_ = o, r && o !== void 0 ? FF(r, l, o) : l.callbacks_.push(function(p) {
    p.mapSetPlugin_?.fixSetContents(l);
    const { patchPlugin_: f } = p;
    l.modified_ && f && f.generatePatches_(l, [], p);
  }), s;
}
function kS(e) {
  return an(e) || Et(10, e), CS(e);
}
function CS(e) {
  if (!ln(e) || Xu(e))
    return e;
  const t = e[vt];
  let r, o = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = cp(e, t.scope_.immer_.useStrictShallowCopy_), o = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = cp(e, !0);
  return ra(
    r,
    (s, l) => {
      xu(r, s, CS(l));
    },
    o
  ), t && (t.finalized_ = !1), r;
}
function WF() {
  function t(S, b = []) {
    if (S.key_ !== void 0) {
      const C = S.parent_.copy_ ?? S.parent_.base_, R = MF(lr(C, S.key_)), O = lr(C, S.key_);
      if (O === void 0 || O !== S.draft_ && O !== S.base_ && O !== S.copy_ || R != null && R.base_ !== S.base_)
        return null;
      const x = S.parent_.type_ === 3;
      let P;
      if (x) {
        const E = S.parent_;
        P = Array.from(E.drafts_.keys()).indexOf(S.key_);
      } else
        P = S.key_;
      if (!(x && C.size > P || $s(C, P)))
        return null;
      b.push(P);
    }
    if (S.parent_)
      return t(S.parent_, b);
    b.reverse();
    try {
      r(S.copy_, b);
    } catch {
      return null;
    }
    return b;
  }
  function r(S, b) {
    let C = S;
    for (let R = 0; R < b.length - 1; R++) {
      const O = b[R];
      if (C = lr(C, O), !go(C) || C === null)
        throw new Error(`Cannot resolve path at '${b.join("/")}'`);
    }
    return C;
  }
  const o = "replace", s = "add", l = "remove";
  function u(S, b, C) {
    if (S.scope_.processedForPatches_.has(S))
      return;
    S.scope_.processedForPatches_.add(S);
    const { patches_: R, inversePatches_: O } = C;
    switch (S.type_) {
      case 0:
      case 2:
        return p(
          S,
          b,
          R,
          O
        );
      case 1:
        return d(
          S,
          b,
          R,
          O
        );
      case 3:
        return f(
          S,
          b,
          R,
          O
        );
    }
  }
  function d(S, b, C, R) {
    let { base_: O, assigned_: x } = S, P = S.copy_;
    P.length < O.length && ([O, P] = [P, O], [C, R] = [R, C]);
    const E = S.allIndicesReassigned_ === !0;
    for (let M = 0; M < O.length; M++) {
      const A = P[M], I = O[M];
      if ((E || x?.get(M.toString())) && A !== I) {
        const w = A?.[vt];
        if (w && w.modified_)
          continue;
        const T = b.concat([M]);
        C.push({
          op: o,
          path: T,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: _(A)
        }), R.push({
          op: o,
          path: T,
          value: _(I)
        });
      }
    }
    for (let M = O.length; M < P.length; M++) {
      const A = b.concat([M]);
      C.push({
        op: s,
        path: A,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: _(P[M])
      });
    }
    for (let M = P.length - 1; O.length <= M; --M) {
      const A = b.concat([M]);
      R.push({
        op: l,
        path: A
      });
    }
  }
  function p(S, b, C, R) {
    const { base_: O, copy_: x, type_: P } = S;
    ra(S.assigned_, (E, M) => {
      const A = lr(O, E, P), I = lr(x, E, P), L = M ? $s(O, E) ? o : s : l;
      if (A === I && L === o)
        return;
      const w = b.concat(E);
      C.push(
        L === l ? { op: L, path: w } : { op: L, path: w, value: _(I) }
      ), R.push(
        L === s ? { op: l, path: w } : L === l ? { op: s, path: w, value: _(A) } : { op: o, path: w, value: _(A) }
      );
    });
  }
  function f(S, b, C, R) {
    let { base_: O, copy_: x } = S, P = 0;
    O.forEach((E) => {
      if (!x.has(E)) {
        const M = b.concat([P]);
        C.push({
          op: l,
          path: M,
          value: E
        }), R.unshift({
          op: s,
          path: M,
          value: E
        });
      }
      P++;
    }), P = 0, x.forEach((E) => {
      if (!O.has(E)) {
        const M = b.concat([P]);
        C.push({
          op: s,
          path: M,
          value: E
        }), R.unshift({
          op: l,
          path: M,
          value: E
        });
      }
      P++;
    });
  }
  function g(S, b, C) {
    const { patches_: R, inversePatches_: O } = C;
    R.push({
      op: o,
      path: [],
      value: b === nh ? void 0 : b
    }), O.push({
      op: o,
      path: [],
      value: S
    });
  }
  function y(S, b) {
    return b.forEach((C) => {
      const { path: R, op: O } = C;
      let x = S;
      for (let A = 0; A < R.length - 1; A++) {
        const I = ki(x);
        let L = R[A];
        typeof L != "string" && typeof L != "number" && (L = "" + L), (I === 0 || I === 1) && (L === "__proto__" || L === Fs) && Et(19), yi(x) && L === na && Et(19), x = lr(x, L), go(x) || Et(18, R.join("/"));
      }
      const P = ki(x), E = v(C.value), M = R[R.length - 1];
      switch (O) {
        case o:
          switch (P) {
            case 2:
              return x.set(M, E);
            case 3:
              Et(16);
            default:
              return x[M] = E;
          }
        case s:
          switch (P) {
            case 1:
              return M === "-" ? x.push(E) : x.splice(M, 0, E);
            case 2:
              return x.set(M, E);
            case 3:
              return x.add(E);
            default:
              return x[M] = E;
          }
        case l:
          switch (P) {
            case 1:
              return x.splice(M, 1);
            case 2:
              return x.delete(M);
            case 3:
              return x.delete(C.value);
            default:
              return delete x[M];
          }
        default:
          Et(17, O);
      }
    }), S;
  }
  function v(S) {
    if (!ln(S))
      return S;
    if (ia(S))
      return S.map(v);
    if (oa(S))
      return new Map(
        Array.from(S.entries()).map(([C, R]) => [C, v(R)])
      );
    if (sa(S))
      return new Set(Array.from(S).map(v));
    const b = Object.create(xi(S));
    for (const C in S)
      b[C] = v(S[C]);
    return $s(S, Ts) && (b[Ts] = S[Ts]), b;
  }
  function _(S) {
    return an(S) ? v(S) : S;
  }
  IF(Cu, {
    applyPatches_: y,
    generatePatches_: u,
    generateReplacementPatches_: g,
    getPath: t
  });
}
var Us = new UF(), aa = Us.produce, ES = /* @__PURE__ */ Us.produceWithPatches.bind(
  Us
), Gv = /* @__PURE__ */ Us.applyPatches.bind(Us);
function VF(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function HF(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function qF(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Yv = (e) => Array.isArray(e) ? e : [e];
function KF(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return qF(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function QF(e, t) {
  const r = [], { length: o } = e;
  for (let s = 0; s < o; s++)
    r.push(e[s].apply(null, t));
  return r;
}
var GF = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, YF = typeof WeakRef < "u" ? WeakRef : GF, JF = 0, Jv = 1;
function $l() {
  return {
    s: JF,
    v: void 0,
    o: null,
    p: null
  };
}
function Tu(e, t = {}) {
  let r = $l();
  const { resultEqualityCheck: o } = t;
  let s, l = 0;
  function u() {
    let d = r;
    const { length: p } = arguments;
    for (let y = 0, v = p; y < v; y++) {
      const _ = arguments[y];
      if (typeof _ == "function" || typeof _ == "object" && _ !== null) {
        let S = d.o;
        S === null && (d.o = S = /* @__PURE__ */ new WeakMap());
        const b = S.get(_);
        b === void 0 ? (d = $l(), S.set(_, d)) : d = b;
      } else {
        let S = d.p;
        S === null && (d.p = S = /* @__PURE__ */ new Map());
        const b = S.get(_);
        b === void 0 ? (d = $l(), S.set(_, d)) : d = b;
      }
    }
    const f = d;
    let g;
    if (d.s === Jv)
      g = d.v;
    else if (g = e.apply(null, arguments), l++, o) {
      const y = s?.deref?.() ?? s;
      y != null && o(y, g) && (g = y, l !== 0 && l--), s = typeof g == "object" && g !== null || typeof g == "function" ? new YF(g) : g;
    }
    return f.s = Jv, f.v = g, g;
  }
  return u.clearCache = () => {
    r = $l(), u.resetResultsCount();
  }, u.resultsCount = () => l, u.resetResultsCount = () => {
    l = 0;
  }, u;
}
function XF(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...s) => {
    let l = 0, u = 0, d, p = {}, f = s.pop();
    typeof f == "object" && (p = f, f = s.pop()), VF(
      f,
      `createSelector expects an output function after the inputs, but received: [${typeof f}]`
    );
    const g = {
      ...r,
      ...p
    }, {
      memoize: y,
      memoizeOptions: v = [],
      argsMemoize: _ = Tu,
      argsMemoizeOptions: S = []
    } = g, b = Yv(v), C = Yv(S), R = KF(s), O = y(function() {
      return l++, f.apply(
        null,
        arguments
      );
    }, ...b), x = _(function() {
      u++;
      const E = QF(
        R,
        arguments
      );
      return d = O.apply(null, E), d;
    }, ...C);
    return Object.assign(x, {
      resultFunc: f,
      memoizedResultFunc: O,
      dependencies: R,
      dependencyRecomputations: () => u,
      resetDependencyRecomputations: () => {
        u = 0;
      },
      lastResult: () => d,
      recomputations: () => l,
      resetRecomputations: () => {
        l = 0;
      },
      memoize: y,
      argsMemoize: _
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var oh = /* @__PURE__ */ XF(Tu), ZF = Object.assign(
  (e, t = oh) => {
    HF(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const r = Object.keys(e), o = r.map(
      (l) => e[l]
    );
    return t(
      o,
      (...l) => l.reduce((u, d, p) => (u[r[p]] = d, u), {})
    );
  },
  { withTypes: () => ZF }
);
function PS(e) {
  return ({ dispatch: r, getState: o }) => (s) => (l) => typeof l == "function" ? l(r, o, e) : s(l);
}
var ez = PS(), tz = PS, nz = { NODE_ENV: "production" }, rz = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? bu : bu.apply(null, arguments);
}, iz = (e) => e && typeof e.match == "function";
function Mn(e, t) {
  function r(...o) {
    if (t) {
      let s = t(...o);
      if (!s)
        throw new Error(vn(0));
      return {
        type: e,
        payload: s.payload,
        ..."meta" in s && {
          meta: s.meta
        },
        ..."error" in s && {
          error: s.error
        }
      };
    }
    return {
      type: e,
      payload: o[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (o) => yS(o) && o.type === e, r;
}
var RS = class bs extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, bs.prototype);
  }
  static get [Symbol.species]() {
    return bs;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new bs(...t[0].concat(this)) : new bs(...t.concat(this));
  }
};
function Xv(e) {
  return ln(e) ? aa(e, () => {
  }) : e;
}
function Ml(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function oz(e) {
  return typeof e == "boolean";
}
var sz = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: o = !0,
    serializableCheck: s = !0,
    actionCreatorCheck: l = !0
  } = t ?? {};
  let u = new RS();
  return r && (oz(r) ? u.push(ez) : u.push(tz(r.extraArgument))), u;
}, ec = "RTK_autoBatch", gs = () => (e) => ({
  payload: e,
  meta: {
    [ec]: !0
  }
}), Zv = (e) => (t) => {
  setTimeout(t, e);
}, az = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const o = t(...r);
  let s = !0, l = !1, u = !1;
  const d = /* @__PURE__ */ new Set(), p = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Zv(10)
  ) : e.type === "callback" ? e.queueNotification : Zv(e.timeout), f = () => {
    u = !1, l && (l = !1, d.forEach((g) => g()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(g) {
      const y = () => s && g(), v = o.subscribe(y);
      return d.add(g), () => {
        v(), d.delete(g);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(g) {
      try {
        return s = !g?.meta?.[ec], l = !s, l && (u || (u = !0, p(f))), o.dispatch(g);
      } finally {
        s = !0;
      }
    }
  });
}, lz = (e) => function(r) {
  const {
    autoBatch: o = !0
  } = r ?? {};
  let s = new RS(e);
  return o && s.push(az(typeof o == "object" ? o : void 0)), s;
};
function uz(e) {
  const t = sz(), {
    reducer: r = void 0,
    middleware: o,
    devTools: s = !0,
    preloadedState: l = void 0,
    enhancers: u = void 0
  } = e || {};
  let d;
  if (typeof r == "function")
    d = r;
  else if (qr(r))
    d = th(r);
  else
    throw new Error(vn(1));
  let p;
  typeof o == "function" ? p = o(t) : p = t();
  let f = bu;
  s && (f = rz({
    // Enable capture of stack traces for dispatched Redux actions
    trace: nz.NODE_ENV !== "production",
    ...typeof s == "object" && s
  }));
  const g = EF(...p), y = lz(g);
  let v = typeof u == "function" ? u(y) : y();
  const _ = f(...v);
  return mS(d, l, _);
}
function TS(e) {
  const t = {}, r = [];
  let o;
  const s = {
    addCase(l, u) {
      const d = typeof l == "string" ? l : l.type;
      if (!d)
        throw new Error(vn(28));
      if (d in t)
        throw new Error(vn(29));
      return t[d] = u, s;
    },
    addAsyncThunk(l, u) {
      return u.pending && (t[l.pending.type] = u.pending), u.rejected && (t[l.rejected.type] = u.rejected), u.fulfilled && (t[l.fulfilled.type] = u.fulfilled), u.settled && r.push({
        matcher: l.settled,
        reducer: u.settled
      }), s;
    },
    addMatcher(l, u) {
      return r.push({
        matcher: l,
        reducer: u
      }), s;
    },
    addDefaultCase(l) {
      return o = l, s;
    }
  };
  return e(s), [t, r, o];
}
function cz(e) {
  return typeof e == "function";
}
function dz(e, t) {
  let [r, o, s] = TS(t), l;
  if (cz(e))
    l = () => Xv(e());
  else {
    const d = Xv(e);
    l = () => d;
  }
  function u(d = l(), p) {
    let f = [r[p.type], ...o.filter(({
      matcher: g
    }) => g(p)).map(({
      reducer: g
    }) => g)];
    return f.filter((g) => !!g).length === 0 && (f = [s]), f.reduce((g, y) => {
      if (y)
        if (an(g)) {
          const _ = y(g, p);
          return _ === void 0 ? g : _;
        } else {
          if (ln(g))
            return aa(g, (v) => y(v, p));
          {
            const v = y(g, p);
            if (v === void 0) {
              if (g === null)
                return g;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return v;
          }
        }
      return g;
    }, d);
  }
  return u.getInitialState = l, u;
}
var $S = (e, t) => iz(e) ? e.match(t) : e(t);
function gr(...e) {
  return (t) => e.some((r) => $S(r, t));
}
function Ms(...e) {
  return (t) => e.every((r) => $S(r, t));
}
function tc(e, t) {
  if (!e || !e.meta) return !1;
  const r = typeof e.meta.requestId == "string", o = t.indexOf(e.meta.requestStatus) > -1;
  return r && o;
}
function la(e) {
  return typeof e[0] == "function" && "pending" in e[0] && "fulfilled" in e[0] && "rejected" in e[0];
}
function sh(...e) {
  return e.length === 0 ? (t) => tc(t, ["pending"]) : la(e) ? gr(...e.map((t) => t.pending)) : sh()(e[0]);
}
function mo(...e) {
  return e.length === 0 ? (t) => tc(t, ["rejected"]) : la(e) ? gr(...e.map((t) => t.rejected)) : mo()(e[0]);
}
function nc(...e) {
  const t = (r) => r && r.meta && r.meta.rejectedWithValue;
  return e.length === 0 ? Ms(mo(...e), t) : la(e) ? Ms(mo(...e), t) : nc()(e[0]);
}
function Kr(...e) {
  return e.length === 0 ? (t) => tc(t, ["fulfilled"]) : la(e) ? gr(...e.map((t) => t.fulfilled)) : Kr()(e[0]);
}
function gp(...e) {
  return e.length === 0 ? (t) => tc(t, ["pending", "fulfilled", "rejected"]) : la(e) ? gr(...e.flatMap((t) => [t.pending, t.rejected, t.fulfilled])) : gp()(e[0]);
}
var fz = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", ah = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += fz[Math.random() * 64 | 0];
  return t;
}, pz = ["name", "message", "stack", "code"], Ef = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, ew = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, hz = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const r of pz)
      typeof e[r] == "string" && (t[r] = e[r]);
    return t;
  }
  return {
    message: String(e)
  };
}, tw = "External signal was aborted", nw = /* @__PURE__ */ (() => {
  function e(t, r, o) {
    const s = Mn(t + "/fulfilled", (p, f, g, y) => ({
      payload: p,
      meta: {
        ...y || {},
        arg: g,
        requestId: f,
        requestStatus: "fulfilled"
      }
    })), l = Mn(t + "/pending", (p, f, g) => ({
      payload: void 0,
      meta: {
        ...g || {},
        arg: f,
        requestId: p,
        requestStatus: "pending"
      }
    })), u = Mn(t + "/rejected", (p, f, g, y, v) => ({
      payload: y,
      error: (o && o.serializeError || hz)(p || "Rejected"),
      meta: {
        ...v || {},
        arg: g,
        requestId: f,
        rejectedWithValue: !!y,
        requestStatus: "rejected",
        aborted: p?.name === "AbortError",
        condition: p?.name === "ConditionError"
      }
    }));
    function d(p, {
      signal: f
    } = {}) {
      return (g, y, v) => {
        const _ = o?.idGenerator ? o.idGenerator(p) : ah(), S = new AbortController();
        let b, C;
        function R(x) {
          C = x, S.abort();
        }
        f && (f.aborted ? R(tw) : f.addEventListener("abort", () => R(tw), {
          once: !0
        }));
        const O = async function() {
          let x;
          try {
            let E = o?.condition?.(p, {
              getState: y,
              extra: v
            });
            if (mz(E) && (E = await E), E === !1 || S.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const M = new Promise((A, I) => {
              b = () => {
                I({
                  name: "AbortError",
                  message: C || "Aborted"
                });
              }, S.signal.addEventListener("abort", b, {
                once: !0
              });
            });
            g(l(_, p, o?.getPendingMeta?.({
              requestId: _,
              arg: p
            }, {
              getState: y,
              extra: v
            }))), x = await Promise.race([M, Promise.resolve(r(p, {
              dispatch: g,
              getState: y,
              extra: v,
              requestId: _,
              signal: S.signal,
              abort: R,
              rejectWithValue: (A, I) => new Ef(A, I),
              fulfillWithValue: (A, I) => new ew(A, I)
            })).then((A) => {
              if (A instanceof Ef)
                throw A;
              return A instanceof ew ? s(A.payload, _, p, A.meta) : s(A, _, p);
            })]);
          } catch (E) {
            x = E instanceof Ef ? u(null, _, p, E.payload, E.meta) : u(E, _, p);
          } finally {
            b && S.signal.removeEventListener("abort", b);
          }
          return o && !o.dispatchConditionRejection && u.match(x) && x.meta.condition || g(x), x;
        }();
        return Object.assign(O, {
          abort: R,
          requestId: _,
          arg: p,
          unwrap() {
            return O.then(gz);
          }
        });
      };
    }
    return Object.assign(d, {
      pending: l,
      rejected: u,
      fulfilled: s,
      settled: gr(u, s),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function gz(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function mz(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var yz = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function vz(e, t) {
  return `${e}/${t}`;
}
function wz({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[yz];
  return function(o) {
    const {
      name: s,
      reducerPath: l = s
    } = o;
    if (!s)
      throw new Error(vn(11));
    const u = (typeof o.reducers == "function" ? o.reducers(bz()) : o.reducers) || {}, d = Object.keys(u), p = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, f = {
      addCase(x, P) {
        const E = typeof x == "string" ? x : x.type;
        if (!E)
          throw new Error(vn(12));
        if (E in p.sliceCaseReducersByType)
          throw new Error(vn(13));
        return p.sliceCaseReducersByType[E] = P, f;
      },
      addMatcher(x, P) {
        return p.sliceMatchers.push({
          matcher: x,
          reducer: P
        }), f;
      },
      exposeAction(x, P) {
        return p.actionCreators[x] = P, f;
      },
      exposeCaseReducer(x, P) {
        return p.sliceCaseReducersByName[x] = P, f;
      }
    };
    d.forEach((x) => {
      const P = u[x], E = {
        reducerName: x,
        type: vz(s, x),
        createNotation: typeof o.reducers == "function"
      };
      xz(P) ? Cz(E, P, f, t) : _z(E, P, f);
    });
    function g() {
      const [x = {}, P = [], E = void 0] = typeof o.extraReducers == "function" ? TS(o.extraReducers) : [o.extraReducers], M = {
        ...x,
        ...p.sliceCaseReducersByType
      };
      return dz(o.initialState, (A) => {
        for (let I in M)
          A.addCase(I, M[I]);
        for (let I of p.sliceMatchers)
          A.addMatcher(I.matcher, I.reducer);
        for (let I of P)
          A.addMatcher(I.matcher, I.reducer);
        E && A.addDefaultCase(E);
      });
    }
    const y = (x) => x, v = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new WeakMap();
    let S;
    function b(x, P) {
      return S || (S = g()), S(x, P);
    }
    function C() {
      return S || (S = g()), S.getInitialState();
    }
    function R(x, P = !1) {
      function E(A) {
        let I = A[x];
        return typeof I > "u" && P && (I = Ml(_, E, C)), I;
      }
      function M(A = y) {
        const I = Ml(v, P, () => /* @__PURE__ */ new WeakMap());
        return Ml(I, A, () => {
          const L = {};
          for (const [w, T] of Object.entries(o.selectors ?? {}))
            L[w] = Sz(T, A, () => Ml(_, A, C), P);
          return L;
        });
      }
      return {
        reducerPath: x,
        getSelectors: M,
        get selectors() {
          return M(E);
        },
        selectSlice: E
      };
    }
    const O = {
      name: s,
      reducer: b,
      actions: p.actionCreators,
      caseReducers: p.sliceCaseReducersByName,
      getInitialState: C,
      ...R(l),
      injectInto(x, {
        reducerPath: P,
        ...E
      } = {}) {
        const M = P ?? l;
        return x.inject({
          reducerPath: M,
          reducer: b
        }, E), {
          ...O,
          ...R(M, !0)
        };
      }
    };
    return O;
  };
}
function Sz(e, t, r, o) {
  function s(l, ...u) {
    let d = t(l);
    return typeof d > "u" && o && (d = r()), e(d, ...u);
  }
  return s.unwrapped = e, s;
}
var $n = /* @__PURE__ */ wz();
function bz() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function _z({
  type: e,
  reducerName: t,
  createNotation: r
}, o, s) {
  let l, u;
  if ("reducer" in o) {
    if (r && !kz(o))
      throw new Error(vn(17));
    l = o.reducer, u = o.prepare;
  } else
    l = o;
  s.addCase(e, l).exposeCaseReducer(t, l).exposeAction(t, u ? Mn(e, u) : Mn(e));
}
function xz(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function kz(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Cz({
  type: e,
  reducerName: t
}, r, o, s) {
  if (!s)
    throw new Error(vn(18));
  const {
    payloadCreator: l,
    fulfilled: u,
    pending: d,
    rejected: p,
    settled: f,
    options: g
  } = r, y = s(e, l, g);
  o.exposeAction(t, y), u && o.addCase(y.fulfilled, u), d && o.addCase(y.pending, d), p && o.addCase(y.rejected, p), f && o.addMatcher(y.settled, f), o.exposeCaseReducer(t, {
    fulfilled: u || Al,
    pending: d || Al,
    rejected: p || Al,
    settled: f || Al
  });
}
function Al() {
}
function vn(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Ez = {
  alert: null,
  playingAlertId: ""
}, MS = $n({
  name: "alerts",
  initialState: Ez,
  reducers: {
    setAlert: (e, t) => {
      e.alert = t.payload;
    },
    setTitleStyle: (e, t) => {
      e.alert && (e.alert.title_style = t.payload);
    },
    setMessageStyle: (e, t) => {
      e.alert && (e.alert.message_style = t.payload);
    },
    setPlayingAlertId: (e, t) => {
      e.playingAlertId = t.payload;
    }
  }
}), { setAlert: s5, setTitleStyle: a5, setMessageStyle: l5, setPlayingAlertId: AS } = MS.actions, Pz = {
  mediaSettings: null,
  playingMediaId: "",
  pausedMediaId: ""
}, IS = $n({
  name: "media",
  initialState: Pz,
  reducers: {
    setMediaSettings: (e, t) => {
      e.mediaSettings = t.payload;
    },
    setYoutubeSettings: (e, t) => {
      e.mediaSettings && (e.mediaSettings.youtube = t.payload);
    },
    setTwitchSettings: (e, t) => {
      e.mediaSettings && (e.mediaSettings.twitch = t.payload);
    },
    setTikTokSettings: (e, t) => {
      e.mediaSettings && (e.mediaSettings.tiktok = t.payload);
    },
    setPlayingMediaId: (e, t) => {
      e.playingMediaId = t.payload;
    },
    setPausedMediaId: (e, t) => {
      e.pausedMediaId = t.payload;
    }
  }
}), {
  setMediaSettings: u5,
  setYoutubeSettings: c5,
  setTwitchSettings: d5,
  setTikTokSettings: f5,
  setPlayingMediaId: OS,
  setPausedMediaId: lh
} = IS.actions;
var Rz = class extends Error {
  /**
   * The schema issues.
   */
  issues;
  /**
   * Creates a schema error with useful information.
   *
   * @param issues The schema issues.
   */
  constructor(e) {
    super(e[0].message), this.name = "SchemaError", this.issues = e;
  }
}, Tz = { NODE_ENV: "production" }, NS = /* @__PURE__ */ ((e) => (e.uninitialized = "uninitialized", e.pending = "pending", e.fulfilled = "fulfilled", e.rejected = "rejected", e))(NS || {}), mr = "uninitialized", mp = "pending", _s = "fulfilled", xs = "rejected";
function rw(e) {
  return {
    status: e,
    isUninitialized: e === mr,
    isLoading: e === mp,
    isSuccess: e === _s,
    isError: e === xs
  };
}
var iw = qr;
function uh(e, t) {
  if (e === t || !(iw(e) && iw(t) || Array.isArray(e) && Array.isArray(t)))
    return t;
  const r = Object.keys(t), o = Object.keys(e);
  let s = r.length === o.length;
  const l = Array.isArray(t) ? [] : {};
  for (const u of r)
    l[u] = uh(e[u], t[u]), s && (s = e[u] === l[u]);
  return s ? e : l;
}
function yp(e, t, r) {
  return e.reduce((o, s, l) => (t(s, l) && o.push(r(s, l)), o), []).flat();
}
function $z(e) {
  return new RegExp("(^|:)//").test(e);
}
function Mz() {
  return typeof document > "u" ? !0 : document.visibilityState !== "hidden";
}
function ch(e) {
  return e != null;
}
function ow(e) {
  return [...e?.values() ?? []].filter(ch);
}
function Az() {
  return typeof navigator > "u" || navigator.onLine === void 0 ? !0 : navigator.onLine;
}
var Iz = (e) => e.replace(/\/$/, ""), Oz = (e) => e.replace(/^\//, "");
function Nz(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  if ($z(t))
    return t;
  const r = e.endsWith("/") || !t.startsWith("?") ? "/" : "";
  return e = Iz(e), t = Oz(t), `${e}${r}${t}`;
}
function $u(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
var vp = () => /* @__PURE__ */ new Map(), Lz = (e) => {
  const t = new AbortController();
  return setTimeout(() => {
    const r = "signal timed out", o = "TimeoutError";
    t.abort(
      // some environments (React Native, Node) don't have DOMException
      typeof DOMException < "u" ? new DOMException(r, o) : Object.assign(new Error(r), {
        name: o
      })
    );
  }, e), t.signal;
}, Dz = (...e) => {
  for (const r of e) if (r.aborted) return AbortSignal.abort(r.reason);
  const t = new AbortController();
  for (const r of e)
    r.addEventListener("abort", () => t.abort(r.reason), {
      signal: t.signal,
      once: !0
    });
  return t.signal;
}, sw = (...e) => fetch(...e), Fz = (e) => e.status >= 200 && e.status <= 299, zz = (e) => (
  /*applicat*/
  /ion\/(vnd\.api\+)?json/.test(e.get("content-type") || "")
);
function aw(e) {
  if (!qr(e))
    return e;
  const t = {
    ...e
  };
  for (const [r, o] of Object.entries(t))
    o === void 0 && delete t[r];
  return t;
}
var jz = (e) => typeof e == "object" && (qr(e) || Array.isArray(e) || typeof e.toJSON == "function");
function Bz({
  baseUrl: e,
  prepareHeaders: t = (y) => y,
  fetchFn: r = sw,
  paramsSerializer: o,
  isJsonContentType: s = zz,
  jsonContentType: l = "application/json",
  jsonReplacer: u,
  timeout: d,
  responseHandler: p,
  validateStatus: f,
  ...g
} = {}) {
  return typeof fetch > "u" && r === sw && console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."), async (v, _, S) => {
    const {
      getState: b,
      extra: C,
      endpoint: R,
      forced: O,
      type: x
    } = _;
    let P, {
      url: E,
      headers: M = new Headers(g.headers),
      params: A = void 0,
      responseHandler: I = p ?? "json",
      validateStatus: L = f ?? Fz,
      timeout: w = d,
      ...T
    } = typeof v == "string" ? {
      url: v
    } : v, N = {
      ...g,
      signal: w ? Dz(_.signal, Lz(w)) : _.signal,
      ...T
    };
    M = new Headers(aw(M)), N.headers = await t(M, {
      getState: b,
      arg: v,
      extra: C,
      endpoint: R,
      forced: O,
      type: x,
      extraOptions: S
    }) || M;
    const V = jz(N.body);
    if (N.body != null && !V && typeof N.body != "string" && N.headers.delete("content-type"), !N.headers.has("content-type") && V && N.headers.set("content-type", l), V && s(N.headers) && (N.body = JSON.stringify(N.body, u)), N.headers.has("accept") || (I === "json" ? N.headers.set("accept", "application/json") : I === "text" && N.headers.set("accept", "text/plain, text/html, */*")), A) {
      const K = ~E.indexOf("?") ? "&" : "?", D = o ? o(A) : new URLSearchParams(aw(A));
      E += K + D;
    }
    E = Nz(e, E);
    const F = new Request(E, N);
    P = {
      request: new Request(E, N)
    };
    let H;
    try {
      H = await r(F);
    } catch (K) {
      return {
        error: {
          status: (K instanceof Error || typeof DOMException < "u" && K instanceof DOMException) && K.name === "TimeoutError" ? "TIMEOUT_ERROR" : "FETCH_ERROR",
          error: String(K)
        },
        meta: P
      };
    }
    const Y = H.clone();
    P.response = Y;
    let U, W = "";
    try {
      let K;
      if (await Promise.all([
        y(H, I).then((D) => U = D, (D) => K = D),
        // see https://github.com/node-fetch/node-fetch/issues/665#issuecomment-538995182
        // we *have* to "use up" both streams at the same time or they will stop running in node-fetch scenarios
        Y.text().then((D) => W = D, () => {
        })
      ]), K) throw K;
    } catch (K) {
      return {
        error: {
          status: "PARSING_ERROR",
          originalStatus: H.status,
          data: W,
          error: String(K)
        },
        meta: P
      };
    }
    return L(H, U) ? {
      data: U,
      meta: P
    } : {
      error: {
        status: H.status,
        data: U
      },
      meta: P
    };
  };
  async function y(v, _) {
    if (typeof _ == "function")
      return _(v);
    if (_ === "content-type" && (_ = s(v.headers) ? "json" : "text"), _ === "json") {
      const S = await v.text();
      return S.length ? JSON.parse(S) : null;
    }
    return v.text();
  }
}
var lw = class {
  constructor(e, t = void 0) {
    this.value = e, this.meta = t;
  }
}, rc = "__rtkq/", Uz = "online", Wz = "offline", LS = "focused", dh = /* @__PURE__ */ Mn(`${rc}${LS}`), DS = /* @__PURE__ */ Mn(`${rc}un${LS}`), fh = /* @__PURE__ */ Mn(`${rc}${Uz}`), FS = /* @__PURE__ */ Mn(`${rc}${Wz}`), ua = "query", zS = "mutation", jS = "infinitequery";
function ic(e) {
  return e.type === ua;
}
function Vz(e) {
  return e.type === zS;
}
function oc(e) {
  return e.type === jS;
}
function Mu(e) {
  return ic(e) || oc(e);
}
function ph(e, t, r, o, s, l) {
  const u = Hz(e) ? e(t, r, o, s) : e;
  return u ? yp(u, ch, (d) => l(BS(d))) : [];
}
function Hz(e) {
  return typeof e == "function";
}
function BS(e) {
  return typeof e == "string" ? {
    type: e
  } : e;
}
function qz(e, t) {
  return e.catch(t);
}
var yo = (e, t) => e.endpointDefinitions[t], Ws = Symbol("forceQueryFn"), wp = (e) => typeof e[Ws] == "function";
function Kz({
  serializeQueryArgs: e,
  queryThunk: t,
  infiniteQueryThunk: r,
  mutationThunk: o,
  api: s,
  context: l,
  getInternalState: u
}) {
  const d = (P) => u(P)?.runningQueries, p = (P) => u(P)?.runningMutations, {
    unsubscribeQueryResult: f,
    removeMutationResult: g,
    updateSubscriptionOptions: y
  } = s.internalActions;
  return {
    buildInitiateQuery: R,
    buildInitiateInfiniteQuery: O,
    buildInitiateMutation: x,
    getRunningQueryThunk: v,
    getRunningMutationThunk: _,
    getRunningQueriesThunk: S,
    getRunningMutationsThunk: b
  };
  function v(P, E) {
    return (M) => {
      const A = yo(l, P), I = e({
        queryArgs: E,
        endpointDefinition: A,
        endpointName: P
      });
      return d(M)?.get(I);
    };
  }
  function _(P, E) {
    return (M) => p(M)?.get(E);
  }
  function S() {
    return (P) => ow(d(P));
  }
  function b() {
    return (P) => ow(p(P));
  }
  function C(P, E) {
    const M = (A, {
      subscribe: I = !0,
      forceRefetch: L,
      subscriptionOptions: w,
      [Ws]: T,
      ...N
    } = {}) => (V, F) => {
      const j = e({
        queryArgs: A,
        endpointDefinition: E,
        endpointName: P
      });
      let H;
      const Y = {
        ...N,
        type: ua,
        subscribe: I,
        forceRefetch: L,
        subscriptionOptions: w,
        endpointName: P,
        originalArgs: A,
        queryCacheKey: j,
        [Ws]: T
      };
      if (ic(E))
        H = t(Y);
      else {
        const {
          direction: de,
          initialPageParam: he,
          refetchCachedPages: fe
        } = N;
        H = r({
          ...Y,
          // Supply these even if undefined. This helps with a field existence
          // check over in `buildSlice.ts`
          direction: de,
          initialPageParam: he,
          refetchCachedPages: fe
        });
      }
      const U = s.endpoints[P].select(A), W = V(H), K = U(F()), {
        requestId: D,
        abort: G
      } = W, oe = K.requestId !== D, te = d(V)?.get(j), se = () => U(F()), le = Object.assign(T ? (
        // a query has been forced (upsertQueryData)
        // -> we want to resolve it once data has been written with the data that will be written
        W.then(se)
      ) : oe && !te ? (
        // a query has been skipped due to a condition and we do not have any currently running query
        // -> we want to resolve it immediately with the current data
        Promise.resolve(K)
      ) : (
        // query just started or one is already in flight
        // -> wait for the running query, then resolve with data from after that
        Promise.all([te, W]).then(se)
      ), {
        arg: A,
        requestId: D,
        subscriptionOptions: w,
        queryCacheKey: j,
        abort: G,
        async unwrap() {
          const de = await le;
          if (de.isError)
            throw de.error;
          return de.data;
        },
        refetch: (de) => V(M(A, {
          subscribe: !1,
          forceRefetch: !0,
          ...de
        })),
        unsubscribe() {
          I && V(f({
            queryCacheKey: j,
            requestId: D
          }));
        },
        updateSubscriptionOptions(de) {
          le.subscriptionOptions = de, V(y({
            endpointName: P,
            requestId: D,
            queryCacheKey: j,
            options: de
          }));
        }
      });
      if (!te && !oe && !T) {
        const de = d(V);
        de.set(j, le), le.then(() => {
          de.delete(j);
        });
      }
      return le;
    };
    return M;
  }
  function R(P, E) {
    return C(P, E);
  }
  function O(P, E) {
    return C(P, E);
  }
  function x(P) {
    return (E, {
      track: M = !0,
      fixedCacheKey: A
    } = {}) => (I, L) => {
      const w = o({
        type: "mutation",
        endpointName: P,
        originalArgs: E,
        track: M,
        fixedCacheKey: A
      }), T = I(w), {
        requestId: N,
        abort: V,
        unwrap: F
      } = T, j = qz(T.unwrap().then((W) => ({
        data: W
      })), (W) => ({
        error: W
      })), H = () => {
        I(g({
          requestId: N,
          fixedCacheKey: A
        }));
      }, Y = Object.assign(j, {
        arg: T.arg,
        requestId: N,
        abort: V,
        unwrap: F,
        reset: H
      }), U = p(I);
      return U.set(N, Y), Y.then(() => {
        U.delete(N);
      }), A && (U.set(A, Y), Y.then(() => {
        U.get(A) === Y && U.delete(A);
      })), Y;
    };
  }
}
var US = class extends Rz {
  constructor(e, t, r, o) {
    super(e), this.value = t, this.schemaName = r, this._bqMeta = o;
  }
}, fi = (e, t) => Array.isArray(e) ? e.includes(t) : !!e;
async function pi(e, t, r, o) {
  const s = await e["~standard"].validate(t);
  if (s.issues)
    throw new US(s.issues, t, r, o);
  return s.value;
}
function uw(e) {
  return e;
}
var ms = (e = {}) => ({
  ...e,
  [ec]: !0
});
function Qz({
  reducerPath: e,
  baseQuery: t,
  context: {
    endpointDefinitions: r
  },
  serializeQueryArgs: o,
  api: s,
  assertTagType: l,
  selectors: u,
  onSchemaFailure: d,
  catchSchemaFailure: p,
  skipSchemaValidation: f
}) {
  const g = (T, N, V, F) => (j, H) => {
    const Y = r[T], U = o({
      queryArgs: N,
      endpointDefinition: Y,
      endpointName: T
    });
    if (j(s.internalActions.queryResultPatched({
      queryCacheKey: U,
      patches: V
    })), !F)
      return;
    const W = s.endpoints[T].select(N)(
      // Work around TS 4.1 mismatch
      H()
    ), K = ph(Y.providesTags, W.data, void 0, N, {}, l);
    j(s.internalActions.updateProvidedBy([{
      queryCacheKey: U,
      providedTags: K
    }]));
  };
  function y(T, N, V = 0) {
    const F = [N, ...T];
    return V && F.length > V ? F.slice(0, -1) : F;
  }
  function v(T, N, V = 0) {
    const F = [...T, N];
    return V && F.length > V ? F.slice(1) : F;
  }
  const _ = (T, N, V, F = !0) => (j, H) => {
    const U = s.endpoints[T].select(N)(
      // Work around TS 4.1 mismatch
      H()
    ), W = {
      patches: [],
      inversePatches: [],
      undo: () => j(s.util.patchQueryData(T, N, W.inversePatches, F))
    };
    if (U.status === mr)
      return W;
    let K;
    if ("data" in U)
      if (ln(U.data)) {
        const [D, G, oe] = ES(U.data, V);
        W.patches.push(...G), W.inversePatches.push(...oe), K = D;
      } else
        K = V(U.data), W.patches.push({
          op: "replace",
          path: [],
          value: K
        }), W.inversePatches.push({
          op: "replace",
          path: [],
          value: U.data
        });
    return W.patches.length === 0 || j(s.util.patchQueryData(T, N, W.patches, F)), W;
  }, S = (T, N, V) => (F) => F(s.endpoints[T].initiate(N, {
    subscribe: !1,
    forceRefetch: !0,
    [Ws]: () => ({
      data: V
    })
  })), b = (T, N) => T.query && T[N] ? T[N] : uw, C = async (T, {
    signal: N,
    abort: V,
    rejectWithValue: F,
    fulfillWithValue: j,
    dispatch: H,
    getState: Y,
    extra: U
  }) => {
    const W = r[T.endpointName], {
      metaSchema: K,
      skipSchemaValidation: D = f
    } = W, G = T.type === ua;
    try {
      let oe = uw;
      const te = {
        signal: N,
        abort: V,
        dispatch: H,
        getState: Y,
        extra: U,
        endpoint: T.endpointName,
        type: T.type,
        forced: G ? R(T, Y()) : void 0,
        queryCacheKey: G ? T.queryCacheKey : void 0
      }, se = G ? T[Ws] : void 0;
      let le;
      const de = async (fe, ue, we, _e) => {
        if (ue == null && fe.pages.length)
          return Promise.resolve({
            data: fe
          });
        const qe = {
          queryArg: T.originalArgs,
          pageParam: ue
        }, ze = await he(qe), st = _e ? y : v;
        return {
          data: {
            pages: st(fe.pages, ze.data, we),
            pageParams: st(fe.pageParams, ue, we)
          },
          meta: ze.meta
        };
      };
      async function he(fe) {
        let ue;
        const {
          extraOptions: we,
          argSchema: _e,
          rawResponseSchema: qe,
          responseSchema: ze
        } = W;
        if (_e && !fi(D, "arg") && (fe = await pi(
          _e,
          fe,
          "argSchema",
          {}
          // we don't have a meta yet, so we can't pass it
        )), se ? ue = se() : W.query ? (oe = b(W, "transformResponse"), ue = await t(W.query(fe), te, we)) : ue = await W.queryFn(fe, te, we, (Ze) => t(Ze, te, we)), typeof process < "u" && Tz.NODE_ENV, ue.error) throw new lw(ue.error, ue.meta);
        let {
          data: st
        } = ue;
        qe && !fi(D, "rawResponse") && (st = await pi(qe, ue.data, "rawResponseSchema", ue.meta));
        let ut = await oe(st, ue.meta, fe);
        return ze && !fi(D, "response") && (ut = await pi(ze, ut, "responseSchema", ue.meta)), {
          ...ue,
          data: ut
        };
      }
      if (G && "infiniteQueryOptions" in W) {
        const {
          infiniteQueryOptions: fe
        } = W, {
          maxPages: ue = 1 / 0
        } = fe, we = T.refetchCachedPages ?? fe.refetchCachedPages ?? !0;
        let _e;
        const qe = {
          pages: [],
          pageParams: []
        }, ze = u.selectQueryEntry(Y(), T.queryCacheKey)?.data, ut = /* arg.forceRefetch */ R(T, Y()) && !T.direction || !ze ? qe : ze;
        if ("direction" in T && T.direction && ut.pages.length) {
          const Ze = T.direction === "backward", Rt = (Ze ? WS : Sp)(fe, ut, T.originalArgs);
          _e = await de(ut, Rt, ue, Ze);
        } else {
          const {
            initialPageParam: Ze = fe.initialPageParam
          } = T, De = ze?.pageParams ?? [], Rt = De[0] ?? Ze, ct = De.length;
          if (_e = await de(ut, Rt, ue), se && (_e = {
            data: _e.data.pages[0]
          }), we)
            for (let We = 1; We < ct; We++) {
              const xe = Sp(fe, _e.data, T.originalArgs);
              _e = await de(_e.data, xe, ue);
            }
        }
        le = _e;
      } else
        le = await he(T.originalArgs);
      return K && !fi(D, "meta") && le.meta && (le.meta = await pi(K, le.meta, "metaSchema", le.meta)), j(le.data, ms({
        fulfilledTimeStamp: Date.now(),
        baseQueryMeta: le.meta
      }));
    } catch (oe) {
      let te = oe;
      if (te instanceof lw) {
        let se = b(W, "transformErrorResponse");
        const {
          rawErrorResponseSchema: le,
          errorResponseSchema: de
        } = W;
        let {
          value: he,
          meta: fe
        } = te;
        try {
          le && !fi(D, "rawErrorResponse") && (he = await pi(le, he, "rawErrorResponseSchema", fe)), K && !fi(D, "meta") && (fe = await pi(K, fe, "metaSchema", fe));
          let ue = await se(he, fe, T.originalArgs);
          return de && !fi(D, "errorResponse") && (ue = await pi(de, ue, "errorResponseSchema", fe)), F(ue, ms({
            baseQueryMeta: fe
          }));
        } catch (ue) {
          te = ue;
        }
      }
      try {
        if (te instanceof US) {
          const se = {
            endpoint: T.endpointName,
            arg: T.originalArgs,
            type: T.type,
            queryCacheKey: G ? T.queryCacheKey : void 0
          };
          W.onSchemaFailure?.(te, se), d?.(te, se);
          const {
            catchSchemaFailure: le = p
          } = W;
          if (le)
            return F(le(te, se), ms({
              baseQueryMeta: te._bqMeta
            }));
        }
      } catch (se) {
        te = se;
      }
      throw console.error(te), te;
    }
  };
  function R(T, N) {
    const V = u.selectQueryEntry(N, T.queryCacheKey), F = u.selectConfig(N).refetchOnMountOrArgChange, j = V?.fulfilledTimeStamp, H = T.forceRefetch ?? (T.subscribe && F);
    return H ? H === !0 || (Number(/* @__PURE__ */ new Date()) - Number(j)) / 1e3 >= H : !1;
  }
  const O = () => nw(`${e}/executeQuery`, C, {
    getPendingMeta({
      arg: N
    }) {
      const V = r[N.endpointName];
      return ms({
        startedTimeStamp: Date.now(),
        ...oc(V) ? {
          direction: N.direction
        } : {}
      });
    },
    condition(N, {
      getState: V
    }) {
      const F = V(), j = u.selectQueryEntry(F, N.queryCacheKey), H = j?.fulfilledTimeStamp, Y = N.originalArgs, U = j?.originalArgs, W = r[N.endpointName], K = N.direction;
      return wp(N) ? !0 : j?.status === "pending" ? !1 : R(N, F) || ic(W) && W?.forceRefetch?.({
        currentArg: Y,
        previousArg: U,
        endpointState: j,
        state: F
      }) ? !0 : !(H && !K);
    },
    dispatchConditionRejection: !0
  }), x = O(), P = O(), E = nw(`${e}/executeMutation`, C, {
    getPendingMeta() {
      return ms({
        startedTimeStamp: Date.now()
      });
    }
  }), M = (T) => "force" in T, A = (T) => "ifOlderThan" in T, I = (T, N, V = {}) => (F, j) => {
    const H = M(V) && V.force, Y = A(V) && V.ifOlderThan, U = (K = !0) => {
      const D = {
        forceRefetch: K,
        subscribe: !1
      };
      return s.endpoints[T].initiate(N, D);
    }, W = s.endpoints[T].select(N)(j());
    if (H)
      F(U());
    else if (Y) {
      const K = W?.fulfilledTimeStamp;
      if (!K) {
        F(U());
        return;
      }
      (Number(/* @__PURE__ */ new Date()) - Number(new Date(K))) / 1e3 >= Y && F(U());
    } else
      F(U(!1));
  };
  function L(T) {
    return (N) => N?.meta?.arg?.endpointName === T;
  }
  function w(T, N) {
    return {
      matchPending: Ms(sh(T), L(N)),
      matchFulfilled: Ms(Kr(T), L(N)),
      matchRejected: Ms(mo(T), L(N))
    };
  }
  return {
    queryThunk: x,
    mutationThunk: E,
    infiniteQueryThunk: P,
    prefetch: I,
    updateQueryData: _,
    upsertQueryData: S,
    patchQueryData: g,
    buildMatchThunkActions: w
  };
}
function Sp(e, {
  pages: t,
  pageParams: r
}, o) {
  const s = t.length - 1;
  return e.getNextPageParam(t[s], t, r[s], r, o);
}
function WS(e, {
  pages: t,
  pageParams: r
}, o) {
  return e.getPreviousPageParam?.(t[0], t, r[0], r, o);
}
function VS(e, t, r, o) {
  return ph(r[e.meta.arg.endpointName][t], Kr(e) ? e.payload : void 0, nc(e) ? e.payload : void 0, e.meta.arg.originalArgs, "baseQueryMeta" in e.meta ? e.meta.baseQueryMeta : void 0, o);
}
function cw(e) {
  return an(e) ? kS(e) : e;
}
function Il(e, t, r) {
  const o = e[t];
  o && r(o);
}
function Vs(e) {
  return ("arg" in e ? e.arg.fixedCacheKey : e.fixedCacheKey) ?? e.requestId;
}
function dw(e, t, r) {
  const o = e[Vs(t)];
  o && r(o);
}
var Ol = {};
function Gz({
  reducerPath: e,
  queryThunk: t,
  mutationThunk: r,
  serializeQueryArgs: o,
  context: {
    endpointDefinitions: s,
    apiUid: l,
    extractRehydrationInfo: u,
    hasRehydrationInfo: d
  },
  assertTagType: p,
  config: f
}) {
  const g = Mn(`${e}/resetApiState`);
  function y(L, w, T, N) {
    L[w.queryCacheKey] ??= {
      status: mr,
      endpointName: w.endpointName
    }, Il(L, w.queryCacheKey, (V) => {
      V.status = mp, V.requestId = T && V.requestId ? (
        // for `upsertQuery` **updates**, keep the current `requestId`
        V.requestId
      ) : (
        // for normal queries or `upsertQuery` **inserts** always update the `requestId`
        N.requestId
      ), w.originalArgs !== void 0 && (V.originalArgs = w.originalArgs), V.startedTimeStamp = N.startedTimeStamp;
      const F = s[N.arg.endpointName];
      oc(F) && "direction" in w && (V.direction = w.direction);
    });
  }
  function v(L, w, T, N) {
    Il(L, w.arg.queryCacheKey, (V) => {
      if (V.requestId !== w.requestId && !N) return;
      const {
        merge: F
      } = s[w.arg.endpointName];
      if (V.status = _s, F)
        if (V.data !== void 0) {
          const {
            fulfilledTimeStamp: j,
            arg: H,
            baseQueryMeta: Y,
            requestId: U
          } = w;
          let W = aa(V.data, (K) => F(K, T, {
            arg: H.originalArgs,
            baseQueryMeta: Y,
            fulfilledTimeStamp: j,
            requestId: U
          }));
          V.data = W;
        } else
          V.data = T;
      else
        V.data = s[w.arg.endpointName].structuralSharing ?? !0 ? uh(an(V.data) ? RF(V.data) : V.data, T) : T;
      delete V.error, V.fulfilledTimeStamp = w.fulfilledTimeStamp;
    });
  }
  const _ = $n({
    name: `${e}/queries`,
    initialState: Ol,
    reducers: {
      removeQueryResult: {
        reducer(L, {
          payload: {
            queryCacheKey: w
          }
        }) {
          delete L[w];
        },
        prepare: gs()
      },
      cacheEntriesUpserted: {
        reducer(L, w) {
          for (const T of w.payload) {
            const {
              queryDescription: N,
              value: V
            } = T;
            y(L, N, !0, {
              arg: N,
              requestId: w.meta.requestId,
              startedTimeStamp: w.meta.timestamp
            }), v(
              L,
              {
                arg: N,
                requestId: w.meta.requestId,
                fulfilledTimeStamp: w.meta.timestamp,
                baseQueryMeta: {}
              },
              V,
              // We know we're upserting here
              !0
            );
          }
        },
        prepare: (L) => ({
          payload: L.map((N) => {
            const {
              endpointName: V,
              arg: F,
              value: j
            } = N, H = s[V];
            return {
              queryDescription: {
                type: ua,
                endpointName: V,
                originalArgs: N.arg,
                queryCacheKey: o({
                  queryArgs: F,
                  endpointDefinition: H,
                  endpointName: V
                })
              },
              value: j
            };
          }),
          meta: {
            [ec]: !0,
            requestId: ah(),
            timestamp: Date.now()
          }
        })
      },
      queryResultPatched: {
        reducer(L, {
          payload: {
            queryCacheKey: w,
            patches: T
          }
        }) {
          Il(L, w, (N) => {
            N.data = Gv(N.data, T.concat());
          });
        },
        prepare: gs()
      }
    },
    extraReducers(L) {
      L.addCase(t.pending, (w, {
        meta: T,
        meta: {
          arg: N
        }
      }) => {
        const V = wp(N);
        y(w, N, V, T);
      }).addCase(t.fulfilled, (w, {
        meta: T,
        payload: N
      }) => {
        const V = wp(T.arg);
        v(w, T, N, V);
      }).addCase(t.rejected, (w, {
        meta: {
          condition: T,
          arg: N,
          requestId: V
        },
        error: F,
        payload: j
      }) => {
        Il(w, N.queryCacheKey, (H) => {
          if (!T) {
            if (H.requestId !== V) return;
            H.status = xs, H.error = j ?? F;
          }
        });
      }).addMatcher(d, (w, T) => {
        const {
          queries: N
        } = u(T);
        for (const [V, F] of Object.entries(N))
          // do not rehydrate entries that were currently in flight.
          (F?.status === _s || F?.status === xs) && (w[V] = F);
      });
    }
  }), S = $n({
    name: `${e}/mutations`,
    initialState: Ol,
    reducers: {
      removeMutationResult: {
        reducer(L, {
          payload: w
        }) {
          const T = Vs(w);
          T in L && delete L[T];
        },
        prepare: gs()
      }
    },
    extraReducers(L) {
      L.addCase(r.pending, (w, {
        meta: T,
        meta: {
          requestId: N,
          arg: V,
          startedTimeStamp: F
        }
      }) => {
        V.track && (w[Vs(T)] = {
          requestId: N,
          status: mp,
          endpointName: V.endpointName,
          startedTimeStamp: F
        });
      }).addCase(r.fulfilled, (w, {
        payload: T,
        meta: N
      }) => {
        N.arg.track && dw(w, N, (V) => {
          V.requestId === N.requestId && (V.status = _s, V.data = T, V.fulfilledTimeStamp = N.fulfilledTimeStamp);
        });
      }).addCase(r.rejected, (w, {
        payload: T,
        error: N,
        meta: V
      }) => {
        V.arg.track && dw(w, V, (F) => {
          F.requestId === V.requestId && (F.status = xs, F.error = T ?? N);
        });
      }).addMatcher(d, (w, T) => {
        const {
          mutations: N
        } = u(T);
        for (const [V, F] of Object.entries(N))
          // do not rehydrate entries that were currently in flight.
          (F?.status === _s || F?.status === xs) && // only rehydrate endpoints that were persisted using a `fixedCacheKey`
          V !== F?.requestId && (w[V] = F);
      });
    }
  }), b = {
    tags: {},
    keys: {}
  }, C = $n({
    name: `${e}/invalidation`,
    initialState: b,
    reducers: {
      updateProvidedBy: {
        reducer(L, w) {
          for (const {
            queryCacheKey: T,
            providedTags: N
          } of w.payload) {
            R(L, T);
            for (const {
              type: V,
              id: F
            } of N) {
              const j = (L.tags[V] ??= {})[F || "__internal_without_id"] ??= [];
              j.includes(T) || j.push(T);
            }
            L.keys[T] = N;
          }
        },
        prepare: gs()
      }
    },
    extraReducers(L) {
      L.addCase(_.actions.removeQueryResult, (w, {
        payload: {
          queryCacheKey: T
        }
      }) => {
        R(w, T);
      }).addMatcher(d, (w, T) => {
        const {
          provided: N
        } = u(T);
        for (const [V, F] of Object.entries(N.tags ?? {}))
          for (const [j, H] of Object.entries(F)) {
            const Y = (w.tags[V] ??= {})[j || "__internal_without_id"] ??= [];
            for (const U of H)
              Y.includes(U) || Y.push(U), w.keys[U] = N.keys[U];
          }
      }).addMatcher(gr(Kr(t), nc(t)), (w, T) => {
        O(w, [T]);
      }).addMatcher(_.actions.cacheEntriesUpserted.match, (w, T) => {
        const N = T.payload.map(({
          queryDescription: V,
          value: F
        }) => ({
          type: "UNKNOWN",
          payload: F,
          meta: {
            requestStatus: "fulfilled",
            requestId: "UNKNOWN",
            arg: V
          }
        }));
        O(w, N);
      });
    }
  });
  function R(L, w) {
    const T = cw(L.keys[w] ?? []);
    for (const N of T) {
      const V = N.type, F = N.id ?? "__internal_without_id", j = L.tags[V]?.[F];
      j && (L.tags[V][F] = cw(j).filter((H) => H !== w));
    }
    delete L.keys[w];
  }
  function O(L, w) {
    const T = w.map((N) => {
      const V = VS(N, "providesTags", s, p), {
        queryCacheKey: F
      } = N.meta.arg;
      return {
        queryCacheKey: F,
        providedTags: V
      };
    });
    C.caseReducers.updateProvidedBy(L, C.actions.updateProvidedBy(T));
  }
  const x = $n({
    name: `${e}/subscriptions`,
    initialState: Ol,
    reducers: {
      updateSubscriptionOptions(L, w) {
      },
      unsubscribeQueryResult(L, w) {
      },
      internal_getRTKQSubscriptions() {
      }
    }
  }), P = $n({
    name: `${e}/internalSubscriptions`,
    initialState: Ol,
    reducers: {
      subscriptionsUpdated: {
        reducer(L, w) {
          return Gv(L, w.payload);
        },
        prepare: gs()
      }
    }
  }), E = $n({
    name: `${e}/config`,
    initialState: {
      online: Az(),
      focused: Mz(),
      middlewareRegistered: !1,
      ...f
    },
    reducers: {
      middlewareRegistered(L, {
        payload: w
      }) {
        L.middlewareRegistered = L.middlewareRegistered === "conflict" || l !== w ? "conflict" : !0;
      }
    },
    extraReducers: (L) => {
      L.addCase(fh, (w) => {
        w.online = !0;
      }).addCase(FS, (w) => {
        w.online = !1;
      }).addCase(dh, (w) => {
        w.focused = !0;
      }).addCase(DS, (w) => {
        w.focused = !1;
      }).addMatcher(d, (w) => ({
        ...w
      }));
    }
  }), M = th({
    queries: _.reducer,
    mutations: S.reducer,
    provided: C.reducer,
    subscriptions: P.reducer,
    config: E.reducer
  }), A = (L, w) => M(g.match(w) ? void 0 : L, w), I = {
    ...E.actions,
    ..._.actions,
    ...x.actions,
    ...P.actions,
    ...S.actions,
    ...C.actions,
    resetApiState: g
  };
  return {
    reducer: A,
    actions: I
  };
}
var Tn = /* @__PURE__ */ Symbol.for("RTKQ/skipToken"), HS = {
  status: mr
}, fw = /* @__PURE__ */ aa(HS, () => {
}), pw = /* @__PURE__ */ aa(HS, () => {
});
function Yz({
  serializeQueryArgs: e,
  reducerPath: t,
  createSelector: r
}) {
  const o = (x) => fw, s = (x) => pw;
  return {
    buildQuerySelector: v,
    buildInfiniteQuerySelector: _,
    buildMutationSelector: S,
    selectInvalidatedBy: b,
    selectCachedArgsForQuery: C,
    selectApiState: u,
    selectQueries: d,
    selectMutations: f,
    selectQueryEntry: p,
    selectConfig: g
  };
  function l(x) {
    return {
      ...x,
      ...rw(x.status)
    };
  }
  function u(x) {
    return x[t];
  }
  function d(x) {
    return u(x)?.queries;
  }
  function p(x, P) {
    return d(x)?.[P];
  }
  function f(x) {
    return u(x)?.mutations;
  }
  function g(x) {
    return u(x)?.config;
  }
  function y(x, P, E) {
    return (M) => {
      if (M === Tn)
        return r(o, E);
      const A = e({
        queryArgs: M,
        endpointDefinition: P,
        endpointName: x
      });
      return r((L) => p(L, A) ?? fw, E);
    };
  }
  function v(x, P) {
    return y(x, P, l);
  }
  function _(x, P) {
    const {
      infiniteQueryOptions: E
    } = P;
    function M(A) {
      const I = {
        ...A,
        ...rw(A.status)
      }, {
        isLoading: L,
        isError: w,
        direction: T
      } = I, N = T === "forward", V = T === "backward";
      return {
        ...I,
        hasNextPage: R(E, I.data, I.originalArgs),
        hasPreviousPage: O(E, I.data, I.originalArgs),
        isFetchingNextPage: L && N,
        isFetchingPreviousPage: L && V,
        isFetchNextPageError: w && N,
        isFetchPreviousPageError: w && V
      };
    }
    return y(x, P, M);
  }
  function S() {
    return (x) => {
      let P;
      return typeof x == "object" ? P = Vs(x) ?? Tn : P = x, r(P === Tn ? s : (A) => u(A)?.mutations?.[P] ?? pw, l);
    };
  }
  function b(x, P) {
    const E = x[t], M = /* @__PURE__ */ new Set(), A = yp(P, ch, BS);
    for (const I of A) {
      const L = E.provided.tags[I.type];
      if (!L)
        continue;
      let w = (I.id !== void 0 ? (
        // id given: invalidate all queries that provide this type & id
        L[I.id]
      ) : (
        // no id: invalidate all queries that provide this type
        Object.values(L).flat()
      )) ?? [];
      for (const T of w)
        M.add(T);
    }
    return Array.from(M.values()).flatMap((I) => {
      const L = E.queries[I];
      return L ? {
        queryCacheKey: I,
        endpointName: L.endpointName,
        originalArgs: L.originalArgs
      } : [];
    });
  }
  function C(x, P) {
    return yp(Object.values(d(x)), (E) => E?.endpointName === P && E.status !== mr, (E) => E.originalArgs);
  }
  function R(x, P, E) {
    return P ? Sp(x, P, E) != null : !1;
  }
  function O(x, P, E) {
    return !P || !x.getPreviousPageParam ? !1 : WS(x, P, E) != null;
  }
}
var hw = WeakMap ? /* @__PURE__ */ new WeakMap() : void 0, gw = ({
  endpointName: e,
  queryArgs: t
}) => {
  let r = "";
  const o = hw?.get(t);
  if (typeof o == "string")
    r = o;
  else {
    const s = JSON.stringify(t, (l, u) => (u = typeof u == "bigint" ? {
      $bigint: u.toString()
    } : u, u = qr(u) ? Object.keys(u).sort().reduce((d, p) => (d[p] = u[p], d), {}) : u, u));
    qr(t) && hw?.set(t, s), r = s;
  }
  return `${e}(${r})`;
};
function qS(...e) {
  return function(r) {
    const o = Tu((f) => r.extractRehydrationInfo?.(f, {
      reducerPath: r.reducerPath ?? "api"
    })), s = {
      reducerPath: "api",
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: !1,
      refetchOnFocus: !1,
      refetchOnReconnect: !1,
      invalidationBehavior: "delayed",
      ...r,
      extractRehydrationInfo: o,
      serializeQueryArgs(f) {
        let g = gw;
        if ("serializeQueryArgs" in f.endpointDefinition) {
          const y = f.endpointDefinition.serializeQueryArgs;
          g = (v) => {
            const _ = y(v);
            return typeof _ == "string" ? _ : gw({
              ...v,
              queryArgs: _
            });
          };
        } else r.serializeQueryArgs && (g = r.serializeQueryArgs);
        return g(f);
      },
      tagTypes: [...r.tagTypes || []]
    }, l = {
      endpointDefinitions: {},
      batch(f) {
        f();
      },
      apiUid: ah(),
      extractRehydrationInfo: o,
      hasRehydrationInfo: Tu((f) => o(f) != null)
    }, u = {
      injectEndpoints: p,
      enhanceEndpoints({
        addTagTypes: f,
        endpoints: g
      }) {
        if (f)
          for (const y of f)
            s.tagTypes.includes(y) || s.tagTypes.push(y);
        if (g)
          for (const [y, v] of Object.entries(g))
            typeof v == "function" ? v(yo(l, y)) : Object.assign(yo(l, y) || {}, v);
        return u;
      }
    }, d = e.map((f) => f.init(u, s, l));
    function p(f) {
      const g = f.endpoints({
        query: (y) => ({
          ...y,
          type: ua
        }),
        mutation: (y) => ({
          ...y,
          type: zS
        }),
        infiniteQuery: (y) => ({
          ...y,
          type: jS
        })
      });
      for (const [y, v] of Object.entries(g)) {
        if (f.overrideExisting !== !0 && y in l.endpointDefinitions) {
          if (f.overrideExisting === "throw")
            throw new Error(vn(39));
          continue;
        }
        l.endpointDefinitions[y] = v;
        for (const _ of d)
          _.injectEndpoint(y, v);
      }
      return u;
    }
    return u.injectEndpoints({
      endpoints: r.endpoints
    });
  };
}
function ar(e, ...t) {
  return Object.assign(e, ...t);
}
var Jz = ({
  api: e,
  queryThunk: t,
  internalState: r,
  mwApi: o
}) => {
  const s = `${e.reducerPath}/subscriptions`;
  let l = null, u = null;
  const {
    updateSubscriptionOptions: d,
    unsubscribeQueryResult: p
  } = e.internalActions, f = (b, C) => {
    if (d.match(C)) {
      const {
        queryCacheKey: O,
        requestId: x,
        options: P
      } = C.payload, E = b.get(O);
      return E?.has(x) && E.set(x, P), !0;
    }
    if (p.match(C)) {
      const {
        queryCacheKey: O,
        requestId: x
      } = C.payload, P = b.get(O);
      return P && P.delete(x), !0;
    }
    if (e.internalActions.removeQueryResult.match(C))
      return b.delete(C.payload.queryCacheKey), !0;
    if (t.pending.match(C)) {
      const {
        meta: {
          arg: O,
          requestId: x
        }
      } = C, P = $u(b, O.queryCacheKey, vp);
      return O.subscribe && P.set(x, O.subscriptionOptions ?? P.get(x) ?? {}), !0;
    }
    let R = !1;
    if (t.rejected.match(C)) {
      const {
        meta: {
          condition: O,
          arg: x,
          requestId: P
        }
      } = C;
      if (O && x.subscribe) {
        const E = $u(b, x.queryCacheKey, vp);
        E.set(P, x.subscriptionOptions ?? E.get(P) ?? {}), R = !0;
      }
    }
    return R;
  }, g = () => r.currentSubscriptions, _ = {
    getSubscriptions: g,
    getSubscriptionCount: (b) => g().get(b)?.size ?? 0,
    isRequestSubscribed: (b, C) => !!g()?.get(b)?.get(C)
  };
  function S(b) {
    return JSON.parse(JSON.stringify(Object.fromEntries([...b].map(([C, R]) => [C, Object.fromEntries(R)]))));
  }
  return (b, C) => {
    if (l || (l = S(r.currentSubscriptions)), e.util.resetApiState.match(b))
      return l = {}, r.currentSubscriptions.clear(), u = null, [!0, !1];
    if (e.internalActions.internal_getRTKQSubscriptions.match(b))
      return [!1, _];
    const R = f(r.currentSubscriptions, b);
    let O = !0;
    if (R) {
      u || (u = setTimeout(() => {
        const E = S(r.currentSubscriptions), [, M] = ES(l, () => E);
        C.next(e.internalActions.subscriptionsUpdated(M)), l = E, u = null;
      }, 500));
      const x = typeof b.type == "string" && !!b.type.startsWith(s), P = t.rejected.match(b) && b.meta.condition && !!b.meta.arg.subscribe;
      O = !x && !P;
    }
    return [O, !1];
  };
}, Xz = 2147483647 / 1e3 - 1, Zz = ({
  reducerPath: e,
  api: t,
  queryThunk: r,
  context: o,
  internalState: s,
  selectors: {
    selectQueryEntry: l,
    selectConfig: u
  },
  getRunningQueryThunk: d,
  mwApi: p
}) => {
  const {
    removeQueryResult: f,
    unsubscribeQueryResult: g,
    cacheEntriesUpserted: y
  } = t.internalActions, v = gr(g.match, r.fulfilled, r.rejected, y.match);
  function _(x) {
    const P = s.currentSubscriptions.get(x);
    return P ? P.size > 0 : !1;
  }
  const S = {};
  function b(x) {
    for (const P of x.values())
      P?.abort?.();
  }
  const C = (x, P) => {
    const E = P.getState(), M = u(E);
    if (v(x)) {
      let A;
      if (y.match(x))
        A = x.payload.map((I) => I.queryDescription.queryCacheKey);
      else {
        const {
          queryCacheKey: I
        } = g.match(x) ? x.payload : x.meta.arg;
        A = [I];
      }
      R(A, P, M);
    }
    if (t.util.resetApiState.match(x)) {
      for (const [A, I] of Object.entries(S))
        I && clearTimeout(I), delete S[A];
      b(s.runningQueries), b(s.runningMutations);
    }
    if (o.hasRehydrationInfo(x)) {
      const {
        queries: A
      } = o.extractRehydrationInfo(x);
      R(Object.keys(A), P, M);
    }
  };
  function R(x, P, E) {
    const M = P.getState();
    for (const A of x) {
      const I = l(M, A);
      I?.endpointName && O(A, I.endpointName, P, E);
    }
  }
  function O(x, P, E, M) {
    const I = yo(o, P)?.keepUnusedDataFor ?? M.keepUnusedDataFor;
    if (I === 1 / 0)
      return;
    const L = Math.max(0, Math.min(I, Xz));
    if (!_(x)) {
      const w = S[x];
      w && clearTimeout(w), S[x] = setTimeout(() => {
        if (!_(x)) {
          const T = l(E.getState(), x);
          T?.endpointName && E.dispatch(d(T.endpointName, T.originalArgs))?.abort(), E.dispatch(f({
            queryCacheKey: x
          }));
        }
        delete S[x];
      }, L * 1e3);
    }
  }
  return C;
}, mw = new Error("Promise never resolved before cacheEntryRemoved."), ej = ({
  api: e,
  reducerPath: t,
  context: r,
  queryThunk: o,
  mutationThunk: s,
  internalState: l,
  selectors: {
    selectQueryEntry: u,
    selectApiState: d
  }
}) => {
  const p = gp(o), f = gp(s), g = Kr(o, s), y = {}, {
    removeQueryResult: v,
    removeMutationResult: _,
    cacheEntriesUpserted: S
  } = e.internalActions;
  function b(E, M, A) {
    const I = y[E];
    I?.valueResolved && (I.valueResolved({
      data: M,
      meta: A
    }), delete I.valueResolved);
  }
  function C(E) {
    const M = y[E];
    M && (delete y[E], M.cacheEntryRemoved());
  }
  function R(E) {
    const {
      arg: M,
      requestId: A
    } = E.meta, {
      endpointName: I,
      originalArgs: L
    } = M;
    return [I, L, A];
  }
  const O = (E, M, A) => {
    const I = x(E);
    function L(w, T, N, V) {
      const F = u(A, T), j = u(M.getState(), T);
      !F && j && P(w, V, T, M, N);
    }
    if (o.pending.match(E)) {
      const [w, T, N] = R(E);
      L(w, I, N, T);
    } else if (S.match(E))
      for (const {
        queryDescription: w,
        value: T
      } of E.payload) {
        const {
          endpointName: N,
          originalArgs: V,
          queryCacheKey: F
        } = w;
        L(N, F, E.meta.requestId, V), b(F, T, {});
      }
    else if (s.pending.match(E)) {
      if (M.getState()[t].mutations[I]) {
        const [T, N, V] = R(E);
        P(T, N, I, M, V);
      }
    } else if (g(E))
      b(I, E.payload, E.meta.baseQueryMeta);
    else if (v.match(E) || _.match(E))
      C(I);
    else if (e.util.resetApiState.match(E))
      for (const w of Object.keys(y))
        C(w);
  };
  function x(E) {
    return p(E) ? E.meta.arg.queryCacheKey : f(E) ? E.meta.arg.fixedCacheKey ?? E.meta.requestId : v.match(E) ? E.payload.queryCacheKey : _.match(E) ? Vs(E.payload) : "";
  }
  function P(E, M, A, I, L) {
    const w = yo(r, E), T = w?.onCacheEntryAdded;
    if (!T) return;
    const N = {}, V = new Promise((W) => {
      N.cacheEntryRemoved = W;
    }), F = Promise.race([new Promise((W) => {
      N.valueResolved = W;
    }), V.then(() => {
      throw mw;
    })]);
    F.catch(() => {
    }), y[A] = N;
    const j = e.endpoints[E].select(Mu(w) ? M : A), H = I.dispatch((W, K, D) => D), Y = {
      ...I,
      getCacheEntry: () => j(I.getState()),
      requestId: L,
      extra: H,
      updateCachedData: Mu(w) ? (W) => I.dispatch(e.util.updateQueryData(E, M, W)) : void 0,
      cacheDataLoaded: F,
      cacheEntryRemoved: V
    }, U = T(M, Y);
    Promise.resolve(U).catch((W) => {
      if (W !== mw)
        throw W;
    });
  }
  return O;
}, tj = ({
  api: e,
  context: {
    apiUid: t
  },
  reducerPath: r
}) => (o, s) => {
  e.util.resetApiState.match(o) && s.dispatch(e.internalActions.middlewareRegistered(t));
}, nj = ({
  reducerPath: e,
  context: t,
  context: {
    endpointDefinitions: r
  },
  mutationThunk: o,
  queryThunk: s,
  api: l,
  assertTagType: u,
  refetchQuery: d,
  internalState: p
}) => {
  const {
    removeQueryResult: f
  } = l.internalActions, g = gr(Kr(o), nc(o)), y = gr(Kr(s, o), mo(s, o));
  let v = [], _ = 0;
  const S = (R, O) => {
    (s.pending.match(R) || o.pending.match(R)) && _++, y(R) && (_ = Math.max(0, _ - 1)), g(R) ? C(VS(R, "invalidatesTags", r, u), O) : y(R) ? C([], O) : l.util.invalidateTags.match(R) && C(ph(R.payload, void 0, void 0, void 0, void 0, u), O);
  };
  function b() {
    return _ > 0;
  }
  function C(R, O) {
    const x = O.getState(), P = x[e];
    if (v.push(...R), P.config.invalidationBehavior === "delayed" && b())
      return;
    const E = v;
    if (v = [], E.length === 0) return;
    const M = l.util.selectInvalidatedBy(x, E);
    t.batch(() => {
      const A = Array.from(M.values());
      for (const {
        queryCacheKey: I
      } of A) {
        const L = P.queries[I], w = $u(p.currentSubscriptions, I, vp);
        L && (w.size === 0 ? O.dispatch(f({
          queryCacheKey: I
        })) : L.status !== mr && O.dispatch(d(L)));
      }
    });
  }
  return S;
}, rj = ({
  reducerPath: e,
  queryThunk: t,
  api: r,
  refetchQuery: o,
  internalState: s
}) => {
  const {
    currentPolls: l,
    currentSubscriptions: u
  } = s, d = /* @__PURE__ */ new Set();
  let p = null;
  const f = (C, R) => {
    (r.internalActions.updateSubscriptionOptions.match(C) || r.internalActions.unsubscribeQueryResult.match(C)) && g(C.payload.queryCacheKey, R), (t.pending.match(C) || t.rejected.match(C) && C.meta.condition) && g(C.meta.arg.queryCacheKey, R), (t.fulfilled.match(C) || t.rejected.match(C) && !C.meta.condition) && y(C.meta.arg, R), r.util.resetApiState.match(C) && (S(), p && (clearTimeout(p), p = null), d.clear());
  };
  function g(C, R) {
    d.add(C), p || (p = setTimeout(() => {
      for (const O of d)
        v({
          queryCacheKey: O
        }, R);
      d.clear(), p = null;
    }, 0));
  }
  function y({
    queryCacheKey: C
  }, R) {
    const O = R.getState()[e], x = O.queries[C], P = u.get(C);
    if (!x || x.status === mr) return;
    const {
      lowestPollingInterval: E,
      skipPollingIfUnfocused: M
    } = b(P);
    if (!Number.isFinite(E)) return;
    const A = l.get(C);
    A?.timeout && (clearTimeout(A.timeout), A.timeout = void 0);
    const I = Date.now() + E;
    l.set(C, {
      nextPollTimestamp: I,
      pollingInterval: E,
      timeout: setTimeout(() => {
        (O.config.focused || !M) && R.dispatch(o(x)), y({
          queryCacheKey: C
        }, R);
      }, E)
    });
  }
  function v({
    queryCacheKey: C
  }, R) {
    const x = R.getState()[e].queries[C], P = u.get(C);
    if (!x || x.status === mr)
      return;
    const {
      lowestPollingInterval: E
    } = b(P);
    if (!Number.isFinite(E)) {
      _(C);
      return;
    }
    const M = l.get(C), A = Date.now() + E;
    (!M || A < M.nextPollTimestamp) && y({
      queryCacheKey: C
    }, R);
  }
  function _(C) {
    const R = l.get(C);
    R?.timeout && clearTimeout(R.timeout), l.delete(C);
  }
  function S() {
    for (const C of l.keys())
      _(C);
  }
  function b(C = /* @__PURE__ */ new Map()) {
    let R = !1, O = Number.POSITIVE_INFINITY;
    for (const x of C.values())
      x.pollingInterval && (O = Math.min(x.pollingInterval, O), R = x.skipPollingIfUnfocused || R);
    return {
      lowestPollingInterval: O,
      skipPollingIfUnfocused: R
    };
  }
  return f;
}, ij = ({
  api: e,
  context: t,
  queryThunk: r,
  mutationThunk: o
}) => {
  const s = sh(r, o), l = mo(r, o), u = Kr(r, o), d = {};
  return (f, g) => {
    if (s(f)) {
      const {
        requestId: y,
        arg: {
          endpointName: v,
          originalArgs: _
        }
      } = f.meta, S = yo(t, v), b = S?.onQueryStarted;
      if (b) {
        const C = {}, R = new Promise((E, M) => {
          C.resolve = E, C.reject = M;
        });
        R.catch(() => {
        }), d[y] = C;
        const O = e.endpoints[v].select(Mu(S) ? _ : y), x = g.dispatch((E, M, A) => A), P = {
          ...g,
          getCacheEntry: () => O(g.getState()),
          requestId: y,
          extra: x,
          updateCachedData: Mu(S) ? (E) => g.dispatch(e.util.updateQueryData(v, _, E)) : void 0,
          queryFulfilled: R
        };
        b(_, P);
      }
    } else if (u(f)) {
      const {
        requestId: y,
        baseQueryMeta: v
      } = f.meta;
      d[y]?.resolve({
        data: f.payload,
        meta: v
      }), delete d[y];
    } else if (l(f)) {
      const {
        requestId: y,
        rejectedWithValue: v,
        baseQueryMeta: _
      } = f.meta;
      d[y]?.reject({
        error: f.payload ?? f.error,
        isUnhandledError: !v,
        meta: _
      }), delete d[y];
    }
  };
}, oj = ({
  reducerPath: e,
  context: t,
  api: r,
  refetchQuery: o,
  internalState: s
}) => {
  const {
    removeQueryResult: l
  } = r.internalActions, u = (p, f) => {
    dh.match(p) && d(f, "refetchOnFocus"), fh.match(p) && d(f, "refetchOnReconnect");
  };
  function d(p, f) {
    const g = p.getState()[e], y = g.queries, v = s.currentSubscriptions;
    t.batch(() => {
      for (const _ of v.keys()) {
        const S = y[_], b = v.get(_);
        if (!b || !S) continue;
        const C = [...b.values()];
        (C.some((O) => O[f] === !0) || C.every((O) => O[f] === void 0) && g.config[f]) && (b.size === 0 ? p.dispatch(l({
          queryCacheKey: _
        })) : S.status !== mr && p.dispatch(o(S)));
      }
    });
  }
  return u;
};
function sj(e) {
  const {
    reducerPath: t,
    queryThunk: r,
    api: o,
    context: s,
    getInternalState: l
  } = e, {
    apiUid: u
  } = s, d = {
    invalidateTags: Mn(`${t}/invalidateTags`)
  }, p = (v) => v.type.startsWith(`${t}/`), f = [tj, Zz, nj, rj, ej, ij];
  return {
    middleware: (v) => {
      let _ = !1;
      const S = l(v.dispatch), b = {
        ...e,
        internalState: S,
        refetchQuery: y,
        isThisApiSliceAction: p,
        mwApi: v
      }, C = f.map((x) => x(b)), R = Jz(b), O = oj(b);
      return (x) => (P) => {
        if (!yS(P))
          return x(P);
        _ || (_ = !0, v.dispatch(o.internalActions.middlewareRegistered(u)));
        const E = {
          ...v,
          next: x
        }, M = v.getState(), [A, I] = R(P, E, M);
        let L;
        if (A ? L = x(P) : L = I, v.getState()[t] && (O(P, E, M), p(P) || s.hasRehydrationInfo(P)))
          for (const w of C)
            w(P, E, M);
        return L;
      };
    },
    actions: d
  };
  function y(v) {
    return e.api.endpoints[v.endpointName].initiate(v.originalArgs, {
      subscribe: !1,
      forceRefetch: !0
    });
  }
}
var yw = /* @__PURE__ */ Symbol(), KS = ({
  createSelector: e = oh
} = {}) => ({
  name: yw,
  init(t, {
    baseQuery: r,
    tagTypes: o,
    reducerPath: s,
    serializeQueryArgs: l,
    keepUnusedDataFor: u,
    refetchOnMountOrArgChange: d,
    refetchOnFocus: p,
    refetchOnReconnect: f,
    invalidationBehavior: g,
    onSchemaFailure: y,
    catchSchemaFailure: v,
    skipSchemaValidation: _
  }, S) {
    WF();
    const b = (de) => de;
    Object.assign(t, {
      reducerPath: s,
      endpoints: {},
      internalActions: {
        onOnline: fh,
        onOffline: FS,
        onFocus: dh,
        onFocusLost: DS
      },
      util: {}
    });
    const C = Yz({
      serializeQueryArgs: l,
      reducerPath: s,
      createSelector: e
    }), {
      selectInvalidatedBy: R,
      selectCachedArgsForQuery: O,
      buildQuerySelector: x,
      buildInfiniteQuerySelector: P,
      buildMutationSelector: E
    } = C;
    ar(t.util, {
      selectInvalidatedBy: R,
      selectCachedArgsForQuery: O
    });
    const {
      queryThunk: M,
      infiniteQueryThunk: A,
      mutationThunk: I,
      patchQueryData: L,
      updateQueryData: w,
      upsertQueryData: T,
      prefetch: N,
      buildMatchThunkActions: V
    } = Qz({
      baseQuery: r,
      reducerPath: s,
      context: S,
      api: t,
      serializeQueryArgs: l,
      assertTagType: b,
      selectors: C,
      onSchemaFailure: y,
      catchSchemaFailure: v,
      skipSchemaValidation: _
    }), {
      reducer: F,
      actions: j
    } = Gz({
      context: S,
      queryThunk: M,
      mutationThunk: I,
      serializeQueryArgs: l,
      reducerPath: s,
      assertTagType: b,
      config: {
        refetchOnFocus: p,
        refetchOnReconnect: f,
        refetchOnMountOrArgChange: d,
        keepUnusedDataFor: u,
        reducerPath: s,
        invalidationBehavior: g
      }
    });
    ar(t.util, {
      patchQueryData: L,
      updateQueryData: w,
      upsertQueryData: T,
      prefetch: N,
      resetApiState: j.resetApiState,
      upsertQueryEntries: j.cacheEntriesUpserted
    }), ar(t.internalActions, j);
    const H = /* @__PURE__ */ new WeakMap(), Y = (de) => $u(H, de, () => ({
      currentSubscriptions: /* @__PURE__ */ new Map(),
      currentPolls: /* @__PURE__ */ new Map(),
      runningQueries: /* @__PURE__ */ new Map(),
      runningMutations: /* @__PURE__ */ new Map()
    })), {
      buildInitiateQuery: U,
      buildInitiateInfiniteQuery: W,
      buildInitiateMutation: K,
      getRunningMutationThunk: D,
      getRunningMutationsThunk: G,
      getRunningQueriesThunk: oe,
      getRunningQueryThunk: te
    } = Kz({
      queryThunk: M,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      serializeQueryArgs: l,
      context: S,
      getInternalState: Y
    });
    ar(t.util, {
      getRunningMutationThunk: D,
      getRunningMutationsThunk: G,
      getRunningQueryThunk: te,
      getRunningQueriesThunk: oe
    });
    const {
      middleware: se,
      actions: le
    } = sj({
      reducerPath: s,
      context: S,
      queryThunk: M,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      assertTagType: b,
      selectors: C,
      getRunningQueryThunk: te,
      getInternalState: Y
    });
    return ar(t.util, le), ar(t, {
      reducer: F,
      middleware: se
    }), {
      name: yw,
      injectEndpoint(de, he) {
        const fe = t, ue = fe.endpoints[de] ??= {};
        ic(he) && ar(ue, {
          name: de,
          select: x(de, he),
          initiate: U(de, he)
        }, V(M, de)), Vz(he) && ar(ue, {
          name: de,
          select: E(),
          initiate: K(de)
        }, V(I, de)), oc(he) && ar(ue, {
          name: de,
          select: P(de, he),
          initiate: W(de, he)
        }, V(M, de));
      }
    };
  }
});
KS();
function Nl(e) {
  return e.replace(e[0], e[0].toUpperCase());
}
var aj = "query", lj = "mutation", uj = "infinitequery";
function cj(e) {
  return e.type === aj;
}
function dj(e) {
  return e.type === lj;
}
function QS(e) {
  return e.type === uj;
}
function ys(e, ...t) {
  return Object.assign(e, ...t);
}
var Pf = Symbol();
function Rf(e) {
  const t = k.useRef(e), r = k.useMemo(() => uh(t.current, e), [e]);
  return k.useEffect(() => {
    t.current !== r && (t.current = r);
  }, [r]), r;
}
function oo(e) {
  const t = k.useRef(e);
  return k.useEffect(() => {
    Rs(t.current, e) || (t.current = e);
  }, [e]), Rs(t.current, e) ? t.current : e;
}
var fj = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", pj = /* @__PURE__ */ fj(), hj = () => typeof navigator < "u" && navigator.product === "ReactNative", gj = /* @__PURE__ */ hj(), mj = () => pj || gj ? k.useLayoutEffect : k.useEffect, yj = /* @__PURE__ */ mj(), vw = (e) => e.isUninitialized ? {
  ...e,
  isUninitialized: !1,
  isFetching: !0,
  isLoading: e.data === void 0,
  // This is the one place where we still have to use `QueryStatus` as an enum,
  // since it's the only reference in the React package and not in the core.
  status: NS.pending
} : e;
function Tf(e, ...t) {
  const r = {};
  return t.forEach((o) => {
    r[o] = e[o];
  }), r;
}
var $f = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function vj({
  api: e,
  moduleOptions: {
    batch: t,
    hooks: {
      useDispatch: r,
      useSelector: o,
      useStore: s
    },
    unstable__sideEffectsInRender: l,
    createSelector: u
  },
  serializeQueryArgs: d,
  context: p
}) {
  const f = l ? (M) => M() : k.useEffect, g = (M) => M.current?.unsubscribe?.(), y = p.endpointDefinitions;
  return {
    buildQueryHooks: x,
    buildInfiniteQueryHooks: P,
    buildMutationHook: E,
    usePrefetch: S
  };
  function v(M, A, I) {
    if (A?.endpointName && M.isUninitialized) {
      const {
        endpointName: F
      } = A, j = y[F];
      I !== Tn && d({
        queryArgs: A.originalArgs,
        endpointDefinition: j,
        endpointName: F
      }) === d({
        queryArgs: I,
        endpointDefinition: j,
        endpointName: F
      }) && (A = void 0);
    }
    let L = M.isSuccess ? M.data : A?.data;
    L === void 0 && (L = M.data);
    const w = L !== void 0, T = M.isLoading, N = (!A || A.isLoading || A.isUninitialized) && !w && T, V = M.isSuccess || w && (T && !A?.isError || M.isUninitialized);
    return {
      ...M,
      data: L,
      currentData: M.data,
      isFetching: T,
      isLoading: N,
      isSuccess: V
    };
  }
  function _(M, A, I) {
    if (A?.endpointName && M.isUninitialized) {
      const {
        endpointName: F
      } = A, j = y[F];
      I !== Tn && d({
        queryArgs: A.originalArgs,
        endpointDefinition: j,
        endpointName: F
      }) === d({
        queryArgs: I,
        endpointDefinition: j,
        endpointName: F
      }) && (A = void 0);
    }
    let L = M.isSuccess ? M.data : A?.data;
    L === void 0 && (L = M.data);
    const w = L !== void 0, T = M.isLoading, N = (!A || A.isLoading || A.isUninitialized) && !w && T, V = M.isSuccess || T && w;
    return {
      ...M,
      data: L,
      currentData: M.data,
      isFetching: T,
      isLoading: N,
      isSuccess: V
    };
  }
  function S(M, A) {
    const I = r(), L = oo(A);
    return k.useCallback((w, T) => I(e.util.prefetch(M, w, {
      ...L,
      ...T
    })), [M, I, L]);
  }
  function b(M, A, {
    refetchOnReconnect: I,
    refetchOnFocus: L,
    refetchOnMountOrArgChange: w,
    skip: T = !1,
    pollingInterval: N = 0,
    skipPollingIfUnfocused: V = !1,
    ...F
  } = {}) {
    const {
      initiate: j
    } = e.endpoints[M], H = r(), Y = k.useRef(void 0);
    if (!Y.current) {
      const fe = H(e.internalActions.internal_getRTKQSubscriptions());
      Y.current = fe;
    }
    const U = Rf(T ? Tn : A), W = oo({
      refetchOnReconnect: I,
      refetchOnFocus: L,
      pollingInterval: N,
      skipPollingIfUnfocused: V
    }), K = F.initialPageParam, D = oo(K), G = F.refetchCachedPages, oe = oo(G), te = k.useRef(void 0);
    let {
      queryCacheKey: se,
      requestId: le
    } = te.current || {}, de = !1;
    se && le && (de = Y.current.isRequestSubscribed(se, le));
    const he = !de && te.current !== void 0;
    return f(() => {
      he && (te.current = void 0);
    }, [he]), f(() => {
      const fe = te.current;
      if (U === Tn) {
        fe?.unsubscribe(), te.current = void 0;
        return;
      }
      const ue = te.current?.subscriptionOptions;
      if (!fe || fe.arg !== U) {
        fe?.unsubscribe();
        const we = H(j(U, {
          subscriptionOptions: W,
          forceRefetch: w,
          ...QS(y[M]) ? {
            initialPageParam: D,
            refetchCachedPages: oe
          } : {}
        }));
        te.current = we;
      } else W !== ue && fe.updateSubscriptionOptions(W);
    }, [H, j, w, U, W, he, D, oe, M]), [te, H, j, W];
  }
  function C(M, A) {
    return (L, {
      skip: w = !1,
      selectFromResult: T
    } = {}) => {
      const {
        select: N
      } = e.endpoints[M], V = Rf(w ? Tn : L), F = k.useRef(void 0), j = k.useMemo(() => (
        // Normally ts-ignores are bad and should be avoided, but we're
        // already casting this selector to be `Selector<any>` anyway,
        // so the inconsistencies don't matter here
        // @ts-ignore
        u([
          // @ts-ignore
          N(V),
          (K, D) => D,
          (K) => V
        ], A, {
          memoizeOptions: {
            resultEqualityCheck: Rs
          }
        })
      ), [N, V]), H = k.useMemo(() => T ? u([j], T, {
        devModeChecks: {
          identityFunctionCheck: "never"
        }
      }) : j, [j, T]), Y = o((K) => H(K, F.current), Rs), U = s(), W = j(U.getState(), F.current);
      return yj(() => {
        F.current = W;
      }, [W]), Y;
    };
  }
  function R(M) {
    k.useEffect(() => () => {
      g(M), M.current = void 0;
    }, [M]);
  }
  function O(M) {
    if (!M.current) throw new Error(vn(38));
    return M.current.refetch();
  }
  function x(M) {
    const A = (w, T = {}) => {
      const [N] = b(M, w, T);
      return R(N), k.useMemo(() => ({
        /**
         * A method to manually refetch data for the query
         */
        refetch: () => O(N)
      }), [N]);
    }, I = ({
      refetchOnReconnect: w,
      refetchOnFocus: T,
      pollingInterval: N = 0,
      skipPollingIfUnfocused: V = !1
    } = {}) => {
      const {
        initiate: F
      } = e.endpoints[M], j = r(), [H, Y] = k.useState(Pf), U = k.useRef(void 0), W = oo({
        refetchOnReconnect: w,
        refetchOnFocus: T,
        pollingInterval: N,
        skipPollingIfUnfocused: V
      });
      f(() => {
        const oe = U.current?.subscriptionOptions;
        W !== oe && U.current?.updateSubscriptionOptions(W);
      }, [W]);
      const K = k.useRef(W);
      f(() => {
        K.current = W;
      }, [W]);
      const D = k.useCallback(function(oe, te = !1) {
        let se;
        return t(() => {
          g(U), U.current = se = j(F(oe, {
            subscriptionOptions: K.current,
            forceRefetch: !te
          })), Y(oe);
        }), se;
      }, [j, F]), G = k.useCallback(() => {
        U.current?.queryCacheKey && j(e.internalActions.removeQueryResult({
          queryCacheKey: U.current?.queryCacheKey
        }));
      }, [j]);
      return k.useEffect(() => () => {
        g(U);
      }, []), k.useEffect(() => {
        H !== Pf && !U.current && D(H, !0);
      }, [H, D]), k.useMemo(() => [D, H, {
        reset: G
      }], [D, H, G]);
    }, L = C(M, v);
    return {
      useQueryState: L,
      useQuerySubscription: A,
      useLazyQuerySubscription: I,
      useLazyQuery(w) {
        const [T, N, {
          reset: V
        }] = I(w), F = L(N, {
          ...w,
          skip: N === Pf
        }), j = k.useMemo(() => ({
          lastArg: N
        }), [N]);
        return k.useMemo(() => [T, {
          ...F,
          reset: V
        }, j], [T, F, V, j]);
      },
      useQuery(w, T) {
        const N = A(w, T), V = L(w, {
          selectFromResult: w === Tn || T?.skip ? void 0 : vw,
          ...T
        }), F = Tf(V, ...$f);
        return k.useDebugValue(F), k.useMemo(() => ({
          ...V,
          ...N
        }), [V, N]);
      }
    };
  }
  function P(M) {
    const A = (L, w = {}) => {
      const [T, N, V, F] = b(M, L, w), j = k.useRef(F);
      f(() => {
        j.current = F;
      }, [F]);
      const H = w.refetchCachedPages, Y = oo(H), U = k.useCallback(function(D, G) {
        let oe;
        return t(() => {
          g(T), T.current = oe = N(V(D, {
            subscriptionOptions: j.current,
            direction: G
          }));
        }), oe;
      }, [T, N, V]);
      R(T);
      const W = Rf(w.skip ? Tn : L), K = k.useCallback((D) => {
        if (!T.current) throw new Error(vn(38));
        const G = {
          refetchCachedPages: D?.refetchCachedPages ?? Y
        };
        return T.current.refetch(G);
      }, [T, Y]);
      return k.useMemo(() => ({
        trigger: U,
        /**
         * A method to manually refetch data for the query
         */
        refetch: K,
        fetchNextPage: () => U(W, "forward"),
        fetchPreviousPage: () => U(W, "backward")
      }), [K, U, W]);
    }, I = C(M, _);
    return {
      useInfiniteQueryState: I,
      useInfiniteQuerySubscription: A,
      useInfiniteQuery(L, w) {
        const {
          refetch: T,
          fetchNextPage: N,
          fetchPreviousPage: V
        } = A(L, w), F = I(L, {
          selectFromResult: L === Tn || w?.skip ? void 0 : vw,
          ...w
        }), j = Tf(F, ...$f, "hasNextPage", "hasPreviousPage");
        return k.useDebugValue(j), k.useMemo(() => ({
          ...F,
          fetchNextPage: N,
          fetchPreviousPage: V,
          refetch: T
        }), [F, N, V, T]);
      }
    };
  }
  function E(M) {
    return ({
      selectFromResult: A,
      fixedCacheKey: I
    } = {}) => {
      const {
        select: L,
        initiate: w
      } = e.endpoints[M], T = r(), [N, V] = k.useState();
      k.useEffect(() => () => {
        N?.arg.fixedCacheKey || N?.reset();
      }, [N]);
      const F = k.useCallback(function(oe) {
        const te = T(w(oe, {
          fixedCacheKey: I
        }));
        return V(te), te;
      }, [T, w, I]), {
        requestId: j
      } = N || {}, H = k.useMemo(() => L({
        fixedCacheKey: I,
        requestId: N?.requestId
      }), [I, N, L]), Y = k.useMemo(() => A ? u([H], A) : H, [A, H]), U = o(Y, Rs), W = I == null ? N?.arg.originalArgs : void 0, K = k.useCallback(() => {
        t(() => {
          N && V(void 0), I && T(e.internalActions.removeMutationResult({
            requestId: j,
            fixedCacheKey: I
          }));
        });
      }, [T, I, N, j]), D = Tf(U, ...$f, "endpointName");
      k.useDebugValue(D);
      const G = k.useMemo(() => ({
        ...U,
        originalArgs: W,
        reset: K
      }), [U, W, K]);
      return k.useMemo(() => [F, G], [F, G]);
    };
  }
}
var wj = /* @__PURE__ */ Symbol(), Sj = ({
  batch: e = SF,
  hooks: t = {
    useDispatch: Ju,
    useSelector: qn,
    useStore: hS
  },
  createSelector: r = oh,
  unstable__sideEffectsInRender: o = !1,
  ...s
} = {}) => ({
  name: wj,
  init(l, {
    serializeQueryArgs: u
  }, d) {
    const p = l, {
      buildQueryHooks: f,
      buildInfiniteQueryHooks: g,
      buildMutationHook: y,
      usePrefetch: v
    } = vj({
      api: l,
      moduleOptions: {
        batch: e,
        hooks: t,
        unstable__sideEffectsInRender: o,
        createSelector: r
      },
      serializeQueryArgs: u,
      context: d
    });
    return ys(p, {
      usePrefetch: v
    }), ys(d, {
      batch: e
    }), {
      injectEndpoint(_, S) {
        if (cj(S)) {
          const {
            useQuery: b,
            useLazyQuery: C,
            useLazyQuerySubscription: R,
            useQueryState: O,
            useQuerySubscription: x
          } = f(_);
          ys(p.endpoints[_], {
            useQuery: b,
            useLazyQuery: C,
            useLazyQuerySubscription: R,
            useQueryState: O,
            useQuerySubscription: x
          }), l[`use${Nl(_)}Query`] = b, l[`useLazy${Nl(_)}Query`] = C;
        }
        if (dj(S)) {
          const b = y(_);
          ys(p.endpoints[_], {
            useMutation: b
          }), l[`use${Nl(_)}Mutation`] = b;
        } else if (QS(S)) {
          const {
            useInfiniteQuery: b,
            useInfiniteQuerySubscription: C,
            useInfiniteQueryState: R
          } = g(_);
          ys(p.endpoints[_], {
            useInfiniteQuery: b,
            useInfiniteQuerySubscription: C,
            useInfiniteQueryState: R
          }), l[`use${Nl(_)}InfiniteQuery`] = b;
        }
      }
    };
  }
}), bj = /* @__PURE__ */ qS(KS(), Sj());
const yr = bj({
  reducerPath: "widget-api",
  tagTypes: ["Messages", "Widgets"],
  baseQuery: Bz({ baseUrl: "http://localhost:12553/api" }),
  endpoints: () => ({})
}), ks = yr.injectEndpoints({
  endpoints: (e) => ({
    getWidgetById: e.query({
      query: (t) => ({
        url: `/widgets/${t.id}`
      }),
      providesTags: ["Widgets"]
    }),
    updateWidgetViewStorage: e.mutation({
      query: (t) => ({
        url: `/widgets/view/storage/${t.id}`,
        body: t.viewStorage,
        method: "PATCH"
      }),
      invalidatesTags: ["Widgets"]
    }),
    updateControlViewStorage: e.mutation({
      query: (t) => ({
        url: `/widgets/control/storage/${t.id}`,
        body: t.controlStorage,
        method: "PATCH"
      }),
      invalidatesTags: ["Widgets"]
    })
  })
}), {
  useGetWidgetByIdQuery: _j
} = ks, bn = () => {
  const e = k.useContext(gS);
  if (!e)
    throw new Error("useAppEvents must be used within a EventsProvider");
  return e;
}, xj = yr.injectEndpoints({
  endpoints: (e) => ({
    getAlerts: e.query({
      query: () => ({
        url: "/alerts"
      })
    })
  })
}), kj = yr.injectEndpoints({
  endpoints: (e) => ({
    getAucFighterSettings: e.query({
      query: () => ({
        url: "/auc-fighter-settings"
      })
    })
  })
}), GS = yr.injectEndpoints({
  endpoints: (e) => ({
    getNotEndedGoal: e.query({
      query: (t) => ({
        params: { ...t },
        url: "/goals"
      })
    })
  })
}), { useGetNotEndedGoalQuery: Cj } = GS, hh = yr.injectEndpoints({
  endpoints: (e) => ({
    getMessages: e.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 100
        },
        getNextPageParam: (t, r, o, s) => {
          const l = o.offset + o.limit;
          if (!(t?.length < o.limit))
            return {
              ...o,
              offset: l
            };
        }
      },
      query: ({ pageParam: t, queryArg: r }) => ({
        url: "/messages",
        params: { ...t, ...r.filter }
      }),
      providesTags: ["Messages"]
    })
  })
}), { useGetMessagesInfiniteQuery: Ej } = hh, Pj = yr.injectEndpoints({
  endpoints: (e) => ({
    getSettings: e.query({
      query: () => ({
        url: "/settings"
      })
    })
  })
}), Rj = (e) => {
  const t = k.useRef(null), r = bn(), o = Ju(), s = async (l) => {
    const { id: u, scope: d, arg: p } = l.data;
    if (e && u && d && e.manifest.scopes.includes(d))
      try {
        switch (d) {
          case "widgets:messages.subscription":
            r.subscribe(
              ie.Message,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:goal.subscription":
            r.subscribe(ie.Goal, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:settings.subscription":
            r.subscribe(ie.Settings, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:goals.read": {
            const { data: f, error: g } = await o(
              GS.endpoints.getNotEndedGoal.initiate(
                p,
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:auc-fighter:settings.read": {
            const { data: f, error: g } = await o(
              kj.endpoints.getAucFighterSettings.initiate(
                void 0,
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:auc-fighter:start-match.subscription":
            r.subscribe(
              ie.StartAucFighterMatch,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:auc-fighter:match-winner.send":
            r.send({
              event: ie.AucFighterMatchEnd,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:match-playing.send":
            r.send({
              event: ie.AucFighterMatchPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:pause-match.subscription":
            r.subscribe(
              ie.PauseAucFighterMatch,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:auc-fighter:match-paused.send":
            r.send({
              event: ie.AucFighterMatchPaused,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:resume-match.subscription":
            r.subscribe(ie.ResumeAucFighterMatch, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:auc-fighter:cancel-match.subscription":
            r.subscribe(ie.CancelAucFighterMatch, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:auc-fighter:update-match.subscription":
            r.subscribe(
              ie.UpdateAucFighterMatch,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:auc-fighter:settings.subscription":
            r.subscribe(
              ie.AucFighterSettings,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:messages.read": {
            const f = p, { data: g, error: y } = await o(
              hh.endpoints.getMessages.initiate(f, {
                initialPageParam: {
                  limit: f.limit,
                  offset: f.offset
                },
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: g?.pages.flat(), error: y },
              "*"
            );
            break;
          }
          case "widgets:alert:played.send":
            r.send({
              event: ie.AlertPlayed,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:playing.send":
            r.send({
              event: ie.AlertPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:replay.subscription":
            r.subscribe(
              ie.ReplayAlert,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:alert:skip.subscription":
            r.subscribe(ie.SkipAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:test.subscription":
            r.subscribe(ie.TestAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:skip-playing.subscription":
            r.subscribe(ie.SkipPlayingAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:alerts.subscription":
            r.subscribe(ie.Alerts, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:settings.read": {
            const { data: f, error: g } = await o(
              Pj.endpoints.getSettings.initiate(void 0, {
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:alerts.read": {
            const { data: f, error: g } = await o(
              xj.endpoints.getAlerts.initiate(void 0, {
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:media:played.send":
            r.send({
              event: ie.MediaPlayed,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:replay.subscription":
            r.subscribe(
              ie.ReplayMedia,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:media:settings.subscription":
            r.subscribe(
              ie.MediaSettings,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:media:skip.subscription":
            r.subscribe(ie.SkipMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:skip-playing-media.subscription":
            r.subscribe(ie.SkipPlayingMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:end.subscription":
            r.subscribe(ie.MediaEnd, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:error.subscription":
            r.subscribe(ie.MediaError, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:played.subscription":
            r.subscribe(ie.AlertPlayed, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:pause.subscription":
            r.subscribe(ie.PauseMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:play.subscription":
            r.subscribe(ie.PlayMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:end.send":
            r.send({
              event: ie.MediaEnd,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:playing.send":
            r.send({
              event: ie.MediaPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:paused.send":
            r.send({
              event: ie.MediaPaused,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:error.send":
            r.send({
              event: ie.MediaError,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:replay.send":
            r.send({
              event: ie.ReplayMedia,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:replay.send":
            r.send({
              event: ie.ReplayAlert,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:skip.send":
            r.send({
              event: ie.SkipAlert,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:view:storage.read":
            {
              const { data: f, error: g } = await o(
                ks.endpoints.getWidgetById.initiate(
                  {
                    id: e.id
                  },
                  { forceRefetch: !0 }
                )
              );
              t.current?.contentWindow?.postMessage(
                { id: u, data: f?.view_storage, error: g },
                "*"
              );
            }
            break;
          case "widgets:control:storage.read": {
            const { data: f, error: g } = await o(
              ks.endpoints.getWidgetById.initiate(
                {
                  id: e.id
                },
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f?.control_storage, error: g },
              "*"
            );
            break;
          }
          case "widgets:view:storage.write": {
            const { data: f, error: g } = await o(
              ks.endpoints.updateWidgetViewStorage.initiate({
                ...e,
                viewStorage: JSON.stringify(p)
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:control:storage.write": {
            const { data: f, error: g } = await o(
              ks.endpoints.updateControlViewStorage.initiate({
                ...e,
                controlStorage: JSON.stringify(p)
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:view:storage.subscription":
            r.subscribe(
              ie.WidgetViewStorage,
              (f) => {
                f.id === e.id && t.current?.contentWindow?.postMessage(
                  { id: u, data: f.view_storage },
                  "*"
                );
              }
            );
            break;
          case "widgets:control:storage.subscription":
            r.subscribe(
              ie.WidgetControlStorage,
              (f) => {
                f.id === e.id && t.current?.contentWindow?.postMessage(
                  { id: u, data: f.control_storage },
                  "*"
                );
              }
            );
            break;
          default:
            break;
        }
      } catch (f) {
        const g = f instanceof Error ? f.message : String(f);
        t.current?.contentWindow?.postMessage(
          { id: u, error: g },
          "*"
        );
      }
  };
  return k.useLayoutEffect(() => (window.addEventListener("message", s), () => {
    window.removeEventListener("message", s);
  }), [s]), t;
}, Tj = ({ type: e }) => {
  const { id: t } = XR(), [r] = UT(), { data: o } = _j({ id: t }), s = Rj(o);
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: o && /* @__PURE__ */ B.jsx(
    "iframe",
    {
      ref: s,
      src: `http://localhost:12553/widgets/${o.id}/${e}/index.html?${r.toString()}`,
      title: "Widget",
      sandbox: "allow-scripts allow-forms",
      style: {
        width: "100%",
        height: "100dvh",
        border: "none",
        display: "block"
      }
    }
  ) });
}, { palette: $j } = Xs(), Mj = {
  palette: {
    mode: "dark",
    primary: $j.augmentColor({
      color: {
        main: "#1976d2",
        contrastText: "#ffffff"
      }
    }),
    switchOff: {
      text: "#838383"
    },
    background: {
      default: "#0e1621",
      paper: "#182533",
      section: "#17212b"
    }
  }
}, YS = (e) => {
  switch (e) {
    case cr.UAH:
      return "₴";
    case cr.EUR:
      return "€";
    case cr.RUB:
      return "₽";
    case cr.USD:
      return "$";
    case cr.NONE:
      return "";
  }
}, Ut = ({
  percent: e,
  width: t,
  coefficient: r = 1
}) => `${t / 100 * (e / 100) * r}px`, Aj = (e) => {
  switch (e) {
    case Dt.Left:
      return "1fr auto";
    case Dt.Right:
      return "auto 1fr";
    default:
      return;
  }
}, Ij = (e) => {
  switch (e) {
    case Dt.Top:
      return "1fr auto";
    case Dt.Bottom:
      return "auto 1fr";
    default:
      return;
  }
}, Oj = (e) => {
  switch (e) {
    case Dt.Top:
      return `"Image"
                    "Text"`;
    case Dt.Bottom:
      return `"Text"
                    "Image"`;
    case Dt.Left:
      return '"Image Text"';
    case Dt.Right:
      return '"Text Image"';
    default:
      return;
  }
}, Ll = ({
  alert: e,
  imageSrc: t,
  width: r,
  height: o,
  backgroundColor: s,
  text: l,
  children: u
}) => /* @__PURE__ */ B.jsxs(
  "div",
  {
    style: {
      display: "grid",
      height: o,
      width: r,
      backgroundColor: s,
      gridTemplateAreas: Oj(e.view_type),
      gridAutoRows: Ij(e.view_type),
      gridAutoColumns: Aj(e.view_type),
      placeItems: "center",
      gap: 5,
      color: "white",
      fontSize: 25
    },
    children: [
      e.show_image && /* @__PURE__ */ B.jsx(
        "div",
        {
          style: {
            gridArea: "Image",
            height: e.view_type === Dt.Overlay ? o : "100%",
            width: e.view_type === Dt.Overlay ? r : "100%",
            position: e.view_type === Dt.Overlay ? "absolute" : void 0,
            backgroundImage: `url(${t})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          }
        }
      ),
      /* @__PURE__ */ B.jsxs(
        "div",
        {
          style: {
            gridArea: e.show_image ? "Text" : "Image",
            height: e.view_type === Dt.Overlay ? o : "100%",
            width: e.view_type === Dt.Overlay ? r : "100%",
            maxWidth: `${r / 100 * 60}px`,
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            textAlign: "center",
            position: e.view_type === Dt.Overlay ? "absolute" : void 0
          },
          children: [
            /* @__PURE__ */ B.jsx(
              "span",
              {
                style: {
                  display: "block",
                  fontSize: Ut({
                    percent: e.title_style.font_size,
                    width: r,
                    coefficient: e.type === Ft.Donation ? 4 : 12
                  }),
                  color: e.title_style.text_color,
                  fontWeight: e.title_style.bold ? "bold" : void 0,
                  fontStyle: e.title_style.italics ? "italic" : void 0,
                  textDecoration: e.title_style.underline ? "underline" : void 0,
                  letterSpacing: Ut({
                    percent: e.title_style.letter_spacing,
                    width: r
                  }),
                  wordSpacing: Ut({
                    percent: e.title_style.word_spacing,
                    width: r
                  })
                },
                children: u
              }
            ),
            /* @__PURE__ */ B.jsx(
              "span",
              {
                style: {
                  display: "block",
                  fontSize: Ut({
                    percent: e.message_style.font_size,
                    width: r,
                    coefficient: e.type === Ft.Donation ? 4 : 8
                  }),
                  color: e.message_style.text_color,
                  fontWeight: e.message_style.bold ? "bold" : void 0,
                  fontStyle: e.message_style.italics ? "italic" : void 0,
                  textDecoration: e.message_style.underline ? "underline" : void 0,
                  letterSpacing: Ut({
                    percent: e.message_style.letter_spacing,
                    width: r
                  }),
                  wordSpacing: Ut({
                    percent: e.message_style.word_spacing,
                    width: r
                  })
                },
                children: l
              }
            )
          ]
        }
      )
    ]
  }
), Nj = ({
  alert: e,
  message: t,
  imageSrc: r,
  width: o,
  height: s,
  backgroundColor: l
}) => {
  const { t: u } = Jr();
  switch (t.type) {
    case Ft.Donation: {
      const d = t.donation;
      return /* @__PURE__ */ B.jsx(
        Ll,
        {
          alert: e,
          text: d.text,
          imageSrc: r,
          width: o,
          height: s,
          backgroundColor: l,
          children: u("message.donated", {
            user_name: d.user_name,
            currency: YS(d.currency),
            amount: d.amount
          })
        }
      );
    }
    case Ft.Follow: {
      const d = t.follow;
      return /* @__PURE__ */ B.jsx(
        Ll,
        {
          alert: e,
          imageSrc: r,
          width: o,
          height: s,
          backgroundColor: l,
          children: u("message.followed", { user_name: d.user_name })
        }
      );
    }
    case Ft.Subscription: {
      const d = t.subscription;
      return /* @__PURE__ */ B.jsx(
        Ll,
        {
          alert: e,
          imageSrc: r,
          width: o,
          height: s,
          backgroundColor: l,
          children: d.is_gift ? u("message.gifted_subscriptions", {
            user_name: d.user_name,
            total: d.total
          }) : u("message.subscribed", { user_name: d.user_name })
        }
      );
    }
    case Ft.Raid: {
      const d = t.raid;
      return /* @__PURE__ */ B.jsx(
        Ll,
        {
          alert: e,
          imageSrc: r,
          width: o,
          height: s,
          backgroundColor: l,
          children: u("message.raided_with", {
            viewers: d.viewers,
            user_name: d.from_broadcaster_user_name
          })
        }
      );
    }
    default:
      return /* @__PURE__ */ B.jsx("div", {});
  }
}, Lj = ({
  alert: e,
  userName: t,
  text: r,
  type: o
}) => {
  if (!e) return;
  const s = crypto.randomUUID();
  return {
    id: s,
    type: o,
    created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
    donation: {
      service_id: crypto.randomUUID(),
      amount: e.variation_conditions === fo.AmountIsEqual ? e.amount : e.amount + 1,
      user_name: t,
      played: !1,
      text: r,
      currency: cr.EUR,
      exchanged_amount: 1,
      exchanged_currency: cr.EUR,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
      service: Bt.TributeBot,
      id: crypto.randomUUID(),
      message_id: s
    },
    follow: {
      user_name: t,
      id: crypto.randomUUID(),
      service_id: crypto.randomUUID(),
      message_id: s,
      service: Bt.Twitch,
      played: !1,
      followed_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
      user_id: "1"
    },
    subscription: {
      id: crypto.randomUUID(),
      service_id: crypto.randomUUID(),
      user_name: t,
      user_id: "1",
      message_id: s,
      played: !1,
      is_gift: !1,
      is_anonymous: !1,
      service: Bt.Twitch,
      tier: "1000",
      cumulative_total: 1,
      total: 1,
      subscribed_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)
    },
    raid: {
      id: crypto.randomUUID(),
      service_id: crypto.randomUUID(),
      from_broadcaster_user_name: t,
      from_broadcaster_user_id: "1",
      message_id: s,
      played: !1,
      viewers: 43543,
      service: Bt.Twitch,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)
    }
  };
}, Dl = ({
  alerts: e,
  message: t
}) => {
  const o = new URLSearchParams(window.location.search).get("group_id"), s = e.filter(
    (d) => d.status && d.group_id === o && d.type == t.type
  ), l = s.filter(
    (d) => d.variation_conditions === fo.Random
  ), u = t.donation?.amount;
  if (u) {
    const d = s.filter(
      (y) => y.variation_conditions === fo.AmountIsGreater
    ).sort((y, v) => v.amount - y.amount), f = s.filter(
      (y) => y.variation_conditions === fo.AmountIsEqual
    ).find((y) => y.amount === u);
    if (f) return f;
    const g = d.find((y) => y.amount < u);
    if (g) return g;
  }
  if (l.length)
    return l[Math.floor(Math.random() * l.length)];
}, Dj = () => {
  const { t: e } = Jr(), t = bn(), r = k.useRef(new Audio()), o = k.useRef(new Audio()), s = k.useRef([]), l = k.useRef(null), u = k.useRef([]), [d, p] = k.useState(), [f, g] = k.useState(), y = k.useCallback(
    ({
      message: x,
      skip: P = !1
    }) => {
      o.current.pause(), r.current.pause(), setTimeout(
        () => {
          if (!x) return;
          t.send({
            event: ie.AlertPlayed,
            data: x.id
          }), u.current = u.current.filter(
            (M) => M.id !== x.id
          );
          const E = u.current.at(0);
          p(void 0), setTimeout(() => {
            if (E) {
              const M = Dl({
                alerts: s.current,
                message: E
              });
              M && v({ message: E, alert: M });
            }
          }, 0);
        },
        P ? 0 : 3e3
      );
    },
    []
  ), v = k.useCallback(
    ({ message: x, alert: P }) => {
      l.current && !l.current.alert_paused && setTimeout(() => {
        l.current && u.current.length && (t.send({
          event: ie.AlertPlaying,
          data: x.id
        }), r.current.src = `static/${P.audio}`, r.current.volume = P.audio_volume / 100, r.current.play(), p(x), g(P));
      }, l.current.moderation_duration);
    },
    []
  ), _ = k.useCallback((x) => {
    const E = new URLSearchParams(window.location.search).get("group_id"), M = s.current.find(
      (I) => I.id === x && I.group_id === E
    );
    if (!M) return;
    const A = Lj({
      alert: M,
      userName: e("alert.test_name"),
      text: e("alert.test_text"),
      type: M.type
    });
    A && !u.current.length && l.current && (t.send({
      event: ie.AlertPlaying,
      data: A.id
    }), r.current.src = `static/${M.audio}`, r.current.volume = M.audio_volume / 100, r.current.play(), p(A), g(M));
  }, []), S = k.useCallback(
    (x) => {
      d?.id === x ? y({ message: d, skip: !0 }) : u.current = u.current.filter(
        (P) => P.id !== x
      );
    },
    [y, d]
  ), b = k.useCallback(() => {
    d && y({ message: d, skip: !0 });
  }, [y, d]), C = k.useCallback(
    (x) => {
      const P = Dl({
        alerts: s.current,
        message: x
      });
      P && (u.current = [...u.current, x], u.current.length === 1 && v({ message: x, alert: P }));
    },
    [v]
  ), R = k.useCallback(
    (x) => {
      const P = Dl({
        alerts: s.current,
        message: x
      });
      P && (u.current = [x, ...u.current], u.current.length === 1 && v({ message: x, alert: P }));
    },
    [v]
  ), O = k.useCallback(() => {
    const x = d?.donation?.audio;
    x && l.current ? (o.current.src = `static/audio/${x}`, o.current.volume = l.current.tts_volume / 100, o.current.play()) : y({ message: d });
  }, [d, y]);
  return k.useEffect(() => (o.current.onended = () => y({ message: d }), o.current.onerror = () => y({ message: d }), () => {
    o.current.onended = null, o.current.onerror = null;
  }), [d, y]), k.useEffect(() => (r.current.onended = O, r.current.onerror = O, () => {
    r.current.onended = null, r.current.onerror = null;
  }), [O]), k.useEffect(() => {
    const x = t.subscribe(
      ie.Message,
      C
    );
    return () => x();
  }, [C]), k.useEffect(() => {
    const x = t.subscribe(
      ie.ReplayAlert,
      R
    );
    return () => x();
  }, [R]), k.useEffect(() => {
    const x = t.subscribe(
      ie.SkipAlert,
      (P) => {
        S(P);
      }
    );
    return () => x();
  }, [S]), k.useEffect(() => {
    const x = t.subscribe(
      ie.TestAlert,
      (P) => {
        _(P);
      }
    );
    return () => x();
  }, [_]), k.useEffect(() => {
    const x = t.subscribe(
      ie.SkipPlayingAlert,
      b
    );
    return () => x();
  }, [b]), k.useEffect(() => {
    const x = t.subscribe(
      ie.Alerts,
      (P) => {
        s.current = P;
      }
    );
    return () => x();
  }, []), k.useEffect(() => {
    const x = t.subscribe(
      ie.Settings,
      (P) => {
        if (l.current?.alert_paused && !P.alert_paused) {
          l.current = P;
          const E = u.current.at(0);
          if (E) {
            const M = Dl({
              alerts: s.current,
              message: E
            });
            M && v({ message: E, alert: M });
          }
          return;
        }
        l.current = P;
      }
    );
    return () => x();
  }, [v]), {
    currentMessage: d,
    currentAlert: f,
    settings: l.current
  };
}, Fj = () => {
  const { currentAlert: e, currentMessage: t } = Dj();
  return t && e && /* @__PURE__ */ B.jsx(
    Nj,
    {
      alert: e,
      message: t,
      width: window.innerWidth,
      height: window.innerHeight,
      imageSrc: `static/${e.image}`
    }
  );
}, zj = ({
  layout: e,
  currentAmount: t,
  amountRaise: r,
  currentAmountPercent: o,
  currency: s
}) => {
  switch (e) {
    case mi.Percent:
      return `${o}%`;
    case mi.CurrentAmount:
      return `${t} ${s ?? ""}`;
    case mi.CurrentAmountPercent:
      return `${t} ${s ?? ""} (${o}%)`;
    case mi.CurrentAmountRemainingAmount:
      return `${t}/${r} ${s ?? ""}`;
    case mi.CurrentAmountRemainingAmountPercent:
      return `${t}/${r} ${s ?? ""} (${o}%)`;
  }
}, jj = ({
  goal: e,
  width: t,
  height: r,
  backgroundColor: o,
  currentAmount: s,
  currency: l
}) => {
  const u = Math.floor(
    s / e.amount_raise * 100
  ), d = zj({
    layout: e.progress_bar_layout,
    currentAmount: s,
    amountRaise: e.amount_raise,
    currentAmountPercent: u,
    currency: e.type === lp.Donation ? l : void 0
  }), p = {
    display: "block",
    fontSize: Ut({
      percent: e.title_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.title_style.text_color,
    fontWeight: e.title_style.bold ? "bold" : void 0,
    fontStyle: e.title_style.italics ? "italic" : void 0,
    textDecoration: e.title_style.underline ? "underline" : void 0,
    letterSpacing: Ut({
      percent: e.title_style.letter_spacing,
      width: t
    }),
    wordSpacing: Ut({
      percent: e.title_style.word_spacing,
      width: t
    })
  }, f = {
    display: "block",
    fontSize: Ut({
      percent: e.progress_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.progress_style.text_color,
    fontWeight: e.progress_style.bold ? "bold" : void 0,
    fontStyle: e.progress_style.italics ? "italic" : void 0,
    textDecoration: e.progress_style.underline ? "underline" : void 0,
    letterSpacing: Ut({
      percent: e.progress_style.letter_spacing,
      width: t
    }),
    wordSpacing: Ut({
      percent: e.progress_style.word_spacing,
      width: t
    })
  }, g = {
    display: "block",
    fontSize: Ut({
      percent: e.limits_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.limits_style.text_color,
    fontWeight: e.limits_style.bold ? "bold" : void 0,
    fontStyle: e.limits_style.italics ? "italic" : void 0,
    textDecoration: e.limits_style.underline ? "underline" : void 0,
    letterSpacing: Ut({
      percent: e.limits_style.letter_spacing,
      width: t
    }),
    wordSpacing: Ut({
      percent: e.limits_style.word_spacing,
      width: t
    })
  };
  return /* @__PURE__ */ B.jsxs(
    "div",
    {
      style: {
        height: r,
        width: t,
        backgroundColor: o,
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: 5,
        color: "white",
        fontSize: 25,
        overflow: "hidden",
        textAlign: "center",
        overflowWrap: "anywhere"
      },
      children: [
        e.goal_title_type === jr.OnTop && /* @__PURE__ */ B.jsx("div", { style: p, children: e.title }),
        e.goal_progress_bar === jr.OnTop && /* @__PURE__ */ B.jsx("div", { style: f, children: d }),
        /* @__PURE__ */ B.jsxs(
          "div",
          {
            style: {
              width: "90%",
              minHeight: `${10 + 20 * (e.bar_height / 50)}%`,
              position: "relative",
              borderRadius: `${e.rounding_radius}px`,
              border: `solid ${e.bar_stroke_thickness / 10}px white`,
              display: "grid",
              placeContent: "center",
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ B.jsx("div", { style: { position: "absolute", inset: 0 }, children: /* @__PURE__ */ B.jsx(
                "div",
                {
                  style: {
                    height: "100%",
                    background: e.background_bar_color,
                    position: "relative"
                  },
                  children: /* @__PURE__ */ B.jsx(
                    "div",
                    {
                      style: {
                        height: "100%",
                        width: `${u}%`,
                        transition: "width 0.3s ease",
                        background: e.progress_bar_color,
                        position: "absolute",
                        inset: 0
                      }
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ B.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    height: "100%",
                    overflowWrap: "anywhere"
                  },
                  children: [
                    e.goal_title_type === jr.Inside && /* @__PURE__ */ B.jsx("div", { style: p, children: e.title }),
                    e.goal_progress_bar === jr.Inside && /* @__PURE__ */ B.jsx("div", { style: f, children: d })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { width: "90%", position: "relative" }, children: [
          e.goal_amount_limits && /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: {
                ...g,
                display: "flex",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ B.jsx("span", { children: "0" }),
                /* @__PURE__ */ B.jsx("span", { children: e.amount_raise })
              ]
            }
          ),
          /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                alignContent: "center",
                overflowWrap: "anywhere"
              },
              children: [
                e.goal_title_type === jr.Below && /* @__PURE__ */ B.jsx("div", { style: p, children: e.title }),
                e.goal_progress_bar === jr.Below && /* @__PURE__ */ B.jsx("div", { style: f, children: d })
              ]
            }
          )
        ] })
      ]
    }
  );
}, Bj = () => {
  const e = bn(), [t, r] = k.useState(), s = new URLSearchParams(window.location.search).get("type"), { data: l } = Cj({ type: s }, { skip: !s }), [u, d] = k.useState();
  return k.useEffect(() => {
    l && r(l);
  }, [l]), k.useEffect(() => {
    const p = e.subscribe(
      ie.Goal,
      (f) => {
        l && f.id === l.id && r(f);
      }
    );
    return () => p();
  }, [l]), k.useEffect(() => {
    const p = e.subscribe(
      ie.Settings,
      (f) => {
        d(f);
      }
    );
    return () => p();
  }, [d]), {
    goal: t,
    settings: u
  };
}, Uj = () => {
  const { goal: e, settings: t } = Bj();
  return e && /* @__PURE__ */ B.jsx(
    jj,
    {
      goal: e,
      width: window.innerWidth,
      height: window.innerHeight,
      currentAmount: e.current_amount + e.start_raising,
      currency: t?.currency
    }
  );
}, Wj = () => {
  const e = bn(), t = k.useRef(null), r = k.useRef(null), o = k.useRef([]), [s, l] = k.useState(), u = k.useCallback(
    ({ message: v }) => {
      if (!v) return;
      e.send({
        event: ie.MediaPlayed,
        data: v.id
      }), o.current = o.current.filter(
        (S) => S.id !== v.id
      );
      const _ = o.current.at(0);
      l(void 0), setTimeout(() => {
        _ && d({ message: _ });
      }, 0);
    },
    []
  ), d = k.useCallback(({ message: v }) => {
    r.current && !r.current.alert_paused && l(v);
  }, []), p = k.useCallback(
    (v) => {
      s?.id === v ? u({ message: s }) : o.current = o.current.filter(
        (_) => _.id !== v
      );
    },
    [u, s]
  ), f = k.useCallback(() => {
    s && u({ message: s });
  }, [u, s]), g = k.useCallback((v) => {
    v.donation?.media && (o.current = [...o.current, v]);
  }, []), y = k.useCallback(
    (v) => {
      o.current = [v, ...o.current], s || d({ message: v });
    },
    [d, s]
  );
  return k.useEffect(() => {
    const v = e.subscribe(
      ie.MediaMessage,
      g
    );
    return () => v();
  }, [g]), k.useEffect(() => {
    const v = e.subscribe(
      ie.ReplayMedia,
      y
    );
    return () => v();
  }, [y]), k.useEffect(() => {
    const v = e.subscribe(
      ie.MediaSettings,
      (_) => {
        t.current = _;
      }
    );
    return () => v();
  }, []), k.useEffect(() => {
    const v = e.subscribe(
      ie.Settings,
      (_) => {
        if (r.current?.alert_paused && !_.alert_paused) {
          r.current = _;
          const S = o.current.at(0);
          S && d({ message: S });
          return;
        }
        r.current = _;
      }
    );
    return () => v();
  }, [d]), k.useEffect(() => {
    const v = e.subscribe(
      ie.SkipMedia,
      p
    );
    return () => v();
  }, [p]), k.useEffect(() => {
    const v = e.subscribe(
      ie.SkipPlayingMedia,
      f
    );
    return () => v();
  }, [f]), k.useEffect(() => {
    const v = e.subscribe(
      ie.MediaEnd,
      (_) => {
        const S = o.current.find(
          (b) => b.id === _
        );
        u({ message: S });
      }
    );
    return () => v();
  }, [u]), k.useEffect(() => {
    const v = e.subscribe(
      ie.MediaError,
      (_) => {
        const S = o.current.find(
          (b) => b.id === _
        );
        u({ message: S });
      }
    );
    return () => v();
  }, [u]), k.useEffect(() => {
    const v = e.subscribe(
      ie.AlertPlayed,
      (_) => {
        const S = o.current.find(
          (b) => b.id === _
        );
        !s && S && d({ message: S });
      }
    );
    return () => v();
  }, [d, s]), {
    currentMessage: s,
    mediaSettings: t.current
  };
}, Vj = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = bn(), s = k.useRef(null), l = k.useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (u) => {
      switch (u.data.type) {
        case "onStateChange":
          switch (u.data.value) {
            case 0:
              o.send({
                event: ie.MediaEnd,
                data: r
              });
              break;
            case 1:
              o.send({
                event: ie.MediaPlaying,
                data: r
              });
              break;
            case 2:
              o.send({
                event: ie.MediaPaused,
                data: r
              });
              break;
          }
          break;
        case "onPlayerReady":
          s.current?.contentWindow?.postMessage(
            { type: "unMute", value: 0, "x-tiktok-player": !0 },
            "*"
          ), s.current?.contentWindow?.postMessage(
            {
              type: "changeVolume",
              value: e.video_volume,
              "x-tiktok-player": !0
            },
            "*"
          );
          break;
        case "onError":
          o.send({
            event: ie.MediaError,
            data: r
          });
          break;
      }
    },
    [r, e, o]
  );
  return k.useEffect(() => (window.addEventListener("message", l), () => {
    window.removeEventListener("message", l);
  }), [l]), k.useEffect(() => {
    const u = o.subscribe(
      ie.PauseMedia,
      (d) => {
        r === d && s.current && s.current?.contentWindow?.postMessage(
          { type: "pause", value: null, "x-tiktok-player": !0 },
          "*"
        );
      }
    );
    return () => u();
  }, [r, o]), k.useEffect(() => {
    const u = o.subscribe(
      ie.PlayMedia,
      (d) => {
        r === d && s.current && s.current?.contentWindow?.postMessage(
          { type: "play", value: null, "x-tiktok-player": !0 },
          "*"
        );
      }
    );
    return () => u();
  }, [r, o]), /* @__PURE__ */ B.jsx(
    "iframe",
    {
      ref: s,
      height: "100%",
      width: "100%",
      src: `https://www.tiktok.com/player/v1/${t.temporary_src}?controls=0&progress_bar=0&play_button=0&volume_control=0&music_info=0&autoplay=1&timestamp=0&fullscreen_button=0&description=0&rel=0&native_context_menu=0&closed_caption=0`,
      allow: "fullscreen",
      title: "widget"
    }
  );
}, Hj = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = k.useRef(null), s = bn();
  return k.useEffect(() => {
    o.current && (o.current.volume = e.video_volume / 100);
  }, [e]), k.useEffect(() => {
    if (o.current)
      return o.current.onplay = () => {
        s.send({
          event: ie.MediaPlaying,
          data: r
        });
      }, o.current.onended = () => {
        s.send({
          event: ie.MediaEnd,
          data: r
        });
      }, o.current.onpause = () => {
        s.send({
          event: ie.MediaPaused,
          data: r
        });
      }, o.current.onerror = () => {
        s.send({
          event: ie.MediaError,
          data: r
        });
      }, () => {
        o.current && (o.current.onplay = null, o.current.onended = null, o.current.onpause = null, o.current.onerror = null);
      };
  }, [r, s]), k.useEffect(() => {
    const l = s.subscribe(
      ie.PauseMedia,
      (u) => {
        r === u && o.current && o.current.pause();
      }
    );
    return () => l();
  }, [r, s]), k.useEffect(() => {
    const l = s.subscribe(
      ie.PlayMedia,
      (u) => {
        r === u && o.current && o.current.play();
      }
    );
    return () => l();
  }, [r, s]), /* @__PURE__ */ B.jsx(B.Fragment, { children: /* @__PURE__ */ B.jsx(
    "video",
    {
      autoPlay: !0,
      ref: o,
      src: t.temporary_src,
      style: { height: "100%", width: "100%" }
    }
  ) });
};
var Mf, ww;
function qj() {
  return ww || (ww = 1, Mf = function e(t, r) {
    if (t === r) return !0;
    if (t && r && typeof t == "object" && typeof r == "object") {
      if (t.constructor !== r.constructor) return !1;
      var o, s, l;
      if (Array.isArray(t)) {
        if (o = t.length, o != r.length) return !1;
        for (s = o; s-- !== 0; )
          if (!e(t[s], r[s])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
      if (l = Object.keys(t), o = l.length, o !== Object.keys(r).length) return !1;
      for (s = o; s-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(r, l[s])) return !1;
      for (s = o; s-- !== 0; ) {
        var u = l[s];
        if (!e(t[u], r[u])) return !1;
      }
      return !0;
    }
    return t !== t && r !== r;
  }), Mf;
}
var Kj = qj();
const Qj = /* @__PURE__ */ Qr(Kj);
var Fl = { exports: {} }, Af, Sw;
function Gj() {
  if (Sw) return Af;
  Sw = 1;
  var e;
  /**
  * @link https://github.com/gajus/sister for the canonical source repository
  * @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
  */
  return e = function() {
    var t = {}, r = {};
    return t.on = function(o, s) {
      var l = { name: o, handler: s };
      return r[o] = r[o] || [], r[o].unshift(l), l;
    }, t.off = function(o) {
      var s = r[o.name].indexOf(o);
      s !== -1 && r[o.name].splice(s, 1);
    }, t.trigger = function(o, s) {
      var l = r[o], u;
      if (l)
        for (u = l.length; u--; )
          l[u].handler(s);
    }, t;
  }, Af = e, Af;
}
var zl = { exports: {} }, If, bw;
function Yj() {
  if (bw) return If;
  bw = 1, If = function(s, l, u) {
    var d = document.head || document.getElementsByTagName("head")[0], p = document.createElement("script");
    typeof l == "function" && (u = l, l = {}), l = l || {}, u = u || function() {
    }, p.type = l.type || "text/javascript", p.charset = l.charset || "utf8", p.async = "async" in l ? !!l.async : !0, p.src = s, l.attrs && e(p, l.attrs), l.text && (p.text = "" + l.text);
    var f = "onload" in p ? t : r;
    f(p, u), p.onload || t(p, u), d.appendChild(p);
  };
  function e(o, s) {
    for (var l in s)
      o.setAttribute(l, s[l]);
  }
  function t(o, s) {
    o.onload = function() {
      this.onerror = this.onload = null, s(null, o);
    }, o.onerror = function() {
      this.onerror = this.onload = null, s(new Error("Failed to load " + this.src), o);
    };
  }
  function r(o, s) {
    o.onreadystatechange = function() {
      this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, s(null, o));
    };
  }
  return If;
}
var _w;
function Jj() {
  return _w || (_w = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = Yj(), o = s(r);
    function s(l) {
      return l && l.__esModule ? l : { default: l };
    }
    t.default = function(l) {
      var u = new Promise(function(d) {
        if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
          d(window.YT);
          return;
        } else {
          var p = window.location.protocol === "http:" ? "http:" : "https:";
          (0, o.default)(p + "//www.youtube.com/iframe_api", function(g) {
            g && l.trigger("error", g);
          });
        }
        var f = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function() {
          f && f(), d(window.YT);
        };
      });
      return u;
    }, e.exports = t.default;
  }(zl, zl.exports)), zl.exports;
}
var jl = { exports: {} }, Bl = { exports: {} }, Ul = { exports: {} }, Of, xw;
function Xj() {
  if (xw) return Of;
  xw = 1;
  var e = 1e3, t = e * 60, r = t * 60, o = r * 24, s = o * 365.25;
  Of = function(f, g) {
    g = g || {};
    var y = typeof f;
    if (y === "string" && f.length > 0)
      return l(f);
    if (y === "number" && isNaN(f) === !1)
      return g.long ? d(f) : u(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function l(f) {
    if (f = String(f), !(f.length > 100)) {
      var g = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        f
      );
      if (g) {
        var y = parseFloat(g[1]), v = (g[2] || "ms").toLowerCase();
        switch (v) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return y * s;
          case "days":
          case "day":
          case "d":
            return y * o;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return y * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return y * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return y * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return y;
          default:
            return;
        }
      }
    }
  }
  function u(f) {
    return f >= o ? Math.round(f / o) + "d" : f >= r ? Math.round(f / r) + "h" : f >= t ? Math.round(f / t) + "m" : f >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function d(f) {
    return p(f, o, "day") || p(f, r, "hour") || p(f, t, "minute") || p(f, e, "second") || f + " ms";
  }
  function p(f, g, y) {
    if (!(f < g))
      return f < g * 1.5 ? Math.floor(f / g) + " " + y : Math.ceil(f / g) + " " + y + "s";
  }
  return Of;
}
var kw;
function Zj() {
  return kw || (kw = 1, function(e, t) {
    t = e.exports = s.debug = s.default = s, t.coerce = p, t.disable = u, t.enable = l, t.enabled = d, t.humanize = Xj(), t.names = [], t.skips = [], t.formatters = {};
    var r;
    function o(f) {
      var g = 0, y;
      for (y in f)
        g = (g << 5) - g + f.charCodeAt(y), g |= 0;
      return t.colors[Math.abs(g) % t.colors.length];
    }
    function s(f) {
      function g() {
        if (g.enabled) {
          var y = g, v = +/* @__PURE__ */ new Date(), _ = v - (r || v);
          y.diff = _, y.prev = r, y.curr = v, r = v;
          for (var S = new Array(arguments.length), b = 0; b < S.length; b++)
            S[b] = arguments[b];
          S[0] = t.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
          var C = 0;
          S[0] = S[0].replace(/%([a-zA-Z%])/g, function(O, x) {
            if (O === "%%") return O;
            C++;
            var P = t.formatters[x];
            if (typeof P == "function") {
              var E = S[C];
              O = P.call(y, E), S.splice(C, 1), C--;
            }
            return O;
          }), t.formatArgs.call(y, S);
          var R = g.log || t.log || console.log.bind(console);
          R.apply(y, S);
        }
      }
      return g.namespace = f, g.enabled = t.enabled(f), g.useColors = t.useColors(), g.color = o(f), typeof t.init == "function" && t.init(g), g;
    }
    function l(f) {
      t.save(f), t.names = [], t.skips = [];
      for (var g = (typeof f == "string" ? f : "").split(/[\s,]+/), y = g.length, v = 0; v < y; v++)
        g[v] && (f = g[v].replace(/\*/g, ".*?"), f[0] === "-" ? t.skips.push(new RegExp("^" + f.substr(1) + "$")) : t.names.push(new RegExp("^" + f + "$")));
    }
    function u() {
      t.enable("");
    }
    function d(f) {
      var g, y;
      for (g = 0, y = t.skips.length; g < y; g++)
        if (t.skips[g].test(f))
          return !1;
      for (g = 0, y = t.names.length; g < y; g++)
        if (t.names[g].test(f))
          return !0;
      return !1;
    }
    function p(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
  }(Ul, Ul.exports)), Ul.exports;
}
var Cw;
function e3() {
  return Cw || (Cw = 1, function(e, t) {
    var r = {};
    t = e.exports = Zj(), t.log = l, t.formatArgs = s, t.save = u, t.load = d, t.useColors = o, t.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : p(), t.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function o() {
      return typeof window < "u" && window.process && window.process.type === "renderer" ? !0 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    t.formatters.j = function(f) {
      try {
        return JSON.stringify(f);
      } catch (g) {
        return "[UnexpectedJSONParseError]: " + g.message;
      }
    };
    function s(f) {
      var g = this.useColors;
      if (f[0] = (g ? "%c" : "") + this.namespace + (g ? " %c" : " ") + f[0] + (g ? "%c " : " ") + "+" + t.humanize(this.diff), !!g) {
        var y = "color: " + this.color;
        f.splice(1, 0, y, "color: inherit");
        var v = 0, _ = 0;
        f[0].replace(/%[a-zA-Z%]/g, function(S) {
          S !== "%%" && (v++, S === "%c" && (_ = v));
        }), f.splice(_, 0, y);
      }
    }
    function l() {
      return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function u(f) {
      try {
        f == null ? t.storage.removeItem("debug") : t.storage.debug = f;
      } catch {
      }
    }
    function d() {
      var f;
      try {
        f = t.storage.debug;
      } catch {
      }
      return !f && typeof process < "u" && "env" in process && (f = r.DEBUG), f;
    }
    t.enable(d());
    function p() {
      try {
        return window.localStorage;
      } catch {
      }
    }
  }(Bl, Bl.exports)), Bl.exports;
}
var Wl = { exports: {} }, Ew;
function t3() {
  return Ew || (Ew = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["cueVideoById", "loadVideoById", "cueVideoByUrl", "loadVideoByUrl", "playVideo", "pauseVideo", "stopVideo", "getVideoLoadedFraction", "cuePlaylist", "loadPlaylist", "nextVideo", "previousVideo", "playVideoAt", "setShuffle", "setLoop", "getPlaylist", "getPlaylistIndex", "setOption", "mute", "unMute", "isMuted", "setVolume", "getVolume", "seekTo", "getPlayerState", "getPlaybackRate", "setPlaybackRate", "getAvailablePlaybackRates", "getPlaybackQuality", "setPlaybackQuality", "getAvailableQualityLevels", "getCurrentTime", "getDuration", "removeEventListener", "getVideoUrl", "getVideoEmbedCode", "getOptions", "getOption", "addEventListener", "destroy", "setSize", "getIframe"], e.exports = t.default;
  }(Wl, Wl.exports)), Wl.exports;
}
var Vl = { exports: {} }, Pw;
function n3() {
  return Pw || (Pw = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["ready", "stateChange", "playbackQualityChange", "playbackRateChange", "error", "apiChange", "volumeChange"], e.exports = t.default;
  }(Vl, Vl.exports)), Vl.exports;
}
var Hl = { exports: {} }, ql = { exports: {} }, Rw;
function r3() {
  return Rw || (Rw = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      BUFFERING: 3,
      ENDED: 0,
      PAUSED: 2,
      PLAYING: 1,
      UNSTARTED: -1,
      VIDEO_CUED: 5
    }, e.exports = t.default;
  }(ql, ql.exports)), ql.exports;
}
var Tw;
function i3() {
  return Tw || (Tw = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = r3(), o = s(r);
    function s(l) {
      return l && l.__esModule ? l : { default: l };
    }
    t.default = {
      pauseVideo: {
        acceptableStates: [o.default.ENDED, o.default.PAUSED],
        stateChangeRequired: !1
      },
      playVideo: {
        acceptableStates: [o.default.ENDED, o.default.PLAYING],
        stateChangeRequired: !1
      },
      seekTo: {
        acceptableStates: [o.default.ENDED, o.default.PLAYING, o.default.PAUSED],
        stateChangeRequired: !0,
        // TRICKY: `seekTo` may not cause a state change if no buffering is
        // required.
        timeout: 3e3
      }
    }, e.exports = t.default;
  }(Hl, Hl.exports)), Hl.exports;
}
var $w;
function o3() {
  return $w || ($w = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = e3(), o = g(r), s = t3(), l = g(s), u = n3(), d = g(u), p = i3(), f = g(p);
    function g(_) {
      return _ && _.__esModule ? _ : { default: _ };
    }
    var y = (0, o.default)("youtube-player"), v = {};
    v.proxyEvents = function(_) {
      var S = {}, b = function(A) {
        var I = "on" + A.slice(0, 1).toUpperCase() + A.slice(1);
        S[I] = function(L) {
          y('event "%s"', I, L), _.trigger(A, L);
        };
      }, C = !0, R = !1, O = void 0;
      try {
        for (var x = d.default[Symbol.iterator](), P; !(C = (P = x.next()).done); C = !0) {
          var E = P.value;
          b(E);
        }
      } catch (M) {
        R = !0, O = M;
      } finally {
        try {
          !C && x.return && x.return();
        } finally {
          if (R)
            throw O;
        }
      }
      return S;
    }, v.promisifyPlayer = function(_) {
      var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, b = {}, C = function(I) {
        S && f.default[I] ? b[I] = function() {
          for (var L = arguments.length, w = Array(L), T = 0; T < L; T++)
            w[T] = arguments[T];
          return _.then(function(N) {
            var V = f.default[I], F = N.getPlayerState(), j = N[I].apply(N, w);
            return V.stateChangeRequired || // eslint-disable-next-line no-extra-parens
            Array.isArray(V.acceptableStates) && V.acceptableStates.indexOf(F) === -1 ? new Promise(function(H) {
              var Y = function U() {
                var W = N.getPlayerState(), K = void 0;
                typeof V.timeout == "number" && (K = setTimeout(function() {
                  N.removeEventListener("onStateChange", U), H();
                }, V.timeout)), Array.isArray(V.acceptableStates) && V.acceptableStates.indexOf(W) !== -1 && (N.removeEventListener("onStateChange", U), clearTimeout(K), H());
              };
              N.addEventListener("onStateChange", Y);
            }).then(function() {
              return j;
            }) : j;
          });
        } : b[I] = function() {
          for (var L = arguments.length, w = Array(L), T = 0; T < L; T++)
            w[T] = arguments[T];
          return _.then(function(N) {
            return N[I].apply(N, w);
          });
        };
      }, R = !0, O = !1, x = void 0;
      try {
        for (var P = l.default[Symbol.iterator](), E; !(R = (E = P.next()).done); R = !0) {
          var M = E.value;
          C(M);
        }
      } catch (A) {
        O = !0, x = A;
      } finally {
        try {
          !R && P.return && P.return();
        } finally {
          if (O)
            throw x;
        }
      }
      return b;
    }, t.default = v, e.exports = t.default;
  }(jl, jl.exports)), jl.exports;
}
var Mw;
function s3() {
  return Mw || (Mw = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(y) {
      return typeof y;
    } : function(y) {
      return y && typeof Symbol == "function" && y.constructor === Symbol && y !== Symbol.prototype ? "symbol" : typeof y;
    }, o = Gj(), s = f(o), l = Jj(), u = f(l), d = o3(), p = f(d);
    function f(y) {
      return y && y.__esModule ? y : { default: y };
    }
    var g = void 0;
    t.default = function(y) {
      var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, S = (0, s.default)();
      if (g || (g = (0, u.default)(S)), v.events)
        throw new Error("Event handlers cannot be overwritten.");
      if (typeof y == "string" && !document.getElementById(y))
        throw new Error('Element "' + y + '" does not exist.');
      v.events = p.default.proxyEvents(S);
      var b = new Promise(function(R) {
        if ((typeof y > "u" ? "undefined" : r(y)) === "object" && y.playVideo instanceof Function) {
          var O = y;
          R(O);
        } else
          g.then(function(x) {
            var P = new x.Player(y, v);
            return S.on("ready", function() {
              R(P);
            }), null;
          });
      }), C = p.default.promisifyPlayer(b, _);
      return C.on = S.on, C.off = S.off, C;
    }, e.exports = t.default;
  }(Fl, Fl.exports)), Fl.exports;
}
var a3 = s3();
const l3 = /* @__PURE__ */ Qr(a3);
var u3 = Object.defineProperty, c3 = Object.defineProperties, d3 = Object.getOwnPropertyDescriptors, Aw = Object.getOwnPropertySymbols, f3 = Object.prototype.hasOwnProperty, p3 = Object.prototype.propertyIsEnumerable, Iw = (e, t, r) => t in e ? u3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, bp = (e, t) => {
  for (var r in t || (t = {}))
    f3.call(t, r) && Iw(e, r, t[r]);
  if (Aw)
    for (var r of Aw(t))
      p3.call(t, r) && Iw(e, r, t[r]);
  return e;
}, _p = (e, t) => c3(e, d3(t)), h3 = (e, t, r) => new Promise((o, s) => {
  var l = (p) => {
    try {
      d(r.next(p));
    } catch (f) {
      s(f);
    }
  }, u = (p) => {
    try {
      d(r.throw(p));
    } catch (f) {
      s(f);
    }
  }, d = (p) => p.done ? o(p.value) : Promise.resolve(p.value).then(l, u);
  d((r = r.apply(e, t)).next());
});
function g3(e, t) {
  var r, o;
  if (e.videoId !== t.videoId)
    return !0;
  const s = ((r = e.opts) == null ? void 0 : r.playerVars) || {}, l = ((o = t.opts) == null ? void 0 : o.playerVars) || {};
  return s.start !== l.start || s.end !== l.end;
}
function Ow(e = {}) {
  return _p(bp({}, e), {
    height: 0,
    width: 0,
    playerVars: _p(bp({}, e.playerVars), {
      autoplay: 0,
      start: 0,
      end: 0
    })
  });
}
function m3(e, t) {
  return e.videoId !== t.videoId || !Qj(Ow(e.opts), Ow(t.opts));
}
function y3(e, t) {
  var r, o, s, l;
  return e.id !== t.id || e.className !== t.className || ((r = e.opts) == null ? void 0 : r.width) !== ((o = t.opts) == null ? void 0 : o.width) || ((s = e.opts) == null ? void 0 : s.height) !== ((l = t.opts) == null ? void 0 : l.height) || e.iframeClassName !== t.iframeClassName || e.title !== t.title;
}
var v3 = {
  videoId: "",
  id: "",
  className: "",
  iframeClassName: "",
  style: {},
  title: "",
  loading: void 0,
  opts: {},
  onReady: () => {
  },
  onError: () => {
  },
  onPlay: () => {
  },
  onPause: () => {
  },
  onEnd: () => {
  },
  onStateChange: () => {
  },
  onPlaybackRateChange: () => {
  },
  onPlaybackQualityChange: () => {
  }
}, w3 = {
  videoId: Ne.string,
  id: Ne.string,
  className: Ne.string,
  iframeClassName: Ne.string,
  style: Ne.object,
  title: Ne.string,
  loading: Ne.oneOf(["lazy", "eager"]),
  opts: Ne.objectOf(Ne.any),
  onReady: Ne.func,
  onError: Ne.func,
  onPlay: Ne.func,
  onPause: Ne.func,
  onEnd: Ne.func,
  onStateChange: Ne.func,
  onPlaybackRateChange: Ne.func,
  onPlaybackQualityChange: Ne.func
}, nu = class extends Wt.Component {
  constructor(e) {
    super(e), this.destroyPlayerPromise = void 0, this.onPlayerReady = (t) => {
      var r, o;
      return (o = (r = this.props).onReady) == null ? void 0 : o.call(r, t);
    }, this.onPlayerError = (t) => {
      var r, o;
      return (o = (r = this.props).onError) == null ? void 0 : o.call(r, t);
    }, this.onPlayerStateChange = (t) => {
      var r, o, s, l, u, d, p, f;
      switch ((o = (r = this.props).onStateChange) == null || o.call(r, t), t.data) {
        case nu.PlayerState.ENDED:
          (l = (s = this.props).onEnd) == null || l.call(s, t);
          break;
        case nu.PlayerState.PLAYING:
          (d = (u = this.props).onPlay) == null || d.call(u, t);
          break;
        case nu.PlayerState.PAUSED:
          (f = (p = this.props).onPause) == null || f.call(p, t);
          break;
      }
    }, this.onPlayerPlaybackRateChange = (t) => {
      var r, o;
      return (o = (r = this.props).onPlaybackRateChange) == null ? void 0 : o.call(r, t);
    }, this.onPlayerPlaybackQualityChange = (t) => {
      var r, o;
      return (o = (r = this.props).onPlaybackQualityChange) == null ? void 0 : o.call(r, t);
    }, this.destroyPlayer = () => this.internalPlayer ? (this.destroyPlayerPromise = this.internalPlayer.destroy().then(() => this.destroyPlayerPromise = void 0), this.destroyPlayerPromise) : Promise.resolve(), this.createPlayer = () => {
      if (typeof document > "u")
        return;
      if (this.destroyPlayerPromise) {
        this.destroyPlayerPromise.then(this.createPlayer);
        return;
      }
      const t = _p(bp({}, this.props.opts), {
        videoId: this.props.videoId
      });
      this.internalPlayer = l3(this.container, t), this.internalPlayer.on("ready", this.onPlayerReady), this.internalPlayer.on("error", this.onPlayerError), this.internalPlayer.on("stateChange", this.onPlayerStateChange), this.internalPlayer.on("playbackRateChange", this.onPlayerPlaybackRateChange), this.internalPlayer.on("playbackQualityChange", this.onPlayerPlaybackQualityChange), (this.props.title || this.props.loading) && this.internalPlayer.getIframe().then((r) => {
        this.props.title && r.setAttribute("title", this.props.title), this.props.loading && r.setAttribute("loading", this.props.loading);
      });
    }, this.resetPlayer = () => this.destroyPlayer().then(this.createPlayer), this.updatePlayer = () => {
      var t;
      (t = this.internalPlayer) == null || t.getIframe().then((r) => {
        this.props.id ? r.setAttribute("id", this.props.id) : r.removeAttribute("id"), this.props.iframeClassName ? r.setAttribute("class", this.props.iframeClassName) : r.removeAttribute("class"), this.props.opts && this.props.opts.width ? r.setAttribute("width", this.props.opts.width.toString()) : r.removeAttribute("width"), this.props.opts && this.props.opts.height ? r.setAttribute("height", this.props.opts.height.toString()) : r.removeAttribute("height"), this.props.title ? r.setAttribute("title", this.props.title) : r.setAttribute("title", "YouTube video player"), this.props.loading ? r.setAttribute("loading", this.props.loading) : r.removeAttribute("loading");
      });
    }, this.getInternalPlayer = () => this.internalPlayer, this.updateVideo = () => {
      var t, r, o, s;
      if (typeof this.props.videoId > "u" || this.props.videoId === null) {
        (t = this.internalPlayer) == null || t.stopVideo();
        return;
      }
      let l = !1;
      const u = {
        videoId: this.props.videoId
      };
      if ((r = this.props.opts) != null && r.playerVars && (l = this.props.opts.playerVars.autoplay === 1, "start" in this.props.opts.playerVars && (u.startSeconds = this.props.opts.playerVars.start), "end" in this.props.opts.playerVars && (u.endSeconds = this.props.opts.playerVars.end)), l) {
        (o = this.internalPlayer) == null || o.loadVideoById(u);
        return;
      }
      (s = this.internalPlayer) == null || s.cueVideoById(u);
    }, this.refContainer = (t) => {
      this.container = t;
    }, this.container = null, this.internalPlayer = null;
  }
  componentDidMount() {
    this.createPlayer();
  }
  componentDidUpdate(e) {
    return h3(this, null, function* () {
      y3(e, this.props) && this.updatePlayer(), m3(e, this.props) && (yield this.resetPlayer()), g3(e, this.props) && this.updateVideo();
    });
  }
  componentWillUnmount() {
    this.destroyPlayer();
  }
  render() {
    return /* @__PURE__ */ Wt.createElement("div", {
      className: this.props.className,
      style: this.props.style
    }, /* @__PURE__ */ Wt.createElement("div", {
      id: this.props.id,
      className: this.props.iframeClassName,
      ref: this.refContainer
    }));
  }
}, sc = nu;
sc.propTypes = w3;
sc.defaultProps = v3;
sc.PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
var S3 = sc;
const b3 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = bn(), [s, l] = k.useState(), u = {
    height: window.innerHeight,
    width: window.innerWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0
    }
  }, d = (v) => {
    o.send({
      event: ie.MediaPlaying,
      data: r
    }), v.target.setVolume(e.video_volume), l(v.target);
  }, p = () => {
    o.send({
      event: ie.MediaError,
      data: r
    });
  }, f = () => {
    o.send({
      event: ie.MediaPlaying,
      data: r
    });
  }, g = () => {
    o.send({
      event: ie.MediaPaused,
      data: r
    });
  }, y = () => {
    o.send({
      event: ie.MediaEnd,
      data: r
    });
  };
  return k.useEffect(() => {
    const v = o.subscribe(
      ie.PauseMedia,
      (_) => {
        r === _ && s.pauseVideo();
      }
    );
    return () => v();
  }, [r, s, o]), k.useEffect(() => {
    const v = o.subscribe(
      ie.PlayMedia,
      (_) => {
        r === _ && s.playVideo();
      }
    );
    return () => v();
  }, [r, s, o]), /* @__PURE__ */ B.jsx(
    S3,
    {
      videoId: t?.temporary_src,
      opts: u,
      onError: p,
      onReady: d,
      onPlay: f,
      onPause: g,
      onEnd: y
    }
  );
}, _3 = ({
  messageId: e,
  mediaSettings: t,
  media: r
}) => {
  switch (r.media_type) {
    case Br.Twitch:
      return /* @__PURE__ */ B.jsx(
        Hj,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.twitch
        }
      );
    case Br.Youtube:
      return /* @__PURE__ */ B.jsx(
        b3,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.youtube
        }
      );
    case Br.TikTok:
      return /* @__PURE__ */ B.jsx(
        Vj,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.tiktok
        }
      );
  }
}, x3 = () => {
  const { currentMessage: e, mediaSettings: t } = Wj();
  return t && e && e.donation?.media && /* @__PURE__ */ B.jsx("div", { style: { height: "100dvh", width: "100dvw" }, children: _3({
    media: e.donation.media,
    messageId: e.id,
    mediaSettings: t
  }) });
};
class k3 extends k.Component {
  static propTypes = {
    children: Ne.node.isRequired,
    element: Ne.node,
    hasMore: Ne.bool,
    initialLoad: Ne.bool,
    isReverse: Ne.bool,
    loader: Ne.node,
    loadMore: Ne.func.isRequired,
    pageStart: Ne.number,
    ref: Ne.func,
    getScrollParent: Ne.func,
    threshold: Ne.number,
    useCapture: Ne.bool,
    useWindow: Ne.bool
  };
  static defaultProps = {
    element: "div",
    hasMore: !1,
    initialLoad: !0,
    pageStart: 0,
    ref: null,
    threshold: 250,
    useWindow: !0,
    isReverse: !1,
    useCapture: !1,
    loader: null,
    getScrollParent: null
  };
  constructor(t) {
    super(t), this.scrollListener = this.scrollListener.bind(this), this.eventListenerOptions = this.eventListenerOptions.bind(this), this.mousewheelListener = this.mousewheelListener.bind(this);
  }
  componentDidMount() {
    this.pageLoaded = this.props.pageStart, this.options = this.eventListenerOptions(), this.attachScrollListener();
  }
  componentDidUpdate() {
    if (this.props.isReverse && this.loadMore) {
      const t = this.getParentElement(this.scrollComponent);
      t.scrollTop = t.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop, this.loadMore = !1;
    }
    this.attachScrollListener();
  }
  componentWillUnmount() {
    this.detachScrollListener(), this.detachMousewheelListener();
  }
  isPassiveSupported() {
    let t = !1;
    const r = {
      get passive() {
        t = !0;
      }
    };
    try {
      document.addEventListener("test", null, r), document.removeEventListener("test", null, r);
    } catch {
    }
    return t;
  }
  eventListenerOptions() {
    let t = this.props.useCapture;
    return this.isPassiveSupported() ? t = {
      useCapture: this.props.useCapture,
      passive: !0
    } : t = {
      passive: !1
    }, t;
  }
  // Set a defaut loader for all your `InfiniteScroll` components
  setDefaultLoader(t) {
    this.defaultLoader = t;
  }
  detachMousewheelListener() {
    let t = window;
    this.props.useWindow === !1 && (t = this.scrollComponent.parentNode), t.removeEventListener(
      "mousewheel",
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture
    );
  }
  detachScrollListener() {
    let t = window;
    this.props.useWindow === !1 && (t = this.getParentElement(this.scrollComponent)), t.removeEventListener(
      "scroll",
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    ), t.removeEventListener(
      "resize",
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    );
  }
  getParentElement(t) {
    const r = this.props.getScrollParent && this.props.getScrollParent();
    return r ?? (t && t.parentNode);
  }
  filterProps(t) {
    return t;
  }
  attachScrollListener() {
    const t = this.getParentElement(this.scrollComponent);
    if (!this.props.hasMore || !t)
      return;
    let r = window;
    this.props.useWindow === !1 && (r = t), r.addEventListener(
      "mousewheel",
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture
    ), r.addEventListener(
      "scroll",
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    ), r.addEventListener(
      "resize",
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    ), this.props.initialLoad && this.scrollListener();
  }
  mousewheelListener(t) {
    t.deltaY === 1 && !this.isPassiveSupported() && t.preventDefault();
  }
  scrollListener() {
    const t = this.scrollComponent, r = window, o = this.getParentElement(t);
    let s;
    if (this.props.useWindow) {
      const l = document.documentElement || document.body.parentNode || document.body, u = r.pageYOffset !== void 0 ? r.pageYOffset : l.scrollTop;
      this.props.isReverse ? s = u : s = this.calculateOffset(t, u);
    } else this.props.isReverse ? s = o.scrollTop : s = t.scrollHeight - o.scrollTop - o.clientHeight;
    s < Number(this.props.threshold) && t && t.offsetParent !== null && (this.detachScrollListener(), this.beforeScrollHeight = o.scrollHeight, this.beforeScrollTop = o.scrollTop, typeof this.props.loadMore == "function" && (this.props.loadMore(this.pageLoaded += 1), this.loadMore = !0));
  }
  calculateOffset(t, r) {
    return t ? this.calculateTopPosition(t) + (t.offsetHeight - r - window.innerHeight) : 0;
  }
  calculateTopPosition(t) {
    return t ? t.offsetTop + this.calculateTopPosition(t.offsetParent) : 0;
  }
  render() {
    const t = this.filterProps(this.props), {
      children: r,
      element: o,
      hasMore: s,
      initialLoad: l,
      isReverse: u,
      loader: d,
      loadMore: p,
      pageStart: f,
      ref: g,
      threshold: y,
      useCapture: v,
      useWindow: _,
      getScrollParent: S,
      ...b
    } = t;
    b.ref = (R) => {
      this.scrollComponent = R, g && g(R);
    };
    const C = [r];
    return s && (d ? u ? C.unshift(d) : C.push(d) : this.defaultLoader && (u ? C.unshift(this.defaultLoader) : C.push(this.defaultLoader))), Wt.createElement(o, b, C);
  }
}
const C3 = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8"
}), "Replay"), JS = (e) => {
  switch (e) {
    case Br.Youtube:
      return "#c4302b";
    case Br.Twitch:
      return "#9146FF ";
    case Br.TikTok:
      return "#00f2ea";
  }
}, ac = (e) => {
  switch (e) {
    case Ft.Donation:
      return "#ffca28";
    case Ft.Subscription:
      return "#FF4500";
    case Ft.Follow:
      return "#B2DFDB";
    case Ft.Raid:
      return "#00ffbfff";
  }
}, E3 = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M6 19h4V5H6zm8-14v14h4V5z"
}), "Pause"), P3 = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M8 5v14l11-7z"
}), "PlayArrow"), R3 = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "m6 18 8.5-6L6 6zM16 6v12h2V6z"
}), "SkipNext");
var ru = { exports: {} }, T3 = ru.exports, Nw;
function $3() {
  return Nw || (Nw = 1, function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(T3, function() {
      var r = 1e3, o = 6e4, s = 36e5, l = "millisecond", u = "second", d = "minute", p = "hour", f = "day", g = "week", y = "month", v = "quarter", _ = "year", S = "date", b = "Invalid Date", C = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, R = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, O = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var j = ["th", "st", "nd", "rd"], H = F % 100;
        return "[" + F + (j[(H - 20) % 10] || j[H] || j[0]) + "]";
      } }, x = function(F, j, H) {
        var Y = String(F);
        return !Y || Y.length >= j ? F : "" + Array(j + 1 - Y.length).join(H) + F;
      }, P = { s: x, z: function(F) {
        var j = -F.utcOffset(), H = Math.abs(j), Y = Math.floor(H / 60), U = H % 60;
        return (j <= 0 ? "+" : "-") + x(Y, 2, "0") + ":" + x(U, 2, "0");
      }, m: function F(j, H) {
        if (j.date() < H.date()) return -F(H, j);
        var Y = 12 * (H.year() - j.year()) + (H.month() - j.month()), U = j.clone().add(Y, y), W = H - U < 0, K = j.clone().add(Y + (W ? -1 : 1), y);
        return +(-(Y + (H - U) / (W ? U - K : K - U)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: y, y: _, w: g, d: f, D: S, h: p, m: d, s: u, ms: l, Q: v }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, E = "en", M = {};
      M[E] = O;
      var A = "$isDayjsObject", I = function(F) {
        return F instanceof N || !(!F || !F[A]);
      }, L = function F(j, H, Y) {
        var U;
        if (!j) return E;
        if (typeof j == "string") {
          var W = j.toLowerCase();
          M[W] && (U = W), H && (M[W] = H, U = W);
          var K = j.split("-");
          if (!U && K.length > 1) return F(K[0]);
        } else {
          var D = j.name;
          M[D] = j, U = D;
        }
        return !Y && U && (E = U), U || !Y && E;
      }, w = function(F, j) {
        if (I(F)) return F.clone();
        var H = typeof j == "object" ? j : {};
        return H.date = F, H.args = arguments, new N(H);
      }, T = P;
      T.l = L, T.i = I, T.w = function(F, j) {
        return w(F, { locale: j.$L, utc: j.$u, x: j.$x, $offset: j.$offset });
      };
      var N = function() {
        function F(H) {
          this.$L = L(H.locale, null, !0), this.parse(H), this.$x = this.$x || H.x || {}, this[A] = !0;
        }
        var j = F.prototype;
        return j.parse = function(H) {
          this.$d = function(Y) {
            var U = Y.date, W = Y.utc;
            if (U === null) return /* @__PURE__ */ new Date(NaN);
            if (T.u(U)) return /* @__PURE__ */ new Date();
            if (U instanceof Date) return new Date(U);
            if (typeof U == "string" && !/Z$/i.test(U)) {
              var K = U.match(C);
              if (K) {
                var D = K[2] - 1 || 0, G = (K[7] || "0").substring(0, 3);
                return W ? new Date(Date.UTC(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, G)) : new Date(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, G);
              }
            }
            return new Date(U);
          }(H), this.init();
        }, j.init = function() {
          var H = this.$d;
          this.$y = H.getFullYear(), this.$M = H.getMonth(), this.$D = H.getDate(), this.$W = H.getDay(), this.$H = H.getHours(), this.$m = H.getMinutes(), this.$s = H.getSeconds(), this.$ms = H.getMilliseconds();
        }, j.$utils = function() {
          return T;
        }, j.isValid = function() {
          return this.$d.toString() !== b;
        }, j.isSame = function(H, Y) {
          var U = w(H);
          return this.startOf(Y) <= U && U <= this.endOf(Y);
        }, j.isAfter = function(H, Y) {
          return w(H) < this.startOf(Y);
        }, j.isBefore = function(H, Y) {
          return this.endOf(Y) < w(H);
        }, j.$g = function(H, Y, U) {
          return T.u(H) ? this[Y] : this.set(U, H);
        }, j.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, j.valueOf = function() {
          return this.$d.getTime();
        }, j.startOf = function(H, Y) {
          var U = this, W = !!T.u(Y) || Y, K = T.p(H), D = function(fe, ue) {
            var we = T.w(U.$u ? Date.UTC(U.$y, ue, fe) : new Date(U.$y, ue, fe), U);
            return W ? we : we.endOf(f);
          }, G = function(fe, ue) {
            return T.w(U.toDate()[fe].apply(U.toDate("s"), (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ue)), U);
          }, oe = this.$W, te = this.$M, se = this.$D, le = "set" + (this.$u ? "UTC" : "");
          switch (K) {
            case _:
              return W ? D(1, 0) : D(31, 11);
            case y:
              return W ? D(1, te) : D(0, te + 1);
            case g:
              var de = this.$locale().weekStart || 0, he = (oe < de ? oe + 7 : oe) - de;
              return D(W ? se - he : se + (6 - he), te);
            case f:
            case S:
              return G(le + "Hours", 0);
            case p:
              return G(le + "Minutes", 1);
            case d:
              return G(le + "Seconds", 2);
            case u:
              return G(le + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, j.endOf = function(H) {
          return this.startOf(H, !1);
        }, j.$set = function(H, Y) {
          var U, W = T.p(H), K = "set" + (this.$u ? "UTC" : ""), D = (U = {}, U[f] = K + "Date", U[S] = K + "Date", U[y] = K + "Month", U[_] = K + "FullYear", U[p] = K + "Hours", U[d] = K + "Minutes", U[u] = K + "Seconds", U[l] = K + "Milliseconds", U)[W], G = W === f ? this.$D + (Y - this.$W) : Y;
          if (W === y || W === _) {
            var oe = this.clone().set(S, 1);
            oe.$d[D](G), oe.init(), this.$d = oe.set(S, Math.min(this.$D, oe.daysInMonth())).$d;
          } else D && this.$d[D](G);
          return this.init(), this;
        }, j.set = function(H, Y) {
          return this.clone().$set(H, Y);
        }, j.get = function(H) {
          return this[T.p(H)]();
        }, j.add = function(H, Y) {
          var U, W = this;
          H = Number(H);
          var K = T.p(Y), D = function(te) {
            var se = w(W);
            return T.w(se.date(se.date() + Math.round(te * H)), W);
          };
          if (K === y) return this.set(y, this.$M + H);
          if (K === _) return this.set(_, this.$y + H);
          if (K === f) return D(1);
          if (K === g) return D(7);
          var G = (U = {}, U[d] = o, U[p] = s, U[u] = r, U)[K] || 1, oe = this.$d.getTime() + H * G;
          return T.w(oe, this);
        }, j.subtract = function(H, Y) {
          return this.add(-1 * H, Y);
        }, j.format = function(H) {
          var Y = this, U = this.$locale();
          if (!this.isValid()) return U.invalidDate || b;
          var W = H || "YYYY-MM-DDTHH:mm:ssZ", K = T.z(this), D = this.$H, G = this.$m, oe = this.$M, te = U.weekdays, se = U.months, le = U.meridiem, de = function(ue, we, _e, qe) {
            return ue && (ue[we] || ue(Y, W)) || _e[we].slice(0, qe);
          }, he = function(ue) {
            return T.s(D % 12 || 12, ue, "0");
          }, fe = le || function(ue, we, _e) {
            var qe = ue < 12 ? "AM" : "PM";
            return _e ? qe.toLowerCase() : qe;
          };
          return W.replace(R, function(ue, we) {
            return we || function(_e) {
              switch (_e) {
                case "YY":
                  return String(Y.$y).slice(-2);
                case "YYYY":
                  return T.s(Y.$y, 4, "0");
                case "M":
                  return oe + 1;
                case "MM":
                  return T.s(oe + 1, 2, "0");
                case "MMM":
                  return de(U.monthsShort, oe, se, 3);
                case "MMMM":
                  return de(se, oe);
                case "D":
                  return Y.$D;
                case "DD":
                  return T.s(Y.$D, 2, "0");
                case "d":
                  return String(Y.$W);
                case "dd":
                  return de(U.weekdaysMin, Y.$W, te, 2);
                case "ddd":
                  return de(U.weekdaysShort, Y.$W, te, 3);
                case "dddd":
                  return te[Y.$W];
                case "H":
                  return String(D);
                case "HH":
                  return T.s(D, 2, "0");
                case "h":
                  return he(1);
                case "hh":
                  return he(2);
                case "a":
                  return fe(D, G, !0);
                case "A":
                  return fe(D, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return T.s(G, 2, "0");
                case "s":
                  return String(Y.$s);
                case "ss":
                  return T.s(Y.$s, 2, "0");
                case "SSS":
                  return T.s(Y.$ms, 3, "0");
                case "Z":
                  return K;
              }
              return null;
            }(ue) || K.replace(":", "");
          });
        }, j.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, j.diff = function(H, Y, U) {
          var W, K = this, D = T.p(Y), G = w(H), oe = (G.utcOffset() - this.utcOffset()) * o, te = this - G, se = function() {
            return T.m(K, G);
          };
          switch (D) {
            case _:
              W = se() / 12;
              break;
            case y:
              W = se();
              break;
            case v:
              W = se() / 3;
              break;
            case g:
              W = (te - oe) / 6048e5;
              break;
            case f:
              W = (te - oe) / 864e5;
              break;
            case p:
              W = te / s;
              break;
            case d:
              W = te / o;
              break;
            case u:
              W = te / r;
              break;
            default:
              W = te;
          }
          return U ? W : T.a(W);
        }, j.daysInMonth = function() {
          return this.endOf(y).$D;
        }, j.$locale = function() {
          return M[this.$L];
        }, j.locale = function(H, Y) {
          if (!H) return this.$L;
          var U = this.clone(), W = L(H, Y, !0);
          return W && (U.$L = W), U;
        }, j.clone = function() {
          return T.w(this.$d, this);
        }, j.toDate = function() {
          return new Date(this.valueOf());
        }, j.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, j.toISOString = function() {
          return this.$d.toISOString();
        }, j.toString = function() {
          return this.$d.toUTCString();
        }, F;
      }(), V = N.prototype;
      return w.prototype = V, [["$ms", l], ["$s", u], ["$m", d], ["$H", p], ["$W", f], ["$M", y], ["$y", _], ["$D", S]].forEach(function(F) {
        V[F[1]] = function(j) {
          return this.$g(j, F[0], F[1]);
        };
      }), w.extend = function(F, j) {
        return F.$i || (F(j, N, w), F.$i = !0), w;
      }, w.locale = L, w.isDayjs = I, w.unix = function(F) {
        return w(1e3 * F);
      }, w.en = M[E], w.Ls = M, w.p = {}, w;
    });
  }(ru)), ru.exports;
}
var M3 = $3();
const XS = /* @__PURE__ */ Qr(M3);
var iu = { exports: {} }, A3 = iu.exports, Lw;
function I3() {
  return Lw || (Lw = 1, function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(A3, function() {
      var r, o, s = 1e3, l = 6e4, u = 36e5, d = 864e5, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, f = 31536e6, g = 2628e6, y = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, v = { years: f, months: g, days: d, hours: u, minutes: l, seconds: s, milliseconds: 1, weeks: 6048e5 }, _ = function(M) {
        return M instanceof P;
      }, S = function(M, A, I) {
        return new P(M, I, A.$l);
      }, b = function(M) {
        return o.p(M) + "s";
      }, C = function(M) {
        return M < 0;
      }, R = function(M) {
        return C(M) ? Math.ceil(M) : Math.floor(M);
      }, O = function(M) {
        return Math.abs(M);
      }, x = function(M, A) {
        return M ? C(M) ? { negative: !0, format: "" + O(M) + A } : { negative: !1, format: "" + M + A } : { negative: !1, format: "" };
      }, P = function() {
        function M(I, L, w) {
          var T = this;
          if (this.$d = {}, this.$l = w, I === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), L) return S(I * v[b(L)], this);
          if (typeof I == "number") return this.$ms = I, this.parseFromMilliseconds(), this;
          if (typeof I == "object") return Object.keys(I).forEach(function(F) {
            T.$d[b(F)] = I[F];
          }), this.calMilliseconds(), this;
          if (typeof I == "string") {
            var N = I.match(y);
            if (N) {
              var V = N.slice(2).map(function(F) {
                return F != null ? Number(F) : 0;
              });
              return this.$d.years = V[0], this.$d.months = V[1], this.$d.weeks = V[2], this.$d.days = V[3], this.$d.hours = V[4], this.$d.minutes = V[5], this.$d.seconds = V[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var A = M.prototype;
        return A.calMilliseconds = function() {
          var I = this;
          this.$ms = Object.keys(this.$d).reduce(function(L, w) {
            return L + (I.$d[w] || 0) * v[w];
          }, 0);
        }, A.parseFromMilliseconds = function() {
          var I = this.$ms;
          this.$d.years = R(I / f), I %= f, this.$d.months = R(I / g), I %= g, this.$d.days = R(I / d), I %= d, this.$d.hours = R(I / u), I %= u, this.$d.minutes = R(I / l), I %= l, this.$d.seconds = R(I / s), I %= s, this.$d.milliseconds = I;
        }, A.toISOString = function() {
          var I = x(this.$d.years, "Y"), L = x(this.$d.months, "M"), w = +this.$d.days || 0;
          this.$d.weeks && (w += 7 * this.$d.weeks);
          var T = x(w, "D"), N = x(this.$d.hours, "H"), V = x(this.$d.minutes, "M"), F = this.$d.seconds || 0;
          this.$d.milliseconds && (F += this.$d.milliseconds / 1e3, F = Math.round(1e3 * F) / 1e3);
          var j = x(F, "S"), H = I.negative || L.negative || T.negative || N.negative || V.negative || j.negative, Y = N.format || V.format || j.format ? "T" : "", U = (H ? "-" : "") + "P" + I.format + L.format + T.format + Y + N.format + V.format + j.format;
          return U === "P" || U === "-P" ? "P0D" : U;
        }, A.toJSON = function() {
          return this.toISOString();
        }, A.format = function(I) {
          var L = I || "YYYY-MM-DDTHH:mm:ss", w = { Y: this.$d.years, YY: o.s(this.$d.years, 2, "0"), YYYY: o.s(this.$d.years, 4, "0"), M: this.$d.months, MM: o.s(this.$d.months, 2, "0"), D: this.$d.days, DD: o.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: o.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: o.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: o.s(this.$d.seconds, 2, "0"), SSS: o.s(this.$d.milliseconds, 3, "0") };
          return L.replace(p, function(T, N) {
            return N || String(w[T]);
          });
        }, A.as = function(I) {
          return this.$ms / v[b(I)];
        }, A.get = function(I) {
          var L = this.$ms, w = b(I);
          return w === "milliseconds" ? L %= 1e3 : L = w === "weeks" ? R(L / v[w]) : this.$d[w], L || 0;
        }, A.add = function(I, L, w) {
          var T;
          return T = L ? I * v[b(L)] : _(I) ? I.$ms : S(I, this).$ms, S(this.$ms + T * (w ? -1 : 1), this);
        }, A.subtract = function(I, L) {
          return this.add(I, L, !0);
        }, A.locale = function(I) {
          var L = this.clone();
          return L.$l = I, L;
        }, A.clone = function() {
          return S(this.$ms, this);
        }, A.humanize = function(I) {
          return r().add(this.$ms, "ms").locale(this.$l).fromNow(!I);
        }, A.valueOf = function() {
          return this.asMilliseconds();
        }, A.milliseconds = function() {
          return this.get("milliseconds");
        }, A.asMilliseconds = function() {
          return this.as("milliseconds");
        }, A.seconds = function() {
          return this.get("seconds");
        }, A.asSeconds = function() {
          return this.as("seconds");
        }, A.minutes = function() {
          return this.get("minutes");
        }, A.asMinutes = function() {
          return this.as("minutes");
        }, A.hours = function() {
          return this.get("hours");
        }, A.asHours = function() {
          return this.as("hours");
        }, A.days = function() {
          return this.get("days");
        }, A.asDays = function() {
          return this.as("days");
        }, A.weeks = function() {
          return this.get("weeks");
        }, A.asWeeks = function() {
          return this.as("weeks");
        }, A.months = function() {
          return this.get("months");
        }, A.asMonths = function() {
          return this.as("months");
        }, A.years = function() {
          return this.get("years");
        }, A.asYears = function() {
          return this.as("years");
        }, M;
      }(), E = function(M, A, I) {
        return M.add(A.years() * I, "y").add(A.months() * I, "M").add(A.days() * I, "d").add(A.hours() * I, "h").add(A.minutes() * I, "m").add(A.seconds() * I, "s").add(A.milliseconds() * I, "ms");
      };
      return function(M, A, I) {
        r = I, o = I().$utils(), I.duration = function(T, N) {
          var V = I.locale();
          return S(T, { $l: V }, N);
        }, I.isDuration = _;
        var L = A.prototype.add, w = A.prototype.subtract;
        A.prototype.add = function(T, N) {
          return _(T) ? E(this, T, 1) : L.bind(this)(T, N);
        }, A.prototype.subtract = function(T, N) {
          return _(T) ? E(this, T, -1) : w.bind(this)(T, N);
        };
      };
    });
  }(iu)), iu.exports;
}
var O3 = I3();
const N3 = /* @__PURE__ */ Qr(O3);
XS.extend(N3);
const ca = ({ createdAt: e }) => {
  const t = XS(e * 1e3);
  return /* @__PURE__ */ B.jsx("span", { style: { fontSize: 12 }, children: t.format("YYYY-MM-DD HH:mm:ss") });
}, L3 = ({ donation: e }) => {
  const { pausedMediaId: t } = qn((o) => o.mediaState), r = bn();
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: e.media && /* @__PURE__ */ B.jsxs(
    "div",
    {
      style: {
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "grid",
        placeItems: "center",
        zIndex: 1,
        top: 0,
        left: 0,
        background: JS(e.media.media_type)
      },
      children: [
        /* @__PURE__ */ B.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 15,
              right: 15
            },
            children: /* @__PURE__ */ B.jsx(ca, { createdAt: e.created_at })
          }
        ),
        /* @__PURE__ */ B.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 15,
              left: 15
            },
            children: e.user_name
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { position: "relative", display: "grid" }, children: [
          /* @__PURE__ */ B.jsx(
            fu,
            {
              onClick: () => {
                t === e.message_id ? r.send({
                  event: ie.PlayMedia,
                  data: e.message_id
                }) : r.send({
                  event: ie.PauseMedia,
                  data: e.message_id
                });
              },
              children: t === e.message_id ? /* @__PURE__ */ B.jsx(P3, { sx: { height: 50, width: 50 } }) : /* @__PURE__ */ B.jsx(E3, { sx: { height: 50, width: 50 } })
            }
          ),
          /* @__PURE__ */ B.jsx(
            fu,
            {
              style: {
                position: "absolute",
                justifySelf: "center",
                alignSelf: "center",
                left: 70
              },
              onClick: () => {
                r.send({
                  event: ie.SkipMedia,
                  data: e.message_id
                });
              },
              children: /* @__PURE__ */ B.jsx(R3, {})
            }
          )
        ] })
      ]
    }
  ) });
}, D3 = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  const { t: o } = Jr(), s = bn(), { services: l } = qn((d) => d.servicesState), u = e.donation;
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: u && /* @__PURE__ */ B.jsxs(
    Ku,
    {
      sx: (d) => ({
        display: "flex",
        position: "relative",
        border: "2px solid",
        borderRadius: 3,
        boxSizing: "border-box",
        borderColor: t ? d.palette.primary.main : d.palette.background.default,
        marginBottom: "5px",
        minHeight: "5.3rem",
        overflow: "hidden"
      }),
      children: [
        r && /* @__PURE__ */ B.jsx(L3, { donation: u }),
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: u?.media ? JS(u.media.media_type) : ac(e.type),
              minHeight: "100%"
            },
            children: u.media && !r && !t && /* @__PURE__ */ B.jsx(
              fu,
              {
                onClick: () => {
                  s.send({
                    event: ie.ReplayMedia,
                    data: e
                  });
                },
                children: /* @__PURE__ */ B.jsx(C3, {})
              }
            )
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { width: "100%", padding: 15, wordBreak: "break-word" }, children: [
          /* @__PURE__ */ B.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ B.jsx(ca, { createdAt: e.created_at }) }),
          /* @__PURE__ */ B.jsx("div", { children: /* @__PURE__ */ B.jsx(
            qu,
            {
              sx: (d) => ({
                color: d.palette.primary.main
              }),
              children: o("message.donated", {
                user_name: u.user_name,
                currency: YS(u.currency),
                amount: u.amount
              })
            }
          ) }),
          /* @__PURE__ */ B.jsx("div", { children: /* @__PURE__ */ B.jsx("span", { children: u.text }) }),
          /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ie.ReplayAlert,
                        data: e
                      });
                    },
                    children: o("message.replay")
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ie.SkipAlert,
                        data: e.id
                      });
                    },
                    children: o("message.skip")
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: l[u.service].color,
              minHeight: "100%"
            }
          }
        )
      ]
    }
  ) });
}, F3 = k.memo(D3), z3 = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = Jr(), o = bn(), { services: s } = qn((u) => u.servicesState), l = e.follow;
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: l && /* @__PURE__ */ B.jsxs(
    Ku,
    {
      sx: (u) => ({
        display: "flex",
        position: "relative",
        border: "2px solid",
        borderRadius: 3,
        boxSizing: "border-box",
        borderColor: t ? u.palette.primary.main : u.palette.background.default,
        marginBottom: "5px",
        minHeight: "5.3rem",
        overflow: "hidden"
      }),
      children: [
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: ac(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ B.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ B.jsx(ca, { createdAt: e.created_at }) }),
          /* @__PURE__ */ B.jsx("div", { children: /* @__PURE__ */ B.jsx(
            qu,
            {
              sx: (u) => ({
                color: u.palette.primary.main
              }),
              children: r("message.followed", { user_name: l.user_name })
            }
          ) }),
          /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.SkipAlert,
                        data: e.id
                      });
                    },
                    children: r("message.skip")
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: s[l.service].color,
              minHeight: "100%"
            }
          }
        )
      ]
    }
  ) });
}, j3 = k.memo(z3), B3 = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = Jr(), o = bn(), { services: s } = qn((u) => u.servicesState), l = e.raid;
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: l && /* @__PURE__ */ B.jsxs(
    Ku,
    {
      sx: (u) => ({
        display: "flex",
        position: "relative",
        border: "2px solid",
        borderRadius: 3,
        boxSizing: "border-box",
        borderColor: t ? u.palette.primary.main : u.palette.background.default,
        marginBottom: "5px",
        minHeight: "5.3rem",
        overflow: "hidden"
      }),
      children: [
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: ac(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ B.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ B.jsx(ca, { createdAt: e.created_at }) }),
          /* @__PURE__ */ B.jsx("div", { children: /* @__PURE__ */ B.jsx(
            qu,
            {
              sx: (u) => ({
                color: u.palette.primary.main
              }),
              children: r("message.raided_with", {
                viewers: l.viewers,
                user_name: l.from_broadcaster_user_name
              })
            }
          ) }),
          /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.SkipAlert,
                        data: e.id
                      });
                    },
                    children: r("message.skip")
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: s[l.service].color,
              minHeight: "100%"
            }
          }
        )
      ]
    }
  ) });
}, U3 = k.memo(B3), W3 = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = Jr(), o = bn(), { services: s } = qn((u) => u.servicesState), l = e.subscription;
  return /* @__PURE__ */ B.jsx(B.Fragment, { children: l && /* @__PURE__ */ B.jsxs(
    Ku,
    {
      sx: (u) => ({
        display: "flex",
        position: "relative",
        border: "2px solid",
        borderRadius: 3,
        boxSizing: "border-box",
        borderColor: t ? u.palette.primary.main : u.palette.background.default,
        marginBottom: "5px",
        minHeight: "5.3rem",
        overflow: "hidden"
      }),
      children: [
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: ac(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ B.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ B.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ B.jsx(ca, { createdAt: e.created_at }) }),
          /* @__PURE__ */ B.jsx("div", { children: /* @__PURE__ */ B.jsx(
            qu,
            {
              sx: (u) => ({
                color: u.palette.primary.main
              }),
              children: l.is_gift ? r("message.gifted_subscriptions", {
                user_name: l.user_name,
                total: l.total
              }) : r("message.subscribed", {
                user_name: l.user_name
              })
            }
          ) }),
          /* @__PURE__ */ B.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  Vr,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ie.SkipAlert,
                        data: e.id
                      });
                    },
                    children: r("message.skip")
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ B.jsx(
          pr,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: s[l.service].color,
              minHeight: "100%"
            }
          }
        )
      ]
    }
  ) });
}, V3 = k.memo(W3), H3 = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  switch (e.type) {
    case Ft.Donation:
      return /* @__PURE__ */ B.jsx(
        F3,
        {
          message: e,
          isAlertPlaying: t,
          isMediaPlaying: r
        }
      );
    case Ft.Follow:
      return /* @__PURE__ */ B.jsx(j3, { message: e, isAlertPlaying: t });
    case Ft.Subscription:
      return /* @__PURE__ */ B.jsx(
        V3,
        {
          message: e,
          isAlertPlaying: t
        }
      );
    case Ft.Raid:
      return /* @__PURE__ */ B.jsx(U3, { message: e, isAlertPlaying: t });
    default:
      return /* @__PURE__ */ B.jsx("div", {});
  }
}, q3 = {
  isShowSnackBar: !1,
  snackBarMessage: "",
  alertSeverity: vu.info
}, K3 = $n({
  name: "snackBar",
  initialState: q3,
  reducers: {
    showSnackBar: (e, t) => {
      e.alertSeverity = t.payload.alertSeverity, e.isShowSnackBar = !0, e.snackBarMessage = t.payload.message;
    },
    hideSnackBar: (e) => {
      e.isShowSnackBar = !1;
    }
  }
}), { showSnackBar: Q3, hideSnackBar: p5 } = K3.actions, G3 = Gr(/* @__PURE__ */ B.jsx("path", {
  d: "M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61"
}), "FilterAlt"), Y3 = {
  filter: {
    exclude_donations: !1,
    exclude_follows: !1,
    exclude_subscriptions: !1,
    exclude_raids: !1
  }
}, ZS = $n({
  name: "messages",
  initialState: Y3,
  reducers: {
    setFilter: (e, t) => {
      e.filter = t.payload;
    }
  }
}), { setFilter: J3 } = ZS.actions, X3 = () => {
  const { filter: e } = qn((p) => p.messagesState), t = Ju(), [r, o] = k.useState(null), s = !!r, l = (p) => {
    o(p.currentTarget);
  }, u = () => {
    o(null);
  }, { t: d } = Jr();
  return /* @__PURE__ */ B.jsxs(B.Fragment, { children: [
    /* @__PURE__ */ B.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ B.jsx(fu, { onClick: l, children: /* @__PURE__ */ B.jsx(G3, {}) }) }),
    /* @__PURE__ */ B.jsx(lR, { anchorEl: r, open: s, onClose: u, children: /* @__PURE__ */ B.jsx(VP, { children: Object.entries(e).map(([p]) => /* @__PURE__ */ B.jsx(
      pR,
      {
        onClick: () => t(
          J3({
            ...e,
            [p]: !e[p]
          })
        ),
        children: /* @__PURE__ */ B.jsxs("div", { children: [
          /* @__PURE__ */ B.jsx(gP, { checked: e[p] }),
          /* @__PURE__ */ B.jsx("span", { children: d(`filter.${p}`) })
        ] })
      },
      p
    )) }) })
  ] });
}, Z3 = ({
  useGetMessagesInfiniteQuery: e
}) => {
  const { t } = Jr(), { playingAlertId: r } = qn(
    (y) => y.alertsState
  ), { filter: o } = qn((y) => y.messagesState), { playingMediaId: s } = qn((y) => y.mediaState), { data: l, fetchNextPage: u, hasNextPage: d, isFetchingNextPage: p, error: f } = e(
    {
      filter: o
    },
    {
      refetchOnFocus: !1,
      refetchOnMountOrArgChange: !1,
      refetchOnReconnect: !1
    }
  ), g = Ju();
  return k.useEffect(() => {
    f && g(
      Q3({
        message: f.message,
        alertSeverity: vu.error
      })
    );
  }, [f, g]), /* @__PURE__ */ B.jsxs(B.Fragment, { children: [
    /* @__PURE__ */ B.jsx(X3, {}),
    l?.pages[0].length ? /* @__PURE__ */ B.jsx(
      k3,
      {
        loadMore: () => u(),
        hasMore: !p && d,
        initialLoad: !1,
        useWindow: !0,
        threshold: 50,
        loader: /* @__PURE__ */ B.jsx("div", { children: t("loading") }, "loader"),
        children: /* @__PURE__ */ B.jsx("div", { children: l.pages.map(
          (y) => y.map((v) => /* @__PURE__ */ B.jsx(k.Fragment, { children: H3({
            message: v,
            isAlertPlaying: v.id === r,
            isMediaPlaying: v.id === s
          }) }, v.id))
        ) })
      }
    ) : /* @__PURE__ */ B.jsx(
      wR,
      {
        variant: "rectangular",
        sx: {
          display: "flex",
          borderRadius: 3,
          boxSizing: "border-box",
          marginBottom: "1rem",
          minHeight: "5.3rem",
          overflow: "hidden"
        }
      }
    )
  ] });
}, e5 = () => /* @__PURE__ */ B.jsx(
  pr,
  {
    sx: {
      background: (e) => e.palette.background.default,
      padding: "5px",
      minHeight: "100vh"
    },
    children: /* @__PURE__ */ B.jsx(
      Z3,
      {
        useGetMessagesInfiniteQuery: Ej
      }
    )
  }
), t5 = () => /* @__PURE__ */ B.jsxs(pT, { children: [
  /* @__PURE__ */ B.jsx(ao, { path: "/alert", element: /* @__PURE__ */ B.jsx(Fj, {}) }),
  /* @__PURE__ */ B.jsx(ao, { path: "/media", element: /* @__PURE__ */ B.jsx(x3, {}) }),
  /* @__PURE__ */ B.jsx(ao, { path: "/goal", element: /* @__PURE__ */ B.jsx(Uj, {}) }),
  /* @__PURE__ */ B.jsx(ao, { path: "/widget/:id", element: /* @__PURE__ */ B.jsx(Tj, { type: "view" }) }),
  /* @__PURE__ */ B.jsx(
    ao,
    {
      path: "/obs-dock-messages",
      element: /* @__PURE__ */ B.jsx(OC, { theme: Xs(Mj), children: /* @__PURE__ */ B.jsx(e5, {}) })
    }
  )
] }), n5 = {
  services: {
    [Bt.Streamelements]: {
      active: !1,
      color: "#2701fb",
      authPath: "/streamelements/token",
      settingsPath: ""
    },
    [Bt.TributeBot]: {
      active: !1,
      color: "#2692ffb2",
      authPath: "/telegram-authorization/request-code",
      settingsPath: ""
    },
    [Bt.Twitch]: {
      active: !1,
      color: "#9147ff",
      authPath: "/twitch/device-code",
      settingsPath: "/services-settings/twitch"
    },
    [Bt.WidySol]: {
      active: !1,
      color: "#370161",
      authPath: `/widy/create-donation-account/${wu.Sol}`,
      settingsPath: ""
    },
    [Bt.WidyTon]: {
      active: !1,
      color: "#0098ea",
      authPath: `/widy/create-donation-account/${wu.Ton}`,
      settingsPath: ""
    },
    [Bt.DonationAlerts]: {
      active: !1,
      color: "#f57d07",
      authPath: "/donationalerts/token",
      settingsPath: ""
    },
    [Bt.StreamLabs]: {
      active: !1,
      color: "#80f5d2",
      authPath: "/streamlabs/token",
      settingsPath: ""
    },
    [Bt.Donatello]: {
      active: !1,
      color: "#3579f6",
      authPath: "/donatello/token",
      settingsPath: ""
    },
    [Bt.Donatik]: {
      active: !1,
      color: "#7a44ed",
      authPath: "/donatik/token",
      settingsPath: ""
    }
  }
}, eb = $n({
  name: "services",
  initialState: n5,
  reducers: {
    setServiceActive: (e, t) => {
      e.services[t.payload.service].active = t.payload.active;
    }
  }
}), { setServiceActive: h5 } = eb.actions;
var r5 = { NODE_ENV: "production" };
const i5 = th({
  mediaState: IS.reducer,
  alertsState: MS.reducer,
  servicesState: eb.reducer,
  messagesState: ZS.reducer,
  [yr.reducerPath]: yr.reducer
}), o5 = (e) => uz({
  reducer: i5,
  middleware: (t) => t().concat(yr.middleware),
  preloadedState: e,
  devTools: r5.NODE_ENV !== "production"
}), vr = o5(), wr = new eh("ws://127.0.0.1:12553/ws");
wr.connect();
wr.subscribe(ie.Message, (e) => {
  vr.dispatch(hh.util.invalidateTags(["Messages"]));
});
wr.subscribe(ie.AlertPlaying, (e) => {
  vr.dispatch(AS(e));
});
wr.subscribe(ie.MediaPlaying, (e) => {
  vr.dispatch(lh("")), vr.dispatch(OS(e));
});
wr.subscribe(ie.MediaPaused, (e) => {
  vr.dispatch(lh(e));
});
wr.subscribe(ie.AlertPlayed, (e) => {
  vr.dispatch(AS(""));
});
wr.subscribe(ie.MediaPlayed, (e) => {
  vr.dispatch(OS("")), vr.dispatch(lh(""));
});
wr.subscribe(ie.Settings, (e) => {
  Pt.changeLanguage(e.language);
});
_R.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ B.jsx(Wt.StrictMode, { children: /* @__PURE__ */ B.jsx(bF, { context: gS, eventsService: wr, children: /* @__PURE__ */ B.jsx(mF, { store: vr, children: /* @__PURE__ */ B.jsxs(DT, { children: [
    /* @__PURE__ */ B.jsx(SP, {}),
    /* @__PURE__ */ B.jsx(t5, {})
  ] }) }) }) })
);
