;
(function () {
  var object = typeof exports != 'undefined' ? exports : this;
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';
  object.btoa || (object.btoa = function (input) {
    for (var block, charCode, idx = 0, map = chars, output = ''; input.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = input.charCodeAt(idx += 3 / 4);
      if (charCode > 255) {
        throw new InvalidCharacterError('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
      }
      block = block << 8 | charCode;
    }
    return output;
  });
  object.atob || (object.atob = function (input) {
    input = input.replace(/=+$/, '');
    if (input.length % 4 == 1) {
      throw new InvalidCharacterError('\'atob\' failed: The string to be decoded is not correctly encoded.');
    }
    for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = input.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  });
}());
(function (window, undefined) {
  var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = '2.0.3', core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    }, completed = function () {
      document.removeEventListener('DOMContentLoaded', completed, false);
      window.removeEventListener('load', completed, false);
      jQuery.ready();
    };
  jQuery.fn = jQuery.prototype = {
    jquery: core_version,
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem;
      if (!selector) {
        return this;
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    },
    selector: '',
    length: 0,
    toArray: function () {
      return core_slice.call(this);
    },
    get: function (num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this;
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      var len = this.length, j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: 'jQuery' + (core_version + Math.random()).replace(/\D/g, ''),
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$;
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }
      return jQuery;
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger('ready').off('ready');
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function';
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[core_toString.call(obj)] || 'object' : typeof obj;
    },
    isPlainObject: function (obj) {
      if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, keepScripts) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = jQuery.buildFragment([data], context, scripts);
      if (scripts) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    },
    parseJSON: JSON.parse,
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, 'text/xml');
      } catch (e) {
        xml = undefined;
      }
      if (!xml || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    },
    noop: function () {
    },
    globalEval: function (code) {
      var script, indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf('use strict') === 1) {
          script = document.createElement('script');
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var value, i = 0, length = obj.length, isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: function (text) {
      return text == null ? '' : core_trim.call(text);
    },
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
        } else {
          core_push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : core_indexOf.call(arr, elem, i);
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if (typeof l === 'number') {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      inv = !!inv;
      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      }
      return core_concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === 'string') {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context || this, args.concat(core_slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, length = elems.length, bulk = key == null;
      if (jQuery.type(key) === 'object') {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== undefined) {
        chainable = true;
        if (!jQuery.isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: Date.now,
    swap: function (elem, options, callback, args) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.apply(elem, args || []);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready);
      } else {
        document.addEventListener('DOMContentLoaded', completed, false);
        window.addEventListener('load', completed, false);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });
  function isArraylike(obj) {
    var length = obj.length, type = jQuery.type(obj);
    if (jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return type === 'array' || type !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
  }
  rootjQuery = jQuery(document);
  (function (window, undefined) {
    var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = 'sizzle' + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), hasDuplicate = false, sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        return 0;
      }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function (elem) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:([*^$|!~]?=)' + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + attributes.replace(3, 8) + ')*)|.*)\\)|)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rsibling = new RegExp(whitespace + '*[+~]'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + characterEncoding + ')'),
        'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
        'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      if (!selector || typeof selector !== 'string') {
        return results;
      }
      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return [];
      }
      if (documentIsHTML && !seed) {
        if (match = rquickExpr.exec(selector)) {
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
            groups = tokenize(selector);
            if (old = context.getAttribute('id')) {
              nid = old.replace(rescape, '\\$&');
            } else {
              context.setAttribute('id', nid);
            }
            nid = '[id=\'' + nid + '\'] ';
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(',');
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
            } finally {
              if (!old) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key += ' ') > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key] = value;
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement('div');
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split('|'), i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    support = Sizzle.support = {};
    setDocument = Sizzle.setDocument = function (node) {
      var doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = doc.documentElement;
      documentIsHTML = !isXML(doc);
      if (parent && parent.attachEvent && parent !== parent.top) {
        parent.attachEvent('onbeforeunload', function () {
          setDocument();
        });
      }
      support.attributes = assert(function (div) {
        div.className = 'i';
        return !div.getAttribute('className');
      });
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(doc.createComment(''));
        return !div.getElementsByTagName('*').length;
      });
      support.getElementsByClassName = assert(function (div) {
        div.innerHTML = '<div class=\'a\'></div><div class=\'a i\'></div>';
        div.firstChild.className = 'i';
        return div.getElementsByClassName('i').length === 2;
      });
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== strundefined && documentIsHTML) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
      } else {
        delete Expr.find['ID'];
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
      }
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== strundefined) {
          return context.getElementsByTagName(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if (support.qsa = rnative.test(doc.querySelectorAll)) {
        assert(function (div) {
          div.innerHTML = '<select><option selected=\'\'></option></select>';
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
        });
        assert(function (div) {
          var input = doc.createElement('input');
          input.setAttribute('type', 'hidden');
          div.appendChild(input).setAttribute('t', '');
          if (div.querySelectorAll('[t^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          div.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (div) {
          support.disconnectedMatch = matches.call(div, 'div');
          matches.call(div, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = docElem.compareDocumentPosition ? function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        if (compare) {
          if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
            if (a === doc || contains(preferredDoc, a)) {
              return -1;
            }
            if (b === doc || contains(preferredDoc, b)) {
              return 1;
            }
            return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
          }
          return compare & 4 ? -1 : 1;
        }
        return a.compareDocumentPosition ? -1 : 1;
      } : function (a, b) {
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } else if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return doc;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, '=\'$1\']');
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      return results;
    };
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        for (; node = elem[i]; i++) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[5] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          if (match[3] && match[4] !== undefined) {
            match[2] = match[4];
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                diff = cache[1];
              } else {
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                    if (useCache) {
                      (node[expando] || (node[expando] = {}))[type] = [
                        dirruns,
                        diff
                      ];
                    }
                    if (node === elem) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        'not': markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        'lang': markFunction(function (lang) {
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        'empty': function (elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeName > '@' || elem.nodeType === 3 || elem.nodeType === 4) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === elem.type);
        },
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function (elem, context, xml) {
        var data, cache, outerCache, dirkey = dirruns + ' ' + doneName;
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                if ((data = cache[1]) === true || data === cachedruns) {
                  return data === true;
                }
              } else {
                cache = outerCache[dir] = [dirkey];
                cache[1] = matcher(elem, context, xml) || cachedruns;
                if (cache[1] === true) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns;
          }
          for (; (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function select(selector, context, results, seed) {
      var i, tokens, token, type, find, match = tokenize(selector);
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];
            if (Expr.relative[type = token.type]) {
              break;
            }
            if (find = Expr.find[type]) {
              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context)) {
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
      return results;
    }
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    support.detectDuplicates = hasDuplicate;
    setDocument();
    support.sortDetached = assert(function (div1) {
      return div1.compareDocumentPosition(document.createElement('div')) & 1;
    });
    if (!assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        return div.firstChild.getAttribute('href') === '#';
      })) {
      addHandle('type|href|height|width', function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function (div) {
        div.innerHTML = '<input/>';
        div.firstChild.setAttribute('value', '');
        return div.firstChild.getAttribute('value') === '';
      })) {
      addHandle('value', function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function (div) {
        return div.getAttribute('disabled') == null;
      })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === true ? name.toLowerCase() : null;
        }
      });
    }
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(window));
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }
              });
            }(arguments));
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
        },
        empty: function () {
          list = [];
          firingLength = 0;
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          if (list && (!fired || stack)) {
            args = args || [];
            args = [
              context,
              args.slice ? args.slice() : args
            ];
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          [
            'resolve',
            'done',
            jQuery.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            jQuery.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            jQuery.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  jQuery.support = function (support) {
    var input = document.createElement('input'), fragment = document.createDocumentFragment(), div = document.createElement('div'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
    if (!input.type) {
      return support;
    }
    input.type = 'checkbox';
    support.checkOn = input.value !== '';
    support.optSelected = opt.selected;
    support.reliableMarginRight = true;
    support.boxSizingReliable = true;
    support.pixelPosition = false;
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement('input');
    input.value = 't';
    input.type = 'radio';
    support.radioValue = input.value === 't';
    input.setAttribute('checked', 't');
    input.setAttribute('name', 't');
    fragment.appendChild(input);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.focusinBubbles = 'onfocusin' in window;
    div.style.backgroundClip = 'content-box';
    div.cloneNode(true).style.backgroundClip = '';
    support.clearCloneStyle = div.style.backgroundClip === 'content-box';
    jQuery(function () {
      var container, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box', body = document.getElementsByTagName('body')[0];
      if (!body) {
        return;
      }
      container = document.createElement('div');
      container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
      body.appendChild(container).appendChild(div);
      div.innerHTML = '';
      div.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%';
      jQuery.swap(body, body.style.zoom != null ? { zoom: 1 } : {}, function () {
        support.boxSizing = div.offsetWidth === 4;
      });
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
        marginDiv = div.appendChild(document.createElement('div'));
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = '0';
        div.style.width = '1px';
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }
      body.removeChild(container);
    });
    return support;
  }({});
  var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  function Data() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {};
      }
    });
    this.expando = jQuery.expando + Math.random();
  }
  Data.uid = 1;
  Data.accepts = function (owner) {
    return owner.nodeType ? owner.nodeType === 1 || owner.nodeType === 9 : true;
  };
  Data.prototype = {
    key: function (owner) {
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {}, unlock = owner[this.expando];
      if (!unlock) {
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = { value: unlock };
          Object.defineProperties(owner, descriptor);
        } catch (e) {
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    set: function (owner, data, value) {
      var prop, unlock = this.key(owner), cache = this.cache[unlock];
      if (typeof data === 'string') {
        cache[data] = value;
      } else {
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data);
        } else {
          for (prop in data) {
            cache[prop] = data[prop];
          }
        }
      }
      return cache;
    },
    get: function (owner, key) {
      var cache = this.cache[this.key(owner)];
      return key === undefined ? cache : cache[key];
    },
    access: function (owner, key, value) {
      var stored;
      if (key === undefined || key && typeof key === 'string' && value === undefined) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
      if (key === undefined) {
        this.cache[unlock] = {};
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [
              key,
              camel
            ];
          } else {
            name = camel;
            name = name in cache ? [name] : name.match(core_rnotwhite) || [];
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
    },
    hasData: function (owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
    },
    discard: function (owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  data_user = new Data();
  data_priv = new Data();
  jQuery.extend({
    acceptData: Data.accepts,
    hasData: function (elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    data: function (elem, name, data) {
      return data_user.access(elem, name, data);
    },
    removeData: function (elem, name) {
      data_user.remove(elem, name);
    },
    _data: function (elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var attrs, name, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem);
          if (elem.nodeType === 1 && !data_priv.get(elem, 'hasDataAttrs')) {
            attrs = elem.attributes;
            for (; i < attrs.length; i++) {
              name = attrs[i].name;
              if (name.indexOf('data-') === 0) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
            data_priv.set(elem, 'hasDataAttrs', true);
          }
        }
        return data;
      }
      if (typeof key === 'object') {
        return this.each(function () {
          data_user.set(this, key);
        });
      }
      return jQuery.access(this, function (value) {
        var data, camelKey = jQuery.camelCase(key);
        if (elem && value === undefined) {
          data = data_user.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          data = data_user.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        this.each(function () {
          var data = data_user.get(this, camelKey);
          data_user.set(this, camelKey, value);
          if (key.indexOf('-') !== -1 && data !== undefined) {
            data_user.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        data_user.remove(this, key);
      });
    }
  });
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === 'string') {
        try {
          data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
        } catch (e) {
        }
        data_user.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || 'fx') + 'queue';
        queue = data_priv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress');
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          data_priv.remove(elem, [
            type + 'queue',
            key
          ]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === 'fx' && queue[0] !== 'inprogress') {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || 'fx';
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout);
        };
      });
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', []);
    },
    promise: function (type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';
      while (i--) {
        tmp = data_priv.get(elements[i], type + 'queueHooks');
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    },
    addClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              if (cur.indexOf(' ' + clazz + ' ') < 0) {
                cur += clazz + ' ';
              }
            }
            elem.className = jQuery.trim(cur);
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : '');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              while (cur.indexOf(' ' + clazz + ' ') >= 0) {
                cur = cur.replace(' ' + clazz + ' ', ' ');
              }
            }
            elem.className = value ? jQuery.trim(cur) : '';
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === 'boolean' && type === 'string') {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function () {
        if (type === 'string') {
          var className, i = 0, self = jQuery(this), classNames = value.match(core_rnotwhite) || [];
          while (className = classNames[i++]) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (type === core_strundefined || type === 'boolean') {
          if (this.className) {
            data_priv.set(this, '__className__', this.className);
          }
          this.className = this.className || value === false ? '' : data_priv.get(this, '__className__') || '';
        }
      });
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ', i = 0, l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? '' : value + '';
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },
    attr: function (elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === core_strundefined) {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + '');
          return value;
        }
      } else if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function (elem, value) {
      var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
      } else {
        return hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          return elem.hasAttribute('tabindex') || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
        }
      }
    }
  });
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
    jQuery.expr.attrHandle[name] = function (elem, name, isXML) {
      var fn = jQuery.expr.attrHandle[name], ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
      jQuery.expr.attrHandle[name] = fn;
      return ret;
    };
  });
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }
    };
  }
  jQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    };
    if (!jQuery.support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      };
    }
  });
  var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {
    }
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        eventHandle.elem = elem;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        data_priv.remove(elem, 'events');
      }
    },
    trigger: function (event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = core_hasOwn.call(event, 'type') ? event.type : event, namespaces = core_hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(':') < 0 && 'on' + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join('.');
      event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (data_priv.get(cur, 'events') || {})[event.type] && data_priv.get(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault();
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event);
      var i, j, ret, matched, handleObj, handlerQueue = [], args = core_slice.call(arguments), handlers = (data_priv.get(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function (event, handlers) {
      var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || event.type !== 'click')) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + ' ';
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if (this.type === 'checkbox' && this.click && jQuery.nodeName(this, 'input')) {
            this.click();
            return false;
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (orig, fix) {
      var attaches = 0, handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true);
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, ret = [], self = this, len = self.length;
      if (typeof selector !== 'string') {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + ' ' + selector : selector;
      return ret;
    },
    has: function (target) {
      var targets = jQuery(target, this), l = targets.length;
      return this.filter(function () {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    is: function (selector) {
      return !!winnow(this, typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    },
    closest: function (selectors, context) {
      var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            cur = matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }
      if (typeof elem === 'string') {
        return core_indexOf.call(jQuery(elem), this[0]);
      }
      return core_indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return jQuery.dir(elem, 'parentNode');
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'parentNode', until);
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling');
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, 'nextSibling');
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, 'previousSibling');
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'nextSibling', until);
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'previousSibling', until);
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function (elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== 'Until') {
        selector = until;
      }
      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.unique(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    },
    dir: function (elem, dir, until) {
      var matched = [], truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling: function (n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
  });
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier === 'string') {
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function (elem) {
      return core_indexOf.call(qualifier, elem) >= 0 !== not;
    });
  }
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    append: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function (selector, keepData) {
      var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, 'script'));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function () {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = '';
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === 'string' && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var args = jQuery.map(this, function (elem) {
          return [
            elem.nextSibling,
            elem.parentNode
          ];
        }), i = 0;
      this.domManip(arguments, function (elem) {
        var next = args[i++], parent = args[i++];
        if (parent) {
          if (next && next.parentNode !== parent) {
            next = this.nextSibling;
          }
          jQuery(this).remove();
          parent.insertBefore(elem, next);
        }
      }, true);
      return i ? this : this.remove();
    },
    detach: function (selector) {
      return this.remove(selector, true);
    },
    domManip: function (args, callback, allowIntersection) {
      args = core_concat.apply([], args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
      if (isFunction || !(l <= 1 || typeof value !== 'string' || jQuery.support.checkClone || !rchecked.test(value))) {
        return this.each(function (index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback, allowIntersection);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, 'script'));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || '') && !data_priv.access(node, 'globalEval') && jQuery.contains(doc, node)) {
                if (node.src) {
                  jQuery._evalUrl(node.src);
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ''));
                }
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        core_push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!jQuery.support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, 'script');
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
      }
      return clone;
    },
    buildFragment: function (elems, context, scripts, selection) {
      var elem, tmp, tag, wrap, contains, j, i = 0, l = elems.length, fragment = context.createDocumentFragment(), nodes = [];
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === 'object') {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement('div'));
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, '<$1></$2>') + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = '';
          }
        }
      }
      fragment.textContent = '';
      i = 0;
      while (elem = nodes[i++]) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(fragment.appendChild(elem), 'script');
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || '')) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData: function (elems) {
      var data, elem, events, type, key, j, special = jQuery.event.special, i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (Data.accepts(elem)) {
          key = elem[data_priv.expando];
          if (key && (data = data_priv.cache[key])) {
            events = Object.keys(data.events || {});
            if (events.length) {
              for (j = 0; (type = events[j]) !== undefined; j++) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (data_priv.cache[key]) {
              delete data_priv.cache[key];
            }
          }
        }
        delete data_user.cache[elem[data_user.expando]];
      }
    },
    _evalUrl: function (url) {
      return jQuery.ajax({
        url: url,
        type: 'GET',
        dataType: 'script',
        async: false,
        global: false,
        'throws': true
      });
    }
  });
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, 'tr') ? elem.getElementsByTagName('tbody')[0] || elem.appendChild(elem.ownerDocument.createElement('tbody')) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute('type');
    }
    return elem;
  }
  function setGlobalEval(elems, refElements) {
    var l = elems.length, i = 0;
    for (; i < l; i++) {
      data_priv.set(elems[i], 'globalEval', !refElements || data_priv.get(refElements[i], 'globalEval'));
    }
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src);
      pdataCur = data_priv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src);
      udataCur = jQuery.extend({}, udataOld);
      data_user.set(dest, udataCur);
    }
  }
  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || '*') : context.querySelectorAll ? context.querySelectorAll(tag || '*') : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === 'input' && manipulation_rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, 'body')) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([+-])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], cssPrefixes = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ];
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
  }
  function getStyles(elem) {
    return window.getComputedStyle(elem, null);
  }
  function showHide(elements, show) {
    var display, elem, hidden, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = data_priv.get(elem, 'olddisplay');
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === 'none') {
          elem.style.display = '';
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = data_priv.access(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
        }
      } else {
        if (!values[index]) {
          hidden = isHidden(elem);
          if (display && display !== 'none' || !hidden) {
            data_priv.set(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
          }
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none';
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        var styles, len, map = {}, i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === 'boolean') {
        return state ? this.show() : this.hide();
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      'columnCount': true,
      'fillOpacity': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'order': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    cssProps: { 'float': 'cssFloat' },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = 'number';
        }
        if (value == null || type === 'number' && isNaN(value)) {
          return;
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px';
        }
        if (!jQuery.support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
          style[name] = 'inherit';
        }
        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === '' || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  curCSS = function (elem, name, _computed) {
    var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
    if (computed) {
      if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret;
  };
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        }
        if (extra !== 'margin') {
          val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      } else {
        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        if (extra !== 'padding') {
          val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    var doc = document, display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === 'none' || !display) {
        iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>').css('cssText', 'display:block !important')).appendTo(doc.documentElement);
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
        doc.write('<!doctype html><html><body>');
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
    elem.remove();
    return display;
  }
  jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, 'display')) ? jQuery.swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function (elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
      }
    };
  });
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          if (computed) {
            return jQuery.swap(elem, { 'display': 'inline-block' }, curCSS, [
              elem,
              'marginRight'
            ]);
          }
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each([
        'top',
        'left'
      ], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
            }
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0, expanded = {}, parts = typeof value === 'string' ? value.split(' ') : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, 'elements');
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type;
        return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, '\r\n')
        };
      }).get();
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join('&').replace(r20, '+');
  };
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === 'object') {
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    }
  });
  var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = '*/'.concat('*');
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a');
    ajaxLocation.href = '';
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }
      var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*';
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments);
    }
    var selector, type, response, self = this, off = url.indexOf(' ');
    if (off >= 0) {
      selector = url.slice(off);
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: 'html',
        data: params
      }).done(function (responseText) {
        response = arguments;
        self.html(selector ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).complete(callback && function (jqXHR, status) {
        self.each(callback, response || [
          jqXHR.responseText,
          status,
          jqXHR
        ]);
      });
    }
    return this;
  };
  jQuery.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: 'GET',
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          statusCode: function (map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [
                    statusCode[code],
                    map[code]
                  ];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(core_rnotwhite) || [''];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443'))));
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (ajax_rquery.test(cacheURL) ? '&' : '?') + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, '$1_=' + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? '&' : '?') + '_=' + ajax_nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }
      jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [
            jqXHR,
            s
          ]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout');
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || '';
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader('etag');
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === 'HEAD') {
            statusText = 'nocontent';
          } else if (status === 304) {
            statusText = 'notmodified';
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + '';
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [
            success,
            statusText,
            jqXHR
          ]);
        } else {
          deferred.rejectWith(callbackContext, [
            jqXHR,
            statusText,
            error
          ]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]);
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [
            jqXHR,
            s
          ]);
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }
      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    }
  });
  jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === '*') {
          current = prev;
        } else if (prev !== '*' && prev !== current) {
          conv = converters[prev + ' ' + current] || converters['* ' + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s['throws']) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: 'success',
      data: response
    };
  }
  jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
    }
  });
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery('<script>').prop({
            async: true,
            charset: s.scriptCharset,
            src: s.url
          }).on('load error', callback = function (evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === 'error' ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + ajax_nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(s.data) && 'data');
    if (jsonProp || s.dataTypes[0] === 'jsonp') {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (ajax_rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called');
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = 'json';
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return 'script';
    }
  });
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {
    }
  };
  var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {
      0: 200,
      1223: 204
    }, xhrId = 0, xhrCallbacks = {};
  if (window.ActiveXObject) {
    jQuery(window).on('unload', function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
      xhrCallbacks = undefined;
    });
  }
  jQuery.support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
  jQuery.support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback;
    if (jQuery.support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function (headers, complete) {
          var i, id, xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function (type) {
            return function () {
              if (callback) {
                delete xhrCallbacks[id];
                callback = xhr.onload = xhr.onerror = null;
                if (type === 'abort') {
                  xhr.abort();
                } else if (type === 'error') {
                  complete(xhr.status || 404, xhr.statusText);
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === 'string' ? { text: xhr.responseText } : undefined, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          xhr.onerror = callback('error');
          callback = xhrCallbacks[id = xhrId++] = callback('abort');
          xhr.send(options.hasContent && options.data || null);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([+-])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), start = (jQuery.cssNumber[prop] || unit !== 'px' && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || '.5';
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
          }
          return tween;
        }]
    };
  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = jQuery.now();
  }
  function createTween(value, prop, animation) {
    var tween, collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0, length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [
              animation,
              gotoEnd
            ]);
          } else {
            deferred.rejectWith(elem, [
              animation,
              gotoEnd
            ]);
          }
          return this;
        }
      }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.split(' ');
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, tween, hooks, oldfire, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, 'fxshow');
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ];
      if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
        style.display = 'inline-block';
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden';
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ('hidden' in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, 'fxshow', {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        data_priv.remove(elem, 'fxshow');
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
          }
        }
      }
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || 'swing';
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, '');
        return !result || result === 'auto' ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || data_priv.get(this, 'finish')) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', []);
      }
      return this.each(function () {
        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || 'fx';
      }
      return this.each(function () {
        var index, data = data_priv.get(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs['margin' + which] = attrs['padding' + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer)) {
      jQuery.fx.start();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var docElem, win, elem = this[0], box = {
        top: 0,
        left: 0
      }, doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== core_strundefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  };
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
      if (position === 'static') {
        elem.style.position = 'relative';
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, 'top');
      curCSSLeft = jQuery.css(elem, 'left');
      calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return;
      }
      var offsetParent, offset, elem = this[0], parentOffset = {
          top: 0,
          left: 0
        };
      if (jQuery.css(elem, 'position') === 'fixed') {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], 'html')) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
        parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
        left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = 'pageYOffset' === prop;
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement['client' + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.size = function () {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = jQuery;
  } else {
    if (typeof define === 'function' && define.amd) {
      define('jquery', [], function () {
        return jQuery;
      });
    }
  }
  if (typeof window === 'object' && typeof window.document === 'object') {
    window.jQuery = window.$ = jQuery;
  }
}(window));
(function (window, document, undefined) {
  'use strict';
  var lowercase = function (string) {
    return isString(string) ? string.toLowerCase() : string;
  };
  var uppercase = function (string) {
    return isString(string) ? string.toUpperCase() : string;
  };
  var manualLowercase = function (s) {
    return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) | 32);
    }) : s;
  };
  var manualUppercase = function (s) {
    return isString(s) ? s.replace(/[a-z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) & ~32);
    }) : s;
  };
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }
  var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
      '0',
      '0',
      '0'
    ];
  function isArrayLike(obj) {
    if (!obj || typeof obj.length !== 'number')
      return false;
    if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
      return true;
    } else {
      return obj instanceof JQLite || jQuery && obj instanceof jQuery || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
    }
  }
  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isArrayLike(obj)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }
  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }
  function nextUid() {
    var index = uid.length;
    var digit;
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  }
  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }
  function extend(dst) {
    var h = dst.$$hashKey;
    forEach(arguments, function (obj) {
      if (obj !== dst) {
        forEach(obj, function (value, key) {
          dst[key] = value;
        });
      }
    });
    setHashKey(dst, h);
    return dst;
  }
  function int(str) {
    return parseInt(str, 10);
  }
  function inherit(parent, extra) {
    return extend(new (extend(function () {
    }, { prototype: parent }))(), extra);
  }
  function noop() {
  }
  noop.$inject = [];
  function identity($) {
    return $;
  }
  identity.$inject = [];
  function valueFn(value) {
    return function () {
      return value;
    };
  }
  function isUndefined(value) {
    return typeof value == 'undefined';
  }
  function isDefined(value) {
    return typeof value != 'undefined';
  }
  function isObject(value) {
    return value != null && typeof value == 'object';
  }
  function isString(value) {
    return typeof value == 'string';
  }
  function isNumber(value) {
    return typeof value == 'number';
  }
  function isDate(value) {
    return toString.apply(value) == '[object Date]';
  }
  function isArray(value) {
    return toString.apply(value) == '[object Array]';
  }
  function isFunction(value) {
    return typeof value == 'function';
  }
  function isRegExp(value) {
    return toString.apply(value) == '[object RegExp]';
  }
  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }
  function isFile(obj) {
    return toString.apply(obj) === '[object File]';
  }
  function isBoolean(value) {
    return typeof value == 'boolean';
  }
  var trim = function () {
      if (!String.prototype.trim) {
        return function (value) {
          return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
        };
      }
      return function (value) {
        return isString(value) ? value.trim() : value;
      };
    }();
  function isElement(node) {
    return node && (node.nodeName || node.bind && node.find);
  }
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  if (msie < 9) {
    nodeName_ = function (element) {
      element = element.nodeName ? element : element[0];
      return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
    };
  } else {
    nodeName_ = function (element) {
      return element.nodeName ? element.nodeName : element[0].nodeName;
    };
  }
  function map(obj, iterator, context) {
    var results = [];
    forEach(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  }
  function size(obj, ownPropsOnly) {
    var size = 0, key;
    if (isArray(obj) || isString(obj)) {
      return obj.length;
    } else if (isObject(obj)) {
      for (key in obj)
        if (!ownPropsOnly || obj.hasOwnProperty(key))
          size++;
    }
    return size;
  }
  function includes(array, obj) {
    return indexOf(array, obj) != -1;
  }
  function indexOf(array, obj) {
    if (array.indexOf)
      return array.indexOf(obj);
    for (var i = 0; i < array.length; i++) {
      if (obj === array[i])
        return i;
    }
    return -1;
  }
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index >= 0)
      array.splice(index, 1);
    return value;
  }
  function isLeafNode(node) {
    if (node) {
      switch (node.nodeName) {
      case 'OPTION':
      case 'PRE':
      case 'TITLE':
        return true;
      }
    }
    return false;
  }
  function copy(source, destination) {
    if (isWindow(source) || isScope(source))
      throw Error('Can\'t copy Window or Scope');
    if (!destination) {
      destination = source;
      if (source) {
        if (isArray(source)) {
          destination = copy(source, []);
        } else if (isDate(source)) {
          destination = new Date(source.getTime());
        } else if (isRegExp(source)) {
          destination = new RegExp(source.source);
        } else if (isObject(source)) {
          destination = copy(source, {});
        }
      }
    } else {
      if (source === destination)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++) {
          destination.push(copy(source[i]));
        }
      } else {
        var h = destination.$$hashKey;
        forEach(destination, function (value, key) {
          delete destination[key];
        });
        for (var key in source) {
          destination[key] = copy(source[key]);
        }
        setHashKey(destination, h);
      }
    }
    return destination;
  }
  function shallowCopy(src, dst) {
    dst = dst || {};
    for (var key in src) {
      if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
        dst[key] = src[key];
      }
    }
    return dst;
  }
  function equals(o1, o2) {
    if (o1 === o2)
      return true;
    if (o1 === null || o2 === null)
      return false;
    if (o1 !== o1 && o2 !== o2)
      return true;
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
      if (t1 == 'object') {
        if (isArray(o1)) {
          if (!isArray(o2))
            return false;
          if ((length = o1.length) == o2.length) {
            for (key = 0; key < length; key++) {
              if (!equals(o1[key], o2[key]))
                return false;
            }
            return true;
          }
        } else if (isDate(o1)) {
          return isDate(o2) && o1.getTime() == o2.getTime();
        } else if (isRegExp(o1) && isRegExp(o2)) {
          return o1.toString() == o2.toString();
        } else {
          if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
            return false;
          keySet = {};
          for (key in o1) {
            if (key.charAt(0) === '$' || isFunction(o1[key]))
              continue;
            if (!equals(o1[key], o2[key]))
              return false;
            keySet[key] = true;
          }
          for (key in o2) {
            if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
              return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }
  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }
  function bind(self, fn) {
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
    if (isFunction(fn) && !(fn instanceof RegExp)) {
      return curryArgs.length ? function () {
        return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
      } : function () {
        return arguments.length ? fn.apply(self, arguments) : fn.call(self);
      };
    } else {
      return fn;
    }
  }
  function toJsonReplacer(key, value) {
    var val = value;
    if (/^\$+/.test(key)) {
      val = undefined;
    } else if (isWindow(value)) {
      val = '$WINDOW';
    } else if (value && document === value) {
      val = '$DOCUMENT';
    } else if (isScope(value)) {
      val = '$SCOPE';
    }
    return val;
  }
  function toJson(obj, pretty) {
    if (typeof obj === 'undefined')
      return undefined;
    return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
  }
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  function toBoolean(value) {
    if (value && value.length !== 0) {
      var v = lowercase('' + value);
      value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
    } else {
      value = false;
    }
    return value;
  }
  function startingTag(element) {
    element = jqLite(element).clone();
    try {
      element.html('');
    } catch (e) {
    }
    var TEXT_NODE = 3;
    var elemHtml = jqLite('<div>').append(element).html();
    try {
      return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
        return '<' + lowercase(nodeName);
      });
    } catch (e) {
      return lowercase(elemHtml);
    }
  }
  function tryDecodeURIComponent(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
    }
  }
  function parseKeyValue(keyValue) {
    var obj = {}, key_value, key;
    forEach((keyValue || '').split('&'), function (keyValue) {
      if (keyValue) {
        key_value = keyValue.split('=');
        key = tryDecodeURIComponent(key_value[0]);
        if (isDefined(key)) {
          obj[key] = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
        }
      }
    });
    return obj;
  }
  function toKeyValue(obj) {
    var parts = [];
    forEach(obj, function (value, key) {
      parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
    });
    return parts.length ? parts.join('&') : '';
  }
  function encodeUriSegment(val) {
    return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
  }
  function angularInit(element, bootstrap) {
    var elements = [element], appElement, module, names = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    function append(element) {
      element && elements.push(element);
    }
    forEach(names, function (name) {
      names[name] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if (element.querySelectorAll) {
        forEach(element.querySelectorAll('.' + name), append);
        forEach(element.querySelectorAll('.' + name + '\\:'), append);
        forEach(element.querySelectorAll('[' + name + ']'), append);
      }
    });
    forEach(elements, function (element) {
      if (!appElement) {
        var className = ' ' + element.className + ' ';
        var match = NG_APP_CLASS_REGEXP.exec(className);
        if (match) {
          appElement = element;
          module = (match[2] || '').replace(/\s+/g, ',');
        } else {
          forEach(element.attributes, function (attr) {
            if (!appElement && names[attr.name]) {
              appElement = element;
              module = attr.value;
            }
          });
        }
      }
    });
    if (appElement) {
      bootstrap(appElement, module ? [module] : []);
    }
  }
  function bootstrap(element, modules) {
    var doBootstrap = function () {
      element = jqLite(element);
      modules = modules || [];
      modules.unshift([
        '$provide',
        function ($provide) {
          $provide.value('$rootElement', element);
        }
      ]);
      modules.unshift('ng');
      var injector = createInjector(modules);
      injector.invoke([
        '$rootScope',
        '$rootElement',
        '$compile',
        '$injector',
        function (scope, element, compile, injector) {
          scope.$apply(function () {
            element.data('$injector', injector);
            compile(element)(scope);
          });
        }
      ]);
      return injector;
    };
    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
    if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
      return doBootstrap();
    }
    window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
    angular.resumeBootstrap = function (extraModules) {
      forEach(extraModules, function (module) {
        modules.push(module);
      });
      doBootstrap();
    };
  }
  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  function snake_case(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  function bindJQuery() {
    jQuery = window.jQuery;
    if (jQuery) {
      jqLite = jQuery;
      extend(jQuery.fn, {
        scope: JQLitePrototype.scope,
        controller: JQLitePrototype.controller,
        injector: JQLitePrototype.injector,
        inheritedData: JQLitePrototype.inheritedData
      });
      JQLitePatchJQueryRemove('remove', true, true, false);
      JQLitePatchJQueryRemove('empty', false, false, false);
      JQLitePatchJQueryRemove('html', false, false, true);
    } else {
      jqLite = JQLite;
    }
    angular.element = jqLite;
  }
  function assertArg(arg, name, reason) {
    if (!arg) {
      throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
    }
    return arg;
  }
  function assertArgFn(arg, name, acceptArrayAnnotation) {
    if (acceptArrayAnnotation && isArray(arg)) {
      arg = arg[arg.length - 1];
    }
    assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
    return arg;
  }
  function getter(obj, path, bindFnToScope) {
    if (!path)
      return obj;
    var keys = path.split('.');
    var key;
    var lastInstance = obj;
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      if (obj) {
        obj = (lastInstance = obj)[key];
      }
    }
    if (!bindFnToScope && isFunction(obj)) {
      return bind(lastInstance, obj);
    }
    return obj;
  }
  function setupModuleLoader(window) {
    function ensure(obj, name, factory) {
      return obj[name] || (obj[name] = factory());
    }
    return ensure(ensure(window, 'angular', Object), 'module', function () {
      var modules = {};
      return function module(name, requires, configFn) {
        if (requires && modules.hasOwnProperty(name)) {
          modules[name] = null;
        }
        return ensure(modules, name, function () {
          if (!requires) {
            throw Error('No module: ' + name);
          }
          var invokeQueue = [];
          var runBlocks = [];
          var config = invokeLater('$injector', 'invoke');
          var moduleInstance = {
              _invokeQueue: invokeQueue,
              _runBlocks: runBlocks,
              requires: requires,
              name: name,
              provider: invokeLater('$provide', 'provider'),
              factory: invokeLater('$provide', 'factory'),
              service: invokeLater('$provide', 'service'),
              value: invokeLater('$provide', 'value'),
              constant: invokeLater('$provide', 'constant', 'unshift'),
              filter: invokeLater('$filterProvider', 'register'),
              controller: invokeLater('$controllerProvider', 'register'),
              directive: invokeLater('$compileProvider', 'directive'),
              config: config,
              run: function (block) {
                runBlocks.push(block);
                return this;
              }
            };
          if (configFn) {
            config(configFn);
          }
          return moduleInstance;
          function invokeLater(provider, method, insertMethod) {
            return function () {
              invokeQueue[insertMethod || 'push']([
                provider,
                method,
                arguments
              ]);
              return moduleInstance;
            };
          }
        });
      };
    });
  }
  var version = {
      full: '1.0.8',
      major: 1,
      minor: 0,
      dot: 8,
      codeName: 'bubble-burst'
    };
  function publishExternalAPI(angular) {
    extend(angular, {
      'bootstrap': bootstrap,
      'copy': copy,
      'extend': extend,
      'equals': equals,
      'element': jqLite,
      'forEach': forEach,
      'injector': createInjector,
      'noop': noop,
      'bind': bind,
      'toJson': toJson,
      'fromJson': fromJson,
      'identity': identity,
      'isUndefined': isUndefined,
      'isDefined': isDefined,
      'isString': isString,
      'isFunction': isFunction,
      'isObject': isObject,
      'isNumber': isNumber,
      'isElement': isElement,
      'isArray': isArray,
      'version': version,
      'isDate': isDate,
      'lowercase': lowercase,
      'uppercase': uppercase,
      'callbacks': { counter: 0 }
    });
    angularModule = setupModuleLoader(window);
    try {
      angularModule('ngLocale');
    } catch (e) {
      angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], [
      '$provide',
      function ngModule($provide) {
        $provide.provider('$compile', $CompileProvider).directive({
          a: htmlAnchorDirective,
          input: inputDirective,
          textarea: inputDirective,
          form: formDirective,
          script: scriptDirective,
          select: selectDirective,
          style: styleDirective,
          option: optionDirective,
          ngBind: ngBindDirective,
          ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
          ngBindTemplate: ngBindTemplateDirective,
          ngClass: ngClassDirective,
          ngClassEven: ngClassEvenDirective,
          ngClassOdd: ngClassOddDirective,
          ngCsp: ngCspDirective,
          ngCloak: ngCloakDirective,
          ngController: ngControllerDirective,
          ngForm: ngFormDirective,
          ngHide: ngHideDirective,
          ngInclude: ngIncludeDirective,
          ngInit: ngInitDirective,
          ngNonBindable: ngNonBindableDirective,
          ngPluralize: ngPluralizeDirective,
          ngRepeat: ngRepeatDirective,
          ngShow: ngShowDirective,
          ngStyle: ngStyleDirective,
          ngSwitch: ngSwitchDirective,
          ngSwitchWhen: ngSwitchWhenDirective,
          ngSwitchDefault: ngSwitchDefaultDirective,
          ngOptions: ngOptionsDirective,
          ngView: ngViewDirective,
          ngTransclude: ngTranscludeDirective,
          ngModel: ngModelDirective,
          ngList: ngListDirective,
          ngChange: ngChangeDirective,
          required: requiredDirective,
          ngRequired: requiredDirective,
          ngValue: ngValueDirective
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
        $provide.provider({
          $anchorScroll: $AnchorScrollProvider,
          $browser: $BrowserProvider,
          $cacheFactory: $CacheFactoryProvider,
          $controller: $ControllerProvider,
          $document: $DocumentProvider,
          $exceptionHandler: $ExceptionHandlerProvider,
          $filter: $FilterProvider,
          $interpolate: $InterpolateProvider,
          $http: $HttpProvider,
          $httpBackend: $HttpBackendProvider,
          $location: $LocationProvider,
          $log: $LogProvider,
          $parse: $ParseProvider,
          $route: $RouteProvider,
          $routeParams: $RouteParamsProvider,
          $rootScope: $RootScopeProvider,
          $q: $QProvider,
          $sniffer: $SnifferProvider,
          $templateCache: $TemplateCacheProvider,
          $timeout: $TimeoutProvider,
          $window: $WindowProvider
        });
      }
    ]);
  }
  var jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
      element.addEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.attachEvent('on' + type, fn);
    }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
      element.removeEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.detachEvent('on' + type, fn);
    };
  function jqNextId() {
    return ++jqId;
  }
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  }
  function JQLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
    var originalJqFn = jQuery.fn[name];
    originalJqFn = originalJqFn.$original || originalJqFn;
    removePatch.$original = originalJqFn;
    jQuery.fn[name] = removePatch;
    function removePatch(param) {
      var list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children;
      if (!getterIfNoArguments || param != null) {
        while (list.length) {
          set = list.shift();
          for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
            element = jqLite(set[setIndex]);
            if (fireEvent) {
              element.triggerHandler('$destroy');
            } else {
              fireEvent = !fireEvent;
            }
            for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
              list.push(jQuery(children[childIndex]));
            }
          }
        }
      }
      return originalJqFn.apply(this, arguments);
    }
  }
  function JQLite(element) {
    if (element instanceof JQLite) {
      return element;
    }
    if (!(this instanceof JQLite)) {
      if (isString(element) && element.charAt(0) != '<') {
        throw Error('selectors not implemented');
      }
      return new JQLite(element);
    }
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = '<div>&#160;</div>' + element;
      div.removeChild(div.firstChild);
      JQLiteAddNodes(this, div.childNodes);
      this.remove();
    } else {
      JQLiteAddNodes(this, element);
    }
  }
  function JQLiteClone(element) {
    return element.cloneNode(true);
  }
  function JQLiteDealoc(element) {
    JQLiteRemoveData(element);
    for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
      JQLiteDealoc(children[i]);
    }
  }
  function JQLiteUnbind(element, type, fn) {
    var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
    if (!handle)
      return;
    if (isUndefined(type)) {
      forEach(events, function (eventHandler, type) {
        removeEventListenerFn(element, type, eventHandler);
        delete events[type];
      });
    } else {
      if (isUndefined(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        arrayRemove(events[type] || [], fn);
      }
    }
  }
  function JQLiteRemoveData(element) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId];
    if (expandoStore) {
      if (expandoStore.handle) {
        expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
        JQLiteUnbind(element);
      }
      delete jqCache[expandoId];
      element[jqName] = undefined;
    }
  }
  function JQLiteExpandoStore(element, key, value) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
    if (isDefined(value)) {
      if (!expandoStore) {
        element[jqName] = expandoId = jqNextId();
        expandoStore = jqCache[expandoId] = {};
      }
      expandoStore[key] = value;
    } else {
      return expandoStore && expandoStore[key];
    }
  }
  function JQLiteData(element, key, value) {
    var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
    if (!data && !isSimpleGetter) {
      JQLiteExpandoStore(element, 'data', data = {});
    }
    if (isSetter) {
      data[key] = value;
    } else {
      if (keyDefined) {
        if (isSimpleGetter) {
          return data && data[key];
        } else {
          extend(data, key);
        }
      } else {
        return data;
      }
    }
  }
  function JQLiteHasClass(element, selector) {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
  }
  function JQLiteRemoveClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
      });
    }
  }
  function JQLiteAddClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        if (!JQLiteHasClass(element, cssClass)) {
          element.className = trim(element.className + ' ' + trim(cssClass));
        }
      });
    }
  }
  function JQLiteAddNodes(root, elements) {
    if (elements) {
      elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
      for (var i = 0; i < elements.length; i++) {
        root.push(elements[i]);
      }
    }
  }
  function JQLiteController(element, name) {
    return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }
  function JQLiteInheritedData(element, name, value) {
    element = jqLite(element);
    if (element[0].nodeType == 9) {
      element = element.find('html');
    }
    while (element.length) {
      if (value = element.data(name))
        return value;
      element = element.parent();
    }
  }
  var JQLitePrototype = JQLite.prototype = {
      ready: function (fn) {
        var fired = false;
        function trigger() {
          if (fired)
            return;
          fired = true;
          fn();
        }
        this.bind('DOMContentLoaded', trigger);
        JQLite(window).bind('load', trigger);
      },
      toString: function () {
        var value = [];
        forEach(this, function (e) {
          value.push('' + e);
        });
        return '[' + value.join(', ') + ']';
      },
      eq: function (index) {
        return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    };
  var BOOLEAN_ATTR = {};
  forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function (value) {
    BOOLEAN_ATTR[lowercase(value)] = value;
  });
  var BOOLEAN_ELEMENTS = {};
  forEach('input,select,option,textarea,button,form'.split(','), function (value) {
    BOOLEAN_ELEMENTS[uppercase(value)] = true;
  });
  function getBooleanAttrName(element, name) {
    var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
    return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
  }
  forEach({
    data: JQLiteData,
    inheritedData: JQLiteInheritedData,
    scope: function (element) {
      return JQLiteInheritedData(element, '$scope');
    },
    controller: JQLiteController,
    injector: function (element) {
      return JQLiteInheritedData(element, '$injector');
    },
    removeAttr: function (element, name) {
      element.removeAttribute(name);
    },
    hasClass: JQLiteHasClass,
    css: function (element, name, value) {
      name = camelCase(name);
      if (isDefined(value)) {
        element.style[name] = value;
      } else {
        var val;
        if (msie <= 8) {
          val = element.currentStyle && element.currentStyle[name];
          if (val === '')
            val = 'auto';
        }
        val = val || element.style[name];
        if (msie <= 8) {
          val = val === '' ? undefined : val;
        }
        return val;
      }
    },
    attr: function (element, name, value) {
      var lowercasedName = lowercase(name);
      if (BOOLEAN_ATTR[lowercasedName]) {
        if (isDefined(value)) {
          if (!!value) {
            element[name] = true;
            element.setAttribute(name, lowercasedName);
          } else {
            element[name] = false;
            element.removeAttribute(lowercasedName);
          }
        } else {
          return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
        }
      } else if (isDefined(value)) {
        element.setAttribute(name, value);
      } else if (element.getAttribute) {
        var ret = element.getAttribute(name, 2);
        return ret === null ? undefined : ret;
      }
    },
    prop: function (element, name, value) {
      if (isDefined(value)) {
        element[name] = value;
      } else {
        return element[name];
      }
    },
    text: extend(msie < 9 ? function (element, value) {
      if (element.nodeType == 1) {
        if (isUndefined(value))
          return element.innerText;
        element.innerText = value;
      } else {
        if (isUndefined(value))
          return element.nodeValue;
        element.nodeValue = value;
      }
    } : function (element, value) {
      if (isUndefined(value)) {
        return element.textContent;
      }
      element.textContent = value;
    }, { $dv: '' }),
    val: function (element, value) {
      if (isUndefined(value)) {
        if (nodeName_(element) === 'SELECT' && element.multiple) {
          var result = [];
          forEach(element.options, function (option) {
            if (option.selected) {
              result.push(option.value || option.text);
            }
          });
          return result.length === 0 ? null : result;
        }
        return element.value;
      }
      element.value = value;
    },
    html: function (element, value) {
      if (isUndefined(value)) {
        return element.innerHTML;
      }
      for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
        JQLiteDealoc(childNodes[i]);
      }
      element.innerHTML = value;
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var i, key;
      if ((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController) ? arg1 : arg2) === undefined) {
        if (isObject(arg1)) {
          for (i = 0; i < this.length; i++) {
            if (fn === JQLiteData) {
              fn(this[i], arg1);
            } else {
              for (key in arg1) {
                fn(this[i], key, arg1[key]);
              }
            }
          }
          return this;
        } else {
          if (this.length)
            return fn(this[0], arg1, arg2);
        }
      } else {
        for (i = 0; i < this.length; i++) {
          fn(this[i], arg1, arg2);
        }
        return this;
      }
      return fn.$dv;
    };
  });
  function createEventHandler(element, events) {
    var eventHandler = function (event, type) {
      if (!event.preventDefault) {
        event.preventDefault = function () {
          event.returnValue = false;
        };
      }
      if (!event.stopPropagation) {
        event.stopPropagation = function () {
          event.cancelBubble = true;
        };
      }
      if (!event.target) {
        event.target = event.srcElement || document;
      }
      if (isUndefined(event.defaultPrevented)) {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = true;
          prevent.call(event);
        };
        event.defaultPrevented = false;
      }
      event.isDefaultPrevented = function () {
        return event.defaultPrevented;
      };
      forEach(events[type || event.type], function (fn) {
        fn.call(element, event);
      });
      if (msie <= 8) {
        event.preventDefault = null;
        event.stopPropagation = null;
        event.isDefaultPrevented = null;
      } else {
        delete event.preventDefault;
        delete event.stopPropagation;
        delete event.isDefaultPrevented;
      }
    };
    eventHandler.elem = element;
    return eventHandler;
  }
  forEach({
    removeData: JQLiteRemoveData,
    dealoc: JQLiteDealoc,
    bind: function bindFn(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      if (!events)
        JQLiteExpandoStore(element, 'events', events = {});
      if (!handle)
        JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
      forEach(type.split(' '), function (type) {
        var eventFns = events[type];
        if (!eventFns) {
          if (type == 'mouseenter' || type == 'mouseleave') {
            var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
              } : function (a, b) {
                if (b) {
                  while (b = b.parentNode) {
                    if (b === a) {
                      return true;
                    }
                  }
                }
                return false;
              };
            events[type] = [];
            var eventmap = {
                mouseleave: 'mouseout',
                mouseenter: 'mouseover'
              };
            bindFn(element, eventmap[type], function (event) {
              var ret, target = this, related = event.relatedTarget;
              if (!related || related !== target && !contains(target, related)) {
                handle(event, type);
              }
            });
          } else {
            addEventListenerFn(element, type, handle);
            events[type] = [];
          }
          eventFns = events[type];
        }
        eventFns.push(fn);
      });
    },
    unbind: JQLiteUnbind,
    replaceWith: function (element, replaceNode) {
      var index, parent = element.parentNode;
      JQLiteDealoc(element);
      forEach(new JQLite(replaceNode), function (node) {
        if (index) {
          parent.insertBefore(node, index.nextSibling);
        } else {
          parent.replaceChild(node, element);
        }
        index = node;
      });
    },
    children: function (element) {
      var children = [];
      forEach(element.childNodes, function (element) {
        if (element.nodeType === 1)
          children.push(element);
      });
      return children;
    },
    contents: function (element) {
      return element.childNodes || [];
    },
    append: function (element, node) {
      forEach(new JQLite(node), function (child) {
        if (element.nodeType === 1)
          element.appendChild(child);
      });
    },
    prepend: function (element, node) {
      if (element.nodeType === 1) {
        var index = element.firstChild;
        forEach(new JQLite(node), function (child) {
          element.insertBefore(child, index);
        });
      }
    },
    wrap: function (element, wrapNode) {
      wrapNode = jqLite(wrapNode)[0];
      var parent = element.parentNode;
      if (parent) {
        parent.replaceChild(wrapNode, element);
      }
      wrapNode.appendChild(element);
    },
    remove: function (element) {
      JQLiteDealoc(element);
      var parent = element.parentNode;
      if (parent)
        parent.removeChild(element);
    },
    after: function (element, newElement) {
      var index = element, parent = element.parentNode;
      forEach(new JQLite(newElement), function (node) {
        parent.insertBefore(node, index.nextSibling);
        index = node;
      });
    },
    addClass: JQLiteAddClass,
    removeClass: JQLiteRemoveClass,
    toggleClass: function (element, selector, condition) {
      if (isUndefined(condition)) {
        condition = !JQLiteHasClass(element, selector);
      }
      (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
    },
    parent: function (element) {
      var parent = element.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    next: function (element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      var elm = element.nextSibling;
      while (elm != null && elm.nodeType !== 1) {
        elm = elm.nextSibling;
      }
      return elm;
    },
    find: function (element, selector) {
      return element.getElementsByTagName(selector);
    },
    clone: JQLiteClone,
    triggerHandler: function (element, eventName) {
      var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
      forEach(eventFns, function (fn) {
        fn.call(element, null);
      });
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var value;
      for (var i = 0; i < this.length; i++) {
        if (value == undefined) {
          value = fn(this[i], arg1, arg2);
          if (value !== undefined) {
            value = jqLite(value);
          }
        } else {
          JQLiteAddNodes(value, fn(this[i], arg1, arg2));
        }
      }
      return value == undefined ? this : value;
    };
  });
  function hashKey(obj) {
    var objType = typeof obj, key;
    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }
    return objType + ':' + key;
  }
  function HashMap(array) {
    forEach(array, this.put, this);
  }
  HashMap.prototype = {
    put: function (key, value) {
      this[hashKey(key)] = value;
    },
    get: function (key) {
      return this[hashKey(key)];
    },
    remove: function (key) {
      var value = this[key = hashKey(key)];
      delete this[key];
      return value;
    }
  };
  function HashQueueMap() {
  }
  HashQueueMap.prototype = {
    push: function (key, value) {
      var array = this[key = hashKey(key)];
      if (!array) {
        this[key] = [value];
      } else {
        array.push(value);
      }
    },
    shift: function (key) {
      var array = this[key = hashKey(key)];
      if (array) {
        if (array.length == 1) {
          delete this[key];
          return array[0];
        } else {
          return array.shift();
        }
      }
    },
    peek: function (key) {
      var array = this[hashKey(key)];
      if (array) {
        return array[0];
      }
    }
  };
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  function annotate(fn) {
    var $inject, fnText, argDecl, last;
    if (typeof fn == 'function') {
      if (!($inject = fn.$inject)) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
          arg.replace(FN_ARG, function (all, underscore, name) {
            $inject.push(name);
          });
        });
        fn.$inject = $inject;
      }
    } else if (isArray(fn)) {
      last = fn.length - 1;
      assertArgFn(fn[last], 'fn');
      $inject = fn.slice(0, last);
    } else {
      assertArgFn(fn, 'fn', true);
    }
    return $inject;
  }
  function createInjector(modulesToLoad) {
    var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap(), providerCache = {
        $provide: {
          provider: supportObject(provider),
          factory: supportObject(factory),
          service: supportObject(service),
          value: supportObject(value),
          constant: supportObject(constant),
          decorator: decorator
        }
      }, providerInjector = createInternalInjector(providerCache, function () {
        throw Error('Unknown provider: ' + path.join(' <- '));
      }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
        var provider = providerInjector.get(servicename + providerSuffix);
        return instanceInjector.invoke(provider.$get, provider);
      });
    forEach(loadModules(modulesToLoad), function (fn) {
      instanceInjector.invoke(fn || noop);
    });
    return instanceInjector;
    function supportObject(delegate) {
      return function (key, value) {
        if (isObject(key)) {
          forEach(key, reverseParams(delegate));
        } else {
          return delegate(key, value);
        }
      };
    }
    function provider(name, provider_) {
      if (isFunction(provider_) || isArray(provider_)) {
        provider_ = providerInjector.instantiate(provider_);
      }
      if (!provider_.$get) {
        throw Error('Provider ' + name + ' must define $get factory method.');
      }
      return providerCache[name + providerSuffix] = provider_;
    }
    function factory(name, factoryFn) {
      return provider(name, { $get: factoryFn });
    }
    function service(name, constructor) {
      return factory(name, [
        '$injector',
        function ($injector) {
          return $injector.instantiate(constructor);
        }
      ]);
    }
    function value(name, value) {
      return factory(name, valueFn(value));
    }
    function constant(name, value) {
      providerCache[name] = value;
      instanceCache[name] = value;
    }
    function decorator(serviceName, decorFn) {
      var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
      origProvider.$get = function () {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
      };
    }
    function loadModules(modulesToLoad) {
      var runBlocks = [];
      forEach(modulesToLoad, function (module) {
        if (loadedModules.get(module))
          return;
        loadedModules.put(module, true);
        if (isString(module)) {
          var moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
          try {
            for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
              var invokeArgs = invokeQueue[i], provider = invokeArgs[0] == '$injector' ? providerInjector : providerInjector.get(invokeArgs[0]);
              provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isFunction(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isArray(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + String(module[module.length - 1]);
            throw e;
          }
        } else {
          assertArgFn(module, 'module');
        }
      });
      return runBlocks;
    }
    function createInternalInjector(cache, factory) {
      function getService(serviceName) {
        if (typeof serviceName !== 'string') {
          throw Error('Service name expected');
        }
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING) {
            throw Error('Circular dependency: ' + path.join(' <- '));
          }
          return cache[serviceName];
        } else {
          try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            return cache[serviceName] = factory(serviceName);
          } finally {
            path.shift();
          }
        }
      }
      function invoke(fn, self, locals) {
        var args = [], $inject = annotate(fn), length, i, key;
        for (i = 0, length = $inject.length; i < length; i++) {
          key = $inject[i];
          args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
        }
        if (!fn.$inject) {
          fn = fn[length];
        }
        switch (self ? -1 : args.length) {
        case 0:
          return fn();
        case 1:
          return fn(args[0]);
        case 2:
          return fn(args[0], args[1]);
        case 3:
          return fn(args[0], args[1], args[2]);
        case 4:
          return fn(args[0], args[1], args[2], args[3]);
        case 5:
          return fn(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case 8:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case 9:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        default:
          return fn.apply(self, args);
        }
      }
      function instantiate(Type, locals) {
        var Constructor = function () {
          }, instance, returnedValue;
        Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
        instance = new Constructor();
        returnedValue = invoke(Type, instance, locals);
        return isObject(returnedValue) ? returnedValue : instance;
      }
      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: annotate
      };
    }
  }
  function $AnchorScrollProvider() {
    var autoScrollingEnabled = true;
    this.disableAutoScrolling = function () {
      autoScrollingEnabled = false;
    };
    this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function ($window, $location, $rootScope) {
        var document = $window.document;
        function getFirstAnchor(list) {
          var result = null;
          forEach(list, function (element) {
            if (!result && lowercase(element.nodeName) === 'a')
              result = element;
          });
          return result;
        }
        function scroll() {
          var hash = $location.hash(), elm;
          if (!hash)
            $window.scrollTo(0, 0);
          else if (elm = document.getElementById(hash))
            elm.scrollIntoView();
          else if (elm = getFirstAnchor(document.getElementsByName(hash)))
            elm.scrollIntoView();
          else if (hash === 'top')
            $window.scrollTo(0, 0);
        }
        if (autoScrollingEnabled) {
          $rootScope.$watch(function autoScrollWatch() {
            return $location.hash();
          }, function autoScrollWatchAction() {
            $rootScope.$evalAsync(scroll);
          });
        }
        return scroll;
      }
    ];
  }
  function Browser(window, document, $log, $sniffer) {
    var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
    self.isMock = false;
    var outstandingRequestCount = 0;
    var outstandingRequestCallbacks = [];
    self.$$completeOutstandingRequest = completeOutstandingRequest;
    self.$$incOutstandingRequestCount = function () {
      outstandingRequestCount++;
    };
    function completeOutstandingRequest(fn) {
      try {
        fn.apply(null, sliceArgs(arguments, 1));
      } finally {
        outstandingRequestCount--;
        if (outstandingRequestCount === 0) {
          while (outstandingRequestCallbacks.length) {
            try {
              outstandingRequestCallbacks.pop()();
            } catch (e) {
              $log.error(e);
            }
          }
        }
      }
    }
    self.notifyWhenNoOutstandingRequests = function (callback) {
      forEach(pollFns, function (pollFn) {
        pollFn();
      });
      if (outstandingRequestCount === 0) {
        callback();
      } else {
        outstandingRequestCallbacks.push(callback);
      }
    };
    var pollFns = [], pollTimeout;
    self.addPollFn = function (fn) {
      if (isUndefined(pollTimeout))
        startPoller(100, setTimeout);
      pollFns.push(fn);
      return fn;
    };
    function startPoller(interval, setTimeout) {
      (function check() {
        forEach(pollFns, function (pollFn) {
          pollFn();
        });
        pollTimeout = setTimeout(check, interval);
      }());
    }
    var lastBrowserUrl = location.href, baseElement = document.find('base'), replacedUrl = null;
    self.url = function (url, replace) {
      if (url) {
        if (lastBrowserUrl == url)
          return;
        lastBrowserUrl = url;
        if ($sniffer.history) {
          if (replace)
            history.replaceState(null, '', url);
          else {
            history.pushState(null, '', url);
            baseElement.attr('href', baseElement.attr('href'));
          }
        } else {
          if (replace) {
            location.replace(url);
            replacedUrl = url;
          } else {
            location.href = url;
            replacedUrl = null;
          }
        }
        return self;
      } else {
        return replacedUrl || location.href.replace(/%27/g, '\'');
      }
    };
    var urlChangeListeners = [], urlChangeInit = false;
    function fireUrlChange() {
      if (lastBrowserUrl == self.url())
        return;
      lastBrowserUrl = self.url();
      forEach(urlChangeListeners, function (listener) {
        listener(self.url());
      });
    }
    self.onUrlChange = function (callback) {
      if (!urlChangeInit) {
        if ($sniffer.history)
          jqLite(window).bind('popstate', fireUrlChange);
        if ($sniffer.hashchange)
          jqLite(window).bind('hashchange', fireUrlChange);
        else
          self.addPollFn(fireUrlChange);
        urlChangeInit = true;
      }
      urlChangeListeners.push(callback);
      return callback;
    };
    self.baseHref = function () {
      var href = baseElement.attr('href');
      return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var lastCookies = {};
    var lastCookieString = '';
    var cookiePath = self.baseHref();
    self.cookies = function (name, value) {
      var cookieLength, cookieArray, cookie, i, index;
      if (name) {
        if (value === undefined) {
          rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        } else {
          if (isString(value)) {
            cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
            if (cookieLength > 4096) {
              $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
            }
          }
        }
      } else {
        if (rawDocument.cookie !== lastCookieString) {
          lastCookieString = rawDocument.cookie;
          cookieArray = lastCookieString.split('; ');
          lastCookies = {};
          for (i = 0; i < cookieArray.length; i++) {
            cookie = cookieArray[i];
            index = cookie.indexOf('=');
            if (index > 0) {
              var name = unescape(cookie.substring(0, index));
              if (lastCookies[name] === undefined) {
                lastCookies[name] = unescape(cookie.substring(index + 1));
              }
            }
          }
        }
        return lastCookies;
      }
    };
    self.defer = function (fn, delay) {
      var timeoutId;
      outstandingRequestCount++;
      timeoutId = setTimeout(function () {
        delete pendingDeferIds[timeoutId];
        completeOutstandingRequest(fn);
      }, delay || 0);
      pendingDeferIds[timeoutId] = true;
      return timeoutId;
    };
    self.defer.cancel = function (deferId) {
      if (pendingDeferIds[deferId]) {
        delete pendingDeferIds[deferId];
        clearTimeout(deferId);
        completeOutstandingRequest(noop);
        return true;
      }
      return false;
    };
  }
  function $BrowserProvider() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function ($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }
    ];
  }
  function $CacheFactoryProvider() {
    this.$get = function () {
      var caches = {};
      function cacheFactory(cacheId, options) {
        if (cacheId in caches) {
          throw Error('cacheId ' + cacheId + ' taken');
        }
        var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
        return caches[cacheId] = {
          put: function (key, value) {
            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
            refresh(lruEntry);
            if (isUndefined(value))
              return;
            if (!(key in data))
              size++;
            data[key] = value;
            if (size > capacity) {
              this.remove(staleEnd.key);
            }
          },
          get: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            refresh(lruEntry);
            return data[key];
          },
          remove: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            if (lruEntry == freshEnd)
              freshEnd = lruEntry.p;
            if (lruEntry == staleEnd)
              staleEnd = lruEntry.n;
            link(lruEntry.n, lruEntry.p);
            delete lruHash[key];
            delete data[key];
            size--;
          },
          removeAll: function () {
            data = {};
            size = 0;
            lruHash = {};
            freshEnd = staleEnd = null;
          },
          destroy: function () {
            data = null;
            stats = null;
            lruHash = null;
            delete caches[cacheId];
          },
          info: function () {
            return extend({}, stats, { size: size });
          }
        };
        function refresh(entry) {
          if (entry != freshEnd) {
            if (!staleEnd) {
              staleEnd = entry;
            } else if (staleEnd == entry) {
              staleEnd = entry.n;
            }
            link(entry.n, entry.p);
            link(entry, freshEnd);
            freshEnd = entry;
            freshEnd.n = null;
          }
        }
        function link(nextEntry, prevEntry) {
          if (nextEntry != prevEntry) {
            if (nextEntry)
              nextEntry.p = prevEntry;
            if (prevEntry)
              prevEntry.n = nextEntry;
          }
        }
      }
      cacheFactory.info = function () {
        var info = {};
        forEach(caches, function (cache, cacheId) {
          info[cacheId] = cache.info();
        });
        return info;
      };
      cacheFactory.get = function (cacheId) {
        return caches[cacheId];
      };
      return cacheFactory;
    };
  }
  function $TemplateCacheProvider() {
    this.$get = [
      '$cacheFactory',
      function ($cacheFactory) {
        return $cacheFactory('templates');
      }
    ];
  }
  var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
  $CompileProvider.$inject = ['$provide'];
  function $CompileProvider($provide) {
    var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
    this.directive = function registerDirective(name, directiveFactory) {
      if (isString(name)) {
        assertArg(directiveFactory, 'directive');
        if (!hasDirectives.hasOwnProperty(name)) {
          hasDirectives[name] = [];
          $provide.factory(name + Suffix, [
            '$injector',
            '$exceptionHandler',
            function ($injector, $exceptionHandler) {
              var directives = [];
              forEach(hasDirectives[name], function (directiveFactory) {
                try {
                  var directive = $injector.invoke(directiveFactory);
                  if (isFunction(directive)) {
                    directive = { compile: valueFn(directive) };
                  } else if (!directive.compile && directive.link) {
                    directive.compile = valueFn(directive.link);
                  }
                  directive.priority = directive.priority || 0;
                  directive.name = directive.name || name;
                  directive.require = directive.require || directive.controller && directive.name;
                  directive.restrict = directive.restrict || 'A';
                  directives.push(directive);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
              return directives;
            }
          ]);
        }
        hasDirectives[name].push(directiveFactory);
      } else {
        forEach(name, reverseParams(registerDirective));
      }
      return this;
    };
    this.urlSanitizationWhitelist = function (regexp) {
      if (isDefined(regexp)) {
        urlSanitizationWhitelist = regexp;
        return this;
      }
      return urlSanitizationWhitelist;
    };
    this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
        var Attributes = function (element, attr) {
          this.$$element = element;
          this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function (key, value, writeAttr, attrName) {
            var booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers, normalizedVal;
            if (booleanKey) {
              this.$$element.prop(key, value);
              attrName = booleanKey;
            }
            this[key] = value;
            if (attrName) {
              this.$attr[key] = attrName;
            } else {
              attrName = this.$attr[key];
              if (!attrName) {
                this.$attr[key] = attrName = snake_case(key, '-');
              }
            }
            if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
              urlSanitizationNode.setAttribute('href', value);
              normalizedVal = urlSanitizationNode.href;
              if (normalizedVal !== '' && !normalizedVal.match(urlSanitizationWhitelist)) {
                this[key] = value = 'unsafe:' + normalizedVal;
              }
            }
            if (writeAttr !== false) {
              if (value === null || value === undefined) {
                this.$$element.removeAttr(attrName);
              } else {
                this.$$element.attr(attrName, value);
              }
            }
            $$observers && forEach($$observers[key], function (fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function (key, fn) {
            var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
            listeners.push(fn);
            $rootScope.$evalAsync(function () {
              if (!listeners.$$inter) {
                fn(attrs[key]);
              }
            });
            return fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
          };
        return compile;
        function compile($compileNodes, transcludeFn, maxPriority) {
          if (!($compileNodes instanceof jqLite)) {
            $compileNodes = jqLite($compileNodes);
          }
          forEach($compileNodes, function (node, index) {
            if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
              $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
            }
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function publicLinkFn(scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
            for (var i = 0, ii = $linkNode.length; i < ii; i++) {
              var node = $linkNode[i];
              if (node.nodeType == 1 || node.nodeType == 9) {
                $linkNode.eq(i).data('$scope', scope);
              }
            }
            safeAddClass($linkNode, 'ng-scope');
            if (cloneConnectFn)
              cloneConnectFn($linkNode, scope);
            if (compositeLinkFn)
              compositeLinkFn(scope, $linkNode, $linkNode);
            return $linkNode;
          };
        }
        function wrongMode(localName, mode) {
          throw Error('Unsupported \'' + mode + '\' for \'' + localName + '\'.');
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {
          }
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          var linkFns = [], nodeLinkFn, childLinkFn, directives, attrs, linkFnFound;
          for (var i = 0; i < nodeList.length; i++) {
            attrs = new Attributes();
            directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
            nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
            childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
            linkFns.push(nodeLinkFn);
            linkFns.push(childLinkFn);
            linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
          }
          return linkFnFound ? compositeLinkFn : null;
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n;
            var stableNodeList = [];
            for (i = 0, ii = nodeList.length; i < ii; i++) {
              stableNodeList.push(nodeList[i]);
            }
            for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
              node = stableNodeList[n];
              nodeLinkFn = linkFns[i++];
              childLinkFn = linkFns[i++];
              if (nodeLinkFn) {
                if (nodeLinkFn.scope) {
                  childScope = scope.$new(isObject(nodeLinkFn.scope));
                  jqLite(node).data('$scope', childScope);
                } else {
                  childScope = scope;
                }
                childTranscludeFn = nodeLinkFn.transclude;
                if (childTranscludeFn || !boundTranscludeFn && transcludeFn) {
                  nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                    return function (cloneFn) {
                      var transcludeScope = scope.$new();
                      transcludeScope.$$transcluded = true;
                      return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                    };
                  }(childTranscludeFn || transcludeFn));
                } else {
                  nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                }
              } else if (childLinkFn) {
                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
              }
            }
          }
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
          switch (nodeType) {
          case 1:
            addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
            for (var attr, name, nName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
              attr = nAttrs[j];
              if (!msie || msie >= 8 || attr.specified) {
                name = attr.name;
                nName = directiveNormalize(name.toLowerCase());
                attrsMap[nName] = name;
                attrs[nName] = value = trim(msie && name == 'href' ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                if (getBooleanAttrName(node, nName)) {
                  attrs[nName] = true;
                }
                addAttrInterpolateDirective(node, directives, value, nName);
                addDirective(directives, nName, 'A', maxPriority);
              }
            }
            className = node.className;
            if (isString(className) && className !== '') {
              while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                nName = directiveNormalize(match[2]);
                if (addDirective(directives, nName, 'C', maxPriority)) {
                  attrs[nName] = trim(match[3]);
                }
                className = className.substr(match.index + match[0].length);
              }
            }
            break;
          case 3:
            addTextInterpolateDirective(directives, node.nodeValue);
            break;
          case 8:
            try {
              match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
              if (match) {
                nName = directiveNormalize(match[1]);
                if (addDirective(directives, nName, 'M', maxPriority)) {
                  attrs[nName] = trim(match[2]);
                }
              }
            } catch (e) {
            }
            break;
          }
          directives.sort(byPriority);
          return directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
          var terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, transcludeDirective, childTranscludeFn = transcludeFn, controllerDirectives, linkFn, directiveValue;
          for (var i = 0, ii = directives.length; i < ii; i++) {
            directive = directives[i];
            $template = undefined;
            if (terminalPriority > directive.priority) {
              break;
            }
            if (directiveValue = directive.scope) {
              assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
              if (isObject(directiveValue)) {
                safeAddClass($compileNode, 'ng-isolate-scope');
                newIsolateScopeDirective = directive;
              }
              safeAddClass($compileNode, 'ng-scope');
              newScopeDirective = newScopeDirective || directive;
            }
            directiveName = directive.name;
            if (directiveValue = directive.controller) {
              controllerDirectives = controllerDirectives || {};
              assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
              controllerDirectives[directiveName] = directive;
            }
            if (directiveValue = directive.transclude) {
              assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
              transcludeDirective = directive;
              terminalPriority = directive.priority;
              if (directiveValue == 'element') {
                $template = jqLite(compileNode);
                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                compileNode = $compileNode[0];
                replaceWith(jqCollection, jqLite($template[0]), compileNode);
                childTranscludeFn = compile($template, transcludeFn, terminalPriority);
              } else {
                $template = jqLite(JQLiteClone(compileNode)).contents();
                $compileNode.html('');
                childTranscludeFn = compile($template, transcludeFn);
              }
            }
            if (directiveValue = directive.template) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              directiveValue = denormalizeTemplate(directiveValue);
              if (directive.replace) {
                $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                }
                replaceWith(jqCollection, $compileNode, compileNode);
                var newTemplateAttrs = { $attr: {} };
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                ii = directives.length;
              } else {
                $compileNode.html(directiveValue);
              }
            }
            if (directive.templateUrl) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn);
              ii = directives.length;
            } else if (directive.compile) {
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                if (isFunction(linkFn)) {
                  addLinkFns(null, linkFn);
                } else if (linkFn) {
                  addLinkFns(linkFn.pre, linkFn.post);
                }
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            }
            if (directive.terminal) {
              nodeLinkFn.terminal = true;
              terminalPriority = Math.max(terminalPriority, directive.priority);
            }
          }
          nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
          nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
          return nodeLinkFn;
          function addLinkFns(pre, post) {
            if (pre) {
              pre.require = directive.require;
              preLinkFns.push(pre);
            }
            if (post) {
              post.require = directive.require;
              postLinkFns.push(post);
            }
          }
          function getControllers(require, $element) {
            var value, retrievalMethod = 'data', optional = false;
            if (isString(require)) {
              while ((value = require.charAt(0)) == '^' || value == '?') {
                require = require.substr(1);
                if (value == '^') {
                  retrievalMethod = 'inheritedData';
                }
                optional = optional || value == '?';
              }
              value = $element[retrievalMethod]('$' + require + 'Controller');
              if (!value && !optional) {
                throw Error('No controller: ' + require);
              }
              return value;
            } else if (isArray(require)) {
              value = [];
              forEach(require, function (require) {
                value.push(getControllers(require, $element));
              });
            }
            return value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs, $element, i, ii, linkFn, controller;
            if (compileNode === linkNode) {
              attrs = templateAttrs;
            } else {
              attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
            }
            $element = attrs.$$element;
            if (newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/;
              var parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                var match = definiton.match(LOCAL_REGEXP) || [], attrName = match[2] || scopeName, mode = match[1], lastValue, parentGet, parentSet;
                scope.$$isolateBindings[scopeName] = mode + attrName;
                switch (mode) {
                case '@': {
                    attrs.$observe(attrName, function (value) {
                      scope[scopeName] = value;
                    });
                    attrs.$$observers[attrName].$$scope = parentScope;
                    break;
                  }
                case '=': {
                    parentGet = $parse(attrs[attrName]);
                    parentSet = parentGet.assign || function () {
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                    };
                    lastValue = scope[scopeName] = parentGet(parentScope);
                    scope.$watch(function parentValueWatch() {
                      var parentValue = parentGet(parentScope);
                      if (parentValue !== scope[scopeName]) {
                        if (parentValue !== lastValue) {
                          lastValue = scope[scopeName] = parentValue;
                        } else {
                          parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                        }
                      }
                      return parentValue;
                    });
                    break;
                  }
                case '&': {
                    parentGet = $parse(attrs[attrName]);
                    scope[scopeName] = function (locals) {
                      return parentGet(parentScope, locals);
                    };
                    break;
                  }
                default: {
                    throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                  }
                }
              });
            }
            if (controllerDirectives) {
              forEach(controllerDirectives, function (directive) {
                var locals = {
                    $scope: scope,
                    $element: $element,
                    $attrs: attrs,
                    $transclude: boundTranscludeFn
                  };
                controller = directive.controller;
                if (controller == '@') {
                  controller = attrs[directive.name];
                }
                $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              });
            }
            for (i = 0, ii = preLinkFns.length; i < ii; i++) {
              try {
                linkFn = preLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
            childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
            for (i = 0, ii = postLinkFns.length; i < ii; i++) {
              try {
                linkFn = postLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
          }
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = false;
          if (hasDirectives.hasOwnProperty(name)) {
            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
              try {
                directive = directives[i];
                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                  tDirectives.push(directive);
                  match = true;
                }
              } catch (e) {
                $exceptionHandler(e);
              }
            }
          }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
          forEach(dst, function (value, key) {
            if (key.charAt(0) != '$') {
              if (src[key]) {
                value += (key === 'style' ? ';' : ' ') + src[key];
              }
              dst.$set(key, value, true, srcAttr[key]);
            }
          });
          forEach(src, function (value, key) {
            if (key == 'class') {
              safeAddClass($element, value);
              dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
            } else if (key == 'style') {
              $element.attr('style', $element.attr('style') + ';' + value);
            } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
              dst[key] = value;
              dstAttr[key] = srcAttr[key];
            }
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            });
          $compileNode.html('');
          $http.get(origAsyncDirective.templateUrl, { cache: $templateCache }).success(function (content) {
            var compileNode, tempTemplateAttrs, $template;
            content = denormalizeTemplate(content);
            if (replace) {
              $template = jqLite('<div>' + trim(content) + '</div>').contents();
              compileNode = $template[0];
              if ($template.length != 1 || compileNode.nodeType !== 1) {
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              }
              tempTemplateAttrs = { $attr: {} };
              replaceWith($rootElement, $compileNode, compileNode);
              collectDirectives(compileNode, directives, tempTemplateAttrs);
              mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else {
              compileNode = beforeTemplateCompileNode;
              $compileNode.html(content);
            }
            directives.unshift(derivedSyncDirective);
            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
            afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
            while (linkQueue.length) {
              var controller = linkQueue.pop(), linkRootElement = linkQueue.pop(), beforeTemplateLinkNode = linkQueue.pop(), scope = linkQueue.pop(), linkNode = compileNode;
              if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                linkNode = JQLiteClone(compileNode);
                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
              }
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function (response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          });
          return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
            if (linkQueue) {
              linkQueue.push(scope);
              linkQueue.push(node);
              linkQueue.push(rootElement);
              linkQueue.push(controller);
            } else {
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
              }, scope, node, rootElement, controller);
            }
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective) {
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
          }
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, true);
          if (interpolateFn) {
            directives.push({
              priority: 0,
              compile: valueFn(function textInterpolateLinkFn(scope, node) {
                var parent = node.parent(), bindings = parent.data('$binding') || [];
                bindings.push(interpolateFn);
                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  node[0].nodeValue = value;
                });
              })
            });
          }
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, true);
          if (!interpolateFn)
            return;
          directives.push({
            priority: 100,
            compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
              var $$observers = attr.$$observers || (attr.$$observers = {});
              if (name === 'class') {
                interpolateFn = $interpolate(attr[name], true);
              }
              attr[name] = undefined;
              ($$observers[name] || ($$observers[name] = [])).$$inter = true;
              (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var oldNode = $element[0], parent = oldNode.parentNode, i, ii;
          if ($rootElement) {
            for (i = 0, ii = $rootElement.length; i < ii; i++) {
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
            }
          }
          if (parent) {
            parent.replaceChild(newNode, oldNode);
          }
          newNode[jqLite.expando] = oldNode[jqLite.expando];
          $element[0] = newNode;
        }
      }
    ];
  }
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
  }
  function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
  }
  function $ControllerProvider() {
    var controllers = {};
    this.register = function (name, constructor) {
      if (isObject(name)) {
        extend(controllers, name);
      } else {
        controllers[name] = constructor;
      }
    };
    this.$get = [
      '$injector',
      '$window',
      function ($injector, $window) {
        return function (constructor, locals) {
          if (isString(constructor)) {
            var name = constructor;
            constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, true) || getter($window, name, true);
            assertArgFn(constructor, name, true);
          }
          return $injector.instantiate(constructor, locals);
        };
      }
    ];
  }
  function $DocumentProvider() {
    this.$get = [
      '$window',
      function (window) {
        return jqLite(window.document);
      }
    ];
  }
  function $ExceptionHandlerProvider() {
    this.$get = [
      '$log',
      function ($log) {
        return function (exception, cause) {
          $log.error.apply($log, arguments);
        };
      }
    ];
  }
  function $InterpolateProvider() {
    var startSymbol = '{{';
    var endSymbol = '}}';
    this.startSymbol = function (value) {
      if (value) {
        startSymbol = value;
        return this;
      } else {
        return startSymbol;
      }
    };
    this.endSymbol = function (value) {
      if (value) {
        endSymbol = value;
        return this;
      } else {
        return endSymbol;
      }
    };
    this.$get = [
      '$parse',
      function ($parse) {
        var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
        function $interpolate(text, mustHaveExpression) {
          var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
          while (index < length) {
            if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
              index != startIndex && parts.push(text.substring(index, startIndex));
              parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
              fn.exp = exp;
              index = endIndex + endSymbolLength;
              hasInterpolation = true;
            } else {
              index != length && parts.push(text.substring(index));
              index = length;
            }
          }
          if (!(length = parts.length)) {
            parts.push('');
            length = 1;
          }
          if (!mustHaveExpression || hasInterpolation) {
            concat.length = length;
            fn = function (context) {
              for (var i = 0, ii = length, part; i < ii; i++) {
                if (typeof (part = parts[i]) == 'function') {
                  part = part(context);
                  if (part == null || part == undefined) {
                    part = '';
                  } else if (typeof part != 'string') {
                    part = toJson(part);
                  }
                }
                concat[i] = part;
              }
              return concat.join('');
            };
            fn.exp = text;
            fn.parts = parts;
            return fn;
          }
        }
        $interpolate.startSymbol = function () {
          return startSymbol;
        };
        $interpolate.endSymbol = function () {
          return endSymbol;
        };
        return $interpolate;
      }
    ];
  }
  var URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, HASH_MATCH = PATH_MATCH, DEFAULT_PORTS = {
      'http': 80,
      'https': 443,
      'ftp': 21
    };
  function encodePath(path) {
    var segments = path.split('/'), i = segments.length;
    while (i--) {
      segments[i] = encodeUriSegment(segments[i]);
    }
    return segments.join('/');
  }
  function stripHash(url) {
    return url.split('#')[0];
  }
  function matchUrl(url, obj) {
    var match = URL_MATCH.exec(url);
    match = {
      protocol: match[1],
      host: match[3],
      port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
      path: match[6] || '/',
      search: match[8],
      hash: match[10]
    };
    if (obj) {
      obj.$$protocol = match.protocol;
      obj.$$host = match.host;
      obj.$$port = match.port;
    }
    return match;
  }
  function composeProtocolHostPort(protocol, host, port) {
    return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
  }
  function pathPrefixFromBase(basePath) {
    return basePath.substr(0, basePath.lastIndexOf('/'));
  }
  function convertToHtml5Url(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || match.hash.indexOf(hashPrefix) !== 0) {
      return url;
    } else {
      return composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
    }
  }
  function convertToHashbangUrl(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) == basePath && !isUndefined(match.hash) && match.hash.indexOf(hashPrefix) === 0) {
      return url;
    } else {
      var search = match.search && '?' + match.search || '', hash = match.hash && '#' + match.hash || '', pathPrefix = pathPrefixFromBase(basePath), path = match.path.substr(pathPrefix.length);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
      }
      return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
    }
  }
  function LocationUrl(url, pathPrefix, appBaseUrl) {
    pathPrefix = pathPrefix || '';
    this.$$parse = function (newAbsoluteUrl) {
      var match = matchUrl(newAbsoluteUrl, this);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
      }
      this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length));
      this.$$search = parseKeyValue(match.search);
      this.$$hash = match.hash && decodeURIComponent(match.hash) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
    var basePath;
    this.$$parse = function (url) {
      var match = matchUrl(url, this);
      if (match.hash && match.hash.indexOf(hashPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
      }
      basePath = match.path + (match.search ? '?' + match.search : '');
      match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length));
      if (match[1]) {
        this.$$path = (match[1].charAt(0) == '/' ? '' : '/') + decodeURIComponent(match[1]);
      } else {
        this.$$path = '';
      }
      this.$$search = parseKeyValue(match[3]);
      this.$$hash = match[5] && decodeURIComponent(match[5]) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  LocationUrl.prototype = {
    $$replace: false,
    absUrl: locationGetter('$$absUrl'),
    url: function (url, replace) {
      if (isUndefined(url))
        return this.$$url;
      var match = PATH_MATCH.exec(url);
      if (match[1])
        this.path(decodeURIComponent(match[1]));
      if (match[2] || match[1])
        this.search(match[3] || '');
      this.hash(match[5] || '', replace);
      return this;
    },
    protocol: locationGetter('$$protocol'),
    host: locationGetter('$$host'),
    port: locationGetter('$$port'),
    path: locationGetterSetter('$$path', function (path) {
      return path.charAt(0) == '/' ? path : '/' + path;
    }),
    search: function (search, paramValue) {
      if (isUndefined(search))
        return this.$$search;
      if (isDefined(paramValue)) {
        if (paramValue === null) {
          delete this.$$search[search];
        } else {
          this.$$search[search] = paramValue;
        }
      } else {
        this.$$search = isString(search) ? parseKeyValue(search) : search;
      }
      this.$$compose();
      return this;
    },
    hash: locationGetterSetter('$$hash', identity),
    replace: function () {
      this.$$replace = true;
      return this;
    }
  };
  LocationHashbangUrl.prototype = inherit(LocationUrl.prototype);
  function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
    LocationHashbangUrl.apply(this, arguments);
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length);
      }
    };
  }
  LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
  function locationGetter(property) {
    return function () {
      return this[property];
    };
  }
  function locationGetterSetter(property, preprocess) {
    return function (value) {
      if (isUndefined(value))
        return this[property];
      this[property] = preprocess(value);
      this.$$compose();
      return this;
    };
  }
  function $LocationProvider() {
    var hashPrefix = '', html5Mode = false;
    this.hashPrefix = function (prefix) {
      if (isDefined(prefix)) {
        hashPrefix = prefix;
        return this;
      } else {
        return hashPrefix;
      }
    };
    this.html5Mode = function (mode) {
      if (isDefined(mode)) {
        html5Mode = mode;
        return this;
      } else {
        return html5Mode;
      }
    };
    this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function ($rootScope, $browser, $sniffer, $rootElement) {
        var $location, basePath, pathPrefix, initUrl = $browser.url(), initUrlParts = matchUrl(initUrl), appBaseUrl;
        if (html5Mode) {
          basePath = $browser.baseHref() || '/';
          pathPrefix = pathPrefixFromBase(basePath);
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/';
          if ($sniffer.history) {
            $location = new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl);
          } else {
            $location = new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1));
          }
        } else {
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? '?' + initUrlParts.search : '') + '#' + hashPrefix + '/';
          $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl);
        }
        $rootElement.bind('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.which == 2)
            return;
          var elm = jqLite(event.target);
          while (lowercase(elm[0].nodeName) !== 'a') {
            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
              return;
          }
          var absHref = elm.prop('href'), rewrittenUrl = $location.$$rewriteAppUrl(absHref);
          if (absHref && !elm.attr('target') && rewrittenUrl) {
            $location.$$parse(rewrittenUrl);
            $rootScope.$apply();
            event.preventDefault();
            window.angular['ff-684208-preventDefault'] = true;
          }
        });
        if ($location.absUrl() != initUrl) {
          $browser.url($location.absUrl(), true);
        }
        $browser.onUrlChange(function (newUrl) {
          if ($location.absUrl() != newUrl) {
            if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented) {
              $browser.url($location.absUrl());
              return;
            }
            $rootScope.$evalAsync(function () {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl);
              afterLocationChange(oldUrl);
            });
            if (!$rootScope.$$phase)
              $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        $rootScope.$watch(function $locationWatch() {
          var oldUrl = $browser.url();
          var currentReplace = $location.$$replace;
          if (!changeCounter || oldUrl != $location.absUrl()) {
            changeCounter++;
            $rootScope.$evalAsync(function () {
              if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                $location.$$parse(oldUrl);
              } else {
                $browser.url($location.absUrl(), currentReplace);
                afterLocationChange(oldUrl);
              }
            });
          }
          $location.$$replace = false;
          return changeCounter;
        });
        return $location;
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
      }
    ];
  }
  function $LogProvider() {
    this.$get = [
      '$window',
      function ($window) {
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error')
        };
        function formatError(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        }
        function consoleLog(type) {
          var console = $window.console || {}, logFn = console[type] || console.log || noop;
          if (logFn.apply) {
            return function () {
              var args = [];
              forEach(arguments, function (arg) {
                args.push(formatError(arg));
              });
              return logFn.apply(console, args);
            };
          }
          return function (arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
      }
    ];
  }
  var OPERATORS = {
      'null': function () {
        return null;
      },
      'true': function () {
        return true;
      },
      'false': function () {
        return false;
      },
      undefined: noop,
      '+': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        if (isDefined(a)) {
          if (isDefined(b)) {
            return a + b;
          }
          return a;
        }
        return isDefined(b) ? b : undefined;
      },
      '-': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
      },
      '*': function (self, locals, a, b) {
        return a(self, locals) * b(self, locals);
      },
      '/': function (self, locals, a, b) {
        return a(self, locals) / b(self, locals);
      },
      '%': function (self, locals, a, b) {
        return a(self, locals) % b(self, locals);
      },
      '^': function (self, locals, a, b) {
        return a(self, locals) ^ b(self, locals);
      },
      '=': noop,
      '==': function (self, locals, a, b) {
        return a(self, locals) == b(self, locals);
      },
      '!=': function (self, locals, a, b) {
        return a(self, locals) != b(self, locals);
      },
      '<': function (self, locals, a, b) {
        return a(self, locals) < b(self, locals);
      },
      '>': function (self, locals, a, b) {
        return a(self, locals) > b(self, locals);
      },
      '<=': function (self, locals, a, b) {
        return a(self, locals) <= b(self, locals);
      },
      '>=': function (self, locals, a, b) {
        return a(self, locals) >= b(self, locals);
      },
      '&&': function (self, locals, a, b) {
        return a(self, locals) && b(self, locals);
      },
      '||': function (self, locals, a, b) {
        return a(self, locals) || b(self, locals);
      },
      '&': function (self, locals, a, b) {
        return a(self, locals) & b(self, locals);
      },
      '|': function (self, locals, a, b) {
        return b(self, locals)(self, locals, a(self, locals));
      },
      '!': function (self, locals, a) {
        return !a(self, locals);
      }
    };
  var ESCAPE = {
      'n': '\n',
      'f': '\f',
      'r': '\r',
      't': '\t',
      'v': '\x0B',
      '\'': '\'',
      '"': '"'
    };
  function lex(text, csp) {
    var tokens = [], token, index = 0, json = [], ch, lastCh = ':';
    while (index < text.length) {
      ch = text.charAt(index);
      if (is('"\'')) {
        readString(ch);
      } else if (isNumber(ch) || is('.') && isNumber(peek())) {
        readNumber();
      } else if (isIdent(ch)) {
        readIdent();
        if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
          token.json = token.text.indexOf('.') == -1;
        }
      } else if (is('(){}[].,;:')) {
        tokens.push({
          index: index,
          text: ch,
          json: was(':[,') && is('{[') || is('}]:,')
        });
        if (is('{['))
          json.unshift(ch);
        if (is('}]'))
          json.shift();
        index++;
      } else if (isWhitespace(ch)) {
        index++;
        continue;
      } else {
        var ch2 = ch + peek(), fn = OPERATORS[ch], fn2 = OPERATORS[ch2];
        if (fn2) {
          tokens.push({
            index: index,
            text: ch2,
            fn: fn2
          });
          index += 2;
        } else if (fn) {
          tokens.push({
            index: index,
            text: ch,
            fn: fn,
            json: was('[,:') && is('+-')
          });
          index += 1;
        } else {
          throwError('Unexpected next character ', index, index + 1);
        }
      }
      lastCh = ch;
    }
    return tokens;
    function is(chars) {
      return chars.indexOf(ch) != -1;
    }
    function was(chars) {
      return chars.indexOf(lastCh) != -1;
    }
    function peek() {
      return index + 1 < text.length ? text.charAt(index + 1) : false;
    }
    function isNumber(ch) {
      return '0' <= ch && ch <= '9';
    }
    function isWhitespace(ch) {
      return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\x0B' || ch == '\xa0';
    }
    function isIdent(ch) {
      return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
    }
    function isExpOperator(ch) {
      return ch == '-' || ch == '+' || isNumber(ch);
    }
    function throwError(error, start, end) {
      end = end || index;
      throw Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
    }
    function readNumber() {
      var number = '';
      var start = index;
      while (index < text.length) {
        var ch = lowercase(text.charAt(index));
        if (ch == '.' || isNumber(ch)) {
          number += ch;
        } else {
          var peekCh = peek();
          if (ch == 'e' && isExpOperator(peekCh)) {
            number += ch;
          } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
            number += ch;
          } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
            throwError('Invalid exponent');
          } else {
            break;
          }
        }
        index++;
      }
      number = 1 * number;
      tokens.push({
        index: start,
        text: number,
        json: true,
        fn: function () {
          return number;
        }
      });
    }
    function readIdent() {
      var ident = '', start = index, lastDot, peekIndex, methodName, ch;
      while (index < text.length) {
        ch = text.charAt(index);
        if (ch == '.' || isIdent(ch) || isNumber(ch)) {
          if (ch == '.')
            lastDot = index;
          ident += ch;
        } else {
          break;
        }
        index++;
      }
      if (lastDot) {
        peekIndex = index;
        while (peekIndex < text.length) {
          ch = text.charAt(peekIndex);
          if (ch == '(') {
            methodName = ident.substr(lastDot - start + 1);
            ident = ident.substr(0, lastDot - start);
            index = peekIndex;
            break;
          }
          if (isWhitespace(ch)) {
            peekIndex++;
          } else {
            break;
          }
        }
      }
      var token = {
          index: start,
          text: ident
        };
      if (OPERATORS.hasOwnProperty(ident)) {
        token.fn = token.json = OPERATORS[ident];
      } else {
        var getter = getterFn(ident, csp);
        token.fn = extend(function (self, locals) {
          return getter(self, locals);
        }, {
          assign: function (self, value) {
            return setter(self, ident, value);
          }
        });
      }
      tokens.push(token);
      if (methodName) {
        tokens.push({
          index: lastDot,
          text: '.',
          json: false
        });
        tokens.push({
          index: lastDot + 1,
          text: methodName,
          json: false
        });
      }
    }
    function readString(quote) {
      var start = index;
      index++;
      var string = '';
      var rawString = quote;
      var escape = false;
      while (index < text.length) {
        var ch = text.charAt(index);
        rawString += ch;
        if (escape) {
          if (ch == 'u') {
            var hex = text.substring(index + 1, index + 5);
            if (!hex.match(/[\da-f]{4}/i))
              throwError('Invalid unicode escape [\\u' + hex + ']');
            index += 4;
            string += String.fromCharCode(parseInt(hex, 16));
          } else {
            var rep = ESCAPE[ch];
            if (rep) {
              string += rep;
            } else {
              string += ch;
            }
          }
          escape = false;
        } else if (ch == '\\') {
          escape = true;
        } else if (ch == quote) {
          index++;
          tokens.push({
            index: start,
            text: rawString,
            string: string,
            json: true,
            fn: function () {
              return string;
            }
          });
          return;
        } else {
          string += ch;
        }
        index++;
      }
      throwError('Unterminated quote', start);
    }
  }
  function parser(text, json, $filter, csp) {
    var ZERO = valueFn(0), value, tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
    if (json) {
      assignment = logicalOR;
      functionCall = fieldAccess = objectIndex = filterChain = function () {
        throwError('is not valid json', {
          text: text,
          index: 0
        });
      };
      value = primary();
    } else {
      value = statements();
    }
    if (tokens.length !== 0) {
      throwError('is an unexpected token', tokens[0]);
    }
    return value;
    function throwError(msg, token) {
      throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
    }
    function peekToken() {
      if (tokens.length === 0)
        throw Error('Unexpected end of expression: ' + text);
      return tokens[0];
    }
    function peek(e1, e2, e3, e4) {
      if (tokens.length > 0) {
        var token = tokens[0];
        var t = token.text;
        if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4) {
          return token;
        }
      }
      return false;
    }
    function expect(e1, e2, e3, e4) {
      var token = peek(e1, e2, e3, e4);
      if (token) {
        if (json && !token.json) {
          throwError('is not valid json', token);
        }
        tokens.shift();
        return token;
      }
      return false;
    }
    function consume(e1) {
      if (!expect(e1)) {
        throwError('is unexpected, expecting [' + e1 + ']', peek());
      }
    }
    function unaryFn(fn, right) {
      return function (self, locals) {
        return fn(self, locals, right);
      };
    }
    function binaryFn(left, fn, right) {
      return function (self, locals) {
        return fn(self, locals, left, right);
      };
    }
    function statements() {
      var statements = [];
      while (true) {
        if (tokens.length > 0 && !peek('}', ')', ';', ']'))
          statements.push(filterChain());
        if (!expect(';')) {
          return statements.length == 1 ? statements[0] : function (self, locals) {
            var value;
            for (var i = 0; i < statements.length; i++) {
              var statement = statements[i];
              if (statement)
                value = statement(self, locals);
            }
            return value;
          };
        }
      }
    }
    function _filterChain() {
      var left = expression();
      var token;
      while (true) {
        if (token = expect('|')) {
          left = binaryFn(left, token.fn, filter());
        } else {
          return left;
        }
      }
    }
    function filter() {
      var token = expect();
      var fn = $filter(token.text);
      var argsFn = [];
      while (true) {
        if (token = expect(':')) {
          argsFn.push(expression());
        } else {
          var fnInvoke = function (self, locals, input) {
            var args = [input];
            for (var i = 0; i < argsFn.length; i++) {
              args.push(argsFn[i](self, locals));
            }
            return fn.apply(self, args);
          };
          return function () {
            return fnInvoke;
          };
        }
      }
    }
    function expression() {
      return assignment();
    }
    function _assignment() {
      var left = logicalOR();
      var right;
      var token;
      if (token = expect('=')) {
        if (!left.assign) {
          throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token);
        }
        right = logicalOR();
        return function (scope, locals) {
          return left.assign(scope, right(scope, locals), locals);
        };
      } else {
        return left;
      }
    }
    function logicalOR() {
      var left = logicalAND();
      var token;
      while (true) {
        if (token = expect('||')) {
          left = binaryFn(left, token.fn, logicalAND());
        } else {
          return left;
        }
      }
    }
    function logicalAND() {
      var left = equality();
      var token;
      if (token = expect('&&')) {
        left = binaryFn(left, token.fn, logicalAND());
      }
      return left;
    }
    function equality() {
      var left = relational();
      var token;
      if (token = expect('==', '!=')) {
        left = binaryFn(left, token.fn, equality());
      }
      return left;
    }
    function relational() {
      var left = additive();
      var token;
      if (token = expect('<', '>', '<=', '>=')) {
        left = binaryFn(left, token.fn, relational());
      }
      return left;
    }
    function additive() {
      var left = multiplicative();
      var token;
      while (token = expect('+', '-')) {
        left = binaryFn(left, token.fn, multiplicative());
      }
      return left;
    }
    function multiplicative() {
      var left = unary();
      var token;
      while (token = expect('*', '/', '%')) {
        left = binaryFn(left, token.fn, unary());
      }
      return left;
    }
    function unary() {
      var token;
      if (expect('+')) {
        return primary();
      } else if (token = expect('-')) {
        return binaryFn(ZERO, token.fn, unary());
      } else if (token = expect('!')) {
        return unaryFn(token.fn, unary());
      } else {
        return primary();
      }
    }
    function primary() {
      var primary;
      if (expect('(')) {
        primary = filterChain();
        consume(')');
      } else if (expect('[')) {
        primary = arrayDeclaration();
      } else if (expect('{')) {
        primary = object();
      } else {
        var token = expect();
        primary = token.fn;
        if (!primary) {
          throwError('not a primary expression', token);
        }
      }
      var next, context;
      while (next = expect('(', '[', '.')) {
        if (next.text === '(') {
          primary = functionCall(primary, context);
          context = null;
        } else if (next.text === '[') {
          context = primary;
          primary = objectIndex(primary);
        } else if (next.text === '.') {
          context = primary;
          primary = fieldAccess(primary);
        } else {
          throwError('IMPOSSIBLE');
        }
      }
      return primary;
    }
    function _fieldAccess(object) {
      var field = expect().text;
      var getter = getterFn(field, csp);
      return extend(function (scope, locals, self) {
        return getter(self || object(scope, locals), locals);
      }, {
        assign: function (scope, value, locals) {
          return setter(object(scope, locals), field, value);
        }
      });
    }
    function _objectIndex(obj) {
      var indexFn = expression();
      consume(']');
      return extend(function (self, locals) {
        var o = obj(self, locals), i = indexFn(self, locals), v, p;
        if (!o)
          return undefined;
        v = o[i];
        if (v && v.then) {
          p = v;
          if (!('$$v' in v)) {
            p.$$v = undefined;
            p.then(function (val) {
              p.$$v = val;
            });
          }
          v = v.$$v;
        }
        return v;
      }, {
        assign: function (self, value, locals) {
          return obj(self, locals)[indexFn(self, locals)] = value;
        }
      });
    }
    function _functionCall(fn, contextGetter) {
      var argsFn = [];
      if (peekToken().text != ')') {
        do {
          argsFn.push(expression());
        } while (expect(','));
      }
      consume(')');
      return function (scope, locals) {
        var args = [], context = contextGetter ? contextGetter(scope, locals) : scope;
        for (var i = 0; i < argsFn.length; i++) {
          args.push(argsFn[i](scope, locals));
        }
        var fnPtr = fn(scope, locals, context) || noop;
        return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
      };
    }
    function arrayDeclaration() {
      var elementFns = [];
      if (peekToken().text != ']') {
        do {
          elementFns.push(expression());
        } while (expect(','));
      }
      consume(']');
      return function (self, locals) {
        var array = [];
        for (var i = 0; i < elementFns.length; i++) {
          array.push(elementFns[i](self, locals));
        }
        return array;
      };
    }
    function object() {
      var keyValues = [];
      if (peekToken().text != '}') {
        do {
          var token = expect(), key = token.string || token.text;
          consume(':');
          var value = expression();
          keyValues.push({
            key: key,
            value: value
          });
        } while (expect(','));
      }
      consume('}');
      return function (self, locals) {
        var object = {};
        for (var i = 0; i < keyValues.length; i++) {
          var keyValue = keyValues[i];
          object[keyValue.key] = keyValue.value(self, locals);
        }
        return object;
      };
    }
  }
  function setter(obj, path, setValue) {
    var element = path.split('.');
    for (var i = 0; element.length > 1; i++) {
      var key = element.shift();
      var propertyObj = obj[key];
      if (!propertyObj) {
        propertyObj = {};
        obj[key] = propertyObj;
      }
      obj = propertyObj;
    }
    obj[element.shift()] = setValue;
    return setValue;
  }
  var getterFnCache = {};
  function cspSafeGetterFn(key0, key1, key2, key3, key4) {
    return function (scope, locals) {
      var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
      if (pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key0];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key1 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key1];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key2 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key2];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key3 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key3];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key4 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key4];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      return pathVal;
    };
  }
  function getterFn(path, csp) {
    if (getterFnCache.hasOwnProperty(path)) {
      return getterFnCache[path];
    }
    var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
    if (csp) {
      fn = pathKeysLength < 6 ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
          locals = undefined;
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    } else {
      var code = 'var l, fn, p;\n';
      forEach(pathKeys, function (key, index) {
        code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
      });
      code += 'return s;';
      fn = Function('s', 'k', code);
      fn.toString = function () {
        return code;
      };
    }
    return getterFnCache[path] = fn;
  }
  function $ParseProvider() {
    var cache = {};
    this.$get = [
      '$filter',
      '$sniffer',
      function ($filter, $sniffer) {
        return function (exp) {
          switch (typeof exp) {
          case 'string':
            return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
          case 'function':
            return exp;
          default:
            return noop;
          }
        };
      }
    ];
  }
  function $QProvider() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function ($rootScope, $exceptionHandler) {
        return qFactory(function (callback) {
          $rootScope.$evalAsync(callback);
        }, $exceptionHandler);
      }
    ];
  }
  function qFactory(nextTick, exceptionHandler) {
    var defer = function () {
      var pending = [], value, deferred;
      deferred = {
        resolve: function (val) {
          if (pending) {
            var callbacks = pending;
            pending = undefined;
            value = ref(val);
            if (callbacks.length) {
              nextTick(function () {
                var callback;
                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                  callback = callbacks[i];
                  value.then(callback[0], callback[1]);
                }
              });
            }
          }
        },
        reject: function (reason) {
          deferred.resolve(reject(reason));
        },
        promise: {
          then: function (callback, errback) {
            var result = defer();
            var wrappedCallback = function (value) {
              try {
                result.resolve((callback || defaultCallback)(value));
              } catch (e) {
                result.reject(e);
                exceptionHandler(e);
              }
            };
            var wrappedErrback = function (reason) {
              try {
                result.resolve((errback || defaultErrback)(reason));
              } catch (e) {
                result.reject(e);
                exceptionHandler(e);
              }
            };
            if (pending) {
              pending.push([
                wrappedCallback,
                wrappedErrback
              ]);
            } else {
              value.then(wrappedCallback, wrappedErrback);
            }
            return result.promise;
          }
        }
      };
      return deferred;
    };
    var ref = function (value) {
      if (value && value.then)
        return value;
      return {
        then: function (callback) {
          var result = defer();
          nextTick(function () {
            result.resolve(callback(value));
          });
          return result.promise;
        }
      };
    };
    var reject = function (reason) {
      return {
        then: function (callback, errback) {
          var result = defer();
          nextTick(function () {
            result.resolve((errback || defaultErrback)(reason));
          });
          return result.promise;
        }
      };
    };
    var when = function (value, callback, errback) {
      var result = defer(), done;
      var wrappedCallback = function (value) {
        try {
          return (callback || defaultCallback)(value);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      var wrappedErrback = function (reason) {
        try {
          return (errback || defaultErrback)(reason);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      nextTick(function () {
        ref(value).then(function (value) {
          if (done)
            return;
          done = true;
          result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
        }, function (reason) {
          if (done)
            return;
          done = true;
          result.resolve(wrappedErrback(reason));
        });
      });
      return result.promise;
    };
    function defaultCallback(value) {
      return value;
    }
    function defaultErrback(reason) {
      return reject(reason);
    }
    function all(promises) {
      var deferred = defer(), counter = promises.length, results = [];
      if (counter) {
        forEach(promises, function (promise, index) {
          ref(promise).then(function (value) {
            if (index in results)
              return;
            results[index] = value;
            if (!--counter)
              deferred.resolve(results);
          }, function (reason) {
            if (index in results)
              return;
            deferred.reject(reason);
          });
        });
      } else {
        deferred.resolve(results);
      }
      return deferred.promise;
    }
    return {
      defer: defer,
      reject: reject,
      when: when,
      all: all
    };
  }
  function $RouteProvider() {
    var routes = {};
    this.when = function (path, route) {
      routes[path] = extend({ reloadOnSearch: true }, route);
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = { redirectTo: path };
      }
      return this;
    };
    this.otherwise = function (params) {
      this.when(null, params);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        var forceReload = false, $route = {
            routes: routes,
            reload: function () {
              forceReload = true;
              $rootScope.$evalAsync(updateRoute);
            }
          };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, when) {
          when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
          var regex = '', params = [], dst = {};
          var re = /:(\w+)/g, paramMatch, lastMatchedIndex = 0;
          while ((paramMatch = re.exec(when)) !== null) {
            regex += when.slice(lastMatchedIndex, paramMatch.index);
            regex += '([^\\/]*)';
            params.push(paramMatch[1]);
            lastMatchedIndex = re.lastIndex;
          }
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex));
          if (match) {
            forEach(params, function (name, index) {
              dst[name] = match[index + 1];
            });
          }
          return match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          if (next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function () {
              if (next) {
                var keys = [], values = [], template;
                forEach(next.resolve || {}, function (value, key) {
                  keys.push(key);
                  values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
                });
                if (isDefined(template = next.template)) {
                } else if (isDefined(template = next.templateUrl)) {
                  template = $http.get(template, { cache: $templateCache }).then(function (response) {
                    return response.data;
                  });
                }
                if (isDefined(template)) {
                  keys.push('$template');
                  values.push(template);
                }
                return $q.all(values).then(function (values) {
                  var locals = {};
                  forEach(values, function (value, index) {
                    locals[keys[index]] = value;
                  });
                  return locals;
                });
              }
            }).then(function (locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function (error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params, match;
          forEach(routes, function (route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), path))) {
              match = inherit(route, {
                params: extend({}, $location.search(), params),
                pathParams: params
              });
              match.$$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          forEach((string || '').split(':'), function (segment, i) {
            if (i == 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }
    ];
  }
  function $RouteParamsProvider() {
    this.$get = valueFn({});
  }
  function $RootScopeProvider() {
    var TTL = 10;
    this.digestTtl = function (value) {
      if (arguments.length) {
        TTL = value;
      }
      return TTL;
    };
    this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function ($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = false;
          this.$$asyncQueue = [];
          this.$$listeners = {};
          this.$$isolateBindings = {};
        }
        Scope.prototype = {
          $new: function (isolate) {
            var Child, child;
            if (isFunction(isolate)) {
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            }
            if (isolate) {
              child = new Scope();
              child.$root = this.$root;
            } else {
              Child = function () {
              };
              Child.prototype = this;
              child = new Child();
              child.$id = nextUid();
            }
            child['this'] = child;
            child.$$listeners = {};
            child.$parent = this;
            child.$$asyncQueue = [];
            child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
            child.$$prevSibling = this.$$childTail;
            if (this.$$childHead) {
              this.$$childTail.$$nextSibling = child;
              this.$$childTail = child;
            } else {
              this.$$childHead = this.$$childTail = child;
            }
            return child;
          },
          $watch: function (watchExp, listener, objectEquality) {
            var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                fn: listener,
                last: initWatchVal,
                get: get,
                exp: watchExp,
                eq: !!objectEquality
              };
            if (!isFunction(listener)) {
              var listenFn = compileToFn(listener || noop, 'listener');
              watcher.fn = function (newVal, oldVal, scope) {
                listenFn(scope);
              };
            }
            if (!array) {
              array = scope.$$watchers = [];
            }
            array.unshift(watcher);
            return function () {
              arrayRemove(array, watcher);
            };
          },
          $digest: function () {
            var watch, value, last, watchers, asyncQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg;
            beginPhase('$digest');
            do {
              dirty = false;
              current = target;
              do {
                asyncQueue = current.$$asyncQueue;
                while (asyncQueue.length) {
                  try {
                    current.$eval(asyncQueue.shift());
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                if (watchers = current.$$watchers) {
                  length = watchers.length;
                  while (length--) {
                    try {
                      watch = watchers[length];
                      if (watch && (value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last))) {
                        dirty = true;
                        watch.last = watch.eq ? copy(value) : value;
                        watch.fn(value, last === initWatchVal ? value : last, current);
                        if (ttl < 5) {
                          logIdx = 4 - ttl;
                          if (!watchLog[logIdx])
                            watchLog[logIdx] = [];
                          logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                          logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                          watchLog[logIdx].push(logMsg);
                        }
                      }
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while (current = next);
              if (dirty && !ttl--) {
                clearPhase();
                throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
              }
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function () {
            if ($rootScope == this || this.$$destroyed)
              return;
            var parent = this.$parent;
            this.$broadcast('$destroy');
            this.$$destroyed = true;
            if (parent.$$childHead == this)
              parent.$$childHead = this.$$nextSibling;
            if (parent.$$childTail == this)
              parent.$$childTail = this.$$prevSibling;
            if (this.$$prevSibling)
              this.$$prevSibling.$$nextSibling = this.$$nextSibling;
            if (this.$$nextSibling)
              this.$$nextSibling.$$prevSibling = this.$$prevSibling;
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          },
          $eval: function (expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function (expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function (expr) {
            try {
              beginPhase('$apply');
              return this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
              } catch (e) {
                $exceptionHandler(e);
                throw e;
              }
            }
          },
          $on: function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (!namedListeners) {
              this.$$listeners[name] = namedListeners = [];
            }
            namedListeners.push(listener);
            return function () {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function (name, args) {
            var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                name: name,
                targetScope: scope,
                stopPropagation: function () {
                  stopPropagation = true;
                },
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), i, length;
            do {
              namedListeners = scope.$$listeners[name] || empty;
              event.currentScope = scope;
              for (i = 0, length = namedListeners.length; i < length; i++) {
                if (!namedListeners[i]) {
                  namedListeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  namedListeners[i].apply(null, listenerArgs);
                  if (stopPropagation)
                    return event;
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function (name, args) {
            var target = this, current = target, next = target, event = {
                name: name,
                targetScope: target,
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
            do {
              current = next;
              event.currentScope = current;
              listeners = current.$$listeners[name] || [];
              for (i = 0, length = listeners.length; i < length; i++) {
                if (!listeners[i]) {
                  listeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  listeners[i].apply(null, listenerArgs);
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                while (current !== target && !(next = current.$$nextSibling)) {
                  current = current.$parent;
                }
              }
            } while (current = next);
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
        function beginPhase(phase) {
          if ($rootScope.$$phase) {
            throw Error($rootScope.$$phase + ' already in progress');
          }
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          assertArgFn(fn, name);
          return fn;
        }
        function initWatchVal() {
        }
      }
    ];
  }
  function $SnifferProvider() {
    this.$get = [
      '$window',
      function ($window) {
        var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
        return {
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function (event) {
            if (event == 'input' && msie == 9)
              return false;
            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: false
        };
      }
    ];
  }
  function $WindowProvider() {
    this.$get = valueFn(window);
  }
  function parseHeaders(headers) {
    var parsed = {}, key, val, i;
    if (!headers)
      return parsed;
    forEach(headers.split('\n'), function (line) {
      i = line.indexOf(':');
      key = lowercase(trim(line.substr(0, i)));
      val = trim(line.substr(i + 1));
      if (key) {
        if (parsed[key]) {
          parsed[key] += ', ' + val;
        } else {
          parsed[key] = val;
        }
      }
    });
    return parsed;
  }
  function headersGetter(headers) {
    var headersObj = isObject(headers) ? headers : undefined;
    return function (name) {
      if (!headersObj)
        headersObj = parseHeaders(headers);
      if (name) {
        return headersObj[lowercase(name)] || null;
      }
      return headersObj;
    };
  }
  function transformData(data, headers, fns) {
    if (isFunction(fns))
      return fns(data, headers);
    forEach(fns, function (fn) {
      data = fn(data, headers);
    });
    return data;
  }
  function isSuccess(status) {
    return 200 <= status && status < 300;
  }
  function $HttpProvider() {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/;
    var $config = this.defaults = {
        transformResponse: [function (data) {
            if (isString(data)) {
              data = data.replace(PROTECTION_PREFIX, '');
              if (JSON_START.test(data) && JSON_END.test(data))
                data = fromJson(data, true);
            }
            return data;
          }],
        transformRequest: [function (d) {
            return isObject(d) && !isFile(d) ? toJson(d) : d;
          }],
        headers: {
          common: {
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: { 'Content-Type': 'application/json;charset=utf-8' },
          put: { 'Content-Type': 'application/json;charset=utf-8' }
        }
      };
    var providerResponseInterceptors = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        var defaultCache = $cacheFactory('$http'), responseInterceptors = [];
        forEach(providerResponseInterceptors, function (interceptor) {
          responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
        });
        function $http(config) {
          config.method = uppercase(config.method);
          var reqTransformFn = config.transformRequest || $config.transformRequest, respTransformFn = config.transformResponse || $config.transformResponse, reqHeaders = extend({}, config.headers), defHeaders = extend({ 'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN'] }, $config.headers.common, $config.headers[lowercase(config.method)]), reqData, defHeaderName, lowercaseDefHeaderName, headerName, promise;
          defaultHeadersIteration:
            for (defHeaderName in defHeaders) {
              lowercaseDefHeaderName = lowercase(defHeaderName);
              for (headerName in config.headers) {
                if (lowercase(headerName) === lowercaseDefHeaderName) {
                  continue defaultHeadersIteration;
                }
              }
              reqHeaders[defHeaderName] = defHeaders[defHeaderName];
            }
          if (isUndefined(config.data)) {
            for (var header in reqHeaders) {
              if (lowercase(header) === 'content-type') {
                delete reqHeaders[header];
                break;
              }
            }
          }
          reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn);
          promise = sendReq(config, reqData, reqHeaders);
          promise = promise.then(transformResponse, transformResponse);
          forEach(responseInterceptors, function (interceptor) {
            promise = interceptor(promise);
          });
          promise.success = function (fn) {
            promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function (fn) {
            promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
          function transformResponse(response) {
            var resp = extend({}, response, { data: transformData(response.data, response.headers, respTransformFn) });
            return isSuccess(response.status) ? resp : $q.reject(resp);
          }
        }
        $http.pendingRequests = [];
        createShortMethods('get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData('post', 'put');
        $http.defaults = $config;
        return $http;
        function createShortMethods(names) {
          forEach(arguments, function (name) {
            $http[name] = function (url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData(name) {
          forEach(arguments, function (name) {
            $http[name] = function (url, data, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url,
                data: data
              }));
            };
          });
        }
        function sendReq(config, reqData, reqHeaders) {
          var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
          $http.pendingRequests.push(config);
          promise.then(removePendingReq, removePendingReq);
          if (config.cache && config.method == 'GET') {
            cache = isObject(config.cache) ? config.cache : defaultCache;
          }
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp) {
              if (cachedResp.then) {
                cachedResp.then(removePendingReq, removePendingReq);
                return cachedResp;
              } else {
                if (isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                } else {
                  resolvePromise(cachedResp, 200, {});
                }
              }
            } else {
              cache.put(url, promise);
            }
          }
          if (!cachedResp) {
            $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials);
          }
          return promise;
          function done(status, response, headersString) {
            if (cache) {
              if (isSuccess(status)) {
                cache.put(url, [
                  status,
                  response,
                  parseHeaders(headersString)
                ]);
              } else {
                cache.remove(url);
              }
            }
            resolvePromise(response, status, headersString);
            $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0);
            (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            if (idx !== -1)
              $http.pendingRequests.splice(idx, 1);
          }
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          forEachSorted(params, function (value, key) {
            if (value == null || value == undefined)
              return;
            if (isObject(value)) {
              value = toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          });
          return url + (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
        }
      }
    ];
  }
  var XHR = window.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e1) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (e2) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e3) {
      }
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  function $HttpBackendProvider() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function ($browser, $window, $document) {
        return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
      }
    ];
  }
  function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
    return function (method, url, post, callback, headers, timeout, withCredentials) {
      $browser.$$incOutstandingRequestCount();
      url = url || $browser.url();
      if (lowercase(method) == 'jsonp') {
        var callbackId = '_' + (callbacks.counter++).toString(36);
        callbacks[callbackId] = function (data) {
          callbacks[callbackId].data = data;
        };
        jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
          if (callbacks[callbackId].data) {
            completeRequest(callback, 200, callbacks[callbackId].data);
          } else {
            completeRequest(callback, -2);
          }
          delete callbacks[callbackId];
        });
      } else {
        var xhr = new XHR();
        xhr.open(method, url, true);
        forEach(headers, function (value, key) {
          if (value)
            xhr.setRequestHeader(key, value);
        });
        var status;
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var responseHeaders = xhr.getAllResponseHeaders();
            var value, simpleHeaders = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            if (!responseHeaders) {
              responseHeaders = '';
              forEach(simpleHeaders, function (header) {
                var value = xhr.getResponseHeader(header);
                if (value) {
                  responseHeaders += header + ': ' + value + '\n';
                }
              });
            }
            completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
          }
        };
        if (withCredentials) {
          xhr.withCredentials = true;
        }
        xhr.send(post || '');
        if (timeout > 0) {
          $browserDefer(function () {
            status = -1;
            xhr.abort();
          }, timeout);
        }
      }
      function completeRequest(callback, status, response, headersString) {
        var protocol = (url.match(URL_MATCH) || [
            '',
            locationProtocol
          ])[1];
        status = protocol == 'file' ? response ? 200 : 404 : status;
        status = status == 1223 ? 204 : status;
        callback(status, response, headersString);
        $browser.$$completeOutstandingRequest(noop);
      }
    };
    function jsonpReq(url, done) {
      var script = rawDocument.createElement('script'), doneWrapper = function () {
          rawDocument.body.removeChild(script);
          if (done)
            done();
        };
      script.type = 'text/javascript';
      script.src = url;
      if (msie) {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState))
            doneWrapper();
        };
      } else {
        script.onload = script.onerror = doneWrapper;
      }
      rawDocument.body.appendChild(script);
    }
  }
  function $LocaleProvider() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (num) {
          if (num === 1) {
            return 'one';
          }
          return 'other';
        }
      };
    };
  }
  function $TimeoutProvider() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function ($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {};
        function timeout(fn, delay, invokeApply) {
          var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId, cleanup;
          timeoutId = $browser.defer(function () {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e);
              $exceptionHandler(e);
            } finally {
              delete deferreds[promise.$$timeoutId];
            }
            if (!skipApply)
              $rootScope.$apply();
          }, delay);
          promise.$$timeoutId = timeoutId;
          deferreds[timeoutId] = deferred;
          return promise;
        }
        timeout.cancel = function (promise) {
          if (promise && promise.$$timeoutId in deferreds) {
            deferreds[promise.$$timeoutId].reject('canceled');
            delete deferreds[promise.$$timeoutId];
            return $browser.defer.cancel(promise.$$timeoutId);
          }
          return false;
        };
        return timeout;
      }
    ];
  }
  $FilterProvider.$inject = ['$provide'];
  function $FilterProvider($provide) {
    var suffix = 'Filter';
    function register(name, factory) {
      return $provide.factory(name + suffix, factory);
    }
    this.register = register;
    this.$get = [
      '$injector',
      function ($injector) {
        return function (name) {
          return $injector.get(name + suffix);
        };
      }
    ];
    register('currency', currencyFilter);
    register('date', dateFilter);
    register('filter', filterFilter);
    register('json', jsonFilter);
    register('limitTo', limitToFilter);
    register('lowercase', lowercaseFilter);
    register('number', numberFilter);
    register('orderBy', orderByFilter);
    register('uppercase', uppercaseFilter);
  }
  function filterFilter() {
    return function (array, expression) {
      if (!isArray(array))
        return array;
      var predicates = [];
      predicates.check = function (value) {
        for (var j = 0; j < predicates.length; j++) {
          if (!predicates[j](value)) {
            return false;
          }
        }
        return true;
      };
      var search = function (obj, text) {
        if (text.charAt(0) === '!') {
          return !search(obj, text.substr(1));
        }
        switch (typeof obj) {
        case 'boolean':
        case 'number':
        case 'string':
          return ('' + obj).toLowerCase().indexOf(text) > -1;
        case 'object':
          for (var objKey in obj) {
            if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
              return true;
            }
          }
          return false;
        case 'array':
          for (var i = 0; i < obj.length; i++) {
            if (search(obj[i], text)) {
              return true;
            }
          }
          return false;
        default:
          return false;
        }
      };
      switch (typeof expression) {
      case 'boolean':
      case 'number':
      case 'string':
        expression = { $: expression };
      case 'object':
        for (var key in expression) {
          if (key == '$') {
            (function () {
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(value, text);
              });
            }());
          } else {
            (function () {
              var path = key;
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(getter(value, path), text);
              });
            }());
          }
        }
        break;
      case 'function':
        predicates.push(expression);
        break;
      default:
        return array;
      }
      var filtered = [];
      for (var j = 0; j < array.length; j++) {
        var value = array[j];
        if (predicates.check(value)) {
          filtered.push(value);
        }
      }
      return filtered;
    };
  }
  currencyFilter.$inject = ['$locale'];
  function currencyFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      if (isUndefined(currencySymbol))
        currencySymbol = formats.CURRENCY_SYM;
      return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
    };
  }
  numberFilter.$inject = ['$locale'];
  function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (number, fractionSize) {
      return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
    };
  }
  var DECIMAL_SEP = '.';
  function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number))
      return '';
    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '', formatedText = '', parts = [];
    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
      var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
      if (match && match[2] == '-' && match[3] > fractionSize + 1) {
        numStr = '0';
      } else {
        formatedText = numStr;
        hasExponent = true;
      }
    }
    if (!hasExponent) {
      var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
      if (isUndefined(fractionSize)) {
        fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
      }
      var pow = Math.pow(10, fractionSize);
      number = Math.round(number * pow) / pow;
      var fraction = ('' + number).split(DECIMAL_SEP);
      var whole = fraction[0];
      fraction = fraction[1] || '';
      var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
      if (whole.length >= lgroup + group) {
        pos = whole.length - lgroup;
        for (var i = 0; i < pos; i++) {
          if ((pos - i) % group === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
      }
      for (i = pos; i < whole.length; i++) {
        if ((whole.length - i) % lgroup === 0 && i !== 0) {
          formatedText += groupSep;
        }
        formatedText += whole.charAt(i);
      }
      while (fraction.length < fractionSize) {
        fraction += '0';
      }
      if (fractionSize && fractionSize !== '0')
        formatedText += decimalSep + fraction.substr(0, fractionSize);
    } else {
      if (fractionSize > 0 && number > -1 && number < 1) {
        formatedText = number.toFixed(fractionSize);
      }
    }
    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
  }
  function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
      neg = '-';
      num = -num;
    }
    num = '' + num;
    while (num.length < digits)
      num = '0' + num;
    if (trim)
      num = num.substr(num.length - digits);
    return neg + num;
  }
  function dateGetter(name, size, offset, trim) {
    offset = offset || 0;
    return function (date) {
      var value = date['get' + name]();
      if (offset > 0 || value > -offset)
        value += offset;
      if (value === 0 && offset == -12)
        value = 12;
      return padNumber(value, size, trim);
    };
  }
  function dateStrGetter(name, shortForm) {
    return function (date, formats) {
      var value = date['get' + name]();
      var get = uppercase(shortForm ? 'SHORT' + name : name);
      return formats[get][value];
    };
  }
  function timeZoneGetter(date) {
    var zone = -1 * date.getTimezoneOffset();
    var paddedZone = zone >= 0 ? '+' : '';
    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
    return paddedZone;
  }
  function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
  }
  var DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', true),
      MM: dateGetter('Month', 2, 1),
      M: dateGetter('Month', 1, 1),
      dd: dateGetter('Date', 2),
      d: dateGetter('Date', 1),
      HH: dateGetter('Hours', 2),
      H: dateGetter('Hours', 1),
      hh: dateGetter('Hours', 2, -12),
      h: dateGetter('Hours', 1, -12),
      mm: dateGetter('Minutes', 2),
      m: dateGetter('Minutes', 1),
      ss: dateGetter('Seconds', 2),
      s: dateGetter('Seconds', 1),
      EEEE: dateStrGetter('Day'),
      EEE: dateStrGetter('Day', true),
      a: ampmGetter,
      Z: timeZoneGetter
    };
  var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
  dateFilter.$inject = ['$locale'];
  function dateFilter($locale) {
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    function jsonStringToDate(string) {
      var match;
      if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0;
        if (match[9]) {
          tzHour = int(match[9] + match[10]);
          tzMin = int(match[9] + match[11]);
        }
        date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
        date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
        return date;
      }
      return string;
    }
    return function (date, format) {
      var text = '', parts = [], fn, match;
      format = format || 'mediumDate';
      format = $locale.DATETIME_FORMATS[format] || format;
      if (isString(date)) {
        if (NUMBER_STRING.test(date)) {
          date = int(date);
        } else {
          date = jsonStringToDate(date);
        }
      }
      if (isNumber(date)) {
        date = new Date(date);
      }
      if (!isDate(date)) {
        return date;
      }
      while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
          parts = concat(parts, match, 1);
          format = parts.pop();
        } else {
          parts.push(format);
          format = null;
        }
      }
      forEach(parts, function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      });
      return text;
    };
  }
  function jsonFilter() {
    return function (object) {
      return toJson(object, true);
    };
  }
  var lowercaseFilter = valueFn(lowercase);
  var uppercaseFilter = valueFn(uppercase);
  function limitToFilter() {
    return function (array, limit) {
      if (!(array instanceof Array))
        return array;
      limit = int(limit);
      var out = [], i, n;
      if (!array || !(array instanceof Array))
        return out;
      if (limit > array.length)
        limit = array.length;
      else if (limit < -array.length)
        limit = -array.length;
      if (limit > 0) {
        i = 0;
        n = limit;
      } else {
        i = array.length + limit;
        n = array.length;
      }
      for (; i < n; i++) {
        out.push(array[i]);
      }
      return out;
    };
  }
  orderByFilter.$inject = ['$parse'];
  function orderByFilter($parse) {
    return function (array, sortPredicate, reverseOrder) {
      if (!isArray(array))
        return array;
      if (!sortPredicate)
        return array;
      sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
      sortPredicate = map(sortPredicate, function (predicate) {
        var descending = false, get = predicate || identity;
        if (isString(predicate)) {
          if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
            descending = predicate.charAt(0) == '-';
            predicate = predicate.substring(1);
          }
          get = $parse(predicate);
        }
        return reverseComparator(function (a, b) {
          return compare(get(a), get(b));
        }, descending);
      });
      var arrayCopy = [];
      for (var i = 0; i < array.length; i++) {
        arrayCopy.push(array[i]);
      }
      return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
      function comparator(o1, o2) {
        for (var i = 0; i < sortPredicate.length; i++) {
          var comp = sortPredicate[i](o1, o2);
          if (comp !== 0)
            return comp;
        }
        return 0;
      }
      function reverseComparator(comp, descending) {
        return toBoolean(descending) ? function (a, b) {
          return comp(b, a);
        } : comp;
      }
      function compare(v1, v2) {
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
          if (t1 == 'string') {
            v1 = v1.toLowerCase();
            v2 = v2.toLowerCase();
          }
          if (v1 === v2)
            return 0;
          return v1 < v2 ? -1 : 1;
        } else {
          return t1 < t2 ? -1 : 1;
        }
      }
    };
  }
  function ngDirective(directive) {
    if (isFunction(directive)) {
      directive = { link: directive };
    }
    directive.restrict = directive.restrict || 'AC';
    return valueFn(directive);
  }
  var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function (element, attr) {
        if (msie <= 8) {
          if (!attr.href && !attr.name) {
            attr.$set('href', '');
          }
          element.append(document.createComment('IE fix'));
        }
        return function (scope, element) {
          element.bind('click', function (event) {
            if (!element.attr('href')) {
              event.preventDefault();
            }
          });
        };
      }
    });
  var ngAttributeAliasDirectives = {};
  forEach(BOOLEAN_ATTR, function (propName, attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (scope, element, attr) {
            scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
              attr.$set(attrName, !!value);
            });
          };
        }
      };
    };
  });
  forEach([
    'src',
    'href'
  ], function (attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 99,
        link: function (scope, element, attr) {
          attr.$observe(normalized, function (value) {
            if (!value)
              return;
            attr.$set(attrName, value);
            if (msie)
              element.prop(attrName, attr[attrName]);
          });
        }
      };
    };
  });
  var nullFormCtrl = {
      $addControl: noop,
      $removeControl: noop,
      $setValidity: noop,
      $setDirty: noop
    };
  FormController.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  function FormController(element, attrs) {
    var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {};
    form.$name = attrs.name || attrs.ngForm;
    form.$dirty = false;
    form.$pristine = true;
    form.$valid = true;
    form.$invalid = false;
    parentForm.$addControl(form);
    element.addClass(PRISTINE_CLASS);
    toggleValidCss(true);
    function toggleValidCss(isValid, validationErrorKey) {
      validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
      element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
    }
    form.$addControl = function (control) {
      if (control.$name && !form.hasOwnProperty(control.$name)) {
        form[control.$name] = control;
      }
    };
    form.$removeControl = function (control) {
      if (control.$name && form[control.$name] === control) {
        delete form[control.$name];
      }
      forEach(errors, function (queue, validationToken) {
        form.$setValidity(validationToken, true, control);
      });
    };
    form.$setValidity = function (validationToken, isValid, control) {
      var queue = errors[validationToken];
      if (isValid) {
        if (queue) {
          arrayRemove(queue, control);
          if (!queue.length) {
            invalidCount--;
            if (!invalidCount) {
              toggleValidCss(isValid);
              form.$valid = true;
              form.$invalid = false;
            }
            errors[validationToken] = false;
            toggleValidCss(true, validationToken);
            parentForm.$setValidity(validationToken, true, form);
          }
        }
      } else {
        if (!invalidCount) {
          toggleValidCss(isValid);
        }
        if (queue) {
          if (includes(queue, control))
            return;
        } else {
          errors[validationToken] = queue = [];
          invalidCount++;
          toggleValidCss(false, validationToken);
          parentForm.$setValidity(validationToken, false, form);
        }
        queue.push(control);
        form.$valid = false;
        form.$invalid = true;
      }
    };
    form.$setDirty = function () {
      element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      form.$dirty = true;
      form.$pristine = false;
      parentForm.$setDirty();
    };
  }
  var formDirectiveFactory = function (isNgForm) {
    return [
      '$timeout',
      function ($timeout) {
        var formDirective = {
            name: 'form',
            restrict: 'E',
            controller: FormController,
            compile: function () {
              return {
                pre: function (scope, formElement, attr, controller) {
                  if (!attr.action) {
                    var preventDefaultListener = function (event) {
                      event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    };
                    addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                    formElement.bind('$destroy', function () {
                      $timeout(function () {
                        removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                      }, 0, false);
                    });
                  }
                  var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                  if (alias) {
                    scope[alias] = controller;
                  }
                  if (parentFormCtrl) {
                    formElement.bind('$destroy', function () {
                      parentFormCtrl.$removeControl(controller);
                      if (alias) {
                        scope[alias] = undefined;
                      }
                      extend(controller, nullFormCtrl);
                    });
                  }
                }
              };
            }
          };
        return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
      }
    ];
  };
  var formDirective = formDirectiveFactory();
  var ngFormDirective = formDirectiveFactory(true);
  var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
  var inputType = {
      'text': textInputType,
      'number': numberInputType,
      'url': urlInputType,
      'email': emailInputType,
      'radio': radioInputType,
      'checkbox': checkboxInputType,
      'hidden': noop,
      'button': noop,
      'submit': noop,
      'reset': noop
    };
  function isEmpty(value) {
    return isUndefined(value) || value === '' || value === null || value !== value;
  }
  function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    var listener = function () {
      var value = trim(element.val());
      if (ctrl.$viewValue !== value) {
        scope.$apply(function () {
          ctrl.$setViewValue(value);
        });
      }
    };
    if ($sniffer.hasEvent('input')) {
      element.bind('input', listener);
    } else {
      var timeout;
      var deferListener = function () {
        if (!timeout) {
          timeout = $browser.defer(function () {
            listener();
            timeout = null;
          });
        }
      };
      element.bind('keydown', function (event) {
        var key = event.keyCode;
        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
          return;
        deferListener();
      });
      element.bind('change', listener);
      if ($sniffer.hasEvent('paste')) {
        element.bind('paste cut', deferListener);
      }
    }
    ctrl.$render = function () {
      element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
    var pattern = attr.ngPattern, patternValidator;
    var validate = function (regexp, value) {
      if (isEmpty(value) || regexp.test(value)) {
        ctrl.$setValidity('pattern', true);
        return value;
      } else {
        ctrl.$setValidity('pattern', false);
        return undefined;
      }
    };
    if (pattern) {
      if (pattern.match(/^\/(.*)\/$/)) {
        pattern = new RegExp(pattern.substr(1, pattern.length - 2));
        patternValidator = function (value) {
          return validate(pattern, value);
        };
      } else {
        patternValidator = function (value) {
          var patternObj = scope.$eval(pattern);
          if (!patternObj || !patternObj.test) {
            throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
          }
          return validate(patternObj, value);
        };
      }
      ctrl.$formatters.push(patternValidator);
      ctrl.$parsers.push(patternValidator);
    }
    if (attr.ngMinlength) {
      var minlength = int(attr.ngMinlength);
      var minLengthValidator = function (value) {
        if (!isEmpty(value) && value.length < minlength) {
          ctrl.$setValidity('minlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('minlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(minLengthValidator);
      ctrl.$formatters.push(minLengthValidator);
    }
    if (attr.ngMaxlength) {
      var maxlength = int(attr.ngMaxlength);
      var maxLengthValidator = function (value) {
        if (!isEmpty(value) && value.length > maxlength) {
          ctrl.$setValidity('maxlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('maxlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxLengthValidator);
      ctrl.$formatters.push(maxLengthValidator);
    }
  }
  function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    ctrl.$parsers.push(function (value) {
      var empty = isEmpty(value);
      if (empty || NUMBER_REGEXP.test(value)) {
        ctrl.$setValidity('number', true);
        return value === '' ? null : empty ? value : parseFloat(value);
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
    ctrl.$formatters.push(function (value) {
      return isEmpty(value) ? '' : '' + value;
    });
    if (attr.min) {
      var min = parseFloat(attr.min);
      var minValidator = function (value) {
        if (!isEmpty(value) && value < min) {
          ctrl.$setValidity('min', false);
          return undefined;
        } else {
          ctrl.$setValidity('min', true);
          return value;
        }
      };
      ctrl.$parsers.push(minValidator);
      ctrl.$formatters.push(minValidator);
    }
    if (attr.max) {
      var max = parseFloat(attr.max);
      var maxValidator = function (value) {
        if (!isEmpty(value) && value > max) {
          ctrl.$setValidity('max', false);
          return undefined;
        } else {
          ctrl.$setValidity('max', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxValidator);
      ctrl.$formatters.push(maxValidator);
    }
    ctrl.$formatters.push(function (value) {
      if (isEmpty(value) || isNumber(value)) {
        ctrl.$setValidity('number', true);
        return value;
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
  }
  function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var urlValidator = function (value) {
      if (isEmpty(value) || URL_REGEXP.test(value)) {
        ctrl.$setValidity('url', true);
        return value;
      } else {
        ctrl.$setValidity('url', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(urlValidator);
    ctrl.$parsers.push(urlValidator);
  }
  function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var emailValidator = function (value) {
      if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
        ctrl.$setValidity('email', true);
        return value;
      } else {
        ctrl.$setValidity('email', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(emailValidator);
    ctrl.$parsers.push(emailValidator);
  }
  function radioInputType(scope, element, attr, ctrl) {
    if (isUndefined(attr.name)) {
      element.attr('name', nextUid());
    }
    element.bind('click', function () {
      if (element[0].checked) {
        scope.$apply(function () {
          ctrl.$setViewValue(attr.value);
        });
      }
    });
    ctrl.$render = function () {
      var value = attr.value;
      element[0].checked = value == ctrl.$viewValue;
    };
    attr.$observe('value', ctrl.$render);
  }
  function checkboxInputType(scope, element, attr, ctrl) {
    var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
    if (!isString(trueValue))
      trueValue = true;
    if (!isString(falseValue))
      falseValue = false;
    element.bind('click', function () {
      scope.$apply(function () {
        ctrl.$setViewValue(element[0].checked);
      });
    });
    ctrl.$render = function () {
      element[0].checked = ctrl.$viewValue;
    };
    ctrl.$formatters.push(function (value) {
      return value === trueValue;
    });
    ctrl.$parsers.push(function (value) {
      return value ? trueValue : falseValue;
    });
  }
  var inputDirective = [
      '$browser',
      '$sniffer',
      function ($browser, $sniffer) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (scope, element, attr, ctrl) {
            if (ctrl) {
              (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
            }
          }
        };
      }
    ];
  var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
  var NgModelController = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function ($scope, $exceptionHandler, $attr, $element, $parse) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$name = $attr.name;
        var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
        if (!ngModelSet) {
          throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
        }
        this.$render = noop;
        var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
        $element.addClass(PRISTINE_CLASS);
        toggleValidCss(true);
        function toggleValidCss(isValid, validationErrorKey) {
          validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
          $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
        }
        this.$setValidity = function (validationErrorKey, isValid) {
          if ($error[validationErrorKey] === !isValid)
            return;
          if (isValid) {
            if ($error[validationErrorKey])
              invalidCount--;
            if (!invalidCount) {
              toggleValidCss(true);
              this.$valid = true;
              this.$invalid = false;
            }
          } else {
            toggleValidCss(false);
            this.$invalid = true;
            this.$valid = false;
            invalidCount++;
          }
          $error[validationErrorKey] = !isValid;
          toggleValidCss(isValid, validationErrorKey);
          parentForm.$setValidity(validationErrorKey, isValid, this);
        };
        this.$setViewValue = function (value) {
          this.$viewValue = value;
          if (this.$pristine) {
            this.$dirty = true;
            this.$pristine = false;
            $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
            parentForm.$setDirty();
          }
          forEach(this.$parsers, function (fn) {
            value = fn(value);
          });
          if (this.$modelValue !== value) {
            this.$modelValue = value;
            ngModelSet($scope, value);
            forEach(this.$viewChangeListeners, function (listener) {
              try {
                listener();
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          }
        };
        var ctrl = this;
        $scope.$watch(function ngModelWatch() {
          var value = ngModelGet($scope);
          if (ctrl.$modelValue !== value) {
            var formatters = ctrl.$formatters, idx = formatters.length;
            ctrl.$modelValue = value;
            while (idx--) {
              value = formatters[idx](value);
            }
            if (ctrl.$viewValue !== value) {
              ctrl.$viewValue = value;
              ctrl.$render();
            }
          }
        });
      }
    ];
  var ngModelDirective = function () {
    return {
      require: [
        'ngModel',
        '^?form'
      ],
      controller: NgModelController,
      link: function (scope, element, attr, ctrls) {
        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
        formCtrl.$addControl(modelCtrl);
        element.bind('$destroy', function () {
          formCtrl.$removeControl(modelCtrl);
        });
      }
    };
  };
  var ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function () {
          scope.$eval(attr.ngChange);
        });
      }
    });
  var requiredDirective = function () {
    return {
      require: '?ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!ctrl)
          return;
        attr.required = true;
        var validator = function (value) {
          if (attr.required && (isEmpty(value) || value === false)) {
            ctrl.$setValidity('required', false);
            return;
          } else {
            ctrl.$setValidity('required', true);
            return value;
          }
        };
        ctrl.$formatters.push(validator);
        ctrl.$parsers.unshift(validator);
        attr.$observe('required', function () {
          validator(ctrl.$viewValue);
        });
      }
    };
  };
  var ngListDirective = function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
        var parse = function (viewValue) {
          var list = [];
          if (viewValue) {
            forEach(viewValue.split(separator), function (value) {
              if (value)
                list.push(trim(value));
            });
          }
          return list;
        };
        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(function (value) {
          if (isArray(value)) {
            return value.join(', ');
          }
          return undefined;
        });
      }
    };
  };
  var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
  var ngValueDirective = function () {
    return {
      priority: 100,
      compile: function (tpl, tplAttr) {
        if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
          return function (scope, elm, attr) {
            attr.$set('value', scope.$eval(attr.ngValue));
          };
        } else {
          return function (scope, elm, attr) {
            scope.$watch(attr.ngValue, function valueWatchAction(value) {
              attr.$set('value', value);
            });
          };
        }
      }
    };
  };
  var ngBindDirective = ngDirective(function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind);
      scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
        element.text(value == undefined ? '' : value);
      });
    });
  var ngBindTemplateDirective = [
      '$interpolate',
      function ($interpolate) {
        return function (scope, element, attr) {
          var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
          element.addClass('ng-binding').data('$binding', interpolateFn);
          attr.$observe('ngBindTemplate', function (value) {
            element.text(value);
          });
        };
      }
    ];
  var ngBindHtmlUnsafeDirective = [function () {
        return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
          scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
          });
        };
      }];
  function classDirective(name, selector) {
    name = 'ngClass' + name;
    return ngDirective(function (scope, element, attr) {
      var oldVal = undefined;
      scope.$watch(attr[name], ngClassWatchAction, true);
      attr.$observe('class', function (value) {
        var ngClass = scope.$eval(attr[name]);
        ngClassWatchAction(ngClass, ngClass);
      });
      if (name !== 'ngClass') {
        scope.$watch('$index', function ($index, old$index) {
          var mod = $index & 1;
          if (mod !== old$index & 1) {
            if (mod === selector) {
              addClass(scope.$eval(attr[name]));
            } else {
              removeClass(scope.$eval(attr[name]));
            }
          }
        });
      }
      function ngClassWatchAction(newVal) {
        if (selector === true || scope.$index % 2 === selector) {
          if (oldVal && !equals(newVal, oldVal)) {
            removeClass(oldVal);
          }
          addClass(newVal);
        }
        oldVal = copy(newVal);
      }
      function removeClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      function addClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        if (classVal) {
          element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
      }
    });
  }
  var ngClassDirective = classDirective('', true);
  var ngClassOddDirective = classDirective('Odd', 0);
  var ngClassEvenDirective = classDirective('Even', 1);
  var ngCloakDirective = ngDirective({
      compile: function (element, attr) {
        attr.$set('ngCloak', undefined);
        element.removeClass('ng-cloak');
      }
    });
  var ngControllerDirective = [function () {
        return {
          scope: true,
          controller: '@'
        };
      }];
  var ngCspDirective = [
      '$sniffer',
      function ($sniffer) {
        return {
          priority: 1000,
          compile: function () {
            $sniffer.csp = true;
          }
        };
      }
    ];
  var ngEventDirectives = {};
  forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit'.split(' '), function (name) {
    var directiveName = directiveNormalize('ng-' + name);
    ngEventDirectives[directiveName] = [
      '$parse',
      function ($parse) {
        return function (scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function (event) {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
          });
        };
      }
    ];
  });
  var ngIncludeDirective = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      function ($http, $templateCache, $anchorScroll, $compile) {
        return {
          restrict: 'ECA',
          terminal: true,
          compile: function (element, attr) {
            var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
            return function (scope, element) {
              var changeCounter = 0, childScope;
              var clearContent = function () {
                if (childScope) {
                  childScope.$destroy();
                  childScope = null;
                }
                element.html('');
              };
              scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                var thisChangeId = ++changeCounter;
                if (src) {
                  $http.get(src, { cache: $templateCache }).success(function (response) {
                    if (thisChangeId !== changeCounter)
                      return;
                    if (childScope)
                      childScope.$destroy();
                    childScope = scope.$new();
                    element.html(response);
                    $compile(element.contents())(childScope);
                    if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                      $anchorScroll();
                    }
                    childScope.$emit('$includeContentLoaded');
                    scope.$eval(onloadExp);
                  }).error(function () {
                    if (thisChangeId === changeCounter)
                      clearContent();
                  });
                } else
                  clearContent();
              });
            };
          }
        };
      }
    ];
  var ngInitDirective = ngDirective({
      compile: function () {
        return {
          pre: function (scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }
        };
      }
    });
  var ngNonBindableDirective = ngDirective({
      terminal: true,
      priority: 1000
    });
  var ngPluralizeDirective = [
      '$locale',
      '$interpolate',
      function ($locale, $interpolate) {
        var BRACE = /{}/g;
        return {
          restrict: 'EA',
          link: function (scope, element, attr) {
            var numberExp = attr.count, whenExp = element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp), whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();
            forEach(whens, function (expression, key) {
              whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
            });
            scope.$watch(function ngPluralizeWatch() {
              var value = parseFloat(scope.$eval(numberExp));
              if (!isNaN(value)) {
                if (!(value in whens))
                  value = $locale.pluralCat(value - offset);
                return whensExpFns[value](scope, element, true);
              } else {
                return '';
              }
            }, function ngPluralizeWatchAction(newVal) {
              element.text(newVal);
            });
          }
        };
      }
    ];
  var ngRepeatDirective = ngDirective({
      transclude: 'element',
      priority: 1000,
      terminal: true,
      compile: function (element, attr, linker) {
        return function (scope, iterStartElement, attr) {
          var expression = attr.ngRepeat;
          var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/), lhs, rhs, valueIdent, keyIdent;
          if (!match) {
            throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + expression + '\'.');
          }
          lhs = match[1];
          rhs = match[2];
          match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
          if (!match) {
            throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
          }
          valueIdent = match[3] || match[1];
          keyIdent = match[2];
          var lastOrder = new HashQueueMap();
          scope.$watch(function ngRepeatWatch(scope) {
            var index, length, collection = scope.$eval(rhs), cursor = iterStartElement, nextOrder = new HashQueueMap(), arrayBound, childScope, key, value, array, last;
            if (!isArray(collection)) {
              array = [];
              for (key in collection) {
                if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                  array.push(key);
                }
              }
              array.sort();
            } else {
              array = collection || [];
            }
            arrayBound = array.length - 1;
            for (index = 0, length = array.length; index < length; index++) {
              key = collection === array ? index : array[index];
              value = collection[key];
              last = lastOrder.shift(value);
              if (last) {
                childScope = last.scope;
                nextOrder.push(value, last);
                if (index === last.index) {
                  cursor = last.element;
                } else {
                  last.index = index;
                  cursor.after(last.element);
                  cursor = last.element;
                }
              } else {
                childScope = scope.$new();
              }
              childScope[valueIdent] = value;
              if (keyIdent)
                childScope[keyIdent] = key;
              childScope.$index = index;
              childScope.$first = index === 0;
              childScope.$last = index === arrayBound;
              childScope.$middle = !(childScope.$first || childScope.$last);
              if (!last) {
                linker(childScope, function (clone) {
                  cursor.after(clone);
                  last = {
                    scope: childScope,
                    element: cursor = clone,
                    index: index
                  };
                  nextOrder.push(value, last);
                });
              }
            }
            for (key in lastOrder) {
              if (lastOrder.hasOwnProperty(key)) {
                array = lastOrder[key];
                while (array.length) {
                  value = array.pop();
                  value.element.remove();
                  value.scope.$destroy();
                }
              }
            }
            lastOrder = nextOrder;
          });
        };
      }
    });
  var ngShowDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
        element.css('display', toBoolean(value) ? '' : 'none');
      });
    });
  var ngHideDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        element.css('display', toBoolean(value) ? 'none' : '');
      });
    });
  var ngStyleDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
        if (oldStyles && newStyles !== oldStyles) {
          forEach(oldStyles, function (val, style) {
            element.css(style, '');
          });
        }
        if (newStyles)
          element.css(newStyles);
      }, true);
    });
  var NG_SWITCH = 'ng-switch';
  var ngSwitchDirective = valueFn({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: [
        '$scope',
        function ngSwitchController() {
          this.cases = {};
        }
      ],
      link: function (scope, element, attr, ctrl) {
        var watchExpr = attr.ngSwitch || attr.on, selectedTransclude, selectedElement, selectedScope;
        scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
          if (selectedElement) {
            selectedScope.$destroy();
            selectedElement.remove();
            selectedElement = selectedScope = null;
          }
          if (selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?']) {
            scope.$eval(attr.change);
            selectedScope = scope.$new();
            selectedTransclude(selectedScope, function (caseElement) {
              selectedElement = caseElement;
              element.append(caseElement);
            });
          }
        });
      }
    });
  var ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
        };
      }
    });
  var ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['?'] = transclude;
        };
      }
    });
  var ngTranscludeDirective = ngDirective({
      controller: [
        '$transclude',
        '$element',
        function ($transclude, $element) {
          $transclude(function (clone) {
            $element.append(clone);
          });
        }
      ]
    });
  var ngViewDirective = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
        return {
          restrict: 'ECA',
          terminal: true,
          link: function (scope, element, attr) {
            var lastScope, onloadExp = attr.onload || '';
            scope.$on('$routeChangeSuccess', update);
            update();
            function destroyLastScope() {
              if (lastScope) {
                lastScope.$destroy();
                lastScope = null;
              }
            }
            function clearContent() {
              element.html('');
              destroyLastScope();
            }
            function update() {
              var locals = $route.current && $route.current.locals, template = locals && locals.$template;
              if (template) {
                element.html(template);
                destroyLastScope();
                var link = $compile(element.contents()), current = $route.current, controller;
                lastScope = current.scope = scope.$new();
                if (current.controller) {
                  locals.$scope = lastScope;
                  controller = $controller(current.controller, locals);
                  element.children().data('$ngControllerController', controller);
                }
                link(lastScope);
                lastScope.$emit('$viewContentLoaded');
                lastScope.$eval(onloadExp);
                $anchorScroll();
              } else {
                clearContent();
              }
            }
          }
        };
      }
    ];
  var scriptDirective = [
      '$templateCache',
      function ($templateCache) {
        return {
          restrict: 'E',
          terminal: true,
          compile: function (element, attr) {
            if (attr.type == 'text/ng-template') {
              var templateUrl = attr.id, text = element[0].text;
              $templateCache.put(templateUrl, text);
            }
          }
        };
      }
    ];
  var ngOptionsDirective = valueFn({ terminal: true });
  var selectDirective = [
      '$compile',
      '$parse',
      function ($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, nullModelCtrl = { $setViewValue: noop };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function ($element, $scope, $attrs) {
              var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
              self.databound = $attrs.ngModel;
              self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                ngModelCtrl = ngModelCtrl_;
                nullOption = nullOption_;
                unknownOption = unknownOption_;
              };
              self.addOption = function (value) {
                optionsMap[value] = true;
                if (ngModelCtrl.$viewValue == value) {
                  $element.val(value);
                  if (unknownOption.parent())
                    unknownOption.remove();
                }
              };
              self.removeOption = function (value) {
                if (this.hasOption(value)) {
                  delete optionsMap[value];
                  if (ngModelCtrl.$viewValue == value) {
                    this.renderUnknownOption(value);
                  }
                }
              };
              self.renderUnknownOption = function (val) {
                var unknownVal = '? ' + hashKey(val) + ' ?';
                unknownOption.val(unknownVal);
                $element.prepend(unknownOption);
                $element.val(unknownVal);
                unknownOption.prop('selected', true);
              };
              self.hasOption = function (value) {
                return optionsMap.hasOwnProperty(value);
              };
              $scope.$on('$destroy', function () {
                self.renderUnknownOption = noop;
              });
            }
          ],
          link: function (scope, element, attr, ctrls) {
            if (!ctrls[1])
              return;
            var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
            for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
              if (children[i].value == '') {
                emptyOption = nullOption = children.eq(i);
                break;
              }
            }
            selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
            if (multiple && (attr.required || attr.ngRequired)) {
              var requiredValidator = function (value) {
                ngModelCtrl.$setValidity('required', !attr.required || value && value.length);
                return value;
              };
              ngModelCtrl.$parsers.push(requiredValidator);
              ngModelCtrl.$formatters.unshift(requiredValidator);
              attr.$observe('required', function () {
                requiredValidator(ngModelCtrl.$viewValue);
              });
            }
            if (optionsExp)
              Options(scope, element, ngModelCtrl);
            else if (multiple)
              Multiple(scope, element, ngModelCtrl);
            else
              Single(scope, element, ngModelCtrl, selectCtrl);
            function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
              ngModelCtrl.$render = function () {
                var viewValue = ngModelCtrl.$viewValue;
                if (selectCtrl.hasOption(viewValue)) {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  selectElement.val(viewValue);
                  if (viewValue === '')
                    emptyOption.prop('selected', true);
                } else {
                  if (isUndefined(viewValue) && emptyOption) {
                    selectElement.val('');
                  } else {
                    selectCtrl.renderUnknownOption(viewValue);
                  }
                }
              };
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  ngModelCtrl.$setViewValue(selectElement.val());
                });
              });
            }
            function Multiple(scope, selectElement, ctrl) {
              var lastView;
              ctrl.$render = function () {
                var items = new HashMap(ctrl.$viewValue);
                forEach(selectElement.find('option'), function (option) {
                  option.selected = isDefined(items.get(option.value));
                });
              };
              scope.$watch(function selectMultipleWatch() {
                if (!equals(lastView, ctrl.$viewValue)) {
                  lastView = copy(ctrl.$viewValue);
                  ctrl.$render();
                }
              });
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var array = [];
                  forEach(selectElement.find('option'), function (option) {
                    if (option.selected) {
                      array.push(option.value);
                    }
                  });
                  ctrl.$setViewValue(array);
                });
              });
            }
            function Options(scope, selectElement, ctrl) {
              var match;
              if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\'' + ' but got \'' + optionsExp + '\'.');
              }
              var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), optionGroupsCache = [[{
                      element: selectElement,
                      label: ''
                    }]];
              if (nullOption) {
                $compile(nullOption)(scope);
                nullOption.removeClass('ng-scope');
                nullOption.remove();
              }
              selectElement.html('');
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength;
                  if (multiple) {
                    value = [];
                    for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                      optionGroup = optionGroupsCache[groupIndex];
                      for (index = 1, length = optionGroup.length; index < length; index++) {
                        if ((optionElement = optionGroup[index].element)[0].selected) {
                          key = optionElement.val();
                          if (keyName)
                            locals[keyName] = key;
                          locals[valueName] = collection[key];
                          value.push(valueFn(scope, locals));
                        }
                      }
                    }
                  } else {
                    key = selectElement.val();
                    if (key == '?') {
                      value = undefined;
                    } else if (key == '') {
                      value = null;
                    } else {
                      locals[valueName] = collection[key];
                      if (keyName)
                        locals[keyName] = key;
                      value = valueFn(scope, locals);
                    }
                  }
                  ctrl.$setViewValue(value);
                });
              });
              ctrl.$render = render;
              scope.$watch(render);
              function render() {
                var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = false, lastElement, element, label;
                if (multiple) {
                  selectedSet = new HashMap(modelValue);
                }
                for (index = 0; length = keys.length, index < length; index++) {
                  locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                  optionGroupName = groupByFn(scope, locals) || '';
                  if (!(optionGroup = optionGroups[optionGroupName])) {
                    optionGroup = optionGroups[optionGroupName] = [];
                    optionGroupNames.push(optionGroupName);
                  }
                  if (multiple) {
                    selected = selectedSet.remove(valueFn(scope, locals)) != undefined;
                  } else {
                    selected = modelValue === valueFn(scope, locals);
                    selectedSet = selectedSet || selected;
                  }
                  label = displayFn(scope, locals);
                  label = label === undefined ? '' : label;
                  optionGroup.push({
                    id: keyName ? keys[index] : index,
                    label: label,
                    selected: selected
                  });
                }
                if (!multiple) {
                  if (nullOption || modelValue === null) {
                    optionGroups[''].unshift({
                      id: '',
                      label: '',
                      selected: !selectedSet
                    });
                  } else if (!selectedSet) {
                    optionGroups[''].unshift({
                      id: '?',
                      label: '',
                      selected: true
                    });
                  }
                }
                for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                  optionGroupName = optionGroupNames[groupIndex];
                  optionGroup = optionGroups[optionGroupName];
                  if (optionGroupsCache.length <= groupIndex) {
                    existingParent = {
                      element: optGroupTemplate.clone().attr('label', optionGroupName),
                      label: optionGroup.label
                    };
                    existingOptions = [existingParent];
                    optionGroupsCache.push(existingOptions);
                    selectElement.append(existingParent.element);
                  } else {
                    existingOptions = optionGroupsCache[groupIndex];
                    existingParent = existingOptions[0];
                    if (existingParent.label != optionGroupName) {
                      existingParent.element.attr('label', existingParent.label = optionGroupName);
                    }
                  }
                  lastElement = null;
                  for (index = 0, length = optionGroup.length; index < length; index++) {
                    option = optionGroup[index];
                    if (existingOption = existingOptions[index + 1]) {
                      lastElement = existingOption.element;
                      if (existingOption.label !== option.label) {
                        lastElement.text(existingOption.label = option.label);
                      }
                      if (existingOption.id !== option.id) {
                        lastElement.val(existingOption.id = option.id);
                      }
                      if (lastElement[0].selected !== option.selected) {
                        lastElement.prop('selected', existingOption.selected = option.selected);
                      }
                    } else {
                      if (option.id === '' && nullOption) {
                        element = nullOption;
                      } else {
                        (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                      }
                      existingOptions.push(existingOption = {
                        element: element,
                        label: option.label,
                        id: option.id,
                        selected: option.selected
                      });
                      if (lastElement) {
                        lastElement.after(element);
                      } else {
                        existingParent.element.append(element);
                      }
                      lastElement = element;
                    }
                  }
                  index++;
                  while (existingOptions.length > index) {
                    existingOptions.pop().element.remove();
                  }
                }
                while (optionGroupsCache.length > groupIndex) {
                  optionGroupsCache.pop()[0].element.remove();
                }
              }
            }
          }
        };
      }
    ];
  var optionDirective = [
      '$interpolate',
      function ($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (element, attr) {
            if (isUndefined(attr.value)) {
              var interpolateFn = $interpolate(element.text(), true);
              if (!interpolateFn) {
                attr.$set('value', element.text());
              }
            }
            return function (scope, element, attr) {
              var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
              if (selectCtrl && selectCtrl.databound) {
                element.prop('selected', false);
              } else {
                selectCtrl = nullSelectCtrl;
              }
              if (interpolateFn) {
                scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                  attr.$set('value', newVal);
                  if (newVal !== oldVal)
                    selectCtrl.removeOption(oldVal);
                  selectCtrl.addOption(newVal);
                });
              } else {
                selectCtrl.addOption(attr.value);
              }
              element.bind('$destroy', function () {
                selectCtrl.removeOption(attr.value);
              });
            };
          }
        };
      }
    ];
  var styleDirective = valueFn({
      restrict: 'E',
      terminal: true
    });
  bindJQuery();
  publishExternalAPI(angular);
  jqLite(document).ready(function () {
    angularInit(document, bootstrap);
  });
}(window, document));
angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none !important;}ng\\:form{display:block;}</style>');
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngCookies', ['ng']).factory('$cookies', [
    '$rootScope',
    '$browser',
    function ($rootScope, $browser) {
      var cookies = {}, lastCookies = {}, lastBrowserCookies, runEval = false, copy = angular.copy, isUndefined = angular.isUndefined;
      $browser.addPollFn(function () {
        var currentCookies = $browser.cookies();
        if (lastBrowserCookies != currentCookies) {
          lastBrowserCookies = currentCookies;
          copy(currentCookies, lastCookies);
          copy(currentCookies, cookies);
          if (runEval)
            $rootScope.$apply();
        }
      })();
      runEval = true;
      $rootScope.$watch(push);
      return cookies;
      function push() {
        var name, value, browserCookies, updated;
        for (name in lastCookies) {
          if (isUndefined(cookies[name])) {
            $browser.cookies(name, undefined);
          }
        }
        for (name in cookies) {
          value = cookies[name];
          if (!angular.isString(value)) {
            if (angular.isDefined(lastCookies[name])) {
              cookies[name] = lastCookies[name];
            } else {
              delete cookies[name];
            }
          } else if (value !== lastCookies[name]) {
            $browser.cookies(name, value);
            updated = true;
          }
        }
        if (updated) {
          updated = false;
          browserCookies = $browser.cookies();
          for (name in cookies) {
            if (cookies[name] !== browserCookies[name]) {
              if (isUndefined(browserCookies[name])) {
                delete cookies[name];
              } else {
                cookies[name] = browserCookies[name];
              }
              updated = true;
            }
          }
        }
      }
    }
  ]).factory('$cookieStore', [
    '$cookies',
    function ($cookies) {
      return {
        get: function (key) {
          var value = $cookies[key];
          return value ? angular.fromJson(value) : value;
        },
        put: function (key, value) {
          $cookies[key] = angular.toJson(value);
        },
        remove: function (key) {
          delete $cookies[key];
        }
      };
    }
  ]);
}(window, window.angular));
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngResource', ['ng']).factory('$resource', [
    '$http',
    '$parse',
    function ($http, $parse) {
      var DEFAULT_ACTIONS = {
          'get': { method: 'GET' },
          'save': { method: 'POST' },
          'query': {
            method: 'GET',
            isArray: true
          },
          'remove': { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        };
      var noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
      }
      function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
      }
      function Route(template, defaults) {
        this.template = template = template + '#';
        this.defaults = defaults || {};
        var urlParams = this.urlParams = {};
        forEach(template.split(/\W/), function (param) {
          if (param && new RegExp('(^|[^\\\\]):' + param + '\\W').test(template)) {
            urlParams[param] = true;
          }
        });
        this.template = template.replace(/\\:/g, ':');
      }
      Route.prototype = {
        url: function (params) {
          var self = this, url = this.template, val, encodedVal;
          params = params || {};
          forEach(this.urlParams, function (_, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
            if (angular.isDefined(val) && val !== null) {
              encodedVal = encodeUriSegment(val);
              url = url.replace(new RegExp(':' + urlParam + '(\\W)', 'g'), encodedVal + '$1');
            } else {
              url = url.replace(new RegExp('(/?):' + urlParam + '(\\W)', 'g'), function (match, leadingSlashes, tail) {
                if (tail.charAt(0) == '/') {
                  return tail;
                } else {
                  return leadingSlashes + tail;
                }
              });
            }
          });
          url = url.replace(/\/?#$/, '');
          var query = [];
          forEach(params, function (value, key) {
            if (!self.urlParams[key]) {
              query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
            }
          });
          query.sort();
          url = url.replace(/\/*$/, '');
          return url + (query.length ? '?' + query.join('&') : '');
        }
      };
      function ResourceFactory(url, paramDefaults, actions) {
        var route = new Route(url);
        actions = extend({}, DEFAULT_ACTIONS, actions);
        function extractParams(data, actionParams) {
          var ids = {};
          actionParams = extend({}, paramDefaults, actionParams);
          forEach(actionParams, function (value, key) {
            ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
          });
          return ids;
        }
        function Resource(value) {
          copy(value || {}, this);
        }
        forEach(actions, function (action, name) {
          action.method = angular.uppercase(action.method);
          var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
          Resource[name] = function (a1, a2, a3, a4) {
            var params = {};
            var data;
            var success = noop;
            var error = null;
            switch (arguments.length) {
            case 4:
              error = a4;
              success = a3;
            case 3:
            case 2:
              if (isFunction(a2)) {
                if (isFunction(a1)) {
                  success = a1;
                  error = a2;
                  break;
                }
                success = a2;
                error = a3;
              } else {
                params = a1;
                data = a2;
                success = a3;
                break;
              }
            case 1:
              if (isFunction(a1))
                success = a1;
              else if (hasBody)
                data = a1;
              else
                params = a1;
              break;
            case 0:
              break;
            default:
              throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
            }
            var value = this instanceof Resource ? this : action.isArray ? [] : new Resource(data);
            $http({
              method: action.method,
              url: route.url(extend({}, extractParams(data, action.params || {}), params)),
              data: data
            }).then(function (response) {
              var data = response.data;
              if (data) {
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function (item) {
                    value.push(new Resource(item));
                  });
                } else {
                  copy(data, value);
                }
              }
              (success || noop)(value, response.headers);
            }, error);
            return value;
          };
          Resource.prototype['$' + name] = function (a1, a2, a3) {
            var params = extractParams(this), success = noop, error;
            switch (arguments.length) {
            case 3:
              params = a1;
              success = a2;
              error = a3;
              break;
            case 2:
            case 1:
              if (isFunction(a1)) {
                success = a1;
                error = a2;
              } else {
                params = a1;
                success = a2 || noop;
              }
            case 0:
              break;
            default:
              throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
            }
            var data = hasBody ? this : undefined;
            Resource[name].call(this, params, data, success, error);
          };
        });
        Resource.bind = function (additionalParamDefaults) {
          return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
        };
        return Resource;
      }
      return ResourceFactory;
    }
  ]);
}(window, window.angular));
angular.module('ui.bootstrap', [
  'ui.bootstrap.tpls',
  'ui.bootstrap.transition',
  'ui.bootstrap.collapse',
  'ui.bootstrap.accordion',
  'ui.bootstrap.alert',
  'ui.bootstrap.buttons',
  'ui.bootstrap.carousel',
  'ui.bootstrap.dialog',
  'ui.bootstrap.dropdownToggle',
  'ui.bootstrap.modal',
  'ui.bootstrap.pagination',
  'ui.bootstrap.position',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.popover',
  'ui.bootstrap.progressbar',
  'ui.bootstrap.rating',
  'ui.bootstrap.tabs',
  'ui.bootstrap.typeahead'
]);
angular.module('ui.bootstrap.tpls', [
  'template/accordion/accordion-group.html',
  'template/accordion/accordion.html',
  'template/alert/alert.html',
  'template/carousel/carousel.html',
  'template/carousel/slide.html',
  'template/dialog/message.html',
  'template/pagination/pagination.html',
  'template/tooltip/tooltip-html-unsafe-popup.html',
  'template/tooltip/tooltip-popup.html',
  'template/popover/popover.html',
  'template/progressbar/bar.html',
  'template/progressbar/progress.html',
  'template/rating/rating.html',
  'template/tabs/pane.html',
  'template/tabs/tabs.html',
  'template/typeahead/typeahead.html'
]);
angular.module('ui.bootstrap.transition', []).factory('$transition', [
  '$q',
  '$timeout',
  '$rootScope',
  function ($q, $timeout, $rootScope) {
    var $transition = function (element, trigger, options) {
      options = options || {};
      var deferred = $q.defer();
      var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];
      var transitionEndHandler = function (event) {
        $rootScope.$apply(function () {
          element.unbind(endEventName, transitionEndHandler);
          deferred.resolve(element);
        });
      };
      if (endEventName) {
        element.bind(endEventName, transitionEndHandler);
      }
      $timeout(function () {
        if (angular.isString(trigger)) {
          element.addClass(trigger);
        } else if (angular.isFunction(trigger)) {
          trigger(element);
        } else if (angular.isObject(trigger)) {
          element.css(trigger);
        }
        if (!endEventName) {
          deferred.resolve(element);
        }
      });
      deferred.promise.cancel = function () {
        if (endEventName) {
          element.unbind(endEventName, transitionEndHandler);
        }
        deferred.reject('Transition cancelled');
      };
      return deferred.promise;
    };
    var transElement = document.createElement('trans');
    var transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionend'
      };
    var animationEndEventNames = {
        'WebkitTransition': 'webkitAnimationEnd',
        'MozTransition': 'animationend',
        'OTransition': 'oAnimationEnd',
        'transition': 'animationend'
      };
    function findEndEventName(endEventNames) {
      for (var name in endEventNames) {
        if (transElement.style[name] !== undefined) {
          return endEventNames[name];
        }
      }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
  }
]);
angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
  '$transition',
  function ($transition) {
    var fixUpHeight = function (scope, element, height) {
      element.removeClass('collapse');
      element.css({ height: height });
      var x = element[0].offsetWidth;
      element.addClass('collapse');
    };
    return {
      link: function (scope, element, attrs) {
        var isCollapsed;
        var initialAnimSkip = true;
        scope.$watch(function () {
          return element[0].scrollHeight;
        }, function (value) {
          if (element[0].scrollHeight !== 0) {
            if (!isCollapsed) {
              if (initialAnimSkip) {
                fixUpHeight(scope, element, element[0].scrollHeight + 'px');
              } else {
                fixUpHeight(scope, element, 'auto');
              }
            }
          }
        });
        scope.$watch(attrs.collapse, function (value) {
          if (value) {
            collapse();
          } else {
            expand();
          }
        });
        var currentTransition;
        var doTransition = function (change) {
          if (currentTransition) {
            currentTransition.cancel();
          }
          currentTransition = $transition(element, change);
          currentTransition.then(function () {
            currentTransition = undefined;
          }, function () {
            currentTransition = undefined;
          });
          return currentTransition;
        };
        var expand = function () {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            if (!isCollapsed) {
              fixUpHeight(scope, element, 'auto');
            }
          } else {
            doTransition({ height: element[0].scrollHeight + 'px' }).then(function () {
              if (!isCollapsed) {
                fixUpHeight(scope, element, 'auto');
              }
            });
          }
          isCollapsed = false;
        };
        var collapse = function () {
          isCollapsed = true;
          if (initialAnimSkip) {
            initialAnimSkip = false;
            fixUpHeight(scope, element, 0);
          } else {
            fixUpHeight(scope, element, element[0].scrollHeight + 'px');
            doTransition({ 'height': '0' });
          }
        };
      }
    };
  }
]);
angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: true }).controller('AccordionController', [
  '$scope',
  '$attrs',
  'accordionConfig',
  function ($scope, $attrs, accordionConfig) {
    this.groups = [];
    this.closeOthers = function (openGroup) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
      if (closeOthers) {
        angular.forEach(this.groups, function (group) {
          if (group !== openGroup) {
            group.isOpen = false;
          }
        });
      }
    };
    this.addGroup = function (groupScope) {
      var that = this;
      this.groups.push(groupScope);
      groupScope.$on('$destroy', function (event) {
        that.removeGroup(groupScope);
      });
    };
    this.removeGroup = function (group) {
      var index = this.groups.indexOf(group);
      if (index !== -1) {
        this.groups.splice(this.groups.indexOf(group), 1);
      }
    };
  }
]).directive('accordion', function () {
  return {
    restrict: 'EA',
    controller: 'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html'
  };
}).directive('accordionGroup', [
  '$parse',
  '$transition',
  '$timeout',
  function ($parse, $transition, $timeout) {
    return {
      require: '^accordion',
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'template/accordion/accordion-group.html',
      scope: { heading: '@' },
      controller: [
        '$scope',
        function ($scope) {
          this.setHeading = function (element) {
            this.heading = element;
          };
        }
      ],
      link: function (scope, element, attrs, accordionCtrl) {
        var getIsOpen, setIsOpen;
        accordionCtrl.addGroup(scope);
        scope.isOpen = false;
        if (attrs.isOpen) {
          getIsOpen = $parse(attrs.isOpen);
          setIsOpen = getIsOpen.assign;
          scope.$watch(function watchIsOpen() {
            return getIsOpen(scope.$parent);
          }, function updateOpen(value) {
            scope.isOpen = value;
          });
          scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
        }
        scope.$watch('isOpen', function (value) {
          if (value) {
            accordionCtrl.closeOthers(scope);
          }
          if (setIsOpen) {
            setIsOpen(scope.$parent, value);
          }
        });
      }
    };
  }
]).directive('accordionHeading', function () {
  return {
    restrict: 'E',
    transclude: true,
    template: '',
    replace: true,
    require: '^accordionGroup',
    compile: function (element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        accordionGroupCtrl.setHeading(transclude(scope, function () {
        }));
      };
    }
  };
}).directive('accordionTransclude', function () {
  return {
    require: '^accordionGroup',
    link: function (scope, element, attr, controller) {
      scope.$watch(function () {
        return controller[attr.accordionTransclude];
      }, function (heading) {
        if (heading) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});
angular.module('ui.bootstrap.alert', []).directive('alert', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/alert/alert.html',
    transclude: true,
    replace: true,
    scope: {
      type: '=',
      close: '&'
    },
    link: function (scope, iElement, iAttrs, controller) {
      scope.closeable = 'close' in iAttrs;
    }
  };
});
angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
}).directive('btnRadio', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var value = scope.$eval(attrs.btnRadio);
        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          if (angular.equals(modelValue, value)) {
            element.addClass(activeClass);
          } else {
            element.removeClass(activeClass);
          }
        });
        element.bind(toggleEvent, function () {
          if (!element.hasClass(activeClass)) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(value);
            });
          }
        });
      }
    };
  }
]).directive('btnCheckbox', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var trueValue = scope.$eval(attrs.btnCheckboxTrue);
        var falseValue = scope.$eval(attrs.btnCheckboxFalse);
        trueValue = angular.isDefined(trueValue) ? trueValue : true;
        falseValue = angular.isDefined(falseValue) ? falseValue : false;
        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          if (angular.equals(modelValue, trueValue)) {
            element.addClass(activeClass);
          } else {
            element.removeClass(activeClass);
          }
        });
        element.bind(toggleEvent, function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? falseValue : trueValue);
          });
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
  '$scope',
  '$timeout',
  '$transition',
  '$q',
  function ($scope, $timeout, $transition, $q) {
    var self = this, slides = self.slides = [], currentIndex = -1, currentTimeout, isPlaying;
    self.currentSlide = null;
    self.select = function (nextSlide, direction) {
      var nextIndex = slides.indexOf(nextSlide);
      if (direction === undefined) {
        direction = nextIndex > currentIndex ? 'next' : 'prev';
      }
      if (nextSlide && nextSlide !== self.currentSlide) {
        if ($scope.$currentTransition) {
          $scope.$currentTransition.cancel();
          $timeout(goNext);
        } else {
          goNext();
        }
      }
      function goNext() {
        if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
          nextSlide.$element.addClass(direction);
          nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth;
          angular.forEach(slides, function (slide) {
            angular.extend(slide, {
              direction: '',
              entering: false,
              leaving: false,
              active: false
            });
          });
          angular.extend(nextSlide, {
            direction: direction,
            active: true,
            entering: true
          });
          angular.extend(self.currentSlide || {}, {
            direction: direction,
            leaving: true
          });
          $scope.$currentTransition = $transition(nextSlide.$element, {});
          (function (next, current) {
            $scope.$currentTransition.then(function () {
              transitionDone(next, current);
            }, function () {
              transitionDone(next, current);
            });
          }(nextSlide, self.currentSlide));
        } else {
          transitionDone(nextSlide, self.currentSlide);
        }
        self.currentSlide = nextSlide;
        currentIndex = nextIndex;
        restartTimer();
      }
      function transitionDone(next, current) {
        angular.extend(next, {
          direction: '',
          active: true,
          leaving: false,
          entering: false
        });
        angular.extend(current || {}, {
          direction: '',
          active: false,
          leaving: false,
          entering: false
        });
        $scope.$currentTransition = null;
      }
    };
    self.indexOfSlide = function (slide) {
      return slides.indexOf(slide);
    };
    $scope.next = function () {
      var newIndex = (currentIndex + 1) % slides.length;
      return self.select(slides[newIndex], 'next');
    };
    $scope.prev = function () {
      var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
      return self.select(slides[newIndex], 'prev');
    };
    $scope.select = function (slide) {
      self.select(slide);
    };
    $scope.isActive = function (slide) {
      return self.currentSlide === slide;
    };
    $scope.slides = function () {
      return slides;
    };
    $scope.$watch('interval', restartTimer);
    function restartTimer() {
      if (currentTimeout) {
        $timeout.cancel(currentTimeout);
      }
      function go() {
        if (isPlaying) {
          $scope.next();
          restartTimer();
        } else {
          $scope.pause();
        }
      }
      var interval = +$scope.interval;
      if (!isNaN(interval) && interval >= 0) {
        currentTimeout = $timeout(go, interval);
      }
    }
    $scope.play = function () {
      if (!isPlaying) {
        isPlaying = true;
        restartTimer();
      }
    };
    $scope.pause = function () {
      isPlaying = false;
      if (currentTimeout) {
        $timeout.cancel(currentTimeout);
      }
    };
    self.addSlide = function (slide, element) {
      slide.$element = element;
      slides.push(slide);
      if (slides.length === 1 || slide.active) {
        self.select(slides[slides.length - 1]);
        if (slides.length == 1) {
          $scope.play();
        }
      } else {
        slide.active = false;
      }
    };
    self.removeSlide = function (slide) {
      var index = slides.indexOf(slide);
      slides.splice(index, 1);
      if (slides.length > 0 && slide.active) {
        if (index >= slides.length) {
          self.select(slides[index - 1]);
        } else {
          self.select(slides[index]);
        }
      }
    };
  }
]).directive('carousel', [function () {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      controller: 'CarouselController',
      require: 'carousel',
      templateUrl: 'template/carousel/carousel.html',
      scope: {
        interval: '=',
        noTransition: '='
      }
    };
  }]).directive('slide', [function () {
    return {
      require: '^carousel',
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'template/carousel/slide.html',
      scope: { active: '=' },
      link: function (scope, element, attrs, carouselCtrl) {
        carouselCtrl.addSlide(scope, element);
        scope.$on('$destroy', function () {
          carouselCtrl.removeSlide(scope);
        });
        scope.$watch('active', function (active) {
          if (active) {
            carouselCtrl.select(scope);
          }
        });
      }
    };
  }]);
var dialogModule = angular.module('ui.bootstrap.dialog', ['ui.bootstrap.transition']);
dialogModule.controller('MessageBoxController', [
  '$scope',
  'dialog',
  'model',
  function ($scope, dialog, model) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.close = function (res) {
      dialog.close(res);
    };
  }
]);
dialogModule.provider('$dialog', function () {
  var defaults = {
      backdrop: true,
      dialogClass: 'modal',
      backdropClass: 'modal-backdrop',
      transitionClass: 'fade',
      triggerClass: 'in',
      dialogOpenClass: 'modal-open',
      resolve: {},
      backdropFade: false,
      dialogFade: false,
      keyboard: true,
      backdropClick: true
    };
  var globalOptions = {};
  var activeBackdrops = { value: 0 };
  this.options = function (value) {
    globalOptions = value;
  };
  this.$get = [
    '$http',
    '$document',
    '$compile',
    '$rootScope',
    '$controller',
    '$templateCache',
    '$q',
    '$transition',
    '$injector',
    function ($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $transition, $injector) {
      var body = $document.find('body');
      function createElement(clazz) {
        var el = angular.element('<div>');
        el.addClass(clazz);
        return el;
      }
      function Dialog(opts) {
        var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);
        this._open = false;
        this.backdropEl = createElement(options.backdropClass);
        if (options.backdropFade) {
          this.backdropEl.addClass(options.transitionClass);
          this.backdropEl.removeClass(options.triggerClass);
        }
        this.modalEl = createElement(options.dialogClass);
        if (options.dialogFade) {
          this.modalEl.addClass(options.transitionClass);
          this.modalEl.removeClass(options.triggerClass);
        }
        this.handledEscapeKey = function (e) {
          if (e.which === 27) {
            self.close();
            e.preventDefault();
            self.$scope.$apply();
          }
        };
        this.handleBackDropClick = function (e) {
          self.close();
          e.preventDefault();
          self.$scope.$apply();
        };
        this.handleLocationChange = function () {
          self.close();
        };
      }
      Dialog.prototype.isOpen = function () {
        return this._open;
      };
      Dialog.prototype.open = function (templateUrl, controller) {
        var self = this, options = this.options;
        if (templateUrl) {
          options.templateUrl = templateUrl;
        }
        if (controller) {
          options.controller = controller;
        }
        if (!(options.template || options.templateUrl)) {
          throw new Error('Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.');
        }
        this._loadResolves().then(function (locals) {
          var $scope = locals.$scope = self.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
          self.modalEl.html(locals.$template);
          if (self.options.controller) {
            var ctrl = $controller(self.options.controller, locals);
            self.modalEl.children().data('ngControllerController', ctrl);
          }
          $compile(self.modalEl)($scope);
          self._addElementsToDom();
          body.addClass(self.options.dialogOpenClass);
          setTimeout(function () {
            if (self.options.dialogFade) {
              self.modalEl.addClass(self.options.triggerClass);
            }
            if (self.options.backdropFade) {
              self.backdropEl.addClass(self.options.triggerClass);
            }
          });
          self._bindEvents();
        });
        this.deferred = $q.defer();
        return this.deferred.promise;
      };
      Dialog.prototype.close = function (result) {
        var self = this;
        var fadingElements = this._getFadingElements();
        body.removeClass(self.options.dialogOpenClass);
        if (fadingElements.length > 0) {
          for (var i = fadingElements.length - 1; i >= 0; i--) {
            $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
          }
          return;
        }
        this._onCloseComplete(result);
        function removeTriggerClass(el) {
          el.removeClass(self.options.triggerClass);
        }
        function onCloseComplete() {
          if (self._open) {
            self._onCloseComplete(result);
          }
        }
      };
      Dialog.prototype._getFadingElements = function () {
        var elements = [];
        if (this.options.dialogFade) {
          elements.push(this.modalEl);
        }
        if (this.options.backdropFade) {
          elements.push(this.backdropEl);
        }
        return elements;
      };
      Dialog.prototype._bindEvents = function () {
        if (this.options.keyboard) {
          body.bind('keydown', this.handledEscapeKey);
        }
        if (this.options.backdrop && this.options.backdropClick) {
          this.backdropEl.bind('click', this.handleBackDropClick);
        }
        this.$scope.$on('$locationChangeSuccess', this.handleLocationChange);
      };
      Dialog.prototype._unbindEvents = function () {
        if (this.options.keyboard) {
          body.unbind('keydown', this.handledEscapeKey);
        }
        if (this.options.backdrop && this.options.backdropClick) {
          this.backdropEl.unbind('click', this.handleBackDropClick);
        }
      };
      Dialog.prototype._onCloseComplete = function (result) {
        this._removeElementsFromDom();
        this._unbindEvents();
        this.deferred.resolve(result);
      };
      Dialog.prototype._addElementsToDom = function () {
        body.append(this.modalEl);
        if (this.options.backdrop) {
          if (activeBackdrops.value === 0) {
            body.append(this.backdropEl);
          }
          activeBackdrops.value++;
        }
        this._open = true;
      };
      Dialog.prototype._removeElementsFromDom = function () {
        this.modalEl.remove();
        if (this.options.backdrop) {
          activeBackdrops.value--;
          if (activeBackdrops.value === 0) {
            this.backdropEl.remove();
          }
        }
        this._open = false;
      };
      Dialog.prototype._loadResolves = function () {
        var values = [], keys = [], templatePromise, self = this;
        if (this.options.template) {
          templatePromise = $q.when(this.options.template);
        } else if (this.options.templateUrl) {
          templatePromise = $http.get(this.options.templateUrl, { cache: $templateCache }).then(function (response) {
            return response.data;
          });
        }
        angular.forEach(this.options.resolve || [], function (value, key) {
          keys.push(key);
          values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
        });
        keys.push('$template');
        values.push(templatePromise);
        return $q.all(values).then(function (values) {
          var locals = {};
          angular.forEach(values, function (value, index) {
            locals[keys[index]] = value;
          });
          locals.dialog = self;
          return locals;
        });
      };
      return {
        dialog: function (opts) {
          return new Dialog(opts);
        },
        messageBox: function (title, message, buttons) {
          return new Dialog({
            templateUrl: 'template/dialog/message.html',
            controller: 'MessageBoxController',
            resolve: {
              model: function () {
                return {
                  title: title,
                  message: message,
                  buttons: buttons
                };
              }
            }
          });
        }
      };
    }
  ];
});
angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', [
  '$document',
  '$location',
  '$window',
  function ($document, $location, $window) {
    var openElement = null, closeMenu = angular.noop;
    return {
      restrict: 'CA',
      link: function (scope, element, attrs) {
        scope.$watch('$location.path', function () {
          closeMenu();
        });
        element.parent().bind('click', function () {
          closeMenu();
        });
        element.bind('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var elementWasOpen = element === openElement;
          if (!!openElement) {
            closeMenu();
          }
          if (!elementWasOpen) {
            element.parent().addClass('open');
            openElement = element;
            closeMenu = function (event) {
              if (event) {
                event.preventDefault();
                event.stopPropagation();
              }
              $document.unbind('click', closeMenu);
              element.parent().removeClass('open');
              closeMenu = angular.noop;
              openElement = null;
            };
            $document.bind('click', closeMenu);
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.modal', ['ui.bootstrap.dialog']).directive('modal', [
  '$parse',
  '$dialog',
  function ($parse, $dialog) {
    return {
      restrict: 'EA',
      terminal: true,
      link: function (scope, elm, attrs) {
        var opts = angular.extend({}, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
        var shownExpr = attrs.modal || attrs.show;
        var setClosed;
        opts = angular.extend(opts, {
          template: elm.html(),
          resolve: {
            $scope: function () {
              return scope;
            }
          }
        });
        var dialog = $dialog.dialog(opts);
        elm.remove();
        if (attrs.close) {
          setClosed = function () {
            $parse(attrs.close)(scope);
          };
        } else {
          setClosed = function () {
            if (angular.isFunction($parse(shownExpr).assign)) {
              $parse(shownExpr).assign(scope, false);
            }
          };
        }
        scope.$watch(shownExpr, function (isShown, oldShown) {
          if (isShown) {
            dialog.open().then(function () {
              setClosed();
            });
          } else {
            if (dialog.isOpen()) {
              dialog.close();
            }
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.pagination', []).constant('paginationConfig', {
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last'
}).directive('pagination', [
  'paginationConfig',
  function (paginationConfig) {
    return {
      restrict: 'EA',
      scope: {
        numPages: '=',
        currentPage: '=',
        maxSize: '=',
        onSelectPage: '&'
      },
      templateUrl: 'template/pagination/pagination.html',
      replace: true,
      link: function (scope, element, attrs) {
        var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
        var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
        var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
        var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
        var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
        var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;
        function makePage(number, text, isActive, isDisabled) {
          return {
            number: number,
            text: text,
            active: isActive,
            disabled: isDisabled
          };
        }
        scope.$watch('numPages + currentPage + maxSize', function () {
          scope.pages = [];
          var startPage = 1, endPage = scope.numPages;
          if (scope.maxSize && scope.maxSize < scope.numPages) {
            startPage = Math.max(scope.currentPage - Math.floor(scope.maxSize / 2), 1);
            endPage = startPage + scope.maxSize - 1;
            if (endPage > scope.numPages) {
              endPage = scope.numPages;
              startPage = endPage - scope.maxSize + 1;
            }
          }
          for (var number = startPage; number <= endPage; number++) {
            var page = makePage(number, number, scope.isActive(number), false);
            scope.pages.push(page);
          }
          if (directionLinks) {
            var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
            scope.pages.unshift(previousPage);
            var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
            scope.pages.push(nextPage);
          }
          if (boundaryLinks) {
            var firstPage = makePage(1, firstText, false, scope.noPrevious());
            scope.pages.unshift(firstPage);
            var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
            scope.pages.push(lastPage);
          }
          if (scope.currentPage > scope.numPages) {
            scope.selectPage(scope.numPages);
          }
        });
        scope.noPrevious = function () {
          return scope.currentPage === 1;
        };
        scope.noNext = function () {
          return scope.currentPage === scope.numPages;
        };
        scope.isActive = function (page) {
          return scope.currentPage === page;
        };
        scope.selectPage = function (page) {
          if (!scope.isActive(page) && page > 0 && page <= scope.numPages) {
            scope.currentPage = page;
            scope.onSelectPage({ page: page });
          }
        };
      }
    };
  }
]);
angular.module('ui.bootstrap.position', []).factory('$position', [
  '$document',
  '$window',
  function ($document, $window) {
    function getStyle(el, cssprop) {
      if (el.currentStyle) {
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      return el.style[cssprop];
    }
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static') === 'static';
    }
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };
    return {
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = {
            top: 0,
            left: 0
          };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop;
          offsetParentBCR.left += offsetParentEl.clientLeft;
        }
        return {
          width: element.prop('offsetWidth'),
          height: element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: element.prop('offsetWidth'),
          height: element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft)
        };
      }
    };
  }
]);
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position']).provider('$tooltip', function () {
  var defaultOptions = {
      placement: 'top',
      animation: true,
      popupDelay: 0
    };
  var triggerMap = {
      'mouseenter': 'mouseleave',
      'click': 'click',
      'focus': 'blur'
    };
  var globalOptions = {};
  this.options = function (value) {
    angular.extend(globalOptions, value);
  };
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  this.$get = [
    '$window',
    '$compile',
    '$timeout',
    '$parse',
    '$document',
    '$position',
    function ($window, $compile, $timeout, $parse, $document, $position) {
      return function $tooltip(type, prefix, defaultTriggerShow) {
        var options = angular.extend({}, defaultOptions, globalOptions);
        function setTriggers(trigger) {
          var show, hide;
          show = trigger || options.trigger || defaultTriggerShow;
          if (angular.isDefined(options.trigger)) {
            hide = triggerMap[options.trigger] || show;
          } else {
            hide = triggerMap[show] || show;
          }
          return {
            show: show,
            hide: hide
          };
        }
        var directiveName = snake_case(type);
        var triggers = setTriggers(undefined);
        var template = '<' + directiveName + '-popup ' + 'title="{{tt_title}}" ' + 'content="{{tt_content}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</' + directiveName + '-popup>';
        return {
          restrict: 'EA',
          scope: true,
          link: function link(scope, element, attrs) {
            var tooltip = $compile(template)(scope);
            var transitionTimeout;
            var popupTimeout;
            var $body;
            scope.tt_isOpen = false;
            function toggleTooltipBind() {
              if (!scope.tt_isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }
            function showTooltipBind() {
              if (scope.tt_popupDelay) {
                popupTimeout = $timeout(show, scope.tt_popupDelay);
              } else {
                scope.$apply(show);
              }
            }
            function hideTooltipBind() {
              scope.$apply(function () {
                hide();
              });
            }
            function show() {
              var position, ttWidth, ttHeight, ttPosition;
              if (!scope.tt_content) {
                return;
              }
              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
              }
              tooltip.css({
                top: 0,
                left: 0,
                display: 'block'
              });
              if (options.appendToBody) {
                $body = $body || $document.find('body');
                $body.append(tooltip);
              } else {
                element.after(tooltip);
              }
              position = $position.position(element);
              ttWidth = tooltip.prop('offsetWidth');
              ttHeight = tooltip.prop('offsetHeight');
              switch (scope.tt_placement) {
              case 'right':
                ttPosition = {
                  top: position.top + position.height / 2 - ttHeight / 2 + 'px',
                  left: position.left + position.width + 'px'
                };
                break;
              case 'bottom':
                ttPosition = {
                  top: position.top + position.height + 'px',
                  left: position.left + position.width / 2 - ttWidth / 2 + 'px'
                };
                break;
              case 'left':
                ttPosition = {
                  top: position.top + position.height / 2 - ttHeight / 2 + 'px',
                  left: position.left - ttWidth + 'px'
                };
                break;
              default:
                ttPosition = {
                  top: position.top - ttHeight + 'px',
                  left: position.left + position.width / 2 - ttWidth / 2 + 'px'
                };
                break;
              }
              tooltip.css(ttPosition);
              scope.tt_isOpen = true;
            }
            function hide() {
              scope.tt_isOpen = false;
              $timeout.cancel(popupTimeout);
              if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
                transitionTimeout = $timeout(function () {
                  tooltip.remove();
                }, 500);
              } else {
                tooltip.remove();
              }
            }
            attrs.$observe(type, function (val) {
              scope.tt_content = val;
            });
            attrs.$observe(prefix + 'Title', function (val) {
              scope.tt_title = val;
            });
            attrs.$observe(prefix + 'Placement', function (val) {
              scope.tt_placement = angular.isDefined(val) ? val : options.placement;
            });
            attrs.$observe(prefix + 'Animation', function (val) {
              scope.tt_animation = angular.isDefined(val) ? $parse(val) : function () {
                return options.animation;
              };
            });
            attrs.$observe(prefix + 'PopupDelay', function (val) {
              var delay = parseInt(val, 10);
              scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
            });
            attrs.$observe(prefix + 'Trigger', function (val) {
              element.unbind(triggers.show);
              element.unbind(triggers.hide);
              triggers = setTriggers(val);
              if (triggers.show === triggers.hide) {
                element.bind(triggers.show, toggleTooltipBind);
              } else {
                element.bind(triggers.show, showTooltipBind);
                element.bind(triggers.hide, hideTooltipBind);
              }
            });
          }
        };
      };
    }
  ];
}).directive('tooltipPopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
}).directive('tooltip', [
  '$tooltip',
  function ($tooltip) {
    return $tooltip('tooltip', 'tooltip', 'mouseenter');
  }
]).directive('tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
}).directive('tooltipHtmlUnsafe', [
  '$tooltip',
  function ($tooltip) {
    return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
  }
]);
;
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip']).directive('popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      title: '@',
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/popover/popover.html'
  };
}).directive('popover', [
  '$compile',
  '$timeout',
  '$parse',
  '$window',
  '$tooltip',
  function ($compile, $timeout, $parse, $window, $tooltip) {
    return $tooltip('popover', 'popover', 'click');
  }
]);
angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition']).constant('progressConfig', {
  animate: true,
  autoType: false,
  stackedTypes: [
    'success',
    'info',
    'warning',
    'danger'
  ]
}).controller('ProgressBarController', [
  '$scope',
  '$attrs',
  'progressConfig',
  function ($scope, $attrs, progressConfig) {
    var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
    var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
    var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval('[' + $attrs.stackedTypes + ']') : progressConfig.stackedTypes;
    this.makeBar = function (newBar, oldBar, index) {
      var newValue = angular.isObject(newBar) ? newBar.value : newBar || 0;
      var oldValue = angular.isObject(oldBar) ? oldBar.value : oldBar || 0;
      var type = angular.isObject(newBar) && angular.isDefined(newBar.type) ? newBar.type : autoType ? getStackedType(index || 0) : null;
      return {
        from: oldValue,
        to: newValue,
        type: type,
        animate: animate
      };
    };
    function getStackedType(index) {
      return stackedTypes[index];
    }
    this.addBar = function (bar) {
      $scope.bars.push(bar);
      $scope.totalPercent += bar.to;
    };
    this.clearBars = function () {
      $scope.bars = [];
      $scope.totalPercent = 0;
    };
    this.clearBars();
  }
]).directive('progress', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: 'ProgressBarController',
    scope: {
      value: '=',
      onFull: '&',
      onEmpty: '&'
    },
    templateUrl: 'template/progressbar/progress.html',
    link: function (scope, element, attrs, controller) {
      scope.$watch('value', function (newValue, oldValue) {
        controller.clearBars();
        if (angular.isArray(newValue)) {
          for (var i = 0, n = newValue.length; i < n; i++) {
            controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
          }
        } else {
          controller.addBar(controller.makeBar(newValue, oldValue));
        }
      }, true);
      scope.$watch('totalPercent', function (value) {
        if (value >= 100) {
          scope.onFull();
        } else if (value <= 0) {
          scope.onEmpty();
        }
      }, true);
    }
  };
}).directive('progressbar', [
  '$transition',
  function ($transition) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        width: '=',
        old: '=',
        type: '=',
        animate: '='
      },
      templateUrl: 'template/progressbar/bar.html',
      link: function (scope, element) {
        scope.$watch('width', function (value) {
          if (scope.animate) {
            element.css('width', scope.old + '%');
            $transition(element, { width: value + '%' });
          } else {
            element.css('width', value + '%');
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.rating', []).constant('ratingConfig', { max: 5 }).directive('rating', [
  'ratingConfig',
  '$parse',
  function (ratingConfig, $parse) {
    return {
      restrict: 'EA',
      scope: { value: '=' },
      templateUrl: 'template/rating/rating.html',
      replace: true,
      link: function (scope, element, attrs) {
        var maxRange = angular.isDefined(attrs.max) ? scope.$eval(attrs.max) : ratingConfig.max;
        scope.range = [];
        for (var i = 1; i <= maxRange; i++) {
          scope.range.push(i);
        }
        scope.rate = function (value) {
          if (!scope.readonly) {
            scope.value = value;
          }
        };
        scope.enter = function (value) {
          if (!scope.readonly) {
            scope.val = value;
          }
        };
        scope.reset = function () {
          scope.val = angular.copy(scope.value);
        };
        scope.reset();
        scope.$watch('value', function (value) {
          scope.val = value;
        });
        scope.readonly = false;
        if (attrs.readonly) {
          scope.$parent.$watch($parse(attrs.readonly), function (value) {
            scope.readonly = !!value;
          });
        }
      }
    };
  }
]);
angular.module('ui.bootstrap.tabs', []).controller('TabsController', [
  '$scope',
  '$element',
  function ($scope, $element) {
    var panes = $scope.panes = [];
    this.select = $scope.select = function selectPane(pane) {
      angular.forEach(panes, function (pane) {
        pane.selected = false;
      });
      pane.selected = true;
    };
    this.addPane = function addPane(pane) {
      if (!panes.length) {
        $scope.select(pane);
      }
      panes.push(pane);
    };
    this.removePane = function removePane(pane) {
      var index = panes.indexOf(pane);
      panes.splice(index, 1);
      if (pane.selected && panes.length > 0) {
        $scope.select(panes[index < panes.length ? index : index - 1]);
      }
    };
  }
]).directive('tabs', function () {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: true
  };
}).directive('pane', [
  '$parse',
  function ($parse) {
    return {
      require: '^tabs',
      restrict: 'EA',
      transclude: true,
      scope: { heading: '@' },
      link: function (scope, element, attrs, tabsCtrl) {
        var getSelected, setSelected;
        scope.selected = false;
        if (attrs.active) {
          getSelected = $parse(attrs.active);
          setSelected = getSelected.assign;
          scope.$watch(function watchSelected() {
            return getSelected(scope.$parent);
          }, function updateSelected(value) {
            scope.selected = value;
          });
          scope.selected = getSelected ? getSelected(scope.$parent) : false;
        }
        scope.$watch('selected', function (selected) {
          if (selected) {
            tabsCtrl.select(scope);
          }
          if (setSelected) {
            setSelected(scope.$parent, selected);
          }
        });
        tabsCtrl.addPane(scope);
        scope.$on('$destroy', function () {
          tabsCtrl.removePane(scope);
        });
      },
      templateUrl: 'template/tabs/pane.html',
      replace: true
    };
  }
]);
angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position']).factory('typeaheadParser', [
  '$parse',
  function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
      parse: function (input) {
        var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
        if (!match) {
          throw new Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\'' + ' but got \'' + input + '\'.');
        }
        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }
]).directive('typeahead', [
  '$compile',
  '$parse',
  '$q',
  '$document',
  '$position',
  'typeaheadParser',
  function ($compile, $parse, $q, $document, $position, typeaheadParser) {
    var HOT_KEYS = [
        9,
        13,
        27,
        38,
        40
      ];
    return {
      require: 'ngModel',
      link: function (originalScope, element, attrs, modelCtrl) {
        var selected;
        var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
        var parserResult = typeaheadParser.parse(attrs.typeahead);
        var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
        var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;
        var popUpEl = angular.element('<typeahead-popup ' + 'matches=\'matches\' ' + 'active=\'activeIdx\' ' + 'select=\'select(activeIdx)\' ' + 'query=\'query\' ' + 'position=\'position\'>' + '</typeahead-popup>');
        var scope = originalScope.$new();
        originalScope.$on('$destroy', function () {
          scope.$destroy();
        });
        var resetMatches = function () {
          scope.matches = [];
          scope.activeIdx = -1;
        };
        var getMatchesAsync = function (inputValue) {
          var locals = { $viewValue: inputValue };
          isLoadingSetter(originalScope, true);
          $q.when(parserResult.source(scope, locals)).then(function (matches) {
            if (inputValue === modelCtrl.$viewValue) {
              if (matches.length > 0) {
                scope.activeIdx = 0;
                scope.matches.length = 0;
                for (var i = 0; i < matches.length; i++) {
                  locals[parserResult.itemName] = matches[i];
                  scope.matches.push({
                    label: parserResult.viewMapper(scope, locals),
                    model: matches[i]
                  });
                }
                scope.query = inputValue;
                scope.position = $position.position(element);
                scope.position.top = scope.position.top + element.prop('offsetHeight');
              } else {
                resetMatches();
              }
              isLoadingSetter(originalScope, false);
            }
          }, function () {
            resetMatches();
            isLoadingSetter(originalScope, false);
          });
        };
        resetMatches();
        scope.query = undefined;
        modelCtrl.$parsers.push(function (inputValue) {
          resetMatches();
          if (selected) {
            return inputValue;
          } else {
            if (inputValue && inputValue.length >= minSearch) {
              getMatchesAsync(inputValue);
            }
          }
          return isEditable ? inputValue : undefined;
        });
        modelCtrl.$render = function () {
          var locals = {};
          locals[parserResult.itemName] = selected || modelCtrl.$viewValue;
          element.val(parserResult.viewMapper(scope, locals) || modelCtrl.$viewValue);
          selected = undefined;
        };
        scope.select = function (activeIdx) {
          var locals = {};
          locals[parserResult.itemName] = selected = scope.matches[activeIdx].model;
          modelCtrl.$setViewValue(parserResult.modelMapper(scope, locals));
          modelCtrl.$render();
        };
        element.bind('keydown', function (evt) {
          if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
            return;
          }
          evt.preventDefault();
          if (evt.which === 40) {
            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
            scope.$digest();
          } else if (evt.which === 38) {
            scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
            scope.$digest();
          } else if (evt.which === 13 || evt.which === 9) {
            scope.$apply(function () {
              scope.select(scope.activeIdx);
            });
          } else if (evt.which === 27) {
            evt.stopPropagation();
            resetMatches();
            scope.$digest();
          }
        });
        $document.bind('click', function () {
          resetMatches();
          scope.$digest();
        });
        element.after($compile(popUpEl)(scope));
      }
    };
  }
]).directive('typeaheadPopup', function () {
  return {
    restrict: 'E',
    scope: {
      matches: '=',
      query: '=',
      active: '=',
      position: '=',
      select: '&'
    },
    replace: true,
    templateUrl: 'template/typeahead/typeahead.html',
    link: function (scope, element, attrs) {
      scope.isOpen = function () {
        return scope.matches.length > 0;
      };
      scope.isActive = function (matchIdx) {
        return scope.active == matchIdx;
      };
      scope.selectActive = function (matchIdx) {
        scope.active = matchIdx;
      };
      scope.selectMatch = function (activeIdx) {
        scope.select({ activeIdx: activeIdx });
      };
    }
  };
}).filter('typeaheadHighlight', function () {
  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
  return function (matchItem, query) {
    return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : query;
  };
});
angular.module('template/accordion/accordion-group.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion-group.html', '<div class="accordion-group">\n' + '  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>\n' + '  <div class="accordion-body" collapse="!isOpen">\n' + '    <div class="accordion-inner" ng-transclude></div>  </div>\n' + '</div>');
  }
]);
angular.module('template/accordion/accordion.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion.html', '<div class="accordion" ng-transclude></div>');
  }
]);
angular.module('template/alert/alert.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/alert/alert.html', '<div class=\'alert\' ng-class=\'type && "alert-" + type\'>\n' + '    <button ng-show=\'closeable\' type=\'button\' class=\'close\' ng-click=\'close()\'>&times;</button>\n' + '    <div ng-transclude></div>\n' + '</div>\n' + '');
  }
]);
angular.module('template/carousel/carousel.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n' + '    <ol class="carousel-indicators" ng-show="slides().length > 1">\n' + '        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n' + '    </ol>\n' + '    <div class="carousel-inner" ng-transclude></div>\n' + '    <a ng-click="prev()" class="carousel-control left" ng-show="slides().length > 1">&lsaquo;</a>\n' + '    <a ng-click="next()" class="carousel-control right" ng-show="slides().length > 1">&rsaquo;</a>\n' + '</div>\n' + '');
  }
]);
angular.module('template/carousel/slide.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/slide.html', '<div ng-class="{\n' + '    \'active\': leaving || (active && !entering),\n' + '    \'prev\': (next || active) && direction==\'prev\',\n' + '    \'next\': (next || active) && direction==\'next\',\n' + '    \'right\': direction==\'prev\',\n' + '    \'left\': direction==\'next\'\n' + '  }" class="item" ng-transclude></div>\n' + '');
  }
]);
angular.module('template/dialog/message.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/dialog/message.html', '<div class="modal-header">\n' + '\t<h1>{{ title }}</h1>\n' + '</div>\n' + '<div class="modal-body">\n' + '\t<p>{{ message }}</p>\n' + '</div>\n' + '<div class="modal-footer">\n' + '\t<button ng-repeat="btn in buttons" ng-click="close(btn.result)" class=btn ng-class="btn.cssClass">{{ btn.label }}</button>\n' + '</div>\n' + '');
  }
]);
angular.module('template/pagination/pagination.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/pagination/pagination.html', '<div class="pagination"><ul>\n' + '  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n' + '  </ul>\n' + '</div>\n' + '');
  }
]);
angular.module('template/tooltip/tooltip-html-unsafe-popup.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-html-unsafe-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" ng-bind-html-unsafe="content"></div>\n' + '</div>\n' + '');
  }
]);
angular.module('template/tooltip/tooltip-popup.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" ng-bind="content"></div>\n' + '</div>\n' + '');
  }
]);
angular.module('template/popover/popover.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="arrow"></div>\n' + '\n' + '  <div class="popover-inner">\n' + '      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n' + '      <div class="popover-content" ng-bind="content"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('template/progressbar/bar.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/progressbar/bar.html', '<div class="bar" ng-class=\'type && "bar-" + type\'></div>');
  }
]);
angular.module('template/progressbar/progress.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/progressbar/progress.html', '<div class="progress"><progressbar ng-repeat="bar in bars" width="bar.to" old="bar.from" animate="bar.animate" type="bar.type"></progressbar></div>');
  }
]);
angular.module('template/rating/rating.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/rating/rating.html', '<span ng-mouseleave="reset()">\n' + '\t<i ng-repeat="number in range" ng-mouseenter="enter(number)" ng-click="rate(number)" ng-class="{\'icon-star\': number <= val, \'icon-star-empty\': number > val}"></i>\n' + '</span>\n' + '');
  }
]);
angular.module('template/tabs/pane.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/pane.html', '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>\n' + '');
  }
]);
angular.module('template/tabs/tabs.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/tabs.html', '<div class="tabbable">\n' + '  <ul class="nav nav-tabs">\n' + '    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">\n' + '      <a ng-click="select(pane)">{{pane.heading}}</a>\n' + '    </li>\n' + '  </ul>\n' + '  <div class="tab-content" ng-transclude></div>\n' + '</div>\n' + '');
  }
]);
angular.module('template/typeahead/match.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/typeahead/match.html', '<a tabindex="-1" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>');
  }
]);
angular.module('template/typeahead/typeahead.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/typeahead/typeahead.html', '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n' + '    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">\n' + '        <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n' + '    </li>\n' + '</ul>');
  }
]);
(function ($) {
  var history_handle_top, timer, body, jwindow = $(window), styling = {
      jqueryui: {
        container: 'ui-widget ui-widget-content ui-corner-all',
        notice: 'ui-state-highlight',
        notice_icon: 'ui-icon ui-icon-info',
        info: '',
        info_icon: 'ui-icon ui-icon-info',
        success: 'ui-state-default',
        success_icon: 'ui-icon ui-icon-circle-check',
        error: 'ui-state-error',
        error_icon: 'ui-icon ui-icon-alert',
        closer: 'ui-icon ui-icon-close',
        pin_up: 'ui-icon ui-icon-pin-w',
        pin_down: 'ui-icon ui-icon-pin-s',
        hi_menu: 'ui-state-default ui-corner-bottom',
        hi_btn: 'ui-state-default ui-corner-all',
        hi_btnhov: 'ui-state-hover',
        hi_hnd: 'ui-icon ui-icon-grip-dotted-horizontal'
      },
      bootstrap: {
        container: 'alert',
        notice: '',
        notice_icon: 'icon-exclamation-sign',
        info: 'alert-info',
        info_icon: 'icon-info-sign',
        success: 'alert-success',
        success_icon: 'icon-ok-sign',
        error: 'alert-error',
        error_icon: 'icon-warning-sign',
        closer: 'icon-remove',
        pin_up: 'icon-pause',
        pin_down: 'icon-play',
        hi_menu: 'well',
        hi_btn: 'btn',
        hi_btnhov: '',
        hi_hnd: 'icon-chevron-down'
      }
    };
  var do_when_ready = function () {
    body = $('body');
    jwindow = $(window);
    jwindow.bind('resize', function () {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout($.pnotify_position_all, 10);
    });
  };
  if (document.body)
    do_when_ready();
  else
    $(do_when_ready);
  $.extend({
    pnotify_remove_all: function () {
      var notices_data = jwindow.data('pnotify');
      if (notices_data && notices_data.length) {
        $.each(notices_data, function () {
          if (this.pnotify_remove)
            this.pnotify_remove();
        });
      }
    },
    pnotify_position_all: function () {
      if (timer)
        clearTimeout(timer);
      timer = null;
      var notices_data = jwindow.data('pnotify');
      if (!notices_data || !notices_data.length)
        return;
      $.each(notices_data, function () {
        var s = this.opts.stack;
        if (!s)
          return;
        s.nextpos1 = s.firstpos1;
        s.nextpos2 = s.firstpos2;
        s.addpos2 = 0;
        s.animation = true;
      });
      $.each(notices_data, function () {
        this.pnotify_position();
      });
    },
    pnotify: function (options) {
      var animating;
      var opts;
      if (typeof options != 'object') {
        opts = $.extend({}, $.pnotify.defaults);
        opts.text = options;
      } else {
        opts = $.extend({}, $.pnotify.defaults, options);
      }
      for (var i in opts) {
        if (typeof i == 'string' && i.match(/^pnotify_/))
          opts[i.replace(/^pnotify_/, '')] = opts[i];
      }
      if (opts.before_init) {
        if (opts.before_init(opts) === false)
          return null;
      }
      var nonblock_last_elem;
      var nonblock_pass = function (e, e_name) {
        pnotify.css('display', 'none');
        var element_below = document.elementFromPoint(e.clientX, e.clientY);
        pnotify.css('display', 'block');
        var jelement_below = $(element_below);
        var cursor_style = jelement_below.css('cursor');
        pnotify.css('cursor', cursor_style != 'auto' ? cursor_style : 'default');
        if (!nonblock_last_elem || nonblock_last_elem.get(0) != element_below) {
          if (nonblock_last_elem) {
            dom_event.call(nonblock_last_elem.get(0), 'mouseleave', e.originalEvent);
            dom_event.call(nonblock_last_elem.get(0), 'mouseout', e.originalEvent);
          }
          dom_event.call(element_below, 'mouseenter', e.originalEvent);
          dom_event.call(element_below, 'mouseover', e.originalEvent);
        }
        dom_event.call(element_below, e_name, e.originalEvent);
        nonblock_last_elem = jelement_below;
      };
      var styles = styling[opts.styling];
      var pnotify = $('<div />', {
          'class': 'ui-pnotify ' + opts.addclass,
          'css': { 'display': 'none' },
          'mouseenter': function (e) {
            if (opts.nonblock)
              e.stopPropagation();
            if (opts.mouse_reset && animating == 'out') {
              pnotify.stop(true);
              animating = 'in';
              pnotify.css('height', 'auto').animate({
                'width': opts.width,
                'opacity': opts.nonblock ? opts.nonblock_opacity : opts.opacity
              }, 'fast');
            }
            if (opts.nonblock) {
              pnotify.animate({ 'opacity': opts.nonblock_opacity }, 'fast');
            }
            if (opts.hide && opts.mouse_reset)
              pnotify.pnotify_cancel_remove();
            if (opts.sticker && !opts.nonblock)
              pnotify.sticker.trigger('pnotify_icon').css('visibility', 'visible');
            if (opts.closer && !opts.nonblock)
              pnotify.closer.css('visibility', 'visible');
          },
          'mouseleave': function (e) {
            if (opts.nonblock)
              e.stopPropagation();
            nonblock_last_elem = null;
            pnotify.css('cursor', 'auto');
            if (opts.nonblock && animating != 'out')
              pnotify.animate({ 'opacity': opts.opacity }, 'fast');
            if (opts.hide && opts.mouse_reset)
              pnotify.pnotify_queue_remove();
            if (opts.sticker_hover)
              pnotify.sticker.css('visibility', 'hidden');
            if (opts.closer_hover)
              pnotify.closer.css('visibility', 'hidden');
            $.pnotify_position_all();
          },
          'mouseover': function (e) {
            if (opts.nonblock)
              e.stopPropagation();
          },
          'mouseout': function (e) {
            if (opts.nonblock)
              e.stopPropagation();
          },
          'mousemove': function (e) {
            if (opts.nonblock) {
              e.stopPropagation();
              nonblock_pass(e, 'onmousemove');
            }
          },
          'mousedown': function (e) {
            if (opts.nonblock) {
              e.stopPropagation();
              e.preventDefault();
              nonblock_pass(e, 'onmousedown');
            }
          },
          'mouseup': function (e) {
            if (opts.nonblock) {
              e.stopPropagation();
              e.preventDefault();
              nonblock_pass(e, 'onmouseup');
            }
          },
          'click': function (e) {
            if (opts.nonblock) {
              e.stopPropagation();
              nonblock_pass(e, 'onclick');
            }
          },
          'dblclick': function (e) {
            if (opts.nonblock) {
              e.stopPropagation();
              nonblock_pass(e, 'ondblclick');
            }
          }
        });
      pnotify.opts = opts;
      pnotify.container = $('<div />', { 'class': styles.container + ' ui-pnotify-container ' + (opts.type == 'error' ? styles.error : opts.type == 'info' ? styles.info : opts.type == 'success' ? styles.success : styles.notice) }).appendTo(pnotify);
      if (opts.cornerclass != '')
        pnotify.container.removeClass('ui-corner-all').addClass(opts.cornerclass);
      if (opts.shadow)
        pnotify.container.addClass('ui-pnotify-shadow');
      pnotify.pnotify_version = '1.2.0';
      pnotify.pnotify = function (options) {
        var old_opts = opts;
        if (typeof options == 'string')
          opts.text = options;
        else
          opts = $.extend({}, opts, options);
        for (var i in opts) {
          if (typeof i == 'string' && i.match(/^pnotify_/))
            opts[i.replace(/^pnotify_/, '')] = opts[i];
        }
        pnotify.opts = opts;
        if (opts.cornerclass != old_opts.cornerclass)
          pnotify.container.removeClass('ui-corner-all').addClass(opts.cornerclass);
        if (opts.shadow != old_opts.shadow) {
          if (opts.shadow)
            pnotify.container.addClass('ui-pnotify-shadow');
          else
            pnotify.container.removeClass('ui-pnotify-shadow');
        }
        if (opts.addclass === false)
          pnotify.removeClass(old_opts.addclass);
        else if (opts.addclass !== old_opts.addclass)
          pnotify.removeClass(old_opts.addclass).addClass(opts.addclass);
        if (opts.title === false)
          pnotify.title_container.slideUp('fast');
        else if (opts.title !== old_opts.title) {
          if (opts.title_escape)
            pnotify.title_container.text(opts.title).slideDown(200);
          else
            pnotify.title_container.html(opts.title).slideDown(200);
        }
        if (opts.text === false) {
          pnotify.text_container.slideUp('fast');
        } else if (opts.text !== old_opts.text) {
          if (opts.text_escape)
            pnotify.text_container.text(opts.text).slideDown(200);
          else
            pnotify.text_container.html(opts.insert_brs ? String(opts.text).replace(/\n/g, '<br />') : opts.text).slideDown(200);
        }
        pnotify.pnotify_history = opts.history;
        pnotify.pnotify_hide = opts.hide;
        if (opts.type != old_opts.type)
          pnotify.container.removeClass(styles.error + ' ' + styles.notice + ' ' + styles.success + ' ' + styles.info).addClass(opts.type == 'error' ? styles.error : opts.type == 'info' ? styles.info : opts.type == 'success' ? styles.success : styles.notice);
        if (opts.icon !== old_opts.icon || opts.icon === true && opts.type != old_opts.type) {
          pnotify.container.find('div.ui-pnotify-icon').remove();
          if (opts.icon !== false) {
            $('<div />', { 'class': 'ui-pnotify-icon' }).append($('<span />', { 'class': opts.icon === true ? opts.type == 'error' ? styles.error_icon : opts.type == 'info' ? styles.info_icon : opts.type == 'success' ? styles.success_icon : styles.notice_icon : opts.icon })).prependTo(pnotify.container);
          }
        }
        if (opts.width !== old_opts.width)
          pnotify.animate({ width: opts.width });
        if (opts.min_height !== old_opts.min_height)
          pnotify.container.animate({ minHeight: opts.min_height });
        if (opts.opacity !== old_opts.opacity)
          pnotify.fadeTo(opts.animate_speed, opts.opacity);
        if (!opts.closer || opts.nonblock)
          pnotify.closer.css('display', 'none');
        else
          pnotify.closer.css('display', 'block');
        if (!opts.sticker || opts.nonblock)
          pnotify.sticker.css('display', 'none');
        else
          pnotify.sticker.css('display', 'block');
        pnotify.sticker.trigger('pnotify_icon');
        if (opts.sticker_hover)
          pnotify.sticker.css('visibility', 'hidden');
        else if (!opts.nonblock)
          pnotify.sticker.css('visibility', 'visible');
        if (opts.closer_hover)
          pnotify.closer.css('visibility', 'hidden');
        else if (!opts.nonblock)
          pnotify.closer.css('visibility', 'visible');
        if (!opts.hide)
          pnotify.pnotify_cancel_remove();
        else if (!old_opts.hide)
          pnotify.pnotify_queue_remove();
        pnotify.pnotify_queue_position();
        return pnotify;
      };
      pnotify.pnotify_position = function (dont_skip_hidden) {
        var s = pnotify.opts.stack;
        if (!s)
          return;
        if (!s.nextpos1)
          s.nextpos1 = s.firstpos1;
        if (!s.nextpos2)
          s.nextpos2 = s.firstpos2;
        if (!s.addpos2)
          s.addpos2 = 0;
        var hidden = pnotify.css('display') == 'none';
        if (!hidden || dont_skip_hidden) {
          var curpos1, curpos2;
          var animate = {};
          var csspos1;
          switch (s.dir1) {
          case 'down':
            csspos1 = 'top';
            break;
          case 'up':
            csspos1 = 'bottom';
            break;
          case 'left':
            csspos1 = 'right';
            break;
          case 'right':
            csspos1 = 'left';
            break;
          }
          curpos1 = parseInt(pnotify.css(csspos1));
          if (isNaN(curpos1))
            curpos1 = 0;
          if (typeof s.firstpos1 == 'undefined' && !hidden) {
            s.firstpos1 = curpos1;
            s.nextpos1 = s.firstpos1;
          }
          var csspos2;
          switch (s.dir2) {
          case 'down':
            csspos2 = 'top';
            break;
          case 'up':
            csspos2 = 'bottom';
            break;
          case 'left':
            csspos2 = 'right';
            break;
          case 'right':
            csspos2 = 'left';
            break;
          }
          curpos2 = parseInt(pnotify.css(csspos2));
          if (isNaN(curpos2))
            curpos2 = 0;
          if (typeof s.firstpos2 == 'undefined' && !hidden) {
            s.firstpos2 = curpos2;
            s.nextpos2 = s.firstpos2;
          }
          if (s.dir1 == 'down' && s.nextpos1 + pnotify.height() > jwindow.height() || s.dir1 == 'up' && s.nextpos1 + pnotify.height() > jwindow.height() || s.dir1 == 'left' && s.nextpos1 + pnotify.width() > jwindow.width() || s.dir1 == 'right' && s.nextpos1 + pnotify.width() > jwindow.width()) {
            s.nextpos1 = s.firstpos1;
            s.nextpos2 += s.addpos2 + (typeof s.spacing2 == 'undefined' ? 25 : s.spacing2);
            s.addpos2 = 0;
          }
          if (s.animation && s.nextpos2 < curpos2) {
            switch (s.dir2) {
            case 'down':
              animate.top = s.nextpos2 + 'px';
              break;
            case 'up':
              animate.bottom = s.nextpos2 + 'px';
              break;
            case 'left':
              animate.right = s.nextpos2 + 'px';
              break;
            case 'right':
              animate.left = s.nextpos2 + 'px';
              break;
            }
          } else
            pnotify.css(csspos2, s.nextpos2 + 'px');
          switch (s.dir2) {
          case 'down':
          case 'up':
            if (pnotify.outerHeight(true) > s.addpos2)
              s.addpos2 = pnotify.height();
            break;
          case 'left':
          case 'right':
            if (pnotify.outerWidth(true) > s.addpos2)
              s.addpos2 = pnotify.width();
            break;
          }
          if (s.nextpos1) {
            if (s.animation && (curpos1 > s.nextpos1 || animate.top || animate.bottom || animate.right || animate.left)) {
              switch (s.dir1) {
              case 'down':
                animate.top = s.nextpos1 + 'px';
                break;
              case 'up':
                animate.bottom = s.nextpos1 + 'px';
                break;
              case 'left':
                animate.right = s.nextpos1 + 'px';
                break;
              case 'right':
                animate.left = s.nextpos1 + 'px';
                break;
              }
            } else
              pnotify.css(csspos1, s.nextpos1 + 'px');
          }
          if (animate.top || animate.bottom || animate.right || animate.left)
            pnotify.animate(animate, {
              duration: 500,
              queue: false
            });
          switch (s.dir1) {
          case 'down':
          case 'up':
            s.nextpos1 += pnotify.height() + (typeof s.spacing1 == 'undefined' ? 25 : s.spacing1);
            break;
          case 'left':
          case 'right':
            s.nextpos1 += pnotify.width() + (typeof s.spacing1 == 'undefined' ? 25 : s.spacing1);
            break;
          }
        }
      };
      pnotify.pnotify_queue_position = function (milliseconds) {
        if (timer)
          clearTimeout(timer);
        if (!milliseconds)
          milliseconds = 10;
        timer = setTimeout($.pnotify_position_all, milliseconds);
      };
      pnotify.pnotify_display = function () {
        if (!pnotify.parent().length)
          pnotify.appendTo(body);
        if (opts.before_open) {
          if (opts.before_open(pnotify) === false)
            return;
        }
        if (opts.stack.push != 'top')
          pnotify.pnotify_position(true);
        if (opts.animation == 'fade' || opts.animation.effect_in == 'fade') {
          pnotify.show().fadeTo(0, 0).hide();
        } else {
          if (opts.opacity != 1)
            pnotify.show().fadeTo(0, opts.opacity).hide();
        }
        pnotify.animate_in(function () {
          if (opts.after_open)
            opts.after_open(pnotify);
          pnotify.pnotify_queue_position();
          if (opts.hide)
            pnotify.pnotify_queue_remove();
        });
      };
      pnotify.pnotify_remove = function () {
        if (pnotify.timer) {
          window.clearTimeout(pnotify.timer);
          pnotify.timer = null;
        }
        if (opts.before_close) {
          if (opts.before_close(pnotify) === false)
            return;
        }
        pnotify.animate_out(function () {
          if (opts.after_close) {
            if (opts.after_close(pnotify) === false)
              return;
          }
          pnotify.pnotify_queue_position();
          if (opts.remove)
            pnotify.detach();
        });
      };
      pnotify.animate_in = function (callback) {
        animating = 'in';
        var animation;
        if (typeof opts.animation.effect_in != 'undefined')
          animation = opts.animation.effect_in;
        else
          animation = opts.animation;
        if (animation == 'none') {
          pnotify.show();
          callback();
        } else if (animation == 'show')
          pnotify.show(opts.animate_speed, callback);
        else if (animation == 'fade')
          pnotify.show().fadeTo(opts.animate_speed, opts.opacity, callback);
        else if (animation == 'slide')
          pnotify.slideDown(opts.animate_speed, callback);
        else if (typeof animation == 'function')
          animation('in', callback, pnotify);
        else
          pnotify.show(animation, typeof opts.animation.options_in == 'object' ? opts.animation.options_in : {}, opts.animate_speed, callback);
      };
      pnotify.animate_out = function (callback) {
        animating = 'out';
        var animation;
        if (typeof opts.animation.effect_out != 'undefined')
          animation = opts.animation.effect_out;
        else
          animation = opts.animation;
        if (animation == 'none') {
          pnotify.hide();
          callback();
        } else if (animation == 'show')
          pnotify.hide(opts.animate_speed, callback);
        else if (animation == 'fade')
          pnotify.fadeOut(opts.animate_speed, callback);
        else if (animation == 'slide')
          pnotify.slideUp(opts.animate_speed, callback);
        else if (typeof animation == 'function')
          animation('out', callback, pnotify);
        else
          pnotify.hide(animation, typeof opts.animation.options_out == 'object' ? opts.animation.options_out : {}, opts.animate_speed, callback);
      };
      pnotify.pnotify_cancel_remove = function () {
        if (pnotify.timer)
          window.clearTimeout(pnotify.timer);
      };
      pnotify.pnotify_queue_remove = function () {
        pnotify.pnotify_cancel_remove();
        pnotify.timer = window.setTimeout(function () {
          pnotify.pnotify_remove();
        }, isNaN(opts.delay) ? 0 : opts.delay);
      };
      pnotify.closer = $('<div />', {
        'class': 'ui-pnotify-closer',
        'css': {
          'cursor': 'pointer',
          'visibility': opts.closer_hover ? 'hidden' : 'visible'
        },
        'click': function () {
          pnotify.pnotify_remove();
          pnotify.sticker.css('visibility', 'hidden');
          pnotify.closer.css('visibility', 'hidden');
        }
      }).append($('<span />', { 'class': styles.closer })).appendTo(pnotify.container);
      if (!opts.closer || opts.nonblock)
        pnotify.closer.css('display', 'none');
      pnotify.sticker = $('<div />', {
        'class': 'ui-pnotify-sticker',
        'css': {
          'cursor': 'pointer',
          'visibility': opts.sticker_hover ? 'hidden' : 'visible'
        },
        'click': function () {
          opts.hide = !opts.hide;
          if (opts.hide)
            pnotify.pnotify_queue_remove();
          else
            pnotify.pnotify_cancel_remove();
          $(this).trigger('pnotify_icon');
        }
      }).bind('pnotify_icon', function () {
        $(this).children().removeClass(styles.pin_up + ' ' + styles.pin_down).addClass(opts.hide ? styles.pin_up : styles.pin_down);
      }).append($('<span />', { 'class': styles.pin_up })).appendTo(pnotify.container);
      if (!opts.sticker || opts.nonblock)
        pnotify.sticker.css('display', 'none');
      if (opts.icon !== false) {
        $('<div />', { 'class': 'ui-pnotify-icon' }).append($('<span />', { 'class': opts.icon === true ? opts.type == 'error' ? styles.error_icon : opts.type == 'info' ? styles.info_icon : opts.type == 'success' ? styles.success_icon : styles.notice_icon : opts.icon })).prependTo(pnotify.container);
      }
      pnotify.title_container = $('<h4 />', { 'class': 'ui-pnotify-title' }).appendTo(pnotify.container);
      if (opts.title === false)
        pnotify.title_container.hide();
      else if (opts.title_escape)
        pnotify.title_container.text(opts.title);
      else
        pnotify.title_container.html(opts.title);
      pnotify.text_container = $('<div />', { 'class': 'ui-pnotify-text' }).appendTo(pnotify.container);
      if (opts.text === false)
        pnotify.text_container.hide();
      else if (opts.text_escape)
        pnotify.text_container.text(opts.text);
      else
        pnotify.text_container.html(opts.insert_brs ? String(opts.text).replace(/\n/g, '<br />') : opts.text);
      if (typeof opts.width == 'string')
        pnotify.css('width', opts.width);
      if (typeof opts.min_height == 'string')
        pnotify.container.css('min-height', opts.min_height);
      pnotify.pnotify_history = opts.history;
      pnotify.pnotify_hide = opts.hide;
      var notices_data = jwindow.data('pnotify');
      if (notices_data == null || typeof notices_data != 'object')
        notices_data = [];
      if (opts.stack.push == 'top')
        notices_data = $.merge([pnotify], notices_data);
      else
        notices_data = $.merge(notices_data, [pnotify]);
      jwindow.data('pnotify', notices_data);
      if (opts.stack.push == 'top')
        pnotify.pnotify_queue_position(1);
      if (opts.after_init)
        opts.after_init(pnotify);
      if (opts.history) {
        var history_menu = jwindow.data('pnotify_history');
        if (typeof history_menu == 'undefined') {
          history_menu = $('<div />', {
            'class': 'ui-pnotify-history-container ' + styles.hi_menu,
            'mouseleave': function () {
              history_menu.animate({ top: '-' + history_handle_top + 'px' }, {
                duration: 100,
                queue: false
              });
            }
          }).append($('<div />', {
            'class': 'ui-pnotify-history-header',
            'text': 'Redisplay'
          })).append($('<button />', {
            'class': 'ui-pnotify-history-all ' + styles.hi_btn,
            'text': 'All',
            'mouseenter': function () {
              $(this).addClass(styles.hi_btnhov);
            },
            'mouseleave': function () {
              $(this).removeClass(styles.hi_btnhov);
            },
            'click': function () {
              $.each(notices_data, function () {
                if (this.pnotify_history) {
                  if (this.is(':visible')) {
                    if (this.pnotify_hide)
                      this.pnotify_queue_remove();
                  } else if (this.pnotify_display)
                    this.pnotify_display();
                }
              });
              return false;
            }
          })).append($('<button />', {
            'class': 'ui-pnotify-history-last ' + styles.hi_btn,
            'text': 'Last',
            'mouseenter': function () {
              $(this).addClass(styles.hi_btnhov);
            },
            'mouseleave': function () {
              $(this).removeClass(styles.hi_btnhov);
            },
            'click': function () {
              var i = -1;
              var notice;
              do {
                if (i == -1)
                  notice = notices_data.slice(i);
                else
                  notice = notices_data.slice(i, i + 1);
                if (!notice[0])
                  break;
                i--;
              } while (!notice[0].pnotify_history || notice[0].is(':visible'));
              if (!notice[0])
                return false;
              if (notice[0].pnotify_display)
                notice[0].pnotify_display();
              return false;
            }
          })).appendTo(body);
          var handle = $('<span />', {
              'class': 'ui-pnotify-history-pulldown ' + styles.hi_hnd,
              'mouseenter': function () {
                history_menu.animate({ top: '0' }, {
                  duration: 100,
                  queue: false
                });
              }
            }).appendTo(history_menu);
          history_handle_top = handle.offset().top + 2;
          history_menu.css({ top: '-' + history_handle_top + 'px' });
          jwindow.data('pnotify_history', history_menu);
        }
      }
      opts.stack.animation = false;
      pnotify.pnotify_display();
      return pnotify;
    }
  });
  var re_on = /^on/, re_mouse_events = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/, re_ui_events = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/, re_html_events = /^(scroll|resize|(un)?load|abort|error)$/;
  var dom_event = function (e, orig_e) {
    var event_object;
    e = e.toLowerCase();
    if (document.createEvent && this.dispatchEvent) {
      e = e.replace(re_on, '');
      if (e.match(re_mouse_events)) {
        $(this).offset();
        event_object = document.createEvent('MouseEvents');
        event_object.initMouseEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail, orig_e.screenX, orig_e.screenY, orig_e.clientX, orig_e.clientY, orig_e.ctrlKey, orig_e.altKey, orig_e.shiftKey, orig_e.metaKey, orig_e.button, orig_e.relatedTarget);
      } else if (e.match(re_ui_events)) {
        event_object = document.createEvent('UIEvents');
        event_object.initUIEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail);
      } else if (e.match(re_html_events)) {
        event_object = document.createEvent('HTMLEvents');
        event_object.initEvent(e, orig_e.bubbles, orig_e.cancelable);
      }
      if (!event_object)
        return;
      this.dispatchEvent(event_object);
    } else {
      if (!e.match(re_on))
        e = 'on' + e;
      event_object = document.createEventObject(orig_e);
      this.fireEvent(e, event_object);
    }
  };
  $.pnotify.defaults = {
    title: false,
    title_escape: false,
    text: false,
    text_escape: false,
    styling: 'bootstrap',
    addclass: '',
    cornerclass: '',
    nonblock: false,
    nonblock_opacity: 0.2,
    history: true,
    width: '300px',
    min_height: '16px',
    type: 'notice',
    icon: true,
    animation: 'fade',
    animate_speed: 'slow',
    opacity: 1,
    shadow: true,
    closer: true,
    closer_hover: true,
    sticker: true,
    sticker_hover: true,
    hide: true,
    delay: 8000,
    mouse_reset: true,
    remove: true,
    insert_brs: true,
    stack: {
      'dir1': 'down',
      'dir2': 'left',
      'push': 'bottom',
      'spacing1': 25,
      'spacing2': 25
    }
  };
}(jQuery));
(function ($) {
  'use strict';
  function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bit_rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binl_md5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;
    var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = md5_ff(a, b, c, d, x[i], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return [
      a,
      b,
      c,
      d
    ];
  }
  function binl2rstr(input) {
    var i, output = '';
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
    }
    return output;
  }
  function rstr2binl(input) {
    var i, output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
    }
    return output;
  }
  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }
  function rstr_hmac_md5(key, data) {
    var i, bkey = rstr2binl(key), ipad = [], opad = [], hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 909522486;
      opad[i] = bkey[i] ^ 1549556828;
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
  }
  function rstr2hex(input) {
    var hex_tab = '0123456789abcdef', output = '', x, i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15);
    }
    return output;
  }
  function str2rstr_utf8(input) {
    return unescape(encodeURIComponent(input));
  }
  function raw_md5(s) {
    return rstr_md5(str2rstr_utf8(s));
  }
  function hex_md5(s) {
    return rstr2hex(raw_md5(s));
  }
  function raw_hmac_md5(k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
  }
  function hex_hmac_md5(k, d) {
    return rstr2hex(raw_hmac_md5(k, d));
  }
  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string);
      }
      return raw_md5(string);
    }
    if (!raw) {
      return hex_hmac_md5(key, string);
    }
    return raw_hmac_md5(key, string);
  }
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5;
    });
  } else {
    $.md5 = md5;
  }
}(this));
'use strict';
(function () {
  angular.module('ngStorage', []).factory('$localStorage', _storageFactory('localStorage')).factory('$sessionStorage', _storageFactory('sessionStorage'));
  function _storageFactory(storageType) {
    return [
      '$rootScope',
      '$browser',
      '$window',
      function ($rootScope, $browser, $window) {
        var webStorage = $window[storageType], $storage = {
            $default: function (items) {
              for (var k in items) {
                angular.isDefined($storage[k]) || ($storage[k] = items[k]);
              }
              return $storage;
            },
            $reset: function (items) {
              for (var k in $storage) {
                '$' === k[0] || delete $storage[k];
              }
              return $storage.$default(items);
            }
          }, _last$storage;
        for (var i = 0, k; i < webStorage.length && (k = webStorage.key(i)); i++) {
          'ngStorage-' === k.slice(0, 10) && ($storage[k.slice(10)] = angular.fromJson(webStorage.getItem(k)));
        }
        _last$storage = angular.copy($storage);
        $browser.addPollFn(function () {
          if (!angular.equals($storage, _last$storage)) {
            angular.forEach($storage, function (v, k) {
              if (angular.isDefined(v) && '$' !== k[0]) {
                $storage[k] = angular.fromJson(angular.toJson(v));
                webStorage.setItem('ngStorage-' + k, angular.toJson(v));
              }
              delete _last$storage[k];
            });
            for (var k in _last$storage) {
              webStorage.removeItem('ngStorage-' + k);
            }
            _last$storage = angular.copy($storage);
            $rootScope.$apply();
          }
        });
        'localStorage' === storageType && $window.addEventListener('storage', function (event) {
          if ('ngStorage-' === event.key.slice(0, 10)) {
            event.newValue ? $storage[event.key.slice(10)] = angular.fromJson(event.newValue) : delete $storage[event.key.slice(10)];
            _last$storage = angular.copy($storage);
            $rootScope.$apply();
          }
        });
        return $storage;
      }
    ];
  }
}());