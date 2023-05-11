/*!
 * maskedinput.js 1.0.15
 * git://github.com/danielgindi/jquery.maskedinput.git
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MaskedInput = factory(global.jQuery));
})(this, (function ($$b) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$i =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$o = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$n = fails$o;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$n(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$m = fails$o;

	var functionBindNative = !fails$m(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$b = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$b.bind(call$b) : function () {
	  return call$b.apply(call$b, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$a = FunctionPrototype$2.call;
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$a, call$a);

	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$a.apply(fn, arguments);
	  };
	};

	var uncurryThis$o = functionUncurryThis;

	var toString$b = uncurryThis$o({}.toString);
	var stringSlice$5 = uncurryThis$o(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$5(toString$b(it), 8, -1);
	};

	var uncurryThis$n = functionUncurryThis;
	var fails$l = fails$o;
	var classof$7 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$n(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$l(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$4 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$3 = isNullOrUndefined$4;

	var $TypeError$a = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$6 = function (it) {
	  if (isNullOrUndefined$3(it)) throw $TypeError$a("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$5 = requireObjectCoercible$6;

	var toIndexedObject$5 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$5(it));
	};

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
	var isCallable$g = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$f = isCallable$g;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$a = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$f(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$f(it);
	};

	var global$h = global$i;
	var isCallable$e = isCallable$g;

	var aFunction = function (argument) {
	  return isCallable$e(argument) ? argument : undefined;
	};

	var getBuiltIn$6 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$h[namespace]) : global$h[namespace] && global$h[namespace][method];
	};

	var uncurryThis$m = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$m({}.isPrototypeOf);

	var getBuiltIn$5 = getBuiltIn$6;

	var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

	var global$g = global$i;
	var userAgent = engineUserAgent;

	var process = global$g.process;
	var Deno = global$g.Deno;
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

	var V8_VERSION$2 = engineV8Version;
	var fails$k = fails$o;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$k(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$4 = getBuiltIn$6;
	var isCallable$d = isCallable$g;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$4('Symbol');
	  return isCallable$d($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;

	var tryToString$2 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$c = isCallable$g;
	var tryToString$1 = tryToString$2;

	var $TypeError$9 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$2 = function (argument) {
	  if (isCallable$c(argument)) return argument;
	  throw $TypeError$9(tryToString$1(argument) + ' is not a function');
	};

	var aCallable$1 = aCallable$2;
	var isNullOrUndefined$2 = isNullOrUndefined$4;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$3 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$2(func) ? undefined : aCallable$1(func);
	};

	var call$9 = functionCall;
	var isCallable$b = isCallable$g;
	var isObject$9 = isObject$a;

	var $TypeError$8 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$9(fn, input))) return val;
	  if (isCallable$b(fn = input.valueOf) && !isObject$9(val = call$9(fn, input))) return val;
	  if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$9(fn, input))) return val;
	  throw $TypeError$8("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$f = global$i;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$5 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$5(global$f, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$f[key] = value;
	  } return value;
	};

	var global$e = global$i;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$e[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.26.1',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$4 = requireObjectCoercible$6;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$7 = function (argument) {
	  return $Object$1(requireObjectCoercible$4(argument));
	};

	var uncurryThis$l = functionUncurryThis;
	var toObject$6 = toObject$7;

	var hasOwnProperty$1 = uncurryThis$l({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1(toObject$6(it), key);
	};

	var uncurryThis$k = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$a = uncurryThis$k(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$a(++id + postfix, 36);
	};

	var global$d = global$i;
	var shared$3 = shared$4.exports;
	var hasOwn$8 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$3('wks');
	var Symbol$3 = global$d.Symbol;
	var symbolFor = Symbol$3 && Symbol$3['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$1;

	var wellKnownSymbol$d = function (name) {
	  if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL && hasOwn$8(Symbol$3, name)) {
	      WellKnownSymbolsStore[name] = Symbol$3[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var call$8 = functionCall;
	var isObject$8 = isObject$a;
	var isSymbol$1 = isSymbol$2;
	var getMethod$2 = getMethod$3;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$c = wellKnownSymbol$d;

	var $TypeError$7 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$c('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$8(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$8(exoticToPrim, input, pref);
	    if (!isObject$8(result) || isSymbol$1(result)) return result;
	    throw $TypeError$7("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$c = global$i;
	var isObject$7 = isObject$a;

	var document$1 = global$c.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$7(document$1) && isObject$7(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$c = descriptors;
	var fails$j = fails$o;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$c && !fails$j(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$b = descriptors;
	var call$7 = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$4 = toIndexedObject$5;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$7 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$4(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$7(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$a = descriptors;
	var fails$i = fails$o;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$a && fails$i(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$6 = isObject$a;

	var $String$2 = String;
	var $TypeError$6 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$a = function (argument) {
	  if (isObject$6(argument)) return argument;
	  throw $TypeError$6($String$2(argument) + ' is not an object');
	};

	var DESCRIPTORS$9 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$9 = anObject$a;
	var toPropertyKey$1 = toPropertyKey$3;

	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$5('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$8 = descriptors;
	var definePropertyModule$5 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$5 = DESCRIPTORS$8 ? function (object, key, value) {
	  return definePropertyModule$5.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$7 = descriptors;
	var hasOwn$6 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$7 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$7 || (DESCRIPTORS$7 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$j = functionUncurryThis;
	var isCallable$a = isCallable$g;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$j(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$a(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var global$b = global$i;
	var isCallable$9 = isCallable$g;

	var WeakMap$1 = global$b.WeakMap;

	var weakMapBasicDetection = isCallable$9(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$2 = shared$4.exports;
	var uid = uid$2;

	var keys$1 = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$a = global$i;
	var isObject$5 = isObject$a;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$5 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$a.TypeError;
	var WeakMap = global$a.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
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
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$5(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$4(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$5(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$5(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$h = fails$o;
	var isCallable$8 = isCallable$g;
	var hasOwn$4 = hasOwnProperty_1;
	var DESCRIPTORS$6 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState$1 = InternalStateModule.enforce;
	var getInternalState$1 = InternalStateModule.get;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;

	var CONFIGURABLE_LENGTH = DESCRIPTORS$6 && !fails$h(function () {
	  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$6) defineProperty$4(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, 'arity') && value.length !== options.arity) {
	    defineProperty$4(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$4(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$6) defineProperty$4(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$1(value);
	  if (!hasOwn$4(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$8(this) && getInternalState$1(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$7 = isCallable$g;
	var definePropertyModule$4 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltIn$3.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$5 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$7(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$4.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$5 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

	var max$3 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$3 = function (index, length) {
	  var integer = toIntegerOrInfinity$4(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$3 = function (argument) {
	  return argument > 0 ? min$2(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$2 = toLength$3;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$5 = function (obj) {
	  return toLength$2(obj.length);
	};

	var toIndexedObject$3 = toIndexedObject$5;
	var toAbsoluteIndex$2 = toAbsoluteIndex$3;
	var lengthOfArrayLike$4 = lengthOfArrayLike$5;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = lengthOfArrayLike$4(O);
	    var index = toAbsoluteIndex$2(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var uncurryThis$i = functionUncurryThis;
	var hasOwn$3 = hasOwnProperty_1;
	var toIndexedObject$2 = toIndexedObject$5;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$2 = uncurryThis$i([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$2(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$3 = getBuiltIn$6;
	var uncurryThis$h = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$8 = anObject$a;

	var concat$2 = uncurryThis$h([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$8(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$2 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$g = fails$o;
	var isCallable$6 = isCallable$g;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$6(detection) ? fails$g(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var global$9 = global$i;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
	var defineBuiltIn$4 = defineBuiltIn$5;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced$1 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$9;
	  } else if (STATIC) {
	    target = global$9[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$9[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$4(target, key, sourceProperty, options);
	  }
	};

	var wellKnownSymbol$b = wellKnownSymbol$d;

	var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$5 = isCallable$g;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$a = wellKnownSymbol$d;

	var TO_STRING_TAG = wellKnownSymbol$a('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) == 'Object' && isCallable$5(O.callee) ? 'Arguments' : result;
	};

	var classof$5 = classof$6;

	var $String$1 = String;

	var toString$9 = function (argument) {
	  if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	// a string of all valid unicode whitespaces
	var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$g = functionUncurryThis;
	var requireObjectCoercible$3 = requireObjectCoercible$6;
	var toString$8 = toString$9;
	var whitespaces$2 = whitespaces$3;

	var replace$3 = uncurryThis$g(''.replace);
	var whitespace = '[' + whitespaces$2 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString$8(requireObjectCoercible$3($this));
	    if (TYPE & 1) string = replace$3(string, ltrim, '');
	    if (TYPE & 2) string = replace$3(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var global$8 = global$i;
	var fails$f = fails$o;
	var uncurryThis$f = functionUncurryThis;
	var toString$7 = toString$9;
	var trim$1 = stringTrim.trim;
	var whitespaces$1 = whitespaces$3;

	var $parseInt$1 = global$8.parseInt;
	var Symbol$2 = global$8.Symbol;
	var ITERATOR$1 = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$3 = uncurryThis$f(hex.exec);
	var FORCED$3 = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$1 && !fails$f(function () { $parseInt$1(Object(ITERATOR$1)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$3 ? function parseInt(string, radix) {
	  var S = trim$1(toString$7(string));
	  return $parseInt$1(S, (radix >>> 0) || (exec$3(hex, S) ? 16 : 10));
	} : $parseInt$1;

	var $$a = _export;
	var $parseInt = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$$a({ global: true, forced: parseInt != $parseInt }, {
	  parseInt: $parseInt
	});

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return typeof key === "symbol" ? key : String(key);
	}

	var anObject$7 = anObject$a;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$7(this);
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

	var fails$e = fails$o;
	var global$7 = global$i;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$7.RegExp;

	var UNSUPPORTED_Y$2 = fails$e(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$1 = UNSUPPORTED_Y$2 || fails$e(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$e(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$1,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$2
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$5 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$6 = anObject$a;
	var toIndexedObject$1 = toIndexedObject$5;
	var objectKeys$1 = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$6(O);
	  var props = toIndexedObject$1(Properties);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$2 = getBuiltIn$6;

	var html$1 = getBuiltIn$2('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$5 = anObject$a;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$5(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$d = fails$o;
	var global$6 = global$i;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$6.RegExp;

	var regexpUnsupportedDotAll = fails$d(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$c = fails$o;
	var global$5 = global$i;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$5.RegExp;

	var regexpUnsupportedNcg = fails$c(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$6 = functionCall;
	var uncurryThis$e = functionUncurryThis;
	var toString$6 = toString$9;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create$1 = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$5 = uncurryThis$e(''.charAt);
	var indexOf = uncurryThis$e(''.indexOf);
	var replace$2 = uncurryThis$e(''.replace);
	var stringSlice$4 = uncurryThis$e(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$6(nativeExec, re1, 'a');
	  call$6(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString$6(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$6(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = call$6(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$2(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$4(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$6(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$4(match.input, charsAdded);
	        match[0] = stringSlice$4(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$6(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$1(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$9 = _export;
	var exec$2 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$9({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
	  exec: exec$2
	});

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var call$5 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$5.bind(apply$1) : function () {
	  return call$5.apply(apply$1, arguments);
	});

	var classofRaw = classofRaw$2;
	var uncurryThis$d = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis$d(fn);
	};

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$c = functionUncurryThisClause;
	var defineBuiltIn$3 = defineBuiltIn$5;
	var regexpExec$1 = regexpExec$2;
	var fails$b = fails$o;
	var wellKnownSymbol$9 = wellKnownSymbol$d;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;

	var SPECIES$4 = wellKnownSymbol$9('species');
	var RegExpPrototype$4 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$9(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$b(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$b(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$4] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$c(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$c(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$4.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$3(String.prototype, KEY, methods[0]);
	    defineBuiltIn$3(RegExpPrototype$4, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$2(RegExpPrototype$4[SYMBOL], 'sham', true);
	};

	var uncurryThis$b = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
	var toString$5 = toString$9;
	var requireObjectCoercible$2 = requireObjectCoercible$6;

	var charAt$4 = uncurryThis$b(''.charAt);
	var charCodeAt = uncurryThis$b(''.charCodeAt);
	var stringSlice$3 = uncurryThis$b(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$5(requireObjectCoercible$2($this));
	    var position = toIntegerOrInfinity$2(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$4(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$3(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt$3 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt$3(S, index).length : 1);
	};

	var uncurryThis$a = functionUncurryThis;
	var toObject$5 = toObject$7;

	var floor = Math.floor;
	var charAt$2 = uncurryThis$a(''.charAt);
	var replace$1 = uncurryThis$a(''.replace);
	var stringSlice$2 = uncurryThis$a(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$5(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$1(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$2(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$2(str, 0, position);
	      case "'": return stringSlice$2(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$2(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$2(ch, 1) : captures[f - 1] + charAt$2(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var call$4 = functionCall;
	var anObject$4 = anObject$a;
	var isCallable$4 = isCallable$g;
	var classof$4 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$4 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$4(exec)) {
	    var result = call$4(exec, R, S);
	    if (result !== null) anObject$4(result);
	    return result;
	  }
	  if (classof$4(R) === 'RegExp') return call$4(regexpExec, R, S);
	  throw $TypeError$4('RegExp#exec called on incompatible receiver');
	};

	var apply = functionApply;
	var call$3 = functionCall;
	var uncurryThis$9 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var fails$a = fails$o;
	var anObject$3 = anObject$a;
	var isCallable$3 = isCallable$g;
	var isNullOrUndefined$1 = isNullOrUndefined$4;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
	var toLength$1 = toLength$3;
	var toString$4 = toString$9;
	var requireObjectCoercible$1 = requireObjectCoercible$6;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var getMethod$1 = getMethod$3;
	var getSubstitution = getSubstitution$1;
	var regExpExec$1 = regexpExecAbstract;
	var wellKnownSymbol$8 = wellKnownSymbol$d;

	var REPLACE = wellKnownSymbol$8('replace');
	var max$2 = Math.max;
	var min$1 = Math.min;
	var concat$1 = uncurryThis$9([].concat);
	var push$1 = uncurryThis$9([].push);
	var stringIndexOf$1 = uncurryThis$9(''.indexOf);
	var stringSlice$1 = uncurryThis$9(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$a(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$1(this);
	      var replacer = isNullOrUndefined$1(searchValue) ? undefined : getMethod$1(searchValue, REPLACE);
	      return replacer
	        ? call$3(replacer, searchValue, O, replaceValue)
	        : call$3(nativeReplace, toString$4(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$3(this);
	      var S = toString$4(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$1(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$3(replaceValue);
	      if (!functionalReplace) replaceValue = toString$4(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$1(rx, S);
	        if (result === null) break;

	        push$1(results, result);
	        if (!global) break;

	        var matchStr = toString$4(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$4(result[0]);
	        var position = max$2(min$1(toIntegerOrInfinity$1(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
	          var replacement = toString$4(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$1(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice$1(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var classof$3 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$4 = Array.isArray || function isArray(argument) {
	  return classof$3(argument) == 'Array';
	};

	var uncurryThis$8 = functionUncurryThis;
	var fails$9 = fails$o;
	var isCallable$2 = isCallable$g;
	var classof$2 = classof$6;
	var getBuiltIn$1 = getBuiltIn$6;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$8(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$2(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$2(argument)) return false;
	  switch (classof$2(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$2 = !construct || fails$9(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$3 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var fails$8 = fails$o;
	var wellKnownSymbol$7 = wellKnownSymbol$d;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$3 = wellKnownSymbol$7('species');

	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$8(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$3] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var uncurryThis$7 = functionUncurryThis;

	var arraySlice = uncurryThis$7([].slice);

	var $$8 = _export;
	var isArray$3 = isArray$4;
	var isConstructor$1 = isConstructor$2;
	var isObject$4 = isObject$a;
	var toAbsoluteIndex$1 = toAbsoluteIndex$3;
	var lengthOfArrayLike$3 = lengthOfArrayLike$5;
	var toIndexedObject = toIndexedObject$5;
	var createProperty$2 = createProperty$3;
	var wellKnownSymbol$6 = wellKnownSymbol$d;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');

	var SPECIES$2 = wellKnownSymbol$6('species');
	var $Array$1 = Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike$3(O);
	    var k = toAbsoluteIndex$1(start, length);
	    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$3(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$3(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$4(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$1 || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$1 : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var global$4 = global$i;
	var fails$7 = fails$o;
	var uncurryThis$6 = functionUncurryThis;
	var toString$3 = toString$9;
	var trim = stringTrim.trim;
	var whitespaces = whitespaces$3;

	var charAt$1 = uncurryThis$6(''.charAt);
	var $parseFloat$1 = global$4.parseFloat;
	var Symbol$1 = global$4.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var FORCED$2 = 1 / $parseFloat$1(whitespaces + '-0') !== -Infinity
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails$7(function () { $parseFloat$1(Object(ITERATOR)); }));

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED$2 ? function parseFloat(string) {
	  var trimmedString = trim(toString$3(string));
	  var result = $parseFloat$1(trimmedString);
	  return result === 0 && charAt$1(trimmedString, 0) == '-' ? -0 : result;
	} : $parseFloat$1;

	var $$7 = _export;
	var $parseFloat = numberParseFloat;

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	$$7({ global: true, forced: parseFloat != $parseFloat }, {
	  parseFloat: $parseFloat
	});

	var uncurryThis$5 = functionUncurryThisClause;
	var aCallable = aCallable$2;
	var NATIVE_BIND = functionBindNative;

	var bind$1 = uncurryThis$5(uncurryThis$5.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var isArray$2 = isArray$4;
	var isConstructor = isConstructor$2;
	var isObject$3 = isObject$a;
	var wellKnownSymbol$5 = wellKnownSymbol$d;

	var SPECIES$1 = wellKnownSymbol$5('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$3(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind = functionBindContext;
	var uncurryThis$4 = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toObject$4 = toObject$7;
	var lengthOfArrayLike$2 = lengthOfArrayLike$5;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;

	var push = uncurryThis$4([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$4($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind(callbackfn, that);
	    var length = lengthOfArrayLike$2(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$2;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};

	var $$6 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$1 = classof$6;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$1(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$2 = defineBuiltIn$5;
	var toString$2 = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$2(Object.prototype, 'toString', toString$2, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var fails$6 = fails$o;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$6(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$3 = global$i;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(global$3[COLLECTION_NAME] && global$3[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$5 = _export;
	var uncurryThis$3 = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var nativeIndexOf = uncurryThis$3([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$5({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var DESCRIPTORS$4 = descriptors;
	var uncurryThis$2 = functionUncurryThis;
	var call$2 = functionCall;
	var fails$5 = fails$o;
	var objectKeys = objectKeys$2;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$3 = toObject$7;
	var IndexedObject = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$3 = Object.defineProperty;
	var concat = uncurryThis$2([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$5(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$4 && $assign({ b: 1 }, $assign(defineProperty$3({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$3(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$3(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$4 || call$2(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$4 = _export;
	var assign = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$4({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
	  assign: assign
	});

	var $$3 = _export;
	var toObject$2 = toObject$7;
	var nativeKeys = objectKeys$2;
	var fails$4 = fails$o;

	var FAILS_ON_PRIMITIVES = fails$4(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$2(it));
	  }
	});

	var isCallable$1 = isCallable$g;

	var $String = String;
	var $TypeError$3 = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$1(argument)) return argument;
	  throw $TypeError$3("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$1 = functionUncurryThis;
	var anObject$2 = anObject$a;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$1(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$2(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable = isCallable$g;
	var isObject$2 = isObject$a;
	var setPrototypeOf = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$2(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var isObject$1 = isObject$a;
	var classof = classofRaw$2;
	var wellKnownSymbol$4 = wellKnownSymbol$d;

	var MATCH$1 = wellKnownSymbol$4('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};

	var call$1 = functionCall;
	var hasOwn$1 = hasOwnProperty_1;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var regExpFlags$1 = regexpFlags$1;

	var RegExpPrototype$3 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$3) && !hasOwn$1(R, 'flags') && isPrototypeOf$1(RegExpPrototype$3, R)
	    ? call$1(regExpFlags$1, R) : flags;
	};

	var defineProperty$2 = objectDefineProperty.f;

	var proxyAccessor$1 = function (Target, Source, key) {
	  key in Target || defineProperty$2(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var getBuiltIn = getBuiltIn$6;
	var definePropertyModule = objectDefineProperty;
	var wellKnownSymbol$3 = wellKnownSymbol$d;
	var DESCRIPTORS$3 = descriptors;

	var SPECIES = wellKnownSymbol$3('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule.f;

	  if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var DESCRIPTORS$2 = descriptors;
	var global$2 = global$i;
	var uncurryThis = functionUncurryThis;
	var isForced = isForced_1;
	var inheritIfRequired = inheritIfRequired$1;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var isPrototypeOf = objectIsPrototypeOf;
	var isRegExp = isRegexp;
	var toString$1 = toString$9;
	var getRegExpFlags$1 = regexpGetFlags;
	var stickyHelpers = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$1;
	var defineBuiltIn$1 = defineBuiltIn$5;
	var fails$3 = fails$o;
	var hasOwn = hasOwnProperty_1;
	var enforceInternalState = internalState.enforce;
	var setSpecies = setSpecies$1;
	var wellKnownSymbol$2 = wellKnownSymbol$d;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH = wellKnownSymbol$2('match');
	var NativeRegExp = global$2.RegExp;
	var RegExpPrototype$2 = NativeRegExp.prototype;
	var SyntaxError = global$2.SyntaxError;
	var exec = uncurryThis(RegExpPrototype$2.exec);
	var charAt = uncurryThis(''.charAt);
	var replace = uncurryThis(''.replace);
	var stringIndexOf = uncurryThis(''.indexOf);
	var stringSlice = uncurryThis(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$2 &&
	  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$3(function () {
	    re2[MATCH] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = {};
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr = chr + charAt(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec(IS_NCG, stringSlice(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf(RegExpPrototype$2, this);
	    var patternIsRegExp = isRegExp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$2, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags$1(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$1(pattern);
	    flags = flags === undefined ? '' : toString$1(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$2, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
	  }

	  RegExpPrototype$2.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$2;
	  defineBuiltIn$1(global$2, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var defineBuiltIn = defineBuiltIn$5;
	var anObject$1 = anObject$a;
	var $toString = toString$9;
	var fails$2 = fails$o;
	var getRegExpFlags = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING];

	var NOT_GENERIC = fails$2(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject$1(this);
	    var pattern = $toString(R.source);
	    var flags = $toString(getRegExpFlags(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var makeBuiltIn = makeBuiltIn$3.exports;
	var defineProperty$1 = objectDefineProperty;

	var defineBuiltInAccessor$1 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty$1.f(target, name, descriptor);
	};

	var global$1 = global$i;
	var DESCRIPTORS$1 = descriptors;
	var defineBuiltInAccessor = defineBuiltInAccessor$1;
	var regExpFlags = regexpFlags$1;
	var fails$1 = fails$o;

	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
	var RegExp$1 = global$1.RegExp;
	var RegExpPrototype = RegExp$1.prototype;

	var FORCED$1 = DESCRIPTORS$1 && fails$1(function () {
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
	if (FORCED$1) defineBuiltInAccessor(RegExpPrototype, 'flags', {
	  configurable: true,
	  get: regExpFlags
	});

	var DESCRIPTORS = descriptors;
	var isArray$1 = isArray$4;

	var $TypeError$2 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw $TypeError$2('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$1 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$2 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$1('Maximum allowed index exceeded');
	  return it;
	};

	var tryToString = tryToString$2;

	var $TypeError = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var $$2 = _export;
	var toObject$1 = toObject$7;
	var toAbsoluteIndex = toAbsoluteIndex$3;
	var toIntegerOrInfinity = toIntegerOrInfinity$5;
	var lengthOfArrayLike$1 = lengthOfArrayLike$5;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;
	var createProperty$1 = createProperty$3;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('splice');

	var max = Math.max;
	var min = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$2({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$1(this);
	    var len = lengthOfArrayLike$1(O);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate$1(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$1(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	var $$1 = _export;
	var fails = fails$o;
	var isArray = isArray$4;
	var isObject = isObject$a;
	var toObject = toObject$7;
	var lengthOfArrayLike = lengthOfArrayLike$5;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
	var createProperty = createProperty$3;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$1 = wellKnownSymbol$d;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$1({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var call = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$a;
	var isNullOrUndefined = isNullOrUndefined$4;
	var toLength = toLength$3;
	var toString = toString$9;
	var requireObjectCoercible = requireObjectCoercible$6;
	var getMethod = getMethod$3;
	var advanceStringIndex = advanceStringIndex$2;
	var regExpExec = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
	      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject(this);
	      var S = toString(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec(rx, S)) !== null) {
	        var matchStr = toString(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var wellKnownSymbol = wellKnownSymbol$d;
	var create = objectCreate;
	var defineProperty = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  defineProperty(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $ = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * @typedef {string} MaskedInput~PartType
	 * @name MaskedInput~PartType
	 * @enum {string}
	 */
	var PartType = {
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
	var defaults = /** @type {MaskedInput.Options} */{
	  patterns: {},
	  autoSelectOnFocus: false,
	  className: 'masked-input'
	};

	var execRegexWithLeftovers = function execRegexWithLeftovers(regex, input, onMatch, onLeftover) {

	  var match,lastIndex = 0;
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
	var getSelectionRange = function getSelectionRange(el) {
	  var begin,end,direction = 'none';

	  if (el.setSelectionRange) {

	    begin = el.selectionStart;
	    end = el.selectionEnd;
	    direction = el.selectionDirection;

	  } else if (document.selection && document.selection.createRange) {

	    var range = document.selection.createRange();
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
	var setSelectionRange = function setSelectionRange(el, begin, end, direction) {

	  if (_typeof(arguments[1]) === 'object' && 'begin' in arguments[1]) {
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
	      var range = el.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', end);
	      range.moveStart('character', begin);
	      range.select();
	    }
	  }

	};

	var repeatChar$1 = function repeatChar(char, length) {
	  var out = '';
	  for (var i = 0; i < length; i++) {
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
	var findMatchInArray = function findMatchInArray(options, term, closestChoice, returnFullMatch, caseSensitive) {

	  var i, option, optionLower;
	  var termLower = caseSensitive ? term : term.toLowerCase();

	  if (closestChoice) {
	    // Search for a partial option or partial content match, return the longest match found, or `false`

	    var maxMatchLength = 0;
	    var maxMatchOption;
	    var maxMatchFullOption;

	    for (i = 0; i < options.length; i++) {
	      option = options[i];
	      optionLower = caseSensitive ? option : option.toLowerCase();

	      for (var clen = Math.min(option.length, 1); clen <= term.length; clen++) {
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
	var escapeRegExp = function escapeRegExp(str) {
	  return str.replace(/[-[\]/{}()*+?.\\$|]/g, '\\$&');
	};
	/**
	 * Search for closest element to a specified point
	 * @param {HTMLElement[]} elements
	 * @param {{left: number, top: number }} offset
	 * @returns {HTMLElement|null}
	 */
	var closestToOffset = function closestToOffset(elements, offset) {
	  var x = offset.left,
	    y = offset.top;
	  var bestMatch = null,
	    minDistance = null;

	  for (var i = 0; i < elements.length; i++) {
	    var el = elements[i],$el = $$b(el);
	    var elOffset = $el.offset();

	    elOffset.right = elOffset.left + $el.outerWidth();
	    elOffset.bottom = elOffset.top + $el.outerHeight();

	    if (
	    x >= elOffset.left && x <= elOffset.right &&
	    y >= elOffset.top && y <= elOffset.bottom)
	    {
	      return el;
	    }

	    var offsets = [
	    [elOffset.left, elOffset.top],
	    [elOffset.right, elOffset.top],
	    [elOffset.left, elOffset.bottom],
	    [elOffset.right, elOffset.bottom]];


	    for (var o = 0; o < 4; o++) {
	      var _offset = offsets[o];
	      var dx = _offset[0] - x;
	      var dy = _offset[1] - y;
	      var distance = Math.sqrt(dx * dx + dy * dy);

	      if (minDistance == null || distance < minDistance) {
	        minDistance = distance;
	        bestMatch = el;
	      }
	    }
	  }

	  return bestMatch;
	};

	var callFunctor = function callFunctor(functor, bind, _arg1) {
	  return typeof functor === 'function' ?
	  functor.apply(bind, Array.prototype.slice.call(arguments, 2)) :
	  functor;
	};

	var inputBackbufferCssProps = [
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


	var hasComputedStyle = document.defaultView && document.defaultView.getComputedStyle;

	/**
	 * Gets the precise content width for an element, with fractions
	 * @param {Element} el
	 * @returns {number}
	 */
	var getPreciseContentWidth = function getPreciseContentWidth(el) {

	  var style = hasComputedStyle ? document.defaultView.getComputedStyle(el) : el.currentStyle;
	  var width = parseFloat(style['width']) || 0;

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

	var FOCUSABLES = [
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


	var FOCUSABLE_SELECTOR = FOCUSABLES.join(',');
	var TABBABLE_SELECTOR = FOCUSABLES.map(function (x) {return x + ':not([tabindex=-1])';}).join(',');

	var KEY_ENTER = 13;
	var KEY_ARROW_UP = 38;
	var KEY_ARROW_DOWN = 40;
	var KEY_ARROW_LEFT = 37;
	var KEY_ARROW_RIGHT = 39;

	/** @class MaskedInput */var MaskedInput = /*#__PURE__*/function () {
	  /**
	   * @param {MaskedInput.Options?} options
	   * @returns {MaskedInput}
	   */
	  function MaskedInput(options) {var _this = this;_classCallCheck(this, MaskedInput);
	    /** @private */
	    var o = this.o = $$b.extend({}, MaskedInput.defaults, options);

	    var patterns = {};
	    MaskedInput.patternAddons.forEach(function (addon) {
	      patterns = $$b.extend(patterns, addon);
	    });
	    patterns = $$b.extend(patterns, o.patterns);
	    o.patterns = patterns;

	    /** This is for encapsulating private data */
	    var p = this.p = {};

	    p.enabled = true;
	    p.inputs = [];
	    p.inputsByKey = Object.create(null);

	    /**
	     * @public
	     * @type Element
	     * */
	    var el = this.el = o.root instanceof $$b ? o.root[0] : o.root;

	    /** @type JQuery */
	    var $el;

	    if (!el) {
	      $el = $$b('<div>');
	      el = this.el = /**@type Element*/$el[0];
	      p.ownsEl = true;
	    } else {
	      $el = $$b(el);
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
	    p.$inputBackBuffer = $$b('<span aria-hidden="true" style="position:absolute;z-index:-1;left:0;top:-9999px;white-space:pre;"/>');

	    // Hook up click event
	    $el.on('click', function (event) {
	      if (event.target !== event.currentTarget &&
	      $$b(event.target).is(FOCUSABLE_SELECTOR)) return;

	      var offset = $$b(event.currentTarget).offset();
	      offset.left += event.offsetX;
	      offset.top += event.offsetY;

	      var el = closestToOffset($el.children(FOCUSABLE_SELECTOR), offset);

	      if (el) {
	        el.focus();
	      }
	    });

	    this.render();

	    setTimeout(function () {
	      if (_this.el && _this.el.parentNode) {
	        _this.resize();
	      }
	    }, 0);

	    return this;
	  }

	  // noinspection JSUnusedGlobalSymbols
	  _createClass(MaskedInput, [{ key: "destroy", value: function destroy() {
	      var p = this.p;
	      var o = this.o;

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
	     */ }, { key: "_parseFormat", value:
	    function _parseFormat(format) {
	      var o = this.o;

	      var parsedFormat = [];

	      // Loop through basic format matches

	      execRegexWithLeftovers(FORMAT_REGEX, format, function onMatch(match) {

	        var numericMatch = match[1] || match[2];
	        var textMatch = match[3];
	        var quotedMatch = match[4];

	        var i, part;

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
	          var labelText = quotedMatch.substr(1, quotedMatch.length - 2);
	          part = {
	            type: PartType.LABEL,
	            text: labelText,
	            length: labelText.length
	          };
	          parsedFormat.push(part);
	        }

	        if (part && o.defaultPartOptions && hasOwnProperty.call(o.defaultPartOptions, part.name)) {
	          var _defaults = o.defaultPartOptions[part.name];
	          Object.assign(part, _defaults);
	        }

	      }.bind(this), function onLeftover(leftover) {var _this2 = this;

	        var leftoverParts = [];

	        var part = {
	          type: PartType.LABEL,
	          text: leftover,
	          length: leftover.length
	        };
	        leftoverParts.push(part);

	        Object.keys(o.patterns).forEach(function (key) {
	          var patterns = o.patterns[key];

	          var regex = new RegExp(
	          patterns.pattern instanceof RegExp ?
	          patterns.pattern.source :
	          patterns.pattern,
	          patterns.pattern instanceof RegExp ?
	          patterns.pattern.flags + (patterns.pattern.flags.indexOf('g') > -1 ? '' : 'g') :
	          'g');var _loop = function _loop(_fpos) {



	            var fpart = leftoverParts[_fpos];
	            if (fpart.type !== PartType.LABEL) {fpos = _fpos;return "continue";}

	            var newParts = [];

	            execRegexWithLeftovers(regex, fpart.text, function onMatch(match) {

	              var validator;
	              if (patterns.validator instanceof RegExp || typeof patterns.validator === 'function') {
	                validator = patterns.validator;
	              } else if (typeof patterns.validator === 'string') {
	                try {
	                  validator = new RegExp(patterns.validator);
	                } catch (ignored) {/* nothing to do */}
	              }

	              // Translate the part
	              var part = {
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

	            }.bind(_this2), function onLeftover(leftover) {
	              var part = {
	                type: PartType.LABEL,
	                text: leftover,
	                length: leftover.length
	              };
	              //noinspection JSReferencingMutableVariableFromClosure
	              newParts.push(part);
	            }.bind(_this2));

	            // Replace old label with new parts
	            Array.prototype.splice.apply(leftoverParts, [_fpos, 1].concat(newParts));

	            // Move leftoverParts position as necessary
	            _fpos += newParts.length - 1;fpos = _fpos;};for (var fpos = 0; fpos < leftoverParts.length; fpos++) {var _ret = _loop(fpos);if (_ret === "continue") continue;
	          }

	        });

	        parsedFormat = parsedFormat.concat(leftoverParts);
	      }.bind(this));

	      return parsedFormat;
	    } }, { key: "render", value:

	    function render() {var _this3 = this;
	      var p = this.p;

	      this.$el.empty();

	      var inputs = [];
	      var inputsByKey = Object.create(null);

	      p.parsed.forEach(function (part) {
	        if (part.type === PartType.LABEL) {
	          var $el = _this3._renderText(part).appendTo(_this3.$el);
	          part.$el = $el;
	          part.el = $el[0];
	          return;
	        }

	        var $input = _this3._renderInput(part).appendTo(_this3.$el);

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
	     */ }, { key: "_renderInput", value:
	    function _renderInput(part, input) {var _this4 = this;
	      var p = this.p,o = this.o;

	      var isNewInput = !input;

	      var $input;

	      if (isNewInput) {
	        $input = $$b('<input>').data('part', part).prop('disabled', !p.enabled);
	        input = $input[0];
	        input.addEventListener('focus', function () {
	          if (o.autoSelectOnFocus)
	          input.select();
	        });
	      } else {
	        $input = $$b(input);
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
	        var placeholder = typeof part.placeholder === 'string' ?
	        part.placeholder :
	        part.placeholder === undefined || part.placeholder ? repeatChar$1('_', part.length || part.maxLength) : '';
	        input.placeholder = placeholder;
	      }

	      if (isNewInput) {
	        $input.
	        on('input.maskedinput', function (event) {
	          _this4._handleInput(event, input, part);
	          _this4._syncInputSizeForPart(part);
	        }).
	        on('keydown.maskedinput', function (event) {
	          _this4._handleKeydown(event, input, part);
	        }).
	        on('keypress.maskedinput', function (event) {
	          _this4._handleKeypress(event, input, part);
	        });
	      }

	      return $input;
	    }

	    /**
	     *
	     * @private
	     * @param {MaskedInput~Part} part
	     * @returns {jQuery}
	     */ }, { key: "_renderText", value:
	    function _renderText(part) {
	      return $$b('<span style="white-space: pre">').text(part.text);
	    }

	    /**
	     *
	     * @private
	     * @param {jQuery|Element|string} input
	     * @param {boolean=true} alwaysConsiderPlaceholder
	     * @param {string=A} fallbackText
	     * @returns {MaskedInput}
	     */ }, { key: "_syncInputSize", value:
	    function _syncInputSize(input, alwaysConsiderPlaceholder, fallbackText) {
	      var p = this.p;

	      if (alwaysConsiderPlaceholder === undefined) {
	        alwaysConsiderPlaceholder = true;
	      }

	      if (fallbackText === undefined) {
	        fallbackText = 'A';
	      }

	      var $input = $$b(input),$backBuffer = p.$inputBackBuffer;

	      /** @type {HTMLInputElement} */
	      var inputEl = $input[0];

	      fallbackText = fallbackText == null ? '' : fallbackText + '';
	      var value = inputEl.value || inputEl.placeholder || fallbackText;

	      // Introduce backbuffer to DOM
	      $backBuffer.
	      css($input.css(inputBackbufferCssProps)).
	      text(value).
	      appendTo(this.$el);

	      // Measure these
	      var backBufferWidth = getPreciseContentWidth($backBuffer[0]) + 1 /* caret width */;
	      var currentWidth = getPreciseContentWidth(inputEl);

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
	     */ }, { key: "_syncInputSizeForPart", value:
	    function _syncInputSizeForPart(part) {
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
	     */ }, { key: "_handleInput", value:
	    function _handleInput(event, input, part) {
	      var content = input.value;
	      var validatedContent;

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
	        $$b(input).nextAll(TABBABLE_SELECTOR).first().focus();
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
	     */ }, { key: "_handleKeydown", value:
	    function _handleKeydown(event, input, part) {
	      if (input.readOnly) return this;

	      var keycode = event.which;
	      var triggerChange = false;

	      var contentBefore = input.value;
	      var validatedContent;

	      // Handle UP/DOWN arrows for next/previous value

	      if (keycode === KEY_ARROW_UP || keycode === KEY_ARROW_DOWN) {

	        var nextValue,tryToUpdate = false;

	        var minLen = part.maxLength ?
	        Math.max(1, Math.min(part.length || 0, part.maxLength || 1)) :
	        part.length || 1;
	        var maxLen = Math.max(part.length || 0, part.maxLength || 0);

	        if (part.type === PartType.TEXT && part.options) {

	          var fullMatch = findMatchInArray(part.options, contentBefore, true, true, false);
	          var index = part.options.indexOf(fullMatch);

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
	        var isRtl = $$b(input).css('direction') === 'rtl';

	        if (!isRtl && keycode === KEY_ARROW_LEFT || isRtl && keycode === KEY_ARROW_RIGHT) {
	          if (getSelectionRange(input).begin === 0) {
	            $$b(input).prevAll(TABBABLE_SELECTOR).first().focus();
	          }
	        } else {
	          if (getSelectionRange(input).begin === input.value.length) {
	            $$b(input).nextAll(TABBABLE_SELECTOR).first().focus();
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
	     */ }, { key: "_handleKeypress", value:
	    function _handleKeypress(event, input, part) {
	      if (input.readOnly) return this;

	      var keycode = event.which;
	      var pos = getSelectionRange(input);

	      if (event.ctrlKey || event.altKey || event.metaKey ||
	      !keycode ||
	      keycode < 32 || keycode === KEY_ENTER) return this; // Not a character, perform default

	      event.preventDefault();

	      var triggerChange = false;
	      var moveToNextField = false;

	      var pressedChar = event.key || String.fromCharCode(keycode);

	      var contentBefore = input.value;
	      var contentAfter = contentBefore.substr(0, pos.begin) +
	      pressedChar +
	      contentBefore.substr(pos.end);

	      var validatedContent = this._validateContent(contentAfter, part);
	      if (validatedContent === false) return this; // Not validated, ignore keypress

	      if (typeof validatedContent === 'string') {
	        contentAfter = validatedContent;
	      }

	      if (contentAfter !== contentBefore || contentAfter.substr(pos.begin, 1) === pressedChar) {

	        var newPos = {};

	        // Set caret at new position

	        if (pos.end - pos.begin > 0 && pos.direction === 'backward') {
	          newPos.begin = newPos.end = pos.begin;
	        } else {
	          newPos.begin = newPos.end = pos.begin + 1;
	        }

	        // Show rest of only choice found
	        if (part.type === PartType.TEXT && part.options) {

	          var fullMatch = findMatchInArray(part.options, contentAfter, false, true, false);
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
	        $$b(input).nextAll(TABBABLE_SELECTOR).first().focus();
	      }

	      return this;
	    }

	    /**
	     * Determines if we need to skip to next field after input change
	     * @private
	     * @param {{begin: number, end: number}} newPos
	     * @param {string} newContent
	     * @param {MaskedInput~Part} part
	     */ }, { key: "_shouldMoveToNextFieldAfterInput", value:
	    function _shouldMoveToNextFieldAfterInput(newPos, newContent, part) {
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
	     */ }, { key: "_validateContent", value:
	    function _validateContent(content, part) {

	      // Priority given to validator
	      if (part.validator) {
	        if (part.validator instanceof RegExp) {
	          return part.validator.test(content);
	        }

	        var ret = part.validator.call(this, content, part);
	        if (ret == null) {
	          ret = false;
	        }
	        return ret;
	      }

	      var maxLen = Math.max(part.length || 0, part.maxLength || 0);

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
	          var parsedValue = parseFloat(content);
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
	          var match = findMatchInArray(part.options, content, true, false, false);
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
	     */ }, { key: "resize", value:
	    function resize() {var _this5 = this;
	      var p = this.p;

	      (p.parsed || []).forEach(function (part) {return _this5._syncInputSizeForPart(part);});

	      return this;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Retrieve a field element by index or label
	     * @public
	     * @param {number|string} index
	     * @returns {HTMLInputElement}
	     */ }, { key: "field", value:
	    function field(index) {
	      var p = this.p;

	      var input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];

	      if (!input) return undefined;

	      return $$b.isArray(input) ? input.slice(0) : input;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Retrieve field count
	     * @public
	     * @returns {number}
	     */ }, { key: "fieldCount", get:
	    function get() {
	      var p = this.p;
	      return p.inputs.length;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Retrieve field count
	     * @public
	     * @returns {string[]}
	     */ }, { key: "fieldKeys", get:
	    function get() {
	      var p = this.p;
	      return Object.keys(p.inputsByKey);
	    }

	    /**
	     * Creates a pattern for parsing an incoming value
	     * @private
	     * @returns {string}
	     */ }, { key: "_valuePattern", value:
	    function _valuePattern() {
	      var p = this.p;

	      var pattern = '';

	      p.parsed.forEach(function (part) {
	        var group = '';

	        var minLen = part.maxLength ?
	        Math.max(1, Math.min(part.length || 0, part.maxLength || 1)) :
	        part.length || 1;
	        var maxLen = Math.max(part.length || 0, part.maxLength || 0);

	        if (part.type === PartType.TEXT) {
	          if (part.options) {
	            for (var i = 0; i < part.options.length; i++) {
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
	     */ }, { key: "_fieldValue", value:
	    function _fieldValue(input, newValue) {
	      var $input = $$b(input);
	      if (!$input.length) return undefined;
	      input = $input[0];

	      var part = /**MaskedInput~Part=*/$input.data('part');
	      var validatedValue;

	      if (newValue === undefined) {
	        var value = input.value;

	        // Predefined choices?
	        if (part.type === PartType.TEXT && part.options) {
	          return findMatchInArray(part.options, value, true, true, false);
	        }

	        // Enforce length
	        var maxLen = Math.max(part.length || 0, part.maxLength || 0);
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
	     */ }, { key: "fieldValue", value:
	    function fieldValue(index, newValue) {
	      var p = this.p;

	      var input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];

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
	     */ }, { key: "option", value:
	    function option(name, newValue) {
	      var o = this.o;

	      if (arguments.length === 2) {
	        if (name === 'patterns') {
	          o[name] = {};

	          MaskedInput.patternAddons.forEach(function (addon) {
	            o[name] = $$b.extend(o[name], addon);
	          });

	          o[name] = $$b.extend(o[name], newValue);
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
	     */ }, { key: "_fieldOption", value:
	    function _fieldOption(part, name, value) {var _this6 = this;
	      var p = this.p;

	      if (!part) {
	        return arguments.length === 3 ? this : undefined;
	      }

	      if (arguments.length === 3 || _typeof(name) === 'object') {

	        if (_typeof(name) === 'object') {
	          // Set the options object for part
	          Object.keys( /**@type {Object<string, *>}*/name).forEach(function (key) {
	            _this6._fieldOption(part, key, name[key]);
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
	          var options = {};

	          /**@type string[]*/name.forEach(function (key) {
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
	     */ }, { key: "fieldOption", value:
	    function fieldOption(index, name, value) {
	      var that = this,
	        p = this.p;

	      var input = typeof index === 'number' ? p.inputs[index] : p.inputsByKey[index];
	      if (!input) return this;

	      if (input.length > 1) {
	        if (arguments.length === 3 || _typeof(name) === 'object') {

	          // Set the option/options for all inputs
	          input.forEach(function (el) {
	            that._fieldOption($$b(el).data('part'), name, value);
	          });

	          delete p.valueRegex;

	          return this;
	        } else {

	          // Return array of option/options for all inputs
	          return input.map(function (el) {return that._fieldOption($$b(el).data('part'), name);});
	        }
	      } else {
	        if (arguments.length === 3) {

	          // Set the option/options for input
	          this._fieldOption($$b(input).data('part'), name, value);

	          delete p.valueRegex;

	          return this;
	        } else {

	          // Return value/values
	          return this._fieldOption($$b(input).data('part'), name);
	        }
	      }
	    }

	    /**
	     * Get or set the full value
	     * @public
	     * @param {string?} newValue
	     * @returns {string|undefined|MaskedInput}
	     */ }, { key: "value", value:
	    function value(newValue) {
	      var p = this.p;

	      var pi, part, value;

	      if (newValue === undefined) {

	        var out = '';

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

	            var minLen = part.maxLength ?
	            Math.max(0, Math.min(part.length || 0, part.maxLength || 0)) :
	            part.length || 0;
	            //const maxLen = Math.max(part.length || 0, part.maxLength || 0);

	            // Try to pad with zeroes where possible
	            if (part.padding || part.padding === undefined) {
	              var padding = typeof part.padding === 'number' ? part.padding || minLen : minLen;

	              if (padding > 0 && value.length < padding) {
	                for (var i = 0; i < value.length; i++) {
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

	        var matches = newValue.match(p.valueRegex) || [];
	        for (var _i = 1, _pi = 0; _i < matches.length && _pi < p.parsed.length; _i++, _pi++) {
	          part = p.parsed[_pi];
	          value = matches[_i] || '';

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
	     */ }, { key: "val", get:
	    function get() {
	      return this.value;
	    }

	    /**
	     * Set input enabled/disabled mode
	     * @param {boolean} [enabled=true]
	     * @returns {MaskedInput} this
	     */ }, { key: "enable", value:
	    function enable(enabled) {
	      var p = this.p;

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
	     */ }, { key: "disable", value:
	    function disable(disabled) {
	      disabled = !!disabled || disabled === undefined;
	      return this.enable(!disabled);
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Gets whether focus triggers auto selection or not
	     * @returns {boolean} this
	     */ }, { key: "getAutoSelectOnFocus", value:
	    function getAutoSelectOnFocus() {
	      var o = this.o;
	      return !!o.autoSelectOnFocus;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Sets whether focus triggers auto selection or not
	     * @param {boolean} [value]
	     * @returns {MaskedInput} this
	     */ }, { key: "setAutoSelectOnFocus", value:
	    function setAutoSelectOnFocus(value) {
	      var o = this.o;
	      o.autoSelectOnFocus = !!value;
	      return this;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * @public
	     * @returns {boolean} <code>true</code> if enabled
	     */ }, { key: "isEnabled", get:
	    function get() {
	      return this.p.enabled;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Set input enabled/disabled mode
	     * @param {boolean} enabled
	     */, set:
	    function set(enabled) {
	      this.enable(enabled);
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * @public
	     * @returns {boolean} <code>true</code> if disabled
	     */ }, { key: "isDisabled", get:
	    function get() {
	      return !this.p.enabled;
	    }

	    // noinspection JSUnusedGlobalSymbols
	    /**
	     * Set input enabled/disabled mode
	     * @param {boolean} disabled
	     */, set:
	    function set(disabled) {
	      this.disable(disabled);
	    } }]);return MaskedInput;}();


	var FORMAT_REGEX = new RegExp(
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

	var repeatChar = function repeatChar(char, length) {
	  var out = '';
	  for (var i = 0; i < length; i++) {
	    out += char;
	  }
	  return out;
	};

	var maxArrayStringLength = function maxArrayStringLength(array) {
	  var slen = 0;
	  for (var i = 0; i < array.length; i++) {
	    if (array[i].length > slen) {
	      slen = array[i].length;
	    }
	  }
	  return slen;
	};

	//noinspection UnnecessaryLocalVariableJS
	var EnglishDateLocale = /** @type {MaskedInput~DateLocale} */{
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

	var DATE_PATTERN_MAP = {
	  // d - 1-31
	  // dd - 01-31
	  dd: {
	    pattern: /\bdd?\b/,
	    type: MaskedInput.PartType.NUMBER,
	    name: 'day',
	    maxLength: 2,
	    placeholder: function placeholder(match) {
	      return repeatChar('d', match.length);
	    },
	    numericMin: 0, // Allow typing in zeroes, like 06
	    numericMax: 31,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    postProcess: function postProcess(value) {
	      value = parseInt(value);
	      if (value < 1 || value > 31) return undefined;
	      return value + '';
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('m', match.length);
	    },
	    numericMin: 0, // Allow typing in zeroes, like 06
	    numericMax: 12,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    postProcess: function postProcess(value) {
	      value = parseInt(value);
	      if (value < 1 || value > 12) return undefined;
	      return value + '';
	    },
	    ariaLabel: function ariaLabel(_match) {
	      return (this.option('dateLocale').aria || {}).month;
	    }
	  },
	  MMM: {
	    // MMM - Jan-Dec
	    pattern: /\bMMM\b/,
	    type: MaskedInput.PartType.TEXT,
	    name: 'month',
	    placeholder: function placeholder(match) {
	      return repeatChar('m', match.length);
	    },
	    length: function length(match) {
	      return maxArrayStringLength(this.option('dateLocale')[match]);
	    },
	    options: function options(match) {
	      return this.option('dateLocale')[match];
	    },
	    ariaLabel: function ariaLabel(_match) {
	      return (this.option('dateLocale').aria || {}).month;
	    }
	  },
	  MMMM: {
	    // MMMM - January-December
	    pattern: /\bMMMM\b/,
	    type: MaskedInput.PartType.TEXT,
	    name: 'month',
	    placeholder: function placeholder(match) {
	      return repeatChar('m', match.length);
	    },
	    length: function length(match) {
	      return maxArrayStringLength(this.option('dateLocale')[match]);
	    },
	    options: function options(match) {
	      return this.option('dateLocale')[match];
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('y', match.length);
	    },
	    maxLength: function maxLength(match) {
	      return match.length;
	    },
	    postProcess: function postProcess(value, part) {

	      if (part.maxLength === 4) {
	        var baseYear = Math.floor(new Date().getFullYear() / 100) * 100;
	        var nowYear = new Date().getFullYear();

	        var year = parseInt(value, 10);

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
	    padding: function padding(match) {
	      return match.length;
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('h', match.length);
	    },
	    numericMin: 0,
	    numericMax: 23,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('h', match.length);
	    },
	    numericMin: 1,
	    numericMax: 12,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('m', match.length);
	    },
	    numericMin: 0,
	    numericMax: 59,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    placeholder: function placeholder(match) {
	      return repeatChar('s', match.length);
	    },
	    numericMin: 0,
	    numericMax: 59,
	    wholeNumber: true,
	    padding: function padding(match) {
	      return match.length;
	    },
	    ariaLabel: function ariaLabel(_match) {
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
	    length: function length(match) {
	      return maxArrayStringLength(this.option('dateLocale')[match]);
	    },
	    options: function options(match) {
	      return this.option('dateLocale')[match];
	    },
	    defaultValue: function defaultValue(match) {
	      return this.option('dateLocale')[match][0];
	    },
	    ariaLabel: function ariaLabel(_match) {
	      return (this.option('dateLocale').aria || {}).ampm;
	    }
	  }
	};

	MaskedInput.patternAddons.push(DATE_PATTERN_MAP);

	return MaskedInput;

}));
//# sourceMappingURL=jquery.maskedinput.date.js.map

//# sourceMappingURL=jquery.maskedinput.umd.js.map