(function (definition) {
  if (typeof define == 'function') {
    define(definition);
  } else if (typeof YUI == 'function') {
    YUI.add('es5', definition);
  } else {
    definition();
  }
}(function () {
  function Empty() {
  }
  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      if (typeof target != 'function') {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);
      }
      var args = _Array_slice_.call(arguments, 1);
      var bound = function () {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(_Array_slice_.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(_Array_slice_.call(arguments)));
        }
      };
      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
  var call = Function.prototype.call;
  var prototypeOfArray = Array.prototype;
  var prototypeOfObject = Object.prototype;
  var _Array_slice_ = prototypeOfArray.slice;
  var _toString = call.bind(prototypeOfObject.toString);
  var owns = call.bind(prototypeOfObject.hasOwnProperty);
  var defineGetter;
  var defineSetter;
  var lookupGetter;
  var lookupSetter;
  var supportsAccessors;
  if (supportsAccessors = owns(prototypeOfObject, '__defineGetter__')) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
  }
  if ([
      1,
      2
    ].splice(0).length != 2) {
    var array_splice = Array.prototype.splice;
    if (function () {
        function makeArray(l) {
          var a = [];
          while (l--) {
            a.unshift(l);
          }
          return a;
        }
        var array = [], lengthBefore;
        ;
        array.splice.bind(array, 0, 0).apply(null, makeArray(20));
        array.splice.bind(array, 0, 0).apply(null, makeArray(26));
        lengthBefore = array.length;
        array.splice(5, 0, 'XXX');
        if (lengthBefore + 1 == array.length) {
          return true;
        }
      }()) {
      Array.prototype.splice = function (start, deleteCount) {
        if (!arguments.length) {
          return [];
        } else {
          return array_splice.apply(this, [
            start === void 0 ? 0 : start,
            deleteCount === void 0 ? this.length - start : deleteCount
          ].concat(_Array_slice_.call(arguments, 2)));
        }
      };
    } else {
      Array.prototype.splice = function (start, deleteCount) {
        var result, args = _Array_slice_.call(arguments, 2), addElementsCount = args.length;
        ;
        if (!arguments.length) {
          return [];
        }
        if (start === void 0) {
          start = 0;
        }
        if (deleteCount === void 0) {
          deleteCount = this.length - start;
        }
        if (addElementsCount > 0) {
          if (deleteCount <= 0) {
            if (start == this.length) {
              this.push.apply(this, args);
              return [];
            }
            if (start == 0) {
              this.unshift.apply(this, args);
              return [];
            }
          }
          result = _Array_slice_.call(this, start, start + deleteCount);
          args.push.apply(args, _Array_slice_.call(this, start + deleteCount, this.length));
          args.unshift.apply(args, _Array_slice_.call(this, 0, start));
          args.unshift(0, this.length);
          array_splice.apply(this, args);
          return result;
        }
        return array_splice.call(this, start, deleteCount);
      };
    }
  }
  if ([].unshift(0) != 1) {
    var array_unshift = Array.prototype.unshift;
    Array.prototype.unshift = function () {
      array_unshift.apply(this, arguments);
      return this.length;
    };
  }
  if (!Array.isArray) {
    Array.isArray = function isArray(obj) {
      return _toString(obj) == '[object Array]';
    };
  }
  var boxedString = Object('a'), splitString = boxedString[0] != 'a' || !(0 in boxedString);
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, thisp = arguments[1], i = -1, length = self.length >>> 0;
      if (_toString(fun) != '[object Function]') {
        throw new TypeError();
      }
      while (++i < length) {
        if (i in self) {
          fun.call(thisp, self[i], i, object);
        }
      }
    };
  }
  if (!Array.prototype.map) {
    Array.prototype.map = function map(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0, result = Array(length), thisp = arguments[1];
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self)
          result[i] = fun.call(thisp, self[i], i, object);
      }
      return result;
    };
  }
  if (!Array.prototype.filter) {
    Array.prototype.filter = function filter(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0, result = [], value, thisp = arguments[1];
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self) {
          value = self[i];
          if (fun.call(thisp, value, i, object)) {
            result.push(value);
          }
        }
      }
      return result;
    };
  }
  if (!Array.prototype.every) {
    Array.prototype.every = function every(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0, thisp = arguments[1];
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self && !fun.call(thisp, self[i], i, object)) {
          return false;
        }
      }
      return true;
    };
  }
  if (!Array.prototype.some) {
    Array.prototype.some = function some(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0, thisp = arguments[1];
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self && fun.call(thisp, self[i], i, object)) {
          return true;
        }
      }
      return false;
    };
  }
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0;
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      if (!length && arguments.length == 1) {
        throw new TypeError('reduce of empty array with no initial value');
      }
      var i = 0;
      var result;
      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i++];
            break;
          }
          if (++i >= length) {
            throw new TypeError('reduce of empty array with no initial value');
          }
        } while (true);
      }
      for (; i < length; i++) {
        if (i in self) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      }
      return result;
    };
  }
  if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function reduceRight(fun) {
      var object = toObject(this), self = splitString && _toString(this) == '[object String]' ? this.split('') : object, length = self.length >>> 0;
      if (_toString(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }
      if (!length && arguments.length == 1) {
        throw new TypeError('reduceRight of empty array with no initial value');
      }
      var result, i = length - 1;
      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i--];
            break;
          }
          if (--i < 0) {
            throw new TypeError('reduceRight of empty array with no initial value');
          }
        } while (true);
      }
      if (i < 0) {
        return result;
      }
      do {
        if (i in this) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      } while (i--);
      return result;
    };
  }
  if (!Array.prototype.indexOf || [
      0,
      1
    ].indexOf(1, 2) != -1) {
    Array.prototype.indexOf = function indexOf(sought) {
      var self = splitString && _toString(this) == '[object String]' ? this.split('') : toObject(this), length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = 0;
      if (arguments.length > 1) {
        i = toInteger(arguments[1]);
      }
      i = i >= 0 ? i : Math.max(0, length + i);
      for (; i < length; i++) {
        if (i in self && self[i] === sought) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Array.prototype.lastIndexOf || [
      0,
      1
    ].lastIndexOf(0, -3) != -1) {
    Array.prototype.lastIndexOf = function lastIndexOf(sought) {
      var self = splitString && _toString(this) == '[object String]' ? this.split('') : toObject(this), length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = length - 1;
      if (arguments.length > 1) {
        i = Math.min(i, toInteger(arguments[1]));
      }
      i = i >= 0 ? i : length - Math.abs(i);
      for (; i >= 0; i--) {
        if (i in self && sought === self[i]) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Object.keys) {
    var hasDontEnumBug = true, dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ], dontEnumsLength = dontEnums.length;
    for (var key in { 'toString': null }) {
      hasDontEnumBug = false;
    }
    Object.keys = function keys(object) {
      if (typeof object != 'object' && typeof object != 'function' || object === null) {
        throw new TypeError('Object.keys called on a non-object');
      }
      var keys = [];
      for (var name in object) {
        if (owns(object, name)) {
          keys.push(name);
        }
      }
      if (hasDontEnumBug) {
        for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
          var dontEnum = dontEnums[i];
          if (owns(object, dontEnum)) {
            keys.push(dontEnum);
          }
        }
      }
      return keys;
    };
  }
  var negativeDate = -62198755200000, negativeYearString = '-000001';
  if (!Date.prototype.toISOString || new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1) {
    Date.prototype.toISOString = function toISOString() {
      var result, length, value, year, month;
      if (!isFinite(this)) {
        throw new RangeError('Date.prototype.toISOString called on non-finite value.');
      }
      year = this.getUTCFullYear();
      month = this.getUTCMonth();
      year += Math.floor(month / 12);
      month = (month % 12 + 12) % 12;
      result = [
        month + 1,
        this.getUTCDate(),
        this.getUTCHours(),
        this.getUTCMinutes(),
        this.getUTCSeconds()
      ];
      year = (year < 0 ? '-' : year > 9999 ? '+' : '') + ('00000' + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6);
      length = result.length;
      while (length--) {
        value = result[length];
        if (value < 10) {
          result[length] = '0' + value;
        }
      }
      return year + '-' + result.slice(0, 2).join('-') + 'T' + result.slice(2).join(':') + '.' + ('000' + this.getUTCMilliseconds()).slice(-3) + 'Z';
    };
  }
  var dateToJSONIsSupported = false;
  try {
    dateToJSONIsSupported = Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
      toISOString: function () {
        return true;
      }
    });
  } catch (e) {
  }
  if (!dateToJSONIsSupported) {
    Date.prototype.toJSON = function toJSON(key) {
      var o = Object(this), tv = toPrimitive(o), toISO;
      if (typeof tv === 'number' && !isFinite(tv)) {
        return null;
      }
      toISO = o.toISOString;
      if (typeof toISO != 'function') {
        throw new TypeError('toISOString property is not callable');
      }
      return toISO.call(o);
    };
  }
  if (!Date.parse || 'Date.parse is buggy') {
    Date = function (NativeDate) {
      function Date(Y, M, D, h, m, s, ms) {
        var length = arguments.length;
        if (this instanceof NativeDate) {
          var date = length == 1 && String(Y) === Y ? new NativeDate(Date.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) : length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate();
          date.constructor = Date;
          return date;
        }
        return NativeDate.apply(this, arguments);
      }
      ;
      var isoDateExpression = new RegExp('^' + '(\\d{4}|[+-]\\d{6})' + '(?:-(\\d{2})' + '(?:-(\\d{2})' + '(?:' + 'T(\\d{2})' + ':(\\d{2})' + '(?:' + ':(\\d{2})' + '(?:(\\.\\d{1,}))?' + ')?' + '(' + 'Z|' + '(?:' + '([-+])' + '(\\d{2})' + ':(\\d{2})' + ')' + ')?)?)?)?' + '$');
      var months = [
          0,
          31,
          59,
          90,
          120,
          151,
          181,
          212,
          243,
          273,
          304,
          334,
          365
        ];
      function dayFromMonth(year, month) {
        var t = month > 1 ? 1 : 0;
        return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
      }
      for (var key in NativeDate) {
        Date[key] = NativeDate[key];
      }
      Date.now = NativeDate.now;
      Date.UTC = NativeDate.UTC;
      Date.prototype = NativeDate.prototype;
      Date.prototype.constructor = Date;
      Date.parse = function parse(string) {
        var match = isoDateExpression.exec(string);
        if (match) {
          var year = Number(match[1]), month = Number(match[2] || 1) - 1, day = Number(match[3] || 1) - 1, hour = Number(match[4] || 0), minute = Number(match[5] || 0), second = Number(match[6] || 0), millisecond = Math.floor(Number(match[7] || 0) * 1000), offset = !match[4] || match[8] ? 0 : Number(new NativeDate(1970, 0)), signOffset = match[9] === '-' ? 1 : -1, hourOffset = Number(match[10] || 0), minuteOffset = Number(match[11] || 0), result;
          if (hour < (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1000 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
            result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
            result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1000 + millisecond + offset;
            if (-8640000000000000 <= result && result <= 8640000000000000) {
              return result;
            }
          }
          return NaN;
        }
        return NativeDate.parse.apply(this, arguments);
      };
      return Date;
    }(Date);
  }
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
  if (!Number.prototype.toFixed || 0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) === '0' || 1.255.toFixed(2) !== '1.25' || 1000000000000000100..toFixed(0) !== '1000000000000000128') {
    (function () {
      var base, size, data, i;
      base = 10000000;
      size = 6;
      data = [
        0,
        0,
        0,
        0,
        0,
        0
      ];
      function multiply(n, c) {
        var i = -1;
        while (++i < size) {
          c += n * data[i];
          data[i] = c % base;
          c = Math.floor(c / base);
        }
      }
      function divide(n) {
        var i = size, c = 0;
        while (--i >= 0) {
          c += data[i];
          data[i] = Math.floor(c / n);
          c = c % n * base;
        }
      }
      function toString() {
        var i = size;
        var s = '';
        while (--i >= 0) {
          if (s !== '' || i === 0 || data[i] !== 0) {
            var t = String(data[i]);
            if (s === '') {
              s = t;
            } else {
              s += '0000000'.slice(0, 7 - t.length) + t;
            }
          }
        }
        return s;
      }
      function pow(x, n, acc) {
        return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
      }
      function log(x) {
        var n = 0;
        while (x >= 4096) {
          n += 12;
          x /= 4096;
        }
        while (x >= 2) {
          n += 1;
          x /= 2;
        }
        return n;
      }
      Number.prototype.toFixed = function (fractionDigits) {
        var f, x, s, m, e, z, j, k;
        f = Number(fractionDigits);
        f = f !== f ? 0 : Math.floor(f);
        if (f < 0 || f > 20) {
          throw new RangeError('Number.toFixed called with invalid number of decimals');
        }
        x = Number(this);
        if (x !== x) {
          return 'NaN';
        }
        if (x <= -1e+21 || x >= 1e+21) {
          return String(x);
        }
        s = '';
        if (x < 0) {
          s = '-';
          x = -x;
        }
        m = '0';
        if (x > 1e-21) {
          e = log(x * pow(2, 69, 1)) - 69;
          z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
          z *= 4503599627370496;
          e = 52 - e;
          if (e > 0) {
            multiply(0, z);
            j = f;
            while (j >= 7) {
              multiply(10000000, 0);
              j -= 7;
            }
            multiply(pow(10, j, 1), 0);
            j = e - 1;
            while (j >= 23) {
              divide(1 << 23);
              j -= 23;
            }
            divide(1 << j);
            multiply(1, 1);
            divide(2);
            m = toString();
          } else {
            multiply(0, z);
            multiply(1 << -e, 0);
            m = toString() + '0.00000000000000000000'.slice(2, 2 + f);
          }
        }
        if (f > 0) {
          k = m.length;
          if (k <= f) {
            m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
          } else {
            m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
          }
        } else {
          m = s + m;
        }
        return m;
      };
    }());
  }
  var string_split = String.prototype.split;
  if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || ''.split(/.?/).length === 0 || '.'.split(/()()/).length > 1) {
    (function () {
      var compliantExecNpcg = /()??/.exec('')[1] === void 0;
      String.prototype.split = function (separator, limit) {
        var string = this;
        if (separator === void 0 && limit === 0)
          return [];
        if (Object.prototype.toString.call(separator) !== '[object RegExp]') {
          return string_split.apply(this, arguments);
        }
        var output = [], flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + (separator.sticky ? 'y' : ''), lastLastIndex = 0, separator = new RegExp(separator.source, flags + 'g'), separator2, match, lastIndex, lastLength;
        string += '';
        if (!compliantExecNpcg) {
          separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
        }
        limit = limit === void 0 ? -1 >>> 0 : limit >>> 0;
        while (match = separator.exec(string)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === void 0) {
                    match[i] = void 0;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < string.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separator.test('')) {
            output.push('');
          }
        } else {
          output.push(string.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };
    }());
  } else if ('0'.split(void 0, 0).length) {
    String.prototype.split = function (separator, limit) {
      if (separator === void 0 && limit === 0)
        return [];
      return string_split.apply(this, arguments);
    };
  }
  if (''.substr && '0b'.substr(-1) !== 'b') {
    var string_substr = String.prototype.substr;
    String.prototype.substr = function (start, length) {
      return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
    };
  }
  var ws = '\t\n\x0B\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028' + '\u2029\ufeff';
  if (!String.prototype.trim || ws.trim()) {
    ws = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + ws + ws + '*'), trimEndRegexp = new RegExp(ws + ws + '*$');
    String.prototype.trim = function trim() {
      if (this === void 0 || this === null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
      }
      return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    };
  }
  function toInteger(n) {
    n = +n;
    if (n !== n) {
      n = 0;
    } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
      n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
  }
  function isPrimitive(input) {
    var type = typeof input;
    return input === null || type === 'undefined' || type === 'boolean' || type === 'number' || type === 'string';
  }
  function toPrimitive(input) {
    var val, valueOf, toString;
    if (isPrimitive(input)) {
      return input;
    }
    valueOf = input.valueOf;
    if (typeof valueOf === 'function') {
      val = valueOf.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    toString = input.toString;
    if (typeof toString === 'function') {
      val = toString.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    throw new TypeError();
  }
  var toObject = function (o) {
    if (o == null) {
      throw new TypeError('can\'t convert ' + o + ' to object');
    }
    return Object(o);
  };
}));
;
(function (window) {
  var getClass = {}.toString, isProperty, forEach, undef;
  var isLoader = typeof define === 'function' && define.amd, JSON3 = typeof exports == 'object' && exports;
  if (JSON3 || isLoader) {
    if (typeof JSON == 'object' && JSON) {
      if (JSON3) {
        JSON3.stringify = JSON.stringify;
        JSON3.parse = JSON.parse;
      } else {
        JSON3 = JSON;
      }
    } else if (isLoader) {
      JSON3 = window.JSON = {};
    }
  } else {
    JSON3 = window.JSON || (window.JSON = {});
  }
  var isExtended = new Date(-3509827334573292);
  try {
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {
  }
  function has(name) {
    if (name == 'bug-string-char-index') {
      return 'a'[0] != 'a';
    }
    var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}', isAll = name == 'json';
    if (isAll || name == 'json-stringify' || name == 'json-parse') {
      if (name == 'json-stringify' || isAll) {
        var stringify = JSON3.stringify, stringifySupported = typeof stringify == 'function' && isExtended;
        if (stringifySupported) {
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported = stringify(0) === '0' && stringify(new Number()) === '0' && stringify(new String()) == '""' && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && stringify(value) === '1' && stringify([value]) == '[1]' && stringify([undef]) == '[null]' && stringify(null) == 'null' && stringify([
              undef,
              getClass,
              null
            ]) == '[null,null,null]' && stringify({
              'a': [
                value,
                true,
                false,
                null,
                '\0\b\n\f\r\t'
              ]
            }) == serialized && stringify(null, value) === '1' && stringify([
              1,
              2
            ], null, 1) == '[\n 1,\n 2\n]' && stringify(new Date(-8640000000000000)) == '"-271821-04-20T00:00:00.000Z"' && stringify(new Date(8640000000000000)) == '"+275760-09-13T00:00:00.000Z"' && stringify(new Date(-62198755200000)) == '"-000001-01-01T00:00:00.000Z"' && stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        if (!isAll) {
          return stringifySupported;
        }
      }
      if (name == 'json-parse' || isAll) {
        var parse = JSON3.parse;
        if (typeof parse == 'function') {
          try {
            if (parse('0') === 0 && !parse(false)) {
              value = parse(serialized);
              var parseSupported = value['a'].length == 5 && value['a'][0] === 1;
              if (parseSupported) {
                try {
                  parseSupported = !parse('"\t"');
                } catch (exception) {
                }
                if (parseSupported) {
                  try {
                    parseSupported = parse('01') !== 1;
                  } catch (exception) {
                  }
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        if (!isAll) {
          return parseSupported;
        }
      }
      return stringifySupported && parseSupported;
    }
  }
  if (!has('json')) {
    var functionClass = '[object Function]';
    var dateClass = '[object Date]';
    var numberClass = '[object Number]';
    var stringClass = '[object String]';
    var arrayClass = '[object Array]';
    var booleanClass = '[object Boolean]';
    var charIndexBuggy = has('bug-string-char-index');
    if (!isExtended) {
      var floor = Math.floor;
      var Months = [
          0,
          31,
          59,
          90,
          120,
          151,
          181,
          212,
          243,
          273,
          304,
          334
        ];
      var getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = { 'toString': 1 }, members).toString != getClass) {
          isProperty = function (property) {
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            this.__proto__ = original;
            return result;
          };
        } else {
          constructor = members.constructor;
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }
    forEach = function (object, callback) {
      var size = 0, Properties, members, property, forEach;
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;
      members = new Properties();
      for (property in members) {
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;
      if (!size) {
        members = [
          'valueOf',
          'toString',
          'toLocaleString',
          'propertyIsEnumerable',
          'isPrototypeOf',
          'hasOwnProperty',
          'constructor'
        ];
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, length;
          for (property in object) {
            if (!(isFunction && property == 'prototype') && isProperty.call(object, property)) {
              callback(property);
            }
          }
          for (length = members.length; property = members[--length]; isProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        forEach = function (object, callback) {
          var members = {}, isFunction = getClass.call(object) == functionClass, property;
          for (property in object) {
            if (!(isFunction && property == 'prototype') && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == 'prototype') && isProperty.call(object, property) && !(isConstructor = property === 'constructor')) {
              callback(property);
            }
          }
          if (isConstructor || isProperty.call(object, property = 'constructor')) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };
    if (!has('json-stringify')) {
      var Escapes = {
          92: '\\\\',
          34: '\\"',
          8: '\\b',
          12: '\\f',
          10: '\\n',
          13: '\\r',
          9: '\\t'
        };
      var leadingZeroes = '000000';
      var toPaddedString = function (width, value) {
        return (leadingZeroes + (value || 0)).slice(-width);
      };
      var unicodePrefix = '\\u00';
      var quote = function (value) {
        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
        if (isLarge) {
          symbols = value.split('');
        }
        for (; index < length; index++) {
          var charCode = value.charCodeAt(index);
          switch (charCode) {
          case 8:
          case 9:
          case 10:
          case 12:
          case 13:
          case 34:
          case 92:
            result += Escapes[charCode];
            break;
          default:
            if (charCode < 32) {
              result += unicodePrefix + toPaddedString(2, charCode.toString(16));
              break;
            }
            result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
          }
        }
        return result + '"';
      };
      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value = object[property], className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, hasMembers, result;
        try {
          value = object[property];
        } catch (exception) {
        }
        if (typeof value == 'object' && value) {
          className = getClass.call(value);
          if (className == dateClass && !isProperty.call(value, 'toJSON')) {
            if (value > -1 / 0 && value < 1 / 0) {
              if (getDay) {
                date = floor(value / 86400000);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                time = (value % 86400000 + 86400000) % 86400000;
                hours = floor(time / 3600000) % 24;
                minutes = floor(time / 60000) % 60;
                seconds = floor(time / 1000) % 60;
                milliseconds = time % 1000;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              value = (year <= 0 || year >= 10000 ? (year < 0 ? '-' : '+') + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + '-' + toPaddedString(2, month + 1) + '-' + toPaddedString(2, date) + 'T' + toPaddedString(2, hours) + ':' + toPaddedString(2, minutes) + ':' + toPaddedString(2, seconds) + '.' + toPaddedString(3, milliseconds) + 'Z';
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == 'function' && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, 'toJSON'))) {
            value = value.toJSON(property);
          }
        }
        if (callback) {
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return 'null';
        }
        className = getClass.call(value);
        if (className == booleanClass) {
          return '' + value;
        } else if (className == numberClass) {
          return value > -1 / 0 && value < 1 / 0 ? '' + value : 'null';
        } else if (className == stringClass) {
          return quote(value);
        }
        if (typeof value == 'object') {
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              throw TypeError();
            }
          }
          stack.push(value);
          results = [];
          prefix = indentation;
          indentation += whitespace;
          if (className == arrayClass) {
            for (index = 0, length = value.length; index < length; hasMembers || (hasMembers = true), index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? 'null' : element);
            }
            result = hasMembers ? whitespace ? '[\n' + indentation + results.join(',\n' + indentation) + '\n' + prefix + ']' : '[' + results.join(',') + ']' : '[]';
          } else {
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                results.push(quote(property) + ':' + (whitespace ? ' ' : '') + element);
              }
              hasMembers || (hasMembers = true);
            });
            result = hasMembers ? whitespace ? '{\n' + indentation + results.join(',\n' + indentation) + '\n' + prefix + '}' : '{' + results.join(',') + '}' : '{}';
          }
          stack.pop();
          return result;
        }
      };
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties;
        if (typeof filter == 'function' || typeof filter == 'object' && filter) {
          if (getClass.call(filter) == functionClass) {
            callback = filter;
          } else if (getClass.call(filter) == arrayClass) {
            properties = {};
            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (getClass.call(value) == stringClass || getClass.call(value) == numberClass) && (properties[value] = 1));
          }
        }
        if (width) {
          if (getClass.call(width) == numberClass) {
            if ((width -= width % 1) > 0) {
              for (whitespace = '', width > 10 && (width = 10); whitespace.length < width; whitespace += ' ');
            }
          } else if (getClass.call(width) == stringClass) {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        return serialize('', (value = {}, value[''] = source, value), callback, properties, whitespace, '', []);
      };
    }
    if (!has('json-parse')) {
      var fromCharCode = String.fromCharCode;
      var Unescapes = {
          92: '\\',
          34: '"',
          47: '/',
          98: '\b',
          116: '\t',
          110: '\n',
          102: '\f',
          114: '\r'
        };
      var Index, Source;
      var abort = function () {
        Index = Source = null;
        throw SyntaxError();
      };
      var lex = function () {
        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
        while (Index < length) {
          charCode = source.charCodeAt(Index);
          switch (charCode) {
          case 9:
          case 10:
          case 13:
          case 32:
            Index++;
            break;
          case 123:
          case 125:
          case 91:
          case 93:
          case 58:
          case 44:
            value = charIndexBuggy ? source.charAt(Index) : source[Index];
            Index++;
            return value;
          case 34:
            for (value = '@', Index++; Index < length;) {
              charCode = source.charCodeAt(Index);
              if (charCode < 32) {
                abort();
              } else if (charCode == 92) {
                charCode = source.charCodeAt(++Index);
                switch (charCode) {
                case 92:
                case 34:
                case 47:
                case 98:
                case 116:
                case 110:
                case 102:
                case 114:
                  value += Unescapes[charCode];
                  Index++;
                  break;
                case 117:
                  begin = ++Index;
                  for (position = Index + 4; Index < position; Index++) {
                    charCode = source.charCodeAt(Index);
                    if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                      abort();
                    }
                  }
                  value += fromCharCode('0x' + source.slice(begin, Index));
                  break;
                default:
                  abort();
                }
              } else {
                if (charCode == 34) {
                  break;
                }
                charCode = source.charCodeAt(Index);
                begin = Index;
                while (charCode >= 32 && charCode != 92 && charCode != 34) {
                  charCode = source.charCodeAt(++Index);
                }
                value += source.slice(begin, Index);
              }
            }
            if (source.charCodeAt(Index) == 34) {
              Index++;
              return value;
            }
            abort();
          default:
            begin = Index;
            if (charCode == 45) {
              isSigned = true;
              charCode = source.charCodeAt(++Index);
            }
            if (charCode >= 48 && charCode <= 57) {
              if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                abort();
              }
              isSigned = false;
              for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
              if (source.charCodeAt(Index) == 46) {
                position = ++Index;
                for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                if (position == Index) {
                  abort();
                }
                Index = position;
              }
              charCode = source.charCodeAt(Index);
              if (charCode == 101 || charCode == 69) {
                charCode = source.charCodeAt(++Index);
                if (charCode == 43 || charCode == 45) {
                  Index++;
                }
                for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                if (position == Index) {
                  abort();
                }
                Index = position;
              }
              return +source.slice(begin, Index);
            }
            if (isSigned) {
              abort();
            }
            if (source.slice(Index, Index + 4) == 'true') {
              Index += 4;
              return true;
            } else if (source.slice(Index, Index + 5) == 'false') {
              Index += 5;
              return false;
            } else if (source.slice(Index, Index + 4) == 'null') {
              Index += 4;
              return null;
            }
            abort();
          }
        }
        return '$';
      };
      var get = function (value) {
        var results, hasMembers;
        if (value == '$') {
          abort();
        }
        if (typeof value == 'string') {
          if (value[0] == '@') {
            return value.slice(1);
          }
          if (value == '[') {
            results = [];
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              if (value == ']') {
                break;
              }
              if (hasMembers) {
                if (value == ',') {
                  value = lex();
                  if (value == ']') {
                    abort();
                  }
                } else {
                  abort();
                }
              }
              if (value == ',') {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == '{') {
            results = {};
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              if (value == '}') {
                break;
              }
              if (hasMembers) {
                if (value == ',') {
                  value = lex();
                  if (value == '}') {
                    abort();
                  }
                } else {
                  abort();
                }
              }
              if (value == ',' || typeof value != 'string' || value[0] != '@' || lex() != ':') {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          abort();
        }
        return value;
      };
      var update = function (source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };
      var walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == 'object' && value) {
          if (getClass.call(value) == arrayClass) {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = '' + source;
        result = get(lex());
        if (lex() != '$') {
          abort();
        }
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[''] = result, value), '', callback) : result;
      };
    }
  }
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}(this));