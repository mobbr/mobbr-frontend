!function ()
{
    function a(a)
    {
        this.message = a
    }

    var b = "undefined" != typeof exports ? exports : this, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    a.prototype = new Error, a.prototype.name = "InvalidCharacterError", b.btoa || (b.btoa = function (b)
    {
        for (var d, e, f = 0, g = c, h = ""; b.charAt(0 | f) || (g = "=", f % 1); h += g.charAt(63 & d >> 8 - f % 1 * 8))
        {
            if (e = b.charCodeAt(f += .75), e > 255)
            {
                throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            d = d << 8 | e
        }
        return h
    }), b.atob || (b.atob = function (b)
    {
        if (b = b.replace(/=+$/, ""), b.length % 4 == 1)
        {
            throw new a("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (var d, e, f = 0, g = 0, h = ""; e = b.charAt(g++); ~e && (d = f % 4 ? 64 * d + e : e, f++ % 4) ? h += String.fromCharCode(255 & d >> (-2 * f & 6)) : 0)
        {
            e = c.indexOf(e);
        }
        return h
    })
}(), function (a)
{
    "use strict";
    function b(a, b)
    {
        var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | 65535 & c
    }

    function c(a, b)
    {
        return a << b | a >>> 32 - b
    }

    function d(a, d, e, f, g, h)
    {
        return b(c(b(b(d, a), b(f, h)), g), e)
    }

    function e(a, b, c, e, f, g, h)
    {
        return d(b & c | ~b & e, a, b, f, g, h)
    }

    function f(a, b, c, e, f, g, h)
    {
        return d(b & e | c & ~e, a, b, f, g, h)
    }

    function g(a, b, c, e, f, g, h)
    {
        return d(b ^ c ^ e, a, b, f, g, h)
    }

    function h(a, b, c, e, f, g, h)
    {
        return d(c ^ (b | ~e), a, b, f, g, h)
    }

    function i(a, c)
    {
        a[c >> 5] |= 128 << c % 32, a[(c + 64 >>> 9 << 4) + 14] = c;
        var d, i, j, k, l, m = 1732584193, n = -271733879, o = -1732584194, p = 271733878;
        for (d = 0; d < a.length; d += 16)
        {
            i = m, j = n, k = o, l = p, m = e(m, n, o, p, a[d], 7, -680876936), p = e(p, m, n, o, a[d + 1], 12, -389564586), o = e(o, p, m, n, a[d + 2], 17, 606105819), n = e(n, o, p, m, a[d + 3], 22, -1044525330), m = e(m, n, o, p, a[d + 4], 7, -176418897), p = e(p, m, n, o, a[d + 5], 12, 1200080426), o = e(o, p, m, n, a[d + 6], 17, -1473231341), n = e(n, o, p, m, a[d + 7], 22, -45705983), m = e(m, n, o, p, a[d + 8], 7, 1770035416), p = e(p, m, n, o, a[d + 9], 12, -1958414417), o = e(o, p, m, n, a[d + 10], 17, -42063), n = e(n, o, p, m, a[d + 11], 22, -1990404162), m = e(m, n, o, p, a[d + 12], 7, 1804603682), p = e(p, m, n, o, a[d + 13], 12, -40341101), o = e(o, p, m, n, a[d + 14], 17, -1502002290), n = e(n, o, p, m, a[d + 15], 22, 1236535329), m = f(m, n, o, p, a[d + 1], 5, -165796510), p = f(p, m, n, o, a[d + 6], 9, -1069501632), o = f(o, p, m, n, a[d + 11], 14, 643717713), n = f(n, o, p, m, a[d], 20, -373897302), m = f(m, n, o, p, a[d + 5], 5, -701558691), p = f(p, m, n, o, a[d + 10], 9, 38016083), o = f(o, p, m, n, a[d + 15], 14, -660478335), n = f(n, o, p, m, a[d + 4], 20, -405537848), m = f(m, n, o, p, a[d + 9], 5, 568446438), p = f(p, m, n, o, a[d + 14], 9, -1019803690), o = f(o, p, m, n, a[d + 3], 14, -187363961), n = f(n, o, p, m, a[d + 8], 20, 1163531501), m = f(m, n, o, p, a[d + 13], 5, -1444681467), p = f(p, m, n, o, a[d + 2], 9, -51403784), o = f(o, p, m, n, a[d + 7], 14, 1735328473), n = f(n, o, p, m, a[d + 12], 20, -1926607734), m = g(m, n, o, p, a[d + 5], 4, -378558), p = g(p, m, n, o, a[d + 8], 11, -2022574463), o = g(o, p, m, n, a[d + 11], 16, 1839030562), n = g(n, o, p, m, a[d + 14], 23, -35309556), m = g(m, n, o, p, a[d + 1], 4, -1530992060), p = g(p, m, n, o, a[d + 4], 11, 1272893353), o = g(o, p, m, n, a[d + 7], 16, -155497632), n = g(n, o, p, m, a[d + 10], 23, -1094730640), m = g(m, n, o, p, a[d + 13], 4, 681279174), p = g(p, m, n, o, a[d], 11, -358537222), o = g(o, p, m, n, a[d + 3], 16, -722521979), n = g(n, o, p, m, a[d + 6], 23, 76029189), m = g(m, n, o, p, a[d + 9], 4, -640364487), p = g(p, m, n, o, a[d + 12], 11, -421815835), o = g(o, p, m, n, a[d + 15], 16, 530742520), n = g(n, o, p, m, a[d + 2], 23, -995338651), m = h(m, n, o, p, a[d], 6, -198630844), p = h(p, m, n, o, a[d + 7], 10, 1126891415), o = h(o, p, m, n, a[d + 14], 15, -1416354905), n = h(n, o, p, m, a[d + 5], 21, -57434055), m = h(m, n, o, p, a[d + 12], 6, 1700485571), p = h(p, m, n, o, a[d + 3], 10, -1894986606), o = h(o, p, m, n, a[d + 10], 15, -1051523), n = h(n, o, p, m, a[d + 1], 21, -2054922799), m = h(m, n, o, p, a[d + 8], 6, 1873313359), p = h(p, m, n, o, a[d + 15], 10, -30611744), o = h(o, p, m, n, a[d + 6], 15, -1560198380), n = h(n, o, p, m, a[d + 13], 21, 1309151649), m = h(m, n, o, p, a[d + 4], 6, -145523070), p = h(p, m, n, o, a[d + 11], 10, -1120210379), o = h(o, p, m, n, a[d + 2], 15, 718787259), n = h(n, o, p, m, a[d + 9], 21, -343485551), m = b(m, i), n = b(n, j), o = b(o, k), p = b(p, l);
        }
        return [m, n, o, p]
    }

    function j(a)
    {
        var b, c = "";
        for (b = 0; b < 32 * a.length; b += 8)
        {
            c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
        }
        return c
    }

    function k(a)
    {
        var b, c = [];
        for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1)
        {
            c[b] = 0;
        }
        for (b = 0; b < 8 * a.length; b += 8)
        {
            c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
        }
        return c
    }

    function l(a)
    {
        return j(i(k(a), 8 * a.length))
    }

    function m(a, b)
    {
        var c, d, e = k(a), f = [], g = [];
        for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; 16 > c; c += 1)
        {
            f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
        }
        return d = i(f.concat(k(b)), 512 + 8 * b.length), j(i(g.concat(d), 640))
    }

    function n(a)
    {
        var b, c, d = "0123456789abcdef", e = "";
        for (c = 0; c < a.length; c += 1)
        {
            b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
        }
        return e
    }

    function o(a)
    {
        return unescape(encodeURIComponent(a))
    }

    function p(a)
    {
        return l(o(a))
    }

    function q(a)
    {
        return n(p(a))
    }

    function r(a, b)
    {
        return m(o(a), o(b))
    }

    function s(a, b)
    {
        return n(r(a, b))
    }

    function t(a, b, c)
    {
        return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a)
    }

    "function" == typeof define && define.amd ? define(function ()
    {
        return t
    }) : a.md5 = t
}(this), function ()
{
    function a(b, d)
    {
        function f(a)
        {
            if (f[a] !== q)
            {
                return f[a];
            }
            var b;
            if ("bug-string-char-index" == a)
            {
                b = "a" != "a"[0];
            } else if ("json" == a)
            {
                b = f("json-stringify") && f("json-parse");
            } else
            {
                var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if ("json-stringify" == a)
                {
                    var i = d.stringify, k = "function" == typeof i && t;
                    if (k)
                    {
                        (c = function ()
                        {
                            return 1
                        }).toJSON = c;
                        try
                        {
                            k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({a: [c, !0, !1, null, "\x00\b\n\f\r	"]}) == e && "1" === i(null, c) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1))
                        } catch (l)
                        {
                            k = !1
                        }
                    }
                    b = k
                }
                if ("json-parse" == a)
                {
                    var m = d.parse;
                    if ("function" == typeof m)
                    {
                        try
                        {
                            if (0 === m("0") && !m(!1))
                            {
                                c = m(e);
                                var n = 5 == c.a.length && 1 === c.a[0];
                                if (n)
                                {
                                    try
                                    {
                                        n = !m('"	"')
                                    } catch (l)
                                    {
                                    }
                                    if (n)
                                    {
                                        try
                                        {
                                            n = 1 !== m("01")
                                        } catch (l)
                                        {
                                        }
                                    }
                                    if (n)
                                    {
                                        try
                                        {
                                            n = 1 !== m("1.")
                                        } catch (l)
                                        {
                                        }
                                    }
                                }
                            }
                        } catch (l)
                        {
                            n = !1
                        }
                    }
                    b = n
                }
            }
            return f[a] = !!b
        }

        b || (b = e.Object()), d || (d = e.Object());
        var g = b.Number || e.Number, h = b.String || e.String, i = b.Object || e.Object, j = b.Date || e.Date, k = b.SyntaxError || e.SyntaxError, l = b.TypeError || e.TypeError, m = b.Math || e.Math, n = b.JSON || e.JSON;
        "object" == typeof n && n && (d.stringify = n.stringify, d.parse = n.parse);
        var o, p, q, r = i.prototype, s = r.toString, t = new j(-0xc782b5b800cec);
        try
        {
            t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
        } catch (u)
        {
        }
        if (!f("json"))
        {
            var v = "[object Function]", w = "[object Date]", x = "[object Number]", y = "[object String]", z = "[object Array]", A = "[object Boolean]", B = f("bug-string-char-index");
            if (!t)
            {
                var C = m.floor, D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, b)
                {
                    return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
                };
            }
            if ((o = r.hasOwnProperty) || (o = function (a)
                {
                    var b, c = {};
                    return (c.__proto__ = null, c.__proto__ = {toString: 1}, c).toString != s ? o = function (a)
                    {
                        var b = this.__proto__, c = a in(this.__proto__ = null, this);
                        return this.__proto__ = b, c
                    } : (b = c.constructor, o = function (a)
                    {
                        var c = (this.constructor || b).prototype;
                        return a in this && !(a in c && this[a] === c[a])
                    }), c = null, o.call(this, a)
                }), p = function (a, b)
                {
                    var d, e, f, g = 0;
                    (d = function ()
                    {
                        this.valueOf = 0
                    }).prototype.valueOf = 0, e = new d;
                    for (f in e)
                    {
                        o.call(e, f) && g++;
                    }
                    return d = e = null, g ? p = 2 == g ? function (a, b)
                    {
                        var c, d = {}, e = s.call(a) == v;
                        for (c in a)
                        {
                            e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                        }
                    } : function (a, b)
                    {
                        var c, d, e = s.call(a) == v;
                        for (c in a)
                        {
                            e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                        }
                        (d || o.call(a, c = "constructor")) && b(c)
                    } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function (a, b)
                    {
                        var d, f, g = s.call(a) == v, h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                        for (d in a)
                        {
                            g && "prototype" == d || !h.call(a, d) || b(d);
                        }
                        for (f = e.length; d = e[--f]; h.call(a, d) && b(d))
                        {
                            ;
                        }
                    }), p(a, b)
                }, !f("json-stringify"))
            {
                var F = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                }, G = "000000", H = function (a, b)
                {
                    return (G + (b || 0)).slice(-a)
                }, I = "\\u00", J = function (a)
                {
                    for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++)
                    {
                        var g = a.charCodeAt(c);
                        switch (g)
                        {
                            case 8:
                            case 9:
                            case 10:
                            case 12:
                            case 13:
                            case 34:
                            case 92:
                                b += F[g];
                                break;
                            default:
                                if (32 > g)
                                {
                                    b += I + H(2, g.toString(16));
                                    break
                                }
                                b += e ? f[c] : a.charAt(c)
                        }
                    }
                    return b + '"'
                }, K = function (a, b, c, d, e, f, g)
                {
                    var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L;
                    try
                    {
                        h = b[a]
                    } catch (M)
                    {
                    }
                    if ("object" == typeof h && h)
                    {
                        if (i = s.call(h), i != w || o.call(h, "toJSON"))
                        {
                            "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a));
                        } else if (h > -1 / 0 && 1 / 0 > h)
                        {
                            if (E)
                            {
                                for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++)
                                {
                                    ;
                                }
                                for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++)
                                {
                                    ;
                                }
                                m = 1 + m - E(j, k), n = (h % 864e5 + 864e5) % 864e5, r = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3
                            } else
                            {
                                j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
                            }
                            h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
                        } else
                        {
                            h = null;
                        }
                    }
                    if (c && (h = c.call(b, a, h)), null === h)
                    {
                        return "null";
                    }
                    if (i = s.call(h), i == A)
                    {
                        return "" + h;
                    }
                    if (i == x)
                    {
                        return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                    }
                    if (i == y)
                    {
                        return J("" + h);
                    }
                    if ("object" == typeof h)
                    {
                        for (G = g.length; G--;)
                        {
                            if (g[G] === h)
                            {
                                throw l();
                            }
                        }
                        if (g.push(h), B = [], I = f, f += e, i == z)
                        {
                            for (F = 0, G = h.length; G > F; F++)
                            {
                                D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D);
                            }
                            L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
                        } else
                        {
                            p(d || h, function (a)
                            {
                                var b = K(a, h, c, d, e, f, g);
                                b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
                            }), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
                        }
                        return g.pop(), L
                    }
                };
                d.stringify = function (a, b, d)
                {
                    var e, f, g, h;
                    if (c[typeof b] && b)
                    {
                        if ((h = s.call(b)) == v)
                        {
                            f = b;
                        } else if (h == z)
                        {
                            g = {};
                            for (var i, j = 0, k = b.length; k > j; i = b[j++], h = s.call(i), (h == y || h == x) && (g[i] = 1))
                            {
                                ;
                            }
                        }
                    }
                    if (d)
                    {
                        if ((h = s.call(d)) == x)
                        {
                            if ((d -= d % 1) > 0)
                            {
                                for (e = "", d > 10 && (d = 10); e.length < d; e += " ")
                                {
                                    ;
                                }
                            }
                        } else
                        {
                            h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
                        }
                    }
                    return K("", (i = {}, i[""] = a, i), f, g, e, "", [])
                }
            }
            if (!f("json-parse"))
            {
                var L, M, N = h.fromCharCode, O = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "	",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                }, P = function ()
                {
                    throw L = M = null, k()
                }, Q = function ()
                {
                    for (var a, b, c, d, e, f = M, g = f.length; g > L;)
                    {
                        switch (e = f.charCodeAt(L))
                        {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                L++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                return a = B ? f.charAt(L) : f[L], L++, a;
                            case 34:
                                for (a = "@", L++; g > L;)
                                {
                                    if (e = f.charCodeAt(L), 32 > e)
                                    {
                                        P();
                                    } else if (92 == e)
                                    {
                                        switch (e = f.charCodeAt(++L))
                                        {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                a += O[e], L++;
                                                break;
                                            case 117:
                                                for (b = ++L, c = L + 4; c > L; L++)
                                                {
                                                    e = f.charCodeAt(L), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P();
                                                }
                                                a += N("0x" + f.slice(b, L));
                                                break;
                                            default:
                                                P()
                                        }
                                    } else
                                    {
                                        if (34 == e)
                                        {
                                            break;
                                        }
                                        for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e;)
                                        {
                                            e = f.charCodeAt(++L);
                                        }
                                        a += f.slice(b, L)
                                    }
                                }
                                if (34 == f.charCodeAt(L))
                                {
                                    return L++, a;
                                }
                                P();
                            default:
                                if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && 57 >= e)
                                {
                                    for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && 57 >= e) && P(), d = !1; g > L && (e = f.charCodeAt(L), e >= 48 && 57 >= e); L++)
                                    {
                                        ;
                                    }
                                    if (46 == f.charCodeAt(L))
                                    {
                                        for (c = ++L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++)
                                        {
                                            ;
                                        }
                                        c == L && P(), L = c
                                    }
                                    if (e = f.charCodeAt(L), 101 == e || 69 == e)
                                    {
                                        for (e = f.charCodeAt(++L), (43 == e || 45 == e) && L++, c = L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++)
                                        {
                                            ;
                                        }
                                        c == L && P(), L = c
                                    }
                                    return +f.slice(b, L)
                                }
                                if (d && P(), "true" == f.slice(L, L + 4))
                                {
                                    return L += 4, !0;
                                }
                                if ("false" == f.slice(L, L + 5))
                                {
                                    return L += 5, !1;
                                }
                                if ("null" == f.slice(L, L + 4))
                                {
                                    return L += 4, null;
                                }
                                P()
                        }
                    }
                    return "$"
                }, R = function (a)
                {
                    var b, c;
                    if ("$" == a && P(), "string" == typeof a)
                    {
                        if ("@" == (B ? a.charAt(0) : a[0]))return a.slice(1);
                        if ("[" == a)
                        {
                            for (b = []; a = Q(), "]" != a; c || (c = !0))c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
                            return b
                        }
                        if ("{" == a)
                        {
                            for (b = {}; a = Q(), "}" != a; c || (c = !0))c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q());
                            return b
                        }
                        P()
                    }
                    return a
                }, S = function (a, b, c)
                {
                    var d = T(a, b, c);
                    d === q ? delete a[b] : a[b] = d
                }, T = function (a, b, c)
                {
                    var d, e = a[b];
                    if ("object" == typeof e && e)if (s.call(e) == z)for (d = e.length; d--;)S(e, d, c); else p(e, function (a)
                    {
                        S(e, a, c)
                    });
                    return c.call(a, b, e)
                };
                d.parse = function (a, b)
                {
                    var c, d;
                    return L = 0, M = "" + a, c = R(Q()), "$" != Q() && P(), L = M = null, b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
                }
            }
        }
        return d.runInContext = a, d
    }

    var b = "function" == typeof define && define.amd, c = {
        "function": !0,
        object: !0
    }, d = c[typeof exports] && exports && !exports.nodeType && exports, e = c[typeof window] && window || this, f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f), d && !b)a(e, d); else
    {
        var g = e.JSON, h = e.JSON3, i = !1, j = a(e, e.JSON3 = {
            noConflict: function ()
            {
                return i || (i = !0, e.JSON = g, e.JSON3 = h, g = h = null), j
            }
        });
        e.JSON = {parse: j.parse, stringify: j.stringify}
    }
    b && define(function ()
    {
        return j
    })
}.call(this);
var mobbr = mobbr || function ()
    {
        function a(a, b)
        {
            for (var c = b.length; c--;)if (b[c] === a)return !0;
            return !1
        }

        function b(a)
        {
            var b = /^https?:\/\/.*/;
            return "string" != typeof a ? !1 : b.test(a) ? !0 : !1
        }

        function c(a, b, c)
        {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        }

        function d()
        {
            if (!p)
            {
                var a = document.createElement("div");
                a.setAttribute("id", "mobbr_div"), a.setAttribute("name", "mobbr_div"), a.style.cssText = "display:none; position: fixed; top: 0; right: 0; width: 320px; height: 100%; z-index: 2147483647;";
                var b = document.createElement("a");
                b.style.cssText = "cursor: pointer; font-size: 26px; line-height: 59px; position:absolute; top:0; right:0; text-decoration:none; width: 60px; height: 59px; color: #595f64; z-index: 99999999999; border-left: 1px solid #000; border-bottom: 1px solid #000;", b.onclick = k, b.innerText = "x", q = document.createElement("iframe"), q.setAttribute("name", "mobbr_frame"), q.setAttribute("id", "mobbr_frame"), q.setAttribute("frameborder", "0"), q.style.cssText = "width: 100%; height: 100%;", q.src = o, a.appendChild(b), a.appendChild(q), p = a
            }
        }

        function e(a, b, c, d)
        {
            var e = document.createElement("img"), f = r[c];
            return d && (a += "/" + d.toUpperCase()), e.style.cssText = "cursor: pointer; cursor: hand; width: " + f.width + "px !important; height: " + f.height + "px !important", e.className = "mobbr_button", e.onclick = b, e.src = a, e.alt = "Mobbr button", e.title = "Click to see payment info", e
        }

        function f(a, c, d)
        {
            var f = "";
            return b(a) ? f = md5(a.replace(/([^:])(\/\/+)/g, "$1/").replace(/[#\?\/]+$/, "")) : b(a.url) && (f = md5(a.url.replace(/([^:])(\/\/+)/g, "$1/").replace(/[#\?\/]+$/, ""))), e(m + "/button/" + f + "/" + c, function (b)
            {
                return mobbr.makePayment(a, b.target), !1
            }, c, d)
        }

        function g(a, c, d)
        {
            var f, g = c.replace("badge", "").toLowerCase();
            return f = b(a) ? a.split("://") : a.url.split("://"), e(m + "/badge/" + f[0] + "/" + f[1] + "/" + g, function ()
            {
                window.open(n + "/#/domain/" + window.btoa(f[0] + "://" + f[1]), "_blank")
            }, c, d)
        }

        function h(a, b, c, d, e)
        {
            var h, j, k, l, m = ("badgeMedium" === b || "badgeWide" === b) && !0 || !1;
            if (a = i(a), h = m ? g(a, b, c) : f(a, b, c), "undefined" != typeof d)switch (j = d, "string" == typeof d && (j = document.getElementById(d)), e)
            {
                case"before":
                    j.parentNode.insertBefore(h, j);
                    break;
                case"replace":
                    j.parentNode.replaceChild(h, j);
                    break;
                default:
                    j.appendChild(h)
            } else k = document.getElementsByTagName("script"), l = k[k.length - 1], l.parentNode.insertBefore(h, l)
        }

        function i(a)
        {
            var c, d, e, f;
            if (b(a) ? c = a : a && a.url && (c = a.url), !c)for (d = document.getElementsByTagName("link"), f = 0; f < d.length; f++)if ("canonical" === d[f].getAttribute("rel").toLowerCase().replace(/^\s+|\s+$/g, ""))
            {
                c = d[f].getAttribute("href").replace(/^\s+|\s+$/g, "").replace(/\/$/, "");
                break
            }
            if (!c)for (e = document.getElementsByTagName("meta"), f = 0; f < e.length; f++)if (e[f].getAttribute("property") && "og:url" === e[f].getAttribute("property").toLowerCase().replace(/^\s+|\s+$/g, ""))
            {
                c = e[f].getAttribute("content").replace(/^\s+|\s+$/g, "").replace(/\/$/, "");
                break
            }
            return c || (c = window.location.toString()), c = c.replace(/([^:])(\/\/+)/g, "$1/").replace(/[#\?\/]+$/, ""), a || (a = c), b(a) || a.url || (a.url = c), a
        }

        function j(a)
        {
            q.src = void 0 === a ? "" : o + "/" + a
        }

        function k()
        {
            j(), p.style.display = "none"
        }

        function l(a)
        {
            j(a || ""), p.style.display = "block"
        }

        var m = "https://api.mobbr.com", n = "https://mobbr.com", o = "https://mobbr.com/lightbox/#";
        c(window, "load", d);
        var p, q, r = {
            slim: [110, 20],
            icon: [16, 16],
            flat: [120, 21],
            small: [32, 32],
            large: [64, 64],
            medium: [50, 60],
            icongs: [16, 16],
            flatgs: [120, 21],
            smallgs: [32, 32],
            largegs: [64, 64],
            mediumgs: [50, 60],
            badgeMedium: [53, 65],
            badgeWide: [150, 20]
        }, s = ["slim", "icon", "flat", "small", "large", "medium", "icongs", "flatgs", "smallgs", "largegs", "mediumgs", "badgeMedium", "badgeWide"];
        return window.onload = function ()
        {
            document.body.appendChild(p)
        }, {
            createDiv: function ()
            {
                p && (document.body.removeChild(p), p = void 0), d()
            }, setApiUrl: function (a)
            {
                m = a
            }, setUiUrl: function (a)
            {
                n = a
            }, setLightboxUrl: function (a)
            {
                o = a
            }, getApiUrl: function ()
            {
                return m
            }, getUiUrl: function ()
            {
                return n
            }, getLightboxUrl: function ()
            {
                return o
            }, button: function (b, c, d, e, f)
            {
                c = c || !1, a(d, s) || (d = "medium"), h(b, d, c, e, f)
            }, hide: k, makePayment: function (a, b)
            {
                "object" == typeof a ? window.document.getElementById("mobbr_frame").contentWindow.postMessage(a, o) : window.document.getElementById("mobbr_frame").contentWindow.postMessage(null, o), l("hash/" + window.btoa("object" == typeof a ? a.url : a), b)
            }, login: function ()
            {
                l("login")
            }, logout: function ()
            {
                l("logout")
            }, buttonFlat: function (a, b)
            {
                h(a, "flat", b)
            }, buttonSmall: function (a, b)
            {
                h(a, "small", b)
            }, buttonLarge: function (a, b)
            {
                h(a, "large", b)
            }, buttonMedium: function (a, b)
            {
                h(a, "medium", b)
            }, buttonFlatGS: function (a, b)
            {
                h(a, "flatgs", b)
            }, buttonSmallGS: function (a, b)
            {
                h(a, "smallgs", b)
            }, buttonLargeGS: function (a, b)
            {
                h(a, "largegs", b)
            }, buttonMediumGS: function (a, b)
            {
                h(a, "mediumgs", b)
            }, buttonSlim: function (a, b)
            {
                h(a, "slim", b)
            }, buttonIcon: function (a, b)
            {
                h(a, "icon", b)
            }, badgeMedium: function (a, b)
            {
                h(a, "badgeMedium", b)
            }, badgeWide: function (a, b)
            {
                h(a, "badgeWide", b)
            }
        }
    }();
!function (a, b)
{
    function c(a, b, c)
    {
        var d, e = "";
        return c && (d = new Date, d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + d.toGMTString()), document.cookie = a + "=" + b + e + "; path=/", b
    }

    function d(a)
    {
        var b, c, d = a + "=", e = document.cookie.split(";");
        for (c = 0; c < e.length; c++)
        {
            for (b = e[c]; " " == b.charAt(0);)b = b.substring(1, b.length);
            if (0 === b.indexOf(d))return b.substring(d.length, b.length)
        }
        return null
    }

    function e()
    {
        var d = a.addEventListener ? "addEventListener" : "attachEvent", e = a[d], h = "attachEvent" == d ? "onmessage" : "message";
        e(h, function (d)
        {
            var e, h, i;
            i = mobbr.getUiUrl(), g = d.source, "/" == i.substr(-1) && (i = i.substr(0, i.length - 1)), d.origin === i && (e = "logout" === d.data && f && "deleted" !== f, h = "logout" !== d.data && d.data !== f, (h || e) && (f = c("mobbr-auth", h && d.data || "deleted", e && -1 || b), setTimeout(function ()
            {
                a.location.reload(!0)
            }, 500)))
        }, !1)
    }

    var f, g, h = {
        enable: function ()
        {
            return g ? !1 : (f = d("mobbr-auth"), e(), !0)
        }, login: function ()
        {
            mobbr.login()
        }, logout: function ()
        {
            mobbr.logout()
        }
    };
    a.mobbrSSO = a.mobbrSSO || h
}(this), function ()
{
    var a = document.getElementsByTagName("script"), b = a[a.length - 1], c = b.innerHTML.split(",");
    c[0], c[1]
}(this);