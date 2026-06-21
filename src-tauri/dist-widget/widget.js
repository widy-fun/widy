function vx(e, t) {
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
function Zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ef = { exports: {} }, fs = {}, tf = { exports: {} }, Ee = {};
var py;
function wx() {
  if (py) return Ee;
  py = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), l = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), f = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), m = Symbol.iterator;
  function w(D) {
    return D === null || typeof D != "object" ? null : (D = m && D[m] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var k = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, S = Object.assign, _ = {};
  function x(D, Y, re) {
    this.props = D, this.context = Y, this.refs = _, this.updater = re || k;
  }
  x.prototype.isReactComponent = {}, x.prototype.setState = function(D, Y) {
    if (typeof D != "object" && typeof D != "function" && D != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, D, Y, "setState");
  }, x.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function $() {
  }
  $.prototype = x.prototype;
  function N(D, Y, re) {
    this.props = D, this.context = Y, this.refs = _, this.updater = re || k;
  }
  var C = N.prototype = new $();
  C.constructor = N, S(C, x.prototype), C.isPureReactComponent = !0;
  var R = Array.isArray, E = Object.prototype.hasOwnProperty, M = { current: null }, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function I(D, Y, re) {
    var te, se = {}, le = null, de = null;
    if (Y != null) for (te in Y.ref !== void 0 && (de = Y.ref), Y.key !== void 0 && (le = "" + Y.key), Y) E.call(Y, te) && !A.hasOwnProperty(te) && (se[te] = Y[te]);
    var he = arguments.length - 2;
    if (he === 1) se.children = re;
    else if (1 < he) {
      for (var fe = Array(he), ue = 0; ue < he; ue++) fe[ue] = arguments[ue + 2];
      se.children = fe;
    }
    if (D && D.defaultProps) for (te in he = D.defaultProps, he) se[te] === void 0 && (se[te] = he[te]);
    return { $$typeof: e, type: D, key: le, ref: de, props: se, _owner: M.current };
  }
  function L(D, Y) {
    return { $$typeof: e, type: D.type, key: Y, ref: D.ref, props: D.props, _owner: D._owner };
  }
  function v(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function P(D) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(re) {
      return Y[re];
    });
  }
  var O = /\/+/g;
  function F(D, Y) {
    return typeof D == "object" && D !== null && D.key != null ? P("" + D.key) : Y.toString(36);
  }
  function B(D, Y, re, te, se) {
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
    if (de) return de = D, se = se(de), D = te === "" ? "." + F(de, 0) : te, R(se) ? (re = "", D != null && (re = D.replace(O, "$&/") + "/"), B(se, Y, re, "", function(ue) {
      return ue;
    })) : se != null && (v(se) && (se = L(se, re + (!se.key || de && de.key === se.key ? "" : ("" + se.key).replace(O, "$&/") + "/") + D)), Y.push(se)), 1;
    if (de = 0, te = te === "" ? "." : te + ":", R(D)) for (var he = 0; he < D.length; he++) {
      le = D[he];
      var fe = te + F(le, he);
      de += B(le, Y, re, fe, se);
    }
    else if (fe = w(D), typeof fe == "function") for (D = fe.call(D), he = 0; !(le = D.next()).done; ) le = le.value, fe = te + F(le, he++), de += B(le, Y, re, fe, se);
    else if (le === "object") throw Y = String(D), Error("Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead.");
    return de;
  }
  function z(D, Y, re) {
    if (D == null) return D;
    var te = [], se = 0;
    return B(D, te, "", "", function(le) {
      return Y.call(re, le, se++);
    }), te;
  }
  function V(D) {
    if (D._status === -1) {
      var Y = D._result;
      Y = Y(), Y.then(function(re) {
        (D._status === 0 || D._status === -1) && (D._status = 1, D._result = re);
      }, function(re) {
        (D._status === 0 || D._status === -1) && (D._status = 2, D._result = re);
      }), D._status === -1 && (D._status = 0, D._result = Y);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var G = { current: null }, U = { transition: null }, H = { ReactCurrentDispatcher: G, ReactCurrentBatchConfig: U, ReactCurrentOwner: M };
  function K() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Ee.Children = { map: z, forEach: function(D, Y, re) {
    z(D, function() {
      Y.apply(this, arguments);
    }, re);
  }, count: function(D) {
    var Y = 0;
    return z(D, function() {
      Y++;
    }), Y;
  }, toArray: function(D) {
    return z(D, function(Y) {
      return Y;
    }) || [];
  }, only: function(D) {
    if (!v(D)) throw Error("React.Children.only expected to receive a single React element child.");
    return D;
  } }, Ee.Component = x, Ee.Fragment = r, Ee.Profiler = s, Ee.PureComponent = N, Ee.StrictMode = o, Ee.Suspense = p, Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H, Ee.act = K, Ee.cloneElement = function(D, Y, re) {
    if (D == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + D + ".");
    var te = S({}, D.props), se = D.key, le = D.ref, de = D._owner;
    if (Y != null) {
      if (Y.ref !== void 0 && (le = Y.ref, de = M.current), Y.key !== void 0 && (se = "" + Y.key), D.type && D.type.defaultProps) var he = D.type.defaultProps;
      for (fe in Y) E.call(Y, fe) && !A.hasOwnProperty(fe) && (te[fe] = Y[fe] === void 0 && he !== void 0 ? he[fe] : Y[fe]);
    }
    var fe = arguments.length - 2;
    if (fe === 1) te.children = re;
    else if (1 < fe) {
      he = Array(fe);
      for (var ue = 0; ue < fe; ue++) he[ue] = arguments[ue + 2];
      te.children = he;
    }
    return { $$typeof: e, type: D.type, key: se, ref: le, props: te, _owner: de };
  }, Ee.createContext = function(D) {
    return D = { $$typeof: u, _currentValue: D, _currentValue2: D, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, D.Provider = { $$typeof: l, _context: D }, D.Consumer = D;
  }, Ee.createElement = I, Ee.createFactory = function(D) {
    var Y = I.bind(null, D);
    return Y.type = D, Y;
  }, Ee.createRef = function() {
    return { current: null };
  }, Ee.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Ee.isValidElement = v, Ee.lazy = function(D) {
    return { $$typeof: g, _payload: { _status: -1, _result: D }, _init: V };
  }, Ee.memo = function(D, Y) {
    return { $$typeof: f, type: D, compare: Y === void 0 ? null : Y };
  }, Ee.startTransition = function(D) {
    var Y = U.transition;
    U.transition = {};
    try {
      D();
    } finally {
      U.transition = Y;
    }
  }, Ee.unstable_act = K, Ee.useCallback = function(D, Y) {
    return G.current.useCallback(D, Y);
  }, Ee.useContext = function(D) {
    return G.current.useContext(D);
  }, Ee.useDebugValue = function() {
  }, Ee.useDeferredValue = function(D) {
    return G.current.useDeferredValue(D);
  }, Ee.useEffect = function(D, Y) {
    return G.current.useEffect(D, Y);
  }, Ee.useId = function() {
    return G.current.useId();
  }, Ee.useImperativeHandle = function(D, Y, re) {
    return G.current.useImperativeHandle(D, Y, re);
  }, Ee.useInsertionEffect = function(D, Y) {
    return G.current.useInsertionEffect(D, Y);
  }, Ee.useLayoutEffect = function(D, Y) {
    return G.current.useLayoutEffect(D, Y);
  }, Ee.useMemo = function(D, Y) {
    return G.current.useMemo(D, Y);
  }, Ee.useReducer = function(D, Y, re) {
    return G.current.useReducer(D, Y, re);
  }, Ee.useRef = function(D) {
    return G.current.useRef(D);
  }, Ee.useState = function(D) {
    return G.current.useState(D);
  }, Ee.useSyncExternalStore = function(D, Y, re) {
    return G.current.useSyncExternalStore(D, Y, re);
  }, Ee.useTransition = function() {
    return G.current.useTransition();
  }, Ee.version = "18.3.1", Ee;
}
var hy;
function ju() {
  return hy || (hy = 1, tf.exports = wx()), tf.exports;
}
var gy;
function Sx() {
  if (gy) return fs;
  gy = 1;
  var e = ju(), t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(d, p, f) {
    var g, m = {}, w = null, k = null;
    f !== void 0 && (w = "" + f), p.key !== void 0 && (w = "" + p.key), p.ref !== void 0 && (k = p.ref);
    for (g in p) o.call(p, g) && !l.hasOwnProperty(g) && (m[g] = p[g]);
    if (d && d.defaultProps) for (g in p = d.defaultProps, p) m[g] === void 0 && (m[g] = p[g]);
    return { $$typeof: t, type: d, key: w, ref: k, props: m, _owner: s.current };
  }
  return fs.Fragment = r, fs.jsx = u, fs.jsxs = u, fs;
}
var my;
function bx() {
  return my || (my = 1, ef.exports = Sx()), ef.exports;
}
var j = bx();
const Fs = {
  black: "#000",
  white: "#fff"
}, io = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, oo = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, so = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, ao = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, lo = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
}, ps = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, _x = {
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
function Ei(e, ...t) {
  const r = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((o) => r.searchParams.append("args[]", o)), `Minified MUI error #${e}; visit ${r} for the full message.`;
}
const Gn = "$$material";
function pu() {
  return pu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) ({}).hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, pu.apply(null, arguments);
}
var b = ju();
const Ut = /* @__PURE__ */ Zr(b), Wf = /* @__PURE__ */ vx({
  __proto__: null,
  default: Ut
}, [b]);
function xx(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function kx(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Cx = /* @__PURE__ */ (function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(kx(this));
    var s = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var l = xx(s);
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
})(), Ft = "-ms-", hu = "-moz-", Ae = "-webkit-", eS = "comm", $p = "rule", Mp = "decl", Ex = "@import", tS = "@keyframes", Px = "@layer", Rx = Math.abs, zu = String.fromCharCode, Tx = Object.assign;
function $x(e, t) {
  return Pt(e, 0) ^ 45 ? (((t << 2 ^ Pt(e, 0)) << 2 ^ Pt(e, 1)) << 2 ^ Pt(e, 2)) << 2 ^ Pt(e, 3) : 0;
}
function nS(e) {
  return e.trim();
}
function Mx(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ie(e, t, r) {
  return e.replace(t, r);
}
function Uf(e, t) {
  return e.indexOf(t);
}
function Pt(e, t) {
  return e.charCodeAt(t) | 0;
}
function js(e, t, r) {
  return e.slice(t, r);
}
function Vn(e) {
  return e.length;
}
function Ap(e) {
  return e.length;
}
function Rl(e, t) {
  return t.push(e), e;
}
function Ax(e, t) {
  return e.map(t).join("");
}
var Bu = 1, yo = 1, rS = 0, Xt = 0, ct = 0, bo = "";
function Wu(e, t, r, o, s, l, u) {
  return { value: e, root: t, parent: r, type: o, props: s, children: l, line: Bu, column: yo, length: u, return: "" };
}
function hs(e, t) {
  return Tx(Wu("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Ix() {
  return ct;
}
function Nx() {
  return ct = Xt > 0 ? Pt(bo, --Xt) : 0, yo--, ct === 10 && (yo = 1, Bu--), ct;
}
function sn() {
  return ct = Xt < rS ? Pt(bo, Xt++) : 0, yo++, ct === 10 && (yo = 1, Bu++), ct;
}
function Yn() {
  return Pt(bo, Xt);
}
function tu() {
  return Xt;
}
function Zs(e, t) {
  return js(bo, e, t);
}
function zs(e) {
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
function iS(e) {
  return Bu = yo = 1, rS = Vn(bo = e), Xt = 0, [];
}
function oS(e) {
  return bo = "", e;
}
function nu(e) {
  return nS(Zs(Xt - 1, Vf(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ox(e) {
  for (; (ct = Yn()) && ct < 33; )
    sn();
  return zs(e) > 2 || zs(ct) > 3 ? "" : " ";
}
function Lx(e, t) {
  for (; --t && sn() && !(ct < 48 || ct > 102 || ct > 57 && ct < 65 || ct > 70 && ct < 97); )
    ;
  return Zs(e, tu() + (t < 6 && Yn() == 32 && sn() == 32));
}
function Vf(e) {
  for (; sn(); )
    switch (ct) {
      // ] ) " '
      case e:
        return Xt;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Vf(ct);
        break;
      // (
      case 40:
        e === 41 && Vf(e);
        break;
      // \
      case 92:
        sn();
        break;
    }
  return Xt;
}
function Dx(e, t) {
  for (; sn() && e + ct !== 57; )
    if (e + ct === 84 && Yn() === 47)
      break;
  return "/*" + Zs(t, Xt - 1) + "*" + zu(e === 47 ? e : sn());
}
function Fx(e) {
  for (; !zs(Yn()); )
    sn();
  return Zs(e, Xt);
}
function jx(e) {
  return oS(ru("", null, null, null, [""], e = iS(e), 0, [0], e));
}
function ru(e, t, r, o, s, l, u, d, p) {
  for (var f = 0, g = 0, m = u, w = 0, k = 0, S = 0, _ = 1, x = 1, $ = 1, N = 0, C = "", R = s, E = l, M = o, A = C; x; )
    switch (S = N, N = sn()) {
      // (
      case 40:
        if (S != 108 && Pt(A, m - 1) == 58) {
          Uf(A += Ie(nu(N), "&", "&\f"), "&\f") != -1 && ($ = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        A += nu(N);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        A += Ox(S);
        break;
      // \
      case 92:
        A += Lx(tu() - 1, 7);
        continue;
      // /
      case 47:
        switch (Yn()) {
          case 42:
          case 47:
            Rl(zx(Dx(sn(), tu()), t, r), p);
            break;
          default:
            A += "/";
        }
        break;
      // {
      case 123 * _:
        d[f++] = Vn(A) * $;
      // } ; \0
      case 125 * _:
      case 59:
      case 0:
        switch (N) {
          // \0 }
          case 0:
          case 125:
            x = 0;
          // ;
          case 59 + g:
            $ == -1 && (A = Ie(A, /\f/g, "")), k > 0 && Vn(A) - m && Rl(k > 32 ? vy(A + ";", o, r, m - 1) : vy(Ie(A, " ", "") + ";", o, r, m - 2), p);
            break;
          // @ ;
          case 59:
            A += ";";
          // { rule/at-rule
          default:
            if (Rl(M = yy(A, t, r, f, g, s, d, C, R = [], E = [], m), l), N === 123)
              if (g === 0)
                ru(A, t, M, M, R, l, m, d, E);
              else
                switch (w === 99 && Pt(A, 3) === 110 ? 100 : w) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ru(e, M, M, o && Rl(yy(e, M, M, 0, 0, s, d, C, s, R = [], m), E), s, E, m, d, o ? R : E);
                    break;
                  default:
                    ru(A, M, M, M, [""], E, 0, d, E);
                }
        }
        f = g = k = 0, _ = $ = 1, C = A = "", m = u;
        break;
      // :
      case 58:
        m = 1 + Vn(A), k = S;
      default:
        if (_ < 1) {
          if (N == 123)
            --_;
          else if (N == 125 && _++ == 0 && Nx() == 125)
            continue;
        }
        switch (A += zu(N), N * _) {
          // &
          case 38:
            $ = g > 0 ? 1 : (A += "\f", -1);
            break;
          // ,
          case 44:
            d[f++] = (Vn(A) - 1) * $, $ = 1;
            break;
          // @
          case 64:
            Yn() === 45 && (A += nu(sn())), w = Yn(), g = m = Vn(C = A += Fx(tu())), N++;
            break;
          // -
          case 45:
            S === 45 && Vn(A) == 2 && (_ = 0);
        }
    }
  return l;
}
function yy(e, t, r, o, s, l, u, d, p, f, g) {
  for (var m = s - 1, w = s === 0 ? l : [""], k = Ap(w), S = 0, _ = 0, x = 0; S < o; ++S)
    for (var $ = 0, N = js(e, m + 1, m = Rx(_ = u[S])), C = e; $ < k; ++$)
      (C = nS(_ > 0 ? w[$] + " " + N : Ie(N, /&\f/g, w[$]))) && (p[x++] = C);
  return Wu(e, t, r, s === 0 ? $p : d, p, f, g);
}
function zx(e, t, r) {
  return Wu(e, t, r, eS, zu(Ix()), js(e, 2, -2), 0);
}
function vy(e, t, r, o) {
  return Wu(e, t, r, Mp, js(e, 0, o), js(e, o + 1, -1), o);
}
function po(e, t) {
  for (var r = "", o = Ap(e), s = 0; s < o; s++)
    r += t(e[s], s, e, t) || "";
  return r;
}
function Bx(e, t, r, o) {
  switch (e.type) {
    case Px:
      if (e.children.length) break;
    case Ex:
    case Mp:
      return e.return = e.return || e.value;
    case eS:
      return "";
    case tS:
      return e.return = e.value + "{" + po(e.children, o) + "}";
    case $p:
      e.value = e.props.join(",");
  }
  return Vn(r = po(e.children, o)) ? e.return = e.value + "{" + r + "}" : "";
}
function Wx(e) {
  var t = Ap(e);
  return function(r, o, s, l) {
    for (var u = "", d = 0; d < t; d++)
      u += e[d](r, o, s, l) || "";
    return u;
  };
}
function Ux(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function sS(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var Vx = function(t, r, o) {
  for (var s = 0, l = 0; s = l, l = Yn(), s === 38 && l === 12 && (r[o] = 1), !zs(l); )
    sn();
  return Zs(t, Xt);
}, Hx = function(t, r) {
  var o = -1, s = 44;
  do
    switch (zs(s)) {
      case 0:
        s === 38 && Yn() === 12 && (r[o] = 1), t[o] += Vx(Xt - 1, r, o);
        break;
      case 2:
        t[o] += nu(s);
        break;
      case 4:
        if (s === 44) {
          t[++o] = Yn() === 58 ? "&\f" : "", r[o] = t[o].length;
          break;
        }
      // fallthrough
      default:
        t[o] += zu(s);
    }
  while (s = sn());
  return t;
}, qx = function(t, r) {
  return oS(Hx(iS(t), r));
}, wy = /* @__PURE__ */ new WeakMap(), Kx = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, o = t.parent, s = t.column === o.column && t.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !wy.get(o)) && !s) {
      wy.set(t, !0);
      for (var l = [], u = qx(r, l), d = o.props, p = 0, f = 0; p < u.length; p++)
        for (var g = 0; g < d.length; g++, f++)
          t.props[f] = l[p] ? u[p].replace(/&\f/g, d[g]) : d[g] + " " + u[p];
    }
  }
}, Qx = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function aS(e, t) {
  switch ($x(e, t)) {
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
      return Ae + e + hu + e + Ft + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return Ae + e + Ft + e + e;
    // order
    case 6165:
      return Ae + e + Ft + "flex-" + e + e;
    // align-items
    case 5187:
      return Ae + e + Ie(e, /(\w+).+(:[^]+)/, Ae + "box-$1$2" + Ft + "flex-$1$2") + e;
    // align-self
    case 5443:
      return Ae + e + Ft + "flex-item-" + Ie(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return Ae + e + Ft + "flex-line-pack" + Ie(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return Ae + e + Ft + Ie(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return Ae + e + Ft + Ie(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return Ae + "box-" + Ie(e, "-grow", "") + Ae + e + Ft + Ie(e, "grow", "positive") + e;
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
      return Ie(Ie(e, /(.+:)(flex-)?(.*)/, Ae + "box-pack:$3" + Ft + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ae + e + e;
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
      if (Vn(e) - 1 - t > 6) switch (Pt(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Pt(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return Ie(e, /(.+:)(.+)-([^]+)/, "$1" + Ae + "$2-$3$1" + hu + (Pt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Uf(e, "stretch") ? aS(Ie(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (Pt(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Pt(e, Vn(e) - 3 - (~Uf(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return Ie(e, ":", ":" + Ae) + e;
        // (inline-)?fl(e)x
        case 101:
          return Ie(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ae + (Pt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ae + "$2$3$1" + Ft + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (Pt(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return Ae + e + Ft + Ie(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return Ae + e + Ft + Ie(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return Ae + e + Ft + Ie(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Ae + e + Ft + e + e;
  }
  return e;
}
var Gx = function(t, r, o, s) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Mp:
      t.return = aS(t.value, t.length);
      break;
    case tS:
      return po([hs(t, {
        value: Ie(t.value, "@", "@" + Ae)
      })], s);
    case $p:
      if (t.length) return Ax(t.props, function(l) {
        switch (Mx(l, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return po([hs(t, {
              props: [Ie(l, /:(read-\w+)/, ":" + hu + "$1")]
            })], s);
          // :placeholder
          case "::placeholder":
            return po([hs(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + Ae + "input-$1")]
            }), hs(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + hu + "$1")]
            }), hs(t, {
              props: [Ie(l, /:(plac\w+)/, Ft + "input-$1")]
            })], s);
        }
        return "";
      });
  }
}, Yx = [Gx], Jx = function(t) {
  var r = t.key;
  if (r === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(_) {
      var x = _.getAttribute("data-emotion");
      x.indexOf(" ") !== -1 && (document.head.appendChild(_), _.setAttribute("data-s", ""));
    });
  }
  var s = t.stylisPlugins || Yx, l = {}, u, d = [];
  u = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(_) {
      for (var x = _.getAttribute("data-emotion").split(" "), $ = 1; $ < x.length; $++)
        l[x[$]] = !0;
      d.push(_);
    }
  );
  var p, f = [Kx, Qx];
  {
    var g, m = [Bx, Ux(function(_) {
      g.insert(_);
    })], w = Wx(f.concat(s, m)), k = function(x) {
      return po(jx(x), w);
    };
    p = function(x, $, N, C) {
      g = N, k(x ? x + "{" + $.styles + "}" : $.styles), C && (S.inserted[$.name] = !0);
    };
  }
  var S = {
    key: r,
    sheet: new Cx({
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
}, nf = { exports: {} }, Ne = {};
var Sy;
function Xx() {
  if (Sy) return Ne;
  Sy = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, o = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, s = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, l = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, u = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, d = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, p = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, f = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, g = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, m = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, w = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, k = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, S = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, _ = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, x = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, $ = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, N = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function C(E) {
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
            case m:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case d:
                case g:
                case S:
                case k:
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
  function R(E) {
    return C(E) === f;
  }
  return Ne.AsyncMode = p, Ne.ConcurrentMode = f, Ne.ContextConsumer = d, Ne.ContextProvider = u, Ne.Element = t, Ne.ForwardRef = g, Ne.Fragment = o, Ne.Lazy = S, Ne.Memo = k, Ne.Portal = r, Ne.Profiler = l, Ne.StrictMode = s, Ne.Suspense = m, Ne.isAsyncMode = function(E) {
    return R(E) || C(E) === p;
  }, Ne.isConcurrentMode = R, Ne.isContextConsumer = function(E) {
    return C(E) === d;
  }, Ne.isContextProvider = function(E) {
    return C(E) === u;
  }, Ne.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, Ne.isForwardRef = function(E) {
    return C(E) === g;
  }, Ne.isFragment = function(E) {
    return C(E) === o;
  }, Ne.isLazy = function(E) {
    return C(E) === S;
  }, Ne.isMemo = function(E) {
    return C(E) === k;
  }, Ne.isPortal = function(E) {
    return C(E) === r;
  }, Ne.isProfiler = function(E) {
    return C(E) === l;
  }, Ne.isStrictMode = function(E) {
    return C(E) === s;
  }, Ne.isSuspense = function(E) {
    return C(E) === m;
  }, Ne.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === o || E === f || E === l || E === s || E === m || E === w || typeof E == "object" && E !== null && (E.$$typeof === S || E.$$typeof === k || E.$$typeof === u || E.$$typeof === d || E.$$typeof === g || E.$$typeof === x || E.$$typeof === $ || E.$$typeof === N || E.$$typeof === _);
  }, Ne.typeOf = C, Ne;
}
var by;
function Zx() {
  return by || (by = 1, nf.exports = Xx()), nf.exports;
}
var rf, _y;
function e1() {
  if (_y) return rf;
  _y = 1;
  var e = Zx(), t = {
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
  var d = Object.defineProperty, p = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols, g = Object.getOwnPropertyDescriptor, m = Object.getPrototypeOf, w = Object.prototype;
  function k(S, _, x) {
    if (typeof _ != "string") {
      if (w) {
        var $ = m(_);
        $ && $ !== w && k(S, $, x);
      }
      var N = p(_);
      f && (N = N.concat(f(_)));
      for (var C = u(S), R = u(_), E = 0; E < N.length; ++E) {
        var M = N[E];
        if (!r[M] && !(x && x[M]) && !(R && R[M]) && !(C && C[M])) {
          var A = g(_, M);
          try {
            d(S, M, A);
          } catch {
          }
        }
      }
    }
    return S;
  }
  return rf = k, rf;
}
e1();
var t1 = !0;
function lS(e, t, r) {
  var o = "";
  return r.split(" ").forEach(function(s) {
    e[s] !== void 0 ? t.push(e[s] + ";") : s && (o += s + " ");
  }), o;
}
var Ip = function(t, r, o) {
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
  t1 === !1) && t.registered[s] === void 0 && (t.registered[s] = r.styles);
}, Np = function(t, r, o) {
  Ip(t, r, o);
  var s = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var l = r;
    do
      t.insert(r === l ? "." + s : "", l, t.sheet, !0), l = l.next;
    while (l !== void 0);
  }
};
function n1(e) {
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
var r1 = {
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
}, i1 = /[A-Z]|^ms/g, o1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, uS = function(t) {
  return t.charCodeAt(1) === 45;
}, xy = function(t) {
  return t != null && typeof t != "boolean";
}, of = /* @__PURE__ */ sS(function(e) {
  return uS(e) ? e : e.replace(i1, "-$&").toLowerCase();
}), ky = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(o1, function(o, s, l) {
          return Hn = {
            name: s,
            styles: l,
            next: Hn
          }, s;
        });
  }
  return r1[t] !== 1 && !uS(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
function Bs(e, t, r) {
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
        return Hn = {
          name: s.name,
          styles: s.styles,
          next: Hn
        }, s.name;
      var l = r;
      if (l.styles !== void 0) {
        var u = l.next;
        if (u !== void 0)
          for (; u !== void 0; )
            Hn = {
              name: u.name,
              styles: u.styles,
              next: Hn
            }, u = u.next;
        var d = l.styles + ";";
        return d;
      }
      return s1(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var p = Hn, f = r(e);
        return Hn = p, Bs(e, t, f);
      }
      break;
    }
  }
  var g = r;
  if (t == null)
    return g;
  var m = t[g];
  return m !== void 0 ? m : g;
}
function s1(e, t, r) {
  var o = "";
  if (Array.isArray(r))
    for (var s = 0; s < r.length; s++)
      o += Bs(e, t, r[s]) + ";";
  else
    for (var l in r) {
      var u = r[l];
      if (typeof u != "object") {
        var d = u;
        t != null && t[d] !== void 0 ? o += l + "{" + t[d] + "}" : xy(d) && (o += of(l) + ":" + ky(l, d) + ";");
      } else if (Array.isArray(u) && typeof u[0] == "string" && (t == null || t[u[0]] === void 0))
        for (var p = 0; p < u.length; p++)
          xy(u[p]) && (o += of(l) + ":" + ky(l, u[p]) + ";");
      else {
        var f = Bs(e, t, u);
        switch (l) {
          case "animation":
          case "animationName": {
            o += of(l) + ":" + f + ";";
            break;
          }
          default:
            o += l + "{" + f + "}";
        }
      }
    }
  return o;
}
var Cy = /label:\s*([^\s;{]+)\s*(;|$)/g, Hn;
function ea(e, t, r) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, s = "";
  Hn = void 0;
  var l = e[0];
  if (l == null || l.raw === void 0)
    o = !1, s += Bs(r, t, l);
  else {
    var u = l;
    s += u[0];
  }
  for (var d = 1; d < e.length; d++)
    if (s += Bs(r, t, e[d]), o) {
      var p = l;
      s += p[d];
    }
  Cy.lastIndex = 0;
  for (var f = "", g; (g = Cy.exec(s)) !== null; )
    f += "-" + g[1];
  var m = n1(s) + f;
  return {
    name: m,
    styles: s,
    next: Hn
  };
}
var a1 = function(t) {
  return t();
}, cS = Wf.useInsertionEffect ? Wf.useInsertionEffect : !1, dS = cS || a1, Ey = cS || b.useLayoutEffect, fS = /* @__PURE__ */ b.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Jx({
    key: "css"
  }) : null
);
fS.Provider;
var Op = function(t) {
  return /* @__PURE__ */ b.forwardRef(function(r, o) {
    var s = b.useContext(fS);
    return t(r, s, o);
  });
}, ta = /* @__PURE__ */ b.createContext({}), Lp = {}.hasOwnProperty, Hf = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", l1 = function(t, r) {
  var o = {};
  for (var s in r)
    Lp.call(r, s) && (o[s] = r[s]);
  return o[Hf] = t, o;
}, u1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Ip(r, o, s), dS(function() {
    return Np(r, o, s);
  }), null;
}, c1 = /* @__PURE__ */ Op(function(e, t, r) {
  var o = e.css;
  typeof o == "string" && t.registered[o] !== void 0 && (o = t.registered[o]);
  var s = e[Hf], l = [o], u = "";
  typeof e.className == "string" ? u = lS(t.registered, l, e.className) : e.className != null && (u = e.className + " ");
  var d = ea(l, void 0, b.useContext(ta));
  u += t.key + "-" + d.name;
  var p = {};
  for (var f in e)
    Lp.call(e, f) && f !== "css" && f !== Hf && (p[f] = e[f]);
  return p.className = u, r && (p.ref = r), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(u1, {
    cache: t,
    serialized: d,
    isStringTag: typeof s == "string"
  }), /* @__PURE__ */ b.createElement(s, p));
}), d1 = c1, Py = function(t, r) {
  var o = arguments;
  if (r == null || !Lp.call(r, "css"))
    return b.createElement.apply(void 0, o);
  var s = o.length, l = new Array(s);
  l[0] = d1, l[1] = l1(t, r);
  for (var u = 2; u < s; u++)
    l[u] = o[u];
  return b.createElement.apply(null, l);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(Py || (Py = {}));
var f1 = /* @__PURE__ */ Op(function(e, t) {
  var r = e.styles, o = ea([r], void 0, b.useContext(ta)), s = b.useRef();
  return Ey(function() {
    var l = t.key + "-global", u = new t.sheet.constructor({
      key: l,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), d = !1, p = document.querySelector('style[data-emotion="' + l + " " + o.name + '"]');
    return t.sheet.tags.length && (u.before = t.sheet.tags[0]), p !== null && (d = !0, p.setAttribute("data-emotion", l), u.hydrate([p])), s.current = [u, d], function() {
      u.flush();
    };
  }, [t]), Ey(function() {
    var l = s.current, u = l[0], d = l[1];
    if (d) {
      l[1] = !1;
      return;
    }
    if (o.next !== void 0 && Np(t, o.next, !0), u.tags.length) {
      var p = u.tags[u.tags.length - 1].nextElementSibling;
      u.before = p, u.flush();
    }
    t.insert("", o, u, !1);
  }, [t, o.name]), null;
});
function na() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return ea(t);
}
function Ii() {
  var e = na.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var p1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, h1 = /* @__PURE__ */ sS(
  function(e) {
    return p1.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), g1 = h1, m1 = function(t) {
  return t !== "theme";
}, Ry = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? g1 : m1;
}, Ty = function(t, r, o) {
  var s;
  if (r) {
    var l = r.shouldForwardProp;
    s = t.__emotion_forwardProp && l ? function(u) {
      return t.__emotion_forwardProp(u) && l(u);
    } : l;
  }
  return typeof s != "function" && o && (s = t.__emotion_forwardProp), s;
}, y1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Ip(r, o, s), dS(function() {
    return Np(r, o, s);
  }), null;
}, v1 = function e(t, r) {
  var o = t.__emotion_real === t, s = o && t.__emotion_base || t, l, u;
  r !== void 0 && (l = r.label, u = r.target);
  var d = Ty(t, r, o), p = d || Ry(s), f = !p("as");
  return function() {
    var g = arguments, m = o && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (l !== void 0 && m.push("label:" + l + ";"), g[0] == null || g[0].raw === void 0)
      m.push.apply(m, g);
    else {
      var w = g[0];
      m.push(w[0]);
      for (var k = g.length, S = 1; S < k; S++)
        m.push(g[S], w[S]);
    }
    var _ = Op(function(x, $, N) {
      var C = f && x.as || s, R = "", E = [], M = x;
      if (x.theme == null) {
        M = {};
        for (var A in x)
          M[A] = x[A];
        M.theme = b.useContext(ta);
      }
      typeof x.className == "string" ? R = lS($.registered, E, x.className) : x.className != null && (R = x.className + " ");
      var I = ea(m.concat(E), $.registered, M);
      R += $.key + "-" + I.name, u !== void 0 && (R += " " + u);
      var L = f && d === void 0 ? Ry(C) : p, v = {};
      for (var P in x)
        f && P === "as" || L(P) && (v[P] = x[P]);
      return v.className = R, N && (v.ref = N), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(y1, {
        cache: $,
        serialized: I,
        isStringTag: typeof C == "string"
      }), /* @__PURE__ */ b.createElement(C, v));
    });
    return _.displayName = l !== void 0 ? l : "Styled(" + (typeof s == "string" ? s : s.displayName || s.name || "Component") + ")", _.defaultProps = t.defaultProps, _.__emotion_real = _, _.__emotion_base = s, _.__emotion_styles = m, _.__emotion_forwardProp = d, Object.defineProperty(_, "toString", {
      value: function() {
        return "." + u;
      }
    }), _.withComponent = function(x, $) {
      var N = e(x, pu({}, r, $, {
        shouldForwardProp: Ty(_, $, !0)
      }));
      return N.apply(void 0, m);
    }, _;
  };
}, w1 = [
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
], qf = v1.bind(null);
w1.forEach(function(e) {
  qf[e] = qf(e);
});
var sf = { exports: {} }, af, $y;
function S1() {
  if ($y) return af;
  $y = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return af = e, af;
}
var lf, My;
function b1() {
  if (My) return lf;
  My = 1;
  var e = /* @__PURE__ */ S1();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, lf = function() {
    function o(u, d, p, f, g, m) {
      if (m !== e) {
        var w = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw w.name = "Invariant Violation", w;
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
  }, lf;
}
var Ay;
function _1() {
  return Ay || (Ay = 1, sf.exports = /* @__PURE__ */ b1()()), sf.exports;
}
var x1 = /* @__PURE__ */ _1();
const Oe = /* @__PURE__ */ Zr(x1);
function k1(e) {
  return e == null || Object.keys(e).length === 0;
}
function pS(e) {
  const {
    styles: t,
    defaultTheme: r = {}
  } = e, o = typeof t == "function" ? (s) => t(k1(s) ? r : s) : t;
  return /* @__PURE__ */ j.jsx(f1, {
    styles: o
  });
}
function hS(e, t) {
  return qf(e, t);
}
function C1(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Iy = [];
function qr(e) {
  return Iy[0] = e, ea(Iy);
}
var uf = { exports: {} }, Fe = {};
var Ny;
function E1() {
  if (Ny) return Fe;
  Ny = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), l = /* @__PURE__ */ Symbol.for("react.consumer"), u = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), f = /* @__PURE__ */ Symbol.for("react.suspense_list"), g = /* @__PURE__ */ Symbol.for("react.memo"), m = /* @__PURE__ */ Symbol.for("react.lazy"), w = /* @__PURE__ */ Symbol.for("react.view_transition"), k = /* @__PURE__ */ Symbol.for("react.client.reference");
  function S(_) {
    if (typeof _ == "object" && _ !== null) {
      var x = _.$$typeof;
      switch (x) {
        case e:
          switch (_ = _.type, _) {
            case r:
            case s:
            case o:
            case p:
            case f:
            case w:
              return _;
            default:
              switch (_ = _ && _.$$typeof, _) {
                case u:
                case d:
                case m:
                case g:
                  return _;
                case l:
                  return _;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return Fe.ContextConsumer = l, Fe.ContextProvider = u, Fe.Element = e, Fe.ForwardRef = d, Fe.Fragment = r, Fe.Lazy = m, Fe.Memo = g, Fe.Portal = t, Fe.Profiler = s, Fe.StrictMode = o, Fe.Suspense = p, Fe.SuspenseList = f, Fe.isContextConsumer = function(_) {
    return S(_) === l;
  }, Fe.isContextProvider = function(_) {
    return S(_) === u;
  }, Fe.isElement = function(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === e;
  }, Fe.isForwardRef = function(_) {
    return S(_) === d;
  }, Fe.isFragment = function(_) {
    return S(_) === r;
  }, Fe.isLazy = function(_) {
    return S(_) === m;
  }, Fe.isMemo = function(_) {
    return S(_) === g;
  }, Fe.isPortal = function(_) {
    return S(_) === t;
  }, Fe.isProfiler = function(_) {
    return S(_) === s;
  }, Fe.isStrictMode = function(_) {
    return S(_) === o;
  }, Fe.isSuspense = function(_) {
    return S(_) === p;
  }, Fe.isSuspenseList = function(_) {
    return S(_) === f;
  }, Fe.isValidElementType = function(_) {
    return typeof _ == "string" || typeof _ == "function" || _ === r || _ === s || _ === o || _ === p || _ === f || typeof _ == "object" && _ !== null && (_.$$typeof === m || _.$$typeof === g || _.$$typeof === u || _.$$typeof === l || _.$$typeof === d || _.$$typeof === k || _.getModuleId !== void 0);
  }, Fe.typeOf = S, Fe;
}
var Oy;
function P1() {
  return Oy || (Oy = 1, uf.exports = /* @__PURE__ */ E1()), uf.exports;
}
var gS = /* @__PURE__ */ P1();
function qn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function mS(e) {
  if (/* @__PURE__ */ b.isValidElement(e) || gS.isValidElementType(e) || !qn(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = mS(e[r]);
  }), t;
}
function an(e, t, r = {
  clone: !0
}) {
  const o = r.clone ? {
    ...e
  } : e;
  return qn(e) && qn(t) && Object.keys(t).forEach((s) => {
    /* @__PURE__ */ b.isValidElement(t[s]) || gS.isValidElementType(t[s]) ? o[s] = t[s] : qn(t[s]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, s) && qn(e[s]) ? o[s] = an(e[s], t[s], r) : r.clone ? o[s] = qn(t[s]) ? mS(t[s]) : t[s] : o[s] = t[s];
  }), o;
}
const R1 = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, o) => r.val - o.val), t.reduce((r, o) => ({
    ...r,
    [o.key]: o.val
  }), {});
};
function T1(e) {
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
  } = e, l = R1(t), u = Object.keys(l);
  function d(w) {
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${r})`;
  }
  function p(w) {
    return `@media (max-width:${(typeof t[w] == "number" ? t[w] : w) - o / 100}${r})`;
  }
  function f(w, k) {
    const S = u.indexOf(k);
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${r}) and (max-width:${(S !== -1 && typeof t[u[S]] == "number" ? t[u[S]] : k) - o / 100}${r})`;
  }
  function g(w) {
    return u.indexOf(w) + 1 < u.length ? f(w, u[u.indexOf(w) + 1]) : d(w);
  }
  function m(w) {
    const k = u.indexOf(w);
    return k === 0 ? d(u[1]) : k === u.length - 1 ? p(u[k]) : f(w, u[u.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: u,
    values: l,
    up: d,
    down: p,
    between: f,
    only: g,
    not: m,
    unit: r,
    ...s
  };
}
function Ly(e, t) {
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
function $1(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((r) => t.startsWith(`@${r}`)) || !!t.match(/^@\d/));
}
function M1(e, t) {
  const r = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!r)
    return null;
  const [, o, s] = r, l = Number.isNaN(+o) ? o || 0 : +o;
  return e.containerQueries(s).up(l);
}
function A1(e) {
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
const I1 = {
  borderRadius: 4
};
function $s(e, t) {
  return t ? an(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Uu = {
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
}, Dy = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Uu[e]}px)`
}, N1 = {
  containerQueries: (e) => ({
    up: (t) => {
      let r = typeof t == "number" ? t : Uu[t] || t;
      return typeof r == "number" && (r = `${r}px`), e ? `@container ${e} (min-width:${r})` : `@container (min-width:${r})`;
    }
  })
};
function vr(e, t, r) {
  const o = e.theme || {};
  if (Array.isArray(t)) {
    const l = o.breakpoints || Dy;
    return t.reduce((u, d, p) => (u[l.up(l.keys[p])] = r(t[p]), u), {});
  }
  if (typeof t == "object") {
    const l = o.breakpoints || Dy;
    return Object.keys(t).reduce((u, d) => {
      if ($1(l.keys, d)) {
        const p = M1(o.containerQueries ? o : N1, d);
        p && (u[p] = r(t[d], d));
      } else if (Object.keys(l.values || Uu).includes(d)) {
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
function O1(e = {}) {
  return e.keys?.reduce((r, o) => {
    const s = e.up(o);
    return r[s] = {}, r;
  }, {}) || {};
}
function Fy(e, t) {
  return e.reduce((r, o) => {
    const s = r[o];
    return (!s || Object.keys(s).length === 0) && delete r[o], r;
  }, t);
}
function Pe(e) {
  if (typeof e != "string")
    throw new Error(Ei(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Vu(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const o = `vars.${t}`.split(".").reduce((s, l) => s && s[l] ? s[l] : null, e);
    if (o != null)
      return o;
  }
  return t.split(".").reduce((o, s) => o && o[s] != null ? o[s] : null, e);
}
function gu(e, t, r, o = r) {
  let s;
  return typeof e == "function" ? s = e(r) : Array.isArray(e) ? s = e[r] || o : s = Vu(e, r) || o, t && (s = t(s, o, e)), s;
}
function st(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: o,
    transform: s
  } = e, l = (u) => {
    if (u[t] == null)
      return null;
    const d = u[t], p = u.theme, f = Vu(p, o) || {};
    return vr(u, d, (m) => {
      let w = gu(f, s, m);
      return m === w && typeof m == "string" && (w = gu(f, s, `${t}${m === "default" ? "" : Pe(m)}`, m)), r === !1 ? w : {
        [r]: w
      };
    });
  };
  return l.propTypes = {}, l.filterProps = [t], l;
}
function L1(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const D1 = {
  m: "margin",
  p: "padding"
}, F1 = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, jy = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, j1 = L1((e) => {
  if (e.length > 2)
    if (jy[e])
      e = jy[e];
    else
      return [e];
  const [t, r] = e.split(""), o = D1[t], s = F1[r] || "";
  return Array.isArray(s) ? s.map((l) => o + l) : [o + s];
}), Dp = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Fp = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...Dp, ...Fp];
function ra(e, t, r, o) {
  const s = Vu(e, t, !0) ?? r;
  return typeof s == "number" || typeof s == "string" ? (l) => typeof l == "string" ? l : typeof s == "string" ? `calc(${l} * ${s})` : s * l : Array.isArray(s) ? (l) => {
    if (typeof l == "string")
      return l;
    const u = Math.abs(l), d = s[u];
    return l >= 0 ? d : typeof d == "number" ? -d : `-${d}`;
  } : typeof s == "function" ? s : () => {
  };
}
function jp(e) {
  return ra(e, "spacing", 8);
}
function ia(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function z1(e, t) {
  return (r) => e.reduce((o, s) => (o[s] = ia(t, r), o), {});
}
function B1(e, t, r, o) {
  if (!t.includes(r))
    return null;
  const s = j1(r), l = z1(s, o), u = e[r];
  return vr(e, u, l);
}
function yS(e, t) {
  const r = jp(e.theme);
  return Object.keys(e).map((o) => B1(e, t, o, r)).reduce($s, {});
}
function tt(e) {
  return yS(e, Dp);
}
tt.propTypes = {};
tt.filterProps = Dp;
function nt(e) {
  return yS(e, Fp);
}
nt.propTypes = {};
nt.filterProps = Fp;
function vS(e = 8, t = jp({
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
function Hu(...e) {
  const t = e.reduce((o, s) => (s.filterProps.forEach((l) => {
    o[l] = s;
  }), o), {}), r = (o) => Object.keys(o).reduce((s, l) => t[l] ? $s(s, t[l](o)) : s, {});
  return r.propTypes = {}, r.filterProps = e.reduce((o, s) => o.concat(s.filterProps), []), r;
}
function vn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function _n(e, t) {
  return st({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const W1 = _n("border", vn), U1 = _n("borderTop", vn), V1 = _n("borderRight", vn), H1 = _n("borderBottom", vn), q1 = _n("borderLeft", vn), K1 = _n("borderColor"), Q1 = _n("borderTopColor"), G1 = _n("borderRightColor"), Y1 = _n("borderBottomColor"), J1 = _n("borderLeftColor"), X1 = _n("outline", vn), Z1 = _n("outlineColor"), qu = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = ra(e.theme, "shape.borderRadius", 4), r = (o) => ({
      borderRadius: ia(t, o)
    });
    return vr(e, e.borderRadius, r);
  }
  return null;
};
qu.propTypes = {};
qu.filterProps = ["borderRadius"];
Hu(W1, U1, V1, H1, q1, K1, Q1, G1, Y1, J1, qu, X1, Z1);
const Ku = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = ra(e.theme, "spacing", 8), r = (o) => ({
      gap: ia(t, o)
    });
    return vr(e, e.gap, r);
  }
  return null;
};
Ku.propTypes = {};
Ku.filterProps = ["gap"];
const Qu = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = ra(e.theme, "spacing", 8), r = (o) => ({
      columnGap: ia(t, o)
    });
    return vr(e, e.columnGap, r);
  }
  return null;
};
Qu.propTypes = {};
Qu.filterProps = ["columnGap"];
const Gu = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = ra(e.theme, "spacing", 8), r = (o) => ({
      rowGap: ia(t, o)
    });
    return vr(e, e.rowGap, r);
  }
  return null;
};
Gu.propTypes = {};
Gu.filterProps = ["rowGap"];
const ek = st({
  prop: "gridColumn"
}), tk = st({
  prop: "gridRow"
}), nk = st({
  prop: "gridAutoFlow"
}), rk = st({
  prop: "gridAutoColumns"
}), ik = st({
  prop: "gridAutoRows"
}), ok = st({
  prop: "gridTemplateColumns"
}), sk = st({
  prop: "gridTemplateRows"
}), ak = st({
  prop: "gridTemplateAreas"
}), lk = st({
  prop: "gridArea"
});
Hu(Ku, Qu, Gu, ek, tk, nk, rk, ik, ok, sk, ak, lk);
function ho(e, t) {
  return t === "grey" ? t : e;
}
const uk = st({
  prop: "color",
  themeKey: "palette",
  transform: ho
}), ck = st({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: ho
}), dk = st({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: ho
});
Hu(uk, ck, dk);
function rn(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const fk = st({
  prop: "width",
  transform: rn
}), zp = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      const o = e.theme?.breakpoints?.values?.[r] || Uu[r];
      return o ? e.theme?.breakpoints?.unit !== "px" ? {
        maxWidth: `${o}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: o
      } : {
        maxWidth: rn(r)
      };
    };
    return vr(e, e.maxWidth, t);
  }
  return null;
};
zp.filterProps = ["maxWidth"];
const pk = st({
  prop: "minWidth",
  transform: rn
}), hk = st({
  prop: "height",
  transform: rn
}), gk = st({
  prop: "maxHeight",
  transform: rn
}), mk = st({
  prop: "minHeight",
  transform: rn
});
st({
  prop: "size",
  cssProperty: "width",
  transform: rn
});
st({
  prop: "size",
  cssProperty: "height",
  transform: rn
});
const yk = st({
  prop: "boxSizing"
});
Hu(fk, zp, pk, hk, gk, mk, yk);
const oa = {
  // borders
  border: {
    themeKey: "borders",
    transform: vn
  },
  borderTop: {
    themeKey: "borders",
    transform: vn
  },
  borderRight: {
    themeKey: "borders",
    transform: vn
  },
  borderBottom: {
    themeKey: "borders",
    transform: vn
  },
  borderLeft: {
    themeKey: "borders",
    transform: vn
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
    transform: vn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: qu
  },
  // palette
  color: {
    themeKey: "palette",
    transform: ho
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: ho
  },
  backgroundColor: {
    themeKey: "palette",
    transform: ho
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
    style: Ku
  },
  rowGap: {
    style: Gu
  },
  columnGap: {
    style: Qu
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
    transform: rn
  },
  maxWidth: {
    style: zp
  },
  minWidth: {
    transform: rn
  },
  height: {
    transform: rn
  },
  maxHeight: {
    transform: rn
  },
  minHeight: {
    transform: rn
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
function vk(...e) {
  const t = e.reduce((o, s) => o.concat(Object.keys(s)), []), r = new Set(t);
  return e.every((o) => r.size === Object.keys(o).length);
}
function wk(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Sk() {
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
      style: m
    } = d;
    if (o == null)
      return null;
    if (f === "typography" && o === "inherit")
      return {
        [r]: o
      };
    const w = Vu(s, f) || {};
    return m ? m(u) : vr(u, o, (S) => {
      let _ = gu(w, g, S);
      return S === _ && typeof S == "string" && (_ = gu(w, g, `${r}${S === "default" ? "" : Pe(S)}`, S)), p === !1 ? _ : {
        [p]: _
      };
    });
  }
  function t(r) {
    const {
      sx: o,
      theme: s = {},
      nested: l
    } = r || {};
    if (!o)
      return null;
    const u = s.unstable_sxConfig ?? oa;
    function d(p) {
      let f = p;
      if (typeof p == "function")
        f = p(s);
      else if (typeof p != "object")
        return p;
      if (!f)
        return null;
      const g = O1(s.breakpoints), m = Object.keys(g);
      let w = g;
      return Object.keys(f).forEach((k) => {
        const S = wk(f[k], s);
        if (S != null)
          if (typeof S == "object")
            if (u[k])
              w = $s(w, e(k, S, s, u));
            else {
              const _ = vr({
                theme: s
              }, S, (x) => ({
                [k]: x
              }));
              vk(_, S) ? w[k] = t({
                sx: S,
                theme: s,
                nested: !0
              }) : w = $s(w, _);
            }
          else
            w = $s(w, e(k, S, s, u));
      }), !l && s.modularCssLayers ? {
        "@layer sx": Ly(s, Fy(m, w))
      } : Ly(s, Fy(m, w));
    }
    return Array.isArray(o) ? o.map(d) : d(o);
  }
  return t;
}
const Qr = Sk();
Qr.filterProps = ["sx"];
function bk(e, t) {
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
function Bp(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: o = {},
    spacing: s,
    shape: l = {},
    ...u
  } = e, d = T1(r), p = vS(s);
  let f = an({
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
      ...I1,
      ...l
    }
  }, u);
  return f = A1(f), f.applyStyles = bk, f = t.reduce((g, m) => an(g, m), f), f.unstable_sxConfig = {
    ...oa,
    ...u?.unstable_sxConfig
  }, f.unstable_sx = function(m) {
    return Qr({
      sx: m,
      theme: this
    });
  }, f;
}
function _k(e) {
  return Object.keys(e).length === 0;
}
function Wp(e = null) {
  const t = b.useContext(ta);
  return !t || _k(t) ? e : t;
}
const xk = Bp();
function Up(e = xk) {
  return Wp(e);
}
function cf(e) {
  const t = qr(e);
  return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function wS({
  styles: e,
  themeId: t,
  defaultTheme: r = {}
}) {
  const o = Up(r), s = t && o[t] || o;
  let l = typeof e == "function" ? e(s) : e;
  return s.modularCssLayers && (Array.isArray(l) ? l = l.map((u) => cf(typeof u == "function" ? u(s) : u)) : l = cf(l)), /* @__PURE__ */ j.jsx(pS, {
    styles: l
  });
}
const kk = (e) => {
  const t = {
    systemProps: {},
    otherProps: {}
  }, r = e?.theme?.unstable_sxConfig ?? oa;
  return Object.keys(e).forEach((o) => {
    r[o] ? t.systemProps[o] = e[o] : t.otherProps[o] = e[o];
  }), t;
};
function SS(e) {
  const {
    sx: t,
    ...r
  } = e, {
    systemProps: o,
    otherProps: s
  } = kk(r);
  let l;
  return Array.isArray(t) ? l = [o, ...t] : typeof t == "function" ? l = (...u) => {
    const d = t(...u);
    return qn(d) ? {
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
const zy = (e) => e, Ck = () => {
  let e = zy;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = zy;
    }
  };
}, bS = Ck();
function _S(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (r = _S(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function Re() {
  for (var e, t, r = 0, o = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (t = _S(e)) && (o && (o += " "), o += t);
  return o;
}
function Ek(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: o = "MuiBox-root",
    generateClassName: s
  } = e, l = hS("div", {
    shouldForwardProp: (d) => d !== "theme" && d !== "sx" && d !== "as"
  })(Qr);
  return /* @__PURE__ */ b.forwardRef(function(p, f) {
    const g = Up(r), {
      className: m,
      component: w = "div",
      ...k
    } = SS(p);
    return /* @__PURE__ */ j.jsx(l, {
      as: w,
      ref: f,
      className: Re(m, s ? s(o) : o),
      theme: t && g[t] || g,
      ...k
    });
  });
}
const Pk = {
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
function gt(e, t, r = "Mui") {
  const o = Pk[t];
  return o ? `${r}-${o}` : `${bS.generate(e)}-${t}`;
}
function Xe(e, t, r = "Mui") {
  const o = {};
  return t.forEach((s) => {
    o[s] = gt(e, s, r);
  }), o;
}
function xS(e) {
  const {
    variants: t,
    ...r
  } = e, o = {
    variants: t,
    style: qr(r),
    isProcessed: !0
  };
  return o.style === r || t && t.forEach((s) => {
    typeof s.style != "function" && (s.style = qr(s.style));
  }), o;
}
const Rk = Bp();
function df(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function _i(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Tk(e) {
  return e ? (t, r) => r[e] : null;
}
function $k(e, t, r) {
  e.theme = Ik(e.theme) ? r : e.theme[t] || e.theme;
}
function iu(e, t, r) {
  const o = typeof t == "function" ? t(e) : t;
  if (Array.isArray(o))
    return o.flatMap((s) => iu(e, s, r));
  if (Array.isArray(o?.variants)) {
    let s;
    if (o.isProcessed)
      s = r ? _i(o.style, r) : o.style;
    else {
      const {
        variants: l,
        ...u
      } = o;
      s = r ? _i(qr(u), r) : u;
    }
    return kS(e, o.variants, [s], r);
  }
  return o?.isProcessed ? r ? _i(qr(o.style), r) : o.style : r ? _i(qr(o), r) : o;
}
function kS(e, t, r = [], o = void 0) {
  let s;
  e: for (let l = 0; l < t.length; l += 1) {
    const u = t[l];
    if (typeof u.props == "function") {
      if (s ??= {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }, !u.props(s))
        continue;
    } else
      for (const d in u.props)
        if (e[d] !== u.props[d] && e.ownerState?.[d] !== u.props[d])
          continue e;
    typeof u.style == "function" ? (s ??= {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }, r.push(o ? _i(qr(u.style(s)), o) : u.style(s))) : r.push(o ? _i(qr(u.style), o) : u.style);
  }
  return r;
}
function Mk(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Rk,
    rootShouldForwardProp: o = df,
    slotShouldForwardProp: s = df
  } = e;
  function l(d) {
    $k(d, t, r);
  }
  return (d, p = {}) => {
    C1(d, (M) => M.filter((A) => A !== Qr));
    const {
      name: f,
      slot: g,
      skipVariantsResolver: m,
      skipSx: w,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: k = Tk(Ok(g)),
      ...S
    } = p, _ = f && f.startsWith("Mui") || g ? "components" : "custom", x = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      g && g !== "Root" && g !== "root" || !1
    ), $ = w || !1;
    let N = df;
    g === "Root" || g === "root" ? N = o : g ? N = s : Nk(d) && (N = void 0);
    const C = hS(d, {
      shouldForwardProp: N,
      label: Ak(),
      ...S
    }), R = (M) => {
      if (M.__emotion_real === M)
        return M;
      if (typeof M == "function")
        return function(I) {
          return iu(I, M, I.theme.modularCssLayers ? _ : void 0);
        };
      if (qn(M)) {
        const A = xS(M);
        return function(L) {
          return A.variants ? iu(L, A, L.theme.modularCssLayers ? _ : void 0) : L.theme.modularCssLayers ? _i(A.style, _) : A.style;
        };
      }
      return M;
    }, E = (...M) => {
      const A = [], I = M.map(R), L = [];
      if (A.push(l), f && k && L.push(function(F) {
        const z = F.theme.components?.[f]?.styleOverrides;
        if (!z)
          return null;
        const V = {};
        for (const G in z)
          V[G] = iu(F, z[G], F.theme.modularCssLayers ? "theme" : void 0);
        return k(F, V);
      }), f && !x && L.push(function(F) {
        const z = F.theme?.components?.[f]?.variants;
        return z ? kS(F, z, [], F.theme.modularCssLayers ? "theme" : void 0) : null;
      }), $ || L.push(Qr), Array.isArray(I[0])) {
        const O = I.shift(), F = new Array(A.length).fill(""), B = new Array(L.length).fill("");
        let z;
        z = [...F, ...O, ...B], z.raw = [...F, ...O.raw, ...B], A.unshift(z);
      }
      const v = [...A, ...I, ...L], P = C(...v);
      return d.muiName && (P.muiName = d.muiName), P;
    };
    return C.withConfig && (E.withConfig = C.withConfig), E;
  };
}
function Ak(e, t) {
  return void 0;
}
function Ik(e) {
  for (const t in e)
    return !1;
  return !0;
}
function Nk(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Ok(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function mu(e, t) {
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
              r[s][p] = mu(l[p], u[p]);
            }
        }
      } else r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
const Pi = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function Lk(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function Vp(e, t = 0, r = 1) {
  return Lk(e, t, r);
}
function Dk(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((o) => o + o)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((o, s) => s < 3 ? parseInt(o, 16) : Math.round(parseInt(o, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Gr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Gr(Dk(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(r))
    throw new Error(Ei(9, e));
  let o = e.substring(t + 1, e.length - 1), s;
  if (r === "color") {
    if (o = o.split(" "), s = o.shift(), o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(s))
      throw new Error(Ei(10, s));
  } else
    o = o.split(",");
  return o = o.map((l) => parseFloat(l)), {
    type: r,
    values: o,
    colorSpace: s
  };
}
const Fk = (e) => {
  const t = Gr(e);
  return t.values.slice(0, 3).map((r, o) => t.type.includes("hsl") && o !== 0 ? `${r}%` : r).join(" ");
}, xs = (e, t) => {
  try {
    return Fk(e);
  } catch {
    return e;
  }
};
function Yu(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: o
  } = e;
  return t.includes("rgb") ? o = o.map((s, l) => l < 3 ? parseInt(s, 10) : s) : t.includes("hsl") && (o[1] = `${o[1]}%`, o[2] = `${o[2]}%`), t.includes("color") ? o = `${r} ${o.join(" ")}` : o = `${o.join(", ")}`, `${t}(${o})`;
}
function CS(e) {
  e = Gr(e);
  const {
    values: t
  } = e, r = t[0], o = t[1] / 100, s = t[2] / 100, l = o * Math.min(s, 1 - s), u = (f, g = (f + r / 30) % 12) => s - l * Math.max(Math.min(g - 3, 9 - g, 1), -1);
  let d = "rgb";
  const p = [Math.round(u(0) * 255), Math.round(u(8) * 255), Math.round(u(4) * 255)];
  return e.type === "hsla" && (d += "a", p.push(t[3])), Yu({
    type: d,
    values: p
  });
}
function Kf(e) {
  e = Gr(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Gr(CS(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function jk(e, t) {
  const r = Kf(e), o = Kf(t);
  return (Math.max(r, o) + 0.05) / (Math.min(r, o) + 0.05);
}
function Rt(e, t) {
  return e = Gr(e), t = Vp(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Yu(e);
}
function Tl(e, t, r) {
  try {
    return Rt(e, t);
  } catch {
    return e;
  }
}
function Hp(e, t) {
  if (e = Gr(e), t = Vp(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Yu(e);
}
function ze(e, t, r) {
  try {
    return Hp(e, t);
  } catch {
    return e;
  }
}
function qp(e, t) {
  if (e = Gr(e), t = Vp(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Yu(e);
}
function Be(e, t, r) {
  try {
    return qp(e, t);
  } catch {
    return e;
  }
}
function zk(e, t = 0.15) {
  return Kf(e) > 0.5 ? Hp(e, t) : qp(e, t);
}
function $l(e, t, r) {
  try {
    return zk(e, t);
  } catch {
    return e;
  }
}
function By(...e) {
  return e.reduce((t, r) => r == null ? t : function(...s) {
    t.apply(this, s), r.apply(this, s);
  }, () => {
  });
}
function Bk(e, t = 166) {
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
function Jn(e) {
  return e && e.ownerDocument || document;
}
function Ri(e) {
  return Jn(e).defaultView || window;
}
function Wy(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
let Uy = 0;
function Wk(e) {
  const [t, r] = b.useState(e), o = e || t;
  return b.useEffect(() => {
    t == null && (Uy += 1, r(`mui-${Uy}`));
  }, [t]), o;
}
const Uk = {
  ...Wf
}, Vy = Uk.useId;
function Kp(e) {
  if (Vy !== void 0) {
    const t = Vy();
    return e ?? t;
  }
  return Wk(e);
}
function Vk({
  controlled: e,
  default: t,
  name: r,
  state: o = "value"
}) {
  const {
    current: s
  } = b.useRef(e !== void 0), [l, u] = b.useState(t), d = s ? e : l, p = b.useCallback((f) => {
    s || u(f);
  }, []);
  return [d, p];
}
function go(e) {
  const t = b.useRef(e);
  return Pi(() => {
    t.current = e;
  }), b.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function Ln(...e) {
  const t = b.useRef(void 0), r = b.useCallback((o) => {
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
  return b.useMemo(() => e.every((o) => o == null) ? null : (o) => {
    t.current && (t.current(), t.current = void 0), o != null && (t.current = r(o));
  }, e);
}
const Hy = {};
function ES(e, t) {
  const r = b.useRef(Hy);
  return r.current === Hy && (r.current = e(t)), r;
}
const Hk = [];
function qk(e) {
  b.useEffect(e, Hk);
}
class Qp {
  static create() {
    return new Qp();
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
function PS() {
  const e = ES(Qp.create).current;
  return qk(e.disposeEffect), e;
}
function qy(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return !1;
}
function RS(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function bt(e, t, r = void 0) {
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
function Kk(e) {
  return typeof e == "string";
}
function TS(e, t, r) {
  return e === void 0 || Kk(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...r
    }
  };
}
function $S(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((o) => o.match(/^on[A-Z]/) && typeof e[o] == "function" && !t.includes(o)).forEach((o) => {
    r[o] = e[o];
  }), r;
}
function Ky(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function MS(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: o,
    externalForwardedProps: s,
    className: l
  } = e;
  if (!t) {
    const k = Re(r?.className, l, s?.className, o?.className), S = {
      ...r?.style,
      ...s?.style,
      ...o?.style
    }, _ = {
      ...r,
      ...s,
      ...o
    };
    return k.length > 0 && (_.className = k), Object.keys(S).length > 0 && (_.style = S), {
      props: _,
      internalRef: void 0
    };
  }
  const u = $S({
    ...s,
    ...o
  }), d = Ky(o), p = Ky(s), f = t(u), g = Re(f?.className, r?.className, l, s?.className, o?.className), m = {
    ...f?.style,
    ...r?.style,
    ...s?.style,
    ...o?.style
  }, w = {
    ...f,
    ...r,
    ...p,
    ...d
  };
  return g.length > 0 && (w.className = g), Object.keys(m).length > 0 && (w.style = m), {
    props: w,
    internalRef: f.ref
  };
}
function AS(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function Qk(e) {
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: s = !1,
    ...l
  } = e, u = s ? {} : AS(r, o), {
    props: d,
    internalRef: p
  } = MS({
    ...l,
    externalSlotProps: u
  }), f = Ln(p, u?.ref, e.additionalProps?.ref);
  return TS(t, {
    ...d,
    ref: f
  }, o);
}
function Ju(e) {
  return parseInt(b.version, 10) >= 19 ? e?.props?.ref || null : e?.ref || null;
}
const IS = /* @__PURE__ */ b.createContext(null);
function Gp() {
  return b.useContext(IS);
}
const Gk = typeof Symbol == "function" && Symbol.for, Yk = Gk ? /* @__PURE__ */ Symbol.for("mui.nested") : "__THEME_NESTED__";
function Jk(e, t) {
  return typeof t == "function" ? t(e) : {
    ...e,
    ...t
  };
}
function Xk(e) {
  const {
    children: t,
    theme: r
  } = e, o = Gp(), s = b.useMemo(() => {
    const l = o === null ? {
      ...r
    } : Jk(o, r);
    return l != null && (l[Yk] = o !== null), l;
  }, [r, o]);
  return /* @__PURE__ */ j.jsx(IS.Provider, {
    value: s,
    children: t
  });
}
const NS = /* @__PURE__ */ b.createContext();
function Zk({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ j.jsx(NS.Provider, {
    value: e ?? !0,
    ...t
  });
}
const eC = () => b.useContext(NS) ?? !1, OS = /* @__PURE__ */ b.createContext(void 0);
function tC({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ j.jsx(OS.Provider, {
    value: e,
    children: t
  });
}
function nC(e) {
  const {
    theme: t,
    name: r,
    props: o
  } = e;
  if (!t || !t.components || !t.components[r])
    return o;
  const s = t.components[r];
  return s.defaultProps ? mu(s.defaultProps, o) : !s.styleOverrides && !s.variants ? mu(s, o) : o;
}
function rC({
  props: e,
  name: t
}) {
  const r = b.useContext(OS);
  return nC({
    props: e,
    name: t,
    theme: {
      components: r
    }
  });
}
function iC(e) {
  const t = Wp(), r = Kp() || "", {
    modularCssLayers: o
  } = e;
  let s = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
  return !o || t !== null ? s = "" : typeof o == "string" ? s = o.replace(/mui(?!\.)/g, s) : s = `@layer ${s};`, Pi(() => {
    const l = document.querySelector("head");
    if (!l)
      return;
    const u = l.firstChild;
    if (s) {
      if (u && u.hasAttribute?.("data-mui-layer-order") && u.getAttribute("data-mui-layer-order") === r)
        return;
      const d = document.createElement("style");
      d.setAttribute("data-mui-layer-order", r), d.textContent = s, l.prepend(d);
    } else
      l.querySelector(`style[data-mui-layer-order="${r}"]`)?.remove();
  }, [s, r]), s ? /* @__PURE__ */ j.jsx(wS, {
    styles: s
  }) : null;
}
const Qy = {};
function Gy(e, t, r, o = !1) {
  return b.useMemo(() => {
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
function LS(e) {
  const {
    children: t,
    theme: r,
    themeId: o
  } = e, s = Wp(Qy), l = Gp() || Qy, u = Gy(o, s, r), d = Gy(o, l, r, !0), p = (o ? u[o] : u).direction === "rtl", f = iC(u);
  return /* @__PURE__ */ j.jsx(Xk, {
    theme: d,
    children: /* @__PURE__ */ j.jsx(ta.Provider, {
      value: u,
      children: /* @__PURE__ */ j.jsx(Zk, {
        value: p,
        children: /* @__PURE__ */ j.jsxs(tC, {
          value: o ? u[o].components : u.components,
          children: [f, t]
        })
      })
    })
  });
}
const Yy = {
  theme: void 0
};
function oC(e) {
  let t, r;
  return function(s) {
    let l = t;
    return (l === void 0 || s.theme !== r) && (Yy.theme = s.theme, l = xS(e(Yy)), t = l, r = s.theme), l;
  };
}
const Yp = "mode", Jp = "color-scheme", sC = "data-color-scheme";
function aC(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: r = "light",
    defaultDarkColorScheme: o = "dark",
    modeStorageKey: s = Yp,
    colorSchemeStorageKey: l = Jp,
    attribute: u = sC,
    colorSchemeNode: d = "document.documentElement",
    nonce: p
  } = e || {};
  let f = "", g = u;
  if (u === "class" && (g = ".%s"), u === "data" && (g = "[data-%s]"), g.startsWith(".")) {
    const w = g.substring(1);
    f += `${d}.classList.remove('${w}'.replace('%s', light), '${w}'.replace('%s', dark));
      ${d}.classList.add('${w}'.replace('%s', colorScheme));`;
  }
  const m = g.match(/\[([^\]]+)\]/);
  if (m) {
    const [w, k] = m[1].split("=");
    k || (f += `${d}.removeAttribute('${w}'.replace('%s', light));
      ${d}.removeAttribute('${w}'.replace('%s', dark));`), f += `
      ${d}.setAttribute('${w}'.replace('%s', colorScheme), ${k ? `${k}.replace('%s', colorScheme)` : '""'});`;
  } else
    f += `${d}.setAttribute('${g}', colorScheme);`;
  return /* @__PURE__ */ j.jsx("script", {
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
function lC() {
}
const uC = ({
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
      return lC;
    const o = (s) => {
      const l = s.newValue;
      s.key === e && r(l);
    };
    return t.addEventListener("storage", o), () => {
      t.removeEventListener("storage", o);
    };
  }
});
function ff() {
}
function Jy(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function DS(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function cC(e) {
  return DS(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function dC(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: r,
    defaultDarkColorScheme: o,
    supportedColorSchemes: s = [],
    modeStorageKey: l = Yp,
    colorSchemeStorageKey: u = Jp,
    storageWindow: d = typeof window > "u" ? void 0 : window,
    storageManager: p = uC,
    noSsr: f = !1
  } = e, g = s.join(","), m = s.length > 1, w = b.useMemo(() => p?.({
    key: l,
    storageWindow: d
  }), [p, l, d]), k = b.useMemo(() => p?.({
    key: `${u}-light`,
    storageWindow: d
  }), [p, u, d]), S = b.useMemo(() => p?.({
    key: `${u}-dark`,
    storageWindow: d
  }), [p, u, d]), [_, x] = b.useState(() => {
    const I = w?.get(t) || t, L = k?.get(r) || r, v = S?.get(o) || o;
    return {
      mode: I,
      systemMode: Jy(I),
      lightColorScheme: L,
      darkColorScheme: v
    };
  }), [$, N] = b.useState(f || !m);
  b.useEffect(() => {
    N(!0);
  }, []);
  const C = cC(_), R = b.useCallback((I) => {
    x((L) => {
      if (I === L.mode)
        return L;
      const v = I ?? t;
      return w?.set(v), {
        ...L,
        mode: v,
        systemMode: Jy(v)
      };
    });
  }, [w, t]), E = b.useCallback((I) => {
    I ? typeof I == "string" ? I && !g.includes(I) ? console.error(`\`${I}\` does not exist in \`theme.colorSchemes\`.`) : x((L) => {
      const v = {
        ...L
      };
      return DS(L, (P) => {
        P === "light" && (k?.set(I), v.lightColorScheme = I), P === "dark" && (S?.set(I), v.darkColorScheme = I);
      }), v;
    }) : x((L) => {
      const v = {
        ...L
      }, P = I.light === null ? r : I.light, O = I.dark === null ? o : I.dark;
      return P && (g.includes(P) ? (v.lightColorScheme = P, k?.set(P)) : console.error(`\`${P}\` does not exist in \`theme.colorSchemes\`.`)), O && (g.includes(O) ? (v.darkColorScheme = O, S?.set(O)) : console.error(`\`${O}\` does not exist in \`theme.colorSchemes\`.`)), v;
    }) : x((L) => (k?.set(r), S?.set(o), {
      ...L,
      lightColorScheme: r,
      darkColorScheme: o
    }));
  }, [g, k, S, r, o]), M = b.useCallback((I) => {
    _.mode === "system" && x((L) => {
      const v = I?.matches ? "dark" : "light";
      return L.systemMode === v ? L : {
        ...L,
        systemMode: v
      };
    });
  }, [_.mode]), A = b.useRef(M);
  return A.current = M, b.useEffect(() => {
    if (typeof window.matchMedia != "function" || !m)
      return;
    const I = (...v) => A.current(...v), L = window.matchMedia("(prefers-color-scheme: dark)");
    return L.addListener(I), I(L), () => {
      L.removeListener(I);
    };
  }, [m]), b.useEffect(() => {
    if (m) {
      const I = w?.subscribe((P) => {
        (!P || ["light", "dark", "system"].includes(P)) && R(P || t);
      }) || ff, L = k?.subscribe((P) => {
        (!P || g.match(P)) && E({
          light: P
        });
      }) || ff, v = S?.subscribe((P) => {
        (!P || g.match(P)) && E({
          dark: P
        });
      }) || ff;
      return () => {
        I(), L(), v();
      };
    }
  }, [E, R, g, t, d, m, w, k, S]), {
    ..._,
    mode: $ ? _.mode : void 0,
    systemMode: $ ? _.systemMode : void 0,
    colorScheme: $ ? C : void 0,
    setMode: R,
    setColorScheme: E
  };
}
const fC = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function pC(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: r = {},
    modeStorageKey: o = Yp,
    colorSchemeStorageKey: s = Jp,
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
  }, f = /* @__PURE__ */ b.createContext(void 0), g = () => b.useContext(f) || p, m = {}, w = {};
  function k($) {
    const {
      children: N,
      theme: C,
      modeStorageKey: R = o,
      colorSchemeStorageKey: E = s,
      disableTransitionOnChange: M = l,
      storageManager: A,
      storageWindow: I = typeof window > "u" ? void 0 : window,
      documentNode: L = typeof document > "u" ? void 0 : document,
      colorSchemeNode: v = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: P = !1,
      disableStyleSheetGeneration: O = !1,
      defaultMode: F = "system",
      noSsr: B
    } = $, z = b.useRef(!1), V = Gp(), G = b.useContext(f), U = !!G && !P, H = b.useMemo(() => C || (typeof r == "function" ? r() : r), [C]), K = H[t], D = K || H, {
      colorSchemes: Y = m,
      components: re = w,
      cssVarPrefix: te
    } = D, se = Object.keys(Y).filter((Mt) => !!Y[Mt]).join(","), le = b.useMemo(() => se.split(","), [se]), de = typeof u == "string" ? u : u.light, he = typeof u == "string" ? u : u.dark, fe = Y[de] && Y[he] ? F : Y[D.defaultColorScheme]?.palette?.mode || D.palette?.mode, {
      mode: ue,
      setMode: we,
      systemMode: _e,
      lightColorScheme: qe,
      darkColorScheme: je,
      colorScheme: at,
      setColorScheme: dt
    } = dC({
      supportedColorSchemes: le,
      defaultLightColorScheme: de,
      defaultDarkColorScheme: he,
      modeStorageKey: R,
      colorSchemeStorageKey: E,
      defaultMode: fe,
      storageManager: A,
      storageWindow: I,
      noSsr: B
    });
    let Ze = ue, De = at;
    U && (Ze = G.mode, De = G.colorScheme);
    const $t = b.useMemo(() => {
      const Mt = De || D.defaultColorScheme, _t = D.generateThemeVars?.() || D.vars, At = {
        ...D,
        components: re,
        colorSchemes: Y,
        cssVarPrefix: te,
        vars: _t
      };
      if (typeof At.generateSpacing == "function" && (At.spacing = At.generateSpacing()), Mt) {
        const Ht = Y[Mt];
        Ht && typeof Ht == "object" && Object.keys(Ht).forEach((It) => {
          Ht[It] && typeof Ht[It] == "object" ? At[It] = {
            ...At[It],
            ...Ht[It]
          } : At[It] = Ht[It];
        });
      }
      return d ? d(At) : At;
    }, [D, De, re, Y, te]), ft = D.colorSchemeSelector;
    Pi(() => {
      if (De && v && ft && ft !== "media") {
        const Mt = ft;
        let _t = ft;
        if (Mt === "class" && (_t = ".%s"), Mt === "data" && (_t = "[data-%s]"), Mt?.startsWith("data-") && !Mt.includes("%s") && (_t = `[${Mt}="%s"]`), _t.startsWith("."))
          v.classList.remove(...le.map((At) => _t.substring(1).replace("%s", At))), v.classList.add(_t.substring(1).replace("%s", De));
        else {
          const At = _t.replace("%s", De).match(/\[([^\]]+)\]/);
          if (At) {
            const [Ht, It] = At[1].split("=");
            It || le.forEach((Sa) => {
              v.removeAttribute(Ht.replace(De, Sa));
            }), v.setAttribute(Ht, It ? It.replace(/"|'/g, "") : "");
          } else
            v.setAttribute(_t, De);
        }
      }
    }, [De, ft, v, le]), b.useEffect(() => {
      let Mt;
      if (M && z.current && L) {
        const _t = L.createElement("style");
        _t.appendChild(L.createTextNode(fC)), L.head.appendChild(_t), window.getComputedStyle(L.body), Mt = setTimeout(() => {
          L.head.removeChild(_t);
        }, 1);
      }
      return () => {
        clearTimeout(Mt);
      };
    }, [De, M, L]), b.useEffect(() => (z.current = !0, () => {
      z.current = !1;
    }), []);
    const Ue = b.useMemo(() => ({
      allColorSchemes: le,
      colorScheme: De,
      darkColorScheme: je,
      lightColorScheme: qe,
      mode: Ze,
      setColorScheme: dt,
      setMode: we,
      systemMode: _e
    }), [le, De, je, qe, Ze, dt, we, _e, $t.colorSchemeSelector]);
    let xe = !0;
    (O || D.cssVariables === !1 || U && V?.cssVarPrefix === te) && (xe = !1);
    const Po = /* @__PURE__ */ j.jsxs(b.Fragment, {
      children: [/* @__PURE__ */ j.jsx(LS, {
        themeId: K ? t : void 0,
        theme: $t,
        children: N
      }), xe && /* @__PURE__ */ j.jsx(pS, {
        styles: $t.generateStyleSheets?.() || []
      })]
    });
    return U ? Po : /* @__PURE__ */ j.jsx(f.Provider, {
      value: Ue,
      children: Po
    });
  }
  const S = typeof u == "string" ? u : u.light, _ = typeof u == "string" ? u : u.dark;
  return {
    CssVarsProvider: k,
    useColorScheme: g,
    getInitColorSchemeScript: ($) => aC({
      colorSchemeStorageKey: s,
      defaultLightColorScheme: S,
      defaultDarkColorScheme: _,
      modeStorageKey: o,
      ...$
    })
  };
}
function hC(e = "") {
  function t(...o) {
    if (!o.length)
      return "";
    const s = o[0];
    return typeof s == "string" && !s.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${s}${t(...o.slice(1))})` : `, ${s}`;
  }
  return (o, ...s) => `var(--${e ? `${e}-` : ""}${o}${t(...s)})`;
}
const Xy = (e, t, r, o = []) => {
  let s = e;
  t.forEach((l, u) => {
    u === t.length - 1 ? Array.isArray(s) ? s[Number(l)] = r : s && typeof s == "object" && (s[l] = r) : s && typeof s == "object" && (s[l] || (s[l] = o.includes(l) ? [] : {}), s = s[l]);
  });
}, gC = (e, t, r) => {
  function o(s, l = [], u = []) {
    Object.entries(s).forEach(([d, p]) => {
      (!r || r && !r([...l, d])) && p != null && (typeof p == "object" && Object.keys(p).length > 0 ? o(p, [...l, d], Array.isArray(p) ? [...u, d] : u) : t([...l, d], p, u));
    });
  }
  o(e);
}, mC = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((o) => e.includes(o)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function pf(e, t) {
  const {
    prefix: r,
    shouldSkipGeneratingVar: o
  } = t || {}, s = {}, l = {}, u = {};
  return gC(
    e,
    (d, p, f) => {
      if ((typeof p == "string" || typeof p == "number") && (!o || !o(d, p))) {
        const g = `--${r ? `${r}-` : ""}${d.join("-")}`, m = mC(d, p);
        Object.assign(s, {
          [g]: m
        }), Xy(l, d, `var(${g})`, f), Xy(u, d, `var(${g}, ${m})`, f);
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
function yC(e, t = {}) {
  const {
    getSelector: r = x,
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
    varsWithDefaults: m
  } = pf(p, t);
  let w = m;
  const k = {}, {
    [d]: S,
    ..._
  } = l;
  if (Object.entries(_ || {}).forEach(([C, R]) => {
    const {
      vars: E,
      css: M,
      varsWithDefaults: A
    } = pf(R, t);
    w = an(w, A), k[C] = {
      css: M,
      vars: E
    };
  }), S) {
    const {
      css: C,
      vars: R,
      varsWithDefaults: E
    } = pf(S, t);
    w = an(w, E), k[d] = {
      css: C,
      vars: R
    };
  }
  function x(C, R) {
    let E = s;
    if (s === "class" && (E = ".%s"), s === "data" && (E = "[data-%s]"), s?.startsWith("data-") && !s.includes("%s") && (E = `[${s}="%s"]`), C) {
      if (E === "media")
        return e.defaultColorScheme === C ? ":root" : {
          [`@media (prefers-color-scheme: ${l[C]?.palette?.mode || C})`]: {
            ":root": R
          }
        };
      if (E)
        return e.defaultColorScheme === C ? `:root, ${E.replace("%s", String(C))}` : E.replace("%s", String(C));
    }
    return ":root";
  }
  return {
    vars: w,
    generateThemeVars: () => {
      let C = {
        ...f
      };
      return Object.entries(k).forEach(([, {
        vars: R
      }]) => {
        C = an(C, R);
      }), C;
    },
    generateStyleSheets: () => {
      const C = [], R = e.defaultColorScheme || "light";
      function E(I, L) {
        Object.keys(L).length && C.push(typeof I == "string" ? {
          [I]: {
            ...L
          }
        } : I);
      }
      E(r(void 0, {
        ...g
      }), g);
      const {
        [R]: M,
        ...A
      } = k;
      if (M) {
        const {
          css: I
        } = M, L = l[R]?.palette?.mode, v = !o && L ? {
          colorScheme: L,
          ...I
        } : {
          ...I
        };
        E(r(R, {
          ...v
        }), v);
      }
      return Object.entries(A).forEach(([I, {
        css: L
      }]) => {
        const v = l[I]?.palette?.mode, P = !o && v ? {
          colorScheme: v,
          ...L
        } : {
          ...L
        };
        E(r(I, {
          ...P
        }), P);
      }), C;
    }
  };
}
function vC(e) {
  return function(r) {
    return e === "media" ? `@media (prefers-color-scheme: ${r})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${r}"] &` : e === "class" ? `.${r} &` : e === "data" ? `[data-${r}] &` : `${e.replace("%s", r)} &` : "&";
  };
}
function FS() {
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
      paper: Fs.white,
      default: Fs.white
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
const wC = FS();
function jS() {
  return {
    text: {
      primary: Fs.white,
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
      active: Fs.white,
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
const Zy = jS();
function ev(e, t, r, o) {
  const s = o.light || o, l = o.dark || o * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = qp(e.main, s) : t === "dark" && (e.dark = Hp(e.main, l)));
}
function SC(e = "light") {
  return e === "dark" ? {
    main: so[200],
    light: so[50],
    dark: so[400]
  } : {
    main: so[700],
    light: so[400],
    dark: so[800]
  };
}
function bC(e = "light") {
  return e === "dark" ? {
    main: oo[200],
    light: oo[50],
    dark: oo[400]
  } : {
    main: oo[500],
    light: oo[300],
    dark: oo[700]
  };
}
function _C(e = "light") {
  return e === "dark" ? {
    main: io[500],
    light: io[300],
    dark: io[700]
  } : {
    main: io[700],
    light: io[400],
    dark: io[800]
  };
}
function xC(e = "light") {
  return e === "dark" ? {
    main: ao[400],
    light: ao[300],
    dark: ao[700]
  } : {
    main: ao[700],
    light: ao[500],
    dark: ao[900]
  };
}
function kC(e = "light") {
  return e === "dark" ? {
    main: lo[400],
    light: lo[300],
    dark: lo[700]
  } : {
    main: lo[800],
    light: lo[500],
    dark: lo[900]
  };
}
function CC(e = "light") {
  return e === "dark" ? {
    main: ps[400],
    light: ps[300],
    dark: ps[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ps[500],
    dark: ps[900]
  };
}
function Xp(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: o = 0.2,
    ...s
  } = e, l = e.primary || SC(t), u = e.secondary || bC(t), d = e.error || _C(t), p = e.info || xC(t), f = e.success || kC(t), g = e.warning || CC(t);
  function m(_) {
    return jk(_, Zy.text.primary) >= r ? Zy.text.primary : wC.text.primary;
  }
  const w = ({
    color: _,
    name: x,
    mainShade: $ = 500,
    lightShade: N = 300,
    darkShade: C = 700
  }) => {
    if (_ = {
      ..._
    }, !_.main && _[$] && (_.main = _[$]), !_.hasOwnProperty("main"))
      throw new Error(Ei(11, x ? ` (${x})` : "", $));
    if (typeof _.main != "string")
      throw new Error(Ei(12, x ? ` (${x})` : "", JSON.stringify(_.main)));
    return ev(_, "light", N, o), ev(_, "dark", C, o), _.contrastText || (_.contrastText = m(_.main)), _;
  };
  let k;
  return t === "light" ? k = FS() : t === "dark" && (k = jS()), an({
    // A collection of common colors.
    common: {
      ...Fs
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: w({
      color: l,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: w({
      color: u,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: w({
      color: d,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: w({
      color: g,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: w({
      color: p,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: w({
      color: f,
      name: "success"
    }),
    // The grey colors.
    grey: _x,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: m,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: o,
    // The light and dark mode object.
    ...k
  }, s);
}
function EC(e) {
  const t = {};
  return Object.entries(e).forEach((o) => {
    const [s, l] = o;
    typeof l == "object" && (t[s] = `${l.fontStyle ? `${l.fontStyle} ` : ""}${l.fontVariant ? `${l.fontVariant} ` : ""}${l.fontWeight ? `${l.fontWeight} ` : ""}${l.fontStretch ? `${l.fontStretch} ` : ""}${l.fontSize || ""}${l.lineHeight ? `/${l.lineHeight} ` : ""}${l.fontFamily || ""}`);
  }), t;
}
function PC(e, t) {
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
function RC(e) {
  return Math.round(e * 1e5) / 1e5;
}
const tv = {
  textTransform: "uppercase"
}, nv = '"Roboto", "Helvetica", "Arial", sans-serif';
function zS(e, t) {
  const {
    fontFamily: r = nv,
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
    ...m
  } = typeof t == "function" ? t(e) : t, w = o / 14, k = g || ((x) => `${x / p * w}rem`), S = (x, $, N, C, R) => ({
    fontFamily: r,
    fontWeight: x,
    fontSize: k($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: N,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...r === nv ? {
      letterSpacing: `${RC(C / $)}em`
    } : {},
    ...R,
    ...f
  }), _ = {
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
    button: S(u, 14, 1.75, 0.4, tv),
    caption: S(l, 12, 1.66, 0.4),
    overline: S(l, 12, 2.66, 1, tv),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return an({
    htmlFontSize: p,
    pxToRem: k,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: s,
    fontWeightRegular: l,
    fontWeightMedium: u,
    fontWeightBold: d,
    ..._
  }, m, {
    clone: !1
    // No need to clone deep
  });
}
const TC = 0.2, $C = 0.14, MC = 0.12;
function Qe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${TC})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$C})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${MC})`].join(",");
}
const AC = ["none", Qe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Qe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Qe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Qe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Qe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Qe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Qe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Qe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Qe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Qe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Qe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Qe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Qe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Qe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Qe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Qe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Qe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Qe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Qe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Qe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Qe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Qe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Qe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Qe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], IC = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, NC = {
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
function rv(e) {
  return `${Math.round(e)}ms`;
}
function OC(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function LC(e) {
  const t = {
    ...IC,
    ...e.easing
  }, r = {
    ...NC,
    ...e.duration
  };
  return {
    getAutoHeightDuration: OC,
    create: (s = ["all"], l = {}) => {
      const {
        duration: u = r.standard,
        easing: d = t.easeInOut,
        delay: p = 0,
        ...f
      } = l;
      return (Array.isArray(s) ? s : [s]).map((g) => `${g} ${typeof u == "string" ? u : rv(u)} ${d} ${typeof p == "string" ? p : rv(p)}`).join(",");
    },
    ...e,
    easing: t,
    duration: r
  };
}
const DC = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function FC(e) {
  return qn(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function BS(e = {}) {
  const t = {
    ...e
  };
  function r(o) {
    const s = Object.entries(o);
    for (let l = 0; l < s.length; l++) {
      const [u, d] = s[l];
      !FC(d) || u.startsWith("unstable_") ? delete o[u] : qn(d) && (o[u] = {
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
function Qf(e = {}, ...t) {
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
    throw new Error(Ei(20));
  const g = Xp(l), m = Bp(e);
  let w = an(m, {
    mixins: PC(m.breakpoints, o),
    palette: g,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: AC.slice(),
    typography: zS(g, d),
    transitions: LC(u),
    zIndex: {
      ...DC
    }
  });
  return w = an(w, f), w = t.reduce((k, S) => an(k, S), w), w.unstable_sxConfig = {
    ...oa,
    ...f?.unstable_sxConfig
  }, w.unstable_sx = function(S) {
    return Qr({
      sx: S,
      theme: this
    });
  }, w.toRuntimeSource = BS, w;
}
function Gf(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const jC = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const r = Gf(t);
  return `linear-gradient(rgba(255 255 255 / ${r}), rgba(255 255 255 / ${r}))`;
});
function WS(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function US(e) {
  return e === "dark" ? jC : [];
}
function zC(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: r,
    overlays: o,
    ...s
  } = e, l = Xp(t);
  return {
    palette: l,
    opacity: {
      ...WS(l.mode),
      ...r
    },
    overlays: o || US(l.mode),
    ...s
  };
}
function BC(e) {
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
const WC = (e) => [...[...Array(25)].map((t, r) => `--${e ? `${e}-` : ""}overlays-${r}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], UC = (e) => (t, r) => {
  const o = e.rootSelector || ":root", s = e.colorSchemeSelector;
  let l = s;
  if (s === "class" && (l = ".%s"), s === "data" && (l = "[data-%s]"), s?.startsWith("data-") && !s.includes("%s") && (l = `[${s}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const u = {};
      return WC(e.cssVarPrefix).forEach((d) => {
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
function VC(e, t) {
  t.forEach((r) => {
    e[r] || (e[r] = {});
  });
}
function ee(e, t, r) {
  !e[t] && r && (e[t] = r);
}
function ks(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : CS(e);
}
function dr(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = xs(ks(e[t])));
}
function HC(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Un = (e) => {
  try {
    return e();
  } catch {
  }
}, qC = (e = "mui") => hC(e);
function hf(e, t, r, o) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const s = o === "dark" ? "dark" : "light";
  if (!r) {
    e[o] = zC({
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
  } = Qf({
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
      ...WS(s),
      ...t?.opacity
    },
    overlays: t?.overlays || US(s)
  }, u;
}
function KC(e = {}, ...t) {
  const {
    colorSchemes: r = {
      light: !0
    },
    defaultColorScheme: o,
    disableCssColorScheme: s = !1,
    cssVarPrefix: l = "mui",
    shouldSkipGeneratingVar: u = BC,
    colorSchemeSelector: d = r.light && r.dark ? "media" : void 0,
    rootSelector: p = ":root",
    ...f
  } = e, g = Object.keys(r)[0], m = o || (r.light && g !== "light" ? "light" : g), w = qC(l), {
    [m]: k,
    light: S,
    dark: _,
    ...x
  } = r, $ = {
    ...x
  };
  let N = k;
  if ((m === "dark" && !("dark" in r) || m === "light" && !("light" in r)) && (N = !0), !N)
    throw new Error(Ei(21, m));
  const C = hf($, N, f, m);
  S && !$.light && hf($, S, void 0, "light"), _ && !$.dark && hf($, _, void 0, "dark");
  let R = {
    defaultColorScheme: m,
    ...C,
    cssVarPrefix: l,
    colorSchemeSelector: d,
    rootSelector: p,
    getCssVar: w,
    colorSchemes: $,
    font: {
      ...EC(C.typography),
      ...C.font
    },
    spacing: HC(f.spacing)
  };
  Object.keys(R.colorSchemes).forEach((L) => {
    const v = R.colorSchemes[L].palette, P = (O) => {
      const F = O.split("-"), B = F[1], z = F[2];
      return w(O, v[B][z]);
    };
    if (v.mode === "light" && (ee(v.common, "background", "#fff"), ee(v.common, "onBackground", "#000")), v.mode === "dark" && (ee(v.common, "background", "#000"), ee(v.common, "onBackground", "#fff")), VC(v, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), v.mode === "light") {
      ee(v.Alert, "errorColor", ze(v.error.light, 0.6)), ee(v.Alert, "infoColor", ze(v.info.light, 0.6)), ee(v.Alert, "successColor", ze(v.success.light, 0.6)), ee(v.Alert, "warningColor", ze(v.warning.light, 0.6)), ee(v.Alert, "errorFilledBg", P("palette-error-main")), ee(v.Alert, "infoFilledBg", P("palette-info-main")), ee(v.Alert, "successFilledBg", P("palette-success-main")), ee(v.Alert, "warningFilledBg", P("palette-warning-main")), ee(v.Alert, "errorFilledColor", Un(() => v.getContrastText(v.error.main))), ee(v.Alert, "infoFilledColor", Un(() => v.getContrastText(v.info.main))), ee(v.Alert, "successFilledColor", Un(() => v.getContrastText(v.success.main))), ee(v.Alert, "warningFilledColor", Un(() => v.getContrastText(v.warning.main))), ee(v.Alert, "errorStandardBg", Be(v.error.light, 0.9)), ee(v.Alert, "infoStandardBg", Be(v.info.light, 0.9)), ee(v.Alert, "successStandardBg", Be(v.success.light, 0.9)), ee(v.Alert, "warningStandardBg", Be(v.warning.light, 0.9)), ee(v.Alert, "errorIconColor", P("palette-error-main")), ee(v.Alert, "infoIconColor", P("palette-info-main")), ee(v.Alert, "successIconColor", P("palette-success-main")), ee(v.Alert, "warningIconColor", P("palette-warning-main")), ee(v.AppBar, "defaultBg", P("palette-grey-100")), ee(v.Avatar, "defaultBg", P("palette-grey-400")), ee(v.Button, "inheritContainedBg", P("palette-grey-300")), ee(v.Button, "inheritContainedHoverBg", P("palette-grey-A100")), ee(v.Chip, "defaultBorder", P("palette-grey-400")), ee(v.Chip, "defaultAvatarColor", P("palette-grey-700")), ee(v.Chip, "defaultIconColor", P("palette-grey-700")), ee(v.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ee(v.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ee(v.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ee(v.LinearProgress, "primaryBg", Be(v.primary.main, 0.62)), ee(v.LinearProgress, "secondaryBg", Be(v.secondary.main, 0.62)), ee(v.LinearProgress, "errorBg", Be(v.error.main, 0.62)), ee(v.LinearProgress, "infoBg", Be(v.info.main, 0.62)), ee(v.LinearProgress, "successBg", Be(v.success.main, 0.62)), ee(v.LinearProgress, "warningBg", Be(v.warning.main, 0.62)), ee(v.Skeleton, "bg", `rgba(${P("palette-text-primaryChannel")} / 0.11)`), ee(v.Slider, "primaryTrack", Be(v.primary.main, 0.62)), ee(v.Slider, "secondaryTrack", Be(v.secondary.main, 0.62)), ee(v.Slider, "errorTrack", Be(v.error.main, 0.62)), ee(v.Slider, "infoTrack", Be(v.info.main, 0.62)), ee(v.Slider, "successTrack", Be(v.success.main, 0.62)), ee(v.Slider, "warningTrack", Be(v.warning.main, 0.62));
      const O = $l(v.background.default, 0.8);
      ee(v.SnackbarContent, "bg", O), ee(v.SnackbarContent, "color", Un(() => v.getContrastText(O))), ee(v.SpeedDialAction, "fabHoverBg", $l(v.background.paper, 0.15)), ee(v.StepConnector, "border", P("palette-grey-400")), ee(v.StepContent, "border", P("palette-grey-400")), ee(v.Switch, "defaultColor", P("palette-common-white")), ee(v.Switch, "defaultDisabledColor", P("palette-grey-100")), ee(v.Switch, "primaryDisabledColor", Be(v.primary.main, 0.62)), ee(v.Switch, "secondaryDisabledColor", Be(v.secondary.main, 0.62)), ee(v.Switch, "errorDisabledColor", Be(v.error.main, 0.62)), ee(v.Switch, "infoDisabledColor", Be(v.info.main, 0.62)), ee(v.Switch, "successDisabledColor", Be(v.success.main, 0.62)), ee(v.Switch, "warningDisabledColor", Be(v.warning.main, 0.62)), ee(v.TableCell, "border", Be(Tl(v.divider, 1), 0.88)), ee(v.Tooltip, "bg", Tl(v.grey[700], 0.92));
    }
    if (v.mode === "dark") {
      ee(v.Alert, "errorColor", Be(v.error.light, 0.6)), ee(v.Alert, "infoColor", Be(v.info.light, 0.6)), ee(v.Alert, "successColor", Be(v.success.light, 0.6)), ee(v.Alert, "warningColor", Be(v.warning.light, 0.6)), ee(v.Alert, "errorFilledBg", P("palette-error-dark")), ee(v.Alert, "infoFilledBg", P("palette-info-dark")), ee(v.Alert, "successFilledBg", P("palette-success-dark")), ee(v.Alert, "warningFilledBg", P("palette-warning-dark")), ee(v.Alert, "errorFilledColor", Un(() => v.getContrastText(v.error.dark))), ee(v.Alert, "infoFilledColor", Un(() => v.getContrastText(v.info.dark))), ee(v.Alert, "successFilledColor", Un(() => v.getContrastText(v.success.dark))), ee(v.Alert, "warningFilledColor", Un(() => v.getContrastText(v.warning.dark))), ee(v.Alert, "errorStandardBg", ze(v.error.light, 0.9)), ee(v.Alert, "infoStandardBg", ze(v.info.light, 0.9)), ee(v.Alert, "successStandardBg", ze(v.success.light, 0.9)), ee(v.Alert, "warningStandardBg", ze(v.warning.light, 0.9)), ee(v.Alert, "errorIconColor", P("palette-error-main")), ee(v.Alert, "infoIconColor", P("palette-info-main")), ee(v.Alert, "successIconColor", P("palette-success-main")), ee(v.Alert, "warningIconColor", P("palette-warning-main")), ee(v.AppBar, "defaultBg", P("palette-grey-900")), ee(v.AppBar, "darkBg", P("palette-background-paper")), ee(v.AppBar, "darkColor", P("palette-text-primary")), ee(v.Avatar, "defaultBg", P("palette-grey-600")), ee(v.Button, "inheritContainedBg", P("palette-grey-800")), ee(v.Button, "inheritContainedHoverBg", P("palette-grey-700")), ee(v.Chip, "defaultBorder", P("palette-grey-700")), ee(v.Chip, "defaultAvatarColor", P("palette-grey-300")), ee(v.Chip, "defaultIconColor", P("palette-grey-300")), ee(v.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ee(v.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ee(v.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ee(v.LinearProgress, "primaryBg", ze(v.primary.main, 0.5)), ee(v.LinearProgress, "secondaryBg", ze(v.secondary.main, 0.5)), ee(v.LinearProgress, "errorBg", ze(v.error.main, 0.5)), ee(v.LinearProgress, "infoBg", ze(v.info.main, 0.5)), ee(v.LinearProgress, "successBg", ze(v.success.main, 0.5)), ee(v.LinearProgress, "warningBg", ze(v.warning.main, 0.5)), ee(v.Skeleton, "bg", `rgba(${P("palette-text-primaryChannel")} / 0.13)`), ee(v.Slider, "primaryTrack", ze(v.primary.main, 0.5)), ee(v.Slider, "secondaryTrack", ze(v.secondary.main, 0.5)), ee(v.Slider, "errorTrack", ze(v.error.main, 0.5)), ee(v.Slider, "infoTrack", ze(v.info.main, 0.5)), ee(v.Slider, "successTrack", ze(v.success.main, 0.5)), ee(v.Slider, "warningTrack", ze(v.warning.main, 0.5));
      const O = $l(v.background.default, 0.98);
      ee(v.SnackbarContent, "bg", O), ee(v.SnackbarContent, "color", Un(() => v.getContrastText(O))), ee(v.SpeedDialAction, "fabHoverBg", $l(v.background.paper, 0.15)), ee(v.StepConnector, "border", P("palette-grey-600")), ee(v.StepContent, "border", P("palette-grey-600")), ee(v.Switch, "defaultColor", P("palette-grey-300")), ee(v.Switch, "defaultDisabledColor", P("palette-grey-600")), ee(v.Switch, "primaryDisabledColor", ze(v.primary.main, 0.55)), ee(v.Switch, "secondaryDisabledColor", ze(v.secondary.main, 0.55)), ee(v.Switch, "errorDisabledColor", ze(v.error.main, 0.55)), ee(v.Switch, "infoDisabledColor", ze(v.info.main, 0.55)), ee(v.Switch, "successDisabledColor", ze(v.success.main, 0.55)), ee(v.Switch, "warningDisabledColor", ze(v.warning.main, 0.55)), ee(v.TableCell, "border", ze(Tl(v.divider, 1), 0.68)), ee(v.Tooltip, "bg", Tl(v.grey[700], 0.92));
    }
    dr(v.background, "default"), dr(v.background, "paper"), dr(v.common, "background"), dr(v.common, "onBackground"), dr(v, "divider"), Object.keys(v).forEach((O) => {
      const F = v[O];
      O !== "tonalOffset" && F && typeof F == "object" && (F.main && ee(v[O], "mainChannel", xs(ks(F.main))), F.light && ee(v[O], "lightChannel", xs(ks(F.light))), F.dark && ee(v[O], "darkChannel", xs(ks(F.dark))), F.contrastText && ee(v[O], "contrastTextChannel", xs(ks(F.contrastText))), O === "text" && (dr(v[O], "primary"), dr(v[O], "secondary")), O === "action" && (F.active && dr(v[O], "active"), F.selected && dr(v[O], "selected")));
    });
  }), R = t.reduce((L, v) => an(L, v), R);
  const E = {
    prefix: l,
    disableCssColorScheme: s,
    shouldSkipGeneratingVar: u,
    getSelector: UC(R)
  }, {
    vars: M,
    generateThemeVars: A,
    generateStyleSheets: I
  } = yC(R, E);
  return R.vars = M, Object.entries(R.colorSchemes[R.defaultColorScheme]).forEach(([L, v]) => {
    R[L] = v;
  }), R.generateThemeVars = A, R.generateStyleSheets = I, R.generateSpacing = function() {
    return vS(f.spacing, jp(this));
  }, R.getColorSchemeSelector = vC(d), R.spacing = R.generateSpacing(), R.shouldSkipGeneratingVar = u, R.unstable_sxConfig = {
    ...oa,
    ...f?.unstable_sxConfig
  }, R.unstable_sx = function(v) {
    return Qr({
      sx: v,
      theme: this
    });
  }, R.toRuntimeSource = BS, R;
}
function iv(e, t, r) {
  e.colorSchemes && r && (e.colorSchemes[t] = {
    ...r !== !0 && r,
    palette: Xp({
      ...r === !0 ? {} : r.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function sa(e = {}, ...t) {
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
      return Qf(e, ...t);
    let g = r;
    "palette" in e || f[d] && (f[d] !== !0 ? g = f[d].palette : d === "dark" && (g = {
      mode: "dark"
    }));
    const m = Qf({
      ...e,
      palette: g
    }, ...t);
    return m.defaultColorScheme = d, m.colorSchemes = f, m.palette.mode === "light" && (m.colorSchemes.light = {
      ...f.light !== !0 && f.light,
      palette: m.palette
    }, iv(m, "dark", f.dark)), m.palette.mode === "dark" && (m.colorSchemes.dark = {
      ...f.dark !== !0 && f.dark,
      palette: m.palette
    }, iv(m, "light", f.light)), m;
  }
  return !r && !("light" in f) && d === "light" && (f.light = !0), KC({
    ...u,
    colorSchemes: f,
    defaultColorScheme: d,
    ...typeof o != "boolean" && o
  }, ...t);
}
function QC(e) {
  return String(e).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function GC(e) {
  return parseFloat(e);
}
const Zp = sa();
function eh() {
  const e = Up(Zp);
  return e[Gn] || e;
}
function YC(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const _o = (e) => YC(e) && e !== "classes", Me = Mk({
  themeId: Gn,
  defaultTheme: Zp,
  rootShouldForwardProp: _o
});
function JC({
  theme: e,
  ...t
}) {
  const r = Gn in e ? e[Gn] : void 0;
  return /* @__PURE__ */ j.jsx(LS, {
    ...t,
    themeId: r ? Gn : void 0,
    theme: r || e
  });
}
const Ml = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
}, {
  CssVarsProvider: XC
} = pC({
  themeId: Gn,
  // @ts-ignore ignore module augmentation tests
  theme: () => sa({
    cssVariables: !0
  }),
  colorSchemeStorageKey: Ml.colorSchemeStorageKey,
  modeStorageKey: Ml.modeStorageKey,
  defaultColorScheme: {
    light: Ml.defaultLightColorScheme,
    dark: Ml.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: zS(e.palette, e.typography)
    };
    return t.unstable_sx = function(o) {
      return Qr({
        sx: o,
        theme: this
      });
    }, t;
  }
}), ZC = XC;
function eE({
  theme: e,
  ...t
}) {
  const r = b.useMemo(() => {
    if (typeof e == "function")
      return e;
    const o = Gn in e ? e[Gn] : e;
    return "colorSchemes" in o ? null : "vars" in o ? e : {
      ...e,
      vars: null
    };
  }, [e]);
  return r ? /* @__PURE__ */ j.jsx(JC, {
    theme: r,
    ...t
  }) : /* @__PURE__ */ j.jsx(ZC, {
    theme: e,
    ...t
  });
}
function tE(e) {
  return /* @__PURE__ */ j.jsx(wS, {
    ...e,
    defaultTheme: Zp,
    themeId: Gn
  });
}
function VS(e) {
  return function(r) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ j.jsx(tE, {
        styles: typeof e == "function" ? (o) => e({
          theme: o,
          ...r
        }) : e
      })
    );
  };
}
function nE() {
  return SS;
}
const bn = oC;
function mt(e) {
  return rC(e);
}
function rE(e) {
  return gt("MuiSvgIcon", e);
}
Xe("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const iE = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: o
  } = e, s = {
    root: ["root", t !== "inherit" && `color${Pe(t)}`, `fontSize${Pe(r)}`]
  };
  return bt(s, rE, o);
}, oE = Me("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${Pe(r.color)}`], t[`fontSize${Pe(r.fontSize)}`]];
  }
})(bn(({
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
}))), Yf = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    titleAccess: m,
    viewBox: w = "0 0 24 24",
    ...k
  } = o, S = /* @__PURE__ */ b.isValidElement(s) && s.type === "svg", _ = {
    ...o,
    color: u,
    component: d,
    fontSize: p,
    instanceFontSize: t.fontSize,
    inheritViewBox: g,
    viewBox: w,
    hasSvgAsChild: S
  }, x = {};
  g || (x.viewBox = w);
  const $ = iE(_);
  return /* @__PURE__ */ j.jsxs(oE, {
    as: d,
    className: Re($.root, l),
    focusable: "false",
    color: f,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: r,
    ...x,
    ...k,
    ...S && s.props,
    ownerState: _,
    children: [S ? s.props.children : s, m ? /* @__PURE__ */ j.jsx("title", {
      children: m
    }) : null]
  });
});
Yf.muiName = "SvgIcon";
function ei(e, t) {
  function r(o, s) {
    return /* @__PURE__ */ j.jsx(Yf, {
      "data-testid": `${t}Icon`,
      ref: s,
      ...o,
      children: e
    });
  }
  return r.muiName = Yf.muiName, /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(r));
}
function HS(e, t) {
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
function qS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (t.indexOf(o) !== -1) continue;
    r[o] = e[o];
  }
  return r;
}
function Jf(e, t) {
  return Jf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Jf(e, t);
}
function KS(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Jf(e, t);
}
var gf = { exports: {} }, Jt = {}, mf = { exports: {} }, yf = {};
var ov;
function sE() {
  return ov || (ov = 1, (function(e) {
    function t(U, H) {
      var K = U.length;
      U.push(H);
      e: for (; 0 < K; ) {
        var D = K - 1 >>> 1, Y = U[D];
        if (0 < s(Y, H)) U[D] = H, U[K] = Y, K = D;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function o(U) {
      if (U.length === 0) return null;
      var H = U[0], K = U.pop();
      if (K !== H) {
        U[0] = K;
        e: for (var D = 0, Y = U.length, re = Y >>> 1; D < re; ) {
          var te = 2 * (D + 1) - 1, se = U[te], le = te + 1, de = U[le];
          if (0 > s(se, K)) le < Y && 0 > s(de, se) ? (U[D] = de, U[le] = K, D = le) : (U[D] = se, U[te] = K, D = te);
          else if (le < Y && 0 > s(de, K)) U[D] = de, U[le] = K, D = le;
          else break e;
        }
      }
      return H;
    }
    function s(U, H) {
      var K = U.sortIndex - H.sortIndex;
      return K !== 0 ? K : U.id - H.id;
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
    var p = [], f = [], g = 1, m = null, w = 3, k = !1, S = !1, _ = !1, x = typeof setTimeout == "function" ? setTimeout : null, $ = typeof clearTimeout == "function" ? clearTimeout : null, N = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function C(U) {
      for (var H = r(f); H !== null; ) {
        if (H.callback === null) o(f);
        else if (H.startTime <= U) o(f), H.sortIndex = H.expirationTime, t(p, H);
        else break;
        H = r(f);
      }
    }
    function R(U) {
      if (_ = !1, C(U), !S) if (r(p) !== null) S = !0, V(E);
      else {
        var H = r(f);
        H !== null && G(R, H.startTime - U);
      }
    }
    function E(U, H) {
      S = !1, _ && (_ = !1, $(I), I = -1), k = !0;
      var K = w;
      try {
        for (C(H), m = r(p); m !== null && (!(m.expirationTime > H) || U && !P()); ) {
          var D = m.callback;
          if (typeof D == "function") {
            m.callback = null, w = m.priorityLevel;
            var Y = D(m.expirationTime <= H);
            H = e.unstable_now(), typeof Y == "function" ? m.callback = Y : m === r(p) && o(p), C(H);
          } else o(p);
          m = r(p);
        }
        if (m !== null) var re = !0;
        else {
          var te = r(f);
          te !== null && G(R, te.startTime - H), re = !1;
        }
        return re;
      } finally {
        m = null, w = K, k = !1;
      }
    }
    var M = !1, A = null, I = -1, L = 5, v = -1;
    function P() {
      return !(e.unstable_now() - v < L);
    }
    function O() {
      if (A !== null) {
        var U = e.unstable_now();
        v = U;
        var H = !0;
        try {
          H = A(!0, U);
        } finally {
          H ? F() : (M = !1, A = null);
        }
      } else M = !1;
    }
    var F;
    if (typeof N == "function") F = function() {
      N(O);
    };
    else if (typeof MessageChannel < "u") {
      var B = new MessageChannel(), z = B.port2;
      B.port1.onmessage = O, F = function() {
        z.postMessage(null);
      };
    } else F = function() {
      x(O, 0);
    };
    function V(U) {
      A = U, M || (M = !0, F());
    }
    function G(U, H) {
      I = x(function() {
        U(e.unstable_now());
      }, H);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, e.unstable_continueExecution = function() {
      S || k || (S = !0, V(E));
    }, e.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < U ? Math.floor(1e3 / U) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, e.unstable_getFirstCallbackNode = function() {
      return r(p);
    }, e.unstable_next = function(U) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = w;
      }
      var K = w;
      w = H;
      try {
        return U();
      } finally {
        w = K;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(U, H) {
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
      var K = w;
      w = U;
      try {
        return H();
      } finally {
        w = K;
      }
    }, e.unstable_scheduleCallback = function(U, H, K) {
      var D = e.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? D + K : D) : K = D, U) {
        case 1:
          var Y = -1;
          break;
        case 2:
          Y = 250;
          break;
        case 5:
          Y = 1073741823;
          break;
        case 4:
          Y = 1e4;
          break;
        default:
          Y = 5e3;
      }
      return Y = K + Y, U = { id: g++, callback: H, priorityLevel: U, startTime: K, expirationTime: Y, sortIndex: -1 }, K > D ? (U.sortIndex = K, t(f, U), r(p) === null && U === r(f) && (_ ? ($(I), I = -1) : _ = !0, G(R, K - D))) : (U.sortIndex = Y, t(p, U), S || k || (S = !0, V(E))), U;
    }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(U) {
      var H = w;
      return function() {
        var K = w;
        w = H;
        try {
          return U.apply(this, arguments);
        } finally {
          w = K;
        }
      };
    };
  })(yf)), yf;
}
var sv;
function aE() {
  return sv || (sv = 1, mf.exports = sE()), mf.exports;
}
var av;
function lE() {
  if (av) return Jt;
  av = 1;
  var e = ju(), t = aE();
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
  var d = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), p = Object.prototype.hasOwnProperty, f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, m = {};
  function w(n) {
    return p.call(m, n) ? !0 : p.call(g, n) ? !1 : f.test(n) ? m[n] = !0 : (g[n] = !0, !1);
  }
  function k(n, i, a, c) {
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
    if (i === null || typeof i > "u" || k(n, i, a, c)) return !0;
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
  function _(n, i, a, c, h, y, T) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = c, this.attributeNamespace = h, this.mustUseProperty = a, this.propertyName = n, this.type = i, this.sanitizeURL = y, this.removeEmptyString = T;
  }
  var x = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    x[n] = new _(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var i = n[0];
    x[i] = new _(i, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    x[n] = new _(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    x[n] = new _(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    x[n] = new _(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    x[n] = new _(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    x[n] = new _(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    x[n] = new _(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    x[n] = new _(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var $ = /[\-:]([a-z])/g;
  function N(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var i = n.replace(
      $,
      N
    );
    x[i] = new _(i, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var i = n.replace($, N);
    x[i] = new _(i, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var i = n.replace($, N);
    x[i] = new _(i, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    x[n] = new _(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), x.xlinkHref = new _("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    x[n] = new _(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function C(n, i, a, c) {
    var h = x.hasOwnProperty(i) ? x[i] : null;
    (h !== null ? h.type !== 0 : c || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (S(i, a, h, c) && (a = null), c || h === null ? w(i) && (a === null ? n.removeAttribute(i) : n.setAttribute(i, "" + a)) : h.mustUseProperty ? n[h.propertyName] = a === null ? h.type === 3 ? !1 : "" : a : (i = h.attributeName, c = h.attributeNamespace, a === null ? n.removeAttribute(i) : (h = h.type, a = h === 3 || h === 4 && a === !0 ? "" : "" + a, c ? n.setAttributeNS(c, i, a) : n.setAttribute(i, a))));
  }
  var R = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, E = /* @__PURE__ */ Symbol.for("react.element"), M = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), I = /* @__PURE__ */ Symbol.for("react.strict_mode"), L = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), P = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), F = /* @__PURE__ */ Symbol.for("react.suspense"), B = /* @__PURE__ */ Symbol.for("react.suspense_list"), z = /* @__PURE__ */ Symbol.for("react.memo"), V = /* @__PURE__ */ Symbol.for("react.lazy"), G = /* @__PURE__ */ Symbol.for("react.offscreen"), U = Symbol.iterator;
  function H(n) {
    return n === null || typeof n != "object" ? null : (n = U && n[U] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var K = Object.assign, D;
  function Y(n) {
    if (D === void 0) try {
      throw Error();
    } catch (a) {
      var i = a.stack.trim().match(/\n( *(at )?)/);
      D = i && i[1] || "";
    }
    return `
` + D + n;
  }
  var re = !1;
  function te(n, i) {
    if (!n || re) return "";
    re = !0;
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
`), y = c.stack.split(`
`), T = h.length - 1, W = y.length - 1; 1 <= T && 0 <= W && h[T] !== y[W]; ) W--;
        for (; 1 <= T && 0 <= W; T--, W--) if (h[T] !== y[W]) {
          if (T !== 1 || W !== 1)
            do
              if (T--, W--, 0 > W || h[T] !== y[W]) {
                var q = `
` + h[T].replace(" at new ", " at ");
                return n.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", n.displayName)), q;
              }
            while (1 <= T && 0 <= W);
          break;
        }
      }
    } finally {
      re = !1, Error.prepareStackTrace = a;
    }
    return (n = n ? n.displayName || n.name : "") ? Y(n) : "";
  }
  function se(n) {
    switch (n.tag) {
      case 5:
        return Y(n.type);
      case 16:
        return Y("Lazy");
      case 13:
        return Y("Suspense");
      case 19:
        return Y("SuspenseList");
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
      case F:
        return "Suspense";
      case B:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case P:
        return (n.displayName || "Context") + ".Consumer";
      case v:
        return (n._context.displayName || "Context") + ".Provider";
      case O:
        var i = n.render;
        return n = n.displayName, n || (n = i.displayName || i.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case z:
        return i = n.displayName || null, i !== null ? i : le(n.type) || "Memo";
      case V:
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
      var h = a.get, y = a.set;
      return Object.defineProperty(n, i, { configurable: !0, get: function() {
        return h.call(this);
      }, set: function(T) {
        c = "" + T, y.call(this, T);
      } }), Object.defineProperty(n, i, { enumerable: a.enumerable }), { getValue: function() {
        return c;
      }, setValue: function(T) {
        c = "" + T;
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
  function je(n, i) {
    var a = i.checked;
    return K({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: a ?? n._wrapperState.initialChecked });
  }
  function at(n, i) {
    var a = i.defaultValue == null ? "" : i.defaultValue, c = i.checked != null ? i.checked : i.defaultChecked;
    a = he(i.value != null ? i.value : a), n._wrapperState = { initialChecked: c, initialValue: a, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function dt(n, i) {
    i = i.checked, i != null && C(n, "checked", i, !1);
  }
  function Ze(n, i) {
    dt(n, i);
    var a = he(i.value), c = i.type;
    if (a != null) c === "number" ? (a === 0 && n.value === "" || n.value != a) && (n.value = "" + a) : n.value !== "" + a && (n.value = "" + a);
    else if (c === "submit" || c === "reset") {
      n.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? $t(n, i.type, a) : i.hasOwnProperty("defaultValue") && $t(n, i.type, he(i.defaultValue)), i.checked == null && i.defaultChecked != null && (n.defaultChecked = !!i.defaultChecked);
  }
  function De(n, i, a) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var c = i.type;
      if (!(c !== "submit" && c !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + n._wrapperState.initialValue, a || i === n.value || (n.value = i), n.defaultValue = i;
    }
    a = n.name, a !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, a !== "" && (n.name = a);
  }
  function $t(n, i, a) {
    (i !== "number" || qe(n.ownerDocument) !== n) && (a == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + a && (n.defaultValue = "" + a));
  }
  var ft = Array.isArray;
  function Ue(n, i, a, c) {
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
  function Po(n, i) {
    var a = i.value;
    if (a == null) {
      if (a = i.children, i = i.defaultValue, a != null) {
        if (i != null) throw Error(r(92));
        if (ft(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        i = a;
      }
      i == null && (i = ""), a = i;
    }
    n._wrapperState = { initialValue: he(a) };
  }
  function Mt(n, i) {
    var a = he(i.value), c = he(i.defaultValue);
    a != null && (a = "" + a, a !== n.value && (n.value = a), i.defaultValue == null && n.defaultValue !== a && (n.defaultValue = a)), c != null && (n.defaultValue = "" + c);
  }
  function _t(n) {
    var i = n.textContent;
    i === n._wrapperState.initialValue && i !== "" && i !== null && (n.value = i);
  }
  function At(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ht(n, i) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? At(i) : n === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var It, Sa = (function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, a, c, h) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(i, a, c, h);
      });
    } : n;
  })(function(n, i) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = i;
    else {
      for (It = It || document.createElement("div"), It.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = It.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; i.firstChild; ) n.appendChild(i.firstChild);
    }
  });
  function Ro(n, i) {
    if (i) {
      var a = n.firstChild;
      if (a && a === n.lastChild && a.nodeType === 3) {
        a.nodeValue = i;
        return;
      }
    }
    n.textContent = i;
  }
  var To = {
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
  }, _b = ["Webkit", "ms", "Moz", "O"];
  Object.keys(To).forEach(function(n) {
    _b.forEach(function(i) {
      i = i + n.charAt(0).toUpperCase() + n.substring(1), To[i] = To[n];
    });
  });
  function Rh(n, i, a) {
    return i == null || typeof i == "boolean" || i === "" ? "" : a || typeof i != "number" || i === 0 || To.hasOwnProperty(n) && To[n] ? ("" + i).trim() : i + "px";
  }
  function Th(n, i) {
    n = n.style;
    for (var a in i) if (i.hasOwnProperty(a)) {
      var c = a.indexOf("--") === 0, h = Rh(a, i[a], c);
      a === "float" && (a = "cssFloat"), c ? n.setProperty(a, h) : n[a] = h;
    }
  }
  var xb = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function fc(n, i) {
    if (i) {
      if (xb[n] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(r(137, n));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(r(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(r(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(r(62));
    }
  }
  function pc(n, i) {
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
  var hc = null;
  function gc(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var mc = null, Ni = null, Oi = null;
  function $h(n) {
    if (n = Jo(n)) {
      if (typeof mc != "function") throw Error(r(280));
      var i = n.stateNode;
      i && (i = Ua(i), mc(n.stateNode, n.type, i));
    }
  }
  function Mh(n) {
    Ni ? Oi ? Oi.push(n) : Oi = [n] : Ni = n;
  }
  function Ah() {
    if (Ni) {
      var n = Ni, i = Oi;
      if (Oi = Ni = null, $h(n), i) for (n = 0; n < i.length; n++) $h(i[n]);
    }
  }
  function Ih(n, i) {
    return n(i);
  }
  function Nh() {
  }
  var yc = !1;
  function Oh(n, i, a) {
    if (yc) return n(i, a);
    yc = !0;
    try {
      return Ih(n, i, a);
    } finally {
      yc = !1, (Ni !== null || Oi !== null) && (Nh(), Ah());
    }
  }
  function $o(n, i) {
    var a = n.stateNode;
    if (a === null) return null;
    var c = Ua(a);
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
  var vc = !1;
  if (d) try {
    var Mo = {};
    Object.defineProperty(Mo, "passive", { get: function() {
      vc = !0;
    } }), window.addEventListener("test", Mo, Mo), window.removeEventListener("test", Mo, Mo);
  } catch {
    vc = !1;
  }
  function kb(n, i, a, c, h, y, T, W, q) {
    var Z = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(a, Z);
    } catch (oe) {
      this.onError(oe);
    }
  }
  var Ao = !1, ba = null, _a = !1, wc = null, Cb = { onError: function(n) {
    Ao = !0, ba = n;
  } };
  function Eb(n, i, a, c, h, y, T, W, q) {
    Ao = !1, ba = null, kb.apply(Cb, arguments);
  }
  function Pb(n, i, a, c, h, y, T, W, q) {
    if (Eb.apply(this, arguments), Ao) {
      if (Ao) {
        var Z = ba;
        Ao = !1, ba = null;
      } else throw Error(r(198));
      _a || (_a = !0, wc = Z);
    }
  }
  function ti(n) {
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
  function Lh(n) {
    if (n.tag === 13) {
      var i = n.memoizedState;
      if (i === null && (n = n.alternate, n !== null && (i = n.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function Dh(n) {
    if (ti(n) !== n) throw Error(r(188));
  }
  function Rb(n) {
    var i = n.alternate;
    if (!i) {
      if (i = ti(n), i === null) throw Error(r(188));
      return i !== n ? null : n;
    }
    for (var a = n, c = i; ; ) {
      var h = a.return;
      if (h === null) break;
      var y = h.alternate;
      if (y === null) {
        if (c = h.return, c !== null) {
          a = c;
          continue;
        }
        break;
      }
      if (h.child === y.child) {
        for (y = h.child; y; ) {
          if (y === a) return Dh(h), n;
          if (y === c) return Dh(h), i;
          y = y.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== c.return) a = h, c = y;
      else {
        for (var T = !1, W = h.child; W; ) {
          if (W === a) {
            T = !0, a = h, c = y;
            break;
          }
          if (W === c) {
            T = !0, c = h, a = y;
            break;
          }
          W = W.sibling;
        }
        if (!T) {
          for (W = y.child; W; ) {
            if (W === a) {
              T = !0, a = y, c = h;
              break;
            }
            if (W === c) {
              T = !0, c = y, a = h;
              break;
            }
            W = W.sibling;
          }
          if (!T) throw Error(r(189));
        }
      }
      if (a.alternate !== c) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? n : i;
  }
  function Fh(n) {
    return n = Rb(n), n !== null ? jh(n) : null;
  }
  function jh(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var i = jh(n);
      if (i !== null) return i;
      n = n.sibling;
    }
    return null;
  }
  var zh = t.unstable_scheduleCallback, Bh = t.unstable_cancelCallback, Tb = t.unstable_shouldYield, $b = t.unstable_requestPaint, rt = t.unstable_now, Mb = t.unstable_getCurrentPriorityLevel, Sc = t.unstable_ImmediatePriority, Wh = t.unstable_UserBlockingPriority, xa = t.unstable_NormalPriority, Ab = t.unstable_LowPriority, Uh = t.unstable_IdlePriority, ka = null, Fn = null;
  function Ib(n) {
    if (Fn && typeof Fn.onCommitFiberRoot == "function") try {
      Fn.onCommitFiberRoot(ka, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var kn = Math.clz32 ? Math.clz32 : Lb, Nb = Math.log, Ob = Math.LN2;
  function Lb(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Nb(n) / Ob | 0) | 0;
  }
  var Ca = 64, Ea = 4194304;
  function Io(n) {
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
  function Pa(n, i) {
    var a = n.pendingLanes;
    if (a === 0) return 0;
    var c = 0, h = n.suspendedLanes, y = n.pingedLanes, T = a & 268435455;
    if (T !== 0) {
      var W = T & ~h;
      W !== 0 ? c = Io(W) : (y &= T, y !== 0 && (c = Io(y)));
    } else T = a & ~h, T !== 0 ? c = Io(T) : y !== 0 && (c = Io(y));
    if (c === 0) return 0;
    if (i !== 0 && i !== c && (i & h) === 0 && (h = c & -c, y = i & -i, h >= y || h === 16 && (y & 4194240) !== 0)) return i;
    if ((c & 4) !== 0 && (c |= a & 16), i = n.entangledLanes, i !== 0) for (n = n.entanglements, i &= c; 0 < i; ) a = 31 - kn(i), h = 1 << a, c |= n[a], i &= ~h;
    return c;
  }
  function Db(n, i) {
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
  function Fb(n, i) {
    for (var a = n.suspendedLanes, c = n.pingedLanes, h = n.expirationTimes, y = n.pendingLanes; 0 < y; ) {
      var T = 31 - kn(y), W = 1 << T, q = h[T];
      q === -1 ? ((W & a) === 0 || (W & c) !== 0) && (h[T] = Db(W, i)) : q <= i && (n.expiredLanes |= W), y &= ~W;
    }
  }
  function bc(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Vh() {
    var n = Ca;
    return Ca <<= 1, (Ca & 4194240) === 0 && (Ca = 64), n;
  }
  function _c(n) {
    for (var i = [], a = 0; 31 > a; a++) i.push(n);
    return i;
  }
  function No(n, i, a) {
    n.pendingLanes |= i, i !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, i = 31 - kn(i), n[i] = a;
  }
  function jb(n, i) {
    var a = n.pendingLanes & ~i;
    n.pendingLanes = i, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= i, n.mutableReadLanes &= i, n.entangledLanes &= i, i = n.entanglements;
    var c = n.eventTimes;
    for (n = n.expirationTimes; 0 < a; ) {
      var h = 31 - kn(a), y = 1 << h;
      i[h] = 0, c[h] = -1, n[h] = -1, a &= ~y;
    }
  }
  function xc(n, i) {
    var a = n.entangledLanes |= i;
    for (n = n.entanglements; a; ) {
      var c = 31 - kn(a), h = 1 << c;
      h & i | n[c] & i && (n[c] |= i), a &= ~h;
    }
  }
  var Le = 0;
  function Hh(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var qh, kc, Kh, Qh, Gh, Cc = !1, Ra = [], Cr = null, Er = null, Pr = null, Oo = /* @__PURE__ */ new Map(), Lo = /* @__PURE__ */ new Map(), Rr = [], zb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Yh(n, i) {
    switch (n) {
      case "focusin":
      case "focusout":
        Cr = null;
        break;
      case "dragenter":
      case "dragleave":
        Er = null;
        break;
      case "mouseover":
      case "mouseout":
        Pr = null;
        break;
      case "pointerover":
      case "pointerout":
        Oo.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Lo.delete(i.pointerId);
    }
  }
  function Do(n, i, a, c, h, y) {
    return n === null || n.nativeEvent !== y ? (n = { blockedOn: i, domEventName: a, eventSystemFlags: c, nativeEvent: y, targetContainers: [h] }, i !== null && (i = Jo(i), i !== null && kc(i)), n) : (n.eventSystemFlags |= c, i = n.targetContainers, h !== null && i.indexOf(h) === -1 && i.push(h), n);
  }
  function Bb(n, i, a, c, h) {
    switch (i) {
      case "focusin":
        return Cr = Do(Cr, n, i, a, c, h), !0;
      case "dragenter":
        return Er = Do(Er, n, i, a, c, h), !0;
      case "mouseover":
        return Pr = Do(Pr, n, i, a, c, h), !0;
      case "pointerover":
        var y = h.pointerId;
        return Oo.set(y, Do(Oo.get(y) || null, n, i, a, c, h)), !0;
      case "gotpointercapture":
        return y = h.pointerId, Lo.set(y, Do(Lo.get(y) || null, n, i, a, c, h)), !0;
    }
    return !1;
  }
  function Jh(n) {
    var i = ni(n.target);
    if (i !== null) {
      var a = ti(i);
      if (a !== null) {
        if (i = a.tag, i === 13) {
          if (i = Lh(a), i !== null) {
            n.blockedOn = i, Gh(n.priority, function() {
              Kh(a);
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
  function Ta(n) {
    if (n.blockedOn !== null) return !1;
    for (var i = n.targetContainers; 0 < i.length; ) {
      var a = Pc(n.domEventName, n.eventSystemFlags, i[0], n.nativeEvent);
      if (a === null) {
        a = n.nativeEvent;
        var c = new a.constructor(a.type, a);
        hc = c, a.target.dispatchEvent(c), hc = null;
      } else return i = Jo(a), i !== null && kc(i), n.blockedOn = a, !1;
      i.shift();
    }
    return !0;
  }
  function Xh(n, i, a) {
    Ta(n) && a.delete(i);
  }
  function Wb() {
    Cc = !1, Cr !== null && Ta(Cr) && (Cr = null), Er !== null && Ta(Er) && (Er = null), Pr !== null && Ta(Pr) && (Pr = null), Oo.forEach(Xh), Lo.forEach(Xh);
  }
  function Fo(n, i) {
    n.blockedOn === i && (n.blockedOn = null, Cc || (Cc = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Wb)));
  }
  function jo(n) {
    function i(h) {
      return Fo(h, n);
    }
    if (0 < Ra.length) {
      Fo(Ra[0], n);
      for (var a = 1; a < Ra.length; a++) {
        var c = Ra[a];
        c.blockedOn === n && (c.blockedOn = null);
      }
    }
    for (Cr !== null && Fo(Cr, n), Er !== null && Fo(Er, n), Pr !== null && Fo(Pr, n), Oo.forEach(i), Lo.forEach(i), a = 0; a < Rr.length; a++) c = Rr[a], c.blockedOn === n && (c.blockedOn = null);
    for (; 0 < Rr.length && (a = Rr[0], a.blockedOn === null); ) Jh(a), a.blockedOn === null && Rr.shift();
  }
  var Li = R.ReactCurrentBatchConfig, $a = !0;
  function Ub(n, i, a, c) {
    var h = Le, y = Li.transition;
    Li.transition = null;
    try {
      Le = 1, Ec(n, i, a, c);
    } finally {
      Le = h, Li.transition = y;
    }
  }
  function Vb(n, i, a, c) {
    var h = Le, y = Li.transition;
    Li.transition = null;
    try {
      Le = 4, Ec(n, i, a, c);
    } finally {
      Le = h, Li.transition = y;
    }
  }
  function Ec(n, i, a, c) {
    if ($a) {
      var h = Pc(n, i, a, c);
      if (h === null) Vc(n, i, c, Ma, a), Yh(n, c);
      else if (Bb(h, n, i, a, c)) c.stopPropagation();
      else if (Yh(n, c), i & 4 && -1 < zb.indexOf(n)) {
        for (; h !== null; ) {
          var y = Jo(h);
          if (y !== null && qh(y), y = Pc(n, i, a, c), y === null && Vc(n, i, c, Ma, a), y === h) break;
          h = y;
        }
        h !== null && c.stopPropagation();
      } else Vc(n, i, c, null, a);
    }
  }
  var Ma = null;
  function Pc(n, i, a, c) {
    if (Ma = null, n = gc(c), n = ni(n), n !== null) if (i = ti(n), i === null) n = null;
    else if (a = i.tag, a === 13) {
      if (n = Lh(i), n !== null) return n;
      n = null;
    } else if (a === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      n = null;
    } else i !== n && (n = null);
    return Ma = n, null;
  }
  function Zh(n) {
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
        switch (Mb()) {
          case Sc:
            return 1;
          case Wh:
            return 4;
          case xa:
          case Ab:
            return 16;
          case Uh:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Tr = null, Rc = null, Aa = null;
  function eg() {
    if (Aa) return Aa;
    var n, i = Rc, a = i.length, c, h = "value" in Tr ? Tr.value : Tr.textContent, y = h.length;
    for (n = 0; n < a && i[n] === h[n]; n++) ;
    var T = a - n;
    for (c = 1; c <= T && i[a - c] === h[y - c]; c++) ;
    return Aa = h.slice(n, 1 < c ? 1 - c : void 0);
  }
  function Ia(n) {
    var i = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && i === 13 && (n = 13)) : n = i, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Na() {
    return !0;
  }
  function tg() {
    return !1;
  }
  function Zt(n) {
    function i(a, c, h, y, T) {
      this._reactName = a, this._targetInst = h, this.type = c, this.nativeEvent = y, this.target = T, this.currentTarget = null;
      for (var W in n) n.hasOwnProperty(W) && (a = n[W], this[W] = a ? a(y) : y[W]);
      return this.isDefaultPrevented = (y.defaultPrevented != null ? y.defaultPrevented : y.returnValue === !1) ? Na : tg, this.isPropagationStopped = tg, this;
    }
    return K(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Na);
    }, stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Na);
    }, persist: function() {
    }, isPersistent: Na }), i;
  }
  var Di = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Tc = Zt(Di), zo = K({}, Di, { view: 0, detail: 0 }), Hb = Zt(zo), $c, Mc, Bo, Oa = K({}, zo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ic, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Bo && (Bo && n.type === "mousemove" ? ($c = n.screenX - Bo.screenX, Mc = n.screenY - Bo.screenY) : Mc = $c = 0, Bo = n), $c);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Mc;
  } }), ng = Zt(Oa), qb = K({}, Oa, { dataTransfer: 0 }), Kb = Zt(qb), Qb = K({}, zo, { relatedTarget: 0 }), Ac = Zt(Qb), Gb = K({}, Di, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yb = Zt(Gb), Jb = K({}, Di, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Xb = Zt(Jb), Zb = K({}, Di, { data: 0 }), rg = Zt(Zb), e_ = {
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
  }, t_ = {
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
  }, n_ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function r_(n) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(n) : (n = n_[n]) ? !!i[n] : !1;
  }
  function Ic() {
    return r_;
  }
  var i_ = K({}, zo, { key: function(n) {
    if (n.key) {
      var i = e_[n.key] || n.key;
      if (i !== "Unidentified") return i;
    }
    return n.type === "keypress" ? (n = Ia(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? t_[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ic, charCode: function(n) {
    return n.type === "keypress" ? Ia(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Ia(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), o_ = Zt(i_), s_ = K({}, Oa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ig = Zt(s_), a_ = K({}, zo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ic }), l_ = Zt(a_), u_ = K({}, Di, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), c_ = Zt(u_), d_ = K({}, Oa, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), f_ = Zt(d_), p_ = [9, 13, 27, 32], Nc = d && "CompositionEvent" in window, Wo = null;
  d && "documentMode" in document && (Wo = document.documentMode);
  var h_ = d && "TextEvent" in window && !Wo, og = d && (!Nc || Wo && 8 < Wo && 11 >= Wo), sg = " ", ag = !1;
  function lg(n, i) {
    switch (n) {
      case "keyup":
        return p_.indexOf(i.keyCode) !== -1;
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
  function ug(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Fi = !1;
  function g_(n, i) {
    switch (n) {
      case "compositionend":
        return ug(i);
      case "keypress":
        return i.which !== 32 ? null : (ag = !0, sg);
      case "textInput":
        return n = i.data, n === sg && ag ? null : n;
      default:
        return null;
    }
  }
  function m_(n, i) {
    if (Fi) return n === "compositionend" || !Nc && lg(n, i) ? (n = eg(), Aa = Rc = Tr = null, Fi = !1, n) : null;
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
        return og && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var y_ = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function cg(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i === "input" ? !!y_[n.type] : i === "textarea";
  }
  function dg(n, i, a, c) {
    Mh(c), i = za(i, "onChange"), 0 < i.length && (a = new Tc("onChange", "change", null, a, c), n.push({ event: a, listeners: i }));
  }
  var Uo = null, Vo = null;
  function v_(n) {
    Tg(n, 0);
  }
  function La(n) {
    var i = Ui(n);
    if (_e(i)) return n;
  }
  function w_(n, i) {
    if (n === "change") return i;
  }
  var fg = !1;
  if (d) {
    var Oc;
    if (d) {
      var Lc = "oninput" in document;
      if (!Lc) {
        var pg = document.createElement("div");
        pg.setAttribute("oninput", "return;"), Lc = typeof pg.oninput == "function";
      }
      Oc = Lc;
    } else Oc = !1;
    fg = Oc && (!document.documentMode || 9 < document.documentMode);
  }
  function hg() {
    Uo && (Uo.detachEvent("onpropertychange", gg), Vo = Uo = null);
  }
  function gg(n) {
    if (n.propertyName === "value" && La(Vo)) {
      var i = [];
      dg(i, Vo, n, gc(n)), Oh(v_, i);
    }
  }
  function S_(n, i, a) {
    n === "focusin" ? (hg(), Uo = i, Vo = a, Uo.attachEvent("onpropertychange", gg)) : n === "focusout" && hg();
  }
  function b_(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return La(Vo);
  }
  function __(n, i) {
    if (n === "click") return La(i);
  }
  function x_(n, i) {
    if (n === "input" || n === "change") return La(i);
  }
  function k_(n, i) {
    return n === i && (n !== 0 || 1 / n === 1 / i) || n !== n && i !== i;
  }
  var Cn = typeof Object.is == "function" ? Object.is : k_;
  function Ho(n, i) {
    if (Cn(n, i)) return !0;
    if (typeof n != "object" || n === null || typeof i != "object" || i === null) return !1;
    var a = Object.keys(n), c = Object.keys(i);
    if (a.length !== c.length) return !1;
    for (c = 0; c < a.length; c++) {
      var h = a[c];
      if (!p.call(i, h) || !Cn(n[h], i[h])) return !1;
    }
    return !0;
  }
  function mg(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function yg(n, i) {
    var a = mg(n);
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
      a = mg(a);
    }
  }
  function vg(n, i) {
    return n && i ? n === i ? !0 : n && n.nodeType === 3 ? !1 : i && i.nodeType === 3 ? vg(n, i.parentNode) : "contains" in n ? n.contains(i) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function wg() {
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
  function Dc(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i && (i === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || i === "textarea" || n.contentEditable === "true");
  }
  function C_(n) {
    var i = wg(), a = n.focusedElem, c = n.selectionRange;
    if (i !== a && a && a.ownerDocument && vg(a.ownerDocument.documentElement, a)) {
      if (c !== null && Dc(a)) {
        if (i = c.start, n = c.end, n === void 0 && (n = i), "selectionStart" in a) a.selectionStart = i, a.selectionEnd = Math.min(n, a.value.length);
        else if (n = (i = a.ownerDocument || document) && i.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var h = a.textContent.length, y = Math.min(c.start, h);
          c = c.end === void 0 ? y : Math.min(c.end, h), !n.extend && y > c && (h = c, c = y, y = h), h = yg(a, y);
          var T = yg(
            a,
            c
          );
          h && T && (n.rangeCount !== 1 || n.anchorNode !== h.node || n.anchorOffset !== h.offset || n.focusNode !== T.node || n.focusOffset !== T.offset) && (i = i.createRange(), i.setStart(h.node, h.offset), n.removeAllRanges(), y > c ? (n.addRange(i), n.extend(T.node, T.offset)) : (i.setEnd(T.node, T.offset), n.addRange(i)));
        }
      }
      for (i = [], n = a; n = n.parentNode; ) n.nodeType === 1 && i.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof a.focus == "function" && a.focus(), a = 0; a < i.length; a++) n = i[a], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var E_ = d && "documentMode" in document && 11 >= document.documentMode, ji = null, Fc = null, qo = null, jc = !1;
  function Sg(n, i, a) {
    var c = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    jc || ji == null || ji !== qe(c) || (c = ji, "selectionStart" in c && Dc(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }), qo && Ho(qo, c) || (qo = c, c = za(Fc, "onSelect"), 0 < c.length && (i = new Tc("onSelect", "select", null, i, a), n.push({ event: i, listeners: c }), i.target = ji)));
  }
  function Da(n, i) {
    var a = {};
    return a[n.toLowerCase()] = i.toLowerCase(), a["Webkit" + n] = "webkit" + i, a["Moz" + n] = "moz" + i, a;
  }
  var zi = { animationend: Da("Animation", "AnimationEnd"), animationiteration: Da("Animation", "AnimationIteration"), animationstart: Da("Animation", "AnimationStart"), transitionend: Da("Transition", "TransitionEnd") }, zc = {}, bg = {};
  d && (bg = document.createElement("div").style, "AnimationEvent" in window || (delete zi.animationend.animation, delete zi.animationiteration.animation, delete zi.animationstart.animation), "TransitionEvent" in window || delete zi.transitionend.transition);
  function Fa(n) {
    if (zc[n]) return zc[n];
    if (!zi[n]) return n;
    var i = zi[n], a;
    for (a in i) if (i.hasOwnProperty(a) && a in bg) return zc[n] = i[a];
    return n;
  }
  var _g = Fa("animationend"), xg = Fa("animationiteration"), kg = Fa("animationstart"), Cg = Fa("transitionend"), Eg = /* @__PURE__ */ new Map(), Pg = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function $r(n, i) {
    Eg.set(n, i), l(i, [n]);
  }
  for (var Bc = 0; Bc < Pg.length; Bc++) {
    var Wc = Pg[Bc], P_ = Wc.toLowerCase(), R_ = Wc[0].toUpperCase() + Wc.slice(1);
    $r(P_, "on" + R_);
  }
  $r(_g, "onAnimationEnd"), $r(xg, "onAnimationIteration"), $r(kg, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(Cg, "onTransitionEnd"), u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ko = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), T_ = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ko));
  function Rg(n, i, a) {
    var c = n.type || "unknown-event";
    n.currentTarget = a, Pb(c, i, void 0, n), n.currentTarget = null;
  }
  function Tg(n, i) {
    i = (i & 4) !== 0;
    for (var a = 0; a < n.length; a++) {
      var c = n[a], h = c.event;
      c = c.listeners;
      e: {
        var y = void 0;
        if (i) for (var T = c.length - 1; 0 <= T; T--) {
          var W = c[T], q = W.instance, Z = W.currentTarget;
          if (W = W.listener, q !== y && h.isPropagationStopped()) break e;
          Rg(h, W, Z), y = q;
        }
        else for (T = 0; T < c.length; T++) {
          if (W = c[T], q = W.instance, Z = W.currentTarget, W = W.listener, q !== y && h.isPropagationStopped()) break e;
          Rg(h, W, Z), y = q;
        }
      }
    }
    if (_a) throw n = wc, _a = !1, wc = null, n;
  }
  function Ve(n, i) {
    var a = i[Yc];
    a === void 0 && (a = i[Yc] = /* @__PURE__ */ new Set());
    var c = n + "__bubble";
    a.has(c) || ($g(i, n, 2, !1), a.add(c));
  }
  function Uc(n, i, a) {
    var c = 0;
    i && (c |= 4), $g(a, n, c, i);
  }
  var ja = "_reactListening" + Math.random().toString(36).slice(2);
  function Qo(n) {
    if (!n[ja]) {
      n[ja] = !0, o.forEach(function(a) {
        a !== "selectionchange" && (T_.has(a) || Uc(a, !1, n), Uc(a, !0, n));
      });
      var i = n.nodeType === 9 ? n : n.ownerDocument;
      i === null || i[ja] || (i[ja] = !0, Uc("selectionchange", !1, i));
    }
  }
  function $g(n, i, a, c) {
    switch (Zh(i)) {
      case 1:
        var h = Ub;
        break;
      case 4:
        h = Vb;
        break;
      default:
        h = Ec;
    }
    a = h.bind(null, i, a, n), h = void 0, !vc || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (h = !0), c ? h !== void 0 ? n.addEventListener(i, a, { capture: !0, passive: h }) : n.addEventListener(i, a, !0) : h !== void 0 ? n.addEventListener(i, a, { passive: h }) : n.addEventListener(i, a, !1);
  }
  function Vc(n, i, a, c, h) {
    var y = c;
    if ((i & 1) === 0 && (i & 2) === 0 && c !== null) e: for (; ; ) {
      if (c === null) return;
      var T = c.tag;
      if (T === 3 || T === 4) {
        var W = c.stateNode.containerInfo;
        if (W === h || W.nodeType === 8 && W.parentNode === h) break;
        if (T === 4) for (T = c.return; T !== null; ) {
          var q = T.tag;
          if ((q === 3 || q === 4) && (q = T.stateNode.containerInfo, q === h || q.nodeType === 8 && q.parentNode === h)) return;
          T = T.return;
        }
        for (; W !== null; ) {
          if (T = ni(W), T === null) return;
          if (q = T.tag, q === 5 || q === 6) {
            c = y = T;
            continue e;
          }
          W = W.parentNode;
        }
      }
      c = c.return;
    }
    Oh(function() {
      var Z = y, oe = gc(a), ae = [];
      e: {
        var ie = Eg.get(n);
        if (ie !== void 0) {
          var pe = Tc, me = n;
          switch (n) {
            case "keypress":
              if (Ia(a) === 0) break e;
            case "keydown":
            case "keyup":
              pe = o_;
              break;
            case "focusin":
              me = "focus", pe = Ac;
              break;
            case "focusout":
              me = "blur", pe = Ac;
              break;
            case "beforeblur":
            case "afterblur":
              pe = Ac;
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
              pe = ng;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pe = Kb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pe = l_;
              break;
            case _g:
            case xg:
            case kg:
              pe = Yb;
              break;
            case Cg:
              pe = c_;
              break;
            case "scroll":
              pe = Hb;
              break;
            case "wheel":
              pe = f_;
              break;
            case "copy":
            case "cut":
            case "paste":
              pe = Xb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pe = ig;
          }
          var ye = (i & 4) !== 0, it = !ye && n === "scroll", J = ye ? ie !== null ? ie + "Capture" : null : ie;
          ye = [];
          for (var Q = Z, X; Q !== null; ) {
            X = Q;
            var ce = X.stateNode;
            if (X.tag === 5 && ce !== null && (X = ce, J !== null && (ce = $o(Q, J), ce != null && ye.push(Go(Q, ce, X)))), it) break;
            Q = Q.return;
          }
          0 < ye.length && (ie = new pe(ie, me, null, a, oe), ae.push({ event: ie, listeners: ye }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (ie = n === "mouseover" || n === "pointerover", pe = n === "mouseout" || n === "pointerout", ie && a !== hc && (me = a.relatedTarget || a.fromElement) && (ni(me) || me[rr])) break e;
          if ((pe || ie) && (ie = oe.window === oe ? oe : (ie = oe.ownerDocument) ? ie.defaultView || ie.parentWindow : window, pe ? (me = a.relatedTarget || a.toElement, pe = Z, me = me ? ni(me) : null, me !== null && (it = ti(me), me !== it || me.tag !== 5 && me.tag !== 6) && (me = null)) : (pe = null, me = Z), pe !== me)) {
            if (ye = ng, ce = "onMouseLeave", J = "onMouseEnter", Q = "mouse", (n === "pointerout" || n === "pointerover") && (ye = ig, ce = "onPointerLeave", J = "onPointerEnter", Q = "pointer"), it = pe == null ? ie : Ui(pe), X = me == null ? ie : Ui(me), ie = new ye(ce, Q + "leave", pe, a, oe), ie.target = it, ie.relatedTarget = X, ce = null, ni(oe) === Z && (ye = new ye(J, Q + "enter", me, a, oe), ye.target = X, ye.relatedTarget = it, ce = ye), it = ce, pe && me) t: {
              for (ye = pe, J = me, Q = 0, X = ye; X; X = Bi(X)) Q++;
              for (X = 0, ce = J; ce; ce = Bi(ce)) X++;
              for (; 0 < Q - X; ) ye = Bi(ye), Q--;
              for (; 0 < X - Q; ) J = Bi(J), X--;
              for (; Q--; ) {
                if (ye === J || J !== null && ye === J.alternate) break t;
                ye = Bi(ye), J = Bi(J);
              }
              ye = null;
            }
            else ye = null;
            pe !== null && Mg(ae, ie, pe, ye, !1), me !== null && it !== null && Mg(ae, it, me, ye, !0);
          }
        }
        e: {
          if (ie = Z ? Ui(Z) : window, pe = ie.nodeName && ie.nodeName.toLowerCase(), pe === "select" || pe === "input" && ie.type === "file") var ve = w_;
          else if (cg(ie)) if (fg) ve = x_;
          else {
            ve = b_;
            var Se = S_;
          }
          else (pe = ie.nodeName) && pe.toLowerCase() === "input" && (ie.type === "checkbox" || ie.type === "radio") && (ve = __);
          if (ve && (ve = ve(n, Z))) {
            dg(ae, ve, a, oe);
            break e;
          }
          Se && Se(n, ie, Z), n === "focusout" && (Se = ie._wrapperState) && Se.controlled && ie.type === "number" && $t(ie, "number", ie.value);
        }
        switch (Se = Z ? Ui(Z) : window, n) {
          case "focusin":
            (cg(Se) || Se.contentEditable === "true") && (ji = Se, Fc = Z, qo = null);
            break;
          case "focusout":
            qo = Fc = ji = null;
            break;
          case "mousedown":
            jc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            jc = !1, Sg(ae, a, oe);
            break;
          case "selectionchange":
            if (E_) break;
          case "keydown":
          case "keyup":
            Sg(ae, a, oe);
        }
        var be;
        if (Nc) e: {
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
        else Fi ? lg(n, a) && (ke = "onCompositionEnd") : n === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
        ke && (og && a.locale !== "ko" && (Fi || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && Fi && (be = eg()) : (Tr = oe, Rc = "value" in Tr ? Tr.value : Tr.textContent, Fi = !0)), Se = za(Z, ke), 0 < Se.length && (ke = new rg(ke, n, null, a, oe), ae.push({ event: ke, listeners: Se }), be ? ke.data = be : (be = ug(a), be !== null && (ke.data = be)))), (be = h_ ? g_(n, a) : m_(n, a)) && (Z = za(Z, "onBeforeInput"), 0 < Z.length && (oe = new rg("onBeforeInput", "beforeinput", null, a, oe), ae.push({ event: oe, listeners: Z }), oe.data = be));
      }
      Tg(ae, i);
    });
  }
  function Go(n, i, a) {
    return { instance: n, listener: i, currentTarget: a };
  }
  function za(n, i) {
    for (var a = i + "Capture", c = []; n !== null; ) {
      var h = n, y = h.stateNode;
      h.tag === 5 && y !== null && (h = y, y = $o(n, a), y != null && c.unshift(Go(n, y, h)), y = $o(n, i), y != null && c.push(Go(n, y, h))), n = n.return;
    }
    return c;
  }
  function Bi(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Mg(n, i, a, c, h) {
    for (var y = i._reactName, T = []; a !== null && a !== c; ) {
      var W = a, q = W.alternate, Z = W.stateNode;
      if (q !== null && q === c) break;
      W.tag === 5 && Z !== null && (W = Z, h ? (q = $o(a, y), q != null && T.unshift(Go(a, q, W))) : h || (q = $o(a, y), q != null && T.push(Go(a, q, W)))), a = a.return;
    }
    T.length !== 0 && n.push({ event: i, listeners: T });
  }
  var $_ = /\r\n?/g, M_ = /\u0000|\uFFFD/g;
  function Ag(n) {
    return (typeof n == "string" ? n : "" + n).replace($_, `
`).replace(M_, "");
  }
  function Ba(n, i, a) {
    if (i = Ag(i), Ag(n) !== i && a) throw Error(r(425));
  }
  function Wa() {
  }
  var Hc = null, qc = null;
  function Kc(n, i) {
    return n === "textarea" || n === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Qc = typeof setTimeout == "function" ? setTimeout : void 0, A_ = typeof clearTimeout == "function" ? clearTimeout : void 0, Ig = typeof Promise == "function" ? Promise : void 0, I_ = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ig < "u" ? function(n) {
    return Ig.resolve(null).then(n).catch(N_);
  } : Qc;
  function N_(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Gc(n, i) {
    var a = i, c = 0;
    do {
      var h = a.nextSibling;
      if (n.removeChild(a), h && h.nodeType === 8) if (a = h.data, a === "/$") {
        if (c === 0) {
          n.removeChild(h), jo(i);
          return;
        }
        c--;
      } else a !== "$" && a !== "$?" && a !== "$!" || c++;
      a = h;
    } while (a);
    jo(i);
  }
  function Mr(n) {
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
  function Ng(n) {
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
  var Wi = Math.random().toString(36).slice(2), jn = "__reactFiber$" + Wi, Yo = "__reactProps$" + Wi, rr = "__reactContainer$" + Wi, Yc = "__reactEvents$" + Wi, O_ = "__reactListeners$" + Wi, L_ = "__reactHandles$" + Wi;
  function ni(n) {
    var i = n[jn];
    if (i) return i;
    for (var a = n.parentNode; a; ) {
      if (i = a[rr] || a[jn]) {
        if (a = i.alternate, i.child !== null || a !== null && a.child !== null) for (n = Ng(n); n !== null; ) {
          if (a = n[jn]) return a;
          n = Ng(n);
        }
        return i;
      }
      n = a, a = n.parentNode;
    }
    return null;
  }
  function Jo(n) {
    return n = n[jn] || n[rr], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Ui(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(r(33));
  }
  function Ua(n) {
    return n[Yo] || null;
  }
  var Jc = [], Vi = -1;
  function Ar(n) {
    return { current: n };
  }
  function He(n) {
    0 > Vi || (n.current = Jc[Vi], Jc[Vi] = null, Vi--);
  }
  function We(n, i) {
    Vi++, Jc[Vi] = n.current, n.current = i;
  }
  var Ir = {}, Nt = Ar(Ir), qt = Ar(!1), ri = Ir;
  function Hi(n, i) {
    var a = n.type.contextTypes;
    if (!a) return Ir;
    var c = n.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === i) return c.__reactInternalMemoizedMaskedChildContext;
    var h = {}, y;
    for (y in a) h[y] = i[y];
    return c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = i, n.__reactInternalMemoizedMaskedChildContext = h), h;
  }
  function Kt(n) {
    return n = n.childContextTypes, n != null;
  }
  function Va() {
    He(qt), He(Nt);
  }
  function Og(n, i, a) {
    if (Nt.current !== Ir) throw Error(r(168));
    We(Nt, i), We(qt, a);
  }
  function Lg(n, i, a) {
    var c = n.stateNode;
    if (i = i.childContextTypes, typeof c.getChildContext != "function") return a;
    c = c.getChildContext();
    for (var h in c) if (!(h in i)) throw Error(r(108, de(n) || "Unknown", h));
    return K({}, a, c);
  }
  function Ha(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ir, ri = Nt.current, We(Nt, n), We(qt, qt.current), !0;
  }
  function Dg(n, i, a) {
    var c = n.stateNode;
    if (!c) throw Error(r(169));
    a ? (n = Lg(n, i, ri), c.__reactInternalMemoizedMergedChildContext = n, He(qt), He(Nt), We(Nt, n)) : He(qt), We(qt, a);
  }
  var ir = null, qa = !1, Xc = !1;
  function Fg(n) {
    ir === null ? ir = [n] : ir.push(n);
  }
  function D_(n) {
    qa = !0, Fg(n);
  }
  function Nr() {
    if (!Xc && ir !== null) {
      Xc = !0;
      var n = 0, i = Le;
      try {
        var a = ir;
        for (Le = 1; n < a.length; n++) {
          var c = a[n];
          do
            c = c(!0);
          while (c !== null);
        }
        ir = null, qa = !1;
      } catch (h) {
        throw ir !== null && (ir = ir.slice(n + 1)), zh(Sc, Nr), h;
      } finally {
        Le = i, Xc = !1;
      }
    }
    return null;
  }
  var qi = [], Ki = 0, Ka = null, Qa = 0, dn = [], fn = 0, ii = null, or = 1, sr = "";
  function oi(n, i) {
    qi[Ki++] = Qa, qi[Ki++] = Ka, Ka = n, Qa = i;
  }
  function jg(n, i, a) {
    dn[fn++] = or, dn[fn++] = sr, dn[fn++] = ii, ii = n;
    var c = or;
    n = sr;
    var h = 32 - kn(c) - 1;
    c &= ~(1 << h), a += 1;
    var y = 32 - kn(i) + h;
    if (30 < y) {
      var T = h - h % 5;
      y = (c & (1 << T) - 1).toString(32), c >>= T, h -= T, or = 1 << 32 - kn(i) + h | a << h | c, sr = y + n;
    } else or = 1 << y | a << h | c, sr = n;
  }
  function Zc(n) {
    n.return !== null && (oi(n, 1), jg(n, 1, 0));
  }
  function ed(n) {
    for (; n === Ka; ) Ka = qi[--Ki], qi[Ki] = null, Qa = qi[--Ki], qi[Ki] = null;
    for (; n === ii; ) ii = dn[--fn], dn[fn] = null, sr = dn[--fn], dn[fn] = null, or = dn[--fn], dn[fn] = null;
  }
  var en = null, tn = null, Ke = !1, En = null;
  function zg(n, i) {
    var a = mn(5, null, null, 0);
    a.elementType = "DELETED", a.stateNode = i, a.return = n, i = n.deletions, i === null ? (n.deletions = [a], n.flags |= 16) : i.push(a);
  }
  function Bg(n, i) {
    switch (n.tag) {
      case 5:
        var a = n.type;
        return i = i.nodeType !== 1 || a.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (n.stateNode = i, en = n, tn = Mr(i.firstChild), !0) : !1;
      case 6:
        return i = n.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (n.stateNode = i, en = n, tn = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (a = ii !== null ? { id: or, overflow: sr } : null, n.memoizedState = { dehydrated: i, treeContext: a, retryLane: 1073741824 }, a = mn(18, null, null, 0), a.stateNode = i, a.return = n, n.child = a, en = n, tn = null, !0) : !1;
      default:
        return !1;
    }
  }
  function td(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function nd(n) {
    if (Ke) {
      var i = tn;
      if (i) {
        var a = i;
        if (!Bg(n, i)) {
          if (td(n)) throw Error(r(418));
          i = Mr(a.nextSibling);
          var c = en;
          i && Bg(n, i) ? zg(c, a) : (n.flags = n.flags & -4097 | 2, Ke = !1, en = n);
        }
      } else {
        if (td(n)) throw Error(r(418));
        n.flags = n.flags & -4097 | 2, Ke = !1, en = n;
      }
    }
  }
  function Wg(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    en = n;
  }
  function Ga(n) {
    if (n !== en) return !1;
    if (!Ke) return Wg(n), Ke = !0, !1;
    var i;
    if ((i = n.tag !== 3) && !(i = n.tag !== 5) && (i = n.type, i = i !== "head" && i !== "body" && !Kc(n.type, n.memoizedProps)), i && (i = tn)) {
      if (td(n)) throw Ug(), Error(r(418));
      for (; i; ) zg(n, i), i = Mr(i.nextSibling);
    }
    if (Wg(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
      e: {
        for (n = n.nextSibling, i = 0; n; ) {
          if (n.nodeType === 8) {
            var a = n.data;
            if (a === "/$") {
              if (i === 0) {
                tn = Mr(n.nextSibling);
                break e;
              }
              i--;
            } else a !== "$" && a !== "$!" && a !== "$?" || i++;
          }
          n = n.nextSibling;
        }
        tn = null;
      }
    } else tn = en ? Mr(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Ug() {
    for (var n = tn; n; ) n = Mr(n.nextSibling);
  }
  function Qi() {
    tn = en = null, Ke = !1;
  }
  function rd(n) {
    En === null ? En = [n] : En.push(n);
  }
  var F_ = R.ReactCurrentBatchConfig;
  function Xo(n, i, a) {
    if (n = a.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (a._owner) {
        if (a = a._owner, a) {
          if (a.tag !== 1) throw Error(r(309));
          var c = a.stateNode;
        }
        if (!c) throw Error(r(147, n));
        var h = c, y = "" + n;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === y ? i.ref : (i = function(T) {
          var W = h.refs;
          T === null ? delete W[y] : W[y] = T;
        }, i._stringRef = y, i);
      }
      if (typeof n != "string") throw Error(r(284));
      if (!a._owner) throw Error(r(290, n));
    }
    return n;
  }
  function Ya(n, i) {
    throw n = Object.prototype.toString.call(i), Error(r(31, n === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : n));
  }
  function Vg(n) {
    var i = n._init;
    return i(n._payload);
  }
  function Hg(n) {
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
      return J = Wr(J, Q), J.index = 0, J.sibling = null, J;
    }
    function y(J, Q, X) {
      return J.index = X, n ? (X = J.alternate, X !== null ? (X = X.index, X < Q ? (J.flags |= 2, Q) : X) : (J.flags |= 2, Q)) : (J.flags |= 1048576, Q);
    }
    function T(J) {
      return n && J.alternate === null && (J.flags |= 2), J;
    }
    function W(J, Q, X, ce) {
      return Q === null || Q.tag !== 6 ? (Q = Qd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function q(J, Q, X, ce) {
      var ve = X.type;
      return ve === A ? oe(J, Q, X.props.children, ce, X.key) : Q !== null && (Q.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === V && Vg(ve) === Q.type) ? (ce = h(Q, X.props), ce.ref = Xo(J, Q, X), ce.return = J, ce) : (ce = Sl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Xo(J, Q, X), ce.return = J, ce);
    }
    function Z(J, Q, X, ce) {
      return Q === null || Q.tag !== 4 || Q.stateNode.containerInfo !== X.containerInfo || Q.stateNode.implementation !== X.implementation ? (Q = Gd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X.children || []), Q.return = J, Q);
    }
    function oe(J, Q, X, ce, ve) {
      return Q === null || Q.tag !== 7 ? (Q = pi(X, J.mode, ce, ve), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function ae(J, Q, X) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return Q = Qd("" + Q, J.mode, X), Q.return = J, Q;
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case E:
            return X = Sl(Q.type, Q.key, Q.props, null, J.mode, X), X.ref = Xo(J, null, Q), X.return = J, X;
          case M:
            return Q = Gd(Q, J.mode, X), Q.return = J, Q;
          case V:
            var ce = Q._init;
            return ae(J, ce(Q._payload), X);
        }
        if (ft(Q) || H(Q)) return Q = pi(Q, J.mode, X, null), Q.return = J, Q;
        Ya(J, Q);
      }
      return null;
    }
    function ie(J, Q, X, ce) {
      var ve = Q !== null ? Q.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return ve !== null ? null : W(J, Q, "" + X, ce);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case E:
            return X.key === ve ? q(J, Q, X, ce) : null;
          case M:
            return X.key === ve ? Z(J, Q, X, ce) : null;
          case V:
            return ve = X._init, ie(
              J,
              Q,
              ve(X._payload),
              ce
            );
        }
        if (ft(X) || H(X)) return ve !== null ? null : oe(J, Q, X, ce, null);
        Ya(J, X);
      }
      return null;
    }
    function pe(J, Q, X, ce, ve) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number") return J = J.get(X) || null, W(Q, J, "" + ce, ve);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case E:
            return J = J.get(ce.key === null ? X : ce.key) || null, q(Q, J, ce, ve);
          case M:
            return J = J.get(ce.key === null ? X : ce.key) || null, Z(Q, J, ce, ve);
          case V:
            var Se = ce._init;
            return pe(J, Q, X, Se(ce._payload), ve);
        }
        if (ft(ce) || H(ce)) return J = J.get(X) || null, oe(Q, J, ce, ve, null);
        Ya(Q, ce);
      }
      return null;
    }
    function me(J, Q, X, ce) {
      for (var ve = null, Se = null, be = Q, ke = Q = 0, wt = null; be !== null && ke < X.length; ke++) {
        be.index > ke ? (wt = be, be = null) : wt = be.sibling;
        var $e = ie(J, be, X[ke], ce);
        if ($e === null) {
          be === null && (be = wt);
          break;
        }
        n && be && $e.alternate === null && i(J, be), Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e, be = wt;
      }
      if (ke === X.length) return a(J, be), Ke && oi(J, ke), ve;
      if (be === null) {
        for (; ke < X.length; ke++) be = ae(J, X[ke], ce), be !== null && (Q = y(be, Q, ke), Se === null ? ve = be : Se.sibling = be, Se = be);
        return Ke && oi(J, ke), ve;
      }
      for (be = c(J, be); ke < X.length; ke++) wt = pe(be, J, ke, X[ke], ce), wt !== null && (n && wt.alternate !== null && be.delete(wt.key === null ? ke : wt.key), Q = y(wt, Q, ke), Se === null ? ve = wt : Se.sibling = wt, Se = wt);
      return n && be.forEach(function(Ur) {
        return i(J, Ur);
      }), Ke && oi(J, ke), ve;
    }
    function ye(J, Q, X, ce) {
      var ve = H(X);
      if (typeof ve != "function") throw Error(r(150));
      if (X = ve.call(X), X == null) throw Error(r(151));
      for (var Se = ve = null, be = Q, ke = Q = 0, wt = null, $e = X.next(); be !== null && !$e.done; ke++, $e = X.next()) {
        be.index > ke ? (wt = be, be = null) : wt = be.sibling;
        var Ur = ie(J, be, $e.value, ce);
        if (Ur === null) {
          be === null && (be = wt);
          break;
        }
        n && be && Ur.alternate === null && i(J, be), Q = y(Ur, Q, ke), Se === null ? ve = Ur : Se.sibling = Ur, Se = Ur, be = wt;
      }
      if ($e.done) return a(
        J,
        be
      ), Ke && oi(J, ke), ve;
      if (be === null) {
        for (; !$e.done; ke++, $e = X.next()) $e = ae(J, $e.value, ce), $e !== null && (Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
        return Ke && oi(J, ke), ve;
      }
      for (be = c(J, be); !$e.done; ke++, $e = X.next()) $e = pe(be, J, ke, $e.value, ce), $e !== null && (n && $e.alternate !== null && be.delete($e.key === null ? ke : $e.key), Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
      return n && be.forEach(function(yx) {
        return i(J, yx);
      }), Ke && oi(J, ke), ve;
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
                  } else if (Se.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === V && Vg(ve) === Se.type) {
                    a(J, Se.sibling), Q = h(Se, X.props), Q.ref = Xo(J, Se, X), Q.return = J, J = Q;
                    break e;
                  }
                  a(J, Se);
                  break;
                } else i(J, Se);
                Se = Se.sibling;
              }
              X.type === A ? (Q = pi(X.props.children, J.mode, ce, X.key), Q.return = J, J = Q) : (ce = Sl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Xo(J, Q, X), ce.return = J, J = ce);
            }
            return T(J);
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
              Q = Gd(X, J.mode, ce), Q.return = J, J = Q;
            }
            return T(J);
          case V:
            return Se = X._init, it(J, Q, Se(X._payload), ce);
        }
        if (ft(X)) return me(J, Q, X, ce);
        if (H(X)) return ye(J, Q, X, ce);
        Ya(J, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, Q !== null && Q.tag === 6 ? (a(J, Q.sibling), Q = h(Q, X), Q.return = J, J = Q) : (a(J, Q), Q = Qd(X, J.mode, ce), Q.return = J, J = Q), T(J)) : a(J, Q);
    }
    return it;
  }
  var Gi = Hg(!0), qg = Hg(!1), Ja = Ar(null), Xa = null, Yi = null, id = null;
  function od() {
    id = Yi = Xa = null;
  }
  function sd(n) {
    var i = Ja.current;
    He(Ja), n._currentValue = i;
  }
  function ad(n, i, a) {
    for (; n !== null; ) {
      var c = n.alternate;
      if ((n.childLanes & i) !== i ? (n.childLanes |= i, c !== null && (c.childLanes |= i)) : c !== null && (c.childLanes & i) !== i && (c.childLanes |= i), n === a) break;
      n = n.return;
    }
  }
  function Ji(n, i) {
    Xa = n, id = Yi = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & i) !== 0 && (Qt = !0), n.firstContext = null);
  }
  function pn(n) {
    var i = n._currentValue;
    if (id !== n) if (n = { context: n, memoizedValue: i, next: null }, Yi === null) {
      if (Xa === null) throw Error(r(308));
      Yi = n, Xa.dependencies = { lanes: 0, firstContext: n };
    } else Yi = Yi.next = n;
    return i;
  }
  var si = null;
  function ld(n) {
    si === null ? si = [n] : si.push(n);
  }
  function Kg(n, i, a, c) {
    var h = i.interleaved;
    return h === null ? (a.next = a, ld(i)) : (a.next = h.next, h.next = a), i.interleaved = a, ar(n, c);
  }
  function ar(n, i) {
    n.lanes |= i;
    var a = n.alternate;
    for (a !== null && (a.lanes |= i), a = n, n = n.return; n !== null; ) n.childLanes |= i, a = n.alternate, a !== null && (a.childLanes |= i), a = n, n = n.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var Or = !1;
  function ud(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Qg(n, i) {
    n = n.updateQueue, i.updateQueue === n && (i.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function lr(n, i) {
    return { eventTime: n, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function Lr(n, i, a) {
    var c = n.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (Te & 2) !== 0) {
      var h = c.pending;
      return h === null ? i.next = i : (i.next = h.next, h.next = i), c.pending = i, ar(n, a);
    }
    return h = c.interleaved, h === null ? (i.next = i, ld(c)) : (i.next = h.next, h.next = i), c.interleaved = i, ar(n, a);
  }
  function Za(n, i, a) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (a & 4194240) !== 0)) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, xc(n, a);
    }
  }
  function Gg(n, i) {
    var a = n.updateQueue, c = n.alternate;
    if (c !== null && (c = c.updateQueue, a === c)) {
      var h = null, y = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var T = { eventTime: a.eventTime, lane: a.lane, tag: a.tag, payload: a.payload, callback: a.callback, next: null };
          y === null ? h = y = T : y = y.next = T, a = a.next;
        } while (a !== null);
        y === null ? h = y = i : y = y.next = i;
      } else h = y = i;
      a = { baseState: c.baseState, firstBaseUpdate: h, lastBaseUpdate: y, shared: c.shared, effects: c.effects }, n.updateQueue = a;
      return;
    }
    n = a.lastBaseUpdate, n === null ? a.firstBaseUpdate = i : n.next = i, a.lastBaseUpdate = i;
  }
  function el(n, i, a, c) {
    var h = n.updateQueue;
    Or = !1;
    var y = h.firstBaseUpdate, T = h.lastBaseUpdate, W = h.shared.pending;
    if (W !== null) {
      h.shared.pending = null;
      var q = W, Z = q.next;
      q.next = null, T === null ? y = Z : T.next = Z, T = q;
      var oe = n.alternate;
      oe !== null && (oe = oe.updateQueue, W = oe.lastBaseUpdate, W !== T && (W === null ? oe.firstBaseUpdate = Z : W.next = Z, oe.lastBaseUpdate = q));
    }
    if (y !== null) {
      var ae = h.baseState;
      T = 0, oe = Z = q = null, W = y;
      do {
        var ie = W.lane, pe = W.eventTime;
        if ((c & ie) === ie) {
          oe !== null && (oe = oe.next = {
            eventTime: pe,
            lane: 0,
            tag: W.tag,
            payload: W.payload,
            callback: W.callback,
            next: null
          });
          e: {
            var me = n, ye = W;
            switch (ie = i, pe = a, ye.tag) {
              case 1:
                if (me = ye.payload, typeof me == "function") {
                  ae = me.call(pe, ae, ie);
                  break e;
                }
                ae = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = ye.payload, ie = typeof me == "function" ? me.call(pe, ae, ie) : me, ie == null) break e;
                ae = K({}, ae, ie);
                break e;
              case 2:
                Or = !0;
            }
          }
          W.callback !== null && W.lane !== 0 && (n.flags |= 64, ie = h.effects, ie === null ? h.effects = [W] : ie.push(W));
        } else pe = { eventTime: pe, lane: ie, tag: W.tag, payload: W.payload, callback: W.callback, next: null }, oe === null ? (Z = oe = pe, q = ae) : oe = oe.next = pe, T |= ie;
        if (W = W.next, W === null) {
          if (W = h.shared.pending, W === null) break;
          ie = W, W = ie.next, ie.next = null, h.lastBaseUpdate = ie, h.shared.pending = null;
        }
      } while (!0);
      if (oe === null && (q = ae), h.baseState = q, h.firstBaseUpdate = Z, h.lastBaseUpdate = oe, i = h.shared.interleaved, i !== null) {
        h = i;
        do
          T |= h.lane, h = h.next;
        while (h !== i);
      } else y === null && (h.shared.lanes = 0);
      ui |= T, n.lanes = T, n.memoizedState = ae;
    }
  }
  function Yg(n, i, a) {
    if (n = i.effects, i.effects = null, n !== null) for (i = 0; i < n.length; i++) {
      var c = n[i], h = c.callback;
      if (h !== null) {
        if (c.callback = null, c = a, typeof h != "function") throw Error(r(191, h));
        h.call(c);
      }
    }
  }
  var Zo = {}, zn = Ar(Zo), es = Ar(Zo), ts = Ar(Zo);
  function ai(n) {
    if (n === Zo) throw Error(r(174));
    return n;
  }
  function cd(n, i) {
    switch (We(ts, i), We(es, n), We(zn, Zo), n = i.nodeType, n) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Ht(null, "");
        break;
      default:
        n = n === 8 ? i.parentNode : i, i = n.namespaceURI || null, n = n.tagName, i = Ht(i, n);
    }
    He(zn), We(zn, i);
  }
  function Xi() {
    He(zn), He(es), He(ts);
  }
  function Jg(n) {
    ai(ts.current);
    var i = ai(zn.current), a = Ht(i, n.type);
    i !== a && (We(es, n), We(zn, a));
  }
  function dd(n) {
    es.current === n && (He(zn), He(es));
  }
  var Ge = Ar(0);
  function tl(n) {
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
  var fd = [];
  function pd() {
    for (var n = 0; n < fd.length; n++) fd[n]._workInProgressVersionPrimary = null;
    fd.length = 0;
  }
  var nl = R.ReactCurrentDispatcher, hd = R.ReactCurrentBatchConfig, li = 0, Ye = null, pt = null, yt = null, rl = !1, ns = !1, rs = 0, j_ = 0;
  function Ot() {
    throw Error(r(321));
  }
  function gd(n, i) {
    if (i === null) return !1;
    for (var a = 0; a < i.length && a < n.length; a++) if (!Cn(n[a], i[a])) return !1;
    return !0;
  }
  function md(n, i, a, c, h, y) {
    if (li = y, Ye = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, nl.current = n === null || n.memoizedState === null ? U_ : V_, n = a(c, h), ns) {
      y = 0;
      do {
        if (ns = !1, rs = 0, 25 <= y) throw Error(r(301));
        y += 1, yt = pt = null, i.updateQueue = null, nl.current = H_, n = a(c, h);
      } while (ns);
    }
    if (nl.current = sl, i = pt !== null && pt.next !== null, li = 0, yt = pt = Ye = null, rl = !1, i) throw Error(r(300));
    return n;
  }
  function yd() {
    var n = rs !== 0;
    return rs = 0, n;
  }
  function Bn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return yt === null ? Ye.memoizedState = yt = n : yt = yt.next = n, yt;
  }
  function hn() {
    if (pt === null) {
      var n = Ye.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = pt.next;
    var i = yt === null ? Ye.memoizedState : yt.next;
    if (i !== null) yt = i, pt = n;
    else {
      if (n === null) throw Error(r(310));
      pt = n, n = { memoizedState: pt.memoizedState, baseState: pt.baseState, baseQueue: pt.baseQueue, queue: pt.queue, next: null }, yt === null ? Ye.memoizedState = yt = n : yt = yt.next = n;
    }
    return yt;
  }
  function is(n, i) {
    return typeof i == "function" ? i(n) : i;
  }
  function vd(n) {
    var i = hn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = pt, h = c.baseQueue, y = a.pending;
    if (y !== null) {
      if (h !== null) {
        var T = h.next;
        h.next = y.next, y.next = T;
      }
      c.baseQueue = h = y, a.pending = null;
    }
    if (h !== null) {
      y = h.next, c = c.baseState;
      var W = T = null, q = null, Z = y;
      do {
        var oe = Z.lane;
        if ((li & oe) === oe) q !== null && (q = q.next = { lane: 0, action: Z.action, hasEagerState: Z.hasEagerState, eagerState: Z.eagerState, next: null }), c = Z.hasEagerState ? Z.eagerState : n(c, Z.action);
        else {
          var ae = {
            lane: oe,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          };
          q === null ? (W = q = ae, T = c) : q = q.next = ae, Ye.lanes |= oe, ui |= oe;
        }
        Z = Z.next;
      } while (Z !== null && Z !== y);
      q === null ? T = c : q.next = W, Cn(c, i.memoizedState) || (Qt = !0), i.memoizedState = c, i.baseState = T, i.baseQueue = q, a.lastRenderedState = c;
    }
    if (n = a.interleaved, n !== null) {
      h = n;
      do
        y = h.lane, Ye.lanes |= y, ui |= y, h = h.next;
      while (h !== n);
    } else h === null && (a.lanes = 0);
    return [i.memoizedState, a.dispatch];
  }
  function wd(n) {
    var i = hn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = a.dispatch, h = a.pending, y = i.memoizedState;
    if (h !== null) {
      a.pending = null;
      var T = h = h.next;
      do
        y = n(y, T.action), T = T.next;
      while (T !== h);
      Cn(y, i.memoizedState) || (Qt = !0), i.memoizedState = y, i.baseQueue === null && (i.baseState = y), a.lastRenderedState = y;
    }
    return [y, c];
  }
  function Xg() {
  }
  function Zg(n, i) {
    var a = Ye, c = hn(), h = i(), y = !Cn(c.memoizedState, h);
    if (y && (c.memoizedState = h, Qt = !0), c = c.queue, Sd(nm.bind(null, a, c, n), [n]), c.getSnapshot !== i || y || yt !== null && yt.memoizedState.tag & 1) {
      if (a.flags |= 2048, os(9, tm.bind(null, a, c, h, i), void 0, null), vt === null) throw Error(r(349));
      (li & 30) !== 0 || em(a, i, h);
    }
    return h;
  }
  function em(n, i, a) {
    n.flags |= 16384, n = { getSnapshot: i, value: a }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.stores = [n]) : (a = i.stores, a === null ? i.stores = [n] : a.push(n));
  }
  function tm(n, i, a, c) {
    i.value = a, i.getSnapshot = c, rm(i) && im(n);
  }
  function nm(n, i, a) {
    return a(function() {
      rm(i) && im(n);
    });
  }
  function rm(n) {
    var i = n.getSnapshot;
    n = n.value;
    try {
      var a = i();
      return !Cn(n, a);
    } catch {
      return !0;
    }
  }
  function im(n) {
    var i = ar(n, 1);
    i !== null && $n(i, n, 1, -1);
  }
  function om(n) {
    var i = Bn();
    return typeof n == "function" && (n = n()), i.memoizedState = i.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: is, lastRenderedState: n }, i.queue = n, n = n.dispatch = W_.bind(null, Ye, n), [i.memoizedState, n];
  }
  function os(n, i, a, c) {
    return n = { tag: n, create: i, destroy: a, deps: c, next: null }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.lastEffect = n.next = n) : (a = i.lastEffect, a === null ? i.lastEffect = n.next = n : (c = a.next, a.next = n, n.next = c, i.lastEffect = n)), n;
  }
  function sm() {
    return hn().memoizedState;
  }
  function il(n, i, a, c) {
    var h = Bn();
    Ye.flags |= n, h.memoizedState = os(1 | i, a, void 0, c === void 0 ? null : c);
  }
  function ol(n, i, a, c) {
    var h = hn();
    c = c === void 0 ? null : c;
    var y = void 0;
    if (pt !== null) {
      var T = pt.memoizedState;
      if (y = T.destroy, c !== null && gd(c, T.deps)) {
        h.memoizedState = os(i, a, y, c);
        return;
      }
    }
    Ye.flags |= n, h.memoizedState = os(1 | i, a, y, c);
  }
  function am(n, i) {
    return il(8390656, 8, n, i);
  }
  function Sd(n, i) {
    return ol(2048, 8, n, i);
  }
  function lm(n, i) {
    return ol(4, 2, n, i);
  }
  function um(n, i) {
    return ol(4, 4, n, i);
  }
  function cm(n, i) {
    if (typeof i == "function") return n = n(), i(n), function() {
      i(null);
    };
    if (i != null) return n = n(), i.current = n, function() {
      i.current = null;
    };
  }
  function dm(n, i, a) {
    return a = a != null ? a.concat([n]) : null, ol(4, 4, cm.bind(null, i, n), a);
  }
  function bd() {
  }
  function fm(n, i) {
    var a = hn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && gd(i, c[1]) ? c[0] : (a.memoizedState = [n, i], n);
  }
  function pm(n, i) {
    var a = hn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && gd(i, c[1]) ? c[0] : (n = n(), a.memoizedState = [n, i], n);
  }
  function hm(n, i, a) {
    return (li & 21) === 0 ? (n.baseState && (n.baseState = !1, Qt = !0), n.memoizedState = a) : (Cn(a, i) || (a = Vh(), Ye.lanes |= a, ui |= a, n.baseState = !0), i);
  }
  function z_(n, i) {
    var a = Le;
    Le = a !== 0 && 4 > a ? a : 4, n(!0);
    var c = hd.transition;
    hd.transition = {};
    try {
      n(!1), i();
    } finally {
      Le = a, hd.transition = c;
    }
  }
  function gm() {
    return hn().memoizedState;
  }
  function B_(n, i, a) {
    var c = zr(n);
    if (a = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null }, mm(n)) ym(i, a);
    else if (a = Kg(n, i, a, c), a !== null) {
      var h = Bt();
      $n(a, n, c, h), vm(a, i, c);
    }
  }
  function W_(n, i, a) {
    var c = zr(n), h = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null };
    if (mm(n)) ym(i, h);
    else {
      var y = n.alternate;
      if (n.lanes === 0 && (y === null || y.lanes === 0) && (y = i.lastRenderedReducer, y !== null)) try {
        var T = i.lastRenderedState, W = y(T, a);
        if (h.hasEagerState = !0, h.eagerState = W, Cn(W, T)) {
          var q = i.interleaved;
          q === null ? (h.next = h, ld(i)) : (h.next = q.next, q.next = h), i.interleaved = h;
          return;
        }
      } catch {
      }
      a = Kg(n, i, h, c), a !== null && (h = Bt(), $n(a, n, c, h), vm(a, i, c));
    }
  }
  function mm(n) {
    var i = n.alternate;
    return n === Ye || i !== null && i === Ye;
  }
  function ym(n, i) {
    ns = rl = !0;
    var a = n.pending;
    a === null ? i.next = i : (i.next = a.next, a.next = i), n.pending = i;
  }
  function vm(n, i, a) {
    if ((a & 4194240) !== 0) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, xc(n, a);
    }
  }
  var sl = { readContext: pn, useCallback: Ot, useContext: Ot, useEffect: Ot, useImperativeHandle: Ot, useInsertionEffect: Ot, useLayoutEffect: Ot, useMemo: Ot, useReducer: Ot, useRef: Ot, useState: Ot, useDebugValue: Ot, useDeferredValue: Ot, useTransition: Ot, useMutableSource: Ot, useSyncExternalStore: Ot, useId: Ot, unstable_isNewReconciler: !1 }, U_ = { readContext: pn, useCallback: function(n, i) {
    return Bn().memoizedState = [n, i === void 0 ? null : i], n;
  }, useContext: pn, useEffect: am, useImperativeHandle: function(n, i, a) {
    return a = a != null ? a.concat([n]) : null, il(
      4194308,
      4,
      cm.bind(null, i, n),
      a
    );
  }, useLayoutEffect: function(n, i) {
    return il(4194308, 4, n, i);
  }, useInsertionEffect: function(n, i) {
    return il(4, 2, n, i);
  }, useMemo: function(n, i) {
    var a = Bn();
    return i = i === void 0 ? null : i, n = n(), a.memoizedState = [n, i], n;
  }, useReducer: function(n, i, a) {
    var c = Bn();
    return i = a !== void 0 ? a(i) : i, c.memoizedState = c.baseState = i, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: i }, c.queue = n, n = n.dispatch = B_.bind(null, Ye, n), [c.memoizedState, n];
  }, useRef: function(n) {
    var i = Bn();
    return n = { current: n }, i.memoizedState = n;
  }, useState: om, useDebugValue: bd, useDeferredValue: function(n) {
    return Bn().memoizedState = n;
  }, useTransition: function() {
    var n = om(!1), i = n[0];
    return n = z_.bind(null, n[1]), Bn().memoizedState = n, [i, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, i, a) {
    var c = Ye, h = Bn();
    if (Ke) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else {
      if (a = i(), vt === null) throw Error(r(349));
      (li & 30) !== 0 || em(c, i, a);
    }
    h.memoizedState = a;
    var y = { value: a, getSnapshot: i };
    return h.queue = y, am(nm.bind(
      null,
      c,
      y,
      n
    ), [n]), c.flags |= 2048, os(9, tm.bind(null, c, y, a, i), void 0, null), a;
  }, useId: function() {
    var n = Bn(), i = vt.identifierPrefix;
    if (Ke) {
      var a = sr, c = or;
      a = (c & ~(1 << 32 - kn(c) - 1)).toString(32) + a, i = ":" + i + "R" + a, a = rs++, 0 < a && (i += "H" + a.toString(32)), i += ":";
    } else a = j_++, i = ":" + i + "r" + a.toString(32) + ":";
    return n.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, V_ = {
    readContext: pn,
    useCallback: fm,
    useContext: pn,
    useEffect: Sd,
    useImperativeHandle: dm,
    useInsertionEffect: lm,
    useLayoutEffect: um,
    useMemo: pm,
    useReducer: vd,
    useRef: sm,
    useState: function() {
      return vd(is);
    },
    useDebugValue: bd,
    useDeferredValue: function(n) {
      var i = hn();
      return hm(i, pt.memoizedState, n);
    },
    useTransition: function() {
      var n = vd(is)[0], i = hn().memoizedState;
      return [n, i];
    },
    useMutableSource: Xg,
    useSyncExternalStore: Zg,
    useId: gm,
    unstable_isNewReconciler: !1
  }, H_ = { readContext: pn, useCallback: fm, useContext: pn, useEffect: Sd, useImperativeHandle: dm, useInsertionEffect: lm, useLayoutEffect: um, useMemo: pm, useReducer: wd, useRef: sm, useState: function() {
    return wd(is);
  }, useDebugValue: bd, useDeferredValue: function(n) {
    var i = hn();
    return pt === null ? i.memoizedState = n : hm(i, pt.memoizedState, n);
  }, useTransition: function() {
    var n = wd(is)[0], i = hn().memoizedState;
    return [n, i];
  }, useMutableSource: Xg, useSyncExternalStore: Zg, useId: gm, unstable_isNewReconciler: !1 };
  function Pn(n, i) {
    if (n && n.defaultProps) {
      i = K({}, i), n = n.defaultProps;
      for (var a in n) i[a] === void 0 && (i[a] = n[a]);
      return i;
    }
    return i;
  }
  function _d(n, i, a, c) {
    i = n.memoizedState, a = a(c, i), a = a == null ? i : K({}, i, a), n.memoizedState = a, n.lanes === 0 && (n.updateQueue.baseState = a);
  }
  var al = { isMounted: function(n) {
    return (n = n._reactInternals) ? ti(n) === n : !1;
  }, enqueueSetState: function(n, i, a) {
    n = n._reactInternals;
    var c = Bt(), h = zr(n), y = lr(c, h);
    y.payload = i, a != null && (y.callback = a), i = Lr(n, y, h), i !== null && ($n(i, n, h, c), Za(i, n, h));
  }, enqueueReplaceState: function(n, i, a) {
    n = n._reactInternals;
    var c = Bt(), h = zr(n), y = lr(c, h);
    y.tag = 1, y.payload = i, a != null && (y.callback = a), i = Lr(n, y, h), i !== null && ($n(i, n, h, c), Za(i, n, h));
  }, enqueueForceUpdate: function(n, i) {
    n = n._reactInternals;
    var a = Bt(), c = zr(n), h = lr(a, c);
    h.tag = 2, i != null && (h.callback = i), i = Lr(n, h, c), i !== null && ($n(i, n, c, a), Za(i, n, c));
  } };
  function wm(n, i, a, c, h, y, T) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(c, y, T) : i.prototype && i.prototype.isPureReactComponent ? !Ho(a, c) || !Ho(h, y) : !0;
  }
  function Sm(n, i, a) {
    var c = !1, h = Ir, y = i.contextType;
    return typeof y == "object" && y !== null ? y = pn(y) : (h = Kt(i) ? ri : Nt.current, c = i.contextTypes, y = (c = c != null) ? Hi(n, h) : Ir), i = new i(a, y), n.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = al, n.stateNode = i, i._reactInternals = n, c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = h, n.__reactInternalMemoizedMaskedChildContext = y), i;
  }
  function bm(n, i, a, c) {
    n = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, c), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, c), i.state !== n && al.enqueueReplaceState(i, i.state, null);
  }
  function xd(n, i, a, c) {
    var h = n.stateNode;
    h.props = a, h.state = n.memoizedState, h.refs = {}, ud(n);
    var y = i.contextType;
    typeof y == "object" && y !== null ? h.context = pn(y) : (y = Kt(i) ? ri : Nt.current, h.context = Hi(n, y)), h.state = n.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (_d(n, i, y, a), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (i = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), i !== h.state && al.enqueueReplaceState(h, h.state, null), el(n, a, h, c), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Zi(n, i) {
    try {
      var a = "", c = i;
      do
        a += se(c), c = c.return;
      while (c);
      var h = a;
    } catch (y) {
      h = `
Error generating stack: ` + y.message + `
` + y.stack;
    }
    return { value: n, source: i, stack: h, digest: null };
  }
  function kd(n, i, a) {
    return { value: n, source: null, stack: a ?? null, digest: i ?? null };
  }
  function Cd(n, i) {
    try {
      console.error(i.value);
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  var q_ = typeof WeakMap == "function" ? WeakMap : Map;
  function _m(n, i, a) {
    a = lr(-1, a), a.tag = 3, a.payload = { element: null };
    var c = i.value;
    return a.callback = function() {
      hl || (hl = !0, zd = c), Cd(n, i);
    }, a;
  }
  function xm(n, i, a) {
    a = lr(-1, a), a.tag = 3;
    var c = n.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = i.value;
      a.payload = function() {
        return c(h);
      }, a.callback = function() {
        Cd(n, i);
      };
    }
    var y = n.stateNode;
    return y !== null && typeof y.componentDidCatch == "function" && (a.callback = function() {
      Cd(n, i), typeof c != "function" && (Fr === null ? Fr = /* @__PURE__ */ new Set([this]) : Fr.add(this));
      var T = i.stack;
      this.componentDidCatch(i.value, { componentStack: T !== null ? T : "" });
    }), a;
  }
  function km(n, i, a) {
    var c = n.pingCache;
    if (c === null) {
      c = n.pingCache = new q_();
      var h = /* @__PURE__ */ new Set();
      c.set(i, h);
    } else h = c.get(i), h === void 0 && (h = /* @__PURE__ */ new Set(), c.set(i, h));
    h.has(a) || (h.add(a), n = sx.bind(null, n, i, a), i.then(n, n));
  }
  function Cm(n) {
    do {
      var i;
      if ((i = n.tag === 13) && (i = n.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Em(n, i, a, c, h) {
    return (n.mode & 1) === 0 ? (n === i ? n.flags |= 65536 : (n.flags |= 128, a.flags |= 131072, a.flags &= -52805, a.tag === 1 && (a.alternate === null ? a.tag = 17 : (i = lr(-1, 1), i.tag = 2, Lr(a, i, 1))), a.lanes |= 1), n) : (n.flags |= 65536, n.lanes = h, n);
  }
  var K_ = R.ReactCurrentOwner, Qt = !1;
  function zt(n, i, a, c) {
    i.child = n === null ? qg(i, null, a, c) : Gi(i, n.child, a, c);
  }
  function Pm(n, i, a, c, h) {
    a = a.render;
    var y = i.ref;
    return Ji(i, h), c = md(n, i, a, c, y, h), a = yd(), n !== null && !Qt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, ur(n, i, h)) : (Ke && a && Zc(i), i.flags |= 1, zt(n, i, c, h), i.child);
  }
  function Rm(n, i, a, c, h) {
    if (n === null) {
      var y = a.type;
      return typeof y == "function" && !Kd(y) && y.defaultProps === void 0 && a.compare === null && a.defaultProps === void 0 ? (i.tag = 15, i.type = y, Tm(n, i, y, c, h)) : (n = Sl(a.type, null, c, i, i.mode, h), n.ref = i.ref, n.return = i, i.child = n);
    }
    if (y = n.child, (n.lanes & h) === 0) {
      var T = y.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Ho, a(T, c) && n.ref === i.ref) return ur(n, i, h);
    }
    return i.flags |= 1, n = Wr(y, c), n.ref = i.ref, n.return = i, i.child = n;
  }
  function Tm(n, i, a, c, h) {
    if (n !== null) {
      var y = n.memoizedProps;
      if (Ho(y, c) && n.ref === i.ref) if (Qt = !1, i.pendingProps = c = y, (n.lanes & h) !== 0) (n.flags & 131072) !== 0 && (Qt = !0);
      else return i.lanes = n.lanes, ur(n, i, h);
    }
    return Ed(n, i, a, c, h);
  }
  function $m(n, i, a) {
    var c = i.pendingProps, h = c.children, y = n !== null ? n.memoizedState : null;
    if (c.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, We(to, nn), nn |= a;
    else {
      if ((a & 1073741824) === 0) return n = y !== null ? y.baseLanes | a : a, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, i.updateQueue = null, We(to, nn), nn |= n, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, c = y !== null ? y.baseLanes : a, We(to, nn), nn |= c;
    }
    else y !== null ? (c = y.baseLanes | a, i.memoizedState = null) : c = a, We(to, nn), nn |= c;
    return zt(n, i, h, a), i.child;
  }
  function Mm(n, i) {
    var a = i.ref;
    (n === null && a !== null || n !== null && n.ref !== a) && (i.flags |= 512, i.flags |= 2097152);
  }
  function Ed(n, i, a, c, h) {
    var y = Kt(a) ? ri : Nt.current;
    return y = Hi(i, y), Ji(i, h), a = md(n, i, a, c, y, h), c = yd(), n !== null && !Qt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, ur(n, i, h)) : (Ke && c && Zc(i), i.flags |= 1, zt(n, i, a, h), i.child);
  }
  function Am(n, i, a, c, h) {
    if (Kt(a)) {
      var y = !0;
      Ha(i);
    } else y = !1;
    if (Ji(i, h), i.stateNode === null) ul(n, i), Sm(i, a, c), xd(i, a, c, h), c = !0;
    else if (n === null) {
      var T = i.stateNode, W = i.memoizedProps;
      T.props = W;
      var q = T.context, Z = a.contextType;
      typeof Z == "object" && Z !== null ? Z = pn(Z) : (Z = Kt(a) ? ri : Nt.current, Z = Hi(i, Z));
      var oe = a.getDerivedStateFromProps, ae = typeof oe == "function" || typeof T.getSnapshotBeforeUpdate == "function";
      ae || typeof T.UNSAFE_componentWillReceiveProps != "function" && typeof T.componentWillReceiveProps != "function" || (W !== c || q !== Z) && bm(i, T, c, Z), Or = !1;
      var ie = i.memoizedState;
      T.state = ie, el(i, c, T, h), q = i.memoizedState, W !== c || ie !== q || qt.current || Or ? (typeof oe == "function" && (_d(i, a, oe, c), q = i.memoizedState), (W = Or || wm(i, a, W, c, ie, q, Z)) ? (ae || typeof T.UNSAFE_componentWillMount != "function" && typeof T.componentWillMount != "function" || (typeof T.componentWillMount == "function" && T.componentWillMount(), typeof T.UNSAFE_componentWillMount == "function" && T.UNSAFE_componentWillMount()), typeof T.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof T.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = c, i.memoizedState = q), T.props = c, T.state = q, T.context = Z, c = W) : (typeof T.componentDidMount == "function" && (i.flags |= 4194308), c = !1);
    } else {
      T = i.stateNode, Qg(n, i), W = i.memoizedProps, Z = i.type === i.elementType ? W : Pn(i.type, W), T.props = Z, ae = i.pendingProps, ie = T.context, q = a.contextType, typeof q == "object" && q !== null ? q = pn(q) : (q = Kt(a) ? ri : Nt.current, q = Hi(i, q));
      var pe = a.getDerivedStateFromProps;
      (oe = typeof pe == "function" || typeof T.getSnapshotBeforeUpdate == "function") || typeof T.UNSAFE_componentWillReceiveProps != "function" && typeof T.componentWillReceiveProps != "function" || (W !== ae || ie !== q) && bm(i, T, c, q), Or = !1, ie = i.memoizedState, T.state = ie, el(i, c, T, h);
      var me = i.memoizedState;
      W !== ae || ie !== me || qt.current || Or ? (typeof pe == "function" && (_d(i, a, pe, c), me = i.memoizedState), (Z = Or || wm(i, a, Z, c, ie, me, q) || !1) ? (oe || typeof T.UNSAFE_componentWillUpdate != "function" && typeof T.componentWillUpdate != "function" || (typeof T.componentWillUpdate == "function" && T.componentWillUpdate(c, me, q), typeof T.UNSAFE_componentWillUpdate == "function" && T.UNSAFE_componentWillUpdate(c, me, q)), typeof T.componentDidUpdate == "function" && (i.flags |= 4), typeof T.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof T.componentDidUpdate != "function" || W === n.memoizedProps && ie === n.memoizedState || (i.flags |= 4), typeof T.getSnapshotBeforeUpdate != "function" || W === n.memoizedProps && ie === n.memoizedState || (i.flags |= 1024), i.memoizedProps = c, i.memoizedState = me), T.props = c, T.state = me, T.context = q, c = Z) : (typeof T.componentDidUpdate != "function" || W === n.memoizedProps && ie === n.memoizedState || (i.flags |= 4), typeof T.getSnapshotBeforeUpdate != "function" || W === n.memoizedProps && ie === n.memoizedState || (i.flags |= 1024), c = !1);
    }
    return Pd(n, i, a, c, y, h);
  }
  function Pd(n, i, a, c, h, y) {
    Mm(n, i);
    var T = (i.flags & 128) !== 0;
    if (!c && !T) return h && Dg(i, a, !1), ur(n, i, y);
    c = i.stateNode, K_.current = i;
    var W = T && typeof a.getDerivedStateFromError != "function" ? null : c.render();
    return i.flags |= 1, n !== null && T ? (i.child = Gi(i, n.child, null, y), i.child = Gi(i, null, W, y)) : zt(n, i, W, y), i.memoizedState = c.state, h && Dg(i, a, !0), i.child;
  }
  function Im(n) {
    var i = n.stateNode;
    i.pendingContext ? Og(n, i.pendingContext, i.pendingContext !== i.context) : i.context && Og(n, i.context, !1), cd(n, i.containerInfo);
  }
  function Nm(n, i, a, c, h) {
    return Qi(), rd(h), i.flags |= 256, zt(n, i, a, c), i.child;
  }
  var Rd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Td(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Om(n, i, a) {
    var c = i.pendingProps, h = Ge.current, y = !1, T = (i.flags & 128) !== 0, W;
    if ((W = T) || (W = n !== null && n.memoizedState === null ? !1 : (h & 2) !== 0), W ? (y = !0, i.flags &= -129) : (n === null || n.memoizedState !== null) && (h |= 1), We(Ge, h & 1), n === null)
      return nd(i), n = i.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : n.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (T = c.children, n = c.fallback, y ? (c = i.mode, y = i.child, T = { mode: "hidden", children: T }, (c & 1) === 0 && y !== null ? (y.childLanes = 0, y.pendingProps = T) : y = bl(T, c, 0, null), n = pi(n, c, a, null), y.return = i, n.return = i, y.sibling = n, i.child = y, i.child.memoizedState = Td(a), i.memoizedState = Rd, n) : $d(i, T));
    if (h = n.memoizedState, h !== null && (W = h.dehydrated, W !== null)) return Q_(n, i, T, c, W, h, a);
    if (y) {
      y = c.fallback, T = i.mode, h = n.child, W = h.sibling;
      var q = { mode: "hidden", children: c.children };
      return (T & 1) === 0 && i.child !== h ? (c = i.child, c.childLanes = 0, c.pendingProps = q, i.deletions = null) : (c = Wr(h, q), c.subtreeFlags = h.subtreeFlags & 14680064), W !== null ? y = Wr(W, y) : (y = pi(y, T, a, null), y.flags |= 2), y.return = i, c.return = i, c.sibling = y, i.child = c, c = y, y = i.child, T = n.child.memoizedState, T = T === null ? Td(a) : { baseLanes: T.baseLanes | a, cachePool: null, transitions: T.transitions }, y.memoizedState = T, y.childLanes = n.childLanes & ~a, i.memoizedState = Rd, c;
    }
    return y = n.child, n = y.sibling, c = Wr(y, { mode: "visible", children: c.children }), (i.mode & 1) === 0 && (c.lanes = a), c.return = i, c.sibling = null, n !== null && (a = i.deletions, a === null ? (i.deletions = [n], i.flags |= 16) : a.push(n)), i.child = c, i.memoizedState = null, c;
  }
  function $d(n, i) {
    return i = bl({ mode: "visible", children: i }, n.mode, 0, null), i.return = n, n.child = i;
  }
  function ll(n, i, a, c) {
    return c !== null && rd(c), Gi(i, n.child, null, a), n = $d(i, i.pendingProps.children), n.flags |= 2, i.memoizedState = null, n;
  }
  function Q_(n, i, a, c, h, y, T) {
    if (a)
      return i.flags & 256 ? (i.flags &= -257, c = kd(Error(r(422))), ll(n, i, T, c)) : i.memoizedState !== null ? (i.child = n.child, i.flags |= 128, null) : (y = c.fallback, h = i.mode, c = bl({ mode: "visible", children: c.children }, h, 0, null), y = pi(y, h, T, null), y.flags |= 2, c.return = i, y.return = i, c.sibling = y, i.child = c, (i.mode & 1) !== 0 && Gi(i, n.child, null, T), i.child.memoizedState = Td(T), i.memoizedState = Rd, y);
    if ((i.mode & 1) === 0) return ll(n, i, T, null);
    if (h.data === "$!") {
      if (c = h.nextSibling && h.nextSibling.dataset, c) var W = c.dgst;
      return c = W, y = Error(r(419)), c = kd(y, c, void 0), ll(n, i, T, c);
    }
    if (W = (T & n.childLanes) !== 0, Qt || W) {
      if (c = vt, c !== null) {
        switch (T & -T) {
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
        h = (h & (c.suspendedLanes | T)) !== 0 ? 0 : h, h !== 0 && h !== y.retryLane && (y.retryLane = h, ar(n, h), $n(c, n, h, -1));
      }
      return qd(), c = kd(Error(r(421))), ll(n, i, T, c);
    }
    return h.data === "$?" ? (i.flags |= 128, i.child = n.child, i = ax.bind(null, n), h._reactRetry = i, null) : (n = y.treeContext, tn = Mr(h.nextSibling), en = i, Ke = !0, En = null, n !== null && (dn[fn++] = or, dn[fn++] = sr, dn[fn++] = ii, or = n.id, sr = n.overflow, ii = i), i = $d(i, c.children), i.flags |= 4096, i);
  }
  function Lm(n, i, a) {
    n.lanes |= i;
    var c = n.alternate;
    c !== null && (c.lanes |= i), ad(n.return, i, a);
  }
  function Md(n, i, a, c, h) {
    var y = n.memoizedState;
    y === null ? n.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: c, tail: a, tailMode: h } : (y.isBackwards = i, y.rendering = null, y.renderingStartTime = 0, y.last = c, y.tail = a, y.tailMode = h);
  }
  function Dm(n, i, a) {
    var c = i.pendingProps, h = c.revealOrder, y = c.tail;
    if (zt(n, i, c.children, a), c = Ge.current, (c & 2) !== 0) c = c & 1 | 2, i.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = i.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Lm(n, a, i);
        else if (n.tag === 19) Lm(n, a, i);
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
    if (We(Ge, c), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (h) {
      case "forwards":
        for (a = i.child, h = null; a !== null; ) n = a.alternate, n !== null && tl(n) === null && (h = a), a = a.sibling;
        a = h, a === null ? (h = i.child, i.child = null) : (h = a.sibling, a.sibling = null), Md(i, !1, h, a, y);
        break;
      case "backwards":
        for (a = null, h = i.child, i.child = null; h !== null; ) {
          if (n = h.alternate, n !== null && tl(n) === null) {
            i.child = h;
            break;
          }
          n = h.sibling, h.sibling = a, a = h, h = n;
        }
        Md(i, !0, a, null, y);
        break;
      case "together":
        Md(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function ul(n, i) {
    (i.mode & 1) === 0 && n !== null && (n.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function ur(n, i, a) {
    if (n !== null && (i.dependencies = n.dependencies), ui |= i.lanes, (a & i.childLanes) === 0) return null;
    if (n !== null && i.child !== n.child) throw Error(r(153));
    if (i.child !== null) {
      for (n = i.child, a = Wr(n, n.pendingProps), i.child = a, a.return = i; n.sibling !== null; ) n = n.sibling, a = a.sibling = Wr(n, n.pendingProps), a.return = i;
      a.sibling = null;
    }
    return i.child;
  }
  function G_(n, i, a) {
    switch (i.tag) {
      case 3:
        Im(i), Qi();
        break;
      case 5:
        Jg(i);
        break;
      case 1:
        Kt(i.type) && Ha(i);
        break;
      case 4:
        cd(i, i.stateNode.containerInfo);
        break;
      case 10:
        var c = i.type._context, h = i.memoizedProps.value;
        We(Ja, c._currentValue), c._currentValue = h;
        break;
      case 13:
        if (c = i.memoizedState, c !== null)
          return c.dehydrated !== null ? (We(Ge, Ge.current & 1), i.flags |= 128, null) : (a & i.child.childLanes) !== 0 ? Om(n, i, a) : (We(Ge, Ge.current & 1), n = ur(n, i, a), n !== null ? n.sibling : null);
        We(Ge, Ge.current & 1);
        break;
      case 19:
        if (c = (a & i.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (c) return Dm(n, i, a);
          i.flags |= 128;
        }
        if (h = i.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), We(Ge, Ge.current), c) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, $m(n, i, a);
    }
    return ur(n, i, a);
  }
  var Fm, Ad, jm, zm;
  Fm = function(n, i) {
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
  }, Ad = function() {
  }, jm = function(n, i, a, c) {
    var h = n.memoizedProps;
    if (h !== c) {
      n = i.stateNode, ai(zn.current);
      var y = null;
      switch (a) {
        case "input":
          h = je(n, h), c = je(n, c), y = [];
          break;
        case "select":
          h = K({}, h, { value: void 0 }), c = K({}, c, { value: void 0 }), y = [];
          break;
        case "textarea":
          h = xe(n, h), c = xe(n, c), y = [];
          break;
        default:
          typeof h.onClick != "function" && typeof c.onClick == "function" && (n.onclick = Wa);
      }
      fc(a, c);
      var T;
      a = null;
      for (Z in h) if (!c.hasOwnProperty(Z) && h.hasOwnProperty(Z) && h[Z] != null) if (Z === "style") {
        var W = h[Z];
        for (T in W) W.hasOwnProperty(T) && (a || (a = {}), a[T] = "");
      } else Z !== "dangerouslySetInnerHTML" && Z !== "children" && Z !== "suppressContentEditableWarning" && Z !== "suppressHydrationWarning" && Z !== "autoFocus" && (s.hasOwnProperty(Z) ? y || (y = []) : (y = y || []).push(Z, null));
      for (Z in c) {
        var q = c[Z];
        if (W = h?.[Z], c.hasOwnProperty(Z) && q !== W && (q != null || W != null)) if (Z === "style") if (W) {
          for (T in W) !W.hasOwnProperty(T) || q && q.hasOwnProperty(T) || (a || (a = {}), a[T] = "");
          for (T in q) q.hasOwnProperty(T) && W[T] !== q[T] && (a || (a = {}), a[T] = q[T]);
        } else a || (y || (y = []), y.push(
          Z,
          a
        )), a = q;
        else Z === "dangerouslySetInnerHTML" ? (q = q ? q.__html : void 0, W = W ? W.__html : void 0, q != null && W !== q && (y = y || []).push(Z, q)) : Z === "children" ? typeof q != "string" && typeof q != "number" || (y = y || []).push(Z, "" + q) : Z !== "suppressContentEditableWarning" && Z !== "suppressHydrationWarning" && (s.hasOwnProperty(Z) ? (q != null && Z === "onScroll" && Ve("scroll", n), y || W === q || (y = [])) : (y = y || []).push(Z, q));
      }
      a && (y = y || []).push("style", a);
      var Z = y;
      (i.updateQueue = Z) && (i.flags |= 4);
    }
  }, zm = function(n, i, a, c) {
    a !== c && (i.flags |= 4);
  };
  function ss(n, i) {
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
  function Lt(n) {
    var i = n.alternate !== null && n.alternate.child === n.child, a = 0, c = 0;
    if (i) for (var h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags & 14680064, c |= h.flags & 14680064, h.return = n, h = h.sibling;
    else for (h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags, c |= h.flags, h.return = n, h = h.sibling;
    return n.subtreeFlags |= c, n.childLanes = a, i;
  }
  function Y_(n, i, a) {
    var c = i.pendingProps;
    switch (ed(i), i.tag) {
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
        return Lt(i), null;
      case 1:
        return Kt(i.type) && Va(), Lt(i), null;
      case 3:
        return c = i.stateNode, Xi(), He(qt), He(Nt), pd(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (Ga(i) ? i.flags |= 4 : n === null || n.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, En !== null && (Ud(En), En = null))), Ad(n, i), Lt(i), null;
      case 5:
        dd(i);
        var h = ai(ts.current);
        if (a = i.type, n !== null && i.stateNode != null) jm(n, i, a, c, h), n.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(r(166));
            return Lt(i), null;
          }
          if (n = ai(zn.current), Ga(i)) {
            c = i.stateNode, a = i.type;
            var y = i.memoizedProps;
            switch (c[jn] = i, c[Yo] = y, n = (i.mode & 1) !== 0, a) {
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
                for (h = 0; h < Ko.length; h++) Ve(Ko[h], c);
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
                at(c, y), Ve("invalid", c);
                break;
              case "select":
                c._wrapperState = { wasMultiple: !!y.multiple }, Ve("invalid", c);
                break;
              case "textarea":
                Po(c, y), Ve("invalid", c);
            }
            fc(a, y), h = null;
            for (var T in y) if (y.hasOwnProperty(T)) {
              var W = y[T];
              T === "children" ? typeof W == "string" ? c.textContent !== W && (y.suppressHydrationWarning !== !0 && Ba(c.textContent, W, n), h = ["children", W]) : typeof W == "number" && c.textContent !== "" + W && (y.suppressHydrationWarning !== !0 && Ba(
                c.textContent,
                W,
                n
              ), h = ["children", "" + W]) : s.hasOwnProperty(T) && W != null && T === "onScroll" && Ve("scroll", c);
            }
            switch (a) {
              case "input":
                we(c), De(c, y, !0);
                break;
              case "textarea":
                we(c), _t(c);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof y.onClick == "function" && (c.onclick = Wa);
            }
            c = h, i.updateQueue = c, c !== null && (i.flags |= 4);
          } else {
            T = h.nodeType === 9 ? h : h.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = At(a)), n === "http://www.w3.org/1999/xhtml" ? a === "script" ? (n = T.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof c.is == "string" ? n = T.createElement(a, { is: c.is }) : (n = T.createElement(a), a === "select" && (T = n, c.multiple ? T.multiple = !0 : c.size && (T.size = c.size))) : n = T.createElementNS(n, a), n[jn] = i, n[Yo] = c, Fm(n, i, !1, !1), i.stateNode = n;
            e: {
              switch (T = pc(a, c), a) {
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
                  for (h = 0; h < Ko.length; h++) Ve(Ko[h], n);
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
                  at(n, c), h = je(n, c), Ve("invalid", n);
                  break;
                case "option":
                  h = c;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!c.multiple }, h = K({}, c, { value: void 0 }), Ve("invalid", n);
                  break;
                case "textarea":
                  Po(n, c), h = xe(n, c), Ve("invalid", n);
                  break;
                default:
                  h = c;
              }
              fc(a, h), W = h;
              for (y in W) if (W.hasOwnProperty(y)) {
                var q = W[y];
                y === "style" ? Th(n, q) : y === "dangerouslySetInnerHTML" ? (q = q ? q.__html : void 0, q != null && Sa(n, q)) : y === "children" ? typeof q == "string" ? (a !== "textarea" || q !== "") && Ro(n, q) : typeof q == "number" && Ro(n, "" + q) : y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && y !== "autoFocus" && (s.hasOwnProperty(y) ? q != null && y === "onScroll" && Ve("scroll", n) : q != null && C(n, y, q, T));
              }
              switch (a) {
                case "input":
                  we(n), De(n, c, !1);
                  break;
                case "textarea":
                  we(n), _t(n);
                  break;
                case "option":
                  c.value != null && n.setAttribute("value", "" + he(c.value));
                  break;
                case "select":
                  n.multiple = !!c.multiple, y = c.value, y != null ? Ue(n, !!c.multiple, y, !1) : c.defaultValue != null && Ue(
                    n,
                    !!c.multiple,
                    c.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof h.onClick == "function" && (n.onclick = Wa);
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
        return Lt(i), null;
      case 6:
        if (n && i.stateNode != null) zm(n, i, n.memoizedProps, c);
        else {
          if (typeof c != "string" && i.stateNode === null) throw Error(r(166));
          if (a = ai(ts.current), ai(zn.current), Ga(i)) {
            if (c = i.stateNode, a = i.memoizedProps, c[jn] = i, (y = c.nodeValue !== a) && (n = en, n !== null)) switch (n.tag) {
              case 3:
                Ba(c.nodeValue, a, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Ba(c.nodeValue, a, (n.mode & 1) !== 0);
            }
            y && (i.flags |= 4);
          } else c = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(c), c[jn] = i, i.stateNode = c;
        }
        return Lt(i), null;
      case 13:
        if (He(Ge), c = i.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Ke && tn !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) Ug(), Qi(), i.flags |= 98560, y = !1;
          else if (y = Ga(i), c !== null && c.dehydrated !== null) {
            if (n === null) {
              if (!y) throw Error(r(318));
              if (y = i.memoizedState, y = y !== null ? y.dehydrated : null, !y) throw Error(r(317));
              y[jn] = i;
            } else Qi(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Lt(i), y = !1;
          } else En !== null && (Ud(En), En = null), y = !0;
          if (!y) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = a, i) : (c = c !== null, c !== (n !== null && n.memoizedState !== null) && c && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (n === null || (Ge.current & 1) !== 0 ? ht === 0 && (ht = 3) : qd())), i.updateQueue !== null && (i.flags |= 4), Lt(i), null);
      case 4:
        return Xi(), Ad(n, i), n === null && Qo(i.stateNode.containerInfo), Lt(i), null;
      case 10:
        return sd(i.type._context), Lt(i), null;
      case 17:
        return Kt(i.type) && Va(), Lt(i), null;
      case 19:
        if (He(Ge), y = i.memoizedState, y === null) return Lt(i), null;
        if (c = (i.flags & 128) !== 0, T = y.rendering, T === null) if (c) ss(y, !1);
        else {
          if (ht !== 0 || n !== null && (n.flags & 128) !== 0) for (n = i.child; n !== null; ) {
            if (T = tl(n), T !== null) {
              for (i.flags |= 128, ss(y, !1), c = T.updateQueue, c !== null && (i.updateQueue = c, i.flags |= 4), i.subtreeFlags = 0, c = a, a = i.child; a !== null; ) y = a, n = c, y.flags &= 14680066, T = y.alternate, T === null ? (y.childLanes = 0, y.lanes = n, y.child = null, y.subtreeFlags = 0, y.memoizedProps = null, y.memoizedState = null, y.updateQueue = null, y.dependencies = null, y.stateNode = null) : (y.childLanes = T.childLanes, y.lanes = T.lanes, y.child = T.child, y.subtreeFlags = 0, y.deletions = null, y.memoizedProps = T.memoizedProps, y.memoizedState = T.memoizedState, y.updateQueue = T.updateQueue, y.type = T.type, n = T.dependencies, y.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), a = a.sibling;
              return We(Ge, Ge.current & 1 | 2), i.child;
            }
            n = n.sibling;
          }
          y.tail !== null && rt() > no && (i.flags |= 128, c = !0, ss(y, !1), i.lanes = 4194304);
        }
        else {
          if (!c) if (n = tl(T), n !== null) {
            if (i.flags |= 128, c = !0, a = n.updateQueue, a !== null && (i.updateQueue = a, i.flags |= 4), ss(y, !0), y.tail === null && y.tailMode === "hidden" && !T.alternate && !Ke) return Lt(i), null;
          } else 2 * rt() - y.renderingStartTime > no && a !== 1073741824 && (i.flags |= 128, c = !0, ss(y, !1), i.lanes = 4194304);
          y.isBackwards ? (T.sibling = i.child, i.child = T) : (a = y.last, a !== null ? a.sibling = T : i.child = T, y.last = T);
        }
        return y.tail !== null ? (i = y.tail, y.rendering = i, y.tail = i.sibling, y.renderingStartTime = rt(), i.sibling = null, a = Ge.current, We(Ge, c ? a & 1 | 2 : a & 1), i) : (Lt(i), null);
      case 22:
      case 23:
        return Hd(), c = i.memoizedState !== null, n !== null && n.memoizedState !== null !== c && (i.flags |= 8192), c && (i.mode & 1) !== 0 ? (nn & 1073741824) !== 0 && (Lt(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Lt(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function J_(n, i) {
    switch (ed(i), i.tag) {
      case 1:
        return Kt(i.type) && Va(), n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 3:
        return Xi(), He(qt), He(Nt), pd(), n = i.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (i.flags = n & -65537 | 128, i) : null;
      case 5:
        return dd(i), null;
      case 13:
        if (He(Ge), n = i.memoizedState, n !== null && n.dehydrated !== null) {
          if (i.alternate === null) throw Error(r(340));
          Qi();
        }
        return n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 19:
        return He(Ge), null;
      case 4:
        return Xi(), null;
      case 10:
        return sd(i.type._context), null;
      case 22:
      case 23:
        return Hd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var cl = !1, Dt = !1, X_ = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function eo(n, i) {
    var a = n.ref;
    if (a !== null) if (typeof a == "function") try {
      a(null);
    } catch (c) {
      et(n, i, c);
    }
    else a.current = null;
  }
  function Id(n, i, a) {
    try {
      a();
    } catch (c) {
      et(n, i, c);
    }
  }
  var Bm = !1;
  function Z_(n, i) {
    if (Hc = $a, n = wg(), Dc(n)) {
      if ("selectionStart" in n) var a = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        a = (a = n.ownerDocument) && a.defaultView || window;
        var c = a.getSelection && a.getSelection();
        if (c && c.rangeCount !== 0) {
          a = c.anchorNode;
          var h = c.anchorOffset, y = c.focusNode;
          c = c.focusOffset;
          try {
            a.nodeType, y.nodeType;
          } catch {
            a = null;
            break e;
          }
          var T = 0, W = -1, q = -1, Z = 0, oe = 0, ae = n, ie = null;
          t: for (; ; ) {
            for (var pe; ae !== a || h !== 0 && ae.nodeType !== 3 || (W = T + h), ae !== y || c !== 0 && ae.nodeType !== 3 || (q = T + c), ae.nodeType === 3 && (T += ae.nodeValue.length), (pe = ae.firstChild) !== null; )
              ie = ae, ae = pe;
            for (; ; ) {
              if (ae === n) break t;
              if (ie === a && ++Z === h && (W = T), ie === y && ++oe === c && (q = T), (pe = ae.nextSibling) !== null) break;
              ae = ie, ie = ae.parentNode;
            }
            ae = pe;
          }
          a = W === -1 || q === -1 ? null : { start: W, end: q };
        } else a = null;
      }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (qc = { focusedElem: n, selectionRange: a }, $a = !1, ge = i; ge !== null; ) if (i = ge, n = i.child, (i.subtreeFlags & 1028) !== 0 && n !== null) n.return = i, ge = n;
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
              var ye = me.memoizedProps, it = me.memoizedState, J = i.stateNode, Q = J.getSnapshotBeforeUpdate(i.elementType === i.type ? ye : Pn(i.type, ye), it);
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
    return me = Bm, Bm = !1, me;
  }
  function as(n, i, a) {
    var c = i.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var h = c = c.next;
      do {
        if ((h.tag & n) === n) {
          var y = h.destroy;
          h.destroy = void 0, y !== void 0 && Id(i, a, y);
        }
        h = h.next;
      } while (h !== c);
    }
  }
  function dl(n, i) {
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
  function Nd(n) {
    var i = n.ref;
    if (i !== null) {
      var a = n.stateNode;
      n.tag, n = a, typeof i == "function" ? i(n) : i.current = n;
    }
  }
  function Wm(n) {
    var i = n.alternate;
    i !== null && (n.alternate = null, Wm(i)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (i = n.stateNode, i !== null && (delete i[jn], delete i[Yo], delete i[Yc], delete i[O_], delete i[L_])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Um(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Vm(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Um(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Od(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.nodeType === 8 ? a.parentNode.insertBefore(n, i) : a.insertBefore(n, i) : (a.nodeType === 8 ? (i = a.parentNode, i.insertBefore(n, a)) : (i = a, i.appendChild(n)), a = a._reactRootContainer, a != null || i.onclick !== null || (i.onclick = Wa));
    else if (c !== 4 && (n = n.child, n !== null)) for (Od(n, i, a), n = n.sibling; n !== null; ) Od(n, i, a), n = n.sibling;
  }
  function Ld(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.insertBefore(n, i) : a.appendChild(n);
    else if (c !== 4 && (n = n.child, n !== null)) for (Ld(n, i, a), n = n.sibling; n !== null; ) Ld(n, i, a), n = n.sibling;
  }
  var xt = null, Rn = !1;
  function Dr(n, i, a) {
    for (a = a.child; a !== null; ) Hm(n, i, a), a = a.sibling;
  }
  function Hm(n, i, a) {
    if (Fn && typeof Fn.onCommitFiberUnmount == "function") try {
      Fn.onCommitFiberUnmount(ka, a);
    } catch {
    }
    switch (a.tag) {
      case 5:
        Dt || eo(a, i);
      case 6:
        var c = xt, h = Rn;
        xt = null, Dr(n, i, a), xt = c, Rn = h, xt !== null && (Rn ? (n = xt, a = a.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(a) : n.removeChild(a)) : xt.removeChild(a.stateNode));
        break;
      case 18:
        xt !== null && (Rn ? (n = xt, a = a.stateNode, n.nodeType === 8 ? Gc(n.parentNode, a) : n.nodeType === 1 && Gc(n, a), jo(n)) : Gc(xt, a.stateNode));
        break;
      case 4:
        c = xt, h = Rn, xt = a.stateNode.containerInfo, Rn = !0, Dr(n, i, a), xt = c, Rn = h;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Dt && (c = a.updateQueue, c !== null && (c = c.lastEffect, c !== null))) {
          h = c = c.next;
          do {
            var y = h, T = y.destroy;
            y = y.tag, T !== void 0 && ((y & 2) !== 0 || (y & 4) !== 0) && Id(a, i, T), h = h.next;
          } while (h !== c);
        }
        Dr(n, i, a);
        break;
      case 1:
        if (!Dt && (eo(a, i), c = a.stateNode, typeof c.componentWillUnmount == "function")) try {
          c.props = a.memoizedProps, c.state = a.memoizedState, c.componentWillUnmount();
        } catch (W) {
          et(a, i, W);
        }
        Dr(n, i, a);
        break;
      case 21:
        Dr(n, i, a);
        break;
      case 22:
        a.mode & 1 ? (Dt = (c = Dt) || a.memoizedState !== null, Dr(n, i, a), Dt = c) : Dr(n, i, a);
        break;
      default:
        Dr(n, i, a);
    }
  }
  function qm(n) {
    var i = n.updateQueue;
    if (i !== null) {
      n.updateQueue = null;
      var a = n.stateNode;
      a === null && (a = n.stateNode = new X_()), i.forEach(function(c) {
        var h = lx.bind(null, n, c);
        a.has(c) || (a.add(c), c.then(h, h));
      });
    }
  }
  function Tn(n, i) {
    var a = i.deletions;
    if (a !== null) for (var c = 0; c < a.length; c++) {
      var h = a[c];
      try {
        var y = n, T = i, W = T;
        e: for (; W !== null; ) {
          switch (W.tag) {
            case 5:
              xt = W.stateNode, Rn = !1;
              break e;
            case 3:
              xt = W.stateNode.containerInfo, Rn = !0;
              break e;
            case 4:
              xt = W.stateNode.containerInfo, Rn = !0;
              break e;
          }
          W = W.return;
        }
        if (xt === null) throw Error(r(160));
        Hm(y, T, h), xt = null, Rn = !1;
        var q = h.alternate;
        q !== null && (q.return = null), h.return = null;
      } catch (Z) {
        et(h, i, Z);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) Km(i, n), i = i.sibling;
  }
  function Km(n, i) {
    var a = n.alternate, c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Tn(i, n), Wn(n), c & 4) {
          try {
            as(3, n, n.return), dl(3, n);
          } catch (ye) {
            et(n, n.return, ye);
          }
          try {
            as(5, n, n.return);
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 1:
        Tn(i, n), Wn(n), c & 512 && a !== null && eo(a, a.return);
        break;
      case 5:
        if (Tn(i, n), Wn(n), c & 512 && a !== null && eo(a, a.return), n.flags & 32) {
          var h = n.stateNode;
          try {
            Ro(h, "");
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        if (c & 4 && (h = n.stateNode, h != null)) {
          var y = n.memoizedProps, T = a !== null ? a.memoizedProps : y, W = n.type, q = n.updateQueue;
          if (n.updateQueue = null, q !== null) try {
            W === "input" && y.type === "radio" && y.name != null && dt(h, y), pc(W, T);
            var Z = pc(W, y);
            for (T = 0; T < q.length; T += 2) {
              var oe = q[T], ae = q[T + 1];
              oe === "style" ? Th(h, ae) : oe === "dangerouslySetInnerHTML" ? Sa(h, ae) : oe === "children" ? Ro(h, ae) : C(h, oe, ae, Z);
            }
            switch (W) {
              case "input":
                Ze(h, y);
                break;
              case "textarea":
                Mt(h, y);
                break;
              case "select":
                var ie = h._wrapperState.wasMultiple;
                h._wrapperState.wasMultiple = !!y.multiple;
                var pe = y.value;
                pe != null ? Ue(h, !!y.multiple, pe, !1) : ie !== !!y.multiple && (y.defaultValue != null ? Ue(
                  h,
                  !!y.multiple,
                  y.defaultValue,
                  !0
                ) : Ue(h, !!y.multiple, y.multiple ? [] : "", !1));
            }
            h[Yo] = y;
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 6:
        if (Tn(i, n), Wn(n), c & 4) {
          if (n.stateNode === null) throw Error(r(162));
          h = n.stateNode, y = n.memoizedProps;
          try {
            h.nodeValue = y;
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 3:
        if (Tn(i, n), Wn(n), c & 4 && a !== null && a.memoizedState.isDehydrated) try {
          jo(i.containerInfo);
        } catch (ye) {
          et(n, n.return, ye);
        }
        break;
      case 4:
        Tn(i, n), Wn(n);
        break;
      case 13:
        Tn(i, n), Wn(n), h = n.child, h.flags & 8192 && (y = h.memoizedState !== null, h.stateNode.isHidden = y, !y || h.alternate !== null && h.alternate.memoizedState !== null || (jd = rt())), c & 4 && qm(n);
        break;
      case 22:
        if (oe = a !== null && a.memoizedState !== null, n.mode & 1 ? (Dt = (Z = Dt) || oe, Tn(i, n), Dt = Z) : Tn(i, n), Wn(n), c & 8192) {
          if (Z = n.memoizedState !== null, (n.stateNode.isHidden = Z) && !oe && (n.mode & 1) !== 0) for (ge = n, oe = n.child; oe !== null; ) {
            for (ae = ge = oe; ge !== null; ) {
              switch (ie = ge, pe = ie.child, ie.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  as(4, ie, ie.return);
                  break;
                case 1:
                  eo(ie, ie.return);
                  var me = ie.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    c = ie, a = ie.return;
                    try {
                      i = c, me.props = i.memoizedProps, me.state = i.memoizedState, me.componentWillUnmount();
                    } catch (ye) {
                      et(c, a, ye);
                    }
                  }
                  break;
                case 5:
                  eo(ie, ie.return);
                  break;
                case 22:
                  if (ie.memoizedState !== null) {
                    Ym(ae);
                    continue;
                  }
              }
              pe !== null ? (pe.return = ie, ge = pe) : Ym(ae);
            }
            oe = oe.sibling;
          }
          e: for (oe = null, ae = n; ; ) {
            if (ae.tag === 5) {
              if (oe === null) {
                oe = ae;
                try {
                  h = ae.stateNode, Z ? (y = h.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none") : (W = ae.stateNode, q = ae.memoizedProps.style, T = q != null && q.hasOwnProperty("display") ? q.display : null, W.style.display = Rh("display", T));
                } catch (ye) {
                  et(n, n.return, ye);
                }
              }
            } else if (ae.tag === 6) {
              if (oe === null) try {
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
              oe === ae && (oe = null), ae = ae.return;
            }
            oe === ae && (oe = null), ae.sibling.return = ae.return, ae = ae.sibling;
          }
        }
        break;
      case 19:
        Tn(i, n), Wn(n), c & 4 && qm(n);
        break;
      case 21:
        break;
      default:
        Tn(
          i,
          n
        ), Wn(n);
    }
  }
  function Wn(n) {
    var i = n.flags;
    if (i & 2) {
      try {
        e: {
          for (var a = n.return; a !== null; ) {
            if (Um(a)) {
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
            c.flags & 32 && (Ro(h, ""), c.flags &= -33);
            var y = Vm(n);
            Ld(n, y, h);
            break;
          case 3:
          case 4:
            var T = c.stateNode.containerInfo, W = Vm(n);
            Od(n, W, T);
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
  function ex(n, i, a) {
    ge = n, Qm(n);
  }
  function Qm(n, i, a) {
    for (var c = (n.mode & 1) !== 0; ge !== null; ) {
      var h = ge, y = h.child;
      if (h.tag === 22 && c) {
        var T = h.memoizedState !== null || cl;
        if (!T) {
          var W = h.alternate, q = W !== null && W.memoizedState !== null || Dt;
          W = cl;
          var Z = Dt;
          if (cl = T, (Dt = q) && !Z) for (ge = h; ge !== null; ) T = ge, q = T.child, T.tag === 22 && T.memoizedState !== null ? Jm(h) : q !== null ? (q.return = T, ge = q) : Jm(h);
          for (; y !== null; ) ge = y, Qm(y), y = y.sibling;
          ge = h, cl = W, Dt = Z;
        }
        Gm(n);
      } else (h.subtreeFlags & 8772) !== 0 && y !== null ? (y.return = h, ge = y) : Gm(n);
    }
  }
  function Gm(n) {
    for (; ge !== null; ) {
      var i = ge;
      if ((i.flags & 8772) !== 0) {
        var a = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              Dt || dl(5, i);
              break;
            case 1:
              var c = i.stateNode;
              if (i.flags & 4 && !Dt) if (a === null) c.componentDidMount();
              else {
                var h = i.elementType === i.type ? a.memoizedProps : Pn(i.type, a.memoizedProps);
                c.componentDidUpdate(h, a.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
              }
              var y = i.updateQueue;
              y !== null && Yg(i, y, c);
              break;
            case 3:
              var T = i.updateQueue;
              if (T !== null) {
                if (a = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    a = i.child.stateNode;
                    break;
                  case 1:
                    a = i.child.stateNode;
                }
                Yg(i, T, a);
              }
              break;
            case 5:
              var W = i.stateNode;
              if (a === null && i.flags & 4) {
                a = W;
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
                  var oe = Z.memoizedState;
                  if (oe !== null) {
                    var ae = oe.dehydrated;
                    ae !== null && jo(ae);
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
          Dt || i.flags & 512 && Nd(i);
        } catch (ie) {
          et(i, i.return, ie);
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
  function Ym(n) {
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
  function Jm(n) {
    for (; ge !== null; ) {
      var i = ge;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var a = i.return;
            try {
              dl(4, i);
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
            var y = i.return;
            try {
              Nd(i);
            } catch (q) {
              et(i, y, q);
            }
            break;
          case 5:
            var T = i.return;
            try {
              Nd(i);
            } catch (q) {
              et(i, T, q);
            }
        }
      } catch (q) {
        et(i, i.return, q);
      }
      if (i === n) {
        ge = null;
        break;
      }
      var W = i.sibling;
      if (W !== null) {
        W.return = i.return, ge = W;
        break;
      }
      ge = i.return;
    }
  }
  var tx = Math.ceil, fl = R.ReactCurrentDispatcher, Dd = R.ReactCurrentOwner, gn = R.ReactCurrentBatchConfig, Te = 0, vt = null, lt = null, kt = 0, nn = 0, to = Ar(0), ht = 0, ls = null, ui = 0, pl = 0, Fd = 0, us = null, Gt = null, jd = 0, no = 1 / 0, cr = null, hl = !1, zd = null, Fr = null, gl = !1, jr = null, ml = 0, cs = 0, Bd = null, yl = -1, vl = 0;
  function Bt() {
    return (Te & 6) !== 0 ? rt() : yl !== -1 ? yl : yl = rt();
  }
  function zr(n) {
    return (n.mode & 1) === 0 ? 1 : (Te & 2) !== 0 && kt !== 0 ? kt & -kt : F_.transition !== null ? (vl === 0 && (vl = Vh()), vl) : (n = Le, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Zh(n.type)), n);
  }
  function $n(n, i, a, c) {
    if (50 < cs) throw cs = 0, Bd = null, Error(r(185));
    No(n, a, c), ((Te & 2) === 0 || n !== vt) && (n === vt && ((Te & 2) === 0 && (pl |= a), ht === 4 && Br(n, kt)), Yt(n, c), a === 1 && Te === 0 && (i.mode & 1) === 0 && (no = rt() + 500, qa && Nr()));
  }
  function Yt(n, i) {
    var a = n.callbackNode;
    Fb(n, i);
    var c = Pa(n, n === vt ? kt : 0);
    if (c === 0) a !== null && Bh(a), n.callbackNode = null, n.callbackPriority = 0;
    else if (i = c & -c, n.callbackPriority !== i) {
      if (a != null && Bh(a), i === 1) n.tag === 0 ? D_(Zm.bind(null, n)) : Fg(Zm.bind(null, n)), I_(function() {
        (Te & 6) === 0 && Nr();
      }), a = null;
      else {
        switch (Hh(c)) {
          case 1:
            a = Sc;
            break;
          case 4:
            a = Wh;
            break;
          case 16:
            a = xa;
            break;
          case 536870912:
            a = Uh;
            break;
          default:
            a = xa;
        }
        a = ay(a, Xm.bind(null, n));
      }
      n.callbackPriority = i, n.callbackNode = a;
    }
  }
  function Xm(n, i) {
    if (yl = -1, vl = 0, (Te & 6) !== 0) throw Error(r(327));
    var a = n.callbackNode;
    if (ro() && n.callbackNode !== a) return null;
    var c = Pa(n, n === vt ? kt : 0);
    if (c === 0) return null;
    if ((c & 30) !== 0 || (c & n.expiredLanes) !== 0 || i) i = wl(n, c);
    else {
      i = c;
      var h = Te;
      Te |= 2;
      var y = ty();
      (vt !== n || kt !== i) && (cr = null, no = rt() + 500, di(n, i));
      do
        try {
          ix();
          break;
        } catch (W) {
          ey(n, W);
        }
      while (!0);
      od(), fl.current = y, Te = h, lt !== null ? i = 0 : (vt = null, kt = 0, i = ht);
    }
    if (i !== 0) {
      if (i === 2 && (h = bc(n), h !== 0 && (c = h, i = Wd(n, h))), i === 1) throw a = ls, di(n, 0), Br(n, c), Yt(n, rt()), a;
      if (i === 6) Br(n, c);
      else {
        if (h = n.current.alternate, (c & 30) === 0 && !nx(h) && (i = wl(n, c), i === 2 && (y = bc(n), y !== 0 && (c = y, i = Wd(n, y))), i === 1)) throw a = ls, di(n, 0), Br(n, c), Yt(n, rt()), a;
        switch (n.finishedWork = h, n.finishedLanes = c, i) {
          case 0:
          case 1:
            throw Error(r(345));
          case 2:
            fi(n, Gt, cr);
            break;
          case 3:
            if (Br(n, c), (c & 130023424) === c && (i = jd + 500 - rt(), 10 < i)) {
              if (Pa(n, 0) !== 0) break;
              if (h = n.suspendedLanes, (h & c) !== c) {
                Bt(), n.pingedLanes |= n.suspendedLanes & h;
                break;
              }
              n.timeoutHandle = Qc(fi.bind(null, n, Gt, cr), i);
              break;
            }
            fi(n, Gt, cr);
            break;
          case 4:
            if (Br(n, c), (c & 4194240) === c) break;
            for (i = n.eventTimes, h = -1; 0 < c; ) {
              var T = 31 - kn(c);
              y = 1 << T, T = i[T], T > h && (h = T), c &= ~y;
            }
            if (c = h, c = rt() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * tx(c / 1960)) - c, 10 < c) {
              n.timeoutHandle = Qc(fi.bind(null, n, Gt, cr), c);
              break;
            }
            fi(n, Gt, cr);
            break;
          case 5:
            fi(n, Gt, cr);
            break;
          default:
            throw Error(r(329));
        }
      }
    }
    return Yt(n, rt()), n.callbackNode === a ? Xm.bind(null, n) : null;
  }
  function Wd(n, i) {
    var a = us;
    return n.current.memoizedState.isDehydrated && (di(n, i).flags |= 256), n = wl(n, i), n !== 2 && (i = Gt, Gt = a, i !== null && Ud(i)), n;
  }
  function Ud(n) {
    Gt === null ? Gt = n : Gt.push.apply(Gt, n);
  }
  function nx(n) {
    for (var i = n; ; ) {
      if (i.flags & 16384) {
        var a = i.updateQueue;
        if (a !== null && (a = a.stores, a !== null)) for (var c = 0; c < a.length; c++) {
          var h = a[c], y = h.getSnapshot;
          h = h.value;
          try {
            if (!Cn(y(), h)) return !1;
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
  function Br(n, i) {
    for (i &= ~Fd, i &= ~pl, n.suspendedLanes |= i, n.pingedLanes &= ~i, n = n.expirationTimes; 0 < i; ) {
      var a = 31 - kn(i), c = 1 << a;
      n[a] = -1, i &= ~c;
    }
  }
  function Zm(n) {
    if ((Te & 6) !== 0) throw Error(r(327));
    ro();
    var i = Pa(n, 0);
    if ((i & 1) === 0) return Yt(n, rt()), null;
    var a = wl(n, i);
    if (n.tag !== 0 && a === 2) {
      var c = bc(n);
      c !== 0 && (i = c, a = Wd(n, c));
    }
    if (a === 1) throw a = ls, di(n, 0), Br(n, i), Yt(n, rt()), a;
    if (a === 6) throw Error(r(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = i, fi(n, Gt, cr), Yt(n, rt()), null;
  }
  function Vd(n, i) {
    var a = Te;
    Te |= 1;
    try {
      return n(i);
    } finally {
      Te = a, Te === 0 && (no = rt() + 500, qa && Nr());
    }
  }
  function ci(n) {
    jr !== null && jr.tag === 0 && (Te & 6) === 0 && ro();
    var i = Te;
    Te |= 1;
    var a = gn.transition, c = Le;
    try {
      if (gn.transition = null, Le = 1, n) return n();
    } finally {
      Le = c, gn.transition = a, Te = i, (Te & 6) === 0 && Nr();
    }
  }
  function Hd() {
    nn = to.current, He(to);
  }
  function di(n, i) {
    n.finishedWork = null, n.finishedLanes = 0;
    var a = n.timeoutHandle;
    if (a !== -1 && (n.timeoutHandle = -1, A_(a)), lt !== null) for (a = lt.return; a !== null; ) {
      var c = a;
      switch (ed(c), c.tag) {
        case 1:
          c = c.type.childContextTypes, c != null && Va();
          break;
        case 3:
          Xi(), He(qt), He(Nt), pd();
          break;
        case 5:
          dd(c);
          break;
        case 4:
          Xi();
          break;
        case 13:
          He(Ge);
          break;
        case 19:
          He(Ge);
          break;
        case 10:
          sd(c.type._context);
          break;
        case 22:
        case 23:
          Hd();
      }
      a = a.return;
    }
    if (vt = n, lt = n = Wr(n.current, null), kt = nn = i, ht = 0, ls = null, Fd = pl = ui = 0, Gt = us = null, si !== null) {
      for (i = 0; i < si.length; i++) if (a = si[i], c = a.interleaved, c !== null) {
        a.interleaved = null;
        var h = c.next, y = a.pending;
        if (y !== null) {
          var T = y.next;
          y.next = h, c.next = T;
        }
        a.pending = c;
      }
      si = null;
    }
    return n;
  }
  function ey(n, i) {
    do {
      var a = lt;
      try {
        if (od(), nl.current = sl, rl) {
          for (var c = Ye.memoizedState; c !== null; ) {
            var h = c.queue;
            h !== null && (h.pending = null), c = c.next;
          }
          rl = !1;
        }
        if (li = 0, yt = pt = Ye = null, ns = !1, rs = 0, Dd.current = null, a === null || a.return === null) {
          ht = 1, ls = i, lt = null;
          break;
        }
        e: {
          var y = n, T = a.return, W = a, q = i;
          if (i = kt, W.flags |= 32768, q !== null && typeof q == "object" && typeof q.then == "function") {
            var Z = q, oe = W, ae = oe.tag;
            if ((oe.mode & 1) === 0 && (ae === 0 || ae === 11 || ae === 15)) {
              var ie = oe.alternate;
              ie ? (oe.updateQueue = ie.updateQueue, oe.memoizedState = ie.memoizedState, oe.lanes = ie.lanes) : (oe.updateQueue = null, oe.memoizedState = null);
            }
            var pe = Cm(T);
            if (pe !== null) {
              pe.flags &= -257, Em(pe, T, W, y, i), pe.mode & 1 && km(y, Z, i), i = pe, q = Z;
              var me = i.updateQueue;
              if (me === null) {
                var ye = /* @__PURE__ */ new Set();
                ye.add(q), i.updateQueue = ye;
              } else me.add(q);
              break e;
            } else {
              if ((i & 1) === 0) {
                km(y, Z, i), qd();
                break e;
              }
              q = Error(r(426));
            }
          } else if (Ke && W.mode & 1) {
            var it = Cm(T);
            if (it !== null) {
              (it.flags & 65536) === 0 && (it.flags |= 256), Em(it, T, W, y, i), rd(Zi(q, W));
              break e;
            }
          }
          y = q = Zi(q, W), ht !== 4 && (ht = 2), us === null ? us = [y] : us.push(y), y = T;
          do {
            switch (y.tag) {
              case 3:
                y.flags |= 65536, i &= -i, y.lanes |= i;
                var J = _m(y, q, i);
                Gg(y, J);
                break e;
              case 1:
                W = q;
                var Q = y.type, X = y.stateNode;
                if ((y.flags & 128) === 0 && (typeof Q.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (Fr === null || !Fr.has(X)))) {
                  y.flags |= 65536, i &= -i, y.lanes |= i;
                  var ce = xm(y, W, i);
                  Gg(y, ce);
                  break e;
                }
            }
            y = y.return;
          } while (y !== null);
        }
        ry(a);
      } catch (ve) {
        i = ve, lt === a && a !== null && (lt = a = a.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ty() {
    var n = fl.current;
    return fl.current = sl, n === null ? sl : n;
  }
  function qd() {
    (ht === 0 || ht === 3 || ht === 2) && (ht = 4), vt === null || (ui & 268435455) === 0 && (pl & 268435455) === 0 || Br(vt, kt);
  }
  function wl(n, i) {
    var a = Te;
    Te |= 2;
    var c = ty();
    (vt !== n || kt !== i) && (cr = null, di(n, i));
    do
      try {
        rx();
        break;
      } catch (h) {
        ey(n, h);
      }
    while (!0);
    if (od(), Te = a, fl.current = c, lt !== null) throw Error(r(261));
    return vt = null, kt = 0, ht;
  }
  function rx() {
    for (; lt !== null; ) ny(lt);
  }
  function ix() {
    for (; lt !== null && !Tb(); ) ny(lt);
  }
  function ny(n) {
    var i = sy(n.alternate, n, nn);
    n.memoizedProps = n.pendingProps, i === null ? ry(n) : lt = i, Dd.current = null;
  }
  function ry(n) {
    var i = n;
    do {
      var a = i.alternate;
      if (n = i.return, (i.flags & 32768) === 0) {
        if (a = Y_(a, i, nn), a !== null) {
          lt = a;
          return;
        }
      } else {
        if (a = J_(a, i), a !== null) {
          a.flags &= 32767, lt = a;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          ht = 6, lt = null;
          return;
        }
      }
      if (i = i.sibling, i !== null) {
        lt = i;
        return;
      }
      lt = i = n;
    } while (i !== null);
    ht === 0 && (ht = 5);
  }
  function fi(n, i, a) {
    var c = Le, h = gn.transition;
    try {
      gn.transition = null, Le = 1, ox(n, i, a, c);
    } finally {
      gn.transition = h, Le = c;
    }
    return null;
  }
  function ox(n, i, a, c) {
    do
      ro();
    while (jr !== null);
    if ((Te & 6) !== 0) throw Error(r(327));
    a = n.finishedWork;
    var h = n.finishedLanes;
    if (a === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, a === n.current) throw Error(r(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var y = a.lanes | a.childLanes;
    if (jb(n, y), n === vt && (lt = vt = null, kt = 0), (a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0 || gl || (gl = !0, ay(xa, function() {
      return ro(), null;
    })), y = (a.flags & 15990) !== 0, (a.subtreeFlags & 15990) !== 0 || y) {
      y = gn.transition, gn.transition = null;
      var T = Le;
      Le = 1;
      var W = Te;
      Te |= 4, Dd.current = null, Z_(n, a), Km(a, n), C_(qc), $a = !!Hc, qc = Hc = null, n.current = a, ex(a), $b(), Te = W, Le = T, gn.transition = y;
    } else n.current = a;
    if (gl && (gl = !1, jr = n, ml = h), y = n.pendingLanes, y === 0 && (Fr = null), Ib(a.stateNode), Yt(n, rt()), i !== null) for (c = n.onRecoverableError, a = 0; a < i.length; a++) h = i[a], c(h.value, { componentStack: h.stack, digest: h.digest });
    if (hl) throw hl = !1, n = zd, zd = null, n;
    return (ml & 1) !== 0 && n.tag !== 0 && ro(), y = n.pendingLanes, (y & 1) !== 0 ? n === Bd ? cs++ : (cs = 0, Bd = n) : cs = 0, Nr(), null;
  }
  function ro() {
    if (jr !== null) {
      var n = Hh(ml), i = gn.transition, a = Le;
      try {
        if (gn.transition = null, Le = 16 > n ? 16 : n, jr === null) var c = !1;
        else {
          if (n = jr, jr = null, ml = 0, (Te & 6) !== 0) throw Error(r(331));
          var h = Te;
          for (Te |= 4, ge = n.current; ge !== null; ) {
            var y = ge, T = y.child;
            if ((ge.flags & 16) !== 0) {
              var W = y.deletions;
              if (W !== null) {
                for (var q = 0; q < W.length; q++) {
                  var Z = W[q];
                  for (ge = Z; ge !== null; ) {
                    var oe = ge;
                    switch (oe.tag) {
                      case 0:
                      case 11:
                      case 15:
                        as(8, oe, y);
                    }
                    var ae = oe.child;
                    if (ae !== null) ae.return = oe, ge = ae;
                    else for (; ge !== null; ) {
                      oe = ge;
                      var ie = oe.sibling, pe = oe.return;
                      if (Wm(oe), oe === Z) {
                        ge = null;
                        break;
                      }
                      if (ie !== null) {
                        ie.return = pe, ge = ie;
                        break;
                      }
                      ge = pe;
                    }
                  }
                }
                var me = y.alternate;
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
                ge = y;
              }
            }
            if ((y.subtreeFlags & 2064) !== 0 && T !== null) T.return = y, ge = T;
            else e: for (; ge !== null; ) {
              if (y = ge, (y.flags & 2048) !== 0) switch (y.tag) {
                case 0:
                case 11:
                case 15:
                  as(9, y, y.return);
              }
              var J = y.sibling;
              if (J !== null) {
                J.return = y.return, ge = J;
                break e;
              }
              ge = y.return;
            }
          }
          var Q = n.current;
          for (ge = Q; ge !== null; ) {
            T = ge;
            var X = T.child;
            if ((T.subtreeFlags & 2064) !== 0 && X !== null) X.return = T, ge = X;
            else e: for (T = Q; ge !== null; ) {
              if (W = ge, (W.flags & 2048) !== 0) try {
                switch (W.tag) {
                  case 0:
                  case 11:
                  case 15:
                    dl(9, W);
                }
              } catch (ve) {
                et(W, W.return, ve);
              }
              if (W === T) {
                ge = null;
                break e;
              }
              var ce = W.sibling;
              if (ce !== null) {
                ce.return = W.return, ge = ce;
                break e;
              }
              ge = W.return;
            }
          }
          if (Te = h, Nr(), Fn && typeof Fn.onPostCommitFiberRoot == "function") try {
            Fn.onPostCommitFiberRoot(ka, n);
          } catch {
          }
          c = !0;
        }
        return c;
      } finally {
        Le = a, gn.transition = i;
      }
    }
    return !1;
  }
  function iy(n, i, a) {
    i = Zi(a, i), i = _m(n, i, 1), n = Lr(n, i, 1), i = Bt(), n !== null && (No(n, 1, i), Yt(n, i));
  }
  function et(n, i, a) {
    if (n.tag === 3) iy(n, n, a);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        iy(i, n, a);
        break;
      } else if (i.tag === 1) {
        var c = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Fr === null || !Fr.has(c))) {
          n = Zi(a, n), n = xm(i, n, 1), i = Lr(i, n, 1), n = Bt(), i !== null && (No(i, 1, n), Yt(i, n));
          break;
        }
      }
      i = i.return;
    }
  }
  function sx(n, i, a) {
    var c = n.pingCache;
    c !== null && c.delete(i), i = Bt(), n.pingedLanes |= n.suspendedLanes & a, vt === n && (kt & a) === a && (ht === 4 || ht === 3 && (kt & 130023424) === kt && 500 > rt() - jd ? di(n, 0) : Fd |= a), Yt(n, i);
  }
  function oy(n, i) {
    i === 0 && ((n.mode & 1) === 0 ? i = 1 : (i = Ea, Ea <<= 1, (Ea & 130023424) === 0 && (Ea = 4194304)));
    var a = Bt();
    n = ar(n, i), n !== null && (No(n, i, a), Yt(n, a));
  }
  function ax(n) {
    var i = n.memoizedState, a = 0;
    i !== null && (a = i.retryLane), oy(n, a);
  }
  function lx(n, i) {
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
    c !== null && c.delete(i), oy(n, a);
  }
  var sy;
  sy = function(n, i, a) {
    if (n !== null) if (n.memoizedProps !== i.pendingProps || qt.current) Qt = !0;
    else {
      if ((n.lanes & a) === 0 && (i.flags & 128) === 0) return Qt = !1, G_(n, i, a);
      Qt = (n.flags & 131072) !== 0;
    }
    else Qt = !1, Ke && (i.flags & 1048576) !== 0 && jg(i, Qa, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var c = i.type;
        ul(n, i), n = i.pendingProps;
        var h = Hi(i, Nt.current);
        Ji(i, a), h = md(null, i, c, n, h, a);
        var y = yd();
        return i.flags |= 1, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, Kt(c) ? (y = !0, Ha(i)) : y = !1, i.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, ud(i), h.updater = al, i.stateNode = h, h._reactInternals = i, xd(i, c, n, a), i = Pd(null, i, c, !0, y, a)) : (i.tag = 0, Ke && y && Zc(i), zt(null, i, h, a), i = i.child), i;
      case 16:
        c = i.elementType;
        e: {
          switch (ul(n, i), n = i.pendingProps, h = c._init, c = h(c._payload), i.type = c, h = i.tag = cx(c), n = Pn(c, n), h) {
            case 0:
              i = Ed(null, i, c, n, a);
              break e;
            case 1:
              i = Am(null, i, c, n, a);
              break e;
            case 11:
              i = Pm(null, i, c, n, a);
              break e;
            case 14:
              i = Rm(null, i, c, Pn(c.type, n), a);
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
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Pn(c, h), Ed(n, i, c, h, a);
      case 1:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Pn(c, h), Am(n, i, c, h, a);
      case 3:
        e: {
          if (Im(i), n === null) throw Error(r(387));
          c = i.pendingProps, y = i.memoizedState, h = y.element, Qg(n, i), el(i, c, null, a);
          var T = i.memoizedState;
          if (c = T.element, y.isDehydrated) if (y = { element: c, isDehydrated: !1, cache: T.cache, pendingSuspenseBoundaries: T.pendingSuspenseBoundaries, transitions: T.transitions }, i.updateQueue.baseState = y, i.memoizedState = y, i.flags & 256) {
            h = Zi(Error(r(423)), i), i = Nm(n, i, c, a, h);
            break e;
          } else if (c !== h) {
            h = Zi(Error(r(424)), i), i = Nm(n, i, c, a, h);
            break e;
          } else for (tn = Mr(i.stateNode.containerInfo.firstChild), en = i, Ke = !0, En = null, a = qg(i, null, c, a), i.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Qi(), c === h) {
              i = ur(n, i, a);
              break e;
            }
            zt(n, i, c, a);
          }
          i = i.child;
        }
        return i;
      case 5:
        return Jg(i), n === null && nd(i), c = i.type, h = i.pendingProps, y = n !== null ? n.memoizedProps : null, T = h.children, Kc(c, h) ? T = null : y !== null && Kc(c, y) && (i.flags |= 32), Mm(n, i), zt(n, i, T, a), i.child;
      case 6:
        return n === null && nd(i), null;
      case 13:
        return Om(n, i, a);
      case 4:
        return cd(i, i.stateNode.containerInfo), c = i.pendingProps, n === null ? i.child = Gi(i, null, c, a) : zt(n, i, c, a), i.child;
      case 11:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Pn(c, h), Pm(n, i, c, h, a);
      case 7:
        return zt(n, i, i.pendingProps, a), i.child;
      case 8:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 12:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 10:
        e: {
          if (c = i.type._context, h = i.pendingProps, y = i.memoizedProps, T = h.value, We(Ja, c._currentValue), c._currentValue = T, y !== null) if (Cn(y.value, T)) {
            if (y.children === h.children && !qt.current) {
              i = ur(n, i, a);
              break e;
            }
          } else for (y = i.child, y !== null && (y.return = i); y !== null; ) {
            var W = y.dependencies;
            if (W !== null) {
              T = y.child;
              for (var q = W.firstContext; q !== null; ) {
                if (q.context === c) {
                  if (y.tag === 1) {
                    q = lr(-1, a & -a), q.tag = 2;
                    var Z = y.updateQueue;
                    if (Z !== null) {
                      Z = Z.shared;
                      var oe = Z.pending;
                      oe === null ? q.next = q : (q.next = oe.next, oe.next = q), Z.pending = q;
                    }
                  }
                  y.lanes |= a, q = y.alternate, q !== null && (q.lanes |= a), ad(
                    y.return,
                    a,
                    i
                  ), W.lanes |= a;
                  break;
                }
                q = q.next;
              }
            } else if (y.tag === 10) T = y.type === i.type ? null : y.child;
            else if (y.tag === 18) {
              if (T = y.return, T === null) throw Error(r(341));
              T.lanes |= a, W = T.alternate, W !== null && (W.lanes |= a), ad(T, a, i), T = y.sibling;
            } else T = y.child;
            if (T !== null) T.return = y;
            else for (T = y; T !== null; ) {
              if (T === i) {
                T = null;
                break;
              }
              if (y = T.sibling, y !== null) {
                y.return = T.return, T = y;
                break;
              }
              T = T.return;
            }
            y = T;
          }
          zt(n, i, h.children, a), i = i.child;
        }
        return i;
      case 9:
        return h = i.type, c = i.pendingProps.children, Ji(i, a), h = pn(h), c = c(h), i.flags |= 1, zt(n, i, c, a), i.child;
      case 14:
        return c = i.type, h = Pn(c, i.pendingProps), h = Pn(c.type, h), Rm(n, i, c, h, a);
      case 15:
        return Tm(n, i, i.type, i.pendingProps, a);
      case 17:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : Pn(c, h), ul(n, i), i.tag = 1, Kt(c) ? (n = !0, Ha(i)) : n = !1, Ji(i, a), Sm(i, c, h), xd(i, c, h, a), Pd(null, i, c, !0, n, a);
      case 19:
        return Dm(n, i, a);
      case 22:
        return $m(n, i, a);
    }
    throw Error(r(156, i.tag));
  };
  function ay(n, i) {
    return zh(n, i);
  }
  function ux(n, i, a, c) {
    this.tag = n, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function mn(n, i, a, c) {
    return new ux(n, i, a, c);
  }
  function Kd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function cx(n) {
    if (typeof n == "function") return Kd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === O) return 11;
      if (n === z) return 14;
    }
    return 2;
  }
  function Wr(n, i) {
    var a = n.alternate;
    return a === null ? (a = mn(n.tag, i, n.key, n.mode), a.elementType = n.elementType, a.type = n.type, a.stateNode = n.stateNode, a.alternate = n, n.alternate = a) : (a.pendingProps = i, a.type = n.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = n.flags & 14680064, a.childLanes = n.childLanes, a.lanes = n.lanes, a.child = n.child, a.memoizedProps = n.memoizedProps, a.memoizedState = n.memoizedState, a.updateQueue = n.updateQueue, i = n.dependencies, a.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, a.sibling = n.sibling, a.index = n.index, a.ref = n.ref, a;
  }
  function Sl(n, i, a, c, h, y) {
    var T = 2;
    if (c = n, typeof n == "function") Kd(n) && (T = 1);
    else if (typeof n == "string") T = 5;
    else e: switch (n) {
      case A:
        return pi(a.children, h, y, i);
      case I:
        T = 8, h |= 8;
        break;
      case L:
        return n = mn(12, a, i, h | 2), n.elementType = L, n.lanes = y, n;
      case F:
        return n = mn(13, a, i, h), n.elementType = F, n.lanes = y, n;
      case B:
        return n = mn(19, a, i, h), n.elementType = B, n.lanes = y, n;
      case G:
        return bl(a, h, y, i);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case v:
            T = 10;
            break e;
          case P:
            T = 9;
            break e;
          case O:
            T = 11;
            break e;
          case z:
            T = 14;
            break e;
          case V:
            T = 16, c = null;
            break e;
        }
        throw Error(r(130, n == null ? n : typeof n, ""));
    }
    return i = mn(T, a, i, h), i.elementType = n, i.type = c, i.lanes = y, i;
  }
  function pi(n, i, a, c) {
    return n = mn(7, n, c, i), n.lanes = a, n;
  }
  function bl(n, i, a, c) {
    return n = mn(22, n, c, i), n.elementType = G, n.lanes = a, n.stateNode = { isHidden: !1 }, n;
  }
  function Qd(n, i, a) {
    return n = mn(6, n, null, i), n.lanes = a, n;
  }
  function Gd(n, i, a) {
    return i = mn(4, n.children !== null ? n.children : [], n.key, i), i.lanes = a, i.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, i;
  }
  function dx(n, i, a, c, h) {
    this.tag = i, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = _c(0), this.expirationTimes = _c(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _c(0), this.identifierPrefix = c, this.onRecoverableError = h, this.mutableSourceEagerHydrationData = null;
  }
  function Yd(n, i, a, c, h, y, T, W, q) {
    return n = new dx(n, i, a, W, q), i === 1 ? (i = 1, y === !0 && (i |= 8)) : i = 0, y = mn(3, null, null, i), n.current = y, y.stateNode = n, y.memoizedState = { element: c, isDehydrated: a, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ud(y), n;
  }
  function fx(n, i, a) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: M, key: c == null ? null : "" + c, children: n, containerInfo: i, implementation: a };
  }
  function ly(n) {
    if (!n) return Ir;
    n = n._reactInternals;
    e: {
      if (ti(n) !== n || n.tag !== 1) throw Error(r(170));
      var i = n;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (Kt(i.type)) {
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
      if (Kt(a)) return Lg(n, a, i);
    }
    return i;
  }
  function uy(n, i, a, c, h, y, T, W, q) {
    return n = Yd(a, c, !0, n, h, y, T, W, q), n.context = ly(null), a = n.current, c = Bt(), h = zr(a), y = lr(c, h), y.callback = i ?? null, Lr(a, y, h), n.current.lanes = h, No(n, h, c), Yt(n, c), n;
  }
  function _l(n, i, a, c) {
    var h = i.current, y = Bt(), T = zr(h);
    return a = ly(a), i.context === null ? i.context = a : i.pendingContext = a, i = lr(y, T), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = Lr(h, i, T), n !== null && ($n(n, h, T, y), Za(n, h, T)), T;
  }
  function xl(n) {
    return n = n.current, n.child ? (n.child.tag === 5, n.child.stateNode) : null;
  }
  function cy(n, i) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var a = n.retryLane;
      n.retryLane = a !== 0 && a < i ? a : i;
    }
  }
  function Jd(n, i) {
    cy(n, i), (n = n.alternate) && cy(n, i);
  }
  function px() {
    return null;
  }
  var dy = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Xd(n) {
    this._internalRoot = n;
  }
  kl.prototype.render = Xd.prototype.render = function(n) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    _l(n, i, null, null);
  }, kl.prototype.unmount = Xd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var i = n.containerInfo;
      ci(function() {
        _l(null, n, null, null);
      }), i[rr] = null;
    }
  };
  function kl(n) {
    this._internalRoot = n;
  }
  kl.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var i = Qh();
      n = { blockedOn: null, target: n, priority: i };
      for (var a = 0; a < Rr.length && i !== 0 && i < Rr[a].priority; a++) ;
      Rr.splice(a, 0, n), a === 0 && Jh(n);
    }
  };
  function Zd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Cl(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function fy() {
  }
  function hx(n, i, a, c, h) {
    if (h) {
      if (typeof c == "function") {
        var y = c;
        c = function() {
          var Z = xl(T);
          y.call(Z);
        };
      }
      var T = uy(i, c, n, 0, null, !1, !1, "", fy);
      return n._reactRootContainer = T, n[rr] = T.current, Qo(n.nodeType === 8 ? n.parentNode : n), ci(), T;
    }
    for (; h = n.lastChild; ) n.removeChild(h);
    if (typeof c == "function") {
      var W = c;
      c = function() {
        var Z = xl(q);
        W.call(Z);
      };
    }
    var q = Yd(n, 0, !1, null, null, !1, !1, "", fy);
    return n._reactRootContainer = q, n[rr] = q.current, Qo(n.nodeType === 8 ? n.parentNode : n), ci(function() {
      _l(i, q, a, c);
    }), q;
  }
  function El(n, i, a, c, h) {
    var y = a._reactRootContainer;
    if (y) {
      var T = y;
      if (typeof h == "function") {
        var W = h;
        h = function() {
          var q = xl(T);
          W.call(q);
        };
      }
      _l(i, T, n, h);
    } else T = hx(a, i, n, h, c);
    return xl(T);
  }
  qh = function(n) {
    switch (n.tag) {
      case 3:
        var i = n.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var a = Io(i.pendingLanes);
          a !== 0 && (xc(i, a | 1), Yt(i, rt()), (Te & 6) === 0 && (no = rt() + 500, Nr()));
        }
        break;
      case 13:
        ci(function() {
          var c = ar(n, 1);
          if (c !== null) {
            var h = Bt();
            $n(c, n, 1, h);
          }
        }), Jd(n, 1);
    }
  }, kc = function(n) {
    if (n.tag === 13) {
      var i = ar(n, 134217728);
      if (i !== null) {
        var a = Bt();
        $n(i, n, 134217728, a);
      }
      Jd(n, 134217728);
    }
  }, Kh = function(n) {
    if (n.tag === 13) {
      var i = zr(n), a = ar(n, i);
      if (a !== null) {
        var c = Bt();
        $n(a, n, i, c);
      }
      Jd(n, i);
    }
  }, Qh = function() {
    return Le;
  }, Gh = function(n, i) {
    var a = Le;
    try {
      return Le = n, i();
    } finally {
      Le = a;
    }
  }, mc = function(n, i, a) {
    switch (i) {
      case "input":
        if (Ze(n, a), i = a.name, a.type === "radio" && i != null) {
          for (a = n; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < a.length; i++) {
            var c = a[i];
            if (c !== n && c.form === n.form) {
              var h = Ua(c);
              if (!h) throw Error(r(90));
              _e(c), Ze(c, h);
            }
          }
        }
        break;
      case "textarea":
        Mt(n, a);
        break;
      case "select":
        i = a.value, i != null && Ue(n, !!a.multiple, i, !1);
    }
  }, Ih = Vd, Nh = ci;
  var gx = { usingClientEntryPoint: !1, Events: [Jo, Ui, Ua, Mh, Ah, Vd] }, ds = { findFiberByHostInstance: ni, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, mx = { bundleType: ds.bundleType, version: ds.version, rendererPackageName: ds.rendererPackageName, rendererConfig: ds.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: R.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Fh(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ds.findFiberByHostInstance || px, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber) try {
      ka = Pl.inject(mx), Fn = Pl;
    } catch {
    }
  }
  return Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gx, Jt.createPortal = function(n, i) {
    var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Zd(i)) throw Error(r(200));
    return fx(n, i, null, a);
  }, Jt.createRoot = function(n, i) {
    if (!Zd(n)) throw Error(r(299));
    var a = !1, c = "", h = dy;
    return i != null && (i.unstable_strictMode === !0 && (a = !0), i.identifierPrefix !== void 0 && (c = i.identifierPrefix), i.onRecoverableError !== void 0 && (h = i.onRecoverableError)), i = Yd(n, 1, !1, null, null, a, !1, c, h), n[rr] = i.current, Qo(n.nodeType === 8 ? n.parentNode : n), new Xd(i);
  }, Jt.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var i = n._reactInternals;
    if (i === void 0)
      throw typeof n.render == "function" ? Error(r(188)) : (n = Object.keys(n).join(","), Error(r(268, n)));
    return n = Fh(i), n = n === null ? null : n.stateNode, n;
  }, Jt.flushSync = function(n) {
    return ci(n);
  }, Jt.hydrate = function(n, i, a) {
    if (!Cl(i)) throw Error(r(200));
    return El(null, n, i, !0, a);
  }, Jt.hydrateRoot = function(n, i, a) {
    if (!Zd(n)) throw Error(r(405));
    var c = a != null && a.hydratedSources || null, h = !1, y = "", T = dy;
    if (a != null && (a.unstable_strictMode === !0 && (h = !0), a.identifierPrefix !== void 0 && (y = a.identifierPrefix), a.onRecoverableError !== void 0 && (T = a.onRecoverableError)), i = uy(i, null, n, 1, a ?? null, h, !1, y, T), n[rr] = i.current, Qo(n), c) for (n = 0; n < c.length; n++) a = c[n], h = a._getVersion, h = h(a._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [a, h] : i.mutableSourceEagerHydrationData.push(
      a,
      h
    );
    return new kl(i);
  }, Jt.render = function(n, i, a) {
    if (!Cl(i)) throw Error(r(200));
    return El(null, n, i, !1, a);
  }, Jt.unmountComponentAtNode = function(n) {
    if (!Cl(n)) throw Error(r(40));
    return n._reactRootContainer ? (ci(function() {
      El(null, null, n, !1, function() {
        n._reactRootContainer = null, n[rr] = null;
      });
    }), !0) : !1;
  }, Jt.unstable_batchedUpdates = Vd, Jt.unstable_renderSubtreeIntoContainer = function(n, i, a, c) {
    if (!Cl(a)) throw Error(r(200));
    if (n == null || n._reactInternals === void 0) throw Error(r(38));
    return El(n, i, a, !1, c);
  }, Jt.version = "18.3.1-next-f1338f8080-20240426", Jt;
}
var lv;
function QS() {
  if (lv) return gf.exports;
  lv = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), gf.exports = lE(), gf.exports;
}
var GS = QS();
const Al = /* @__PURE__ */ Zr(GS), uv = {
  disabled: !1
}, yu = Ut.createContext(null);
var uE = function(t) {
  return t.scrollTop;
}, Cs = "unmounted", yi = "exited", vi = "entering", fo = "entered", Xf = "exiting", Zn = /* @__PURE__ */ (function(e) {
  KS(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = s, d = u && !u.isMounting ? o.enter : o.appear, p;
    return l.appearStatus = null, o.in ? d ? (p = yi, l.appearStatus = vi) : p = fo : o.unmountOnExit || o.mountOnEnter ? p = Cs : p = yi, l.state = {
      status: p
    }, l.nextCallback = null, l;
  }
  t.getDerivedStateFromProps = function(s, l) {
    var u = s.in;
    return u && l.status === Cs ? {
      status: yi
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(s) {
    var l = null;
    if (s !== this.props) {
      var u = this.state.status;
      this.props.in ? u !== vi && u !== fo && (l = vi) : (u === vi || u === fo) && (l = Xf);
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
      if (this.cancelNextCallback(), l === vi) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var u = this.props.nodeRef ? this.props.nodeRef.current : Al.findDOMNode(this);
          u && uE(u);
        }
        this.performEnter(s);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === yi && this.setState({
      status: Cs
    });
  }, r.performEnter = function(s) {
    var l = this, u = this.props.enter, d = this.context ? this.context.isMounting : s, p = this.props.nodeRef ? [d] : [Al.findDOMNode(this), d], f = p[0], g = p[1], m = this.getTimeouts(), w = d ? m.appear : m.enter;
    if (!s && !u || uv.disabled) {
      this.safeSetState({
        status: fo
      }, function() {
        l.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, g), this.safeSetState({
      status: vi
    }, function() {
      l.props.onEntering(f, g), l.onTransitionEnd(w, function() {
        l.safeSetState({
          status: fo
        }, function() {
          l.props.onEntered(f, g);
        });
      });
    });
  }, r.performExit = function() {
    var s = this, l = this.props.exit, u = this.getTimeouts(), d = this.props.nodeRef ? void 0 : Al.findDOMNode(this);
    if (!l || uv.disabled) {
      this.safeSetState({
        status: yi
      }, function() {
        s.props.onExited(d);
      });
      return;
    }
    this.props.onExit(d), this.safeSetState({
      status: Xf
    }, function() {
      s.props.onExiting(d), s.onTransitionEnd(u.exit, function() {
        s.safeSetState({
          status: yi
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
    var u = this.props.nodeRef ? this.props.nodeRef.current : Al.findDOMNode(this), d = s == null && !this.props.addEndListener;
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
    if (s === Cs)
      return null;
    var l = this.props, u = l.children;
    l.in, l.mountOnEnter, l.unmountOnExit, l.appear, l.enter, l.exit, l.timeout, l.addEndListener, l.onEnter, l.onEntering, l.onEntered, l.onExit, l.onExiting, l.onExited, l.nodeRef;
    var d = qS(l, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Ut.createElement(yu.Provider, {
        value: null
      }, typeof u == "function" ? u(s, d) : Ut.cloneElement(Ut.Children.only(u), d))
    );
  }, t;
})(Ut.Component);
Zn.contextType = yu;
Zn.propTypes = {};
function uo() {
}
Zn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: uo,
  onEntering: uo,
  onEntered: uo,
  onExit: uo,
  onExiting: uo,
  onExited: uo
};
Zn.UNMOUNTED = Cs;
Zn.EXITED = yi;
Zn.ENTERING = vi;
Zn.ENTERED = fo;
Zn.EXITING = Xf;
function cE(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function th(e, t) {
  var r = function(l) {
    return t && b.isValidElement(l) ? t(l) : l;
  }, o = /* @__PURE__ */ Object.create(null);
  return e && b.Children.map(e, function(s) {
    return s;
  }).forEach(function(s) {
    o[s.key] = r(s);
  }), o;
}
function dE(e, t) {
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
function xi(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function fE(e, t) {
  return th(e.children, function(r) {
    return b.cloneElement(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: xi(r, "appear", e),
      enter: xi(r, "enter", e),
      exit: xi(r, "exit", e)
    });
  });
}
function pE(e, t, r) {
  var o = th(e.children), s = dE(t, o);
  return Object.keys(s).forEach(function(l) {
    var u = s[l];
    if (b.isValidElement(u)) {
      var d = l in t, p = l in o, f = t[l], g = b.isValidElement(f) && !f.props.in;
      p && (!d || g) ? s[l] = b.cloneElement(u, {
        onExited: r.bind(null, u),
        in: !0,
        exit: xi(u, "exit", e),
        enter: xi(u, "enter", e)
      }) : !p && d && !g ? s[l] = b.cloneElement(u, {
        in: !1
      }) : p && d && b.isValidElement(f) && (s[l] = b.cloneElement(u, {
        onExited: r.bind(null, u),
        in: f.props.in,
        exit: xi(u, "exit", e),
        enter: xi(u, "enter", e)
      }));
    }
  }), s;
}
var hE = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, gE = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, nh = /* @__PURE__ */ (function(e) {
  KS(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = l.handleExited.bind(cE(l));
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
      children: p ? fE(s, d) : pE(s, u, d),
      firstRender: !1
    };
  }, r.handleExited = function(s, l) {
    var u = th(this.props.children);
    s.key in u || (s.props.onExited && s.props.onExited(l), this.mounted && this.setState(function(d) {
      var p = pu({}, d.children);
      return delete p[s.key], {
        children: p
      };
    }));
  }, r.render = function() {
    var s = this.props, l = s.component, u = s.childFactory, d = qS(s, ["component", "childFactory"]), p = this.state.contextValue, f = hE(this.state.children).map(u);
    return delete d.appear, delete d.enter, delete d.exit, l === null ? /* @__PURE__ */ Ut.createElement(yu.Provider, {
      value: p
    }, f) : /* @__PURE__ */ Ut.createElement(yu.Provider, {
      value: p
    }, /* @__PURE__ */ Ut.createElement(l, d, f));
  }, t;
})(Ut.Component);
nh.propTypes = {};
nh.defaultProps = gE;
const YS = (e) => e.scrollTop;
function vu(e, t) {
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
function mE(e) {
  return gt("MuiPaper", e);
}
Xe("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const yE = (e) => {
  const {
    square: t,
    elevation: r,
    variant: o,
    classes: s
  } = e, l = {
    root: ["root", o, !t && "rounded", o === "elevation" && `elevation${r}`]
  };
  return bt(l, mE, s);
}, vE = Me("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], !r.square && t.rounded, r.variant === "elevation" && t[`elevation${r.elevation}`]];
  }
})(bn(({
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
}))), JS = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    props: t,
    name: "MuiPaper"
  }), s = eh(), {
    className: l,
    component: u = "div",
    elevation: d = 1,
    square: p = !1,
    variant: f = "elevation",
    ...g
  } = o, m = {
    ...o,
    component: u,
    elevation: d,
    square: p,
    variant: f
  }, w = yE(m);
  return /* @__PURE__ */ j.jsx(vE, {
    as: u,
    ownerState: m,
    className: Re(w.root, l),
    ref: r,
    ...g,
    style: {
      ...f === "elevation" && {
        "--Paper-shadow": (s.vars || s).shadows[d],
        ...s.vars && {
          "--Paper-overlay": s.vars.overlays?.[d]
        },
        ...!s.vars && s.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${Rt("#fff", Gf(d))}, ${Rt("#fff", Gf(d))})`
        }
      },
      ...g.style
    }
  });
});
function wn(e, t) {
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
    slotProps: m = {
      [e]: void 0
    },
    ...w
  } = l, k = g[e] || o, S = AS(m[e], s), {
    props: {
      component: _,
      ...x
    },
    internalRef: $
  } = MS({
    className: r,
    ...p,
    externalForwardedProps: e === "root" ? w : void 0,
    externalSlotProps: S
  }), N = Ln($, S?.ref, t.ref), C = e === "root" ? _ || f : _, R = TS(k, {
    ...e === "root" && !f && !g[e] && u,
    ...e !== "root" && !g[e] && u,
    ...x,
    ...C && !d && {
      as: C
    },
    ...C && d && {
      component: C
    },
    ref: N
  }, s);
  return [k, R];
}
class wu {
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new wu();
  }
  static use() {
    const t = ES(wu.create).current, [r, o] = b.useState(!1);
    return t.shouldMount = r, t.setShouldMount = o, b.useEffect(t.mountEffect, [r]), t;
  }
  constructor() {
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  mount() {
    return this.mounted || (this.mounted = SE(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
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
function wE() {
  return wu.use();
}
function SE() {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}
function bE(e) {
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
  } = e, [g, m] = b.useState(!1), w = Re(t, r.ripple, r.rippleVisible, o && r.ripplePulsate), k = {
    width: u,
    height: u,
    top: -(u / 2) + l,
    left: -(u / 2) + s
  }, S = Re(r.child, g && r.childLeaving, o && r.childPulsate);
  return !d && !g && m(!0), b.useEffect(() => {
    if (!d && p != null) {
      const _ = setTimeout(p, f);
      return () => {
        clearTimeout(_);
      };
    }
  }, [p, d, f]), /* @__PURE__ */ j.jsx("span", {
    className: w,
    style: k,
    children: /* @__PURE__ */ j.jsx("span", {
      className: S
    })
  });
}
const yn = Xe("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), Zf = 550, _E = 80, xE = Ii`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, kE = Ii`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, CE = Ii`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, EE = Me("span", {
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
}), PE = Me(bE, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${yn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${xE};
    animation-duration: ${Zf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${yn.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${yn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${yn.childLeaving} {
    opacity: 0;
    animation-name: ${kE};
    animation-duration: ${Zf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${yn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${CE};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, RE = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: s = !1,
    classes: l = {},
    className: u,
    ...d
  } = o, [p, f] = b.useState([]), g = b.useRef(0), m = b.useRef(null);
  b.useEffect(() => {
    m.current && (m.current(), m.current = null);
  }, [p]);
  const w = b.useRef(!1), k = PS(), S = b.useRef(null), _ = b.useRef(null), x = b.useCallback((R) => {
    const {
      pulsate: E,
      rippleX: M,
      rippleY: A,
      rippleSize: I,
      cb: L
    } = R;
    f((v) => [...v, /* @__PURE__ */ j.jsx(PE, {
      classes: {
        ripple: Re(l.ripple, yn.ripple),
        rippleVisible: Re(l.rippleVisible, yn.rippleVisible),
        ripplePulsate: Re(l.ripplePulsate, yn.ripplePulsate),
        child: Re(l.child, yn.child),
        childLeaving: Re(l.childLeaving, yn.childLeaving),
        childPulsate: Re(l.childPulsate, yn.childPulsate)
      },
      timeout: Zf,
      pulsate: E,
      rippleX: M,
      rippleY: A,
      rippleSize: I
    }, g.current)]), g.current += 1, m.current = L;
  }, [l]), $ = b.useCallback((R = {}, E = {}, M = () => {
  }) => {
    const {
      pulsate: A = !1,
      center: I = s || E.pulsate,
      fakeElement: L = !1
      // For test purposes
    } = E;
    if (R?.type === "mousedown" && w.current) {
      w.current = !1;
      return;
    }
    R?.type === "touchstart" && (w.current = !0);
    const v = L ? null : _.current, P = v ? v.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let O, F, B;
    if (I || R === void 0 || R.clientX === 0 && R.clientY === 0 || !R.clientX && !R.touches)
      O = Math.round(P.width / 2), F = Math.round(P.height / 2);
    else {
      const {
        clientX: z,
        clientY: V
      } = R.touches && R.touches.length > 0 ? R.touches[0] : R;
      O = Math.round(z - P.left), F = Math.round(V - P.top);
    }
    if (I)
      B = Math.sqrt((2 * P.width ** 2 + P.height ** 2) / 3), B % 2 === 0 && (B += 1);
    else {
      const z = Math.max(Math.abs((v ? v.clientWidth : 0) - O), O) * 2 + 2, V = Math.max(Math.abs((v ? v.clientHeight : 0) - F), F) * 2 + 2;
      B = Math.sqrt(z ** 2 + V ** 2);
    }
    R?.touches ? S.current === null && (S.current = () => {
      x({
        pulsate: A,
        rippleX: O,
        rippleY: F,
        rippleSize: B,
        cb: M
      });
    }, k.start(_E, () => {
      S.current && (S.current(), S.current = null);
    })) : x({
      pulsate: A,
      rippleX: O,
      rippleY: F,
      rippleSize: B,
      cb: M
    });
  }, [s, x, k]), N = b.useCallback(() => {
    $({}, {
      pulsate: !0
    });
  }, [$]), C = b.useCallback((R, E) => {
    if (k.clear(), R?.type === "touchend" && S.current) {
      S.current(), S.current = null, k.start(0, () => {
        C(R, E);
      });
      return;
    }
    S.current = null, f((M) => M.length > 0 ? M.slice(1) : M), m.current = E;
  }, [k]);
  return b.useImperativeHandle(r, () => ({
    pulsate: N,
    start: $,
    stop: C
  }), [N, $, C]), /* @__PURE__ */ j.jsx(EE, {
    className: Re(yn.root, l.root, u),
    ref: _,
    ...d,
    children: /* @__PURE__ */ j.jsx(nh, {
      component: null,
      exit: !0,
      children: p
    })
  });
});
function TE(e) {
  return gt("MuiButtonBase", e);
}
const $E = Xe("MuiButtonBase", ["root", "disabled", "focusVisible"]), ME = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: o,
    classes: s
  } = e, u = bt({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, TE, s);
  return r && o && (u.root += ` ${o}`), u;
}, AE = Me("button", {
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
  [`&.${$E.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Xu = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    disableTouchRipple: m = !1,
    focusRipple: w = !1,
    focusVisibleClassName: k,
    LinkComponent: S = "a",
    onBlur: _,
    onClick: x,
    onContextMenu: $,
    onDragLeave: N,
    onFocus: C,
    onFocusVisible: R,
    onKeyDown: E,
    onKeyUp: M,
    onMouseDown: A,
    onMouseLeave: I,
    onMouseUp: L,
    onTouchEnd: v,
    onTouchMove: P,
    onTouchStart: O,
    tabIndex: F = 0,
    TouchRippleProps: B,
    touchRippleRef: z,
    type: V,
    ...G
  } = o, U = b.useRef(null), H = wE(), K = Ln(H.ref, z), [D, Y] = b.useState(!1);
  f && D && Y(!1), b.useImperativeHandle(s, () => ({
    focusVisible: () => {
      Y(!0), U.current.focus();
    }
  }), []);
  const re = H.shouldMount && !g && !f;
  b.useEffect(() => {
    D && w && !g && H.pulsate();
  }, [g, w, D, H]);
  const te = fr(H, "start", A, m), se = fr(H, "stop", $, m), le = fr(H, "stop", N, m), de = fr(H, "stop", L, m), he = fr(H, "stop", (xe) => {
    D && xe.preventDefault(), I && I(xe);
  }, m), fe = fr(H, "start", O, m), ue = fr(H, "stop", v, m), we = fr(H, "stop", P, m), _e = fr(H, "stop", (xe) => {
    qy(xe.target) || Y(!1), _ && _(xe);
  }, !1), qe = go((xe) => {
    U.current || (U.current = xe.currentTarget), qy(xe.target) && (Y(!0), R && R(xe)), C && C(xe);
  }), je = () => {
    const xe = U.current;
    return p && p !== "button" && !(xe.tagName === "A" && xe.href);
  }, at = go((xe) => {
    w && !xe.repeat && D && xe.key === " " && H.stop(xe, () => {
      H.start(xe);
    }), xe.target === xe.currentTarget && je() && xe.key === " " && xe.preventDefault(), E && E(xe), xe.target === xe.currentTarget && je() && xe.key === "Enter" && !f && (xe.preventDefault(), x && x(xe));
  }), dt = go((xe) => {
    w && xe.key === " " && D && !xe.defaultPrevented && H.stop(xe, () => {
      H.pulsate(xe);
    }), M && M(xe), x && xe.target === xe.currentTarget && je() && xe.key === " " && !xe.defaultPrevented && x(xe);
  });
  let Ze = p;
  Ze === "button" && (G.href || G.to) && (Ze = S);
  const De = {};
  Ze === "button" ? (De.type = V === void 0 ? "button" : V, De.disabled = f) : (!G.href && !G.to && (De.role = "button"), f && (De["aria-disabled"] = f));
  const $t = Ln(r, U), ft = {
    ...o,
    centerRipple: l,
    component: p,
    disabled: f,
    disableRipple: g,
    disableTouchRipple: m,
    focusRipple: w,
    tabIndex: F,
    focusVisible: D
  }, Ue = ME(ft);
  return /* @__PURE__ */ j.jsxs(AE, {
    as: Ze,
    className: Re(Ue.root, d),
    ownerState: ft,
    onBlur: _e,
    onClick: x,
    onContextMenu: se,
    onFocus: qe,
    onKeyDown: at,
    onKeyUp: dt,
    onMouseDown: te,
    onMouseLeave: he,
    onMouseUp: de,
    onDragLeave: le,
    onTouchEnd: ue,
    onTouchMove: we,
    onTouchStart: fe,
    ref: $t,
    tabIndex: f ? -1 : F,
    type: V,
    ...De,
    ...G,
    children: [u, re ? /* @__PURE__ */ j.jsx(RE, {
      ref: K,
      center: l,
      ...B
    }) : null]
  });
});
function fr(e, t, r, o = !1) {
  return go((s) => (r && r(s), o || e[t](s), !0));
}
function IE(e) {
  return typeof e.main == "string";
}
function NE(e, t = []) {
  if (!IE(e))
    return !1;
  for (const r of t)
    if (!e.hasOwnProperty(r) || typeof e[r] != "string")
      return !1;
  return !0;
}
function Ti(e = []) {
  return ([, t]) => t && NE(t, e);
}
function OE(e) {
  return gt("MuiCircularProgress", e);
}
Xe("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "circle", "circleDeterminate", "circleIndeterminate", "circleDisableShrink"]);
const Vr = 44, ep = Ii`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, tp = Ii`
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
`, LE = typeof ep != "string" ? na`
        animation: ${ep} 1.4s linear infinite;
      ` : null, DE = typeof tp != "string" ? na`
        animation: ${tp} 1.4s ease-in-out infinite;
      ` : null, FE = (e) => {
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
  return bt(l, OE, t);
}, jE = Me("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`color${Pe(r.color)}`]];
  }
})(bn(({
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
    style: LE || {
      animation: `${ep} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), zE = Me("svg", {
  name: "MuiCircularProgress",
  slot: "Svg",
  overridesResolver: (e, t) => t.svg
})({
  display: "block"
  // Keeps the progress centered
}), BE = Me("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.circle, t[`circle${Pe(r.variant)}`], r.disableShrink && t.circleDisableShrink];
  }
})(bn(({
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
    style: DE || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${tp} 1.4s ease-in-out infinite`
    }
  }]
}))), XS = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    variant: m = "indeterminate",
    ...w
  } = o, k = {
    ...o,
    color: l,
    disableShrink: u,
    size: d,
    thickness: f,
    value: g,
    variant: m
  }, S = FE(k), _ = {}, x = {}, $ = {};
  if (m === "determinate") {
    const N = 2 * Math.PI * ((Vr - f) / 2);
    _.strokeDasharray = N.toFixed(3), $["aria-valuenow"] = Math.round(g), _.strokeDashoffset = `${((100 - g) / 100 * N).toFixed(3)}px`, x.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ j.jsx(jE, {
    className: Re(S.root, s),
    style: {
      width: d,
      height: d,
      ...x,
      ...p
    },
    ownerState: k,
    ref: r,
    role: "progressbar",
    ...$,
    ...w,
    children: /* @__PURE__ */ j.jsx(zE, {
      className: S.svg,
      ownerState: k,
      viewBox: `${Vr / 2} ${Vr / 2} ${Vr} ${Vr}`,
      children: /* @__PURE__ */ j.jsx(BE, {
        className: S.circle,
        style: _,
        ownerState: k,
        cx: Vr,
        cy: Vr,
        r: (Vr - f) / 2,
        fill: "none",
        strokeWidth: f
      })
    })
  });
});
function WE(e) {
  return gt("MuiIconButton", e);
}
const cv = Xe("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), UE = (e) => {
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
  return bt(d, WE, t);
}, VE = Me(Xu, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.loading && t.loading, r.color !== "default" && t[`color${Pe(r.color)}`], r.edge && t[`edge${Pe(r.edge)}`], t[`size${Pe(r.size)}`]];
  }
})(bn(({
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
      "--IconButton-hoverBg": e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette.action.active, e.palette.action.hoverOpacity),
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
})), bn(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${(e.vars || e).palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt((e.vars || e).palette[t].main, e.palette.action.hoverOpacity)
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
  [`&.${cv.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${cv.loading}`]: {
    color: "transparent"
  }
}))), HE = Me("span", {
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
})), Ws = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    id: m,
    loading: w = null,
    loadingIndicator: k,
    ...S
  } = o, _ = Kp(m), x = k ?? /* @__PURE__ */ j.jsx(XS, {
    "aria-labelledby": _,
    color: "inherit",
    size: 16
  }), $ = {
    ...o,
    edge: s,
    color: d,
    disabled: p,
    disableFocusRipple: f,
    loading: w,
    loadingIndicator: x,
    size: g
  }, N = UE($);
  return /* @__PURE__ */ j.jsxs(VE, {
    id: w ? _ : m,
    className: Re(N.root, u),
    centerRipple: !0,
    focusRipple: !f,
    disabled: p || w,
    ref: r,
    ...S,
    ownerState: $,
    children: [typeof w == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ j.jsx("span", {
      className: N.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ j.jsx(HE, {
        className: N.loadingIndicator,
        ownerState: $,
        children: w && x
      })
    }), l]
  });
});
function qE(e) {
  return gt("MuiTypography", e);
}
Xe("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const KE = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, QE = nE(), GE = (e) => {
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
  return bt(d, qE, u);
}, YE = Me("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.variant && t[r.variant], r.align !== "inherit" && t[`align${Pe(r.align)}`], r.noWrap && t.noWrap, r.gutterBottom && t.gutterBottom, r.paragraph && t.paragraph];
  }
})(bn(({
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
  })), ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
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
}))), dv = {
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
}, xo = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const {
    color: o,
    ...s
  } = mt({
    props: t,
    name: "MuiTypography"
  }), l = !KE[o], u = QE({
    ...s,
    ...l && {
      color: o
    }
  }), {
    align: d = "inherit",
    className: p,
    component: f,
    gutterBottom: g = !1,
    noWrap: m = !1,
    paragraph: w = !1,
    variant: k = "body1",
    variantMapping: S = dv,
    ..._
  } = u, x = {
    ...u,
    align: d,
    color: o,
    className: p,
    component: f,
    gutterBottom: g,
    noWrap: m,
    paragraph: w,
    variant: k,
    variantMapping: S
  }, $ = f || (w ? "p" : S[k] || dv[k]) || "span", N = GE(x);
  return /* @__PURE__ */ j.jsx(YE, {
    as: $,
    ref: r,
    className: Re(N.root, p),
    ..._,
    ownerState: x,
    style: {
      ...d !== "inherit" && {
        "--Typography-textAlign": d
      },
      ..._.style
    }
  });
});
function JE(e) {
  return typeof e == "function" ? e() : e;
}
const XE = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const {
    children: o,
    container: s,
    disablePortal: l = !1
  } = t, [u, d] = b.useState(null), p = Ln(/* @__PURE__ */ b.isValidElement(o) ? Ju(o) : null, r);
  if (Pi(() => {
    l || d(JE(s) || document.body);
  }, [s, l]), Pi(() => {
    if (u && !l)
      return Wy(r, u), () => {
        Wy(r, null);
      };
  }, [r, u, l]), l) {
    if (/* @__PURE__ */ b.isValidElement(o)) {
      const f = {
        ref: p
      };
      return /* @__PURE__ */ b.cloneElement(o, f);
    }
    return o;
  }
  return u && /* @__PURE__ */ GS.createPortal(o, u);
});
function ZE(e) {
  return typeof e == "string";
}
function eP({
  props: e,
  states: t,
  muiFormControl: r
}) {
  return t.reduce((o, s) => (o[s] = e[s], r && typeof e[s] > "u" && (o[s] = r[s]), o), {});
}
const tP = /* @__PURE__ */ b.createContext(void 0);
function ZS() {
  return b.useContext(tP);
}
const nP = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, rP = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = eh(), s = {
    enter: o.transitions.duration.enteringScreen,
    exit: o.transitions.duration.leavingScreen
  }, {
    addEndListener: l,
    appear: u = !0,
    children: d,
    easing: p,
    in: f,
    onEnter: g,
    onEntered: m,
    onEntering: w,
    onExit: k,
    onExited: S,
    onExiting: _,
    style: x,
    timeout: $ = s,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = Zn,
    ...C
  } = t, R = b.useRef(null), E = Ln(R, Ju(d), r), M = (B) => (z) => {
    if (B) {
      const V = R.current;
      z === void 0 ? B(V) : B(V, z);
    }
  }, A = M(w), I = M((B, z) => {
    YS(B);
    const V = vu({
      style: x,
      timeout: $,
      easing: p
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = o.transitions.create("opacity", V), B.style.transition = o.transitions.create("opacity", V), g && g(B, z);
  }), L = M(m), v = M(_), P = M((B) => {
    const z = vu({
      style: x,
      timeout: $,
      easing: p
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = o.transitions.create("opacity", z), B.style.transition = o.transitions.create("opacity", z), k && k(B);
  }), O = M(S), F = (B) => {
    l && l(R.current, B);
  };
  return /* @__PURE__ */ j.jsx(N, {
    appear: u,
    in: f,
    nodeRef: R,
    onEnter: I,
    onEntered: L,
    onEntering: A,
    onExit: P,
    onExited: O,
    onExiting: v,
    addEndListener: F,
    timeout: $,
    ...C,
    children: (B, {
      ownerState: z,
      ...V
    }) => /* @__PURE__ */ b.cloneElement(d, {
      style: {
        opacity: 0,
        visibility: B === "exited" && !f ? "hidden" : void 0,
        ...nP[B],
        ...x,
        ...d.props.style
      },
      ref: E,
      ...V
    })
  });
});
function iP(e) {
  return gt("MuiBackdrop", e);
}
Xe("MuiBackdrop", ["root", "invisible"]);
const oP = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return bt({
    root: ["root", r && "invisible"]
  }, iP, t);
}, sP = Me("div", {
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
}), aP = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    slotProps: m = {},
    slots: w = {},
    TransitionComponent: k,
    transitionDuration: S,
    ..._
  } = o, x = {
    ...o,
    component: u,
    invisible: d
  }, $ = oP(x), N = {
    transition: k,
    root: f.Root,
    ...w
  }, C = {
    ...g,
    ...m
  }, R = {
    slots: N,
    slotProps: C
  }, [E, M] = wn("root", {
    elementType: sP,
    externalForwardedProps: R,
    className: Re($.root, l),
    ownerState: x
  }), [A, I] = wn("transition", {
    elementType: rP,
    externalForwardedProps: R,
    ownerState: x
  });
  return /* @__PURE__ */ j.jsx(A, {
    in: p,
    timeout: S,
    ..._,
    ...I,
    children: /* @__PURE__ */ j.jsx(E, {
      "aria-hidden": !0,
      ...M,
      classes: $,
      ref: r,
      children: s
    })
  });
}), lP = Xe("MuiBox", ["root"]), uP = sa(), ln = Ek({
  themeId: Gn,
  defaultTheme: uP,
  defaultClassName: lP.root,
  generateClassName: bS.generate
});
function cP(e) {
  return gt("MuiButton", e);
}
const hi = Xe("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), dP = /* @__PURE__ */ b.createContext({}), fP = /* @__PURE__ */ b.createContext(void 0), pP = (e) => {
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
  }, g = bt(f, cP, p);
  return {
    ...p,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...g
  };
}, e0 = [{
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
}], hP = Me(Xu, {
  shouldForwardProp: (e) => _o(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`${r.variant}${Pe(r.color)}`], t[`size${Pe(r.size)}`], t[`${r.variant}Size${Pe(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth, r.loading && t.loading];
  }
})(bn(({
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
    [`&.${hi.disabled}`]: {
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
        [`&.${hi.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${hi.disabled}`]: {
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
        [`&.${hi.disabled}`]: {
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
    }, ...Object.entries(e.palette).filter(Ti()).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        "--variant-textColor": (e.vars || e).palette[o].main,
        "--variant-outlinedColor": (e.vars || e).palette[o].main,
        "--variant-outlinedBorder": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / 0.5)` : Rt(e.palette[o].main, 0.5),
        "--variant-containedColor": (e.vars || e).palette[o].contrastText,
        "--variant-containedBg": (e.vars || e).palette[o].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (e.vars || e).palette[o].dark,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette[o].main, e.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (e.vars || e).palette[o].main,
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette[o].main, e.palette.action.hoverOpacity)
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
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette.text.primary, e.palette.action.hoverOpacity),
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette.text.primary, e.palette.action.hoverOpacity)
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
        [`&.${hi.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${hi.disabled}`]: {
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
        [`&.${hi.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), gP = Me("span", {
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
  }, ...e0]
})), mP = Me("span", {
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
  }, ...e0]
})), yP = Me("span", {
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
})), fv = Me("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder",
  overridesResolver: (e, t) => t.loadingIconPlaceholder
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), Xn = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = b.useContext(dP), s = b.useContext(fP), l = mu(o, t), u = mt({
    props: l,
    name: "MuiButton"
  }), {
    children: d,
    color: p = "primary",
    component: f = "button",
    className: g,
    disabled: m = !1,
    disableElevation: w = !1,
    disableFocusRipple: k = !1,
    endIcon: S,
    focusVisibleClassName: _,
    fullWidth: x = !1,
    id: $,
    loading: N = null,
    loadingIndicator: C,
    loadingPosition: R = "center",
    size: E = "medium",
    startIcon: M,
    type: A,
    variant: I = "text",
    ...L
  } = u, v = Kp($), P = C ?? /* @__PURE__ */ j.jsx(XS, {
    "aria-labelledby": v,
    color: "inherit",
    size: 16
  }), O = {
    ...u,
    color: p,
    component: f,
    disabled: m,
    disableElevation: w,
    disableFocusRipple: k,
    fullWidth: x,
    loading: N,
    loadingIndicator: P,
    loadingPosition: R,
    size: E,
    type: A,
    variant: I
  }, F = pP(O), B = (M || N && R === "start") && /* @__PURE__ */ j.jsx(gP, {
    className: F.startIcon,
    ownerState: O,
    children: M || /* @__PURE__ */ j.jsx(fv, {
      className: F.loadingIconPlaceholder,
      ownerState: O
    })
  }), z = (S || N && R === "end") && /* @__PURE__ */ j.jsx(mP, {
    className: F.endIcon,
    ownerState: O,
    children: S || /* @__PURE__ */ j.jsx(fv, {
      className: F.loadingIconPlaceholder,
      ownerState: O
    })
  }), V = s || "", G = typeof N == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ j.jsx("span", {
      className: F.loadingWrapper,
      style: {
        display: "contents"
      },
      children: N && /* @__PURE__ */ j.jsx(yP, {
        className: F.loadingIndicator,
        ownerState: O,
        children: P
      })
    })
  ) : null;
  return /* @__PURE__ */ j.jsxs(hP, {
    ownerState: O,
    className: Re(o.className, F.root, g, V),
    component: f,
    disabled: m || N,
    focusRipple: !k,
    focusVisibleClassName: Re(F.focusVisible, _),
    ref: r,
    type: A,
    id: N ? v : $,
    ...L,
    classes: F,
    children: [B, R !== "end" && G, d, R === "end" && G, z]
  });
});
function vP(e) {
  return gt("MuiCard", e);
}
Xe("MuiCard", ["root"]);
const wP = (e) => {
  const {
    classes: t
  } = e;
  return bt({
    root: ["root"]
  }, vP, t);
}, SP = Me(JS, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  overflow: "hidden"
}), aa = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    props: t,
    name: "MuiCard"
  }), {
    className: s,
    raised: l = !1,
    ...u
  } = o, d = {
    ...o,
    raised: l
  }, p = wP(d);
  return /* @__PURE__ */ j.jsx(SP, {
    className: Re(p.root, s),
    elevation: l ? 8 : void 0,
    ref: r,
    ownerState: d,
    ...u
  });
});
function bP(e) {
  return gt("PrivateSwitchBase", e);
}
Xe("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const _P = (e) => {
  const {
    classes: t,
    checked: r,
    disabled: o,
    edge: s
  } = e, l = {
    root: ["root", r && "checked", o && "disabled", s && `edge${Pe(s)}`],
    input: ["input"]
  };
  return bt(l, bP, t);
}, xP = Me(Xu, {
  name: "MuiSwitchBase"
})({
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
}), kP = Me("input", {
  name: "MuiSwitchBase",
  shouldForwardProp: _o
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
}), CP = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const {
    autoFocus: o,
    checked: s,
    checkedIcon: l,
    defaultChecked: u,
    disabled: d,
    disableFocusRipple: p = !1,
    edge: f = !1,
    icon: g,
    id: m,
    inputProps: w,
    inputRef: k,
    name: S,
    onBlur: _,
    onChange: x,
    onFocus: $,
    readOnly: N,
    required: C = !1,
    tabIndex: R,
    type: E,
    value: M,
    slots: A = {},
    slotProps: I = {},
    ...L
  } = t, [v, P] = Vk({
    controlled: s,
    default: !!u,
    name: "SwitchBase",
    state: "checked"
  }), O = ZS(), F = (se) => {
    $ && $(se), O && O.onFocus && O.onFocus(se);
  }, B = (se) => {
    _ && _(se), O && O.onBlur && O.onBlur(se);
  }, z = (se) => {
    if (se.nativeEvent.defaultPrevented)
      return;
    const le = se.target.checked;
    P(le), x && x(se, le);
  };
  let V = d;
  O && typeof V > "u" && (V = O.disabled);
  const G = E === "checkbox" || E === "radio", U = {
    ...t,
    checked: v,
    disabled: V,
    disableFocusRipple: p,
    edge: f
  }, H = _P(U), K = {
    slots: A,
    slotProps: {
      input: w,
      ...I
    }
  }, [D, Y] = wn("root", {
    ref: r,
    elementType: xP,
    className: H.root,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...K,
      component: "span",
      ...L
    },
    getSlotProps: (se) => ({
      ...se,
      onFocus: (le) => {
        se.onFocus?.(le), F(le);
      },
      onBlur: (le) => {
        se.onBlur?.(le), B(le);
      }
    }),
    ownerState: U,
    additionalProps: {
      centerRipple: !0,
      focusRipple: !p,
      disabled: V,
      role: void 0,
      tabIndex: null
    }
  }), [re, te] = wn("input", {
    ref: k,
    elementType: kP,
    className: H.input,
    externalForwardedProps: K,
    getSlotProps: (se) => ({
      onChange: (le) => {
        se.onChange?.(le), z(le);
      }
    }),
    ownerState: U,
    additionalProps: {
      autoFocus: o,
      checked: s,
      defaultChecked: u,
      disabled: V,
      id: G ? m : void 0,
      name: S,
      readOnly: N,
      required: C,
      tabIndex: R,
      type: E,
      ...E === "checkbox" && M === void 0 ? {} : {
        value: M
      }
    }
  });
  return /* @__PURE__ */ j.jsxs(D, {
    ...Y,
    children: [/* @__PURE__ */ j.jsx(re, {
      ...te
    }), v ? l : g]
  });
}), EP = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), PP = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), RP = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function TP(e) {
  return gt("MuiCheckbox", e);
}
const vf = Xe("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), $P = (e) => {
  const {
    classes: t,
    indeterminate: r,
    color: o,
    size: s
  } = e, l = {
    root: ["root", r && "indeterminate", `color${Pe(o)}`, `size${Pe(s)}`]
  }, u = bt(l, TP, t);
  return {
    ...t,
    // forward the disabled and checked classes to the SwitchBase
    ...u
  };
}, MP = Me(CP, {
  shouldForwardProp: (e) => _o(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.indeterminate && t.indeterminate, t[`size${Pe(r.size)}`], r.color !== "default" && t[`color${Pe(r.color)}`]];
  }
})(bn(({
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
        backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette.action.active, e.palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
    props: {
      color: t,
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.vars ? `rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Rt(e.palette[t].main, e.palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(e.palette).filter(Ti()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${vf.checked}, &.${vf.indeterminate}`]: {
        color: (e.vars || e).palette[t].main
      },
      [`&.${vf.disabled}`]: {
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
}))), AP = /* @__PURE__ */ j.jsx(PP, {}), IP = /* @__PURE__ */ j.jsx(EP, {}), NP = /* @__PURE__ */ j.jsx(RP, {}), OP = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: s = AP,
    color: l = "primary",
    icon: u = IP,
    indeterminate: d = !1,
    indeterminateIcon: p = NP,
    inputProps: f,
    size: g = "medium",
    disableRipple: m = !1,
    className: w,
    slots: k = {},
    slotProps: S = {},
    ..._
  } = o, x = d ? p : u, $ = d ? p : s, N = {
    ...o,
    disableRipple: m,
    color: l,
    indeterminate: d,
    size: g
  }, C = $P(N), R = S.input ?? f, [E, M] = wn("root", {
    ref: r,
    elementType: MP,
    className: Re(C.root, w),
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      slots: k,
      slotProps: S,
      ..._
    },
    ownerState: N,
    additionalProps: {
      type: "checkbox",
      icon: /* @__PURE__ */ b.cloneElement(x, {
        fontSize: x.props.fontSize ?? g
      }),
      checkedIcon: /* @__PURE__ */ b.cloneElement($, {
        fontSize: $.props.fontSize ?? g
      }),
      disableRipple: m,
      slots: k,
      slotProps: {
        input: HS(typeof R == "function" ? R(N) : R, {
          "data-indeterminate": d
        })
      }
    }
  });
  return /* @__PURE__ */ j.jsx(E, {
    ...M,
    classes: C
  });
}), np = typeof VS({}) == "function", LP = (e, t) => ({
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
}), DP = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), t0 = (e, t = !1) => {
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
    html: LP(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...DP(e),
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
}, ou = "mui-ecs", FP = (e) => {
  const t = t0(e, !1), r = Array.isArray(t) ? t[0] : t;
  return !e.vars && r && (r.html[`:root:has(${ou})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([o, s]) => {
    const l = e.getColorSchemeSelector(o);
    l.startsWith("@") ? r[l] = {
      [`:root:not(:has(.${ou}))`]: {
        colorScheme: s.palette?.mode
      }
    } : r[l.replace(/\s*&/, "")] = {
      [`&:not(:has(.${ou}))`]: {
        colorScheme: s.palette?.mode
      }
    };
  }), t;
}, jP = VS(np ? ({
  theme: e,
  enableColorScheme: t
}) => t0(e, t) : ({
  theme: e
}) => FP(e));
function zP(e) {
  const t = mt({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: r,
    enableColorScheme: o = !1
  } = t;
  return /* @__PURE__ */ j.jsxs(b.Fragment, {
    children: [np && /* @__PURE__ */ j.jsx(jP, {
      enableColorScheme: o
    }), !np && !o && /* @__PURE__ */ j.jsx("span", {
      className: ou,
      style: {
        display: "none"
      }
    }), r]
  });
}
function BP(e) {
  const t = Jn(e);
  return t.body === e ? Ri(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Ms(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function pv(e) {
  return parseInt(Ri(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function WP(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), o = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || o;
}
function hv(e, t, r, o, s) {
  const l = [t, r, ...o];
  [].forEach.call(e.children, (u) => {
    const d = !l.includes(u), p = !WP(u);
    d && p && Ms(u, s);
  });
}
function wf(e, t) {
  let r = -1;
  return e.some((o, s) => t(o) ? (r = s, !0) : !1), r;
}
function UP(e, t) {
  const r = [], o = e.container;
  if (!t.disableScrollLock) {
    if (BP(o)) {
      const u = RS(Ri(o));
      r.push({
        value: o.style.paddingRight,
        property: "padding-right",
        el: o
      }), o.style.paddingRight = `${pv(o) + u}px`;
      const d = Jn(o).querySelectorAll(".mui-fixed");
      [].forEach.call(d, (p) => {
        r.push({
          value: p.style.paddingRight,
          property: "padding-right",
          el: p
        }), p.style.paddingRight = `${pv(p) + u}px`;
      });
    }
    let l;
    if (o.parentNode instanceof DocumentFragment)
      l = Jn(o).body;
    else {
      const u = o.parentElement, d = Ri(o);
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
function VP(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class HP {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, r) {
    let o = this.modals.indexOf(t);
    if (o !== -1)
      return o;
    o = this.modals.length, this.modals.push(t), t.modalRef && Ms(t.modalRef, !1);
    const s = VP(r);
    hv(r, t.mount, t.modalRef, s, !0);
    const l = wf(this.containers, (u) => u.container === r);
    return l !== -1 ? (this.containers[l].modals.push(t), o) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: s
    }), o);
  }
  mount(t, r) {
    const o = wf(this.containers, (l) => l.modals.includes(t)), s = this.containers[o];
    s.restore || (s.restore = UP(s, r));
  }
  remove(t, r = !0) {
    const o = this.modals.indexOf(t);
    if (o === -1)
      return o;
    const s = wf(this.containers, (u) => u.modals.includes(t)), l = this.containers[s];
    if (l.modals.splice(l.modals.indexOf(t), 1), this.modals.splice(o, 1), l.modals.length === 0)
      l.restore && l.restore(), t.modalRef && Ms(t.modalRef, r), hv(l.container, t.mount, t.modalRef, l.hiddenSiblings, !1), this.containers.splice(s, 1);
    else {
      const u = l.modals[l.modals.length - 1];
      u.modalRef && Ms(u.modalRef, !1);
    }
    return o;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
const qP = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function KP(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function QP(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (o) => e.ownerDocument.querySelector(`input[type="radio"]${o}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function GP(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || QP(e));
}
function YP(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(qP)).forEach((o, s) => {
    const l = KP(o);
    l === -1 || !GP(o) || (l === 0 ? t.push(o) : r.push({
      documentOrder: s,
      tabIndex: l,
      node: o
    }));
  }), r.sort((o, s) => o.tabIndex === s.tabIndex ? o.documentOrder - s.documentOrder : o.tabIndex - s.tabIndex).map((o) => o.node).concat(t);
}
function JP() {
  return !0;
}
function XP(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: o = !1,
    disableRestoreFocus: s = !1,
    getTabbable: l = YP,
    isEnabled: u = JP,
    open: d
  } = e, p = b.useRef(!1), f = b.useRef(null), g = b.useRef(null), m = b.useRef(null), w = b.useRef(null), k = b.useRef(!1), S = b.useRef(null), _ = Ln(Ju(t), S), x = b.useRef(null);
  b.useEffect(() => {
    !d || !S.current || (k.current = !r);
  }, [r, d]), b.useEffect(() => {
    if (!d || !S.current)
      return;
    const C = Jn(S.current);
    return S.current.contains(C.activeElement) || (S.current.hasAttribute("tabIndex") || S.current.setAttribute("tabIndex", "-1"), k.current && S.current.focus()), () => {
      s || (m.current && m.current.focus && (p.current = !0, m.current.focus()), m.current = null);
    };
  }, [d]), b.useEffect(() => {
    if (!d || !S.current)
      return;
    const C = Jn(S.current), R = (A) => {
      x.current = A, !(o || !u() || A.key !== "Tab") && C.activeElement === S.current && A.shiftKey && (p.current = !0, g.current && g.current.focus());
    }, E = () => {
      const A = S.current;
      if (A === null)
        return;
      if (!C.hasFocus() || !u() || p.current) {
        p.current = !1;
        return;
      }
      if (A.contains(C.activeElement) || o && C.activeElement !== f.current && C.activeElement !== g.current)
        return;
      if (C.activeElement !== w.current)
        w.current = null;
      else if (w.current !== null)
        return;
      if (!k.current)
        return;
      let I = [];
      if ((C.activeElement === f.current || C.activeElement === g.current) && (I = l(S.current)), I.length > 0) {
        const L = !!(x.current?.shiftKey && x.current?.key === "Tab"), v = I[0], P = I[I.length - 1];
        typeof v != "string" && typeof P != "string" && (L ? P.focus() : v.focus());
      } else
        A.focus();
    };
    C.addEventListener("focusin", E), C.addEventListener("keydown", R, !0);
    const M = setInterval(() => {
      C.activeElement && C.activeElement.tagName === "BODY" && E();
    }, 50);
    return () => {
      clearInterval(M), C.removeEventListener("focusin", E), C.removeEventListener("keydown", R, !0);
    };
  }, [r, o, s, u, d, l]);
  const $ = (C) => {
    m.current === null && (m.current = C.relatedTarget), k.current = !0, w.current = C.target;
    const R = t.props.onFocus;
    R && R(C);
  }, N = (C) => {
    m.current === null && (m.current = C.relatedTarget), k.current = !0;
  };
  return /* @__PURE__ */ j.jsxs(b.Fragment, {
    children: [/* @__PURE__ */ j.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ b.cloneElement(t, {
      ref: _,
      onFocus: $
    }), /* @__PURE__ */ j.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: g,
      "data-testid": "sentinelEnd"
    })]
  });
}
function ZP(e) {
  return typeof e == "function" ? e() : e;
}
function eR(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const gv = () => {
}, Il = new HP();
function tR(e) {
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
  } = e, m = b.useRef({}), w = b.useRef(null), k = b.useRef(null), S = Ln(k, g), [_, x] = b.useState(!f), $ = eR(d);
  let N = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (N = !1);
  const C = () => Jn(w.current), R = () => (m.current.modalRef = k.current, m.current.mount = w.current, m.current), E = () => {
    Il.mount(R(), {
      disableScrollLock: o
    }), k.current && (k.current.scrollTop = 0);
  }, M = go(() => {
    const z = ZP(t) || C().body;
    Il.add(R(), z), k.current && E();
  }), A = () => Il.isTopModal(R()), I = go((z) => {
    w.current = z, z && (f && A() ? E() : k.current && Ms(k.current, N));
  }), L = b.useCallback(() => {
    Il.remove(R(), N);
  }, [N]);
  b.useEffect(() => () => {
    L();
  }, [L]), b.useEffect(() => {
    f ? M() : (!$ || !s) && L();
  }, [f, L, $, s, M]);
  const v = (z) => (V) => {
    z.onKeyDown?.(V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !A()) && (r || (V.stopPropagation(), p && p(V, "escapeKeyDown")));
  }, P = (z) => (V) => {
    z.onClick?.(V), V.target === V.currentTarget && p && p(V, "backdropClick");
  };
  return {
    getRootProps: (z = {}) => {
      const V = $S(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const G = {
        ...V,
        ...z
      };
      return {
        /*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */
        role: "presentation",
        ...G,
        onKeyDown: v(G),
        ref: S
      };
    },
    getBackdropProps: (z = {}) => {
      const V = z;
      return {
        "aria-hidden": !0,
        ...V,
        onClick: P(V),
        open: f
      };
    },
    getTransitionProps: () => {
      const z = () => {
        x(!1), l && l();
      }, V = () => {
        x(!0), u && u(), s && L();
      };
      return {
        onEnter: By(z, d?.props.onEnter ?? gv),
        onExited: By(V, d?.props.onExited ?? gv)
      };
    },
    rootRef: S,
    portalRef: I,
    isTopModal: A,
    exited: _,
    hasTransition: $
  };
}
function nR(e) {
  return gt("MuiModal", e);
}
Xe("MuiModal", ["root", "hidden", "backdrop"]);
const rR = (e) => {
  const {
    open: t,
    exited: r,
    classes: o
  } = e;
  return bt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, nR, o);
}, iR = Me("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.open && r.exited && t.hidden];
  }
})(bn(({
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
}))), oR = Me(aP, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), sR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: s = oR,
    BackdropProps: l,
    classes: u,
    className: d,
    closeAfterTransition: p = !1,
    children: f,
    container: g,
    component: m,
    components: w = {},
    componentsProps: k = {},
    disableAutoFocus: S = !1,
    disableEnforceFocus: _ = !1,
    disableEscapeKeyDown: x = !1,
    disablePortal: $ = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: C = !1,
    hideBackdrop: R = !1,
    keepMounted: E = !1,
    onBackdropClick: M,
    onClose: A,
    onTransitionEnter: I,
    onTransitionExited: L,
    open: v,
    slotProps: P = {},
    slots: O = {},
    // eslint-disable-next-line react/prop-types
    theme: F,
    ...B
  } = o, z = {
    ...o,
    closeAfterTransition: p,
    disableAutoFocus: S,
    disableEnforceFocus: _,
    disableEscapeKeyDown: x,
    disablePortal: $,
    disableRestoreFocus: N,
    disableScrollLock: C,
    hideBackdrop: R,
    keepMounted: E
  }, {
    getRootProps: V,
    getBackdropProps: G,
    getTransitionProps: U,
    portalRef: H,
    isTopModal: K,
    exited: D,
    hasTransition: Y
  } = tR({
    ...z,
    rootRef: r
  }), re = {
    ...z,
    exited: D
  }, te = rR(re), se = {};
  if (f.props.tabIndex === void 0 && (se.tabIndex = "-1"), Y) {
    const {
      onEnter: we,
      onExited: _e
    } = U();
    se.onEnter = we, se.onExited = _e;
  }
  const le = {
    slots: {
      root: w.Root,
      backdrop: w.Backdrop,
      ...O
    },
    slotProps: {
      ...k,
      ...P
    }
  }, [de, he] = wn("root", {
    ref: r,
    elementType: iR,
    externalForwardedProps: {
      ...le,
      ...B,
      component: m
    },
    getSlotProps: V,
    ownerState: re,
    className: Re(d, te?.root, !re.open && re.exited && te?.hidden)
  }), [fe, ue] = wn("backdrop", {
    ref: l?.ref,
    elementType: s,
    externalForwardedProps: le,
    shouldForwardComponentProp: !0,
    additionalProps: l,
    getSlotProps: (we) => G({
      ...we,
      onClick: (_e) => {
        M && M(_e), we?.onClick && we.onClick(_e);
      }
    }),
    className: Re(l?.className, te?.backdrop),
    ownerState: re
  });
  return !E && !v && (!Y || D) ? null : /* @__PURE__ */ j.jsx(XE, {
    ref: H,
    container: g,
    disablePortal: $,
    children: /* @__PURE__ */ j.jsxs(de, {
      ...he,
      children: [!R && s ? /* @__PURE__ */ j.jsx(fe, {
        ...ue
      }) : null, /* @__PURE__ */ j.jsx(XP, {
        disableEnforceFocus: _,
        disableAutoFocus: S,
        disableRestoreFocus: N,
        isEnabled: K,
        open: v,
        children: /* @__PURE__ */ b.cloneElement(f, se)
      })]
    })
  });
}), mv = Xe("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function aR(e) {
  return gt("MuiFormGroup", e);
}
Xe("MuiFormGroup", ["root", "row", "error"]);
const lR = (e) => {
  const {
    classes: t,
    row: r,
    error: o
  } = e;
  return bt({
    root: ["root", r && "row", o && "error"]
  }, aR, t);
}, uR = Me("div", {
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
}), cR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
    props: t,
    name: "MuiFormGroup"
  }), {
    className: s,
    row: l = !1,
    ...u
  } = o, d = ZS(), p = eP({
    props: o,
    muiFormControl: d,
    states: ["error"]
  }), f = {
    ...o,
    row: l,
    error: p.error
  }, g = lR(f);
  return /* @__PURE__ */ j.jsx(uR, {
    className: Re(g.root, s),
    ownerState: f,
    ref: r,
    ...u
  });
});
function rp(e) {
  return `scale(${e}, ${e ** 2})`;
}
const dR = {
  entering: {
    opacity: 1,
    transform: rp(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Sf = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), ip = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const {
    addEndListener: o,
    appear: s = !0,
    children: l,
    easing: u,
    in: d,
    onEnter: p,
    onEntered: f,
    onEntering: g,
    onExit: m,
    onExited: w,
    onExiting: k,
    style: S,
    timeout: _ = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: x = Zn,
    ...$
  } = t, N = PS(), C = b.useRef(), R = eh(), E = b.useRef(null), M = Ln(E, Ju(l), r), A = (z) => (V) => {
    if (z) {
      const G = E.current;
      V === void 0 ? z(G) : z(G, V);
    }
  }, I = A(g), L = A((z, V) => {
    YS(z);
    const {
      duration: G,
      delay: U,
      easing: H
    } = vu({
      style: S,
      timeout: _,
      easing: u
    }, {
      mode: "enter"
    });
    let K;
    _ === "auto" ? (K = R.transitions.getAutoHeightDuration(z.clientHeight), C.current = K) : K = G, z.style.transition = [R.transitions.create("opacity", {
      duration: K,
      delay: U
    }), R.transitions.create("transform", {
      duration: Sf ? K : K * 0.666,
      delay: U,
      easing: H
    })].join(","), p && p(z, V);
  }), v = A(f), P = A(k), O = A((z) => {
    const {
      duration: V,
      delay: G,
      easing: U
    } = vu({
      style: S,
      timeout: _,
      easing: u
    }, {
      mode: "exit"
    });
    let H;
    _ === "auto" ? (H = R.transitions.getAutoHeightDuration(z.clientHeight), C.current = H) : H = V, z.style.transition = [R.transitions.create("opacity", {
      duration: H,
      delay: G
    }), R.transitions.create("transform", {
      duration: Sf ? H : H * 0.666,
      delay: Sf ? G : G || H * 0.333,
      easing: U
    })].join(","), z.style.opacity = 0, z.style.transform = rp(0.75), m && m(z);
  }), F = A(w), B = (z) => {
    _ === "auto" && N.start(C.current || 0, z), o && o(E.current, z);
  };
  return /* @__PURE__ */ j.jsx(x, {
    appear: s,
    in: d,
    nodeRef: E,
    onEnter: L,
    onEntered: v,
    onEntering: I,
    onExit: O,
    onExited: F,
    onExiting: P,
    addEndListener: B,
    timeout: _ === "auto" ? null : _,
    ...$,
    children: (z, {
      ownerState: V,
      ...G
    }) => /* @__PURE__ */ b.cloneElement(l, {
      style: {
        opacity: 0,
        transform: rp(0.75),
        visibility: z === "exited" && !d ? "hidden" : void 0,
        ...dR[z],
        ...S,
        ...l.props.style
      },
      ref: M,
      ...G
    })
  });
});
ip && (ip.muiSupportAuto = !0);
const op = /* @__PURE__ */ b.createContext({});
function fR(e) {
  return gt("MuiList", e);
}
Xe("MuiList", ["root", "padding", "dense", "subheader"]);
const pR = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: o,
    subheader: s
  } = e;
  return bt({
    root: ["root", !r && "padding", o && "dense", s && "subheader"]
  }, fR, t);
}, hR = Me("ul", {
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
}), gR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
  } = o, m = b.useMemo(() => ({
    dense: d
  }), [d]), w = {
    ...o,
    component: u,
    dense: d,
    disablePadding: p
  }, k = pR(w);
  return /* @__PURE__ */ j.jsx(op.Provider, {
    value: m,
    children: /* @__PURE__ */ j.jsxs(hR, {
      as: u,
      className: Re(k.root, l),
      ref: r,
      ownerState: w,
      ...g,
      children: [f, s]
    })
  });
}), yv = Xe("MuiListItemIcon", ["root", "alignItemsFlexStart"]), vv = Xe("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
function bf(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function wv(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function n0(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.startsWith(t.keys.join(""));
}
function gs(e, t, r, o, s, l) {
  let u = !1, d = s(e, t, t ? r : !1);
  for (; d; ) {
    if (d === e.firstChild) {
      if (u)
        return !1;
      u = !0;
    }
    const p = o ? !1 : d.disabled || d.getAttribute("aria-disabled") === "true";
    if (!d.hasAttribute("tabindex") || !n0(d, l) || p)
      d = s(e, d, r);
    else
      return d.focus(), !0;
  }
  return !1;
}
const mR = /* @__PURE__ */ b.forwardRef(function(t, r) {
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
    variant: m = "selectedMenu",
    ...w
  } = t, k = b.useRef(null), S = b.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Pi(() => {
    s && k.current.focus();
  }, [s]), b.useImperativeHandle(o, () => ({
    adjustStyleForScrollbar: (C, {
      direction: R
    }) => {
      const E = !k.current.style.width;
      if (C.clientHeight < k.current.clientHeight && E) {
        const M = `${RS(Ri(C))}px`;
        k.current.style[R === "rtl" ? "paddingLeft" : "paddingRight"] = M, k.current.style.width = `calc(100% + ${M})`;
      }
      return k.current;
    }
  }), []);
  const _ = (C) => {
    const R = k.current, E = C.key;
    if (C.ctrlKey || C.metaKey || C.altKey) {
      g && g(C);
      return;
    }
    const A = Jn(R).activeElement;
    if (E === "ArrowDown")
      C.preventDefault(), gs(R, A, f, p, bf);
    else if (E === "ArrowUp")
      C.preventDefault(), gs(R, A, f, p, wv);
    else if (E === "Home")
      C.preventDefault(), gs(R, null, f, p, bf);
    else if (E === "End")
      C.preventDefault(), gs(R, null, f, p, wv);
    else if (E.length === 1) {
      const I = S.current, L = E.toLowerCase(), v = performance.now();
      I.keys.length > 0 && (v - I.lastTime > 500 ? (I.keys = [], I.repeating = !0, I.previousKeyMatched = !0) : I.repeating && L !== I.keys[0] && (I.repeating = !1)), I.lastTime = v, I.keys.push(L);
      const P = A && !I.repeating && n0(A, I);
      I.previousKeyMatched && (P || gs(R, A, !1, p, bf, I)) ? C.preventDefault() : I.previousKeyMatched = !1;
    }
    g && g(C);
  }, x = Ln(k, r);
  let $ = -1;
  b.Children.forEach(u, (C, R) => {
    if (!/* @__PURE__ */ b.isValidElement(C)) {
      $ === R && ($ += 1, $ >= u.length && ($ = -1));
      return;
    }
    C.props.disabled || (m === "selectedMenu" && C.props.selected || $ === -1) && ($ = R), $ === R && (C.props.disabled || C.props.muiSkipListHighlight || C.type.muiSkipListHighlight) && ($ += 1, $ >= u.length && ($ = -1));
  });
  const N = b.Children.map(u, (C, R) => {
    if (R === $) {
      const E = {};
      return l && (E.autoFocus = !0), C.props.tabIndex === void 0 && m === "selectedMenu" && (E.tabIndex = 0), /* @__PURE__ */ b.cloneElement(C, E);
    }
    return C;
  });
  return /* @__PURE__ */ j.jsx(gR, {
    role: "menu",
    ref: x,
    className: d,
    onKeyDown: _,
    tabIndex: s ? 0 : -1,
    ...w,
    children: N
  });
});
function yR(e) {
  return gt("MuiPopover", e);
}
Xe("MuiPopover", ["root", "paper"]);
function Sv(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function bv(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function _v(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Nl(e) {
  return typeof e == "function" ? e() : e;
}
const vR = (e) => {
  const {
    classes: t
  } = e;
  return bt({
    root: ["root"],
    paper: ["paper"]
  }, yR, t);
}, wR = Me(sR, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), r0 = Me(JS, {
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
}), SR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    container: m,
    elevation: w = 8,
    marginThreshold: k = 16,
    open: S,
    PaperProps: _ = {},
    // TODO: remove in v7
    slots: x = {},
    slotProps: $ = {},
    transformOrigin: N = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: C,
    // TODO: remove in v7
    transitionDuration: R = "auto",
    TransitionProps: E = {},
    // TODO: remove in v7
    disableScrollLock: M = !1,
    ...A
  } = o, I = b.useRef(), L = {
    ...o,
    anchorOrigin: u,
    anchorReference: p,
    elevation: w,
    marginThreshold: k,
    transformOrigin: N,
    TransitionComponent: C,
    transitionDuration: R,
    TransitionProps: E
  }, v = vR(L), P = b.useCallback(() => {
    if (p === "anchorPosition")
      return d;
    const ue = Nl(l), _e = (ue && ue.nodeType === 1 ? ue : Jn(I.current).body).getBoundingClientRect();
    return {
      top: _e.top + Sv(_e, u.vertical),
      left: _e.left + bv(_e, u.horizontal)
    };
  }, [l, u.horizontal, u.vertical, d, p]), O = b.useCallback((ue) => ({
    vertical: Sv(ue, N.vertical),
    horizontal: bv(ue, N.horizontal)
  }), [N.horizontal, N.vertical]), F = b.useCallback((ue) => {
    const we = {
      width: ue.offsetWidth,
      height: ue.offsetHeight
    }, _e = O(we);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: _v(_e)
      };
    const qe = P();
    let je = qe.top - _e.vertical, at = qe.left - _e.horizontal;
    const dt = je + we.height, Ze = at + we.width, De = Ri(Nl(l)), $t = De.innerHeight - k, ft = De.innerWidth - k;
    if (k !== null && je < k) {
      const Ue = je - k;
      je -= Ue, _e.vertical += Ue;
    } else if (k !== null && dt > $t) {
      const Ue = dt - $t;
      je -= Ue, _e.vertical += Ue;
    }
    if (k !== null && at < k) {
      const Ue = at - k;
      at -= Ue, _e.horizontal += Ue;
    } else if (Ze > ft) {
      const Ue = Ze - ft;
      at -= Ue, _e.horizontal += Ue;
    }
    return {
      top: `${Math.round(je)}px`,
      left: `${Math.round(at)}px`,
      transformOrigin: _v(_e)
    };
  }, [l, p, P, O, k]), [B, z] = b.useState(S), V = b.useCallback(() => {
    const ue = I.current;
    if (!ue)
      return;
    const we = F(ue);
    we.top !== null && ue.style.setProperty("top", we.top), we.left !== null && (ue.style.left = we.left), ue.style.transformOrigin = we.transformOrigin, z(!0);
  }, [F]);
  b.useEffect(() => (M && window.addEventListener("scroll", V), () => window.removeEventListener("scroll", V)), [l, M, V]);
  const G = () => {
    V();
  }, U = () => {
    z(!1);
  };
  b.useEffect(() => {
    S && V();
  }), b.useImperativeHandle(s, () => S ? {
    updatePosition: () => {
      V();
    }
  } : null, [S, V]), b.useEffect(() => {
    if (!S)
      return;
    const ue = Bk(() => {
      V();
    }), we = Ri(Nl(l));
    return we.addEventListener("resize", ue), () => {
      ue.clear(), we.removeEventListener("resize", ue);
    };
  }, [l, S, V]);
  let H = R;
  const K = {
    slots: {
      transition: C,
      ...x
    },
    slotProps: {
      transition: E,
      paper: _,
      ...$
    }
  }, [D, Y] = wn("transition", {
    elementType: ip,
    externalForwardedProps: K,
    ownerState: L,
    getSlotProps: (ue) => ({
      ...ue,
      onEntering: (we, _e) => {
        ue.onEntering?.(we, _e), G();
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
  R === "auto" && !D.muiSupportAuto && (H = void 0);
  const re = m || (l ? Jn(Nl(l)).body : void 0), [te, {
    slots: se,
    slotProps: le,
    ...de
  }] = wn("root", {
    ref: r,
    elementType: wR,
    externalForwardedProps: {
      ...K,
      ...A
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: x.backdrop
      },
      slotProps: {
        backdrop: HS(typeof $.backdrop == "function" ? $.backdrop(L) : $.backdrop, {
          invisible: !0
        })
      },
      container: re,
      open: S
    },
    ownerState: L,
    className: Re(v.root, g)
  }), [he, fe] = wn("paper", {
    ref: I,
    className: v.paper,
    elementType: r0,
    externalForwardedProps: K,
    shouldForwardComponentProp: !0,
    additionalProps: {
      elevation: w,
      style: B ? void 0 : {
        opacity: 0
      }
    },
    ownerState: L
  });
  return /* @__PURE__ */ j.jsx(te, {
    ...de,
    ...!ZE(te) && {
      slots: se,
      slotProps: le,
      disableScrollLock: M
    },
    children: /* @__PURE__ */ j.jsx(D, {
      ...Y,
      timeout: H,
      children: /* @__PURE__ */ j.jsx(he, {
        ...fe,
        children: f
      })
    })
  });
});
function bR(e) {
  return gt("MuiMenu", e);
}
Xe("MuiMenu", ["root", "paper", "list"]);
const _R = {
  vertical: "top",
  horizontal: "right"
}, xR = {
  vertical: "top",
  horizontal: "left"
}, kR = (e) => {
  const {
    classes: t
  } = e;
  return bt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, bR, t);
}, CR = Me(SR, {
  shouldForwardProp: (e) => _o(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ER = Me(r0, {
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
}), PR = Me(mR, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), RR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    PaperProps: m = {},
    PopoverClasses: w,
    transitionDuration: k = "auto",
    TransitionProps: {
      onEntering: S,
      ..._
    } = {},
    variant: x = "selectedMenu",
    slots: $ = {},
    slotProps: N = {},
    ...C
  } = o, R = eC(), E = {
    ...o,
    autoFocus: s,
    disableAutoFocusItem: d,
    MenuListProps: p,
    onEntering: S,
    PaperProps: m,
    transitionDuration: k,
    TransitionProps: _,
    variant: x
  }, M = kR(E), A = s && !d && g, I = b.useRef(null), L = (H, K) => {
    I.current && I.current.adjustStyleForScrollbar(H, {
      direction: R ? "rtl" : "ltr"
    }), S && S(H, K);
  }, v = (H) => {
    H.key === "Tab" && (H.preventDefault(), f && f(H, "tabKeyDown"));
  };
  let P = -1;
  b.Children.map(l, (H, K) => {
    /* @__PURE__ */ b.isValidElement(H) && (H.props.disabled || (x === "selectedMenu" && H.props.selected || P === -1) && (P = K));
  });
  const O = {
    slots: $,
    slotProps: {
      list: p,
      transition: _,
      paper: m,
      ...N
    }
  }, F = Qk({
    elementType: $.root,
    externalSlotProps: N.root,
    ownerState: E,
    className: [M.root, u]
  }), [B, z] = wn("paper", {
    className: M.paper,
    elementType: ER,
    externalForwardedProps: O,
    shouldForwardComponentProp: !0,
    ownerState: E
  }), [V, G] = wn("list", {
    className: Re(M.list, p.className),
    elementType: PR,
    shouldForwardComponentProp: !0,
    externalForwardedProps: O,
    getSlotProps: (H) => ({
      ...H,
      onKeyDown: (K) => {
        v(K), H.onKeyDown?.(K);
      }
    }),
    ownerState: E
  }), U = typeof O.slotProps.transition == "function" ? O.slotProps.transition(E) : O.slotProps.transition;
  return /* @__PURE__ */ j.jsx(CR, {
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: R ? "right" : "left"
    },
    transformOrigin: R ? _R : xR,
    slots: {
      root: $.root,
      paper: B,
      backdrop: $.backdrop,
      ...$.transition && {
        // TODO: pass `slots.transition` directly once `TransitionComponent` is removed from Popover
        transition: $.transition
      }
    },
    slotProps: {
      root: F,
      paper: z,
      backdrop: typeof N.backdrop == "function" ? N.backdrop(E) : N.backdrop,
      transition: {
        ...U,
        onEntering: (...H) => {
          L(...H), U?.onEntering?.(...H);
        }
      }
    },
    open: g,
    ref: r,
    transitionDuration: k,
    ownerState: E,
    ...C,
    classes: w,
    children: /* @__PURE__ */ j.jsx(V, {
      actions: I,
      autoFocus: s && (P === -1 || d),
      autoFocusItem: A,
      variant: x,
      ...G,
      children: l
    })
  });
});
function TR(e) {
  return gt("MuiMenuItem", e);
}
const ms = Xe("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), $R = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.divider && t.divider, !r.disableGutters && t.gutters];
}, MR = (e) => {
  const {
    disabled: t,
    dense: r,
    divider: o,
    disableGutters: s,
    selected: l,
    classes: u
  } = e, p = bt({
    root: ["root", r && "dense", t && "disabled", !s && "gutters", o && "divider", l && "selected"]
  }, TR, u);
  return {
    ...u,
    ...p
  };
}, AR = Me(Xu, {
  shouldForwardProp: (e) => _o(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: $R
})(bn(({
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
  [`&.${ms.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Rt(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${ms.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Rt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${ms.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Rt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Rt(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${ms.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${ms.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${mv.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${mv.inset}`]: {
    marginLeft: 52
  },
  [`& .${vv.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${vv.inset}`]: {
    paddingLeft: 36
  },
  [`& .${yv.root}`]: {
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
      [`& .${yv.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), IR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    tabIndex: m,
    className: w,
    ...k
  } = o, S = b.useContext(op), _ = b.useMemo(() => ({
    dense: u || S.dense || !1,
    disableGutters: p
  }), [S.dense, u, p]), x = b.useRef(null);
  Pi(() => {
    s && x.current && x.current.focus();
  }, [s]);
  const $ = {
    ...o,
    dense: _.dense,
    divider: d,
    disableGutters: p
  }, N = MR(o), C = Ln(x, r);
  let R;
  return o.disabled || (R = m !== void 0 ? m : -1), /* @__PURE__ */ j.jsx(op.Provider, {
    value: _,
    children: /* @__PURE__ */ j.jsx(AR, {
      ref: C,
      role: g,
      tabIndex: R,
      component: l,
      focusVisibleClassName: Re(N.focusVisible, f),
      className: Re(N.root, w),
      ...k,
      ownerState: $,
      classes: N
    })
  });
});
function NR(e) {
  return gt("MuiSkeleton", e);
}
Xe("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]);
const OR = (e) => {
  const {
    classes: t,
    variant: r,
    animation: o,
    hasChildren: s,
    width: l,
    height: u
  } = e;
  return bt({
    root: ["root", r, o, s && "withChildren", s && !l && "fitContent", s && !u && "heightAuto"]
  }, NR, t);
}, sp = Ii`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`, ap = Ii`
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
`, LR = typeof sp != "string" ? na`
        animation: ${sp} 2s ease-in-out 0.5s infinite;
      ` : null, DR = typeof ap != "string" ? na`
        &::after {
          animation: ${ap} 2s linear 0.5s infinite;
        }
      ` : null, FR = Me("span", {
  name: "MuiSkeleton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], r.animation !== !1 && t[r.animation], r.hasChildren && t.withChildren, r.hasChildren && !r.width && t.fitContent, r.hasChildren && !r.height && t.heightAuto];
  }
})(bn(({
  theme: e
}) => {
  const t = QC(e.shape.borderRadius) || "px", r = GC(e.shape.borderRadius);
  return {
    display: "block",
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: e.vars ? e.vars.palette.Skeleton.bg : Rt(e.palette.text.primary, e.palette.mode === "light" ? 0.11 : 0.13),
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
      style: LR || {
        animation: `${sp} 2s ease-in-out 0.5s infinite`
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
      style: DR || {
        "&::after": {
          animation: `${ap} 2s linear 0.5s infinite`
        }
      }
    }]
  };
})), jR = /* @__PURE__ */ b.forwardRef(function(t, r) {
  const o = mt({
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
    ...m
  } = o, w = {
    ...o,
    animation: s,
    component: u,
    variant: f,
    hasChildren: !!m.children
  }, k = OR(w);
  return /* @__PURE__ */ j.jsx(FR, {
    as: u,
    ref: r,
    className: Re(k.root, l),
    ownerState: w,
    ...m,
    style: {
      width: g,
      height: d,
      ...p
    }
  });
});
var Ol = {}, xv;
function zR() {
  if (xv) return Ol;
  xv = 1;
  var e = QS();
  return Ol.createRoot = e.createRoot, Ol.hydrateRoot = e.hydrateRoot, Ol;
}
var BR = zR();
const WR = /* @__PURE__ */ Zr(BR);
var kv = "popstate";
function Cv(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function UR(e = {}) {
  function t(o, s) {
    let l = s.state?.masked, { pathname: u, search: d, hash: p } = l || o.location;
    return lp(
      "",
      { pathname: u, search: d, hash: p },
      // state defaults to `null` because `window.history.state` does
      s.state && s.state.usr || null,
      s.state && s.state.key || "default",
      l ? {
        pathname: o.location.pathname,
        search: o.location.search,
        hash: o.location.hash
      } : void 0
    );
  }
  function r(o, s) {
    return typeof s == "string" ? s : Us(s);
  }
  return HR(
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
function Dn(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function VR() {
  return Math.random().toString(36).substring(2, 10);
}
function Ev(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.unstable_mask ? {
      pathname: e.pathname,
      search: e.search,
      hash: e.hash
    } : void 0
  };
}
function lp(e, t, r = null, o, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof t == "string" ? ko(t) : t,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || o || VR(),
    unstable_mask: s
  };
}
function Us({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function ko(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let o = e.indexOf("?");
    o >= 0 && (t.search = e.substring(o), e = e.substring(0, o)), e && (t.pathname = e);
  }
  return t;
}
function HR(e, t, r, o = {}) {
  let { window: s = document.defaultView, v5Compat: l = !1 } = o, u = s.history, d = "POP", p = null, f = g();
  f == null && (f = 0, u.replaceState({ ...u.state, idx: f }, ""));
  function g() {
    return (u.state || { idx: null }).idx;
  }
  function m() {
    d = "POP";
    let x = g(), $ = x == null ? null : x - f;
    f = x, p && p({ action: d, location: _.location, delta: $ });
  }
  function w(x, $) {
    d = "PUSH";
    let N = Cv(x) ? x : lp(_.location, x, $);
    f = g() + 1;
    let C = Ev(N, f), R = _.createHref(N.unstable_mask || N);
    try {
      u.pushState(C, "", R);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError")
        throw E;
      s.location.assign(R);
    }
    l && p && p({ action: d, location: _.location, delta: 1 });
  }
  function k(x, $) {
    d = "REPLACE";
    let N = Cv(x) ? x : lp(_.location, x, $);
    f = g();
    let C = Ev(N, f), R = _.createHref(N.unstable_mask || N);
    u.replaceState(C, "", R), l && p && p({ action: d, location: _.location, delta: 0 });
  }
  function S(x) {
    return qR(x);
  }
  let _ = {
    get action() {
      return d;
    },
    get location() {
      return e(s, u);
    },
    listen(x) {
      if (p)
        throw new Error("A history only accepts one active listener");
      return s.addEventListener(kv, m), p = x, () => {
        s.removeEventListener(kv, m), p = null;
      };
    },
    createHref(x) {
      return t(s, x);
    },
    createURL: S,
    encodeLocation(x) {
      let $ = S(x);
      return {
        pathname: $.pathname,
        search: $.search,
        hash: $.hash
      };
    },
    push: w,
    replace: k,
    go(x) {
      return u.go(x);
    }
  };
  return _;
}
function qR(e, t = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), Je(r, "No window.location.(origin|href) available to create URL");
  let o = typeof e == "string" ? e : Us(e);
  return o = o.replace(/ $/, "%20"), !t && o.startsWith("//") && (o = r + o), new URL(o, r);
}
function i0(e, t, r = "/") {
  return KR(e, t, r, !1);
}
function KR(e, t, r, o) {
  let s = typeof t == "string" ? ko(t) : t, l = wr(s.pathname || "/", r);
  if (l == null)
    return null;
  let u = o0(e);
  QR(u);
  let d = null;
  for (let p = 0; d == null && p < u.length; ++p) {
    let f = oT(l);
    d = rT(
      u[p],
      f,
      o
    );
  }
  return d;
}
function o0(e, t = [], r = [], o = "", s = !1) {
  let l = (u, d, p = s, f) => {
    let g = {
      relativePath: f === void 0 ? u.path || "" : f,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: d,
      route: u
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(o) && p)
        return;
      Je(
        g.relativePath.startsWith(o),
        `Absolute route path "${g.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), g.relativePath = g.relativePath.slice(o.length);
    }
    let m = In([o, g.relativePath]), w = r.concat(g);
    u.children && u.children.length > 0 && (Je(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      u.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
    ), o0(
      u.children,
      t,
      w,
      m,
      p
    )), !(u.path == null && !u.index) && t.push({
      path: m,
      score: tT(m, u.index),
      routesMeta: w
    });
  };
  return e.forEach((u, d) => {
    if (u.path === "" || !u.path?.includes("?"))
      l(u, d);
    else
      for (let p of s0(u.path))
        l(u, d, !0, p);
  }), t;
}
function s0(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...o] = t, s = r.endsWith("?"), l = r.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [l, ""] : [l];
  let u = s0(o.join("/")), d = [];
  return d.push(
    ...u.map(
      (p) => p === "" ? l : [l, p].join("/")
    )
  ), s && d.push(...u), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function QR(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : nT(
      t.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var GR = /^:[\w-]+$/, YR = 3, JR = 2, XR = 1, ZR = 10, eT = -2, Pv = (e) => e === "*";
function tT(e, t) {
  let r = e.split("/"), o = r.length;
  return r.some(Pv) && (o += eT), t && (o += JR), r.filter((s) => !Pv(s)).reduce(
    (s, l) => s + (GR.test(l) ? YR : l === "" ? XR : ZR),
    o
  );
}
function nT(e, t) {
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
function rT(e, t, r = !1) {
  let { routesMeta: o } = e, s = {}, l = "/", u = [];
  for (let d = 0; d < o.length; ++d) {
    let p = o[d], f = d === o.length - 1, g = l === "/" ? t : t.slice(l.length) || "/", m = Su(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: f },
      g
    ), w = p.route;
    if (!m && f && r && !o[o.length - 1].route.index && (m = Su(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      g
    )), !m)
      return null;
    Object.assign(s, m.params), u.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: In([l, m.pathname]),
      pathnameBase: uT(
        In([l, m.pathnameBase])
      ),
      route: w
    }), m.pathnameBase !== "/" && (l = In([l, m.pathnameBase]));
  }
  return u;
}
function Su(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, o] = iT(
    e.path,
    e.caseSensitive,
    e.end
  ), s = t.match(r);
  if (!s) return null;
  let l = s[0], u = l.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: o.reduce(
      (f, { paramName: g, isOptional: m }, w) => {
        if (g === "*") {
          let S = d[w] || "";
          u = l.slice(0, l.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const k = d[w];
        return m && !k ? f[g] = void 0 : f[g] = (k || "").replace(/%2F/g, "/"), f;
      },
      {}
    ),
    pathname: l,
    pathnameBase: u,
    pattern: e
  };
}
function iT(e, t = !1, r = !0) {
  Dn(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (u, d, p, f, g) => {
      if (o.push({ paramName: d, isOptional: p != null }), p) {
        let m = g.charAt(f + u.length);
        return m && m !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (o.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), o];
}
function oT(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return Dn(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function wr(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, o = e.charAt(r);
  return o && o !== "/" ? null : e.slice(r) || "/";
}
var sT = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function aT(e, t = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: s = ""
  } = typeof e == "string" ? ko(e) : e, l;
  return r ? (r = l0(r), r.startsWith("/") ? l = Rv(r.substring(1), "/") : l = Rv(r, t)) : l = t, {
    pathname: l,
    search: cT(o),
    hash: dT(s)
  };
}
function Rv(e, t) {
  let r = bu(t).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function _f(e, t, r, o) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function lT(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function a0(e) {
  let t = lT(e);
  return t.map(
    (r, o) => o === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function rh(e, t, r, o = !1) {
  let s;
  typeof e == "string" ? s = ko(e) : (s = { ...e }, Je(
    !s.pathname || !s.pathname.includes("?"),
    _f("?", "pathname", "search", s)
  ), Je(
    !s.pathname || !s.pathname.includes("#"),
    _f("#", "pathname", "hash", s)
  ), Je(
    !s.search || !s.search.includes("#"),
    _f("#", "search", "hash", s)
  ));
  let l = e === "" || s.pathname === "", u = l ? "/" : s.pathname, d;
  if (u == null)
    d = r;
  else {
    let m = t.length - 1;
    if (!o && u.startsWith("..")) {
      let w = u.split("/");
      for (; w[0] === ".."; )
        w.shift(), m -= 1;
      s.pathname = w.join("/");
    }
    d = m >= 0 ? t[m] : "/";
  }
  let p = aT(s, d), f = u && u !== "/" && u.endsWith("/"), g = (l || u === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (f || g) && (p.pathname += "/"), p;
}
var l0 = (e) => e.replace(/\/\/+/g, "/"), In = (e) => l0(e.join("/")), bu = (e) => e.replace(/\/+$/, ""), uT = (e) => bu(e).replace(/^\/*/, "/"), cT = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, dT = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, fT = class {
  constructor(e, t, r, o = !1) {
    this.status = e, this.statusText = t || "", this.internal = o, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function pT(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function hT(e) {
  let t = e.map((r) => r.route.path).filter(Boolean);
  return In(t) || "/";
}
var u0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function c0(e, t) {
  let r = e;
  if (typeof r != "string" || !sT.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let o = r, s = !1;
  if (u0)
    try {
      let l = new URL(window.location.href), u = r.startsWith("//") ? new URL(l.protocol + r) : new URL(r), d = wr(u.pathname, t);
      u.origin === l.origin && d != null ? r = d + u.search + u.hash : s = !0;
    } catch {
      Dn(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: o,
    isExternal: s,
    to: r
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var d0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  d0
);
var gT = [
  "GET",
  ...d0
];
new Set(gT);
var Co = b.createContext(null);
Co.displayName = "DataRouter";
var Zu = b.createContext(null);
Zu.displayName = "DataRouterState";
var f0 = b.createContext(!1);
function mT() {
  return b.useContext(f0);
}
var p0 = b.createContext({
  isTransitioning: !1
});
p0.displayName = "ViewTransition";
var yT = b.createContext(
  /* @__PURE__ */ new Map()
);
yT.displayName = "Fetchers";
var vT = b.createContext(null);
vT.displayName = "Await";
var xn = b.createContext(
  null
);
xn.displayName = "Navigation";
var la = b.createContext(
  null
);
la.displayName = "Location";
var er = b.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
er.displayName = "Route";
var ih = b.createContext(null);
ih.displayName = "RouteError";
var h0 = "REACT_ROUTER_ERROR", wT = "REDIRECT", ST = "ROUTE_ERROR_RESPONSE";
function bT(e) {
  if (e.startsWith(`${h0}:${wT}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.location == "string" && typeof t.reloadDocument == "boolean" && typeof t.replace == "boolean")
        return t;
    } catch {
    }
}
function _T(e) {
  if (e.startsWith(
    `${h0}:${ST}:{`
  ))
    try {
      let t = JSON.parse(e.slice(40));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string")
        return new fT(
          t.status,
          t.statusText,
          t.data
        );
    } catch {
    }
}
function xT(e, { relative: t } = {}) {
  Je(
    ua(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: o } = b.useContext(xn), { hash: s, pathname: l, search: u } = ca(e, { relative: t }), d = l;
  return r !== "/" && (d = l === "/" ? r : In([r, l])), o.createHref({ pathname: d, search: u, hash: s });
}
function ua() {
  return b.useContext(la) != null;
}
function tr() {
  return Je(
    ua(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), b.useContext(la).location;
}
var g0 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function m0(e) {
  b.useContext(xn).static || b.useLayoutEffect(e);
}
function y0() {
  let { isDataRoute: e } = b.useContext(er);
  return e ? DT() : kT();
}
function kT() {
  Je(
    ua(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = b.useContext(Co), { basename: t, navigator: r } = b.useContext(xn), { matches: o } = b.useContext(er), { pathname: s } = tr(), l = JSON.stringify(a0(o)), u = b.useRef(!1);
  return m0(() => {
    u.current = !0;
  }), b.useCallback(
    (p, f = {}) => {
      if (Dn(u.current, g0), !u.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let g = rh(
        p,
        JSON.parse(l),
        s,
        f.relative === "path"
      );
      e == null && t !== "/" && (g.pathname = g.pathname === "/" ? t : In([t, g.pathname])), (f.replace ? r.replace : r.push)(
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
b.createContext(null);
function CT() {
  let { matches: e } = b.useContext(er);
  return e[e.length - 1]?.params ?? {};
}
function ca(e, { relative: t } = {}) {
  let { matches: r } = b.useContext(er), { pathname: o } = tr(), s = JSON.stringify(a0(r));
  return b.useMemo(
    () => rh(
      e,
      JSON.parse(s),
      o,
      t === "path"
    ),
    [e, s, o, t]
  );
}
function ET(e, t) {
  return v0(e, t);
}
function v0(e, t, r) {
  Je(
    ua(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = b.useContext(xn), { matches: s } = b.useContext(er), l = s[s.length - 1], u = l ? l.params : {}, d = l ? l.pathname : "/", p = l ? l.pathnameBase : "/", f = l && l.route;
  {
    let x = f && f.path || "";
    S0(
      d,
      !f || x.endsWith("*") || x.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x === "/" ? "*" : `${x}/*`}">.`
    );
  }
  let g = tr(), m;
  if (t) {
    let x = typeof t == "string" ? ko(t) : t;
    Je(
      p === "/" || x.pathname?.startsWith(p),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${x.pathname}" was given in the \`location\` prop.`
    ), m = x;
  } else
    m = g;
  let w = m.pathname || "/", k = w;
  if (p !== "/") {
    let x = p.replace(/^\//, "").split("/");
    k = "/" + w.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let S = i0(e, { pathname: k });
  Dn(
    f || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), Dn(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let _ = MT(
    S && S.map(
      (x) => Object.assign({}, x, {
        params: Object.assign({}, u, x.params),
        pathname: In([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            x.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : x.pathname
        ]),
        pathnameBase: x.pathnameBase === "/" ? p : In([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            x.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : x.pathnameBase
        ])
      })
    ),
    s,
    r
  );
  return t && _ ? /* @__PURE__ */ b.createElement(
    la.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          unstable_mask: void 0,
          ...m
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    _
  ) : _;
}
function PT() {
  let e = LT(), t = pT(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, l = { padding: "2px 4px", backgroundColor: o }, u = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), u = /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ b.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ b.createElement("code", { style: l }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ b.createElement("code", { style: l }, "errorElement"), " prop on your route.")), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ b.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ b.createElement("pre", { style: s }, r) : null, u);
}
var RT = /* @__PURE__ */ b.createElement(PT, null), w0 = class extends b.Component {
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
    this.props.onError ? this.props.onError(e, t) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    let e = this.state.error;
    if (this.context && typeof e == "object" && e && "digest" in e && typeof e.digest == "string") {
      const r = _T(e.digest);
      r && (e = r);
    }
    let t = e !== void 0 ? /* @__PURE__ */ b.createElement(er.Provider, { value: this.props.routeContext }, /* @__PURE__ */ b.createElement(
      ih.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ b.createElement(TT, { error: e }, t) : t;
  }
};
w0.contextType = f0;
var xf = /* @__PURE__ */ new WeakMap();
function TT({
  children: e,
  error: t
}) {
  let { basename: r } = b.useContext(xn);
  if (typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
    let o = bT(t.digest);
    if (o) {
      let s = xf.get(t);
      if (s) throw s;
      let l = c0(o.location, r);
      if (u0 && !xf.get(t))
        if (l.isExternal || o.reloadDocument)
          window.location.href = l.absoluteURL || l.to;
        else {
          const u = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(l.to, {
              replace: o.replace
            })
          );
          throw xf.set(t, u), u;
        }
      return /* @__PURE__ */ b.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${l.absoluteURL || l.to}`
        }
      );
    }
  }
  return e;
}
function $T({ routeContext: e, match: t, children: r }) {
  let o = b.useContext(Co);
  return o && o.static && o.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ b.createElement(er.Provider, { value: e }, r);
}
function MT(e, t = [], r) {
  let o = r?.state;
  if (e == null) {
    if (!o)
      return null;
    if (o.errors)
      e = o.matches;
    else if (t.length === 0 && !o.initialized && o.matches.length > 0)
      e = o.matches;
    else
      return null;
  }
  let s = e, l = o?.errors;
  if (l != null) {
    let g = s.findIndex(
      (m) => m.route.id && l?.[m.route.id] !== void 0
    );
    Je(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        l
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, g + 1)
    );
  }
  let u = !1, d = -1;
  if (r && o) {
    u = o.renderFallback;
    for (let g = 0; g < s.length; g++) {
      let m = s[g];
      if ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (d = g), m.route.id) {
        let { loaderData: w, errors: k } = o, S = m.route.loader && !w.hasOwnProperty(m.route.id) && (!k || k[m.route.id] === void 0);
        if (m.route.lazy || S) {
          r.isStatic && (u = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, f = o && p ? (g, m) => {
    p(g, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      unstable_pattern: hT(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (g, m, w) => {
      let k, S = !1, _ = null, x = null;
      o && (k = l && m.route.id ? l[m.route.id] : void 0, _ = m.route.errorElement || RT, u && (d < 0 && w === 0 ? (S0(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, x = null) : d === w && (S = !0, x = m.route.hydrateFallbackElement || null)));
      let $ = t.concat(s.slice(0, w + 1)), N = () => {
        let C;
        return k ? C = _ : S ? C = x : m.route.Component ? C = /* @__PURE__ */ b.createElement(m.route.Component, null) : m.route.element ? C = m.route.element : C = g, /* @__PURE__ */ b.createElement(
          $T,
          {
            match: m,
            routeContext: {
              outlet: g,
              matches: $,
              isDataRoute: o != null
            },
            children: C
          }
        );
      };
      return o && (m.route.ErrorBoundary || m.route.errorElement || w === 0) ? /* @__PURE__ */ b.createElement(
        w0,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: _,
          error: k,
          children: N(),
          routeContext: { outlet: null, matches: $, isDataRoute: !0 },
          onError: f
        }
      ) : N();
    },
    null
  );
}
function oh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function AT(e) {
  let t = b.useContext(Co);
  return Je(t, oh(e)), t;
}
function IT(e) {
  let t = b.useContext(Zu);
  return Je(t, oh(e)), t;
}
function NT(e) {
  let t = b.useContext(er);
  return Je(t, oh(e)), t;
}
function sh(e) {
  let t = NT(e), r = t.matches[t.matches.length - 1];
  return Je(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function OT() {
  return sh(
    "useRouteId"
    /* UseRouteId */
  );
}
function LT() {
  let e = b.useContext(ih), t = IT(
    "useRouteError"
    /* UseRouteError */
  ), r = sh(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : t.errors?.[r];
}
function DT() {
  let { router: e } = AT(
    "useNavigate"
    /* UseNavigateStable */
  ), t = sh(
    "useNavigate"
    /* UseNavigateStable */
  ), r = b.useRef(!1);
  return m0(() => {
    r.current = !0;
  }), b.useCallback(
    async (s, l = {}) => {
      Dn(r.current, g0), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: t, ...l }));
    },
    [e, t]
  );
}
var Tv = {};
function S0(e, t, r) {
  !t && !Tv[e] && (Tv[e] = !0, Dn(!1, r));
}
b.memo(FT);
function FT({
  routes: e,
  future: t,
  state: r,
  isStatic: o,
  onError: s
}) {
  return v0(e, void 0, { state: r, isStatic: o, onError: s });
}
function wi(e) {
  Je(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function jT({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: o = "POP",
  navigator: s,
  static: l = !1,
  unstable_useTransitions: u
}) {
  Je(
    !ua(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = b.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: l,
      unstable_useTransitions: u,
      future: {}
    }),
    [d, s, l, u]
  );
  typeof r == "string" && (r = ko(r));
  let {
    pathname: f = "/",
    search: g = "",
    hash: m = "",
    state: w = null,
    key: k = "default",
    unstable_mask: S
  } = r, _ = b.useMemo(() => {
    let x = wr(f, d);
    return x == null ? null : {
      location: {
        pathname: x,
        search: g,
        hash: m,
        state: w,
        key: k,
        unstable_mask: S
      },
      navigationType: o
    };
  }, [
    d,
    f,
    g,
    m,
    w,
    k,
    o,
    S
  ]);
  return Dn(
    _ != null,
    `<Router basename="${d}"> is not able to match the URL "${f}${g}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), _ == null ? null : /* @__PURE__ */ b.createElement(xn.Provider, { value: p }, /* @__PURE__ */ b.createElement(la.Provider, { children: t, value: _ }));
}
function zT({
  children: e,
  location: t
}) {
  return ET(up(e), t);
}
function up(e, t = []) {
  let r = [];
  return b.Children.forEach(e, (o, s) => {
    if (!b.isValidElement(o))
      return;
    let l = [...t, s];
    if (o.type === b.Fragment) {
      r.push.apply(
        r,
        up(o.props.children, l)
      );
      return;
    }
    Je(
      o.type === wi,
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
      middleware: o.props.middleware,
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
    o.props.children && (u.children = up(
      o.props.children,
      l
    )), r.push(u);
  }), r;
}
var su = "get", au = "application/x-www-form-urlencoded";
function ec(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function BT(e) {
  return ec(e) && e.tagName.toLowerCase() === "button";
}
function WT(e) {
  return ec(e) && e.tagName.toLowerCase() === "form";
}
function UT(e) {
  return ec(e) && e.tagName.toLowerCase() === "input";
}
function VT(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function HT(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !VT(e);
}
function cp(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
      let o = e[r];
      return t.concat(
        Array.isArray(o) ? o.map((s) => [r, s]) : [[r, o]]
      );
    }, [])
  );
}
function qT(e, t) {
  let r = cp(e);
  return t && t.forEach((o, s) => {
    r.has(s) || t.getAll(s).forEach((l) => {
      r.append(s, l);
    });
  }), r;
}
var Ll = null;
function KT() {
  if (Ll === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ll = !1;
    } catch {
      Ll = !0;
    }
  return Ll;
}
var QT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function kf(e) {
  return e != null && !QT.has(e) ? (Dn(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${au}"`
  ), null) : e;
}
function GT(e, t) {
  let r, o, s, l, u;
  if (WT(e)) {
    let d = e.getAttribute("action");
    o = d ? wr(d, t) : null, r = e.getAttribute("method") || su, s = kf(e.getAttribute("enctype")) || au, l = new FormData(e);
  } else if (BT(e) || UT(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (o = p ? wr(p, t) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || su, s = kf(e.getAttribute("formenctype")) || kf(d.getAttribute("enctype")) || au, l = new FormData(d, e), !KT()) {
      let { name: f, type: g, value: m } = e;
      if (g === "image") {
        let w = f ? `${f}.` : "";
        l.append(`${w}x`, "0"), l.append(`${w}y`, "0");
      } else f && l.append(f, m);
    }
  } else {
    if (ec(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = su, o = null, s = au, u = e;
  }
  return l && s === "text/plain" && (u = l, l = void 0), { action: o, method: r.toLowerCase(), encType: s, formData: l, body: u };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ah(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function b0(e, t, r, o) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : t && wr(s.pathname, t) === "/" ? s.pathname = `${bu(t)}/_root.${o}` : s.pathname = `${bu(s.pathname)}.${o}`, s;
}
async function YT(e, t) {
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
function JT(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function XT(e, t, r) {
  let o = await Promise.all(
    e.map(async (s) => {
      let l = t.routes[s.route.id];
      if (l) {
        let u = await YT(l, r);
        return u.links ? u.links() : [];
      }
      return [];
    })
  );
  return n$(
    o.flat(1).filter(JT).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function $v(e, t, r, o, s, l) {
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
      let m = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof m == "boolean")
        return m;
    }
    return !0;
  }) : [];
}
function ZT(e, t, { includeHydrateFallback: r } = {}) {
  return e$(
    e.map((o) => {
      let s = t.routes[o.route.id];
      if (!s) return [];
      let l = [s.module];
      return s.clientActionModule && (l = l.concat(s.clientActionModule)), s.clientLoaderModule && (l = l.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (l = l.concat(s.hydrateFallbackModule)), s.imports && (l = l.concat(s.imports)), l;
    }).flat(1)
  );
}
function e$(e) {
  return [...new Set(e)];
}
function t$(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let o of r)
    t[o] = e[o];
  return t;
}
function n$(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((o, s) => {
    let l = JSON.stringify(t$(s));
    return r.has(l) || (r.add(l), o.push({ key: l, link: s })), o;
  }, []);
}
function lh() {
  let e = b.useContext(Co);
  return ah(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function r$() {
  let e = b.useContext(Zu);
  return ah(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var uh = b.createContext(void 0);
uh.displayName = "FrameworkContext";
function ch() {
  let e = b.useContext(uh);
  return ah(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function i$(e, t) {
  let r = b.useContext(uh), [o, s] = b.useState(!1), [l, u] = b.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: f, onMouseLeave: g, onTouchStart: m } = t, w = b.useRef(null);
  b.useEffect(() => {
    if (e === "render" && u(!0), e === "viewport") {
      let _ = ($) => {
        $.forEach((N) => {
          u(N.isIntersecting);
        });
      }, x = new IntersectionObserver(_, { threshold: 0.5 });
      return w.current && x.observe(w.current), () => {
        x.disconnect();
      };
    }
  }, [e]), b.useEffect(() => {
    if (o) {
      let _ = setTimeout(() => {
        u(!0);
      }, 100);
      return () => {
        clearTimeout(_);
      };
    }
  }, [o]);
  let k = () => {
    s(!0);
  }, S = () => {
    s(!1), u(!1);
  };
  return r ? e !== "intent" ? [l, w, {}] : [
    l,
    w,
    {
      onFocus: ys(d, k),
      onBlur: ys(p, S),
      onMouseEnter: ys(f, k),
      onMouseLeave: ys(g, S),
      onTouchStart: ys(m, k)
    }
  ] : [!1, w, {}];
}
function ys(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function o$({ page: e, ...t }) {
  let r = mT(), { router: o } = lh(), s = b.useMemo(
    () => i0(o.routes, e, o.basename),
    [o.routes, e, o.basename]
  );
  return s ? r ? /* @__PURE__ */ b.createElement(a$, { page: e, matches: s, ...t }) : /* @__PURE__ */ b.createElement(l$, { page: e, matches: s, ...t }) : null;
}
function s$(e) {
  let { manifest: t, routeModules: r } = ch(), [o, s] = b.useState([]);
  return b.useEffect(() => {
    let l = !1;
    return XT(e, t, r).then(
      (u) => {
        l || s(u);
      }
    ), () => {
      l = !0;
    };
  }, [e, t, r]), o;
}
function a$({
  page: e,
  matches: t,
  ...r
}) {
  let o = tr(), { future: s } = ch(), { basename: l } = lh(), u = b.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let d = b0(
      e,
      l,
      s.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, f = [];
    for (let g of t)
      typeof g.route.shouldRevalidate == "function" ? p = !0 : f.push(g.route.id);
    return p && f.length > 0 && d.searchParams.set("_routes", f.join(",")), [d.pathname + d.search];
  }, [
    l,
    s.unstable_trailingSlashAwareDataRequests,
    e,
    o,
    t
  ]);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, u.map((d) => /* @__PURE__ */ b.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function l$({
  page: e,
  matches: t,
  ...r
}) {
  let o = tr(), { future: s, manifest: l, routeModules: u } = ch(), { basename: d } = lh(), { loaderData: p, matches: f } = r$(), g = b.useMemo(
    () => $v(
      e,
      t,
      f,
      l,
      o,
      "data"
    ),
    [e, t, f, l, o]
  ), m = b.useMemo(
    () => $v(
      e,
      t,
      f,
      l,
      o,
      "assets"
    ),
    [e, t, f, l, o]
  ), w = b.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let _ = /* @__PURE__ */ new Set(), x = !1;
    if (t.forEach((N) => {
      let C = l.routes[N.route.id];
      !C || !C.hasLoader || (!g.some((R) => R.route.id === N.route.id) && N.route.id in p && u[N.route.id]?.shouldRevalidate || C.hasClientLoader ? x = !0 : _.add(N.route.id));
    }), _.size === 0)
      return [];
    let $ = b0(
      e,
      d,
      s.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return x && _.size > 0 && $.searchParams.set(
      "_routes",
      t.filter((N) => _.has(N.route.id)).map((N) => N.route.id).join(",")
    ), [$.pathname + $.search];
  }, [
    d,
    s.unstable_trailingSlashAwareDataRequests,
    p,
    o,
    l,
    g,
    t,
    e,
    u
  ]), k = b.useMemo(
    () => ZT(m, l),
    [m, l]
  ), S = s$(m);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, w.map((_) => /* @__PURE__ */ b.createElement("link", { key: _, rel: "prefetch", as: "fetch", href: _, ...r })), k.map((_) => /* @__PURE__ */ b.createElement("link", { key: _, rel: "modulepreload", href: _, ...r })), S.map(({ key: _, link: x }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ b.createElement(
      "link",
      {
        key: _,
        nonce: r.nonce,
        ...x,
        crossOrigin: x.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function u$(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var c$ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  c$ && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
function d$({
  basename: e,
  children: t,
  unstable_useTransitions: r,
  window: o
}) {
  let s = b.useRef();
  s.current == null && (s.current = UR({ window: o, v5Compat: !0 }));
  let l = s.current, [u, d] = b.useState({
    action: l.action,
    location: l.location
  }), p = b.useCallback(
    (f) => {
      r === !1 ? d(f) : b.startTransition(() => d(f));
    },
    [r]
  );
  return b.useLayoutEffect(() => l.listen(p), [l, p]), /* @__PURE__ */ b.createElement(
    jT,
    {
      basename: e,
      children: t,
      location: u.location,
      navigationType: u.action,
      navigator: l,
      unstable_useTransitions: r
    }
  );
}
var _0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, x0 = b.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: l,
    replace: u,
    unstable_mask: d,
    state: p,
    target: f,
    to: g,
    preventScrollReset: m,
    viewTransition: w,
    unstable_defaultShouldRevalidate: k,
    ...S
  }, _) {
    let { basename: x, navigator: $, unstable_useTransitions: N } = b.useContext(xn), C = typeof g == "string" && _0.test(g), R = c0(g, x);
    g = R.to;
    let E = xT(g, { relative: s }), M = tr(), A = null;
    if (d) {
      let z = rh(
        d,
        [],
        M.unstable_mask ? M.unstable_mask.pathname : "/",
        !0
      );
      x !== "/" && (z.pathname = z.pathname === "/" ? x : In([x, z.pathname])), A = $.createHref(z);
    }
    let [I, L, v] = i$(
      o,
      S
    ), P = g$(g, {
      replace: u,
      unstable_mask: d,
      state: p,
      target: f,
      preventScrollReset: m,
      relative: s,
      viewTransition: w,
      unstable_defaultShouldRevalidate: k,
      unstable_useTransitions: N
    });
    function O(z) {
      t && t(z), z.defaultPrevented || P(z);
    }
    let F = !(R.isExternal || l), B = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ b.createElement(
        "a",
        {
          ...S,
          ...v,
          href: (F ? A : void 0) || R.absoluteURL || E,
          onClick: F ? O : t,
          ref: u$(_, L),
          target: f,
          "data-discover": !C && r === "render" ? "true" : void 0
        }
      )
    );
    return I && !C ? /* @__PURE__ */ b.createElement(b.Fragment, null, B, /* @__PURE__ */ b.createElement(o$, { page: E })) : B;
  }
);
x0.displayName = "Link";
var f$ = b.forwardRef(
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
    let m = ca(u, { relative: f.relative }), w = tr(), k = b.useContext(Zu), { navigator: S, basename: _ } = b.useContext(xn), x = k != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    b$(m) && d === !0, $ = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, N = w.pathname, C = k && k.navigation && k.navigation.location ? k.navigation.location.pathname : null;
    r || (N = N.toLowerCase(), C = C ? C.toLowerCase() : null, $ = $.toLowerCase()), C && _ && (C = wr(C, _) || C);
    const R = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
    let E = N === $ || !s && N.startsWith($) && N.charAt(R) === "/", M = C != null && (C === $ || !s && C.startsWith($) && C.charAt($.length) === "/"), A = {
      isActive: E,
      isPending: M,
      isTransitioning: x
    }, I = E ? t : void 0, L;
    typeof o == "function" ? L = o(A) : L = [
      o,
      E ? "active" : null,
      M ? "pending" : null,
      x ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let v = typeof l == "function" ? l(A) : l;
    return /* @__PURE__ */ b.createElement(
      x0,
      {
        ...f,
        "aria-current": I,
        className: L,
        ref: g,
        style: v,
        to: u,
        viewTransition: d
      },
      typeof p == "function" ? p(A) : p
    );
  }
);
f$.displayName = "NavLink";
var p$ = b.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: o,
    replace: s,
    state: l,
    method: u = su,
    action: d,
    onSubmit: p,
    relative: f,
    preventScrollReset: g,
    viewTransition: m,
    unstable_defaultShouldRevalidate: w,
    ...k
  }, S) => {
    let { unstable_useTransitions: _ } = b.useContext(xn), x = w$(), $ = S$(d, { relative: f }), N = u.toLowerCase() === "get" ? "get" : "post", C = typeof d == "string" && _0.test(d), R = (E) => {
      if (p && p(E), E.defaultPrevented) return;
      E.preventDefault();
      let M = E.nativeEvent.submitter, A = M?.getAttribute("formmethod") || u, I = () => x(M || E.currentTarget, {
        fetcherKey: t,
        method: A,
        navigate: r,
        replace: s,
        state: l,
        relative: f,
        preventScrollReset: g,
        viewTransition: m,
        unstable_defaultShouldRevalidate: w
      });
      _ && r !== !1 ? b.startTransition(() => I()) : I();
    };
    return /* @__PURE__ */ b.createElement(
      "form",
      {
        ref: S,
        method: N,
        action: $,
        onSubmit: o ? p : R,
        ...k,
        "data-discover": !C && e === "render" ? "true" : void 0
      }
    );
  }
);
p$.displayName = "Form";
function h$(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function k0(e) {
  let t = b.useContext(Co);
  return Je(t, h$(e)), t;
}
function g$(e, {
  target: t,
  replace: r,
  unstable_mask: o,
  state: s,
  preventScrollReset: l,
  relative: u,
  viewTransition: d,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: f
} = {}) {
  let g = y0(), m = tr(), w = ca(e, { relative: u });
  return b.useCallback(
    (k) => {
      if (HT(k, t)) {
        k.preventDefault();
        let S = r !== void 0 ? r : Us(m) === Us(w), _ = () => g(e, {
          replace: S,
          unstable_mask: o,
          state: s,
          preventScrollReset: l,
          relative: u,
          viewTransition: d,
          unstable_defaultShouldRevalidate: p
        });
        f ? b.startTransition(() => _()) : _();
      }
    },
    [
      m,
      g,
      w,
      r,
      o,
      s,
      t,
      e,
      l,
      u,
      d,
      p,
      f
    ]
  );
}
function m$(e) {
  Dn(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let t = b.useRef(cp(e)), r = b.useRef(!1), o = tr(), s = b.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      qT(
        o.search,
        r.current ? null : t.current
      )
    ),
    [o.search]
  ), l = y0(), u = b.useCallback(
    (d, p) => {
      const f = cp(
        typeof d == "function" ? d(new URLSearchParams(s)) : d
      );
      r.current = !0, l("?" + f, p);
    },
    [l, s]
  );
  return [s, u];
}
var y$ = 0, v$ = () => `__${String(++y$)}__`;
function w$() {
  let { router: e } = k0(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = b.useContext(xn), r = OT(), o = e.fetch, s = e.navigate;
  return b.useCallback(
    async (l, u = {}) => {
      let { action: d, method: p, encType: f, formData: g, body: m } = GT(
        l,
        t
      );
      if (u.navigate === !1) {
        let w = u.fetcherKey || v$();
        await o(w, r, u.action || d, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: g,
          body: m,
          formMethod: u.method || p,
          formEncType: u.encType || f,
          flushSync: u.flushSync
        });
      } else
        await s(u.action || d, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: g,
          body: m,
          formMethod: u.method || p,
          formEncType: u.encType || f,
          replace: u.replace,
          state: u.state,
          fromRouteId: r,
          flushSync: u.flushSync,
          viewTransition: u.viewTransition
        });
    },
    [o, s, t, r]
  );
}
function S$(e, { relative: t } = {}) {
  let { basename: r } = b.useContext(xn), o = b.useContext(er);
  Je(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), l = { ...ca(e || ".", { relative: t }) }, u = tr();
  if (e == null) {
    l.search = u.search;
    let d = new URLSearchParams(l.search), p = d.getAll("index");
    if (p.some((g) => g === "")) {
      d.delete("index"), p.filter((m) => m).forEach((m) => d.append("index", m));
      let g = d.toString();
      l.search = g ? `?${g}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (l.pathname = l.pathname === "/" ? r : In([r, l.pathname])), Us(l);
}
function b$(e, { relative: t } = {}) {
  let r = b.useContext(p0);
  Je(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = k0(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = ca(e, { relative: t });
  if (!r.isTransitioning)
    return !1;
  let l = wr(r.currentLocation.pathname, o) || r.currentLocation.pathname, u = wr(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return Su(s.pathname, u) != null || Su(s.pathname, l) != null;
}
const Ce = (e) => typeof e == "string", vs = () => {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}, Mv = (e) => e == null ? "" : String(e), _$ = (e, t, r) => {
  e.forEach((o) => {
    t[o] && (r[o] = t[o]);
  });
}, x$ = /###/g, Av = (e) => e && e.includes("###") ? e.replace(x$, ".") : e, Iv = (e) => !e || Ce(e), As = (e, t, r) => {
  const o = Ce(t) ? t.split(".") : t;
  let s = 0;
  for (; s < o.length - 1; ) {
    if (Iv(e)) return {};
    const l = Av(o[s]);
    !e[l] && r && (e[l] = new r()), Object.prototype.hasOwnProperty.call(e, l) ? e = e[l] : e = {}, ++s;
  }
  return Iv(e) ? {} : {
    obj: e,
    k: Av(o[s])
  };
}, Nv = (e, t, r) => {
  const {
    obj: o,
    k: s
  } = As(e, t, Object);
  if (o !== void 0 || t.length === 1) {
    o[s] = r;
    return;
  }
  let l = t[t.length - 1], u = t.slice(0, t.length - 1), d = As(e, u, Object);
  for (; d.obj === void 0 && u.length; )
    l = `${u[u.length - 1]}.${l}`, u = u.slice(0, u.length - 1), d = As(e, u, Object), d?.obj && typeof d.obj[`${d.k}.${l}`] < "u" && (d.obj = void 0);
  d.obj[`${d.k}.${l}`] = r;
}, k$ = (e, t, r, o) => {
  const {
    obj: s,
    k: l
  } = As(e, t, Object);
  s[l] = s[l] || [], s[l].push(r);
}, _u = (e, t) => {
  const {
    obj: r,
    k: o
  } = As(e, t);
  if (r && Object.prototype.hasOwnProperty.call(r, o))
    return r[o];
}, C$ = (e, t, r) => {
  const o = _u(e, r);
  return o !== void 0 ? o : _u(t, r);
}, C0 = (e, t, r) => {
  for (const o in t)
    o !== "__proto__" && o !== "constructor" && (o in e ? Ce(e[o]) || e[o] instanceof String || Ce(t[o]) || t[o] instanceof String ? r && (e[o] = t[o]) : C0(e[o], t[o], r) : e[o] = t[o]);
  return e;
}, pr = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), E$ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
}, P$ = (e) => Ce(e) ? e.replace(/[&<>"'\/]/g, (t) => E$[t]) : e;
class R$ {
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
const T$ = [" ", ",", "?", "!", ";"], $$ = new R$(20), M$ = (e, t, r) => {
  t = t || "", r = r || "";
  const o = T$.filter((u) => !t.includes(u) && !r.includes(u));
  if (o.length === 0) return !0;
  const s = $$.getRegExp(`(${o.map((u) => u === "?" ? "\\?" : u).join("|")})`);
  let l = !s.test(e);
  if (!l) {
    const u = e.indexOf(r);
    u > 0 && !s.test(e.substring(0, u)) && (l = !0);
  }
  return l;
}, dp = (e, t, r = ".") => {
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
        if (["string", "number", "boolean"].includes(typeof u) && p < o.length - 1)
          continue;
        l += p - l + 1;
        break;
      }
    s = u;
  }
  return s;
}, Vs = (e) => e?.replace(/_/g, "-"), A$ = {
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
class xu {
  constructor(t, r = {}) {
    this.init(t, r);
  }
  init(t, r = {}) {
    this.prefix = r.prefix || "i18next:", this.logger = t || A$, this.options = r, this.debug = r.debug;
  }
  log(...t) {
    return this.forward(t, "log", "", !0);
  }
  warn(...t) {
    return this.forward(t, "warn", "", !0);
  }
  error(...t) {
    return this.forward(t, "error", "");
  }
  deprecate(...t) {
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, r, o, s) {
    return s && !this.debug ? null : (t = t.map((l) => Ce(l) ? l.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : l), Ce(t[0]) && (t[0] = `${o}${this.prefix} ${t[0]}`), this.logger[r](t));
  }
  create(t) {
    return new xu(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new xu(this.logger, t);
  }
}
var Qn = new xu();
class tc {
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
  once(t, r) {
    const o = (...s) => {
      r(...s), this.off(t, o);
    };
    return this.on(t, o), this;
  }
  emit(t, ...r) {
    this.observers[t] && Array.from(this.observers[t].entries()).forEach(([s, l]) => {
      for (let u = 0; u < l; u++)
        s(...r);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([s, l]) => {
      for (let u = 0; u < l; u++)
        s(t, ...r);
    });
  }
}
class Ov extends tc {
  constructor(t, r = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super(), this.data = t || {}, this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.includes(t) || this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const r = this.options.ns.indexOf(t);
    r > -1 && this.options.ns.splice(r, 1);
  }
  getResource(t, r, o, s = {}) {
    const l = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, u = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let d;
    t.includes(".") ? d = t.split(".") : (d = [t, r], o && (Array.isArray(o) ? d.push(...o) : Ce(o) && l ? d.push(...o.split(l)) : d.push(o)));
    const p = _u(this.data, d);
    return !p && !r && !o && t.includes(".") && (t = d[0], r = d[1], o = d.slice(2).join(".")), p || !u || !Ce(o) ? p : dp(this.data?.[t]?.[r], o, l);
  }
  addResource(t, r, o, s, l = {
    silent: !1
  }) {
    const u = l.keySeparator !== void 0 ? l.keySeparator : this.options.keySeparator;
    let d = [t, r];
    o && (d = d.concat(u ? o.split(u) : o)), t.includes(".") && (d = t.split("."), s = r, r = d[1]), this.addNamespaces(r), Nv(this.data, d, s), l.silent || this.emit("added", t, r, o, s);
  }
  addResources(t, r, o, s = {
    silent: !1
  }) {
    for (const l in o)
      (Ce(o[l]) || Array.isArray(o[l])) && this.addResource(t, r, l, o[l], {
        silent: !0
      });
    s.silent || this.emit("added", t, r, o);
  }
  addResourceBundle(t, r, o, s, l, u = {
    silent: !1,
    skipCopy: !1
  }) {
    let d = [t, r];
    t.includes(".") && (d = t.split("."), s = o, o = r, r = d[1]), this.addNamespaces(r);
    let p = _u(this.data, d) || {};
    u.skipCopy || (o = JSON.parse(JSON.stringify(o))), s ? C0(p, o, l) : p = {
      ...p,
      ...o
    }, Nv(this.data, d, p), u.silent || this.emit("added", t, r, o);
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
var E0 = {
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
const P0 = /* @__PURE__ */ Symbol("i18next/PATH_KEY");
function I$() {
  const e = [], t = /* @__PURE__ */ Object.create(null);
  let r;
  return t.get = (o, s) => (r?.revoke?.(), s === P0 ? e : (e.push(s), r = Proxy.revocable(o, t), r.proxy)), Proxy.revocable(/* @__PURE__ */ Object.create(null), t).proxy;
}
function mo(e, t) {
  const {
    [P0]: r
  } = e(I$()), o = t?.keySeparator ?? ".", s = t?.nsSeparator ?? ":", l = t?.enableSelector === "strict";
  if (r.length > 1 && s) {
    const u = t?.ns, d = l ? Array.isArray(u) ? u : u ? [u] : null : Array.isArray(u) ? u : null;
    if (d && (l ? d : d.length > 1 ? d.slice(1) : []).includes(r[0]))
      return `${r[0]}${s}${r.slice(1).join(o)}`;
  }
  return r.join(o);
}
const Cf = (e) => !Ce(e) && typeof e != "boolean" && typeof e != "number";
class ku extends tc {
  constructor(t, r = {}) {
    super(), _$(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Qn.create("translator"), this.checkedLoadedFor = {};
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t, r = {
    interpolation: {}
  }) {
    const o = {
      ...r
    };
    if (t == null) return !1;
    const s = this.resolve(t, o);
    if (s?.res === void 0) return !1;
    const l = Cf(s.res);
    return !(o.returnObjects === !1 && l);
  }
  extractFromKey(t, r) {
    let o = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
    o === void 0 && (o = ":");
    const s = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = r.ns || this.options.defaultNS || [];
    const u = o && t.includes(o), d = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !M$(t, o, s);
    if (u && !d) {
      const p = t.match(this.interpolator.nestingRegexp);
      if (p && p.length > 0)
        return {
          key: t,
          namespaces: Ce(l) ? [l] : l
        };
      const f = t.split(o);
      (o !== s || o === s && this.options.ns.includes(f[0])) && (l = f.shift()), t = f.join(s);
    }
    return {
      key: t,
      namespaces: Ce(l) ? [l] : l
    };
  }
  translate(t, r, o) {
    let s = typeof r == "object" ? {
      ...r
    } : r;
    if (typeof s != "object" && this.options.overloadTranslationOptionHandler && (s = this.options.overloadTranslationOptionHandler(arguments)), typeof s == "object" && (s = {
      ...s
    }), s || (s = {}), t == null) return "";
    typeof t == "function" && (t = mo(t, {
      ...this.options,
      ...s
    })), Array.isArray(t) || (t = [String(t)]), t = t.map((F) => typeof F == "function" ? mo(F, {
      ...this.options,
      ...s
    }) : String(F));
    const l = s.returnDetails !== void 0 ? s.returnDetails : this.options.returnDetails, u = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, {
      key: d,
      namespaces: p
    } = this.extractFromKey(t[t.length - 1], s), f = p[p.length - 1];
    let g = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    g === void 0 && (g = ":");
    const m = s.lng || this.language, w = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (m?.toLowerCase() === "cimode")
      return w ? l ? {
        res: `${f}${g}${d}`,
        usedKey: d,
        exactUsedKey: d,
        usedLng: m,
        usedNS: f,
        usedParams: this.getUsedParamsDetails(s)
      } : `${f}${g}${d}` : l ? {
        res: d,
        usedKey: d,
        exactUsedKey: d,
        usedLng: m,
        usedNS: f,
        usedParams: this.getUsedParamsDetails(s)
      } : d;
    const k = this.resolve(t, s);
    let S = k?.res;
    const _ = k?.usedKey || d, x = k?.exactUsedKey || d, $ = ["[object Number]", "[object Function]", "[object RegExp]"], N = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays, C = !this.i18nFormat || this.i18nFormat.handleAsObject, R = s.count !== void 0 && !Ce(s.count), E = ku.hasDefaultValue(s), M = R ? this.pluralResolver.getSuffix(m, s.count, s) : "", A = s.ordinal && R ? this.pluralResolver.getSuffix(m, s.count, {
      ordinal: !1
    }) : "", I = R && !s.ordinal && s.count === 0, L = I && s[`defaultValue${this.options.pluralSeparator}zero`] || s[`defaultValue${M}`] || s[`defaultValue${A}`] || s.defaultValue;
    let v = S;
    C && !S && E && (v = L);
    const P = Cf(v), O = Object.prototype.toString.apply(v);
    if (C && v && P && !$.includes(O) && !(Ce(N) && Array.isArray(v))) {
      if (!s.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const F = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(_, v, {
          ...s,
          ns: p
        }) : `key '${d} (${this.language})' returned an object instead of string.`;
        return l ? (k.res = F, k.usedParams = this.getUsedParamsDetails(s), k) : F;
      }
      if (u) {
        const F = Array.isArray(v), B = F ? [] : {}, z = F ? x : _;
        for (const V in v)
          if (Object.prototype.hasOwnProperty.call(v, V)) {
            const G = `${z}${u}${V}`;
            E && !S ? B[V] = this.translate(G, {
              ...s,
              defaultValue: Cf(L) ? L[V] : void 0,
              joinArrays: !1,
              ns: p
            }) : B[V] = this.translate(G, {
              ...s,
              joinArrays: !1,
              ns: p
            }), B[V] === G && (B[V] = v[V]);
          }
        S = B;
      }
    } else if (C && Ce(N) && Array.isArray(S))
      S = S.join(N), S && (S = this.extendTranslation(S, t, s, o));
    else {
      let F = !1, B = !1;
      !this.isValidLookup(S) && E && (F = !0, S = L), this.isValidLookup(S) || (B = !0, S = d);
      const V = (s.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && B ? void 0 : S, G = E && L !== S && this.options.updateMissing;
      if (B || F || G) {
        if (this.logger.log(G ? "updateKey" : "missingKey", m, f, R && !G ? `${d}${this.pluralResolver.getSuffix(m, s.count, s)}` : d, G ? L : S), u) {
          const D = this.resolve(d, {
            ...s,
            keySeparator: !1
          });
          D && D.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let U = [];
        const H = this.languageUtils.getFallbackCodes(this.options.fallbackLng, s.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && H && H[0])
          for (let D = 0; D < H.length; D++)
            U.push(H[D]);
        else this.options.saveMissingTo === "all" ? U = this.languageUtils.toResolveHierarchy(s.lng || this.language) : U.push(s.lng || this.language);
        const K = (D, Y, re) => {
          const te = E && re !== S ? re : V;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(D, f, Y, te, G, s) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(D, f, Y, te, G, s), this.emit("missingKey", D, f, Y, S);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && R ? U.forEach((D) => {
          const Y = this.pluralResolver.getSuffixes(D, s);
          I && s[`defaultValue${this.options.pluralSeparator}zero`] && !Y.includes(`${this.options.pluralSeparator}zero`) && Y.push(`${this.options.pluralSeparator}zero`), Y.forEach((re) => {
            K([D], d + re, s[`defaultValue${re}`] || L);
          });
        }) : K(U, d, L));
      }
      S = this.extendTranslation(S, t, s, k, o), B && S === d && this.options.appendNamespaceToMissingKey && (S = `${f}${g}${d}`), (B || F) && this.options.parseMissingKeyHandler && (S = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${f}${g}${d}` : d, F ? S : void 0, s));
    }
    return l ? (k.res = S, k.usedParams = this.getUsedParamsDetails(s), k) : S;
  }
  extendTranslation(t, r, o, s, l) {
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
      const p = Ce(t) && (o?.interpolation?.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let f;
      if (p) {
        const m = t.match(this.interpolator.nestingRegexp);
        f = m && m.length;
      }
      let g = o.replace && !Ce(o.replace) ? o.replace : o;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), t = this.interpolator.interpolate(t, g, o.lng || this.language || s.usedLng, o), p) {
        const m = t.match(this.interpolator.nestingRegexp), w = m && m.length;
        f < w && (o.nest = !1);
      }
      !o.lng && s && s.res && (o.lng = this.language || s.usedLng), o.nest !== !1 && (t = this.interpolator.nest(t, (...m) => l?.[0] === m[0] && !o.context ? (this.logger.warn(`It seems you are nesting recursively key: ${m[0]} in key: ${r[0]}`), null) : this.translate(...m, r), o)), o.interpolation && this.interpolator.reset();
    }
    const u = o.postProcess || this.options.postProcess, d = Ce(u) ? [u] : u;
    return t != null && d?.length && o.applyPostProcessor !== !1 && (t = E0.handle(d, t, r, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...s,
        usedParams: this.getUsedParamsDetails(o)
      },
      ...o
    } : o, this)), t;
  }
  resolve(t, r = {}) {
    let o, s, l, u, d;
    return Ce(t) && (t = [t]), Array.isArray(t) && (t = t.map((p) => typeof p == "function" ? mo(p, {
      ...this.options,
      ...r
    }) : p)), t.forEach((p) => {
      if (this.isValidLookup(o)) return;
      const f = this.extractFromKey(p, r), g = f.key;
      s = g;
      let m = f.namespaces;
      this.options.fallbackNS && (m = m.concat(this.options.fallbackNS));
      const w = r.count !== void 0 && !Ce(r.count), k = w && !r.ordinal && r.count === 0, S = r.context !== void 0 && (Ce(r.context) || typeof r.context == "number") && r.context !== "", _ = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
      m.forEach((x) => {
        this.isValidLookup(o) || (d = x, !this.checkedLoadedFor[`${_[0]}-${x}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(d) && (this.checkedLoadedFor[`${_[0]}-${x}`] = !0, this.logger.warn(`key "${s}" for languages "${_.join(", ")}" won't get resolved as namespace "${d}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), _.forEach(($) => {
          if (this.isValidLookup(o)) return;
          u = $;
          const N = [g];
          if (this.i18nFormat?.addLookupKeys)
            this.i18nFormat.addLookupKeys(N, g, $, x, r);
          else {
            let R;
            w && (R = this.pluralResolver.getSuffix($, r.count, r));
            const E = `${this.options.pluralSeparator}zero`, M = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (w && (r.ordinal && R.startsWith(M) && N.push(g + R.replace(M, this.options.pluralSeparator)), N.push(g + R), k && N.push(g + E)), S) {
              const A = `${g}${this.options.contextSeparator || "_"}${r.context}`;
              N.push(A), w && (r.ordinal && R.startsWith(M) && N.push(A + R.replace(M, this.options.pluralSeparator)), N.push(A + R), k && N.push(A + E));
            }
          }
          let C;
          for (; C = N.pop(); )
            this.isValidLookup(o) || (l = C, o = this.getResource($, x, C, r));
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
  getResource(t, r, o, s = {}) {
    return this.i18nFormat?.getResource ? this.i18nFormat.getResource(t, r, o, s) : this.resourceStore.getResource(t, r, o, s);
  }
  getUsedParamsDetails(t = {}) {
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
      if (Object.prototype.hasOwnProperty.call(t, o) && o.startsWith(r) && t[o] !== void 0)
        return !0;
    return !1;
  }
}
class Lv {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Qn.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = Vs(t), !t || !t.includes("-")) return null;
    const r = t.split("-");
    return r.length === 2 || (r.pop(), r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = Vs(t), !t || !t.includes("-")) return t;
    const r = t.split("-");
    return this.formatLanguageCode(r[0]);
  }
  formatLanguageCode(t) {
    if (Ce(t) && t.includes("-")) {
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
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(t);
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
      const s = this.getScriptPartFromCode(o);
      if (this.isSupportedCode(s)) return r = s;
      const l = this.getLanguagePartFromCode(o);
      if (this.isSupportedCode(l)) return r = l;
      r = this.options.supportedLngs.find((u) => u === l ? !0 : !u.includes("-") && !l.includes("-") ? !1 : !!(u.includes("-") && !l.includes("-") && u.slice(0, u.indexOf("-")) === l || u.startsWith(l) && l.length > 1));
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
    const o = this.getFallbackCodes((r === !1 ? [] : r) || this.options.fallbackLng || [], t), s = [], l = (u) => {
      u && (this.isSupportedCode(u) ? s.push(u) : this.logger.warn(`rejecting language code not found in supportedLngs: ${u}`));
    };
    return Ce(t) && (t.includes("-") || t.includes("_")) ? (this.options.load !== "languageOnly" && l(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && l(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && l(this.getLanguagePartFromCode(t))) : Ce(t) && l(this.formatLanguageCode(t)), o.forEach((u) => {
      s.includes(u) || l(this.formatLanguageCode(u));
    }), s;
  }
}
const Dv = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, Fv = {
  select: (e) => e === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class N$ {
  constructor(t, r = {}) {
    this.languageUtils = t, this.options = r, this.logger = Qn.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t, r = {}) {
    const o = Vs(t === "dev" ? "en" : t), s = r.ordinal ? "ordinal" : "cardinal", l = JSON.stringify({
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
      if (typeof Intl > "u")
        return this.logger.error("No Intl support, please use an Intl polyfill!"), Fv;
      if (!t.match(/-|_/)) return Fv;
      const p = this.languageUtils.getLanguagePartFromCode(t);
      u = this.getRule(p, r);
    }
    return this.pluralRulesCache[l] = u, u;
  }
  needsPlural(t, r = {}) {
    let o = this.getRule(t, r);
    return o || (o = this.getRule("dev", r)), o?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(t, r, o = {}) {
    return this.getSuffixes(t, o).map((s) => `${r}${s}`);
  }
  getSuffixes(t, r = {}) {
    let o = this.getRule(t, r);
    return o || (o = this.getRule("dev", r)), o ? o.resolvedOptions().pluralCategories.sort((s, l) => Dv[s] - Dv[l]).map((s) => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : [];
  }
  getSuffix(t, r, o = {}) {
    const s = this.getRule(t, o);
    return s ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(r)}` : (this.logger.warn(`no plural rule found for: ${t}`), this.getSuffix("dev", r, o));
  }
}
const jv = (e, t, r, o = ".", s = !0) => {
  let l = C$(e, t, r);
  return !l && s && Ce(r) && (l = dp(e, r, o), l === void 0 && (l = dp(t, r, o))), l;
}, Ef = (e) => e.replace(/\$/g, "$$$$");
class zv {
  constructor(t = {}) {
    this.logger = Qn.create("interpolator"), this.options = t, this.format = t?.interpolation?.format || ((r) => r), this.init(t);
  }
  init(t = {}) {
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
      unescapePrefix: m,
      nestingPrefix: w,
      nestingPrefixEscaped: k,
      nestingSuffix: S,
      nestingSuffixEscaped: _,
      nestingOptionsSeparator: x,
      maxReplaces: $,
      alwaysFormat: N
    } = t.interpolation;
    this.escape = r !== void 0 ? r : P$, this.escapeValue = o !== void 0 ? o : !0, this.useRawValueToEscape = s !== void 0 ? s : !1, this.prefix = l ? pr(l) : u || "{{", this.suffix = d ? pr(d) : p || "}}", this.formatSeparator = f || ",", this.unescapePrefix = g ? "" : m ? pr(m) : "-", this.unescapeSuffix = this.unescapePrefix ? "" : g ? pr(g) : "", this.nestingPrefix = w ? pr(w) : k || pr("$t("), this.nestingSuffix = S ? pr(S) : _ || pr(")"), this.nestingOptionsSeparator = x || ",", this.maxReplaces = $ || 1e3, this.alwaysFormat = N !== void 0 ? N : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (r, o) => r?.source === o ? (r.lastIndex = 0, r) : new RegExp(o, "g");
    this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = t(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = t(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(t, r, o, s) {
    let l, u, d;
    const p = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, f = (k) => {
      if (!k.includes(this.formatSeparator)) {
        const $ = jv(r, p, k, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format($, void 0, o, {
          ...s,
          ...r,
          interpolationkey: k
        }) : $;
      }
      const S = k.split(this.formatSeparator), _ = S.shift().trim(), x = S.join(this.formatSeparator).trim();
      return this.format(jv(r, p, _, this.options.keySeparator, this.options.ignoreJSONStructure), x, o, {
        ...s,
        ...r,
        interpolationkey: _
      });
    };
    this.resetRegExp(), !this.escapeValue && typeof t == "string" && /\$t\([^)]*\{[^}]*\{\{/.test(t) && this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
    const g = s?.missingInterpolationHandler || this.options.missingInterpolationHandler, m = s?.interpolation?.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (k) => Ef(k)
    }, {
      regex: this.regexp,
      safeValue: (k) => this.escapeValue ? Ef(this.escape(k)) : Ef(k)
    }].forEach((k) => {
      for (d = 0; l = k.regex.exec(t); ) {
        const S = l[1].trim();
        if (u = f(S), u === void 0)
          if (typeof g == "function") {
            const x = g(t, l, s);
            u = Ce(x) ? x : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, S))
            u = "";
          else if (m) {
            u = l[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${S} for interpolating ${t}`), u = "";
        else !Ce(u) && !this.useRawValueToEscape && (u = Mv(u));
        const _ = k.safeValue(u);
        if (t = t.replace(l[0], _), m ? (k.regex.lastIndex += u.length, k.regex.lastIndex -= l[0].length) : k.regex.lastIndex = 0, d++, d >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, r, o = {}) {
    let s, l, u;
    const d = (p, f) => {
      const g = this.nestingOptionsSeparator;
      if (!p.includes(g)) return p;
      const m = p.split(new RegExp(`${pr(g)}[ ]*{`));
      let w = `{${m[1]}`;
      p = m[0], w = this.interpolate(w, u);
      const k = w.match(/'/g), S = w.match(/"/g);
      ((k?.length ?? 0) % 2 === 0 && !S || (S?.length ?? 0) % 2 !== 0) && (w = w.replace(/'/g, '"'));
      try {
        u = JSON.parse(w), f && (u = {
          ...f,
          ...u
        });
      } catch (_) {
        return this.logger.warn(`failed parsing options string in nesting for key ${p}`, _), `${p}${g}${w}`;
      }
      return u.defaultValue && u.defaultValue.includes(this.prefix) && delete u.defaultValue, p;
    };
    for (; s = this.nestingRegexp.exec(t); ) {
      let p = [];
      u = {
        ...o
      }, u = u.replace && !Ce(u.replace) ? u.replace : u, u.applyPostProcessor = !1, delete u.defaultValue;
      const f = /{.*}/.test(s[1]) ? s[1].lastIndexOf("}") + 1 : s[1].indexOf(this.formatSeparator);
      if (f !== -1 && (p = s[1].slice(f).split(this.formatSeparator).map((g) => g.trim()).filter(Boolean), s[1] = s[1].slice(0, f)), l = r(d.call(this, s[1].trim(), u), u), l && s[0] === t && !Ce(l)) return l;
      Ce(l) || (l = Mv(l)), l || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`), l = ""), p.length && (l = p.reduce((g, m) => this.format(g, m, o.lng, {
        ...o,
        interpolationkey: s[1].trim()
      }), l.trim())), t = t.replace(s[0], l), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
const O$ = (e) => {
  let t = e.toLowerCase().trim();
  const r = {};
  if (e.includes("(")) {
    const o = e.split("(");
    t = o[0].toLowerCase().trim();
    const s = o[1].slice(0, -1);
    t === "currency" && !s.includes(":") ? r.currency || (r.currency = s.trim()) : t === "relativetime" && !s.includes(":") ? r.range || (r.range = s.trim()) : s.split(";").forEach((u) => {
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
}, Bv = (e) => {
  const t = {};
  return (r, o, s) => {
    let l = s;
    s && s.interpolationkey && s.formatParams && s.formatParams[s.interpolationkey] && s[s.interpolationkey] && (l = {
      ...l,
      [s.interpolationkey]: void 0
    });
    const u = o + JSON.stringify(l);
    let d = t[u];
    return d || (d = e(Vs(o), s), t[u] = d), d(r);
  };
}, L$ = (e) => (t, r, o) => e(Vs(r), o)(t);
class D$ {
  constructor(t = {}) {
    this.logger = Qn.create("formatter"), this.options = t, this.init(t);
  }
  init(t, r = {
    interpolation: {}
  }) {
    this.formatSeparator = r.interpolation.formatSeparator || ",";
    const o = r.cacheInBuiltFormats ? Bv : L$;
    this.formats = {
      number: o((s, l) => {
        const u = new Intl.NumberFormat(s, {
          ...l
        });
        return (d) => u.format(d);
      }),
      currency: o((s, l) => {
        const u = new Intl.NumberFormat(s, {
          ...l,
          style: "currency"
        });
        return (d) => u.format(d);
      }),
      datetime: o((s, l) => {
        const u = new Intl.DateTimeFormat(s, {
          ...l
        });
        return (d) => u.format(d);
      }),
      relativetime: o((s, l) => {
        const u = new Intl.RelativeTimeFormat(s, {
          ...l
        });
        return (d) => u.format(d, l.range || "day");
      }),
      list: o((s, l) => {
        const u = new Intl.ListFormat(s, {
          ...l
        });
        return (d) => u.format(d);
      })
    };
  }
  add(t, r) {
    this.formats[t.toLowerCase().trim()] = r;
  }
  addCached(t, r) {
    this.formats[t.toLowerCase().trim()] = Bv(r);
  }
  format(t, r, o, s = {}) {
    if (!r || t == null) return t;
    const l = r.split(this.formatSeparator);
    if (l.length > 1 && l[0].indexOf("(") > 1 && !l[0].includes(")") && l.find((d) => d.includes(")"))) {
      const d = l.findIndex((p) => p.includes(")"));
      l[0] = [l[0], ...l.splice(1, d)].join(this.formatSeparator);
    }
    return l.reduce((d, p) => {
      const {
        formatName: f,
        formatOptions: g
      } = O$(p);
      if (this.formats[f]) {
        let m = d;
        try {
          const w = s?.formatParams?.[s.interpolationkey] || {}, k = w.locale || w.lng || s.locale || s.lng || o;
          m = this.formats[f](d, k, {
            ...g,
            ...s,
            ...w
          });
        } catch (w) {
          this.logger.warn(w);
        }
        return m;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return d;
    }, t);
  }
}
const F$ = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class j$ extends tc {
  constructor(t, r, o, s = {}) {
    super(), this.backend = t, this.store = r, this.services = o, this.languageUtils = o.languageUtils, this.options = s, this.logger = Qn.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(o, s.backend, s);
  }
  queueLoad(t, r, o, s) {
    const l = {}, u = {}, d = {}, p = {};
    return t.forEach((f) => {
      let g = !0;
      r.forEach((m) => {
        const w = `${f}|${m}`;
        !o.reload && this.store.hasResourceBundle(f, m) ? this.state[w] = 2 : this.state[w] < 0 || (this.state[w] === 1 ? u[w] === void 0 && (u[w] = !0) : (this.state[w] = 1, g = !1, u[w] === void 0 && (u[w] = !0), l[w] === void 0 && (l[w] = !0), p[m] === void 0 && (p[m] = !0)));
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
      k$(p.loaded, [l], u), F$(p, t), r && p.errors.push(r), p.pendingCount === 0 && !p.done && (Object.keys(p.loaded).forEach((f) => {
        d[f] || (d[f] = {});
        const g = p.loaded[f];
        g.length && g.forEach((m) => {
          d[f][m] === void 0 && (d[f][m] = !0);
        });
      }), p.done = !0, p.errors.length ? p.callback(p.errors) : p.callback());
    }), this.emit("loaded", d), this.queue = this.queue.filter((p) => !p.done);
  }
  read(t, r, o, s = 0, l = this.retryTimeout, u) {
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
        const m = this.waitingReads.shift();
        this.read(m.lng, m.ns, m.fcName, m.tried, m.wait, m.callback);
      }
      if (f && g && s < this.maxRetries) {
        setTimeout(() => {
          this.read(t, r, o, s + 1, l * 2, u);
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
  prepareLoading(t, r, o = {}, s) {
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
  loadOne(t, r = "") {
    const o = t.split("|"), s = o[0], l = o[1];
    this.read(s, l, "read", void 0, void 0, (u, d) => {
      u && this.logger.warn(`${r}loading namespace ${l} for language ${s} failed`, u), !u && d && this.logger.log(`${r}loaded namespace ${l} for language ${s}`, d), this.loaded(t, u, d);
    });
  }
  saveMissing(t, r, o, s, l, u = {}, d = () => {
  }) {
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
            f.length === 5 ? g = f(t, r, o, s, p) : g = f(t, r, o, s), g && typeof g.then == "function" ? g.then((m) => d(null, m)).catch(d) : d(null, g);
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
const Pf = () => ({
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
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  enableSelector: !1,
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
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  },
  cacheInBuiltFormats: !0
}), Wv = (e) => (Ce(e.ns) && (e.ns = [e.ns]), Ce(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), Ce(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && !e.supportedLngs.includes("cimode") && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e), Dl = () => {
}, z$ = (e) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((r) => {
    typeof e[r] == "function" && (e[r] = e[r].bind(e));
  });
};
class Is extends tc {
  constructor(t = {}, r) {
    if (super(), this.options = Wv(t), this.services = {}, this.logger = Qn, this.modules = {
      external: []
    }, z$(this), r && !this.isInitialized && !t.isClone) {
      if (!this.options.initAsync)
        return this.init(t, r), this;
      setTimeout(() => {
        this.init(t, r);
      }, 0);
    }
  }
  init(t = {}, r) {
    this.isInitializing = !0, typeof t == "function" && (r = t, t = {}), t.defaultNS == null && t.ns && (Ce(t.ns) ? t.defaultNS = t.ns : t.ns.includes("translation") || (t.defaultNS = t.ns[0]));
    const o = Pf();
    this.options = {
      ...o,
      ...this.options,
      ...Wv(t)
    }, this.options.interpolation = {
      ...o.interpolation,
      ...this.options.interpolation
    }, t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = o.overloadTranslationOptionHandler);
    const s = (f) => f ? typeof f == "function" ? new f() : f : null;
    if (!this.options.isClone) {
      this.modules.logger ? Qn.init(s(this.modules.logger), this.options) : Qn.init(null, this.options);
      let f;
      this.modules.formatter ? f = this.modules.formatter : f = D$;
      const g = new Lv(this.options);
      this.store = new Ov(this.options.resources, this.options);
      const m = this.services;
      m.logger = Qn, m.resourceStore = this.store, m.languageUtils = g, m.pluralResolver = new N$(g, {
        prepend: this.options.pluralSeparator
      }), f && (m.formatter = s(f), m.formatter.init && m.formatter.init(m, this.options), this.options.interpolation.format = m.formatter.format.bind(m.formatter)), m.interpolator = new zv(this.options), m.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, m.backendConnector = new j$(s(this.modules.backend), m.resourceStore, m, this.options), m.backendConnector.on("*", (w, ...k) => {
        this.emit(w, ...k);
      }), this.modules.languageDetector && (m.languageDetector = s(this.modules.languageDetector), m.languageDetector.init && m.languageDetector.init(m, this.options.detection, this.options)), this.modules.i18nFormat && (m.i18nFormat = s(this.modules.i18nFormat), m.i18nFormat.init && m.i18nFormat.init(this)), this.translator = new ku(this.services, this.options), this.translator.on("*", (w, ...k) => {
        this.emit(w, ...k);
      }), this.modules.external.forEach((w) => {
        w.init && w.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = Dl), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const f = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      f.length > 0 && f[0] !== "dev" && (this.options.lng = f[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((f) => {
      this[f] = (...g) => this.store[f](...g);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((f) => {
      this[f] = (...g) => (this.store[f](...g), this);
    });
    const d = vs(), p = () => {
      const f = (g, m) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), d.resolve(m), r(g, m);
      };
      if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return f(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, f);
    };
    return this.options.resources || !this.options.initAsync ? p() : setTimeout(p, 0), d;
  }
  loadResources(t, r = Dl) {
    let o = r;
    const s = Ce(t) ? t : this.language;
    if (typeof t == "function" && (o = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (s?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return o();
      const l = [], u = (d) => {
        if (!d || d === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(d).forEach((f) => {
          f !== "cimode" && (l.includes(f) || l.push(f));
        });
      };
      s ? u(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((p) => u(p)), this.options.preload?.forEach?.((d) => u(d)), this.services.backendConnector.load(l, this.options.ns, (d) => {
        !d && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), o(d);
      });
    } else
      o(null);
  }
  reloadResources(t, r, o) {
    const s = vs();
    return typeof t == "function" && (o = t, t = void 0), typeof r == "function" && (o = r, r = void 0), t || (t = this.languages), r || (r = this.options.ns), o || (o = Dl), this.services.backendConnector.reload(t, r, (l) => {
      s.resolve(), o(l);
    }), s;
  }
  use(t) {
    if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && E0.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !["cimode", "dev"].includes(t)) {
      for (let r = 0; r < this.languages.length; r++) {
        const o = this.languages[r];
        if (!["cimode", "dev"].includes(o) && this.store.hasLanguageSomeTranslations(o)) {
          this.resolvedLanguage = o;
          break;
        }
      }
      !this.resolvedLanguage && !this.languages.includes(t) && this.store.hasLanguageSomeTranslations(t) && (this.resolvedLanguage = t, this.languages.unshift(t));
    }
  }
  changeLanguage(t, r) {
    this.isLanguageChangingTo = t;
    const o = vs();
    this.emit("languageChanging", t);
    const s = (d) => {
      this.language = d, this.languages = this.services.languageUtils.toResolveHierarchy(d), this.resolvedLanguage = void 0, this.setResolvedLanguage(d);
    }, l = (d, p) => {
      p ? this.isLanguageChangingTo === t && (s(p), this.translator.changeLanguage(p), this.isLanguageChangingTo = void 0, this.emit("languageChanged", p), this.logger.log("languageChanged", p)) : this.isLanguageChangingTo = void 0, o.resolve((...f) => this.t(...f)), r && r(d, (...f) => this.t(...f));
    }, u = (d) => {
      !t && !d && this.services.languageDetector && (d = []);
      const p = Ce(d) ? d : d && d[0], f = this.store.hasLanguageSomeTranslations(p) ? p : this.services.languageUtils.getBestMatchFromCodes(Ce(d) ? [d] : d);
      f && (this.language || s(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector?.cacheUserLanguage?.(f)), this.loadResources(f, (g) => {
        l(g, f);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? u(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(u) : this.services.languageDetector.detect(u) : u(t), o;
  }
  getFixedT(t, r, o, s) {
    const l = s?.scopeNs, u = (d, p, ...f) => {
      let g;
      typeof p != "object" ? g = this.options.overloadTranslationOptionHandler([d, p].concat(f)) : g = {
        ...p
      }, g.lng = g.lng || u.lng, g.lngs = g.lngs || u.lngs;
      const m = g.ns !== void 0 && g.ns !== null;
      g.ns = g.ns || u.ns, g.keyPrefix !== "" && (g.keyPrefix = g.keyPrefix || o || u.keyPrefix);
      const w = {
        ...this.options,
        ...g
      };
      Array.isArray(l) && !m && (w.ns = l), typeof g.keyPrefix == "function" && (g.keyPrefix = mo(g.keyPrefix, w));
      const k = this.options.keySeparator || ".";
      let S;
      return g.keyPrefix && Array.isArray(d) ? S = d.map((_) => (typeof _ == "function" && (_ = mo(_, w)), `${g.keyPrefix}${k}${_}`)) : (typeof d == "function" && (d = mo(d, w)), S = g.keyPrefix ? `${g.keyPrefix}${k}${d}` : d), this.t(S, g);
    };
    return Ce(t) ? u.lng = t : u.lngs = t, u.ns = r, u.keyPrefix = o, u;
  }
  t(...t) {
    return this.translator?.translate(...t);
  }
  exists(...t) {
    return this.translator?.exists(...t);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t, r = {}) {
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
    const o = vs();
    return this.options.ns ? (Ce(t) && (t = [t]), t.forEach((s) => {
      this.options.ns.includes(s) || this.options.ns.push(s);
    }), this.loadResources((s) => {
      o.resolve(), r && r(s);
    }), o) : (r && r(), Promise.resolve());
  }
  loadLanguages(t, r) {
    const o = vs();
    Ce(t) && (t = [t]);
    const s = this.options.preload || [], l = t.filter((u) => !s.includes(u) && this.services.languageUtils.isSupportedCode(u));
    return l.length ? (this.options.preload = s.concat(l), this.loadResources((u) => {
      o.resolve(), r && r(u);
    }), o) : (r && r(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)), !t) return "rtl";
    try {
      const s = new Intl.Locale(t);
      if (s && s.getTextInfo) {
        const l = s.getTextInfo();
        if (l && l.direction) return l.direction;
      }
    } catch {
    }
    const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], o = this.services?.languageUtils || new Lv(Pf());
    return t.toLowerCase().indexOf("-latn") > 1 ? "ltr" : r.includes(o.getLanguagePartFromCode(t)) || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(t = {}, r) {
    const o = new Is(t, r);
    return o.createInstance = Is.createInstance, o;
  }
  cloneInstance(t = {}, r = Dl) {
    const o = t.forkResourceStore;
    o && delete t.forkResourceStore;
    const s = {
      ...this.options,
      ...t,
      isClone: !0
    }, l = new Is(s);
    if ((t.debug !== void 0 || t.prefix !== void 0) && (l.logger = l.logger.clone(t)), ["store", "services", "language"].forEach((d) => {
      l[d] = this[d];
    }), l.services = {
      ...this.services
    }, l.services.utils = {
      hasLoadedNamespace: l.hasLoadedNamespace.bind(l)
    }, o) {
      const d = Object.keys(this.store.data).reduce((p, f) => (p[f] = {
        ...this.store.data[f]
      }, p[f] = Object.keys(p[f]).reduce((g, m) => (g[m] = {
        ...p[f][m]
      }, g), p[f]), p), {});
      l.store = new Ov(d, s), l.services.resourceStore = l.store;
    }
    if (t.interpolation) {
      const p = {
        ...Pf().interpolation,
        ...this.options.interpolation,
        ...t.interpolation
      }, f = {
        ...s,
        interpolation: p
      };
      l.services.interpolator = new zv(f);
    }
    return l.translator = new ku(l.services, s), l.translator.on("*", (d, ...p) => {
      l.emit(d, ...p);
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
const jt = Is.createInstance();
jt.createInstance;
jt.dir;
jt.init;
jt.loadResources;
jt.reloadResources;
jt.use;
jt.changeLanguage;
jt.getFixedT;
jt.t;
jt.exists;
jt.setDefaultNamespace;
jt.hasLoadedNamespace;
jt.loadNamespaces;
jt.loadLanguages;
const B$ = (e, t, r, o) => {
  const s = [r, {
    code: t,
    ...o || {}
  }];
  if (e?.services?.logger?.forward)
    return e.services.logger.forward(s, "warn", "react-i18next::", !0);
  ki(s[0]) && (s[0] = `react-i18next:: ${s[0]}`), e?.services?.logger?.warn ? e.services.logger.warn(...s) : console?.warn && console.warn(...s);
}, Uv = {}, fp = (e, t, r, o) => {
  ki(r) && Uv[r] || (ki(r) && (Uv[r] = /* @__PURE__ */ new Date()), B$(e, t, r, o));
}, R0 = (e, t) => () => {
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
}, pp = (e, t, r) => {
  e.loadNamespaces(t, R0(e, r));
}, Vv = (e, t, r, o) => {
  if (ki(r) && (r = [r]), e.options.preload && e.options.preload.indexOf(t) > -1) return pp(e, r, o);
  r.forEach((s) => {
    e.options.ns.indexOf(s) < 0 && e.options.ns.push(s);
  }), e.loadLanguages(t, R0(e, o));
}, W$ = (e, t, r = {}) => !t.languages || !t.languages.length ? (fp(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: t.languages
}), !0) : t.hasLoadedNamespace(e, {
  lng: r.lng,
  precheck: (o, s) => {
    if (r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !s(o.isLanguageChangingTo, e)) return !1;
  }
}), ki = (e) => typeof e == "string", U$ = (e) => typeof e == "object" && e !== null, V$ = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, H$ = {
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
}, q$ = (e) => H$[e], K$ = (e) => e.replace(V$, q$);
let hp = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: K$
};
const Q$ = (e = {}) => {
  hp = {
    ...hp,
    ...e
  };
}, G$ = () => hp;
let T0;
const Y$ = (e) => {
  T0 = e;
}, J$ = () => T0, X$ = {
  type: "3rdParty",
  init(e) {
    Q$(e.options.react), Y$(e);
  }
}, Z$ = b.createContext();
class eM {
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
const tM = (e, t) => {
  const r = b.useRef();
  return b.useEffect(() => {
    r.current = e;
  }, [e, t]), r.current;
}, $0 = (e, t, r, o) => e.getFixedT(t, r, o), nM = (e, t, r, o) => b.useCallback($0(e, t, r, o), [e, t, r, o]), nr = (e, t = {}) => {
  const {
    i18n: r
  } = t, {
    i18n: o,
    defaultNS: s
  } = b.useContext(Z$) || {}, l = r || o || J$();
  if (l && !l.reportNamespaces && (l.reportNamespaces = new eM()), !l) {
    fp(l, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const R = (M, A) => ki(A) ? A : U$(A) && ki(A.defaultValue) ? A.defaultValue : Array.isArray(M) ? M[M.length - 1] : M, E = [R, {}, !1];
    return E.t = R, E.i18n = {}, E.ready = !1, E;
  }
  l.options.react?.wait && fp(l, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const u = {
    ...G$(),
    ...l.options.react,
    ...t
  }, {
    useSuspense: d,
    keyPrefix: p
  } = u;
  let f = s || l.options?.defaultNS;
  f = ki(f) ? [f] : f || ["translation"], l.reportNamespaces.addUsedNamespaces?.(f);
  const g = (l.isInitialized || l.initializedStoreOnce) && f.every((R) => W$(R, l, u)), m = nM(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), w = () => m, k = () => $0(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), [S, _] = b.useState(w);
  let x = f.join();
  t.lng && (x = `${t.lng}${x}`);
  const $ = tM(x), N = b.useRef(!0);
  b.useEffect(() => {
    const {
      bindI18n: R,
      bindI18nStore: E
    } = u;
    N.current = !0, !g && !d && (t.lng ? Vv(l, t.lng, f, () => {
      N.current && _(k);
    }) : pp(l, f, () => {
      N.current && _(k);
    })), g && $ && $ !== x && N.current && _(k);
    const M = () => {
      N.current && _(k);
    };
    return R && l?.on(R, M), E && l?.store.on(E, M), () => {
      N.current = !1, l && R && R?.split(" ").forEach((A) => l.off(A, M)), E && l && E.split(" ").forEach((A) => l.store.off(A, M));
    };
  }, [l, x]), b.useEffect(() => {
    N.current && g && _(w);
  }, [l, p, g]);
  const C = [S, l, g];
  if (C.t = S, C.i18n = l, C.ready = g, g || !g && !d) return C;
  throw new Promise((R) => {
    t.lng ? Vv(l, t.lng, f, () => R()) : pp(l, f, () => R());
  });
}, rM = "An", iM = "Aus", oM = "Auswählen", sM = "Erfolg", aM = "OK", lM = "Abbrechen", uM = "Lautstärke", cM = "Medien überspringen (Tastenkürzel)", dM = "Alert überspringen (Tastenkürzel)", fM = "Keine", pM = "Starten", hM = "Stoppen", gM = "Verzögerung", mM = "ms", yM = "Token", vM = "Overlay-ID", wM = "API-Schlüssel", SM = "Getrennt", bM = "Dokumentation", _M = { title: "Autorisierung", code: "Code anfordern", sign_in: "Anmelden", phone: "Telefonnummer", telegram_code: "Code aus Telegram", your_code: "Dein Code", "2fa_password": "2FA-Passwort", password: "Passwort", streamelements: "Du musst zuerst StreamElements JWT verbinden", you_can_find_by_url: "Du findest es unter dieser URL", set_id_and_jwt: "Du musst StreamElements Account ID und JWT für {{service}} festlegen" }, xM = { wrong_lots_format: "Falsches Lots-Format", not_connected: "Nicht verbunden", request_error: "Anfragefehler" }, kM = { title: "Update", description: "Eine neue Version der App ist verfügbar. Möchtest du aktualisieren?", update: "Aktualisieren", later: "Später", downloading: "Wird heruntergeladen..." }, CM = { title: "Medien", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, EM = { tribute: "Tribute-Nachrichten anzeigen" }, PM = { lots: "Lots", wheel: "Rad", settings: "Einstellungen" }, RM = { set_point: "Punkt setzen", meter_price: "Preis pro Meter", amount: "Betrag", finish: "Beenden", lat_error: "Breitengrad muss zwischen -90 und 90 liegen", lng_error: "Längengrad muss zwischen -180 und 180 liegen", rules: "Damit sich der Zeiger automatisch in der Nachricht bewegt, darf nur ein Wort aus folgender Liste enthalten sein:" }, TM = { enabled: "Aktiviert", min_amount: "Mindestbetrag", video_volume: "Videolautstärke", min_views: "Mindestaufrufe" }, $M = { messages: "Nachrichten", settings: "Einstellungen", services: "Dienste", alerts: "Alerts", media: "Medien", goals: "Ziele", auction: "Auktion", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info", nsfw: "NSFW" }, MM = { title: "Letzte Nachrichten" }, AM = { skip: "Überspringen", replay: "Wiederholen", donated: "{{user_name}} hat {{amount}}{{currency}} gespendet", followed: "{{user_name}} folgt jetzt", subscribed: "{{user_name}} hat abonniert", gifted_subscriptions: "{{user_name}} hat {{total}} Abonnements verschenkt", raided_with: "{{user_name}} raided mit {{viewers}} Zuschauern" }, IM = { title: "Nachrichten filtern", exclude_donations: "Spenden ausschließen", exclude_follows: "Follows ausschließen", exclude_subscriptions: "Abonnements ausschließen", exclude_raids: "Raids ausschließen" }, NM = { title: "Einstellungen", pause: "Alert-Nachrichten pausieren", moderation_duration: "Moderationsdauer", black_list: "Sperrliste", remove_links: "Links entfernen", language: "Sprache", sec: "Sek", currency: "Währung", tts_type: "TTS-Typ" }, OM = { normal: "Normal", dropout: "Dropout", spin: "Drehen", speed: "Rad-Geschwindigkeit" }, LM = { continue: "Fortsetzen", pause: "Pausieren", reset: "Zurücksetzen", add_time: "Zeit hinzufügen", reduce_time: "Zeit reduzieren", add_timex2: "Zeit ×2 hinzufügen" }, DM = { title: "Fighter", match: "Match", final: "Finale", game: "Spiel", cancel: "Spiel abbrechen", winner: "Gewinner", settings: "Einstellungen", create_game: "Spiel aus Lots erstellen", start: "Starten", pause: "Pausieren", rematch: "Rematch", resume: "Fortsetzen" }, FM = { name: "Name", delete: "Löschen", add: "Betrag hinzufügen" }, jM = { delete: "Löschen", to_lot: "Zum Lot", new: "Neu", add_to_random_slot: "Zum zufälligen Lot hinzufügen" }, zM = { add: "Hinzufügen", new_lot_name: "Neuer Lot-Name", search: "Lot suchen", total: "Gesamt" }, BM = { leader_change: "Führungswechsel", new_lot: "Neues Lot", new_donation: "Neue Spende", show_odds: "Quoten anzeigen", show_total_sum: "Gesamtsumme anzeigen", greater_timer_adding_time: "Bei höherem Timer Zeit hinzufügen", not_add_time_if: "Keine Zeit hinzufügen, wenn", adding_time: "Zeit" }, WM = { import_lots: "Lots importieren", clear_lots: "Lots löschen" }, UM = { round_duration: "Rundendauer", add_players: "Spieler hinzufügen" }, VM = { title: "Alerts", group: "Gruppe" }, HM = { title: "Dienste", tribute: "Tribute", streamelements: "StreamElements", connect: "Verbinden", integrations: "Integrationen", sign_out: "Abmelden", confirm_sign_out: "Möchtest du dich wirklich von diesem Dienst abmelden?" }, qM = { device_code_expired: "Gerätecode ist abgelaufen. Bitte versuche es erneut.", user_code: "Benutzercode", authorize_with_code: "Mit Code autorisieren", waiting_authorization: "Warte auf Autorisierung..." }, KM = { donation_account_name: "Name des Spenden-Accounts", donation_url: "Spenden-URL", create_donation_account: "Widy-Spendenaccount erstellen", connect_to_existing_account: "Mit bestehendem Account verbinden", create_donation_account_pending: "Spendenaccount wird erstellt..." }, QM = { title: "Twitch-Einstellungen", points_currency_ratio: "Points-zu-Währung-Verhältnis", rewards_name: "Belohnungsname", rewards_list: "Belohnungsliste", add_reward: "Belohnung hinzufügen", cost: "Kosten", color: "Farbe" }, GM = { image: "Bild", audio: "Audio", view: "Ansicht", title: "Titel", message: "Nachricht", test_name: "Test", test_text: "Das ist ein Test-Alert!", configure: "Konfigurieren", test: "Testen", add_new_variant: "Neue Variante hinzufügen", new_variant: "Neue Variante", variant_title: "Varianten-Titel", variant_group: "Varianten-Gruppe", status: "Status", variation_condition: "Variationsbedingung", group: "Gruppe", Random: "Zufällig", AmountIsGreater: "Betrag ist größer", AmountIsEqual: "Betrag ist gleich", delete: "Löschen", sure_delete: "Möchtest du diese Variation wirklich löschen?", type: "Typ", Donation: "Spende", Subscription: "Abo", Follow: "Follow", Raid: "Raid" }, YM = "Allgemein", JM = { title: "Ziele", create: "Neues Ziel erstellen" }, XM = { new: "Neues Ziel", goal: "Ziel", type: "Typ", elements: "Elemente", progress: "Fortschritt", goal_title: "Ziel-Titel", amount_raise: "Zielbetrag", start_raising: "Startbetrag", end_date: "Ziel-Enddatum", bar_height: "Balkenhöhe", rounding_radius: "Abrundungsradius", bar_stroke_thickness: "Balken-Strichstärke", background_bar_color: "Hintergrund-Balkenfarbe", progress_bar_color: "Fortschrittsbalken-Farbe", goal_progress_bar: "Ziel-Fortschrittsbalken", progress_bar_layout: "Fortschrittsbalken-Layout", remaining_time: "Verbleibende Zeit", goal_amount_limits: "Zielbetrags-Limits", widget_background: "Widget-Hintergrund", background_color: "Hintergrundfarbe", OnTop: "Oben", Inside: "Innen", Below: "Unten", DoNotDisplay: "Nicht anzeigen", title: "Titel", limits: "Limits", raised: "Erreicht", days_left: "Tage übrig", finish_goal: "Ziel abschließen", sure_finish: "Möchtest du dieses Ziel wirklich abschließen?", Donation: "Spende", TwitchSubscription: "Twitch-Abo", TwitchFollow: "Twitch-Follow", goal_not_finished: "Du hast bereits ein unvollendetes Ziel dieses Typs." }, ZM = "Speichern", eA = "Zurück", tA = { copy: "Kopieren", launch: "Starten", url: "Widget-URL", obs_dock_url: "OBS-Dock-URL" }, nA = { top: "Bild oben, Text unten", bottom: "Bild unten, Text oben", left: "Bild links, Text rechts", right: "Bild rechts, Text links", overlay: "Text über Bild" }, rA = { show: "Bild anzeigen" }, iA = { font: "Schriftart", font_size: "Schriftgröße", text_color: "Textfarbe", bold: "Fett", italics: "Kursiv", underline: "Unterstrichen", transformation: "Transformation", letter_spacing: "Buchstabenabstand", word_spacing: "Wortabstand", horizontal_alignment: "Horizontale Ausrichtung", vertical_alignment: "Vertikale Ausrichtung", text_preview: "Das ist eine Vorschau!", name: "Name" }, oA = { play: "Abspielen", stop: "Stoppen" }, sA = "Version", aA = { title: "Widgets", add: "Widget hinzufügen", install: "Installieren", delete: "Löschen", installed: "Installiert", update: "Aktualisieren", all: "Alle", settings: "Einstellungen", control: "Steuerung", delete_confirm: "Möchtest du dieses Widget wirklich löschen?", invalid_manifest: "Ungültiges Widget-Manifest", add_confirm: "Das Hinzufügen erlaubt {{widget_name}} folgendes:", installing: "Wird installiert...", updating: "Wird aktualisiert...", view_url: "Ansichts-URL", widget_connection: "Widget sendet oder empfängt Anfragen an:" }, lA = { "widgets:messages.read": "Nachrichten lesen", "widgets:goals.read": "Ziele lesen", "widgets:auc-fighter:settings.read": "Auc-Fighter-Einstellungen lesen", "widgets:settings.read": "Widget-Einstellungen lesen", "widgets:alerts.read": "Alerts lesen", "widgets:media:settings.read": "Medien-Einstellungen lesen", "widgets:auc-fighter:match-playing.send": "Match wird gespielt senden", "widgets:auc-fighter:match-winner.send": "Match-Gewinner senden", "widgets:auc-fighter:match-paused.send": "Match pausiert senden", "widgets:auc-fighter:match-id.send": "Match-ID senden", "widgets:alert:played.send": "Alert abgespielt senden", "widgets:alert:playing.send": "Alert wird abgespielt senden", "widgets:media:played.send": "Medien abgespielt senden", "widgets:media:end.send": "Medien Ende senden", "widgets:media:playing.send": "Medien wird abgespielt senden", "widgets:media:paused.send": "Medien pausiert senden", "widgets:media:error.send": "Medien-Fehler senden", "widgets:media:replay.send": "Medien wiederholen senden", "widgets:alert:replay.send": "Alert wiederholen senden", "widgets:alert:skip.send": "Alert überspringen senden", "widgets:messages.subscription": "Nachrichten abonnieren", "widgets:goal.subscription": "Ziel abonnieren", "widgets:settings.subscription": "Einstellungen abonnieren", "widgets:auc-fighter:start-match.subscription": "Match-Start abonnieren", "widgets:auc-fighter:pause-match.subscription": "Match-Pause abonnieren", "widgets:auc-fighter:resume-match.subscription": "Match-Fortsetzen abonnieren", "widgets:auc-fighter:cancel-match.subscription": "Match-Abbruch abonnieren", "widgets:auc-fighter:update-match.subscription": "Match-Update abonnieren", "widgets:auc-fighter:settings.subscription": "Auc-Fighter-Einstellungen abonnieren", "widgets:alert:replay.subscription": "Alert-Wiederholung abonnieren", "widgets:alert:skip.subscription": "Alert-Überspringen abonnieren", "widgets:alert:test.subscription": "Alert-Test abonnieren", "widgets:alert:skip-playing.subscription": "Alert-Überspringen während Wiedergabe abonnieren", "widgets:alert:alerts.subscription": "Alerts abonnieren", "widgets:media:replay.subscription": "Medien-Wiederholung abonnieren", "widgets:media:settings.subscription": "Medien-Einstellungen abonnieren", "widgets:media:skip.subscription": "Medien-Überspringen abonnieren", "widgets:media:skip-playing-media.subscription": "Medien-Überspringen während Wiedergabe abonnieren", "widgets:media:end.subscription": "Medien-Ende abonnieren", "widgets:media:error.subscription": "Medien-Fehler abonnieren", "widgets:media:pause.subscription": "Medien-Pause abonnieren", "widgets:media:play.subscription": "Medien-Play abonnieren", "widgets:alert:played.subscription": "Alert abgespielt abonnieren", "widgets:view:storage.read": "Widget-View-Speicher lesen", "widgets:control:storage.read": "Widget-Control-Speicher lesen", "widgets:view:storage.write": "In Widget-View-Speicher schreiben", "widgets:control:storage.write": "In Widget-Control-Speicher schreiben", "widgets:view:storage.subscription": "Widget-View-Speicher abonnieren", "widgets:control:storage.subscription": "Widget-Control-Speicher abonnieren" }, uA = { title: "NSFW", nsfw_window: "NSFW-Fenster", settings: "Einstellungen", window: "Fenster", blur_timeout_duration: "Blur-Timeout-Dauer", confidence_threshold: "Konfidenzschwelle", anus: "Anus", make_love: "Liebe machen", nipple: "Brustwarze", penis: "Penis", vagina: "Vagina" }, cA = {
  on: rM,
  off: iM,
  select: oM,
  success: sM,
  ok: aM,
  cancel: lM,
  sound_volume: uM,
  skip_media: cM,
  skip_alert: dM,
  none: fM,
  start: pM,
  stop: hM,
  delay: gM,
  milliseconds: mM,
  token: yM,
  overlay_id: vM,
  api_key: wM,
  disconnected: SM,
  documentation: bM,
  authorization: _M,
  error: xM,
  updater: kM,
  media: CM,
  integration: EM,
  auction: PM,
  maption: RM,
  media_settings: TM,
  dashboard: $M,
  messages: MM,
  message: AM,
  filter: IM,
  settings: NM,
  wheel: OM,
  timer: LM,
  fighter: DM,
  lot: FM,
  bid: jM,
  lots: zM,
  auction_settings: BM,
  lots_options: WM,
  auc_fighter_settings: UM,
  alerts: VM,
  services: HM,
  twitch: qM,
  widy: KM,
  twitch_service_settings: QM,
  alert: GM,
  general: YM,
  goals: JM,
  goal: XM,
  save: ZM,
  back: eA,
  widget: tA,
  view: nA,
  image: rA,
  text: iA,
  audio: oA,
  version: sA,
  widgets: aA,
  scopes: lA,
  nsfw: uA
}, dA = "On", fA = "Off", pA = "Select", hA = "Success", gA = "Ok", mA = "Cancel", yA = "Sound volume", vA = "Shortcut skip media", wA = "Shortcut skip alert", SA = "None", bA = "Start", _A = "Stop", xA = "Delay", kA = "ms", CA = "Token", EA = "Overlay Id", PA = "Api key", RA = "Disconnected", TA = "Documentation", $A = { title: "Authorization", code: "Request code", sign_in: "Sign in", phone: "Phone number", telegram_code: "Code from telegram", your_code: "Your code", "2fa_password": "2fa Password", password: "Password", streamelements: "You need connect with StreamElements JWT first", you_can_find_by_url: "You can find it by this url", set_id_and_jwt: "You need set StreamElements Account ID and JWT for {{service}}" }, MA = { wrong_lots_format: "Wrong lots format", not_connected: "Not connected", request_error: "Request error" }, AA = { title: "Update", description: "A new version of the app is available. Do you want to update?", update: "Update", later: "Later", downloading: "Downloading..." }, IA = { title: "Media", youtube: "Youtube", twitch: "Twitch", tiktok: "Tiktok" }, NA = { tribute: "Show tribute messages" }, OA = { lots: "Lots", wheel: "Wheel", settings: "Settings" }, LA = { set_point: "Set point", meter_price: "Price for 1 meter", amount: "Amount", finish: "Finish", lat_error: "Latitude must be between -90 and 90", lng_error: "Longitude must be between -180 and 180", rules: "For the pointer to automatically change position in the message there should be only one word from:" }, DA = { enabled: "Enabled", min_amount: "Min amount", video_volume: "Video volume", min_views: "Min views" }, FA = { messages: "Messages", settings: "Settings", services: "Services", alerts: "Alerts", media: "Media", goals: "Goals", auction: "Auction", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info", nsfw: "NSFW", rewards: "Rewards" }, jA = { title: "Last messages" }, zA = { skip: "Skip", replay: "Replay", donated: "{{user_name}} donated {{amount}}{{currency}}", redemption: "{{user_name}} redemption {{title}} {{cost}}", followed: "{{user_name}} followed", subscribed: "{{user_name}} subscribed", gifted_subscriptions: "{{user_name}} gift {{total}} subscriptions", raided_with: "{{user_name}} raided with {{viewers}} viewers" }, BA = { title: "Filter messages", exclude_donations: "Exclude donations", exclude_follows: "Exclude follows", exclude_subscriptions: "Exclude subscriptions", exclude_raids: "Exclude raids", exclude_redemptions: "Exclude redemptions" }, WA = { title: "Settings", pause: "Pause alert messages", moderation_duration: "Moderation duration", black_list: "Black list", remove_links: "Remove links", language: "Language", sec: "Sec", currency: "Currency", tts_type: "TTS type" }, UA = { normal: "Normal", dropout: "Dropout", spin: "Spin", speed: "Wheel speed" }, VA = { continue: "Continue", pause: "Pause", reset: "Reset", add_time: "Add time", reduce_time: "Reduce time", add_timex2: "Add time x2" }, HA = { title: "Fighter", match: "Match", final: "Final", game: "Game", cancel: "Cancel game", winner: "Winner", settings: "Settings", create_game: "Create game from lots", start: "Start", pause: "Pause", rematch: "Rematch", resume: "Resume" }, qA = { name: "Name", delete: "Delete", add: "Add amount" }, KA = { delete: "Delete", to_lot: "To lot", new: "New", add_to_random_slot: "Add to random lot" }, QA = { add: "Add", new_lot_name: "New lot name", search: "Search lot", total: "Total" }, GA = { leader_change: "Leader change", new_lot: "New lot", new_donation: "New donation", show_odds: "Show odds", show_total_sum: "Show total sum", greater_timer_adding_time: "Greater timer adding time", not_add_time_if: "Not add time if", adding_time: "Time" }, YA = { import_lots: "Import lots", clear_lots: "Clear lots" }, JA = { round_duration: "Round duration", add_players: "Add players" }, XA = { title: "Alerts", group: "Group" }, ZA = { title: "Services", tribute: "Tribute", streamelements: "Streamelements", connect: "Connect", integrations: "Integrations", sign_out: "Sign out", confirm_sign_out: "Are you sure you want to sign out from this service?" }, e2 = { device_code_expired: "Device code expired. Please try again.", user_code: "User code", authorize_with_code: "Authorize with code", waiting_authorization: "Waiting for authorization..." }, t2 = { donation_account_name: "Name of donation account", donation_url: "Donation url", create_donation_account: "Create Widy donation account", connect_to_existing_account: "Connect to existing account", create_donation_account_pending: "Creating donation account..." }, n2 = { image: "Image", audio: "Audio", view: "View", title: "Title", message: "Message", test_name: "Test", test_text: "This is a test alert!", configure: "Configure", test: "Test", add_new_variant: "Add new variant", new_variant: "New variant", variant_title: "Variant title", variant_group: "Variant group", status: "Status", variation_condition: "Variation condition", group: "Group", Random: "Random", AmountIsGreater: "Amount is greater", AmountIsEqual: "Amount is equal", delete: "Delete", sure_delete: "Are you sure you want to delete this variation?", type: "Type", Donation: "Donation", Subscription: "Subscription", Follow: "Follow", Raid: "Raid", variant: "Variant", audio_volume: "Audio volume", video_volume: "Video volume", video: "Video", duration: "Duration", delay: "Delay" }, r2 = { Image: "Image", Audio: "Audio", Video: "Video", ImageAndAudio: "Image and audio" }, i2 = "General", o2 = { title: "Goals", create: "Crate new goal" }, s2 = { new: "New goal", goal: "View", type: "Type", elements: "Elements", progress: "Progress", goal_title: "Goal title", amount_raise: "Amount to raise", start_raising: "Start raising from", end_date: "End goal date", bar_height: "Bar height", rounding_radius: "Rounding radius", bar_stroke_thickness: "Bar stroke thickness", background_bar_color: "Background bar color", progress_bar_color: "Progress bar color", goal_progress_bar: "Goal progress bar", progress_bar_layout: "Progress bar layout", remaining_time: "Remaining time", goal_amount_limits: "Goal amount limits", widget_background: "Widget background", background_color: "Background color", OnTop: "On top", Inside: "Inside", Below: "Below", DoNotDisplay: "Do not display", title: "Title", limits: "limits", raised: "Raised", days_left: "Days left", finish_goal: "Finish goal", sure_finish: "Are you sure you want to finish this goal?", Donation: "Donation", TwitchSubscription: "Twitch Subscription", TwitchFollow: "Twitch Follow", goal_not_finished: "You have an unfinished goal of this type." }, a2 = "Save", l2 = "Back", u2 = { copy: "Copy", launch: "Launch", url: "Widget url", obs_dock_url: "Obs dock url" }, c2 = { top: "Image top, text bottom", bottom: "Image bottom, text top", left: "Image left, text right", right: "Image right, text left", overlay: "Text overlay image" }, d2 = { show: "Show image" }, f2 = { font: "Font", font_size: "Font size", text_color: "Text color", bold: "Bold", italics: "Italics", underline: "Underline", transformation: "Transformation", letter_spacing: "Letter spacing", word_spacing: "Word spacing", horizontal_alignment: "Horizontal alignment", vertical_alignment: "Vertical alignment", text_preview: "This is a preview!", name: "Name" }, p2 = { play: "Play", stop: "Stop" }, h2 = "Version", g2 = { title: "Widgets", add: "Add widget", install: "Install", delete: "Delete", installed: "Installed", update: "Update", all: "All", settings: "Settings", control: "Control", delete_confirm: "Are you sure you want to delete this widget?", invalid_manifest: "Invalid widget manifest", add_confirm: "Adding will allow {{widget_name}} to:", installing: "Installing...", updating: "Updating...", view_url: "View url", widget_connection: "Widget get or send requests to:" }, m2 = { "widgets:messages.read": "Read messages", "widgets:goals.read": "Read goals", "widgets:auc-fighter:settings.read": "Read auc-fighter settings", "widgets:settings.read": "Read widget settings", "widgets:alerts.read": "Read alerts", "widgets:media:settings.read": "Read media settings", "widgets:auc-fighter:match-playing.send": "Send match playing", "widgets:auc-fighter:match-winner.send": "Send match winner", "widgets:auc-fighter:match-paused.send": "Send match paused", "widgets:auc-fighter:match-id.send": "Send match ID", "widgets:alert:played.send": "Send alert played", "widgets:alert:playing.send": "Send alert playing", "widgets:media:played.send": "Send media played", "widgets:media:end.send": "Send media end", "widgets:media:playing.send": "Send media playing", "widgets:media:paused.send": "Send media paused", "widgets:media:error.send": "Send media error", "widgets:media:replay.send": "Send media replay", "widgets:alert:replay.send": "Send alert replay", "widgets:alert:skip.send": "Send alert skip", "widgets:messages.subscription": "Subscribe messages", "widgets:goal.subscription": "Subscribe goal", "widgets:settings.subscription": "Subscribe settings", "widgets:auc-fighter:start-match.subscription": "Subscribe start match", "widgets:auc-fighter:pause-match.subscription": "Subscribe pause match", "widgets:auc-fighter:resume-match.subscription": "Subscribe resume match", "widgets:auc-fighter:cancel-match.subscription": "Subscribe cancel match", "widgets:auc-fighter:update-match.subscription": "Subscribe update match", "widgets:auc-fighter:settings.subscription": "Subscribe auc-fighter settings", "widgets:alert:replay.subscription": "Subscribe alert replay", "widgets:alert:skip.subscription": "Subscribe alert skip", "widgets:alert:test.subscription": "Subscribe alert test", "widgets:alert:skip-playing.subscription": "Subscribe alert skip playing", "widgets:alert:alerts.subscription": "Subscribe alerts", "widgets:media:replay.subscription": "Subscribe media replay", "widgets:media:settings.subscription": "Subscribe media settings", "widgets:media:skip.subscription": "Subscribe media skip", "widgets:media:skip-playing-media.subscription": "Subscribe media skip playing", "widgets:media:end.subscription": "Subscribe media end", "widgets:media:error.subscription": "Subscribe media error", "widgets:media:pause.subscription": "Subscribe media pause", "widgets:media:play.subscription": "Subscribe media play", "widgets:alert:played.subscription": "Subscribe alert played", "widgets:view:storage.read": "Read widget view storage", "widgets:control:storage.read": "Read widget control storage", "widgets:view:storage.write": "Write to widget view storage", "widgets:control:storage.write": "Write to widget control storage", "widgets:view:storage.subscription": "Subscribe widget view storage", "widgets:control:storage.subscription": "Subscribe widget control storage" }, y2 = { title: "NSFW", nsfw_window: "NSFW window", settings: "Settings", window: "Window", blur_timeout_duration: "Blur timeout duration", confidence_threshold: "Confidence threshold", anus: "Anus", make_love: "Make love", nipple: "Nipple", penis: "Penis", vagina: "Vagina" }, v2 = { title: "Rewards", create: "Create reward" }, w2 = { new: "New reward", platform: "Platform", title: "Title", type: "Type", description: "Description", cost: "Cost", background_color: "Background color", is_user_input_required: "Is user input required", delete: "Delete", sure_delete: "Are you sure you want to delete this reward?", points_currency_ratio: "Points currency ratio", is_global_cooldown_enabled: "Is global cooldown enabled", global_cooldown_seconds: "Global cooldown seconds" }, S2 = { required: "Required" }, b2 = {
  on: dA,
  off: fA,
  select: pA,
  success: hA,
  ok: gA,
  cancel: mA,
  sound_volume: yA,
  skip_media: vA,
  skip_alert: wA,
  none: SA,
  start: bA,
  stop: _A,
  delay: xA,
  milliseconds: kA,
  token: CA,
  overlay_id: EA,
  api_key: PA,
  disconnected: RA,
  documentation: TA,
  authorization: $A,
  error: MA,
  updater: AA,
  media: IA,
  integration: NA,
  auction: OA,
  maption: LA,
  media_settings: DA,
  dashboard: FA,
  messages: jA,
  message: zA,
  filter: BA,
  settings: WA,
  wheel: UA,
  timer: VA,
  fighter: HA,
  lot: qA,
  bid: KA,
  lots: QA,
  auction_settings: GA,
  lots_options: YA,
  auc_fighter_settings: JA,
  alerts: XA,
  services: ZA,
  twitch: e2,
  widy: t2,
  alert: n2,
  alert_variant: r2,
  general: i2,
  goals: o2,
  goal: s2,
  save: a2,
  back: l2,
  widget: u2,
  view: c2,
  image: d2,
  text: f2,
  audio: p2,
  version: h2,
  widgets: g2,
  scopes: m2,
  nsfw: y2,
  rewards: v2,
  reward: w2,
  validation: S2
}, _2 = "Encendido", x2 = "Apagado", k2 = "Seleccionar", C2 = "Éxito", E2 = "Aceptar", P2 = "Cancelar", R2 = "Volumen de sonido", T2 = "Atajo para saltar media", $2 = "Atajo para saltar alerta", M2 = "Ninguno", A2 = "Iniciar", I2 = "Detener", N2 = "Retraso", O2 = "ms", L2 = "Token", D2 = "ID de Overlay", F2 = "Clave API", j2 = "Desconectado", z2 = "Documentación", B2 = { title: "Autorización", code: "Solicitar código", sign_in: "Iniciar sesión", phone: "Número de teléfono", telegram_code: "Código de Telegram", your_code: "Tu código", "2fa_password": "Contraseña 2FA", password: "Contraseña", streamelements: "Necesitas conectar primero con StreamElements JWT", you_can_find_by_url: "Puedes encontrarlo en esta URL", set_id_and_jwt: "Necesitas configurar el ID de cuenta de StreamElements y JWT para {{service}}" }, W2 = { wrong_lots_format: "Formato de lotes incorrecto", not_connected: "No conectado", request_error: "Error en la solicitud" }, U2 = { title: "Actualización", description: "Hay una nueva versión de la aplicación disponible. ¿Quieres actualizar?", update: "Actualizar", later: "Más tarde", downloading: "Descargando..." }, V2 = { title: "Media", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, H2 = { tribute: "Mostrar mensajes de tributo" }, q2 = { lots: "Lotes", wheel: "Rueda", settings: "Ajustes" }, K2 = { set_point: "Establecer punto", meter_price: "Precio por 1 metro", amount: "Cantidad", finish: "Finalizar", lat_error: "La latitud debe estar entre -90 y 90", lng_error: "La longitud debe estar entre -180 y 180", rules: "Para que el puntero cambie de posición automáticamente en el mensaje solo debe haber una palabra de:" }, Q2 = { enabled: "Activado", min_amount: "Cantidad mínima", video_volume: "Volumen del video", min_views: "Vistas mínimas" }, G2 = { messages: "Mensajes", settings: "Ajustes", services: "Servicios", alerts: "Alertas", media: "Media", goals: "Metas", auction: "Subasta", maption: "Maption", fighter: "Luchador", widgets: "Widgets", info: "Información", nsfw: "NSFW" }, Y2 = { title: "Últimos mensajes" }, J2 = { skip: "Saltar", replay: "Reproducir de nuevo", donated: "{{user_name}} donó {{amount}}{{currency}}", followed: "{{user_name}} te siguió", subscribed: "{{user_name}} se suscribió", gifted_subscriptions: "{{user_name}} regaló {{total}} suscripciones", raided_with: "{{user_name}} hizo raid con {{viewers}} espectadores" }, X2 = { title: "Filtrar mensajes", exclude_donations: "Excluir donaciones", exclude_follows: "Excluir follows", exclude_subscriptions: "Excluir suscripciones", exclude_raids: "Excluir raids" }, Z2 = { title: "Ajustes", pause: "Pausar mensajes de alerta", moderation_duration: "Duración de moderación", black_list: "Lista negra", remove_links: "Eliminar enlaces", language: "Idioma", sec: "Seg", currency: "Moneda", tts_type: "Tipo de TTS" }, eI = { normal: "Normal", dropout: "Dropout", spin: "Girar", speed: "Velocidad de la rueda" }, tI = { continue: "Continuar", pause: "Pausar", reset: "Reiniciar", add_time: "Añadir tiempo", reduce_time: "Reducir tiempo", add_timex2: "Añadir tiempo x2" }, nI = { title: "Luchador", match: "Combate", final: "Final", game: "Juego", cancel: "Cancelar juego", winner: "Ganador", settings: "Ajustes", create_game: "Crear juego desde lotes", start: "Iniciar", pause: "Pausar", rematch: "Revancha", resume: "Reanudar" }, rI = { name: "Nombre", delete: "Eliminar", add: "Añadir cantidad" }, iI = { delete: "Eliminar", to_lot: "Al lote", new: "Nuevo", add_to_random_slot: "Añadir a lote aleatorio" }, oI = { add: "Añadir", new_lot_name: "Nombre del nuevo lote", search: "Buscar lote", total: "Total" }, sI = { leader_change: "Cambio de líder", new_lot: "Nuevo lote", new_donation: "Nueva donación", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar suma total", greater_timer_adding_time: "Añadir más tiempo al temporizador", not_add_time_if: "No añadir tiempo si", adding_time: "Tiempo" }, aI = { import_lots: "Importar lotes", clear_lots: "Limpiar lotes" }, lI = { round_duration: "Duración de ronda", add_players: "Añadir jugadores" }, uI = { title: "Alertas", group: "Grupo" }, cI = { title: "Servicios", tribute: "Tributo", streamelements: "StreamElements", connect: "Conectar", integrations: "Integraciones", sign_out: "Cerrar sesión", confirm_sign_out: "¿Estás seguro de que quieres cerrar sesión de este servicio?" }, dI = { device_code_expired: "Código de dispositivo expirado. Por favor, inténtalo de nuevo.", user_code: "Código de usuario", authorize_with_code: "Autorizar con código", waiting_authorization: "Esperando autorización..." }, fI = { donation_account_name: "Nombre de la cuenta de donaciones", donation_url: "URL de donación", create_donation_account: "Crear cuenta de donaciones Widy", connect_to_existing_account: "Conectar a cuenta existente", create_donation_account_pending: "Creando cuenta de donaciones..." }, pI = { title: "Ajustes de Twitch", points_currency_ratio: "Ratio de puntos a moneda", rewards_name: "Nombre de recompensas", rewards_list: "Lista de recompensas", add_reward: "Añadir recompensa", cost: "Costo", color: "Color" }, hI = { image: "Imagen", audio: "Audio", view: "Vista", title: "Título", message: "Mensaje", test_name: "Prueba", test_text: "¡Esta es una alerta de prueba!", configure: "Configurar", test: "Probar", add_new_variant: "Añadir nueva variante", new_variant: "Nueva variante", variant_title: "Título de variante", variant_group: "Grupo de variante", status: "Estado", variation_condition: "Condición de variación", group: "Grupo", Random: "Aleatorio", AmountIsGreater: "Cantidad es mayor", AmountIsEqual: "Cantidad es igual", delete: "Eliminar", sure_delete: "¿Estás seguro de que quieres eliminar esta variación?", type: "Tipo", Donation: "Donación", Subscription: "Suscripción", Follow: "Follow", Raid: "Raid" }, gI = "General", mI = { title: "Metas", create: "Crear nueva meta" }, yI = { new: "Nueva meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progreso", goal_title: "Título de la meta", amount_raise: "Cantidad a recaudar", start_raising: "Comenzar recaudación desde", end_date: "Fecha de finalización", bar_height: "Altura de la barra", rounding_radius: "Radio de redondeo", bar_stroke_thickness: "Grosor del borde de la barra", background_bar_color: "Color de barra de fondo", progress_bar_color: "Color de barra de progreso", goal_progress_bar: "Barra de progreso de meta", progress_bar_layout: "Disposición de la barra de progreso", remaining_time: "Tiempo restante", goal_amount_limits: "Límites de cantidad de meta", widget_background: "Fondo del widget", background_color: "Color de fondo", OnTop: "Encima", Inside: "Dentro", Below: "Debajo", DoNotDisplay: "No mostrar", title: "Título", limits: "límites", raised: "Recaudado", days_left: "Días restantes", finish_goal: "Finalizar meta", sure_finish: "¿Estás seguro de que quieres finalizar esta meta?", Donation: "Donación", TwitchSubscription: "Suscripción de Twitch", TwitchFollow: "Follow de Twitch", goal_not_finished: "Tienes una meta sin finalizar de este tipo." }, vI = "Guardar", wI = "Atrás", SI = { copy: "Copiar", launch: "Lanzar", url: "URL del widget", obs_dock_url: "URL de OBS Dock" }, bI = { top: "Imagen arriba, texto abajo", bottom: "Imagen abajo, texto arriba", left: "Imagen izquierda, texto derecha", right: "Imagen derecha, texto izquierda", overlay: "Texto sobre imagen" }, _I = { show: "Mostrar imagen" }, xI = { font: "Fuente", font_size: "Tamaño de fuente", text_color: "Color del texto", bold: "Negrita", italics: "Cursiva", underline: "Subrayado", transformation: "Transformación", letter_spacing: "Espaciado de letras", word_spacing: "Espaciado de palabras", horizontal_alignment: "Alineación horizontal", vertical_alignment: "Alineación vertical", text_preview: "¡Esto es una vista previa!", name: "Nombre" }, kI = { play: "Reproducir", stop: "Detener" }, CI = "Versión", EI = { title: "Widgets", add: "Añadir widget", install: "Instalar", delete: "Eliminar", installed: "Instalado", update: "Actualizar", all: "Todos", settings: "Ajustes", control: "Control", delete_confirm: "¿Estás seguro de que quieres eliminar este widget?", invalid_manifest: "Manifiesto de widget inválido", add_confirm: "Añadir permitirá a {{widget_name}}:", installing: "Instalando...", updating: "Actualizando...", view_url: "URL de vista", widget_connection: "El widget obtiene o envía solicitudes a:" }, PI = { "widgets:messages.read": "Leer mensajes", "widgets:goals.read": "Leer metas", "widgets:auc-fighter:settings.read": "Leer ajustes de auc-fighter", "widgets:settings.read": "Leer ajustes del widget", "widgets:alerts.read": "Leer alertas", "widgets:media:settings.read": "Leer ajustes de media", "widgets:auc-fighter:match-playing.send": "Enviar combate en curso", "widgets:auc-fighter:match-winner.send": "Enviar ganador del combate", "widgets:auc-fighter:match-paused.send": "Enviar combate pausado", "widgets:auc-fighter:match-id.send": "Enviar ID del combate", "widgets:alert:played.send": "Enviar alerta reproducida", "widgets:alert:playing.send": "Enviar alerta en reproducción", "widgets:media:played.send": "Enviar media reproducida", "widgets:media:end.send": "Enviar fin de media", "widgets:media:playing.send": "Enviar media en reproducción", "widgets:media:paused.send": "Enviar media pausada", "widgets:media:error.send": "Enviar error de media", "widgets:media:replay.send": "Enviar repetición de media", "widgets:alert:replay.send": "Enviar repetición de alerta", "widgets:alert:skip.send": "Enviar salto de alerta", "widgets:messages.subscription": "Suscribirse a mensajes", "widgets:goal.subscription": "Suscribirse a meta", "widgets:settings.subscription": "Suscribirse a ajustes", "widgets:auc-fighter:start-match.subscription": "Suscribirse a inicio de combate", "widgets:auc-fighter:pause-match.subscription": "Suscribirse a pausa de combate", "widgets:auc-fighter:resume-match.subscription": "Suscribirse a reanudación de combate", "widgets:auc-fighter:cancel-match.subscription": "Suscribirse a cancelación de combate", "widgets:auc-fighter:update-match.subscription": "Suscribirse a actualización de combate", "widgets:auc-fighter:settings.subscription": "Suscribirse a ajustes de auc-fighter", "widgets:alert:replay.subscription": "Suscribirse a repetición de alerta", "widgets:alert:skip.subscription": "Suscribirse a salto de alerta", "widgets:alert:test.subscription": "Suscribirse a prueba de alerta", "widgets:alert:skip-playing.subscription": "Suscribirse a salto de alerta en reproducción", "widgets:alert:alerts.subscription": "Suscribirse a alertas", "widgets:media:replay.subscription": "Suscribirse a repetición de media", "widgets:media:settings.subscription": "Suscribirse a ajustes de media", "widgets:media:skip.subscription": "Suscribirse a salto de media", "widgets:media:skip-playing-media.subscription": "Suscribirse a salto de media en reproducción", "widgets:media:end.subscription": "Suscribirse a fin de media", "widgets:media:error.subscription": "Suscribirse a error de media", "widgets:media:pause.subscription": "Suscribirse a pausa de media", "widgets:media:play.subscription": "Suscribirse a reproducción de media", "widgets:alert:played.subscription": "Suscribirse a alerta reproducida", "widgets:view:storage.read": "Leer almacenamiento de vista del widget", "widgets:control:storage.read": "Leer almacenamiento de control del widget", "widgets:view:storage.write": "Escribir en almacenamiento de vista del widget", "widgets:control:storage.write": "Escribir en almacenamiento de control del widget", "widgets:view:storage.subscription": "Suscribirse a almacenamiento de vista del widget", "widgets:control:storage.subscription": "Suscribirse a almacenamiento de control del widget" }, RI = { title: "NSFW", nsfw_window: "Ventana NSFW", settings: "Ajustes", window: "Ventana", blur_timeout_duration: "Duración del desenfoque", confidence_threshold: "Umbral de confianza", anus: "Ano", make_love: "Hacer el amor", nipple: "Pezón", penis: "Pene", vagina: "Vagina" }, TI = {
  on: _2,
  off: x2,
  select: k2,
  success: C2,
  ok: E2,
  cancel: P2,
  sound_volume: R2,
  skip_media: T2,
  skip_alert: $2,
  none: M2,
  start: A2,
  stop: I2,
  delay: N2,
  milliseconds: O2,
  token: L2,
  overlay_id: D2,
  api_key: F2,
  disconnected: j2,
  documentation: z2,
  authorization: B2,
  error: W2,
  updater: U2,
  media: V2,
  integration: H2,
  auction: q2,
  maption: K2,
  media_settings: Q2,
  dashboard: G2,
  messages: Y2,
  message: J2,
  filter: X2,
  settings: Z2,
  wheel: eI,
  timer: tI,
  fighter: nI,
  lot: rI,
  bid: iI,
  lots: oI,
  auction_settings: sI,
  lots_options: aI,
  auc_fighter_settings: lI,
  alerts: uI,
  services: cI,
  twitch: dI,
  widy: fI,
  twitch_service_settings: pI,
  alert: hI,
  general: gI,
  goals: mI,
  goal: yI,
  save: vI,
  back: wI,
  widget: SI,
  view: bI,
  image: _I,
  text: xI,
  audio: kI,
  version: CI,
  widgets: EI,
  scopes: PI,
  nsfw: RI
}, $I = "Activé", MI = "Désactivé", AI = "Sélectionner", II = "Succès", NI = "OK", OI = "Annuler", LI = "Volume du son", DI = "Raccourci passer le média", FI = "Raccourci passer l'alerte", jI = "Aucun", zI = "Démarrer", BI = "Arrêter", WI = "Délai", UI = "ms", VI = "Token", HI = "ID Overlay", qI = "Clé API", KI = "Déconnecté", QI = "Documentation", GI = { title: "Autorisation", code: "Code de demande", sign_in: "Se connecter", phone: "Numéro de téléphone", telegram_code: "Code de Telegram", your_code: "Votre code", "2fa_password": "Mot de passe 2FA", password: "Mot de passe", streamelements: "Vous devez d'abord vous connecter avec le JWT de StreamElements", you_can_find_by_url: "Vous pouvez la trouver à cette URL", set_id_and_jwt: "Vous devez définir l'ID de compte StreamElements et le JWT pour {{service}}" }, YI = { wrong_lots_format: "Format des lots incorrect", not_connected: "Non connecté", request_error: "Erreur de requête" }, JI = { title: "Mise à jour", description: "Une nouvelle version de l'application est disponible. Voulez-vous la mettre à jour ?", update: "Mettre à jour", later: "Plus tard", downloading: "Téléchargement en cours..." }, XI = { title: "Média", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, ZI = { tribute: "Afficher les messages de tribut" }, eN = { lots: "Lots", wheel: "Roue", settings: "Paramètres" }, tN = { set_point: "Définir le point", meter_price: "Prix par mètre", amount: "Montant", finish: "Terminer", lat_error: "La latitude doit être comprise entre -90 et 90", lng_error: "La longitude doit être comprise entre -180 et 180", rules: "Pour que le pointeur change automatiquement de position dans le message, il ne doit y avoir qu'un seul mot parmi :" }, nN = { enabled: "Activé", min_amount: "Montant minimum", video_volume: "Volume vidéo", min_views: "Vues minimum" }, rN = { messages: "Messages", settings: "Paramètres", services: "Services", alerts: "Alertes", media: "Média", goals: "Objectifs", auction: "Enchères", maption: "Maption", fighter: "Combattant", widgets: "Widgets", info: "Info", nsfw: "NSFW" }, iN = { title: "Derniers messages" }, oN = { skip: "Passer", replay: "Rejouer", donated: "{{user_name}} a donné {{amount}}{{currency}}", followed: "{{user_name}} s'est abonné", subscribed: "{{user_name}} s'est abonné", gifted_subscriptions: "{{user_name}} a offert {{total}} abonnements", raided_with: "{{user_name}} a raidé avec {{viewers}} viewers" }, sN = { title: "Filtrer les messages", exclude_donations: "Exclure les dons", exclude_follows: "Exclure les follows", exclude_subscriptions: "Exclure les abonnements", exclude_raids: "Exclure les raids" }, aN = { title: "Paramètres", pause: "Mettre en pause les alertes", moderation_duration: "Durée de modération", black_list: "Liste noire", remove_links: "Supprimer les liens", language: "Langue", sec: "sec", currency: "Devise", tts_type: "Type de TTS" }, lN = { normal: "Normal", dropout: "Dropout", spin: "Tourner", speed: "Vitesse de la roue" }, uN = { continue: "Continuer", pause: "Pause", reset: "Réinitialiser", add_time: "Ajouter du temps", reduce_time: "Réduire le temps", add_timex2: "Ajouter du temps x2" }, cN = { title: "Combattant", match: "Match", final: "Finale", game: "Partie", cancel: "Annuler la partie", winner: "Vainqueur", settings: "Paramètres", create_game: "Créer une partie depuis les lots", start: "Démarrer", pause: "Pause", rematch: "Revanche", resume: "Reprendre" }, dN = { name: "Nom", delete: "Supprimer", add: "Ajouter un montant" }, fN = { delete: "Supprimer", to_lot: "Vers le lot", new: "Nouveau", add_to_random_slot: "Ajouter à un lot aléatoire" }, pN = { add: "Ajouter", new_lot_name: "Nom du nouveau lot", search: "Rechercher un lot", total: "Total" }, hN = { leader_change: "Changement de leader", new_lot: "Nouveau lot", new_donation: "Nouveau don", show_odds: "Afficher les cotes", show_total_sum: "Afficher la somme totale", greater_timer_adding_time: "Ajout de temps pour timer supérieur", not_add_time_if: "Ne pas ajouter de temps si", adding_time: "Temps" }, gN = { import_lots: "Importer des lots", clear_lots: "Vider les lots" }, mN = { round_duration: "Durée du round", add_players: "Ajouter des joueurs" }, yN = { title: "Alertes", group: "Groupe" }, vN = { title: "Services", tribute: "Tribute", streamelements: "StreamElements", connect: "Connecter", integrations: "Intégrations", sign_out: "Se déconnecter", confirm_sign_out: "Êtes-vous sûr de vouloir vous déconnecter de ce service ?" }, wN = { device_code_expired: "Code appareil expiré. Veuillez réessayer.", user_code: "Code utilisateur", authorize_with_code: "Autoriser avec le code", waiting_authorization: "En attente d'autorisation..." }, SN = { donation_account_name: "Nom du compte de dons", donation_url: "URL de don", create_donation_account: "Créer un compte de dons Widy", connect_to_existing_account: "Se connecter à un compte existant", create_donation_account_pending: "Création du compte de dons..." }, bN = { title: "Paramètres Twitch", points_currency_ratio: "Ratio points/devise", rewards_name: "Nom des récompenses", rewards_list: "Liste des récompenses", add_reward: "Ajouter une récompense", cost: "Coût", color: "Couleur" }, _N = { image: "Image", audio: "Audio", view: "Vue", title: "Titre", message: "Message", test_name: "Test", test_text: "Ceci est une alerte de test !", configure: "Configurer", test: "Tester", add_new_variant: "Ajouter une nouvelle variante", new_variant: "Nouvelle variante", variant_title: "Titre de la variante", variant_group: "Groupe de variante", status: "Statut", variation_condition: "Condition de variation", group: "Groupe", Random: "Aléatoire", AmountIsGreater: "Le montant est supérieur à", AmountIsEqual: "Le montant est égal à", delete: "Supprimer", sure_delete: "Êtes-vous sûr de vouloir supprimer cette variation ?", type: "Type", Donation: "Don", Subscription: "Abonnement", Follow: "Follow", Raid: "Raid" }, xN = "Général", kN = { title: "Objectifs", create: "Créer un nouvel objectif" }, CN = { new: "Nouvel objectif", goal: "Objectif", type: "Type", elements: "Éléments", progress: "Progression", goal_title: "Titre de l'objectif", amount_raise: "Montant à collecter", start_raising: "Commencer la collecte à", end_date: "Date de fin de l'objectif", bar_height: "Hauteur de la barre", rounding_radius: "Rayon d'arrondi", bar_stroke_thickness: "Épaisseur du contour de la barre", background_bar_color: "Couleur de la barre d'arrière-plan", progress_bar_color: "Couleur de la barre de progression", goal_progress_bar: "Barre de progression de l'objectif", progress_bar_layout: "Disposition de la barre de progression", remaining_time: "Temps restant", goal_amount_limits: "Limites de montant de l'objectif", widget_background: "Arrière-plan du widget", background_color: "Couleur d'arrière-plan", OnTop: "Au-dessus", Inside: "À l'intérieur", Below: "En dessous", DoNotDisplay: "Ne pas afficher", title: "Titre", limits: "limites", raised: "Collecté", days_left: "Jours restants", finish_goal: "Terminer l'objectif", sure_finish: "Êtes-vous sûr de vouloir terminer cet objectif ?", Donation: "Don", TwitchSubscription: "Abonnement Twitch", TwitchFollow: "Follow Twitch", goal_not_finished: "Vous avez un objectif inachevé de ce type." }, EN = "Enregistrer", PN = "Retour", RN = { copy: "Copier", launch: "Lancer", url: "URL du widget", obs_dock_url: "URL OBS Dock" }, TN = { top: "Image en haut, texte en bas", bottom: "Image en bas, texte en haut", left: "Image à gauche, texte à droite", right: "Image à droite, texte à gauche", overlay: "Texte en superposition sur l'image" }, $N = { show: "Afficher l'image" }, MN = { font: "Police", font_size: "Taille de police", text_color: "Couleur du texte", bold: "Gras", italics: "Italique", underline: "Souligné", transformation: "Transformation", letter_spacing: "Espacement des lettres", word_spacing: "Espacement des mots", horizontal_alignment: "Alignement horizontal", vertical_alignment: "Alignement vertical", text_preview: "Ceci est un aperçu !", name: "Nom" }, AN = { play: "Jouer", stop: "Arrêter" }, IN = "Version", NN = { title: "Widgets", add: "Ajouter un widget", install: "Installer", delete: "Supprimer", installed: "Installé", update: "Mettre à jour", all: "Tous", settings: "Paramètres", control: "Contrôle", delete_confirm: "Êtes-vous sûr de vouloir supprimer ce widget ?", invalid_manifest: "Manifeste du widget invalide", add_confirm: "L'ajout permettra à {{widget_name}} de :", installing: "Installation en cours...", updating: "Mise à jour en cours...", view_url: "URL de vue", widget_connection: "Le widget peut envoyer/recevoir des requêtes vers :" }, ON = { "widgets:messages.read": "Lire les messages", "widgets:goals.read": "Lire les objectifs", "widgets:auc-fighter:settings.read": "Lire les paramètres auc-fighter", "widgets:settings.read": "Lire les paramètres du widget", "widgets:alerts.read": "Lire les alertes", "widgets:media:settings.read": "Lire les paramètres média", "widgets:auc-fighter:match-playing.send": "Envoyer match en cours", "widgets:auc-fighter:match-winner.send": "Envoyer vainqueur du match", "widgets:auc-fighter:match-paused.send": "Envoyer match en pause", "widgets:auc-fighter:match-id.send": "Envoyer l'ID du match", "widgets:alert:played.send": "Envoyer alerte jouée", "widgets:alert:playing.send": "Envoyer alerte en cours", "widgets:media:played.send": "Envoyer média joué", "widgets:media:end.send": "Envoyer fin du média", "widgets:media:playing.send": "Envoyer média en cours", "widgets:media:paused.send": "Envoyer média en pause", "widgets:media:error.send": "Envoyer erreur média", "widgets:media:replay.send": "Envoyer relecture média", "widgets:alert:replay.send": "Envoyer relecture alerte", "widgets:alert:skip.send": "Envoyer passer l'alerte", "widgets:messages.subscription": "S'abonner aux messages", "widgets:goal.subscription": "S'abonner aux objectifs", "widgets:settings.subscription": "S'abonner aux paramètres", "widgets:auc-fighter:start-match.subscription": "S'abonner au démarrage du match", "widgets:auc-fighter:pause-match.subscription": "S'abonner à la pause du match", "widgets:auc-fighter:resume-match.subscription": "S'abonner à la reprise du match", "widgets:auc-fighter:cancel-match.subscription": "S'abonner à l'annulation du match", "widgets:auc-fighter:update-match.subscription": "S'abonner à la mise à jour du match", "widgets:auc-fighter:settings.subscription": "S'abonner aux paramètres auc-fighter", "widgets:alert:replay.subscription": "S'abonner à la relecture d'alerte", "widgets:alert:skip.subscription": "S'abonner au passage d'alerte", "widgets:alert:test.subscription": "S'abonner aux tests d'alerte", "widgets:alert:skip-playing.subscription": "S'abonner au passage d'alerte en cours", "widgets:alert:alerts.subscription": "S'abonner aux alertes", "widgets:media:replay.subscription": "S'abonner à la relecture média", "widgets:media:settings.subscription": "S'abonner aux paramètres média", "widgets:media:skip.subscription": "S'abonner au passage de média", "widgets:media:skip-playing-media.subscription": "S'abonner au passage de média en cours", "widgets:media:end.subscription": "S'abonner à la fin du média", "widgets:media:error.subscription": "S'abonner aux erreurs média", "widgets:media:pause.subscription": "S'abonner à la pause média", "widgets:media:play.subscription": "S'abonner à la lecture média", "widgets:alert:played.subscription": "S'abonner aux alertes jouées", "widgets:view:storage.read": "Lire le stockage vue du widget", "widgets:control:storage.read": "Lire le stockage contrôle du widget", "widgets:view:storage.write": "Écrire dans le stockage vue du widget", "widgets:control:storage.write": "Écrire dans le stockage contrôle du widget", "widgets:view:storage.subscription": "S'abonner au stockage vue du widget", "widgets:control:storage.subscription": "S'abonner au stockage contrôle du widget" }, LN = { title: "NSFW", nsfw_window: "Fenêtre NSFW", settings: "Paramètres", window: "Fenêtre", blur_timeout_duration: "Durée du flou", confidence_threshold: "Seuil de confiance", anus: "Anus", make_love: "Rapport sexuel", nipple: "Mamelon", penis: "Pénis", vagina: "Vagin" }, DN = {
  on: $I,
  off: MI,
  select: AI,
  success: II,
  ok: NI,
  cancel: OI,
  sound_volume: LI,
  skip_media: DI,
  skip_alert: FI,
  none: jI,
  start: zI,
  stop: BI,
  delay: WI,
  milliseconds: UI,
  token: VI,
  overlay_id: HI,
  api_key: qI,
  disconnected: KI,
  documentation: QI,
  authorization: GI,
  error: YI,
  updater: JI,
  media: XI,
  integration: ZI,
  auction: eN,
  maption: tN,
  media_settings: nN,
  dashboard: rN,
  messages: iN,
  message: oN,
  filter: sN,
  settings: aN,
  wheel: lN,
  timer: uN,
  fighter: cN,
  lot: dN,
  bid: fN,
  lots: pN,
  auction_settings: hN,
  lots_options: gN,
  auc_fighter_settings: mN,
  alerts: yN,
  services: vN,
  twitch: wN,
  widy: SN,
  twitch_service_settings: bN,
  alert: _N,
  general: xN,
  goals: kN,
  goal: CN,
  save: EN,
  back: PN,
  widget: RN,
  view: TN,
  image: $N,
  text: MN,
  audio: AN,
  version: IN,
  widgets: NN,
  scopes: ON,
  nsfw: LN
}, FN = "चालू", jN = "बंद", zN = "चुनें", BN = "सफल", WN = "ठीक है", UN = "रद्द करें", VN = "ध्वनि वॉल्यूम", HN = "मीडिया स्किप शॉर्टकट", qN = "अलर्ट स्किप शॉर्टकट", KN = "कोई नहीं", QN = "शुरू करें", GN = "रोकें", YN = "देरी", JN = "मिलीसेकंड", XN = "टोकन", ZN = "ओवरले आईडी", eO = "एपीआई कुंजी", tO = "डिस्कनेक्टेड", nO = "दस्तावेज़ीकरण", rO = { title: "अधिकारिकरण", code: "कोड का अनुरोध करें", sign_in: "साइन इन करें", phone: "फ़ोन नंबर", telegram_code: "टेलीग्राम से कोड", your_code: "आपका कोड", "2fa_password": "2FA पासवर्ड", password: "पासवर्ड", streamelements: "सबसे पहले StreamElements JWT से कनेक्ट करें", you_can_find_by_url: "आप इसे इस URL से ढूंढ सकते हैं", set_id_and_jwt: "{{service}} के लिए StreamElements अकाउंट ID और JWT सेट करें" }, iO = { wrong_lots_format: "गलत लॉट फॉर्मेट", not_connected: "कनेक्ट नहीं है", request_error: "अनुरोध त्रुटि" }, oO = { title: "अपडेट", description: "ऐप का नया वर्जन उपलब्ध है। क्या आप अपडेट करना चाहते हैं?", update: "अपडेट करें", later: "बाद में", downloading: "डाउनलोड हो रहा है..." }, sO = { title: "मीडिया", youtube: "यूट्यूब", twitch: "ट्विच", tiktok: "टिकटॉक" }, aO = { tribute: "ट्रिब्यूट संदेश दिखाएं" }, lO = { lots: "लॉट्स", wheel: "व्हील", settings: "सेटिंग्स" }, uO = { set_point: "पॉइंट सेट करें", meter_price: "1 मीटर का मूल्य", amount: "राशि", finish: "समाप्त करें", lat_error: "अक्षांश -90 से 90 के बीच होना चाहिए", lng_error: "देशांतर -180 से 180 के बीच होना चाहिए", rules: "पॉइंटर को मैसेज में ऑटोमैटिकली पोजीशन बदलने के लिए इसमें सिर्फ एक शब्द होना चाहिए:" }, cO = { enabled: "सक्रिय", min_amount: "न्यूनतम राशि", video_volume: "वीडियो वॉल्यूम", min_views: "न्यूनतम व्यूज" }, dO = { messages: "संदेश", settings: "सेटिंग्स", services: "सेवाएं", alerts: "अलर्ट्स", media: "मीडिया", goals: "लक्ष्य", auction: "नीलामी", maption: "मैप्शन", fighter: "फाइटर", widgets: "विजेट्स", info: "जानकारी", nsfw: "NSFW" }, fO = { title: "अंतिम संदेश" }, pO = { skip: "स्किप करें", replay: "रीप्ले", donated: "{{user_name}} ने {{amount}}{{currency}} दान किया", followed: "{{user_name}} ने फॉलो किया", subscribed: "{{user_name}} ने सब्सक्राइब किया", gifted_subscriptions: "{{user_name}} ने {{total}} सब्सक्रिप्शन गिफ्ट किए", raided_with: "{{user_name}} ने {{viewers}} व्यूअर्स के साथ रेड किया" }, hO = { title: "संदेश फ़िल्टर करें", exclude_donations: "दान को बाहर करें", exclude_follows: "फॉलो को बाहर करें", exclude_subscriptions: "सब्सक्रिप्शन को बाहर करें", exclude_raids: "रेड को बाहर करें" }, gO = { title: "सेटिंग्स", pause: "अलर्ट संदेश रोकें", moderation_duration: "मॉडरेशन अवधि", black_list: "ब्लैक लिस्ट", remove_links: "लिंक्स हटाएं", language: "भाषा", sec: "सेकंड", currency: "मुद्रा", tts_type: "TTS प्रकार" }, mO = { normal: "नॉर्मल", dropout: "ड्रॉपआउट", spin: "स्पिन", speed: "व्हील की स्पीड" }, yO = { continue: "जारी रखें", pause: "रोकें", reset: "रीसेट करें", add_time: "समय जोड़ें", reduce_time: "समय घटाएं", add_timex2: "समय x2 जोड़ें" }, vO = { title: "फाइटर", match: "मैच", final: "फाइनल", game: "गेम", cancel: "गेम रद्द करें", winner: "विजेता", settings: "सेटिंग्स", create_game: "लॉट्स से गेम बनाएं", start: "शुरू करें", pause: "रोकें", rematch: "रीमैच", resume: "फिर से शुरू करें" }, wO = { name: "नाम", delete: "हटाएं", add: "राशि जोड़ें" }, SO = { delete: "हटाएं", to_lot: "लॉट में", new: "नया", add_to_random_slot: "रैंडम लॉट में जोड़ें" }, bO = { add: "जोड़ें", new_lot_name: "नया लॉट नाम", search: "लॉट खोजें", total: "कुल" }, _O = { leader_change: "लीडर बदलाव", new_lot: "नया लॉट", new_donation: "नया दान", show_odds: "ऑड्स दिखाएं", show_total_sum: "कुल राशि दिखाएं", greater_timer_adding_time: "बड़ी टाइमर पर समय जोड़ना", not_add_time_if: "समय न जोड़ें अगर", adding_time: "समय" }, xO = { import_lots: "लॉट्स आयात करें", clear_lots: "लॉट्स साफ करें" }, kO = { round_duration: "राउंड अवधि", add_players: "खिलाड़ी जोड़ें" }, CO = { title: "अलर्ट्स", group: "समूह" }, EO = { title: "सेवाएं", tribute: "ट्रिब्यूट", streamelements: "StreamElements", connect: "कनेक्ट करें", integrations: "इंटीग्रेशन्स", sign_out: "साइन आउट", confirm_sign_out: "क्या आप वाकई इस सेवा से साइन आउट करना चाहते हैं?" }, PO = { device_code_expired: "डिवाइस कोड समाप्त हो गया। कृपया फिर से प्रयास करें।", user_code: "यूजर कोड", authorize_with_code: "कोड से अधिकृत करें", waiting_authorization: "अधिकारिकरण का इंतजार है..." }, RO = { donation_account_name: "दान अकाउंट का नाम", donation_url: "दान URL", create_donation_account: "Widy दान अकाउंट बनाएं", connect_to_existing_account: "मौजूदा अकाउंट से कनेक्ट करें", create_donation_account_pending: "दान अकाउंट बनाया जा रहा है..." }, TO = { title: "Twitch सेटिंग्स", points_currency_ratio: "पॉइंट्स मुद्रा अनुपात", rewards_name: "रिवॉर्ड नाम", rewards_list: "रिवॉर्ड्स सूची", add_reward: "रिवॉर्ड जोड़ें", cost: "लागत", color: "रंग" }, $O = { image: "इमेज", audio: "ऑडियो", view: "व्यू", title: "शीर्षक", message: "संदेश", test_name: "टेस्ट", test_text: "यह एक टेस्ट अलर्ट है!", configure: "कॉन्फ़िगर करें", test: "टेस्ट", add_new_variant: "नया वेरिएंट जोड़ें", new_variant: "नया वेरिएंट", variant_title: "वेरिएंट शीर्षक", variant_group: "वेरिएंट समूह", status: "स्थिति", variation_condition: "वेरिएशन शर्त", group: "समूह", Random: "रैंडम", AmountIsGreater: "राशि इससे अधिक है", AmountIsEqual: "राशि बराबर है", delete: "हटाएं", sure_delete: "क्या आप वाकई इस वेरिएशन को हटाना चाहते हैं?", type: "प्रकार", Donation: "दान", Subscription: "सब्सक्रिप्शन", Follow: "फॉलो", Raid: "रेड" }, MO = "सामान्य", AO = { title: "लक्ष्य", create: "नया लक्ष्य बनाएं" }, IO = { new: "नया लक्ष्य", goal: "लक्ष्य", type: "प्रकार", elements: "तत्व", progress: "प्रगति", goal_title: "लक्ष्य शीर्षक", amount_raise: "एकत्र करने की राशि", start_raising: "इससे शुरू करें", end_date: "लक्ष्य समाप्ति तिथि", bar_height: "बार की ऊंचाई", rounding_radius: "गोलाई त्रिज्या", bar_stroke_thickness: "बार स्ट्रोक मोटाई", background_bar_color: "बैकग्राउंड बार रंग", progress_bar_color: "प्रगति बार रंग", goal_progress_bar: "लक्ष्य प्रगति बार", progress_bar_layout: "प्रगति बार लेआउट", remaining_time: "बाकी समय", goal_amount_limits: "लक्ष्य राशि सीमा", widget_background: "विजेट बैकग्राउंड", background_color: "बैकग्राउंड रंग", OnTop: "ऊपर", Inside: "अंदर", Below: "नीचे", DoNotDisplay: "न दिखाएं", title: "शीर्षक", limits: "सीमाएं", raised: "एकत्र", days_left: "बचे दिन", finish_goal: "लक्ष्य पूरा करें", sure_finish: "क्या आप वाकई यह लक्ष्य पूरा करना चाहते हैं?", Donation: "दान", TwitchSubscription: "Twitch सब्सक्रिप्शन", TwitchFollow: "Twitch फॉलो", goal_not_finished: "इस प्रकार का एक अधूरा लक्ष्य पहले से मौजूद है।" }, NO = "सेव करें", OO = "वापस", LO = { copy: "कॉपी करें", launch: "लॉन्च करें", url: "विजेट URL", obs_dock_url: "OBS डॉक URL" }, DO = { top: "इमेज ऊपर, टेक्स्ट नीचे", bottom: "इमेज नीचे, टेक्स्ट ऊपर", left: "इमेज बाएं, टेक्स्ट दाएं", right: "इमेज दाएं, टेक्स्ट बाएं", overlay: "टेक्स्ट इमेज पर ओवरले" }, FO = { show: "इमेज दिखाएं" }, jO = { font: "फॉन्ट", font_size: "फॉन्ट साइज", text_color: "टेक्स्ट रंग", bold: "बोल्ड", italics: "इटैलिक", underline: "अंडरलाइन", transformation: "ट्रांसफॉर्मेशन", letter_spacing: "अक्षर स्पेसिंग", word_spacing: "शब्द स्पेसिंग", horizontal_alignment: "क्षैतिज संरेखण", vertical_alignment: "ऊर्ध्वाधर संरेखण", text_preview: "यह एक पूर्वावलोकन है!", name: "नाम" }, zO = { play: "चलाएं", stop: "रोकें" }, BO = "वर्जन", WO = { title: "विजेट्स", add: "विजेट जोड़ें", install: "इंस्टॉल करें", delete: "हटाएं", installed: "इंस्टॉल किया गया", update: "अपडेट करें", all: "सभी", settings: "सेटिंग्स", control: "कंट्रोल", delete_confirm: "क्या आप वाकई इस विजेट को हटाना चाहते हैं?", invalid_manifest: "अमान्य विजेट मैनिफेस्ट", add_confirm: "जोड़ने से {{widget_name}} को निम्नलिखित की अनुमति मिलेगी:", installing: "इंस्टॉल हो रहा है...", updating: "अपडेट हो रहा है...", view_url: "व्यू URL", widget_connection: "विजेट को अनुरोध भेजने/प्राप्त करने की अनुमति:" }, UO = { "widgets:messages.read": "संदेश पढ़ें", "widgets:goals.read": "लक्ष्य पढ़ें", "widgets:auc-fighter:settings.read": "auc-fighter सेटिंग्स पढ़ें", "widgets:settings.read": "विजेट सेटिंग्स पढ़ें", "widgets:alerts.read": "अलर्ट्स पढ़ें", "widgets:media:settings.read": "मीडिया सेटिंग्स पढ़ें", "widgets:auc-fighter:match-playing.send": "मैच चल रहा है भेजें", "widgets:auc-fighter:match-winner.send": "मैच विजेता भेजें", "widgets:auc-fighter:match-paused.send": "मैच रोका गया भेजें", "widgets:auc-fighter:match-id.send": "मैच ID भेजें", "widgets:alert:played.send": "अलर्ट प्ले किया गया भेजें", "widgets:alert:playing.send": "अलर्ट चल रहा है भेजें", "widgets:media:played.send": "मीडिया प्ले किया गया भेजें", "widgets:media:end.send": "मीडिया समाप्त भेजें", "widgets:media:playing.send": "मीडिया चल रहा है भेजें", "widgets:media:paused.send": "मीडिया रोका गया भेजें", "widgets:media:error.send": "मीडिया त्रुटि भेजें", "widgets:media:replay.send": "मीडिया रिप्ले भेजें", "widgets:alert:replay.send": "अलर्ट रिप्ले भेजें", "widgets:alert:skip.send": "अलर्ट स्किप भेजें", "widgets:messages.subscription": "संदेश सब्सक्राइब करें", "widgets:goal.subscription": "लक्ष्य सब्सक्राइब करें", "widgets:settings.subscription": "सेटिंग्स सब्सक्राइब करें", "widgets:auc-fighter:start-match.subscription": "मैच शुरू सब्सक्राइब करें", "widgets:auc-fighter:pause-match.subscription": "मैच रोकें सब्सक्राइब करें", "widgets:auc-fighter:resume-match.subscription": "मैच जारी सब्सक्राइब करें", "widgets:auc-fighter:cancel-match.subscription": "मैच रद्द सब्सक्राइब करें", "widgets:auc-fighter:update-match.subscription": "मैच अपडेट सब्सक्राइब करें", "widgets:auc-fighter:settings.subscription": "auc-fighter सेटिंग्स सब्सक्राइब करें", "widgets:alert:replay.subscription": "अलर्ट रिप्ले सब्सक्राइब करें", "widgets:alert:skip.subscription": "अलर्ट स्किप सब्सक्राइब करें", "widgets:alert:test.subscription": "अलर्ट टेस्ट सब्सक्राइब करें", "widgets:alert:skip-playing.subscription": "अलर्ट चलते स्किप सब्सक्राइब करें", "widgets:alert:alerts.subscription": "अलर्ट्स सब्सक्राइब करें", "widgets:media:replay.subscription": "मीडिया रिप्ले सब्सक्राइब करें", "widgets:media:settings.subscription": "मीडिया सेटिंग्स सब्सक्राइब करें", "widgets:media:skip.subscription": "मीडिया स्किप सब्सक्राइब करें", "widgets:media:skip-playing-media.subscription": "चलते मीडिया स्किप सब्सक्राइब करें", "widgets:media:end.subscription": "मीडिया समाप्त सब्सक्राइब करें", "widgets:media:error.subscription": "मीडिया त्रुटि सब्सक्राइब करें", "widgets:media:pause.subscription": "मीडिया रोकें सब्सक्राइब करें", "widgets:media:play.subscription": "मीडिया चलाएं सब्सक्राइब करें", "widgets:alert:played.subscription": "अलर्ट प्ले किया गया सब्सक्राइब करें", "widgets:view:storage.read": "विजेट व्यू स्टोरेज पढ़ें", "widgets:control:storage.read": "विजेट कंट्रोल स्टोरेज पढ़ें", "widgets:view:storage.write": "विजेट व्यू स्टोरेज में लिखें", "widgets:control:storage.write": "विजेट कंट्रोल स्टोरेज में लिखें", "widgets:view:storage.subscription": "विजेट व्यू स्टोरेज सब्सक्राइब करें", "widgets:control:storage.subscription": "विजेट कंट्रोल स्टोरेज सब्सक्राइब करें" }, VO = { title: "NSFW", nsfw_window: "NSFW विंडो", settings: "सेटिंग्स", window: "विंडो", blur_timeout_duration: "ब्लर टाइमआउट अवधि", confidence_threshold: "कॉन्फिडेंस थ्रेशोल्ड", anus: "गुदा", make_love: "संभोग", nipple: "स्तनाग्र", penis: "लिंग", vagina: "योनि" }, HO = {
  on: FN,
  off: jN,
  select: zN,
  success: BN,
  ok: WN,
  cancel: UN,
  sound_volume: VN,
  skip_media: HN,
  skip_alert: qN,
  none: KN,
  start: QN,
  stop: GN,
  delay: YN,
  milliseconds: JN,
  token: XN,
  overlay_id: ZN,
  api_key: eO,
  disconnected: tO,
  documentation: nO,
  authorization: rO,
  error: iO,
  updater: oO,
  media: sO,
  integration: aO,
  auction: lO,
  maption: uO,
  media_settings: cO,
  dashboard: dO,
  messages: fO,
  message: pO,
  filter: hO,
  settings: gO,
  wheel: mO,
  timer: yO,
  fighter: vO,
  lot: wO,
  bid: SO,
  lots: bO,
  auction_settings: _O,
  lots_options: xO,
  auc_fighter_settings: kO,
  alerts: CO,
  services: EO,
  twitch: PO,
  widy: RO,
  twitch_service_settings: TO,
  alert: $O,
  general: MO,
  goals: AO,
  goal: IO,
  save: NO,
  back: OO,
  widget: LO,
  view: DO,
  image: FO,
  text: jO,
  audio: zO,
  version: BO,
  widgets: WO,
  scopes: UO,
  nsfw: VO
}, qO = "Ligado", KO = "Desligado", QO = "Selecionar", GO = "Sucesso", YO = "Ok", JO = "Cancelar", XO = "Volume do som", ZO = "Atalho pular mídia", eL = "Atalho pular alerta", tL = "Nenhum", nL = "Iniciar", rL = "Parar", iL = "Atraso", oL = "ms", sL = "Token", aL = "ID do Overlay", lL = "Chave API", uL = "Desconectado", cL = "Documentação", dL = { title: "Autorização", code: "Solicitar código", sign_in: "Entrar", phone: "Número de telefone", telegram_code: "Código do Telegram", your_code: "Seu código", "2fa_password": "Senha 2FA", password: "Senha", streamelements: "Você precisa conectar com o JWT do StreamElements primeiro", you_can_find_by_url: "Você pode encontrar em", set_id_and_jwt: "Você precisa definir o ID da conta e JWT do StreamElements para {{service}}" }, fL = { wrong_lots_format: "Formato de lotes incorreto", not_connected: "Não conectado", request_error: "Erro na requisição" }, pL = { title: "Atualização", description: "Uma nova versão do aplicativo está disponível. Deseja atualizar?", update: "Atualizar", later: "Mais tarde", downloading: "Baixando..." }, hL = { title: "Mídia", youtube: "Youtube", twitch: "Twitch", tiktok: "Tiktok" }, gL = { tribute: "Exibir mensagens de tributo" }, mL = { lots: "Lotes", wheel: "Roleta", settings: "Configurações" }, yL = { set_point: "Definir ponto", meter_price: "Preço por 1 metro", amount: "Quantidade", finish: "Finalizar", lat_error: "A latitude deve estar entre -90 e 90", lng_error: "A longitude deve estar entre -180 e 180", rules: "Para o ponteiro mudar automaticamente de posição na mensagem deve haver apenas uma palavra de:" }, vL = { enabled: "Ativado", min_amount: "Valor mínimo", video_volume: "Volume do vídeo", min_views: "Visualizações mínimas" }, wL = { messages: "Mensagens", settings: "Configurações", services: "Serviços", alerts: "Alertas", media: "Mídia", goals: "Metas", auction: "Leilão", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Informações", nsfw: "NSFW" }, SL = { title: "Últimas mensagens" }, bL = { skip: "Pular", replay: "Reproduzir novamente", donated: "{{user_name}} doou {{amount}}{{currency}}", followed: "{{user_name}} seguiu", subscribed: "{{user_name}} assinou", gifted_subscriptions: "{{user_name}} presenteou {{total}} assinaturas", raided_with: "{{user_name}} raidou com {{viewers}} espectadores" }, _L = { title: "Filtrar mensagens", exclude_donations: "Excluir doações", exclude_follows: "Excluir follows", exclude_subscriptions: "Excluir assinaturas", exclude_raids: "Excluir raids" }, xL = { title: "Configurações", pause: "Pausar mensagens de alerta", moderation_duration: "Duração da moderação", black_list: "Lista negra", remove_links: "Remover links", language: "Idioma", sec: "Seg", currency: "Moeda", tts_type: "Tipo de TTS" }, kL = { normal: "Normal", dropout: "Dropout", spin: "Girar", speed: "Velocidade da roleta" }, CL = { continue: "Continuar", pause: "Pausar", reset: "Resetar", add_time: "Adicionar tempo", reduce_time: "Reduzir tempo", add_timex2: "Adicionar tempo x2" }, EL = { title: "Fighter", match: "Partida", final: "Final", game: "Jogo", cancel: "Cancelar jogo", winner: "Vencedor", settings: "Configurações", create_game: "Criar jogo a partir dos lotes", start: "Iniciar", pause: "Pausar", rematch: "Revanche", resume: "Retomar" }, PL = { name: "Nome", delete: "Excluir", add: "Adicionar quantidade" }, RL = { delete: "Excluir", to_lot: "Para o lote", new: "Novo", add_to_random_slot: "Adicionar a lote aleatório" }, TL = { add: "Adicionar", new_lot_name: "Nome do novo lote", search: "Buscar lote", total: "Total" }, $L = { leader_change: "Mudança de líder", new_lot: "Novo lote", new_donation: "Nova doação", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar soma total", greater_timer_adding_time: "Tempo adicional do timer maior", not_add_time_if: "Não adicionar tempo se", adding_time: "Tempo" }, ML = { import_lots: "Importar lotes", clear_lots: "Limpar lotes" }, AL = { round_duration: "Duração da rodada", add_players: "Adicionar jogadores" }, IL = { title: "Alertas", group: "Grupo" }, NL = { title: "Serviços", tribute: "Tributo", streamelements: "Streamelements", connect: "Conectar", integrations: "Integrações", sign_out: "Sair", confirm_sign_out: "Tem certeza que deseja sair deste serviço?" }, OL = { device_code_expired: "Código do dispositivo expirou. Tente novamente.", user_code: "Código do usuário", authorize_with_code: "Autorizar com código", waiting_authorization: "Aguardando autorização..." }, LL = { donation_account_name: "Nome da conta de doações", donation_url: "URL de doação", create_donation_account: "Criar conta de doação Widy", connect_to_existing_account: "Conectar a uma conta existente", create_donation_account_pending: "Criando conta de doação..." }, DL = { title: "Configurações do Twitch", points_currency_ratio: "Taxa de pontos para moeda", rewards_name: "Nome das recompensas", rewards_list: "Lista de recompensas", add_reward: "Adicionar recompensa", cost: "Custo", color: "Cor" }, FL = { image: "Imagem", audio: "Áudio", view: "Visualização", title: "Título", message: "Mensagem", test_name: "Teste", test_text: "Este é um alerta de teste!", configure: "Configurar", test: "Testar", add_new_variant: "Adicionar nova variante", new_variant: "Nova variante", variant_title: "Título da variante", variant_group: "Grupo da variante", status: "Status", variation_condition: "Condição da variação", group: "Grupo", Random: "Aleatório", AmountIsGreater: "Valor é maior", AmountIsEqual: "Valor é igual", delete: "Excluir", sure_delete: "Tem certeza que deseja excluir esta variação?", type: "Tipo", Donation: "Doação", Subscription: "Assinatura", Follow: "Follow", Raid: "Raid" }, jL = "Geral", zL = { title: "Metas", create: "Criar nova meta" }, BL = { new: "Nova meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progresso", goal_title: "Título da meta", amount_raise: "Valor a arrecadar", start_raising: "Iniciar arrecadação a partir de", end_date: "Data final da meta", bar_height: "Altura da barra", rounding_radius: "Raio de arredondamento", bar_stroke_thickness: "Espessura do traço da barra", background_bar_color: "Cor da barra de fundo", progress_bar_color: "Cor da barra de progresso", goal_progress_bar: "Barra de progresso da meta", progress_bar_layout: "Layout da barra de progresso", remaining_time: "Tempo restante", goal_amount_limits: "Limites de valor da meta", widget_background: "Fundo do widget", background_color: "Cor de fundo", OnTop: "Acima", Inside: "Dentro", Below: "Abaixo", DoNotDisplay: "Não exibir", title: "Título", limits: "limites", raised: "Arrecadado", days_left: "Dias restantes", finish_goal: "Finalizar meta", sure_finish: "Tem certeza que deseja finalizar esta meta?", Donation: "Doação", TwitchSubscription: "Assinatura Twitch", TwitchFollow: "Follow Twitch", goal_not_finished: "Você tem uma meta inacabada deste tipo." }, WL = "Salvar", UL = "Voltar", VL = { copy: "Copiar", launch: "Lançar", url: "URL do Widget", obs_dock_url: "URL do dock OBS" }, HL = { top: "Imagem acima, texto abaixo", bottom: "Imagem abaixo, texto acima", left: "Imagem à esquerda, texto à direita", right: "Imagem à direita, texto à esquerda", overlay: "Texto sobreposto na imagem" }, qL = { show: "Mostrar imagem" }, KL = { font: "Fonte", font_size: "Tamanho da fonte", text_color: "Cor do texto", bold: "Negrito", italics: "Itálico", underline: "Sublinhado", transformation: "Transformação", letter_spacing: "Espaçamento de letras", word_spacing: "Espaçamento de palavras", horizontal_alignment: "Alinhamento horizontal", vertical_alignment: "Alinhamento vertical", text_preview: "Isto é uma prévia!", name: "Nome" }, QL = { play: "Reproduzir", stop: "Parar" }, GL = "Versão", YL = { title: "Widgets", add: "Adicionar widget", install: "Instalar", delete: "Excluir", installed: "Instalado", update: "Atualizar", all: "Todos", settings: "Configurações", control: "Controle", delete_confirm: "Tem certeza que deseja excluir este widget?", invalid_manifest: "Manifest do widget inválido", add_confirm: "Adicionar permitirá que {{widget_name}}:", installing: "Instalando...", updating: "Atualizando...", view_url: "URL de visualização", widget_connection: "O widget obtém ou envia requisições para:" }, JL = { "widgets:messages.read": "Ler mensagens", "widgets:goals.read": "Ler metas", "widgets:auc-fighter:settings.read": "Ler configurações do auc-fighter", "widgets:settings.read": "Ler configurações do widget", "widgets:alerts.read": "Ler alertas", "widgets:media:settings.read": "Ler configurações de mídia", "widgets:auc-fighter:match-playing.send": "Enviar partida em andamento", "widgets:auc-fighter:match-winner.send": "Enviar vencedor da partida", "widgets:auc-fighter:match-paused.send": "Enviar partida pausada", "widgets:auc-fighter:match-id.send": "Enviar ID da partida", "widgets:alert:played.send": "Enviar alerta reproduzido", "widgets:alert:playing.send": "Enviar alerta em reprodução", "widgets:media:played.send": "Enviar mídia reproduzida", "widgets:media:end.send": "Enviar fim da mídia", "widgets:media:playing.send": "Enviar mídia em reprodução", "widgets:media:paused.send": "Enviar mídia pausada", "widgets:media:error.send": "Enviar erro de mídia", "widgets:media:replay.send": "Enviar replay de mídia", "widgets:alert:replay.send": "Enviar replay de alerta", "widgets:alert:skip.send": "Enviar pular alerta", "widgets:messages.subscription": "Inscrever em mensagens", "widgets:goal.subscription": "Inscrever em meta", "widgets:settings.subscription": "Inscrever em configurações", "widgets:auc-fighter:start-match.subscription": "Inscrever em iniciar partida", "widgets:auc-fighter:pause-match.subscription": "Inscrever em pausar partida", "widgets:auc-fighter:resume-match.subscription": "Inscrever em retomar partida", "widgets:auc-fighter:cancel-match.subscription": "Inscrever em cancelar partida", "widgets:auc-fighter:update-match.subscription": "Inscrever em atualizar partida", "widgets:auc-fighter:settings.subscription": "Inscrever em configurações do auc-fighter", "widgets:alert:replay.subscription": "Inscrever em replay de alerta", "widgets:alert:skip.subscription": "Inscrever em pular alerta", "widgets:alert:test.subscription": "Inscrever em teste de alerta", "widgets:alert:skip-playing.subscription": "Inscrever em pular alerta em reprodução", "widgets:alert:alerts.subscription": "Inscrever em alertas", "widgets:media:replay.subscription": "Inscrever em replay de mídia", "widgets:media:settings.subscription": "Inscrever em configurações de mídia", "widgets:media:skip.subscription": "Inscrever em pular mídia", "widgets:media:skip-playing-media.subscription": "Inscrever em pular mídia em reprodução", "widgets:media:end.subscription": "Inscrever em fim da mídia", "widgets:media:error.subscription": "Inscrever em erro de mídia", "widgets:media:pause.subscription": "Inscrever em pausar mídia", "widgets:media:play.subscription": "Inscrever em reproduzir mídia", "widgets:alert:played.subscription": "Inscrever em alerta reproduzido", "widgets:view:storage.read": "Ler armazenamento da view do widget", "widgets:control:storage.read": "Ler armazenamento do controle do widget", "widgets:view:storage.write": "Escrever no armazenamento da view do widget", "widgets:control:storage.write": "Escrever no armazenamento do controle do widget", "widgets:view:storage.subscription": "Inscrever em armazenamento da view do widget", "widgets:control:storage.subscription": "Inscrever em armazenamento do controle do widget" }, XL = { title: "NSFW", nsfw_window: "Janela NSFW", settings: "Configurações", window: "Janela", blur_timeout_duration: "Duração do timeout de desfoque", confidence_threshold: "Limite de confiança", anus: "Ânus", make_love: "Fazer amor", nipple: "Mamilo", penis: "Pênis", vagina: "Vagina" }, ZL = {
  on: qO,
  off: KO,
  select: QO,
  success: GO,
  ok: YO,
  cancel: JO,
  sound_volume: XO,
  skip_media: ZO,
  skip_alert: eL,
  none: tL,
  start: nL,
  stop: rL,
  delay: iL,
  milliseconds: oL,
  token: sL,
  overlay_id: aL,
  api_key: lL,
  disconnected: uL,
  documentation: cL,
  authorization: dL,
  error: fL,
  updater: pL,
  media: hL,
  integration: gL,
  auction: mL,
  maption: yL,
  media_settings: vL,
  dashboard: wL,
  messages: SL,
  message: bL,
  filter: _L,
  settings: xL,
  wheel: kL,
  timer: CL,
  fighter: EL,
  lot: PL,
  bid: RL,
  lots: TL,
  auction_settings: $L,
  lots_options: ML,
  auc_fighter_settings: AL,
  alerts: IL,
  services: NL,
  twitch: OL,
  widy: LL,
  twitch_service_settings: DL,
  alert: FL,
  general: jL,
  goals: zL,
  goal: BL,
  save: WL,
  back: UL,
  widget: VL,
  view: HL,
  image: qL,
  text: KL,
  audio: QL,
  version: GL,
  widgets: YL,
  scopes: JL,
  nsfw: XL
}, eD = "Вкл", tD = "Выкл", nD = "Выбрать", rD = "Успешно", iD = "Ок", oD = "Отмена", sD = "Громкость звука", aD = "Скип медиа", lD = "Скип алерта", uD = "Нет", cD = "Старт", dD = "Стоп", fD = "Задержка", pD = "мс", hD = "Токен", gD = "ID оверлея", mD = "API ключ", yD = "Отключено", vD = "Документация", wD = { title: "Авторизация", code: "Запросить код", sign_in: "Войти", phone: "Номер телефона", telegram_code: "Код из Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Сначала нужно подключить StreamElements JWT", you_can_find_by_url: "Вы можете найти его по этой ссылке", set_id_and_jwt: "Нужно установить StreamElements Account ID и JWT для {{service}}" }, SD = { wrong_lots_format: "Неверный формат лотов", not_connected: "Не подключено", request_error: "Ошибка запроса" }, bD = { title: "Обновление", description: "Доступна новая версия приложения. Хотите обновить?", update: "Обновить", later: "Позже", downloading: "Загрузка..." }, _D = { title: "Медиа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, xD = { tribute: "Показывать tribute-сообщения" }, kD = { lots: "Лоты", wheel: "Колесо", settings: "Настройки" }, CD = { set_point: "Установить точку", meter_price: "Цена за 1 метр", amount: "Сумма", finish: "Завершить", lat_error: "Широта должна быть от -90 до 90", lng_error: "Долгота должна быть от -180 до 180", rules: "Для автоматического изменения позиции указателя в сообщении должно быть только одно слово из:" }, ED = { enabled: "Включено", min_amount: "Мин. сумма", video_volume: "Громкость видео", min_views: "Мин. просмотры" }, PD = { messages: "Сообщения", settings: "Настройки", services: "Сервисы", alerts: "Алерты", media: "Медиа", goals: "Цели", auction: "Аукцион", maption: "Maption", fighter: "Fighter", widgets: "Виджеты", info: "Инфо", nsfw: "NSFW" }, RD = { title: "Последние сообщения" }, TD = { skip: "Пропустить", replay: "Повторить", donated: "{{user_name}} донатнул {{amount}}{{currency}}", followed: "{{user_name}} подписался", subscribed: "{{user_name}} оформил подписку", gifted_subscriptions: "{{user_name}} подарил {{total}} подписок", raided_with: "{{user_name}} зарейдил с {{viewers}} зрителями" }, $D = { title: "Фильтр сообщений", exclude_donations: "Исключить донаты", exclude_follows: "Исключить подписки", exclude_subscriptions: "Исключить подписки", exclude_raids: "Исключить рейды" }, MD = { title: "Настройки", pause: "Приостановить алерты", moderation_duration: "Длительность модерации", black_list: "Чёрный список", remove_links: "Удалять ссылки", language: "Язык", sec: "сек", currency: "Валюта", tts_type: "Тип TTS" }, AD = { normal: "Обычное", dropout: "Выбывание", spin: "Крутить", speed: "Скорость колеса" }, ID = { continue: "Продолжить", pause: "Пауза", reset: "Сброс", add_time: "Добавить время", reduce_time: "Уменьшить время", add_timex2: "Добавить время ×2" }, ND = { title: "Fighter", match: "Матч", final: "Финал", game: "Игра", cancel: "Отменить игру", winner: "Победитель", settings: "Настройки", create_game: "Создать игру из лотов", start: "Начать", pause: "Пауза", rematch: "Реванш", resume: "Возобновить" }, OD = { name: "Название", delete: "Удалить", add: "Добавить сумму" }, LD = { delete: "Удалить", to_lot: "К лоту", new: "Новый", add_to_random_slot: "Добавить в случайный лот" }, DD = { add: "Добавить", new_lot_name: "Название нового лота", search: "Поиск лота", total: "Всего" }, FD = { leader_change: "Смена лидера", new_lot: "Новый лот", new_donation: "Новый донат", show_odds: "Показывать шансы", show_total_sum: "Показывать общую сумму", greater_timer_adding_time: "Добавление времени при большем таймере", not_add_time_if: "Не добавлять время если", adding_time: "Время" }, jD = { import_lots: "Импортировать лоты", clear_lots: "Очистить лоты" }, zD = { round_duration: "Длительность раунда", add_players: "Добавить игроков" }, BD = { title: "Алерты", group: "Группа" }, WD = { title: "Сервисы", tribute: "Tribute", streamelements: "StreamElements", connect: "Подключить", integrations: "Интеграции", sign_out: "Выйти", confirm_sign_out: "Вы уверены, что хотите выйти из этого сервиса?" }, UD = { device_code_expired: "Код устройства истёк. Попробуйте ещё раз.", user_code: "Код пользователя", authorize_with_code: "Авторизоваться по коду", waiting_authorization: "Ожидание авторизации..." }, VD = { donation_account_name: "Название аккаунта донатов", donation_url: "Ссылка на донат", create_donation_account: "Создать аккаунт донатов Widy", connect_to_existing_account: "Подключить существующий аккаунт", create_donation_account_pending: "Создание аккаунта донатов..." }, HD = { title: "Настройки Twitch", points_currency_ratio: "Соотношение баллов и валюты", rewards_name: "Название наград", rewards_list: "Список наград", add_reward: "Добавить награду", cost: "Стоимость", color: "Цвет" }, qD = { image: "Изображение", audio: "Аудио", view: "Вид", title: "Заголовок", message: "Сообщение", test_name: "Тест", test_text: "Это тестовый алерт!", configure: "Настроить", test: "Тест", add_new_variant: "Добавить новый вариант", new_variant: "Новый вариант", variant_title: "Название варианта", variant_group: "Группа варианта", status: "Статус", variation_condition: "Условие вариации", group: "Группа", Random: "Случайный", AmountIsGreater: "Сумма больше", AmountIsEqual: "Сумма равна", delete: "Удалить", sure_delete: "Вы уверены, что хотите удалить этот вариант?", type: "Тип", Donation: "Донат", Subscription: "Подписка", Follow: "Подписка", Raid: "Рейд" }, KD = "Общие", QD = { title: "Цели", create: "Создать новую цель" }, GD = { new: "Новая цель", goal: "Цель", type: "Тип", elements: "Элементы", progress: "Прогресс", goal_title: "Название цели", amount_raise: "Сумма для сбора", start_raising: "Начать сбор с", end_date: "Дата окончания цели", bar_height: "Высота бара", rounding_radius: "Радиус скругления", bar_stroke_thickness: "Толщина обводки бара", background_bar_color: "Цвет фона бара", progress_bar_color: "Цвет бара прогресса", goal_progress_bar: "Прогресс-бар цели", progress_bar_layout: "Расположение прогресс-бара", remaining_time: "Оставшееся время", goal_amount_limits: "Ограничения суммы цели", widget_background: "Фон виджета", background_color: "Цвет фона", OnTop: "Сверху", Inside: "Внутри", Below: "Снизу", DoNotDisplay: "Не отображать", title: "Заголовок", limits: "ограничения", raised: "Собрано", days_left: "Дней осталось", finish_goal: "Завершить цель", sure_finish: "Вы уверены, что хотите завершить эту цель?", Donation: "Донат", TwitchSubscription: "Twitch Подписка", TwitchFollow: "Twitch Подписка", goal_not_finished: "У вас есть незавершённая цель этого типа." }, YD = "Сохранить", JD = "Назад", XD = { copy: "Копировать", launch: "Запустить", url: "URL виджета", obs_dock_url: "OBS Dock URL" }, ZD = { top: "Изображение сверху, текст снизу", bottom: "Изображение снизу, текст сверху", left: "Изображение слева, текст справа", right: "Изображение справа, текст слева", overlay: "Текст поверх изображения" }, eF = { show: "Показывать изображение" }, tF = { font: "Шрифт", font_size: "Размер шрифта", text_color: "Цвет текста", bold: "Жирный", italics: "Курсив", underline: "Подчёркивание", transformation: "Трансформация", letter_spacing: "Межбуквенный интервал", word_spacing: "Межсловный интервал", horizontal_alignment: "Горизонтальное выравнивание", vertical_alignment: "Вертикальное выравнивание", text_preview: "Это превью!", name: "Название" }, nF = { play: "Воспроизвести", stop: "Остановить" }, rF = "Версия", iF = { title: "Виджеты", add: "Добавить виджет", install: "Установить", delete: "Удалить", installed: "Установлено", update: "Обновить", all: "Все", settings: "Настройки", control: "Управление", delete_confirm: "Вы уверены, что хотите удалить этот виджет?", invalid_manifest: "Неверный манифест виджета", add_confirm: "Добавление позволит {{widget_name}}:", installing: "Установка...", updating: "Обновление...", view_url: "URL просмотра", widget_connection: "Виджет получает или отправляет запросы на:" }, oF = { "widgets:messages.read": "Читать сообщения", "widgets:goals.read": "Читать цели", "widgets:auc-fighter:settings.read": "Читать настройки auc-fighter", "widgets:settings.read": "Читать настройки виджета", "widgets:alerts.read": "Читать алерты", "widgets:media:settings.read": "Читать настройки медиа", "widgets:auc-fighter:match-playing.send": "Отправлять статус матча (играется)", "widgets:auc-fighter:match-winner.send": "Отправлять победителя матча", "widgets:auc-fighter:match-paused.send": "Отправлять статус паузы матча", "widgets:auc-fighter:match-id.send": "Отправлять ID матча", "widgets:alert:played.send": "Отправлять статус проигрывания алерта", "widgets:alert:playing.send": "Отправлять статус проигрывания алерта", "widgets:media:played.send": "Отправлять статус проигрывания медиа", "widgets:media:end.send": "Отправлять окончание медиа", "widgets:media:playing.send": "Отправлять статус проигрывания медиа", "widgets:media:paused.send": "Отправлять статус паузы медиа", "widgets:media:error.send": "Отправлять ошибку медиа", "widgets:media:replay.send": "Отправлять повтор медиа", "widgets:alert:replay.send": "Отправлять повтор алерта", "widgets:alert:skip.send": "Отправлять скип алерта", "widgets:messages.subscription": "Подписка на сообщения", "widgets:goal.subscription": "Подписка на цели", "widgets:settings.subscription": "Подписка на настройки", "widgets:auc-fighter:start-match.subscription": "Подписка на старт матча", "widgets:auc-fighter:pause-match.subscription": "Подписка на паузу матча", "widgets:auc-fighter:resume-match.subscription": "Подписка на возобновление матча", "widgets:auc-fighter:cancel-match.subscription": "Подписка на отмену матча", "widgets:auc-fighter:update-match.subscription": "Подписка на обновление матча", "widgets:auc-fighter:settings.subscription": "Подписка на настройки auc-fighter", "widgets:alert:replay.subscription": "Подписка на повтор алерта", "widgets:alert:skip.subscription": "Подписка на скип алерта", "widgets:alert:test.subscription": "Подписка на тестовый алерт", "widgets:alert:skip-playing.subscription": "Подписка на скип проигрываемого алерта", "widgets:alert:alerts.subscription": "Подписка на алерты", "widgets:media:replay.subscription": "Подписка на повтор медиа", "widgets:media:settings.subscription": "Подписка на настройки медиа", "widgets:media:skip.subscription": "Подписка на скип медиа", "widgets:media:skip-playing-media.subscription": "Подписка на скип проигрываемого медиа", "widgets:media:end.subscription": "Подписка на окончание медиа", "widgets:media:error.subscription": "Подписка на ошибку медиа", "widgets:media:pause.subscription": "Подписка на паузу медиа", "widgets:media:play.subscription": "Подписка на воспроизведение медиа", "widgets:alert:played.subscription": "Подписка на проигрывание алерта", "widgets:view:storage.read": "Читать хранилище вида виджета", "widgets:control:storage.read": "Читать хранилище управления виджета", "widgets:view:storage.write": "Записывать в хранилище вида виджета", "widgets:control:storage.write": "Записывать в хранилище управления виджета", "widgets:view:storage.subscription": "Подписка на хранилище вида виджета", "widgets:control:storage.subscription": "Подписка на хранилище управления виджета" }, sF = { title: "NSFW", nsfw_window: "NSFW окно", settings: "Настройки", window: "Окно", blur_timeout_duration: "Длительность размытия", confidence_threshold: "Порог уверенности", anus: "Анус", make_love: "Секс", nipple: "Сосок", penis: "Пенис", vagina: "Вагина" }, aF = {
  on: eD,
  off: tD,
  select: nD,
  success: rD,
  ok: iD,
  cancel: oD,
  sound_volume: sD,
  skip_media: aD,
  skip_alert: lD,
  none: uD,
  start: cD,
  stop: dD,
  delay: fD,
  milliseconds: pD,
  token: hD,
  overlay_id: gD,
  api_key: mD,
  disconnected: yD,
  documentation: vD,
  authorization: wD,
  error: SD,
  updater: bD,
  media: _D,
  integration: xD,
  auction: kD,
  maption: CD,
  media_settings: ED,
  dashboard: PD,
  messages: RD,
  message: TD,
  filter: $D,
  settings: MD,
  wheel: AD,
  timer: ID,
  fighter: ND,
  lot: OD,
  bid: LD,
  lots: DD,
  auction_settings: FD,
  lots_options: jD,
  auc_fighter_settings: zD,
  alerts: BD,
  services: WD,
  twitch: UD,
  widy: VD,
  twitch_service_settings: HD,
  alert: qD,
  general: KD,
  goals: QD,
  goal: GD,
  save: YD,
  back: JD,
  widget: XD,
  view: ZD,
  image: eF,
  text: tF,
  audio: nF,
  version: rF,
  widgets: iF,
  scopes: oF,
  nsfw: sF
}, lF = "Увімкнено", uF = "Вимкнено", cF = "Вибрати", dF = "Успіх", fF = "Ок", pF = "Скасувати", hF = "Гучність звуку", gF = "Скорочення пропуску медіа", mF = "Скорочення пропуску сповіщення", yF = "Немає", vF = "Запустити", wF = "Зупинити", SF = "Затримка", bF = "мс", _F = "Токен", xF = "ID оверлея", kF = "API ключ", CF = "Відключено", EF = "Документація", PF = { title: "Авторизація", code: "Запит коду", sign_in: "Увійти", phone: "Номер телефону", telegram_code: "Код з Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Спочатку потрібно підключити StreamElements JWT", you_can_find_by_url: "Ви можете знайти його за цим посиланням", set_id_and_jwt: "Потрібно встановити StreamElements Account ID та JWT для {{service}}" }, RF = { wrong_lots_format: "Неправильний формат лотів", not_connected: "Не підключено", request_error: "Помилка запиту" }, TF = { title: "Оновлення", description: "Доступна нова версія програми. Бажаєте оновити?", update: "Оновити", later: "Пізніше", downloading: "Завантаження..." }, $F = { title: "Медіа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, MF = { tribute: "Показувати повідомлення подяки" }, AF = { lots: "Лоти", wheel: "Колесо", settings: "Налаштування" }, IF = { set_point: "Встановити точку", meter_price: "Ціна за 1 метр", amount: "Сума", finish: "Завершити", lat_error: "Широта має бути між -90 і 90", lng_error: "Довгота має бути між -180 і 180", rules: "Для автоматичної зміни позиції вказівника в повідомленні має бути лише одне слово з:" }, NF = { enabled: "Увімкнено", min_amount: "Мін. сума", video_volume: "Гучність відео", min_views: "Мін. переглядів" }, OF = { messages: "Повідомлення", settings: "Налаштування", services: "Сервіси", alerts: "Сповіщення", media: "Медіа", goals: "Цілі", auction: "Аукціон", maption: "Maption", fighter: "Боєць", widgets: "Віджети", info: "Інформація", nsfw: "NSFW" }, LF = { title: "Останні повідомлення" }, DF = { skip: "Пропустити", replay: "Повторити", donated: "{{user_name}} донатив {{amount}}{{currency}}", followed: "{{user_name}} підписався", subscribed: "{{user_name}} оформив підписку", gifted_subscriptions: "{{user_name}} подарував {{total}} підписок", raided_with: "{{user_name}} здійснив рейд з {{viewers}} глядачами" }, FF = { title: "Фільтр повідомлень", exclude_donations: "Виключити донати", exclude_follows: "Виключити підписки", exclude_subscriptions: "Виключити підписки", exclude_raids: "Виключити рейди" }, jF = { title: "Налаштування", pause: "Призупинити сповіщення", moderation_duration: "Тривалість модерації", black_list: "Чорний список", remove_links: "Видаляти посилання", language: "Мова", sec: "Сек", currency: "Валюта", tts_type: "Тип TTS" }, zF = { normal: "Звичайне", dropout: "Випадання", spin: "Обертання", speed: "Швидкість колеса" }, BF = { continue: "Продовжити", pause: "Призупинити", reset: "Скинути", add_time: "Додати час", reduce_time: "Зменшити час", add_timex2: "Додати час ×2" }, WF = { title: "Боєць", match: "Матч", final: "Фінал", game: "Гра", cancel: "Скасувати гру", winner: "Переможець", settings: "Налаштування", create_game: "Створити гру з лотів", start: "Старт", pause: "Пауза", rematch: "Реванш", resume: "Відновити" }, UF = { name: "Назва", delete: "Видалити", add: "Додати суму" }, VF = { delete: "Видалити", to_lot: "До лоту", new: "Новий", add_to_random_slot: "Додати до випадкового лоту" }, HF = { add: "Додати", new_lot_name: "Назва нового лоту", search: "Пошук лоту", total: "Всього" }, qF = { leader_change: "Зміна лідера", new_lot: "Новий лот", new_donation: "Новий донат", show_odds: "Показувати коефіцієнти", show_total_sum: "Показувати загальну суму", greater_timer_adding_time: "Додавання часу при перевищенні", not_add_time_if: "Не додавати час якщо", adding_time: "Час" }, KF = { import_lots: "Імпортувати лоти", clear_lots: "Очистити лоти" }, QF = { round_duration: "Тривалість раунду", add_players: "Додати гравців" }, GF = { title: "Сповіщення", group: "Група" }, YF = { title: "Сервіси", tribute: "Подяка", streamelements: "StreamElements", connect: "Підключити", integrations: "Інтеграції", sign_out: "Вийти", confirm_sign_out: "Ви впевнені, що хочете вийти з цього сервісу?" }, JF = { device_code_expired: "Термін дії коду пристрою закінчився. Спробуйте ще раз.", user_code: "Код користувача", authorize_with_code: "Авторизуватися за кодом", waiting_authorization: "Очікування авторизації..." }, XF = { donation_account_name: "Назва акаунту донатів", donation_url: "URL донатів", create_donation_account: "Створити акаунт донатів Widy", connect_to_existing_account: "Підключитися до існуючого акаунту", create_donation_account_pending: "Створення акаунту донатів..." }, ZF = { title: "Налаштування Twitch", points_currency_ratio: "Співвідношення балів до валюти", rewards_name: "Назва винагород", rewards_list: "Список винагород", add_reward: "Додати винагороду", cost: "Вартість", color: "Колір" }, ej = { image: "Зображення", audio: "Аудіо", view: "Вид", title: "Заголовок", message: "Повідомлення", test_name: "Тест", test_text: "Це тестове сповіщення!", configure: "Налаштувати", test: "Тест", add_new_variant: "Додати новий варіант", new_variant: "Новий варіант", variant_title: "Назва варіанту", variant_group: "Група варіанту", status: "Статус", variation_condition: "Умова варіації", group: "Група", Random: "Випадковий", AmountIsGreater: "Сума більша", AmountIsEqual: "Сума дорівнює", delete: "Видалити", sure_delete: "Ви впевнені, що хочете видалити цей варіант?", type: "Тип", Donation: "Донат", Subscription: "Підписка", Follow: "Підписка", Raid: "Рейд" }, tj = "Загальні", nj = { title: "Цілі", create: "Створити нову ціль" }, rj = { new: "Нова ціль", goal: "Перегляд", type: "Тип", elements: "Елементи", progress: "Прогрес", goal_title: "Назва цілі", amount_raise: "Сума для збору", start_raising: "Почати збір з", end_date: "Дата завершення цілі", bar_height: "Висота бару", rounding_radius: "Радіус закруглення", bar_stroke_thickness: "Товщина обводки бару", background_bar_color: "Колір фонового бару", progress_bar_color: "Колір прогрес-бару", goal_progress_bar: "Прогрес-бар цілі", progress_bar_layout: "Розташування прогрес-бару", remaining_time: "Залишок часу", goal_amount_limits: "Ліміти суми цілі", widget_background: "Фон віджету", background_color: "Колір фону", OnTop: "Зверху", Inside: "Всередині", Below: "Знизу", DoNotDisplay: "Не відображати", title: "Заголовок", limits: "Ліміти", raised: "Зібрано", days_left: "Днів залишилось", finish_goal: "Завершити ціль", sure_finish: "Ви впевнені, що хочете завершити цю ціль?", Donation: "Донат", TwitchSubscription: "Підписка Twitch", TwitchFollow: "Підписка Twitch", goal_not_finished: "У вас є незавершена ціль цього типу." }, ij = "Зберегти", oj = "Назад", sj = { copy: "Копіювати", launch: "Запустити", url: "URL віджету", obs_dock_url: "OBS dock URL" }, aj = { top: "Зображення зверху, текст знизу", bottom: "Зображення знизу, текст зверху", left: "Зображення ліворуч, текст праворуч", right: "Зображення праворуч, текст ліворуч", overlay: "Текст поверх зображення" }, lj = { show: "Показувати зображення" }, uj = { font: "Шрифт", font_size: "Розмір шрифту", text_color: "Колір тексту", bold: "Жирний", italics: "Курсив", underline: "Підкреслений", transformation: "Трансформація", letter_spacing: "Відстань між літерами", word_spacing: "Відстань між словами", horizontal_alignment: "Горизонтальне вирівнювання", vertical_alignment: "Вертикальне вирівнювання", text_preview: "Це попередній перегляд!", name: "Назва" }, cj = { play: "Відтворити", stop: "Зупинити" }, dj = "Версія", fj = { title: "Віджети", add: "Додати віджет", install: "Встановити", delete: "Видалити", installed: "Встановлено", update: "Оновити", all: "Всі", settings: "Налаштування", control: "Керування", delete_confirm: "Ви впевнені, що хочете видалити цей віджет?", invalid_manifest: "Невірний маніфест віджету", add_confirm: "Додавання дозволить {{widget_name}}:", installing: "Встановлення...", updating: "Оновлення...", view_url: "URL перегляду", widget_connection: "Віджет отримує або надсилає запити до:" }, pj = { "widgets:messages.read": "Читати повідомлення", "widgets:goals.read": "Читати цілі", "widgets:auc-fighter:settings.read": "Читати налаштування auc-fighter", "widgets:settings.read": "Читати налаштування віджетів", "widgets:alerts.read": "Читати сповіщення", "widgets:media:settings.read": "Читати налаштування медіа", "widgets:auc-fighter:match-playing.send": "Надсилати стан матчу (грає)", "widgets:auc-fighter:match-winner.send": "Надсилати переможця матчу", "widgets:auc-fighter:match-paused.send": "Надсилати паузу матчу", "widgets:auc-fighter:match-id.send": "Надсилати ID матчу", "widgets:alert:played.send": "Надсилати відтворене сповіщення", "widgets:alert:playing.send": "Надсилати відтворення сповіщення", "widgets:media:played.send": "Надсилати відтворене медіа", "widgets:media:end.send": "Надсилати завершення медіа", "widgets:media:playing.send": "Надсилати відтворення медіа", "widgets:media:paused.send": "Надсилати паузу медіа", "widgets:media:error.send": "Надсилати помилку медіа", "widgets:media:replay.send": "Надсилати повтор медіа", "widgets:alert:replay.send": "Надсилати повтор сповіщення", "widgets:alert:skip.send": "Надсилати пропуск сповіщення", "widgets:messages.subscription": "Підписка на повідомлення", "widgets:goal.subscription": "Підписка на цілі", "widgets:settings.subscription": "Підписка на налаштування", "widgets:auc-fighter:start-match.subscription": "Підписка на старт матчу", "widgets:auc-fighter:pause-match.subscription": "Підписка на паузу матчу", "widgets:auc-fighter:resume-match.subscription": "Підписка на відновлення матчу", "widgets:auc-fighter:cancel-match.subscription": "Підписка на скасування матчу", "widgets:auc-fighter:update-match.subscription": "Підписка на оновлення матчу", "widgets:auc-fighter:settings.subscription": "Підписка на налаштування auc-fighter", "widgets:alert:replay.subscription": "Підписка на повтор сповіщення", "widgets:alert:skip.subscription": "Підписка на пропуск сповіщення", "widgets:alert:test.subscription": "Підписка на тест сповіщення", "widgets:alert:skip-playing.subscription": "Підписка на пропуск відтворення", "widgets:alert:alerts.subscription": "Підписка на сповіщення", "widgets:media:replay.subscription": "Підписка на повтор медіа", "widgets:media:settings.subscription": "Підписка на налаштування медіа", "widgets:media:skip.subscription": "Підписка на пропуск медіа", "widgets:media:skip-playing-media.subscription": "Підписка на пропуск відтворення медіа", "widgets:media:end.subscription": "Підписка на завершення медіа", "widgets:media:error.subscription": "Підписка на помилку медіа", "widgets:media:pause.subscription": "Підписка на паузу медіа", "widgets:media:play.subscription": "Підписка на запуск медіа", "widgets:alert:played.subscription": "Підписка на відтворене сповіщення", "widgets:view:storage.read": "Читати сховище view", "widgets:control:storage.read": "Читати сховище control", "widgets:view:storage.write": "Записувати у сховище view", "widgets:control:storage.write": "Записувати у сховище control", "widgets:view:storage.subscription": "Підписка на сховище view", "widgets:control:storage.subscription": "Підписка на сховище control" }, hj = { title: "NSFW", nsfw_window: "NSFW вікно", settings: "Налаштування", window: "Вікно", blur_timeout_duration: "Тривалість розмиття", confidence_threshold: "Поріг впевненості", anus: "Анус", make_love: "Займатися сексом", nipple: "Сосок", penis: "Пеніс", vagina: "Піхва" }, gj = {
  on: lF,
  off: uF,
  select: cF,
  success: dF,
  ok: fF,
  cancel: pF,
  sound_volume: hF,
  skip_media: gF,
  skip_alert: mF,
  none: yF,
  start: vF,
  stop: wF,
  delay: SF,
  milliseconds: bF,
  token: _F,
  overlay_id: xF,
  api_key: kF,
  disconnected: CF,
  documentation: EF,
  authorization: PF,
  error: RF,
  updater: TF,
  media: $F,
  integration: MF,
  auction: AF,
  maption: IF,
  media_settings: NF,
  dashboard: OF,
  messages: LF,
  message: DF,
  filter: FF,
  settings: jF,
  wheel: zF,
  timer: BF,
  fighter: WF,
  lot: UF,
  bid: VF,
  lots: HF,
  auction_settings: qF,
  lots_options: KF,
  auc_fighter_settings: QF,
  alerts: GF,
  services: YF,
  twitch: JF,
  widy: XF,
  twitch_service_settings: ZF,
  alert: ej,
  general: tj,
  goals: nj,
  goal: rj,
  save: ij,
  back: oj,
  widget: sj,
  view: aj,
  image: lj,
  text: uj,
  audio: cj,
  version: dj,
  widgets: fj,
  scopes: pj,
  nsfw: hj
}, mj = "开启", yj = "关闭", vj = "选择", wj = "成功", Sj = "确定", bj = "取消", _j = "音量", xj = "快捷跳过媒体", kj = "快捷跳过提醒", Cj = "无", Ej = "开始", Pj = "停止", Rj = "延迟", Tj = "毫秒", $j = "令牌", Mj = "覆盖层 ID", Aj = "API 密钥", Ij = "已断开连接", Nj = "文档", Oj = { title: "授权", code: "请求代码", sign_in: "登录", phone: "手机号", telegram_code: "Telegram 验证码", your_code: "您的验证码", "2fa_password": "两步验证密码", password: "密码", streamelements: "需要先连接 StreamElements JWT", you_can_find_by_url: "您可以通过此链接找到", set_id_and_jwt: "您需要为 {{service}} 设置 StreamElements 账号 ID 和 JWT" }, Lj = { wrong_lots_format: "奖品格式错误", not_connected: "未连接", request_error: "请求错误" }, Dj = { title: "更新", description: "有新版本可用，是否立即更新？", update: "更新", later: "稍后", downloading: "下载中..." }, Fj = { title: "媒体", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, jj = { tribute: "显示致敬消息" }, zj = { lots: "奖品", wheel: "转盘", settings: "设置" }, Bj = { set_point: "设置点位", meter_price: "每米价格", amount: "金额", finish: "完成", lat_error: "纬度必须在 -90 到 90 之间", lng_error: "经度必须在 -180 到 180 之间", rules: "指针要在消息中自动改变位置时，只能包含以下其中一个词：" }, Wj = { enabled: "已启用", min_amount: "最低金额", video_volume: "视频音量", min_views: "最低观看数" }, Uj = { messages: "消息", settings: "设置", services: "服务", alerts: "提醒", media: "媒体", goals: "目标", auction: "拍卖", maption: "地图", fighter: "对战", widgets: "小部件", info: "信息", nsfw: "NSFW" }, Vj = { title: "最新消息" }, Hj = { skip: "跳过", replay: "重播", donated: "{{user_name}} 捐赠了 {{amount}}{{currency}}", followed: "{{user_name}} 已关注", subscribed: "{{user_name}} 已订阅", gifted_subscriptions: "{{user_name}} 赠送了 {{total}} 个订阅", raided_with: "{{user_name}} 带 {{viewers}} 名观众突袭" }, qj = { title: "过滤消息", exclude_donations: "排除捐赠", exclude_follows: "排除关注", exclude_subscriptions: "排除订阅", exclude_raids: "排除突袭" }, Kj = { title: "设置", pause: "暂停提醒消息", moderation_duration: "审核时长", black_list: "黑名单", remove_links: "移除链接", language: "语言", sec: "秒", currency: "货币", tts_type: "TTS 类型" }, Qj = { normal: "普通", dropout: "淘汰", spin: "旋转", speed: "转盘速度" }, Gj = { continue: "继续", pause: "暂停", reset: "重置", add_time: "增加时间", reduce_time: "减少时间", add_timex2: "增加时间 x2" }, Yj = { title: "对战", match: "比赛", final: "决赛", game: "游戏", cancel: "取消比赛", winner: "获胜者", settings: "设置", create_game: "从奖品创建比赛", start: "开始", pause: "暂停", rematch: "重赛", resume: "继续" }, Jj = { name: "名称", delete: "删除", add: "增加金额" }, Xj = { delete: "删除", to_lot: "添加到奖品", new: "新建", add_to_random_slot: "添加到随机奖品" }, Zj = { add: "添加", new_lot_name: "新奖品名称", search: "搜索奖品", total: "总计" }, ez = { leader_change: "领先者变更", new_lot: "新奖品", new_donation: "新捐赠", show_odds: "显示赔率", show_total_sum: "显示总金额", greater_timer_adding_time: "领先时增加时间", not_add_time_if: "不增加时间的情况", adding_time: "增加时间" }, tz = { import_lots: "导入奖品", clear_lots: "清空奖品" }, nz = { round_duration: "回合时长", add_players: "添加选手" }, rz = { title: "提醒", group: "分组" }, iz = { title: "服务", tribute: "致敬", streamelements: "StreamElements", connect: "连接", integrations: "集成", sign_out: "退出登录", confirm_sign_out: "确定要退出此服务吗？" }, oz = { device_code_expired: "设备代码已过期，请重试。", user_code: "用户代码", authorize_with_code: "使用代码授权", waiting_authorization: "等待授权中..." }, sz = { donation_account_name: "捐赠账号名称", donation_url: "捐赠链接", create_donation_account: "创建 Widy 捐赠账号", connect_to_existing_account: "连接已有账号", create_donation_account_pending: "正在创建捐赠账号..." }, az = { title: "Twitch 设置", points_currency_ratio: "积分货币比例", rewards_name: "奖励名称", rewards_list: "奖励列表", add_reward: "添加奖励", cost: "价格", color: "颜色" }, lz = { image: "图片", audio: "音频", view: "视图", title: "标题", message: "消息", test_name: "测试", test_text: "这是一个测试提醒！", configure: "配置", test: "测试", add_new_variant: "添加新变体", new_variant: "新变体", variant_title: "变体标题", variant_group: "变体分组", status: "状态", variation_condition: "变体条件", group: "分组", Random: "随机", AmountIsGreater: "金额大于", AmountIsEqual: "金额等于", delete: "删除", sure_delete: "确定要删除此变体吗？", type: "类型", Donation: "捐赠", Subscription: "订阅", Follow: "关注", Raid: "突袭" }, uz = "常规", cz = { title: "目标", create: "创建新目标" }, dz = { new: "新目标", goal: "目标", type: "类型", elements: "元素", progress: "进度", goal_title: "目标标题", amount_raise: "目标金额", start_raising: "起始金额", end_date: "结束日期", bar_height: "进度条高度", rounding_radius: "圆角半径", bar_stroke_thickness: "进度条边框粗细", background_bar_color: "背景条颜色", progress_bar_color: "进度条颜色", goal_progress_bar: "目标进度条", progress_bar_layout: "进度条布局", remaining_time: "剩余时间", goal_amount_limits: "目标金额限制", widget_background: "小部件背景", background_color: "背景颜色", OnTop: "上方", Inside: "内部", Below: "下方", DoNotDisplay: "不显示", title: "标题", limits: "限制", raised: "已筹集", days_left: "剩余天数", finish_goal: "完成目标", sure_finish: "确定要完成此目标吗？", Donation: "捐赠", TwitchSubscription: "Twitch 订阅", TwitchFollow: "Twitch 关注", goal_not_finished: "您有一个同类型的未完成目标。" }, fz = "保存", pz = "返回", hz = { copy: "复制", launch: "启动", url: "小部件链接", obs_dock_url: "OBS 停靠链接" }, gz = { top: "图片在上，文字在下", bottom: "图片在下，文字在上", left: "图片在左，文字在右", right: "图片在右，文字在左", overlay: "文字覆盖图片" }, mz = { show: "显示图片" }, yz = { font: "字体", font_size: "字号", text_color: "文字颜色", bold: "加粗", italics: "斜体", underline: "下划线", transformation: "变换", letter_spacing: "字间距", word_spacing: "词间距", horizontal_alignment: "水平对齐", vertical_alignment: "垂直对齐", text_preview: "这是预览效果！", name: "名称" }, vz = { play: "播放", stop: "停止" }, wz = "版本", Sz = { title: "小部件", add: "添加小部件", install: "安装", delete: "删除", installed: "已安装", update: "更新", all: "全部", settings: "设置", control: "控制", delete_confirm: "确定要删除此小部件吗？", invalid_manifest: "无效的小部件清单", add_confirm: "添加后将允许 {{widget_name}}：", installing: "安装中...", updating: "更新中...", view_url: "查看链接", widget_connection: "小部件将获取或发送请求到：" }, bz = { "widgets:messages.read": "读取消息", "widgets:goals.read": "读取目标", "widgets:auc-fighter:settings.read": "读取对战设置", "widgets:settings.read": "读取小部件设置", "widgets:alerts.read": "读取提醒", "widgets:media:settings.read": "读取媒体设置", "widgets:auc-fighter:match-playing.send": "发送比赛进行中", "widgets:auc-fighter:match-winner.send": "发送获胜者", "widgets:auc-fighter:match-paused.send": "发送比赛暂停", "widgets:auc-fighter:match-id.send": "发送比赛 ID", "widgets:alert:played.send": "发送提醒已播放", "widgets:alert:playing.send": "发送提醒正在播放", "widgets:media:played.send": "发送媒体已播放", "widgets:media:end.send": "发送媒体结束", "widgets:media:playing.send": "发送媒体正在播放", "widgets:media:paused.send": "发送媒体暂停", "widgets:media:error.send": "发送媒体错误", "widgets:media:replay.send": "发送媒体重播", "widgets:alert:replay.send": "发送提醒重播", "widgets:alert:skip.send": "发送提醒跳过", "widgets:messages.subscription": "订阅消息", "widgets:goal.subscription": "订阅目标", "widgets:settings.subscription": "订阅设置", "widgets:auc-fighter:start-match.subscription": "订阅开始比赛", "widgets:auc-fighter:pause-match.subscription": "订阅暂停比赛", "widgets:auc-fighter:resume-match.subscription": "订阅继续比赛", "widgets:auc-fighter:cancel-match.subscription": "订阅取消比赛", "widgets:auc-fighter:update-match.subscription": "订阅更新比赛", "widgets:auc-fighter:settings.subscription": "订阅对战设置", "widgets:alert:replay.subscription": "订阅提醒重播", "widgets:alert:skip.subscription": "订阅提醒跳过", "widgets:alert:test.subscription": "订阅提醒测试", "widgets:alert:skip-playing.subscription": "订阅跳过正在播放的提醒", "widgets:alert:alerts.subscription": "订阅提醒", "widgets:media:replay.subscription": "订阅媒体重播", "widgets:media:settings.subscription": "订阅媒体设置", "widgets:media:skip.subscription": "订阅跳过媒体", "widgets:media:skip-playing-media.subscription": "订阅跳过正在播放的媒体", "widgets:media:end.subscription": "订阅媒体结束", "widgets:media:error.subscription": "订阅媒体错误", "widgets:media:pause.subscription": "订阅媒体暂停", "widgets:media:play.subscription": "订阅媒体播放", "widgets:alert:played.subscription": "订阅提醒已播放", "widgets:view:storage.read": "读取视图存储", "widgets:control:storage.read": "读取控制存储", "widgets:view:storage.write": "写入视图存储", "widgets:control:storage.write": "写入控制存储", "widgets:view:storage.subscription": "订阅视图存储", "widgets:control:storage.subscription": "订阅控制存储" }, _z = { title: "NSFW", nsfw_window: "NSFW 窗口", settings: "设置", window: "窗口", blur_timeout_duration: "模糊超时时间", confidence_threshold: "置信度阈值", anus: "肛门", make_love: "做爱", nipple: "乳头", penis: "阴茎", vagina: "阴道" }, xz = {
  on: mj,
  off: yj,
  select: vj,
  success: wj,
  ok: Sj,
  cancel: bj,
  sound_volume: _j,
  skip_media: xj,
  skip_alert: kj,
  none: Cj,
  start: Ej,
  stop: Pj,
  delay: Rj,
  milliseconds: Tj,
  token: $j,
  overlay_id: Mj,
  api_key: Aj,
  disconnected: Ij,
  documentation: Nj,
  authorization: Oj,
  error: Lj,
  updater: Dj,
  media: Fj,
  integration: jj,
  auction: zj,
  maption: Bj,
  media_settings: Wj,
  dashboard: Uj,
  messages: Vj,
  message: Hj,
  filter: qj,
  settings: Kj,
  wheel: Qj,
  timer: Gj,
  fighter: Yj,
  lot: Jj,
  bid: Xj,
  lots: Zj,
  auction_settings: ez,
  lots_options: tz,
  auc_fighter_settings: nz,
  alerts: rz,
  services: iz,
  twitch: oz,
  widy: sz,
  twitch_service_settings: az,
  alert: lz,
  general: uz,
  goals: cz,
  goal: dz,
  save: fz,
  back: pz,
  widget: hz,
  view: gz,
  image: mz,
  text: yz,
  audio: vz,
  version: wz,
  widgets: Sz,
  scopes: bz,
  nsfw: _z
};
jt.use(X$).init({
  resources: {
    en: {
      translation: b2
    },
    ua: {
      translation: gj
    },
    ru: {
      translation: aF
    },
    de: {
      translation: cA
    },
    es: {
      translation: TI
    },
    fr: {
      translation: DN
    },
    hi: {
      translation: HO
    },
    pt: {
      translation: ZL
    },
    zh: {
      translation: xz
    }
  },
  lng: "en",
  fallbackLng: "en",
  nsSeparator: !1
});
var Cu;
(function(e) {
  e.error = "error", e.info = "info", e.success = "success", e.warning = "warning";
})(Cu || (Cu = {}));
var Hv;
(function(e) {
  e.en = "en", e.es = "es", e.de = "de", e.zh = "zh", e.fr = "fr", e.hi = "hi", e.ar = "ar", e.pt = "pt", e.ru = "ru", e.ua = "ua";
})(Hv || (Hv = {}));
var ne;
(function(e) {
  e.Message = "Message", e.Media = "Media", e.SkipAlert = "SkipAlert", e.ReplayAlert = "ReplayAlert", e.AlertPlaying = "AlertPlaying", e.AlertPlayed = "AlertPlayed", e.MediaPlaying = "MediaPlaying", e.SkipPlayingMedia = "SkipPlayingMedia", e.SkipPlayingAlert = "SkipPlayingAlert", e.MediaEnd = "MediaEnd", e.MediaError = "MediaError", e.MediaPaused = "MediaPaused", e.PauseMedia = "PauseMedia", e.MediaPlayed = "MediaPlayed", e.PlayMedia = "PlayMedia", e.SkipMedia = "SkipMedia", e.ReplayMedia = "ReplayMedia", e.Alerts = "Alerts", e.MakeAudioError = "MakeAudioError", e.Settings = "Settings", e.MediaSettings = "MediaSettings", e.StartAucFighterMatch = "StartAucFighterMatch", e.AucFighterMatchEnd = "AucFighterMatchEnd", e.PauseAucFighterMatch = "PauseAucFighterMatch", e.ResumeAucFighterMatch = "ResumeAucFighterMatch", e.AucFighterMatchPlaying = "AucFighterMatchPlaying", e.AucFighterMatchPaused = "AucFighterMatchPaused", e.UpdateAucFighterMatch = "UpdateAucFighterMatch", e.CancelAucFighterMatch = "CancelAucFighterMatch", e.AucFighterSettings = "AucFighterSettings", e.TestAlert = "TestAlert", e.Goal = "Goal", e.CreateDonationAccount = "CreateDonationAccount", e.WidgetViewStorage = "WidgetViewStorage", e.WidgetControlStorage = "WidgetControlStorage", e.NsfwDetection = "NsfwDetection", e.NsfwSettings = "NsfwSettings", e.Alert = "Alert", e.Donation = "Donation", e.Redemption = "Redemption";
})(ne || (ne = {}));
var qv;
(function(e) {
  e.Connect = "Connect", e.Authenticated = "Authenticated";
})(qv || (qv = {}));
var ut;
(function(e) {
  e.Top = "Top", e.Bottom = "Bottom", e.Left = "Left", e.Right = "Right", e.Overlay = "Overlay";
})(ut || (ut = {}));
var yr;
(function(e) {
  e.UAH = "UAH", e.RUB = "RUB", e.EUR = "EUR", e.USD = "USD", e.BRL = "BRL", e.TRY = "TRY", e.BYN = "BYN", e.KZT = "KZT", e.AUD = "AUD", e.CAD = "CAD", e.CZK = "CZK", e.DKK = "DKK", e.HKD = "HKD", e.ILS = "ILS", e.MYR = "MYR", e.MXN = "MXN", e.NOK = "NOK", e.NZD = "NZD", e.PHP = "PHP", e.PLN = "PLN", e.GBP = "GBP", e.SGD = "SGD", e.SEK = "SEK", e.CHF = "CHF", e.THB = "THB", e.NONE = "NONE";
})(yr || (yr = {}));
var Kr;
(function(e) {
  e.Youtube = "Youtube", e.Twitch = "Twitch", e.TikTok = "TikTok";
})(Kr || (Kr = {}));
var Kv;
(function(e) {
  e.normal = "normal", e.dropout = "dropout";
})(Kv || (Kv = {}));
var Ci;
(function(e) {
  e.Random = "Random", e.AmountIsGreater = "AmountIsGreater", e.AmountIsEqual = "AmountIsEqual";
})(Ci || (Ci = {}));
var Hr;
(function(e) {
  e.OnTop = "OnTop", e.Inside = "Inside", e.Below = "Below", e.DoNotDisplay = "DoNotDisplay";
})(Hr || (Hr = {}));
var Si;
(function(e) {
  e.Percent = "Percent", e.CurrentAmount = "CurrentAmount", e.CurrentAmountPercent = "CurrentAmountPercent", e.CurrentAmountRemainingAmount = "CurrentAmountRemainingAmount", e.CurrentAmountRemainingAmountPercent = "CurrentAmountRemainingAmountPercent";
})(Si || (Si = {}));
var Et;
(function(e) {
  e.Streamelements = "Streamelements", e.Twitch = "Twitch", e.WidySol = "WidySol", e.WidyTon = "WidyTon", e.DonationAlerts = "DonationAlerts", e.StreamLabs = "StreamLabs", e.Donatello = "Donatello", e.Donatik = "Donatik", e.DonatePay = "DonatePay", e.Destream = "Destream", e.Tribute = "Tribute";
})(Et || (Et = {}));
var Qv;
(function(e) {
  e.Twitch = "Twitch";
})(Qv || (Qv = {}));
var Gv;
(function(e) {
  e.tip = "tip";
})(Gv || (Gv = {}));
var ot;
(function(e) {
  e.Donation = "Donation", e.Subscription = "Subscription", e.Follow = "Follow", e.Raid = "Raid", e.Redemption = "Redemption";
})(ot || (ot = {}));
var gp;
(function(e) {
  e.Donation = "Donation", e.TwitchSubscription = "TwitchSubscription", e.TwitchFollow = "TwitchFollow";
})(gp || (gp = {}));
var Eu;
(function(e) {
  e.Sol = "sol", e.Ton = "ton";
})(Eu || (Eu = {}));
var Yv;
(function(e) {
  e.Google = "Google", e.Edge = "Edge";
})(Yv || (Yv = {}));
var Jv;
(function(e) {
  e.Male = "Male", e.Female = "Edge";
})(Jv || (Jv = {}));
var Xv;
(function(e) {
  e.anus = "anus", e.make_love = "make_love", e.nipple = "nipple", e.penis = "penis", e.vagina = "vagina";
})(Xv || (Xv = {}));
var Hs;
(function(e) {
  e.Media = "Media", e.Auction = "Auction", e.Alert = "Alert";
})(Hs || (Hs = {}));
var Kn;
(function(e) {
  e.ImageAndAudio = "ImageAndAudio", e.Image = "Image", e.Audio = "Audio", e.Video = "Video";
})(Kn || (Kn = {}));
var Rf = { exports: {} }, Tf = {};
var Zv;
function kz() {
  if (Zv) return Tf;
  Zv = 1;
  var e = ju();
  function t(p, f) {
    return p === f && (p !== 0 || 1 / p === 1 / f) || p !== p && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, o = e.useSyncExternalStore, s = e.useRef, l = e.useEffect, u = e.useMemo, d = e.useDebugValue;
  return Tf.useSyncExternalStoreWithSelector = function(p, f, g, m, w) {
    var k = s(null);
    if (k.current === null) {
      var S = { hasValue: !1, value: null };
      k.current = S;
    } else S = k.current;
    k = u(
      function() {
        function x(E) {
          if (!$) {
            if ($ = !0, N = E, E = m(E), w !== void 0 && S.hasValue) {
              var M = S.value;
              if (w(M, E))
                return C = M;
            }
            return C = E;
          }
          if (M = C, r(N, E)) return M;
          var A = m(E);
          return w !== void 0 && w(M, A) ? (N = E, M) : (N = E, C = A);
        }
        var $ = !1, N, C, R = g === void 0 ? null : g;
        return [
          function() {
            return x(f());
          },
          R === null ? void 0 : function() {
            return x(R());
          }
        ];
      },
      [f, g, m, w]
    );
    var _ = o(p, k[0], k[1]);
    return l(
      function() {
        S.hasValue = !0, S.value = _;
      },
      [_]
    ), d(_), _;
  }, Tf;
}
var ew;
function Cz() {
  return ew || (ew = 1, Rf.exports = kz()), Rf.exports;
}
var Ez = Cz();
function M0(e) {
  e();
}
function Pz() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      M0(() => {
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
var tw = {
  notify() {
  },
  get: () => []
};
function Rz(e, t) {
  let r, o = tw, s = 0, l = !1;
  function u(_) {
    g();
    const x = o.subscribe(_);
    let $ = !1;
    return () => {
      $ || ($ = !0, x(), m());
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
    s++, r || (r = e.subscribe(p), o = Pz());
  }
  function m() {
    s--, r && s === 0 && (r(), r = void 0, o.clear(), o = tw);
  }
  function w() {
    l || (l = !0, g());
  }
  function k() {
    l && (l = !1, m());
  }
  const S = {
    addNestedSub: u,
    notifyNestedSubs: d,
    handleChangeWrapper: p,
    isSubscribed: f,
    trySubscribe: w,
    tryUnsubscribe: k,
    getListeners: () => o
  };
  return S;
}
var Tz = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", $z = /* @__PURE__ */ Tz(), Mz = () => typeof navigator < "u" && navigator.product === "ReactNative", Az = /* @__PURE__ */ Mz(), Iz = () => $z || Az ? b.useLayoutEffect : b.useEffect, Nz = /* @__PURE__ */ Iz();
function nw(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ns(e, t) {
  if (nw(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length) return !1;
  for (let s = 0; s < r.length; s++)
    if (!Object.prototype.hasOwnProperty.call(t, r[s]) || !nw(e[r[s]], t[r[s]]))
      return !1;
  return !0;
}
var Oz = /* @__PURE__ */ Symbol.for("react-redux-context"), Lz = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Dz() {
  if (!b.createContext) return {};
  const e = Lz[Oz] ??= /* @__PURE__ */ new Map();
  let t = e.get(b.createContext);
  return t || (t = b.createContext(
    null
  ), e.set(b.createContext, t)), t;
}
var Yr = /* @__PURE__ */ Dz();
function Fz(e) {
  const { children: t, context: r, serverState: o, store: s } = e, l = b.useMemo(() => {
    const p = Rz(s);
    return {
      store: s,
      subscription: p,
      getServerState: o ? () => o : void 0
    };
  }, [s, o]), u = b.useMemo(() => s.getState(), [s]);
  Nz(() => {
    const { subscription: p } = l;
    return p.onStateChange = p.notifyNestedSubs, p.trySubscribe(), u !== s.getState() && p.notifyNestedSubs(), () => {
      p.tryUnsubscribe(), p.onStateChange = void 0;
    };
  }, [l, u]);
  const d = r || Yr;
  return /* @__PURE__ */ b.createElement(d.Provider, { value: l }, t);
}
var jz = Fz;
function dh(e = Yr) {
  return function() {
    return b.useContext(e);
  };
}
var A0 = /* @__PURE__ */ dh();
function I0(e = Yr) {
  const t = e === Yr ? A0 : (
    // @ts-ignore
    dh(e)
  ), r = () => {
    const { store: o } = t();
    return o;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var N0 = /* @__PURE__ */ I0();
function zz(e = Yr) {
  const t = e === Yr ? N0 : I0(e), r = () => t().dispatch;
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var nc = /* @__PURE__ */ zz(), Bz = (e, t) => e === t;
function Wz(e = Yr) {
  const t = e === Yr ? A0 : dh(e), r = (o, s = {}) => {
    const { equalityFn: l = Bz } = typeof s == "function" ? { equalityFn: s } : s, u = t(), { store: d, subscription: p, getServerState: f } = u;
    b.useRef(!0);
    const g = b.useCallback(
      {
        [o.name](w) {
          return o(w);
        }
      }[o.name],
      [o]
    ), m = Ez.useSyncExternalStoreWithSelector(
      p.addNestedSub,
      d.getState,
      f || d.getState,
      g,
      l
    );
    return b.useDebugValue(m), m;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Nn = /* @__PURE__ */ Wz(), Uz = M0;
const O0 = b.createContext(null), Vz = ({
  children: e,
  context: t,
  eventsService: r
}) => /* @__PURE__ */ j.jsx(t.Provider, { value: r, children: e });
class Hz {
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
class fh extends Hz {
  constructor(t) {
    super(), this.url = t;
  }
  url;
  socket = null;
  reconnectTimer = null;
  statusListeners = /* @__PURE__ */ new Set();
  connected = !0;
  static RECONNECT_DELAY_MS = 1e3;
  connect() {
    this.isConnected() || (this.clearReconnectTimer(), this.initSocket());
  }
  disconnect() {
    this.clearReconnectTimer(), this.closeSocket(), this.emitStatus(!1);
  }
  send(t) {
    if (this.isConnected())
      try {
        this.socket.send(JSON.stringify(t));
      } catch (r) {
        console.error("[WebsocketEventsService] Failed to send message:", r);
      }
  }
  addStatusListener(t) {
    this.statusListeners.add(t);
  }
  removeStatusListener(t) {
    this.statusListeners.delete(t);
  }
  initSocket() {
    this.socket = new WebSocket(this.url), this.socket.onmessage = ({ data: t }) => this.handleMessage(t), this.socket.onopen = () => this.emitStatus(!0), this.socket.onclose = () => this.handleClose();
  }
  closeSocket() {
    this.socket && (this.socket.onclose = null, this.socket.close(), this.socket = null);
  }
  handleMessage(t) {
    try {
      const r = JSON.parse(t);
      this.notifySubscribers(r.event, r.data);
    } catch (r) {
      console.error("[WebsocketEventsService] Failed to parse message:", r);
    }
  }
  handleClose() {
    this.emitStatus(!1), this.scheduleReconnect();
  }
  emitStatus(t) {
    this.connected = t, this.statusListeners.forEach((r) => r(t));
  }
  scheduleReconnect() {
    this.reconnectTimer = setTimeout(
      () => this.connect(),
      fh.RECONNECT_DELAY_MS
    );
  }
  clearReconnectTimer() {
    this.reconnectTimer !== null && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
function Ct(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var qz = typeof Symbol == "function" && Symbol.observable || "@@observable", rw = qz, $f = () => Math.random().toString(36).substring(7).split("").join("."), Kz = {
  INIT: `@@redux/INIT${/* @__PURE__ */ $f()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ $f()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${$f()}`
}, Pu = Kz;
function Jr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function L0(e, t, r) {
  if (typeof e != "function")
    throw new Error(Ct(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(Ct(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(Ct(1));
    return r(L0)(e, t);
  }
  let o = e, s = t, l = /* @__PURE__ */ new Map(), u = l, d = 0, p = !1;
  function f() {
    u === l && (u = /* @__PURE__ */ new Map(), l.forEach((x, $) => {
      u.set($, x);
    }));
  }
  function g() {
    if (p)
      throw new Error(Ct(3));
    return s;
  }
  function m(x) {
    if (typeof x != "function")
      throw new Error(Ct(4));
    if (p)
      throw new Error(Ct(5));
    let $ = !0;
    f();
    const N = d++;
    return u.set(N, x), function() {
      if ($) {
        if (p)
          throw new Error(Ct(6));
        $ = !1, f(), u.delete(N), l = null;
      }
    };
  }
  function w(x) {
    if (!Jr(x))
      throw new Error(Ct(7));
    if (typeof x.type > "u")
      throw new Error(Ct(8));
    if (typeof x.type != "string")
      throw new Error(Ct(17));
    if (p)
      throw new Error(Ct(9));
    try {
      p = !0, s = o(s, x);
    } finally {
      p = !1;
    }
    return (l = u).forEach((N) => {
      N();
    }), x;
  }
  function k(x) {
    if (typeof x != "function")
      throw new Error(Ct(10));
    o = x, w({
      type: Pu.REPLACE
    });
  }
  function S() {
    const x = m;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe($) {
        if (typeof $ != "object" || $ === null)
          throw new Error(Ct(11));
        function N() {
          const R = $;
          R.next && R.next(g());
        }
        return N(), {
          unsubscribe: x(N)
        };
      },
      [rw]() {
        return this;
      }
    };
  }
  return w({
    type: Pu.INIT
  }), {
    dispatch: w,
    subscribe: m,
    getState: g,
    replaceReducer: k,
    [rw]: S
  };
}
function Qz(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Pu.INIT
    }) > "u")
      throw new Error(Ct(12));
    if (typeof r(void 0, {
      type: Pu.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(Ct(13));
  });
}
function ph(e) {
  const t = Object.keys(e), r = {};
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    typeof e[u] == "function" && (r[u] = e[u]);
  }
  const o = Object.keys(r);
  let s;
  try {
    Qz(r);
  } catch (l) {
    s = l;
  }
  return function(u = {}, d) {
    if (s)
      throw s;
    let p = !1;
    const f = {};
    for (let g = 0; g < o.length; g++) {
      const m = o[g], w = r[m], k = u[m], S = w(k, d);
      if (typeof S > "u")
        throw d && d.type, new Error(Ct(14));
      f[m] = S, p = p || S !== k;
    }
    return p = p || o.length !== Object.keys(u).length, p ? f : u;
  };
}
function Ru(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...o) => t(r(...o)));
}
function Gz(...e) {
  return (t) => (r, o) => {
    const s = t(r, o);
    let l = () => {
      throw new Error(Ct(15));
    };
    const u = {
      getState: s.getState,
      dispatch: (p, ...f) => l(p, ...f)
    }, d = e.map((p) => p(u));
    return l = Ru(...d)(s.dispatch), {
      ...s,
      dispatch: l
    };
  };
}
function D0(e) {
  return Jr(e) && "type" in e && typeof e.type == "string";
}
var hh = /* @__PURE__ */ Symbol.for("immer-nothing"), Os = /* @__PURE__ */ Symbol.for("immer-draftable"), St = /* @__PURE__ */ Symbol.for("immer-state");
function Tt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var on = Object, $i = on.getPrototypeOf, qs = "constructor", da = "prototype", mp = "configurable", Tu = "enumerable", lu = "writable", Ks = "value", un = (e) => !!e && !!e[St];
function cn(e) {
  return e ? F0(e) || pa(e) || !!e[Os] || !!e[qs]?.[Os] || ha(e) || ga(e) : !1;
}
var Yz = on[da][qs].toString(), iw = /* @__PURE__ */ new WeakMap();
function F0(e) {
  if (!e || !vo(e))
    return !1;
  const t = $i(e);
  if (t === null || t === on[da])
    return !0;
  const r = on.hasOwnProperty.call(t, qs) && t[qs];
  if (r === Object)
    return !0;
  if (!bi(r))
    return !1;
  let o = iw.get(r);
  return o === void 0 && (o = Function.toString.call(r), iw.set(r, o)), o === Yz;
}
function Jz(e) {
  return un(e) || Tt(15, e), e[St].base_;
}
function fa(e, t, r = !0) {
  Mi(e) === 0 ? (r ? Reflect.ownKeys(e) : on.keys(e)).forEach((s) => {
    t(s, e[s], e);
  }) : e.forEach((o, s) => t(s, o, e));
}
function Mi(e) {
  const t = e[St];
  return t ? t.type_ : pa(e) ? 1 : ha(e) ? 2 : ga(e) ? 3 : 0;
}
var Ls = (e, t, r = Mi(e)) => r === 2 ? e.has(t) : on[da].hasOwnProperty.call(e, t), gr = (e, t, r = Mi(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), $u = (e, t, r, o = Mi(e)) => {
  o === 2 ? e.set(t, r) : o === 3 ? e.add(r) : e[t] = r;
};
function Xz(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var pa = Array.isArray, ha = (e) => e instanceof Map, ga = (e) => e instanceof Set, vo = (e) => typeof e == "object", bi = (e) => typeof e == "function", Mf = (e) => typeof e == "boolean";
function Zz(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var e5 = (e) => vo(e) ? e?.[St] : null, mr = (e) => e.copy_ || e.base_, gh = (e) => e.modified_ ? e.copy_ : e.base_;
function yp(e, t) {
  if (ha(e))
    return new Map(e);
  if (ga(e))
    return new Set(e);
  if (pa(e))
    return Array[da].slice.call(e);
  const r = F0(e);
  if (t === !0 || t === "class_only" && !r) {
    const o = on.getOwnPropertyDescriptors(e);
    delete o[St];
    let s = Reflect.ownKeys(o);
    for (let l = 0; l < s.length; l++) {
      const u = s[l], d = o[u];
      d[lu] === !1 && (d[lu] = !0, d[mp] = !0), (d.get || d.set) && (o[u] = {
        [mp]: !0,
        [lu]: !0,
        // could live with !!desc.set as well here...
        [Tu]: d[Tu],
        [Ks]: e[u]
      });
    }
    return on.create($i(e), o);
  } else {
    const o = $i(e);
    if (o !== null && r)
      return { ...e };
    const s = on.create(o);
    return on.assign(s, e);
  }
}
function mh(e, t = !1) {
  return rc(e) || un(e) || !cn(e) || (Mi(e) > 1 && on.defineProperties(e, {
    set: Fl,
    add: Fl,
    clear: Fl,
    delete: Fl
  }), on.freeze(e), t && fa(
    e,
    (r, o) => {
      mh(o, !0);
    },
    !1
  )), e;
}
function t5() {
  Tt(2);
}
var Fl = {
  [Ks]: t5
};
function rc(e) {
  return e === null || !vo(e) ? !0 : on.isFrozen(e);
}
var Mu = "MapSet", Au = "Patches", ow = "ArrayMethods", Iu = {};
function Ai(e) {
  const t = Iu[e];
  return t || Tt(0, e), t;
}
var sw = (e) => !!Iu[e];
function n5(e, t) {
  Iu[e] || (Iu[e] = t);
}
var Qs, j0 = () => Qs, r5 = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: sw(Mu) ? Ai(Mu) : void 0,
  arrayMethodsPlugin_: sw(ow) ? Ai(ow) : void 0
});
function aw(e, t) {
  t && (e.patchPlugin_ = Ai(Au), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function vp(e) {
  wp(e), e.drafts_.forEach(i5), e.drafts_ = null;
}
function wp(e) {
  e === Qs && (Qs = e.parent_);
}
var lw = (e) => Qs = r5(Qs, e);
function i5(e) {
  const t = e[St];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function uw(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[St].modified_ && (vp(t), Tt(4)), cn(e) && (e = cw(t, e));
    const { patchPlugin_: s } = t;
    s && s.generateReplacementPatches_(
      r[St].base_,
      e,
      t
    );
  } else
    e = cw(t, r);
  return o5(t, e, !0), vp(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== hh ? e : void 0;
}
function cw(e, t) {
  if (rc(t))
    return t;
  const r = t[St];
  if (!r)
    return Nu(t, e.handledSet_, e);
  if (!ic(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: o } = r;
    if (o)
      for (; o.length > 0; )
        o.pop()(e);
    W0(r, e);
  }
  return r.copy_;
}
function o5(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && mh(t, r);
}
function z0(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var ic = (e, t) => e.scope_ === t, s5 = [];
function B0(e, t, r, o) {
  const s = mr(e), l = e.type_;
  if (o !== void 0 && gr(s, o, l) === t) {
    $u(s, o, r, l);
    return;
  }
  if (!e.draftLocations_) {
    const d = e.draftLocations_ = /* @__PURE__ */ new Map();
    fa(s, (p, f) => {
      if (un(f)) {
        const g = d.get(f) || [];
        g.push(p), d.set(f, g);
      }
    });
  }
  const u = e.draftLocations_.get(t) ?? s5;
  for (const d of u)
    $u(s, d, r, l);
}
function a5(e, t, r) {
  e.callbacks_.push(function(s) {
    const l = t;
    if (!l || !ic(l, s))
      return;
    s.mapSetPlugin_?.fixSetContents(l);
    const u = gh(l);
    B0(e, l.draft_ ?? l, u, r), W0(l, s);
  });
}
function W0(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: o } = t;
    if (o) {
      const s = o.getPath(e);
      s && o.generatePatches_(e, s, t);
    }
    z0(e);
  }
}
function l5(e, t, r) {
  const { scope_: o } = e;
  if (un(r)) {
    const s = r[St];
    ic(s, o) && s.callbacks_.push(function() {
      uu(e);
      const u = gh(s);
      B0(e, r, u, t);
    });
  } else cn(r) && e.callbacks_.push(function() {
    const l = mr(e);
    e.type_ === 3 ? l.has(r) && Nu(r, o.handledSet_, o) : gr(l, t, e.type_) === r && o.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && Nu(
      gr(e.copy_, t, e.type_),
      o.handledSet_,
      o
    );
  });
}
function Nu(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || un(e) || t.has(e) || !cn(e) || rc(e) || (t.add(e), fa(e, (o, s) => {
    if (un(s)) {
      const l = s[St];
      if (ic(l, r)) {
        const u = gh(l);
        $u(e, o, u, e.type_), z0(l);
      }
    } else cn(s) && Nu(s, t, r);
  })), e;
}
function u5(e, t) {
  const r = pa(e), o = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : j0(),
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
  let s = o, l = Ou;
  r && (s = [o], l = Gs);
  const { revoke: u, proxy: d } = Proxy.revocable(s, l);
  return o.draft_ = d, o.revoke_ = u, [d, o];
}
var Ou = {
  get(e, t) {
    if (t === St)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const o = e.type_ === 1 && typeof t == "string";
    if (o && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const s = mr(e);
    if (!Ls(s, t, e.type_))
      return c5(e, s, t);
    const l = s[t];
    if (e.finalized_ || !cn(l) || o && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && Zz(t))
      return l;
    if (l === Af(e.base_, t)) {
      uu(e);
      const u = e.type_ === 1 ? +t : t, d = bp(e.scope_, l, e, u);
      return e.copy_[u] = d;
    }
    return l;
  },
  has(e, t) {
    return t in mr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(mr(e));
  },
  set(e, t, r) {
    const o = U0(mr(e), t);
    if (o?.set)
      return o.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const s = Af(mr(e), t), l = s?.[St];
      if (l && l.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (Xz(r, s) && (r !== void 0 || Ls(e.base_, t, e.type_)))
        return !0;
      uu(e), Sp(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), l5(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return uu(e), Af(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), Sp(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = mr(e), o = Reflect.getOwnPropertyDescriptor(r, t);
    return o && {
      [lu]: !0,
      [mp]: e.type_ !== 1 || t !== "length",
      [Tu]: o[Tu],
      [Ks]: r[t]
    };
  },
  defineProperty() {
    Tt(11);
  },
  getPrototypeOf(e) {
    return $i(e.base_);
  },
  setPrototypeOf() {
    Tt(12);
  }
}, Gs = {};
for (let e in Ou) {
  let t = Ou[e];
  Gs[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Gs.deleteProperty = function(e, t) {
  return Gs.set.call(this, e, t, void 0);
};
Gs.set = function(e, t, r) {
  return Ou.set.call(this, e[0], t, r, e[0]);
};
function Af(e, t) {
  const r = e[St];
  return (r ? mr(r) : e)[t];
}
function c5(e, t, r) {
  const o = U0(t, r);
  return o ? Ks in o ? o[Ks] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    o.get?.call(e.draft_)
  ) : void 0;
}
function U0(e, t) {
  if (!(t in e))
    return;
  let r = $i(e);
  for (; r; ) {
    const o = Object.getOwnPropertyDescriptor(r, t);
    if (o)
      return o;
    r = $i(r);
  }
}
function Sp(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Sp(e.parent_));
}
function uu(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = yp(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var d5 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (t, r, o) => {
      if (bi(t) && !bi(r)) {
        const l = r;
        r = t;
        const u = this;
        return function(p = l, ...f) {
          return u.produce(p, (g) => r.call(this, g, ...f));
        };
      }
      bi(r) || Tt(6), o !== void 0 && !bi(o) && Tt(7);
      let s;
      if (cn(t)) {
        const l = lw(this), u = bp(l, t, void 0);
        let d = !0;
        try {
          s = r(u), d = !1;
        } finally {
          d ? vp(l) : wp(l);
        }
        return aw(l, o), uw(s, l);
      } else if (!t || !vo(t)) {
        if (s = r(t), s === void 0 && (s = t), s === hh && (s = void 0), this.autoFreeze_ && mh(s, !0), o) {
          const l = [], u = [];
          Ai(Au).generateReplacementPatches_(t, s, {
            patches_: l,
            inversePatches_: u
          }), o(l, u);
        }
        return s;
      } else
        Tt(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (bi(t))
        return (u, ...d) => this.produceWithPatches(u, (p) => t(p, ...d));
      let o, s;
      return [this.produce(t, r, (u, d) => {
        o = u, s = d;
      }), o, s];
    }, Mf(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), Mf(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), Mf(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    cn(e) || Tt(8), un(e) && (e = V0(e));
    const t = lw(this), r = bp(t, e, void 0);
    return r[St].isManual_ = !0, wp(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[St];
    (!r || !r.isManual_) && Tt(9);
    const { scope_: o } = r;
    return aw(o, t), uw(void 0, o);
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
    const o = Ai(Au).applyPatches_;
    return un(e) ? o(e, t) : this.produce(
      e,
      (s) => o(s, t)
    );
  }
};
function bp(e, t, r, o) {
  const [s, l] = ha(t) ? Ai(Mu).proxyMap_(t, r) : ga(t) ? Ai(Mu).proxySet_(t, r) : u5(t, r);
  return (r?.scope_ ?? j0()).drafts_.push(s), l.callbacks_ = r?.callbacks_ ?? [], l.key_ = o, r && o !== void 0 ? a5(r, l, o) : l.callbacks_.push(function(p) {
    p.mapSetPlugin_?.fixSetContents(l);
    const { patchPlugin_: f } = p;
    l.modified_ && f && f.generatePatches_(l, [], p);
  }), s;
}
function V0(e) {
  return un(e) || Tt(10, e), H0(e);
}
function H0(e) {
  if (!cn(e) || rc(e))
    return e;
  const t = e[St];
  let r, o = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = yp(e, t.scope_.immer_.useStrictShallowCopy_), o = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = yp(e, !0);
  return fa(
    r,
    (s, l) => {
      $u(r, s, H0(l));
    },
    o
  ), t && (t.finalized_ = !1), r;
}
function f5() {
  function t(S, _ = []) {
    if (S.key_ !== void 0) {
      const x = S.parent_.copy_ ?? S.parent_.base_, $ = e5(gr(x, S.key_)), N = gr(x, S.key_);
      if (N === void 0 || N !== S.draft_ && N !== S.base_ && N !== S.copy_ || $ != null && $.base_ !== S.base_)
        return null;
      const C = S.parent_.type_ === 3;
      let R;
      if (C) {
        const E = S.parent_;
        R = Array.from(E.drafts_.keys()).indexOf(S.key_);
      } else
        R = S.key_;
      if (!(C && x.size > R || Ls(x, R)))
        return null;
      _.push(R);
    }
    if (S.parent_)
      return t(S.parent_, _);
    _.reverse();
    try {
      r(S.copy_, _);
    } catch {
      return null;
    }
    return _;
  }
  function r(S, _) {
    let x = S;
    for (let $ = 0; $ < _.length - 1; $++) {
      const N = _[$];
      if (x = gr(x, N), !vo(x) || x === null)
        throw new Error(`Cannot resolve path at '${_.join("/")}'`);
    }
    return x;
  }
  const o = "replace", s = "add", l = "remove";
  function u(S, _, x) {
    if (S.scope_.processedForPatches_.has(S))
      return;
    S.scope_.processedForPatches_.add(S);
    const { patches_: $, inversePatches_: N } = x;
    switch (S.type_) {
      case 0:
      case 2:
        return p(
          S,
          _,
          $,
          N
        );
      case 1:
        return d(
          S,
          _,
          $,
          N
        );
      case 3:
        return f(
          S,
          _,
          $,
          N
        );
    }
  }
  function d(S, _, x, $) {
    let { base_: N, assigned_: C } = S, R = S.copy_;
    R.length < N.length && ([N, R] = [R, N], [x, $] = [$, x]);
    const E = S.allIndicesReassigned_ === !0;
    for (let M = 0; M < N.length; M++) {
      const A = R[M], I = N[M];
      if ((E || C?.get(M.toString())) && A !== I) {
        const v = A?.[St];
        if (v && v.modified_)
          continue;
        const P = _.concat([M]);
        x.push({
          op: o,
          path: P,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: k(A)
        }), $.push({
          op: o,
          path: P,
          value: k(I)
        });
      }
    }
    for (let M = N.length; M < R.length; M++) {
      const A = _.concat([M]);
      x.push({
        op: s,
        path: A,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: k(R[M])
      });
    }
    for (let M = R.length - 1; N.length <= M; --M) {
      const A = _.concat([M]);
      $.push({
        op: l,
        path: A
      });
    }
  }
  function p(S, _, x, $) {
    const { base_: N, copy_: C, type_: R } = S;
    fa(S.assigned_, (E, M) => {
      const A = gr(N, E, R), I = gr(C, E, R), L = M ? Ls(N, E) ? o : s : l;
      if (A === I && L === o)
        return;
      const v = _.concat(E);
      x.push(
        L === l ? { op: L, path: v } : { op: L, path: v, value: k(I) }
      ), $.push(
        L === s ? { op: l, path: v } : L === l ? { op: s, path: v, value: k(A) } : { op: o, path: v, value: k(A) }
      );
    });
  }
  function f(S, _, x, $) {
    let { base_: N, copy_: C } = S, R = 0;
    N.forEach((E) => {
      if (!C.has(E)) {
        const M = _.concat([R]);
        x.push({
          op: l,
          path: M,
          value: E
        }), $.unshift({
          op: s,
          path: M,
          value: E
        });
      }
      R++;
    }), R = 0, C.forEach((E) => {
      if (!N.has(E)) {
        const M = _.concat([R]);
        x.push({
          op: s,
          path: M,
          value: E
        }), $.unshift({
          op: l,
          path: M,
          value: E
        });
      }
      R++;
    });
  }
  function g(S, _, x) {
    const { patches_: $, inversePatches_: N } = x;
    $.push({
      op: o,
      path: [],
      value: _ === hh ? void 0 : _
    }), N.push({
      op: o,
      path: [],
      value: S
    });
  }
  function m(S, _) {
    return _.forEach((x) => {
      const { path: $, op: N } = x;
      let C = S;
      for (let A = 0; A < $.length - 1; A++) {
        const I = Mi(C);
        let L = $[A];
        typeof L != "string" && typeof L != "number" && (L = "" + L), (I === 0 || I === 1) && (L === "__proto__" || L === qs) && Tt(19), bi(C) && L === da && Tt(19), C = gr(C, L), vo(C) || Tt(18, $.join("/"));
      }
      const R = Mi(C), E = w(x.value), M = $[$.length - 1];
      switch (N) {
        case o:
          switch (R) {
            case 2:
              return C.set(M, E);
            case 3:
              Tt(16);
            default:
              return C[M] = E;
          }
        case s:
          switch (R) {
            case 1:
              return M === "-" ? C.push(E) : C.splice(M, 0, E);
            case 2:
              return C.set(M, E);
            case 3:
              return C.add(E);
            default:
              return C[M] = E;
          }
        case l:
          switch (R) {
            case 1:
              return C.splice(M, 1);
            case 2:
              return C.delete(M);
            case 3:
              return C.delete(x.value);
            default:
              return delete C[M];
          }
        default:
          Tt(17, N);
      }
    }), S;
  }
  function w(S) {
    if (!cn(S))
      return S;
    if (pa(S))
      return S.map(w);
    if (ha(S))
      return new Map(
        Array.from(S.entries()).map(([x, $]) => [x, w($)])
      );
    if (ga(S))
      return new Set(Array.from(S).map(w));
    const _ = Object.create($i(S));
    for (const x in S)
      _[x] = w(S[x]);
    return Ls(S, Os) && (_[Os] = S[Os]), _;
  }
  function k(S) {
    return un(S) ? w(S) : S;
  }
  n5(Au, {
    applyPatches_: m,
    generatePatches_: u,
    generateReplacementPatches_: g,
    getPath: t
  });
}
var Ys = new d5(), ma = Ys.produce, q0 = /* @__PURE__ */ Ys.produceWithPatches.bind(
  Ys
), dw = /* @__PURE__ */ Ys.applyPatches.bind(Ys);
function p5(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function h5(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function g5(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var fw = (e) => Array.isArray(e) ? e : [e];
function m5(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return g5(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function y5(e, t) {
  const r = [], { length: o } = e;
  for (let s = 0; s < o; s++)
    r.push(e[s].apply(null, t));
  return r;
}
var v5 = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, w5 = typeof WeakRef < "u" ? WeakRef : v5, S5 = 0, pw = 1;
function jl() {
  return {
    s: S5,
    v: void 0,
    o: null,
    p: null
  };
}
function Lu(e, t = {}) {
  let r = jl();
  const { resultEqualityCheck: o } = t;
  let s, l = 0;
  function u() {
    let d = r;
    const { length: p } = arguments;
    for (let m = 0, w = p; m < w; m++) {
      const k = arguments[m];
      if (typeof k == "function" || typeof k == "object" && k !== null) {
        let S = d.o;
        S === null && (d.o = S = /* @__PURE__ */ new WeakMap());
        const _ = S.get(k);
        _ === void 0 ? (d = jl(), S.set(k, d)) : d = _;
      } else {
        let S = d.p;
        S === null && (d.p = S = /* @__PURE__ */ new Map());
        const _ = S.get(k);
        _ === void 0 ? (d = jl(), S.set(k, d)) : d = _;
      }
    }
    const f = d;
    let g;
    if (d.s === pw)
      g = d.v;
    else if (g = e.apply(null, arguments), l++, o) {
      const m = s?.deref?.() ?? s;
      m != null && o(m, g) && (g = m, l !== 0 && l--), s = typeof g == "object" && g !== null || typeof g == "function" ? new w5(g) : g;
    }
    return f.s = pw, f.v = g, g;
  }
  return u.clearCache = () => {
    r = jl(), u.resetResultsCount();
  }, u.resultsCount = () => l, u.resetResultsCount = () => {
    l = 0;
  }, u;
}
function b5(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...s) => {
    let l = 0, u = 0, d, p = {}, f = s.pop();
    typeof f == "object" && (p = f, f = s.pop()), p5(
      f,
      `createSelector expects an output function after the inputs, but received: [${typeof f}]`
    );
    const g = {
      ...r,
      ...p
    }, {
      memoize: m,
      memoizeOptions: w = [],
      argsMemoize: k = Lu,
      argsMemoizeOptions: S = []
    } = g, _ = fw(w), x = fw(S), $ = m5(s), N = m(function() {
      return l++, f.apply(
        null,
        arguments
      );
    }, ..._), C = k(function() {
      u++;
      const E = y5(
        $,
        arguments
      );
      return d = N.apply(null, E), d;
    }, ...x);
    return Object.assign(C, {
      resultFunc: f,
      memoizedResultFunc: N,
      dependencies: $,
      dependencyRecomputations: () => u,
      resetDependencyRecomputations: () => {
        u = 0;
      },
      lastResult: () => d,
      recomputations: () => l,
      resetRecomputations: () => {
        l = 0;
      },
      memoize: m,
      argsMemoize: k
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var yh = /* @__PURE__ */ b5(Lu), _5 = Object.assign(
  (e, t = yh) => {
    h5(
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
  { withTypes: () => _5 }
);
function K0(e) {
  return ({ dispatch: r, getState: o }) => (s) => (l) => typeof l == "function" ? l(r, o, e) : s(l);
}
var x5 = K0(), k5 = K0, C5 = { NODE_ENV: "production" }, E5 = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Ru : Ru.apply(null, arguments);
}, P5 = (e) => e && typeof e.match == "function";
function On(e, t) {
  function r(...o) {
    if (t) {
      let s = t(...o);
      if (!s)
        throw new Error(Sn(0));
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
  return r.toString = () => `${e}`, r.type = e, r.match = (o) => D0(o) && o.type === e, r;
}
var Q0 = class Es extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Es.prototype);
  }
  static get [Symbol.species]() {
    return Es;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Es(...t[0].concat(this)) : new Es(...t.concat(this));
  }
};
function hw(e) {
  return cn(e) ? ma(e, () => {
  }) : e;
}
function zl(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function R5(e) {
  return typeof e == "boolean";
}
var T5 = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: o = !0,
    serializableCheck: s = !0,
    actionCreatorCheck: l = !0
  } = t ?? {};
  let u = new Q0();
  return r && (R5(r) ? u.push(x5) : u.push(k5(r.extraArgument))), u;
}, oc = "RTK_autoBatch", ws = () => (e) => ({
  payload: e,
  meta: {
    [oc]: !0
  }
}), gw = (e) => (t) => {
  setTimeout(t, e);
}, $5 = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const o = t(...r);
  let s = !0, l = !1, u = !1;
  const d = /* @__PURE__ */ new Set(), p = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : gw(10)
  ) : e.type === "callback" ? e.queueNotification : gw(e.timeout), f = () => {
    u = !1, l && (l = !1, d.forEach((g) => g()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(g) {
      const m = () => s && g(), w = o.subscribe(m);
      return d.add(g), () => {
        w(), d.delete(g);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(g) {
      try {
        return s = !g?.meta?.[oc], l = !s, l && (u || (u = !0, p(f))), o.dispatch(g);
      } finally {
        s = !0;
      }
    }
  });
}, M5 = (e) => function(r) {
  const {
    autoBatch: o = !0
  } = r ?? {};
  let s = new Q0(e);
  return o && s.push($5(typeof o == "object" ? o : void 0)), s;
};
function A5(e) {
  const t = T5(), {
    reducer: r = void 0,
    middleware: o,
    devTools: s = !0,
    preloadedState: l = void 0,
    enhancers: u = void 0
  } = e || {};
  let d;
  if (typeof r == "function")
    d = r;
  else if (Jr(r))
    d = ph(r);
  else
    throw new Error(Sn(1));
  let p;
  typeof o == "function" ? p = o(t) : p = t();
  let f = Ru;
  s && (f = E5({
    // Enable capture of stack traces for dispatched Redux actions
    trace: C5.NODE_ENV !== "production",
    ...typeof s == "object" && s
  }));
  const g = Gz(...p), m = M5(g);
  let w = typeof u == "function" ? u(m) : m();
  const k = f(...w);
  return L0(d, l, k);
}
function G0(e) {
  const t = {}, r = [];
  let o;
  const s = {
    addCase(l, u) {
      const d = typeof l == "string" ? l : l.type;
      if (!d)
        throw new Error(Sn(28));
      if (d in t)
        throw new Error(Sn(29));
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
function I5(e) {
  return typeof e == "function";
}
function N5(e, t) {
  let [r, o, s] = G0(t), l;
  if (I5(e))
    l = () => hw(e());
  else {
    const d = hw(e);
    l = () => d;
  }
  function u(d = l(), p) {
    let f = [r[p.type], ...o.filter(({
      matcher: g
    }) => g(p)).map(({
      reducer: g
    }) => g)];
    return f.filter((g) => !!g).length === 0 && (f = [s]), f.reduce((g, m) => {
      if (m)
        if (un(g)) {
          const k = m(g, p);
          return k === void 0 ? g : k;
        } else {
          if (cn(g))
            return ma(g, (w) => m(w, p));
          {
            const w = m(g, p);
            if (w === void 0) {
              if (g === null)
                return g;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return w;
          }
        }
      return g;
    }, d);
  }
  return u.getInitialState = l, u;
}
var Y0 = (e, t) => P5(e) ? e.match(t) : e(t);
function Sr(...e) {
  return (t) => e.some((r) => Y0(r, t));
}
function Ds(...e) {
  return (t) => e.every((r) => Y0(r, t));
}
function sc(e, t) {
  if (!e || !e.meta) return !1;
  const r = typeof e.meta.requestId == "string", o = t.indexOf(e.meta.requestStatus) > -1;
  return r && o;
}
function ya(e) {
  return typeof e[0] == "function" && "pending" in e[0] && "fulfilled" in e[0] && "rejected" in e[0];
}
function vh(...e) {
  return e.length === 0 ? (t) => sc(t, ["pending"]) : ya(e) ? Sr(...e.map((t) => t.pending)) : vh()(e[0]);
}
function wo(...e) {
  return e.length === 0 ? (t) => sc(t, ["rejected"]) : ya(e) ? Sr(...e.map((t) => t.rejected)) : wo()(e[0]);
}
function ac(...e) {
  const t = (r) => r && r.meta && r.meta.rejectedWithValue;
  return e.length === 0 ? Ds(wo(...e), t) : ya(e) ? Ds(wo(...e), t) : ac()(e[0]);
}
function Xr(...e) {
  return e.length === 0 ? (t) => sc(t, ["fulfilled"]) : ya(e) ? Sr(...e.map((t) => t.fulfilled)) : Xr()(e[0]);
}
function _p(...e) {
  return e.length === 0 ? (t) => sc(t, ["pending", "fulfilled", "rejected"]) : ya(e) ? Sr(...e.flatMap((t) => [t.pending, t.rejected, t.fulfilled])) : _p()(e[0]);
}
var O5 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", wh = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += O5[Math.random() * 64 | 0];
  return t;
}, L5 = ["name", "message", "stack", "code"], If = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, mw = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, D5 = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const r of L5)
      typeof e[r] == "string" && (t[r] = e[r]);
    return t;
  }
  return {
    message: String(e)
  };
}, yw = "External signal was aborted", vw = /* @__PURE__ */ (() => {
  function e(t, r, o) {
    const s = On(t + "/fulfilled", (p, f, g, m) => ({
      payload: p,
      meta: {
        ...m || {},
        arg: g,
        requestId: f,
        requestStatus: "fulfilled"
      }
    })), l = On(t + "/pending", (p, f, g) => ({
      payload: void 0,
      meta: {
        ...g || {},
        arg: f,
        requestId: p,
        requestStatus: "pending"
      }
    })), u = On(t + "/rejected", (p, f, g, m, w) => ({
      payload: m,
      error: (o && o.serializeError || D5)(p || "Rejected"),
      meta: {
        ...w || {},
        arg: g,
        requestId: f,
        rejectedWithValue: !!m,
        requestStatus: "rejected",
        aborted: p?.name === "AbortError",
        condition: p?.name === "ConditionError"
      }
    }));
    function d(p, {
      signal: f
    } = {}) {
      return (g, m, w) => {
        const k = o?.idGenerator ? o.idGenerator(p) : wh(), S = new AbortController();
        let _, x;
        function $(C) {
          x = C, S.abort();
        }
        f && (f.aborted ? $(yw) : f.addEventListener("abort", () => $(yw), {
          once: !0
        }));
        const N = (async function() {
          let C;
          try {
            let E = o?.condition?.(p, {
              getState: m,
              extra: w
            });
            if (j5(E) && (E = await E), E === !1 || S.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const M = new Promise((A, I) => {
              _ = () => {
                I({
                  name: "AbortError",
                  message: x || "Aborted"
                });
              }, S.signal.addEventListener("abort", _, {
                once: !0
              });
            });
            g(l(k, p, o?.getPendingMeta?.({
              requestId: k,
              arg: p
            }, {
              getState: m,
              extra: w
            }))), C = await Promise.race([M, Promise.resolve(r(p, {
              dispatch: g,
              getState: m,
              extra: w,
              requestId: k,
              signal: S.signal,
              abort: $,
              rejectWithValue: (A, I) => new If(A, I),
              fulfillWithValue: (A, I) => new mw(A, I)
            })).then((A) => {
              if (A instanceof If)
                throw A;
              return A instanceof mw ? s(A.payload, k, p, A.meta) : s(A, k, p);
            })]);
          } catch (E) {
            C = E instanceof If ? u(null, k, p, E.payload, E.meta) : u(E, k, p);
          } finally {
            _ && S.signal.removeEventListener("abort", _);
          }
          return o && !o.dispatchConditionRejection && u.match(C) && C.meta.condition || g(C), C;
        })();
        return Object.assign(N, {
          abort: $,
          requestId: k,
          arg: p,
          unwrap() {
            return N.then(F5);
          }
        });
      };
    }
    return Object.assign(d, {
      pending: l,
      rejected: u,
      fulfilled: s,
      settled: Sr(u, s),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function F5(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function j5(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var z5 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function B5(e, t) {
  return `${e}/${t}`;
}
function W5({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[z5];
  return function(o) {
    const {
      name: s,
      reducerPath: l = s
    } = o;
    if (!s)
      throw new Error(Sn(11));
    const u = (typeof o.reducers == "function" ? o.reducers(V5()) : o.reducers) || {}, d = Object.keys(u), p = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, f = {
      addCase(C, R) {
        const E = typeof C == "string" ? C : C.type;
        if (!E)
          throw new Error(Sn(12));
        if (E in p.sliceCaseReducersByType)
          throw new Error(Sn(13));
        return p.sliceCaseReducersByType[E] = R, f;
      },
      addMatcher(C, R) {
        return p.sliceMatchers.push({
          matcher: C,
          reducer: R
        }), f;
      },
      exposeAction(C, R) {
        return p.actionCreators[C] = R, f;
      },
      exposeCaseReducer(C, R) {
        return p.sliceCaseReducersByName[C] = R, f;
      }
    };
    d.forEach((C) => {
      const R = u[C], E = {
        reducerName: C,
        type: B5(s, C),
        createNotation: typeof o.reducers == "function"
      };
      q5(R) ? Q5(E, R, f, t) : H5(E, R, f);
    });
    function g() {
      const [C = {}, R = [], E = void 0] = typeof o.extraReducers == "function" ? G0(o.extraReducers) : [o.extraReducers], M = {
        ...C,
        ...p.sliceCaseReducersByType
      };
      return N5(o.initialState, (A) => {
        for (let I in M)
          A.addCase(I, M[I]);
        for (let I of p.sliceMatchers)
          A.addMatcher(I.matcher, I.reducer);
        for (let I of R)
          A.addMatcher(I.matcher, I.reducer);
        E && A.addDefaultCase(E);
      });
    }
    const m = (C) => C, w = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new WeakMap();
    let S;
    function _(C, R) {
      return S || (S = g()), S(C, R);
    }
    function x() {
      return S || (S = g()), S.getInitialState();
    }
    function $(C, R = !1) {
      function E(A) {
        let I = A[C];
        return typeof I > "u" && R && (I = zl(k, E, x)), I;
      }
      function M(A = m) {
        const I = zl(w, R, () => /* @__PURE__ */ new WeakMap());
        return zl(I, A, () => {
          const L = {};
          for (const [v, P] of Object.entries(o.selectors ?? {}))
            L[v] = U5(P, A, () => zl(k, A, x), R);
          return L;
        });
      }
      return {
        reducerPath: C,
        getSelectors: M,
        get selectors() {
          return M(E);
        },
        selectSlice: E
      };
    }
    const N = {
      name: s,
      reducer: _,
      actions: p.actionCreators,
      caseReducers: p.sliceCaseReducersByName,
      getInitialState: x,
      ...$(l),
      injectInto(C, {
        reducerPath: R,
        ...E
      } = {}) {
        const M = R ?? l;
        return C.inject({
          reducerPath: M,
          reducer: _
        }, E), {
          ...N,
          ...$(M, !0)
        };
      }
    };
    return N;
  };
}
function U5(e, t, r, o) {
  function s(l, ...u) {
    let d = t(l);
    return typeof d > "u" && o && (d = r()), e(d, ...u);
  }
  return s.unwrapped = e, s;
}
var An = /* @__PURE__ */ W5();
function V5() {
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
function H5({
  type: e,
  reducerName: t,
  createNotation: r
}, o, s) {
  let l, u;
  if ("reducer" in o) {
    if (r && !K5(o))
      throw new Error(Sn(17));
    l = o.reducer, u = o.prepare;
  } else
    l = o;
  s.addCase(e, l).exposeCaseReducer(t, l).exposeAction(t, u ? On(e, u) : On(e));
}
function q5(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function K5(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Q5({
  type: e,
  reducerName: t
}, r, o, s) {
  if (!s)
    throw new Error(Sn(18));
  const {
    payloadCreator: l,
    fulfilled: u,
    pending: d,
    rejected: p,
    settled: f,
    options: g
  } = r, m = s(e, l, g);
  o.exposeAction(t, m), u && o.addCase(m.fulfilled, u), d && o.addCase(m.pending, d), p && o.addCase(m.rejected, p), f && o.addMatcher(m.settled, f), o.exposeCaseReducer(t, {
    fulfilled: u || Bl,
    pending: d || Bl,
    rejected: p || Bl,
    settled: f || Bl
  });
}
function Bl() {
}
function Sn(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const G5 = {
  alert: null,
  playingAlertId: ""
}, J0 = An({
  name: "alerts",
  initialState: G5,
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
}), { setAlert: AB, setTitleStyle: IB, setMessageStyle: NB, setPlayingAlertId: X0 } = J0.actions, Y5 = {
  mediaSettings: null,
  playingMediaId: "",
  pausedMediaId: ""
}, Z0 = An({
  name: "media",
  initialState: Y5,
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
  setMediaSettings: OB,
  setYoutubeSettings: LB,
  setTwitchSettings: DB,
  setTikTokSettings: FB,
  setPlayingMediaId: eb,
  setPausedMediaId: Sh
} = Z0.actions;
var J5 = class extends Error {
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
}, X5 = { NODE_ENV: "production" }, tb = /* @__PURE__ */ ((e) => (e.uninitialized = "uninitialized", e.pending = "pending", e.fulfilled = "fulfilled", e.rejected = "rejected", e))(tb || {}), br = "uninitialized", xp = "pending", Ps = "fulfilled", Rs = "rejected";
function ww(e) {
  return {
    status: e,
    isUninitialized: e === br,
    isLoading: e === xp,
    isSuccess: e === Ps,
    isError: e === Rs
  };
}
var Sw = Jr;
function bh(e, t) {
  if (e === t || !(Sw(e) && Sw(t) || Array.isArray(e) && Array.isArray(t)))
    return t;
  const r = Object.keys(t), o = Object.keys(e);
  let s = r.length === o.length;
  const l = Array.isArray(t) ? [] : {};
  for (const u of r)
    l[u] = bh(e[u], t[u]), s && (s = e[u] === l[u]);
  return s ? e : l;
}
function kp(e, t, r) {
  return e.reduce((o, s, l) => (t(s, l) && o.push(r(s, l)), o), []).flat();
}
function Z5(e) {
  return new RegExp("(^|:)//").test(e);
}
function e3() {
  return typeof document > "u" ? !0 : document.visibilityState !== "hidden";
}
function _h(e) {
  return e != null;
}
function bw(e) {
  return [...e?.values() ?? []].filter(_h);
}
function t3() {
  return typeof navigator > "u" || navigator.onLine === void 0 ? !0 : navigator.onLine;
}
var n3 = (e) => e.replace(/\/$/, ""), r3 = (e) => e.replace(/^\//, "");
function i3(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  if (Z5(t))
    return t;
  const r = e.endsWith("/") || !t.startsWith("?") ? "/" : "";
  return e = n3(e), t = r3(t), `${e}${r}${t}`;
}
function Du(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
var Cp = () => /* @__PURE__ */ new Map(), o3 = (e) => {
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
}, s3 = (...e) => {
  for (const r of e) if (r.aborted) return AbortSignal.abort(r.reason);
  const t = new AbortController();
  for (const r of e)
    r.addEventListener("abort", () => t.abort(r.reason), {
      signal: t.signal,
      once: !0
    });
  return t.signal;
}, _w = (...e) => fetch(...e), a3 = (e) => e.status >= 200 && e.status <= 299, l3 = (e) => (
  /*applicat*/
  /ion\/(vnd\.api\+)?json/.test(e.get("content-type") || "")
);
function xw(e) {
  if (!Jr(e))
    return e;
  const t = {
    ...e
  };
  for (const [r, o] of Object.entries(t))
    o === void 0 && delete t[r];
  return t;
}
var u3 = (e) => typeof e == "object" && (Jr(e) || Array.isArray(e) || typeof e.toJSON == "function");
function c3({
  baseUrl: e,
  prepareHeaders: t = (m) => m,
  fetchFn: r = _w,
  paramsSerializer: o,
  isJsonContentType: s = l3,
  jsonContentType: l = "application/json",
  jsonReplacer: u,
  timeout: d,
  responseHandler: p,
  validateStatus: f,
  ...g
} = {}) {
  return typeof fetch > "u" && r === _w && console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."), async (w, k, S) => {
    const {
      getState: _,
      extra: x,
      endpoint: $,
      forced: N,
      type: C
    } = k;
    let R, {
      url: E,
      headers: M = new Headers(g.headers),
      params: A = void 0,
      responseHandler: I = p ?? "json",
      validateStatus: L = f ?? a3,
      timeout: v = d,
      ...P
    } = typeof w == "string" ? {
      url: w
    } : w, O = {
      ...g,
      signal: v ? s3(k.signal, o3(v)) : k.signal,
      ...P
    };
    M = new Headers(xw(M)), O.headers = await t(M, {
      getState: _,
      arg: w,
      extra: x,
      endpoint: $,
      forced: N,
      type: C,
      extraOptions: S
    }) || M;
    const F = u3(O.body);
    if (O.body != null && !F && typeof O.body != "string" && O.headers.delete("content-type"), !O.headers.has("content-type") && F && O.headers.set("content-type", l), F && s(O.headers) && (O.body = JSON.stringify(O.body, u)), O.headers.has("accept") || (I === "json" ? O.headers.set("accept", "application/json") : I === "text" && O.headers.set("accept", "text/plain, text/html, */*")), A) {
      const K = ~E.indexOf("?") ? "&" : "?", D = o ? o(A) : new URLSearchParams(xw(A));
      E += K + D;
    }
    E = i3(e, E);
    const B = new Request(E, O);
    R = {
      request: new Request(E, O)
    };
    let V;
    try {
      V = await r(B);
    } catch (K) {
      return {
        error: {
          status: (K instanceof Error || typeof DOMException < "u" && K instanceof DOMException) && K.name === "TimeoutError" ? "TIMEOUT_ERROR" : "FETCH_ERROR",
          error: String(K)
        },
        meta: R
      };
    }
    const G = V.clone();
    R.response = G;
    let U, H = "";
    try {
      let K;
      if (await Promise.all([
        m(V, I).then((D) => U = D, (D) => K = D),
        // see https://github.com/node-fetch/node-fetch/issues/665#issuecomment-538995182
        // we *have* to "use up" both streams at the same time or they will stop running in node-fetch scenarios
        G.text().then((D) => H = D, () => {
        })
      ]), K) throw K;
    } catch (K) {
      return {
        error: {
          status: "PARSING_ERROR",
          originalStatus: V.status,
          data: H,
          error: String(K)
        },
        meta: R
      };
    }
    return L(V, U) ? {
      data: U,
      meta: R
    } : {
      error: {
        status: V.status,
        data: U
      },
      meta: R
    };
  };
  async function m(w, k) {
    if (typeof k == "function")
      return k(w);
    if (k === "content-type" && (k = s(w.headers) ? "json" : "text"), k === "json") {
      const S = await w.text();
      return S.length ? JSON.parse(S) : null;
    }
    return w.text();
  }
}
var kw = class {
  constructor(e, t = void 0) {
    this.value = e, this.meta = t;
  }
}, lc = "__rtkq/", d3 = "online", f3 = "offline", nb = "focused", xh = /* @__PURE__ */ On(`${lc}${nb}`), rb = /* @__PURE__ */ On(`${lc}un${nb}`), kh = /* @__PURE__ */ On(`${lc}${d3}`), ib = /* @__PURE__ */ On(`${lc}${f3}`), va = "query", ob = "mutation", sb = "infinitequery";
function uc(e) {
  return e.type === va;
}
function p3(e) {
  return e.type === ob;
}
function cc(e) {
  return e.type === sb;
}
function Fu(e) {
  return uc(e) || cc(e);
}
function Ch(e, t, r, o, s, l) {
  const u = h3(e) ? e(t, r, o, s) : e;
  return u ? kp(u, _h, (d) => l(ab(d))) : [];
}
function h3(e) {
  return typeof e == "function";
}
function ab(e) {
  return typeof e == "string" ? {
    type: e
  } : e;
}
function g3(e, t) {
  return e.catch(t);
}
var So = (e, t) => e.endpointDefinitions[t], Js = /* @__PURE__ */ Symbol("forceQueryFn"), Ep = (e) => typeof e[Js] == "function";
function m3({
  serializeQueryArgs: e,
  queryThunk: t,
  infiniteQueryThunk: r,
  mutationThunk: o,
  api: s,
  context: l,
  getInternalState: u
}) {
  const d = (R) => u(R)?.runningQueries, p = (R) => u(R)?.runningMutations, {
    unsubscribeQueryResult: f,
    removeMutationResult: g,
    updateSubscriptionOptions: m
  } = s.internalActions;
  return {
    buildInitiateQuery: $,
    buildInitiateInfiniteQuery: N,
    buildInitiateMutation: C,
    getRunningQueryThunk: w,
    getRunningMutationThunk: k,
    getRunningQueriesThunk: S,
    getRunningMutationsThunk: _
  };
  function w(R, E) {
    return (M) => {
      const A = So(l, R), I = e({
        queryArgs: E,
        endpointDefinition: A,
        endpointName: R
      });
      return d(M)?.get(I);
    };
  }
  function k(R, E) {
    return (M) => p(M)?.get(E);
  }
  function S() {
    return (R) => bw(d(R));
  }
  function _() {
    return (R) => bw(p(R));
  }
  function x(R, E) {
    const M = (A, {
      subscribe: I = !0,
      forceRefetch: L,
      subscriptionOptions: v,
      [Js]: P,
      ...O
    } = {}) => (F, B) => {
      const z = e({
        queryArgs: A,
        endpointDefinition: E,
        endpointName: R
      });
      let V;
      const G = {
        ...O,
        type: va,
        subscribe: I,
        forceRefetch: L,
        subscriptionOptions: v,
        endpointName: R,
        originalArgs: A,
        queryCacheKey: z,
        [Js]: P
      };
      if (uc(E))
        V = t(G);
      else {
        const {
          direction: de,
          initialPageParam: he,
          refetchCachedPages: fe
        } = O;
        V = r({
          ...G,
          // Supply these even if undefined. This helps with a field existence
          // check over in `buildSlice.ts`
          direction: de,
          initialPageParam: he,
          refetchCachedPages: fe
        });
      }
      const U = s.endpoints[R].select(A), H = F(V), K = U(B()), {
        requestId: D,
        abort: Y
      } = H, re = K.requestId !== D, te = d(F)?.get(z), se = () => U(B()), le = Object.assign(P ? (
        // a query has been forced (upsertQueryData)
        // -> we want to resolve it once data has been written with the data that will be written
        H.then(se)
      ) : re && !te ? (
        // a query has been skipped due to a condition and we do not have any currently running query
        // -> we want to resolve it immediately with the current data
        Promise.resolve(K)
      ) : (
        // query just started or one is already in flight
        // -> wait for the running query, then resolve with data from after that
        Promise.all([te, H]).then(se)
      ), {
        arg: A,
        requestId: D,
        subscriptionOptions: v,
        queryCacheKey: z,
        abort: Y,
        async unwrap() {
          const de = await le;
          if (de.isError)
            throw de.error;
          return de.data;
        },
        refetch: (de) => F(M(A, {
          subscribe: !1,
          forceRefetch: !0,
          ...de
        })),
        unsubscribe() {
          I && F(f({
            queryCacheKey: z,
            requestId: D
          }));
        },
        updateSubscriptionOptions(de) {
          le.subscriptionOptions = de, F(m({
            endpointName: R,
            requestId: D,
            queryCacheKey: z,
            options: de
          }));
        }
      });
      if (!te && !re && !P) {
        const de = d(F);
        de.set(z, le), le.then(() => {
          de.delete(z);
        });
      }
      return le;
    };
    return M;
  }
  function $(R, E) {
    return x(R, E);
  }
  function N(R, E) {
    return x(R, E);
  }
  function C(R) {
    return (E, {
      track: M = !0,
      fixedCacheKey: A
    } = {}) => (I, L) => {
      const v = o({
        type: "mutation",
        endpointName: R,
        originalArgs: E,
        track: M,
        fixedCacheKey: A
      }), P = I(v), {
        requestId: O,
        abort: F,
        unwrap: B
      } = P, z = g3(P.unwrap().then((H) => ({
        data: H
      })), (H) => ({
        error: H
      })), V = () => {
        I(g({
          requestId: O,
          fixedCacheKey: A
        }));
      }, G = Object.assign(z, {
        arg: P.arg,
        requestId: O,
        abort: F,
        unwrap: B,
        reset: V
      }), U = p(I);
      return U.set(O, G), G.then(() => {
        U.delete(O);
      }), A && (U.set(A, G), G.then(() => {
        U.get(A) === G && U.delete(A);
      })), G;
    };
  }
}
var lb = class extends J5 {
  constructor(e, t, r, o) {
    super(e), this.value = t, this.schemaName = r, this._bqMeta = o;
  }
}, gi = (e, t) => Array.isArray(e) ? e.includes(t) : !!e;
async function mi(e, t, r, o) {
  const s = await e["~standard"].validate(t);
  if (s.issues)
    throw new lb(s.issues, t, r, o);
  return s.value;
}
function Cw(e) {
  return e;
}
var Ss = (e = {}) => ({
  ...e,
  [oc]: !0
});
function y3({
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
  const g = (P, O, F, B) => (z, V) => {
    const G = r[P], U = o({
      queryArgs: O,
      endpointDefinition: G,
      endpointName: P
    });
    if (z(s.internalActions.queryResultPatched({
      queryCacheKey: U,
      patches: F
    })), !B)
      return;
    const H = s.endpoints[P].select(O)(
      // Work around TS 4.1 mismatch
      V()
    ), K = Ch(G.providesTags, H.data, void 0, O, {}, l);
    z(s.internalActions.updateProvidedBy([{
      queryCacheKey: U,
      providedTags: K
    }]));
  };
  function m(P, O, F = 0) {
    const B = [O, ...P];
    return F && B.length > F ? B.slice(0, -1) : B;
  }
  function w(P, O, F = 0) {
    const B = [...P, O];
    return F && B.length > F ? B.slice(1) : B;
  }
  const k = (P, O, F, B = !0) => (z, V) => {
    const U = s.endpoints[P].select(O)(
      // Work around TS 4.1 mismatch
      V()
    ), H = {
      patches: [],
      inversePatches: [],
      undo: () => z(s.util.patchQueryData(P, O, H.inversePatches, B))
    };
    if (U.status === br)
      return H;
    let K;
    if ("data" in U)
      if (cn(U.data)) {
        const [D, Y, re] = q0(U.data, F);
        H.patches.push(...Y), H.inversePatches.push(...re), K = D;
      } else
        K = F(U.data), H.patches.push({
          op: "replace",
          path: [],
          value: K
        }), H.inversePatches.push({
          op: "replace",
          path: [],
          value: U.data
        });
    return H.patches.length === 0 || z(s.util.patchQueryData(P, O, H.patches, B)), H;
  }, S = (P, O, F) => (B) => B(s.endpoints[P].initiate(O, {
    subscribe: !1,
    forceRefetch: !0,
    [Js]: () => ({
      data: F
    })
  })), _ = (P, O) => P.query && P[O] ? P[O] : Cw, x = async (P, {
    signal: O,
    abort: F,
    rejectWithValue: B,
    fulfillWithValue: z,
    dispatch: V,
    getState: G,
    extra: U
  }) => {
    const H = r[P.endpointName], {
      metaSchema: K,
      skipSchemaValidation: D = f
    } = H, Y = P.type === va;
    try {
      let re = Cw;
      const te = {
        signal: O,
        abort: F,
        dispatch: V,
        getState: G,
        extra: U,
        endpoint: P.endpointName,
        type: P.type,
        forced: Y ? $(P, G()) : void 0,
        queryCacheKey: Y ? P.queryCacheKey : void 0
      }, se = Y ? P[Js] : void 0;
      let le;
      const de = async (fe, ue, we, _e) => {
        if (ue == null && fe.pages.length)
          return Promise.resolve({
            data: fe
          });
        const qe = {
          queryArg: P.originalArgs,
          pageParam: ue
        }, je = await he(qe), at = _e ? m : w;
        return {
          data: {
            pages: at(fe.pages, je.data, we),
            pageParams: at(fe.pageParams, ue, we)
          },
          meta: je.meta
        };
      };
      async function he(fe) {
        let ue;
        const {
          extraOptions: we,
          argSchema: _e,
          rawResponseSchema: qe,
          responseSchema: je
        } = H;
        if (_e && !gi(D, "arg") && (fe = await mi(
          _e,
          fe,
          "argSchema",
          {}
          // we don't have a meta yet, so we can't pass it
        )), se ? ue = se() : H.query ? (re = _(H, "transformResponse"), ue = await t(H.query(fe), te, we)) : ue = await H.queryFn(fe, te, we, (Ze) => t(Ze, te, we)), typeof process < "u" && X5.NODE_ENV, ue.error) throw new kw(ue.error, ue.meta);
        let {
          data: at
        } = ue;
        qe && !gi(D, "rawResponse") && (at = await mi(qe, ue.data, "rawResponseSchema", ue.meta));
        let dt = await re(at, ue.meta, fe);
        return je && !gi(D, "response") && (dt = await mi(je, dt, "responseSchema", ue.meta)), {
          ...ue,
          data: dt
        };
      }
      if (Y && "infiniteQueryOptions" in H) {
        const {
          infiniteQueryOptions: fe
        } = H, {
          maxPages: ue = 1 / 0
        } = fe, we = P.refetchCachedPages ?? fe.refetchCachedPages ?? !0;
        let _e;
        const qe = {
          pages: [],
          pageParams: []
        }, je = u.selectQueryEntry(G(), P.queryCacheKey)?.data, dt = /* arg.forceRefetch */ $(P, G()) && !P.direction || !je ? qe : je;
        if ("direction" in P && P.direction && dt.pages.length) {
          const Ze = P.direction === "backward", $t = (Ze ? ub : Pp)(fe, dt, P.originalArgs);
          _e = await de(dt, $t, ue, Ze);
        } else {
          const {
            initialPageParam: Ze = fe.initialPageParam
          } = P, De = je?.pageParams ?? [], $t = De[0] ?? Ze, ft = De.length;
          if (_e = await de(dt, $t, ue), se && (_e = {
            data: _e.data.pages[0]
          }), we)
            for (let Ue = 1; Ue < ft; Ue++) {
              const xe = Pp(fe, _e.data, P.originalArgs);
              _e = await de(_e.data, xe, ue);
            }
        }
        le = _e;
      } else
        le = await he(P.originalArgs);
      return K && !gi(D, "meta") && le.meta && (le.meta = await mi(K, le.meta, "metaSchema", le.meta)), z(le.data, Ss({
        fulfilledTimeStamp: Date.now(),
        baseQueryMeta: le.meta
      }));
    } catch (re) {
      let te = re;
      if (te instanceof kw) {
        let se = _(H, "transformErrorResponse");
        const {
          rawErrorResponseSchema: le,
          errorResponseSchema: de
        } = H;
        let {
          value: he,
          meta: fe
        } = te;
        try {
          le && !gi(D, "rawErrorResponse") && (he = await mi(le, he, "rawErrorResponseSchema", fe)), K && !gi(D, "meta") && (fe = await mi(K, fe, "metaSchema", fe));
          let ue = await se(he, fe, P.originalArgs);
          return de && !gi(D, "errorResponse") && (ue = await mi(de, ue, "errorResponseSchema", fe)), B(ue, Ss({
            baseQueryMeta: fe
          }));
        } catch (ue) {
          te = ue;
        }
      }
      try {
        if (te instanceof lb) {
          const se = {
            endpoint: P.endpointName,
            arg: P.originalArgs,
            type: P.type,
            queryCacheKey: Y ? P.queryCacheKey : void 0
          };
          H.onSchemaFailure?.(te, se), d?.(te, se);
          const {
            catchSchemaFailure: le = p
          } = H;
          if (le)
            return B(le(te, se), Ss({
              baseQueryMeta: te._bqMeta
            }));
        }
      } catch (se) {
        te = se;
      }
      throw console.error(te), te;
    }
  };
  function $(P, O) {
    const F = u.selectQueryEntry(O, P.queryCacheKey), B = u.selectConfig(O).refetchOnMountOrArgChange, z = F?.fulfilledTimeStamp, V = P.forceRefetch ?? (P.subscribe && B);
    return V ? V === !0 || (Number(/* @__PURE__ */ new Date()) - Number(z)) / 1e3 >= V : !1;
  }
  const N = () => vw(`${e}/executeQuery`, x, {
    getPendingMeta({
      arg: O
    }) {
      const F = r[O.endpointName];
      return Ss({
        startedTimeStamp: Date.now(),
        ...cc(F) ? {
          direction: O.direction
        } : {}
      });
    },
    condition(O, {
      getState: F
    }) {
      const B = F(), z = u.selectQueryEntry(B, O.queryCacheKey), V = z?.fulfilledTimeStamp, G = O.originalArgs, U = z?.originalArgs, H = r[O.endpointName], K = O.direction;
      return Ep(O) ? !0 : z?.status === "pending" ? !1 : $(O, B) || uc(H) && H?.forceRefetch?.({
        currentArg: G,
        previousArg: U,
        endpointState: z,
        state: B
      }) ? !0 : !(V && !K);
    },
    dispatchConditionRejection: !0
  }), C = N(), R = N(), E = vw(`${e}/executeMutation`, x, {
    getPendingMeta() {
      return Ss({
        startedTimeStamp: Date.now()
      });
    }
  }), M = (P) => "force" in P, A = (P) => "ifOlderThan" in P, I = (P, O, F = {}) => (B, z) => {
    const V = M(F) && F.force, G = A(F) && F.ifOlderThan, U = (K = !0) => {
      const D = {
        forceRefetch: K,
        subscribe: !1
      };
      return s.endpoints[P].initiate(O, D);
    }, H = s.endpoints[P].select(O)(z());
    if (V)
      B(U());
    else if (G) {
      const K = H?.fulfilledTimeStamp;
      if (!K) {
        B(U());
        return;
      }
      (Number(/* @__PURE__ */ new Date()) - Number(new Date(K))) / 1e3 >= G && B(U());
    } else
      B(U(!1));
  };
  function L(P) {
    return (O) => O?.meta?.arg?.endpointName === P;
  }
  function v(P, O) {
    return {
      matchPending: Ds(vh(P), L(O)),
      matchFulfilled: Ds(Xr(P), L(O)),
      matchRejected: Ds(wo(P), L(O))
    };
  }
  return {
    queryThunk: C,
    mutationThunk: E,
    infiniteQueryThunk: R,
    prefetch: I,
    updateQueryData: k,
    upsertQueryData: S,
    patchQueryData: g,
    buildMatchThunkActions: v
  };
}
function Pp(e, {
  pages: t,
  pageParams: r
}, o) {
  const s = t.length - 1;
  return e.getNextPageParam(t[s], t, r[s], r, o);
}
function ub(e, {
  pages: t,
  pageParams: r
}, o) {
  return e.getPreviousPageParam?.(t[0], t, r[0], r, o);
}
function cb(e, t, r, o) {
  return Ch(r[e.meta.arg.endpointName][t], Xr(e) ? e.payload : void 0, ac(e) ? e.payload : void 0, e.meta.arg.originalArgs, "baseQueryMeta" in e.meta ? e.meta.baseQueryMeta : void 0, o);
}
function Ew(e) {
  return un(e) ? V0(e) : e;
}
function Wl(e, t, r) {
  const o = e[t];
  o && r(o);
}
function Xs(e) {
  return ("arg" in e ? e.arg.fixedCacheKey : e.fixedCacheKey) ?? e.requestId;
}
function Pw(e, t, r) {
  const o = e[Xs(t)];
  o && r(o);
}
var Ul = {};
function v3({
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
  const g = On(`${e}/resetApiState`);
  function m(L, v, P, O) {
    L[v.queryCacheKey] ??= {
      status: br,
      endpointName: v.endpointName
    }, Wl(L, v.queryCacheKey, (F) => {
      F.status = xp, F.requestId = P && F.requestId ? (
        // for `upsertQuery` **updates**, keep the current `requestId`
        F.requestId
      ) : (
        // for normal queries or `upsertQuery` **inserts** always update the `requestId`
        O.requestId
      ), v.originalArgs !== void 0 && (F.originalArgs = v.originalArgs), F.startedTimeStamp = O.startedTimeStamp;
      const B = s[O.arg.endpointName];
      cc(B) && "direction" in v && (F.direction = v.direction);
    });
  }
  function w(L, v, P, O) {
    Wl(L, v.arg.queryCacheKey, (F) => {
      if (F.requestId !== v.requestId && !O) return;
      const {
        merge: B
      } = s[v.arg.endpointName];
      if (F.status = Ps, B)
        if (F.data !== void 0) {
          const {
            fulfilledTimeStamp: z,
            arg: V,
            baseQueryMeta: G,
            requestId: U
          } = v;
          let H = ma(F.data, (K) => B(K, P, {
            arg: V.originalArgs,
            baseQueryMeta: G,
            fulfilledTimeStamp: z,
            requestId: U
          }));
          F.data = H;
        } else
          F.data = P;
      else
        F.data = s[v.arg.endpointName].structuralSharing ?? !0 ? bh(un(F.data) ? Jz(F.data) : F.data, P) : P;
      delete F.error, F.fulfilledTimeStamp = v.fulfilledTimeStamp;
    });
  }
  const k = An({
    name: `${e}/queries`,
    initialState: Ul,
    reducers: {
      removeQueryResult: {
        reducer(L, {
          payload: {
            queryCacheKey: v
          }
        }) {
          delete L[v];
        },
        prepare: ws()
      },
      cacheEntriesUpserted: {
        reducer(L, v) {
          for (const P of v.payload) {
            const {
              queryDescription: O,
              value: F
            } = P;
            m(L, O, !0, {
              arg: O,
              requestId: v.meta.requestId,
              startedTimeStamp: v.meta.timestamp
            }), w(
              L,
              {
                arg: O,
                requestId: v.meta.requestId,
                fulfilledTimeStamp: v.meta.timestamp,
                baseQueryMeta: {}
              },
              F,
              // We know we're upserting here
              !0
            );
          }
        },
        prepare: (L) => ({
          payload: L.map((O) => {
            const {
              endpointName: F,
              arg: B,
              value: z
            } = O, V = s[F];
            return {
              queryDescription: {
                type: va,
                endpointName: F,
                originalArgs: O.arg,
                queryCacheKey: o({
                  queryArgs: B,
                  endpointDefinition: V,
                  endpointName: F
                })
              },
              value: z
            };
          }),
          meta: {
            [oc]: !0,
            requestId: wh(),
            timestamp: Date.now()
          }
        })
      },
      queryResultPatched: {
        reducer(L, {
          payload: {
            queryCacheKey: v,
            patches: P
          }
        }) {
          Wl(L, v, (O) => {
            O.data = dw(O.data, P.concat());
          });
        },
        prepare: ws()
      }
    },
    extraReducers(L) {
      L.addCase(t.pending, (v, {
        meta: P,
        meta: {
          arg: O
        }
      }) => {
        const F = Ep(O);
        m(v, O, F, P);
      }).addCase(t.fulfilled, (v, {
        meta: P,
        payload: O
      }) => {
        const F = Ep(P.arg);
        w(v, P, O, F);
      }).addCase(t.rejected, (v, {
        meta: {
          condition: P,
          arg: O,
          requestId: F
        },
        error: B,
        payload: z
      }) => {
        Wl(v, O.queryCacheKey, (V) => {
          if (!P) {
            if (V.requestId !== F) return;
            V.status = Rs, V.error = z ?? B;
          }
        });
      }).addMatcher(d, (v, P) => {
        const {
          queries: O
        } = u(P);
        for (const [F, B] of Object.entries(O))
          // do not rehydrate entries that were currently in flight.
          (B?.status === Ps || B?.status === Rs) && (v[F] = B);
      });
    }
  }), S = An({
    name: `${e}/mutations`,
    initialState: Ul,
    reducers: {
      removeMutationResult: {
        reducer(L, {
          payload: v
        }) {
          const P = Xs(v);
          P in L && delete L[P];
        },
        prepare: ws()
      }
    },
    extraReducers(L) {
      L.addCase(r.pending, (v, {
        meta: P,
        meta: {
          requestId: O,
          arg: F,
          startedTimeStamp: B
        }
      }) => {
        F.track && (v[Xs(P)] = {
          requestId: O,
          status: xp,
          endpointName: F.endpointName,
          startedTimeStamp: B
        });
      }).addCase(r.fulfilled, (v, {
        payload: P,
        meta: O
      }) => {
        O.arg.track && Pw(v, O, (F) => {
          F.requestId === O.requestId && (F.status = Ps, F.data = P, F.fulfilledTimeStamp = O.fulfilledTimeStamp);
        });
      }).addCase(r.rejected, (v, {
        payload: P,
        error: O,
        meta: F
      }) => {
        F.arg.track && Pw(v, F, (B) => {
          B.requestId === F.requestId && (B.status = Rs, B.error = P ?? O);
        });
      }).addMatcher(d, (v, P) => {
        const {
          mutations: O
        } = u(P);
        for (const [F, B] of Object.entries(O))
          // do not rehydrate entries that were currently in flight.
          (B?.status === Ps || B?.status === Rs) && // only rehydrate endpoints that were persisted using a `fixedCacheKey`
          F !== B?.requestId && (v[F] = B);
      });
    }
  }), _ = {
    tags: {},
    keys: {}
  }, x = An({
    name: `${e}/invalidation`,
    initialState: _,
    reducers: {
      updateProvidedBy: {
        reducer(L, v) {
          for (const {
            queryCacheKey: P,
            providedTags: O
          } of v.payload) {
            $(L, P);
            for (const {
              type: F,
              id: B
            } of O) {
              const z = (L.tags[F] ??= {})[B || "__internal_without_id"] ??= [];
              z.includes(P) || z.push(P);
            }
            L.keys[P] = O;
          }
        },
        prepare: ws()
      }
    },
    extraReducers(L) {
      L.addCase(k.actions.removeQueryResult, (v, {
        payload: {
          queryCacheKey: P
        }
      }) => {
        $(v, P);
      }).addMatcher(d, (v, P) => {
        const {
          provided: O
        } = u(P);
        for (const [F, B] of Object.entries(O.tags ?? {}))
          for (const [z, V] of Object.entries(B)) {
            const G = (v.tags[F] ??= {})[z || "__internal_without_id"] ??= [];
            for (const U of V)
              G.includes(U) || G.push(U), v.keys[U] = O.keys[U];
          }
      }).addMatcher(Sr(Xr(t), ac(t)), (v, P) => {
        N(v, [P]);
      }).addMatcher(k.actions.cacheEntriesUpserted.match, (v, P) => {
        const O = P.payload.map(({
          queryDescription: F,
          value: B
        }) => ({
          type: "UNKNOWN",
          payload: B,
          meta: {
            requestStatus: "fulfilled",
            requestId: "UNKNOWN",
            arg: F
          }
        }));
        N(v, O);
      });
    }
  });
  function $(L, v) {
    const P = Ew(L.keys[v] ?? []);
    for (const O of P) {
      const F = O.type, B = O.id ?? "__internal_without_id", z = L.tags[F]?.[B];
      z && (L.tags[F][B] = Ew(z).filter((V) => V !== v));
    }
    delete L.keys[v];
  }
  function N(L, v) {
    const P = v.map((O) => {
      const F = cb(O, "providesTags", s, p), {
        queryCacheKey: B
      } = O.meta.arg;
      return {
        queryCacheKey: B,
        providedTags: F
      };
    });
    x.caseReducers.updateProvidedBy(L, x.actions.updateProvidedBy(P));
  }
  const C = An({
    name: `${e}/subscriptions`,
    initialState: Ul,
    reducers: {
      updateSubscriptionOptions(L, v) {
      },
      unsubscribeQueryResult(L, v) {
      },
      internal_getRTKQSubscriptions() {
      }
    }
  }), R = An({
    name: `${e}/internalSubscriptions`,
    initialState: Ul,
    reducers: {
      subscriptionsUpdated: {
        reducer(L, v) {
          return dw(L, v.payload);
        },
        prepare: ws()
      }
    }
  }), E = An({
    name: `${e}/config`,
    initialState: {
      online: t3(),
      focused: e3(),
      middlewareRegistered: !1,
      ...f
    },
    reducers: {
      middlewareRegistered(L, {
        payload: v
      }) {
        L.middlewareRegistered = L.middlewareRegistered === "conflict" || l !== v ? "conflict" : !0;
      }
    },
    extraReducers: (L) => {
      L.addCase(kh, (v) => {
        v.online = !0;
      }).addCase(ib, (v) => {
        v.online = !1;
      }).addCase(xh, (v) => {
        v.focused = !0;
      }).addCase(rb, (v) => {
        v.focused = !1;
      }).addMatcher(d, (v) => ({
        ...v
      }));
    }
  }), M = ph({
    queries: k.reducer,
    mutations: S.reducer,
    provided: x.reducer,
    subscriptions: R.reducer,
    config: E.reducer
  }), A = (L, v) => M(g.match(v) ? void 0 : L, v), I = {
    ...E.actions,
    ...k.actions,
    ...C.actions,
    ...R.actions,
    ...S.actions,
    ...x.actions,
    resetApiState: g
  };
  return {
    reducer: A,
    actions: I
  };
}
var Mn = /* @__PURE__ */ Symbol.for("RTKQ/skipToken"), db = {
  status: br
}, Rw = /* @__PURE__ */ ma(db, () => {
}), Tw = /* @__PURE__ */ ma(db, () => {
});
function w3({
  serializeQueryArgs: e,
  reducerPath: t,
  createSelector: r
}) {
  const o = (C) => Rw, s = (C) => Tw;
  return {
    buildQuerySelector: w,
    buildInfiniteQuerySelector: k,
    buildMutationSelector: S,
    selectInvalidatedBy: _,
    selectCachedArgsForQuery: x,
    selectApiState: u,
    selectQueries: d,
    selectMutations: f,
    selectQueryEntry: p,
    selectConfig: g
  };
  function l(C) {
    return {
      ...C,
      ...ww(C.status)
    };
  }
  function u(C) {
    return C[t];
  }
  function d(C) {
    return u(C)?.queries;
  }
  function p(C, R) {
    return d(C)?.[R];
  }
  function f(C) {
    return u(C)?.mutations;
  }
  function g(C) {
    return u(C)?.config;
  }
  function m(C, R, E) {
    return (M) => {
      if (M === Mn)
        return r(o, E);
      const A = e({
        queryArgs: M,
        endpointDefinition: R,
        endpointName: C
      });
      return r((L) => p(L, A) ?? Rw, E);
    };
  }
  function w(C, R) {
    return m(C, R, l);
  }
  function k(C, R) {
    const {
      infiniteQueryOptions: E
    } = R;
    function M(A) {
      const I = {
        ...A,
        ...ww(A.status)
      }, {
        isLoading: L,
        isError: v,
        direction: P
      } = I, O = P === "forward", F = P === "backward";
      return {
        ...I,
        hasNextPage: $(E, I.data, I.originalArgs),
        hasPreviousPage: N(E, I.data, I.originalArgs),
        isFetchingNextPage: L && O,
        isFetchingPreviousPage: L && F,
        isFetchNextPageError: v && O,
        isFetchPreviousPageError: v && F
      };
    }
    return m(C, R, M);
  }
  function S() {
    return (C) => {
      let R;
      return typeof C == "object" ? R = Xs(C) ?? Mn : R = C, r(R === Mn ? s : (A) => u(A)?.mutations?.[R] ?? Tw, l);
    };
  }
  function _(C, R) {
    const E = C[t], M = /* @__PURE__ */ new Set(), A = kp(R, _h, ab);
    for (const I of A) {
      const L = E.provided.tags[I.type];
      if (!L)
        continue;
      let v = (I.id !== void 0 ? (
        // id given: invalidate all queries that provide this type & id
        L[I.id]
      ) : (
        // no id: invalidate all queries that provide this type
        Object.values(L).flat()
      )) ?? [];
      for (const P of v)
        M.add(P);
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
  function x(C, R) {
    return kp(Object.values(d(C)), (E) => E?.endpointName === R && E.status !== br, (E) => E.originalArgs);
  }
  function $(C, R, E) {
    return R ? Pp(C, R, E) != null : !1;
  }
  function N(C, R, E) {
    return !R || !C.getPreviousPageParam ? !1 : ub(C, R, E) != null;
  }
}
var $w = WeakMap ? /* @__PURE__ */ new WeakMap() : void 0, Mw = ({
  endpointName: e,
  queryArgs: t
}) => {
  let r = "";
  const o = $w?.get(t);
  if (typeof o == "string")
    r = o;
  else {
    const s = JSON.stringify(t, (l, u) => (u = typeof u == "bigint" ? {
      $bigint: u.toString()
    } : u, u = Jr(u) ? Object.keys(u).sort().reduce((d, p) => (d[p] = u[p], d), {}) : u, u));
    Jr(t) && $w?.set(t, s), r = s;
  }
  return `${e}(${r})`;
};
function fb(...e) {
  return function(r) {
    const o = Lu((f) => r.extractRehydrationInfo?.(f, {
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
        let g = Mw;
        if ("serializeQueryArgs" in f.endpointDefinition) {
          const m = f.endpointDefinition.serializeQueryArgs;
          g = (w) => {
            const k = m(w);
            return typeof k == "string" ? k : Mw({
              ...w,
              queryArgs: k
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
      apiUid: wh(),
      extractRehydrationInfo: o,
      hasRehydrationInfo: Lu((f) => o(f) != null)
    }, u = {
      injectEndpoints: p,
      enhanceEndpoints({
        addTagTypes: f,
        endpoints: g
      }) {
        if (f)
          for (const m of f)
            s.tagTypes.includes(m) || s.tagTypes.push(m);
        if (g)
          for (const [m, w] of Object.entries(g))
            typeof w == "function" ? w(So(l, m)) : Object.assign(So(l, m) || {}, w);
        return u;
      }
    }, d = e.map((f) => f.init(u, s, l));
    function p(f) {
      const g = f.endpoints({
        query: (m) => ({
          ...m,
          type: va
        }),
        mutation: (m) => ({
          ...m,
          type: ob
        }),
        infiniteQuery: (m) => ({
          ...m,
          type: sb
        })
      });
      for (const [m, w] of Object.entries(g)) {
        if (f.overrideExisting !== !0 && m in l.endpointDefinitions) {
          if (f.overrideExisting === "throw")
            throw new Error(Sn(39));
          continue;
        }
        l.endpointDefinitions[m] = w;
        for (const k of d)
          k.injectEndpoint(m, w);
      }
      return u;
    }
    return u.injectEndpoints({
      endpoints: r.endpoints
    });
  };
}
function hr(e, ...t) {
  return Object.assign(e, ...t);
}
var S3 = ({
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
  } = e.internalActions, f = (_, x) => {
    if (d.match(x)) {
      const {
        queryCacheKey: N,
        requestId: C,
        options: R
      } = x.payload, E = _.get(N);
      return E?.has(C) && E.set(C, R), !0;
    }
    if (p.match(x)) {
      const {
        queryCacheKey: N,
        requestId: C
      } = x.payload, R = _.get(N);
      return R && R.delete(C), !0;
    }
    if (e.internalActions.removeQueryResult.match(x))
      return _.delete(x.payload.queryCacheKey), !0;
    if (t.pending.match(x)) {
      const {
        meta: {
          arg: N,
          requestId: C
        }
      } = x, R = Du(_, N.queryCacheKey, Cp);
      return N.subscribe && R.set(C, N.subscriptionOptions ?? R.get(C) ?? {}), !0;
    }
    let $ = !1;
    if (t.rejected.match(x)) {
      const {
        meta: {
          condition: N,
          arg: C,
          requestId: R
        }
      } = x;
      if (N && C.subscribe) {
        const E = Du(_, C.queryCacheKey, Cp);
        E.set(R, C.subscriptionOptions ?? E.get(R) ?? {}), $ = !0;
      }
    }
    return $;
  }, g = () => r.currentSubscriptions, k = {
    getSubscriptions: g,
    getSubscriptionCount: (_) => g().get(_)?.size ?? 0,
    isRequestSubscribed: (_, x) => !!g()?.get(_)?.get(x)
  };
  function S(_) {
    return JSON.parse(JSON.stringify(Object.fromEntries([..._].map(([x, $]) => [x, Object.fromEntries($)]))));
  }
  return (_, x) => {
    if (l || (l = S(r.currentSubscriptions)), e.util.resetApiState.match(_))
      return l = {}, r.currentSubscriptions.clear(), u = null, [!0, !1];
    if (e.internalActions.internal_getRTKQSubscriptions.match(_))
      return [!1, k];
    const $ = f(r.currentSubscriptions, _);
    let N = !0;
    if ($) {
      u || (u = setTimeout(() => {
        const E = S(r.currentSubscriptions), [, M] = q0(l, () => E);
        x.next(e.internalActions.subscriptionsUpdated(M)), l = E, u = null;
      }, 500));
      const C = typeof _.type == "string" && !!_.type.startsWith(s), R = t.rejected.match(_) && _.meta.condition && !!_.meta.arg.subscribe;
      N = !C && !R;
    }
    return [N, !1];
  };
}, b3 = 2147483647 / 1e3 - 1, _3 = ({
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
    cacheEntriesUpserted: m
  } = t.internalActions, w = Sr(g.match, r.fulfilled, r.rejected, m.match);
  function k(C) {
    const R = s.currentSubscriptions.get(C);
    return R ? R.size > 0 : !1;
  }
  const S = {};
  function _(C) {
    for (const R of C.values())
      R?.abort?.();
  }
  const x = (C, R) => {
    const E = R.getState(), M = u(E);
    if (w(C)) {
      let A;
      if (m.match(C))
        A = C.payload.map((I) => I.queryDescription.queryCacheKey);
      else {
        const {
          queryCacheKey: I
        } = g.match(C) ? C.payload : C.meta.arg;
        A = [I];
      }
      $(A, R, M);
    }
    if (t.util.resetApiState.match(C)) {
      for (const [A, I] of Object.entries(S))
        I && clearTimeout(I), delete S[A];
      _(s.runningQueries), _(s.runningMutations);
    }
    if (o.hasRehydrationInfo(C)) {
      const {
        queries: A
      } = o.extractRehydrationInfo(C);
      $(Object.keys(A), R, M);
    }
  };
  function $(C, R, E) {
    const M = R.getState();
    for (const A of C) {
      const I = l(M, A);
      I?.endpointName && N(A, I.endpointName, R, E);
    }
  }
  function N(C, R, E, M) {
    const I = So(o, R)?.keepUnusedDataFor ?? M.keepUnusedDataFor;
    if (I === 1 / 0)
      return;
    const L = Math.max(0, Math.min(I, b3));
    if (!k(C)) {
      const v = S[C];
      v && clearTimeout(v), S[C] = setTimeout(() => {
        if (!k(C)) {
          const P = l(E.getState(), C);
          P?.endpointName && E.dispatch(d(P.endpointName, P.originalArgs))?.abort(), E.dispatch(f({
            queryCacheKey: C
          }));
        }
        delete S[C];
      }, L * 1e3);
    }
  }
  return x;
}, Aw = new Error("Promise never resolved before cacheEntryRemoved."), x3 = ({
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
  const p = _p(o), f = _p(s), g = Xr(o, s), m = {}, {
    removeQueryResult: w,
    removeMutationResult: k,
    cacheEntriesUpserted: S
  } = e.internalActions;
  function _(E, M, A) {
    const I = m[E];
    I?.valueResolved && (I.valueResolved({
      data: M,
      meta: A
    }), delete I.valueResolved);
  }
  function x(E) {
    const M = m[E];
    M && (delete m[E], M.cacheEntryRemoved());
  }
  function $(E) {
    const {
      arg: M,
      requestId: A
    } = E.meta, {
      endpointName: I,
      originalArgs: L
    } = M;
    return [I, L, A];
  }
  const N = (E, M, A) => {
    const I = C(E);
    function L(v, P, O, F) {
      const B = u(A, P), z = u(M.getState(), P);
      !B && z && R(v, F, P, M, O);
    }
    if (o.pending.match(E)) {
      const [v, P, O] = $(E);
      L(v, I, O, P);
    } else if (S.match(E))
      for (const {
        queryDescription: v,
        value: P
      } of E.payload) {
        const {
          endpointName: O,
          originalArgs: F,
          queryCacheKey: B
        } = v;
        L(O, B, E.meta.requestId, F), _(B, P, {});
      }
    else if (s.pending.match(E)) {
      if (M.getState()[t].mutations[I]) {
        const [P, O, F] = $(E);
        R(P, O, I, M, F);
      }
    } else if (g(E))
      _(I, E.payload, E.meta.baseQueryMeta);
    else if (w.match(E) || k.match(E))
      x(I);
    else if (e.util.resetApiState.match(E))
      for (const v of Object.keys(m))
        x(v);
  };
  function C(E) {
    return p(E) ? E.meta.arg.queryCacheKey : f(E) ? E.meta.arg.fixedCacheKey ?? E.meta.requestId : w.match(E) ? E.payload.queryCacheKey : k.match(E) ? Xs(E.payload) : "";
  }
  function R(E, M, A, I, L) {
    const v = So(r, E), P = v?.onCacheEntryAdded;
    if (!P) return;
    const O = {}, F = new Promise((H) => {
      O.cacheEntryRemoved = H;
    }), B = Promise.race([new Promise((H) => {
      O.valueResolved = H;
    }), F.then(() => {
      throw Aw;
    })]);
    B.catch(() => {
    }), m[A] = O;
    const z = e.endpoints[E].select(Fu(v) ? M : A), V = I.dispatch((H, K, D) => D), G = {
      ...I,
      getCacheEntry: () => z(I.getState()),
      requestId: L,
      extra: V,
      updateCachedData: Fu(v) ? (H) => I.dispatch(e.util.updateQueryData(E, M, H)) : void 0,
      cacheDataLoaded: B,
      cacheEntryRemoved: F
    }, U = P(M, G);
    Promise.resolve(U).catch((H) => {
      if (H !== Aw)
        throw H;
    });
  }
  return N;
}, k3 = ({
  api: e,
  context: {
    apiUid: t
  },
  reducerPath: r
}) => (o, s) => {
  e.util.resetApiState.match(o) && s.dispatch(e.internalActions.middlewareRegistered(t));
}, C3 = ({
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
  } = l.internalActions, g = Sr(Xr(o), ac(o)), m = Sr(Xr(s, o), wo(s, o));
  let w = [], k = 0;
  const S = ($, N) => {
    (s.pending.match($) || o.pending.match($)) && k++, m($) && (k = Math.max(0, k - 1)), g($) ? x(cb($, "invalidatesTags", r, u), N) : m($) ? x([], N) : l.util.invalidateTags.match($) && x(Ch($.payload, void 0, void 0, void 0, void 0, u), N);
  };
  function _() {
    return k > 0;
  }
  function x($, N) {
    const C = N.getState(), R = C[e];
    if (w.push(...$), R.config.invalidationBehavior === "delayed" && _())
      return;
    const E = w;
    if (w = [], E.length === 0) return;
    const M = l.util.selectInvalidatedBy(C, E);
    t.batch(() => {
      const A = Array.from(M.values());
      for (const {
        queryCacheKey: I
      } of A) {
        const L = R.queries[I], v = Du(p.currentSubscriptions, I, Cp);
        L && (v.size === 0 ? N.dispatch(f({
          queryCacheKey: I
        })) : L.status !== br && N.dispatch(d(L)));
      }
    });
  }
  return S;
}, E3 = ({
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
  const f = (x, $) => {
    (r.internalActions.updateSubscriptionOptions.match(x) || r.internalActions.unsubscribeQueryResult.match(x)) && g(x.payload.queryCacheKey, $), (t.pending.match(x) || t.rejected.match(x) && x.meta.condition) && g(x.meta.arg.queryCacheKey, $), (t.fulfilled.match(x) || t.rejected.match(x) && !x.meta.condition) && m(x.meta.arg, $), r.util.resetApiState.match(x) && (S(), p && (clearTimeout(p), p = null), d.clear());
  };
  function g(x, $) {
    d.add(x), p || (p = setTimeout(() => {
      for (const N of d)
        w({
          queryCacheKey: N
        }, $);
      d.clear(), p = null;
    }, 0));
  }
  function m({
    queryCacheKey: x
  }, $) {
    const N = $.getState()[e], C = N.queries[x], R = u.get(x);
    if (!C || C.status === br) return;
    const {
      lowestPollingInterval: E,
      skipPollingIfUnfocused: M
    } = _(R);
    if (!Number.isFinite(E)) return;
    const A = l.get(x);
    A?.timeout && (clearTimeout(A.timeout), A.timeout = void 0);
    const I = Date.now() + E;
    l.set(x, {
      nextPollTimestamp: I,
      pollingInterval: E,
      timeout: setTimeout(() => {
        (N.config.focused || !M) && $.dispatch(o(C)), m({
          queryCacheKey: x
        }, $);
      }, E)
    });
  }
  function w({
    queryCacheKey: x
  }, $) {
    const C = $.getState()[e].queries[x], R = u.get(x);
    if (!C || C.status === br)
      return;
    const {
      lowestPollingInterval: E
    } = _(R);
    if (!Number.isFinite(E)) {
      k(x);
      return;
    }
    const M = l.get(x), A = Date.now() + E;
    (!M || A < M.nextPollTimestamp) && m({
      queryCacheKey: x
    }, $);
  }
  function k(x) {
    const $ = l.get(x);
    $?.timeout && clearTimeout($.timeout), l.delete(x);
  }
  function S() {
    for (const x of l.keys())
      k(x);
  }
  function _(x = /* @__PURE__ */ new Map()) {
    let $ = !1, N = Number.POSITIVE_INFINITY;
    for (const C of x.values())
      C.pollingInterval && (N = Math.min(C.pollingInterval, N), $ = C.skipPollingIfUnfocused || $);
    return {
      lowestPollingInterval: N,
      skipPollingIfUnfocused: $
    };
  }
  return f;
}, P3 = ({
  api: e,
  context: t,
  queryThunk: r,
  mutationThunk: o
}) => {
  const s = vh(r, o), l = wo(r, o), u = Xr(r, o), d = {};
  return (f, g) => {
    if (s(f)) {
      const {
        requestId: m,
        arg: {
          endpointName: w,
          originalArgs: k
        }
      } = f.meta, S = So(t, w), _ = S?.onQueryStarted;
      if (_) {
        const x = {}, $ = new Promise((E, M) => {
          x.resolve = E, x.reject = M;
        });
        $.catch(() => {
        }), d[m] = x;
        const N = e.endpoints[w].select(Fu(S) ? k : m), C = g.dispatch((E, M, A) => A), R = {
          ...g,
          getCacheEntry: () => N(g.getState()),
          requestId: m,
          extra: C,
          updateCachedData: Fu(S) ? (E) => g.dispatch(e.util.updateQueryData(w, k, E)) : void 0,
          queryFulfilled: $
        };
        _(k, R);
      }
    } else if (u(f)) {
      const {
        requestId: m,
        baseQueryMeta: w
      } = f.meta;
      d[m]?.resolve({
        data: f.payload,
        meta: w
      }), delete d[m];
    } else if (l(f)) {
      const {
        requestId: m,
        rejectedWithValue: w,
        baseQueryMeta: k
      } = f.meta;
      d[m]?.reject({
        error: f.payload ?? f.error,
        isUnhandledError: !w,
        meta: k
      }), delete d[m];
    }
  };
}, R3 = ({
  reducerPath: e,
  context: t,
  api: r,
  refetchQuery: o,
  internalState: s
}) => {
  const {
    removeQueryResult: l
  } = r.internalActions, u = (p, f) => {
    xh.match(p) && d(f, "refetchOnFocus"), kh.match(p) && d(f, "refetchOnReconnect");
  };
  function d(p, f) {
    const g = p.getState()[e], m = g.queries, w = s.currentSubscriptions;
    t.batch(() => {
      for (const k of w.keys()) {
        const S = m[k], _ = w.get(k);
        if (!_ || !S) continue;
        const x = [..._.values()];
        (x.some((N) => N[f] === !0) || x.every((N) => N[f] === void 0) && g.config[f]) && (_.size === 0 ? p.dispatch(l({
          queryCacheKey: k
        })) : S.status !== br && p.dispatch(o(S)));
      }
    });
  }
  return u;
};
function T3(e) {
  const {
    reducerPath: t,
    queryThunk: r,
    api: o,
    context: s,
    getInternalState: l
  } = e, {
    apiUid: u
  } = s, d = {
    invalidateTags: On(`${t}/invalidateTags`)
  }, p = (w) => w.type.startsWith(`${t}/`), f = [k3, _3, C3, E3, x3, P3];
  return {
    middleware: (w) => {
      let k = !1;
      const S = l(w.dispatch), _ = {
        ...e,
        internalState: S,
        refetchQuery: m,
        isThisApiSliceAction: p,
        mwApi: w
      }, x = f.map((C) => C(_)), $ = S3(_), N = R3(_);
      return (C) => (R) => {
        if (!D0(R))
          return C(R);
        k || (k = !0, w.dispatch(o.internalActions.middlewareRegistered(u)));
        const E = {
          ...w,
          next: C
        }, M = w.getState(), [A, I] = $(R, E, M);
        let L;
        if (A ? L = C(R) : L = I, w.getState()[t] && (N(R, E, M), p(R) || s.hasRehydrationInfo(R)))
          for (const v of x)
            v(R, E, M);
        return L;
      };
    },
    actions: d
  };
  function m(w) {
    return e.api.endpoints[w.endpointName].initiate(w.originalArgs, {
      subscribe: !1,
      forceRefetch: !0
    });
  }
}
var Iw = /* @__PURE__ */ Symbol(), pb = ({
  createSelector: e = yh
} = {}) => ({
  name: Iw,
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
    onSchemaFailure: m,
    catchSchemaFailure: w,
    skipSchemaValidation: k
  }, S) {
    f5();
    const _ = (de) => de;
    Object.assign(t, {
      reducerPath: s,
      endpoints: {},
      internalActions: {
        onOnline: kh,
        onOffline: ib,
        onFocus: xh,
        onFocusLost: rb
      },
      util: {}
    });
    const x = w3({
      serializeQueryArgs: l,
      reducerPath: s,
      createSelector: e
    }), {
      selectInvalidatedBy: $,
      selectCachedArgsForQuery: N,
      buildQuerySelector: C,
      buildInfiniteQuerySelector: R,
      buildMutationSelector: E
    } = x;
    hr(t.util, {
      selectInvalidatedBy: $,
      selectCachedArgsForQuery: N
    });
    const {
      queryThunk: M,
      infiniteQueryThunk: A,
      mutationThunk: I,
      patchQueryData: L,
      updateQueryData: v,
      upsertQueryData: P,
      prefetch: O,
      buildMatchThunkActions: F
    } = y3({
      baseQuery: r,
      reducerPath: s,
      context: S,
      api: t,
      serializeQueryArgs: l,
      assertTagType: _,
      selectors: x,
      onSchemaFailure: m,
      catchSchemaFailure: w,
      skipSchemaValidation: k
    }), {
      reducer: B,
      actions: z
    } = v3({
      context: S,
      queryThunk: M,
      mutationThunk: I,
      serializeQueryArgs: l,
      reducerPath: s,
      assertTagType: _,
      config: {
        refetchOnFocus: p,
        refetchOnReconnect: f,
        refetchOnMountOrArgChange: d,
        keepUnusedDataFor: u,
        reducerPath: s,
        invalidationBehavior: g
      }
    });
    hr(t.util, {
      patchQueryData: L,
      updateQueryData: v,
      upsertQueryData: P,
      prefetch: O,
      resetApiState: z.resetApiState,
      upsertQueryEntries: z.cacheEntriesUpserted
    }), hr(t.internalActions, z);
    const V = /* @__PURE__ */ new WeakMap(), G = (de) => Du(V, de, () => ({
      currentSubscriptions: /* @__PURE__ */ new Map(),
      currentPolls: /* @__PURE__ */ new Map(),
      runningQueries: /* @__PURE__ */ new Map(),
      runningMutations: /* @__PURE__ */ new Map()
    })), {
      buildInitiateQuery: U,
      buildInitiateInfiniteQuery: H,
      buildInitiateMutation: K,
      getRunningMutationThunk: D,
      getRunningMutationsThunk: Y,
      getRunningQueriesThunk: re,
      getRunningQueryThunk: te
    } = m3({
      queryThunk: M,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      serializeQueryArgs: l,
      context: S,
      getInternalState: G
    });
    hr(t.util, {
      getRunningMutationThunk: D,
      getRunningMutationsThunk: Y,
      getRunningQueryThunk: te,
      getRunningQueriesThunk: re
    });
    const {
      middleware: se,
      actions: le
    } = T3({
      reducerPath: s,
      context: S,
      queryThunk: M,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      assertTagType: _,
      selectors: x,
      getRunningQueryThunk: te,
      getInternalState: G
    });
    return hr(t.util, le), hr(t, {
      reducer: B,
      middleware: se
    }), {
      name: Iw,
      injectEndpoint(de, he) {
        const fe = t, ue = fe.endpoints[de] ??= {};
        uc(he) && hr(ue, {
          name: de,
          select: C(de, he),
          initiate: U(de, he)
        }, F(M, de)), p3(he) && hr(ue, {
          name: de,
          select: E(),
          initiate: K(de)
        }, F(I, de)), cc(he) && hr(ue, {
          name: de,
          select: R(de, he),
          initiate: H(de, he)
        }, F(M, de));
      }
    };
  }
});
pb();
function Vl(e) {
  return e.replace(e[0], e[0].toUpperCase());
}
var $3 = "query", M3 = "mutation", A3 = "infinitequery";
function I3(e) {
  return e.type === $3;
}
function N3(e) {
  return e.type === M3;
}
function hb(e) {
  return e.type === A3;
}
function bs(e, ...t) {
  return Object.assign(e, ...t);
}
var Nf = /* @__PURE__ */ Symbol();
function Of(e) {
  const t = b.useRef(e), r = b.useMemo(() => bh(t.current, e), [e]);
  return b.useEffect(() => {
    t.current !== r && (t.current = r);
  }, [r]), r;
}
function co(e) {
  const t = b.useRef(e);
  return b.useEffect(() => {
    Ns(t.current, e) || (t.current = e);
  }, [e]), Ns(t.current, e) ? t.current : e;
}
var O3 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", L3 = /* @__PURE__ */ O3(), D3 = () => typeof navigator < "u" && navigator.product === "ReactNative", F3 = /* @__PURE__ */ D3(), j3 = () => L3 || F3 ? b.useLayoutEffect : b.useEffect, z3 = /* @__PURE__ */ j3(), Nw = (e) => e.isUninitialized ? {
  ...e,
  isUninitialized: !1,
  isFetching: !0,
  isLoading: e.data === void 0,
  // This is the one place where we still have to use `QueryStatus` as an enum,
  // since it's the only reference in the React package and not in the core.
  status: tb.pending
} : e;
function Lf(e, ...t) {
  const r = {};
  return t.forEach((o) => {
    r[o] = e[o];
  }), r;
}
var Df = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function B3({
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
  const f = l ? (M) => M() : b.useEffect, g = (M) => M.current?.unsubscribe?.(), m = p.endpointDefinitions;
  return {
    buildQueryHooks: C,
    buildInfiniteQueryHooks: R,
    buildMutationHook: E,
    usePrefetch: S
  };
  function w(M, A, I) {
    if (A?.endpointName && M.isUninitialized) {
      const {
        endpointName: B
      } = A, z = m[B];
      I !== Mn && d({
        queryArgs: A.originalArgs,
        endpointDefinition: z,
        endpointName: B
      }) === d({
        queryArgs: I,
        endpointDefinition: z,
        endpointName: B
      }) && (A = void 0);
    }
    let L = M.isSuccess ? M.data : A?.data;
    L === void 0 && (L = M.data);
    const v = L !== void 0, P = M.isLoading, O = (!A || A.isLoading || A.isUninitialized) && !v && P, F = M.isSuccess || v && (P && !A?.isError || M.isUninitialized);
    return {
      ...M,
      data: L,
      currentData: M.data,
      isFetching: P,
      isLoading: O,
      isSuccess: F
    };
  }
  function k(M, A, I) {
    if (A?.endpointName && M.isUninitialized) {
      const {
        endpointName: B
      } = A, z = m[B];
      I !== Mn && d({
        queryArgs: A.originalArgs,
        endpointDefinition: z,
        endpointName: B
      }) === d({
        queryArgs: I,
        endpointDefinition: z,
        endpointName: B
      }) && (A = void 0);
    }
    let L = M.isSuccess ? M.data : A?.data;
    L === void 0 && (L = M.data);
    const v = L !== void 0, P = M.isLoading, O = (!A || A.isLoading || A.isUninitialized) && !v && P, F = M.isSuccess || P && v;
    return {
      ...M,
      data: L,
      currentData: M.data,
      isFetching: P,
      isLoading: O,
      isSuccess: F
    };
  }
  function S(M, A) {
    const I = r(), L = co(A);
    return b.useCallback((v, P) => I(e.util.prefetch(M, v, {
      ...L,
      ...P
    })), [M, I, L]);
  }
  function _(M, A, {
    refetchOnReconnect: I,
    refetchOnFocus: L,
    refetchOnMountOrArgChange: v,
    skip: P = !1,
    pollingInterval: O = 0,
    skipPollingIfUnfocused: F = !1,
    ...B
  } = {}) {
    const {
      initiate: z
    } = e.endpoints[M], V = r(), G = b.useRef(void 0);
    if (!G.current) {
      const fe = V(e.internalActions.internal_getRTKQSubscriptions());
      G.current = fe;
    }
    const U = Of(P ? Mn : A), H = co({
      refetchOnReconnect: I,
      refetchOnFocus: L,
      pollingInterval: O,
      skipPollingIfUnfocused: F
    }), K = B.initialPageParam, D = co(K), Y = B.refetchCachedPages, re = co(Y), te = b.useRef(void 0);
    let {
      queryCacheKey: se,
      requestId: le
    } = te.current || {}, de = !1;
    se && le && (de = G.current.isRequestSubscribed(se, le));
    const he = !de && te.current !== void 0;
    return f(() => {
      he && (te.current = void 0);
    }, [he]), f(() => {
      const fe = te.current;
      if (U === Mn) {
        fe?.unsubscribe(), te.current = void 0;
        return;
      }
      const ue = te.current?.subscriptionOptions;
      if (!fe || fe.arg !== U) {
        fe?.unsubscribe();
        const we = V(z(U, {
          subscriptionOptions: H,
          forceRefetch: v,
          ...hb(m[M]) ? {
            initialPageParam: D,
            refetchCachedPages: re
          } : {}
        }));
        te.current = we;
      } else H !== ue && fe.updateSubscriptionOptions(H);
    }, [V, z, v, U, H, he, D, re, M]), [te, V, z, H];
  }
  function x(M, A) {
    return (L, {
      skip: v = !1,
      selectFromResult: P
    } = {}) => {
      const {
        select: O
      } = e.endpoints[M], F = Of(v ? Mn : L), B = b.useRef(void 0), z = b.useMemo(() => (
        // Normally ts-ignores are bad and should be avoided, but we're
        // already casting this selector to be `Selector<any>` anyway,
        // so the inconsistencies don't matter here
        // @ts-ignore
        u([
          // @ts-ignore
          O(F),
          (K, D) => D,
          (K) => F
        ], A, {
          memoizeOptions: {
            resultEqualityCheck: Ns
          }
        })
      ), [O, F]), V = b.useMemo(() => P ? u([z], P, {
        devModeChecks: {
          identityFunctionCheck: "never"
        }
      }) : z, [z, P]), G = o((K) => V(K, B.current), Ns), U = s(), H = z(U.getState(), B.current);
      return z3(() => {
        B.current = H;
      }, [H]), G;
    };
  }
  function $(M) {
    b.useEffect(() => () => {
      g(M), M.current = void 0;
    }, [M]);
  }
  function N(M) {
    if (!M.current) throw new Error(Sn(38));
    return M.current.refetch();
  }
  function C(M) {
    const A = (v, P = {}) => {
      const [O] = _(M, v, P);
      return $(O), b.useMemo(() => ({
        /**
         * A method to manually refetch data for the query
         */
        refetch: () => N(O)
      }), [O]);
    }, I = ({
      refetchOnReconnect: v,
      refetchOnFocus: P,
      pollingInterval: O = 0,
      skipPollingIfUnfocused: F = !1
    } = {}) => {
      const {
        initiate: B
      } = e.endpoints[M], z = r(), [V, G] = b.useState(Nf), U = b.useRef(void 0), H = co({
        refetchOnReconnect: v,
        refetchOnFocus: P,
        pollingInterval: O,
        skipPollingIfUnfocused: F
      });
      f(() => {
        const re = U.current?.subscriptionOptions;
        H !== re && U.current?.updateSubscriptionOptions(H);
      }, [H]);
      const K = b.useRef(H);
      f(() => {
        K.current = H;
      }, [H]);
      const D = b.useCallback(function(re, te = !1) {
        let se;
        return t(() => {
          g(U), U.current = se = z(B(re, {
            subscriptionOptions: K.current,
            forceRefetch: !te
          })), G(re);
        }), se;
      }, [z, B]), Y = b.useCallback(() => {
        U.current?.queryCacheKey && z(e.internalActions.removeQueryResult({
          queryCacheKey: U.current?.queryCacheKey
        }));
      }, [z]);
      return b.useEffect(() => () => {
        g(U);
      }, []), b.useEffect(() => {
        V !== Nf && !U.current && D(V, !0);
      }, [V, D]), b.useMemo(() => [D, V, {
        reset: Y
      }], [D, V, Y]);
    }, L = x(M, w);
    return {
      useQueryState: L,
      useQuerySubscription: A,
      useLazyQuerySubscription: I,
      useLazyQuery(v) {
        const [P, O, {
          reset: F
        }] = I(v), B = L(O, {
          ...v,
          skip: O === Nf
        }), z = b.useMemo(() => ({
          lastArg: O
        }), [O]);
        return b.useMemo(() => [P, {
          ...B,
          reset: F
        }, z], [P, B, F, z]);
      },
      useQuery(v, P) {
        const O = A(v, P), F = L(v, {
          selectFromResult: v === Mn || P?.skip ? void 0 : Nw,
          ...P
        }), B = Lf(F, ...Df);
        return b.useDebugValue(B), b.useMemo(() => ({
          ...F,
          ...O
        }), [F, O]);
      }
    };
  }
  function R(M) {
    const A = (L, v = {}) => {
      const [P, O, F, B] = _(M, L, v), z = b.useRef(B);
      f(() => {
        z.current = B;
      }, [B]);
      const V = v.refetchCachedPages, G = co(V), U = b.useCallback(function(D, Y) {
        let re;
        return t(() => {
          g(P), P.current = re = O(F(D, {
            subscriptionOptions: z.current,
            direction: Y
          }));
        }), re;
      }, [P, O, F]);
      $(P);
      const H = Of(v.skip ? Mn : L), K = b.useCallback((D) => {
        if (!P.current) throw new Error(Sn(38));
        const Y = {
          refetchCachedPages: D?.refetchCachedPages ?? G
        };
        return P.current.refetch(Y);
      }, [P, G]);
      return b.useMemo(() => ({
        trigger: U,
        /**
         * A method to manually refetch data for the query
         */
        refetch: K,
        fetchNextPage: () => U(H, "forward"),
        fetchPreviousPage: () => U(H, "backward")
      }), [K, U, H]);
    }, I = x(M, k);
    return {
      useInfiniteQueryState: I,
      useInfiniteQuerySubscription: A,
      useInfiniteQuery(L, v) {
        const {
          refetch: P,
          fetchNextPage: O,
          fetchPreviousPage: F
        } = A(L, v), B = I(L, {
          selectFromResult: L === Mn || v?.skip ? void 0 : Nw,
          ...v
        }), z = Lf(B, ...Df, "hasNextPage", "hasPreviousPage");
        return b.useDebugValue(z), b.useMemo(() => ({
          ...B,
          fetchNextPage: O,
          fetchPreviousPage: F,
          refetch: P
        }), [B, O, F, P]);
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
        initiate: v
      } = e.endpoints[M], P = r(), [O, F] = b.useState();
      b.useEffect(() => () => {
        O?.arg.fixedCacheKey || O?.reset();
      }, [O]);
      const B = b.useCallback(function(re) {
        const te = P(v(re, {
          fixedCacheKey: I
        }));
        return F(te), te;
      }, [P, v, I]), {
        requestId: z
      } = O || {}, V = b.useMemo(() => L({
        fixedCacheKey: I,
        requestId: O?.requestId
      }), [I, O, L]), G = b.useMemo(() => A ? u([V], A) : V, [A, V]), U = o(G, Ns), H = I == null ? O?.arg.originalArgs : void 0, K = b.useCallback(() => {
        t(() => {
          O && F(void 0), I && P(e.internalActions.removeMutationResult({
            requestId: z,
            fixedCacheKey: I
          }));
        });
      }, [P, I, O, z]), D = Lf(U, ...Df, "endpointName");
      b.useDebugValue(D);
      const Y = b.useMemo(() => ({
        ...U,
        originalArgs: H,
        reset: K
      }), [U, H, K]);
      return b.useMemo(() => [B, Y], [B, Y]);
    };
  }
}
var W3 = /* @__PURE__ */ Symbol(), U3 = ({
  batch: e = Uz,
  hooks: t = {
    useDispatch: nc,
    useSelector: Nn,
    useStore: N0
  },
  createSelector: r = yh,
  unstable__sideEffectsInRender: o = !1,
  ...s
} = {}) => ({
  name: W3,
  init(l, {
    serializeQueryArgs: u
  }, d) {
    const p = l, {
      buildQueryHooks: f,
      buildInfiniteQueryHooks: g,
      buildMutationHook: m,
      usePrefetch: w
    } = B3({
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
    return bs(p, {
      usePrefetch: w
    }), bs(d, {
      batch: e
    }), {
      injectEndpoint(k, S) {
        if (I3(S)) {
          const {
            useQuery: _,
            useLazyQuery: x,
            useLazyQuerySubscription: $,
            useQueryState: N,
            useQuerySubscription: C
          } = f(k);
          bs(p.endpoints[k], {
            useQuery: _,
            useLazyQuery: x,
            useLazyQuerySubscription: $,
            useQueryState: N,
            useQuerySubscription: C
          }), l[`use${Vl(k)}Query`] = _, l[`useLazy${Vl(k)}Query`] = x;
        }
        if (N3(S)) {
          const _ = m(k);
          bs(p.endpoints[k], {
            useMutation: _
          }), l[`use${Vl(k)}Mutation`] = _;
        } else if (hb(S)) {
          const {
            useInfiniteQuery: _,
            useInfiniteQuerySubscription: x,
            useInfiniteQueryState: $
          } = g(k);
          bs(p.endpoints[k], {
            useInfiniteQuery: _,
            useInfiniteQuerySubscription: x,
            useInfiniteQueryState: $
          }), l[`use${Vl(k)}InfiniteQuery`] = _;
        }
      }
    };
  }
}), V3 = /* @__PURE__ */ fb(pb(), U3());
const _r = V3({
  reducerPath: "widget-api",
  tagTypes: ["Messages", "Widgets"],
  baseQuery: c3({ baseUrl: "http://localhost:12553/api" }),
  endpoints: () => ({})
}), Ts = _r.injectEndpoints({
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
  useGetWidgetByIdQuery: H3
} = Ts, Vt = () => {
  const e = b.useContext(O0);
  if (!e)
    throw new Error("useAppEvents must be used within a EventsProvider");
  return e;
}, q3 = _r.injectEndpoints({
  endpoints: (e) => ({
    getAlerts: e.query({
      query: () => ({
        url: "/alerts"
      })
    })
  })
}), K3 = _r.injectEndpoints({
  endpoints: (e) => ({
    getAucFighterSettings: e.query({
      query: () => ({
        url: "/auc-fighter-settings"
      })
    })
  })
}), gb = _r.injectEndpoints({
  endpoints: (e) => ({
    getNotEndedGoal: e.query({
      query: (t) => ({
        params: { ...t },
        url: "/goals"
      })
    })
  })
}), { useGetNotEndedGoalQuery: Q3 } = gb, Eh = _r.injectEndpoints({
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
}), { useGetMessagesInfiniteQuery: G3 } = Eh, Y3 = _r.injectEndpoints({
  endpoints: (e) => ({
    getSettings: e.query({
      query: () => ({
        url: "/settings"
      })
    })
  })
}), J3 = (e) => {
  const t = b.useRef(null), r = Vt(), o = nc(), s = async (l) => {
    const { id: u, scope: d, arg: p } = l.data;
    if (e && u && d && e.manifest.scopes.includes(d))
      try {
        switch (d) {
          case "widgets:messages.subscription":
            r.subscribe(
              ne.Message,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:goal.subscription":
            r.subscribe(ne.Goal, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:settings.subscription":
            r.subscribe(ne.Settings, (f) => {
              f.widget_token = "", t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:goals.read": {
            const { data: f, error: g } = await o(
              gb.endpoints.getNotEndedGoal.initiate(
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
              K3.endpoints.getAucFighterSettings.initiate(
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
              ne.StartAucFighterMatch,
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
              event: ne.AucFighterMatchEnd,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:match-playing.send":
            r.send({
              event: ne.AucFighterMatchPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:pause-match.subscription":
            r.subscribe(
              ne.PauseAucFighterMatch,
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
              event: ne.AucFighterMatchPaused,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:auc-fighter:resume-match.subscription":
            r.subscribe(ne.ResumeAucFighterMatch, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:auc-fighter:cancel-match.subscription":
            r.subscribe(ne.CancelAucFighterMatch, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:auc-fighter:update-match.subscription":
            r.subscribe(
              ne.UpdateAucFighterMatch,
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
              ne.AucFighterSettings,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:messages.read": {
            const f = p, { data: g, error: m } = await o(
              Eh.endpoints.getMessages.initiate(f, {
                initialPageParam: {
                  limit: f.limit,
                  offset: f.offset
                },
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: g?.pages.flat(), error: m },
              "*"
            );
            break;
          }
          case "widgets:alert:played.send":
            r.send({
              event: ne.AlertPlayed,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:playing.send":
            r.send({
              event: ne.AlertPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:replay.subscription":
            r.subscribe(
              ne.ReplayAlert,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:alert:skip.subscription":
            r.subscribe(ne.SkipAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:test.subscription":
            r.subscribe(ne.TestAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:skip-playing.subscription":
            r.subscribe(ne.SkipPlayingAlert, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:alerts.subscription":
            r.subscribe(ne.Alerts, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:settings.read": {
            const { data: f, error: g } = await o(
              Y3.endpoints.getSettings.initiate(void 0, {
                forceRefetch: !0
              })
            );
            f && (f.widget_token = ""), t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: g },
              "*"
            );
            break;
          }
          case "widgets:alerts.read": {
            const { data: f, error: g } = await o(
              q3.endpoints.getAlerts.initiate(void 0, {
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
              event: ne.MediaPlayed,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:replay.subscription":
            r.subscribe(
              ne.ReplayMedia,
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
              ne.MediaSettings,
              (f) => {
                t.current?.contentWindow?.postMessage(
                  { id: u, data: f },
                  "*"
                );
              }
            );
            break;
          case "widgets:media:skip.subscription":
            r.subscribe(ne.SkipMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:skip-playing-media.subscription":
            r.subscribe(ne.SkipPlayingMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:end.subscription":
            r.subscribe(ne.MediaEnd, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:error.subscription":
            r.subscribe(ne.MediaError, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:alert:played.subscription":
            r.subscribe(ne.AlertPlayed, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:pause.subscription":
            r.subscribe(ne.PauseMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:play.subscription":
            r.subscribe(ne.PlayMedia, (f) => {
              t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:media:end.send":
            r.send({
              event: ne.MediaEnd,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:playing.send":
            r.send({
              event: ne.MediaPlaying,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:paused.send":
            r.send({
              event: ne.MediaPaused,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:error.send":
            r.send({
              event: ne.MediaError,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:media:replay.send":
            r.send({
              event: ne.ReplayMedia,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:replay.send":
            r.send({
              event: ne.ReplayAlert,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:alert:skip.send":
            r.send({
              event: ne.SkipAlert,
              data: p
            }), t.current?.contentWindow?.postMessage({ id: u }, "*");
            break;
          case "widgets:view:storage.read":
            {
              const { data: f, error: g } = await o(
                Ts.endpoints.getWidgetById.initiate(
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
              Ts.endpoints.getWidgetById.initiate(
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
              Ts.endpoints.updateWidgetViewStorage.initiate({
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
              Ts.endpoints.updateControlViewStorage.initiate({
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
              ne.WidgetViewStorage,
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
              ne.WidgetControlStorage,
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
  return b.useLayoutEffect(() => (window.addEventListener("message", s), () => {
    window.removeEventListener("message", s);
  }), [s]), t;
}, X3 = ({ type: e }) => {
  const { id: t } = CT(), [r] = m$(), { data: o } = H3({ id: t }), s = J3(o);
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: o && /* @__PURE__ */ j.jsx(
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
}, { palette: Z3 } = sa(), e4 = {
  palette: {
    mode: "dark",
    primary: Z3.augmentColor({
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
}, mb = (e) => {
  switch (e) {
    case yr.UAH:
      return "₴";
    case yr.EUR:
      return "€";
    case yr.RUB:
      return "₽";
    case yr.USD:
      return "$";
    case yr.NONE:
      return "";
  }
}, Wt = ({
  percent: e,
  width: t,
  coefficient: r = 1
}) => `${t / 100 * (e / 100) * r}px`, t4 = (e) => {
  switch (e) {
    case ut.Left:
      return "1fr auto";
    case ut.Right:
      return "auto 1fr";
    default:
      return;
  }
}, n4 = (e) => {
  switch (e) {
    case ut.Top:
      return "1fr auto";
    case ut.Bottom:
      return "auto 1fr";
    default:
      return;
  }
}, r4 = (e) => {
  switch (e) {
    case ut.Top:
      return `"Media"
                    "Text"`;
    case ut.Bottom:
      return `"Text"
                    "Media"`;
    case ut.Left:
      return '"Media Text"';
    case ut.Right:
      return '"Text Media"';
    default:
      return;
  }
}, _s = ({
  alert: e,
  width: t,
  height: r,
  backgroundColor: o,
  base: s,
  text: l,
  children: u,
  videoSrcObject: d,
  isShowVideoElement: p
}) => {
  const f = b.useRef(null), g = e.alert_variant !== Kn.Video && e.alert_variant !== Kn.Audio, m = e.alert_variant === Kn.Video;
  return b.useEffect(() => {
    const w = f.current;
    if (!(!w || !d))
      return w && d && (w.srcObject = d, w.volume = 0, w.play()), () => {
        w.pause(), w.srcObject = null;
      };
  }, [d]), /* @__PURE__ */ j.jsxs(
    "div",
    {
      style: {
        display: "grid",
        height: r,
        width: t,
        backgroundColor: o,
        gridTemplateAreas: r4(e.view_type),
        gridAutoRows: n4(e.view_type),
        gridAutoColumns: t4(e.view_type),
        placeItems: "center",
        gap: 5,
        color: "white",
        fontSize: 25
      },
      children: [
        g && /* @__PURE__ */ j.jsx(
          "div",
          {
            style: {
              gridArea: "Media",
              height: e.view_type === ut.Overlay ? r : "100%",
              width: e.view_type === ut.Overlay ? t : "100%",
              position: e.view_type === ut.Overlay ? "absolute" : void 0,
              backgroundImage: `url(${s}/${e.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain"
            }
          }
        ),
        m && /* @__PURE__ */ j.jsx(
          "video",
          {
            ref: f,
            src: `${s}/${e.video}`,
            style: {
              gridArea: "Media",
              display: p ? "block" : "none",
              height: e.view_type === ut.Overlay ? r : "100%",
              width: e.view_type === ut.Overlay ? t : "100%",
              position: e.view_type === ut.Overlay ? "absolute" : void 0,
              minHeight: 0
            },
            children: /* @__PURE__ */ j.jsx("track", { default: !0, kind: "captions", srcLang: "en" })
          }
        ),
        /* @__PURE__ */ j.jsxs(
          "div",
          {
            style: {
              gridArea: g || m ? "Text" : "Media",
              height: e.view_type === ut.Overlay ? r : "100%",
              width: e.view_type === ut.Overlay ? t : "100%",
              maxWidth: `${t / 100 * 60}px`,
              display: "flex",
              flexDirection: "column",
              placeContent: "center",
              textAlign: "center",
              position: e.view_type === ut.Overlay ? "absolute" : void 0
            },
            children: [
              /* @__PURE__ */ j.jsx(
                "span",
                {
                  style: {
                    display: "block",
                    fontSize: Wt({
                      percent: e.title_style.font_size,
                      width: t,
                      coefficient: e.type === ot.Donation ? 4 : 12
                    }),
                    color: e.title_style.text_color,
                    fontWeight: e.title_style.bold ? "bold" : void 0,
                    fontStyle: e.title_style.italics ? "italic" : void 0,
                    textDecoration: e.title_style.underline ? "underline" : void 0,
                    letterSpacing: Wt({
                      percent: e.title_style.letter_spacing,
                      width: t
                    }),
                    wordSpacing: Wt({
                      percent: e.title_style.word_spacing,
                      width: t
                    })
                  },
                  children: u
                }
              ),
              /* @__PURE__ */ j.jsx(
                "span",
                {
                  style: {
                    display: "block",
                    fontSize: Wt({
                      percent: e.message_style.font_size,
                      width: t,
                      coefficient: e.type === ot.Donation ? 4 : 8
                    }),
                    color: e.message_style.text_color,
                    fontWeight: e.message_style.bold ? "bold" : void 0,
                    fontStyle: e.message_style.italics ? "italic" : void 0,
                    textDecoration: e.message_style.underline ? "underline" : void 0,
                    letterSpacing: Wt({
                      percent: e.message_style.letter_spacing,
                      width: t
                    }),
                    wordSpacing: Wt({
                      percent: e.message_style.word_spacing,
                      width: t
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
  );
}, i4 = ({
  alert: e,
  message: t,
  base: r,
  width: o,
  height: s,
  backgroundColor: l,
  videoSrcObject: u,
  isShowVideoElement: d
}) => {
  const { t: p } = nr();
  switch (t.type) {
    case ot.Donation: {
      const f = t.donation;
      return /* @__PURE__ */ j.jsx(
        _s,
        {
          alert: e,
          text: f.text,
          base: r,
          width: o,
          height: s,
          backgroundColor: l,
          videoSrcObject: u,
          isShowVideoElement: d,
          children: p("message.donated", {
            user_name: f.user_name,
            currency: mb(f.currency),
            amount: f.amount
          })
        }
      );
    }
    case ot.Follow: {
      const f = t.follow;
      return /* @__PURE__ */ j.jsx(
        _s,
        {
          alert: e,
          base: r,
          width: o,
          height: s,
          backgroundColor: l,
          videoSrcObject: u,
          isShowVideoElement: d,
          children: p("message.followed", { user_name: f.user_name })
        }
      );
    }
    case ot.Subscription: {
      const f = t.subscription;
      return /* @__PURE__ */ j.jsx(
        _s,
        {
          alert: e,
          base: r,
          width: o,
          height: s,
          backgroundColor: l,
          videoSrcObject: u,
          isShowVideoElement: d,
          children: f.is_gift ? p("message.gifted_subscriptions", {
            user_name: f.user_name,
            total: f.total
          }) : p("message.subscribed", { user_name: f.user_name })
        }
      );
    }
    case ot.Raid: {
      const f = t.raid;
      return /* @__PURE__ */ j.jsx(
        _s,
        {
          alert: e,
          base: r,
          width: o,
          height: s,
          backgroundColor: l,
          videoSrcObject: u,
          isShowVideoElement: d,
          children: p("message.raided_with", {
            viewers: f.viewers,
            user_name: f.from_broadcaster_user_name
          })
        }
      );
    }
    case ot.Redemption:
      return /* @__PURE__ */ j.jsx(
        _s,
        {
          alert: e,
          base: r,
          width: o,
          height: s,
          backgroundColor: l,
          videoSrcObject: u,
          isShowVideoElement: d,
          children: ""
        }
      );
  }
}, o4 = ({
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
      amount: e.variation_conditions === Ci.AmountIsEqual ? e.amount : e.amount + 1,
      user_name: t,
      played: !1,
      text: r,
      currency: yr.EUR,
      exchanged_amount: 1,
      exchanged_currency: yr.EUR,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
      service: Et.Tribute,
      id: crypto.randomUUID(),
      message_id: s
    },
    follow: {
      user_name: t,
      id: crypto.randomUUID(),
      service_id: crypto.randomUUID(),
      message_id: s,
      service: Et.Twitch,
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
      service: Et.Twitch,
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
      service: Et.Twitch,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)
    }
  };
}, s4 = ({
  redemption: e
}) => {
  const t = {
    font_size: 0,
    text_color: "",
    bold: !1,
    italics: !1,
    underline: !1,
    letter_spacing: 0,
    word_spacing: 0
  };
  return {
    id: e.id,
    audio_volume: e.audio_volume,
    view_type: ut.Top,
    image: e.image,
    audio: e.audio,
    video: e.video,
    type: ot.Redemption,
    video_volume: e.video_volume,
    delay: e.delay,
    duration: e.duration,
    alert_variant: e.alert_variant,
    group_id: "",
    name: e.title,
    variation_conditions: Ci.Random,
    status: !0,
    amount: 0,
    title_style: t,
    message_style: t
  };
}, a4 = ({
  alerts: e,
  message: t
}) => {
  const o = new URLSearchParams(window.location.search).get("group_id"), s = e.filter(
    (d) => d.status && d.group_id === o && d.type == t.type
  ), l = s.filter(
    (d) => d.variation_conditions === Ci.Random
  ), u = t.donation?.amount;
  if (u) {
    const d = s.filter(
      (m) => m.variation_conditions === Ci.AmountIsGreater
    ).sort((m, w) => w.amount - m.amount), f = s.filter(
      (m) => m.variation_conditions === Ci.AmountIsEqual
    ).find((m) => m.amount === u);
    if (f) return f;
    const g = d.find((m) => m.amount < u);
    if (g) return g;
  }
  if (l.length)
    return l[Math.floor(Math.random() * l.length)];
}, Hl = ({
  alerts: e,
  message: t
}) => {
  let r;
  return t.type === ot.Redemption ? t.redemption && (r = s4({
    redemption: t.redemption
  })) : r = a4({
    alerts: e,
    message: t
  }), r;
}, l4 = () => {
  const { t: e } = nr(), t = Vt(), r = b.useRef(new Audio()), o = b.useRef(new Audio()), s = b.useRef(
    document.createElement("video")
  ), l = b.useRef([]), u = b.useRef(null), d = b.useRef([]), [p, f] = b.useState(), [g, m] = b.useState(), [w, k] = b.useState(), [S, _] = b.useState(!0), x = b.useRef(/* @__PURE__ */ new Set()), $ = b.useCallback(
    ({
      message: v,
      duration: P = 3e3
    }) => {
      o.current.pause(), r.current.pause(), s.current.pause(), v && setTimeout(() => {
        t.send({
          event: ne.AlertPlayed,
          data: v.id
        }), d.current = d.current.filter(
          (F) => F.id !== v.id
        );
        const O = d.current.at(0);
        if (f(void 0), O) {
          const F = Hl({
            message: O,
            alerts: l.current
          });
          F && N({ message: O, alert: F });
        }
      }, P);
    },
    []
  ), N = b.useCallback(
    ({ message: v, alert: P }) => {
      if (u.current && !u.current.alert_paused) {
        const O = x.current.has(v.id);
        x.current.delete(v.id), setTimeout(
          () => {
            u.current && d.current.length && (t.send({
              event: ne.AlertPlaying,
              data: v.id
            }), C({ message: v, alert: P }));
          },
          O ? 0 : u.current.moderation_duration
        );
      }
    },
    []
  ), C = b.useCallback(
    ({ message: v, alert: P }) => {
      f(v), m(P), P.alert_variant === Kn.Video ? (s.current.src = `static/${P.video}`, s.current.volume = P.video_volume / 100, s.current.play(), k(s.current.captureStream()), _(!0)) : P.alert_variant === Kn.Audio || P.alert_variant === Kn.ImageAndAudio ? (r.current.src = `static/${P.audio}`, r.current.volume = P.audio_volume / 100, r.current.play()) : P.alert_variant === Kn.Image && $({
        message: v,
        duration: P.duration
      });
    },
    []
  ), R = b.useCallback((v) => {
    const O = new URLSearchParams(window.location.search).get("group_id"), F = l.current.find(
      (z) => z.id === v && z.group_id === O
    );
    if (!F) return;
    const B = o4({
      alert: F,
      userName: e("alert.test_name"),
      text: e("alert.test_text"),
      type: F.type
    });
    B && !d.current.length && u.current && C({ message: B, alert: F });
  }, []), E = b.useCallback(
    (v) => {
      p?.id === v ? $({ message: p, duration: 0 }) : d.current = d.current.filter(
        (P) => P.id !== v
      );
    },
    [$, p]
  ), M = b.useCallback(() => {
    p && $({ message: p, duration: 0 });
  }, [$, p]), A = b.useCallback(
    (v) => {
      const P = Hl({ message: v, alerts: l.current });
      P && (d.current = [...d.current, v], d.current.length === 1 && N({ message: v, alert: P }));
    },
    [N]
  ), I = b.useCallback(
    (v) => {
      const P = Hl({ message: v, alerts: l.current });
      P && (x.current.add(v.id), d.current = [v, ...d.current], d.current.length === 1 && N({ message: v, alert: P }));
    },
    [N]
  ), L = b.useCallback(
    ({ message: v, delay: P = 0 }) => {
      setTimeout(() => {
        _(!1);
        const O = v?.donation?.audio;
        O && u.current && g?.alert_variant !== Kn.Image ? (o.current.src = `static/audio/${O}`, o.current.volume = u.current.tts_volume / 100, o.current.play()) : $({
          message: p,
          duration: g?.duration
        });
      }, P);
    },
    [p, $]
  );
  return b.useEffect(() => (o.current.onended = () => $({
    message: p,
    duration: g?.duration
  }), o.current.onerror = () => $({
    message: p,
    duration: g?.duration
  }), () => {
    o.current.onended = null, o.current.onerror = null;
  }), [p, $]), b.useEffect(() => (r.current.onended = () => L({
    message: p,
    delay: g?.delay
  }), r.current.onerror = () => L({
    message: p,
    delay: g?.delay
  }), () => {
    r.current.onended = null, r.current.onerror = null;
  }), [L]), b.useEffect(() => (s.current.onended = () => L({
    message: p,
    delay: g?.delay
  }), s.current.onerror = () => L({
    message: p,
    delay: g?.delay
  }), () => {
    s.current.onended = null, s.current.onerror = null;
  }), [L]), b.useEffect(() => {
    const v = t.subscribe(
      ne.Alert,
      A
    );
    return () => v();
  }, [A]), b.useEffect(() => {
    const v = t.subscribe(
      ne.Redemption,
      (P) => {
        P.redemption?.type === Hs.Alert && A(P);
      }
    );
    return () => v();
  }, [A]), b.useEffect(() => {
    const v = t.subscribe(
      ne.ReplayAlert,
      I
    );
    return () => v();
  }, [I]), b.useEffect(() => {
    const v = t.subscribe(
      ne.SkipAlert,
      (P) => {
        E(P);
      }
    );
    return () => v();
  }, [E]), b.useEffect(() => {
    const v = t.subscribe(
      ne.TestAlert,
      (P) => {
        R(P);
      }
    );
    return () => v();
  }, [R]), b.useEffect(() => {
    const v = t.subscribe(
      ne.SkipPlayingAlert,
      M
    );
    return () => v();
  }, [M]), b.useEffect(() => {
    const v = t.subscribe(
      ne.Alerts,
      (P) => {
        l.current = P;
      }
    );
    return () => v();
  }, []), b.useEffect(() => {
    const v = t.subscribe(
      ne.Settings,
      (P) => {
        if (u.current?.alert_paused && !P.alert_paused) {
          u.current = P;
          const O = d.current.at(0);
          if (O) {
            const F = Hl({ message: O, alerts: l.current });
            F && N({ message: O, alert: F });
          }
          return;
        }
        u.current = P;
      }
    );
    return () => v();
  }, [N]), {
    currentMessage: p,
    currentAlert: g,
    settings: u.current,
    currentVideoSrcObject: w,
    isShowVideoElement: S
  };
}, u4 = () => {
  const {
    currentAlert: e,
    currentMessage: t,
    currentVideoSrcObject: r,
    isShowVideoElement: o
  } = l4();
  return t && e && /* @__PURE__ */ j.jsx(
    i4,
    {
      alert: e,
      message: t,
      width: window.innerWidth,
      height: window.innerHeight,
      videoSrcObject: r,
      base: "static",
      isShowVideoElement: o
    }
  );
}, c4 = ({
  layout: e,
  currentAmount: t,
  amountRaise: r,
  currentAmountPercent: o,
  currency: s
}) => {
  switch (e) {
    case Si.Percent:
      return `${o}%`;
    case Si.CurrentAmount:
      return `${t} ${s ?? ""}`;
    case Si.CurrentAmountPercent:
      return `${t} ${s ?? ""} (${o}%)`;
    case Si.CurrentAmountRemainingAmount:
      return `${t}/${r} ${s ?? ""}`;
    case Si.CurrentAmountRemainingAmountPercent:
      return `${t}/${r} ${s ?? ""} (${o}%)`;
  }
}, d4 = ({
  goal: e,
  width: t,
  height: r,
  backgroundColor: o,
  currentAmount: s,
  currency: l
}) => {
  const u = Math.floor(
    s / e.amount_raise * 100
  ), d = c4({
    layout: e.progress_bar_layout,
    currentAmount: s,
    amountRaise: e.amount_raise,
    currentAmountPercent: u,
    currency: e.type === gp.Donation ? l : void 0
  }), p = {
    display: "block",
    fontSize: Wt({
      percent: e.title_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.title_style.text_color,
    fontWeight: e.title_style.bold ? "bold" : void 0,
    fontStyle: e.title_style.italics ? "italic" : void 0,
    textDecoration: e.title_style.underline ? "underline" : void 0,
    letterSpacing: Wt({
      percent: e.title_style.letter_spacing,
      width: t
    }),
    wordSpacing: Wt({
      percent: e.title_style.word_spacing,
      width: t
    })
  }, f = {
    display: "block",
    fontSize: Wt({
      percent: e.progress_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.progress_style.text_color,
    fontWeight: e.progress_style.bold ? "bold" : void 0,
    fontStyle: e.progress_style.italics ? "italic" : void 0,
    textDecoration: e.progress_style.underline ? "underline" : void 0,
    letterSpacing: Wt({
      percent: e.progress_style.letter_spacing,
      width: t
    }),
    wordSpacing: Wt({
      percent: e.progress_style.word_spacing,
      width: t
    })
  }, g = {
    display: "block",
    fontSize: Wt({
      percent: e.limits_style.font_size,
      width: t,
      coefficient: 11
    }),
    color: e.limits_style.text_color,
    fontWeight: e.limits_style.bold ? "bold" : void 0,
    fontStyle: e.limits_style.italics ? "italic" : void 0,
    textDecoration: e.limits_style.underline ? "underline" : void 0,
    letterSpacing: Wt({
      percent: e.limits_style.letter_spacing,
      width: t
    }),
    wordSpacing: Wt({
      percent: e.limits_style.word_spacing,
      width: t
    })
  };
  return /* @__PURE__ */ j.jsxs(
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
        e.goal_title_type === Hr.OnTop && /* @__PURE__ */ j.jsx("div", { style: p, children: e.title }),
        e.goal_progress_bar === Hr.OnTop && /* @__PURE__ */ j.jsx("div", { style: f, children: d }),
        /* @__PURE__ */ j.jsxs(
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
              /* @__PURE__ */ j.jsx("div", { style: { position: "absolute", inset: 0 }, children: /* @__PURE__ */ j.jsx(
                "div",
                {
                  style: {
                    height: "100%",
                    background: e.background_bar_color,
                    position: "relative"
                  },
                  children: /* @__PURE__ */ j.jsx(
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
              /* @__PURE__ */ j.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    height: "100%",
                    overflowWrap: "anywhere"
                  },
                  children: [
                    e.goal_title_type === Hr.Inside && /* @__PURE__ */ j.jsx("div", { style: p, children: e.title }),
                    e.goal_progress_bar === Hr.Inside && /* @__PURE__ */ j.jsx("div", { style: f, children: d })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "90%", position: "relative" }, children: [
          e.goal_amount_limits && /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: {
                ...g,
                display: "flex",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ j.jsx("span", { children: "0" }),
                /* @__PURE__ */ j.jsx("span", { children: e.amount_raise })
              ]
            }
          ),
          /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                alignContent: "center",
                overflowWrap: "anywhere"
              },
              children: [
                e.goal_title_type === Hr.Below && /* @__PURE__ */ j.jsx("div", { style: p, children: e.title }),
                e.goal_progress_bar === Hr.Below && /* @__PURE__ */ j.jsx("div", { style: f, children: d })
              ]
            }
          )
        ] })
      ]
    }
  );
}, f4 = () => {
  const e = Vt(), [t, r] = b.useState(), s = new URLSearchParams(window.location.search).get("type"), { data: l } = Q3({ type: s }, { skip: !s }), [u, d] = b.useState();
  return b.useEffect(() => {
    l && r(l);
  }, [l]), b.useEffect(() => {
    const p = e.subscribe(
      ne.Goal,
      (f) => {
        l && f.id === l.id && r(f);
      }
    );
    return () => p();
  }, [l]), b.useEffect(() => {
    const p = e.subscribe(
      ne.Settings,
      (f) => {
        d(f);
      }
    );
    return () => p();
  }, [d]), {
    goal: t,
    settings: u
  };
}, p4 = () => {
  const { goal: e, settings: t } = f4();
  return e && /* @__PURE__ */ j.jsx(
    d4,
    {
      goal: e,
      width: window.innerWidth,
      height: window.innerHeight,
      currentAmount: e.current_amount + e.start_raising,
      currency: t?.currency
    }
  );
}, Ow = (e) => e?.donation?.media || e?.redemption?.media, h4 = () => {
  const e = Vt(), t = b.useRef(null), r = b.useRef(null), o = b.useRef([]), [s, l] = b.useState(), u = b.useCallback(
    ({ message: w }) => {
      if (!w) return;
      e.send({
        event: ne.MediaPlayed,
        data: w.id
      }), o.current = o.current.filter(
        (S) => S.id !== w.id
      );
      const k = o.current.at(0);
      l(void 0), setTimeout(() => {
        k && d({ message: k });
      }, 0);
    },
    []
  ), d = b.useCallback(({ message: w }) => {
    r.current && !r.current.alert_paused && l(w);
  }, []), p = b.useCallback(
    (w) => {
      s?.id === w ? u({ message: s }) : o.current = o.current.filter(
        (k) => k.id !== w
      );
    },
    [u, s]
  ), f = b.useCallback(() => {
    s && u({ message: s });
  }, [u, s]), g = b.useCallback((w) => {
    Ow(w) && (o.current = [...o.current, w], s || d({ message: w }));
  }, []), m = b.useCallback(
    (w) => {
      o.current = [w, ...o.current], s || d({ message: w });
    },
    [d, s]
  );
  return b.useEffect(() => {
    const w = e.subscribe(
      ne.Media,
      g
    );
    return () => w();
  }, [g]), b.useEffect(() => {
    const w = e.subscribe(
      ne.Redemption,
      (k) => {
        k.redemption?.type === Hs.Media && g(k);
      }
    );
    return () => w();
  }, [g]), b.useEffect(() => {
    const w = e.subscribe(
      ne.ReplayMedia,
      m
    );
    return () => w();
  }, [m]), b.useEffect(() => {
    const w = e.subscribe(
      ne.MediaSettings,
      (k) => {
        t.current = k;
      }
    );
    return () => w();
  }, []), b.useEffect(() => {
    const w = e.subscribe(
      ne.Settings,
      (k) => {
        if (r.current?.alert_paused && !k.alert_paused) {
          r.current = k;
          const S = o.current.at(0);
          S && d({ message: S });
          return;
        }
        r.current = k;
      }
    );
    return () => w();
  }, [d]), b.useEffect(() => {
    const w = e.subscribe(
      ne.SkipMedia,
      p
    );
    return () => w();
  }, [p]), b.useEffect(() => {
    const w = e.subscribe(
      ne.SkipPlayingMedia,
      f
    );
    return () => w();
  }, [f]), b.useEffect(() => {
    const w = e.subscribe(
      ne.MediaEnd,
      (k) => {
        const S = o.current.find(
          (_) => _.id === k
        );
        u({ message: S });
      }
    );
    return () => w();
  }, [u]), b.useEffect(() => {
    const w = e.subscribe(
      ne.MediaError,
      (k) => {
        const S = o.current.find(
          (_) => _.id === k
        );
        u({ message: S });
      }
    );
    return () => w();
  }, [u]), {
    messageId: s?.id,
    media: Ow(s),
    mediaSettings: t.current
  };
}, g4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = Vt(), s = b.useRef(null), l = b.useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (u) => {
      switch (u.data.type) {
        case "onStateChange":
          switch (u.data.value) {
            case 0:
              o.send({
                event: ne.MediaEnd,
                data: r
              });
              break;
            case 1:
              o.send({
                event: ne.MediaPlaying,
                data: r
              });
              break;
            case 2:
              o.send({
                event: ne.MediaPaused,
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
            event: ne.MediaError,
            data: r
          });
          break;
      }
    },
    [r, e, o]
  );
  return b.useEffect(() => (window.addEventListener("message", l), () => {
    window.removeEventListener("message", l);
  }), [l]), b.useEffect(() => {
    const u = o.subscribe(
      ne.PauseMedia,
      (d) => {
        r === d && s.current && s.current?.contentWindow?.postMessage(
          { type: "pause", value: null, "x-tiktok-player": !0 },
          "*"
        );
      }
    );
    return () => u();
  }, [r, o]), b.useEffect(() => {
    const u = o.subscribe(
      ne.PlayMedia,
      (d) => {
        r === d && s.current && s.current?.contentWindow?.postMessage(
          { type: "play", value: null, "x-tiktok-player": !0 },
          "*"
        );
      }
    );
    return () => u();
  }, [r, o]), /* @__PURE__ */ j.jsx(
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
}, m4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = b.useRef(null), s = Vt();
  return b.useEffect(() => {
    o.current && (o.current.volume = e.video_volume / 100);
  }, [e]), b.useEffect(() => {
    if (o.current)
      return o.current.onplay = () => {
        s.send({
          event: ne.MediaPlaying,
          data: r
        });
      }, o.current.onended = () => {
        s.send({
          event: ne.MediaEnd,
          data: r
        });
      }, o.current.onpause = () => {
        s.send({
          event: ne.MediaPaused,
          data: r
        });
      }, o.current.onerror = () => {
        s.send({
          event: ne.MediaError,
          data: r
        });
      }, () => {
        o.current && (o.current.onplay = null, o.current.onended = null, o.current.onpause = null, o.current.onerror = null);
      };
  }, [r, s]), b.useEffect(() => {
    const l = s.subscribe(
      ne.PauseMedia,
      (u) => {
        r === u && o.current && o.current.pause();
      }
    );
    return () => l();
  }, [r, s]), b.useEffect(() => {
    const l = s.subscribe(
      ne.PlayMedia,
      (u) => {
        r === u && o.current && o.current.play();
      }
    );
    return () => l();
  }, [r, s]), /* @__PURE__ */ j.jsx(j.Fragment, { children: /* @__PURE__ */ j.jsx(
    "video",
    {
      autoPlay: !0,
      ref: o,
      src: t.temporary_src,
      style: { height: "100%", width: "100%" }
    }
  ) });
};
var Ff, Lw;
function y4() {
  return Lw || (Lw = 1, Ff = function e(t, r) {
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
  }), Ff;
}
var v4 = y4();
const w4 = /* @__PURE__ */ Zr(v4);
var ql = { exports: {} }, jf, Dw;
function S4() {
  if (Dw) return jf;
  Dw = 1;
  var e;
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
  }, jf = e, jf;
}
var Kl = { exports: {} }, zf, Fw;
function b4() {
  if (Fw) return zf;
  Fw = 1, zf = function(s, l, u) {
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
  return zf;
}
var jw;
function _4() {
  return jw || (jw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = b4(), o = s(r);
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
  })(Kl, Kl.exports)), Kl.exports;
}
var Ql = { exports: {} }, Gl = { exports: {} }, Yl = { exports: {} }, Bf, zw;
function x4() {
  if (zw) return Bf;
  zw = 1;
  var e = 1e3, t = e * 60, r = t * 60, o = r * 24, s = o * 365.25;
  Bf = function(f, g) {
    g = g || {};
    var m = typeof f;
    if (m === "string" && f.length > 0)
      return l(f);
    if (m === "number" && isNaN(f) === !1)
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
        var m = parseFloat(g[1]), w = (g[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return m * s;
          case "days":
          case "day":
          case "d":
            return m * o;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return m * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return m * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return m * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return m;
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
  function p(f, g, m) {
    if (!(f < g))
      return f < g * 1.5 ? Math.floor(f / g) + " " + m : Math.ceil(f / g) + " " + m + "s";
  }
  return Bf;
}
var Bw;
function k4() {
  return Bw || (Bw = 1, (function(e, t) {
    t = e.exports = s.debug = s.default = s, t.coerce = p, t.disable = u, t.enable = l, t.enabled = d, t.humanize = x4(), t.names = [], t.skips = [], t.formatters = {};
    var r;
    function o(f) {
      var g = 0, m;
      for (m in f)
        g = (g << 5) - g + f.charCodeAt(m), g |= 0;
      return t.colors[Math.abs(g) % t.colors.length];
    }
    function s(f) {
      function g() {
        if (g.enabled) {
          var m = g, w = +/* @__PURE__ */ new Date(), k = w - (r || w);
          m.diff = k, m.prev = r, m.curr = w, r = w;
          for (var S = new Array(arguments.length), _ = 0; _ < S.length; _++)
            S[_] = arguments[_];
          S[0] = t.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
          var x = 0;
          S[0] = S[0].replace(/%([a-zA-Z%])/g, function(N, C) {
            if (N === "%%") return N;
            x++;
            var R = t.formatters[C];
            if (typeof R == "function") {
              var E = S[x];
              N = R.call(m, E), S.splice(x, 1), x--;
            }
            return N;
          }), t.formatArgs.call(m, S);
          var $ = g.log || t.log || console.log.bind(console);
          $.apply(m, S);
        }
      }
      return g.namespace = f, g.enabled = t.enabled(f), g.useColors = t.useColors(), g.color = o(f), typeof t.init == "function" && t.init(g), g;
    }
    function l(f) {
      t.save(f), t.names = [], t.skips = [];
      for (var g = (typeof f == "string" ? f : "").split(/[\s,]+/), m = g.length, w = 0; w < m; w++)
        g[w] && (f = g[w].replace(/\*/g, ".*?"), f[0] === "-" ? t.skips.push(new RegExp("^" + f.substr(1) + "$")) : t.names.push(new RegExp("^" + f + "$")));
    }
    function u() {
      t.enable("");
    }
    function d(f) {
      var g, m;
      for (g = 0, m = t.skips.length; g < m; g++)
        if (t.skips[g].test(f))
          return !1;
      for (g = 0, m = t.names.length; g < m; g++)
        if (t.names[g].test(f))
          return !0;
      return !1;
    }
    function p(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
  })(Yl, Yl.exports)), Yl.exports;
}
var Ww;
function C4() {
  return Ww || (Ww = 1, (function(e, t) {
    var r = {};
    t = e.exports = k4(), t.log = l, t.formatArgs = s, t.save = u, t.load = d, t.useColors = o, t.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : p(), t.colors = [
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
        var m = "color: " + this.color;
        f.splice(1, 0, m, "color: inherit");
        var w = 0, k = 0;
        f[0].replace(/%[a-zA-Z%]/g, function(S) {
          S !== "%%" && (w++, S === "%c" && (k = w));
        }), f.splice(k, 0, m);
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
  })(Gl, Gl.exports)), Gl.exports;
}
var Jl = { exports: {} }, Uw;
function E4() {
  return Uw || (Uw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["cueVideoById", "loadVideoById", "cueVideoByUrl", "loadVideoByUrl", "playVideo", "pauseVideo", "stopVideo", "getVideoLoadedFraction", "cuePlaylist", "loadPlaylist", "nextVideo", "previousVideo", "playVideoAt", "setShuffle", "setLoop", "getPlaylist", "getPlaylistIndex", "setOption", "mute", "unMute", "isMuted", "setVolume", "getVolume", "seekTo", "getPlayerState", "getPlaybackRate", "setPlaybackRate", "getAvailablePlaybackRates", "getPlaybackQuality", "setPlaybackQuality", "getAvailableQualityLevels", "getCurrentTime", "getDuration", "removeEventListener", "getVideoUrl", "getVideoEmbedCode", "getOptions", "getOption", "addEventListener", "destroy", "setSize", "getIframe"], e.exports = t.default;
  })(Jl, Jl.exports)), Jl.exports;
}
var Xl = { exports: {} }, Vw;
function P4() {
  return Vw || (Vw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["ready", "stateChange", "playbackQualityChange", "playbackRateChange", "error", "apiChange", "volumeChange"], e.exports = t.default;
  })(Xl, Xl.exports)), Xl.exports;
}
var Zl = { exports: {} }, eu = { exports: {} }, Hw;
function R4() {
  return Hw || (Hw = 1, (function(e, t) {
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
  })(eu, eu.exports)), eu.exports;
}
var qw;
function T4() {
  return qw || (qw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = R4(), o = s(r);
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
  })(Zl, Zl.exports)), Zl.exports;
}
var Kw;
function $4() {
  return Kw || (Kw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = C4(), o = g(r), s = E4(), l = g(s), u = P4(), d = g(u), p = T4(), f = g(p);
    function g(k) {
      return k && k.__esModule ? k : { default: k };
    }
    var m = (0, o.default)("youtube-player"), w = {};
    w.proxyEvents = function(k) {
      var S = {}, _ = function(A) {
        var I = "on" + A.slice(0, 1).toUpperCase() + A.slice(1);
        S[I] = function(L) {
          m('event "%s"', I, L), k.trigger(A, L);
        };
      }, x = !0, $ = !1, N = void 0;
      try {
        for (var C = d.default[Symbol.iterator](), R; !(x = (R = C.next()).done); x = !0) {
          var E = R.value;
          _(E);
        }
      } catch (M) {
        $ = !0, N = M;
      } finally {
        try {
          !x && C.return && C.return();
        } finally {
          if ($)
            throw N;
        }
      }
      return S;
    }, w.promisifyPlayer = function(k) {
      var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, _ = {}, x = function(I) {
        S && f.default[I] ? _[I] = function() {
          for (var L = arguments.length, v = Array(L), P = 0; P < L; P++)
            v[P] = arguments[P];
          return k.then(function(O) {
            var F = f.default[I], B = O.getPlayerState(), z = O[I].apply(O, v);
            return F.stateChangeRequired || // eslint-disable-next-line no-extra-parens
            Array.isArray(F.acceptableStates) && F.acceptableStates.indexOf(B) === -1 ? new Promise(function(V) {
              var G = function U() {
                var H = O.getPlayerState(), K = void 0;
                typeof F.timeout == "number" && (K = setTimeout(function() {
                  O.removeEventListener("onStateChange", U), V();
                }, F.timeout)), Array.isArray(F.acceptableStates) && F.acceptableStates.indexOf(H) !== -1 && (O.removeEventListener("onStateChange", U), clearTimeout(K), V());
              };
              O.addEventListener("onStateChange", G);
            }).then(function() {
              return z;
            }) : z;
          });
        } : _[I] = function() {
          for (var L = arguments.length, v = Array(L), P = 0; P < L; P++)
            v[P] = arguments[P];
          return k.then(function(O) {
            return O[I].apply(O, v);
          });
        };
      }, $ = !0, N = !1, C = void 0;
      try {
        for (var R = l.default[Symbol.iterator](), E; !($ = (E = R.next()).done); $ = !0) {
          var M = E.value;
          x(M);
        }
      } catch (A) {
        N = !0, C = A;
      } finally {
        try {
          !$ && R.return && R.return();
        } finally {
          if (N)
            throw C;
        }
      }
      return _;
    }, t.default = w, e.exports = t.default;
  })(Ql, Ql.exports)), Ql.exports;
}
var Qw;
function M4() {
  return Qw || (Qw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(m) {
      return typeof m;
    } : function(m) {
      return m && typeof Symbol == "function" && m.constructor === Symbol && m !== Symbol.prototype ? "symbol" : typeof m;
    }, o = S4(), s = f(o), l = _4(), u = f(l), d = $4(), p = f(d);
    function f(m) {
      return m && m.__esModule ? m : { default: m };
    }
    var g = void 0;
    t.default = function(m) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, S = (0, s.default)();
      if (g || (g = (0, u.default)(S)), w.events)
        throw new Error("Event handlers cannot be overwritten.");
      if (typeof m == "string" && !document.getElementById(m))
        throw new Error('Element "' + m + '" does not exist.');
      w.events = p.default.proxyEvents(S);
      var _ = new Promise(function($) {
        if ((typeof m > "u" ? "undefined" : r(m)) === "object" && m.playVideo instanceof Function) {
          var N = m;
          $(N);
        } else
          g.then(function(C) {
            var R = new C.Player(m, w);
            return S.on("ready", function() {
              $(R);
            }), null;
          });
      }), x = p.default.promisifyPlayer(_, k);
      return x.on = S.on, x.off = S.off, x;
    }, e.exports = t.default;
  })(ql, ql.exports)), ql.exports;
}
var A4 = M4();
const I4 = /* @__PURE__ */ Zr(A4);
var N4 = Object.defineProperty, O4 = Object.defineProperties, L4 = Object.getOwnPropertyDescriptors, Gw = Object.getOwnPropertySymbols, D4 = Object.prototype.hasOwnProperty, F4 = Object.prototype.propertyIsEnumerable, Yw = (e, t, r) => t in e ? N4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Rp = (e, t) => {
  for (var r in t || (t = {}))
    D4.call(t, r) && Yw(e, r, t[r]);
  if (Gw)
    for (var r of Gw(t))
      F4.call(t, r) && Yw(e, r, t[r]);
  return e;
}, Tp = (e, t) => O4(e, L4(t)), j4 = (e, t, r) => new Promise((o, s) => {
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
function z4(e, t) {
  var r, o;
  if (e.videoId !== t.videoId)
    return !0;
  const s = ((r = e.opts) == null ? void 0 : r.playerVars) || {}, l = ((o = t.opts) == null ? void 0 : o.playerVars) || {};
  return s.start !== l.start || s.end !== l.end;
}
function Jw(e = {}) {
  return Tp(Rp({}, e), {
    height: 0,
    width: 0,
    playerVars: Tp(Rp({}, e.playerVars), {
      autoplay: 0,
      start: 0,
      end: 0
    })
  });
}
function B4(e, t) {
  return e.videoId !== t.videoId || !w4(Jw(e.opts), Jw(t.opts));
}
function W4(e, t) {
  var r, o, s, l;
  return e.id !== t.id || e.className !== t.className || ((r = e.opts) == null ? void 0 : r.width) !== ((o = t.opts) == null ? void 0 : o.width) || ((s = e.opts) == null ? void 0 : s.height) !== ((l = t.opts) == null ? void 0 : l.height) || e.iframeClassName !== t.iframeClassName || e.title !== t.title;
}
var U4 = {
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
}, V4 = {
  videoId: Oe.string,
  id: Oe.string,
  className: Oe.string,
  iframeClassName: Oe.string,
  style: Oe.object,
  title: Oe.string,
  loading: Oe.oneOf(["lazy", "eager"]),
  opts: Oe.objectOf(Oe.any),
  onReady: Oe.func,
  onError: Oe.func,
  onPlay: Oe.func,
  onPause: Oe.func,
  onEnd: Oe.func,
  onStateChange: Oe.func,
  onPlaybackRateChange: Oe.func,
  onPlaybackQualityChange: Oe.func
}, cu = class extends Ut.Component {
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
        case cu.PlayerState.ENDED:
          (l = (s = this.props).onEnd) == null || l.call(s, t);
          break;
        case cu.PlayerState.PLAYING:
          (d = (u = this.props).onPlay) == null || d.call(u, t);
          break;
        case cu.PlayerState.PAUSED:
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
      const t = Tp(Rp({}, this.props.opts), {
        videoId: this.props.videoId
      });
      this.internalPlayer = I4(this.container, t), this.internalPlayer.on("ready", this.onPlayerReady), this.internalPlayer.on("error", this.onPlayerError), this.internalPlayer.on("stateChange", this.onPlayerStateChange), this.internalPlayer.on("playbackRateChange", this.onPlayerPlaybackRateChange), this.internalPlayer.on("playbackQualityChange", this.onPlayerPlaybackQualityChange), (this.props.title || this.props.loading) && this.internalPlayer.getIframe().then((r) => {
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
    return j4(this, null, function* () {
      W4(e, this.props) && this.updatePlayer(), B4(e, this.props) && (yield this.resetPlayer()), z4(e, this.props) && this.updateVideo();
    });
  }
  componentWillUnmount() {
    this.destroyPlayer();
  }
  render() {
    return /* @__PURE__ */ Ut.createElement("div", {
      className: this.props.className,
      style: this.props.style
    }, /* @__PURE__ */ Ut.createElement("div", {
      id: this.props.id,
      className: this.props.iframeClassName,
      ref: this.refContainer
    }));
  }
}, dc = cu;
dc.propTypes = V4;
dc.defaultProps = U4;
dc.PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
var H4 = dc;
const q4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = Vt(), [s, l] = b.useState(), u = {
    height: window.innerHeight,
    width: window.innerWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0
    }
  }, d = (w) => {
    o.send({
      event: ne.MediaPlaying,
      data: r
    }), w.target.setVolume(e.video_volume), l(w.target);
  }, p = () => {
    o.send({
      event: ne.MediaError,
      data: r
    });
  }, f = () => {
    o.send({
      event: ne.MediaPlaying,
      data: r
    });
  }, g = () => {
    o.send({
      event: ne.MediaPaused,
      data: r
    });
  }, m = () => {
    o.send({
      event: ne.MediaEnd,
      data: r
    });
  };
  return b.useEffect(() => {
    const w = o.subscribe(
      ne.PauseMedia,
      (k) => {
        r === k && s.pauseVideo();
      }
    );
    return () => w();
  }, [r, s, o]), b.useEffect(() => {
    const w = o.subscribe(
      ne.PlayMedia,
      (k) => {
        r === k && s.playVideo();
      }
    );
    return () => w();
  }, [r, s, o]), /* @__PURE__ */ j.jsx(
    H4,
    {
      videoId: t?.temporary_src,
      opts: u,
      onError: p,
      onReady: d,
      onPlay: f,
      onPause: g,
      onEnd: m
    }
  );
}, K4 = ({
  messageId: e,
  mediaSettings: t,
  media: r
}) => {
  switch (r.media_type) {
    case Kr.Twitch:
      return /* @__PURE__ */ j.jsx(
        m4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.twitch
        }
      );
    case Kr.Youtube:
      return /* @__PURE__ */ j.jsx(
        q4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.youtube
        }
      );
    case Kr.TikTok:
      return /* @__PURE__ */ j.jsx(
        g4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.tiktok
        }
      );
  }
}, Q4 = () => {
  const { media: e, mediaSettings: t, messageId: r } = h4();
  return t && r && e && /* @__PURE__ */ j.jsx("div", { style: { height: "100dvh", width: "100dvw" }, children: K4({
    media: e,
    messageId: r,
    mediaSettings: t
  }) });
}, G4 = () => {
  const e = Vt(), t = b.useRef(void 0), r = b.useRef(null), [o, s] = b.useState();
  return b.useEffect(() => {
    const l = e.subscribe(
      ne.NsfwDetection,
      (u) => {
        o && r.current && u.some(
          (d) => d.confidence >= o.labels_confidence[d.label] / 100
        ) && (r.current.style.display = "block", window.clearTimeout(t.current), t.current = window.setTimeout(() => {
          r.current && (r.current.style.display = "none");
        }, o.blur_timeout_duration));
      }
    );
    return () => {
      l(), window.clearTimeout(t.current);
    };
  }, [e, o]), b.useEffect(() => {
    const l = e.subscribe(
      ne.NsfwSettings,
      (u) => {
        s(u);
      }
    );
    return () => l();
  }, [e]), /* @__PURE__ */ j.jsx(
    ln,
    {
      ref: r,
      sx: {
        background: "black",
        display: "none",
        width: "100vw",
        height: "100vh"
      }
    }
  );
};
class Y4 extends b.Component {
  static propTypes = {
    children: Oe.node.isRequired,
    element: Oe.node,
    hasMore: Oe.bool,
    initialLoad: Oe.bool,
    isReverse: Oe.bool,
    loader: Oe.node,
    loadMore: Oe.func.isRequired,
    pageStart: Oe.number,
    ref: Oe.func,
    getScrollParent: Oe.func,
    threshold: Oe.number,
    useCapture: Oe.bool,
    useWindow: Oe.bool
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
      threshold: m,
      useCapture: w,
      useWindow: k,
      getScrollParent: S,
      ..._
    } = t;
    _.ref = ($) => {
      this.scrollComponent = $, g && g($);
    };
    const x = [r];
    return s && (d ? u ? x.unshift(d) : x.push(d) : this.defaultLoader && (u ? x.unshift(this.defaultLoader) : x.push(this.defaultLoader))), Ut.createElement(o, _, x);
  }
}
const yb = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8"
}), "Replay"), Ph = (e) => {
  switch (e) {
    case Kr.Youtube:
      return "#c4302b";
    case Kr.Twitch:
      return "#9146FF ";
    case Kr.TikTok:
      return "#00f2ea";
  }
}, wa = (e) => {
  switch (e) {
    case ot.Donation:
      return "#ffca28";
    case ot.Subscription:
      return "#FF4500";
    case ot.Follow:
      return "#B2DFDB";
    case ot.Raid:
      return "#00ffbfff";
    case ot.Redemption:
      return "#5C7E8C";
  }
}, J4 = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M6 19h4V5H6zm8-14v14h4V5z"
}), "Pause"), X4 = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M8 5v14l11-7z"
}), "PlayArrow"), Z4 = ei(/* @__PURE__ */ j.jsx("path", {
  d: "m6 18 8.5-6L6 6zM16 6v12h2V6z"
}), "SkipNext");
var du = { exports: {} }, eB = du.exports, Xw;
function tB() {
  return Xw || (Xw = 1, (function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(eB, (function() {
      var r = 1e3, o = 6e4, s = 36e5, l = "millisecond", u = "second", d = "minute", p = "hour", f = "day", g = "week", m = "month", w = "quarter", k = "year", S = "date", _ = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, N = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(B) {
        var z = ["th", "st", "nd", "rd"], V = B % 100;
        return "[" + B + (z[(V - 20) % 10] || z[V] || z[0]) + "]";
      } }, C = function(B, z, V) {
        var G = String(B);
        return !G || G.length >= z ? B : "" + Array(z + 1 - G.length).join(V) + B;
      }, R = { s: C, z: function(B) {
        var z = -B.utcOffset(), V = Math.abs(z), G = Math.floor(V / 60), U = V % 60;
        return (z <= 0 ? "+" : "-") + C(G, 2, "0") + ":" + C(U, 2, "0");
      }, m: function B(z, V) {
        if (z.date() < V.date()) return -B(V, z);
        var G = 12 * (V.year() - z.year()) + (V.month() - z.month()), U = z.clone().add(G, m), H = V - U < 0, K = z.clone().add(G + (H ? -1 : 1), m);
        return +(-(G + (V - U) / (H ? U - K : K - U)) || 0);
      }, a: function(B) {
        return B < 0 ? Math.ceil(B) || 0 : Math.floor(B);
      }, p: function(B) {
        return { M: m, y: k, w: g, d: f, D: S, h: p, m: d, s: u, ms: l, Q: w }[B] || String(B || "").toLowerCase().replace(/s$/, "");
      }, u: function(B) {
        return B === void 0;
      } }, E = "en", M = {};
      M[E] = N;
      var A = "$isDayjsObject", I = function(B) {
        return B instanceof O || !(!B || !B[A]);
      }, L = function B(z, V, G) {
        var U;
        if (!z) return E;
        if (typeof z == "string") {
          var H = z.toLowerCase();
          M[H] && (U = H), V && (M[H] = V, U = H);
          var K = z.split("-");
          if (!U && K.length > 1) return B(K[0]);
        } else {
          var D = z.name;
          M[D] = z, U = D;
        }
        return !G && U && (E = U), U || !G && E;
      }, v = function(B, z) {
        if (I(B)) return B.clone();
        var V = typeof z == "object" ? z : {};
        return V.date = B, V.args = arguments, new O(V);
      }, P = R;
      P.l = L, P.i = I, P.w = function(B, z) {
        return v(B, { locale: z.$L, utc: z.$u, x: z.$x, $offset: z.$offset });
      };
      var O = (function() {
        function B(V) {
          this.$L = L(V.locale, null, !0), this.parse(V), this.$x = this.$x || V.x || {}, this[A] = !0;
        }
        var z = B.prototype;
        return z.parse = function(V) {
          this.$d = (function(G) {
            var U = G.date, H = G.utc;
            if (U === null) return /* @__PURE__ */ new Date(NaN);
            if (P.u(U)) return /* @__PURE__ */ new Date();
            if (U instanceof Date) return new Date(U);
            if (typeof U == "string" && !/Z$/i.test(U)) {
              var K = U.match(x);
              if (K) {
                var D = K[2] - 1 || 0, Y = (K[7] || "0").substring(0, 3);
                return H ? new Date(Date.UTC(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, Y)) : new Date(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, Y);
              }
            }
            return new Date(U);
          })(V), this.init();
        }, z.init = function() {
          var V = this.$d;
          this.$y = V.getFullYear(), this.$M = V.getMonth(), this.$D = V.getDate(), this.$W = V.getDay(), this.$H = V.getHours(), this.$m = V.getMinutes(), this.$s = V.getSeconds(), this.$ms = V.getMilliseconds();
        }, z.$utils = function() {
          return P;
        }, z.isValid = function() {
          return this.$d.toString() !== _;
        }, z.isSame = function(V, G) {
          var U = v(V);
          return this.startOf(G) <= U && U <= this.endOf(G);
        }, z.isAfter = function(V, G) {
          return v(V) < this.startOf(G);
        }, z.isBefore = function(V, G) {
          return this.endOf(G) < v(V);
        }, z.$g = function(V, G, U) {
          return P.u(V) ? this[G] : this.set(U, V);
        }, z.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, z.valueOf = function() {
          return this.$d.getTime();
        }, z.startOf = function(V, G) {
          var U = this, H = !!P.u(G) || G, K = P.p(V), D = function(fe, ue) {
            var we = P.w(U.$u ? Date.UTC(U.$y, ue, fe) : new Date(U.$y, ue, fe), U);
            return H ? we : we.endOf(f);
          }, Y = function(fe, ue) {
            return P.w(U.toDate()[fe].apply(U.toDate("s"), (H ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ue)), U);
          }, re = this.$W, te = this.$M, se = this.$D, le = "set" + (this.$u ? "UTC" : "");
          switch (K) {
            case k:
              return H ? D(1, 0) : D(31, 11);
            case m:
              return H ? D(1, te) : D(0, te + 1);
            case g:
              var de = this.$locale().weekStart || 0, he = (re < de ? re + 7 : re) - de;
              return D(H ? se - he : se + (6 - he), te);
            case f:
            case S:
              return Y(le + "Hours", 0);
            case p:
              return Y(le + "Minutes", 1);
            case d:
              return Y(le + "Seconds", 2);
            case u:
              return Y(le + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, z.endOf = function(V) {
          return this.startOf(V, !1);
        }, z.$set = function(V, G) {
          var U, H = P.p(V), K = "set" + (this.$u ? "UTC" : ""), D = (U = {}, U[f] = K + "Date", U[S] = K + "Date", U[m] = K + "Month", U[k] = K + "FullYear", U[p] = K + "Hours", U[d] = K + "Minutes", U[u] = K + "Seconds", U[l] = K + "Milliseconds", U)[H], Y = H === f ? this.$D + (G - this.$W) : G;
          if (H === m || H === k) {
            var re = this.clone().set(S, 1);
            re.$d[D](Y), re.init(), this.$d = re.set(S, Math.min(this.$D, re.daysInMonth())).$d;
          } else D && this.$d[D](Y);
          return this.init(), this;
        }, z.set = function(V, G) {
          return this.clone().$set(V, G);
        }, z.get = function(V) {
          return this[P.p(V)]();
        }, z.add = function(V, G) {
          var U, H = this;
          V = Number(V);
          var K = P.p(G), D = function(te) {
            var se = v(H);
            return P.w(se.date(se.date() + Math.round(te * V)), H);
          };
          if (K === m) return this.set(m, this.$M + V);
          if (K === k) return this.set(k, this.$y + V);
          if (K === f) return D(1);
          if (K === g) return D(7);
          var Y = (U = {}, U[d] = o, U[p] = s, U[u] = r, U)[K] || 1, re = this.$d.getTime() + V * Y;
          return P.w(re, this);
        }, z.subtract = function(V, G) {
          return this.add(-1 * V, G);
        }, z.format = function(V) {
          var G = this, U = this.$locale();
          if (!this.isValid()) return U.invalidDate || _;
          var H = V || "YYYY-MM-DDTHH:mm:ssZ", K = P.z(this), D = this.$H, Y = this.$m, re = this.$M, te = U.weekdays, se = U.months, le = U.meridiem, de = function(ue, we, _e, qe) {
            return ue && (ue[we] || ue(G, H)) || _e[we].slice(0, qe);
          }, he = function(ue) {
            return P.s(D % 12 || 12, ue, "0");
          }, fe = le || function(ue, we, _e) {
            var qe = ue < 12 ? "AM" : "PM";
            return _e ? qe.toLowerCase() : qe;
          };
          return H.replace($, (function(ue, we) {
            return we || (function(_e) {
              switch (_e) {
                case "YY":
                  return String(G.$y).slice(-2);
                case "YYYY":
                  return P.s(G.$y, 4, "0");
                case "M":
                  return re + 1;
                case "MM":
                  return P.s(re + 1, 2, "0");
                case "MMM":
                  return de(U.monthsShort, re, se, 3);
                case "MMMM":
                  return de(se, re);
                case "D":
                  return G.$D;
                case "DD":
                  return P.s(G.$D, 2, "0");
                case "d":
                  return String(G.$W);
                case "dd":
                  return de(U.weekdaysMin, G.$W, te, 2);
                case "ddd":
                  return de(U.weekdaysShort, G.$W, te, 3);
                case "dddd":
                  return te[G.$W];
                case "H":
                  return String(D);
                case "HH":
                  return P.s(D, 2, "0");
                case "h":
                  return he(1);
                case "hh":
                  return he(2);
                case "a":
                  return fe(D, Y, !0);
                case "A":
                  return fe(D, Y, !1);
                case "m":
                  return String(Y);
                case "mm":
                  return P.s(Y, 2, "0");
                case "s":
                  return String(G.$s);
                case "ss":
                  return P.s(G.$s, 2, "0");
                case "SSS":
                  return P.s(G.$ms, 3, "0");
                case "Z":
                  return K;
              }
              return null;
            })(ue) || K.replace(":", "");
          }));
        }, z.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, z.diff = function(V, G, U) {
          var H, K = this, D = P.p(G), Y = v(V), re = (Y.utcOffset() - this.utcOffset()) * o, te = this - Y, se = function() {
            return P.m(K, Y);
          };
          switch (D) {
            case k:
              H = se() / 12;
              break;
            case m:
              H = se();
              break;
            case w:
              H = se() / 3;
              break;
            case g:
              H = (te - re) / 6048e5;
              break;
            case f:
              H = (te - re) / 864e5;
              break;
            case p:
              H = te / s;
              break;
            case d:
              H = te / o;
              break;
            case u:
              H = te / r;
              break;
            default:
              H = te;
          }
          return U ? H : P.a(H);
        }, z.daysInMonth = function() {
          return this.endOf(m).$D;
        }, z.$locale = function() {
          return M[this.$L];
        }, z.locale = function(V, G) {
          if (!V) return this.$L;
          var U = this.clone(), H = L(V, G, !0);
          return H && (U.$L = H), U;
        }, z.clone = function() {
          return P.w(this.$d, this);
        }, z.toDate = function() {
          return new Date(this.valueOf());
        }, z.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, z.toISOString = function() {
          return this.$d.toISOString();
        }, z.toString = function() {
          return this.$d.toUTCString();
        }, B;
      })(), F = O.prototype;
      return v.prototype = F, [["$ms", l], ["$s", u], ["$m", d], ["$H", p], ["$W", f], ["$M", m], ["$y", k], ["$D", S]].forEach((function(B) {
        F[B[1]] = function(z) {
          return this.$g(z, B[0], B[1]);
        };
      })), v.extend = function(B, z) {
        return B.$i || (B(z, O, v), B.$i = !0), v;
      }, v.locale = L, v.isDayjs = I, v.unix = function(B) {
        return v(1e3 * B);
      }, v.en = M[E], v.Ls = M, v.p = {}, v;
    }));
  })(du)), du.exports;
}
var nB = tB();
const vb = /* @__PURE__ */ Zr(nB);
var fu = { exports: {} }, rB = fu.exports, Zw;
function iB() {
  return Zw || (Zw = 1, (function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(rB, (function() {
      var r, o, s = 1e3, l = 6e4, u = 36e5, d = 864e5, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, f = 31536e6, g = 2628e6, m = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, w = { years: f, months: g, days: d, hours: u, minutes: l, seconds: s, milliseconds: 1, weeks: 6048e5 }, k = function(M) {
        return M instanceof R;
      }, S = function(M, A, I) {
        return new R(M, I, A.$l);
      }, _ = function(M) {
        return o.p(M) + "s";
      }, x = function(M) {
        return M < 0;
      }, $ = function(M) {
        return x(M) ? Math.ceil(M) : Math.floor(M);
      }, N = function(M) {
        return Math.abs(M);
      }, C = function(M, A) {
        return M ? x(M) ? { negative: !0, format: "" + N(M) + A } : { negative: !1, format: "" + M + A } : { negative: !1, format: "" };
      }, R = (function() {
        function M(I, L, v) {
          var P = this;
          if (this.$d = {}, this.$l = v, I === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), L) return S(I * w[_(L)], this);
          if (typeof I == "number") return this.$ms = I, this.parseFromMilliseconds(), this;
          if (typeof I == "object") return Object.keys(I).forEach((function(B) {
            P.$d[_(B)] = I[B];
          })), this.calMilliseconds(), this;
          if (typeof I == "string") {
            var O = I.match(m);
            if (O) {
              var F = O.slice(2).map((function(B) {
                return B != null ? Number(B) : 0;
              }));
              return this.$d.years = F[0], this.$d.months = F[1], this.$d.weeks = F[2], this.$d.days = F[3], this.$d.hours = F[4], this.$d.minutes = F[5], this.$d.seconds = F[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var A = M.prototype;
        return A.calMilliseconds = function() {
          var I = this;
          this.$ms = Object.keys(this.$d).reduce((function(L, v) {
            return L + (I.$d[v] || 0) * w[v];
          }), 0);
        }, A.parseFromMilliseconds = function() {
          var I = this.$ms;
          this.$d.years = $(I / f), I %= f, this.$d.months = $(I / g), I %= g, this.$d.days = $(I / d), I %= d, this.$d.hours = $(I / u), I %= u, this.$d.minutes = $(I / l), I %= l, this.$d.seconds = $(I / s), I %= s, this.$d.milliseconds = I;
        }, A.toISOString = function() {
          var I = C(this.$d.years, "Y"), L = C(this.$d.months, "M"), v = +this.$d.days || 0;
          this.$d.weeks && (v += 7 * this.$d.weeks);
          var P = C(v, "D"), O = C(this.$d.hours, "H"), F = C(this.$d.minutes, "M"), B = this.$d.seconds || 0;
          this.$d.milliseconds && (B += this.$d.milliseconds / 1e3, B = Math.round(1e3 * B) / 1e3);
          var z = C(B, "S"), V = I.negative || L.negative || P.negative || O.negative || F.negative || z.negative, G = O.format || F.format || z.format ? "T" : "", U = (V ? "-" : "") + "P" + I.format + L.format + P.format + G + O.format + F.format + z.format;
          return U === "P" || U === "-P" ? "P0D" : U;
        }, A.toJSON = function() {
          return this.toISOString();
        }, A.format = function(I) {
          var L = I || "YYYY-MM-DDTHH:mm:ss", v = { Y: this.$d.years, YY: o.s(this.$d.years, 2, "0"), YYYY: o.s(this.$d.years, 4, "0"), M: this.$d.months, MM: o.s(this.$d.months, 2, "0"), D: this.$d.days, DD: o.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: o.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: o.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: o.s(this.$d.seconds, 2, "0"), SSS: o.s(this.$d.milliseconds, 3, "0") };
          return L.replace(p, (function(P, O) {
            return O || String(v[P]);
          }));
        }, A.as = function(I) {
          return this.$ms / w[_(I)];
        }, A.get = function(I) {
          var L = this.$ms, v = _(I);
          return v === "milliseconds" ? L %= 1e3 : L = v === "weeks" ? $(L / w[v]) : this.$d[v], L || 0;
        }, A.add = function(I, L, v) {
          var P;
          return P = L ? I * w[_(L)] : k(I) ? I.$ms : S(I, this).$ms, S(this.$ms + P * (v ? -1 : 1), this);
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
      })(), E = function(M, A, I) {
        return M.add(A.years() * I, "y").add(A.months() * I, "M").add(A.days() * I, "d").add(A.hours() * I, "h").add(A.minutes() * I, "m").add(A.seconds() * I, "s").add(A.milliseconds() * I, "ms");
      };
      return function(M, A, I) {
        r = I, o = I().$utils(), I.duration = function(P, O) {
          var F = I.locale();
          return S(P, { $l: F }, O);
        }, I.isDuration = k;
        var L = A.prototype.add, v = A.prototype.subtract;
        A.prototype.add = function(P, O) {
          return k(P) ? E(this, P, 1) : L.bind(this)(P, O);
        }, A.prototype.subtract = function(P, O) {
          return k(P) ? E(this, P, -1) : v.bind(this)(P, O);
        };
      };
    }));
  })(fu)), fu.exports;
}
var oB = iB();
const sB = /* @__PURE__ */ Zr(oB);
vb.extend(sB);
const Eo = ({ createdAt: e }) => {
  const t = vb(e * 1e3);
  return /* @__PURE__ */ j.jsx("span", { style: { fontSize: 12 }, children: t.format("YYYY-MM-DD HH:mm:ss") });
}, wb = ({
  media: e,
  message: t,
  user_name: r
}) => {
  const { pausedMediaId: o } = Nn((l) => l.mediaState), s = Vt();
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: e && /* @__PURE__ */ j.jsxs(
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
        background: Ph(e.media_type)
      },
      children: [
        /* @__PURE__ */ j.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 15,
              right: 15
            },
            children: /* @__PURE__ */ j.jsx(Eo, { createdAt: t.created_at })
          }
        ),
        /* @__PURE__ */ j.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 15,
              left: 15
            },
            children: r
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { position: "relative", display: "grid" }, children: [
          /* @__PURE__ */ j.jsx(
            Ws,
            {
              onClick: () => {
                o === t.id ? s.send({
                  event: ne.PlayMedia,
                  data: t.id
                }) : s.send({
                  event: ne.PauseMedia,
                  data: t.id
                });
              },
              children: o === t.id ? /* @__PURE__ */ j.jsx(X4, { sx: { height: 50, width: 50 } }) : /* @__PURE__ */ j.jsx(J4, { sx: { height: 50, width: 50 } })
            }
          ),
          /* @__PURE__ */ j.jsx(
            Ws,
            {
              style: {
                position: "absolute",
                justifySelf: "center",
                alignSelf: "center",
                left: 70
              },
              onClick: () => {
                s.send({
                  event: ne.SkipMedia,
                  data: t.id
                });
              },
              children: /* @__PURE__ */ j.jsx(Z4, {})
            }
          )
        ] })
      ]
    }
  ) });
}, aB = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  const { t: o } = nr(), s = Vt(), { services: l } = Nn((d) => d.servicesState), u = e.donation;
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: u && /* @__PURE__ */ j.jsxs(
    aa,
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
        r && /* @__PURE__ */ j.jsx(
          wb,
          {
            message: e,
            media: e.donation?.media,
            user_name: e.donation?.user_name
          }
        ),
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: u?.media ? Ph(u.media.media_type) : wa(e.type),
              minHeight: "100%"
            },
            children: u.media && !r && !t && /* @__PURE__ */ j.jsx(
              Ws,
              {
                onClick: () => {
                  s.send({
                    event: ne.ReplayMedia,
                    data: e
                  });
                },
                children: /* @__PURE__ */ j.jsx(yb, {})
              }
            )
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "100%", padding: 15, wordBreak: "break-word" }, children: [
          /* @__PURE__ */ j.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ j.jsx(Eo, { createdAt: e.created_at }) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx(
            xo,
            {
              sx: (d) => ({
                color: d.palette.primary.main
              }),
              children: o("message.donated", {
                user_name: u.user_name,
                currency: mb(u.currency),
                amount: u.amount
              })
            }
          ) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx("span", { children: u.text }) }),
          /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ne.ReplayAlert,
                        data: e
                      });
                    },
                    children: o("message.replay")
                  }
                ),
                /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ne.SkipAlert,
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
        /* @__PURE__ */ j.jsx(
          ln,
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
}, lB = b.memo(aB), uB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = nr(), o = Vt(), { services: s } = Nn((u) => u.servicesState), l = e.follow;
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: l && /* @__PURE__ */ j.jsxs(
    aa,
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
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: wa(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ j.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ j.jsx(Eo, { createdAt: e.created_at }) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx(
            xo,
            {
              sx: (u) => ({
                color: u.palette.primary.main
              }),
              children: r("message.followed", { user_name: l.user_name })
            }
          ) }),
          /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.SkipAlert,
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
        /* @__PURE__ */ j.jsx(
          ln,
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
}, cB = b.memo(uB), dB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = nr(), o = Vt(), { services: s } = Nn((u) => u.servicesState), l = e.raid;
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: l && /* @__PURE__ */ j.jsxs(
    aa,
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
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: wa(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ j.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ j.jsx(Eo, { createdAt: e.created_at }) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx(
            xo,
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
          /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.SkipAlert,
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
        /* @__PURE__ */ j.jsx(
          ln,
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
}, fB = b.memo(dB), pB = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  const { t: o } = nr(), s = Vt(), { services: l } = Nn((d) => d.servicesState), u = e.redemption;
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: u && /* @__PURE__ */ j.jsxs(
    aa,
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
        r && /* @__PURE__ */ j.jsx(
          wb,
          {
            message: e,
            media: e.redemption?.media,
            user_name: e.redemption?.user_name
          }
        ),
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: u?.media ? Ph(u.media.media_type) : wa(e.type),
              minHeight: "100%"
            },
            children: u.media && !r && !t && /* @__PURE__ */ j.jsx(
              Ws,
              {
                onClick: () => {
                  s.send({
                    event: ne.ReplayMedia,
                    data: e
                  });
                },
                children: /* @__PURE__ */ j.jsx(yb, {})
              }
            )
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "100%", padding: 15, wordBreak: "break-word" }, children: [
          /* @__PURE__ */ j.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ j.jsx(Eo, { createdAt: e.created_at }) }),
          /* @__PURE__ */ j.jsx(ln, { sx: { display: "flex", gap: 1 }, children: /* @__PURE__ */ j.jsx(
            xo,
            {
              sx: (d) => ({
                color: d.palette.primary.main
              }),
              children: o("message.redemption", {
                user_name: u.user_name,
                title: u.title,
                cost: u.cost
              })
            }
          ) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx("span", { children: u.user_input }) }),
          u.type === Hs.Alert && /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: {
                display: "grid",
                gridAutoFlow: "column",
                marginTop: 10
              },
              children: [
                !t && /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ne.ReplayAlert,
                        data: e
                      });
                    },
                    children: o("message.replay")
                  }
                ),
                /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      s.send({
                        event: ne.SkipAlert,
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
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: l[u.platform].color,
              minHeight: "100%"
            }
          }
        )
      ]
    }
  ) });
}, hB = b.memo(pB), gB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = nr(), o = Vt(), { services: s } = Nn((u) => u.servicesState), l = e.subscription;
  return /* @__PURE__ */ j.jsx(j.Fragment, { children: l && /* @__PURE__ */ j.jsxs(
    aa,
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
        /* @__PURE__ */ j.jsx(
          ln,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: wa(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ j.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ j.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ j.jsx(Eo, { createdAt: e.created_at }) }),
          /* @__PURE__ */ j.jsx("div", { children: /* @__PURE__ */ j.jsx(
            xo,
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
          /* @__PURE__ */ j.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "start",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.ReplayAlert,
                        data: e
                      });
                    },
                    children: r("message.replay")
                  }
                ),
                /* @__PURE__ */ j.jsx(
                  Xn,
                  {
                    size: "small",
                    sx: {
                      justifySelf: "end",
                      fontSize: 12
                    },
                    onClick: () => {
                      o.send({
                        event: ne.SkipAlert,
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
        /* @__PURE__ */ j.jsx(
          ln,
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
}, mB = b.memo(gB), yB = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  switch (e.type) {
    case ot.Donation:
      return /* @__PURE__ */ j.jsx(
        lB,
        {
          message: e,
          isAlertPlaying: t,
          isMediaPlaying: r
        }
      );
    case ot.Follow:
      return /* @__PURE__ */ j.jsx(cB, { message: e, isAlertPlaying: t });
    case ot.Subscription:
      return /* @__PURE__ */ j.jsx(
        mB,
        {
          message: e,
          isAlertPlaying: t
        }
      );
    case ot.Raid:
      return /* @__PURE__ */ j.jsx(fB, { message: e, isAlertPlaying: t });
    case ot.Redemption:
      return /* @__PURE__ */ j.jsx(
        hB,
        {
          message: e,
          isAlertPlaying: t,
          isMediaPlaying: r
        }
      );
    default:
      return /* @__PURE__ */ j.jsx("div", {});
  }
}, vB = {
  isShowSnackBar: !1,
  snackBarMessage: "",
  alertSeverity: Cu.info
}, wB = An({
  name: "snackBar",
  initialState: vB,
  reducers: {
    showSnackBar: (e, t) => {
      e.alertSeverity = t.payload.alertSeverity, e.isShowSnackBar = !0, e.snackBarMessage = t.payload.message;
    },
    hideSnackBar: (e) => {
      e.isShowSnackBar = !1;
    }
  }
}), { showSnackBar: SB, hideSnackBar: jB } = wB.actions, bB = ei(/* @__PURE__ */ j.jsx("path", {
  d: "M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61"
}), "FilterAlt"), _B = {
  filter: {
    exclude_donations: !1,
    exclude_follows: !1,
    exclude_subscriptions: !1,
    exclude_raids: !1,
    exclude_redemptions: !1
  }
}, Sb = An({
  name: "messages",
  initialState: _B,
  reducers: {
    setFilter: (e, t) => {
      e.filter = t.payload;
    }
  }
}), { setFilter: xB } = Sb.actions, kB = () => {
  const { filter: e } = Nn((p) => p.messagesState), t = nc(), [r, o] = b.useState(null), s = !!r, l = (p) => {
    o(p.currentTarget);
  }, u = () => {
    o(null);
  }, { t: d } = nr();
  return /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    /* @__PURE__ */ j.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ j.jsx(Ws, { onClick: l, children: /* @__PURE__ */ j.jsx(bB, {}) }) }),
    /* @__PURE__ */ j.jsx(RR, { anchorEl: r, open: s, onClose: u, children: /* @__PURE__ */ j.jsx(cR, { children: Object.entries(e).map(([p]) => /* @__PURE__ */ j.jsx(
      IR,
      {
        onClick: () => t(
          xB({
            ...e,
            [p]: !e[p]
          })
        ),
        children: /* @__PURE__ */ j.jsxs("div", { children: [
          /* @__PURE__ */ j.jsx(OP, { checked: e[p] }),
          /* @__PURE__ */ j.jsx("span", { children: d(`filter.${p}`) })
        ] })
      },
      p
    )) }) })
  ] });
}, CB = ({
  useGetMessagesInfiniteQuery: e
}) => {
  const { t } = nr(), { playingAlertId: r } = Nn(
    (m) => m.alertsState
  ), { filter: o } = Nn((m) => m.messagesState), { playingMediaId: s } = Nn((m) => m.mediaState), { data: l, fetchNextPage: u, hasNextPage: d, isFetchingNextPage: p, error: f } = e(
    {
      filter: o
    },
    {
      refetchOnFocus: !1,
      refetchOnMountOrArgChange: !1,
      refetchOnReconnect: !1
    }
  ), g = nc();
  return b.useEffect(() => {
    f && g(
      SB({
        message: f.message,
        alertSeverity: Cu.error
      })
    );
  }, [f, g]), /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    /* @__PURE__ */ j.jsx(kB, {}),
    l?.pages[0].length ? /* @__PURE__ */ j.jsx(
      Y4,
      {
        loadMore: () => u(),
        hasMore: !p && d,
        initialLoad: !1,
        useWindow: !0,
        threshold: 50,
        loader: /* @__PURE__ */ j.jsx("div", { children: t("loading") }, "loader"),
        children: /* @__PURE__ */ j.jsx("div", { children: l.pages.map(
          (m) => m.map((w) => /* @__PURE__ */ j.jsx(b.Fragment, { children: yB({
            message: w,
            isAlertPlaying: w.id === r,
            isMediaPlaying: w.id === s
          }) }, w.id))
        ) })
      }
    ) : /* @__PURE__ */ j.jsx(
      jR,
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
}, EB = () => /* @__PURE__ */ j.jsx(
  ln,
  {
    sx: {
      background: (e) => e.palette.background.default,
      padding: "5px",
      minHeight: "100vh"
    },
    children: /* @__PURE__ */ j.jsx(
      CB,
      {
        useGetMessagesInfiniteQuery: G3
      }
    )
  }
), PB = () => {
  const e = Vt(), [t, r] = b.useState(() => e.connected), { t: o } = nr();
  return b.useEffect(() => {
    const s = (l) => {
      r(l);
    };
    return e.addStatusListener(s), () => {
      e.removeStatusListener(s);
    };
  }, [e]), /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    !t && /* @__PURE__ */ j.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          color: "red"
        },
        children: /* @__PURE__ */ j.jsx(
          xo,
          {
            sx: {
              fontSize: "5vw",
              fontWeight: "bold"
            },
            children: o("disconnected")
          }
        )
      }
    ),
    /* @__PURE__ */ j.jsxs(zT, { children: [
      /* @__PURE__ */ j.jsx(wi, { path: "/alert", element: /* @__PURE__ */ j.jsx(u4, {}) }),
      /* @__PURE__ */ j.jsx(wi, { path: "/media", element: /* @__PURE__ */ j.jsx(Q4, {}) }),
      /* @__PURE__ */ j.jsx(wi, { path: "/goal", element: /* @__PURE__ */ j.jsx(p4, {}) }),
      /* @__PURE__ */ j.jsx(wi, { path: "/nsfw", element: /* @__PURE__ */ j.jsx(G4, {}) }),
      /* @__PURE__ */ j.jsx(wi, { path: "/widget/:id", element: /* @__PURE__ */ j.jsx(X3, { type: "view" }) }),
      /* @__PURE__ */ j.jsx(
        wi,
        {
          path: "/obs-dock-messages",
          element: /* @__PURE__ */ j.jsx(eE, { theme: sa(e4), children: /* @__PURE__ */ j.jsx(EB, {}) })
        }
      )
    ] })
  ] });
}, RB = {
  services: {
    [Et.Streamelements]: {
      active: !1,
      color: "#2701fb",
      authPath: "/streamelements/token"
    },
    [Et.Twitch]: {
      active: !1,
      color: "#9147ff",
      authPath: "/twitch/device-code"
    },
    [Et.WidySol]: {
      active: !1,
      color: "#370161",
      authPath: `/widy/create-donation-account/${Eu.Sol}`
    },
    [Et.WidyTon]: {
      active: !1,
      color: "#0098ea",
      authPath: `/widy/create-donation-account/${Eu.Ton}`
    },
    [Et.DonationAlerts]: {
      active: !1,
      color: "#f57d07",
      authPath: "/donationalerts/token"
    },
    [Et.StreamLabs]: {
      active: !1,
      color: "#80f5d2",
      authPath: "/streamlabs/token"
    },
    [Et.Donatello]: {
      active: !1,
      color: "#3579f6",
      authPath: "/donatello/token"
    },
    [Et.Donatik]: {
      active: !1,
      color: "#7a44ed",
      authPath: "/donatik/token"
    },
    [Et.DonatePay]: {
      active: !1,
      color: "#44ab4f",
      authPath: "/donatepay/token"
    },
    [Et.Destream]: {
      active: !1,
      color: "#f05a00",
      authPath: "/destream/overlay-id"
    },
    [Et.Tribute]: {
      active: !1,
      color: "#2692ffb2",
      authPath: "/tribute/api-key"
    }
  }
}, bb = An({
  name: "services",
  initialState: RB,
  reducers: {
    setServiceActive: (e, t) => {
      e.services[t.payload.service].active = t.payload.active;
    }
  }
}), { setServiceActive: zB } = bb.actions;
var TB = { NODE_ENV: "production" };
const $B = ph({
  mediaState: Z0.reducer,
  alertsState: J0.reducer,
  servicesState: bb.reducer,
  messagesState: Sb.reducer,
  [_r.reducerPath]: _r.reducer
}), MB = (e) => A5({
  reducer: $B,
  middleware: (t) => t().concat(_r.middleware),
  preloadedState: e,
  devTools: TB.NODE_ENV !== "production"
}), xr = MB(), kr = new fh("ws://127.0.0.1:12553/ws");
kr.connect();
kr.subscribe(ne.Message, (e) => {
  xr.dispatch(Eh.util.invalidateTags(["Messages"]));
});
kr.subscribe(ne.AlertPlaying, (e) => {
  xr.dispatch(X0(e));
});
kr.subscribe(ne.MediaPlaying, (e) => {
  xr.dispatch(Sh("")), xr.dispatch(eb(e));
});
kr.subscribe(ne.MediaPaused, (e) => {
  xr.dispatch(Sh(e));
});
kr.subscribe(ne.AlertPlayed, (e) => {
  xr.dispatch(X0(""));
});
kr.subscribe(ne.MediaPlayed, (e) => {
  xr.dispatch(eb("")), xr.dispatch(Sh(""));
});
kr.subscribe(ne.Settings, (e) => {
  jt.changeLanguage(e.language);
});
WR.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ j.jsx(Ut.StrictMode, { children: /* @__PURE__ */ j.jsx(Vz, { context: O0, eventsService: kr, children: /* @__PURE__ */ j.jsx(jz, { store: xr, children: /* @__PURE__ */ j.jsxs(d$, { children: [
    /* @__PURE__ */ j.jsx(zP, {}),
    /* @__PURE__ */ j.jsx(PB, {})
  ] }) }) }) })
);
