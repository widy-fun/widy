function fx(e, t) {
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
function Xr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xd = { exports: {} }, us = {}, Zd = { exports: {} }, Ee = {};
var cy;
function px() {
  if (cy) return Ee;
  cy = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), l = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), f = /* @__PURE__ */ Symbol.for("react.memo"), m = /* @__PURE__ */ Symbol.for("react.lazy"), g = Symbol.iterator;
  function w(D) {
    return D === null || typeof D != "object" ? null : (D = g && D[g] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var C = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, S = Object.assign, b = {};
  function k(D, Y, ne) {
    this.props = D, this.context = Y, this.refs = b, this.updater = ne || C;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(D, Y) {
    if (typeof D != "object" && typeof D != "function" && D != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, D, Y, "setState");
  }, k.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function M() {
  }
  M.prototype = k.prototype;
  function N(D, Y, ne) {
    this.props = D, this.context = Y, this.refs = b, this.updater = ne || C;
  }
  var x = N.prototype = new M();
  x.constructor = N, S(x, k.prototype), x.isPureReactComponent = !0;
  var P = Array.isArray, E = Object.prototype.hasOwnProperty, $ = { current: null }, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function I(D, Y, ne) {
    var te, se = {}, le = null, de = null;
    if (Y != null) for (te in Y.ref !== void 0 && (de = Y.ref), Y.key !== void 0 && (le = "" + Y.key), Y) E.call(Y, te) && !A.hasOwnProperty(te) && (se[te] = Y[te]);
    var he = arguments.length - 2;
    if (he === 1) se.children = ne;
    else if (1 < he) {
      for (var fe = Array(he), ue = 0; ue < he; ue++) fe[ue] = arguments[ue + 2];
      se.children = fe;
    }
    if (D && D.defaultProps) for (te in he = D.defaultProps, he) se[te] === void 0 && (se[te] = he[te]);
    return { $$typeof: e, type: D, key: le, ref: de, props: se, _owner: $.current };
  }
  function L(D, Y) {
    return { $$typeof: e, type: D.type, key: Y, ref: D.ref, props: D.props, _owner: D._owner };
  }
  function v(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function T(D) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(ne) {
      return Y[ne];
    });
  }
  var O = /\/+/g;
  function F(D, Y) {
    return typeof D == "object" && D !== null && D.key != null ? T("" + D.key) : Y.toString(36);
  }
  function B(D, Y, ne, te, se) {
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
    if (de) return de = D, se = se(de), D = te === "" ? "." + F(de, 0) : te, P(se) ? (ne = "", D != null && (ne = D.replace(O, "$&/") + "/"), B(se, Y, ne, "", function(ue) {
      return ue;
    })) : se != null && (v(se) && (se = L(se, ne + (!se.key || de && de.key === se.key ? "" : ("" + se.key).replace(O, "$&/") + "/") + D)), Y.push(se)), 1;
    if (de = 0, te = te === "" ? "." : te + ":", P(D)) for (var he = 0; he < D.length; he++) {
      le = D[he];
      var fe = te + F(le, he);
      de += B(le, Y, ne, fe, se);
    }
    else if (fe = w(D), typeof fe == "function") for (D = fe.call(D), he = 0; !(le = D.next()).done; ) le = le.value, fe = te + F(le, he++), de += B(le, Y, ne, fe, se);
    else if (le === "object") throw Y = String(D), Error("Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead.");
    return de;
  }
  function j(D, Y, ne) {
    if (D == null) return D;
    var te = [], se = 0;
    return B(D, te, "", "", function(le) {
      return Y.call(ne, le, se++);
    }), te;
  }
  function V(D) {
    if (D._status === -1) {
      var Y = D._result;
      Y = Y(), Y.then(function(ne) {
        (D._status === 0 || D._status === -1) && (D._status = 1, D._result = ne);
      }, function(ne) {
        (D._status === 0 || D._status === -1) && (D._status = 2, D._result = ne);
      }), D._status === -1 && (D._status = 0, D._result = Y);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var G = { current: null }, U = { transition: null }, H = { ReactCurrentDispatcher: G, ReactCurrentBatchConfig: U, ReactCurrentOwner: $ };
  function K() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Ee.Children = { map: j, forEach: function(D, Y, ne) {
    j(D, function() {
      Y.apply(this, arguments);
    }, ne);
  }, count: function(D) {
    var Y = 0;
    return j(D, function() {
      Y++;
    }), Y;
  }, toArray: function(D) {
    return j(D, function(Y) {
      return Y;
    }) || [];
  }, only: function(D) {
    if (!v(D)) throw Error("React.Children.only expected to receive a single React element child.");
    return D;
  } }, Ee.Component = k, Ee.Fragment = r, Ee.Profiler = s, Ee.PureComponent = N, Ee.StrictMode = o, Ee.Suspense = p, Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H, Ee.act = K, Ee.cloneElement = function(D, Y, ne) {
    if (D == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + D + ".");
    var te = S({}, D.props), se = D.key, le = D.ref, de = D._owner;
    if (Y != null) {
      if (Y.ref !== void 0 && (le = Y.ref, de = $.current), Y.key !== void 0 && (se = "" + Y.key), D.type && D.type.defaultProps) var he = D.type.defaultProps;
      for (fe in Y) E.call(Y, fe) && !A.hasOwnProperty(fe) && (te[fe] = Y[fe] === void 0 && he !== void 0 ? he[fe] : Y[fe]);
    }
    var fe = arguments.length - 2;
    if (fe === 1) te.children = ne;
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
    return { $$typeof: m, _payload: { _status: -1, _result: D }, _init: V };
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
  }, Ee.useImperativeHandle = function(D, Y, ne) {
    return G.current.useImperativeHandle(D, Y, ne);
  }, Ee.useInsertionEffect = function(D, Y) {
    return G.current.useInsertionEffect(D, Y);
  }, Ee.useLayoutEffect = function(D, Y) {
    return G.current.useLayoutEffect(D, Y);
  }, Ee.useMemo = function(D, Y) {
    return G.current.useMemo(D, Y);
  }, Ee.useReducer = function(D, Y, ne) {
    return G.current.useReducer(D, Y, ne);
  }, Ee.useRef = function(D) {
    return G.current.useRef(D);
  }, Ee.useState = function(D) {
    return G.current.useState(D);
  }, Ee.useSyncExternalStore = function(D, Y, ne) {
    return G.current.useSyncExternalStore(D, Y, ne);
  }, Ee.useTransition = function() {
    return G.current.useTransition();
  }, Ee.version = "18.3.1", Ee;
}
var dy;
function Ou() {
  return dy || (dy = 1, Zd.exports = px()), Zd.exports;
}
var fy;
function hx() {
  if (fy) return us;
  fy = 1;
  var e = Ou(), t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(d, p, f) {
    var m, g = {}, w = null, C = null;
    f !== void 0 && (w = "" + f), p.key !== void 0 && (w = "" + p.key), p.ref !== void 0 && (C = p.ref);
    for (m in p) o.call(p, m) && !l.hasOwnProperty(m) && (g[m] = p[m]);
    if (d && d.defaultProps) for (m in p = d.defaultProps, p) g[m] === void 0 && (g[m] = p[m]);
    return { $$typeof: t, type: d, key: w, ref: C, props: g, _owner: s.current };
  }
  return us.Fragment = r, us.jsx = u, us.jsxs = u, us;
}
var py;
function gx() {
  return py || (py = 1, Xd.exports = hx()), Xd.exports;
}
var z = gx();
const Ns = {
  black: "#000",
  white: "#fff"
}, no = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, ro = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, io = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, oo = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, so = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
}, cs = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, mx = {
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
function ki(e, ...t) {
  const r = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((o) => r.searchParams.append("args[]", o)), `Minified MUI error #${e}; visit ${r} for the full message.`;
}
const qn = "$$material";
function lu() {
  return lu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) ({}).hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, lu.apply(null, arguments);
}
var _ = Ou();
const Ut = /* @__PURE__ */ Xr(_), zf = /* @__PURE__ */ fx({
  __proto__: null,
  default: Ut
}, [_]);
function yx(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function vx(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var wx = /* @__PURE__ */ (function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(vx(this));
    var s = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var l = yx(s);
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
})(), Lt = "-ms-", uu = "-moz-", Ae = "-webkit-", Gw = "comm", Rp = "rule", Tp = "decl", Sx = "@import", Yw = "@keyframes", bx = "@layer", _x = Math.abs, Lu = String.fromCharCode, xx = Object.assign;
function kx(e, t) {
  return Ct(e, 0) ^ 45 ? (((t << 2 ^ Ct(e, 0)) << 2 ^ Ct(e, 1)) << 2 ^ Ct(e, 2)) << 2 ^ Ct(e, 3) : 0;
}
function Jw(e) {
  return e.trim();
}
function Cx(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ie(e, t, r) {
  return e.replace(t, r);
}
function Bf(e, t) {
  return e.indexOf(t);
}
function Ct(e, t) {
  return e.charCodeAt(t) | 0;
}
function Os(e, t, r) {
  return e.slice(t, r);
}
function Wn(e) {
  return e.length;
}
function $p(e) {
  return e.length;
}
function _l(e, t) {
  return t.push(e), e;
}
function Ex(e, t) {
  return e.map(t).join("");
}
var Du = 1, mo = 1, Xw = 0, Jt = 0, lt = 0, So = "";
function Fu(e, t, r, o, s, l, u) {
  return { value: e, root: t, parent: r, type: o, props: s, children: l, line: Du, column: mo, length: u, return: "" };
}
function ds(e, t) {
  return xx(Fu("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Px() {
  return lt;
}
function Rx() {
  return lt = Jt > 0 ? Ct(So, --Jt) : 0, mo--, lt === 10 && (mo = 1, Du--), lt;
}
function sn() {
  return lt = Jt < Xw ? Ct(So, Jt++) : 0, mo++, lt === 10 && (mo = 1, Du++), lt;
}
function Kn() {
  return Ct(So, Jt);
}
function Yl() {
  return Jt;
}
function Ks(e, t) {
  return Os(So, e, t);
}
function Ls(e) {
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
function Zw(e) {
  return Du = mo = 1, Xw = Wn(So = e), Jt = 0, [];
}
function eS(e) {
  return So = "", e;
}
function Jl(e) {
  return Jw(Ks(Jt - 1, Wf(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Tx(e) {
  for (; (lt = Kn()) && lt < 33; )
    sn();
  return Ls(e) > 2 || Ls(lt) > 3 ? "" : " ";
}
function $x(e, t) {
  for (; --t && sn() && !(lt < 48 || lt > 102 || lt > 57 && lt < 65 || lt > 70 && lt < 97); )
    ;
  return Ks(e, Yl() + (t < 6 && Kn() == 32 && sn() == 32));
}
function Wf(e) {
  for (; sn(); )
    switch (lt) {
      // ] ) " '
      case e:
        return Jt;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Wf(lt);
        break;
      // (
      case 40:
        e === 41 && Wf(e);
        break;
      // \
      case 92:
        sn();
        break;
    }
  return Jt;
}
function Mx(e, t) {
  for (; sn() && e + lt !== 57; )
    if (e + lt === 84 && Kn() === 47)
      break;
  return "/*" + Ks(t, Jt - 1) + "*" + Lu(e === 47 ? e : sn());
}
function Ax(e) {
  for (; !Ls(Kn()); )
    sn();
  return Ks(e, Jt);
}
function Ix(e) {
  return eS(Xl("", null, null, null, [""], e = Zw(e), 0, [0], e));
}
function Xl(e, t, r, o, s, l, u, d, p) {
  for (var f = 0, m = 0, g = u, w = 0, C = 0, S = 0, b = 1, k = 1, M = 1, N = 0, x = "", P = s, E = l, $ = o, A = x; k; )
    switch (S = N, N = sn()) {
      // (
      case 40:
        if (S != 108 && Ct(A, g - 1) == 58) {
          Bf(A += Ie(Jl(N), "&", "&\f"), "&\f") != -1 && (M = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        A += Jl(N);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        A += Tx(S);
        break;
      // \
      case 92:
        A += $x(Yl() - 1, 7);
        continue;
      // /
      case 47:
        switch (Kn()) {
          case 42:
          case 47:
            _l(Nx(Mx(sn(), Yl()), t, r), p);
            break;
          default:
            A += "/";
        }
        break;
      // {
      case 123 * b:
        d[f++] = Wn(A) * M;
      // } ; \0
      case 125 * b:
      case 59:
      case 0:
        switch (N) {
          // \0 }
          case 0:
          case 125:
            k = 0;
          // ;
          case 59 + m:
            M == -1 && (A = Ie(A, /\f/g, "")), C > 0 && Wn(A) - g && _l(C > 32 ? gy(A + ";", o, r, g - 1) : gy(Ie(A, " ", "") + ";", o, r, g - 2), p);
            break;
          // @ ;
          case 59:
            A += ";";
          // { rule/at-rule
          default:
            if (_l($ = hy(A, t, r, f, m, s, d, x, P = [], E = [], g), l), N === 123)
              if (m === 0)
                Xl(A, t, $, $, P, l, g, d, E);
              else
                switch (w === 99 && Ct(A, 3) === 110 ? 100 : w) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Xl(e, $, $, o && _l(hy(e, $, $, 0, 0, s, d, x, s, P = [], g), E), s, E, g, d, o ? P : E);
                    break;
                  default:
                    Xl(A, $, $, $, [""], E, 0, d, E);
                }
        }
        f = m = C = 0, b = M = 1, x = A = "", g = u;
        break;
      // :
      case 58:
        g = 1 + Wn(A), C = S;
      default:
        if (b < 1) {
          if (N == 123)
            --b;
          else if (N == 125 && b++ == 0 && Rx() == 125)
            continue;
        }
        switch (A += Lu(N), N * b) {
          // &
          case 38:
            M = m > 0 ? 1 : (A += "\f", -1);
            break;
          // ,
          case 44:
            d[f++] = (Wn(A) - 1) * M, M = 1;
            break;
          // @
          case 64:
            Kn() === 45 && (A += Jl(sn())), w = Kn(), m = g = Wn(x = A += Ax(Yl())), N++;
            break;
          // -
          case 45:
            S === 45 && Wn(A) == 2 && (b = 0);
        }
    }
  return l;
}
function hy(e, t, r, o, s, l, u, d, p, f, m) {
  for (var g = s - 1, w = s === 0 ? l : [""], C = $p(w), S = 0, b = 0, k = 0; S < o; ++S)
    for (var M = 0, N = Os(e, g + 1, g = _x(b = u[S])), x = e; M < C; ++M)
      (x = Jw(b > 0 ? w[M] + " " + N : Ie(N, /&\f/g, w[M]))) && (p[k++] = x);
  return Fu(e, t, r, s === 0 ? Rp : d, p, f, m);
}
function Nx(e, t, r) {
  return Fu(e, t, r, Gw, Lu(Px()), Os(e, 2, -2), 0);
}
function gy(e, t, r, o) {
  return Fu(e, t, r, Tp, Os(e, 0, o), Os(e, o + 1, -1), o);
}
function co(e, t) {
  for (var r = "", o = $p(e), s = 0; s < o; s++)
    r += t(e[s], s, e, t) || "";
  return r;
}
function Ox(e, t, r, o) {
  switch (e.type) {
    case bx:
      if (e.children.length) break;
    case Sx:
    case Tp:
      return e.return = e.return || e.value;
    case Gw:
      return "";
    case Yw:
      return e.return = e.value + "{" + co(e.children, o) + "}";
    case Rp:
      e.value = e.props.join(",");
  }
  return Wn(r = co(e.children, o)) ? e.return = e.value + "{" + r + "}" : "";
}
function Lx(e) {
  var t = $p(e);
  return function(r, o, s, l) {
    for (var u = "", d = 0; d < t; d++)
      u += e[d](r, o, s, l) || "";
    return u;
  };
}
function Dx(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function tS(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var Fx = function(t, r, o) {
  for (var s = 0, l = 0; s = l, l = Kn(), s === 38 && l === 12 && (r[o] = 1), !Ls(l); )
    sn();
  return Ks(t, Jt);
}, jx = function(t, r) {
  var o = -1, s = 44;
  do
    switch (Ls(s)) {
      case 0:
        s === 38 && Kn() === 12 && (r[o] = 1), t[o] += Fx(Jt - 1, r, o);
        break;
      case 2:
        t[o] += Jl(s);
        break;
      case 4:
        if (s === 44) {
          t[++o] = Kn() === 58 ? "&\f" : "", r[o] = t[o].length;
          break;
        }
      // fallthrough
      default:
        t[o] += Lu(s);
    }
  while (s = sn());
  return t;
}, zx = function(t, r) {
  return eS(jx(Zw(t), r));
}, my = /* @__PURE__ */ new WeakMap(), Bx = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, o = t.parent, s = t.column === o.column && t.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !my.get(o)) && !s) {
      my.set(t, !0);
      for (var l = [], u = zx(r, l), d = o.props, p = 0, f = 0; p < u.length; p++)
        for (var m = 0; m < d.length; m++, f++)
          t.props[f] = l[p] ? u[p].replace(/&\f/g, d[m]) : d[m] + " " + u[p];
    }
  }
}, Wx = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function nS(e, t) {
  switch (kx(e, t)) {
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
      return Ae + e + uu + e + Lt + e + e;
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
      if (Wn(e) - 1 - t > 6) switch (Ct(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Ct(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return Ie(e, /(.+:)(.+)-([^]+)/, "$1" + Ae + "$2-$3$1" + uu + (Ct(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Bf(e, "stretch") ? nS(Ie(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (Ct(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Ct(e, Wn(e) - 3 - (~Bf(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return Ie(e, ":", ":" + Ae) + e;
        // (inline-)?fl(e)x
        case 101:
          return Ie(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ae + (Ct(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ae + "$2$3$1" + Lt + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (Ct(e, t + 11)) {
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
var Ux = function(t, r, o, s) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Tp:
      t.return = nS(t.value, t.length);
      break;
    case Yw:
      return co([ds(t, {
        value: Ie(t.value, "@", "@" + Ae)
      })], s);
    case Rp:
      if (t.length) return Ex(t.props, function(l) {
        switch (Cx(l, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return co([ds(t, {
              props: [Ie(l, /:(read-\w+)/, ":" + uu + "$1")]
            })], s);
          // :placeholder
          case "::placeholder":
            return co([ds(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + Ae + "input-$1")]
            }), ds(t, {
              props: [Ie(l, /:(plac\w+)/, ":" + uu + "$1")]
            }), ds(t, {
              props: [Ie(l, /:(plac\w+)/, Lt + "input-$1")]
            })], s);
        }
        return "";
      });
  }
}, Vx = [Ux], Hx = function(t) {
  var r = t.key;
  if (r === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(b) {
      var k = b.getAttribute("data-emotion");
      k.indexOf(" ") !== -1 && (document.head.appendChild(b), b.setAttribute("data-s", ""));
    });
  }
  var s = t.stylisPlugins || Vx, l = {}, u, d = [];
  u = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(b) {
      for (var k = b.getAttribute("data-emotion").split(" "), M = 1; M < k.length; M++)
        l[k[M]] = !0;
      d.push(b);
    }
  );
  var p, f = [Bx, Wx];
  {
    var m, g = [Ox, Dx(function(b) {
      m.insert(b);
    })], w = Lx(f.concat(s, g)), C = function(k) {
      return co(Ix(k), w);
    };
    p = function(k, M, N, x) {
      m = N, C(k ? k + "{" + M.styles + "}" : M.styles), x && (S.inserted[M.name] = !0);
    };
  }
  var S = {
    key: r,
    sheet: new wx({
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
}, ef = { exports: {} }, Ne = {};
var yy;
function qx() {
  if (yy) return Ne;
  yy = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, o = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, s = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, l = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, u = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, d = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, p = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, f = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, m = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, g = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, w = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, C = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, S = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, b = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, k = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, M = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, N = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function x(E) {
    if (typeof E == "object" && E !== null) {
      var $ = E.$$typeof;
      switch ($) {
        case t:
          switch (E = E.type, E) {
            case p:
            case f:
            case o:
            case l:
            case s:
            case g:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case d:
                case m:
                case S:
                case C:
                case u:
                  return E;
                default:
                  return $;
              }
          }
        case r:
          return $;
      }
    }
  }
  function P(E) {
    return x(E) === f;
  }
  return Ne.AsyncMode = p, Ne.ConcurrentMode = f, Ne.ContextConsumer = d, Ne.ContextProvider = u, Ne.Element = t, Ne.ForwardRef = m, Ne.Fragment = o, Ne.Lazy = S, Ne.Memo = C, Ne.Portal = r, Ne.Profiler = l, Ne.StrictMode = s, Ne.Suspense = g, Ne.isAsyncMode = function(E) {
    return P(E) || x(E) === p;
  }, Ne.isConcurrentMode = P, Ne.isContextConsumer = function(E) {
    return x(E) === d;
  }, Ne.isContextProvider = function(E) {
    return x(E) === u;
  }, Ne.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, Ne.isForwardRef = function(E) {
    return x(E) === m;
  }, Ne.isFragment = function(E) {
    return x(E) === o;
  }, Ne.isLazy = function(E) {
    return x(E) === S;
  }, Ne.isMemo = function(E) {
    return x(E) === C;
  }, Ne.isPortal = function(E) {
    return x(E) === r;
  }, Ne.isProfiler = function(E) {
    return x(E) === l;
  }, Ne.isStrictMode = function(E) {
    return x(E) === s;
  }, Ne.isSuspense = function(E) {
    return x(E) === g;
  }, Ne.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === o || E === f || E === l || E === s || E === g || E === w || typeof E == "object" && E !== null && (E.$$typeof === S || E.$$typeof === C || E.$$typeof === u || E.$$typeof === d || E.$$typeof === m || E.$$typeof === k || E.$$typeof === M || E.$$typeof === N || E.$$typeof === b);
  }, Ne.typeOf = x, Ne;
}
var vy;
function Kx() {
  return vy || (vy = 1, ef.exports = qx()), ef.exports;
}
var tf, wy;
function Qx() {
  if (wy) return tf;
  wy = 1;
  var e = Kx(), t = {
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
  var d = Object.defineProperty, p = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols, m = Object.getOwnPropertyDescriptor, g = Object.getPrototypeOf, w = Object.prototype;
  function C(S, b, k) {
    if (typeof b != "string") {
      if (w) {
        var M = g(b);
        M && M !== w && C(S, M, k);
      }
      var N = p(b);
      f && (N = N.concat(f(b)));
      for (var x = u(S), P = u(b), E = 0; E < N.length; ++E) {
        var $ = N[E];
        if (!r[$] && !(k && k[$]) && !(P && P[$]) && !(x && x[$])) {
          var A = m(b, $);
          try {
            d(S, $, A);
          } catch {
          }
        }
      }
    }
    return S;
  }
  return tf = C, tf;
}
Qx();
var Gx = !0;
function rS(e, t, r) {
  var o = "";
  return r.split(" ").forEach(function(s) {
    e[s] !== void 0 ? t.push(e[s] + ";") : s && (o += s + " ");
  }), o;
}
var Mp = function(t, r, o) {
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
  Gx === !1) && t.registered[s] === void 0 && (t.registered[s] = r.styles);
}, Ap = function(t, r, o) {
  Mp(t, r, o);
  var s = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var l = r;
    do
      t.insert(r === l ? "." + s : "", l, t.sheet, !0), l = l.next;
    while (l !== void 0);
  }
};
function Yx(e) {
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
var Jx = {
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
}, Xx = /[A-Z]|^ms/g, Zx = /_EMO_([^_]+?)_([^]*?)_EMO_/g, iS = function(t) {
  return t.charCodeAt(1) === 45;
}, Sy = function(t) {
  return t != null && typeof t != "boolean";
}, nf = /* @__PURE__ */ tS(function(e) {
  return iS(e) ? e : e.replace(Xx, "-$&").toLowerCase();
}), by = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(Zx, function(o, s, l) {
          return Un = {
            name: s,
            styles: l,
            next: Un
          }, s;
        });
  }
  return Jx[t] !== 1 && !iS(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
function Ds(e, t, r) {
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
        return Un = {
          name: s.name,
          styles: s.styles,
          next: Un
        }, s.name;
      var l = r;
      if (l.styles !== void 0) {
        var u = l.next;
        if (u !== void 0)
          for (; u !== void 0; )
            Un = {
              name: u.name,
              styles: u.styles,
              next: Un
            }, u = u.next;
        var d = l.styles + ";";
        return d;
      }
      return e1(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var p = Un, f = r(e);
        return Un = p, Ds(e, t, f);
      }
      break;
    }
  }
  var m = r;
  if (t == null)
    return m;
  var g = t[m];
  return g !== void 0 ? g : m;
}
function e1(e, t, r) {
  var o = "";
  if (Array.isArray(r))
    for (var s = 0; s < r.length; s++)
      o += Ds(e, t, r[s]) + ";";
  else
    for (var l in r) {
      var u = r[l];
      if (typeof u != "object") {
        var d = u;
        t != null && t[d] !== void 0 ? o += l + "{" + t[d] + "}" : Sy(d) && (o += nf(l) + ":" + by(l, d) + ";");
      } else if (Array.isArray(u) && typeof u[0] == "string" && (t == null || t[u[0]] === void 0))
        for (var p = 0; p < u.length; p++)
          Sy(u[p]) && (o += nf(l) + ":" + by(l, u[p]) + ";");
      else {
        var f = Ds(e, t, u);
        switch (l) {
          case "animation":
          case "animationName": {
            o += nf(l) + ":" + f + ";";
            break;
          }
          default:
            o += l + "{" + f + "}";
        }
      }
    }
  return o;
}
var _y = /label:\s*([^\s;{]+)\s*(;|$)/g, Un;
function Qs(e, t, r) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, s = "";
  Un = void 0;
  var l = e[0];
  if (l == null || l.raw === void 0)
    o = !1, s += Ds(r, t, l);
  else {
    var u = l;
    s += u[0];
  }
  for (var d = 1; d < e.length; d++)
    if (s += Ds(r, t, e[d]), o) {
      var p = l;
      s += p[d];
    }
  _y.lastIndex = 0;
  for (var f = "", m; (m = _y.exec(s)) !== null; )
    f += "-" + m[1];
  var g = Yx(s) + f;
  return {
    name: g,
    styles: s,
    next: Un
  };
}
var t1 = function(t) {
  return t();
}, oS = zf.useInsertionEffect ? zf.useInsertionEffect : !1, sS = oS || t1, xy = oS || _.useLayoutEffect, aS = /* @__PURE__ */ _.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Hx({
    key: "css"
  }) : null
);
aS.Provider;
var Ip = function(t) {
  return /* @__PURE__ */ _.forwardRef(function(r, o) {
    var s = _.useContext(aS);
    return t(r, s, o);
  });
}, Gs = /* @__PURE__ */ _.createContext({}), Np = {}.hasOwnProperty, Uf = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", n1 = function(t, r) {
  var o = {};
  for (var s in r)
    Np.call(r, s) && (o[s] = r[s]);
  return o[Uf] = t, o;
}, r1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Mp(r, o, s), sS(function() {
    return Ap(r, o, s);
  }), null;
}, i1 = /* @__PURE__ */ Ip(function(e, t, r) {
  var o = e.css;
  typeof o == "string" && t.registered[o] !== void 0 && (o = t.registered[o]);
  var s = e[Uf], l = [o], u = "";
  typeof e.className == "string" ? u = rS(t.registered, l, e.className) : e.className != null && (u = e.className + " ");
  var d = Qs(l, void 0, _.useContext(Gs));
  u += t.key + "-" + d.name;
  var p = {};
  for (var f in e)
    Np.call(e, f) && f !== "css" && f !== Uf && (p[f] = e[f]);
  return p.className = u, r && (p.ref = r), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(r1, {
    cache: t,
    serialized: d,
    isStringTag: typeof s == "string"
  }), /* @__PURE__ */ _.createElement(s, p));
}), o1 = i1, ky = function(t, r) {
  var o = arguments;
  if (r == null || !Np.call(r, "css"))
    return _.createElement.apply(void 0, o);
  var s = o.length, l = new Array(s);
  l[0] = o1, l[1] = n1(t, r);
  for (var u = 2; u < s; u++)
    l[u] = o[u];
  return _.createElement.apply(null, l);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(ky || (ky = {}));
var s1 = /* @__PURE__ */ Ip(function(e, t) {
  var r = e.styles, o = Qs([r], void 0, _.useContext(Gs)), s = _.useRef();
  return xy(function() {
    var l = t.key + "-global", u = new t.sheet.constructor({
      key: l,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), d = !1, p = document.querySelector('style[data-emotion="' + l + " " + o.name + '"]');
    return t.sheet.tags.length && (u.before = t.sheet.tags[0]), p !== null && (d = !0, p.setAttribute("data-emotion", l), u.hydrate([p])), s.current = [u, d], function() {
      u.flush();
    };
  }, [t]), xy(function() {
    var l = s.current, u = l[0], d = l[1];
    if (d) {
      l[1] = !1;
      return;
    }
    if (o.next !== void 0 && Ap(t, o.next, !0), u.tags.length) {
      var p = u.tags[u.tags.length - 1].nextElementSibling;
      u.before = p, u.flush();
    }
    t.insert("", o, u, !1);
  }, [t, o.name]), null;
});
function Ys() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return Qs(t);
}
function Mi() {
  var e = Ys.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var a1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, l1 = /* @__PURE__ */ tS(
  function(e) {
    return a1.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), u1 = l1, c1 = function(t) {
  return t !== "theme";
}, Cy = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? u1 : c1;
}, Ey = function(t, r, o) {
  var s;
  if (r) {
    var l = r.shouldForwardProp;
    s = t.__emotion_forwardProp && l ? function(u) {
      return t.__emotion_forwardProp(u) && l(u);
    } : l;
  }
  return typeof s != "function" && o && (s = t.__emotion_forwardProp), s;
}, d1 = function(t) {
  var r = t.cache, o = t.serialized, s = t.isStringTag;
  return Mp(r, o, s), sS(function() {
    return Ap(r, o, s);
  }), null;
}, f1 = function e(t, r) {
  var o = t.__emotion_real === t, s = o && t.__emotion_base || t, l, u;
  r !== void 0 && (l = r.label, u = r.target);
  var d = Ey(t, r, o), p = d || Cy(s), f = !p("as");
  return function() {
    var m = arguments, g = o && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (l !== void 0 && g.push("label:" + l + ";"), m[0] == null || m[0].raw === void 0)
      g.push.apply(g, m);
    else {
      var w = m[0];
      g.push(w[0]);
      for (var C = m.length, S = 1; S < C; S++)
        g.push(m[S], w[S]);
    }
    var b = Ip(function(k, M, N) {
      var x = f && k.as || s, P = "", E = [], $ = k;
      if (k.theme == null) {
        $ = {};
        for (var A in k)
          $[A] = k[A];
        $.theme = _.useContext(Gs);
      }
      typeof k.className == "string" ? P = rS(M.registered, E, k.className) : k.className != null && (P = k.className + " ");
      var I = Qs(g.concat(E), M.registered, $);
      P += M.key + "-" + I.name, u !== void 0 && (P += " " + u);
      var L = f && d === void 0 ? Cy(x) : p, v = {};
      for (var T in k)
        f && T === "as" || L(T) && (v[T] = k[T]);
      return v.className = P, N && (v.ref = N), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(d1, {
        cache: M,
        serialized: I,
        isStringTag: typeof x == "string"
      }), /* @__PURE__ */ _.createElement(x, v));
    });
    return b.displayName = l !== void 0 ? l : "Styled(" + (typeof s == "string" ? s : s.displayName || s.name || "Component") + ")", b.defaultProps = t.defaultProps, b.__emotion_real = b, b.__emotion_base = s, b.__emotion_styles = g, b.__emotion_forwardProp = d, Object.defineProperty(b, "toString", {
      value: function() {
        return "." + u;
      }
    }), b.withComponent = function(k, M) {
      var N = e(k, lu({}, r, M, {
        shouldForwardProp: Ey(b, M, !0)
      }));
      return N.apply(void 0, g);
    }, b;
  };
}, p1 = [
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
], Vf = f1.bind(null);
p1.forEach(function(e) {
  Vf[e] = Vf(e);
});
var rf = { exports: {} }, of, Py;
function h1() {
  if (Py) return of;
  Py = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return of = e, of;
}
var sf, Ry;
function g1() {
  if (Ry) return sf;
  Ry = 1;
  var e = /* @__PURE__ */ h1();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, sf = function() {
    function o(u, d, p, f, m, g) {
      if (g !== e) {
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
  }, sf;
}
var Ty;
function m1() {
  return Ty || (Ty = 1, rf.exports = /* @__PURE__ */ g1()()), rf.exports;
}
var y1 = /* @__PURE__ */ m1();
const Oe = /* @__PURE__ */ Xr(y1);
function v1(e) {
  return e == null || Object.keys(e).length === 0;
}
function lS(e) {
  const {
    styles: t,
    defaultTheme: r = {}
  } = e, o = typeof t == "function" ? (s) => t(v1(s) ? r : s) : t;
  return /* @__PURE__ */ z.jsx(s1, {
    styles: o
  });
}
function uS(e, t) {
  return Vf(e, t);
}
function w1(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const $y = [];
function Vr(e) {
  return $y[0] = e, Qs($y);
}
var af = { exports: {} }, Fe = {};
var My;
function S1() {
  if (My) return Fe;
  My = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), l = /* @__PURE__ */ Symbol.for("react.consumer"), u = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), f = /* @__PURE__ */ Symbol.for("react.suspense_list"), m = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), w = /* @__PURE__ */ Symbol.for("react.view_transition"), C = /* @__PURE__ */ Symbol.for("react.client.reference");
  function S(b) {
    if (typeof b == "object" && b !== null) {
      var k = b.$$typeof;
      switch (k) {
        case e:
          switch (b = b.type, b) {
            case r:
            case s:
            case o:
            case p:
            case f:
            case w:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case u:
                case d:
                case g:
                case m:
                  return b;
                case l:
                  return b;
                default:
                  return k;
              }
          }
        case t:
          return k;
      }
    }
  }
  return Fe.ContextConsumer = l, Fe.ContextProvider = u, Fe.Element = e, Fe.ForwardRef = d, Fe.Fragment = r, Fe.Lazy = g, Fe.Memo = m, Fe.Portal = t, Fe.Profiler = s, Fe.StrictMode = o, Fe.Suspense = p, Fe.SuspenseList = f, Fe.isContextConsumer = function(b) {
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
    return S(b) === g;
  }, Fe.isMemo = function(b) {
    return S(b) === m;
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
    return typeof b == "string" || typeof b == "function" || b === r || b === s || b === o || b === p || b === f || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === m || b.$$typeof === u || b.$$typeof === l || b.$$typeof === d || b.$$typeof === C || b.getModuleId !== void 0);
  }, Fe.typeOf = S, Fe;
}
var Ay;
function b1() {
  return Ay || (Ay = 1, af.exports = /* @__PURE__ */ S1()), af.exports;
}
var cS = /* @__PURE__ */ b1();
function Vn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function dS(e) {
  if (/* @__PURE__ */ _.isValidElement(e) || cS.isValidElementType(e) || !Vn(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = dS(e[r]);
  }), t;
}
function an(e, t, r = {
  clone: !0
}) {
  const o = r.clone ? {
    ...e
  } : e;
  return Vn(e) && Vn(t) && Object.keys(t).forEach((s) => {
    /* @__PURE__ */ _.isValidElement(t[s]) || cS.isValidElementType(t[s]) ? o[s] = t[s] : Vn(t[s]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, s) && Vn(e[s]) ? o[s] = an(e[s], t[s], r) : r.clone ? o[s] = Vn(t[s]) ? dS(t[s]) : t[s] : o[s] = t[s];
  }), o;
}
const _1 = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, o) => r.val - o.val), t.reduce((r, o) => ({
    ...r,
    [o.key]: o.val
  }), {});
};
function x1(e) {
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
  } = e, l = _1(t), u = Object.keys(l);
  function d(w) {
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${r})`;
  }
  function p(w) {
    return `@media (max-width:${(typeof t[w] == "number" ? t[w] : w) - o / 100}${r})`;
  }
  function f(w, C) {
    const S = u.indexOf(C);
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${r}) and (max-width:${(S !== -1 && typeof t[u[S]] == "number" ? t[u[S]] : C) - o / 100}${r})`;
  }
  function m(w) {
    return u.indexOf(w) + 1 < u.length ? f(w, u[u.indexOf(w) + 1]) : d(w);
  }
  function g(w) {
    const C = u.indexOf(w);
    return C === 0 ? d(u[1]) : C === u.length - 1 ? p(u[C]) : f(w, u[u.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: u,
    values: l,
    up: d,
    down: p,
    between: f,
    only: m,
    not: g,
    unit: r,
    ...s
  };
}
function Iy(e, t) {
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
function k1(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((r) => t.startsWith(`@${r}`)) || !!t.match(/^@\d/));
}
function C1(e, t) {
  const r = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!r)
    return null;
  const [, o, s] = r, l = Number.isNaN(+o) ? o || 0 : +o;
  return e.containerQueries(s).up(l);
}
function E1(e) {
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
const P1 = {
  borderRadius: 4
};
function Es(e, t) {
  return t ? an(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const ju = {
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
}, Ny = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${ju[e]}px)`
}, R1 = {
  containerQueries: (e) => ({
    up: (t) => {
      let r = typeof t == "number" ? t : ju[t] || t;
      return typeof r == "number" && (r = `${r}px`), e ? `@container ${e} (min-width:${r})` : `@container (min-width:${r})`;
    }
  })
};
function gr(e, t, r) {
  const o = e.theme || {};
  if (Array.isArray(t)) {
    const l = o.breakpoints || Ny;
    return t.reduce((u, d, p) => (u[l.up(l.keys[p])] = r(t[p]), u), {});
  }
  if (typeof t == "object") {
    const l = o.breakpoints || Ny;
    return Object.keys(t).reduce((u, d) => {
      if (k1(l.keys, d)) {
        const p = C1(o.containerQueries ? o : R1, d);
        p && (u[p] = r(t[d], d));
      } else if (Object.keys(l.values || ju).includes(d)) {
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
function T1(e = {}) {
  return e.keys?.reduce((r, o) => {
    const s = e.up(o);
    return r[s] = {}, r;
  }, {}) || {};
}
function Oy(e, t) {
  return e.reduce((r, o) => {
    const s = r[o];
    return (!s || Object.keys(s).length === 0) && delete r[o], r;
  }, t);
}
function Pe(e) {
  if (typeof e != "string")
    throw new Error(ki(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function zu(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const o = `vars.${t}`.split(".").reduce((s, l) => s && s[l] ? s[l] : null, e);
    if (o != null)
      return o;
  }
  return t.split(".").reduce((o, s) => o && o[s] != null ? o[s] : null, e);
}
function cu(e, t, r, o = r) {
  let s;
  return typeof e == "function" ? s = e(r) : Array.isArray(e) ? s = e[r] || o : s = zu(e, r) || o, t && (s = t(s, o, e)), s;
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
    const d = u[t], p = u.theme, f = zu(p, o) || {};
    return gr(u, d, (g) => {
      let w = cu(f, s, g);
      return g === w && typeof g == "string" && (w = cu(f, s, `${t}${g === "default" ? "" : Pe(g)}`, g)), r === !1 ? w : {
        [r]: w
      };
    });
  };
  return l.propTypes = {}, l.filterProps = [t], l;
}
function $1(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const M1 = {
  m: "margin",
  p: "padding"
}, A1 = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ly = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, I1 = $1((e) => {
  if (e.length > 2)
    if (Ly[e])
      e = Ly[e];
    else
      return [e];
  const [t, r] = e.split(""), o = M1[t], s = A1[r] || "";
  return Array.isArray(s) ? s.map((l) => o + l) : [o + s];
}), Op = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Lp = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...Op, ...Lp];
function Js(e, t, r, o) {
  const s = zu(e, t, !0) ?? r;
  return typeof s == "number" || typeof s == "string" ? (l) => typeof l == "string" ? l : typeof s == "string" ? `calc(${l} * ${s})` : s * l : Array.isArray(s) ? (l) => {
    if (typeof l == "string")
      return l;
    const u = Math.abs(l), d = s[u];
    return l >= 0 ? d : typeof d == "number" ? -d : `-${d}`;
  } : typeof s == "function" ? s : () => {
  };
}
function Dp(e) {
  return Js(e, "spacing", 8);
}
function Xs(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function N1(e, t) {
  return (r) => e.reduce((o, s) => (o[s] = Xs(t, r), o), {});
}
function O1(e, t, r, o) {
  if (!t.includes(r))
    return null;
  const s = I1(r), l = N1(s, o), u = e[r];
  return gr(e, u, l);
}
function fS(e, t) {
  const r = Dp(e.theme);
  return Object.keys(e).map((o) => O1(e, t, o, r)).reduce(Es, {});
}
function tt(e) {
  return fS(e, Op);
}
tt.propTypes = {};
tt.filterProps = Op;
function nt(e) {
  return fS(e, Lp);
}
nt.propTypes = {};
nt.filterProps = Lp;
function pS(e = 8, t = Dp({
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
function Bu(...e) {
  const t = e.reduce((o, s) => (s.filterProps.forEach((l) => {
    o[l] = s;
  }), o), {}), r = (o) => Object.keys(o).reduce((s, l) => t[l] ? Es(s, t[l](o)) : s, {});
  return r.propTypes = {}, r.filterProps = e.reduce((o, s) => o.concat(s.filterProps), []), r;
}
function yn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function bn(e, t) {
  return ot({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const L1 = bn("border", yn), D1 = bn("borderTop", yn), F1 = bn("borderRight", yn), j1 = bn("borderBottom", yn), z1 = bn("borderLeft", yn), B1 = bn("borderColor"), W1 = bn("borderTopColor"), U1 = bn("borderRightColor"), V1 = bn("borderBottomColor"), H1 = bn("borderLeftColor"), q1 = bn("outline", yn), K1 = bn("outlineColor"), Wu = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Js(e.theme, "shape.borderRadius", 4), r = (o) => ({
      borderRadius: Xs(t, o)
    });
    return gr(e, e.borderRadius, r);
  }
  return null;
};
Wu.propTypes = {};
Wu.filterProps = ["borderRadius"];
Bu(L1, D1, F1, j1, z1, B1, W1, U1, V1, H1, Wu, q1, K1);
const Uu = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Js(e.theme, "spacing", 8), r = (o) => ({
      gap: Xs(t, o)
    });
    return gr(e, e.gap, r);
  }
  return null;
};
Uu.propTypes = {};
Uu.filterProps = ["gap"];
const Vu = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Js(e.theme, "spacing", 8), r = (o) => ({
      columnGap: Xs(t, o)
    });
    return gr(e, e.columnGap, r);
  }
  return null;
};
Vu.propTypes = {};
Vu.filterProps = ["columnGap"];
const Hu = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Js(e.theme, "spacing", 8), r = (o) => ({
      rowGap: Xs(t, o)
    });
    return gr(e, e.rowGap, r);
  }
  return null;
};
Hu.propTypes = {};
Hu.filterProps = ["rowGap"];
const Q1 = ot({
  prop: "gridColumn"
}), G1 = ot({
  prop: "gridRow"
}), Y1 = ot({
  prop: "gridAutoFlow"
}), J1 = ot({
  prop: "gridAutoColumns"
}), X1 = ot({
  prop: "gridAutoRows"
}), Z1 = ot({
  prop: "gridTemplateColumns"
}), ek = ot({
  prop: "gridTemplateRows"
}), tk = ot({
  prop: "gridTemplateAreas"
}), nk = ot({
  prop: "gridArea"
});
Bu(Uu, Vu, Hu, Q1, G1, Y1, J1, X1, Z1, ek, tk, nk);
function fo(e, t) {
  return t === "grey" ? t : e;
}
const rk = ot({
  prop: "color",
  themeKey: "palette",
  transform: fo
}), ik = ot({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: fo
}), ok = ot({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: fo
});
Bu(rk, ik, ok);
function rn(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const sk = ot({
  prop: "width",
  transform: rn
}), Fp = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      const o = e.theme?.breakpoints?.values?.[r] || ju[r];
      return o ? e.theme?.breakpoints?.unit !== "px" ? {
        maxWidth: `${o}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: o
      } : {
        maxWidth: rn(r)
      };
    };
    return gr(e, e.maxWidth, t);
  }
  return null;
};
Fp.filterProps = ["maxWidth"];
const ak = ot({
  prop: "minWidth",
  transform: rn
}), lk = ot({
  prop: "height",
  transform: rn
}), uk = ot({
  prop: "maxHeight",
  transform: rn
}), ck = ot({
  prop: "minHeight",
  transform: rn
});
ot({
  prop: "size",
  cssProperty: "width",
  transform: rn
});
ot({
  prop: "size",
  cssProperty: "height",
  transform: rn
});
const dk = ot({
  prop: "boxSizing"
});
Bu(sk, Fp, ak, lk, uk, ck, dk);
const Zs = {
  // borders
  border: {
    themeKey: "borders",
    transform: yn
  },
  borderTop: {
    themeKey: "borders",
    transform: yn
  },
  borderRight: {
    themeKey: "borders",
    transform: yn
  },
  borderBottom: {
    themeKey: "borders",
    transform: yn
  },
  borderLeft: {
    themeKey: "borders",
    transform: yn
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
    transform: yn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Wu
  },
  // palette
  color: {
    themeKey: "palette",
    transform: fo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: fo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: fo
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
    style: Uu
  },
  rowGap: {
    style: Hu
  },
  columnGap: {
    style: Vu
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
    style: Fp
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
function fk(...e) {
  const t = e.reduce((o, s) => o.concat(Object.keys(s)), []), r = new Set(t);
  return e.every((o) => r.size === Object.keys(o).length);
}
function pk(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function hk() {
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
      transform: m,
      style: g
    } = d;
    if (o == null)
      return null;
    if (f === "typography" && o === "inherit")
      return {
        [r]: o
      };
    const w = zu(s, f) || {};
    return g ? g(u) : gr(u, o, (S) => {
      let b = cu(w, m, S);
      return S === b && typeof S == "string" && (b = cu(w, m, `${r}${S === "default" ? "" : Pe(S)}`, S)), p === !1 ? b : {
        [p]: b
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
    const u = s.unstable_sxConfig ?? Zs;
    function d(p) {
      let f = p;
      if (typeof p == "function")
        f = p(s);
      else if (typeof p != "object")
        return p;
      if (!f)
        return null;
      const m = T1(s.breakpoints), g = Object.keys(m);
      let w = m;
      return Object.keys(f).forEach((C) => {
        const S = pk(f[C], s);
        if (S != null)
          if (typeof S == "object")
            if (u[C])
              w = Es(w, e(C, S, s, u));
            else {
              const b = gr({
                theme: s
              }, S, (k) => ({
                [C]: k
              }));
              fk(b, S) ? w[C] = t({
                sx: S,
                theme: s,
                nested: !0
              }) : w = Es(w, b);
            }
          else
            w = Es(w, e(C, S, s, u));
      }), !l && s.modularCssLayers ? {
        "@layer sx": Iy(s, Oy(g, w))
      } : Iy(s, Oy(g, w));
    }
    return Array.isArray(o) ? o.map(d) : d(o);
  }
  return t;
}
const qr = hk();
qr.filterProps = ["sx"];
function gk(e, t) {
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
function jp(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: o = {},
    spacing: s,
    shape: l = {},
    ...u
  } = e, d = x1(r), p = pS(s);
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
      ...P1,
      ...l
    }
  }, u);
  return f = E1(f), f.applyStyles = gk, f = t.reduce((m, g) => an(m, g), f), f.unstable_sxConfig = {
    ...Zs,
    ...u?.unstable_sxConfig
  }, f.unstable_sx = function(g) {
    return qr({
      sx: g,
      theme: this
    });
  }, f;
}
function mk(e) {
  return Object.keys(e).length === 0;
}
function zp(e = null) {
  const t = _.useContext(Gs);
  return !t || mk(t) ? e : t;
}
const yk = jp();
function Bp(e = yk) {
  return zp(e);
}
function lf(e) {
  const t = Vr(e);
  return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function hS({
  styles: e,
  themeId: t,
  defaultTheme: r = {}
}) {
  const o = Bp(r), s = t && o[t] || o;
  let l = typeof e == "function" ? e(s) : e;
  return s.modularCssLayers && (Array.isArray(l) ? l = l.map((u) => lf(typeof u == "function" ? u(s) : u)) : l = lf(l)), /* @__PURE__ */ z.jsx(lS, {
    styles: l
  });
}
const vk = (e) => {
  const t = {
    systemProps: {},
    otherProps: {}
  }, r = e?.theme?.unstable_sxConfig ?? Zs;
  return Object.keys(e).forEach((o) => {
    r[o] ? t.systemProps[o] = e[o] : t.otherProps[o] = e[o];
  }), t;
};
function gS(e) {
  const {
    sx: t,
    ...r
  } = e, {
    systemProps: o,
    otherProps: s
  } = vk(r);
  let l;
  return Array.isArray(t) ? l = [o, ...t] : typeof t == "function" ? l = (...u) => {
    const d = t(...u);
    return Vn(d) ? {
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
const Dy = (e) => e, wk = () => {
  let e = Dy;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Dy;
    }
  };
}, mS = wk();
function yS(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (r = yS(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function Re() {
  for (var e, t, r = 0, o = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (t = yS(e)) && (o && (o += " "), o += t);
  return o;
}
function Sk(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: o = "MuiBox-root",
    generateClassName: s
  } = e, l = uS("div", {
    shouldForwardProp: (d) => d !== "theme" && d !== "sx" && d !== "as"
  })(qr);
  return /* @__PURE__ */ _.forwardRef(function(p, f) {
    const m = Bp(r), {
      className: g,
      component: w = "div",
      ...C
    } = gS(p);
    return /* @__PURE__ */ z.jsx(l, {
      as: w,
      ref: f,
      className: Re(g, s ? s(o) : o),
      theme: t && m[t] || m,
      ...C
    });
  });
}
const bk = {
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
  const o = bk[t];
  return o ? `${r}-${o}` : `${mS.generate(e)}-${t}`;
}
function Xe(e, t, r = "Mui") {
  const o = {};
  return t.forEach((s) => {
    o[s] = pt(e, s, r);
  }), o;
}
function vS(e) {
  const {
    variants: t,
    ...r
  } = e, o = {
    variants: t,
    style: Vr(r),
    isProcessed: !0
  };
  return o.style === r || t && t.forEach((s) => {
    typeof s.style != "function" && (s.style = Vr(s.style));
  }), o;
}
const _k = jp();
function uf(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function bi(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function xk(e) {
  return e ? (t, r) => r[e] : null;
}
function kk(e, t, r) {
  e.theme = Pk(e.theme) ? r : e.theme[t] || e.theme;
}
function Zl(e, t, r) {
  const o = typeof t == "function" ? t(e) : t;
  if (Array.isArray(o))
    return o.flatMap((s) => Zl(e, s, r));
  if (Array.isArray(o?.variants)) {
    let s;
    if (o.isProcessed)
      s = r ? bi(o.style, r) : o.style;
    else {
      const {
        variants: l,
        ...u
      } = o;
      s = r ? bi(Vr(u), r) : u;
    }
    return wS(e, o.variants, [s], r);
  }
  return o?.isProcessed ? r ? bi(Vr(o.style), r) : o.style : r ? bi(Vr(o), r) : o;
}
function wS(e, t, r = [], o = void 0) {
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
    }, r.push(o ? bi(Vr(u.style(s)), o) : u.style(s))) : r.push(o ? bi(Vr(u.style), o) : u.style);
  }
  return r;
}
function Ck(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = _k,
    rootShouldForwardProp: o = uf,
    slotShouldForwardProp: s = uf
  } = e;
  function l(d) {
    kk(d, t, r);
  }
  return (d, p = {}) => {
    w1(d, ($) => $.filter((A) => A !== qr));
    const {
      name: f,
      slot: m,
      skipVariantsResolver: g,
      skipSx: w,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: C = xk(Tk(m)),
      ...S
    } = p, b = f && f.startsWith("Mui") || m ? "components" : "custom", k = g !== void 0 ? g : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      m && m !== "Root" && m !== "root" || !1
    ), M = w || !1;
    let N = uf;
    m === "Root" || m === "root" ? N = o : m ? N = s : Rk(d) && (N = void 0);
    const x = uS(d, {
      shouldForwardProp: N,
      label: Ek(),
      ...S
    }), P = ($) => {
      if ($.__emotion_real === $)
        return $;
      if (typeof $ == "function")
        return function(I) {
          return Zl(I, $, I.theme.modularCssLayers ? b : void 0);
        };
      if (Vn($)) {
        const A = vS($);
        return function(L) {
          return A.variants ? Zl(L, A, L.theme.modularCssLayers ? b : void 0) : L.theme.modularCssLayers ? bi(A.style, b) : A.style;
        };
      }
      return $;
    }, E = (...$) => {
      const A = [], I = $.map(P), L = [];
      if (A.push(l), f && C && L.push(function(F) {
        const j = F.theme.components?.[f]?.styleOverrides;
        if (!j)
          return null;
        const V = {};
        for (const G in j)
          V[G] = Zl(F, j[G], F.theme.modularCssLayers ? "theme" : void 0);
        return C(F, V);
      }), f && !k && L.push(function(F) {
        const j = F.theme?.components?.[f]?.variants;
        return j ? wS(F, j, [], F.theme.modularCssLayers ? "theme" : void 0) : null;
      }), M || L.push(qr), Array.isArray(I[0])) {
        const O = I.shift(), F = new Array(A.length).fill(""), B = new Array(L.length).fill("");
        let j;
        j = [...F, ...O, ...B], j.raw = [...F, ...O.raw, ...B], A.unshift(j);
      }
      const v = [...A, ...I, ...L], T = x(...v);
      return d.muiName && (T.muiName = d.muiName), T;
    };
    return x.withConfig && (E.withConfig = x.withConfig), E;
  };
}
function Ek(e, t) {
  return void 0;
}
function Pk(e) {
  for (const t in e)
    return !1;
  return !0;
}
function Rk(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Tk(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function du(e, t) {
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
              r[s][p] = du(l[p], u[p]);
            }
        }
      } else r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
const Ci = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function $k(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function Wp(e, t = 0, r = 1) {
  return $k(e, t, r);
}
function Mk(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((o) => o + o)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((o, s) => s < 3 ? parseInt(o, 16) : Math.round(parseInt(o, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Kr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Kr(Mk(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(r))
    throw new Error(ki(9, e));
  let o = e.substring(t + 1, e.length - 1), s;
  if (r === "color") {
    if (o = o.split(" "), s = o.shift(), o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(s))
      throw new Error(ki(10, s));
  } else
    o = o.split(",");
  return o = o.map((l) => parseFloat(l)), {
    type: r,
    values: o,
    colorSpace: s
  };
}
const Ak = (e) => {
  const t = Kr(e);
  return t.values.slice(0, 3).map((r, o) => t.type.includes("hsl") && o !== 0 ? `${r}%` : r).join(" ");
}, ws = (e, t) => {
  try {
    return Ak(e);
  } catch {
    return e;
  }
};
function qu(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: o
  } = e;
  return t.includes("rgb") ? o = o.map((s, l) => l < 3 ? parseInt(s, 10) : s) : t.includes("hsl") && (o[1] = `${o[1]}%`, o[2] = `${o[2]}%`), t.includes("color") ? o = `${r} ${o.join(" ")}` : o = `${o.join(", ")}`, `${t}(${o})`;
}
function SS(e) {
  e = Kr(e);
  const {
    values: t
  } = e, r = t[0], o = t[1] / 100, s = t[2] / 100, l = o * Math.min(s, 1 - s), u = (f, m = (f + r / 30) % 12) => s - l * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let d = "rgb";
  const p = [Math.round(u(0) * 255), Math.round(u(8) * 255), Math.round(u(4) * 255)];
  return e.type === "hsla" && (d += "a", p.push(t[3])), qu({
    type: d,
    values: p
  });
}
function Hf(e) {
  e = Kr(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Kr(SS(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ik(e, t) {
  const r = Hf(e), o = Hf(t);
  return (Math.max(r, o) + 0.05) / (Math.min(r, o) + 0.05);
}
function Et(e, t) {
  return e = Kr(e), t = Wp(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, qu(e);
}
function xl(e, t, r) {
  try {
    return Et(e, t);
  } catch {
    return e;
  }
}
function Up(e, t) {
  if (e = Kr(e), t = Wp(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return qu(e);
}
function ze(e, t, r) {
  try {
    return Up(e, t);
  } catch {
    return e;
  }
}
function Vp(e, t) {
  if (e = Kr(e), t = Wp(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.includes("color"))
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return qu(e);
}
function Be(e, t, r) {
  try {
    return Vp(e, t);
  } catch {
    return e;
  }
}
function Nk(e, t = 0.15) {
  return Hf(e) > 0.5 ? Up(e, t) : Vp(e, t);
}
function kl(e, t, r) {
  try {
    return Nk(e, t);
  } catch {
    return e;
  }
}
function Fy(...e) {
  return e.reduce((t, r) => r == null ? t : function(...s) {
    t.apply(this, s), r.apply(this, s);
  }, () => {
  });
}
function Ok(e, t = 166) {
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
function Gn(e) {
  return e && e.ownerDocument || document;
}
function Ei(e) {
  return Gn(e).defaultView || window;
}
function jy(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
let zy = 0;
function Lk(e) {
  const [t, r] = _.useState(e), o = e || t;
  return _.useEffect(() => {
    t == null && (zy += 1, r(`mui-${zy}`));
  }, [t]), o;
}
const Dk = {
  ...zf
}, By = Dk.useId;
function Hp(e) {
  if (By !== void 0) {
    const t = By();
    return e ?? t;
  }
  return Lk(e);
}
function Fk({
  controlled: e,
  default: t,
  name: r,
  state: o = "value"
}) {
  const {
    current: s
  } = _.useRef(e !== void 0), [l, u] = _.useState(t), d = s ? e : l, p = _.useCallback((f) => {
    s || u(f);
  }, []);
  return [d, p];
}
function po(e) {
  const t = _.useRef(e);
  return Ci(() => {
    t.current = e;
  }), _.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function Nn(...e) {
  const t = _.useRef(void 0), r = _.useCallback((o) => {
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
  return _.useMemo(() => e.every((o) => o == null) ? null : (o) => {
    t.current && (t.current(), t.current = void 0), o != null && (t.current = r(o));
  }, e);
}
const Wy = {};
function bS(e, t) {
  const r = _.useRef(Wy);
  return r.current === Wy && (r.current = e(t)), r;
}
const jk = [];
function zk(e) {
  _.useEffect(e, jk);
}
class qp {
  static create() {
    return new qp();
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
function _S() {
  const e = bS(qp.create).current;
  return zk(e.disposeEffect), e;
}
function Uy(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return !1;
}
function xS(e = window) {
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
function Bk(e) {
  return typeof e == "string";
}
function kS(e, t, r) {
  return e === void 0 || Bk(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...r
    }
  };
}
function CS(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((o) => o.match(/^on[A-Z]/) && typeof e[o] == "function" && !t.includes(o)).forEach((o) => {
    r[o] = e[o];
  }), r;
}
function Vy(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function ES(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: o,
    externalForwardedProps: s,
    className: l
  } = e;
  if (!t) {
    const C = Re(r?.className, l, s?.className, o?.className), S = {
      ...r?.style,
      ...s?.style,
      ...o?.style
    }, b = {
      ...r,
      ...s,
      ...o
    };
    return C.length > 0 && (b.className = C), Object.keys(S).length > 0 && (b.style = S), {
      props: b,
      internalRef: void 0
    };
  }
  const u = CS({
    ...s,
    ...o
  }), d = Vy(o), p = Vy(s), f = t(u), m = Re(f?.className, r?.className, l, s?.className, o?.className), g = {
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
  return m.length > 0 && (w.className = m), Object.keys(g).length > 0 && (w.style = g), {
    props: w,
    internalRef: f.ref
  };
}
function PS(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function Wk(e) {
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: s = !1,
    ...l
  } = e, u = s ? {} : PS(r, o), {
    props: d,
    internalRef: p
  } = ES({
    ...l,
    externalSlotProps: u
  }), f = Nn(p, u?.ref, e.additionalProps?.ref);
  return kS(t, {
    ...d,
    ref: f
  }, o);
}
function Ku(e) {
  return parseInt(_.version, 10) >= 19 ? e?.props?.ref || null : e?.ref || null;
}
const RS = /* @__PURE__ */ _.createContext(null);
function Kp() {
  return _.useContext(RS);
}
const Uk = typeof Symbol == "function" && Symbol.for, Vk = Uk ? /* @__PURE__ */ Symbol.for("mui.nested") : "__THEME_NESTED__";
function Hk(e, t) {
  return typeof t == "function" ? t(e) : {
    ...e,
    ...t
  };
}
function qk(e) {
  const {
    children: t,
    theme: r
  } = e, o = Kp(), s = _.useMemo(() => {
    const l = o === null ? {
      ...r
    } : Hk(o, r);
    return l != null && (l[Vk] = o !== null), l;
  }, [r, o]);
  return /* @__PURE__ */ z.jsx(RS.Provider, {
    value: s,
    children: t
  });
}
const TS = /* @__PURE__ */ _.createContext();
function Kk({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ z.jsx(TS.Provider, {
    value: e ?? !0,
    ...t
  });
}
const Qk = () => _.useContext(TS) ?? !1, $S = /* @__PURE__ */ _.createContext(void 0);
function Gk({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ z.jsx($S.Provider, {
    value: e,
    children: t
  });
}
function Yk(e) {
  const {
    theme: t,
    name: r,
    props: o
  } = e;
  if (!t || !t.components || !t.components[r])
    return o;
  const s = t.components[r];
  return s.defaultProps ? du(s.defaultProps, o) : !s.styleOverrides && !s.variants ? du(s, o) : o;
}
function Jk({
  props: e,
  name: t
}) {
  const r = _.useContext($S);
  return Yk({
    props: e,
    name: t,
    theme: {
      components: r
    }
  });
}
function Xk(e) {
  const t = zp(), r = Hp() || "", {
    modularCssLayers: o
  } = e;
  let s = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
  return !o || t !== null ? s = "" : typeof o == "string" ? s = o.replace(/mui(?!\.)/g, s) : s = `@layer ${s};`, Ci(() => {
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
  }, [s, r]), s ? /* @__PURE__ */ z.jsx(hS, {
    styles: s
  }) : null;
}
const Hy = {};
function qy(e, t, r, o = !1) {
  return _.useMemo(() => {
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
function MS(e) {
  const {
    children: t,
    theme: r,
    themeId: o
  } = e, s = zp(Hy), l = Kp() || Hy, u = qy(o, s, r), d = qy(o, l, r, !0), p = (o ? u[o] : u).direction === "rtl", f = Xk(u);
  return /* @__PURE__ */ z.jsx(qk, {
    theme: d,
    children: /* @__PURE__ */ z.jsx(Gs.Provider, {
      value: u,
      children: /* @__PURE__ */ z.jsx(Kk, {
        value: p,
        children: /* @__PURE__ */ z.jsxs(Gk, {
          value: o ? u[o].components : u.components,
          children: [f, t]
        })
      })
    })
  });
}
const Ky = {
  theme: void 0
};
function Zk(e) {
  let t, r;
  return function(s) {
    let l = t;
    return (l === void 0 || s.theme !== r) && (Ky.theme = s.theme, l = vS(e(Ky)), t = l, r = s.theme), l;
  };
}
const Qp = "mode", Gp = "color-scheme", eC = "data-color-scheme";
function tC(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: r = "light",
    defaultDarkColorScheme: o = "dark",
    modeStorageKey: s = Qp,
    colorSchemeStorageKey: l = Gp,
    attribute: u = eC,
    colorSchemeNode: d = "document.documentElement",
    nonce: p
  } = e || {};
  let f = "", m = u;
  if (u === "class" && (m = ".%s"), u === "data" && (m = "[data-%s]"), m.startsWith(".")) {
    const w = m.substring(1);
    f += `${d}.classList.remove('${w}'.replace('%s', light), '${w}'.replace('%s', dark));
      ${d}.classList.add('${w}'.replace('%s', colorScheme));`;
  }
  const g = m.match(/\[([^\]]+)\]/);
  if (g) {
    const [w, C] = g[1].split("=");
    C || (f += `${d}.removeAttribute('${w}'.replace('%s', light));
      ${d}.removeAttribute('${w}'.replace('%s', dark));`), f += `
      ${d}.setAttribute('${w}'.replace('%s', colorScheme), ${C ? `${C}.replace('%s', colorScheme)` : '""'});`;
  } else
    f += `${d}.setAttribute('${m}', colorScheme);`;
  return /* @__PURE__ */ z.jsx("script", {
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
function nC() {
}
const rC = ({
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
      return nC;
    const o = (s) => {
      const l = s.newValue;
      s.key === e && r(l);
    };
    return t.addEventListener("storage", o), () => {
      t.removeEventListener("storage", o);
    };
  }
});
function cf() {
}
function Qy(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function AS(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function iC(e) {
  return AS(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function oC(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: r,
    defaultDarkColorScheme: o,
    supportedColorSchemes: s = [],
    modeStorageKey: l = Qp,
    colorSchemeStorageKey: u = Gp,
    storageWindow: d = typeof window > "u" ? void 0 : window,
    storageManager: p = rC,
    noSsr: f = !1
  } = e, m = s.join(","), g = s.length > 1, w = _.useMemo(() => p?.({
    key: l,
    storageWindow: d
  }), [p, l, d]), C = _.useMemo(() => p?.({
    key: `${u}-light`,
    storageWindow: d
  }), [p, u, d]), S = _.useMemo(() => p?.({
    key: `${u}-dark`,
    storageWindow: d
  }), [p, u, d]), [b, k] = _.useState(() => {
    const I = w?.get(t) || t, L = C?.get(r) || r, v = S?.get(o) || o;
    return {
      mode: I,
      systemMode: Qy(I),
      lightColorScheme: L,
      darkColorScheme: v
    };
  }), [M, N] = _.useState(f || !g);
  _.useEffect(() => {
    N(!0);
  }, []);
  const x = iC(b), P = _.useCallback((I) => {
    k((L) => {
      if (I === L.mode)
        return L;
      const v = I ?? t;
      return w?.set(v), {
        ...L,
        mode: v,
        systemMode: Qy(v)
      };
    });
  }, [w, t]), E = _.useCallback((I) => {
    I ? typeof I == "string" ? I && !m.includes(I) ? console.error(`\`${I}\` does not exist in \`theme.colorSchemes\`.`) : k((L) => {
      const v = {
        ...L
      };
      return AS(L, (T) => {
        T === "light" && (C?.set(I), v.lightColorScheme = I), T === "dark" && (S?.set(I), v.darkColorScheme = I);
      }), v;
    }) : k((L) => {
      const v = {
        ...L
      }, T = I.light === null ? r : I.light, O = I.dark === null ? o : I.dark;
      return T && (m.includes(T) ? (v.lightColorScheme = T, C?.set(T)) : console.error(`\`${T}\` does not exist in \`theme.colorSchemes\`.`)), O && (m.includes(O) ? (v.darkColorScheme = O, S?.set(O)) : console.error(`\`${O}\` does not exist in \`theme.colorSchemes\`.`)), v;
    }) : k((L) => (C?.set(r), S?.set(o), {
      ...L,
      lightColorScheme: r,
      darkColorScheme: o
    }));
  }, [m, C, S, r, o]), $ = _.useCallback((I) => {
    b.mode === "system" && k((L) => {
      const v = I?.matches ? "dark" : "light";
      return L.systemMode === v ? L : {
        ...L,
        systemMode: v
      };
    });
  }, [b.mode]), A = _.useRef($);
  return A.current = $, _.useEffect(() => {
    if (typeof window.matchMedia != "function" || !g)
      return;
    const I = (...v) => A.current(...v), L = window.matchMedia("(prefers-color-scheme: dark)");
    return L.addListener(I), I(L), () => {
      L.removeListener(I);
    };
  }, [g]), _.useEffect(() => {
    if (g) {
      const I = w?.subscribe((T) => {
        (!T || ["light", "dark", "system"].includes(T)) && P(T || t);
      }) || cf, L = C?.subscribe((T) => {
        (!T || m.match(T)) && E({
          light: T
        });
      }) || cf, v = S?.subscribe((T) => {
        (!T || m.match(T)) && E({
          dark: T
        });
      }) || cf;
      return () => {
        I(), L(), v();
      };
    }
  }, [E, P, m, t, d, g, w, C, S]), {
    ...b,
    mode: M ? b.mode : void 0,
    systemMode: M ? b.systemMode : void 0,
    colorScheme: M ? x : void 0,
    setMode: P,
    setColorScheme: E
  };
}
const sC = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function aC(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: r = {},
    modeStorageKey: o = Qp,
    colorSchemeStorageKey: s = Gp,
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
  }, f = /* @__PURE__ */ _.createContext(void 0), m = () => _.useContext(f) || p, g = {}, w = {};
  function C(M) {
    const {
      children: N,
      theme: x,
      modeStorageKey: P = o,
      colorSchemeStorageKey: E = s,
      disableTransitionOnChange: $ = l,
      storageManager: A,
      storageWindow: I = typeof window > "u" ? void 0 : window,
      documentNode: L = typeof document > "u" ? void 0 : document,
      colorSchemeNode: v = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: T = !1,
      disableStyleSheetGeneration: O = !1,
      defaultMode: F = "system",
      noSsr: B
    } = M, j = _.useRef(!1), V = Kp(), G = _.useContext(f), U = !!G && !T, H = _.useMemo(() => x || (typeof r == "function" ? r() : r), [x]), K = H[t], D = K || H, {
      colorSchemes: Y = g,
      components: ne = w,
      cssVarPrefix: te
    } = D, se = Object.keys(Y).filter((Tt) => !!Y[Tt]).join(","), le = _.useMemo(() => se.split(","), [se]), de = typeof u == "string" ? u : u.light, he = typeof u == "string" ? u : u.dark, fe = Y[de] && Y[he] ? F : Y[D.defaultColorScheme]?.palette?.mode || D.palette?.mode, {
      mode: ue,
      setMode: we,
      systemMode: _e,
      lightColorScheme: qe,
      darkColorScheme: je,
      colorScheme: st,
      setColorScheme: ut
    } = oC({
      supportedColorSchemes: le,
      defaultLightColorScheme: de,
      defaultDarkColorScheme: he,
      modeStorageKey: P,
      colorSchemeStorageKey: E,
      defaultMode: fe,
      storageManager: A,
      storageWindow: I,
      noSsr: B
    });
    let Ze = ue, De = st;
    U && (Ze = G.mode, De = G.colorScheme);
    const Rt = _.useMemo(() => {
      const Tt = De || D.defaultColorScheme, St = D.generateThemeVars?.() || D.vars, $t = {
        ...D,
        components: ne,
        colorSchemes: Y,
        cssVarPrefix: te,
        vars: St
      };
      if (typeof $t.generateSpacing == "function" && ($t.spacing = $t.generateSpacing()), Tt) {
        const Vt = Y[Tt];
        Vt && typeof Vt == "object" && Object.keys(Vt).forEach((Mt) => {
          Vt[Mt] && typeof Vt[Mt] == "object" ? $t[Mt] = {
            ...$t[Mt],
            ...Vt[Mt]
          } : $t[Mt] = Vt[Mt];
        });
      }
      return d ? d($t) : $t;
    }, [D, De, ne, Y, te]), ct = D.colorSchemeSelector;
    Ci(() => {
      if (De && v && ct && ct !== "media") {
        const Tt = ct;
        let St = ct;
        if (Tt === "class" && (St = ".%s"), Tt === "data" && (St = "[data-%s]"), Tt?.startsWith("data-") && !Tt.includes("%s") && (St = `[${Tt}="%s"]`), St.startsWith("."))
          v.classList.remove(...le.map(($t) => St.substring(1).replace("%s", $t))), v.classList.add(St.substring(1).replace("%s", De));
        else {
          const $t = St.replace("%s", De).match(/\[([^\]]+)\]/);
          if ($t) {
            const [Vt, Mt] = $t[1].split("=");
            Mt || le.forEach((ha) => {
              v.removeAttribute(Vt.replace(De, ha));
            }), v.setAttribute(Vt, Mt ? Mt.replace(/"|'/g, "") : "");
          } else
            v.setAttribute(St, De);
        }
      }
    }, [De, ct, v, le]), _.useEffect(() => {
      let Tt;
      if ($ && j.current && L) {
        const St = L.createElement("style");
        St.appendChild(L.createTextNode(sC)), L.head.appendChild(St), window.getComputedStyle(L.body), Tt = setTimeout(() => {
          L.head.removeChild(St);
        }, 1);
      }
      return () => {
        clearTimeout(Tt);
      };
    }, [De, $, L]), _.useEffect(() => (j.current = !0, () => {
      j.current = !1;
    }), []);
    const Ue = _.useMemo(() => ({
      allColorSchemes: le,
      colorScheme: De,
      darkColorScheme: je,
      lightColorScheme: qe,
      mode: Ze,
      setColorScheme: ut,
      setMode: we,
      systemMode: _e
    }), [le, De, je, qe, Ze, ut, we, _e, Rt.colorSchemeSelector]);
    let xe = !0;
    (O || D.cssVariables === !1 || U && V?.cssVarPrefix === te) && (xe = !1);
    const ko = /* @__PURE__ */ z.jsxs(_.Fragment, {
      children: [/* @__PURE__ */ z.jsx(MS, {
        themeId: K ? t : void 0,
        theme: Rt,
        children: N
      }), xe && /* @__PURE__ */ z.jsx(lS, {
        styles: Rt.generateStyleSheets?.() || []
      })]
    });
    return U ? ko : /* @__PURE__ */ z.jsx(f.Provider, {
      value: Ue,
      children: ko
    });
  }
  const S = typeof u == "string" ? u : u.light, b = typeof u == "string" ? u : u.dark;
  return {
    CssVarsProvider: C,
    useColorScheme: m,
    getInitColorSchemeScript: (M) => tC({
      colorSchemeStorageKey: s,
      defaultLightColorScheme: S,
      defaultDarkColorScheme: b,
      modeStorageKey: o,
      ...M
    })
  };
}
function lC(e = "") {
  function t(...o) {
    if (!o.length)
      return "";
    const s = o[0];
    return typeof s == "string" && !s.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${s}${t(...o.slice(1))})` : `, ${s}`;
  }
  return (o, ...s) => `var(--${e ? `${e}-` : ""}${o}${t(...s)})`;
}
const Gy = (e, t, r, o = []) => {
  let s = e;
  t.forEach((l, u) => {
    u === t.length - 1 ? Array.isArray(s) ? s[Number(l)] = r : s && typeof s == "object" && (s[l] = r) : s && typeof s == "object" && (s[l] || (s[l] = o.includes(l) ? [] : {}), s = s[l]);
  });
}, uC = (e, t, r) => {
  function o(s, l = [], u = []) {
    Object.entries(s).forEach(([d, p]) => {
      (!r || r && !r([...l, d])) && p != null && (typeof p == "object" && Object.keys(p).length > 0 ? o(p, [...l, d], Array.isArray(p) ? [...u, d] : u) : t([...l, d], p, u));
    });
  }
  o(e);
}, cC = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((o) => e.includes(o)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function df(e, t) {
  const {
    prefix: r,
    shouldSkipGeneratingVar: o
  } = t || {}, s = {}, l = {}, u = {};
  return uC(
    e,
    (d, p, f) => {
      if ((typeof p == "string" || typeof p == "number") && (!o || !o(d, p))) {
        const m = `--${r ? `${r}-` : ""}${d.join("-")}`, g = cC(d, p);
        Object.assign(s, {
          [m]: g
        }), Gy(l, d, `var(${m})`, f), Gy(u, d, `var(${m}, ${g})`, f);
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
function dC(e, t = {}) {
  const {
    getSelector: r = k,
    disableCssColorScheme: o,
    colorSchemeSelector: s
  } = t, {
    colorSchemes: l = {},
    components: u,
    defaultColorScheme: d = "light",
    ...p
  } = e, {
    vars: f,
    css: m,
    varsWithDefaults: g
  } = df(p, t);
  let w = g;
  const C = {}, {
    [d]: S,
    ...b
  } = l;
  if (Object.entries(b || {}).forEach(([x, P]) => {
    const {
      vars: E,
      css: $,
      varsWithDefaults: A
    } = df(P, t);
    w = an(w, A), C[x] = {
      css: $,
      vars: E
    };
  }), S) {
    const {
      css: x,
      vars: P,
      varsWithDefaults: E
    } = df(S, t);
    w = an(w, E), C[d] = {
      css: x,
      vars: P
    };
  }
  function k(x, P) {
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
    vars: w,
    generateThemeVars: () => {
      let x = {
        ...f
      };
      return Object.entries(C).forEach(([, {
        vars: P
      }]) => {
        x = an(x, P);
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
        ...m
      }), m);
      const {
        [P]: $,
        ...A
      } = C;
      if ($) {
        const {
          css: I
        } = $, L = l[P]?.palette?.mode, v = !o && L ? {
          colorScheme: L,
          ...I
        } : {
          ...I
        };
        E(r(P, {
          ...v
        }), v);
      }
      return Object.entries(A).forEach(([I, {
        css: L
      }]) => {
        const v = l[I]?.palette?.mode, T = !o && v ? {
          colorScheme: v,
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
function fC(e) {
  return function(r) {
    return e === "media" ? `@media (prefers-color-scheme: ${r})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${r}"] &` : e === "class" ? `.${r} &` : e === "data" ? `[data-${r}] &` : `${e.replace("%s", r)} &` : "&";
  };
}
function IS() {
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
      paper: Ns.white,
      default: Ns.white
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
const pC = IS();
function NS() {
  return {
    text: {
      primary: Ns.white,
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
      active: Ns.white,
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
const Yy = NS();
function Jy(e, t, r, o) {
  const s = o.light || o, l = o.dark || o * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Vp(e.main, s) : t === "dark" && (e.dark = Up(e.main, l)));
}
function hC(e = "light") {
  return e === "dark" ? {
    main: io[200],
    light: io[50],
    dark: io[400]
  } : {
    main: io[700],
    light: io[400],
    dark: io[800]
  };
}
function gC(e = "light") {
  return e === "dark" ? {
    main: ro[200],
    light: ro[50],
    dark: ro[400]
  } : {
    main: ro[500],
    light: ro[300],
    dark: ro[700]
  };
}
function mC(e = "light") {
  return e === "dark" ? {
    main: no[500],
    light: no[300],
    dark: no[700]
  } : {
    main: no[700],
    light: no[400],
    dark: no[800]
  };
}
function yC(e = "light") {
  return e === "dark" ? {
    main: oo[400],
    light: oo[300],
    dark: oo[700]
  } : {
    main: oo[700],
    light: oo[500],
    dark: oo[900]
  };
}
function vC(e = "light") {
  return e === "dark" ? {
    main: so[400],
    light: so[300],
    dark: so[700]
  } : {
    main: so[800],
    light: so[500],
    dark: so[900]
  };
}
function wC(e = "light") {
  return e === "dark" ? {
    main: cs[400],
    light: cs[300],
    dark: cs[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: cs[500],
    dark: cs[900]
  };
}
function Yp(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: o = 0.2,
    ...s
  } = e, l = e.primary || hC(t), u = e.secondary || gC(t), d = e.error || mC(t), p = e.info || yC(t), f = e.success || vC(t), m = e.warning || wC(t);
  function g(b) {
    return Ik(b, Yy.text.primary) >= r ? Yy.text.primary : pC.text.primary;
  }
  const w = ({
    color: b,
    name: k,
    mainShade: M = 500,
    lightShade: N = 300,
    darkShade: x = 700
  }) => {
    if (b = {
      ...b
    }, !b.main && b[M] && (b.main = b[M]), !b.hasOwnProperty("main"))
      throw new Error(ki(11, k ? ` (${k})` : "", M));
    if (typeof b.main != "string")
      throw new Error(ki(12, k ? ` (${k})` : "", JSON.stringify(b.main)));
    return Jy(b, "light", N, o), Jy(b, "dark", x, o), b.contrastText || (b.contrastText = g(b.main)), b;
  };
  let C;
  return t === "light" ? C = IS() : t === "dark" && (C = NS()), an({
    // A collection of common colors.
    common: {
      ...Ns
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
      color: m,
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
    grey: mx,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: o,
    // The light and dark mode object.
    ...C
  }, s);
}
function SC(e) {
  const t = {};
  return Object.entries(e).forEach((o) => {
    const [s, l] = o;
    typeof l == "object" && (t[s] = `${l.fontStyle ? `${l.fontStyle} ` : ""}${l.fontVariant ? `${l.fontVariant} ` : ""}${l.fontWeight ? `${l.fontWeight} ` : ""}${l.fontStretch ? `${l.fontStretch} ` : ""}${l.fontSize || ""}${l.lineHeight ? `/${l.lineHeight} ` : ""}${l.fontFamily || ""}`);
  }), t;
}
function bC(e, t) {
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
function _C(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Xy = {
  textTransform: "uppercase"
}, Zy = '"Roboto", "Helvetica", "Arial", sans-serif';
function OS(e, t) {
  const {
    fontFamily: r = Zy,
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
    pxToRem: m,
    ...g
  } = typeof t == "function" ? t(e) : t, w = o / 14, C = m || ((k) => `${k / p * w}rem`), S = (k, M, N, x, P) => ({
    fontFamily: r,
    fontWeight: k,
    fontSize: C(M),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: N,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...r === Zy ? {
      letterSpacing: `${_C(x / M)}em`
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
    button: S(u, 14, 1.75, 0.4, Xy),
    caption: S(l, 12, 1.66, 0.4),
    overline: S(l, 12, 2.66, 1, Xy),
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
    pxToRem: C,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: s,
    fontWeightRegular: l,
    fontWeightMedium: u,
    fontWeightBold: d,
    ...b
  }, g, {
    clone: !1
    // No need to clone deep
  });
}
const xC = 0.2, kC = 0.14, CC = 0.12;
function Qe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${xC})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${kC})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${CC})`].join(",");
}
const EC = ["none", Qe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Qe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Qe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Qe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Qe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Qe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Qe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Qe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Qe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Qe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Qe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Qe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Qe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Qe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Qe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Qe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Qe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Qe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Qe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Qe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Qe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Qe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Qe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Qe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], PC = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, RC = {
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
function ev(e) {
  return `${Math.round(e)}ms`;
}
function TC(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function $C(e) {
  const t = {
    ...PC,
    ...e.easing
  }, r = {
    ...RC,
    ...e.duration
  };
  return {
    getAutoHeightDuration: TC,
    create: (s = ["all"], l = {}) => {
      const {
        duration: u = r.standard,
        easing: d = t.easeInOut,
        delay: p = 0,
        ...f
      } = l;
      return (Array.isArray(s) ? s : [s]).map((m) => `${m} ${typeof u == "string" ? u : ev(u)} ${d} ${typeof p == "string" ? p : ev(p)}`).join(",");
    },
    ...e,
    easing: t,
    duration: r
  };
}
const MC = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function AC(e) {
  return Vn(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function LS(e = {}) {
  const t = {
    ...e
  };
  function r(o) {
    const s = Object.entries(o);
    for (let l = 0; l < s.length; l++) {
      const [u, d] = s[l];
      !AC(d) || u.startsWith("unstable_") ? delete o[u] : Vn(d) && (o[u] = {
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
function qf(e = {}, ...t) {
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
    throw new Error(ki(20));
  const m = Yp(l), g = jp(e);
  let w = an(g, {
    mixins: bC(g.breakpoints, o),
    palette: m,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: EC.slice(),
    typography: OS(m, d),
    transitions: $C(u),
    zIndex: {
      ...MC
    }
  });
  return w = an(w, f), w = t.reduce((C, S) => an(C, S), w), w.unstable_sxConfig = {
    ...Zs,
    ...f?.unstable_sxConfig
  }, w.unstable_sx = function(S) {
    return qr({
      sx: S,
      theme: this
    });
  }, w.toRuntimeSource = LS, w;
}
function Kf(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const IC = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const r = Kf(t);
  return `linear-gradient(rgba(255 255 255 / ${r}), rgba(255 255 255 / ${r}))`;
});
function DS(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function FS(e) {
  return e === "dark" ? IC : [];
}
function NC(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: r,
    overlays: o,
    ...s
  } = e, l = Yp(t);
  return {
    palette: l,
    opacity: {
      ...DS(l.mode),
      ...r
    },
    overlays: o || FS(l.mode),
    ...s
  };
}
function OC(e) {
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
const LC = (e) => [...[...Array(25)].map((t, r) => `--${e ? `${e}-` : ""}overlays-${r}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], DC = (e) => (t, r) => {
  const o = e.rootSelector || ":root", s = e.colorSchemeSelector;
  let l = s;
  if (s === "class" && (l = ".%s"), s === "data" && (l = "[data-%s]"), s?.startsWith("data-") && !s.includes("%s") && (l = `[${s}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const u = {};
      return LC(e.cssVarPrefix).forEach((d) => {
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
function FC(e, t) {
  t.forEach((r) => {
    e[r] || (e[r] = {});
  });
}
function ee(e, t, r) {
  !e[t] && r && (e[t] = r);
}
function Ss(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : SS(e);
}
function lr(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = ws(Ss(e[t])));
}
function jC(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Bn = (e) => {
  try {
    return e();
  } catch {
  }
}, zC = (e = "mui") => lC(e);
function ff(e, t, r, o) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const s = o === "dark" ? "dark" : "light";
  if (!r) {
    e[o] = NC({
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
  } = qf({
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
      ...DS(s),
      ...t?.opacity
    },
    overlays: t?.overlays || FS(s)
  }, u;
}
function BC(e = {}, ...t) {
  const {
    colorSchemes: r = {
      light: !0
    },
    defaultColorScheme: o,
    disableCssColorScheme: s = !1,
    cssVarPrefix: l = "mui",
    shouldSkipGeneratingVar: u = OC,
    colorSchemeSelector: d = r.light && r.dark ? "media" : void 0,
    rootSelector: p = ":root",
    ...f
  } = e, m = Object.keys(r)[0], g = o || (r.light && m !== "light" ? "light" : m), w = zC(l), {
    [g]: C,
    light: S,
    dark: b,
    ...k
  } = r, M = {
    ...k
  };
  let N = C;
  if ((g === "dark" && !("dark" in r) || g === "light" && !("light" in r)) && (N = !0), !N)
    throw new Error(ki(21, g));
  const x = ff(M, N, f, g);
  S && !M.light && ff(M, S, void 0, "light"), b && !M.dark && ff(M, b, void 0, "dark");
  let P = {
    defaultColorScheme: g,
    ...x,
    cssVarPrefix: l,
    colorSchemeSelector: d,
    rootSelector: p,
    getCssVar: w,
    colorSchemes: M,
    font: {
      ...SC(x.typography),
      ...x.font
    },
    spacing: jC(f.spacing)
  };
  Object.keys(P.colorSchemes).forEach((L) => {
    const v = P.colorSchemes[L].palette, T = (O) => {
      const F = O.split("-"), B = F[1], j = F[2];
      return w(O, v[B][j]);
    };
    if (v.mode === "light" && (ee(v.common, "background", "#fff"), ee(v.common, "onBackground", "#000")), v.mode === "dark" && (ee(v.common, "background", "#000"), ee(v.common, "onBackground", "#fff")), FC(v, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), v.mode === "light") {
      ee(v.Alert, "errorColor", ze(v.error.light, 0.6)), ee(v.Alert, "infoColor", ze(v.info.light, 0.6)), ee(v.Alert, "successColor", ze(v.success.light, 0.6)), ee(v.Alert, "warningColor", ze(v.warning.light, 0.6)), ee(v.Alert, "errorFilledBg", T("palette-error-main")), ee(v.Alert, "infoFilledBg", T("palette-info-main")), ee(v.Alert, "successFilledBg", T("palette-success-main")), ee(v.Alert, "warningFilledBg", T("palette-warning-main")), ee(v.Alert, "errorFilledColor", Bn(() => v.getContrastText(v.error.main))), ee(v.Alert, "infoFilledColor", Bn(() => v.getContrastText(v.info.main))), ee(v.Alert, "successFilledColor", Bn(() => v.getContrastText(v.success.main))), ee(v.Alert, "warningFilledColor", Bn(() => v.getContrastText(v.warning.main))), ee(v.Alert, "errorStandardBg", Be(v.error.light, 0.9)), ee(v.Alert, "infoStandardBg", Be(v.info.light, 0.9)), ee(v.Alert, "successStandardBg", Be(v.success.light, 0.9)), ee(v.Alert, "warningStandardBg", Be(v.warning.light, 0.9)), ee(v.Alert, "errorIconColor", T("palette-error-main")), ee(v.Alert, "infoIconColor", T("palette-info-main")), ee(v.Alert, "successIconColor", T("palette-success-main")), ee(v.Alert, "warningIconColor", T("palette-warning-main")), ee(v.AppBar, "defaultBg", T("palette-grey-100")), ee(v.Avatar, "defaultBg", T("palette-grey-400")), ee(v.Button, "inheritContainedBg", T("palette-grey-300")), ee(v.Button, "inheritContainedHoverBg", T("palette-grey-A100")), ee(v.Chip, "defaultBorder", T("palette-grey-400")), ee(v.Chip, "defaultAvatarColor", T("palette-grey-700")), ee(v.Chip, "defaultIconColor", T("palette-grey-700")), ee(v.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ee(v.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ee(v.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ee(v.LinearProgress, "primaryBg", Be(v.primary.main, 0.62)), ee(v.LinearProgress, "secondaryBg", Be(v.secondary.main, 0.62)), ee(v.LinearProgress, "errorBg", Be(v.error.main, 0.62)), ee(v.LinearProgress, "infoBg", Be(v.info.main, 0.62)), ee(v.LinearProgress, "successBg", Be(v.success.main, 0.62)), ee(v.LinearProgress, "warningBg", Be(v.warning.main, 0.62)), ee(v.Skeleton, "bg", `rgba(${T("palette-text-primaryChannel")} / 0.11)`), ee(v.Slider, "primaryTrack", Be(v.primary.main, 0.62)), ee(v.Slider, "secondaryTrack", Be(v.secondary.main, 0.62)), ee(v.Slider, "errorTrack", Be(v.error.main, 0.62)), ee(v.Slider, "infoTrack", Be(v.info.main, 0.62)), ee(v.Slider, "successTrack", Be(v.success.main, 0.62)), ee(v.Slider, "warningTrack", Be(v.warning.main, 0.62));
      const O = kl(v.background.default, 0.8);
      ee(v.SnackbarContent, "bg", O), ee(v.SnackbarContent, "color", Bn(() => v.getContrastText(O))), ee(v.SpeedDialAction, "fabHoverBg", kl(v.background.paper, 0.15)), ee(v.StepConnector, "border", T("palette-grey-400")), ee(v.StepContent, "border", T("palette-grey-400")), ee(v.Switch, "defaultColor", T("palette-common-white")), ee(v.Switch, "defaultDisabledColor", T("palette-grey-100")), ee(v.Switch, "primaryDisabledColor", Be(v.primary.main, 0.62)), ee(v.Switch, "secondaryDisabledColor", Be(v.secondary.main, 0.62)), ee(v.Switch, "errorDisabledColor", Be(v.error.main, 0.62)), ee(v.Switch, "infoDisabledColor", Be(v.info.main, 0.62)), ee(v.Switch, "successDisabledColor", Be(v.success.main, 0.62)), ee(v.Switch, "warningDisabledColor", Be(v.warning.main, 0.62)), ee(v.TableCell, "border", Be(xl(v.divider, 1), 0.88)), ee(v.Tooltip, "bg", xl(v.grey[700], 0.92));
    }
    if (v.mode === "dark") {
      ee(v.Alert, "errorColor", Be(v.error.light, 0.6)), ee(v.Alert, "infoColor", Be(v.info.light, 0.6)), ee(v.Alert, "successColor", Be(v.success.light, 0.6)), ee(v.Alert, "warningColor", Be(v.warning.light, 0.6)), ee(v.Alert, "errorFilledBg", T("palette-error-dark")), ee(v.Alert, "infoFilledBg", T("palette-info-dark")), ee(v.Alert, "successFilledBg", T("palette-success-dark")), ee(v.Alert, "warningFilledBg", T("palette-warning-dark")), ee(v.Alert, "errorFilledColor", Bn(() => v.getContrastText(v.error.dark))), ee(v.Alert, "infoFilledColor", Bn(() => v.getContrastText(v.info.dark))), ee(v.Alert, "successFilledColor", Bn(() => v.getContrastText(v.success.dark))), ee(v.Alert, "warningFilledColor", Bn(() => v.getContrastText(v.warning.dark))), ee(v.Alert, "errorStandardBg", ze(v.error.light, 0.9)), ee(v.Alert, "infoStandardBg", ze(v.info.light, 0.9)), ee(v.Alert, "successStandardBg", ze(v.success.light, 0.9)), ee(v.Alert, "warningStandardBg", ze(v.warning.light, 0.9)), ee(v.Alert, "errorIconColor", T("palette-error-main")), ee(v.Alert, "infoIconColor", T("palette-info-main")), ee(v.Alert, "successIconColor", T("palette-success-main")), ee(v.Alert, "warningIconColor", T("palette-warning-main")), ee(v.AppBar, "defaultBg", T("palette-grey-900")), ee(v.AppBar, "darkBg", T("palette-background-paper")), ee(v.AppBar, "darkColor", T("palette-text-primary")), ee(v.Avatar, "defaultBg", T("palette-grey-600")), ee(v.Button, "inheritContainedBg", T("palette-grey-800")), ee(v.Button, "inheritContainedHoverBg", T("palette-grey-700")), ee(v.Chip, "defaultBorder", T("palette-grey-700")), ee(v.Chip, "defaultAvatarColor", T("palette-grey-300")), ee(v.Chip, "defaultIconColor", T("palette-grey-300")), ee(v.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ee(v.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ee(v.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ee(v.LinearProgress, "primaryBg", ze(v.primary.main, 0.5)), ee(v.LinearProgress, "secondaryBg", ze(v.secondary.main, 0.5)), ee(v.LinearProgress, "errorBg", ze(v.error.main, 0.5)), ee(v.LinearProgress, "infoBg", ze(v.info.main, 0.5)), ee(v.LinearProgress, "successBg", ze(v.success.main, 0.5)), ee(v.LinearProgress, "warningBg", ze(v.warning.main, 0.5)), ee(v.Skeleton, "bg", `rgba(${T("palette-text-primaryChannel")} / 0.13)`), ee(v.Slider, "primaryTrack", ze(v.primary.main, 0.5)), ee(v.Slider, "secondaryTrack", ze(v.secondary.main, 0.5)), ee(v.Slider, "errorTrack", ze(v.error.main, 0.5)), ee(v.Slider, "infoTrack", ze(v.info.main, 0.5)), ee(v.Slider, "successTrack", ze(v.success.main, 0.5)), ee(v.Slider, "warningTrack", ze(v.warning.main, 0.5));
      const O = kl(v.background.default, 0.98);
      ee(v.SnackbarContent, "bg", O), ee(v.SnackbarContent, "color", Bn(() => v.getContrastText(O))), ee(v.SpeedDialAction, "fabHoverBg", kl(v.background.paper, 0.15)), ee(v.StepConnector, "border", T("palette-grey-600")), ee(v.StepContent, "border", T("palette-grey-600")), ee(v.Switch, "defaultColor", T("palette-grey-300")), ee(v.Switch, "defaultDisabledColor", T("palette-grey-600")), ee(v.Switch, "primaryDisabledColor", ze(v.primary.main, 0.55)), ee(v.Switch, "secondaryDisabledColor", ze(v.secondary.main, 0.55)), ee(v.Switch, "errorDisabledColor", ze(v.error.main, 0.55)), ee(v.Switch, "infoDisabledColor", ze(v.info.main, 0.55)), ee(v.Switch, "successDisabledColor", ze(v.success.main, 0.55)), ee(v.Switch, "warningDisabledColor", ze(v.warning.main, 0.55)), ee(v.TableCell, "border", ze(xl(v.divider, 1), 0.68)), ee(v.Tooltip, "bg", xl(v.grey[700], 0.92));
    }
    lr(v.background, "default"), lr(v.background, "paper"), lr(v.common, "background"), lr(v.common, "onBackground"), lr(v, "divider"), Object.keys(v).forEach((O) => {
      const F = v[O];
      O !== "tonalOffset" && F && typeof F == "object" && (F.main && ee(v[O], "mainChannel", ws(Ss(F.main))), F.light && ee(v[O], "lightChannel", ws(Ss(F.light))), F.dark && ee(v[O], "darkChannel", ws(Ss(F.dark))), F.contrastText && ee(v[O], "contrastTextChannel", ws(Ss(F.contrastText))), O === "text" && (lr(v[O], "primary"), lr(v[O], "secondary")), O === "action" && (F.active && lr(v[O], "active"), F.selected && lr(v[O], "selected")));
    });
  }), P = t.reduce((L, v) => an(L, v), P);
  const E = {
    prefix: l,
    disableCssColorScheme: s,
    shouldSkipGeneratingVar: u,
    getSelector: DC(P)
  }, {
    vars: $,
    generateThemeVars: A,
    generateStyleSheets: I
  } = dC(P, E);
  return P.vars = $, Object.entries(P.colorSchemes[P.defaultColorScheme]).forEach(([L, v]) => {
    P[L] = v;
  }), P.generateThemeVars = A, P.generateStyleSheets = I, P.generateSpacing = function() {
    return pS(f.spacing, Dp(this));
  }, P.getColorSchemeSelector = fC(d), P.spacing = P.generateSpacing(), P.shouldSkipGeneratingVar = u, P.unstable_sxConfig = {
    ...Zs,
    ...f?.unstable_sxConfig
  }, P.unstable_sx = function(v) {
    return qr({
      sx: v,
      theme: this
    });
  }, P.toRuntimeSource = LS, P;
}
function tv(e, t, r) {
  e.colorSchemes && r && (e.colorSchemes[t] = {
    ...r !== !0 && r,
    palette: Yp({
      ...r === !0 ? {} : r.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function ea(e = {}, ...t) {
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
      return qf(e, ...t);
    let m = r;
    "palette" in e || f[d] && (f[d] !== !0 ? m = f[d].palette : d === "dark" && (m = {
      mode: "dark"
    }));
    const g = qf({
      ...e,
      palette: m
    }, ...t);
    return g.defaultColorScheme = d, g.colorSchemes = f, g.palette.mode === "light" && (g.colorSchemes.light = {
      ...f.light !== !0 && f.light,
      palette: g.palette
    }, tv(g, "dark", f.dark)), g.palette.mode === "dark" && (g.colorSchemes.dark = {
      ...f.dark !== !0 && f.dark,
      palette: g.palette
    }, tv(g, "light", f.light)), g;
  }
  return !r && !("light" in f) && d === "light" && (f.light = !0), BC({
    ...u,
    colorSchemes: f,
    defaultColorScheme: d,
    ...typeof o != "boolean" && o
  }, ...t);
}
function WC(e) {
  return String(e).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function UC(e) {
  return parseFloat(e);
}
const Jp = ea();
function Xp() {
  const e = Bp(Jp);
  return e[qn] || e;
}
function VC(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const bo = (e) => VC(e) && e !== "classes", Me = Ck({
  themeId: qn,
  defaultTheme: Jp,
  rootShouldForwardProp: bo
});
function HC({
  theme: e,
  ...t
}) {
  const r = qn in e ? e[qn] : void 0;
  return /* @__PURE__ */ z.jsx(MS, {
    ...t,
    themeId: r ? qn : void 0,
    theme: r || e
  });
}
const Cl = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
}, {
  CssVarsProvider: qC
} = aC({
  themeId: qn,
  // @ts-ignore ignore module augmentation tests
  theme: () => ea({
    cssVariables: !0
  }),
  colorSchemeStorageKey: Cl.colorSchemeStorageKey,
  modeStorageKey: Cl.modeStorageKey,
  defaultColorScheme: {
    light: Cl.defaultLightColorScheme,
    dark: Cl.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: OS(e.palette, e.typography)
    };
    return t.unstable_sx = function(o) {
      return qr({
        sx: o,
        theme: this
      });
    }, t;
  }
}), KC = qC;
function QC({
  theme: e,
  ...t
}) {
  const r = _.useMemo(() => {
    if (typeof e == "function")
      return e;
    const o = qn in e ? e[qn] : e;
    return "colorSchemes" in o ? null : "vars" in o ? e : {
      ...e,
      vars: null
    };
  }, [e]);
  return r ? /* @__PURE__ */ z.jsx(HC, {
    theme: r,
    ...t
  }) : /* @__PURE__ */ z.jsx(KC, {
    theme: e,
    ...t
  });
}
function GC(e) {
  return /* @__PURE__ */ z.jsx(hS, {
    ...e,
    defaultTheme: Jp,
    themeId: qn
  });
}
function jS(e) {
  return function(r) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ z.jsx(GC, {
        styles: typeof e == "function" ? (o) => e({
          theme: o,
          ...r
        }) : e
      })
    );
  };
}
function YC() {
  return gS;
}
const Sn = Zk;
function ht(e) {
  return Jk(e);
}
function JC(e) {
  return pt("MuiSvgIcon", e);
}
Xe("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const XC = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: o
  } = e, s = {
    root: ["root", t !== "inherit" && `color${Pe(t)}`, `fontSize${Pe(r)}`]
  };
  return wt(s, JC, o);
}, ZC = Me("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${Pe(r.color)}`], t[`fontSize${Pe(r.fontSize)}`]];
  }
})(Sn(({
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
}))), Qf = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    inheritViewBox: m = !1,
    titleAccess: g,
    viewBox: w = "0 0 24 24",
    ...C
  } = o, S = /* @__PURE__ */ _.isValidElement(s) && s.type === "svg", b = {
    ...o,
    color: u,
    component: d,
    fontSize: p,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: w,
    hasSvgAsChild: S
  }, k = {};
  m || (k.viewBox = w);
  const M = XC(b);
  return /* @__PURE__ */ z.jsxs(ZC, {
    as: d,
    className: Re(M.root, l),
    focusable: "false",
    color: f,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: r,
    ...k,
    ...C,
    ...S && s.props,
    ownerState: b,
    children: [S ? s.props.children : s, g ? /* @__PURE__ */ z.jsx("title", {
      children: g
    }) : null]
  });
});
Qf.muiName = "SvgIcon";
function Zr(e, t) {
  function r(o, s) {
    return /* @__PURE__ */ z.jsx(Qf, {
      "data-testid": `${t}Icon`,
      ref: s,
      ...o,
      children: e
    });
  }
  return r.muiName = Qf.muiName, /* @__PURE__ */ _.memo(/* @__PURE__ */ _.forwardRef(r));
}
function zS(e, t) {
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
function BS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (t.indexOf(o) !== -1) continue;
    r[o] = e[o];
  }
  return r;
}
function Gf(e, t) {
  return Gf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Gf(e, t);
}
function WS(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Gf(e, t);
}
var pf = { exports: {} }, Yt = {}, hf = { exports: {} }, gf = {};
var nv;
function eE() {
  return nv || (nv = 1, (function(e) {
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
        e: for (var D = 0, Y = U.length, ne = Y >>> 1; D < ne; ) {
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
    var p = [], f = [], m = 1, g = null, w = 3, C = !1, S = !1, b = !1, k = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, N = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function x(U) {
      for (var H = r(f); H !== null; ) {
        if (H.callback === null) o(f);
        else if (H.startTime <= U) o(f), H.sortIndex = H.expirationTime, t(p, H);
        else break;
        H = r(f);
      }
    }
    function P(U) {
      if (b = !1, x(U), !S) if (r(p) !== null) S = !0, V(E);
      else {
        var H = r(f);
        H !== null && G(P, H.startTime - U);
      }
    }
    function E(U, H) {
      S = !1, b && (b = !1, M(I), I = -1), C = !0;
      var K = w;
      try {
        for (x(H), g = r(p); g !== null && (!(g.expirationTime > H) || U && !T()); ) {
          var D = g.callback;
          if (typeof D == "function") {
            g.callback = null, w = g.priorityLevel;
            var Y = D(g.expirationTime <= H);
            H = e.unstable_now(), typeof Y == "function" ? g.callback = Y : g === r(p) && o(p), x(H);
          } else o(p);
          g = r(p);
        }
        if (g !== null) var ne = !0;
        else {
          var te = r(f);
          te !== null && G(P, te.startTime - H), ne = !1;
        }
        return ne;
      } finally {
        g = null, w = K, C = !1;
      }
    }
    var $ = !1, A = null, I = -1, L = 5, v = -1;
    function T() {
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
          H ? F() : ($ = !1, A = null);
        }
      } else $ = !1;
    }
    var F;
    if (typeof N == "function") F = function() {
      N(O);
    };
    else if (typeof MessageChannel < "u") {
      var B = new MessageChannel(), j = B.port2;
      B.port1.onmessage = O, F = function() {
        j.postMessage(null);
      };
    } else F = function() {
      k(O, 0);
    };
    function V(U) {
      A = U, $ || ($ = !0, F());
    }
    function G(U, H) {
      I = k(function() {
        U(e.unstable_now());
      }, H);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, e.unstable_continueExecution = function() {
      S || C || (S = !0, V(E));
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
      return Y = K + Y, U = { id: m++, callback: H, priorityLevel: U, startTime: K, expirationTime: Y, sortIndex: -1 }, K > D ? (U.sortIndex = K, t(f, U), r(p) === null && U === r(f) && (b ? (M(I), I = -1) : b = !0, G(P, K - D))) : (U.sortIndex = Y, t(p, U), S || C || (S = !0, V(E))), U;
    }, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(U) {
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
  })(gf)), gf;
}
var rv;
function tE() {
  return rv || (rv = 1, hf.exports = eE()), hf.exports;
}
var iv;
function nE() {
  if (iv) return Yt;
  iv = 1;
  var e = Ou(), t = tE();
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
  var d = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), p = Object.prototype.hasOwnProperty, f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, m = {}, g = {};
  function w(n) {
    return p.call(g, n) ? !0 : p.call(m, n) ? !1 : f.test(n) ? g[n] = !0 : (m[n] = !0, !1);
  }
  function C(n, i, a, c) {
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
    if (i === null || typeof i > "u" || C(n, i, a, c)) return !0;
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
  function b(n, i, a, c, h, y, R) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = c, this.attributeNamespace = h, this.mustUseProperty = a, this.propertyName = n, this.type = i, this.sanitizeURL = y, this.removeEmptyString = R;
  }
  var k = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    k[n] = new b(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var i = n[0];
    k[i] = new b(i, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    k[n] = new b(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    k[n] = new b(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    k[n] = new b(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    k[n] = new b(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    k[n] = new b(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    k[n] = new b(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    k[n] = new b(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var M = /[\-:]([a-z])/g;
  function N(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var i = n.replace(
      M,
      N
    );
    k[i] = new b(i, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var i = n.replace(M, N);
    k[i] = new b(i, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var i = n.replace(M, N);
    k[i] = new b(i, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    k[n] = new b(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), k.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    k[n] = new b(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function x(n, i, a, c) {
    var h = k.hasOwnProperty(i) ? k[i] : null;
    (h !== null ? h.type !== 0 : c || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (S(i, a, h, c) && (a = null), c || h === null ? w(i) && (a === null ? n.removeAttribute(i) : n.setAttribute(i, "" + a)) : h.mustUseProperty ? n[h.propertyName] = a === null ? h.type === 3 ? !1 : "" : a : (i = h.attributeName, c = h.attributeNamespace, a === null ? n.removeAttribute(i) : (h = h.type, a = h === 3 || h === 4 && a === !0 ? "" : "" + a, c ? n.setAttributeNS(c, i, a) : n.setAttribute(i, a))));
  }
  var P = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, E = /* @__PURE__ */ Symbol.for("react.element"), $ = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), I = /* @__PURE__ */ Symbol.for("react.strict_mode"), L = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), T = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), F = /* @__PURE__ */ Symbol.for("react.suspense"), B = /* @__PURE__ */ Symbol.for("react.suspense_list"), j = /* @__PURE__ */ Symbol.for("react.memo"), V = /* @__PURE__ */ Symbol.for("react.lazy"), G = /* @__PURE__ */ Symbol.for("react.offscreen"), U = Symbol.iterator;
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
  var ne = !1;
  function te(n, i) {
    if (!n || ne) return "";
    ne = !0;
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
`), R = h.length - 1, W = y.length - 1; 1 <= R && 0 <= W && h[R] !== y[W]; ) W--;
        for (; 1 <= R && 0 <= W; R--, W--) if (h[R] !== y[W]) {
          if (R !== 1 || W !== 1)
            do
              if (R--, W--, 0 > W || h[R] !== y[W]) {
                var q = `
` + h[R].replace(" at new ", " at ");
                return n.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", n.displayName)), q;
              }
            while (1 <= R && 0 <= W);
          break;
        }
      }
    } finally {
      ne = !1, Error.prepareStackTrace = a;
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
      case $:
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
      case T:
        return (n.displayName || "Context") + ".Consumer";
      case v:
        return (n._context.displayName || "Context") + ".Provider";
      case O:
        var i = n.render;
        return n = n.displayName, n || (n = i.displayName || i.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case j:
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
      }, set: function(R) {
        c = "" + R, y.call(this, R);
      } }), Object.defineProperty(n, i, { enumerable: a.enumerable }), { getValue: function() {
        return c;
      }, setValue: function(R) {
        c = "" + R;
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
  function ko(n, i) {
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
  var Mt, ha = (function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, a, c, h) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(i, a, c, h);
      });
    } : n;
  })(function(n, i) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = i;
    else {
      for (Mt = Mt || document.createElement("div"), Mt.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = Mt.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; i.firstChild; ) n.appendChild(i.firstChild);
    }
  });
  function Co(n, i) {
    if (i) {
      var a = n.firstChild;
      if (a && a === n.lastChild && a.nodeType === 3) {
        a.nodeValue = i;
        return;
      }
    }
    n.textContent = i;
  }
  var Eo = {
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
  }, mb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(n) {
    mb.forEach(function(i) {
      i = i + n.charAt(0).toUpperCase() + n.substring(1), Eo[i] = Eo[n];
    });
  });
  function Ch(n, i, a) {
    return i == null || typeof i == "boolean" || i === "" ? "" : a || typeof i != "number" || i === 0 || Eo.hasOwnProperty(n) && Eo[n] ? ("" + i).trim() : i + "px";
  }
  function Eh(n, i) {
    n = n.style;
    for (var a in i) if (i.hasOwnProperty(a)) {
      var c = a.indexOf("--") === 0, h = Ch(a, i[a], c);
      a === "float" && (a = "cssFloat"), c ? n.setProperty(a, h) : n[a] = h;
    }
  }
  var yb = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function cc(n, i) {
    if (i) {
      if (yb[n] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(r(137, n));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(r(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(r(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(r(62));
    }
  }
  function dc(n, i) {
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
  var fc = null;
  function pc(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var hc = null, Ai = null, Ii = null;
  function Ph(n) {
    if (n = Qo(n)) {
      if (typeof hc != "function") throw Error(r(280));
      var i = n.stateNode;
      i && (i = Da(i), hc(n.stateNode, n.type, i));
    }
  }
  function Rh(n) {
    Ai ? Ii ? Ii.push(n) : Ii = [n] : Ai = n;
  }
  function Th() {
    if (Ai) {
      var n = Ai, i = Ii;
      if (Ii = Ai = null, Ph(n), i) for (n = 0; n < i.length; n++) Ph(i[n]);
    }
  }
  function $h(n, i) {
    return n(i);
  }
  function Mh() {
  }
  var gc = !1;
  function Ah(n, i, a) {
    if (gc) return n(i, a);
    gc = !0;
    try {
      return $h(n, i, a);
    } finally {
      gc = !1, (Ai !== null || Ii !== null) && (Mh(), Th());
    }
  }
  function Po(n, i) {
    var a = n.stateNode;
    if (a === null) return null;
    var c = Da(a);
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
  var mc = !1;
  if (d) try {
    var Ro = {};
    Object.defineProperty(Ro, "passive", { get: function() {
      mc = !0;
    } }), window.addEventListener("test", Ro, Ro), window.removeEventListener("test", Ro, Ro);
  } catch {
    mc = !1;
  }
  function vb(n, i, a, c, h, y, R, W, q) {
    var Z = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(a, Z);
    } catch (oe) {
      this.onError(oe);
    }
  }
  var To = !1, ga = null, ma = !1, yc = null, wb = { onError: function(n) {
    To = !0, ga = n;
  } };
  function Sb(n, i, a, c, h, y, R, W, q) {
    To = !1, ga = null, vb.apply(wb, arguments);
  }
  function bb(n, i, a, c, h, y, R, W, q) {
    if (Sb.apply(this, arguments), To) {
      if (To) {
        var Z = ga;
        To = !1, ga = null;
      } else throw Error(r(198));
      ma || (ma = !0, yc = Z);
    }
  }
  function ei(n) {
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
  function Ih(n) {
    if (n.tag === 13) {
      var i = n.memoizedState;
      if (i === null && (n = n.alternate, n !== null && (i = n.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function Nh(n) {
    if (ei(n) !== n) throw Error(r(188));
  }
  function _b(n) {
    var i = n.alternate;
    if (!i) {
      if (i = ei(n), i === null) throw Error(r(188));
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
          if (y === a) return Nh(h), n;
          if (y === c) return Nh(h), i;
          y = y.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== c.return) a = h, c = y;
      else {
        for (var R = !1, W = h.child; W; ) {
          if (W === a) {
            R = !0, a = h, c = y;
            break;
          }
          if (W === c) {
            R = !0, c = h, a = y;
            break;
          }
          W = W.sibling;
        }
        if (!R) {
          for (W = y.child; W; ) {
            if (W === a) {
              R = !0, a = y, c = h;
              break;
            }
            if (W === c) {
              R = !0, c = y, a = h;
              break;
            }
            W = W.sibling;
          }
          if (!R) throw Error(r(189));
        }
      }
      if (a.alternate !== c) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? n : i;
  }
  function Oh(n) {
    return n = _b(n), n !== null ? Lh(n) : null;
  }
  function Lh(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var i = Lh(n);
      if (i !== null) return i;
      n = n.sibling;
    }
    return null;
  }
  var Dh = t.unstable_scheduleCallback, Fh = t.unstable_cancelCallback, xb = t.unstable_shouldYield, kb = t.unstable_requestPaint, rt = t.unstable_now, Cb = t.unstable_getCurrentPriorityLevel, vc = t.unstable_ImmediatePriority, jh = t.unstable_UserBlockingPriority, ya = t.unstable_NormalPriority, Eb = t.unstable_LowPriority, zh = t.unstable_IdlePriority, va = null, Ln = null;
  function Pb(n) {
    if (Ln && typeof Ln.onCommitFiberRoot == "function") try {
      Ln.onCommitFiberRoot(va, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var xn = Math.clz32 ? Math.clz32 : $b, Rb = Math.log, Tb = Math.LN2;
  function $b(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Rb(n) / Tb | 0) | 0;
  }
  var wa = 64, Sa = 4194304;
  function $o(n) {
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
  function ba(n, i) {
    var a = n.pendingLanes;
    if (a === 0) return 0;
    var c = 0, h = n.suspendedLanes, y = n.pingedLanes, R = a & 268435455;
    if (R !== 0) {
      var W = R & ~h;
      W !== 0 ? c = $o(W) : (y &= R, y !== 0 && (c = $o(y)));
    } else R = a & ~h, R !== 0 ? c = $o(R) : y !== 0 && (c = $o(y));
    if (c === 0) return 0;
    if (i !== 0 && i !== c && (i & h) === 0 && (h = c & -c, y = i & -i, h >= y || h === 16 && (y & 4194240) !== 0)) return i;
    if ((c & 4) !== 0 && (c |= a & 16), i = n.entangledLanes, i !== 0) for (n = n.entanglements, i &= c; 0 < i; ) a = 31 - xn(i), h = 1 << a, c |= n[a], i &= ~h;
    return c;
  }
  function Mb(n, i) {
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
  function Ab(n, i) {
    for (var a = n.suspendedLanes, c = n.pingedLanes, h = n.expirationTimes, y = n.pendingLanes; 0 < y; ) {
      var R = 31 - xn(y), W = 1 << R, q = h[R];
      q === -1 ? ((W & a) === 0 || (W & c) !== 0) && (h[R] = Mb(W, i)) : q <= i && (n.expiredLanes |= W), y &= ~W;
    }
  }
  function wc(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Bh() {
    var n = wa;
    return wa <<= 1, (wa & 4194240) === 0 && (wa = 64), n;
  }
  function Sc(n) {
    for (var i = [], a = 0; 31 > a; a++) i.push(n);
    return i;
  }
  function Mo(n, i, a) {
    n.pendingLanes |= i, i !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, i = 31 - xn(i), n[i] = a;
  }
  function Ib(n, i) {
    var a = n.pendingLanes & ~i;
    n.pendingLanes = i, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= i, n.mutableReadLanes &= i, n.entangledLanes &= i, i = n.entanglements;
    var c = n.eventTimes;
    for (n = n.expirationTimes; 0 < a; ) {
      var h = 31 - xn(a), y = 1 << h;
      i[h] = 0, c[h] = -1, n[h] = -1, a &= ~y;
    }
  }
  function bc(n, i) {
    var a = n.entangledLanes |= i;
    for (n = n.entanglements; a; ) {
      var c = 31 - xn(a), h = 1 << c;
      h & i | n[c] & i && (n[c] |= i), a &= ~h;
    }
  }
  var Le = 0;
  function Wh(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Uh, _c, Vh, Hh, qh, xc = !1, _a = [], xr = null, kr = null, Cr = null, Ao = /* @__PURE__ */ new Map(), Io = /* @__PURE__ */ new Map(), Er = [], Nb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Kh(n, i) {
    switch (n) {
      case "focusin":
      case "focusout":
        xr = null;
        break;
      case "dragenter":
      case "dragleave":
        kr = null;
        break;
      case "mouseover":
      case "mouseout":
        Cr = null;
        break;
      case "pointerover":
      case "pointerout":
        Ao.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Io.delete(i.pointerId);
    }
  }
  function No(n, i, a, c, h, y) {
    return n === null || n.nativeEvent !== y ? (n = { blockedOn: i, domEventName: a, eventSystemFlags: c, nativeEvent: y, targetContainers: [h] }, i !== null && (i = Qo(i), i !== null && _c(i)), n) : (n.eventSystemFlags |= c, i = n.targetContainers, h !== null && i.indexOf(h) === -1 && i.push(h), n);
  }
  function Ob(n, i, a, c, h) {
    switch (i) {
      case "focusin":
        return xr = No(xr, n, i, a, c, h), !0;
      case "dragenter":
        return kr = No(kr, n, i, a, c, h), !0;
      case "mouseover":
        return Cr = No(Cr, n, i, a, c, h), !0;
      case "pointerover":
        var y = h.pointerId;
        return Ao.set(y, No(Ao.get(y) || null, n, i, a, c, h)), !0;
      case "gotpointercapture":
        return y = h.pointerId, Io.set(y, No(Io.get(y) || null, n, i, a, c, h)), !0;
    }
    return !1;
  }
  function Qh(n) {
    var i = ti(n.target);
    if (i !== null) {
      var a = ei(i);
      if (a !== null) {
        if (i = a.tag, i === 13) {
          if (i = Ih(a), i !== null) {
            n.blockedOn = i, qh(n.priority, function() {
              Vh(a);
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
  function xa(n) {
    if (n.blockedOn !== null) return !1;
    for (var i = n.targetContainers; 0 < i.length; ) {
      var a = Cc(n.domEventName, n.eventSystemFlags, i[0], n.nativeEvent);
      if (a === null) {
        a = n.nativeEvent;
        var c = new a.constructor(a.type, a);
        fc = c, a.target.dispatchEvent(c), fc = null;
      } else return i = Qo(a), i !== null && _c(i), n.blockedOn = a, !1;
      i.shift();
    }
    return !0;
  }
  function Gh(n, i, a) {
    xa(n) && a.delete(i);
  }
  function Lb() {
    xc = !1, xr !== null && xa(xr) && (xr = null), kr !== null && xa(kr) && (kr = null), Cr !== null && xa(Cr) && (Cr = null), Ao.forEach(Gh), Io.forEach(Gh);
  }
  function Oo(n, i) {
    n.blockedOn === i && (n.blockedOn = null, xc || (xc = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Lb)));
  }
  function Lo(n) {
    function i(h) {
      return Oo(h, n);
    }
    if (0 < _a.length) {
      Oo(_a[0], n);
      for (var a = 1; a < _a.length; a++) {
        var c = _a[a];
        c.blockedOn === n && (c.blockedOn = null);
      }
    }
    for (xr !== null && Oo(xr, n), kr !== null && Oo(kr, n), Cr !== null && Oo(Cr, n), Ao.forEach(i), Io.forEach(i), a = 0; a < Er.length; a++) c = Er[a], c.blockedOn === n && (c.blockedOn = null);
    for (; 0 < Er.length && (a = Er[0], a.blockedOn === null); ) Qh(a), a.blockedOn === null && Er.shift();
  }
  var Ni = P.ReactCurrentBatchConfig, ka = !0;
  function Db(n, i, a, c) {
    var h = Le, y = Ni.transition;
    Ni.transition = null;
    try {
      Le = 1, kc(n, i, a, c);
    } finally {
      Le = h, Ni.transition = y;
    }
  }
  function Fb(n, i, a, c) {
    var h = Le, y = Ni.transition;
    Ni.transition = null;
    try {
      Le = 4, kc(n, i, a, c);
    } finally {
      Le = h, Ni.transition = y;
    }
  }
  function kc(n, i, a, c) {
    if (ka) {
      var h = Cc(n, i, a, c);
      if (h === null) Wc(n, i, c, Ca, a), Kh(n, c);
      else if (Ob(h, n, i, a, c)) c.stopPropagation();
      else if (Kh(n, c), i & 4 && -1 < Nb.indexOf(n)) {
        for (; h !== null; ) {
          var y = Qo(h);
          if (y !== null && Uh(y), y = Cc(n, i, a, c), y === null && Wc(n, i, c, Ca, a), y === h) break;
          h = y;
        }
        h !== null && c.stopPropagation();
      } else Wc(n, i, c, null, a);
    }
  }
  var Ca = null;
  function Cc(n, i, a, c) {
    if (Ca = null, n = pc(c), n = ti(n), n !== null) if (i = ei(n), i === null) n = null;
    else if (a = i.tag, a === 13) {
      if (n = Ih(i), n !== null) return n;
      n = null;
    } else if (a === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      n = null;
    } else i !== n && (n = null);
    return Ca = n, null;
  }
  function Yh(n) {
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
        switch (Cb()) {
          case vc:
            return 1;
          case jh:
            return 4;
          case ya:
          case Eb:
            return 16;
          case zh:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Pr = null, Ec = null, Ea = null;
  function Jh() {
    if (Ea) return Ea;
    var n, i = Ec, a = i.length, c, h = "value" in Pr ? Pr.value : Pr.textContent, y = h.length;
    for (n = 0; n < a && i[n] === h[n]; n++) ;
    var R = a - n;
    for (c = 1; c <= R && i[a - c] === h[y - c]; c++) ;
    return Ea = h.slice(n, 1 < c ? 1 - c : void 0);
  }
  function Pa(n) {
    var i = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && i === 13 && (n = 13)) : n = i, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Ra() {
    return !0;
  }
  function Xh() {
    return !1;
  }
  function Zt(n) {
    function i(a, c, h, y, R) {
      this._reactName = a, this._targetInst = h, this.type = c, this.nativeEvent = y, this.target = R, this.currentTarget = null;
      for (var W in n) n.hasOwnProperty(W) && (a = n[W], this[W] = a ? a(y) : y[W]);
      return this.isDefaultPrevented = (y.defaultPrevented != null ? y.defaultPrevented : y.returnValue === !1) ? Ra : Xh, this.isPropagationStopped = Xh, this;
    }
    return K(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ra);
    }, stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ra);
    }, persist: function() {
    }, isPersistent: Ra }), i;
  }
  var Oi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Pc = Zt(Oi), Do = K({}, Oi, { view: 0, detail: 0 }), jb = Zt(Do), Rc, Tc, Fo, Ta = K({}, Do, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Mc, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Fo && (Fo && n.type === "mousemove" ? (Rc = n.screenX - Fo.screenX, Tc = n.screenY - Fo.screenY) : Tc = Rc = 0, Fo = n), Rc);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Tc;
  } }), Zh = Zt(Ta), zb = K({}, Ta, { dataTransfer: 0 }), Bb = Zt(zb), Wb = K({}, Do, { relatedTarget: 0 }), $c = Zt(Wb), Ub = K({}, Oi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Vb = Zt(Ub), Hb = K({}, Oi, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), qb = Zt(Hb), Kb = K({}, Oi, { data: 0 }), eg = Zt(Kb), Qb = {
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
  }, Gb = {
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
  }, Yb = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Jb(n) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(n) : (n = Yb[n]) ? !!i[n] : !1;
  }
  function Mc() {
    return Jb;
  }
  var Xb = K({}, Do, { key: function(n) {
    if (n.key) {
      var i = Qb[n.key] || n.key;
      if (i !== "Unidentified") return i;
    }
    return n.type === "keypress" ? (n = Pa(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Gb[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Mc, charCode: function(n) {
    return n.type === "keypress" ? Pa(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Pa(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Zb = Zt(Xb), e_ = K({}, Ta, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), tg = Zt(e_), t_ = K({}, Do, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Mc }), n_ = Zt(t_), r_ = K({}, Oi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), i_ = Zt(r_), o_ = K({}, Ta, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), s_ = Zt(o_), a_ = [9, 13, 27, 32], Ac = d && "CompositionEvent" in window, jo = null;
  d && "documentMode" in document && (jo = document.documentMode);
  var l_ = d && "TextEvent" in window && !jo, ng = d && (!Ac || jo && 8 < jo && 11 >= jo), rg = " ", ig = !1;
  function og(n, i) {
    switch (n) {
      case "keyup":
        return a_.indexOf(i.keyCode) !== -1;
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
  function sg(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Li = !1;
  function u_(n, i) {
    switch (n) {
      case "compositionend":
        return sg(i);
      case "keypress":
        return i.which !== 32 ? null : (ig = !0, rg);
      case "textInput":
        return n = i.data, n === rg && ig ? null : n;
      default:
        return null;
    }
  }
  function c_(n, i) {
    if (Li) return n === "compositionend" || !Ac && og(n, i) ? (n = Jh(), Ea = Ec = Pr = null, Li = !1, n) : null;
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
        return ng && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var d_ = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function ag(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i === "input" ? !!d_[n.type] : i === "textarea";
  }
  function lg(n, i, a, c) {
    Rh(c), i = Na(i, "onChange"), 0 < i.length && (a = new Pc("onChange", "change", null, a, c), n.push({ event: a, listeners: i }));
  }
  var zo = null, Bo = null;
  function f_(n) {
    Eg(n, 0);
  }
  function $a(n) {
    var i = Bi(n);
    if (_e(i)) return n;
  }
  function p_(n, i) {
    if (n === "change") return i;
  }
  var ug = !1;
  if (d) {
    var Ic;
    if (d) {
      var Nc = "oninput" in document;
      if (!Nc) {
        var cg = document.createElement("div");
        cg.setAttribute("oninput", "return;"), Nc = typeof cg.oninput == "function";
      }
      Ic = Nc;
    } else Ic = !1;
    ug = Ic && (!document.documentMode || 9 < document.documentMode);
  }
  function dg() {
    zo && (zo.detachEvent("onpropertychange", fg), Bo = zo = null);
  }
  function fg(n) {
    if (n.propertyName === "value" && $a(Bo)) {
      var i = [];
      lg(i, Bo, n, pc(n)), Ah(f_, i);
    }
  }
  function h_(n, i, a) {
    n === "focusin" ? (dg(), zo = i, Bo = a, zo.attachEvent("onpropertychange", fg)) : n === "focusout" && dg();
  }
  function g_(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return $a(Bo);
  }
  function m_(n, i) {
    if (n === "click") return $a(i);
  }
  function y_(n, i) {
    if (n === "input" || n === "change") return $a(i);
  }
  function v_(n, i) {
    return n === i && (n !== 0 || 1 / n === 1 / i) || n !== n && i !== i;
  }
  var kn = typeof Object.is == "function" ? Object.is : v_;
  function Wo(n, i) {
    if (kn(n, i)) return !0;
    if (typeof n != "object" || n === null || typeof i != "object" || i === null) return !1;
    var a = Object.keys(n), c = Object.keys(i);
    if (a.length !== c.length) return !1;
    for (c = 0; c < a.length; c++) {
      var h = a[c];
      if (!p.call(i, h) || !kn(n[h], i[h])) return !1;
    }
    return !0;
  }
  function pg(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function hg(n, i) {
    var a = pg(n);
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
      a = pg(a);
    }
  }
  function gg(n, i) {
    return n && i ? n === i ? !0 : n && n.nodeType === 3 ? !1 : i && i.nodeType === 3 ? gg(n, i.parentNode) : "contains" in n ? n.contains(i) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function mg() {
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
  function Oc(n) {
    var i = n && n.nodeName && n.nodeName.toLowerCase();
    return i && (i === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || i === "textarea" || n.contentEditable === "true");
  }
  function w_(n) {
    var i = mg(), a = n.focusedElem, c = n.selectionRange;
    if (i !== a && a && a.ownerDocument && gg(a.ownerDocument.documentElement, a)) {
      if (c !== null && Oc(a)) {
        if (i = c.start, n = c.end, n === void 0 && (n = i), "selectionStart" in a) a.selectionStart = i, a.selectionEnd = Math.min(n, a.value.length);
        else if (n = (i = a.ownerDocument || document) && i.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var h = a.textContent.length, y = Math.min(c.start, h);
          c = c.end === void 0 ? y : Math.min(c.end, h), !n.extend && y > c && (h = c, c = y, y = h), h = hg(a, y);
          var R = hg(
            a,
            c
          );
          h && R && (n.rangeCount !== 1 || n.anchorNode !== h.node || n.anchorOffset !== h.offset || n.focusNode !== R.node || n.focusOffset !== R.offset) && (i = i.createRange(), i.setStart(h.node, h.offset), n.removeAllRanges(), y > c ? (n.addRange(i), n.extend(R.node, R.offset)) : (i.setEnd(R.node, R.offset), n.addRange(i)));
        }
      }
      for (i = [], n = a; n = n.parentNode; ) n.nodeType === 1 && i.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof a.focus == "function" && a.focus(), a = 0; a < i.length; a++) n = i[a], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var S_ = d && "documentMode" in document && 11 >= document.documentMode, Di = null, Lc = null, Uo = null, Dc = !1;
  function yg(n, i, a) {
    var c = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Dc || Di == null || Di !== qe(c) || (c = Di, "selectionStart" in c && Oc(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }), Uo && Wo(Uo, c) || (Uo = c, c = Na(Lc, "onSelect"), 0 < c.length && (i = new Pc("onSelect", "select", null, i, a), n.push({ event: i, listeners: c }), i.target = Di)));
  }
  function Ma(n, i) {
    var a = {};
    return a[n.toLowerCase()] = i.toLowerCase(), a["Webkit" + n] = "webkit" + i, a["Moz" + n] = "moz" + i, a;
  }
  var Fi = { animationend: Ma("Animation", "AnimationEnd"), animationiteration: Ma("Animation", "AnimationIteration"), animationstart: Ma("Animation", "AnimationStart"), transitionend: Ma("Transition", "TransitionEnd") }, Fc = {}, vg = {};
  d && (vg = document.createElement("div").style, "AnimationEvent" in window || (delete Fi.animationend.animation, delete Fi.animationiteration.animation, delete Fi.animationstart.animation), "TransitionEvent" in window || delete Fi.transitionend.transition);
  function Aa(n) {
    if (Fc[n]) return Fc[n];
    if (!Fi[n]) return n;
    var i = Fi[n], a;
    for (a in i) if (i.hasOwnProperty(a) && a in vg) return Fc[n] = i[a];
    return n;
  }
  var wg = Aa("animationend"), Sg = Aa("animationiteration"), bg = Aa("animationstart"), _g = Aa("transitionend"), xg = /* @__PURE__ */ new Map(), kg = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Rr(n, i) {
    xg.set(n, i), l(i, [n]);
  }
  for (var jc = 0; jc < kg.length; jc++) {
    var zc = kg[jc], b_ = zc.toLowerCase(), __ = zc[0].toUpperCase() + zc.slice(1);
    Rr(b_, "on" + __);
  }
  Rr(wg, "onAnimationEnd"), Rr(Sg, "onAnimationIteration"), Rr(bg, "onAnimationStart"), Rr("dblclick", "onDoubleClick"), Rr("focusin", "onFocus"), Rr("focusout", "onBlur"), Rr(_g, "onTransitionEnd"), u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Vo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), x_ = new Set("cancel close invalid load scroll toggle".split(" ").concat(Vo));
  function Cg(n, i, a) {
    var c = n.type || "unknown-event";
    n.currentTarget = a, bb(c, i, void 0, n), n.currentTarget = null;
  }
  function Eg(n, i) {
    i = (i & 4) !== 0;
    for (var a = 0; a < n.length; a++) {
      var c = n[a], h = c.event;
      c = c.listeners;
      e: {
        var y = void 0;
        if (i) for (var R = c.length - 1; 0 <= R; R--) {
          var W = c[R], q = W.instance, Z = W.currentTarget;
          if (W = W.listener, q !== y && h.isPropagationStopped()) break e;
          Cg(h, W, Z), y = q;
        }
        else for (R = 0; R < c.length; R++) {
          if (W = c[R], q = W.instance, Z = W.currentTarget, W = W.listener, q !== y && h.isPropagationStopped()) break e;
          Cg(h, W, Z), y = q;
        }
      }
    }
    if (ma) throw n = yc, ma = !1, yc = null, n;
  }
  function Ve(n, i) {
    var a = i[Qc];
    a === void 0 && (a = i[Qc] = /* @__PURE__ */ new Set());
    var c = n + "__bubble";
    a.has(c) || (Pg(i, n, 2, !1), a.add(c));
  }
  function Bc(n, i, a) {
    var c = 0;
    i && (c |= 4), Pg(a, n, c, i);
  }
  var Ia = "_reactListening" + Math.random().toString(36).slice(2);
  function Ho(n) {
    if (!n[Ia]) {
      n[Ia] = !0, o.forEach(function(a) {
        a !== "selectionchange" && (x_.has(a) || Bc(a, !1, n), Bc(a, !0, n));
      });
      var i = n.nodeType === 9 ? n : n.ownerDocument;
      i === null || i[Ia] || (i[Ia] = !0, Bc("selectionchange", !1, i));
    }
  }
  function Pg(n, i, a, c) {
    switch (Yh(i)) {
      case 1:
        var h = Db;
        break;
      case 4:
        h = Fb;
        break;
      default:
        h = kc;
    }
    a = h.bind(null, i, a, n), h = void 0, !mc || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (h = !0), c ? h !== void 0 ? n.addEventListener(i, a, { capture: !0, passive: h }) : n.addEventListener(i, a, !0) : h !== void 0 ? n.addEventListener(i, a, { passive: h }) : n.addEventListener(i, a, !1);
  }
  function Wc(n, i, a, c, h) {
    var y = c;
    if ((i & 1) === 0 && (i & 2) === 0 && c !== null) e: for (; ; ) {
      if (c === null) return;
      var R = c.tag;
      if (R === 3 || R === 4) {
        var W = c.stateNode.containerInfo;
        if (W === h || W.nodeType === 8 && W.parentNode === h) break;
        if (R === 4) for (R = c.return; R !== null; ) {
          var q = R.tag;
          if ((q === 3 || q === 4) && (q = R.stateNode.containerInfo, q === h || q.nodeType === 8 && q.parentNode === h)) return;
          R = R.return;
        }
        for (; W !== null; ) {
          if (R = ti(W), R === null) return;
          if (q = R.tag, q === 5 || q === 6) {
            c = y = R;
            continue e;
          }
          W = W.parentNode;
        }
      }
      c = c.return;
    }
    Ah(function() {
      var Z = y, oe = pc(a), ae = [];
      e: {
        var re = xg.get(n);
        if (re !== void 0) {
          var pe = Pc, me = n;
          switch (n) {
            case "keypress":
              if (Pa(a) === 0) break e;
            case "keydown":
            case "keyup":
              pe = Zb;
              break;
            case "focusin":
              me = "focus", pe = $c;
              break;
            case "focusout":
              me = "blur", pe = $c;
              break;
            case "beforeblur":
            case "afterblur":
              pe = $c;
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
              pe = Zh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pe = Bb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pe = n_;
              break;
            case wg:
            case Sg:
            case bg:
              pe = Vb;
              break;
            case _g:
              pe = i_;
              break;
            case "scroll":
              pe = jb;
              break;
            case "wheel":
              pe = s_;
              break;
            case "copy":
            case "cut":
            case "paste":
              pe = qb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pe = tg;
          }
          var ye = (i & 4) !== 0, it = !ye && n === "scroll", J = ye ? re !== null ? re + "Capture" : null : re;
          ye = [];
          for (var Q = Z, X; Q !== null; ) {
            X = Q;
            var ce = X.stateNode;
            if (X.tag === 5 && ce !== null && (X = ce, J !== null && (ce = Po(Q, J), ce != null && ye.push(qo(Q, ce, X)))), it) break;
            Q = Q.return;
          }
          0 < ye.length && (re = new pe(re, me, null, a, oe), ae.push({ event: re, listeners: ye }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (re = n === "mouseover" || n === "pointerover", pe = n === "mouseout" || n === "pointerout", re && a !== fc && (me = a.relatedTarget || a.fromElement) && (ti(me) || me[er])) break e;
          if ((pe || re) && (re = oe.window === oe ? oe : (re = oe.ownerDocument) ? re.defaultView || re.parentWindow : window, pe ? (me = a.relatedTarget || a.toElement, pe = Z, me = me ? ti(me) : null, me !== null && (it = ei(me), me !== it || me.tag !== 5 && me.tag !== 6) && (me = null)) : (pe = null, me = Z), pe !== me)) {
            if (ye = Zh, ce = "onMouseLeave", J = "onMouseEnter", Q = "mouse", (n === "pointerout" || n === "pointerover") && (ye = tg, ce = "onPointerLeave", J = "onPointerEnter", Q = "pointer"), it = pe == null ? re : Bi(pe), X = me == null ? re : Bi(me), re = new ye(ce, Q + "leave", pe, a, oe), re.target = it, re.relatedTarget = X, ce = null, ti(oe) === Z && (ye = new ye(J, Q + "enter", me, a, oe), ye.target = X, ye.relatedTarget = it, ce = ye), it = ce, pe && me) t: {
              for (ye = pe, J = me, Q = 0, X = ye; X; X = ji(X)) Q++;
              for (X = 0, ce = J; ce; ce = ji(ce)) X++;
              for (; 0 < Q - X; ) ye = ji(ye), Q--;
              for (; 0 < X - Q; ) J = ji(J), X--;
              for (; Q--; ) {
                if (ye === J || J !== null && ye === J.alternate) break t;
                ye = ji(ye), J = ji(J);
              }
              ye = null;
            }
            else ye = null;
            pe !== null && Rg(ae, re, pe, ye, !1), me !== null && it !== null && Rg(ae, it, me, ye, !0);
          }
        }
        e: {
          if (re = Z ? Bi(Z) : window, pe = re.nodeName && re.nodeName.toLowerCase(), pe === "select" || pe === "input" && re.type === "file") var ve = p_;
          else if (ag(re)) if (ug) ve = y_;
          else {
            ve = g_;
            var Se = h_;
          }
          else (pe = re.nodeName) && pe.toLowerCase() === "input" && (re.type === "checkbox" || re.type === "radio") && (ve = m_);
          if (ve && (ve = ve(n, Z))) {
            lg(ae, ve, a, oe);
            break e;
          }
          Se && Se(n, re, Z), n === "focusout" && (Se = re._wrapperState) && Se.controlled && re.type === "number" && Rt(re, "number", re.value);
        }
        switch (Se = Z ? Bi(Z) : window, n) {
          case "focusin":
            (ag(Se) || Se.contentEditable === "true") && (Di = Se, Lc = Z, Uo = null);
            break;
          case "focusout":
            Uo = Lc = Di = null;
            break;
          case "mousedown":
            Dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dc = !1, yg(ae, a, oe);
            break;
          case "selectionchange":
            if (S_) break;
          case "keydown":
          case "keyup":
            yg(ae, a, oe);
        }
        var be;
        if (Ac) e: {
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
        else Li ? og(n, a) && (ke = "onCompositionEnd") : n === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
        ke && (ng && a.locale !== "ko" && (Li || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && Li && (be = Jh()) : (Pr = oe, Ec = "value" in Pr ? Pr.value : Pr.textContent, Li = !0)), Se = Na(Z, ke), 0 < Se.length && (ke = new eg(ke, n, null, a, oe), ae.push({ event: ke, listeners: Se }), be ? ke.data = be : (be = sg(a), be !== null && (ke.data = be)))), (be = l_ ? u_(n, a) : c_(n, a)) && (Z = Na(Z, "onBeforeInput"), 0 < Z.length && (oe = new eg("onBeforeInput", "beforeinput", null, a, oe), ae.push({ event: oe, listeners: Z }), oe.data = be));
      }
      Eg(ae, i);
    });
  }
  function qo(n, i, a) {
    return { instance: n, listener: i, currentTarget: a };
  }
  function Na(n, i) {
    for (var a = i + "Capture", c = []; n !== null; ) {
      var h = n, y = h.stateNode;
      h.tag === 5 && y !== null && (h = y, y = Po(n, a), y != null && c.unshift(qo(n, y, h)), y = Po(n, i), y != null && c.push(qo(n, y, h))), n = n.return;
    }
    return c;
  }
  function ji(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Rg(n, i, a, c, h) {
    for (var y = i._reactName, R = []; a !== null && a !== c; ) {
      var W = a, q = W.alternate, Z = W.stateNode;
      if (q !== null && q === c) break;
      W.tag === 5 && Z !== null && (W = Z, h ? (q = Po(a, y), q != null && R.unshift(qo(a, q, W))) : h || (q = Po(a, y), q != null && R.push(qo(a, q, W)))), a = a.return;
    }
    R.length !== 0 && n.push({ event: i, listeners: R });
  }
  var k_ = /\r\n?/g, C_ = /\u0000|\uFFFD/g;
  function Tg(n) {
    return (typeof n == "string" ? n : "" + n).replace(k_, `
`).replace(C_, "");
  }
  function Oa(n, i, a) {
    if (i = Tg(i), Tg(n) !== i && a) throw Error(r(425));
  }
  function La() {
  }
  var Uc = null, Vc = null;
  function Hc(n, i) {
    return n === "textarea" || n === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var qc = typeof setTimeout == "function" ? setTimeout : void 0, E_ = typeof clearTimeout == "function" ? clearTimeout : void 0, $g = typeof Promise == "function" ? Promise : void 0, P_ = typeof queueMicrotask == "function" ? queueMicrotask : typeof $g < "u" ? function(n) {
    return $g.resolve(null).then(n).catch(R_);
  } : qc;
  function R_(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Kc(n, i) {
    var a = i, c = 0;
    do {
      var h = a.nextSibling;
      if (n.removeChild(a), h && h.nodeType === 8) if (a = h.data, a === "/$") {
        if (c === 0) {
          n.removeChild(h), Lo(i);
          return;
        }
        c--;
      } else a !== "$" && a !== "$?" && a !== "$!" || c++;
      a = h;
    } while (a);
    Lo(i);
  }
  function Tr(n) {
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
  function Mg(n) {
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
  var zi = Math.random().toString(36).slice(2), Dn = "__reactFiber$" + zi, Ko = "__reactProps$" + zi, er = "__reactContainer$" + zi, Qc = "__reactEvents$" + zi, T_ = "__reactListeners$" + zi, $_ = "__reactHandles$" + zi;
  function ti(n) {
    var i = n[Dn];
    if (i) return i;
    for (var a = n.parentNode; a; ) {
      if (i = a[er] || a[Dn]) {
        if (a = i.alternate, i.child !== null || a !== null && a.child !== null) for (n = Mg(n); n !== null; ) {
          if (a = n[Dn]) return a;
          n = Mg(n);
        }
        return i;
      }
      n = a, a = n.parentNode;
    }
    return null;
  }
  function Qo(n) {
    return n = n[Dn] || n[er], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Bi(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(r(33));
  }
  function Da(n) {
    return n[Ko] || null;
  }
  var Gc = [], Wi = -1;
  function $r(n) {
    return { current: n };
  }
  function He(n) {
    0 > Wi || (n.current = Gc[Wi], Gc[Wi] = null, Wi--);
  }
  function We(n, i) {
    Wi++, Gc[Wi] = n.current, n.current = i;
  }
  var Mr = {}, At = $r(Mr), Ht = $r(!1), ni = Mr;
  function Ui(n, i) {
    var a = n.type.contextTypes;
    if (!a) return Mr;
    var c = n.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === i) return c.__reactInternalMemoizedMaskedChildContext;
    var h = {}, y;
    for (y in a) h[y] = i[y];
    return c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = i, n.__reactInternalMemoizedMaskedChildContext = h), h;
  }
  function qt(n) {
    return n = n.childContextTypes, n != null;
  }
  function Fa() {
    He(Ht), He(At);
  }
  function Ag(n, i, a) {
    if (At.current !== Mr) throw Error(r(168));
    We(At, i), We(Ht, a);
  }
  function Ig(n, i, a) {
    var c = n.stateNode;
    if (i = i.childContextTypes, typeof c.getChildContext != "function") return a;
    c = c.getChildContext();
    for (var h in c) if (!(h in i)) throw Error(r(108, de(n) || "Unknown", h));
    return K({}, a, c);
  }
  function ja(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Mr, ni = At.current, We(At, n), We(Ht, Ht.current), !0;
  }
  function Ng(n, i, a) {
    var c = n.stateNode;
    if (!c) throw Error(r(169));
    a ? (n = Ig(n, i, ni), c.__reactInternalMemoizedMergedChildContext = n, He(Ht), He(At), We(At, n)) : He(Ht), We(Ht, a);
  }
  var tr = null, za = !1, Yc = !1;
  function Og(n) {
    tr === null ? tr = [n] : tr.push(n);
  }
  function M_(n) {
    za = !0, Og(n);
  }
  function Ar() {
    if (!Yc && tr !== null) {
      Yc = !0;
      var n = 0, i = Le;
      try {
        var a = tr;
        for (Le = 1; n < a.length; n++) {
          var c = a[n];
          do
            c = c(!0);
          while (c !== null);
        }
        tr = null, za = !1;
      } catch (h) {
        throw tr !== null && (tr = tr.slice(n + 1)), Dh(vc, Ar), h;
      } finally {
        Le = i, Yc = !1;
      }
    }
    return null;
  }
  var Vi = [], Hi = 0, Ba = null, Wa = 0, cn = [], dn = 0, ri = null, nr = 1, rr = "";
  function ii(n, i) {
    Vi[Hi++] = Wa, Vi[Hi++] = Ba, Ba = n, Wa = i;
  }
  function Lg(n, i, a) {
    cn[dn++] = nr, cn[dn++] = rr, cn[dn++] = ri, ri = n;
    var c = nr;
    n = rr;
    var h = 32 - xn(c) - 1;
    c &= ~(1 << h), a += 1;
    var y = 32 - xn(i) + h;
    if (30 < y) {
      var R = h - h % 5;
      y = (c & (1 << R) - 1).toString(32), c >>= R, h -= R, nr = 1 << 32 - xn(i) + h | a << h | c, rr = y + n;
    } else nr = 1 << y | a << h | c, rr = n;
  }
  function Jc(n) {
    n.return !== null && (ii(n, 1), Lg(n, 1, 0));
  }
  function Xc(n) {
    for (; n === Ba; ) Ba = Vi[--Hi], Vi[Hi] = null, Wa = Vi[--Hi], Vi[Hi] = null;
    for (; n === ri; ) ri = cn[--dn], cn[dn] = null, rr = cn[--dn], cn[dn] = null, nr = cn[--dn], cn[dn] = null;
  }
  var en = null, tn = null, Ke = !1, Cn = null;
  function Dg(n, i) {
    var a = gn(5, null, null, 0);
    a.elementType = "DELETED", a.stateNode = i, a.return = n, i = n.deletions, i === null ? (n.deletions = [a], n.flags |= 16) : i.push(a);
  }
  function Fg(n, i) {
    switch (n.tag) {
      case 5:
        var a = n.type;
        return i = i.nodeType !== 1 || a.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (n.stateNode = i, en = n, tn = Tr(i.firstChild), !0) : !1;
      case 6:
        return i = n.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (n.stateNode = i, en = n, tn = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (a = ri !== null ? { id: nr, overflow: rr } : null, n.memoizedState = { dehydrated: i, treeContext: a, retryLane: 1073741824 }, a = gn(18, null, null, 0), a.stateNode = i, a.return = n, n.child = a, en = n, tn = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Zc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function ed(n) {
    if (Ke) {
      var i = tn;
      if (i) {
        var a = i;
        if (!Fg(n, i)) {
          if (Zc(n)) throw Error(r(418));
          i = Tr(a.nextSibling);
          var c = en;
          i && Fg(n, i) ? Dg(c, a) : (n.flags = n.flags & -4097 | 2, Ke = !1, en = n);
        }
      } else {
        if (Zc(n)) throw Error(r(418));
        n.flags = n.flags & -4097 | 2, Ke = !1, en = n;
      }
    }
  }
  function jg(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    en = n;
  }
  function Ua(n) {
    if (n !== en) return !1;
    if (!Ke) return jg(n), Ke = !0, !1;
    var i;
    if ((i = n.tag !== 3) && !(i = n.tag !== 5) && (i = n.type, i = i !== "head" && i !== "body" && !Hc(n.type, n.memoizedProps)), i && (i = tn)) {
      if (Zc(n)) throw zg(), Error(r(418));
      for (; i; ) Dg(n, i), i = Tr(i.nextSibling);
    }
    if (jg(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
      e: {
        for (n = n.nextSibling, i = 0; n; ) {
          if (n.nodeType === 8) {
            var a = n.data;
            if (a === "/$") {
              if (i === 0) {
                tn = Tr(n.nextSibling);
                break e;
              }
              i--;
            } else a !== "$" && a !== "$!" && a !== "$?" || i++;
          }
          n = n.nextSibling;
        }
        tn = null;
      }
    } else tn = en ? Tr(n.stateNode.nextSibling) : null;
    return !0;
  }
  function zg() {
    for (var n = tn; n; ) n = Tr(n.nextSibling);
  }
  function qi() {
    tn = en = null, Ke = !1;
  }
  function td(n) {
    Cn === null ? Cn = [n] : Cn.push(n);
  }
  var A_ = P.ReactCurrentBatchConfig;
  function Go(n, i, a) {
    if (n = a.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (a._owner) {
        if (a = a._owner, a) {
          if (a.tag !== 1) throw Error(r(309));
          var c = a.stateNode;
        }
        if (!c) throw Error(r(147, n));
        var h = c, y = "" + n;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === y ? i.ref : (i = function(R) {
          var W = h.refs;
          R === null ? delete W[y] : W[y] = R;
        }, i._stringRef = y, i);
      }
      if (typeof n != "string") throw Error(r(284));
      if (!a._owner) throw Error(r(290, n));
    }
    return n;
  }
  function Va(n, i) {
    throw n = Object.prototype.toString.call(i), Error(r(31, n === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : n));
  }
  function Bg(n) {
    var i = n._init;
    return i(n._payload);
  }
  function Wg(n) {
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
      return J = zr(J, Q), J.index = 0, J.sibling = null, J;
    }
    function y(J, Q, X) {
      return J.index = X, n ? (X = J.alternate, X !== null ? (X = X.index, X < Q ? (J.flags |= 2, Q) : X) : (J.flags |= 2, Q)) : (J.flags |= 1048576, Q);
    }
    function R(J) {
      return n && J.alternate === null && (J.flags |= 2), J;
    }
    function W(J, Q, X, ce) {
      return Q === null || Q.tag !== 6 ? (Q = qd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function q(J, Q, X, ce) {
      var ve = X.type;
      return ve === A ? oe(J, Q, X.props.children, ce, X.key) : Q !== null && (Q.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === V && Bg(ve) === Q.type) ? (ce = h(Q, X.props), ce.ref = Go(J, Q, X), ce.return = J, ce) : (ce = hl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Go(J, Q, X), ce.return = J, ce);
    }
    function Z(J, Q, X, ce) {
      return Q === null || Q.tag !== 4 || Q.stateNode.containerInfo !== X.containerInfo || Q.stateNode.implementation !== X.implementation ? (Q = Kd(X, J.mode, ce), Q.return = J, Q) : (Q = h(Q, X.children || []), Q.return = J, Q);
    }
    function oe(J, Q, X, ce, ve) {
      return Q === null || Q.tag !== 7 ? (Q = fi(X, J.mode, ce, ve), Q.return = J, Q) : (Q = h(Q, X), Q.return = J, Q);
    }
    function ae(J, Q, X) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return Q = qd("" + Q, J.mode, X), Q.return = J, Q;
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case E:
            return X = hl(Q.type, Q.key, Q.props, null, J.mode, X), X.ref = Go(J, null, Q), X.return = J, X;
          case $:
            return Q = Kd(Q, J.mode, X), Q.return = J, Q;
          case V:
            var ce = Q._init;
            return ae(J, ce(Q._payload), X);
        }
        if (ct(Q) || H(Q)) return Q = fi(Q, J.mode, X, null), Q.return = J, Q;
        Va(J, Q);
      }
      return null;
    }
    function re(J, Q, X, ce) {
      var ve = Q !== null ? Q.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return ve !== null ? null : W(J, Q, "" + X, ce);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case E:
            return X.key === ve ? q(J, Q, X, ce) : null;
          case $:
            return X.key === ve ? Z(J, Q, X, ce) : null;
          case V:
            return ve = X._init, re(
              J,
              Q,
              ve(X._payload),
              ce
            );
        }
        if (ct(X) || H(X)) return ve !== null ? null : oe(J, Q, X, ce, null);
        Va(J, X);
      }
      return null;
    }
    function pe(J, Q, X, ce, ve) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number") return J = J.get(X) || null, W(Q, J, "" + ce, ve);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case E:
            return J = J.get(ce.key === null ? X : ce.key) || null, q(Q, J, ce, ve);
          case $:
            return J = J.get(ce.key === null ? X : ce.key) || null, Z(Q, J, ce, ve);
          case V:
            var Se = ce._init;
            return pe(J, Q, X, Se(ce._payload), ve);
        }
        if (ct(ce) || H(ce)) return J = J.get(X) || null, oe(Q, J, ce, ve, null);
        Va(Q, ce);
      }
      return null;
    }
    function me(J, Q, X, ce) {
      for (var ve = null, Se = null, be = Q, ke = Q = 0, yt = null; be !== null && ke < X.length; ke++) {
        be.index > ke ? (yt = be, be = null) : yt = be.sibling;
        var $e = re(J, be, X[ke], ce);
        if ($e === null) {
          be === null && (be = yt);
          break;
        }
        n && be && $e.alternate === null && i(J, be), Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e, be = yt;
      }
      if (ke === X.length) return a(J, be), Ke && ii(J, ke), ve;
      if (be === null) {
        for (; ke < X.length; ke++) be = ae(J, X[ke], ce), be !== null && (Q = y(be, Q, ke), Se === null ? ve = be : Se.sibling = be, Se = be);
        return Ke && ii(J, ke), ve;
      }
      for (be = c(J, be); ke < X.length; ke++) yt = pe(be, J, ke, X[ke], ce), yt !== null && (n && yt.alternate !== null && be.delete(yt.key === null ? ke : yt.key), Q = y(yt, Q, ke), Se === null ? ve = yt : Se.sibling = yt, Se = yt);
      return n && be.forEach(function(Br) {
        return i(J, Br);
      }), Ke && ii(J, ke), ve;
    }
    function ye(J, Q, X, ce) {
      var ve = H(X);
      if (typeof ve != "function") throw Error(r(150));
      if (X = ve.call(X), X == null) throw Error(r(151));
      for (var Se = ve = null, be = Q, ke = Q = 0, yt = null, $e = X.next(); be !== null && !$e.done; ke++, $e = X.next()) {
        be.index > ke ? (yt = be, be = null) : yt = be.sibling;
        var Br = re(J, be, $e.value, ce);
        if (Br === null) {
          be === null && (be = yt);
          break;
        }
        n && be && Br.alternate === null && i(J, be), Q = y(Br, Q, ke), Se === null ? ve = Br : Se.sibling = Br, Se = Br, be = yt;
      }
      if ($e.done) return a(
        J,
        be
      ), Ke && ii(J, ke), ve;
      if (be === null) {
        for (; !$e.done; ke++, $e = X.next()) $e = ae(J, $e.value, ce), $e !== null && (Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
        return Ke && ii(J, ke), ve;
      }
      for (be = c(J, be); !$e.done; ke++, $e = X.next()) $e = pe(be, J, ke, $e.value, ce), $e !== null && (n && $e.alternate !== null && be.delete($e.key === null ? ke : $e.key), Q = y($e, Q, ke), Se === null ? ve = $e : Se.sibling = $e, Se = $e);
      return n && be.forEach(function(dx) {
        return i(J, dx);
      }), Ke && ii(J, ke), ve;
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
                  } else if (Se.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === V && Bg(ve) === Se.type) {
                    a(J, Se.sibling), Q = h(Se, X.props), Q.ref = Go(J, Se, X), Q.return = J, J = Q;
                    break e;
                  }
                  a(J, Se);
                  break;
                } else i(J, Se);
                Se = Se.sibling;
              }
              X.type === A ? (Q = fi(X.props.children, J.mode, ce, X.key), Q.return = J, J = Q) : (ce = hl(X.type, X.key, X.props, null, J.mode, ce), ce.ref = Go(J, Q, X), ce.return = J, J = ce);
            }
            return R(J);
          case $:
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
              Q = Kd(X, J.mode, ce), Q.return = J, J = Q;
            }
            return R(J);
          case V:
            return Se = X._init, it(J, Q, Se(X._payload), ce);
        }
        if (ct(X)) return me(J, Q, X, ce);
        if (H(X)) return ye(J, Q, X, ce);
        Va(J, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, Q !== null && Q.tag === 6 ? (a(J, Q.sibling), Q = h(Q, X), Q.return = J, J = Q) : (a(J, Q), Q = qd(X, J.mode, ce), Q.return = J, J = Q), R(J)) : a(J, Q);
    }
    return it;
  }
  var Ki = Wg(!0), Ug = Wg(!1), Ha = $r(null), qa = null, Qi = null, nd = null;
  function rd() {
    nd = Qi = qa = null;
  }
  function id(n) {
    var i = Ha.current;
    He(Ha), n._currentValue = i;
  }
  function od(n, i, a) {
    for (; n !== null; ) {
      var c = n.alternate;
      if ((n.childLanes & i) !== i ? (n.childLanes |= i, c !== null && (c.childLanes |= i)) : c !== null && (c.childLanes & i) !== i && (c.childLanes |= i), n === a) break;
      n = n.return;
    }
  }
  function Gi(n, i) {
    qa = n, nd = Qi = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & i) !== 0 && (Kt = !0), n.firstContext = null);
  }
  function fn(n) {
    var i = n._currentValue;
    if (nd !== n) if (n = { context: n, memoizedValue: i, next: null }, Qi === null) {
      if (qa === null) throw Error(r(308));
      Qi = n, qa.dependencies = { lanes: 0, firstContext: n };
    } else Qi = Qi.next = n;
    return i;
  }
  var oi = null;
  function sd(n) {
    oi === null ? oi = [n] : oi.push(n);
  }
  function Vg(n, i, a, c) {
    var h = i.interleaved;
    return h === null ? (a.next = a, sd(i)) : (a.next = h.next, h.next = a), i.interleaved = a, ir(n, c);
  }
  function ir(n, i) {
    n.lanes |= i;
    var a = n.alternate;
    for (a !== null && (a.lanes |= i), a = n, n = n.return; n !== null; ) n.childLanes |= i, a = n.alternate, a !== null && (a.childLanes |= i), a = n, n = n.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var Ir = !1;
  function ad(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Hg(n, i) {
    n = n.updateQueue, i.updateQueue === n && (i.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function or(n, i) {
    return { eventTime: n, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function Nr(n, i, a) {
    var c = n.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (Te & 2) !== 0) {
      var h = c.pending;
      return h === null ? i.next = i : (i.next = h.next, h.next = i), c.pending = i, ir(n, a);
    }
    return h = c.interleaved, h === null ? (i.next = i, sd(c)) : (i.next = h.next, h.next = i), c.interleaved = i, ir(n, a);
  }
  function Ka(n, i, a) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (a & 4194240) !== 0)) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, bc(n, a);
    }
  }
  function qg(n, i) {
    var a = n.updateQueue, c = n.alternate;
    if (c !== null && (c = c.updateQueue, a === c)) {
      var h = null, y = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var R = { eventTime: a.eventTime, lane: a.lane, tag: a.tag, payload: a.payload, callback: a.callback, next: null };
          y === null ? h = y = R : y = y.next = R, a = a.next;
        } while (a !== null);
        y === null ? h = y = i : y = y.next = i;
      } else h = y = i;
      a = { baseState: c.baseState, firstBaseUpdate: h, lastBaseUpdate: y, shared: c.shared, effects: c.effects }, n.updateQueue = a;
      return;
    }
    n = a.lastBaseUpdate, n === null ? a.firstBaseUpdate = i : n.next = i, a.lastBaseUpdate = i;
  }
  function Qa(n, i, a, c) {
    var h = n.updateQueue;
    Ir = !1;
    var y = h.firstBaseUpdate, R = h.lastBaseUpdate, W = h.shared.pending;
    if (W !== null) {
      h.shared.pending = null;
      var q = W, Z = q.next;
      q.next = null, R === null ? y = Z : R.next = Z, R = q;
      var oe = n.alternate;
      oe !== null && (oe = oe.updateQueue, W = oe.lastBaseUpdate, W !== R && (W === null ? oe.firstBaseUpdate = Z : W.next = Z, oe.lastBaseUpdate = q));
    }
    if (y !== null) {
      var ae = h.baseState;
      R = 0, oe = Z = q = null, W = y;
      do {
        var re = W.lane, pe = W.eventTime;
        if ((c & re) === re) {
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
            switch (re = i, pe = a, ye.tag) {
              case 1:
                if (me = ye.payload, typeof me == "function") {
                  ae = me.call(pe, ae, re);
                  break e;
                }
                ae = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = ye.payload, re = typeof me == "function" ? me.call(pe, ae, re) : me, re == null) break e;
                ae = K({}, ae, re);
                break e;
              case 2:
                Ir = !0;
            }
          }
          W.callback !== null && W.lane !== 0 && (n.flags |= 64, re = h.effects, re === null ? h.effects = [W] : re.push(W));
        } else pe = { eventTime: pe, lane: re, tag: W.tag, payload: W.payload, callback: W.callback, next: null }, oe === null ? (Z = oe = pe, q = ae) : oe = oe.next = pe, R |= re;
        if (W = W.next, W === null) {
          if (W = h.shared.pending, W === null) break;
          re = W, W = re.next, re.next = null, h.lastBaseUpdate = re, h.shared.pending = null;
        }
      } while (!0);
      if (oe === null && (q = ae), h.baseState = q, h.firstBaseUpdate = Z, h.lastBaseUpdate = oe, i = h.shared.interleaved, i !== null) {
        h = i;
        do
          R |= h.lane, h = h.next;
        while (h !== i);
      } else y === null && (h.shared.lanes = 0);
      li |= R, n.lanes = R, n.memoizedState = ae;
    }
  }
  function Kg(n, i, a) {
    if (n = i.effects, i.effects = null, n !== null) for (i = 0; i < n.length; i++) {
      var c = n[i], h = c.callback;
      if (h !== null) {
        if (c.callback = null, c = a, typeof h != "function") throw Error(r(191, h));
        h.call(c);
      }
    }
  }
  var Yo = {}, Fn = $r(Yo), Jo = $r(Yo), Xo = $r(Yo);
  function si(n) {
    if (n === Yo) throw Error(r(174));
    return n;
  }
  function ld(n, i) {
    switch (We(Xo, i), We(Jo, n), We(Fn, Yo), n = i.nodeType, n) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Vt(null, "");
        break;
      default:
        n = n === 8 ? i.parentNode : i, i = n.namespaceURI || null, n = n.tagName, i = Vt(i, n);
    }
    He(Fn), We(Fn, i);
  }
  function Yi() {
    He(Fn), He(Jo), He(Xo);
  }
  function Qg(n) {
    si(Xo.current);
    var i = si(Fn.current), a = Vt(i, n.type);
    i !== a && (We(Jo, n), We(Fn, a));
  }
  function ud(n) {
    Jo.current === n && (He(Fn), He(Jo));
  }
  var Ge = $r(0);
  function Ga(n) {
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
  var cd = [];
  function dd() {
    for (var n = 0; n < cd.length; n++) cd[n]._workInProgressVersionPrimary = null;
    cd.length = 0;
  }
  var Ya = P.ReactCurrentDispatcher, fd = P.ReactCurrentBatchConfig, ai = 0, Ye = null, dt = null, gt = null, Ja = !1, Zo = !1, es = 0, I_ = 0;
  function It() {
    throw Error(r(321));
  }
  function pd(n, i) {
    if (i === null) return !1;
    for (var a = 0; a < i.length && a < n.length; a++) if (!kn(n[a], i[a])) return !1;
    return !0;
  }
  function hd(n, i, a, c, h, y) {
    if (ai = y, Ye = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, Ya.current = n === null || n.memoizedState === null ? D_ : F_, n = a(c, h), Zo) {
      y = 0;
      do {
        if (Zo = !1, es = 0, 25 <= y) throw Error(r(301));
        y += 1, gt = dt = null, i.updateQueue = null, Ya.current = j_, n = a(c, h);
      } while (Zo);
    }
    if (Ya.current = el, i = dt !== null && dt.next !== null, ai = 0, gt = dt = Ye = null, Ja = !1, i) throw Error(r(300));
    return n;
  }
  function gd() {
    var n = es !== 0;
    return es = 0, n;
  }
  function jn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return gt === null ? Ye.memoizedState = gt = n : gt = gt.next = n, gt;
  }
  function pn() {
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
  function ts(n, i) {
    return typeof i == "function" ? i(n) : i;
  }
  function md(n) {
    var i = pn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = dt, h = c.baseQueue, y = a.pending;
    if (y !== null) {
      if (h !== null) {
        var R = h.next;
        h.next = y.next, y.next = R;
      }
      c.baseQueue = h = y, a.pending = null;
    }
    if (h !== null) {
      y = h.next, c = c.baseState;
      var W = R = null, q = null, Z = y;
      do {
        var oe = Z.lane;
        if ((ai & oe) === oe) q !== null && (q = q.next = { lane: 0, action: Z.action, hasEagerState: Z.hasEagerState, eagerState: Z.eagerState, next: null }), c = Z.hasEagerState ? Z.eagerState : n(c, Z.action);
        else {
          var ae = {
            lane: oe,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          };
          q === null ? (W = q = ae, R = c) : q = q.next = ae, Ye.lanes |= oe, li |= oe;
        }
        Z = Z.next;
      } while (Z !== null && Z !== y);
      q === null ? R = c : q.next = W, kn(c, i.memoizedState) || (Kt = !0), i.memoizedState = c, i.baseState = R, i.baseQueue = q, a.lastRenderedState = c;
    }
    if (n = a.interleaved, n !== null) {
      h = n;
      do
        y = h.lane, Ye.lanes |= y, li |= y, h = h.next;
      while (h !== n);
    } else h === null && (a.lanes = 0);
    return [i.memoizedState, a.dispatch];
  }
  function yd(n) {
    var i = pn(), a = i.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var c = a.dispatch, h = a.pending, y = i.memoizedState;
    if (h !== null) {
      a.pending = null;
      var R = h = h.next;
      do
        y = n(y, R.action), R = R.next;
      while (R !== h);
      kn(y, i.memoizedState) || (Kt = !0), i.memoizedState = y, i.baseQueue === null && (i.baseState = y), a.lastRenderedState = y;
    }
    return [y, c];
  }
  function Gg() {
  }
  function Yg(n, i) {
    var a = Ye, c = pn(), h = i(), y = !kn(c.memoizedState, h);
    if (y && (c.memoizedState = h, Kt = !0), c = c.queue, vd(Zg.bind(null, a, c, n), [n]), c.getSnapshot !== i || y || gt !== null && gt.memoizedState.tag & 1) {
      if (a.flags |= 2048, ns(9, Xg.bind(null, a, c, h, i), void 0, null), mt === null) throw Error(r(349));
      (ai & 30) !== 0 || Jg(a, i, h);
    }
    return h;
  }
  function Jg(n, i, a) {
    n.flags |= 16384, n = { getSnapshot: i, value: a }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.stores = [n]) : (a = i.stores, a === null ? i.stores = [n] : a.push(n));
  }
  function Xg(n, i, a, c) {
    i.value = a, i.getSnapshot = c, em(i) && tm(n);
  }
  function Zg(n, i, a) {
    return a(function() {
      em(i) && tm(n);
    });
  }
  function em(n) {
    var i = n.getSnapshot;
    n = n.value;
    try {
      var a = i();
      return !kn(n, a);
    } catch {
      return !0;
    }
  }
  function tm(n) {
    var i = ir(n, 1);
    i !== null && Tn(i, n, 1, -1);
  }
  function nm(n) {
    var i = jn();
    return typeof n == "function" && (n = n()), i.memoizedState = i.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ts, lastRenderedState: n }, i.queue = n, n = n.dispatch = L_.bind(null, Ye, n), [i.memoizedState, n];
  }
  function ns(n, i, a, c) {
    return n = { tag: n, create: i, destroy: a, deps: c, next: null }, i = Ye.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Ye.updateQueue = i, i.lastEffect = n.next = n) : (a = i.lastEffect, a === null ? i.lastEffect = n.next = n : (c = a.next, a.next = n, n.next = c, i.lastEffect = n)), n;
  }
  function rm() {
    return pn().memoizedState;
  }
  function Xa(n, i, a, c) {
    var h = jn();
    Ye.flags |= n, h.memoizedState = ns(1 | i, a, void 0, c === void 0 ? null : c);
  }
  function Za(n, i, a, c) {
    var h = pn();
    c = c === void 0 ? null : c;
    var y = void 0;
    if (dt !== null) {
      var R = dt.memoizedState;
      if (y = R.destroy, c !== null && pd(c, R.deps)) {
        h.memoizedState = ns(i, a, y, c);
        return;
      }
    }
    Ye.flags |= n, h.memoizedState = ns(1 | i, a, y, c);
  }
  function im(n, i) {
    return Xa(8390656, 8, n, i);
  }
  function vd(n, i) {
    return Za(2048, 8, n, i);
  }
  function om(n, i) {
    return Za(4, 2, n, i);
  }
  function sm(n, i) {
    return Za(4, 4, n, i);
  }
  function am(n, i) {
    if (typeof i == "function") return n = n(), i(n), function() {
      i(null);
    };
    if (i != null) return n = n(), i.current = n, function() {
      i.current = null;
    };
  }
  function lm(n, i, a) {
    return a = a != null ? a.concat([n]) : null, Za(4, 4, am.bind(null, i, n), a);
  }
  function wd() {
  }
  function um(n, i) {
    var a = pn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && pd(i, c[1]) ? c[0] : (a.memoizedState = [n, i], n);
  }
  function cm(n, i) {
    var a = pn();
    i = i === void 0 ? null : i;
    var c = a.memoizedState;
    return c !== null && i !== null && pd(i, c[1]) ? c[0] : (n = n(), a.memoizedState = [n, i], n);
  }
  function dm(n, i, a) {
    return (ai & 21) === 0 ? (n.baseState && (n.baseState = !1, Kt = !0), n.memoizedState = a) : (kn(a, i) || (a = Bh(), Ye.lanes |= a, li |= a, n.baseState = !0), i);
  }
  function N_(n, i) {
    var a = Le;
    Le = a !== 0 && 4 > a ? a : 4, n(!0);
    var c = fd.transition;
    fd.transition = {};
    try {
      n(!1), i();
    } finally {
      Le = a, fd.transition = c;
    }
  }
  function fm() {
    return pn().memoizedState;
  }
  function O_(n, i, a) {
    var c = Fr(n);
    if (a = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null }, pm(n)) hm(i, a);
    else if (a = Vg(n, i, a, c), a !== null) {
      var h = Bt();
      Tn(a, n, c, h), gm(a, i, c);
    }
  }
  function L_(n, i, a) {
    var c = Fr(n), h = { lane: c, action: a, hasEagerState: !1, eagerState: null, next: null };
    if (pm(n)) hm(i, h);
    else {
      var y = n.alternate;
      if (n.lanes === 0 && (y === null || y.lanes === 0) && (y = i.lastRenderedReducer, y !== null)) try {
        var R = i.lastRenderedState, W = y(R, a);
        if (h.hasEagerState = !0, h.eagerState = W, kn(W, R)) {
          var q = i.interleaved;
          q === null ? (h.next = h, sd(i)) : (h.next = q.next, q.next = h), i.interleaved = h;
          return;
        }
      } catch {
      }
      a = Vg(n, i, h, c), a !== null && (h = Bt(), Tn(a, n, c, h), gm(a, i, c));
    }
  }
  function pm(n) {
    var i = n.alternate;
    return n === Ye || i !== null && i === Ye;
  }
  function hm(n, i) {
    Zo = Ja = !0;
    var a = n.pending;
    a === null ? i.next = i : (i.next = a.next, a.next = i), n.pending = i;
  }
  function gm(n, i, a) {
    if ((a & 4194240) !== 0) {
      var c = i.lanes;
      c &= n.pendingLanes, a |= c, i.lanes = a, bc(n, a);
    }
  }
  var el = { readContext: fn, useCallback: It, useContext: It, useEffect: It, useImperativeHandle: It, useInsertionEffect: It, useLayoutEffect: It, useMemo: It, useReducer: It, useRef: It, useState: It, useDebugValue: It, useDeferredValue: It, useTransition: It, useMutableSource: It, useSyncExternalStore: It, useId: It, unstable_isNewReconciler: !1 }, D_ = { readContext: fn, useCallback: function(n, i) {
    return jn().memoizedState = [n, i === void 0 ? null : i], n;
  }, useContext: fn, useEffect: im, useImperativeHandle: function(n, i, a) {
    return a = a != null ? a.concat([n]) : null, Xa(
      4194308,
      4,
      am.bind(null, i, n),
      a
    );
  }, useLayoutEffect: function(n, i) {
    return Xa(4194308, 4, n, i);
  }, useInsertionEffect: function(n, i) {
    return Xa(4, 2, n, i);
  }, useMemo: function(n, i) {
    var a = jn();
    return i = i === void 0 ? null : i, n = n(), a.memoizedState = [n, i], n;
  }, useReducer: function(n, i, a) {
    var c = jn();
    return i = a !== void 0 ? a(i) : i, c.memoizedState = c.baseState = i, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: i }, c.queue = n, n = n.dispatch = O_.bind(null, Ye, n), [c.memoizedState, n];
  }, useRef: function(n) {
    var i = jn();
    return n = { current: n }, i.memoizedState = n;
  }, useState: nm, useDebugValue: wd, useDeferredValue: function(n) {
    return jn().memoizedState = n;
  }, useTransition: function() {
    var n = nm(!1), i = n[0];
    return n = N_.bind(null, n[1]), jn().memoizedState = n, [i, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, i, a) {
    var c = Ye, h = jn();
    if (Ke) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else {
      if (a = i(), mt === null) throw Error(r(349));
      (ai & 30) !== 0 || Jg(c, i, a);
    }
    h.memoizedState = a;
    var y = { value: a, getSnapshot: i };
    return h.queue = y, im(Zg.bind(
      null,
      c,
      y,
      n
    ), [n]), c.flags |= 2048, ns(9, Xg.bind(null, c, y, a, i), void 0, null), a;
  }, useId: function() {
    var n = jn(), i = mt.identifierPrefix;
    if (Ke) {
      var a = rr, c = nr;
      a = (c & ~(1 << 32 - xn(c) - 1)).toString(32) + a, i = ":" + i + "R" + a, a = es++, 0 < a && (i += "H" + a.toString(32)), i += ":";
    } else a = I_++, i = ":" + i + "r" + a.toString(32) + ":";
    return n.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, F_ = {
    readContext: fn,
    useCallback: um,
    useContext: fn,
    useEffect: vd,
    useImperativeHandle: lm,
    useInsertionEffect: om,
    useLayoutEffect: sm,
    useMemo: cm,
    useReducer: md,
    useRef: rm,
    useState: function() {
      return md(ts);
    },
    useDebugValue: wd,
    useDeferredValue: function(n) {
      var i = pn();
      return dm(i, dt.memoizedState, n);
    },
    useTransition: function() {
      var n = md(ts)[0], i = pn().memoizedState;
      return [n, i];
    },
    useMutableSource: Gg,
    useSyncExternalStore: Yg,
    useId: fm,
    unstable_isNewReconciler: !1
  }, j_ = { readContext: fn, useCallback: um, useContext: fn, useEffect: vd, useImperativeHandle: lm, useInsertionEffect: om, useLayoutEffect: sm, useMemo: cm, useReducer: yd, useRef: rm, useState: function() {
    return yd(ts);
  }, useDebugValue: wd, useDeferredValue: function(n) {
    var i = pn();
    return dt === null ? i.memoizedState = n : dm(i, dt.memoizedState, n);
  }, useTransition: function() {
    var n = yd(ts)[0], i = pn().memoizedState;
    return [n, i];
  }, useMutableSource: Gg, useSyncExternalStore: Yg, useId: fm, unstable_isNewReconciler: !1 };
  function En(n, i) {
    if (n && n.defaultProps) {
      i = K({}, i), n = n.defaultProps;
      for (var a in n) i[a] === void 0 && (i[a] = n[a]);
      return i;
    }
    return i;
  }
  function Sd(n, i, a, c) {
    i = n.memoizedState, a = a(c, i), a = a == null ? i : K({}, i, a), n.memoizedState = a, n.lanes === 0 && (n.updateQueue.baseState = a);
  }
  var tl = { isMounted: function(n) {
    return (n = n._reactInternals) ? ei(n) === n : !1;
  }, enqueueSetState: function(n, i, a) {
    n = n._reactInternals;
    var c = Bt(), h = Fr(n), y = or(c, h);
    y.payload = i, a != null && (y.callback = a), i = Nr(n, y, h), i !== null && (Tn(i, n, h, c), Ka(i, n, h));
  }, enqueueReplaceState: function(n, i, a) {
    n = n._reactInternals;
    var c = Bt(), h = Fr(n), y = or(c, h);
    y.tag = 1, y.payload = i, a != null && (y.callback = a), i = Nr(n, y, h), i !== null && (Tn(i, n, h, c), Ka(i, n, h));
  }, enqueueForceUpdate: function(n, i) {
    n = n._reactInternals;
    var a = Bt(), c = Fr(n), h = or(a, c);
    h.tag = 2, i != null && (h.callback = i), i = Nr(n, h, c), i !== null && (Tn(i, n, c, a), Ka(i, n, c));
  } };
  function mm(n, i, a, c, h, y, R) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(c, y, R) : i.prototype && i.prototype.isPureReactComponent ? !Wo(a, c) || !Wo(h, y) : !0;
  }
  function ym(n, i, a) {
    var c = !1, h = Mr, y = i.contextType;
    return typeof y == "object" && y !== null ? y = fn(y) : (h = qt(i) ? ni : At.current, c = i.contextTypes, y = (c = c != null) ? Ui(n, h) : Mr), i = new i(a, y), n.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = tl, n.stateNode = i, i._reactInternals = n, c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = h, n.__reactInternalMemoizedMaskedChildContext = y), i;
  }
  function vm(n, i, a, c) {
    n = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, c), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, c), i.state !== n && tl.enqueueReplaceState(i, i.state, null);
  }
  function bd(n, i, a, c) {
    var h = n.stateNode;
    h.props = a, h.state = n.memoizedState, h.refs = {}, ad(n);
    var y = i.contextType;
    typeof y == "object" && y !== null ? h.context = fn(y) : (y = qt(i) ? ni : At.current, h.context = Ui(n, y)), h.state = n.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (Sd(n, i, y, a), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (i = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), i !== h.state && tl.enqueueReplaceState(h, h.state, null), Qa(n, a, h, c), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Ji(n, i) {
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
  function _d(n, i, a) {
    return { value: n, source: null, stack: a ?? null, digest: i ?? null };
  }
  function xd(n, i) {
    try {
      console.error(i.value);
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  var z_ = typeof WeakMap == "function" ? WeakMap : Map;
  function wm(n, i, a) {
    a = or(-1, a), a.tag = 3, a.payload = { element: null };
    var c = i.value;
    return a.callback = function() {
      ll || (ll = !0, Fd = c), xd(n, i);
    }, a;
  }
  function Sm(n, i, a) {
    a = or(-1, a), a.tag = 3;
    var c = n.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = i.value;
      a.payload = function() {
        return c(h);
      }, a.callback = function() {
        xd(n, i);
      };
    }
    var y = n.stateNode;
    return y !== null && typeof y.componentDidCatch == "function" && (a.callback = function() {
      xd(n, i), typeof c != "function" && (Lr === null ? Lr = /* @__PURE__ */ new Set([this]) : Lr.add(this));
      var R = i.stack;
      this.componentDidCatch(i.value, { componentStack: R !== null ? R : "" });
    }), a;
  }
  function bm(n, i, a) {
    var c = n.pingCache;
    if (c === null) {
      c = n.pingCache = new z_();
      var h = /* @__PURE__ */ new Set();
      c.set(i, h);
    } else h = c.get(i), h === void 0 && (h = /* @__PURE__ */ new Set(), c.set(i, h));
    h.has(a) || (h.add(a), n = ex.bind(null, n, i, a), i.then(n, n));
  }
  function _m(n) {
    do {
      var i;
      if ((i = n.tag === 13) && (i = n.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function xm(n, i, a, c, h) {
    return (n.mode & 1) === 0 ? (n === i ? n.flags |= 65536 : (n.flags |= 128, a.flags |= 131072, a.flags &= -52805, a.tag === 1 && (a.alternate === null ? a.tag = 17 : (i = or(-1, 1), i.tag = 2, Nr(a, i, 1))), a.lanes |= 1), n) : (n.flags |= 65536, n.lanes = h, n);
  }
  var B_ = P.ReactCurrentOwner, Kt = !1;
  function zt(n, i, a, c) {
    i.child = n === null ? Ug(i, null, a, c) : Ki(i, n.child, a, c);
  }
  function km(n, i, a, c, h) {
    a = a.render;
    var y = i.ref;
    return Gi(i, h), c = hd(n, i, a, c, y, h), a = gd(), n !== null && !Kt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, sr(n, i, h)) : (Ke && a && Jc(i), i.flags |= 1, zt(n, i, c, h), i.child);
  }
  function Cm(n, i, a, c, h) {
    if (n === null) {
      var y = a.type;
      return typeof y == "function" && !Hd(y) && y.defaultProps === void 0 && a.compare === null && a.defaultProps === void 0 ? (i.tag = 15, i.type = y, Em(n, i, y, c, h)) : (n = hl(a.type, null, c, i, i.mode, h), n.ref = i.ref, n.return = i, i.child = n);
    }
    if (y = n.child, (n.lanes & h) === 0) {
      var R = y.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Wo, a(R, c) && n.ref === i.ref) return sr(n, i, h);
    }
    return i.flags |= 1, n = zr(y, c), n.ref = i.ref, n.return = i, i.child = n;
  }
  function Em(n, i, a, c, h) {
    if (n !== null) {
      var y = n.memoizedProps;
      if (Wo(y, c) && n.ref === i.ref) if (Kt = !1, i.pendingProps = c = y, (n.lanes & h) !== 0) (n.flags & 131072) !== 0 && (Kt = !0);
      else return i.lanes = n.lanes, sr(n, i, h);
    }
    return kd(n, i, a, c, h);
  }
  function Pm(n, i, a) {
    var c = i.pendingProps, h = c.children, y = n !== null ? n.memoizedState : null;
    if (c.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, We(Zi, nn), nn |= a;
    else {
      if ((a & 1073741824) === 0) return n = y !== null ? y.baseLanes | a : a, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, i.updateQueue = null, We(Zi, nn), nn |= n, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, c = y !== null ? y.baseLanes : a, We(Zi, nn), nn |= c;
    }
    else y !== null ? (c = y.baseLanes | a, i.memoizedState = null) : c = a, We(Zi, nn), nn |= c;
    return zt(n, i, h, a), i.child;
  }
  function Rm(n, i) {
    var a = i.ref;
    (n === null && a !== null || n !== null && n.ref !== a) && (i.flags |= 512, i.flags |= 2097152);
  }
  function kd(n, i, a, c, h) {
    var y = qt(a) ? ni : At.current;
    return y = Ui(i, y), Gi(i, h), a = hd(n, i, a, c, y, h), c = gd(), n !== null && !Kt ? (i.updateQueue = n.updateQueue, i.flags &= -2053, n.lanes &= ~h, sr(n, i, h)) : (Ke && c && Jc(i), i.flags |= 1, zt(n, i, a, h), i.child);
  }
  function Tm(n, i, a, c, h) {
    if (qt(a)) {
      var y = !0;
      ja(i);
    } else y = !1;
    if (Gi(i, h), i.stateNode === null) rl(n, i), ym(i, a, c), bd(i, a, c, h), c = !0;
    else if (n === null) {
      var R = i.stateNode, W = i.memoizedProps;
      R.props = W;
      var q = R.context, Z = a.contextType;
      typeof Z == "object" && Z !== null ? Z = fn(Z) : (Z = qt(a) ? ni : At.current, Z = Ui(i, Z));
      var oe = a.getDerivedStateFromProps, ae = typeof oe == "function" || typeof R.getSnapshotBeforeUpdate == "function";
      ae || typeof R.UNSAFE_componentWillReceiveProps != "function" && typeof R.componentWillReceiveProps != "function" || (W !== c || q !== Z) && vm(i, R, c, Z), Ir = !1;
      var re = i.memoizedState;
      R.state = re, Qa(i, c, R, h), q = i.memoizedState, W !== c || re !== q || Ht.current || Ir ? (typeof oe == "function" && (Sd(i, a, oe, c), q = i.memoizedState), (W = Ir || mm(i, a, W, c, re, q, Z)) ? (ae || typeof R.UNSAFE_componentWillMount != "function" && typeof R.componentWillMount != "function" || (typeof R.componentWillMount == "function" && R.componentWillMount(), typeof R.UNSAFE_componentWillMount == "function" && R.UNSAFE_componentWillMount()), typeof R.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof R.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = c, i.memoizedState = q), R.props = c, R.state = q, R.context = Z, c = W) : (typeof R.componentDidMount == "function" && (i.flags |= 4194308), c = !1);
    } else {
      R = i.stateNode, Hg(n, i), W = i.memoizedProps, Z = i.type === i.elementType ? W : En(i.type, W), R.props = Z, ae = i.pendingProps, re = R.context, q = a.contextType, typeof q == "object" && q !== null ? q = fn(q) : (q = qt(a) ? ni : At.current, q = Ui(i, q));
      var pe = a.getDerivedStateFromProps;
      (oe = typeof pe == "function" || typeof R.getSnapshotBeforeUpdate == "function") || typeof R.UNSAFE_componentWillReceiveProps != "function" && typeof R.componentWillReceiveProps != "function" || (W !== ae || re !== q) && vm(i, R, c, q), Ir = !1, re = i.memoizedState, R.state = re, Qa(i, c, R, h);
      var me = i.memoizedState;
      W !== ae || re !== me || Ht.current || Ir ? (typeof pe == "function" && (Sd(i, a, pe, c), me = i.memoizedState), (Z = Ir || mm(i, a, Z, c, re, me, q) || !1) ? (oe || typeof R.UNSAFE_componentWillUpdate != "function" && typeof R.componentWillUpdate != "function" || (typeof R.componentWillUpdate == "function" && R.componentWillUpdate(c, me, q), typeof R.UNSAFE_componentWillUpdate == "function" && R.UNSAFE_componentWillUpdate(c, me, q)), typeof R.componentDidUpdate == "function" && (i.flags |= 4), typeof R.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof R.componentDidUpdate != "function" || W === n.memoizedProps && re === n.memoizedState || (i.flags |= 4), typeof R.getSnapshotBeforeUpdate != "function" || W === n.memoizedProps && re === n.memoizedState || (i.flags |= 1024), i.memoizedProps = c, i.memoizedState = me), R.props = c, R.state = me, R.context = q, c = Z) : (typeof R.componentDidUpdate != "function" || W === n.memoizedProps && re === n.memoizedState || (i.flags |= 4), typeof R.getSnapshotBeforeUpdate != "function" || W === n.memoizedProps && re === n.memoizedState || (i.flags |= 1024), c = !1);
    }
    return Cd(n, i, a, c, y, h);
  }
  function Cd(n, i, a, c, h, y) {
    Rm(n, i);
    var R = (i.flags & 128) !== 0;
    if (!c && !R) return h && Ng(i, a, !1), sr(n, i, y);
    c = i.stateNode, B_.current = i;
    var W = R && typeof a.getDerivedStateFromError != "function" ? null : c.render();
    return i.flags |= 1, n !== null && R ? (i.child = Ki(i, n.child, null, y), i.child = Ki(i, null, W, y)) : zt(n, i, W, y), i.memoizedState = c.state, h && Ng(i, a, !0), i.child;
  }
  function $m(n) {
    var i = n.stateNode;
    i.pendingContext ? Ag(n, i.pendingContext, i.pendingContext !== i.context) : i.context && Ag(n, i.context, !1), ld(n, i.containerInfo);
  }
  function Mm(n, i, a, c, h) {
    return qi(), td(h), i.flags |= 256, zt(n, i, a, c), i.child;
  }
  var Ed = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Pd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Am(n, i, a) {
    var c = i.pendingProps, h = Ge.current, y = !1, R = (i.flags & 128) !== 0, W;
    if ((W = R) || (W = n !== null && n.memoizedState === null ? !1 : (h & 2) !== 0), W ? (y = !0, i.flags &= -129) : (n === null || n.memoizedState !== null) && (h |= 1), We(Ge, h & 1), n === null)
      return ed(i), n = i.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : n.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (R = c.children, n = c.fallback, y ? (c = i.mode, y = i.child, R = { mode: "hidden", children: R }, (c & 1) === 0 && y !== null ? (y.childLanes = 0, y.pendingProps = R) : y = gl(R, c, 0, null), n = fi(n, c, a, null), y.return = i, n.return = i, y.sibling = n, i.child = y, i.child.memoizedState = Pd(a), i.memoizedState = Ed, n) : Rd(i, R));
    if (h = n.memoizedState, h !== null && (W = h.dehydrated, W !== null)) return W_(n, i, R, c, W, h, a);
    if (y) {
      y = c.fallback, R = i.mode, h = n.child, W = h.sibling;
      var q = { mode: "hidden", children: c.children };
      return (R & 1) === 0 && i.child !== h ? (c = i.child, c.childLanes = 0, c.pendingProps = q, i.deletions = null) : (c = zr(h, q), c.subtreeFlags = h.subtreeFlags & 14680064), W !== null ? y = zr(W, y) : (y = fi(y, R, a, null), y.flags |= 2), y.return = i, c.return = i, c.sibling = y, i.child = c, c = y, y = i.child, R = n.child.memoizedState, R = R === null ? Pd(a) : { baseLanes: R.baseLanes | a, cachePool: null, transitions: R.transitions }, y.memoizedState = R, y.childLanes = n.childLanes & ~a, i.memoizedState = Ed, c;
    }
    return y = n.child, n = y.sibling, c = zr(y, { mode: "visible", children: c.children }), (i.mode & 1) === 0 && (c.lanes = a), c.return = i, c.sibling = null, n !== null && (a = i.deletions, a === null ? (i.deletions = [n], i.flags |= 16) : a.push(n)), i.child = c, i.memoizedState = null, c;
  }
  function Rd(n, i) {
    return i = gl({ mode: "visible", children: i }, n.mode, 0, null), i.return = n, n.child = i;
  }
  function nl(n, i, a, c) {
    return c !== null && td(c), Ki(i, n.child, null, a), n = Rd(i, i.pendingProps.children), n.flags |= 2, i.memoizedState = null, n;
  }
  function W_(n, i, a, c, h, y, R) {
    if (a)
      return i.flags & 256 ? (i.flags &= -257, c = _d(Error(r(422))), nl(n, i, R, c)) : i.memoizedState !== null ? (i.child = n.child, i.flags |= 128, null) : (y = c.fallback, h = i.mode, c = gl({ mode: "visible", children: c.children }, h, 0, null), y = fi(y, h, R, null), y.flags |= 2, c.return = i, y.return = i, c.sibling = y, i.child = c, (i.mode & 1) !== 0 && Ki(i, n.child, null, R), i.child.memoizedState = Pd(R), i.memoizedState = Ed, y);
    if ((i.mode & 1) === 0) return nl(n, i, R, null);
    if (h.data === "$!") {
      if (c = h.nextSibling && h.nextSibling.dataset, c) var W = c.dgst;
      return c = W, y = Error(r(419)), c = _d(y, c, void 0), nl(n, i, R, c);
    }
    if (W = (R & n.childLanes) !== 0, Kt || W) {
      if (c = mt, c !== null) {
        switch (R & -R) {
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
        h = (h & (c.suspendedLanes | R)) !== 0 ? 0 : h, h !== 0 && h !== y.retryLane && (y.retryLane = h, ir(n, h), Tn(c, n, h, -1));
      }
      return Vd(), c = _d(Error(r(421))), nl(n, i, R, c);
    }
    return h.data === "$?" ? (i.flags |= 128, i.child = n.child, i = tx.bind(null, n), h._reactRetry = i, null) : (n = y.treeContext, tn = Tr(h.nextSibling), en = i, Ke = !0, Cn = null, n !== null && (cn[dn++] = nr, cn[dn++] = rr, cn[dn++] = ri, nr = n.id, rr = n.overflow, ri = i), i = Rd(i, c.children), i.flags |= 4096, i);
  }
  function Im(n, i, a) {
    n.lanes |= i;
    var c = n.alternate;
    c !== null && (c.lanes |= i), od(n.return, i, a);
  }
  function Td(n, i, a, c, h) {
    var y = n.memoizedState;
    y === null ? n.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: c, tail: a, tailMode: h } : (y.isBackwards = i, y.rendering = null, y.renderingStartTime = 0, y.last = c, y.tail = a, y.tailMode = h);
  }
  function Nm(n, i, a) {
    var c = i.pendingProps, h = c.revealOrder, y = c.tail;
    if (zt(n, i, c.children, a), c = Ge.current, (c & 2) !== 0) c = c & 1 | 2, i.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = i.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Im(n, a, i);
        else if (n.tag === 19) Im(n, a, i);
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
        for (a = i.child, h = null; a !== null; ) n = a.alternate, n !== null && Ga(n) === null && (h = a), a = a.sibling;
        a = h, a === null ? (h = i.child, i.child = null) : (h = a.sibling, a.sibling = null), Td(i, !1, h, a, y);
        break;
      case "backwards":
        for (a = null, h = i.child, i.child = null; h !== null; ) {
          if (n = h.alternate, n !== null && Ga(n) === null) {
            i.child = h;
            break;
          }
          n = h.sibling, h.sibling = a, a = h, h = n;
        }
        Td(i, !0, a, null, y);
        break;
      case "together":
        Td(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function rl(n, i) {
    (i.mode & 1) === 0 && n !== null && (n.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function sr(n, i, a) {
    if (n !== null && (i.dependencies = n.dependencies), li |= i.lanes, (a & i.childLanes) === 0) return null;
    if (n !== null && i.child !== n.child) throw Error(r(153));
    if (i.child !== null) {
      for (n = i.child, a = zr(n, n.pendingProps), i.child = a, a.return = i; n.sibling !== null; ) n = n.sibling, a = a.sibling = zr(n, n.pendingProps), a.return = i;
      a.sibling = null;
    }
    return i.child;
  }
  function U_(n, i, a) {
    switch (i.tag) {
      case 3:
        $m(i), qi();
        break;
      case 5:
        Qg(i);
        break;
      case 1:
        qt(i.type) && ja(i);
        break;
      case 4:
        ld(i, i.stateNode.containerInfo);
        break;
      case 10:
        var c = i.type._context, h = i.memoizedProps.value;
        We(Ha, c._currentValue), c._currentValue = h;
        break;
      case 13:
        if (c = i.memoizedState, c !== null)
          return c.dehydrated !== null ? (We(Ge, Ge.current & 1), i.flags |= 128, null) : (a & i.child.childLanes) !== 0 ? Am(n, i, a) : (We(Ge, Ge.current & 1), n = sr(n, i, a), n !== null ? n.sibling : null);
        We(Ge, Ge.current & 1);
        break;
      case 19:
        if (c = (a & i.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (c) return Nm(n, i, a);
          i.flags |= 128;
        }
        if (h = i.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), We(Ge, Ge.current), c) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, Pm(n, i, a);
    }
    return sr(n, i, a);
  }
  var Om, $d, Lm, Dm;
  Om = function(n, i) {
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
  }, $d = function() {
  }, Lm = function(n, i, a, c) {
    var h = n.memoizedProps;
    if (h !== c) {
      n = i.stateNode, si(Fn.current);
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
          typeof h.onClick != "function" && typeof c.onClick == "function" && (n.onclick = La);
      }
      cc(a, c);
      var R;
      a = null;
      for (Z in h) if (!c.hasOwnProperty(Z) && h.hasOwnProperty(Z) && h[Z] != null) if (Z === "style") {
        var W = h[Z];
        for (R in W) W.hasOwnProperty(R) && (a || (a = {}), a[R] = "");
      } else Z !== "dangerouslySetInnerHTML" && Z !== "children" && Z !== "suppressContentEditableWarning" && Z !== "suppressHydrationWarning" && Z !== "autoFocus" && (s.hasOwnProperty(Z) ? y || (y = []) : (y = y || []).push(Z, null));
      for (Z in c) {
        var q = c[Z];
        if (W = h?.[Z], c.hasOwnProperty(Z) && q !== W && (q != null || W != null)) if (Z === "style") if (W) {
          for (R in W) !W.hasOwnProperty(R) || q && q.hasOwnProperty(R) || (a || (a = {}), a[R] = "");
          for (R in q) q.hasOwnProperty(R) && W[R] !== q[R] && (a || (a = {}), a[R] = q[R]);
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
  }, Dm = function(n, i, a, c) {
    a !== c && (i.flags |= 4);
  };
  function rs(n, i) {
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
  function Nt(n) {
    var i = n.alternate !== null && n.alternate.child === n.child, a = 0, c = 0;
    if (i) for (var h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags & 14680064, c |= h.flags & 14680064, h.return = n, h = h.sibling;
    else for (h = n.child; h !== null; ) a |= h.lanes | h.childLanes, c |= h.subtreeFlags, c |= h.flags, h.return = n, h = h.sibling;
    return n.subtreeFlags |= c, n.childLanes = a, i;
  }
  function V_(n, i, a) {
    var c = i.pendingProps;
    switch (Xc(i), i.tag) {
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
        return Nt(i), null;
      case 1:
        return qt(i.type) && Fa(), Nt(i), null;
      case 3:
        return c = i.stateNode, Yi(), He(Ht), He(At), dd(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (Ua(i) ? i.flags |= 4 : n === null || n.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, Cn !== null && (Bd(Cn), Cn = null))), $d(n, i), Nt(i), null;
      case 5:
        ud(i);
        var h = si(Xo.current);
        if (a = i.type, n !== null && i.stateNode != null) Lm(n, i, a, c, h), n.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(r(166));
            return Nt(i), null;
          }
          if (n = si(Fn.current), Ua(i)) {
            c = i.stateNode, a = i.type;
            var y = i.memoizedProps;
            switch (c[Dn] = i, c[Ko] = y, n = (i.mode & 1) !== 0, a) {
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
                for (h = 0; h < Vo.length; h++) Ve(Vo[h], c);
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
                st(c, y), Ve("invalid", c);
                break;
              case "select":
                c._wrapperState = { wasMultiple: !!y.multiple }, Ve("invalid", c);
                break;
              case "textarea":
                ko(c, y), Ve("invalid", c);
            }
            cc(a, y), h = null;
            for (var R in y) if (y.hasOwnProperty(R)) {
              var W = y[R];
              R === "children" ? typeof W == "string" ? c.textContent !== W && (y.suppressHydrationWarning !== !0 && Oa(c.textContent, W, n), h = ["children", W]) : typeof W == "number" && c.textContent !== "" + W && (y.suppressHydrationWarning !== !0 && Oa(
                c.textContent,
                W,
                n
              ), h = ["children", "" + W]) : s.hasOwnProperty(R) && W != null && R === "onScroll" && Ve("scroll", c);
            }
            switch (a) {
              case "input":
                we(c), De(c, y, !0);
                break;
              case "textarea":
                we(c), St(c);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof y.onClick == "function" && (c.onclick = La);
            }
            c = h, i.updateQueue = c, c !== null && (i.flags |= 4);
          } else {
            R = h.nodeType === 9 ? h : h.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = $t(a)), n === "http://www.w3.org/1999/xhtml" ? a === "script" ? (n = R.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof c.is == "string" ? n = R.createElement(a, { is: c.is }) : (n = R.createElement(a), a === "select" && (R = n, c.multiple ? R.multiple = !0 : c.size && (R.size = c.size))) : n = R.createElementNS(n, a), n[Dn] = i, n[Ko] = c, Om(n, i, !1, !1), i.stateNode = n;
            e: {
              switch (R = dc(a, c), a) {
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
                  for (h = 0; h < Vo.length; h++) Ve(Vo[h], n);
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
                  st(n, c), h = je(n, c), Ve("invalid", n);
                  break;
                case "option":
                  h = c;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!c.multiple }, h = K({}, c, { value: void 0 }), Ve("invalid", n);
                  break;
                case "textarea":
                  ko(n, c), h = xe(n, c), Ve("invalid", n);
                  break;
                default:
                  h = c;
              }
              cc(a, h), W = h;
              for (y in W) if (W.hasOwnProperty(y)) {
                var q = W[y];
                y === "style" ? Eh(n, q) : y === "dangerouslySetInnerHTML" ? (q = q ? q.__html : void 0, q != null && ha(n, q)) : y === "children" ? typeof q == "string" ? (a !== "textarea" || q !== "") && Co(n, q) : typeof q == "number" && Co(n, "" + q) : y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && y !== "autoFocus" && (s.hasOwnProperty(y) ? q != null && y === "onScroll" && Ve("scroll", n) : q != null && x(n, y, q, R));
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
                  n.multiple = !!c.multiple, y = c.value, y != null ? Ue(n, !!c.multiple, y, !1) : c.defaultValue != null && Ue(
                    n,
                    !!c.multiple,
                    c.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof h.onClick == "function" && (n.onclick = La);
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
        return Nt(i), null;
      case 6:
        if (n && i.stateNode != null) Dm(n, i, n.memoizedProps, c);
        else {
          if (typeof c != "string" && i.stateNode === null) throw Error(r(166));
          if (a = si(Xo.current), si(Fn.current), Ua(i)) {
            if (c = i.stateNode, a = i.memoizedProps, c[Dn] = i, (y = c.nodeValue !== a) && (n = en, n !== null)) switch (n.tag) {
              case 3:
                Oa(c.nodeValue, a, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Oa(c.nodeValue, a, (n.mode & 1) !== 0);
            }
            y && (i.flags |= 4);
          } else c = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(c), c[Dn] = i, i.stateNode = c;
        }
        return Nt(i), null;
      case 13:
        if (He(Ge), c = i.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Ke && tn !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) zg(), qi(), i.flags |= 98560, y = !1;
          else if (y = Ua(i), c !== null && c.dehydrated !== null) {
            if (n === null) {
              if (!y) throw Error(r(318));
              if (y = i.memoizedState, y = y !== null ? y.dehydrated : null, !y) throw Error(r(317));
              y[Dn] = i;
            } else qi(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Nt(i), y = !1;
          } else Cn !== null && (Bd(Cn), Cn = null), y = !0;
          if (!y) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = a, i) : (c = c !== null, c !== (n !== null && n.memoizedState !== null) && c && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (n === null || (Ge.current & 1) !== 0 ? ft === 0 && (ft = 3) : Vd())), i.updateQueue !== null && (i.flags |= 4), Nt(i), null);
      case 4:
        return Yi(), $d(n, i), n === null && Ho(i.stateNode.containerInfo), Nt(i), null;
      case 10:
        return id(i.type._context), Nt(i), null;
      case 17:
        return qt(i.type) && Fa(), Nt(i), null;
      case 19:
        if (He(Ge), y = i.memoizedState, y === null) return Nt(i), null;
        if (c = (i.flags & 128) !== 0, R = y.rendering, R === null) if (c) rs(y, !1);
        else {
          if (ft !== 0 || n !== null && (n.flags & 128) !== 0) for (n = i.child; n !== null; ) {
            if (R = Ga(n), R !== null) {
              for (i.flags |= 128, rs(y, !1), c = R.updateQueue, c !== null && (i.updateQueue = c, i.flags |= 4), i.subtreeFlags = 0, c = a, a = i.child; a !== null; ) y = a, n = c, y.flags &= 14680066, R = y.alternate, R === null ? (y.childLanes = 0, y.lanes = n, y.child = null, y.subtreeFlags = 0, y.memoizedProps = null, y.memoizedState = null, y.updateQueue = null, y.dependencies = null, y.stateNode = null) : (y.childLanes = R.childLanes, y.lanes = R.lanes, y.child = R.child, y.subtreeFlags = 0, y.deletions = null, y.memoizedProps = R.memoizedProps, y.memoizedState = R.memoizedState, y.updateQueue = R.updateQueue, y.type = R.type, n = R.dependencies, y.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), a = a.sibling;
              return We(Ge, Ge.current & 1 | 2), i.child;
            }
            n = n.sibling;
          }
          y.tail !== null && rt() > eo && (i.flags |= 128, c = !0, rs(y, !1), i.lanes = 4194304);
        }
        else {
          if (!c) if (n = Ga(R), n !== null) {
            if (i.flags |= 128, c = !0, a = n.updateQueue, a !== null && (i.updateQueue = a, i.flags |= 4), rs(y, !0), y.tail === null && y.tailMode === "hidden" && !R.alternate && !Ke) return Nt(i), null;
          } else 2 * rt() - y.renderingStartTime > eo && a !== 1073741824 && (i.flags |= 128, c = !0, rs(y, !1), i.lanes = 4194304);
          y.isBackwards ? (R.sibling = i.child, i.child = R) : (a = y.last, a !== null ? a.sibling = R : i.child = R, y.last = R);
        }
        return y.tail !== null ? (i = y.tail, y.rendering = i, y.tail = i.sibling, y.renderingStartTime = rt(), i.sibling = null, a = Ge.current, We(Ge, c ? a & 1 | 2 : a & 1), i) : (Nt(i), null);
      case 22:
      case 23:
        return Ud(), c = i.memoizedState !== null, n !== null && n.memoizedState !== null !== c && (i.flags |= 8192), c && (i.mode & 1) !== 0 ? (nn & 1073741824) !== 0 && (Nt(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Nt(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function H_(n, i) {
    switch (Xc(i), i.tag) {
      case 1:
        return qt(i.type) && Fa(), n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 3:
        return Yi(), He(Ht), He(At), dd(), n = i.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (i.flags = n & -65537 | 128, i) : null;
      case 5:
        return ud(i), null;
      case 13:
        if (He(Ge), n = i.memoizedState, n !== null && n.dehydrated !== null) {
          if (i.alternate === null) throw Error(r(340));
          qi();
        }
        return n = i.flags, n & 65536 ? (i.flags = n & -65537 | 128, i) : null;
      case 19:
        return He(Ge), null;
      case 4:
        return Yi(), null;
      case 10:
        return id(i.type._context), null;
      case 22:
      case 23:
        return Ud(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var il = !1, Ot = !1, q_ = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function Xi(n, i) {
    var a = n.ref;
    if (a !== null) if (typeof a == "function") try {
      a(null);
    } catch (c) {
      et(n, i, c);
    }
    else a.current = null;
  }
  function Md(n, i, a) {
    try {
      a();
    } catch (c) {
      et(n, i, c);
    }
  }
  var Fm = !1;
  function K_(n, i) {
    if (Uc = ka, n = mg(), Oc(n)) {
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
          var R = 0, W = -1, q = -1, Z = 0, oe = 0, ae = n, re = null;
          t: for (; ; ) {
            for (var pe; ae !== a || h !== 0 && ae.nodeType !== 3 || (W = R + h), ae !== y || c !== 0 && ae.nodeType !== 3 || (q = R + c), ae.nodeType === 3 && (R += ae.nodeValue.length), (pe = ae.firstChild) !== null; )
              re = ae, ae = pe;
            for (; ; ) {
              if (ae === n) break t;
              if (re === a && ++Z === h && (W = R), re === y && ++oe === c && (q = R), (pe = ae.nextSibling) !== null) break;
              ae = re, re = ae.parentNode;
            }
            ae = pe;
          }
          a = W === -1 || q === -1 ? null : { start: W, end: q };
        } else a = null;
      }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Vc = { focusedElem: n, selectionRange: a }, ka = !1, ge = i; ge !== null; ) if (i = ge, n = i.child, (i.subtreeFlags & 1028) !== 0 && n !== null) n.return = i, ge = n;
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
              var ye = me.memoizedProps, it = me.memoizedState, J = i.stateNode, Q = J.getSnapshotBeforeUpdate(i.elementType === i.type ? ye : En(i.type, ye), it);
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
    return me = Fm, Fm = !1, me;
  }
  function is(n, i, a) {
    var c = i.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var h = c = c.next;
      do {
        if ((h.tag & n) === n) {
          var y = h.destroy;
          h.destroy = void 0, y !== void 0 && Md(i, a, y);
        }
        h = h.next;
      } while (h !== c);
    }
  }
  function ol(n, i) {
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
  function Ad(n) {
    var i = n.ref;
    if (i !== null) {
      var a = n.stateNode;
      n.tag, n = a, typeof i == "function" ? i(n) : i.current = n;
    }
  }
  function jm(n) {
    var i = n.alternate;
    i !== null && (n.alternate = null, jm(i)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (i = n.stateNode, i !== null && (delete i[Dn], delete i[Ko], delete i[Qc], delete i[T_], delete i[$_])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function zm(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Bm(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || zm(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Id(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.nodeType === 8 ? a.parentNode.insertBefore(n, i) : a.insertBefore(n, i) : (a.nodeType === 8 ? (i = a.parentNode, i.insertBefore(n, a)) : (i = a, i.appendChild(n)), a = a._reactRootContainer, a != null || i.onclick !== null || (i.onclick = La));
    else if (c !== 4 && (n = n.child, n !== null)) for (Id(n, i, a), n = n.sibling; n !== null; ) Id(n, i, a), n = n.sibling;
  }
  function Nd(n, i, a) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, i ? a.insertBefore(n, i) : a.appendChild(n);
    else if (c !== 4 && (n = n.child, n !== null)) for (Nd(n, i, a), n = n.sibling; n !== null; ) Nd(n, i, a), n = n.sibling;
  }
  var bt = null, Pn = !1;
  function Or(n, i, a) {
    for (a = a.child; a !== null; ) Wm(n, i, a), a = a.sibling;
  }
  function Wm(n, i, a) {
    if (Ln && typeof Ln.onCommitFiberUnmount == "function") try {
      Ln.onCommitFiberUnmount(va, a);
    } catch {
    }
    switch (a.tag) {
      case 5:
        Ot || Xi(a, i);
      case 6:
        var c = bt, h = Pn;
        bt = null, Or(n, i, a), bt = c, Pn = h, bt !== null && (Pn ? (n = bt, a = a.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(a) : n.removeChild(a)) : bt.removeChild(a.stateNode));
        break;
      case 18:
        bt !== null && (Pn ? (n = bt, a = a.stateNode, n.nodeType === 8 ? Kc(n.parentNode, a) : n.nodeType === 1 && Kc(n, a), Lo(n)) : Kc(bt, a.stateNode));
        break;
      case 4:
        c = bt, h = Pn, bt = a.stateNode.containerInfo, Pn = !0, Or(n, i, a), bt = c, Pn = h;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ot && (c = a.updateQueue, c !== null && (c = c.lastEffect, c !== null))) {
          h = c = c.next;
          do {
            var y = h, R = y.destroy;
            y = y.tag, R !== void 0 && ((y & 2) !== 0 || (y & 4) !== 0) && Md(a, i, R), h = h.next;
          } while (h !== c);
        }
        Or(n, i, a);
        break;
      case 1:
        if (!Ot && (Xi(a, i), c = a.stateNode, typeof c.componentWillUnmount == "function")) try {
          c.props = a.memoizedProps, c.state = a.memoizedState, c.componentWillUnmount();
        } catch (W) {
          et(a, i, W);
        }
        Or(n, i, a);
        break;
      case 21:
        Or(n, i, a);
        break;
      case 22:
        a.mode & 1 ? (Ot = (c = Ot) || a.memoizedState !== null, Or(n, i, a), Ot = c) : Or(n, i, a);
        break;
      default:
        Or(n, i, a);
    }
  }
  function Um(n) {
    var i = n.updateQueue;
    if (i !== null) {
      n.updateQueue = null;
      var a = n.stateNode;
      a === null && (a = n.stateNode = new q_()), i.forEach(function(c) {
        var h = nx.bind(null, n, c);
        a.has(c) || (a.add(c), c.then(h, h));
      });
    }
  }
  function Rn(n, i) {
    var a = i.deletions;
    if (a !== null) for (var c = 0; c < a.length; c++) {
      var h = a[c];
      try {
        var y = n, R = i, W = R;
        e: for (; W !== null; ) {
          switch (W.tag) {
            case 5:
              bt = W.stateNode, Pn = !1;
              break e;
            case 3:
              bt = W.stateNode.containerInfo, Pn = !0;
              break e;
            case 4:
              bt = W.stateNode.containerInfo, Pn = !0;
              break e;
          }
          W = W.return;
        }
        if (bt === null) throw Error(r(160));
        Wm(y, R, h), bt = null, Pn = !1;
        var q = h.alternate;
        q !== null && (q.return = null), h.return = null;
      } catch (Z) {
        et(h, i, Z);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) Vm(i, n), i = i.sibling;
  }
  function Vm(n, i) {
    var a = n.alternate, c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Rn(i, n), zn(n), c & 4) {
          try {
            is(3, n, n.return), ol(3, n);
          } catch (ye) {
            et(n, n.return, ye);
          }
          try {
            is(5, n, n.return);
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 1:
        Rn(i, n), zn(n), c & 512 && a !== null && Xi(a, a.return);
        break;
      case 5:
        if (Rn(i, n), zn(n), c & 512 && a !== null && Xi(a, a.return), n.flags & 32) {
          var h = n.stateNode;
          try {
            Co(h, "");
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        if (c & 4 && (h = n.stateNode, h != null)) {
          var y = n.memoizedProps, R = a !== null ? a.memoizedProps : y, W = n.type, q = n.updateQueue;
          if (n.updateQueue = null, q !== null) try {
            W === "input" && y.type === "radio" && y.name != null && ut(h, y), dc(W, R);
            var Z = dc(W, y);
            for (R = 0; R < q.length; R += 2) {
              var oe = q[R], ae = q[R + 1];
              oe === "style" ? Eh(h, ae) : oe === "dangerouslySetInnerHTML" ? ha(h, ae) : oe === "children" ? Co(h, ae) : x(h, oe, ae, Z);
            }
            switch (W) {
              case "input":
                Ze(h, y);
                break;
              case "textarea":
                Tt(h, y);
                break;
              case "select":
                var re = h._wrapperState.wasMultiple;
                h._wrapperState.wasMultiple = !!y.multiple;
                var pe = y.value;
                pe != null ? Ue(h, !!y.multiple, pe, !1) : re !== !!y.multiple && (y.defaultValue != null ? Ue(
                  h,
                  !!y.multiple,
                  y.defaultValue,
                  !0
                ) : Ue(h, !!y.multiple, y.multiple ? [] : "", !1));
            }
            h[Ko] = y;
          } catch (ye) {
            et(n, n.return, ye);
          }
        }
        break;
      case 6:
        if (Rn(i, n), zn(n), c & 4) {
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
        if (Rn(i, n), zn(n), c & 4 && a !== null && a.memoizedState.isDehydrated) try {
          Lo(i.containerInfo);
        } catch (ye) {
          et(n, n.return, ye);
        }
        break;
      case 4:
        Rn(i, n), zn(n);
        break;
      case 13:
        Rn(i, n), zn(n), h = n.child, h.flags & 8192 && (y = h.memoizedState !== null, h.stateNode.isHidden = y, !y || h.alternate !== null && h.alternate.memoizedState !== null || (Dd = rt())), c & 4 && Um(n);
        break;
      case 22:
        if (oe = a !== null && a.memoizedState !== null, n.mode & 1 ? (Ot = (Z = Ot) || oe, Rn(i, n), Ot = Z) : Rn(i, n), zn(n), c & 8192) {
          if (Z = n.memoizedState !== null, (n.stateNode.isHidden = Z) && !oe && (n.mode & 1) !== 0) for (ge = n, oe = n.child; oe !== null; ) {
            for (ae = ge = oe; ge !== null; ) {
              switch (re = ge, pe = re.child, re.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  is(4, re, re.return);
                  break;
                case 1:
                  Xi(re, re.return);
                  var me = re.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    c = re, a = re.return;
                    try {
                      i = c, me.props = i.memoizedProps, me.state = i.memoizedState, me.componentWillUnmount();
                    } catch (ye) {
                      et(c, a, ye);
                    }
                  }
                  break;
                case 5:
                  Xi(re, re.return);
                  break;
                case 22:
                  if (re.memoizedState !== null) {
                    Km(ae);
                    continue;
                  }
              }
              pe !== null ? (pe.return = re, ge = pe) : Km(ae);
            }
            oe = oe.sibling;
          }
          e: for (oe = null, ae = n; ; ) {
            if (ae.tag === 5) {
              if (oe === null) {
                oe = ae;
                try {
                  h = ae.stateNode, Z ? (y = h.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none") : (W = ae.stateNode, q = ae.memoizedProps.style, R = q != null && q.hasOwnProperty("display") ? q.display : null, W.style.display = Ch("display", R));
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
        Rn(i, n), zn(n), c & 4 && Um(n);
        break;
      case 21:
        break;
      default:
        Rn(
          i,
          n
        ), zn(n);
    }
  }
  function zn(n) {
    var i = n.flags;
    if (i & 2) {
      try {
        e: {
          for (var a = n.return; a !== null; ) {
            if (zm(a)) {
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
            c.flags & 32 && (Co(h, ""), c.flags &= -33);
            var y = Bm(n);
            Nd(n, y, h);
            break;
          case 3:
          case 4:
            var R = c.stateNode.containerInfo, W = Bm(n);
            Id(n, W, R);
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
  function Q_(n, i, a) {
    ge = n, Hm(n);
  }
  function Hm(n, i, a) {
    for (var c = (n.mode & 1) !== 0; ge !== null; ) {
      var h = ge, y = h.child;
      if (h.tag === 22 && c) {
        var R = h.memoizedState !== null || il;
        if (!R) {
          var W = h.alternate, q = W !== null && W.memoizedState !== null || Ot;
          W = il;
          var Z = Ot;
          if (il = R, (Ot = q) && !Z) for (ge = h; ge !== null; ) R = ge, q = R.child, R.tag === 22 && R.memoizedState !== null ? Qm(h) : q !== null ? (q.return = R, ge = q) : Qm(h);
          for (; y !== null; ) ge = y, Hm(y), y = y.sibling;
          ge = h, il = W, Ot = Z;
        }
        qm(n);
      } else (h.subtreeFlags & 8772) !== 0 && y !== null ? (y.return = h, ge = y) : qm(n);
    }
  }
  function qm(n) {
    for (; ge !== null; ) {
      var i = ge;
      if ((i.flags & 8772) !== 0) {
        var a = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              Ot || ol(5, i);
              break;
            case 1:
              var c = i.stateNode;
              if (i.flags & 4 && !Ot) if (a === null) c.componentDidMount();
              else {
                var h = i.elementType === i.type ? a.memoizedProps : En(i.type, a.memoizedProps);
                c.componentDidUpdate(h, a.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
              }
              var y = i.updateQueue;
              y !== null && Kg(i, y, c);
              break;
            case 3:
              var R = i.updateQueue;
              if (R !== null) {
                if (a = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    a = i.child.stateNode;
                    break;
                  case 1:
                    a = i.child.stateNode;
                }
                Kg(i, R, a);
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
                    ae !== null && Lo(ae);
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
          Ot || i.flags & 512 && Ad(i);
        } catch (re) {
          et(i, i.return, re);
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
  function Km(n) {
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
  function Qm(n) {
    for (; ge !== null; ) {
      var i = ge;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var a = i.return;
            try {
              ol(4, i);
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
              Ad(i);
            } catch (q) {
              et(i, y, q);
            }
            break;
          case 5:
            var R = i.return;
            try {
              Ad(i);
            } catch (q) {
              et(i, R, q);
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
  var G_ = Math.ceil, sl = P.ReactCurrentDispatcher, Od = P.ReactCurrentOwner, hn = P.ReactCurrentBatchConfig, Te = 0, mt = null, at = null, _t = 0, nn = 0, Zi = $r(0), ft = 0, os = null, li = 0, al = 0, Ld = 0, ss = null, Qt = null, Dd = 0, eo = 1 / 0, ar = null, ll = !1, Fd = null, Lr = null, ul = !1, Dr = null, cl = 0, as = 0, jd = null, dl = -1, fl = 0;
  function Bt() {
    return (Te & 6) !== 0 ? rt() : dl !== -1 ? dl : dl = rt();
  }
  function Fr(n) {
    return (n.mode & 1) === 0 ? 1 : (Te & 2) !== 0 && _t !== 0 ? _t & -_t : A_.transition !== null ? (fl === 0 && (fl = Bh()), fl) : (n = Le, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Yh(n.type)), n);
  }
  function Tn(n, i, a, c) {
    if (50 < as) throw as = 0, jd = null, Error(r(185));
    Mo(n, a, c), ((Te & 2) === 0 || n !== mt) && (n === mt && ((Te & 2) === 0 && (al |= a), ft === 4 && jr(n, _t)), Gt(n, c), a === 1 && Te === 0 && (i.mode & 1) === 0 && (eo = rt() + 500, za && Ar()));
  }
  function Gt(n, i) {
    var a = n.callbackNode;
    Ab(n, i);
    var c = ba(n, n === mt ? _t : 0);
    if (c === 0) a !== null && Fh(a), n.callbackNode = null, n.callbackPriority = 0;
    else if (i = c & -c, n.callbackPriority !== i) {
      if (a != null && Fh(a), i === 1) n.tag === 0 ? M_(Ym.bind(null, n)) : Og(Ym.bind(null, n)), P_(function() {
        (Te & 6) === 0 && Ar();
      }), a = null;
      else {
        switch (Wh(c)) {
          case 1:
            a = vc;
            break;
          case 4:
            a = jh;
            break;
          case 16:
            a = ya;
            break;
          case 536870912:
            a = zh;
            break;
          default:
            a = ya;
        }
        a = iy(a, Gm.bind(null, n));
      }
      n.callbackPriority = i, n.callbackNode = a;
    }
  }
  function Gm(n, i) {
    if (dl = -1, fl = 0, (Te & 6) !== 0) throw Error(r(327));
    var a = n.callbackNode;
    if (to() && n.callbackNode !== a) return null;
    var c = ba(n, n === mt ? _t : 0);
    if (c === 0) return null;
    if ((c & 30) !== 0 || (c & n.expiredLanes) !== 0 || i) i = pl(n, c);
    else {
      i = c;
      var h = Te;
      Te |= 2;
      var y = Xm();
      (mt !== n || _t !== i) && (ar = null, eo = rt() + 500, ci(n, i));
      do
        try {
          X_();
          break;
        } catch (W) {
          Jm(n, W);
        }
      while (!0);
      rd(), sl.current = y, Te = h, at !== null ? i = 0 : (mt = null, _t = 0, i = ft);
    }
    if (i !== 0) {
      if (i === 2 && (h = wc(n), h !== 0 && (c = h, i = zd(n, h))), i === 1) throw a = os, ci(n, 0), jr(n, c), Gt(n, rt()), a;
      if (i === 6) jr(n, c);
      else {
        if (h = n.current.alternate, (c & 30) === 0 && !Y_(h) && (i = pl(n, c), i === 2 && (y = wc(n), y !== 0 && (c = y, i = zd(n, y))), i === 1)) throw a = os, ci(n, 0), jr(n, c), Gt(n, rt()), a;
        switch (n.finishedWork = h, n.finishedLanes = c, i) {
          case 0:
          case 1:
            throw Error(r(345));
          case 2:
            di(n, Qt, ar);
            break;
          case 3:
            if (jr(n, c), (c & 130023424) === c && (i = Dd + 500 - rt(), 10 < i)) {
              if (ba(n, 0) !== 0) break;
              if (h = n.suspendedLanes, (h & c) !== c) {
                Bt(), n.pingedLanes |= n.suspendedLanes & h;
                break;
              }
              n.timeoutHandle = qc(di.bind(null, n, Qt, ar), i);
              break;
            }
            di(n, Qt, ar);
            break;
          case 4:
            if (jr(n, c), (c & 4194240) === c) break;
            for (i = n.eventTimes, h = -1; 0 < c; ) {
              var R = 31 - xn(c);
              y = 1 << R, R = i[R], R > h && (h = R), c &= ~y;
            }
            if (c = h, c = rt() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * G_(c / 1960)) - c, 10 < c) {
              n.timeoutHandle = qc(di.bind(null, n, Qt, ar), c);
              break;
            }
            di(n, Qt, ar);
            break;
          case 5:
            di(n, Qt, ar);
            break;
          default:
            throw Error(r(329));
        }
      }
    }
    return Gt(n, rt()), n.callbackNode === a ? Gm.bind(null, n) : null;
  }
  function zd(n, i) {
    var a = ss;
    return n.current.memoizedState.isDehydrated && (ci(n, i).flags |= 256), n = pl(n, i), n !== 2 && (i = Qt, Qt = a, i !== null && Bd(i)), n;
  }
  function Bd(n) {
    Qt === null ? Qt = n : Qt.push.apply(Qt, n);
  }
  function Y_(n) {
    for (var i = n; ; ) {
      if (i.flags & 16384) {
        var a = i.updateQueue;
        if (a !== null && (a = a.stores, a !== null)) for (var c = 0; c < a.length; c++) {
          var h = a[c], y = h.getSnapshot;
          h = h.value;
          try {
            if (!kn(y(), h)) return !1;
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
  function jr(n, i) {
    for (i &= ~Ld, i &= ~al, n.suspendedLanes |= i, n.pingedLanes &= ~i, n = n.expirationTimes; 0 < i; ) {
      var a = 31 - xn(i), c = 1 << a;
      n[a] = -1, i &= ~c;
    }
  }
  function Ym(n) {
    if ((Te & 6) !== 0) throw Error(r(327));
    to();
    var i = ba(n, 0);
    if ((i & 1) === 0) return Gt(n, rt()), null;
    var a = pl(n, i);
    if (n.tag !== 0 && a === 2) {
      var c = wc(n);
      c !== 0 && (i = c, a = zd(n, c));
    }
    if (a === 1) throw a = os, ci(n, 0), jr(n, i), Gt(n, rt()), a;
    if (a === 6) throw Error(r(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = i, di(n, Qt, ar), Gt(n, rt()), null;
  }
  function Wd(n, i) {
    var a = Te;
    Te |= 1;
    try {
      return n(i);
    } finally {
      Te = a, Te === 0 && (eo = rt() + 500, za && Ar());
    }
  }
  function ui(n) {
    Dr !== null && Dr.tag === 0 && (Te & 6) === 0 && to();
    var i = Te;
    Te |= 1;
    var a = hn.transition, c = Le;
    try {
      if (hn.transition = null, Le = 1, n) return n();
    } finally {
      Le = c, hn.transition = a, Te = i, (Te & 6) === 0 && Ar();
    }
  }
  function Ud() {
    nn = Zi.current, He(Zi);
  }
  function ci(n, i) {
    n.finishedWork = null, n.finishedLanes = 0;
    var a = n.timeoutHandle;
    if (a !== -1 && (n.timeoutHandle = -1, E_(a)), at !== null) for (a = at.return; a !== null; ) {
      var c = a;
      switch (Xc(c), c.tag) {
        case 1:
          c = c.type.childContextTypes, c != null && Fa();
          break;
        case 3:
          Yi(), He(Ht), He(At), dd();
          break;
        case 5:
          ud(c);
          break;
        case 4:
          Yi();
          break;
        case 13:
          He(Ge);
          break;
        case 19:
          He(Ge);
          break;
        case 10:
          id(c.type._context);
          break;
        case 22:
        case 23:
          Ud();
      }
      a = a.return;
    }
    if (mt = n, at = n = zr(n.current, null), _t = nn = i, ft = 0, os = null, Ld = al = li = 0, Qt = ss = null, oi !== null) {
      for (i = 0; i < oi.length; i++) if (a = oi[i], c = a.interleaved, c !== null) {
        a.interleaved = null;
        var h = c.next, y = a.pending;
        if (y !== null) {
          var R = y.next;
          y.next = h, c.next = R;
        }
        a.pending = c;
      }
      oi = null;
    }
    return n;
  }
  function Jm(n, i) {
    do {
      var a = at;
      try {
        if (rd(), Ya.current = el, Ja) {
          for (var c = Ye.memoizedState; c !== null; ) {
            var h = c.queue;
            h !== null && (h.pending = null), c = c.next;
          }
          Ja = !1;
        }
        if (ai = 0, gt = dt = Ye = null, Zo = !1, es = 0, Od.current = null, a === null || a.return === null) {
          ft = 1, os = i, at = null;
          break;
        }
        e: {
          var y = n, R = a.return, W = a, q = i;
          if (i = _t, W.flags |= 32768, q !== null && typeof q == "object" && typeof q.then == "function") {
            var Z = q, oe = W, ae = oe.tag;
            if ((oe.mode & 1) === 0 && (ae === 0 || ae === 11 || ae === 15)) {
              var re = oe.alternate;
              re ? (oe.updateQueue = re.updateQueue, oe.memoizedState = re.memoizedState, oe.lanes = re.lanes) : (oe.updateQueue = null, oe.memoizedState = null);
            }
            var pe = _m(R);
            if (pe !== null) {
              pe.flags &= -257, xm(pe, R, W, y, i), pe.mode & 1 && bm(y, Z, i), i = pe, q = Z;
              var me = i.updateQueue;
              if (me === null) {
                var ye = /* @__PURE__ */ new Set();
                ye.add(q), i.updateQueue = ye;
              } else me.add(q);
              break e;
            } else {
              if ((i & 1) === 0) {
                bm(y, Z, i), Vd();
                break e;
              }
              q = Error(r(426));
            }
          } else if (Ke && W.mode & 1) {
            var it = _m(R);
            if (it !== null) {
              (it.flags & 65536) === 0 && (it.flags |= 256), xm(it, R, W, y, i), td(Ji(q, W));
              break e;
            }
          }
          y = q = Ji(q, W), ft !== 4 && (ft = 2), ss === null ? ss = [y] : ss.push(y), y = R;
          do {
            switch (y.tag) {
              case 3:
                y.flags |= 65536, i &= -i, y.lanes |= i;
                var J = wm(y, q, i);
                qg(y, J);
                break e;
              case 1:
                W = q;
                var Q = y.type, X = y.stateNode;
                if ((y.flags & 128) === 0 && (typeof Q.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (Lr === null || !Lr.has(X)))) {
                  y.flags |= 65536, i &= -i, y.lanes |= i;
                  var ce = Sm(y, W, i);
                  qg(y, ce);
                  break e;
                }
            }
            y = y.return;
          } while (y !== null);
        }
        ey(a);
      } catch (ve) {
        i = ve, at === a && a !== null && (at = a = a.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Xm() {
    var n = sl.current;
    return sl.current = el, n === null ? el : n;
  }
  function Vd() {
    (ft === 0 || ft === 3 || ft === 2) && (ft = 4), mt === null || (li & 268435455) === 0 && (al & 268435455) === 0 || jr(mt, _t);
  }
  function pl(n, i) {
    var a = Te;
    Te |= 2;
    var c = Xm();
    (mt !== n || _t !== i) && (ar = null, ci(n, i));
    do
      try {
        J_();
        break;
      } catch (h) {
        Jm(n, h);
      }
    while (!0);
    if (rd(), Te = a, sl.current = c, at !== null) throw Error(r(261));
    return mt = null, _t = 0, ft;
  }
  function J_() {
    for (; at !== null; ) Zm(at);
  }
  function X_() {
    for (; at !== null && !xb(); ) Zm(at);
  }
  function Zm(n) {
    var i = ry(n.alternate, n, nn);
    n.memoizedProps = n.pendingProps, i === null ? ey(n) : at = i, Od.current = null;
  }
  function ey(n) {
    var i = n;
    do {
      var a = i.alternate;
      if (n = i.return, (i.flags & 32768) === 0) {
        if (a = V_(a, i, nn), a !== null) {
          at = a;
          return;
        }
      } else {
        if (a = H_(a, i), a !== null) {
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
  function di(n, i, a) {
    var c = Le, h = hn.transition;
    try {
      hn.transition = null, Le = 1, Z_(n, i, a, c);
    } finally {
      hn.transition = h, Le = c;
    }
    return null;
  }
  function Z_(n, i, a, c) {
    do
      to();
    while (Dr !== null);
    if ((Te & 6) !== 0) throw Error(r(327));
    a = n.finishedWork;
    var h = n.finishedLanes;
    if (a === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, a === n.current) throw Error(r(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var y = a.lanes | a.childLanes;
    if (Ib(n, y), n === mt && (at = mt = null, _t = 0), (a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0 || ul || (ul = !0, iy(ya, function() {
      return to(), null;
    })), y = (a.flags & 15990) !== 0, (a.subtreeFlags & 15990) !== 0 || y) {
      y = hn.transition, hn.transition = null;
      var R = Le;
      Le = 1;
      var W = Te;
      Te |= 4, Od.current = null, K_(n, a), Vm(a, n), w_(Vc), ka = !!Uc, Vc = Uc = null, n.current = a, Q_(a), kb(), Te = W, Le = R, hn.transition = y;
    } else n.current = a;
    if (ul && (ul = !1, Dr = n, cl = h), y = n.pendingLanes, y === 0 && (Lr = null), Pb(a.stateNode), Gt(n, rt()), i !== null) for (c = n.onRecoverableError, a = 0; a < i.length; a++) h = i[a], c(h.value, { componentStack: h.stack, digest: h.digest });
    if (ll) throw ll = !1, n = Fd, Fd = null, n;
    return (cl & 1) !== 0 && n.tag !== 0 && to(), y = n.pendingLanes, (y & 1) !== 0 ? n === jd ? as++ : (as = 0, jd = n) : as = 0, Ar(), null;
  }
  function to() {
    if (Dr !== null) {
      var n = Wh(cl), i = hn.transition, a = Le;
      try {
        if (hn.transition = null, Le = 16 > n ? 16 : n, Dr === null) var c = !1;
        else {
          if (n = Dr, Dr = null, cl = 0, (Te & 6) !== 0) throw Error(r(331));
          var h = Te;
          for (Te |= 4, ge = n.current; ge !== null; ) {
            var y = ge, R = y.child;
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
                        is(8, oe, y);
                    }
                    var ae = oe.child;
                    if (ae !== null) ae.return = oe, ge = ae;
                    else for (; ge !== null; ) {
                      oe = ge;
                      var re = oe.sibling, pe = oe.return;
                      if (jm(oe), oe === Z) {
                        ge = null;
                        break;
                      }
                      if (re !== null) {
                        re.return = pe, ge = re;
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
            if ((y.subtreeFlags & 2064) !== 0 && R !== null) R.return = y, ge = R;
            else e: for (; ge !== null; ) {
              if (y = ge, (y.flags & 2048) !== 0) switch (y.tag) {
                case 0:
                case 11:
                case 15:
                  is(9, y, y.return);
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
            R = ge;
            var X = R.child;
            if ((R.subtreeFlags & 2064) !== 0 && X !== null) X.return = R, ge = X;
            else e: for (R = Q; ge !== null; ) {
              if (W = ge, (W.flags & 2048) !== 0) try {
                switch (W.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ol(9, W);
                }
              } catch (ve) {
                et(W, W.return, ve);
              }
              if (W === R) {
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
          if (Te = h, Ar(), Ln && typeof Ln.onPostCommitFiberRoot == "function") try {
            Ln.onPostCommitFiberRoot(va, n);
          } catch {
          }
          c = !0;
        }
        return c;
      } finally {
        Le = a, hn.transition = i;
      }
    }
    return !1;
  }
  function ty(n, i, a) {
    i = Ji(a, i), i = wm(n, i, 1), n = Nr(n, i, 1), i = Bt(), n !== null && (Mo(n, 1, i), Gt(n, i));
  }
  function et(n, i, a) {
    if (n.tag === 3) ty(n, n, a);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        ty(i, n, a);
        break;
      } else if (i.tag === 1) {
        var c = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Lr === null || !Lr.has(c))) {
          n = Ji(a, n), n = Sm(i, n, 1), i = Nr(i, n, 1), n = Bt(), i !== null && (Mo(i, 1, n), Gt(i, n));
          break;
        }
      }
      i = i.return;
    }
  }
  function ex(n, i, a) {
    var c = n.pingCache;
    c !== null && c.delete(i), i = Bt(), n.pingedLanes |= n.suspendedLanes & a, mt === n && (_t & a) === a && (ft === 4 || ft === 3 && (_t & 130023424) === _t && 500 > rt() - Dd ? ci(n, 0) : Ld |= a), Gt(n, i);
  }
  function ny(n, i) {
    i === 0 && ((n.mode & 1) === 0 ? i = 1 : (i = Sa, Sa <<= 1, (Sa & 130023424) === 0 && (Sa = 4194304)));
    var a = Bt();
    n = ir(n, i), n !== null && (Mo(n, i, a), Gt(n, a));
  }
  function tx(n) {
    var i = n.memoizedState, a = 0;
    i !== null && (a = i.retryLane), ny(n, a);
  }
  function nx(n, i) {
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
    c !== null && c.delete(i), ny(n, a);
  }
  var ry;
  ry = function(n, i, a) {
    if (n !== null) if (n.memoizedProps !== i.pendingProps || Ht.current) Kt = !0;
    else {
      if ((n.lanes & a) === 0 && (i.flags & 128) === 0) return Kt = !1, U_(n, i, a);
      Kt = (n.flags & 131072) !== 0;
    }
    else Kt = !1, Ke && (i.flags & 1048576) !== 0 && Lg(i, Wa, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var c = i.type;
        rl(n, i), n = i.pendingProps;
        var h = Ui(i, At.current);
        Gi(i, a), h = hd(null, i, c, n, h, a);
        var y = gd();
        return i.flags |= 1, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, qt(c) ? (y = !0, ja(i)) : y = !1, i.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, ad(i), h.updater = tl, i.stateNode = h, h._reactInternals = i, bd(i, c, n, a), i = Cd(null, i, c, !0, y, a)) : (i.tag = 0, Ke && y && Jc(i), zt(null, i, h, a), i = i.child), i;
      case 16:
        c = i.elementType;
        e: {
          switch (rl(n, i), n = i.pendingProps, h = c._init, c = h(c._payload), i.type = c, h = i.tag = ix(c), n = En(c, n), h) {
            case 0:
              i = kd(null, i, c, n, a);
              break e;
            case 1:
              i = Tm(null, i, c, n, a);
              break e;
            case 11:
              i = km(null, i, c, n, a);
              break e;
            case 14:
              i = Cm(null, i, c, En(c.type, n), a);
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
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : En(c, h), kd(n, i, c, h, a);
      case 1:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : En(c, h), Tm(n, i, c, h, a);
      case 3:
        e: {
          if ($m(i), n === null) throw Error(r(387));
          c = i.pendingProps, y = i.memoizedState, h = y.element, Hg(n, i), Qa(i, c, null, a);
          var R = i.memoizedState;
          if (c = R.element, y.isDehydrated) if (y = { element: c, isDehydrated: !1, cache: R.cache, pendingSuspenseBoundaries: R.pendingSuspenseBoundaries, transitions: R.transitions }, i.updateQueue.baseState = y, i.memoizedState = y, i.flags & 256) {
            h = Ji(Error(r(423)), i), i = Mm(n, i, c, a, h);
            break e;
          } else if (c !== h) {
            h = Ji(Error(r(424)), i), i = Mm(n, i, c, a, h);
            break e;
          } else for (tn = Tr(i.stateNode.containerInfo.firstChild), en = i, Ke = !0, Cn = null, a = Ug(i, null, c, a), i.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (qi(), c === h) {
              i = sr(n, i, a);
              break e;
            }
            zt(n, i, c, a);
          }
          i = i.child;
        }
        return i;
      case 5:
        return Qg(i), n === null && ed(i), c = i.type, h = i.pendingProps, y = n !== null ? n.memoizedProps : null, R = h.children, Hc(c, h) ? R = null : y !== null && Hc(c, y) && (i.flags |= 32), Rm(n, i), zt(n, i, R, a), i.child;
      case 6:
        return n === null && ed(i), null;
      case 13:
        return Am(n, i, a);
      case 4:
        return ld(i, i.stateNode.containerInfo), c = i.pendingProps, n === null ? i.child = Ki(i, null, c, a) : zt(n, i, c, a), i.child;
      case 11:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : En(c, h), km(n, i, c, h, a);
      case 7:
        return zt(n, i, i.pendingProps, a), i.child;
      case 8:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 12:
        return zt(n, i, i.pendingProps.children, a), i.child;
      case 10:
        e: {
          if (c = i.type._context, h = i.pendingProps, y = i.memoizedProps, R = h.value, We(Ha, c._currentValue), c._currentValue = R, y !== null) if (kn(y.value, R)) {
            if (y.children === h.children && !Ht.current) {
              i = sr(n, i, a);
              break e;
            }
          } else for (y = i.child, y !== null && (y.return = i); y !== null; ) {
            var W = y.dependencies;
            if (W !== null) {
              R = y.child;
              for (var q = W.firstContext; q !== null; ) {
                if (q.context === c) {
                  if (y.tag === 1) {
                    q = or(-1, a & -a), q.tag = 2;
                    var Z = y.updateQueue;
                    if (Z !== null) {
                      Z = Z.shared;
                      var oe = Z.pending;
                      oe === null ? q.next = q : (q.next = oe.next, oe.next = q), Z.pending = q;
                    }
                  }
                  y.lanes |= a, q = y.alternate, q !== null && (q.lanes |= a), od(
                    y.return,
                    a,
                    i
                  ), W.lanes |= a;
                  break;
                }
                q = q.next;
              }
            } else if (y.tag === 10) R = y.type === i.type ? null : y.child;
            else if (y.tag === 18) {
              if (R = y.return, R === null) throw Error(r(341));
              R.lanes |= a, W = R.alternate, W !== null && (W.lanes |= a), od(R, a, i), R = y.sibling;
            } else R = y.child;
            if (R !== null) R.return = y;
            else for (R = y; R !== null; ) {
              if (R === i) {
                R = null;
                break;
              }
              if (y = R.sibling, y !== null) {
                y.return = R.return, R = y;
                break;
              }
              R = R.return;
            }
            y = R;
          }
          zt(n, i, h.children, a), i = i.child;
        }
        return i;
      case 9:
        return h = i.type, c = i.pendingProps.children, Gi(i, a), h = fn(h), c = c(h), i.flags |= 1, zt(n, i, c, a), i.child;
      case 14:
        return c = i.type, h = En(c, i.pendingProps), h = En(c.type, h), Cm(n, i, c, h, a);
      case 15:
        return Em(n, i, i.type, i.pendingProps, a);
      case 17:
        return c = i.type, h = i.pendingProps, h = i.elementType === c ? h : En(c, h), rl(n, i), i.tag = 1, qt(c) ? (n = !0, ja(i)) : n = !1, Gi(i, a), ym(i, c, h), bd(i, c, h, a), Cd(null, i, c, !0, n, a);
      case 19:
        return Nm(n, i, a);
      case 22:
        return Pm(n, i, a);
    }
    throw Error(r(156, i.tag));
  };
  function iy(n, i) {
    return Dh(n, i);
  }
  function rx(n, i, a, c) {
    this.tag = n, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gn(n, i, a, c) {
    return new rx(n, i, a, c);
  }
  function Hd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function ix(n) {
    if (typeof n == "function") return Hd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === O) return 11;
      if (n === j) return 14;
    }
    return 2;
  }
  function zr(n, i) {
    var a = n.alternate;
    return a === null ? (a = gn(n.tag, i, n.key, n.mode), a.elementType = n.elementType, a.type = n.type, a.stateNode = n.stateNode, a.alternate = n, n.alternate = a) : (a.pendingProps = i, a.type = n.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = n.flags & 14680064, a.childLanes = n.childLanes, a.lanes = n.lanes, a.child = n.child, a.memoizedProps = n.memoizedProps, a.memoizedState = n.memoizedState, a.updateQueue = n.updateQueue, i = n.dependencies, a.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, a.sibling = n.sibling, a.index = n.index, a.ref = n.ref, a;
  }
  function hl(n, i, a, c, h, y) {
    var R = 2;
    if (c = n, typeof n == "function") Hd(n) && (R = 1);
    else if (typeof n == "string") R = 5;
    else e: switch (n) {
      case A:
        return fi(a.children, h, y, i);
      case I:
        R = 8, h |= 8;
        break;
      case L:
        return n = gn(12, a, i, h | 2), n.elementType = L, n.lanes = y, n;
      case F:
        return n = gn(13, a, i, h), n.elementType = F, n.lanes = y, n;
      case B:
        return n = gn(19, a, i, h), n.elementType = B, n.lanes = y, n;
      case G:
        return gl(a, h, y, i);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case v:
            R = 10;
            break e;
          case T:
            R = 9;
            break e;
          case O:
            R = 11;
            break e;
          case j:
            R = 14;
            break e;
          case V:
            R = 16, c = null;
            break e;
        }
        throw Error(r(130, n == null ? n : typeof n, ""));
    }
    return i = gn(R, a, i, h), i.elementType = n, i.type = c, i.lanes = y, i;
  }
  function fi(n, i, a, c) {
    return n = gn(7, n, c, i), n.lanes = a, n;
  }
  function gl(n, i, a, c) {
    return n = gn(22, n, c, i), n.elementType = G, n.lanes = a, n.stateNode = { isHidden: !1 }, n;
  }
  function qd(n, i, a) {
    return n = gn(6, n, null, i), n.lanes = a, n;
  }
  function Kd(n, i, a) {
    return i = gn(4, n.children !== null ? n.children : [], n.key, i), i.lanes = a, i.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, i;
  }
  function ox(n, i, a, c, h) {
    this.tag = i, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Sc(0), this.expirationTimes = Sc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Sc(0), this.identifierPrefix = c, this.onRecoverableError = h, this.mutableSourceEagerHydrationData = null;
  }
  function Qd(n, i, a, c, h, y, R, W, q) {
    return n = new ox(n, i, a, W, q), i === 1 ? (i = 1, y === !0 && (i |= 8)) : i = 0, y = gn(3, null, null, i), n.current = y, y.stateNode = n, y.memoizedState = { element: c, isDehydrated: a, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ad(y), n;
  }
  function sx(n, i, a) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: $, key: c == null ? null : "" + c, children: n, containerInfo: i, implementation: a };
  }
  function oy(n) {
    if (!n) return Mr;
    n = n._reactInternals;
    e: {
      if (ei(n) !== n || n.tag !== 1) throw Error(r(170));
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
      if (qt(a)) return Ig(n, a, i);
    }
    return i;
  }
  function sy(n, i, a, c, h, y, R, W, q) {
    return n = Qd(a, c, !0, n, h, y, R, W, q), n.context = oy(null), a = n.current, c = Bt(), h = Fr(a), y = or(c, h), y.callback = i ?? null, Nr(a, y, h), n.current.lanes = h, Mo(n, h, c), Gt(n, c), n;
  }
  function ml(n, i, a, c) {
    var h = i.current, y = Bt(), R = Fr(h);
    return a = oy(a), i.context === null ? i.context = a : i.pendingContext = a, i = or(y, R), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = Nr(h, i, R), n !== null && (Tn(n, h, R, y), Ka(n, h, R)), R;
  }
  function yl(n) {
    return n = n.current, n.child ? (n.child.tag === 5, n.child.stateNode) : null;
  }
  function ay(n, i) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var a = n.retryLane;
      n.retryLane = a !== 0 && a < i ? a : i;
    }
  }
  function Gd(n, i) {
    ay(n, i), (n = n.alternate) && ay(n, i);
  }
  function ax() {
    return null;
  }
  var ly = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Yd(n) {
    this._internalRoot = n;
  }
  vl.prototype.render = Yd.prototype.render = function(n) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    ml(n, i, null, null);
  }, vl.prototype.unmount = Yd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var i = n.containerInfo;
      ui(function() {
        ml(null, n, null, null);
      }), i[er] = null;
    }
  };
  function vl(n) {
    this._internalRoot = n;
  }
  vl.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var i = Hh();
      n = { blockedOn: null, target: n, priority: i };
      for (var a = 0; a < Er.length && i !== 0 && i < Er[a].priority; a++) ;
      Er.splice(a, 0, n), a === 0 && Qh(n);
    }
  };
  function Jd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function wl(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function uy() {
  }
  function lx(n, i, a, c, h) {
    if (h) {
      if (typeof c == "function") {
        var y = c;
        c = function() {
          var Z = yl(R);
          y.call(Z);
        };
      }
      var R = sy(i, c, n, 0, null, !1, !1, "", uy);
      return n._reactRootContainer = R, n[er] = R.current, Ho(n.nodeType === 8 ? n.parentNode : n), ui(), R;
    }
    for (; h = n.lastChild; ) n.removeChild(h);
    if (typeof c == "function") {
      var W = c;
      c = function() {
        var Z = yl(q);
        W.call(Z);
      };
    }
    var q = Qd(n, 0, !1, null, null, !1, !1, "", uy);
    return n._reactRootContainer = q, n[er] = q.current, Ho(n.nodeType === 8 ? n.parentNode : n), ui(function() {
      ml(i, q, a, c);
    }), q;
  }
  function Sl(n, i, a, c, h) {
    var y = a._reactRootContainer;
    if (y) {
      var R = y;
      if (typeof h == "function") {
        var W = h;
        h = function() {
          var q = yl(R);
          W.call(q);
        };
      }
      ml(i, R, n, h);
    } else R = lx(a, i, n, h, c);
    return yl(R);
  }
  Uh = function(n) {
    switch (n.tag) {
      case 3:
        var i = n.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var a = $o(i.pendingLanes);
          a !== 0 && (bc(i, a | 1), Gt(i, rt()), (Te & 6) === 0 && (eo = rt() + 500, Ar()));
        }
        break;
      case 13:
        ui(function() {
          var c = ir(n, 1);
          if (c !== null) {
            var h = Bt();
            Tn(c, n, 1, h);
          }
        }), Gd(n, 1);
    }
  }, _c = function(n) {
    if (n.tag === 13) {
      var i = ir(n, 134217728);
      if (i !== null) {
        var a = Bt();
        Tn(i, n, 134217728, a);
      }
      Gd(n, 134217728);
    }
  }, Vh = function(n) {
    if (n.tag === 13) {
      var i = Fr(n), a = ir(n, i);
      if (a !== null) {
        var c = Bt();
        Tn(a, n, i, c);
      }
      Gd(n, i);
    }
  }, Hh = function() {
    return Le;
  }, qh = function(n, i) {
    var a = Le;
    try {
      return Le = n, i();
    } finally {
      Le = a;
    }
  }, hc = function(n, i, a) {
    switch (i) {
      case "input":
        if (Ze(n, a), i = a.name, a.type === "radio" && i != null) {
          for (a = n; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < a.length; i++) {
            var c = a[i];
            if (c !== n && c.form === n.form) {
              var h = Da(c);
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
        i = a.value, i != null && Ue(n, !!a.multiple, i, !1);
    }
  }, $h = Wd, Mh = ui;
  var ux = { usingClientEntryPoint: !1, Events: [Qo, Bi, Da, Rh, Th, Wd] }, ls = { findFiberByHostInstance: ti, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, cx = { bundleType: ls.bundleType, version: ls.version, rendererPackageName: ls.rendererPackageName, rendererConfig: ls.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: P.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Oh(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ls.findFiberByHostInstance || ax, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bl.isDisabled && bl.supportsFiber) try {
      va = bl.inject(cx), Ln = bl;
    } catch {
    }
  }
  return Yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ux, Yt.createPortal = function(n, i) {
    var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Jd(i)) throw Error(r(200));
    return sx(n, i, null, a);
  }, Yt.createRoot = function(n, i) {
    if (!Jd(n)) throw Error(r(299));
    var a = !1, c = "", h = ly;
    return i != null && (i.unstable_strictMode === !0 && (a = !0), i.identifierPrefix !== void 0 && (c = i.identifierPrefix), i.onRecoverableError !== void 0 && (h = i.onRecoverableError)), i = Qd(n, 1, !1, null, null, a, !1, c, h), n[er] = i.current, Ho(n.nodeType === 8 ? n.parentNode : n), new Yd(i);
  }, Yt.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var i = n._reactInternals;
    if (i === void 0)
      throw typeof n.render == "function" ? Error(r(188)) : (n = Object.keys(n).join(","), Error(r(268, n)));
    return n = Oh(i), n = n === null ? null : n.stateNode, n;
  }, Yt.flushSync = function(n) {
    return ui(n);
  }, Yt.hydrate = function(n, i, a) {
    if (!wl(i)) throw Error(r(200));
    return Sl(null, n, i, !0, a);
  }, Yt.hydrateRoot = function(n, i, a) {
    if (!Jd(n)) throw Error(r(405));
    var c = a != null && a.hydratedSources || null, h = !1, y = "", R = ly;
    if (a != null && (a.unstable_strictMode === !0 && (h = !0), a.identifierPrefix !== void 0 && (y = a.identifierPrefix), a.onRecoverableError !== void 0 && (R = a.onRecoverableError)), i = sy(i, null, n, 1, a ?? null, h, !1, y, R), n[er] = i.current, Ho(n), c) for (n = 0; n < c.length; n++) a = c[n], h = a._getVersion, h = h(a._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [a, h] : i.mutableSourceEagerHydrationData.push(
      a,
      h
    );
    return new vl(i);
  }, Yt.render = function(n, i, a) {
    if (!wl(i)) throw Error(r(200));
    return Sl(null, n, i, !1, a);
  }, Yt.unmountComponentAtNode = function(n) {
    if (!wl(n)) throw Error(r(40));
    return n._reactRootContainer ? (ui(function() {
      Sl(null, null, n, !1, function() {
        n._reactRootContainer = null, n[er] = null;
      });
    }), !0) : !1;
  }, Yt.unstable_batchedUpdates = Wd, Yt.unstable_renderSubtreeIntoContainer = function(n, i, a, c) {
    if (!wl(a)) throw Error(r(200));
    if (n == null || n._reactInternals === void 0) throw Error(r(38));
    return Sl(n, i, a, !1, c);
  }, Yt.version = "18.3.1-next-f1338f8080-20240426", Yt;
}
var ov;
function US() {
  if (ov) return pf.exports;
  ov = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), pf.exports = nE(), pf.exports;
}
var VS = US();
const El = /* @__PURE__ */ Xr(VS), sv = {
  disabled: !1
}, fu = Ut.createContext(null);
var rE = function(t) {
  return t.scrollTop;
}, bs = "unmounted", mi = "exited", yi = "entering", uo = "entered", Yf = "exiting", Jn = /* @__PURE__ */ (function(e) {
  WS(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = s, d = u && !u.isMounting ? o.enter : o.appear, p;
    return l.appearStatus = null, o.in ? d ? (p = mi, l.appearStatus = yi) : p = uo : o.unmountOnExit || o.mountOnEnter ? p = bs : p = mi, l.state = {
      status: p
    }, l.nextCallback = null, l;
  }
  t.getDerivedStateFromProps = function(s, l) {
    var u = s.in;
    return u && l.status === bs ? {
      status: mi
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(s) {
    var l = null;
    if (s !== this.props) {
      var u = this.state.status;
      this.props.in ? u !== yi && u !== uo && (l = yi) : (u === yi || u === uo) && (l = Yf);
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
      if (this.cancelNextCallback(), l === yi) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var u = this.props.nodeRef ? this.props.nodeRef.current : El.findDOMNode(this);
          u && rE(u);
        }
        this.performEnter(s);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === mi && this.setState({
      status: bs
    });
  }, r.performEnter = function(s) {
    var l = this, u = this.props.enter, d = this.context ? this.context.isMounting : s, p = this.props.nodeRef ? [d] : [El.findDOMNode(this), d], f = p[0], m = p[1], g = this.getTimeouts(), w = d ? g.appear : g.enter;
    if (!s && !u || sv.disabled) {
      this.safeSetState({
        status: uo
      }, function() {
        l.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, m), this.safeSetState({
      status: yi
    }, function() {
      l.props.onEntering(f, m), l.onTransitionEnd(w, function() {
        l.safeSetState({
          status: uo
        }, function() {
          l.props.onEntered(f, m);
        });
      });
    });
  }, r.performExit = function() {
    var s = this, l = this.props.exit, u = this.getTimeouts(), d = this.props.nodeRef ? void 0 : El.findDOMNode(this);
    if (!l || sv.disabled) {
      this.safeSetState({
        status: mi
      }, function() {
        s.props.onExited(d);
      });
      return;
    }
    this.props.onExit(d), this.safeSetState({
      status: Yf
    }, function() {
      s.props.onExiting(d), s.onTransitionEnd(u.exit, function() {
        s.safeSetState({
          status: mi
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
    var u = this.props.nodeRef ? this.props.nodeRef.current : El.findDOMNode(this), d = s == null && !this.props.addEndListener;
    if (!u || d) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var p = this.props.nodeRef ? [this.nextCallback] : [u, this.nextCallback], f = p[0], m = p[1];
      this.props.addEndListener(f, m);
    }
    s != null && setTimeout(this.nextCallback, s);
  }, r.render = function() {
    var s = this.state.status;
    if (s === bs)
      return null;
    var l = this.props, u = l.children;
    l.in, l.mountOnEnter, l.unmountOnExit, l.appear, l.enter, l.exit, l.timeout, l.addEndListener, l.onEnter, l.onEntering, l.onEntered, l.onExit, l.onExiting, l.onExited, l.nodeRef;
    var d = BS(l, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Ut.createElement(fu.Provider, {
        value: null
      }, typeof u == "function" ? u(s, d) : Ut.cloneElement(Ut.Children.only(u), d))
    );
  }, t;
})(Ut.Component);
Jn.contextType = fu;
Jn.propTypes = {};
function ao() {
}
Jn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: ao,
  onEntering: ao,
  onEntered: ao,
  onExit: ao,
  onExiting: ao,
  onExited: ao
};
Jn.UNMOUNTED = bs;
Jn.EXITED = mi;
Jn.ENTERING = yi;
Jn.ENTERED = uo;
Jn.EXITING = Yf;
function iE(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Zp(e, t) {
  var r = function(l) {
    return t && _.isValidElement(l) ? t(l) : l;
  }, o = /* @__PURE__ */ Object.create(null);
  return e && _.Children.map(e, function(s) {
    return s;
  }).forEach(function(s) {
    o[s.key] = r(s);
  }), o;
}
function oE(e, t) {
  e = e || {}, t = t || {};
  function r(m) {
    return m in t ? t[m] : e[m];
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
function _i(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function sE(e, t) {
  return Zp(e.children, function(r) {
    return _.cloneElement(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: _i(r, "appear", e),
      enter: _i(r, "enter", e),
      exit: _i(r, "exit", e)
    });
  });
}
function aE(e, t, r) {
  var o = Zp(e.children), s = oE(t, o);
  return Object.keys(s).forEach(function(l) {
    var u = s[l];
    if (_.isValidElement(u)) {
      var d = l in t, p = l in o, f = t[l], m = _.isValidElement(f) && !f.props.in;
      p && (!d || m) ? s[l] = _.cloneElement(u, {
        onExited: r.bind(null, u),
        in: !0,
        exit: _i(u, "exit", e),
        enter: _i(u, "enter", e)
      }) : !p && d && !m ? s[l] = _.cloneElement(u, {
        in: !1
      }) : p && d && _.isValidElement(f) && (s[l] = _.cloneElement(u, {
        onExited: r.bind(null, u),
        in: f.props.in,
        exit: _i(u, "exit", e),
        enter: _i(u, "enter", e)
      }));
    }
  }), s;
}
var lE = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, uE = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, eh = /* @__PURE__ */ (function(e) {
  WS(t, e);
  function t(o, s) {
    var l;
    l = e.call(this, o, s) || this;
    var u = l.handleExited.bind(iE(l));
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
      children: p ? sE(s, d) : aE(s, u, d),
      firstRender: !1
    };
  }, r.handleExited = function(s, l) {
    var u = Zp(this.props.children);
    s.key in u || (s.props.onExited && s.props.onExited(l), this.mounted && this.setState(function(d) {
      var p = lu({}, d.children);
      return delete p[s.key], {
        children: p
      };
    }));
  }, r.render = function() {
    var s = this.props, l = s.component, u = s.childFactory, d = BS(s, ["component", "childFactory"]), p = this.state.contextValue, f = lE(this.state.children).map(u);
    return delete d.appear, delete d.enter, delete d.exit, l === null ? /* @__PURE__ */ Ut.createElement(fu.Provider, {
      value: p
    }, f) : /* @__PURE__ */ Ut.createElement(fu.Provider, {
      value: p
    }, /* @__PURE__ */ Ut.createElement(l, d, f));
  }, t;
})(Ut.Component);
eh.propTypes = {};
eh.defaultProps = uE;
const HS = (e) => e.scrollTop;
function pu(e, t) {
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
function cE(e) {
  return pt("MuiPaper", e);
}
Xe("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const dE = (e) => {
  const {
    square: t,
    elevation: r,
    variant: o,
    classes: s
  } = e, l = {
    root: ["root", o, !t && "rounded", o === "elevation" && `elevation${r}`]
  };
  return wt(l, cE, s);
}, fE = Me("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], !r.square && t.rounded, r.variant === "elevation" && t[`elevation${r.elevation}`]];
  }
})(Sn(({
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
}))), qS = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiPaper"
  }), s = Xp(), {
    className: l,
    component: u = "div",
    elevation: d = 1,
    square: p = !1,
    variant: f = "elevation",
    ...m
  } = o, g = {
    ...o,
    component: u,
    elevation: d,
    square: p,
    variant: f
  }, w = dE(g);
  return /* @__PURE__ */ z.jsx(fE, {
    as: u,
    ownerState: g,
    className: Re(w.root, l),
    ref: r,
    ...m,
    style: {
      ...f === "elevation" && {
        "--Paper-shadow": (s.vars || s).shadows[d],
        ...s.vars && {
          "--Paper-overlay": s.vars.overlays?.[d]
        },
        ...!s.vars && s.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${Et("#fff", Kf(d))}, ${Et("#fff", Kf(d))})`
        }
      },
      ...m.style
    }
  });
});
function vn(e, t) {
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
    slots: m = {
      [e]: void 0
    },
    slotProps: g = {
      [e]: void 0
    },
    ...w
  } = l, C = m[e] || o, S = PS(g[e], s), {
    props: {
      component: b,
      ...k
    },
    internalRef: M
  } = ES({
    className: r,
    ...p,
    externalForwardedProps: e === "root" ? w : void 0,
    externalSlotProps: S
  }), N = Nn(M, S?.ref, t.ref), x = e === "root" ? b || f : b, P = kS(C, {
    ...e === "root" && !f && !m[e] && u,
    ...e !== "root" && !m[e] && u,
    ...k,
    ...x && !d && {
      as: x
    },
    ...x && d && {
      component: x
    },
    ref: N
  }, s);
  return [C, P];
}
class hu {
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new hu();
  }
  static use() {
    const t = bS(hu.create).current, [r, o] = _.useState(!1);
    return t.shouldMount = r, t.setShouldMount = o, _.useEffect(t.mountEffect, [r]), t;
  }
  constructor() {
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  mount() {
    return this.mounted || (this.mounted = hE(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
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
function pE() {
  return hu.use();
}
function hE() {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}
function gE(e) {
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
  } = e, [m, g] = _.useState(!1), w = Re(t, r.ripple, r.rippleVisible, o && r.ripplePulsate), C = {
    width: u,
    height: u,
    top: -(u / 2) + l,
    left: -(u / 2) + s
  }, S = Re(r.child, m && r.childLeaving, o && r.childPulsate);
  return !d && !m && g(!0), _.useEffect(() => {
    if (!d && p != null) {
      const b = setTimeout(p, f);
      return () => {
        clearTimeout(b);
      };
    }
  }, [p, d, f]), /* @__PURE__ */ z.jsx("span", {
    className: w,
    style: C,
    children: /* @__PURE__ */ z.jsx("span", {
      className: S
    })
  });
}
const mn = Xe("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), Jf = 550, mE = 80, yE = Mi`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, vE = Mi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, wE = Mi`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, SE = Me("span", {
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
}), bE = Me(gE, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${mn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${yE};
    animation-duration: ${Jf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${mn.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${mn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${mn.childLeaving} {
    opacity: 0;
    animation-name: ${vE};
    animation-duration: ${Jf}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${mn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${wE};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, _E = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: s = !1,
    classes: l = {},
    className: u,
    ...d
  } = o, [p, f] = _.useState([]), m = _.useRef(0), g = _.useRef(null);
  _.useEffect(() => {
    g.current && (g.current(), g.current = null);
  }, [p]);
  const w = _.useRef(!1), C = _S(), S = _.useRef(null), b = _.useRef(null), k = _.useCallback((P) => {
    const {
      pulsate: E,
      rippleX: $,
      rippleY: A,
      rippleSize: I,
      cb: L
    } = P;
    f((v) => [...v, /* @__PURE__ */ z.jsx(bE, {
      classes: {
        ripple: Re(l.ripple, mn.ripple),
        rippleVisible: Re(l.rippleVisible, mn.rippleVisible),
        ripplePulsate: Re(l.ripplePulsate, mn.ripplePulsate),
        child: Re(l.child, mn.child),
        childLeaving: Re(l.childLeaving, mn.childLeaving),
        childPulsate: Re(l.childPulsate, mn.childPulsate)
      },
      timeout: Jf,
      pulsate: E,
      rippleX: $,
      rippleY: A,
      rippleSize: I
    }, m.current)]), m.current += 1, g.current = L;
  }, [l]), M = _.useCallback((P = {}, E = {}, $ = () => {
  }) => {
    const {
      pulsate: A = !1,
      center: I = s || E.pulsate,
      fakeElement: L = !1
      // For test purposes
    } = E;
    if (P?.type === "mousedown" && w.current) {
      w.current = !1;
      return;
    }
    P?.type === "touchstart" && (w.current = !0);
    const v = L ? null : b.current, T = v ? v.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let O, F, B;
    if (I || P === void 0 || P.clientX === 0 && P.clientY === 0 || !P.clientX && !P.touches)
      O = Math.round(T.width / 2), F = Math.round(T.height / 2);
    else {
      const {
        clientX: j,
        clientY: V
      } = P.touches && P.touches.length > 0 ? P.touches[0] : P;
      O = Math.round(j - T.left), F = Math.round(V - T.top);
    }
    if (I)
      B = Math.sqrt((2 * T.width ** 2 + T.height ** 2) / 3), B % 2 === 0 && (B += 1);
    else {
      const j = Math.max(Math.abs((v ? v.clientWidth : 0) - O), O) * 2 + 2, V = Math.max(Math.abs((v ? v.clientHeight : 0) - F), F) * 2 + 2;
      B = Math.sqrt(j ** 2 + V ** 2);
    }
    P?.touches ? S.current === null && (S.current = () => {
      k({
        pulsate: A,
        rippleX: O,
        rippleY: F,
        rippleSize: B,
        cb: $
      });
    }, C.start(mE, () => {
      S.current && (S.current(), S.current = null);
    })) : k({
      pulsate: A,
      rippleX: O,
      rippleY: F,
      rippleSize: B,
      cb: $
    });
  }, [s, k, C]), N = _.useCallback(() => {
    M({}, {
      pulsate: !0
    });
  }, [M]), x = _.useCallback((P, E) => {
    if (C.clear(), P?.type === "touchend" && S.current) {
      S.current(), S.current = null, C.start(0, () => {
        x(P, E);
      });
      return;
    }
    S.current = null, f(($) => $.length > 0 ? $.slice(1) : $), g.current = E;
  }, [C]);
  return _.useImperativeHandle(r, () => ({
    pulsate: N,
    start: M,
    stop: x
  }), [N, M, x]), /* @__PURE__ */ z.jsx(SE, {
    className: Re(mn.root, l.root, u),
    ref: b,
    ...d,
    children: /* @__PURE__ */ z.jsx(eh, {
      component: null,
      exit: !0,
      children: p
    })
  });
});
function xE(e) {
  return pt("MuiButtonBase", e);
}
const kE = Xe("MuiButtonBase", ["root", "disabled", "focusVisible"]), CE = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: o,
    classes: s
  } = e, u = wt({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, xE, s);
  return r && o && (u.root += ` ${o}`), u;
}, EE = Me("button", {
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
  [`&.${kE.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Qu = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    disableRipple: m = !1,
    disableTouchRipple: g = !1,
    focusRipple: w = !1,
    focusVisibleClassName: C,
    LinkComponent: S = "a",
    onBlur: b,
    onClick: k,
    onContextMenu: M,
    onDragLeave: N,
    onFocus: x,
    onFocusVisible: P,
    onKeyDown: E,
    onKeyUp: $,
    onMouseDown: A,
    onMouseLeave: I,
    onMouseUp: L,
    onTouchEnd: v,
    onTouchMove: T,
    onTouchStart: O,
    tabIndex: F = 0,
    TouchRippleProps: B,
    touchRippleRef: j,
    type: V,
    ...G
  } = o, U = _.useRef(null), H = pE(), K = Nn(H.ref, j), [D, Y] = _.useState(!1);
  f && D && Y(!1), _.useImperativeHandle(s, () => ({
    focusVisible: () => {
      Y(!0), U.current.focus();
    }
  }), []);
  const ne = H.shouldMount && !m && !f;
  _.useEffect(() => {
    D && w && !m && H.pulsate();
  }, [m, w, D, H]);
  const te = ur(H, "start", A, g), se = ur(H, "stop", M, g), le = ur(H, "stop", N, g), de = ur(H, "stop", L, g), he = ur(H, "stop", (xe) => {
    D && xe.preventDefault(), I && I(xe);
  }, g), fe = ur(H, "start", O, g), ue = ur(H, "stop", v, g), we = ur(H, "stop", T, g), _e = ur(H, "stop", (xe) => {
    Uy(xe.target) || Y(!1), b && b(xe);
  }, !1), qe = po((xe) => {
    U.current || (U.current = xe.currentTarget), Uy(xe.target) && (Y(!0), P && P(xe)), x && x(xe);
  }), je = () => {
    const xe = U.current;
    return p && p !== "button" && !(xe.tagName === "A" && xe.href);
  }, st = po((xe) => {
    w && !xe.repeat && D && xe.key === " " && H.stop(xe, () => {
      H.start(xe);
    }), xe.target === xe.currentTarget && je() && xe.key === " " && xe.preventDefault(), E && E(xe), xe.target === xe.currentTarget && je() && xe.key === "Enter" && !f && (xe.preventDefault(), k && k(xe));
  }), ut = po((xe) => {
    w && xe.key === " " && D && !xe.defaultPrevented && H.stop(xe, () => {
      H.pulsate(xe);
    }), $ && $(xe), k && xe.target === xe.currentTarget && je() && xe.key === " " && !xe.defaultPrevented && k(xe);
  });
  let Ze = p;
  Ze === "button" && (G.href || G.to) && (Ze = S);
  const De = {};
  Ze === "button" ? (De.type = V === void 0 ? "button" : V, De.disabled = f) : (!G.href && !G.to && (De.role = "button"), f && (De["aria-disabled"] = f));
  const Rt = Nn(r, U), ct = {
    ...o,
    centerRipple: l,
    component: p,
    disabled: f,
    disableRipple: m,
    disableTouchRipple: g,
    focusRipple: w,
    tabIndex: F,
    focusVisible: D
  }, Ue = CE(ct);
  return /* @__PURE__ */ z.jsxs(EE, {
    as: Ze,
    className: Re(Ue.root, d),
    ownerState: ct,
    onBlur: _e,
    onClick: k,
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
    tabIndex: f ? -1 : F,
    type: V,
    ...De,
    ...G,
    children: [u, ne ? /* @__PURE__ */ z.jsx(_E, {
      ref: K,
      center: l,
      ...B
    }) : null]
  });
});
function ur(e, t, r, o = !1) {
  return po((s) => (r && r(s), o || e[t](s), !0));
}
function PE(e) {
  return typeof e.main == "string";
}
function RE(e, t = []) {
  if (!PE(e))
    return !1;
  for (const r of t)
    if (!e.hasOwnProperty(r) || typeof e[r] != "string")
      return !1;
  return !0;
}
function Pi(e = []) {
  return ([, t]) => t && RE(t, e);
}
function TE(e) {
  return pt("MuiCircularProgress", e);
}
Xe("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "circle", "circleDeterminate", "circleIndeterminate", "circleDisableShrink"]);
const Wr = 44, Xf = Mi`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, Zf = Mi`
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
`, $E = typeof Xf != "string" ? Ys`
        animation: ${Xf} 1.4s linear infinite;
      ` : null, ME = typeof Zf != "string" ? Ys`
        animation: ${Zf} 1.4s ease-in-out infinite;
      ` : null, AE = (e) => {
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
  return wt(l, TE, t);
}, IE = Me("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`color${Pe(r.color)}`]];
  }
})(Sn(({
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
    style: $E || {
      animation: `${Xf} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), NE = Me("svg", {
  name: "MuiCircularProgress",
  slot: "Svg",
  overridesResolver: (e, t) => t.svg
})({
  display: "block"
  // Keeps the progress centered
}), OE = Me("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.circle, t[`circle${Pe(r.variant)}`], r.disableShrink && t.circleDisableShrink];
  }
})(Sn(({
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
    style: ME || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${Zf} 1.4s ease-in-out infinite`
    }
  }]
}))), KS = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    value: m = 0,
    variant: g = "indeterminate",
    ...w
  } = o, C = {
    ...o,
    color: l,
    disableShrink: u,
    size: d,
    thickness: f,
    value: m,
    variant: g
  }, S = AE(C), b = {}, k = {}, M = {};
  if (g === "determinate") {
    const N = 2 * Math.PI * ((Wr - f) / 2);
    b.strokeDasharray = N.toFixed(3), M["aria-valuenow"] = Math.round(m), b.strokeDashoffset = `${((100 - m) / 100 * N).toFixed(3)}px`, k.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ z.jsx(IE, {
    className: Re(S.root, s),
    style: {
      width: d,
      height: d,
      ...k,
      ...p
    },
    ownerState: C,
    ref: r,
    role: "progressbar",
    ...M,
    ...w,
    children: /* @__PURE__ */ z.jsx(NE, {
      className: S.svg,
      ownerState: C,
      viewBox: `${Wr / 2} ${Wr / 2} ${Wr} ${Wr}`,
      children: /* @__PURE__ */ z.jsx(OE, {
        className: S.circle,
        style: b,
        ownerState: C,
        cx: Wr,
        cy: Wr,
        r: (Wr - f) / 2,
        fill: "none",
        strokeWidth: f
      })
    })
  });
});
function LE(e) {
  return pt("MuiIconButton", e);
}
const av = Xe("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), DE = (e) => {
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
  return wt(d, LE, t);
}, FE = Me(Qu, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.loading && t.loading, r.color !== "default" && t[`color${Pe(r.color)}`], r.edge && t[`edge${Pe(r.edge)}`], t[`size${Pe(r.size)}`]];
  }
})(Sn(({
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
      "--IconButton-hoverBg": e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette.action.active, e.palette.action.hoverOpacity),
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
})), Sn(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${(e.vars || e).palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Et((e.vars || e).palette[t].main, e.palette.action.hoverOpacity)
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
  [`&.${av.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${av.loading}`]: {
    color: "transparent"
  }
}))), jE = Me("span", {
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
})), gu = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    size: m = "medium",
    id: g,
    loading: w = null,
    loadingIndicator: C,
    ...S
  } = o, b = Hp(g), k = C ?? /* @__PURE__ */ z.jsx(KS, {
    "aria-labelledby": b,
    color: "inherit",
    size: 16
  }), M = {
    ...o,
    edge: s,
    color: d,
    disabled: p,
    disableFocusRipple: f,
    loading: w,
    loadingIndicator: k,
    size: m
  }, N = DE(M);
  return /* @__PURE__ */ z.jsxs(FE, {
    id: w ? b : g,
    className: Re(N.root, u),
    centerRipple: !0,
    focusRipple: !f,
    disabled: p || w,
    ref: r,
    ...S,
    ownerState: M,
    children: [typeof w == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ z.jsx("span", {
      className: N.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ z.jsx(jE, {
        className: N.loadingIndicator,
        ownerState: M,
        children: w && k
      })
    }), l]
  });
});
function zE(e) {
  return pt("MuiTypography", e);
}
Xe("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const BE = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, WE = YC(), UE = (e) => {
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
  return wt(d, zE, u);
}, VE = Me("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.variant && t[r.variant], r.align !== "inherit" && t[`align${Pe(r.align)}`], r.noWrap && t.noWrap, r.gutterBottom && t.gutterBottom, r.paragraph && t.paragraph];
  }
})(Sn(({
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
  })), ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
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
}))), lv = {
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
}, ta = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const {
    color: o,
    ...s
  } = ht({
    props: t,
    name: "MuiTypography"
  }), l = !BE[o], u = WE({
    ...s,
    ...l && {
      color: o
    }
  }), {
    align: d = "inherit",
    className: p,
    component: f,
    gutterBottom: m = !1,
    noWrap: g = !1,
    paragraph: w = !1,
    variant: C = "body1",
    variantMapping: S = lv,
    ...b
  } = u, k = {
    ...u,
    align: d,
    color: o,
    className: p,
    component: f,
    gutterBottom: m,
    noWrap: g,
    paragraph: w,
    variant: C,
    variantMapping: S
  }, M = f || (w ? "p" : S[C] || lv[C]) || "span", N = UE(k);
  return /* @__PURE__ */ z.jsx(VE, {
    as: M,
    ref: r,
    className: Re(N.root, p),
    ...b,
    ownerState: k,
    style: {
      ...d !== "inherit" && {
        "--Typography-textAlign": d
      },
      ...b.style
    }
  });
});
function HE(e) {
  return typeof e == "function" ? e() : e;
}
const qE = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const {
    children: o,
    container: s,
    disablePortal: l = !1
  } = t, [u, d] = _.useState(null), p = Nn(/* @__PURE__ */ _.isValidElement(o) ? Ku(o) : null, r);
  if (Ci(() => {
    l || d(HE(s) || document.body);
  }, [s, l]), Ci(() => {
    if (u && !l)
      return jy(r, u), () => {
        jy(r, null);
      };
  }, [r, u, l]), l) {
    if (/* @__PURE__ */ _.isValidElement(o)) {
      const f = {
        ref: p
      };
      return /* @__PURE__ */ _.cloneElement(o, f);
    }
    return o;
  }
  return u && /* @__PURE__ */ VS.createPortal(o, u);
});
function KE(e) {
  return typeof e == "string";
}
function QE({
  props: e,
  states: t,
  muiFormControl: r
}) {
  return t.reduce((o, s) => (o[s] = e[s], r && typeof e[s] > "u" && (o[s] = r[s]), o), {});
}
const GE = /* @__PURE__ */ _.createContext(void 0);
function QS() {
  return _.useContext(GE);
}
const YE = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, JE = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = Xp(), s = {
    enter: o.transitions.duration.enteringScreen,
    exit: o.transitions.duration.leavingScreen
  }, {
    addEndListener: l,
    appear: u = !0,
    children: d,
    easing: p,
    in: f,
    onEnter: m,
    onEntered: g,
    onEntering: w,
    onExit: C,
    onExited: S,
    onExiting: b,
    style: k,
    timeout: M = s,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = Jn,
    ...x
  } = t, P = _.useRef(null), E = Nn(P, Ku(d), r), $ = (B) => (j) => {
    if (B) {
      const V = P.current;
      j === void 0 ? B(V) : B(V, j);
    }
  }, A = $(w), I = $((B, j) => {
    HS(B);
    const V = pu({
      style: k,
      timeout: M,
      easing: p
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = o.transitions.create("opacity", V), B.style.transition = o.transitions.create("opacity", V), m && m(B, j);
  }), L = $(g), v = $(b), T = $((B) => {
    const j = pu({
      style: k,
      timeout: M,
      easing: p
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = o.transitions.create("opacity", j), B.style.transition = o.transitions.create("opacity", j), C && C(B);
  }), O = $(S), F = (B) => {
    l && l(P.current, B);
  };
  return /* @__PURE__ */ z.jsx(N, {
    appear: u,
    in: f,
    nodeRef: P,
    onEnter: I,
    onEntered: L,
    onEntering: A,
    onExit: T,
    onExited: O,
    onExiting: v,
    addEndListener: F,
    timeout: M,
    ...x,
    children: (B, {
      ownerState: j,
      ...V
    }) => /* @__PURE__ */ _.cloneElement(d, {
      style: {
        opacity: 0,
        visibility: B === "exited" && !f ? "hidden" : void 0,
        ...YE[B],
        ...k,
        ...d.props.style
      },
      ref: E,
      ...V
    })
  });
});
function XE(e) {
  return pt("MuiBackdrop", e);
}
Xe("MuiBackdrop", ["root", "invisible"]);
const ZE = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return wt({
    root: ["root", r && "invisible"]
  }, XE, t);
}, eP = Me("div", {
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
}), tP = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    componentsProps: m = {},
    slotProps: g = {},
    slots: w = {},
    TransitionComponent: C,
    transitionDuration: S,
    ...b
  } = o, k = {
    ...o,
    component: u,
    invisible: d
  }, M = ZE(k), N = {
    transition: C,
    root: f.Root,
    ...w
  }, x = {
    ...m,
    ...g
  }, P = {
    slots: N,
    slotProps: x
  }, [E, $] = vn("root", {
    elementType: eP,
    externalForwardedProps: P,
    className: Re(M.root, l),
    ownerState: k
  }), [A, I] = vn("transition", {
    elementType: JE,
    externalForwardedProps: P,
    ownerState: k
  });
  return /* @__PURE__ */ z.jsx(A, {
    in: p,
    timeout: S,
    ...b,
    ...I,
    children: /* @__PURE__ */ z.jsx(E, {
      "aria-hidden": !0,
      ...$,
      classes: M,
      ref: r,
      children: s
    })
  });
}), nP = Xe("MuiBox", ["root"]), rP = ea(), Yn = Sk({
  themeId: qn,
  defaultTheme: rP,
  defaultClassName: nP.root,
  generateClassName: mS.generate
});
function iP(e) {
  return pt("MuiButton", e);
}
const pi = Xe("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), oP = /* @__PURE__ */ _.createContext({}), sP = /* @__PURE__ */ _.createContext(void 0), aP = (e) => {
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
  }, m = wt(f, iP, p);
  return {
    ...p,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...m
  };
}, GS = [{
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
}], lP = Me(Qu, {
  shouldForwardProp: (e) => bo(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`${r.variant}${Pe(r.color)}`], t[`size${Pe(r.size)}`], t[`${r.variant}Size${Pe(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth, r.loading && t.loading];
  }
})(Sn(({
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
    [`&.${pi.disabled}`]: {
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
        [`&.${pi.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${pi.disabled}`]: {
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
        [`&.${pi.disabled}`]: {
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
    }, ...Object.entries(e.palette).filter(Pi()).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        "--variant-textColor": (e.vars || e).palette[o].main,
        "--variant-outlinedColor": (e.vars || e).palette[o].main,
        "--variant-outlinedBorder": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / 0.5)` : Et(e.palette[o].main, 0.5),
        "--variant-containedColor": (e.vars || e).palette[o].contrastText,
        "--variant-containedBg": (e.vars || e).palette[o].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (e.vars || e).palette[o].dark,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette[o].main, e.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (e.vars || e).palette[o].main,
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette[o].main, e.palette.action.hoverOpacity)
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
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette.text.primary, e.palette.action.hoverOpacity),
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette.text.primary, e.palette.action.hoverOpacity)
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
        [`&.${pi.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${pi.disabled}`]: {
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
        [`&.${pi.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), uP = Me("span", {
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
  }, ...GS]
})), cP = Me("span", {
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
  }, ...GS]
})), dP = Me("span", {
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
})), uv = Me("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder",
  overridesResolver: (e, t) => t.loadingIconPlaceholder
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), Qr = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = _.useContext(oP), s = _.useContext(sP), l = du(o, t), u = ht({
    props: l,
    name: "MuiButton"
  }), {
    children: d,
    color: p = "primary",
    component: f = "button",
    className: m,
    disabled: g = !1,
    disableElevation: w = !1,
    disableFocusRipple: C = !1,
    endIcon: S,
    focusVisibleClassName: b,
    fullWidth: k = !1,
    id: M,
    loading: N = null,
    loadingIndicator: x,
    loadingPosition: P = "center",
    size: E = "medium",
    startIcon: $,
    type: A,
    variant: I = "text",
    ...L
  } = u, v = Hp(M), T = x ?? /* @__PURE__ */ z.jsx(KS, {
    "aria-labelledby": v,
    color: "inherit",
    size: 16
  }), O = {
    ...u,
    color: p,
    component: f,
    disabled: g,
    disableElevation: w,
    disableFocusRipple: C,
    fullWidth: k,
    loading: N,
    loadingIndicator: T,
    loadingPosition: P,
    size: E,
    type: A,
    variant: I
  }, F = aP(O), B = ($ || N && P === "start") && /* @__PURE__ */ z.jsx(uP, {
    className: F.startIcon,
    ownerState: O,
    children: $ || /* @__PURE__ */ z.jsx(uv, {
      className: F.loadingIconPlaceholder,
      ownerState: O
    })
  }), j = (S || N && P === "end") && /* @__PURE__ */ z.jsx(cP, {
    className: F.endIcon,
    ownerState: O,
    children: S || /* @__PURE__ */ z.jsx(uv, {
      className: F.loadingIconPlaceholder,
      ownerState: O
    })
  }), V = s || "", G = typeof N == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ z.jsx("span", {
      className: F.loadingWrapper,
      style: {
        display: "contents"
      },
      children: N && /* @__PURE__ */ z.jsx(dP, {
        className: F.loadingIndicator,
        ownerState: O,
        children: T
      })
    })
  ) : null;
  return /* @__PURE__ */ z.jsxs(lP, {
    ownerState: O,
    className: Re(o.className, F.root, m, V),
    component: f,
    disabled: g || N,
    focusRipple: !C,
    focusVisibleClassName: Re(F.focusVisible, b),
    ref: r,
    type: A,
    id: N ? v : M,
    ...L,
    classes: F,
    children: [B, P !== "end" && G, d, P === "end" && G, j]
  });
});
function fP(e) {
  return pt("MuiCard", e);
}
Xe("MuiCard", ["root"]);
const pP = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"]
  }, fP, t);
}, hP = Me(qS, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  overflow: "hidden"
}), Gu = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
  }, p = pP(d);
  return /* @__PURE__ */ z.jsx(hP, {
    className: Re(p.root, s),
    elevation: l ? 8 : void 0,
    ref: r,
    ownerState: d,
    ...u
  });
});
function gP(e) {
  return pt("PrivateSwitchBase", e);
}
Xe("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const mP = (e) => {
  const {
    classes: t,
    checked: r,
    disabled: o,
    edge: s
  } = e, l = {
    root: ["root", r && "checked", o && "disabled", s && `edge${Pe(s)}`],
    input: ["input"]
  };
  return wt(l, gP, t);
}, yP = Me(Qu, {
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
}), vP = Me("input", {
  name: "MuiSwitchBase",
  shouldForwardProp: bo
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
}), wP = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const {
    autoFocus: o,
    checked: s,
    checkedIcon: l,
    defaultChecked: u,
    disabled: d,
    disableFocusRipple: p = !1,
    edge: f = !1,
    icon: m,
    id: g,
    inputProps: w,
    inputRef: C,
    name: S,
    onBlur: b,
    onChange: k,
    onFocus: M,
    readOnly: N,
    required: x = !1,
    tabIndex: P,
    type: E,
    value: $,
    slots: A = {},
    slotProps: I = {},
    ...L
  } = t, [v, T] = Fk({
    controlled: s,
    default: !!u,
    name: "SwitchBase",
    state: "checked"
  }), O = QS(), F = (se) => {
    M && M(se), O && O.onFocus && O.onFocus(se);
  }, B = (se) => {
    b && b(se), O && O.onBlur && O.onBlur(se);
  }, j = (se) => {
    if (se.nativeEvent.defaultPrevented)
      return;
    const le = se.target.checked;
    T(le), k && k(se, le);
  };
  let V = d;
  O && typeof V > "u" && (V = O.disabled);
  const G = E === "checkbox" || E === "radio", U = {
    ...t,
    checked: v,
    disabled: V,
    disableFocusRipple: p,
    edge: f
  }, H = mP(U), K = {
    slots: A,
    slotProps: {
      input: w,
      ...I
    }
  }, [D, Y] = vn("root", {
    ref: r,
    elementType: yP,
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
  }), [ne, te] = vn("input", {
    ref: C,
    elementType: vP,
    className: H.input,
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
      disabled: V,
      id: G ? g : void 0,
      name: S,
      readOnly: N,
      required: x,
      tabIndex: P,
      type: E,
      ...E === "checkbox" && $ === void 0 ? {} : {
        value: $
      }
    }
  });
  return /* @__PURE__ */ z.jsxs(D, {
    ...Y,
    children: [/* @__PURE__ */ z.jsx(ne, {
      ...te
    }), v ? l : m]
  });
}), SP = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), bP = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), _P = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function xP(e) {
  return pt("MuiCheckbox", e);
}
const mf = Xe("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), kP = (e) => {
  const {
    classes: t,
    indeterminate: r,
    color: o,
    size: s
  } = e, l = {
    root: ["root", r && "indeterminate", `color${Pe(o)}`, `size${Pe(s)}`]
  }, u = wt(l, xP, t);
  return {
    ...t,
    // forward the disabled and checked classes to the SwitchBase
    ...u
  };
}, CP = Me(wP, {
  shouldForwardProp: (e) => bo(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.indeterminate && t.indeterminate, t[`size${Pe(r.size)}`], r.color !== "default" && t[`color${Pe(r.color)}`]];
  }
})(Sn(({
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
        backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette.action.active, e.palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
    props: {
      color: t,
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.vars ? `rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Et(e.palette[t].main, e.palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(e.palette).filter(Pi()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${mf.checked}, &.${mf.indeterminate}`]: {
        color: (e.vars || e).palette[t].main
      },
      [`&.${mf.disabled}`]: {
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
}))), EP = /* @__PURE__ */ z.jsx(bP, {}), PP = /* @__PURE__ */ z.jsx(SP, {}), RP = /* @__PURE__ */ z.jsx(_P, {}), TP = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: s = EP,
    color: l = "primary",
    icon: u = PP,
    indeterminate: d = !1,
    indeterminateIcon: p = RP,
    inputProps: f,
    size: m = "medium",
    disableRipple: g = !1,
    className: w,
    slots: C = {},
    slotProps: S = {},
    ...b
  } = o, k = d ? p : u, M = d ? p : s, N = {
    ...o,
    disableRipple: g,
    color: l,
    indeterminate: d,
    size: m
  }, x = kP(N), P = S.input ?? f, [E, $] = vn("root", {
    ref: r,
    elementType: CP,
    className: Re(x.root, w),
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      slots: C,
      slotProps: S,
      ...b
    },
    ownerState: N,
    additionalProps: {
      type: "checkbox",
      icon: /* @__PURE__ */ _.cloneElement(k, {
        fontSize: k.props.fontSize ?? m
      }),
      checkedIcon: /* @__PURE__ */ _.cloneElement(M, {
        fontSize: M.props.fontSize ?? m
      }),
      disableRipple: g,
      slots: C,
      slotProps: {
        input: zS(typeof P == "function" ? P(N) : P, {
          "data-indeterminate": d
        })
      }
    }
  });
  return /* @__PURE__ */ z.jsx(E, {
    ...$,
    classes: x
  });
}), ep = typeof jS({}) == "function", $P = (e, t) => ({
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
}), MP = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), YS = (e, t = !1) => {
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
    html: $P(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...MP(e),
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
}, eu = "mui-ecs", AP = (e) => {
  const t = YS(e, !1), r = Array.isArray(t) ? t[0] : t;
  return !e.vars && r && (r.html[`:root:has(${eu})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([o, s]) => {
    const l = e.getColorSchemeSelector(o);
    l.startsWith("@") ? r[l] = {
      [`:root:not(:has(.${eu}))`]: {
        colorScheme: s.palette?.mode
      }
    } : r[l.replace(/\s*&/, "")] = {
      [`&:not(:has(.${eu}))`]: {
        colorScheme: s.palette?.mode
      }
    };
  }), t;
}, IP = jS(ep ? ({
  theme: e,
  enableColorScheme: t
}) => YS(e, t) : ({
  theme: e
}) => AP(e));
function NP(e) {
  const t = ht({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: r,
    enableColorScheme: o = !1
  } = t;
  return /* @__PURE__ */ z.jsxs(_.Fragment, {
    children: [ep && /* @__PURE__ */ z.jsx(IP, {
      enableColorScheme: o
    }), !ep && !o && /* @__PURE__ */ z.jsx("span", {
      className: eu,
      style: {
        display: "none"
      }
    }), r]
  });
}
function OP(e) {
  const t = Gn(e);
  return t.body === e ? Ei(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Ps(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function cv(e) {
  return parseInt(Ei(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function LP(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), o = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || o;
}
function dv(e, t, r, o, s) {
  const l = [t, r, ...o];
  [].forEach.call(e.children, (u) => {
    const d = !l.includes(u), p = !LP(u);
    d && p && Ps(u, s);
  });
}
function yf(e, t) {
  let r = -1;
  return e.some((o, s) => t(o) ? (r = s, !0) : !1), r;
}
function DP(e, t) {
  const r = [], o = e.container;
  if (!t.disableScrollLock) {
    if (OP(o)) {
      const u = xS(Ei(o));
      r.push({
        value: o.style.paddingRight,
        property: "padding-right",
        el: o
      }), o.style.paddingRight = `${cv(o) + u}px`;
      const d = Gn(o).querySelectorAll(".mui-fixed");
      [].forEach.call(d, (p) => {
        r.push({
          value: p.style.paddingRight,
          property: "padding-right",
          el: p
        }), p.style.paddingRight = `${cv(p) + u}px`;
      });
    }
    let l;
    if (o.parentNode instanceof DocumentFragment)
      l = Gn(o).body;
    else {
      const u = o.parentElement, d = Ei(o);
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
function FP(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class jP {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, r) {
    let o = this.modals.indexOf(t);
    if (o !== -1)
      return o;
    o = this.modals.length, this.modals.push(t), t.modalRef && Ps(t.modalRef, !1);
    const s = FP(r);
    dv(r, t.mount, t.modalRef, s, !0);
    const l = yf(this.containers, (u) => u.container === r);
    return l !== -1 ? (this.containers[l].modals.push(t), o) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: s
    }), o);
  }
  mount(t, r) {
    const o = yf(this.containers, (l) => l.modals.includes(t)), s = this.containers[o];
    s.restore || (s.restore = DP(s, r));
  }
  remove(t, r = !0) {
    const o = this.modals.indexOf(t);
    if (o === -1)
      return o;
    const s = yf(this.containers, (u) => u.modals.includes(t)), l = this.containers[s];
    if (l.modals.splice(l.modals.indexOf(t), 1), this.modals.splice(o, 1), l.modals.length === 0)
      l.restore && l.restore(), t.modalRef && Ps(t.modalRef, r), dv(l.container, t.mount, t.modalRef, l.hiddenSiblings, !1), this.containers.splice(s, 1);
    else {
      const u = l.modals[l.modals.length - 1];
      u.modalRef && Ps(u.modalRef, !1);
    }
    return o;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
const zP = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function BP(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function WP(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (o) => e.ownerDocument.querySelector(`input[type="radio"]${o}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function UP(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || WP(e));
}
function VP(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(zP)).forEach((o, s) => {
    const l = BP(o);
    l === -1 || !UP(o) || (l === 0 ? t.push(o) : r.push({
      documentOrder: s,
      tabIndex: l,
      node: o
    }));
  }), r.sort((o, s) => o.tabIndex === s.tabIndex ? o.documentOrder - s.documentOrder : o.tabIndex - s.tabIndex).map((o) => o.node).concat(t);
}
function HP() {
  return !0;
}
function qP(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: o = !1,
    disableRestoreFocus: s = !1,
    getTabbable: l = VP,
    isEnabled: u = HP,
    open: d
  } = e, p = _.useRef(!1), f = _.useRef(null), m = _.useRef(null), g = _.useRef(null), w = _.useRef(null), C = _.useRef(!1), S = _.useRef(null), b = Nn(Ku(t), S), k = _.useRef(null);
  _.useEffect(() => {
    !d || !S.current || (C.current = !r);
  }, [r, d]), _.useEffect(() => {
    if (!d || !S.current)
      return;
    const x = Gn(S.current);
    return S.current.contains(x.activeElement) || (S.current.hasAttribute("tabIndex") || S.current.setAttribute("tabIndex", "-1"), C.current && S.current.focus()), () => {
      s || (g.current && g.current.focus && (p.current = !0, g.current.focus()), g.current = null);
    };
  }, [d]), _.useEffect(() => {
    if (!d || !S.current)
      return;
    const x = Gn(S.current), P = (A) => {
      k.current = A, !(o || !u() || A.key !== "Tab") && x.activeElement === S.current && A.shiftKey && (p.current = !0, m.current && m.current.focus());
    }, E = () => {
      const A = S.current;
      if (A === null)
        return;
      if (!x.hasFocus() || !u() || p.current) {
        p.current = !1;
        return;
      }
      if (A.contains(x.activeElement) || o && x.activeElement !== f.current && x.activeElement !== m.current)
        return;
      if (x.activeElement !== w.current)
        w.current = null;
      else if (w.current !== null)
        return;
      if (!C.current)
        return;
      let I = [];
      if ((x.activeElement === f.current || x.activeElement === m.current) && (I = l(S.current)), I.length > 0) {
        const L = !!(k.current?.shiftKey && k.current?.key === "Tab"), v = I[0], T = I[I.length - 1];
        typeof v != "string" && typeof T != "string" && (L ? T.focus() : v.focus());
      } else
        A.focus();
    };
    x.addEventListener("focusin", E), x.addEventListener("keydown", P, !0);
    const $ = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && E();
    }, 50);
    return () => {
      clearInterval($), x.removeEventListener("focusin", E), x.removeEventListener("keydown", P, !0);
    };
  }, [r, o, s, u, d, l]);
  const M = (x) => {
    g.current === null && (g.current = x.relatedTarget), C.current = !0, w.current = x.target;
    const P = t.props.onFocus;
    P && P(x);
  }, N = (x) => {
    g.current === null && (g.current = x.relatedTarget), C.current = !0;
  };
  return /* @__PURE__ */ z.jsxs(_.Fragment, {
    children: [/* @__PURE__ */ z.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ _.cloneElement(t, {
      ref: b,
      onFocus: M
    }), /* @__PURE__ */ z.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
function KP(e) {
  return typeof e == "function" ? e() : e;
}
function QP(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const fv = () => {
}, Pl = new jP();
function GP(e) {
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
    rootRef: m
  } = e, g = _.useRef({}), w = _.useRef(null), C = _.useRef(null), S = Nn(C, m), [b, k] = _.useState(!f), M = QP(d);
  let N = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (N = !1);
  const x = () => Gn(w.current), P = () => (g.current.modalRef = C.current, g.current.mount = w.current, g.current), E = () => {
    Pl.mount(P(), {
      disableScrollLock: o
    }), C.current && (C.current.scrollTop = 0);
  }, $ = po(() => {
    const j = KP(t) || x().body;
    Pl.add(P(), j), C.current && E();
  }), A = () => Pl.isTopModal(P()), I = po((j) => {
    w.current = j, j && (f && A() ? E() : C.current && Ps(C.current, N));
  }), L = _.useCallback(() => {
    Pl.remove(P(), N);
  }, [N]);
  _.useEffect(() => () => {
    L();
  }, [L]), _.useEffect(() => {
    f ? $() : (!M || !s) && L();
  }, [f, L, M, s, $]);
  const v = (j) => (V) => {
    j.onKeyDown?.(V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !A()) && (r || (V.stopPropagation(), p && p(V, "escapeKeyDown")));
  }, T = (j) => (V) => {
    j.onClick?.(V), V.target === V.currentTarget && p && p(V, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const V = CS(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const G = {
        ...V,
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
        ...G,
        onKeyDown: v(G),
        ref: S
      };
    },
    getBackdropProps: (j = {}) => {
      const V = j;
      return {
        "aria-hidden": !0,
        ...V,
        onClick: T(V),
        open: f
      };
    },
    getTransitionProps: () => {
      const j = () => {
        k(!1), l && l();
      }, V = () => {
        k(!0), u && u(), s && L();
      };
      return {
        onEnter: Fy(j, d?.props.onEnter ?? fv),
        onExited: Fy(V, d?.props.onExited ?? fv)
      };
    },
    rootRef: S,
    portalRef: I,
    isTopModal: A,
    exited: b,
    hasTransition: M
  };
}
function YP(e) {
  return pt("MuiModal", e);
}
Xe("MuiModal", ["root", "hidden", "backdrop"]);
const JP = (e) => {
  const {
    open: t,
    exited: r,
    classes: o
  } = e;
  return wt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, YP, o);
}, XP = Me("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.open && r.exited && t.hidden];
  }
})(Sn(({
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
}))), ZP = Me(tP, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), eR = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = ht({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: s = ZP,
    BackdropProps: l,
    classes: u,
    className: d,
    closeAfterTransition: p = !1,
    children: f,
    container: m,
    component: g,
    components: w = {},
    componentsProps: C = {},
    disableAutoFocus: S = !1,
    disableEnforceFocus: b = !1,
    disableEscapeKeyDown: k = !1,
    disablePortal: M = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: x = !1,
    hideBackdrop: P = !1,
    keepMounted: E = !1,
    onBackdropClick: $,
    onClose: A,
    onTransitionEnter: I,
    onTransitionExited: L,
    open: v,
    slotProps: T = {},
    slots: O = {},
    // eslint-disable-next-line react/prop-types
    theme: F,
    ...B
  } = o, j = {
    ...o,
    closeAfterTransition: p,
    disableAutoFocus: S,
    disableEnforceFocus: b,
    disableEscapeKeyDown: k,
    disablePortal: M,
    disableRestoreFocus: N,
    disableScrollLock: x,
    hideBackdrop: P,
    keepMounted: E
  }, {
    getRootProps: V,
    getBackdropProps: G,
    getTransitionProps: U,
    portalRef: H,
    isTopModal: K,
    exited: D,
    hasTransition: Y
  } = GP({
    ...j,
    rootRef: r
  }), ne = {
    ...j,
    exited: D
  }, te = JP(ne), se = {};
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
      ...C,
      ...T
    }
  }, [de, he] = vn("root", {
    ref: r,
    elementType: XP,
    externalForwardedProps: {
      ...le,
      ...B,
      component: g
    },
    getSlotProps: V,
    ownerState: ne,
    className: Re(d, te?.root, !ne.open && ne.exited && te?.hidden)
  }), [fe, ue] = vn("backdrop", {
    ref: l?.ref,
    elementType: s,
    externalForwardedProps: le,
    shouldForwardComponentProp: !0,
    additionalProps: l,
    getSlotProps: (we) => G({
      ...we,
      onClick: (_e) => {
        $ && $(_e), we?.onClick && we.onClick(_e);
      }
    }),
    className: Re(l?.className, te?.backdrop),
    ownerState: ne
  });
  return !E && !v && (!Y || D) ? null : /* @__PURE__ */ z.jsx(qE, {
    ref: H,
    container: m,
    disablePortal: M,
    children: /* @__PURE__ */ z.jsxs(de, {
      ...he,
      children: [!P && s ? /* @__PURE__ */ z.jsx(fe, {
        ...ue
      }) : null, /* @__PURE__ */ z.jsx(qP, {
        disableEnforceFocus: b,
        disableAutoFocus: S,
        disableRestoreFocus: N,
        isEnabled: K,
        open: v,
        children: /* @__PURE__ */ _.cloneElement(f, se)
      })]
    })
  });
}), pv = Xe("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function tR(e) {
  return pt("MuiFormGroup", e);
}
Xe("MuiFormGroup", ["root", "row", "error"]);
const nR = (e) => {
  const {
    classes: t,
    row: r,
    error: o
  } = e;
  return wt({
    root: ["root", r && "row", o && "error"]
  }, tR, t);
}, rR = Me("div", {
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
}), iR = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const o = ht({
    props: t,
    name: "MuiFormGroup"
  }), {
    className: s,
    row: l = !1,
    ...u
  } = o, d = QS(), p = QE({
    props: o,
    muiFormControl: d,
    states: ["error"]
  }), f = {
    ...o,
    row: l,
    error: p.error
  }, m = nR(f);
  return /* @__PURE__ */ z.jsx(rR, {
    className: Re(m.root, s),
    ownerState: f,
    ref: r,
    ...u
  });
});
function tp(e) {
  return `scale(${e}, ${e ** 2})`;
}
const oR = {
  entering: {
    opacity: 1,
    transform: tp(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, vf = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), np = /* @__PURE__ */ _.forwardRef(function(t, r) {
  const {
    addEndListener: o,
    appear: s = !0,
    children: l,
    easing: u,
    in: d,
    onEnter: p,
    onEntered: f,
    onEntering: m,
    onExit: g,
    onExited: w,
    onExiting: C,
    style: S,
    timeout: b = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: k = Jn,
    ...M
  } = t, N = _S(), x = _.useRef(), P = Xp(), E = _.useRef(null), $ = Nn(E, Ku(l), r), A = (j) => (V) => {
    if (j) {
      const G = E.current;
      V === void 0 ? j(G) : j(G, V);
    }
  }, I = A(m), L = A((j, V) => {
    HS(j);
    const {
      duration: G,
      delay: U,
      easing: H
    } = pu({
      style: S,
      timeout: b,
      easing: u
    }, {
      mode: "enter"
    });
    let K;
    b === "auto" ? (K = P.transitions.getAutoHeightDuration(j.clientHeight), x.current = K) : K = G, j.style.transition = [P.transitions.create("opacity", {
      duration: K,
      delay: U
    }), P.transitions.create("transform", {
      duration: vf ? K : K * 0.666,
      delay: U,
      easing: H
    })].join(","), p && p(j, V);
  }), v = A(f), T = A(C), O = A((j) => {
    const {
      duration: V,
      delay: G,
      easing: U
    } = pu({
      style: S,
      timeout: b,
      easing: u
    }, {
      mode: "exit"
    });
    let H;
    b === "auto" ? (H = P.transitions.getAutoHeightDuration(j.clientHeight), x.current = H) : H = V, j.style.transition = [P.transitions.create("opacity", {
      duration: H,
      delay: G
    }), P.transitions.create("transform", {
      duration: vf ? H : H * 0.666,
      delay: vf ? G : G || H * 0.333,
      easing: U
    })].join(","), j.style.opacity = 0, j.style.transform = tp(0.75), g && g(j);
  }), F = A(w), B = (j) => {
    b === "auto" && N.start(x.current || 0, j), o && o(E.current, j);
  };
  return /* @__PURE__ */ z.jsx(k, {
    appear: s,
    in: d,
    nodeRef: E,
    onEnter: L,
    onEntered: v,
    onEntering: I,
    onExit: O,
    onExited: F,
    onExiting: T,
    addEndListener: B,
    timeout: b === "auto" ? null : b,
    ...M,
    children: (j, {
      ownerState: V,
      ...G
    }) => /* @__PURE__ */ _.cloneElement(l, {
      style: {
        opacity: 0,
        transform: tp(0.75),
        visibility: j === "exited" && !d ? "hidden" : void 0,
        ...oR[j],
        ...S,
        ...l.props.style
      },
      ref: $,
      ...G
    })
  });
});
np && (np.muiSupportAuto = !0);
const rp = /* @__PURE__ */ _.createContext({});
function sR(e) {
  return pt("MuiList", e);
}
Xe("MuiList", ["root", "padding", "dense", "subheader"]);
const aR = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: o,
    subheader: s
  } = e;
  return wt({
    root: ["root", !r && "padding", o && "dense", s && "subheader"]
  }, sR, t);
}, lR = Me("ul", {
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
}), uR = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    ...m
  } = o, g = _.useMemo(() => ({
    dense: d
  }), [d]), w = {
    ...o,
    component: u,
    dense: d,
    disablePadding: p
  }, C = aR(w);
  return /* @__PURE__ */ z.jsx(rp.Provider, {
    value: g,
    children: /* @__PURE__ */ z.jsxs(lR, {
      as: u,
      className: Re(C.root, l),
      ref: r,
      ownerState: w,
      ...m,
      children: [f, s]
    })
  });
}), hv = Xe("MuiListItemIcon", ["root", "alignItemsFlexStart"]), gv = Xe("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
function wf(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function mv(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function JS(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.startsWith(t.keys.join(""));
}
function fs(e, t, r, o, s, l) {
  let u = !1, d = s(e, t, t ? r : !1);
  for (; d; ) {
    if (d === e.firstChild) {
      if (u)
        return !1;
      u = !0;
    }
    const p = o ? !1 : d.disabled || d.getAttribute("aria-disabled") === "true";
    if (!d.hasAttribute("tabindex") || !JS(d, l) || p)
      d = s(e, d, r);
    else
      return d.focus(), !0;
  }
  return !1;
}
const cR = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    onKeyDown: m,
    variant: g = "selectedMenu",
    ...w
  } = t, C = _.useRef(null), S = _.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Ci(() => {
    s && C.current.focus();
  }, [s]), _.useImperativeHandle(o, () => ({
    adjustStyleForScrollbar: (x, {
      direction: P
    }) => {
      const E = !C.current.style.width;
      if (x.clientHeight < C.current.clientHeight && E) {
        const $ = `${xS(Ei(x))}px`;
        C.current.style[P === "rtl" ? "paddingLeft" : "paddingRight"] = $, C.current.style.width = `calc(100% + ${$})`;
      }
      return C.current;
    }
  }), []);
  const b = (x) => {
    const P = C.current, E = x.key;
    if (x.ctrlKey || x.metaKey || x.altKey) {
      m && m(x);
      return;
    }
    const A = Gn(P).activeElement;
    if (E === "ArrowDown")
      x.preventDefault(), fs(P, A, f, p, wf);
    else if (E === "ArrowUp")
      x.preventDefault(), fs(P, A, f, p, mv);
    else if (E === "Home")
      x.preventDefault(), fs(P, null, f, p, wf);
    else if (E === "End")
      x.preventDefault(), fs(P, null, f, p, mv);
    else if (E.length === 1) {
      const I = S.current, L = E.toLowerCase(), v = performance.now();
      I.keys.length > 0 && (v - I.lastTime > 500 ? (I.keys = [], I.repeating = !0, I.previousKeyMatched = !0) : I.repeating && L !== I.keys[0] && (I.repeating = !1)), I.lastTime = v, I.keys.push(L);
      const T = A && !I.repeating && JS(A, I);
      I.previousKeyMatched && (T || fs(P, A, !1, p, wf, I)) ? x.preventDefault() : I.previousKeyMatched = !1;
    }
    m && m(x);
  }, k = Nn(C, r);
  let M = -1;
  _.Children.forEach(u, (x, P) => {
    if (!/* @__PURE__ */ _.isValidElement(x)) {
      M === P && (M += 1, M >= u.length && (M = -1));
      return;
    }
    x.props.disabled || (g === "selectedMenu" && x.props.selected || M === -1) && (M = P), M === P && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (M += 1, M >= u.length && (M = -1));
  });
  const N = _.Children.map(u, (x, P) => {
    if (P === M) {
      const E = {};
      return l && (E.autoFocus = !0), x.props.tabIndex === void 0 && g === "selectedMenu" && (E.tabIndex = 0), /* @__PURE__ */ _.cloneElement(x, E);
    }
    return x;
  });
  return /* @__PURE__ */ z.jsx(uR, {
    role: "menu",
    ref: k,
    className: d,
    onKeyDown: b,
    tabIndex: s ? 0 : -1,
    ...w,
    children: N
  });
});
function dR(e) {
  return pt("MuiPopover", e);
}
Xe("MuiPopover", ["root", "paper"]);
function yv(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function vv(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function wv(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Rl(e) {
  return typeof e == "function" ? e() : e;
}
const fR = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"],
    paper: ["paper"]
  }, dR, t);
}, pR = Me(eR, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), XS = Me(qS, {
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
}), hR = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    className: m,
    container: g,
    elevation: w = 8,
    marginThreshold: C = 16,
    open: S,
    PaperProps: b = {},
    // TODO: remove in v7
    slots: k = {},
    slotProps: M = {},
    transformOrigin: N = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: x,
    // TODO: remove in v7
    transitionDuration: P = "auto",
    TransitionProps: E = {},
    // TODO: remove in v7
    disableScrollLock: $ = !1,
    ...A
  } = o, I = _.useRef(), L = {
    ...o,
    anchorOrigin: u,
    anchorReference: p,
    elevation: w,
    marginThreshold: C,
    transformOrigin: N,
    TransitionComponent: x,
    transitionDuration: P,
    TransitionProps: E
  }, v = fR(L), T = _.useCallback(() => {
    if (p === "anchorPosition")
      return d;
    const ue = Rl(l), _e = (ue && ue.nodeType === 1 ? ue : Gn(I.current).body).getBoundingClientRect();
    return {
      top: _e.top + yv(_e, u.vertical),
      left: _e.left + vv(_e, u.horizontal)
    };
  }, [l, u.horizontal, u.vertical, d, p]), O = _.useCallback((ue) => ({
    vertical: yv(ue, N.vertical),
    horizontal: vv(ue, N.horizontal)
  }), [N.horizontal, N.vertical]), F = _.useCallback((ue) => {
    const we = {
      width: ue.offsetWidth,
      height: ue.offsetHeight
    }, _e = O(we);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: wv(_e)
      };
    const qe = T();
    let je = qe.top - _e.vertical, st = qe.left - _e.horizontal;
    const ut = je + we.height, Ze = st + we.width, De = Ei(Rl(l)), Rt = De.innerHeight - C, ct = De.innerWidth - C;
    if (C !== null && je < C) {
      const Ue = je - C;
      je -= Ue, _e.vertical += Ue;
    } else if (C !== null && ut > Rt) {
      const Ue = ut - Rt;
      je -= Ue, _e.vertical += Ue;
    }
    if (C !== null && st < C) {
      const Ue = st - C;
      st -= Ue, _e.horizontal += Ue;
    } else if (Ze > ct) {
      const Ue = Ze - ct;
      st -= Ue, _e.horizontal += Ue;
    }
    return {
      top: `${Math.round(je)}px`,
      left: `${Math.round(st)}px`,
      transformOrigin: wv(_e)
    };
  }, [l, p, T, O, C]), [B, j] = _.useState(S), V = _.useCallback(() => {
    const ue = I.current;
    if (!ue)
      return;
    const we = F(ue);
    we.top !== null && ue.style.setProperty("top", we.top), we.left !== null && (ue.style.left = we.left), ue.style.transformOrigin = we.transformOrigin, j(!0);
  }, [F]);
  _.useEffect(() => ($ && window.addEventListener("scroll", V), () => window.removeEventListener("scroll", V)), [l, $, V]);
  const G = () => {
    V();
  }, U = () => {
    j(!1);
  };
  _.useEffect(() => {
    S && V();
  }), _.useImperativeHandle(s, () => S ? {
    updatePosition: () => {
      V();
    }
  } : null, [S, V]), _.useEffect(() => {
    if (!S)
      return;
    const ue = Ok(() => {
      V();
    }), we = Ei(Rl(l));
    return we.addEventListener("resize", ue), () => {
      ue.clear(), we.removeEventListener("resize", ue);
    };
  }, [l, S, V]);
  let H = P;
  const K = {
    slots: {
      transition: x,
      ...k
    },
    slotProps: {
      transition: E,
      paper: b,
      ...M
    }
  }, [D, Y] = vn("transition", {
    elementType: np,
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
  P === "auto" && !D.muiSupportAuto && (H = void 0);
  const ne = g || (l ? Gn(Rl(l)).body : void 0), [te, {
    slots: se,
    slotProps: le,
    ...de
  }] = vn("root", {
    ref: r,
    elementType: pR,
    externalForwardedProps: {
      ...K,
      ...A
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: k.backdrop
      },
      slotProps: {
        backdrop: zS(typeof M.backdrop == "function" ? M.backdrop(L) : M.backdrop, {
          invisible: !0
        })
      },
      container: ne,
      open: S
    },
    ownerState: L,
    className: Re(v.root, m)
  }), [he, fe] = vn("paper", {
    ref: I,
    className: v.paper,
    elementType: XS,
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
  return /* @__PURE__ */ z.jsx(te, {
    ...de,
    ...!KE(te) && {
      slots: se,
      slotProps: le,
      disableScrollLock: $
    },
    children: /* @__PURE__ */ z.jsx(D, {
      ...Y,
      timeout: H,
      children: /* @__PURE__ */ z.jsx(he, {
        ...fe,
        children: f
      })
    })
  });
});
function gR(e) {
  return pt("MuiMenu", e);
}
Xe("MuiMenu", ["root", "paper", "list"]);
const mR = {
  vertical: "top",
  horizontal: "right"
}, yR = {
  vertical: "top",
  horizontal: "left"
}, vR = (e) => {
  const {
    classes: t
  } = e;
  return wt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, gR, t);
}, wR = Me(hR, {
  shouldForwardProp: (e) => bo(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), SR = Me(XS, {
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
}), bR = Me(cR, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), _R = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    open: m,
    PaperProps: g = {},
    PopoverClasses: w,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: S,
      ...b
    } = {},
    variant: k = "selectedMenu",
    slots: M = {},
    slotProps: N = {},
    ...x
  } = o, P = Qk(), E = {
    ...o,
    autoFocus: s,
    disableAutoFocusItem: d,
    MenuListProps: p,
    onEntering: S,
    PaperProps: g,
    transitionDuration: C,
    TransitionProps: b,
    variant: k
  }, $ = vR(E), A = s && !d && m, I = _.useRef(null), L = (H, K) => {
    I.current && I.current.adjustStyleForScrollbar(H, {
      direction: P ? "rtl" : "ltr"
    }), S && S(H, K);
  }, v = (H) => {
    H.key === "Tab" && (H.preventDefault(), f && f(H, "tabKeyDown"));
  };
  let T = -1;
  _.Children.map(l, (H, K) => {
    /* @__PURE__ */ _.isValidElement(H) && (H.props.disabled || (k === "selectedMenu" && H.props.selected || T === -1) && (T = K));
  });
  const O = {
    slots: M,
    slotProps: {
      list: p,
      transition: b,
      paper: g,
      ...N
    }
  }, F = Wk({
    elementType: M.root,
    externalSlotProps: N.root,
    ownerState: E,
    className: [$.root, u]
  }), [B, j] = vn("paper", {
    className: $.paper,
    elementType: SR,
    externalForwardedProps: O,
    shouldForwardComponentProp: !0,
    ownerState: E
  }), [V, G] = vn("list", {
    className: Re($.list, p.className),
    elementType: bR,
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
  return /* @__PURE__ */ z.jsx(wR, {
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? mR : yR,
    slots: {
      root: M.root,
      paper: B,
      backdrop: M.backdrop,
      ...M.transition && {
        // TODO: pass `slots.transition` directly once `TransitionComponent` is removed from Popover
        transition: M.transition
      }
    },
    slotProps: {
      root: F,
      paper: j,
      backdrop: typeof N.backdrop == "function" ? N.backdrop(E) : N.backdrop,
      transition: {
        ...U,
        onEntering: (...H) => {
          L(...H), U?.onEntering?.(...H);
        }
      }
    },
    open: m,
    ref: r,
    transitionDuration: C,
    ownerState: E,
    ...x,
    classes: w,
    children: /* @__PURE__ */ z.jsx(V, {
      actions: I,
      autoFocus: s && (T === -1 || d),
      autoFocusItem: A,
      variant: k,
      ...G,
      children: l
    })
  });
});
function xR(e) {
  return pt("MuiMenuItem", e);
}
const ps = Xe("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), kR = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.divider && t.divider, !r.disableGutters && t.gutters];
}, CR = (e) => {
  const {
    disabled: t,
    dense: r,
    divider: o,
    disableGutters: s,
    selected: l,
    classes: u
  } = e, p = wt({
    root: ["root", r && "dense", t && "disabled", !s && "gutters", o && "divider", l && "selected"]
  }, xR, u);
  return {
    ...u,
    ...p
  };
}, ER = Me(Qu, {
  shouldForwardProp: (e) => bo(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: kR
})(Sn(({
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
  [`&.${ps.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Et(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${ps.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Et(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${ps.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Et(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Et(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${ps.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${ps.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${pv.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${pv.inset}`]: {
    marginLeft: 52
  },
  [`& .${gv.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${gv.inset}`]: {
    paddingLeft: 36
  },
  [`& .${hv.root}`]: {
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
      [`& .${hv.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), PR = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    role: m = "menuitem",
    tabIndex: g,
    className: w,
    ...C
  } = o, S = _.useContext(rp), b = _.useMemo(() => ({
    dense: u || S.dense || !1,
    disableGutters: p
  }), [S.dense, u, p]), k = _.useRef(null);
  Ci(() => {
    s && k.current && k.current.focus();
  }, [s]);
  const M = {
    ...o,
    dense: b.dense,
    divider: d,
    disableGutters: p
  }, N = CR(o), x = Nn(k, r);
  let P;
  return o.disabled || (P = g !== void 0 ? g : -1), /* @__PURE__ */ z.jsx(rp.Provider, {
    value: b,
    children: /* @__PURE__ */ z.jsx(ER, {
      ref: x,
      role: m,
      tabIndex: P,
      component: l,
      focusVisibleClassName: Re(N.focusVisible, f),
      className: Re(N.root, w),
      ...C,
      ownerState: M,
      classes: N
    })
  });
});
function RR(e) {
  return pt("MuiSkeleton", e);
}
Xe("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]);
const TR = (e) => {
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
  }, RR, t);
}, ip = Mi`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`, op = Mi`
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
`, $R = typeof ip != "string" ? Ys`
        animation: ${ip} 2s ease-in-out 0.5s infinite;
      ` : null, MR = typeof op != "string" ? Ys`
        &::after {
          animation: ${op} 2s linear 0.5s infinite;
        }
      ` : null, AR = Me("span", {
  name: "MuiSkeleton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], r.animation !== !1 && t[r.animation], r.hasChildren && t.withChildren, r.hasChildren && !r.width && t.fitContent, r.hasChildren && !r.height && t.heightAuto];
  }
})(Sn(({
  theme: e
}) => {
  const t = WC(e.shape.borderRadius) || "px", r = UC(e.shape.borderRadius);
  return {
    display: "block",
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: e.vars ? e.vars.palette.Skeleton.bg : Et(e.palette.text.primary, e.palette.mode === "light" ? 0.11 : 0.13),
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
      style: $R || {
        animation: `${ip} 2s ease-in-out 0.5s infinite`
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
      style: MR || {
        "&::after": {
          animation: `${op} 2s linear 0.5s infinite`
        }
      }
    }]
  };
})), IR = /* @__PURE__ */ _.forwardRef(function(t, r) {
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
    width: m,
    ...g
  } = o, w = {
    ...o,
    animation: s,
    component: u,
    variant: f,
    hasChildren: !!g.children
  }, C = TR(w);
  return /* @__PURE__ */ z.jsx(AR, {
    as: u,
    ref: r,
    className: Re(C.root, l),
    ownerState: w,
    ...g,
    style: {
      width: m,
      height: d,
      ...p
    }
  });
});
var Tl = {}, Sv;
function NR() {
  if (Sv) return Tl;
  Sv = 1;
  var e = US();
  return Tl.createRoot = e.createRoot, Tl.hydrateRoot = e.hydrateRoot, Tl;
}
var OR = NR();
const LR = /* @__PURE__ */ Xr(OR);
var bv = "popstate";
function _v(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function DR(e = {}) {
  function t(o, s) {
    let l = s.state?.masked, { pathname: u, search: d, hash: p } = l || o.location;
    return sp(
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
    return typeof s == "string" ? s : Fs(s);
  }
  return jR(
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
function On(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function FR() {
  return Math.random().toString(36).substring(2, 10);
}
function xv(e, t) {
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
function sp(e, t, r = null, o, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof t == "string" ? _o(t) : t,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || o || FR(),
    unstable_mask: s
  };
}
function Fs({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function _o(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let o = e.indexOf("?");
    o >= 0 && (t.search = e.substring(o), e = e.substring(0, o)), e && (t.pathname = e);
  }
  return t;
}
function jR(e, t, r, o = {}) {
  let { window: s = document.defaultView, v5Compat: l = !1 } = o, u = s.history, d = "POP", p = null, f = m();
  f == null && (f = 0, u.replaceState({ ...u.state, idx: f }, ""));
  function m() {
    return (u.state || { idx: null }).idx;
  }
  function g() {
    d = "POP";
    let k = m(), M = k == null ? null : k - f;
    f = k, p && p({ action: d, location: b.location, delta: M });
  }
  function w(k, M) {
    d = "PUSH";
    let N = _v(k) ? k : sp(b.location, k, M);
    f = m() + 1;
    let x = xv(N, f), P = b.createHref(N.unstable_mask || N);
    try {
      u.pushState(x, "", P);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError")
        throw E;
      s.location.assign(P);
    }
    l && p && p({ action: d, location: b.location, delta: 1 });
  }
  function C(k, M) {
    d = "REPLACE";
    let N = _v(k) ? k : sp(b.location, k, M);
    f = m();
    let x = xv(N, f), P = b.createHref(N.unstable_mask || N);
    u.replaceState(x, "", P), l && p && p({ action: d, location: b.location, delta: 0 });
  }
  function S(k) {
    return zR(k);
  }
  let b = {
    get action() {
      return d;
    },
    get location() {
      return e(s, u);
    },
    listen(k) {
      if (p)
        throw new Error("A history only accepts one active listener");
      return s.addEventListener(bv, g), p = k, () => {
        s.removeEventListener(bv, g), p = null;
      };
    },
    createHref(k) {
      return t(s, k);
    },
    createURL: S,
    encodeLocation(k) {
      let M = S(k);
      return {
        pathname: M.pathname,
        search: M.search,
        hash: M.hash
      };
    },
    push: w,
    replace: C,
    go(k) {
      return u.go(k);
    }
  };
  return b;
}
function zR(e, t = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), Je(r, "No window.location.(origin|href) available to create URL");
  let o = typeof e == "string" ? e : Fs(e);
  return o = o.replace(/ $/, "%20"), !t && o.startsWith("//") && (o = r + o), new URL(o, r);
}
function ZS(e, t, r = "/") {
  return BR(e, t, r, !1);
}
function BR(e, t, r, o) {
  let s = typeof t == "string" ? _o(t) : t, l = mr(s.pathname || "/", r);
  if (l == null)
    return null;
  let u = e0(e);
  WR(u);
  let d = null;
  for (let p = 0; d == null && p < u.length; ++p) {
    let f = ZR(l);
    d = JR(
      u[p],
      f,
      o
    );
  }
  return d;
}
function e0(e, t = [], r = [], o = "", s = !1) {
  let l = (u, d, p = s, f) => {
    let m = {
      relativePath: f === void 0 ? u.path || "" : f,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: d,
      route: u
    };
    if (m.relativePath.startsWith("/")) {
      if (!m.relativePath.startsWith(o) && p)
        return;
      Je(
        m.relativePath.startsWith(o),
        `Absolute route path "${m.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), m.relativePath = m.relativePath.slice(o.length);
    }
    let g = An([o, m.relativePath]), w = r.concat(m);
    u.children && u.children.length > 0 && (Je(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      u.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), e0(
      u.children,
      t,
      w,
      g,
      p
    )), !(u.path == null && !u.index) && t.push({
      path: g,
      score: GR(g, u.index),
      routesMeta: w
    });
  };
  return e.forEach((u, d) => {
    if (u.path === "" || !u.path?.includes("?"))
      l(u, d);
    else
      for (let p of t0(u.path))
        l(u, d, !0, p);
  }), t;
}
function t0(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...o] = t, s = r.endsWith("?"), l = r.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [l, ""] : [l];
  let u = t0(o.join("/")), d = [];
  return d.push(
    ...u.map(
      (p) => p === "" ? l : [l, p].join("/")
    )
  ), s && d.push(...u), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function WR(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : YR(
      t.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var UR = /^:[\w-]+$/, VR = 3, HR = 2, qR = 1, KR = 10, QR = -2, kv = (e) => e === "*";
function GR(e, t) {
  let r = e.split("/"), o = r.length;
  return r.some(kv) && (o += QR), t && (o += HR), r.filter((s) => !kv(s)).reduce(
    (s, l) => s + (UR.test(l) ? VR : l === "" ? qR : KR),
    o
  );
}
function YR(e, t) {
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
function JR(e, t, r = !1) {
  let { routesMeta: o } = e, s = {}, l = "/", u = [];
  for (let d = 0; d < o.length; ++d) {
    let p = o[d], f = d === o.length - 1, m = l === "/" ? t : t.slice(l.length) || "/", g = mu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: f },
      m
    ), w = p.route;
    if (!g && f && r && !o[o.length - 1].route.index && (g = mu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      m
    )), !g)
      return null;
    Object.assign(s, g.params), u.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: An([l, g.pathname]),
      pathnameBase: rT(
        An([l, g.pathnameBase])
      ),
      route: w
    }), g.pathnameBase !== "/" && (l = An([l, g.pathnameBase]));
  }
  return u;
}
function mu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, o] = XR(
    e.path,
    e.caseSensitive,
    e.end
  ), s = t.match(r);
  if (!s) return null;
  let l = s[0], u = l.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: o.reduce(
      (f, { paramName: m, isOptional: g }, w) => {
        if (m === "*") {
          let S = d[w] || "";
          u = l.slice(0, l.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const C = d[w];
        return g && !C ? f[m] = void 0 : f[m] = (C || "").replace(/%2F/g, "/"), f;
      },
      {}
    ),
    pathname: l,
    pathnameBase: u,
    pattern: e
  };
}
function XR(e, t = !1, r = !0) {
  On(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (u, d, p, f, m) => {
      if (o.push({ paramName: d, isOptional: p != null }), p) {
        let g = m.charAt(f + u.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (o.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), o];
}
function ZR(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return On(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function mr(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, o = e.charAt(r);
  return o && o !== "/" ? null : e.slice(r) || "/";
}
var eT = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function tT(e, t = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: s = ""
  } = typeof e == "string" ? _o(e) : e, l;
  return r ? (r = r0(r), r.startsWith("/") ? l = Cv(r.substring(1), "/") : l = Cv(r, t)) : l = t, {
    pathname: l,
    search: iT(o),
    hash: oT(s)
  };
}
function Cv(e, t) {
  let r = yu(t).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Sf(e, t, r, o) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function nT(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function n0(e) {
  let t = nT(e);
  return t.map(
    (r, o) => o === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function th(e, t, r, o = !1) {
  let s;
  typeof e == "string" ? s = _o(e) : (s = { ...e }, Je(
    !s.pathname || !s.pathname.includes("?"),
    Sf("?", "pathname", "search", s)
  ), Je(
    !s.pathname || !s.pathname.includes("#"),
    Sf("#", "pathname", "hash", s)
  ), Je(
    !s.search || !s.search.includes("#"),
    Sf("#", "search", "hash", s)
  ));
  let l = e === "" || s.pathname === "", u = l ? "/" : s.pathname, d;
  if (u == null)
    d = r;
  else {
    let g = t.length - 1;
    if (!o && u.startsWith("..")) {
      let w = u.split("/");
      for (; w[0] === ".."; )
        w.shift(), g -= 1;
      s.pathname = w.join("/");
    }
    d = g >= 0 ? t[g] : "/";
  }
  let p = tT(s, d), f = u && u !== "/" && u.endsWith("/"), m = (l || u === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (f || m) && (p.pathname += "/"), p;
}
var r0 = (e) => e.replace(/\/\/+/g, "/"), An = (e) => r0(e.join("/")), yu = (e) => e.replace(/\/+$/, ""), rT = (e) => yu(e).replace(/^\/*/, "/"), iT = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, oT = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, sT = class {
  constructor(e, t, r, o = !1) {
    this.status = e, this.statusText = t || "", this.internal = o, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function aT(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function lT(e) {
  let t = e.map((r) => r.route.path).filter(Boolean);
  return An(t) || "/";
}
var i0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function o0(e, t) {
  let r = e;
  if (typeof r != "string" || !eT.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let o = r, s = !1;
  if (i0)
    try {
      let l = new URL(window.location.href), u = r.startsWith("//") ? new URL(l.protocol + r) : new URL(r), d = mr(u.pathname, t);
      u.origin === l.origin && d != null ? r = d + u.search + u.hash : s = !0;
    } catch {
      On(
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
var s0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  s0
);
var uT = [
  "GET",
  ...s0
];
new Set(uT);
var xo = _.createContext(null);
xo.displayName = "DataRouter";
var Yu = _.createContext(null);
Yu.displayName = "DataRouterState";
var a0 = _.createContext(!1);
function cT() {
  return _.useContext(a0);
}
var l0 = _.createContext({
  isTransitioning: !1
});
l0.displayName = "ViewTransition";
var dT = _.createContext(
  /* @__PURE__ */ new Map()
);
dT.displayName = "Fetchers";
var fT = _.createContext(null);
fT.displayName = "Await";
var _n = _.createContext(
  null
);
_n.displayName = "Navigation";
var na = _.createContext(
  null
);
na.displayName = "Location";
var Xn = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Xn.displayName = "Route";
var nh = _.createContext(null);
nh.displayName = "RouteError";
var u0 = "REACT_ROUTER_ERROR", pT = "REDIRECT", hT = "ROUTE_ERROR_RESPONSE";
function gT(e) {
  if (e.startsWith(`${u0}:${pT}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.location == "string" && typeof t.reloadDocument == "boolean" && typeof t.replace == "boolean")
        return t;
    } catch {
    }
}
function mT(e) {
  if (e.startsWith(
    `${u0}:${hT}:{`
  ))
    try {
      let t = JSON.parse(e.slice(40));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string")
        return new sT(
          t.status,
          t.statusText,
          t.data
        );
    } catch {
    }
}
function yT(e, { relative: t } = {}) {
  Je(
    ra(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: o } = _.useContext(_n), { hash: s, pathname: l, search: u } = ia(e, { relative: t }), d = l;
  return r !== "/" && (d = l === "/" ? r : An([r, l])), o.createHref({ pathname: d, search: u, hash: s });
}
function ra() {
  return _.useContext(na) != null;
}
function Zn() {
  return Je(
    ra(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(na).location;
}
var c0 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function d0(e) {
  _.useContext(_n).static || _.useLayoutEffect(e);
}
function f0() {
  let { isDataRoute: e } = _.useContext(Xn);
  return e ? MT() : vT();
}
function vT() {
  Je(
    ra(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(xo), { basename: t, navigator: r } = _.useContext(_n), { matches: o } = _.useContext(Xn), { pathname: s } = Zn(), l = JSON.stringify(n0(o)), u = _.useRef(!1);
  return d0(() => {
    u.current = !0;
  }), _.useCallback(
    (p, f = {}) => {
      if (On(u.current, c0), !u.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let m = th(
        p,
        JSON.parse(l),
        s,
        f.relative === "path"
      );
      e == null && t !== "/" && (m.pathname = m.pathname === "/" ? t : An([t, m.pathname])), (f.replace ? r.replace : r.push)(
        m,
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
_.createContext(null);
function wT() {
  let { matches: e } = _.useContext(Xn);
  return e[e.length - 1]?.params ?? {};
}
function ia(e, { relative: t } = {}) {
  let { matches: r } = _.useContext(Xn), { pathname: o } = Zn(), s = JSON.stringify(n0(r));
  return _.useMemo(
    () => th(
      e,
      JSON.parse(s),
      o,
      t === "path"
    ),
    [e, s, o, t]
  );
}
function ST(e, t) {
  return p0(e, t);
}
function p0(e, t, r) {
  Je(
    ra(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = _.useContext(_n), { matches: s } = _.useContext(Xn), l = s[s.length - 1], u = l ? l.params : {}, d = l ? l.pathname : "/", p = l ? l.pathnameBase : "/", f = l && l.route;
  {
    let k = f && f.path || "";
    g0(
      d,
      !f || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k === "/" ? "*" : `${k}/*`}">.`
    );
  }
  let m = Zn(), g;
  if (t) {
    let k = typeof t == "string" ? _o(t) : t;
    Je(
      p === "/" || k.pathname?.startsWith(p),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${k.pathname}" was given in the \`location\` prop.`
    ), g = k;
  } else
    g = m;
  let w = g.pathname || "/", C = w;
  if (p !== "/") {
    let k = p.replace(/^\//, "").split("/");
    C = "/" + w.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let S = ZS(e, { pathname: C });
  On(
    f || S != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), On(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let b = CT(
    S && S.map(
      (k) => Object.assign({}, k, {
        params: Object.assign({}, u, k.params),
        pathname: An([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            k.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : k.pathname
        ]),
        pathnameBase: k.pathnameBase === "/" ? p : An([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            k.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : k.pathnameBase
        ])
      })
    ),
    s,
    r
  );
  return t && b ? /* @__PURE__ */ _.createElement(
    na.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          unstable_mask: void 0,
          ...g
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    b
  ) : b;
}
function bT() {
  let e = $T(), t = aT(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, l = { padding: "2px 4px", backgroundColor: o }, u = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), u = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: l }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: l }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, u);
}
var _T = /* @__PURE__ */ _.createElement(bT, null), h0 = class extends _.Component {
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
      const r = mT(e.digest);
      r && (e = r);
    }
    let t = e !== void 0 ? /* @__PURE__ */ _.createElement(Xn.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      nh.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(xT, { error: e }, t) : t;
  }
};
h0.contextType = a0;
var bf = /* @__PURE__ */ new WeakMap();
function xT({
  children: e,
  error: t
}) {
  let { basename: r } = _.useContext(_n);
  if (typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
    let o = gT(t.digest);
    if (o) {
      let s = bf.get(t);
      if (s) throw s;
      let l = o0(o.location, r);
      if (i0 && !bf.get(t))
        if (l.isExternal || o.reloadDocument)
          window.location.href = l.absoluteURL || l.to;
        else {
          const u = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(l.to, {
              replace: o.replace
            })
          );
          throw bf.set(t, u), u;
        }
      return /* @__PURE__ */ _.createElement(
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
function kT({ routeContext: e, match: t, children: r }) {
  let o = _.useContext(xo);
  return o && o.static && o.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ _.createElement(Xn.Provider, { value: e }, r);
}
function CT(e, t = [], r) {
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
    let m = s.findIndex(
      (g) => g.route.id && l?.[g.route.id] !== void 0
    );
    Je(
      m >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        l
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, m + 1)
    );
  }
  let u = !1, d = -1;
  if (r && o) {
    u = o.renderFallback;
    for (let m = 0; m < s.length; m++) {
      let g = s[m];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = m), g.route.id) {
        let { loaderData: w, errors: C } = o, S = g.route.loader && !w.hasOwnProperty(g.route.id) && (!C || C[g.route.id] === void 0);
        if (g.route.lazy || S) {
          r.isStatic && (u = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, f = o && p ? (m, g) => {
    p(m, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      unstable_pattern: lT(o.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (m, g, w) => {
      let C, S = !1, b = null, k = null;
      o && (C = l && g.route.id ? l[g.route.id] : void 0, b = g.route.errorElement || _T, u && (d < 0 && w === 0 ? (g0(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, k = null) : d === w && (S = !0, k = g.route.hydrateFallbackElement || null)));
      let M = t.concat(s.slice(0, w + 1)), N = () => {
        let x;
        return C ? x = b : S ? x = k : g.route.Component ? x = /* @__PURE__ */ _.createElement(g.route.Component, null) : g.route.element ? x = g.route.element : x = m, /* @__PURE__ */ _.createElement(
          kT,
          {
            match: g,
            routeContext: {
              outlet: m,
              matches: M,
              isDataRoute: o != null
            },
            children: x
          }
        );
      };
      return o && (g.route.ErrorBoundary || g.route.errorElement || w === 0) ? /* @__PURE__ */ _.createElement(
        h0,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: b,
          error: C,
          children: N(),
          routeContext: { outlet: null, matches: M, isDataRoute: !0 },
          onError: f
        }
      ) : N();
    },
    null
  );
}
function rh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ET(e) {
  let t = _.useContext(xo);
  return Je(t, rh(e)), t;
}
function PT(e) {
  let t = _.useContext(Yu);
  return Je(t, rh(e)), t;
}
function RT(e) {
  let t = _.useContext(Xn);
  return Je(t, rh(e)), t;
}
function ih(e) {
  let t = RT(e), r = t.matches[t.matches.length - 1];
  return Je(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function TT() {
  return ih(
    "useRouteId"
    /* UseRouteId */
  );
}
function $T() {
  let e = _.useContext(nh), t = PT(
    "useRouteError"
    /* UseRouteError */
  ), r = ih(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : t.errors?.[r];
}
function MT() {
  let { router: e } = ET(
    "useNavigate"
    /* UseNavigateStable */
  ), t = ih(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return d0(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, l = {}) => {
      On(r.current, c0), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: t, ...l }));
    },
    [e, t]
  );
}
var Ev = {};
function g0(e, t, r) {
  !t && !Ev[e] && (Ev[e] = !0, On(!1, r));
}
_.memo(AT);
function AT({
  routes: e,
  future: t,
  state: r,
  isStatic: o,
  onError: s
}) {
  return p0(e, void 0, { state: r, isStatic: o, onError: s });
}
function vi(e) {
  Je(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function IT({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: o = "POP",
  navigator: s,
  static: l = !1,
  unstable_useTransitions: u
}) {
  Je(
    !ra(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = _.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: l,
      unstable_useTransitions: u,
      future: {}
    }),
    [d, s, l, u]
  );
  typeof r == "string" && (r = _o(r));
  let {
    pathname: f = "/",
    search: m = "",
    hash: g = "",
    state: w = null,
    key: C = "default",
    unstable_mask: S
  } = r, b = _.useMemo(() => {
    let k = mr(f, d);
    return k == null ? null : {
      location: {
        pathname: k,
        search: m,
        hash: g,
        state: w,
        key: C,
        unstable_mask: S
      },
      navigationType: o
    };
  }, [
    d,
    f,
    m,
    g,
    w,
    C,
    o,
    S
  ]);
  return On(
    b != null,
    `<Router basename="${d}"> is not able to match the URL "${f}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), b == null ? null : /* @__PURE__ */ _.createElement(_n.Provider, { value: p }, /* @__PURE__ */ _.createElement(na.Provider, { children: t, value: b }));
}
function NT({
  children: e,
  location: t
}) {
  return ST(ap(e), t);
}
function ap(e, t = []) {
  let r = [];
  return _.Children.forEach(e, (o, s) => {
    if (!_.isValidElement(o))
      return;
    let l = [...t, s];
    if (o.type === _.Fragment) {
      r.push.apply(
        r,
        ap(o.props.children, l)
      );
      return;
    }
    Je(
      o.type === vi,
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
    o.props.children && (u.children = ap(
      o.props.children,
      l
    )), r.push(u);
  }), r;
}
var tu = "get", nu = "application/x-www-form-urlencoded";
function Ju(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function OT(e) {
  return Ju(e) && e.tagName.toLowerCase() === "button";
}
function LT(e) {
  return Ju(e) && e.tagName.toLowerCase() === "form";
}
function DT(e) {
  return Ju(e) && e.tagName.toLowerCase() === "input";
}
function FT(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jT(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !FT(e);
}
function lp(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
      let o = e[r];
      return t.concat(
        Array.isArray(o) ? o.map((s) => [r, s]) : [[r, o]]
      );
    }, [])
  );
}
function zT(e, t) {
  let r = lp(e);
  return t && t.forEach((o, s) => {
    r.has(s) || t.getAll(s).forEach((l) => {
      r.append(s, l);
    });
  }), r;
}
var $l = null;
function BT() {
  if ($l === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), $l = !1;
    } catch {
      $l = !0;
    }
  return $l;
}
var WT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function _f(e) {
  return e != null && !WT.has(e) ? (On(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${nu}"`
  ), null) : e;
}
function UT(e, t) {
  let r, o, s, l, u;
  if (LT(e)) {
    let d = e.getAttribute("action");
    o = d ? mr(d, t) : null, r = e.getAttribute("method") || tu, s = _f(e.getAttribute("enctype")) || nu, l = new FormData(e);
  } else if (OT(e) || DT(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (o = p ? mr(p, t) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || tu, s = _f(e.getAttribute("formenctype")) || _f(d.getAttribute("enctype")) || nu, l = new FormData(d, e), !BT()) {
      let { name: f, type: m, value: g } = e;
      if (m === "image") {
        let w = f ? `${f}.` : "";
        l.append(`${w}x`, "0"), l.append(`${w}y`, "0");
      } else f && l.append(f, g);
    }
  } else {
    if (Ju(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = tu, o = null, s = nu, u = e;
  }
  return l && s === "text/plain" && (u = l, l = void 0), { action: o, method: r.toLowerCase(), encType: s, formData: l, body: u };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function oh(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function m0(e, t, r, o) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : t && mr(s.pathname, t) === "/" ? s.pathname = `${yu(t)}/_root.${o}` : s.pathname = `${yu(s.pathname)}.${o}`, s;
}
async function VT(e, t) {
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
function HT(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function qT(e, t, r) {
  let o = await Promise.all(
    e.map(async (s) => {
      let l = t.routes[s.route.id];
      if (l) {
        let u = await VT(l, r);
        return u.links ? u.links() : [];
      }
      return [];
    })
  );
  return YT(
    o.flat(1).filter(HT).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Pv(e, t, r, o, s, l) {
  let u = (p, f) => r[f] ? p.route.id !== r[f].route.id : !0, d = (p, f) => (
    // param change, /users/123 -> /users/456
    r[f].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[f].route.path?.endsWith("*") && r[f].params["*"] !== p.params["*"]
  );
  return l === "assets" ? t.filter(
    (p, f) => u(p, f) || d(p, f)
  ) : l === "data" ? t.filter((p, f) => {
    let m = o.routes[p.route.id];
    if (!m || !m.hasLoader)
      return !1;
    if (u(p, f) || d(p, f))
      return !0;
    if (p.route.shouldRevalidate) {
      let g = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function KT(e, t, { includeHydrateFallback: r } = {}) {
  return QT(
    e.map((o) => {
      let s = t.routes[o.route.id];
      if (!s) return [];
      let l = [s.module];
      return s.clientActionModule && (l = l.concat(s.clientActionModule)), s.clientLoaderModule && (l = l.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (l = l.concat(s.hydrateFallbackModule)), s.imports && (l = l.concat(s.imports)), l;
    }).flat(1)
  );
}
function QT(e) {
  return [...new Set(e)];
}
function GT(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let o of r)
    t[o] = e[o];
  return t;
}
function YT(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((o, s) => {
    let l = JSON.stringify(GT(s));
    return r.has(l) || (r.add(l), o.push({ key: l, link: s })), o;
  }, []);
}
function sh() {
  let e = _.useContext(xo);
  return oh(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function JT() {
  let e = _.useContext(Yu);
  return oh(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var ah = _.createContext(void 0);
ah.displayName = "FrameworkContext";
function lh() {
  let e = _.useContext(ah);
  return oh(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function XT(e, t) {
  let r = _.useContext(ah), [o, s] = _.useState(!1), [l, u] = _.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: f, onMouseLeave: m, onTouchStart: g } = t, w = _.useRef(null);
  _.useEffect(() => {
    if (e === "render" && u(!0), e === "viewport") {
      let b = (M) => {
        M.forEach((N) => {
          u(N.isIntersecting);
        });
      }, k = new IntersectionObserver(b, { threshold: 0.5 });
      return w.current && k.observe(w.current), () => {
        k.disconnect();
      };
    }
  }, [e]), _.useEffect(() => {
    if (o) {
      let b = setTimeout(() => {
        u(!0);
      }, 100);
      return () => {
        clearTimeout(b);
      };
    }
  }, [o]);
  let C = () => {
    s(!0);
  }, S = () => {
    s(!1), u(!1);
  };
  return r ? e !== "intent" ? [l, w, {}] : [
    l,
    w,
    {
      onFocus: hs(d, C),
      onBlur: hs(p, S),
      onMouseEnter: hs(f, C),
      onMouseLeave: hs(m, S),
      onTouchStart: hs(g, C)
    }
  ] : [!1, w, {}];
}
function hs(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function ZT({ page: e, ...t }) {
  let r = cT(), { router: o } = sh(), s = _.useMemo(
    () => ZS(o.routes, e, o.basename),
    [o.routes, e, o.basename]
  );
  return s ? r ? /* @__PURE__ */ _.createElement(t$, { page: e, matches: s, ...t }) : /* @__PURE__ */ _.createElement(n$, { page: e, matches: s, ...t }) : null;
}
function e$(e) {
  let { manifest: t, routeModules: r } = lh(), [o, s] = _.useState([]);
  return _.useEffect(() => {
    let l = !1;
    return qT(e, t, r).then(
      (u) => {
        l || s(u);
      }
    ), () => {
      l = !0;
    };
  }, [e, t, r]), o;
}
function t$({
  page: e,
  matches: t,
  ...r
}) {
  let o = Zn(), { future: s } = lh(), { basename: l } = sh(), u = _.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let d = m0(
      e,
      l,
      s.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, f = [];
    for (let m of t)
      typeof m.route.shouldRevalidate == "function" ? p = !0 : f.push(m.route.id);
    return p && f.length > 0 && d.searchParams.set("_routes", f.join(",")), [d.pathname + d.search];
  }, [
    l,
    s.unstable_trailingSlashAwareDataRequests,
    e,
    o,
    t
  ]);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, u.map((d) => /* @__PURE__ */ _.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function n$({
  page: e,
  matches: t,
  ...r
}) {
  let o = Zn(), { future: s, manifest: l, routeModules: u } = lh(), { basename: d } = sh(), { loaderData: p, matches: f } = JT(), m = _.useMemo(
    () => Pv(
      e,
      t,
      f,
      l,
      o,
      "data"
    ),
    [e, t, f, l, o]
  ), g = _.useMemo(
    () => Pv(
      e,
      t,
      f,
      l,
      o,
      "assets"
    ),
    [e, t, f, l, o]
  ), w = _.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let b = /* @__PURE__ */ new Set(), k = !1;
    if (t.forEach((N) => {
      let x = l.routes[N.route.id];
      !x || !x.hasLoader || (!m.some((P) => P.route.id === N.route.id) && N.route.id in p && u[N.route.id]?.shouldRevalidate || x.hasClientLoader ? k = !0 : b.add(N.route.id));
    }), b.size === 0)
      return [];
    let M = m0(
      e,
      d,
      s.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return k && b.size > 0 && M.searchParams.set(
      "_routes",
      t.filter((N) => b.has(N.route.id)).map((N) => N.route.id).join(",")
    ), [M.pathname + M.search];
  }, [
    d,
    s.unstable_trailingSlashAwareDataRequests,
    p,
    o,
    l,
    m,
    t,
    e,
    u
  ]), C = _.useMemo(
    () => KT(g, l),
    [g, l]
  ), S = e$(g);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, w.map((b) => /* @__PURE__ */ _.createElement("link", { key: b, rel: "prefetch", as: "fetch", href: b, ...r })), C.map((b) => /* @__PURE__ */ _.createElement("link", { key: b, rel: "modulepreload", href: b, ...r })), S.map(({ key: b, link: k }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: b,
        nonce: r.nonce,
        ...k,
        crossOrigin: k.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function r$(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var i$ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  i$ && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
function o$({
  basename: e,
  children: t,
  unstable_useTransitions: r,
  window: o
}) {
  let s = _.useRef();
  s.current == null && (s.current = DR({ window: o, v5Compat: !0 }));
  let l = s.current, [u, d] = _.useState({
    action: l.action,
    location: l.location
  }), p = _.useCallback(
    (f) => {
      r === !1 ? d(f) : _.startTransition(() => d(f));
    },
    [r]
  );
  return _.useLayoutEffect(() => l.listen(p), [l, p]), /* @__PURE__ */ _.createElement(
    IT,
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
var y0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, v0 = _.forwardRef(
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
    to: m,
    preventScrollReset: g,
    viewTransition: w,
    unstable_defaultShouldRevalidate: C,
    ...S
  }, b) {
    let { basename: k, navigator: M, unstable_useTransitions: N } = _.useContext(_n), x = typeof m == "string" && y0.test(m), P = o0(m, k);
    m = P.to;
    let E = yT(m, { relative: s }), $ = Zn(), A = null;
    if (d) {
      let j = th(
        d,
        [],
        $.unstable_mask ? $.unstable_mask.pathname : "/",
        !0
      );
      k !== "/" && (j.pathname = j.pathname === "/" ? k : An([k, j.pathname])), A = M.createHref(j);
    }
    let [I, L, v] = XT(
      o,
      S
    ), T = u$(m, {
      replace: u,
      unstable_mask: d,
      state: p,
      target: f,
      preventScrollReset: g,
      relative: s,
      viewTransition: w,
      unstable_defaultShouldRevalidate: C,
      unstable_useTransitions: N
    });
    function O(j) {
      t && t(j), j.defaultPrevented || T(j);
    }
    let F = !(P.isExternal || l), B = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ _.createElement(
        "a",
        {
          ...S,
          ...v,
          href: (F ? A : void 0) || P.absoluteURL || E,
          onClick: F ? O : t,
          ref: r$(b, L),
          target: f,
          "data-discover": !x && r === "render" ? "true" : void 0
        }
      )
    );
    return I && !x ? /* @__PURE__ */ _.createElement(_.Fragment, null, B, /* @__PURE__ */ _.createElement(ZT, { page: E })) : B;
  }
);
v0.displayName = "Link";
var s$ = _.forwardRef(
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
  }, m) {
    let g = ia(u, { relative: f.relative }), w = Zn(), C = _.useContext(Yu), { navigator: S, basename: b } = _.useContext(_n), k = C != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    g$(g) && d === !0, M = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname, N = w.pathname, x = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null;
    r || (N = N.toLowerCase(), x = x ? x.toLowerCase() : null, M = M.toLowerCase()), x && b && (x = mr(x, b) || x);
    const P = M !== "/" && M.endsWith("/") ? M.length - 1 : M.length;
    let E = N === M || !s && N.startsWith(M) && N.charAt(P) === "/", $ = x != null && (x === M || !s && x.startsWith(M) && x.charAt(M.length) === "/"), A = {
      isActive: E,
      isPending: $,
      isTransitioning: k
    }, I = E ? t : void 0, L;
    typeof o == "function" ? L = o(A) : L = [
      o,
      E ? "active" : null,
      $ ? "pending" : null,
      k ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let v = typeof l == "function" ? l(A) : l;
    return /* @__PURE__ */ _.createElement(
      v0,
      {
        ...f,
        "aria-current": I,
        className: L,
        ref: m,
        style: v,
        to: u,
        viewTransition: d
      },
      typeof p == "function" ? p(A) : p
    );
  }
);
s$.displayName = "NavLink";
var a$ = _.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: o,
    replace: s,
    state: l,
    method: u = tu,
    action: d,
    onSubmit: p,
    relative: f,
    preventScrollReset: m,
    viewTransition: g,
    unstable_defaultShouldRevalidate: w,
    ...C
  }, S) => {
    let { unstable_useTransitions: b } = _.useContext(_n), k = p$(), M = h$(d, { relative: f }), N = u.toLowerCase() === "get" ? "get" : "post", x = typeof d == "string" && y0.test(d), P = (E) => {
      if (p && p(E), E.defaultPrevented) return;
      E.preventDefault();
      let $ = E.nativeEvent.submitter, A = $?.getAttribute("formmethod") || u, I = () => k($ || E.currentTarget, {
        fetcherKey: t,
        method: A,
        navigate: r,
        replace: s,
        state: l,
        relative: f,
        preventScrollReset: m,
        viewTransition: g,
        unstable_defaultShouldRevalidate: w
      });
      b && r !== !1 ? _.startTransition(() => I()) : I();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: S,
        method: N,
        action: M,
        onSubmit: o ? p : P,
        ...C,
        "data-discover": !x && e === "render" ? "true" : void 0
      }
    );
  }
);
a$.displayName = "Form";
function l$(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function w0(e) {
  let t = _.useContext(xo);
  return Je(t, l$(e)), t;
}
function u$(e, {
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
  let m = f0(), g = Zn(), w = ia(e, { relative: u });
  return _.useCallback(
    (C) => {
      if (jT(C, t)) {
        C.preventDefault();
        let S = r !== void 0 ? r : Fs(g) === Fs(w), b = () => m(e, {
          replace: S,
          unstable_mask: o,
          state: s,
          preventScrollReset: l,
          relative: u,
          viewTransition: d,
          unstable_defaultShouldRevalidate: p
        });
        f ? _.startTransition(() => b()) : b();
      }
    },
    [
      g,
      m,
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
function c$(e) {
  On(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let t = _.useRef(lp(e)), r = _.useRef(!1), o = Zn(), s = _.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      zT(
        o.search,
        r.current ? null : t.current
      )
    ),
    [o.search]
  ), l = f0(), u = _.useCallback(
    (d, p) => {
      const f = lp(
        typeof d == "function" ? d(new URLSearchParams(s)) : d
      );
      r.current = !0, l("?" + f, p);
    },
    [l, s]
  );
  return [s, u];
}
var d$ = 0, f$ = () => `__${String(++d$)}__`;
function p$() {
  let { router: e } = w0(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = _.useContext(_n), r = TT(), o = e.fetch, s = e.navigate;
  return _.useCallback(
    async (l, u = {}) => {
      let { action: d, method: p, encType: f, formData: m, body: g } = UT(
        l,
        t
      );
      if (u.navigate === !1) {
        let w = u.fetcherKey || f$();
        await o(w, r, u.action || d, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: m,
          body: g,
          formMethod: u.method || p,
          formEncType: u.encType || f,
          flushSync: u.flushSync
        });
      } else
        await s(u.action || d, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: m,
          body: g,
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
function h$(e, { relative: t } = {}) {
  let { basename: r } = _.useContext(_n), o = _.useContext(Xn);
  Je(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), l = { ...ia(e || ".", { relative: t }) }, u = Zn();
  if (e == null) {
    l.search = u.search;
    let d = new URLSearchParams(l.search), p = d.getAll("index");
    if (p.some((m) => m === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let m = d.toString();
      l.search = m ? `?${m}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (l.pathname = l.pathname === "/" ? r : An([r, l.pathname])), Fs(l);
}
function g$(e, { relative: t } = {}) {
  let r = _.useContext(l0);
  Je(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = w0(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = ia(e, { relative: t });
  if (!r.isTransitioning)
    return !1;
  let l = mr(r.currentLocation.pathname, o) || r.currentLocation.pathname, u = mr(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return mu(s.pathname, u) != null || mu(s.pathname, l) != null;
}
const Ce = (e) => typeof e == "string", gs = () => {
  let e, t;
  const r = new Promise((o, s) => {
    e = o, t = s;
  });
  return r.resolve = e, r.reject = t, r;
}, Rv = (e) => e == null ? "" : String(e), m$ = (e, t, r) => {
  e.forEach((o) => {
    t[o] && (r[o] = t[o]);
  });
}, y$ = /###/g, Tv = (e) => e && e.includes("###") ? e.replace(y$, ".") : e, $v = (e) => !e || Ce(e), Rs = (e, t, r) => {
  const o = Ce(t) ? t.split(".") : t;
  let s = 0;
  for (; s < o.length - 1; ) {
    if ($v(e)) return {};
    const l = Tv(o[s]);
    !e[l] && r && (e[l] = new r()), Object.prototype.hasOwnProperty.call(e, l) ? e = e[l] : e = {}, ++s;
  }
  return $v(e) ? {} : {
    obj: e,
    k: Tv(o[s])
  };
}, Mv = (e, t, r) => {
  const {
    obj: o,
    k: s
  } = Rs(e, t, Object);
  if (o !== void 0 || t.length === 1) {
    o[s] = r;
    return;
  }
  let l = t[t.length - 1], u = t.slice(0, t.length - 1), d = Rs(e, u, Object);
  for (; d.obj === void 0 && u.length; )
    l = `${u[u.length - 1]}.${l}`, u = u.slice(0, u.length - 1), d = Rs(e, u, Object), d?.obj && typeof d.obj[`${d.k}.${l}`] < "u" && (d.obj = void 0);
  d.obj[`${d.k}.${l}`] = r;
}, v$ = (e, t, r, o) => {
  const {
    obj: s,
    k: l
  } = Rs(e, t, Object);
  s[l] = s[l] || [], s[l].push(r);
}, vu = (e, t) => {
  const {
    obj: r,
    k: o
  } = Rs(e, t);
  if (r && Object.prototype.hasOwnProperty.call(r, o))
    return r[o];
}, w$ = (e, t, r) => {
  const o = vu(e, r);
  return o !== void 0 ? o : vu(t, r);
}, S0 = (e, t, r) => {
  for (const o in t)
    o !== "__proto__" && o !== "constructor" && (o in e ? Ce(e[o]) || e[o] instanceof String || Ce(t[o]) || t[o] instanceof String ? r && (e[o] = t[o]) : S0(e[o], t[o], r) : e[o] = t[o]);
  return e;
}, cr = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), S$ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
}, b$ = (e) => Ce(e) ? e.replace(/[&<>"'\/]/g, (t) => S$[t]) : e;
class _$ {
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
const x$ = [" ", ",", "?", "!", ";"], k$ = new _$(20), C$ = (e, t, r) => {
  t = t || "", r = r || "";
  const o = x$.filter((u) => !t.includes(u) && !r.includes(u));
  if (o.length === 0) return !0;
  const s = k$.getRegExp(`(${o.map((u) => u === "?" ? "\\?" : u).join("|")})`);
  let l = !s.test(e);
  if (!l) {
    const u = e.indexOf(r);
    u > 0 && !s.test(e.substring(0, u)) && (l = !0);
  }
  return l;
}, up = (e, t, r = ".") => {
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
}, js = (e) => e?.replace(/_/g, "-"), E$ = {
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
class wu {
  constructor(t, r = {}) {
    this.init(t, r);
  }
  init(t, r = {}) {
    this.prefix = r.prefix || "i18next:", this.logger = t || E$, this.options = r, this.debug = r.debug;
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
    return new wu(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new wu(this.logger, t);
  }
}
var Hn = new wu();
class Xu {
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
class Av extends Xu {
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
    const p = vu(this.data, d);
    return !p && !r && !o && t.includes(".") && (t = d[0], r = d[1], o = d.slice(2).join(".")), p || !u || !Ce(o) ? p : up(this.data?.[t]?.[r], o, l);
  }
  addResource(t, r, o, s, l = {
    silent: !1
  }) {
    const u = l.keySeparator !== void 0 ? l.keySeparator : this.options.keySeparator;
    let d = [t, r];
    o && (d = d.concat(u ? o.split(u) : o)), t.includes(".") && (d = t.split("."), s = r, r = d[1]), this.addNamespaces(r), Mv(this.data, d, s), l.silent || this.emit("added", t, r, o, s);
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
    let p = vu(this.data, d) || {};
    u.skipCopy || (o = JSON.parse(JSON.stringify(o))), s ? S0(p, o, l) : p = {
      ...p,
      ...o
    }, Mv(this.data, d, p), u.silent || this.emit("added", t, r, o);
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
var b0 = {
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
const _0 = /* @__PURE__ */ Symbol("i18next/PATH_KEY");
function P$() {
  const e = [], t = /* @__PURE__ */ Object.create(null);
  let r;
  return t.get = (o, s) => (r?.revoke?.(), s === _0 ? e : (e.push(s), r = Proxy.revocable(o, t), r.proxy)), Proxy.revocable(/* @__PURE__ */ Object.create(null), t).proxy;
}
function ho(e, t) {
  const {
    [_0]: r
  } = e(P$()), o = t?.keySeparator ?? ".", s = t?.nsSeparator ?? ":";
  if (r.length > 1 && s) {
    const l = t?.ns, u = Array.isArray(l) ? l : null;
    if (u && u.length > 1 && u.slice(1).includes(r[0]))
      return `${r[0]}${s}${r.slice(1).join(o)}`;
  }
  return r.join(o);
}
const xf = (e) => !Ce(e) && typeof e != "boolean" && typeof e != "number";
class Su extends Xu {
  constructor(t, r = {}) {
    super(), m$(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Hn.create("translator"), this.checkedLoadedFor = {};
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
    const l = xf(s.res);
    return !(o.returnObjects === !1 && l);
  }
  extractFromKey(t, r) {
    let o = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
    o === void 0 && (o = ":");
    const s = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = r.ns || this.options.defaultNS || [];
    const u = o && t.includes(o), d = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !C$(t, o, s);
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
    typeof t == "function" && (t = ho(t, {
      ...this.options,
      ...s
    })), Array.isArray(t) || (t = [String(t)]), t = t.map((F) => typeof F == "function" ? ho(F, {
      ...this.options,
      ...s
    }) : String(F));
    const l = s.returnDetails !== void 0 ? s.returnDetails : this.options.returnDetails, u = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, {
      key: d,
      namespaces: p
    } = this.extractFromKey(t[t.length - 1], s), f = p[p.length - 1];
    let m = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    m === void 0 && (m = ":");
    const g = s.lng || this.language, w = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (g?.toLowerCase() === "cimode")
      return w ? l ? {
        res: `${f}${m}${d}`,
        usedKey: d,
        exactUsedKey: d,
        usedLng: g,
        usedNS: f,
        usedParams: this.getUsedParamsDetails(s)
      } : `${f}${m}${d}` : l ? {
        res: d,
        usedKey: d,
        exactUsedKey: d,
        usedLng: g,
        usedNS: f,
        usedParams: this.getUsedParamsDetails(s)
      } : d;
    const C = this.resolve(t, s);
    let S = C?.res;
    const b = C?.usedKey || d, k = C?.exactUsedKey || d, M = ["[object Number]", "[object Function]", "[object RegExp]"], N = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays, x = !this.i18nFormat || this.i18nFormat.handleAsObject, P = s.count !== void 0 && !Ce(s.count), E = Su.hasDefaultValue(s), $ = P ? this.pluralResolver.getSuffix(g, s.count, s) : "", A = s.ordinal && P ? this.pluralResolver.getSuffix(g, s.count, {
      ordinal: !1
    }) : "", I = P && !s.ordinal && s.count === 0, L = I && s[`defaultValue${this.options.pluralSeparator}zero`] || s[`defaultValue${$}`] || s[`defaultValue${A}`] || s.defaultValue;
    let v = S;
    x && !S && E && (v = L);
    const T = xf(v), O = Object.prototype.toString.apply(v);
    if (x && v && T && !M.includes(O) && !(Ce(N) && Array.isArray(v))) {
      if (!s.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const F = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(b, v, {
          ...s,
          ns: p
        }) : `key '${d} (${this.language})' returned an object instead of string.`;
        return l ? (C.res = F, C.usedParams = this.getUsedParamsDetails(s), C) : F;
      }
      if (u) {
        const F = Array.isArray(v), B = F ? [] : {}, j = F ? k : b;
        for (const V in v)
          if (Object.prototype.hasOwnProperty.call(v, V)) {
            const G = `${j}${u}${V}`;
            E && !S ? B[V] = this.translate(G, {
              ...s,
              defaultValue: xf(L) ? L[V] : void 0,
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
    } else if (x && Ce(N) && Array.isArray(S))
      S = S.join(N), S && (S = this.extendTranslation(S, t, s, o));
    else {
      let F = !1, B = !1;
      !this.isValidLookup(S) && E && (F = !0, S = L), this.isValidLookup(S) || (B = !0, S = d);
      const V = (s.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && B ? void 0 : S, G = E && L !== S && this.options.updateMissing;
      if (B || F || G) {
        if (this.logger.log(G ? "updateKey" : "missingKey", g, f, P && !G ? `${d}${this.pluralResolver.getSuffix(g, s.count, s)}` : d, G ? L : S), u) {
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
        const K = (D, Y, ne) => {
          const te = E && ne !== S ? ne : V;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(D, f, Y, te, G, s) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(D, f, Y, te, G, s), this.emit("missingKey", D, f, Y, S);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && P ? U.forEach((D) => {
          const Y = this.pluralResolver.getSuffixes(D, s);
          I && s[`defaultValue${this.options.pluralSeparator}zero`] && !Y.includes(`${this.options.pluralSeparator}zero`) && Y.push(`${this.options.pluralSeparator}zero`), Y.forEach((ne) => {
            K([D], d + ne, s[`defaultValue${ne}`] || L);
          });
        }) : K(U, d, L));
      }
      S = this.extendTranslation(S, t, s, C, o), B && S === d && this.options.appendNamespaceToMissingKey && (S = `${f}${m}${d}`), (B || F) && this.options.parseMissingKeyHandler && (S = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${f}${m}${d}` : d, F ? S : void 0, s));
    }
    return l ? (C.res = S, C.usedParams = this.getUsedParamsDetails(s), C) : S;
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
        const g = t.match(this.interpolator.nestingRegexp);
        f = g && g.length;
      }
      let m = o.replace && !Ce(o.replace) ? o.replace : o;
      if (this.options.interpolation.defaultVariables && (m = {
        ...this.options.interpolation.defaultVariables,
        ...m
      }), t = this.interpolator.interpolate(t, m, o.lng || this.language || s.usedLng, o), p) {
        const g = t.match(this.interpolator.nestingRegexp), w = g && g.length;
        f < w && (o.nest = !1);
      }
      !o.lng && s && s.res && (o.lng = this.language || s.usedLng), o.nest !== !1 && (t = this.interpolator.nest(t, (...g) => l?.[0] === g[0] && !o.context ? (this.logger.warn(`It seems you are nesting recursively key: ${g[0]} in key: ${r[0]}`), null) : this.translate(...g, r), o)), o.interpolation && this.interpolator.reset();
    }
    const u = o.postProcess || this.options.postProcess, d = Ce(u) ? [u] : u;
    return t != null && d?.length && o.applyPostProcessor !== !1 && (t = b0.handle(d, t, r, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...s,
        usedParams: this.getUsedParamsDetails(o)
      },
      ...o
    } : o, this)), t;
  }
  resolve(t, r = {}) {
    let o, s, l, u, d;
    return Ce(t) && (t = [t]), Array.isArray(t) && (t = t.map((p) => typeof p == "function" ? ho(p, {
      ...this.options,
      ...r
    }) : p)), t.forEach((p) => {
      if (this.isValidLookup(o)) return;
      const f = this.extractFromKey(p, r), m = f.key;
      s = m;
      let g = f.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const w = r.count !== void 0 && !Ce(r.count), C = w && !r.ordinal && r.count === 0, S = r.context !== void 0 && (Ce(r.context) || typeof r.context == "number") && r.context !== "", b = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
      g.forEach((k) => {
        this.isValidLookup(o) || (d = k, !this.checkedLoadedFor[`${b[0]}-${k}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(d) && (this.checkedLoadedFor[`${b[0]}-${k}`] = !0, this.logger.warn(`key "${s}" for languages "${b.join(", ")}" won't get resolved as namespace "${d}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), b.forEach((M) => {
          if (this.isValidLookup(o)) return;
          u = M;
          const N = [m];
          if (this.i18nFormat?.addLookupKeys)
            this.i18nFormat.addLookupKeys(N, m, M, k, r);
          else {
            let P;
            w && (P = this.pluralResolver.getSuffix(M, r.count, r));
            const E = `${this.options.pluralSeparator}zero`, $ = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (w && (r.ordinal && P.startsWith($) && N.push(m + P.replace($, this.options.pluralSeparator)), N.push(m + P), C && N.push(m + E)), S) {
              const A = `${m}${this.options.contextSeparator || "_"}${r.context}`;
              N.push(A), w && (r.ordinal && P.startsWith($) && N.push(A + P.replace($, this.options.pluralSeparator)), N.push(A + P), C && N.push(A + E));
            }
          }
          let x;
          for (; x = N.pop(); )
            this.isValidLookup(o) || (l = x, o = this.getResource(M, k, x, r));
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
class Iv {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Hn.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = js(t), !t || !t.includes("-")) return null;
    const r = t.split("-");
    return r.length === 2 || (r.pop(), r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = js(t), !t || !t.includes("-")) return t;
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
const Nv = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, Ov = {
  select: (e) => e === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class R$ {
  constructor(t, r = {}) {
    this.languageUtils = t, this.options = r, this.logger = Hn.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t, r = {}) {
    const o = js(t === "dev" ? "en" : t), s = r.ordinal ? "ordinal" : "cardinal", l = JSON.stringify({
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
        return this.logger.error("No Intl support, please use an Intl polyfill!"), Ov;
      if (!t.match(/-|_/)) return Ov;
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
    return o || (o = this.getRule("dev", r)), o ? o.resolvedOptions().pluralCategories.sort((s, l) => Nv[s] - Nv[l]).map((s) => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : [];
  }
  getSuffix(t, r, o = {}) {
    const s = this.getRule(t, o);
    return s ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(r)}` : (this.logger.warn(`no plural rule found for: ${t}`), this.getSuffix("dev", r, o));
  }
}
const Lv = (e, t, r, o = ".", s = !0) => {
  let l = w$(e, t, r);
  return !l && s && Ce(r) && (l = up(e, r, o), l === void 0 && (l = up(t, r, o))), l;
}, kf = (e) => e.replace(/\$/g, "$$$$");
class Dv {
  constructor(t = {}) {
    this.logger = Hn.create("interpolator"), this.options = t, this.format = t?.interpolation?.format || ((r) => r), this.init(t);
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
      unescapeSuffix: m,
      unescapePrefix: g,
      nestingPrefix: w,
      nestingPrefixEscaped: C,
      nestingSuffix: S,
      nestingSuffixEscaped: b,
      nestingOptionsSeparator: k,
      maxReplaces: M,
      alwaysFormat: N
    } = t.interpolation;
    this.escape = r !== void 0 ? r : b$, this.escapeValue = o !== void 0 ? o : !0, this.useRawValueToEscape = s !== void 0 ? s : !1, this.prefix = l ? cr(l) : u || "{{", this.suffix = d ? cr(d) : p || "}}", this.formatSeparator = f || ",", this.unescapePrefix = m ? "" : g ? cr(g) : "-", this.unescapeSuffix = this.unescapePrefix ? "" : m ? cr(m) : "", this.nestingPrefix = w ? cr(w) : C || cr("$t("), this.nestingSuffix = S ? cr(S) : b || cr(")"), this.nestingOptionsSeparator = k || ",", this.maxReplaces = M || 1e3, this.alwaysFormat = N !== void 0 ? N : !1, this.resetRegExp();
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
    const p = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, f = (C) => {
      if (!C.includes(this.formatSeparator)) {
        const M = Lv(r, p, C, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(M, void 0, o, {
          ...s,
          ...r,
          interpolationkey: C
        }) : M;
      }
      const S = C.split(this.formatSeparator), b = S.shift().trim(), k = S.join(this.formatSeparator).trim();
      return this.format(Lv(r, p, b, this.options.keySeparator, this.options.ignoreJSONStructure), k, o, {
        ...s,
        ...r,
        interpolationkey: b
      });
    };
    this.resetRegExp(), !this.escapeValue && typeof t == "string" && /\$t\([^)]*\{[^}]*\{\{/.test(t) && this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
    const m = s?.missingInterpolationHandler || this.options.missingInterpolationHandler, g = s?.interpolation?.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (C) => kf(C)
    }, {
      regex: this.regexp,
      safeValue: (C) => this.escapeValue ? kf(this.escape(C)) : kf(C)
    }].forEach((C) => {
      for (d = 0; l = C.regex.exec(t); ) {
        const S = l[1].trim();
        if (u = f(S), u === void 0)
          if (typeof m == "function") {
            const k = m(t, l, s);
            u = Ce(k) ? k : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, S))
            u = "";
          else if (g) {
            u = l[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${S} for interpolating ${t}`), u = "";
        else !Ce(u) && !this.useRawValueToEscape && (u = Rv(u));
        const b = C.safeValue(u);
        if (t = t.replace(l[0], b), g ? (C.regex.lastIndex += u.length, C.regex.lastIndex -= l[0].length) : C.regex.lastIndex = 0, d++, d >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, r, o = {}) {
    let s, l, u;
    const d = (p, f) => {
      const m = this.nestingOptionsSeparator;
      if (!p.includes(m)) return p;
      const g = p.split(new RegExp(`${cr(m)}[ ]*{`));
      let w = `{${g[1]}`;
      p = g[0], w = this.interpolate(w, u);
      const C = w.match(/'/g), S = w.match(/"/g);
      ((C?.length ?? 0) % 2 === 0 && !S || (S?.length ?? 0) % 2 !== 0) && (w = w.replace(/'/g, '"'));
      try {
        u = JSON.parse(w), f && (u = {
          ...f,
          ...u
        });
      } catch (b) {
        return this.logger.warn(`failed parsing options string in nesting for key ${p}`, b), `${p}${m}${w}`;
      }
      return u.defaultValue && u.defaultValue.includes(this.prefix) && delete u.defaultValue, p;
    };
    for (; s = this.nestingRegexp.exec(t); ) {
      let p = [];
      u = {
        ...o
      }, u = u.replace && !Ce(u.replace) ? u.replace : u, u.applyPostProcessor = !1, delete u.defaultValue;
      const f = /{.*}/.test(s[1]) ? s[1].lastIndexOf("}") + 1 : s[1].indexOf(this.formatSeparator);
      if (f !== -1 && (p = s[1].slice(f).split(this.formatSeparator).map((m) => m.trim()).filter(Boolean), s[1] = s[1].slice(0, f)), l = r(d.call(this, s[1].trim(), u), u), l && s[0] === t && !Ce(l)) return l;
      Ce(l) || (l = Rv(l)), l || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`), l = ""), p.length && (l = p.reduce((m, g) => this.format(m, g, o.lng, {
        ...o,
        interpolationkey: s[1].trim()
      }), l.trim())), t = t.replace(s[0], l), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
const T$ = (e) => {
  let t = e.toLowerCase().trim();
  const r = {};
  if (e.includes("(")) {
    const o = e.split("(");
    t = o[0].toLowerCase().trim();
    const s = o[1].slice(0, -1);
    t === "currency" && !s.includes(":") ? r.currency || (r.currency = s.trim()) : t === "relativetime" && !s.includes(":") ? r.range || (r.range = s.trim()) : s.split(";").forEach((u) => {
      if (u) {
        const [d, ...p] = u.split(":"), f = p.join(":").trim().replace(/^'+|'+$/g, ""), m = d.trim();
        r[m] || (r[m] = f), f === "false" && (r[m] = !1), f === "true" && (r[m] = !0), isNaN(f) || (r[m] = parseInt(f, 10));
      }
    });
  }
  return {
    formatName: t,
    formatOptions: r
  };
}, Fv = (e) => {
  const t = {};
  return (r, o, s) => {
    let l = s;
    s && s.interpolationkey && s.formatParams && s.formatParams[s.interpolationkey] && s[s.interpolationkey] && (l = {
      ...l,
      [s.interpolationkey]: void 0
    });
    const u = o + JSON.stringify(l);
    let d = t[u];
    return d || (d = e(js(o), s), t[u] = d), d(r);
  };
}, $$ = (e) => (t, r, o) => e(js(r), o)(t);
class M$ {
  constructor(t = {}) {
    this.logger = Hn.create("formatter"), this.options = t, this.init(t);
  }
  init(t, r = {
    interpolation: {}
  }) {
    this.formatSeparator = r.interpolation.formatSeparator || ",";
    const o = r.cacheInBuiltFormats ? Fv : $$;
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
    this.formats[t.toLowerCase().trim()] = Fv(r);
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
        formatOptions: m
      } = T$(p);
      if (this.formats[f]) {
        let g = d;
        try {
          const w = s?.formatParams?.[s.interpolationkey] || {}, C = w.locale || w.lng || s.locale || s.lng || o;
          g = this.formats[f](d, C, {
            ...m,
            ...s,
            ...w
          });
        } catch (w) {
          this.logger.warn(w);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return d;
    }, t);
  }
}
const A$ = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class I$ extends Xu {
  constructor(t, r, o, s = {}) {
    super(), this.backend = t, this.store = r, this.services = o, this.languageUtils = o.languageUtils, this.options = s, this.logger = Hn.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(o, s.backend, s);
  }
  queueLoad(t, r, o, s) {
    const l = {}, u = {}, d = {}, p = {};
    return t.forEach((f) => {
      let m = !0;
      r.forEach((g) => {
        const w = `${f}|${g}`;
        !o.reload && this.store.hasResourceBundle(f, g) ? this.state[w] = 2 : this.state[w] < 0 || (this.state[w] === 1 ? u[w] === void 0 && (u[w] = !0) : (this.state[w] = 1, m = !1, u[w] === void 0 && (u[w] = !0), l[w] === void 0 && (l[w] = !0), p[g] === void 0 && (p[g] = !0)));
      }), m || (d[f] = !0);
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
      v$(p.loaded, [l], u), A$(p, t), r && p.errors.push(r), p.pendingCount === 0 && !p.done && (Object.keys(p.loaded).forEach((f) => {
        d[f] || (d[f] = {});
        const m = p.loaded[f];
        m.length && m.forEach((g) => {
          d[f][g] === void 0 && (d[f][g] = !0);
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
    const d = (f, m) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const g = this.waitingReads.shift();
        this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
      }
      if (f && m && s < this.maxRetries) {
        setTimeout(() => {
          this.read(t, r, o, s + 1, l * 2, u);
        }, l);
        return;
      }
      u(f, m);
    }, p = this.backend[o].bind(this.backend);
    if (p.length === 2) {
      try {
        const f = p(t, r);
        f && typeof f.then == "function" ? f.then((m) => d(null, m)).catch(d) : d(null, f);
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
            let m;
            f.length === 5 ? m = f(t, r, o, s, p) : m = f(t, r, o, s), m && typeof m.then == "function" ? m.then((g) => d(null, g)).catch(d) : d(null, m);
          } catch (m) {
            d(m);
          }
        else
          f(t, r, o, s, d, p);
      }
      !t || !t[0] || this.store.addResource(t[0], r, o, s);
    }
  }
}
const Cf = () => ({
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
}), jv = (e) => (Ce(e.ns) && (e.ns = [e.ns]), Ce(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), Ce(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && !e.supportedLngs.includes("cimode") && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e), Ml = () => {
}, N$ = (e) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((r) => {
    typeof e[r] == "function" && (e[r] = e[r].bind(e));
  });
};
class Ts extends Xu {
  constructor(t = {}, r) {
    if (super(), this.options = jv(t), this.services = {}, this.logger = Hn, this.modules = {
      external: []
    }, N$(this), r && !this.isInitialized && !t.isClone) {
      if (!this.options.initAsync)
        return this.init(t, r), this;
      setTimeout(() => {
        this.init(t, r);
      }, 0);
    }
  }
  init(t = {}, r) {
    this.isInitializing = !0, typeof t == "function" && (r = t, t = {}), t.defaultNS == null && t.ns && (Ce(t.ns) ? t.defaultNS = t.ns : t.ns.includes("translation") || (t.defaultNS = t.ns[0]));
    const o = Cf();
    this.options = {
      ...o,
      ...this.options,
      ...jv(t)
    }, this.options.interpolation = {
      ...o.interpolation,
      ...this.options.interpolation
    }, t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = o.overloadTranslationOptionHandler);
    const s = (f) => f ? typeof f == "function" ? new f() : f : null;
    if (!this.options.isClone) {
      this.modules.logger ? Hn.init(s(this.modules.logger), this.options) : Hn.init(null, this.options);
      let f;
      this.modules.formatter ? f = this.modules.formatter : f = M$;
      const m = new Iv(this.options);
      this.store = new Av(this.options.resources, this.options);
      const g = this.services;
      g.logger = Hn, g.resourceStore = this.store, g.languageUtils = m, g.pluralResolver = new R$(m, {
        prepend: this.options.pluralSeparator
      }), f && (g.formatter = s(f), g.formatter.init && g.formatter.init(g, this.options), this.options.interpolation.format = g.formatter.format.bind(g.formatter)), g.interpolator = new Dv(this.options), g.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, g.backendConnector = new I$(s(this.modules.backend), g.resourceStore, g, this.options), g.backendConnector.on("*", (w, ...C) => {
        this.emit(w, ...C);
      }), this.modules.languageDetector && (g.languageDetector = s(this.modules.languageDetector), g.languageDetector.init && g.languageDetector.init(g, this.options.detection, this.options)), this.modules.i18nFormat && (g.i18nFormat = s(this.modules.i18nFormat), g.i18nFormat.init && g.i18nFormat.init(this)), this.translator = new Su(this.services, this.options), this.translator.on("*", (w, ...C) => {
        this.emit(w, ...C);
      }), this.modules.external.forEach((w) => {
        w.init && w.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = Ml), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const f = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      f.length > 0 && f[0] !== "dev" && (this.options.lng = f[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((f) => {
      this[f] = (...m) => this.store[f](...m);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((f) => {
      this[f] = (...m) => (this.store[f](...m), this);
    });
    const d = gs(), p = () => {
      const f = (m, g) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), d.resolve(g), r(m, g);
      };
      if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return f(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, f);
    };
    return this.options.resources || !this.options.initAsync ? p() : setTimeout(p, 0), d;
  }
  loadResources(t, r = Ml) {
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
    const s = gs();
    return typeof t == "function" && (o = t, t = void 0), typeof r == "function" && (o = r, r = void 0), t || (t = this.languages), r || (r = this.options.ns), o || (o = Ml), this.services.backendConnector.reload(t, r, (l) => {
      s.resolve(), o(l);
    }), s;
  }
  use(t) {
    if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && b0.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
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
    const o = gs();
    this.emit("languageChanging", t);
    const s = (d) => {
      this.language = d, this.languages = this.services.languageUtils.toResolveHierarchy(d), this.resolvedLanguage = void 0, this.setResolvedLanguage(d);
    }, l = (d, p) => {
      p ? this.isLanguageChangingTo === t && (s(p), this.translator.changeLanguage(p), this.isLanguageChangingTo = void 0, this.emit("languageChanged", p), this.logger.log("languageChanged", p)) : this.isLanguageChangingTo = void 0, o.resolve((...f) => this.t(...f)), r && r(d, (...f) => this.t(...f));
    }, u = (d) => {
      !t && !d && this.services.languageDetector && (d = []);
      const p = Ce(d) ? d : d && d[0], f = this.store.hasLanguageSomeTranslations(p) ? p : this.services.languageUtils.getBestMatchFromCodes(Ce(d) ? [d] : d);
      f && (this.language || s(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector?.cacheUserLanguage?.(f)), this.loadResources(f, (m) => {
        l(m, f);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? u(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(u) : this.services.languageDetector.detect(u) : u(t), o;
  }
  getFixedT(t, r, o) {
    const s = (l, u, ...d) => {
      let p;
      typeof u != "object" ? p = this.options.overloadTranslationOptionHandler([l, u].concat(d)) : p = {
        ...u
      }, p.lng = p.lng || s.lng, p.lngs = p.lngs || s.lngs, p.ns = p.ns || s.ns, p.keyPrefix !== "" && (p.keyPrefix = p.keyPrefix || o || s.keyPrefix);
      const f = {
        ...this.options,
        ...p
      };
      typeof p.keyPrefix == "function" && (p.keyPrefix = ho(p.keyPrefix, f));
      const m = this.options.keySeparator || ".";
      let g;
      return p.keyPrefix && Array.isArray(l) ? g = l.map((w) => (typeof w == "function" && (w = ho(w, f)), `${p.keyPrefix}${m}${w}`)) : (typeof l == "function" && (l = ho(l, f)), g = p.keyPrefix ? `${p.keyPrefix}${m}${l}` : l), this.t(g, p);
    };
    return Ce(t) ? s.lng = t : s.lngs = t, s.ns = r, s.keyPrefix = o, s;
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
    const o = gs();
    return this.options.ns ? (Ce(t) && (t = [t]), t.forEach((s) => {
      this.options.ns.includes(s) || this.options.ns.push(s);
    }), this.loadResources((s) => {
      o.resolve(), r && r(s);
    }), o) : (r && r(), Promise.resolve());
  }
  loadLanguages(t, r) {
    const o = gs();
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
    const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], o = this.services?.languageUtils || new Iv(Cf());
    return t.toLowerCase().indexOf("-latn") > 1 ? "ltr" : r.includes(o.getLanguagePartFromCode(t)) || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(t = {}, r) {
    const o = new Ts(t, r);
    return o.createInstance = Ts.createInstance, o;
  }
  cloneInstance(t = {}, r = Ml) {
    const o = t.forkResourceStore;
    o && delete t.forkResourceStore;
    const s = {
      ...this.options,
      ...t,
      isClone: !0
    }, l = new Ts(s);
    if ((t.debug !== void 0 || t.prefix !== void 0) && (l.logger = l.logger.clone(t)), ["store", "services", "language"].forEach((d) => {
      l[d] = this[d];
    }), l.services = {
      ...this.services
    }, l.services.utils = {
      hasLoadedNamespace: l.hasLoadedNamespace.bind(l)
    }, o) {
      const d = Object.keys(this.store.data).reduce((p, f) => (p[f] = {
        ...this.store.data[f]
      }, p[f] = Object.keys(p[f]).reduce((m, g) => (m[g] = {
        ...p[f][g]
      }, m), p[f]), p), {});
      l.store = new Av(d, s), l.services.resourceStore = l.store;
    }
    if (t.interpolation) {
      const p = {
        ...Cf().interpolation,
        ...this.options.interpolation,
        ...t.interpolation
      }, f = {
        ...s,
        interpolation: p
      };
      l.services.interpolator = new Dv(f);
    }
    return l.translator = new Su(l.services, s), l.translator.on("*", (d, ...p) => {
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
const jt = Ts.createInstance();
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
const O$ = (e, t, r, o) => {
  const s = [r, {
    code: t,
    ...o || {}
  }];
  if (e?.services?.logger?.forward)
    return e.services.logger.forward(s, "warn", "react-i18next::", !0);
  xi(s[0]) && (s[0] = `react-i18next:: ${s[0]}`), e?.services?.logger?.warn ? e.services.logger.warn(...s) : console?.warn && console.warn(...s);
}, zv = {}, cp = (e, t, r, o) => {
  xi(r) && zv[r] || (xi(r) && (zv[r] = /* @__PURE__ */ new Date()), O$(e, t, r, o));
}, x0 = (e, t) => () => {
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
}, dp = (e, t, r) => {
  e.loadNamespaces(t, x0(e, r));
}, Bv = (e, t, r, o) => {
  if (xi(r) && (r = [r]), e.options.preload && e.options.preload.indexOf(t) > -1) return dp(e, r, o);
  r.forEach((s) => {
    e.options.ns.indexOf(s) < 0 && e.options.ns.push(s);
  }), e.loadLanguages(t, x0(e, o));
}, L$ = (e, t, r = {}) => !t.languages || !t.languages.length ? (cp(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: t.languages
}), !0) : t.hasLoadedNamespace(e, {
  lng: r.lng,
  precheck: (o, s) => {
    if (r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !s(o.isLanguageChangingTo, e)) return !1;
  }
}), xi = (e) => typeof e == "string", D$ = (e) => typeof e == "object" && e !== null, F$ = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, j$ = {
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
}, z$ = (e) => j$[e], B$ = (e) => e.replace(F$, z$);
let fp = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: B$
};
const W$ = (e = {}) => {
  fp = {
    ...fp,
    ...e
  };
}, U$ = () => fp;
let k0;
const V$ = (e) => {
  k0 = e;
}, H$ = () => k0, q$ = {
  type: "3rdParty",
  init(e) {
    W$(e.options.react), V$(e);
  }
}, K$ = _.createContext();
class Q$ {
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
const G$ = (e, t) => {
  const r = _.useRef();
  return _.useEffect(() => {
    r.current = e;
  }, [e, t]), r.current;
}, C0 = (e, t, r, o) => e.getFixedT(t, r, o), Y$ = (e, t, r, o) => _.useCallback(C0(e, t, r, o), [e, t, r, o]), br = (e, t = {}) => {
  const {
    i18n: r
  } = t, {
    i18n: o,
    defaultNS: s
  } = _.useContext(K$) || {}, l = r || o || H$();
  if (l && !l.reportNamespaces && (l.reportNamespaces = new Q$()), !l) {
    cp(l, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const P = ($, A) => xi(A) ? A : D$(A) && xi(A.defaultValue) ? A.defaultValue : Array.isArray($) ? $[$.length - 1] : $, E = [P, {}, !1];
    return E.t = P, E.i18n = {}, E.ready = !1, E;
  }
  l.options.react?.wait && cp(l, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const u = {
    ...U$(),
    ...l.options.react,
    ...t
  }, {
    useSuspense: d,
    keyPrefix: p
  } = u;
  let f = s || l.options?.defaultNS;
  f = xi(f) ? [f] : f || ["translation"], l.reportNamespaces.addUsedNamespaces?.(f);
  const m = (l.isInitialized || l.initializedStoreOnce) && f.every((P) => L$(P, l, u)), g = Y$(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), w = () => g, C = () => C0(l, t.lng || null, u.nsMode === "fallback" ? f : f[0], p), [S, b] = _.useState(w);
  let k = f.join();
  t.lng && (k = `${t.lng}${k}`);
  const M = G$(k), N = _.useRef(!0);
  _.useEffect(() => {
    const {
      bindI18n: P,
      bindI18nStore: E
    } = u;
    N.current = !0, !m && !d && (t.lng ? Bv(l, t.lng, f, () => {
      N.current && b(C);
    }) : dp(l, f, () => {
      N.current && b(C);
    })), m && M && M !== k && N.current && b(C);
    const $ = () => {
      N.current && b(C);
    };
    return P && l?.on(P, $), E && l?.store.on(E, $), () => {
      N.current = !1, l && P && P?.split(" ").forEach((A) => l.off(A, $)), E && l && E.split(" ").forEach((A) => l.store.off(A, $));
    };
  }, [l, k]), _.useEffect(() => {
    N.current && m && b(w);
  }, [l, p, m]);
  const x = [S, l, m];
  if (x.t = S, x.i18n = l, x.ready = m, m || !m && !d) return x;
  throw new Promise((P) => {
    t.lng ? Bv(l, t.lng, f, () => P()) : dp(l, f, () => P());
  });
}, J$ = "An", X$ = "Aus", Z$ = "Auswählen", eM = "Erfolg", tM = "OK", nM = "Abbrechen", rM = "Lautstärke", iM = "Medien überspringen (Tastenkürzel)", oM = "Alert überspringen (Tastenkürzel)", sM = "Keine", aM = "Starten", lM = "Stoppen", uM = "Verzögerung", cM = "ms", dM = "Token", fM = "Overlay-ID", pM = "API-Schlüssel", hM = "Getrennt", gM = "Dokumentation", mM = { title: "Autorisierung", code: "Code anfordern", sign_in: "Anmelden", phone: "Telefonnummer", telegram_code: "Code aus Telegram", your_code: "Dein Code", "2fa_password": "2FA-Passwort", password: "Passwort", streamelements: "Du musst zuerst StreamElements JWT verbinden", you_can_find_by_url: "Du findest es unter dieser URL", set_id_and_jwt: "Du musst StreamElements Account ID und JWT für {{service}} festlegen" }, yM = { wrong_lots_format: "Falsches Lots-Format", not_connected: "Nicht verbunden", request_error: "Anfragefehler" }, vM = { title: "Update", description: "Eine neue Version der App ist verfügbar. Möchtest du aktualisieren?", update: "Aktualisieren", later: "Später", downloading: "Wird heruntergeladen..." }, wM = { title: "Medien", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, SM = { tribute: "Tribute-Nachrichten anzeigen" }, bM = { lots: "Lots", wheel: "Rad", settings: "Einstellungen" }, _M = { set_point: "Punkt setzen", meter_price: "Preis pro Meter", amount: "Betrag", finish: "Beenden", lat_error: "Breitengrad muss zwischen -90 und 90 liegen", lng_error: "Längengrad muss zwischen -180 und 180 liegen", rules: "Damit sich der Zeiger automatisch in der Nachricht bewegt, darf nur ein Wort aus folgender Liste enthalten sein:" }, xM = { enabled: "Aktiviert", min_amount: "Mindestbetrag", video_volume: "Videolautstärke", min_views: "Mindestaufrufe" }, kM = { messages: "Nachrichten", settings: "Einstellungen", services: "Dienste", alerts: "Alerts", media: "Medien", goals: "Ziele", auction: "Auktion", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info", nsfw: "NSFW" }, CM = { title: "Letzte Nachrichten" }, EM = { skip: "Überspringen", replay: "Wiederholen", donated: "{{user_name}} hat {{amount}}{{currency}} gespendet", followed: "{{user_name}} folgt jetzt", subscribed: "{{user_name}} hat abonniert", gifted_subscriptions: "{{user_name}} hat {{total}} Abonnements verschenkt", raided_with: "{{user_name}} raided mit {{viewers}} Zuschauern" }, PM = { title: "Nachrichten filtern", exclude_donations: "Spenden ausschließen", exclude_follows: "Follows ausschließen", exclude_subscriptions: "Abonnements ausschließen", exclude_raids: "Raids ausschließen" }, RM = { title: "Einstellungen", pause: "Alert-Nachrichten pausieren", moderation_duration: "Moderationsdauer", black_list: "Sperrliste", remove_links: "Links entfernen", language: "Sprache", sec: "Sek", currency: "Währung", tts_type: "TTS-Typ" }, TM = { normal: "Normal", dropout: "Dropout", spin: "Drehen", speed: "Rad-Geschwindigkeit" }, $M = { continue: "Fortsetzen", pause: "Pausieren", reset: "Zurücksetzen", add_time: "Zeit hinzufügen", reduce_time: "Zeit reduzieren", add_timex2: "Zeit ×2 hinzufügen" }, MM = { title: "Fighter", match: "Match", final: "Finale", game: "Spiel", cancel: "Spiel abbrechen", winner: "Gewinner", settings: "Einstellungen", create_game: "Spiel aus Lots erstellen", start: "Starten", pause: "Pausieren", rematch: "Rematch", resume: "Fortsetzen" }, AM = { name: "Name", delete: "Löschen", add: "Betrag hinzufügen" }, IM = { delete: "Löschen", to_lot: "Zum Lot", new: "Neu", add_to_random_slot: "Zum zufälligen Lot hinzufügen" }, NM = { add: "Hinzufügen", new_lot_name: "Neuer Lot-Name", search: "Lot suchen", total: "Gesamt" }, OM = { leader_change: "Führungswechsel", new_lot: "Neues Lot", new_donation: "Neue Spende", show_odds: "Quoten anzeigen", show_total_sum: "Gesamtsumme anzeigen", greater_timer_adding_time: "Bei höherem Timer Zeit hinzufügen", not_add_time_if: "Keine Zeit hinzufügen, wenn", adding_time: "Zeit" }, LM = { import_lots: "Lots importieren", clear_lots: "Lots löschen" }, DM = { round_duration: "Rundendauer", add_players: "Spieler hinzufügen" }, FM = { title: "Alerts", group: "Gruppe" }, jM = { title: "Dienste", tribute: "Tribute", streamelements: "StreamElements", connect: "Verbinden", integrations: "Integrationen", sign_out: "Abmelden", confirm_sign_out: "Möchtest du dich wirklich von diesem Dienst abmelden?" }, zM = { device_code_expired: "Gerätecode ist abgelaufen. Bitte versuche es erneut.", user_code: "Benutzercode", authorize_with_code: "Mit Code autorisieren", waiting_authorization: "Warte auf Autorisierung..." }, BM = { donation_account_name: "Name des Spenden-Accounts", donation_url: "Spenden-URL", create_donation_account: "Widy-Spendenaccount erstellen", connect_to_existing_account: "Mit bestehendem Account verbinden", create_donation_account_pending: "Spendenaccount wird erstellt..." }, WM = { title: "Twitch-Einstellungen", points_currency_ratio: "Points-zu-Währung-Verhältnis", rewards_name: "Belohnungsname", rewards_list: "Belohnungsliste", add_reward: "Belohnung hinzufügen", cost: "Kosten", color: "Farbe" }, UM = { image: "Bild", audio: "Audio", view: "Ansicht", title: "Titel", message: "Nachricht", test_name: "Test", test_text: "Das ist ein Test-Alert!", configure: "Konfigurieren", test: "Testen", add_new_variant: "Neue Variante hinzufügen", new_variant: "Neue Variante", variant_title: "Varianten-Titel", variant_group: "Varianten-Gruppe", status: "Status", variation_condition: "Variationsbedingung", group: "Gruppe", Random: "Zufällig", AmountIsGreater: "Betrag ist größer", AmountIsEqual: "Betrag ist gleich", delete: "Löschen", sure_delete: "Möchtest du diese Variation wirklich löschen?", type: "Typ", Donation: "Spende", Subscription: "Abo", Follow: "Follow", Raid: "Raid" }, VM = "Allgemein", HM = { title: "Ziele", create: "Neues Ziel erstellen" }, qM = { new: "Neues Ziel", goal: "Ziel", type: "Typ", elements: "Elemente", progress: "Fortschritt", goal_title: "Ziel-Titel", amount_raise: "Zielbetrag", start_raising: "Startbetrag", end_date: "Ziel-Enddatum", bar_height: "Balkenhöhe", rounding_radius: "Abrundungsradius", bar_stroke_thickness: "Balken-Strichstärke", background_bar_color: "Hintergrund-Balkenfarbe", progress_bar_color: "Fortschrittsbalken-Farbe", goal_progress_bar: "Ziel-Fortschrittsbalken", progress_bar_layout: "Fortschrittsbalken-Layout", remaining_time: "Verbleibende Zeit", goal_amount_limits: "Zielbetrags-Limits", widget_background: "Widget-Hintergrund", background_color: "Hintergrundfarbe", OnTop: "Oben", Inside: "Innen", Below: "Unten", DoNotDisplay: "Nicht anzeigen", title: "Titel", limits: "Limits", raised: "Erreicht", days_left: "Tage übrig", finish_goal: "Ziel abschließen", sure_finish: "Möchtest du dieses Ziel wirklich abschließen?", Donation: "Spende", TwitchSubscription: "Twitch-Abo", TwitchFollow: "Twitch-Follow", goal_not_finished: "Du hast bereits ein unvollendetes Ziel dieses Typs." }, KM = "Speichern", QM = "Zurück", GM = { copy: "Kopieren", launch: "Starten", url: "Widget-URL", obs_dock_url: "OBS-Dock-URL" }, YM = { top: "Bild oben, Text unten", bottom: "Bild unten, Text oben", left: "Bild links, Text rechts", right: "Bild rechts, Text links", overlay: "Text über Bild" }, JM = { show: "Bild anzeigen" }, XM = { font: "Schriftart", font_size: "Schriftgröße", text_color: "Textfarbe", bold: "Fett", italics: "Kursiv", underline: "Unterstrichen", transformation: "Transformation", letter_spacing: "Buchstabenabstand", word_spacing: "Wortabstand", horizontal_alignment: "Horizontale Ausrichtung", vertical_alignment: "Vertikale Ausrichtung", text_preview: "Das ist eine Vorschau!", name: "Name" }, ZM = { play: "Abspielen", stop: "Stoppen" }, eA = "Version", tA = { title: "Widgets", add: "Widget hinzufügen", install: "Installieren", delete: "Löschen", installed: "Installiert", update: "Aktualisieren", all: "Alle", settings: "Einstellungen", control: "Steuerung", delete_confirm: "Möchtest du dieses Widget wirklich löschen?", invalid_manifest: "Ungültiges Widget-Manifest", add_confirm: "Das Hinzufügen erlaubt {{widget_name}} folgendes:", installing: "Wird installiert...", updating: "Wird aktualisiert...", view_url: "Ansichts-URL", widget_connection: "Widget sendet oder empfängt Anfragen an:" }, nA = { "widgets:messages.read": "Nachrichten lesen", "widgets:goals.read": "Ziele lesen", "widgets:auc-fighter:settings.read": "Auc-Fighter-Einstellungen lesen", "widgets:settings.read": "Widget-Einstellungen lesen", "widgets:alerts.read": "Alerts lesen", "widgets:media:settings.read": "Medien-Einstellungen lesen", "widgets:auc-fighter:match-playing.send": "Match wird gespielt senden", "widgets:auc-fighter:match-winner.send": "Match-Gewinner senden", "widgets:auc-fighter:match-paused.send": "Match pausiert senden", "widgets:auc-fighter:match-id.send": "Match-ID senden", "widgets:alert:played.send": "Alert abgespielt senden", "widgets:alert:playing.send": "Alert wird abgespielt senden", "widgets:media:played.send": "Medien abgespielt senden", "widgets:media:end.send": "Medien Ende senden", "widgets:media:playing.send": "Medien wird abgespielt senden", "widgets:media:paused.send": "Medien pausiert senden", "widgets:media:error.send": "Medien-Fehler senden", "widgets:media:replay.send": "Medien wiederholen senden", "widgets:alert:replay.send": "Alert wiederholen senden", "widgets:alert:skip.send": "Alert überspringen senden", "widgets:messages.subscription": "Nachrichten abonnieren", "widgets:goal.subscription": "Ziel abonnieren", "widgets:settings.subscription": "Einstellungen abonnieren", "widgets:auc-fighter:start-match.subscription": "Match-Start abonnieren", "widgets:auc-fighter:pause-match.subscription": "Match-Pause abonnieren", "widgets:auc-fighter:resume-match.subscription": "Match-Fortsetzen abonnieren", "widgets:auc-fighter:cancel-match.subscription": "Match-Abbruch abonnieren", "widgets:auc-fighter:update-match.subscription": "Match-Update abonnieren", "widgets:auc-fighter:settings.subscription": "Auc-Fighter-Einstellungen abonnieren", "widgets:alert:replay.subscription": "Alert-Wiederholung abonnieren", "widgets:alert:skip.subscription": "Alert-Überspringen abonnieren", "widgets:alert:test.subscription": "Alert-Test abonnieren", "widgets:alert:skip-playing.subscription": "Alert-Überspringen während Wiedergabe abonnieren", "widgets:alert:alerts.subscription": "Alerts abonnieren", "widgets:media:replay.subscription": "Medien-Wiederholung abonnieren", "widgets:media:settings.subscription": "Medien-Einstellungen abonnieren", "widgets:media:skip.subscription": "Medien-Überspringen abonnieren", "widgets:media:skip-playing-media.subscription": "Medien-Überspringen während Wiedergabe abonnieren", "widgets:media:end.subscription": "Medien-Ende abonnieren", "widgets:media:error.subscription": "Medien-Fehler abonnieren", "widgets:media:pause.subscription": "Medien-Pause abonnieren", "widgets:media:play.subscription": "Medien-Play abonnieren", "widgets:alert:played.subscription": "Alert abgespielt abonnieren", "widgets:view:storage.read": "Widget-View-Speicher lesen", "widgets:control:storage.read": "Widget-Control-Speicher lesen", "widgets:view:storage.write": "In Widget-View-Speicher schreiben", "widgets:control:storage.write": "In Widget-Control-Speicher schreiben", "widgets:view:storage.subscription": "Widget-View-Speicher abonnieren", "widgets:control:storage.subscription": "Widget-Control-Speicher abonnieren" }, rA = { title: "NSFW", nsfw_window: "NSFW-Fenster", settings: "Einstellungen", window: "Fenster", blur_timeout_duration: "Blur-Timeout-Dauer", confidence_threshold: "Konfidenzschwelle", anus: "Anus", make_love: "Liebe machen", nipple: "Brustwarze", penis: "Penis", vagina: "Vagina" }, iA = {
  on: J$,
  off: X$,
  select: Z$,
  success: eM,
  ok: tM,
  cancel: nM,
  sound_volume: rM,
  skip_media: iM,
  skip_alert: oM,
  none: sM,
  start: aM,
  stop: lM,
  delay: uM,
  milliseconds: cM,
  token: dM,
  overlay_id: fM,
  api_key: pM,
  disconnected: hM,
  documentation: gM,
  authorization: mM,
  error: yM,
  updater: vM,
  media: wM,
  integration: SM,
  auction: bM,
  maption: _M,
  media_settings: xM,
  dashboard: kM,
  messages: CM,
  message: EM,
  filter: PM,
  settings: RM,
  wheel: TM,
  timer: $M,
  fighter: MM,
  lot: AM,
  bid: IM,
  lots: NM,
  auction_settings: OM,
  lots_options: LM,
  auc_fighter_settings: DM,
  alerts: FM,
  services: jM,
  twitch: zM,
  widy: BM,
  twitch_service_settings: WM,
  alert: UM,
  general: VM,
  goals: HM,
  goal: qM,
  save: KM,
  back: QM,
  widget: GM,
  view: YM,
  image: JM,
  text: XM,
  audio: ZM,
  version: eA,
  widgets: tA,
  scopes: nA,
  nsfw: rA
}, oA = "On", sA = "Off", aA = "Select", lA = "Success", uA = "Ok", cA = "Cancel", dA = "Sound volume", fA = "Shortcut skip media", pA = "Shortcut skip alert", hA = "None", gA = "Start", mA = "Stop", yA = "Delay", vA = "ms", wA = "Token", SA = "Overlay Id", bA = "Api key", _A = "Disconnected", xA = "Documentation", kA = { title: "Authorization", code: "Request code", sign_in: "Sign in", phone: "Phone number", telegram_code: "Code from telegram", your_code: "Your code", "2fa_password": "2fa Password", password: "Password", streamelements: "You need connect with StreamElements JWT first", you_can_find_by_url: "You can find it by this url", set_id_and_jwt: "You need set StreamElements Account ID and JWT for {{service}}" }, CA = { wrong_lots_format: "Wrong lots format", not_connected: "Not connected", request_error: "Request error" }, EA = { title: "Update", description: "A new version of the app is available. Do you want to update?", update: "Update", later: "Later", downloading: "Downloading..." }, PA = { title: "Media", youtube: "Youtube", twitch: "Twitch", tiktok: "Tiktok" }, RA = { tribute: "Show tribute messages" }, TA = { lots: "Lots", wheel: "Wheel", settings: "Settings" }, $A = { set_point: "Set point", meter_price: "Price for 1 meter", amount: "Amount", finish: "Finish", lat_error: "Latitude must be between -90 and 90", lng_error: "Longitude must be between -180 and 180", rules: "For the pointer to automatically change position in the message there should be only one word from:" }, MA = { enabled: "Enabled", min_amount: "Min amount", video_volume: "Video volume", min_views: "Min views" }, AA = { messages: "Messages", settings: "Settings", services: "Services", alerts: "Alerts", media: "Media", goals: "Goals", auction: "Auction", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Info", nsfw: "NSFW" }, IA = { title: "Last messages" }, NA = { skip: "Skip", replay: "Replay", donated: "{{user_name}} donated {{amount}}{{currency}}", followed: "{{user_name}} followed", subscribed: "{{user_name}} subscribed", gifted_subscriptions: "{{user_name}} gift {{total}} subscriptions", raided_with: "{{user_name}} raided with {{viewers}} viewers" }, OA = { title: "Filter messages", exclude_donations: "Exclude donations", exclude_follows: "Exclude follows", exclude_subscriptions: "Exclude subscriptions", exclude_raids: "Exclude raids" }, LA = { title: "Settings", pause: "Pause alert messages", moderation_duration: "Moderation duration", black_list: "Black list", remove_links: "Remove links", language: "Language", sec: "Sec", currency: "Currency", tts_type: "TTS type" }, DA = { normal: "Normal", dropout: "Dropout", spin: "Spin", speed: "Wheel speed" }, FA = { continue: "Continue", pause: "Pause", reset: "Reset", add_time: "Add time", reduce_time: "Reduce time", add_timex2: "Add time x2" }, jA = { title: "Fighter", match: "Match", final: "Final", game: "Game", cancel: "Cancel game", winner: "Winner", settings: "Settings", create_game: "Create game from lots", start: "Start", pause: "Pause", rematch: "Rematch", resume: "Resume" }, zA = { name: "Name", delete: "Delete", add: "Add amount" }, BA = { delete: "Delete", to_lot: "To lot", new: "New", add_to_random_slot: "Add to random lot" }, WA = { add: "Add", new_lot_name: "New lot name", search: "Search lot", total: "Total" }, UA = { leader_change: "Leader change", new_lot: "New lot", new_donation: "New donation", show_odds: "Show odds", show_total_sum: "Show total sum", greater_timer_adding_time: "Greater timer adding time", not_add_time_if: "Not add time if", adding_time: "Time" }, VA = { import_lots: "Import lots", clear_lots: "Clear lots" }, HA = { round_duration: "Round duration", add_players: "Add players" }, qA = { title: "Alerts", group: "Group" }, KA = { title: "Services", tribute: "Tribute", streamelements: "Streamelements", connect: "Connect", integrations: "Integrations", sign_out: "Sign out", confirm_sign_out: "Are you sure you want to sign out from this service?" }, QA = { device_code_expired: "Device code expired. Please try again.", user_code: "User code", authorize_with_code: "Authorize with code", waiting_authorization: "Waiting for authorization..." }, GA = { donation_account_name: "Name of donation account", donation_url: "Donation url", create_donation_account: "Create Widy donation account", connect_to_existing_account: "Connect to existing account", create_donation_account_pending: "Creating donation account..." }, YA = { title: "Twitch settings", points_currency_ratio: "Points currency ratio", rewards_name: "Rewards name", rewards_list: "Rewards list", add_reward: "Add reward", cost: "Cost", color: "Color" }, JA = { image: "Image", audio: "Audio", view: "View", title: "Title", message: "Message", test_name: "Test", test_text: "This is a test alert!", configure: "Configure", test: "Test", add_new_variant: "Add new variant", new_variant: "New variant", variant_title: "Variant title", variant_group: "Variant group", status: "Status", variation_condition: "Variation condition", group: "Group", Random: "Random", AmountIsGreater: "Amount is greater", AmountIsEqual: "Amount is equal", delete: "Delete", sure_delete: "Are you sure you want to delete this variation?", type: "Type", Donation: "Donation", Subscription: "Subscription", Follow: "Follow", Raid: "Raid" }, XA = "General", ZA = { title: "Goals", create: "Crate new goal" }, e2 = { new: "New goal", goal: "View", type: "Type", elements: "Elements", progress: "Progress", goal_title: "Goal title", amount_raise: "Amount to raise", start_raising: "Start raising from", end_date: "End goal date", bar_height: "Bar height", rounding_radius: "Rounding radius", bar_stroke_thickness: "Bar stroke thickness", background_bar_color: "Background bar color", progress_bar_color: "Progress bar color", goal_progress_bar: "Goal progress bar", progress_bar_layout: "Progress bar layout", remaining_time: "Remaining time", goal_amount_limits: "Goal amount limits", widget_background: "Widget background", background_color: "Background color", OnTop: "On top", Inside: "Inside", Below: "Below", DoNotDisplay: "Do not display", title: "Title", limits: "limits", raised: "Raised", days_left: "Days left", finish_goal: "Finish goal", sure_finish: "Are you sure you want to finish this goal?", Donation: "Donation", TwitchSubscription: "Twitch Subscription", TwitchFollow: "Twitch Follow", goal_not_finished: "You have an unfinished goal of this type." }, t2 = "Save", n2 = "Back", r2 = { copy: "Copy", launch: "Launch", url: "Widget url", obs_dock_url: "Obs dock url" }, i2 = { top: "Image top, text bottom", bottom: "Image bottom, text top", left: "Image left, text right", right: "Image right, text left", overlay: "Text overlay image" }, o2 = { show: "Show image" }, s2 = { font: "Font", font_size: "Font size", text_color: "Text color", bold: "Bold", italics: "Italics", underline: "Underline", transformation: "Transformation", letter_spacing: "Letter spacing", word_spacing: "Word spacing", horizontal_alignment: "Horizontal alignment", vertical_alignment: "Vertical alignment", text_preview: "This is a preview!", name: "Name" }, a2 = { play: "Play", stop: "Stop" }, l2 = "Version", u2 = { title: "Widgets", add: "Add widget", install: "Install", delete: "Delete", installed: "Installed", update: "Update", all: "All", settings: "Settings", control: "Control", delete_confirm: "Are you sure you want to delete this widget?", invalid_manifest: "Invalid widget manifest", add_confirm: "Adding will allow {{widget_name}} to:", installing: "Installing...", updating: "Updating...", view_url: "View url", widget_connection: "Widget get or send requests to:" }, c2 = { "widgets:messages.read": "Read messages", "widgets:goals.read": "Read goals", "widgets:auc-fighter:settings.read": "Read auc-fighter settings", "widgets:settings.read": "Read widget settings", "widgets:alerts.read": "Read alerts", "widgets:media:settings.read": "Read media settings", "widgets:auc-fighter:match-playing.send": "Send match playing", "widgets:auc-fighter:match-winner.send": "Send match winner", "widgets:auc-fighter:match-paused.send": "Send match paused", "widgets:auc-fighter:match-id.send": "Send match ID", "widgets:alert:played.send": "Send alert played", "widgets:alert:playing.send": "Send alert playing", "widgets:media:played.send": "Send media played", "widgets:media:end.send": "Send media end", "widgets:media:playing.send": "Send media playing", "widgets:media:paused.send": "Send media paused", "widgets:media:error.send": "Send media error", "widgets:media:replay.send": "Send media replay", "widgets:alert:replay.send": "Send alert replay", "widgets:alert:skip.send": "Send alert skip", "widgets:messages.subscription": "Subscribe messages", "widgets:goal.subscription": "Subscribe goal", "widgets:settings.subscription": "Subscribe settings", "widgets:auc-fighter:start-match.subscription": "Subscribe start match", "widgets:auc-fighter:pause-match.subscription": "Subscribe pause match", "widgets:auc-fighter:resume-match.subscription": "Subscribe resume match", "widgets:auc-fighter:cancel-match.subscription": "Subscribe cancel match", "widgets:auc-fighter:update-match.subscription": "Subscribe update match", "widgets:auc-fighter:settings.subscription": "Subscribe auc-fighter settings", "widgets:alert:replay.subscription": "Subscribe alert replay", "widgets:alert:skip.subscription": "Subscribe alert skip", "widgets:alert:test.subscription": "Subscribe alert test", "widgets:alert:skip-playing.subscription": "Subscribe alert skip playing", "widgets:alert:alerts.subscription": "Subscribe alerts", "widgets:media:replay.subscription": "Subscribe media replay", "widgets:media:settings.subscription": "Subscribe media settings", "widgets:media:skip.subscription": "Subscribe media skip", "widgets:media:skip-playing-media.subscription": "Subscribe media skip playing", "widgets:media:end.subscription": "Subscribe media end", "widgets:media:error.subscription": "Subscribe media error", "widgets:media:pause.subscription": "Subscribe media pause", "widgets:media:play.subscription": "Subscribe media play", "widgets:alert:played.subscription": "Subscribe alert played", "widgets:view:storage.read": "Read widget view storage", "widgets:control:storage.read": "Read widget control storage", "widgets:view:storage.write": "Write to widget view storage", "widgets:control:storage.write": "Write to widget control storage", "widgets:view:storage.subscription": "Subscribe widget view storage", "widgets:control:storage.subscription": "Subscribe widget control storage" }, d2 = { title: "NSFW", nsfw_window: "NSFW window", settings: "Settings", window: "Window", blur_timeout_duration: "Blur timeout duration", confidence_threshold: "Confidence threshold", anus: "Anus", make_love: "Make love", nipple: "Nipple", penis: "Penis", vagina: "Vagina" }, f2 = {
  on: oA,
  off: sA,
  select: aA,
  success: lA,
  ok: uA,
  cancel: cA,
  sound_volume: dA,
  skip_media: fA,
  skip_alert: pA,
  none: hA,
  start: gA,
  stop: mA,
  delay: yA,
  milliseconds: vA,
  token: wA,
  overlay_id: SA,
  api_key: bA,
  disconnected: _A,
  documentation: xA,
  authorization: kA,
  error: CA,
  updater: EA,
  media: PA,
  integration: RA,
  auction: TA,
  maption: $A,
  media_settings: MA,
  dashboard: AA,
  messages: IA,
  message: NA,
  filter: OA,
  settings: LA,
  wheel: DA,
  timer: FA,
  fighter: jA,
  lot: zA,
  bid: BA,
  lots: WA,
  auction_settings: UA,
  lots_options: VA,
  auc_fighter_settings: HA,
  alerts: qA,
  services: KA,
  twitch: QA,
  widy: GA,
  twitch_service_settings: YA,
  alert: JA,
  general: XA,
  goals: ZA,
  goal: e2,
  save: t2,
  back: n2,
  widget: r2,
  view: i2,
  image: o2,
  text: s2,
  audio: a2,
  version: l2,
  widgets: u2,
  scopes: c2,
  nsfw: d2
}, p2 = "Encendido", h2 = "Apagado", g2 = "Seleccionar", m2 = "Éxito", y2 = "Aceptar", v2 = "Cancelar", w2 = "Volumen de sonido", S2 = "Atajo para saltar media", b2 = "Atajo para saltar alerta", _2 = "Ninguno", x2 = "Iniciar", k2 = "Detener", C2 = "Retraso", E2 = "ms", P2 = "Token", R2 = "ID de Overlay", T2 = "Clave API", $2 = "Desconectado", M2 = "Documentación", A2 = { title: "Autorización", code: "Solicitar código", sign_in: "Iniciar sesión", phone: "Número de teléfono", telegram_code: "Código de Telegram", your_code: "Tu código", "2fa_password": "Contraseña 2FA", password: "Contraseña", streamelements: "Necesitas conectar primero con StreamElements JWT", you_can_find_by_url: "Puedes encontrarlo en esta URL", set_id_and_jwt: "Necesitas configurar el ID de cuenta de StreamElements y JWT para {{service}}" }, I2 = { wrong_lots_format: "Formato de lotes incorrecto", not_connected: "No conectado", request_error: "Error en la solicitud" }, N2 = { title: "Actualización", description: "Hay una nueva versión de la aplicación disponible. ¿Quieres actualizar?", update: "Actualizar", later: "Más tarde", downloading: "Descargando..." }, O2 = { title: "Media", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, L2 = { tribute: "Mostrar mensajes de tributo" }, D2 = { lots: "Lotes", wheel: "Rueda", settings: "Ajustes" }, F2 = { set_point: "Establecer punto", meter_price: "Precio por 1 metro", amount: "Cantidad", finish: "Finalizar", lat_error: "La latitud debe estar entre -90 y 90", lng_error: "La longitud debe estar entre -180 y 180", rules: "Para que el puntero cambie de posición automáticamente en el mensaje solo debe haber una palabra de:" }, j2 = { enabled: "Activado", min_amount: "Cantidad mínima", video_volume: "Volumen del video", min_views: "Vistas mínimas" }, z2 = { messages: "Mensajes", settings: "Ajustes", services: "Servicios", alerts: "Alertas", media: "Media", goals: "Metas", auction: "Subasta", maption: "Maption", fighter: "Luchador", widgets: "Widgets", info: "Información", nsfw: "NSFW" }, B2 = { title: "Últimos mensajes" }, W2 = { skip: "Saltar", replay: "Reproducir de nuevo", donated: "{{user_name}} donó {{amount}}{{currency}}", followed: "{{user_name}} te siguió", subscribed: "{{user_name}} se suscribió", gifted_subscriptions: "{{user_name}} regaló {{total}} suscripciones", raided_with: "{{user_name}} hizo raid con {{viewers}} espectadores" }, U2 = { title: "Filtrar mensajes", exclude_donations: "Excluir donaciones", exclude_follows: "Excluir follows", exclude_subscriptions: "Excluir suscripciones", exclude_raids: "Excluir raids" }, V2 = { title: "Ajustes", pause: "Pausar mensajes de alerta", moderation_duration: "Duración de moderación", black_list: "Lista negra", remove_links: "Eliminar enlaces", language: "Idioma", sec: "Seg", currency: "Moneda", tts_type: "Tipo de TTS" }, H2 = { normal: "Normal", dropout: "Dropout", spin: "Girar", speed: "Velocidad de la rueda" }, q2 = { continue: "Continuar", pause: "Pausar", reset: "Reiniciar", add_time: "Añadir tiempo", reduce_time: "Reducir tiempo", add_timex2: "Añadir tiempo x2" }, K2 = { title: "Luchador", match: "Combate", final: "Final", game: "Juego", cancel: "Cancelar juego", winner: "Ganador", settings: "Ajustes", create_game: "Crear juego desde lotes", start: "Iniciar", pause: "Pausar", rematch: "Revancha", resume: "Reanudar" }, Q2 = { name: "Nombre", delete: "Eliminar", add: "Añadir cantidad" }, G2 = { delete: "Eliminar", to_lot: "Al lote", new: "Nuevo", add_to_random_slot: "Añadir a lote aleatorio" }, Y2 = { add: "Añadir", new_lot_name: "Nombre del nuevo lote", search: "Buscar lote", total: "Total" }, J2 = { leader_change: "Cambio de líder", new_lot: "Nuevo lote", new_donation: "Nueva donación", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar suma total", greater_timer_adding_time: "Añadir más tiempo al temporizador", not_add_time_if: "No añadir tiempo si", adding_time: "Tiempo" }, X2 = { import_lots: "Importar lotes", clear_lots: "Limpiar lotes" }, Z2 = { round_duration: "Duración de ronda", add_players: "Añadir jugadores" }, eI = { title: "Alertas", group: "Grupo" }, tI = { title: "Servicios", tribute: "Tributo", streamelements: "StreamElements", connect: "Conectar", integrations: "Integraciones", sign_out: "Cerrar sesión", confirm_sign_out: "¿Estás seguro de que quieres cerrar sesión de este servicio?" }, nI = { device_code_expired: "Código de dispositivo expirado. Por favor, inténtalo de nuevo.", user_code: "Código de usuario", authorize_with_code: "Autorizar con código", waiting_authorization: "Esperando autorización..." }, rI = { donation_account_name: "Nombre de la cuenta de donaciones", donation_url: "URL de donación", create_donation_account: "Crear cuenta de donaciones Widy", connect_to_existing_account: "Conectar a cuenta existente", create_donation_account_pending: "Creando cuenta de donaciones..." }, iI = { title: "Ajustes de Twitch", points_currency_ratio: "Ratio de puntos a moneda", rewards_name: "Nombre de recompensas", rewards_list: "Lista de recompensas", add_reward: "Añadir recompensa", cost: "Costo", color: "Color" }, oI = { image: "Imagen", audio: "Audio", view: "Vista", title: "Título", message: "Mensaje", test_name: "Prueba", test_text: "¡Esta es una alerta de prueba!", configure: "Configurar", test: "Probar", add_new_variant: "Añadir nueva variante", new_variant: "Nueva variante", variant_title: "Título de variante", variant_group: "Grupo de variante", status: "Estado", variation_condition: "Condición de variación", group: "Grupo", Random: "Aleatorio", AmountIsGreater: "Cantidad es mayor", AmountIsEqual: "Cantidad es igual", delete: "Eliminar", sure_delete: "¿Estás seguro de que quieres eliminar esta variación?", type: "Tipo", Donation: "Donación", Subscription: "Suscripción", Follow: "Follow", Raid: "Raid" }, sI = "General", aI = { title: "Metas", create: "Crear nueva meta" }, lI = { new: "Nueva meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progreso", goal_title: "Título de la meta", amount_raise: "Cantidad a recaudar", start_raising: "Comenzar recaudación desde", end_date: "Fecha de finalización", bar_height: "Altura de la barra", rounding_radius: "Radio de redondeo", bar_stroke_thickness: "Grosor del borde de la barra", background_bar_color: "Color de barra de fondo", progress_bar_color: "Color de barra de progreso", goal_progress_bar: "Barra de progreso de meta", progress_bar_layout: "Disposición de la barra de progreso", remaining_time: "Tiempo restante", goal_amount_limits: "Límites de cantidad de meta", widget_background: "Fondo del widget", background_color: "Color de fondo", OnTop: "Encima", Inside: "Dentro", Below: "Debajo", DoNotDisplay: "No mostrar", title: "Título", limits: "límites", raised: "Recaudado", days_left: "Días restantes", finish_goal: "Finalizar meta", sure_finish: "¿Estás seguro de que quieres finalizar esta meta?", Donation: "Donación", TwitchSubscription: "Suscripción de Twitch", TwitchFollow: "Follow de Twitch", goal_not_finished: "Tienes una meta sin finalizar de este tipo." }, uI = "Guardar", cI = "Atrás", dI = { copy: "Copiar", launch: "Lanzar", url: "URL del widget", obs_dock_url: "URL de OBS Dock" }, fI = { top: "Imagen arriba, texto abajo", bottom: "Imagen abajo, texto arriba", left: "Imagen izquierda, texto derecha", right: "Imagen derecha, texto izquierda", overlay: "Texto sobre imagen" }, pI = { show: "Mostrar imagen" }, hI = { font: "Fuente", font_size: "Tamaño de fuente", text_color: "Color del texto", bold: "Negrita", italics: "Cursiva", underline: "Subrayado", transformation: "Transformación", letter_spacing: "Espaciado de letras", word_spacing: "Espaciado de palabras", horizontal_alignment: "Alineación horizontal", vertical_alignment: "Alineación vertical", text_preview: "¡Esto es una vista previa!", name: "Nombre" }, gI = { play: "Reproducir", stop: "Detener" }, mI = "Versión", yI = { title: "Widgets", add: "Añadir widget", install: "Instalar", delete: "Eliminar", installed: "Instalado", update: "Actualizar", all: "Todos", settings: "Ajustes", control: "Control", delete_confirm: "¿Estás seguro de que quieres eliminar este widget?", invalid_manifest: "Manifiesto de widget inválido", add_confirm: "Añadir permitirá a {{widget_name}}:", installing: "Instalando...", updating: "Actualizando...", view_url: "URL de vista", widget_connection: "El widget obtiene o envía solicitudes a:" }, vI = { "widgets:messages.read": "Leer mensajes", "widgets:goals.read": "Leer metas", "widgets:auc-fighter:settings.read": "Leer ajustes de auc-fighter", "widgets:settings.read": "Leer ajustes del widget", "widgets:alerts.read": "Leer alertas", "widgets:media:settings.read": "Leer ajustes de media", "widgets:auc-fighter:match-playing.send": "Enviar combate en curso", "widgets:auc-fighter:match-winner.send": "Enviar ganador del combate", "widgets:auc-fighter:match-paused.send": "Enviar combate pausado", "widgets:auc-fighter:match-id.send": "Enviar ID del combate", "widgets:alert:played.send": "Enviar alerta reproducida", "widgets:alert:playing.send": "Enviar alerta en reproducción", "widgets:media:played.send": "Enviar media reproducida", "widgets:media:end.send": "Enviar fin de media", "widgets:media:playing.send": "Enviar media en reproducción", "widgets:media:paused.send": "Enviar media pausada", "widgets:media:error.send": "Enviar error de media", "widgets:media:replay.send": "Enviar repetición de media", "widgets:alert:replay.send": "Enviar repetición de alerta", "widgets:alert:skip.send": "Enviar salto de alerta", "widgets:messages.subscription": "Suscribirse a mensajes", "widgets:goal.subscription": "Suscribirse a meta", "widgets:settings.subscription": "Suscribirse a ajustes", "widgets:auc-fighter:start-match.subscription": "Suscribirse a inicio de combate", "widgets:auc-fighter:pause-match.subscription": "Suscribirse a pausa de combate", "widgets:auc-fighter:resume-match.subscription": "Suscribirse a reanudación de combate", "widgets:auc-fighter:cancel-match.subscription": "Suscribirse a cancelación de combate", "widgets:auc-fighter:update-match.subscription": "Suscribirse a actualización de combate", "widgets:auc-fighter:settings.subscription": "Suscribirse a ajustes de auc-fighter", "widgets:alert:replay.subscription": "Suscribirse a repetición de alerta", "widgets:alert:skip.subscription": "Suscribirse a salto de alerta", "widgets:alert:test.subscription": "Suscribirse a prueba de alerta", "widgets:alert:skip-playing.subscription": "Suscribirse a salto de alerta en reproducción", "widgets:alert:alerts.subscription": "Suscribirse a alertas", "widgets:media:replay.subscription": "Suscribirse a repetición de media", "widgets:media:settings.subscription": "Suscribirse a ajustes de media", "widgets:media:skip.subscription": "Suscribirse a salto de media", "widgets:media:skip-playing-media.subscription": "Suscribirse a salto de media en reproducción", "widgets:media:end.subscription": "Suscribirse a fin de media", "widgets:media:error.subscription": "Suscribirse a error de media", "widgets:media:pause.subscription": "Suscribirse a pausa de media", "widgets:media:play.subscription": "Suscribirse a reproducción de media", "widgets:alert:played.subscription": "Suscribirse a alerta reproducida", "widgets:view:storage.read": "Leer almacenamiento de vista del widget", "widgets:control:storage.read": "Leer almacenamiento de control del widget", "widgets:view:storage.write": "Escribir en almacenamiento de vista del widget", "widgets:control:storage.write": "Escribir en almacenamiento de control del widget", "widgets:view:storage.subscription": "Suscribirse a almacenamiento de vista del widget", "widgets:control:storage.subscription": "Suscribirse a almacenamiento de control del widget" }, wI = { title: "NSFW", nsfw_window: "Ventana NSFW", settings: "Ajustes", window: "Ventana", blur_timeout_duration: "Duración del desenfoque", confidence_threshold: "Umbral de confianza", anus: "Ano", make_love: "Hacer el amor", nipple: "Pezón", penis: "Pene", vagina: "Vagina" }, SI = {
  on: p2,
  off: h2,
  select: g2,
  success: m2,
  ok: y2,
  cancel: v2,
  sound_volume: w2,
  skip_media: S2,
  skip_alert: b2,
  none: _2,
  start: x2,
  stop: k2,
  delay: C2,
  milliseconds: E2,
  token: P2,
  overlay_id: R2,
  api_key: T2,
  disconnected: $2,
  documentation: M2,
  authorization: A2,
  error: I2,
  updater: N2,
  media: O2,
  integration: L2,
  auction: D2,
  maption: F2,
  media_settings: j2,
  dashboard: z2,
  messages: B2,
  message: W2,
  filter: U2,
  settings: V2,
  wheel: H2,
  timer: q2,
  fighter: K2,
  lot: Q2,
  bid: G2,
  lots: Y2,
  auction_settings: J2,
  lots_options: X2,
  auc_fighter_settings: Z2,
  alerts: eI,
  services: tI,
  twitch: nI,
  widy: rI,
  twitch_service_settings: iI,
  alert: oI,
  general: sI,
  goals: aI,
  goal: lI,
  save: uI,
  back: cI,
  widget: dI,
  view: fI,
  image: pI,
  text: hI,
  audio: gI,
  version: mI,
  widgets: yI,
  scopes: vI,
  nsfw: wI
}, bI = "Activé", _I = "Désactivé", xI = "Sélectionner", kI = "Succès", CI = "OK", EI = "Annuler", PI = "Volume du son", RI = "Raccourci passer le média", TI = "Raccourci passer l'alerte", $I = "Aucun", MI = "Démarrer", AI = "Arrêter", II = "Délai", NI = "ms", OI = "Token", LI = "ID Overlay", DI = "Clé API", FI = "Déconnecté", jI = "Documentation", zI = { title: "Autorisation", code: "Code de demande", sign_in: "Se connecter", phone: "Numéro de téléphone", telegram_code: "Code de Telegram", your_code: "Votre code", "2fa_password": "Mot de passe 2FA", password: "Mot de passe", streamelements: "Vous devez d'abord vous connecter avec le JWT de StreamElements", you_can_find_by_url: "Vous pouvez la trouver à cette URL", set_id_and_jwt: "Vous devez définir l'ID de compte StreamElements et le JWT pour {{service}}" }, BI = { wrong_lots_format: "Format des lots incorrect", not_connected: "Non connecté", request_error: "Erreur de requête" }, WI = { title: "Mise à jour", description: "Une nouvelle version de l'application est disponible. Voulez-vous la mettre à jour ?", update: "Mettre à jour", later: "Plus tard", downloading: "Téléchargement en cours..." }, UI = { title: "Média", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, VI = { tribute: "Afficher les messages de tribut" }, HI = { lots: "Lots", wheel: "Roue", settings: "Paramètres" }, qI = { set_point: "Définir le point", meter_price: "Prix par mètre", amount: "Montant", finish: "Terminer", lat_error: "La latitude doit être comprise entre -90 et 90", lng_error: "La longitude doit être comprise entre -180 et 180", rules: "Pour que le pointeur change automatiquement de position dans le message, il ne doit y avoir qu'un seul mot parmi :" }, KI = { enabled: "Activé", min_amount: "Montant minimum", video_volume: "Volume vidéo", min_views: "Vues minimum" }, QI = { messages: "Messages", settings: "Paramètres", services: "Services", alerts: "Alertes", media: "Média", goals: "Objectifs", auction: "Enchères", maption: "Maption", fighter: "Combattant", widgets: "Widgets", info: "Info", nsfw: "NSFW" }, GI = { title: "Derniers messages" }, YI = { skip: "Passer", replay: "Rejouer", donated: "{{user_name}} a donné {{amount}}{{currency}}", followed: "{{user_name}} s'est abonné", subscribed: "{{user_name}} s'est abonné", gifted_subscriptions: "{{user_name}} a offert {{total}} abonnements", raided_with: "{{user_name}} a raidé avec {{viewers}} viewers" }, JI = { title: "Filtrer les messages", exclude_donations: "Exclure les dons", exclude_follows: "Exclure les follows", exclude_subscriptions: "Exclure les abonnements", exclude_raids: "Exclure les raids" }, XI = { title: "Paramètres", pause: "Mettre en pause les alertes", moderation_duration: "Durée de modération", black_list: "Liste noire", remove_links: "Supprimer les liens", language: "Langue", sec: "sec", currency: "Devise", tts_type: "Type de TTS" }, ZI = { normal: "Normal", dropout: "Dropout", spin: "Tourner", speed: "Vitesse de la roue" }, eN = { continue: "Continuer", pause: "Pause", reset: "Réinitialiser", add_time: "Ajouter du temps", reduce_time: "Réduire le temps", add_timex2: "Ajouter du temps x2" }, tN = { title: "Combattant", match: "Match", final: "Finale", game: "Partie", cancel: "Annuler la partie", winner: "Vainqueur", settings: "Paramètres", create_game: "Créer une partie depuis les lots", start: "Démarrer", pause: "Pause", rematch: "Revanche", resume: "Reprendre" }, nN = { name: "Nom", delete: "Supprimer", add: "Ajouter un montant" }, rN = { delete: "Supprimer", to_lot: "Vers le lot", new: "Nouveau", add_to_random_slot: "Ajouter à un lot aléatoire" }, iN = { add: "Ajouter", new_lot_name: "Nom du nouveau lot", search: "Rechercher un lot", total: "Total" }, oN = { leader_change: "Changement de leader", new_lot: "Nouveau lot", new_donation: "Nouveau don", show_odds: "Afficher les cotes", show_total_sum: "Afficher la somme totale", greater_timer_adding_time: "Ajout de temps pour timer supérieur", not_add_time_if: "Ne pas ajouter de temps si", adding_time: "Temps" }, sN = { import_lots: "Importer des lots", clear_lots: "Vider les lots" }, aN = { round_duration: "Durée du round", add_players: "Ajouter des joueurs" }, lN = { title: "Alertes", group: "Groupe" }, uN = { title: "Services", tribute: "Tribute", streamelements: "StreamElements", connect: "Connecter", integrations: "Intégrations", sign_out: "Se déconnecter", confirm_sign_out: "Êtes-vous sûr de vouloir vous déconnecter de ce service ?" }, cN = { device_code_expired: "Code appareil expiré. Veuillez réessayer.", user_code: "Code utilisateur", authorize_with_code: "Autoriser avec le code", waiting_authorization: "En attente d'autorisation..." }, dN = { donation_account_name: "Nom du compte de dons", donation_url: "URL de don", create_donation_account: "Créer un compte de dons Widy", connect_to_existing_account: "Se connecter à un compte existant", create_donation_account_pending: "Création du compte de dons..." }, fN = { title: "Paramètres Twitch", points_currency_ratio: "Ratio points/devise", rewards_name: "Nom des récompenses", rewards_list: "Liste des récompenses", add_reward: "Ajouter une récompense", cost: "Coût", color: "Couleur" }, pN = { image: "Image", audio: "Audio", view: "Vue", title: "Titre", message: "Message", test_name: "Test", test_text: "Ceci est une alerte de test !", configure: "Configurer", test: "Tester", add_new_variant: "Ajouter une nouvelle variante", new_variant: "Nouvelle variante", variant_title: "Titre de la variante", variant_group: "Groupe de variante", status: "Statut", variation_condition: "Condition de variation", group: "Groupe", Random: "Aléatoire", AmountIsGreater: "Le montant est supérieur à", AmountIsEqual: "Le montant est égal à", delete: "Supprimer", sure_delete: "Êtes-vous sûr de vouloir supprimer cette variation ?", type: "Type", Donation: "Don", Subscription: "Abonnement", Follow: "Follow", Raid: "Raid" }, hN = "Général", gN = { title: "Objectifs", create: "Créer un nouvel objectif" }, mN = { new: "Nouvel objectif", goal: "Objectif", type: "Type", elements: "Éléments", progress: "Progression", goal_title: "Titre de l'objectif", amount_raise: "Montant à collecter", start_raising: "Commencer la collecte à", end_date: "Date de fin de l'objectif", bar_height: "Hauteur de la barre", rounding_radius: "Rayon d'arrondi", bar_stroke_thickness: "Épaisseur du contour de la barre", background_bar_color: "Couleur de la barre d'arrière-plan", progress_bar_color: "Couleur de la barre de progression", goal_progress_bar: "Barre de progression de l'objectif", progress_bar_layout: "Disposition de la barre de progression", remaining_time: "Temps restant", goal_amount_limits: "Limites de montant de l'objectif", widget_background: "Arrière-plan du widget", background_color: "Couleur d'arrière-plan", OnTop: "Au-dessus", Inside: "À l'intérieur", Below: "En dessous", DoNotDisplay: "Ne pas afficher", title: "Titre", limits: "limites", raised: "Collecté", days_left: "Jours restants", finish_goal: "Terminer l'objectif", sure_finish: "Êtes-vous sûr de vouloir terminer cet objectif ?", Donation: "Don", TwitchSubscription: "Abonnement Twitch", TwitchFollow: "Follow Twitch", goal_not_finished: "Vous avez un objectif inachevé de ce type." }, yN = "Enregistrer", vN = "Retour", wN = { copy: "Copier", launch: "Lancer", url: "URL du widget", obs_dock_url: "URL OBS Dock" }, SN = { top: "Image en haut, texte en bas", bottom: "Image en bas, texte en haut", left: "Image à gauche, texte à droite", right: "Image à droite, texte à gauche", overlay: "Texte en superposition sur l'image" }, bN = { show: "Afficher l'image" }, _N = { font: "Police", font_size: "Taille de police", text_color: "Couleur du texte", bold: "Gras", italics: "Italique", underline: "Souligné", transformation: "Transformation", letter_spacing: "Espacement des lettres", word_spacing: "Espacement des mots", horizontal_alignment: "Alignement horizontal", vertical_alignment: "Alignement vertical", text_preview: "Ceci est un aperçu !", name: "Nom" }, xN = { play: "Jouer", stop: "Arrêter" }, kN = "Version", CN = { title: "Widgets", add: "Ajouter un widget", install: "Installer", delete: "Supprimer", installed: "Installé", update: "Mettre à jour", all: "Tous", settings: "Paramètres", control: "Contrôle", delete_confirm: "Êtes-vous sûr de vouloir supprimer ce widget ?", invalid_manifest: "Manifeste du widget invalide", add_confirm: "L'ajout permettra à {{widget_name}} de :", installing: "Installation en cours...", updating: "Mise à jour en cours...", view_url: "URL de vue", widget_connection: "Le widget peut envoyer/recevoir des requêtes vers :" }, EN = { "widgets:messages.read": "Lire les messages", "widgets:goals.read": "Lire les objectifs", "widgets:auc-fighter:settings.read": "Lire les paramètres auc-fighter", "widgets:settings.read": "Lire les paramètres du widget", "widgets:alerts.read": "Lire les alertes", "widgets:media:settings.read": "Lire les paramètres média", "widgets:auc-fighter:match-playing.send": "Envoyer match en cours", "widgets:auc-fighter:match-winner.send": "Envoyer vainqueur du match", "widgets:auc-fighter:match-paused.send": "Envoyer match en pause", "widgets:auc-fighter:match-id.send": "Envoyer l'ID du match", "widgets:alert:played.send": "Envoyer alerte jouée", "widgets:alert:playing.send": "Envoyer alerte en cours", "widgets:media:played.send": "Envoyer média joué", "widgets:media:end.send": "Envoyer fin du média", "widgets:media:playing.send": "Envoyer média en cours", "widgets:media:paused.send": "Envoyer média en pause", "widgets:media:error.send": "Envoyer erreur média", "widgets:media:replay.send": "Envoyer relecture média", "widgets:alert:replay.send": "Envoyer relecture alerte", "widgets:alert:skip.send": "Envoyer passer l'alerte", "widgets:messages.subscription": "S'abonner aux messages", "widgets:goal.subscription": "S'abonner aux objectifs", "widgets:settings.subscription": "S'abonner aux paramètres", "widgets:auc-fighter:start-match.subscription": "S'abonner au démarrage du match", "widgets:auc-fighter:pause-match.subscription": "S'abonner à la pause du match", "widgets:auc-fighter:resume-match.subscription": "S'abonner à la reprise du match", "widgets:auc-fighter:cancel-match.subscription": "S'abonner à l'annulation du match", "widgets:auc-fighter:update-match.subscription": "S'abonner à la mise à jour du match", "widgets:auc-fighter:settings.subscription": "S'abonner aux paramètres auc-fighter", "widgets:alert:replay.subscription": "S'abonner à la relecture d'alerte", "widgets:alert:skip.subscription": "S'abonner au passage d'alerte", "widgets:alert:test.subscription": "S'abonner aux tests d'alerte", "widgets:alert:skip-playing.subscription": "S'abonner au passage d'alerte en cours", "widgets:alert:alerts.subscription": "S'abonner aux alertes", "widgets:media:replay.subscription": "S'abonner à la relecture média", "widgets:media:settings.subscription": "S'abonner aux paramètres média", "widgets:media:skip.subscription": "S'abonner au passage de média", "widgets:media:skip-playing-media.subscription": "S'abonner au passage de média en cours", "widgets:media:end.subscription": "S'abonner à la fin du média", "widgets:media:error.subscription": "S'abonner aux erreurs média", "widgets:media:pause.subscription": "S'abonner à la pause média", "widgets:media:play.subscription": "S'abonner à la lecture média", "widgets:alert:played.subscription": "S'abonner aux alertes jouées", "widgets:view:storage.read": "Lire le stockage vue du widget", "widgets:control:storage.read": "Lire le stockage contrôle du widget", "widgets:view:storage.write": "Écrire dans le stockage vue du widget", "widgets:control:storage.write": "Écrire dans le stockage contrôle du widget", "widgets:view:storage.subscription": "S'abonner au stockage vue du widget", "widgets:control:storage.subscription": "S'abonner au stockage contrôle du widget" }, PN = { title: "NSFW", nsfw_window: "Fenêtre NSFW", settings: "Paramètres", window: "Fenêtre", blur_timeout_duration: "Durée du flou", confidence_threshold: "Seuil de confiance", anus: "Anus", make_love: "Rapport sexuel", nipple: "Mamelon", penis: "Pénis", vagina: "Vagin" }, RN = {
  on: bI,
  off: _I,
  select: xI,
  success: kI,
  ok: CI,
  cancel: EI,
  sound_volume: PI,
  skip_media: RI,
  skip_alert: TI,
  none: $I,
  start: MI,
  stop: AI,
  delay: II,
  milliseconds: NI,
  token: OI,
  overlay_id: LI,
  api_key: DI,
  disconnected: FI,
  documentation: jI,
  authorization: zI,
  error: BI,
  updater: WI,
  media: UI,
  integration: VI,
  auction: HI,
  maption: qI,
  media_settings: KI,
  dashboard: QI,
  messages: GI,
  message: YI,
  filter: JI,
  settings: XI,
  wheel: ZI,
  timer: eN,
  fighter: tN,
  lot: nN,
  bid: rN,
  lots: iN,
  auction_settings: oN,
  lots_options: sN,
  auc_fighter_settings: aN,
  alerts: lN,
  services: uN,
  twitch: cN,
  widy: dN,
  twitch_service_settings: fN,
  alert: pN,
  general: hN,
  goals: gN,
  goal: mN,
  save: yN,
  back: vN,
  widget: wN,
  view: SN,
  image: bN,
  text: _N,
  audio: xN,
  version: kN,
  widgets: CN,
  scopes: EN,
  nsfw: PN
}, TN = "चालू", $N = "बंद", MN = "चुनें", AN = "सफल", IN = "ठीक है", NN = "रद्द करें", ON = "ध्वनि वॉल्यूम", LN = "मीडिया स्किप शॉर्टकट", DN = "अलर्ट स्किप शॉर्टकट", FN = "कोई नहीं", jN = "शुरू करें", zN = "रोकें", BN = "देरी", WN = "मिलीसेकंड", UN = "टोकन", VN = "ओवरले आईडी", HN = "एपीआई कुंजी", qN = "डिस्कनेक्टेड", KN = "दस्तावेज़ीकरण", QN = { title: "अधिकारिकरण", code: "कोड का अनुरोध करें", sign_in: "साइन इन करें", phone: "फ़ोन नंबर", telegram_code: "टेलीग्राम से कोड", your_code: "आपका कोड", "2fa_password": "2FA पासवर्ड", password: "पासवर्ड", streamelements: "सबसे पहले StreamElements JWT से कनेक्ट करें", you_can_find_by_url: "आप इसे इस URL से ढूंढ सकते हैं", set_id_and_jwt: "{{service}} के लिए StreamElements अकाउंट ID और JWT सेट करें" }, GN = { wrong_lots_format: "गलत लॉट फॉर्मेट", not_connected: "कनेक्ट नहीं है", request_error: "अनुरोध त्रुटि" }, YN = { title: "अपडेट", description: "ऐप का नया वर्जन उपलब्ध है। क्या आप अपडेट करना चाहते हैं?", update: "अपडेट करें", later: "बाद में", downloading: "डाउनलोड हो रहा है..." }, JN = { title: "मीडिया", youtube: "यूट्यूब", twitch: "ट्विच", tiktok: "टिकटॉक" }, XN = { tribute: "ट्रिब्यूट संदेश दिखाएं" }, ZN = { lots: "लॉट्स", wheel: "व्हील", settings: "सेटिंग्स" }, eO = { set_point: "पॉइंट सेट करें", meter_price: "1 मीटर का मूल्य", amount: "राशि", finish: "समाप्त करें", lat_error: "अक्षांश -90 से 90 के बीच होना चाहिए", lng_error: "देशांतर -180 से 180 के बीच होना चाहिए", rules: "पॉइंटर को मैसेज में ऑटोमैटिकली पोजीशन बदलने के लिए इसमें सिर्फ एक शब्द होना चाहिए:" }, tO = { enabled: "सक्रिय", min_amount: "न्यूनतम राशि", video_volume: "वीडियो वॉल्यूम", min_views: "न्यूनतम व्यूज" }, nO = { messages: "संदेश", settings: "सेटिंग्स", services: "सेवाएं", alerts: "अलर्ट्स", media: "मीडिया", goals: "लक्ष्य", auction: "नीलामी", maption: "मैप्शन", fighter: "फाइटर", widgets: "विजेट्स", info: "जानकारी", nsfw: "NSFW" }, rO = { title: "अंतिम संदेश" }, iO = { skip: "स्किप करें", replay: "रीप्ले", donated: "{{user_name}} ने {{amount}}{{currency}} दान किया", followed: "{{user_name}} ने फॉलो किया", subscribed: "{{user_name}} ने सब्सक्राइब किया", gifted_subscriptions: "{{user_name}} ने {{total}} सब्सक्रिप्शन गिफ्ट किए", raided_with: "{{user_name}} ने {{viewers}} व्यूअर्स के साथ रेड किया" }, oO = { title: "संदेश फ़िल्टर करें", exclude_donations: "दान को बाहर करें", exclude_follows: "फॉलो को बाहर करें", exclude_subscriptions: "सब्सक्रिप्शन को बाहर करें", exclude_raids: "रेड को बाहर करें" }, sO = { title: "सेटिंग्स", pause: "अलर्ट संदेश रोकें", moderation_duration: "मॉडरेशन अवधि", black_list: "ब्लैक लिस्ट", remove_links: "लिंक्स हटाएं", language: "भाषा", sec: "सेकंड", currency: "मुद्रा", tts_type: "TTS प्रकार" }, aO = { normal: "नॉर्मल", dropout: "ड्रॉपआउट", spin: "स्पिन", speed: "व्हील की स्पीड" }, lO = { continue: "जारी रखें", pause: "रोकें", reset: "रीसेट करें", add_time: "समय जोड़ें", reduce_time: "समय घटाएं", add_timex2: "समय x2 जोड़ें" }, uO = { title: "फाइटर", match: "मैच", final: "फाइनल", game: "गेम", cancel: "गेम रद्द करें", winner: "विजेता", settings: "सेटिंग्स", create_game: "लॉट्स से गेम बनाएं", start: "शुरू करें", pause: "रोकें", rematch: "रीमैच", resume: "फिर से शुरू करें" }, cO = { name: "नाम", delete: "हटाएं", add: "राशि जोड़ें" }, dO = { delete: "हटाएं", to_lot: "लॉट में", new: "नया", add_to_random_slot: "रैंडम लॉट में जोड़ें" }, fO = { add: "जोड़ें", new_lot_name: "नया लॉट नाम", search: "लॉट खोजें", total: "कुल" }, pO = { leader_change: "लीडर बदलाव", new_lot: "नया लॉट", new_donation: "नया दान", show_odds: "ऑड्स दिखाएं", show_total_sum: "कुल राशि दिखाएं", greater_timer_adding_time: "बड़ी टाइमर पर समय जोड़ना", not_add_time_if: "समय न जोड़ें अगर", adding_time: "समय" }, hO = { import_lots: "लॉट्स आयात करें", clear_lots: "लॉट्स साफ करें" }, gO = { round_duration: "राउंड अवधि", add_players: "खिलाड़ी जोड़ें" }, mO = { title: "अलर्ट्स", group: "समूह" }, yO = { title: "सेवाएं", tribute: "ट्रिब्यूट", streamelements: "StreamElements", connect: "कनेक्ट करें", integrations: "इंटीग्रेशन्स", sign_out: "साइन आउट", confirm_sign_out: "क्या आप वाकई इस सेवा से साइन आउट करना चाहते हैं?" }, vO = { device_code_expired: "डिवाइस कोड समाप्त हो गया। कृपया फिर से प्रयास करें।", user_code: "यूजर कोड", authorize_with_code: "कोड से अधिकृत करें", waiting_authorization: "अधिकारिकरण का इंतजार है..." }, wO = { donation_account_name: "दान अकाउंट का नाम", donation_url: "दान URL", create_donation_account: "Widy दान अकाउंट बनाएं", connect_to_existing_account: "मौजूदा अकाउंट से कनेक्ट करें", create_donation_account_pending: "दान अकाउंट बनाया जा रहा है..." }, SO = { title: "Twitch सेटिंग्स", points_currency_ratio: "पॉइंट्स मुद्रा अनुपात", rewards_name: "रिवॉर्ड नाम", rewards_list: "रिवॉर्ड्स सूची", add_reward: "रिवॉर्ड जोड़ें", cost: "लागत", color: "रंग" }, bO = { image: "इमेज", audio: "ऑडियो", view: "व्यू", title: "शीर्षक", message: "संदेश", test_name: "टेस्ट", test_text: "यह एक टेस्ट अलर्ट है!", configure: "कॉन्फ़िगर करें", test: "टेस्ट", add_new_variant: "नया वेरिएंट जोड़ें", new_variant: "नया वेरिएंट", variant_title: "वेरिएंट शीर्षक", variant_group: "वेरिएंट समूह", status: "स्थिति", variation_condition: "वेरिएशन शर्त", group: "समूह", Random: "रैंडम", AmountIsGreater: "राशि इससे अधिक है", AmountIsEqual: "राशि बराबर है", delete: "हटाएं", sure_delete: "क्या आप वाकई इस वेरिएशन को हटाना चाहते हैं?", type: "प्रकार", Donation: "दान", Subscription: "सब्सक्रिप्शन", Follow: "फॉलो", Raid: "रेड" }, _O = "सामान्य", xO = { title: "लक्ष्य", create: "नया लक्ष्य बनाएं" }, kO = { new: "नया लक्ष्य", goal: "लक्ष्य", type: "प्रकार", elements: "तत्व", progress: "प्रगति", goal_title: "लक्ष्य शीर्षक", amount_raise: "एकत्र करने की राशि", start_raising: "इससे शुरू करें", end_date: "लक्ष्य समाप्ति तिथि", bar_height: "बार की ऊंचाई", rounding_radius: "गोलाई त्रिज्या", bar_stroke_thickness: "बार स्ट्रोक मोटाई", background_bar_color: "बैकग्राउंड बार रंग", progress_bar_color: "प्रगति बार रंग", goal_progress_bar: "लक्ष्य प्रगति बार", progress_bar_layout: "प्रगति बार लेआउट", remaining_time: "बाकी समय", goal_amount_limits: "लक्ष्य राशि सीमा", widget_background: "विजेट बैकग्राउंड", background_color: "बैकग्राउंड रंग", OnTop: "ऊपर", Inside: "अंदर", Below: "नीचे", DoNotDisplay: "न दिखाएं", title: "शीर्षक", limits: "सीमाएं", raised: "एकत्र", days_left: "बचे दिन", finish_goal: "लक्ष्य पूरा करें", sure_finish: "क्या आप वाकई यह लक्ष्य पूरा करना चाहते हैं?", Donation: "दान", TwitchSubscription: "Twitch सब्सक्रिप्शन", TwitchFollow: "Twitch फॉलो", goal_not_finished: "इस प्रकार का एक अधूरा लक्ष्य पहले से मौजूद है।" }, CO = "सेव करें", EO = "वापस", PO = { copy: "कॉपी करें", launch: "लॉन्च करें", url: "विजेट URL", obs_dock_url: "OBS डॉक URL" }, RO = { top: "इमेज ऊपर, टेक्स्ट नीचे", bottom: "इमेज नीचे, टेक्स्ट ऊपर", left: "इमेज बाएं, टेक्स्ट दाएं", right: "इमेज दाएं, टेक्स्ट बाएं", overlay: "टेक्स्ट इमेज पर ओवरले" }, TO = { show: "इमेज दिखाएं" }, $O = { font: "फॉन्ट", font_size: "फॉन्ट साइज", text_color: "टेक्स्ट रंग", bold: "बोल्ड", italics: "इटैलिक", underline: "अंडरलाइन", transformation: "ट्रांसफॉर्मेशन", letter_spacing: "अक्षर स्पेसिंग", word_spacing: "शब्द स्पेसिंग", horizontal_alignment: "क्षैतिज संरेखण", vertical_alignment: "ऊर्ध्वाधर संरेखण", text_preview: "यह एक पूर्वावलोकन है!", name: "नाम" }, MO = { play: "चलाएं", stop: "रोकें" }, AO = "वर्जन", IO = { title: "विजेट्स", add: "विजेट जोड़ें", install: "इंस्टॉल करें", delete: "हटाएं", installed: "इंस्टॉल किया गया", update: "अपडेट करें", all: "सभी", settings: "सेटिंग्स", control: "कंट्रोल", delete_confirm: "क्या आप वाकई इस विजेट को हटाना चाहते हैं?", invalid_manifest: "अमान्य विजेट मैनिफेस्ट", add_confirm: "जोड़ने से {{widget_name}} को निम्नलिखित की अनुमति मिलेगी:", installing: "इंस्टॉल हो रहा है...", updating: "अपडेट हो रहा है...", view_url: "व्यू URL", widget_connection: "विजेट को अनुरोध भेजने/प्राप्त करने की अनुमति:" }, NO = { "widgets:messages.read": "संदेश पढ़ें", "widgets:goals.read": "लक्ष्य पढ़ें", "widgets:auc-fighter:settings.read": "auc-fighter सेटिंग्स पढ़ें", "widgets:settings.read": "विजेट सेटिंग्स पढ़ें", "widgets:alerts.read": "अलर्ट्स पढ़ें", "widgets:media:settings.read": "मीडिया सेटिंग्स पढ़ें", "widgets:auc-fighter:match-playing.send": "मैच चल रहा है भेजें", "widgets:auc-fighter:match-winner.send": "मैच विजेता भेजें", "widgets:auc-fighter:match-paused.send": "मैच रोका गया भेजें", "widgets:auc-fighter:match-id.send": "मैच ID भेजें", "widgets:alert:played.send": "अलर्ट प्ले किया गया भेजें", "widgets:alert:playing.send": "अलर्ट चल रहा है भेजें", "widgets:media:played.send": "मीडिया प्ले किया गया भेजें", "widgets:media:end.send": "मीडिया समाप्त भेजें", "widgets:media:playing.send": "मीडिया चल रहा है भेजें", "widgets:media:paused.send": "मीडिया रोका गया भेजें", "widgets:media:error.send": "मीडिया त्रुटि भेजें", "widgets:media:replay.send": "मीडिया रिप्ले भेजें", "widgets:alert:replay.send": "अलर्ट रिप्ले भेजें", "widgets:alert:skip.send": "अलर्ट स्किप भेजें", "widgets:messages.subscription": "संदेश सब्सक्राइब करें", "widgets:goal.subscription": "लक्ष्य सब्सक्राइब करें", "widgets:settings.subscription": "सेटिंग्स सब्सक्राइब करें", "widgets:auc-fighter:start-match.subscription": "मैच शुरू सब्सक्राइब करें", "widgets:auc-fighter:pause-match.subscription": "मैच रोकें सब्सक्राइब करें", "widgets:auc-fighter:resume-match.subscription": "मैच जारी सब्सक्राइब करें", "widgets:auc-fighter:cancel-match.subscription": "मैच रद्द सब्सक्राइब करें", "widgets:auc-fighter:update-match.subscription": "मैच अपडेट सब्सक्राइब करें", "widgets:auc-fighter:settings.subscription": "auc-fighter सेटिंग्स सब्सक्राइब करें", "widgets:alert:replay.subscription": "अलर्ट रिप्ले सब्सक्राइब करें", "widgets:alert:skip.subscription": "अलर्ट स्किप सब्सक्राइब करें", "widgets:alert:test.subscription": "अलर्ट टेस्ट सब्सक्राइब करें", "widgets:alert:skip-playing.subscription": "अलर्ट चलते स्किप सब्सक्राइब करें", "widgets:alert:alerts.subscription": "अलर्ट्स सब्सक्राइब करें", "widgets:media:replay.subscription": "मीडिया रिप्ले सब्सक्राइब करें", "widgets:media:settings.subscription": "मीडिया सेटिंग्स सब्सक्राइब करें", "widgets:media:skip.subscription": "मीडिया स्किप सब्सक्राइब करें", "widgets:media:skip-playing-media.subscription": "चलते मीडिया स्किप सब्सक्राइब करें", "widgets:media:end.subscription": "मीडिया समाप्त सब्सक्राइब करें", "widgets:media:error.subscription": "मीडिया त्रुटि सब्सक्राइब करें", "widgets:media:pause.subscription": "मीडिया रोकें सब्सक्राइब करें", "widgets:media:play.subscription": "मीडिया चलाएं सब्सक्राइब करें", "widgets:alert:played.subscription": "अलर्ट प्ले किया गया सब्सक्राइब करें", "widgets:view:storage.read": "विजेट व्यू स्टोरेज पढ़ें", "widgets:control:storage.read": "विजेट कंट्रोल स्टोरेज पढ़ें", "widgets:view:storage.write": "विजेट व्यू स्टोरेज में लिखें", "widgets:control:storage.write": "विजेट कंट्रोल स्टोरेज में लिखें", "widgets:view:storage.subscription": "विजेट व्यू स्टोरेज सब्सक्राइब करें", "widgets:control:storage.subscription": "विजेट कंट्रोल स्टोरेज सब्सक्राइब करें" }, OO = { title: "NSFW", nsfw_window: "NSFW विंडो", settings: "सेटिंग्स", window: "विंडो", blur_timeout_duration: "ब्लर टाइमआउट अवधि", confidence_threshold: "कॉन्फिडेंस थ्रेशोल्ड", anus: "गुदा", make_love: "संभोग", nipple: "स्तनाग्र", penis: "लिंग", vagina: "योनि" }, LO = {
  on: TN,
  off: $N,
  select: MN,
  success: AN,
  ok: IN,
  cancel: NN,
  sound_volume: ON,
  skip_media: LN,
  skip_alert: DN,
  none: FN,
  start: jN,
  stop: zN,
  delay: BN,
  milliseconds: WN,
  token: UN,
  overlay_id: VN,
  api_key: HN,
  disconnected: qN,
  documentation: KN,
  authorization: QN,
  error: GN,
  updater: YN,
  media: JN,
  integration: XN,
  auction: ZN,
  maption: eO,
  media_settings: tO,
  dashboard: nO,
  messages: rO,
  message: iO,
  filter: oO,
  settings: sO,
  wheel: aO,
  timer: lO,
  fighter: uO,
  lot: cO,
  bid: dO,
  lots: fO,
  auction_settings: pO,
  lots_options: hO,
  auc_fighter_settings: gO,
  alerts: mO,
  services: yO,
  twitch: vO,
  widy: wO,
  twitch_service_settings: SO,
  alert: bO,
  general: _O,
  goals: xO,
  goal: kO,
  save: CO,
  back: EO,
  widget: PO,
  view: RO,
  image: TO,
  text: $O,
  audio: MO,
  version: AO,
  widgets: IO,
  scopes: NO,
  nsfw: OO
}, DO = "Ligado", FO = "Desligado", jO = "Selecionar", zO = "Sucesso", BO = "Ok", WO = "Cancelar", UO = "Volume do som", VO = "Atalho pular mídia", HO = "Atalho pular alerta", qO = "Nenhum", KO = "Iniciar", QO = "Parar", GO = "Atraso", YO = "ms", JO = "Token", XO = "ID do Overlay", ZO = "Chave API", eL = "Desconectado", tL = "Documentação", nL = { title: "Autorização", code: "Solicitar código", sign_in: "Entrar", phone: "Número de telefone", telegram_code: "Código do Telegram", your_code: "Seu código", "2fa_password": "Senha 2FA", password: "Senha", streamelements: "Você precisa conectar com o JWT do StreamElements primeiro", you_can_find_by_url: "Você pode encontrar em", set_id_and_jwt: "Você precisa definir o ID da conta e JWT do StreamElements para {{service}}" }, rL = { wrong_lots_format: "Formato de lotes incorreto", not_connected: "Não conectado", request_error: "Erro na requisição" }, iL = { title: "Atualização", description: "Uma nova versão do aplicativo está disponível. Deseja atualizar?", update: "Atualizar", later: "Mais tarde", downloading: "Baixando..." }, oL = { title: "Mídia", youtube: "Youtube", twitch: "Twitch", tiktok: "Tiktok" }, sL = { tribute: "Exibir mensagens de tributo" }, aL = { lots: "Lotes", wheel: "Roleta", settings: "Configurações" }, lL = { set_point: "Definir ponto", meter_price: "Preço por 1 metro", amount: "Quantidade", finish: "Finalizar", lat_error: "A latitude deve estar entre -90 e 90", lng_error: "A longitude deve estar entre -180 e 180", rules: "Para o ponteiro mudar automaticamente de posição na mensagem deve haver apenas uma palavra de:" }, uL = { enabled: "Ativado", min_amount: "Valor mínimo", video_volume: "Volume do vídeo", min_views: "Visualizações mínimas" }, cL = { messages: "Mensagens", settings: "Configurações", services: "Serviços", alerts: "Alertas", media: "Mídia", goals: "Metas", auction: "Leilão", maption: "Maption", fighter: "Fighter", widgets: "Widgets", info: "Informações", nsfw: "NSFW" }, dL = { title: "Últimas mensagens" }, fL = { skip: "Pular", replay: "Reproduzir novamente", donated: "{{user_name}} doou {{amount}}{{currency}}", followed: "{{user_name}} seguiu", subscribed: "{{user_name}} assinou", gifted_subscriptions: "{{user_name}} presenteou {{total}} assinaturas", raided_with: "{{user_name}} raidou com {{viewers}} espectadores" }, pL = { title: "Filtrar mensagens", exclude_donations: "Excluir doações", exclude_follows: "Excluir follows", exclude_subscriptions: "Excluir assinaturas", exclude_raids: "Excluir raids" }, hL = { title: "Configurações", pause: "Pausar mensagens de alerta", moderation_duration: "Duração da moderação", black_list: "Lista negra", remove_links: "Remover links", language: "Idioma", sec: "Seg", currency: "Moeda", tts_type: "Tipo de TTS" }, gL = { normal: "Normal", dropout: "Dropout", spin: "Girar", speed: "Velocidade da roleta" }, mL = { continue: "Continuar", pause: "Pausar", reset: "Resetar", add_time: "Adicionar tempo", reduce_time: "Reduzir tempo", add_timex2: "Adicionar tempo x2" }, yL = { title: "Fighter", match: "Partida", final: "Final", game: "Jogo", cancel: "Cancelar jogo", winner: "Vencedor", settings: "Configurações", create_game: "Criar jogo a partir dos lotes", start: "Iniciar", pause: "Pausar", rematch: "Revanche", resume: "Retomar" }, vL = { name: "Nome", delete: "Excluir", add: "Adicionar quantidade" }, wL = { delete: "Excluir", to_lot: "Para o lote", new: "Novo", add_to_random_slot: "Adicionar a lote aleatório" }, SL = { add: "Adicionar", new_lot_name: "Nome do novo lote", search: "Buscar lote", total: "Total" }, bL = { leader_change: "Mudança de líder", new_lot: "Novo lote", new_donation: "Nova doação", show_odds: "Mostrar probabilidades", show_total_sum: "Mostrar soma total", greater_timer_adding_time: "Tempo adicional do timer maior", not_add_time_if: "Não adicionar tempo se", adding_time: "Tempo" }, _L = { import_lots: "Importar lotes", clear_lots: "Limpar lotes" }, xL = { round_duration: "Duração da rodada", add_players: "Adicionar jogadores" }, kL = { title: "Alertas", group: "Grupo" }, CL = { title: "Serviços", tribute: "Tributo", streamelements: "Streamelements", connect: "Conectar", integrations: "Integrações", sign_out: "Sair", confirm_sign_out: "Tem certeza que deseja sair deste serviço?" }, EL = { device_code_expired: "Código do dispositivo expirou. Tente novamente.", user_code: "Código do usuário", authorize_with_code: "Autorizar com código", waiting_authorization: "Aguardando autorização..." }, PL = { donation_account_name: "Nome da conta de doações", donation_url: "URL de doação", create_donation_account: "Criar conta de doação Widy", connect_to_existing_account: "Conectar a uma conta existente", create_donation_account_pending: "Criando conta de doação..." }, RL = { title: "Configurações do Twitch", points_currency_ratio: "Taxa de pontos para moeda", rewards_name: "Nome das recompensas", rewards_list: "Lista de recompensas", add_reward: "Adicionar recompensa", cost: "Custo", color: "Cor" }, TL = { image: "Imagem", audio: "Áudio", view: "Visualização", title: "Título", message: "Mensagem", test_name: "Teste", test_text: "Este é um alerta de teste!", configure: "Configurar", test: "Testar", add_new_variant: "Adicionar nova variante", new_variant: "Nova variante", variant_title: "Título da variante", variant_group: "Grupo da variante", status: "Status", variation_condition: "Condição da variação", group: "Grupo", Random: "Aleatório", AmountIsGreater: "Valor é maior", AmountIsEqual: "Valor é igual", delete: "Excluir", sure_delete: "Tem certeza que deseja excluir esta variação?", type: "Tipo", Donation: "Doação", Subscription: "Assinatura", Follow: "Follow", Raid: "Raid" }, $L = "Geral", ML = { title: "Metas", create: "Criar nova meta" }, AL = { new: "Nova meta", goal: "Meta", type: "Tipo", elements: "Elementos", progress: "Progresso", goal_title: "Título da meta", amount_raise: "Valor a arrecadar", start_raising: "Iniciar arrecadação a partir de", end_date: "Data final da meta", bar_height: "Altura da barra", rounding_radius: "Raio de arredondamento", bar_stroke_thickness: "Espessura do traço da barra", background_bar_color: "Cor da barra de fundo", progress_bar_color: "Cor da barra de progresso", goal_progress_bar: "Barra de progresso da meta", progress_bar_layout: "Layout da barra de progresso", remaining_time: "Tempo restante", goal_amount_limits: "Limites de valor da meta", widget_background: "Fundo do widget", background_color: "Cor de fundo", OnTop: "Acima", Inside: "Dentro", Below: "Abaixo", DoNotDisplay: "Não exibir", title: "Título", limits: "limites", raised: "Arrecadado", days_left: "Dias restantes", finish_goal: "Finalizar meta", sure_finish: "Tem certeza que deseja finalizar esta meta?", Donation: "Doação", TwitchSubscription: "Assinatura Twitch", TwitchFollow: "Follow Twitch", goal_not_finished: "Você tem uma meta inacabada deste tipo." }, IL = "Salvar", NL = "Voltar", OL = { copy: "Copiar", launch: "Lançar", url: "URL do Widget", obs_dock_url: "URL do dock OBS" }, LL = { top: "Imagem acima, texto abaixo", bottom: "Imagem abaixo, texto acima", left: "Imagem à esquerda, texto à direita", right: "Imagem à direita, texto à esquerda", overlay: "Texto sobreposto na imagem" }, DL = { show: "Mostrar imagem" }, FL = { font: "Fonte", font_size: "Tamanho da fonte", text_color: "Cor do texto", bold: "Negrito", italics: "Itálico", underline: "Sublinhado", transformation: "Transformação", letter_spacing: "Espaçamento de letras", word_spacing: "Espaçamento de palavras", horizontal_alignment: "Alinhamento horizontal", vertical_alignment: "Alinhamento vertical", text_preview: "Isto é uma prévia!", name: "Nome" }, jL = { play: "Reproduzir", stop: "Parar" }, zL = "Versão", BL = { title: "Widgets", add: "Adicionar widget", install: "Instalar", delete: "Excluir", installed: "Instalado", update: "Atualizar", all: "Todos", settings: "Configurações", control: "Controle", delete_confirm: "Tem certeza que deseja excluir este widget?", invalid_manifest: "Manifest do widget inválido", add_confirm: "Adicionar permitirá que {{widget_name}}:", installing: "Instalando...", updating: "Atualizando...", view_url: "URL de visualização", widget_connection: "O widget obtém ou envia requisições para:" }, WL = { "widgets:messages.read": "Ler mensagens", "widgets:goals.read": "Ler metas", "widgets:auc-fighter:settings.read": "Ler configurações do auc-fighter", "widgets:settings.read": "Ler configurações do widget", "widgets:alerts.read": "Ler alertas", "widgets:media:settings.read": "Ler configurações de mídia", "widgets:auc-fighter:match-playing.send": "Enviar partida em andamento", "widgets:auc-fighter:match-winner.send": "Enviar vencedor da partida", "widgets:auc-fighter:match-paused.send": "Enviar partida pausada", "widgets:auc-fighter:match-id.send": "Enviar ID da partida", "widgets:alert:played.send": "Enviar alerta reproduzido", "widgets:alert:playing.send": "Enviar alerta em reprodução", "widgets:media:played.send": "Enviar mídia reproduzida", "widgets:media:end.send": "Enviar fim da mídia", "widgets:media:playing.send": "Enviar mídia em reprodução", "widgets:media:paused.send": "Enviar mídia pausada", "widgets:media:error.send": "Enviar erro de mídia", "widgets:media:replay.send": "Enviar replay de mídia", "widgets:alert:replay.send": "Enviar replay de alerta", "widgets:alert:skip.send": "Enviar pular alerta", "widgets:messages.subscription": "Inscrever em mensagens", "widgets:goal.subscription": "Inscrever em meta", "widgets:settings.subscription": "Inscrever em configurações", "widgets:auc-fighter:start-match.subscription": "Inscrever em iniciar partida", "widgets:auc-fighter:pause-match.subscription": "Inscrever em pausar partida", "widgets:auc-fighter:resume-match.subscription": "Inscrever em retomar partida", "widgets:auc-fighter:cancel-match.subscription": "Inscrever em cancelar partida", "widgets:auc-fighter:update-match.subscription": "Inscrever em atualizar partida", "widgets:auc-fighter:settings.subscription": "Inscrever em configurações do auc-fighter", "widgets:alert:replay.subscription": "Inscrever em replay de alerta", "widgets:alert:skip.subscription": "Inscrever em pular alerta", "widgets:alert:test.subscription": "Inscrever em teste de alerta", "widgets:alert:skip-playing.subscription": "Inscrever em pular alerta em reprodução", "widgets:alert:alerts.subscription": "Inscrever em alertas", "widgets:media:replay.subscription": "Inscrever em replay de mídia", "widgets:media:settings.subscription": "Inscrever em configurações de mídia", "widgets:media:skip.subscription": "Inscrever em pular mídia", "widgets:media:skip-playing-media.subscription": "Inscrever em pular mídia em reprodução", "widgets:media:end.subscription": "Inscrever em fim da mídia", "widgets:media:error.subscription": "Inscrever em erro de mídia", "widgets:media:pause.subscription": "Inscrever em pausar mídia", "widgets:media:play.subscription": "Inscrever em reproduzir mídia", "widgets:alert:played.subscription": "Inscrever em alerta reproduzido", "widgets:view:storage.read": "Ler armazenamento da view do widget", "widgets:control:storage.read": "Ler armazenamento do controle do widget", "widgets:view:storage.write": "Escrever no armazenamento da view do widget", "widgets:control:storage.write": "Escrever no armazenamento do controle do widget", "widgets:view:storage.subscription": "Inscrever em armazenamento da view do widget", "widgets:control:storage.subscription": "Inscrever em armazenamento do controle do widget" }, UL = { title: "NSFW", nsfw_window: "Janela NSFW", settings: "Configurações", window: "Janela", blur_timeout_duration: "Duração do timeout de desfoque", confidence_threshold: "Limite de confiança", anus: "Ânus", make_love: "Fazer amor", nipple: "Mamilo", penis: "Pênis", vagina: "Vagina" }, VL = {
  on: DO,
  off: FO,
  select: jO,
  success: zO,
  ok: BO,
  cancel: WO,
  sound_volume: UO,
  skip_media: VO,
  skip_alert: HO,
  none: qO,
  start: KO,
  stop: QO,
  delay: GO,
  milliseconds: YO,
  token: JO,
  overlay_id: XO,
  api_key: ZO,
  disconnected: eL,
  documentation: tL,
  authorization: nL,
  error: rL,
  updater: iL,
  media: oL,
  integration: sL,
  auction: aL,
  maption: lL,
  media_settings: uL,
  dashboard: cL,
  messages: dL,
  message: fL,
  filter: pL,
  settings: hL,
  wheel: gL,
  timer: mL,
  fighter: yL,
  lot: vL,
  bid: wL,
  lots: SL,
  auction_settings: bL,
  lots_options: _L,
  auc_fighter_settings: xL,
  alerts: kL,
  services: CL,
  twitch: EL,
  widy: PL,
  twitch_service_settings: RL,
  alert: TL,
  general: $L,
  goals: ML,
  goal: AL,
  save: IL,
  back: NL,
  widget: OL,
  view: LL,
  image: DL,
  text: FL,
  audio: jL,
  version: zL,
  widgets: BL,
  scopes: WL,
  nsfw: UL
}, HL = "Вкл", qL = "Выкл", KL = "Выбрать", QL = "Успешно", GL = "Ок", YL = "Отмена", JL = "Громкость звука", XL = "Скип медиа", ZL = "Скип алерта", eD = "Нет", tD = "Старт", nD = "Стоп", rD = "Задержка", iD = "мс", oD = "Токен", sD = "ID оверлея", aD = "API ключ", lD = "Отключено", uD = "Документация", cD = { title: "Авторизация", code: "Запросить код", sign_in: "Войти", phone: "Номер телефона", telegram_code: "Код из Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Сначала нужно подключить StreamElements JWT", you_can_find_by_url: "Вы можете найти его по этой ссылке", set_id_and_jwt: "Нужно установить StreamElements Account ID и JWT для {{service}}" }, dD = { wrong_lots_format: "Неверный формат лотов", not_connected: "Не подключено", request_error: "Ошибка запроса" }, fD = { title: "Обновление", description: "Доступна новая версия приложения. Хотите обновить?", update: "Обновить", later: "Позже", downloading: "Загрузка..." }, pD = { title: "Медиа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, hD = { tribute: "Показывать tribute-сообщения" }, gD = { lots: "Лоты", wheel: "Колесо", settings: "Настройки" }, mD = { set_point: "Установить точку", meter_price: "Цена за 1 метр", amount: "Сумма", finish: "Завершить", lat_error: "Широта должна быть от -90 до 90", lng_error: "Долгота должна быть от -180 до 180", rules: "Для автоматического изменения позиции указателя в сообщении должно быть только одно слово из:" }, yD = { enabled: "Включено", min_amount: "Мин. сумма", video_volume: "Громкость видео", min_views: "Мин. просмотры" }, vD = { messages: "Сообщения", settings: "Настройки", services: "Сервисы", alerts: "Алерты", media: "Медиа", goals: "Цели", auction: "Аукцион", maption: "Maption", fighter: "Fighter", widgets: "Виджеты", info: "Инфо", nsfw: "NSFW" }, wD = { title: "Последние сообщения" }, SD = { skip: "Пропустить", replay: "Повторить", donated: "{{user_name}} донатнул {{amount}}{{currency}}", followed: "{{user_name}} подписался", subscribed: "{{user_name}} оформил подписку", gifted_subscriptions: "{{user_name}} подарил {{total}} подписок", raided_with: "{{user_name}} зарейдил с {{viewers}} зрителями" }, bD = { title: "Фильтр сообщений", exclude_donations: "Исключить донаты", exclude_follows: "Исключить подписки", exclude_subscriptions: "Исключить подписки", exclude_raids: "Исключить рейды" }, _D = { title: "Настройки", pause: "Приостановить алерты", moderation_duration: "Длительность модерации", black_list: "Чёрный список", remove_links: "Удалять ссылки", language: "Язык", sec: "сек", currency: "Валюта", tts_type: "Тип TTS" }, xD = { normal: "Обычное", dropout: "Выбывание", spin: "Крутить", speed: "Скорость колеса" }, kD = { continue: "Продолжить", pause: "Пауза", reset: "Сброс", add_time: "Добавить время", reduce_time: "Уменьшить время", add_timex2: "Добавить время ×2" }, CD = { title: "Fighter", match: "Матч", final: "Финал", game: "Игра", cancel: "Отменить игру", winner: "Победитель", settings: "Настройки", create_game: "Создать игру из лотов", start: "Начать", pause: "Пауза", rematch: "Реванш", resume: "Возобновить" }, ED = { name: "Название", delete: "Удалить", add: "Добавить сумму" }, PD = { delete: "Удалить", to_lot: "К лоту", new: "Новый", add_to_random_slot: "Добавить в случайный лот" }, RD = { add: "Добавить", new_lot_name: "Название нового лота", search: "Поиск лота", total: "Всего" }, TD = { leader_change: "Смена лидера", new_lot: "Новый лот", new_donation: "Новый донат", show_odds: "Показывать шансы", show_total_sum: "Показывать общую сумму", greater_timer_adding_time: "Добавление времени при большем таймере", not_add_time_if: "Не добавлять время если", adding_time: "Время" }, $D = { import_lots: "Импортировать лоты", clear_lots: "Очистить лоты" }, MD = { round_duration: "Длительность раунда", add_players: "Добавить игроков" }, AD = { title: "Алерты", group: "Группа" }, ID = { title: "Сервисы", tribute: "Tribute", streamelements: "StreamElements", connect: "Подключить", integrations: "Интеграции", sign_out: "Выйти", confirm_sign_out: "Вы уверены, что хотите выйти из этого сервиса?" }, ND = { device_code_expired: "Код устройства истёк. Попробуйте ещё раз.", user_code: "Код пользователя", authorize_with_code: "Авторизоваться по коду", waiting_authorization: "Ожидание авторизации..." }, OD = { donation_account_name: "Название аккаунта донатов", donation_url: "Ссылка на донат", create_donation_account: "Создать аккаунт донатов Widy", connect_to_existing_account: "Подключить существующий аккаунт", create_donation_account_pending: "Создание аккаунта донатов..." }, LD = { title: "Настройки Twitch", points_currency_ratio: "Соотношение баллов и валюты", rewards_name: "Название наград", rewards_list: "Список наград", add_reward: "Добавить награду", cost: "Стоимость", color: "Цвет" }, DD = { image: "Изображение", audio: "Аудио", view: "Вид", title: "Заголовок", message: "Сообщение", test_name: "Тест", test_text: "Это тестовый алерт!", configure: "Настроить", test: "Тест", add_new_variant: "Добавить новый вариант", new_variant: "Новый вариант", variant_title: "Название варианта", variant_group: "Группа варианта", status: "Статус", variation_condition: "Условие вариации", group: "Группа", Random: "Случайный", AmountIsGreater: "Сумма больше", AmountIsEqual: "Сумма равна", delete: "Удалить", sure_delete: "Вы уверены, что хотите удалить этот вариант?", type: "Тип", Donation: "Донат", Subscription: "Подписка", Follow: "Подписка", Raid: "Рейд" }, FD = "Общие", jD = { title: "Цели", create: "Создать новую цель" }, zD = { new: "Новая цель", goal: "Цель", type: "Тип", elements: "Элементы", progress: "Прогресс", goal_title: "Название цели", amount_raise: "Сумма для сбора", start_raising: "Начать сбор с", end_date: "Дата окончания цели", bar_height: "Высота бара", rounding_radius: "Радиус скругления", bar_stroke_thickness: "Толщина обводки бара", background_bar_color: "Цвет фона бара", progress_bar_color: "Цвет бара прогресса", goal_progress_bar: "Прогресс-бар цели", progress_bar_layout: "Расположение прогресс-бара", remaining_time: "Оставшееся время", goal_amount_limits: "Ограничения суммы цели", widget_background: "Фон виджета", background_color: "Цвет фона", OnTop: "Сверху", Inside: "Внутри", Below: "Снизу", DoNotDisplay: "Не отображать", title: "Заголовок", limits: "ограничения", raised: "Собрано", days_left: "Дней осталось", finish_goal: "Завершить цель", sure_finish: "Вы уверены, что хотите завершить эту цель?", Donation: "Донат", TwitchSubscription: "Twitch Подписка", TwitchFollow: "Twitch Подписка", goal_not_finished: "У вас есть незавершённая цель этого типа." }, BD = "Сохранить", WD = "Назад", UD = { copy: "Копировать", launch: "Запустить", url: "URL виджета", obs_dock_url: "OBS Dock URL" }, VD = { top: "Изображение сверху, текст снизу", bottom: "Изображение снизу, текст сверху", left: "Изображение слева, текст справа", right: "Изображение справа, текст слева", overlay: "Текст поверх изображения" }, HD = { show: "Показывать изображение" }, qD = { font: "Шрифт", font_size: "Размер шрифта", text_color: "Цвет текста", bold: "Жирный", italics: "Курсив", underline: "Подчёркивание", transformation: "Трансформация", letter_spacing: "Межбуквенный интервал", word_spacing: "Межсловный интервал", horizontal_alignment: "Горизонтальное выравнивание", vertical_alignment: "Вертикальное выравнивание", text_preview: "Это превью!", name: "Название" }, KD = { play: "Воспроизвести", stop: "Остановить" }, QD = "Версия", GD = { title: "Виджеты", add: "Добавить виджет", install: "Установить", delete: "Удалить", installed: "Установлено", update: "Обновить", all: "Все", settings: "Настройки", control: "Управление", delete_confirm: "Вы уверены, что хотите удалить этот виджет?", invalid_manifest: "Неверный манифест виджета", add_confirm: "Добавление позволит {{widget_name}}:", installing: "Установка...", updating: "Обновление...", view_url: "URL просмотра", widget_connection: "Виджет получает или отправляет запросы на:" }, YD = { "widgets:messages.read": "Читать сообщения", "widgets:goals.read": "Читать цели", "widgets:auc-fighter:settings.read": "Читать настройки auc-fighter", "widgets:settings.read": "Читать настройки виджета", "widgets:alerts.read": "Читать алерты", "widgets:media:settings.read": "Читать настройки медиа", "widgets:auc-fighter:match-playing.send": "Отправлять статус матча (играется)", "widgets:auc-fighter:match-winner.send": "Отправлять победителя матча", "widgets:auc-fighter:match-paused.send": "Отправлять статус паузы матча", "widgets:auc-fighter:match-id.send": "Отправлять ID матча", "widgets:alert:played.send": "Отправлять статус проигрывания алерта", "widgets:alert:playing.send": "Отправлять статус проигрывания алерта", "widgets:media:played.send": "Отправлять статус проигрывания медиа", "widgets:media:end.send": "Отправлять окончание медиа", "widgets:media:playing.send": "Отправлять статус проигрывания медиа", "widgets:media:paused.send": "Отправлять статус паузы медиа", "widgets:media:error.send": "Отправлять ошибку медиа", "widgets:media:replay.send": "Отправлять повтор медиа", "widgets:alert:replay.send": "Отправлять повтор алерта", "widgets:alert:skip.send": "Отправлять скип алерта", "widgets:messages.subscription": "Подписка на сообщения", "widgets:goal.subscription": "Подписка на цели", "widgets:settings.subscription": "Подписка на настройки", "widgets:auc-fighter:start-match.subscription": "Подписка на старт матча", "widgets:auc-fighter:pause-match.subscription": "Подписка на паузу матча", "widgets:auc-fighter:resume-match.subscription": "Подписка на возобновление матча", "widgets:auc-fighter:cancel-match.subscription": "Подписка на отмену матча", "widgets:auc-fighter:update-match.subscription": "Подписка на обновление матча", "widgets:auc-fighter:settings.subscription": "Подписка на настройки auc-fighter", "widgets:alert:replay.subscription": "Подписка на повтор алерта", "widgets:alert:skip.subscription": "Подписка на скип алерта", "widgets:alert:test.subscription": "Подписка на тестовый алерт", "widgets:alert:skip-playing.subscription": "Подписка на скип проигрываемого алерта", "widgets:alert:alerts.subscription": "Подписка на алерты", "widgets:media:replay.subscription": "Подписка на повтор медиа", "widgets:media:settings.subscription": "Подписка на настройки медиа", "widgets:media:skip.subscription": "Подписка на скип медиа", "widgets:media:skip-playing-media.subscription": "Подписка на скип проигрываемого медиа", "widgets:media:end.subscription": "Подписка на окончание медиа", "widgets:media:error.subscription": "Подписка на ошибку медиа", "widgets:media:pause.subscription": "Подписка на паузу медиа", "widgets:media:play.subscription": "Подписка на воспроизведение медиа", "widgets:alert:played.subscription": "Подписка на проигрывание алерта", "widgets:view:storage.read": "Читать хранилище вида виджета", "widgets:control:storage.read": "Читать хранилище управления виджета", "widgets:view:storage.write": "Записывать в хранилище вида виджета", "widgets:control:storage.write": "Записывать в хранилище управления виджета", "widgets:view:storage.subscription": "Подписка на хранилище вида виджета", "widgets:control:storage.subscription": "Подписка на хранилище управления виджета" }, JD = { title: "NSFW", nsfw_window: "NSFW окно", settings: "Настройки", window: "Окно", blur_timeout_duration: "Длительность размытия", confidence_threshold: "Порог уверенности", anus: "Анус", make_love: "Секс", nipple: "Сосок", penis: "Пенис", vagina: "Вагина" }, XD = {
  on: HL,
  off: qL,
  select: KL,
  success: QL,
  ok: GL,
  cancel: YL,
  sound_volume: JL,
  skip_media: XL,
  skip_alert: ZL,
  none: eD,
  start: tD,
  stop: nD,
  delay: rD,
  milliseconds: iD,
  token: oD,
  overlay_id: sD,
  api_key: aD,
  disconnected: lD,
  documentation: uD,
  authorization: cD,
  error: dD,
  updater: fD,
  media: pD,
  integration: hD,
  auction: gD,
  maption: mD,
  media_settings: yD,
  dashboard: vD,
  messages: wD,
  message: SD,
  filter: bD,
  settings: _D,
  wheel: xD,
  timer: kD,
  fighter: CD,
  lot: ED,
  bid: PD,
  lots: RD,
  auction_settings: TD,
  lots_options: $D,
  auc_fighter_settings: MD,
  alerts: AD,
  services: ID,
  twitch: ND,
  widy: OD,
  twitch_service_settings: LD,
  alert: DD,
  general: FD,
  goals: jD,
  goal: zD,
  save: BD,
  back: WD,
  widget: UD,
  view: VD,
  image: HD,
  text: qD,
  audio: KD,
  version: QD,
  widgets: GD,
  scopes: YD,
  nsfw: JD
}, ZD = "Увімкнено", eF = "Вимкнено", tF = "Вибрати", nF = "Успіх", rF = "Ок", iF = "Скасувати", oF = "Гучність звуку", sF = "Скорочення пропуску медіа", aF = "Скорочення пропуску сповіщення", lF = "Немає", uF = "Запустити", cF = "Зупинити", dF = "Затримка", fF = "мс", pF = "Токен", hF = "ID оверлея", gF = "API ключ", mF = "Відключено", yF = "Документація", vF = { title: "Авторизація", code: "Запит коду", sign_in: "Увійти", phone: "Номер телефону", telegram_code: "Код з Telegram", your_code: "Ваш код", "2fa_password": "Пароль 2FA", password: "Пароль", streamelements: "Спочатку потрібно підключити StreamElements JWT", you_can_find_by_url: "Ви можете знайти його за цим посиланням", set_id_and_jwt: "Потрібно встановити StreamElements Account ID та JWT для {{service}}" }, wF = { wrong_lots_format: "Неправильний формат лотів", not_connected: "Не підключено", request_error: "Помилка запиту" }, SF = { title: "Оновлення", description: "Доступна нова версія програми. Бажаєте оновити?", update: "Оновити", later: "Пізніше", downloading: "Завантаження..." }, bF = { title: "Медіа", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, _F = { tribute: "Показувати повідомлення подяки" }, xF = { lots: "Лоти", wheel: "Колесо", settings: "Налаштування" }, kF = { set_point: "Встановити точку", meter_price: "Ціна за 1 метр", amount: "Сума", finish: "Завершити", lat_error: "Широта має бути між -90 і 90", lng_error: "Довгота має бути між -180 і 180", rules: "Для автоматичної зміни позиції вказівника в повідомленні має бути лише одне слово з:" }, CF = { enabled: "Увімкнено", min_amount: "Мін. сума", video_volume: "Гучність відео", min_views: "Мін. переглядів" }, EF = { messages: "Повідомлення", settings: "Налаштування", services: "Сервіси", alerts: "Сповіщення", media: "Медіа", goals: "Цілі", auction: "Аукціон", maption: "Maption", fighter: "Боєць", widgets: "Віджети", info: "Інформація", nsfw: "NSFW" }, PF = { title: "Останні повідомлення" }, RF = { skip: "Пропустити", replay: "Повторити", donated: "{{user_name}} донатив {{amount}}{{currency}}", followed: "{{user_name}} підписався", subscribed: "{{user_name}} оформив підписку", gifted_subscriptions: "{{user_name}} подарував {{total}} підписок", raided_with: "{{user_name}} здійснив рейд з {{viewers}} глядачами" }, TF = { title: "Фільтр повідомлень", exclude_donations: "Виключити донати", exclude_follows: "Виключити підписки", exclude_subscriptions: "Виключити підписки", exclude_raids: "Виключити рейди" }, $F = { title: "Налаштування", pause: "Призупинити сповіщення", moderation_duration: "Тривалість модерації", black_list: "Чорний список", remove_links: "Видаляти посилання", language: "Мова", sec: "Сек", currency: "Валюта", tts_type: "Тип TTS" }, MF = { normal: "Звичайне", dropout: "Випадання", spin: "Обертання", speed: "Швидкість колеса" }, AF = { continue: "Продовжити", pause: "Призупинити", reset: "Скинути", add_time: "Додати час", reduce_time: "Зменшити час", add_timex2: "Додати час ×2" }, IF = { title: "Боєць", match: "Матч", final: "Фінал", game: "Гра", cancel: "Скасувати гру", winner: "Переможець", settings: "Налаштування", create_game: "Створити гру з лотів", start: "Старт", pause: "Пауза", rematch: "Реванш", resume: "Відновити" }, NF = { name: "Назва", delete: "Видалити", add: "Додати суму" }, OF = { delete: "Видалити", to_lot: "До лоту", new: "Новий", add_to_random_slot: "Додати до випадкового лоту" }, LF = { add: "Додати", new_lot_name: "Назва нового лоту", search: "Пошук лоту", total: "Всього" }, DF = { leader_change: "Зміна лідера", new_lot: "Новий лот", new_donation: "Новий донат", show_odds: "Показувати коефіцієнти", show_total_sum: "Показувати загальну суму", greater_timer_adding_time: "Додавання часу при перевищенні", not_add_time_if: "Не додавати час якщо", adding_time: "Час" }, FF = { import_lots: "Імпортувати лоти", clear_lots: "Очистити лоти" }, jF = { round_duration: "Тривалість раунду", add_players: "Додати гравців" }, zF = { title: "Сповіщення", group: "Група" }, BF = { title: "Сервіси", tribute: "Подяка", streamelements: "StreamElements", connect: "Підключити", integrations: "Інтеграції", sign_out: "Вийти", confirm_sign_out: "Ви впевнені, що хочете вийти з цього сервісу?" }, WF = { device_code_expired: "Термін дії коду пристрою закінчився. Спробуйте ще раз.", user_code: "Код користувача", authorize_with_code: "Авторизуватися за кодом", waiting_authorization: "Очікування авторизації..." }, UF = { donation_account_name: "Назва акаунту донатів", donation_url: "URL донатів", create_donation_account: "Створити акаунт донатів Widy", connect_to_existing_account: "Підключитися до існуючого акаунту", create_donation_account_pending: "Створення акаунту донатів..." }, VF = { title: "Налаштування Twitch", points_currency_ratio: "Співвідношення балів до валюти", rewards_name: "Назва винагород", rewards_list: "Список винагород", add_reward: "Додати винагороду", cost: "Вартість", color: "Колір" }, HF = { image: "Зображення", audio: "Аудіо", view: "Вид", title: "Заголовок", message: "Повідомлення", test_name: "Тест", test_text: "Це тестове сповіщення!", configure: "Налаштувати", test: "Тест", add_new_variant: "Додати новий варіант", new_variant: "Новий варіант", variant_title: "Назва варіанту", variant_group: "Група варіанту", status: "Статус", variation_condition: "Умова варіації", group: "Група", Random: "Випадковий", AmountIsGreater: "Сума більша", AmountIsEqual: "Сума дорівнює", delete: "Видалити", sure_delete: "Ви впевнені, що хочете видалити цей варіант?", type: "Тип", Donation: "Донат", Subscription: "Підписка", Follow: "Підписка", Raid: "Рейд" }, qF = "Загальні", KF = { title: "Цілі", create: "Створити нову ціль" }, QF = { new: "Нова ціль", goal: "Перегляд", type: "Тип", elements: "Елементи", progress: "Прогрес", goal_title: "Назва цілі", amount_raise: "Сума для збору", start_raising: "Почати збір з", end_date: "Дата завершення цілі", bar_height: "Висота бару", rounding_radius: "Радіус закруглення", bar_stroke_thickness: "Товщина обводки бару", background_bar_color: "Колір фонового бару", progress_bar_color: "Колір прогрес-бару", goal_progress_bar: "Прогрес-бар цілі", progress_bar_layout: "Розташування прогрес-бару", remaining_time: "Залишок часу", goal_amount_limits: "Ліміти суми цілі", widget_background: "Фон віджету", background_color: "Колір фону", OnTop: "Зверху", Inside: "Всередині", Below: "Знизу", DoNotDisplay: "Не відображати", title: "Заголовок", limits: "Ліміти", raised: "Зібрано", days_left: "Днів залишилось", finish_goal: "Завершити ціль", sure_finish: "Ви впевнені, що хочете завершити цю ціль?", Donation: "Донат", TwitchSubscription: "Підписка Twitch", TwitchFollow: "Підписка Twitch", goal_not_finished: "У вас є незавершена ціль цього типу." }, GF = "Зберегти", YF = "Назад", JF = { copy: "Копіювати", launch: "Запустити", url: "URL віджету", obs_dock_url: "OBS dock URL" }, XF = { top: "Зображення зверху, текст знизу", bottom: "Зображення знизу, текст зверху", left: "Зображення ліворуч, текст праворуч", right: "Зображення праворуч, текст ліворуч", overlay: "Текст поверх зображення" }, ZF = { show: "Показувати зображення" }, ej = { font: "Шрифт", font_size: "Розмір шрифту", text_color: "Колір тексту", bold: "Жирний", italics: "Курсив", underline: "Підкреслений", transformation: "Трансформація", letter_spacing: "Відстань між літерами", word_spacing: "Відстань між словами", horizontal_alignment: "Горизонтальне вирівнювання", vertical_alignment: "Вертикальне вирівнювання", text_preview: "Це попередній перегляд!", name: "Назва" }, tj = { play: "Відтворити", stop: "Зупинити" }, nj = "Версія", rj = { title: "Віджети", add: "Додати віджет", install: "Встановити", delete: "Видалити", installed: "Встановлено", update: "Оновити", all: "Всі", settings: "Налаштування", control: "Керування", delete_confirm: "Ви впевнені, що хочете видалити цей віджет?", invalid_manifest: "Невірний маніфест віджету", add_confirm: "Додавання дозволить {{widget_name}}:", installing: "Встановлення...", updating: "Оновлення...", view_url: "URL перегляду", widget_connection: "Віджет отримує або надсилає запити до:" }, ij = { "widgets:messages.read": "Читати повідомлення", "widgets:goals.read": "Читати цілі", "widgets:auc-fighter:settings.read": "Читати налаштування auc-fighter", "widgets:settings.read": "Читати налаштування віджетів", "widgets:alerts.read": "Читати сповіщення", "widgets:media:settings.read": "Читати налаштування медіа", "widgets:auc-fighter:match-playing.send": "Надсилати стан матчу (грає)", "widgets:auc-fighter:match-winner.send": "Надсилати переможця матчу", "widgets:auc-fighter:match-paused.send": "Надсилати паузу матчу", "widgets:auc-fighter:match-id.send": "Надсилати ID матчу", "widgets:alert:played.send": "Надсилати відтворене сповіщення", "widgets:alert:playing.send": "Надсилати відтворення сповіщення", "widgets:media:played.send": "Надсилати відтворене медіа", "widgets:media:end.send": "Надсилати завершення медіа", "widgets:media:playing.send": "Надсилати відтворення медіа", "widgets:media:paused.send": "Надсилати паузу медіа", "widgets:media:error.send": "Надсилати помилку медіа", "widgets:media:replay.send": "Надсилати повтор медіа", "widgets:alert:replay.send": "Надсилати повтор сповіщення", "widgets:alert:skip.send": "Надсилати пропуск сповіщення", "widgets:messages.subscription": "Підписка на повідомлення", "widgets:goal.subscription": "Підписка на цілі", "widgets:settings.subscription": "Підписка на налаштування", "widgets:auc-fighter:start-match.subscription": "Підписка на старт матчу", "widgets:auc-fighter:pause-match.subscription": "Підписка на паузу матчу", "widgets:auc-fighter:resume-match.subscription": "Підписка на відновлення матчу", "widgets:auc-fighter:cancel-match.subscription": "Підписка на скасування матчу", "widgets:auc-fighter:update-match.subscription": "Підписка на оновлення матчу", "widgets:auc-fighter:settings.subscription": "Підписка на налаштування auc-fighter", "widgets:alert:replay.subscription": "Підписка на повтор сповіщення", "widgets:alert:skip.subscription": "Підписка на пропуск сповіщення", "widgets:alert:test.subscription": "Підписка на тест сповіщення", "widgets:alert:skip-playing.subscription": "Підписка на пропуск відтворення", "widgets:alert:alerts.subscription": "Підписка на сповіщення", "widgets:media:replay.subscription": "Підписка на повтор медіа", "widgets:media:settings.subscription": "Підписка на налаштування медіа", "widgets:media:skip.subscription": "Підписка на пропуск медіа", "widgets:media:skip-playing-media.subscription": "Підписка на пропуск відтворення медіа", "widgets:media:end.subscription": "Підписка на завершення медіа", "widgets:media:error.subscription": "Підписка на помилку медіа", "widgets:media:pause.subscription": "Підписка на паузу медіа", "widgets:media:play.subscription": "Підписка на запуск медіа", "widgets:alert:played.subscription": "Підписка на відтворене сповіщення", "widgets:view:storage.read": "Читати сховище view", "widgets:control:storage.read": "Читати сховище control", "widgets:view:storage.write": "Записувати у сховище view", "widgets:control:storage.write": "Записувати у сховище control", "widgets:view:storage.subscription": "Підписка на сховище view", "widgets:control:storage.subscription": "Підписка на сховище control" }, oj = { title: "NSFW", nsfw_window: "NSFW вікно", settings: "Налаштування", window: "Вікно", blur_timeout_duration: "Тривалість розмиття", confidence_threshold: "Поріг впевненості", anus: "Анус", make_love: "Займатися сексом", nipple: "Сосок", penis: "Пеніс", vagina: "Піхва" }, sj = {
  on: ZD,
  off: eF,
  select: tF,
  success: nF,
  ok: rF,
  cancel: iF,
  sound_volume: oF,
  skip_media: sF,
  skip_alert: aF,
  none: lF,
  start: uF,
  stop: cF,
  delay: dF,
  milliseconds: fF,
  token: pF,
  overlay_id: hF,
  api_key: gF,
  disconnected: mF,
  documentation: yF,
  authorization: vF,
  error: wF,
  updater: SF,
  media: bF,
  integration: _F,
  auction: xF,
  maption: kF,
  media_settings: CF,
  dashboard: EF,
  messages: PF,
  message: RF,
  filter: TF,
  settings: $F,
  wheel: MF,
  timer: AF,
  fighter: IF,
  lot: NF,
  bid: OF,
  lots: LF,
  auction_settings: DF,
  lots_options: FF,
  auc_fighter_settings: jF,
  alerts: zF,
  services: BF,
  twitch: WF,
  widy: UF,
  twitch_service_settings: VF,
  alert: HF,
  general: qF,
  goals: KF,
  goal: QF,
  save: GF,
  back: YF,
  widget: JF,
  view: XF,
  image: ZF,
  text: ej,
  audio: tj,
  version: nj,
  widgets: rj,
  scopes: ij,
  nsfw: oj
}, aj = "开启", lj = "关闭", uj = "选择", cj = "成功", dj = "确定", fj = "取消", pj = "音量", hj = "快捷跳过媒体", gj = "快捷跳过提醒", mj = "无", yj = "开始", vj = "停止", wj = "延迟", Sj = "毫秒", bj = "令牌", _j = "覆盖层 ID", xj = "API 密钥", kj = "已断开连接", Cj = "文档", Ej = { title: "授权", code: "请求代码", sign_in: "登录", phone: "手机号", telegram_code: "Telegram 验证码", your_code: "您的验证码", "2fa_password": "两步验证密码", password: "密码", streamelements: "需要先连接 StreamElements JWT", you_can_find_by_url: "您可以通过此链接找到", set_id_and_jwt: "您需要为 {{service}} 设置 StreamElements 账号 ID 和 JWT" }, Pj = { wrong_lots_format: "奖品格式错误", not_connected: "未连接", request_error: "请求错误" }, Rj = { title: "更新", description: "有新版本可用，是否立即更新？", update: "更新", later: "稍后", downloading: "下载中..." }, Tj = { title: "媒体", youtube: "YouTube", twitch: "Twitch", tiktok: "TikTok" }, $j = { tribute: "显示致敬消息" }, Mj = { lots: "奖品", wheel: "转盘", settings: "设置" }, Aj = { set_point: "设置点位", meter_price: "每米价格", amount: "金额", finish: "完成", lat_error: "纬度必须在 -90 到 90 之间", lng_error: "经度必须在 -180 到 180 之间", rules: "指针要在消息中自动改变位置时，只能包含以下其中一个词：" }, Ij = { enabled: "已启用", min_amount: "最低金额", video_volume: "视频音量", min_views: "最低观看数" }, Nj = { messages: "消息", settings: "设置", services: "服务", alerts: "提醒", media: "媒体", goals: "目标", auction: "拍卖", maption: "地图", fighter: "对战", widgets: "小部件", info: "信息", nsfw: "NSFW" }, Oj = { title: "最新消息" }, Lj = { skip: "跳过", replay: "重播", donated: "{{user_name}} 捐赠了 {{amount}}{{currency}}", followed: "{{user_name}} 已关注", subscribed: "{{user_name}} 已订阅", gifted_subscriptions: "{{user_name}} 赠送了 {{total}} 个订阅", raided_with: "{{user_name}} 带 {{viewers}} 名观众突袭" }, Dj = { title: "过滤消息", exclude_donations: "排除捐赠", exclude_follows: "排除关注", exclude_subscriptions: "排除订阅", exclude_raids: "排除突袭" }, Fj = { title: "设置", pause: "暂停提醒消息", moderation_duration: "审核时长", black_list: "黑名单", remove_links: "移除链接", language: "语言", sec: "秒", currency: "货币", tts_type: "TTS 类型" }, jj = { normal: "普通", dropout: "淘汰", spin: "旋转", speed: "转盘速度" }, zj = { continue: "继续", pause: "暂停", reset: "重置", add_time: "增加时间", reduce_time: "减少时间", add_timex2: "增加时间 x2" }, Bj = { title: "对战", match: "比赛", final: "决赛", game: "游戏", cancel: "取消比赛", winner: "获胜者", settings: "设置", create_game: "从奖品创建比赛", start: "开始", pause: "暂停", rematch: "重赛", resume: "继续" }, Wj = { name: "名称", delete: "删除", add: "增加金额" }, Uj = { delete: "删除", to_lot: "添加到奖品", new: "新建", add_to_random_slot: "添加到随机奖品" }, Vj = { add: "添加", new_lot_name: "新奖品名称", search: "搜索奖品", total: "总计" }, Hj = { leader_change: "领先者变更", new_lot: "新奖品", new_donation: "新捐赠", show_odds: "显示赔率", show_total_sum: "显示总金额", greater_timer_adding_time: "领先时增加时间", not_add_time_if: "不增加时间的情况", adding_time: "增加时间" }, qj = { import_lots: "导入奖品", clear_lots: "清空奖品" }, Kj = { round_duration: "回合时长", add_players: "添加选手" }, Qj = { title: "提醒", group: "分组" }, Gj = { title: "服务", tribute: "致敬", streamelements: "StreamElements", connect: "连接", integrations: "集成", sign_out: "退出登录", confirm_sign_out: "确定要退出此服务吗？" }, Yj = { device_code_expired: "设备代码已过期，请重试。", user_code: "用户代码", authorize_with_code: "使用代码授权", waiting_authorization: "等待授权中..." }, Jj = { donation_account_name: "捐赠账号名称", donation_url: "捐赠链接", create_donation_account: "创建 Widy 捐赠账号", connect_to_existing_account: "连接已有账号", create_donation_account_pending: "正在创建捐赠账号..." }, Xj = { title: "Twitch 设置", points_currency_ratio: "积分货币比例", rewards_name: "奖励名称", rewards_list: "奖励列表", add_reward: "添加奖励", cost: "价格", color: "颜色" }, Zj = { image: "图片", audio: "音频", view: "视图", title: "标题", message: "消息", test_name: "测试", test_text: "这是一个测试提醒！", configure: "配置", test: "测试", add_new_variant: "添加新变体", new_variant: "新变体", variant_title: "变体标题", variant_group: "变体分组", status: "状态", variation_condition: "变体条件", group: "分组", Random: "随机", AmountIsGreater: "金额大于", AmountIsEqual: "金额等于", delete: "删除", sure_delete: "确定要删除此变体吗？", type: "类型", Donation: "捐赠", Subscription: "订阅", Follow: "关注", Raid: "突袭" }, ez = "常规", tz = { title: "目标", create: "创建新目标" }, nz = { new: "新目标", goal: "目标", type: "类型", elements: "元素", progress: "进度", goal_title: "目标标题", amount_raise: "目标金额", start_raising: "起始金额", end_date: "结束日期", bar_height: "进度条高度", rounding_radius: "圆角半径", bar_stroke_thickness: "进度条边框粗细", background_bar_color: "背景条颜色", progress_bar_color: "进度条颜色", goal_progress_bar: "目标进度条", progress_bar_layout: "进度条布局", remaining_time: "剩余时间", goal_amount_limits: "目标金额限制", widget_background: "小部件背景", background_color: "背景颜色", OnTop: "上方", Inside: "内部", Below: "下方", DoNotDisplay: "不显示", title: "标题", limits: "限制", raised: "已筹集", days_left: "剩余天数", finish_goal: "完成目标", sure_finish: "确定要完成此目标吗？", Donation: "捐赠", TwitchSubscription: "Twitch 订阅", TwitchFollow: "Twitch 关注", goal_not_finished: "您有一个同类型的未完成目标。" }, rz = "保存", iz = "返回", oz = { copy: "复制", launch: "启动", url: "小部件链接", obs_dock_url: "OBS 停靠链接" }, sz = { top: "图片在上，文字在下", bottom: "图片在下，文字在上", left: "图片在左，文字在右", right: "图片在右，文字在左", overlay: "文字覆盖图片" }, az = { show: "显示图片" }, lz = { font: "字体", font_size: "字号", text_color: "文字颜色", bold: "加粗", italics: "斜体", underline: "下划线", transformation: "变换", letter_spacing: "字间距", word_spacing: "词间距", horizontal_alignment: "水平对齐", vertical_alignment: "垂直对齐", text_preview: "这是预览效果！", name: "名称" }, uz = { play: "播放", stop: "停止" }, cz = "版本", dz = { title: "小部件", add: "添加小部件", install: "安装", delete: "删除", installed: "已安装", update: "更新", all: "全部", settings: "设置", control: "控制", delete_confirm: "确定要删除此小部件吗？", invalid_manifest: "无效的小部件清单", add_confirm: "添加后将允许 {{widget_name}}：", installing: "安装中...", updating: "更新中...", view_url: "查看链接", widget_connection: "小部件将获取或发送请求到：" }, fz = { "widgets:messages.read": "读取消息", "widgets:goals.read": "读取目标", "widgets:auc-fighter:settings.read": "读取对战设置", "widgets:settings.read": "读取小部件设置", "widgets:alerts.read": "读取提醒", "widgets:media:settings.read": "读取媒体设置", "widgets:auc-fighter:match-playing.send": "发送比赛进行中", "widgets:auc-fighter:match-winner.send": "发送获胜者", "widgets:auc-fighter:match-paused.send": "发送比赛暂停", "widgets:auc-fighter:match-id.send": "发送比赛 ID", "widgets:alert:played.send": "发送提醒已播放", "widgets:alert:playing.send": "发送提醒正在播放", "widgets:media:played.send": "发送媒体已播放", "widgets:media:end.send": "发送媒体结束", "widgets:media:playing.send": "发送媒体正在播放", "widgets:media:paused.send": "发送媒体暂停", "widgets:media:error.send": "发送媒体错误", "widgets:media:replay.send": "发送媒体重播", "widgets:alert:replay.send": "发送提醒重播", "widgets:alert:skip.send": "发送提醒跳过", "widgets:messages.subscription": "订阅消息", "widgets:goal.subscription": "订阅目标", "widgets:settings.subscription": "订阅设置", "widgets:auc-fighter:start-match.subscription": "订阅开始比赛", "widgets:auc-fighter:pause-match.subscription": "订阅暂停比赛", "widgets:auc-fighter:resume-match.subscription": "订阅继续比赛", "widgets:auc-fighter:cancel-match.subscription": "订阅取消比赛", "widgets:auc-fighter:update-match.subscription": "订阅更新比赛", "widgets:auc-fighter:settings.subscription": "订阅对战设置", "widgets:alert:replay.subscription": "订阅提醒重播", "widgets:alert:skip.subscription": "订阅提醒跳过", "widgets:alert:test.subscription": "订阅提醒测试", "widgets:alert:skip-playing.subscription": "订阅跳过正在播放的提醒", "widgets:alert:alerts.subscription": "订阅提醒", "widgets:media:replay.subscription": "订阅媒体重播", "widgets:media:settings.subscription": "订阅媒体设置", "widgets:media:skip.subscription": "订阅跳过媒体", "widgets:media:skip-playing-media.subscription": "订阅跳过正在播放的媒体", "widgets:media:end.subscription": "订阅媒体结束", "widgets:media:error.subscription": "订阅媒体错误", "widgets:media:pause.subscription": "订阅媒体暂停", "widgets:media:play.subscription": "订阅媒体播放", "widgets:alert:played.subscription": "订阅提醒已播放", "widgets:view:storage.read": "读取视图存储", "widgets:control:storage.read": "读取控制存储", "widgets:view:storage.write": "写入视图存储", "widgets:control:storage.write": "写入控制存储", "widgets:view:storage.subscription": "订阅视图存储", "widgets:control:storage.subscription": "订阅控制存储" }, pz = { title: "NSFW", nsfw_window: "NSFW 窗口", settings: "设置", window: "窗口", blur_timeout_duration: "模糊超时时间", confidence_threshold: "置信度阈值", anus: "肛门", make_love: "做爱", nipple: "乳头", penis: "阴茎", vagina: "阴道" }, hz = {
  on: aj,
  off: lj,
  select: uj,
  success: cj,
  ok: dj,
  cancel: fj,
  sound_volume: pj,
  skip_media: hj,
  skip_alert: gj,
  none: mj,
  start: yj,
  stop: vj,
  delay: wj,
  milliseconds: Sj,
  token: bj,
  overlay_id: _j,
  api_key: xj,
  disconnected: kj,
  documentation: Cj,
  authorization: Ej,
  error: Pj,
  updater: Rj,
  media: Tj,
  integration: $j,
  auction: Mj,
  maption: Aj,
  media_settings: Ij,
  dashboard: Nj,
  messages: Oj,
  message: Lj,
  filter: Dj,
  settings: Fj,
  wheel: jj,
  timer: zj,
  fighter: Bj,
  lot: Wj,
  bid: Uj,
  lots: Vj,
  auction_settings: Hj,
  lots_options: qj,
  auc_fighter_settings: Kj,
  alerts: Qj,
  services: Gj,
  twitch: Yj,
  widy: Jj,
  twitch_service_settings: Xj,
  alert: Zj,
  general: ez,
  goals: tz,
  goal: nz,
  save: rz,
  back: iz,
  widget: oz,
  view: sz,
  image: az,
  text: lz,
  audio: uz,
  version: cz,
  widgets: dz,
  scopes: fz,
  nsfw: pz
};
jt.use(q$).init({
  resources: {
    en: {
      translation: f2
    },
    ua: {
      translation: sj
    },
    ru: {
      translation: XD
    },
    de: {
      translation: iA
    },
    es: {
      translation: SI
    },
    fr: {
      translation: RN
    },
    hi: {
      translation: LO
    },
    pt: {
      translation: VL
    },
    zh: {
      translation: hz
    }
  },
  lng: "en",
  fallbackLng: "en",
  nsSeparator: !1
});
var bu;
(function(e) {
  e.error = "error", e.info = "info", e.success = "success", e.warning = "warning";
})(bu || (bu = {}));
var Wv;
(function(e) {
  e.en = "en", e.es = "es", e.de = "de", e.zh = "zh", e.fr = "fr", e.hi = "hi", e.ar = "ar", e.pt = "pt", e.ru = "ru", e.ua = "ua";
})(Wv || (Wv = {}));
var ie;
(function(e) {
  e.Message = "Message", e.MediaMessage = "MediaMessage", e.SkipAlert = "SkipAlert", e.ReplayAlert = "ReplayAlert", e.AlertPlaying = "AlertPlaying", e.AlertPlayed = "AlertPlayed", e.MediaPlaying = "MediaPlaying", e.SkipPlayingMedia = "SkipPlayingMedia", e.SkipPlayingAlert = "SkipPlayingAlert", e.MediaEnd = "MediaEnd", e.MediaError = "MediaError", e.MediaPaused = "MediaPaused", e.PauseMedia = "PauseMedia", e.MediaPlayed = "MediaPlayed", e.PlayMedia = "PlayMedia", e.SkipMedia = "SkipMedia", e.ReplayMedia = "ReplayMedia", e.Alerts = "Alerts", e.MakeAudioError = "MakeAudioError", e.Settings = "Settings", e.MediaSettings = "MediaSettings", e.StartAucFighterMatch = "StartAucFighterMatch", e.AucFighterMatchEnd = "AucFighterMatchEnd", e.PauseAucFighterMatch = "PauseAucFighterMatch", e.ResumeAucFighterMatch = "ResumeAucFighterMatch", e.AucFighterMatchPlaying = "AucFighterMatchPlaying", e.AucFighterMatchPaused = "AucFighterMatchPaused", e.UpdateAucFighterMatch = "UpdateAucFighterMatch", e.CancelAucFighterMatch = "CancelAucFighterMatch", e.AucFighterSettings = "AucFighterSettings", e.TestAlert = "TestAlert", e.Goal = "Goal", e.TwitchRewardRedemptionAdd = "TwitchRewardRedemptionAdd", e.CreateDonationAccount = "CreateDonationAccount", e.WidgetViewStorage = "WidgetViewStorage", e.WidgetControlStorage = "WidgetControlStorage", e.NsfwDetection = "NsfwDetection", e.NsfwSettings = "NsfwSettings";
})(ie || (ie = {}));
var Uv;
(function(e) {
  e.Connect = "Connect", e.Authenticated = "Authenticated";
})(Uv || (Uv = {}));
var Dt;
(function(e) {
  e.Top = "Top", e.Bottom = "Bottom", e.Left = "Left", e.Right = "Right", e.Overlay = "Overlay";
})(Dt || (Dt = {}));
var hr;
(function(e) {
  e.UAH = "UAH", e.RUB = "RUB", e.EUR = "EUR", e.USD = "USD", e.BRL = "BRL", e.TRY = "TRY", e.BYN = "BYN", e.KZT = "KZT", e.AUD = "AUD", e.CAD = "CAD", e.CZK = "CZK", e.DKK = "DKK", e.HKD = "HKD", e.ILS = "ILS", e.MYR = "MYR", e.MXN = "MXN", e.NOK = "NOK", e.NZD = "NZD", e.PHP = "PHP", e.PLN = "PLN", e.GBP = "GBP", e.SGD = "SGD", e.SEK = "SEK", e.CHF = "CHF", e.THB = "THB", e.NONE = "NONE";
})(hr || (hr = {}));
var Hr;
(function(e) {
  e.Youtube = "Youtube", e.Twitch = "Twitch", e.TikTok = "TikTok";
})(Hr || (Hr = {}));
var Vv;
(function(e) {
  e.normal = "normal", e.dropout = "dropout";
})(Vv || (Vv = {}));
var go;
(function(e) {
  e.Random = "Random", e.AmountIsGreater = "AmountIsGreater", e.AmountIsEqual = "AmountIsEqual";
})(go || (go = {}));
var Ur;
(function(e) {
  e.OnTop = "OnTop", e.Inside = "Inside", e.Below = "Below", e.DoNotDisplay = "DoNotDisplay";
})(Ur || (Ur = {}));
var wi;
(function(e) {
  e.Percent = "Percent", e.CurrentAmount = "CurrentAmount", e.CurrentAmountPercent = "CurrentAmountPercent", e.CurrentAmountRemainingAmount = "CurrentAmountRemainingAmount", e.CurrentAmountRemainingAmountPercent = "CurrentAmountRemainingAmountPercent";
})(wi || (wi = {}));
var kt;
(function(e) {
  e.Streamelements = "Streamelements", e.Twitch = "Twitch", e.WidySol = "WidySol", e.WidyTon = "WidyTon", e.DonationAlerts = "DonationAlerts", e.StreamLabs = "StreamLabs", e.Donatello = "Donatello", e.Donatik = "Donatik", e.DonatePay = "DonatePay", e.Destream = "Destream", e.Tribute = "Tribute";
})(kt || (kt = {}));
var Hv;
(function(e) {
  e.tip = "tip";
})(Hv || (Hv = {}));
var Ft;
(function(e) {
  e.Donation = "Donation", e.Subscription = "Subscription", e.Follow = "Follow", e.Raid = "Raid";
})(Ft || (Ft = {}));
var pp;
(function(e) {
  e.Donation = "Donation", e.TwitchSubscription = "TwitchSubscription", e.TwitchFollow = "TwitchFollow";
})(pp || (pp = {}));
var _u;
(function(e) {
  e.Sol = "sol", e.Ton = "ton";
})(_u || (_u = {}));
var qv;
(function(e) {
  e.Google = "Google", e.Edge = "Edge";
})(qv || (qv = {}));
var Kv;
(function(e) {
  e.Male = "Male", e.Female = "Edge";
})(Kv || (Kv = {}));
var Qv;
(function(e) {
  e.anus = "anus", e.make_love = "make_love", e.nipple = "nipple", e.penis = "penis", e.vagina = "vagina";
})(Qv || (Qv = {}));
var Ef = { exports: {} }, Pf = {};
var Gv;
function gz() {
  if (Gv) return Pf;
  Gv = 1;
  var e = Ou();
  function t(p, f) {
    return p === f && (p !== 0 || 1 / p === 1 / f) || p !== p && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, o = e.useSyncExternalStore, s = e.useRef, l = e.useEffect, u = e.useMemo, d = e.useDebugValue;
  return Pf.useSyncExternalStoreWithSelector = function(p, f, m, g, w) {
    var C = s(null);
    if (C.current === null) {
      var S = { hasValue: !1, value: null };
      C.current = S;
    } else S = C.current;
    C = u(
      function() {
        function k(E) {
          if (!M) {
            if (M = !0, N = E, E = g(E), w !== void 0 && S.hasValue) {
              var $ = S.value;
              if (w($, E))
                return x = $;
            }
            return x = E;
          }
          if ($ = x, r(N, E)) return $;
          var A = g(E);
          return w !== void 0 && w($, A) ? (N = E, $) : (N = E, x = A);
        }
        var M = !1, N, x, P = m === void 0 ? null : m;
        return [
          function() {
            return k(f());
          },
          P === null ? void 0 : function() {
            return k(P());
          }
        ];
      },
      [f, m, g, w]
    );
    var b = o(p, C[0], C[1]);
    return l(
      function() {
        S.hasValue = !0, S.value = b;
      },
      [b]
    ), d(b), b;
  }, Pf;
}
var Yv;
function mz() {
  return Yv || (Yv = 1, Ef.exports = gz()), Ef.exports;
}
var yz = mz();
function E0(e) {
  e();
}
function vz() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      E0(() => {
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
var Jv = {
  notify() {
  },
  get: () => []
};
function wz(e, t) {
  let r, o = Jv, s = 0, l = !1;
  function u(b) {
    m();
    const k = o.subscribe(b);
    let M = !1;
    return () => {
      M || (M = !0, k(), g());
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
  function m() {
    s++, r || (r = e.subscribe(p), o = vz());
  }
  function g() {
    s--, r && s === 0 && (r(), r = void 0, o.clear(), o = Jv);
  }
  function w() {
    l || (l = !0, m());
  }
  function C() {
    l && (l = !1, g());
  }
  const S = {
    addNestedSub: u,
    notifyNestedSubs: d,
    handleChangeWrapper: p,
    isSubscribed: f,
    trySubscribe: w,
    tryUnsubscribe: C,
    getListeners: () => o
  };
  return S;
}
var Sz = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", bz = /* @__PURE__ */ Sz(), _z = () => typeof navigator < "u" && navigator.product === "ReactNative", xz = /* @__PURE__ */ _z(), kz = () => bz || xz ? _.useLayoutEffect : _.useEffect, Cz = /* @__PURE__ */ kz();
function Xv(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function $s(e, t) {
  if (Xv(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length) return !1;
  for (let s = 0; s < r.length; s++)
    if (!Object.prototype.hasOwnProperty.call(t, r[s]) || !Xv(e[r[s]], t[r[s]]))
      return !1;
  return !0;
}
var Ez = /* @__PURE__ */ Symbol.for("react-redux-context"), Pz = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Rz() {
  if (!_.createContext) return {};
  const e = Pz[Ez] ??= /* @__PURE__ */ new Map();
  let t = e.get(_.createContext);
  return t || (t = _.createContext(
    null
  ), e.set(_.createContext, t)), t;
}
var Gr = /* @__PURE__ */ Rz();
function Tz(e) {
  const { children: t, context: r, serverState: o, store: s } = e, l = _.useMemo(() => {
    const p = wz(s);
    return {
      store: s,
      subscription: p,
      getServerState: o ? () => o : void 0
    };
  }, [s, o]), u = _.useMemo(() => s.getState(), [s]);
  Cz(() => {
    const { subscription: p } = l;
    return p.onStateChange = p.notifyNestedSubs, p.trySubscribe(), u !== s.getState() && p.notifyNestedSubs(), () => {
      p.tryUnsubscribe(), p.onStateChange = void 0;
    };
  }, [l, u]);
  const d = r || Gr;
  return /* @__PURE__ */ _.createElement(d.Provider, { value: l }, t);
}
var $z = Tz;
function uh(e = Gr) {
  return function() {
    return _.useContext(e);
  };
}
var P0 = /* @__PURE__ */ uh();
function R0(e = Gr) {
  const t = e === Gr ? P0 : (
    // @ts-ignore
    uh(e)
  ), r = () => {
    const { store: o } = t();
    return o;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var T0 = /* @__PURE__ */ R0();
function Mz(e = Gr) {
  const t = e === Gr ? T0 : R0(e), r = () => t().dispatch;
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Zu = /* @__PURE__ */ Mz(), Az = (e, t) => e === t;
function Iz(e = Gr) {
  const t = e === Gr ? P0 : uh(e), r = (o, s = {}) => {
    const { equalityFn: l = Az } = typeof s == "function" ? { equalityFn: s } : s, u = t(), { store: d, subscription: p, getServerState: f } = u;
    _.useRef(!0);
    const m = _.useCallback(
      {
        [o.name](w) {
          return o(w);
        }
      }[o.name],
      [o]
    ), g = yz.useSyncExternalStoreWithSelector(
      p.addNestedSub,
      d.getState,
      f || d.getState,
      m,
      l
    );
    return _.useDebugValue(g), g;
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Qn = /* @__PURE__ */ Iz(), Nz = E0;
const $0 = _.createContext(null), Oz = ({
  children: e,
  context: t,
  eventsService: r
}) => /* @__PURE__ */ z.jsx(t.Provider, { value: r, children: e });
class Lz {
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
class ch extends Lz {
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
      ch.RECONNECT_DELAY_MS
    );
  }
  clearReconnectTimer() {
    this.reconnectTimer !== null && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
function xt(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Dz = typeof Symbol == "function" && Symbol.observable || "@@observable", Zv = Dz, Rf = () => Math.random().toString(36).substring(7).split("").join("."), Fz = {
  INIT: `@@redux/INIT${/* @__PURE__ */ Rf()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Rf()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Rf()}`
}, xu = Fz;
function Yr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function M0(e, t, r) {
  if (typeof e != "function")
    throw new Error(xt(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(xt(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(xt(1));
    return r(M0)(e, t);
  }
  let o = e, s = t, l = /* @__PURE__ */ new Map(), u = l, d = 0, p = !1;
  function f() {
    u === l && (u = /* @__PURE__ */ new Map(), l.forEach((k, M) => {
      u.set(M, k);
    }));
  }
  function m() {
    if (p)
      throw new Error(xt(3));
    return s;
  }
  function g(k) {
    if (typeof k != "function")
      throw new Error(xt(4));
    if (p)
      throw new Error(xt(5));
    let M = !0;
    f();
    const N = d++;
    return u.set(N, k), function() {
      if (M) {
        if (p)
          throw new Error(xt(6));
        M = !1, f(), u.delete(N), l = null;
      }
    };
  }
  function w(k) {
    if (!Yr(k))
      throw new Error(xt(7));
    if (typeof k.type > "u")
      throw new Error(xt(8));
    if (typeof k.type != "string")
      throw new Error(xt(17));
    if (p)
      throw new Error(xt(9));
    try {
      p = !0, s = o(s, k);
    } finally {
      p = !1;
    }
    return (l = u).forEach((N) => {
      N();
    }), k;
  }
  function C(k) {
    if (typeof k != "function")
      throw new Error(xt(10));
    o = k, w({
      type: xu.REPLACE
    });
  }
  function S() {
    const k = g;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(M) {
        if (typeof M != "object" || M === null)
          throw new Error(xt(11));
        function N() {
          const P = M;
          P.next && P.next(m());
        }
        return N(), {
          unsubscribe: k(N)
        };
      },
      [Zv]() {
        return this;
      }
    };
  }
  return w({
    type: xu.INIT
  }), {
    dispatch: w,
    subscribe: g,
    getState: m,
    replaceReducer: C,
    [Zv]: S
  };
}
function jz(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: xu.INIT
    }) > "u")
      throw new Error(xt(12));
    if (typeof r(void 0, {
      type: xu.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(xt(13));
  });
}
function dh(e) {
  const t = Object.keys(e), r = {};
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    typeof e[u] == "function" && (r[u] = e[u]);
  }
  const o = Object.keys(r);
  let s;
  try {
    jz(r);
  } catch (l) {
    s = l;
  }
  return function(u = {}, d) {
    if (s)
      throw s;
    let p = !1;
    const f = {};
    for (let m = 0; m < o.length; m++) {
      const g = o[m], w = r[g], C = u[g], S = w(C, d);
      if (typeof S > "u")
        throw d && d.type, new Error(xt(14));
      f[g] = S, p = p || S !== C;
    }
    return p = p || o.length !== Object.keys(u).length, p ? f : u;
  };
}
function ku(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...o) => t(r(...o)));
}
function zz(...e) {
  return (t) => (r, o) => {
    const s = t(r, o);
    let l = () => {
      throw new Error(xt(15));
    };
    const u = {
      getState: s.getState,
      dispatch: (p, ...f) => l(p, ...f)
    }, d = e.map((p) => p(u));
    return l = ku(...d)(s.dispatch), {
      ...s,
      dispatch: l
    };
  };
}
function A0(e) {
  return Yr(e) && "type" in e && typeof e.type == "string";
}
var fh = /* @__PURE__ */ Symbol.for("immer-nothing"), Ms = /* @__PURE__ */ Symbol.for("immer-draftable"), vt = /* @__PURE__ */ Symbol.for("immer-state");
function Pt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var on = Object, Ri = on.getPrototypeOf, zs = "constructor", oa = "prototype", hp = "configurable", Cu = "enumerable", ru = "writable", Bs = "value", ln = (e) => !!e && !!e[vt];
function un(e) {
  return e ? I0(e) || aa(e) || !!e[Ms] || !!e[zs]?.[Ms] || la(e) || ua(e) : !1;
}
var Bz = on[oa][zs].toString(), ew = /* @__PURE__ */ new WeakMap();
function I0(e) {
  if (!e || !yo(e))
    return !1;
  const t = Ri(e);
  if (t === null || t === on[oa])
    return !0;
  const r = on.hasOwnProperty.call(t, zs) && t[zs];
  if (r === Object)
    return !0;
  if (!Si(r))
    return !1;
  let o = ew.get(r);
  return o === void 0 && (o = Function.toString.call(r), ew.set(r, o)), o === Bz;
}
function Wz(e) {
  return ln(e) || Pt(15, e), e[vt].base_;
}
function sa(e, t, r = !0) {
  Ti(e) === 0 ? (r ? Reflect.ownKeys(e) : on.keys(e)).forEach((s) => {
    t(s, e[s], e);
  }) : e.forEach((o, s) => t(s, o, e));
}
function Ti(e) {
  const t = e[vt];
  return t ? t.type_ : aa(e) ? 1 : la(e) ? 2 : ua(e) ? 3 : 0;
}
var As = (e, t, r = Ti(e)) => r === 2 ? e.has(t) : on[oa].hasOwnProperty.call(e, t), fr = (e, t, r = Ti(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), Eu = (e, t, r, o = Ti(e)) => {
  o === 2 ? e.set(t, r) : o === 3 ? e.add(r) : e[t] = r;
};
function Uz(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var aa = Array.isArray, la = (e) => e instanceof Map, ua = (e) => e instanceof Set, yo = (e) => typeof e == "object", Si = (e) => typeof e == "function", Tf = (e) => typeof e == "boolean";
function Vz(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Hz = (e) => yo(e) ? e?.[vt] : null, pr = (e) => e.copy_ || e.base_, ph = (e) => e.modified_ ? e.copy_ : e.base_;
function gp(e, t) {
  if (la(e))
    return new Map(e);
  if (ua(e))
    return new Set(e);
  if (aa(e))
    return Array[oa].slice.call(e);
  const r = I0(e);
  if (t === !0 || t === "class_only" && !r) {
    const o = on.getOwnPropertyDescriptors(e);
    delete o[vt];
    let s = Reflect.ownKeys(o);
    for (let l = 0; l < s.length; l++) {
      const u = s[l], d = o[u];
      d[ru] === !1 && (d[ru] = !0, d[hp] = !0), (d.get || d.set) && (o[u] = {
        [hp]: !0,
        [ru]: !0,
        // could live with !!desc.set as well here...
        [Cu]: d[Cu],
        [Bs]: e[u]
      });
    }
    return on.create(Ri(e), o);
  } else {
    const o = Ri(e);
    if (o !== null && r)
      return { ...e };
    const s = on.create(o);
    return on.assign(s, e);
  }
}
function hh(e, t = !1) {
  return ec(e) || ln(e) || !un(e) || (Ti(e) > 1 && on.defineProperties(e, {
    set: Al,
    add: Al,
    clear: Al,
    delete: Al
  }), on.freeze(e), t && sa(
    e,
    (r, o) => {
      hh(o, !0);
    },
    !1
  )), e;
}
function qz() {
  Pt(2);
}
var Al = {
  [Bs]: qz
};
function ec(e) {
  return e === null || !yo(e) ? !0 : on.isFrozen(e);
}
var Pu = "MapSet", Ru = "Patches", tw = "ArrayMethods", Tu = {};
function $i(e) {
  const t = Tu[e];
  return t || Pt(0, e), t;
}
var nw = (e) => !!Tu[e];
function Kz(e, t) {
  Tu[e] || (Tu[e] = t);
}
var Ws, N0 = () => Ws, Qz = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: nw(Pu) ? $i(Pu) : void 0,
  arrayMethodsPlugin_: nw(tw) ? $i(tw) : void 0
});
function rw(e, t) {
  t && (e.patchPlugin_ = $i(Ru), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function mp(e) {
  yp(e), e.drafts_.forEach(Gz), e.drafts_ = null;
}
function yp(e) {
  e === Ws && (Ws = e.parent_);
}
var iw = (e) => Ws = Qz(Ws, e);
function Gz(e) {
  const t = e[vt];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function ow(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[vt].modified_ && (mp(t), Pt(4)), un(e) && (e = sw(t, e));
    const { patchPlugin_: s } = t;
    s && s.generateReplacementPatches_(
      r[vt].base_,
      e,
      t
    );
  } else
    e = sw(t, r);
  return Yz(t, e, !0), mp(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== fh ? e : void 0;
}
function sw(e, t) {
  if (ec(t))
    return t;
  const r = t[vt];
  if (!r)
    return $u(t, e.handledSet_, e);
  if (!tc(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: o } = r;
    if (o)
      for (; o.length > 0; )
        o.pop()(e);
    D0(r, e);
  }
  return r.copy_;
}
function Yz(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && hh(t, r);
}
function O0(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var tc = (e, t) => e.scope_ === t, Jz = [];
function L0(e, t, r, o) {
  const s = pr(e), l = e.type_;
  if (o !== void 0 && fr(s, o, l) === t) {
    Eu(s, o, r, l);
    return;
  }
  if (!e.draftLocations_) {
    const d = e.draftLocations_ = /* @__PURE__ */ new Map();
    sa(s, (p, f) => {
      if (ln(f)) {
        const m = d.get(f) || [];
        m.push(p), d.set(f, m);
      }
    });
  }
  const u = e.draftLocations_.get(t) ?? Jz;
  for (const d of u)
    Eu(s, d, r, l);
}
function Xz(e, t, r) {
  e.callbacks_.push(function(s) {
    const l = t;
    if (!l || !tc(l, s))
      return;
    s.mapSetPlugin_?.fixSetContents(l);
    const u = ph(l);
    L0(e, l.draft_ ?? l, u, r), D0(l, s);
  });
}
function D0(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: o } = t;
    if (o) {
      const s = o.getPath(e);
      s && o.generatePatches_(e, s, t);
    }
    O0(e);
  }
}
function Zz(e, t, r) {
  const { scope_: o } = e;
  if (ln(r)) {
    const s = r[vt];
    tc(s, o) && s.callbacks_.push(function() {
      iu(e);
      const u = ph(s);
      L0(e, r, u, t);
    });
  } else un(r) && e.callbacks_.push(function() {
    const l = pr(e);
    e.type_ === 3 ? l.has(r) && $u(r, o.handledSet_, o) : fr(l, t, e.type_) === r && o.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && $u(
      fr(e.copy_, t, e.type_),
      o.handledSet_,
      o
    );
  });
}
function $u(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || ln(e) || t.has(e) || !un(e) || ec(e) || (t.add(e), sa(e, (o, s) => {
    if (ln(s)) {
      const l = s[vt];
      if (tc(l, r)) {
        const u = ph(l);
        Eu(e, o, u, e.type_), O0(l);
      }
    } else un(s) && $u(s, t, r);
  })), e;
}
function e5(e, t) {
  const r = aa(e), o = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : N0(),
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
  let s = o, l = Mu;
  r && (s = [o], l = Us);
  const { revoke: u, proxy: d } = Proxy.revocable(s, l);
  return o.draft_ = d, o.revoke_ = u, [d, o];
}
var Mu = {
  get(e, t) {
    if (t === vt)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const o = e.type_ === 1 && typeof t == "string";
    if (o && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const s = pr(e);
    if (!As(s, t, e.type_))
      return t5(e, s, t);
    const l = s[t];
    if (e.finalized_ || !un(l) || o && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && Vz(t))
      return l;
    if (l === $f(e.base_, t)) {
      iu(e);
      const u = e.type_ === 1 ? +t : t, d = wp(e.scope_, l, e, u);
      return e.copy_[u] = d;
    }
    return l;
  },
  has(e, t) {
    return t in pr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(pr(e));
  },
  set(e, t, r) {
    const o = F0(pr(e), t);
    if (o?.set)
      return o.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const s = $f(pr(e), t), l = s?.[vt];
      if (l && l.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (Uz(r, s) && (r !== void 0 || As(e.base_, t, e.type_)))
        return !0;
      iu(e), vp(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), Zz(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return iu(e), $f(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), vp(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = pr(e), o = Reflect.getOwnPropertyDescriptor(r, t);
    return o && {
      [ru]: !0,
      [hp]: e.type_ !== 1 || t !== "length",
      [Cu]: o[Cu],
      [Bs]: r[t]
    };
  },
  defineProperty() {
    Pt(11);
  },
  getPrototypeOf(e) {
    return Ri(e.base_);
  },
  setPrototypeOf() {
    Pt(12);
  }
}, Us = {};
for (let e in Mu) {
  let t = Mu[e];
  Us[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Us.deleteProperty = function(e, t) {
  return Us.set.call(this, e, t, void 0);
};
Us.set = function(e, t, r) {
  return Mu.set.call(this, e[0], t, r, e[0]);
};
function $f(e, t) {
  const r = e[vt];
  return (r ? pr(r) : e)[t];
}
function t5(e, t, r) {
  const o = F0(t, r);
  return o ? Bs in o ? o[Bs] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    o.get?.call(e.draft_)
  ) : void 0;
}
function F0(e, t) {
  if (!(t in e))
    return;
  let r = Ri(e);
  for (; r; ) {
    const o = Object.getOwnPropertyDescriptor(r, t);
    if (o)
      return o;
    r = Ri(r);
  }
}
function vp(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && vp(e.parent_));
}
function iu(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = gp(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var n5 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (t, r, o) => {
      if (Si(t) && !Si(r)) {
        const l = r;
        r = t;
        const u = this;
        return function(p = l, ...f) {
          return u.produce(p, (m) => r.call(this, m, ...f));
        };
      }
      Si(r) || Pt(6), o !== void 0 && !Si(o) && Pt(7);
      let s;
      if (un(t)) {
        const l = iw(this), u = wp(l, t, void 0);
        let d = !0;
        try {
          s = r(u), d = !1;
        } finally {
          d ? mp(l) : yp(l);
        }
        return rw(l, o), ow(s, l);
      } else if (!t || !yo(t)) {
        if (s = r(t), s === void 0 && (s = t), s === fh && (s = void 0), this.autoFreeze_ && hh(s, !0), o) {
          const l = [], u = [];
          $i(Ru).generateReplacementPatches_(t, s, {
            patches_: l,
            inversePatches_: u
          }), o(l, u);
        }
        return s;
      } else
        Pt(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (Si(t))
        return (u, ...d) => this.produceWithPatches(u, (p) => t(p, ...d));
      let o, s;
      return [this.produce(t, r, (u, d) => {
        o = u, s = d;
      }), o, s];
    }, Tf(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), Tf(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), Tf(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    un(e) || Pt(8), ln(e) && (e = j0(e));
    const t = iw(this), r = wp(t, e, void 0);
    return r[vt].isManual_ = !0, yp(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[vt];
    (!r || !r.isManual_) && Pt(9);
    const { scope_: o } = r;
    return rw(o, t), ow(void 0, o);
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
    const o = $i(Ru).applyPatches_;
    return ln(e) ? o(e, t) : this.produce(
      e,
      (s) => o(s, t)
    );
  }
};
function wp(e, t, r, o) {
  const [s, l] = la(t) ? $i(Pu).proxyMap_(t, r) : ua(t) ? $i(Pu).proxySet_(t, r) : e5(t, r);
  return (r?.scope_ ?? N0()).drafts_.push(s), l.callbacks_ = r?.callbacks_ ?? [], l.key_ = o, r && o !== void 0 ? Xz(r, l, o) : l.callbacks_.push(function(p) {
    p.mapSetPlugin_?.fixSetContents(l);
    const { patchPlugin_: f } = p;
    l.modified_ && f && f.generatePatches_(l, [], p);
  }), s;
}
function j0(e) {
  return ln(e) || Pt(10, e), z0(e);
}
function z0(e) {
  if (!un(e) || ec(e))
    return e;
  const t = e[vt];
  let r, o = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = gp(e, t.scope_.immer_.useStrictShallowCopy_), o = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = gp(e, !0);
  return sa(
    r,
    (s, l) => {
      Eu(r, s, z0(l));
    },
    o
  ), t && (t.finalized_ = !1), r;
}
function r5() {
  function t(S, b = []) {
    if (S.key_ !== void 0) {
      const k = S.parent_.copy_ ?? S.parent_.base_, M = Hz(fr(k, S.key_)), N = fr(k, S.key_);
      if (N === void 0 || N !== S.draft_ && N !== S.base_ && N !== S.copy_ || M != null && M.base_ !== S.base_)
        return null;
      const x = S.parent_.type_ === 3;
      let P;
      if (x) {
        const E = S.parent_;
        P = Array.from(E.drafts_.keys()).indexOf(S.key_);
      } else
        P = S.key_;
      if (!(x && k.size > P || As(k, P)))
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
    let k = S;
    for (let M = 0; M < b.length - 1; M++) {
      const N = b[M];
      if (k = fr(k, N), !yo(k) || k === null)
        throw new Error(`Cannot resolve path at '${b.join("/")}'`);
    }
    return k;
  }
  const o = "replace", s = "add", l = "remove";
  function u(S, b, k) {
    if (S.scope_.processedForPatches_.has(S))
      return;
    S.scope_.processedForPatches_.add(S);
    const { patches_: M, inversePatches_: N } = k;
    switch (S.type_) {
      case 0:
      case 2:
        return p(
          S,
          b,
          M,
          N
        );
      case 1:
        return d(
          S,
          b,
          M,
          N
        );
      case 3:
        return f(
          S,
          b,
          M,
          N
        );
    }
  }
  function d(S, b, k, M) {
    let { base_: N, assigned_: x } = S, P = S.copy_;
    P.length < N.length && ([N, P] = [P, N], [k, M] = [M, k]);
    const E = S.allIndicesReassigned_ === !0;
    for (let $ = 0; $ < N.length; $++) {
      const A = P[$], I = N[$];
      if ((E || x?.get($.toString())) && A !== I) {
        const v = A?.[vt];
        if (v && v.modified_)
          continue;
        const T = b.concat([$]);
        k.push({
          op: o,
          path: T,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: C(A)
        }), M.push({
          op: o,
          path: T,
          value: C(I)
        });
      }
    }
    for (let $ = N.length; $ < P.length; $++) {
      const A = b.concat([$]);
      k.push({
        op: s,
        path: A,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: C(P[$])
      });
    }
    for (let $ = P.length - 1; N.length <= $; --$) {
      const A = b.concat([$]);
      M.push({
        op: l,
        path: A
      });
    }
  }
  function p(S, b, k, M) {
    const { base_: N, copy_: x, type_: P } = S;
    sa(S.assigned_, (E, $) => {
      const A = fr(N, E, P), I = fr(x, E, P), L = $ ? As(N, E) ? o : s : l;
      if (A === I && L === o)
        return;
      const v = b.concat(E);
      k.push(
        L === l ? { op: L, path: v } : { op: L, path: v, value: C(I) }
      ), M.push(
        L === s ? { op: l, path: v } : L === l ? { op: s, path: v, value: C(A) } : { op: o, path: v, value: C(A) }
      );
    });
  }
  function f(S, b, k, M) {
    let { base_: N, copy_: x } = S, P = 0;
    N.forEach((E) => {
      if (!x.has(E)) {
        const $ = b.concat([P]);
        k.push({
          op: l,
          path: $,
          value: E
        }), M.unshift({
          op: s,
          path: $,
          value: E
        });
      }
      P++;
    }), P = 0, x.forEach((E) => {
      if (!N.has(E)) {
        const $ = b.concat([P]);
        k.push({
          op: s,
          path: $,
          value: E
        }), M.unshift({
          op: l,
          path: $,
          value: E
        });
      }
      P++;
    });
  }
  function m(S, b, k) {
    const { patches_: M, inversePatches_: N } = k;
    M.push({
      op: o,
      path: [],
      value: b === fh ? void 0 : b
    }), N.push({
      op: o,
      path: [],
      value: S
    });
  }
  function g(S, b) {
    return b.forEach((k) => {
      const { path: M, op: N } = k;
      let x = S;
      for (let A = 0; A < M.length - 1; A++) {
        const I = Ti(x);
        let L = M[A];
        typeof L != "string" && typeof L != "number" && (L = "" + L), (I === 0 || I === 1) && (L === "__proto__" || L === zs) && Pt(19), Si(x) && L === oa && Pt(19), x = fr(x, L), yo(x) || Pt(18, M.join("/"));
      }
      const P = Ti(x), E = w(k.value), $ = M[M.length - 1];
      switch (N) {
        case o:
          switch (P) {
            case 2:
              return x.set($, E);
            case 3:
              Pt(16);
            default:
              return x[$] = E;
          }
        case s:
          switch (P) {
            case 1:
              return $ === "-" ? x.push(E) : x.splice($, 0, E);
            case 2:
              return x.set($, E);
            case 3:
              return x.add(E);
            default:
              return x[$] = E;
          }
        case l:
          switch (P) {
            case 1:
              return x.splice($, 1);
            case 2:
              return x.delete($);
            case 3:
              return x.delete(k.value);
            default:
              return delete x[$];
          }
        default:
          Pt(17, N);
      }
    }), S;
  }
  function w(S) {
    if (!un(S))
      return S;
    if (aa(S))
      return S.map(w);
    if (la(S))
      return new Map(
        Array.from(S.entries()).map(([k, M]) => [k, w(M)])
      );
    if (ua(S))
      return new Set(Array.from(S).map(w));
    const b = Object.create(Ri(S));
    for (const k in S)
      b[k] = w(S[k]);
    return As(S, Ms) && (b[Ms] = S[Ms]), b;
  }
  function C(S) {
    return ln(S) ? w(S) : S;
  }
  Kz(Ru, {
    applyPatches_: g,
    generatePatches_: u,
    generateReplacementPatches_: m,
    getPath: t
  });
}
var Vs = new n5(), ca = Vs.produce, B0 = /* @__PURE__ */ Vs.produceWithPatches.bind(
  Vs
), aw = /* @__PURE__ */ Vs.applyPatches.bind(Vs);
function i5(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function o5(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function s5(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var lw = (e) => Array.isArray(e) ? e : [e];
function a5(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return s5(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function l5(e, t) {
  const r = [], { length: o } = e;
  for (let s = 0; s < o; s++)
    r.push(e[s].apply(null, t));
  return r;
}
var u5 = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, c5 = typeof WeakRef < "u" ? WeakRef : u5, d5 = 0, uw = 1;
function Il() {
  return {
    s: d5,
    v: void 0,
    o: null,
    p: null
  };
}
function Au(e, t = {}) {
  let r = Il();
  const { resultEqualityCheck: o } = t;
  let s, l = 0;
  function u() {
    let d = r;
    const { length: p } = arguments;
    for (let g = 0, w = p; g < w; g++) {
      const C = arguments[g];
      if (typeof C == "function" || typeof C == "object" && C !== null) {
        let S = d.o;
        S === null && (d.o = S = /* @__PURE__ */ new WeakMap());
        const b = S.get(C);
        b === void 0 ? (d = Il(), S.set(C, d)) : d = b;
      } else {
        let S = d.p;
        S === null && (d.p = S = /* @__PURE__ */ new Map());
        const b = S.get(C);
        b === void 0 ? (d = Il(), S.set(C, d)) : d = b;
      }
    }
    const f = d;
    let m;
    if (d.s === uw)
      m = d.v;
    else if (m = e.apply(null, arguments), l++, o) {
      const g = s?.deref?.() ?? s;
      g != null && o(g, m) && (m = g, l !== 0 && l--), s = typeof m == "object" && m !== null || typeof m == "function" ? new c5(m) : m;
    }
    return f.s = uw, f.v = m, m;
  }
  return u.clearCache = () => {
    r = Il(), u.resetResultsCount();
  }, u.resultsCount = () => l, u.resetResultsCount = () => {
    l = 0;
  }, u;
}
function f5(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...s) => {
    let l = 0, u = 0, d, p = {}, f = s.pop();
    typeof f == "object" && (p = f, f = s.pop()), i5(
      f,
      `createSelector expects an output function after the inputs, but received: [${typeof f}]`
    );
    const m = {
      ...r,
      ...p
    }, {
      memoize: g,
      memoizeOptions: w = [],
      argsMemoize: C = Au,
      argsMemoizeOptions: S = []
    } = m, b = lw(w), k = lw(S), M = a5(s), N = g(function() {
      return l++, f.apply(
        null,
        arguments
      );
    }, ...b), x = C(function() {
      u++;
      const E = l5(
        M,
        arguments
      );
      return d = N.apply(null, E), d;
    }, ...k);
    return Object.assign(x, {
      resultFunc: f,
      memoizedResultFunc: N,
      dependencies: M,
      dependencyRecomputations: () => u,
      resetDependencyRecomputations: () => {
        u = 0;
      },
      lastResult: () => d,
      recomputations: () => l,
      resetRecomputations: () => {
        l = 0;
      },
      memoize: g,
      argsMemoize: C
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var gh = /* @__PURE__ */ f5(Au), p5 = Object.assign(
  (e, t = gh) => {
    o5(
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
  { withTypes: () => p5 }
);
function W0(e) {
  return ({ dispatch: r, getState: o }) => (s) => (l) => typeof l == "function" ? l(r, o, e) : s(l);
}
var h5 = W0(), g5 = W0, m5 = { NODE_ENV: "production" }, y5 = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? ku : ku.apply(null, arguments);
}, v5 = (e) => e && typeof e.match == "function";
function In(e, t) {
  function r(...o) {
    if (t) {
      let s = t(...o);
      if (!s)
        throw new Error(wn(0));
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
  return r.toString = () => `${e}`, r.type = e, r.match = (o) => A0(o) && o.type === e, r;
}
var U0 = class _s extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, _s.prototype);
  }
  static get [Symbol.species]() {
    return _s;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new _s(...t[0].concat(this)) : new _s(...t.concat(this));
  }
};
function cw(e) {
  return un(e) ? ca(e, () => {
  }) : e;
}
function Nl(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function w5(e) {
  return typeof e == "boolean";
}
var S5 = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: o = !0,
    serializableCheck: s = !0,
    actionCreatorCheck: l = !0
  } = t ?? {};
  let u = new U0();
  return r && (w5(r) ? u.push(h5) : u.push(g5(r.extraArgument))), u;
}, nc = "RTK_autoBatch", ms = () => (e) => ({
  payload: e,
  meta: {
    [nc]: !0
  }
}), dw = (e) => (t) => {
  setTimeout(t, e);
}, b5 = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const o = t(...r);
  let s = !0, l = !1, u = !1;
  const d = /* @__PURE__ */ new Set(), p = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : dw(10)
  ) : e.type === "callback" ? e.queueNotification : dw(e.timeout), f = () => {
    u = !1, l && (l = !1, d.forEach((m) => m()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(m) {
      const g = () => s && m(), w = o.subscribe(g);
      return d.add(m), () => {
        w(), d.delete(m);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(m) {
      try {
        return s = !m?.meta?.[nc], l = !s, l && (u || (u = !0, p(f))), o.dispatch(m);
      } finally {
        s = !0;
      }
    }
  });
}, _5 = (e) => function(r) {
  const {
    autoBatch: o = !0
  } = r ?? {};
  let s = new U0(e);
  return o && s.push(b5(typeof o == "object" ? o : void 0)), s;
};
function x5(e) {
  const t = S5(), {
    reducer: r = void 0,
    middleware: o,
    devTools: s = !0,
    preloadedState: l = void 0,
    enhancers: u = void 0
  } = e || {};
  let d;
  if (typeof r == "function")
    d = r;
  else if (Yr(r))
    d = dh(r);
  else
    throw new Error(wn(1));
  let p;
  typeof o == "function" ? p = o(t) : p = t();
  let f = ku;
  s && (f = y5({
    // Enable capture of stack traces for dispatched Redux actions
    trace: m5.NODE_ENV !== "production",
    ...typeof s == "object" && s
  }));
  const m = zz(...p), g = _5(m);
  let w = typeof u == "function" ? u(g) : g();
  const C = f(...w);
  return M0(d, l, C);
}
function V0(e) {
  const t = {}, r = [];
  let o;
  const s = {
    addCase(l, u) {
      const d = typeof l == "string" ? l : l.type;
      if (!d)
        throw new Error(wn(28));
      if (d in t)
        throw new Error(wn(29));
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
function k5(e) {
  return typeof e == "function";
}
function C5(e, t) {
  let [r, o, s] = V0(t), l;
  if (k5(e))
    l = () => cw(e());
  else {
    const d = cw(e);
    l = () => d;
  }
  function u(d = l(), p) {
    let f = [r[p.type], ...o.filter(({
      matcher: m
    }) => m(p)).map(({
      reducer: m
    }) => m)];
    return f.filter((m) => !!m).length === 0 && (f = [s]), f.reduce((m, g) => {
      if (g)
        if (ln(m)) {
          const C = g(m, p);
          return C === void 0 ? m : C;
        } else {
          if (un(m))
            return ca(m, (w) => g(w, p));
          {
            const w = g(m, p);
            if (w === void 0) {
              if (m === null)
                return m;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return w;
          }
        }
      return m;
    }, d);
  }
  return u.getInitialState = l, u;
}
var H0 = (e, t) => v5(e) ? e.match(t) : e(t);
function yr(...e) {
  return (t) => e.some((r) => H0(r, t));
}
function Is(...e) {
  return (t) => e.every((r) => H0(r, t));
}
function rc(e, t) {
  if (!e || !e.meta) return !1;
  const r = typeof e.meta.requestId == "string", o = t.indexOf(e.meta.requestStatus) > -1;
  return r && o;
}
function da(e) {
  return typeof e[0] == "function" && "pending" in e[0] && "fulfilled" in e[0] && "rejected" in e[0];
}
function mh(...e) {
  return e.length === 0 ? (t) => rc(t, ["pending"]) : da(e) ? yr(...e.map((t) => t.pending)) : mh()(e[0]);
}
function vo(...e) {
  return e.length === 0 ? (t) => rc(t, ["rejected"]) : da(e) ? yr(...e.map((t) => t.rejected)) : vo()(e[0]);
}
function ic(...e) {
  const t = (r) => r && r.meta && r.meta.rejectedWithValue;
  return e.length === 0 ? Is(vo(...e), t) : da(e) ? Is(vo(...e), t) : ic()(e[0]);
}
function Jr(...e) {
  return e.length === 0 ? (t) => rc(t, ["fulfilled"]) : da(e) ? yr(...e.map((t) => t.fulfilled)) : Jr()(e[0]);
}
function Sp(...e) {
  return e.length === 0 ? (t) => rc(t, ["pending", "fulfilled", "rejected"]) : da(e) ? yr(...e.flatMap((t) => [t.pending, t.rejected, t.fulfilled])) : Sp()(e[0]);
}
var E5 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", yh = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += E5[Math.random() * 64 | 0];
  return t;
}, P5 = ["name", "message", "stack", "code"], Mf = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, fw = class {
  constructor(e, t) {
    this.payload = e, this.meta = t;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
}, R5 = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const r of P5)
      typeof e[r] == "string" && (t[r] = e[r]);
    return t;
  }
  return {
    message: String(e)
  };
}, pw = "External signal was aborted", hw = /* @__PURE__ */ (() => {
  function e(t, r, o) {
    const s = In(t + "/fulfilled", (p, f, m, g) => ({
      payload: p,
      meta: {
        ...g || {},
        arg: m,
        requestId: f,
        requestStatus: "fulfilled"
      }
    })), l = In(t + "/pending", (p, f, m) => ({
      payload: void 0,
      meta: {
        ...m || {},
        arg: f,
        requestId: p,
        requestStatus: "pending"
      }
    })), u = In(t + "/rejected", (p, f, m, g, w) => ({
      payload: g,
      error: (o && o.serializeError || R5)(p || "Rejected"),
      meta: {
        ...w || {},
        arg: m,
        requestId: f,
        rejectedWithValue: !!g,
        requestStatus: "rejected",
        aborted: p?.name === "AbortError",
        condition: p?.name === "ConditionError"
      }
    }));
    function d(p, {
      signal: f
    } = {}) {
      return (m, g, w) => {
        const C = o?.idGenerator ? o.idGenerator(p) : yh(), S = new AbortController();
        let b, k;
        function M(x) {
          k = x, S.abort();
        }
        f && (f.aborted ? M(pw) : f.addEventListener("abort", () => M(pw), {
          once: !0
        }));
        const N = (async function() {
          let x;
          try {
            let E = o?.condition?.(p, {
              getState: g,
              extra: w
            });
            if ($5(E) && (E = await E), E === !1 || S.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const $ = new Promise((A, I) => {
              b = () => {
                I({
                  name: "AbortError",
                  message: k || "Aborted"
                });
              }, S.signal.addEventListener("abort", b, {
                once: !0
              });
            });
            m(l(C, p, o?.getPendingMeta?.({
              requestId: C,
              arg: p
            }, {
              getState: g,
              extra: w
            }))), x = await Promise.race([$, Promise.resolve(r(p, {
              dispatch: m,
              getState: g,
              extra: w,
              requestId: C,
              signal: S.signal,
              abort: M,
              rejectWithValue: (A, I) => new Mf(A, I),
              fulfillWithValue: (A, I) => new fw(A, I)
            })).then((A) => {
              if (A instanceof Mf)
                throw A;
              return A instanceof fw ? s(A.payload, C, p, A.meta) : s(A, C, p);
            })]);
          } catch (E) {
            x = E instanceof Mf ? u(null, C, p, E.payload, E.meta) : u(E, C, p);
          } finally {
            b && S.signal.removeEventListener("abort", b);
          }
          return o && !o.dispatchConditionRejection && u.match(x) && x.meta.condition || m(x), x;
        })();
        return Object.assign(N, {
          abort: M,
          requestId: C,
          arg: p,
          unwrap() {
            return N.then(T5);
          }
        });
      };
    }
    return Object.assign(d, {
      pending: l,
      rejected: u,
      fulfilled: s,
      settled: yr(u, s),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function T5(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function $5(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var M5 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function A5(e, t) {
  return `${e}/${t}`;
}
function I5({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[M5];
  return function(o) {
    const {
      name: s,
      reducerPath: l = s
    } = o;
    if (!s)
      throw new Error(wn(11));
    const u = (typeof o.reducers == "function" ? o.reducers(O5()) : o.reducers) || {}, d = Object.keys(u), p = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, f = {
      addCase(x, P) {
        const E = typeof x == "string" ? x : x.type;
        if (!E)
          throw new Error(wn(12));
        if (E in p.sliceCaseReducersByType)
          throw new Error(wn(13));
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
        type: A5(s, x),
        createNotation: typeof o.reducers == "function"
      };
      D5(P) ? j5(E, P, f, t) : L5(E, P, f);
    });
    function m() {
      const [x = {}, P = [], E = void 0] = typeof o.extraReducers == "function" ? V0(o.extraReducers) : [o.extraReducers], $ = {
        ...x,
        ...p.sliceCaseReducersByType
      };
      return C5(o.initialState, (A) => {
        for (let I in $)
          A.addCase(I, $[I]);
        for (let I of p.sliceMatchers)
          A.addMatcher(I.matcher, I.reducer);
        for (let I of P)
          A.addMatcher(I.matcher, I.reducer);
        E && A.addDefaultCase(E);
      });
    }
    const g = (x) => x, w = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new WeakMap();
    let S;
    function b(x, P) {
      return S || (S = m()), S(x, P);
    }
    function k() {
      return S || (S = m()), S.getInitialState();
    }
    function M(x, P = !1) {
      function E(A) {
        let I = A[x];
        return typeof I > "u" && P && (I = Nl(C, E, k)), I;
      }
      function $(A = g) {
        const I = Nl(w, P, () => /* @__PURE__ */ new WeakMap());
        return Nl(I, A, () => {
          const L = {};
          for (const [v, T] of Object.entries(o.selectors ?? {}))
            L[v] = N5(T, A, () => Nl(C, A, k), P);
          return L;
        });
      }
      return {
        reducerPath: x,
        getSelectors: $,
        get selectors() {
          return $(E);
        },
        selectSlice: E
      };
    }
    const N = {
      name: s,
      reducer: b,
      actions: p.actionCreators,
      caseReducers: p.sliceCaseReducersByName,
      getInitialState: k,
      ...M(l),
      injectInto(x, {
        reducerPath: P,
        ...E
      } = {}) {
        const $ = P ?? l;
        return x.inject({
          reducerPath: $,
          reducer: b
        }, E), {
          ...N,
          ...M($, !0)
        };
      }
    };
    return N;
  };
}
function N5(e, t, r, o) {
  function s(l, ...u) {
    let d = t(l);
    return typeof d > "u" && o && (d = r()), e(d, ...u);
  }
  return s.unwrapped = e, s;
}
var Mn = /* @__PURE__ */ I5();
function O5() {
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
function L5({
  type: e,
  reducerName: t,
  createNotation: r
}, o, s) {
  let l, u;
  if ("reducer" in o) {
    if (r && !F5(o))
      throw new Error(wn(17));
    l = o.reducer, u = o.prepare;
  } else
    l = o;
  s.addCase(e, l).exposeCaseReducer(t, l).exposeAction(t, u ? In(e, u) : In(e));
}
function D5(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function F5(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function j5({
  type: e,
  reducerName: t
}, r, o, s) {
  if (!s)
    throw new Error(wn(18));
  const {
    payloadCreator: l,
    fulfilled: u,
    pending: d,
    rejected: p,
    settled: f,
    options: m
  } = r, g = s(e, l, m);
  o.exposeAction(t, g), u && o.addCase(g.fulfilled, u), d && o.addCase(g.pending, d), p && o.addCase(g.rejected, p), f && o.addMatcher(g.settled, f), o.exposeCaseReducer(t, {
    fulfilled: u || Ol,
    pending: d || Ol,
    rejected: p || Ol,
    settled: f || Ol
  });
}
function Ol() {
}
function wn(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const z5 = {
  alert: null,
  playingAlertId: ""
}, q0 = Mn({
  name: "alerts",
  initialState: z5,
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
}), { setAlert: bB, setTitleStyle: _B, setMessageStyle: xB, setPlayingAlertId: K0 } = q0.actions, B5 = {
  mediaSettings: null,
  playingMediaId: "",
  pausedMediaId: ""
}, Q0 = Mn({
  name: "media",
  initialState: B5,
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
  setMediaSettings: kB,
  setYoutubeSettings: CB,
  setTwitchSettings: EB,
  setTikTokSettings: PB,
  setPlayingMediaId: G0,
  setPausedMediaId: vh
} = Q0.actions;
var W5 = class extends Error {
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
}, U5 = { NODE_ENV: "production" }, Y0 = /* @__PURE__ */ ((e) => (e.uninitialized = "uninitialized", e.pending = "pending", e.fulfilled = "fulfilled", e.rejected = "rejected", e))(Y0 || {}), vr = "uninitialized", bp = "pending", xs = "fulfilled", ks = "rejected";
function gw(e) {
  return {
    status: e,
    isUninitialized: e === vr,
    isLoading: e === bp,
    isSuccess: e === xs,
    isError: e === ks
  };
}
var mw = Yr;
function wh(e, t) {
  if (e === t || !(mw(e) && mw(t) || Array.isArray(e) && Array.isArray(t)))
    return t;
  const r = Object.keys(t), o = Object.keys(e);
  let s = r.length === o.length;
  const l = Array.isArray(t) ? [] : {};
  for (const u of r)
    l[u] = wh(e[u], t[u]), s && (s = e[u] === l[u]);
  return s ? e : l;
}
function _p(e, t, r) {
  return e.reduce((o, s, l) => (t(s, l) && o.push(r(s, l)), o), []).flat();
}
function V5(e) {
  return new RegExp("(^|:)//").test(e);
}
function H5() {
  return typeof document > "u" ? !0 : document.visibilityState !== "hidden";
}
function Sh(e) {
  return e != null;
}
function yw(e) {
  return [...e?.values() ?? []].filter(Sh);
}
function q5() {
  return typeof navigator > "u" || navigator.onLine === void 0 ? !0 : navigator.onLine;
}
var K5 = (e) => e.replace(/\/$/, ""), Q5 = (e) => e.replace(/^\//, "");
function G5(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  if (V5(t))
    return t;
  const r = e.endsWith("/") || !t.startsWith("?") ? "/" : "";
  return e = K5(e), t = Q5(t), `${e}${r}${t}`;
}
function Iu(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
var xp = () => /* @__PURE__ */ new Map(), Y5 = (e) => {
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
}, J5 = (...e) => {
  for (const r of e) if (r.aborted) return AbortSignal.abort(r.reason);
  const t = new AbortController();
  for (const r of e)
    r.addEventListener("abort", () => t.abort(r.reason), {
      signal: t.signal,
      once: !0
    });
  return t.signal;
}, vw = (...e) => fetch(...e), X5 = (e) => e.status >= 200 && e.status <= 299, Z5 = (e) => (
  /*applicat*/
  /ion\/(vnd\.api\+)?json/.test(e.get("content-type") || "")
);
function ww(e) {
  if (!Yr(e))
    return e;
  const t = {
    ...e
  };
  for (const [r, o] of Object.entries(t))
    o === void 0 && delete t[r];
  return t;
}
var e3 = (e) => typeof e == "object" && (Yr(e) || Array.isArray(e) || typeof e.toJSON == "function");
function t3({
  baseUrl: e,
  prepareHeaders: t = (g) => g,
  fetchFn: r = vw,
  paramsSerializer: o,
  isJsonContentType: s = Z5,
  jsonContentType: l = "application/json",
  jsonReplacer: u,
  timeout: d,
  responseHandler: p,
  validateStatus: f,
  ...m
} = {}) {
  return typeof fetch > "u" && r === vw && console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."), async (w, C, S) => {
    const {
      getState: b,
      extra: k,
      endpoint: M,
      forced: N,
      type: x
    } = C;
    let P, {
      url: E,
      headers: $ = new Headers(m.headers),
      params: A = void 0,
      responseHandler: I = p ?? "json",
      validateStatus: L = f ?? X5,
      timeout: v = d,
      ...T
    } = typeof w == "string" ? {
      url: w
    } : w, O = {
      ...m,
      signal: v ? J5(C.signal, Y5(v)) : C.signal,
      ...T
    };
    $ = new Headers(ww($)), O.headers = await t($, {
      getState: b,
      arg: w,
      extra: k,
      endpoint: M,
      forced: N,
      type: x,
      extraOptions: S
    }) || $;
    const F = e3(O.body);
    if (O.body != null && !F && typeof O.body != "string" && O.headers.delete("content-type"), !O.headers.has("content-type") && F && O.headers.set("content-type", l), F && s(O.headers) && (O.body = JSON.stringify(O.body, u)), O.headers.has("accept") || (I === "json" ? O.headers.set("accept", "application/json") : I === "text" && O.headers.set("accept", "text/plain, text/html, */*")), A) {
      const K = ~E.indexOf("?") ? "&" : "?", D = o ? o(A) : new URLSearchParams(ww(A));
      E += K + D;
    }
    E = G5(e, E);
    const B = new Request(E, O);
    P = {
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
        meta: P
      };
    }
    const G = V.clone();
    P.response = G;
    let U, H = "";
    try {
      let K;
      if (await Promise.all([
        g(V, I).then((D) => U = D, (D) => K = D),
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
        meta: P
      };
    }
    return L(V, U) ? {
      data: U,
      meta: P
    } : {
      error: {
        status: V.status,
        data: U
      },
      meta: P
    };
  };
  async function g(w, C) {
    if (typeof C == "function")
      return C(w);
    if (C === "content-type" && (C = s(w.headers) ? "json" : "text"), C === "json") {
      const S = await w.text();
      return S.length ? JSON.parse(S) : null;
    }
    return w.text();
  }
}
var Sw = class {
  constructor(e, t = void 0) {
    this.value = e, this.meta = t;
  }
}, oc = "__rtkq/", n3 = "online", r3 = "offline", J0 = "focused", bh = /* @__PURE__ */ In(`${oc}${J0}`), X0 = /* @__PURE__ */ In(`${oc}un${J0}`), _h = /* @__PURE__ */ In(`${oc}${n3}`), Z0 = /* @__PURE__ */ In(`${oc}${r3}`), fa = "query", eb = "mutation", tb = "infinitequery";
function sc(e) {
  return e.type === fa;
}
function i3(e) {
  return e.type === eb;
}
function ac(e) {
  return e.type === tb;
}
function Nu(e) {
  return sc(e) || ac(e);
}
function xh(e, t, r, o, s, l) {
  const u = o3(e) ? e(t, r, o, s) : e;
  return u ? _p(u, Sh, (d) => l(nb(d))) : [];
}
function o3(e) {
  return typeof e == "function";
}
function nb(e) {
  return typeof e == "string" ? {
    type: e
  } : e;
}
function s3(e, t) {
  return e.catch(t);
}
var wo = (e, t) => e.endpointDefinitions[t], Hs = /* @__PURE__ */ Symbol("forceQueryFn"), kp = (e) => typeof e[Hs] == "function";
function a3({
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
    removeMutationResult: m,
    updateSubscriptionOptions: g
  } = s.internalActions;
  return {
    buildInitiateQuery: M,
    buildInitiateInfiniteQuery: N,
    buildInitiateMutation: x,
    getRunningQueryThunk: w,
    getRunningMutationThunk: C,
    getRunningQueriesThunk: S,
    getRunningMutationsThunk: b
  };
  function w(P, E) {
    return ($) => {
      const A = wo(l, P), I = e({
        queryArgs: E,
        endpointDefinition: A,
        endpointName: P
      });
      return d($)?.get(I);
    };
  }
  function C(P, E) {
    return ($) => p($)?.get(E);
  }
  function S() {
    return (P) => yw(d(P));
  }
  function b() {
    return (P) => yw(p(P));
  }
  function k(P, E) {
    const $ = (A, {
      subscribe: I = !0,
      forceRefetch: L,
      subscriptionOptions: v,
      [Hs]: T,
      ...O
    } = {}) => (F, B) => {
      const j = e({
        queryArgs: A,
        endpointDefinition: E,
        endpointName: P
      });
      let V;
      const G = {
        ...O,
        type: fa,
        subscribe: I,
        forceRefetch: L,
        subscriptionOptions: v,
        endpointName: P,
        originalArgs: A,
        queryCacheKey: j,
        [Hs]: T
      };
      if (sc(E))
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
      const U = s.endpoints[P].select(A), H = F(V), K = U(B()), {
        requestId: D,
        abort: Y
      } = H, ne = K.requestId !== D, te = d(F)?.get(j), se = () => U(B()), le = Object.assign(T ? (
        // a query has been forced (upsertQueryData)
        // -> we want to resolve it once data has been written with the data that will be written
        H.then(se)
      ) : ne && !te ? (
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
        queryCacheKey: j,
        abort: Y,
        async unwrap() {
          const de = await le;
          if (de.isError)
            throw de.error;
          return de.data;
        },
        refetch: (de) => F($(A, {
          subscribe: !1,
          forceRefetch: !0,
          ...de
        })),
        unsubscribe() {
          I && F(f({
            queryCacheKey: j,
            requestId: D
          }));
        },
        updateSubscriptionOptions(de) {
          le.subscriptionOptions = de, F(g({
            endpointName: P,
            requestId: D,
            queryCacheKey: j,
            options: de
          }));
        }
      });
      if (!te && !ne && !T) {
        const de = d(F);
        de.set(j, le), le.then(() => {
          de.delete(j);
        });
      }
      return le;
    };
    return $;
  }
  function M(P, E) {
    return k(P, E);
  }
  function N(P, E) {
    return k(P, E);
  }
  function x(P) {
    return (E, {
      track: $ = !0,
      fixedCacheKey: A
    } = {}) => (I, L) => {
      const v = o({
        type: "mutation",
        endpointName: P,
        originalArgs: E,
        track: $,
        fixedCacheKey: A
      }), T = I(v), {
        requestId: O,
        abort: F,
        unwrap: B
      } = T, j = s3(T.unwrap().then((H) => ({
        data: H
      })), (H) => ({
        error: H
      })), V = () => {
        I(m({
          requestId: O,
          fixedCacheKey: A
        }));
      }, G = Object.assign(j, {
        arg: T.arg,
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
var rb = class extends W5 {
  constructor(e, t, r, o) {
    super(e), this.value = t, this.schemaName = r, this._bqMeta = o;
  }
}, hi = (e, t) => Array.isArray(e) ? e.includes(t) : !!e;
async function gi(e, t, r, o) {
  const s = await e["~standard"].validate(t);
  if (s.issues)
    throw new rb(s.issues, t, r, o);
  return s.value;
}
function bw(e) {
  return e;
}
var ys = (e = {}) => ({
  ...e,
  [nc]: !0
});
function l3({
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
  const m = (T, O, F, B) => (j, V) => {
    const G = r[T], U = o({
      queryArgs: O,
      endpointDefinition: G,
      endpointName: T
    });
    if (j(s.internalActions.queryResultPatched({
      queryCacheKey: U,
      patches: F
    })), !B)
      return;
    const H = s.endpoints[T].select(O)(
      // Work around TS 4.1 mismatch
      V()
    ), K = xh(G.providesTags, H.data, void 0, O, {}, l);
    j(s.internalActions.updateProvidedBy([{
      queryCacheKey: U,
      providedTags: K
    }]));
  };
  function g(T, O, F = 0) {
    const B = [O, ...T];
    return F && B.length > F ? B.slice(0, -1) : B;
  }
  function w(T, O, F = 0) {
    const B = [...T, O];
    return F && B.length > F ? B.slice(1) : B;
  }
  const C = (T, O, F, B = !0) => (j, V) => {
    const U = s.endpoints[T].select(O)(
      // Work around TS 4.1 mismatch
      V()
    ), H = {
      patches: [],
      inversePatches: [],
      undo: () => j(s.util.patchQueryData(T, O, H.inversePatches, B))
    };
    if (U.status === vr)
      return H;
    let K;
    if ("data" in U)
      if (un(U.data)) {
        const [D, Y, ne] = B0(U.data, F);
        H.patches.push(...Y), H.inversePatches.push(...ne), K = D;
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
    return H.patches.length === 0 || j(s.util.patchQueryData(T, O, H.patches, B)), H;
  }, S = (T, O, F) => (B) => B(s.endpoints[T].initiate(O, {
    subscribe: !1,
    forceRefetch: !0,
    [Hs]: () => ({
      data: F
    })
  })), b = (T, O) => T.query && T[O] ? T[O] : bw, k = async (T, {
    signal: O,
    abort: F,
    rejectWithValue: B,
    fulfillWithValue: j,
    dispatch: V,
    getState: G,
    extra: U
  }) => {
    const H = r[T.endpointName], {
      metaSchema: K,
      skipSchemaValidation: D = f
    } = H, Y = T.type === fa;
    try {
      let ne = bw;
      const te = {
        signal: O,
        abort: F,
        dispatch: V,
        getState: G,
        extra: U,
        endpoint: T.endpointName,
        type: T.type,
        forced: Y ? M(T, G()) : void 0,
        queryCacheKey: Y ? T.queryCacheKey : void 0
      }, se = Y ? T[Hs] : void 0;
      let le;
      const de = async (fe, ue, we, _e) => {
        if (ue == null && fe.pages.length)
          return Promise.resolve({
            data: fe
          });
        const qe = {
          queryArg: T.originalArgs,
          pageParam: ue
        }, je = await he(qe), st = _e ? g : w;
        return {
          data: {
            pages: st(fe.pages, je.data, we),
            pageParams: st(fe.pageParams, ue, we)
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
        if (_e && !hi(D, "arg") && (fe = await gi(
          _e,
          fe,
          "argSchema",
          {}
          // we don't have a meta yet, so we can't pass it
        )), se ? ue = se() : H.query ? (ne = b(H, "transformResponse"), ue = await t(H.query(fe), te, we)) : ue = await H.queryFn(fe, te, we, (Ze) => t(Ze, te, we)), typeof process < "u" && U5.NODE_ENV, ue.error) throw new Sw(ue.error, ue.meta);
        let {
          data: st
        } = ue;
        qe && !hi(D, "rawResponse") && (st = await gi(qe, ue.data, "rawResponseSchema", ue.meta));
        let ut = await ne(st, ue.meta, fe);
        return je && !hi(D, "response") && (ut = await gi(je, ut, "responseSchema", ue.meta)), {
          ...ue,
          data: ut
        };
      }
      if (Y && "infiniteQueryOptions" in H) {
        const {
          infiniteQueryOptions: fe
        } = H, {
          maxPages: ue = 1 / 0
        } = fe, we = T.refetchCachedPages ?? fe.refetchCachedPages ?? !0;
        let _e;
        const qe = {
          pages: [],
          pageParams: []
        }, je = u.selectQueryEntry(G(), T.queryCacheKey)?.data, ut = /* arg.forceRefetch */ M(T, G()) && !T.direction || !je ? qe : je;
        if ("direction" in T && T.direction && ut.pages.length) {
          const Ze = T.direction === "backward", Rt = (Ze ? ib : Cp)(fe, ut, T.originalArgs);
          _e = await de(ut, Rt, ue, Ze);
        } else {
          const {
            initialPageParam: Ze = fe.initialPageParam
          } = T, De = je?.pageParams ?? [], Rt = De[0] ?? Ze, ct = De.length;
          if (_e = await de(ut, Rt, ue), se && (_e = {
            data: _e.data.pages[0]
          }), we)
            for (let Ue = 1; Ue < ct; Ue++) {
              const xe = Cp(fe, _e.data, T.originalArgs);
              _e = await de(_e.data, xe, ue);
            }
        }
        le = _e;
      } else
        le = await he(T.originalArgs);
      return K && !hi(D, "meta") && le.meta && (le.meta = await gi(K, le.meta, "metaSchema", le.meta)), j(le.data, ys({
        fulfilledTimeStamp: Date.now(),
        baseQueryMeta: le.meta
      }));
    } catch (ne) {
      let te = ne;
      if (te instanceof Sw) {
        let se = b(H, "transformErrorResponse");
        const {
          rawErrorResponseSchema: le,
          errorResponseSchema: de
        } = H;
        let {
          value: he,
          meta: fe
        } = te;
        try {
          le && !hi(D, "rawErrorResponse") && (he = await gi(le, he, "rawErrorResponseSchema", fe)), K && !hi(D, "meta") && (fe = await gi(K, fe, "metaSchema", fe));
          let ue = await se(he, fe, T.originalArgs);
          return de && !hi(D, "errorResponse") && (ue = await gi(de, ue, "errorResponseSchema", fe)), B(ue, ys({
            baseQueryMeta: fe
          }));
        } catch (ue) {
          te = ue;
        }
      }
      try {
        if (te instanceof rb) {
          const se = {
            endpoint: T.endpointName,
            arg: T.originalArgs,
            type: T.type,
            queryCacheKey: Y ? T.queryCacheKey : void 0
          };
          H.onSchemaFailure?.(te, se), d?.(te, se);
          const {
            catchSchemaFailure: le = p
          } = H;
          if (le)
            return B(le(te, se), ys({
              baseQueryMeta: te._bqMeta
            }));
        }
      } catch (se) {
        te = se;
      }
      throw console.error(te), te;
    }
  };
  function M(T, O) {
    const F = u.selectQueryEntry(O, T.queryCacheKey), B = u.selectConfig(O).refetchOnMountOrArgChange, j = F?.fulfilledTimeStamp, V = T.forceRefetch ?? (T.subscribe && B);
    return V ? V === !0 || (Number(/* @__PURE__ */ new Date()) - Number(j)) / 1e3 >= V : !1;
  }
  const N = () => hw(`${e}/executeQuery`, k, {
    getPendingMeta({
      arg: O
    }) {
      const F = r[O.endpointName];
      return ys({
        startedTimeStamp: Date.now(),
        ...ac(F) ? {
          direction: O.direction
        } : {}
      });
    },
    condition(O, {
      getState: F
    }) {
      const B = F(), j = u.selectQueryEntry(B, O.queryCacheKey), V = j?.fulfilledTimeStamp, G = O.originalArgs, U = j?.originalArgs, H = r[O.endpointName], K = O.direction;
      return kp(O) ? !0 : j?.status === "pending" ? !1 : M(O, B) || sc(H) && H?.forceRefetch?.({
        currentArg: G,
        previousArg: U,
        endpointState: j,
        state: B
      }) ? !0 : !(V && !K);
    },
    dispatchConditionRejection: !0
  }), x = N(), P = N(), E = hw(`${e}/executeMutation`, k, {
    getPendingMeta() {
      return ys({
        startedTimeStamp: Date.now()
      });
    }
  }), $ = (T) => "force" in T, A = (T) => "ifOlderThan" in T, I = (T, O, F = {}) => (B, j) => {
    const V = $(F) && F.force, G = A(F) && F.ifOlderThan, U = (K = !0) => {
      const D = {
        forceRefetch: K,
        subscribe: !1
      };
      return s.endpoints[T].initiate(O, D);
    }, H = s.endpoints[T].select(O)(j());
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
  function L(T) {
    return (O) => O?.meta?.arg?.endpointName === T;
  }
  function v(T, O) {
    return {
      matchPending: Is(mh(T), L(O)),
      matchFulfilled: Is(Jr(T), L(O)),
      matchRejected: Is(vo(T), L(O))
    };
  }
  return {
    queryThunk: x,
    mutationThunk: E,
    infiniteQueryThunk: P,
    prefetch: I,
    updateQueryData: C,
    upsertQueryData: S,
    patchQueryData: m,
    buildMatchThunkActions: v
  };
}
function Cp(e, {
  pages: t,
  pageParams: r
}, o) {
  const s = t.length - 1;
  return e.getNextPageParam(t[s], t, r[s], r, o);
}
function ib(e, {
  pages: t,
  pageParams: r
}, o) {
  return e.getPreviousPageParam?.(t[0], t, r[0], r, o);
}
function ob(e, t, r, o) {
  return xh(r[e.meta.arg.endpointName][t], Jr(e) ? e.payload : void 0, ic(e) ? e.payload : void 0, e.meta.arg.originalArgs, "baseQueryMeta" in e.meta ? e.meta.baseQueryMeta : void 0, o);
}
function _w(e) {
  return ln(e) ? j0(e) : e;
}
function Ll(e, t, r) {
  const o = e[t];
  o && r(o);
}
function qs(e) {
  return ("arg" in e ? e.arg.fixedCacheKey : e.fixedCacheKey) ?? e.requestId;
}
function xw(e, t, r) {
  const o = e[qs(t)];
  o && r(o);
}
var Dl = {};
function u3({
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
  const m = In(`${e}/resetApiState`);
  function g(L, v, T, O) {
    L[v.queryCacheKey] ??= {
      status: vr,
      endpointName: v.endpointName
    }, Ll(L, v.queryCacheKey, (F) => {
      F.status = bp, F.requestId = T && F.requestId ? (
        // for `upsertQuery` **updates**, keep the current `requestId`
        F.requestId
      ) : (
        // for normal queries or `upsertQuery` **inserts** always update the `requestId`
        O.requestId
      ), v.originalArgs !== void 0 && (F.originalArgs = v.originalArgs), F.startedTimeStamp = O.startedTimeStamp;
      const B = s[O.arg.endpointName];
      ac(B) && "direction" in v && (F.direction = v.direction);
    });
  }
  function w(L, v, T, O) {
    Ll(L, v.arg.queryCacheKey, (F) => {
      if (F.requestId !== v.requestId && !O) return;
      const {
        merge: B
      } = s[v.arg.endpointName];
      if (F.status = xs, B)
        if (F.data !== void 0) {
          const {
            fulfilledTimeStamp: j,
            arg: V,
            baseQueryMeta: G,
            requestId: U
          } = v;
          let H = ca(F.data, (K) => B(K, T, {
            arg: V.originalArgs,
            baseQueryMeta: G,
            fulfilledTimeStamp: j,
            requestId: U
          }));
          F.data = H;
        } else
          F.data = T;
      else
        F.data = s[v.arg.endpointName].structuralSharing ?? !0 ? wh(ln(F.data) ? Wz(F.data) : F.data, T) : T;
      delete F.error, F.fulfilledTimeStamp = v.fulfilledTimeStamp;
    });
  }
  const C = Mn({
    name: `${e}/queries`,
    initialState: Dl,
    reducers: {
      removeQueryResult: {
        reducer(L, {
          payload: {
            queryCacheKey: v
          }
        }) {
          delete L[v];
        },
        prepare: ms()
      },
      cacheEntriesUpserted: {
        reducer(L, v) {
          for (const T of v.payload) {
            const {
              queryDescription: O,
              value: F
            } = T;
            g(L, O, !0, {
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
              value: j
            } = O, V = s[F];
            return {
              queryDescription: {
                type: fa,
                endpointName: F,
                originalArgs: O.arg,
                queryCacheKey: o({
                  queryArgs: B,
                  endpointDefinition: V,
                  endpointName: F
                })
              },
              value: j
            };
          }),
          meta: {
            [nc]: !0,
            requestId: yh(),
            timestamp: Date.now()
          }
        })
      },
      queryResultPatched: {
        reducer(L, {
          payload: {
            queryCacheKey: v,
            patches: T
          }
        }) {
          Ll(L, v, (O) => {
            O.data = aw(O.data, T.concat());
          });
        },
        prepare: ms()
      }
    },
    extraReducers(L) {
      L.addCase(t.pending, (v, {
        meta: T,
        meta: {
          arg: O
        }
      }) => {
        const F = kp(O);
        g(v, O, F, T);
      }).addCase(t.fulfilled, (v, {
        meta: T,
        payload: O
      }) => {
        const F = kp(T.arg);
        w(v, T, O, F);
      }).addCase(t.rejected, (v, {
        meta: {
          condition: T,
          arg: O,
          requestId: F
        },
        error: B,
        payload: j
      }) => {
        Ll(v, O.queryCacheKey, (V) => {
          if (!T) {
            if (V.requestId !== F) return;
            V.status = ks, V.error = j ?? B;
          }
        });
      }).addMatcher(d, (v, T) => {
        const {
          queries: O
        } = u(T);
        for (const [F, B] of Object.entries(O))
          // do not rehydrate entries that were currently in flight.
          (B?.status === xs || B?.status === ks) && (v[F] = B);
      });
    }
  }), S = Mn({
    name: `${e}/mutations`,
    initialState: Dl,
    reducers: {
      removeMutationResult: {
        reducer(L, {
          payload: v
        }) {
          const T = qs(v);
          T in L && delete L[T];
        },
        prepare: ms()
      }
    },
    extraReducers(L) {
      L.addCase(r.pending, (v, {
        meta: T,
        meta: {
          requestId: O,
          arg: F,
          startedTimeStamp: B
        }
      }) => {
        F.track && (v[qs(T)] = {
          requestId: O,
          status: bp,
          endpointName: F.endpointName,
          startedTimeStamp: B
        });
      }).addCase(r.fulfilled, (v, {
        payload: T,
        meta: O
      }) => {
        O.arg.track && xw(v, O, (F) => {
          F.requestId === O.requestId && (F.status = xs, F.data = T, F.fulfilledTimeStamp = O.fulfilledTimeStamp);
        });
      }).addCase(r.rejected, (v, {
        payload: T,
        error: O,
        meta: F
      }) => {
        F.arg.track && xw(v, F, (B) => {
          B.requestId === F.requestId && (B.status = ks, B.error = T ?? O);
        });
      }).addMatcher(d, (v, T) => {
        const {
          mutations: O
        } = u(T);
        for (const [F, B] of Object.entries(O))
          // do not rehydrate entries that were currently in flight.
          (B?.status === xs || B?.status === ks) && // only rehydrate endpoints that were persisted using a `fixedCacheKey`
          F !== B?.requestId && (v[F] = B);
      });
    }
  }), b = {
    tags: {},
    keys: {}
  }, k = Mn({
    name: `${e}/invalidation`,
    initialState: b,
    reducers: {
      updateProvidedBy: {
        reducer(L, v) {
          for (const {
            queryCacheKey: T,
            providedTags: O
          } of v.payload) {
            M(L, T);
            for (const {
              type: F,
              id: B
            } of O) {
              const j = (L.tags[F] ??= {})[B || "__internal_without_id"] ??= [];
              j.includes(T) || j.push(T);
            }
            L.keys[T] = O;
          }
        },
        prepare: ms()
      }
    },
    extraReducers(L) {
      L.addCase(C.actions.removeQueryResult, (v, {
        payload: {
          queryCacheKey: T
        }
      }) => {
        M(v, T);
      }).addMatcher(d, (v, T) => {
        const {
          provided: O
        } = u(T);
        for (const [F, B] of Object.entries(O.tags ?? {}))
          for (const [j, V] of Object.entries(B)) {
            const G = (v.tags[F] ??= {})[j || "__internal_without_id"] ??= [];
            for (const U of V)
              G.includes(U) || G.push(U), v.keys[U] = O.keys[U];
          }
      }).addMatcher(yr(Jr(t), ic(t)), (v, T) => {
        N(v, [T]);
      }).addMatcher(C.actions.cacheEntriesUpserted.match, (v, T) => {
        const O = T.payload.map(({
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
  function M(L, v) {
    const T = _w(L.keys[v] ?? []);
    for (const O of T) {
      const F = O.type, B = O.id ?? "__internal_without_id", j = L.tags[F]?.[B];
      j && (L.tags[F][B] = _w(j).filter((V) => V !== v));
    }
    delete L.keys[v];
  }
  function N(L, v) {
    const T = v.map((O) => {
      const F = ob(O, "providesTags", s, p), {
        queryCacheKey: B
      } = O.meta.arg;
      return {
        queryCacheKey: B,
        providedTags: F
      };
    });
    k.caseReducers.updateProvidedBy(L, k.actions.updateProvidedBy(T));
  }
  const x = Mn({
    name: `${e}/subscriptions`,
    initialState: Dl,
    reducers: {
      updateSubscriptionOptions(L, v) {
      },
      unsubscribeQueryResult(L, v) {
      },
      internal_getRTKQSubscriptions() {
      }
    }
  }), P = Mn({
    name: `${e}/internalSubscriptions`,
    initialState: Dl,
    reducers: {
      subscriptionsUpdated: {
        reducer(L, v) {
          return aw(L, v.payload);
        },
        prepare: ms()
      }
    }
  }), E = Mn({
    name: `${e}/config`,
    initialState: {
      online: q5(),
      focused: H5(),
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
      L.addCase(_h, (v) => {
        v.online = !0;
      }).addCase(Z0, (v) => {
        v.online = !1;
      }).addCase(bh, (v) => {
        v.focused = !0;
      }).addCase(X0, (v) => {
        v.focused = !1;
      }).addMatcher(d, (v) => ({
        ...v
      }));
    }
  }), $ = dh({
    queries: C.reducer,
    mutations: S.reducer,
    provided: k.reducer,
    subscriptions: P.reducer,
    config: E.reducer
  }), A = (L, v) => $(m.match(v) ? void 0 : L, v), I = {
    ...E.actions,
    ...C.actions,
    ...x.actions,
    ...P.actions,
    ...S.actions,
    ...k.actions,
    resetApiState: m
  };
  return {
    reducer: A,
    actions: I
  };
}
var $n = /* @__PURE__ */ Symbol.for("RTKQ/skipToken"), sb = {
  status: vr
}, kw = /* @__PURE__ */ ca(sb, () => {
}), Cw = /* @__PURE__ */ ca(sb, () => {
});
function c3({
  serializeQueryArgs: e,
  reducerPath: t,
  createSelector: r
}) {
  const o = (x) => kw, s = (x) => Cw;
  return {
    buildQuerySelector: w,
    buildInfiniteQuerySelector: C,
    buildMutationSelector: S,
    selectInvalidatedBy: b,
    selectCachedArgsForQuery: k,
    selectApiState: u,
    selectQueries: d,
    selectMutations: f,
    selectQueryEntry: p,
    selectConfig: m
  };
  function l(x) {
    return {
      ...x,
      ...gw(x.status)
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
  function m(x) {
    return u(x)?.config;
  }
  function g(x, P, E) {
    return ($) => {
      if ($ === $n)
        return r(o, E);
      const A = e({
        queryArgs: $,
        endpointDefinition: P,
        endpointName: x
      });
      return r((L) => p(L, A) ?? kw, E);
    };
  }
  function w(x, P) {
    return g(x, P, l);
  }
  function C(x, P) {
    const {
      infiniteQueryOptions: E
    } = P;
    function $(A) {
      const I = {
        ...A,
        ...gw(A.status)
      }, {
        isLoading: L,
        isError: v,
        direction: T
      } = I, O = T === "forward", F = T === "backward";
      return {
        ...I,
        hasNextPage: M(E, I.data, I.originalArgs),
        hasPreviousPage: N(E, I.data, I.originalArgs),
        isFetchingNextPage: L && O,
        isFetchingPreviousPage: L && F,
        isFetchNextPageError: v && O,
        isFetchPreviousPageError: v && F
      };
    }
    return g(x, P, $);
  }
  function S() {
    return (x) => {
      let P;
      return typeof x == "object" ? P = qs(x) ?? $n : P = x, r(P === $n ? s : (A) => u(A)?.mutations?.[P] ?? Cw, l);
    };
  }
  function b(x, P) {
    const E = x[t], $ = /* @__PURE__ */ new Set(), A = _p(P, Sh, nb);
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
      for (const T of v)
        $.add(T);
    }
    return Array.from($.values()).flatMap((I) => {
      const L = E.queries[I];
      return L ? {
        queryCacheKey: I,
        endpointName: L.endpointName,
        originalArgs: L.originalArgs
      } : [];
    });
  }
  function k(x, P) {
    return _p(Object.values(d(x)), (E) => E?.endpointName === P && E.status !== vr, (E) => E.originalArgs);
  }
  function M(x, P, E) {
    return P ? Cp(x, P, E) != null : !1;
  }
  function N(x, P, E) {
    return !P || !x.getPreviousPageParam ? !1 : ib(x, P, E) != null;
  }
}
var Ew = WeakMap ? /* @__PURE__ */ new WeakMap() : void 0, Pw = ({
  endpointName: e,
  queryArgs: t
}) => {
  let r = "";
  const o = Ew?.get(t);
  if (typeof o == "string")
    r = o;
  else {
    const s = JSON.stringify(t, (l, u) => (u = typeof u == "bigint" ? {
      $bigint: u.toString()
    } : u, u = Yr(u) ? Object.keys(u).sort().reduce((d, p) => (d[p] = u[p], d), {}) : u, u));
    Yr(t) && Ew?.set(t, s), r = s;
  }
  return `${e}(${r})`;
};
function ab(...e) {
  return function(r) {
    const o = Au((f) => r.extractRehydrationInfo?.(f, {
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
        let m = Pw;
        if ("serializeQueryArgs" in f.endpointDefinition) {
          const g = f.endpointDefinition.serializeQueryArgs;
          m = (w) => {
            const C = g(w);
            return typeof C == "string" ? C : Pw({
              ...w,
              queryArgs: C
            });
          };
        } else r.serializeQueryArgs && (m = r.serializeQueryArgs);
        return m(f);
      },
      tagTypes: [...r.tagTypes || []]
    }, l = {
      endpointDefinitions: {},
      batch(f) {
        f();
      },
      apiUid: yh(),
      extractRehydrationInfo: o,
      hasRehydrationInfo: Au((f) => o(f) != null)
    }, u = {
      injectEndpoints: p,
      enhanceEndpoints({
        addTagTypes: f,
        endpoints: m
      }) {
        if (f)
          for (const g of f)
            s.tagTypes.includes(g) || s.tagTypes.push(g);
        if (m)
          for (const [g, w] of Object.entries(m))
            typeof w == "function" ? w(wo(l, g)) : Object.assign(wo(l, g) || {}, w);
        return u;
      }
    }, d = e.map((f) => f.init(u, s, l));
    function p(f) {
      const m = f.endpoints({
        query: (g) => ({
          ...g,
          type: fa
        }),
        mutation: (g) => ({
          ...g,
          type: eb
        }),
        infiniteQuery: (g) => ({
          ...g,
          type: tb
        })
      });
      for (const [g, w] of Object.entries(m)) {
        if (f.overrideExisting !== !0 && g in l.endpointDefinitions) {
          if (f.overrideExisting === "throw")
            throw new Error(wn(39));
          continue;
        }
        l.endpointDefinitions[g] = w;
        for (const C of d)
          C.injectEndpoint(g, w);
      }
      return u;
    }
    return u.injectEndpoints({
      endpoints: r.endpoints
    });
  };
}
function dr(e, ...t) {
  return Object.assign(e, ...t);
}
var d3 = ({
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
  } = e.internalActions, f = (b, k) => {
    if (d.match(k)) {
      const {
        queryCacheKey: N,
        requestId: x,
        options: P
      } = k.payload, E = b.get(N);
      return E?.has(x) && E.set(x, P), !0;
    }
    if (p.match(k)) {
      const {
        queryCacheKey: N,
        requestId: x
      } = k.payload, P = b.get(N);
      return P && P.delete(x), !0;
    }
    if (e.internalActions.removeQueryResult.match(k))
      return b.delete(k.payload.queryCacheKey), !0;
    if (t.pending.match(k)) {
      const {
        meta: {
          arg: N,
          requestId: x
        }
      } = k, P = Iu(b, N.queryCacheKey, xp);
      return N.subscribe && P.set(x, N.subscriptionOptions ?? P.get(x) ?? {}), !0;
    }
    let M = !1;
    if (t.rejected.match(k)) {
      const {
        meta: {
          condition: N,
          arg: x,
          requestId: P
        }
      } = k;
      if (N && x.subscribe) {
        const E = Iu(b, x.queryCacheKey, xp);
        E.set(P, x.subscriptionOptions ?? E.get(P) ?? {}), M = !0;
      }
    }
    return M;
  }, m = () => r.currentSubscriptions, C = {
    getSubscriptions: m,
    getSubscriptionCount: (b) => m().get(b)?.size ?? 0,
    isRequestSubscribed: (b, k) => !!m()?.get(b)?.get(k)
  };
  function S(b) {
    return JSON.parse(JSON.stringify(Object.fromEntries([...b].map(([k, M]) => [k, Object.fromEntries(M)]))));
  }
  return (b, k) => {
    if (l || (l = S(r.currentSubscriptions)), e.util.resetApiState.match(b))
      return l = {}, r.currentSubscriptions.clear(), u = null, [!0, !1];
    if (e.internalActions.internal_getRTKQSubscriptions.match(b))
      return [!1, C];
    const M = f(r.currentSubscriptions, b);
    let N = !0;
    if (M) {
      u || (u = setTimeout(() => {
        const E = S(r.currentSubscriptions), [, $] = B0(l, () => E);
        k.next(e.internalActions.subscriptionsUpdated($)), l = E, u = null;
      }, 500));
      const x = typeof b.type == "string" && !!b.type.startsWith(s), P = t.rejected.match(b) && b.meta.condition && !!b.meta.arg.subscribe;
      N = !x && !P;
    }
    return [N, !1];
  };
}, f3 = 2147483647 / 1e3 - 1, p3 = ({
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
    unsubscribeQueryResult: m,
    cacheEntriesUpserted: g
  } = t.internalActions, w = yr(m.match, r.fulfilled, r.rejected, g.match);
  function C(x) {
    const P = s.currentSubscriptions.get(x);
    return P ? P.size > 0 : !1;
  }
  const S = {};
  function b(x) {
    for (const P of x.values())
      P?.abort?.();
  }
  const k = (x, P) => {
    const E = P.getState(), $ = u(E);
    if (w(x)) {
      let A;
      if (g.match(x))
        A = x.payload.map((I) => I.queryDescription.queryCacheKey);
      else {
        const {
          queryCacheKey: I
        } = m.match(x) ? x.payload : x.meta.arg;
        A = [I];
      }
      M(A, P, $);
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
      M(Object.keys(A), P, $);
    }
  };
  function M(x, P, E) {
    const $ = P.getState();
    for (const A of x) {
      const I = l($, A);
      I?.endpointName && N(A, I.endpointName, P, E);
    }
  }
  function N(x, P, E, $) {
    const I = wo(o, P)?.keepUnusedDataFor ?? $.keepUnusedDataFor;
    if (I === 1 / 0)
      return;
    const L = Math.max(0, Math.min(I, f3));
    if (!C(x)) {
      const v = S[x];
      v && clearTimeout(v), S[x] = setTimeout(() => {
        if (!C(x)) {
          const T = l(E.getState(), x);
          T?.endpointName && E.dispatch(d(T.endpointName, T.originalArgs))?.abort(), E.dispatch(f({
            queryCacheKey: x
          }));
        }
        delete S[x];
      }, L * 1e3);
    }
  }
  return k;
}, Rw = new Error("Promise never resolved before cacheEntryRemoved."), h3 = ({
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
  const p = Sp(o), f = Sp(s), m = Jr(o, s), g = {}, {
    removeQueryResult: w,
    removeMutationResult: C,
    cacheEntriesUpserted: S
  } = e.internalActions;
  function b(E, $, A) {
    const I = g[E];
    I?.valueResolved && (I.valueResolved({
      data: $,
      meta: A
    }), delete I.valueResolved);
  }
  function k(E) {
    const $ = g[E];
    $ && (delete g[E], $.cacheEntryRemoved());
  }
  function M(E) {
    const {
      arg: $,
      requestId: A
    } = E.meta, {
      endpointName: I,
      originalArgs: L
    } = $;
    return [I, L, A];
  }
  const N = (E, $, A) => {
    const I = x(E);
    function L(v, T, O, F) {
      const B = u(A, T), j = u($.getState(), T);
      !B && j && P(v, F, T, $, O);
    }
    if (o.pending.match(E)) {
      const [v, T, O] = M(E);
      L(v, I, O, T);
    } else if (S.match(E))
      for (const {
        queryDescription: v,
        value: T
      } of E.payload) {
        const {
          endpointName: O,
          originalArgs: F,
          queryCacheKey: B
        } = v;
        L(O, B, E.meta.requestId, F), b(B, T, {});
      }
    else if (s.pending.match(E)) {
      if ($.getState()[t].mutations[I]) {
        const [T, O, F] = M(E);
        P(T, O, I, $, F);
      }
    } else if (m(E))
      b(I, E.payload, E.meta.baseQueryMeta);
    else if (w.match(E) || C.match(E))
      k(I);
    else if (e.util.resetApiState.match(E))
      for (const v of Object.keys(g))
        k(v);
  };
  function x(E) {
    return p(E) ? E.meta.arg.queryCacheKey : f(E) ? E.meta.arg.fixedCacheKey ?? E.meta.requestId : w.match(E) ? E.payload.queryCacheKey : C.match(E) ? qs(E.payload) : "";
  }
  function P(E, $, A, I, L) {
    const v = wo(r, E), T = v?.onCacheEntryAdded;
    if (!T) return;
    const O = {}, F = new Promise((H) => {
      O.cacheEntryRemoved = H;
    }), B = Promise.race([new Promise((H) => {
      O.valueResolved = H;
    }), F.then(() => {
      throw Rw;
    })]);
    B.catch(() => {
    }), g[A] = O;
    const j = e.endpoints[E].select(Nu(v) ? $ : A), V = I.dispatch((H, K, D) => D), G = {
      ...I,
      getCacheEntry: () => j(I.getState()),
      requestId: L,
      extra: V,
      updateCachedData: Nu(v) ? (H) => I.dispatch(e.util.updateQueryData(E, $, H)) : void 0,
      cacheDataLoaded: B,
      cacheEntryRemoved: F
    }, U = T($, G);
    Promise.resolve(U).catch((H) => {
      if (H !== Rw)
        throw H;
    });
  }
  return N;
}, g3 = ({
  api: e,
  context: {
    apiUid: t
  },
  reducerPath: r
}) => (o, s) => {
  e.util.resetApiState.match(o) && s.dispatch(e.internalActions.middlewareRegistered(t));
}, m3 = ({
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
  } = l.internalActions, m = yr(Jr(o), ic(o)), g = yr(Jr(s, o), vo(s, o));
  let w = [], C = 0;
  const S = (M, N) => {
    (s.pending.match(M) || o.pending.match(M)) && C++, g(M) && (C = Math.max(0, C - 1)), m(M) ? k(ob(M, "invalidatesTags", r, u), N) : g(M) ? k([], N) : l.util.invalidateTags.match(M) && k(xh(M.payload, void 0, void 0, void 0, void 0, u), N);
  };
  function b() {
    return C > 0;
  }
  function k(M, N) {
    const x = N.getState(), P = x[e];
    if (w.push(...M), P.config.invalidationBehavior === "delayed" && b())
      return;
    const E = w;
    if (w = [], E.length === 0) return;
    const $ = l.util.selectInvalidatedBy(x, E);
    t.batch(() => {
      const A = Array.from($.values());
      for (const {
        queryCacheKey: I
      } of A) {
        const L = P.queries[I], v = Iu(p.currentSubscriptions, I, xp);
        L && (v.size === 0 ? N.dispatch(f({
          queryCacheKey: I
        })) : L.status !== vr && N.dispatch(d(L)));
      }
    });
  }
  return S;
}, y3 = ({
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
  const f = (k, M) => {
    (r.internalActions.updateSubscriptionOptions.match(k) || r.internalActions.unsubscribeQueryResult.match(k)) && m(k.payload.queryCacheKey, M), (t.pending.match(k) || t.rejected.match(k) && k.meta.condition) && m(k.meta.arg.queryCacheKey, M), (t.fulfilled.match(k) || t.rejected.match(k) && !k.meta.condition) && g(k.meta.arg, M), r.util.resetApiState.match(k) && (S(), p && (clearTimeout(p), p = null), d.clear());
  };
  function m(k, M) {
    d.add(k), p || (p = setTimeout(() => {
      for (const N of d)
        w({
          queryCacheKey: N
        }, M);
      d.clear(), p = null;
    }, 0));
  }
  function g({
    queryCacheKey: k
  }, M) {
    const N = M.getState()[e], x = N.queries[k], P = u.get(k);
    if (!x || x.status === vr) return;
    const {
      lowestPollingInterval: E,
      skipPollingIfUnfocused: $
    } = b(P);
    if (!Number.isFinite(E)) return;
    const A = l.get(k);
    A?.timeout && (clearTimeout(A.timeout), A.timeout = void 0);
    const I = Date.now() + E;
    l.set(k, {
      nextPollTimestamp: I,
      pollingInterval: E,
      timeout: setTimeout(() => {
        (N.config.focused || !$) && M.dispatch(o(x)), g({
          queryCacheKey: k
        }, M);
      }, E)
    });
  }
  function w({
    queryCacheKey: k
  }, M) {
    const x = M.getState()[e].queries[k], P = u.get(k);
    if (!x || x.status === vr)
      return;
    const {
      lowestPollingInterval: E
    } = b(P);
    if (!Number.isFinite(E)) {
      C(k);
      return;
    }
    const $ = l.get(k), A = Date.now() + E;
    (!$ || A < $.nextPollTimestamp) && g({
      queryCacheKey: k
    }, M);
  }
  function C(k) {
    const M = l.get(k);
    M?.timeout && clearTimeout(M.timeout), l.delete(k);
  }
  function S() {
    for (const k of l.keys())
      C(k);
  }
  function b(k = /* @__PURE__ */ new Map()) {
    let M = !1, N = Number.POSITIVE_INFINITY;
    for (const x of k.values())
      x.pollingInterval && (N = Math.min(x.pollingInterval, N), M = x.skipPollingIfUnfocused || M);
    return {
      lowestPollingInterval: N,
      skipPollingIfUnfocused: M
    };
  }
  return f;
}, v3 = ({
  api: e,
  context: t,
  queryThunk: r,
  mutationThunk: o
}) => {
  const s = mh(r, o), l = vo(r, o), u = Jr(r, o), d = {};
  return (f, m) => {
    if (s(f)) {
      const {
        requestId: g,
        arg: {
          endpointName: w,
          originalArgs: C
        }
      } = f.meta, S = wo(t, w), b = S?.onQueryStarted;
      if (b) {
        const k = {}, M = new Promise((E, $) => {
          k.resolve = E, k.reject = $;
        });
        M.catch(() => {
        }), d[g] = k;
        const N = e.endpoints[w].select(Nu(S) ? C : g), x = m.dispatch((E, $, A) => A), P = {
          ...m,
          getCacheEntry: () => N(m.getState()),
          requestId: g,
          extra: x,
          updateCachedData: Nu(S) ? (E) => m.dispatch(e.util.updateQueryData(w, C, E)) : void 0,
          queryFulfilled: M
        };
        b(C, P);
      }
    } else if (u(f)) {
      const {
        requestId: g,
        baseQueryMeta: w
      } = f.meta;
      d[g]?.resolve({
        data: f.payload,
        meta: w
      }), delete d[g];
    } else if (l(f)) {
      const {
        requestId: g,
        rejectedWithValue: w,
        baseQueryMeta: C
      } = f.meta;
      d[g]?.reject({
        error: f.payload ?? f.error,
        isUnhandledError: !w,
        meta: C
      }), delete d[g];
    }
  };
}, w3 = ({
  reducerPath: e,
  context: t,
  api: r,
  refetchQuery: o,
  internalState: s
}) => {
  const {
    removeQueryResult: l
  } = r.internalActions, u = (p, f) => {
    bh.match(p) && d(f, "refetchOnFocus"), _h.match(p) && d(f, "refetchOnReconnect");
  };
  function d(p, f) {
    const m = p.getState()[e], g = m.queries, w = s.currentSubscriptions;
    t.batch(() => {
      for (const C of w.keys()) {
        const S = g[C], b = w.get(C);
        if (!b || !S) continue;
        const k = [...b.values()];
        (k.some((N) => N[f] === !0) || k.every((N) => N[f] === void 0) && m.config[f]) && (b.size === 0 ? p.dispatch(l({
          queryCacheKey: C
        })) : S.status !== vr && p.dispatch(o(S)));
      }
    });
  }
  return u;
};
function S3(e) {
  const {
    reducerPath: t,
    queryThunk: r,
    api: o,
    context: s,
    getInternalState: l
  } = e, {
    apiUid: u
  } = s, d = {
    invalidateTags: In(`${t}/invalidateTags`)
  }, p = (w) => w.type.startsWith(`${t}/`), f = [g3, p3, m3, y3, h3, v3];
  return {
    middleware: (w) => {
      let C = !1;
      const S = l(w.dispatch), b = {
        ...e,
        internalState: S,
        refetchQuery: g,
        isThisApiSliceAction: p,
        mwApi: w
      }, k = f.map((x) => x(b)), M = d3(b), N = w3(b);
      return (x) => (P) => {
        if (!A0(P))
          return x(P);
        C || (C = !0, w.dispatch(o.internalActions.middlewareRegistered(u)));
        const E = {
          ...w,
          next: x
        }, $ = w.getState(), [A, I] = M(P, E, $);
        let L;
        if (A ? L = x(P) : L = I, w.getState()[t] && (N(P, E, $), p(P) || s.hasRehydrationInfo(P)))
          for (const v of k)
            v(P, E, $);
        return L;
      };
    },
    actions: d
  };
  function g(w) {
    return e.api.endpoints[w.endpointName].initiate(w.originalArgs, {
      subscribe: !1,
      forceRefetch: !0
    });
  }
}
var Tw = /* @__PURE__ */ Symbol(), lb = ({
  createSelector: e = gh
} = {}) => ({
  name: Tw,
  init(t, {
    baseQuery: r,
    tagTypes: o,
    reducerPath: s,
    serializeQueryArgs: l,
    keepUnusedDataFor: u,
    refetchOnMountOrArgChange: d,
    refetchOnFocus: p,
    refetchOnReconnect: f,
    invalidationBehavior: m,
    onSchemaFailure: g,
    catchSchemaFailure: w,
    skipSchemaValidation: C
  }, S) {
    r5();
    const b = (de) => de;
    Object.assign(t, {
      reducerPath: s,
      endpoints: {},
      internalActions: {
        onOnline: _h,
        onOffline: Z0,
        onFocus: bh,
        onFocusLost: X0
      },
      util: {}
    });
    const k = c3({
      serializeQueryArgs: l,
      reducerPath: s,
      createSelector: e
    }), {
      selectInvalidatedBy: M,
      selectCachedArgsForQuery: N,
      buildQuerySelector: x,
      buildInfiniteQuerySelector: P,
      buildMutationSelector: E
    } = k;
    dr(t.util, {
      selectInvalidatedBy: M,
      selectCachedArgsForQuery: N
    });
    const {
      queryThunk: $,
      infiniteQueryThunk: A,
      mutationThunk: I,
      patchQueryData: L,
      updateQueryData: v,
      upsertQueryData: T,
      prefetch: O,
      buildMatchThunkActions: F
    } = l3({
      baseQuery: r,
      reducerPath: s,
      context: S,
      api: t,
      serializeQueryArgs: l,
      assertTagType: b,
      selectors: k,
      onSchemaFailure: g,
      catchSchemaFailure: w,
      skipSchemaValidation: C
    }), {
      reducer: B,
      actions: j
    } = u3({
      context: S,
      queryThunk: $,
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
        invalidationBehavior: m
      }
    });
    dr(t.util, {
      patchQueryData: L,
      updateQueryData: v,
      upsertQueryData: T,
      prefetch: O,
      resetApiState: j.resetApiState,
      upsertQueryEntries: j.cacheEntriesUpserted
    }), dr(t.internalActions, j);
    const V = /* @__PURE__ */ new WeakMap(), G = (de) => Iu(V, de, () => ({
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
      getRunningQueriesThunk: ne,
      getRunningQueryThunk: te
    } = a3({
      queryThunk: $,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      serializeQueryArgs: l,
      context: S,
      getInternalState: G
    });
    dr(t.util, {
      getRunningMutationThunk: D,
      getRunningMutationsThunk: Y,
      getRunningQueryThunk: te,
      getRunningQueriesThunk: ne
    });
    const {
      middleware: se,
      actions: le
    } = S3({
      reducerPath: s,
      context: S,
      queryThunk: $,
      mutationThunk: I,
      infiniteQueryThunk: A,
      api: t,
      assertTagType: b,
      selectors: k,
      getRunningQueryThunk: te,
      getInternalState: G
    });
    return dr(t.util, le), dr(t, {
      reducer: B,
      middleware: se
    }), {
      name: Tw,
      injectEndpoint(de, he) {
        const fe = t, ue = fe.endpoints[de] ??= {};
        sc(he) && dr(ue, {
          name: de,
          select: x(de, he),
          initiate: U(de, he)
        }, F($, de)), i3(he) && dr(ue, {
          name: de,
          select: E(),
          initiate: K(de)
        }, F(I, de)), ac(he) && dr(ue, {
          name: de,
          select: P(de, he),
          initiate: H(de, he)
        }, F($, de));
      }
    };
  }
});
lb();
function Fl(e) {
  return e.replace(e[0], e[0].toUpperCase());
}
var b3 = "query", _3 = "mutation", x3 = "infinitequery";
function k3(e) {
  return e.type === b3;
}
function C3(e) {
  return e.type === _3;
}
function ub(e) {
  return e.type === x3;
}
function vs(e, ...t) {
  return Object.assign(e, ...t);
}
var Af = /* @__PURE__ */ Symbol();
function If(e) {
  const t = _.useRef(e), r = _.useMemo(() => wh(t.current, e), [e]);
  return _.useEffect(() => {
    t.current !== r && (t.current = r);
  }, [r]), r;
}
function lo(e) {
  const t = _.useRef(e);
  return _.useEffect(() => {
    $s(t.current, e) || (t.current = e);
  }, [e]), $s(t.current, e) ? t.current : e;
}
var E3 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", P3 = /* @__PURE__ */ E3(), R3 = () => typeof navigator < "u" && navigator.product === "ReactNative", T3 = /* @__PURE__ */ R3(), $3 = () => P3 || T3 ? _.useLayoutEffect : _.useEffect, M3 = /* @__PURE__ */ $3(), $w = (e) => e.isUninitialized ? {
  ...e,
  isUninitialized: !1,
  isFetching: !0,
  isLoading: e.data === void 0,
  // This is the one place where we still have to use `QueryStatus` as an enum,
  // since it's the only reference in the React package and not in the core.
  status: Y0.pending
} : e;
function Nf(e, ...t) {
  const r = {};
  return t.forEach((o) => {
    r[o] = e[o];
  }), r;
}
var Of = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function A3({
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
  const f = l ? ($) => $() : _.useEffect, m = ($) => $.current?.unsubscribe?.(), g = p.endpointDefinitions;
  return {
    buildQueryHooks: x,
    buildInfiniteQueryHooks: P,
    buildMutationHook: E,
    usePrefetch: S
  };
  function w($, A, I) {
    if (A?.endpointName && $.isUninitialized) {
      const {
        endpointName: B
      } = A, j = g[B];
      I !== $n && d({
        queryArgs: A.originalArgs,
        endpointDefinition: j,
        endpointName: B
      }) === d({
        queryArgs: I,
        endpointDefinition: j,
        endpointName: B
      }) && (A = void 0);
    }
    let L = $.isSuccess ? $.data : A?.data;
    L === void 0 && (L = $.data);
    const v = L !== void 0, T = $.isLoading, O = (!A || A.isLoading || A.isUninitialized) && !v && T, F = $.isSuccess || v && (T && !A?.isError || $.isUninitialized);
    return {
      ...$,
      data: L,
      currentData: $.data,
      isFetching: T,
      isLoading: O,
      isSuccess: F
    };
  }
  function C($, A, I) {
    if (A?.endpointName && $.isUninitialized) {
      const {
        endpointName: B
      } = A, j = g[B];
      I !== $n && d({
        queryArgs: A.originalArgs,
        endpointDefinition: j,
        endpointName: B
      }) === d({
        queryArgs: I,
        endpointDefinition: j,
        endpointName: B
      }) && (A = void 0);
    }
    let L = $.isSuccess ? $.data : A?.data;
    L === void 0 && (L = $.data);
    const v = L !== void 0, T = $.isLoading, O = (!A || A.isLoading || A.isUninitialized) && !v && T, F = $.isSuccess || T && v;
    return {
      ...$,
      data: L,
      currentData: $.data,
      isFetching: T,
      isLoading: O,
      isSuccess: F
    };
  }
  function S($, A) {
    const I = r(), L = lo(A);
    return _.useCallback((v, T) => I(e.util.prefetch($, v, {
      ...L,
      ...T
    })), [$, I, L]);
  }
  function b($, A, {
    refetchOnReconnect: I,
    refetchOnFocus: L,
    refetchOnMountOrArgChange: v,
    skip: T = !1,
    pollingInterval: O = 0,
    skipPollingIfUnfocused: F = !1,
    ...B
  } = {}) {
    const {
      initiate: j
    } = e.endpoints[$], V = r(), G = _.useRef(void 0);
    if (!G.current) {
      const fe = V(e.internalActions.internal_getRTKQSubscriptions());
      G.current = fe;
    }
    const U = If(T ? $n : A), H = lo({
      refetchOnReconnect: I,
      refetchOnFocus: L,
      pollingInterval: O,
      skipPollingIfUnfocused: F
    }), K = B.initialPageParam, D = lo(K), Y = B.refetchCachedPages, ne = lo(Y), te = _.useRef(void 0);
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
      if (U === $n) {
        fe?.unsubscribe(), te.current = void 0;
        return;
      }
      const ue = te.current?.subscriptionOptions;
      if (!fe || fe.arg !== U) {
        fe?.unsubscribe();
        const we = V(j(U, {
          subscriptionOptions: H,
          forceRefetch: v,
          ...ub(g[$]) ? {
            initialPageParam: D,
            refetchCachedPages: ne
          } : {}
        }));
        te.current = we;
      } else H !== ue && fe.updateSubscriptionOptions(H);
    }, [V, j, v, U, H, he, D, ne, $]), [te, V, j, H];
  }
  function k($, A) {
    return (L, {
      skip: v = !1,
      selectFromResult: T
    } = {}) => {
      const {
        select: O
      } = e.endpoints[$], F = If(v ? $n : L), B = _.useRef(void 0), j = _.useMemo(() => (
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
            resultEqualityCheck: $s
          }
        })
      ), [O, F]), V = _.useMemo(() => T ? u([j], T, {
        devModeChecks: {
          identityFunctionCheck: "never"
        }
      }) : j, [j, T]), G = o((K) => V(K, B.current), $s), U = s(), H = j(U.getState(), B.current);
      return M3(() => {
        B.current = H;
      }, [H]), G;
    };
  }
  function M($) {
    _.useEffect(() => () => {
      m($), $.current = void 0;
    }, [$]);
  }
  function N($) {
    if (!$.current) throw new Error(wn(38));
    return $.current.refetch();
  }
  function x($) {
    const A = (v, T = {}) => {
      const [O] = b($, v, T);
      return M(O), _.useMemo(() => ({
        /**
         * A method to manually refetch data for the query
         */
        refetch: () => N(O)
      }), [O]);
    }, I = ({
      refetchOnReconnect: v,
      refetchOnFocus: T,
      pollingInterval: O = 0,
      skipPollingIfUnfocused: F = !1
    } = {}) => {
      const {
        initiate: B
      } = e.endpoints[$], j = r(), [V, G] = _.useState(Af), U = _.useRef(void 0), H = lo({
        refetchOnReconnect: v,
        refetchOnFocus: T,
        pollingInterval: O,
        skipPollingIfUnfocused: F
      });
      f(() => {
        const ne = U.current?.subscriptionOptions;
        H !== ne && U.current?.updateSubscriptionOptions(H);
      }, [H]);
      const K = _.useRef(H);
      f(() => {
        K.current = H;
      }, [H]);
      const D = _.useCallback(function(ne, te = !1) {
        let se;
        return t(() => {
          m(U), U.current = se = j(B(ne, {
            subscriptionOptions: K.current,
            forceRefetch: !te
          })), G(ne);
        }), se;
      }, [j, B]), Y = _.useCallback(() => {
        U.current?.queryCacheKey && j(e.internalActions.removeQueryResult({
          queryCacheKey: U.current?.queryCacheKey
        }));
      }, [j]);
      return _.useEffect(() => () => {
        m(U);
      }, []), _.useEffect(() => {
        V !== Af && !U.current && D(V, !0);
      }, [V, D]), _.useMemo(() => [D, V, {
        reset: Y
      }], [D, V, Y]);
    }, L = k($, w);
    return {
      useQueryState: L,
      useQuerySubscription: A,
      useLazyQuerySubscription: I,
      useLazyQuery(v) {
        const [T, O, {
          reset: F
        }] = I(v), B = L(O, {
          ...v,
          skip: O === Af
        }), j = _.useMemo(() => ({
          lastArg: O
        }), [O]);
        return _.useMemo(() => [T, {
          ...B,
          reset: F
        }, j], [T, B, F, j]);
      },
      useQuery(v, T) {
        const O = A(v, T), F = L(v, {
          selectFromResult: v === $n || T?.skip ? void 0 : $w,
          ...T
        }), B = Nf(F, ...Of);
        return _.useDebugValue(B), _.useMemo(() => ({
          ...F,
          ...O
        }), [F, O]);
      }
    };
  }
  function P($) {
    const A = (L, v = {}) => {
      const [T, O, F, B] = b($, L, v), j = _.useRef(B);
      f(() => {
        j.current = B;
      }, [B]);
      const V = v.refetchCachedPages, G = lo(V), U = _.useCallback(function(D, Y) {
        let ne;
        return t(() => {
          m(T), T.current = ne = O(F(D, {
            subscriptionOptions: j.current,
            direction: Y
          }));
        }), ne;
      }, [T, O, F]);
      M(T);
      const H = If(v.skip ? $n : L), K = _.useCallback((D) => {
        if (!T.current) throw new Error(wn(38));
        const Y = {
          refetchCachedPages: D?.refetchCachedPages ?? G
        };
        return T.current.refetch(Y);
      }, [T, G]);
      return _.useMemo(() => ({
        trigger: U,
        /**
         * A method to manually refetch data for the query
         */
        refetch: K,
        fetchNextPage: () => U(H, "forward"),
        fetchPreviousPage: () => U(H, "backward")
      }), [K, U, H]);
    }, I = k($, C);
    return {
      useInfiniteQueryState: I,
      useInfiniteQuerySubscription: A,
      useInfiniteQuery(L, v) {
        const {
          refetch: T,
          fetchNextPage: O,
          fetchPreviousPage: F
        } = A(L, v), B = I(L, {
          selectFromResult: L === $n || v?.skip ? void 0 : $w,
          ...v
        }), j = Nf(B, ...Of, "hasNextPage", "hasPreviousPage");
        return _.useDebugValue(j), _.useMemo(() => ({
          ...B,
          fetchNextPage: O,
          fetchPreviousPage: F,
          refetch: T
        }), [B, O, F, T]);
      }
    };
  }
  function E($) {
    return ({
      selectFromResult: A,
      fixedCacheKey: I
    } = {}) => {
      const {
        select: L,
        initiate: v
      } = e.endpoints[$], T = r(), [O, F] = _.useState();
      _.useEffect(() => () => {
        O?.arg.fixedCacheKey || O?.reset();
      }, [O]);
      const B = _.useCallback(function(ne) {
        const te = T(v(ne, {
          fixedCacheKey: I
        }));
        return F(te), te;
      }, [T, v, I]), {
        requestId: j
      } = O || {}, V = _.useMemo(() => L({
        fixedCacheKey: I,
        requestId: O?.requestId
      }), [I, O, L]), G = _.useMemo(() => A ? u([V], A) : V, [A, V]), U = o(G, $s), H = I == null ? O?.arg.originalArgs : void 0, K = _.useCallback(() => {
        t(() => {
          O && F(void 0), I && T(e.internalActions.removeMutationResult({
            requestId: j,
            fixedCacheKey: I
          }));
        });
      }, [T, I, O, j]), D = Nf(U, ...Of, "endpointName");
      _.useDebugValue(D);
      const Y = _.useMemo(() => ({
        ...U,
        originalArgs: H,
        reset: K
      }), [U, H, K]);
      return _.useMemo(() => [B, Y], [B, Y]);
    };
  }
}
var I3 = /* @__PURE__ */ Symbol(), N3 = ({
  batch: e = Nz,
  hooks: t = {
    useDispatch: Zu,
    useSelector: Qn,
    useStore: T0
  },
  createSelector: r = gh,
  unstable__sideEffectsInRender: o = !1,
  ...s
} = {}) => ({
  name: I3,
  init(l, {
    serializeQueryArgs: u
  }, d) {
    const p = l, {
      buildQueryHooks: f,
      buildInfiniteQueryHooks: m,
      buildMutationHook: g,
      usePrefetch: w
    } = A3({
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
    return vs(p, {
      usePrefetch: w
    }), vs(d, {
      batch: e
    }), {
      injectEndpoint(C, S) {
        if (k3(S)) {
          const {
            useQuery: b,
            useLazyQuery: k,
            useLazyQuerySubscription: M,
            useQueryState: N,
            useQuerySubscription: x
          } = f(C);
          vs(p.endpoints[C], {
            useQuery: b,
            useLazyQuery: k,
            useLazyQuerySubscription: M,
            useQueryState: N,
            useQuerySubscription: x
          }), l[`use${Fl(C)}Query`] = b, l[`useLazy${Fl(C)}Query`] = k;
        }
        if (C3(S)) {
          const b = g(C);
          vs(p.endpoints[C], {
            useMutation: b
          }), l[`use${Fl(C)}Mutation`] = b;
        } else if (ub(S)) {
          const {
            useInfiniteQuery: b,
            useInfiniteQuerySubscription: k,
            useInfiniteQueryState: M
          } = m(C);
          vs(p.endpoints[C], {
            useInfiniteQuery: b,
            useInfiniteQuerySubscription: k,
            useInfiniteQueryState: M
          }), l[`use${Fl(C)}InfiniteQuery`] = b;
        }
      }
    };
  }
}), O3 = /* @__PURE__ */ ab(lb(), N3());
const wr = O3({
  reducerPath: "widget-api",
  tagTypes: ["Messages", "Widgets"],
  baseQuery: t3({ baseUrl: "http://localhost:12553/api" }),
  endpoints: () => ({})
}), Cs = wr.injectEndpoints({
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
  useGetWidgetByIdQuery: L3
} = Cs, Xt = () => {
  const e = _.useContext($0);
  if (!e)
    throw new Error("useAppEvents must be used within a EventsProvider");
  return e;
}, D3 = wr.injectEndpoints({
  endpoints: (e) => ({
    getAlerts: e.query({
      query: () => ({
        url: "/alerts"
      })
    })
  })
}), F3 = wr.injectEndpoints({
  endpoints: (e) => ({
    getAucFighterSettings: e.query({
      query: () => ({
        url: "/auc-fighter-settings"
      })
    })
  })
}), cb = wr.injectEndpoints({
  endpoints: (e) => ({
    getNotEndedGoal: e.query({
      query: (t) => ({
        params: { ...t },
        url: "/goals"
      })
    })
  })
}), { useGetNotEndedGoalQuery: j3 } = cb, kh = wr.injectEndpoints({
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
}), { useGetMessagesInfiniteQuery: z3 } = kh, B3 = wr.injectEndpoints({
  endpoints: (e) => ({
    getSettings: e.query({
      query: () => ({
        url: "/settings"
      })
    })
  })
}), W3 = (e) => {
  const t = _.useRef(null), r = Xt(), o = Zu(), s = async (l) => {
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
              f.widget_token = "", t.current?.contentWindow?.postMessage({ id: u, data: f }, "*");
            });
            break;
          case "widgets:goals.read": {
            const { data: f, error: m } = await o(
              cb.endpoints.getNotEndedGoal.initiate(
                p,
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
              "*"
            );
            break;
          }
          case "widgets:auc-fighter:settings.read": {
            const { data: f, error: m } = await o(
              F3.endpoints.getAucFighterSettings.initiate(
                void 0,
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
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
            const f = p, { data: m, error: g } = await o(
              kh.endpoints.getMessages.initiate(f, {
                initialPageParam: {
                  limit: f.limit,
                  offset: f.offset
                },
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: m?.pages.flat(), error: g },
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
            const { data: f, error: m } = await o(
              B3.endpoints.getSettings.initiate(void 0, {
                forceRefetch: !0
              })
            );
            f && (f.widget_token = ""), t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
              "*"
            );
            break;
          }
          case "widgets:alerts.read": {
            const { data: f, error: m } = await o(
              D3.endpoints.getAlerts.initiate(void 0, {
                forceRefetch: !0
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
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
              const { data: f, error: m } = await o(
                Cs.endpoints.getWidgetById.initiate(
                  {
                    id: e.id
                  },
                  { forceRefetch: !0 }
                )
              );
              t.current?.contentWindow?.postMessage(
                { id: u, data: f?.view_storage, error: m },
                "*"
              );
            }
            break;
          case "widgets:control:storage.read": {
            const { data: f, error: m } = await o(
              Cs.endpoints.getWidgetById.initiate(
                {
                  id: e.id
                },
                { forceRefetch: !0 }
              )
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f?.control_storage, error: m },
              "*"
            );
            break;
          }
          case "widgets:view:storage.write": {
            const { data: f, error: m } = await o(
              Cs.endpoints.updateWidgetViewStorage.initiate({
                ...e,
                viewStorage: JSON.stringify(p)
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
              "*"
            );
            break;
          }
          case "widgets:control:storage.write": {
            const { data: f, error: m } = await o(
              Cs.endpoints.updateControlViewStorage.initiate({
                ...e,
                controlStorage: JSON.stringify(p)
              })
            );
            t.current?.contentWindow?.postMessage(
              { id: u, data: f, error: m },
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
        const m = f instanceof Error ? f.message : String(f);
        t.current?.contentWindow?.postMessage(
          { id: u, error: m },
          "*"
        );
      }
  };
  return _.useLayoutEffect(() => (window.addEventListener("message", s), () => {
    window.removeEventListener("message", s);
  }), [s]), t;
}, U3 = ({ type: e }) => {
  const { id: t } = wT(), [r] = c$(), { data: o } = L3({ id: t }), s = W3(o);
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: o && /* @__PURE__ */ z.jsx(
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
}, { palette: V3 } = ea(), H3 = {
  palette: {
    mode: "dark",
    primary: V3.augmentColor({
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
}, db = (e) => {
  switch (e) {
    case hr.UAH:
      return "₴";
    case hr.EUR:
      return "€";
    case hr.RUB:
      return "₽";
    case hr.USD:
      return "$";
    case hr.NONE:
      return "";
  }
}, Wt = ({
  percent: e,
  width: t,
  coefficient: r = 1
}) => `${t / 100 * (e / 100) * r}px`, q3 = (e) => {
  switch (e) {
    case Dt.Left:
      return "1fr auto";
    case Dt.Right:
      return "auto 1fr";
    default:
      return;
  }
}, K3 = (e) => {
  switch (e) {
    case Dt.Top:
      return "1fr auto";
    case Dt.Bottom:
      return "auto 1fr";
    default:
      return;
  }
}, Q3 = (e) => {
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
}, jl = ({
  alert: e,
  imageSrc: t,
  width: r,
  height: o,
  backgroundColor: s,
  text: l,
  children: u
}) => /* @__PURE__ */ z.jsxs(
  "div",
  {
    style: {
      display: "grid",
      height: o,
      width: r,
      backgroundColor: s,
      gridTemplateAreas: Q3(e.view_type),
      gridAutoRows: K3(e.view_type),
      gridAutoColumns: q3(e.view_type),
      placeItems: "center",
      gap: 5,
      color: "white",
      fontSize: 25
    },
    children: [
      e.show_image && /* @__PURE__ */ z.jsx(
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
      /* @__PURE__ */ z.jsxs(
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
            /* @__PURE__ */ z.jsx(
              "span",
              {
                style: {
                  display: "block",
                  fontSize: Wt({
                    percent: e.title_style.font_size,
                    width: r,
                    coefficient: e.type === Ft.Donation ? 4 : 12
                  }),
                  color: e.title_style.text_color,
                  fontWeight: e.title_style.bold ? "bold" : void 0,
                  fontStyle: e.title_style.italics ? "italic" : void 0,
                  textDecoration: e.title_style.underline ? "underline" : void 0,
                  letterSpacing: Wt({
                    percent: e.title_style.letter_spacing,
                    width: r
                  }),
                  wordSpacing: Wt({
                    percent: e.title_style.word_spacing,
                    width: r
                  })
                },
                children: u
              }
            ),
            /* @__PURE__ */ z.jsx(
              "span",
              {
                style: {
                  display: "block",
                  fontSize: Wt({
                    percent: e.message_style.font_size,
                    width: r,
                    coefficient: e.type === Ft.Donation ? 4 : 8
                  }),
                  color: e.message_style.text_color,
                  fontWeight: e.message_style.bold ? "bold" : void 0,
                  fontStyle: e.message_style.italics ? "italic" : void 0,
                  textDecoration: e.message_style.underline ? "underline" : void 0,
                  letterSpacing: Wt({
                    percent: e.message_style.letter_spacing,
                    width: r
                  }),
                  wordSpacing: Wt({
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
), G3 = ({
  alert: e,
  message: t,
  imageSrc: r,
  width: o,
  height: s,
  backgroundColor: l
}) => {
  const { t: u } = br();
  switch (t.type) {
    case Ft.Donation: {
      const d = t.donation;
      return /* @__PURE__ */ z.jsx(
        jl,
        {
          alert: e,
          text: d.text,
          imageSrc: r,
          width: o,
          height: s,
          backgroundColor: l,
          children: u("message.donated", {
            user_name: d.user_name,
            currency: db(d.currency),
            amount: d.amount
          })
        }
      );
    }
    case Ft.Follow: {
      const d = t.follow;
      return /* @__PURE__ */ z.jsx(
        jl,
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
      return /* @__PURE__ */ z.jsx(
        jl,
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
      return /* @__PURE__ */ z.jsx(
        jl,
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
      return /* @__PURE__ */ z.jsx("div", {});
  }
}, Y3 = ({
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
      amount: e.variation_conditions === go.AmountIsEqual ? e.amount : e.amount + 1,
      user_name: t,
      played: !1,
      text: r,
      currency: hr.EUR,
      exchanged_amount: 1,
      exchanged_currency: hr.EUR,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
      service: kt.Tribute,
      id: crypto.randomUUID(),
      message_id: s
    },
    follow: {
      user_name: t,
      id: crypto.randomUUID(),
      service_id: crypto.randomUUID(),
      message_id: s,
      service: kt.Twitch,
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
      service: kt.Twitch,
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
      service: kt.Twitch,
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)
    }
  };
}, zl = ({
  alerts: e,
  message: t
}) => {
  const o = new URLSearchParams(window.location.search).get("group_id"), s = e.filter(
    (d) => d.status && d.group_id === o && d.type == t.type
  ), l = s.filter(
    (d) => d.variation_conditions === go.Random
  ), u = t.donation?.amount;
  if (u) {
    const d = s.filter(
      (g) => g.variation_conditions === go.AmountIsGreater
    ).sort((g, w) => w.amount - g.amount), f = s.filter(
      (g) => g.variation_conditions === go.AmountIsEqual
    ).find((g) => g.amount === u);
    if (f) return f;
    const m = d.find((g) => g.amount < u);
    if (m) return m;
  }
  if (l.length)
    return l[Math.floor(Math.random() * l.length)];
}, J3 = () => {
  const { t: e } = br(), t = Xt(), r = _.useRef(new Audio()), o = _.useRef(new Audio()), s = _.useRef([]), l = _.useRef(null), u = _.useRef([]), [d, p] = _.useState(), [f, m] = _.useState(), g = _.useCallback(
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
            ($) => $.id !== x.id
          );
          const E = u.current.at(0);
          p(void 0), setTimeout(() => {
            if (E) {
              const $ = zl({
                alerts: s.current,
                message: E
              });
              $ && w({ message: E, alert: $ });
            }
          }, 0);
        },
        P ? 0 : 3e3
      );
    },
    []
  ), w = _.useCallback(
    ({ message: x, alert: P }) => {
      l.current && !l.current.alert_paused && setTimeout(() => {
        l.current && u.current.length && (t.send({
          event: ie.AlertPlaying,
          data: x.id
        }), r.current.src = `static/${P.audio}`, r.current.volume = P.audio_volume / 100, r.current.play(), p(x), m(P));
      }, l.current.moderation_duration);
    },
    []
  ), C = _.useCallback((x) => {
    const E = new URLSearchParams(window.location.search).get("group_id"), $ = s.current.find(
      (I) => I.id === x && I.group_id === E
    );
    if (!$) return;
    const A = Y3({
      alert: $,
      userName: e("alert.test_name"),
      text: e("alert.test_text"),
      type: $.type
    });
    A && !u.current.length && l.current && (t.send({
      event: ie.AlertPlaying,
      data: A.id
    }), r.current.src = `static/${$.audio}`, r.current.volume = $.audio_volume / 100, r.current.play(), p(A), m($));
  }, []), S = _.useCallback(
    (x) => {
      d?.id === x ? g({ message: d, skip: !0 }) : u.current = u.current.filter(
        (P) => P.id !== x
      );
    },
    [g, d]
  ), b = _.useCallback(() => {
    d && g({ message: d, skip: !0 });
  }, [g, d]), k = _.useCallback(
    (x) => {
      const P = zl({
        alerts: s.current,
        message: x
      });
      P && (u.current = [...u.current, x], u.current.length === 1 && w({ message: x, alert: P }));
    },
    [w]
  ), M = _.useCallback(
    (x) => {
      const P = zl({
        alerts: s.current,
        message: x
      });
      P && (u.current = [x, ...u.current], u.current.length === 1 && w({ message: x, alert: P }));
    },
    [w]
  ), N = _.useCallback(() => {
    const x = d?.donation?.audio;
    x && l.current ? (o.current.src = `static/audio/${x}`, o.current.volume = l.current.tts_volume / 100, o.current.play()) : g({ message: d });
  }, [d, g]);
  return _.useEffect(() => (o.current.onended = () => g({ message: d }), o.current.onerror = () => g({ message: d }), () => {
    o.current.onended = null, o.current.onerror = null;
  }), [d, g]), _.useEffect(() => (r.current.onended = N, r.current.onerror = N, () => {
    r.current.onended = null, r.current.onerror = null;
  }), [N]), _.useEffect(() => {
    const x = t.subscribe(
      ie.Message,
      k
    );
    return () => x();
  }, [k]), _.useEffect(() => {
    const x = t.subscribe(
      ie.ReplayAlert,
      M
    );
    return () => x();
  }, [M]), _.useEffect(() => {
    const x = t.subscribe(
      ie.SkipAlert,
      (P) => {
        S(P);
      }
    );
    return () => x();
  }, [S]), _.useEffect(() => {
    const x = t.subscribe(
      ie.TestAlert,
      (P) => {
        C(P);
      }
    );
    return () => x();
  }, [C]), _.useEffect(() => {
    const x = t.subscribe(
      ie.SkipPlayingAlert,
      b
    );
    return () => x();
  }, [b]), _.useEffect(() => {
    const x = t.subscribe(
      ie.Alerts,
      (P) => {
        s.current = P;
      }
    );
    return () => x();
  }, []), _.useEffect(() => {
    const x = t.subscribe(
      ie.Settings,
      (P) => {
        if (l.current?.alert_paused && !P.alert_paused) {
          l.current = P;
          const E = u.current.at(0);
          if (E) {
            const $ = zl({
              alerts: s.current,
              message: E
            });
            $ && w({ message: E, alert: $ });
          }
          return;
        }
        l.current = P;
      }
    );
    return () => x();
  }, [w]), {
    currentMessage: d,
    currentAlert: f,
    settings: l.current
  };
}, X3 = () => {
  const { currentAlert: e, currentMessage: t } = J3();
  return t && e && /* @__PURE__ */ z.jsx(
    G3,
    {
      alert: e,
      message: t,
      width: window.innerWidth,
      height: window.innerHeight,
      imageSrc: `static/${e.image}`
    }
  );
}, Z3 = ({
  layout: e,
  currentAmount: t,
  amountRaise: r,
  currentAmountPercent: o,
  currency: s
}) => {
  switch (e) {
    case wi.Percent:
      return `${o}%`;
    case wi.CurrentAmount:
      return `${t} ${s ?? ""}`;
    case wi.CurrentAmountPercent:
      return `${t} ${s ?? ""} (${o}%)`;
    case wi.CurrentAmountRemainingAmount:
      return `${t}/${r} ${s ?? ""}`;
    case wi.CurrentAmountRemainingAmountPercent:
      return `${t}/${r} ${s ?? ""} (${o}%)`;
  }
}, e4 = ({
  goal: e,
  width: t,
  height: r,
  backgroundColor: o,
  currentAmount: s,
  currency: l
}) => {
  const u = Math.floor(
    s / e.amount_raise * 100
  ), d = Z3({
    layout: e.progress_bar_layout,
    currentAmount: s,
    amountRaise: e.amount_raise,
    currentAmountPercent: u,
    currency: e.type === pp.Donation ? l : void 0
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
  }, m = {
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
  return /* @__PURE__ */ z.jsxs(
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
        e.goal_title_type === Ur.OnTop && /* @__PURE__ */ z.jsx("div", { style: p, children: e.title }),
        e.goal_progress_bar === Ur.OnTop && /* @__PURE__ */ z.jsx("div", { style: f, children: d }),
        /* @__PURE__ */ z.jsxs(
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
              /* @__PURE__ */ z.jsx("div", { style: { position: "absolute", inset: 0 }, children: /* @__PURE__ */ z.jsx(
                "div",
                {
                  style: {
                    height: "100%",
                    background: e.background_bar_color,
                    position: "relative"
                  },
                  children: /* @__PURE__ */ z.jsx(
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
              /* @__PURE__ */ z.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    height: "100%",
                    overflowWrap: "anywhere"
                  },
                  children: [
                    e.goal_title_type === Ur.Inside && /* @__PURE__ */ z.jsx("div", { style: p, children: e.title }),
                    e.goal_progress_bar === Ur.Inside && /* @__PURE__ */ z.jsx("div", { style: f, children: d })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { style: { width: "90%", position: "relative" }, children: [
          e.goal_amount_limits && /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: {
                ...m,
                display: "flex",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ z.jsx("span", { children: "0" }),
                /* @__PURE__ */ z.jsx("span", { children: e.amount_raise })
              ]
            }
          ),
          /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                alignContent: "center",
                overflowWrap: "anywhere"
              },
              children: [
                e.goal_title_type === Ur.Below && /* @__PURE__ */ z.jsx("div", { style: p, children: e.title }),
                e.goal_progress_bar === Ur.Below && /* @__PURE__ */ z.jsx("div", { style: f, children: d })
              ]
            }
          )
        ] })
      ]
    }
  );
}, t4 = () => {
  const e = Xt(), [t, r] = _.useState(), s = new URLSearchParams(window.location.search).get("type"), { data: l } = j3({ type: s }, { skip: !s }), [u, d] = _.useState();
  return _.useEffect(() => {
    l && r(l);
  }, [l]), _.useEffect(() => {
    const p = e.subscribe(
      ie.Goal,
      (f) => {
        l && f.id === l.id && r(f);
      }
    );
    return () => p();
  }, [l]), _.useEffect(() => {
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
}, n4 = () => {
  const { goal: e, settings: t } = t4();
  return e && /* @__PURE__ */ z.jsx(
    e4,
    {
      goal: e,
      width: window.innerWidth,
      height: window.innerHeight,
      currentAmount: e.current_amount + e.start_raising,
      currency: t?.currency
    }
  );
}, r4 = () => {
  const e = Xt(), t = _.useRef(null), r = _.useRef(null), o = _.useRef([]), [s, l] = _.useState(), u = _.useCallback(
    ({ message: w }) => {
      if (!w) return;
      e.send({
        event: ie.MediaPlayed,
        data: w.id
      }), o.current = o.current.filter(
        (S) => S.id !== w.id
      );
      const C = o.current.at(0);
      l(void 0), setTimeout(() => {
        C && d({ message: C });
      }, 0);
    },
    []
  ), d = _.useCallback(({ message: w }) => {
    r.current && !r.current.alert_paused && l(w);
  }, []), p = _.useCallback(
    (w) => {
      s?.id === w ? u({ message: s }) : o.current = o.current.filter(
        (C) => C.id !== w
      );
    },
    [u, s]
  ), f = _.useCallback(() => {
    s && u({ message: s });
  }, [u, s]), m = _.useCallback((w) => {
    w.donation?.media && (o.current = [...o.current, w]);
  }, []), g = _.useCallback(
    (w) => {
      o.current = [w, ...o.current], s || d({ message: w });
    },
    [d, s]
  );
  return _.useEffect(() => {
    const w = e.subscribe(
      ie.MediaMessage,
      m
    );
    return () => w();
  }, [m]), _.useEffect(() => {
    const w = e.subscribe(
      ie.ReplayMedia,
      g
    );
    return () => w();
  }, [g]), _.useEffect(() => {
    const w = e.subscribe(
      ie.MediaSettings,
      (C) => {
        t.current = C;
      }
    );
    return () => w();
  }, []), _.useEffect(() => {
    const w = e.subscribe(
      ie.Settings,
      (C) => {
        if (r.current?.alert_paused && !C.alert_paused) {
          r.current = C;
          const S = o.current.at(0);
          S && d({ message: S });
          return;
        }
        r.current = C;
      }
    );
    return () => w();
  }, [d]), _.useEffect(() => {
    const w = e.subscribe(
      ie.SkipMedia,
      p
    );
    return () => w();
  }, [p]), _.useEffect(() => {
    const w = e.subscribe(
      ie.SkipPlayingMedia,
      f
    );
    return () => w();
  }, [f]), _.useEffect(() => {
    const w = e.subscribe(
      ie.MediaEnd,
      (C) => {
        const S = o.current.find(
          (b) => b.id === C
        );
        u({ message: S });
      }
    );
    return () => w();
  }, [u]), _.useEffect(() => {
    const w = e.subscribe(
      ie.MediaError,
      (C) => {
        const S = o.current.find(
          (b) => b.id === C
        );
        u({ message: S });
      }
    );
    return () => w();
  }, [u]), _.useEffect(() => {
    const w = e.subscribe(
      ie.AlertPlayed,
      (C) => {
        const S = o.current.find(
          (b) => b.id === C
        );
        !s && S && d({ message: S });
      }
    );
    return () => w();
  }, [d, s]), {
    currentMessage: s,
    mediaSettings: t.current
  };
}, i4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = Xt(), s = _.useRef(null), l = _.useCallback(
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
  return _.useEffect(() => (window.addEventListener("message", l), () => {
    window.removeEventListener("message", l);
  }), [l]), _.useEffect(() => {
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
  }, [r, o]), _.useEffect(() => {
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
  }, [r, o]), /* @__PURE__ */ z.jsx(
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
}, o4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = _.useRef(null), s = Xt();
  return _.useEffect(() => {
    o.current && (o.current.volume = e.video_volume / 100);
  }, [e]), _.useEffect(() => {
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
  }, [r, s]), _.useEffect(() => {
    const l = s.subscribe(
      ie.PauseMedia,
      (u) => {
        r === u && o.current && o.current.pause();
      }
    );
    return () => l();
  }, [r, s]), _.useEffect(() => {
    const l = s.subscribe(
      ie.PlayMedia,
      (u) => {
        r === u && o.current && o.current.play();
      }
    );
    return () => l();
  }, [r, s]), /* @__PURE__ */ z.jsx(z.Fragment, { children: /* @__PURE__ */ z.jsx(
    "video",
    {
      autoPlay: !0,
      ref: o,
      src: t.temporary_src,
      style: { height: "100%", width: "100%" }
    }
  ) });
};
var Lf, Mw;
function s4() {
  return Mw || (Mw = 1, Lf = function e(t, r) {
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
  }), Lf;
}
var a4 = s4();
const l4 = /* @__PURE__ */ Xr(a4);
var Bl = { exports: {} }, Df, Aw;
function u4() {
  if (Aw) return Df;
  Aw = 1;
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
  }, Df = e, Df;
}
var Wl = { exports: {} }, Ff, Iw;
function c4() {
  if (Iw) return Ff;
  Iw = 1, Ff = function(s, l, u) {
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
  return Ff;
}
var Nw;
function d4() {
  return Nw || (Nw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = c4(), o = s(r);
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
          (0, o.default)(p + "//www.youtube.com/iframe_api", function(m) {
            m && l.trigger("error", m);
          });
        }
        var f = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function() {
          f && f(), d(window.YT);
        };
      });
      return u;
    }, e.exports = t.default;
  })(Wl, Wl.exports)), Wl.exports;
}
var Ul = { exports: {} }, Vl = { exports: {} }, Hl = { exports: {} }, jf, Ow;
function f4() {
  if (Ow) return jf;
  Ow = 1;
  var e = 1e3, t = e * 60, r = t * 60, o = r * 24, s = o * 365.25;
  jf = function(f, m) {
    m = m || {};
    var g = typeof f;
    if (g === "string" && f.length > 0)
      return l(f);
    if (g === "number" && isNaN(f) === !1)
      return m.long ? d(f) : u(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function l(f) {
    if (f = String(f), !(f.length > 100)) {
      var m = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        f
      );
      if (m) {
        var g = parseFloat(m[1]), w = (m[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return g * s;
          case "days":
          case "day":
          case "d":
            return g * o;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return g * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return g * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return g * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return g;
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
  function p(f, m, g) {
    if (!(f < m))
      return f < m * 1.5 ? Math.floor(f / m) + " " + g : Math.ceil(f / m) + " " + g + "s";
  }
  return jf;
}
var Lw;
function p4() {
  return Lw || (Lw = 1, (function(e, t) {
    t = e.exports = s.debug = s.default = s, t.coerce = p, t.disable = u, t.enable = l, t.enabled = d, t.humanize = f4(), t.names = [], t.skips = [], t.formatters = {};
    var r;
    function o(f) {
      var m = 0, g;
      for (g in f)
        m = (m << 5) - m + f.charCodeAt(g), m |= 0;
      return t.colors[Math.abs(m) % t.colors.length];
    }
    function s(f) {
      function m() {
        if (m.enabled) {
          var g = m, w = +/* @__PURE__ */ new Date(), C = w - (r || w);
          g.diff = C, g.prev = r, g.curr = w, r = w;
          for (var S = new Array(arguments.length), b = 0; b < S.length; b++)
            S[b] = arguments[b];
          S[0] = t.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
          var k = 0;
          S[0] = S[0].replace(/%([a-zA-Z%])/g, function(N, x) {
            if (N === "%%") return N;
            k++;
            var P = t.formatters[x];
            if (typeof P == "function") {
              var E = S[k];
              N = P.call(g, E), S.splice(k, 1), k--;
            }
            return N;
          }), t.formatArgs.call(g, S);
          var M = m.log || t.log || console.log.bind(console);
          M.apply(g, S);
        }
      }
      return m.namespace = f, m.enabled = t.enabled(f), m.useColors = t.useColors(), m.color = o(f), typeof t.init == "function" && t.init(m), m;
    }
    function l(f) {
      t.save(f), t.names = [], t.skips = [];
      for (var m = (typeof f == "string" ? f : "").split(/[\s,]+/), g = m.length, w = 0; w < g; w++)
        m[w] && (f = m[w].replace(/\*/g, ".*?"), f[0] === "-" ? t.skips.push(new RegExp("^" + f.substr(1) + "$")) : t.names.push(new RegExp("^" + f + "$")));
    }
    function u() {
      t.enable("");
    }
    function d(f) {
      var m, g;
      for (m = 0, g = t.skips.length; m < g; m++)
        if (t.skips[m].test(f))
          return !1;
      for (m = 0, g = t.names.length; m < g; m++)
        if (t.names[m].test(f))
          return !0;
      return !1;
    }
    function p(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
  })(Hl, Hl.exports)), Hl.exports;
}
var Dw;
function h4() {
  return Dw || (Dw = 1, (function(e, t) {
    var r = {};
    t = e.exports = p4(), t.log = l, t.formatArgs = s, t.save = u, t.load = d, t.useColors = o, t.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : p(), t.colors = [
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
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
    function s(f) {
      var m = this.useColors;
      if (f[0] = (m ? "%c" : "") + this.namespace + (m ? " %c" : " ") + f[0] + (m ? "%c " : " ") + "+" + t.humanize(this.diff), !!m) {
        var g = "color: " + this.color;
        f.splice(1, 0, g, "color: inherit");
        var w = 0, C = 0;
        f[0].replace(/%[a-zA-Z%]/g, function(S) {
          S !== "%%" && (w++, S === "%c" && (C = w));
        }), f.splice(C, 0, g);
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
  })(Vl, Vl.exports)), Vl.exports;
}
var ql = { exports: {} }, Fw;
function g4() {
  return Fw || (Fw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["cueVideoById", "loadVideoById", "cueVideoByUrl", "loadVideoByUrl", "playVideo", "pauseVideo", "stopVideo", "getVideoLoadedFraction", "cuePlaylist", "loadPlaylist", "nextVideo", "previousVideo", "playVideoAt", "setShuffle", "setLoop", "getPlaylist", "getPlaylistIndex", "setOption", "mute", "unMute", "isMuted", "setVolume", "getVolume", "seekTo", "getPlayerState", "getPlaybackRate", "setPlaybackRate", "getAvailablePlaybackRates", "getPlaybackQuality", "setPlaybackQuality", "getAvailableQualityLevels", "getCurrentTime", "getDuration", "removeEventListener", "getVideoUrl", "getVideoEmbedCode", "getOptions", "getOption", "addEventListener", "destroy", "setSize", "getIframe"], e.exports = t.default;
  })(ql, ql.exports)), ql.exports;
}
var Kl = { exports: {} }, jw;
function m4() {
  return jw || (jw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = ["ready", "stateChange", "playbackQualityChange", "playbackRateChange", "error", "apiChange", "volumeChange"], e.exports = t.default;
  })(Kl, Kl.exports)), Kl.exports;
}
var Ql = { exports: {} }, Gl = { exports: {} }, zw;
function y4() {
  return zw || (zw = 1, (function(e, t) {
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
  })(Gl, Gl.exports)), Gl.exports;
}
var Bw;
function v4() {
  return Bw || (Bw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = y4(), o = s(r);
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
  })(Ql, Ql.exports)), Ql.exports;
}
var Ww;
function w4() {
  return Ww || (Ww = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = h4(), o = m(r), s = g4(), l = m(s), u = m4(), d = m(u), p = v4(), f = m(p);
    function m(C) {
      return C && C.__esModule ? C : { default: C };
    }
    var g = (0, o.default)("youtube-player"), w = {};
    w.proxyEvents = function(C) {
      var S = {}, b = function(A) {
        var I = "on" + A.slice(0, 1).toUpperCase() + A.slice(1);
        S[I] = function(L) {
          g('event "%s"', I, L), C.trigger(A, L);
        };
      }, k = !0, M = !1, N = void 0;
      try {
        for (var x = d.default[Symbol.iterator](), P; !(k = (P = x.next()).done); k = !0) {
          var E = P.value;
          b(E);
        }
      } catch ($) {
        M = !0, N = $;
      } finally {
        try {
          !k && x.return && x.return();
        } finally {
          if (M)
            throw N;
        }
      }
      return S;
    }, w.promisifyPlayer = function(C) {
      var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, b = {}, k = function(I) {
        S && f.default[I] ? b[I] = function() {
          for (var L = arguments.length, v = Array(L), T = 0; T < L; T++)
            v[T] = arguments[T];
          return C.then(function(O) {
            var F = f.default[I], B = O.getPlayerState(), j = O[I].apply(O, v);
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
              return j;
            }) : j;
          });
        } : b[I] = function() {
          for (var L = arguments.length, v = Array(L), T = 0; T < L; T++)
            v[T] = arguments[T];
          return C.then(function(O) {
            return O[I].apply(O, v);
          });
        };
      }, M = !0, N = !1, x = void 0;
      try {
        for (var P = l.default[Symbol.iterator](), E; !(M = (E = P.next()).done); M = !0) {
          var $ = E.value;
          k($);
        }
      } catch (A) {
        N = !0, x = A;
      } finally {
        try {
          !M && P.return && P.return();
        } finally {
          if (N)
            throw x;
        }
      }
      return b;
    }, t.default = w, e.exports = t.default;
  })(Ul, Ul.exports)), Ul.exports;
}
var Uw;
function S4() {
  return Uw || (Uw = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(g) {
      return typeof g;
    } : function(g) {
      return g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype ? "symbol" : typeof g;
    }, o = u4(), s = f(o), l = d4(), u = f(l), d = w4(), p = f(d);
    function f(g) {
      return g && g.__esModule ? g : { default: g };
    }
    var m = void 0;
    t.default = function(g) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, S = (0, s.default)();
      if (m || (m = (0, u.default)(S)), w.events)
        throw new Error("Event handlers cannot be overwritten.");
      if (typeof g == "string" && !document.getElementById(g))
        throw new Error('Element "' + g + '" does not exist.');
      w.events = p.default.proxyEvents(S);
      var b = new Promise(function(M) {
        if ((typeof g > "u" ? "undefined" : r(g)) === "object" && g.playVideo instanceof Function) {
          var N = g;
          M(N);
        } else
          m.then(function(x) {
            var P = new x.Player(g, w);
            return S.on("ready", function() {
              M(P);
            }), null;
          });
      }), k = p.default.promisifyPlayer(b, C);
      return k.on = S.on, k.off = S.off, k;
    }, e.exports = t.default;
  })(Bl, Bl.exports)), Bl.exports;
}
var b4 = S4();
const _4 = /* @__PURE__ */ Xr(b4);
var x4 = Object.defineProperty, k4 = Object.defineProperties, C4 = Object.getOwnPropertyDescriptors, Vw = Object.getOwnPropertySymbols, E4 = Object.prototype.hasOwnProperty, P4 = Object.prototype.propertyIsEnumerable, Hw = (e, t, r) => t in e ? x4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ep = (e, t) => {
  for (var r in t || (t = {}))
    E4.call(t, r) && Hw(e, r, t[r]);
  if (Vw)
    for (var r of Vw(t))
      P4.call(t, r) && Hw(e, r, t[r]);
  return e;
}, Pp = (e, t) => k4(e, C4(t)), R4 = (e, t, r) => new Promise((o, s) => {
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
function T4(e, t) {
  var r, o;
  if (e.videoId !== t.videoId)
    return !0;
  const s = ((r = e.opts) == null ? void 0 : r.playerVars) || {}, l = ((o = t.opts) == null ? void 0 : o.playerVars) || {};
  return s.start !== l.start || s.end !== l.end;
}
function qw(e = {}) {
  return Pp(Ep({}, e), {
    height: 0,
    width: 0,
    playerVars: Pp(Ep({}, e.playerVars), {
      autoplay: 0,
      start: 0,
      end: 0
    })
  });
}
function $4(e, t) {
  return e.videoId !== t.videoId || !l4(qw(e.opts), qw(t.opts));
}
function M4(e, t) {
  var r, o, s, l;
  return e.id !== t.id || e.className !== t.className || ((r = e.opts) == null ? void 0 : r.width) !== ((o = t.opts) == null ? void 0 : o.width) || ((s = e.opts) == null ? void 0 : s.height) !== ((l = t.opts) == null ? void 0 : l.height) || e.iframeClassName !== t.iframeClassName || e.title !== t.title;
}
var A4 = {
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
}, I4 = {
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
}, ou = class extends Ut.Component {
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
        case ou.PlayerState.ENDED:
          (l = (s = this.props).onEnd) == null || l.call(s, t);
          break;
        case ou.PlayerState.PLAYING:
          (d = (u = this.props).onPlay) == null || d.call(u, t);
          break;
        case ou.PlayerState.PAUSED:
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
      const t = Pp(Ep({}, this.props.opts), {
        videoId: this.props.videoId
      });
      this.internalPlayer = _4(this.container, t), this.internalPlayer.on("ready", this.onPlayerReady), this.internalPlayer.on("error", this.onPlayerError), this.internalPlayer.on("stateChange", this.onPlayerStateChange), this.internalPlayer.on("playbackRateChange", this.onPlayerPlaybackRateChange), this.internalPlayer.on("playbackQualityChange", this.onPlayerPlaybackQualityChange), (this.props.title || this.props.loading) && this.internalPlayer.getIframe().then((r) => {
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
    return R4(this, null, function* () {
      M4(e, this.props) && this.updatePlayer(), $4(e, this.props) && (yield this.resetPlayer()), T4(e, this.props) && this.updateVideo();
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
}, lc = ou;
lc.propTypes = I4;
lc.defaultProps = A4;
lc.PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
var N4 = lc;
const O4 = ({
  mediaPlatformSettings: e,
  media: t,
  messageId: r
}) => {
  const o = Xt(), [s, l] = _.useState(), u = {
    height: window.innerHeight,
    width: window.innerWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0
    }
  }, d = (w) => {
    o.send({
      event: ie.MediaPlaying,
      data: r
    }), w.target.setVolume(e.video_volume), l(w.target);
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
  }, m = () => {
    o.send({
      event: ie.MediaPaused,
      data: r
    });
  }, g = () => {
    o.send({
      event: ie.MediaEnd,
      data: r
    });
  };
  return _.useEffect(() => {
    const w = o.subscribe(
      ie.PauseMedia,
      (C) => {
        r === C && s.pauseVideo();
      }
    );
    return () => w();
  }, [r, s, o]), _.useEffect(() => {
    const w = o.subscribe(
      ie.PlayMedia,
      (C) => {
        r === C && s.playVideo();
      }
    );
    return () => w();
  }, [r, s, o]), /* @__PURE__ */ z.jsx(
    N4,
    {
      videoId: t?.temporary_src,
      opts: u,
      onError: p,
      onReady: d,
      onPlay: f,
      onPause: m,
      onEnd: g
    }
  );
}, L4 = ({
  messageId: e,
  mediaSettings: t,
  media: r
}) => {
  switch (r.media_type) {
    case Hr.Twitch:
      return /* @__PURE__ */ z.jsx(
        o4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.twitch
        }
      );
    case Hr.Youtube:
      return /* @__PURE__ */ z.jsx(
        O4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.youtube
        }
      );
    case Hr.TikTok:
      return /* @__PURE__ */ z.jsx(
        i4,
        {
          media: r,
          messageId: e,
          mediaPlatformSettings: t.tiktok
        }
      );
  }
}, D4 = () => {
  const { currentMessage: e, mediaSettings: t } = r4();
  return t && e && e.donation?.media && /* @__PURE__ */ z.jsx("div", { style: { height: "100dvh", width: "100dvw" }, children: L4({
    media: e.donation.media,
    messageId: e.id,
    mediaSettings: t
  }) });
}, F4 = () => {
  const e = Xt(), t = _.useRef(void 0), r = _.useRef(null), [o, s] = _.useState();
  return _.useEffect(() => {
    const l = e.subscribe(
      ie.NsfwDetection,
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
  }, [e, o]), _.useEffect(() => {
    const l = e.subscribe(
      ie.NsfwSettings,
      (u) => {
        s(u);
      }
    );
    return () => l();
  }, [e]), /* @__PURE__ */ z.jsx(
    Yn,
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
class j4 extends _.Component {
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
      ref: m,
      threshold: g,
      useCapture: w,
      useWindow: C,
      getScrollParent: S,
      ...b
    } = t;
    b.ref = (M) => {
      this.scrollComponent = M, m && m(M);
    };
    const k = [r];
    return s && (d ? u ? k.unshift(d) : k.push(d) : this.defaultLoader && (u ? k.unshift(this.defaultLoader) : k.push(this.defaultLoader))), Ut.createElement(o, b, k);
  }
}
const z4 = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8"
}), "Replay"), fb = (e) => {
  switch (e) {
    case Hr.Youtube:
      return "#c4302b";
    case Hr.Twitch:
      return "#9146FF ";
    case Hr.TikTok:
      return "#00f2ea";
  }
}, uc = (e) => {
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
}, B4 = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M6 19h4V5H6zm8-14v14h4V5z"
}), "Pause"), W4 = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M8 5v14l11-7z"
}), "PlayArrow"), U4 = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "m6 18 8.5-6L6 6zM16 6v12h2V6z"
}), "SkipNext");
var su = { exports: {} }, V4 = su.exports, Kw;
function H4() {
  return Kw || (Kw = 1, (function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(V4, (function() {
      var r = 1e3, o = 6e4, s = 36e5, l = "millisecond", u = "second", d = "minute", p = "hour", f = "day", m = "week", g = "month", w = "quarter", C = "year", S = "date", b = "Invalid Date", k = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, M = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, N = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(B) {
        var j = ["th", "st", "nd", "rd"], V = B % 100;
        return "[" + B + (j[(V - 20) % 10] || j[V] || j[0]) + "]";
      } }, x = function(B, j, V) {
        var G = String(B);
        return !G || G.length >= j ? B : "" + Array(j + 1 - G.length).join(V) + B;
      }, P = { s: x, z: function(B) {
        var j = -B.utcOffset(), V = Math.abs(j), G = Math.floor(V / 60), U = V % 60;
        return (j <= 0 ? "+" : "-") + x(G, 2, "0") + ":" + x(U, 2, "0");
      }, m: function B(j, V) {
        if (j.date() < V.date()) return -B(V, j);
        var G = 12 * (V.year() - j.year()) + (V.month() - j.month()), U = j.clone().add(G, g), H = V - U < 0, K = j.clone().add(G + (H ? -1 : 1), g);
        return +(-(G + (V - U) / (H ? U - K : K - U)) || 0);
      }, a: function(B) {
        return B < 0 ? Math.ceil(B) || 0 : Math.floor(B);
      }, p: function(B) {
        return { M: g, y: C, w: m, d: f, D: S, h: p, m: d, s: u, ms: l, Q: w }[B] || String(B || "").toLowerCase().replace(/s$/, "");
      }, u: function(B) {
        return B === void 0;
      } }, E = "en", $ = {};
      $[E] = N;
      var A = "$isDayjsObject", I = function(B) {
        return B instanceof O || !(!B || !B[A]);
      }, L = function B(j, V, G) {
        var U;
        if (!j) return E;
        if (typeof j == "string") {
          var H = j.toLowerCase();
          $[H] && (U = H), V && ($[H] = V, U = H);
          var K = j.split("-");
          if (!U && K.length > 1) return B(K[0]);
        } else {
          var D = j.name;
          $[D] = j, U = D;
        }
        return !G && U && (E = U), U || !G && E;
      }, v = function(B, j) {
        if (I(B)) return B.clone();
        var V = typeof j == "object" ? j : {};
        return V.date = B, V.args = arguments, new O(V);
      }, T = P;
      T.l = L, T.i = I, T.w = function(B, j) {
        return v(B, { locale: j.$L, utc: j.$u, x: j.$x, $offset: j.$offset });
      };
      var O = (function() {
        function B(V) {
          this.$L = L(V.locale, null, !0), this.parse(V), this.$x = this.$x || V.x || {}, this[A] = !0;
        }
        var j = B.prototype;
        return j.parse = function(V) {
          this.$d = (function(G) {
            var U = G.date, H = G.utc;
            if (U === null) return /* @__PURE__ */ new Date(NaN);
            if (T.u(U)) return /* @__PURE__ */ new Date();
            if (U instanceof Date) return new Date(U);
            if (typeof U == "string" && !/Z$/i.test(U)) {
              var K = U.match(k);
              if (K) {
                var D = K[2] - 1 || 0, Y = (K[7] || "0").substring(0, 3);
                return H ? new Date(Date.UTC(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, Y)) : new Date(K[1], D, K[3] || 1, K[4] || 0, K[5] || 0, K[6] || 0, Y);
              }
            }
            return new Date(U);
          })(V), this.init();
        }, j.init = function() {
          var V = this.$d;
          this.$y = V.getFullYear(), this.$M = V.getMonth(), this.$D = V.getDate(), this.$W = V.getDay(), this.$H = V.getHours(), this.$m = V.getMinutes(), this.$s = V.getSeconds(), this.$ms = V.getMilliseconds();
        }, j.$utils = function() {
          return T;
        }, j.isValid = function() {
          return this.$d.toString() !== b;
        }, j.isSame = function(V, G) {
          var U = v(V);
          return this.startOf(G) <= U && U <= this.endOf(G);
        }, j.isAfter = function(V, G) {
          return v(V) < this.startOf(G);
        }, j.isBefore = function(V, G) {
          return this.endOf(G) < v(V);
        }, j.$g = function(V, G, U) {
          return T.u(V) ? this[G] : this.set(U, V);
        }, j.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, j.valueOf = function() {
          return this.$d.getTime();
        }, j.startOf = function(V, G) {
          var U = this, H = !!T.u(G) || G, K = T.p(V), D = function(fe, ue) {
            var we = T.w(U.$u ? Date.UTC(U.$y, ue, fe) : new Date(U.$y, ue, fe), U);
            return H ? we : we.endOf(f);
          }, Y = function(fe, ue) {
            return T.w(U.toDate()[fe].apply(U.toDate("s"), (H ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ue)), U);
          }, ne = this.$W, te = this.$M, se = this.$D, le = "set" + (this.$u ? "UTC" : "");
          switch (K) {
            case C:
              return H ? D(1, 0) : D(31, 11);
            case g:
              return H ? D(1, te) : D(0, te + 1);
            case m:
              var de = this.$locale().weekStart || 0, he = (ne < de ? ne + 7 : ne) - de;
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
        }, j.endOf = function(V) {
          return this.startOf(V, !1);
        }, j.$set = function(V, G) {
          var U, H = T.p(V), K = "set" + (this.$u ? "UTC" : ""), D = (U = {}, U[f] = K + "Date", U[S] = K + "Date", U[g] = K + "Month", U[C] = K + "FullYear", U[p] = K + "Hours", U[d] = K + "Minutes", U[u] = K + "Seconds", U[l] = K + "Milliseconds", U)[H], Y = H === f ? this.$D + (G - this.$W) : G;
          if (H === g || H === C) {
            var ne = this.clone().set(S, 1);
            ne.$d[D](Y), ne.init(), this.$d = ne.set(S, Math.min(this.$D, ne.daysInMonth())).$d;
          } else D && this.$d[D](Y);
          return this.init(), this;
        }, j.set = function(V, G) {
          return this.clone().$set(V, G);
        }, j.get = function(V) {
          return this[T.p(V)]();
        }, j.add = function(V, G) {
          var U, H = this;
          V = Number(V);
          var K = T.p(G), D = function(te) {
            var se = v(H);
            return T.w(se.date(se.date() + Math.round(te * V)), H);
          };
          if (K === g) return this.set(g, this.$M + V);
          if (K === C) return this.set(C, this.$y + V);
          if (K === f) return D(1);
          if (K === m) return D(7);
          var Y = (U = {}, U[d] = o, U[p] = s, U[u] = r, U)[K] || 1, ne = this.$d.getTime() + V * Y;
          return T.w(ne, this);
        }, j.subtract = function(V, G) {
          return this.add(-1 * V, G);
        }, j.format = function(V) {
          var G = this, U = this.$locale();
          if (!this.isValid()) return U.invalidDate || b;
          var H = V || "YYYY-MM-DDTHH:mm:ssZ", K = T.z(this), D = this.$H, Y = this.$m, ne = this.$M, te = U.weekdays, se = U.months, le = U.meridiem, de = function(ue, we, _e, qe) {
            return ue && (ue[we] || ue(G, H)) || _e[we].slice(0, qe);
          }, he = function(ue) {
            return T.s(D % 12 || 12, ue, "0");
          }, fe = le || function(ue, we, _e) {
            var qe = ue < 12 ? "AM" : "PM";
            return _e ? qe.toLowerCase() : qe;
          };
          return H.replace(M, (function(ue, we) {
            return we || (function(_e) {
              switch (_e) {
                case "YY":
                  return String(G.$y).slice(-2);
                case "YYYY":
                  return T.s(G.$y, 4, "0");
                case "M":
                  return ne + 1;
                case "MM":
                  return T.s(ne + 1, 2, "0");
                case "MMM":
                  return de(U.monthsShort, ne, se, 3);
                case "MMMM":
                  return de(se, ne);
                case "D":
                  return G.$D;
                case "DD":
                  return T.s(G.$D, 2, "0");
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
                  return T.s(D, 2, "0");
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
                  return T.s(Y, 2, "0");
                case "s":
                  return String(G.$s);
                case "ss":
                  return T.s(G.$s, 2, "0");
                case "SSS":
                  return T.s(G.$ms, 3, "0");
                case "Z":
                  return K;
              }
              return null;
            })(ue) || K.replace(":", "");
          }));
        }, j.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, j.diff = function(V, G, U) {
          var H, K = this, D = T.p(G), Y = v(V), ne = (Y.utcOffset() - this.utcOffset()) * o, te = this - Y, se = function() {
            return T.m(K, Y);
          };
          switch (D) {
            case C:
              H = se() / 12;
              break;
            case g:
              H = se();
              break;
            case w:
              H = se() / 3;
              break;
            case m:
              H = (te - ne) / 6048e5;
              break;
            case f:
              H = (te - ne) / 864e5;
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
          return U ? H : T.a(H);
        }, j.daysInMonth = function() {
          return this.endOf(g).$D;
        }, j.$locale = function() {
          return $[this.$L];
        }, j.locale = function(V, G) {
          if (!V) return this.$L;
          var U = this.clone(), H = L(V, G, !0);
          return H && (U.$L = H), U;
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
        }, B;
      })(), F = O.prototype;
      return v.prototype = F, [["$ms", l], ["$s", u], ["$m", d], ["$H", p], ["$W", f], ["$M", g], ["$y", C], ["$D", S]].forEach((function(B) {
        F[B[1]] = function(j) {
          return this.$g(j, B[0], B[1]);
        };
      })), v.extend = function(B, j) {
        return B.$i || (B(j, O, v), B.$i = !0), v;
      }, v.locale = L, v.isDayjs = I, v.unix = function(B) {
        return v(1e3 * B);
      }, v.en = $[E], v.Ls = $, v.p = {}, v;
    }));
  })(su)), su.exports;
}
var q4 = H4();
const pb = /* @__PURE__ */ Xr(q4);
var au = { exports: {} }, K4 = au.exports, Qw;
function Q4() {
  return Qw || (Qw = 1, (function(e, t) {
    (function(r, o) {
      e.exports = o();
    })(K4, (function() {
      var r, o, s = 1e3, l = 6e4, u = 36e5, d = 864e5, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, f = 31536e6, m = 2628e6, g = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, w = { years: f, months: m, days: d, hours: u, minutes: l, seconds: s, milliseconds: 1, weeks: 6048e5 }, C = function($) {
        return $ instanceof P;
      }, S = function($, A, I) {
        return new P($, I, A.$l);
      }, b = function($) {
        return o.p($) + "s";
      }, k = function($) {
        return $ < 0;
      }, M = function($) {
        return k($) ? Math.ceil($) : Math.floor($);
      }, N = function($) {
        return Math.abs($);
      }, x = function($, A) {
        return $ ? k($) ? { negative: !0, format: "" + N($) + A } : { negative: !1, format: "" + $ + A } : { negative: !1, format: "" };
      }, P = (function() {
        function $(I, L, v) {
          var T = this;
          if (this.$d = {}, this.$l = v, I === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), L) return S(I * w[b(L)], this);
          if (typeof I == "number") return this.$ms = I, this.parseFromMilliseconds(), this;
          if (typeof I == "object") return Object.keys(I).forEach((function(B) {
            T.$d[b(B)] = I[B];
          })), this.calMilliseconds(), this;
          if (typeof I == "string") {
            var O = I.match(g);
            if (O) {
              var F = O.slice(2).map((function(B) {
                return B != null ? Number(B) : 0;
              }));
              return this.$d.years = F[0], this.$d.months = F[1], this.$d.weeks = F[2], this.$d.days = F[3], this.$d.hours = F[4], this.$d.minutes = F[5], this.$d.seconds = F[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var A = $.prototype;
        return A.calMilliseconds = function() {
          var I = this;
          this.$ms = Object.keys(this.$d).reduce((function(L, v) {
            return L + (I.$d[v] || 0) * w[v];
          }), 0);
        }, A.parseFromMilliseconds = function() {
          var I = this.$ms;
          this.$d.years = M(I / f), I %= f, this.$d.months = M(I / m), I %= m, this.$d.days = M(I / d), I %= d, this.$d.hours = M(I / u), I %= u, this.$d.minutes = M(I / l), I %= l, this.$d.seconds = M(I / s), I %= s, this.$d.milliseconds = I;
        }, A.toISOString = function() {
          var I = x(this.$d.years, "Y"), L = x(this.$d.months, "M"), v = +this.$d.days || 0;
          this.$d.weeks && (v += 7 * this.$d.weeks);
          var T = x(v, "D"), O = x(this.$d.hours, "H"), F = x(this.$d.minutes, "M"), B = this.$d.seconds || 0;
          this.$d.milliseconds && (B += this.$d.milliseconds / 1e3, B = Math.round(1e3 * B) / 1e3);
          var j = x(B, "S"), V = I.negative || L.negative || T.negative || O.negative || F.negative || j.negative, G = O.format || F.format || j.format ? "T" : "", U = (V ? "-" : "") + "P" + I.format + L.format + T.format + G + O.format + F.format + j.format;
          return U === "P" || U === "-P" ? "P0D" : U;
        }, A.toJSON = function() {
          return this.toISOString();
        }, A.format = function(I) {
          var L = I || "YYYY-MM-DDTHH:mm:ss", v = { Y: this.$d.years, YY: o.s(this.$d.years, 2, "0"), YYYY: o.s(this.$d.years, 4, "0"), M: this.$d.months, MM: o.s(this.$d.months, 2, "0"), D: this.$d.days, DD: o.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: o.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: o.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: o.s(this.$d.seconds, 2, "0"), SSS: o.s(this.$d.milliseconds, 3, "0") };
          return L.replace(p, (function(T, O) {
            return O || String(v[T]);
          }));
        }, A.as = function(I) {
          return this.$ms / w[b(I)];
        }, A.get = function(I) {
          var L = this.$ms, v = b(I);
          return v === "milliseconds" ? L %= 1e3 : L = v === "weeks" ? M(L / w[v]) : this.$d[v], L || 0;
        }, A.add = function(I, L, v) {
          var T;
          return T = L ? I * w[b(L)] : C(I) ? I.$ms : S(I, this).$ms, S(this.$ms + T * (v ? -1 : 1), this);
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
        }, $;
      })(), E = function($, A, I) {
        return $.add(A.years() * I, "y").add(A.months() * I, "M").add(A.days() * I, "d").add(A.hours() * I, "h").add(A.minutes() * I, "m").add(A.seconds() * I, "s").add(A.milliseconds() * I, "ms");
      };
      return function($, A, I) {
        r = I, o = I().$utils(), I.duration = function(T, O) {
          var F = I.locale();
          return S(T, { $l: F }, O);
        }, I.isDuration = C;
        var L = A.prototype.add, v = A.prototype.subtract;
        A.prototype.add = function(T, O) {
          return C(T) ? E(this, T, 1) : L.bind(this)(T, O);
        }, A.prototype.subtract = function(T, O) {
          return C(T) ? E(this, T, -1) : v.bind(this)(T, O);
        };
      };
    }));
  })(au)), au.exports;
}
var G4 = Q4();
const Y4 = /* @__PURE__ */ Xr(G4);
pb.extend(Y4);
const pa = ({ createdAt: e }) => {
  const t = pb(e * 1e3);
  return /* @__PURE__ */ z.jsx("span", { style: { fontSize: 12 }, children: t.format("YYYY-MM-DD HH:mm:ss") });
}, J4 = ({ donation: e }) => {
  const { pausedMediaId: t } = Qn((o) => o.mediaState), r = Xt();
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: e.media && /* @__PURE__ */ z.jsxs(
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
        background: fb(e.media.media_type)
      },
      children: [
        /* @__PURE__ */ z.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 15,
              right: 15
            },
            children: /* @__PURE__ */ z.jsx(pa, { createdAt: e.created_at })
          }
        ),
        /* @__PURE__ */ z.jsx(
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
        /* @__PURE__ */ z.jsxs("div", { style: { position: "relative", display: "grid" }, children: [
          /* @__PURE__ */ z.jsx(
            gu,
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
              children: t === e.message_id ? /* @__PURE__ */ z.jsx(W4, { sx: { height: 50, width: 50 } }) : /* @__PURE__ */ z.jsx(B4, { sx: { height: 50, width: 50 } })
            }
          ),
          /* @__PURE__ */ z.jsx(
            gu,
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
              children: /* @__PURE__ */ z.jsx(U4, {})
            }
          )
        ] })
      ]
    }
  ) });
}, X4 = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  const { t: o } = br(), s = Xt(), { services: l } = Qn((d) => d.servicesState), u = e.donation;
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: u && /* @__PURE__ */ z.jsxs(
    Gu,
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
        r && /* @__PURE__ */ z.jsx(J4, { donation: u }),
        /* @__PURE__ */ z.jsx(
          Yn,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: u?.media ? fb(u.media.media_type) : uc(e.type),
              minHeight: "100%"
            },
            children: u.media && !r && !t && /* @__PURE__ */ z.jsx(
              gu,
              {
                onClick: () => {
                  s.send({
                    event: ie.ReplayMedia,
                    data: e
                  });
                },
                children: /* @__PURE__ */ z.jsx(z4, {})
              }
            )
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { style: { width: "100%", padding: 15, wordBreak: "break-word" }, children: [
          /* @__PURE__ */ z.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ z.jsx(pa, { createdAt: e.created_at }) }),
          /* @__PURE__ */ z.jsx("div", { children: /* @__PURE__ */ z.jsx(
            ta,
            {
              sx: (d) => ({
                color: d.palette.primary.main
              }),
              children: o("message.donated", {
                user_name: u.user_name,
                currency: db(u.currency),
                amount: u.amount
              })
            }
          ) }),
          /* @__PURE__ */ z.jsx("div", { children: /* @__PURE__ */ z.jsx("span", { children: u.text }) }),
          /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ z.jsx(
                  Qr,
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
                /* @__PURE__ */ z.jsx(
                  Qr,
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
        /* @__PURE__ */ z.jsx(
          Yn,
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
}, Z4 = _.memo(X4), eB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = br(), o = Xt(), { services: s } = Qn((u) => u.servicesState), l = e.follow;
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: l && /* @__PURE__ */ z.jsxs(
    Gu,
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
        /* @__PURE__ */ z.jsx(
          Yn,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: uc(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ z.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ z.jsx(pa, { createdAt: e.created_at }) }),
          /* @__PURE__ */ z.jsx("div", { children: /* @__PURE__ */ z.jsx(
            ta,
            {
              sx: (u) => ({
                color: u.palette.primary.main
              }),
              children: r("message.followed", { user_name: l.user_name })
            }
          ) }),
          /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ z.jsx(
                  Qr,
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
                /* @__PURE__ */ z.jsx(
                  Qr,
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
        /* @__PURE__ */ z.jsx(
          Yn,
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
}, tB = _.memo(eB), nB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = br(), o = Xt(), { services: s } = Qn((u) => u.servicesState), l = e.raid;
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: l && /* @__PURE__ */ z.jsxs(
    Gu,
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
        /* @__PURE__ */ z.jsx(
          Yn,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: uc(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ z.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ z.jsx(pa, { createdAt: e.created_at }) }),
          /* @__PURE__ */ z.jsx("div", { children: /* @__PURE__ */ z.jsx(
            ta,
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
          /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ z.jsx(
                  Qr,
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
                /* @__PURE__ */ z.jsx(
                  Qr,
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
        /* @__PURE__ */ z.jsx(
          Yn,
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
}, rB = _.memo(nB), iB = ({
  message: e,
  isAlertPlaying: t
}) => {
  const { t: r } = br(), o = Xt(), { services: s } = Qn((u) => u.servicesState), l = e.subscription;
  return /* @__PURE__ */ z.jsx(z.Fragment, { children: l && /* @__PURE__ */ z.jsxs(
    Gu,
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
        /* @__PURE__ */ z.jsx(
          Yn,
          {
            sx: {
              width: "3rem",
              display: "grid",
              placeItems: "center",
              background: uc(e.type),
              minHeight: "100%"
            }
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { style: { width: "100%", padding: 15 }, children: [
          /* @__PURE__ */ z.jsx("div", { style: { float: "right" }, children: /* @__PURE__ */ z.jsx(pa, { createdAt: e.created_at }) }),
          /* @__PURE__ */ z.jsx("div", { children: /* @__PURE__ */ z.jsx(
            ta,
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
          /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: { display: "grid", gridAutoFlow: "column", marginTop: 10 },
              children: [
                !t && /* @__PURE__ */ z.jsx(
                  Qr,
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
                /* @__PURE__ */ z.jsx(
                  Qr,
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
        /* @__PURE__ */ z.jsx(
          Yn,
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
}, oB = _.memo(iB), sB = ({
  message: e,
  isAlertPlaying: t,
  isMediaPlaying: r
}) => {
  switch (e.type) {
    case Ft.Donation:
      return /* @__PURE__ */ z.jsx(
        Z4,
        {
          message: e,
          isAlertPlaying: t,
          isMediaPlaying: r
        }
      );
    case Ft.Follow:
      return /* @__PURE__ */ z.jsx(tB, { message: e, isAlertPlaying: t });
    case Ft.Subscription:
      return /* @__PURE__ */ z.jsx(
        oB,
        {
          message: e,
          isAlertPlaying: t
        }
      );
    case Ft.Raid:
      return /* @__PURE__ */ z.jsx(rB, { message: e, isAlertPlaying: t });
    default:
      return /* @__PURE__ */ z.jsx("div", {});
  }
}, aB = {
  isShowSnackBar: !1,
  snackBarMessage: "",
  alertSeverity: bu.info
}, lB = Mn({
  name: "snackBar",
  initialState: aB,
  reducers: {
    showSnackBar: (e, t) => {
      e.alertSeverity = t.payload.alertSeverity, e.isShowSnackBar = !0, e.snackBarMessage = t.payload.message;
    },
    hideSnackBar: (e) => {
      e.isShowSnackBar = !1;
    }
  }
}), { showSnackBar: uB, hideSnackBar: RB } = lB.actions, cB = Zr(/* @__PURE__ */ z.jsx("path", {
  d: "M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61"
}), "FilterAlt"), dB = {
  filter: {
    exclude_donations: !1,
    exclude_follows: !1,
    exclude_subscriptions: !1,
    exclude_raids: !1
  }
}, hb = Mn({
  name: "messages",
  initialState: dB,
  reducers: {
    setFilter: (e, t) => {
      e.filter = t.payload;
    }
  }
}), { setFilter: fB } = hb.actions, pB = () => {
  const { filter: e } = Qn((p) => p.messagesState), t = Zu(), [r, o] = _.useState(null), s = !!r, l = (p) => {
    o(p.currentTarget);
  }, u = () => {
    o(null);
  }, { t: d } = br();
  return /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ z.jsx(gu, { onClick: l, children: /* @__PURE__ */ z.jsx(cB, {}) }) }),
    /* @__PURE__ */ z.jsx(_R, { anchorEl: r, open: s, onClose: u, children: /* @__PURE__ */ z.jsx(iR, { children: Object.entries(e).map(([p]) => /* @__PURE__ */ z.jsx(
      PR,
      {
        onClick: () => t(
          fB({
            ...e,
            [p]: !e[p]
          })
        ),
        children: /* @__PURE__ */ z.jsxs("div", { children: [
          /* @__PURE__ */ z.jsx(TP, { checked: e[p] }),
          /* @__PURE__ */ z.jsx("span", { children: d(`filter.${p}`) })
        ] })
      },
      p
    )) }) })
  ] });
}, hB = ({
  useGetMessagesInfiniteQuery: e
}) => {
  const { t } = br(), { playingAlertId: r } = Qn(
    (g) => g.alertsState
  ), { filter: o } = Qn((g) => g.messagesState), { playingMediaId: s } = Qn((g) => g.mediaState), { data: l, fetchNextPage: u, hasNextPage: d, isFetchingNextPage: p, error: f } = e(
    {
      filter: o
    },
    {
      refetchOnFocus: !1,
      refetchOnMountOrArgChange: !1,
      refetchOnReconnect: !1
    }
  ), m = Zu();
  return _.useEffect(() => {
    f && m(
      uB({
        message: f.message,
        alertSeverity: bu.error
      })
    );
  }, [f, m]), /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
    /* @__PURE__ */ z.jsx(pB, {}),
    l?.pages[0].length ? /* @__PURE__ */ z.jsx(
      j4,
      {
        loadMore: () => u(),
        hasMore: !p && d,
        initialLoad: !1,
        useWindow: !0,
        threshold: 50,
        loader: /* @__PURE__ */ z.jsx("div", { children: t("loading") }, "loader"),
        children: /* @__PURE__ */ z.jsx("div", { children: l.pages.map(
          (g) => g.map((w) => /* @__PURE__ */ z.jsx(_.Fragment, { children: sB({
            message: w,
            isAlertPlaying: w.id === r,
            isMediaPlaying: w.id === s
          }) }, w.id))
        ) })
      }
    ) : /* @__PURE__ */ z.jsx(
      IR,
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
}, gB = () => /* @__PURE__ */ z.jsx(
  Yn,
  {
    sx: {
      background: (e) => e.palette.background.default,
      padding: "5px",
      minHeight: "100vh"
    },
    children: /* @__PURE__ */ z.jsx(
      hB,
      {
        useGetMessagesInfiniteQuery: z3
      }
    )
  }
), mB = () => {
  const e = Xt(), [t, r] = _.useState(() => e.connected), { t: o } = br();
  return _.useEffect(() => {
    const s = (l) => {
      r(l);
    };
    return e.addStatusListener(s), () => {
      e.removeStatusListener(s);
    };
  }, [e]), /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
    !t && /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          color: "red"
        },
        children: /* @__PURE__ */ z.jsx(
          ta,
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
    /* @__PURE__ */ z.jsxs(NT, { children: [
      /* @__PURE__ */ z.jsx(vi, { path: "/alert", element: /* @__PURE__ */ z.jsx(X3, {}) }),
      /* @__PURE__ */ z.jsx(vi, { path: "/media", element: /* @__PURE__ */ z.jsx(D4, {}) }),
      /* @__PURE__ */ z.jsx(vi, { path: "/goal", element: /* @__PURE__ */ z.jsx(n4, {}) }),
      /* @__PURE__ */ z.jsx(vi, { path: "/nsfw", element: /* @__PURE__ */ z.jsx(F4, {}) }),
      /* @__PURE__ */ z.jsx(vi, { path: "/widget/:id", element: /* @__PURE__ */ z.jsx(U3, { type: "view" }) }),
      /* @__PURE__ */ z.jsx(
        vi,
        {
          path: "/obs-dock-messages",
          element: /* @__PURE__ */ z.jsx(QC, { theme: ea(H3), children: /* @__PURE__ */ z.jsx(gB, {}) })
        }
      )
    ] })
  ] });
}, yB = {
  services: {
    [kt.Streamelements]: {
      active: !1,
      color: "#2701fb",
      authPath: "/streamelements/token"
    },
    [kt.Twitch]: {
      active: !1,
      color: "#9147ff",
      authPath: "/twitch/device-code",
      settingsPath: "/services-settings/twitch"
    },
    [kt.WidySol]: {
      active: !1,
      color: "#370161",
      authPath: `/widy/create-donation-account/${_u.Sol}`
    },
    [kt.WidyTon]: {
      active: !1,
      color: "#0098ea",
      authPath: `/widy/create-donation-account/${_u.Ton}`
    },
    [kt.DonationAlerts]: {
      active: !1,
      color: "#f57d07",
      authPath: "/donationalerts/token"
    },
    [kt.StreamLabs]: {
      active: !1,
      color: "#80f5d2",
      authPath: "/streamlabs/token"
    },
    [kt.Donatello]: {
      active: !1,
      color: "#3579f6",
      authPath: "/donatello/token"
    },
    [kt.Donatik]: {
      active: !1,
      color: "#7a44ed",
      authPath: "/donatik/token"
    },
    [kt.DonatePay]: {
      active: !1,
      color: "#44ab4f",
      authPath: "/donatepay/token"
    },
    [kt.Destream]: {
      active: !1,
      color: "#f05a00",
      authPath: "/destream/overlay-id"
    },
    [kt.Tribute]: {
      active: !1,
      color: "#2692ffb2",
      authPath: "/tribute/api-key"
    }
  }
}, gb = Mn({
  name: "services",
  initialState: yB,
  reducers: {
    setServiceActive: (e, t) => {
      e.services[t.payload.service].active = t.payload.active;
    }
  }
}), { setServiceActive: TB } = gb.actions;
var vB = { NODE_ENV: "production" };
const wB = dh({
  mediaState: Q0.reducer,
  alertsState: q0.reducer,
  servicesState: gb.reducer,
  messagesState: hb.reducer,
  [wr.reducerPath]: wr.reducer
}), SB = (e) => x5({
  reducer: wB,
  middleware: (t) => t().concat(wr.middleware),
  preloadedState: e,
  devTools: vB.NODE_ENV !== "production"
}), Sr = SB(), _r = new ch("ws://127.0.0.1:12553/ws");
_r.connect();
_r.subscribe(ie.Message, (e) => {
  Sr.dispatch(kh.util.invalidateTags(["Messages"]));
});
_r.subscribe(ie.AlertPlaying, (e) => {
  Sr.dispatch(K0(e));
});
_r.subscribe(ie.MediaPlaying, (e) => {
  Sr.dispatch(vh("")), Sr.dispatch(G0(e));
});
_r.subscribe(ie.MediaPaused, (e) => {
  Sr.dispatch(vh(e));
});
_r.subscribe(ie.AlertPlayed, (e) => {
  Sr.dispatch(K0(""));
});
_r.subscribe(ie.MediaPlayed, (e) => {
  Sr.dispatch(G0("")), Sr.dispatch(vh(""));
});
_r.subscribe(ie.Settings, (e) => {
  jt.changeLanguage(e.language);
});
LR.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ z.jsx(Ut.StrictMode, { children: /* @__PURE__ */ z.jsx(Oz, { context: $0, eventsService: _r, children: /* @__PURE__ */ z.jsx($z, { store: Sr, children: /* @__PURE__ */ z.jsxs(o$, { children: [
    /* @__PURE__ */ z.jsx(NP, {}),
    /* @__PURE__ */ z.jsx(mB, {})
  ] }) }) }) })
);
