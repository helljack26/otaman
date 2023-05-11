/*!
 * maskedinput.js 1.0.15
 * git://github.com/danielgindi/jquery.maskedinput.git
 */
'use strict';

var $ = require('jquery');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$a =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var fails$7 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$6 = fails$7;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$6(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var makeBuiltIn$2 = {exports: {}};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$8 = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var fails$5 = fails$7;

var functionBindNative = !fails$5(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var call$3 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);

var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$3.apply(fn, arguments);
  };
};

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$2 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$1 = isNullOrUndefined$2;

var $TypeError$5 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$1 = function (it) {
  if (isNullOrUndefined$1(it)) throw $TypeError$5("Can't call method on " + it);
  return it;
};

var requireObjectCoercible = requireObjectCoercible$1;

var $Object$1 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return $Object$1(requireObjectCoercible(argument));
};

var uncurryThis$3 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty$1 = uncurryThis$3({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1(toObject(it), key);
};

var DESCRIPTORS$6 = descriptors;
var hasOwn$3 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$6 && Object.getOwnPropertyDescriptor;

var EXISTS$1 = hasOwn$3(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$6 || (DESCRIPTORS$6 && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS$1,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE$1
};

var global$9 = global$a;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$2 = Object.defineProperty;

var defineGlobalProperty$1 = function (key, value) {
  try {
    defineProperty$2(global$9, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$9[key] = value;
  } return value;
};

var global$8 = global$a;
var defineGlobalProperty = defineGlobalProperty$1;

var SHARED = '__core-js_shared__';
var store$3 = global$8[SHARED] || defineGlobalProperty(SHARED, {});

var sharedStore = store$3;

var uncurryThis$2 = functionUncurryThis;
var isCallable$7 = isCallable$8;
var store$2 = sharedStore;

var functionToString = uncurryThis$2(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$7(store$2.inspectSource)) {
  store$2.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$2.inspectSource;

var global$7 = global$a;
var isCallable$6 = isCallable$8;

var WeakMap$1 = global$7.WeakMap;

var weakMapBasicDetection = isCallable$6(WeakMap$1) && /native code/.test(String(WeakMap$1));

var isCallable$5 = isCallable$8;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$5 = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$5(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$5(it);
};

var objectDefineProperty = {};

var global$6 = global$a;
var isObject$4 = isObject$5;

var document$1 = global$6.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$4(document$1) && isObject$4(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$4 = fails$7;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$5 && !fails$4(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$4 = descriptors;
var fails$3 = fails$7;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$3 = isObject$5;

var $String$1 = String;
var $TypeError$4 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$2 = function (argument) {
  if (isObject$3(argument)) return argument;
  throw $TypeError$4($String$1(argument) + ' is not an object');
};

var NATIVE_BIND = functionBindNative;

var call$2 = Function.prototype.call;

var functionCall = NATIVE_BIND ? call$2.bind(call$2) : function () {
  return call$2.apply(call$2, arguments);
};

var global$5 = global$a;
var isCallable$4 = isCallable$8;

var aFunction = function (argument) {
  return isCallable$4(argument) ? argument : undefined;
};

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$5[namespace]) : global$5[namespace] && global$5[namespace][method];
};

var uncurryThis$1 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$1({}.isPrototypeOf);

var getBuiltIn$1 = getBuiltIn$2;

var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

var global$4 = global$a;
var userAgent = engineUserAgent;

var process = global$4.process;
var Deno = global$4.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$2 = fails$7;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$2(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn = getBuiltIn$2;
var isCallable$3 = isCallable$8;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable$3($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

var $String = String;

var tryToString$1 = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$2 = isCallable$8;
var tryToString = tryToString$1;

var $TypeError$3 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$2(argument)) return argument;
  throw $TypeError$3(tryToString(argument) + ' is not a function');
};

var aCallable = aCallable$1;
var isNullOrUndefined = isNullOrUndefined$2;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

var call$1 = functionCall;
var isCallable$1 = isCallable$8;
var isObject$2 = isObject$5;

var $TypeError$2 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$1(fn = input.toString) && !isObject$2(val = call$1(fn, input))) return val;
  if (isCallable$1(fn = input.valueOf) && !isObject$2(val = call$1(fn, input))) return val;
  if (pref !== 'string' && isCallable$1(fn = input.toString) && !isObject$2(val = call$1(fn, input))) return val;
  throw $TypeError$2("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var store$1 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.26.1',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var uncurryThis = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

var global$3 = global$a;
var shared$2 = shared$3.exports;
var hasOwn$2 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$3.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$1 = function (name) {
  if (!hasOwn$2(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$2(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call = functionCall;
var isObject$1 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol = wellKnownSymbol$1;

var $TypeError$1 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$1(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject$1(result) || isSymbol$1(result)) return result;
    throw $TypeError$1("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$1 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$1 = anObject$2;
var toPropertyKey = toPropertyKey$1;

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var createPropertyDescriptor$1 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$1;

var createNonEnumerableProperty$1 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$2 = global$a;
var isObject = isObject$5;
var createNonEnumerableProperty = createNonEnumerableProperty$1;
var hasOwn$1 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$2.TypeError;
var WeakMap = global$2.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  set = function (it, metadata) {
    if (hasOwn$1(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$1(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$1(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$1 = fails$7;
var isCallable = isCallable$8;
var hasOwn = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$1(function () {
  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS$1) defineProperty$1(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty$1(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$1) defineProperty$1(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

var makeBuiltIn = makeBuiltIn$2.exports;
var defineProperty = objectDefineProperty;

var defineBuiltInAccessor$1 = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

var anObject = anObject$2;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var global$1 = global$a;
var DESCRIPTORS = descriptors;
var defineBuiltInAccessor = defineBuiltInAccessor$1;
var regExpFlags = regexpFlags;
var fails = fails$7;

// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp$1 = global$1.RegExp;
var RegExpPrototype = RegExp$1.prototype;

var FORCED = DESCRIPTORS && fails(function () {
  var INDICES_SUPPORT = true;
  try {
    RegExp$1('.', 'd');
  } catch (error) {
    INDICES_SUPPORT = false;
  }

  var O = {};
  // modern V8 bug
  var calls = '';
  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  var addGetter = function (key, chr) {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(O, key, { get: function () {
      calls += chr;
      return true;
    } });
  };

  var pairs = {
    dotAll: 's',
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y'
  };

  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  for (var key in pairs) addGetter(key, pairs[key]);

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var result = Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call(O);

  return result !== expected || calls !== expected;
});

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) defineBuiltInAccessor(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @typedef {string} MaskedInput~PartType
 * @name MaskedInput~PartType
 * @enum {string}
 */
const PartType = {
  /** @const */NUMBER: 'number',
  /** @const */TEXT: 'text',
  /** @const */LABEL: 'label'
};

/**
 * @typedef {Object} MaskedInput~Part
 * @property {MaskedInput~PartType} [type] - Type of the field
 * @property {string|undefined} [name] - Name for this field
 * @property {string|undefined} [ariaLabel] - An ARIA accessibility label
 * @property {string|undefined} [text] - Text for this field if it's a LABEL
 * @property {string|undefined} [placeholder] - Placeholder for the field
 * @property {number} [length] - Length of the field
 * @property {number} [maxLength] - Maximum length of the field
 * @property {number|undefined} [numericMin] - Minimum numeric value
 * @property {number|undefined} [numericMax] - Maximum numeric value
 * @property {boolean|undefined} [wholeNumber] - Force the number to be whole? (default `false`)
 * @property {RegExp|string|function(value:string)|undefined} [validator] - Validator regex or function
 * @property {string[]|undefined} [options] - Options to choose from for textual field
 * @property {function(value,part:MaskedInput~Part)|undefined} [postProcess] - Function for post processing a value before retrieving by user
 * @property {boolean|number|undefined} [padding] - Enable padding in value result (default `true`)
 * @property {boolean|undefined} [required] - Is the field required (default `true`)
 * @property {string|undefined} [defaultValue] - Default value, used if field is not `required`
 * @property {boolean|undefined} [forcePlaceholderWidth] - Always consider placeholder's width (default `true`)
 */

/**
 * @typedef {Object} MaskedInput~Pattern
 * @property {RegExp|string} [pattern] - Pattern to recognize in the format
 * @property {MaskedInput~PartType} [type] - Type of the field
 * @property {string|undefined} [name] - Name for this field
 * @property {string|undefined} [ariaLabel] - An ARIA accessibility label
 * @property {string|function(match):string|undefined} [text] - Text for this field if it's a LABEL
 * @property {string|function(match):string|undefined} [placeholder] - Placeholder for the field
 * @property {number|function(match):number} [length] - Length of the field
 * @property {number|function(match):number} [maxLength] - Maximum length of the field
 * @property {number|function(match):number|undefined} [numericMin] - Minimum numeric value
 * @property {number|function(match):number|undefined} [numericMax] - Maximum numeric value
 * @property {boolean|undefined} [wholeNumber] - Force the number to be whole? (default `false`)
 * @property {RegExp|string|function(value:string)|undefined} [validator] - Validator regex or function
 * @property {string[]|function(match):string[]|undefined} [options] - Options to choose from for textual field
 * @property {function(value,part:MaskedInput~Part)|undefined} [postProcess] - Function for post processing a value before retrieving by user
 * @property {boolean|number|function(match):(boolean|number)|undefined} [padding] - Enable padding in value result (default `true`)
 * @property {boolean|function(match):boolean|undefined} [required] - Is the field required (default `true`)
 * @property {string|function(match):string|undefined} [defaultValue] - Default value, used if field is not `required`
 * @property {boolean|function(match):boolean|undefined} [forcePlaceholderWidth] - Always consider placeholder's width (default `true`)
 */

/**
 * @typedef {Object} MaskedInput~Options
 * @property {Element} [root] - Set a root element to attach to
 * @property {string} [className='masked-input'] - alternative classname for root element
 * @property {string} [format] - Format to show
 * @property {Object<string, MaskedInput~Pattern>} [patterns] - Additional patterns to recognize in the format
 * @property {Object<string, MaskedInput~Part>} [defaultPartOptions] - Default options for recognized parts in the format
 * @property {boolean?} [autoSelectOnFocus=false] - Auto select part content on focus */
const defaults = /** @type {MaskedInput.Options} */{
  patterns: {},
  autoSelectOnFocus: false,
  className: 'masked-input'
};

const execRegexWithLeftovers = function (regex, input, onMatch, onLeftover) {

  let match,lastIndex = 0;
  regex.lastIndex = 0;
  while (match = regex.exec(input)) {

    // Add skipped raw text
    if (match.index > lastIndex) {
      onLeftover(input.substring(lastIndex, match.index));
    }

    onMatch(match);

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (input.length > lastIndex) {
    onLeftover(input.substring(lastIndex, input.length));
  }

};

/**
 * Get the selection range in an element
 * @param {HTMLInputElement} el
 * @returns {{begin: number, end: number, direction: 'forward'|'backward'|'none'|undefined}}
 */
const getSelectionRange = function (el) {
  let begin,end,direction = 'none';

  if (el.setSelectionRange) {

    begin = el.selectionStart;
    end = el.selectionEnd;
    direction = el.selectionDirection;

  } else if (document.selection && document.selection.createRange) {

    const range = document.selection.createRange();
    begin = 0 - range.duplicate().moveStart('character', -10000);
    end = begin + range.text.length;
  }

  return {
    begin: begin,
    end: end,
    direction: direction
  };
};

/**
 * Set the selection range in an element
 * @param {HTMLInputElement} el
 * @param {number|{begin: number, end: number, direction: 'forward'|'backward'|'none'|undefined}} begin
 * @param {number?} end
 * @param {('forward'|'backward'|'none')?} direction
 */
const setSelectionRange = function (el, begin, end, direction) {

  if (typeof arguments[1] === 'object' && 'begin' in arguments[1]) {
    begin = arguments[1].begin;
    end = arguments[1].end;
    direction = arguments[1].direction;
  }

  if (direction === undefined) {
    if (typeof arguments[2] === 'string' && (
    arguments[2] === 'forward' || arguments[2] === 'backward' || arguments[2] === 'none')) {
      direction = arguments[2];
      end = null;
    }
  }

  end = end == null ? begin : end;

  if (el.setSelectionRange) {
    el.setSelectionRange(begin, end, direction);

  } else {
    if (el.createTextRange) {
      const range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', begin);
      range.select();
    }
  }

};

const repeatChar$1 = function (char, length) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += char;
  }
  return out;
};

/**
 * @param {string[]} options
 * @param {string} term
 * @param {boolean?} closestChoice
 * @param {boolean?} returnFullMatch
 * @param {boolean?} caseSensitive
 * @returns {string|undefined}
 */
const findMatchInArray = function (options, term, closestChoice, returnFullMatch, caseSensitive) {

  let i, option, optionLower;
  const termLower = caseSensitive ? term : term.toLowerCase();

  if (closestChoice) {
    // Search for a partial option or partial content match, return the longest match found, or `false`

    let maxMatchLength = 0;
    let maxMatchOption;
    let maxMatchFullOption;

    for (i = 0; i < options.length; i++) {
      option = options[i];
      optionLower = caseSensitive ? option : option.toLowerCase();

      for (let clen = Math.min(option.length, 1); clen <= term.length; clen++) {
        if (option.length >= clen &&
        optionLower.substr(0, clen) === termLower.substr(0, clen)) {
          if (clen > maxMatchLength) {
            maxMatchLength = clen;
            maxMatchOption = option.substr(0, clen);
            maxMatchFullOption = option;
          }
        } else {
          break;
        }
      }
    }

    return returnFullMatch ? maxMatchFullOption : maxMatchOption;

  } else {

    // Search for an exact match or option "starts with" the content - all case insensitive
    for (i = 0; i < options.length; i++) {
      option = options[i];
      optionLower = caseSensitive ? option : option.toLowerCase();

      if (option.length >= term.length &&
      optionLower.substr(0, term.length) === termLower)
      return returnFullMatch ? option : true;
    }
  }
};

/**
 * Regex escape
 * @param {string} str
 * @returns {string}
 */
const escapeRegExp = function (str) {
  return str.replace(/[-[\]/{}()*+?.\\$|]/g, '\\$&');
};
/**
 * Search for closest element to a specified point
 * @param {HTMLElement[]} elements
 * @param {{left: number, top: number }} offset
 * @returns {HTMLElement|null}
 */
const closestToOffset = function (elements, offset) {
  const x = offset.left,
    y = offset.top;
  let bestMatch = null,
    minDistance = null;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i],$el = $(el);
    const elOffset = $el.offset();

    elOffset.right = elOffset.left + $el.outerWidth();
    elOffset.bottom = elOffset.top + $el.outerHeight();

    if (
    x >= elOffset.left && x <= elOffset.right &&
    y >= elOffset.top && y <= elOffset.bottom)
    {
      return el;
    }

    const offsets = [
    [elOffset.left, elOffset.top],
    [elOffset.right, elOffset.top],
    [elOffset.left, elOffset.bottom],
    [elOffset.right, elOffset.bottom]];


    for (let o = 0; o < 4; o++) {
      const offset = offsets[o];
      const dx = offset[0] - x;
      const dy = offset[1] - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (minDistance == null || distance < minDistance) {
        minDistance = distance;
        bestMatch = el;
      }
    }
  }

  return bestMatch;
};

const callFunctor = function (functor, bind, _arg1) {
  return typeof functor === 'function' ?
  functor.apply(bind, Array.prototype.slice.call(arguments, 2)) :
  functor;
};

const inputBackbufferCssProps = [
'font-family',
'font-size',
'font-weight',
'font-size',
'letter-spacing',
'text-transform',
'word-spacing',
'text-indent',
'box-sizing',
'padding-left',
'padding-right'];


const hasComputedStyle = document.defaultView && document.defaultView.getComputedStyle;

/**
 * Gets the precise content width for an element, with fractions
 * @param {Element} el
 * @returns {number}
 */
const getPreciseContentWidth = function (el) {

  const style = hasComputedStyle ? document.defaultView.getComputedStyle(el) : el.currentStyle;
  let width = parseFloat(style['width']) || 0;

  if (style['boxSizing'] === 'border-box') {
    width -= parseFloat(style['paddingLeft']) || 0;
    width -= parseFloat(style['paddingRight']) || 0;
    width -= parseFloat(style['borderLeftWidth']) || 0;
    width -= parseFloat(style['borderRightWidth']) || 0;

    if (width < 0) {
      width = 0;
    }
  }

  return width;
};

const FOCUSABLES = [
'a[href]',
'area[href]',
'input:not([disabled])',
'select:not([disabled])',
'textarea:not([disabled])',
'button:not([disabled])',
'iframe',
'object',
'embed',
'*[tabindex]',
'*[contenteditable]'];


const FOCUSABLE_SELECTOR = FOCUSABLES.join(',');
const TABBABLE_SELECTOR = FOCUSABLES.map((x) => x + ':not([tabindex=-1])').join(',');

const KEY_ENTER = 13;
const KEY_ARROW_UP = 38;
const KEY_ARROW_DOWN = 40;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;

/** @class MaskedInput */
class MaskedInput {
  /**
   * @param {MaskedInput.Options?} options
   * @returns {MaskedInput}
   */
  constructor(options) {
    /** @private */
    const o = this.o = $.extend({}, MaskedInput.defaults, options);

    let patterns = {};
    MaskedInput.patternAddons.forEach((addon) => {
      patterns = $.extend(patterns, addon);
    });
    patterns = $.extend(patterns, o.patterns);
    o.patterns = patterns;

    /** This is for encapsulating private data */
    const p = this.p = {};

    p.enabled = true;
    p.inputs = [];
    p.inputsByKey = Object.create(null);

    /**
     * @public
     * @type Element
     * */
    let el = this.el = o.root instanceof $ ? o.root[0] : o.root;

    /** @type JQuery */
    let $el;

    if (!el) {
      $el = $('<div>');
      el = this.el = /**@type Element*/$el[0];
      p.ownsEl = true;
    } else {
      $el = $(el);
      p.ownsEl = false;
    }

    this.$el = $el;

    $el.addClass(o.className || 'masked-input');

    // Set control data
    $el.
    data('control', this).
    data('maskedinput', this);

    // Parse format
    p.parsed = this._parseFormat(o.format);

    // Create backbuffer for input
    p.$inputBackBuffer = $('<span aria-hidden="true" style="position:absolute;z-index:-1;left:0;top:-9999px;white-space:pre;"/>');

    // Hook up click event
    $el.on('click', (event) => {
      if (event.target !== event.currentTarget &&
      $(event.target).is(FOCUSABLE_SELECTOR)) return;

      const offset = $(event.currentTarget).offset();
      offset.left += event.offsetX;
      offset.top += event.offsetY;

      const el = closestToOffset($el.children(FOCUSABLE_SELECTOR), offset);

      if (el) {
        el.focus();
      }
    });

    this.render();

    setTimeout(() => {
      if (this.el && this.el.parentNode) {
        this.resize();
      }
    }, 0);

    return this;
  }

  // noinspection JSUnusedGlobalSymbols
  destroy() {
    const p = this.p;
    const o = this.o;

    if (p.ownsEl) {
      this.$el.remove();
    } else {
      this.$el.
      empty().
      removeData('control').
      removeData('maskedinput').
      removeClass(o.className || 'masked-input');
    }

    if (p.$inputBackBuffer)
    p.$inputBackBuffer.remove();
  }

  /**
   *
   * @private
   * @param format
   * @returns {MaskedInput~Part[]}
   */
  _parseFormat(format) {
    const o = this.o;

    let parsedFormat = [];

    // Loop through basic format matches

    execRegexWithLeftovers(FORMAT_REGEX, format, function onMatch(match) {

      const numericMatch = match[1] || match[2];
      const textMatch = match[3];
      const quotedMatch = match[4];

      let i, part;

      if (numericMatch) {
        part = { type: PartType.NUMBER };
        i = numericMatch.indexOf(':');

        if (i > -1) {
          part.length = i;
          part.name = numericMatch.substr(i + 1);
        } else {
          part.length = numericMatch.length;
        }

        if (match[2]) {// max length
          part.maxLength = part.length;
          part.length = 0;
        }

        parsedFormat.push(part);
      } else if (textMatch) {
        part = { type: PartType.TEXT };
        if (textMatch[0] === '*') {
          part.length = 0;
        } else {
          i = textMatch.indexOf(':');

          if (i > -1) {
            part.length = i;
            part.name = textMatch.substr(i + 1);
          } else {
            part.length = textMatch.length;
          }
        }
        parsedFormat.push(part);
      } else if (quotedMatch) {
        const labelText = quotedMatch.substr(1, quotedMatch.length - 2);
        part = {
          type: PartType.LABEL,
          text: labelText,
          length: labelText.length
        };
        parsedFormat.push(part);
      }

      if (part && o.defaultPartOptions && hasOwnProperty.call(o.defaultPartOptions, part.name)) {
        let defaults = o.defaultPartOptions[part.name];
        Object.assign(part, defaults);
      }

    }.bind(this), function onLeftover(leftover) {

      const leftoverParts = [];

      const part = {
        type: PartType.LABEL,
        text: leftover,
        length: leftover.length
      };
      leftoverParts.push(part);

      Object.keys(o.patterns).forEach((key) => {
        const patterns = o.patterns[key];

        const regex = new RegExp(
        patterns.pattern instanceof RegExp ?
        patterns.pattern.source :
        patterns.pattern,
        patterns.pattern instanceof RegExp ?
        patterns.pattern.flags + (patterns.pattern.flags.indexOf('g') > -1 ? '' : 'g') :
        'g');


        for (let fpos = 0; fpos < leftoverParts.length; fpos++) {
          const fpart = leftoverParts[fpos];
          if (fpart.type !== PartType.LABEL) continue;

          const newParts = [];

          execRegexWithLeftovers(regex, fpart.text, function onMatch(match) {

            let validator;
            if (patterns.validator instanceof RegExp || typeof patterns.validator === 'function') {
              validator = patterns.validator;
            } else if (typeof patterns.validator === 'string') {
              try {
                validator = new RegExp(patterns.validator);
              } catch (ignored) {/* nothing to do */}
            }

            // Translate the part
            const part = {
              type: callFunctor(patterns.type, this, match[0]),
              name: callFunctor(patterns.name, this, match[0]),
              ariaLabel: callFunctor(patterns.ariaLabel, this, match[0]),
              text: callFunctor(patterns.text, this, match[0]),
              placeholder: callFunctor(patterns.placeholder, this, match[0]),
              length: callFunctor(patterns.length, this, match[0]) || 0,
              maxLength: callFunctor(patterns.maxLength, this, match[0]) || 0,
              numericMin: callFunctor(patterns.numericMin, this, match[0]),
              numericMax: callFunctor(patterns.numericMax, this, match[0]),
              wholeNumber: callFunctor(patterns.wholeNumber, this, match[0]),
              validator: validator,
              options: callFunctor(patterns.options, this, match[0]),
              postProcess: patterns.postProcess,
              padding: callFunctor(patterns.padding, this, match[0]),
              required: callFunctor(patterns.required, this, match[0]),
              defaultValue: callFunctor(patterns.defaultValue, this, match[0]),
              forcePlaceholderWidth: callFunctor(patterns.forcePlaceholderWidth, this, match[0])
            };
            //noinspection JSReferencingMutableVariableFromClosure
            newParts.push(part);

          }.bind(this), function onLeftover(leftover) {
            const part = {
              type: PartType.LABEL,
              text: leftover,
              length: leftover.length
            };
            //noinspection JSReferencingMutableVariableFromClosure
            newParts.push(part);
          }.bind(this));

          // Replace old label with new parts
          Array.prototype.splice.apply(leftoverParts, [fpos, 1].concat(newParts));

          // Move leftoverParts position as necessary
          fpos += newParts.length - 1;
        }

      });

      parsedFormat = parsedFormat.concat(leftoverParts);
    }.bind(this));

    return parsedFormat;
  }

  render() {
    const p = this.p;

    this.$el.empty();

    const inputs = [];
    const inputsByKey = Object.create(null);

    p.parsed.forEach((part) => {
      if (part.type === PartType.LABEL) {
        const $el = this._renderText(part).appendTo(this.$el);
        part.$el = $el;
        part.el = $el[0];
        return;
      }

      const $input = this._renderInput(part).appendTo(this.$el);

      part.$el = $input;
      part.el = $input[0];

      inputs.push($input);

      if (part.name && parseInt(part.name, 10).toString() !== part.name) {
        inputsByKey[part.name] = (inputsByKey[part.name] || []).concat(part.el);
      }
    });

    p.inputs = inputs;
    p.inputsByKey = inputsByKey;

    this.resize();

    return this;
  }

  /**
   *
   * @private
   * @param {MaskedInput~Part} part
   * @param {HTMLInputElement?} input
   * @returns {jQuery}
   */
  _renderInput(part, input) {
    const p = this.p,o = this.o;

    const isNewInput = !input;

    let $input;

    if (isNewInput) {
      $input = $('<input>').data('part', part).prop('disabled', !p.enabled);
      input = $input[0];
      input.addEventListener('focus', () => {
        if (o.autoSelectOnFocus)
        input.select();
      });
    } else {
      $input = $(input);
    }

    if (part.name) {
      input.setAttribute('data-name', part.name);
    } else {
      input.removeAttribute('data-name');
    }

    if (part.ariaLabel) {
      input.setAttribute('aria-label', part.ariaLabel);
    } else {
      input.removeAttribute('aria-label');
    }

    if (part.length || part.maxLength || typeof part.placeholder === 'string') {
      //noinspection UnnecessaryLocalVariableJS
      const placeholder = typeof part.placeholder === 'string' ?
      part.placeholder :
      part.placeholder === undefined || part.placeholder ? repeatChar$1('_', part.length || part.maxLength) : '';
      input.placeholder = placeholder;
    }

    if (isNewInput) {
      $input.
      on('input.maskedinput', (event) => {
        this._handleInput(event, input, part);
        this._syncInputSizeForPart(part);
      }).
      on('keydown.maskedinput', (event) => {
        this._handleKeydown(event, input, part);
      }).
      on('keypress.maskedinput', (event) => {
        this._handleKeypress(event, input, part);
      });
    }

    return $input;
  }

  /**
   *
   * @private
   * @param {MaskedInput~Part} part
   * @returns {jQuery}
   */
  _renderText(part) {
    return $('<span style="white-space: pre">').text(part.text);
  }

  /**
   *
   * @private
   * @param {jQuery|Element|string} input
   * @param {boolean=true} alwaysConsiderPlaceholder
   * @param {string=A} fallbackText
   * @returns {MaskedInput}
   */
  _syncInputSize(input, alwaysConsiderPlaceholder, fallbackText) {
    const p = this.p;

    if (alwaysConsiderPlaceholder === undefined) {
      alwaysConsiderPlaceholder = true;
    }

    if (fallbackText === undefined) {
      fallbackText = 'A';
    }

    const $input = $(input),$backBuffer = p.$inputBackBuffer;

    /** @type {HTMLInputElement} */
    const inputEl = $input[0];

    fallbackText = fallbackText == null ? '' : fallbackText + '';
    const value = inputEl.value || inputEl.placeholder || fallbackText;

    // Introduce backbuffer to DOM
    $backBuffer.
    css($input.css(inputBackbufferCssProps)).
    text(value).
    appendTo(this.$el);

    // Measure these
    let backBufferWidth = getPreciseContentWidth($backBuffer[0]) + 1 /* caret width */;
    const currentWidth = getPreciseContentWidth(inputEl);

    if (alwaysConsiderPlaceholder &&
    inputEl.value &&
    inputEl.placeholder &&
    inputEl.placeholder !== inputEl.value) {
      $backBuffer.text(inputEl.placeholder);
      backBufferWidth = Math.max(
      backBufferWidth,
      getPreciseContentWidth($backBuffer[0]) + 1 /* caret width */);

    }

    // Compare
    if (backBufferWidth !== currentWidth) {
      // Update if needed
      $input.css('width', backBufferWidth + 'px');
    }

    if ($input[0].scrollWidth > backBufferWidth) {
      $input.css('width', inputEl.scrollWidth);
    }

    // Remove backbuffer from DOM
    $backBuffer.remove();

    return this;
  }

  /**
   *
   * @private
   * @param {MaskedInput~Part} part
   * @returns {MaskedInput}
   */
  _syncInputSizeForPart(part) {
    if (!part.el || part.type === PartType.LABEL) return this;
    return this._syncInputSize(
    part.el,
    part.forcePlaceholderWidth === undefined ? true : !!part.forcePlaceholderWidth);

  }

  /**
   *
   * @private
   * @param {jQuery.Event} event
   * @param {HTMLInputElement} input
   * @param {MaskedInput~Part} part
   * @returns {MaskedInput}
   */
  _handleInput(event, input, part) {
    const content = input.value;
    let validatedContent;

    // Update input if acceptable
    validatedContent = this._validateContent(content, part);

    if (validatedContent === false) {
      event.preventDefault();

      // Fire change event
      this.$el.trigger('change');

      return this;
    }

    if (typeof validatedContent === 'string' &&
    content !== validatedContent) {
      input.value = validatedContent;
    }

    this._syncInputSizeForPart(part);

    if (this._shouldMoveToNextFieldAfterInput(getSelectionRange(input), input.value, part)) {
      $(input).nextAll(TABBABLE_SELECTOR).first().focus();
    }

    // Fire change event
    this.$el.trigger('change');

    return this;
  }

  /**
   *
   * @private
   * @param {jQuery.Event} event
   * @param {HTMLInputElement} input
   * @param {MaskedInput~Part} part
   * @returns {MaskedInput}
   */
  _handleKeydown(event, input, part) {
    if (input.readOnly) return this;

    const keycode = event.which;
    let triggerChange = false;

    const contentBefore = input.value;
    let validatedContent;

    // Handle UP/DOWN arrows for next/previous value

    if (keycode === KEY_ARROW_UP || keycode === KEY_ARROW_DOWN) {

      let nextValue,tryToUpdate = false;

      const minLen = part.maxLength ?
      Math.max(1, Math.min(part.length || 0, part.maxLength || 1)) :
      part.length || 1;
      const maxLen = Math.max(part.length || 0, part.maxLength || 0);

      if (part.type === PartType.TEXT && part.options) {

        const fullMatch = findMatchInArray(part.options, contentBefore, true, true, false);
        let index = part.options.indexOf(fullMatch);

        if (index === -1) {
          if (keycode === KEY_ARROW_UP) {
            index = 0;
          } else {
            index = part.options.length - 1;
          }
        } else {
          index += keycode === KEY_ARROW_DOWN ? 1 : -1;
        }

        if (index === part.options.length) {
          index = 0;
        } else if (index === -1) {
          index = part.options.length - 1;
        }

        nextValue = part.options[index];

        tryToUpdate = true;

      } else if (part.type === PartType.NUMBER) {

        if (!contentBefore &&
        keycode === KEY_ARROW_DOWN &&
        part.wholeNumber && (
        typeof part.numericMax === 'number' || maxLen > 0) &&
        typeof part.numericMin === 'number' &&
        part.numericMin >= 0) {

          // Start with largest number if going down from nothing
          nextValue = typeof part.numericMax === 'number' ?
          part.numericMax :
          parseInt(repeatChar$1('9', maxLen), 10);

        } else if (!contentBefore &&
        keycode === KEY_ARROW_UP &&
        part.wholeNumber &&
        typeof part.numericMin === 'number') {

          // Start with minimum number
          nextValue = part.numericMin === 0 ? 1 : part.numericMin;

        } else {
          /// Up or down
          nextValue = parseFloat(contentBefore) || 0;
          nextValue += keycode === KEY_ARROW_UP ? 1 : -1;
        }

        // Limit to whole numbers
        if (part.wholeNumber) {
          nextValue = Math.round(nextValue);
        }

        // Limit to min/max
        if (typeof part.numericMin === 'number' || typeof part.numericMax === 'number') {
          nextValue = Math.max(
          Math.min(
          nextValue,
          typeof part.numericMax === 'number' ? part.numericMax : Infinity),

          typeof part.numericMin === 'number' ? part.numericMin : -Infinity);

        }

        nextValue = nextValue + '';

        // Left-pad with zeroes when we figure out that we want that
        if (typeof part.numericMin === 'number' &&
        part.numericMin >= 0) {
          nextValue = repeatChar$1('0', minLen - nextValue.length) + nextValue;
        }

        tryToUpdate = true;
      }

      // Update input if acceptable
      if (tryToUpdate && nextValue !== contentBefore) {
        validatedContent = this._validateContent(nextValue, part);
        if (validatedContent === true) {
          validatedContent = nextValue;
        }
        if (validatedContent !== false) {
          input.value = validatedContent;
          this._syncInputSizeForPart(part);
          event.preventDefault();

          triggerChange = true;
        }
      }
    }

    if (triggerChange) {
      // Fire change event
      this.$el.trigger('change');
    }

    // Handle LEFT/RIGHT arrows, basically when we are at the end/beginning of an input
    if (keycode === KEY_ARROW_LEFT || keycode === KEY_ARROW_RIGHT) {
      const isRtl = $(input).css('direction') === 'rtl';

      if (!isRtl && keycode === KEY_ARROW_LEFT || isRtl && keycode === KEY_ARROW_RIGHT) {
        if (getSelectionRange(input).begin === 0) {
          $(input).prevAll(TABBABLE_SELECTOR).first().focus();
        }
      } else {
        if (getSelectionRange(input).begin === input.value.length) {
          $(input).nextAll(TABBABLE_SELECTOR).first().focus();
        }
      }
    }

    return this;
  }

  /**
   *
   * @private
   * @param {jQuery.Event} event
   * @param {HTMLInputElement} input
   * @param {MaskedInput~Part} part
   * @returns {MaskedInput}
   */
  _handleKeypress(event, input, part) {
    if (input.readOnly) return this;

    const keycode = event.which;
    const pos = getSelectionRange(input);

    if (event.ctrlKey || event.altKey || event.metaKey ||
    !keycode ||
    keycode < 32 || keycode === KEY_ENTER) return this; // Not a character, perform default

    event.preventDefault();

    let triggerChange = false;
    let moveToNextField = false;

    const pressedChar = event.key || String.fromCharCode(keycode);

    const contentBefore = input.value;
    let contentAfter = contentBefore.substr(0, pos.begin) +
    pressedChar +
    contentBefore.substr(pos.end);

    const validatedContent = this._validateContent(contentAfter, part);
    if (validatedContent === false) return this; // Not validated, ignore keypress

    if (typeof validatedContent === 'string') {
      contentAfter = validatedContent;
    }

    if (contentAfter !== contentBefore || contentAfter.substr(pos.begin, 1) === pressedChar) {

      const newPos = {};

      // Set caret at new position

      if (pos.end - pos.begin > 0 && pos.direction === 'backward') {
        newPos.begin = newPos.end = pos.begin;
      } else {
        newPos.begin = newPos.end = pos.begin + 1;
      }

      // Show rest of only choice found
      if (part.type === PartType.TEXT && part.options) {

        const fullMatch = findMatchInArray(part.options, contentAfter, false, true, false);
        if (fullMatch !== undefined && fullMatch.length !== contentAfter.length) {
          // Choose a selection range for the rest of the match
          newPos.begin = contentAfter.length;
          newPos.end = fullMatch.length;

          // Set new input to full match
          contentAfter = fullMatch;
        }

      }

      // Update value
      input.value = contentAfter;

      // Update selection / caret
      //noinspection JSCheckFunctionSignatures
      setSelectionRange(input, newPos);

      // See if we need to move on to next field
      moveToNextField = this._shouldMoveToNextFieldAfterInput(newPos, contentAfter, part);

      triggerChange = true;

    } else {

      // These are usually used as separators
      if (pressedChar === '/' ||
      pressedChar === ':' ||
      pressedChar === '-' ||
      pressedChar === '(' ||
      pressedChar === ')' ||
      pressedChar === '.') {
        moveToNextField = true;
      }
    }

    this._syncInputSizeForPart(part);

    if (triggerChange) {
      // Fire change event
      this.$el.trigger('change');
    }

    if (moveToNextField) {
      $(input).nextAll(TABBABLE_SELECTOR).first().focus();
    }

    return this;
  }

  /**
   * Determines if we need to skip to next field after input change
   * @private
   * @param {{begin: number, end: number}} newPos
   * @param {string} newContent
   * @param {MaskedInput~Part} part
   */
  _shouldMoveToNextFieldAfterInput(newPos, newContent, part) {
    if (newPos.begin === newContent.length) {
      if (part.type === PartType.TEXT) {
        return findMatchInArray(part.options, newContent, false, true, false) === newContent;
      } else {
        return (part.length || part.maxLength || 0) > 0 &&
        newContent.length === (part.length || part.maxLength);
      }
    }

    return false;
  }

  /**
   *
   * @private
   * @param {string} content
   * @param {MaskedInput~Part} part
   * @returns {string|boolean}
   */
  _validateContent(content, part) {

    // Priority given to validator
    if (part.validator) {
      if (part.validator instanceof RegExp) {
        return part.validator.test(content);
      }

      let ret = part.validator.call(this, content, part);
      if (ret == null) {
        ret = false;
      }
      return ret;
    }

    const maxLen = Math.max(part.length || 0, part.maxLength || 0);

    // Test numeric
    if (part.type === PartType.NUMBER) {

      if (part.wholeNumber) {
        content = content.replace(/[^-0-9]/g, ''); // Zeroes and "-" only
      } else {
        content = content.replace(/[^-0-9.]/g, ''); // Zeroes, "-" and "." only
      }

      content = content.
      replace(/^.+-/g, '-') // Dash can only be at the beginning
      .replace(/\..*\./g, '.'); // Only one decimal point

      if (maxLen > 0 && content.length > maxLen) {
        content = content.substr(0, maxLen);
      }

      // Limit to min/max
      // It's important to do this AFTER trimming the value,
      // To allow inserting character in the middle.
      if (typeof part.numericMin === 'number' || typeof part.numericMax === 'number') {
        let parsedValue = parseFloat(content);
        if (!isNaN(parsedValue)) {
          parsedValue = Math.max(
          Math.min(
          parsedValue,
          typeof part.numericMax === 'number' ? part.numericMax : Infinity),

          typeof part.numericMin === 'number' ? part.numericMin : -Infinity);


          if (parsedValue !== parseFloat(content)) {
            content = parsedValue + '';
          }
        }
      }

      if (!content) {
        return false;
      }

      return content;
    }

    // Test textual
    if (part.type === PartType.TEXT) {
      if (part.options) {
        const match = findMatchInArray(part.options, content, true, false, false);
        if (match !== undefined) {
          return match;
        }
        return false;
      }

      return maxLen === 0 || content.length <= maxLen;
    }

    return false;
  }

  /**
   * @public
   * @returns {MaskedInput}
   */
  resize() {
    const p = this.p;

    (p.parsed || []).forEach((part) => this._syncInputSizeForPart(part));

    return this;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Retrieve a field element by index or label
   * @public
   * @param {number|string} index
   * @returns {HTMLInputElement}
   */
  field(index) {
    const p = this.p;

    const input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];

    if (!input) return undefined;

    return $.isArray(input) ? input.slice(0) : input;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Retrieve field count
   * @public
   * @returns {number}
   */
  get fieldCount() {
    const p = this.p;
    return p.inputs.length;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Retrieve field count
   * @public
   * @returns {string[]}
   */
  get fieldKeys() {
    const p = this.p;
    return Object.keys(p.inputsByKey);
  }

  /**
   * Creates a pattern for parsing an incoming value
   * @private
   * @returns {string}
   */
  _valuePattern() {
    const p = this.p;

    let pattern = '';

    p.parsed.forEach((part) => {
      let group = '';

      const minLen = part.maxLength ?
      Math.max(1, Math.min(part.length || 0, part.maxLength || 1)) :
      part.length || 1;
      const maxLen = Math.max(part.length || 0, part.maxLength || 0);

      if (part.type === PartType.TEXT) {
        if (part.options) {
          for (let i = 0; i < part.options.length; i++) {
            if (i > 0) {
              group += '|';
            }
            group += escapeRegExp(part.options[i]);
          }
        } else {
          if (maxLen) {
            group += '.{0,' + maxLen + '}';
          } else {
            group += '.*?';
          }
        }
      } else if (part.type === PartType.NUMBER) {
        if (part.wholeNumber) {
          if (part.length > 0) {
            group += '[-+]' + '[0-9]{' + (minLen - 1) + ',' + (maxLen - 1) + '}';
            group += '|[0-9]{' + minLen + ',' + maxLen + '}';
          } else {
            group += '[-+]?[0-9]+';
          }
        } else {
          if (maxLen) {
            group += '[-+]' + '[0-9.]{' + (minLen - 1) + ',' + (maxLen - 1) + '}';
            group += '|[0-9.]{' + minLen + ',' + maxLen + '}';
          } else {
            group += '[-+]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)';
          }
        }
      } else /* if (part.type === PartType.LABEL) */{
          group += escapeRegExp(part.text == null ? '' : part.text + '');
        }

      pattern += '(' + group + ')';

      if (part.required !== undefined && !part.required) {
        pattern += '?';
      }
    });

    return '^' + pattern + '$';
  }

  /**
   * Retrieve or set an input element's value
   * @private
   * @param {HTMLInputElement|jQuery|string} input
   * @param {string?} newValue
   * @returns {string|MaskedInput|undefined}
   */
  _fieldValue(input, newValue) {
    const $input = $(input);
    if (!$input.length) return undefined;
    input = $input[0];

    const part = /**MaskedInput~Part=*/$input.data('part');
    let validatedValue;

    if (newValue === undefined) {
      let value = input.value;

      // Predefined choices?
      if (part.type === PartType.TEXT && part.options) {
        return findMatchInArray(part.options, value, true, true, false);
      }

      // Enforce length
      const maxLen = Math.max(part.length || 0, part.maxLength || 0);
      if (maxLen > 0 && value.length > maxLen) {
        value = value.substr(0, maxLen);
      }

      // Validate value
      validatedValue = this._validateContent(value, part);
      if (validatedValue === false) return undefined;

      if (validatedValue !== true) {// A string, probably
        value = validatedValue + '';
      }

      return value;
    } else {
      newValue = newValue == null ? '' : newValue + '';
      validatedValue = this._validateContent(newValue, part);
      if (validatedValue === false) {
        validatedValue = '';
      } else if (validatedValue === true) {
        validatedValue = newValue;
      }

      input.value = validatedValue;

      this._syncInputSizeForPart(part);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Retrieve an input element's value by index or label
   * @public
   * @param {number|string} index
   * @param {string?} newValue
   * @returns {string|MaskedInput|undefined}
   */
  fieldValue(index, newValue) {
    const p = this.p;

    const input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];

    if (!input) return undefined;

    if (newValue === undefined) {
      return this._fieldValue(input);
    } else {
      this._fieldValue(input, newValue);
      return this;
    }
  }

  /**
   * Gets or sets an option by name
   * @param {string} name
   * @param {*?} newValue
   * @returns {MaskedInput}
   */
  option(name, newValue) {
    const o = this.o;

    if (arguments.length === 2) {
      if (name === 'patterns') {
        o[name] = {};

        MaskedInput.patternAddons.forEach((addon) => {
          o[name] = $.extend(o[name], addon);
        });

        o[name] = $.extend(o[name], newValue);
      } else {
        o[name] = newValue;
      }
    } else {
      return o[name];
    }
  }

  /**
   * Gets or sets a part's option by option name
   * @private
   * @param {MaskedInput~Part} part
   * @param {string|Object<string, *>} name
   * @param {*?} value
   * @returns {MaskedInput|*}
   */
  _fieldOption(part, name, value) {
    const p = this.p;

    if (!part) {
      return arguments.length === 3 ? this : undefined;
    }

    if (arguments.length === 3 || typeof name === 'object') {

      if (typeof name === 'object') {
        // Set the options object for part
        Object.keys( /**@type {Object<string, *>}*/name).forEach((key) => {
          this._fieldOption(part, key, name[key]);
        });

        return this;
      }

      if (name === 'name' && part.name !== value) {

        // Remove by the old name
        if (parseInt(part.name, 10).toString() !== part.name &&
        p.inputsByKey[part.name]) {
          if (p.inputsByKey[part.name] instanceof HTMLElement) {
            delete p.inputsByKey[part.name];
          } else {
            p.inputsByKey[part.name].splice(p.inputsByKey[part.name].indexOf(part), 1);
            if (p.inputsByKey[part.name].length === 1) {
              p.inputsByKey[part.name] = p.inputsByKey[part.name][0];
            }
          }
        }

        // Assign the new name
        if (value && parseInt(value, 10).toString() !== value) {
          if (p.inputsByKey[value]) {
            if (p.inputsByKey[value] instanceof HTMLElement) {
              p.inputsByKey[value] = [p.inputsByKey[value], part];
            } else {
              p.inputsByKey[value] = part;
            }
          } else {
            p.inputsByKey[value] = part;
          }
        }
      }

      if (name !== 'el' && name !== '$el') {
        // Do not allow overriding the internal element pointer by mistake
        part[name] = value;
      }

      if (part.el && (
      name === 'length' ||
      name === 'name' ||
      name === 'ariaLabel' ||
      name === 'placeholder')) {
        this._renderInput(part, part.el);
      }

    } else {

      if (Array.isArray(name)) {
        // Return value mapping as an object
        const options = {};

        /**@type string[]*/name.forEach((key) => {
          options[key] = part[key];
        });

        return options;
      } else {
        // Return value
        return part[name];
      }
    }

    return this;
  }

  /**
   * Gets or sets a part's option by part's index and option name
   * @public
   * @param {number|string} index
   * @param {string|Object} name
   * @param {*?} value
   * @returns {MaskedInput|*}
   */
  fieldOption(index, name, value) {
    const that = this,
      p = this.p;

    const input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];
    if (!input) return this;

    if (input.length > 1) {
      if (arguments.length === 3 || typeof name === 'object') {

        // Set the option/options for all inputs
        input.forEach((el) => {
          that._fieldOption($(el).data('part'), name, value);
        });

        delete p.valueRegex;

        return this;
      } else {

        // Return array of option/options for all inputs
        return input.map((el) => that._fieldOption($(el).data('part'), name));
      }
    } else {
      if (arguments.length === 3) {

        // Set the option/options for input
        this._fieldOption($(input).data('part'), name, value);

        delete p.valueRegex;

        return this;
      } else {

        // Return value/values
        return this._fieldOption($(input).data('part'), name);
      }
    }
  }

  /**
   * Get or set the full value
   * @public
   * @param {string?} newValue
   * @returns {string|undefined|MaskedInput}
   */
  value(newValue) {
    const p = this.p;

    let pi, part, value;

    if (newValue === undefined) {

      let out = '';

      for (pi = 0; pi < p.parsed.length; pi++) {
        part = p.parsed[pi];

        if (part.type === PartType.TEXT) {

          value = this._fieldValue(part.el);

          // Check that the value is OK
          if (part.postProcess) {
            value = part.postProcess.call(this, value, part) + '';
          }

          if (value === undefined) {
            if (part.required === undefined || part.required) {
              return undefined;
            }

            value = part.defaultValue || '';
          }

          out += value === undefined ? '' : value;

        } else if (part.type === PartType.NUMBER) {

          value = this._fieldValue(part.el);

          // Check that the value is OK
          if (value === undefined) {
            if (part.required === undefined || part.required) {
              return undefined;
            }

            value = part.defaultValue || '';
          }

          // Post process
          if (part.postProcess) {
            value = part.postProcess.call(this, value, part);

            // Check again that the value is OK
            if (value === undefined) {
              if (part.required === undefined || part.required) {
                return undefined;
              }

              value = part.defaultValue || '';
            } else {
              value = value + '';
            }
          }

          const minLen = part.maxLength ?
          Math.max(0, Math.min(part.length || 0, part.maxLength || 0)) :
          part.length || 0;
          //const maxLen = Math.max(part.length || 0, part.maxLength || 0);

          // Try to pad with zeroes where possible
          if (part.padding || part.padding === undefined) {
            const padding = typeof part.padding === 'number' ? part.padding || minLen : minLen;

            if (padding > 0 && value.length < padding) {
              for (let i = 0; i < value.length; i++) {
                if (/[0-9.]/.test(value[i])) {
                  value = value.substr(0, i) +
                  repeatChar$1('0', padding - value.length) +
                  value.substr(i);
                  break;
                }
              }

              if (value.length < padding) {
                value = repeatChar$1('0', padding - value.length) + value;
              }
            }
          }

          out += value === undefined ? '' : value;

        } else {// PartType.LABEL
          // Probably a raw text between labels
          out += part.text;
        }

      }

      return out;

    } else {
      if (!p.valueRegex) {
        p.valueRegex = new RegExp(this._valuePattern(), 'i');
      }

      const matches = newValue.match(p.valueRegex) || [];
      for (let i = 1, pi = 0; i < matches.length && pi < p.parsed.length; i++, pi++) {
        part = p.parsed[pi];
        value = matches[i] || '';

        if (part.type !== PartType.LABEL) {

          this._fieldValue(part.el, value);

        }

      }

      // Allow clearing the field
      if (!matches.length && (newValue === '' || newValue === null)) {
        for (pi = 0; pi < p.parsed.length; pi++) {
          part = p.parsed[pi];

          if (part.type !== PartType.LABEL) {
            this._fieldValue(part.el, '');
          }

        }
      }
    }

    return this;
  }

  /**
   *
   * @returns {function(string?):(string|MaskedInput|undefined)}
   */
  get val() {
    return this.value;
  }

  /**
   * Set input enabled/disabled mode
   * @param {boolean} [enabled=true]
   * @returns {MaskedInput} this
   */
  enable(enabled) {
    const p = this.p;

    enabled = !!enabled || enabled === undefined;

    p.enabled = enabled;

    this.$el.attr('disabled', enabled ? null : true);
    this.$el.find('input').prop('disabled', !enabled);

    return this;
  }

  /**
   * Set input enabled/disabled mode
   * @param {boolean} [disabled=true]
   * @returns {MaskedInput} this
   */
  disable(disabled) {
    disabled = !!disabled || disabled === undefined;
    return this.enable(!disabled);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Gets whether focus triggers auto selection or not
   * @returns {boolean} this
   */
  getAutoSelectOnFocus() {
    const o = this.o;
    return !!o.autoSelectOnFocus;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Sets whether focus triggers auto selection or not
   * @param {boolean} [value]
   * @returns {MaskedInput} this
   */
  setAutoSelectOnFocus(value) {
    const o = this.o;
    o.autoSelectOnFocus = !!value;
    return this;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @public
   * @returns {boolean} <code>true</code> if enabled
   */
  get isEnabled() {
    return this.p.enabled;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Set input enabled/disabled mode
   * @param {boolean} enabled
   */
  set isEnabled(enabled) {
    this.enable(enabled);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @public
   * @returns {boolean} <code>true</code> if disabled
   */
  get isDisabled() {
    return !this.p.enabled;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Set input enabled/disabled mode
   * @param {boolean} disabled
   */
  set isDisabled(disabled) {
    this.disable(disabled);
  }
}

const FORMAT_REGEX = new RegExp(
'(0+(?::[a-zA-Z0-9_]+)?)' + /* numeric value, fixed length, with possible :name_123 */
'|(#+(?::[a-zA-Z0-9_]+)?)' + /* numeric value, with possible :name_123 */
'|((?:@+|\\*)(?::[a-zA-Z0-9_]+)?)' + /* text value with maximum or variable length, with possible :name_123 */
'|("[^"]*"|\'[^\']*\')' /* possible quoted text */,
'g') // find all matches
;

/**
 * @public
 * @expose
 */
MaskedInput.PartType = PartType;

/**
 * Here we can add more pattern addons
 * @public
 * @expose
 */
MaskedInput.patternAddons = [];

/**
 * Default options for the control
 * @public
 * @expose
 * @type {MaskedInput.Options}
 */
MaskedInput.defaults = defaults;

/**
 * @name MaskedInput~Options
 * @property {MaskedInput~DateLocale} [dateLocale] - Date localization map
 */

/**
 * @typedef {Object} MaskedInput~DateLocale
 * @property {string[]} [MMM]
 * @property {string[]} [MMMM]
 * @property {string[]} [t]
 * @property {string[]} [tt]
 * @property {string[]} [T]
 * @property {string[]} [TT]
 */

const repeatChar = function (char, length) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += char;
  }
  return out;
};

const maxArrayStringLength = function (array) {
  let slen = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > slen) {
      slen = array[i].length;
    }
  }
  return slen;
};

//noinspection UnnecessaryLocalVariableJS
const EnglishDateLocale = /** @type {MaskedInput~DateLocale} */{
  MMM: [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'],

  MMMM: [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'],

  t: ['a', 'p'],
  tt: ['am', 'pm'],
  T: ['A', 'P'],
  TT: ['AM', 'PM'],
  aria: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
    hour: 'Hour',
    minutes: 'Minutes',
    seconds: 'Seconds',
    ampm: 'Am/Pm'
  }
};

MaskedInput.defaults.dateLocale = EnglishDateLocale;

const DATE_PATTERN_MAP = {
  // d - 1-31
  // dd - 01-31
  dd: {
    pattern: /\bdd?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'day',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('d', match.length);
    },
    numericMin: 0, // Allow typing in zeroes, like 06
    numericMax: 31,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    postProcess: function (value) {
      value = parseInt(value);
      if (value < 1 || value > 31) return undefined;
      return value + '';
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).day;
    }
  },
  MM: {
    // M - 1-12
    // MM - 01-12
    pattern: /\bMM?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'month',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('m', match.length);
    },
    numericMin: 0, // Allow typing in zeroes, like 06
    numericMax: 12,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    postProcess: function (value) {
      value = parseInt(value);
      if (value < 1 || value > 12) return undefined;
      return value + '';
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).month;
    }
  },
  MMM: {
    // MMM - Jan-Dec
    pattern: /\bMMM\b/,
    type: MaskedInput.PartType.TEXT,
    name: 'month',
    placeholder: function (match) {
      return repeatChar('m', match.length);
    },
    length: function (match) {
      return maxArrayStringLength(this.option('dateLocale')[match]);
    },
    options: function (match) {
      return this.option('dateLocale')[match];
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).month;
    }
  },
  MMMM: {
    // MMMM - January-December
    pattern: /\bMMMM\b/,
    type: MaskedInput.PartType.TEXT,
    name: 'month',
    placeholder: function (match) {
      return repeatChar('m', match.length);
    },
    length: function (match) {
      return maxArrayStringLength(this.option('dateLocale')[match]);
    },
    options: function (match) {
      return this.option('dateLocale')[match];
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).month;
    }
  },
  yyyy: {
    // yy - 85
    // yyyy - 1985
    pattern: /\byy(?:yy)?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'year',
    wholeNumber: true,
    placeholder: function (match) {
      return repeatChar('y', match.length);
    },
    maxLength: function (match) {
      return match.length;
    },
    postProcess: function (value, part) {

      if (part.maxLength === 4) {
        const baseYear = Math.floor(new Date().getFullYear() / 100) * 100;
        const nowYear = new Date().getFullYear();

        let year = parseInt(value, 10);

        if (year < 100) {
          year += baseYear;
          if (year - nowYear > 50) {
            year -= 100;
          } else if (nowYear - year > 50) {
            year += 100;
          }
        }

        return year + '';
      } else {

        return value;
      }
    },
    padding: function (match) {
      return match.length;
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).year;
    }
  },
  HH: {
    // H - 0-24
    // HH - 00-24
    pattern: /\bHH?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'hours',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('h', match.length);
    },
    numericMin: 0,
    numericMax: 23,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).hour;
    }
  },
  hh: {
    // h - 1-12
    // hh - 01-12
    pattern: /\bhh?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'hours_12',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('h', match.length);
    },
    numericMin: 1,
    numericMax: 12,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).hour;
    }
  },
  mm: {
    // m - 0-59
    // mm - 00-59
    pattern: /\bmm?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'minutes',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('m', match.length);
    },
    numericMin: 0,
    numericMax: 59,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).minutes;
    }
  },
  ss: {
    // s - 0-59
    // ss - 00-59
    pattern: /\bss?\b/,
    type: MaskedInput.PartType.NUMBER,
    name: 'seconds',
    maxLength: 2,
    placeholder: function (match) {
      return repeatChar('s', match.length);
    },
    numericMin: 0,
    numericMax: 59,
    wholeNumber: true,
    padding: function (match) {
      return match.length;
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).seconds;
    }
  },
  tt: {
    // t - a/p
    // tt - am/pm
    // T - A/P
    // TT - AM/PM
    pattern: /\btt?|TT?\b/,
    type: MaskedInput.PartType.TEXT,
    name: 'ampm',
    length: function (match) {
      return maxArrayStringLength(this.option('dateLocale')[match]);
    },
    options: function (match) {
      return this.option('dateLocale')[match];
    },
    defaultValue: function (match) {
      return this.option('dateLocale')[match][0];
    },
    ariaLabel: function (_match) {
      return (this.option('dateLocale').aria || {}).ampm;
    }
  }
};

MaskedInput.patternAddons.push(DATE_PATTERN_MAP);

module.exports = MaskedInput;
//# sourceMappingURL=jquery.maskedinput.date.js.map

//# sourceMappingURL=jquery.maskedinput.cjs.js.map