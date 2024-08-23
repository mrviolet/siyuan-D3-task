"use strict";
const siyuan = require("siyuan");
/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = !!(process.env.NODE_ENV !== "production") ? Object.freeze({}) : {};
const EMPTY_ARR = !!(process.env.NODE_ENV !== "production") ? Object.freeze([]) : [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
/**
* @vue/reactivity v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      this.onStop && this.onStop();
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      if (!!(process.env.NODE_ENV !== "production")) {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "iterate" : "");
const MAP_KEY_ITERATE_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "Map key iterate" : "");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      !!(process.env.NODE_ENV !== "production") ? {
        target,
        type,
        key
      } : void 0
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        !!(process.env.NODE_ENV !== "production") ? {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        } : void 0
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (!!(process.env.NODE_ENV !== "production")) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (!!(process.env.NODE_ENV !== "production")) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = !!(process.env.NODE_ENV !== "production") ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (!!(process.env.NODE_ENV !== "production")) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add(value) {
      return add.call(this, value, true);
    },
    set(key, value) {
      return set.call(this, key, value, true);
    },
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (!!(process.env.NODE_ENV !== "production") && this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = !!(process.env.NODE_ENV !== "production") ? () => {
      warn$2("Write operation failed: computed value is readonly");
    } : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (!!(process.env.NODE_ENV !== "production") && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      !!(process.env.NODE_ENV !== "production") ? {
        target: ref2,
        type: "get",
        key: "value"
      } : void 0
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal, oldVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      !!(process.env.NODE_ENV !== "production") ? {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal,
        oldValue: oldVal
      } : void 0
    );
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
/**
* @vue/runtime-core v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush",
  [15]: "component update"
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = !!(process.env.NODE_ENV !== "production") ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      pauseTracking();
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (!!(process.env.NODE_ENV !== "production")) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (!!(process.env.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (!!(process.env.NODE_ENV !== "production")) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      if (cb.active !== false) cb();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre) return -1;
    if (b.pre && !a.pre) return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (!!(process.env.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = !!(process.env.NODE_ENV !== "production") ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (!!(process.env.NODE_ENV !== "production") && check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.i;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Map();
if (!!(process.env.NODE_ENV !== "production")) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.effect.dirty = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const oldComp = normalizeClassComponent(instance.type);
    let dirtyInstances = hmrDirtyComponents.get(oldComp);
    if (!dirtyInstances) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
    }
    dirtyInstances.add(instance);
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      dirtyInstances.add(instance);
      instance.ceReload(newComp.styles);
      dirtyInstances.delete(instance);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob(() => {
        instance.parent.update();
        dirtyInstances.delete(instance);
      });
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    hmrDirtyComponents.clear();
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-syntax
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app2, version2) {
  emit$1("app:init", app2, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app2) {
  emit$1("app:unmount", app2);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => !!(process.env.NODE_ENV !== "production") ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => !!(process.env.NODE_ENV !== "production") ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => !!(process.env.NODE_ENV !== "production") ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => !!(process.env.NODE_ENV !== "production") ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (!!(process.env.NODE_ENV !== "production") && key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
        !!(process.env.NODE_ENV !== "production") && markAttrsAccessed();
      } else if (!!(process.env.NODE_ENV !== "production") && key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (!!(process.env.NODE_ENV !== "production") && currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (!!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (!!(process.env.NODE_ENV !== "production") && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (!!(process.env.NODE_ENV !== "production") && true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = !!(process.env.NODE_ENV !== "production") ? createDuplicateChecker() : null;
  if (!!(process.env.NODE_ENV !== "production")) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (!!(process.env.NODE_ENV !== "production")) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (!!(process.env.NODE_ENV !== "production")) {
          checkDuplicateProperties("Methods", key);
        }
      } else if (!!(process.env.NODE_ENV !== "production")) {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!!(process.env.NODE_ENV !== "production") && !isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (!!(process.env.NODE_ENV !== "production") && isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      if (!!(process.env.NODE_ENV !== "production")) {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (!!(process.env.NODE_ENV !== "production") && get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : !!(process.env.NODE_ENV !== "production") ? () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (!!(process.env.NODE_ENV !== "production")) {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (!!(process.env.NODE_ENV !== "production")) {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          !!(process.env.NODE_ENV !== "production") && warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (!!(process.env.NODE_ENV !== "production")) {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app2;
      },
      component(name, component) {
        if (!!(process.env.NODE_ENV !== "production")) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (!!(process.env.NODE_ENV !== "production") && context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!!(process.env.NODE_ENV !== "production")) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (!!(process.env.NODE_ENV !== "production") && context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (!!(process.env.NODE_ENV !== "production") && rootContainer.__vue_app__) {
            warn$1(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (!!(process.env.NODE_ENV !== "production")) {
            context.reload = () => {
              render(
                cloneVNode(vnode),
                rootContainer,
                namespace
              );
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          if (!!(process.env.NODE_ENV !== "production") || false) {
            app2._instance = vnode.component;
            devtoolsInitApp(app2, version);
          }
          return getComponentPublicInstance(vnode.component);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          if (!!(process.env.NODE_ENV !== "production") || false) {
            app2._instance = null;
            devtoolsUnmountApp(app2);
          }
          delete app2._container.__vue_app__;
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (!!(process.env.NODE_ENV !== "production") && key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId) return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(!!(process.env.NODE_ENV !== "production") && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!!(process.env.NODE_ENV !== "production") && !isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!!(process.env.NODE_ENV !== "production") && !isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null) continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      !!(process.env.NODE_ENV !== "production") ? shallowReadonly(resolvedValues) : resolvedValues,
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (!!(process.env.NODE_ENV !== "production") && currentInstance && (!ctx || ctx.root === currentInstance.root)) {
      warn$1(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (!!(process.env.NODE_ENV !== "production") && true) {
        warn$1(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!!(process.env.NODE_ENV !== "production") && !isKeepAlive(instance.vnode) && true) {
    warn$1(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || key !== "_") {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
        assignSlots(slots, children, optimized);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  if (!!(process.env.NODE_ENV !== "production") && !owner) {
    warn$1(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (hasOwn(setupState, ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (hasOwn(setupState, ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
function initFeatureFlags() {
  const needWarn = [];
  if (!!(process.env.NODE_ENV !== "production") && needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (!!(process.env.NODE_ENV !== "production") || false) {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!(process.env.NODE_ENV !== "production") && isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      def(el, "__vnode", vnode, true);
      def(el, "__vueParentComponent", parentComponent, true);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (!!(process.env.NODE_ENV !== "production") && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    if (!!(process.env.NODE_ENV !== "production") || false) {
      el.__vnode = n2;
    }
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      if (!!(process.env.NODE_ENV !== "production")) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (!!(process.env.NODE_ENV !== "production") && // #5523 dev root fragment may inherit directives
    (isHmrUpdating || patchFlag & 2048)) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (!!(process.env.NODE_ENV !== "production")) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (!!(process.env.NODE_ENV !== "production")) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance, false, optimized);
      if (!!(process.env.NODE_ENV !== "production")) {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (!!(process.env.NODE_ENV !== "production")) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (!!(process.env.NODE_ENV !== "production")) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (!!(process.env.NODE_ENV !== "production")) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (!!(process.env.NODE_ENV !== "production")) {
              endMeasure(instance, `render`);
            }
            if (!!(process.env.NODE_ENV !== "production")) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (!!(process.env.NODE_ENV !== "production")) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (!!(process.env.NODE_ENV !== "production")) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (!!(process.env.NODE_ENV !== "production")) {
            endMeasure(instance, `render`);
          }
          if (!!(process.env.NODE_ENV !== "production")) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          if (!!(process.env.NODE_ENV !== "production")) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (!!(process.env.NODE_ENV !== "production") || false) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        if (!!(process.env.NODE_ENV !== "production")) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (!!(process.env.NODE_ENV !== "production") || false) {
          devtoolsComponentUpdated(instance);
        }
        if (!!(process.env.NODE_ENV !== "production")) {
          popWarningContext();
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      NOOP,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => {
      if (effect2.dirty) {
        effect2.run();
      }
    };
    update.i = instance;
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (!!(process.env.NODE_ENV !== "production")) {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (!!(process.env.NODE_ENV !== "production") && keyToNewIndexMap.has(nextChild.key)) {
            warn$1(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (!!(process.env.NODE_ENV !== "production") && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing2 = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing2) {
      isFlushing2 = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing2 = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (!!(process.env.NODE_ENV !== "production") && c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) hooks[i].active = false;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!!(process.env.NODE_ENV !== "production") && !isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (!!(process.env.NODE_ENV !== "production") && deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!!(process.env.NODE_ENV !== "production") && !cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s) => {
    warn$1(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        !!(process.env.NODE_ENV !== "production") && warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    !!(process.env.NODE_ENV !== "production") && warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance) job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  if (ssrCleanup) ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (!!(process.env.NODE_ENV !== "production")) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(camelize(event)) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  if (!!(process.env.NODE_ENV !== "production")) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = !!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          !!(process.env.NODE_ENV !== "production") ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (!!(process.env.NODE_ENV !== "production") && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render2.length > 1 ? render2(
          !!(process.env.NODE_ENV !== "production") ? shallowReadonly(props) : props,
          !!(process.env.NODE_ENV !== "production") ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          !!(process.env.NODE_ENV !== "production") ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (!!(process.env.NODE_ENV !== "production") && result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      } else if (!!(process.env.NODE_ENV !== "production") && !accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn$1(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn$1(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn$1(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if (!!(process.env.NODE_ENV !== "production") && setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (!!(process.env.NODE_ENV !== "production") && childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (!!(process.env.NODE_ENV !== "production") && recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (!!(process.env.NODE_ENV !== "production") && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (!!(process.env.NODE_ENV !== "production") && n2.shapeFlag & 6 && n1.component) {
    const dirtyInstances = hmrDirtyComponents.get(n2.type);
    if (dirtyInstances && dirtyInstances.has(n1.component)) {
      n1.shapeFlag &= ~256;
      n2.shapeFlag &= ~512;
      return false;
    }
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...args
  );
};
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (!!(process.env.NODE_ENV !== "production") && vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = !!(process.env.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!!(process.env.NODE_ENV !== "production") && !type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (!!(process.env.NODE_ENV !== "production") && shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: !!(process.env.NODE_ENV !== "production") && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set2) => set2(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (!!(process.env.NODE_ENV !== "production")) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  if (!!(process.env.NODE_ENV !== "production")) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        !!(process.env.NODE_ENV !== "production") ? shallowReadonly(instance.props) : instance.props,
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!!(process.env.NODE_ENV !== "production") && !instance.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn$1(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (!!(process.env.NODE_ENV !== "production") && isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (!!(process.env.NODE_ENV !== "production")) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (!!(process.env.NODE_ENV !== "production") && setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!!(process.env.NODE_ENV !== "production") && !Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function: `, Component);
    }
  }
}
const attrsProxyHandlers = !!(process.env.NODE_ENV !== "production") ? {
  get(target, key) {
    markAttrsAccessed();
    track(target, "get", "");
    return target[key];
  },
  set() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  },
  deleteProperty() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  }
} : {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function getSlotsProxy(instance) {
  return new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (!!(process.env.NODE_ENV !== "production")) {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    let attrsProxy;
    let slotsProxy;
    return Object.freeze({
      get attrs() {
        return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
      },
      get slots() {
        return slotsProxy || (slotsProxy = getSlotsProxy(instance));
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  if (!!(process.env.NODE_ENV !== "production")) {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
function initCustomFormatter() {
  if (!!!(process.env.NODE_ENV !== "production") || typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    __vue_custom_formatter: true,
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.4.38";
const warn = !!(process.env.NODE_ENV !== "production") ? warn$1 : NOOP;
!!(process.env.NODE_ENV !== "production") || true ? devtools$1 : void 0;
!!(process.env.NODE_ENV !== "production") || true ? setDevtoolsHook$1 : NOOP;
/**
* @vue/runtime-dom v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
if (!!(process.env.NODE_ENV !== "production")) ;
const CSS_VAR_TEXT = Symbol(!!(process.env.NODE_ENV !== "production") ? "CSS_VAR_TEXT" : "");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (!!(process.env.NODE_ENV !== "production")) {
      if (semicolonRE.test(val)) {
        warn(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent) {
  if (key === "innerHTML" || key === "textContent") {
    if (value == null) return;
    el[key] = value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? "" : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!!(process.env.NODE_ENV !== "production") && !needRemove) {
      warn(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = !!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        !!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function sanitizeEventValue(value, propName) {
  if (isFunction(value) || isArray(value)) {
    return value;
  }
  warn(
    `Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`
  );
  return NOOP;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  if (!!(process.env.NODE_ENV !== "production")) {
    injectNativeTagCheck(app2);
    injectCompilerOptionsCheck(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function injectNativeTagCheck(app2) {
  Object.defineProperty(app2.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app2) {
  {
    const isCustomElement = app2.config.isCustomElement;
    Object.defineProperty(app2.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app2.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app2.config, "compilerOptions", {
      get() {
        warn(msg);
        return compilerOptions;
      },
      set() {
        warn(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!!(process.env.NODE_ENV !== "production") && !res) {
      warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (!!(process.env.NODE_ENV !== "production") && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}
/**
* vue v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function initDev() {
  {
    initCustomFormatter();
  }
}
if (!!(process.env.NODE_ENV !== "production")) {
  initDev();
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, "111");
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const app = () => createApp(App);
class MtaskPlugin extends siyuan.Plugin {
  async onload() {
    this.addIcons(`<svg id="mytask-icon" width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 42H42V6H32H30C28.6758 9.15854 26.6758 10.7378 24 10.7378C21.3242 10.7378 19.3242 9.15854 18 6H16H6V42Z" fill="#fffff1" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M15 24L21 30L33 18" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
    this.addDock({
      config: {
        position: "RightTop",
        size: { width: 200, height: 0 },
        icon: "mytask-icon",
        title: "Mtask"
      },
      data: {},
      type: "dock_tab",
      async init() {
        this.element.id = "siyuan-mtask";
        this.element.style.height = "100%";
        setTimeout(() => {
          app().mount(this.element);
        }, 100);
      },
      destroy() {
        console.log("destroy dock: dock_tab");
      }
    });
  }
}
module.exports = MtaskPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9AdnVlL3NoYXJlZC9kaXN0L3NoYXJlZC5lc20tYnVuZGxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AdnVlL3JlYWN0aXZpdHkvZGlzdC9yZWFjdGl2aXR5LmVzbS1idW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0B2dWUvcnVudGltZS1jb3JlL2Rpc3QvcnVudGltZS1jb3JlLmVzbS1idW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0B2dWUvcnVudGltZS1kb20vZGlzdC9ydW50aW1lLWRvbS5lc20tYnVuZGxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy92dWUvZGlzdC92dWUucnVudGltZS5lc20tYnVuZGxlci5qcyIsIi4uL3NyYy9BcHAudnVlIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAdnVlL3NoYXJlZCB2My40LjM4XG4qIChjKSAyMDE4LXByZXNlbnQgWXV4aSAoRXZhbikgWW91IGFuZCBWdWUgY29udHJpYnV0b3JzXG4qIEBsaWNlbnNlIE1JVFxuKiovXG4vKiEgI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBtYWtlTWFwKHN0ciwgZXhwZWN0c0xvd2VyQ2FzZSkge1xuICBjb25zdCBzZXQgPSBuZXcgU2V0KHN0ci5zcGxpdChcIixcIikpO1xuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZSA/ICh2YWwpID0+IHNldC5oYXModmFsLnRvTG93ZXJDYXNlKCkpIDogKHZhbCkgPT4gc2V0Lmhhcyh2YWwpO1xufVxuXG5jb25zdCBFTVBUWV9PQkogPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gT2JqZWN0LmZyZWV6ZSh7fSkgOiB7fTtcbmNvbnN0IEVNUFRZX0FSUiA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBPYmplY3QuZnJlZXplKFtdKSA6IFtdO1xuY29uc3QgTk9PUCA9ICgpID0+IHtcbn07XG5jb25zdCBOTyA9ICgpID0+IGZhbHNlO1xuY29uc3QgaXNPbiA9IChrZXkpID0+IGtleS5jaGFyQ29kZUF0KDApID09PSAxMTEgJiYga2V5LmNoYXJDb2RlQXQoMSkgPT09IDExMCAmJiAvLyB1cHBlcmNhc2UgbGV0dGVyXG4oa2V5LmNoYXJDb2RlQXQoMikgPiAxMjIgfHwga2V5LmNoYXJDb2RlQXQoMikgPCA5Nyk7XG5jb25zdCBpc01vZGVsTGlzdGVuZXIgPSAoa2V5KSA9PiBrZXkuc3RhcnRzV2l0aChcIm9uVXBkYXRlOlwiKTtcbmNvbnN0IGV4dGVuZCA9IE9iamVjdC5hc3NpZ247XG5jb25zdCByZW1vdmUgPSAoYXJyLCBlbCkgPT4ge1xuICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWwpO1xuICBpZiAoaSA+IC0xKSB7XG4gICAgYXJyLnNwbGljZShpLCAxKTtcbiAgfVxufTtcbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmNvbnN0IGhhc093biA9ICh2YWwsIGtleSkgPT4gaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIGtleSk7XG5jb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmNvbnN0IGlzTWFwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG5jb25zdCBpc1NldCA9ICh2YWwpID0+IHRvVHlwZVN0cmluZyh2YWwpID09PSBcIltvYmplY3QgU2V0XVwiO1xuY29uc3QgaXNEYXRlID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBEYXRlXVwiO1xuY29uc3QgaXNSZWdFeHAgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIjtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc1N5bWJvbCA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwic3ltYm9sXCI7XG5jb25zdCBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNQcm9taXNlID0gKHZhbCkgPT4ge1xuICByZXR1cm4gKGlzT2JqZWN0KHZhbCkgfHwgaXNGdW5jdGlvbih2YWwpKSAmJiBpc0Z1bmN0aW9uKHZhbC50aGVuKSAmJiBpc0Z1bmN0aW9uKHZhbC5jYXRjaCk7XG59O1xuY29uc3Qgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3QgdG9UeXBlU3RyaW5nID0gKHZhbHVlKSA9PiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbmNvbnN0IHRvUmF3VHlwZSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdG9UeXBlU3RyaW5nKHZhbHVlKS5zbGljZSg4LCAtMSk7XG59O1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHRvVHlwZVN0cmluZyh2YWwpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuY29uc3QgaXNJbnRlZ2VyS2V5ID0gKGtleSkgPT4gaXNTdHJpbmcoa2V5KSAmJiBrZXkgIT09IFwiTmFOXCIgJiYga2V5WzBdICE9PSBcIi1cIiAmJiBcIlwiICsgcGFyc2VJbnQoa2V5LCAxMCkgPT09IGtleTtcbmNvbnN0IGlzUmVzZXJ2ZWRQcm9wID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoXG4gIC8vIHRoZSBsZWFkaW5nIGNvbW1hIGlzIGludGVudGlvbmFsIHNvIGVtcHR5IHN0cmluZyBcIlwiIGlzIGFsc28gaW5jbHVkZWRcbiAgXCIsa2V5LHJlZixyZWZfZm9yLHJlZl9rZXksb25Wbm9kZUJlZm9yZU1vdW50LG9uVm5vZGVNb3VudGVkLG9uVm5vZGVCZWZvcmVVcGRhdGUsb25Wbm9kZVVwZGF0ZWQsb25Wbm9kZUJlZm9yZVVubW91bnQsb25Wbm9kZVVubW91bnRlZFwiXG4pO1xuY29uc3QgaXNCdWlsdEluRGlyZWN0aXZlID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoXG4gIFwiYmluZCxjbG9hayxlbHNlLWlmLGVsc2UsZm9yLGh0bWwsaWYsbW9kZWwsb24sb25jZSxwcmUsc2hvdyxzbG90LHRleHQsbWVtb1wiXG4pO1xuY29uc3QgY2FjaGVTdHJpbmdGdW5jdGlvbiA9IChmbikgPT4ge1xuICBjb25zdCBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKHN0cikgPT4ge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpO1xuICB9O1xufTtcbmNvbnN0IGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG5jb25zdCBjYW1lbGl6ZSA9IGNhY2hlU3RyaW5nRnVuY3Rpb24oKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgKF8sIGMpID0+IGMgPyBjLnRvVXBwZXJDYXNlKCkgOiBcIlwiKTtcbn0pO1xuY29uc3QgaHlwaGVuYXRlUkUgPSAvXFxCKFtBLVpdKS9nO1xuY29uc3QgaHlwaGVuYXRlID0gY2FjaGVTdHJpbmdGdW5jdGlvbihcbiAgKHN0cikgPT4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKClcbik7XG5jb25zdCBjYXBpdGFsaXplID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59KTtcbmNvbnN0IHRvSGFuZGxlcktleSA9IGNhY2hlU3RyaW5nRnVuY3Rpb24oKHN0cikgPT4ge1xuICBjb25zdCBzID0gc3RyID8gYG9uJHtjYXBpdGFsaXplKHN0cil9YCA6IGBgO1xuICByZXR1cm4gcztcbn0pO1xuY29uc3QgaGFzQ2hhbmdlZCA9ICh2YWx1ZSwgb2xkVmFsdWUpID0+ICFPYmplY3QuaXModmFsdWUsIG9sZFZhbHVlKTtcbmNvbnN0IGludm9rZUFycmF5Rm5zID0gKGZucywgLi4uYXJnKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgZm5zW2ldKC4uLmFyZyk7XG4gIH1cbn07XG5jb25zdCBkZWYgPSAob2JqLCBrZXksIHZhbHVlLCB3cml0YWJsZSA9IGZhbHNlKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZSxcbiAgICB2YWx1ZVxuICB9KTtcbn07XG5jb25zdCBsb29zZVRvTnVtYmVyID0gKHZhbCkgPT4ge1xuICBjb25zdCBuID0gcGFyc2VGbG9hdCh2YWwpO1xuICByZXR1cm4gaXNOYU4obikgPyB2YWwgOiBuO1xufTtcbmNvbnN0IHRvTnVtYmVyID0gKHZhbCkgPT4ge1xuICBjb25zdCBuID0gaXNTdHJpbmcodmFsKSA/IE51bWJlcih2YWwpIDogTmFOO1xuICByZXR1cm4gaXNOYU4obikgPyB2YWwgOiBuO1xufTtcbmxldCBfZ2xvYmFsVGhpcztcbmNvbnN0IGdldEdsb2JhbFRoaXMgPSAoKSA9PiB7XG4gIHJldHVybiBfZ2xvYmFsVGhpcyB8fCAoX2dsb2JhbFRoaXMgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbn07XG5jb25zdCBpZGVudFJFID0gL15bXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVtfJGEtekEtWjAtOVxceEEwLVxcdUZGRkZdKiQvO1xuZnVuY3Rpb24gZ2VuUHJvcHNBY2Nlc3NFeHAobmFtZSkge1xuICByZXR1cm4gaWRlbnRSRS50ZXN0KG5hbWUpID8gYF9fcHJvcHMuJHtuYW1lfWAgOiBgX19wcm9wc1ske0pTT04uc3RyaW5naWZ5KG5hbWUpfV1gO1xufVxuXG5jb25zdCBQYXRjaEZsYWdzID0ge1xuICBcIlRFWFRcIjogMSxcbiAgXCIxXCI6IFwiVEVYVFwiLFxuICBcIkNMQVNTXCI6IDIsXG4gIFwiMlwiOiBcIkNMQVNTXCIsXG4gIFwiU1RZTEVcIjogNCxcbiAgXCI0XCI6IFwiU1RZTEVcIixcbiAgXCJQUk9QU1wiOiA4LFxuICBcIjhcIjogXCJQUk9QU1wiLFxuICBcIkZVTExfUFJPUFNcIjogMTYsXG4gIFwiMTZcIjogXCJGVUxMX1BST1BTXCIsXG4gIFwiTkVFRF9IWURSQVRJT05cIjogMzIsXG4gIFwiMzJcIjogXCJORUVEX0hZRFJBVElPTlwiLFxuICBcIlNUQUJMRV9GUkFHTUVOVFwiOiA2NCxcbiAgXCI2NFwiOiBcIlNUQUJMRV9GUkFHTUVOVFwiLFxuICBcIktFWUVEX0ZSQUdNRU5UXCI6IDEyOCxcbiAgXCIxMjhcIjogXCJLRVlFRF9GUkFHTUVOVFwiLFxuICBcIlVOS0VZRURfRlJBR01FTlRcIjogMjU2LFxuICBcIjI1NlwiOiBcIlVOS0VZRURfRlJBR01FTlRcIixcbiAgXCJORUVEX1BBVENIXCI6IDUxMixcbiAgXCI1MTJcIjogXCJORUVEX1BBVENIXCIsXG4gIFwiRFlOQU1JQ19TTE9UU1wiOiAxMDI0LFxuICBcIjEwMjRcIjogXCJEWU5BTUlDX1NMT1RTXCIsXG4gIFwiREVWX1JPT1RfRlJBR01FTlRcIjogMjA0OCxcbiAgXCIyMDQ4XCI6IFwiREVWX1JPT1RfRlJBR01FTlRcIixcbiAgXCJIT0lTVEVEXCI6IC0xLFxuICBcIi0xXCI6IFwiSE9JU1RFRFwiLFxuICBcIkJBSUxcIjogLTIsXG4gIFwiLTJcIjogXCJCQUlMXCJcbn07XG5jb25zdCBQYXRjaEZsYWdOYW1lcyA9IHtcbiAgWzFdOiBgVEVYVGAsXG4gIFsyXTogYENMQVNTYCxcbiAgWzRdOiBgU1RZTEVgLFxuICBbOF06IGBQUk9QU2AsXG4gIFsxNl06IGBGVUxMX1BST1BTYCxcbiAgWzMyXTogYE5FRURfSFlEUkFUSU9OYCxcbiAgWzY0XTogYFNUQUJMRV9GUkFHTUVOVGAsXG4gIFsxMjhdOiBgS0VZRURfRlJBR01FTlRgLFxuICBbMjU2XTogYFVOS0VZRURfRlJBR01FTlRgLFxuICBbNTEyXTogYE5FRURfUEFUQ0hgLFxuICBbMTAyNF06IGBEWU5BTUlDX1NMT1RTYCxcbiAgWzIwNDhdOiBgREVWX1JPT1RfRlJBR01FTlRgLFxuICBbLTFdOiBgSE9JU1RFRGAsXG4gIFstMl06IGBCQUlMYFxufTtcblxuY29uc3QgU2hhcGVGbGFncyA9IHtcbiAgXCJFTEVNRU5UXCI6IDEsXG4gIFwiMVwiOiBcIkVMRU1FTlRcIixcbiAgXCJGVU5DVElPTkFMX0NPTVBPTkVOVFwiOiAyLFxuICBcIjJcIjogXCJGVU5DVElPTkFMX0NPTVBPTkVOVFwiLFxuICBcIlNUQVRFRlVMX0NPTVBPTkVOVFwiOiA0LFxuICBcIjRcIjogXCJTVEFURUZVTF9DT01QT05FTlRcIixcbiAgXCJURVhUX0NISUxEUkVOXCI6IDgsXG4gIFwiOFwiOiBcIlRFWFRfQ0hJTERSRU5cIixcbiAgXCJBUlJBWV9DSElMRFJFTlwiOiAxNixcbiAgXCIxNlwiOiBcIkFSUkFZX0NISUxEUkVOXCIsXG4gIFwiU0xPVFNfQ0hJTERSRU5cIjogMzIsXG4gIFwiMzJcIjogXCJTTE9UU19DSElMRFJFTlwiLFxuICBcIlRFTEVQT1JUXCI6IDY0LFxuICBcIjY0XCI6IFwiVEVMRVBPUlRcIixcbiAgXCJTVVNQRU5TRVwiOiAxMjgsXG4gIFwiMTI4XCI6IFwiU1VTUEVOU0VcIixcbiAgXCJDT01QT05FTlRfU0hPVUxEX0tFRVBfQUxJVkVcIjogMjU2LFxuICBcIjI1NlwiOiBcIkNPTVBPTkVOVF9TSE9VTERfS0VFUF9BTElWRVwiLFxuICBcIkNPTVBPTkVOVF9LRVBUX0FMSVZFXCI6IDUxMixcbiAgXCI1MTJcIjogXCJDT01QT05FTlRfS0VQVF9BTElWRVwiLFxuICBcIkNPTVBPTkVOVFwiOiA2LFxuICBcIjZcIjogXCJDT01QT05FTlRcIlxufTtcblxuY29uc3QgU2xvdEZsYWdzID0ge1xuICBcIlNUQUJMRVwiOiAxLFxuICBcIjFcIjogXCJTVEFCTEVcIixcbiAgXCJEWU5BTUlDXCI6IDIsXG4gIFwiMlwiOiBcIkRZTkFNSUNcIixcbiAgXCJGT1JXQVJERURcIjogMyxcbiAgXCIzXCI6IFwiRk9SV0FSREVEXCJcbn07XG5jb25zdCBzbG90RmxhZ3NUZXh0ID0ge1xuICBbMV06IFwiU1RBQkxFXCIsXG4gIFsyXTogXCJEWU5BTUlDXCIsXG4gIFszXTogXCJGT1JXQVJERURcIlxufTtcblxuY29uc3QgR0xPQkFMU19BTExPV0VEID0gXCJJbmZpbml0eSx1bmRlZmluZWQsTmFOLGlzRmluaXRlLGlzTmFOLHBhcnNlRmxvYXQscGFyc2VJbnQsZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksZW5jb2RlVVJJQ29tcG9uZW50LE1hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCxCaWdJbnQsY29uc29sZSxFcnJvclwiO1xuY29uc3QgaXNHbG9iYWxseUFsbG93ZWQgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChHTE9CQUxTX0FMTE9XRUQpO1xuY29uc3QgaXNHbG9iYWxseVdoaXRlbGlzdGVkID0gaXNHbG9iYWxseUFsbG93ZWQ7XG5cbmNvbnN0IHJhbmdlID0gMjtcbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZUZyYW1lKHNvdXJjZSwgc3RhcnQgPSAwLCBlbmQgPSBzb3VyY2UubGVuZ3RoKSB7XG4gIHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc3RhcnQsIHNvdXJjZS5sZW5ndGgpKTtcbiAgZW5kID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZW5kLCBzb3VyY2UubGVuZ3RoKSk7XG4gIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFwiXCI7XG4gIGxldCBsaW5lcyA9IHNvdXJjZS5zcGxpdCgvKFxccj9cXG4pLyk7XG4gIGNvbnN0IG5ld2xpbmVTZXF1ZW5jZXMgPSBsaW5lcy5maWx0ZXIoKF8sIGlkeCkgPT4gaWR4ICUgMiA9PT0gMSk7XG4gIGxpbmVzID0gbGluZXMuZmlsdGVyKChfLCBpZHgpID0+IGlkeCAlIDIgPT09IDApO1xuICBsZXQgY291bnQgPSAwO1xuICBjb25zdCByZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvdW50ICs9IGxpbmVzW2ldLmxlbmd0aCArIChuZXdsaW5lU2VxdWVuY2VzW2ldICYmIG5ld2xpbmVTZXF1ZW5jZXNbaV0ubGVuZ3RoIHx8IDApO1xuICAgIGlmIChjb3VudCA+PSBzdGFydCkge1xuICAgICAgZm9yIChsZXQgaiA9IGkgLSByYW5nZTsgaiA8PSBpICsgcmFuZ2UgfHwgZW5kID4gY291bnQ7IGorKykge1xuICAgICAgICBpZiAoaiA8IDAgfHwgaiA+PSBsaW5lcy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBsaW5lID0gaiArIDE7XG4gICAgICAgIHJlcy5wdXNoKFxuICAgICAgICAgIGAke2xpbmV9JHtcIiBcIi5yZXBlYXQoTWF0aC5tYXgoMyAtIFN0cmluZyhsaW5lKS5sZW5ndGgsIDApKX18ICAke2xpbmVzW2pdfWBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVzW2pdLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV3TGluZVNlcUxlbmd0aCA9IG5ld2xpbmVTZXF1ZW5jZXNbal0gJiYgbmV3bGluZVNlcXVlbmNlc1tqXS5sZW5ndGggfHwgMDtcbiAgICAgICAgaWYgKGogPT09IGkpIHtcbiAgICAgICAgICBjb25zdCBwYWQgPSBzdGFydCAtIChjb3VudCAtIChsaW5lTGVuZ3RoICsgbmV3TGluZVNlcUxlbmd0aCkpO1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIGVuZCA+IGNvdW50ID8gbGluZUxlbmd0aCAtIHBhZCA6IGVuZCAtIHN0YXJ0XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArIFwiIFwiLnJlcGVhdChwYWQpICsgXCJeXCIucmVwZWF0KGxlbmd0aCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGogPiBpKSB7XG4gICAgICAgICAgaWYgKGVuZCA+IGNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heChNYXRoLm1pbihlbmQgLSBjb3VudCwgbGluZUxlbmd0aCksIDEpO1xuICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyBcIl5cIi5yZXBlYXQobGVuZ3RoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvdW50ICs9IGxpbmVMZW5ndGggKyBuZXdMaW5lU2VxTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZSh2YWx1ZSkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBjb25zdCByZXMgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtID0gdmFsdWVbaV07XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gaXNTdHJpbmcoaXRlbSkgPyBwYXJzZVN0cmluZ1N0eWxlKGl0ZW0pIDogbm9ybWFsaXplU3R5bGUoaXRlbSk7XG4gICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBub3JtYWxpemVkKSB7XG4gICAgICAgICAgcmVzW2tleV0gPSBub3JtYWxpemVkW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfSBlbHNlIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5jb25zdCBsaXN0RGVsaW1pdGVyUkUgPSAvOyg/IVteKF0qXFwpKS9nO1xuY29uc3QgcHJvcGVydHlEZWxpbWl0ZXJSRSA9IC86KFteXSspLztcbmNvbnN0IHN0eWxlQ29tbWVudFJFID0gL1xcL1xcKlteXSo/XFwqXFwvL2c7XG5mdW5jdGlvbiBwYXJzZVN0cmluZ1N0eWxlKGNzc1RleHQpIHtcbiAgY29uc3QgcmV0ID0ge307XG4gIGNzc1RleHQucmVwbGFjZShzdHlsZUNvbW1lbnRSRSwgXCJcIikuc3BsaXQobGlzdERlbGltaXRlclJFKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHRtcCA9IGl0ZW0uc3BsaXQocHJvcGVydHlEZWxpbWl0ZXJSRSk7XG4gICAgICB0bXAubGVuZ3RoID4gMSAmJiAocmV0W3RtcFswXS50cmltKCldID0gdG1wWzFdLnRyaW0oKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeVN0eWxlKHN0eWxlcykge1xuICBsZXQgcmV0ID0gXCJcIjtcbiAgaWYgKCFzdHlsZXMgfHwgaXNTdHJpbmcoc3R5bGVzKSkge1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGVzKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzdHlsZXNba2V5XTtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS5zdGFydHNXaXRoKGAtLWApID8ga2V5IDogaHlwaGVuYXRlKGtleSk7XG4gICAgICByZXQgKz0gYCR7bm9ybWFsaXplZEtleX06JHt2YWx1ZX07YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzKHZhbHVlKSB7XG4gIGxldCByZXMgPSBcIlwiO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgcmVzID0gdmFsdWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplQ2xhc3ModmFsdWVbaV0pO1xuICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcbiAgICAgICAgcmVzICs9IG5vcm1hbGl6ZWQgKyBcIiBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVbbmFtZV0pIHtcbiAgICAgICAgcmVzICs9IG5hbWUgKyBcIiBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcy50cmltKCk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVQcm9wcyhwcm9wcykge1xuICBpZiAoIXByb3BzKSByZXR1cm4gbnVsbDtcbiAgbGV0IHsgY2xhc3M6IGtsYXNzLCBzdHlsZSB9ID0gcHJvcHM7XG4gIGlmIChrbGFzcyAmJiAhaXNTdHJpbmcoa2xhc3MpKSB7XG4gICAgcHJvcHMuY2xhc3MgPSBub3JtYWxpemVDbGFzcyhrbGFzcyk7XG4gIH1cbiAgaWYgKHN0eWxlKSB7XG4gICAgcHJvcHMuc3R5bGUgPSBub3JtYWxpemVTdHlsZShzdHlsZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BzO1xufVxuXG5jb25zdCBIVE1MX1RBR1MgPSBcImh0bWwsYm9keSxiYXNlLGhlYWQsbGluayxtZXRhLHN0eWxlLHRpdGxlLGFkZHJlc3MsYXJ0aWNsZSxhc2lkZSxmb290ZXIsaGVhZGVyLGhncm91cCxoMSxoMixoMyxoNCxoNSxoNixuYXYsc2VjdGlvbixkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUscGljdHVyZSxocixpbWcsbGksbWFpbixvbCxwLHByZSx1bCxhLGIsYWJicixiZGksYmRvLGJyLGNpdGUsY29kZSxkYXRhLGRmbixlbSxpLGtiZCxtYXJrLHEscnAscnQscnVieSxzLHNhbXAsc21hbGwsc3BhbixzdHJvbmcsc3ViLHN1cCx0aW1lLHUsdmFyLHdicixhcmVhLGF1ZGlvLG1hcCx0cmFjayx2aWRlbyxlbWJlZCxvYmplY3QscGFyYW0sc291cmNlLGNhbnZhcyxzY3JpcHQsbm9zY3JpcHQsZGVsLGlucyxjYXB0aW9uLGNvbCxjb2xncm91cCx0YWJsZSx0aGVhZCx0Ym9keSx0ZCx0aCx0cixidXR0b24sZGF0YWxpc3QsZmllbGRzZXQsZm9ybSxpbnB1dCxsYWJlbCxsZWdlbmQsbWV0ZXIsb3B0Z3JvdXAsb3B0aW9uLG91dHB1dCxwcm9ncmVzcyxzZWxlY3QsdGV4dGFyZWEsZGV0YWlscyxkaWFsb2csbWVudSxzdW1tYXJ5LHRlbXBsYXRlLGJsb2NrcXVvdGUsaWZyYW1lLHRmb290XCI7XG5jb25zdCBTVkdfVEFHUyA9IFwic3ZnLGFuaW1hdGUsYW5pbWF0ZU1vdGlvbixhbmltYXRlVHJhbnNmb3JtLGNpcmNsZSxjbGlwUGF0aCxjb2xvci1wcm9maWxlLGRlZnMsZGVzYyxkaXNjYXJkLGVsbGlwc2UsZmVCbGVuZCxmZUNvbG9yTWF0cml4LGZlQ29tcG9uZW50VHJhbnNmZXIsZmVDb21wb3NpdGUsZmVDb252b2x2ZU1hdHJpeCxmZURpZmZ1c2VMaWdodGluZyxmZURpc3BsYWNlbWVudE1hcCxmZURpc3RhbnRMaWdodCxmZURyb3BTaGFkb3csZmVGbG9vZCxmZUZ1bmNBLGZlRnVuY0IsZmVGdW5jRyxmZUZ1bmNSLGZlR2F1c3NpYW5CbHVyLGZlSW1hZ2UsZmVNZXJnZSxmZU1lcmdlTm9kZSxmZU1vcnBob2xvZ3ksZmVPZmZzZXQsZmVQb2ludExpZ2h0LGZlU3BlY3VsYXJMaWdodGluZyxmZVNwb3RMaWdodCxmZVRpbGUsZmVUdXJidWxlbmNlLGZpbHRlcixmb3JlaWduT2JqZWN0LGcsaGF0Y2gsaGF0Y2hwYXRoLGltYWdlLGxpbmUsbGluZWFyR3JhZGllbnQsbWFya2VyLG1hc2ssbWVzaCxtZXNoZ3JhZGllbnQsbWVzaHBhdGNoLG1lc2hyb3csbWV0YWRhdGEsbXBhdGgscGF0aCxwYXR0ZXJuLHBvbHlnb24scG9seWxpbmUscmFkaWFsR3JhZGllbnQscmVjdCxzZXQsc29saWRjb2xvcixzdG9wLHN3aXRjaCxzeW1ib2wsdGV4dCx0ZXh0UGF0aCx0aXRsZSx0c3Bhbix1bmtub3duLHVzZSx2aWV3XCI7XG5jb25zdCBNQVRIX1RBR1MgPSBcImFubm90YXRpb24sYW5ub3RhdGlvbi14bWwsbWFjdGlvbixtYWxpZ25ncm91cCxtYWxpZ25tYXJrLG1hdGgsbWVuY2xvc2UsbWVycm9yLG1mZW5jZWQsbWZyYWMsbWZyYWN0aW9uLG1nbHlwaCxtaSxtbGFiZWxlZHRyLG1sb25nZGl2LG1tdWx0aXNjcmlwdHMsbW4sbW8sbW92ZXIsbXBhZGRlZCxtcGhhbnRvbSxtcHJlc2NyaXB0cyxtcm9vdCxtcm93LG1zLG1zY2Fycmllcyxtc2NhcnJ5LG1zZ3JvdXAsbXNsaW5lLG1zcGFjZSxtc3FydCxtc3Jvdyxtc3RhY2ssbXN0eWxlLG1zdWIsbXN1YnN1cCxtc3VwLG10YWJsZSxtdGQsbXRleHQsbXRyLG11bmRlcixtdW5kZXJvdmVyLG5vbmUsc2VtYW50aWNzXCI7XG5jb25zdCBWT0lEX1RBR1MgPSBcImFyZWEsYmFzZSxicixjb2wsZW1iZWQsaHIsaW1nLGlucHV0LGxpbmssbWV0YSxwYXJhbSxzb3VyY2UsdHJhY2ssd2JyXCI7XG5jb25zdCBpc0hUTUxUYWcgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChIVE1MX1RBR1MpO1xuY29uc3QgaXNTVkdUYWcgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChTVkdfVEFHUyk7XG5jb25zdCBpc01hdGhNTFRhZyA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKE1BVEhfVEFHUyk7XG5jb25zdCBpc1ZvaWRUYWcgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChWT0lEX1RBR1MpO1xuXG5jb25zdCBzcGVjaWFsQm9vbGVhbkF0dHJzID0gYGl0ZW1zY29wZSxhbGxvd2Z1bGxzY3JlZW4sZm9ybW5vdmFsaWRhdGUsaXNtYXAsbm9tb2R1bGUsbm92YWxpZGF0ZSxyZWFkb25seWA7XG5jb25zdCBpc1NwZWNpYWxCb29sZWFuQXR0ciA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKHNwZWNpYWxCb29sZWFuQXR0cnMpO1xuY29uc3QgaXNCb29sZWFuQXR0ciA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKFxuICBzcGVjaWFsQm9vbGVhbkF0dHJzICsgYCxhc3luYyxhdXRvZm9jdXMsYXV0b3BsYXksY29udHJvbHMsZGVmYXVsdCxkZWZlcixkaXNhYmxlZCxoaWRkZW4saW5lcnQsbG9vcCxvcGVuLHJlcXVpcmVkLHJldmVyc2VkLHNjb3BlZCxzZWFtbGVzcyxjaGVja2VkLG11dGVkLG11bHRpcGxlLHNlbGVjdGVkYFxuKTtcbmZ1bmN0aW9uIGluY2x1ZGVCb29sZWFuQXR0cih2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCJcIjtcbn1cbmNvbnN0IHVuc2FmZUF0dHJDaGFyUkUgPSAvWz4vPVwiJ1xcdTAwMDlcXHUwMDBhXFx1MDAwY1xcdTAwMjBdLztcbmNvbnN0IGF0dHJWYWxpZGF0aW9uQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGlzU1NSU2FmZUF0dHJOYW1lKG5hbWUpIHtcbiAgaWYgKGF0dHJWYWxpZGF0aW9uQ2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICByZXR1cm4gYXR0clZhbGlkYXRpb25DYWNoZVtuYW1lXTtcbiAgfVxuICBjb25zdCBpc1Vuc2FmZSA9IHVuc2FmZUF0dHJDaGFyUkUudGVzdChuYW1lKTtcbiAgaWYgKGlzVW5zYWZlKSB7XG4gICAgY29uc29sZS5lcnJvcihgdW5zYWZlIGF0dHJpYnV0ZSBuYW1lOiAke25hbWV9YCk7XG4gIH1cbiAgcmV0dXJuIGF0dHJWYWxpZGF0aW9uQ2FjaGVbbmFtZV0gPSAhaXNVbnNhZmU7XG59XG5jb25zdCBwcm9wc1RvQXR0ck1hcCA9IHtcbiAgYWNjZXB0Q2hhcnNldDogXCJhY2NlcHQtY2hhcnNldFwiLFxuICBjbGFzc05hbWU6IFwiY2xhc3NcIixcbiAgaHRtbEZvcjogXCJmb3JcIixcbiAgaHR0cEVxdWl2OiBcImh0dHAtZXF1aXZcIlxufTtcbmNvbnN0IGlzS25vd25IdG1sQXR0ciA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKFxuICBgYWNjZXB0LGFjY2VwdC1jaGFyc2V0LGFjY2Vzc2tleSxhY3Rpb24sYWxpZ24sYWxsb3csYWx0LGFzeW5jLGF1dG9jYXBpdGFsaXplLGF1dG9jb21wbGV0ZSxhdXRvZm9jdXMsYXV0b3BsYXksYmFja2dyb3VuZCxiZ2NvbG9yLGJvcmRlcixidWZmZXJlZCxjYXB0dXJlLGNoYWxsZW5nZSxjaGFyc2V0LGNoZWNrZWQsY2l0ZSxjbGFzcyxjb2RlLGNvZGViYXNlLGNvbG9yLGNvbHMsY29sc3Bhbixjb250ZW50LGNvbnRlbnRlZGl0YWJsZSxjb250ZXh0bWVudSxjb250cm9scyxjb29yZHMsY3Jvc3NvcmlnaW4sY3NwLGRhdGEsZGF0ZXRpbWUsZGVjb2RpbmcsZGVmYXVsdCxkZWZlcixkaXIsZGlybmFtZSxkaXNhYmxlZCxkb3dubG9hZCxkcmFnZ2FibGUsZHJvcHpvbmUsZW5jdHlwZSxlbnRlcmtleWhpbnQsZm9yLGZvcm0sZm9ybWFjdGlvbixmb3JtZW5jdHlwZSxmb3JtbWV0aG9kLGZvcm1ub3ZhbGlkYXRlLGZvcm10YXJnZXQsaGVhZGVycyxoZWlnaHQsaGlkZGVuLGhpZ2gsaHJlZixocmVmbGFuZyxodHRwLWVxdWl2LGljb24saWQsaW1wb3J0YW5jZSxpbmVydCxpbnRlZ3JpdHksaXNtYXAsaXRlbXByb3Asa2V5dHlwZSxraW5kLGxhYmVsLGxhbmcsbGFuZ3VhZ2UsbG9hZGluZyxsaXN0LGxvb3AsbG93LG1hbmlmZXN0LG1heCxtYXhsZW5ndGgsbWlubGVuZ3RoLG1lZGlhLG1pbixtdWx0aXBsZSxtdXRlZCxuYW1lLG5vdmFsaWRhdGUsb3BlbixvcHRpbXVtLHBhdHRlcm4scGluZyxwbGFjZWhvbGRlcixwb3N0ZXIscHJlbG9hZCxyYWRpb2dyb3VwLHJlYWRvbmx5LHJlZmVycmVycG9saWN5LHJlbCxyZXF1aXJlZCxyZXZlcnNlZCxyb3dzLHJvd3NwYW4sc2FuZGJveCxzY29wZSxzY29wZWQsc2VsZWN0ZWQsc2hhcGUsc2l6ZSxzaXplcyxzbG90LHNwYW4sc3BlbGxjaGVjayxzcmMsc3JjZG9jLHNyY2xhbmcsc3Jjc2V0LHN0YXJ0LHN0ZXAsc3R5bGUsc3VtbWFyeSx0YWJpbmRleCx0YXJnZXQsdGl0bGUsdHJhbnNsYXRlLHR5cGUsdXNlbWFwLHZhbHVlLHdpZHRoLHdyYXBgXG4pO1xuY29uc3QgaXNLbm93blN2Z0F0dHIgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChcbiAgYHhtbG5zLGFjY2VudC1oZWlnaHQsYWNjdW11bGF0ZSxhZGRpdGl2ZSxhbGlnbm1lbnQtYmFzZWxpbmUsYWxwaGFiZXRpYyxhbXBsaXR1ZGUsYXJhYmljLWZvcm0sYXNjZW50LGF0dHJpYnV0ZU5hbWUsYXR0cmlidXRlVHlwZSxhemltdXRoLGJhc2VGcmVxdWVuY3ksYmFzZWxpbmUtc2hpZnQsYmFzZVByb2ZpbGUsYmJveCxiZWdpbixiaWFzLGJ5LGNhbGNNb2RlLGNhcC1oZWlnaHQsY2xhc3MsY2xpcCxjbGlwUGF0aFVuaXRzLGNsaXAtcGF0aCxjbGlwLXJ1bGUsY29sb3IsY29sb3ItaW50ZXJwb2xhdGlvbixjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMsY29sb3ItcHJvZmlsZSxjb2xvci1yZW5kZXJpbmcsY29udGVudFNjcmlwdFR5cGUsY29udGVudFN0eWxlVHlwZSxjcm9zc29yaWdpbixjdXJzb3IsY3gsY3ksZCxkZWNlbGVyYXRlLGRlc2NlbnQsZGlmZnVzZUNvbnN0YW50LGRpcmVjdGlvbixkaXNwbGF5LGRpdmlzb3IsZG9taW5hbnQtYmFzZWxpbmUsZHVyLGR4LGR5LGVkZ2VNb2RlLGVsZXZhdGlvbixlbmFibGUtYmFja2dyb3VuZCxlbmQsZXhwb25lbnQsZmlsbCxmaWxsLW9wYWNpdHksZmlsbC1ydWxlLGZpbHRlcixmaWx0ZXJSZXMsZmlsdGVyVW5pdHMsZmxvb2QtY29sb3IsZmxvb2Qtb3BhY2l0eSxmb250LWZhbWlseSxmb250LXNpemUsZm9udC1zaXplLWFkanVzdCxmb250LXN0cmV0Y2gsZm9udC1zdHlsZSxmb250LXZhcmlhbnQsZm9udC13ZWlnaHQsZm9ybWF0LGZyb20sZnIsZngsZnksZzEsZzIsZ2x5cGgtbmFtZSxnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsLGdseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsLGdseXBoUmVmLGdyYWRpZW50VHJhbnNmb3JtLGdyYWRpZW50VW5pdHMsaGFuZ2luZyxoZWlnaHQsaHJlZixocmVmbGFuZyxob3Jpei1hZHYteCxob3Jpei1vcmlnaW4teCxpZCxpZGVvZ3JhcGhpYyxpbWFnZS1yZW5kZXJpbmcsaW4saW4yLGludGVyY2VwdCxrLGsxLGsyLGszLGs0LGtlcm5lbE1hdHJpeCxrZXJuZWxVbml0TGVuZ3RoLGtlcm5pbmcsa2V5UG9pbnRzLGtleVNwbGluZXMsa2V5VGltZXMsbGFuZyxsZW5ndGhBZGp1c3QsbGV0dGVyLXNwYWNpbmcsbGlnaHRpbmctY29sb3IsbGltaXRpbmdDb25lQW5nbGUsbG9jYWwsbWFya2VyLWVuZCxtYXJrZXItbWlkLG1hcmtlci1zdGFydCxtYXJrZXJIZWlnaHQsbWFya2VyVW5pdHMsbWFya2VyV2lkdGgsbWFzayxtYXNrQ29udGVudFVuaXRzLG1hc2tVbml0cyxtYXRoZW1hdGljYWwsbWF4LG1lZGlhLG1ldGhvZCxtaW4sbW9kZSxuYW1lLG51bU9jdGF2ZXMsb2Zmc2V0LG9wYWNpdHksb3BlcmF0b3Isb3JkZXIsb3JpZW50LG9yaWVudGF0aW9uLG9yaWdpbixvdmVyZmxvdyxvdmVybGluZS1wb3NpdGlvbixvdmVybGluZS10aGlja25lc3MscGFub3NlLTEscGFpbnQtb3JkZXIscGF0aCxwYXRoTGVuZ3RoLHBhdHRlcm5Db250ZW50VW5pdHMscGF0dGVyblRyYW5zZm9ybSxwYXR0ZXJuVW5pdHMscGluZyxwb2ludGVyLWV2ZW50cyxwb2ludHMscG9pbnRzQXRYLHBvaW50c0F0WSxwb2ludHNBdFoscHJlc2VydmVBbHBoYSxwcmVzZXJ2ZUFzcGVjdFJhdGlvLHByaW1pdGl2ZVVuaXRzLHIscmFkaXVzLHJlZmVycmVyUG9saWN5LHJlZlgscmVmWSxyZWwscmVuZGVyaW5nLWludGVudCxyZXBlYXRDb3VudCxyZXBlYXREdXIscmVxdWlyZWRFeHRlbnNpb25zLHJlcXVpcmVkRmVhdHVyZXMscmVzdGFydCxyZXN1bHQscm90YXRlLHJ4LHJ5LHNjYWxlLHNlZWQsc2hhcGUtcmVuZGVyaW5nLHNsb3BlLHNwYWNpbmcsc3BlY3VsYXJDb25zdGFudCxzcGVjdWxhckV4cG9uZW50LHNwZWVkLHNwcmVhZE1ldGhvZCxzdGFydE9mZnNldCxzdGREZXZpYXRpb24sc3RlbWgsc3RlbXYsc3RpdGNoVGlsZXMsc3RvcC1jb2xvcixzdG9wLW9wYWNpdHksc3RyaWtldGhyb3VnaC1wb3NpdGlvbixzdHJpa2V0aHJvdWdoLXRoaWNrbmVzcyxzdHJpbmcsc3Ryb2tlLHN0cm9rZS1kYXNoYXJyYXksc3Ryb2tlLWRhc2hvZmZzZXQsc3Ryb2tlLWxpbmVjYXAsc3Ryb2tlLWxpbmVqb2luLHN0cm9rZS1taXRlcmxpbWl0LHN0cm9rZS1vcGFjaXR5LHN0cm9rZS13aWR0aCxzdHlsZSxzdXJmYWNlU2NhbGUsc3lzdGVtTGFuZ3VhZ2UsdGFiaW5kZXgsdGFibGVWYWx1ZXMsdGFyZ2V0LHRhcmdldFgsdGFyZ2V0WSx0ZXh0LWFuY2hvcix0ZXh0LWRlY29yYXRpb24sdGV4dC1yZW5kZXJpbmcsdGV4dExlbmd0aCx0byx0cmFuc2Zvcm0sdHJhbnNmb3JtLW9yaWdpbix0eXBlLHUxLHUyLHVuZGVybGluZS1wb3NpdGlvbix1bmRlcmxpbmUtdGhpY2tuZXNzLHVuaWNvZGUsdW5pY29kZS1iaWRpLHVuaWNvZGUtcmFuZ2UsdW5pdHMtcGVyLWVtLHYtYWxwaGFiZXRpYyx2LWhhbmdpbmcsdi1pZGVvZ3JhcGhpYyx2LW1hdGhlbWF0aWNhbCx2YWx1ZXMsdmVjdG9yLWVmZmVjdCx2ZXJzaW9uLHZlcnQtYWR2LXksdmVydC1vcmlnaW4teCx2ZXJ0LW9yaWdpbi15LHZpZXdCb3gsdmlld1RhcmdldCx2aXNpYmlsaXR5LHdpZHRoLHdpZHRocyx3b3JkLXNwYWNpbmcsd3JpdGluZy1tb2RlLHgseC1oZWlnaHQseDEseDIseENoYW5uZWxTZWxlY3Rvcix4bGluazphY3R1YXRlLHhsaW5rOmFyY3JvbGUseGxpbms6aHJlZix4bGluazpyb2xlLHhsaW5rOnNob3cseGxpbms6dGl0bGUseGxpbms6dHlwZSx4bWxuczp4bGluayx4bWw6YmFzZSx4bWw6bGFuZyx4bWw6c3BhY2UseSx5MSx5Mix5Q2hhbm5lbFNlbGVjdG9yLHosem9vbUFuZFBhbmBcbik7XG5mdW5jdGlvbiBpc1JlbmRlcmFibGVBdHRyVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcbn1cblxuY29uc3QgZXNjYXBlUkUgPSAvW1wiJyY8Pl0vO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgY29uc3Qgc3RyID0gXCJcIiArIHN0cmluZztcbiAgY29uc3QgbWF0Y2ggPSBlc2NhcGVSRS5leGVjKHN0cik7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG4gIGxldCBodG1sID0gXCJcIjtcbiAgbGV0IGVzY2FwZWQ7XG4gIGxldCBpbmRleDtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGZvciAoaW5kZXggPSBtYXRjaC5pbmRleDsgaW5kZXggPCBzdHIubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgc3dpdGNoIChzdHIuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgIGNhc2UgMzQ6XG4gICAgICAgIGVzY2FwZWQgPSBcIiZxdW90O1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGVzY2FwZWQgPSBcIiZhbXA7XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgZXNjYXBlZCA9IFwiJiMzOTtcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYwOlxuICAgICAgICBlc2NhcGVkID0gXCImbHQ7XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2MjpcbiAgICAgICAgZXNjYXBlZCA9IFwiJmd0O1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgaHRtbCArPSBzdHIuc2xpY2UobGFzdEluZGV4LCBpbmRleCk7XG4gICAgfVxuICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMTtcbiAgICBodG1sICs9IGVzY2FwZWQ7XG4gIH1cbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gaW5kZXggPyBodG1sICsgc3RyLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpIDogaHRtbDtcbn1cbmNvbnN0IGNvbW1lbnRTdHJpcFJFID0gL14tPz58PCEtLXwtLT58LS0hPnw8IS0kL2c7XG5mdW5jdGlvbiBlc2NhcGVIdG1sQ29tbWVudChzcmMpIHtcbiAgcmV0dXJuIHNyYy5yZXBsYWNlKGNvbW1lbnRTdHJpcFJFLCBcIlwiKTtcbn1cblxuZnVuY3Rpb24gbG9vc2VDb21wYXJlQXJyYXlzKGEsIGIpIHtcbiAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBsZXQgZXF1YWwgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgZXF1YWwgJiYgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBlcXVhbCA9IGxvb3NlRXF1YWwoYVtpXSwgYltpXSk7XG4gIH1cbiAgcmV0dXJuIGVxdWFsO1xufVxuZnVuY3Rpb24gbG9vc2VFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgbGV0IGFWYWxpZFR5cGUgPSBpc0RhdGUoYSk7XG4gIGxldCBiVmFsaWRUeXBlID0gaXNEYXRlKGIpO1xuICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgcmV0dXJuIGFWYWxpZFR5cGUgJiYgYlZhbGlkVHlwZSA/IGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSA6IGZhbHNlO1xuICB9XG4gIGFWYWxpZFR5cGUgPSBpc1N5bWJvbChhKTtcbiAgYlZhbGlkVHlwZSA9IGlzU3ltYm9sKGIpO1xuICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbiAgYVZhbGlkVHlwZSA9IGlzQXJyYXkoYSk7XG4gIGJWYWxpZFR5cGUgPSBpc0FycmF5KGIpO1xuICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgcmV0dXJuIGFWYWxpZFR5cGUgJiYgYlZhbGlkVHlwZSA/IGxvb3NlQ29tcGFyZUFycmF5cyhhLCBiKSA6IGZhbHNlO1xuICB9XG4gIGFWYWxpZFR5cGUgPSBpc09iamVjdChhKTtcbiAgYlZhbGlkVHlwZSA9IGlzT2JqZWN0KGIpO1xuICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgaWYgKCFhVmFsaWRUeXBlIHx8ICFiVmFsaWRUeXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGFLZXlzQ291bnQgPSBPYmplY3Qua2V5cyhhKS5sZW5ndGg7XG4gICAgY29uc3QgYktleXNDb3VudCA9IE9iamVjdC5rZXlzKGIpLmxlbmd0aDtcbiAgICBpZiAoYUtleXNDb3VudCAhPT0gYktleXNDb3VudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhKSB7XG4gICAgICBjb25zdCBhSGFzS2V5ID0gYS5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgICAgY29uc3QgYkhhc0tleSA9IGIuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICAgIGlmIChhSGFzS2V5ICYmICFiSGFzS2V5IHx8ICFhSGFzS2V5ICYmIGJIYXNLZXkgfHwgIWxvb3NlRXF1YWwoYVtrZXldLCBiW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpO1xufVxuZnVuY3Rpb24gbG9vc2VJbmRleE9mKGFyciwgdmFsKSB7XG4gIHJldHVybiBhcnIuZmluZEluZGV4KChpdGVtKSA9PiBsb29zZUVxdWFsKGl0ZW0sIHZhbCkpO1xufVxuXG5jb25zdCBpc1JlZiA9ICh2YWwpID0+IHtcbiAgcmV0dXJuICEhKHZhbCAmJiB2YWwuX192X2lzUmVmID09PSB0cnVlKTtcbn07XG5jb25zdCB0b0Rpc3BsYXlTdHJpbmcgPSAodmFsKSA9PiB7XG4gIHJldHVybiBpc1N0cmluZyh2YWwpID8gdmFsIDogdmFsID09IG51bGwgPyBcIlwiIDogaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkgJiYgKHZhbC50b1N0cmluZyA9PT0gb2JqZWN0VG9TdHJpbmcgfHwgIWlzRnVuY3Rpb24odmFsLnRvU3RyaW5nKSkgPyBpc1JlZih2YWwpID8gdG9EaXNwbGF5U3RyaW5nKHZhbC52YWx1ZSkgOiBKU09OLnN0cmluZ2lmeSh2YWwsIHJlcGxhY2VyLCAyKSA6IFN0cmluZyh2YWwpO1xufTtcbmNvbnN0IHJlcGxhY2VyID0gKF9rZXksIHZhbCkgPT4ge1xuICBpZiAoaXNSZWYodmFsKSkge1xuICAgIHJldHVybiByZXBsYWNlcihfa2V5LCB2YWwudmFsdWUpO1xuICB9IGVsc2UgaWYgKGlzTWFwKHZhbCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW2BNYXAoJHt2YWwuc2l6ZX0pYF06IFsuLi52YWwuZW50cmllcygpXS5yZWR1Y2UoXG4gICAgICAgIChlbnRyaWVzLCBba2V5LCB2YWwyXSwgaSkgPT4ge1xuICAgICAgICAgIGVudHJpZXNbc3RyaW5naWZ5U3ltYm9sKGtleSwgaSkgKyBcIiA9PlwiXSA9IHZhbDI7XG4gICAgICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfSBlbHNlIGlmIChpc1NldCh2YWwpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtgU2V0KCR7dmFsLnNpemV9KWBdOiBbLi4udmFsLnZhbHVlcygpXS5tYXAoKHYpID0+IHN0cmluZ2lmeVN5bWJvbCh2KSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGlzU3ltYm9sKHZhbCkpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5U3ltYm9sKHZhbCk7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSAmJiAhaXNBcnJheSh2YWwpICYmICFpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICByZXR1cm4gU3RyaW5nKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn07XG5jb25zdCBzdHJpbmdpZnlTeW1ib2wgPSAodiwgaSA9IFwiXCIpID0+IHtcbiAgdmFyIF9hO1xuICByZXR1cm4gKFxuICAgIC8vIFN5bWJvbC5kZXNjcmlwdGlvbiBpbiBlczIwMTkrIHNvIHdlIG5lZWQgdG8gY2FzdCBoZXJlIHRvIHBhc3NcbiAgICAvLyB0aGUgbGliOiBlczIwMTYgY2hlY2tcbiAgICBpc1N5bWJvbCh2KSA/IGBTeW1ib2woJHsoX2EgPSB2LmRlc2NyaXB0aW9uKSAhPSBudWxsID8gX2EgOiBpfSlgIDogdlxuICApO1xufTtcblxuZXhwb3J0IHsgRU1QVFlfQVJSLCBFTVBUWV9PQkosIE5PLCBOT09QLCBQYXRjaEZsYWdOYW1lcywgUGF0Y2hGbGFncywgU2hhcGVGbGFncywgU2xvdEZsYWdzLCBjYW1lbGl6ZSwgY2FwaXRhbGl6ZSwgZGVmLCBlc2NhcGVIdG1sLCBlc2NhcGVIdG1sQ29tbWVudCwgZXh0ZW5kLCBnZW5Qcm9wc0FjY2Vzc0V4cCwgZ2VuZXJhdGVDb2RlRnJhbWUsIGdldEdsb2JhbFRoaXMsIGhhc0NoYW5nZWQsIGhhc093biwgaHlwaGVuYXRlLCBpbmNsdWRlQm9vbGVhbkF0dHIsIGludm9rZUFycmF5Rm5zLCBpc0FycmF5LCBpc0Jvb2xlYW5BdHRyLCBpc0J1aWx0SW5EaXJlY3RpdmUsIGlzRGF0ZSwgaXNGdW5jdGlvbiwgaXNHbG9iYWxseUFsbG93ZWQsIGlzR2xvYmFsbHlXaGl0ZWxpc3RlZCwgaXNIVE1MVGFnLCBpc0ludGVnZXJLZXksIGlzS25vd25IdG1sQXR0ciwgaXNLbm93blN2Z0F0dHIsIGlzTWFwLCBpc01hdGhNTFRhZywgaXNNb2RlbExpc3RlbmVyLCBpc09iamVjdCwgaXNPbiwgaXNQbGFpbk9iamVjdCwgaXNQcm9taXNlLCBpc1JlZ0V4cCwgaXNSZW5kZXJhYmxlQXR0clZhbHVlLCBpc1Jlc2VydmVkUHJvcCwgaXNTU1JTYWZlQXR0ck5hbWUsIGlzU1ZHVGFnLCBpc1NldCwgaXNTcGVjaWFsQm9vbGVhbkF0dHIsIGlzU3RyaW5nLCBpc1N5bWJvbCwgaXNWb2lkVGFnLCBsb29zZUVxdWFsLCBsb29zZUluZGV4T2YsIGxvb3NlVG9OdW1iZXIsIG1ha2VNYXAsIG5vcm1hbGl6ZUNsYXNzLCBub3JtYWxpemVQcm9wcywgbm9ybWFsaXplU3R5bGUsIG9iamVjdFRvU3RyaW5nLCBwYXJzZVN0cmluZ1N0eWxlLCBwcm9wc1RvQXR0ck1hcCwgcmVtb3ZlLCBzbG90RmxhZ3NUZXh0LCBzdHJpbmdpZnlTdHlsZSwgdG9EaXNwbGF5U3RyaW5nLCB0b0hhbmRsZXJLZXksIHRvTnVtYmVyLCB0b1Jhd1R5cGUsIHRvVHlwZVN0cmluZyB9O1xuIiwiLyoqXG4qIEB2dWUvcmVhY3Rpdml0eSB2My40LjM4XG4qIChjKSAyMDE4LXByZXNlbnQgWXV4aSAoRXZhbikgWW91IGFuZCBWdWUgY29udHJpYnV0b3JzXG4qIEBsaWNlbnNlIE1JVFxuKiovXG5pbXBvcnQgeyBOT09QLCBleHRlbmQsIGlzQXJyYXksIGlzU3ltYm9sLCBpc01hcCwgaXNJbnRlZ2VyS2V5LCBoYXNPd24sIGhhc0NoYW5nZWQsIGlzT2JqZWN0LCBtYWtlTWFwLCBjYXBpdGFsaXplLCB0b1Jhd1R5cGUsIGRlZiwgaXNGdW5jdGlvbiB9IGZyb20gJ0B2dWUvc2hhcmVkJztcblxuZnVuY3Rpb24gd2Fybihtc2csIC4uLmFyZ3MpIHtcbiAgY29uc29sZS53YXJuKGBbVnVlIHdhcm5dICR7bXNnfWAsIC4uLmFyZ3MpO1xufVxuXG5sZXQgYWN0aXZlRWZmZWN0U2NvcGU7XG5jbGFzcyBFZmZlY3RTY29wZSB7XG4gIGNvbnN0cnVjdG9yKGRldGFjaGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLmRldGFjaGVkID0gZGV0YWNoZWQ7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmVmZmVjdHMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmNsZWFudXBzID0gW107XG4gICAgdGhpcy5wYXJlbnQgPSBhY3RpdmVFZmZlY3RTY29wZTtcbiAgICBpZiAoIWRldGFjaGVkICYmIGFjdGl2ZUVmZmVjdFNjb3BlKSB7XG4gICAgICB0aGlzLmluZGV4ID0gKGFjdGl2ZUVmZmVjdFNjb3BlLnNjb3BlcyB8fCAoYWN0aXZlRWZmZWN0U2NvcGUuc2NvcGVzID0gW10pKS5wdXNoKFxuICAgICAgICB0aGlzXG4gICAgICApIC0gMTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG4gIHJ1bihmbikge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRFZmZlY3RTY29wZSA9IGFjdGl2ZUVmZmVjdFNjb3BlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYWN0aXZlRWZmZWN0U2NvcGUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGFjdGl2ZUVmZmVjdFNjb3BlID0gY3VycmVudEVmZmVjdFNjb3BlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybihgY2Fubm90IHJ1biBhbiBpbmFjdGl2ZSBlZmZlY3Qgc2NvcGUuYCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBub24tZGV0YWNoZWQgc2NvcGVzXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgb24oKSB7XG4gICAgYWN0aXZlRWZmZWN0U2NvcGUgPSB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBub24tZGV0YWNoZWQgc2NvcGVzXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgb2ZmKCkge1xuICAgIGFjdGl2ZUVmZmVjdFNjb3BlID0gdGhpcy5wYXJlbnQ7XG4gIH1cbiAgc3RvcChmcm9tUGFyZW50KSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgbGV0IGksIGw7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5lZmZlY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmVmZmVjdHNbaV0uc3RvcCgpO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuY2xlYW51cHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY2xlYW51cHNbaV0oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjb3Blcykge1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5zY29wZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5zY29wZXNbaV0uc3RvcCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmRldGFjaGVkICYmIHRoaXMucGFyZW50ICYmICFmcm9tUGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLnBhcmVudC5zY29wZXMucG9wKCk7XG4gICAgICAgIGlmIChsYXN0ICYmIGxhc3QgIT09IHRoaXMpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5zY29wZXNbdGhpcy5pbmRleF0gPSBsYXN0O1xuICAgICAgICAgIGxhc3QuaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmVudCA9IHZvaWQgMDtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZWZmZWN0U2NvcGUoZGV0YWNoZWQpIHtcbiAgcmV0dXJuIG5ldyBFZmZlY3RTY29wZShkZXRhY2hlZCk7XG59XG5mdW5jdGlvbiByZWNvcmRFZmZlY3RTY29wZShlZmZlY3QsIHNjb3BlID0gYWN0aXZlRWZmZWN0U2NvcGUpIHtcbiAgaWYgKHNjb3BlICYmIHNjb3BlLmFjdGl2ZSkge1xuICAgIHNjb3BlLmVmZmVjdHMucHVzaChlZmZlY3QpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRDdXJyZW50U2NvcGUoKSB7XG4gIHJldHVybiBhY3RpdmVFZmZlY3RTY29wZTtcbn1cbmZ1bmN0aW9uIG9uU2NvcGVEaXNwb3NlKGZuKSB7XG4gIGlmIChhY3RpdmVFZmZlY3RTY29wZSkge1xuICAgIGFjdGl2ZUVmZmVjdFNjb3BlLmNsZWFudXBzLnB1c2goZm4pO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuKFxuICAgICAgYG9uU2NvcGVEaXNwb3NlKCkgaXMgY2FsbGVkIHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGVmZmVjdCBzY29wZSB0byBiZSBhc3NvY2lhdGVkIHdpdGguYFxuICAgICk7XG4gIH1cbn1cblxubGV0IGFjdGl2ZUVmZmVjdDtcbmNsYXNzIFJlYWN0aXZlRWZmZWN0IHtcbiAgY29uc3RydWN0b3IoZm4sIHRyaWdnZXIsIHNjaGVkdWxlciwgc2NvcGUpIHtcbiAgICB0aGlzLmZuID0gZm47XG4gICAgdGhpcy50cmlnZ2VyID0gdHJpZ2dlcjtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5kZXBzID0gW107XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fZGlydHlMZXZlbCA9IDQ7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fdHJhY2tJZCA9IDA7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fcnVubmluZ3MgPSAwO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHRoaXMuX3Nob3VsZFNjaGVkdWxlID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fZGVwc0xlbmd0aCA9IDA7XG4gICAgcmVjb3JkRWZmZWN0U2NvcGUodGhpcywgc2NvcGUpO1xuICB9XG4gIGdldCBkaXJ0eSgpIHtcbiAgICBpZiAodGhpcy5fZGlydHlMZXZlbCA9PT0gMiB8fCB0aGlzLl9kaXJ0eUxldmVsID09PSAzKSB7XG4gICAgICB0aGlzLl9kaXJ0eUxldmVsID0gMTtcbiAgICAgIHBhdXNlVHJhY2tpbmcoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGVwc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlcCA9IHRoaXMuZGVwc1tpXTtcbiAgICAgICAgaWYgKGRlcC5jb21wdXRlZCkge1xuICAgICAgICAgIHRyaWdnZXJDb21wdXRlZChkZXAuY29tcHV0ZWQpO1xuICAgICAgICAgIGlmICh0aGlzLl9kaXJ0eUxldmVsID49IDQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2RpcnR5TGV2ZWwgPT09IDEpIHtcbiAgICAgICAgdGhpcy5fZGlydHlMZXZlbCA9IDA7XG4gICAgICB9XG4gICAgICByZXNldFRyYWNraW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kaXJ0eUxldmVsID49IDQ7XG4gIH1cbiAgc2V0IGRpcnR5KHYpIHtcbiAgICB0aGlzLl9kaXJ0eUxldmVsID0gdiA/IDQgOiAwO1xuICB9XG4gIHJ1bigpIHtcbiAgICB0aGlzLl9kaXJ0eUxldmVsID0gMDtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5mbigpO1xuICAgIH1cbiAgICBsZXQgbGFzdFNob3VsZFRyYWNrID0gc2hvdWxkVHJhY2s7XG4gICAgbGV0IGxhc3RFZmZlY3QgPSBhY3RpdmVFZmZlY3Q7XG4gICAgdHJ5IHtcbiAgICAgIHNob3VsZFRyYWNrID0gdHJ1ZTtcbiAgICAgIGFjdGl2ZUVmZmVjdCA9IHRoaXM7XG4gICAgICB0aGlzLl9ydW5uaW5ncysrO1xuICAgICAgcHJlQ2xlYW51cEVmZmVjdCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLmZuKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHBvc3RDbGVhbnVwRWZmZWN0KHRoaXMpO1xuICAgICAgdGhpcy5fcnVubmluZ3MtLTtcbiAgICAgIGFjdGl2ZUVmZmVjdCA9IGxhc3RFZmZlY3Q7XG4gICAgICBzaG91bGRUcmFjayA9IGxhc3RTaG91bGRUcmFjaztcbiAgICB9XG4gIH1cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHByZUNsZWFudXBFZmZlY3QodGhpcyk7XG4gICAgICBwb3N0Q2xlYW51cEVmZmVjdCh0aGlzKTtcbiAgICAgIHRoaXMub25TdG9wICYmIHRoaXMub25TdG9wKCk7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdHJpZ2dlckNvbXB1dGVkKGNvbXB1dGVkKSB7XG4gIHJldHVybiBjb21wdXRlZC52YWx1ZTtcbn1cbmZ1bmN0aW9uIHByZUNsZWFudXBFZmZlY3QoZWZmZWN0Mikge1xuICBlZmZlY3QyLl90cmFja0lkKys7XG4gIGVmZmVjdDIuX2RlcHNMZW5ndGggPSAwO1xufVxuZnVuY3Rpb24gcG9zdENsZWFudXBFZmZlY3QoZWZmZWN0Mikge1xuICBpZiAoZWZmZWN0Mi5kZXBzLmxlbmd0aCA+IGVmZmVjdDIuX2RlcHNMZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gZWZmZWN0Mi5fZGVwc0xlbmd0aDsgaSA8IGVmZmVjdDIuZGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgY2xlYW51cERlcEVmZmVjdChlZmZlY3QyLmRlcHNbaV0sIGVmZmVjdDIpO1xuICAgIH1cbiAgICBlZmZlY3QyLmRlcHMubGVuZ3RoID0gZWZmZWN0Mi5fZGVwc0xlbmd0aDtcbiAgfVxufVxuZnVuY3Rpb24gY2xlYW51cERlcEVmZmVjdChkZXAsIGVmZmVjdDIpIHtcbiAgY29uc3QgdHJhY2tJZCA9IGRlcC5nZXQoZWZmZWN0Mik7XG4gIGlmICh0cmFja0lkICE9PSB2b2lkIDAgJiYgZWZmZWN0Mi5fdHJhY2tJZCAhPT0gdHJhY2tJZCkge1xuICAgIGRlcC5kZWxldGUoZWZmZWN0Mik7XG4gICAgaWYgKGRlcC5zaXplID09PSAwKSB7XG4gICAgICBkZXAuY2xlYW51cCgpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZWZmZWN0KGZuLCBvcHRpb25zKSB7XG4gIGlmIChmbi5lZmZlY3QgaW5zdGFuY2VvZiBSZWFjdGl2ZUVmZmVjdCkge1xuICAgIGZuID0gZm4uZWZmZWN0LmZuO1xuICB9XG4gIGNvbnN0IF9lZmZlY3QgPSBuZXcgUmVhY3RpdmVFZmZlY3QoZm4sIE5PT1AsICgpID0+IHtcbiAgICBpZiAoX2VmZmVjdC5kaXJ0eSkge1xuICAgICAgX2VmZmVjdC5ydW4oKTtcbiAgICB9XG4gIH0pO1xuICBpZiAob3B0aW9ucykge1xuICAgIGV4dGVuZChfZWZmZWN0LCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5zY29wZSkgcmVjb3JkRWZmZWN0U2NvcGUoX2VmZmVjdCwgb3B0aW9ucy5zY29wZSk7XG4gIH1cbiAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmxhenkpIHtcbiAgICBfZWZmZWN0LnJ1bigpO1xuICB9XG4gIGNvbnN0IHJ1bm5lciA9IF9lZmZlY3QucnVuLmJpbmQoX2VmZmVjdCk7XG4gIHJ1bm5lci5lZmZlY3QgPSBfZWZmZWN0O1xuICByZXR1cm4gcnVubmVyO1xufVxuZnVuY3Rpb24gc3RvcChydW5uZXIpIHtcbiAgcnVubmVyLmVmZmVjdC5zdG9wKCk7XG59XG5sZXQgc2hvdWxkVHJhY2sgPSB0cnVlO1xubGV0IHBhdXNlU2NoZWR1bGVTdGFjayA9IDA7XG5jb25zdCB0cmFja1N0YWNrID0gW107XG5mdW5jdGlvbiBwYXVzZVRyYWNraW5nKCkge1xuICB0cmFja1N0YWNrLnB1c2goc2hvdWxkVHJhY2spO1xuICBzaG91bGRUcmFjayA9IGZhbHNlO1xufVxuZnVuY3Rpb24gZW5hYmxlVHJhY2tpbmcoKSB7XG4gIHRyYWNrU3RhY2sucHVzaChzaG91bGRUcmFjayk7XG4gIHNob3VsZFRyYWNrID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHJlc2V0VHJhY2tpbmcoKSB7XG4gIGNvbnN0IGxhc3QgPSB0cmFja1N0YWNrLnBvcCgpO1xuICBzaG91bGRUcmFjayA9IGxhc3QgPT09IHZvaWQgMCA/IHRydWUgOiBsYXN0O1xufVxuZnVuY3Rpb24gcGF1c2VTY2hlZHVsaW5nKCkge1xuICBwYXVzZVNjaGVkdWxlU3RhY2srKztcbn1cbmZ1bmN0aW9uIHJlc2V0U2NoZWR1bGluZygpIHtcbiAgcGF1c2VTY2hlZHVsZVN0YWNrLS07XG4gIHdoaWxlICghcGF1c2VTY2hlZHVsZVN0YWNrICYmIHF1ZXVlRWZmZWN0U2NoZWR1bGVycy5sZW5ndGgpIHtcbiAgICBxdWV1ZUVmZmVjdFNjaGVkdWxlcnMuc2hpZnQoKSgpO1xuICB9XG59XG5mdW5jdGlvbiB0cmFja0VmZmVjdChlZmZlY3QyLCBkZXAsIGRlYnVnZ2VyRXZlbnRFeHRyYUluZm8pIHtcbiAgdmFyIF9hO1xuICBpZiAoZGVwLmdldChlZmZlY3QyKSAhPT0gZWZmZWN0Mi5fdHJhY2tJZCkge1xuICAgIGRlcC5zZXQoZWZmZWN0MiwgZWZmZWN0Mi5fdHJhY2tJZCk7XG4gICAgY29uc3Qgb2xkRGVwID0gZWZmZWN0Mi5kZXBzW2VmZmVjdDIuX2RlcHNMZW5ndGhdO1xuICAgIGlmIChvbGREZXAgIT09IGRlcCkge1xuICAgICAgaWYgKG9sZERlcCkge1xuICAgICAgICBjbGVhbnVwRGVwRWZmZWN0KG9sZERlcCwgZWZmZWN0Mik7XG4gICAgICB9XG4gICAgICBlZmZlY3QyLmRlcHNbZWZmZWN0Mi5fZGVwc0xlbmd0aCsrXSA9IGRlcDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWZmZWN0Mi5fZGVwc0xlbmd0aCsrO1xuICAgIH1cbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgKF9hID0gZWZmZWN0Mi5vblRyYWNrKSA9PSBudWxsID8gdm9pZCAwIDogX2EuY2FsbChlZmZlY3QyLCBleHRlbmQoeyBlZmZlY3Q6IGVmZmVjdDIgfSwgZGVidWdnZXJFdmVudEV4dHJhSW5mbykpO1xuICAgIH1cbiAgfVxufVxuY29uc3QgcXVldWVFZmZlY3RTY2hlZHVsZXJzID0gW107XG5mdW5jdGlvbiB0cmlnZ2VyRWZmZWN0cyhkZXAsIGRpcnR5TGV2ZWwsIGRlYnVnZ2VyRXZlbnRFeHRyYUluZm8pIHtcbiAgdmFyIF9hO1xuICBwYXVzZVNjaGVkdWxpbmcoKTtcbiAgZm9yIChjb25zdCBlZmZlY3QyIG9mIGRlcC5rZXlzKCkpIHtcbiAgICBsZXQgdHJhY2tpbmc7XG4gICAgaWYgKGVmZmVjdDIuX2RpcnR5TGV2ZWwgPCBkaXJ0eUxldmVsICYmICh0cmFja2luZyAhPSBudWxsID8gdHJhY2tpbmcgOiB0cmFja2luZyA9IGRlcC5nZXQoZWZmZWN0MikgPT09IGVmZmVjdDIuX3RyYWNrSWQpKSB7XG4gICAgICBlZmZlY3QyLl9zaG91bGRTY2hlZHVsZSB8fCAoZWZmZWN0Mi5fc2hvdWxkU2NoZWR1bGUgPSBlZmZlY3QyLl9kaXJ0eUxldmVsID09PSAwKTtcbiAgICAgIGVmZmVjdDIuX2RpcnR5TGV2ZWwgPSBkaXJ0eUxldmVsO1xuICAgIH1cbiAgICBpZiAoZWZmZWN0Mi5fc2hvdWxkU2NoZWR1bGUgJiYgKHRyYWNraW5nICE9IG51bGwgPyB0cmFja2luZyA6IHRyYWNraW5nID0gZGVwLmdldChlZmZlY3QyKSA9PT0gZWZmZWN0Mi5fdHJhY2tJZCkpIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIChfYSA9IGVmZmVjdDIub25UcmlnZ2VyKSA9PSBudWxsID8gdm9pZCAwIDogX2EuY2FsbChlZmZlY3QyLCBleHRlbmQoeyBlZmZlY3Q6IGVmZmVjdDIgfSwgZGVidWdnZXJFdmVudEV4dHJhSW5mbykpO1xuICAgICAgfVxuICAgICAgZWZmZWN0Mi50cmlnZ2VyKCk7XG4gICAgICBpZiAoKCFlZmZlY3QyLl9ydW5uaW5ncyB8fCBlZmZlY3QyLmFsbG93UmVjdXJzZSkgJiYgZWZmZWN0Mi5fZGlydHlMZXZlbCAhPT0gMikge1xuICAgICAgICBlZmZlY3QyLl9zaG91bGRTY2hlZHVsZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZWZmZWN0Mi5zY2hlZHVsZXIpIHtcbiAgICAgICAgICBxdWV1ZUVmZmVjdFNjaGVkdWxlcnMucHVzaChlZmZlY3QyLnNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVzZXRTY2hlZHVsaW5nKCk7XG59XG5cbmNvbnN0IGNyZWF0ZURlcCA9IChjbGVhbnVwLCBjb21wdXRlZCkgPT4ge1xuICBjb25zdCBkZXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBkZXAuY2xlYW51cCA9IGNsZWFudXA7XG4gIGRlcC5jb21wdXRlZCA9IGNvbXB1dGVkO1xuICByZXR1cm4gZGVwO1xufTtcblxuY29uc3QgdGFyZ2V0TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBJVEVSQVRFX0tFWSA9IFN5bWJvbCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gXCJpdGVyYXRlXCIgOiBcIlwiKTtcbmNvbnN0IE1BUF9LRVlfSVRFUkFURV9LRVkgPSBTeW1ib2woISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IFwiTWFwIGtleSBpdGVyYXRlXCIgOiBcIlwiKTtcbmZ1bmN0aW9uIHRyYWNrKHRhcmdldCwgdHlwZSwga2V5KSB7XG4gIGlmIChzaG91bGRUcmFjayAmJiBhY3RpdmVFZmZlY3QpIHtcbiAgICBsZXQgZGVwc01hcCA9IHRhcmdldE1hcC5nZXQodGFyZ2V0KTtcbiAgICBpZiAoIWRlcHNNYXApIHtcbiAgICAgIHRhcmdldE1hcC5zZXQodGFyZ2V0LCBkZXBzTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSk7XG4gICAgfVxuICAgIGxldCBkZXAgPSBkZXBzTWFwLmdldChrZXkpO1xuICAgIGlmICghZGVwKSB7XG4gICAgICBkZXBzTWFwLnNldChrZXksIGRlcCA9IGNyZWF0ZURlcCgoKSA9PiBkZXBzTWFwLmRlbGV0ZShrZXkpKSk7XG4gICAgfVxuICAgIHRyYWNrRWZmZWN0KFxuICAgICAgYWN0aXZlRWZmZWN0LFxuICAgICAgZGVwLFxuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHtcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICB0eXBlLFxuICAgICAgICBrZXlcbiAgICAgIH0gOiB2b2lkIDBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiB0cmlnZ2VyKHRhcmdldCwgdHlwZSwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUsIG9sZFRhcmdldCkge1xuICBjb25zdCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoIWRlcHNNYXApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGRlcHMgPSBbXTtcbiAgaWYgKHR5cGUgPT09IFwiY2xlYXJcIikge1xuICAgIGRlcHMgPSBbLi4uZGVwc01hcC52YWx1ZXMoKV07XG4gIH0gZWxzZSBpZiAoa2V5ID09PSBcImxlbmd0aFwiICYmIGlzQXJyYXkodGFyZ2V0KSkge1xuICAgIGNvbnN0IG5ld0xlbmd0aCA9IE51bWJlcihuZXdWYWx1ZSk7XG4gICAgZGVwc01hcC5mb3JFYWNoKChkZXAsIGtleTIpID0+IHtcbiAgICAgIGlmIChrZXkyID09PSBcImxlbmd0aFwiIHx8ICFpc1N5bWJvbChrZXkyKSAmJiBrZXkyID49IG5ld0xlbmd0aCkge1xuICAgICAgICBkZXBzLnB1c2goZGVwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5ICE9PSB2b2lkIDApIHtcbiAgICAgIGRlcHMucHVzaChkZXBzTWFwLmdldChrZXkpKTtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiYWRkXCI6XG4gICAgICAgIGlmICghaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgZGVwcy5wdXNoKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgIGRlcHMucHVzaChkZXBzTWFwLmdldChNQVBfS0VZX0lURVJBVEVfS0VZKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzSW50ZWdlcktleShrZXkpKSB7XG4gICAgICAgICAgZGVwcy5wdXNoKGRlcHNNYXAuZ2V0KFwibGVuZ3RoXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICBkZXBzLnB1c2goZGVwc01hcC5nZXQoSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICBpZiAoaXNNYXAodGFyZ2V0KSkge1xuICAgICAgICAgICAgZGVwcy5wdXNoKGRlcHNNYXAuZ2V0KE1BUF9LRVlfSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2V0XCI6XG4gICAgICAgIGlmIChpc01hcCh0YXJnZXQpKSB7XG4gICAgICAgICAgZGVwcy5wdXNoKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHBhdXNlU2NoZWR1bGluZygpO1xuICBmb3IgKGNvbnN0IGRlcCBvZiBkZXBzKSB7XG4gICAgaWYgKGRlcCkge1xuICAgICAgdHJpZ2dlckVmZmVjdHMoXG4gICAgICAgIGRlcCxcbiAgICAgICAgNCxcbiAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHtcbiAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgICAgb2xkVGFyZ2V0XG4gICAgICAgIH0gOiB2b2lkIDBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJlc2V0U2NoZWR1bGluZygpO1xufVxuZnVuY3Rpb24gZ2V0RGVwRnJvbVJlYWN0aXZlKG9iamVjdCwga2V5KSB7XG4gIGNvbnN0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KG9iamVjdCk7XG4gIHJldHVybiBkZXBzTWFwICYmIGRlcHNNYXAuZ2V0KGtleSk7XG59XG5cbmNvbnN0IGlzTm9uVHJhY2thYmxlS2V5cyA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKGBfX3Byb3RvX18sX192X2lzUmVmLF9faXNWdWVgKTtcbmNvbnN0IGJ1aWx0SW5TeW1ib2xzID0gbmV3IFNldChcbiAgLyogQF9fUFVSRV9fICovIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gXCJhcmd1bWVudHNcIiAmJiBrZXkgIT09IFwiY2FsbGVyXCIpLm1hcCgoa2V5KSA9PiBTeW1ib2xba2V5XSkuZmlsdGVyKGlzU3ltYm9sKVxuKTtcbmNvbnN0IGFycmF5SW5zdHJ1bWVudGF0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVBcnJheUluc3RydW1lbnRhdGlvbnMoKTtcbmZ1bmN0aW9uIGNyZWF0ZUFycmF5SW5zdHJ1bWVudGF0aW9ucygpIHtcbiAgY29uc3QgaW5zdHJ1bWVudGF0aW9ucyA9IHt9O1xuICBbXCJpbmNsdWRlc1wiLCBcImluZGV4T2ZcIiwgXCJsYXN0SW5kZXhPZlwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpbnN0cnVtZW50YXRpb25zW2tleV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICBjb25zdCBhcnIgPSB0b1Jhdyh0aGlzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdHJhY2soYXJyLCBcImdldFwiLCBpICsgXCJcIik7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMgPSBhcnJba2V5XSguLi5hcmdzKTtcbiAgICAgIGlmIChyZXMgPT09IC0xIHx8IHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGFycltrZXldKC4uLmFyZ3MubWFwKHRvUmF3KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBbXCJwdXNoXCIsIFwicG9wXCIsIFwic2hpZnRcIiwgXCJ1bnNoaWZ0XCIsIFwic3BsaWNlXCJdLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGluc3RydW1lbnRhdGlvbnNba2V5XSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIHBhdXNlVHJhY2tpbmcoKTtcbiAgICAgIHBhdXNlU2NoZWR1bGluZygpO1xuICAgICAgY29uc3QgcmVzID0gdG9SYXcodGhpcylba2V5XS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJlc2V0U2NoZWR1bGluZygpO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIGluc3RydW1lbnRhdGlvbnM7XG59XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShrZXkpIHtcbiAgaWYgKCFpc1N5bWJvbChrZXkpKSBrZXkgPSBTdHJpbmcoa2V5KTtcbiAgY29uc3Qgb2JqID0gdG9SYXcodGhpcyk7XG4gIHRyYWNrKG9iaiwgXCJoYXNcIiwga2V5KTtcbiAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xufVxuY2xhc3MgQmFzZVJlYWN0aXZlSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKF9pc1JlYWRvbmx5ID0gZmFsc2UsIF9pc1NoYWxsb3cgPSBmYWxzZSkge1xuICAgIHRoaXMuX2lzUmVhZG9ubHkgPSBfaXNSZWFkb25seTtcbiAgICB0aGlzLl9pc1NoYWxsb3cgPSBfaXNTaGFsbG93O1xuICB9XG4gIGdldCh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpIHtcbiAgICBjb25zdCBpc1JlYWRvbmx5MiA9IHRoaXMuX2lzUmVhZG9ubHksIGlzU2hhbGxvdzIgPSB0aGlzLl9pc1NoYWxsb3c7XG4gICAgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFjdGl2ZVwiKSB7XG4gICAgICByZXR1cm4gIWlzUmVhZG9ubHkyO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5MjtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfaXNTaGFsbG93XCIpIHtcbiAgICAgIHJldHVybiBpc1NoYWxsb3cyO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9yYXdcIikge1xuICAgICAgaWYgKHJlY2VpdmVyID09PSAoaXNSZWFkb25seTIgPyBpc1NoYWxsb3cyID8gc2hhbGxvd1JlYWRvbmx5TWFwIDogcmVhZG9ubHlNYXAgOiBpc1NoYWxsb3cyID8gc2hhbGxvd1JlYWN0aXZlTWFwIDogcmVhY3RpdmVNYXApLmdldCh0YXJnZXQpIHx8IC8vIHJlY2VpdmVyIGlzIG5vdCB0aGUgcmVhY3RpdmUgcHJveHksIGJ1dCBoYXMgdGhlIHNhbWUgcHJvdG90eXBlXG4gICAgICAvLyB0aGlzIG1lYW5zIHRoZSByZWNlaXZlciBpcyBhIHVzZXIgcHJveHkgb2YgdGhlIHJlYWN0aXZlIHByb3h5XG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHJlY2VpdmVyKSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRJc0FycmF5ID0gaXNBcnJheSh0YXJnZXQpO1xuICAgIGlmICghaXNSZWFkb25seTIpIHtcbiAgICAgIGlmICh0YXJnZXRJc0FycmF5ICYmIGhhc093bihhcnJheUluc3RydW1lbnRhdGlvbnMsIGtleSkpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGFycmF5SW5zdHJ1bWVudGF0aW9ucywga2V5LCByZWNlaXZlcik7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSBcImhhc093blByb3BlcnR5XCIpIHtcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5O1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXMgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpO1xuICAgIGlmIChpc1N5bWJvbChrZXkpID8gYnVpbHRJblN5bWJvbHMuaGFzKGtleSkgOiBpc05vblRyYWNrYWJsZUtleXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKCFpc1JlYWRvbmx5Mikge1xuICAgICAgdHJhY2sodGFyZ2V0LCBcImdldFwiLCBrZXkpO1xuICAgIH1cbiAgICBpZiAoaXNTaGFsbG93Mikge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKGlzUmVmKHJlcykpIHtcbiAgICAgIHJldHVybiB0YXJnZXRJc0FycmF5ICYmIGlzSW50ZWdlcktleShrZXkpID8gcmVzIDogcmVzLnZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgcmV0dXJuIGlzUmVhZG9ubHkyID8gcmVhZG9ubHkocmVzKSA6IHJlYWN0aXZlKHJlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbmNsYXNzIE11dGFibGVSZWFjdGl2ZUhhbmRsZXIgZXh0ZW5kcyBCYXNlUmVhY3RpdmVIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoaXNTaGFsbG93MiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoZmFsc2UsIGlzU2hhbGxvdzIpO1xuICB9XG4gIHNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgbGV0IG9sZFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgaWYgKCF0aGlzLl9pc1NoYWxsb3cpIHtcbiAgICAgIGNvbnN0IGlzT2xkVmFsdWVSZWFkb25seSA9IGlzUmVhZG9ubHkob2xkVmFsdWUpO1xuICAgICAgaWYgKCFpc1NoYWxsb3codmFsdWUpICYmICFpc1JlYWRvbmx5KHZhbHVlKSkge1xuICAgICAgICBvbGRWYWx1ZSA9IHRvUmF3KG9sZFZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIWlzQXJyYXkodGFyZ2V0KSAmJiBpc1JlZihvbGRWYWx1ZSkgJiYgIWlzUmVmKHZhbHVlKSkge1xuICAgICAgICBpZiAoaXNPbGRWYWx1ZVJlYWRvbmx5KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9sZFZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgaGFkS2V5ID0gaXNBcnJheSh0YXJnZXQpICYmIGlzSW50ZWdlcktleShrZXkpID8gTnVtYmVyKGtleSkgPCB0YXJnZXQubGVuZ3RoIDogaGFzT3duKHRhcmdldCwga2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICBpZiAodGFyZ2V0ID09PSB0b1JhdyhyZWNlaXZlcikpIHtcbiAgICAgIGlmICghaGFkS2V5KSB7XG4gICAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCBrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgIHRyaWdnZXIodGFyZ2V0LCBcInNldFwiLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICBjb25zdCBoYWRLZXkgPSBoYXNPd24odGFyZ2V0LCBrZXkpO1xuICAgIGNvbnN0IG9sZFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgaWYgKHJlc3VsdCAmJiBoYWRLZXkpIHtcbiAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGhhcyh0YXJnZXQsIGtleSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3QuaGFzKHRhcmdldCwga2V5KTtcbiAgICBpZiAoIWlzU3ltYm9sKGtleSkgfHwgIWJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpKSB7XG4gICAgICB0cmFjayh0YXJnZXQsIFwiaGFzXCIsIGtleSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgb3duS2V5cyh0YXJnZXQpIHtcbiAgICB0cmFjayhcbiAgICAgIHRhcmdldCxcbiAgICAgIFwiaXRlcmF0ZVwiLFxuICAgICAgaXNBcnJheSh0YXJnZXQpID8gXCJsZW5ndGhcIiA6IElURVJBVEVfS0VZXG4gICAgKTtcbiAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG4gIH1cbn1cbmNsYXNzIFJlYWRvbmx5UmVhY3RpdmVIYW5kbGVyIGV4dGVuZHMgQmFzZVJlYWN0aXZlSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKGlzU2hhbGxvdzIgPSBmYWxzZSkge1xuICAgIHN1cGVyKHRydWUsIGlzU2hhbGxvdzIpO1xuICB9XG4gIHNldCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgU2V0IG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsXG4gICAgICAgIHRhcmdldFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybihcbiAgICAgICAgYERlbGV0ZSBvcGVyYXRpb24gb24ga2V5IFwiJHtTdHJpbmcoa2V5KX1cIiBmYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLFxuICAgICAgICB0YXJnZXRcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5jb25zdCBtdXRhYmxlSGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE11dGFibGVSZWFjdGl2ZUhhbmRsZXIoKTtcbmNvbnN0IHJlYWRvbmx5SGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFJlYWRvbmx5UmVhY3RpdmVIYW5kbGVyKCk7XG5jb25zdCBzaGFsbG93UmVhY3RpdmVIYW5kbGVycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTXV0YWJsZVJlYWN0aXZlSGFuZGxlcihcbiAgdHJ1ZVxuKTtcbmNvbnN0IHNoYWxsb3dSZWFkb25seUhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBSZWFkb25seVJlYWN0aXZlSGFuZGxlcih0cnVlKTtcblxuY29uc3QgdG9TaGFsbG93ID0gKHZhbHVlKSA9PiB2YWx1ZTtcbmNvbnN0IGdldFByb3RvID0gKHYpID0+IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2Yodik7XG5mdW5jdGlvbiBnZXQodGFyZ2V0LCBrZXksIGlzUmVhZG9ubHkyID0gZmFsc2UsIGlzU2hhbGxvdzIgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXCJfX3ZfcmF3XCJdO1xuICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICBjb25zdCByYXdLZXkgPSB0b1JhdyhrZXkpO1xuICBpZiAoIWlzUmVhZG9ubHkyKSB7XG4gICAgaWYgKGhhc0NoYW5nZWQoa2V5LCByYXdLZXkpKSB7XG4gICAgICB0cmFjayhyYXdUYXJnZXQsIFwiZ2V0XCIsIGtleSk7XG4gICAgfVxuICAgIHRyYWNrKHJhd1RhcmdldCwgXCJnZXRcIiwgcmF3S2V5KTtcbiAgfVxuICBjb25zdCB7IGhhczogaGFzMiB9ID0gZ2V0UHJvdG8ocmF3VGFyZ2V0KTtcbiAgY29uc3Qgd3JhcCA9IGlzU2hhbGxvdzIgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5MiA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICBpZiAoaGFzMi5jYWxsKHJhd1RhcmdldCwga2V5KSkge1xuICAgIHJldHVybiB3cmFwKHRhcmdldC5nZXQoa2V5KSk7XG4gIH0gZWxzZSBpZiAoaGFzMi5jYWxsKHJhd1RhcmdldCwgcmF3S2V5KSkge1xuICAgIHJldHVybiB3cmFwKHRhcmdldC5nZXQocmF3S2V5KSk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0ICE9PSByYXdUYXJnZXQpIHtcbiAgICB0YXJnZXQuZ2V0KGtleSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhcyhrZXksIGlzUmVhZG9ubHkyID0gZmFsc2UpIHtcbiAgY29uc3QgdGFyZ2V0ID0gdGhpc1tcIl9fdl9yYXdcIl07XG4gIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3KHRhcmdldCk7XG4gIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gIGlmICghaXNSZWFkb25seTIpIHtcbiAgICBpZiAoaGFzQ2hhbmdlZChrZXksIHJhd0tleSkpIHtcbiAgICAgIHRyYWNrKHJhd1RhcmdldCwgXCJoYXNcIiwga2V5KTtcbiAgICB9XG4gICAgdHJhY2socmF3VGFyZ2V0LCBcImhhc1wiLCByYXdLZXkpO1xuICB9XG4gIHJldHVybiBrZXkgPT09IHJhd0tleSA/IHRhcmdldC5oYXMoa2V5KSA6IHRhcmdldC5oYXMoa2V5KSB8fCB0YXJnZXQuaGFzKHJhd0tleSk7XG59XG5mdW5jdGlvbiBzaXplKHRhcmdldCwgaXNSZWFkb25seTIgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXCJfX3ZfcmF3XCJdO1xuICAhaXNSZWFkb25seTIgJiYgdHJhY2sodG9SYXcodGFyZ2V0KSwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgXCJzaXplXCIsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBhZGQodmFsdWUsIF9pc1NoYWxsb3cgPSBmYWxzZSkge1xuICBpZiAoIV9pc1NoYWxsb3cgJiYgIWlzU2hhbGxvdyh2YWx1ZSkgJiYgIWlzUmVhZG9ubHkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gIH1cbiAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gIGNvbnN0IHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgY29uc3QgaGFkS2V5ID0gcHJvdG8uaGFzLmNhbGwodGFyZ2V0LCB2YWx1ZSk7XG4gIGlmICghaGFkS2V5KSB7XG4gICAgdGFyZ2V0LmFkZCh2YWx1ZSk7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIHZhbHVlLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgX2lzU2hhbGxvdyA9IGZhbHNlKSB7XG4gIGlmICghX2lzU2hhbGxvdyAmJiAhaXNTaGFsbG93KHZhbHVlKSAmJiAhaXNSZWFkb25seSh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgfVxuICBjb25zdCB0YXJnZXQgPSB0b1Jhdyh0aGlzKTtcbiAgY29uc3QgeyBoYXM6IGhhczIsIGdldDogZ2V0MiB9ID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgbGV0IGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIGlmICghaGFkS2V5KSB7XG4gICAga2V5ID0gdG9SYXcoa2V5KTtcbiAgICBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSk7XG4gIH1cbiAgY29uc3Qgb2xkVmFsdWUgPSBnZXQyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICB0YXJnZXQuc2V0KGtleSwgdmFsdWUpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCBrZXksIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJzZXRcIiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gZGVsZXRlRW50cnkoa2V5KSB7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCB7IGhhczogaGFzMiwgZ2V0OiBnZXQyIH0gPSBnZXRQcm90byh0YXJnZXQpO1xuICBsZXQgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgaWYgKCFoYWRLZXkpIHtcbiAgICBrZXkgPSB0b1JhdyhrZXkpO1xuICAgIGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KTtcbiAgfVxuICBjb25zdCBvbGRWYWx1ZSA9IGdldDIgPyBnZXQyLmNhbGwodGFyZ2V0LCBrZXkpIDogdm9pZCAwO1xuICBjb25zdCByZXN1bHQgPSB0YXJnZXQuZGVsZXRlKGtleSk7XG4gIGlmIChoYWRLZXkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIG9sZFZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCBoYWRJdGVtcyA9IHRhcmdldC5zaXplICE9PSAwO1xuICBjb25zdCBvbGRUYXJnZXQgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gaXNNYXAodGFyZ2V0KSA/IG5ldyBNYXAodGFyZ2V0KSA6IG5ldyBTZXQodGFyZ2V0KSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmNsZWFyKCk7XG4gIGlmIChoYWRJdGVtcykge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImNsZWFyXCIsIHZvaWQgMCwgdm9pZCAwLCBvbGRUYXJnZXQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjcmVhdGVGb3JFYWNoKGlzUmVhZG9ubHkyLCBpc1NoYWxsb3cyKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgY29uc3Qgb2JzZXJ2ZWQgPSB0aGlzO1xuICAgIGNvbnN0IHRhcmdldCA9IG9ic2VydmVkW1wiX192X3Jhd1wiXTtcbiAgICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICAgIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cyID8gdG9TaGFsbG93IDogaXNSZWFkb25seTIgPyB0b1JlYWRvbmx5IDogdG9SZWFjdGl2ZTtcbiAgICAhaXNSZWFkb25seTIgJiYgdHJhY2socmF3VGFyZ2V0LCBcIml0ZXJhdGVcIiwgSVRFUkFURV9LRVkpO1xuICAgIHJldHVybiB0YXJnZXQuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgd3JhcCh2YWx1ZSksIHdyYXAoa2V5KSwgb2JzZXJ2ZWQpO1xuICAgIH0pO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBpc1JlYWRvbmx5MiwgaXNTaGFsbG93Mikge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3KHRhcmdldCk7XG4gICAgY29uc3QgdGFyZ2V0SXNNYXAgPSBpc01hcChyYXdUYXJnZXQpO1xuICAgIGNvbnN0IGlzUGFpciA9IG1ldGhvZCA9PT0gXCJlbnRyaWVzXCIgfHwgbWV0aG9kID09PSBTeW1ib2wuaXRlcmF0b3IgJiYgdGFyZ2V0SXNNYXA7XG4gICAgY29uc3QgaXNLZXlPbmx5ID0gbWV0aG9kID09PSBcImtleXNcIiAmJiB0YXJnZXRJc01hcDtcbiAgICBjb25zdCBpbm5lckl0ZXJhdG9yID0gdGFyZ2V0W21ldGhvZF0oLi4uYXJncyk7XG4gICAgY29uc3Qgd3JhcCA9IGlzU2hhbGxvdzIgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5MiA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5MiAmJiB0cmFjayhcbiAgICAgIHJhd1RhcmdldCxcbiAgICAgIFwiaXRlcmF0ZVwiLFxuICAgICAgaXNLZXlPbmx5ID8gTUFQX0tFWV9JVEVSQVRFX0tFWSA6IElURVJBVEVfS0VZXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gaXRlcmF0b3IgcHJvdG9jb2xcbiAgICAgIG5leHQoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGlubmVySXRlcmF0b3IubmV4dCgpO1xuICAgICAgICByZXR1cm4gZG9uZSA/IHsgdmFsdWUsIGRvbmUgfSA6IHtcbiAgICAgICAgICB2YWx1ZTogaXNQYWlyID8gW3dyYXAodmFsdWVbMF0pLCB3cmFwKHZhbHVlWzFdKV0gOiB3cmFwKHZhbHVlKSxcbiAgICAgICAgICBkb25lXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgLy8gaXRlcmFibGUgcHJvdG9jb2xcbiAgICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlUmVhZG9ubHlNZXRob2QodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSBhcmdzWzBdID8gYG9uIGtleSBcIiR7YXJnc1swXX1cIiBgIDogYGA7XG4gICAgICB3YXJuKFxuICAgICAgICBgJHtjYXBpdGFsaXplKHR5cGUpfSBvcGVyYXRpb24gJHtrZXl9ZmFpbGVkOiB0YXJnZXQgaXMgcmVhZG9ubHkuYCxcbiAgICAgICAgdG9SYXcodGhpcylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlID09PSBcImRlbGV0ZVwiID8gZmFsc2UgOiB0eXBlID09PSBcImNsZWFyXCIgPyB2b2lkIDAgOiB0aGlzO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucygpIHtcbiAgY29uc3QgbXV0YWJsZUluc3RydW1lbnRhdGlvbnMyID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQodGhpcywga2V5KTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcyk7XG4gICAgfSxcbiAgICBoYXMsXG4gICAgYWRkLFxuICAgIHNldCxcbiAgICBkZWxldGU6IGRlbGV0ZUVudHJ5LFxuICAgIGNsZWFyLFxuICAgIGZvckVhY2g6IGNyZWF0ZUZvckVhY2goZmFsc2UsIGZhbHNlKVxuICB9O1xuICBjb25zdCBzaGFsbG93SW5zdHJ1bWVudGF0aW9uczIgPSB7XG4gICAgZ2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCBrZXksIGZhbHNlLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcyk7XG4gICAgfSxcbiAgICBoYXMsXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICByZXR1cm4gYWRkLmNhbGwodGhpcywgdmFsdWUsIHRydWUpO1xuICAgIH0sXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBzZXQuY2FsbCh0aGlzLCBrZXksIHZhbHVlLCB0cnVlKTtcbiAgICB9LFxuICAgIGRlbGV0ZTogZGVsZXRlRW50cnksXG4gICAgY2xlYXIsXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaChmYWxzZSwgdHJ1ZSlcbiAgfTtcbiAgY29uc3QgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMiA9IHtcbiAgICBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIGtleSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBzaXplKHRoaXMsIHRydWUpO1xuICAgIH0sXG4gICAgaGFzKGtleSkge1xuICAgICAgcmV0dXJuIGhhcy5jYWxsKHRoaXMsIGtleSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBhZGQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiYWRkXCIpLFxuICAgIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJzZXRcIiksXG4gICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImRlbGV0ZVwiKSxcbiAgICBjbGVhcjogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJjbGVhclwiKSxcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKHRydWUsIGZhbHNlKVxuICB9O1xuICBjb25zdCBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMiA9IHtcbiAgICBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIGtleSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBzaXplKHRoaXMsIHRydWUpO1xuICAgIH0sXG4gICAgaGFzKGtleSkge1xuICAgICAgcmV0dXJuIGhhcy5jYWxsKHRoaXMsIGtleSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBhZGQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiYWRkXCIpLFxuICAgIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJzZXRcIiksXG4gICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImRlbGV0ZVwiKSxcbiAgICBjbGVhcjogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJjbGVhclwiKSxcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKHRydWUsIHRydWUpXG4gIH07XG4gIGNvbnN0IGl0ZXJhdG9yTWV0aG9kcyA9IFtcbiAgICBcImtleXNcIixcbiAgICBcInZhbHVlc1wiLFxuICAgIFwiZW50cmllc1wiLFxuICAgIFN5bWJvbC5pdGVyYXRvclxuICBdO1xuICBpdGVyYXRvck1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgbXV0YWJsZUluc3RydW1lbnRhdGlvbnMyW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCB0cnVlLCBmYWxzZSk7XG4gICAgc2hhbGxvd0luc3RydW1lbnRhdGlvbnMyW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIGZhbHNlLCB0cnVlKTtcbiAgICBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QoXG4gICAgICBtZXRob2QsXG4gICAgICB0cnVlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH0pO1xuICByZXR1cm4gW1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zMixcbiAgICByZWFkb25seUluc3RydW1lbnRhdGlvbnMyLFxuICAgIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zMixcbiAgICBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMlxuICBdO1xufVxuY29uc3QgW1xuICBtdXRhYmxlSW5zdHJ1bWVudGF0aW9ucyxcbiAgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zLFxuICBzaGFsbG93SW5zdHJ1bWVudGF0aW9ucyxcbiAgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc1xuXSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVJbnN0cnVtZW50YXRpb25zKCk7XG5mdW5jdGlvbiBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoaXNSZWFkb25seTIsIHNoYWxsb3cpIHtcbiAgY29uc3QgaW5zdHJ1bWVudGF0aW9ucyA9IHNoYWxsb3cgPyBpc1JlYWRvbmx5MiA/IHNoYWxsb3dSZWFkb25seUluc3RydW1lbnRhdGlvbnMgOiBzaGFsbG93SW5zdHJ1bWVudGF0aW9ucyA6IGlzUmVhZG9ubHkyID8gcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zIDogbXV0YWJsZUluc3RydW1lbnRhdGlvbnM7XG4gIHJldHVybiAodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSA9PiB7XG4gICAgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFjdGl2ZVwiKSB7XG4gICAgICByZXR1cm4gIWlzUmVhZG9ubHkyO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5MjtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfcmF3XCIpIHtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHJldHVybiBSZWZsZWN0LmdldChcbiAgICAgIGhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LFxuICAgICAga2V5LFxuICAgICAgcmVjZWl2ZXJcbiAgICApO1xuICB9O1xufVxuY29uc3QgbXV0YWJsZUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGZhbHNlLCBmYWxzZSlcbn07XG5jb25zdCBzaGFsbG93Q29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoZmFsc2UsIHRydWUpXG59O1xuY29uc3QgcmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gIGdldDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCBmYWxzZSlcbn07XG5jb25zdCBzaGFsbG93UmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gIGdldDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCB0cnVlKVxufTtcbmZ1bmN0aW9uIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KSB7XG4gIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gIGlmIChyYXdLZXkgIT09IGtleSAmJiBoYXMyLmNhbGwodGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgY29uc3QgdHlwZSA9IHRvUmF3VHlwZSh0YXJnZXQpO1xuICAgIHdhcm4oXG4gICAgICBgUmVhY3RpdmUgJHt0eXBlfSBjb250YWlucyBib3RoIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIHRoZSBzYW1lIG9iamVjdCR7dHlwZSA9PT0gYE1hcGAgPyBgIGFzIGtleXNgIDogYGB9LCB3aGljaCBjYW4gbGVhZCB0byBpbmNvbnNpc3RlbmNpZXMuIEF2b2lkIGRpZmZlcmVudGlhdGluZyBiZXR3ZWVuIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIGFuIG9iamVjdCBhbmQgb25seSB1c2UgdGhlIHJlYWN0aXZlIHZlcnNpb24gaWYgcG9zc2libGUuYFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgcmVhY3RpdmVNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNoYWxsb3dSZWFjdGl2ZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmVhZG9ubHlNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNoYWxsb3dSZWFkb25seU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gdGFyZ2V0VHlwZU1hcChyYXdUeXBlKSB7XG4gIHN3aXRjaCAocmF3VHlwZSkge1xuICAgIGNhc2UgXCJPYmplY3RcIjpcbiAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgIHJldHVybiAxIC8qIENPTU1PTiAqLztcbiAgICBjYXNlIFwiTWFwXCI6XG4gICAgY2FzZSBcIlNldFwiOlxuICAgIGNhc2UgXCJXZWFrTWFwXCI6XG4gICAgY2FzZSBcIldlYWtTZXRcIjpcbiAgICAgIHJldHVybiAyIC8qIENPTExFQ1RJT04gKi87XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAwIC8qIElOVkFMSUQgKi87XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhcmdldFR5cGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlW1wiX192X3NraXBcIl0gfHwgIU9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpID8gMCAvKiBJTlZBTElEICovIDogdGFyZ2V0VHlwZU1hcCh0b1Jhd1R5cGUodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIHJlYWN0aXZlKHRhcmdldCkge1xuICBpZiAoaXNSZWFkb25seSh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QoXG4gICAgdGFyZ2V0LFxuICAgIGZhbHNlLFxuICAgIG11dGFibGVIYW5kbGVycyxcbiAgICBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzLFxuICAgIHJlYWN0aXZlTWFwXG4gICk7XG59XG5mdW5jdGlvbiBzaGFsbG93UmVhY3RpdmUodGFyZ2V0KSB7XG4gIHJldHVybiBjcmVhdGVSZWFjdGl2ZU9iamVjdChcbiAgICB0YXJnZXQsXG4gICAgZmFsc2UsXG4gICAgc2hhbGxvd1JlYWN0aXZlSGFuZGxlcnMsXG4gICAgc2hhbGxvd0NvbGxlY3Rpb25IYW5kbGVycyxcbiAgICBzaGFsbG93UmVhY3RpdmVNYXBcbiAgKTtcbn1cbmZ1bmN0aW9uIHJlYWRvbmx5KHRhcmdldCkge1xuICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QoXG4gICAgdGFyZ2V0LFxuICAgIHRydWUsXG4gICAgcmVhZG9ubHlIYW5kbGVycyxcbiAgICByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyxcbiAgICByZWFkb25seU1hcFxuICApO1xufVxuZnVuY3Rpb24gc2hhbGxvd1JlYWRvbmx5KHRhcmdldCkge1xuICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QoXG4gICAgdGFyZ2V0LFxuICAgIHRydWUsXG4gICAgc2hhbGxvd1JlYWRvbmx5SGFuZGxlcnMsXG4gICAgc2hhbGxvd1JlYWRvbmx5Q29sbGVjdGlvbkhhbmRsZXJzLFxuICAgIHNoYWxsb3dSZWFkb25seU1hcFxuICApO1xufVxuZnVuY3Rpb24gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCBpc1JlYWRvbmx5MiwgYmFzZUhhbmRsZXJzLCBjb2xsZWN0aW9uSGFuZGxlcnMsIHByb3h5TWFwKSB7XG4gIGlmICghaXNPYmplY3QodGFyZ2V0KSkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgdmFsdWUgY2Fubm90IGJlIG1hZGUgJHtpc1JlYWRvbmx5MiA/IFwicmVhZG9ubHlcIiA6IFwicmVhY3RpdmVcIn06ICR7U3RyaW5nKFxuICAgICAgICAgIHRhcmdldFxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgaWYgKHRhcmdldFtcIl9fdl9yYXdcIl0gJiYgIShpc1JlYWRvbmx5MiAmJiB0YXJnZXRbXCJfX3ZfaXNSZWFjdGl2ZVwiXSkpIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGNvbnN0IGV4aXN0aW5nUHJveHkgPSBwcm94eU1hcC5nZXQodGFyZ2V0KTtcbiAgaWYgKGV4aXN0aW5nUHJveHkpIHtcbiAgICByZXR1cm4gZXhpc3RpbmdQcm94eTtcbiAgfVxuICBjb25zdCB0YXJnZXRUeXBlID0gZ2V0VGFyZ2V0VHlwZSh0YXJnZXQpO1xuICBpZiAodGFyZ2V0VHlwZSA9PT0gMCAvKiBJTlZBTElEICovKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm94eSA9IG5ldyBQcm94eShcbiAgICB0YXJnZXQsXG4gICAgdGFyZ2V0VHlwZSA9PT0gMiAvKiBDT0xMRUNUSU9OICovID8gY29sbGVjdGlvbkhhbmRsZXJzIDogYmFzZUhhbmRsZXJzXG4gICk7XG4gIHByb3h5TWFwLnNldCh0YXJnZXQsIHByb3h5KTtcbiAgcmV0dXJuIHByb3h5O1xufVxuZnVuY3Rpb24gaXNSZWFjdGl2ZSh2YWx1ZSkge1xuICBpZiAoaXNSZWFkb25seSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gaXNSZWFjdGl2ZSh2YWx1ZVtcIl9fdl9yYXdcIl0pO1xuICB9XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZVtcIl9fdl9pc1JlYWN0aXZlXCJdKTtcbn1cbmZ1bmN0aW9uIGlzUmVhZG9ubHkodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlW1wiX192X2lzUmVhZG9ubHlcIl0pO1xufVxuZnVuY3Rpb24gaXNTaGFsbG93KHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZVtcIl9fdl9pc1NoYWxsb3dcIl0pO1xufVxuZnVuY3Rpb24gaXNQcm94eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPyAhIXZhbHVlW1wiX192X3Jhd1wiXSA6IGZhbHNlO1xufVxuZnVuY3Rpb24gdG9SYXcob2JzZXJ2ZWQpIHtcbiAgY29uc3QgcmF3ID0gb2JzZXJ2ZWQgJiYgb2JzZXJ2ZWRbXCJfX3ZfcmF3XCJdO1xuICByZXR1cm4gcmF3ID8gdG9SYXcocmF3KSA6IG9ic2VydmVkO1xufVxuZnVuY3Rpb24gbWFya1Jhdyh2YWx1ZSkge1xuICBpZiAoT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkpIHtcbiAgICBkZWYodmFsdWUsIFwiX192X3NraXBcIiwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuY29uc3QgdG9SZWFjdGl2ZSA9ICh2YWx1ZSkgPT4gaXNPYmplY3QodmFsdWUpID8gcmVhY3RpdmUodmFsdWUpIDogdmFsdWU7XG5jb25zdCB0b1JlYWRvbmx5ID0gKHZhbHVlKSA9PiBpc09iamVjdCh2YWx1ZSkgPyByZWFkb25seSh2YWx1ZSkgOiB2YWx1ZTtcblxuY29uc3QgQ09NUFVURURfU0lERV9FRkZFQ1RfV0FSTiA9IGBDb21wdXRlZCBpcyBzdGlsbCBkaXJ0eSBhZnRlciBnZXR0ZXIgZXZhbHVhdGlvbiwgbGlrZWx5IGJlY2F1c2UgYSBjb21wdXRlZCBpcyBtdXRhdGluZyBpdHMgb3duIGRlcGVuZGVuY3kgaW4gaXRzIGdldHRlci4gU3RhdGUgbXV0YXRpb25zIGluIGNvbXB1dGVkIGdldHRlcnMgc2hvdWxkIGJlIGF2b2lkZWQuICBDaGVjayB0aGUgZG9jcyBmb3IgbW9yZSBkZXRhaWxzOiBodHRwczovL3Z1ZWpzLm9yZy9ndWlkZS9lc3NlbnRpYWxzL2NvbXB1dGVkLmh0bWwjZ2V0dGVycy1zaG91bGQtYmUtc2lkZS1lZmZlY3QtZnJlZWA7XG5jbGFzcyBDb21wdXRlZFJlZkltcGwge1xuICBjb25zdHJ1Y3RvcihnZXR0ZXIsIF9zZXR0ZXIsIGlzUmVhZG9ubHksIGlzU1NSKSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBnZXR0ZXI7XG4gICAgdGhpcy5fc2V0dGVyID0gX3NldHRlcjtcbiAgICB0aGlzLmRlcCA9IHZvaWQgMDtcbiAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgdGhpc1tcIl9fdl9pc1JlYWRvbmx5XCJdID0gZmFsc2U7XG4gICAgdGhpcy5lZmZlY3QgPSBuZXcgUmVhY3RpdmVFZmZlY3QoXG4gICAgICAoKSA9PiBnZXR0ZXIodGhpcy5fdmFsdWUpLFxuICAgICAgKCkgPT4gdHJpZ2dlclJlZlZhbHVlKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLmVmZmVjdC5fZGlydHlMZXZlbCA9PT0gMiA/IDIgOiAzXG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLmVmZmVjdC5jb21wdXRlZCA9IHRoaXM7XG4gICAgdGhpcy5lZmZlY3QuYWN0aXZlID0gdGhpcy5fY2FjaGVhYmxlID0gIWlzU1NSO1xuICAgIHRoaXNbXCJfX3ZfaXNSZWFkb25seVwiXSA9IGlzUmVhZG9ubHk7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0b1Jhdyh0aGlzKTtcbiAgICBpZiAoKCFzZWxmLl9jYWNoZWFibGUgfHwgc2VsZi5lZmZlY3QuZGlydHkpICYmIGhhc0NoYW5nZWQoc2VsZi5fdmFsdWUsIHNlbGYuX3ZhbHVlID0gc2VsZi5lZmZlY3QucnVuKCkpKSB7XG4gICAgICB0cmlnZ2VyUmVmVmFsdWUoc2VsZiwgNCk7XG4gICAgfVxuICAgIHRyYWNrUmVmVmFsdWUoc2VsZik7XG4gICAgaWYgKHNlbGYuZWZmZWN0Ll9kaXJ0eUxldmVsID49IDIpIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHRoaXMuX3dhcm5SZWN1cnNpdmUpIHtcbiAgICAgICAgd2FybihDT01QVVRFRF9TSURFX0VGRkVDVF9XQVJOLCBgXG5cbmdldHRlcjogYCwgdGhpcy5nZXR0ZXIpO1xuICAgICAgfVxuICAgICAgdHJpZ2dlclJlZlZhbHVlKHNlbGYsIDIpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZi5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fc2V0dGVyKG5ld1ZhbHVlKTtcbiAgfVxuICAvLyAjcmVnaW9uIHBvbHlmaWxsIF9kaXJ0eSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB0aGlyZCBwYXJ0eSBjb2RlIGZvciBWdWUgPD0gMy4zLnhcbiAgZ2V0IF9kaXJ0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5lZmZlY3QuZGlydHk7XG4gIH1cbiAgc2V0IF9kaXJ0eSh2KSB7XG4gICAgdGhpcy5lZmZlY3QuZGlydHkgPSB2O1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbmZ1bmN0aW9uIGNvbXB1dGVkKGdldHRlck9yT3B0aW9ucywgZGVidWdPcHRpb25zLCBpc1NTUiA9IGZhbHNlKSB7XG4gIGxldCBnZXR0ZXI7XG4gIGxldCBzZXR0ZXI7XG4gIGNvbnN0IG9ubHlHZXR0ZXIgPSBpc0Z1bmN0aW9uKGdldHRlck9yT3B0aW9ucyk7XG4gIGlmIChvbmx5R2V0dGVyKSB7XG4gICAgZ2V0dGVyID0gZ2V0dGVyT3JPcHRpb25zO1xuICAgIHNldHRlciA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyAoKSA9PiB7XG4gICAgICB3YXJuKFwiV3JpdGUgb3BlcmF0aW9uIGZhaWxlZDogY29tcHV0ZWQgdmFsdWUgaXMgcmVhZG9ubHlcIik7XG4gICAgfSA6IE5PT1A7XG4gIH0gZWxzZSB7XG4gICAgZ2V0dGVyID0gZ2V0dGVyT3JPcHRpb25zLmdldDtcbiAgICBzZXR0ZXIgPSBnZXR0ZXJPck9wdGlvbnMuc2V0O1xuICB9XG4gIGNvbnN0IGNSZWYgPSBuZXcgQ29tcHV0ZWRSZWZJbXBsKGdldHRlciwgc2V0dGVyLCBvbmx5R2V0dGVyIHx8ICFzZXR0ZXIsIGlzU1NSKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgZGVidWdPcHRpb25zICYmICFpc1NTUikge1xuICAgIGNSZWYuZWZmZWN0Lm9uVHJhY2sgPSBkZWJ1Z09wdGlvbnMub25UcmFjaztcbiAgICBjUmVmLmVmZmVjdC5vblRyaWdnZXIgPSBkZWJ1Z09wdGlvbnMub25UcmlnZ2VyO1xuICB9XG4gIHJldHVybiBjUmVmO1xufVxuXG5mdW5jdGlvbiB0cmFja1JlZlZhbHVlKHJlZjIpIHtcbiAgdmFyIF9hO1xuICBpZiAoc2hvdWxkVHJhY2sgJiYgYWN0aXZlRWZmZWN0KSB7XG4gICAgcmVmMiA9IHRvUmF3KHJlZjIpO1xuICAgIHRyYWNrRWZmZWN0KFxuICAgICAgYWN0aXZlRWZmZWN0LFxuICAgICAgKF9hID0gcmVmMi5kZXApICE9IG51bGwgPyBfYSA6IHJlZjIuZGVwID0gY3JlYXRlRGVwKFxuICAgICAgICAoKSA9PiByZWYyLmRlcCA9IHZvaWQgMCxcbiAgICAgICAgcmVmMiBpbnN0YW5jZW9mIENvbXB1dGVkUmVmSW1wbCA/IHJlZjIgOiB2b2lkIDBcbiAgICAgICksXG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8ge1xuICAgICAgICB0YXJnZXQ6IHJlZjIsXG4gICAgICAgIHR5cGU6IFwiZ2V0XCIsXG4gICAgICAgIGtleTogXCJ2YWx1ZVwiXG4gICAgICB9IDogdm9pZCAwXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gdHJpZ2dlclJlZlZhbHVlKHJlZjIsIGRpcnR5TGV2ZWwgPSA0LCBuZXdWYWwsIG9sZFZhbCkge1xuICByZWYyID0gdG9SYXcocmVmMik7XG4gIGNvbnN0IGRlcCA9IHJlZjIuZGVwO1xuICBpZiAoZGVwKSB7XG4gICAgdHJpZ2dlckVmZmVjdHMoXG4gICAgICBkZXAsXG4gICAgICBkaXJ0eUxldmVsLFxuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHtcbiAgICAgICAgdGFyZ2V0OiByZWYyLFxuICAgICAgICB0eXBlOiBcInNldFwiLFxuICAgICAgICBrZXk6IFwidmFsdWVcIixcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbCxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbFxuICAgICAgfSA6IHZvaWQgMFxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzUmVmKHIpIHtcbiAgcmV0dXJuICEhKHIgJiYgci5fX3ZfaXNSZWYgPT09IHRydWUpO1xufVxuZnVuY3Rpb24gcmVmKHZhbHVlKSB7XG4gIHJldHVybiBjcmVhdGVSZWYodmFsdWUsIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dSZWYodmFsdWUpIHtcbiAgcmV0dXJuIGNyZWF0ZVJlZih2YWx1ZSwgdHJ1ZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVSZWYocmF3VmFsdWUsIHNoYWxsb3cpIHtcbiAgaWYgKGlzUmVmKHJhd1ZhbHVlKSkge1xuICAgIHJldHVybiByYXdWYWx1ZTtcbiAgfVxuICByZXR1cm4gbmV3IFJlZkltcGwocmF3VmFsdWUsIHNoYWxsb3cpO1xufVxuY2xhc3MgUmVmSW1wbCB7XG4gIGNvbnN0cnVjdG9yKHZhbHVlLCBfX3ZfaXNTaGFsbG93KSB7XG4gICAgdGhpcy5fX3ZfaXNTaGFsbG93ID0gX192X2lzU2hhbGxvdztcbiAgICB0aGlzLmRlcCA9IHZvaWQgMDtcbiAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgdGhpcy5fcmF3VmFsdWUgPSBfX3ZfaXNTaGFsbG93ID8gdmFsdWUgOiB0b1Jhdyh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSBfX3ZfaXNTaGFsbG93ID8gdmFsdWUgOiB0b1JlYWN0aXZlKHZhbHVlKTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgdHJhY2tSZWZWYWx1ZSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbCkge1xuICAgIGNvbnN0IHVzZURpcmVjdFZhbHVlID0gdGhpcy5fX3ZfaXNTaGFsbG93IHx8IGlzU2hhbGxvdyhuZXdWYWwpIHx8IGlzUmVhZG9ubHkobmV3VmFsKTtcbiAgICBuZXdWYWwgPSB1c2VEaXJlY3RWYWx1ZSA/IG5ld1ZhbCA6IHRvUmF3KG5ld1ZhbCk7XG4gICAgaWYgKGhhc0NoYW5nZWQobmV3VmFsLCB0aGlzLl9yYXdWYWx1ZSkpIHtcbiAgICAgIGNvbnN0IG9sZFZhbCA9IHRoaXMuX3Jhd1ZhbHVlO1xuICAgICAgdGhpcy5fcmF3VmFsdWUgPSBuZXdWYWw7XG4gICAgICB0aGlzLl92YWx1ZSA9IHVzZURpcmVjdFZhbHVlID8gbmV3VmFsIDogdG9SZWFjdGl2ZShuZXdWYWwpO1xuICAgICAgdHJpZ2dlclJlZlZhbHVlKHRoaXMsIDQsIG5ld1ZhbCwgb2xkVmFsKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXJSZWYocmVmMikge1xuICB0cmlnZ2VyUmVmVmFsdWUocmVmMiwgNCwgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHJlZjIudmFsdWUgOiB2b2lkIDApO1xufVxuZnVuY3Rpb24gdW5yZWYocmVmMikge1xuICByZXR1cm4gaXNSZWYocmVmMikgPyByZWYyLnZhbHVlIDogcmVmMjtcbn1cbmZ1bmN0aW9uIHRvVmFsdWUoc291cmNlKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKHNvdXJjZSkgPyBzb3VyY2UoKSA6IHVucmVmKHNvdXJjZSk7XG59XG5jb25zdCBzaGFsbG93VW53cmFwSGFuZGxlcnMgPSB7XG4gIGdldDogKHRhcmdldCwga2V5LCByZWNlaXZlcikgPT4gdW5yZWYoUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSksXG4gIHNldDogKHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpID0+IHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgIGlmIChpc1JlZihvbGRWYWx1ZSkgJiYgIWlzUmVmKHZhbHVlKSkge1xuICAgICAgb2xkVmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcik7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gcHJveHlSZWZzKG9iamVjdFdpdGhSZWZzKSB7XG4gIHJldHVybiBpc1JlYWN0aXZlKG9iamVjdFdpdGhSZWZzKSA/IG9iamVjdFdpdGhSZWZzIDogbmV3IFByb3h5KG9iamVjdFdpdGhSZWZzLCBzaGFsbG93VW53cmFwSGFuZGxlcnMpO1xufVxuY2xhc3MgQ3VzdG9tUmVmSW1wbCB7XG4gIGNvbnN0cnVjdG9yKGZhY3RvcnkpIHtcbiAgICB0aGlzLmRlcCA9IHZvaWQgMDtcbiAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgY29uc3QgeyBnZXQsIHNldCB9ID0gZmFjdG9yeShcbiAgICAgICgpID0+IHRyYWNrUmVmVmFsdWUodGhpcyksXG4gICAgICAoKSA9PiB0cmlnZ2VyUmVmVmFsdWUodGhpcylcbiAgICApO1xuICAgIHRoaXMuX2dldCA9IGdldDtcbiAgICB0aGlzLl9zZXQgPSBzZXQ7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXQoKTtcbiAgfVxuICBzZXQgdmFsdWUobmV3VmFsKSB7XG4gICAgdGhpcy5fc2V0KG5ld1ZhbCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGN1c3RvbVJlZihmYWN0b3J5KSB7XG4gIHJldHVybiBuZXcgQ3VzdG9tUmVmSW1wbChmYWN0b3J5KTtcbn1cbmZ1bmN0aW9uIHRvUmVmcyhvYmplY3QpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzUHJveHkob2JqZWN0KSkge1xuICAgIHdhcm4oYHRvUmVmcygpIGV4cGVjdHMgYSByZWFjdGl2ZSBvYmplY3QgYnV0IHJlY2VpdmVkIGEgcGxhaW4gb25lLmApO1xuICB9XG4gIGNvbnN0IHJldCA9IGlzQXJyYXkob2JqZWN0KSA/IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKSA6IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICByZXRba2V5XSA9IHByb3BlcnR5VG9SZWYob2JqZWN0LCBrZXkpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5jbGFzcyBPYmplY3RSZWZJbXBsIHtcbiAgY29uc3RydWN0b3IoX29iamVjdCwgX2tleSwgX2RlZmF1bHRWYWx1ZSkge1xuICAgIHRoaXMuX29iamVjdCA9IF9vYmplY3Q7XG4gICAgdGhpcy5fa2V5ID0gX2tleTtcbiAgICB0aGlzLl9kZWZhdWx0VmFsdWUgPSBfZGVmYXVsdFZhbHVlO1xuICAgIHRoaXMuX192X2lzUmVmID0gdHJ1ZTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5fb2JqZWN0W3RoaXMuX2tleV07XG4gICAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwID8gdGhpcy5fZGVmYXVsdFZhbHVlIDogdmFsO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWwpIHtcbiAgICB0aGlzLl9vYmplY3RbdGhpcy5fa2V5XSA9IG5ld1ZhbDtcbiAgfVxuICBnZXQgZGVwKCkge1xuICAgIHJldHVybiBnZXREZXBGcm9tUmVhY3RpdmUodG9SYXcodGhpcy5fb2JqZWN0KSwgdGhpcy5fa2V5KTtcbiAgfVxufVxuY2xhc3MgR2V0dGVyUmVmSW1wbCB7XG4gIGNvbnN0cnVjdG9yKF9nZXR0ZXIpIHtcbiAgICB0aGlzLl9nZXR0ZXIgPSBfZ2V0dGVyO1xuICAgIHRoaXMuX192X2lzUmVmID0gdHJ1ZTtcbiAgICB0aGlzLl9fdl9pc1JlYWRvbmx5ID0gdHJ1ZTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldHRlcigpO1xuICB9XG59XG5mdW5jdGlvbiB0b1JlZihzb3VyY2UsIGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmIChpc1JlZihzb3VyY2UpKSB7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICByZXR1cm4gbmV3IEdldHRlclJlZkltcGwoc291cmNlKTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChzb3VyY2UpICYmIGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5VG9SZWYoc291cmNlLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlZihzb3VyY2UpO1xuICB9XG59XG5mdW5jdGlvbiBwcm9wZXJ0eVRvUmVmKHNvdXJjZSwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgY29uc3QgdmFsID0gc291cmNlW2tleV07XG4gIHJldHVybiBpc1JlZih2YWwpID8gdmFsIDogbmV3IE9iamVjdFJlZkltcGwoc291cmNlLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmVycmVkQ29tcHV0ZWQgPSBjb21wdXRlZDtcblxuY29uc3QgVHJhY2tPcFR5cGVzID0ge1xuICBcIkdFVFwiOiBcImdldFwiLFxuICBcIkhBU1wiOiBcImhhc1wiLFxuICBcIklURVJBVEVcIjogXCJpdGVyYXRlXCJcbn07XG5jb25zdCBUcmlnZ2VyT3BUeXBlcyA9IHtcbiAgXCJTRVRcIjogXCJzZXRcIixcbiAgXCJBRERcIjogXCJhZGRcIixcbiAgXCJERUxFVEVcIjogXCJkZWxldGVcIixcbiAgXCJDTEVBUlwiOiBcImNsZWFyXCJcbn07XG5jb25zdCBSZWFjdGl2ZUZsYWdzID0ge1xuICBcIlNLSVBcIjogXCJfX3Zfc2tpcFwiLFxuICBcIklTX1JFQUNUSVZFXCI6IFwiX192X2lzUmVhY3RpdmVcIixcbiAgXCJJU19SRUFET05MWVwiOiBcIl9fdl9pc1JlYWRvbmx5XCIsXG4gIFwiSVNfU0hBTExPV1wiOiBcIl9fdl9pc1NoYWxsb3dcIixcbiAgXCJSQVdcIjogXCJfX3ZfcmF3XCJcbn07XG5cbmV4cG9ydCB7IEVmZmVjdFNjb3BlLCBJVEVSQVRFX0tFWSwgUmVhY3RpdmVFZmZlY3QsIFJlYWN0aXZlRmxhZ3MsIFRyYWNrT3BUeXBlcywgVHJpZ2dlck9wVHlwZXMsIGNvbXB1dGVkLCBjdXN0b21SZWYsIGRlZmVycmVkQ29tcHV0ZWQsIGVmZmVjdCwgZWZmZWN0U2NvcGUsIGVuYWJsZVRyYWNraW5nLCBnZXRDdXJyZW50U2NvcGUsIGlzUHJveHksIGlzUmVhY3RpdmUsIGlzUmVhZG9ubHksIGlzUmVmLCBpc1NoYWxsb3csIG1hcmtSYXcsIG9uU2NvcGVEaXNwb3NlLCBwYXVzZVNjaGVkdWxpbmcsIHBhdXNlVHJhY2tpbmcsIHByb3h5UmVmcywgcmVhY3RpdmUsIHJlYWRvbmx5LCByZWYsIHJlc2V0U2NoZWR1bGluZywgcmVzZXRUcmFja2luZywgc2hhbGxvd1JlYWN0aXZlLCBzaGFsbG93UmVhZG9ubHksIHNoYWxsb3dSZWYsIHN0b3AsIHRvUmF3LCB0b1JlZiwgdG9SZWZzLCB0b1ZhbHVlLCB0cmFjaywgdHJpZ2dlciwgdHJpZ2dlclJlZiwgdW5yZWYgfTtcbiIsIi8qKlxuKiBAdnVlL3J1bnRpbWUtY29yZSB2My40LjM4XG4qIChjKSAyMDE4LXByZXNlbnQgWXV4aSAoRXZhbikgWW91IGFuZCBWdWUgY29udHJpYnV0b3JzXG4qIEBsaWNlbnNlIE1JVFxuKiovXG5pbXBvcnQgeyBwYXVzZVRyYWNraW5nLCByZXNldFRyYWNraW5nLCBpc1JlZiwgdG9SYXcsIHJlZiwgc2hhbGxvd1JlYWRvbmx5LCB0cmFjaywgcmVhY3RpdmUsIHNoYWxsb3dSZWFjdGl2ZSwgdHJpZ2dlciwgaXNSZWFjdGl2ZSwgUmVhY3RpdmVFZmZlY3QsIGlzU2hhbGxvdywgZ2V0Q3VycmVudFNjb3BlLCBjdXN0b21SZWYsIGlzUHJveHksIHByb3h5UmVmcywgbWFya1JhdywgRWZmZWN0U2NvcGUsIGNvbXB1dGVkIGFzIGNvbXB1dGVkJDEsIGlzUmVhZG9ubHkgfSBmcm9tICdAdnVlL3JlYWN0aXZpdHknO1xuZXhwb3J0IHsgRWZmZWN0U2NvcGUsIFJlYWN0aXZlRWZmZWN0LCBUcmFja09wVHlwZXMsIFRyaWdnZXJPcFR5cGVzLCBjdXN0b21SZWYsIGVmZmVjdCwgZWZmZWN0U2NvcGUsIGdldEN1cnJlbnRTY29wZSwgaXNQcm94eSwgaXNSZWFjdGl2ZSwgaXNSZWFkb25seSwgaXNSZWYsIGlzU2hhbGxvdywgbWFya1Jhdywgb25TY29wZURpc3Bvc2UsIHByb3h5UmVmcywgcmVhY3RpdmUsIHJlYWRvbmx5LCByZWYsIHNoYWxsb3dSZWFjdGl2ZSwgc2hhbGxvd1JlYWRvbmx5LCBzaGFsbG93UmVmLCBzdG9wLCB0b1JhdywgdG9SZWYsIHRvUmVmcywgdG9WYWx1ZSwgdHJpZ2dlclJlZiwgdW5yZWYgfSBmcm9tICdAdnVlL3JlYWN0aXZpdHknO1xuaW1wb3J0IHsgaXNTdHJpbmcsIGlzRnVuY3Rpb24sIGlzUHJvbWlzZSwgaXNBcnJheSwgTk9PUCwgZ2V0R2xvYmFsVGhpcywgZXh0ZW5kLCBpc0J1aWx0SW5EaXJlY3RpdmUsIEVNUFRZX09CSiwgaXNPYmplY3QsIHJlbW92ZSwgaXNSZWdFeHAsIGludm9rZUFycmF5Rm5zLCB0b0hhbmRsZXJLZXksIGNhcGl0YWxpemUsIGNhbWVsaXplLCBoYXNPd24sIGlzR2xvYmFsbHlBbGxvd2VkLCBOTywgaHlwaGVuYXRlLCBpc1Jlc2VydmVkUHJvcCwgRU1QVFlfQVJSLCB0b1Jhd1R5cGUsIG1ha2VNYXAsIGRlZiwgaXNPbiwgbm9ybWFsaXplQ2xhc3MsIHN0cmluZ2lmeVN0eWxlLCBub3JtYWxpemVTdHlsZSwgaXNLbm93blN2Z0F0dHIsIGlzQm9vbGVhbkF0dHIsIGlzS25vd25IdG1sQXR0ciwgaW5jbHVkZUJvb2xlYW5BdHRyLCBpc1JlbmRlcmFibGVBdHRyVmFsdWUsIGhhc0NoYW5nZWQsIGlzU2V0LCBpc01hcCwgaXNQbGFpbk9iamVjdCwgbG9vc2VUb051bWJlciwgaXNNb2RlbExpc3RlbmVyLCB0b051bWJlciB9IGZyb20gJ0B2dWUvc2hhcmVkJztcbmV4cG9ydCB7IGNhbWVsaXplLCBjYXBpdGFsaXplLCBub3JtYWxpemVDbGFzcywgbm9ybWFsaXplUHJvcHMsIG5vcm1hbGl6ZVN0eWxlLCB0b0Rpc3BsYXlTdHJpbmcsIHRvSGFuZGxlcktleSB9IGZyb20gJ0B2dWUvc2hhcmVkJztcblxuY29uc3Qgc3RhY2sgPSBbXTtcbmZ1bmN0aW9uIHB1c2hXYXJuaW5nQ29udGV4dCh2bm9kZSkge1xuICBzdGFjay5wdXNoKHZub2RlKTtcbn1cbmZ1bmN0aW9uIHBvcFdhcm5pbmdDb250ZXh0KCkge1xuICBzdGFjay5wb3AoKTtcbn1cbmxldCBpc1dhcm5pbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHdhcm4kMShtc2csIC4uLmFyZ3MpIHtcbiAgaWYgKGlzV2FybmluZykgcmV0dXJuO1xuICBpc1dhcm5pbmcgPSB0cnVlO1xuICBwYXVzZVRyYWNraW5nKCk7XG4gIGNvbnN0IGluc3RhbmNlID0gc3RhY2subGVuZ3RoID8gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uY29tcG9uZW50IDogbnVsbDtcbiAgY29uc3QgYXBwV2FybkhhbmRsZXIgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy53YXJuSGFuZGxlcjtcbiAgY29uc3QgdHJhY2UgPSBnZXRDb21wb25lbnRUcmFjZSgpO1xuICBpZiAoYXBwV2FybkhhbmRsZXIpIHtcbiAgICBjYWxsV2l0aEVycm9ySGFuZGxpbmcoXG4gICAgICBhcHBXYXJuSGFuZGxlcixcbiAgICAgIGluc3RhbmNlLFxuICAgICAgMTEsXG4gICAgICBbXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICBtc2cgKyBhcmdzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IGEudG9TdHJpbmcpID09IG51bGwgPyB2b2lkIDAgOiBfYS5jYWxsKGEpKSAhPSBudWxsID8gX2IgOiBKU09OLnN0cmluZ2lmeShhKTtcbiAgICAgICAgfSkuam9pbihcIlwiKSxcbiAgICAgICAgaW5zdGFuY2UgJiYgaW5zdGFuY2UucHJveHksXG4gICAgICAgIHRyYWNlLm1hcChcbiAgICAgICAgICAoeyB2bm9kZSB9KSA9PiBgYXQgPCR7Zm9ybWF0Q29tcG9uZW50TmFtZShpbnN0YW5jZSwgdm5vZGUudHlwZSl9PmBcbiAgICAgICAgKS5qb2luKFwiXFxuXCIpLFxuICAgICAgICB0cmFjZVxuICAgICAgXVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd2FybkFyZ3MgPSBbYFtWdWUgd2Fybl06ICR7bXNnfWAsIC4uLmFyZ3NdO1xuICAgIGlmICh0cmFjZS5sZW5ndGggJiYgLy8gYXZvaWQgc3BhbW1pbmcgY29uc29sZSBkdXJpbmcgdGVzdHNcbiAgICB0cnVlKSB7XG4gICAgICB3YXJuQXJncy5wdXNoKGBcbmAsIC4uLmZvcm1hdFRyYWNlKHRyYWNlKSk7XG4gICAgfVxuICAgIGNvbnNvbGUud2FybiguLi53YXJuQXJncyk7XG4gIH1cbiAgcmVzZXRUcmFja2luZygpO1xuICBpc1dhcm5pbmcgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldENvbXBvbmVudFRyYWNlKCkge1xuICBsZXQgY3VycmVudFZOb2RlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gIGlmICghY3VycmVudFZOb2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IG5vcm1hbGl6ZWRTdGFjayA9IFtdO1xuICB3aGlsZSAoY3VycmVudFZOb2RlKSB7XG4gICAgY29uc3QgbGFzdCA9IG5vcm1hbGl6ZWRTdGFja1swXTtcbiAgICBpZiAobGFzdCAmJiBsYXN0LnZub2RlID09PSBjdXJyZW50Vk5vZGUpIHtcbiAgICAgIGxhc3QucmVjdXJzZUNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vcm1hbGl6ZWRTdGFjay5wdXNoKHtcbiAgICAgICAgdm5vZGU6IGN1cnJlbnRWTm9kZSxcbiAgICAgICAgcmVjdXJzZUNvdW50OiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSBjdXJyZW50Vk5vZGUuY29tcG9uZW50ICYmIGN1cnJlbnRWTm9kZS5jb21wb25lbnQucGFyZW50O1xuICAgIGN1cnJlbnRWTm9kZSA9IHBhcmVudEluc3RhbmNlICYmIHBhcmVudEluc3RhbmNlLnZub2RlO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkU3RhY2s7XG59XG5mdW5jdGlvbiBmb3JtYXRUcmFjZSh0cmFjZSkge1xuICBjb25zdCBsb2dzID0gW107XG4gIHRyYWNlLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgbG9ncy5wdXNoKC4uLmkgPT09IDAgPyBbXSA6IFtgXG5gXSwgLi4uZm9ybWF0VHJhY2VFbnRyeShlbnRyeSkpO1xuICB9KTtcbiAgcmV0dXJuIGxvZ3M7XG59XG5mdW5jdGlvbiBmb3JtYXRUcmFjZUVudHJ5KHsgdm5vZGUsIHJlY3Vyc2VDb3VudCB9KSB7XG4gIGNvbnN0IHBvc3RmaXggPSByZWN1cnNlQ291bnQgPiAwID8gYC4uLiAoJHtyZWN1cnNlQ291bnR9IHJlY3Vyc2l2ZSBjYWxscylgIDogYGA7XG4gIGNvbnN0IGlzUm9vdCA9IHZub2RlLmNvbXBvbmVudCA/IHZub2RlLmNvbXBvbmVudC5wYXJlbnQgPT0gbnVsbCA6IGZhbHNlO1xuICBjb25zdCBvcGVuID0gYCBhdCA8JHtmb3JtYXRDb21wb25lbnROYW1lKFxuICAgIHZub2RlLmNvbXBvbmVudCxcbiAgICB2bm9kZS50eXBlLFxuICAgIGlzUm9vdFxuICApfWA7XG4gIGNvbnN0IGNsb3NlID0gYD5gICsgcG9zdGZpeDtcbiAgcmV0dXJuIHZub2RlLnByb3BzID8gW29wZW4sIC4uLmZvcm1hdFByb3BzKHZub2RlLnByb3BzKSwgY2xvc2VdIDogW29wZW4gKyBjbG9zZV07XG59XG5mdW5jdGlvbiBmb3JtYXRQcm9wcyhwcm9wcykge1xuICBjb25zdCByZXMgPSBbXTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKTtcbiAga2V5cy5zbGljZSgwLCAzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICByZXMucHVzaCguLi5mb3JtYXRQcm9wKGtleSwgcHJvcHNba2V5XSkpO1xuICB9KTtcbiAgaWYgKGtleXMubGVuZ3RoID4gMykge1xuICAgIHJlcy5wdXNoKGAgLi4uYCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGZvcm1hdFByb3Aoa2V5LCB2YWx1ZSwgcmF3KSB7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT0ke3ZhbHVlfWBdO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT0ke3ZhbHVlfWBdO1xuICB9IGVsc2UgaWYgKGlzUmVmKHZhbHVlKSkge1xuICAgIHZhbHVlID0gZm9ybWF0UHJvcChrZXksIHRvUmF3KHZhbHVlLnZhbHVlKSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHJhdyA/IHZhbHVlIDogW2Ake2tleX09UmVmPGAsIHZhbHVlLCBgPmBdO1xuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIFtgJHtrZXl9PWZuJHt2YWx1ZS5uYW1lID8gYDwke3ZhbHVlLm5hbWV9PmAgOiBgYH1gXTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT1gLCB2YWx1ZV07XG4gIH1cbn1cbmZ1bmN0aW9uIGFzc2VydE51bWJlcih2YWwsIHR5cGUpIHtcbiAgaWYgKCEhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSByZXR1cm47XG4gIGlmICh2YWwgPT09IHZvaWQgMCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiKSB7XG4gICAgd2FybiQxKGAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIG51bWJlciAtIGdvdCAke0pTT04uc3RyaW5naWZ5KHZhbCl9LmApO1xuICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICB3YXJuJDEoYCR7dHlwZX0gaXMgTmFOIC0gdGhlIGR1cmF0aW9uIGV4cHJlc3Npb24gbWlnaHQgYmUgaW5jb3JyZWN0LmApO1xuICB9XG59XG5cbmNvbnN0IEVycm9yQ29kZXMgPSB7XG4gIFwiU0VUVVBfRlVOQ1RJT05cIjogMCxcbiAgXCIwXCI6IFwiU0VUVVBfRlVOQ1RJT05cIixcbiAgXCJSRU5ERVJfRlVOQ1RJT05cIjogMSxcbiAgXCIxXCI6IFwiUkVOREVSX0ZVTkNUSU9OXCIsXG4gIFwiV0FUQ0hfR0VUVEVSXCI6IDIsXG4gIFwiMlwiOiBcIldBVENIX0dFVFRFUlwiLFxuICBcIldBVENIX0NBTExCQUNLXCI6IDMsXG4gIFwiM1wiOiBcIldBVENIX0NBTExCQUNLXCIsXG4gIFwiV0FUQ0hfQ0xFQU5VUFwiOiA0LFxuICBcIjRcIjogXCJXQVRDSF9DTEVBTlVQXCIsXG4gIFwiTkFUSVZFX0VWRU5UX0hBTkRMRVJcIjogNSxcbiAgXCI1XCI6IFwiTkFUSVZFX0VWRU5UX0hBTkRMRVJcIixcbiAgXCJDT01QT05FTlRfRVZFTlRfSEFORExFUlwiOiA2LFxuICBcIjZcIjogXCJDT01QT05FTlRfRVZFTlRfSEFORExFUlwiLFxuICBcIlZOT0RFX0hPT0tcIjogNyxcbiAgXCI3XCI6IFwiVk5PREVfSE9PS1wiLFxuICBcIkRJUkVDVElWRV9IT09LXCI6IDgsXG4gIFwiOFwiOiBcIkRJUkVDVElWRV9IT09LXCIsXG4gIFwiVFJBTlNJVElPTl9IT09LXCI6IDksXG4gIFwiOVwiOiBcIlRSQU5TSVRJT05fSE9PS1wiLFxuICBcIkFQUF9FUlJPUl9IQU5ETEVSXCI6IDEwLFxuICBcIjEwXCI6IFwiQVBQX0VSUk9SX0hBTkRMRVJcIixcbiAgXCJBUFBfV0FSTl9IQU5ETEVSXCI6IDExLFxuICBcIjExXCI6IFwiQVBQX1dBUk5fSEFORExFUlwiLFxuICBcIkZVTkNUSU9OX1JFRlwiOiAxMixcbiAgXCIxMlwiOiBcIkZVTkNUSU9OX1JFRlwiLFxuICBcIkFTWU5DX0NPTVBPTkVOVF9MT0FERVJcIjogMTMsXG4gIFwiMTNcIjogXCJBU1lOQ19DT01QT05FTlRfTE9BREVSXCIsXG4gIFwiU0NIRURVTEVSXCI6IDE0LFxuICBcIjE0XCI6IFwiU0NIRURVTEVSXCIsXG4gIFwiQ09NUE9ORU5UX1VQREFURVwiOiAxNSxcbiAgXCIxNVwiOiBcIkNPTVBPTkVOVF9VUERBVEVcIlxufTtcbmNvbnN0IEVycm9yVHlwZVN0cmluZ3MkMSA9IHtcbiAgW1wic3BcIl06IFwic2VydmVyUHJlZmV0Y2ggaG9va1wiLFxuICBbXCJiY1wiXTogXCJiZWZvcmVDcmVhdGUgaG9va1wiLFxuICBbXCJjXCJdOiBcImNyZWF0ZWQgaG9va1wiLFxuICBbXCJibVwiXTogXCJiZWZvcmVNb3VudCBob29rXCIsXG4gIFtcIm1cIl06IFwibW91bnRlZCBob29rXCIsXG4gIFtcImJ1XCJdOiBcImJlZm9yZVVwZGF0ZSBob29rXCIsXG4gIFtcInVcIl06IFwidXBkYXRlZFwiLFxuICBbXCJidW1cIl06IFwiYmVmb3JlVW5tb3VudCBob29rXCIsXG4gIFtcInVtXCJdOiBcInVubW91bnRlZCBob29rXCIsXG4gIFtcImFcIl06IFwiYWN0aXZhdGVkIGhvb2tcIixcbiAgW1wiZGFcIl06IFwiZGVhY3RpdmF0ZWQgaG9va1wiLFxuICBbXCJlY1wiXTogXCJlcnJvckNhcHR1cmVkIGhvb2tcIixcbiAgW1wicnRjXCJdOiBcInJlbmRlclRyYWNrZWQgaG9va1wiLFxuICBbXCJydGdcIl06IFwicmVuZGVyVHJpZ2dlcmVkIGhvb2tcIixcbiAgWzBdOiBcInNldHVwIGZ1bmN0aW9uXCIsXG4gIFsxXTogXCJyZW5kZXIgZnVuY3Rpb25cIixcbiAgWzJdOiBcIndhdGNoZXIgZ2V0dGVyXCIsXG4gIFszXTogXCJ3YXRjaGVyIGNhbGxiYWNrXCIsXG4gIFs0XTogXCJ3YXRjaGVyIGNsZWFudXAgZnVuY3Rpb25cIixcbiAgWzVdOiBcIm5hdGl2ZSBldmVudCBoYW5kbGVyXCIsXG4gIFs2XTogXCJjb21wb25lbnQgZXZlbnQgaGFuZGxlclwiLFxuICBbN106IFwidm5vZGUgaG9va1wiLFxuICBbOF06IFwiZGlyZWN0aXZlIGhvb2tcIixcbiAgWzldOiBcInRyYW5zaXRpb24gaG9va1wiLFxuICBbMTBdOiBcImFwcCBlcnJvckhhbmRsZXJcIixcbiAgWzExXTogXCJhcHAgd2FybkhhbmRsZXJcIixcbiAgWzEyXTogXCJyZWYgZnVuY3Rpb25cIixcbiAgWzEzXTogXCJhc3luYyBjb21wb25lbnQgbG9hZGVyXCIsXG4gIFsxNF06IFwic2NoZWR1bGVyIGZsdXNoXCIsXG4gIFsxNV06IFwiY29tcG9uZW50IHVwZGF0ZVwiXG59O1xuZnVuY3Rpb24gY2FsbFdpdGhFcnJvckhhbmRsaW5nKGZuLCBpbnN0YW5jZSwgdHlwZSwgYXJncykge1xuICB0cnkge1xuICAgIHJldHVybiBhcmdzID8gZm4oLi4uYXJncykgOiBmbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBoYW5kbGVFcnJvcihlcnIsIGluc3RhbmNlLCB0eXBlKTtcbiAgfVxufVxuZnVuY3Rpb24gY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoZm4sIGluc3RhbmNlLCB0eXBlLCBhcmdzKSB7XG4gIGlmIChpc0Z1bmN0aW9uKGZuKSkge1xuICAgIGNvbnN0IHJlcyA9IGNhbGxXaXRoRXJyb3JIYW5kbGluZyhmbiwgaW5zdGFuY2UsIHR5cGUsIGFyZ3MpO1xuICAgIGlmIChyZXMgJiYgaXNQcm9taXNlKHJlcykpIHtcbiAgICAgIHJlcy5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVyciwgaW5zdGFuY2UsIHR5cGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaWYgKGlzQXJyYXkoZm4pKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzLnB1c2goY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoZm5baV0sIGluc3RhbmNlLCB0eXBlLCBhcmdzKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm4kMShcbiAgICAgIGBJbnZhbGlkIHZhbHVlIHR5cGUgcGFzc2VkIHRvIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKCk6ICR7dHlwZW9mIGZufWBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIsIGluc3RhbmNlLCB0eXBlLCB0aHJvd0luRGV2ID0gdHJ1ZSkge1xuICBjb25zdCBjb250ZXh0Vk5vZGUgPSBpbnN0YW5jZSA/IGluc3RhbmNlLnZub2RlIDogbnVsbDtcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgbGV0IGN1ciA9IGluc3RhbmNlLnBhcmVudDtcbiAgICBjb25zdCBleHBvc2VkSW5zdGFuY2UgPSBpbnN0YW5jZS5wcm94eTtcbiAgICBjb25zdCBlcnJvckluZm8gPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gRXJyb3JUeXBlU3RyaW5ncyQxW3R5cGVdIDogYGh0dHBzOi8vdnVlanMub3JnL2Vycm9yLXJlZmVyZW5jZS8jcnVudGltZS0ke3R5cGV9YDtcbiAgICB3aGlsZSAoY3VyKSB7XG4gICAgICBjb25zdCBlcnJvckNhcHR1cmVkSG9va3MgPSBjdXIuZWM7XG4gICAgICBpZiAoZXJyb3JDYXB0dXJlZEhvb2tzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JDYXB0dXJlZEhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FwdHVyZWRIb29rc1tpXShlcnIsIGV4cG9zZWRJbnN0YW5jZSwgZXJyb3JJbmZvKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN1ciA9IGN1ci5wYXJlbnQ7XG4gICAgfVxuICAgIGNvbnN0IGFwcEVycm9ySGFuZGxlciA9IGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnLmVycm9ySGFuZGxlcjtcbiAgICBpZiAoYXBwRXJyb3JIYW5kbGVyKSB7XG4gICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICBjYWxsV2l0aEVycm9ySGFuZGxpbmcoXG4gICAgICAgIGFwcEVycm9ySGFuZGxlcixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgMTAsXG4gICAgICAgIFtlcnIsIGV4cG9zZWRJbnN0YW5jZSwgZXJyb3JJbmZvXVxuICAgICAgKTtcbiAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgbG9nRXJyb3IoZXJyLCB0eXBlLCBjb250ZXh0Vk5vZGUsIHRocm93SW5EZXYpO1xufVxuZnVuY3Rpb24gbG9nRXJyb3IoZXJyLCB0eXBlLCBjb250ZXh0Vk5vZGUsIHRocm93SW5EZXYgPSB0cnVlKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3QgaW5mbyA9IEVycm9yVHlwZVN0cmluZ3MkMVt0eXBlXTtcbiAgICBpZiAoY29udGV4dFZOb2RlKSB7XG4gICAgICBwdXNoV2FybmluZ0NvbnRleHQoY29udGV4dFZOb2RlKTtcbiAgICB9XG4gICAgd2FybiQxKGBVbmhhbmRsZWQgZXJyb3Ike2luZm8gPyBgIGR1cmluZyBleGVjdXRpb24gb2YgJHtpbmZvfWAgOiBgYH1gKTtcbiAgICBpZiAoY29udGV4dFZOb2RlKSB7XG4gICAgICBwb3BXYXJuaW5nQ29udGV4dCgpO1xuICAgIH1cbiAgICBpZiAodGhyb3dJbkRldikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfVxufVxuXG5sZXQgaXNGbHVzaGluZyA9IGZhbHNlO1xubGV0IGlzRmx1c2hQZW5kaW5nID0gZmFsc2U7XG5jb25zdCBxdWV1ZSA9IFtdO1xubGV0IGZsdXNoSW5kZXggPSAwO1xuY29uc3QgcGVuZGluZ1Bvc3RGbHVzaENicyA9IFtdO1xubGV0IGFjdGl2ZVBvc3RGbHVzaENicyA9IG51bGw7XG5sZXQgcG9zdEZsdXNoSW5kZXggPSAwO1xuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gLyogQF9fUFVSRV9fICovIFByb21pc2UucmVzb2x2ZSgpO1xubGV0IGN1cnJlbnRGbHVzaFByb21pc2UgPSBudWxsO1xuY29uc3QgUkVDVVJTSU9OX0xJTUlUID0gMTAwO1xuZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgY29uc3QgcCA9IGN1cnJlbnRGbHVzaFByb21pc2UgfHwgcmVzb2x2ZWRQcm9taXNlO1xuICByZXR1cm4gZm4gPyBwLnRoZW4odGhpcyA/IGZuLmJpbmQodGhpcykgOiBmbikgOiBwO1xufVxuZnVuY3Rpb24gZmluZEluc2VydGlvbkluZGV4KGlkKSB7XG4gIGxldCBzdGFydCA9IGZsdXNoSW5kZXggKyAxO1xuICBsZXQgZW5kID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBtaWRkbGUgPSBzdGFydCArIGVuZCA+Pj4gMTtcbiAgICBjb25zdCBtaWRkbGVKb2IgPSBxdWV1ZVttaWRkbGVdO1xuICAgIGNvbnN0IG1pZGRsZUpvYklkID0gZ2V0SWQobWlkZGxlSm9iKTtcbiAgICBpZiAobWlkZGxlSm9iSWQgPCBpZCB8fCBtaWRkbGVKb2JJZCA9PT0gaWQgJiYgbWlkZGxlSm9iLnByZSkge1xuICAgICAgc3RhcnQgPSBtaWRkbGUgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmQgPSBtaWRkbGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGFydDtcbn1cbmZ1bmN0aW9uIHF1ZXVlSm9iKGpvYikge1xuICBpZiAoIXF1ZXVlLmxlbmd0aCB8fCAhcXVldWUuaW5jbHVkZXMoXG4gICAgam9iLFxuICAgIGlzRmx1c2hpbmcgJiYgam9iLmFsbG93UmVjdXJzZSA/IGZsdXNoSW5kZXggKyAxIDogZmx1c2hJbmRleFxuICApKSB7XG4gICAgaWYgKGpvYi5pZCA9PSBudWxsKSB7XG4gICAgICBxdWV1ZS5wdXNoKGpvYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlLnNwbGljZShmaW5kSW5zZXJ0aW9uSW5kZXgoam9iLmlkKSwgMCwgam9iKTtcbiAgICB9XG4gICAgcXVldWVGbHVzaCgpO1xuICB9XG59XG5mdW5jdGlvbiBxdWV1ZUZsdXNoKCkge1xuICBpZiAoIWlzRmx1c2hpbmcgJiYgIWlzRmx1c2hQZW5kaW5nKSB7XG4gICAgaXNGbHVzaFBlbmRpbmcgPSB0cnVlO1xuICAgIGN1cnJlbnRGbHVzaFByb21pc2UgPSByZXNvbHZlZFByb21pc2UudGhlbihmbHVzaEpvYnMpO1xuICB9XG59XG5mdW5jdGlvbiBpbnZhbGlkYXRlSm9iKGpvYikge1xuICBjb25zdCBpID0gcXVldWUuaW5kZXhPZihqb2IpO1xuICBpZiAoaSA+IGZsdXNoSW5kZXgpIHtcbiAgICBxdWV1ZS5zcGxpY2UoaSwgMSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHF1ZXVlUG9zdEZsdXNoQ2IoY2IpIHtcbiAgaWYgKCFpc0FycmF5KGNiKSkge1xuICAgIGlmICghYWN0aXZlUG9zdEZsdXNoQ2JzIHx8ICFhY3RpdmVQb3N0Rmx1c2hDYnMuaW5jbHVkZXMoXG4gICAgICBjYixcbiAgICAgIGNiLmFsbG93UmVjdXJzZSA/IHBvc3RGbHVzaEluZGV4ICsgMSA6IHBvc3RGbHVzaEluZGV4XG4gICAgKSkge1xuICAgICAgcGVuZGluZ1Bvc3RGbHVzaENicy5wdXNoKGNiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGVuZGluZ1Bvc3RGbHVzaENicy5wdXNoKC4uLmNiKTtcbiAgfVxuICBxdWV1ZUZsdXNoKCk7XG59XG5mdW5jdGlvbiBmbHVzaFByZUZsdXNoQ2JzKGluc3RhbmNlLCBzZWVuLCBpID0gaXNGbHVzaGluZyA/IGZsdXNoSW5kZXggKyAxIDogMCkge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHNlZW4gPSBzZWVuIHx8IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIH1cbiAgZm9yICg7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNiID0gcXVldWVbaV07XG4gICAgaWYgKGNiICYmIGNiLnByZSkge1xuICAgICAgaWYgKGluc3RhbmNlICYmIGNiLmlkICE9PSBpbnN0YW5jZS51aWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBjaGVja1JlY3Vyc2l2ZVVwZGF0ZXMoc2VlbiwgY2IpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcXVldWUuc3BsaWNlKGksIDEpO1xuICAgICAgaS0tO1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGZsdXNoUG9zdEZsdXNoQ2JzKHNlZW4pIHtcbiAgaWYgKHBlbmRpbmdQb3N0Rmx1c2hDYnMubGVuZ3RoKSB7XG4gICAgY29uc3QgZGVkdXBlZCA9IFsuLi5uZXcgU2V0KHBlbmRpbmdQb3N0Rmx1c2hDYnMpXS5zb3J0KFxuICAgICAgKGEsIGIpID0+IGdldElkKGEpIC0gZ2V0SWQoYilcbiAgICApO1xuICAgIHBlbmRpbmdQb3N0Rmx1c2hDYnMubGVuZ3RoID0gMDtcbiAgICBpZiAoYWN0aXZlUG9zdEZsdXNoQ2JzKSB7XG4gICAgICBhY3RpdmVQb3N0Rmx1c2hDYnMucHVzaCguLi5kZWR1cGVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYWN0aXZlUG9zdEZsdXNoQ2JzID0gZGVkdXBlZDtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgc2VlbiA9IHNlZW4gfHwgLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZm9yIChwb3N0Rmx1c2hJbmRleCA9IDA7IHBvc3RGbHVzaEluZGV4IDwgYWN0aXZlUG9zdEZsdXNoQ2JzLmxlbmd0aDsgcG9zdEZsdXNoSW5kZXgrKykge1xuICAgICAgY29uc3QgY2IgPSBhY3RpdmVQb3N0Rmx1c2hDYnNbcG9zdEZsdXNoSW5kZXhdO1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY2hlY2tSZWN1cnNpdmVVcGRhdGVzKHNlZW4sIGNiKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjYi5hY3RpdmUgIT09IGZhbHNlKSBjYigpO1xuICAgIH1cbiAgICBhY3RpdmVQb3N0Rmx1c2hDYnMgPSBudWxsO1xuICAgIHBvc3RGbHVzaEluZGV4ID0gMDtcbiAgfVxufVxuY29uc3QgZ2V0SWQgPSAoam9iKSA9PiBqb2IuaWQgPT0gbnVsbCA/IEluZmluaXR5IDogam9iLmlkO1xuY29uc3QgY29tcGFyYXRvciA9IChhLCBiKSA9PiB7XG4gIGNvbnN0IGRpZmYgPSBnZXRJZChhKSAtIGdldElkKGIpO1xuICBpZiAoZGlmZiA9PT0gMCkge1xuICAgIGlmIChhLnByZSAmJiAhYi5wcmUpIHJldHVybiAtMTtcbiAgICBpZiAoYi5wcmUgJiYgIWEucHJlKSByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gZGlmZjtcbn07XG5mdW5jdGlvbiBmbHVzaEpvYnMoc2Vlbikge1xuICBpc0ZsdXNoUGVuZGluZyA9IGZhbHNlO1xuICBpc0ZsdXNoaW5nID0gdHJ1ZTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBzZWVuID0gc2VlbiB8fCAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICB9XG4gIHF1ZXVlLnNvcnQoY29tcGFyYXRvcik7XG4gIGNvbnN0IGNoZWNrID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IChqb2IpID0+IGNoZWNrUmVjdXJzaXZlVXBkYXRlcyhzZWVuLCBqb2IpIDogTk9PUDtcbiAgdHJ5IHtcbiAgICBmb3IgKGZsdXNoSW5kZXggPSAwOyBmbHVzaEluZGV4IDwgcXVldWUubGVuZ3RoOyBmbHVzaEluZGV4KyspIHtcbiAgICAgIGNvbnN0IGpvYiA9IHF1ZXVlW2ZsdXNoSW5kZXhdO1xuICAgICAgaWYgKGpvYiAmJiBqb2IuYWN0aXZlICE9PSBmYWxzZSkge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBjaGVjayhqb2IpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbFdpdGhFcnJvckhhbmRsaW5nKFxuICAgICAgICAgIGpvYixcbiAgICAgICAgICBqb2IuaSxcbiAgICAgICAgICBqb2IuaSA/IDE1IDogMTRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgZmx1c2hJbmRleCA9IDA7XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBmbHVzaFBvc3RGbHVzaENicyhzZWVuKTtcbiAgICBpc0ZsdXNoaW5nID0gZmFsc2U7XG4gICAgY3VycmVudEZsdXNoUHJvbWlzZSA9IG51bGw7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCB8fCBwZW5kaW5nUG9zdEZsdXNoQ2JzLmxlbmd0aCkge1xuICAgICAgZmx1c2hKb2JzKHNlZW4pO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tSZWN1cnNpdmVVcGRhdGVzKHNlZW4sIGZuKSB7XG4gIGlmICghc2Vlbi5oYXMoZm4pKSB7XG4gICAgc2Vlbi5zZXQoZm4sIDEpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNvdW50ID0gc2Vlbi5nZXQoZm4pO1xuICAgIGlmIChjb3VudCA+IFJFQ1VSU0lPTl9MSU1JVCkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBmbi5pO1xuICAgICAgY29uc3QgY29tcG9uZW50TmFtZSA9IGluc3RhbmNlICYmIGdldENvbXBvbmVudE5hbWUoaW5zdGFuY2UudHlwZSk7XG4gICAgICBoYW5kbGVFcnJvcihcbiAgICAgICAgYE1heGltdW0gcmVjdXJzaXZlIHVwZGF0ZXMgZXhjZWVkZWQke2NvbXBvbmVudE5hbWUgPyBgIGluIGNvbXBvbmVudCA8JHtjb21wb25lbnROYW1lfT5gIDogYGB9LiBUaGlzIG1lYW5zIHlvdSBoYXZlIGEgcmVhY3RpdmUgZWZmZWN0IHRoYXQgaXMgbXV0YXRpbmcgaXRzIG93biBkZXBlbmRlbmNpZXMgYW5kIHRodXMgcmVjdXJzaXZlbHkgdHJpZ2dlcmluZyBpdHNlbGYuIFBvc3NpYmxlIHNvdXJjZXMgaW5jbHVkZSBjb21wb25lbnQgdGVtcGxhdGUsIHJlbmRlciBmdW5jdGlvbiwgdXBkYXRlZCBob29rIG9yIHdhdGNoZXIgc291cmNlIGZ1bmN0aW9uLmAsXG4gICAgICAgIG51bGwsXG4gICAgICAgIDEwXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZW4uc2V0KGZuLCBjb3VudCArIDEpO1xuICAgIH1cbiAgfVxufVxuXG5sZXQgaXNIbXJVcGRhdGluZyA9IGZhbHNlO1xuY29uc3QgaG1yRGlydHlDb21wb25lbnRzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbmlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gIGdldEdsb2JhbFRoaXMoKS5fX1ZVRV9ITVJfUlVOVElNRV9fID0ge1xuICAgIGNyZWF0ZVJlY29yZDogdHJ5V3JhcChjcmVhdGVSZWNvcmQpLFxuICAgIHJlcmVuZGVyOiB0cnlXcmFwKHJlcmVuZGVyKSxcbiAgICByZWxvYWQ6IHRyeVdyYXAocmVsb2FkKVxuICB9O1xufVxuY29uc3QgbWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbmZ1bmN0aW9uIHJlZ2lzdGVySE1SKGluc3RhbmNlKSB7XG4gIGNvbnN0IGlkID0gaW5zdGFuY2UudHlwZS5fX2htcklkO1xuICBsZXQgcmVjb3JkID0gbWFwLmdldChpZCk7XG4gIGlmICghcmVjb3JkKSB7XG4gICAgY3JlYXRlUmVjb3JkKGlkLCBpbnN0YW5jZS50eXBlKTtcbiAgICByZWNvcmQgPSBtYXAuZ2V0KGlkKTtcbiAgfVxuICByZWNvcmQuaW5zdGFuY2VzLmFkZChpbnN0YW5jZSk7XG59XG5mdW5jdGlvbiB1bnJlZ2lzdGVySE1SKGluc3RhbmNlKSB7XG4gIG1hcC5nZXQoaW5zdGFuY2UudHlwZS5fX2htcklkKS5pbnN0YW5jZXMuZGVsZXRlKGluc3RhbmNlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJlY29yZChpZCwgaW5pdGlhbERlZikge1xuICBpZiAobWFwLmhhcyhpZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbWFwLnNldChpZCwge1xuICAgIGluaXRpYWxEZWY6IG5vcm1hbGl6ZUNsYXNzQ29tcG9uZW50KGluaXRpYWxEZWYpLFxuICAgIGluc3RhbmNlczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBub3JtYWxpemVDbGFzc0NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgcmV0dXJuIGlzQ2xhc3NDb21wb25lbnQoY29tcG9uZW50KSA/IGNvbXBvbmVudC5fX3ZjY09wdHMgOiBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiByZXJlbmRlcihpZCwgbmV3UmVuZGVyKSB7XG4gIGNvbnN0IHJlY29yZCA9IG1hcC5nZXQoaWQpO1xuICBpZiAoIXJlY29yZCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZWNvcmQuaW5pdGlhbERlZi5yZW5kZXIgPSBuZXdSZW5kZXI7XG4gIFsuLi5yZWNvcmQuaW5zdGFuY2VzXS5mb3JFYWNoKChpbnN0YW5jZSkgPT4ge1xuICAgIGlmIChuZXdSZW5kZXIpIHtcbiAgICAgIGluc3RhbmNlLnJlbmRlciA9IG5ld1JlbmRlcjtcbiAgICAgIG5vcm1hbGl6ZUNsYXNzQ29tcG9uZW50KGluc3RhbmNlLnR5cGUpLnJlbmRlciA9IG5ld1JlbmRlcjtcbiAgICB9XG4gICAgaW5zdGFuY2UucmVuZGVyQ2FjaGUgPSBbXTtcbiAgICBpc0htclVwZGF0aW5nID0gdHJ1ZTtcbiAgICBpbnN0YW5jZS5lZmZlY3QuZGlydHkgPSB0cnVlO1xuICAgIGluc3RhbmNlLnVwZGF0ZSgpO1xuICAgIGlzSG1yVXBkYXRpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWxvYWQoaWQsIG5ld0NvbXApIHtcbiAgY29uc3QgcmVjb3JkID0gbWFwLmdldChpZCk7XG4gIGlmICghcmVjb3JkKSByZXR1cm47XG4gIG5ld0NvbXAgPSBub3JtYWxpemVDbGFzc0NvbXBvbmVudChuZXdDb21wKTtcbiAgdXBkYXRlQ29tcG9uZW50RGVmKHJlY29yZC5pbml0aWFsRGVmLCBuZXdDb21wKTtcbiAgY29uc3QgaW5zdGFuY2VzID0gWy4uLnJlY29yZC5pbnN0YW5jZXNdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzW2ldO1xuICAgIGNvbnN0IG9sZENvbXAgPSBub3JtYWxpemVDbGFzc0NvbXBvbmVudChpbnN0YW5jZS50eXBlKTtcbiAgICBsZXQgZGlydHlJbnN0YW5jZXMgPSBobXJEaXJ0eUNvbXBvbmVudHMuZ2V0KG9sZENvbXApO1xuICAgIGlmICghZGlydHlJbnN0YW5jZXMpIHtcbiAgICAgIGlmIChvbGRDb21wICE9PSByZWNvcmQuaW5pdGlhbERlZikge1xuICAgICAgICB1cGRhdGVDb21wb25lbnREZWYob2xkQ29tcCwgbmV3Q29tcCk7XG4gICAgICB9XG4gICAgICBobXJEaXJ0eUNvbXBvbmVudHMuc2V0KG9sZENvbXAsIGRpcnR5SW5zdGFuY2VzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSk7XG4gICAgfVxuICAgIGRpcnR5SW5zdGFuY2VzLmFkZChpbnN0YW5jZSk7XG4gICAgaW5zdGFuY2UuYXBwQ29udGV4dC5wcm9wc0NhY2hlLmRlbGV0ZShpbnN0YW5jZS50eXBlKTtcbiAgICBpbnN0YW5jZS5hcHBDb250ZXh0LmVtaXRzQ2FjaGUuZGVsZXRlKGluc3RhbmNlLnR5cGUpO1xuICAgIGluc3RhbmNlLmFwcENvbnRleHQub3B0aW9uc0NhY2hlLmRlbGV0ZShpbnN0YW5jZS50eXBlKTtcbiAgICBpZiAoaW5zdGFuY2UuY2VSZWxvYWQpIHtcbiAgICAgIGRpcnR5SW5zdGFuY2VzLmFkZChpbnN0YW5jZSk7XG4gICAgICBpbnN0YW5jZS5jZVJlbG9hZChuZXdDb21wLnN0eWxlcyk7XG4gICAgICBkaXJ0eUluc3RhbmNlcy5kZWxldGUoaW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UucGFyZW50KSB7XG4gICAgICBpbnN0YW5jZS5wYXJlbnQuZWZmZWN0LmRpcnR5ID0gdHJ1ZTtcbiAgICAgIHF1ZXVlSm9iKCgpID0+IHtcbiAgICAgICAgaW5zdGFuY2UucGFyZW50LnVwZGF0ZSgpO1xuICAgICAgICBkaXJ0eUluc3RhbmNlcy5kZWxldGUoaW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZS5hcHBDb250ZXh0LnJlbG9hZCkge1xuICAgICAgaW5zdGFuY2UuYXBwQ29udGV4dC5yZWxvYWQoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIltITVJdIFJvb3Qgb3IgbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSBtb2RpZmllZC4gRnVsbCByZWxvYWQgcmVxdWlyZWQuXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHF1ZXVlUG9zdEZsdXNoQ2IoKCkgPT4ge1xuICAgIGhtckRpcnR5Q29tcG9uZW50cy5jbGVhcigpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudERlZihvbGRDb21wLCBuZXdDb21wKSB7XG4gIGV4dGVuZChvbGRDb21wLCBuZXdDb21wKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gb2xkQ29tcCkge1xuICAgIGlmIChrZXkgIT09IFwiX19maWxlXCIgJiYgIShrZXkgaW4gbmV3Q29tcCkpIHtcbiAgICAgIGRlbGV0ZSBvbGRDb21wW2tleV07XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB0cnlXcmFwKGZuKSB7XG4gIHJldHVybiAoaWQsIGFyZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZm4oaWQsIGFyZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFtITVJdIFNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBWdWUgY29tcG9uZW50IGhvdC1yZWxvYWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLmBcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5sZXQgZGV2dG9vbHMkMTtcbmxldCBidWZmZXIgPSBbXTtcbmxldCBkZXZ0b29sc05vdEluc3RhbGxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gZW1pdCQxKGV2ZW50LCAuLi5hcmdzKSB7XG4gIGlmIChkZXZ0b29scyQxKSB7XG4gICAgZGV2dG9vbHMkMS5lbWl0KGV2ZW50LCAuLi5hcmdzKTtcbiAgfSBlbHNlIGlmICghZGV2dG9vbHNOb3RJbnN0YWxsZWQpIHtcbiAgICBidWZmZXIucHVzaCh7IGV2ZW50LCBhcmdzIH0pO1xuICB9XG59XG5mdW5jdGlvbiBzZXREZXZ0b29sc0hvb2skMShob29rLCB0YXJnZXQpIHtcbiAgdmFyIF9hLCBfYjtcbiAgZGV2dG9vbHMkMSA9IGhvb2s7XG4gIGlmIChkZXZ0b29scyQxKSB7XG4gICAgZGV2dG9vbHMkMS5lbmFibGVkID0gdHJ1ZTtcbiAgICBidWZmZXIuZm9yRWFjaCgoeyBldmVudCwgYXJncyB9KSA9PiBkZXZ0b29scyQxLmVtaXQoZXZlbnQsIC4uLmFyZ3MpKTtcbiAgICBidWZmZXIgPSBbXTtcbiAgfSBlbHNlIGlmIChcbiAgICAvLyBoYW5kbGUgbGF0ZSBkZXZ0b29scyBpbmplY3Rpb24gLSBvbmx5IGRvIHRoaXMgaWYgd2UgYXJlIGluIGFuIGFjdHVhbFxuICAgIC8vIGJyb3dzZXIgZW52aXJvbm1lbnQgdG8gYXZvaWQgdGhlIHRpbWVyIGhhbmRsZSBzdGFsbGluZyB0ZXN0IHJ1bm5lciBleGl0XG4gICAgLy8gKCM0ODE1KVxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgLy8gc29tZSBlbnZzIG1vY2sgd2luZG93IGJ1dCBub3QgZnVsbHlcbiAgICB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgLy8gYWxzbyBleGNsdWRlIGpzZG9tXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgISgoX2IgPSAoX2EgPSB3aW5kb3cubmF2aWdhdG9yKSA9PSBudWxsID8gdm9pZCAwIDogX2EudXNlckFnZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2IuaW5jbHVkZXMoXCJqc2RvbVwiKSlcbiAgKSB7XG4gICAgY29uc3QgcmVwbGF5ID0gdGFyZ2V0Ll9fVlVFX0RFVlRPT0xTX0hPT0tfUkVQTEFZX18gPSB0YXJnZXQuX19WVUVfREVWVE9PTFNfSE9PS19SRVBMQVlfXyB8fCBbXTtcbiAgICByZXBsYXkucHVzaCgobmV3SG9vaykgPT4ge1xuICAgICAgc2V0RGV2dG9vbHNIb29rJDEobmV3SG9vaywgdGFyZ2V0KTtcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghZGV2dG9vbHMkMSkge1xuICAgICAgICB0YXJnZXQuX19WVUVfREVWVE9PTFNfSE9PS19SRVBMQVlfXyA9IG51bGw7XG4gICAgICAgIGRldnRvb2xzTm90SW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgYnVmZmVyID0gW107XG4gICAgICB9XG4gICAgfSwgM2UzKTtcbiAgfSBlbHNlIHtcbiAgICBkZXZ0b29sc05vdEluc3RhbGxlZCA9IHRydWU7XG4gICAgYnVmZmVyID0gW107XG4gIH1cbn1cbmZ1bmN0aW9uIGRldnRvb2xzSW5pdEFwcChhcHAsIHZlcnNpb24pIHtcbiAgZW1pdCQxKFwiYXBwOmluaXRcIiAvKiBBUFBfSU5JVCAqLywgYXBwLCB2ZXJzaW9uLCB7XG4gICAgRnJhZ21lbnQsXG4gICAgVGV4dCxcbiAgICBDb21tZW50LFxuICAgIFN0YXRpY1xuICB9KTtcbn1cbmZ1bmN0aW9uIGRldnRvb2xzVW5tb3VudEFwcChhcHApIHtcbiAgZW1pdCQxKFwiYXBwOnVubW91bnRcIiAvKiBBUFBfVU5NT1VOVCAqLywgYXBwKTtcbn1cbmNvbnN0IGRldnRvb2xzQ29tcG9uZW50QWRkZWQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRGV2dG9vbHNDb21wb25lbnRIb29rKFxuICBcImNvbXBvbmVudDphZGRlZFwiIC8qIENPTVBPTkVOVF9BRERFRCAqL1xuKTtcbmNvbnN0IGRldnRvb2xzQ29tcG9uZW50VXBkYXRlZCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVEZXZ0b29sc0NvbXBvbmVudEhvb2soXCJjb21wb25lbnQ6dXBkYXRlZFwiIC8qIENPTVBPTkVOVF9VUERBVEVEICovKTtcbmNvbnN0IF9kZXZ0b29sc0NvbXBvbmVudFJlbW92ZWQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRGV2dG9vbHNDb21wb25lbnRIb29rKFxuICBcImNvbXBvbmVudDpyZW1vdmVkXCIgLyogQ09NUE9ORU5UX1JFTU9WRUQgKi9cbik7XG5jb25zdCBkZXZ0b29sc0NvbXBvbmVudFJlbW92ZWQgPSAoY29tcG9uZW50KSA9PiB7XG4gIGlmIChkZXZ0b29scyQxICYmIHR5cGVvZiBkZXZ0b29scyQxLmNsZWFudXBCdWZmZXIgPT09IFwiZnVuY3Rpb25cIiAmJiAvLyByZW1vdmUgdGhlIGNvbXBvbmVudCBpZiBpdCB3YXNuJ3QgYnVmZmVyZWRcbiAgIWRldnRvb2xzJDEuY2xlYW51cEJ1ZmZlcihjb21wb25lbnQpKSB7XG4gICAgX2RldnRvb2xzQ29tcG9uZW50UmVtb3ZlZChjb21wb25lbnQpO1xuICB9XG59O1xuLyohICNfX05PX1NJREVfRUZGRUNUU19fICovXG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlRGV2dG9vbHNDb21wb25lbnRIb29rKGhvb2spIHtcbiAgcmV0dXJuIChjb21wb25lbnQpID0+IHtcbiAgICBlbWl0JDEoXG4gICAgICBob29rLFxuICAgICAgY29tcG9uZW50LmFwcENvbnRleHQuYXBwLFxuICAgICAgY29tcG9uZW50LnVpZCxcbiAgICAgIGNvbXBvbmVudC5wYXJlbnQgPyBjb21wb25lbnQucGFyZW50LnVpZCA6IHZvaWQgMCxcbiAgICAgIGNvbXBvbmVudFxuICAgICk7XG4gIH07XG59XG5jb25zdCBkZXZ0b29sc1BlcmZTdGFydCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVEZXZ0b29sc1BlcmZvcm1hbmNlSG9vayhcbiAgXCJwZXJmOnN0YXJ0XCIgLyogUEVSRk9STUFOQ0VfU1RBUlQgKi9cbik7XG5jb25zdCBkZXZ0b29sc1BlcmZFbmQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRGV2dG9vbHNQZXJmb3JtYW5jZUhvb2soXG4gIFwicGVyZjplbmRcIiAvKiBQRVJGT1JNQU5DRV9FTkQgKi9cbik7XG5mdW5jdGlvbiBjcmVhdGVEZXZ0b29sc1BlcmZvcm1hbmNlSG9vayhob29rKSB7XG4gIHJldHVybiAoY29tcG9uZW50LCB0eXBlLCB0aW1lKSA9PiB7XG4gICAgZW1pdCQxKGhvb2ssIGNvbXBvbmVudC5hcHBDb250ZXh0LmFwcCwgY29tcG9uZW50LnVpZCwgY29tcG9uZW50LCB0eXBlLCB0aW1lKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGRldnRvb2xzQ29tcG9uZW50RW1pdChjb21wb25lbnQsIGV2ZW50LCBwYXJhbXMpIHtcbiAgZW1pdCQxKFxuICAgIFwiY29tcG9uZW50OmVtaXRcIiAvKiBDT01QT05FTlRfRU1JVCAqLyxcbiAgICBjb21wb25lbnQuYXBwQ29udGV4dC5hcHAsXG4gICAgY29tcG9uZW50LFxuICAgIGV2ZW50LFxuICAgIHBhcmFtc1xuICApO1xufVxuXG5sZXQgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlID0gbnVsbDtcbmxldCBjdXJyZW50U2NvcGVJZCA9IG51bGw7XG5mdW5jdGlvbiBzZXRDdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgY29uc3QgcHJldiA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZTtcbiAgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlID0gaW5zdGFuY2U7XG4gIGN1cnJlbnRTY29wZUlkID0gaW5zdGFuY2UgJiYgaW5zdGFuY2UudHlwZS5fX3Njb3BlSWQgfHwgbnVsbDtcbiAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiBwdXNoU2NvcGVJZChpZCkge1xuICBjdXJyZW50U2NvcGVJZCA9IGlkO1xufVxuZnVuY3Rpb24gcG9wU2NvcGVJZCgpIHtcbiAgY3VycmVudFNjb3BlSWQgPSBudWxsO1xufVxuY29uc3Qgd2l0aFNjb3BlSWQgPSAoX2lkKSA9PiB3aXRoQ3R4O1xuZnVuY3Rpb24gd2l0aEN0eChmbiwgY3R4ID0gY3VycmVudFJlbmRlcmluZ0luc3RhbmNlLCBpc05vblNjb3BlZFNsb3QpIHtcbiAgaWYgKCFjdHgpIHJldHVybiBmbjtcbiAgaWYgKGZuLl9uKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG4gIGNvbnN0IHJlbmRlckZuV2l0aENvbnRleHQgPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChyZW5kZXJGbldpdGhDb250ZXh0Ll9kKSB7XG4gICAgICBzZXRCbG9ja1RyYWNraW5nKC0xKTtcbiAgICB9XG4gICAgY29uc3QgcHJldkluc3RhbmNlID0gc2V0Q3VycmVudFJlbmRlcmluZ0luc3RhbmNlKGN0eCk7XG4gICAgbGV0IHJlcztcbiAgICB0cnkge1xuICAgICAgcmVzID0gZm4oLi4uYXJncyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZShwcmV2SW5zdGFuY2UpO1xuICAgICAgaWYgKHJlbmRlckZuV2l0aENvbnRleHQuX2QpIHtcbiAgICAgICAgc2V0QmxvY2tUcmFja2luZygxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBkZXZ0b29sc0NvbXBvbmVudFVwZGF0ZWQoY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgcmVuZGVyRm5XaXRoQ29udGV4dC5fbiA9IHRydWU7XG4gIHJlbmRlckZuV2l0aENvbnRleHQuX2MgPSB0cnVlO1xuICByZW5kZXJGbldpdGhDb250ZXh0Ll9kID0gdHJ1ZTtcbiAgcmV0dXJuIHJlbmRlckZuV2l0aENvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGlyZWN0aXZlTmFtZShuYW1lKSB7XG4gIGlmIChpc0J1aWx0SW5EaXJlY3RpdmUobmFtZSkpIHtcbiAgICB3YXJuJDEoXCJEbyBub3QgdXNlIGJ1aWx0LWluIGRpcmVjdGl2ZSBpZHMgYXMgY3VzdG9tIGRpcmVjdGl2ZSBpZDogXCIgKyBuYW1lKTtcbiAgfVxufVxuZnVuY3Rpb24gd2l0aERpcmVjdGl2ZXModm5vZGUsIGRpcmVjdGl2ZXMpIHtcbiAgaWYgKGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGB3aXRoRGlyZWN0aXZlcyBjYW4gb25seSBiZSB1c2VkIGluc2lkZSByZW5kZXIgZnVuY3Rpb25zLmApO1xuICAgIHJldHVybiB2bm9kZTtcbiAgfVxuICBjb25zdCBpbnN0YW5jZSA9IGdldENvbXBvbmVudFB1YmxpY0luc3RhbmNlKGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSk7XG4gIGNvbnN0IGJpbmRpbmdzID0gdm5vZGUuZGlycyB8fCAodm5vZGUuZGlycyA9IFtdKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3RpdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IFtkaXIsIHZhbHVlLCBhcmcsIG1vZGlmaWVycyA9IEVNUFRZX09CSl0gPSBkaXJlY3RpdmVzW2ldO1xuICAgIGlmIChkaXIpIHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGRpcikpIHtcbiAgICAgICAgZGlyID0ge1xuICAgICAgICAgIG1vdW50ZWQ6IGRpcixcbiAgICAgICAgICB1cGRhdGVkOiBkaXJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXIuZGVlcCkge1xuICAgICAgICB0cmF2ZXJzZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgZGlyLFxuICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIG9sZFZhbHVlOiB2b2lkIDAsXG4gICAgICAgIGFyZyxcbiAgICAgICAgbW9kaWZpZXJzXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZub2RlO1xufVxuZnVuY3Rpb24gaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgcHJldlZOb2RlLCBpbnN0YW5jZSwgbmFtZSkge1xuICBjb25zdCBiaW5kaW5ncyA9IHZub2RlLmRpcnM7XG4gIGNvbnN0IG9sZEJpbmRpbmdzID0gcHJldlZOb2RlICYmIHByZXZWTm9kZS5kaXJzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYmluZGluZyA9IGJpbmRpbmdzW2ldO1xuICAgIGlmIChvbGRCaW5kaW5ncykge1xuICAgICAgYmluZGluZy5vbGRWYWx1ZSA9IG9sZEJpbmRpbmdzW2ldLnZhbHVlO1xuICAgIH1cbiAgICBsZXQgaG9vayA9IGJpbmRpbmcuZGlyW25hbWVdO1xuICAgIGlmIChob29rKSB7XG4gICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhob29rLCBpbnN0YW5jZSwgOCwgW1xuICAgICAgICB2bm9kZS5lbCxcbiAgICAgICAgYmluZGluZyxcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIHByZXZWTm9kZVxuICAgICAgXSk7XG4gICAgICByZXNldFRyYWNraW5nKCk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGxlYXZlQ2JLZXkgPSBTeW1ib2woXCJfbGVhdmVDYlwiKTtcbmNvbnN0IGVudGVyQ2JLZXkgPSBTeW1ib2woXCJfZW50ZXJDYlwiKTtcbmZ1bmN0aW9uIHVzZVRyYW5zaXRpb25TdGF0ZSgpIHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICBpc0xlYXZpbmc6IGZhbHNlLFxuICAgIGlzVW5tb3VudGluZzogZmFsc2UsXG4gICAgbGVhdmluZ1ZOb2RlczogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKVxuICB9O1xuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHN0YXRlLmlzTW91bnRlZCA9IHRydWU7XG4gIH0pO1xuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHN0YXRlLmlzVW5tb3VudGluZyA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gc3RhdGU7XG59XG5jb25zdCBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvciA9IFtGdW5jdGlvbiwgQXJyYXldO1xuY29uc3QgQmFzZVRyYW5zaXRpb25Qcm9wc1ZhbGlkYXRvcnMgPSB7XG4gIG1vZGU6IFN0cmluZyxcbiAgYXBwZWFyOiBCb29sZWFuLFxuICBwZXJzaXN0ZWQ6IEJvb2xlYW4sXG4gIC8vIGVudGVyXG4gIG9uQmVmb3JlRW50ZXI6IFRyYW5zaXRpb25Ib29rVmFsaWRhdG9yLFxuICBvbkVudGVyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckVudGVyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25FbnRlckNhbmNlbGxlZDogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIC8vIGxlYXZlXG4gIG9uQmVmb3JlTGVhdmU6IFRyYW5zaXRpb25Ib29rVmFsaWRhdG9yLFxuICBvbkxlYXZlOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckxlYXZlOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25MZWF2ZUNhbmNlbGxlZDogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIC8vIGFwcGVhclxuICBvbkJlZm9yZUFwcGVhcjogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIG9uQXBwZWFyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckFwcGVhcjogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIG9uQXBwZWFyQ2FuY2VsbGVkOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvclxufTtcbmNvbnN0IHJlY3Vyc2l2ZUdldFN1YnRyZWUgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3Qgc3ViVHJlZSA9IGluc3RhbmNlLnN1YlRyZWU7XG4gIHJldHVybiBzdWJUcmVlLmNvbXBvbmVudCA/IHJlY3Vyc2l2ZUdldFN1YnRyZWUoc3ViVHJlZS5jb21wb25lbnQpIDogc3ViVHJlZTtcbn07XG5jb25zdCBCYXNlVHJhbnNpdGlvbkltcGwgPSB7XG4gIG5hbWU6IGBCYXNlVHJhbnNpdGlvbmAsXG4gIHByb3BzOiBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc3RhdGUgPSB1c2VUcmFuc2l0aW9uU3RhdGUoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBzbG90cy5kZWZhdWx0ICYmIGdldFRyYW5zaXRpb25SYXdDaGlsZHJlbihzbG90cy5kZWZhdWx0KCksIHRydWUpO1xuICAgICAgaWYgKCFjaGlsZHJlbiB8fCAhY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuWzBdO1xuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IGhhc0ZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmIChjLnR5cGUgIT09IENvbW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGhhc0ZvdW5kKSB7XG4gICAgICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgICAgICBcIjx0cmFuc2l0aW9uPiBjYW4gb25seSBiZSB1c2VkIG9uIGEgc2luZ2xlIGVsZW1lbnQgb3IgY29tcG9uZW50LiBVc2UgPHRyYW5zaXRpb24tZ3JvdXA+IGZvciBsaXN0cy5cIlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkID0gYztcbiAgICAgICAgICAgIGhhc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCByYXdQcm9wcyA9IHRvUmF3KHByb3BzKTtcbiAgICAgIGNvbnN0IHsgbW9kZSB9ID0gcmF3UHJvcHM7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBtb2RlICYmIG1vZGUgIT09IFwiaW4tb3V0XCIgJiYgbW9kZSAhPT0gXCJvdXQtaW5cIiAmJiBtb2RlICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICB3YXJuJDEoYGludmFsaWQgPHRyYW5zaXRpb24+IG1vZGU6ICR7bW9kZX1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5pc0xlYXZpbmcpIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5UGxhY2Vob2xkZXIoY2hpbGQpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5uZXJDaGlsZCA9IGdldEtlZXBBbGl2ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGlmICghaW5uZXJDaGlsZCkge1xuICAgICAgICByZXR1cm4gZW1wdHlQbGFjZWhvbGRlcihjaGlsZCk7XG4gICAgICB9XG4gICAgICBsZXQgZW50ZXJIb29rcyA9IHJlc29sdmVUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgIGlubmVyQ2hpbGQsXG4gICAgICAgIHJhd1Byb3BzLFxuICAgICAgICBzdGF0ZSxcbiAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgIC8vICMxMTA2MSwgZW5zdXJlIGVudGVySG9va3MgaXMgZnJlc2ggYWZ0ZXIgY2xvbmVcbiAgICAgICAgKGhvb2tzKSA9PiBlbnRlckhvb2tzID0gaG9va3NcbiAgICAgICk7XG4gICAgICBzZXRUcmFuc2l0aW9uSG9va3MoaW5uZXJDaGlsZCwgZW50ZXJIb29rcyk7XG4gICAgICBjb25zdCBvbGRDaGlsZCA9IGluc3RhbmNlLnN1YlRyZWU7XG4gICAgICBjb25zdCBvbGRJbm5lckNoaWxkID0gb2xkQ2hpbGQgJiYgZ2V0S2VlcEFsaXZlQ2hpbGQob2xkQ2hpbGQpO1xuICAgICAgaWYgKG9sZElubmVyQ2hpbGQgJiYgb2xkSW5uZXJDaGlsZC50eXBlICE9PSBDb21tZW50ICYmICFpc1NhbWVWTm9kZVR5cGUoaW5uZXJDaGlsZCwgb2xkSW5uZXJDaGlsZCkgJiYgcmVjdXJzaXZlR2V0U3VidHJlZShpbnN0YW5jZSkudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICBjb25zdCBsZWF2aW5nSG9va3MgPSByZXNvbHZlVHJhbnNpdGlvbkhvb2tzKFxuICAgICAgICAgIG9sZElubmVyQ2hpbGQsXG4gICAgICAgICAgcmF3UHJvcHMsXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgaW5zdGFuY2VcbiAgICAgICAgKTtcbiAgICAgICAgc2V0VHJhbnNpdGlvbkhvb2tzKG9sZElubmVyQ2hpbGQsIGxlYXZpbmdIb29rcyk7XG4gICAgICAgIGlmIChtb2RlID09PSBcIm91dC1pblwiICYmIGlubmVyQ2hpbGQudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICAgIHN0YXRlLmlzTGVhdmluZyA9IHRydWU7XG4gICAgICAgICAgbGVhdmluZ0hvb2tzLmFmdGVyTGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS5pc0xlYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS51cGRhdGUuYWN0aXZlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBpbnN0YW5jZS5lZmZlY3QuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBlbXB0eVBsYWNlaG9sZGVyKGNoaWxkKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSBcImluLW91dFwiICYmIGlubmVyQ2hpbGQudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICAgIGxlYXZpbmdIb29rcy5kZWxheUxlYXZlID0gKGVsLCBlYXJseVJlbW92ZSwgZGVsYXllZExlYXZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsZWF2aW5nVk5vZGVzQ2FjaGUgPSBnZXRMZWF2aW5nTm9kZXNGb3JUeXBlKFxuICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgb2xkSW5uZXJDaGlsZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxlYXZpbmdWTm9kZXNDYWNoZVtTdHJpbmcob2xkSW5uZXJDaGlsZC5rZXkpXSA9IG9sZElubmVyQ2hpbGQ7XG4gICAgICAgICAgICBlbFtsZWF2ZUNiS2V5XSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZWFybHlSZW1vdmUoKTtcbiAgICAgICAgICAgICAgZWxbbGVhdmVDYktleV0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgIGRlbGV0ZSBlbnRlckhvb2tzLmRlbGF5ZWRMZWF2ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlbnRlckhvb2tzLmRlbGF5ZWRMZWF2ZSA9IGRlbGF5ZWRMZWF2ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgfVxufTtcbmNvbnN0IEJhc2VUcmFuc2l0aW9uID0gQmFzZVRyYW5zaXRpb25JbXBsO1xuZnVuY3Rpb24gZ2V0TGVhdmluZ05vZGVzRm9yVHlwZShzdGF0ZSwgdm5vZGUpIHtcbiAgY29uc3QgeyBsZWF2aW5nVk5vZGVzIH0gPSBzdGF0ZTtcbiAgbGV0IGxlYXZpbmdWTm9kZXNDYWNoZSA9IGxlYXZpbmdWTm9kZXMuZ2V0KHZub2RlLnR5cGUpO1xuICBpZiAoIWxlYXZpbmdWTm9kZXNDYWNoZSkge1xuICAgIGxlYXZpbmdWTm9kZXNDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGxlYXZpbmdWTm9kZXMuc2V0KHZub2RlLnR5cGUsIGxlYXZpbmdWTm9kZXNDYWNoZSk7XG4gIH1cbiAgcmV0dXJuIGxlYXZpbmdWTm9kZXNDYWNoZTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVUcmFuc2l0aW9uSG9va3Modm5vZGUsIHByb3BzLCBzdGF0ZSwgaW5zdGFuY2UsIHBvc3RDbG9uZSkge1xuICBjb25zdCB7XG4gICAgYXBwZWFyLFxuICAgIG1vZGUsXG4gICAgcGVyc2lzdGVkID0gZmFsc2UsXG4gICAgb25CZWZvcmVFbnRlcixcbiAgICBvbkVudGVyLFxuICAgIG9uQWZ0ZXJFbnRlcixcbiAgICBvbkVudGVyQ2FuY2VsbGVkLFxuICAgIG9uQmVmb3JlTGVhdmUsXG4gICAgb25MZWF2ZSxcbiAgICBvbkFmdGVyTGVhdmUsXG4gICAgb25MZWF2ZUNhbmNlbGxlZCxcbiAgICBvbkJlZm9yZUFwcGVhcixcbiAgICBvbkFwcGVhcixcbiAgICBvbkFmdGVyQXBwZWFyLFxuICAgIG9uQXBwZWFyQ2FuY2VsbGVkXG4gIH0gPSBwcm9wcztcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZub2RlLmtleSk7XG4gIGNvbnN0IGxlYXZpbmdWTm9kZXNDYWNoZSA9IGdldExlYXZpbmdOb2Rlc0ZvclR5cGUoc3RhdGUsIHZub2RlKTtcbiAgY29uc3QgY2FsbEhvb2sgPSAoaG9vaywgYXJncykgPT4ge1xuICAgIGhvb2sgJiYgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoXG4gICAgICBob29rLFxuICAgICAgaW5zdGFuY2UsXG4gICAgICA5LFxuICAgICAgYXJnc1xuICAgICk7XG4gIH07XG4gIGNvbnN0IGNhbGxBc3luY0hvb2sgPSAoaG9vaywgYXJncykgPT4ge1xuICAgIGNvbnN0IGRvbmUgPSBhcmdzWzFdO1xuICAgIGNhbGxIb29rKGhvb2ssIGFyZ3MpO1xuICAgIGlmIChpc0FycmF5KGhvb2spKSB7XG4gICAgICBpZiAoaG9vay5ldmVyeSgoaG9vazIpID0+IGhvb2syLmxlbmd0aCA8PSAxKSkgZG9uZSgpO1xuICAgIH0gZWxzZSBpZiAoaG9vay5sZW5ndGggPD0gMSkge1xuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgaG9va3MgPSB7XG4gICAgbW9kZSxcbiAgICBwZXJzaXN0ZWQsXG4gICAgYmVmb3JlRW50ZXIoZWwpIHtcbiAgICAgIGxldCBob29rID0gb25CZWZvcmVFbnRlcjtcbiAgICAgIGlmICghc3RhdGUuaXNNb3VudGVkKSB7XG4gICAgICAgIGlmIChhcHBlYXIpIHtcbiAgICAgICAgICBob29rID0gb25CZWZvcmVBcHBlYXIgfHwgb25CZWZvcmVFbnRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlbFtsZWF2ZUNiS2V5XSkge1xuICAgICAgICBlbFtsZWF2ZUNiS2V5XShcbiAgICAgICAgICB0cnVlXG4gICAgICAgICAgLyogY2FuY2VsbGVkICovXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBsZWF2aW5nVk5vZGUgPSBsZWF2aW5nVk5vZGVzQ2FjaGVba2V5XTtcbiAgICAgIGlmIChsZWF2aW5nVk5vZGUgJiYgaXNTYW1lVk5vZGVUeXBlKHZub2RlLCBsZWF2aW5nVk5vZGUpICYmIGxlYXZpbmdWTm9kZS5lbFtsZWF2ZUNiS2V5XSkge1xuICAgICAgICBsZWF2aW5nVk5vZGUuZWxbbGVhdmVDYktleV0oKTtcbiAgICAgIH1cbiAgICAgIGNhbGxIb29rKGhvb2ssIFtlbF0pO1xuICAgIH0sXG4gICAgZW50ZXIoZWwpIHtcbiAgICAgIGxldCBob29rID0gb25FbnRlcjtcbiAgICAgIGxldCBhZnRlckhvb2sgPSBvbkFmdGVyRW50ZXI7XG4gICAgICBsZXQgY2FuY2VsSG9vayA9IG9uRW50ZXJDYW5jZWxsZWQ7XG4gICAgICBpZiAoIXN0YXRlLmlzTW91bnRlZCkge1xuICAgICAgICBpZiAoYXBwZWFyKSB7XG4gICAgICAgICAgaG9vayA9IG9uQXBwZWFyIHx8IG9uRW50ZXI7XG4gICAgICAgICAgYWZ0ZXJIb29rID0gb25BZnRlckFwcGVhciB8fCBvbkFmdGVyRW50ZXI7XG4gICAgICAgICAgY2FuY2VsSG9vayA9IG9uQXBwZWFyQ2FuY2VsbGVkIHx8IG9uRW50ZXJDYW5jZWxsZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICBjb25zdCBkb25lID0gZWxbZW50ZXJDYktleV0gPSAoY2FuY2VsbGVkKSA9PiB7XG4gICAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgIGNhbGxIb29rKGNhbmNlbEhvb2ssIFtlbF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxIb29rKGFmdGVySG9vaywgW2VsXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvb2tzLmRlbGF5ZWRMZWF2ZSkge1xuICAgICAgICAgIGhvb2tzLmRlbGF5ZWRMZWF2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsW2VudGVyQ2JLZXldID0gdm9pZCAwO1xuICAgICAgfTtcbiAgICAgIGlmIChob29rKSB7XG4gICAgICAgIGNhbGxBc3luY0hvb2soaG9vaywgW2VsLCBkb25lXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWF2ZShlbCwgcmVtb3ZlKSB7XG4gICAgICBjb25zdCBrZXkyID0gU3RyaW5nKHZub2RlLmtleSk7XG4gICAgICBpZiAoZWxbZW50ZXJDYktleV0pIHtcbiAgICAgICAgZWxbZW50ZXJDYktleV0oXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICAgIC8qIGNhbmNlbGxlZCAqL1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLmlzVW5tb3VudGluZykge1xuICAgICAgICByZXR1cm4gcmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBjYWxsSG9vayhvbkJlZm9yZUxlYXZlLCBbZWxdKTtcbiAgICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGRvbmUgPSBlbFtsZWF2ZUNiS2V5XSA9IChjYW5jZWxsZWQpID0+IHtcbiAgICAgICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgIGNhbGxIb29rKG9uTGVhdmVDYW5jZWxsZWQsIFtlbF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxIb29rKG9uQWZ0ZXJMZWF2ZSwgW2VsXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxbbGVhdmVDYktleV0gPSB2b2lkIDA7XG4gICAgICAgIGlmIChsZWF2aW5nVk5vZGVzQ2FjaGVba2V5Ml0gPT09IHZub2RlKSB7XG4gICAgICAgICAgZGVsZXRlIGxlYXZpbmdWTm9kZXNDYWNoZVtrZXkyXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGxlYXZpbmdWTm9kZXNDYWNoZVtrZXkyXSA9IHZub2RlO1xuICAgICAgaWYgKG9uTGVhdmUpIHtcbiAgICAgICAgY2FsbEFzeW5jSG9vayhvbkxlYXZlLCBbZWwsIGRvbmVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb25lKHZub2RlMikge1xuICAgICAgY29uc3QgaG9va3MyID0gcmVzb2x2ZVRyYW5zaXRpb25Ib29rcyhcbiAgICAgICAgdm5vZGUyLFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIGluc3RhbmNlLFxuICAgICAgICBwb3N0Q2xvbmVcbiAgICAgICk7XG4gICAgICBpZiAocG9zdENsb25lKSBwb3N0Q2xvbmUoaG9va3MyKTtcbiAgICAgIHJldHVybiBob29rczI7XG4gICAgfVxuICB9O1xuICByZXR1cm4gaG9va3M7XG59XG5mdW5jdGlvbiBlbXB0eVBsYWNlaG9sZGVyKHZub2RlKSB7XG4gIGlmIChpc0tlZXBBbGl2ZSh2bm9kZSkpIHtcbiAgICB2bm9kZSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICAgIHZub2RlLmNoaWxkcmVuID0gbnVsbDtcbiAgICByZXR1cm4gdm5vZGU7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldEtlZXBBbGl2ZUNoaWxkKHZub2RlKSB7XG4gIGlmICghaXNLZWVwQWxpdmUodm5vZGUpKSB7XG4gICAgcmV0dXJuIHZub2RlO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHZub2RlLmNvbXBvbmVudCkge1xuICAgIHJldHVybiB2bm9kZS5jb21wb25lbnQuc3ViVHJlZTtcbiAgfVxuICBjb25zdCB7IHNoYXBlRmxhZywgY2hpbGRyZW4gfSA9IHZub2RlO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICBpZiAoc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlblswXTtcbiAgICB9XG4gICAgaWYgKHNoYXBlRmxhZyAmIDMyICYmIGlzRnVuY3Rpb24oY2hpbGRyZW4uZGVmYXVsdCkpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbi5kZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uSG9va3Modm5vZGUsIGhvb2tzKSB7XG4gIGlmICh2bm9kZS5zaGFwZUZsYWcgJiA2ICYmIHZub2RlLmNvbXBvbmVudCkge1xuICAgIHNldFRyYW5zaXRpb25Ib29rcyh2bm9kZS5jb21wb25lbnQuc3ViVHJlZSwgaG9va3MpO1xuICB9IGVsc2UgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDEyOCkge1xuICAgIHZub2RlLnNzQ29udGVudC50cmFuc2l0aW9uID0gaG9va3MuY2xvbmUodm5vZGUuc3NDb250ZW50KTtcbiAgICB2bm9kZS5zc0ZhbGxiYWNrLnRyYW5zaXRpb24gPSBob29rcy5jbG9uZSh2bm9kZS5zc0ZhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICB2bm9kZS50cmFuc2l0aW9uID0gaG9va3M7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRyYW5zaXRpb25SYXdDaGlsZHJlbihjaGlsZHJlbiwga2VlcENvbW1lbnQgPSBmYWxzZSwgcGFyZW50S2V5KSB7XG4gIGxldCByZXQgPSBbXTtcbiAgbGV0IGtleWVkRnJhZ21lbnRDb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICBjb25zdCBrZXkgPSBwYXJlbnRLZXkgPT0gbnVsbCA/IGNoaWxkLmtleSA6IFN0cmluZyhwYXJlbnRLZXkpICsgU3RyaW5nKGNoaWxkLmtleSAhPSBudWxsID8gY2hpbGQua2V5IDogaSk7XG4gICAgaWYgKGNoaWxkLnR5cGUgPT09IEZyYWdtZW50KSB7XG4gICAgICBpZiAoY2hpbGQucGF0Y2hGbGFnICYgMTI4KSBrZXllZEZyYWdtZW50Q291bnQrKztcbiAgICAgIHJldCA9IHJldC5jb25jYXQoXG4gICAgICAgIGdldFRyYW5zaXRpb25SYXdDaGlsZHJlbihjaGlsZC5jaGlsZHJlbiwga2VlcENvbW1lbnQsIGtleSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChrZWVwQ29tbWVudCB8fCBjaGlsZC50eXBlICE9PSBDb21tZW50KSB7XG4gICAgICByZXQucHVzaChrZXkgIT0gbnVsbCA/IGNsb25lVk5vZGUoY2hpbGQsIHsga2V5IH0pIDogY2hpbGQpO1xuICAgIH1cbiAgfVxuICBpZiAoa2V5ZWRGcmFnbWVudENvdW50ID4gMSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXRbaV0ucGF0Y2hGbGFnID0gLTI7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qISAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGRlZmluZUNvbXBvbmVudChvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24ob3B0aW9ucykgPyAoXG4gICAgLy8gIzgzMjY6IGV4dGVuZCBjYWxsIGFuZCBvcHRpb25zLm5hbWUgYWNjZXNzIGFyZSBjb25zaWRlcmVkIHNpZGUtZWZmZWN0c1xuICAgIC8vIGJ5IFJvbGx1cCwgc28gd2UgaGF2ZSB0byB3cmFwIGl0IGluIGEgcHVyZS1hbm5vdGF0ZWQgSUlGRS5cbiAgICAvKiBAX19QVVJFX18gKi8gKCgpID0+IGV4dGVuZCh7IG5hbWU6IG9wdGlvbnMubmFtZSB9LCBleHRyYU9wdGlvbnMsIHsgc2V0dXA6IG9wdGlvbnMgfSkpKClcbiAgKSA6IG9wdGlvbnM7XG59XG5cbmNvbnN0IGlzQXN5bmNXcmFwcGVyID0gKGkpID0+ICEhaS50eXBlLl9fYXN5bmNMb2FkZXI7XG4vKiEgI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBkZWZpbmVBc3luY0NvbXBvbmVudChzb3VyY2UpIHtcbiAgaWYgKGlzRnVuY3Rpb24oc291cmNlKSkge1xuICAgIHNvdXJjZSA9IHsgbG9hZGVyOiBzb3VyY2UgfTtcbiAgfVxuICBjb25zdCB7XG4gICAgbG9hZGVyLFxuICAgIGxvYWRpbmdDb21wb25lbnQsXG4gICAgZXJyb3JDb21wb25lbnQsXG4gICAgZGVsYXkgPSAyMDAsXG4gICAgdGltZW91dCxcbiAgICAvLyB1bmRlZmluZWQgPSBuZXZlciB0aW1lcyBvdXRcbiAgICBzdXNwZW5zaWJsZSA9IHRydWUsXG4gICAgb25FcnJvcjogdXNlck9uRXJyb3JcbiAgfSA9IHNvdXJjZTtcbiAgbGV0IHBlbmRpbmdSZXF1ZXN0ID0gbnVsbDtcbiAgbGV0IHJlc29sdmVkQ29tcDtcbiAgbGV0IHJldHJpZXMgPSAwO1xuICBjb25zdCByZXRyeSA9ICgpID0+IHtcbiAgICByZXRyaWVzKys7XG4gICAgcGVuZGluZ1JlcXVlc3QgPSBudWxsO1xuICAgIHJldHVybiBsb2FkKCk7XG4gIH07XG4gIGNvbnN0IGxvYWQgPSAoKSA9PiB7XG4gICAgbGV0IHRoaXNSZXF1ZXN0O1xuICAgIHJldHVybiBwZW5kaW5nUmVxdWVzdCB8fCAodGhpc1JlcXVlc3QgPSBwZW5kaW5nUmVxdWVzdCA9IGxvYWRlcigpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVyciA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyIDogbmV3IEVycm9yKFN0cmluZyhlcnIpKTtcbiAgICAgIGlmICh1c2VyT25FcnJvcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVzZXJSZXRyeSA9ICgpID0+IHJlc29sdmUocmV0cnkoKSk7XG4gICAgICAgICAgY29uc3QgdXNlckZhaWwgPSAoKSA9PiByZWplY3QoZXJyKTtcbiAgICAgICAgICB1c2VyT25FcnJvcihlcnIsIHVzZXJSZXRyeSwgdXNlckZhaWwsIHJldHJpZXMgKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSkudGhlbigoY29tcCkgPT4ge1xuICAgICAgaWYgKHRoaXNSZXF1ZXN0ICE9PSBwZW5kaW5nUmVxdWVzdCAmJiBwZW5kaW5nUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gcGVuZGluZ1JlcXVlc3Q7XG4gICAgICB9XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhY29tcCkge1xuICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgYEFzeW5jIGNvbXBvbmVudCBsb2FkZXIgcmVzb2x2ZWQgdG8gdW5kZWZpbmVkLiBJZiB5b3UgYXJlIHVzaW5nIHJldHJ5KCksIG1ha2Ugc3VyZSB0byByZXR1cm4gaXRzIHJldHVybiB2YWx1ZS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoY29tcCAmJiAoY29tcC5fX2VzTW9kdWxlIHx8IGNvbXBbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gXCJNb2R1bGVcIikpIHtcbiAgICAgICAgY29tcCA9IGNvbXAuZGVmYXVsdDtcbiAgICAgIH1cbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNvbXAgJiYgIWlzT2JqZWN0KGNvbXApICYmICFpc0Z1bmN0aW9uKGNvbXApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhc3luYyBjb21wb25lbnQgbG9hZCByZXN1bHQ6ICR7Y29tcH1gKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkQ29tcCA9IGNvbXA7XG4gICAgICByZXR1cm4gY29tcDtcbiAgICB9KSk7XG4gIH07XG4gIHJldHVybiBkZWZpbmVDb21wb25lbnQoe1xuICAgIG5hbWU6IFwiQXN5bmNDb21wb25lbnRXcmFwcGVyXCIsXG4gICAgX19hc3luY0xvYWRlcjogbG9hZCxcbiAgICBnZXQgX19hc3luY1Jlc29sdmVkKCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVkQ29tcDtcbiAgICB9LFxuICAgIHNldHVwKCkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBjdXJyZW50SW5zdGFuY2U7XG4gICAgICBpZiAocmVzb2x2ZWRDb21wKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiBjcmVhdGVJbm5lckNvbXAocmVzb2x2ZWRDb21wLCBpbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICBwZW5kaW5nUmVxdWVzdCA9IG51bGw7XG4gICAgICAgIGhhbmRsZUVycm9yKFxuICAgICAgICAgIGVycixcbiAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAxMyxcbiAgICAgICAgICAhZXJyb3JDb21wb25lbnRcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgICBpZiAoc3VzcGVuc2libGUgJiYgaW5zdGFuY2Uuc3VzcGVuc2UgfHwgaXNJblNTUkNvbXBvbmVudFNldHVwKSB7XG4gICAgICAgIHJldHVybiBsb2FkKCkudGhlbigoY29tcCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoKSA9PiBjcmVhdGVJbm5lckNvbXAoY29tcCwgaW5zdGFuY2UpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgIHJldHVybiAoKSA9PiBlcnJvckNvbXBvbmVudCA/IGNyZWF0ZVZOb2RlKGVycm9yQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxvYWRlZCA9IHJlZihmYWxzZSk7XG4gICAgICBjb25zdCBlcnJvciA9IHJlZigpO1xuICAgICAgY29uc3QgZGVsYXllZCA9IHJlZighIWRlbGF5KTtcbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkZWxheWVkLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb2FkZWQudmFsdWUgJiYgIWVycm9yLnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBBc3luYyBjb21wb25lbnQgdGltZWQgb3V0IGFmdGVyICR7dGltZW91dH1tcy5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgZXJyb3IudmFsdWUgPSBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIH1cbiAgICAgIGxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgbG9hZGVkLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluc3RhbmNlLnBhcmVudCAmJiBpc0tlZXBBbGl2ZShpbnN0YW5jZS5wYXJlbnQudm5vZGUpKSB7XG4gICAgICAgICAgaW5zdGFuY2UucGFyZW50LmVmZmVjdC5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgcXVldWVKb2IoaW5zdGFuY2UucGFyZW50LnVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICBlcnJvci52YWx1ZSA9IGVycjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGxvYWRlZC52YWx1ZSAmJiByZXNvbHZlZENvbXApIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlSW5uZXJDb21wKHJlc29sdmVkQ29tcCwgaW5zdGFuY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLnZhbHVlICYmIGVycm9yQ29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZVZOb2RlKGVycm9yQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBlcnJvcjogZXJyb3IudmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2FkaW5nQ29tcG9uZW50ICYmICFkZWxheWVkLnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZVZOb2RlKGxvYWRpbmdDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVJbm5lckNvbXAoY29tcCwgcGFyZW50KSB7XG4gIGNvbnN0IHsgcmVmOiByZWYyLCBwcm9wcywgY2hpbGRyZW4sIGNlIH0gPSBwYXJlbnQudm5vZGU7XG4gIGNvbnN0IHZub2RlID0gY3JlYXRlVk5vZGUoY29tcCwgcHJvcHMsIGNoaWxkcmVuKTtcbiAgdm5vZGUucmVmID0gcmVmMjtcbiAgdm5vZGUuY2UgPSBjZTtcbiAgZGVsZXRlIHBhcmVudC52bm9kZS5jZTtcbiAgcmV0dXJuIHZub2RlO1xufVxuXG5jb25zdCBpc0tlZXBBbGl2ZSA9ICh2bm9kZSkgPT4gdm5vZGUudHlwZS5fX2lzS2VlcEFsaXZlO1xuY29uc3QgS2VlcEFsaXZlSW1wbCA9IHtcbiAgbmFtZTogYEtlZXBBbGl2ZWAsXG4gIC8vIE1hcmtlciBmb3Igc3BlY2lhbCBoYW5kbGluZyBpbnNpZGUgdGhlIHJlbmRlcmVyLiBXZSBhcmUgbm90IHVzaW5nIGEgPT09XG4gIC8vIGNoZWNrIGRpcmVjdGx5IG9uIEtlZXBBbGl2ZSBpbiB0aGUgcmVuZGVyZXIsIGJlY2F1c2UgaW1wb3J0aW5nIGl0IGRpcmVjdGx5XG4gIC8vIHdvdWxkIHByZXZlbnQgaXQgZnJvbSBiZWluZyB0cmVlLXNoYWtlbi5cbiAgX19pc0tlZXBBbGl2ZTogdHJ1ZSxcbiAgcHJvcHM6IHtcbiAgICBpbmNsdWRlOiBbU3RyaW5nLCBSZWdFeHAsIEFycmF5XSxcbiAgICBleGNsdWRlOiBbU3RyaW5nLCBSZWdFeHAsIEFycmF5XSxcbiAgICBtYXg6IFtTdHJpbmcsIE51bWJlcl1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc2hhcmVkQ29udGV4dCA9IGluc3RhbmNlLmN0eDtcbiAgICBpZiAoIXNoYXJlZENvbnRleHQucmVuZGVyZXIpIHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgPyBjaGlsZHJlblswXSA6IGNoaWxkcmVuO1xuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgY2FjaGUgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGtleXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICAgIGxldCBjdXJyZW50ID0gbnVsbDtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgIGluc3RhbmNlLl9fdl9jYWNoZSA9IGNhY2hlO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnRTdXNwZW5zZSA9IGluc3RhbmNlLnN1c3BlbnNlO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlbmRlcmVyOiB7XG4gICAgICAgIHA6IHBhdGNoLFxuICAgICAgICBtOiBtb3ZlLFxuICAgICAgICB1bTogX3VubW91bnQsXG4gICAgICAgIG86IHsgY3JlYXRlRWxlbWVudCB9XG4gICAgICB9XG4gICAgfSA9IHNoYXJlZENvbnRleHQ7XG4gICAgY29uc3Qgc3RvcmFnZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hhcmVkQ29udGV4dC5hY3RpdmF0ZSA9ICh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIG5hbWVzcGFjZSwgb3B0aW1pemVkKSA9PiB7XG4gICAgICBjb25zdCBpbnN0YW5jZTIgPSB2bm9kZS5jb21wb25lbnQ7XG4gICAgICBtb3ZlKHZub2RlLCBjb250YWluZXIsIGFuY2hvciwgMCwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgcGF0Y2goXG4gICAgICAgIGluc3RhbmNlMi52bm9kZSxcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBpbnN0YW5jZTIsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHZub2RlLnNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaW5zdGFuY2UyLmlzRGVhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGluc3RhbmNlMi5hKSB7XG4gICAgICAgICAgaW52b2tlQXJyYXlGbnMoaW5zdGFuY2UyLmEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZub2RlSG9vayA9IHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLm9uVm5vZGVNb3VudGVkO1xuICAgICAgICBpZiAodm5vZGVIb29rKSB7XG4gICAgICAgICAgaW52b2tlVk5vZGVIb29rKHZub2RlSG9vaywgaW5zdGFuY2UyLnBhcmVudCwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgZGV2dG9vbHNDb21wb25lbnRBZGRlZChpbnN0YW5jZTIpO1xuICAgICAgfVxuICAgIH07XG4gICAgc2hhcmVkQ29udGV4dC5kZWFjdGl2YXRlID0gKHZub2RlKSA9PiB7XG4gICAgICBjb25zdCBpbnN0YW5jZTIgPSB2bm9kZS5jb21wb25lbnQ7XG4gICAgICBpbnZhbGlkYXRlTW91bnQoaW5zdGFuY2UyLm0pO1xuICAgICAgaW52YWxpZGF0ZU1vdW50KGluc3RhbmNlMi5hKTtcbiAgICAgIG1vdmUodm5vZGUsIHN0b3JhZ2VDb250YWluZXIsIG51bGwsIDEsIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnN0YW5jZTIuZGEpIHtcbiAgICAgICAgICBpbnZva2VBcnJheUZucyhpbnN0YW5jZTIuZGEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZub2RlSG9vayA9IHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLm9uVm5vZGVVbm1vdW50ZWQ7XG4gICAgICAgIGlmICh2bm9kZUhvb2spIHtcbiAgICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBpbnN0YW5jZTIucGFyZW50LCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UyLmlzRGVhY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgfSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgIGRldnRvb2xzQ29tcG9uZW50QWRkZWQoaW5zdGFuY2UyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIHVubW91bnQodm5vZGUpIHtcbiAgICAgIHJlc2V0U2hhcGVGbGFnKHZub2RlKTtcbiAgICAgIF91bm1vdW50KHZub2RlLCBpbnN0YW5jZSwgcGFyZW50U3VzcGVuc2UsIHRydWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcnVuZUNhY2hlKGZpbHRlcikge1xuICAgICAgY2FjaGUuZm9yRWFjaCgodm5vZGUsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZSh2bm9kZS50eXBlKTtcbiAgICAgICAgaWYgKG5hbWUgJiYgKCFmaWx0ZXIgfHwgIWZpbHRlcihuYW1lKSkpIHtcbiAgICAgICAgICBwcnVuZUNhY2hlRW50cnkoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBydW5lQ2FjaGVFbnRyeShrZXkpIHtcbiAgICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChrZXkpO1xuICAgICAgaWYgKGNhY2hlZCAmJiAoIWN1cnJlbnQgfHwgIWlzU2FtZVZOb2RlVHlwZShjYWNoZWQsIGN1cnJlbnQpKSkge1xuICAgICAgICB1bm1vdW50KGNhY2hlZCk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgcmVzZXRTaGFwZUZsYWcoY3VycmVudCk7XG4gICAgICB9XG4gICAgICBjYWNoZS5kZWxldGUoa2V5KTtcbiAgICAgIGtleXMuZGVsZXRlKGtleSk7XG4gICAgfVxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gW3Byb3BzLmluY2x1ZGUsIHByb3BzLmV4Y2x1ZGVdLFxuICAgICAgKFtpbmNsdWRlLCBleGNsdWRlXSkgPT4ge1xuICAgICAgICBpbmNsdWRlICYmIHBydW5lQ2FjaGUoKG5hbWUpID0+IG1hdGNoZXMoaW5jbHVkZSwgbmFtZSkpO1xuICAgICAgICBleGNsdWRlICYmIHBydW5lQ2FjaGUoKG5hbWUpID0+ICFtYXRjaGVzKGV4Y2x1ZGUsIG5hbWUpKTtcbiAgICAgIH0sXG4gICAgICAvLyBwcnVuZSBwb3N0LXJlbmRlciBhZnRlciBgY3VycmVudGAgaGFzIGJlZW4gdXBkYXRlZFxuICAgICAgeyBmbHVzaDogXCJwb3N0XCIsIGRlZXA6IHRydWUgfVxuICAgICk7XG4gICAgbGV0IHBlbmRpbmdDYWNoZUtleSA9IG51bGw7XG4gICAgY29uc3QgY2FjaGVTdWJ0cmVlID0gKCkgPT4ge1xuICAgICAgaWYgKHBlbmRpbmdDYWNoZUtleSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc1N1c3BlbnNlKGluc3RhbmNlLnN1YlRyZWUudHlwZSkpIHtcbiAgICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgY2FjaGUuc2V0KHBlbmRpbmdDYWNoZUtleSwgZ2V0SW5uZXJDaGlsZChpbnN0YW5jZS5zdWJUcmVlKSk7XG4gICAgICAgICAgfSwgaW5zdGFuY2Uuc3ViVHJlZS5zdXNwZW5zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FjaGUuc2V0KHBlbmRpbmdDYWNoZUtleSwgZ2V0SW5uZXJDaGlsZChpbnN0YW5jZS5zdWJUcmVlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIG9uTW91bnRlZChjYWNoZVN1YnRyZWUpO1xuICAgIG9uVXBkYXRlZChjYWNoZVN1YnRyZWUpO1xuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjYWNoZS5mb3JFYWNoKChjYWNoZWQpID0+IHtcbiAgICAgICAgY29uc3QgeyBzdWJUcmVlLCBzdXNwZW5zZSB9ID0gaW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IHZub2RlID0gZ2V0SW5uZXJDaGlsZChzdWJUcmVlKTtcbiAgICAgICAgaWYgKGNhY2hlZC50eXBlID09PSB2bm9kZS50eXBlICYmIGNhY2hlZC5rZXkgPT09IHZub2RlLmtleSkge1xuICAgICAgICAgIHJlc2V0U2hhcGVGbGFnKHZub2RlKTtcbiAgICAgICAgICBjb25zdCBkYSA9IHZub2RlLmNvbXBvbmVudC5kYTtcbiAgICAgICAgICBkYSAmJiBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoZGEsIHN1c3BlbnNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdW5tb3VudChjYWNoZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHBlbmRpbmdDYWNoZUtleSA9IG51bGw7XG4gICAgICBpZiAoIXNsb3RzLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHNsb3RzLmRlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHJhd1ZOb2RlID0gY2hpbGRyZW5bMF07XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShgS2VlcEFsaXZlIHNob3VsZCBjb250YWluIGV4YWN0bHkgb25lIGNvbXBvbmVudCBjaGlsZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgICAgfSBlbHNlIGlmICghaXNWTm9kZShyYXdWTm9kZSkgfHwgIShyYXdWTm9kZS5zaGFwZUZsYWcgJiA0KSAmJiAhKHJhd1ZOb2RlLnNoYXBlRmxhZyAmIDEyOCkpIHtcbiAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiByYXdWTm9kZTtcbiAgICAgIH1cbiAgICAgIGxldCB2bm9kZSA9IGdldElubmVyQ2hpbGQocmF3Vk5vZGUpO1xuICAgICAgaWYgKHZub2RlLnR5cGUgPT09IENvbW1lbnQpIHtcbiAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXAgPSB2bm9kZS50eXBlO1xuICAgICAgY29uc3QgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoXG4gICAgICAgIGlzQXN5bmNXcmFwcGVyKHZub2RlKSA/IHZub2RlLnR5cGUuX19hc3luY1Jlc29sdmVkIHx8IHt9IDogY29tcFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgaW5jbHVkZSwgZXhjbHVkZSwgbWF4IH0gPSBwcm9wcztcbiAgICAgIGlmIChpbmNsdWRlICYmICghbmFtZSB8fCAhbWF0Y2hlcyhpbmNsdWRlLCBuYW1lKSkgfHwgZXhjbHVkZSAmJiBuYW1lICYmIG1hdGNoZXMoZXhjbHVkZSwgbmFtZSkpIHtcbiAgICAgICAgY3VycmVudCA9IHZub2RlO1xuICAgICAgICByZXR1cm4gcmF3Vk5vZGU7XG4gICAgICB9XG4gICAgICBjb25zdCBrZXkgPSB2bm9kZS5rZXkgPT0gbnVsbCA/IGNvbXAgOiB2bm9kZS5rZXk7XG4gICAgICBjb25zdCBjYWNoZWRWTm9kZSA9IGNhY2hlLmdldChrZXkpO1xuICAgICAgaWYgKHZub2RlLmVsKSB7XG4gICAgICAgIHZub2RlID0gY2xvbmVWTm9kZSh2bm9kZSk7XG4gICAgICAgIGlmIChyYXdWTm9kZS5zaGFwZUZsYWcgJiAxMjgpIHtcbiAgICAgICAgICByYXdWTm9kZS5zc0NvbnRlbnQgPSB2bm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGVuZGluZ0NhY2hlS2V5ID0ga2V5O1xuICAgICAgaWYgKGNhY2hlZFZOb2RlKSB7XG4gICAgICAgIHZub2RlLmVsID0gY2FjaGVkVk5vZGUuZWw7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudCA9IGNhY2hlZFZOb2RlLmNvbXBvbmVudDtcbiAgICAgICAgaWYgKHZub2RlLnRyYW5zaXRpb24pIHtcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3Modm5vZGUsIHZub2RlLnRyYW5zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHZub2RlLnNoYXBlRmxhZyB8PSA1MTI7XG4gICAgICAgIGtleXMuZGVsZXRlKGtleSk7XG4gICAgICAgIGtleXMuYWRkKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgICAgICBpZiAobWF4ICYmIGtleXMuc2l6ZSA+IHBhcnNlSW50KG1heCwgMTApKSB7XG4gICAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGtleXMudmFsdWVzKCkubmV4dCgpLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdm5vZGUuc2hhcGVGbGFnIHw9IDI1NjtcbiAgICAgIGN1cnJlbnQgPSB2bm9kZTtcbiAgICAgIHJldHVybiBpc1N1c3BlbnNlKHJhd1ZOb2RlLnR5cGUpID8gcmF3Vk5vZGUgOiB2bm9kZTtcbiAgICB9O1xuICB9XG59O1xuY29uc3QgS2VlcEFsaXZlID0gS2VlcEFsaXZlSW1wbDtcbmZ1bmN0aW9uIG1hdGNoZXMocGF0dGVybiwgbmFtZSkge1xuICBpZiAoaXNBcnJheShwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLnNvbWUoKHApID0+IG1hdGNoZXMocCwgbmFtZSkpO1xuICB9IGVsc2UgaWYgKGlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQoXCIsXCIpLmluY2x1ZGVzKG5hbWUpO1xuICB9IGVsc2UgaWYgKGlzUmVnRXhwKHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4udGVzdChuYW1lKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBvbkFjdGl2YXRlZChob29rLCB0YXJnZXQpIHtcbiAgcmVnaXN0ZXJLZWVwQWxpdmVIb29rKGhvb2ssIFwiYVwiLCB0YXJnZXQpO1xufVxuZnVuY3Rpb24gb25EZWFjdGl2YXRlZChob29rLCB0YXJnZXQpIHtcbiAgcmVnaXN0ZXJLZWVwQWxpdmVIb29rKGhvb2ssIFwiZGFcIiwgdGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyS2VlcEFsaXZlSG9vayhob29rLCB0eXBlLCB0YXJnZXQgPSBjdXJyZW50SW5zdGFuY2UpIHtcbiAgY29uc3Qgd3JhcHBlZEhvb2sgPSBob29rLl9fd2RjIHx8IChob29rLl9fd2RjID0gKCkgPT4ge1xuICAgIGxldCBjdXJyZW50ID0gdGFyZ2V0O1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBpZiAoY3VycmVudC5pc0RlYWN0aXZhdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGhvb2soKTtcbiAgfSk7XG4gIGluamVjdEhvb2sodHlwZSwgd3JhcHBlZEhvb2ssIHRhcmdldCk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBsZXQgY3VycmVudCA9IHRhcmdldC5wYXJlbnQ7XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudC5wYXJlbnQpIHtcbiAgICAgIGlmIChpc0tlZXBBbGl2ZShjdXJyZW50LnBhcmVudC52bm9kZSkpIHtcbiAgICAgICAgaW5qZWN0VG9LZWVwQWxpdmVSb290KHdyYXBwZWRIb29rLCB0eXBlLCB0YXJnZXQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaW5qZWN0VG9LZWVwQWxpdmVSb290KGhvb2ssIHR5cGUsIHRhcmdldCwga2VlcEFsaXZlUm9vdCkge1xuICBjb25zdCBpbmplY3RlZCA9IGluamVjdEhvb2soXG4gICAgdHlwZSxcbiAgICBob29rLFxuICAgIGtlZXBBbGl2ZVJvb3QsXG4gICAgdHJ1ZVxuICAgIC8qIHByZXBlbmQgKi9cbiAgKTtcbiAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgIHJlbW92ZShrZWVwQWxpdmVSb290W3R5cGVdLCBpbmplY3RlZCk7XG4gIH0sIHRhcmdldCk7XG59XG5mdW5jdGlvbiByZXNldFNoYXBlRmxhZyh2bm9kZSkge1xuICB2bm9kZS5zaGFwZUZsYWcgJj0gfjI1NjtcbiAgdm5vZGUuc2hhcGVGbGFnICY9IH41MTI7XG59XG5mdW5jdGlvbiBnZXRJbm5lckNoaWxkKHZub2RlKSB7XG4gIHJldHVybiB2bm9kZS5zaGFwZUZsYWcgJiAxMjggPyB2bm9kZS5zc0NvbnRlbnQgOiB2bm9kZTtcbn1cblxuZnVuY3Rpb24gaW5qZWN0SG9vayh0eXBlLCBob29rLCB0YXJnZXQgPSBjdXJyZW50SW5zdGFuY2UsIHByZXBlbmQgPSBmYWxzZSkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgY29uc3QgaG9va3MgPSB0YXJnZXRbdHlwZV0gfHwgKHRhcmdldFt0eXBlXSA9IFtdKTtcbiAgICBjb25zdCB3cmFwcGVkSG9vayA9IGhvb2suX193ZWggfHwgKGhvb2suX193ZWggPSAoLi4uYXJncykgPT4ge1xuICAgICAgcGF1c2VUcmFja2luZygpO1xuICAgICAgY29uc3QgcmVzZXQgPSBzZXRDdXJyZW50SW5zdGFuY2UodGFyZ2V0KTtcbiAgICAgIGNvbnN0IHJlcyA9IGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKGhvb2ssIHRhcmdldCwgdHlwZSwgYXJncyk7XG4gICAgICByZXNldCgpO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgaG9va3MudW5zaGlmdCh3cmFwcGVkSG9vayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvb2tzLnB1c2god3JhcHBlZEhvb2spO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlZEhvb2s7XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGNvbnN0IGFwaU5hbWUgPSB0b0hhbmRsZXJLZXkoRXJyb3JUeXBlU3RyaW5ncyQxW3R5cGVdLnJlcGxhY2UoLyBob29rJC8sIFwiXCIpKTtcbiAgICB3YXJuJDEoXG4gICAgICBgJHthcGlOYW1lfSBpcyBjYWxsZWQgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY29tcG9uZW50IGluc3RhbmNlIHRvIGJlIGFzc29jaWF0ZWQgd2l0aC4gTGlmZWN5Y2xlIGluamVjdGlvbiBBUElzIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGV4ZWN1dGlvbiBvZiBzZXR1cCgpLmAgKyAoYCBJZiB5b3UgYXJlIHVzaW5nIGFzeW5jIHNldHVwKCksIG1ha2Ugc3VyZSB0byByZWdpc3RlciBsaWZlY3ljbGUgaG9va3MgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdCBzdGF0ZW1lbnQuYCApXG4gICAgKTtcbiAgfVxufVxuY29uc3QgY3JlYXRlSG9vayA9IChsaWZlY3ljbGUpID0+IChob29rLCB0YXJnZXQgPSBjdXJyZW50SW5zdGFuY2UpID0+IHtcbiAgaWYgKCFpc0luU1NSQ29tcG9uZW50U2V0dXAgfHwgbGlmZWN5Y2xlID09PSBcInNwXCIpIHtcbiAgICBpbmplY3RIb29rKGxpZmVjeWNsZSwgKC4uLmFyZ3MpID0+IGhvb2soLi4uYXJncyksIHRhcmdldCk7XG4gIH1cbn07XG5jb25zdCBvbkJlZm9yZU1vdW50ID0gY3JlYXRlSG9vayhcImJtXCIpO1xuY29uc3Qgb25Nb3VudGVkID0gY3JlYXRlSG9vayhcIm1cIik7XG5jb25zdCBvbkJlZm9yZVVwZGF0ZSA9IGNyZWF0ZUhvb2soXCJidVwiKTtcbmNvbnN0IG9uVXBkYXRlZCA9IGNyZWF0ZUhvb2soXCJ1XCIpO1xuY29uc3Qgb25CZWZvcmVVbm1vdW50ID0gY3JlYXRlSG9vayhcImJ1bVwiKTtcbmNvbnN0IG9uVW5tb3VudGVkID0gY3JlYXRlSG9vayhcInVtXCIpO1xuY29uc3Qgb25TZXJ2ZXJQcmVmZXRjaCA9IGNyZWF0ZUhvb2soXCJzcFwiKTtcbmNvbnN0IG9uUmVuZGVyVHJpZ2dlcmVkID0gY3JlYXRlSG9vayhcbiAgXCJydGdcIlxuKTtcbmNvbnN0IG9uUmVuZGVyVHJhY2tlZCA9IGNyZWF0ZUhvb2soXG4gIFwicnRjXCJcbik7XG5mdW5jdGlvbiBvbkVycm9yQ2FwdHVyZWQoaG9vaywgdGFyZ2V0ID0gY3VycmVudEluc3RhbmNlKSB7XG4gIGluamVjdEhvb2soXCJlY1wiLCBob29rLCB0YXJnZXQpO1xufVxuXG5jb25zdCBDT01QT05FTlRTID0gXCJjb21wb25lbnRzXCI7XG5jb25zdCBESVJFQ1RJVkVTID0gXCJkaXJlY3RpdmVzXCI7XG5mdW5jdGlvbiByZXNvbHZlQ29tcG9uZW50KG5hbWUsIG1heWJlU2VsZlJlZmVyZW5jZSkge1xuICByZXR1cm4gcmVzb2x2ZUFzc2V0KENPTVBPTkVOVFMsIG5hbWUsIHRydWUsIG1heWJlU2VsZlJlZmVyZW5jZSkgfHwgbmFtZTtcbn1cbmNvbnN0IE5VTExfRFlOQU1JQ19DT01QT05FTlQgPSBTeW1ib2wuZm9yKFwidi1uZGNcIik7XG5mdW5jdGlvbiByZXNvbHZlRHluYW1pY0NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgaWYgKGlzU3RyaW5nKGNvbXBvbmVudCkpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUFzc2V0KENPTVBPTkVOVFMsIGNvbXBvbmVudCwgZmFsc2UpIHx8IGNvbXBvbmVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tcG9uZW50IHx8IE5VTExfRFlOQU1JQ19DT01QT05FTlQ7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlc29sdmVEaXJlY3RpdmUobmFtZSkge1xuICByZXR1cm4gcmVzb2x2ZUFzc2V0KERJUkVDVElWRVMsIG5hbWUpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUFzc2V0KHR5cGUsIG5hbWUsIHdhcm5NaXNzaW5nID0gdHJ1ZSwgbWF5YmVTZWxmUmVmZXJlbmNlID0gZmFsc2UpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgfHwgY3VycmVudEluc3RhbmNlO1xuICBpZiAoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBDb21wb25lbnQgPSBpbnN0YW5jZS50eXBlO1xuICAgIGlmICh0eXBlID09PSBDT01QT05FTlRTKSB7XG4gICAgICBjb25zdCBzZWxmTmFtZSA9IGdldENvbXBvbmVudE5hbWUoXG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgICBpZiAoc2VsZk5hbWUgJiYgKHNlbGZOYW1lID09PSBuYW1lIHx8IHNlbGZOYW1lID09PSBjYW1lbGl6ZShuYW1lKSB8fCBzZWxmTmFtZSA9PT0gY2FwaXRhbGl6ZShjYW1lbGl6ZShuYW1lKSkpKSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IChcbiAgICAgIC8vIGxvY2FsIHJlZ2lzdHJhdGlvblxuICAgICAgLy8gY2hlY2sgaW5zdGFuY2VbdHlwZV0gZmlyc3Qgd2hpY2ggaXMgcmVzb2x2ZWQgZm9yIG9wdGlvbnMgQVBJXG4gICAgICByZXNvbHZlKGluc3RhbmNlW3R5cGVdIHx8IENvbXBvbmVudFt0eXBlXSwgbmFtZSkgfHwgLy8gZ2xvYmFsIHJlZ2lzdHJhdGlvblxuICAgICAgcmVzb2x2ZShpbnN0YW5jZS5hcHBDb250ZXh0W3R5cGVdLCBuYW1lKVxuICAgICk7XG4gICAgaWYgKCFyZXMgJiYgbWF5YmVTZWxmUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50O1xuICAgIH1cbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3YXJuTWlzc2luZyAmJiAhcmVzKSB7XG4gICAgICBjb25zdCBleHRyYSA9IHR5cGUgPT09IENPTVBPTkVOVFMgPyBgXG5JZiB0aGlzIGlzIGEgbmF0aXZlIGN1c3RvbSBlbGVtZW50LCBtYWtlIHN1cmUgdG8gZXhjbHVkZSBpdCBmcm9tIGNvbXBvbmVudCByZXNvbHV0aW9uIHZpYSBjb21waWxlck9wdGlvbnMuaXNDdXN0b21FbGVtZW50LmAgOiBgYDtcbiAgICAgIHdhcm4kMShgRmFpbGVkIHRvIHJlc29sdmUgJHt0eXBlLnNsaWNlKDAsIC0xKX06ICR7bmFtZX0ke2V4dHJhfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgcmVzb2x2ZSR7Y2FwaXRhbGl6ZSh0eXBlLnNsaWNlKDAsIC0xKSl9IGNhbiBvbmx5IGJlIHVzZWQgaW4gcmVuZGVyKCkgb3Igc2V0dXAoKS5gXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZShyZWdpc3RyeSwgbmFtZSkge1xuICByZXR1cm4gcmVnaXN0cnkgJiYgKHJlZ2lzdHJ5W25hbWVdIHx8IHJlZ2lzdHJ5W2NhbWVsaXplKG5hbWUpXSB8fCByZWdpc3RyeVtjYXBpdGFsaXplKGNhbWVsaXplKG5hbWUpKV0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJMaXN0KHNvdXJjZSwgcmVuZGVySXRlbSwgY2FjaGUsIGluZGV4KSB7XG4gIGxldCByZXQ7XG4gIGNvbnN0IGNhY2hlZCA9IGNhY2hlICYmIGNhY2hlW2luZGV4XTtcbiAgaWYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgcmV0ID0gbmV3IEFycmF5KHNvdXJjZS5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gc291cmNlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVySXRlbShzb3VyY2VbaV0sIGksIHZvaWQgMCwgY2FjaGVkICYmIGNhY2hlZFtpXSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhTnVtYmVyLmlzSW50ZWdlcihzb3VyY2UpKSB7XG4gICAgICB3YXJuJDEoYFRoZSB2LWZvciByYW5nZSBleHBlY3QgYW4gaW50ZWdlciB2YWx1ZSBidXQgZ290ICR7c291cmNlfS5gKTtcbiAgICB9XG4gICAgcmV0ID0gbmV3IEFycmF5KHNvdXJjZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2U7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVySXRlbShpICsgMSwgaSwgdm9pZCAwLCBjYWNoZWQgJiYgY2FjaGVkW2ldKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgIGlmIChzb3VyY2VbU3ltYm9sLml0ZXJhdG9yXSkge1xuICAgICAgcmV0ID0gQXJyYXkuZnJvbShcbiAgICAgICAgc291cmNlLFxuICAgICAgICAoaXRlbSwgaSkgPT4gcmVuZGVySXRlbShpdGVtLCBpLCB2b2lkIDAsIGNhY2hlZCAmJiBjYWNoZWRbaV0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICAgIHJldCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIHJldFtpXSA9IHJlbmRlckl0ZW0oc291cmNlW2tleV0sIGtleSwgaSwgY2FjaGVkICYmIGNhY2hlZFtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldCA9IFtdO1xuICB9XG4gIGlmIChjYWNoZSkge1xuICAgIGNhY2hlW2luZGV4XSA9IHJldDtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTbG90cyhzbG90cywgZHluYW1pY1Nsb3RzKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHluYW1pY1Nsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2xvdCA9IGR5bmFtaWNTbG90c1tpXTtcbiAgICBpZiAoaXNBcnJheShzbG90KSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzbG90Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHNsb3RzW3Nsb3Rbal0ubmFtZV0gPSBzbG90W2pdLmZuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2xvdCkge1xuICAgICAgc2xvdHNbc2xvdC5uYW1lXSA9IHNsb3Qua2V5ID8gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gc2xvdC5mbiguLi5hcmdzKTtcbiAgICAgICAgaWYgKHJlcykgcmVzLmtleSA9IHNsb3Qua2V5O1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSA6IHNsb3QuZm47XG4gICAgfVxuICB9XG4gIHJldHVybiBzbG90cztcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2xvdChzbG90cywgbmFtZSwgcHJvcHMgPSB7fSwgZmFsbGJhY2ssIG5vU2xvdHRlZCkge1xuICBpZiAoY3VycmVudFJlbmRlcmluZ0luc3RhbmNlLmlzQ0UgfHwgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlLnBhcmVudCAmJiBpc0FzeW5jV3JhcHBlcihjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UucGFyZW50KSAmJiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UucGFyZW50LmlzQ0UpIHtcbiAgICBpZiAobmFtZSAhPT0gXCJkZWZhdWx0XCIpIHByb3BzLm5hbWUgPSBuYW1lO1xuICAgIHJldHVybiBjcmVhdGVWTm9kZShcInNsb3RcIiwgcHJvcHMsIGZhbGxiYWNrICYmIGZhbGxiYWNrKCkpO1xuICB9XG4gIGxldCBzbG90ID0gc2xvdHNbbmFtZV07XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNsb3QgJiYgc2xvdC5sZW5ndGggPiAxKSB7XG4gICAgd2FybiQxKFxuICAgICAgYFNTUi1vcHRpbWl6ZWQgc2xvdCBmdW5jdGlvbiBkZXRlY3RlZCBpbiBhIG5vbi1TU1Itb3B0aW1pemVkIHJlbmRlciBmdW5jdGlvbi4gWW91IG5lZWQgdG8gbWFyayB0aGlzIGNvbXBvbmVudCB3aXRoICRkeW5hbWljLXNsb3RzIGluIHRoZSBwYXJlbnQgdGVtcGxhdGUuYFxuICAgICk7XG4gICAgc2xvdCA9ICgpID0+IFtdO1xuICB9XG4gIGlmIChzbG90ICYmIHNsb3QuX2MpIHtcbiAgICBzbG90Ll9kID0gZmFsc2U7XG4gIH1cbiAgb3BlbkJsb2NrKCk7XG4gIGNvbnN0IHZhbGlkU2xvdENvbnRlbnQgPSBzbG90ICYmIGVuc3VyZVZhbGlkVk5vZGUoc2xvdChwcm9wcykpO1xuICBjb25zdCByZW5kZXJlZCA9IGNyZWF0ZUJsb2NrKFxuICAgIEZyYWdtZW50LFxuICAgIHtcbiAgICAgIGtleTogKHByb3BzLmtleSB8fCAvLyBzbG90IGNvbnRlbnQgYXJyYXkgb2YgYSBkeW5hbWljIGNvbmRpdGlvbmFsIHNsb3QgbWF5IGhhdmUgYSBicmFuY2hcbiAgICAgIC8vIGtleSBhdHRhY2hlZCBpbiB0aGUgYGNyZWF0ZVNsb3RzYCBoZWxwZXIsIHJlc3BlY3QgdGhhdFxuICAgICAgdmFsaWRTbG90Q29udGVudCAmJiB2YWxpZFNsb3RDb250ZW50LmtleSB8fCBgXyR7bmFtZX1gKSArIC8vICM3MjU2IGZvcmNlIGRpZmZlcmVudGlhdGUgZmFsbGJhY2sgY29udGVudCBmcm9tIGFjdHVhbCBjb250ZW50XG4gICAgICAoIXZhbGlkU2xvdENvbnRlbnQgJiYgZmFsbGJhY2sgPyBcIl9mYlwiIDogXCJcIilcbiAgICB9LFxuICAgIHZhbGlkU2xvdENvbnRlbnQgfHwgKGZhbGxiYWNrID8gZmFsbGJhY2soKSA6IFtdKSxcbiAgICB2YWxpZFNsb3RDb250ZW50ICYmIHNsb3RzLl8gPT09IDEgPyA2NCA6IC0yXG4gICk7XG4gIGlmICghbm9TbG90dGVkICYmIHJlbmRlcmVkLnNjb3BlSWQpIHtcbiAgICByZW5kZXJlZC5zbG90U2NvcGVJZHMgPSBbcmVuZGVyZWQuc2NvcGVJZCArIFwiLXNcIl07XG4gIH1cbiAgaWYgKHNsb3QgJiYgc2xvdC5fYykge1xuICAgIHNsb3QuX2QgPSB0cnVlO1xuICB9XG4gIHJldHVybiByZW5kZXJlZDtcbn1cbmZ1bmN0aW9uIGVuc3VyZVZhbGlkVk5vZGUodm5vZGVzKSB7XG4gIHJldHVybiB2bm9kZXMuc29tZSgoY2hpbGQpID0+IHtcbiAgICBpZiAoIWlzVk5vZGUoY2hpbGQpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoY2hpbGQudHlwZSA9PT0gQ29tbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChjaGlsZC50eXBlID09PSBGcmFnbWVudCAmJiAhZW5zdXJlVmFsaWRWTm9kZShjaGlsZC5jaGlsZHJlbikpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pID8gdm5vZGVzIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdG9IYW5kbGVycyhvYmosIHByZXNlcnZlQ2FzZUlmTmVjZXNzYXJ5KSB7XG4gIGNvbnN0IHJldCA9IHt9O1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaXNPYmplY3Qob2JqKSkge1xuICAgIHdhcm4kMShgdi1vbiB3aXRoIG5vIGFyZ3VtZW50IGV4cGVjdHMgYW4gb2JqZWN0IHZhbHVlLmApO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgcmV0W3ByZXNlcnZlQ2FzZUlmTmVjZXNzYXJ5ICYmIC9bQS1aXS8udGVzdChrZXkpID8gYG9uOiR7a2V5fWAgOiB0b0hhbmRsZXJLZXkoa2V5KV0gPSBvYmpba2V5XTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5jb25zdCBnZXRQdWJsaWNJbnN0YW5jZSA9IChpKSA9PiB7XG4gIGlmICghaSkgcmV0dXJuIG51bGw7XG4gIGlmIChpc1N0YXRlZnVsQ29tcG9uZW50KGkpKSByZXR1cm4gZ2V0Q29tcG9uZW50UHVibGljSW5zdGFuY2UoaSk7XG4gIHJldHVybiBnZXRQdWJsaWNJbnN0YW5jZShpLnBhcmVudCk7XG59O1xuY29uc3QgcHVibGljUHJvcGVydGllc01hcCA9IChcbiAgLy8gTW92ZSBQVVJFIG1hcmtlciB0byBuZXcgbGluZSB0byB3b3JrYXJvdW5kIGNvbXBpbGVyIGRpc2NhcmRpbmcgaXRcbiAgLy8gZHVlIHRvIHR5cGUgYW5ub3RhdGlvblxuICAvKiBAX19QVVJFX18gKi8gZXh0ZW5kKC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLCB7XG4gICAgJDogKGkpID0+IGksXG4gICAgJGVsOiAoaSkgPT4gaS52bm9kZS5lbCxcbiAgICAkZGF0YTogKGkpID0+IGkuZGF0YSxcbiAgICAkcHJvcHM6IChpKSA9PiAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KGkucHJvcHMpIDogaS5wcm9wcyxcbiAgICAkYXR0cnM6IChpKSA9PiAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KGkuYXR0cnMpIDogaS5hdHRycyxcbiAgICAkc2xvdHM6IChpKSA9PiAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KGkuc2xvdHMpIDogaS5zbG90cyxcbiAgICAkcmVmczogKGkpID0+ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzaGFsbG93UmVhZG9ubHkoaS5yZWZzKSA6IGkucmVmcyxcbiAgICAkcGFyZW50OiAoaSkgPT4gZ2V0UHVibGljSW5zdGFuY2UoaS5wYXJlbnQpLFxuICAgICRyb290OiAoaSkgPT4gZ2V0UHVibGljSW5zdGFuY2UoaS5yb290KSxcbiAgICAkZW1pdDogKGkpID0+IGkuZW1pdCxcbiAgICAkb3B0aW9uczogKGkpID0+IF9fVlVFX09QVElPTlNfQVBJX18gPyByZXNvbHZlTWVyZ2VkT3B0aW9ucyhpKSA6IGkudHlwZSxcbiAgICAkZm9yY2VVcGRhdGU6IChpKSA9PiBpLmYgfHwgKGkuZiA9ICgpID0+IHtcbiAgICAgIGkuZWZmZWN0LmRpcnR5ID0gdHJ1ZTtcbiAgICAgIHF1ZXVlSm9iKGkudXBkYXRlKTtcbiAgICB9KSxcbiAgICAkbmV4dFRpY2s6IChpKSA9PiBpLm4gfHwgKGkubiA9IG5leHRUaWNrLmJpbmQoaS5wcm94eSkpLFxuICAgICR3YXRjaDogKGkpID0+IF9fVlVFX09QVElPTlNfQVBJX18gPyBpbnN0YW5jZVdhdGNoLmJpbmQoaSkgOiBOT09QXG4gIH0pXG4pO1xuY29uc3QgaXNSZXNlcnZlZFByZWZpeCA9IChrZXkpID0+IGtleSA9PT0gXCJfXCIgfHwga2V5ID09PSBcIiRcIjtcbmNvbnN0IGhhc1NldHVwQmluZGluZyA9IChzdGF0ZSwga2V5KSA9PiBzdGF0ZSAhPT0gRU1QVFlfT0JKICYmICFzdGF0ZS5fX2lzU2NyaXB0U2V0dXAgJiYgaGFzT3duKHN0YXRlLCBrZXkpO1xuY29uc3QgUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzID0ge1xuICBnZXQoeyBfOiBpbnN0YW5jZSB9LCBrZXkpIHtcbiAgICBpZiAoa2V5ID09PSBcIl9fdl9za2lwXCIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCB7IGN0eCwgc2V0dXBTdGF0ZSwgZGF0YSwgcHJvcHMsIGFjY2Vzc0NhY2hlLCB0eXBlLCBhcHBDb250ZXh0IH0gPSBpbnN0YW5jZTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXkgPT09IFwiX19pc1Z1ZVwiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG5vcm1hbGl6ZWRQcm9wcztcbiAgICBpZiAoa2V5WzBdICE9PSBcIiRcIikge1xuICAgICAgY29uc3QgbiA9IGFjY2Vzc0NhY2hlW2tleV07XG4gICAgICBpZiAobiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHN3aXRjaCAobikge1xuICAgICAgICAgIGNhc2UgMSAvKiBTRVRVUCAqLzpcbiAgICAgICAgICAgIHJldHVybiBzZXR1cFN0YXRlW2tleV07XG4gICAgICAgICAgY2FzZSAyIC8qIERBVEEgKi86XG4gICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgIGNhc2UgNCAvKiBDT05URVhUICovOlxuICAgICAgICAgICAgcmV0dXJuIGN0eFtrZXldO1xuICAgICAgICAgIGNhc2UgMyAvKiBQUk9QUyAqLzpcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1trZXldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhhc1NldHVwQmluZGluZyhzZXR1cFN0YXRlLCBrZXkpKSB7XG4gICAgICAgIGFjY2Vzc0NhY2hlW2tleV0gPSAxIC8qIFNFVFVQICovO1xuICAgICAgICByZXR1cm4gc2V0dXBTdGF0ZVtrZXldO1xuICAgICAgfSBlbHNlIGlmIChkYXRhICE9PSBFTVBUWV9PQkogJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgICAgYWNjZXNzQ2FjaGVba2V5XSA9IDIgLyogREFUQSAqLztcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIC8vIG9ubHkgY2FjaGUgb3RoZXIgcHJvcGVydGllcyB3aGVuIGluc3RhbmNlIGhhcyBkZWNsYXJlZCAodGh1cyBzdGFibGUpXG4gICAgICAgIC8vIHByb3BzXG4gICAgICAgIChub3JtYWxpemVkUHJvcHMgPSBpbnN0YW5jZS5wcm9wc09wdGlvbnNbMF0pICYmIGhhc093bihub3JtYWxpemVkUHJvcHMsIGtleSlcbiAgICAgICkge1xuICAgICAgICBhY2Nlc3NDYWNoZVtrZXldID0gMyAvKiBQUk9QUyAqLztcbiAgICAgICAgcmV0dXJuIHByb3BzW2tleV07XG4gICAgICB9IGVsc2UgaWYgKGN0eCAhPT0gRU1QVFlfT0JKICYmIGhhc093bihjdHgsIGtleSkpIHtcbiAgICAgICAgYWNjZXNzQ2FjaGVba2V5XSA9IDQgLyogQ09OVEVYVCAqLztcbiAgICAgICAgcmV0dXJuIGN0eFtrZXldO1xuICAgICAgfSBlbHNlIGlmICghX19WVUVfT1BUSU9OU19BUElfXyB8fCBzaG91bGRDYWNoZUFjY2Vzcykge1xuICAgICAgICBhY2Nlc3NDYWNoZVtrZXldID0gMCAvKiBPVEhFUiAqLztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHVibGljR2V0dGVyID0gcHVibGljUHJvcGVydGllc01hcFtrZXldO1xuICAgIGxldCBjc3NNb2R1bGUsIGdsb2JhbFByb3BlcnRpZXM7XG4gICAgaWYgKHB1YmxpY0dldHRlcikge1xuICAgICAgaWYgKGtleSA9PT0gXCIkYXR0cnNcIikge1xuICAgICAgICB0cmFjayhpbnN0YW5jZS5hdHRycywgXCJnZXRcIiwgXCJcIik7XG4gICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgbWFya0F0dHJzQWNjZXNzZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXkgPT09IFwiJHNsb3RzXCIpIHtcbiAgICAgICAgdHJhY2soaW5zdGFuY2UsIFwiZ2V0XCIsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHVibGljR2V0dGVyKGluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgLy8gY3NzIG1vZHVsZSAoaW5qZWN0ZWQgYnkgdnVlLWxvYWRlcilcbiAgICAgIChjc3NNb2R1bGUgPSB0eXBlLl9fY3NzTW9kdWxlcykgJiYgKGNzc01vZHVsZSA9IGNzc01vZHVsZVtrZXldKVxuICAgICkge1xuICAgICAgcmV0dXJuIGNzc01vZHVsZTtcbiAgICB9IGVsc2UgaWYgKGN0eCAhPT0gRU1QVFlfT0JKICYmIGhhc093bihjdHgsIGtleSkpIHtcbiAgICAgIGFjY2Vzc0NhY2hlW2tleV0gPSA0IC8qIENPTlRFWFQgKi87XG4gICAgICByZXR1cm4gY3R4W2tleV07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIC8vIGdsb2JhbCBwcm9wZXJ0aWVzXG4gICAgICBnbG9iYWxQcm9wZXJ0aWVzID0gYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywgaGFzT3duKGdsb2JhbFByb3BlcnRpZXMsIGtleSlcbiAgICApIHtcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFByb3BlcnRpZXNba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlICYmICghaXNTdHJpbmcoa2V5KSB8fCAvLyAjMTA5MSBhdm9pZCBpbnRlcm5hbCBpc1JlZi9pc1ZOb2RlIGNoZWNrcyBvbiBjb21wb25lbnQgaW5zdGFuY2UgbGVhZGluZ1xuICAgIC8vIHRvIGluZmluaXRlIHdhcm5pbmcgbG9vcFxuICAgIGtleS5pbmRleE9mKFwiX192XCIpICE9PSAwKSkge1xuICAgICAgaWYgKGRhdGEgIT09IEVNUFRZX09CSiAmJiBpc1Jlc2VydmVkUHJlZml4KGtleVswXSkgJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgICAgd2FybiQxKFxuICAgICAgICAgIGBQcm9wZXJ0eSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAga2V5XG4gICAgICAgICAgKX0gbXVzdCBiZSBhY2Nlc3NlZCB2aWEgJGRhdGEgYmVjYXVzZSBpdCBzdGFydHMgd2l0aCBhIHJlc2VydmVkIGNoYXJhY3RlciAoXCIkXCIgb3IgXCJfXCIpIGFuZCBpcyBub3QgcHJveGllZCBvbiB0aGUgcmVuZGVyIGNvbnRleHQuYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgUHJvcGVydHkgJHtKU09OLnN0cmluZ2lmeShrZXkpfSB3YXMgYWNjZXNzZWQgZHVyaW5nIHJlbmRlciBidXQgaXMgbm90IGRlZmluZWQgb24gaW5zdGFuY2UuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2V0KHsgXzogaW5zdGFuY2UgfSwga2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IHsgZGF0YSwgc2V0dXBTdGF0ZSwgY3R4IH0gPSBpbnN0YW5jZTtcbiAgICBpZiAoaGFzU2V0dXBCaW5kaW5nKHNldHVwU3RhdGUsIGtleSkpIHtcbiAgICAgIHNldHVwU3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldHVwU3RhdGUuX19pc1NjcmlwdFNldHVwICYmIGhhc093bihzZXR1cFN0YXRlLCBrZXkpKSB7XG4gICAgICB3YXJuJDEoYENhbm5vdCBtdXRhdGUgPHNjcmlwdCBzZXR1cD4gYmluZGluZyBcIiR7a2V5fVwiIGZyb20gT3B0aW9ucyBBUEkuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChkYXRhICE9PSBFTVBUWV9PQkogJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChoYXNPd24oaW5zdGFuY2UucHJvcHMsIGtleSkpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGBBdHRlbXB0aW5nIHRvIG11dGF0ZSBwcm9wIFwiJHtrZXl9XCIuIFByb3BzIGFyZSByZWFkb25seS5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGtleVswXSA9PT0gXCIkXCIgJiYga2V5LnNsaWNlKDEpIGluIGluc3RhbmNlKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gbXV0YXRlIHB1YmxpYyBwcm9wZXJ0eSBcIiR7a2V5fVwiLiBQcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggJCBhcmUgcmVzZXJ2ZWQgYW5kIHJlYWRvbmx5LmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGtleSBpbiBpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhcyh7XG4gICAgXzogeyBkYXRhLCBzZXR1cFN0YXRlLCBhY2Nlc3NDYWNoZSwgY3R4LCBhcHBDb250ZXh0LCBwcm9wc09wdGlvbnMgfVxuICB9LCBrZXkpIHtcbiAgICBsZXQgbm9ybWFsaXplZFByb3BzO1xuICAgIHJldHVybiAhIWFjY2Vzc0NhY2hlW2tleV0gfHwgZGF0YSAhPT0gRU1QVFlfT0JKICYmIGhhc093bihkYXRhLCBrZXkpIHx8IGhhc1NldHVwQmluZGluZyhzZXR1cFN0YXRlLCBrZXkpIHx8IChub3JtYWxpemVkUHJvcHMgPSBwcm9wc09wdGlvbnNbMF0pICYmIGhhc093bihub3JtYWxpemVkUHJvcHMsIGtleSkgfHwgaGFzT3duKGN0eCwga2V5KSB8fCBoYXNPd24ocHVibGljUHJvcGVydGllc01hcCwga2V5KSB8fCBoYXNPd24oYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywga2V5KTtcbiAgfSxcbiAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoZGVzY3JpcHRvci5nZXQgIT0gbnVsbCkge1xuICAgICAgdGFyZ2V0Ll8uYWNjZXNzQ2FjaGVba2V5XSA9IDA7XG4gICAgfSBlbHNlIGlmIChoYXNPd24oZGVzY3JpcHRvciwgXCJ2YWx1ZVwiKSkge1xuICAgICAgdGhpcy5zZXQodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IudmFsdWUsIG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn07XG5pZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB0cnVlKSB7XG4gIFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycy5vd25LZXlzID0gKHRhcmdldCkgPT4ge1xuICAgIHdhcm4kMShcbiAgICAgIGBBdm9pZCBhcHAgbG9naWMgdGhhdCByZWxpZXMgb24gZW51bWVyYXRpbmcga2V5cyBvbiBhIGNvbXBvbmVudCBpbnN0YW5jZS4gVGhlIGtleXMgd2lsbCBiZSBlbXB0eSBpbiBwcm9kdWN0aW9uIG1vZGUgdG8gYXZvaWQgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQuYFxuICAgICk7XG4gICAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpO1xuICB9O1xufVxuY29uc3QgUnVudGltZUNvbXBpbGVkUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIGV4dGVuZChcbiAge30sXG4gIFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycyxcbiAge1xuICAgIGdldCh0YXJnZXQsIGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gU3ltYm9sLnVuc2NvcGFibGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQdWJsaWNJbnN0YW5jZVByb3h5SGFuZGxlcnMuZ2V0KHRhcmdldCwga2V5LCB0YXJnZXQpO1xuICAgIH0sXG4gICAgaGFzKF8sIGtleSkge1xuICAgICAgY29uc3QgaGFzID0ga2V5WzBdICE9PSBcIl9cIiAmJiAhaXNHbG9iYWxseUFsbG93ZWQoa2V5KTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFoYXMgJiYgUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzLmhhcyhfLCBrZXkpKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgUHJvcGVydHkgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIGtleVxuICAgICAgICAgICl9IHNob3VsZCBub3Qgc3RhcnQgd2l0aCBfIHdoaWNoIGlzIGEgcmVzZXJ2ZWQgcHJlZml4IGZvciBWdWUgaW50ZXJuYWxzLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXM7XG4gICAgfVxuICB9XG4pO1xuZnVuY3Rpb24gY3JlYXRlRGV2UmVuZGVyQ29udGV4dChpbnN0YW5jZSkge1xuICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgYF9gLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGdldDogKCkgPT4gaW5zdGFuY2VcbiAgfSk7XG4gIE9iamVjdC5rZXlzKHB1YmxpY1Byb3BlcnRpZXNNYXApLmZvckVhY2goKGtleSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6ICgpID0+IHB1YmxpY1Byb3BlcnRpZXNNYXBba2V5XShpbnN0YW5jZSksXG4gICAgICAvLyBpbnRlcmNlcHRlZCBieSB0aGUgcHJveHkgc28gbm8gbmVlZCBmb3IgaW1wbGVtZW50YXRpb24sXG4gICAgICAvLyBidXQgbmVlZGVkIHRvIHByZXZlbnQgc2V0IGVycm9yc1xuICAgICAgc2V0OiBOT09QXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gZXhwb3NlUHJvcHNPblJlbmRlckNvbnRleHQoaW5zdGFuY2UpIHtcbiAgY29uc3Qge1xuICAgIGN0eCxcbiAgICBwcm9wc09wdGlvbnM6IFtwcm9wc09wdGlvbnNdXG4gIH0gPSBpbnN0YW5jZTtcbiAgaWYgKHByb3BzT3B0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKHByb3BzT3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IGluc3RhbmNlLnByb3BzW2tleV0sXG4gICAgICAgIHNldDogTk9PUFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGV4cG9zZVNldHVwU3RhdGVPblJlbmRlckNvbnRleHQoaW5zdGFuY2UpIHtcbiAgY29uc3QgeyBjdHgsIHNldHVwU3RhdGUgfSA9IGluc3RhbmNlO1xuICBPYmplY3Qua2V5cyh0b1JhdyhzZXR1cFN0YXRlKSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKCFzZXR1cFN0YXRlLl9faXNTY3JpcHRTZXR1cCkge1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRQcmVmaXgoa2V5WzBdKSkge1xuICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgYHNldHVwKCkgcmV0dXJuIHByb3BlcnR5ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICBrZXlcbiAgICAgICAgICApfSBzaG91bGQgbm90IHN0YXJ0IHdpdGggXCIkXCIgb3IgXCJfXCIgd2hpY2ggYXJlIHJlc2VydmVkIHByZWZpeGVzIGZvciBWdWUgaW50ZXJuYWxzLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiBzZXR1cFN0YXRlW2tleV0sXG4gICAgICAgIHNldDogTk9PUFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3Qgd2FyblJ1bnRpbWVVc2FnZSA9IChtZXRob2QpID0+IHdhcm4kMShcbiAgYCR7bWV0aG9kfSgpIGlzIGEgY29tcGlsZXItaGludCBoZWxwZXIgdGhhdCBpcyBvbmx5IHVzYWJsZSBpbnNpZGUgPHNjcmlwdCBzZXR1cD4gb2YgYSBzaW5nbGUgZmlsZSBjb21wb25lbnQuIEl0cyBhcmd1bWVudHMgc2hvdWxkIGJlIGNvbXBpbGVkIGF3YXkgYW5kIHBhc3NpbmcgaXQgYXQgcnVudGltZSBoYXMgbm8gZWZmZWN0LmBcbik7XG5mdW5jdGlvbiBkZWZpbmVQcm9wcygpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuUnVudGltZVVzYWdlKGBkZWZpbmVQcm9wc2ApO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZGVmaW5lRW1pdHMoKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShgZGVmaW5lRW1pdHNgKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGRlZmluZUV4cG9zZShleHBvc2VkKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShgZGVmaW5lRXhwb3NlYCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGRlZmluZU9wdGlvbnMob3B0aW9ucykge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm5SdW50aW1lVXNhZ2UoYGRlZmluZU9wdGlvbnNgKTtcbiAgfVxufVxuZnVuY3Rpb24gZGVmaW5lU2xvdHMoKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShgZGVmaW5lU2xvdHNgKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGRlZmluZU1vZGVsKCkge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm5SdW50aW1lVXNhZ2UoXCJkZWZpbmVNb2RlbFwiKTtcbiAgfVxufVxuZnVuY3Rpb24gd2l0aERlZmF1bHRzKHByb3BzLCBkZWZhdWx0cykge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm5SdW50aW1lVXNhZ2UoYHdpdGhEZWZhdWx0c2ApO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gdXNlU2xvdHMoKSB7XG4gIHJldHVybiBnZXRDb250ZXh0KCkuc2xvdHM7XG59XG5mdW5jdGlvbiB1c2VBdHRycygpIHtcbiAgcmV0dXJuIGdldENvbnRleHQoKS5hdHRycztcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoKSB7XG4gIGNvbnN0IGkgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWkpIHtcbiAgICB3YXJuJDEoYHVzZUNvbnRleHQoKSBjYWxsZWQgd2l0aG91dCBhY3RpdmUgaW5zdGFuY2UuYCk7XG4gIH1cbiAgcmV0dXJuIGkuc2V0dXBDb250ZXh0IHx8IChpLnNldHVwQ29udGV4dCA9IGNyZWF0ZVNldHVwQ29udGV4dChpKSk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVQcm9wc09yRW1pdHMocHJvcHMpIHtcbiAgcmV0dXJuIGlzQXJyYXkocHJvcHMpID8gcHJvcHMucmVkdWNlKFxuICAgIChub3JtYWxpemVkLCBwKSA9PiAobm9ybWFsaXplZFtwXSA9IG51bGwsIG5vcm1hbGl6ZWQpLFxuICAgIHt9XG4gICkgOiBwcm9wcztcbn1cbmZ1bmN0aW9uIG1lcmdlRGVmYXVsdHMocmF3LCBkZWZhdWx0cykge1xuICBjb25zdCBwcm9wcyA9IG5vcm1hbGl6ZVByb3BzT3JFbWl0cyhyYXcpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0cykge1xuICAgIGlmIChrZXkuc3RhcnRzV2l0aChcIl9fc2tpcFwiKSkgY29udGludWU7XG4gICAgbGV0IG9wdCA9IHByb3BzW2tleV07XG4gICAgaWYgKG9wdCkge1xuICAgICAgaWYgKGlzQXJyYXkob3B0KSB8fCBpc0Z1bmN0aW9uKG9wdCkpIHtcbiAgICAgICAgb3B0ID0gcHJvcHNba2V5XSA9IHsgdHlwZTogb3B0LCBkZWZhdWx0OiBkZWZhdWx0c1trZXldIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHQuZGVmYXVsdCA9IGRlZmF1bHRzW2tleV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHQgPT09IG51bGwpIHtcbiAgICAgIG9wdCA9IHByb3BzW2tleV0gPSB7IGRlZmF1bHQ6IGRlZmF1bHRzW2tleV0gfTtcbiAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHdhcm4kMShgcHJvcHMgZGVmYXVsdCBrZXkgXCIke2tleX1cIiBoYXMgbm8gY29ycmVzcG9uZGluZyBkZWNsYXJhdGlvbi5gKTtcbiAgICB9XG4gICAgaWYgKG9wdCAmJiBkZWZhdWx0c1tgX19za2lwXyR7a2V5fWBdKSB7XG4gICAgICBvcHQuc2tpcEZhY3RvcnkgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcHM7XG59XG5mdW5jdGlvbiBtZXJnZU1vZGVscyhhLCBiKSB7XG4gIGlmICghYSB8fCAhYikgcmV0dXJuIGEgfHwgYjtcbiAgaWYgKGlzQXJyYXkoYSkgJiYgaXNBcnJheShiKSkgcmV0dXJuIGEuY29uY2F0KGIpO1xuICByZXR1cm4gZXh0ZW5kKHt9LCBub3JtYWxpemVQcm9wc09yRW1pdHMoYSksIG5vcm1hbGl6ZVByb3BzT3JFbWl0cyhiKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQcm9wc1Jlc3RQcm94eShwcm9wcywgZXhjbHVkZWRLZXlzKSB7XG4gIGNvbnN0IHJldCA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgIGlmICghZXhjbHVkZWRLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXQsIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHByb3BzW2tleV1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gd2l0aEFzeW5jQ29udGV4dChnZXRBd2FpdGFibGUpIHtcbiAgY29uc3QgY3R4ID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFjdHgpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgd2l0aEFzeW5jQ29udGV4dCBjYWxsZWQgd2l0aG91dCBhY3RpdmUgY3VycmVudCBpbnN0YW5jZS4gVGhpcyBpcyBsaWtlbHkgYSBidWcuYFxuICAgICk7XG4gIH1cbiAgbGV0IGF3YWl0YWJsZSA9IGdldEF3YWl0YWJsZSgpO1xuICB1bnNldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBpZiAoaXNQcm9taXNlKGF3YWl0YWJsZSkpIHtcbiAgICBhd2FpdGFibGUgPSBhd2FpdGFibGUuY2F0Y2goKGUpID0+IHtcbiAgICAgIHNldEN1cnJlbnRJbnN0YW5jZShjdHgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gW2F3YWl0YWJsZSwgKCkgPT4gc2V0Q3VycmVudEluc3RhbmNlKGN0eCldO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEdXBsaWNhdGVDaGVja2VyKCkge1xuICBjb25zdCBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKHR5cGUsIGtleSkgPT4ge1xuICAgIGlmIChjYWNoZVtrZXldKSB7XG4gICAgICB3YXJuJDEoYCR7dHlwZX0gcHJvcGVydHkgXCIke2tleX1cIiBpcyBhbHJlYWR5IGRlZmluZWQgaW4gJHtjYWNoZVtrZXldfS5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVba2V5XSA9IHR5cGU7XG4gICAgfVxuICB9O1xufVxubGV0IHNob3VsZENhY2hlQWNjZXNzID0gdHJ1ZTtcbmZ1bmN0aW9uIGFwcGx5T3B0aW9ucyhpbnN0YW5jZSkge1xuICBjb25zdCBvcHRpb25zID0gcmVzb2x2ZU1lcmdlZE9wdGlvbnMoaW5zdGFuY2UpO1xuICBjb25zdCBwdWJsaWNUaGlzID0gaW5zdGFuY2UucHJveHk7XG4gIGNvbnN0IGN0eCA9IGluc3RhbmNlLmN0eDtcbiAgc2hvdWxkQ2FjaGVBY2Nlc3MgPSBmYWxzZTtcbiAgaWYgKG9wdGlvbnMuYmVmb3JlQ3JlYXRlKSB7XG4gICAgY2FsbEhvb2sob3B0aW9ucy5iZWZvcmVDcmVhdGUsIGluc3RhbmNlLCBcImJjXCIpO1xuICB9XG4gIGNvbnN0IHtcbiAgICAvLyBzdGF0ZVxuICAgIGRhdGE6IGRhdGFPcHRpb25zLFxuICAgIGNvbXB1dGVkOiBjb21wdXRlZE9wdGlvbnMsXG4gICAgbWV0aG9kcyxcbiAgICB3YXRjaDogd2F0Y2hPcHRpb25zLFxuICAgIHByb3ZpZGU6IHByb3ZpZGVPcHRpb25zLFxuICAgIGluamVjdDogaW5qZWN0T3B0aW9ucyxcbiAgICAvLyBsaWZlY3ljbGVcbiAgICBjcmVhdGVkLFxuICAgIGJlZm9yZU1vdW50LFxuICAgIG1vdW50ZWQsXG4gICAgYmVmb3JlVXBkYXRlLFxuICAgIHVwZGF0ZWQsXG4gICAgYWN0aXZhdGVkLFxuICAgIGRlYWN0aXZhdGVkLFxuICAgIGJlZm9yZURlc3Ryb3ksXG4gICAgYmVmb3JlVW5tb3VudCxcbiAgICBkZXN0cm95ZWQsXG4gICAgdW5tb3VudGVkLFxuICAgIHJlbmRlcixcbiAgICByZW5kZXJUcmFja2VkLFxuICAgIHJlbmRlclRyaWdnZXJlZCxcbiAgICBlcnJvckNhcHR1cmVkLFxuICAgIHNlcnZlclByZWZldGNoLFxuICAgIC8vIHB1YmxpYyBBUElcbiAgICBleHBvc2UsXG4gICAgaW5oZXJpdEF0dHJzLFxuICAgIC8vIGFzc2V0c1xuICAgIGNvbXBvbmVudHMsXG4gICAgZGlyZWN0aXZlcyxcbiAgICBmaWx0ZXJzXG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gY3JlYXRlRHVwbGljYXRlQ2hlY2tlcigpIDogbnVsbDtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBjb25zdCBbcHJvcHNPcHRpb25zXSA9IGluc3RhbmNlLnByb3BzT3B0aW9ucztcbiAgICBpZiAocHJvcHNPcHRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wc09wdGlvbnMpIHtcbiAgICAgICAgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzKFwiUHJvcHNcIiAvKiBQUk9QUyAqLywga2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGluamVjdE9wdGlvbnMpIHtcbiAgICByZXNvbHZlSW5qZWN0aW9ucyhpbmplY3RPcHRpb25zLCBjdHgsIGNoZWNrRHVwbGljYXRlUHJvcGVydGllcyk7XG4gIH1cbiAgaWYgKG1ldGhvZHMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBjb25zdCBtZXRob2RIYW5kbGVyID0gbWV0aG9kc1trZXldO1xuICAgICAgaWYgKGlzRnVuY3Rpb24obWV0aG9kSGFuZGxlcikpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiBtZXRob2RIYW5kbGVyLmJpbmQocHVibGljVGhpcyksXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHhba2V5XSA9IG1ldGhvZEhhbmRsZXIuYmluZChwdWJsaWNUaGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIGNoZWNrRHVwbGljYXRlUHJvcGVydGllcyhcIk1ldGhvZHNcIiAvKiBNRVRIT0RTICovLCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgd2FybiQxKFxuICAgICAgICAgIGBNZXRob2QgXCIke2tleX1cIiBoYXMgdHlwZSBcIiR7dHlwZW9mIG1ldGhvZEhhbmRsZXJ9XCIgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGRhdGFPcHRpb25zKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzRnVuY3Rpb24oZGF0YU9wdGlvbnMpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBUaGUgZGF0YSBvcHRpb24gbXVzdCBiZSBhIGZ1bmN0aW9uLiBQbGFpbiBvYmplY3QgdXNhZ2UgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC5gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gZGF0YU9wdGlvbnMuY2FsbChwdWJsaWNUaGlzLCBwdWJsaWNUaGlzKTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBpc1Byb21pc2UoZGF0YSkpIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYGRhdGEoKSByZXR1cm5lZCBhIFByb21pc2UgLSBub3RlIGRhdGEoKSBjYW5ub3QgYmUgYXN5bmM7IElmIHlvdSBpbnRlbmQgdG8gcGVyZm9ybSBkYXRhIGZldGNoaW5nIGJlZm9yZSBjb21wb25lbnQgcmVuZGVycywgdXNlIGFzeW5jIHNldHVwKCkgKyA8U3VzcGVuc2U+LmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGBkYXRhKCkgc2hvdWxkIHJldHVybiBhbiBvYmplY3QuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlLmRhdGEgPSByZWFjdGl2ZShkYXRhKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMoXCJEYXRhXCIgLyogREFUQSAqLywga2V5KTtcbiAgICAgICAgICBpZiAoIWlzUmVzZXJ2ZWRQcmVmaXgoa2V5WzBdKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwga2V5LCB7XG4gICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBkYXRhW2tleV0sXG4gICAgICAgICAgICAgIHNldDogTk9PUFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNob3VsZENhY2hlQWNjZXNzID0gdHJ1ZTtcbiAgaWYgKGNvbXB1dGVkT3B0aW9ucykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbXB1dGVkT3B0aW9ucykge1xuICAgICAgY29uc3Qgb3B0ID0gY29tcHV0ZWRPcHRpb25zW2tleV07XG4gICAgICBjb25zdCBnZXQgPSBpc0Z1bmN0aW9uKG9wdCkgPyBvcHQuYmluZChwdWJsaWNUaGlzLCBwdWJsaWNUaGlzKSA6IGlzRnVuY3Rpb24ob3B0LmdldCkgPyBvcHQuZ2V0LmJpbmQocHVibGljVGhpcywgcHVibGljVGhpcykgOiBOT09QO1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgZ2V0ID09PSBOT09QKSB7XG4gICAgICAgIHdhcm4kMShgQ29tcHV0ZWQgcHJvcGVydHkgXCIke2tleX1cIiBoYXMgbm8gZ2V0dGVyLmApO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2V0ID0gIWlzRnVuY3Rpb24ob3B0KSAmJiBpc0Z1bmN0aW9uKG9wdC5zZXQpID8gb3B0LnNldC5iaW5kKHB1YmxpY1RoaXMpIDogISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/ICgpID0+IHtcbiAgICAgICAgd2FybiQxKFxuICAgICAgICAgIGBXcml0ZSBvcGVyYXRpb24gZmFpbGVkOiBjb21wdXRlZCBwcm9wZXJ0eSBcIiR7a2V5fVwiIGlzIHJlYWRvbmx5LmBcbiAgICAgICAgKTtcbiAgICAgIH0gOiBOT09QO1xuICAgICAgY29uc3QgYyA9IGNvbXB1dGVkKHtcbiAgICAgICAgZ2V0LFxuICAgICAgICBzZXRcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwga2V5LCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiBjLnZhbHVlLFxuICAgICAgICBzZXQ6ICh2KSA9PiBjLnZhbHVlID0gdlxuICAgICAgfSk7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMoXCJDb21wdXRlZFwiIC8qIENPTVBVVEVEICovLCBrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAod2F0Y2hPcHRpb25zKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gd2F0Y2hPcHRpb25zKSB7XG4gICAgICBjcmVhdGVXYXRjaGVyKHdhdGNoT3B0aW9uc1trZXldLCBjdHgsIHB1YmxpY1RoaXMsIGtleSk7XG4gICAgfVxuICB9XG4gIGlmIChwcm92aWRlT3B0aW9ucykge1xuICAgIGNvbnN0IHByb3ZpZGVzID0gaXNGdW5jdGlvbihwcm92aWRlT3B0aW9ucykgPyBwcm92aWRlT3B0aW9ucy5jYWxsKHB1YmxpY1RoaXMpIDogcHJvdmlkZU9wdGlvbnM7XG4gICAgUmVmbGVjdC5vd25LZXlzKHByb3ZpZGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHByb3ZpZGUoa2V5LCBwcm92aWRlc1trZXldKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoY3JlYXRlZCkge1xuICAgIGNhbGxIb29rKGNyZWF0ZWQsIGluc3RhbmNlLCBcImNcIik7XG4gIH1cbiAgZnVuY3Rpb24gcmVnaXN0ZXJMaWZlY3ljbGVIb29rKHJlZ2lzdGVyLCBob29rKSB7XG4gICAgaWYgKGlzQXJyYXkoaG9vaykpIHtcbiAgICAgIGhvb2suZm9yRWFjaCgoX2hvb2spID0+IHJlZ2lzdGVyKF9ob29rLmJpbmQocHVibGljVGhpcykpKTtcbiAgICB9IGVsc2UgaWYgKGhvb2spIHtcbiAgICAgIHJlZ2lzdGVyKGhvb2suYmluZChwdWJsaWNUaGlzKSk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvbkJlZm9yZU1vdW50LCBiZWZvcmVNb3VudCk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvbk1vdW50ZWQsIG1vdW50ZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25CZWZvcmVVcGRhdGUsIGJlZm9yZVVwZGF0ZSk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvblVwZGF0ZWQsIHVwZGF0ZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25BY3RpdmF0ZWQsIGFjdGl2YXRlZCk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvbkRlYWN0aXZhdGVkLCBkZWFjdGl2YXRlZCk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvbkVycm9yQ2FwdHVyZWQsIGVycm9yQ2FwdHVyZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25SZW5kZXJUcmFja2VkLCByZW5kZXJUcmFja2VkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uUmVuZGVyVHJpZ2dlcmVkLCByZW5kZXJUcmlnZ2VyZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25CZWZvcmVVbm1vdW50LCBiZWZvcmVVbm1vdW50KTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uVW5tb3VudGVkLCB1bm1vdW50ZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25TZXJ2ZXJQcmVmZXRjaCwgc2VydmVyUHJlZmV0Y2gpO1xuICBpZiAoaXNBcnJheShleHBvc2UpKSB7XG4gICAgaWYgKGV4cG9zZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGV4cG9zZWQgPSBpbnN0YW5jZS5leHBvc2VkIHx8IChpbnN0YW5jZS5leHBvc2VkID0ge30pO1xuICAgICAgZXhwb3NlLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3NlZCwga2V5LCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiBwdWJsaWNUaGlzW2tleV0sXG4gICAgICAgICAgc2V0OiAodmFsKSA9PiBwdWJsaWNUaGlzW2tleV0gPSB2YWxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFpbnN0YW5jZS5leHBvc2VkKSB7XG4gICAgICBpbnN0YW5jZS5leHBvc2VkID0ge307XG4gICAgfVxuICB9XG4gIGlmIChyZW5kZXIgJiYgaW5zdGFuY2UucmVuZGVyID09PSBOT09QKSB7XG4gICAgaW5zdGFuY2UucmVuZGVyID0gcmVuZGVyO1xuICB9XG4gIGlmIChpbmhlcml0QXR0cnMgIT0gbnVsbCkge1xuICAgIGluc3RhbmNlLmluaGVyaXRBdHRycyA9IGluaGVyaXRBdHRycztcbiAgfVxuICBpZiAoY29tcG9uZW50cykgaW5zdGFuY2UuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gIGlmIChkaXJlY3RpdmVzKSBpbnN0YW5jZS5kaXJlY3RpdmVzID0gZGlyZWN0aXZlcztcbn1cbmZ1bmN0aW9uIHJlc29sdmVJbmplY3Rpb25zKGluamVjdE9wdGlvbnMsIGN0eCwgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzID0gTk9PUCkge1xuICBpZiAoaXNBcnJheShpbmplY3RPcHRpb25zKSkge1xuICAgIGluamVjdE9wdGlvbnMgPSBub3JtYWxpemVJbmplY3QoaW5qZWN0T3B0aW9ucyk7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gaW5qZWN0T3B0aW9ucykge1xuICAgIGNvbnN0IG9wdCA9IGluamVjdE9wdGlvbnNba2V5XTtcbiAgICBsZXQgaW5qZWN0ZWQ7XG4gICAgaWYgKGlzT2JqZWN0KG9wdCkpIHtcbiAgICAgIGlmIChcImRlZmF1bHRcIiBpbiBvcHQpIHtcbiAgICAgICAgaW5qZWN0ZWQgPSBpbmplY3QoXG4gICAgICAgICAgb3B0LmZyb20gfHwga2V5LFxuICAgICAgICAgIG9wdC5kZWZhdWx0LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluamVjdGVkID0gaW5qZWN0KG9wdC5mcm9tIHx8IGtleSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluamVjdGVkID0gaW5qZWN0KG9wdCk7XG4gICAgfVxuICAgIGlmIChpc1JlZihpbmplY3RlZCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4gaW5qZWN0ZWQudmFsdWUsXG4gICAgICAgIHNldDogKHYpID0+IGluamVjdGVkLnZhbHVlID0gdlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eFtrZXldID0gaW5qZWN0ZWQ7XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMoXCJJbmplY3RcIiAvKiBJTkpFQ1QgKi8sIGtleSk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBjYWxsSG9vayhob29rLCBpbnN0YW5jZSwgdHlwZSkge1xuICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhcbiAgICBpc0FycmF5KGhvb2spID8gaG9vay5tYXAoKGgpID0+IGguYmluZChpbnN0YW5jZS5wcm94eSkpIDogaG9vay5iaW5kKGluc3RhbmNlLnByb3h5KSxcbiAgICBpbnN0YW5jZSxcbiAgICB0eXBlXG4gICk7XG59XG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyKHJhdywgY3R4LCBwdWJsaWNUaGlzLCBrZXkpIHtcbiAgY29uc3QgZ2V0dGVyID0ga2V5LmluY2x1ZGVzKFwiLlwiKSA/IGNyZWF0ZVBhdGhHZXR0ZXIocHVibGljVGhpcywga2V5KSA6ICgpID0+IHB1YmxpY1RoaXNba2V5XTtcbiAgaWYgKGlzU3RyaW5nKHJhdykpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gY3R4W3Jhd107XG4gICAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgIHdhdGNoKGdldHRlciwgaGFuZGxlcik7XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuJDEoYEludmFsaWQgd2F0Y2ggaGFuZGxlciBzcGVjaWZpZWQgYnkga2V5IFwiJHtyYXd9XCJgLCBoYW5kbGVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihyYXcpKSB7XG4gICAgd2F0Y2goZ2V0dGVyLCByYXcuYmluZChwdWJsaWNUaGlzKSk7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QocmF3KSkge1xuICAgIGlmIChpc0FycmF5KHJhdykpIHtcbiAgICAgIHJhdy5mb3JFYWNoKChyKSA9PiBjcmVhdGVXYXRjaGVyKHIsIGN0eCwgcHVibGljVGhpcywga2V5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBpc0Z1bmN0aW9uKHJhdy5oYW5kbGVyKSA/IHJhdy5oYW5kbGVyLmJpbmQocHVibGljVGhpcykgOiBjdHhbcmF3LmhhbmRsZXJdO1xuICAgICAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgd2F0Y2goZ2V0dGVyLCBoYW5kbGVyLCByYXcpO1xuICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHdhcm4kMShgSW52YWxpZCB3YXRjaCBoYW5kbGVyIHNwZWNpZmllZCBieSBrZXkgXCIke3Jhdy5oYW5kbGVyfVwiYCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuJDEoYEludmFsaWQgd2F0Y2ggb3B0aW9uOiBcIiR7a2V5fVwiYCwgcmF3KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZU1lcmdlZE9wdGlvbnMoaW5zdGFuY2UpIHtcbiAgY29uc3QgYmFzZSA9IGluc3RhbmNlLnR5cGU7XG4gIGNvbnN0IHsgbWl4aW5zLCBleHRlbmRzOiBleHRlbmRzT3B0aW9ucyB9ID0gYmFzZTtcbiAgY29uc3Qge1xuICAgIG1peGluczogZ2xvYmFsTWl4aW5zLFxuICAgIG9wdGlvbnNDYWNoZTogY2FjaGUsXG4gICAgY29uZmlnOiB7IG9wdGlvbk1lcmdlU3RyYXRlZ2llcyB9XG4gIH0gPSBpbnN0YW5jZS5hcHBDb250ZXh0O1xuICBjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQoYmFzZSk7XG4gIGxldCByZXNvbHZlZDtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJlc29sdmVkID0gY2FjaGVkO1xuICB9IGVsc2UgaWYgKCFnbG9iYWxNaXhpbnMubGVuZ3RoICYmICFtaXhpbnMgJiYgIWV4dGVuZHNPcHRpb25zKSB7XG4gICAge1xuICAgICAgcmVzb2x2ZWQgPSBiYXNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXNvbHZlZCA9IHt9O1xuICAgIGlmIChnbG9iYWxNaXhpbnMubGVuZ3RoKSB7XG4gICAgICBnbG9iYWxNaXhpbnMuZm9yRWFjaChcbiAgICAgICAgKG0pID0+IG1lcmdlT3B0aW9ucyhyZXNvbHZlZCwgbSwgb3B0aW9uTWVyZ2VTdHJhdGVnaWVzLCB0cnVlKVxuICAgICAgKTtcbiAgICB9XG4gICAgbWVyZ2VPcHRpb25zKHJlc29sdmVkLCBiYXNlLCBvcHRpb25NZXJnZVN0cmF0ZWdpZXMpO1xuICB9XG4gIGlmIChpc09iamVjdChiYXNlKSkge1xuICAgIGNhY2hlLnNldChiYXNlLCByZXNvbHZlZCk7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVkO1xufVxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHRvLCBmcm9tLCBzdHJhdHMsIGFzTWl4aW4gPSBmYWxzZSkge1xuICBjb25zdCB7IG1peGlucywgZXh0ZW5kczogZXh0ZW5kc09wdGlvbnMgfSA9IGZyb207XG4gIGlmIChleHRlbmRzT3B0aW9ucykge1xuICAgIG1lcmdlT3B0aW9ucyh0bywgZXh0ZW5kc09wdGlvbnMsIHN0cmF0cywgdHJ1ZSk7XG4gIH1cbiAgaWYgKG1peGlucykge1xuICAgIG1peGlucy5mb3JFYWNoKFxuICAgICAgKG0pID0+IG1lcmdlT3B0aW9ucyh0bywgbSwgc3RyYXRzLCB0cnVlKVxuICAgICk7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gZnJvbSkge1xuICAgIGlmIChhc01peGluICYmIGtleSA9PT0gXCJleHBvc2VcIikge1xuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3YXJuJDEoXG4gICAgICAgIGBcImV4cG9zZVwiIG9wdGlvbiBpcyBpZ25vcmVkIHdoZW4gZGVjbGFyZWQgaW4gbWl4aW5zIG9yIGV4dGVuZHMuIEl0IHNob3VsZCBvbmx5IGJlIGRlY2xhcmVkIGluIHRoZSBiYXNlIGNvbXBvbmVudCBpdHNlbGYuYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyYXQgPSBpbnRlcm5hbE9wdGlvbk1lcmdlU3RyYXRzW2tleV0gfHwgc3RyYXRzICYmIHN0cmF0c1trZXldO1xuICAgICAgdG9ba2V5XSA9IHN0cmF0ID8gc3RyYXQodG9ba2V5XSwgZnJvbVtrZXldKSA6IGZyb21ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuY29uc3QgaW50ZXJuYWxPcHRpb25NZXJnZVN0cmF0cyA9IHtcbiAgZGF0YTogbWVyZ2VEYXRhRm4sXG4gIHByb3BzOiBtZXJnZUVtaXRzT3JQcm9wc09wdGlvbnMsXG4gIGVtaXRzOiBtZXJnZUVtaXRzT3JQcm9wc09wdGlvbnMsXG4gIC8vIG9iamVjdHNcbiAgbWV0aG9kczogbWVyZ2VPYmplY3RPcHRpb25zLFxuICBjb21wdXRlZDogbWVyZ2VPYmplY3RPcHRpb25zLFxuICAvLyBsaWZlY3ljbGVcbiAgYmVmb3JlQ3JlYXRlOiBtZXJnZUFzQXJyYXksXG4gIGNyZWF0ZWQ6IG1lcmdlQXNBcnJheSxcbiAgYmVmb3JlTW91bnQ6IG1lcmdlQXNBcnJheSxcbiAgbW91bnRlZDogbWVyZ2VBc0FycmF5LFxuICBiZWZvcmVVcGRhdGU6IG1lcmdlQXNBcnJheSxcbiAgdXBkYXRlZDogbWVyZ2VBc0FycmF5LFxuICBiZWZvcmVEZXN0cm95OiBtZXJnZUFzQXJyYXksXG4gIGJlZm9yZVVubW91bnQ6IG1lcmdlQXNBcnJheSxcbiAgZGVzdHJveWVkOiBtZXJnZUFzQXJyYXksXG4gIHVubW91bnRlZDogbWVyZ2VBc0FycmF5LFxuICBhY3RpdmF0ZWQ6IG1lcmdlQXNBcnJheSxcbiAgZGVhY3RpdmF0ZWQ6IG1lcmdlQXNBcnJheSxcbiAgZXJyb3JDYXB0dXJlZDogbWVyZ2VBc0FycmF5LFxuICBzZXJ2ZXJQcmVmZXRjaDogbWVyZ2VBc0FycmF5LFxuICAvLyBhc3NldHNcbiAgY29tcG9uZW50czogbWVyZ2VPYmplY3RPcHRpb25zLFxuICBkaXJlY3RpdmVzOiBtZXJnZU9iamVjdE9wdGlvbnMsXG4gIC8vIHdhdGNoXG4gIHdhdGNoOiBtZXJnZVdhdGNoT3B0aW9ucyxcbiAgLy8gcHJvdmlkZSAvIGluamVjdFxuICBwcm92aWRlOiBtZXJnZURhdGFGbixcbiAgaW5qZWN0OiBtZXJnZUluamVjdFxufTtcbmZ1bmN0aW9uIG1lcmdlRGF0YUZuKHRvLCBmcm9tKSB7XG4gIGlmICghZnJvbSkge1xuICAgIHJldHVybiB0bztcbiAgfVxuICBpZiAoIXRvKSB7XG4gICAgcmV0dXJuIGZyb207XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZERhdGFGbigpIHtcbiAgICByZXR1cm4gKGV4dGVuZCkoXG4gICAgICBpc0Z1bmN0aW9uKHRvKSA/IHRvLmNhbGwodGhpcywgdGhpcykgOiB0byxcbiAgICAgIGlzRnVuY3Rpb24oZnJvbSkgPyBmcm9tLmNhbGwodGhpcywgdGhpcykgOiBmcm9tXG4gICAgKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIG1lcmdlSW5qZWN0KHRvLCBmcm9tKSB7XG4gIHJldHVybiBtZXJnZU9iamVjdE9wdGlvbnMobm9ybWFsaXplSW5qZWN0KHRvKSwgbm9ybWFsaXplSW5qZWN0KGZyb20pKTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluamVjdChyYXcpIHtcbiAgaWYgKGlzQXJyYXkocmF3KSkge1xuICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbcmF3W2ldXSA9IHJhd1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICByZXR1cm4gcmF3O1xufVxuZnVuY3Rpb24gbWVyZ2VBc0FycmF5KHRvLCBmcm9tKSB7XG4gIHJldHVybiB0byA/IFsuLi5uZXcgU2V0KFtdLmNvbmNhdCh0bywgZnJvbSkpXSA6IGZyb207XG59XG5mdW5jdGlvbiBtZXJnZU9iamVjdE9wdGlvbnModG8sIGZyb20pIHtcbiAgcmV0dXJuIHRvID8gZXh0ZW5kKC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLCB0bywgZnJvbSkgOiBmcm9tO1xufVxuZnVuY3Rpb24gbWVyZ2VFbWl0c09yUHJvcHNPcHRpb25zKHRvLCBmcm9tKSB7XG4gIGlmICh0bykge1xuICAgIGlmIChpc0FycmF5KHRvKSAmJiBpc0FycmF5KGZyb20pKSB7XG4gICAgICByZXR1cm4gWy4uLi8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KFsuLi50bywgLi4uZnJvbV0pXTtcbiAgICB9XG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgbm9ybWFsaXplUHJvcHNPckVtaXRzKHRvKSxcbiAgICAgIG5vcm1hbGl6ZVByb3BzT3JFbWl0cyhmcm9tICE9IG51bGwgPyBmcm9tIDoge30pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnJvbTtcbiAgfVxufVxuZnVuY3Rpb24gbWVyZ2VXYXRjaE9wdGlvbnModG8sIGZyb20pIHtcbiAgaWYgKCF0bykgcmV0dXJuIGZyb207XG4gIGlmICghZnJvbSkgcmV0dXJuIHRvO1xuICBjb25zdCBtZXJnZWQgPSBleHRlbmQoLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCksIHRvKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZnJvbSkge1xuICAgIG1lcmdlZFtrZXldID0gbWVyZ2VBc0FycmF5KHRvW2tleV0sIGZyb21ba2V5XSk7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXBwQ29udGV4dCgpIHtcbiAgcmV0dXJuIHtcbiAgICBhcHA6IG51bGwsXG4gICAgY29uZmlnOiB7XG4gICAgICBpc05hdGl2ZVRhZzogTk8sXG4gICAgICBwZXJmb3JtYW5jZTogZmFsc2UsXG4gICAgICBnbG9iYWxQcm9wZXJ0aWVzOiB7fSxcbiAgICAgIG9wdGlvbk1lcmdlU3RyYXRlZ2llczoge30sXG4gICAgICBlcnJvckhhbmRsZXI6IHZvaWQgMCxcbiAgICAgIHdhcm5IYW5kbGVyOiB2b2lkIDAsXG4gICAgICBjb21waWxlck9wdGlvbnM6IHt9XG4gICAgfSxcbiAgICBtaXhpbnM6IFtdLFxuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIGRpcmVjdGl2ZXM6IHt9LFxuICAgIHByb3ZpZGVzOiAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBvcHRpb25zQ2FjaGU6IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpLFxuICAgIHByb3BzQ2FjaGU6IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpLFxuICAgIGVtaXRzQ2FjaGU6IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpXG4gIH07XG59XG5sZXQgdWlkJDEgPSAwO1xuZnVuY3Rpb24gY3JlYXRlQXBwQVBJKHJlbmRlciwgaHlkcmF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlQXBwKHJvb3RDb21wb25lbnQsIHJvb3RQcm9wcyA9IG51bGwpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24ocm9vdENvbXBvbmVudCkpIHtcbiAgICAgIHJvb3RDb21wb25lbnQgPSBleHRlbmQoe30sIHJvb3RDb21wb25lbnQpO1xuICAgIH1cbiAgICBpZiAocm9vdFByb3BzICE9IG51bGwgJiYgIWlzT2JqZWN0KHJvb3RQcm9wcykpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGByb290IHByb3BzIHBhc3NlZCB0byBhcHAubW91bnQoKSBtdXN0IGJlIGFuIG9iamVjdC5gKTtcbiAgICAgIHJvb3RQcm9wcyA9IG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRleHQgPSBjcmVhdGVBcHBDb250ZXh0KCk7XG4gICAgY29uc3QgaW5zdGFsbGVkUGx1Z2lucyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha1NldCgpO1xuICAgIGxldCBpc01vdW50ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBhcHAgPSBjb250ZXh0LmFwcCA9IHtcbiAgICAgIF91aWQ6IHVpZCQxKyssXG4gICAgICBfY29tcG9uZW50OiByb290Q29tcG9uZW50LFxuICAgICAgX3Byb3BzOiByb290UHJvcHMsXG4gICAgICBfY29udGFpbmVyOiBudWxsLFxuICAgICAgX2NvbnRleHQ6IGNvbnRleHQsXG4gICAgICBfaW5zdGFuY2U6IG51bGwsXG4gICAgICB2ZXJzaW9uLFxuICAgICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuY29uZmlnO1xuICAgICAgfSxcbiAgICAgIHNldCBjb25maWcodikge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBhcHAuY29uZmlnIGNhbm5vdCBiZSByZXBsYWNlZC4gTW9kaWZ5IGluZGl2aWR1YWwgb3B0aW9ucyBpbnN0ZWFkLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlKHBsdWdpbiwgLi4ub3B0aW9ucykge1xuICAgICAgICBpZiAoaW5zdGFsbGVkUGx1Z2lucy5oYXMocGx1Z2luKSkge1xuICAgICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGBQbHVnaW4gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRhcmdldCBhcHAuYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGx1Z2luICYmIGlzRnVuY3Rpb24ocGx1Z2luLmluc3RhbGwpKSB7XG4gICAgICAgICAgaW5zdGFsbGVkUGx1Z2lucy5hZGQocGx1Z2luKTtcbiAgICAgICAgICBwbHVnaW4uaW5zdGFsbChhcHAsIC4uLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ocGx1Z2luKSkge1xuICAgICAgICAgIGluc3RhbGxlZFBsdWdpbnMuYWRkKHBsdWdpbik7XG4gICAgICAgICAgcGx1Z2luKGFwcCwgLi4ub3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBBIHBsdWdpbiBtdXN0IGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCB3aXRoIGFuIFwiaW5zdGFsbFwiIGZ1bmN0aW9uLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgICB9LFxuICAgICAgbWl4aW4obWl4aW4pIHtcbiAgICAgICAgaWYgKF9fVlVFX09QVElPTlNfQVBJX18pIHtcbiAgICAgICAgICBpZiAoIWNvbnRleHQubWl4aW5zLmluY2x1ZGVzKG1peGluKSkge1xuICAgICAgICAgICAgY29udGV4dC5taXhpbnMucHVzaChtaXhpbik7XG4gICAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgICAgIFwiTWl4aW4gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRhcmdldCBhcHBcIiArIChtaXhpbi5uYW1lID8gYDogJHttaXhpbi5uYW1lfWAgOiBcIlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcIk1peGlucyBhcmUgb25seSBhdmFpbGFibGUgaW4gYnVpbGRzIHN1cHBvcnRpbmcgT3B0aW9ucyBBUElcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcDtcbiAgICAgIH0sXG4gICAgICBjb21wb25lbnQobmFtZSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKG5hbWUsIGNvbnRleHQuY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmNvbXBvbmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY29udGV4dC5jb21wb25lbnRzW25hbWVdKSB7XG4gICAgICAgICAgd2FybiQxKGBDb21wb25lbnQgXCIke25hbWV9XCIgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGluIHRhcmdldCBhcHAuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5jb21wb25lbnRzW25hbWVdID0gY29tcG9uZW50O1xuICAgICAgICByZXR1cm4gYXBwO1xuICAgICAgfSxcbiAgICAgIGRpcmVjdGl2ZShuYW1lLCBkaXJlY3RpdmUpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICB2YWxpZGF0ZURpcmVjdGl2ZU5hbWUobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkaXJlY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dC5kaXJlY3RpdmVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNvbnRleHQuZGlyZWN0aXZlc1tuYW1lXSkge1xuICAgICAgICAgIHdhcm4kMShgRGlyZWN0aXZlIFwiJHtuYW1lfVwiIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBpbiB0YXJnZXQgYXBwLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZGlyZWN0aXZlc1tuYW1lXSA9IGRpcmVjdGl2ZTtcbiAgICAgICAgcmV0dXJuIGFwcDtcbiAgICAgIH0sXG4gICAgICBtb3VudChyb290Q29udGFpbmVyLCBpc0h5ZHJhdGUsIG5hbWVzcGFjZSkge1xuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHJvb3RDb250YWluZXIuX192dWVfYXBwX18pIHtcbiAgICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgICAgYFRoZXJlIGlzIGFscmVhZHkgYW4gYXBwIGluc3RhbmNlIG1vdW50ZWQgb24gdGhlIGhvc3QgY29udGFpbmVyLlxuIElmIHlvdSB3YW50IHRvIG1vdW50IGFub3RoZXIgYXBwIG9uIHRoZSBzYW1lIGhvc3QgY29udGFpbmVyLCB5b3UgbmVlZCB0byB1bm1vdW50IHRoZSBwcmV2aW91cyBhcHAgYnkgY2FsbGluZyBcXGBhcHAudW5tb3VudCgpXFxgIGZpcnN0LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZub2RlID0gY3JlYXRlVk5vZGUocm9vdENvbXBvbmVudCwgcm9vdFByb3BzKTtcbiAgICAgICAgICB2bm9kZS5hcHBDb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBuYW1lc3BhY2UgPSBcInN2Z1wiO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmFtZXNwYWNlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbmFtZXNwYWNlID0gdm9pZCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgY29udGV4dC5yZWxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlbmRlcihcbiAgICAgICAgICAgICAgICBjbG9uZVZOb2RlKHZub2RlKSxcbiAgICAgICAgICAgICAgICByb290Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzSHlkcmF0ZSAmJiBoeWRyYXRlKSB7XG4gICAgICAgICAgICBoeWRyYXRlKHZub2RlLCByb290Q29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyKHZub2RlLCByb290Q29udGFpbmVyLCBuYW1lc3BhY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc01vdW50ZWQgPSB0cnVlO1xuICAgICAgICAgIGFwcC5fY29udGFpbmVyID0gcm9vdENvbnRhaW5lcjtcbiAgICAgICAgICByb290Q29udGFpbmVyLl9fdnVlX2FwcF9fID0gYXBwO1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgYXBwLl9pbnN0YW5jZSA9IHZub2RlLmNvbXBvbmVudDtcbiAgICAgICAgICAgIGRldnRvb2xzSW5pdEFwcChhcHAsIHZlcnNpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50UHVibGljSW5zdGFuY2Uodm5vZGUuY29tcG9uZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYEFwcCBoYXMgYWxyZWFkeSBiZWVuIG1vdW50ZWQuXG5JZiB5b3Ugd2FudCB0byByZW1vdW50IHRoZSBzYW1lIGFwcCwgbW92ZSB5b3VyIGFwcCBjcmVhdGlvbiBsb2dpYyBpbnRvIGEgZmFjdG9yeSBmdW5jdGlvbiBhbmQgY3JlYXRlIGZyZXNoIGFwcCBpbnN0YW5jZXMgZm9yIGVhY2ggbW91bnQgLSBlLmcuIFxcYGNvbnN0IGNyZWF0ZU15QXBwID0gKCkgPT4gY3JlYXRlQXBwKEFwcClcXGBgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVubW91bnQoKSB7XG4gICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICByZW5kZXIobnVsbCwgYXBwLl9jb250YWluZXIpO1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgYXBwLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICBkZXZ0b29sc1VubW91bnRBcHAoYXBwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlIGFwcC5fY29udGFpbmVyLl9fdnVlX2FwcF9fO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICB3YXJuJDEoYENhbm5vdCB1bm1vdW50IGFuIGFwcCB0aGF0IGlzIG5vdCBtb3VudGVkLmApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvdmlkZShrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGtleSBpbiBjb250ZXh0LnByb3ZpZGVzKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYEFwcCBhbHJlYWR5IHByb3ZpZGVzIHByb3BlcnR5IHdpdGgga2V5IFwiJHtTdHJpbmcoa2V5KX1cIi4gSXQgd2lsbCBiZSBvdmVyd3JpdHRlbiB3aXRoIHRoZSBuZXcgdmFsdWUuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5wcm92aWRlc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgICB9LFxuICAgICAgcnVuV2l0aENvbnRleHQoZm4pIHtcbiAgICAgICAgY29uc3QgbGFzdEFwcCA9IGN1cnJlbnRBcHA7XG4gICAgICAgIGN1cnJlbnRBcHAgPSBhcHA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgY3VycmVudEFwcCA9IGxhc3RBcHA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhcHA7XG4gIH07XG59XG5sZXQgY3VycmVudEFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIHByb3ZpZGUoa2V5LCB2YWx1ZSkge1xuICBpZiAoIWN1cnJlbnRJbnN0YW5jZSkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuJDEoYHByb3ZpZGUoKSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBzZXR1cCgpLmApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgcHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucHJvdmlkZXM7XG4gICAgY29uc3QgcGFyZW50UHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucGFyZW50ICYmIGN1cnJlbnRJbnN0YW5jZS5wYXJlbnQucHJvdmlkZXM7XG4gICAgaWYgKHBhcmVudFByb3ZpZGVzID09PSBwcm92aWRlcykge1xuICAgICAgcHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucHJvdmlkZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFByb3ZpZGVzKTtcbiAgICB9XG4gICAgcHJvdmlkZXNba2V5XSA9IHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBpbmplY3Qoa2V5LCBkZWZhdWx0VmFsdWUsIHRyZWF0RGVmYXVsdEFzRmFjdG9yeSA9IGZhbHNlKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gY3VycmVudEluc3RhbmNlIHx8IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZTtcbiAgaWYgKGluc3RhbmNlIHx8IGN1cnJlbnRBcHApIHtcbiAgICBjb25zdCBwcm92aWRlcyA9IGN1cnJlbnRBcHAgPyBjdXJyZW50QXBwLl9jb250ZXh0LnByb3ZpZGVzIDogaW5zdGFuY2UgPyBpbnN0YW5jZS5wYXJlbnQgPT0gbnVsbCA/IGluc3RhbmNlLnZub2RlLmFwcENvbnRleHQgJiYgaW5zdGFuY2Uudm5vZGUuYXBwQ29udGV4dC5wcm92aWRlcyA6IGluc3RhbmNlLnBhcmVudC5wcm92aWRlcyA6IHZvaWQgMDtcbiAgICBpZiAocHJvdmlkZXMgJiYga2V5IGluIHByb3ZpZGVzKSB7XG4gICAgICByZXR1cm4gcHJvdmlkZXNba2V5XTtcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdHJlYXREZWZhdWx0QXNGYWN0b3J5ICYmIGlzRnVuY3Rpb24oZGVmYXVsdFZhbHVlKSA/IGRlZmF1bHRWYWx1ZS5jYWxsKGluc3RhbmNlICYmIGluc3RhbmNlLnByb3h5KSA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHdhcm4kMShgaW5qZWN0aW9uIFwiJHtTdHJpbmcoa2V5KX1cIiBub3QgZm91bmQuYCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuJDEoYGluamVjdCgpIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIHNldHVwKCkgb3IgZnVuY3Rpb25hbCBjb21wb25lbnRzLmApO1xuICB9XG59XG5mdW5jdGlvbiBoYXNJbmplY3Rpb25Db250ZXh0KCkge1xuICByZXR1cm4gISEoY3VycmVudEluc3RhbmNlIHx8IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSB8fCBjdXJyZW50QXBwKTtcbn1cblxuY29uc3QgaW50ZXJuYWxPYmplY3RQcm90byA9IHt9O1xuY29uc3QgY3JlYXRlSW50ZXJuYWxPYmplY3QgPSAoKSA9PiBPYmplY3QuY3JlYXRlKGludGVybmFsT2JqZWN0UHJvdG8pO1xuY29uc3QgaXNJbnRlcm5hbE9iamVjdCA9IChvYmopID0+IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBpbnRlcm5hbE9iamVjdFByb3RvO1xuXG5mdW5jdGlvbiBpbml0UHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBpc1N0YXRlZnVsLCBpc1NTUiA9IGZhbHNlKSB7XG4gIGNvbnN0IHByb3BzID0ge307XG4gIGNvbnN0IGF0dHJzID0gY3JlYXRlSW50ZXJuYWxPYmplY3QoKTtcbiAgaW5zdGFuY2UucHJvcHNEZWZhdWx0cyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBzZXRGdWxsUHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBwcm9wcywgYXR0cnMpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0YW5jZS5wcm9wc09wdGlvbnNbMF0pIHtcbiAgICBpZiAoIShrZXkgaW4gcHJvcHMpKSB7XG4gICAgICBwcm9wc1trZXldID0gdm9pZCAwO1xuICAgIH1cbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHZhbGlkYXRlUHJvcHMocmF3UHJvcHMgfHwge30sIHByb3BzLCBpbnN0YW5jZSk7XG4gIH1cbiAgaWYgKGlzU3RhdGVmdWwpIHtcbiAgICBpbnN0YW5jZS5wcm9wcyA9IGlzU1NSID8gcHJvcHMgOiBzaGFsbG93UmVhY3RpdmUocHJvcHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaW5zdGFuY2UudHlwZS5wcm9wcykge1xuICAgICAgaW5zdGFuY2UucHJvcHMgPSBhdHRycztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UucHJvcHMgPSBwcm9wcztcbiAgICB9XG4gIH1cbiAgaW5zdGFuY2UuYXR0cnMgPSBhdHRycztcbn1cbmZ1bmN0aW9uIGlzSW5IbXJDb250ZXh0KGluc3RhbmNlKSB7XG4gIHdoaWxlIChpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZS50eXBlLl9faG1ySWQpIHJldHVybiB0cnVlO1xuICAgIGluc3RhbmNlID0gaW5zdGFuY2UucGFyZW50O1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhpbnN0YW5jZSwgcmF3UHJvcHMsIHJhd1ByZXZQcm9wcywgb3B0aW1pemVkKSB7XG4gIGNvbnN0IHtcbiAgICBwcm9wcyxcbiAgICBhdHRycyxcbiAgICB2bm9kZTogeyBwYXRjaEZsYWcgfVxuICB9ID0gaW5zdGFuY2U7XG4gIGNvbnN0IHJhd0N1cnJlbnRQcm9wcyA9IHRvUmF3KHByb3BzKTtcbiAgY29uc3QgW29wdGlvbnNdID0gaW5zdGFuY2UucHJvcHNPcHRpb25zO1xuICBsZXQgaGFzQXR0cnNDaGFuZ2VkID0gZmFsc2U7XG4gIGlmIChcbiAgICAvLyBhbHdheXMgZm9yY2UgZnVsbCBkaWZmIGluIGRldlxuICAgIC8vIC0gIzE5NDIgaWYgaG1yIGlzIGVuYWJsZWQgd2l0aCBzZmMgY29tcG9uZW50XG4gICAgLy8gLSB2aXRlIzg3MiBub24tc2ZjIGNvbXBvbmVudCB1c2VkIGJ5IHNmYyBjb21wb25lbnRcbiAgICAhKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNJbkhtckNvbnRleHQoaW5zdGFuY2UpKSAmJiAob3B0aW1pemVkIHx8IHBhdGNoRmxhZyA+IDApICYmICEocGF0Y2hGbGFnICYgMTYpXG4gICkge1xuICAgIGlmIChwYXRjaEZsYWcgJiA4KSB7XG4gICAgICBjb25zdCBwcm9wc1RvVXBkYXRlID0gaW5zdGFuY2Uudm5vZGUuZHluYW1pY1Byb3BzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBrZXkgPSBwcm9wc1RvVXBkYXRlW2ldO1xuICAgICAgICBpZiAoaXNFbWl0TGlzdGVuZXIoaW5zdGFuY2UuZW1pdHNPcHRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSByYXdQcm9wc1trZXldO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIGlmIChoYXNPd24oYXR0cnMsIGtleSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gYXR0cnNba2V5XSkge1xuICAgICAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIGhhc0F0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbWVsaXplZEtleSA9IGNhbWVsaXplKGtleSk7XG4gICAgICAgICAgICBwcm9wc1tjYW1lbGl6ZWRLZXldID0gcmVzb2x2ZVByb3BWYWx1ZShcbiAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgcmF3Q3VycmVudFByb3BzLFxuICAgICAgICAgICAgICBjYW1lbGl6ZWRLZXksXG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gYXR0cnNba2V5XSkge1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHNldEZ1bGxQcm9wcyhpbnN0YW5jZSwgcmF3UHJvcHMsIHByb3BzLCBhdHRycykpIHtcbiAgICAgIGhhc0F0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBrZWJhYktleTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByYXdDdXJyZW50UHJvcHMpIHtcbiAgICAgIGlmICghcmF3UHJvcHMgfHwgLy8gZm9yIGNhbWVsQ2FzZVxuICAgICAgIWhhc093bihyYXdQcm9wcywga2V5KSAmJiAvLyBpdCdzIHBvc3NpYmxlIHRoZSBvcmlnaW5hbCBwcm9wcyB3YXMgcGFzc2VkIGluIGFzIGtlYmFiLWNhc2VcbiAgICAgIC8vIGFuZCBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlICgjOTU1KVxuICAgICAgKChrZWJhYktleSA9IGh5cGhlbmF0ZShrZXkpKSA9PT0ga2V5IHx8ICFoYXNPd24ocmF3UHJvcHMsIGtlYmFiS2V5KSkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAocmF3UHJldlByb3BzICYmIC8vIGZvciBjYW1lbENhc2VcbiAgICAgICAgICAocmF3UHJldlByb3BzW2tleV0gIT09IHZvaWQgMCB8fCAvLyBmb3Iga2ViYWItY2FzZVxuICAgICAgICAgIHJhd1ByZXZQcm9wc1trZWJhYktleV0gIT09IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSByZXNvbHZlUHJvcFZhbHVlKFxuICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICByYXdDdXJyZW50UHJvcHMsXG4gICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHByb3BzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF0dHJzICE9PSByYXdDdXJyZW50UHJvcHMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICAgIGlmICghcmF3UHJvcHMgfHwgIWhhc093bihyYXdQcm9wcywga2V5KSAmJiB0cnVlKSB7XG4gICAgICAgICAgZGVsZXRlIGF0dHJzW2tleV07XG4gICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaGFzQXR0cnNDaGFuZ2VkKSB7XG4gICAgdHJpZ2dlcihpbnN0YW5jZS5hdHRycywgXCJzZXRcIiwgXCJcIik7XG4gIH1cbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB2YWxpZGF0ZVByb3BzKHJhd1Byb3BzIHx8IHt9LCBwcm9wcywgaW5zdGFuY2UpO1xuICB9XG59XG5mdW5jdGlvbiBzZXRGdWxsUHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBwcm9wcywgYXR0cnMpIHtcbiAgY29uc3QgW29wdGlvbnMsIG5lZWRDYXN0S2V5c10gPSBpbnN0YW5jZS5wcm9wc09wdGlvbnM7XG4gIGxldCBoYXNBdHRyc0NoYW5nZWQgPSBmYWxzZTtcbiAgbGV0IHJhd0Nhc3RWYWx1ZXM7XG4gIGlmIChyYXdQcm9wcykge1xuICAgIGZvciAobGV0IGtleSBpbiByYXdQcm9wcykge1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHJhd1Byb3BzW2tleV07XG4gICAgICBsZXQgY2FtZWxLZXk7XG4gICAgICBpZiAob3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgY2FtZWxLZXkgPSBjYW1lbGl6ZShrZXkpKSkge1xuICAgICAgICBpZiAoIW5lZWRDYXN0S2V5cyB8fCAhbmVlZENhc3RLZXlzLmluY2x1ZGVzKGNhbWVsS2V5KSkge1xuICAgICAgICAgIHByb3BzW2NhbWVsS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIChyYXdDYXN0VmFsdWVzIHx8IChyYXdDYXN0VmFsdWVzID0ge30pKVtjYW1lbEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaXNFbWl0TGlzdGVuZXIoaW5zdGFuY2UuZW1pdHNPcHRpb25zLCBrZXkpKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBhdHRycykgfHwgdmFsdWUgIT09IGF0dHJzW2tleV0pIHtcbiAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAobmVlZENhc3RLZXlzKSB7XG4gICAgY29uc3QgcmF3Q3VycmVudFByb3BzID0gdG9SYXcocHJvcHMpO1xuICAgIGNvbnN0IGNhc3RWYWx1ZXMgPSByYXdDYXN0VmFsdWVzIHx8IEVNUFRZX09CSjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRDYXN0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qga2V5ID0gbmVlZENhc3RLZXlzW2ldO1xuICAgICAgcHJvcHNba2V5XSA9IHJlc29sdmVQcm9wVmFsdWUoXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHJhd0N1cnJlbnRQcm9wcyxcbiAgICAgICAga2V5LFxuICAgICAgICBjYXN0VmFsdWVzW2tleV0sXG4gICAgICAgIGluc3RhbmNlLFxuICAgICAgICAhaGFzT3duKGNhc3RWYWx1ZXMsIGtleSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBoYXNBdHRyc0NoYW5nZWQ7XG59XG5mdW5jdGlvbiByZXNvbHZlUHJvcFZhbHVlKG9wdGlvbnMsIHByb3BzLCBrZXksIHZhbHVlLCBpbnN0YW5jZSwgaXNBYnNlbnQpIHtcbiAgY29uc3Qgb3B0ID0gb3B0aW9uc1trZXldO1xuICBpZiAob3B0ICE9IG51bGwpIHtcbiAgICBjb25zdCBoYXNEZWZhdWx0ID0gaGFzT3duKG9wdCwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChoYXNEZWZhdWx0ICYmIHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG9wdC5kZWZhdWx0O1xuICAgICAgaWYgKG9wdC50eXBlICE9PSBGdW5jdGlvbiAmJiAhb3B0LnNraXBGYWN0b3J5ICYmIGlzRnVuY3Rpb24oZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBjb25zdCB7IHByb3BzRGVmYXVsdHMgfSA9IGluc3RhbmNlO1xuICAgICAgICBpZiAoa2V5IGluIHByb3BzRGVmYXVsdHMpIHtcbiAgICAgICAgICB2YWx1ZSA9IHByb3BzRGVmYXVsdHNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXNldCA9IHNldEN1cnJlbnRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgICAgICAgdmFsdWUgPSBwcm9wc0RlZmF1bHRzW2tleV0gPSBkZWZhdWx0VmFsdWUuY2FsbChcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBwcm9wc1xuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRbMCAvKiBzaG91bGRDYXN0ICovXSkge1xuICAgICAgaWYgKGlzQWJzZW50ICYmICFoYXNEZWZhdWx0KSB7XG4gICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdFsxIC8qIHNob3VsZENhc3RUcnVlICovXSAmJiAodmFsdWUgPT09IFwiXCIgfHwgdmFsdWUgPT09IGh5cGhlbmF0ZShrZXkpKSkge1xuICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbmNvbnN0IG1peGluUHJvcHNDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHNPcHRpb25zKGNvbXAsIGFwcENvbnRleHQsIGFzTWl4aW4gPSBmYWxzZSkge1xuICBjb25zdCBjYWNoZSA9IF9fVlVFX09QVElPTlNfQVBJX18gJiYgYXNNaXhpbiA/IG1peGluUHJvcHNDYWNoZSA6IGFwcENvbnRleHQucHJvcHNDYWNoZTtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGNvbXApO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuICBjb25zdCByYXcgPSBjb21wLnByb3BzO1xuICBjb25zdCBub3JtYWxpemVkID0ge307XG4gIGNvbnN0IG5lZWRDYXN0S2V5cyA9IFtdO1xuICBsZXQgaGFzRXh0ZW5kcyA9IGZhbHNlO1xuICBpZiAoX19WVUVfT1BUSU9OU19BUElfXyAmJiAhaXNGdW5jdGlvbihjb21wKSkge1xuICAgIGNvbnN0IGV4dGVuZFByb3BzID0gKHJhdzIpID0+IHtcbiAgICAgIGhhc0V4dGVuZHMgPSB0cnVlO1xuICAgICAgY29uc3QgW3Byb3BzLCBrZXlzXSA9IG5vcm1hbGl6ZVByb3BzT3B0aW9ucyhyYXcyLCBhcHBDb250ZXh0LCB0cnVlKTtcbiAgICAgIGV4dGVuZChub3JtYWxpemVkLCBwcm9wcyk7XG4gICAgICBpZiAoa2V5cykgbmVlZENhc3RLZXlzLnB1c2goLi4ua2V5cyk7XG4gICAgfTtcbiAgICBpZiAoIWFzTWl4aW4gJiYgYXBwQ29udGV4dC5taXhpbnMubGVuZ3RoKSB7XG4gICAgICBhcHBDb250ZXh0Lm1peGlucy5mb3JFYWNoKGV4dGVuZFByb3BzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAuZXh0ZW5kcykge1xuICAgICAgZXh0ZW5kUHJvcHMoY29tcC5leHRlbmRzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAubWl4aW5zKSB7XG4gICAgICBjb21wLm1peGlucy5mb3JFYWNoKGV4dGVuZFByb3BzKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFyYXcgJiYgIWhhc0V4dGVuZHMpIHtcbiAgICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICAgIGNhY2hlLnNldChjb21wLCBFTVBUWV9BUlIpO1xuICAgIH1cbiAgICByZXR1cm4gRU1QVFlfQVJSO1xuICB9XG4gIGlmIChpc0FycmF5KHJhdykpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhdy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzU3RyaW5nKHJhd1tpXSkpIHtcbiAgICAgICAgd2FybiQxKGBwcm9wcyBtdXN0IGJlIHN0cmluZ3Mgd2hlbiB1c2luZyBhcnJheSBzeW50YXguYCwgcmF3W2ldKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBjYW1lbGl6ZShyYXdbaV0pO1xuICAgICAgaWYgKHZhbGlkYXRlUHJvcE5hbWUobm9ybWFsaXplZEtleSkpIHtcbiAgICAgICAgbm9ybWFsaXplZFtub3JtYWxpemVkS2V5XSA9IEVNUFRZX09CSjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAocmF3KSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzT2JqZWN0KHJhdykpIHtcbiAgICAgIHdhcm4kMShgaW52YWxpZCBwcm9wcyBvcHRpb25zYCwgcmF3KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmF3KSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkS2V5ID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIGlmICh2YWxpZGF0ZVByb3BOYW1lKG5vcm1hbGl6ZWRLZXkpKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHJhd1trZXldO1xuICAgICAgICBjb25zdCBwcm9wID0gbm9ybWFsaXplZFtub3JtYWxpemVkS2V5XSA9IGlzQXJyYXkob3B0KSB8fCBpc0Z1bmN0aW9uKG9wdCkgPyB7IHR5cGU6IG9wdCB9IDogZXh0ZW5kKHt9LCBvcHQpO1xuICAgICAgICBjb25zdCBwcm9wVHlwZSA9IHByb3AudHlwZTtcbiAgICAgICAgbGV0IHNob3VsZENhc3QgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNob3VsZENhc3RUcnVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzQXJyYXkocHJvcFR5cGUpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb3BUeXBlLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHByb3BUeXBlW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVOYW1lID0gaXNGdW5jdGlvbih0eXBlKSAmJiB0eXBlLm5hbWU7XG4gICAgICAgICAgICBpZiAodHlwZU5hbWUgPT09IFwiQm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgIHNob3VsZENhc3QgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZU5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgc2hvdWxkQ2FzdFRydWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2hvdWxkQ2FzdCA9IGlzRnVuY3Rpb24ocHJvcFR5cGUpICYmIHByb3BUeXBlLm5hbWUgPT09IFwiQm9vbGVhblwiO1xuICAgICAgICB9XG4gICAgICAgIHByb3BbMCAvKiBzaG91bGRDYXN0ICovXSA9IHNob3VsZENhc3Q7XG4gICAgICAgIHByb3BbMSAvKiBzaG91bGRDYXN0VHJ1ZSAqL10gPSBzaG91bGRDYXN0VHJ1ZTtcbiAgICAgICAgaWYgKHNob3VsZENhc3QgfHwgaGFzT3duKHByb3AsIFwiZGVmYXVsdFwiKSkge1xuICAgICAgICAgIG5lZWRDYXN0S2V5cy5wdXNoKG5vcm1hbGl6ZWRLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IHJlcyA9IFtub3JtYWxpemVkLCBuZWVkQ2FzdEtleXNdO1xuICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICBjYWNoZS5zZXQoY29tcCwgcmVzKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wTmFtZShrZXkpIHtcbiAgaWYgKGtleVswXSAhPT0gXCIkXCIgJiYgIWlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FybiQxKGBJbnZhbGlkIHByb3AgbmFtZTogXCIke2tleX1cIiBpcyBhIHJlc2VydmVkIHByb3BlcnR5LmApO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldFR5cGUoY3Rvcikge1xuICBpZiAoY3RvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfVxuICBpZiAodHlwZW9mIGN0b3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjdG9yLm5hbWUgfHwgXCJcIjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY3RvciA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IG5hbWUgPSBjdG9yLmNvbnN0cnVjdG9yICYmIGN0b3IuY29uc3RydWN0b3IubmFtZTtcbiAgICByZXR1cm4gbmFtZSB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBcIlwiO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhyYXdQcm9wcywgcHJvcHMsIGluc3RhbmNlKSB7XG4gIGNvbnN0IHJlc29sdmVkVmFsdWVzID0gdG9SYXcocHJvcHMpO1xuICBjb25zdCBvcHRpb25zID0gaW5zdGFuY2UucHJvcHNPcHRpb25zWzBdO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgbGV0IG9wdCA9IG9wdGlvbnNba2V5XTtcbiAgICBpZiAob3B0ID09IG51bGwpIGNvbnRpbnVlO1xuICAgIHZhbGlkYXRlUHJvcChcbiAgICAgIGtleSxcbiAgICAgIHJlc29sdmVkVmFsdWVzW2tleV0sXG4gICAgICBvcHQsXG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KHJlc29sdmVkVmFsdWVzKSA6IHJlc29sdmVkVmFsdWVzLFxuICAgICAgIWhhc093bihyYXdQcm9wcywga2V5KSAmJiAhaGFzT3duKHJhd1Byb3BzLCBoeXBoZW5hdGUoa2V5KSlcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVByb3AobmFtZSwgdmFsdWUsIHByb3AsIHByb3BzLCBpc0Fic2VudCkge1xuICBjb25zdCB7IHR5cGUsIHJlcXVpcmVkLCB2YWxpZGF0b3IsIHNraXBDaGVjayB9ID0gcHJvcDtcbiAgaWYgKHJlcXVpcmVkICYmIGlzQWJzZW50KSB7XG4gICAgd2FybiQxKCdNaXNzaW5nIHJlcXVpcmVkIHByb3A6IFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgJiYgIXJlcXVpcmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlICE9IG51bGwgJiYgdHlwZSAhPT0gdHJ1ZSAmJiAhc2tpcENoZWNrKSB7XG4gICAgbGV0IGlzVmFsaWQgPSBmYWxzZTtcbiAgICBjb25zdCB0eXBlcyA9IGlzQXJyYXkodHlwZSkgPyB0eXBlIDogW3R5cGVdO1xuICAgIGNvbnN0IGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aCAmJiAhaXNWYWxpZDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHZhbGlkLCBleHBlY3RlZFR5cGUgfSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVzW2ldKTtcbiAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChleHBlY3RlZFR5cGUgfHwgXCJcIik7XG4gICAgICBpc1ZhbGlkID0gdmFsaWQ7XG4gICAgfVxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgd2FybiQxKGdldEludmFsaWRUeXBlTWVzc2FnZShuYW1lLCB2YWx1ZSwgZXhwZWN0ZWRUeXBlcykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAodmFsaWRhdG9yICYmICF2YWxpZGF0b3IodmFsdWUsIHByb3BzKSkge1xuICAgIHdhcm4kMSgnSW52YWxpZCBwcm9wOiBjdXN0b20gdmFsaWRhdG9yIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBuYW1lICsgJ1wiLicpO1xuICB9XG59XG5jb25zdCBpc1NpbXBsZVR5cGUgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChcbiAgXCJTdHJpbmcsTnVtYmVyLEJvb2xlYW4sRnVuY3Rpb24sU3ltYm9sLEJpZ0ludFwiXG4pO1xuZnVuY3Rpb24gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IGV4cGVjdGVkVHlwZSA9IGdldFR5cGUodHlwZSk7XG4gIGlmIChpc1NpbXBsZVR5cGUoZXhwZWN0ZWRUeXBlKSkge1xuICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgdmFsaWQgPSB0ID09PSBleHBlY3RlZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIXZhbGlkICYmIHQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IFwiT2JqZWN0XCIpIHtcbiAgICB2YWxpZCA9IGlzT2JqZWN0KHZhbHVlKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IFwiQXJyYXlcIikge1xuICAgIHZhbGlkID0gaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSBcIm51bGxcIikge1xuICAgIHZhbGlkID0gdmFsdWUgPT09IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZCxcbiAgICBleHBlY3RlZFR5cGVcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEludmFsaWRUeXBlTWVzc2FnZShuYW1lLCB2YWx1ZSwgZXhwZWN0ZWRUeXBlcykge1xuICBpZiAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYFByb3AgdHlwZSBbXSBmb3IgcHJvcCBcIiR7bmFtZX1cIiB3b24ndCBtYXRjaCBhbnl0aGluZy4gRGlkIHlvdSBtZWFuIHRvIHVzZSB0eXBlIEFycmF5IGluc3RlYWQ/YDtcbiAgfVxuICBsZXQgbWVzc2FnZSA9IGBJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJHtuYW1lfVwiLiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oXCIgfCBcIil9YDtcbiAgY29uc3QgZXhwZWN0ZWRUeXBlID0gZXhwZWN0ZWRUeXBlc1swXTtcbiAgY29uc3QgcmVjZWl2ZWRUeXBlID0gdG9SYXdUeXBlKHZhbHVlKTtcbiAgY29uc3QgZXhwZWN0ZWRWYWx1ZSA9IHN0eWxlVmFsdWUodmFsdWUsIGV4cGVjdGVkVHlwZSk7XG4gIGNvbnN0IHJlY2VpdmVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCByZWNlaXZlZFR5cGUpO1xuICBpZiAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPT09IDEgJiYgaXNFeHBsaWNhYmxlKGV4cGVjdGVkVHlwZSkgJiYgIWlzQm9vbGVhbihleHBlY3RlZFR5cGUsIHJlY2VpdmVkVHlwZSkpIHtcbiAgICBtZXNzYWdlICs9IGAgd2l0aCB2YWx1ZSAke2V4cGVjdGVkVmFsdWV9YDtcbiAgfVxuICBtZXNzYWdlICs9IGAsIGdvdCAke3JlY2VpdmVkVHlwZX0gYDtcbiAgaWYgKGlzRXhwbGljYWJsZShyZWNlaXZlZFR5cGUpKSB7XG4gICAgbWVzc2FnZSArPSBgd2l0aCB2YWx1ZSAke3JlY2VpdmVkVmFsdWV9LmA7XG4gIH1cbiAgcmV0dXJuIG1lc3NhZ2U7XG59XG5mdW5jdGlvbiBzdHlsZVZhbHVlKHZhbHVlLCB0eXBlKSB7XG4gIGlmICh0eXBlID09PSBcIlN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGBcIiR7dmFsdWV9XCJgO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiTnVtYmVyXCIpIHtcbiAgICByZXR1cm4gYCR7TnVtYmVyKHZhbHVlKX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHt2YWx1ZX1gO1xuICB9XG59XG5mdW5jdGlvbiBpc0V4cGxpY2FibGUodHlwZSkge1xuICBjb25zdCBleHBsaWNpdFR5cGVzID0gW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiXTtcbiAgcmV0dXJuIGV4cGxpY2l0VHlwZXMuc29tZSgoZWxlbSkgPT4gdHlwZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtKTtcbn1cbmZ1bmN0aW9uIGlzQm9vbGVhbiguLi5hcmdzKSB7XG4gIHJldHVybiBhcmdzLnNvbWUoKGVsZW0pID0+IGVsZW0udG9Mb3dlckNhc2UoKSA9PT0gXCJib29sZWFuXCIpO1xufVxuXG5jb25zdCBpc0ludGVybmFsS2V5ID0gKGtleSkgPT4ga2V5WzBdID09PSBcIl9cIiB8fCBrZXkgPT09IFwiJHN0YWJsZVwiO1xuY29uc3Qgbm9ybWFsaXplU2xvdFZhbHVlID0gKHZhbHVlKSA9PiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWTm9kZSkgOiBbbm9ybWFsaXplVk5vZGUodmFsdWUpXTtcbmNvbnN0IG5vcm1hbGl6ZVNsb3QgPSAoa2V5LCByYXdTbG90LCBjdHgpID0+IHtcbiAgaWYgKHJhd1Nsb3QuX24pIHtcbiAgICByZXR1cm4gcmF3U2xvdDtcbiAgfVxuICBjb25zdCBub3JtYWxpemVkID0gd2l0aEN0eCgoLi4uYXJncykgPT4ge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGN1cnJlbnRJbnN0YW5jZSAmJiAoIWN0eCB8fCBjdHgucm9vdCA9PT0gY3VycmVudEluc3RhbmNlLnJvb3QpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBTbG90IFwiJHtrZXl9XCIgaW52b2tlZCBvdXRzaWRlIG9mIHRoZSByZW5kZXIgZnVuY3Rpb246IHRoaXMgd2lsbCBub3QgdHJhY2sgZGVwZW5kZW5jaWVzIHVzZWQgaW4gdGhlIHNsb3QuIEludm9rZSB0aGUgc2xvdCBmdW5jdGlvbiBpbnNpZGUgdGhlIHJlbmRlciBmdW5jdGlvbiBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVTbG90VmFsdWUocmF3U2xvdCguLi5hcmdzKSk7XG4gIH0sIGN0eCk7XG4gIG5vcm1hbGl6ZWQuX2MgPSBmYWxzZTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuY29uc3Qgbm9ybWFsaXplT2JqZWN0U2xvdHMgPSAocmF3U2xvdHMsIHNsb3RzLCBpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBjdHggPSByYXdTbG90cy5fY3R4O1xuICBmb3IgKGNvbnN0IGtleSBpbiByYXdTbG90cykge1xuICAgIGlmIChpc0ludGVybmFsS2V5KGtleSkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHZhbHVlID0gcmF3U2xvdHNba2V5XTtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHNsb3RzW2tleV0gPSBub3JtYWxpemVTbG90KGtleSwgdmFsdWUsIGN0eCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB0cnVlKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgTm9uLWZ1bmN0aW9uIHZhbHVlIGVuY291bnRlcmVkIGZvciBzbG90IFwiJHtrZXl9XCIuIFByZWZlciBmdW5jdGlvbiBzbG90cyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVTbG90VmFsdWUodmFsdWUpO1xuICAgICAgc2xvdHNba2V5XSA9ICgpID0+IG5vcm1hbGl6ZWQ7XG4gICAgfVxuICB9XG59O1xuY29uc3Qgbm9ybWFsaXplVk5vZGVTbG90cyA9IChpbnN0YW5jZSwgY2hpbGRyZW4pID0+IHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzS2VlcEFsaXZlKGluc3RhbmNlLnZub2RlKSAmJiB0cnVlKSB7XG4gICAgd2FybiQxKFxuICAgICAgYE5vbi1mdW5jdGlvbiB2YWx1ZSBlbmNvdW50ZXJlZCBmb3IgZGVmYXVsdCBzbG90LiBQcmVmZXIgZnVuY3Rpb24gc2xvdHMgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5gXG4gICAgKTtcbiAgfVxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU2xvdFZhbHVlKGNoaWxkcmVuKTtcbiAgaW5zdGFuY2Uuc2xvdHMuZGVmYXVsdCA9ICgpID0+IG5vcm1hbGl6ZWQ7XG59O1xuY29uc3QgYXNzaWduU2xvdHMgPSAoc2xvdHMsIGNoaWxkcmVuLCBvcHRpbWl6ZWQpID0+IHtcbiAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcbiAgICBpZiAob3B0aW1pemVkIHx8IGtleSAhPT0gXCJfXCIpIHtcbiAgICAgIHNsb3RzW2tleV0gPSBjaGlsZHJlbltrZXldO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IGluaXRTbG90cyA9IChpbnN0YW5jZSwgY2hpbGRyZW4sIG9wdGltaXplZCkgPT4ge1xuICBjb25zdCBzbG90cyA9IGluc3RhbmNlLnNsb3RzID0gY3JlYXRlSW50ZXJuYWxPYmplY3QoKTtcbiAgaWYgKGluc3RhbmNlLnZub2RlLnNoYXBlRmxhZyAmIDMyKSB7XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuLl87XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGFzc2lnblNsb3RzKHNsb3RzLCBjaGlsZHJlbiwgb3B0aW1pemVkKTtcbiAgICAgIGlmIChvcHRpbWl6ZWQpIHtcbiAgICAgICAgZGVmKHNsb3RzLCBcIl9cIiwgdHlwZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vcm1hbGl6ZU9iamVjdFNsb3RzKGNoaWxkcmVuLCBzbG90cyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgbm9ybWFsaXplVk5vZGVTbG90cyhpbnN0YW5jZSwgY2hpbGRyZW4pO1xuICB9XG59O1xuY29uc3QgdXBkYXRlU2xvdHMgPSAoaW5zdGFuY2UsIGNoaWxkcmVuLCBvcHRpbWl6ZWQpID0+IHtcbiAgY29uc3QgeyB2bm9kZSwgc2xvdHMgfSA9IGluc3RhbmNlO1xuICBsZXQgbmVlZERlbGV0aW9uQ2hlY2sgPSB0cnVlO1xuICBsZXQgZGVsZXRpb25Db21wYXJpc29uVGFyZ2V0ID0gRU1QVFlfT0JKO1xuICBpZiAodm5vZGUuc2hhcGVGbGFnICYgMzIpIHtcbiAgICBjb25zdCB0eXBlID0gY2hpbGRyZW4uXztcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNIbXJVcGRhdGluZykge1xuICAgICAgICBhc3NpZ25TbG90cyhzbG90cywgY2hpbGRyZW4sIG9wdGltaXplZCk7XG4gICAgICAgIHRyaWdnZXIoaW5zdGFuY2UsIFwic2V0XCIsIFwiJHNsb3RzXCIpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpbWl6ZWQgJiYgdHlwZSA9PT0gMSkge1xuICAgICAgICBuZWVkRGVsZXRpb25DaGVjayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXNzaWduU2xvdHMoc2xvdHMsIGNoaWxkcmVuLCBvcHRpbWl6ZWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZWVkRGVsZXRpb25DaGVjayA9ICFjaGlsZHJlbi4kc3RhYmxlO1xuICAgICAgbm9ybWFsaXplT2JqZWN0U2xvdHMoY2hpbGRyZW4sIHNsb3RzKTtcbiAgICB9XG4gICAgZGVsZXRpb25Db21wYXJpc29uVGFyZ2V0ID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcbiAgICBub3JtYWxpemVWTm9kZVNsb3RzKGluc3RhbmNlLCBjaGlsZHJlbik7XG4gICAgZGVsZXRpb25Db21wYXJpc29uVGFyZ2V0ID0geyBkZWZhdWx0OiAxIH07XG4gIH1cbiAgaWYgKG5lZWREZWxldGlvbkNoZWNrKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2xvdHMpIHtcbiAgICAgIGlmICghaXNJbnRlcm5hbEtleShrZXkpICYmIGRlbGV0aW9uQ29tcGFyaXNvblRhcmdldFtrZXldID09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIHNsb3RzW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRSZWYocmF3UmVmLCBvbGRSYXdSZWYsIHBhcmVudFN1c3BlbnNlLCB2bm9kZSwgaXNVbm1vdW50ID0gZmFsc2UpIHtcbiAgaWYgKGlzQXJyYXkocmF3UmVmKSkge1xuICAgIHJhd1JlZi5mb3JFYWNoKFxuICAgICAgKHIsIGkpID0+IHNldFJlZihcbiAgICAgICAgcixcbiAgICAgICAgb2xkUmF3UmVmICYmIChpc0FycmF5KG9sZFJhd1JlZikgPyBvbGRSYXdSZWZbaV0gOiBvbGRSYXdSZWYpLFxuICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGlzVW5tb3VudFxuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpc0FzeW5jV3JhcHBlcih2bm9kZSkgJiYgIWlzVW5tb3VudCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCByZWZWYWx1ZSA9IHZub2RlLnNoYXBlRmxhZyAmIDQgPyBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZSh2bm9kZS5jb21wb25lbnQpIDogdm5vZGUuZWw7XG4gIGNvbnN0IHZhbHVlID0gaXNVbm1vdW50ID8gbnVsbCA6IHJlZlZhbHVlO1xuICBjb25zdCB7IGk6IG93bmVyLCByOiByZWYgfSA9IHJhd1JlZjtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIW93bmVyKSB7XG4gICAgd2FybiQxKFxuICAgICAgYE1pc3NpbmcgcmVmIG93bmVyIGNvbnRleHQuIHJlZiBjYW5ub3QgYmUgdXNlZCBvbiBob2lzdGVkIHZub2Rlcy4gQSB2bm9kZSB3aXRoIHJlZiBtdXN0IGJlIGNyZWF0ZWQgaW5zaWRlIHRoZSByZW5kZXIgZnVuY3Rpb24uYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG9sZFJlZiA9IG9sZFJhd1JlZiAmJiBvbGRSYXdSZWYucjtcbiAgY29uc3QgcmVmcyA9IG93bmVyLnJlZnMgPT09IEVNUFRZX09CSiA/IG93bmVyLnJlZnMgPSB7fSA6IG93bmVyLnJlZnM7XG4gIGNvbnN0IHNldHVwU3RhdGUgPSBvd25lci5zZXR1cFN0YXRlO1xuICBpZiAob2xkUmVmICE9IG51bGwgJiYgb2xkUmVmICE9PSByZWYpIHtcbiAgICBpZiAoaXNTdHJpbmcob2xkUmVmKSkge1xuICAgICAgcmVmc1tvbGRSZWZdID0gbnVsbDtcbiAgICAgIGlmIChoYXNPd24oc2V0dXBTdGF0ZSwgb2xkUmVmKSkge1xuICAgICAgICBzZXR1cFN0YXRlW29sZFJlZl0gPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNSZWYob2xkUmVmKSkge1xuICAgICAgb2xkUmVmLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYgKGlzRnVuY3Rpb24ocmVmKSkge1xuICAgIGNhbGxXaXRoRXJyb3JIYW5kbGluZyhyZWYsIG93bmVyLCAxMiwgW3ZhbHVlLCByZWZzXSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgX2lzU3RyaW5nID0gaXNTdHJpbmcocmVmKTtcbiAgICBjb25zdCBfaXNSZWYgPSBpc1JlZihyZWYpO1xuICAgIGlmIChfaXNTdHJpbmcgfHwgX2lzUmVmKSB7XG4gICAgICBjb25zdCBkb1NldCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJhd1JlZi5mKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBfaXNTdHJpbmcgPyBoYXNPd24oc2V0dXBTdGF0ZSwgcmVmKSA/IHNldHVwU3RhdGVbcmVmXSA6IHJlZnNbcmVmXSA6IHJlZi52YWx1ZTtcbiAgICAgICAgICBpZiAoaXNVbm1vdW50KSB7XG4gICAgICAgICAgICBpc0FycmF5KGV4aXN0aW5nKSAmJiByZW1vdmUoZXhpc3RpbmcsIHJlZlZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGV4aXN0aW5nKSkge1xuICAgICAgICAgICAgICBpZiAoX2lzU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVmc1tyZWZdID0gW3JlZlZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duKHNldHVwU3RhdGUsIHJlZikpIHtcbiAgICAgICAgICAgICAgICAgIHNldHVwU3RhdGVbcmVmXSA9IHJlZnNbcmVmXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVmLnZhbHVlID0gW3JlZlZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAocmF3UmVmLmspIHJlZnNbcmF3UmVmLmtdID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFleGlzdGluZy5pbmNsdWRlcyhyZWZWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmcucHVzaChyZWZWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF9pc1N0cmluZykge1xuICAgICAgICAgIHJlZnNbcmVmXSA9IHZhbHVlO1xuICAgICAgICAgIGlmIChoYXNPd24oc2V0dXBTdGF0ZSwgcmVmKSkge1xuICAgICAgICAgICAgc2V0dXBTdGF0ZVtyZWZdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF9pc1JlZikge1xuICAgICAgICAgIHJlZi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIGlmIChyYXdSZWYuaykgcmVmc1tyYXdSZWYua10gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgd2FybiQxKFwiSW52YWxpZCB0ZW1wbGF0ZSByZWYgdHlwZTpcIiwgcmVmLCBgKCR7dHlwZW9mIHJlZn0pYCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZG9TZXQuaWQgPSAtMTtcbiAgICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KGRvU2V0LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb1NldCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybiQxKFwiSW52YWxpZCB0ZW1wbGF0ZSByZWYgdHlwZTpcIiwgcmVmLCBgKCR7dHlwZW9mIHJlZn0pYCk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IFRlbGVwb3J0RW5kS2V5ID0gU3ltYm9sKFwiX3Z0ZVwiKTtcbmNvbnN0IGlzVGVsZXBvcnQgPSAodHlwZSkgPT4gdHlwZS5fX2lzVGVsZXBvcnQ7XG5jb25zdCBpc1RlbGVwb3J0RGlzYWJsZWQgPSAocHJvcHMpID0+IHByb3BzICYmIChwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5kaXNhYmxlZCA9PT0gXCJcIik7XG5jb25zdCBpc1RhcmdldFNWRyA9ICh0YXJnZXQpID0+IHR5cGVvZiBTVkdFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQ7XG5jb25zdCBpc1RhcmdldE1hdGhNTCA9ICh0YXJnZXQpID0+IHR5cGVvZiBNYXRoTUxFbGVtZW50ID09PSBcImZ1bmN0aW9uXCIgJiYgdGFyZ2V0IGluc3RhbmNlb2YgTWF0aE1MRWxlbWVudDtcbmNvbnN0IHJlc29sdmVUYXJnZXQgPSAocHJvcHMsIHNlbGVjdCkgPT4ge1xuICBjb25zdCB0YXJnZXRTZWxlY3RvciA9IHByb3BzICYmIHByb3BzLnRvO1xuICBpZiAoaXNTdHJpbmcodGFyZ2V0U2VsZWN0b3IpKSB7XG4gICAgaWYgKCFzZWxlY3QpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKFxuICAgICAgICBgQ3VycmVudCByZW5kZXJlciBkb2VzIG5vdCBzdXBwb3J0IHN0cmluZyB0YXJnZXQgZm9yIFRlbGVwb3J0cy4gKG1pc3NpbmcgcXVlcnlTZWxlY3RvciByZW5kZXJlciBvcHRpb24pYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBzZWxlY3QodGFyZ2V0U2VsZWN0b3IpO1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIXRhcmdldCAmJiAhaXNUZWxlcG9ydERpc2FibGVkKHByb3BzKSkge1xuICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgYEZhaWxlZCB0byBsb2NhdGUgVGVsZXBvcnQgdGFyZ2V0IHdpdGggc2VsZWN0b3IgXCIke3RhcmdldFNlbGVjdG9yfVwiLiBOb3RlIHRoZSB0YXJnZXQgZWxlbWVudCBtdXN0IGV4aXN0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQgLSBpLmUuIHRoZSB0YXJnZXQgY2Fubm90IGJlIHJlbmRlcmVkIGJ5IHRoZSBjb21wb25lbnQgaXRzZWxmLCBhbmQgaWRlYWxseSBzaG91bGQgYmUgb3V0c2lkZSBvZiB0aGUgZW50aXJlIFZ1ZSBjb21wb25lbnQgdHJlZS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhdGFyZ2V0U2VsZWN0b3IgJiYgIWlzVGVsZXBvcnREaXNhYmxlZChwcm9wcykpIHtcbiAgICAgIHdhcm4kMShgSW52YWxpZCBUZWxlcG9ydCB0YXJnZXQ6ICR7dGFyZ2V0U2VsZWN0b3J9YCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRTZWxlY3RvcjtcbiAgfVxufTtcbmNvbnN0IFRlbGVwb3J0SW1wbCA9IHtcbiAgbmFtZTogXCJUZWxlcG9ydFwiLFxuICBfX2lzVGVsZXBvcnQ6IHRydWUsXG4gIHByb2Nlc3MobjEsIG4yLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgaW50ZXJuYWxzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWM6IG1vdW50Q2hpbGRyZW4sXG4gICAgICBwYzogcGF0Y2hDaGlsZHJlbixcbiAgICAgIHBiYzogcGF0Y2hCbG9ja0NoaWxkcmVuLFxuICAgICAgbzogeyBpbnNlcnQsIHF1ZXJ5U2VsZWN0b3IsIGNyZWF0ZVRleHQsIGNyZWF0ZUNvbW1lbnQgfVxuICAgIH0gPSBpbnRlcm5hbHM7XG4gICAgY29uc3QgZGlzYWJsZWQgPSBpc1RlbGVwb3J0RGlzYWJsZWQobjIucHJvcHMpO1xuICAgIGxldCB7IHNoYXBlRmxhZywgY2hpbGRyZW4sIGR5bmFtaWNDaGlsZHJlbiB9ID0gbjI7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNIbXJVcGRhdGluZykge1xuICAgICAgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICBkeW5hbWljQ2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgICBpZiAobjEgPT0gbnVsbCkge1xuICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBuMi5lbCA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBjcmVhdGVDb21tZW50KFwidGVsZXBvcnQgc3RhcnRcIikgOiBjcmVhdGVUZXh0KFwiXCIpO1xuICAgICAgY29uc3QgbWFpbkFuY2hvciA9IG4yLmFuY2hvciA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBjcmVhdGVDb21tZW50KFwidGVsZXBvcnQgZW5kXCIpIDogY3JlYXRlVGV4dChcIlwiKTtcbiAgICAgIGluc2VydChwbGFjZWhvbGRlciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgaW5zZXJ0KG1haW5BbmNob3IsIGNvbnRhaW5lciwgYW5jaG9yKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IG4yLnRhcmdldCA9IHJlc29sdmVUYXJnZXQobjIucHJvcHMsIHF1ZXJ5U2VsZWN0b3IpO1xuICAgICAgY29uc3QgdGFyZ2V0QW5jaG9yID0gcHJlcGFyZUFuY2hvcih0YXJnZXQsIG4yLCBjcmVhdGVUZXh0LCBpbnNlcnQpO1xuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICBpZiAobmFtZXNwYWNlID09PSBcInN2Z1wiIHx8IGlzVGFyZ2V0U1ZHKHRhcmdldCkpIHtcbiAgICAgICAgICBuYW1lc3BhY2UgPSBcInN2Z1wiO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWVzcGFjZSA9PT0gXCJtYXRobWxcIiB8fCBpc1RhcmdldE1hdGhNTCh0YXJnZXQpKSB7XG4gICAgICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFkaXNhYmxlZCkge1xuICAgICAgICB3YXJuJDEoXCJJbnZhbGlkIFRlbGVwb3J0IHRhcmdldCBvbiBtb3VudDpcIiwgdGFyZ2V0LCBgKCR7dHlwZW9mIHRhcmdldH0pYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBtb3VudCA9IChjb250YWluZXIyLCBhbmNob3IyKSA9PiB7XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgICAgIG1vdW50Q2hpbGRyZW4oXG4gICAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAgIGNvbnRhaW5lcjIsXG4gICAgICAgICAgICBhbmNob3IyLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgIG1vdW50KGNvbnRhaW5lciwgbWFpbkFuY2hvcik7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldCkge1xuICAgICAgICBtb3VudCh0YXJnZXQsIHRhcmdldEFuY2hvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgICBuMi50YXJnZXRTdGFydCA9IG4xLnRhcmdldFN0YXJ0O1xuICAgICAgY29uc3QgbWFpbkFuY2hvciA9IG4yLmFuY2hvciA9IG4xLmFuY2hvcjtcbiAgICAgIGNvbnN0IHRhcmdldCA9IG4yLnRhcmdldCA9IG4xLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldEFuY2hvciA9IG4yLnRhcmdldEFuY2hvciA9IG4xLnRhcmdldEFuY2hvcjtcbiAgICAgIGNvbnN0IHdhc0Rpc2FibGVkID0gaXNUZWxlcG9ydERpc2FibGVkKG4xLnByb3BzKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB3YXNEaXNhYmxlZCA/IGNvbnRhaW5lciA6IHRhcmdldDtcbiAgICAgIGNvbnN0IGN1cnJlbnRBbmNob3IgPSB3YXNEaXNhYmxlZCA/IG1haW5BbmNob3IgOiB0YXJnZXRBbmNob3I7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBcInN2Z1wiIHx8IGlzVGFyZ2V0U1ZHKHRhcmdldCkpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJzdmdcIjtcbiAgICAgIH0gZWxzZSBpZiAobmFtZXNwYWNlID09PSBcIm1hdGhtbFwiIHx8IGlzVGFyZ2V0TWF0aE1MKHRhcmdldCkpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICAgIH1cbiAgICAgIGlmIChkeW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgcGF0Y2hCbG9ja0NoaWxkcmVuKFxuICAgICAgICAgIG4xLmR5bmFtaWNDaGlsZHJlbixcbiAgICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgICAgY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgICApO1xuICAgICAgICB0cmF2ZXJzZVN0YXRpY0NoaWxkcmVuKG4xLCBuMiwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKCFvcHRpbWl6ZWQpIHtcbiAgICAgICAgcGF0Y2hDaGlsZHJlbihcbiAgICAgICAgICBuMSxcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjdXJyZW50Q29udGFpbmVyLFxuICAgICAgICAgIGN1cnJlbnRBbmNob3IsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICBpZiAoIXdhc0Rpc2FibGVkKSB7XG4gICAgICAgICAgbW92ZVRlbGVwb3J0KFxuICAgICAgICAgICAgbjIsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBtYWluQW5jaG9yLFxuICAgICAgICAgICAgaW50ZXJuYWxzLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG4yLnByb3BzICYmIG4xLnByb3BzICYmIG4yLnByb3BzLnRvICE9PSBuMS5wcm9wcy50bykge1xuICAgICAgICAgICAgbjIucHJvcHMudG8gPSBuMS5wcm9wcy50bztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgobjIucHJvcHMgJiYgbjIucHJvcHMudG8pICE9PSAobjEucHJvcHMgJiYgbjEucHJvcHMudG8pKSB7XG4gICAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IG4yLnRhcmdldCA9IHJlc29sdmVUYXJnZXQoXG4gICAgICAgICAgICBuMi5wcm9wcyxcbiAgICAgICAgICAgIHF1ZXJ5U2VsZWN0b3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXh0VGFyZ2V0KSB7XG4gICAgICAgICAgICBtb3ZlVGVsZXBvcnQoXG4gICAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgICBuZXh0VGFyZ2V0LFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBpbnRlcm5hbHMsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgICAgIFwiSW52YWxpZCBUZWxlcG9ydCB0YXJnZXQgb24gdXBkYXRlOlwiLFxuICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgIGAoJHt0eXBlb2YgdGFyZ2V0fSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh3YXNEaXNhYmxlZCkge1xuICAgICAgICAgIG1vdmVUZWxlcG9ydChcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgdGFyZ2V0QW5jaG9yLFxuICAgICAgICAgICAgaW50ZXJuYWxzLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlQ3NzVmFycyhuMik7XG4gIH0sXG4gIHJlbW92ZSh2bm9kZSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgeyB1bTogdW5tb3VudCwgbzogeyByZW1vdmU6IGhvc3RSZW1vdmUgfSB9LCBkb1JlbW92ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNoYXBlRmxhZyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgYW5jaG9yLFxuICAgICAgdGFyZ2V0U3RhcnQsXG4gICAgICB0YXJnZXRBbmNob3IsXG4gICAgICB0YXJnZXQsXG4gICAgICBwcm9wc1xuICAgIH0gPSB2bm9kZTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBob3N0UmVtb3ZlKHRhcmdldFN0YXJ0KTtcbiAgICAgIGhvc3RSZW1vdmUodGFyZ2V0QW5jaG9yKTtcbiAgICB9XG4gICAgZG9SZW1vdmUgJiYgaG9zdFJlbW92ZShhbmNob3IpO1xuICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgY29uc3Qgc2hvdWxkUmVtb3ZlID0gZG9SZW1vdmUgfHwgIWlzVGVsZXBvcnREaXNhYmxlZChwcm9wcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIHVubW91bnQoXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIHNob3VsZFJlbW92ZSxcbiAgICAgICAgICAhIWNoaWxkLmR5bmFtaWNDaGlsZHJlblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW92ZTogbW92ZVRlbGVwb3J0LFxuICBoeWRyYXRlOiBoeWRyYXRlVGVsZXBvcnRcbn07XG5mdW5jdGlvbiBtb3ZlVGVsZXBvcnQodm5vZGUsIGNvbnRhaW5lciwgcGFyZW50QW5jaG9yLCB7IG86IHsgaW5zZXJ0IH0sIG06IG1vdmUgfSwgbW92ZVR5cGUgPSAyKSB7XG4gIGlmIChtb3ZlVHlwZSA9PT0gMCkge1xuICAgIGluc2VydCh2bm9kZS50YXJnZXRBbmNob3IsIGNvbnRhaW5lciwgcGFyZW50QW5jaG9yKTtcbiAgfVxuICBjb25zdCB7IGVsLCBhbmNob3IsIHNoYXBlRmxhZywgY2hpbGRyZW4sIHByb3BzIH0gPSB2bm9kZTtcbiAgY29uc3QgaXNSZW9yZGVyID0gbW92ZVR5cGUgPT09IDI7XG4gIGlmIChpc1Jlb3JkZXIpIHtcbiAgICBpbnNlcnQoZWwsIGNvbnRhaW5lciwgcGFyZW50QW5jaG9yKTtcbiAgfVxuICBpZiAoIWlzUmVvcmRlciB8fCBpc1RlbGVwb3J0RGlzYWJsZWQocHJvcHMpKSB7XG4gICAgaWYgKHNoYXBlRmxhZyAmIDE2KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1vdmUoXG4gICAgICAgICAgY2hpbGRyZW5baV0sXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIHBhcmVudEFuY2hvcixcbiAgICAgICAgICAyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChpc1Jlb3JkZXIpIHtcbiAgICBpbnNlcnQoYW5jaG9yLCBjb250YWluZXIsIHBhcmVudEFuY2hvcik7XG4gIH1cbn1cbmZ1bmN0aW9uIGh5ZHJhdGVUZWxlcG9ydChub2RlLCB2bm9kZSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQsIHtcbiAgbzogeyBuZXh0U2libGluZywgcGFyZW50Tm9kZSwgcXVlcnlTZWxlY3RvciwgaW5zZXJ0LCBjcmVhdGVUZXh0IH1cbn0sIGh5ZHJhdGVDaGlsZHJlbikge1xuICBjb25zdCB0YXJnZXQgPSB2bm9kZS50YXJnZXQgPSByZXNvbHZlVGFyZ2V0KFxuICAgIHZub2RlLnByb3BzLFxuICAgIHF1ZXJ5U2VsZWN0b3JcbiAgKTtcbiAgaWYgKHRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0YXJnZXQuX2xwYSB8fCB0YXJnZXQuZmlyc3RDaGlsZDtcbiAgICBpZiAodm5vZGUuc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgIGlmIChpc1RlbGVwb3J0RGlzYWJsZWQodm5vZGUucHJvcHMpKSB7XG4gICAgICAgIHZub2RlLmFuY2hvciA9IGh5ZHJhdGVDaGlsZHJlbihcbiAgICAgICAgICBuZXh0U2libGluZyhub2RlKSxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBwYXJlbnROb2RlKG5vZGUpLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIHZub2RlLnRhcmdldFN0YXJ0ID0gdGFyZ2V0Tm9kZTtcbiAgICAgICAgdm5vZGUudGFyZ2V0QW5jaG9yID0gdGFyZ2V0Tm9kZSAmJiBuZXh0U2libGluZyh0YXJnZXROb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlLmFuY2hvciA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICBsZXQgdGFyZ2V0QW5jaG9yID0gdGFyZ2V0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHRhcmdldEFuY2hvcikge1xuICAgICAgICAgIGlmICh0YXJnZXRBbmNob3IgJiYgdGFyZ2V0QW5jaG9yLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0QW5jaG9yLmRhdGEgPT09IFwidGVsZXBvcnQgc3RhcnQgYW5jaG9yXCIpIHtcbiAgICAgICAgICAgICAgdm5vZGUudGFyZ2V0U3RhcnQgPSB0YXJnZXRBbmNob3I7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldEFuY2hvci5kYXRhID09PSBcInRlbGVwb3J0IGFuY2hvclwiKSB7XG4gICAgICAgICAgICAgIHZub2RlLnRhcmdldEFuY2hvciA9IHRhcmdldEFuY2hvcjtcbiAgICAgICAgICAgICAgdGFyZ2V0Ll9scGEgPSB2bm9kZS50YXJnZXRBbmNob3IgJiYgbmV4dFNpYmxpbmcodm5vZGUudGFyZ2V0QW5jaG9yKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhcmdldEFuY2hvciA9IG5leHRTaWJsaW5nKHRhcmdldEFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2bm9kZS50YXJnZXRBbmNob3IpIHtcbiAgICAgICAgICBwcmVwYXJlQW5jaG9yKHRhcmdldCwgdm5vZGUsIGNyZWF0ZVRleHQsIGluc2VydCk7XG4gICAgICAgIH1cbiAgICAgICAgaHlkcmF0ZUNoaWxkcmVuKFxuICAgICAgICAgIHRhcmdldE5vZGUgJiYgbmV4dFNpYmxpbmcodGFyZ2V0Tm9kZSksXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZUNzc1ZhcnModm5vZGUpO1xuICB9XG4gIHJldHVybiB2bm9kZS5hbmNob3IgJiYgbmV4dFNpYmxpbmcodm5vZGUuYW5jaG9yKTtcbn1cbmNvbnN0IFRlbGVwb3J0ID0gVGVsZXBvcnRJbXBsO1xuZnVuY3Rpb24gdXBkYXRlQ3NzVmFycyh2bm9kZSkge1xuICBjb25zdCBjdHggPSB2bm9kZS5jdHg7XG4gIGlmIChjdHggJiYgY3R4LnV0KSB7XG4gICAgbGV0IG5vZGUgPSB2bm9kZS5jaGlsZHJlblswXS5lbDtcbiAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSB2bm9kZS50YXJnZXRBbmNob3IpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtdi1vd25lclwiLCBjdHgudWlkKTtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBjdHgudXQoKTtcbiAgfVxufVxuZnVuY3Rpb24gcHJlcGFyZUFuY2hvcih0YXJnZXQsIHZub2RlLCBjcmVhdGVUZXh0LCBpbnNlcnQpIHtcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2bm9kZS50YXJnZXRTdGFydCA9IGNyZWF0ZVRleHQoXCJcIik7XG4gIGNvbnN0IHRhcmdldEFuY2hvciA9IHZub2RlLnRhcmdldEFuY2hvciA9IGNyZWF0ZVRleHQoXCJcIik7XG4gIHRhcmdldFN0YXJ0W1RlbGVwb3J0RW5kS2V5XSA9IHRhcmdldEFuY2hvcjtcbiAgaWYgKHRhcmdldCkge1xuICAgIGluc2VydCh0YXJnZXRTdGFydCwgdGFyZ2V0KTtcbiAgICBpbnNlcnQodGFyZ2V0QW5jaG9yLCB0YXJnZXQpO1xuICB9XG4gIHJldHVybiB0YXJnZXRBbmNob3I7XG59XG5cbmxldCBoYXNMb2dnZWRNaXNtYXRjaEVycm9yID0gZmFsc2U7XG5jb25zdCBsb2dNaXNtYXRjaEVycm9yID0gKCkgPT4ge1xuICBpZiAoaGFzTG9nZ2VkTWlzbWF0Y2hFcnJvcikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmVycm9yKFwiSHlkcmF0aW9uIGNvbXBsZXRlZCBidXQgY29udGFpbnMgbWlzbWF0Y2hlcy5cIik7XG4gIGhhc0xvZ2dlZE1pc21hdGNoRXJyb3IgPSB0cnVlO1xufTtcbmNvbnN0IGlzU1ZHQ29udGFpbmVyID0gKGNvbnRhaW5lcikgPT4gY29udGFpbmVyLm5hbWVzcGFjZVVSSS5pbmNsdWRlcyhcInN2Z1wiKSAmJiBjb250YWluZXIudGFnTmFtZSAhPT0gXCJmb3JlaWduT2JqZWN0XCI7XG5jb25zdCBpc01hdGhNTENvbnRhaW5lciA9IChjb250YWluZXIpID0+IGNvbnRhaW5lci5uYW1lc3BhY2VVUkkuaW5jbHVkZXMoXCJNYXRoTUxcIik7XG5jb25zdCBnZXRDb250YWluZXJUeXBlID0gKGNvbnRhaW5lcikgPT4ge1xuICBpZiAoaXNTVkdDb250YWluZXIoY29udGFpbmVyKSkgcmV0dXJuIFwic3ZnXCI7XG4gIGlmIChpc01hdGhNTENvbnRhaW5lcihjb250YWluZXIpKSByZXR1cm4gXCJtYXRobWxcIjtcbiAgcmV0dXJuIHZvaWQgMDtcbn07XG5jb25zdCBpc0NvbW1lbnQgPSAobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gOCAvKiBDT01NRU5UICovO1xuZnVuY3Rpb24gY3JlYXRlSHlkcmF0aW9uRnVuY3Rpb25zKHJlbmRlcmVySW50ZXJuYWxzKSB7XG4gIGNvbnN0IHtcbiAgICBtdDogbW91bnRDb21wb25lbnQsXG4gICAgcDogcGF0Y2gsXG4gICAgbzoge1xuICAgICAgcGF0Y2hQcm9wLFxuICAgICAgY3JlYXRlVGV4dCxcbiAgICAgIG5leHRTaWJsaW5nLFxuICAgICAgcGFyZW50Tm9kZSxcbiAgICAgIHJlbW92ZSxcbiAgICAgIGluc2VydCxcbiAgICAgIGNyZWF0ZUNvbW1lbnRcbiAgICB9XG4gIH0gPSByZW5kZXJlckludGVybmFscztcbiAgY29uc3QgaHlkcmF0ZSA9ICh2bm9kZSwgY29udGFpbmVyKSA9PiB7XG4gICAgaWYgKCFjb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18pICYmIHdhcm4kMShcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gaHlkcmF0ZSBleGlzdGluZyBtYXJrdXAgYnV0IGNvbnRhaW5lciBpcyBlbXB0eS4gUGVyZm9ybWluZyBmdWxsIG1vdW50IGluc3RlYWQuYFxuICAgICAgKTtcbiAgICAgIHBhdGNoKG51bGwsIHZub2RlLCBjb250YWluZXIpO1xuICAgICAgZmx1c2hQb3N0Rmx1c2hDYnMoKTtcbiAgICAgIGNvbnRhaW5lci5fdm5vZGUgPSB2bm9kZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaHlkcmF0ZU5vZGUoY29udGFpbmVyLmZpcnN0Q2hpbGQsIHZub2RlLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICBmbHVzaFBvc3RGbHVzaENicygpO1xuICAgIGNvbnRhaW5lci5fdm5vZGUgPSB2bm9kZTtcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZU5vZGUgPSAobm9kZSwgdm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkID0gZmFsc2UpID0+IHtcbiAgICBvcHRpbWl6ZWQgPSBvcHRpbWl6ZWQgfHwgISF2bm9kZS5keW5hbWljQ2hpbGRyZW47XG4gICAgY29uc3QgaXNGcmFnbWVudFN0YXJ0ID0gaXNDb21tZW50KG5vZGUpICYmIG5vZGUuZGF0YSA9PT0gXCJbXCI7XG4gICAgY29uc3Qgb25NaXNtYXRjaCA9ICgpID0+IGhhbmRsZU1pc21hdGNoKFxuICAgICAgbm9kZSxcbiAgICAgIHZub2RlLFxuICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICBzbG90U2NvcGVJZHMsXG4gICAgICBpc0ZyYWdtZW50U3RhcnRcbiAgICApO1xuICAgIGNvbnN0IHsgdHlwZSwgcmVmLCBzaGFwZUZsYWcsIHBhdGNoRmxhZyB9ID0gdm5vZGU7XG4gICAgbGV0IGRvbVR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICAgIHZub2RlLmVsID0gbm9kZTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgIGRlZihub2RlLCBcIl9fdm5vZGVcIiwgdm5vZGUsIHRydWUpO1xuICAgICAgZGVmKG5vZGUsIFwiX192dWVQYXJlbnRDb21wb25lbnRcIiwgcGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKHBhdGNoRmxhZyA9PT0gLTIpIHtcbiAgICAgIG9wdGltaXplZCA9IGZhbHNlO1xuICAgICAgdm5vZGUuZHluYW1pY0NoaWxkcmVuID0gbnVsbDtcbiAgICB9XG4gICAgbGV0IG5leHROb2RlID0gbnVsbDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgVGV4dDpcbiAgICAgICAgaWYgKGRvbVR5cGUgIT09IDMgLyogVEVYVCAqLykge1xuICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgaW5zZXJ0KHZub2RlLmVsID0gY3JlYXRlVGV4dChcIlwiKSwgcGFyZW50Tm9kZShub2RlKSwgbm9kZSk7XG4gICAgICAgICAgICBuZXh0Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gb25NaXNtYXRjaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobm9kZS5kYXRhICE9PSB2bm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fKSAmJiB3YXJuJDEoXG4gICAgICAgICAgICAgIGBIeWRyYXRpb24gdGV4dCBtaXNtYXRjaCBpbmAsXG4gICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgYFxuICAtIHJlbmRlcmVkIG9uIHNlcnZlcjogJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBub2RlLmRhdGFcbiAgICAgICAgICAgICAgKX1cbiAgLSBleHBlY3RlZCBvbiBjbGllbnQ6ICR7SlNPTi5zdHJpbmdpZnkodm5vZGUuY2hpbGRyZW4pfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsb2dNaXNtYXRjaEVycm9yKCk7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dE5vZGUgPSBuZXh0U2libGluZyhub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tbWVudDpcbiAgICAgICAgaWYgKGlzVGVtcGxhdGVOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBuZXh0U2libGluZyhub2RlKTtcbiAgICAgICAgICByZXBsYWNlTm9kZShcbiAgICAgICAgICAgIHZub2RlLmVsID0gbm9kZS5jb250ZW50LmZpcnN0Q2hpbGQsXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb21UeXBlICE9PSA4IC8qIENPTU1FTlQgKi8gfHwgaXNGcmFnbWVudFN0YXJ0KSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBvbk1pc21hdGNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBuZXh0U2libGluZyhub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RhdGljOlxuICAgICAgICBpZiAoaXNGcmFnbWVudFN0YXJ0KSB7XG4gICAgICAgICAgbm9kZSA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICAgIGRvbVR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb21UeXBlID09PSAxIC8qIEVMRU1FTlQgKi8gfHwgZG9tVHlwZSA9PT0gMyAvKiBURVhUICovKSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBub2RlO1xuICAgICAgICAgIGNvbnN0IG5lZWRUb0Fkb3B0Q29udGVudCA9ICF2bm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bm9kZS5zdGF0aWNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmVlZFRvQWRvcHRDb250ZW50KVxuICAgICAgICAgICAgICB2bm9kZS5jaGlsZHJlbiArPSBuZXh0Tm9kZS5ub2RlVHlwZSA9PT0gMSAvKiBFTEVNRU5UICovID8gbmV4dE5vZGUub3V0ZXJIVE1MIDogbmV4dE5vZGUuZGF0YTtcbiAgICAgICAgICAgIGlmIChpID09PSB2bm9kZS5zdGF0aWNDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgdm5vZGUuYW5jaG9yID0gbmV4dE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRTaWJsaW5nKG5leHROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzRnJhZ21lbnRTdGFydCA/IG5leHRTaWJsaW5nKG5leHROb2RlKSA6IG5leHROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uTWlzbWF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRnJhZ21lbnQ6XG4gICAgICAgIGlmICghaXNGcmFnbWVudFN0YXJ0KSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBvbk1pc21hdGNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSBoeWRyYXRlRnJhZ21lbnQoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoc2hhcGVGbGFnICYgMSkge1xuICAgICAgICAgIGlmICgoZG9tVHlwZSAhPT0gMSAvKiBFTEVNRU5UICovIHx8IHZub2RlLnR5cGUudG9Mb3dlckNhc2UoKSAhPT0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpICYmICFpc1RlbXBsYXRlTm9kZShub2RlKSkge1xuICAgICAgICAgICAgbmV4dE5vZGUgPSBvbk1pc21hdGNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gaHlkcmF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIHZub2RlLFxuICAgICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgNikge1xuICAgICAgICAgIHZub2RlLnNsb3RTY29wZUlkcyA9IHNsb3RTY29wZUlkcztcbiAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBwYXJlbnROb2RlKG5vZGUpO1xuICAgICAgICAgIGlmIChpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gbG9jYXRlQ2xvc2luZ0FuY2hvcihub2RlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29tbWVudChub2RlKSAmJiBub2RlLmRhdGEgPT09IFwidGVsZXBvcnQgc3RhcnRcIikge1xuICAgICAgICAgICAgbmV4dE5vZGUgPSBsb2NhdGVDbG9zaW5nQW5jaG9yKG5vZGUsIG5vZGUuZGF0YSwgXCJ0ZWxlcG9ydCBlbmRcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vdW50Q29tcG9uZW50KFxuICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBnZXRDb250YWluZXJUeXBlKGNvbnRhaW5lciksXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc0FzeW5jV3JhcHBlcih2bm9kZSkpIHtcbiAgICAgICAgICAgIGxldCBzdWJUcmVlO1xuICAgICAgICAgICAgaWYgKGlzRnJhZ21lbnRTdGFydCkge1xuICAgICAgICAgICAgICBzdWJUcmVlID0gY3JlYXRlVk5vZGUoRnJhZ21lbnQpO1xuICAgICAgICAgICAgICBzdWJUcmVlLmFuY2hvciA9IG5leHROb2RlID8gbmV4dE5vZGUucHJldmlvdXNTaWJsaW5nIDogY29udGFpbmVyLmxhc3RDaGlsZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN1YlRyZWUgPSBub2RlLm5vZGVUeXBlID09PSAzID8gY3JlYXRlVGV4dFZOb2RlKFwiXCIpIDogY3JlYXRlVk5vZGUoXCJkaXZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJUcmVlLmVsID0gbm9kZTtcbiAgICAgICAgICAgIHZub2RlLmNvbXBvbmVudC5zdWJUcmVlID0gc3ViVHJlZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgNjQpIHtcbiAgICAgICAgICBpZiAoZG9tVHlwZSAhPT0gOCAvKiBDT01NRU5UICovKSB7XG4gICAgICAgICAgICBuZXh0Tm9kZSA9IG9uTWlzbWF0Y2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dE5vZGUgPSB2bm9kZS50eXBlLmh5ZHJhdGUoXG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIHZub2RlLFxuICAgICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICAgIG9wdGltaXplZCxcbiAgICAgICAgICAgICAgcmVuZGVyZXJJbnRlcm5hbHMsXG4gICAgICAgICAgICAgIGh5ZHJhdGVDaGlsZHJlblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICAgICAgbmV4dE5vZGUgPSB2bm9kZS50eXBlLmh5ZHJhdGUoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgIGdldENvbnRhaW5lclR5cGUocGFyZW50Tm9kZShub2RlKSksXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgICAgICByZW5kZXJlckludGVybmFscyxcbiAgICAgICAgICAgIGh5ZHJhdGVOb2RlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykge1xuICAgICAgICAgIHdhcm4kMShcIkludmFsaWQgSG9zdFZOb2RlIHR5cGU6XCIsIHR5cGUsIGAoJHt0eXBlb2YgdHlwZX0pYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgICBzZXRSZWYocmVmLCBudWxsLCBwYXJlbnRTdXNwZW5zZSwgdm5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dE5vZGU7XG4gIH07XG4gIGNvbnN0IGh5ZHJhdGVFbGVtZW50ID0gKGVsLCB2bm9kZSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBvcHRpbWl6ZWQgPSBvcHRpbWl6ZWQgfHwgISF2bm9kZS5keW5hbWljQ2hpbGRyZW47XG4gICAgY29uc3QgeyB0eXBlLCBwcm9wcywgcGF0Y2hGbGFnLCBzaGFwZUZsYWcsIGRpcnMsIHRyYW5zaXRpb24gfSA9IHZub2RlO1xuICAgIGNvbnN0IGZvcmNlUGF0Y2ggPSB0eXBlID09PSBcImlucHV0XCIgfHwgdHlwZSA9PT0gXCJvcHRpb25cIjtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBmb3JjZVBhdGNoIHx8IHBhdGNoRmxhZyAhPT0gLTEpIHtcbiAgICAgIGlmIChkaXJzKSB7XG4gICAgICAgIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJjcmVhdGVkXCIpO1xuICAgICAgfVxuICAgICAgbGV0IG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzID0gZmFsc2U7XG4gICAgICBpZiAoaXNUZW1wbGF0ZU5vZGUoZWwpKSB7XG4gICAgICAgIG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzID0gbmVlZFRyYW5zaXRpb24ocGFyZW50U3VzcGVuc2UsIHRyYW5zaXRpb24pICYmIHBhcmVudENvbXBvbmVudCAmJiBwYXJlbnRDb21wb25lbnQudm5vZGUucHJvcHMgJiYgcGFyZW50Q29tcG9uZW50LnZub2RlLnByb3BzLmFwcGVhcjtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGVsLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbi5iZWZvcmVFbnRlcihjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlTm9kZShjb250ZW50LCBlbCwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgdm5vZGUuZWwgPSBlbCA9IGNvbnRlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoc2hhcGVGbGFnICYgMTYgJiYgLy8gc2tpcCBpZiBlbGVtZW50IGhhcyBpbm5lckhUTUwgLyB0ZXh0Q29udGVudFxuICAgICAgIShwcm9wcyAmJiAocHJvcHMuaW5uZXJIVE1MIHx8IHByb3BzLnRleHRDb250ZW50KSkpIHtcbiAgICAgICAgbGV0IG5leHQgPSBoeWRyYXRlQ2hpbGRyZW4oXG4gICAgICAgICAgZWwuZmlyc3RDaGlsZCxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICBsZXQgaGFzV2FybmVkID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgaWYgKCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgIWhhc1dhcm5lZCkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgSHlkcmF0aW9uIGNoaWxkcmVuIG1pc21hdGNoIG9uYCxcbiAgICAgICAgICAgICAgZWwsXG4gICAgICAgICAgICAgIGBcblNlcnZlciByZW5kZXJlZCBlbGVtZW50IGNvbnRhaW5zIG1vcmUgY2hpbGQgbm9kZXMgdGhhbiBjbGllbnQgdmRvbS5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaGFzV2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nTWlzbWF0Y2hFcnJvcigpO1xuICAgICAgICAgIGNvbnN0IGN1ciA9IG5leHQ7XG4gICAgICAgICAgbmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgcmVtb3ZlKGN1cik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgOCkge1xuICAgICAgICBpZiAoZWwudGV4dENvbnRlbnQgIT09IHZub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fKSAmJiB3YXJuJDEoXG4gICAgICAgICAgICBgSHlkcmF0aW9uIHRleHQgY29udGVudCBtaXNtYXRjaCBvbmAsXG4gICAgICAgICAgICBlbCxcbiAgICAgICAgICAgIGBcbiAgLSByZW5kZXJlZCBvbiBzZXJ2ZXI6ICR7ZWwudGV4dENvbnRlbnR9XG4gIC0gZXhwZWN0ZWQgb24gY2xpZW50OiAke3Zub2RlLmNoaWxkcmVufWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fIHx8IGZvcmNlUGF0Y2ggfHwgIW9wdGltaXplZCB8fCBwYXRjaEZsYWcgJiAoMTYgfCAzMikpIHtcbiAgICAgICAgICBjb25zdCBpc0N1c3RvbUVsZW1lbnQgPSBlbC50YWdOYW1lLmluY2x1ZGVzKFwiLVwiKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgLy8gIzExMTg5IHNraXAgaWYgdGhpcyBub2RlIGhhcyBkaXJlY3RpdmVzIHRoYXQgaGF2ZSBjcmVhdGVkIGhvb2tzXG4gICAgICAgICAgICAvLyBhcyBpdCBjb3VsZCBoYXZlIG11dGF0ZWQgdGhlIERPTSBpbiBhbnkgcG9zc2libGUgd2F5XG4gICAgICAgICAgICAhKGRpcnMgJiYgZGlycy5zb21lKChkKSA9PiBkLmRpci5jcmVhdGVkKSkgJiYgcHJvcEhhc01pc21hdGNoKGVsLCBrZXksIHByb3BzW2tleV0sIHZub2RlLCBwYXJlbnRDb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JjZVBhdGNoICYmIChrZXkuZW5kc1dpdGgoXCJ2YWx1ZVwiKSB8fCBrZXkgPT09IFwiaW5kZXRlcm1pbmF0ZVwiKSB8fCBpc09uKGtleSkgJiYgIWlzUmVzZXJ2ZWRQcm9wKGtleSkgfHwgLy8gZm9yY2UgaHlkcmF0ZSB2LWJpbmQgd2l0aCAucHJvcCBtb2RpZmllcnNcbiAgICAgICAgICAgIGtleVswXSA9PT0gXCIuXCIgfHwgaXNDdXN0b21FbGVtZW50KSB7XG4gICAgICAgICAgICAgIHBhdGNoUHJvcChlbCwga2V5LCBudWxsLCBwcm9wc1trZXldLCB2b2lkIDAsIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgICBwYXRjaFByb3AoXG4gICAgICAgICAgICBlbCxcbiAgICAgICAgICAgIFwib25DbGlja1wiLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHByb3BzLm9uQ2xpY2ssXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHBhdGNoRmxhZyAmIDQgJiYgaXNSZWFjdGl2ZShwcm9wcy5zdHlsZSkpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcy5zdHlsZSkgcHJvcHMuc3R5bGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IHZub2RlSG9va3M7XG4gICAgICBpZiAodm5vZGVIb29rcyA9IHByb3BzICYmIHByb3BzLm9uVm5vZGVCZWZvcmVNb3VudCkge1xuICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rcywgcGFyZW50Q29tcG9uZW50LCB2bm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAoZGlycykge1xuICAgICAgICBpbnZva2VEaXJlY3RpdmVIb29rKHZub2RlLCBudWxsLCBwYXJlbnRDb21wb25lbnQsIFwiYmVmb3JlTW91bnRcIik7XG4gICAgICB9XG4gICAgICBpZiAoKHZub2RlSG9va3MgPSBwcm9wcyAmJiBwcm9wcy5vblZub2RlTW91bnRlZCkgfHwgZGlycyB8fCBuZWVkQ2FsbFRyYW5zaXRpb25Ib29rcykge1xuICAgICAgICBxdWV1ZUVmZmVjdFdpdGhTdXNwZW5zZSgoKSA9PiB7XG4gICAgICAgICAgdm5vZGVIb29rcyAmJiBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rcywgcGFyZW50Q29tcG9uZW50LCB2bm9kZSk7XG4gICAgICAgICAgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgJiYgdHJhbnNpdGlvbi5lbnRlcihlbCk7XG4gICAgICAgICAgZGlycyAmJiBpbnZva2VEaXJlY3RpdmVIb29rKHZub2RlLCBudWxsLCBwYXJlbnRDb21wb25lbnQsIFwibW91bnRlZFwiKTtcbiAgICAgICAgfSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWwubmV4dFNpYmxpbmc7XG4gIH07XG4gIGNvbnN0IGh5ZHJhdGVDaGlsZHJlbiA9IChub2RlLCBwYXJlbnRWTm9kZSwgY29udGFpbmVyLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIG9wdGltaXplZCA9IG9wdGltaXplZCB8fCAhIXBhcmVudFZOb2RlLmR5bmFtaWNDaGlsZHJlbjtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudFZOb2RlLmNoaWxkcmVuO1xuICAgIGNvbnN0IGwgPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgbGV0IGhhc1dhcm5lZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjb25zdCB2bm9kZSA9IG9wdGltaXplZCA/IGNoaWxkcmVuW2ldIDogY2hpbGRyZW5baV0gPSBub3JtYWxpemVWTm9kZShjaGlsZHJlbltpXSk7XG4gICAgICBjb25zdCBpc1RleHQgPSB2bm9kZS50eXBlID09PSBUZXh0O1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzVGV4dCAmJiAhb3B0aW1pemVkKSB7XG4gICAgICAgICAgbGV0IG5leHQgPSBjaGlsZHJlbltpICsgMV07XG4gICAgICAgICAgaWYgKG5leHQgJiYgKG5leHQgPSBub3JtYWxpemVWTm9kZShuZXh0KSkudHlwZSA9PT0gVGV4dCkge1xuICAgICAgICAgICAgaW5zZXJ0KFxuICAgICAgICAgICAgICBjcmVhdGVUZXh0KFxuICAgICAgICAgICAgICAgIG5vZGUuZGF0YS5zbGljZSh2bm9kZS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgbmV4dFNpYmxpbmcobm9kZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IGh5ZHJhdGVOb2RlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNUZXh0ICYmICF2bm9kZS5jaGlsZHJlbikge1xuICAgICAgICBpbnNlcnQodm5vZGUuZWwgPSBjcmVhdGVUZXh0KFwiXCIpLCBjb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgIWhhc1dhcm5lZCkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBIeWRyYXRpb24gY2hpbGRyZW4gbWlzbWF0Y2ggb25gLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYFxuU2VydmVyIHJlbmRlcmVkIGVsZW1lbnQgY29udGFpbnMgZmV3ZXIgY2hpbGQgbm9kZXMgdGhhbiBjbGllbnQgdmRvbS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBoYXNXYXJuZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICAgICAgcGF0Y2goXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgZ2V0Q29udGFpbmVyVHlwZShjb250YWluZXIpLFxuICAgICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZUZyYWdtZW50ID0gKG5vZGUsIHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IHsgc2xvdFNjb3BlSWRzOiBmcmFnbWVudFNsb3RTY29wZUlkcyB9ID0gdm5vZGU7XG4gICAgaWYgKGZyYWdtZW50U2xvdFNjb3BlSWRzKSB7XG4gICAgICBzbG90U2NvcGVJZHMgPSBzbG90U2NvcGVJZHMgPyBzbG90U2NvcGVJZHMuY29uY2F0KGZyYWdtZW50U2xvdFNjb3BlSWRzKSA6IGZyYWdtZW50U2xvdFNjb3BlSWRzO1xuICAgIH1cbiAgICBjb25zdCBjb250YWluZXIgPSBwYXJlbnROb2RlKG5vZGUpO1xuICAgIGNvbnN0IG5leHQgPSBoeWRyYXRlQ2hpbGRyZW4oXG4gICAgICBuZXh0U2libGluZyhub2RlKSxcbiAgICAgIHZub2RlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICBzbG90U2NvcGVJZHMsXG4gICAgICBvcHRpbWl6ZWRcbiAgICApO1xuICAgIGlmIChuZXh0ICYmIGlzQ29tbWVudChuZXh0KSAmJiBuZXh0LmRhdGEgPT09IFwiXVwiKSB7XG4gICAgICByZXR1cm4gbmV4dFNpYmxpbmcodm5vZGUuYW5jaG9yID0gbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICAgIGluc2VydCh2bm9kZS5hbmNob3IgPSBjcmVhdGVDb21tZW50KGBdYCksIGNvbnRhaW5lciwgbmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGhhbmRsZU1pc21hdGNoID0gKG5vZGUsIHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIGlzRnJhZ21lbnQpID0+IHtcbiAgICAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18pICYmIHdhcm4kMShcbiAgICAgIGBIeWRyYXRpb24gbm9kZSBtaXNtYXRjaDpcbi0gcmVuZGVyZWQgb24gc2VydmVyOmAsXG4gICAgICBub2RlLFxuICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMyAvKiBURVhUICovID8gYCh0ZXh0KWAgOiBpc0NvbW1lbnQobm9kZSkgJiYgbm9kZS5kYXRhID09PSBcIltcIiA/IGAoc3RhcnQgb2YgZnJhZ21lbnQpYCA6IGBgLFxuICAgICAgYFxuLSBleHBlY3RlZCBvbiBjbGllbnQ6YCxcbiAgICAgIHZub2RlLnR5cGVcbiAgICApO1xuICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICB2bm9kZS5lbCA9IG51bGw7XG4gICAgaWYgKGlzRnJhZ21lbnQpIHtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0ZUNsb3NpbmdBbmNob3Iobm9kZSk7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBuZXh0MiA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICBpZiAobmV4dDIgJiYgbmV4dDIgIT09IGVuZCkge1xuICAgICAgICAgIHJlbW92ZShuZXh0Mik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV4dCA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHBhcmVudE5vZGUobm9kZSk7XG4gICAgcmVtb3ZlKG5vZGUpO1xuICAgIHBhdGNoKFxuICAgICAgbnVsbCxcbiAgICAgIHZub2RlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgbmV4dCxcbiAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgZ2V0Q29udGFpbmVyVHlwZShjb250YWluZXIpLFxuICAgICAgc2xvdFNjb3BlSWRzXG4gICAgKTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfTtcbiAgY29uc3QgbG9jYXRlQ2xvc2luZ0FuY2hvciA9IChub2RlLCBvcGVuID0gXCJbXCIsIGNsb3NlID0gXCJdXCIpID0+IHtcbiAgICBsZXQgbWF0Y2ggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBub2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICBpZiAobm9kZSAmJiBpc0NvbW1lbnQobm9kZSkpIHtcbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gb3BlbikgbWF0Y2grKztcbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gY2xvc2UpIHtcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0U2libGluZyhub2RlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2gtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG4gIGNvbnN0IHJlcGxhY2VOb2RlID0gKG5ld05vZGUsIG9sZE5vZGUsIHBhcmVudENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudE5vZGUyID0gb2xkTm9kZS5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnROb2RlMikge1xuICAgICAgcGFyZW50Tm9kZTIucmVwbGFjZUNoaWxkKG5ld05vZGUsIG9sZE5vZGUpO1xuICAgIH1cbiAgICBsZXQgcGFyZW50ID0gcGFyZW50Q29tcG9uZW50O1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQudm5vZGUuZWwgPT09IG9sZE5vZGUpIHtcbiAgICAgICAgcGFyZW50LnZub2RlLmVsID0gcGFyZW50LnN1YlRyZWUuZWwgPSBuZXdOb2RlO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGlzVGVtcGxhdGVOb2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSAvKiBFTEVNRU5UICovICYmIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInRlbXBsYXRlXCI7XG4gIH07XG4gIHJldHVybiBbaHlkcmF0ZSwgaHlkcmF0ZU5vZGVdO1xufVxuZnVuY3Rpb24gcHJvcEhhc01pc21hdGNoKGVsLCBrZXksIGNsaWVudFZhbHVlLCB2bm9kZSwgaW5zdGFuY2UpIHtcbiAgbGV0IG1pc21hdGNoVHlwZTtcbiAgbGV0IG1pc21hdGNoS2V5O1xuICBsZXQgYWN0dWFsO1xuICBsZXQgZXhwZWN0ZWQ7XG4gIGlmIChrZXkgPT09IFwiY2xhc3NcIikge1xuICAgIGFjdHVhbCA9IGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgIGV4cGVjdGVkID0gbm9ybWFsaXplQ2xhc3MoY2xpZW50VmFsdWUpO1xuICAgIGlmICghaXNTZXRFcXVhbCh0b0NsYXNzU2V0KGFjdHVhbCB8fCBcIlwiKSwgdG9DbGFzc1NldChleHBlY3RlZCkpKSB7XG4gICAgICBtaXNtYXRjaFR5cGUgPSBtaXNtYXRjaEtleSA9IGBjbGFzc2A7XG4gICAgfVxuICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgYWN0dWFsID0gZWwuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikgfHwgXCJcIjtcbiAgICBleHBlY3RlZCA9IGlzU3RyaW5nKGNsaWVudFZhbHVlKSA/IGNsaWVudFZhbHVlIDogc3RyaW5naWZ5U3R5bGUobm9ybWFsaXplU3R5bGUoY2xpZW50VmFsdWUpKTtcbiAgICBjb25zdCBhY3R1YWxNYXAgPSB0b1N0eWxlTWFwKGFjdHVhbCk7XG4gICAgY29uc3QgZXhwZWN0ZWRNYXAgPSB0b1N0eWxlTWFwKGV4cGVjdGVkKTtcbiAgICBpZiAodm5vZGUuZGlycykge1xuICAgICAgZm9yIChjb25zdCB7IGRpciwgdmFsdWUgfSBvZiB2bm9kZS5kaXJzKSB7XG4gICAgICAgIGlmIChkaXIubmFtZSA9PT0gXCJzaG93XCIgJiYgIXZhbHVlKSB7XG4gICAgICAgICAgZXhwZWN0ZWRNYXAuc2V0KFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICByZXNvbHZlQ3NzVmFycyhpbnN0YW5jZSwgdm5vZGUsIGV4cGVjdGVkTWFwKTtcbiAgICB9XG4gICAgaWYgKCFpc01hcEVxdWFsKGFjdHVhbE1hcCwgZXhwZWN0ZWRNYXApKSB7XG4gICAgICBtaXNtYXRjaFR5cGUgPSBtaXNtYXRjaEtleSA9IFwic3R5bGVcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50ICYmIGlzS25vd25TdmdBdHRyKGtleSkgfHwgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAoaXNCb29sZWFuQXR0cihrZXkpIHx8IGlzS25vd25IdG1sQXR0cihrZXkpKSkge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyKGtleSkpIHtcbiAgICAgIGFjdHVhbCA9IGVsLmhhc0F0dHJpYnV0ZShrZXkpO1xuICAgICAgZXhwZWN0ZWQgPSBpbmNsdWRlQm9vbGVhbkF0dHIoY2xpZW50VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoY2xpZW50VmFsdWUgPT0gbnVsbCkge1xuICAgICAgYWN0dWFsID0gZWwuaGFzQXR0cmlidXRlKGtleSk7XG4gICAgICBleHBlY3RlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKGtleSkpIHtcbiAgICAgICAgYWN0dWFsID0gZWwuZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ2YWx1ZVwiICYmIGVsLnRhZ05hbWUgPT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgICBhY3R1YWwgPSBlbC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdHVhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZXhwZWN0ZWQgPSBpc1JlbmRlcmFibGVBdHRyVmFsdWUoY2xpZW50VmFsdWUpID8gU3RyaW5nKGNsaWVudFZhbHVlKSA6IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgICAgbWlzbWF0Y2hUeXBlID0gYGF0dHJpYnV0ZWA7XG4gICAgICBtaXNtYXRjaEtleSA9IGtleTtcbiAgICB9XG4gIH1cbiAgaWYgKG1pc21hdGNoVHlwZSkge1xuICAgIGNvbnN0IGZvcm1hdCA9ICh2KSA9PiB2ID09PSBmYWxzZSA/IGAobm90IHJlbmRlcmVkKWAgOiBgJHttaXNtYXRjaEtleX09XCIke3Z9XCJgO1xuICAgIGNvbnN0IHByZVNlZ21lbnQgPSBgSHlkcmF0aW9uICR7bWlzbWF0Y2hUeXBlfSBtaXNtYXRjaCBvbmA7XG4gICAgY29uc3QgcG9zdFNlZ21lbnQgPSBgXG4gIC0gcmVuZGVyZWQgb24gc2VydmVyOiAke2Zvcm1hdChhY3R1YWwpfVxuICAtIGV4cGVjdGVkIG9uIGNsaWVudDogJHtmb3JtYXQoZXhwZWN0ZWQpfVxuICBOb3RlOiB0aGlzIG1pc21hdGNoIGlzIGNoZWNrLW9ubHkuIFRoZSBET00gd2lsbCBub3QgYmUgcmVjdGlmaWVkIGluIHByb2R1Y3Rpb24gZHVlIHRvIHBlcmZvcm1hbmNlIG92ZXJoZWFkLlxuICBZb3Ugc2hvdWxkIGZpeCB0aGUgc291cmNlIG9mIHRoZSBtaXNtYXRjaC5gO1xuICAgIHtcbiAgICAgIHdhcm4kMShwcmVTZWdtZW50LCBlbCwgcG9zdFNlZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiB0b0NsYXNzU2V0KHN0cikge1xuICByZXR1cm4gbmV3IFNldChzdHIudHJpbSgpLnNwbGl0KC9cXHMrLykpO1xufVxuZnVuY3Rpb24gaXNTZXRFcXVhbChhLCBiKSB7XG4gIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGNvbnN0IHMgb2YgYSkge1xuICAgIGlmICghYi5oYXMocykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiB0b1N0eWxlTWFwKHN0cikge1xuICBjb25zdCBzdHlsZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBzdHIuc3BsaXQoXCI7XCIpKSB7XG4gICAgbGV0IFtrZXksIHZhbHVlXSA9IGl0ZW0uc3BsaXQoXCI6XCIpO1xuICAgIGtleSA9IGtleS50cmltKCk7XG4gICAgdmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS50cmltKCk7XG4gICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgc3R5bGVNYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVNYXA7XG59XG5mdW5jdGlvbiBpc01hcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGEpIHtcbiAgICBpZiAodmFsdWUgIT09IGIuZ2V0KGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiByZXNvbHZlQ3NzVmFycyhpbnN0YW5jZSwgdm5vZGUsIGV4cGVjdGVkTWFwKSB7XG4gIGNvbnN0IHJvb3QgPSBpbnN0YW5jZS5zdWJUcmVlO1xuICBpZiAoaW5zdGFuY2UuZ2V0Q3NzVmFycyAmJiAodm5vZGUgPT09IHJvb3QgfHwgcm9vdCAmJiByb290LnR5cGUgPT09IEZyYWdtZW50ICYmIHJvb3QuY2hpbGRyZW4uaW5jbHVkZXModm5vZGUpKSkge1xuICAgIGNvbnN0IGNzc1ZhcnMgPSBpbnN0YW5jZS5nZXRDc3NWYXJzKCk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY3NzVmFycykge1xuICAgICAgZXhwZWN0ZWRNYXAuc2V0KGAtLSR7a2V5fWAsIFN0cmluZyhjc3NWYXJzW2tleV0pKTtcbiAgICB9XG4gIH1cbiAgaWYgKHZub2RlID09PSByb290ICYmIGluc3RhbmNlLnBhcmVudCkge1xuICAgIHJlc29sdmVDc3NWYXJzKGluc3RhbmNlLnBhcmVudCwgaW5zdGFuY2Uudm5vZGUsIGV4cGVjdGVkTWFwKTtcbiAgfVxufVxuXG5sZXQgc3VwcG9ydGVkO1xubGV0IHBlcmY7XG5mdW5jdGlvbiBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIHR5cGUpIHtcbiAgaWYgKGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnLnBlcmZvcm1hbmNlICYmIGlzU3VwcG9ydGVkKCkpIHtcbiAgICBwZXJmLm1hcmsoYHZ1ZS0ke3R5cGV9LSR7aW5zdGFuY2UudWlkfWApO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgIGRldnRvb2xzUGVyZlN0YXJ0KGluc3RhbmNlLCB0eXBlLCBpc1N1cHBvcnRlZCgpID8gcGVyZi5ub3coKSA6IERhdGUubm93KCkpO1xuICB9XG59XG5mdW5jdGlvbiBlbmRNZWFzdXJlKGluc3RhbmNlLCB0eXBlKSB7XG4gIGlmIChpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy5wZXJmb3JtYW5jZSAmJiBpc1N1cHBvcnRlZCgpKSB7XG4gICAgY29uc3Qgc3RhcnRUYWcgPSBgdnVlLSR7dHlwZX0tJHtpbnN0YW5jZS51aWR9YDtcbiAgICBjb25zdCBlbmRUYWcgPSBzdGFydFRhZyArIGA6ZW5kYDtcbiAgICBwZXJmLm1hcmsoZW5kVGFnKTtcbiAgICBwZXJmLm1lYXN1cmUoXG4gICAgICBgPCR7Zm9ybWF0Q29tcG9uZW50TmFtZShpbnN0YW5jZSwgaW5zdGFuY2UudHlwZSl9PiAke3R5cGV9YCxcbiAgICAgIHN0YXJ0VGFnLFxuICAgICAgZW5kVGFnXG4gICAgKTtcbiAgICBwZXJmLmNsZWFyTWFya3Moc3RhcnRUYWcpO1xuICAgIHBlcmYuY2xlYXJNYXJrcyhlbmRUYWcpO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgIGRldnRvb2xzUGVyZkVuZChpbnN0YW5jZSwgdHlwZSwgaXNTdXBwb3J0ZWQoKSA/IHBlcmYubm93KCkgOiBEYXRlLm5vdygpKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gIGlmIChzdXBwb3J0ZWQgIT09IHZvaWQgMCkge1xuICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gIH1cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICBwZXJmID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBzdXBwb3J0ZWQ7XG59XG5cbmZ1bmN0aW9uIGluaXRGZWF0dXJlRmxhZ3MoKSB7XG4gIGNvbnN0IG5lZWRXYXJuID0gW107XG4gIGlmICh0eXBlb2YgX19WVUVfT1BUSU9OU19BUElfXyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIG5lZWRXYXJuLnB1c2goYF9fVlVFX09QVElPTlNfQVBJX19gKTtcbiAgICBnZXRHbG9iYWxUaGlzKCkuX19WVUVfT1BUSU9OU19BUElfXyA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBfX1ZVRV9QUk9EX0RFVlRPT0xTX18gIT09IFwiYm9vbGVhblwiKSB7XG4gICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBuZWVkV2Fybi5wdXNoKGBfX1ZVRV9QUk9EX0RFVlRPT0xTX19gKTtcbiAgICBnZXRHbG9iYWxUaGlzKCkuX19WVUVfUFJPRF9ERVZUT09MU19fID0gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18gIT09IFwiYm9vbGVhblwiKSB7XG4gICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBuZWVkV2Fybi5wdXNoKGBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX19gKTtcbiAgICBnZXRHbG9iYWxUaGlzKCkuX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fID0gZmFsc2U7XG4gIH1cbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgbmVlZFdhcm4ubGVuZ3RoKSB7XG4gICAgY29uc3QgbXVsdGkgPSBuZWVkV2Fybi5sZW5ndGggPiAxO1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBGZWF0dXJlIGZsYWcke211bHRpID8gYHNgIDogYGB9ICR7bmVlZFdhcm4uam9pbihcIiwgXCIpfSAke211bHRpID8gYGFyZWAgOiBgaXNgfSBub3QgZXhwbGljaXRseSBkZWZpbmVkLiBZb3UgYXJlIHJ1bm5pbmcgdGhlIGVzbS1idW5kbGVyIGJ1aWxkIG9mIFZ1ZSwgd2hpY2ggZXhwZWN0cyB0aGVzZSBjb21waWxlLXRpbWUgZmVhdHVyZSBmbGFncyB0byBiZSBnbG9iYWxseSBpbmplY3RlZCB2aWEgdGhlIGJ1bmRsZXIgY29uZmlnIGluIG9yZGVyIHRvIGdldCBiZXR0ZXIgdHJlZS1zaGFraW5nIGluIHRoZSBwcm9kdWN0aW9uIGJ1bmRsZS5cblxuRm9yIG1vcmUgZGV0YWlscywgc2VlIGh0dHBzOi8vbGluay52dWVqcy5vcmcvZmVhdHVyZS1mbGFncy5gXG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QgPSBxdWV1ZUVmZmVjdFdpdGhTdXNwZW5zZSA7XG5mdW5jdGlvbiBjcmVhdGVSZW5kZXJlcihvcHRpb25zKSB7XG4gIHJldHVybiBiYXNlQ3JlYXRlUmVuZGVyZXIob3B0aW9ucyk7XG59XG5mdW5jdGlvbiBjcmVhdGVIeWRyYXRpb25SZW5kZXJlcihvcHRpb25zKSB7XG4gIHJldHVybiBiYXNlQ3JlYXRlUmVuZGVyZXIob3B0aW9ucywgY3JlYXRlSHlkcmF0aW9uRnVuY3Rpb25zKTtcbn1cbmZ1bmN0aW9uIGJhc2VDcmVhdGVSZW5kZXJlcihvcHRpb25zLCBjcmVhdGVIeWRyYXRpb25GbnMpIHtcbiAge1xuICAgIGluaXRGZWF0dXJlRmxhZ3MoKTtcbiAgfVxuICBjb25zdCB0YXJnZXQgPSBnZXRHbG9iYWxUaGlzKCk7XG4gIHRhcmdldC5fX1ZVRV9fID0gdHJ1ZTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgc2V0RGV2dG9vbHNIb29rJDEodGFyZ2V0Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX18sIHRhcmdldCk7XG4gIH1cbiAgY29uc3Qge1xuICAgIGluc2VydDogaG9zdEluc2VydCxcbiAgICByZW1vdmU6IGhvc3RSZW1vdmUsXG4gICAgcGF0Y2hQcm9wOiBob3N0UGF0Y2hQcm9wLFxuICAgIGNyZWF0ZUVsZW1lbnQ6IGhvc3RDcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZVRleHQ6IGhvc3RDcmVhdGVUZXh0LFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGhvc3RDcmVhdGVDb21tZW50LFxuICAgIHNldFRleHQ6IGhvc3RTZXRUZXh0LFxuICAgIHNldEVsZW1lbnRUZXh0OiBob3N0U2V0RWxlbWVudFRleHQsXG4gICAgcGFyZW50Tm9kZTogaG9zdFBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IGhvc3ROZXh0U2libGluZyxcbiAgICBzZXRTY29wZUlkOiBob3N0U2V0U2NvcGVJZCA9IE5PT1AsXG4gICAgaW5zZXJ0U3RhdGljQ29udGVudDogaG9zdEluc2VydFN0YXRpY0NvbnRlbnRcbiAgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBhdGNoID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IgPSBudWxsLCBwYXJlbnRDb21wb25lbnQgPSBudWxsLCBwYXJlbnRTdXNwZW5zZSA9IG51bGwsIG5hbWVzcGFjZSA9IHZvaWQgMCwgc2xvdFNjb3BlSWRzID0gbnVsbCwgb3B0aW1pemVkID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBpc0htclVwZGF0aW5nID8gZmFsc2UgOiAhIW4yLmR5bmFtaWNDaGlsZHJlbikgPT4ge1xuICAgIGlmIChuMSA9PT0gbjIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG4xICYmICFpc1NhbWVWTm9kZVR5cGUobjEsIG4yKSkge1xuICAgICAgYW5jaG9yID0gZ2V0TmV4dEhvc3ROb2RlKG4xKTtcbiAgICAgIHVubW91bnQobjEsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHRydWUpO1xuICAgICAgbjEgPSBudWxsO1xuICAgIH1cbiAgICBpZiAobjIucGF0Y2hGbGFnID09PSAtMikge1xuICAgICAgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICBuMi5keW5hbWljQ2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7IHR5cGUsIHJlZiwgc2hhcGVGbGFnIH0gPSBuMjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgVGV4dDpcbiAgICAgICAgcHJvY2Vzc1RleHQobjEsIG4yLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb21tZW50OlxuICAgICAgICBwcm9jZXNzQ29tbWVudE5vZGUobjEsIG4yLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdGF0aWM6XG4gICAgICAgIGlmIChuMSA9PSBudWxsKSB7XG4gICAgICAgICAgbW91bnRTdGF0aWNOb2RlKG4yLCBjb250YWluZXIsIGFuY2hvciwgbmFtZXNwYWNlKTtcbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgcGF0Y2hTdGF0aWNOb2RlKG4xLCBuMiwgY29udGFpbmVyLCBuYW1lc3BhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGcmFnbWVudDpcbiAgICAgICAgcHJvY2Vzc0ZyYWdtZW50KFxuICAgICAgICAgIG4xLFxuICAgICAgICAgIG4yLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHNoYXBlRmxhZyAmIDEpIHtcbiAgICAgICAgICBwcm9jZXNzRWxlbWVudChcbiAgICAgICAgICAgIG4xLFxuICAgICAgICAgICAgbjIsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgNikge1xuICAgICAgICAgIHByb2Nlc3NDb21wb25lbnQoXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlRmxhZyAmIDY0KSB7XG4gICAgICAgICAgdHlwZS5wcm9jZXNzKFxuICAgICAgICAgICAgbjEsXG4gICAgICAgICAgICBuMixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkLFxuICAgICAgICAgICAgaW50ZXJuYWxzXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZUZsYWcgJiAxMjgpIHtcbiAgICAgICAgICB0eXBlLnByb2Nlc3MoXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgICAgICBpbnRlcm5hbHNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICB3YXJuJDEoXCJJbnZhbGlkIFZOb2RlIHR5cGU6XCIsIHR5cGUsIGAoJHt0eXBlb2YgdHlwZX0pYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlZiAhPSBudWxsICYmIHBhcmVudENvbXBvbmVudCkge1xuICAgICAgc2V0UmVmKHJlZiwgbjEgJiYgbjEucmVmLCBwYXJlbnRTdXNwZW5zZSwgbjIgfHwgbjEsICFuMik7XG4gICAgfVxuICB9O1xuICBjb25zdCBwcm9jZXNzVGV4dCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yKSA9PiB7XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIGhvc3RJbnNlcnQoXG4gICAgICAgIG4yLmVsID0gaG9zdENyZWF0ZVRleHQobjIuY2hpbGRyZW4pLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIGFuY2hvclxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZWwgPSBuMi5lbCA9IG4xLmVsO1xuICAgICAgaWYgKG4yLmNoaWxkcmVuICE9PSBuMS5jaGlsZHJlbikge1xuICAgICAgICBob3N0U2V0VGV4dChlbCwgbjIuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0NvbW1lbnROb2RlID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IpID0+IHtcbiAgICBpZiAobjEgPT0gbnVsbCkge1xuICAgICAgaG9zdEluc2VydChcbiAgICAgICAgbjIuZWwgPSBob3N0Q3JlYXRlQ29tbWVudChuMi5jaGlsZHJlbiB8fCBcIlwiKSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3JcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudFN0YXRpY05vZGUgPSAobjIsIGNvbnRhaW5lciwgYW5jaG9yLCBuYW1lc3BhY2UpID0+IHtcbiAgICBbbjIuZWwsIG4yLmFuY2hvcl0gPSBob3N0SW5zZXJ0U3RhdGljQ29udGVudChcbiAgICAgIG4yLmNoaWxkcmVuLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgYW5jaG9yLFxuICAgICAgbmFtZXNwYWNlLFxuICAgICAgbjIuZWwsXG4gICAgICBuMi5hbmNob3JcbiAgICApO1xuICB9O1xuICBjb25zdCBwYXRjaFN0YXRpY05vZGUgPSAobjEsIG4yLCBjb250YWluZXIsIG5hbWVzcGFjZSkgPT4ge1xuICAgIGlmIChuMi5jaGlsZHJlbiAhPT0gbjEuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGFuY2hvciA9IGhvc3ROZXh0U2libGluZyhuMS5hbmNob3IpO1xuICAgICAgcmVtb3ZlU3RhdGljTm9kZShuMSk7XG4gICAgICBbbjIuZWwsIG4yLmFuY2hvcl0gPSBob3N0SW5zZXJ0U3RhdGljQ29udGVudChcbiAgICAgICAgbjIuY2hpbGRyZW4sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBuYW1lc3BhY2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgICBuMi5hbmNob3IgPSBuMS5hbmNob3I7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3ZlU3RhdGljTm9kZSA9ICh7IGVsLCBhbmNob3IgfSwgY29udGFpbmVyLCBuZXh0U2libGluZykgPT4ge1xuICAgIGxldCBuZXh0O1xuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gYW5jaG9yKSB7XG4gICAgICBuZXh0ID0gaG9zdE5leHRTaWJsaW5nKGVsKTtcbiAgICAgIGhvc3RJbnNlcnQoZWwsIGNvbnRhaW5lciwgbmV4dFNpYmxpbmcpO1xuICAgICAgZWwgPSBuZXh0O1xuICAgIH1cbiAgICBob3N0SW5zZXJ0KGFuY2hvciwgY29udGFpbmVyLCBuZXh0U2libGluZyk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZVN0YXRpY05vZGUgPSAoeyBlbCwgYW5jaG9yIH0pID0+IHtcbiAgICBsZXQgbmV4dDtcbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGFuY2hvcikge1xuICAgICAgbmV4dCA9IGhvc3ROZXh0U2libGluZyhlbCk7XG4gICAgICBob3N0UmVtb3ZlKGVsKTtcbiAgICAgIGVsID0gbmV4dDtcbiAgICB9XG4gICAgaG9zdFJlbW92ZShhbmNob3IpO1xuICB9O1xuICBjb25zdCBwcm9jZXNzRWxlbWVudCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgaWYgKG4yLnR5cGUgPT09IFwic3ZnXCIpIHtcbiAgICAgIG5hbWVzcGFjZSA9IFwic3ZnXCI7XG4gICAgfSBlbHNlIGlmIChuMi50eXBlID09PSBcIm1hdGhcIikge1xuICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICB9XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIG1vdW50RWxlbWVudChcbiAgICAgICAgbjIsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRjaEVsZW1lbnQoXG4gICAgICAgIG4xLFxuICAgICAgICBuMixcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG1vdW50RWxlbWVudCA9ICh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBsZXQgZWw7XG4gICAgbGV0IHZub2RlSG9vaztcbiAgICBjb25zdCB7IHByb3BzLCBzaGFwZUZsYWcsIHRyYW5zaXRpb24sIGRpcnMgfSA9IHZub2RlO1xuICAgIGVsID0gdm5vZGUuZWwgPSBob3N0Q3JlYXRlRWxlbWVudChcbiAgICAgIHZub2RlLnR5cGUsXG4gICAgICBuYW1lc3BhY2UsXG4gICAgICBwcm9wcyAmJiBwcm9wcy5pcyxcbiAgICAgIHByb3BzXG4gICAgKTtcbiAgICBpZiAoc2hhcGVGbGFnICYgOCkge1xuICAgICAgaG9zdFNldEVsZW1lbnRUZXh0KGVsLCB2bm9kZS5jaGlsZHJlbik7XG4gICAgfSBlbHNlIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgbW91bnRDaGlsZHJlbihcbiAgICAgICAgdm5vZGUuY2hpbGRyZW4sXG4gICAgICAgIGVsLFxuICAgICAgICBudWxsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICByZXNvbHZlQ2hpbGRyZW5OYW1lc3BhY2Uodm5vZGUsIG5hbWVzcGFjZSksXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZGlycykge1xuICAgICAgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcImNyZWF0ZWRcIik7XG4gICAgfVxuICAgIHNldFNjb3BlSWQoZWwsIHZub2RlLCB2bm9kZS5zY29wZUlkLCBzbG90U2NvcGVJZHMsIHBhcmVudENvbXBvbmVudCk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcInZhbHVlXCIgJiYgIWlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBrZXksIG51bGwsIHByb3BzW2tleV0sIG5hbWVzcGFjZSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFwidmFsdWVcIiBpbiBwcm9wcykge1xuICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBcInZhbHVlXCIsIG51bGwsIHByb3BzLnZhbHVlLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgICAgaWYgKHZub2RlSG9vayA9IHByb3BzLm9uVm5vZGVCZWZvcmVNb3VudCkge1xuICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBkZWYoZWwsIFwiX192bm9kZVwiLCB2bm9kZSwgdHJ1ZSk7XG4gICAgICBkZWYoZWwsIFwiX192dWVQYXJlbnRDb21wb25lbnRcIiwgcGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKGRpcnMpIHtcbiAgICAgIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJiZWZvcmVNb3VudFwiKTtcbiAgICB9XG4gICAgY29uc3QgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgPSBuZWVkVHJhbnNpdGlvbihwYXJlbnRTdXNwZW5zZSwgdHJhbnNpdGlvbik7XG4gICAgaWYgKG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzKSB7XG4gICAgICB0cmFuc2l0aW9uLmJlZm9yZUVudGVyKGVsKTtcbiAgICB9XG4gICAgaG9zdEluc2VydChlbCwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgIGlmICgodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZU1vdW50ZWQpIHx8IG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzIHx8IGRpcnMpIHtcbiAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHZub2RlSG9vayAmJiBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgICAgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgJiYgdHJhbnNpdGlvbi5lbnRlcihlbCk7XG4gICAgICAgIGRpcnMgJiYgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcIm1vdW50ZWRcIik7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBzZXRTY29wZUlkID0gKGVsLCB2bm9kZSwgc2NvcGVJZCwgc2xvdFNjb3BlSWRzLCBwYXJlbnRDb21wb25lbnQpID0+IHtcbiAgICBpZiAoc2NvcGVJZCkge1xuICAgICAgaG9zdFNldFNjb3BlSWQoZWwsIHNjb3BlSWQpO1xuICAgIH1cbiAgICBpZiAoc2xvdFNjb3BlSWRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsb3RTY29wZUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBob3N0U2V0U2NvcGVJZChlbCwgc2xvdFNjb3BlSWRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmVudENvbXBvbmVudCkge1xuICAgICAgbGV0IHN1YlRyZWUgPSBwYXJlbnRDb21wb25lbnQuc3ViVHJlZTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHN1YlRyZWUucGF0Y2hGbGFnID4gMCAmJiBzdWJUcmVlLnBhdGNoRmxhZyAmIDIwNDgpIHtcbiAgICAgICAgc3ViVHJlZSA9IGZpbHRlclNpbmdsZVJvb3Qoc3ViVHJlZS5jaGlsZHJlbikgfHwgc3ViVHJlZTtcbiAgICAgIH1cbiAgICAgIGlmICh2bm9kZSA9PT0gc3ViVHJlZSkge1xuICAgICAgICBjb25zdCBwYXJlbnRWTm9kZSA9IHBhcmVudENvbXBvbmVudC52bm9kZTtcbiAgICAgICAgc2V0U2NvcGVJZChcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBwYXJlbnRWTm9kZSxcbiAgICAgICAgICBwYXJlbnRWTm9kZS5zY29wZUlkLFxuICAgICAgICAgIHBhcmVudFZOb2RlLnNsb3RTY29wZUlkcyxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQucGFyZW50XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudENoaWxkcmVuID0gKGNoaWxkcmVuLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgc3RhcnQgPSAwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjaGlsZHJlbltpXSkgOiBub3JtYWxpemVWTm9kZShjaGlsZHJlbltpXSk7XG4gICAgICBwYXRjaChcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgcGF0Y2hFbGVtZW50ID0gKG4xLCBuMiwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGVsID0gbjIuZWwgPSBuMS5lbDtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgIGVsLl9fdm5vZGUgPSBuMjtcbiAgICB9XG4gICAgbGV0IHsgcGF0Y2hGbGFnLCBkeW5hbWljQ2hpbGRyZW4sIGRpcnMgfSA9IG4yO1xuICAgIHBhdGNoRmxhZyB8PSBuMS5wYXRjaEZsYWcgJiAxNjtcbiAgICBjb25zdCBvbGRQcm9wcyA9IG4xLnByb3BzIHx8IEVNUFRZX09CSjtcbiAgICBjb25zdCBuZXdQcm9wcyA9IG4yLnByb3BzIHx8IEVNUFRZX09CSjtcbiAgICBsZXQgdm5vZGVIb29rO1xuICAgIHBhcmVudENvbXBvbmVudCAmJiB0b2dnbGVSZWN1cnNlKHBhcmVudENvbXBvbmVudCwgZmFsc2UpO1xuICAgIGlmICh2bm9kZUhvb2sgPSBuZXdQcm9wcy5vblZub2RlQmVmb3JlVXBkYXRlKSB7XG4gICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIG4yLCBuMSk7XG4gICAgfVxuICAgIGlmIChkaXJzKSB7XG4gICAgICBpbnZva2VEaXJlY3RpdmVIb29rKG4yLCBuMSwgcGFyZW50Q29tcG9uZW50LCBcImJlZm9yZVVwZGF0ZVwiKTtcbiAgICB9XG4gICAgcGFyZW50Q29tcG9uZW50ICYmIHRvZ2dsZVJlY3Vyc2UocGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBpc0htclVwZGF0aW5nKSB7XG4gICAgICBwYXRjaEZsYWcgPSAwO1xuICAgICAgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICBkeW5hbWljQ2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgICBpZiAob2xkUHJvcHMuaW5uZXJIVE1MICYmIG5ld1Byb3BzLmlubmVySFRNTCA9PSBudWxsIHx8IG9sZFByb3BzLnRleHRDb250ZW50ICYmIG5ld1Byb3BzLnRleHRDb250ZW50ID09IG51bGwpIHtcbiAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChlbCwgXCJcIik7XG4gICAgfVxuICAgIGlmIChkeW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgIHBhdGNoQmxvY2tDaGlsZHJlbihcbiAgICAgICAgbjEuZHluYW1pY0NoaWxkcmVuLFxuICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgIGVsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICByZXNvbHZlQ2hpbGRyZW5OYW1lc3BhY2UobjIsIG5hbWVzcGFjZSksXG4gICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4objEsIG4yKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFvcHRpbWl6ZWQpIHtcbiAgICAgIHBhdGNoQ2hpbGRyZW4oXG4gICAgICAgIG4xLFxuICAgICAgICBuMixcbiAgICAgICAgZWwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIHJlc29sdmVDaGlsZHJlbk5hbWVzcGFjZShuMiwgbmFtZXNwYWNlKSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHBhdGNoRmxhZyA+IDApIHtcbiAgICAgIGlmIChwYXRjaEZsYWcgJiAxNikge1xuICAgICAgICBwYXRjaFByb3BzKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXRjaEZsYWcgJiAyKSB7XG4gICAgICAgICAgaWYgKG9sZFByb3BzLmNsYXNzICE9PSBuZXdQcm9wcy5jbGFzcykge1xuICAgICAgICAgICAgaG9zdFBhdGNoUHJvcChlbCwgXCJjbGFzc1wiLCBudWxsLCBuZXdQcm9wcy5jbGFzcywgbmFtZXNwYWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGNoRmxhZyAmIDQpIHtcbiAgICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBcInN0eWxlXCIsIG9sZFByb3BzLnN0eWxlLCBuZXdQcm9wcy5zdHlsZSwgbmFtZXNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0Y2hGbGFnICYgOCkge1xuICAgICAgICAgIGNvbnN0IHByb3BzVG9VcGRhdGUgPSBuMi5keW5hbWljUHJvcHM7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1RvVXBkYXRlW2ldO1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IG9sZFByb3BzW2tleV07XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gbmV3UHJvcHNba2V5XTtcbiAgICAgICAgICAgIGlmIChuZXh0ICE9PSBwcmV2IHx8IGtleSA9PT0gXCJ2YWx1ZVwiKSB7XG4gICAgICAgICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIGtleSwgcHJldiwgbmV4dCwgbmFtZXNwYWNlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhdGNoRmxhZyAmIDEpIHtcbiAgICAgICAgaWYgKG4xLmNoaWxkcmVuICE9PSBuMi5jaGlsZHJlbikge1xuICAgICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChlbCwgbjIuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghb3B0aW1pemVkICYmIGR5bmFtaWNDaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICBwYXRjaFByb3BzKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKTtcbiAgICB9XG4gICAgaWYgKCh2bm9kZUhvb2sgPSBuZXdQcm9wcy5vblZub2RlVXBkYXRlZCkgfHwgZGlycykge1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdm5vZGVIb29rICYmIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudENvbXBvbmVudCwgbjIsIG4xKTtcbiAgICAgICAgZGlycyAmJiBpbnZva2VEaXJlY3RpdmVIb29rKG4yLCBuMSwgcGFyZW50Q29tcG9uZW50LCBcInVwZGF0ZWRcIik7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwYXRjaEJsb2NrQ2hpbGRyZW4gPSAob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuLCBmYWxsYmFja0NvbnRhaW5lciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvbGRWTm9kZSA9IG9sZENoaWxkcmVuW2ldO1xuICAgICAgY29uc3QgbmV3Vk5vZGUgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IChcbiAgICAgICAgLy8gb2xkVk5vZGUgbWF5IGJlIGFuIGVycm9yZWQgYXN5bmMgc2V0dXAoKSBjb21wb25lbnQgaW5zaWRlIFN1c3BlbnNlXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgbm90IGhhdmUgYSBtb3VudGVkIGVsZW1lbnRcbiAgICAgICAgb2xkVk5vZGUuZWwgJiYgLy8gLSBJbiB0aGUgY2FzZSBvZiBhIEZyYWdtZW50LCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGFjdHVhbCBwYXJlbnRcbiAgICAgICAgLy8gb2YgdGhlIEZyYWdtZW50IGl0c2VsZiBzbyBpdCBjYW4gbW92ZSBpdHMgY2hpbGRyZW4uXG4gICAgICAgIChvbGRWTm9kZS50eXBlID09PSBGcmFnbWVudCB8fCAvLyAtIEluIHRoZSBjYXNlIG9mIGRpZmZlcmVudCBub2RlcywgdGhlcmUgaXMgZ29pbmcgdG8gYmUgYSByZXBsYWNlbWVudFxuICAgICAgICAvLyB3aGljaCBhbHNvIHJlcXVpcmVzIHRoZSBjb3JyZWN0IHBhcmVudCBjb250YWluZXJcbiAgICAgICAgIWlzU2FtZVZOb2RlVHlwZShvbGRWTm9kZSwgbmV3Vk5vZGUpIHx8IC8vIC0gSW4gdGhlIGNhc2Ugb2YgYSBjb21wb25lbnQsIGl0IGNvdWxkIGNvbnRhaW4gYW55dGhpbmcuXG4gICAgICAgIG9sZFZOb2RlLnNoYXBlRmxhZyAmICg2IHwgNjQpKSA/IGhvc3RQYXJlbnROb2RlKG9sZFZOb2RlLmVsKSA6IChcbiAgICAgICAgICAvLyBJbiBvdGhlciBjYXNlcywgdGhlIHBhcmVudCBjb250YWluZXIgaXMgbm90IGFjdHVhbGx5IHVzZWQgc28gd2VcbiAgICAgICAgICAvLyBqdXN0IHBhc3MgdGhlIGJsb2NrIGVsZW1lbnQgaGVyZSB0byBhdm9pZCBhIERPTSBwYXJlbnROb2RlIGNhbGwuXG4gICAgICAgICAgZmFsbGJhY2tDb250YWluZXJcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHBhdGNoKFxuICAgICAgICBvbGRWTm9kZSxcbiAgICAgICAgbmV3Vk5vZGUsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwYXRjaFByb3BzID0gKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKSA9PiB7XG4gICAgaWYgKG9sZFByb3BzICE9PSBuZXdQcm9wcykge1xuICAgICAgaWYgKG9sZFByb3BzICE9PSBFTVBUWV9PQkopIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgICBpZiAoIWlzUmVzZXJ2ZWRQcm9wKGtleSkgJiYgIShrZXkgaW4gbmV3UHJvcHMpKSB7XG4gICAgICAgICAgICBob3N0UGF0Y2hQcm9wKFxuICAgICAgICAgICAgICBlbCxcbiAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICBvbGRQcm9wc1trZXldLFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgIHBhcmVudENvbXBvbmVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChpc1Jlc2VydmVkUHJvcChrZXkpKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgbmV4dCA9IG5ld1Byb3BzW2tleV07XG4gICAgICAgIGNvbnN0IHByZXYgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAobmV4dCAhPT0gcHJldiAmJiBrZXkgIT09IFwidmFsdWVcIikge1xuICAgICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIGtleSwgcHJldiwgbmV4dCwgbmFtZXNwYWNlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIG5ld1Byb3BzKSB7XG4gICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIFwidmFsdWVcIiwgb2xkUHJvcHMudmFsdWUsIG5ld1Byb3BzLnZhbHVlLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0ZyYWdtZW50ID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBjb25zdCBmcmFnbWVudFN0YXJ0QW5jaG9yID0gbjIuZWwgPSBuMSA/IG4xLmVsIDogaG9zdENyZWF0ZVRleHQoXCJcIik7XG4gICAgY29uc3QgZnJhZ21lbnRFbmRBbmNob3IgPSBuMi5hbmNob3IgPSBuMSA/IG4xLmFuY2hvciA6IGhvc3RDcmVhdGVUZXh0KFwiXCIpO1xuICAgIGxldCB7IHBhdGNoRmxhZywgZHluYW1pY0NoaWxkcmVuLCBzbG90U2NvcGVJZHM6IGZyYWdtZW50U2xvdFNjb3BlSWRzIH0gPSBuMjtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAvLyAjNTUyMyBkZXYgcm9vdCBmcmFnbWVudCBtYXkgaW5oZXJpdCBkaXJlY3RpdmVzXG4gICAgKGlzSG1yVXBkYXRpbmcgfHwgcGF0Y2hGbGFnICYgMjA0OCkpIHtcbiAgICAgIHBhdGNoRmxhZyA9IDA7XG4gICAgICBvcHRpbWl6ZWQgPSBmYWxzZTtcbiAgICAgIGR5bmFtaWNDaGlsZHJlbiA9IG51bGw7XG4gICAgfVxuICAgIGlmIChmcmFnbWVudFNsb3RTY29wZUlkcykge1xuICAgICAgc2xvdFNjb3BlSWRzID0gc2xvdFNjb3BlSWRzID8gc2xvdFNjb3BlSWRzLmNvbmNhdChmcmFnbWVudFNsb3RTY29wZUlkcykgOiBmcmFnbWVudFNsb3RTY29wZUlkcztcbiAgICB9XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIGhvc3RJbnNlcnQoZnJhZ21lbnRTdGFydEFuY2hvciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgaG9zdEluc2VydChmcmFnbWVudEVuZEFuY2hvciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgbW91bnRDaGlsZHJlbihcbiAgICAgICAgLy8gIzEwMDA3XG4gICAgICAgIC8vIHN1Y2ggZnJhZ21lbnQgbGlrZSBgPD48Lz5gIHdpbGwgYmUgY29tcGlsZWQgaW50b1xuICAgICAgICAvLyBhIGZyYWdtZW50IHdoaWNoIGRvZXNuJ3QgaGF2ZSBhIGNoaWxkcmVuLlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UgZmFsbGJhY2sgdG8gYW4gZW1wdHkgYXJyYXlcbiAgICAgICAgbjIuY2hpbGRyZW4gfHwgW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgZnJhZ21lbnRFbmRBbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXRjaEZsYWcgPiAwICYmIHBhdGNoRmxhZyAmIDY0ICYmIGR5bmFtaWNDaGlsZHJlbiAmJiAvLyAjMjcxNSB0aGUgcHJldmlvdXMgZnJhZ21lbnQgY291bGQndmUgYmVlbiBhIEJBSUxlZCBvbmUgYXMgYSByZXN1bHRcbiAgICAgIC8vIG9mIHJlbmRlclNsb3QoKSB3aXRoIG5vIHZhbGlkIGNoaWxkcmVuXG4gICAgICBuMS5keW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgcGF0Y2hCbG9ja0NoaWxkcmVuKFxuICAgICAgICAgIG4xLmR5bmFtaWNDaGlsZHJlbixcbiAgICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzXG4gICAgICAgICk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgdHJhdmVyc2VTdGF0aWNDaGlsZHJlbihuMSwgbjIpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIC8vICMyMDgwIGlmIHRoZSBzdGFibGUgZnJhZ21lbnQgaGFzIGEga2V5LCBpdCdzIGEgPHRlbXBsYXRlIHYtZm9yPiB0aGF0IG1heVxuICAgICAgICAgIC8vICBnZXQgbW92ZWQgYXJvdW5kLiBNYWtlIHN1cmUgYWxsIHJvb3QgbGV2ZWwgdm5vZGVzIGluaGVyaXQgZWwuXG4gICAgICAgICAgLy8gIzIxMzQgb3IgaWYgaXQncyBhIGNvbXBvbmVudCByb290LCBpdCBtYXkgYWxzbyBnZXQgbW92ZWQgYXJvdW5kXG4gICAgICAgICAgLy8gYXMgdGhlIGNvbXBvbmVudCBpcyBiZWluZyBtb3ZlZC5cbiAgICAgICAgICBuMi5rZXkgIT0gbnVsbCB8fCBwYXJlbnRDb21wb25lbnQgJiYgbjIgPT09IHBhcmVudENvbXBvbmVudC5zdWJUcmVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4oXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgLyogc2hhbGxvdyAqL1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGNoQ2hpbGRyZW4oXG4gICAgICAgICAgbjEsXG4gICAgICAgICAgbjIsXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIGZyYWdtZW50RW5kQW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0NvbXBvbmVudCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgbjIuc2xvdFNjb3BlSWRzID0gc2xvdFNjb3BlSWRzO1xuICAgIGlmIChuMSA9PSBudWxsKSB7XG4gICAgICBpZiAobjIuc2hhcGVGbGFnICYgNTEyKSB7XG4gICAgICAgIHBhcmVudENvbXBvbmVudC5jdHguYWN0aXZhdGUoXG4gICAgICAgICAgbjIsXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3VudENvbXBvbmVudChcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUNvbXBvbmVudChuMSwgbjIsIG9wdGltaXplZCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudENvbXBvbmVudCA9IChpbml0aWFsVk5vZGUsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gKGluaXRpYWxWTm9kZS5jb21wb25lbnQgPSBjcmVhdGVDb21wb25lbnRJbnN0YW5jZShcbiAgICAgIGluaXRpYWxWTm9kZSxcbiAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgIHBhcmVudFN1c3BlbnNlXG4gICAgKSk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaW5zdGFuY2UudHlwZS5fX2htcklkKSB7XG4gICAgICByZWdpc3RlckhNUihpbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBwdXNoV2FybmluZ0NvbnRleHQoaW5pdGlhbFZOb2RlKTtcbiAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYG1vdW50YCk7XG4gICAgfVxuICAgIGlmIChpc0tlZXBBbGl2ZShpbml0aWFsVk5vZGUpKSB7XG4gICAgICBpbnN0YW5jZS5jdHgucmVuZGVyZXIgPSBpbnRlcm5hbHM7XG4gICAgfVxuICAgIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYGluaXRgKTtcbiAgICAgIH1cbiAgICAgIHNldHVwQ29tcG9uZW50KGluc3RhbmNlLCBmYWxzZSwgb3B0aW1pemVkKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBpbml0YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5hc3luY0RlcCkge1xuICAgICAgcGFyZW50U3VzcGVuc2UgJiYgcGFyZW50U3VzcGVuc2UucmVnaXN0ZXJEZXAoaW5zdGFuY2UsIHNldHVwUmVuZGVyRWZmZWN0LCBvcHRpbWl6ZWQpO1xuICAgICAgaWYgKCFpbml0aWFsVk5vZGUuZWwpIHtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBpbnN0YW5jZS5zdWJUcmVlID0gY3JlYXRlVk5vZGUoQ29tbWVudCk7XG4gICAgICAgIHByb2Nlc3NDb21tZW50Tm9kZShudWxsLCBwbGFjZWhvbGRlciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXR1cFJlbmRlckVmZmVjdChcbiAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgIGluaXRpYWxWTm9kZSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHBvcFdhcm5pbmdDb250ZXh0KCk7XG4gICAgICBlbmRNZWFzdXJlKGluc3RhbmNlLCBgbW91bnRgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZUNvbXBvbmVudCA9IChuMSwgbjIsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbjIuY29tcG9uZW50ID0gbjEuY29tcG9uZW50O1xuICAgIGlmIChzaG91bGRVcGRhdGVDb21wb25lbnQobjEsIG4yLCBvcHRpbWl6ZWQpKSB7XG4gICAgICBpZiAoaW5zdGFuY2UuYXN5bmNEZXAgJiYgIWluc3RhbmNlLmFzeW5jUmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwdXNoV2FybmluZ0NvbnRleHQobjIpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudFByZVJlbmRlcihpbnN0YW5jZSwgbjIsIG9wdGltaXplZCk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgcG9wV2FybmluZ0NvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0YW5jZS5uZXh0ID0gbjI7XG4gICAgICAgIGludmFsaWRhdGVKb2IoaW5zdGFuY2UudXBkYXRlKTtcbiAgICAgICAgaW5zdGFuY2UuZWZmZWN0LmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgICBpbnN0YW5jZS52bm9kZSA9IG4yO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgc2V0dXBSZW5kZXJFZmZlY3QgPSAoaW5zdGFuY2UsIGluaXRpYWxWTm9kZSwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGNvbXBvbmVudFVwZGF0ZUZuID0gKCkgPT4ge1xuICAgICAgaWYgKCFpbnN0YW5jZS5pc01vdW50ZWQpIHtcbiAgICAgICAgbGV0IHZub2RlSG9vaztcbiAgICAgICAgY29uc3QgeyBlbCwgcHJvcHMgfSA9IGluaXRpYWxWTm9kZTtcbiAgICAgICAgY29uc3QgeyBibSwgbSwgcGFyZW50IH0gPSBpbnN0YW5jZTtcbiAgICAgICAgY29uc3QgaXNBc3luY1dyYXBwZXJWTm9kZSA9IGlzQXN5bmNXcmFwcGVyKGluaXRpYWxWTm9kZSk7XG4gICAgICAgIHRvZ2dsZVJlY3Vyc2UoaW5zdGFuY2UsIGZhbHNlKTtcbiAgICAgICAgaWYgKGJtKSB7XG4gICAgICAgICAgaW52b2tlQXJyYXlGbnMoYm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNBc3luY1dyYXBwZXJWTm9kZSAmJiAodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZUJlZm9yZU1vdW50KSkge1xuICAgICAgICAgIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudCwgaW5pdGlhbFZOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVSZWN1cnNlKGluc3RhbmNlLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsICYmIGh5ZHJhdGVOb2RlKSB7XG4gICAgICAgICAgY29uc3QgaHlkcmF0ZVN1YlRyZWUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGByZW5kZXJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlLnN1YlRyZWUgPSByZW5kZXJDb21wb25lbnRSb290KGluc3RhbmNlKTtcbiAgICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGByZW5kZXJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYGh5ZHJhdGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh5ZHJhdGVOb2RlKFxuICAgICAgICAgICAgICBlbCxcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc3ViVHJlZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgICAgZW5kTWVhc3VyZShpbnN0YW5jZSwgYGh5ZHJhdGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChpc0FzeW5jV3JhcHBlclZOb2RlKSB7XG4gICAgICAgICAgICBpbml0aWFsVk5vZGUudHlwZS5fX2FzeW5jTG9hZGVyKCkudGhlbihcbiAgICAgICAgICAgICAgLy8gbm90ZTogd2UgYXJlIG1vdmluZyB0aGUgcmVuZGVyIGNhbGwgaW50byBhbiBhc3luYyBjYWxsYmFjayxcbiAgICAgICAgICAgICAgLy8gd2hpY2ggbWVhbnMgaXQgd29uJ3QgdHJhY2sgZGVwZW5kZW5jaWVzIC0gYnV0IGl0J3Mgb2sgYmVjYXVzZVxuICAgICAgICAgICAgICAvLyBhIHNlcnZlci1yZW5kZXJlZCBhc3luYyB3cmFwcGVyIGlzIGFscmVhZHkgaW4gcmVzb2x2ZWQgc3RhdGVcbiAgICAgICAgICAgICAgLy8gYW5kIGl0IHdpbGwgbmV2ZXIgbmVlZCB0byBjaGFuZ2UuXG4gICAgICAgICAgICAgICgpID0+ICFpbnN0YW5jZS5pc1VubW91bnRlZCAmJiBoeWRyYXRlU3ViVHJlZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoeWRyYXRlU3ViVHJlZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgc3RhcnRNZWFzdXJlKGluc3RhbmNlLCBgcmVuZGVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN1YlRyZWUgPSBpbnN0YW5jZS5zdWJUcmVlID0gcmVuZGVyQ29tcG9uZW50Um9vdChpbnN0YW5jZSk7XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGByZW5kZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYHBhdGNoYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHN1YlRyZWUsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgZW5kTWVhc3VyZShpbnN0YW5jZSwgYHBhdGNoYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGluaXRpYWxWTm9kZS5lbCA9IHN1YlRyZWUuZWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QobSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNBc3luY1dyYXBwZXJWTm9kZSAmJiAodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZU1vdW50ZWQpKSB7XG4gICAgICAgICAgY29uc3Qgc2NvcGVkSW5pdGlhbFZOb2RlID0gaW5pdGlhbFZOb2RlO1xuICAgICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdChcbiAgICAgICAgICAgICgpID0+IGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudCwgc2NvcGVkSW5pdGlhbFZOb2RlKSxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5pdGlhbFZOb2RlLnNoYXBlRmxhZyAmIDI1NiB8fCBwYXJlbnQgJiYgaXNBc3luY1dyYXBwZXIocGFyZW50LnZub2RlKSAmJiBwYXJlbnQudm5vZGUuc2hhcGVGbGFnICYgMjU2KSB7XG4gICAgICAgICAgaW5zdGFuY2UuYSAmJiBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoaW5zdGFuY2UuYSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLmlzTW91bnRlZCA9IHRydWU7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgIGRldnRvb2xzQ29tcG9uZW50QWRkZWQoaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGluaXRpYWxWTm9kZSA9IGNvbnRhaW5lciA9IGFuY2hvciA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgeyBuZXh0LCBidSwgdSwgcGFyZW50LCB2bm9kZSB9ID0gaW5zdGFuY2U7XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBub25IeWRyYXRlZEFzeW5jUm9vdCA9IGxvY2F0ZU5vbkh5ZHJhdGVkQXN5bmNSb290KGluc3RhbmNlKTtcbiAgICAgICAgICBpZiAobm9uSHlkcmF0ZWRBc3luY1Jvb3QpIHtcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgIG5leHQuZWwgPSB2bm9kZS5lbDtcbiAgICAgICAgICAgICAgdXBkYXRlQ29tcG9uZW50UHJlUmVuZGVyKGluc3RhbmNlLCBuZXh0LCBvcHRpbWl6ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9uSHlkcmF0ZWRBc3luY1Jvb3QuYXN5bmNEZXAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaW5zdGFuY2UuaXNVbm1vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRVcGRhdGVGbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdpbk5leHQgPSBuZXh0O1xuICAgICAgICBsZXQgdm5vZGVIb29rO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHB1c2hXYXJuaW5nQ29udGV4dChuZXh0IHx8IGluc3RhbmNlLnZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVSZWN1cnNlKGluc3RhbmNlLCBmYWxzZSk7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgbmV4dC5lbCA9IHZub2RlLmVsO1xuICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudFByZVJlbmRlcihpbnN0YW5jZSwgbmV4dCwgb3B0aW1pemVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gdm5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1KSB7XG4gICAgICAgICAgaW52b2tlQXJyYXlGbnMoYnUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bm9kZUhvb2sgPSBuZXh0LnByb3BzICYmIG5leHQucHJvcHMub25Wbm9kZUJlZm9yZVVwZGF0ZSkge1xuICAgICAgICAgIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudCwgbmV4dCwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRvZ2dsZVJlY3Vyc2UoaW5zdGFuY2UsIHRydWUpO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYHJlbmRlcmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRUcmVlID0gcmVuZGVyQ29tcG9uZW50Um9vdChpbnN0YW5jZSk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgZW5kTWVhc3VyZShpbnN0YW5jZSwgYHJlbmRlcmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZUcmVlID0gaW5zdGFuY2Uuc3ViVHJlZTtcbiAgICAgICAgaW5zdGFuY2Uuc3ViVHJlZSA9IG5leHRUcmVlO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYHBhdGNoYCk7XG4gICAgICAgIH1cbiAgICAgICAgcGF0Y2goXG4gICAgICAgICAgcHJldlRyZWUsXG4gICAgICAgICAgbmV4dFRyZWUsXG4gICAgICAgICAgLy8gcGFyZW50IG1heSBoYXZlIGNoYW5nZWQgaWYgaXQncyBpbiBhIHRlbGVwb3J0XG4gICAgICAgICAgaG9zdFBhcmVudE5vZGUocHJldlRyZWUuZWwpLFxuICAgICAgICAgIC8vIGFuY2hvciBtYXkgaGF2ZSBjaGFuZ2VkIGlmIGl0J3MgaW4gYSBmcmFnbWVudFxuICAgICAgICAgIGdldE5leHRIb3N0Tm9kZShwcmV2VHJlZSksXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlXG4gICAgICAgICk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgZW5kTWVhc3VyZShpbnN0YW5jZSwgYHBhdGNoYCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5lbCA9IG5leHRUcmVlLmVsO1xuICAgICAgICBpZiAob3JpZ2luTmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgIHVwZGF0ZUhPQ0hvc3RFbChpbnN0YW5jZSwgbmV4dFRyZWUuZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1KSB7XG4gICAgICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KHUsIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodm5vZGVIb29rID0gbmV4dC5wcm9wcyAmJiBuZXh0LnByb3BzLm9uVm5vZGVVcGRhdGVkKSB7XG4gICAgICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KFxuICAgICAgICAgICAgKCkgPT4gaW52b2tlVk5vZGVIb29rKHZub2RlSG9vaywgcGFyZW50LCBuZXh0LCB2bm9kZSksXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgICAgZGV2dG9vbHNDb21wb25lbnRVcGRhdGVkKGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHBvcFdhcm5pbmdDb250ZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGVmZmVjdCA9IGluc3RhbmNlLmVmZmVjdCA9IG5ldyBSZWFjdGl2ZUVmZmVjdChcbiAgICAgIGNvbXBvbmVudFVwZGF0ZUZuLFxuICAgICAgTk9PUCxcbiAgICAgICgpID0+IHF1ZXVlSm9iKHVwZGF0ZSksXG4gICAgICBpbnN0YW5jZS5zY29wZVxuICAgICAgLy8gdHJhY2sgaXQgaW4gY29tcG9uZW50J3MgZWZmZWN0IHNjb3BlXG4gICAgKTtcbiAgICBjb25zdCB1cGRhdGUgPSBpbnN0YW5jZS51cGRhdGUgPSAoKSA9PiB7XG4gICAgICBpZiAoZWZmZWN0LmRpcnR5KSB7XG4gICAgICAgIGVmZmVjdC5ydW4oKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHVwZGF0ZS5pID0gaW5zdGFuY2U7XG4gICAgdXBkYXRlLmlkID0gaW5zdGFuY2UudWlkO1xuICAgIHRvZ2dsZVJlY3Vyc2UoaW5zdGFuY2UsIHRydWUpO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBlZmZlY3Qub25UcmFjayA9IGluc3RhbmNlLnJ0YyA/IChlKSA9PiBpbnZva2VBcnJheUZucyhpbnN0YW5jZS5ydGMsIGUpIDogdm9pZCAwO1xuICAgICAgZWZmZWN0Lm9uVHJpZ2dlciA9IGluc3RhbmNlLnJ0ZyA/IChlKSA9PiBpbnZva2VBcnJheUZucyhpbnN0YW5jZS5ydGcsIGUpIDogdm9pZCAwO1xuICAgIH1cbiAgICB1cGRhdGUoKTtcbiAgfTtcbiAgY29uc3QgdXBkYXRlQ29tcG9uZW50UHJlUmVuZGVyID0gKGluc3RhbmNlLCBuZXh0Vk5vZGUsIG9wdGltaXplZCkgPT4ge1xuICAgIG5leHRWTm9kZS5jb21wb25lbnQgPSBpbnN0YW5jZTtcbiAgICBjb25zdCBwcmV2UHJvcHMgPSBpbnN0YW5jZS52bm9kZS5wcm9wcztcbiAgICBpbnN0YW5jZS52bm9kZSA9IG5leHRWTm9kZTtcbiAgICBpbnN0YW5jZS5uZXh0ID0gbnVsbDtcbiAgICB1cGRhdGVQcm9wcyhpbnN0YW5jZSwgbmV4dFZOb2RlLnByb3BzLCBwcmV2UHJvcHMsIG9wdGltaXplZCk7XG4gICAgdXBkYXRlU2xvdHMoaW5zdGFuY2UsIG5leHRWTm9kZS5jaGlsZHJlbiwgb3B0aW1pemVkKTtcbiAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgZmx1c2hQcmVGbHVzaENicyhpbnN0YW5jZSk7XG4gICAgcmVzZXRUcmFja2luZygpO1xuICB9O1xuICBjb25zdCBwYXRjaENoaWxkcmVuID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IGMxID0gbjEgJiYgbjEuY2hpbGRyZW47XG4gICAgY29uc3QgcHJldlNoYXBlRmxhZyA9IG4xID8gbjEuc2hhcGVGbGFnIDogMDtcbiAgICBjb25zdCBjMiA9IG4yLmNoaWxkcmVuO1xuICAgIGNvbnN0IHsgcGF0Y2hGbGFnLCBzaGFwZUZsYWcgfSA9IG4yO1xuICAgIGlmIChwYXRjaEZsYWcgPiAwKSB7XG4gICAgICBpZiAocGF0Y2hGbGFnICYgMTI4KSB7XG4gICAgICAgIHBhdGNoS2V5ZWRDaGlsZHJlbihcbiAgICAgICAgICBjMSxcbiAgICAgICAgICBjMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHBhdGNoRmxhZyAmIDI1Nikge1xuICAgICAgICBwYXRjaFVua2V5ZWRDaGlsZHJlbihcbiAgICAgICAgICBjMSxcbiAgICAgICAgICBjMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGFwZUZsYWcgJiA4KSB7XG4gICAgICBpZiAocHJldlNoYXBlRmxhZyAmIDE2KSB7XG4gICAgICAgIHVubW91bnRDaGlsZHJlbihjMSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICB9XG4gICAgICBpZiAoYzIgIT09IGMxKSB7XG4gICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChjb250YWluZXIsIGMyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByZXZTaGFwZUZsYWcgJiAxNikge1xuICAgICAgICBpZiAoc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgICAgICBwYXRjaEtleWVkQ2hpbGRyZW4oXG4gICAgICAgICAgICBjMSxcbiAgICAgICAgICAgIGMyLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVubW91bnRDaGlsZHJlbihjMSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2U2hhcGVGbGFnICYgOCkge1xuICAgICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChjb250YWluZXIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgICAgIG1vdW50Q2hpbGRyZW4oXG4gICAgICAgICAgICBjMixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcGF0Y2hVbmtleWVkQ2hpbGRyZW4gPSAoYzEsIGMyLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGMxID0gYzEgfHwgRU1QVFlfQVJSO1xuICAgIGMyID0gYzIgfHwgRU1QVFlfQVJSO1xuICAgIGNvbnN0IG9sZExlbmd0aCA9IGMxLmxlbmd0aDtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBjMi5sZW5ndGg7XG4gICAgY29uc3QgY29tbW9uTGVuZ3RoID0gTWF0aC5taW4ob2xkTGVuZ3RoLCBuZXdMZW5ndGgpO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21tb25MZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbmV4dENoaWxkID0gYzJbaV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltpXSkgOiBub3JtYWxpemVWTm9kZShjMltpXSk7XG4gICAgICBwYXRjaChcbiAgICAgICAgYzFbaV0sXG4gICAgICAgIG5leHRDaGlsZCxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBudWxsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAob2xkTGVuZ3RoID4gbmV3TGVuZ3RoKSB7XG4gICAgICB1bm1vdW50Q2hpbGRyZW4oXG4gICAgICAgIGMxLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICB0cnVlLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgY29tbW9uTGVuZ3RoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3VudENoaWxkcmVuKFxuICAgICAgICBjMixcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgIGNvbW1vbkxlbmd0aFxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHBhdGNoS2V5ZWRDaGlsZHJlbiA9IChjMSwgYzIsIGNvbnRhaW5lciwgcGFyZW50QW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IGwyID0gYzIubGVuZ3RoO1xuICAgIGxldCBlMSA9IGMxLmxlbmd0aCAtIDE7XG4gICAgbGV0IGUyID0gbDIgLSAxO1xuICAgIHdoaWxlIChpIDw9IGUxICYmIGkgPD0gZTIpIHtcbiAgICAgIGNvbnN0IG4xID0gYzFbaV07XG4gICAgICBjb25zdCBuMiA9IGMyW2ldID0gb3B0aW1pemVkID8gY2xvbmVJZk1vdW50ZWQoYzJbaV0pIDogbm9ybWFsaXplVk5vZGUoYzJbaV0pO1xuICAgICAgaWYgKGlzU2FtZVZOb2RlVHlwZShuMSwgbjIpKSB7XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIG4xLFxuICAgICAgICAgIG4yLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHdoaWxlIChpIDw9IGUxICYmIGkgPD0gZTIpIHtcbiAgICAgIGNvbnN0IG4xID0gYzFbZTFdO1xuICAgICAgY29uc3QgbjIgPSBjMltlMl0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltlMl0pIDogbm9ybWFsaXplVk5vZGUoYzJbZTJdKTtcbiAgICAgIGlmIChpc1NhbWVWTm9kZVR5cGUobjEsIG4yKSkge1xuICAgICAgICBwYXRjaChcbiAgICAgICAgICBuMSxcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZTEtLTtcbiAgICAgIGUyLS07XG4gICAgfVxuICAgIGlmIChpID4gZTEpIHtcbiAgICAgIGlmIChpIDw9IGUyKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb3MgPSBlMiArIDE7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9IG5leHRQb3MgPCBsMiA/IGMyW25leHRQb3NdLmVsIDogcGFyZW50QW5jaG9yO1xuICAgICAgICB3aGlsZSAoaSA8PSBlMikge1xuICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGMyW2ldID0gb3B0aW1pemVkID8gY2xvbmVJZk1vdW50ZWQoYzJbaV0pIDogbm9ybWFsaXplVk5vZGUoYzJbaV0pLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaSA+IGUyKSB7XG4gICAgICB3aGlsZSAoaSA8PSBlMSkge1xuICAgICAgICB1bm1vdW50KGMxW2ldLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCB0cnVlKTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzMSA9IGk7XG4gICAgICBjb25zdCBzMiA9IGk7XG4gICAgICBjb25zdCBrZXlUb05ld0luZGV4TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICAgIGZvciAoaSA9IHMyOyBpIDw9IGUyOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV4dENoaWxkID0gYzJbaV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltpXSkgOiBub3JtYWxpemVWTm9kZShjMltpXSk7XG4gICAgICAgIGlmIChuZXh0Q2hpbGQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXlUb05ld0luZGV4TWFwLmhhcyhuZXh0Q2hpbGQua2V5KSkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgRHVwbGljYXRlIGtleXMgZm91bmQgZHVyaW5nIHVwZGF0ZTpgLFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShuZXh0Q2hpbGQua2V5KSxcbiAgICAgICAgICAgICAgYE1ha2Ugc3VyZSBrZXlzIGFyZSB1bmlxdWUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5VG9OZXdJbmRleE1hcC5zZXQobmV4dENoaWxkLmtleSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBqO1xuICAgICAgbGV0IHBhdGNoZWQgPSAwO1xuICAgICAgY29uc3QgdG9CZVBhdGNoZWQgPSBlMiAtIHMyICsgMTtcbiAgICAgIGxldCBtb3ZlZCA9IGZhbHNlO1xuICAgICAgbGV0IG1heE5ld0luZGV4U29GYXIgPSAwO1xuICAgICAgY29uc3QgbmV3SW5kZXhUb09sZEluZGV4TWFwID0gbmV3IEFycmF5KHRvQmVQYXRjaGVkKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0b0JlUGF0Y2hlZDsgaSsrKSBuZXdJbmRleFRvT2xkSW5kZXhNYXBbaV0gPSAwO1xuICAgICAgZm9yIChpID0gczE7IGkgPD0gZTE7IGkrKykge1xuICAgICAgICBjb25zdCBwcmV2Q2hpbGQgPSBjMVtpXTtcbiAgICAgICAgaWYgKHBhdGNoZWQgPj0gdG9CZVBhdGNoZWQpIHtcbiAgICAgICAgICB1bm1vdW50KHByZXZDaGlsZCwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgdHJ1ZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0luZGV4O1xuICAgICAgICBpZiAocHJldkNoaWxkLmtleSAhPSBudWxsKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBrZXlUb05ld0luZGV4TWFwLmdldChwcmV2Q2hpbGQua2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGogPSBzMjsgaiA8PSBlMjsgaisrKSB7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXhUb09sZEluZGV4TWFwW2ogLSBzMl0gPT09IDAgJiYgaXNTYW1lVk5vZGVUeXBlKHByZXZDaGlsZCwgYzJbal0pKSB7XG4gICAgICAgICAgICAgIG5ld0luZGV4ID0gajtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgdW5tb3VudChwcmV2Q2hpbGQsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0luZGV4VG9PbGRJbmRleE1hcFtuZXdJbmRleCAtIHMyXSA9IGkgKyAxO1xuICAgICAgICAgIGlmIChuZXdJbmRleCA+PSBtYXhOZXdJbmRleFNvRmFyKSB7XG4gICAgICAgICAgICBtYXhOZXdJbmRleFNvRmFyID0gbmV3SW5kZXg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICBwcmV2Q2hpbGQsXG4gICAgICAgICAgICBjMltuZXdJbmRleF0sXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHBhdGNoZWQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaW5jcmVhc2luZ05ld0luZGV4U2VxdWVuY2UgPSBtb3ZlZCA/IGdldFNlcXVlbmNlKG5ld0luZGV4VG9PbGRJbmRleE1hcCkgOiBFTVBUWV9BUlI7XG4gICAgICBqID0gaW5jcmVhc2luZ05ld0luZGV4U2VxdWVuY2UubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IHRvQmVQYXRjaGVkIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gczIgKyBpO1xuICAgICAgICBjb25zdCBuZXh0Q2hpbGQgPSBjMltuZXh0SW5kZXhdO1xuICAgICAgICBjb25zdCBhbmNob3IgPSBuZXh0SW5kZXggKyAxIDwgbDIgPyBjMltuZXh0SW5kZXggKyAxXS5lbCA6IHBhcmVudEFuY2hvcjtcbiAgICAgICAgaWYgKG5ld0luZGV4VG9PbGRJbmRleE1hcFtpXSA9PT0gMCkge1xuICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG5leHRDaGlsZCxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb3ZlZCkge1xuICAgICAgICAgIGlmIChqIDwgMCB8fCBpICE9PSBpbmNyZWFzaW5nTmV3SW5kZXhTZXF1ZW5jZVtqXSkge1xuICAgICAgICAgICAgbW92ZShuZXh0Q2hpbGQsIGNvbnRhaW5lciwgYW5jaG9yLCAyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgai0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgbW92ZSA9ICh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIG1vdmVUeXBlLCBwYXJlbnRTdXNwZW5zZSA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGVsLCB0eXBlLCB0cmFuc2l0aW9uLCBjaGlsZHJlbiwgc2hhcGVGbGFnIH0gPSB2bm9kZTtcbiAgICBpZiAoc2hhcGVGbGFnICYgNikge1xuICAgICAgbW92ZSh2bm9kZS5jb21wb25lbnQuc3ViVHJlZSwgY29udGFpbmVyLCBhbmNob3IsIG1vdmVUeXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHNoYXBlRmxhZyAmIDEyOCkge1xuICAgICAgdm5vZGUuc3VzcGVuc2UubW92ZShjb250YWluZXIsIGFuY2hvciwgbW92ZVR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc2hhcGVGbGFnICYgNjQpIHtcbiAgICAgIHR5cGUubW92ZSh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIGludGVybmFscyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBGcmFnbWVudCkge1xuICAgICAgaG9zdEluc2VydChlbCwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBtb3ZlKGNoaWxkcmVuW2ldLCBjb250YWluZXIsIGFuY2hvciwgbW92ZVR5cGUpO1xuICAgICAgfVxuICAgICAgaG9zdEluc2VydCh2bm9kZS5hbmNob3IsIGNvbnRhaW5lciwgYW5jaG9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFN0YXRpYykge1xuICAgICAgbW92ZVN0YXRpY05vZGUodm5vZGUsIGNvbnRhaW5lciwgYW5jaG9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmVlZFRyYW5zaXRpb24yID0gbW92ZVR5cGUgIT09IDIgJiYgc2hhcGVGbGFnICYgMSAmJiB0cmFuc2l0aW9uO1xuICAgIGlmIChuZWVkVHJhbnNpdGlvbjIpIHtcbiAgICAgIGlmIChtb3ZlVHlwZSA9PT0gMCkge1xuICAgICAgICB0cmFuc2l0aW9uLmJlZm9yZUVudGVyKGVsKTtcbiAgICAgICAgaG9zdEluc2VydChlbCwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4gdHJhbnNpdGlvbi5lbnRlcihlbCksIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgbGVhdmUsIGRlbGF5TGVhdmUsIGFmdGVyTGVhdmUgfSA9IHRyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHJlbW92ZTIgPSAoKSA9PiBob3N0SW5zZXJ0KGVsLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICAgIGNvbnN0IHBlcmZvcm1MZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICBsZWF2ZShlbCwgKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlMigpO1xuICAgICAgICAgICAgYWZ0ZXJMZWF2ZSAmJiBhZnRlckxlYXZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkZWxheUxlYXZlKSB7XG4gICAgICAgICAgZGVsYXlMZWF2ZShlbCwgcmVtb3ZlMiwgcGVyZm9ybUxlYXZlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZXJmb3JtTGVhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBob3N0SW5zZXJ0KGVsLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgfVxuICB9O1xuICBjb25zdCB1bm1vdW50ID0gKHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBkb1JlbW92ZSA9IGZhbHNlLCBvcHRpbWl6ZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHR5cGUsXG4gICAgICBwcm9wcyxcbiAgICAgIHJlZixcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZHluYW1pY0NoaWxkcmVuLFxuICAgICAgc2hhcGVGbGFnLFxuICAgICAgcGF0Y2hGbGFnLFxuICAgICAgZGlycyxcbiAgICAgIGNhY2hlSW5kZXhcbiAgICB9ID0gdm5vZGU7XG4gICAgaWYgKHBhdGNoRmxhZyA9PT0gLTIpIHtcbiAgICAgIG9wdGltaXplZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAocmVmICE9IG51bGwpIHtcbiAgICAgIHNldFJlZihyZWYsIG51bGwsIHBhcmVudFN1c3BlbnNlLCB2bm9kZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChjYWNoZUluZGV4ICE9IG51bGwpIHtcbiAgICAgIHBhcmVudENvbXBvbmVudC5yZW5kZXJDYWNoZVtjYWNoZUluZGV4XSA9IHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHNoYXBlRmxhZyAmIDI1Nikge1xuICAgICAgcGFyZW50Q29tcG9uZW50LmN0eC5kZWFjdGl2YXRlKHZub2RlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2hvdWxkSW52b2tlRGlycyA9IHNoYXBlRmxhZyAmIDEgJiYgZGlycztcbiAgICBjb25zdCBzaG91bGRJbnZva2VWbm9kZUhvb2sgPSAhaXNBc3luY1dyYXBwZXIodm5vZGUpO1xuICAgIGxldCB2bm9kZUhvb2s7XG4gICAgaWYgKHNob3VsZEludm9rZVZub2RlSG9vayAmJiAodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZUJlZm9yZVVubW91bnQpKSB7XG4gICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICB9XG4gICAgaWYgKHNoYXBlRmxhZyAmIDYpIHtcbiAgICAgIHVubW91bnRDb21wb25lbnQodm5vZGUuY29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgZG9SZW1vdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICAgIHZub2RlLnN1c3BlbnNlLnVubW91bnQocGFyZW50U3VzcGVuc2UsIGRvUmVtb3ZlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHNob3VsZEludm9rZURpcnMpIHtcbiAgICAgICAgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcImJlZm9yZVVubW91bnRcIik7XG4gICAgICB9XG4gICAgICBpZiAoc2hhcGVGbGFnICYgNjQpIHtcbiAgICAgICAgdm5vZGUudHlwZS5yZW1vdmUoXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIGludGVybmFscyxcbiAgICAgICAgICBkb1JlbW92ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChkeW5hbWljQ2hpbGRyZW4gJiYgLy8gIzUxNTRcbiAgICAgIC8vIHdoZW4gdi1vbmNlIGlzIHVzZWQgaW5zaWRlIGEgYmxvY2ssIHNldEJsb2NrVHJhY2tpbmcoLTEpIG1hcmtzIHRoZVxuICAgICAgLy8gcGFyZW50IGJsb2NrIHdpdGggaGFzT25jZTogdHJ1ZVxuICAgICAgLy8gc28gdGhhdCBpdCBkb2Vzbid0IHRha2UgdGhlIGZhc3QgcGF0aCBkdXJpbmcgdW5tb3VudCAtIG90aGVyd2lzZVxuICAgICAgLy8gY29tcG9uZW50cyBuZXN0ZWQgaW4gdi1vbmNlIGFyZSBuZXZlciB1bm1vdW50ZWQuXG4gICAgICAhZHluYW1pY0NoaWxkcmVuLmhhc09uY2UgJiYgLy8gIzExNTM6IGZhc3QgcGF0aCBzaG91bGQgbm90IGJlIHRha2VuIGZvciBub24tc3RhYmxlICh2LWZvcikgZnJhZ21lbnRzXG4gICAgICAodHlwZSAhPT0gRnJhZ21lbnQgfHwgcGF0Y2hGbGFnID4gMCAmJiBwYXRjaEZsYWcgJiA2NCkpIHtcbiAgICAgICAgdW5tb3VudENoaWxkcmVuKFxuICAgICAgICAgIGR5bmFtaWNDaGlsZHJlbixcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBGcmFnbWVudCAmJiBwYXRjaEZsYWcgJiAoMTI4IHwgMjU2KSB8fCAhb3B0aW1pemVkICYmIHNoYXBlRmxhZyAmIDE2KSB7XG4gICAgICAgIHVubW91bnRDaGlsZHJlbihjaGlsZHJlbiwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICB9XG4gICAgICBpZiAoZG9SZW1vdmUpIHtcbiAgICAgICAgcmVtb3ZlKHZub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNob3VsZEludm9rZVZub2RlSG9vayAmJiAodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZVVubW91bnRlZCkgfHwgc2hvdWxkSW52b2tlRGlycykge1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdm5vZGVIb29rICYmIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudENvbXBvbmVudCwgdm5vZGUpO1xuICAgICAgICBzaG91bGRJbnZva2VEaXJzICYmIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJ1bm1vdW50ZWRcIik7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCByZW1vdmUgPSAodm5vZGUpID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIGVsLCBhbmNob3IsIHRyYW5zaXRpb24gfSA9IHZub2RlO1xuICAgIGlmICh0eXBlID09PSBGcmFnbWVudCkge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgdm5vZGUucGF0Y2hGbGFnID4gMCAmJiB2bm9kZS5wYXRjaEZsYWcgJiAyMDQ4ICYmIHRyYW5zaXRpb24gJiYgIXRyYW5zaXRpb24ucGVyc2lzdGVkKSB7XG4gICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IENvbW1lbnQpIHtcbiAgICAgICAgICAgIGhvc3RSZW1vdmUoY2hpbGQuZWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmUoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVGcmFnbWVudChlbCwgYW5jaG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFN0YXRpYykge1xuICAgICAgcmVtb3ZlU3RhdGljTm9kZSh2bm9kZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBlcmZvcm1SZW1vdmUgPSAoKSA9PiB7XG4gICAgICBob3N0UmVtb3ZlKGVsKTtcbiAgICAgIGlmICh0cmFuc2l0aW9uICYmICF0cmFuc2l0aW9uLnBlcnNpc3RlZCAmJiB0cmFuc2l0aW9uLmFmdGVyTGVhdmUpIHtcbiAgICAgICAgdHJhbnNpdGlvbi5hZnRlckxlYXZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodm5vZGUuc2hhcGVGbGFnICYgMSAmJiB0cmFuc2l0aW9uICYmICF0cmFuc2l0aW9uLnBlcnNpc3RlZCkge1xuICAgICAgY29uc3QgeyBsZWF2ZSwgZGVsYXlMZWF2ZSB9ID0gdHJhbnNpdGlvbjtcbiAgICAgIGNvbnN0IHBlcmZvcm1MZWF2ZSA9ICgpID0+IGxlYXZlKGVsLCBwZXJmb3JtUmVtb3ZlKTtcbiAgICAgIGlmIChkZWxheUxlYXZlKSB7XG4gICAgICAgIGRlbGF5TGVhdmUodm5vZGUuZWwsIHBlcmZvcm1SZW1vdmUsIHBlcmZvcm1MZWF2ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZXJmb3JtTGVhdmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGVyZm9ybVJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgcmVtb3ZlRnJhZ21lbnQgPSAoY3VyLCBlbmQpID0+IHtcbiAgICBsZXQgbmV4dDtcbiAgICB3aGlsZSAoY3VyICE9PSBlbmQpIHtcbiAgICAgIG5leHQgPSBob3N0TmV4dFNpYmxpbmcoY3VyKTtcbiAgICAgIGhvc3RSZW1vdmUoY3VyKTtcbiAgICAgIGN1ciA9IG5leHQ7XG4gICAgfVxuICAgIGhvc3RSZW1vdmUoZW5kKTtcbiAgfTtcbiAgY29uc3QgdW5tb3VudENvbXBvbmVudCA9IChpbnN0YW5jZSwgcGFyZW50U3VzcGVuc2UsIGRvUmVtb3ZlKSA9PiB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaW5zdGFuY2UudHlwZS5fX2htcklkKSB7XG4gICAgICB1bnJlZ2lzdGVySE1SKGluc3RhbmNlKTtcbiAgICB9XG4gICAgY29uc3QgeyBidW0sIHNjb3BlLCB1cGRhdGUsIHN1YlRyZWUsIHVtLCBtLCBhIH0gPSBpbnN0YW5jZTtcbiAgICBpbnZhbGlkYXRlTW91bnQobSk7XG4gICAgaW52YWxpZGF0ZU1vdW50KGEpO1xuICAgIGlmIChidW0pIHtcbiAgICAgIGludm9rZUFycmF5Rm5zKGJ1bSk7XG4gICAgfVxuICAgIHNjb3BlLnN0b3AoKTtcbiAgICBpZiAodXBkYXRlKSB7XG4gICAgICB1cGRhdGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB1bm1vdW50KHN1YlRyZWUsIGluc3RhbmNlLCBwYXJlbnRTdXNwZW5zZSwgZG9SZW1vdmUpO1xuICAgIH1cbiAgICBpZiAodW0pIHtcbiAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCh1bSwgcGFyZW50U3VzcGVuc2UpO1xuICAgIH1cbiAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4ge1xuICAgICAgaW5zdGFuY2UuaXNVbm1vdW50ZWQgPSB0cnVlO1xuICAgIH0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICBpZiAocGFyZW50U3VzcGVuc2UgJiYgcGFyZW50U3VzcGVuc2UucGVuZGluZ0JyYW5jaCAmJiAhcGFyZW50U3VzcGVuc2UuaXNVbm1vdW50ZWQgJiYgaW5zdGFuY2UuYXN5bmNEZXAgJiYgIWluc3RhbmNlLmFzeW5jUmVzb2x2ZWQgJiYgaW5zdGFuY2Uuc3VzcGVuc2VJZCA9PT0gcGFyZW50U3VzcGVuc2UucGVuZGluZ0lkKSB7XG4gICAgICBwYXJlbnRTdXNwZW5zZS5kZXBzLS07XG4gICAgICBpZiAocGFyZW50U3VzcGVuc2UuZGVwcyA9PT0gMCkge1xuICAgICAgICBwYXJlbnRTdXNwZW5zZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgZGV2dG9vbHNDb21wb25lbnRSZW1vdmVkKGluc3RhbmNlKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVubW91bnRDaGlsZHJlbiA9IChjaGlsZHJlbiwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgZG9SZW1vdmUgPSBmYWxzZSwgb3B0aW1pemVkID0gZmFsc2UsIHN0YXJ0ID0gMCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB1bm1vdW50KGNoaWxkcmVuW2ldLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBkb1JlbW92ZSwgb3B0aW1pemVkKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdldE5leHRIb3N0Tm9kZSA9ICh2bm9kZSkgPT4ge1xuICAgIGlmICh2bm9kZS5zaGFwZUZsYWcgJiA2KSB7XG4gICAgICByZXR1cm4gZ2V0TmV4dEhvc3ROb2RlKHZub2RlLmNvbXBvbmVudC5zdWJUcmVlKTtcbiAgICB9XG4gICAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDEyOCkge1xuICAgICAgcmV0dXJuIHZub2RlLnN1c3BlbnNlLm5leHQoKTtcbiAgICB9XG4gICAgY29uc3QgZWwgPSBob3N0TmV4dFNpYmxpbmcodm5vZGUuYW5jaG9yIHx8IHZub2RlLmVsKTtcbiAgICBjb25zdCB0ZWxlcG9ydEVuZCA9IGVsICYmIGVsW1RlbGVwb3J0RW5kS2V5XTtcbiAgICByZXR1cm4gdGVsZXBvcnRFbmQgPyBob3N0TmV4dFNpYmxpbmcodGVsZXBvcnRFbmQpIDogZWw7XG4gIH07XG4gIGxldCBpc0ZsdXNoaW5nID0gZmFsc2U7XG4gIGNvbnN0IHJlbmRlciA9ICh2bm9kZSwgY29udGFpbmVyLCBuYW1lc3BhY2UpID0+IHtcbiAgICBpZiAodm5vZGUgPT0gbnVsbCkge1xuICAgICAgaWYgKGNvbnRhaW5lci5fdm5vZGUpIHtcbiAgICAgICAgdW5tb3VudChjb250YWluZXIuX3Zub2RlLCBudWxsLCBudWxsLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGF0Y2goXG4gICAgICAgIGNvbnRhaW5lci5fdm5vZGUgfHwgbnVsbCxcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbmFtZXNwYWNlXG4gICAgICApO1xuICAgIH1cbiAgICBjb250YWluZXIuX3Zub2RlID0gdm5vZGU7XG4gICAgaWYgKCFpc0ZsdXNoaW5nKSB7XG4gICAgICBpc0ZsdXNoaW5nID0gdHJ1ZTtcbiAgICAgIGZsdXNoUHJlRmx1c2hDYnMoKTtcbiAgICAgIGZsdXNoUG9zdEZsdXNoQ2JzKCk7XG4gICAgICBpc0ZsdXNoaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xuICBjb25zdCBpbnRlcm5hbHMgPSB7XG4gICAgcDogcGF0Y2gsXG4gICAgdW06IHVubW91bnQsXG4gICAgbTogbW92ZSxcbiAgICByOiByZW1vdmUsXG4gICAgbXQ6IG1vdW50Q29tcG9uZW50LFxuICAgIG1jOiBtb3VudENoaWxkcmVuLFxuICAgIHBjOiBwYXRjaENoaWxkcmVuLFxuICAgIHBiYzogcGF0Y2hCbG9ja0NoaWxkcmVuLFxuICAgIG46IGdldE5leHRIb3N0Tm9kZSxcbiAgICBvOiBvcHRpb25zXG4gIH07XG4gIGxldCBoeWRyYXRlO1xuICBsZXQgaHlkcmF0ZU5vZGU7XG4gIGlmIChjcmVhdGVIeWRyYXRpb25GbnMpIHtcbiAgICBbaHlkcmF0ZSwgaHlkcmF0ZU5vZGVdID0gY3JlYXRlSHlkcmF0aW9uRm5zKFxuICAgICAgaW50ZXJuYWxzXG4gICAgKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHJlbmRlcixcbiAgICBoeWRyYXRlLFxuICAgIGNyZWF0ZUFwcDogY3JlYXRlQXBwQVBJKHJlbmRlciwgaHlkcmF0ZSlcbiAgfTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVDaGlsZHJlbk5hbWVzcGFjZSh7IHR5cGUsIHByb3BzIH0sIGN1cnJlbnROYW1lc3BhY2UpIHtcbiAgcmV0dXJuIGN1cnJlbnROYW1lc3BhY2UgPT09IFwic3ZnXCIgJiYgdHlwZSA9PT0gXCJmb3JlaWduT2JqZWN0XCIgfHwgY3VycmVudE5hbWVzcGFjZSA9PT0gXCJtYXRobWxcIiAmJiB0eXBlID09PSBcImFubm90YXRpb24teG1sXCIgJiYgcHJvcHMgJiYgcHJvcHMuZW5jb2RpbmcgJiYgcHJvcHMuZW5jb2RpbmcuaW5jbHVkZXMoXCJodG1sXCIpID8gdm9pZCAwIDogY3VycmVudE5hbWVzcGFjZTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZVJlY3Vyc2UoeyBlZmZlY3QsIHVwZGF0ZSB9LCBhbGxvd2VkKSB7XG4gIGVmZmVjdC5hbGxvd1JlY3Vyc2UgPSB1cGRhdGUuYWxsb3dSZWN1cnNlID0gYWxsb3dlZDtcbn1cbmZ1bmN0aW9uIG5lZWRUcmFuc2l0aW9uKHBhcmVudFN1c3BlbnNlLCB0cmFuc2l0aW9uKSB7XG4gIHJldHVybiAoIXBhcmVudFN1c3BlbnNlIHx8IHBhcmVudFN1c3BlbnNlICYmICFwYXJlbnRTdXNwZW5zZS5wZW5kaW5nQnJhbmNoKSAmJiB0cmFuc2l0aW9uICYmICF0cmFuc2l0aW9uLnBlcnNpc3RlZDtcbn1cbmZ1bmN0aW9uIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4objEsIG4yLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgY29uc3QgY2gxID0gbjEuY2hpbGRyZW47XG4gIGNvbnN0IGNoMiA9IG4yLmNoaWxkcmVuO1xuICBpZiAoaXNBcnJheShjaDEpICYmIGlzQXJyYXkoY2gyKSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2gxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjMSA9IGNoMVtpXTtcbiAgICAgIGxldCBjMiA9IGNoMltpXTtcbiAgICAgIGlmIChjMi5zaGFwZUZsYWcgJiAxICYmICFjMi5keW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGMyLnBhdGNoRmxhZyA8PSAwIHx8IGMyLnBhdGNoRmxhZyA9PT0gMzIpIHtcbiAgICAgICAgICBjMiA9IGNoMltpXSA9IGNsb25lSWZNb3VudGVkKGNoMltpXSk7XG4gICAgICAgICAgYzIuZWwgPSBjMS5lbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNoYWxsb3cgJiYgYzIucGF0Y2hGbGFnICE9PSAtMilcbiAgICAgICAgICB0cmF2ZXJzZVN0YXRpY0NoaWxkcmVuKGMxLCBjMik7XG4gICAgICB9XG4gICAgICBpZiAoYzIudHlwZSA9PT0gVGV4dCkge1xuICAgICAgICBjMi5lbCA9IGMxLmVsO1xuICAgICAgfVxuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgYzIudHlwZSA9PT0gQ29tbWVudCAmJiAhYzIuZWwpIHtcbiAgICAgICAgYzIuZWwgPSBjMS5lbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFNlcXVlbmNlKGFycikge1xuICBjb25zdCBwID0gYXJyLnNsaWNlKCk7XG4gIGNvbnN0IHJlc3VsdCA9IFswXTtcbiAgbGV0IGksIGosIHUsIHYsIGM7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGFyckkgPSBhcnJbaV07XG4gICAgaWYgKGFyckkgIT09IDApIHtcbiAgICAgIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGFycltqXSA8IGFyckkpIHtcbiAgICAgICAgcFtpXSA9IGo7XG4gICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHUgPSAwO1xuICAgICAgdiA9IHJlc3VsdC5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKHUgPCB2KSB7XG4gICAgICAgIGMgPSB1ICsgdiA+PiAxO1xuICAgICAgICBpZiAoYXJyW3Jlc3VsdFtjXV0gPCBhcnJJKSB7XG4gICAgICAgICAgdSA9IGMgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHYgPSBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYXJySSA8IGFycltyZXN1bHRbdV1dKSB7XG4gICAgICAgIGlmICh1ID4gMCkge1xuICAgICAgICAgIHBbaV0gPSByZXN1bHRbdSAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFt1XSA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHUgPSByZXN1bHQubGVuZ3RoO1xuICB2ID0gcmVzdWx0W3UgLSAxXTtcbiAgd2hpbGUgKHUtLSA+IDApIHtcbiAgICByZXN1bHRbdV0gPSB2O1xuICAgIHYgPSBwW3ZdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBsb2NhdGVOb25IeWRyYXRlZEFzeW5jUm9vdChpbnN0YW5jZSkge1xuICBjb25zdCBzdWJDb21wb25lbnQgPSBpbnN0YW5jZS5zdWJUcmVlLmNvbXBvbmVudDtcbiAgaWYgKHN1YkNvbXBvbmVudCkge1xuICAgIGlmIChzdWJDb21wb25lbnQuYXN5bmNEZXAgJiYgIXN1YkNvbXBvbmVudC5hc3luY1Jlc29sdmVkKSB7XG4gICAgICByZXR1cm4gc3ViQ29tcG9uZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9jYXRlTm9uSHlkcmF0ZWRBc3luY1Jvb3Qoc3ViQ29tcG9uZW50KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGludmFsaWRhdGVNb3VudChob29rcykge1xuICBpZiAoaG9va3MpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSBob29rc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG5jb25zdCBzc3JDb250ZXh0S2V5ID0gU3ltYm9sLmZvcihcInYtc2N4XCIpO1xuY29uc3QgdXNlU1NSQ29udGV4dCA9ICgpID0+IHtcbiAge1xuICAgIGNvbnN0IGN0eCA9IGluamVjdChzc3JDb250ZXh0S2V5KTtcbiAgICBpZiAoIWN0eCkge1xuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3YXJuJDEoXG4gICAgICAgIGBTZXJ2ZXIgcmVuZGVyaW5nIGNvbnRleHQgbm90IHByb3ZpZGVkLiBNYWtlIHN1cmUgdG8gb25seSBjYWxsIHVzZVNTUkNvbnRleHQoKSBjb25kaXRpb25hbGx5IGluIHRoZSBzZXJ2ZXIgYnVpbGQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGN0eDtcbiAgfVxufTtcblxuZnVuY3Rpb24gd2F0Y2hFZmZlY3QoZWZmZWN0LCBvcHRpb25zKSB7XG4gIHJldHVybiBkb1dhdGNoKGVmZmVjdCwgbnVsbCwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiB3YXRjaFBvc3RFZmZlY3QoZWZmZWN0LCBvcHRpb25zKSB7XG4gIHJldHVybiBkb1dhdGNoKFxuICAgIGVmZmVjdCxcbiAgICBudWxsLFxuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBleHRlbmQoe30sIG9wdGlvbnMsIHsgZmx1c2g6IFwicG9zdFwiIH0pIDogeyBmbHVzaDogXCJwb3N0XCIgfVxuICApO1xufVxuZnVuY3Rpb24gd2F0Y2hTeW5jRWZmZWN0KGVmZmVjdCwgb3B0aW9ucykge1xuICByZXR1cm4gZG9XYXRjaChcbiAgICBlZmZlY3QsXG4gICAgbnVsbCxcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IGZsdXNoOiBcInN5bmNcIiB9KSA6IHsgZmx1c2g6IFwic3luY1wiIH1cbiAgKTtcbn1cbmNvbnN0IElOSVRJQUxfV0FUQ0hFUl9WQUxVRSA9IHt9O1xuZnVuY3Rpb24gd2F0Y2goc291cmNlLCBjYiwgb3B0aW9ucykge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaXNGdW5jdGlvbihjYikpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgXFxgd2F0Y2goZm4sIG9wdGlvbnM/KVxcYCBzaWduYXR1cmUgaGFzIGJlZW4gbW92ZWQgdG8gYSBzZXBhcmF0ZSBBUEkuIFVzZSBcXGB3YXRjaEVmZmVjdChmbiwgb3B0aW9ucz8pXFxgIGluc3RlYWQuIFxcYHdhdGNoXFxgIG5vdyBvbmx5IHN1cHBvcnRzIFxcYHdhdGNoKHNvdXJjZSwgY2IsIG9wdGlvbnM/KSBzaWduYXR1cmUuYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGRvV2F0Y2goc291cmNlLCBjYiwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBkb1dhdGNoKHNvdXJjZSwgY2IsIHtcbiAgaW1tZWRpYXRlLFxuICBkZWVwLFxuICBmbHVzaCxcbiAgb25jZSxcbiAgb25UcmFjayxcbiAgb25UcmlnZ2VyXG59ID0gRU1QVFlfT0JKKSB7XG4gIGlmIChjYiAmJiBvbmNlKSB7XG4gICAgY29uc3QgX2NiID0gY2I7XG4gICAgY2IgPSAoLi4uYXJncykgPT4ge1xuICAgICAgX2NiKC4uLmFyZ3MpO1xuICAgICAgdW53YXRjaCgpO1xuICAgIH07XG4gIH1cbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgZGVlcCAhPT0gdm9pZCAwICYmIHR5cGVvZiBkZWVwID09PSBcIm51bWJlclwiKSB7XG4gICAgd2FybiQxKFxuICAgICAgYHdhdGNoKCkgXCJkZWVwXCIgb3B0aW9uIHdpdGggbnVtYmVyIHZhbHVlIHdpbGwgYmUgdXNlZCBhcyB3YXRjaCBkZXB0aCBpbiBmdXR1cmUgdmVyc2lvbnMuIFBsZWFzZSB1c2UgYSBib29sZWFuIGluc3RlYWQgdG8gYXZvaWQgcG90ZW50aWFsIGJyZWFrYWdlLmBcbiAgICApO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFjYikge1xuICAgIGlmIChpbW1lZGlhdGUgIT09IHZvaWQgMCkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgd2F0Y2goKSBcImltbWVkaWF0ZVwiIG9wdGlvbiBpcyBvbmx5IHJlc3BlY3RlZCB3aGVuIHVzaW5nIHRoZSB3YXRjaChzb3VyY2UsIGNhbGxiYWNrLCBvcHRpb25zPykgc2lnbmF0dXJlLmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChkZWVwICE9PSB2b2lkIDApIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYHdhdGNoKCkgXCJkZWVwXCIgb3B0aW9uIGlzIG9ubHkgcmVzcGVjdGVkIHdoZW4gdXNpbmcgdGhlIHdhdGNoKHNvdXJjZSwgY2FsbGJhY2ssIG9wdGlvbnM/KSBzaWduYXR1cmUuYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9uY2UgIT09IHZvaWQgMCkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgd2F0Y2goKSBcIm9uY2VcIiBvcHRpb24gaXMgb25seSByZXNwZWN0ZWQgd2hlbiB1c2luZyB0aGUgd2F0Y2goc291cmNlLCBjYWxsYmFjaywgb3B0aW9ucz8pIHNpZ25hdHVyZS5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBjb25zdCB3YXJuSW52YWxpZFNvdXJjZSA9IChzKSA9PiB7XG4gICAgd2FybiQxKFxuICAgICAgYEludmFsaWQgd2F0Y2ggc291cmNlOiBgLFxuICAgICAgcyxcbiAgICAgIGBBIHdhdGNoIHNvdXJjZSBjYW4gb25seSBiZSBhIGdldHRlci9lZmZlY3QgZnVuY3Rpb24sIGEgcmVmLCBhIHJlYWN0aXZlIG9iamVjdCwgb3IgYW4gYXJyYXkgb2YgdGhlc2UgdHlwZXMuYFxuICAgICk7XG4gIH07XG4gIGNvbnN0IGluc3RhbmNlID0gY3VycmVudEluc3RhbmNlO1xuICBjb25zdCByZWFjdGl2ZUdldHRlciA9IChzb3VyY2UyKSA9PiBkZWVwID09PSB0cnVlID8gc291cmNlMiA6IChcbiAgICAvLyBmb3IgZGVlcDogZmFsc2UsIG9ubHkgdHJhdmVyc2Ugcm9vdC1sZXZlbCBwcm9wZXJ0aWVzXG4gICAgdHJhdmVyc2Uoc291cmNlMiwgZGVlcCA9PT0gZmFsc2UgPyAxIDogdm9pZCAwKVxuICApO1xuICBsZXQgZ2V0dGVyO1xuICBsZXQgZm9yY2VUcmlnZ2VyID0gZmFsc2U7XG4gIGxldCBpc011bHRpU291cmNlID0gZmFsc2U7XG4gIGlmIChpc1JlZihzb3VyY2UpKSB7XG4gICAgZ2V0dGVyID0gKCkgPT4gc291cmNlLnZhbHVlO1xuICAgIGZvcmNlVHJpZ2dlciA9IGlzU2hhbGxvdyhzb3VyY2UpO1xuICB9IGVsc2UgaWYgKGlzUmVhY3RpdmUoc291cmNlKSkge1xuICAgIGdldHRlciA9ICgpID0+IHJlYWN0aXZlR2V0dGVyKHNvdXJjZSk7XG4gICAgZm9yY2VUcmlnZ2VyID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHNvdXJjZSkpIHtcbiAgICBpc011bHRpU291cmNlID0gdHJ1ZTtcbiAgICBmb3JjZVRyaWdnZXIgPSBzb3VyY2Uuc29tZSgocykgPT4gaXNSZWFjdGl2ZShzKSB8fCBpc1NoYWxsb3cocykpO1xuICAgIGdldHRlciA9ICgpID0+IHNvdXJjZS5tYXAoKHMpID0+IHtcbiAgICAgIGlmIChpc1JlZihzKSkge1xuICAgICAgICByZXR1cm4gcy52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNSZWFjdGl2ZShzKSkge1xuICAgICAgICByZXR1cm4gcmVhY3RpdmVHZXR0ZXIocyk7XG4gICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ocykpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxXaXRoRXJyb3JIYW5kbGluZyhzLCBpbnN0YW5jZSwgMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm5JbnZhbGlkU291cmNlKHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc291cmNlKSkge1xuICAgIGlmIChjYikge1xuICAgICAgZ2V0dGVyID0gKCkgPT4gY2FsbFdpdGhFcnJvckhhbmRsaW5nKHNvdXJjZSwgaW5zdGFuY2UsIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXR0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjbGVhbnVwKSB7XG4gICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgMyxcbiAgICAgICAgICBbb25DbGVhbnVwXVxuICAgICAgICApO1xuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZ2V0dGVyID0gTk9PUDtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm5JbnZhbGlkU291cmNlKHNvdXJjZSk7XG4gIH1cbiAgaWYgKGNiICYmIGRlZXApIHtcbiAgICBjb25zdCBiYXNlR2V0dGVyID0gZ2V0dGVyO1xuICAgIGdldHRlciA9ICgpID0+IHRyYXZlcnNlKGJhc2VHZXR0ZXIoKSk7XG4gIH1cbiAgbGV0IGNsZWFudXA7XG4gIGxldCBvbkNsZWFudXAgPSAoZm4pID0+IHtcbiAgICBjbGVhbnVwID0gZWZmZWN0Lm9uU3RvcCA9ICgpID0+IHtcbiAgICAgIGNhbGxXaXRoRXJyb3JIYW5kbGluZyhmbiwgaW5zdGFuY2UsIDQpO1xuICAgICAgY2xlYW51cCA9IGVmZmVjdC5vblN0b3AgPSB2b2lkIDA7XG4gICAgfTtcbiAgfTtcbiAgbGV0IHNzckNsZWFudXA7XG4gIGlmIChpc0luU1NSQ29tcG9uZW50U2V0dXApIHtcbiAgICBvbkNsZWFudXAgPSBOT09QO1xuICAgIGlmICghY2IpIHtcbiAgICAgIGdldHRlcigpO1xuICAgIH0gZWxzZSBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhjYiwgaW5zdGFuY2UsIDMsIFtcbiAgICAgICAgZ2V0dGVyKCksXG4gICAgICAgIGlzTXVsdGlTb3VyY2UgPyBbXSA6IHZvaWQgMCxcbiAgICAgICAgb25DbGVhbnVwXG4gICAgICBdKTtcbiAgICB9XG4gICAgaWYgKGZsdXNoID09PSBcInN5bmNcIikge1xuICAgICAgY29uc3QgY3R4ID0gdXNlU1NSQ29udGV4dCgpO1xuICAgICAgc3NyQ2xlYW51cCA9IGN0eC5fX3dhdGNoZXJIYW5kbGVzIHx8IChjdHguX193YXRjaGVySGFuZGxlcyA9IFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5PT1A7XG4gICAgfVxuICB9XG4gIGxldCBvbGRWYWx1ZSA9IGlzTXVsdGlTb3VyY2UgPyBuZXcgQXJyYXkoc291cmNlLmxlbmd0aCkuZmlsbChJTklUSUFMX1dBVENIRVJfVkFMVUUpIDogSU5JVElBTF9XQVRDSEVSX1ZBTFVFO1xuICBjb25zdCBqb2IgPSAoKSA9PiB7XG4gICAgaWYgKCFlZmZlY3QuYWN0aXZlIHx8ICFlZmZlY3QuZGlydHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNiKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGVmZmVjdC5ydW4oKTtcbiAgICAgIGlmIChkZWVwIHx8IGZvcmNlVHJpZ2dlciB8fCAoaXNNdWx0aVNvdXJjZSA/IG5ld1ZhbHVlLnNvbWUoKHYsIGkpID0+IGhhc0NoYW5nZWQodiwgb2xkVmFsdWVbaV0pKSA6IGhhc0NoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSkgfHwgZmFsc2UpIHtcbiAgICAgICAgaWYgKGNsZWFudXApIHtcbiAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoY2IsIGluc3RhbmNlLCAzLCBbXG4gICAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgICAgLy8gcGFzcyB1bmRlZmluZWQgYXMgdGhlIG9sZCB2YWx1ZSB3aGVuIGl0J3MgY2hhbmdlZCBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICBvbGRWYWx1ZSA9PT0gSU5JVElBTF9XQVRDSEVSX1ZBTFVFID8gdm9pZCAwIDogaXNNdWx0aVNvdXJjZSAmJiBvbGRWYWx1ZVswXSA9PT0gSU5JVElBTF9XQVRDSEVSX1ZBTFVFID8gW10gOiBvbGRWYWx1ZSxcbiAgICAgICAgICBvbkNsZWFudXBcbiAgICAgICAgXSk7XG4gICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVmZmVjdC5ydW4oKTtcbiAgICB9XG4gIH07XG4gIGpvYi5hbGxvd1JlY3Vyc2UgPSAhIWNiO1xuICBsZXQgc2NoZWR1bGVyO1xuICBpZiAoZmx1c2ggPT09IFwic3luY1wiKSB7XG4gICAgc2NoZWR1bGVyID0gam9iO1xuICB9IGVsc2UgaWYgKGZsdXNoID09PSBcInBvc3RcIikge1xuICAgIHNjaGVkdWxlciA9ICgpID0+IHF1ZXVlUG9zdFJlbmRlckVmZmVjdChqb2IsIGluc3RhbmNlICYmIGluc3RhbmNlLnN1c3BlbnNlKTtcbiAgfSBlbHNlIHtcbiAgICBqb2IucHJlID0gdHJ1ZTtcbiAgICBpZiAoaW5zdGFuY2UpIGpvYi5pZCA9IGluc3RhbmNlLnVpZDtcbiAgICBzY2hlZHVsZXIgPSAoKSA9PiBxdWV1ZUpvYihqb2IpO1xuICB9XG4gIGNvbnN0IGVmZmVjdCA9IG5ldyBSZWFjdGl2ZUVmZmVjdChnZXR0ZXIsIE5PT1AsIHNjaGVkdWxlcik7XG4gIGNvbnN0IHNjb3BlID0gZ2V0Q3VycmVudFNjb3BlKCk7XG4gIGNvbnN0IHVud2F0Y2ggPSAoKSA9PiB7XG4gICAgZWZmZWN0LnN0b3AoKTtcbiAgICBpZiAoc2NvcGUpIHtcbiAgICAgIHJlbW92ZShzY29wZS5lZmZlY3RzLCBlZmZlY3QpO1xuICAgIH1cbiAgfTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBlZmZlY3Qub25UcmFjayA9IG9uVHJhY2s7XG4gICAgZWZmZWN0Lm9uVHJpZ2dlciA9IG9uVHJpZ2dlcjtcbiAgfVxuICBpZiAoY2IpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBqb2IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmFsdWUgPSBlZmZlY3QucnVuKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGZsdXNoID09PSBcInBvc3RcIikge1xuICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdChcbiAgICAgIGVmZmVjdC5ydW4uYmluZChlZmZlY3QpLFxuICAgICAgaW5zdGFuY2UgJiYgaW5zdGFuY2Uuc3VzcGVuc2VcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGVmZmVjdC5ydW4oKTtcbiAgfVxuICBpZiAoc3NyQ2xlYW51cCkgc3NyQ2xlYW51cC5wdXNoKHVud2F0Y2gpO1xuICByZXR1cm4gdW53YXRjaDtcbn1cbmZ1bmN0aW9uIGluc3RhbmNlV2F0Y2goc291cmNlLCB2YWx1ZSwgb3B0aW9ucykge1xuICBjb25zdCBwdWJsaWNUaGlzID0gdGhpcy5wcm94eTtcbiAgY29uc3QgZ2V0dGVyID0gaXNTdHJpbmcoc291cmNlKSA/IHNvdXJjZS5pbmNsdWRlcyhcIi5cIikgPyBjcmVhdGVQYXRoR2V0dGVyKHB1YmxpY1RoaXMsIHNvdXJjZSkgOiAoKSA9PiBwdWJsaWNUaGlzW3NvdXJjZV0gOiBzb3VyY2UuYmluZChwdWJsaWNUaGlzLCBwdWJsaWNUaGlzKTtcbiAgbGV0IGNiO1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBjYiA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGNiID0gdmFsdWUuaGFuZGxlcjtcbiAgICBvcHRpb25zID0gdmFsdWU7XG4gIH1cbiAgY29uc3QgcmVzZXQgPSBzZXRDdXJyZW50SW5zdGFuY2UodGhpcyk7XG4gIGNvbnN0IHJlcyA9IGRvV2F0Y2goZ2V0dGVyLCBjYi5iaW5kKHB1YmxpY1RoaXMpLCBvcHRpb25zKTtcbiAgcmVzZXQoKTtcbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGhHZXR0ZXIoY3R4LCBwYXRoKSB7XG4gIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGN1ciA9IGN0eDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aCAmJiBjdXI7IGkrKykge1xuICAgICAgY3VyID0gY3VyW3NlZ21lbnRzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cjtcbiAgfTtcbn1cbmZ1bmN0aW9uIHRyYXZlcnNlKHZhbHVlLCBkZXB0aCA9IEluZmluaXR5LCBzZWVuKSB7XG4gIGlmIChkZXB0aCA8PSAwIHx8ICFpc09iamVjdCh2YWx1ZSkgfHwgdmFsdWVbXCJfX3Zfc2tpcFwiXSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBzZWVuID0gc2VlbiB8fCAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBpZiAoc2Vlbi5oYXModmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHNlZW4uYWRkKHZhbHVlKTtcbiAgZGVwdGgtLTtcbiAgaWYgKGlzUmVmKHZhbHVlKSkge1xuICAgIHRyYXZlcnNlKHZhbHVlLnZhbHVlLCBkZXB0aCwgc2Vlbik7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmF2ZXJzZSh2YWx1ZVtpXSwgZGVwdGgsIHNlZW4pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1NldCh2YWx1ZSkgfHwgaXNNYXAodmFsdWUpKSB7XG4gICAgdmFsdWUuZm9yRWFjaCgodikgPT4ge1xuICAgICAgdHJhdmVyc2UodiwgZGVwdGgsIHNlZW4pO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIHRyYXZlcnNlKHZhbHVlW2tleV0sIGRlcHRoLCBzZWVuKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh2YWx1ZSkpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsIGtleSkpIHtcbiAgICAgICAgdHJhdmVyc2UodmFsdWVba2V5XSwgZGVwdGgsIHNlZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVzZU1vZGVsKHByb3BzLCBuYW1lLCBvcHRpb25zID0gRU1QVFlfT0JKKSB7XG4gIGNvbnN0IGkgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWkpIHtcbiAgICB3YXJuJDEoYHVzZU1vZGVsKCkgY2FsbGVkIHdpdGhvdXQgYWN0aXZlIGluc3RhbmNlLmApO1xuICAgIHJldHVybiByZWYoKTtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaS5wcm9wc09wdGlvbnNbMF1bbmFtZV0pIHtcbiAgICB3YXJuJDEoYHVzZU1vZGVsKCkgY2FsbGVkIHdpdGggcHJvcCBcIiR7bmFtZX1cIiB3aGljaCBpcyBub3QgZGVjbGFyZWQuYCk7XG4gICAgcmV0dXJuIHJlZigpO1xuICB9XG4gIGNvbnN0IGNhbWVsaXplZE5hbWUgPSBjYW1lbGl6ZShuYW1lKTtcbiAgY29uc3QgaHlwaGVuYXRlZE5hbWUgPSBoeXBoZW5hdGUobmFtZSk7XG4gIGNvbnN0IG1vZGlmaWVycyA9IGdldE1vZGVsTW9kaWZpZXJzKHByb3BzLCBuYW1lKTtcbiAgY29uc3QgcmVzID0gY3VzdG9tUmVmKCh0cmFjaywgdHJpZ2dlcikgPT4ge1xuICAgIGxldCBsb2NhbFZhbHVlO1xuICAgIGxldCBwcmV2U2V0VmFsdWUgPSBFTVBUWV9PQko7XG4gICAgbGV0IHByZXZFbWl0dGVkVmFsdWU7XG4gICAgd2F0Y2hTeW5jRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IHByb3BzW25hbWVdO1xuICAgICAgaWYgKGhhc0NoYW5nZWQobG9jYWxWYWx1ZSwgcHJvcFZhbHVlKSkge1xuICAgICAgICBsb2NhbFZhbHVlID0gcHJvcFZhbHVlO1xuICAgICAgICB0cmlnZ2VyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgdHJhY2soKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZ2V0ID8gb3B0aW9ucy5nZXQobG9jYWxWYWx1ZSkgOiBsb2NhbFZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBlbWl0dGVkVmFsdWUgPSBvcHRpb25zLnNldCA/IG9wdGlvbnMuc2V0KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICBpZiAoIWhhc0NoYW5nZWQoZW1pdHRlZFZhbHVlLCBsb2NhbFZhbHVlKSAmJiAhKHByZXZTZXRWYWx1ZSAhPT0gRU1QVFlfT0JKICYmIGhhc0NoYW5nZWQodmFsdWUsIHByZXZTZXRWYWx1ZSkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhd1Byb3BzID0gaS52bm9kZS5wcm9wcztcbiAgICAgICAgaWYgKCEocmF3UHJvcHMgJiYgLy8gY2hlY2sgaWYgcGFyZW50IGhhcyBwYXNzZWQgdi1tb2RlbFxuICAgICAgICAobmFtZSBpbiByYXdQcm9wcyB8fCBjYW1lbGl6ZWROYW1lIGluIHJhd1Byb3BzIHx8IGh5cGhlbmF0ZWROYW1lIGluIHJhd1Byb3BzKSAmJiAoYG9uVXBkYXRlOiR7bmFtZX1gIGluIHJhd1Byb3BzIHx8IGBvblVwZGF0ZToke2NhbWVsaXplZE5hbWV9YCBpbiByYXdQcm9wcyB8fCBgb25VcGRhdGU6JHtoeXBoZW5hdGVkTmFtZX1gIGluIHJhd1Byb3BzKSkpIHtcbiAgICAgICAgICBsb2NhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgdHJpZ2dlcigpO1xuICAgICAgICB9XG4gICAgICAgIGkuZW1pdChgdXBkYXRlOiR7bmFtZX1gLCBlbWl0dGVkVmFsdWUpO1xuICAgICAgICBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgZW1pdHRlZFZhbHVlKSAmJiBoYXNDaGFuZ2VkKHZhbHVlLCBwcmV2U2V0VmFsdWUpICYmICFoYXNDaGFuZ2VkKGVtaXR0ZWRWYWx1ZSwgcHJldkVtaXR0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICB0cmlnZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldlNldFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHByZXZFbWl0dGVkVmFsdWUgPSBlbWl0dGVkVmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIHJlc1tTeW1ib2wuaXRlcmF0b3JdID0gKCkgPT4ge1xuICAgIGxldCBpMiA9IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQoKSB7XG4gICAgICAgIGlmIChpMiA8IDIpIHtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogaTIrKyA/IG1vZGlmaWVycyB8fCBFTVBUWV9PQkogOiByZXMsIGRvbmU6IGZhbHNlIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cbmNvbnN0IGdldE1vZGVsTW9kaWZpZXJzID0gKHByb3BzLCBtb2RlbE5hbWUpID0+IHtcbiAgcmV0dXJuIG1vZGVsTmFtZSA9PT0gXCJtb2RlbFZhbHVlXCIgfHwgbW9kZWxOYW1lID09PSBcIm1vZGVsLXZhbHVlXCIgPyBwcm9wcy5tb2RlbE1vZGlmaWVycyA6IHByb3BzW2Ake21vZGVsTmFtZX1Nb2RpZmllcnNgXSB8fCBwcm9wc1tgJHtjYW1lbGl6ZShtb2RlbE5hbWUpfU1vZGlmaWVyc2BdIHx8IHByb3BzW2Ake2h5cGhlbmF0ZShtb2RlbE5hbWUpfU1vZGlmaWVyc2BdO1xufTtcblxuZnVuY3Rpb24gZW1pdChpbnN0YW5jZSwgZXZlbnQsIC4uLnJhd0FyZ3MpIHtcbiAgaWYgKGluc3RhbmNlLmlzVW5tb3VudGVkKSByZXR1cm47XG4gIGNvbnN0IHByb3BzID0gaW5zdGFuY2Uudm5vZGUucHJvcHMgfHwgRU1QVFlfT0JKO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVtaXRzT3B0aW9ucyxcbiAgICAgIHByb3BzT3B0aW9uczogW3Byb3BzT3B0aW9uc11cbiAgICB9ID0gaW5zdGFuY2U7XG4gICAgaWYgKGVtaXRzT3B0aW9ucykge1xuICAgICAgaWYgKCEoZXZlbnQgaW4gZW1pdHNPcHRpb25zKSAmJiB0cnVlKSB7XG4gICAgICAgIGlmICghcHJvcHNPcHRpb25zIHx8ICEodG9IYW5kbGVyS2V5KGNhbWVsaXplKGV2ZW50KSkgaW4gcHJvcHNPcHRpb25zKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBDb21wb25lbnQgZW1pdHRlZCBldmVudCBcIiR7ZXZlbnR9XCIgYnV0IGl0IGlzIG5laXRoZXIgZGVjbGFyZWQgaW4gdGhlIGVtaXRzIG9wdGlvbiBub3IgYXMgYW4gXCIke3RvSGFuZGxlcktleShjYW1lbGl6ZShldmVudCkpfVwiIHByb3AuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvciA9IGVtaXRzT3B0aW9uc1tldmVudF07XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdG9yKC4uLnJhd0FyZ3MpO1xuICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgSW52YWxpZCBldmVudCBhcmd1bWVudHM6IGV2ZW50IHZhbGlkYXRpb24gZmFpbGVkIGZvciBldmVudCBcIiR7ZXZlbnR9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGV0IGFyZ3MgPSByYXdBcmdzO1xuICBjb25zdCBpc01vZGVsTGlzdGVuZXIgPSBldmVudC5zdGFydHNXaXRoKFwidXBkYXRlOlwiKTtcbiAgY29uc3QgbW9kaWZpZXJzID0gaXNNb2RlbExpc3RlbmVyICYmIGdldE1vZGVsTW9kaWZpZXJzKHByb3BzLCBldmVudC5zbGljZSg3KSk7XG4gIGlmIChtb2RpZmllcnMpIHtcbiAgICBpZiAobW9kaWZpZXJzLnRyaW0pIHtcbiAgICAgIGFyZ3MgPSByYXdBcmdzLm1hcCgoYSkgPT4gaXNTdHJpbmcoYSkgPyBhLnRyaW0oKSA6IGEpO1xuICAgIH1cbiAgICBpZiAobW9kaWZpZXJzLm51bWJlcikge1xuICAgICAgYXJncyA9IHJhd0FyZ3MubWFwKGxvb3NlVG9OdW1iZXIpO1xuICAgIH1cbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICBkZXZ0b29sc0NvbXBvbmVudEVtaXQoaW5zdGFuY2UsIGV2ZW50LCBhcmdzKTtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGNvbnN0IGxvd2VyQ2FzZUV2ZW50ID0gZXZlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobG93ZXJDYXNlRXZlbnQgIT09IGV2ZW50ICYmIHByb3BzW3RvSGFuZGxlcktleShsb3dlckNhc2VFdmVudCldKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBFdmVudCBcIiR7bG93ZXJDYXNlRXZlbnR9XCIgaXMgZW1pdHRlZCBpbiBjb21wb25lbnQgJHtmb3JtYXRDb21wb25lbnROYW1lKFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIGluc3RhbmNlLnR5cGVcbiAgICAgICAgKX0gYnV0IHRoZSBoYW5kbGVyIGlzIHJlZ2lzdGVyZWQgZm9yIFwiJHtldmVudH1cIi4gTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgeW91IGNhbm5vdCB1c2Ugdi1vbiB0byBsaXN0ZW4gdG8gY2FtZWxDYXNlIGV2ZW50cyB3aGVuIHVzaW5nIGluLURPTSB0ZW1wbGF0ZXMuIFlvdSBzaG91bGQgcHJvYmFibHkgdXNlIFwiJHtoeXBoZW5hdGUoXG4gICAgICAgICAgZXZlbnRcbiAgICAgICAgKX1cIiBpbnN0ZWFkIG9mIFwiJHtldmVudH1cIi5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBsZXQgaGFuZGxlck5hbWU7XG4gIGxldCBoYW5kbGVyID0gcHJvcHNbaGFuZGxlck5hbWUgPSB0b0hhbmRsZXJLZXkoZXZlbnQpXSB8fCAvLyBhbHNvIHRyeSBjYW1lbENhc2UgZXZlbnQgaGFuZGxlciAoIzIyNDkpXG4gIHByb3BzW2hhbmRsZXJOYW1lID0gdG9IYW5kbGVyS2V5KGNhbWVsaXplKGV2ZW50KSldO1xuICBpZiAoIWhhbmRsZXIgJiYgaXNNb2RlbExpc3RlbmVyKSB7XG4gICAgaGFuZGxlciA9IHByb3BzW2hhbmRsZXJOYW1lID0gdG9IYW5kbGVyS2V5KGh5cGhlbmF0ZShldmVudCkpXTtcbiAgfVxuICBpZiAoaGFuZGxlcikge1xuICAgIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKFxuICAgICAgaGFuZGxlcixcbiAgICAgIGluc3RhbmNlLFxuICAgICAgNixcbiAgICAgIGFyZ3NcbiAgICApO1xuICB9XG4gIGNvbnN0IG9uY2VIYW5kbGVyID0gcHJvcHNbaGFuZGxlck5hbWUgKyBgT25jZWBdO1xuICBpZiAob25jZUhhbmRsZXIpIHtcbiAgICBpZiAoIWluc3RhbmNlLmVtaXR0ZWQpIHtcbiAgICAgIGluc3RhbmNlLmVtaXR0ZWQgPSB7fTtcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlLmVtaXR0ZWRbaGFuZGxlck5hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGluc3RhbmNlLmVtaXR0ZWRbaGFuZGxlck5hbWVdID0gdHJ1ZTtcbiAgICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhcbiAgICAgIG9uY2VIYW5kbGVyLFxuICAgICAgaW5zdGFuY2UsXG4gICAgICA2LFxuICAgICAgYXJnc1xuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUVtaXRzT3B0aW9ucyhjb21wLCBhcHBDb250ZXh0LCBhc01peGluID0gZmFsc2UpIHtcbiAgY29uc3QgY2FjaGUgPSBhcHBDb250ZXh0LmVtaXRzQ2FjaGU7XG4gIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChjb21wKTtcbiAgaWYgKGNhY2hlZCAhPT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuICBjb25zdCByYXcgPSBjb21wLmVtaXRzO1xuICBsZXQgbm9ybWFsaXplZCA9IHt9O1xuICBsZXQgaGFzRXh0ZW5kcyA9IGZhbHNlO1xuICBpZiAoX19WVUVfT1BUSU9OU19BUElfXyAmJiAhaXNGdW5jdGlvbihjb21wKSkge1xuICAgIGNvbnN0IGV4dGVuZEVtaXRzID0gKHJhdzIpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRXh0ZW5kID0gbm9ybWFsaXplRW1pdHNPcHRpb25zKHJhdzIsIGFwcENvbnRleHQsIHRydWUpO1xuICAgICAgaWYgKG5vcm1hbGl6ZWRGcm9tRXh0ZW5kKSB7XG4gICAgICAgIGhhc0V4dGVuZHMgPSB0cnVlO1xuICAgICAgICBleHRlbmQobm9ybWFsaXplZCwgbm9ybWFsaXplZEZyb21FeHRlbmQpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFhc01peGluICYmIGFwcENvbnRleHQubWl4aW5zLmxlbmd0aCkge1xuICAgICAgYXBwQ29udGV4dC5taXhpbnMuZm9yRWFjaChleHRlbmRFbWl0cyk7XG4gICAgfVxuICAgIGlmIChjb21wLmV4dGVuZHMpIHtcbiAgICAgIGV4dGVuZEVtaXRzKGNvbXAuZXh0ZW5kcyk7XG4gICAgfVxuICAgIGlmIChjb21wLm1peGlucykge1xuICAgICAgY29tcC5taXhpbnMuZm9yRWFjaChleHRlbmRFbWl0cyk7XG4gICAgfVxuICB9XG4gIGlmICghcmF3ICYmICFoYXNFeHRlbmRzKSB7XG4gICAgaWYgKGlzT2JqZWN0KGNvbXApKSB7XG4gICAgICBjYWNoZS5zZXQoY29tcCwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChpc0FycmF5KHJhdykpIHtcbiAgICByYXcuZm9yRWFjaCgoa2V5KSA9PiBub3JtYWxpemVkW2tleV0gPSBudWxsKTtcbiAgfSBlbHNlIHtcbiAgICBleHRlbmQobm9ybWFsaXplZCwgcmF3KTtcbiAgfVxuICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICBjYWNoZS5zZXQoY29tcCwgbm9ybWFsaXplZCk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59XG5mdW5jdGlvbiBpc0VtaXRMaXN0ZW5lcihvcHRpb25zLCBrZXkpIHtcbiAgaWYgKCFvcHRpb25zIHx8ICFpc09uKGtleSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAga2V5ID0ga2V5LnNsaWNlKDIpLnJlcGxhY2UoL09uY2UkLywgXCJcIik7XG4gIHJldHVybiBoYXNPd24ob3B0aW9ucywga2V5WzBdLnRvTG93ZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSkpIHx8IGhhc093bihvcHRpb25zLCBoeXBoZW5hdGUoa2V5KSkgfHwgaGFzT3duKG9wdGlvbnMsIGtleSk7XG59XG5cbmxldCBhY2Nlc3NlZEF0dHJzID0gZmFsc2U7XG5mdW5jdGlvbiBtYXJrQXR0cnNBY2Nlc3NlZCgpIHtcbiAgYWNjZXNzZWRBdHRycyA9IHRydWU7XG59XG5mdW5jdGlvbiByZW5kZXJDb21wb25lbnRSb290KGluc3RhbmNlKSB7XG4gIGNvbnN0IHtcbiAgICB0eXBlOiBDb21wb25lbnQsXG4gICAgdm5vZGUsXG4gICAgcHJveHksXG4gICAgd2l0aFByb3h5LFxuICAgIHByb3BzT3B0aW9uczogW3Byb3BzT3B0aW9uc10sXG4gICAgc2xvdHMsXG4gICAgYXR0cnMsXG4gICAgZW1pdCxcbiAgICByZW5kZXIsXG4gICAgcmVuZGVyQ2FjaGUsXG4gICAgcHJvcHMsXG4gICAgZGF0YSxcbiAgICBzZXR1cFN0YXRlLFxuICAgIGN0eCxcbiAgICBpbmhlcml0QXR0cnNcbiAgfSA9IGluc3RhbmNlO1xuICBjb25zdCBwcmV2ID0gc2V0Q3VycmVudFJlbmRlcmluZ0luc3RhbmNlKGluc3RhbmNlKTtcbiAgbGV0IHJlc3VsdDtcbiAgbGV0IGZhbGx0aHJvdWdoQXR0cnM7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgYWNjZXNzZWRBdHRycyA9IGZhbHNlO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDQpIHtcbiAgICAgIGNvbnN0IHByb3h5VG9Vc2UgPSB3aXRoUHJveHkgfHwgcHJveHk7XG4gICAgICBjb25zdCB0aGlzUHJveHkgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldHVwU3RhdGUuX19pc1NjcmlwdFNldHVwID8gbmV3IFByb3h5KHByb3h5VG9Vc2UsIHtcbiAgICAgICAgZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcikge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBQcm9wZXJ0eSAnJHtTdHJpbmcoXG4gICAgICAgICAgICAgIGtleVxuICAgICAgICAgICAgKX0nIHdhcyBhY2Nlc3NlZCB2aWEgJ3RoaXMnLiBBdm9pZCB1c2luZyAndGhpcycgaW4gdGVtcGxhdGVzLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpO1xuICAgICAgICB9XG4gICAgICB9KSA6IHByb3h5VG9Vc2U7XG4gICAgICByZXN1bHQgPSBub3JtYWxpemVWTm9kZShcbiAgICAgICAgcmVuZGVyLmNhbGwoXG4gICAgICAgICAgdGhpc1Byb3h5LFxuICAgICAgICAgIHByb3h5VG9Vc2UsXG4gICAgICAgICAgcmVuZGVyQ2FjaGUsXG4gICAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShwcm9wcykgOiBwcm9wcyxcbiAgICAgICAgICBzZXR1cFN0YXRlLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgY3R4XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBmYWxsdGhyb3VnaEF0dHJzID0gYXR0cnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlbmRlcjIgPSBDb21wb25lbnQ7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBhdHRycyA9PT0gcHJvcHMpIHtcbiAgICAgICAgbWFya0F0dHJzQWNjZXNzZWQoKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IG5vcm1hbGl6ZVZOb2RlKFxuICAgICAgICByZW5kZXIyLmxlbmd0aCA+IDEgPyByZW5kZXIyKFxuICAgICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzaGFsbG93UmVhZG9ubHkocHJvcHMpIDogcHJvcHMsXG4gICAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHtcbiAgICAgICAgICAgIGdldCBhdHRycygpIHtcbiAgICAgICAgICAgICAgbWFya0F0dHJzQWNjZXNzZWQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWxsb3dSZWFkb25seShhdHRycyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xvdHMsXG4gICAgICAgICAgICBlbWl0XG4gICAgICAgICAgfSA6IHsgYXR0cnMsIHNsb3RzLCBlbWl0IH1cbiAgICAgICAgKSA6IHJlbmRlcjIoXG4gICAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShwcm9wcykgOiBwcm9wcyxcbiAgICAgICAgICBudWxsXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBmYWxsdGhyb3VnaEF0dHJzID0gQ29tcG9uZW50LnByb3BzID8gYXR0cnMgOiBnZXRGdW5jdGlvbmFsRmFsbHRocm91Z2goYXR0cnMpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYmxvY2tTdGFjay5sZW5ndGggPSAwO1xuICAgIGhhbmRsZUVycm9yKGVyciwgaW5zdGFuY2UsIDEpO1xuICAgIHJlc3VsdCA9IGNyZWF0ZVZOb2RlKENvbW1lbnQpO1xuICB9XG4gIGxldCByb290ID0gcmVzdWx0O1xuICBsZXQgc2V0Um9vdCA9IHZvaWQgMDtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgcmVzdWx0LnBhdGNoRmxhZyA+IDAgJiYgcmVzdWx0LnBhdGNoRmxhZyAmIDIwNDgpIHtcbiAgICBbcm9vdCwgc2V0Um9vdF0gPSBnZXRDaGlsZFJvb3QocmVzdWx0KTtcbiAgfVxuICBpZiAoZmFsbHRocm91Z2hBdHRycyAmJiBpbmhlcml0QXR0cnMgIT09IGZhbHNlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGZhbGx0aHJvdWdoQXR0cnMpO1xuICAgIGNvbnN0IHsgc2hhcGVGbGFnIH0gPSByb290O1xuICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgaWYgKHNoYXBlRmxhZyAmICgxIHwgNikpIHtcbiAgICAgICAgaWYgKHByb3BzT3B0aW9ucyAmJiBrZXlzLnNvbWUoaXNNb2RlbExpc3RlbmVyKSkge1xuICAgICAgICAgIGZhbGx0aHJvdWdoQXR0cnMgPSBmaWx0ZXJNb2RlbExpc3RlbmVycyhcbiAgICAgICAgICAgIGZhbGx0aHJvdWdoQXR0cnMsXG4gICAgICAgICAgICBwcm9wc09wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJvb3QgPSBjbG9uZVZOb2RlKHJvb3QsIGZhbGx0aHJvdWdoQXR0cnMsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhYWNjZXNzZWRBdHRycyAmJiByb290LnR5cGUgIT09IENvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgYWxsQXR0cnMgPSBPYmplY3Qua2V5cyhhdHRycyk7XG4gICAgICAgIGNvbnN0IGV2ZW50QXR0cnMgPSBbXTtcbiAgICAgICAgY29uc3QgZXh0cmFBdHRycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFsbEF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGFsbEF0dHJzW2ldO1xuICAgICAgICAgIGlmIChpc09uKGtleSkpIHtcbiAgICAgICAgICAgIGlmICghaXNNb2RlbExpc3RlbmVyKGtleSkpIHtcbiAgICAgICAgICAgICAgZXZlbnRBdHRycy5wdXNoKGtleVsyXS50b0xvd2VyQ2FzZSgpICsga2V5LnNsaWNlKDMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0cmFBdHRycy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChleHRyYUF0dHJzLmxlbmd0aCkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBFeHRyYW5lb3VzIG5vbi1wcm9wcyBhdHRyaWJ1dGVzICgke2V4dHJhQXR0cnMuam9pbihcIiwgXCIpfSkgd2VyZSBwYXNzZWQgdG8gY29tcG9uZW50IGJ1dCBjb3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBpbmhlcml0ZWQgYmVjYXVzZSBjb21wb25lbnQgcmVuZGVycyBmcmFnbWVudCBvciB0ZXh0IHJvb3Qgbm9kZXMuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50QXR0cnMubGVuZ3RoKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYEV4dHJhbmVvdXMgbm9uLWVtaXRzIGV2ZW50IGxpc3RlbmVycyAoJHtldmVudEF0dHJzLmpvaW4oXCIsIFwiKX0pIHdlcmUgcGFzc2VkIHRvIGNvbXBvbmVudCBidXQgY291bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgaW5oZXJpdGVkIGJlY2F1c2UgY29tcG9uZW50IHJlbmRlcnMgZnJhZ21lbnQgb3IgdGV4dCByb290IG5vZGVzLiBJZiB0aGUgbGlzdGVuZXIgaXMgaW50ZW5kZWQgdG8gYmUgYSBjb21wb25lbnQgY3VzdG9tIGV2ZW50IGxpc3RlbmVyIG9ubHksIGRlY2xhcmUgaXQgdXNpbmcgdGhlIFwiZW1pdHNcIiBvcHRpb24uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZub2RlLmRpcnMpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaXNFbGVtZW50Um9vdChyb290KSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgUnVudGltZSBkaXJlY3RpdmUgdXNlZCBvbiBjb21wb25lbnQgd2l0aCBub24tZWxlbWVudCByb290IG5vZGUuIFRoZSBkaXJlY3RpdmVzIHdpbGwgbm90IGZ1bmN0aW9uIGFzIGludGVuZGVkLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHJvb3QgPSBjbG9uZVZOb2RlKHJvb3QsIG51bGwsIGZhbHNlLCB0cnVlKTtcbiAgICByb290LmRpcnMgPSByb290LmRpcnMgPyByb290LmRpcnMuY29uY2F0KHZub2RlLmRpcnMpIDogdm5vZGUuZGlycztcbiAgfVxuICBpZiAodm5vZGUudHJhbnNpdGlvbikge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFpc0VsZW1lbnRSb290KHJvb3QpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBDb21wb25lbnQgaW5zaWRlIDxUcmFuc2l0aW9uPiByZW5kZXJzIG5vbi1lbGVtZW50IHJvb3Qgbm9kZSB0aGF0IGNhbm5vdCBiZSBhbmltYXRlZC5gXG4gICAgICApO1xuICAgIH1cbiAgICByb290LnRyYW5zaXRpb24gPSB2bm9kZS50cmFuc2l0aW9uO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldFJvb3QpIHtcbiAgICBzZXRSb290KHJvb3QpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHJvb3Q7XG4gIH1cbiAgc2V0Q3VycmVudFJlbmRlcmluZ0luc3RhbmNlKHByZXYpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuY29uc3QgZ2V0Q2hpbGRSb290ID0gKHZub2RlKSA9PiB7XG4gIGNvbnN0IHJhd0NoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gIGNvbnN0IGR5bmFtaWNDaGlsZHJlbiA9IHZub2RlLmR5bmFtaWNDaGlsZHJlbjtcbiAgY29uc3QgY2hpbGRSb290ID0gZmlsdGVyU2luZ2xlUm9vdChyYXdDaGlsZHJlbiwgZmFsc2UpO1xuICBpZiAoIWNoaWxkUm9vdCkge1xuICAgIHJldHVybiBbdm5vZGUsIHZvaWQgMF07XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBjaGlsZFJvb3QucGF0Y2hGbGFnID4gMCAmJiBjaGlsZFJvb3QucGF0Y2hGbGFnICYgMjA0OCkge1xuICAgIHJldHVybiBnZXRDaGlsZFJvb3QoY2hpbGRSb290KTtcbiAgfVxuICBjb25zdCBpbmRleCA9IHJhd0NoaWxkcmVuLmluZGV4T2YoY2hpbGRSb290KTtcbiAgY29uc3QgZHluYW1pY0luZGV4ID0gZHluYW1pY0NoaWxkcmVuID8gZHluYW1pY0NoaWxkcmVuLmluZGV4T2YoY2hpbGRSb290KSA6IC0xO1xuICBjb25zdCBzZXRSb290ID0gKHVwZGF0ZWRSb290KSA9PiB7XG4gICAgcmF3Q2hpbGRyZW5baW5kZXhdID0gdXBkYXRlZFJvb3Q7XG4gICAgaWYgKGR5bmFtaWNDaGlsZHJlbikge1xuICAgICAgaWYgKGR5bmFtaWNJbmRleCA+IC0xKSB7XG4gICAgICAgIGR5bmFtaWNDaGlsZHJlbltkeW5hbWljSW5kZXhdID0gdXBkYXRlZFJvb3Q7XG4gICAgICB9IGVsc2UgaWYgKHVwZGF0ZWRSb290LnBhdGNoRmxhZyA+IDApIHtcbiAgICAgICAgdm5vZGUuZHluYW1pY0NoaWxkcmVuID0gWy4uLmR5bmFtaWNDaGlsZHJlbiwgdXBkYXRlZFJvb3RdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFtub3JtYWxpemVWTm9kZShjaGlsZFJvb3QpLCBzZXRSb290XTtcbn07XG5mdW5jdGlvbiBmaWx0ZXJTaW5nbGVSb290KGNoaWxkcmVuLCByZWN1cnNlID0gdHJ1ZSkge1xuICBsZXQgc2luZ2xlUm9vdDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgaWYgKGlzVk5vZGUoY2hpbGQpKSB7XG4gICAgICBpZiAoY2hpbGQudHlwZSAhPT0gQ29tbWVudCB8fCBjaGlsZC5jaGlsZHJlbiA9PT0gXCJ2LWlmXCIpIHtcbiAgICAgICAgaWYgKHNpbmdsZVJvb3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2luZ2xlUm9vdCA9IGNoaWxkO1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHJlY3Vyc2UgJiYgc2luZ2xlUm9vdC5wYXRjaEZsYWcgPiAwICYmIHNpbmdsZVJvb3QucGF0Y2hGbGFnICYgMjA0OCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclNpbmdsZVJvb3Qoc2luZ2xlUm9vdC5jaGlsZHJlbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNpbmdsZVJvb3Q7XG59XG5jb25zdCBnZXRGdW5jdGlvbmFsRmFsbHRocm91Z2ggPSAoYXR0cnMpID0+IHtcbiAgbGV0IHJlcztcbiAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICBpZiAoa2V5ID09PSBcImNsYXNzXCIgfHwga2V5ID09PSBcInN0eWxlXCIgfHwgaXNPbihrZXkpKSB7XG4gICAgICAocmVzIHx8IChyZXMgPSB7fSkpW2tleV0gPSBhdHRyc1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbmNvbnN0IGZpbHRlck1vZGVsTGlzdGVuZXJzID0gKGF0dHJzLCBwcm9wcykgPT4ge1xuICBjb25zdCByZXMgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICBpZiAoIWlzTW9kZWxMaXN0ZW5lcihrZXkpIHx8ICEoa2V5LnNsaWNlKDkpIGluIHByb3BzKSkge1xuICAgICAgcmVzW2tleV0gPSBhdHRyc1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbmNvbnN0IGlzRWxlbWVudFJvb3QgPSAodm5vZGUpID0+IHtcbiAgcmV0dXJuIHZub2RlLnNoYXBlRmxhZyAmICg2IHwgMSkgfHwgdm5vZGUudHlwZSA9PT0gQ29tbWVudDtcbn07XG5mdW5jdGlvbiBzaG91bGRVcGRhdGVDb21wb25lbnQocHJldlZOb2RlLCBuZXh0Vk5vZGUsIG9wdGltaXplZCkge1xuICBjb25zdCB7IHByb3BzOiBwcmV2UHJvcHMsIGNoaWxkcmVuOiBwcmV2Q2hpbGRyZW4sIGNvbXBvbmVudCB9ID0gcHJldlZOb2RlO1xuICBjb25zdCB7IHByb3BzOiBuZXh0UHJvcHMsIGNoaWxkcmVuOiBuZXh0Q2hpbGRyZW4sIHBhdGNoRmxhZyB9ID0gbmV4dFZOb2RlO1xuICBjb25zdCBlbWl0cyA9IGNvbXBvbmVudC5lbWl0c09wdGlvbnM7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIChwcmV2Q2hpbGRyZW4gfHwgbmV4dENoaWxkcmVuKSAmJiBpc0htclVwZGF0aW5nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKG5leHRWTm9kZS5kaXJzIHx8IG5leHRWTm9kZS50cmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKG9wdGltaXplZCAmJiBwYXRjaEZsYWcgPj0gMCkge1xuICAgIGlmIChwYXRjaEZsYWcgJiAxMDI0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhdGNoRmxhZyAmIDE2KSB7XG4gICAgICBpZiAoIXByZXZQcm9wcykge1xuICAgICAgICByZXR1cm4gISFuZXh0UHJvcHM7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzUHJvcHNDaGFuZ2VkKHByZXZQcm9wcywgbmV4dFByb3BzLCBlbWl0cyk7XG4gICAgfSBlbHNlIGlmIChwYXRjaEZsYWcgJiA4KSB7XG4gICAgICBjb25zdCBkeW5hbWljUHJvcHMgPSBuZXh0Vk5vZGUuZHluYW1pY1Byb3BzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkeW5hbWljUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZHluYW1pY1Byb3BzW2ldO1xuICAgICAgICBpZiAobmV4dFByb3BzW2tleV0gIT09IHByZXZQcm9wc1trZXldICYmICFpc0VtaXRMaXN0ZW5lcihlbWl0cywga2V5KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChwcmV2Q2hpbGRyZW4gfHwgbmV4dENoaWxkcmVuKSB7XG4gICAgICBpZiAoIW5leHRDaGlsZHJlbiB8fCAhbmV4dENoaWxkcmVuLiRzdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMgPT09IG5leHRQcm9wcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXByZXZQcm9wcykge1xuICAgICAgcmV0dXJuICEhbmV4dFByb3BzO1xuICAgIH1cbiAgICBpZiAoIW5leHRQcm9wcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBoYXNQcm9wc0NoYW5nZWQocHJldlByb3BzLCBuZXh0UHJvcHMsIGVtaXRzKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBoYXNQcm9wc0NoYW5nZWQocHJldlByb3BzLCBuZXh0UHJvcHMsIGVtaXRzT3B0aW9ucykge1xuICBjb25zdCBuZXh0S2V5cyA9IE9iamVjdC5rZXlzKG5leHRQcm9wcyk7XG4gIGlmIChuZXh0S2V5cy5sZW5ndGggIT09IE9iamVjdC5rZXlzKHByZXZQcm9wcykubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IG5leHRLZXlzW2ldO1xuICAgIGlmIChuZXh0UHJvcHNba2V5XSAhPT0gcHJldlByb3BzW2tleV0gJiYgIWlzRW1pdExpc3RlbmVyKGVtaXRzT3B0aW9ucywga2V5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUhPQ0hvc3RFbCh7IHZub2RlLCBwYXJlbnQgfSwgZWwpIHtcbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGNvbnN0IHJvb3QgPSBwYXJlbnQuc3ViVHJlZTtcbiAgICBpZiAocm9vdC5zdXNwZW5zZSAmJiByb290LnN1c3BlbnNlLmFjdGl2ZUJyYW5jaCA9PT0gdm5vZGUpIHtcbiAgICAgIHJvb3QuZWwgPSB2bm9kZS5lbDtcbiAgICB9XG4gICAgaWYgKHJvb3QgPT09IHZub2RlKSB7XG4gICAgICAodm5vZGUgPSBwYXJlbnQudm5vZGUpLmVsID0gZWw7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaXNTdXNwZW5zZSA9ICh0eXBlKSA9PiB0eXBlLl9faXNTdXNwZW5zZTtcbmxldCBzdXNwZW5zZUlkID0gMDtcbmNvbnN0IFN1c3BlbnNlSW1wbCA9IHtcbiAgbmFtZTogXCJTdXNwZW5zZVwiLFxuICAvLyBJbiBvcmRlciB0byBtYWtlIFN1c3BlbnNlIHRyZWUtc2hha2FibGUsIHdlIG5lZWQgdG8gYXZvaWQgaW1wb3J0aW5nIGl0XG4gIC8vIGRpcmVjdGx5IGluIHRoZSByZW5kZXJlci4gVGhlIHJlbmRlcmVyIGNoZWNrcyBmb3IgdGhlIF9faXNTdXNwZW5zZSBmbGFnXG4gIC8vIG9uIGEgdm5vZGUncyB0eXBlIGFuZCBjYWxscyB0aGUgYHByb2Nlc3NgIG1ldGhvZCwgcGFzc2luZyBpbiByZW5kZXJlclxuICAvLyBpbnRlcm5hbHMuXG4gIF9faXNTdXNwZW5zZTogdHJ1ZSxcbiAgcHJvY2VzcyhuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkLCByZW5kZXJlckludGVybmFscykge1xuICAgIGlmIChuMSA9PSBudWxsKSB7XG4gICAgICBtb3VudFN1c3BlbnNlKFxuICAgICAgICBuMixcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgIHJlbmRlcmVySW50ZXJuYWxzXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyZW50U3VzcGVuc2UgJiYgcGFyZW50U3VzcGVuc2UuZGVwcyA+IDAgJiYgIW4xLnN1c3BlbnNlLmlzSW5GYWxsYmFjaykge1xuICAgICAgICBuMi5zdXNwZW5zZSA9IG4xLnN1c3BlbnNlO1xuICAgICAgICBuMi5zdXNwZW5zZS52bm9kZSA9IG4yO1xuICAgICAgICBuMi5lbCA9IG4xLmVsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYXRjaFN1c3BlbnNlKFxuICAgICAgICBuMSxcbiAgICAgICAgbjIsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgIHJlbmRlcmVySW50ZXJuYWxzXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgaHlkcmF0ZTogaHlkcmF0ZVN1c3BlbnNlLFxuICBub3JtYWxpemU6IG5vcm1hbGl6ZVN1c3BlbnNlQ2hpbGRyZW5cbn07XG5jb25zdCBTdXNwZW5zZSA9IFN1c3BlbnNlSW1wbCA7XG5mdW5jdGlvbiB0cmlnZ2VyRXZlbnQodm5vZGUsIG5hbWUpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lciA9IHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzW25hbWVdO1xuICBpZiAoaXNGdW5jdGlvbihldmVudExpc3RlbmVyKSkge1xuICAgIGV2ZW50TGlzdGVuZXIoKTtcbiAgfVxufVxuZnVuY3Rpb24gbW91bnRTdXNwZW5zZSh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQsIHJlbmRlcmVySW50ZXJuYWxzKSB7XG4gIGNvbnN0IHtcbiAgICBwOiBwYXRjaCxcbiAgICBvOiB7IGNyZWF0ZUVsZW1lbnQgfVxuICB9ID0gcmVuZGVyZXJJbnRlcm5hbHM7XG4gIGNvbnN0IGhpZGRlbkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN1c3BlbnNlID0gdm5vZGUuc3VzcGVuc2UgPSBjcmVhdGVTdXNwZW5zZUJvdW5kYXJ5KFxuICAgIHZub2RlLFxuICAgIHBhcmVudFN1c3BlbnNlLFxuICAgIHBhcmVudENvbXBvbmVudCxcbiAgICBjb250YWluZXIsXG4gICAgaGlkZGVuQ29udGFpbmVyLFxuICAgIGFuY2hvcixcbiAgICBuYW1lc3BhY2UsXG4gICAgc2xvdFNjb3BlSWRzLFxuICAgIG9wdGltaXplZCxcbiAgICByZW5kZXJlckludGVybmFsc1xuICApO1xuICBwYXRjaChcbiAgICBudWxsLFxuICAgIHN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggPSB2bm9kZS5zc0NvbnRlbnQsXG4gICAgaGlkZGVuQ29udGFpbmVyLFxuICAgIG51bGwsXG4gICAgcGFyZW50Q29tcG9uZW50LFxuICAgIHN1c3BlbnNlLFxuICAgIG5hbWVzcGFjZSxcbiAgICBzbG90U2NvcGVJZHNcbiAgKTtcbiAgaWYgKHN1c3BlbnNlLmRlcHMgPiAwKSB7XG4gICAgdHJpZ2dlckV2ZW50KHZub2RlLCBcIm9uUGVuZGluZ1wiKTtcbiAgICB0cmlnZ2VyRXZlbnQodm5vZGUsIFwib25GYWxsYmFja1wiKTtcbiAgICBwYXRjaChcbiAgICAgIG51bGwsXG4gICAgICB2bm9kZS5zc0ZhbGxiYWNrLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgYW5jaG9yLFxuICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgbnVsbCxcbiAgICAgIC8vIGZhbGxiYWNrIHRyZWUgd2lsbCBub3QgaGF2ZSBzdXNwZW5zZSBjb250ZXh0XG4gICAgICBuYW1lc3BhY2UsXG4gICAgICBzbG90U2NvcGVJZHNcbiAgICApO1xuICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgdm5vZGUuc3NGYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgc3VzcGVuc2UucmVzb2x2ZShmYWxzZSwgdHJ1ZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHBhdGNoU3VzcGVuc2UobjEsIG4yLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkLCB7IHA6IHBhdGNoLCB1bTogdW5tb3VudCwgbzogeyBjcmVhdGVFbGVtZW50IH0gfSkge1xuICBjb25zdCBzdXNwZW5zZSA9IG4yLnN1c3BlbnNlID0gbjEuc3VzcGVuc2U7XG4gIHN1c3BlbnNlLnZub2RlID0gbjI7XG4gIG4yLmVsID0gbjEuZWw7XG4gIGNvbnN0IG5ld0JyYW5jaCA9IG4yLnNzQ29udGVudDtcbiAgY29uc3QgbmV3RmFsbGJhY2sgPSBuMi5zc0ZhbGxiYWNrO1xuICBjb25zdCB7IGFjdGl2ZUJyYW5jaCwgcGVuZGluZ0JyYW5jaCwgaXNJbkZhbGxiYWNrLCBpc0h5ZHJhdGluZyB9ID0gc3VzcGVuc2U7XG4gIGlmIChwZW5kaW5nQnJhbmNoKSB7XG4gICAgc3VzcGVuc2UucGVuZGluZ0JyYW5jaCA9IG5ld0JyYW5jaDtcbiAgICBpZiAoaXNTYW1lVk5vZGVUeXBlKG5ld0JyYW5jaCwgcGVuZGluZ0JyYW5jaCkpIHtcbiAgICAgIHBhdGNoKFxuICAgICAgICBwZW5kaW5nQnJhbmNoLFxuICAgICAgICBuZXdCcmFuY2gsXG4gICAgICAgIHN1c3BlbnNlLmhpZGRlbkNvbnRhaW5lcixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBzdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICAgIGlmIChzdXNwZW5zZS5kZXBzIDw9IDApIHtcbiAgICAgICAgc3VzcGVuc2UucmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIGlmIChpc0luRmFsbGJhY2spIHtcbiAgICAgICAgaWYgKCFpc0h5ZHJhdGluZykge1xuICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgYWN0aXZlQnJhbmNoLFxuICAgICAgICAgICAgbmV3RmFsbGJhY2ssXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgLy8gZmFsbGJhY2sgdHJlZSB3aWxsIG5vdCBoYXZlIHN1c3BlbnNlIGNvbnRleHRcbiAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0QWN0aXZlQnJhbmNoKHN1c3BlbnNlLCBuZXdGYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3VzcGVuc2UucGVuZGluZ0lkID0gc3VzcGVuc2VJZCsrO1xuICAgICAgaWYgKGlzSHlkcmF0aW5nKSB7XG4gICAgICAgIHN1c3BlbnNlLmlzSHlkcmF0aW5nID0gZmFsc2U7XG4gICAgICAgIHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCA9IHBlbmRpbmdCcmFuY2g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bm1vdW50KHBlbmRpbmdCcmFuY2gsIHBhcmVudENvbXBvbmVudCwgc3VzcGVuc2UpO1xuICAgICAgfVxuICAgICAgc3VzcGVuc2UuZGVwcyA9IDA7XG4gICAgICBzdXNwZW5zZS5lZmZlY3RzLmxlbmd0aCA9IDA7XG4gICAgICBzdXNwZW5zZS5oaWRkZW5Db250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKGlzSW5GYWxsYmFjaykge1xuICAgICAgICBwYXRjaChcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIG5ld0JyYW5jaCxcbiAgICAgICAgICBzdXNwZW5zZS5oaWRkZW5Db250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHN1c3BlbnNlLmRlcHMgPD0gMCkge1xuICAgICAgICAgIHN1c3BlbnNlLnJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRjaChcbiAgICAgICAgICAgIGFjdGl2ZUJyYW5jaCxcbiAgICAgICAgICAgIG5ld0ZhbGxiYWNrLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRyZWUgd2lsbCBub3QgaGF2ZSBzdXNwZW5zZSBjb250ZXh0XG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgbmV3RmFsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2ZUJyYW5jaCAmJiBpc1NhbWVWTm9kZVR5cGUobmV3QnJhbmNoLCBhY3RpdmVCcmFuY2gpKSB7XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIGFjdGl2ZUJyYW5jaCxcbiAgICAgICAgICBuZXdCcmFuY2gsXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgICAgc3VzcGVuc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgbmV3QnJhbmNoLFxuICAgICAgICAgIHN1c3BlbnNlLmhpZGRlbkNvbnRhaW5lcixcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBzdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICBpZiAoc3VzcGVuc2UuZGVwcyA8PSAwKSB7XG4gICAgICAgICAgc3VzcGVuc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChhY3RpdmVCcmFuY2ggJiYgaXNTYW1lVk5vZGVUeXBlKG5ld0JyYW5jaCwgYWN0aXZlQnJhbmNoKSkge1xuICAgICAgcGF0Y2goXG4gICAgICAgIGFjdGl2ZUJyYW5jaCxcbiAgICAgICAgbmV3QnJhbmNoLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIGFuY2hvcixcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBzdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgbmV3QnJhbmNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJpZ2dlckV2ZW50KG4yLCBcIm9uUGVuZGluZ1wiKTtcbiAgICAgIHN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggPSBuZXdCcmFuY2g7XG4gICAgICBpZiAobmV3QnJhbmNoLnNoYXBlRmxhZyAmIDUxMikge1xuICAgICAgICBzdXNwZW5zZS5wZW5kaW5nSWQgPSBuZXdCcmFuY2guY29tcG9uZW50LnN1c3BlbnNlSWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXNwZW5zZS5wZW5kaW5nSWQgPSBzdXNwZW5zZUlkKys7XG4gICAgICB9XG4gICAgICBwYXRjaChcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbmV3QnJhbmNoLFxuICAgICAgICBzdXNwZW5zZS5oaWRkZW5Db250YWluZXIsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgICBpZiAoc3VzcGVuc2UuZGVwcyA8PSAwKSB7XG4gICAgICAgIHN1c3BlbnNlLnJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgdGltZW91dCwgcGVuZGluZ0lkIH0gPSBzdXNwZW5zZTtcbiAgICAgICAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3VzcGVuc2UucGVuZGluZ0lkID09PSBwZW5kaW5nSWQpIHtcbiAgICAgICAgICAgICAgc3VzcGVuc2UuZmFsbGJhY2sobmV3RmFsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbWVvdXQgPT09IDApIHtcbiAgICAgICAgICBzdXNwZW5zZS5mYWxsYmFjayhuZXdGYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmxldCBoYXNXYXJuZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIGNyZWF0ZVN1c3BlbnNlQm91bmRhcnkodm5vZGUsIHBhcmVudFN1c3BlbnNlLCBwYXJlbnRDb21wb25lbnQsIGNvbnRhaW5lciwgaGlkZGVuQ29udGFpbmVyLCBhbmNob3IsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQsIHJlbmRlcmVySW50ZXJuYWxzLCBpc0h5ZHJhdGluZyA9IGZhbHNlKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHRydWUgJiYgIWhhc1dhcm5lZCkge1xuICAgIGhhc1dhcm5lZCA9IHRydWU7XG4gICAgY29uc29sZVtjb25zb2xlLmluZm8gPyBcImluZm9cIiA6IFwibG9nXCJdKFxuICAgICAgYDxTdXNwZW5zZT4gaXMgYW4gZXhwZXJpbWVudGFsIGZlYXR1cmUgYW5kIGl0cyBBUEkgd2lsbCBsaWtlbHkgY2hhbmdlLmBcbiAgICApO1xuICB9XG4gIGNvbnN0IHtcbiAgICBwOiBwYXRjaCxcbiAgICBtOiBtb3ZlLFxuICAgIHVtOiB1bm1vdW50LFxuICAgIG46IG5leHQsXG4gICAgbzogeyBwYXJlbnROb2RlLCByZW1vdmUgfVxuICB9ID0gcmVuZGVyZXJJbnRlcm5hbHM7XG4gIGxldCBwYXJlbnRTdXNwZW5zZUlkO1xuICBjb25zdCBpc1N1c3BlbnNpYmxlID0gaXNWTm9kZVN1c3BlbnNpYmxlKHZub2RlKTtcbiAgaWYgKGlzU3VzcGVuc2libGUpIHtcbiAgICBpZiAocGFyZW50U3VzcGVuc2UgJiYgcGFyZW50U3VzcGVuc2UucGVuZGluZ0JyYW5jaCkge1xuICAgICAgcGFyZW50U3VzcGVuc2VJZCA9IHBhcmVudFN1c3BlbnNlLnBlbmRpbmdJZDtcbiAgICAgIHBhcmVudFN1c3BlbnNlLmRlcHMrKztcbiAgICB9XG4gIH1cbiAgY29uc3QgdGltZW91dCA9IHZub2RlLnByb3BzID8gdG9OdW1iZXIodm5vZGUucHJvcHMudGltZW91dCkgOiB2b2lkIDA7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgYXNzZXJ0TnVtYmVyKHRpbWVvdXQsIGBTdXNwZW5zZSB0aW1lb3V0YCk7XG4gIH1cbiAgY29uc3QgaW5pdGlhbEFuY2hvciA9IGFuY2hvcjtcbiAgY29uc3Qgc3VzcGVuc2UgPSB7XG4gICAgdm5vZGUsXG4gICAgcGFyZW50OiBwYXJlbnRTdXNwZW5zZSxcbiAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgbmFtZXNwYWNlLFxuICAgIGNvbnRhaW5lcixcbiAgICBoaWRkZW5Db250YWluZXIsXG4gICAgZGVwczogMCxcbiAgICBwZW5kaW5nSWQ6IHN1c3BlbnNlSWQrKyxcbiAgICB0aW1lb3V0OiB0eXBlb2YgdGltZW91dCA9PT0gXCJudW1iZXJcIiA/IHRpbWVvdXQgOiAtMSxcbiAgICBhY3RpdmVCcmFuY2g6IG51bGwsXG4gICAgcGVuZGluZ0JyYW5jaDogbnVsbCxcbiAgICBpc0luRmFsbGJhY2s6ICFpc0h5ZHJhdGluZyxcbiAgICBpc0h5ZHJhdGluZyxcbiAgICBpc1VubW91bnRlZDogZmFsc2UsXG4gICAgZWZmZWN0czogW10sXG4gICAgcmVzb2x2ZShyZXN1bWUgPSBmYWxzZSwgc3luYyA9IGZhbHNlKSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICBpZiAoIXJlc3VtZSAmJiAhc3VzcGVuc2UucGVuZGluZ0JyYW5jaCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBzdXNwZW5zZS5yZXNvbHZlKCkgaXMgY2FsbGVkIHdpdGhvdXQgYSBwZW5kaW5nIGJyYW5jaC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VzcGVuc2UuaXNVbm1vdW50ZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgc3VzcGVuc2UucmVzb2x2ZSgpIGlzIGNhbGxlZCBvbiBhbiBhbHJlYWR5IHVubW91bnRlZCBzdXNwZW5zZSBib3VuZGFyeS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qge1xuICAgICAgICB2bm9kZTogdm5vZGUyLFxuICAgICAgICBhY3RpdmVCcmFuY2gsXG4gICAgICAgIHBlbmRpbmdCcmFuY2gsXG4gICAgICAgIHBlbmRpbmdJZCxcbiAgICAgICAgZWZmZWN0cyxcbiAgICAgICAgcGFyZW50Q29tcG9uZW50OiBwYXJlbnRDb21wb25lbnQyLFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcjJcbiAgICAgIH0gPSBzdXNwZW5zZTtcbiAgICAgIGxldCBkZWxheUVudGVyID0gZmFsc2U7XG4gICAgICBpZiAoc3VzcGVuc2UuaXNIeWRyYXRpbmcpIHtcbiAgICAgICAgc3VzcGVuc2UuaXNIeWRyYXRpbmcgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXJlc3VtZSkge1xuICAgICAgICBkZWxheUVudGVyID0gYWN0aXZlQnJhbmNoICYmIHBlbmRpbmdCcmFuY2gudHJhbnNpdGlvbiAmJiBwZW5kaW5nQnJhbmNoLnRyYW5zaXRpb24ubW9kZSA9PT0gXCJvdXQtaW5cIjtcbiAgICAgICAgaWYgKGRlbGF5RW50ZXIpIHtcbiAgICAgICAgICBhY3RpdmVCcmFuY2gudHJhbnNpdGlvbi5hZnRlckxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBlbmRpbmdJZCA9PT0gc3VzcGVuc2UucGVuZGluZ0lkKSB7XG4gICAgICAgICAgICAgIG1vdmUoXG4gICAgICAgICAgICAgICAgcGVuZGluZ0JyYW5jaCxcbiAgICAgICAgICAgICAgICBjb250YWluZXIyLFxuICAgICAgICAgICAgICAgIGFuY2hvciA9PT0gaW5pdGlhbEFuY2hvciA/IG5leHQoYWN0aXZlQnJhbmNoKSA6IGFuY2hvcixcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHF1ZXVlUG9zdEZsdXNoQ2IoZWZmZWN0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aXZlQnJhbmNoKSB7XG4gICAgICAgICAgaWYgKHBhcmVudE5vZGUoYWN0aXZlQnJhbmNoLmVsKSAhPT0gc3VzcGVuc2UuaGlkZGVuQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBhbmNob3IgPSBuZXh0KGFjdGl2ZUJyYW5jaCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVubW91bnQoYWN0aXZlQnJhbmNoLCBwYXJlbnRDb21wb25lbnQyLCBzdXNwZW5zZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheUVudGVyKSB7XG4gICAgICAgICAgbW92ZShwZW5kaW5nQnJhbmNoLCBjb250YWluZXIyLCBhbmNob3IsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRBY3RpdmVCcmFuY2goc3VzcGVuc2UsIHBlbmRpbmdCcmFuY2gpO1xuICAgICAgc3VzcGVuc2UucGVuZGluZ0JyYW5jaCA9IG51bGw7XG4gICAgICBzdXNwZW5zZS5pc0luRmFsbGJhY2sgPSBmYWxzZTtcbiAgICAgIGxldCBwYXJlbnQgPSBzdXNwZW5zZS5wYXJlbnQ7XG4gICAgICBsZXQgaGFzVW5yZXNvbHZlZEFuY2VzdG9yID0gZmFsc2U7XG4gICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQucGVuZGluZ0JyYW5jaCkge1xuICAgICAgICAgIHBhcmVudC5lZmZlY3RzLnB1c2goLi4uZWZmZWN0cyk7XG4gICAgICAgICAgaGFzVW5yZXNvbHZlZEFuY2VzdG9yID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgfVxuICAgICAgaWYgKCFoYXNVbnJlc29sdmVkQW5jZXN0b3IgJiYgIWRlbGF5RW50ZXIpIHtcbiAgICAgICAgcXVldWVQb3N0Rmx1c2hDYihlZmZlY3RzKTtcbiAgICAgIH1cbiAgICAgIHN1c3BlbnNlLmVmZmVjdHMgPSBbXTtcbiAgICAgIGlmIChpc1N1c3BlbnNpYmxlKSB7XG4gICAgICAgIGlmIChwYXJlbnRTdXNwZW5zZSAmJiBwYXJlbnRTdXNwZW5zZS5wZW5kaW5nQnJhbmNoICYmIHBhcmVudFN1c3BlbnNlSWQgPT09IHBhcmVudFN1c3BlbnNlLnBlbmRpbmdJZCkge1xuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLmRlcHMtLTtcbiAgICAgICAgICBpZiAocGFyZW50U3VzcGVuc2UuZGVwcyA9PT0gMCAmJiAhc3luYykge1xuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdHJpZ2dlckV2ZW50KHZub2RlMiwgXCJvblJlc29sdmVcIik7XG4gICAgfSxcbiAgICBmYWxsYmFjayhmYWxsYmFja1ZOb2RlKSB7XG4gICAgICBpZiAoIXN1c3BlbnNlLnBlbmRpbmdCcmFuY2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgeyB2bm9kZTogdm5vZGUyLCBhY3RpdmVCcmFuY2gsIHBhcmVudENvbXBvbmVudDogcGFyZW50Q29tcG9uZW50MiwgY29udGFpbmVyOiBjb250YWluZXIyLCBuYW1lc3BhY2U6IG5hbWVzcGFjZTIgfSA9IHN1c3BlbnNlO1xuICAgICAgdHJpZ2dlckV2ZW50KHZub2RlMiwgXCJvbkZhbGxiYWNrXCIpO1xuICAgICAgY29uc3QgYW5jaG9yMiA9IG5leHQoYWN0aXZlQnJhbmNoKTtcbiAgICAgIGNvbnN0IG1vdW50RmFsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghc3VzcGVuc2UuaXNJbkZhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZmFsbGJhY2tWTm9kZSxcbiAgICAgICAgICBjb250YWluZXIyLFxuICAgICAgICAgIGFuY2hvcjIsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50MixcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIC8vIGZhbGxiYWNrIHRyZWUgd2lsbCBub3QgaGF2ZSBzdXNwZW5zZSBjb250ZXh0XG4gICAgICAgICAgbmFtZXNwYWNlMixcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgZmFsbGJhY2tWTm9kZSk7XG4gICAgICB9O1xuICAgICAgY29uc3QgZGVsYXlFbnRlciA9IGZhbGxiYWNrVk5vZGUudHJhbnNpdGlvbiAmJiBmYWxsYmFja1ZOb2RlLnRyYW5zaXRpb24ubW9kZSA9PT0gXCJvdXQtaW5cIjtcbiAgICAgIGlmIChkZWxheUVudGVyKSB7XG4gICAgICAgIGFjdGl2ZUJyYW5jaC50cmFuc2l0aW9uLmFmdGVyTGVhdmUgPSBtb3VudEZhbGxiYWNrO1xuICAgICAgfVxuICAgICAgc3VzcGVuc2UuaXNJbkZhbGxiYWNrID0gdHJ1ZTtcbiAgICAgIHVubW91bnQoXG4gICAgICAgIGFjdGl2ZUJyYW5jaCxcbiAgICAgICAgcGFyZW50Q29tcG9uZW50MixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgLy8gbm8gc3VzcGVuc2Ugc28gdW5tb3VudCBob29rcyBmaXJlIG5vd1xuICAgICAgICB0cnVlXG4gICAgICAgIC8vIHNob3VsZFJlbW92ZVxuICAgICAgKTtcbiAgICAgIGlmICghZGVsYXlFbnRlcikge1xuICAgICAgICBtb3VudEZhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlKGNvbnRhaW5lcjIsIGFuY2hvcjIsIHR5cGUpIHtcbiAgICAgIHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCAmJiBtb3ZlKHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCwgY29udGFpbmVyMiwgYW5jaG9yMiwgdHlwZSk7XG4gICAgICBzdXNwZW5zZS5jb250YWluZXIgPSBjb250YWluZXIyO1xuICAgIH0sXG4gICAgbmV4dCgpIHtcbiAgICAgIHJldHVybiBzdXNwZW5zZS5hY3RpdmVCcmFuY2ggJiYgbmV4dChzdXNwZW5zZS5hY3RpdmVCcmFuY2gpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJEZXAoaW5zdGFuY2UsIHNldHVwUmVuZGVyRWZmZWN0LCBvcHRpbWl6ZWQyKSB7XG4gICAgICBjb25zdCBpc0luUGVuZGluZ1N1c3BlbnNlID0gISFzdXNwZW5zZS5wZW5kaW5nQnJhbmNoO1xuICAgICAgaWYgKGlzSW5QZW5kaW5nU3VzcGVuc2UpIHtcbiAgICAgICAgc3VzcGVuc2UuZGVwcysrO1xuICAgICAgfVxuICAgICAgY29uc3QgaHlkcmF0ZWRFbCA9IGluc3RhbmNlLnZub2RlLmVsO1xuICAgICAgaW5zdGFuY2UuYXN5bmNEZXAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIsIGluc3RhbmNlLCAwKTtcbiAgICAgIH0pLnRoZW4oKGFzeW5jU2V0dXBSZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlLmlzVW5tb3VudGVkIHx8IHN1c3BlbnNlLmlzVW5tb3VudGVkIHx8IHN1c3BlbnNlLnBlbmRpbmdJZCAhPT0gaW5zdGFuY2Uuc3VzcGVuc2VJZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS5hc3luY1Jlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyB2bm9kZTogdm5vZGUyIH0gPSBpbnN0YW5jZTtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwdXNoV2FybmluZ0NvbnRleHQodm5vZGUyKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVTZXR1cFJlc3VsdChpbnN0YW5jZSwgYXN5bmNTZXR1cFJlc3VsdCwgZmFsc2UpO1xuICAgICAgICBpZiAoaHlkcmF0ZWRFbCkge1xuICAgICAgICAgIHZub2RlMi5lbCA9IGh5ZHJhdGVkRWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSAhaHlkcmF0ZWRFbCAmJiBpbnN0YW5jZS5zdWJUcmVlLmVsO1xuICAgICAgICBzZXR1cFJlbmRlckVmZmVjdChcbiAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICB2bm9kZTIsXG4gICAgICAgICAgLy8gY29tcG9uZW50IG1heSBoYXZlIGJlZW4gbW92ZWQgYmVmb3JlIHJlc29sdmUuXG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyBub3QgYSBoeWRyYXRpb24sIGluc3RhbmNlLnN1YlRyZWUgd2lsbCBiZSB0aGUgY29tbWVudFxuICAgICAgICAgIC8vIHBsYWNlaG9sZGVyLlxuICAgICAgICAgIHBhcmVudE5vZGUoaHlkcmF0ZWRFbCB8fCBpbnN0YW5jZS5zdWJUcmVlLmVsKSxcbiAgICAgICAgICAvLyBhbmNob3Igd2lsbCBub3QgYmUgdXNlZCBpZiB0aGlzIGlzIGh5ZHJhdGlvbiwgc28gb25seSBuZWVkIHRvXG4gICAgICAgICAgLy8gY29uc2lkZXIgdGhlIGNvbW1lbnQgcGxhY2Vob2xkZXIgY2FzZS5cbiAgICAgICAgICBoeWRyYXRlZEVsID8gbnVsbCA6IG5leHQoaW5zdGFuY2Uuc3ViVHJlZSksXG4gICAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIG9wdGltaXplZDJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgcmVtb3ZlKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVIT0NIb3N0RWwoaW5zdGFuY2UsIHZub2RlMi5lbCk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgcG9wV2FybmluZ0NvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJblBlbmRpbmdTdXNwZW5zZSAmJiAtLXN1c3BlbnNlLmRlcHMgPT09IDApIHtcbiAgICAgICAgICBzdXNwZW5zZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdW5tb3VudChwYXJlbnRTdXNwZW5zZTIsIGRvUmVtb3ZlKSB7XG4gICAgICBzdXNwZW5zZS5pc1VubW91bnRlZCA9IHRydWU7XG4gICAgICBpZiAoc3VzcGVuc2UuYWN0aXZlQnJhbmNoKSB7XG4gICAgICAgIHVubW91bnQoXG4gICAgICAgICAgc3VzcGVuc2UuYWN0aXZlQnJhbmNoLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZTIsXG4gICAgICAgICAgZG9SZW1vdmVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXNwZW5zZS5wZW5kaW5nQnJhbmNoKSB7XG4gICAgICAgIHVubW91bnQoXG4gICAgICAgICAgc3VzcGVuc2UucGVuZGluZ0JyYW5jaCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UyLFxuICAgICAgICAgIGRvUmVtb3ZlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4gc3VzcGVuc2U7XG59XG5mdW5jdGlvbiBoeWRyYXRlU3VzcGVuc2Uobm9kZSwgdm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQsIHJlbmRlcmVySW50ZXJuYWxzLCBoeWRyYXRlTm9kZSkge1xuICBjb25zdCBzdXNwZW5zZSA9IHZub2RlLnN1c3BlbnNlID0gY3JlYXRlU3VzcGVuc2VCb3VuZGFyeShcbiAgICB2bm9kZSxcbiAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgbm9kZS5wYXJlbnROb2RlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIG51bGwsXG4gICAgbmFtZXNwYWNlLFxuICAgIHNsb3RTY29wZUlkcyxcbiAgICBvcHRpbWl6ZWQsXG4gICAgcmVuZGVyZXJJbnRlcm5hbHMsXG4gICAgdHJ1ZVxuICApO1xuICBjb25zdCByZXN1bHQgPSBoeWRyYXRlTm9kZShcbiAgICBub2RlLFxuICAgIHN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggPSB2bm9kZS5zc0NvbnRlbnQsXG4gICAgcGFyZW50Q29tcG9uZW50LFxuICAgIHN1c3BlbnNlLFxuICAgIHNsb3RTY29wZUlkcyxcbiAgICBvcHRpbWl6ZWRcbiAgKTtcbiAgaWYgKHN1c3BlbnNlLmRlcHMgPT09IDApIHtcbiAgICBzdXNwZW5zZS5yZXNvbHZlKGZhbHNlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbm9ybWFsaXplU3VzcGVuc2VDaGlsZHJlbih2bm9kZSkge1xuICBjb25zdCB7IHNoYXBlRmxhZywgY2hpbGRyZW4gfSA9IHZub2RlO1xuICBjb25zdCBpc1Nsb3RDaGlsZHJlbiA9IHNoYXBlRmxhZyAmIDMyO1xuICB2bm9kZS5zc0NvbnRlbnQgPSBub3JtYWxpemVTdXNwZW5zZVNsb3QoXG4gICAgaXNTbG90Q2hpbGRyZW4gPyBjaGlsZHJlbi5kZWZhdWx0IDogY2hpbGRyZW5cbiAgKTtcbiAgdm5vZGUuc3NGYWxsYmFjayA9IGlzU2xvdENoaWxkcmVuID8gbm9ybWFsaXplU3VzcGVuc2VTbG90KGNoaWxkcmVuLmZhbGxiYWNrKSA6IGNyZWF0ZVZOb2RlKENvbW1lbnQpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplU3VzcGVuc2VTbG90KHMpIHtcbiAgbGV0IGJsb2NrO1xuICBpZiAoaXNGdW5jdGlvbihzKSkge1xuICAgIGNvbnN0IHRyYWNrQmxvY2sgPSBpc0Jsb2NrVHJlZUVuYWJsZWQgJiYgcy5fYztcbiAgICBpZiAodHJhY2tCbG9jaykge1xuICAgICAgcy5fZCA9IGZhbHNlO1xuICAgICAgb3BlbkJsb2NrKCk7XG4gICAgfVxuICAgIHMgPSBzKCk7XG4gICAgaWYgKHRyYWNrQmxvY2spIHtcbiAgICAgIHMuX2QgPSB0cnVlO1xuICAgICAgYmxvY2sgPSBjdXJyZW50QmxvY2s7XG4gICAgICBjbG9zZUJsb2NrKCk7XG4gICAgfVxuICB9XG4gIGlmIChpc0FycmF5KHMpKSB7XG4gICAgY29uc3Qgc2luZ2xlQ2hpbGQgPSBmaWx0ZXJTaW5nbGVSb290KHMpO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFzaW5nbGVDaGlsZCAmJiBzLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkICE9PSBOVUxMX0RZTkFNSUNfQ09NUE9ORU5UKS5sZW5ndGggPiAwKSB7XG4gICAgICB3YXJuJDEoYDxTdXNwZW5zZT4gc2xvdHMgZXhwZWN0IGEgc2luZ2xlIHJvb3Qgbm9kZS5gKTtcbiAgICB9XG4gICAgcyA9IHNpbmdsZUNoaWxkO1xuICB9XG4gIHMgPSBub3JtYWxpemVWTm9kZShzKTtcbiAgaWYgKGJsb2NrICYmICFzLmR5bmFtaWNDaGlsZHJlbikge1xuICAgIHMuZHluYW1pY0NoaWxkcmVuID0gYmxvY2suZmlsdGVyKChjKSA9PiBjICE9PSBzKTtcbiAgfVxuICByZXR1cm4gcztcbn1cbmZ1bmN0aW9uIHF1ZXVlRWZmZWN0V2l0aFN1c3BlbnNlKGZuLCBzdXNwZW5zZSkge1xuICBpZiAoc3VzcGVuc2UgJiYgc3VzcGVuc2UucGVuZGluZ0JyYW5jaCkge1xuICAgIGlmIChpc0FycmF5KGZuKSkge1xuICAgICAgc3VzcGVuc2UuZWZmZWN0cy5wdXNoKC4uLmZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VzcGVuc2UuZWZmZWN0cy5wdXNoKGZuKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcXVldWVQb3N0Rmx1c2hDYihmbik7XG4gIH1cbn1cbmZ1bmN0aW9uIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgYnJhbmNoKSB7XG4gIHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCA9IGJyYW5jaDtcbiAgY29uc3QgeyB2bm9kZSwgcGFyZW50Q29tcG9uZW50IH0gPSBzdXNwZW5zZTtcbiAgbGV0IGVsID0gYnJhbmNoLmVsO1xuICB3aGlsZSAoIWVsICYmIGJyYW5jaC5jb21wb25lbnQpIHtcbiAgICBicmFuY2ggPSBicmFuY2guY29tcG9uZW50LnN1YlRyZWU7XG4gICAgZWwgPSBicmFuY2guZWw7XG4gIH1cbiAgdm5vZGUuZWwgPSBlbDtcbiAgaWYgKHBhcmVudENvbXBvbmVudCAmJiBwYXJlbnRDb21wb25lbnQuc3ViVHJlZSA9PT0gdm5vZGUpIHtcbiAgICBwYXJlbnRDb21wb25lbnQudm5vZGUuZWwgPSBlbDtcbiAgICB1cGRhdGVIT0NIb3N0RWwocGFyZW50Q29tcG9uZW50LCBlbCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzVk5vZGVTdXNwZW5zaWJsZSh2bm9kZSkge1xuICBjb25zdCBzdXNwZW5zaWJsZSA9IHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLnN1c3BlbnNpYmxlO1xuICByZXR1cm4gc3VzcGVuc2libGUgIT0gbnVsbCAmJiBzdXNwZW5zaWJsZSAhPT0gZmFsc2U7XG59XG5cbmNvbnN0IEZyYWdtZW50ID0gU3ltYm9sLmZvcihcInYtZmd0XCIpO1xuY29uc3QgVGV4dCA9IFN5bWJvbC5mb3IoXCJ2LXR4dFwiKTtcbmNvbnN0IENvbW1lbnQgPSBTeW1ib2wuZm9yKFwidi1jbXRcIik7XG5jb25zdCBTdGF0aWMgPSBTeW1ib2wuZm9yKFwidi1zdGNcIik7XG5jb25zdCBibG9ja1N0YWNrID0gW107XG5sZXQgY3VycmVudEJsb2NrID0gbnVsbDtcbmZ1bmN0aW9uIG9wZW5CbG9jayhkaXNhYmxlVHJhY2tpbmcgPSBmYWxzZSkge1xuICBibG9ja1N0YWNrLnB1c2goY3VycmVudEJsb2NrID0gZGlzYWJsZVRyYWNraW5nID8gbnVsbCA6IFtdKTtcbn1cbmZ1bmN0aW9uIGNsb3NlQmxvY2soKSB7XG4gIGJsb2NrU3RhY2sucG9wKCk7XG4gIGN1cnJlbnRCbG9jayA9IGJsb2NrU3RhY2tbYmxvY2tTdGFjay5sZW5ndGggLSAxXSB8fCBudWxsO1xufVxubGV0IGlzQmxvY2tUcmVlRW5hYmxlZCA9IDE7XG5mdW5jdGlvbiBzZXRCbG9ja1RyYWNraW5nKHZhbHVlKSB7XG4gIGlzQmxvY2tUcmVlRW5hYmxlZCArPSB2YWx1ZTtcbiAgaWYgKHZhbHVlIDwgMCAmJiBjdXJyZW50QmxvY2spIHtcbiAgICBjdXJyZW50QmxvY2suaGFzT25jZSA9IHRydWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwQmxvY2sodm5vZGUpIHtcbiAgdm5vZGUuZHluYW1pY0NoaWxkcmVuID0gaXNCbG9ja1RyZWVFbmFibGVkID4gMCA/IGN1cnJlbnRCbG9jayB8fCBFTVBUWV9BUlIgOiBudWxsO1xuICBjbG9zZUJsb2NrKCk7XG4gIGlmIChpc0Jsb2NrVHJlZUVuYWJsZWQgPiAwICYmIGN1cnJlbnRCbG9jaykge1xuICAgIGN1cnJlbnRCbG9jay5wdXNoKHZub2RlKTtcbiAgfVxuICByZXR1cm4gdm5vZGU7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50QmxvY2sodHlwZSwgcHJvcHMsIGNoaWxkcmVuLCBwYXRjaEZsYWcsIGR5bmFtaWNQcm9wcywgc2hhcGVGbGFnKSB7XG4gIHJldHVybiBzZXR1cEJsb2NrKFxuICAgIGNyZWF0ZUJhc2VWTm9kZShcbiAgICAgIHR5cGUsXG4gICAgICBwcm9wcyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcGF0Y2hGbGFnLFxuICAgICAgZHluYW1pY1Byb3BzLFxuICAgICAgc2hhcGVGbGFnLFxuICAgICAgdHJ1ZVxuICAgIClcbiAgKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUJsb2NrKHR5cGUsIHByb3BzLCBjaGlsZHJlbiwgcGF0Y2hGbGFnLCBkeW5hbWljUHJvcHMpIHtcbiAgcmV0dXJuIHNldHVwQmxvY2soXG4gICAgY3JlYXRlVk5vZGUoXG4gICAgICB0eXBlLFxuICAgICAgcHJvcHMsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIHBhdGNoRmxhZyxcbiAgICAgIGR5bmFtaWNQcm9wcyxcbiAgICAgIHRydWVcbiAgICApXG4gICk7XG59XG5mdW5jdGlvbiBpc1ZOb2RlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA/IHZhbHVlLl9fdl9pc1ZOb2RlID09PSB0cnVlIDogZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NhbWVWTm9kZVR5cGUobjEsIG4yKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIG4yLnNoYXBlRmxhZyAmIDYgJiYgbjEuY29tcG9uZW50KSB7XG4gICAgY29uc3QgZGlydHlJbnN0YW5jZXMgPSBobXJEaXJ0eUNvbXBvbmVudHMuZ2V0KG4yLnR5cGUpO1xuICAgIGlmIChkaXJ0eUluc3RhbmNlcyAmJiBkaXJ0eUluc3RhbmNlcy5oYXMobjEuY29tcG9uZW50KSkge1xuICAgICAgbjEuc2hhcGVGbGFnICY9IH4yNTY7XG4gICAgICBuMi5zaGFwZUZsYWcgJj0gfjUxMjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG4xLnR5cGUgPT09IG4yLnR5cGUgJiYgbjEua2V5ID09PSBuMi5rZXk7XG59XG5sZXQgdm5vZGVBcmdzVHJhbnNmb3JtZXI7XG5mdW5jdGlvbiB0cmFuc2Zvcm1WTm9kZUFyZ3ModHJhbnNmb3JtZXIpIHtcbiAgdm5vZGVBcmdzVHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lcjtcbn1cbmNvbnN0IGNyZWF0ZVZOb2RlV2l0aEFyZ3NUcmFuc2Zvcm0gPSAoLi4uYXJncykgPT4ge1xuICByZXR1cm4gX2NyZWF0ZVZOb2RlKFxuICAgIC4uLnZub2RlQXJnc1RyYW5zZm9ybWVyID8gdm5vZGVBcmdzVHJhbnNmb3JtZXIoYXJncywgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSA6IGFyZ3NcbiAgKTtcbn07XG5jb25zdCBub3JtYWxpemVLZXkgPSAoeyBrZXkgfSkgPT4ga2V5ICE9IG51bGwgPyBrZXkgOiBudWxsO1xuY29uc3Qgbm9ybWFsaXplUmVmID0gKHtcbiAgcmVmLFxuICByZWZfa2V5LFxuICByZWZfZm9yXG59KSA9PiB7XG4gIGlmICh0eXBlb2YgcmVmID09PSBcIm51bWJlclwiKSB7XG4gICAgcmVmID0gXCJcIiArIHJlZjtcbiAgfVxuICByZXR1cm4gcmVmICE9IG51bGwgPyBpc1N0cmluZyhyZWYpIHx8IGlzUmVmKHJlZikgfHwgaXNGdW5jdGlvbihyZWYpID8geyBpOiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UsIHI6IHJlZiwgazogcmVmX2tleSwgZjogISFyZWZfZm9yIH0gOiByZWYgOiBudWxsO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZUJhc2VWTm9kZSh0eXBlLCBwcm9wcyA9IG51bGwsIGNoaWxkcmVuID0gbnVsbCwgcGF0Y2hGbGFnID0gMCwgZHluYW1pY1Byb3BzID0gbnVsbCwgc2hhcGVGbGFnID0gdHlwZSA9PT0gRnJhZ21lbnQgPyAwIDogMSwgaXNCbG9ja05vZGUgPSBmYWxzZSwgbmVlZEZ1bGxDaGlsZHJlbk5vcm1hbGl6YXRpb24gPSBmYWxzZSkge1xuICBjb25zdCB2bm9kZSA9IHtcbiAgICBfX3ZfaXNWTm9kZTogdHJ1ZSxcbiAgICBfX3Zfc2tpcDogdHJ1ZSxcbiAgICB0eXBlLFxuICAgIHByb3BzLFxuICAgIGtleTogcHJvcHMgJiYgbm9ybWFsaXplS2V5KHByb3BzKSxcbiAgICByZWY6IHByb3BzICYmIG5vcm1hbGl6ZVJlZihwcm9wcyksXG4gICAgc2NvcGVJZDogY3VycmVudFNjb3BlSWQsXG4gICAgc2xvdFNjb3BlSWRzOiBudWxsLFxuICAgIGNoaWxkcmVuLFxuICAgIGNvbXBvbmVudDogbnVsbCxcbiAgICBzdXNwZW5zZTogbnVsbCxcbiAgICBzc0NvbnRlbnQ6IG51bGwsXG4gICAgc3NGYWxsYmFjazogbnVsbCxcbiAgICBkaXJzOiBudWxsLFxuICAgIHRyYW5zaXRpb246IG51bGwsXG4gICAgZWw6IG51bGwsXG4gICAgYW5jaG9yOiBudWxsLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICB0YXJnZXRTdGFydDogbnVsbCxcbiAgICB0YXJnZXRBbmNob3I6IG51bGwsXG4gICAgc3RhdGljQ291bnQ6IDAsXG4gICAgc2hhcGVGbGFnLFxuICAgIHBhdGNoRmxhZyxcbiAgICBkeW5hbWljUHJvcHMsXG4gICAgZHluYW1pY0NoaWxkcmVuOiBudWxsLFxuICAgIGFwcENvbnRleHQ6IG51bGwsXG4gICAgY3R4OiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2VcbiAgfTtcbiAgaWYgKG5lZWRGdWxsQ2hpbGRyZW5Ob3JtYWxpemF0aW9uKSB7XG4gICAgbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuKTtcbiAgICBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICB0eXBlLm5vcm1hbGl6ZSh2bm9kZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgdm5vZGUuc2hhcGVGbGFnIHw9IGlzU3RyaW5nKGNoaWxkcmVuKSA/IDggOiAxNjtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB2bm9kZS5rZXkgIT09IHZub2RlLmtleSkge1xuICAgIHdhcm4kMShgVk5vZGUgY3JlYXRlZCB3aXRoIGludmFsaWQga2V5IChOYU4pLiBWTm9kZSB0eXBlOmAsIHZub2RlLnR5cGUpO1xuICB9XG4gIGlmIChpc0Jsb2NrVHJlZUVuYWJsZWQgPiAwICYmIC8vIGF2b2lkIGEgYmxvY2sgbm9kZSBmcm9tIHRyYWNraW5nIGl0c2VsZlxuICAhaXNCbG9ja05vZGUgJiYgLy8gaGFzIGN1cnJlbnQgcGFyZW50IGJsb2NrXG4gIGN1cnJlbnRCbG9jayAmJiAvLyBwcmVzZW5jZSBvZiBhIHBhdGNoIGZsYWcgaW5kaWNhdGVzIHRoaXMgbm9kZSBuZWVkcyBwYXRjaGluZyBvbiB1cGRhdGVzLlxuICAvLyBjb21wb25lbnQgbm9kZXMgYWxzbyBzaG91bGQgYWx3YXlzIGJlIHBhdGNoZWQsIGJlY2F1c2UgZXZlbiBpZiB0aGVcbiAgLy8gY29tcG9uZW50IGRvZXNuJ3QgbmVlZCB0byB1cGRhdGUsIGl0IG5lZWRzIHRvIHBlcnNpc3QgdGhlIGluc3RhbmNlIG9uIHRvXG4gIC8vIHRoZSBuZXh0IHZub2RlIHNvIHRoYXQgaXQgY2FuIGJlIHByb3Blcmx5IHVubW91bnRlZCBsYXRlci5cbiAgKHZub2RlLnBhdGNoRmxhZyA+IDAgfHwgc2hhcGVGbGFnICYgNikgJiYgLy8gdGhlIEVWRU5UUyBmbGFnIGlzIG9ubHkgZm9yIGh5ZHJhdGlvbiBhbmQgaWYgaXQgaXMgdGhlIG9ubHkgZmxhZywgdGhlXG4gIC8vIHZub2RlIHNob3VsZCBub3QgYmUgY29uc2lkZXJlZCBkeW5hbWljIGR1ZSB0byBoYW5kbGVyIGNhY2hpbmcuXG4gIHZub2RlLnBhdGNoRmxhZyAhPT0gMzIpIHtcbiAgICBjdXJyZW50QmxvY2sucHVzaCh2bm9kZSk7XG4gIH1cbiAgcmV0dXJuIHZub2RlO1xufVxuY29uc3QgY3JlYXRlVk5vZGUgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gY3JlYXRlVk5vZGVXaXRoQXJnc1RyYW5zZm9ybSA6IF9jcmVhdGVWTm9kZTtcbmZ1bmN0aW9uIF9jcmVhdGVWTm9kZSh0eXBlLCBwcm9wcyA9IG51bGwsIGNoaWxkcmVuID0gbnVsbCwgcGF0Y2hGbGFnID0gMCwgZHluYW1pY1Byb3BzID0gbnVsbCwgaXNCbG9ja05vZGUgPSBmYWxzZSkge1xuICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gTlVMTF9EWU5BTUlDX0NPTVBPTkVOVCkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICF0eXBlKSB7XG4gICAgICB3YXJuJDEoYEludmFsaWQgdm5vZGUgdHlwZSB3aGVuIGNyZWF0aW5nIHZub2RlOiAke3R5cGV9LmApO1xuICAgIH1cbiAgICB0eXBlID0gQ29tbWVudDtcbiAgfVxuICBpZiAoaXNWTm9kZSh0eXBlKSkge1xuICAgIGNvbnN0IGNsb25lZCA9IGNsb25lVk5vZGUoXG4gICAgICB0eXBlLFxuICAgICAgcHJvcHMsXG4gICAgICB0cnVlXG4gICAgICAvKiBtZXJnZVJlZjogdHJ1ZSAqL1xuICAgICk7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICBub3JtYWxpemVDaGlsZHJlbihjbG9uZWQsIGNoaWxkcmVuKTtcbiAgICB9XG4gICAgaWYgKGlzQmxvY2tUcmVlRW5hYmxlZCA+IDAgJiYgIWlzQmxvY2tOb2RlICYmIGN1cnJlbnRCbG9jaykge1xuICAgICAgaWYgKGNsb25lZC5zaGFwZUZsYWcgJiA2KSB7XG4gICAgICAgIGN1cnJlbnRCbG9ja1tjdXJyZW50QmxvY2suaW5kZXhPZih0eXBlKV0gPSBjbG9uZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50QmxvY2sucHVzaChjbG9uZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjbG9uZWQucGF0Y2hGbGFnID0gLTI7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxuICBpZiAoaXNDbGFzc0NvbXBvbmVudCh0eXBlKSkge1xuICAgIHR5cGUgPSB0eXBlLl9fdmNjT3B0cztcbiAgfVxuICBpZiAocHJvcHMpIHtcbiAgICBwcm9wcyA9IGd1YXJkUmVhY3RpdmVQcm9wcyhwcm9wcyk7XG4gICAgbGV0IHsgY2xhc3M6IGtsYXNzLCBzdHlsZSB9ID0gcHJvcHM7XG4gICAgaWYgKGtsYXNzICYmICFpc1N0cmluZyhrbGFzcykpIHtcbiAgICAgIHByb3BzLmNsYXNzID0gbm9ybWFsaXplQ2xhc3Moa2xhc3MpO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3R5bGUpKSB7XG4gICAgICBpZiAoaXNQcm94eShzdHlsZSkgJiYgIWlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICAgIHN0eWxlID0gZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICB9XG4gICAgICBwcm9wcy5zdHlsZSA9IG5vcm1hbGl6ZVN0eWxlKHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2hhcGVGbGFnID0gaXNTdHJpbmcodHlwZSkgPyAxIDogaXNTdXNwZW5zZSh0eXBlKSA/IDEyOCA6IGlzVGVsZXBvcnQodHlwZSkgPyA2NCA6IGlzT2JqZWN0KHR5cGUpID8gNCA6IGlzRnVuY3Rpb24odHlwZSkgPyAyIDogMDtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgc2hhcGVGbGFnICYgNCAmJiBpc1Byb3h5KHR5cGUpKSB7XG4gICAgdHlwZSA9IHRvUmF3KHR5cGUpO1xuICAgIHdhcm4kMShcbiAgICAgIGBWdWUgcmVjZWl2ZWQgYSBDb21wb25lbnQgdGhhdCB3YXMgbWFkZSBhIHJlYWN0aXZlIG9iamVjdC4gVGhpcyBjYW4gbGVhZCB0byB1bm5lY2Vzc2FyeSBwZXJmb3JtYW5jZSBvdmVyaGVhZCBhbmQgc2hvdWxkIGJlIGF2b2lkZWQgYnkgbWFya2luZyB0aGUgY29tcG9uZW50IHdpdGggXFxgbWFya1Jhd1xcYCBvciB1c2luZyBcXGBzaGFsbG93UmVmXFxgIGluc3RlYWQgb2YgXFxgcmVmXFxgLmAsXG4gICAgICBgXG5Db21wb25lbnQgdGhhdCB3YXMgbWFkZSByZWFjdGl2ZTogYCxcbiAgICAgIHR5cGVcbiAgICApO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNlVk5vZGUoXG4gICAgdHlwZSxcbiAgICBwcm9wcyxcbiAgICBjaGlsZHJlbixcbiAgICBwYXRjaEZsYWcsXG4gICAgZHluYW1pY1Byb3BzLFxuICAgIHNoYXBlRmxhZyxcbiAgICBpc0Jsb2NrTm9kZSxcbiAgICB0cnVlXG4gICk7XG59XG5mdW5jdGlvbiBndWFyZFJlYWN0aXZlUHJvcHMocHJvcHMpIHtcbiAgaWYgKCFwcm9wcykgcmV0dXJuIG51bGw7XG4gIHJldHVybiBpc1Byb3h5KHByb3BzKSB8fCBpc0ludGVybmFsT2JqZWN0KHByb3BzKSA/IGV4dGVuZCh7fSwgcHJvcHMpIDogcHJvcHM7XG59XG5mdW5jdGlvbiBjbG9uZVZOb2RlKHZub2RlLCBleHRyYVByb3BzLCBtZXJnZVJlZiA9IGZhbHNlLCBjbG9uZVRyYW5zaXRpb24gPSBmYWxzZSkge1xuICBjb25zdCB7IHByb3BzLCByZWYsIHBhdGNoRmxhZywgY2hpbGRyZW4sIHRyYW5zaXRpb24gfSA9IHZub2RlO1xuICBjb25zdCBtZXJnZWRQcm9wcyA9IGV4dHJhUHJvcHMgPyBtZXJnZVByb3BzKHByb3BzIHx8IHt9LCBleHRyYVByb3BzKSA6IHByb3BzO1xuICBjb25zdCBjbG9uZWQgPSB7XG4gICAgX192X2lzVk5vZGU6IHRydWUsXG4gICAgX192X3NraXA6IHRydWUsXG4gICAgdHlwZTogdm5vZGUudHlwZSxcbiAgICBwcm9wczogbWVyZ2VkUHJvcHMsXG4gICAga2V5OiBtZXJnZWRQcm9wcyAmJiBub3JtYWxpemVLZXkobWVyZ2VkUHJvcHMpLFxuICAgIHJlZjogZXh0cmFQcm9wcyAmJiBleHRyYVByb3BzLnJlZiA/IChcbiAgICAgIC8vICMyMDc4IGluIHRoZSBjYXNlIG9mIDxjb21wb25lbnQgOmlzPVwidm5vZGVcIiByZWY9XCJleHRyYVwiLz5cbiAgICAgIC8vIGlmIHRoZSB2bm9kZSBpdHNlbGYgYWxyZWFkeSBoYXMgYSByZWYsIGNsb25lVk5vZGUgd2lsbCBuZWVkIHRvIG1lcmdlXG4gICAgICAvLyB0aGUgcmVmcyBzbyB0aGUgc2luZ2xlIHZub2RlIGNhbiBiZSBzZXQgb24gbXVsdGlwbGUgcmVmc1xuICAgICAgbWVyZ2VSZWYgJiYgcmVmID8gaXNBcnJheShyZWYpID8gcmVmLmNvbmNhdChub3JtYWxpemVSZWYoZXh0cmFQcm9wcykpIDogW3JlZiwgbm9ybWFsaXplUmVmKGV4dHJhUHJvcHMpXSA6IG5vcm1hbGl6ZVJlZihleHRyYVByb3BzKVxuICAgICkgOiByZWYsXG4gICAgc2NvcGVJZDogdm5vZGUuc2NvcGVJZCxcbiAgICBzbG90U2NvcGVJZHM6IHZub2RlLnNsb3RTY29wZUlkcyxcbiAgICBjaGlsZHJlbjogISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBwYXRjaEZsYWcgPT09IC0xICYmIGlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4ubWFwKGRlZXBDbG9uZVZOb2RlKSA6IGNoaWxkcmVuLFxuICAgIHRhcmdldDogdm5vZGUudGFyZ2V0LFxuICAgIHRhcmdldFN0YXJ0OiB2bm9kZS50YXJnZXRTdGFydCxcbiAgICB0YXJnZXRBbmNob3I6IHZub2RlLnRhcmdldEFuY2hvcixcbiAgICBzdGF0aWNDb3VudDogdm5vZGUuc3RhdGljQ291bnQsXG4gICAgc2hhcGVGbGFnOiB2bm9kZS5zaGFwZUZsYWcsXG4gICAgLy8gaWYgdGhlIHZub2RlIGlzIGNsb25lZCB3aXRoIGV4dHJhIHByb3BzLCB3ZSBjYW4gbm8gbG9uZ2VyIGFzc3VtZSBpdHNcbiAgICAvLyBleGlzdGluZyBwYXRjaCBmbGFnIHRvIGJlIHJlbGlhYmxlIGFuZCBuZWVkIHRvIGFkZCB0aGUgRlVMTF9QUk9QUyBmbGFnLlxuICAgIC8vIG5vdGU6IHByZXNlcnZlIGZsYWcgZm9yIGZyYWdtZW50cyBzaW5jZSB0aGV5IHVzZSB0aGUgZmxhZyBmb3IgY2hpbGRyZW5cbiAgICAvLyBmYXN0IHBhdGhzIG9ubHkuXG4gICAgcGF0Y2hGbGFnOiBleHRyYVByb3BzICYmIHZub2RlLnR5cGUgIT09IEZyYWdtZW50ID8gcGF0Y2hGbGFnID09PSAtMSA/IDE2IDogcGF0Y2hGbGFnIHwgMTYgOiBwYXRjaEZsYWcsXG4gICAgZHluYW1pY1Byb3BzOiB2bm9kZS5keW5hbWljUHJvcHMsXG4gICAgZHluYW1pY0NoaWxkcmVuOiB2bm9kZS5keW5hbWljQ2hpbGRyZW4sXG4gICAgYXBwQ29udGV4dDogdm5vZGUuYXBwQ29udGV4dCxcbiAgICBkaXJzOiB2bm9kZS5kaXJzLFxuICAgIHRyYW5zaXRpb24sXG4gICAgLy8gVGhlc2Ugc2hvdWxkIHRlY2huaWNhbGx5IG9ubHkgYmUgbm9uLW51bGwgb24gbW91bnRlZCBWTm9kZXMuIEhvd2V2ZXIsXG4gICAgLy8gdGhleSAqc2hvdWxkKiBiZSBjb3BpZWQgZm9yIGtlcHQtYWxpdmUgdm5vZGVzLiBTbyB3ZSBqdXN0IGFsd2F5cyBjb3B5XG4gICAgLy8gdGhlbSBzaW5jZSB0aGVtIGJlaW5nIG5vbi1udWxsIGR1cmluZyBhIG1vdW50IGRvZXNuJ3QgYWZmZWN0IHRoZSBsb2dpYyBhc1xuICAgIC8vIHRoZXkgd2lsbCBzaW1wbHkgYmUgb3ZlcndyaXR0ZW4uXG4gICAgY29tcG9uZW50OiB2bm9kZS5jb21wb25lbnQsXG4gICAgc3VzcGVuc2U6IHZub2RlLnN1c3BlbnNlLFxuICAgIHNzQ29udGVudDogdm5vZGUuc3NDb250ZW50ICYmIGNsb25lVk5vZGUodm5vZGUuc3NDb250ZW50KSxcbiAgICBzc0ZhbGxiYWNrOiB2bm9kZS5zc0ZhbGxiYWNrICYmIGNsb25lVk5vZGUodm5vZGUuc3NGYWxsYmFjayksXG4gICAgZWw6IHZub2RlLmVsLFxuICAgIGFuY2hvcjogdm5vZGUuYW5jaG9yLFxuICAgIGN0eDogdm5vZGUuY3R4LFxuICAgIGNlOiB2bm9kZS5jZVxuICB9O1xuICBpZiAodHJhbnNpdGlvbiAmJiBjbG9uZVRyYW5zaXRpb24pIHtcbiAgICBzZXRUcmFuc2l0aW9uSG9va3MoXG4gICAgICBjbG9uZWQsXG4gICAgICB0cmFuc2l0aW9uLmNsb25lKGNsb25lZClcbiAgICApO1xuICB9XG4gIHJldHVybiBjbG9uZWQ7XG59XG5mdW5jdGlvbiBkZWVwQ2xvbmVWTm9kZSh2bm9kZSkge1xuICBjb25zdCBjbG9uZWQgPSBjbG9uZVZOb2RlKHZub2RlKTtcbiAgaWYgKGlzQXJyYXkodm5vZGUuY2hpbGRyZW4pKSB7XG4gICAgY2xvbmVkLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4ubWFwKGRlZXBDbG9uZVZOb2RlKTtcbiAgfVxuICByZXR1cm4gY2xvbmVkO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dFZOb2RlKHRleHQgPSBcIiBcIiwgZmxhZyA9IDApIHtcbiAgcmV0dXJuIGNyZWF0ZVZOb2RlKFRleHQsIG51bGwsIHRleHQsIGZsYWcpO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RhdGljVk5vZGUoY29udGVudCwgbnVtYmVyT2ZOb2Rlcykge1xuICBjb25zdCB2bm9kZSA9IGNyZWF0ZVZOb2RlKFN0YXRpYywgbnVsbCwgY29udGVudCk7XG4gIHZub2RlLnN0YXRpY0NvdW50ID0gbnVtYmVyT2ZOb2RlcztcbiAgcmV0dXJuIHZub2RlO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudFZOb2RlKHRleHQgPSBcIlwiLCBhc0Jsb2NrID0gZmFsc2UpIHtcbiAgcmV0dXJuIGFzQmxvY2sgPyAob3BlbkJsb2NrKCksIGNyZWF0ZUJsb2NrKENvbW1lbnQsIG51bGwsIHRleHQpKSA6IGNyZWF0ZVZOb2RlKENvbW1lbnQsIG51bGwsIHRleHQpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplVk5vZGUoY2hpbGQpIHtcbiAgaWYgKGNoaWxkID09IG51bGwgfHwgdHlwZW9mIGNoaWxkID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBjcmVhdGVWTm9kZShDb21tZW50KTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGNoaWxkKSkge1xuICAgIHJldHVybiBjcmVhdGVWTm9kZShcbiAgICAgIEZyYWdtZW50LFxuICAgICAgbnVsbCxcbiAgICAgIC8vICMzNjY2LCBhdm9pZCByZWZlcmVuY2UgcG9sbHV0aW9uIHdoZW4gcmV1c2luZyB2bm9kZVxuICAgICAgY2hpbGQuc2xpY2UoKVxuICAgICk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGNsb25lSWZNb3VudGVkKGNoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoVGV4dCwgbnVsbCwgU3RyaW5nKGNoaWxkKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsb25lSWZNb3VudGVkKGNoaWxkKSB7XG4gIHJldHVybiBjaGlsZC5lbCA9PT0gbnVsbCAmJiBjaGlsZC5wYXRjaEZsYWcgIT09IC0xIHx8IGNoaWxkLm1lbW8gPyBjaGlsZCA6IGNsb25lVk5vZGUoY2hpbGQpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuKSB7XG4gIGxldCB0eXBlID0gMDtcbiAgY29uc3QgeyBzaGFwZUZsYWcgfSA9IHZub2RlO1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIHR5cGUgPSAxNjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoc2hhcGVGbGFnICYgKDEgfCA2NCkpIHtcbiAgICAgIGNvbnN0IHNsb3QgPSBjaGlsZHJlbi5kZWZhdWx0O1xuICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgc2xvdC5fYyAmJiAoc2xvdC5fZCA9IGZhbHNlKTtcbiAgICAgICAgbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIHNsb3QoKSk7XG4gICAgICAgIHNsb3QuX2MgJiYgKHNsb3QuX2QgPSB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IDMyO1xuICAgICAgY29uc3Qgc2xvdEZsYWcgPSBjaGlsZHJlbi5fO1xuICAgICAgaWYgKCFzbG90RmxhZyAmJiAhaXNJbnRlcm5hbE9iamVjdChjaGlsZHJlbikpIHtcbiAgICAgICAgY2hpbGRyZW4uX2N0eCA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdEZsYWcgPT09IDMgJiYgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSB7XG4gICAgICAgIGlmIChjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2Uuc2xvdHMuXyA9PT0gMSkge1xuICAgICAgICAgIGNoaWxkcmVuLl8gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkcmVuLl8gPSAyO1xuICAgICAgICAgIHZub2RlLnBhdGNoRmxhZyB8PSAxMDI0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oY2hpbGRyZW4pKSB7XG4gICAgY2hpbGRyZW4gPSB7IGRlZmF1bHQ6IGNoaWxkcmVuLCBfY3R4OiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgfTtcbiAgICB0eXBlID0gMzI7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGRyZW4gPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgIGlmIChzaGFwZUZsYWcgJiA2NCkge1xuICAgICAgdHlwZSA9IDE2O1xuICAgICAgY2hpbGRyZW4gPSBbY3JlYXRlVGV4dFZOb2RlKGNoaWxkcmVuKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSA4O1xuICAgIH1cbiAgfVxuICB2bm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB2bm9kZS5zaGFwZUZsYWcgfD0gdHlwZTtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoLi4uYXJncykge1xuICBjb25zdCByZXQgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9NZXJnZSA9IGFyZ3NbaV07XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9NZXJnZSkge1xuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiKSB7XG4gICAgICAgIGlmIChyZXQuY2xhc3MgIT09IHRvTWVyZ2UuY2xhc3MpIHtcbiAgICAgICAgICByZXQuY2xhc3MgPSBub3JtYWxpemVDbGFzcyhbcmV0LmNsYXNzLCB0b01lcmdlLmNsYXNzXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgcmV0LnN0eWxlID0gbm9ybWFsaXplU3R5bGUoW3JldC5zdHlsZSwgdG9NZXJnZS5zdHlsZV0pO1xuICAgICAgfSBlbHNlIGlmIChpc09uKGtleSkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSByZXRba2V5XTtcbiAgICAgICAgY29uc3QgaW5jb21pbmcgPSB0b01lcmdlW2tleV07XG4gICAgICAgIGlmIChpbmNvbWluZyAmJiBleGlzdGluZyAhPT0gaW5jb21pbmcgJiYgIShpc0FycmF5KGV4aXN0aW5nKSAmJiBleGlzdGluZy5pbmNsdWRlcyhpbmNvbWluZykpKSB7XG4gICAgICAgICAgcmV0W2tleV0gPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgaW5jb21pbmcpIDogaW5jb21pbmc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSBcIlwiKSB7XG4gICAgICAgIHJldFtrZXldID0gdG9NZXJnZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gaW52b2tlVk5vZGVIb29rKGhvb2ssIGluc3RhbmNlLCB2bm9kZSwgcHJldlZOb2RlID0gbnVsbCkge1xuICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhob29rLCBpbnN0YW5jZSwgNywgW1xuICAgIHZub2RlLFxuICAgIHByZXZWTm9kZVxuICBdKTtcbn1cblxuY29uc3QgZW1wdHlBcHBDb250ZXh0ID0gY3JlYXRlQXBwQ29udGV4dCgpO1xubGV0IHVpZCA9IDA7XG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZSh2bm9kZSwgcGFyZW50LCBzdXNwZW5zZSkge1xuICBjb25zdCB0eXBlID0gdm5vZGUudHlwZTtcbiAgY29uc3QgYXBwQ29udGV4dCA9IChwYXJlbnQgPyBwYXJlbnQuYXBwQ29udGV4dCA6IHZub2RlLmFwcENvbnRleHQpIHx8IGVtcHR5QXBwQ29udGV4dDtcbiAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgdWlkOiB1aWQrKyxcbiAgICB2bm9kZSxcbiAgICB0eXBlLFxuICAgIHBhcmVudCxcbiAgICBhcHBDb250ZXh0LFxuICAgIHJvb3Q6IG51bGwsXG4gICAgLy8gdG8gYmUgaW1tZWRpYXRlbHkgc2V0XG4gICAgbmV4dDogbnVsbCxcbiAgICBzdWJUcmVlOiBudWxsLFxuICAgIC8vIHdpbGwgYmUgc2V0IHN5bmNocm9ub3VzbHkgcmlnaHQgYWZ0ZXIgY3JlYXRpb25cbiAgICBlZmZlY3Q6IG51bGwsXG4gICAgdXBkYXRlOiBudWxsLFxuICAgIC8vIHdpbGwgYmUgc2V0IHN5bmNocm9ub3VzbHkgcmlnaHQgYWZ0ZXIgY3JlYXRpb25cbiAgICBzY29wZTogbmV3IEVmZmVjdFNjb3BlKFxuICAgICAgdHJ1ZVxuICAgICAgLyogZGV0YWNoZWQgKi9cbiAgICApLFxuICAgIHJlbmRlcjogbnVsbCxcbiAgICBwcm94eTogbnVsbCxcbiAgICBleHBvc2VkOiBudWxsLFxuICAgIGV4cG9zZVByb3h5OiBudWxsLFxuICAgIHdpdGhQcm94eTogbnVsbCxcbiAgICBwcm92aWRlczogcGFyZW50ID8gcGFyZW50LnByb3ZpZGVzIDogT2JqZWN0LmNyZWF0ZShhcHBDb250ZXh0LnByb3ZpZGVzKSxcbiAgICBhY2Nlc3NDYWNoZTogbnVsbCxcbiAgICByZW5kZXJDYWNoZTogW10sXG4gICAgLy8gbG9jYWwgcmVzb2x2ZWQgYXNzZXRzXG4gICAgY29tcG9uZW50czogbnVsbCxcbiAgICBkaXJlY3RpdmVzOiBudWxsLFxuICAgIC8vIHJlc29sdmVkIHByb3BzIGFuZCBlbWl0cyBvcHRpb25zXG4gICAgcHJvcHNPcHRpb25zOiBub3JtYWxpemVQcm9wc09wdGlvbnModHlwZSwgYXBwQ29udGV4dCksXG4gICAgZW1pdHNPcHRpb25zOiBub3JtYWxpemVFbWl0c09wdGlvbnModHlwZSwgYXBwQ29udGV4dCksXG4gICAgLy8gZW1pdFxuICAgIGVtaXQ6IG51bGwsXG4gICAgLy8gdG8gYmUgc2V0IGltbWVkaWF0ZWx5XG4gICAgZW1pdHRlZDogbnVsbCxcbiAgICAvLyBwcm9wcyBkZWZhdWx0IHZhbHVlXG4gICAgcHJvcHNEZWZhdWx0czogRU1QVFlfT0JKLFxuICAgIC8vIGluaGVyaXRBdHRyc1xuICAgIGluaGVyaXRBdHRyczogdHlwZS5pbmhlcml0QXR0cnMsXG4gICAgLy8gc3RhdGVcbiAgICBjdHg6IEVNUFRZX09CSixcbiAgICBkYXRhOiBFTVBUWV9PQkosXG4gICAgcHJvcHM6IEVNUFRZX09CSixcbiAgICBhdHRyczogRU1QVFlfT0JKLFxuICAgIHNsb3RzOiBFTVBUWV9PQkosXG4gICAgcmVmczogRU1QVFlfT0JKLFxuICAgIHNldHVwU3RhdGU6IEVNUFRZX09CSixcbiAgICBzZXR1cENvbnRleHQ6IG51bGwsXG4gICAgLy8gc3VzcGVuc2UgcmVsYXRlZFxuICAgIHN1c3BlbnNlLFxuICAgIHN1c3BlbnNlSWQ6IHN1c3BlbnNlID8gc3VzcGVuc2UucGVuZGluZ0lkIDogMCxcbiAgICBhc3luY0RlcDogbnVsbCxcbiAgICBhc3luY1Jlc29sdmVkOiBmYWxzZSxcbiAgICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgICAvLyBub3QgdXNpbmcgZW51bXMgaGVyZSBiZWNhdXNlIGl0IHJlc3VsdHMgaW4gY29tcHV0ZWQgcHJvcGVydGllc1xuICAgIGlzTW91bnRlZDogZmFsc2UsXG4gICAgaXNVbm1vdW50ZWQ6IGZhbHNlLFxuICAgIGlzRGVhY3RpdmF0ZWQ6IGZhbHNlLFxuICAgIGJjOiBudWxsLFxuICAgIGM6IG51bGwsXG4gICAgYm06IG51bGwsXG4gICAgbTogbnVsbCxcbiAgICBidTogbnVsbCxcbiAgICB1OiBudWxsLFxuICAgIHVtOiBudWxsLFxuICAgIGJ1bTogbnVsbCxcbiAgICBkYTogbnVsbCxcbiAgICBhOiBudWxsLFxuICAgIHJ0ZzogbnVsbCxcbiAgICBydGM6IG51bGwsXG4gICAgZWM6IG51bGwsXG4gICAgc3A6IG51bGxcbiAgfTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBpbnN0YW5jZS5jdHggPSBjcmVhdGVEZXZSZW5kZXJDb250ZXh0KGluc3RhbmNlKTtcbiAgfSBlbHNlIHtcbiAgICBpbnN0YW5jZS5jdHggPSB7IF86IGluc3RhbmNlIH07XG4gIH1cbiAgaW5zdGFuY2Uucm9vdCA9IHBhcmVudCA/IHBhcmVudC5yb290IDogaW5zdGFuY2U7XG4gIGluc3RhbmNlLmVtaXQgPSBlbWl0LmJpbmQobnVsbCwgaW5zdGFuY2UpO1xuICBpZiAodm5vZGUuY2UpIHtcbiAgICB2bm9kZS5jZShpbnN0YW5jZSk7XG4gIH1cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxubGV0IGN1cnJlbnRJbnN0YW5jZSA9IG51bGw7XG5jb25zdCBnZXRDdXJyZW50SW5zdGFuY2UgPSAoKSA9PiBjdXJyZW50SW5zdGFuY2UgfHwgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlO1xubGV0IGludGVybmFsU2V0Q3VycmVudEluc3RhbmNlO1xubGV0IHNldEluU1NSU2V0dXBTdGF0ZTtcbntcbiAgY29uc3QgZyA9IGdldEdsb2JhbFRoaXMoKTtcbiAgY29uc3QgcmVnaXN0ZXJHbG9iYWxTZXR0ZXIgPSAoa2V5LCBzZXR0ZXIpID0+IHtcbiAgICBsZXQgc2V0dGVycztcbiAgICBpZiAoIShzZXR0ZXJzID0gZ1trZXldKSkgc2V0dGVycyA9IGdba2V5XSA9IFtdO1xuICAgIHNldHRlcnMucHVzaChzZXR0ZXIpO1xuICAgIHJldHVybiAodikgPT4ge1xuICAgICAgaWYgKHNldHRlcnMubGVuZ3RoID4gMSkgc2V0dGVycy5mb3JFYWNoKChzZXQpID0+IHNldCh2KSk7XG4gICAgICBlbHNlIHNldHRlcnNbMF0odik7XG4gICAgfTtcbiAgfTtcbiAgaW50ZXJuYWxTZXRDdXJyZW50SW5zdGFuY2UgPSByZWdpc3Rlckdsb2JhbFNldHRlcihcbiAgICBgX19WVUVfSU5TVEFOQ0VfU0VUVEVSU19fYCxcbiAgICAodikgPT4gY3VycmVudEluc3RhbmNlID0gdlxuICApO1xuICBzZXRJblNTUlNldHVwU3RhdGUgPSByZWdpc3Rlckdsb2JhbFNldHRlcihcbiAgICBgX19WVUVfU1NSX1NFVFRFUlNfX2AsXG4gICAgKHYpID0+IGlzSW5TU1JDb21wb25lbnRTZXR1cCA9IHZcbiAgKTtcbn1cbmNvbnN0IHNldEN1cnJlbnRJbnN0YW5jZSA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBwcmV2ID0gY3VycmVudEluc3RhbmNlO1xuICBpbnRlcm5hbFNldEN1cnJlbnRJbnN0YW5jZShpbnN0YW5jZSk7XG4gIGluc3RhbmNlLnNjb3BlLm9uKCk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgaW5zdGFuY2Uuc2NvcGUub2ZmKCk7XG4gICAgaW50ZXJuYWxTZXRDdXJyZW50SW5zdGFuY2UocHJldik7XG4gIH07XG59O1xuY29uc3QgdW5zZXRDdXJyZW50SW5zdGFuY2UgPSAoKSA9PiB7XG4gIGN1cnJlbnRJbnN0YW5jZSAmJiBjdXJyZW50SW5zdGFuY2Uuc2NvcGUub2ZmKCk7XG4gIGludGVybmFsU2V0Q3VycmVudEluc3RhbmNlKG51bGwpO1xufTtcbmNvbnN0IGlzQnVpbHRJblRhZyA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKFwic2xvdCxjb21wb25lbnRcIik7XG5mdW5jdGlvbiB2YWxpZGF0ZUNvbXBvbmVudE5hbWUobmFtZSwgeyBpc05hdGl2ZVRhZyB9KSB7XG4gIGlmIChpc0J1aWx0SW5UYWcobmFtZSkgfHwgaXNOYXRpdmVUYWcobmFtZSkpIHtcbiAgICB3YXJuJDEoXG4gICAgICBcIkRvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgaWQ6IFwiICsgbmFtZVxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzU3RhdGVmdWxDb21wb25lbnQoaW5zdGFuY2UpIHtcbiAgcmV0dXJuIGluc3RhbmNlLnZub2RlLnNoYXBlRmxhZyAmIDQ7XG59XG5sZXQgaXNJblNTUkNvbXBvbmVudFNldHVwID0gZmFsc2U7XG5mdW5jdGlvbiBzZXR1cENvbXBvbmVudChpbnN0YW5jZSwgaXNTU1IgPSBmYWxzZSwgb3B0aW1pemVkID0gZmFsc2UpIHtcbiAgaXNTU1IgJiYgc2V0SW5TU1JTZXR1cFN0YXRlKGlzU1NSKTtcbiAgY29uc3QgeyBwcm9wcywgY2hpbGRyZW4gfSA9IGluc3RhbmNlLnZub2RlO1xuICBjb25zdCBpc1N0YXRlZnVsID0gaXNTdGF0ZWZ1bENvbXBvbmVudChpbnN0YW5jZSk7XG4gIGluaXRQcm9wcyhpbnN0YW5jZSwgcHJvcHMsIGlzU3RhdGVmdWwsIGlzU1NSKTtcbiAgaW5pdFNsb3RzKGluc3RhbmNlLCBjaGlsZHJlbiwgb3B0aW1pemVkKTtcbiAgY29uc3Qgc2V0dXBSZXN1bHQgPSBpc1N0YXRlZnVsID8gc2V0dXBTdGF0ZWZ1bENvbXBvbmVudChpbnN0YW5jZSwgaXNTU1IpIDogdm9pZCAwO1xuICBpc1NTUiAmJiBzZXRJblNTUlNldHVwU3RhdGUoZmFsc2UpO1xuICByZXR1cm4gc2V0dXBSZXN1bHQ7XG59XG5mdW5jdGlvbiBzZXR1cFN0YXRlZnVsQ29tcG9uZW50KGluc3RhbmNlLCBpc1NTUikge1xuICB2YXIgX2E7XG4gIGNvbnN0IENvbXBvbmVudCA9IGluc3RhbmNlLnR5cGU7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgaWYgKENvbXBvbmVudC5uYW1lKSB7XG4gICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoQ29tcG9uZW50Lm5hbWUsIGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnKTtcbiAgICB9XG4gICAgaWYgKENvbXBvbmVudC5jb21wb25lbnRzKSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKENvbXBvbmVudC5jb21wb25lbnRzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKG5hbWVzW2ldLCBpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChDb21wb25lbnQuZGlyZWN0aXZlcykge1xuICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhDb21wb25lbnQuZGlyZWN0aXZlcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlRGlyZWN0aXZlTmFtZShuYW1lc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChDb21wb25lbnQuY29tcGlsZXJPcHRpb25zICYmIGlzUnVudGltZU9ubHkoKSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgXCJjb21waWxlck9wdGlvbnNcIiBpcyBvbmx5IHN1cHBvcnRlZCB3aGVuIHVzaW5nIGEgYnVpbGQgb2YgVnVlIHRoYXQgaW5jbHVkZXMgdGhlIHJ1bnRpbWUgY29tcGlsZXIuIFNpbmNlIHlvdSBhcmUgdXNpbmcgYSBydW50aW1lLW9ubHkgYnVpbGQsIHRoZSBvcHRpb25zIHNob3VsZCBiZSBwYXNzZWQgdmlhIHlvdXIgYnVpbGQgdG9vbCBjb25maWcgaW5zdGVhZC5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBpbnN0YW5jZS5hY2Nlc3NDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBpbnN0YW5jZS5wcm94eSA9IG5ldyBQcm94eShpbnN0YW5jZS5jdHgsIFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycyk7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgZXhwb3NlUHJvcHNPblJlbmRlckNvbnRleHQoaW5zdGFuY2UpO1xuICB9XG4gIGNvbnN0IHsgc2V0dXAgfSA9IENvbXBvbmVudDtcbiAgaWYgKHNldHVwKSB7XG4gICAgY29uc3Qgc2V0dXBDb250ZXh0ID0gaW5zdGFuY2Uuc2V0dXBDb250ZXh0ID0gc2V0dXAubGVuZ3RoID4gMSA/IGNyZWF0ZVNldHVwQ29udGV4dChpbnN0YW5jZSkgOiBudWxsO1xuICAgIGNvbnN0IHJlc2V0ID0gc2V0Q3VycmVudEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgY29uc3Qgc2V0dXBSZXN1bHQgPSBjYWxsV2l0aEVycm9ySGFuZGxpbmcoXG4gICAgICBzZXR1cCxcbiAgICAgIGluc3RhbmNlLFxuICAgICAgMCxcbiAgICAgIFtcbiAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShpbnN0YW5jZS5wcm9wcykgOiBpbnN0YW5jZS5wcm9wcyxcbiAgICAgICAgc2V0dXBDb250ZXh0XG4gICAgICBdXG4gICAgKTtcbiAgICByZXNldFRyYWNraW5nKCk7XG4gICAgcmVzZXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHNldHVwUmVzdWx0KSkge1xuICAgICAgc2V0dXBSZXN1bHQudGhlbih1bnNldEN1cnJlbnRJbnN0YW5jZSwgdW5zZXRDdXJyZW50SW5zdGFuY2UpO1xuICAgICAgaWYgKGlzU1NSKSB7XG4gICAgICAgIHJldHVybiBzZXR1cFJlc3VsdC50aGVuKChyZXNvbHZlZFJlc3VsdCkgPT4ge1xuICAgICAgICAgIGhhbmRsZVNldHVwUmVzdWx0KGluc3RhbmNlLCByZXNvbHZlZFJlc3VsdCwgaXNTU1IpO1xuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIGluc3RhbmNlLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0YW5jZS5hc3luY0RlcCA9IHNldHVwUmVzdWx0O1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaW5zdGFuY2Uuc3VzcGVuc2UpIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gKF9hID0gQ29tcG9uZW50Lm5hbWUpICE9IG51bGwgPyBfYSA6IFwiQW5vbnltb3VzXCI7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYENvbXBvbmVudCA8JHtuYW1lfT46IHNldHVwIGZ1bmN0aW9uIHJldHVybmVkIGEgcHJvbWlzZSwgYnV0IG5vIDxTdXNwZW5zZT4gYm91bmRhcnkgd2FzIGZvdW5kIGluIHRoZSBwYXJlbnQgY29tcG9uZW50IHRyZWUuIEEgY29tcG9uZW50IHdpdGggYXN5bmMgc2V0dXAoKSBtdXN0IGJlIG5lc3RlZCBpbiBhIDxTdXNwZW5zZT4gaW4gb3JkZXIgdG8gYmUgcmVuZGVyZWQuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlU2V0dXBSZXN1bHQoaW5zdGFuY2UsIHNldHVwUmVzdWx0LCBpc1NTUik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZpbmlzaENvbXBvbmVudFNldHVwKGluc3RhbmNlLCBpc1NTUik7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZVNldHVwUmVzdWx0KGluc3RhbmNlLCBzZXR1cFJlc3VsdCwgaXNTU1IpIHtcbiAgaWYgKGlzRnVuY3Rpb24oc2V0dXBSZXN1bHQpKSB7XG4gICAgaWYgKGluc3RhbmNlLnR5cGUuX19zc3JJbmxpbmVSZW5kZXIpIHtcbiAgICAgIGluc3RhbmNlLnNzclJlbmRlciA9IHNldHVwUmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS5yZW5kZXIgPSBzZXR1cFJlc3VsdDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2V0dXBSZXN1bHQpKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNWTm9kZShzZXR1cFJlc3VsdCkpIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYHNldHVwKCkgc2hvdWxkIG5vdCByZXR1cm4gVk5vZGVzIGRpcmVjdGx5IC0gcmV0dXJuIGEgcmVuZGVyIGZ1bmN0aW9uIGluc3RlYWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBpbnN0YW5jZS5kZXZ0b29sc1Jhd1NldHVwU3RhdGUgPSBzZXR1cFJlc3VsdDtcbiAgICB9XG4gICAgaW5zdGFuY2Uuc2V0dXBTdGF0ZSA9IHByb3h5UmVmcyhzZXR1cFJlc3VsdCk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIGV4cG9zZVNldHVwU3RhdGVPblJlbmRlckNvbnRleHQoaW5zdGFuY2UpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldHVwUmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICB3YXJuJDEoXG4gICAgICBgc2V0dXAoKSBzaG91bGQgcmV0dXJuIGFuIG9iamVjdC4gUmVjZWl2ZWQ6ICR7c2V0dXBSZXN1bHQgPT09IG51bGwgPyBcIm51bGxcIiA6IHR5cGVvZiBzZXR1cFJlc3VsdH1gXG4gICAgKTtcbiAgfVxuICBmaW5pc2hDb21wb25lbnRTZXR1cChpbnN0YW5jZSwgaXNTU1IpO1xufVxubGV0IGNvbXBpbGU7XG5sZXQgaW5zdGFsbFdpdGhQcm94eTtcbmZ1bmN0aW9uIHJlZ2lzdGVyUnVudGltZUNvbXBpbGVyKF9jb21waWxlKSB7XG4gIGNvbXBpbGUgPSBfY29tcGlsZTtcbiAgaW5zdGFsbFdpdGhQcm94eSA9IChpKSA9PiB7XG4gICAgaWYgKGkucmVuZGVyLl9yYykge1xuICAgICAgaS53aXRoUHJveHkgPSBuZXcgUHJveHkoaS5jdHgsIFJ1bnRpbWVDb21waWxlZFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycyk7XG4gICAgfVxuICB9O1xufVxuY29uc3QgaXNSdW50aW1lT25seSA9ICgpID0+ICFjb21waWxlO1xuZnVuY3Rpb24gZmluaXNoQ29tcG9uZW50U2V0dXAoaW5zdGFuY2UsIGlzU1NSLCBza2lwT3B0aW9ucykge1xuICBjb25zdCBDb21wb25lbnQgPSBpbnN0YW5jZS50eXBlO1xuICBpZiAoIWluc3RhbmNlLnJlbmRlcikge1xuICAgIGlmICghaXNTU1IgJiYgY29tcGlsZSAmJiAhQ29tcG9uZW50LnJlbmRlcikge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBDb21wb25lbnQudGVtcGxhdGUgfHwgcmVzb2x2ZU1lcmdlZE9wdGlvbnMoaW5zdGFuY2UpLnRlbXBsYXRlO1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgc3RhcnRNZWFzdXJlKGluc3RhbmNlLCBgY29tcGlsZWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgaXNDdXN0b21FbGVtZW50LCBjb21waWxlck9wdGlvbnMgfSA9IGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnO1xuICAgICAgICBjb25zdCB7IGRlbGltaXRlcnMsIGNvbXBpbGVyT3B0aW9uczogY29tcG9uZW50Q29tcGlsZXJPcHRpb25zIH0gPSBDb21wb25lbnQ7XG4gICAgICAgIGNvbnN0IGZpbmFsQ29tcGlsZXJPcHRpb25zID0gZXh0ZW5kKFxuICAgICAgICAgIGV4dGVuZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXNDdXN0b21FbGVtZW50LFxuICAgICAgICAgICAgICBkZWxpbWl0ZXJzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGlsZXJPcHRpb25zXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjb21wb25lbnRDb21waWxlck9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgQ29tcG9uZW50LnJlbmRlciA9IGNvbXBpbGUodGVtcGxhdGUsIGZpbmFsQ29tcGlsZXJPcHRpb25zKTtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBlbmRNZWFzdXJlKGluc3RhbmNlLCBgY29tcGlsZWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLnJlbmRlciA9IENvbXBvbmVudC5yZW5kZXIgfHwgTk9PUDtcbiAgICBpZiAoaW5zdGFsbFdpdGhQcm94eSkge1xuICAgICAgaW5zdGFsbFdpdGhQcm94eShpbnN0YW5jZSk7XG4gICAgfVxuICB9XG4gIGlmIChfX1ZVRV9PUFRJT05TX0FQSV9fICYmIHRydWUpIHtcbiAgICBjb25zdCByZXNldCA9IHNldEN1cnJlbnRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgcGF1c2VUcmFja2luZygpO1xuICAgIHRyeSB7XG4gICAgICBhcHBseU9wdGlvbnMoaW5zdGFuY2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICByZXNldFRyYWNraW5nKCk7XG4gICAgICByZXNldCgpO1xuICAgIH1cbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhQ29tcG9uZW50LnJlbmRlciAmJiBpbnN0YW5jZS5yZW5kZXIgPT09IE5PT1AgJiYgIWlzU1NSKSB7XG4gICAgaWYgKCFjb21waWxlICYmIENvbXBvbmVudC50ZW1wbGF0ZSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgQ29tcG9uZW50IHByb3ZpZGVkIHRlbXBsYXRlIG9wdGlvbiBidXQgcnVudGltZSBjb21waWxhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnVpbGQgb2YgVnVlLmAgKyAoYCBDb25maWd1cmUgeW91ciBidW5kbGVyIHRvIGFsaWFzIFwidnVlXCIgdG8gXCJ2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanNcIi5gIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4kMShgQ29tcG9uZW50IGlzIG1pc3NpbmcgdGVtcGxhdGUgb3IgcmVuZGVyIGZ1bmN0aW9uOiBgLCBDb21wb25lbnQpO1xuICAgIH1cbiAgfVxufVxuY29uc3QgYXR0cnNQcm94eUhhbmRsZXJzID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHtcbiAgZ2V0KHRhcmdldCwga2V5KSB7XG4gICAgbWFya0F0dHJzQWNjZXNzZWQoKTtcbiAgICB0cmFjayh0YXJnZXQsIFwiZ2V0XCIsIFwiXCIpO1xuICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgfSxcbiAgc2V0KCkge1xuICAgIHdhcm4kMShgc2V0dXBDb250ZXh0LmF0dHJzIGlzIHJlYWRvbmx5LmApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZGVsZXRlUHJvcGVydHkoKSB7XG4gICAgd2FybiQxKGBzZXR1cENvbnRleHQuYXR0cnMgaXMgcmVhZG9ubHkuYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59IDoge1xuICBnZXQodGFyZ2V0LCBrZXkpIHtcbiAgICB0cmFjayh0YXJnZXQsIFwiZ2V0XCIsIFwiXCIpO1xuICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgfVxufTtcbmZ1bmN0aW9uIGdldFNsb3RzUHJveHkoaW5zdGFuY2UpIHtcbiAgcmV0dXJuIG5ldyBQcm94eShpbnN0YW5jZS5zbG90cywge1xuICAgIGdldCh0YXJnZXQsIGtleSkge1xuICAgICAgdHJhY2soaW5zdGFuY2UsIFwiZ2V0XCIsIFwiJHNsb3RzXCIpO1xuICAgICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTZXR1cENvbnRleHQoaW5zdGFuY2UpIHtcbiAgY29uc3QgZXhwb3NlID0gKGV4cG9zZWQpID0+IHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgaWYgKGluc3RhbmNlLmV4cG9zZWQpIHtcbiAgICAgICAgd2FybiQxKGBleHBvc2UoKSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZSBwZXIgc2V0dXAoKS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHBvc2VkICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGV4cG9zZWRUeXBlID0gdHlwZW9mIGV4cG9zZWQ7XG4gICAgICAgIGlmIChleHBvc2VkVHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChpc0FycmF5KGV4cG9zZWQpKSB7XG4gICAgICAgICAgICBleHBvc2VkVHlwZSA9IFwiYXJyYXlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzUmVmKGV4cG9zZWQpKSB7XG4gICAgICAgICAgICBleHBvc2VkVHlwZSA9IFwicmVmXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChleHBvc2VkVHlwZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBleHBvc2UoKSBzaG91bGQgYmUgcGFzc2VkIGEgcGxhaW4gb2JqZWN0LCByZWNlaXZlZCAke2V4cG9zZWRUeXBlfS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5leHBvc2VkID0gZXhwb3NlZCB8fCB7fTtcbiAgfTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBsZXQgYXR0cnNQcm94eTtcbiAgICBsZXQgc2xvdHNQcm94eTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBnZXQgYXR0cnMoKSB7XG4gICAgICAgIHJldHVybiBhdHRyc1Byb3h5IHx8IChhdHRyc1Byb3h5ID0gbmV3IFByb3h5KGluc3RhbmNlLmF0dHJzLCBhdHRyc1Byb3h5SGFuZGxlcnMpKTtcbiAgICAgIH0sXG4gICAgICBnZXQgc2xvdHMoKSB7XG4gICAgICAgIHJldHVybiBzbG90c1Byb3h5IHx8IChzbG90c1Byb3h5ID0gZ2V0U2xvdHNQcm94eShpbnN0YW5jZSkpO1xuICAgICAgfSxcbiAgICAgIGdldCBlbWl0KCkge1xuICAgICAgICByZXR1cm4gKGV2ZW50LCAuLi5hcmdzKSA9PiBpbnN0YW5jZS5lbWl0KGV2ZW50LCAuLi5hcmdzKTtcbiAgICAgIH0sXG4gICAgICBleHBvc2VcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXR0cnM6IG5ldyBQcm94eShpbnN0YW5jZS5hdHRycywgYXR0cnNQcm94eUhhbmRsZXJzKSxcbiAgICAgIHNsb3RzOiBpbnN0YW5jZS5zbG90cyxcbiAgICAgIGVtaXQ6IGluc3RhbmNlLmVtaXQsXG4gICAgICBleHBvc2VcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZShpbnN0YW5jZSkge1xuICBpZiAoaW5zdGFuY2UuZXhwb3NlZCkge1xuICAgIHJldHVybiBpbnN0YW5jZS5leHBvc2VQcm94eSB8fCAoaW5zdGFuY2UuZXhwb3NlUHJveHkgPSBuZXcgUHJveHkocHJveHlSZWZzKG1hcmtSYXcoaW5zdGFuY2UuZXhwb3NlZCkpLCB7XG4gICAgICBnZXQodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5IGluIHB1YmxpY1Byb3BlcnRpZXNNYXApIHtcbiAgICAgICAgICByZXR1cm4gcHVibGljUHJvcGVydGllc01hcFtrZXldKGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhcyh0YXJnZXQsIGtleSkge1xuICAgICAgICByZXR1cm4ga2V5IGluIHRhcmdldCB8fCBrZXkgaW4gcHVibGljUHJvcGVydGllc01hcDtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLnByb3h5O1xuICB9XG59XG5jb25zdCBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nO1xuY29uc3QgY2xhc3NpZnkgPSAoc3RyKSA9PiBzdHIucmVwbGFjZShjbGFzc2lmeVJFLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpKS5yZXBsYWNlKC9bLV9dL2csIFwiXCIpO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQsIGluY2x1ZGVJbmZlcnJlZCA9IHRydWUpIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24oQ29tcG9uZW50KSA/IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSA6IENvbXBvbmVudC5uYW1lIHx8IGluY2x1ZGVJbmZlcnJlZCAmJiBDb21wb25lbnQuX19uYW1lO1xufVxuZnVuY3Rpb24gZm9ybWF0Q29tcG9uZW50TmFtZShpbnN0YW5jZSwgQ29tcG9uZW50LCBpc1Jvb3QgPSBmYWxzZSkge1xuICBsZXQgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KTtcbiAgaWYgKCFuYW1lICYmIENvbXBvbmVudC5fX2ZpbGUpIHtcbiAgICBjb25zdCBtYXRjaCA9IENvbXBvbmVudC5fX2ZpbGUubWF0Y2goLyhbXi9cXFxcXSspXFwuXFx3KyQvKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIG5hbWUgPSBtYXRjaFsxXTtcbiAgICB9XG4gIH1cbiAgaWYgKCFuYW1lICYmIGluc3RhbmNlICYmIGluc3RhbmNlLnBhcmVudCkge1xuICAgIGNvbnN0IGluZmVyRnJvbVJlZ2lzdHJ5ID0gKHJlZ2lzdHJ5KSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiByZWdpc3RyeSkge1xuICAgICAgICBpZiAocmVnaXN0cnlba2V5XSA9PT0gQ29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgbmFtZSA9IGluZmVyRnJvbVJlZ2lzdHJ5KFxuICAgICAgaW5zdGFuY2UuY29tcG9uZW50cyB8fCBpbnN0YW5jZS5wYXJlbnQudHlwZS5jb21wb25lbnRzXG4gICAgKSB8fCBpbmZlckZyb21SZWdpc3RyeShpbnN0YW5jZS5hcHBDb250ZXh0LmNvbXBvbmVudHMpO1xuICB9XG4gIHJldHVybiBuYW1lID8gY2xhc3NpZnkobmFtZSkgOiBpc1Jvb3QgPyBgQXBwYCA6IGBBbm9ueW1vdXNgO1xufVxuZnVuY3Rpb24gaXNDbGFzc0NvbXBvbmVudCh2YWx1ZSkge1xuICByZXR1cm4gaXNGdW5jdGlvbih2YWx1ZSkgJiYgXCJfX3ZjY09wdHNcIiBpbiB2YWx1ZTtcbn1cblxuY29uc3QgY29tcHV0ZWQgPSAoZ2V0dGVyT3JPcHRpb25zLCBkZWJ1Z09wdGlvbnMpID0+IHtcbiAgY29uc3QgYyA9IGNvbXB1dGVkJDEoZ2V0dGVyT3JPcHRpb25zLCBkZWJ1Z09wdGlvbnMsIGlzSW5TU1JDb21wb25lbnRTZXR1cCk7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3QgaSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGlmIChpICYmIGkuYXBwQ29udGV4dC5jb25maWcud2FyblJlY3Vyc2l2ZUNvbXB1dGVkKSB7XG4gICAgICBjLl93YXJuUmVjdXJzaXZlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGM7XG59O1xuXG5mdW5jdGlvbiBoKHR5cGUsIHByb3BzT3JDaGlsZHJlbiwgY2hpbGRyZW4pIHtcbiAgY29uc3QgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIGlmIChsID09PSAyKSB7XG4gICAgaWYgKGlzT2JqZWN0KHByb3BzT3JDaGlsZHJlbikgJiYgIWlzQXJyYXkocHJvcHNPckNoaWxkcmVuKSkge1xuICAgICAgaWYgKGlzVk5vZGUocHJvcHNPckNoaWxkcmVuKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlVk5vZGUodHlwZSwgbnVsbCwgW3Byb3BzT3JDaGlsZHJlbl0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNyZWF0ZVZOb2RlKHR5cGUsIHByb3BzT3JDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjcmVhdGVWTm9kZSh0eXBlLCBudWxsLCBwcm9wc09yQ2hpbGRyZW4pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobCA+IDMpIHtcbiAgICAgIGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB9IGVsc2UgaWYgKGwgPT09IDMgJiYgaXNWTm9kZShjaGlsZHJlbikpIHtcbiAgICAgIGNoaWxkcmVuID0gW2NoaWxkcmVuXTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVZOb2RlKHR5cGUsIHByb3BzT3JDaGlsZHJlbiwgY2hpbGRyZW4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRDdXN0b21Gb3JtYXR0ZXIoKSB7XG4gIGlmICghISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHZ1ZVN0eWxlID0geyBzdHlsZTogXCJjb2xvcjojM2JhNzc2XCIgfTtcbiAgY29uc3QgbnVtYmVyU3R5bGUgPSB7IHN0eWxlOiBcImNvbG9yOiMxNjc3ZmZcIiB9O1xuICBjb25zdCBzdHJpbmdTdHlsZSA9IHsgc3R5bGU6IFwiY29sb3I6I2Y1MjIyZFwiIH07XG4gIGNvbnN0IGtleXdvcmRTdHlsZSA9IHsgc3R5bGU6IFwiY29sb3I6I2ViMmY5NlwiIH07XG4gIGNvbnN0IGZvcm1hdHRlciA9IHtcbiAgICBfX3Z1ZV9jdXN0b21fZm9ybWF0dGVyOiB0cnVlLFxuICAgIGhlYWRlcihvYmopIHtcbiAgICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChvYmouX19pc1Z1ZSkge1xuICAgICAgICByZXR1cm4gW1wiZGl2XCIsIHZ1ZVN0eWxlLCBgVnVlSW5zdGFuY2VgXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNSZWYob2JqKSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge30sXG4gICAgICAgICAgW1wic3BhblwiLCB2dWVTdHlsZSwgZ2VuUmVmRmxhZyhvYmopXSxcbiAgICAgICAgICBcIjxcIixcbiAgICAgICAgICBmb3JtYXRWYWx1ZShvYmoudmFsdWUpLFxuICAgICAgICAgIGA+YFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlYWN0aXZlKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIFtcInNwYW5cIiwgdnVlU3R5bGUsIGlzU2hhbGxvdyhvYmopID8gXCJTaGFsbG93UmVhY3RpdmVcIiA6IFwiUmVhY3RpdmVcIl0sXG4gICAgICAgICAgXCI8XCIsXG4gICAgICAgICAgZm9ybWF0VmFsdWUob2JqKSxcbiAgICAgICAgICBgPiR7aXNSZWFkb25seShvYmopID8gYCAocmVhZG9ubHkpYCA6IGBgfWBcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNSZWFkb25seShvYmopKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBbXCJzcGFuXCIsIHZ1ZVN0eWxlLCBpc1NoYWxsb3cob2JqKSA/IFwiU2hhbGxvd1JlYWRvbmx5XCIgOiBcIlJlYWRvbmx5XCJdLFxuICAgICAgICAgIFwiPFwiLFxuICAgICAgICAgIGZvcm1hdFZhbHVlKG9iaiksXG4gICAgICAgICAgXCI+XCJcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgaGFzQm9keShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLl9faXNWdWU7XG4gICAgfSxcbiAgICBib2R5KG9iaikge1xuICAgICAgaWYgKG9iaiAmJiBvYmouX19pc1Z1ZSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge30sXG4gICAgICAgICAgLi4uZm9ybWF0SW5zdGFuY2Uob2JqLiQpXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBmb3JtYXRJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuICAgIGlmIChpbnN0YW5jZS50eXBlLnByb3BzICYmIGluc3RhbmNlLnByb3BzKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwicHJvcHNcIiwgdG9SYXcoaW5zdGFuY2UucHJvcHMpKSk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5zZXR1cFN0YXRlICE9PSBFTVBUWV9PQkopIHtcbiAgICAgIGJsb2Nrcy5wdXNoKGNyZWF0ZUluc3RhbmNlQmxvY2soXCJzZXR1cFwiLCBpbnN0YW5jZS5zZXR1cFN0YXRlKSk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5kYXRhICE9PSBFTVBUWV9PQkopIHtcbiAgICAgIGJsb2Nrcy5wdXNoKGNyZWF0ZUluc3RhbmNlQmxvY2soXCJkYXRhXCIsIHRvUmF3KGluc3RhbmNlLmRhdGEpKSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXB1dGVkID0gZXh0cmFjdEtleXMoaW5zdGFuY2UsIFwiY29tcHV0ZWRcIik7XG4gICAgaWYgKGNvbXB1dGVkKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwiY29tcHV0ZWRcIiwgY29tcHV0ZWQpKTtcbiAgICB9XG4gICAgY29uc3QgaW5qZWN0ZWQgPSBleHRyYWN0S2V5cyhpbnN0YW5jZSwgXCJpbmplY3RcIik7XG4gICAgaWYgKGluamVjdGVkKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwiaW5qZWN0ZWRcIiwgaW5qZWN0ZWQpKTtcbiAgICB9XG4gICAgYmxvY2tzLnB1c2goW1xuICAgICAgXCJkaXZcIixcbiAgICAgIHt9LFxuICAgICAgW1xuICAgICAgICBcInNwYW5cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiBrZXl3b3JkU3R5bGUuc3R5bGUgKyBcIjtvcGFjaXR5OjAuNjZcIlxuICAgICAgICB9LFxuICAgICAgICBcIiQgKGludGVybmFsKTogXCJcbiAgICAgIF0sXG4gICAgICBbXCJvYmplY3RcIiwgeyBvYmplY3Q6IGluc3RhbmNlIH1dXG4gICAgXSk7XG4gICAgcmV0dXJuIGJsb2NrcztcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZUJsb2NrKHR5cGUsIHRhcmdldCkge1xuICAgIHRhcmdldCA9IGV4dGVuZCh7fSwgdGFyZ2V0KTtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHRhcmdldCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCB7fV07XG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdHlsZTogXCJsaW5lLWhlaWdodDoxLjI1ZW07bWFyZ2luLWJvdHRvbTowLjZlbVwiIH0sXG4gICAgICBbXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdHlsZTogXCJjb2xvcjojNDc2NTgyXCJcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiBcInBhZGRpbmctbGVmdDoxLjI1ZW1cIlxuICAgICAgICB9LFxuICAgICAgICAuLi5PYmplY3Qua2V5cyh0YXJnZXQpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIFtcInNwYW5cIiwga2V5d29yZFN0eWxlLCBrZXkgKyBcIjogXCJdLFxuICAgICAgICAgICAgZm9ybWF0VmFsdWUodGFyZ2V0W2tleV0sIGZhbHNlKVxuICAgICAgICAgIF07XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgXTtcbiAgfVxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2LCBhc1JhdyA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBbXCJzcGFuXCIsIG51bWJlclN0eWxlLCB2XTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBzdHJpbmdTdHlsZSwgSlNPTi5zdHJpbmdpZnkodildO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBrZXl3b3JkU3R5bGUsIHZdO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodikpIHtcbiAgICAgIHJldHVybiBbXCJvYmplY3RcIiwgeyBvYmplY3Q6IGFzUmF3ID8gdG9SYXcodikgOiB2IH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBzdHJpbmdTdHlsZSwgU3RyaW5nKHYpXTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZXh0cmFjdEtleXMoaW5zdGFuY2UsIHR5cGUpIHtcbiAgICBjb25zdCBDb21wID0gaW5zdGFuY2UudHlwZTtcbiAgICBpZiAoaXNGdW5jdGlvbihDb21wKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBleHRyYWN0ZWQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0YW5jZS5jdHgpIHtcbiAgICAgIGlmIChpc0tleU9mVHlwZShDb21wLCBrZXksIHR5cGUpKSB7XG4gICAgICAgIGV4dHJhY3RlZFtrZXldID0gaW5zdGFuY2UuY3R4W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleHRyYWN0ZWQ7XG4gIH1cbiAgZnVuY3Rpb24gaXNLZXlPZlR5cGUoQ29tcCwga2V5LCB0eXBlKSB7XG4gICAgY29uc3Qgb3B0cyA9IENvbXBbdHlwZV07XG4gICAgaWYgKGlzQXJyYXkob3B0cykgJiYgb3B0cy5pbmNsdWRlcyhrZXkpIHx8IGlzT2JqZWN0KG9wdHMpICYmIGtleSBpbiBvcHRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKENvbXAuZXh0ZW5kcyAmJiBpc0tleU9mVHlwZShDb21wLmV4dGVuZHMsIGtleSwgdHlwZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoQ29tcC5taXhpbnMgJiYgQ29tcC5taXhpbnMuc29tZSgobSkgPT4gaXNLZXlPZlR5cGUobSwga2V5LCB0eXBlKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBnZW5SZWZGbGFnKHYpIHtcbiAgICBpZiAoaXNTaGFsbG93KHYpKSB7XG4gICAgICByZXR1cm4gYFNoYWxsb3dSZWZgO1xuICAgIH1cbiAgICBpZiAodi5lZmZlY3QpIHtcbiAgICAgIHJldHVybiBgQ29tcHV0ZWRSZWZgO1xuICAgIH1cbiAgICByZXR1cm4gYFJlZmA7XG4gIH1cbiAgaWYgKHdpbmRvdy5kZXZ0b29sc0Zvcm1hdHRlcnMpIHtcbiAgICB3aW5kb3cuZGV2dG9vbHNGb3JtYXR0ZXJzLnB1c2goZm9ybWF0dGVyKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuZGV2dG9vbHNGb3JtYXR0ZXJzID0gW2Zvcm1hdHRlcl07XG4gIH1cbn1cblxuZnVuY3Rpb24gd2l0aE1lbW8obWVtbywgcmVuZGVyLCBjYWNoZSwgaW5kZXgpIHtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGVbaW5kZXhdO1xuICBpZiAoY2FjaGVkICYmIGlzTWVtb1NhbWUoY2FjaGVkLCBtZW1vKSkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cbiAgY29uc3QgcmV0ID0gcmVuZGVyKCk7XG4gIHJldC5tZW1vID0gbWVtby5zbGljZSgpO1xuICByZXQuY2FjaGVJbmRleCA9IGluZGV4O1xuICByZXR1cm4gY2FjaGVbaW5kZXhdID0gcmV0O1xufVxuZnVuY3Rpb24gaXNNZW1vU2FtZShjYWNoZWQsIG1lbW8pIHtcbiAgY29uc3QgcHJldiA9IGNhY2hlZC5tZW1vO1xuICBpZiAocHJldi5sZW5ndGggIT0gbWVtby5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGhhc0NoYW5nZWQocHJldltpXSwgbWVtb1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQmxvY2tUcmVlRW5hYmxlZCA+IDAgJiYgY3VycmVudEJsb2NrKSB7XG4gICAgY3VycmVudEJsb2NrLnB1c2goY2FjaGVkKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgdmVyc2lvbiA9IFwiMy40LjM4XCI7XG5jb25zdCB3YXJuID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHdhcm4kMSA6IE5PT1A7XG5jb25zdCBFcnJvclR5cGVTdHJpbmdzID0gRXJyb3JUeXBlU3RyaW5ncyQxIDtcbmNvbnN0IGRldnRvb2xzID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCB0cnVlID8gZGV2dG9vbHMkMSA6IHZvaWQgMDtcbmNvbnN0IHNldERldnRvb2xzSG9vayA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgdHJ1ZSA/IHNldERldnRvb2xzSG9vayQxIDogTk9PUDtcbmNvbnN0IF9zc3JVdGlscyA9IHtcbiAgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UsXG4gIHNldHVwQ29tcG9uZW50LFxuICByZW5kZXJDb21wb25lbnRSb290LFxuICBzZXRDdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UsXG4gIGlzVk5vZGU6IGlzVk5vZGUsXG4gIG5vcm1hbGl6ZVZOb2RlLFxuICBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZSxcbiAgZW5zdXJlVmFsaWRWTm9kZVxufTtcbmNvbnN0IHNzclV0aWxzID0gX3NzclV0aWxzIDtcbmNvbnN0IHJlc29sdmVGaWx0ZXIgPSBudWxsO1xuY29uc3QgY29tcGF0VXRpbHMgPSBudWxsO1xuY29uc3QgRGVwcmVjYXRpb25UeXBlcyA9IG51bGw7XG5cbmV4cG9ydCB7IEJhc2VUcmFuc2l0aW9uLCBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycywgQ29tbWVudCwgRGVwcmVjYXRpb25UeXBlcywgRXJyb3JDb2RlcywgRXJyb3JUeXBlU3RyaW5ncywgRnJhZ21lbnQsIEtlZXBBbGl2ZSwgU3RhdGljLCBTdXNwZW5zZSwgVGVsZXBvcnQsIFRleHQsIGFzc2VydE51bWJlciwgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcsIGNhbGxXaXRoRXJyb3JIYW5kbGluZywgY2xvbmVWTm9kZSwgY29tcGF0VXRpbHMsIGNvbXB1dGVkLCBjcmVhdGVCbG9jaywgY3JlYXRlQ29tbWVudFZOb2RlLCBjcmVhdGVFbGVtZW50QmxvY2ssIGNyZWF0ZUJhc2VWTm9kZSBhcyBjcmVhdGVFbGVtZW50Vk5vZGUsIGNyZWF0ZUh5ZHJhdGlvblJlbmRlcmVyLCBjcmVhdGVQcm9wc1Jlc3RQcm94eSwgY3JlYXRlUmVuZGVyZXIsIGNyZWF0ZVNsb3RzLCBjcmVhdGVTdGF0aWNWTm9kZSwgY3JlYXRlVGV4dFZOb2RlLCBjcmVhdGVWTm9kZSwgZGVmaW5lQXN5bmNDb21wb25lbnQsIGRlZmluZUNvbXBvbmVudCwgZGVmaW5lRW1pdHMsIGRlZmluZUV4cG9zZSwgZGVmaW5lTW9kZWwsIGRlZmluZU9wdGlvbnMsIGRlZmluZVByb3BzLCBkZWZpbmVTbG90cywgZGV2dG9vbHMsIGdldEN1cnJlbnRJbnN0YW5jZSwgZ2V0VHJhbnNpdGlvblJhd0NoaWxkcmVuLCBndWFyZFJlYWN0aXZlUHJvcHMsIGgsIGhhbmRsZUVycm9yLCBoYXNJbmplY3Rpb25Db250ZXh0LCBpbml0Q3VzdG9tRm9ybWF0dGVyLCBpbmplY3QsIGlzTWVtb1NhbWUsIGlzUnVudGltZU9ubHksIGlzVk5vZGUsIG1lcmdlRGVmYXVsdHMsIG1lcmdlTW9kZWxzLCBtZXJnZVByb3BzLCBuZXh0VGljaywgb25BY3RpdmF0ZWQsIG9uQmVmb3JlTW91bnQsIG9uQmVmb3JlVW5tb3VudCwgb25CZWZvcmVVcGRhdGUsIG9uRGVhY3RpdmF0ZWQsIG9uRXJyb3JDYXB0dXJlZCwgb25Nb3VudGVkLCBvblJlbmRlclRyYWNrZWQsIG9uUmVuZGVyVHJpZ2dlcmVkLCBvblNlcnZlclByZWZldGNoLCBvblVubW91bnRlZCwgb25VcGRhdGVkLCBvcGVuQmxvY2ssIHBvcFNjb3BlSWQsIHByb3ZpZGUsIHB1c2hTY29wZUlkLCBxdWV1ZVBvc3RGbHVzaENiLCByZWdpc3RlclJ1bnRpbWVDb21waWxlciwgcmVuZGVyTGlzdCwgcmVuZGVyU2xvdCwgcmVzb2x2ZUNvbXBvbmVudCwgcmVzb2x2ZURpcmVjdGl2ZSwgcmVzb2x2ZUR5bmFtaWNDb21wb25lbnQsIHJlc29sdmVGaWx0ZXIsIHJlc29sdmVUcmFuc2l0aW9uSG9va3MsIHNldEJsb2NrVHJhY2tpbmcsIHNldERldnRvb2xzSG9vaywgc2V0VHJhbnNpdGlvbkhvb2tzLCBzc3JDb250ZXh0S2V5LCBzc3JVdGlscywgdG9IYW5kbGVycywgdHJhbnNmb3JtVk5vZGVBcmdzLCB1c2VBdHRycywgdXNlTW9kZWwsIHVzZVNTUkNvbnRleHQsIHVzZVNsb3RzLCB1c2VUcmFuc2l0aW9uU3RhdGUsIHZlcnNpb24sIHdhcm4sIHdhdGNoLCB3YXRjaEVmZmVjdCwgd2F0Y2hQb3N0RWZmZWN0LCB3YXRjaFN5bmNFZmZlY3QsIHdpdGhBc3luY0NvbnRleHQsIHdpdGhDdHgsIHdpdGhEZWZhdWx0cywgd2l0aERpcmVjdGl2ZXMsIHdpdGhNZW1vLCB3aXRoU2NvcGVJZCB9O1xuIiwiLyoqXG4qIEB2dWUvcnVudGltZS1kb20gdjMuNC4zOFxuKiAoYykgMjAxOC1wcmVzZW50IFl1eGkgKEV2YW4pIFlvdSBhbmQgVnVlIGNvbnRyaWJ1dG9yc1xuKiBAbGljZW5zZSBNSVRcbioqL1xuaW1wb3J0IHsgaCwgQmFzZVRyYW5zaXRpb24sIEJhc2VUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzLCBhc3NlcnROdW1iZXIsIGdldEN1cnJlbnRJbnN0YW5jZSwgd2Fybiwgb25CZWZvcmVNb3VudCwgd2F0Y2hQb3N0RWZmZWN0LCBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCBGcmFnbWVudCwgU3RhdGljLCBjYW1lbGl6ZSwgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcsIGRlZmluZUNvbXBvbmVudCwgbmV4dFRpY2ssIGNyZWF0ZVZOb2RlLCB1c2VUcmFuc2l0aW9uU3RhdGUsIG9uVXBkYXRlZCwgdG9SYXcsIGdldFRyYW5zaXRpb25SYXdDaGlsZHJlbiwgc2V0VHJhbnNpdGlvbkhvb2tzLCByZXNvbHZlVHJhbnNpdGlvbkhvb2tzLCBpc1J1bnRpbWVPbmx5LCBjcmVhdGVSZW5kZXJlciwgY3JlYXRlSHlkcmF0aW9uUmVuZGVyZXIgfSBmcm9tICdAdnVlL3J1bnRpbWUtY29yZSc7XG5leHBvcnQgKiBmcm9tICdAdnVlL3J1bnRpbWUtY29yZSc7XG5pbXBvcnQgeyBleHRlbmQsIGlzT2JqZWN0LCB0b051bWJlciwgaXNBcnJheSwgaXNTdHJpbmcsIGh5cGhlbmF0ZSwgY2FwaXRhbGl6ZSwgaW5jbHVkZUJvb2xlYW5BdHRyLCBpc1N5bWJvbCwgaXNTcGVjaWFsQm9vbGVhbkF0dHIsIGlzRnVuY3Rpb24sIE5PT1AsIGlzT24sIGlzTW9kZWxMaXN0ZW5lciwgY2FtZWxpemUgYXMgY2FtZWxpemUkMSwgRU1QVFlfT0JKLCBsb29zZVRvTnVtYmVyLCBsb29zZUluZGV4T2YsIGlzU2V0LCBsb29zZUVxdWFsLCBpbnZva2VBcnJheUZucywgaXNIVE1MVGFnLCBpc1NWR1RhZywgaXNNYXRoTUxUYWcgfSBmcm9tICdAdnVlL3NoYXJlZCc7XG5cbmNvbnN0IHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuY29uc3QgbWF0aG1sTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjtcbmNvbnN0IGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50IDogbnVsbDtcbmNvbnN0IHRlbXBsYXRlQ29udGFpbmVyID0gZG9jICYmIC8qIEBfX1BVUkVfXyAqLyBkb2MuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuY29uc3Qgbm9kZU9wcyA9IHtcbiAgaW5zZXJ0OiAoY2hpbGQsIHBhcmVudCwgYW5jaG9yKSA9PiB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgYW5jaG9yIHx8IG51bGwpO1xuICB9LFxuICByZW1vdmU6IChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZUVsZW1lbnQ6ICh0YWcsIG5hbWVzcGFjZSwgaXMsIHByb3BzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBuYW1lc3BhY2UgPT09IFwic3ZnXCIgPyBkb2MuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCB0YWcpIDogbmFtZXNwYWNlID09PSBcIm1hdGhtbFwiID8gZG9jLmNyZWF0ZUVsZW1lbnROUyhtYXRobWxOUywgdGFnKSA6IGlzID8gZG9jLmNyZWF0ZUVsZW1lbnQodGFnLCB7IGlzIH0pIDogZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodGFnID09PSBcInNlbGVjdFwiICYmIHByb3BzICYmIHByb3BzLm11bHRpcGxlICE9IG51bGwpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIsIHByb3BzLm11bHRpcGxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBjcmVhdGVUZXh0OiAodGV4dCkgPT4gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpLFxuICBjcmVhdGVDb21tZW50OiAodGV4dCkgPT4gZG9jLmNyZWF0ZUNvbW1lbnQodGV4dCksXG4gIHNldFRleHQ6IChub2RlLCB0ZXh0KSA9PiB7XG4gICAgbm9kZS5ub2RlVmFsdWUgPSB0ZXh0O1xuICB9LFxuICBzZXRFbGVtZW50VGV4dDogKGVsLCB0ZXh0KSA9PiB7XG4gICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxuICBwYXJlbnROb2RlOiAobm9kZSkgPT4gbm9kZS5wYXJlbnROb2RlLFxuICBuZXh0U2libGluZzogKG5vZGUpID0+IG5vZGUubmV4dFNpYmxpbmcsXG4gIHF1ZXJ5U2VsZWN0b3I6IChzZWxlY3RvcikgPT4gZG9jLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLFxuICBzZXRTY29wZUlkKGVsLCBpZCkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShpZCwgXCJcIik7XG4gIH0sXG4gIC8vIF9fVU5TQUZFX19cbiAgLy8gUmVhc29uOiBpbm5lckhUTUwuXG4gIC8vIFN0YXRpYyBjb250ZW50IGhlcmUgY2FuIG9ubHkgY29tZSBmcm9tIGNvbXBpbGVkIHRlbXBsYXRlcy5cbiAgLy8gQXMgbG9uZyBhcyB0aGUgdXNlciBvbmx5IHVzZXMgdHJ1c3RlZCB0ZW1wbGF0ZXMsIHRoaXMgaXMgc2FmZS5cbiAgaW5zZXJ0U3RhdGljQ29udGVudChjb250ZW50LCBwYXJlbnQsIGFuY2hvciwgbmFtZXNwYWNlLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgYmVmb3JlID0gYW5jaG9yID8gYW5jaG9yLnByZXZpb3VzU2libGluZyA6IHBhcmVudC5sYXN0Q2hpbGQ7XG4gICAgaWYgKHN0YXJ0ICYmIChzdGFydCA9PT0gZW5kIHx8IHN0YXJ0Lm5leHRTaWJsaW5nKSkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShzdGFydC5jbG9uZU5vZGUodHJ1ZSksIGFuY2hvcik7XG4gICAgICAgIGlmIChzdGFydCA9PT0gZW5kIHx8ICEoc3RhcnQgPSBzdGFydC5uZXh0U2libGluZykpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSBuYW1lc3BhY2UgPT09IFwic3ZnXCIgPyBgPHN2Zz4ke2NvbnRlbnR9PC9zdmc+YCA6IG5hbWVzcGFjZSA9PT0gXCJtYXRobWxcIiA/IGA8bWF0aD4ke2NvbnRlbnR9PC9tYXRoPmAgOiBjb250ZW50O1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNvbnRhaW5lci5jb250ZW50O1xuICAgICAgaWYgKG5hbWVzcGFjZSA9PT0gXCJzdmdcIiB8fCBuYW1lc3BhY2UgPT09IFwibWF0aG1sXCIpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRlbXBsYXRlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlICh3cmFwcGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh3cmFwcGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlLnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xuICAgICAgfVxuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIGZpcnN0XG4gICAgICBiZWZvcmUgPyBiZWZvcmUubmV4dFNpYmxpbmcgOiBwYXJlbnQuZmlyc3RDaGlsZCxcbiAgICAgIC8vIGxhc3RcbiAgICAgIGFuY2hvciA/IGFuY2hvci5wcmV2aW91c1NpYmxpbmcgOiBwYXJlbnQubGFzdENoaWxkXG4gICAgXTtcbiAgfVxufTtcblxuY29uc3QgVFJBTlNJVElPTiA9IFwidHJhbnNpdGlvblwiO1xuY29uc3QgQU5JTUFUSU9OID0gXCJhbmltYXRpb25cIjtcbmNvbnN0IHZ0Y0tleSA9IFN5bWJvbChcIl92dGNcIik7XG5jb25zdCBUcmFuc2l0aW9uID0gKHByb3BzLCB7IHNsb3RzIH0pID0+IGgoQmFzZVRyYW5zaXRpb24sIHJlc29sdmVUcmFuc2l0aW9uUHJvcHMocHJvcHMpLCBzbG90cyk7XG5UcmFuc2l0aW9uLmRpc3BsYXlOYW1lID0gXCJUcmFuc2l0aW9uXCI7XG5jb25zdCBET01UcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzID0ge1xuICBuYW1lOiBTdHJpbmcsXG4gIHR5cGU6IFN0cmluZyxcbiAgY3NzOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIGR1cmF0aW9uOiBbU3RyaW5nLCBOdW1iZXIsIE9iamVjdF0sXG4gIGVudGVyRnJvbUNsYXNzOiBTdHJpbmcsXG4gIGVudGVyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgZW50ZXJUb0NsYXNzOiBTdHJpbmcsXG4gIGFwcGVhckZyb21DbGFzczogU3RyaW5nLFxuICBhcHBlYXJBY3RpdmVDbGFzczogU3RyaW5nLFxuICBhcHBlYXJUb0NsYXNzOiBTdHJpbmcsXG4gIGxlYXZlRnJvbUNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgbGVhdmVUb0NsYXNzOiBTdHJpbmdcbn07XG5jb25zdCBUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzID0gVHJhbnNpdGlvbi5wcm9wcyA9IC8qIEBfX1BVUkVfXyAqLyBleHRlbmQoXG4gIHt9LFxuICBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyxcbiAgRE9NVHJhbnNpdGlvblByb3BzVmFsaWRhdG9yc1xuKTtcbmNvbnN0IGNhbGxIb29rID0gKGhvb2ssIGFyZ3MgPSBbXSkgPT4ge1xuICBpZiAoaXNBcnJheShob29rKSkge1xuICAgIGhvb2suZm9yRWFjaCgoaDIpID0+IGgyKC4uLmFyZ3MpKTtcbiAgfSBlbHNlIGlmIChob29rKSB7XG4gICAgaG9vayguLi5hcmdzKTtcbiAgfVxufTtcbmNvbnN0IGhhc0V4cGxpY2l0Q2FsbGJhY2sgPSAoaG9vaykgPT4ge1xuICByZXR1cm4gaG9vayA/IGlzQXJyYXkoaG9vaykgPyBob29rLnNvbWUoKGgyKSA9PiBoMi5sZW5ndGggPiAxKSA6IGhvb2subGVuZ3RoID4gMSA6IGZhbHNlO1xufTtcbmZ1bmN0aW9uIHJlc29sdmVUcmFuc2l0aW9uUHJvcHMocmF3UHJvcHMpIHtcbiAgY29uc3QgYmFzZVByb3BzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHJhd1Byb3BzKSB7XG4gICAgaWYgKCEoa2V5IGluIERPTVRyYW5zaXRpb25Qcm9wc1ZhbGlkYXRvcnMpKSB7XG4gICAgICBiYXNlUHJvcHNba2V5XSA9IHJhd1Byb3BzW2tleV07XG4gICAgfVxuICB9XG4gIGlmIChyYXdQcm9wcy5jc3MgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGJhc2VQcm9wcztcbiAgfVxuICBjb25zdCB7XG4gICAgbmFtZSA9IFwidlwiLFxuICAgIHR5cGUsXG4gICAgZHVyYXRpb24sXG4gICAgZW50ZXJGcm9tQ2xhc3MgPSBgJHtuYW1lfS1lbnRlci1mcm9tYCxcbiAgICBlbnRlckFjdGl2ZUNsYXNzID0gYCR7bmFtZX0tZW50ZXItYWN0aXZlYCxcbiAgICBlbnRlclRvQ2xhc3MgPSBgJHtuYW1lfS1lbnRlci10b2AsXG4gICAgYXBwZWFyRnJvbUNsYXNzID0gZW50ZXJGcm9tQ2xhc3MsXG4gICAgYXBwZWFyQWN0aXZlQ2xhc3MgPSBlbnRlckFjdGl2ZUNsYXNzLFxuICAgIGFwcGVhclRvQ2xhc3MgPSBlbnRlclRvQ2xhc3MsXG4gICAgbGVhdmVGcm9tQ2xhc3MgPSBgJHtuYW1lfS1sZWF2ZS1mcm9tYCxcbiAgICBsZWF2ZUFjdGl2ZUNsYXNzID0gYCR7bmFtZX0tbGVhdmUtYWN0aXZlYCxcbiAgICBsZWF2ZVRvQ2xhc3MgPSBgJHtuYW1lfS1sZWF2ZS10b2BcbiAgfSA9IHJhd1Byb3BzO1xuICBjb25zdCBkdXJhdGlvbnMgPSBub3JtYWxpemVEdXJhdGlvbihkdXJhdGlvbik7XG4gIGNvbnN0IGVudGVyRHVyYXRpb24gPSBkdXJhdGlvbnMgJiYgZHVyYXRpb25zWzBdO1xuICBjb25zdCBsZWF2ZUR1cmF0aW9uID0gZHVyYXRpb25zICYmIGR1cmF0aW9uc1sxXTtcbiAgY29uc3Qge1xuICAgIG9uQmVmb3JlRW50ZXIsXG4gICAgb25FbnRlcixcbiAgICBvbkVudGVyQ2FuY2VsbGVkLFxuICAgIG9uTGVhdmUsXG4gICAgb25MZWF2ZUNhbmNlbGxlZCxcbiAgICBvbkJlZm9yZUFwcGVhciA9IG9uQmVmb3JlRW50ZXIsXG4gICAgb25BcHBlYXIgPSBvbkVudGVyLFxuICAgIG9uQXBwZWFyQ2FuY2VsbGVkID0gb25FbnRlckNhbmNlbGxlZFxuICB9ID0gYmFzZVByb3BzO1xuICBjb25zdCBmaW5pc2hFbnRlciA9IChlbCwgaXNBcHBlYXIsIGRvbmUpID0+IHtcbiAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGlzQXBwZWFyID8gYXBwZWFyVG9DbGFzcyA6IGVudGVyVG9DbGFzcyk7XG4gICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBpc0FwcGVhciA/IGFwcGVhckFjdGl2ZUNsYXNzIDogZW50ZXJBY3RpdmVDbGFzcyk7XG4gICAgZG9uZSAmJiBkb25lKCk7XG4gIH07XG4gIGNvbnN0IGZpbmlzaExlYXZlID0gKGVsLCBkb25lKSA9PiB7XG4gICAgZWwuX2lzTGVhdmluZyA9IGZhbHNlO1xuICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVGcm9tQ2xhc3MpO1xuICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQWN0aXZlQ2xhc3MpO1xuICAgIGRvbmUgJiYgZG9uZSgpO1xuICB9O1xuICBjb25zdCBtYWtlRW50ZXJIb29rID0gKGlzQXBwZWFyKSA9PiB7XG4gICAgcmV0dXJuIChlbCwgZG9uZSkgPT4ge1xuICAgICAgY29uc3QgaG9vayA9IGlzQXBwZWFyID8gb25BcHBlYXIgOiBvbkVudGVyO1xuICAgICAgY29uc3QgcmVzb2x2ZSA9ICgpID0+IGZpbmlzaEVudGVyKGVsLCBpc0FwcGVhciwgZG9uZSk7XG4gICAgICBjYWxsSG9vayhob29rLCBbZWwsIHJlc29sdmVdKTtcbiAgICAgIG5leHRGcmFtZSgoKSA9PiB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgaXNBcHBlYXIgPyBhcHBlYXJGcm9tQ2xhc3MgOiBlbnRlckZyb21DbGFzcyk7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgaXNBcHBlYXIgPyBhcHBlYXJUb0NsYXNzIDogZW50ZXJUb0NsYXNzKTtcbiAgICAgICAgaWYgKCFoYXNFeHBsaWNpdENhbGxiYWNrKGhvb2spKSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBlbnRlckR1cmF0aW9uLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGV4dGVuZChiYXNlUHJvcHMsIHtcbiAgICBvbkJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBjYWxsSG9vayhvbkJlZm9yZUVudGVyLCBbZWxdKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgZW50ZXJGcm9tQ2xhc3MpO1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBlbnRlckFjdGl2ZUNsYXNzKTtcbiAgICB9LFxuICAgIG9uQmVmb3JlQXBwZWFyKGVsKSB7XG4gICAgICBjYWxsSG9vayhvbkJlZm9yZUFwcGVhciwgW2VsXSk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFwcGVhckZyb21DbGFzcyk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFwcGVhckFjdGl2ZUNsYXNzKTtcbiAgICB9LFxuICAgIG9uRW50ZXI6IG1ha2VFbnRlckhvb2soZmFsc2UpLFxuICAgIG9uQXBwZWFyOiBtYWtlRW50ZXJIb29rKHRydWUpLFxuICAgIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgIGVsLl9pc0xlYXZpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgcmVzb2x2ZSA9ICgpID0+IGZpbmlzaExlYXZlKGVsLCBkb25lKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVGcm9tQ2xhc3MpO1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICAgIGZvcmNlUmVmbG93KCk7XG4gICAgICBuZXh0RnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAoIWVsLl9pc0xlYXZpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUZyb21DbGFzcyk7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICAgICAgaWYgKCFoYXNFeHBsaWNpdENhbGxiYWNrKG9uTGVhdmUpKSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBsZWF2ZUR1cmF0aW9uLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjYWxsSG9vayhvbkxlYXZlLCBbZWwsIHJlc29sdmVdKTtcbiAgICB9LFxuICAgIG9uRW50ZXJDYW5jZWxsZWQoZWwpIHtcbiAgICAgIGZpbmlzaEVudGVyKGVsLCBmYWxzZSk7XG4gICAgICBjYWxsSG9vayhvbkVudGVyQ2FuY2VsbGVkLCBbZWxdKTtcbiAgICB9LFxuICAgIG9uQXBwZWFyQ2FuY2VsbGVkKGVsKSB7XG4gICAgICBmaW5pc2hFbnRlcihlbCwgdHJ1ZSk7XG4gICAgICBjYWxsSG9vayhvbkFwcGVhckNhbmNlbGxlZCwgW2VsXSk7XG4gICAgfSxcbiAgICBvbkxlYXZlQ2FuY2VsbGVkKGVsKSB7XG4gICAgICBmaW5pc2hMZWF2ZShlbCk7XG4gICAgICBjYWxsSG9vayhvbkxlYXZlQ2FuY2VsbGVkLCBbZWxdKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmIChpc09iamVjdChkdXJhdGlvbikpIHtcbiAgICByZXR1cm4gW051bWJlck9mKGR1cmF0aW9uLmVudGVyKSwgTnVtYmVyT2YoZHVyYXRpb24ubGVhdmUpXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuID0gTnVtYmVyT2YoZHVyYXRpb24pO1xuICAgIHJldHVybiBbbiwgbl07XG4gIH1cbn1cbmZ1bmN0aW9uIE51bWJlck9mKHZhbCkge1xuICBjb25zdCByZXMgPSB0b051bWJlcih2YWwpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGFzc2VydE51bWJlcihyZXMsIFwiPHRyYW5zaXRpb24+IGV4cGxpY2l0IGR1cmF0aW9uXCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGNscykge1xuICBjbHMuc3BsaXQoL1xccysvKS5mb3JFYWNoKChjKSA9PiBjICYmIGVsLmNsYXNzTGlzdC5hZGQoYykpO1xuICAoZWxbdnRjS2V5XSB8fCAoZWxbdnRjS2V5XSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCkpKS5hZGQoY2xzKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgY2xzKSB7XG4gIGNscy5zcGxpdCgvXFxzKy8pLmZvckVhY2goKGMpID0+IGMgJiYgZWwuY2xhc3NMaXN0LnJlbW92ZShjKSk7XG4gIGNvbnN0IF92dGMgPSBlbFt2dGNLZXldO1xuICBpZiAoX3Z0Yykge1xuICAgIF92dGMuZGVsZXRlKGNscyk7XG4gICAgaWYgKCFfdnRjLnNpemUpIHtcbiAgICAgIGVsW3Z0Y0tleV0gPSB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBuZXh0RnJhbWUoY2IpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpO1xuICB9KTtcbn1cbmxldCBlbmRJZCA9IDA7XG5mdW5jdGlvbiB3aGVuVHJhbnNpdGlvbkVuZHMoZWwsIGV4cGVjdGVkVHlwZSwgZXhwbGljaXRUaW1lb3V0LCByZXNvbHZlKSB7XG4gIGNvbnN0IGlkID0gZWwuX2VuZElkID0gKytlbmRJZDtcbiAgY29uc3QgcmVzb2x2ZUlmTm90U3RhbGUgPSAoKSA9PiB7XG4gICAgaWYgKGlkID09PSBlbC5fZW5kSWQpIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9XG4gIH07XG4gIGlmIChleHBsaWNpdFRpbWVvdXQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlSWZOb3RTdGFsZSwgZXhwbGljaXRUaW1lb3V0KTtcbiAgfVxuICBjb25zdCB7IHR5cGUsIHRpbWVvdXQsIHByb3BDb3VudCB9ID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwsIGV4cGVjdGVkVHlwZSk7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiByZXNvbHZlKCk7XG4gIH1cbiAgY29uc3QgZW5kRXZlbnQgPSB0eXBlICsgXCJlbmRcIjtcbiAgbGV0IGVuZGVkID0gMDtcbiAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZW5kRXZlbnQsIG9uRW5kKTtcbiAgICByZXNvbHZlSWZOb3RTdGFsZSgpO1xuICB9O1xuICBjb25zdCBvbkVuZCA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBlbCAmJiArK2VuZGVkID49IHByb3BDb3VudCkge1xuICAgICAgZW5kKCk7XG4gICAgfVxuICB9O1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZW5kZWQgPCBwcm9wQ291bnQpIHtcbiAgICAgIGVuZCgpO1xuICAgIH1cbiAgfSwgdGltZW91dCArIDEpO1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGVuZEV2ZW50LCBvbkVuZCk7XG59XG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uSW5mbyhlbCwgZXhwZWN0ZWRUeXBlKSB7XG4gIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgY29uc3QgZ2V0U3R5bGVQcm9wZXJ0aWVzID0gKGtleSkgPT4gKHN0eWxlc1trZXldIHx8IFwiXCIpLnNwbGl0KFwiLCBcIik7XG4gIGNvbnN0IHRyYW5zaXRpb25EZWxheXMgPSBnZXRTdHlsZVByb3BlcnRpZXMoYCR7VFJBTlNJVElPTn1EZWxheWApO1xuICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb25zID0gZ2V0U3R5bGVQcm9wZXJ0aWVzKGAke1RSQU5TSVRJT059RHVyYXRpb25gKTtcbiAgY29uc3QgdHJhbnNpdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KHRyYW5zaXRpb25EZWxheXMsIHRyYW5zaXRpb25EdXJhdGlvbnMpO1xuICBjb25zdCBhbmltYXRpb25EZWxheXMgPSBnZXRTdHlsZVByb3BlcnRpZXMoYCR7QU5JTUFUSU9OfURlbGF5YCk7XG4gIGNvbnN0IGFuaW1hdGlvbkR1cmF0aW9ucyA9IGdldFN0eWxlUHJvcGVydGllcyhgJHtBTklNQVRJT059RHVyYXRpb25gKTtcbiAgY29uc3QgYW5pbWF0aW9uVGltZW91dCA9IGdldFRpbWVvdXQoYW5pbWF0aW9uRGVsYXlzLCBhbmltYXRpb25EdXJhdGlvbnMpO1xuICBsZXQgdHlwZSA9IG51bGw7XG4gIGxldCB0aW1lb3V0ID0gMDtcbiAgbGV0IHByb3BDb3VudCA9IDA7XG4gIGlmIChleHBlY3RlZFR5cGUgPT09IFRSQU5TSVRJT04pIHtcbiAgICBpZiAodHJhbnNpdGlvblRpbWVvdXQgPiAwKSB7XG4gICAgICB0eXBlID0gVFJBTlNJVElPTjtcbiAgICAgIHRpbWVvdXQgPSB0cmFuc2l0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IEFOSU1BVElPTikge1xuICAgIGlmIChhbmltYXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IEFOSU1BVElPTjtcbiAgICAgIHRpbWVvdXQgPSBhbmltYXRpb25UaW1lb3V0O1xuICAgICAgcHJvcENvdW50ID0gYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGltZW91dCA9IE1hdGgubWF4KHRyYW5zaXRpb25UaW1lb3V0LCBhbmltYXRpb25UaW1lb3V0KTtcbiAgICB0eXBlID0gdGltZW91dCA+IDAgPyB0cmFuc2l0aW9uVGltZW91dCA+IGFuaW1hdGlvblRpbWVvdXQgPyBUUkFOU0lUSU9OIDogQU5JTUFUSU9OIDogbnVsbDtcbiAgICBwcm9wQ291bnQgPSB0eXBlID8gdHlwZSA9PT0gVFJBTlNJVElPTiA/IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoIDogYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aCA6IDA7XG4gIH1cbiAgY29uc3QgaGFzVHJhbnNmb3JtID0gdHlwZSA9PT0gVFJBTlNJVElPTiAmJiAvXFxiKHRyYW5zZm9ybXxhbGwpKCx8JCkvLnRlc3QoXG4gICAgZ2V0U3R5bGVQcm9wZXJ0aWVzKGAke1RSQU5TSVRJT059UHJvcGVydHlgKS50b1N0cmluZygpXG4gICk7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICB0aW1lb3V0LFxuICAgIHByb3BDb3VudCxcbiAgICBoYXNUcmFuc2Zvcm1cbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFRpbWVvdXQoZGVsYXlzLCBkdXJhdGlvbnMpIHtcbiAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgZGVsYXlzID0gZGVsYXlzLmNvbmNhdChkZWxheXMpO1xuICB9XG4gIHJldHVybiBNYXRoLm1heCguLi5kdXJhdGlvbnMubWFwKChkLCBpKSA9PiB0b01zKGQpICsgdG9NcyhkZWxheXNbaV0pKSk7XG59XG5mdW5jdGlvbiB0b01zKHMpIHtcbiAgaWYgKHMgPT09IFwiYXV0b1wiKSByZXR1cm4gMDtcbiAgcmV0dXJuIE51bWJlcihzLnNsaWNlKDAsIC0xKS5yZXBsYWNlKFwiLFwiLCBcIi5cIikpICogMWUzO1xufVxuZnVuY3Rpb24gZm9yY2VSZWZsb3coKSB7XG4gIHJldHVybiBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcbn1cblxuZnVuY3Rpb24gcGF0Y2hDbGFzcyhlbCwgdmFsdWUsIGlzU1ZHKSB7XG4gIGNvbnN0IHRyYW5zaXRpb25DbGFzc2VzID0gZWxbdnRjS2V5XTtcbiAgaWYgKHRyYW5zaXRpb25DbGFzc2VzKSB7XG4gICAgdmFsdWUgPSAodmFsdWUgPyBbdmFsdWUsIC4uLnRyYW5zaXRpb25DbGFzc2VzXSA6IFsuLi50cmFuc2l0aW9uQ2xhc3Nlc10pLmpvaW4oXCIgXCIpO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gIH0gZWxzZSBpZiAoaXNTVkcpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NOYW1lID0gdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgdlNob3dPcmlnaW5hbERpc3BsYXkgPSBTeW1ib2woXCJfdm9kXCIpO1xuY29uc3QgdlNob3dIaWRkZW4gPSBTeW1ib2woXCJfdnNoXCIpO1xuY29uc3QgdlNob3cgPSB7XG4gIGJlZm9yZU1vdW50KGVsLCB7IHZhbHVlIH0sIHsgdHJhbnNpdGlvbiB9KSB7XG4gICAgZWxbdlNob3dPcmlnaW5hbERpc3BsYXldID0gZWwuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgPyBcIlwiIDogZWwuc3R5bGUuZGlzcGxheTtcbiAgICBpZiAodHJhbnNpdGlvbiAmJiB2YWx1ZSkge1xuICAgICAgdHJhbnNpdGlvbi5iZWZvcmVFbnRlcihlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldERpc3BsYXkoZWwsIHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoZWwsIHsgdmFsdWUgfSwgeyB0cmFuc2l0aW9uIH0pIHtcbiAgICBpZiAodHJhbnNpdGlvbiAmJiB2YWx1ZSkge1xuICAgICAgdHJhbnNpdGlvbi5lbnRlcihlbCk7XG4gICAgfVxuICB9LFxuICB1cGRhdGVkKGVsLCB7IHZhbHVlLCBvbGRWYWx1ZSB9LCB7IHRyYW5zaXRpb24gfSkge1xuICAgIGlmICghdmFsdWUgPT09ICFvbGRWYWx1ZSkgcmV0dXJuO1xuICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdHJhbnNpdGlvbi5iZWZvcmVFbnRlcihlbCk7XG4gICAgICAgIHNldERpc3BsYXkoZWwsIHRydWUpO1xuICAgICAgICB0cmFuc2l0aW9uLmVudGVyKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zaXRpb24ubGVhdmUoZWwsICgpID0+IHtcbiAgICAgICAgICBzZXREaXNwbGF5KGVsLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXREaXNwbGF5KGVsLCB2YWx1ZSk7XG4gICAgfVxuICB9LFxuICBiZWZvcmVVbm1vdW50KGVsLCB7IHZhbHVlIH0pIHtcbiAgICBzZXREaXNwbGF5KGVsLCB2YWx1ZSk7XG4gIH1cbn07XG5pZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICB2U2hvdy5uYW1lID0gXCJzaG93XCI7XG59XG5mdW5jdGlvbiBzZXREaXNwbGF5KGVsLCB2YWx1ZSkge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBlbFt2U2hvd09yaWdpbmFsRGlzcGxheV0gOiBcIm5vbmVcIjtcbiAgZWxbdlNob3dIaWRkZW5dID0gIXZhbHVlO1xufVxuZnVuY3Rpb24gaW5pdFZTaG93Rm9yU1NSKCkge1xuICB2U2hvdy5nZXRTU1JQcm9wcyA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4geyBzdHlsZTogeyBkaXNwbGF5OiBcIm5vbmVcIiB9IH07XG4gICAgfVxuICB9O1xufVxuXG5jb25zdCBDU1NfVkFSX1RFWFQgPSBTeW1ib2woISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IFwiQ1NTX1ZBUl9URVhUXCIgOiBcIlwiKTtcbmZ1bmN0aW9uIHVzZUNzc1ZhcnMoZ2V0dGVyKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gIGlmICghaW5zdGFuY2UpIHtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4oYHVzZUNzc1ZhcnMgaXMgY2FsbGVkIHdpdGhvdXQgY3VycmVudCBhY3RpdmUgY29tcG9uZW50IGluc3RhbmNlLmApO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB1cGRhdGVUZWxlcG9ydHMgPSBpbnN0YW5jZS51dCA9ICh2YXJzID0gZ2V0dGVyKGluc3RhbmNlLnByb3h5KSkgPT4ge1xuICAgIEFycmF5LmZyb20oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS12LW93bmVyPVwiJHtpbnN0YW5jZS51aWR9XCJdYClcbiAgICApLmZvckVhY2goKG5vZGUpID0+IHNldFZhcnNPbk5vZGUobm9kZSwgdmFycykpO1xuICB9O1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGluc3RhbmNlLmdldENzc1ZhcnMgPSAoKSA9PiBnZXR0ZXIoaW5zdGFuY2UucHJveHkpO1xuICB9XG4gIGNvbnN0IHNldFZhcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgdmFycyA9IGdldHRlcihpbnN0YW5jZS5wcm94eSk7XG4gICAgc2V0VmFyc09uVk5vZGUoaW5zdGFuY2Uuc3ViVHJlZSwgdmFycyk7XG4gICAgdXBkYXRlVGVsZXBvcnRzKHZhcnMpO1xuICB9O1xuICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICB3YXRjaFBvc3RFZmZlY3Qoc2V0VmFycyk7XG4gIH0pO1xuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG9iID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoc2V0VmFycyk7XG4gICAgb2Iub2JzZXJ2ZShpbnN0YW5jZS5zdWJUcmVlLmVsLnBhcmVudE5vZGUsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgIG9uVW5tb3VudGVkKCgpID0+IG9iLmRpc2Nvbm5lY3QoKSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gc2V0VmFyc09uVk5vZGUodm5vZGUsIHZhcnMpIHtcbiAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDEyOCkge1xuICAgIGNvbnN0IHN1c3BlbnNlID0gdm5vZGUuc3VzcGVuc2U7XG4gICAgdm5vZGUgPSBzdXNwZW5zZS5hY3RpdmVCcmFuY2g7XG4gICAgaWYgKHN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggJiYgIXN1c3BlbnNlLmlzSHlkcmF0aW5nKSB7XG4gICAgICBzdXNwZW5zZS5lZmZlY3RzLnB1c2goKCkgPT4ge1xuICAgICAgICBzZXRWYXJzT25WTm9kZShzdXNwZW5zZS5hY3RpdmVCcmFuY2gsIHZhcnMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHdoaWxlICh2bm9kZS5jb21wb25lbnQpIHtcbiAgICB2bm9kZSA9IHZub2RlLmNvbXBvbmVudC5zdWJUcmVlO1xuICB9XG4gIGlmICh2bm9kZS5zaGFwZUZsYWcgJiAxICYmIHZub2RlLmVsKSB7XG4gICAgc2V0VmFyc09uTm9kZSh2bm9kZS5lbCwgdmFycyk7XG4gIH0gZWxzZSBpZiAodm5vZGUudHlwZSA9PT0gRnJhZ21lbnQpIHtcbiAgICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjKSA9PiBzZXRWYXJzT25WTm9kZShjLCB2YXJzKSk7XG4gIH0gZWxzZSBpZiAodm5vZGUudHlwZSA9PT0gU3RhdGljKSB7XG4gICAgbGV0IHsgZWwsIGFuY2hvciB9ID0gdm5vZGU7XG4gICAgd2hpbGUgKGVsKSB7XG4gICAgICBzZXRWYXJzT25Ob2RlKGVsLCB2YXJzKTtcbiAgICAgIGlmIChlbCA9PT0gYW5jaG9yKSBicmVhaztcbiAgICAgIGVsID0gZWwubmV4dFNpYmxpbmc7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzZXRWYXJzT25Ob2RlKGVsLCB2YXJzKSB7XG4gIGlmIChlbC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGNvbnN0IHN0eWxlID0gZWwuc3R5bGU7XG4gICAgbGV0IGNzc1RleHQgPSBcIlwiO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHZhcnMpIHtcbiAgICAgIHN0eWxlLnNldFByb3BlcnR5KGAtLSR7a2V5fWAsIHZhcnNba2V5XSk7XG4gICAgICBjc3NUZXh0ICs9IGAtLSR7a2V5fTogJHt2YXJzW2tleV19O2A7XG4gICAgfVxuICAgIHN0eWxlW0NTU19WQVJfVEVYVF0gPSBjc3NUZXh0O1xuICB9XG59XG5cbmNvbnN0IGRpc3BsYXlSRSA9IC8oXnw7KVxccypkaXNwbGF5XFxzKjovO1xuZnVuY3Rpb24gcGF0Y2hTdHlsZShlbCwgcHJldiwgbmV4dCkge1xuICBjb25zdCBzdHlsZSA9IGVsLnN0eWxlO1xuICBjb25zdCBpc0Nzc1N0cmluZyA9IGlzU3RyaW5nKG5leHQpO1xuICBsZXQgaGFzQ29udHJvbGxlZERpc3BsYXkgPSBmYWxzZTtcbiAgaWYgKG5leHQgJiYgIWlzQ3NzU3RyaW5nKSB7XG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmICghaXNTdHJpbmcocHJldikpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJldikge1xuICAgICAgICAgIGlmIChuZXh0W2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0U3R5bGUoc3R5bGUsIGtleSwgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHByZXZTdHlsZSBvZiBwcmV2LnNwbGl0KFwiO1wiKSkge1xuICAgICAgICAgIGNvbnN0IGtleSA9IHByZXZTdHlsZS5zbGljZSgwLCBwcmV2U3R5bGUuaW5kZXhPZihcIjpcIikpLnRyaW0oKTtcbiAgICAgICAgICBpZiAobmV4dFtrZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIHNldFN0eWxlKHN0eWxlLCBrZXksIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXh0KSB7XG4gICAgICBpZiAoa2V5ID09PSBcImRpc3BsYXlcIikge1xuICAgICAgICBoYXNDb250cm9sbGVkRGlzcGxheSA9IHRydWU7XG4gICAgICB9XG4gICAgICBzZXRTdHlsZShzdHlsZSwga2V5LCBuZXh0W2tleV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNDc3NTdHJpbmcpIHtcbiAgICAgIGlmIChwcmV2ICE9PSBuZXh0KSB7XG4gICAgICAgIGNvbnN0IGNzc1ZhclRleHQgPSBzdHlsZVtDU1NfVkFSX1RFWFRdO1xuICAgICAgICBpZiAoY3NzVmFyVGV4dCkge1xuICAgICAgICAgIG5leHQgKz0gXCI7XCIgKyBjc3NWYXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlLmNzc1RleHQgPSBuZXh0O1xuICAgICAgICBoYXNDb250cm9sbGVkRGlzcGxheSA9IGRpc3BsYXlSRS50ZXN0KG5leHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJldikge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgfVxuICB9XG4gIGlmICh2U2hvd09yaWdpbmFsRGlzcGxheSBpbiBlbCkge1xuICAgIGVsW3ZTaG93T3JpZ2luYWxEaXNwbGF5XSA9IGhhc0NvbnRyb2xsZWREaXNwbGF5ID8gc3R5bGUuZGlzcGxheSA6IFwiXCI7XG4gICAgaWYgKGVsW3ZTaG93SGlkZGVuXSkge1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfVxufVxuY29uc3Qgc2VtaWNvbG9uUkUgPSAvW15cXFxcXTtcXHMqJC87XG5jb25zdCBpbXBvcnRhbnRSRSA9IC9cXHMqIWltcG9ydGFudCQvO1xuZnVuY3Rpb24gc2V0U3R5bGUoc3R5bGUsIG5hbWUsIHZhbCkge1xuICBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgdmFsLmZvckVhY2goKHYpID0+IHNldFN0eWxlKHN0eWxlLCBuYW1lLCB2KSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB2YWwgPSBcIlwiO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBpZiAoc2VtaWNvbG9uUkUudGVzdCh2YWwpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgYFVuZXhwZWN0ZWQgc2VtaWNvbG9uIGF0IHRoZSBlbmQgb2YgJyR7bmFtZX0nIHN0eWxlIHZhbHVlOiAnJHt2YWx9J2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBzdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmVmaXhlZCA9IGF1dG9QcmVmaXgoc3R5bGUsIG5hbWUpO1xuICAgICAgaWYgKGltcG9ydGFudFJFLnRlc3QodmFsKSkge1xuICAgICAgICBzdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBoeXBoZW5hdGUocHJlZml4ZWQpLFxuICAgICAgICAgIHZhbC5yZXBsYWNlKGltcG9ydGFudFJFLCBcIlwiKSxcbiAgICAgICAgICBcImltcG9ydGFudFwiXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVtwcmVmaXhlZF0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5jb25zdCBwcmVmaXhlcyA9IFtcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCJdO1xuY29uc3QgcHJlZml4Q2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGF1dG9QcmVmaXgoc3R5bGUsIHJhd05hbWUpIHtcbiAgY29uc3QgY2FjaGVkID0gcHJlZml4Q2FjaGVbcmF3TmFtZV07XG4gIGlmIChjYWNoZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG4gIGxldCBuYW1lID0gY2FtZWxpemUocmF3TmFtZSk7XG4gIGlmIChuYW1lICE9PSBcImZpbHRlclwiICYmIG5hbWUgaW4gc3R5bGUpIHtcbiAgICByZXR1cm4gcHJlZml4Q2FjaGVbcmF3TmFtZV0gPSBuYW1lO1xuICB9XG4gIG5hbWUgPSBjYXBpdGFsaXplKG5hbWUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJlZml4ZWQgPSBwcmVmaXhlc1tpXSArIG5hbWU7XG4gICAgaWYgKHByZWZpeGVkIGluIHN0eWxlKSB7XG4gICAgICByZXR1cm4gcHJlZml4Q2FjaGVbcmF3TmFtZV0gPSBwcmVmaXhlZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhd05hbWU7XG59XG5cbmNvbnN0IHhsaW5rTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIjtcbmZ1bmN0aW9uIHBhdGNoQXR0cihlbCwga2V5LCB2YWx1ZSwgaXNTVkcsIGluc3RhbmNlLCBpc0Jvb2xlYW4gPSBpc1NwZWNpYWxCb29sZWFuQXR0cihrZXkpKSB7XG4gIGlmIChpc1NWRyAmJiBrZXkuc3RhcnRzV2l0aChcInhsaW5rOlwiKSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXkuc2xpY2UoNiwga2V5Lmxlbmd0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgaXNCb29sZWFuICYmICFpbmNsdWRlQm9vbGVhbkF0dHIodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFxuICAgICAgICBrZXksXG4gICAgICAgIGlzQm9vbGVhbiA/IFwiXCIgOiBpc1N5bWJvbCh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogdmFsdWVcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoRE9NUHJvcChlbCwga2V5LCB2YWx1ZSwgcGFyZW50Q29tcG9uZW50KSB7XG4gIGlmIChrZXkgPT09IFwiaW5uZXJIVE1MXCIgfHwga2V5ID09PSBcInRleHRDb250ZW50XCIpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGVsW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdGFnID0gZWwudGFnTmFtZTtcbiAgaWYgKGtleSA9PT0gXCJ2YWx1ZVwiICYmIHRhZyAhPT0gXCJQUk9HUkVTU1wiICYmIC8vIGN1c3RvbSBlbGVtZW50cyBtYXkgdXNlIF92YWx1ZSBpbnRlcm5hbGx5XG4gICF0YWcuaW5jbHVkZXMoXCItXCIpKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0YWcgPT09IFwiT1BUSU9OXCIgPyBlbC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSB8fCBcIlwiIDogZWwudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IFN0cmluZyh2YWx1ZSk7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSB8fCAhKFwiX3ZhbHVlXCIgaW4gZWwpKSB7XG4gICAgICBlbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgfVxuICAgIGVsLl92YWx1ZSA9IHZhbHVlO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgbmVlZFJlbW92ZSA9IGZhbHNlO1xuICBpZiAodmFsdWUgPT09IFwiXCIgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgZWxba2V5XTtcbiAgICBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIHZhbHVlID0gaW5jbHVkZUJvb2xlYW5BdHRyKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgbmVlZFJlbW92ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgICBuZWVkUmVtb3ZlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBlbFtrZXldID0gdmFsdWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhbmVlZFJlbW92ZSkge1xuICAgICAgd2FybihcbiAgICAgICAgYEZhaWxlZCBzZXR0aW5nIHByb3AgXCIke2tleX1cIiBvbiA8JHt0YWcudG9Mb3dlckNhc2UoKX0+OiB2YWx1ZSAke3ZhbHVlfSBpcyBpbnZhbGlkLmAsXG4gICAgICAgIGVcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIG5lZWRSZW1vdmUgJiYgZWwucmVtb3ZlQXR0cmlidXRlKGtleSk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZWwsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5jb25zdCB2ZWlLZXkgPSBTeW1ib2woXCJfdmVpXCIpO1xuZnVuY3Rpb24gcGF0Y2hFdmVudChlbCwgcmF3TmFtZSwgcHJldlZhbHVlLCBuZXh0VmFsdWUsIGluc3RhbmNlID0gbnVsbCkge1xuICBjb25zdCBpbnZva2VycyA9IGVsW3ZlaUtleV0gfHwgKGVsW3ZlaUtleV0gPSB7fSk7XG4gIGNvbnN0IGV4aXN0aW5nSW52b2tlciA9IGludm9rZXJzW3Jhd05hbWVdO1xuICBpZiAobmV4dFZhbHVlICYmIGV4aXN0aW5nSW52b2tlcikge1xuICAgIGV4aXN0aW5nSW52b2tlci52YWx1ZSA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzYW5pdGl6ZUV2ZW50VmFsdWUobmV4dFZhbHVlLCByYXdOYW1lKSA6IG5leHRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbbmFtZSwgb3B0aW9uc10gPSBwYXJzZU5hbWUocmF3TmFtZSk7XG4gICAgaWYgKG5leHRWYWx1ZSkge1xuICAgICAgY29uc3QgaW52b2tlciA9IGludm9rZXJzW3Jhd05hbWVdID0gY3JlYXRlSW52b2tlcihcbiAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNhbml0aXplRXZlbnRWYWx1ZShuZXh0VmFsdWUsIHJhd05hbWUpIDogbmV4dFZhbHVlLFxuICAgICAgICBpbnN0YW5jZVxuICAgICAgKTtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZWwsIG5hbWUsIGludm9rZXIsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoZXhpc3RpbmdJbnZva2VyKSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKGVsLCBuYW1lLCBleGlzdGluZ0ludm9rZXIsIG9wdGlvbnMpO1xuICAgICAgaW52b2tlcnNbcmF3TmFtZV0gPSB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5jb25zdCBvcHRpb25zTW9kaWZpZXJSRSA9IC8oPzpPbmNlfFBhc3NpdmV8Q2FwdHVyZSkkLztcbmZ1bmN0aW9uIHBhcnNlTmFtZShuYW1lKSB7XG4gIGxldCBvcHRpb25zO1xuICBpZiAob3B0aW9uc01vZGlmaWVyUkUudGVzdChuYW1lKSkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgICBsZXQgbTtcbiAgICB3aGlsZSAobSA9IG5hbWUubWF0Y2gob3B0aW9uc01vZGlmaWVyUkUpKSB7XG4gICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCBuYW1lLmxlbmd0aCAtIG1bMF0ubGVuZ3RoKTtcbiAgICAgIG9wdGlvbnNbbVswXS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgfVxuICB9XG4gIGNvbnN0IGV2ZW50ID0gbmFtZVsyXSA9PT0gXCI6XCIgPyBuYW1lLnNsaWNlKDMpIDogaHlwaGVuYXRlKG5hbWUuc2xpY2UoMikpO1xuICByZXR1cm4gW2V2ZW50LCBvcHRpb25zXTtcbn1cbmxldCBjYWNoZWROb3cgPSAwO1xuY29uc3QgcCA9IC8qIEBfX1BVUkVfXyAqLyBQcm9taXNlLnJlc29sdmUoKTtcbmNvbnN0IGdldE5vdyA9ICgpID0+IGNhY2hlZE5vdyB8fCAocC50aGVuKCgpID0+IGNhY2hlZE5vdyA9IDApLCBjYWNoZWROb3cgPSBEYXRlLm5vdygpKTtcbmZ1bmN0aW9uIGNyZWF0ZUludm9rZXIoaW5pdGlhbFZhbHVlLCBpbnN0YW5jZSkge1xuICBjb25zdCBpbnZva2VyID0gKGUpID0+IHtcbiAgICBpZiAoIWUuX3Z0cykge1xuICAgICAgZS5fdnRzID0gRGF0ZS5ub3coKTtcbiAgICB9IGVsc2UgaWYgKGUuX3Z0cyA8PSBpbnZva2VyLmF0dGFjaGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKFxuICAgICAgcGF0Y2hTdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oZSwgaW52b2tlci52YWx1ZSksXG4gICAgICBpbnN0YW5jZSxcbiAgICAgIDUsXG4gICAgICBbZV1cbiAgICApO1xuICB9O1xuICBpbnZva2VyLnZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBpbnZva2VyLmF0dGFjaGVkID0gZ2V0Tm93KCk7XG4gIHJldHVybiBpbnZva2VyO1xufVxuZnVuY3Rpb24gc2FuaXRpemVFdmVudFZhbHVlKHZhbHVlLCBwcm9wTmFtZSkge1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgd2FybihcbiAgICBgV3JvbmcgdHlwZSBwYXNzZWQgYXMgZXZlbnQgaGFuZGxlciB0byAke3Byb3BOYW1lfSAtIGRpZCB5b3UgZm9yZ2V0IEAgb3IgOiBpbiBmcm9udCBvZiB5b3VyIHByb3A/XG5FeHBlY3RlZCBmdW5jdGlvbiBvciBhcnJheSBvZiBmdW5jdGlvbnMsIHJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgdmFsdWV9LmBcbiAgKTtcbiAgcmV0dXJuIE5PT1A7XG59XG5mdW5jdGlvbiBwYXRjaFN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbihlLCB2YWx1ZSkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBjb25zdCBvcmlnaW5hbFN0b3AgPSBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9ICgpID0+IHtcbiAgICAgIG9yaWdpbmFsU3RvcC5jYWxsKGUpO1xuICAgICAgZS5fc3RvcHBlZCA9IHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gdmFsdWUubWFwKFxuICAgICAgKGZuKSA9PiAoZTIpID0+ICFlMi5fc3RvcHBlZCAmJiBmbiAmJiBmbihlMilcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5jb25zdCBpc05hdGl2ZU9uID0gKGtleSkgPT4ga2V5LmNoYXJDb2RlQXQoMCkgPT09IDExMSAmJiBrZXkuY2hhckNvZGVBdCgxKSA9PT0gMTEwICYmIC8vIGxvd2VyY2FzZSBsZXR0ZXJcbmtleS5jaGFyQ29kZUF0KDIpID4gOTYgJiYga2V5LmNoYXJDb2RlQXQoMikgPCAxMjM7XG5jb25zdCBwYXRjaFByb3AgPSAoZWwsIGtleSwgcHJldlZhbHVlLCBuZXh0VmFsdWUsIG5hbWVzcGFjZSwgcGFyZW50Q29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IGlzU1ZHID0gbmFtZXNwYWNlID09PSBcInN2Z1wiO1xuICBpZiAoa2V5ID09PSBcImNsYXNzXCIpIHtcbiAgICBwYXRjaENsYXNzKGVsLCBuZXh0VmFsdWUsIGlzU1ZHKTtcbiAgfSBlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikge1xuICAgIHBhdGNoU3R5bGUoZWwsIHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgfSBlbHNlIGlmIChpc09uKGtleSkpIHtcbiAgICBpZiAoIWlzTW9kZWxMaXN0ZW5lcihrZXkpKSB7XG4gICAgICBwYXRjaEV2ZW50KGVsLCBrZXksIHByZXZWYWx1ZSwgbmV4dFZhbHVlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChrZXlbMF0gPT09IFwiLlwiID8gKGtleSA9IGtleS5zbGljZSgxKSwgdHJ1ZSkgOiBrZXlbMF0gPT09IFwiXlwiID8gKGtleSA9IGtleS5zbGljZSgxKSwgZmFsc2UpIDogc2hvdWxkU2V0QXNQcm9wKGVsLCBrZXksIG5leHRWYWx1ZSwgaXNTVkcpKSB7XG4gICAgcGF0Y2hET01Qcm9wKGVsLCBrZXksIG5leHRWYWx1ZSk7XG4gICAgaWYgKCFlbC50YWdOYW1lLmluY2x1ZGVzKFwiLVwiKSAmJiAoa2V5ID09PSBcInZhbHVlXCIgfHwga2V5ID09PSBcImNoZWNrZWRcIiB8fCBrZXkgPT09IFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHBhdGNoQXR0cihlbCwga2V5LCBuZXh0VmFsdWUsIGlzU1ZHLCBwYXJlbnRDb21wb25lbnQsIGtleSAhPT0gXCJ2YWx1ZVwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleSA9PT0gXCJ0cnVlLXZhbHVlXCIpIHtcbiAgICAgIGVsLl90cnVlVmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiZmFsc2UtdmFsdWVcIikge1xuICAgICAgZWwuX2ZhbHNlVmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfVxuICAgIHBhdGNoQXR0cihlbCwga2V5LCBuZXh0VmFsdWUsIGlzU1ZHKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHNob3VsZFNldEFzUHJvcChlbCwga2V5LCB2YWx1ZSwgaXNTVkcpIHtcbiAgaWYgKGlzU1ZHKSB7XG4gICAgaWYgKGtleSA9PT0gXCJpbm5lckhUTUxcIiB8fCBrZXkgPT09IFwidGV4dENvbnRlbnRcIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChrZXkgaW4gZWwgJiYgaXNOYXRpdmVPbihrZXkpICYmIGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChrZXkgPT09IFwic3BlbGxjaGVja1wiIHx8IGtleSA9PT0gXCJkcmFnZ2FibGVcIiB8fCBrZXkgPT09IFwidHJhbnNsYXRlXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJmb3JtXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJsaXN0XCIgJiYgZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChrZXkgPT09IFwidHlwZVwiICYmIGVsLnRhZ05hbWUgPT09IFwiVEVYVEFSRUFcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoa2V5ID09PSBcIndpZHRoXCIgfHwga2V5ID09PSBcImhlaWdodFwiKSB7XG4gICAgY29uc3QgdGFnID0gZWwudGFnTmFtZTtcbiAgICBpZiAodGFnID09PSBcIklNR1wiIHx8IHRhZyA9PT0gXCJWSURFT1wiIHx8IHRhZyA9PT0gXCJDQU5WQVNcIiB8fCB0YWcgPT09IFwiU09VUkNFXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzTmF0aXZlT24oa2V5KSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGtleSBpbiBlbDtcbn1cblxuLyohICNfX05PX1NJREVfRUZGRUNUU19fICovXG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gZGVmaW5lQ3VzdG9tRWxlbWVudChvcHRpb25zLCBleHRyYU9wdGlvbnMsIGh5ZHJhdGUyKSB7XG4gIGNvbnN0IENvbXAgPSBkZWZpbmVDb21wb25lbnQob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgY2xhc3MgVnVlQ3VzdG9tRWxlbWVudCBleHRlbmRzIFZ1ZUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxQcm9wcykge1xuICAgICAgc3VwZXIoQ29tcCwgaW5pdGlhbFByb3BzLCBoeWRyYXRlMik7XG4gICAgfVxuICB9XG4gIFZ1ZUN1c3RvbUVsZW1lbnQuZGVmID0gQ29tcDtcbiAgcmV0dXJuIFZ1ZUN1c3RvbUVsZW1lbnQ7XG59XG4vKiEgI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbmNvbnN0IGRlZmluZVNTUkN1c3RvbUVsZW1lbnQgPSAvKiBAX19OT19TSURFX0VGRkVDVFNfXyAqLyAob3B0aW9ucywgZXh0cmFPcHRpb25zKSA9PiB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gZGVmaW5lQ3VzdG9tRWxlbWVudChvcHRpb25zLCBleHRyYU9wdGlvbnMsIGh5ZHJhdGUpO1xufTtcbmNvbnN0IEJhc2VDbGFzcyA9IHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IEhUTUxFbGVtZW50IDogY2xhc3Mge1xufTtcbmNsYXNzIFZ1ZUVsZW1lbnQgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuICBjb25zdHJ1Y3RvcihfZGVmLCBfcHJvcHMgPSB7fSwgaHlkcmF0ZTIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RlZiA9IF9kZWY7XG4gICAgdGhpcy5fcHJvcHMgPSBfcHJvcHM7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc29sdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fbnVtYmVyUHJvcHMgPSBudWxsO1xuICAgIHRoaXMuX29iID0gbnVsbDtcbiAgICBpZiAodGhpcy5zaGFkb3dSb290ICYmIGh5ZHJhdGUyKSB7XG4gICAgICBoeWRyYXRlMih0aGlzLl9jcmVhdGVWTm9kZSgpLCB0aGlzLnNoYWRvd1Jvb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBgQ3VzdG9tIGVsZW1lbnQgaGFzIHByZS1yZW5kZXJlZCBkZWNsYXJhdGl2ZSBzaGFkb3cgcm9vdCBidXQgaXMgbm90IGRlZmluZWQgYXMgaHlkcmF0YWJsZS4gVXNlIFxcYGRlZmluZVNTUkN1c3RvbUVsZW1lbnRcXGAuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICAgIGlmICghdGhpcy5fZGVmLl9fYXN5bmNMb2FkZXIpIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZVByb3BzKHRoaXMuX2RlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMuX3Jlc29sdmVkKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZURlZigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2Nvbm5lY3RlZCkge1xuICAgICAgICBpZiAodGhpcy5fb2IpIHtcbiAgICAgICAgICB0aGlzLl9vYi5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgdGhpcy5fb2IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihudWxsLCB0aGlzLnNoYWRvd1Jvb3QpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIHJlc29sdmUgaW5uZXIgY29tcG9uZW50IGRlZmluaXRpb24gKGhhbmRsZSBwb3NzaWJsZSBhc3luYyBjb21wb25lbnQpXG4gICAqL1xuICBfcmVzb2x2ZURlZigpIHtcbiAgICB0aGlzLl9yZXNvbHZlZCA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX3NldEF0dHIodGhpcy5hdHRyaWJ1dGVzW2ldLm5hbWUpO1xuICAgIH1cbiAgICB0aGlzLl9vYiA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGZvciAoY29uc3QgbSBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fc2V0QXR0cihtLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX29iLm9ic2VydmUodGhpcywgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuICAgIGNvbnN0IHJlc29sdmUgPSAoZGVmLCBpc0FzeW5jID0gZmFsc2UpID0+IHtcbiAgICAgIGNvbnN0IHsgcHJvcHMsIHN0eWxlcyB9ID0gZGVmO1xuICAgICAgbGV0IG51bWJlclByb3BzO1xuICAgICAgaWYgKHByb3BzICYmICFpc0FycmF5KHByb3BzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICAgIGNvbnN0IG9wdCA9IHByb3BzW2tleV07XG4gICAgICAgICAgaWYgKG9wdCA9PT0gTnVtYmVyIHx8IG9wdCAmJiBvcHQudHlwZSA9PT0gTnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3Byb3BzKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Byb3BzW2tleV0gPSB0b051bWJlcih0aGlzLl9wcm9wc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChudW1iZXJQcm9wcyB8fCAobnVtYmVyUHJvcHMgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSkpW2NhbWVsaXplJDEoa2V5KV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fbnVtYmVyUHJvcHMgPSBudW1iZXJQcm9wcztcbiAgICAgIGlmIChpc0FzeW5jKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVQcm9wcyhkZWYpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYXBwbHlTdHlsZXMoc3R5bGVzKTtcbiAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIH07XG4gICAgY29uc3QgYXN5bmNEZWYgPSB0aGlzLl9kZWYuX19hc3luY0xvYWRlcjtcbiAgICBpZiAoYXN5bmNEZWYpIHtcbiAgICAgIGFzeW5jRGVmKCkudGhlbigoZGVmKSA9PiByZXNvbHZlKGRlZiwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKHRoaXMuX2RlZik7XG4gICAgfVxuICB9XG4gIF9yZXNvbHZlUHJvcHMoZGVmKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmO1xuICAgIGNvbnN0IGRlY2xhcmVkUHJvcEtleXMgPSBpc0FycmF5KHByb3BzKSA/IHByb3BzIDogT2JqZWN0LmtleXMocHJvcHMgfHwge30pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMpKSB7XG4gICAgICBpZiAoa2V5WzBdICE9PSBcIl9cIiAmJiBkZWNsYXJlZFByb3BLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgdGhpcy5fc2V0UHJvcChrZXksIHRoaXNba2V5XSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkZWNsYXJlZFByb3BLZXlzLm1hcChjYW1lbGl6ZSQxKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3Aoa2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbCkge1xuICAgICAgICAgIHRoaXMuX3NldFByb3Aoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgX3NldEF0dHIoa2V5KSB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoa2V5KSA/IHRoaXMuZ2V0QXR0cmlidXRlKGtleSkgOiB2b2lkIDA7XG4gICAgY29uc3QgY2FtZWxLZXkgPSBjYW1lbGl6ZSQxKGtleSk7XG4gICAgaWYgKHRoaXMuX251bWJlclByb3BzICYmIHRoaXMuX251bWJlclByb3BzW2NhbWVsS2V5XSkge1xuICAgICAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX3NldFByb3AoY2FtZWxLZXksIHZhbHVlLCBmYWxzZSk7XG4gIH1cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2dldFByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzW2tleV07XG4gIH1cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3NldFByb3Aoa2V5LCB2YWwsIHNob3VsZFJlZmxlY3QgPSB0cnVlLCBzaG91bGRVcGRhdGUgPSB0cnVlKSB7XG4gICAgaWYgKHZhbCAhPT0gdGhpcy5fcHJvcHNba2V5XSkge1xuICAgICAgdGhpcy5fcHJvcHNba2V5XSA9IHZhbDtcbiAgICAgIGlmIChzaG91bGRVcGRhdGUgJiYgdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkUmVmbGVjdCkge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoaHlwaGVuYXRlKGtleSksIFwiXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGh5cGhlbmF0ZShrZXkpLCB2YWwgKyBcIlwiKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoaHlwaGVuYXRlKGtleSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF91cGRhdGUoKSB7XG4gICAgcmVuZGVyKHRoaXMuX2NyZWF0ZVZOb2RlKCksIHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cbiAgX2NyZWF0ZVZOb2RlKCkge1xuICAgIGNvbnN0IHZub2RlID0gY3JlYXRlVk5vZGUodGhpcy5fZGVmLCBleHRlbmQoe30sIHRoaXMuX3Byb3BzKSk7XG4gICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdm5vZGUuY2UgPSAoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgaW5zdGFuY2UuaXNDRSA9IHRydWU7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgaW5zdGFuY2UuY2VSZWxvYWQgPSAobmV3U3R5bGVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3R5bGVzKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3N0eWxlcy5mb3JFYWNoKChzKSA9PiB0aGlzLnNoYWRvd1Jvb3QucmVtb3ZlQ2hpbGQocykpO1xuICAgICAgICAgICAgICB0aGlzLl9zdHlsZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5U3R5bGVzKG5ld1N0eWxlcyk7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gKGV2ZW50LCBhcmdzKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgICAgIGRldGFpbDogYXJnc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZS5lbWl0ID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgZGlzcGF0Y2goZXZlbnQsIGFyZ3MpO1xuICAgICAgICAgIGlmIChoeXBoZW5hdGUoZXZlbnQpICE9PSBldmVudCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goaHlwaGVuYXRlKGV2ZW50KSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHBhcmVudCA9IHBhcmVudCAmJiAocGFyZW50LnBhcmVudE5vZGUgfHwgcGFyZW50Lmhvc3QpKSB7XG4gICAgICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIFZ1ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnBhcmVudCA9IHBhcmVudC5faW5zdGFuY2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5wcm92aWRlcyA9IHBhcmVudC5faW5zdGFuY2UucHJvdmlkZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB2bm9kZTtcbiAgfVxuICBfYXBwbHlTdHlsZXMoc3R5bGVzKSB7XG4gICAgaWYgKHN0eWxlcykge1xuICAgICAgc3R5bGVzLmZvckVhY2goKGNzcykgPT4ge1xuICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzLnRleHRDb250ZW50ID0gY3NzO1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgKHRoaXMuX3N0eWxlcyB8fCAodGhpcy5fc3R5bGVzID0gW10pKS5wdXNoKHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlQ3NzTW9kdWxlKG5hbWUgPSBcIiRzdHlsZVwiKSB7XG4gIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgdXNlQ3NzTW9kdWxlIG11c3QgYmUgY2FsbGVkIGluc2lkZSBzZXR1cCgpYCk7XG4gICAgICByZXR1cm4gRU1QVFlfT0JKO1xuICAgIH1cbiAgICBjb25zdCBtb2R1bGVzID0gaW5zdGFuY2UudHlwZS5fX2Nzc01vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4oYEN1cnJlbnQgaW5zdGFuY2UgZG9lcyBub3QgaGF2ZSBDU1MgbW9kdWxlcyBpbmplY3RlZC5gKTtcbiAgICAgIHJldHVybiBFTVBUWV9PQko7XG4gICAgfVxuICAgIGNvbnN0IG1vZCA9IG1vZHVsZXNbbmFtZV07XG4gICAgaWYgKCFtb2QpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgQ3VycmVudCBpbnN0YW5jZSBkb2VzIG5vdCBoYXZlIENTUyBtb2R1bGUgbmFtZWQgXCIke25hbWV9XCIuYCk7XG4gICAgICByZXR1cm4gRU1QVFlfT0JKO1xuICAgIH1cbiAgICByZXR1cm4gbW9kO1xuICB9XG59XG5cbmNvbnN0IHBvc2l0aW9uTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBuZXdQb3NpdGlvbk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuY29uc3QgbW92ZUNiS2V5ID0gU3ltYm9sKFwiX21vdmVDYlwiKTtcbmNvbnN0IGVudGVyQ2JLZXkgPSBTeW1ib2woXCJfZW50ZXJDYlwiKTtcbmNvbnN0IFRyYW5zaXRpb25Hcm91cEltcGwgPSB7XG4gIG5hbWU6IFwiVHJhbnNpdGlvbkdyb3VwXCIsXG4gIHByb3BzOiAvKiBAX19QVVJFX18gKi8gZXh0ZW5kKHt9LCBUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzLCB7XG4gICAgdGFnOiBTdHJpbmcsXG4gICAgbW92ZUNsYXNzOiBTdHJpbmdcbiAgfSksXG4gIHNldHVwKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlVHJhbnNpdGlvblN0YXRlKCk7XG4gICAgbGV0IHByZXZDaGlsZHJlbjtcbiAgICBsZXQgY2hpbGRyZW47XG4gICAgb25VcGRhdGVkKCgpID0+IHtcbiAgICAgIGlmICghcHJldkNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtb3ZlQ2xhc3MgPSBwcm9wcy5tb3ZlQ2xhc3MgfHwgYCR7cHJvcHMubmFtZSB8fCBcInZcIn0tbW92ZWA7XG4gICAgICBpZiAoIWhhc0NTU1RyYW5zZm9ybShcbiAgICAgICAgcHJldkNoaWxkcmVuWzBdLmVsLFxuICAgICAgICBpbnN0YW5jZS52bm9kZS5lbCxcbiAgICAgICAgbW92ZUNsYXNzXG4gICAgICApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHByZXZDaGlsZHJlbi5mb3JFYWNoKGNhbGxQZW5kaW5nQ2JzKTtcbiAgICAgIHByZXZDaGlsZHJlbi5mb3JFYWNoKHJlY29yZFBvc2l0aW9uKTtcbiAgICAgIGNvbnN0IG1vdmVkQ2hpbGRyZW4gPSBwcmV2Q2hpbGRyZW4uZmlsdGVyKGFwcGx5VHJhbnNsYXRpb24pO1xuICAgICAgZm9yY2VSZWZsb3coKTtcbiAgICAgIG1vdmVkQ2hpbGRyZW4uZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGMuZWw7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZWwuc3R5bGU7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gc3R5bGUud2Via2l0VHJhbnNmb3JtID0gc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2IgPSBlbFttb3ZlQ2JLZXldID0gKGUpID0+IHtcbiAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFlIHx8IC90cmFuc2Zvcm0kLy50ZXN0KGUucHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgY2IpO1xuICAgICAgICAgICAgZWxbbW92ZUNiS2V5XSA9IG51bGw7XG4gICAgICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBjYik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgcmF3UHJvcHMgPSB0b1Jhdyhwcm9wcyk7XG4gICAgICBjb25zdCBjc3NUcmFuc2l0aW9uUHJvcHMgPSByZXNvbHZlVHJhbnNpdGlvblByb3BzKHJhd1Byb3BzKTtcbiAgICAgIGxldCB0YWcgPSByYXdQcm9wcy50YWcgfHwgRnJhZ21lbnQ7XG4gICAgICBwcmV2Q2hpbGRyZW4gPSBbXTtcbiAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICBpZiAoY2hpbGQuZWwgJiYgY2hpbGQuZWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2Q2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgICByZXNvbHZlVHJhbnNpdGlvbkhvb2tzKFxuICAgICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgICAgIGNzc1RyYW5zaXRpb25Qcm9wcyxcbiAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcG9zaXRpb25NYXAuc2V0KFxuICAgICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgICAgY2hpbGQuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGlsZHJlbiA9IHNsb3RzLmRlZmF1bHQgPyBnZXRUcmFuc2l0aW9uUmF3Q2hpbGRyZW4oc2xvdHMuZGVmYXVsdCgpKSA6IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2hpbGQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgIHJlc29sdmVUcmFuc2l0aW9uSG9va3MoY2hpbGQsIGNzc1RyYW5zaXRpb25Qcm9wcywgc3RhdGUsIGluc3RhbmNlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4oYDxUcmFuc2l0aW9uR3JvdXA+IGNoaWxkcmVuIG11c3QgYmUga2V5ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjcmVhdGVWTm9kZSh0YWcsIG51bGwsIGNoaWxkcmVuKTtcbiAgICB9O1xuICB9XG59O1xuY29uc3QgcmVtb3ZlTW9kZSA9IChwcm9wcykgPT4gZGVsZXRlIHByb3BzLm1vZGU7XG4vKiBAX19QVVJFX18gKi8gcmVtb3ZlTW9kZShUcmFuc2l0aW9uR3JvdXBJbXBsLnByb3BzKTtcbmNvbnN0IFRyYW5zaXRpb25Hcm91cCA9IFRyYW5zaXRpb25Hcm91cEltcGw7XG5mdW5jdGlvbiBjYWxsUGVuZGluZ0NicyhjKSB7XG4gIGNvbnN0IGVsID0gYy5lbDtcbiAgaWYgKGVsW21vdmVDYktleV0pIHtcbiAgICBlbFttb3ZlQ2JLZXldKCk7XG4gIH1cbiAgaWYgKGVsW2VudGVyQ2JLZXldKSB7XG4gICAgZWxbZW50ZXJDYktleV0oKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVjb3JkUG9zaXRpb24oYykge1xuICBuZXdQb3NpdGlvbk1hcC5zZXQoYywgYy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG59XG5mdW5jdGlvbiBhcHBseVRyYW5zbGF0aW9uKGMpIHtcbiAgY29uc3Qgb2xkUG9zID0gcG9zaXRpb25NYXAuZ2V0KGMpO1xuICBjb25zdCBuZXdQb3MgPSBuZXdQb3NpdGlvbk1hcC5nZXQoYyk7XG4gIGNvbnN0IGR4ID0gb2xkUG9zLmxlZnQgLSBuZXdQb3MubGVmdDtcbiAgY29uc3QgZHkgPSBvbGRQb3MudG9wIC0gbmV3UG9zLnRvcDtcbiAgaWYgKGR4IHx8IGR5KSB7XG4gICAgY29uc3QgcyA9IGMuZWwuc3R5bGU7XG4gICAgcy50cmFuc2Zvcm0gPSBzLndlYmtpdFRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtkeH1weCwke2R5fXB4KWA7XG4gICAgcy50cmFuc2l0aW9uRHVyYXRpb24gPSBcIjBzXCI7XG4gICAgcmV0dXJuIGM7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhc0NTU1RyYW5zZm9ybShlbCwgcm9vdCwgbW92ZUNsYXNzKSB7XG4gIGNvbnN0IGNsb25lID0gZWwuY2xvbmVOb2RlKCk7XG4gIGNvbnN0IF92dGMgPSBlbFt2dGNLZXldO1xuICBpZiAoX3Z0Yykge1xuICAgIF92dGMuZm9yRWFjaCgoY2xzKSA9PiB7XG4gICAgICBjbHMuc3BsaXQoL1xccysvKS5mb3JFYWNoKChjKSA9PiBjICYmIGNsb25lLmNsYXNzTGlzdC5yZW1vdmUoYykpO1xuICAgIH0pO1xuICB9XG4gIG1vdmVDbGFzcy5zcGxpdCgvXFxzKy8pLmZvckVhY2goKGMpID0+IGMgJiYgY2xvbmUuY2xhc3NMaXN0LmFkZChjKSk7XG4gIGNsb25lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29uc3QgY29udGFpbmVyID0gcm9vdC5ub2RlVHlwZSA9PT0gMSA/IHJvb3QgOiByb290LnBhcmVudE5vZGU7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZSk7XG4gIGNvbnN0IHsgaGFzVHJhbnNmb3JtIH0gPSBnZXRUcmFuc2l0aW9uSW5mbyhjbG9uZSk7XG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjbG9uZSk7XG4gIHJldHVybiBoYXNUcmFuc2Zvcm07XG59XG5cbmNvbnN0IGdldE1vZGVsQXNzaWduZXIgPSAodm5vZGUpID0+IHtcbiAgY29uc3QgZm4gPSB2bm9kZS5wcm9wc1tcIm9uVXBkYXRlOm1vZGVsVmFsdWVcIl0gfHwgZmFsc2U7XG4gIHJldHVybiBpc0FycmF5KGZuKSA/ICh2YWx1ZSkgPT4gaW52b2tlQXJyYXlGbnMoZm4sIHZhbHVlKSA6IGZuO1xufTtcbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25TdGFydChlKSB7XG4gIGUudGFyZ2V0LmNvbXBvc2luZyA9IHRydWU7XG59XG5mdW5jdGlvbiBvbkNvbXBvc2l0aW9uRW5kKGUpIHtcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGlmICh0YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgdGFyZ2V0LmNvbXBvc2luZyA9IGZhbHNlO1xuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIpKTtcbiAgfVxufVxuY29uc3QgYXNzaWduS2V5ID0gU3ltYm9sKFwiX2Fzc2lnblwiKTtcbmNvbnN0IHZNb2RlbFRleHQgPSB7XG4gIGNyZWF0ZWQoZWwsIHsgbW9kaWZpZXJzOiB7IGxhenksIHRyaW0sIG51bWJlciB9IH0sIHZub2RlKSB7XG4gICAgZWxbYXNzaWduS2V5XSA9IGdldE1vZGVsQXNzaWduZXIodm5vZGUpO1xuICAgIGNvbnN0IGNhc3RUb051bWJlciA9IG51bWJlciB8fCB2bm9kZS5wcm9wcyAmJiB2bm9kZS5wcm9wcy50eXBlID09PSBcIm51bWJlclwiO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZWwsIGxhenkgPyBcImNoYW5nZVwiIDogXCJpbnB1dFwiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNvbXBvc2luZykgcmV0dXJuO1xuICAgICAgbGV0IGRvbVZhbHVlID0gZWwudmFsdWU7XG4gICAgICBpZiAodHJpbSkge1xuICAgICAgICBkb21WYWx1ZSA9IGRvbVZhbHVlLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXN0VG9OdW1iZXIpIHtcbiAgICAgICAgZG9tVmFsdWUgPSBsb29zZVRvTnVtYmVyKGRvbVZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsW2Fzc2lnbktleV0oZG9tVmFsdWUpO1xuICAgIH0pO1xuICAgIGlmICh0cmltKSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIGVsLnZhbHVlID0gZWwudmFsdWUudHJpbSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghbGF6eSkge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihlbCwgXCJjb21wb3NpdGlvbnN0YXJ0XCIsIG9uQ29tcG9zaXRpb25TdGFydCk7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNvbXBvc2l0aW9uZW5kXCIsIG9uQ29tcG9zaXRpb25FbmQpO1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihlbCwgXCJjaGFuZ2VcIiwgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgfVxuICB9LFxuICAvLyBzZXQgdmFsdWUgb24gbW91bnRlZCBzbyBpdCdzIGFmdGVyIG1pbi9tYXggZm9yIHR5cGU9XCJyYW5nZVwiXG4gIG1vdW50ZWQoZWwsIHsgdmFsdWUgfSkge1xuICAgIGVsLnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTtcbiAgfSxcbiAgYmVmb3JlVXBkYXRlKGVsLCB7IHZhbHVlLCBvbGRWYWx1ZSwgbW9kaWZpZXJzOiB7IGxhenksIHRyaW0sIG51bWJlciB9IH0sIHZub2RlKSB7XG4gICAgZWxbYXNzaWduS2V5XSA9IGdldE1vZGVsQXNzaWduZXIodm5vZGUpO1xuICAgIGlmIChlbC5jb21wb3NpbmcpIHJldHVybjtcbiAgICBjb25zdCBlbFZhbHVlID0gKG51bWJlciB8fCBlbC50eXBlID09PSBcIm51bWJlclwiKSAmJiAhL14wXFxkLy50ZXN0KGVsLnZhbHVlKSA/IGxvb3NlVG9OdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlO1xuICAgIGlmIChlbFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWwgJiYgZWwudHlwZSAhPT0gXCJyYW5nZVwiKSB7XG4gICAgICBpZiAobGF6eSAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyaW0gJiYgZWwudmFsdWUudHJpbSgpID09PSBuZXdWYWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGVsLnZhbHVlID0gbmV3VmFsdWU7XG4gIH1cbn07XG5jb25zdCB2TW9kZWxDaGVja2JveCA9IHtcbiAgLy8gIzQwOTYgYXJyYXkgY2hlY2tib3hlcyBuZWVkIHRvIGJlIGRlZXAgdHJhdmVyc2VkXG4gIGRlZXA6IHRydWUsXG4gIGNyZWF0ZWQoZWwsIF8sIHZub2RlKSB7XG4gICAgZWxbYXNzaWduS2V5XSA9IGdldE1vZGVsQXNzaWduZXIodm5vZGUpO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZWwsIFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSBlbC5fbW9kZWxWYWx1ZTtcbiAgICAgIGNvbnN0IGVsZW1lbnRWYWx1ZSA9IGdldFZhbHVlKGVsKTtcbiAgICAgIGNvbnN0IGNoZWNrZWQgPSBlbC5jaGVja2VkO1xuICAgICAgY29uc3QgYXNzaWduID0gZWxbYXNzaWduS2V5XTtcbiAgICAgIGlmIChpc0FycmF5KG1vZGVsVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG9vc2VJbmRleE9mKG1vZGVsVmFsdWUsIGVsZW1lbnRWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gaW5kZXggIT09IC0xO1xuICAgICAgICBpZiAoY2hlY2tlZCAmJiAhZm91bmQpIHtcbiAgICAgICAgICBhc3NpZ24obW9kZWxWYWx1ZS5jb25jYXQoZWxlbWVudFZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNoZWNrZWQgJiYgZm91bmQpIHtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IFsuLi5tb2RlbFZhbHVlXTtcbiAgICAgICAgICBmaWx0ZXJlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGFzc2lnbihmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNTZXQobW9kZWxWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgY2xvbmVkID0gbmV3IFNldChtb2RlbFZhbHVlKTtcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICBjbG9uZWQuYWRkKGVsZW1lbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xvbmVkLmRlbGV0ZShlbGVtZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2lnbihjbG9uZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXNzaWduKGdldENoZWNrYm94VmFsdWUoZWwsIGNoZWNrZWQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLy8gc2V0IGluaXRpYWwgY2hlY2tlZCBvbiBtb3VudCB0byB3YWl0IGZvciB0cnVlLXZhbHVlL2ZhbHNlLXZhbHVlXG4gIG1vdW50ZWQ6IHNldENoZWNrZWQsXG4gIGJlZm9yZVVwZGF0ZShlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgc2V0Q2hlY2tlZChlbCwgYmluZGluZywgdm5vZGUpO1xuICB9XG59O1xuZnVuY3Rpb24gc2V0Q2hlY2tlZChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSwgdm5vZGUpIHtcbiAgZWwuX21vZGVsVmFsdWUgPSB2YWx1ZTtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgZWwuY2hlY2tlZCA9IGxvb3NlSW5kZXhPZih2YWx1ZSwgdm5vZGUucHJvcHMudmFsdWUpID4gLTE7XG4gIH0gZWxzZSBpZiAoaXNTZXQodmFsdWUpKSB7XG4gICAgZWwuY2hlY2tlZCA9IHZhbHVlLmhhcyh2bm9kZS5wcm9wcy52YWx1ZSk7XG4gIH0gZWxzZSBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgZWwuY2hlY2tlZCA9IGxvb3NlRXF1YWwodmFsdWUsIGdldENoZWNrYm94VmFsdWUoZWwsIHRydWUpKTtcbiAgfVxufVxuY29uc3Qgdk1vZGVsUmFkaW8gPSB7XG4gIGNyZWF0ZWQoZWwsIHsgdmFsdWUgfSwgdm5vZGUpIHtcbiAgICBlbC5jaGVja2VkID0gbG9vc2VFcXVhbCh2YWx1ZSwgdm5vZGUucHJvcHMudmFsdWUpO1xuICAgIGVsW2Fzc2lnbktleV0gPSBnZXRNb2RlbEFzc2lnbmVyKHZub2RlKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBlbFthc3NpZ25LZXldKGdldFZhbHVlKGVsKSk7XG4gICAgfSk7XG4gIH0sXG4gIGJlZm9yZVVwZGF0ZShlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSwgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgaWYgKHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgZWwuY2hlY2tlZCA9IGxvb3NlRXF1YWwodmFsdWUsIHZub2RlLnByb3BzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCB2TW9kZWxTZWxlY3QgPSB7XG4gIC8vIDxzZWxlY3QgbXVsdGlwbGU+IHZhbHVlIG5lZWQgdG8gYmUgZGVlcCB0cmF2ZXJzZWRcbiAgZGVlcDogdHJ1ZSxcbiAgY3JlYXRlZChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzOiB7IG51bWJlciB9IH0sIHZub2RlKSB7XG4gICAgY29uc3QgaXNTZXRNb2RlbCA9IGlzU2V0KHZhbHVlKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbC5vcHRpb25zLCAobykgPT4gby5zZWxlY3RlZCkubWFwKFxuICAgICAgICAobykgPT4gbnVtYmVyID8gbG9vc2VUb051bWJlcihnZXRWYWx1ZShvKSkgOiBnZXRWYWx1ZShvKVxuICAgICAgKTtcbiAgICAgIGVsW2Fzc2lnbktleV0oXG4gICAgICAgIGVsLm11bHRpcGxlID8gaXNTZXRNb2RlbCA/IG5ldyBTZXQoc2VsZWN0ZWRWYWwpIDogc2VsZWN0ZWRWYWwgOiBzZWxlY3RlZFZhbFswXVxuICAgICAgKTtcbiAgICAgIGVsLl9hc3NpZ25pbmcgPSB0cnVlO1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBlbC5fYXNzaWduaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gIH0sXG4gIC8vIHNldCB2YWx1ZSBpbiBtb3VudGVkICYgdXBkYXRlZCBiZWNhdXNlIDxzZWxlY3Q+IHJlbGllcyBvbiBpdHMgY2hpbGRyZW5cbiAgLy8gPG9wdGlvbj5zLlxuICBtb3VudGVkKGVsLCB7IHZhbHVlLCBtb2RpZmllcnM6IHsgbnVtYmVyIH0gfSkge1xuICAgIHNldFNlbGVjdGVkKGVsLCB2YWx1ZSk7XG4gIH0sXG4gIGJlZm9yZVVwZGF0ZShlbCwgX2JpbmRpbmcsIHZub2RlKSB7XG4gICAgZWxbYXNzaWduS2V5XSA9IGdldE1vZGVsQXNzaWduZXIodm5vZGUpO1xuICB9LFxuICB1cGRhdGVkKGVsLCB7IHZhbHVlLCBtb2RpZmllcnM6IHsgbnVtYmVyIH0gfSkge1xuICAgIGlmICghZWwuX2Fzc2lnbmluZykge1xuICAgICAgc2V0U2VsZWN0ZWQoZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiBzZXRTZWxlY3RlZChlbCwgdmFsdWUsIG51bWJlcikge1xuICBjb25zdCBpc011bHRpcGxlID0gZWwubXVsdGlwbGU7XG4gIGNvbnN0IGlzQXJyYXlWYWx1ZSA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNNdWx0aXBsZSAmJiAhaXNBcnJheVZhbHVlICYmICFpc1NldCh2YWx1ZSkpIHtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4oXG4gICAgICBgPHNlbGVjdCBtdWx0aXBsZSB2LW1vZGVsPiBleHBlY3RzIGFuIEFycmF5IG9yIFNldCB2YWx1ZSBmb3IgaXRzIGJpbmRpbmcsIGJ1dCBnb3QgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKX0uYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAobGV0IGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBvcHRpb24gPSBlbC5vcHRpb25zW2ldO1xuICAgIGNvbnN0IG9wdGlvblZhbHVlID0gZ2V0VmFsdWUob3B0aW9uKTtcbiAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgaWYgKGlzQXJyYXlWYWx1ZSkge1xuICAgICAgICBjb25zdCBvcHRpb25UeXBlID0gdHlwZW9mIG9wdGlvblZhbHVlO1xuICAgICAgICBpZiAob3B0aW9uVHlwZSA9PT0gXCJzdHJpbmdcIiB8fCBvcHRpb25UeXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuc29tZSgodikgPT4gU3RyaW5nKHYpID09PSBTdHJpbmcob3B0aW9uVmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBsb29zZUluZGV4T2YodmFsdWUsIG9wdGlvblZhbHVlKSA+IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZS5oYXMob3B0aW9uVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9vc2VFcXVhbChnZXRWYWx1ZShvcHRpb24pLCB2YWx1ZSkpIHtcbiAgICAgIGlmIChlbC5zZWxlY3RlZEluZGV4ICE9PSBpKSBlbC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc011bHRpcGxlICYmIGVsLnNlbGVjdGVkSW5kZXggIT09IC0xKSB7XG4gICAgZWwuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICB9XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlbCkge1xuICByZXR1cm4gXCJfdmFsdWVcIiBpbiBlbCA/IGVsLl92YWx1ZSA6IGVsLnZhbHVlO1xufVxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShlbCwgY2hlY2tlZCkge1xuICBjb25zdCBrZXkgPSBjaGVja2VkID8gXCJfdHJ1ZVZhbHVlXCIgOiBcIl9mYWxzZVZhbHVlXCI7XG4gIHJldHVybiBrZXkgaW4gZWwgPyBlbFtrZXldIDogY2hlY2tlZDtcbn1cbmNvbnN0IHZNb2RlbER5bmFtaWMgPSB7XG4gIGNyZWF0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgY2FsbE1vZGVsSG9vayhlbCwgYmluZGluZywgdm5vZGUsIG51bGwsIFwiY3JlYXRlZFwiKTtcbiAgfSxcbiAgbW91bnRlZChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBjYWxsTW9kZWxIb29rKGVsLCBiaW5kaW5nLCB2bm9kZSwgbnVsbCwgXCJtb3VudGVkXCIpO1xuICB9LFxuICBiZWZvcmVVcGRhdGUoZWwsIGJpbmRpbmcsIHZub2RlLCBwcmV2Vk5vZGUpIHtcbiAgICBjYWxsTW9kZWxIb29rKGVsLCBiaW5kaW5nLCB2bm9kZSwgcHJldlZOb2RlLCBcImJlZm9yZVVwZGF0ZVwiKTtcbiAgfSxcbiAgdXBkYXRlZChlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSkge1xuICAgIGNhbGxNb2RlbEhvb2soZWwsIGJpbmRpbmcsIHZub2RlLCBwcmV2Vk5vZGUsIFwidXBkYXRlZFwiKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHJlc29sdmVEeW5hbWljTW9kZWwodGFnTmFtZSwgdHlwZSkge1xuICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICByZXR1cm4gdk1vZGVsU2VsZWN0O1xuICAgIGNhc2UgXCJURVhUQVJFQVwiOlxuICAgICAgcmV0dXJuIHZNb2RlbFRleHQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2hlY2tib3hcIjpcbiAgICAgICAgICByZXR1cm4gdk1vZGVsQ2hlY2tib3g7XG4gICAgICAgIGNhc2UgXCJyYWRpb1wiOlxuICAgICAgICAgIHJldHVybiB2TW9kZWxSYWRpbztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdk1vZGVsVGV4dDtcbiAgICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY2FsbE1vZGVsSG9vayhlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSwgaG9vaykge1xuICBjb25zdCBtb2RlbFRvVXNlID0gcmVzb2x2ZUR5bmFtaWNNb2RlbChcbiAgICBlbC50YWdOYW1lLFxuICAgIHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLnR5cGVcbiAgKTtcbiAgY29uc3QgZm4gPSBtb2RlbFRvVXNlW2hvb2tdO1xuICBmbiAmJiBmbihlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSk7XG59XG5mdW5jdGlvbiBpbml0Vk1vZGVsRm9yU1NSKCkge1xuICB2TW9kZWxUZXh0LmdldFNTUlByb3BzID0gKHsgdmFsdWUgfSkgPT4gKHsgdmFsdWUgfSk7XG4gIHZNb2RlbFJhZGlvLmdldFNTUlByb3BzID0gKHsgdmFsdWUgfSwgdm5vZGUpID0+IHtcbiAgICBpZiAodm5vZGUucHJvcHMgJiYgbG9vc2VFcXVhbCh2bm9kZS5wcm9wcy52YWx1ZSwgdmFsdWUpKSB7XG4gICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgfVxuICB9O1xuICB2TW9kZWxDaGVja2JveC5nZXRTU1JQcm9wcyA9ICh7IHZhbHVlIH0sIHZub2RlKSA9PiB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodm5vZGUucHJvcHMgJiYgbG9vc2VJbmRleE9mKHZhbHVlLCB2bm9kZS5wcm9wcy52YWx1ZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1NldCh2YWx1ZSkpIHtcbiAgICAgIGlmICh2bm9kZS5wcm9wcyAmJiB2YWx1ZS5oYXModm5vZGUucHJvcHMudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB7IGNoZWNrZWQ6IHRydWUgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgfVxuICB9O1xuICB2TW9kZWxEeW5hbWljLmdldFNTUlByb3BzID0gKGJpbmRpbmcsIHZub2RlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2bm9kZS50eXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1vZGVsVG9Vc2UgPSByZXNvbHZlRHluYW1pY01vZGVsKFxuICAgICAgLy8gcmVzb2x2ZUR5bmFtaWNNb2RlbCBleHBlY3RzIGFuIHVwcGVyY2FzZSB0YWcgbmFtZSwgYnV0IHZub2RlLnR5cGUgaXMgbG93ZXJjYXNlXG4gICAgICB2bm9kZS50eXBlLnRvVXBwZXJDYXNlKCksXG4gICAgICB2bm9kZS5wcm9wcyAmJiB2bm9kZS5wcm9wcy50eXBlXG4gICAgKTtcbiAgICBpZiAobW9kZWxUb1VzZS5nZXRTU1JQcm9wcykge1xuICAgICAgcmV0dXJuIG1vZGVsVG9Vc2UuZ2V0U1NSUHJvcHMoYmluZGluZywgdm5vZGUpO1xuICAgIH1cbiAgfTtcbn1cblxuY29uc3Qgc3lzdGVtTW9kaWZpZXJzID0gW1wiY3RybFwiLCBcInNoaWZ0XCIsIFwiYWx0XCIsIFwibWV0YVwiXTtcbmNvbnN0IG1vZGlmaWVyR3VhcmRzID0ge1xuICBzdG9wOiAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSxcbiAgcHJldmVudDogKGUpID0+IGUucHJldmVudERlZmF1bHQoKSxcbiAgc2VsZjogKGUpID0+IGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQsXG4gIGN0cmw6IChlKSA9PiAhZS5jdHJsS2V5LFxuICBzaGlmdDogKGUpID0+ICFlLnNoaWZ0S2V5LFxuICBhbHQ6IChlKSA9PiAhZS5hbHRLZXksXG4gIG1ldGE6IChlKSA9PiAhZS5tZXRhS2V5LFxuICBsZWZ0OiAoZSkgPT4gXCJidXR0b25cIiBpbiBlICYmIGUuYnV0dG9uICE9PSAwLFxuICBtaWRkbGU6IChlKSA9PiBcImJ1dHRvblwiIGluIGUgJiYgZS5idXR0b24gIT09IDEsXG4gIHJpZ2h0OiAoZSkgPT4gXCJidXR0b25cIiBpbiBlICYmIGUuYnV0dG9uICE9PSAyLFxuICBleGFjdDogKGUsIG1vZGlmaWVycykgPT4gc3lzdGVtTW9kaWZpZXJzLnNvbWUoKG0pID0+IGVbYCR7bX1LZXlgXSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKG0pKVxufTtcbmNvbnN0IHdpdGhNb2RpZmllcnMgPSAoZm4sIG1vZGlmaWVycykgPT4ge1xuICBjb25zdCBjYWNoZSA9IGZuLl93aXRoTW9kcyB8fCAoZm4uX3dpdGhNb2RzID0ge30pO1xuICBjb25zdCBjYWNoZUtleSA9IG1vZGlmaWVycy5qb2luKFwiLlwiKTtcbiAgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XSB8fCAoY2FjaGVbY2FjaGVLZXldID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGd1YXJkID0gbW9kaWZpZXJHdWFyZHNbbW9kaWZpZXJzW2ldXTtcbiAgICAgIGlmIChndWFyZCAmJiBndWFyZChldmVudCwgbW9kaWZpZXJzKSkgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gZm4oZXZlbnQsIC4uLmFyZ3MpO1xuICB9KTtcbn07XG5jb25zdCBrZXlOYW1lcyA9IHtcbiAgZXNjOiBcImVzY2FwZVwiLFxuICBzcGFjZTogXCIgXCIsXG4gIHVwOiBcImFycm93LXVwXCIsXG4gIGxlZnQ6IFwiYXJyb3ctbGVmdFwiLFxuICByaWdodDogXCJhcnJvdy1yaWdodFwiLFxuICBkb3duOiBcImFycm93LWRvd25cIixcbiAgZGVsZXRlOiBcImJhY2tzcGFjZVwiXG59O1xuY29uc3Qgd2l0aEtleXMgPSAoZm4sIG1vZGlmaWVycykgPT4ge1xuICBjb25zdCBjYWNoZSA9IGZuLl93aXRoS2V5cyB8fCAoZm4uX3dpdGhLZXlzID0ge30pO1xuICBjb25zdCBjYWNoZUtleSA9IG1vZGlmaWVycy5qb2luKFwiLlwiKTtcbiAgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XSB8fCAoY2FjaGVbY2FjaGVLZXldID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCEoXCJrZXlcIiBpbiBldmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZXZlbnRLZXkgPSBoeXBoZW5hdGUoZXZlbnQua2V5KTtcbiAgICBpZiAobW9kaWZpZXJzLnNvbWUoKGspID0+IGsgPT09IGV2ZW50S2V5IHx8IGtleU5hbWVzW2tdID09PSBldmVudEtleSkpIHtcbiAgICAgIHJldHVybiBmbihldmVudCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBleHRlbmQoeyBwYXRjaFByb3AgfSwgbm9kZU9wcyk7XG5sZXQgcmVuZGVyZXI7XG5sZXQgZW5hYmxlZEh5ZHJhdGlvbiA9IGZhbHNlO1xuZnVuY3Rpb24gZW5zdXJlUmVuZGVyZXIoKSB7XG4gIHJldHVybiByZW5kZXJlciB8fCAocmVuZGVyZXIgPSBjcmVhdGVSZW5kZXJlcihyZW5kZXJlck9wdGlvbnMpKTtcbn1cbmZ1bmN0aW9uIGVuc3VyZUh5ZHJhdGlvblJlbmRlcmVyKCkge1xuICByZW5kZXJlciA9IGVuYWJsZWRIeWRyYXRpb24gPyByZW5kZXJlciA6IGNyZWF0ZUh5ZHJhdGlvblJlbmRlcmVyKHJlbmRlcmVyT3B0aW9ucyk7XG4gIGVuYWJsZWRIeWRyYXRpb24gPSB0cnVlO1xuICByZXR1cm4gcmVuZGVyZXI7XG59XG5jb25zdCByZW5kZXIgPSAoLi4uYXJncykgPT4ge1xuICBlbnN1cmVSZW5kZXJlcigpLnJlbmRlciguLi5hcmdzKTtcbn07XG5jb25zdCBoeWRyYXRlID0gKC4uLmFyZ3MpID0+IHtcbiAgZW5zdXJlSHlkcmF0aW9uUmVuZGVyZXIoKS5oeWRyYXRlKC4uLmFyZ3MpO1xufTtcbmNvbnN0IGNyZWF0ZUFwcCA9ICguLi5hcmdzKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGVuc3VyZVJlbmRlcmVyKCkuY3JlYXRlQXBwKC4uLmFyZ3MpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGluamVjdE5hdGl2ZVRhZ0NoZWNrKGFwcCk7XG4gICAgaW5qZWN0Q29tcGlsZXJPcHRpb25zQ2hlY2soYXBwKTtcbiAgfVxuICBjb25zdCB7IG1vdW50IH0gPSBhcHA7XG4gIGFwcC5tb3VudCA9IChjb250YWluZXJPclNlbGVjdG9yKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbm9ybWFsaXplQ29udGFpbmVyKGNvbnRhaW5lck9yU2VsZWN0b3IpO1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgY29tcG9uZW50ID0gYXBwLl9jb21wb25lbnQ7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGNvbXBvbmVudCkgJiYgIWNvbXBvbmVudC5yZW5kZXIgJiYgIWNvbXBvbmVudC50ZW1wbGF0ZSkge1xuICAgICAgY29tcG9uZW50LnRlbXBsYXRlID0gY29udGFpbmVyLmlubmVySFRNTDtcbiAgICB9XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3QgcHJveHkgPSBtb3VudChjb250YWluZXIsIGZhbHNlLCByZXNvbHZlUm9vdE5hbWVzcGFjZShjb250YWluZXIpKTtcbiAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcInYtY2xvYWtcIik7XG4gICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS12LWFwcFwiLCBcIlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICByZXR1cm4gYXBwO1xufTtcbmNvbnN0IGNyZWF0ZVNTUkFwcCA9ICguLi5hcmdzKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGVuc3VyZUh5ZHJhdGlvblJlbmRlcmVyKCkuY3JlYXRlQXBwKC4uLmFyZ3MpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGluamVjdE5hdGl2ZVRhZ0NoZWNrKGFwcCk7XG4gICAgaW5qZWN0Q29tcGlsZXJPcHRpb25zQ2hlY2soYXBwKTtcbiAgfVxuICBjb25zdCB7IG1vdW50IH0gPSBhcHA7XG4gIGFwcC5tb3VudCA9IChjb250YWluZXJPclNlbGVjdG9yKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbm9ybWFsaXplQ29udGFpbmVyKGNvbnRhaW5lck9yU2VsZWN0b3IpO1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgIHJldHVybiBtb3VudChjb250YWluZXIsIHRydWUsIHJlc29sdmVSb290TmFtZXNwYWNlKGNvbnRhaW5lcikpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFwcDtcbn07XG5mdW5jdGlvbiByZXNvbHZlUm9vdE5hbWVzcGFjZShjb250YWluZXIpIHtcbiAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICByZXR1cm4gXCJzdmdcIjtcbiAgfVxuICBpZiAodHlwZW9mIE1hdGhNTEVsZW1lbnQgPT09IFwiZnVuY3Rpb25cIiAmJiBjb250YWluZXIgaW5zdGFuY2VvZiBNYXRoTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIFwibWF0aG1sXCI7XG4gIH1cbn1cbmZ1bmN0aW9uIGluamVjdE5hdGl2ZVRhZ0NoZWNrKGFwcCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBwLmNvbmZpZywgXCJpc05hdGl2ZVRhZ1wiLCB7XG4gICAgdmFsdWU6ICh0YWcpID0+IGlzSFRNTFRhZyh0YWcpIHx8IGlzU1ZHVGFnKHRhZykgfHwgaXNNYXRoTUxUYWcodGFnKSxcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG59XG5mdW5jdGlvbiBpbmplY3RDb21waWxlck9wdGlvbnNDaGVjayhhcHApIHtcbiAgaWYgKGlzUnVudGltZU9ubHkoKSkge1xuICAgIGNvbnN0IGlzQ3VzdG9tRWxlbWVudCA9IGFwcC5jb25maWcuaXNDdXN0b21FbGVtZW50O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLCBcImlzQ3VzdG9tRWxlbWVudFwiLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBpc0N1c3RvbUVsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgc2V0KCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIGBUaGUgXFxgaXNDdXN0b21FbGVtZW50XFxgIGNvbmZpZyBvcHRpb24gaXMgZGVwcmVjYXRlZC4gVXNlIFxcYGNvbXBpbGVyT3B0aW9ucy5pc0N1c3RvbUVsZW1lbnRcXGAgaW5zdGVhZC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY29tcGlsZXJPcHRpb25zID0gYXBwLmNvbmZpZy5jb21waWxlck9wdGlvbnM7XG4gICAgY29uc3QgbXNnID0gYFRoZSBcXGBjb21waWxlck9wdGlvbnNcXGAgY29uZmlnIG9wdGlvbiBpcyBvbmx5IHJlc3BlY3RlZCB3aGVuIHVzaW5nIGEgYnVpbGQgb2YgVnVlLmpzIHRoYXQgaW5jbHVkZXMgdGhlIHJ1bnRpbWUgY29tcGlsZXIgKGFrYSBcImZ1bGwgYnVpbGRcIikuIFNpbmNlIHlvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCwgXFxgY29tcGlsZXJPcHRpb25zXFxgIG11c3QgYmUgcGFzc2VkIHRvIFxcYEB2dWUvY29tcGlsZXItZG9tXFxgIGluIHRoZSBidWlsZCBzZXR1cCBpbnN0ZWFkLlxuLSBGb3IgdnVlLWxvYWRlcjogcGFzcyBpdCB2aWEgdnVlLWxvYWRlcidzIFxcYGNvbXBpbGVyT3B0aW9uc1xcYCBsb2FkZXIgb3B0aW9uLlxuLSBGb3IgdnVlLWNsaTogc2VlIGh0dHBzOi8vY2xpLnZ1ZWpzLm9yZy9ndWlkZS93ZWJwYWNrLmh0bWwjbW9kaWZ5aW5nLW9wdGlvbnMtb2YtYS1sb2FkZXJcbi0gRm9yIHZpdGU6IHBhc3MgaXQgdmlhIEB2aXRlanMvcGx1Z2luLXZ1ZSBvcHRpb25zLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlLXBsdWdpbi12dWUvdHJlZS9tYWluL3BhY2thZ2VzL3BsdWdpbi12dWUjZXhhbXBsZS1mb3ItcGFzc2luZy1vcHRpb25zLXRvLXZ1ZWNvbXBpbGVyLXNmY2A7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcC5jb25maWcsIFwiY29tcGlsZXJPcHRpb25zXCIsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgd2Fybihtc2cpO1xuICAgICAgICByZXR1cm4gY29tcGlsZXJPcHRpb25zO1xuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgd2Fybihtc2cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBub3JtYWxpemVDb250YWluZXIoY29udGFpbmVyKSB7XG4gIGlmIChpc1N0cmluZyhjb250YWluZXIpKSB7XG4gICAgY29uc3QgcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFyZXMpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGBGYWlsZWQgdG8gbW91bnQgYXBwOiBtb3VudCB0YXJnZXQgc2VsZWN0b3IgXCIke2NvbnRhaW5lcn1cIiByZXR1cm5lZCBudWxsLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2luZG93LlNoYWRvd1Jvb3QgJiYgY29udGFpbmVyIGluc3RhbmNlb2Ygd2luZG93LlNoYWRvd1Jvb3QgJiYgY29udGFpbmVyLm1vZGUgPT09IFwiY2xvc2VkXCIpIHtcbiAgICB3YXJuKFxuICAgICAgYG1vdW50aW5nIG9uIGEgU2hhZG93Um9vdCB3aXRoIFxcYHttb2RlOiBcImNsb3NlZFwifVxcYCBtYXkgbGVhZCB0byB1bnByZWRpY3RhYmxlIGJ1Z3NgXG4gICAgKTtcbiAgfVxuICByZXR1cm4gY29udGFpbmVyO1xufVxubGV0IHNzckRpcmVjdGl2ZUluaXRpYWxpemVkID0gZmFsc2U7XG5jb25zdCBpbml0RGlyZWN0aXZlc0ZvclNTUiA9ICgpID0+IHtcbiAgaWYgKCFzc3JEaXJlY3RpdmVJbml0aWFsaXplZCkge1xuICAgIHNzckRpcmVjdGl2ZUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBpbml0Vk1vZGVsRm9yU1NSKCk7XG4gICAgaW5pdFZTaG93Rm9yU1NSKCk7XG4gIH1cbn0gO1xuXG5leHBvcnQgeyBUcmFuc2l0aW9uLCBUcmFuc2l0aW9uR3JvdXAsIFZ1ZUVsZW1lbnQsIGNyZWF0ZUFwcCwgY3JlYXRlU1NSQXBwLCBkZWZpbmVDdXN0b21FbGVtZW50LCBkZWZpbmVTU1JDdXN0b21FbGVtZW50LCBoeWRyYXRlLCBpbml0RGlyZWN0aXZlc0ZvclNTUiwgcmVuZGVyLCB1c2VDc3NNb2R1bGUsIHVzZUNzc1ZhcnMsIHZNb2RlbENoZWNrYm94LCB2TW9kZWxEeW5hbWljLCB2TW9kZWxSYWRpbywgdk1vZGVsU2VsZWN0LCB2TW9kZWxUZXh0LCB2U2hvdywgd2l0aEtleXMsIHdpdGhNb2RpZmllcnMgfTtcbiIsIi8qKlxuKiB2dWUgdjMuNC4zOFxuKiAoYykgMjAxOC1wcmVzZW50IFl1eGkgKEV2YW4pIFlvdSBhbmQgVnVlIGNvbnRyaWJ1dG9yc1xuKiBAbGljZW5zZSBNSVRcbioqL1xuaW1wb3J0IHsgaW5pdEN1c3RvbUZvcm1hdHRlciwgd2FybiB9IGZyb20gJ0B2dWUvcnVudGltZS1kb20nO1xuZXhwb3J0ICogZnJvbSAnQHZ1ZS9ydW50aW1lLWRvbSc7XG5cbmZ1bmN0aW9uIGluaXREZXYoKSB7XG4gIHtcbiAgICBpbml0Q3VzdG9tRm9ybWF0dGVyKCk7XG4gIH1cbn1cblxuaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgaW5pdERldigpO1xufVxuY29uc3QgY29tcGlsZSA9ICgpID0+IHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuKFxuICAgICAgYFJ1bnRpbWUgY29tcGlsYXRpb24gaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJ1aWxkIG9mIFZ1ZS5gICsgKGAgQ29uZmlndXJlIHlvdXIgYnVuZGxlciB0byBhbGlhcyBcInZ1ZVwiIHRvIFwidnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzXCIuYCApXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgY29tcGlsZSB9O1xuIiwiPCEtLVxuICogQEF1dGhvcjogeWxfbGlcbiAqIEBEYXRlOiAyMDI0LTA4LTIzXG4gKiBATGFzdEVkaXRvcnM6IHlsX2xpXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTA4LTIzXG4gKiBAZGVzY3JpcHRpb246IFxuLS0+XG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+MTExPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+PC9zdHlsZT5cbiIsIi8qXG4gKiBAQXV0aG9yOiB5bF9saVxuICogQERhdGU6IDIwMjQtMDgtMjBcbiAqIEBMYXN0RWRpdG9yczogeWxfbGlcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjQtMDgtMjNcbiAqIEBkZXNjcmlwdGlvbjogXG4gKi9cblxuaW1wb3J0IHsgUGx1Z2luLCBNZW51IH0gZnJvbSAnc2l5dWFuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC52dWUnXG5pbXBvcnQgeyBjcmVhdGVBcHAgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGFwcCA9ICgpID0+IGNyZWF0ZUFwcChBcHApXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE10YXNrUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgdGhpcy5hZGRJY29ucyhgPHN2ZyBpZD1cIm15dGFzay1pY29uXCIgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02IDQySDQyVjZIMzJIMzBDMjguNjc1OCA5LjE1ODU0IDI2LjY3NTggMTAuNzM3OCAyNCAxMC43Mzc4QzIxLjMyNDIgMTAuNzM3OCAxOS4zMjQyIDkuMTU4NTQgMTggNkgxNkg2VjQyWlwiIGZpbGw9XCIjZmZmZmYxXCIgc3Ryb2tlPVwiIzMzM1wiIHN0cm9rZS13aWR0aD1cIjRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz48cGF0aCBkPVwiTTE1IDI0TDIxIDMwTDMzIDE4XCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjRcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+PC9zdmc+YClcbiAgICB0aGlzLmFkZERvY2soe1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnUmlnaHRUb3AnLFxuICAgICAgICBzaXplOiB7IHdpZHRoOiAyMDAsIGhlaWdodDogMCB9LFxuICAgICAgICBpY29uOiBcIm15dGFzay1pY29uXCIsXG4gICAgICAgIHRpdGxlOiBcIk10YXNrXCJcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7fSxcbiAgICAgIHR5cGU6ICdkb2NrX3RhYicsXG4gICAgICBhc3luYyBpbml0KCkge1xuICAgICAgICAvLyDmt7vliqBpZFxuICAgICAgICB0aGlzLmVsZW1lbnQuaWQgPSAnc2l5dWFuLW10YXNrJ1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFwcCgpLm1vdW50KHRoaXMuZWxlbWVudClcbiAgICAgICAgfSwgMTAwKVxuICAgICAgfSxcbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZXN0cm95IGRvY2s6IGRvY2tfdGFiJylcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG59XG4iXSwibmFtZXMiOlsic2V0IiwiaGFzT3duUHJvcGVydHkiLCJ3YXJuIiwidHJpZ2dlciIsImNvbXB1dGVkIiwiaXNSZWFkb25seSIsInNlbGYiLCJwIiwiYXBwIiwidmVyc2lvbiIsImdldCIsImgiLCJjcmVhdGVBcHAiLCJyZWYiLCJlZmZlY3QiLCJyZW1vdmUyIiwicmVtb3ZlIiwiaXNGbHVzaGluZyIsImlzTW9kZWxMaXN0ZW5lciIsImVtaXQiLCJpc0Jvb2xlYW4iLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFFQSxTQUFTLFFBQVEsS0FBSyxrQkFBa0I7QUFDdEMsUUFBTUEsT0FBTSxJQUFJLElBQUksSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUNsQyxTQUFnRSxDQUFDLFFBQVFBLEtBQUksSUFBSSxHQUFHO0FBQ3RGO0FBRUEsTUFBTSxZQUFZLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsT0FBTyxPQUFPLENBQUUsQ0FBQSxJQUFJLENBQUE7QUFDbEYsTUFBTSxZQUFZLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsT0FBTyxPQUFPLENBQUUsQ0FBQSxJQUFJLENBQUE7QUFDbEYsTUFBTSxPQUFPLE1BQU07QUFDbkI7QUFDQSxNQUFNLEtBQUssTUFBTTtBQUNqQixNQUFNLE9BQU8sQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU0sT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNO0FBQUEsQ0FDeEUsSUFBSSxXQUFXLENBQUMsSUFBSSxPQUFPLElBQUksV0FBVyxDQUFDLElBQUk7QUFDaEQsTUFBTSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksV0FBVyxXQUFXO0FBQzNELE1BQU0sU0FBUyxPQUFPO0FBQ3RCLE1BQU0sU0FBUyxDQUFDLEtBQUssT0FBTztBQUMxQixRQUFNLElBQUksSUFBSSxRQUFRLEVBQUU7QUFDeEIsTUFBSSxJQUFJLElBQUk7QUFDVixRQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsRUFDaEI7QUFDSDtBQUNBLE1BQU1DLG1CQUFpQixPQUFPLFVBQVU7QUFDeEMsTUFBTSxTQUFTLENBQUMsS0FBSyxRQUFRQSxpQkFBZSxLQUFLLEtBQUssR0FBRztBQUN6RCxNQUFNLFVBQVUsTUFBTTtBQUN0QixNQUFNLFFBQVEsQ0FBQyxRQUFRLGFBQWEsR0FBRyxNQUFNO0FBQzdDLE1BQU0sUUFBUSxDQUFDLFFBQVEsYUFBYSxHQUFHLE1BQU07QUFHN0MsTUFBTSxhQUFhLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFDM0MsTUFBTSxXQUFXLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFDekMsTUFBTSxXQUFXLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFDekMsTUFBTSxXQUFXLENBQUMsUUFBUSxRQUFRLFFBQVEsT0FBTyxRQUFRO0FBQ3pELE1BQU0sWUFBWSxDQUFDLFFBQVE7QUFDekIsVUFBUSxTQUFTLEdBQUcsS0FBSyxXQUFXLEdBQUcsTUFBTSxXQUFXLElBQUksSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFLO0FBQzNGO0FBQ0EsTUFBTSxpQkFBaUIsT0FBTyxVQUFVO0FBQ3hDLE1BQU0sZUFBZSxDQUFDLFVBQVUsZUFBZSxLQUFLLEtBQUs7QUFDekQsTUFBTSxZQUFZLENBQUMsVUFBVTtBQUMzQixTQUFPLGFBQWEsS0FBSyxFQUFFLE1BQU0sR0FBRyxFQUFFO0FBQ3hDO0FBQ0EsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLGFBQWEsR0FBRyxNQUFNO0FBQ3JELE1BQU0sZUFBZSxDQUFDLFFBQVEsU0FBUyxHQUFHLEtBQUssUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUssRUFBRSxNQUFNO0FBQzdHLE1BQU0saUJBQWlDO0FBQUE7QUFBQSxFQUVyQztBQUNGO0FBQ0EsTUFBTSxxQkFBcUM7QUFBQSxFQUN6QztBQUNGO0FBQ0EsTUFBTSxzQkFBc0IsQ0FBQyxPQUFPO0FBQ2xDLFFBQU0sUUFBd0IsdUJBQU8sT0FBTyxJQUFJO0FBQ2hELFNBQU8sQ0FBQyxRQUFRO0FBQ2QsVUFBTSxNQUFNLE1BQU0sR0FBRztBQUNyQixXQUFPLFFBQVEsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDdEM7QUFDQTtBQUNBLE1BQU0sYUFBYTtBQUNuQixNQUFNLFdBQVcsb0JBQW9CLENBQUMsUUFBUTtBQUM1QyxTQUFPLElBQUksUUFBUSxZQUFZLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRSxZQUFhLElBQUcsRUFBRTtBQUNuRSxDQUFDO0FBQ0QsTUFBTSxjQUFjO0FBQ3BCLE1BQU0sWUFBWTtBQUFBLEVBQ2hCLENBQUMsUUFBUSxJQUFJLFFBQVEsYUFBYSxLQUFLLEVBQUUsWUFBYTtBQUN4RDtBQUNBLE1BQU0sYUFBYSxvQkFBb0IsQ0FBQyxRQUFRO0FBQzlDLFNBQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxZQUFXLElBQUssSUFBSSxNQUFNLENBQUM7QUFDbEQsQ0FBQztBQUNELE1BQU0sZUFBZSxvQkFBb0IsQ0FBQyxRQUFRO0FBQ2hELFFBQU0sSUFBSSxNQUFNLEtBQUssV0FBVyxHQUFHLENBQUMsS0FBSztBQUN6QyxTQUFPO0FBQ1QsQ0FBQztBQUNELE1BQU0sYUFBYSxDQUFDLE9BQU8sYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLFFBQVE7QUFDbEUsTUFBTSxpQkFBaUIsQ0FBQyxRQUFRLFFBQVE7QUFDdEMsV0FBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSztBQUNuQyxRQUFJLENBQUMsRUFBRSxHQUFHLEdBQUc7QUFBQSxFQUNkO0FBQ0g7QUFDQSxNQUFNLE1BQU0sQ0FBQyxLQUFLLEtBQUssT0FBTyxXQUFXLFVBQVU7QUFDakQsU0FBTyxlQUFlLEtBQUssS0FBSztBQUFBLElBQzlCLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLEVBQ0osQ0FBRztBQUNIO0FBQ0EsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRO0FBQzdCLFFBQU0sSUFBSSxXQUFXLEdBQUc7QUFDeEIsU0FBTyxNQUFNLENBQUMsSUFBSSxNQUFNO0FBQzFCO0FBS0EsSUFBSTtBQUNKLE1BQU0sZ0JBQWdCLE1BQU07QUFDMUIsU0FBTyxnQkFBZ0IsY0FBYyxPQUFPLGVBQWUsY0FBYyxhQUFhLE9BQU8sU0FBUyxjQUFjLE9BQU8sT0FBTyxXQUFXLGNBQWMsU0FBUyxPQUFPLFdBQVcsY0FBYyxTQUFTLENBQUE7QUFDL007QUEwSUEsU0FBUyxlQUFlLE9BQU87QUFDN0IsTUFBSSxRQUFRLEtBQUssR0FBRztBQUNsQixVQUFNLE1BQU0sQ0FBQTtBQUNaLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsWUFBTSxPQUFPLE1BQU0sQ0FBQztBQUNwQixZQUFNLGFBQWEsU0FBUyxJQUFJLElBQUksaUJBQWlCLElBQUksSUFBSSxlQUFlLElBQUk7QUFDaEYsVUFBSSxZQUFZO0FBQ2QsbUJBQVcsT0FBTyxZQUFZO0FBQzVCLGNBQUksR0FBRyxJQUFJLFdBQVcsR0FBRztBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDRCxXQUFPO0FBQUEsRUFDUixXQUFVLFNBQVMsS0FBSyxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQzdDLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUFDQSxNQUFNLGtCQUFrQjtBQUN4QixNQUFNLHNCQUFzQjtBQUM1QixNQUFNLGlCQUFpQjtBQUN2QixTQUFTLGlCQUFpQixTQUFTO0FBQ2pDLFFBQU0sTUFBTSxDQUFBO0FBQ1osVUFBUSxRQUFRLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxlQUFlLEVBQUUsUUFBUSxDQUFDLFNBQVM7QUFDM0UsUUFBSSxNQUFNO0FBQ1IsWUFBTSxNQUFNLEtBQUssTUFBTSxtQkFBbUI7QUFDMUMsVUFBSSxTQUFTLE1BQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFJLENBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFNO0FBQUEsSUFDdEQ7QUFBQSxFQUNMLENBQUc7QUFDRCxTQUFPO0FBQ1Q7QUFlQSxTQUFTLGVBQWUsT0FBTztBQUM3QixNQUFJLE1BQU07QUFDVixNQUFJLFNBQVMsS0FBSyxHQUFHO0FBQ25CLFVBQU07QUFBQSxFQUNWLFdBQWEsUUFBUSxLQUFLLEdBQUc7QUFDekIsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxZQUFNLGFBQWEsZUFBZSxNQUFNLENBQUMsQ0FBQztBQUMxQyxVQUFJLFlBQVk7QUFDZCxlQUFPLGFBQWE7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNMLFdBQWEsU0FBUyxLQUFLLEdBQUc7QUFDMUIsZUFBVyxRQUFRLE9BQU87QUFDeEIsVUFBSSxNQUFNLElBQUksR0FBRztBQUNmLGVBQU8sT0FBTztBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNELFNBQU8sSUFBSTtBQUNiO0FBYUEsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sV0FBVztBQUNqQixNQUFNLFlBQVk7QUFFbEIsTUFBTSxZQUE0Qix3QkFBUSxTQUFTO0FBQ25ELE1BQU0sV0FBMkIsd0JBQVEsUUFBUTtBQUNqRCxNQUFNLGNBQThCLHdCQUFRLFNBQVM7QUFHckQsTUFBTSxzQkFBc0I7QUFDNUIsTUFBTSx1QkFBdUMsd0JBQVEsbUJBQW1CO0FBSXhFLFNBQVMsbUJBQW1CLE9BQU87QUFDakMsU0FBTyxDQUFDLENBQUMsU0FBUyxVQUFVO0FBQzlCO0FDNVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxTQUFTQyxPQUFLLFFBQVEsTUFBTTtBQUMxQixVQUFRLEtBQUssY0FBYyxHQUFHLElBQUksR0FBRyxJQUFJO0FBQzNDO0FBRUEsSUFBSTtBQUNKLE1BQU0sWUFBWTtBQUFBLEVBQ2hCLFlBQVksV0FBVyxPQUFPO0FBQzVCLFNBQUssV0FBVztBQUloQixTQUFLLFVBQVU7QUFJZixTQUFLLFVBQVU7QUFJZixTQUFLLFdBQVc7QUFDaEIsU0FBSyxTQUFTO0FBQ2QsUUFBSSxDQUFDLFlBQVksbUJBQW1CO0FBQ2xDLFdBQUssU0FBUyxrQkFBa0IsV0FBVyxrQkFBa0IsU0FBUyxDQUFFLElBQUc7QUFBQSxRQUN6RTtBQUFBLE1BQ0QsSUFBRztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDRCxJQUFJLFNBQVM7QUFDWCxXQUFPLEtBQUs7QUFBQSxFQUNiO0FBQUEsRUFDRCxJQUFJLElBQUk7QUFDTixRQUFJLEtBQUssU0FBUztBQUNoQixZQUFNLHFCQUFxQjtBQUMzQixVQUFJO0FBQ0YsNEJBQW9CO0FBQ3BCLGVBQU8sR0FBRTtBQUFBLE1BQ2pCLFVBQWdCO0FBQ1IsNEJBQW9CO0FBQUEsTUFDckI7QUFBQSxJQUNQLFdBQWUsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDcERBLGFBQUssc0NBQXNDO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtELEtBQUs7QUFDSCx3QkFBb0I7QUFBQSxFQUNyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLRCxNQUFNO0FBQ0osd0JBQW9CLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBQ0QsS0FBSyxZQUFZO0FBQ2YsUUFBSSxLQUFLLFNBQVM7QUFDaEIsVUFBSSxHQUFHO0FBQ1AsV0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUMvQyxhQUFLLFFBQVEsQ0FBQyxFQUFFLEtBQUk7QUFBQSxNQUNyQjtBQUNELFdBQUssSUFBSSxHQUFHLElBQUksS0FBSyxTQUFTLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDaEQsYUFBSyxTQUFTLENBQUM7TUFDaEI7QUFDRCxVQUFJLEtBQUssUUFBUTtBQUNmLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxPQUFPLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDOUMsZUFBSyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUk7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFDRCxVQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssVUFBVSxDQUFDLFlBQVk7QUFDaEQsY0FBTSxPQUFPLEtBQUssT0FBTyxPQUFPLElBQUc7QUFDbkMsWUFBSSxRQUFRLFNBQVMsTUFBTTtBQUN6QixlQUFLLE9BQU8sT0FBTyxLQUFLLEtBQUssSUFBSTtBQUNqQyxlQUFLLFFBQVEsS0FBSztBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUNELFdBQUssU0FBUztBQUNkLFdBQUssVUFBVTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNIO0FBSUEsU0FBUyxrQkFBa0IsUUFBUSxRQUFRLG1CQUFtQjtBQUM1RCxNQUFJLFNBQVMsTUFBTSxRQUFRO0FBQ3pCLFVBQU0sUUFBUSxLQUFLLE1BQU07QUFBQSxFQUMxQjtBQUNIO0FBQ0EsU0FBUyxrQkFBa0I7QUFDekIsU0FBTztBQUNUO0FBV0EsSUFBSTtBQUNKLE1BQU0sZUFBZTtBQUFBLEVBQ25CLFlBQVksSUFBSUMsVUFBUyxXQUFXLE9BQU87QUFDekMsU0FBSyxLQUFLO0FBQ1YsU0FBSyxVQUFVQTtBQUNmLFNBQUssWUFBWTtBQUNqQixTQUFLLFNBQVM7QUFDZCxTQUFLLE9BQU87QUFJWixTQUFLLGNBQWM7QUFJbkIsU0FBSyxXQUFXO0FBSWhCLFNBQUssWUFBWTtBQUlqQixTQUFLLGtCQUFrQjtBQUl2QixTQUFLLGNBQWM7QUFDbkIsc0JBQWtCLE1BQU0sS0FBSztBQUFBLEVBQzlCO0FBQUEsRUFDRCxJQUFJLFFBQVE7QUFDVixRQUFJLEtBQUssZ0JBQWdCLEtBQUssS0FBSyxnQkFBZ0IsR0FBRztBQUNwRCxXQUFLLGNBQWM7QUFDbkI7QUFDQSxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssYUFBYSxLQUFLO0FBQ3pDLGNBQU0sTUFBTSxLQUFLLEtBQUssQ0FBQztBQUN2QixZQUFJLElBQUksVUFBVTtBQUNoQiwwQkFBZ0IsSUFBSSxRQUFRO0FBQzVCLGNBQUksS0FBSyxlQUFlLEdBQUc7QUFDekI7QUFBQSxVQUNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDRCxVQUFJLEtBQUssZ0JBQWdCLEdBQUc7QUFDMUIsYUFBSyxjQUFjO0FBQUEsTUFDcEI7QUFDRDtJQUNEO0FBQ0QsV0FBTyxLQUFLLGVBQWU7QUFBQSxFQUM1QjtBQUFBLEVBQ0QsSUFBSSxNQUFNLEdBQUc7QUFDWCxTQUFLLGNBQWMsSUFBSSxJQUFJO0FBQUEsRUFDNUI7QUFBQSxFQUNELE1BQU07QUFDSixTQUFLLGNBQWM7QUFDbkIsUUFBSSxDQUFDLEtBQUssUUFBUTtBQUNoQixhQUFPLEtBQUs7SUFDYjtBQUNELFFBQUksa0JBQWtCO0FBQ3RCLFFBQUksYUFBYTtBQUNqQixRQUFJO0FBQ0Ysb0JBQWM7QUFDZCxxQkFBZTtBQUNmLFdBQUs7QUFDTCx1QkFBaUIsSUFBSTtBQUNyQixhQUFPLEtBQUs7SUFDbEIsVUFBYztBQUNSLHdCQUFrQixJQUFJO0FBQ3RCLFdBQUs7QUFDTCxxQkFBZTtBQUNmLG9CQUFjO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFBQSxFQUNELE9BQU87QUFDTCxRQUFJLEtBQUssUUFBUTtBQUNmLHVCQUFpQixJQUFJO0FBQ3JCLHdCQUFrQixJQUFJO0FBQ3RCLFdBQUssVUFBVSxLQUFLO0FBQ3BCLFdBQUssU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQ0g7QUFDQSxTQUFTLGdCQUFnQkMsV0FBVTtBQUNqQyxTQUFPQSxVQUFTO0FBQ2xCO0FBQ0EsU0FBUyxpQkFBaUIsU0FBUztBQUNqQyxVQUFRO0FBQ1IsVUFBUSxjQUFjO0FBQ3hCO0FBQ0EsU0FBUyxrQkFBa0IsU0FBUztBQUNsQyxNQUFJLFFBQVEsS0FBSyxTQUFTLFFBQVEsYUFBYTtBQUM3QyxhQUFTLElBQUksUUFBUSxhQUFhLElBQUksUUFBUSxLQUFLLFFBQVEsS0FBSztBQUM5RCx1QkFBaUIsUUFBUSxLQUFLLENBQUMsR0FBRyxPQUFPO0FBQUEsSUFDMUM7QUFDRCxZQUFRLEtBQUssU0FBUyxRQUFRO0FBQUEsRUFDL0I7QUFDSDtBQUNBLFNBQVMsaUJBQWlCLEtBQUssU0FBUztBQUN0QyxRQUFNLFVBQVUsSUFBSSxJQUFJLE9BQU87QUFDL0IsTUFBSSxZQUFZLFVBQVUsUUFBUSxhQUFhLFNBQVM7QUFDdEQsUUFBSSxPQUFPLE9BQU87QUFDbEIsUUFBSSxJQUFJLFNBQVMsR0FBRztBQUNsQixVQUFJLFFBQU87QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUNIO0FBd0JBLElBQUksY0FBYztBQUNsQixJQUFJLHFCQUFxQjtBQUN6QixNQUFNLGFBQWEsQ0FBQTtBQUNuQixTQUFTLGdCQUFnQjtBQUN2QixhQUFXLEtBQUssV0FBVztBQUMzQixnQkFBYztBQUNoQjtBQUtBLFNBQVMsZ0JBQWdCO0FBQ3ZCLFFBQU0sT0FBTyxXQUFXO0FBQ3hCLGdCQUFjLFNBQVMsU0FBUyxPQUFPO0FBQ3pDO0FBQ0EsU0FBUyxrQkFBa0I7QUFDekI7QUFDRjtBQUNBLFNBQVMsa0JBQWtCO0FBQ3pCO0FBQ0EsU0FBTyxDQUFDLHNCQUFzQixzQkFBc0IsUUFBUTtBQUMxRCwwQkFBc0IsTUFBSztFQUM1QjtBQUNIO0FBQ0EsU0FBUyxZQUFZLFNBQVMsS0FBSyx3QkFBd0I7QUFDekQsTUFBSTtBQUNKLE1BQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxRQUFRLFVBQVU7QUFDekMsUUFBSSxJQUFJLFNBQVMsUUFBUSxRQUFRO0FBQ2pDLFVBQU0sU0FBUyxRQUFRLEtBQUssUUFBUSxXQUFXO0FBQy9DLFFBQUksV0FBVyxLQUFLO0FBQ2xCLFVBQUksUUFBUTtBQUNWLHlCQUFpQixRQUFRLE9BQU87QUFBQSxNQUNqQztBQUNELGNBQVEsS0FBSyxRQUFRLGFBQWEsSUFBSTtBQUFBLElBQzVDLE9BQVc7QUFDTCxjQUFRO0FBQUEsSUFDVDtBQUNELFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsT0FBQyxLQUFLLFFBQVEsWUFBWSxPQUFPLFNBQVMsR0FBRyxLQUFLLFNBQVMsT0FBTyxFQUFFLFFBQVEsUUFBUyxHQUFFLHNCQUFzQixDQUFDO0FBQUEsSUFDL0c7QUFBQSxFQUNGO0FBQ0g7QUFDQSxNQUFNLHdCQUF3QixDQUFBO0FBQzlCLFNBQVMsZUFBZSxLQUFLLFlBQVksd0JBQXdCO0FBQy9ELE1BQUk7QUFDSjtBQUNBLGFBQVcsV0FBVyxJQUFJLFFBQVE7QUFDaEMsUUFBSTtBQUNKLFFBQUksUUFBUSxjQUFjLGVBQWUsWUFBWSxPQUFPLFdBQVcsV0FBVyxJQUFJLElBQUksT0FBTyxNQUFNLFFBQVEsV0FBVztBQUN4SCxjQUFRLG9CQUFvQixRQUFRLGtCQUFrQixRQUFRLGdCQUFnQjtBQUM5RSxjQUFRLGNBQWM7QUFBQSxJQUN2QjtBQUNELFFBQUksUUFBUSxvQkFBb0IsWUFBWSxPQUFPLFdBQVcsV0FBVyxJQUFJLElBQUksT0FBTyxNQUFNLFFBQVEsV0FBVztBQUMvRyxVQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLFNBQUMsS0FBSyxRQUFRLGNBQWMsT0FBTyxTQUFTLEdBQUcsS0FBSyxTQUFTLE9BQU8sRUFBRSxRQUFRLFFBQVMsR0FBRSxzQkFBc0IsQ0FBQztBQUFBLE1BQ2pIO0FBQ0QsY0FBUSxRQUFPO0FBQ2YsV0FBSyxDQUFDLFFBQVEsYUFBYSxRQUFRLGlCQUFpQixRQUFRLGdCQUFnQixHQUFHO0FBQzdFLGdCQUFRLGtCQUFrQjtBQUMxQixZQUFJLFFBQVEsV0FBVztBQUNyQixnQ0FBc0IsS0FBSyxRQUFRLFNBQVM7QUFBQSxRQUM3QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNEO0FBQ0Y7QUFFQSxNQUFNLFlBQVksQ0FBQyxTQUFTQSxjQUFhO0FBQ3ZDLFFBQU0sTUFBc0Isb0JBQUk7QUFDaEMsTUFBSSxVQUFVO0FBQ2QsTUFBSSxXQUFXQTtBQUNmLFNBQU87QUFDVDtBQUVBLE1BQU0sWUFBNEIsb0JBQUk7QUFDdEMsTUFBTSxjQUFjLE9BQU8sQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixZQUFZLEVBQUU7QUFDckYsTUFBTSxzQkFBc0IsT0FBTyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLG9CQUFvQixFQUFFO0FBQ3JHLFNBQVMsTUFBTSxRQUFRLE1BQU0sS0FBSztBQUNoQyxNQUFJLGVBQWUsY0FBYztBQUMvQixRQUFJLFVBQVUsVUFBVSxJQUFJLE1BQU07QUFDbEMsUUFBSSxDQUFDLFNBQVM7QUFDWixnQkFBVSxJQUFJLFFBQVEsVUFBMEIsb0JBQUksSUFBSyxDQUFBO0FBQUEsSUFDMUQ7QUFDRCxRQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDekIsUUFBSSxDQUFDLEtBQUs7QUFDUixjQUFRLElBQUksS0FBSyxNQUFNLFVBQVUsTUFBTSxRQUFRLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFBQSxJQUM1RDtBQUNEO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0I7QUFBQSxRQUMxQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRCxJQUFHO0FBQUEsSUFDVjtBQUFBLEVBQ0c7QUFDSDtBQUNBLFNBQVMsUUFBUSxRQUFRLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVztBQUNqRSxRQUFNLFVBQVUsVUFBVSxJQUFJLE1BQU07QUFDcEMsTUFBSSxDQUFDLFNBQVM7QUFDWjtBQUFBLEVBQ0Q7QUFDRCxNQUFJLE9BQU8sQ0FBQTtBQUNYLE1BQUksU0FBUyxTQUFTO0FBQ3BCLFdBQU8sQ0FBQyxHQUFHLFFBQVEsT0FBUSxDQUFBO0FBQUEsRUFDNUIsV0FBVSxRQUFRLFlBQVksUUFBUSxNQUFNLEdBQUc7QUFDOUMsVUFBTSxZQUFZLE9BQU8sUUFBUTtBQUNqQyxZQUFRLFFBQVEsQ0FBQyxLQUFLLFNBQVM7QUFDN0IsVUFBSSxTQUFTLFlBQVksQ0FBQyxTQUFTLElBQUksS0FBSyxRQUFRLFdBQVc7QUFDN0QsYUFBSyxLQUFLLEdBQUc7QUFBQSxNQUNkO0FBQUEsSUFDUCxDQUFLO0FBQUEsRUFDTCxPQUFTO0FBQ0wsUUFBSSxRQUFRLFFBQVE7QUFDbEIsV0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUM7QUFBQSxJQUMzQjtBQUNELFlBQVEsTUFBSTtBQUFBLE1BQ1YsS0FBSztBQUNILFlBQUksQ0FBQyxRQUFRLE1BQU0sR0FBRztBQUNwQixlQUFLLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUNsQyxjQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLGlCQUFLLEtBQUssUUFBUSxJQUFJLG1CQUFtQixDQUFDO0FBQUEsVUFDM0M7QUFBQSxRQUNYLFdBQW1CLGFBQWEsR0FBRyxHQUFHO0FBQzVCLGVBQUssS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDO0FBQUEsUUFDaEM7QUFDRDtBQUFBLE1BQ0YsS0FBSztBQUNILFlBQUksQ0FBQyxRQUFRLE1BQU0sR0FBRztBQUNwQixlQUFLLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUNsQyxjQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLGlCQUFLLEtBQUssUUFBUSxJQUFJLG1CQUFtQixDQUFDO0FBQUEsVUFDM0M7QUFBQSxRQUNGO0FBQ0Q7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLGVBQUssS0FBSyxRQUFRLElBQUksV0FBVyxDQUFDO0FBQUEsUUFDbkM7QUFDRDtBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Q7QUFDQSxhQUFXLE9BQU8sTUFBTTtBQUN0QixRQUFJLEtBQUs7QUFDUDtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsUUFDQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCO0FBQUEsVUFDMUM7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0QsSUFBRztBQUFBLE1BQ1o7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUNEO0FBQ0Y7QUFNQSxNQUFNLHFCQUFxQyx3QkFBUSw2QkFBNkI7QUFDaEYsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLEVBQ1QsdUJBQU8sb0JBQW9CLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxRQUFRLGVBQWUsUUFBUSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLFFBQVE7QUFDdko7QUFDQSxNQUFNLHdCQUF3Qyw0Q0FBMkI7QUFDekUsU0FBUyw4QkFBOEI7QUFDckMsUUFBTSxtQkFBbUIsQ0FBQTtBQUN6QixHQUFDLFlBQVksV0FBVyxhQUFhLEVBQUUsUUFBUSxDQUFDLFFBQVE7QUFDdEQscUJBQWlCLEdBQUcsSUFBSSxZQUFZLE1BQU07QUFDeEMsWUFBTSxNQUFNLE1BQU0sSUFBSTtBQUN0QixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSztBQUMzQyxjQUFNLEtBQUssT0FBTyxJQUFJLEVBQUU7QUFBQSxNQUN6QjtBQUNELFlBQU0sTUFBTSxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUk7QUFDNUIsVUFBSSxRQUFRLE1BQU0sUUFBUSxPQUFPO0FBQy9CLGVBQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsTUFDMUMsT0FBYTtBQUNMLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDUDtBQUFBLEVBQ0EsQ0FBRztBQUNELEdBQUMsUUFBUSxPQUFPLFNBQVMsV0FBVyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7QUFDN0QscUJBQWlCLEdBQUcsSUFBSSxZQUFZLE1BQU07QUFDeEM7QUFDQTtBQUNBLFlBQU0sTUFBTSxNQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLElBQUk7QUFDN0M7QUFDQTtBQUNBLGFBQU87QUFBQSxJQUNiO0FBQUEsRUFDQSxDQUFHO0FBQ0QsU0FBTztBQUNUO0FBQ0EsU0FBUyxlQUFlLEtBQUs7QUFDM0IsTUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFHLE9BQU0sT0FBTyxHQUFHO0FBQ3BDLFFBQU0sTUFBTSxNQUFNLElBQUk7QUFDdEIsUUFBTSxLQUFLLE9BQU8sR0FBRztBQUNyQixTQUFPLElBQUksZUFBZSxHQUFHO0FBQy9CO0FBQ0EsTUFBTSxvQkFBb0I7QUFBQSxFQUN4QixZQUFZLGNBQWMsT0FBTyxhQUFhLE9BQU87QUFDbkQsU0FBSyxjQUFjO0FBQ25CLFNBQUssYUFBYTtBQUFBLEVBQ25CO0FBQUEsRUFDRCxJQUFJLFFBQVEsS0FBSyxVQUFVO0FBQ3pCLFVBQU0sY0FBYyxLQUFLLGFBQWEsYUFBYSxLQUFLO0FBQ3hELFFBQUksUUFBUSxrQkFBa0I7QUFDNUIsYUFBTyxDQUFDO0FBQUEsSUFDZCxXQUFlLFFBQVEsa0JBQWtCO0FBQ25DLGFBQU87QUFBQSxJQUNiLFdBQWUsUUFBUSxpQkFBaUI7QUFDbEMsYUFBTztBQUFBLElBQ2IsV0FBZSxRQUFRLFdBQVc7QUFDNUIsVUFBSSxjQUFjLGNBQWMsYUFBYSxxQkFBcUIsY0FBYyxhQUFhLHFCQUFxQixhQUFhLElBQUksTUFBTTtBQUFBO0FBQUEsTUFFekksT0FBTyxlQUFlLE1BQU0sTUFBTSxPQUFPLGVBQWUsUUFBUSxHQUFHO0FBQ2pFLGVBQU87QUFBQSxNQUNSO0FBQ0Q7QUFBQSxJQUNEO0FBQ0QsVUFBTSxnQkFBZ0IsUUFBUSxNQUFNO0FBQ3BDLFFBQUksQ0FBQyxhQUFhO0FBQ2hCLFVBQUksaUJBQWlCLE9BQU8sdUJBQXVCLEdBQUcsR0FBRztBQUN2RCxlQUFPLFFBQVEsSUFBSSx1QkFBdUIsS0FBSyxRQUFRO0FBQUEsTUFDeEQ7QUFDRCxVQUFJLFFBQVEsa0JBQWtCO0FBQzVCLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUNELFVBQU0sTUFBTSxRQUFRLElBQUksUUFBUSxLQUFLLFFBQVE7QUFDN0MsUUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLElBQUksR0FBRyxJQUFJLG1CQUFtQixHQUFHLEdBQUc7QUFDckUsYUFBTztBQUFBLElBQ1I7QUFDRCxRQUFJLENBQUMsYUFBYTtBQUNoQixZQUFNLFFBQVEsT0FBTyxHQUFHO0FBQUEsSUFDekI7QUFDRCxRQUFJLFlBQVk7QUFDZCxhQUFPO0FBQUEsSUFDUjtBQUNELFFBQUksTUFBTSxHQUFHLEdBQUc7QUFDZCxhQUFPLGlCQUFpQixhQUFhLEdBQUcsSUFBSSxNQUFNLElBQUk7QUFBQSxJQUN2RDtBQUNELFFBQUksU0FBUyxHQUFHLEdBQUc7QUFDakIsYUFBTyxjQUFjLFNBQVMsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUFBLElBQ2xEO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFDSDtBQUNBLE1BQU0sK0JBQStCLG9CQUFvQjtBQUFBLEVBQ3ZELFlBQVksYUFBYSxPQUFPO0FBQzlCLFVBQU0sT0FBTyxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNELElBQUksUUFBUSxLQUFLLE9BQU8sVUFBVTtBQUNoQyxRQUFJLFdBQVcsT0FBTyxHQUFHO0FBQ3pCLFFBQUksQ0FBQyxLQUFLLFlBQVk7QUFDcEIsWUFBTSxxQkFBcUIsV0FBVyxRQUFRO0FBQzlDLFVBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFdBQVcsS0FBSyxHQUFHO0FBQzNDLG1CQUFXLE1BQU0sUUFBUTtBQUN6QixnQkFBUSxNQUFNLEtBQUs7QUFBQSxNQUNwQjtBQUNELFVBQUksQ0FBQyxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQVEsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHO0FBQ3hELFlBQUksb0JBQW9CO0FBQ3RCLGlCQUFPO0FBQUEsUUFDakIsT0FBZTtBQUNMLG1CQUFTLFFBQVE7QUFDakIsaUJBQU87QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDRCxVQUFNLFNBQVMsUUFBUSxNQUFNLEtBQUssYUFBYSxHQUFHLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxTQUFTLE9BQU8sUUFBUSxHQUFHO0FBQ3RHLFVBQU0sU0FBUyxRQUFRLElBQUksUUFBUSxLQUFLLE9BQU8sUUFBUTtBQUN2RCxRQUFJLFdBQVcsTUFBTSxRQUFRLEdBQUc7QUFDOUIsVUFBSSxDQUFDLFFBQVE7QUFDWCxnQkFBUSxRQUFRLE9BQU8sS0FBSyxLQUFLO0FBQUEsTUFDbEMsV0FBVSxXQUFXLE9BQU8sUUFBUSxHQUFHO0FBQ3RDLGdCQUFRLFFBQVEsT0FBTyxLQUFLLE9BQU8sUUFBUTtBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUNELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxlQUFlLFFBQVEsS0FBSztBQUMxQixVQUFNLFNBQVMsT0FBTyxRQUFRLEdBQUc7QUFDakMsVUFBTSxXQUFXLE9BQU8sR0FBRztBQUMzQixVQUFNLFNBQVMsUUFBUSxlQUFlLFFBQVEsR0FBRztBQUNqRCxRQUFJLFVBQVUsUUFBUTtBQUNwQixjQUFRLFFBQVEsVUFBVSxLQUFLLFFBQVEsUUFBUTtBQUFBLElBQ2hEO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUNELElBQUksUUFBUSxLQUFLO0FBQ2YsVUFBTSxTQUFTLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFDdEMsUUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsZUFBZSxJQUFJLEdBQUcsR0FBRztBQUM5QyxZQUFNLFFBQVEsT0FBTyxHQUFHO0FBQUEsSUFDekI7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0QsUUFBUSxRQUFRO0FBQ2Q7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxNQUFNLElBQUksV0FBVztBQUFBLElBQ25DO0FBQ0ksV0FBTyxRQUFRLFFBQVEsTUFBTTtBQUFBLEVBQzlCO0FBQ0g7QUFDQSxNQUFNLGdDQUFnQyxvQkFBb0I7QUFBQSxFQUN4RCxZQUFZLGFBQWEsT0FBTztBQUM5QixVQUFNLE1BQU0sVUFBVTtBQUFBLEVBQ3ZCO0FBQUEsRUFDRCxJQUFJLFFBQVEsS0FBSztBQUNmLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0NGO0FBQUFBLFFBQ0UseUJBQXlCLE9BQU8sR0FBRyxDQUFDO0FBQUEsUUFDcEM7QUFBQSxNQUNSO0FBQUEsSUFDSztBQUNELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxlQUFlLFFBQVEsS0FBSztBQUMxQixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDQTtBQUFBQSxRQUNFLDRCQUE0QixPQUFPLEdBQUcsQ0FBQztBQUFBLFFBQ3ZDO0FBQUEsTUFDUjtBQUFBLElBQ0s7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUNIO0FBQ0EsTUFBTSxrQkFBa0Msb0JBQUk7QUFDNUMsTUFBTSxtQkFBbUMsb0JBQUk7QUFDN0MsTUFBTSwwQkFBMEMsb0JBQUk7QUFBQSxFQUNsRDtBQUNGO0FBQ0EsTUFBTSwwQkFBMEMsb0JBQUksd0JBQXdCLElBQUk7QUFFaEYsTUFBTSxZQUFZLENBQUMsVUFBVTtBQUM3QixNQUFNLFdBQVcsQ0FBQyxNQUFNLFFBQVEsZUFBZSxDQUFDO0FBQ2hELFNBQVMsSUFBSSxRQUFRLEtBQUssY0FBYyxPQUFPLGFBQWEsT0FBTztBQUNqRSxXQUFTLE9BQU8sU0FBUztBQUN6QixRQUFNLFlBQVksTUFBTSxNQUFNO0FBQzlCLFFBQU0sU0FBUyxNQUFNLEdBQUc7QUFDeEIsTUFBSSxDQUFDLGFBQWE7QUFDaEIsUUFBSSxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQzNCLFlBQU0sV0FBVyxPQUFPLEdBQUc7QUFBQSxJQUM1QjtBQUNELFVBQU0sV0FBVyxPQUFPLE1BQU07QUFBQSxFQUMvQjtBQUNELFFBQU0sRUFBRSxLQUFLLEtBQU0sSUFBRyxTQUFTLFNBQVM7QUFDeEMsUUFBTSxPQUFPLGFBQWEsWUFBWSxjQUFjLGFBQWE7QUFDakUsTUFBSSxLQUFLLEtBQUssV0FBVyxHQUFHLEdBQUc7QUFDN0IsV0FBTyxLQUFLLE9BQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxFQUM1QixXQUFVLEtBQUssS0FBSyxXQUFXLE1BQU0sR0FBRztBQUN2QyxXQUFPLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQztBQUFBLEVBQ2xDLFdBQWEsV0FBVyxXQUFXO0FBQy9CLFdBQU8sSUFBSSxHQUFHO0FBQUEsRUFDZjtBQUNIO0FBQ0EsU0FBUyxJQUFJLEtBQUssY0FBYyxPQUFPO0FBQ3JDLFFBQU0sU0FBUyxLQUFLLFNBQVM7QUFDN0IsUUFBTSxZQUFZLE1BQU0sTUFBTTtBQUM5QixRQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLE1BQUksQ0FBQyxhQUFhO0FBQ2hCLFFBQUksV0FBVyxLQUFLLE1BQU0sR0FBRztBQUMzQixZQUFNLFdBQVcsT0FBTyxHQUFHO0FBQUEsSUFDNUI7QUFDRCxVQUFNLFdBQVcsT0FBTyxNQUFNO0FBQUEsRUFDL0I7QUFDRCxTQUFPLFFBQVEsU0FBUyxPQUFPLElBQUksR0FBRyxJQUFJLE9BQU8sSUFBSSxHQUFHLEtBQUssT0FBTyxJQUFJLE1BQU07QUFDaEY7QUFDQSxTQUFTLEtBQUssUUFBUSxjQUFjLE9BQU87QUFDekMsV0FBUyxPQUFPLFNBQVM7QUFDekIsR0FBQyxlQUFlLE1BQU0sTUFBTSxNQUFNLEdBQUcsV0FBVyxXQUFXO0FBQzNELFNBQU8sUUFBUSxJQUFJLFFBQVEsUUFBUSxNQUFNO0FBQzNDO0FBQ0EsU0FBUyxJQUFJLE9BQU8sYUFBYSxPQUFPO0FBQ3RDLE1BQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxXQUFXLEtBQUssR0FBRztBQUMxRCxZQUFRLE1BQU0sS0FBSztBQUFBLEVBQ3BCO0FBQ0QsUUFBTSxTQUFTLE1BQU0sSUFBSTtBQUN6QixRQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzdCLFFBQU0sU0FBUyxNQUFNLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDM0MsTUFBSSxDQUFDLFFBQVE7QUFDWCxXQUFPLElBQUksS0FBSztBQUNoQixZQUFRLFFBQVEsT0FBTyxPQUFPLEtBQUs7QUFBQSxFQUNwQztBQUNELFNBQU87QUFDVDtBQUNBLFNBQVMsSUFBSSxLQUFLLE9BQU8sYUFBYSxPQUFPO0FBQzNDLE1BQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxXQUFXLEtBQUssR0FBRztBQUMxRCxZQUFRLE1BQU0sS0FBSztBQUFBLEVBQ3BCO0FBQ0QsUUFBTSxTQUFTLE1BQU0sSUFBSTtBQUN6QixRQUFNLEVBQUUsS0FBSyxNQUFNLEtBQUssU0FBUyxTQUFTLE1BQU07QUFDaEQsTUFBSSxTQUFTLEtBQUssS0FBSyxRQUFRLEdBQUc7QUFDbEMsTUFBSSxDQUFDLFFBQVE7QUFDWCxVQUFNLE1BQU0sR0FBRztBQUNmLGFBQVMsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUFBLEVBQ2xDLFdBQWEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDcEQsc0JBQWtCLFFBQVEsTUFBTSxHQUFHO0FBQUEsRUFDcEM7QUFDRCxRQUFNLFdBQVcsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUN0QyxTQUFPLElBQUksS0FBSyxLQUFLO0FBQ3JCLE1BQUksQ0FBQyxRQUFRO0FBQ1gsWUFBUSxRQUFRLE9BQU8sS0FBSyxLQUFLO0FBQUEsRUFDbEMsV0FBVSxXQUFXLE9BQU8sUUFBUSxHQUFHO0FBQ3RDLFlBQVEsUUFBUSxPQUFPLEtBQUssT0FBTyxRQUFRO0FBQUEsRUFDNUM7QUFDRCxTQUFPO0FBQ1Q7QUFDQSxTQUFTLFlBQVksS0FBSztBQUN4QixRQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLFFBQU0sRUFBRSxLQUFLLE1BQU0sS0FBSyxTQUFTLFNBQVMsTUFBTTtBQUNoRCxNQUFJLFNBQVMsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUNsQyxNQUFJLENBQUMsUUFBUTtBQUNYLFVBQU0sTUFBTSxHQUFHO0FBQ2YsYUFBUyxLQUFLLEtBQUssUUFBUSxHQUFHO0FBQUEsRUFDbEMsV0FBYSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRCxzQkFBa0IsUUFBUSxNQUFNLEdBQUc7QUFBQSxFQUNwQztBQUNELFFBQU0sV0FBVyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsSUFBSTtBQUNqRCxRQUFNLFNBQVMsT0FBTyxPQUFPLEdBQUc7QUFDaEMsTUFBSSxRQUFRO0FBQ1YsWUFBUSxRQUFRLFVBQVUsS0FBSyxRQUFRLFFBQVE7QUFBQSxFQUNoRDtBQUNELFNBQU87QUFDVDtBQUNBLFNBQVMsUUFBUTtBQUNmLFFBQU0sU0FBUyxNQUFNLElBQUk7QUFDekIsUUFBTSxXQUFXLE9BQU8sU0FBUztBQUNqQyxRQUFNLFlBQVksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixNQUFNLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUk7QUFDbEgsUUFBTSxTQUFTLE9BQU87QUFDdEIsTUFBSSxVQUFVO0FBQ1osWUFBUSxRQUFRLFNBQVMsUUFBUSxRQUFRLFNBQVM7QUFBQSxFQUNuRDtBQUNELFNBQU87QUFDVDtBQUNBLFNBQVMsY0FBYyxhQUFhLFlBQVk7QUFDOUMsU0FBTyxTQUFTLFFBQVEsVUFBVSxTQUFTO0FBQ3pDLFVBQU0sV0FBVztBQUNqQixVQUFNLFNBQVMsU0FBUyxTQUFTO0FBQ2pDLFVBQU0sWUFBWSxNQUFNLE1BQU07QUFDOUIsVUFBTSxPQUFPLGFBQWEsWUFBWSxjQUFjLGFBQWE7QUFDakUsS0FBQyxlQUFlLE1BQU0sV0FBVyxXQUFXLFdBQVc7QUFDdkQsV0FBTyxPQUFPLFFBQVEsQ0FBQyxPQUFPLFFBQVE7QUFDcEMsYUFBTyxTQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxRQUFRO0FBQUEsSUFDcEUsQ0FBSztBQUFBLEVBQ0w7QUFDQTtBQUNBLFNBQVMscUJBQXFCLFFBQVEsYUFBYSxZQUFZO0FBQzdELFNBQU8sWUFBWSxNQUFNO0FBQ3ZCLFVBQU0sU0FBUyxLQUFLLFNBQVM7QUFDN0IsVUFBTSxZQUFZLE1BQU0sTUFBTTtBQUM5QixVQUFNLGNBQWMsTUFBTSxTQUFTO0FBQ25DLFVBQU0sU0FBUyxXQUFXLGFBQWEsV0FBVyxPQUFPLFlBQVk7QUFDckUsVUFBTSxZQUFZLFdBQVcsVUFBVTtBQUN2QyxVQUFNLGdCQUFnQixPQUFPLE1BQU0sRUFBRSxHQUFHLElBQUk7QUFDNUMsVUFBTSxPQUFPLGFBQWEsWUFBWSxjQUFjLGFBQWE7QUFDakUsS0FBQyxlQUFlO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBLFlBQVksc0JBQXNCO0FBQUEsSUFDeEM7QUFDSSxXQUFPO0FBQUE7QUFBQSxNQUVMLE9BQU87QUFDTCxjQUFNLEVBQUUsT0FBTyxLQUFNLElBQUcsY0FBYyxLQUFJO0FBQzFDLGVBQU8sT0FBTyxFQUFFLE9BQU8sU0FBUztBQUFBLFVBQzlCLE9BQU8sU0FBUyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUs7QUFBQSxVQUM3RDtBQUFBLFFBQ1Y7QUFBQSxNQUNPO0FBQUE7QUFBQSxNQUVELENBQUMsT0FBTyxRQUFRLElBQUk7QUFDbEIsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNQO0FBQUEsRUFDQTtBQUNBO0FBQ0EsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxTQUFPLFlBQVksTUFBTTtBQUN2QixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLFlBQU0sTUFBTSxLQUFLLENBQUMsSUFBSSxXQUFXLEtBQUssQ0FBQyxDQUFDLE9BQU87QUFDL0NBO0FBQUFBLFFBQ0UsR0FBRyxXQUFXLElBQUksQ0FBQyxjQUFjLEdBQUc7QUFBQSxRQUNwQyxNQUFNLElBQUk7QUFBQSxNQUNsQjtBQUFBLElBQ0s7QUFDRCxXQUFPLFNBQVMsV0FBVyxRQUFRLFNBQVMsVUFBVSxTQUFTO0FBQUEsRUFDbkU7QUFDQTtBQUNBLFNBQVMseUJBQXlCO0FBQ2hDLFFBQU0sMkJBQTJCO0FBQUEsSUFDL0IsSUFBSSxLQUFLO0FBQ1AsYUFBTyxJQUFJLE1BQU0sR0FBRztBQUFBLElBQ3JCO0FBQUEsSUFDRCxJQUFJLE9BQU87QUFDVCxhQUFPLEtBQUssSUFBSTtBQUFBLElBQ2pCO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUyxjQUFjLE9BQU8sS0FBSztBQUFBLEVBQ3ZDO0FBQ0UsUUFBTSwyQkFBMkI7QUFBQSxJQUMvQixJQUFJLEtBQUs7QUFDUCxhQUFPLElBQUksTUFBTSxLQUFLLE9BQU8sSUFBSTtBQUFBLElBQ2xDO0FBQUEsSUFDRCxJQUFJLE9BQU87QUFDVCxhQUFPLEtBQUssSUFBSTtBQUFBLElBQ2pCO0FBQUEsSUFDRDtBQUFBLElBQ0EsSUFBSSxPQUFPO0FBQ1QsYUFBTyxJQUFJLEtBQUssTUFBTSxPQUFPLElBQUk7QUFBQSxJQUNsQztBQUFBLElBQ0QsSUFBSSxLQUFLLE9BQU87QUFDZCxhQUFPLElBQUksS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJO0FBQUEsSUFDdkM7QUFBQSxJQUNELFFBQVE7QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTLGNBQWMsT0FBTyxJQUFJO0FBQUEsRUFDdEM7QUFDRSxRQUFNLDRCQUE0QjtBQUFBLElBQ2hDLElBQUksS0FBSztBQUNQLGFBQU8sSUFBSSxNQUFNLEtBQUssSUFBSTtBQUFBLElBQzNCO0FBQUEsSUFDRCxJQUFJLE9BQU87QUFDVCxhQUFPLEtBQUssTUFBTSxJQUFJO0FBQUEsSUFDdkI7QUFBQSxJQUNELElBQUksS0FBSztBQUNQLGFBQU8sSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJO0FBQUEsSUFDaEM7QUFBQSxJQUNELEtBQUsscUJBQXFCLEtBQUs7QUFBQSxJQUMvQixLQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDL0IsUUFBUSxxQkFBcUIsUUFBUTtBQUFBLElBQ3JDLE9BQU8scUJBQXFCLE9BQU87QUFBQSxJQUNuQyxTQUFTLGNBQWMsTUFBTSxLQUFLO0FBQUEsRUFDdEM7QUFDRSxRQUFNLG1DQUFtQztBQUFBLElBQ3ZDLElBQUksS0FBSztBQUNQLGFBQU8sSUFBSSxNQUFNLEtBQUssTUFBTSxJQUFJO0FBQUEsSUFDakM7QUFBQSxJQUNELElBQUksT0FBTztBQUNULGFBQU8sS0FBSyxNQUFNLElBQUk7QUFBQSxJQUN2QjtBQUFBLElBQ0QsSUFBSSxLQUFLO0FBQ1AsYUFBTyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUk7QUFBQSxJQUNoQztBQUFBLElBQ0QsS0FBSyxxQkFBcUIsS0FBSztBQUFBLElBQy9CLEtBQUsscUJBQXFCLEtBQUs7QUFBQSxJQUMvQixRQUFRLHFCQUFxQixRQUFRO0FBQUEsSUFDckMsT0FBTyxxQkFBcUIsT0FBTztBQUFBLElBQ25DLFNBQVMsY0FBYyxNQUFNLElBQUk7QUFBQSxFQUNyQztBQUNFLFFBQU0sa0JBQWtCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLEVBQ1g7QUFDRSxrQkFBZ0IsUUFBUSxDQUFDLFdBQVc7QUFDbEMsNkJBQXlCLE1BQU0sSUFBSSxxQkFBcUIsUUFBUSxPQUFPLEtBQUs7QUFDNUUsOEJBQTBCLE1BQU0sSUFBSSxxQkFBcUIsUUFBUSxNQUFNLEtBQUs7QUFDNUUsNkJBQXlCLE1BQU0sSUFBSSxxQkFBcUIsUUFBUSxPQUFPLElBQUk7QUFDM0UscUNBQWlDLE1BQU0sSUFBSTtBQUFBLE1BQ3pDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDQSxDQUFHO0FBQ0QsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLElBQW9CLHVDQUFzQjtBQUMxQyxTQUFTLDRCQUE0QixhQUFhLFNBQVM7QUFDekQsUUFBTSxtQkFBbUIsVUFBVSxjQUFjLGtDQUFrQywwQkFBMEIsY0FBYywyQkFBMkI7QUFDdEosU0FBTyxDQUFDLFFBQVEsS0FBSyxhQUFhO0FBQ2hDLFFBQUksUUFBUSxrQkFBa0I7QUFDNUIsYUFBTyxDQUFDO0FBQUEsSUFDZCxXQUFlLFFBQVEsa0JBQWtCO0FBQ25DLGFBQU87QUFBQSxJQUNiLFdBQWUsUUFBUSxXQUFXO0FBQzVCLGFBQU87QUFBQSxJQUNSO0FBQ0QsV0FBTyxRQUFRO0FBQUEsTUFDYixPQUFPLGtCQUFrQixHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQjtBQUFBLE1BQ3BFO0FBQUEsTUFDQTtBQUFBLElBQ047QUFBQSxFQUNBO0FBQ0E7QUFDQSxNQUFNLDRCQUE0QjtBQUFBLEVBQ2hDLEtBQXFCLDRDQUE0QixPQUFPLEtBQUs7QUFDL0Q7QUFDQSxNQUFNLDRCQUE0QjtBQUFBLEVBQ2hDLEtBQXFCLDRDQUE0QixPQUFPLElBQUk7QUFDOUQ7QUFDQSxNQUFNLDZCQUE2QjtBQUFBLEVBQ2pDLEtBQXFCLDRDQUE0QixNQUFNLEtBQUs7QUFDOUQ7QUFDQSxNQUFNLG9DQUFvQztBQUFBLEVBQ3hDLEtBQXFCLDRDQUE0QixNQUFNLElBQUk7QUFDN0Q7QUFDQSxTQUFTLGtCQUFrQixRQUFRLE1BQU0sS0FBSztBQUM1QyxRQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLE1BQUksV0FBVyxPQUFPLEtBQUssS0FBSyxRQUFRLE1BQU0sR0FBRztBQUMvQyxVQUFNLE9BQU8sVUFBVSxNQUFNO0FBQzdCQTtBQUFBQSxNQUNFLFlBQVksSUFBSSxrRUFBa0UsU0FBUyxRQUFRLGFBQWEsRUFBRTtBQUFBLElBQ3hIO0FBQUEsRUFDRztBQUNIO0FBRUEsTUFBTSxjQUE4QixvQkFBSTtBQUN4QyxNQUFNLHFCQUFxQyxvQkFBSTtBQUMvQyxNQUFNLGNBQThCLG9CQUFJO0FBQ3hDLE1BQU0scUJBQXFDLG9CQUFJO0FBQy9DLFNBQVMsY0FBYyxTQUFTO0FBQzlCLFVBQVEsU0FBTztBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsS0FBSztBQUNILGFBQU87QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFDSCxhQUFPO0FBQUEsSUFDVDtBQUNFLGFBQU87QUFBQSxFQUNWO0FBQ0g7QUFDQSxTQUFTLGNBQWMsT0FBTztBQUM1QixTQUFPLE1BQU0sVUFBVSxLQUFLLENBQUMsT0FBTyxhQUFhLEtBQUssSUFBSSxJQUFrQixjQUFjLFVBQVUsS0FBSyxDQUFDO0FBQzVHO0FBQ0EsU0FBUyxTQUFTLFFBQVE7QUFDeEIsTUFBSSxXQUFXLE1BQU0sR0FBRztBQUN0QixXQUFPO0FBQUEsRUFDUjtBQUNELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQTtBQUNBLFNBQVMsZ0JBQWdCLFFBQVE7QUFDL0IsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBO0FBQ0EsU0FBUyxTQUFTLFFBQVE7QUFDeEIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBO0FBQ0EsU0FBUyxnQkFBZ0IsUUFBUTtBQUMvQixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0E7QUFDQSxTQUFTLHFCQUFxQixRQUFRLGFBQWEsY0FBYyxvQkFBb0IsVUFBVTtBQUM3RixNQUFJLENBQUMsU0FBUyxNQUFNLEdBQUc7QUFDckIsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Q0E7QUFBQUEsUUFDRSx3QkFBd0IsY0FBYyxhQUFhLFVBQVUsS0FBSztBQUFBLFVBQ2hFO0FBQUEsUUFDVixDQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0s7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUNELE1BQUksT0FBTyxTQUFTLEtBQUssRUFBRSxlQUFlLE9BQU8sZ0JBQWdCLElBQUk7QUFDbkUsV0FBTztBQUFBLEVBQ1I7QUFDRCxRQUFNLGdCQUFnQixTQUFTLElBQUksTUFBTTtBQUN6QyxNQUFJLGVBQWU7QUFDakIsV0FBTztBQUFBLEVBQ1I7QUFDRCxRQUFNLGFBQWEsY0FBYyxNQUFNO0FBQ3ZDLE1BQUksZUFBZSxHQUFpQjtBQUNsQyxXQUFPO0FBQUEsRUFDUjtBQUNELFFBQU0sUUFBUSxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWUsSUFBcUIscUJBQXFCO0FBQUEsRUFDN0Q7QUFDRSxXQUFTLElBQUksUUFBUSxLQUFLO0FBQzFCLFNBQU87QUFDVDtBQUNBLFNBQVMsV0FBVyxPQUFPO0FBQ3pCLE1BQUksV0FBVyxLQUFLLEdBQUc7QUFDckIsV0FBTyxXQUFXLE1BQU0sU0FBUyxDQUFDO0FBQUEsRUFDbkM7QUFDRCxTQUFPLENBQUMsRUFBRSxTQUFTLE1BQU0sZ0JBQWdCO0FBQzNDO0FBQ0EsU0FBUyxXQUFXLE9BQU87QUFDekIsU0FBTyxDQUFDLEVBQUUsU0FBUyxNQUFNLGdCQUFnQjtBQUMzQztBQUNBLFNBQVMsVUFBVSxPQUFPO0FBQ3hCLFNBQU8sQ0FBQyxFQUFFLFNBQVMsTUFBTSxlQUFlO0FBQzFDO0FBQ0EsU0FBUyxRQUFRLE9BQU87QUFDdEIsU0FBTyxRQUFRLENBQUMsQ0FBQyxNQUFNLFNBQVMsSUFBSTtBQUN0QztBQUNBLFNBQVMsTUFBTSxVQUFVO0FBQ3ZCLFFBQU0sTUFBTSxZQUFZLFNBQVMsU0FBUztBQUMxQyxTQUFPLE1BQU0sTUFBTSxHQUFHLElBQUk7QUFDNUI7QUFDQSxTQUFTLFFBQVEsT0FBTztBQUN0QixNQUFJLE9BQU8sYUFBYSxLQUFLLEdBQUc7QUFDOUIsUUFBSSxPQUFPLFlBQVksSUFBSTtBQUFBLEVBQzVCO0FBQ0QsU0FBTztBQUNUO0FBQ0EsTUFBTSxhQUFhLENBQUMsVUFBVSxTQUFTLEtBQUssSUFBSSxTQUFTLEtBQUssSUFBSTtBQUNsRSxNQUFNLGFBQWEsQ0FBQyxVQUFVLFNBQVMsS0FBSyxJQUFJLFNBQVMsS0FBSyxJQUFJO0FBRWxFLE1BQU0sNEJBQTRCO0FBQ2xDLE1BQU0sZ0JBQWdCO0FBQUEsRUFDcEIsWUFBWSxRQUFRLFNBQVNHLGFBQVksT0FBTztBQUM5QyxTQUFLLFNBQVM7QUFDZCxTQUFLLFVBQVU7QUFDZixTQUFLLE1BQU07QUFDWCxTQUFLLFlBQVk7QUFDakIsU0FBSyxnQkFBZ0IsSUFBSTtBQUN6QixTQUFLLFNBQVMsSUFBSTtBQUFBLE1BQ2hCLE1BQU0sT0FBTyxLQUFLLE1BQU07QUFBQSxNQUN4QixNQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0EsS0FBSyxPQUFPLGdCQUFnQixJQUFJLElBQUk7QUFBQSxNQUNyQztBQUFBLElBQ1A7QUFDSSxTQUFLLE9BQU8sV0FBVztBQUN2QixTQUFLLE9BQU8sU0FBUyxLQUFLLGFBQWEsQ0FBQztBQUN4QyxTQUFLLGdCQUFnQixJQUFJQTtBQUFBLEVBQzFCO0FBQUEsRUFDRCxJQUFJLFFBQVE7QUFDVixVQUFNQyxRQUFPLE1BQU0sSUFBSTtBQUN2QixTQUFLLENBQUNBLE1BQUssY0FBY0EsTUFBSyxPQUFPLFVBQVUsV0FBV0EsTUFBSyxRQUFRQSxNQUFLLFNBQVNBLE1BQUssT0FBTyxJQUFHLENBQUUsR0FBRztBQUN2RyxzQkFBZ0JBLE9BQU0sQ0FBQztBQUFBLElBQ3hCO0FBQ0Qsa0JBQWNBLEtBQUk7QUFDbEIsUUFBSUEsTUFBSyxPQUFPLGVBQWUsR0FBRztBQUNoQyxVQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsS0FBSyxnQkFBZ0I7QUFDcEVKLGVBQUssMkJBQTJCO0FBQUE7QUFBQSxXQUU3QixLQUFLLE1BQU07QUFBQSxNQUNmO0FBQ0Qsc0JBQWdCSSxPQUFNLENBQUM7QUFBQSxJQUN4QjtBQUNELFdBQU9BLE1BQUs7QUFBQSxFQUNiO0FBQUEsRUFDRCxJQUFJLE1BQU0sVUFBVTtBQUNsQixTQUFLLFFBQVEsUUFBUTtBQUFBLEVBQ3RCO0FBQUE7QUFBQSxFQUVELElBQUksU0FBUztBQUNYLFdBQU8sS0FBSyxPQUFPO0FBQUEsRUFDcEI7QUFBQSxFQUNELElBQUksT0FBTyxHQUFHO0FBQ1osU0FBSyxPQUFPLFFBQVE7QUFBQSxFQUNyQjtBQUFBO0FBRUg7QUFDQSxTQUFTRixXQUFTLGlCQUFpQixjQUFjLFFBQVEsT0FBTztBQUM5RCxNQUFJO0FBQ0osTUFBSTtBQUNKLFFBQU0sYUFBYSxXQUFXLGVBQWU7QUFDN0MsTUFBSSxZQUFZO0FBQ2QsYUFBUztBQUNULGFBQVMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixNQUFNO0FBQ3pERixhQUFLLG9EQUFvRDtBQUFBLElBQzFELElBQUc7QUFBQSxFQUNSLE9BQVM7QUFDTCxhQUFTLGdCQUFnQjtBQUN6QixhQUFTLGdCQUFnQjtBQUFBLEVBQzFCO0FBQ0QsUUFBTSxPQUFPLElBQUksZ0JBQWdCLFFBQVEsUUFBUSxjQUFjLENBQUMsUUFBUSxLQUFLO0FBQzdFLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixnQkFBZ0IsQ0FBQyxPQUFPO0FBQ3ZFLFNBQUssT0FBTyxVQUFVLGFBQWE7QUFDbkMsU0FBSyxPQUFPLFlBQVksYUFBYTtBQUFBLEVBQ3RDO0FBQ0QsU0FBTztBQUNUO0FBRUEsU0FBUyxjQUFjLE1BQU07QUFDM0IsTUFBSTtBQUNKLE1BQUksZUFBZSxjQUFjO0FBQy9CLFdBQU8sTUFBTSxJQUFJO0FBQ2pCO0FBQUEsTUFDRTtBQUFBLE9BQ0MsS0FBSyxLQUFLLFFBQVEsT0FBTyxLQUFLLEtBQUssTUFBTTtBQUFBLFFBQ3hDLE1BQU0sS0FBSyxNQUFNO0FBQUEsUUFDakIsZ0JBQWdCLGtCQUFrQixPQUFPO0FBQUEsTUFDMUM7QUFBQSxNQUNELENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0I7QUFBQSxRQUMxQyxRQUFRO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsTUFDTixJQUFHO0FBQUEsSUFDVjtBQUFBLEVBQ0c7QUFDSDtBQUNBLFNBQVMsZ0JBQWdCLE1BQU0sYUFBYSxHQUFHLFFBQVEsUUFBUTtBQUM3RCxTQUFPLE1BQU0sSUFBSTtBQUNqQixRQUFNLE1BQU0sS0FBSztBQUNqQixNQUFJLEtBQUs7QUFDUDtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCO0FBQUEsUUFDMUMsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLFFBQ0wsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLE1BQ1gsSUFBRztBQUFBLElBQ1Y7QUFBQSxFQUNHO0FBQ0g7QUFDQSxTQUFTLE1BQU0sR0FBRztBQUNoQixTQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYztBQUNqQztBQXVDQSxTQUFTLE1BQU0sTUFBTTtBQUNuQixTQUFPLE1BQU0sSUFBSSxJQUFJLEtBQUssUUFBUTtBQUNwQztBQUlBLE1BQU0sd0JBQXdCO0FBQUEsRUFDNUIsS0FBSyxDQUFDLFFBQVEsS0FBSyxhQUFhLE1BQU0sUUFBUSxJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUM7QUFBQSxFQUN4RSxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sYUFBYTtBQUNyQyxVQUFNLFdBQVcsT0FBTyxHQUFHO0FBQzNCLFFBQUksTUFBTSxRQUFRLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRztBQUNwQyxlQUFTLFFBQVE7QUFDakIsYUFBTztBQUFBLElBQ2IsT0FBVztBQUNMLGFBQU8sUUFBUSxJQUFJLFFBQVEsS0FBSyxPQUFPLFFBQVE7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFDSDtBQUNBLFNBQVMsVUFBVSxnQkFBZ0I7QUFDakMsU0FBTyxXQUFXLGNBQWMsSUFBSSxpQkFBaUIsSUFBSSxNQUFNLGdCQUFnQixxQkFBcUI7QUFDdEc7QUNob0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQSxNQUFNLFFBQVEsQ0FBQTtBQUNkLFNBQVMsbUJBQW1CLE9BQU87QUFDakMsUUFBTSxLQUFLLEtBQUs7QUFDbEI7QUFDQSxTQUFTLG9CQUFvQjtBQUMzQixRQUFNLElBQUk7QUFDWjtBQUNBLElBQUksWUFBWTtBQUNoQixTQUFTLE9BQU8sUUFBUSxNQUFNO0FBQzVCLE1BQUksVUFBVztBQUNILGNBQUE7QUFDRTtBQUNSLFFBQUEsV0FBVyxNQUFNLFNBQVMsTUFBTSxNQUFNLFNBQVMsQ0FBQyxFQUFFLFlBQVk7QUFDcEUsUUFBTSxpQkFBaUIsWUFBWSxTQUFTLFdBQVcsT0FBTztBQUM5RCxRQUFNLFFBQVE7QUFDZCxNQUFJLGdCQUFnQjtBQUNsQjtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLFFBRUUsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNO0FBQ3BCLGNBQUksSUFBSTtBQUNSLGtCQUFRLE1BQU0sS0FBSyxFQUFFLGFBQWEsT0FBTyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQUEsUUFBQSxDQUM5RixFQUFFLEtBQUssRUFBRTtBQUFBLFFBQ1YsWUFBWSxTQUFTO0FBQUEsUUFDckIsTUFBTTtBQUFBLFVBQ0osQ0FBQyxFQUFFLFlBQVksT0FBTyxvQkFBb0IsVUFBVSxNQUFNLElBQUksQ0FBQztBQUFBLFFBQUEsRUFDL0QsS0FBSyxJQUFJO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUFBO0FBQUEsRUFDRixPQUNLO0FBQ0wsVUFBTSxXQUFXLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxJQUFJO0FBQy9DLFFBQUksTUFBTTtBQUFBLElBQ1YsTUFBTTtBQUNKLGVBQVMsS0FBSztBQUFBLEdBQ2pCLEdBQUcsWUFBWSxLQUFLLENBQUM7QUFBQSxJQUNwQjtBQUNRLFlBQUEsS0FBSyxHQUFHLFFBQVE7QUFBQSxFQUMxQjtBQUNjO0FBQ0YsY0FBQTtBQUNkO0FBQ0EsU0FBUyxvQkFBb0I7QUFDM0IsTUFBSSxlQUFlLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDekMsTUFBSSxDQUFDLGNBQWM7QUFDakIsV0FBTztFQUNUO0FBQ0EsUUFBTSxrQkFBa0IsQ0FBQTtBQUN4QixTQUFPLGNBQWM7QUFDYixVQUFBLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsUUFBQSxRQUFRLEtBQUssVUFBVSxjQUFjO0FBQ2xDLFdBQUE7QUFBQSxJQUFBLE9BQ0E7QUFDTCxzQkFBZ0IsS0FBSztBQUFBLFFBQ25CLE9BQU87QUFBQSxRQUNQLGNBQWM7QUFBQSxNQUFBLENBQ2Y7QUFBQSxJQUNIO0FBQ0EsVUFBTSxpQkFBaUIsYUFBYSxhQUFhLGFBQWEsVUFBVTtBQUN4RSxtQkFBZSxrQkFBa0IsZUFBZTtBQUFBLEVBQ2xEO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxZQUFZLE9BQU87QUFDMUIsUUFBTSxPQUFPLENBQUE7QUFDUCxRQUFBLFFBQVEsQ0FBQyxPQUFPLE1BQU07QUFDMUIsU0FBSyxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUEsSUFBSyxDQUFDO0FBQUEsQ0FDaEMsR0FBRyxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxFQUFBLENBQzNCO0FBQ00sU0FBQTtBQUNUO0FBQ0EsU0FBUyxpQkFBaUIsRUFBRSxPQUFPLGdCQUFnQjtBQUNqRCxRQUFNLFVBQVUsZUFBZSxJQUFJLFFBQVEsWUFBWSxzQkFBc0I7QUFDN0UsUUFBTSxTQUFTLE1BQU0sWUFBWSxNQUFNLFVBQVUsVUFBVSxPQUFPO0FBQ2xFLFFBQU0sT0FBTyxRQUFRO0FBQUEsSUFDbkIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ047QUFBQSxFQUNELENBQUE7QUFDRCxRQUFNLFFBQVEsTUFBTTtBQUNwQixTQUFPLE1BQU0sUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZLE1BQU0sS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLE9BQU8sS0FBSztBQUNqRjtBQUNBLFNBQVMsWUFBWSxPQUFPO0FBQzFCLFFBQU0sTUFBTSxDQUFBO0FBQ04sUUFBQSxPQUFPLE9BQU8sS0FBSyxLQUFLO0FBQzlCLE9BQUssTUFBTSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUTtBQUNoQyxRQUFJLEtBQUssR0FBRyxXQUFXLEtBQUssTUFBTSxHQUFHLENBQUMsQ0FBQztBQUFBLEVBQUEsQ0FDeEM7QUFDRyxNQUFBLEtBQUssU0FBUyxHQUFHO0FBQ25CLFFBQUksS0FBSyxNQUFNO0FBQUEsRUFDakI7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLFdBQVcsS0FBSyxPQUFPLEtBQUs7QUFDL0IsTUFBQSxTQUFTLEtBQUssR0FBRztBQUNYLFlBQUEsS0FBSyxVQUFVLEtBQUs7QUFDNUIsV0FBTyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFBQSxFQUFBLFdBQzlCLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxhQUFhLFNBQVMsTUFBTTtBQUNuRixXQUFPLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRTtBQUFBLEVBQUEsV0FDOUIsTUFBTSxLQUFLLEdBQUc7QUFDdkIsWUFBUSxXQUFXLEtBQUssTUFBTSxNQUFNLEtBQUssR0FBRyxJQUFJO0FBQ2hELFdBQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLFNBQVMsT0FBTyxHQUFHO0FBQUEsRUFBQSxXQUN0QyxXQUFXLEtBQUssR0FBRztBQUNyQixXQUFBLENBQUMsR0FBRyxHQUFHLE1BQU0sTUFBTSxPQUFPLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRSxFQUFFO0FBQUEsRUFBQSxPQUNwRDtBQUNMLFlBQVEsTUFBTSxLQUFLO0FBQ25CLFdBQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUssS0FBSztBQUFBLEVBQ3hDO0FBQ0Y7QUE4Q0EsTUFBTSxxQkFBcUI7QUFBQSxFQUN6QixDQUFDLElBQUksR0FBRztBQUFBLEVBQ1IsQ0FBQyxJQUFJLEdBQUc7QUFBQSxFQUNSLENBQUMsR0FBRyxHQUFHO0FBQUEsRUFDUCxDQUFDLElBQUksR0FBRztBQUFBLEVBQ1IsQ0FBQyxHQUFHLEdBQUc7QUFBQSxFQUNQLENBQUMsSUFBSSxHQUFHO0FBQUEsRUFDUixDQUFDLEdBQUcsR0FBRztBQUFBLEVBQ1AsQ0FBQyxLQUFLLEdBQUc7QUFBQSxFQUNULENBQUMsSUFBSSxHQUFHO0FBQUEsRUFDUixDQUFDLEdBQUcsR0FBRztBQUFBLEVBQ1AsQ0FBQyxJQUFJLEdBQUc7QUFBQSxFQUNSLENBQUMsSUFBSSxHQUFHO0FBQUEsRUFDUixDQUFDLEtBQUssR0FBRztBQUFBLEVBQ1QsQ0FBQyxLQUFLLEdBQUc7QUFBQSxFQUNULENBQUMsQ0FBQyxHQUFHO0FBQUEsRUFDTCxDQUFDLENBQUMsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDLEdBQUc7QUFBQSxFQUNMLENBQUMsQ0FBQyxHQUFHO0FBQUEsRUFDTCxDQUFDLENBQUMsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDLEdBQUc7QUFBQSxFQUNMLENBQUMsQ0FBQyxHQUFHO0FBQUEsRUFDTCxDQUFDLENBQUMsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDLEdBQUc7QUFBQSxFQUNMLENBQUMsQ0FBQyxHQUFHO0FBQUEsRUFDTCxDQUFDLEVBQUUsR0FBRztBQUFBLEVBQ04sQ0FBQyxFQUFFLEdBQUc7QUFBQSxFQUNOLENBQUMsRUFBRSxHQUFHO0FBQUEsRUFDTixDQUFDLEVBQUUsR0FBRztBQUFBLEVBQ04sQ0FBQyxFQUFFLEdBQUc7QUFBQSxFQUNOLENBQUMsRUFBRSxHQUFHO0FBQ1I7QUFDQSxTQUFTLHNCQUFzQixJQUFJLFVBQVUsTUFBTSxNQUFNO0FBQ25ELE1BQUE7QUFDRixXQUFPLE9BQU8sR0FBRyxHQUFHLElBQUksSUFBSSxHQUFHO0FBQUEsV0FDeEIsS0FBSztBQUNBLGdCQUFBLEtBQUssVUFBVSxJQUFJO0FBQUEsRUFDakM7QUFDRjtBQUNBLFNBQVMsMkJBQTJCLElBQUksVUFBVSxNQUFNLE1BQU07QUFDeEQsTUFBQSxXQUFXLEVBQUUsR0FBRztBQUNsQixVQUFNLE1BQU0sc0JBQXNCLElBQUksVUFBVSxNQUFNLElBQUk7QUFDdEQsUUFBQSxPQUFPLFVBQVUsR0FBRyxHQUFHO0FBQ3JCLFVBQUEsTUFBTSxDQUFDLFFBQVE7QUFDTCxvQkFBQSxLQUFLLFVBQVUsSUFBSTtBQUFBLE1BQUEsQ0FDaEM7QUFBQSxJQUNIO0FBQ08sV0FBQTtBQUFBLEVBQ1Q7QUFDSSxNQUFBLFFBQVEsRUFBRSxHQUFHO0FBQ2YsVUFBTSxTQUFTLENBQUE7QUFDZixhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxLQUFLO0FBQzNCLGFBQUEsS0FBSywyQkFBMkIsR0FBRyxDQUFDLEdBQUcsVUFBVSxNQUFNLElBQUksQ0FBQztBQUFBLElBQ3JFO0FBQ08sV0FBQTtBQUFBLEVBQUEsV0FDRSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRDtBQUFBLE1BQ0UsOERBQThELE9BQU8sRUFBRTtBQUFBLElBQUE7QUFBQSxFQUUzRTtBQUNGO0FBQ0EsU0FBUyxZQUFZLEtBQUssVUFBVSxNQUFNLGFBQWEsTUFBTTtBQUNyRCxRQUFBLGVBQWUsV0FBVyxTQUFTLFFBQVE7QUFDakQsTUFBSSxVQUFVO0FBQ1osUUFBSSxNQUFNLFNBQVM7QUFDbkIsVUFBTSxrQkFBa0IsU0FBUztBQUMzQixVQUFBLFlBQVksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixtQkFBbUIsSUFBSSxJQUFJLDhDQUE4QyxJQUFJO0FBQzNJLFdBQU8sS0FBSztBQUNWLFlBQU0scUJBQXFCLElBQUk7QUFDL0IsVUFBSSxvQkFBb0I7QUFDdEIsaUJBQVMsSUFBSSxHQUFHLElBQUksbUJBQW1CLFFBQVEsS0FBSztBQUNsRCxjQUFJLG1CQUFtQixDQUFDLEVBQUUsS0FBSyxpQkFBaUIsU0FBUyxNQUFNLE9BQU87QUFDcEU7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLElBQUk7QUFBQSxJQUNaO0FBQ00sVUFBQSxrQkFBa0IsU0FBUyxXQUFXLE9BQU87QUFDbkQsUUFBSSxpQkFBaUI7QUFDTDtBQUNkO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxDQUFDLEtBQUssaUJBQWlCLFNBQVM7QUFBQSxNQUFBO0FBRXBCO0FBQ2Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNTLFdBQUEsS0FBSyxNQUFNLGNBQWMsVUFBVTtBQUM5QztBQUNBLFNBQVMsU0FBUyxLQUFLLE1BQU0sY0FBYyxhQUFhLE1BQU07QUFDNUQsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUN2QyxVQUFBLE9BQU8sbUJBQW1CLElBQUk7QUFDcEMsUUFBSSxjQUFjO0FBQ2hCLHlCQUFtQixZQUFZO0FBQUEsSUFDakM7QUFDQSxXQUFPLGtCQUFrQixPQUFPLHdCQUF3QixJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3JFLFFBQUksY0FBYztBQUNFO0lBQ3BCO0FBQ0EsUUFBSSxZQUFZO0FBQ1IsWUFBQTtBQUFBLElBQUEsT0FDRDtBQUNMLGNBQVEsTUFBTSxHQUFHO0FBQUEsSUFDbkI7QUFBQSxFQUFBLE9BQ0s7QUFDTCxZQUFRLE1BQU0sR0FBRztBQUFBLEVBQ25CO0FBQ0Y7QUFFQSxJQUFJLGFBQWE7QUFDakIsSUFBSSxpQkFBaUI7QUFDckIsTUFBTSxRQUFRLENBQUE7QUFDZCxJQUFJLGFBQWE7QUFDakIsTUFBTSxzQkFBc0IsQ0FBQTtBQUM1QixJQUFJLHFCQUFxQjtBQUN6QixJQUFJLGlCQUFpQjtBQUNyQixNQUFNLDBDQUEwQztBQUNoRCxJQUFJLHNCQUFzQjtBQUMxQixNQUFNLGtCQUFrQjtBQUN4QixTQUFTLFNBQVMsSUFBSTtBQUNwQixRQUFNSyxLQUFJLHVCQUF1QjtBQUMxQixTQUFBLEtBQUtBLEdBQUUsS0FBSyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxJQUFJQTtBQUNsRDtBQUNBLFNBQVMsbUJBQW1CLElBQUk7QUFDOUIsTUFBSSxRQUFRLGFBQWE7QUFDekIsTUFBSSxNQUFNLE1BQU07QUFDaEIsU0FBTyxRQUFRLEtBQUs7QUFDWixVQUFBLFNBQVMsUUFBUSxRQUFRO0FBQ3pCLFVBQUEsWUFBWSxNQUFNLE1BQU07QUFDeEIsVUFBQSxjQUFjLE1BQU0sU0FBUztBQUNuQyxRQUFJLGNBQWMsTUFBTSxnQkFBZ0IsTUFBTSxVQUFVLEtBQUs7QUFDM0QsY0FBUSxTQUFTO0FBQUEsSUFBQSxPQUNaO0FBQ0MsWUFBQTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxTQUFTLEtBQUs7QUFDckIsTUFBSSxDQUFDLE1BQU0sVUFBVSxDQUFDLE1BQU07QUFBQSxJQUMxQjtBQUFBLElBQ0EsY0FBYyxJQUFJLGVBQWUsYUFBYSxJQUFJO0FBQUEsRUFBQSxHQUNqRDtBQUNHLFFBQUEsSUFBSSxNQUFNLE1BQU07QUFDbEIsWUFBTSxLQUFLLEdBQUc7QUFBQSxJQUFBLE9BQ1Q7QUFDTCxZQUFNLE9BQU8sbUJBQW1CLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRztBQUFBLElBQ2pEO0FBQ1c7RUFDYjtBQUNGO0FBQ0EsU0FBUyxhQUFhO0FBQ2hCLE1BQUEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO0FBQ2pCLHFCQUFBO0FBQ0ssMEJBQUEsZ0JBQWdCLEtBQUssU0FBUztBQUFBLEVBQ3REO0FBQ0Y7QUFDQSxTQUFTLGNBQWMsS0FBSztBQUNwQixRQUFBLElBQUksTUFBTSxRQUFRLEdBQUc7QUFDM0IsTUFBSSxJQUFJLFlBQVk7QUFDWixVQUFBLE9BQU8sR0FBRyxDQUFDO0FBQUEsRUFDbkI7QUFDRjtBQUNBLFNBQVMsaUJBQWlCLElBQUk7QUFDeEIsTUFBQSxDQUFDLFFBQVEsRUFBRSxHQUFHO0FBQ1osUUFBQSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQjtBQUFBLE1BQzdDO0FBQUEsTUFDQSxHQUFHLGVBQWUsaUJBQWlCLElBQUk7QUFBQSxJQUFBLEdBQ3RDO0FBQ0QsMEJBQW9CLEtBQUssRUFBRTtBQUFBLElBQzdCO0FBQUEsRUFBQSxPQUNLO0FBQ2Usd0JBQUEsS0FBSyxHQUFHLEVBQUU7QUFBQSxFQUNoQztBQUNXO0FBQ2I7QUFDQSxTQUFTLGlCQUFpQixVQUFVLE1BQU0sSUFBSSxhQUFhLGFBQWEsSUFBSSxHQUFHO0FBQzdFLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDdEMsV0FBQSw0QkFBNEI7RUFDckM7QUFDTyxTQUFBLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDdEIsVUFBQSxLQUFLLE1BQU0sQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLEtBQUs7QUFDaEIsVUFBSSxZQUFZLEdBQUcsT0FBTyxTQUFTLEtBQUs7QUFDdEM7QUFBQSxNQUNGO0FBQ0ksVUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLHNCQUFzQixNQUFNLEVBQUUsR0FBRztBQUNoRjtBQUFBLE1BQ0Y7QUFDTSxZQUFBLE9BQU8sR0FBRyxDQUFDO0FBQ2pCO0FBQ0c7SUFDTDtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsa0JBQWtCLE1BQU07QUFDL0IsTUFBSSxvQkFBb0IsUUFBUTtBQUM5QixVQUFNLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxFQUFFO0FBQUEsTUFDaEQsQ0FBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDO0FBQUEsSUFBQTtBQUU5Qix3QkFBb0IsU0FBUztBQUM3QixRQUFJLG9CQUFvQjtBQUNILHlCQUFBLEtBQUssR0FBRyxPQUFPO0FBQ2xDO0FBQUEsSUFDRjtBQUNxQix5QkFBQTtBQUNyQixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3RDLGFBQUEsNEJBQTRCO0lBQ3JDO0FBQ0EsU0FBSyxpQkFBaUIsR0FBRyxpQkFBaUIsbUJBQW1CLFFBQVEsa0JBQWtCO0FBQy9FLFlBQUEsS0FBSyxtQkFBbUIsY0FBYztBQUN4QyxVQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsc0JBQXNCLE1BQU0sRUFBRSxHQUFHO0FBQ2hGO0FBQUEsTUFDRjtBQUNJLFVBQUEsR0FBRyxXQUFXLE1BQVUsSUFBQTtBQUFBLElBQzlCO0FBQ3FCLHlCQUFBO0FBQ0oscUJBQUE7QUFBQSxFQUNuQjtBQUNGO0FBQ0EsTUFBTSxRQUFRLENBQUMsUUFBUSxJQUFJLE1BQU0sT0FBTyxXQUFXLElBQUk7QUFDdkQsTUFBTSxhQUFhLENBQUMsR0FBRyxNQUFNO0FBQzNCLFFBQU0sT0FBTyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUM7QUFDL0IsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsSUFBWSxRQUFBO0FBQzVCLFFBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFZLFFBQUE7QUFBQSxFQUM5QjtBQUNPLFNBQUE7QUFDVDtBQUNBLFNBQVMsVUFBVSxNQUFNO0FBQ04sbUJBQUE7QUFDSixlQUFBO0FBQ2IsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUN0QyxXQUFBLDRCQUE0QjtFQUNyQztBQUNBLFFBQU0sS0FBSyxVQUFVO0FBQ3JCLFFBQU0sUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLENBQUMsUUFBUSxzQkFBc0IsTUFBTSxHQUFHLElBQUk7QUFDbEcsTUFBQTtBQUNGLFNBQUssYUFBYSxHQUFHLGFBQWEsTUFBTSxRQUFRLGNBQWM7QUFDdEQsWUFBQSxNQUFNLE1BQU0sVUFBVTtBQUN4QixVQUFBLE9BQU8sSUFBSSxXQUFXLE9BQU87QUFDM0IsWUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE1BQU0sR0FBRyxHQUFHO0FBQzNEO0FBQUEsUUFDRjtBQUNBO0FBQUEsVUFDRTtBQUFBLFVBQ0EsSUFBSTtBQUFBLFVBQ0osSUFBSSxJQUFJLEtBQUs7QUFBQSxRQUFBO0FBQUEsTUFFakI7QUFBQSxJQUNGO0FBQUEsRUFBQSxVQUNBO0FBQ2EsaUJBQUE7QUFDYixVQUFNLFNBQVM7QUFDZixzQkFBa0IsSUFBSTtBQUNULGlCQUFBO0FBQ1MsMEJBQUE7QUFDbEIsUUFBQSxNQUFNLFVBQVUsb0JBQW9CLFFBQVE7QUFDOUMsZ0JBQVUsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGO0FBQ0EsU0FBUyxzQkFBc0IsTUFBTSxJQUFJO0FBQ3ZDLE1BQUksQ0FBQyxLQUFLLElBQUksRUFBRSxHQUFHO0FBQ1osU0FBQSxJQUFJLElBQUksQ0FBQztBQUFBLEVBQUEsT0FDVDtBQUNDLFVBQUEsUUFBUSxLQUFLLElBQUksRUFBRTtBQUN6QixRQUFJLFFBQVEsaUJBQWlCO0FBQzNCLFlBQU0sV0FBVyxHQUFHO0FBQ3BCLFlBQU0sZ0JBQWdCLFlBQVksaUJBQWlCLFNBQVMsSUFBSTtBQUNoRTtBQUFBLFFBQ0UscUNBQXFDLGdCQUFnQixrQkFBa0IsYUFBYSxNQUFNLEVBQUU7QUFBQSxRQUM1RjtBQUFBLFFBQ0E7QUFBQSxNQUFBO0FBRUssYUFBQTtBQUFBLElBQUEsT0FDRjtBQUNBLFdBQUEsSUFBSSxJQUFJLFFBQVEsQ0FBQztBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBSSxnQkFBZ0I7QUFDcEIsTUFBTSx5Q0FBeUM7QUFDL0MsSUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxnQkFBQSxFQUFnQixzQkFBc0I7QUFBQSxJQUNwQyxjQUFjLFFBQVEsWUFBWTtBQUFBLElBQ2xDLFVBQVUsUUFBUSxRQUFRO0FBQUEsSUFDMUIsUUFBUSxRQUFRLE1BQU07QUFBQSxFQUFBO0FBRTFCO0FBQ0EsTUFBTSwwQkFBMEI7QUFDaEMsU0FBUyxZQUFZLFVBQVU7QUFDdkIsUUFBQSxLQUFLLFNBQVMsS0FBSztBQUNyQixNQUFBLFNBQVMsSUFBSSxJQUFJLEVBQUU7QUFDdkIsTUFBSSxDQUFDLFFBQVE7QUFDRSxpQkFBQSxJQUFJLFNBQVMsSUFBSTtBQUNyQixhQUFBLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDckI7QUFDTyxTQUFBLFVBQVUsSUFBSSxRQUFRO0FBQy9CO0FBQ0EsU0FBUyxjQUFjLFVBQVU7QUFDL0IsTUFBSSxJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUUsVUFBVSxPQUFPLFFBQVE7QUFDMUQ7QUFDQSxTQUFTLGFBQWEsSUFBSSxZQUFZO0FBQ2hDLE1BQUEsSUFBSSxJQUFJLEVBQUUsR0FBRztBQUNSLFdBQUE7QUFBQSxFQUNUO0FBQ0EsTUFBSSxJQUFJLElBQUk7QUFBQSxJQUNWLFlBQVksd0JBQXdCLFVBQVU7QUFBQSxJQUM5QywrQkFBK0IsSUFBSTtBQUFBLEVBQUEsQ0FDcEM7QUFDTSxTQUFBO0FBQ1Q7QUFDQSxTQUFTLHdCQUF3QixXQUFXO0FBQzFDLFNBQU8saUJBQWlCLFNBQVMsSUFBSSxVQUFVLFlBQVk7QUFDN0Q7QUFDQSxTQUFTLFNBQVMsSUFBSSxXQUFXO0FBQ3pCLFFBQUEsU0FBUyxJQUFJLElBQUksRUFBRTtBQUN6QixNQUFJLENBQUMsUUFBUTtBQUNYO0FBQUEsRUFDRjtBQUNBLFNBQU8sV0FBVyxTQUFTO0FBQzNCLEdBQUMsR0FBRyxPQUFPLFNBQVMsRUFBRSxRQUFRLENBQUMsYUFBYTtBQUMxQyxRQUFJLFdBQVc7QUFDYixlQUFTLFNBQVM7QUFDTSw4QkFBQSxTQUFTLElBQUksRUFBRSxTQUFTO0FBQUEsSUFDbEQ7QUFDQSxhQUFTLGNBQWM7QUFDUCxvQkFBQTtBQUNoQixhQUFTLE9BQU8sUUFBUTtBQUN4QixhQUFTLE9BQU87QUFDQSxvQkFBQTtBQUFBLEVBQUEsQ0FDakI7QUFDSDtBQUNBLFNBQVMsT0FBTyxJQUFJLFNBQVM7QUFDckIsUUFBQSxTQUFTLElBQUksSUFBSSxFQUFFO0FBQ3pCLE1BQUksQ0FBQyxPQUFRO0FBQ2IsWUFBVSx3QkFBd0IsT0FBTztBQUN0QixxQkFBQSxPQUFPLFlBQVksT0FBTztBQUM3QyxRQUFNLFlBQVksQ0FBQyxHQUFHLE9BQU8sU0FBUztBQUN0QyxXQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQ25DLFVBQUEsV0FBVyxVQUFVLENBQUM7QUFDdEIsVUFBQSxVQUFVLHdCQUF3QixTQUFTLElBQUk7QUFDakQsUUFBQSxpQkFBaUIsbUJBQW1CLElBQUksT0FBTztBQUNuRCxRQUFJLENBQUMsZ0JBQWdCO0FBQ2YsVUFBQSxZQUFZLE9BQU8sWUFBWTtBQUNqQywyQkFBbUIsU0FBUyxPQUFPO0FBQUEsTUFDckM7QUFDQSx5QkFBbUIsSUFBSSxTQUFTLGlCQUFpQyxvQkFBSSxJQUFLLENBQUE7QUFBQSxJQUM1RTtBQUNBLG1CQUFlLElBQUksUUFBUTtBQUMzQixhQUFTLFdBQVcsV0FBVyxPQUFPLFNBQVMsSUFBSTtBQUNuRCxhQUFTLFdBQVcsV0FBVyxPQUFPLFNBQVMsSUFBSTtBQUNuRCxhQUFTLFdBQVcsYUFBYSxPQUFPLFNBQVMsSUFBSTtBQUNyRCxRQUFJLFNBQVMsVUFBVTtBQUNyQixxQkFBZSxJQUFJLFFBQVE7QUFDbEIsZUFBQSxTQUFTLFFBQVEsTUFBTTtBQUNoQyxxQkFBZSxPQUFPLFFBQVE7QUFBQSxJQUFBLFdBQ3JCLFNBQVMsUUFBUTtBQUNqQixlQUFBLE9BQU8sT0FBTyxRQUFRO0FBQy9CLGVBQVMsTUFBTTtBQUNiLGlCQUFTLE9BQU87QUFDaEIsdUJBQWUsT0FBTyxRQUFRO0FBQUEsTUFBQSxDQUMvQjtBQUFBLElBQUEsV0FDUSxTQUFTLFdBQVcsUUFBUTtBQUNyQyxlQUFTLFdBQVc7SUFBTyxXQUNsQixPQUFPLFdBQVcsYUFBYTtBQUN4QyxhQUFPLFNBQVM7SUFBTyxPQUNsQjtBQUNHLGNBQUE7QUFBQSxRQUNOO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFBQSxFQUNGO0FBQ0EsbUJBQWlCLE1BQU07QUFDckIsdUJBQW1CLE1BQU07QUFBQSxFQUFBLENBQzFCO0FBQ0g7QUFDQSxTQUFTLG1CQUFtQixTQUFTLFNBQVM7QUFDNUMsU0FBTyxTQUFTLE9BQU87QUFDdkIsYUFBVyxPQUFPLFNBQVM7QUFDekIsUUFBSSxRQUFRLFlBQVksRUFBRSxPQUFPLFVBQVU7QUFDekMsYUFBTyxRQUFRLEdBQUc7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsUUFBUSxJQUFJO0FBQ1osU0FBQSxDQUFDLElBQUksUUFBUTtBQUNkLFFBQUE7QUFDSyxhQUFBLEdBQUcsSUFBSSxHQUFHO0FBQUEsYUFDVixHQUFHO0FBQ1YsY0FBUSxNQUFNLENBQUM7QUFDUCxjQUFBO0FBQUEsUUFDTjtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQUEsRUFBQTtBQUVKO0FBRUEsSUFBSTtBQUNKLElBQUksU0FBUyxDQUFBO0FBQ2IsSUFBSSx1QkFBdUI7QUFDM0IsU0FBUyxPQUFPLFVBQVUsTUFBTTtBQUM5QixNQUFJLFlBQVk7QUFDSCxlQUFBLEtBQUssT0FBTyxHQUFHLElBQUk7QUFBQSxFQUFBLFdBQ3JCLENBQUMsc0JBQXNCO0FBQ2hDLFdBQU8sS0FBSyxFQUFFLE9BQU8sS0FBTSxDQUFBO0FBQUEsRUFDN0I7QUFDRjtBQUNBLFNBQVMsa0JBQWtCLE1BQU0sUUFBUTtBQUN2QyxNQUFJLElBQUk7QUFDSyxlQUFBO0FBQ2IsTUFBSSxZQUFZO0FBQ2QsZUFBVyxVQUFVO0FBQ2QsV0FBQSxRQUFRLENBQUMsRUFBRSxPQUFPLEtBQUEsTUFBVyxXQUFXLEtBQUssT0FBTyxHQUFHLElBQUksQ0FBQztBQUNuRSxhQUFTLENBQUE7QUFBQSxFQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLVixPQUFPLFdBQVc7QUFBQSxJQUNsQixPQUFPO0FBQUE7QUFBQSxJQUVQLEdBQUcsTUFBTSxLQUFLLE9BQU8sY0FBYyxPQUFPLFNBQVMsR0FBRyxjQUFjLE9BQU8sU0FBUyxHQUFHLFNBQVMsT0FBTztBQUFBLElBQ3ZHO0FBQ0EsVUFBTSxTQUFTLE9BQU8sK0JBQStCLE9BQU8sZ0NBQWdDLENBQUE7QUFDckYsV0FBQSxLQUFLLENBQUMsWUFBWTtBQUN2Qix3QkFBa0IsU0FBUyxNQUFNO0FBQUEsSUFBQSxDQUNsQztBQUNELGVBQVcsTUFBTTtBQUNmLFVBQUksQ0FBQyxZQUFZO0FBQ2YsZUFBTywrQkFBK0I7QUFDZiwrQkFBQTtBQUN2QixpQkFBUyxDQUFBO0FBQUEsTUFDWDtBQUFBLE9BQ0MsR0FBRztBQUFBLEVBQUEsT0FDRDtBQUNrQiwyQkFBQTtBQUN2QixhQUFTLENBQUE7QUFBQSxFQUNYO0FBQ0Y7QUFDQSxTQUFTLGdCQUFnQkMsTUFBS0MsVUFBUztBQUM5QixTQUFBLFlBQTJCRCxNQUFLQyxVQUFTO0FBQUEsSUFDOUM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUFBLENBQ0Q7QUFDSDtBQUNBLFNBQVMsbUJBQW1CRCxNQUFLO0FBQy9CLFNBQU8sZUFBaUNBLElBQUc7QUFDN0M7QUFDQSxNQUFNLHlCQUF5QztBQUFBLEVBQzdDO0FBQUE7QUFDRjtBQUNBLE1BQU0sMkJBQTJDO0FBQUEsRUFBNEI7QUFBQTtBQUEyQztBQUN4SCxNQUFNLDRCQUE0QztBQUFBLEVBQ2hEO0FBQUE7QUFDRjtBQUNBLE1BQU0sMkJBQTJCLENBQUMsY0FBYztBQUMxQyxNQUFBLGNBQWMsT0FBTyxXQUFXLGtCQUFrQjtBQUFBLEVBQ3RELENBQUMsV0FBVyxjQUFjLFNBQVMsR0FBRztBQUNwQyw4QkFBMEIsU0FBUztBQUFBLEVBQ3JDO0FBQ0Y7QUFDQTtBQUFBO0FBRUEsU0FBUyw0QkFBNEIsTUFBTTtBQUN6QyxTQUFPLENBQUMsY0FBYztBQUNwQjtBQUFBLE1BQ0U7QUFBQSxNQUNBLFVBQVUsV0FBVztBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVUsU0FBUyxVQUFVLE9BQU8sTUFBTTtBQUFBLE1BQzFDO0FBQUEsSUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUNBLE1BQU0sb0JBQW9DO0FBQUEsRUFDeEM7QUFBQTtBQUNGO0FBQ0EsTUFBTSxrQkFBa0M7QUFBQSxFQUN0QztBQUFBO0FBQ0Y7QUFDQSxTQUFTLDhCQUE4QixNQUFNO0FBQ3BDLFNBQUEsQ0FBQyxXQUFXLE1BQU0sU0FBUztBQUN6QixXQUFBLE1BQU0sVUFBVSxXQUFXLEtBQUssVUFBVSxLQUFLLFdBQVcsTUFBTSxJQUFJO0FBQUEsRUFBQTtBQUUvRTtBQUNBLFNBQVMsc0JBQXNCLFdBQVcsT0FBTyxRQUFRO0FBQ3ZEO0FBQUEsSUFDRTtBQUFBLElBQ0EsVUFBVSxXQUFXO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQUE7QUFFSjtBQUVBLElBQUksMkJBQTJCO0FBQy9CLElBQUksaUJBQWlCO0FBQ3JCLFNBQVMsNEJBQTRCLFVBQVU7QUFDN0MsUUFBTSxPQUFPO0FBQ2MsNkJBQUE7QUFDVixtQkFBQSxZQUFZLFNBQVMsS0FBSyxhQUFhO0FBQ2pELFNBQUE7QUFDVDtBQVFBLFNBQVMsUUFBUSxJQUFJLE1BQU0sMEJBQTBCLGlCQUFpQjtBQUNoRSxNQUFBLENBQUMsSUFBWSxRQUFBO0FBQ2pCLE1BQUksR0FBRyxJQUFJO0FBQ0YsV0FBQTtBQUFBLEVBQ1Q7QUFDTSxRQUFBLHNCQUFzQixJQUFJLFNBQVM7QUFDdkMsUUFBSSxvQkFBb0IsSUFBSTtBQUMxQix1QkFBaUIsRUFBRTtBQUFBLElBQ3JCO0FBQ00sVUFBQSxlQUFlLDRCQUE0QixHQUFHO0FBQ2hELFFBQUE7QUFDQSxRQUFBO0FBQ0ksWUFBQSxHQUFHLEdBQUcsSUFBSTtBQUFBLElBQUEsVUFDaEI7QUFDQSxrQ0FBNEIsWUFBWTtBQUN4QyxVQUFJLG9CQUFvQixJQUFJO0FBQzFCLHlCQUFpQixDQUFDO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQXVCO0FBQ3RFLCtCQUF5QixHQUFHO0FBQUEsSUFDOUI7QUFDTyxXQUFBO0FBQUEsRUFBQTtBQUVULHNCQUFvQixLQUFLO0FBQ3pCLHNCQUFvQixLQUFLO0FBQ3pCLHNCQUFvQixLQUFLO0FBQ2xCLFNBQUE7QUFDVDtBQUVBLFNBQVMsc0JBQXNCLE1BQU07QUFDL0IsTUFBQSxtQkFBbUIsSUFBSSxHQUFHO0FBQzVCLFdBQU8sK0RBQStELElBQUk7QUFBQSxFQUM1RTtBQUNGO0FBZ0NBLFNBQVMsb0JBQW9CLE9BQU8sV0FBVyxVQUFVLE1BQU07QUFDN0QsUUFBTSxXQUFXLE1BQU07QUFDakIsUUFBQSxjQUFjLGFBQWEsVUFBVTtBQUMzQyxXQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLO0FBQ2xDLFVBQUEsVUFBVSxTQUFTLENBQUM7QUFDMUIsUUFBSSxhQUFhO0FBQ1AsY0FBQSxXQUFXLFlBQVksQ0FBQyxFQUFFO0FBQUEsSUFDcEM7QUFDSSxRQUFBLE9BQU8sUUFBUSxJQUFJLElBQUk7QUFDM0IsUUFBSSxNQUFNO0FBQ007QUFDYSxpQ0FBQSxNQUFNLFVBQVUsR0FBRztBQUFBLFFBQzVDLE1BQU07QUFBQSxRQUNOO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUFBLENBQ0Q7QUFDYTtJQUNoQjtBQUFBLEVBQ0Y7QUFDRjtBQXFUQSxTQUFTLG1CQUFtQixPQUFPLE9BQU87QUFDeEMsTUFBSSxNQUFNLFlBQVksS0FBSyxNQUFNLFdBQVc7QUFDdkIsdUJBQUEsTUFBTSxVQUFVLFNBQVMsS0FBSztBQUFBLEVBQUEsV0FDeEMsTUFBTSxZQUFZLEtBQUs7QUFDaEMsVUFBTSxVQUFVLGFBQWEsTUFBTSxNQUFNLE1BQU0sU0FBUztBQUN4RCxVQUFNLFdBQVcsYUFBYSxNQUFNLE1BQU0sTUFBTSxVQUFVO0FBQUEsRUFBQSxPQUNyRDtBQUNMLFVBQU0sYUFBYTtBQUFBLEVBQ3JCO0FBQ0Y7QUFrQ0EsTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUs7QUEySXZDLE1BQU0sY0FBYyxDQUFDLFVBQVUsTUFBTSxLQUFLO0FBc04xQyxTQUFTLFlBQVksTUFBTSxRQUFRO0FBQ1gsd0JBQUEsTUFBTSxLQUFLLE1BQU07QUFDekM7QUFDQSxTQUFTLGNBQWMsTUFBTSxRQUFRO0FBQ2Isd0JBQUEsTUFBTSxNQUFNLE1BQU07QUFDMUM7QUFDQSxTQUFTLHNCQUFzQixNQUFNLE1BQU0sU0FBUyxpQkFBaUI7QUFDbkUsUUFBTSxjQUFjLEtBQUssVUFBVSxLQUFLLFFBQVEsTUFBTTtBQUNwRCxRQUFJLFVBQVU7QUFDZCxXQUFPLFNBQVM7QUFDZCxVQUFJLFFBQVEsZUFBZTtBQUN6QjtBQUFBLE1BQ0Y7QUFDQSxnQkFBVSxRQUFRO0FBQUEsSUFDcEI7QUFDQSxXQUFPLEtBQUs7QUFBQSxFQUFBO0FBRUgsYUFBQSxNQUFNLGFBQWEsTUFBTTtBQUNwQyxNQUFJLFFBQVE7QUFDVixRQUFJLFVBQVUsT0FBTztBQUNkLFdBQUEsV0FBVyxRQUFRLFFBQVE7QUFDaEMsVUFBSSxZQUFZLFFBQVEsT0FBTyxLQUFLLEdBQUc7QUFDZiw4QkFBQSxhQUFhLE1BQU0sUUFBUSxPQUFPO0FBQUEsTUFDMUQ7QUFDQSxnQkFBVSxRQUFRO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxTQUFTLHNCQUFzQixNQUFNLE1BQU0sUUFBUSxlQUFlO0FBQ2hFLFFBQU0sV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQTtBQUFBLEVBQUE7QUFHRixjQUFZLE1BQU07QUFDVCxXQUFBLGNBQWMsSUFBSSxHQUFHLFFBQVE7QUFBQSxLQUNuQyxNQUFNO0FBQ1g7QUFTQSxTQUFTLFdBQVcsTUFBTSxNQUFNLFNBQVMsaUJBQWlCLFVBQVUsT0FBTztBQUN6RSxNQUFJLFFBQVE7QUFDVixVQUFNLFFBQVEsT0FBTyxJQUFJLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQTtBQUM5QyxVQUFNLGNBQWMsS0FBSyxVQUFVLEtBQUssUUFBUSxJQUFJLFNBQVM7QUFDN0M7QUFDUixZQUFBLFFBQVEsbUJBQW1CLE1BQU07QUFDdkMsWUFBTSxNQUFNLDJCQUEyQixNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQ3pEO0FBQ1E7QUFDUCxhQUFBO0FBQUEsSUFBQTtBQUVULFFBQUksU0FBUztBQUNYLFlBQU0sUUFBUSxXQUFXO0FBQUEsSUFBQSxPQUNwQjtBQUNMLFlBQU0sS0FBSyxXQUFXO0FBQUEsSUFDeEI7QUFDTyxXQUFBO0FBQUEsRUFBQSxXQUNFLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzlDLFVBQUEsVUFBVSxhQUFhLG1CQUFtQixJQUFJLEVBQUUsUUFBUSxVQUFVLEVBQUUsQ0FBQztBQUMzRTtBQUFBLE1BQ0UsR0FBRyxPQUFPO0FBQUEsSUFBQTtBQUFBLEVBRWQ7QUFDRjtBQUNBLE1BQU0sYUFBYSxDQUFDLGNBQWMsQ0FBQyxNQUFNLFNBQVMsb0JBQW9CO0FBQ2hFLE1BQUEsQ0FBQyx5QkFBeUIsY0FBYyxNQUFNO0FBQ2hELGVBQVcsV0FBVyxJQUFJLFNBQVMsS0FBSyxHQUFHLElBQUksR0FBRyxNQUFNO0FBQUEsRUFDMUQ7QUFDRjtBQUNBLE1BQU0sZ0JBQWdCLFdBQVcsSUFBSTtBQUNyQyxNQUFNLFlBQVksV0FBVyxHQUFHO0FBQ2hDLE1BQU0saUJBQWlCLFdBQVcsSUFBSTtBQUN0QyxNQUFNLFlBQVksV0FBVyxHQUFHO0FBQ2hDLE1BQU0sa0JBQWtCLFdBQVcsS0FBSztBQUN4QyxNQUFNLGNBQWMsV0FBVyxJQUFJO0FBQ25DLE1BQU0sbUJBQW1CLFdBQVcsSUFBSTtBQUN4QyxNQUFNLG9CQUFvQjtBQUFBLEVBQ3hCO0FBQ0Y7QUFDQSxNQUFNLGtCQUFrQjtBQUFBLEVBQ3RCO0FBQ0Y7QUFDQSxTQUFTLGdCQUFnQixNQUFNLFNBQVMsaUJBQWlCO0FBQzVDLGFBQUEsTUFBTSxNQUFNLE1BQU07QUFDL0I7QUFPQSxNQUFNLHlCQUF5QixPQUFPLElBQUksT0FBTztBQW9LakQsTUFBTSxvQkFBb0IsQ0FBQyxNQUFNO0FBQzNCLE1BQUEsQ0FBQyxFQUFVLFFBQUE7QUFDZixNQUFJLG9CQUFvQixDQUFDLEVBQUcsUUFBTywyQkFBMkIsQ0FBQztBQUN4RCxTQUFBLGtCQUFrQixFQUFFLE1BQU07QUFDbkM7QUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBLEVBR21DLHVCQUFBLHVCQUFPLE9BQU8sSUFBSSxHQUFHO0FBQUEsSUFDMUQsR0FBRyxDQUFDLE1BQU07QUFBQSxJQUNWLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTTtBQUFBLElBQ3BCLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFBQSxJQUNoQixRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLGdCQUFnQixFQUFFLEtBQUssSUFBSSxFQUFFO0FBQUEsSUFDeEYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixnQkFBZ0IsRUFBRSxLQUFLLElBQUksRUFBRTtBQUFBLElBQ3hGLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFBQSxJQUN4RixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLGdCQUFnQixFQUFFLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdEYsU0FBUyxDQUFDLE1BQU0sa0JBQWtCLEVBQUUsTUFBTTtBQUFBLElBQzFDLE9BQU8sQ0FBQyxNQUFNLGtCQUFrQixFQUFFLElBQUk7QUFBQSxJQUN0QyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQUEsSUFDaEIsVUFBVSxDQUFDLE1BQTRCLHFCQUFxQixDQUFDO0FBQUEsSUFDN0QsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxNQUFNO0FBQ3ZDLFFBQUUsT0FBTyxRQUFRO0FBQ2pCLGVBQVMsRUFBRSxNQUFNO0FBQUEsSUFBQTtBQUFBLElBRW5CLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksU0FBUyxLQUFLLEVBQUUsS0FBSztBQUFBLElBQ3JELFFBQVEsQ0FBQyxNQUE0QixjQUFjLEtBQUssQ0FBQztBQUFBLEVBQUksQ0FDOUQ7QUFBQTtBQUVILE1BQU0sbUJBQW1CLENBQUMsUUFBUSxRQUFRLE9BQU8sUUFBUTtBQUN6RCxNQUFNLGtCQUFrQixDQUFDLE9BQU8sUUFBUSxVQUFVLGFBQWEsQ0FBQyxNQUFNLG1CQUFtQixPQUFPLE9BQU8sR0FBRztBQUMxRyxNQUFNLDhCQUE4QjtBQUFBLEVBQ2xDLElBQUksRUFBRSxHQUFHLFNBQUEsR0FBWSxLQUFLO0FBQ3hCLFFBQUksUUFBUSxZQUFZO0FBQ2YsYUFBQTtBQUFBLElBQ1Q7QUFDTSxVQUFBLEVBQUUsS0FBSyxZQUFZLE1BQU0sT0FBTyxhQUFhLE1BQU0sV0FBZSxJQUFBO0FBQ3hFLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixRQUFRLFdBQVc7QUFDM0QsYUFBQTtBQUFBLElBQ1Q7QUFDSSxRQUFBO0FBQ0EsUUFBQSxJQUFJLENBQUMsTUFBTSxLQUFLO0FBQ1osWUFBQSxJQUFJLFlBQVksR0FBRztBQUN6QixVQUFJLE1BQU0sUUFBUTtBQUNoQixnQkFBUSxHQUFHO0FBQUEsVUFDVCxLQUFLO0FBQ0gsbUJBQU8sV0FBVyxHQUFHO0FBQUEsVUFDdkIsS0FBSztBQUNILG1CQUFPLEtBQUssR0FBRztBQUFBLFVBQ2pCLEtBQUs7QUFDSCxtQkFBTyxJQUFJLEdBQUc7QUFBQSxVQUNoQixLQUFLO0FBQ0gsbUJBQU8sTUFBTSxHQUFHO0FBQUEsUUFDcEI7QUFBQSxNQUNTLFdBQUEsZ0JBQWdCLFlBQVksR0FBRyxHQUFHO0FBQzNDLG9CQUFZLEdBQUcsSUFBSTtBQUNuQixlQUFPLFdBQVcsR0FBRztBQUFBLE1BQUEsV0FDWixTQUFTLGFBQWEsT0FBTyxNQUFNLEdBQUcsR0FBRztBQUNsRCxvQkFBWSxHQUFHLElBQUk7QUFDbkIsZUFBTyxLQUFLLEdBQUc7QUFBQSxNQUFBO0FBQUE7QUFBQTtBQUFBLFNBSWQsa0JBQWtCLFNBQVMsYUFBYSxDQUFDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRztBQUFBLFFBQzNFO0FBQ0Esb0JBQVksR0FBRyxJQUFJO0FBQ25CLGVBQU8sTUFBTSxHQUFHO0FBQUEsTUFBQSxXQUNQLFFBQVEsYUFBYSxPQUFPLEtBQUssR0FBRyxHQUFHO0FBQ2hELG9CQUFZLEdBQUcsSUFBSTtBQUNuQixlQUFPLElBQUksR0FBRztBQUFBLGlCQUNtQixtQkFBbUI7QUFDcEQsb0JBQVksR0FBRyxJQUFJO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQ00sVUFBQSxlQUFlLG9CQUFvQixHQUFHO0FBQzVDLFFBQUksV0FBVztBQUNmLFFBQUksY0FBYztBQUNoQixVQUFJLFFBQVEsVUFBVTtBQUNkLGNBQUEsU0FBUyxPQUFPLE9BQU8sRUFBRTtBQUMvQixTQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCO01BQWtCLFdBQ3RELENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsUUFBUSxVQUFVO0FBQ2xFLGNBQUEsVUFBVSxPQUFPLEdBQUc7QUFBQSxNQUM1QjtBQUNBLGFBQU8sYUFBYSxRQUFRO0FBQUEsSUFBQTtBQUFBO0FBQUEsT0FHM0IsWUFBWSxLQUFLLGtCQUFrQixZQUFZLFVBQVUsR0FBRztBQUFBLE1BQzdEO0FBQ08sYUFBQTtBQUFBLElBQUEsV0FDRSxRQUFRLGFBQWEsT0FBTyxLQUFLLEdBQUcsR0FBRztBQUNoRCxrQkFBWSxHQUFHLElBQUk7QUFDbkIsYUFBTyxJQUFJLEdBQUc7QUFBQSxJQUFBO0FBQUE7QUFBQSxNQUdkLG1CQUFtQixXQUFXLE9BQU8sa0JBQWtCLE9BQU8sa0JBQWtCLEdBQUc7QUFBQSxNQUNuRjtBQUNBO0FBQ0UsZUFBTyxpQkFBaUIsR0FBRztBQUFBLE1BQzdCO0FBQUEsSUFBQSxXQUNTLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsNkJBQTZCLENBQUMsU0FBUyxHQUFHO0FBQUE7QUFBQSxJQUVsRyxJQUFJLFFBQVEsS0FBSyxNQUFNLElBQUk7QUFDckIsVUFBQSxTQUFTLGFBQWEsaUJBQWlCLElBQUksQ0FBQyxDQUFDLEtBQUssT0FBTyxNQUFNLEdBQUcsR0FBRztBQUN2RTtBQUFBLFVBQ0UsWUFBWSxLQUFLO0FBQUEsWUFDZjtBQUFBLFVBQ0QsQ0FBQTtBQUFBLFFBQUE7QUFBQSxNQUNILFdBQ1MsYUFBYSwwQkFBMEI7QUFDaEQ7QUFBQSxVQUNFLFlBQVksS0FBSyxVQUFVLEdBQUcsQ0FBQztBQUFBLFFBQUE7QUFBQSxNQUVuQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFJLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxPQUFPO0FBQy9CLFVBQU0sRUFBRSxNQUFNLFlBQVksSUFBQSxJQUFRO0FBQzlCLFFBQUEsZ0JBQWdCLFlBQVksR0FBRyxHQUFHO0FBQ3BDLGlCQUFXLEdBQUcsSUFBSTtBQUNYLGFBQUE7QUFBQSxJQUNFLFdBQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixXQUFXLG1CQUFtQixPQUFPLFlBQVksR0FBRyxHQUFHO0FBQ3RHLGFBQUEseUNBQXlDLEdBQUcscUJBQXFCO0FBQ2pFLGFBQUE7QUFBQSxJQUFBLFdBQ0UsU0FBUyxhQUFhLE9BQU8sTUFBTSxHQUFHLEdBQUc7QUFDbEQsV0FBSyxHQUFHLElBQUk7QUFDTCxhQUFBO0FBQUEsSUFDRSxXQUFBLE9BQU8sU0FBUyxPQUFPLEdBQUcsR0FBRztBQUNyQyxPQUFBLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQU8sOEJBQThCLEdBQUcsd0JBQXdCO0FBQ3RHLGFBQUE7QUFBQSxJQUNUO0FBQ0ksUUFBQSxJQUFJLENBQUMsTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssVUFBVTtBQUM5QyxPQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCO0FBQUEsUUFDM0MseUNBQXlDLEdBQUc7QUFBQSxNQUFBO0FBRXZDLGFBQUE7QUFBQSxJQUFBLE9BQ0Y7QUFDRCxVQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBTyxTQUFTLFdBQVcsT0FBTyxrQkFBa0I7QUFDNUYsZUFBQSxlQUFlLEtBQUssS0FBSztBQUFBLFVBQzlCLFlBQVk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkO0FBQUEsUUFBQSxDQUNEO0FBQUEsTUFBQSxPQUNJO0FBQ0wsWUFBSSxHQUFHLElBQUk7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUNPLFdBQUE7QUFBQSxFQUNUO0FBQUEsRUFDQSxJQUFJO0FBQUEsSUFDRixHQUFHLEVBQUUsTUFBTSxZQUFZLGFBQWEsS0FBSyxZQUFZLGFBQWE7QUFBQSxLQUNqRSxLQUFLO0FBQ0YsUUFBQTtBQUNKLFdBQU8sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLFNBQVMsYUFBYSxPQUFPLE1BQU0sR0FBRyxLQUFLLGdCQUFnQixZQUFZLEdBQUcsTUFBTSxrQkFBa0IsYUFBYSxDQUFDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxLQUFLLE9BQU8sS0FBSyxHQUFHLEtBQUssT0FBTyxxQkFBcUIsR0FBRyxLQUFLLE9BQU8sV0FBVyxPQUFPLGtCQUFrQixHQUFHO0FBQUEsRUFDM1I7QUFBQSxFQUNBLGVBQWUsUUFBUSxLQUFLLFlBQVk7QUFDbEMsUUFBQSxXQUFXLE9BQU8sTUFBTTtBQUNuQixhQUFBLEVBQUUsWUFBWSxHQUFHLElBQUk7QUFBQSxJQUNuQixXQUFBLE9BQU8sWUFBWSxPQUFPLEdBQUc7QUFDdEMsV0FBSyxJQUFJLFFBQVEsS0FBSyxXQUFXLE9BQU8sSUFBSTtBQUFBLElBQzlDO0FBQ0EsV0FBTyxRQUFRLGVBQWUsUUFBUSxLQUFLLFVBQVU7QUFBQSxFQUN2RDtBQUNGO0FBQ0EsSUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE1BQU07QUFDekIsOEJBQUEsVUFBVSxDQUFDLFdBQVc7QUFDaEQ7QUFBQSxNQUNFO0FBQUEsSUFBQTtBQUVLLFdBQUEsUUFBUSxRQUFRLE1BQU07QUFBQSxFQUFBO0FBRWpDO0FBd0JBLFNBQVMsdUJBQXVCLFVBQVU7QUFDeEMsUUFBTSxTQUFTLENBQUE7QUFDUixTQUFBLGVBQWUsUUFBUSxLQUFLO0FBQUEsSUFDakMsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osS0FBSyxNQUFNO0FBQUEsRUFBQSxDQUNaO0FBQ0QsU0FBTyxLQUFLLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxRQUFRO0FBQ3pDLFdBQUEsZUFBZSxRQUFRLEtBQUs7QUFBQSxNQUNqQyxjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixLQUFLLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxRQUFRO0FBQUE7QUFBQTtBQUFBLE1BRzVDLEtBQUs7QUFBQSxJQUFBLENBQ047QUFBQSxFQUFBLENBQ0Y7QUFDTSxTQUFBO0FBQ1Q7QUFDQSxTQUFTLDJCQUEyQixVQUFVO0FBQ3RDLFFBQUE7QUFBQSxJQUNKO0FBQUEsSUFDQSxjQUFjLENBQUMsWUFBWTtBQUFBLEVBQ3pCLElBQUE7QUFDSixNQUFJLGNBQWM7QUFDaEIsV0FBTyxLQUFLLFlBQVksRUFBRSxRQUFRLENBQUMsUUFBUTtBQUNsQyxhQUFBLGVBQWUsS0FBSyxLQUFLO0FBQUEsUUFDOUIsWUFBWTtBQUFBLFFBQ1osY0FBYztBQUFBLFFBQ2QsS0FBSyxNQUFNLFNBQVMsTUFBTSxHQUFHO0FBQUEsUUFDN0IsS0FBSztBQUFBLE1BQUEsQ0FDTjtBQUFBLElBQUEsQ0FDRjtBQUFBLEVBQ0g7QUFDRjtBQUNBLFNBQVMsZ0NBQWdDLFVBQVU7QUFDM0MsUUFBQSxFQUFFLEtBQUssV0FBZSxJQUFBO0FBQzVCLFNBQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRO0FBQzFDLFFBQUEsQ0FBQyxXQUFXLGlCQUFpQjtBQUMvQixVQUFJLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxHQUFHO0FBQzVCO0FBQUEsVUFDRSwyQkFBMkIsS0FBSztBQUFBLFlBQzlCO0FBQUEsVUFDRCxDQUFBO0FBQUEsUUFBQTtBQUVIO0FBQUEsTUFDRjtBQUNPLGFBQUEsZUFBZSxLQUFLLEtBQUs7QUFBQSxRQUM5QixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsUUFDZCxLQUFLLE1BQU0sV0FBVyxHQUFHO0FBQUEsUUFDekIsS0FBSztBQUFBLE1BQUEsQ0FDTjtBQUFBLElBQ0g7QUFBQSxFQUFBLENBQ0Q7QUFDSDtBQXlEQSxTQUFTLHNCQUFzQixPQUFPO0FBQzdCLFNBQUEsUUFBUSxLQUFLLElBQUksTUFBTTtBQUFBLElBQzVCLENBQUMsWUFBWUQsUUFBTyxXQUFXQSxFQUFDLElBQUksTUFBTTtBQUFBLElBQzFDLENBQUM7QUFBQSxFQUNDLElBQUE7QUFDTjtBQTBEQSxTQUFTLHlCQUF5QjtBQUMxQixRQUFBLFFBQStCLHVCQUFBLE9BQU8sSUFBSTtBQUN6QyxTQUFBLENBQUMsTUFBTSxRQUFRO0FBQ2hCLFFBQUEsTUFBTSxHQUFHLEdBQUc7QUFDUCxhQUFBLEdBQUcsSUFBSSxjQUFjLEdBQUcsMkJBQTJCLE1BQU0sR0FBRyxDQUFDLEdBQUc7QUFBQSxJQUFBLE9BQ2xFO0FBQ0wsWUFBTSxHQUFHLElBQUk7QUFBQSxJQUNmO0FBQUEsRUFBQTtBQUVKO0FBQ0EsSUFBSSxvQkFBb0I7QUFDeEIsU0FBUyxhQUFhLFVBQVU7QUFDeEIsUUFBQSxVQUFVLHFCQUFxQixRQUFRO0FBQzdDLFFBQU0sYUFBYSxTQUFTO0FBQzVCLFFBQU0sTUFBTSxTQUFTO0FBQ0Qsc0JBQUE7QUFDcEIsTUFBSSxRQUFRLGNBQWM7QUFDZixhQUFBLFFBQVEsY0FBYyxVQUFVLElBQUk7QUFBQSxFQUMvQztBQUNNLFFBQUE7QUFBQTtBQUFBLElBRUosTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQTtBQUFBLElBRVI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUE7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNFLElBQUE7QUFDRSxRQUFBLDJCQUEyQixDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLHVCQUEyQixJQUFBO0FBQ3hHLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDdkMsVUFBQSxDQUFDLFlBQVksSUFBSSxTQUFTO0FBQ2hDLFFBQUksY0FBYztBQUNoQixpQkFBVyxPQUFPLGNBQWM7QUFDOUIsaUNBQXlCLFNBQXFCLEdBQUc7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxlQUFlO0FBQ0Msc0JBQUEsZUFBZSxLQUFLLHdCQUF3QjtBQUFBLEVBQ2hFO0FBQ0EsTUFBSSxTQUFTO0FBQ1gsZUFBVyxPQUFPLFNBQVM7QUFDbkIsWUFBQSxnQkFBZ0IsUUFBUSxHQUFHO0FBQzdCLFVBQUEsV0FBVyxhQUFhLEdBQUc7QUFDN0IsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUN0QyxpQkFBQSxlQUFlLEtBQUssS0FBSztBQUFBLFlBQzlCLE9BQU8sY0FBYyxLQUFLLFVBQVU7QUFBQSxZQUNwQyxjQUFjO0FBQUEsWUFDZCxZQUFZO0FBQUEsWUFDWixVQUFVO0FBQUEsVUFBQSxDQUNYO0FBQUEsUUFBQSxPQUNJO0FBQ0wsY0FBSSxHQUFHLElBQUksY0FBYyxLQUFLLFVBQVU7QUFBQSxRQUMxQztBQUNBLFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsbUNBQXlCLFdBQXlCLEdBQUc7QUFBQSxRQUN2RDtBQUFBLE1BQUEsV0FDUyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRDtBQUFBLFVBQ0UsV0FBVyxHQUFHLGVBQWUsT0FBTyxhQUFhO0FBQUEsUUFBQTtBQUFBLE1BRXJEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGFBQWE7QUFDWCxRQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsQ0FBQyxXQUFXLFdBQVcsR0FBRztBQUN6RTtBQUFBLFFBQ0U7QUFBQSxNQUFBO0FBQUEsSUFFSjtBQUNBLFVBQU0sT0FBTyxZQUFZLEtBQUssWUFBWSxVQUFVO0FBQ2hELFFBQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixVQUFVLElBQUksR0FBRztBQUNoRTtBQUFBLFFBQ0U7QUFBQSxNQUFBO0FBQUEsSUFFSjtBQUNJLFFBQUEsQ0FBQyxTQUFTLElBQUksR0FBRztBQUNuQixPQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQU8saUNBQWlDO0FBQUEsSUFBQSxPQUNoRjtBQUNJLGVBQUEsT0FBTyxTQUFTLElBQUk7QUFDN0IsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxtQkFBVyxPQUFPLE1BQU07QUFDdEIsbUNBQXlCLFFBQW1CLEdBQUc7QUFDL0MsY0FBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxHQUFHO0FBQ3RCLG1CQUFBLGVBQWUsS0FBSyxLQUFLO0FBQUEsY0FDOUIsY0FBYztBQUFBLGNBQ2QsWUFBWTtBQUFBLGNBQ1osS0FBSyxNQUFNLEtBQUssR0FBRztBQUFBLGNBQ25CLEtBQUs7QUFBQSxZQUFBLENBQ047QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNvQixzQkFBQTtBQUNwQixNQUFJLGlCQUFpQjtBQUNuQixlQUFXLE9BQU8saUJBQWlCO0FBQzNCLFlBQUEsTUFBTSxnQkFBZ0IsR0FBRztBQUMvQixZQUFNRyxPQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksS0FBSyxZQUFZLFVBQVUsSUFBSSxXQUFXLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLFlBQVksVUFBVSxJQUFJO0FBQzlILFVBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQkEsU0FBUSxNQUFNO0FBQ3RELGVBQUEsc0JBQXNCLEdBQUcsa0JBQWtCO0FBQUEsTUFDcEQ7QUFDTSxZQUFBVixPQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixNQUFNO0FBQ2pJO0FBQUEsVUFDRSw4Q0FBOEMsR0FBRztBQUFBLFFBQUE7QUFBQSxNQUVqRCxJQUFBO0FBQ0osWUFBTSxJQUFJLFNBQVM7QUFBQSxRQUNqQixLQUFBVTtBQUFBLFFBQ0EsS0FBQVY7QUFBQSxNQUFBLENBQ0Q7QUFDTSxhQUFBLGVBQWUsS0FBSyxLQUFLO0FBQUEsUUFDOUIsWUFBWTtBQUFBLFFBQ1osY0FBYztBQUFBLFFBQ2QsS0FBSyxNQUFNLEVBQUU7QUFBQSxRQUNiLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUTtBQUFBLE1BQUEsQ0FDdkI7QUFDRCxVQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLGlDQUF5QixZQUEyQixHQUFHO0FBQUEsTUFDekQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksY0FBYztBQUNoQixlQUFXLE9BQU8sY0FBYztBQUM5QixvQkFBYyxhQUFhLEdBQUcsR0FBRyxLQUFLLFlBQVksR0FBRztBQUFBLElBQ3ZEO0FBQUEsRUFDRjtBQUNBLE1BQUksZ0JBQWdCO0FBQ2xCLFVBQU0sV0FBVyxXQUFXLGNBQWMsSUFBSSxlQUFlLEtBQUssVUFBVSxJQUFJO0FBQ2hGLFlBQVEsUUFBUSxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7QUFDakMsY0FBQSxLQUFLLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFBQSxDQUMzQjtBQUFBLEVBQ0g7QUFDQSxNQUFJLFNBQVM7QUFDRixhQUFBLFNBQVMsVUFBVSxHQUFHO0FBQUEsRUFDakM7QUFDUyxXQUFBLHNCQUFzQixVQUFVLE1BQU07QUFDekMsUUFBQSxRQUFRLElBQUksR0FBRztBQUNaLFdBQUEsUUFBUSxDQUFDLFVBQVUsU0FBUyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUM7QUFBQSxlQUMvQyxNQUFNO0FBQ04sZUFBQSxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQ0Esd0JBQXNCLGVBQWUsV0FBVztBQUNoRCx3QkFBc0IsV0FBVyxPQUFPO0FBQ3hDLHdCQUFzQixnQkFBZ0IsWUFBWTtBQUNsRCx3QkFBc0IsV0FBVyxPQUFPO0FBQ3hDLHdCQUFzQixhQUFhLFNBQVM7QUFDNUMsd0JBQXNCLGVBQWUsV0FBVztBQUNoRCx3QkFBc0IsaUJBQWlCLGFBQWE7QUFDcEQsd0JBQXNCLGlCQUFpQixhQUFhO0FBQ3BELHdCQUFzQixtQkFBbUIsZUFBZTtBQUN4RCx3QkFBc0IsaUJBQWlCLGFBQWE7QUFDcEQsd0JBQXNCLGFBQWEsU0FBUztBQUM1Qyx3QkFBc0Isa0JBQWtCLGNBQWM7QUFDbEQsTUFBQSxRQUFRLE1BQU0sR0FBRztBQUNuQixRQUFJLE9BQU8sUUFBUTtBQUNqQixZQUFNLFVBQVUsU0FBUyxZQUFZLFNBQVMsVUFBVSxDQUFBO0FBQ2pELGFBQUEsUUFBUSxDQUFDLFFBQVE7QUFDZixlQUFBLGVBQWUsU0FBUyxLQUFLO0FBQUEsVUFDbEMsS0FBSyxNQUFNLFdBQVcsR0FBRztBQUFBLFVBQ3pCLEtBQUssQ0FBQyxRQUFRLFdBQVcsR0FBRyxJQUFJO0FBQUEsUUFBQSxDQUNqQztBQUFBLE1BQUEsQ0FDRjtBQUFBLElBQUEsV0FDUSxDQUFDLFNBQVMsU0FBUztBQUM1QixlQUFTLFVBQVU7SUFDckI7QUFBQSxFQUNGO0FBQ0ksTUFBQSxVQUFVLFNBQVMsV0FBVyxNQUFNO0FBQ3RDLGFBQVMsU0FBUztBQUFBLEVBQ3BCO0FBQ0EsTUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixhQUFTLGVBQWU7QUFBQSxFQUMxQjtBQUNJLE1BQUEscUJBQXFCLGFBQWE7QUFDbEMsTUFBQSxxQkFBcUIsYUFBYTtBQUN4QztBQUNBLFNBQVMsa0JBQWtCLGVBQWUsS0FBSywyQkFBMkIsTUFBTTtBQUMxRSxNQUFBLFFBQVEsYUFBYSxHQUFHO0FBQzFCLG9CQUFnQixnQkFBZ0IsYUFBYTtBQUFBLEVBQy9DO0FBQ0EsYUFBVyxPQUFPLGVBQWU7QUFDekIsVUFBQSxNQUFNLGNBQWMsR0FBRztBQUN6QixRQUFBO0FBQ0EsUUFBQSxTQUFTLEdBQUcsR0FBRztBQUNqQixVQUFJLGFBQWEsS0FBSztBQUNULG1CQUFBO0FBQUEsVUFDVCxJQUFJLFFBQVE7QUFBQSxVQUNaLElBQUk7QUFBQSxVQUNKO0FBQUEsUUFBQTtBQUFBLE1BQ0YsT0FDSztBQUNNLG1CQUFBLE9BQU8sSUFBSSxRQUFRLEdBQUc7QUFBQSxNQUNuQztBQUFBLElBQUEsT0FDSztBQUNMLGlCQUFXLE9BQU8sR0FBRztBQUFBLElBQ3ZCO0FBQ0ksUUFBQSxNQUFNLFFBQVEsR0FBRztBQUNaLGFBQUEsZUFBZSxLQUFLLEtBQUs7QUFBQSxRQUM5QixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsUUFDZCxLQUFLLE1BQU0sU0FBUztBQUFBLFFBQ3BCLEtBQUssQ0FBQyxNQUFNLFNBQVMsUUFBUTtBQUFBLE1BQUEsQ0FDOUI7QUFBQSxJQUFBLE9BQ0k7QUFDTCxVQUFJLEdBQUcsSUFBSTtBQUFBLElBQ2I7QUFDQSxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLCtCQUF5QixVQUF1QixHQUFHO0FBQUEsSUFDckQ7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxTQUFTLFNBQVMsTUFBTSxVQUFVLE1BQU07QUFDdEM7QUFBQSxJQUNFLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDVyxPQUFNQSxHQUFFLEtBQUssU0FBUyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQUEsSUFDbEY7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVKO0FBQ0EsU0FBUyxjQUFjLEtBQUssS0FBSyxZQUFZLEtBQUs7QUFDMUMsUUFBQSxTQUFTLElBQUksU0FBUyxHQUFHLElBQUksaUJBQWlCLFlBQVksR0FBRyxJQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3ZGLE1BQUEsU0FBUyxHQUFHLEdBQUc7QUFDWCxVQUFBLFVBQVUsSUFBSSxHQUFHO0FBQ25CLFFBQUEsV0FBVyxPQUFPLEdBQUc7QUFDdkIsWUFBTSxRQUFRLE9BQU87QUFBQSxJQUFBLFdBQ1osQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsYUFBQSwyQ0FBMkMsR0FBRyxLQUFLLE9BQU87QUFBQSxJQUNuRTtBQUFBLEVBQUEsV0FDUyxXQUFXLEdBQUcsR0FBRztBQUMxQixVQUFNLFFBQVEsSUFBSSxLQUFLLFVBQVUsQ0FBQztBQUFBLEVBQUEsV0FDekIsU0FBUyxHQUFHLEdBQUc7QUFDcEIsUUFBQSxRQUFRLEdBQUcsR0FBRztBQUNaLFVBQUEsUUFBUSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssWUFBWSxHQUFHLENBQUM7QUFBQSxJQUFBLE9BQ3BEO0FBQ0wsWUFBTSxVQUFVLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEtBQUssVUFBVSxJQUFJLElBQUksSUFBSSxPQUFPO0FBQ3BGLFVBQUEsV0FBVyxPQUFPLEdBQUc7QUFDakIsY0FBQSxRQUFRLFNBQVMsR0FBRztBQUFBLE1BQUEsV0FDakIsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDcEQsZUFBTywyQ0FBMkMsSUFBSSxPQUFPLEtBQUssT0FBTztBQUFBLE1BQzNFO0FBQUEsSUFDRjtBQUFBLEVBQUEsV0FDUyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxXQUFBLDBCQUEwQixHQUFHLEtBQUssR0FBRztBQUFBLEVBQzlDO0FBQ0Y7QUFDQSxTQUFTLHFCQUFxQixVQUFVO0FBQ3RDLFFBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQU0sRUFBRSxRQUFRLFNBQVMsZUFBQSxJQUFtQjtBQUN0QyxRQUFBO0FBQUEsSUFDSixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxRQUFRLEVBQUUsc0JBQXNCO0FBQUEsRUFBQSxJQUM5QixTQUFTO0FBQ1AsUUFBQSxTQUFTLE1BQU0sSUFBSSxJQUFJO0FBQ3pCLE1BQUE7QUFDSixNQUFJLFFBQVE7QUFDQyxlQUFBO0FBQUEsRUFBQSxXQUNGLENBQUMsYUFBYSxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtBQUM3RDtBQUNhLGlCQUFBO0FBQUEsSUFDYjtBQUFBLEVBQUEsT0FDSztBQUNMLGVBQVcsQ0FBQTtBQUNYLFFBQUksYUFBYSxRQUFRO0FBQ1YsbUJBQUE7QUFBQSxRQUNYLENBQUMsTUFBTSxhQUFhLFVBQVUsR0FBRyx1QkFBdUIsSUFBSTtBQUFBLE1BQUE7QUFBQSxJQUVoRTtBQUNhLGlCQUFBLFVBQVUsTUFBTSxxQkFBcUI7QUFBQSxFQUNwRDtBQUNJLE1BQUEsU0FBUyxJQUFJLEdBQUc7QUFDWixVQUFBLElBQUksTUFBTSxRQUFRO0FBQUEsRUFDMUI7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLGFBQWEsSUFBSSxNQUFNLFFBQVEsVUFBVSxPQUFPO0FBQ3ZELFFBQU0sRUFBRSxRQUFRLFNBQVMsZUFBQSxJQUFtQjtBQUM1QyxNQUFJLGdCQUFnQjtBQUNMLGlCQUFBLElBQUksZ0JBQWdCLFFBQVEsSUFBSTtBQUFBLEVBQy9DO0FBQ0EsTUFBSSxRQUFRO0FBQ0gsV0FBQTtBQUFBLE1BQ0wsQ0FBQyxNQUFNLGFBQWEsSUFBSSxHQUFHLFFBQVEsSUFBSTtBQUFBLElBQUE7QUFBQSxFQUUzQztBQUNBLGFBQVcsT0FBTyxNQUFNO0FBQ2xCLFFBQUEsV0FBVyxRQUFRLFVBQVU7QUFDL0IsT0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQjtBQUFBLFFBQzNDO0FBQUEsTUFBQTtBQUFBLElBQ0YsT0FDSztBQUNMLFlBQU0sUUFBUSwwQkFBMEIsR0FBRyxLQUFLLFVBQVUsT0FBTyxHQUFHO0FBQ3BFLFNBQUcsR0FBRyxJQUFJLFFBQVEsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUFBLElBQ3hEO0FBQUEsRUFDRjtBQUNPLFNBQUE7QUFDVDtBQUNBLE1BQU0sNEJBQTRCO0FBQUEsRUFDaEMsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBO0FBQUEsRUFFUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUE7QUFBQSxFQUVWLGNBQWM7QUFBQSxFQUNkLFNBQVM7QUFBQSxFQUNULGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULGNBQWM7QUFBQSxFQUNkLFNBQVM7QUFBQSxFQUNULGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLGdCQUFnQjtBQUFBO0FBQUEsRUFFaEIsWUFBWTtBQUFBLEVBQ1osWUFBWTtBQUFBO0FBQUEsRUFFWixPQUFPO0FBQUE7QUFBQSxFQUVQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFDVjtBQUNBLFNBQVMsWUFBWSxJQUFJLE1BQU07QUFDN0IsTUFBSSxDQUFDLE1BQU07QUFDRixXQUFBO0FBQUEsRUFDVDtBQUNBLE1BQUksQ0FBQyxJQUFJO0FBQ0EsV0FBQTtBQUFBLEVBQ1Q7QUFDQSxTQUFPLFNBQVMsZUFBZTtBQUNyQixXQUFBO0FBQUEsTUFDTixXQUFXLEVBQUUsSUFBSSxHQUFHLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxNQUN2QyxXQUFXLElBQUksSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxJQUFBO0FBQUEsRUFDN0M7QUFFSjtBQUNBLFNBQVMsWUFBWSxJQUFJLE1BQU07QUFDN0IsU0FBTyxtQkFBbUIsZ0JBQWdCLEVBQUUsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDO0FBQ3RFO0FBQ0EsU0FBUyxnQkFBZ0IsS0FBSztBQUN4QixNQUFBLFFBQVEsR0FBRyxHQUFHO0FBQ2hCLFVBQU0sTUFBTSxDQUFBO0FBQ1osYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSztBQUNuQyxVQUFJLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQUEsSUFDckI7QUFDTyxXQUFBO0FBQUEsRUFDVDtBQUNPLFNBQUE7QUFDVDtBQUNBLFNBQVMsYUFBYSxJQUFJLE1BQU07QUFDOUIsU0FBTyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBRyxFQUFBLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJO0FBQ2xEO0FBQ0EsU0FBUyxtQkFBbUIsSUFBSSxNQUFNO0FBQzdCLFNBQUEsS0FBSyxPQUE4Qix1QkFBQSxPQUFPLElBQUksR0FBRyxJQUFJLElBQUksSUFBSTtBQUN0RTtBQUNBLFNBQVMseUJBQXlCLElBQUksTUFBTTtBQUMxQyxNQUFJLElBQUk7QUFDTixRQUFJLFFBQVEsRUFBRSxLQUFLLFFBQVEsSUFBSSxHQUFHO0FBQ3pCLGFBQUEsQ0FBQyxHQUFtQixvQkFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFBQSxJQUN0RDtBQUNPLFdBQUE7QUFBQSxNQUNXLHVCQUFPLE9BQU8sSUFBSTtBQUFBLE1BQ2xDLHNCQUFzQixFQUFFO0FBQUEsTUFDeEIsc0JBQXNCLFFBQVEsT0FBTyxPQUFPLENBQUEsQ0FBRTtBQUFBLElBQUE7QUFBQSxFQUNoRCxPQUNLO0FBQ0UsV0FBQTtBQUFBLEVBQ1Q7QUFDRjtBQUNBLFNBQVMsa0JBQWtCLElBQUksTUFBTTtBQUMvQixNQUFBLENBQUMsR0FBVyxRQUFBO0FBQ1osTUFBQSxDQUFDLEtBQWEsUUFBQTtBQUNsQixRQUFNLFNBQVMsT0FBdUIsdUJBQU8sT0FBTyxJQUFJLEdBQUcsRUFBRTtBQUM3RCxhQUFXLE9BQU8sTUFBTTtBQUNmLFdBQUEsR0FBRyxJQUFJLGFBQWEsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7QUFBQSxFQUMvQztBQUNPLFNBQUE7QUFDVDtBQUVBLFNBQVMsbUJBQW1CO0FBQ25CLFNBQUE7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGtCQUFrQixDQUFDO0FBQUEsTUFDbkIsdUJBQXVCLENBQUM7QUFBQSxNQUN4QixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixpQkFBaUIsQ0FBQztBQUFBLElBQ3BCO0FBQUEsSUFDQSxRQUFRLENBQUM7QUFBQSxJQUNULFlBQVksQ0FBQztBQUFBLElBQ2IsWUFBWSxDQUFDO0FBQUEsSUFDYixVQUFpQyx1QkFBQSxPQUFPLElBQUk7QUFBQSxJQUM1QyxrQ0FBa0MsUUFBUTtBQUFBLElBQzFDLGdDQUFnQyxRQUFRO0FBQUEsSUFDeEMsZ0NBQWdDLFFBQVE7QUFBQSxFQUFBO0FBRTVDO0FBQ0EsSUFBSSxRQUFRO0FBQ1osU0FBUyxhQUFhLFFBQVEsU0FBUztBQUNyQyxTQUFPLFNBQVNDLFdBQVUsZUFBZSxZQUFZLE1BQU07QUFDckQsUUFBQSxDQUFDLFdBQVcsYUFBYSxHQUFHO0FBQ2Qsc0JBQUEsT0FBTyxJQUFJLGFBQWE7QUFBQSxJQUMxQztBQUNBLFFBQUksYUFBYSxRQUFRLENBQUMsU0FBUyxTQUFTLEdBQUc7QUFDN0MsT0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUFPLHFEQUFxRDtBQUM3RixrQkFBQTtBQUFBLElBQ2Q7QUFDQSxVQUFNLFVBQVU7QUFDVixVQUFBLHVDQUF1QztBQUM3QyxRQUFJLFlBQVk7QUFDVixVQUFBSixPQUFNLFFBQVEsTUFBTTtBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYO0FBQUEsTUFDQSxJQUFJLFNBQVM7QUFDWCxlQUFPLFFBQVE7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsSUFBSSxPQUFPLEdBQUc7QUFDWixZQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDO0FBQUEsWUFDRTtBQUFBLFVBQUE7QUFBQSxRQUVKO0FBQUEsTUFDRjtBQUFBLE1BQ0EsSUFBSSxXQUFXLFNBQVM7QUFDbEIsWUFBQSxpQkFBaUIsSUFBSSxNQUFNLEdBQUc7QUFDaEMsV0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUFPLGdEQUFnRDtBQUFBLFFBQzNGLFdBQUEsVUFBVSxXQUFXLE9BQU8sT0FBTyxHQUFHO0FBQy9DLDJCQUFpQixJQUFJLE1BQU07QUFDcEIsaUJBQUEsUUFBUUEsTUFBSyxHQUFHLE9BQU87QUFBQSxRQUFBLFdBQ3JCLFdBQVcsTUFBTSxHQUFHO0FBQzdCLDJCQUFpQixJQUFJLE1BQU07QUFDcEIsaUJBQUFBLE1BQUssR0FBRyxPQUFPO0FBQUEsUUFBQSxXQUNiLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3BEO0FBQUEsWUFDRTtBQUFBLFVBQUE7QUFBQSxRQUVKO0FBQ08sZUFBQUE7QUFBQSxNQUNUO0FBQUEsTUFDQSxNQUFNLE9BQU87QUFDYztBQUN2QixjQUFJLENBQUMsUUFBUSxPQUFPLFNBQVMsS0FBSyxHQUFHO0FBQzNCLG9CQUFBLE9BQU8sS0FBSyxLQUFLO0FBQUEsVUFBQSxXQUNoQixDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRDtBQUFBLGNBQ0Usa0RBQWtELE1BQU0sT0FBTyxLQUFLLE1BQU0sSUFBSSxLQUFLO0FBQUEsWUFBQTtBQUFBLFVBRXZGO0FBQUEsUUFHRjtBQUNPLGVBQUFBO0FBQUEsTUFDVDtBQUFBLE1BQ0EsVUFBVSxNQUFNLFdBQVc7QUFDekIsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUN2QixnQ0FBQSxNQUFNLFFBQVEsTUFBTTtBQUFBLFFBQzVDO0FBQ0EsWUFBSSxDQUFDLFdBQVc7QUFDUCxpQkFBQSxRQUFRLFdBQVcsSUFBSTtBQUFBLFFBQ2hDO0FBQ0ksWUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLFFBQVEsV0FBVyxJQUFJLEdBQUc7QUFDbEUsaUJBQUEsY0FBYyxJQUFJLDhDQUE4QztBQUFBLFFBQ3pFO0FBQ1EsZ0JBQUEsV0FBVyxJQUFJLElBQUk7QUFDcEIsZUFBQUE7QUFBQSxNQUNUO0FBQUEsTUFDQSxVQUFVLE1BQU0sV0FBVztBQUN6QixZQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLGdDQUFzQixJQUFJO0FBQUEsUUFDNUI7QUFDQSxZQUFJLENBQUMsV0FBVztBQUNQLGlCQUFBLFFBQVEsV0FBVyxJQUFJO0FBQUEsUUFDaEM7QUFDSSxZQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsUUFBUSxXQUFXLElBQUksR0FBRztBQUNsRSxpQkFBQSxjQUFjLElBQUksOENBQThDO0FBQUEsUUFDekU7QUFDUSxnQkFBQSxXQUFXLElBQUksSUFBSTtBQUNwQixlQUFBQTtBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU0sZUFBZSxXQUFXLFdBQVc7QUFDekMsWUFBSSxDQUFDLFdBQVc7QUFDZCxjQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsY0FBYyxhQUFhO0FBQzFFO0FBQUEsY0FDRTtBQUFBO0FBQUEsWUFBQTtBQUFBLFVBR0o7QUFDTSxnQkFBQSxRQUFRLFlBQVksZUFBZSxTQUFTO0FBQ2xELGdCQUFNLGFBQWE7QUFDbkIsY0FBSSxjQUFjLE1BQU07QUFDVix3QkFBQTtBQUFBLFVBQUEsV0FDSCxjQUFjLE9BQU87QUFDbEIsd0JBQUE7QUFBQSxVQUNkO0FBQ0EsY0FBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxvQkFBUSxTQUFTLE1BQU07QUFDckI7QUFBQSxnQkFDRSxXQUFXLEtBQUs7QUFBQSxnQkFDaEI7QUFBQSxnQkFDQTtBQUFBLGNBQUE7QUFBQSxZQUNGO0FBQUEsVUFFSjtBQUNBLGNBQUksYUFBYSxTQUFTO0FBQ3hCLG9CQUFRLE9BQU8sYUFBYTtBQUFBLFVBQUEsT0FDdkI7QUFDRSxtQkFBQSxPQUFPLGVBQWUsU0FBUztBQUFBLFVBQ3hDO0FBQ1ksc0JBQUE7QUFDWixVQUFBQSxLQUFJLGFBQWE7QUFDakIsd0JBQWMsY0FBY0E7QUFDNUIsY0FBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQXVCO0FBQ3RFLFlBQUFBLEtBQUksWUFBWSxNQUFNO0FBQ3RCLDRCQUFnQkEsTUFBSyxPQUFPO0FBQUEsVUFDOUI7QUFDTyxpQkFBQSwyQkFBMkIsTUFBTSxTQUFTO0FBQUEsUUFBQSxXQUN4QyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRDtBQUFBLFlBQ0U7QUFBQTtBQUFBLFVBQUE7QUFBQSxRQUdKO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLFlBQUksV0FBVztBQUNOLGlCQUFBLE1BQU1BLEtBQUksVUFBVTtBQUMzQixjQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBdUI7QUFDdEUsWUFBQUEsS0FBSSxZQUFZO0FBQ2hCLCtCQUFtQkEsSUFBRztBQUFBLFVBQ3hCO0FBQ0EsaUJBQU9BLEtBQUksV0FBVztBQUFBLFFBQUEsV0FDYixDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRCxpQkFBTyw0Q0FBNEM7QUFBQSxRQUNyRDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVEsS0FBSyxPQUFPO0FBQ2QsWUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQU8sUUFBUSxVQUFVO0FBQ3hFO0FBQUEsWUFDRSwyQ0FBMkMsT0FBTyxHQUFHLENBQUM7QUFBQSxVQUFBO0FBQUEsUUFFMUQ7QUFDUSxnQkFBQSxTQUFTLEdBQUcsSUFBSTtBQUNqQixlQUFBQTtBQUFBLE1BQ1Q7QUFBQSxNQUNBLGVBQWUsSUFBSTtBQUNqQixjQUFNLFVBQVU7QUFDSCxxQkFBQUE7QUFDVCxZQUFBO0FBQ0YsaUJBQU8sR0FBRztBQUFBLFFBQUEsVUFDVjtBQUNhLHVCQUFBO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUFBO0FBRUssV0FBQUE7QUFBQSxFQUFBO0FBRVg7QUFDQSxJQUFJLGFBQWE7QUFFakIsU0FBUyxRQUFRLEtBQUssT0FBTztBQUMzQixNQUFJLENBQUMsaUJBQWlCO0FBQ3BCLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsYUFBTyw0Q0FBNEM7QUFBQSxJQUNyRDtBQUFBLEVBQUEsT0FDSztBQUNMLFFBQUksV0FBVyxnQkFBZ0I7QUFDL0IsVUFBTSxpQkFBaUIsZ0JBQWdCLFVBQVUsZ0JBQWdCLE9BQU87QUFDeEUsUUFBSSxtQkFBbUIsVUFBVTtBQUMvQixpQkFBVyxnQkFBZ0IsV0FBVyxPQUFPLE9BQU8sY0FBYztBQUFBLElBQ3BFO0FBQ0EsYUFBUyxHQUFHLElBQUk7QUFBQSxFQUNsQjtBQUNGO0FBQ0EsU0FBUyxPQUFPLEtBQUssY0FBYyx3QkFBd0IsT0FBTztBQUNoRSxRQUFNLFdBQVcsbUJBQW1CO0FBQ3BDLE1BQUksWUFBWSxZQUFZO0FBQzFCLFVBQU0sV0FBVyxhQUFhLFdBQVcsU0FBUyxXQUFXLFdBQVcsU0FBUyxVQUFVLE9BQU8sU0FBUyxNQUFNLGNBQWMsU0FBUyxNQUFNLFdBQVcsV0FBVyxTQUFTLE9BQU8sV0FBVztBQUMzTCxRQUFBLFlBQVksT0FBTyxVQUFVO0FBQy9CLGFBQU8sU0FBUyxHQUFHO0FBQUEsSUFBQSxXQUNWLFVBQVUsU0FBUyxHQUFHO0FBQ3hCLGFBQUEseUJBQXlCLFdBQVcsWUFBWSxJQUFJLGFBQWEsS0FBSyxZQUFZLFNBQVMsS0FBSyxJQUFJO0FBQUEsSUFBQSxXQUNsRyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRCxhQUFPLGNBQWMsT0FBTyxHQUFHLENBQUMsY0FBYztBQUFBLElBQ2hEO0FBQUEsRUFBQSxXQUNTLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3BELFdBQU8sb0VBQW9FO0FBQUEsRUFDN0U7QUFDRjtBQUtBLE1BQU0sc0JBQXNCLENBQUE7QUFDNUIsTUFBTSx1QkFBdUIsTUFBTSxPQUFPLE9BQU8sbUJBQW1CO0FBQ3BFLE1BQU0sbUJBQW1CLENBQUMsUUFBUSxPQUFPLGVBQWUsR0FBRyxNQUFNO0FBRWpFLFNBQVMsVUFBVSxVQUFVLFVBQVUsWUFBWSxRQUFRLE9BQU87QUFDaEUsUUFBTSxRQUFRLENBQUE7QUFDZCxRQUFNLFFBQVE7QUFDTCxXQUFBLGdCQUF1Qyx1QkFBQSxPQUFPLElBQUk7QUFDOUMsZUFBQSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQzdDLGFBQVcsT0FBTyxTQUFTLGFBQWEsQ0FBQyxHQUFHO0FBQ3RDLFFBQUEsRUFBRSxPQUFPLFFBQVE7QUFDbkIsWUFBTSxHQUFHLElBQUk7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNBLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0Msa0JBQWMsWUFBWSxDQUFBLEdBQUksT0FBTyxRQUFRO0FBQUEsRUFDL0M7QUFDQSxNQUFJLFlBQVk7QUFDZCxhQUFTLFFBQVEsUUFBUSxRQUFRLGdCQUFnQixLQUFLO0FBQUEsRUFBQSxPQUNqRDtBQUNELFFBQUEsQ0FBQyxTQUFTLEtBQUssT0FBTztBQUN4QixlQUFTLFFBQVE7QUFBQSxJQUFBLE9BQ1o7QUFDTCxlQUFTLFFBQVE7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDQSxXQUFTLFFBQVE7QUFDbkI7QUFDQSxTQUFTLGVBQWUsVUFBVTtBQUNoQyxTQUFPLFVBQVU7QUFDWCxRQUFBLFNBQVMsS0FBSyxRQUFnQixRQUFBO0FBQ2xDLGVBQVcsU0FBUztBQUFBLEVBQ3RCO0FBQ0Y7QUFDQSxTQUFTLFlBQVksVUFBVSxVQUFVLGNBQWMsV0FBVztBQUMxRCxRQUFBO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU8sRUFBRSxVQUFVO0FBQUEsRUFDakIsSUFBQTtBQUNFLFFBQUEsa0JBQWtCLE1BQU0sS0FBSztBQUM3QixRQUFBLENBQUMsT0FBTyxJQUFJLFNBQVM7QUFDM0IsTUFBSSxrQkFBa0I7QUFDdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixlQUFlLFFBQVEsT0FBTyxhQUFhLFlBQVksTUFBTSxFQUFFLFlBQVk7QUFBQSxJQUMxSDtBQUNBLFFBQUksWUFBWSxHQUFHO0FBQ1gsWUFBQSxnQkFBZ0IsU0FBUyxNQUFNO0FBQ3JDLGVBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFDekMsWUFBQSxNQUFNLGNBQWMsQ0FBQztBQUN6QixZQUFJLGVBQWUsU0FBUyxjQUFjLEdBQUcsR0FBRztBQUM5QztBQUFBLFFBQ0Y7QUFDTSxjQUFBLFFBQVEsU0FBUyxHQUFHO0FBQzFCLFlBQUksU0FBUztBQUNQLGNBQUEsT0FBTyxPQUFPLEdBQUcsR0FBRztBQUNsQixnQkFBQSxVQUFVLE1BQU0sR0FBRyxHQUFHO0FBQ3hCLG9CQUFNLEdBQUcsSUFBSTtBQUNLLGdDQUFBO0FBQUEsWUFDcEI7QUFBQSxVQUFBLE9BQ0s7QUFDQyxrQkFBQSxlQUFlLFNBQVMsR0FBRztBQUNqQyxrQkFBTSxZQUFZLElBQUk7QUFBQSxjQUNwQjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFBQTtBQUFBLFVBRUo7QUFBQSxRQUFBLE9BQ0s7QUFDRCxjQUFBLFVBQVUsTUFBTSxHQUFHLEdBQUc7QUFDeEIsa0JBQU0sR0FBRyxJQUFJO0FBQ0ssOEJBQUE7QUFBQSxVQUNwQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQUEsT0FDSztBQUNMLFFBQUksYUFBYSxVQUFVLFVBQVUsT0FBTyxLQUFLLEdBQUc7QUFDaEMsd0JBQUE7QUFBQSxJQUNwQjtBQUNJLFFBQUE7QUFDSixlQUFXLE9BQU8saUJBQWlCO0FBQ2pDLFVBQUksQ0FBQztBQUFBLE1BQ0wsQ0FBQyxPQUFPLFVBQVUsR0FBRztBQUFBO0FBQUEsUUFFbkIsV0FBVyxVQUFVLEdBQUcsT0FBTyxPQUFPLENBQUMsT0FBTyxVQUFVLFFBQVEsSUFBSTtBQUNwRSxZQUFJLFNBQVM7QUFDUCxjQUFBO0FBQUEsV0FDSCxhQUFhLEdBQUcsTUFBTTtBQUFBLFVBQ3ZCLGFBQWEsUUFBUSxNQUFNLFNBQVM7QUFDbEMsa0JBQU0sR0FBRyxJQUFJO0FBQUEsY0FDWDtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFBQTtBQUFBLFVBRUo7QUFBQSxRQUFBLE9BQ0s7QUFDTCxpQkFBTyxNQUFNLEdBQUc7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsUUFBSSxVQUFVLGlCQUFpQjtBQUM3QixpQkFBVyxPQUFPLE9BQU87QUFDdkIsWUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLFVBQVUsR0FBRyxLQUFLLE1BQU07QUFDL0MsaUJBQU8sTUFBTSxHQUFHO0FBQ0UsNEJBQUE7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksaUJBQWlCO0FBQ1gsWUFBQSxTQUFTLE9BQU8sT0FBTyxFQUFFO0FBQUEsRUFDbkM7QUFDQSxNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLGtCQUFjLFlBQVksQ0FBQSxHQUFJLE9BQU8sUUFBUTtBQUFBLEVBQy9DO0FBQ0Y7QUFDQSxTQUFTLGFBQWEsVUFBVSxVQUFVLE9BQU8sT0FBTztBQUN0RCxRQUFNLENBQUMsU0FBUyxZQUFZLElBQUksU0FBUztBQUN6QyxNQUFJLGtCQUFrQjtBQUNsQixNQUFBO0FBQ0osTUFBSSxVQUFVO0FBQ1osYUFBUyxPQUFPLFVBQVU7QUFDcEIsVUFBQSxlQUFlLEdBQUcsR0FBRztBQUN2QjtBQUFBLE1BQ0Y7QUFDTSxZQUFBLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFVBQUE7QUFDSixVQUFJLFdBQVcsT0FBTyxTQUFTLFdBQVcsU0FBUyxHQUFHLENBQUMsR0FBRztBQUN4RCxZQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxTQUFTLFFBQVEsR0FBRztBQUNyRCxnQkFBTSxRQUFRLElBQUk7QUFBQSxRQUFBLE9BQ2I7QUFDTCxXQUFDLGtCQUFrQixnQkFBZ0IsQ0FBQSxJQUFLLFFBQVEsSUFBSTtBQUFBLFFBQ3REO0FBQUEsaUJBQ1MsQ0FBQyxlQUFlLFNBQVMsY0FBYyxHQUFHLEdBQUc7QUFDdEQsWUFBSSxFQUFFLE9BQU8sVUFBVSxVQUFVLE1BQU0sR0FBRyxHQUFHO0FBQzNDLGdCQUFNLEdBQUcsSUFBSTtBQUNLLDRCQUFBO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGNBQWM7QUFDVixVQUFBLGtCQUFrQixNQUFNLEtBQUs7QUFDbkMsVUFBTSxhQUFhLGlCQUFpQjtBQUNwQyxhQUFTLElBQUksR0FBRyxJQUFJLGFBQWEsUUFBUSxLQUFLO0FBQ3RDLFlBQUEsTUFBTSxhQUFhLENBQUM7QUFDMUIsWUFBTSxHQUFHLElBQUk7QUFBQSxRQUNYO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFdBQVcsR0FBRztBQUFBLFFBQ2Q7QUFBQSxRQUNBLENBQUMsT0FBTyxZQUFZLEdBQUc7QUFBQSxNQUFBO0FBQUEsSUFFM0I7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxpQkFBaUIsU0FBUyxPQUFPLEtBQUssT0FBTyxVQUFVLFVBQVU7QUFDbEUsUUFBQSxNQUFNLFFBQVEsR0FBRztBQUN2QixNQUFJLE9BQU8sTUFBTTtBQUNULFVBQUEsYUFBYSxPQUFPLEtBQUssU0FBUztBQUNwQyxRQUFBLGNBQWMsVUFBVSxRQUFRO0FBQ2xDLFlBQU0sZUFBZSxJQUFJO0FBQ3JCLFVBQUEsSUFBSSxTQUFTLFlBQVksQ0FBQyxJQUFJLGVBQWUsV0FBVyxZQUFZLEdBQUc7QUFDbkUsY0FBQSxFQUFFLGNBQWtCLElBQUE7QUFDMUIsWUFBSSxPQUFPLGVBQWU7QUFDeEIsa0JBQVEsY0FBYyxHQUFHO0FBQUEsUUFBQSxPQUNwQjtBQUNDLGdCQUFBLFFBQVEsbUJBQW1CLFFBQVE7QUFDakMsa0JBQUEsY0FBYyxHQUFHLElBQUksYUFBYTtBQUFBLFlBQ3hDO0FBQUEsWUFDQTtBQUFBLFVBQUE7QUFFSTtRQUNSO0FBQUEsTUFBQSxPQUNLO0FBQ0csZ0JBQUE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUNJLFFBQUE7QUFBQSxNQUFJO0FBQUE7QUFBQSxJQUFBLEdBQXFCO0FBQ3ZCLFVBQUEsWUFBWSxDQUFDLFlBQVk7QUFDbkIsZ0JBQUE7QUFBQSxNQUNDLFdBQUE7QUFBQSxRQUFJO0FBQUE7QUFBQSxNQUFBLE1BQTRCLFVBQVUsTUFBTSxVQUFVLFVBQVUsR0FBRyxJQUFJO0FBQzVFLGdCQUFBO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBQ0EsTUFBTSxzQ0FBc0M7QUFDNUMsU0FBUyxzQkFBc0IsTUFBTSxZQUFZLFVBQVUsT0FBTztBQUMxRCxRQUFBLFFBQStCLFVBQVUsa0JBQWtCLFdBQVc7QUFDdEUsUUFBQSxTQUFTLE1BQU0sSUFBSSxJQUFJO0FBQzdCLE1BQUksUUFBUTtBQUNILFdBQUE7QUFBQSxFQUNUO0FBQ0EsUUFBTSxNQUFNLEtBQUs7QUFDakIsUUFBTSxhQUFhLENBQUE7QUFDbkIsUUFBTSxlQUFlLENBQUE7QUFDckIsTUFBSSxhQUFhO0FBQ1UsTUFBQSxDQUFDLFdBQVcsSUFBSSxHQUFHO0FBQ3RDLFVBQUEsY0FBYyxDQUFDLFNBQVM7QUFDZixtQkFBQTtBQUNiLFlBQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxzQkFBc0IsTUFBTSxZQUFZLElBQUk7QUFDbEUsYUFBTyxZQUFZLEtBQUs7QUFDeEIsVUFBSSxLQUFNLGNBQWEsS0FBSyxHQUFHLElBQUk7QUFBQSxJQUFBO0FBRXJDLFFBQUksQ0FBQyxXQUFXLFdBQVcsT0FBTyxRQUFRO0FBQzdCLGlCQUFBLE9BQU8sUUFBUSxXQUFXO0FBQUEsSUFDdkM7QUFDQSxRQUFJLEtBQUssU0FBUztBQUNoQixrQkFBWSxLQUFLLE9BQU87QUFBQSxJQUMxQjtBQUNBLFFBQUksS0FBSyxRQUFRO0FBQ1YsV0FBQSxPQUFPLFFBQVEsV0FBVztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNJLE1BQUEsQ0FBQyxPQUFPLENBQUMsWUFBWTtBQUNuQixRQUFBLFNBQVMsSUFBSSxHQUFHO0FBQ1osWUFBQSxJQUFJLE1BQU0sU0FBUztBQUFBLElBQzNCO0FBQ08sV0FBQTtBQUFBLEVBQ1Q7QUFDSSxNQUFBLFFBQVEsR0FBRyxHQUFHO0FBQ2hCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEtBQUs7QUFDL0IsVUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHO0FBQzNELGVBQUEsa0RBQWtELElBQUksQ0FBQyxDQUFDO0FBQUEsTUFDakU7QUFDQSxZQUFNLGdCQUFnQixTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFVBQUEsaUJBQWlCLGFBQWEsR0FBRztBQUNuQyxtQkFBVyxhQUFhLElBQUk7QUFBQSxNQUM5QjtBQUFBLElBQ0Y7QUFBQSxhQUNTLEtBQUs7QUFDVixRQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsR0FBRztBQUMvRCxhQUFPLHlCQUF5QixHQUFHO0FBQUEsSUFDckM7QUFDQSxlQUFXLE9BQU8sS0FBSztBQUNmLFlBQUEsZ0JBQWdCLFNBQVMsR0FBRztBQUM5QixVQUFBLGlCQUFpQixhQUFhLEdBQUc7QUFDN0IsY0FBQSxNQUFNLElBQUksR0FBRztBQUNuQixjQUFNLE9BQU8sV0FBVyxhQUFhLElBQUksUUFBUSxHQUFHLEtBQUssV0FBVyxHQUFHLElBQUksRUFBRSxNQUFNLElBQUEsSUFBUSxPQUFPLENBQUEsR0FBSSxHQUFHO0FBQ3pHLGNBQU0sV0FBVyxLQUFLO0FBQ3RCLFlBQUksYUFBYTtBQUNqQixZQUFJLGlCQUFpQjtBQUNqQixZQUFBLFFBQVEsUUFBUSxHQUFHO0FBQ3JCLG1CQUFTLFFBQVEsR0FBRyxRQUFRLFNBQVMsUUFBUSxFQUFFLE9BQU87QUFDOUMsa0JBQUEsT0FBTyxTQUFTLEtBQUs7QUFDM0Isa0JBQU0sV0FBVyxXQUFXLElBQUksS0FBSyxLQUFLO0FBQzFDLGdCQUFJLGFBQWEsV0FBVztBQUNiLDJCQUFBO0FBQ2I7QUFBQSxZQUFBLFdBQ1MsYUFBYSxVQUFVO0FBQ2YsK0JBQUE7QUFBQSxZQUNuQjtBQUFBLFVBQ0Y7QUFBQSxRQUFBLE9BQ0s7QUFDTCx1QkFBYSxXQUFXLFFBQVEsS0FBSyxTQUFTLFNBQVM7QUFBQSxRQUN6RDtBQUNBO0FBQUEsVUFBSztBQUFBO0FBQUEsUUFBc0IsSUFBQTtBQUMzQjtBQUFBLFVBQUs7QUFBQTtBQUFBLFFBQTBCLElBQUE7QUFDL0IsWUFBSSxjQUFjLE9BQU8sTUFBTSxTQUFTLEdBQUc7QUFDekMsdUJBQWEsS0FBSyxhQUFhO0FBQUEsUUFDakM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDTSxRQUFBLE1BQU0sQ0FBQyxZQUFZLFlBQVk7QUFDakMsTUFBQSxTQUFTLElBQUksR0FBRztBQUNaLFVBQUEsSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUNPLFNBQUE7QUFDVDtBQUNBLFNBQVMsaUJBQWlCLEtBQUs7QUFDN0IsTUFBSSxJQUFJLENBQUMsTUFBTSxPQUFPLENBQUMsZUFBZSxHQUFHLEdBQUc7QUFDbkMsV0FBQTtBQUFBLEVBQUEsV0FDRSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxXQUFBLHVCQUF1QixHQUFHLDJCQUEyQjtBQUFBLEVBQzlEO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxRQUFRLE1BQU07QUFDckIsTUFBSSxTQUFTLE1BQU07QUFDVixXQUFBO0FBQUEsRUFDVDtBQUNJLE1BQUEsT0FBTyxTQUFTLFlBQVk7QUFDOUIsV0FBTyxLQUFLLFFBQVE7QUFBQSxFQUFBLFdBQ1gsT0FBTyxTQUFTLFVBQVU7QUFDbkMsVUFBTSxPQUFPLEtBQUssZUFBZSxLQUFLLFlBQVk7QUFDbEQsV0FBTyxRQUFRO0FBQUEsRUFDakI7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLGNBQWMsVUFBVSxPQUFPLFVBQVU7QUFDMUMsUUFBQSxpQkFBaUIsTUFBTSxLQUFLO0FBQzVCLFFBQUEsVUFBVSxTQUFTLGFBQWEsQ0FBQztBQUN2QyxhQUFXLE9BQU8sU0FBUztBQUNyQixRQUFBLE1BQU0sUUFBUSxHQUFHO0FBQ3JCLFFBQUksT0FBTyxLQUFNO0FBQ2pCO0FBQUEsTUFDRTtBQUFBLE1BQ0EsZUFBZSxHQUFHO0FBQUEsTUFDbEI7QUFBQSxNQUNBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsZ0JBQWdCLGNBQWMsSUFBSTtBQUFBLE1BQzlFLENBQUMsT0FBTyxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sVUFBVSxVQUFVLEdBQUcsQ0FBQztBQUFBLElBQUE7QUFBQSxFQUU5RDtBQUNGO0FBQ0EsU0FBUyxhQUFhLE1BQU0sT0FBTyxNQUFNLE9BQU8sVUFBVTtBQUN4RCxRQUFNLEVBQUUsTUFBTSxVQUFVLFdBQVcsY0FBYztBQUNqRCxNQUFJLFlBQVksVUFBVTtBQUNqQixXQUFBLDZCQUE2QixPQUFPLEdBQUc7QUFDOUM7QUFBQSxFQUNGO0FBQ0ksTUFBQSxTQUFTLFFBQVEsQ0FBQyxVQUFVO0FBQzlCO0FBQUEsRUFDRjtBQUNBLE1BQUksUUFBUSxRQUFRLFNBQVMsUUFBUSxDQUFDLFdBQVc7QUFDL0MsUUFBSSxVQUFVO0FBQ2QsVUFBTSxRQUFRLFFBQVEsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJO0FBQzFDLFVBQU0sZ0JBQWdCLENBQUE7QUFDdEIsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFVBQVUsQ0FBQyxTQUFTLEtBQUs7QUFDM0MsWUFBQSxFQUFFLE9BQU8saUJBQWlCLFdBQVcsT0FBTyxNQUFNLENBQUMsQ0FBQztBQUM1QyxvQkFBQSxLQUFLLGdCQUFnQixFQUFFO0FBQzNCLGdCQUFBO0FBQUEsSUFDWjtBQUNBLFFBQUksQ0FBQyxTQUFTO0FBQ1osYUFBTyxzQkFBc0IsTUFBTSxPQUFPLGFBQWEsQ0FBQztBQUN4RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxhQUFhLENBQUMsVUFBVSxPQUFPLEtBQUssR0FBRztBQUNsQyxXQUFBLDJEQUEyRCxPQUFPLElBQUk7QUFBQSxFQUMvRTtBQUNGO0FBQ0EsTUFBTSxlQUErQjtBQUFBLEVBQ25DO0FBQ0Y7QUFDQSxTQUFTLFdBQVcsT0FBTyxNQUFNO0FBQzNCLE1BQUE7QUFDRSxRQUFBLGVBQWUsUUFBUSxJQUFJO0FBQzdCLE1BQUEsYUFBYSxZQUFZLEdBQUc7QUFDOUIsVUFBTSxJQUFJLE9BQU87QUFDVCxZQUFBLE1BQU0sYUFBYTtBQUN2QixRQUFBLENBQUMsU0FBUyxNQUFNLFVBQVU7QUFDNUIsY0FBUSxpQkFBaUI7QUFBQSxJQUMzQjtBQUFBLEVBQUEsV0FDUyxpQkFBaUIsVUFBVTtBQUNwQyxZQUFRLFNBQVMsS0FBSztBQUFBLEVBQUEsV0FDYixpQkFBaUIsU0FBUztBQUNuQyxZQUFRLFFBQVEsS0FBSztBQUFBLEVBQUEsV0FDWixpQkFBaUIsUUFBUTtBQUNsQyxZQUFRLFVBQVU7QUFBQSxFQUFBLE9BQ2I7QUFDTCxZQUFRLGlCQUFpQjtBQUFBLEVBQzNCO0FBQ08sU0FBQTtBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVKO0FBQ0EsU0FBUyxzQkFBc0IsTUFBTSxPQUFPLGVBQWU7QUFDckQsTUFBQSxjQUFjLFdBQVcsR0FBRztBQUM5QixXQUFPLDBCQUEwQixJQUFJO0FBQUEsRUFDdkM7QUFDSSxNQUFBLFVBQVUsNkNBQTZDLElBQUksZUFBZSxjQUFjLElBQUksVUFBVSxFQUFFLEtBQUssS0FBSyxDQUFDO0FBQ2pILFFBQUEsZUFBZSxjQUFjLENBQUM7QUFDOUIsUUFBQSxlQUFlLFVBQVUsS0FBSztBQUM5QixRQUFBLGdCQUFnQixXQUFXLE9BQU8sWUFBWTtBQUM5QyxRQUFBLGdCQUFnQixXQUFXLE9BQU8sWUFBWTtBQUNoRCxNQUFBLGNBQWMsV0FBVyxLQUFLLGFBQWEsWUFBWSxLQUFLLENBQUMsVUFBVSxjQUFjLFlBQVksR0FBRztBQUN0RyxlQUFXLGVBQWUsYUFBYTtBQUFBLEVBQ3pDO0FBQ0EsYUFBVyxTQUFTLFlBQVk7QUFDNUIsTUFBQSxhQUFhLFlBQVksR0FBRztBQUM5QixlQUFXLGNBQWMsYUFBYTtBQUFBLEVBQ3hDO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxXQUFXLE9BQU8sTUFBTTtBQUMvQixNQUFJLFNBQVMsVUFBVTtBQUNyQixXQUFPLElBQUksS0FBSztBQUFBLEVBQUEsV0FDUCxTQUFTLFVBQVU7QUFDckIsV0FBQSxHQUFHLE9BQU8sS0FBSyxDQUFDO0FBQUEsRUFBQSxPQUNsQjtBQUNMLFdBQU8sR0FBRyxLQUFLO0FBQUEsRUFDakI7QUFDRjtBQUNBLFNBQVMsYUFBYSxNQUFNO0FBQzFCLFFBQU0sZ0JBQWdCLENBQUMsVUFBVSxVQUFVLFNBQVM7QUFDcEQsU0FBTyxjQUFjLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBQSxNQUFrQixJQUFJO0FBQ2pFO0FBQ0EsU0FBUyxhQUFhLE1BQU07QUFDMUIsU0FBTyxLQUFLLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBQSxNQUFrQixTQUFTO0FBQzdEO0FBRUEsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLE9BQU8sUUFBUTtBQUN6RCxNQUFNLHFCQUFxQixDQUFDLFVBQVUsUUFBUSxLQUFLLElBQUksTUFBTSxJQUFJLGNBQWMsSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDO0FBQ3pHLE1BQU0sZ0JBQWdCLENBQUMsS0FBSyxTQUFTLFFBQVE7QUFDM0MsTUFBSSxRQUFRLElBQUk7QUFDUCxXQUFBO0FBQUEsRUFDVDtBQUNNLFFBQUEsYUFBYSxRQUFRLElBQUksU0FBUztBQUN0QyxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsb0JBQW9CLENBQUMsT0FBTyxJQUFJLFNBQVMsZ0JBQWdCLE9BQU87QUFDL0c7QUFBQSxRQUNFLFNBQVMsR0FBRztBQUFBLE1BQUE7QUFBQSxJQUVoQjtBQUNBLFdBQU8sbUJBQW1CLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFBQSxLQUN6QyxHQUFHO0FBQ04sYUFBVyxLQUFLO0FBQ1QsU0FBQTtBQUNUO0FBQ0EsTUFBTSx1QkFBdUIsQ0FBQyxVQUFVLE9BQU8sYUFBYTtBQUMxRCxRQUFNLE1BQU0sU0FBUztBQUNyQixhQUFXLE9BQU8sVUFBVTtBQUN0QixRQUFBLGNBQWMsR0FBRyxFQUFHO0FBQ2xCLFVBQUEsUUFBUSxTQUFTLEdBQUc7QUFDdEIsUUFBQSxXQUFXLEtBQUssR0FBRztBQUNyQixZQUFNLEdBQUcsSUFBSSxjQUFjLEtBQUssT0FBTyxHQUFHO0FBQUEsSUFBQSxXQUNqQyxTQUFTLE1BQU07QUFDeEIsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE1BQU07QUFDckQ7QUFBQSxVQUNFLDRDQUE0QyxHQUFHO0FBQUEsUUFBQTtBQUFBLE1BRW5EO0FBQ00sWUFBQSxhQUFhLG1CQUFtQixLQUFLO0FBQ3JDLFlBQUEsR0FBRyxJQUFJLE1BQU07QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLE1BQU0sc0JBQXNCLENBQUMsVUFBVSxhQUFhO0FBQzlDLE1BQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixDQUFDLFlBQVksU0FBUyxLQUFLLEtBQUssTUFBTTtBQUNyRjtBQUFBLE1BQ0U7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNNLFFBQUEsYUFBYSxtQkFBbUIsUUFBUTtBQUNyQyxXQUFBLE1BQU0sVUFBVSxNQUFNO0FBQ2pDO0FBQ0EsTUFBTSxjQUFjLENBQUMsT0FBTyxVQUFVLGNBQWM7QUFDbEQsYUFBVyxPQUFPLFVBQVU7QUFDdEIsUUFBQSxhQUFhLFFBQVEsS0FBSztBQUN0QixZQUFBLEdBQUcsSUFBSSxTQUFTLEdBQUc7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLE1BQU0sWUFBWSxDQUFDLFVBQVUsVUFBVSxjQUFjO0FBQzdDLFFBQUEsUUFBUSxTQUFTLFFBQVEscUJBQXFCO0FBQ2hELE1BQUEsU0FBUyxNQUFNLFlBQVksSUFBSTtBQUNqQyxVQUFNLE9BQU8sU0FBUztBQUN0QixRQUFJLE1BQU07QUFDSSxrQkFBQSxPQUFPLFVBQVUsU0FBUztBQUN0QyxVQUFJLFdBQVc7QUFDVCxZQUFBLE9BQU8sS0FBSyxNQUFNLElBQUk7QUFBQSxNQUM1QjtBQUFBLElBQUEsT0FDSztBQUNMLDJCQUFxQixVQUFVLEtBQUs7QUFBQSxJQUN0QztBQUFBLGFBQ1MsVUFBVTtBQUNuQix3QkFBb0IsVUFBVSxRQUFRO0FBQUEsRUFDeEM7QUFDRjtBQUNBLE1BQU0sY0FBYyxDQUFDLFVBQVUsVUFBVSxjQUFjO0FBQy9DLFFBQUEsRUFBRSxPQUFPLE1BQVUsSUFBQTtBQUN6QixNQUFJLG9CQUFvQjtBQUN4QixNQUFJLDJCQUEyQjtBQUMzQixNQUFBLE1BQU0sWUFBWSxJQUFJO0FBQ3hCLFVBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQUksTUFBTTtBQUNSLFVBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixlQUFlO0FBQ2xELG9CQUFBLE9BQU8sVUFBVSxTQUFTO0FBQzlCLGdCQUFBLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFBQSxXQUN4QixhQUFhLFNBQVMsR0FBRztBQUNkLDRCQUFBO0FBQUEsTUFBQSxPQUNmO0FBQ08sb0JBQUEsT0FBTyxVQUFVLFNBQVM7QUFBQSxNQUN4QztBQUFBLElBQUEsT0FDSztBQUNMLDBCQUFvQixDQUFDLFNBQVM7QUFDOUIsMkJBQXFCLFVBQVUsS0FBSztBQUFBLElBQ3RDO0FBQzJCLCtCQUFBO0FBQUEsYUFDbEIsVUFBVTtBQUNuQix3QkFBb0IsVUFBVSxRQUFRO0FBQ1gsK0JBQUEsRUFBRSxTQUFTO0VBQ3hDO0FBQ0EsTUFBSSxtQkFBbUI7QUFDckIsZUFBVyxPQUFPLE9BQU87QUFDdkIsVUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLHlCQUF5QixHQUFHLEtBQUssTUFBTTtBQUNoRSxlQUFPLE1BQU0sR0FBRztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsT0FBTyxRQUFRLFdBQVcsZ0JBQWdCLE9BQU8sWUFBWSxPQUFPO0FBQ3ZFLE1BQUEsUUFBUSxNQUFNLEdBQUc7QUFDWixXQUFBO0FBQUEsTUFDTCxDQUFDLEdBQUcsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLGNBQWMsUUFBUSxTQUFTLElBQUksVUFBVSxDQUFDLElBQUk7QUFBQSxRQUNsRDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQUE7QUFFRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGVBQWUsS0FBSyxLQUFLLENBQUMsV0FBVztBQUN2QztBQUFBLEVBQ0Y7QUFDTSxRQUFBLFdBQVcsTUFBTSxZQUFZLElBQUksMkJBQTJCLE1BQU0sU0FBUyxJQUFJLE1BQU07QUFDckYsUUFBQSxRQUFRLFlBQVksT0FBTztBQUNqQyxRQUFNLEVBQUUsR0FBRyxPQUFPLEdBQUdLLFNBQVE7QUFDN0IsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLENBQUMsT0FBTztBQUN2RDtBQUFBLE1BQ0U7QUFBQSxJQUFBO0FBRUY7QUFBQSxFQUNGO0FBQ00sUUFBQSxTQUFTLGFBQWEsVUFBVTtBQUNoQyxRQUFBLE9BQU8sTUFBTSxTQUFTLFlBQVksTUFBTSxPQUFPLENBQUEsSUFBSyxNQUFNO0FBQ2hFLFFBQU0sYUFBYSxNQUFNO0FBQ3JCLE1BQUEsVUFBVSxRQUFRLFdBQVdBLE1BQUs7QUFDaEMsUUFBQSxTQUFTLE1BQU0sR0FBRztBQUNwQixXQUFLLE1BQU0sSUFBSTtBQUNYLFVBQUEsT0FBTyxZQUFZLE1BQU0sR0FBRztBQUM5QixtQkFBVyxNQUFNLElBQUk7QUFBQSxNQUN2QjtBQUFBLElBQUEsV0FDUyxNQUFNLE1BQU0sR0FBRztBQUN4QixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFDSSxNQUFBLFdBQVdBLElBQUcsR0FBRztBQUNuQiwwQkFBc0JBLE1BQUssT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUM7QUFBQSxFQUFBLE9BQzlDO0FBQ0MsVUFBQSxZQUFZLFNBQVNBLElBQUc7QUFDeEIsVUFBQSxTQUFTLE1BQU1BLElBQUc7QUFDeEIsUUFBSSxhQUFhLFFBQVE7QUFDdkIsWUFBTSxRQUFRLE1BQU07QUFDbEIsWUFBSSxPQUFPLEdBQUc7QUFDWixnQkFBTSxXQUFXLFlBQVksT0FBTyxZQUFZQSxJQUFHLElBQUksV0FBV0EsSUFBRyxJQUFJLEtBQUtBLElBQUcsSUFBSUEsS0FBSTtBQUN6RixjQUFJLFdBQVc7QUFDYixvQkFBUSxRQUFRLEtBQUssT0FBTyxVQUFVLFFBQVE7QUFBQSxVQUFBLE9BQ3pDO0FBQ0QsZ0JBQUEsQ0FBQyxRQUFRLFFBQVEsR0FBRztBQUN0QixrQkFBSSxXQUFXO0FBQ1JBLHFCQUFBQSxJQUFHLElBQUksQ0FBQyxRQUFRO0FBQ2pCLG9CQUFBLE9BQU8sWUFBWUEsSUFBRyxHQUFHO0FBQ2hCQSw2QkFBQUEsSUFBRyxJQUFJLEtBQUtBLElBQUc7QUFBQSxnQkFDNUI7QUFBQSxjQUFBLE9BQ0s7QUFDTEEscUJBQUksUUFBUSxDQUFDLFFBQVE7QUFDckIsb0JBQUksT0FBTyxFQUFHLE1BQUssT0FBTyxDQUFDLElBQUlBLEtBQUk7QUFBQSxjQUNyQztBQUFBLFlBQ1MsV0FBQSxDQUFDLFNBQVMsU0FBUyxRQUFRLEdBQUc7QUFDdkMsdUJBQVMsS0FBSyxRQUFRO0FBQUEsWUFDeEI7QUFBQSxVQUNGO0FBQUEsbUJBQ1MsV0FBVztBQUNwQixlQUFLQSxJQUFHLElBQUk7QUFDUixjQUFBLE9BQU8sWUFBWUEsSUFBRyxHQUFHO0FBQzNCLHVCQUFXQSxJQUFHLElBQUk7QUFBQSxVQUNwQjtBQUFBLG1CQUNTLFFBQVE7QUFDakJBLGVBQUksUUFBUTtBQUNaLGNBQUksT0FBTyxFQUFRLE1BQUEsT0FBTyxDQUFDLElBQUk7QUFBQSxRQUFBLFdBQ3RCLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3BELGlCQUFPLDhCQUE4QkEsTUFBSyxJQUFJLE9BQU9BLElBQUcsR0FBRztBQUFBLFFBQzdEO0FBQUEsTUFBQTtBQUVGLFVBQUksT0FBTztBQUNULGNBQU0sS0FBSztBQUNYLDhCQUFzQixPQUFPLGNBQWM7QUFBQSxNQUFBLE9BQ3RDO0FBQ0M7TUFDUjtBQUFBLElBQUEsV0FDUyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwRCxhQUFPLDhCQUE4QkEsTUFBSyxJQUFJLE9BQU9BLElBQUcsR0FBRztBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUNGO0FBRUEsTUFBTSxpQkFBaUIsT0FBTyxNQUFNO0FBQ3BDLE1BQU0sYUFBYSxDQUFDLFNBQVMsS0FBSztBQTYzQmxDLElBQUk7QUFDSixJQUFJO0FBQ0osU0FBUyxhQUFhLFVBQVUsTUFBTTtBQUNwQyxNQUFJLFNBQVMsV0FBVyxPQUFPLGVBQWUsZUFBZTtBQUMzRCxTQUFLLEtBQUssT0FBTyxJQUFJLElBQUksU0FBUyxHQUFHLEVBQUU7QUFBQSxFQUN6QztBQUNBLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUF1QjtBQUNwRCxzQkFBQSxVQUFVLE1BQU0sWUFBWSxJQUFJLEtBQUssUUFBUSxLQUFLLElBQUEsQ0FBSztBQUFBLEVBQzNFO0FBQ0Y7QUFDQSxTQUFTLFdBQVcsVUFBVSxNQUFNO0FBQ2xDLE1BQUksU0FBUyxXQUFXLE9BQU8sZUFBZSxlQUFlO0FBQzNELFVBQU0sV0FBVyxPQUFPLElBQUksSUFBSSxTQUFTLEdBQUc7QUFDNUMsVUFBTSxTQUFTLFdBQVc7QUFDMUIsU0FBSyxLQUFLLE1BQU07QUFDWCxTQUFBO0FBQUEsTUFDSCxJQUFJLG9CQUFvQixVQUFVLFNBQVMsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUFBLE1BQ3pEO0FBQUEsTUFDQTtBQUFBLElBQUE7QUFFRixTQUFLLFdBQVcsUUFBUTtBQUN4QixTQUFLLFdBQVcsTUFBTTtBQUFBLEVBQ3hCO0FBQ0EsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQXVCO0FBQ3RELG9CQUFBLFVBQVUsTUFBTSxZQUFZLElBQUksS0FBSyxRQUFRLEtBQUssSUFBQSxDQUFLO0FBQUEsRUFDekU7QUFDRjtBQUNBLFNBQVMsY0FBYztBQUNyQixNQUFJLGNBQWMsUUFBUTtBQUNqQixXQUFBO0FBQUEsRUFDVDtBQUNBLE1BQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxhQUFhO0FBQzNDLGdCQUFBO0FBQ1osV0FBTyxPQUFPO0FBQUEsRUFBQSxPQUNUO0FBQ08sZ0JBQUE7QUFBQSxFQUNkO0FBQ08sU0FBQTtBQUNUO0FBRUEsU0FBUyxtQkFBbUI7QUFDMUIsUUFBTSxXQUFXLENBQUE7QUFhakIsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLFNBQVMsUUFBUTtBQUMxRCxVQUFBLFFBQVEsU0FBUyxTQUFTO0FBQ3hCLFlBQUE7QUFBQSxNQUNOLGVBQWUsUUFBUSxNQUFNLEVBQUUsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxRQUFRLElBQUk7QUFBQTtBQUFBO0FBQUEsSUFBQTtBQUFBLEVBSWxGO0FBQ0Y7QUFFQSxNQUFNLHdCQUF3QjtBQUM5QixTQUFTLGVBQWUsU0FBUztBQUMvQixTQUFPLG1CQUFtQixPQUFPO0FBQ25DO0FBSUEsU0FBUyxtQkFBbUIsU0FBUyxvQkFBb0I7QUFDdkQ7QUFDbUI7RUFDbkI7QUFDQSxRQUFNLFNBQVM7QUFDZixTQUFPLFVBQVU7QUFDakIsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE9BQXVCO0FBQ3BELHNCQUFBLE9BQU8sOEJBQThCLE1BQU07QUFBQSxFQUMvRDtBQUNNLFFBQUE7QUFBQSxJQUNKLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLFNBQVM7QUFBQSxJQUNULGdCQUFnQjtBQUFBLElBQ2hCLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLFlBQVksaUJBQWlCO0FBQUEsSUFDN0IscUJBQXFCO0FBQUEsRUFDbkIsSUFBQTtBQUNFLFFBQUEsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLFNBQVMsTUFBTSxrQkFBa0IsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLFFBQVEsZUFBZSxNQUFNLFlBQVksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixnQkFBZ0IsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0I7QUFDalAsUUFBSSxPQUFPLElBQUk7QUFDYjtBQUFBLElBQ0Y7QUFDQSxRQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLEdBQUc7QUFDbEMsZUFBUyxnQkFBZ0IsRUFBRTtBQUNuQixjQUFBLElBQUksaUJBQWlCLGdCQUFnQixJQUFJO0FBQzVDLFdBQUE7QUFBQSxJQUNQO0FBQ0ksUUFBQSxHQUFHLGNBQWMsSUFBSTtBQUNYLGtCQUFBO0FBQ1osU0FBRyxrQkFBa0I7QUFBQSxJQUN2QjtBQUNBLFVBQU0sRUFBRSxNQUFNLEtBQUFBLE1BQUssY0FBYztBQUNqQyxZQUFRLE1BQU07QUFBQSxNQUNaLEtBQUs7QUFDUyxvQkFBQSxJQUFJLElBQUksV0FBVyxNQUFNO0FBQ3JDO0FBQUEsTUFDRixLQUFLO0FBQ2dCLDJCQUFBLElBQUksSUFBSSxXQUFXLE1BQU07QUFDNUM7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJLE1BQU0sTUFBTTtBQUNFLDBCQUFBLElBQUksV0FBVyxRQUFRLFNBQVM7QUFBQSxRQUFBLFdBQ3ZDLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3BDLDBCQUFBLElBQUksSUFBSSxXQUFXLFNBQVM7QUFBQSxRQUM5QztBQUNBO0FBQUEsTUFDRixLQUFLO0FBQ0g7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBRUY7QUFBQSxNQUNGO0FBQ0UsWUFBSSxZQUFZLEdBQUc7QUFDakI7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUFBO0FBQUEsUUFDRixXQUNTLFlBQVksR0FBRztBQUN4QjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQUE7QUFBQSxRQUNGLFdBQ1MsWUFBWSxJQUFJO0FBQ3BCLGVBQUE7QUFBQSxZQUNIO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFBQTtBQUFBLFFBQ0YsV0FDUyxZQUFZLEtBQUs7QUFDckIsZUFBQTtBQUFBLFlBQ0g7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUFBO0FBQUEsUUFDRixXQUNTLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3BELGlCQUFPLHVCQUF1QixNQUFNLElBQUksT0FBTyxJQUFJLEdBQUc7QUFBQSxRQUN4RDtBQUFBLElBQ0o7QUFDSUEsUUFBQUEsUUFBTyxRQUFRLGlCQUFpQjtBQUMzQkEsYUFBQUEsTUFBSyxNQUFNLEdBQUcsS0FBSyxnQkFBZ0IsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUFBLElBQ3pEO0FBQUEsRUFBQTtBQUVGLFFBQU0sY0FBYyxDQUFDLElBQUksSUFBSSxXQUFXLFdBQVc7QUFDakQsUUFBSSxNQUFNLE1BQU07QUFDZDtBQUFBLFFBQ0UsR0FBRyxLQUFLLGVBQWUsR0FBRyxRQUFRO0FBQUEsUUFDbEM7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBQ0YsT0FDSztBQUNDLFlBQUEsS0FBSyxHQUFHLEtBQUssR0FBRztBQUNsQixVQUFBLEdBQUcsYUFBYSxHQUFHLFVBQVU7QUFDbkIsb0JBQUEsSUFBSSxHQUFHLFFBQVE7QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUYsUUFBTSxxQkFBcUIsQ0FBQyxJQUFJLElBQUksV0FBVyxXQUFXO0FBQ3hELFFBQUksTUFBTSxNQUFNO0FBQ2Q7QUFBQSxRQUNFLEdBQUcsS0FBSyxrQkFBa0IsR0FBRyxZQUFZLEVBQUU7QUFBQSxRQUMzQztBQUFBLFFBQ0E7QUFBQSxNQUFBO0FBQUEsSUFDRixPQUNLO0FBQ0wsU0FBRyxLQUFLLEdBQUc7QUFBQSxJQUNiO0FBQUEsRUFBQTtBQUVGLFFBQU0sa0JBQWtCLENBQUMsSUFBSSxXQUFXLFFBQVEsY0FBYztBQUM1RCxLQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sSUFBSTtBQUFBLE1BQ25CLEdBQUc7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLEdBQUc7QUFBQSxNQUNILEdBQUc7QUFBQSxJQUFBO0FBQUEsRUFDTDtBQUVGLFFBQU0sa0JBQWtCLENBQUMsSUFBSSxJQUFJLFdBQVcsY0FBYztBQUNwRCxRQUFBLEdBQUcsYUFBYSxHQUFHLFVBQVU7QUFDekIsWUFBQSxTQUFTLGdCQUFnQixHQUFHLE1BQU07QUFDeEMsdUJBQWlCLEVBQUU7QUFDbkIsT0FBQyxHQUFHLElBQUksR0FBRyxNQUFNLElBQUk7QUFBQSxRQUNuQixHQUFHO0FBQUEsUUFDSDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBQ0YsT0FDSztBQUNMLFNBQUcsS0FBSyxHQUFHO0FBQ1gsU0FBRyxTQUFTLEdBQUc7QUFBQSxJQUNqQjtBQUFBLEVBQUE7QUFFRixRQUFNLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxPQUFPLEdBQUcsV0FBVyxnQkFBZ0I7QUFDN0QsUUFBQTtBQUNHLFdBQUEsTUFBTSxPQUFPLFFBQVE7QUFDMUIsYUFBTyxnQkFBZ0IsRUFBRTtBQUNkLGlCQUFBLElBQUksV0FBVyxXQUFXO0FBQ2hDLFdBQUE7QUFBQSxJQUNQO0FBQ1csZUFBQSxRQUFRLFdBQVcsV0FBVztBQUFBLEVBQUE7QUFFM0MsUUFBTSxtQkFBbUIsQ0FBQyxFQUFFLElBQUksYUFBYTtBQUN2QyxRQUFBO0FBQ0csV0FBQSxNQUFNLE9BQU8sUUFBUTtBQUMxQixhQUFPLGdCQUFnQixFQUFFO0FBQ3pCLGlCQUFXLEVBQUU7QUFDUixXQUFBO0FBQUEsSUFDUDtBQUNBLGVBQVcsTUFBTTtBQUFBLEVBQUE7QUFFYixRQUFBLGlCQUFpQixDQUFDLElBQUksSUFBSSxXQUFXLFFBQVEsaUJBQWlCLGdCQUFnQixXQUFXLGNBQWMsY0FBYztBQUNySCxRQUFBLEdBQUcsU0FBUyxPQUFPO0FBQ1Qsa0JBQUE7QUFBQSxJQUFBLFdBQ0gsR0FBRyxTQUFTLFFBQVE7QUFDakIsa0JBQUE7QUFBQSxJQUNkO0FBQ0EsUUFBSSxNQUFNLE1BQU07QUFDZDtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBQ0YsT0FDSztBQUNMO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQUEsRUFBQTtBQUVJLFFBQUEsZUFBZSxDQUFDLE9BQU8sV0FBVyxRQUFRLGlCQUFpQixnQkFBZ0IsV0FBVyxjQUFjLGNBQWM7QUFDbEgsUUFBQTtBQUNBLFFBQUE7QUFDSixVQUFNLEVBQUUsT0FBTyxXQUFXLFlBQVksU0FBUztBQUMvQyxTQUFLLE1BQU0sS0FBSztBQUFBLE1BQ2QsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBLFNBQVMsTUFBTTtBQUFBLE1BQ2Y7QUFBQSxJQUFBO0FBRUYsUUFBSSxZQUFZLEdBQUc7QUFDRSx5QkFBQSxJQUFJLE1BQU0sUUFBUTtBQUFBLElBQUEsV0FDNUIsWUFBWSxJQUFJO0FBQ3pCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EseUJBQXlCLE9BQU8sU0FBUztBQUFBLFFBQ3pDO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQ0EsUUFBSSxNQUFNO0FBQ1ksMEJBQUEsT0FBTyxNQUFNLGlCQUFpQixTQUFTO0FBQUEsSUFDN0Q7QUFDQSxlQUFXLElBQUksT0FBTyxNQUFNLFNBQVMsY0FBYyxlQUFlO0FBQ2xFLFFBQUksT0FBTztBQUNULGlCQUFXLE9BQU8sT0FBTztBQUN2QixZQUFJLFFBQVEsV0FBVyxDQUFDLGVBQWUsR0FBRyxHQUFHO0FBQzNDLHdCQUFjLElBQUksS0FBSyxNQUFNLE1BQU0sR0FBRyxHQUFHLFdBQVcsZUFBZTtBQUFBLFFBQ3JFO0FBQUEsTUFDRjtBQUNBLFVBQUksV0FBVyxPQUFPO0FBQ3BCLHNCQUFjLElBQUksU0FBUyxNQUFNLE1BQU0sT0FBTyxTQUFTO0FBQUEsTUFDekQ7QUFDSSxVQUFBLFlBQVksTUFBTSxvQkFBb0I7QUFDeEIsd0JBQUEsV0FBVyxpQkFBaUIsS0FBSztBQUFBLE1BQ25EO0FBQUEsSUFDRjtBQUNBLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUF1QjtBQUNsRSxVQUFBLElBQUksV0FBVyxPQUFPLElBQUk7QUFDMUIsVUFBQSxJQUFJLHdCQUF3QixpQkFBaUIsSUFBSTtBQUFBLElBQ3ZEO0FBQ0EsUUFBSSxNQUFNO0FBQ1ksMEJBQUEsT0FBTyxNQUFNLGlCQUFpQixhQUFhO0FBQUEsSUFDakU7QUFDTSxVQUFBLDBCQUEwQixlQUFlLGdCQUFnQixVQUFVO0FBQ3pFLFFBQUkseUJBQXlCO0FBQzNCLGlCQUFXLFlBQVksRUFBRTtBQUFBLElBQzNCO0FBQ1csZUFBQSxJQUFJLFdBQVcsTUFBTTtBQUNoQyxTQUFLLFlBQVksU0FBUyxNQUFNLG1CQUFtQiwyQkFBMkIsTUFBTTtBQUNsRiw0QkFBc0IsTUFBTTtBQUNiLHFCQUFBLGdCQUFnQixXQUFXLGlCQUFpQixLQUFLO0FBQ25DLG1DQUFBLFdBQVcsTUFBTSxFQUFFO0FBQzlDLGdCQUFRLG9CQUFvQixPQUFPLE1BQU0saUJBQWlCLFNBQVM7QUFBQSxTQUNsRSxjQUFjO0FBQUEsSUFDbkI7QUFBQSxFQUFBO0FBRUYsUUFBTSxhQUFhLENBQUMsSUFBSSxPQUFPLFNBQVMsY0FBYyxvQkFBb0I7QUFDeEUsUUFBSSxTQUFTO0FBQ1gscUJBQWUsSUFBSSxPQUFPO0FBQUEsSUFDNUI7QUFDQSxRQUFJLGNBQWM7QUFDaEIsZUFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLFFBQVEsS0FBSztBQUM3Qix1QkFBQSxJQUFJLGFBQWEsQ0FBQyxDQUFDO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQ0EsUUFBSSxpQkFBaUI7QUFDbkIsVUFBSSxVQUFVLGdCQUFnQjtBQUMxQixVQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsUUFBUSxZQUFZLEtBQUssUUFBUSxZQUFZLE1BQU07QUFDeEYsa0JBQUEsaUJBQWlCLFFBQVEsUUFBUSxLQUFLO0FBQUEsTUFDbEQ7QUFDQSxVQUFJLFVBQVUsU0FBUztBQUNyQixjQUFNLGNBQWMsZ0JBQWdCO0FBQ3BDO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxVQUNBLFlBQVk7QUFBQSxVQUNaLFlBQVk7QUFBQSxVQUNaLGdCQUFnQjtBQUFBLFFBQUE7QUFBQSxNQUVwQjtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUksUUFBQSxnQkFBZ0IsQ0FBQyxVQUFVLFdBQVcsUUFBUSxpQkFBaUIsZ0JBQWdCLFdBQVcsY0FBYyxXQUFXLFFBQVEsTUFBTTtBQUNySSxhQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsUUFBUSxLQUFLO0FBQzVDLFlBQU0sUUFBUSxTQUFTLENBQUMsSUFBSSxZQUFZLGVBQWUsU0FBUyxDQUFDLENBQUMsSUFBSSxlQUFlLFNBQVMsQ0FBQyxDQUFDO0FBQ2hHO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFBQSxFQUFBO0FBRUksUUFBQSxlQUFlLENBQUMsSUFBSSxJQUFJLGlCQUFpQixnQkFBZ0IsV0FBVyxjQUFjLGNBQWM7QUFDOUYsVUFBQSxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQ3RCLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUF1QjtBQUN0RSxTQUFHLFVBQVU7QUFBQSxJQUNmO0FBQ0EsUUFBSSxFQUFFLFdBQVcsaUJBQWlCLEtBQUEsSUFBUztBQUMzQyxpQkFBYSxHQUFHLFlBQVk7QUFDdEIsVUFBQSxXQUFXLEdBQUcsU0FBUztBQUN2QixVQUFBLFdBQVcsR0FBRyxTQUFTO0FBQ3pCLFFBQUE7QUFDZSx1QkFBQSxjQUFjLGlCQUFpQixLQUFLO0FBQ25ELFFBQUEsWUFBWSxTQUFTLHFCQUFxQjtBQUM1QixzQkFBQSxXQUFXLGlCQUFpQixJQUFJLEVBQUU7QUFBQSxJQUNwRDtBQUNBLFFBQUksTUFBTTtBQUNZLDBCQUFBLElBQUksSUFBSSxpQkFBaUIsY0FBYztBQUFBLElBQzdEO0FBQ21CLHVCQUFBLGNBQWMsaUJBQWlCLElBQUk7QUFDdEQsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLGVBQWU7QUFDbEQsa0JBQUE7QUFDQSxrQkFBQTtBQUNNLHdCQUFBO0FBQUEsSUFDcEI7QUFDSSxRQUFBLFNBQVMsYUFBYSxTQUFTLGFBQWEsUUFBUSxTQUFTLGVBQWUsU0FBUyxlQUFlLE1BQU07QUFDNUcseUJBQW1CLElBQUksRUFBRTtBQUFBLElBQzNCO0FBQ0EsUUFBSSxpQkFBaUI7QUFDbkI7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNIO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSx5QkFBeUIsSUFBSSxTQUFTO0FBQUEsUUFDdEM7QUFBQSxNQUFBO0FBRUYsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QywrQkFBdUIsSUFBSSxFQUFFO0FBQUEsTUFDL0I7QUFBQSxJQUFBLFdBQ1MsQ0FBQyxXQUFXO0FBQ3JCO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSx5QkFBeUIsSUFBSSxTQUFTO0FBQUEsUUFDdEM7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDQSxRQUFJLFlBQVksR0FBRztBQUNqQixVQUFJLFlBQVksSUFBSTtBQUNsQixtQkFBVyxJQUFJLFVBQVUsVUFBVSxpQkFBaUIsU0FBUztBQUFBLE1BQUEsT0FDeEQ7QUFDTCxZQUFJLFlBQVksR0FBRztBQUNiLGNBQUEsU0FBUyxVQUFVLFNBQVMsT0FBTztBQUNyQywwQkFBYyxJQUFJLFNBQVMsTUFBTSxTQUFTLE9BQU8sU0FBUztBQUFBLFVBQzVEO0FBQUEsUUFDRjtBQUNBLFlBQUksWUFBWSxHQUFHO0FBQ2pCLHdCQUFjLElBQUksU0FBUyxTQUFTLE9BQU8sU0FBUyxPQUFPLFNBQVM7QUFBQSxRQUN0RTtBQUNBLFlBQUksWUFBWSxHQUFHO0FBQ2pCLGdCQUFNLGdCQUFnQixHQUFHO0FBQ3pCLG1CQUFTLElBQUksR0FBRyxJQUFJLGNBQWMsUUFBUSxLQUFLO0FBQ3ZDLGtCQUFBLE1BQU0sY0FBYyxDQUFDO0FBQ3JCLGtCQUFBLE9BQU8sU0FBUyxHQUFHO0FBQ25CLGtCQUFBLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLGdCQUFBLFNBQVMsUUFBUSxRQUFRLFNBQVM7QUFDcEMsNEJBQWMsSUFBSSxLQUFLLE1BQU0sTUFBTSxXQUFXLGVBQWU7QUFBQSxZQUMvRDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLFVBQUksWUFBWSxHQUFHO0FBQ2IsWUFBQSxHQUFHLGFBQWEsR0FBRyxVQUFVO0FBQ1osNkJBQUEsSUFBSSxHQUFHLFFBQVE7QUFBQSxRQUNwQztBQUFBLE1BQ0Y7QUFBQSxJQUNTLFdBQUEsQ0FBQyxhQUFhLG1CQUFtQixNQUFNO0FBQ2hELGlCQUFXLElBQUksVUFBVSxVQUFVLGlCQUFpQixTQUFTO0FBQUEsSUFDL0Q7QUFDSyxTQUFBLFlBQVksU0FBUyxtQkFBbUIsTUFBTTtBQUNqRCw0QkFBc0IsTUFBTTtBQUMxQixxQkFBYSxnQkFBZ0IsV0FBVyxpQkFBaUIsSUFBSSxFQUFFO0FBQy9ELGdCQUFRLG9CQUFvQixJQUFJLElBQUksaUJBQWlCLFNBQVM7QUFBQSxTQUM3RCxjQUFjO0FBQUEsSUFDbkI7QUFBQSxFQUFBO0FBRUksUUFBQSxxQkFBcUIsQ0FBQyxhQUFhLGFBQWEsbUJBQW1CLGlCQUFpQixnQkFBZ0IsV0FBVyxpQkFBaUI7QUFDcEksYUFBUyxJQUFJLEdBQUcsSUFBSSxZQUFZLFFBQVEsS0FBSztBQUNyQyxZQUFBLFdBQVcsWUFBWSxDQUFDO0FBQ3hCLFlBQUEsV0FBVyxZQUFZLENBQUM7QUFDeEIsWUFBQTtBQUFBO0FBQUE7QUFBQSxRQUdKLFNBQVM7QUFBQTtBQUFBLFNBRVIsU0FBUyxTQUFTO0FBQUE7QUFBQSxRQUVuQixDQUFDLGdCQUFnQixVQUFVLFFBQVE7QUFBQSxRQUNuQyxTQUFTLGFBQWEsSUFBSSxPQUFPLGVBQWUsU0FBUyxFQUFFO0FBQUE7QUFBQTtBQUFBLFVBR3pEO0FBQUE7QUFBQTtBQUdKO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFBQSxFQUFBO0FBRUYsUUFBTSxhQUFhLENBQUMsSUFBSSxVQUFVLFVBQVUsaUJBQWlCLGNBQWM7QUFDekUsUUFBSSxhQUFhLFVBQVU7QUFDekIsVUFBSSxhQUFhLFdBQVc7QUFDMUIsbUJBQVcsT0FBTyxVQUFVO0FBQzFCLGNBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxFQUFFLE9BQU8sV0FBVztBQUM5QztBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsY0FDQSxTQUFTLEdBQUc7QUFBQSxjQUNaO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUFBO0FBQUEsVUFFSjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsT0FBTyxVQUFVO0FBQ3RCLFlBQUEsZUFBZSxHQUFHLEVBQUc7QUFDbkIsY0FBQSxPQUFPLFNBQVMsR0FBRztBQUNuQixjQUFBLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLFlBQUEsU0FBUyxRQUFRLFFBQVEsU0FBUztBQUNwQyx3QkFBYyxJQUFJLEtBQUssTUFBTSxNQUFNLFdBQVcsZUFBZTtBQUFBLFFBQy9EO0FBQUEsTUFDRjtBQUNBLFVBQUksV0FBVyxVQUFVO0FBQ3ZCLHNCQUFjLElBQUksU0FBUyxTQUFTLE9BQU8sU0FBUyxPQUFPLFNBQVM7QUFBQSxNQUN0RTtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUksUUFBQSxrQkFBa0IsQ0FBQyxJQUFJLElBQUksV0FBVyxRQUFRLGlCQUFpQixnQkFBZ0IsV0FBVyxjQUFjLGNBQWM7QUFDMUgsVUFBTSxzQkFBc0IsR0FBRyxLQUFLLEtBQUssR0FBRyxLQUFLLGVBQWUsRUFBRTtBQUNsRSxVQUFNLG9CQUFvQixHQUFHLFNBQVMsS0FBSyxHQUFHLFNBQVMsZUFBZSxFQUFFO0FBQ3hFLFFBQUksRUFBRSxXQUFXLGlCQUFpQixjQUFjLHlCQUF5QjtBQUN6RSxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYTtBQUFBLEtBQy9CLGlCQUFpQixZQUFZLE9BQU87QUFDdkIsa0JBQUE7QUFDQSxrQkFBQTtBQUNNLHdCQUFBO0FBQUEsSUFDcEI7QUFDQSxRQUFJLHNCQUFzQjtBQUN4QixxQkFBZSxlQUFlLGFBQWEsT0FBTyxvQkFBb0IsSUFBSTtBQUFBLElBQzVFO0FBQ0EsUUFBSSxNQUFNLE1BQU07QUFDSCxpQkFBQSxxQkFBcUIsV0FBVyxNQUFNO0FBQ3RDLGlCQUFBLG1CQUFtQixXQUFXLE1BQU07QUFDL0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS0UsR0FBRyxZQUFZLENBQUM7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUNGLE9BQ0s7QUFDRCxVQUFBLFlBQVksS0FBSyxZQUFZLE1BQU07QUFBQTtBQUFBLE1BRXZDLEdBQUcsaUJBQWlCO0FBQ2xCO0FBQUEsVUFDRSxHQUFHO0FBQUEsVUFDSDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFBQTtBQUVGLFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsaUNBQXVCLElBQUksRUFBRTtBQUFBLFFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTTdCLEdBQUcsT0FBTyxRQUFRLG1CQUFtQixPQUFPLGdCQUFnQjtBQUFBLFVBQzVEO0FBQ0E7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQTtBQUFBLFVBQUE7QUFBQSxRQUdKO0FBQUEsTUFBQSxPQUNLO0FBQ0w7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBQUEsTUFFSjtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUksUUFBQSxtQkFBbUIsQ0FBQyxJQUFJLElBQUksV0FBVyxRQUFRLGlCQUFpQixnQkFBZ0IsV0FBVyxjQUFjLGNBQWM7QUFDM0gsT0FBRyxlQUFlO0FBQ2xCLFFBQUksTUFBTSxNQUFNO0FBQ1YsVUFBQSxHQUFHLFlBQVksS0FBSztBQUN0Qix3QkFBZ0IsSUFBSTtBQUFBLFVBQ2xCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFBQSxNQUNGLE9BQ0s7QUFDTDtBQUFBLFVBQ0U7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBQUEsTUFFSjtBQUFBLElBQUEsT0FDSztBQUNXLHNCQUFBLElBQUksSUFBSSxTQUFTO0FBQUEsSUFDbkM7QUFBQSxFQUFBO0FBRUksUUFBQSxpQkFBaUIsQ0FBQyxjQUFjLFdBQVcsUUFBUSxpQkFBaUIsZ0JBQWdCLFdBQVcsY0FBYztBQUMzRyxVQUFBLFdBQVksYUFBYSxZQUFZO0FBQUEsTUFDekM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQUE7QUFFRSxRQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsU0FBUyxLQUFLLFNBQVM7QUFDdEUsa0JBQVksUUFBUTtBQUFBLElBQ3RCO0FBQ0EsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyx5QkFBbUIsWUFBWTtBQUMvQixtQkFBYSxVQUFVLE9BQU87QUFBQSxJQUNoQztBQUNJLFFBQUEsWUFBWSxZQUFZLEdBQUc7QUFDN0IsZUFBUyxJQUFJLFdBQVc7QUFBQSxJQUMxQjtBQUNBO0FBQ0UsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxxQkFBYSxVQUFVLE1BQU07QUFBQSxNQUMvQjtBQUNlLHFCQUFBLFVBQVUsT0FBTyxTQUFTO0FBQ3pDLFVBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsbUJBQVcsVUFBVSxNQUFNO0FBQUEsTUFDN0I7QUFBQSxJQUNGO0FBQ0EsUUFBSSxTQUFTLFVBQVU7QUFDckIsd0JBQWtCLGVBQWUsWUFBWSxVQUFVLG1CQUFtQixTQUFTO0FBQy9FLFVBQUEsQ0FBQyxhQUFhLElBQUk7QUFDcEIsY0FBTSxjQUFjLFNBQVMsVUFBVSxZQUFZLE9BQU87QUFDdkMsMkJBQUEsTUFBTSxhQUFhLFdBQVcsTUFBTTtBQUFBLE1BQ3pEO0FBQUEsSUFBQSxPQUNLO0FBQ0w7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDQSxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzNCO0FBQ2xCLGlCQUFXLFVBQVUsT0FBTztBQUFBLElBQzlCO0FBQUEsRUFBQTtBQUVGLFFBQU0sa0JBQWtCLENBQUMsSUFBSSxJQUFJLGNBQWM7QUFDdkMsVUFBQSxXQUFXLEdBQUcsWUFBWSxHQUFHO0FBQ25DLFFBQUksc0JBQXNCLElBQUksSUFBSSxTQUFTLEdBQUc7QUFDNUMsVUFBSSxTQUFTLFlBQVksQ0FBQyxTQUFTLGVBQWU7QUFDaEQsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyw2QkFBbUIsRUFBRTtBQUFBLFFBQ3ZCO0FBQ3lCLGlDQUFBLFVBQVUsSUFBSSxTQUFTO0FBQ2hELFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDM0I7UUFDcEI7QUFDQTtBQUFBLE1BQUEsT0FDSztBQUNMLGlCQUFTLE9BQU87QUFDaEIsc0JBQWMsU0FBUyxNQUFNO0FBQzdCLGlCQUFTLE9BQU8sUUFBUTtBQUN4QixpQkFBUyxPQUFPO0FBQUEsTUFDbEI7QUFBQSxJQUFBLE9BQ0s7QUFDTCxTQUFHLEtBQUssR0FBRztBQUNYLGVBQVMsUUFBUTtBQUFBLElBQ25CO0FBQUEsRUFBQTtBQUVJLFFBQUEsb0JBQW9CLENBQUMsVUFBVSxjQUFjLFdBQVcsUUFBUSxnQkFBZ0IsV0FBVyxjQUFjO0FBQzdHLFVBQU0sb0JBQW9CLE1BQU07QUFDMUIsVUFBQSxDQUFDLFNBQVMsV0FBVztBQUNuQixZQUFBO0FBQ0UsY0FBQSxFQUFFLElBQUksTUFBVSxJQUFBO0FBQ3RCLGNBQU0sRUFBRSxJQUFJLEdBQUcsT0FBQSxJQUFXO0FBQ3BCLGNBQUEsc0JBQXNCLGVBQWUsWUFBWTtBQUN2RCxzQkFBYyxVQUFVLEtBQUs7QUFDN0IsWUFBSSxJQUFJO0FBQ04seUJBQWUsRUFBRTtBQUFBLFFBQ25CO0FBQ0EsWUFBSSxDQUFDLHdCQUF3QixZQUFZLFNBQVMsTUFBTSxxQkFBcUI7QUFDM0QsMEJBQUEsV0FBVyxRQUFRLFlBQVk7QUFBQSxRQUNqRDtBQUNBLHNCQUFjLFVBQVUsSUFBSTtBQUM1QixZQUFJLE1BQU0sYUFBYTtBQUNyQixnQkFBTSxpQkFBaUIsTUFBTTtBQUMzQixnQkFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QywyQkFBYSxVQUFVLFFBQVE7QUFBQSxZQUNqQztBQUNTLHFCQUFBLFVBQVUsb0JBQW9CLFFBQVE7QUFDL0MsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MseUJBQVcsVUFBVSxRQUFRO0FBQUEsWUFDL0I7QUFDQSxnQkFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QywyQkFBYSxVQUFVLFNBQVM7QUFBQSxZQUNsQztBQUNBO0FBQUEsY0FDRTtBQUFBLGNBQ0EsU0FBUztBQUFBLGNBQ1Q7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQUE7QUFFRixnQkFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyx5QkFBVyxVQUFVLFNBQVM7QUFBQSxZQUNoQztBQUFBLFVBQUE7QUFFRixjQUFJLHFCQUFxQjtBQUNWLHlCQUFBLEtBQUssZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUtoQyxNQUFNLENBQUMsU0FBUyxlQUFlLGVBQWU7QUFBQSxZQUFBO0FBQUEsVUFDaEQsT0FDSztBQUNVO1VBQ2pCO0FBQUEsUUFBQSxPQUNLO0FBQ0wsY0FBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyx5QkFBYSxVQUFVLFFBQVE7QUFBQSxVQUNqQztBQUNBLGdCQUFNLFVBQVUsU0FBUyxVQUFVLG9CQUFvQixRQUFRO0FBQy9ELGNBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsdUJBQVcsVUFBVSxRQUFRO0FBQUEsVUFDL0I7QUFDQSxjQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLHlCQUFhLFVBQVUsT0FBTztBQUFBLFVBQ2hDO0FBQ0E7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFBQTtBQUVGLGNBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsdUJBQVcsVUFBVSxPQUFPO0FBQUEsVUFDOUI7QUFDQSx1QkFBYSxLQUFLLFFBQVE7QUFBQSxRQUM1QjtBQUNBLFlBQUksR0FBRztBQUNMLGdDQUFzQixHQUFHLGNBQWM7QUFBQSxRQUN6QztBQUNBLFlBQUksQ0FBQyx3QkFBd0IsWUFBWSxTQUFTLE1BQU0saUJBQWlCO0FBQ3ZFLGdCQUFNLHFCQUFxQjtBQUMzQjtBQUFBLFlBQ0UsTUFBTSxnQkFBZ0IsV0FBVyxRQUFRLGtCQUFrQjtBQUFBLFlBQzNEO0FBQUEsVUFBQTtBQUFBLFFBRUo7QUFDSSxZQUFBLGFBQWEsWUFBWSxPQUFPLFVBQVUsZUFBZSxPQUFPLEtBQUssS0FBSyxPQUFPLE1BQU0sWUFBWSxLQUFLO0FBQzFHLG1CQUFTLEtBQUssc0JBQXNCLFNBQVMsR0FBRyxjQUFjO0FBQUEsUUFDaEU7QUFDQSxpQkFBUyxZQUFZO0FBQ3JCLFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUF1QjtBQUN0RSxpQ0FBdUIsUUFBUTtBQUFBLFFBQ2pDO0FBQ0EsdUJBQWUsWUFBWSxTQUFTO0FBQUEsTUFBQSxPQUMvQjtBQUNMLFlBQUksRUFBRSxNQUFNLElBQUksR0FBRyxRQUFRLE1BQVUsSUFBQTtBQUNyQztBQUNRLGdCQUFBLHVCQUF1QiwyQkFBMkIsUUFBUTtBQUNoRSxjQUFJLHNCQUFzQjtBQUN4QixnQkFBSSxNQUFNO0FBQ1IsbUJBQUssS0FBSyxNQUFNO0FBQ1MsdUNBQUEsVUFBVSxNQUFNLFNBQVM7QUFBQSxZQUNwRDtBQUNxQixpQ0FBQSxTQUFTLEtBQUssTUFBTTtBQUNuQyxrQkFBQSxDQUFDLFNBQVMsYUFBYTtBQUNQO2NBQ3BCO0FBQUEsWUFBQSxDQUNEO0FBQ0Q7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLFlBQUksYUFBYTtBQUNiLFlBQUE7QUFDSixZQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzFCLDZCQUFBLFFBQVEsU0FBUyxLQUFLO0FBQUEsUUFDM0M7QUFDQSxzQkFBYyxVQUFVLEtBQUs7QUFDN0IsWUFBSSxNQUFNO0FBQ1IsZUFBSyxLQUFLLE1BQU07QUFDUyxtQ0FBQSxVQUFVLE1BQU0sU0FBUztBQUFBLFFBQUEsT0FDN0M7QUFDRSxpQkFBQTtBQUFBLFFBQ1Q7QUFDQSxZQUFJLElBQUk7QUFDTix5QkFBZSxFQUFFO0FBQUEsUUFDbkI7QUFDQSxZQUFJLFlBQVksS0FBSyxTQUFTLEtBQUssTUFBTSxxQkFBcUI7QUFDNUMsMEJBQUEsV0FBVyxRQUFRLE1BQU0sS0FBSztBQUFBLFFBQ2hEO0FBQ0Esc0JBQWMsVUFBVSxJQUFJO0FBQzVCLFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsdUJBQWEsVUFBVSxRQUFRO0FBQUEsUUFDakM7QUFDTSxjQUFBLFdBQVcsb0JBQW9CLFFBQVE7QUFDN0MsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxxQkFBVyxVQUFVLFFBQVE7QUFBQSxRQUMvQjtBQUNBLGNBQU0sV0FBVyxTQUFTO0FBQzFCLGlCQUFTLFVBQVU7QUFDbkIsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyx1QkFBYSxVQUFVLE9BQU87QUFBQSxRQUNoQztBQUNBO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQTtBQUFBLFVBRUEsZUFBZSxTQUFTLEVBQUU7QUFBQTtBQUFBLFVBRTFCLGdCQUFnQixRQUFRO0FBQUEsVUFDeEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFFRixZQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLHFCQUFXLFVBQVUsT0FBTztBQUFBLFFBQzlCO0FBQ0EsYUFBSyxLQUFLLFNBQVM7QUFDbkIsWUFBSSxlQUFlLE1BQU07QUFDUCwwQkFBQSxVQUFVLFNBQVMsRUFBRTtBQUFBLFFBQ3ZDO0FBQ0EsWUFBSSxHQUFHO0FBQ0wsZ0NBQXNCLEdBQUcsY0FBYztBQUFBLFFBQ3pDO0FBQ0EsWUFBSSxZQUFZLEtBQUssU0FBUyxLQUFLLE1BQU0sZ0JBQWdCO0FBQ3ZEO0FBQUEsWUFDRSxNQUFNLGdCQUFnQixXQUFXLFFBQVEsTUFBTSxLQUFLO0FBQUEsWUFDcEQ7QUFBQSxVQUFBO0FBQUEsUUFFSjtBQUNBLFlBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUF1QjtBQUN0RSxtQ0FBeUIsUUFBUTtBQUFBLFFBQ25DO0FBQ0EsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUMzQjtRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUFBO0FBRUlDLFVBQUFBLFVBQVMsU0FBUyxTQUFTLElBQUk7QUFBQSxNQUNuQztBQUFBLE1BQ0E7QUFBQSxNQUNBLE1BQU0sU0FBUyxNQUFNO0FBQUEsTUFDckIsU0FBUztBQUFBO0FBQUEsSUFBQTtBQUdMLFVBQUEsU0FBUyxTQUFTLFNBQVMsTUFBTTtBQUNyQyxVQUFJQSxRQUFPLE9BQU87QUFDaEJBLGdCQUFPLElBQUk7QUFBQSxNQUNiO0FBQUEsSUFBQTtBQUVGLFdBQU8sSUFBSTtBQUNYLFdBQU8sS0FBSyxTQUFTO0FBQ3JCLGtCQUFjLFVBQVUsSUFBSTtBQUM1QixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDQSxjQUFPLFVBQVUsU0FBUyxNQUFNLENBQUMsTUFBTSxlQUFlLFNBQVMsS0FBSyxDQUFDLElBQUk7QUFDekVBLGNBQU8sWUFBWSxTQUFTLE1BQU0sQ0FBQyxNQUFNLGVBQWUsU0FBUyxLQUFLLENBQUMsSUFBSTtBQUFBLElBQzdFO0FBQ087RUFBQTtBQUVULFFBQU0sMkJBQTJCLENBQUMsVUFBVSxXQUFXLGNBQWM7QUFDbkUsY0FBVSxZQUFZO0FBQ2hCLFVBQUEsWUFBWSxTQUFTLE1BQU07QUFDakMsYUFBUyxRQUFRO0FBQ2pCLGFBQVMsT0FBTztBQUNoQixnQkFBWSxVQUFVLFVBQVUsT0FBTyxXQUFXLFNBQVM7QUFDL0MsZ0JBQUEsVUFBVSxVQUFVLFVBQVUsU0FBUztBQUNyQztBQUNkLHFCQUFpQixRQUFRO0FBQ1g7RUFBQTtBQUVWLFFBQUEsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLFdBQVcsUUFBUSxpQkFBaUIsZ0JBQWdCLFdBQVcsY0FBYyxZQUFZLFVBQVU7QUFDMUgsVUFBQSxLQUFLLE1BQU0sR0FBRztBQUNkLFVBQUEsZ0JBQWdCLEtBQUssR0FBRyxZQUFZO0FBQzFDLFVBQU0sS0FBSyxHQUFHO0FBQ1IsVUFBQSxFQUFFLFdBQVcsVUFBYyxJQUFBO0FBQ2pDLFFBQUksWUFBWSxHQUFHO0FBQ2pCLFVBQUksWUFBWSxLQUFLO0FBQ25CO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFBQTtBQUVGO0FBQUEsTUFBQSxXQUNTLFlBQVksS0FBSztBQUMxQjtBQUFBLFVBQ0U7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFFRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsUUFBSSxZQUFZLEdBQUc7QUFDakIsVUFBSSxnQkFBZ0IsSUFBSTtBQUNOLHdCQUFBLElBQUksaUJBQWlCLGNBQWM7QUFBQSxNQUNyRDtBQUNBLFVBQUksT0FBTyxJQUFJO0FBQ2IsMkJBQW1CLFdBQVcsRUFBRTtBQUFBLE1BQ2xDO0FBQUEsSUFBQSxPQUNLO0FBQ0wsVUFBSSxnQkFBZ0IsSUFBSTtBQUN0QixZQUFJLFlBQVksSUFBSTtBQUNsQjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQUE7QUFBQSxRQUNGLE9BQ0s7QUFDVywwQkFBQSxJQUFJLGlCQUFpQixnQkFBZ0IsSUFBSTtBQUFBLFFBQzNEO0FBQUEsTUFBQSxPQUNLO0FBQ0wsWUFBSSxnQkFBZ0IsR0FBRztBQUNyQiw2QkFBbUIsV0FBVyxFQUFFO0FBQUEsUUFDbEM7QUFDQSxZQUFJLFlBQVksSUFBSTtBQUNsQjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFBQTtBQUFBLFFBRUo7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQUE7QUFFSSxRQUFBLHVCQUF1QixDQUFDLElBQUksSUFBSSxXQUFXLFFBQVEsaUJBQWlCLGdCQUFnQixXQUFXLGNBQWMsY0FBYztBQUMvSCxTQUFLLE1BQU07QUFDWCxTQUFLLE1BQU07QUFDWCxVQUFNLFlBQVksR0FBRztBQUNyQixVQUFNLFlBQVksR0FBRztBQUNyQixVQUFNLGVBQWUsS0FBSyxJQUFJLFdBQVcsU0FBUztBQUM5QyxRQUFBO0FBQ0osU0FBSyxJQUFJLEdBQUcsSUFBSSxjQUFjLEtBQUs7QUFDakMsWUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDbEY7QUFBQSxRQUNFLEdBQUcsQ0FBQztBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDQSxRQUFJLFlBQVksV0FBVztBQUN6QjtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUNGLE9BQ0s7QUFDTDtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQUEsRUFBQTtBQUVJLFFBQUEscUJBQXFCLENBQUMsSUFBSSxJQUFJLFdBQVcsY0FBYyxpQkFBaUIsZ0JBQWdCLFdBQVcsY0FBYyxjQUFjO0FBQ25JLFFBQUksSUFBSTtBQUNSLFVBQU0sS0FBSyxHQUFHO0FBQ1YsUUFBQSxLQUFLLEdBQUcsU0FBUztBQUNyQixRQUFJLEtBQUssS0FBSztBQUNQLFdBQUEsS0FBSyxNQUFNLEtBQUssSUFBSTtBQUNuQixZQUFBLEtBQUssR0FBRyxDQUFDO0FBQ2YsWUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLFlBQVksZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDdkUsVUFBQSxnQkFBZ0IsSUFBSSxFQUFFLEdBQUc7QUFDM0I7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBQUEsTUFDRixPQUNLO0FBQ0w7QUFBQSxNQUNGO0FBQ0E7QUFBQSxJQUNGO0FBQ08sV0FBQSxLQUFLLE1BQU0sS0FBSyxJQUFJO0FBQ25CLFlBQUEsS0FBSyxHQUFHLEVBQUU7QUFDaEIsWUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLFlBQVksZUFBZSxHQUFHLEVBQUUsQ0FBQyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDMUUsVUFBQSxnQkFBZ0IsSUFBSSxFQUFFLEdBQUc7QUFDM0I7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBQUEsTUFDRixPQUNLO0FBQ0w7QUFBQSxNQUNGO0FBQ0E7QUFDQTtBQUFBLElBQ0Y7QUFDQSxRQUFJLElBQUksSUFBSTtBQUNWLFVBQUksS0FBSyxJQUFJO0FBQ1gsY0FBTSxVQUFVLEtBQUs7QUFDckIsY0FBTSxTQUFTLFVBQVUsS0FBSyxHQUFHLE9BQU8sRUFBRSxLQUFLO0FBQy9DLGVBQU8sS0FBSyxJQUFJO0FBQ2Q7QUFBQSxZQUNFO0FBQUEsWUFDQSxHQUFHLENBQUMsSUFBSSxZQUFZLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBQUEsWUFDaEU7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUFBO0FBRUY7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQUEsV0FDUyxJQUFJLElBQUk7QUFDakIsYUFBTyxLQUFLLElBQUk7QUFDZCxnQkFBUSxHQUFHLENBQUMsR0FBRyxpQkFBaUIsZ0JBQWdCLElBQUk7QUFDcEQ7QUFBQSxNQUNGO0FBQUEsSUFBQSxPQUNLO0FBQ0wsWUFBTSxLQUFLO0FBQ1gsWUFBTSxLQUFLO0FBQ0wsWUFBQSx1Q0FBdUM7QUFDN0MsV0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUs7QUFDekIsY0FBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDOUUsWUFBQSxVQUFVLE9BQU8sTUFBTTtBQUNyQixjQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsaUJBQWlCLElBQUksVUFBVSxHQUFHLEdBQUc7QUFDcEY7QUFBQSxjQUNFO0FBQUEsY0FDQSxLQUFLLFVBQVUsVUFBVSxHQUFHO0FBQUEsY0FDNUI7QUFBQSxZQUFBO0FBQUEsVUFFSjtBQUNpQiwyQkFBQSxJQUFJLFVBQVUsS0FBSyxDQUFDO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQ0ksVUFBQTtBQUNKLFVBQUksVUFBVTtBQUNSLFlBQUEsY0FBYyxLQUFLLEtBQUs7QUFDOUIsVUFBSSxRQUFRO0FBQ1osVUFBSSxtQkFBbUI7QUFDakIsWUFBQSx3QkFBd0IsSUFBSSxNQUFNLFdBQVc7QUFDbkQsV0FBSyxJQUFJLEdBQUcsSUFBSSxhQUFhLElBQUssdUJBQXNCLENBQUMsSUFBSTtBQUM3RCxXQUFLLElBQUksSUFBSSxLQUFLLElBQUksS0FBSztBQUNuQixjQUFBLFlBQVksR0FBRyxDQUFDO0FBQ3RCLFlBQUksV0FBVyxhQUFhO0FBQ2xCLGtCQUFBLFdBQVcsaUJBQWlCLGdCQUFnQixJQUFJO0FBQ3hEO0FBQUEsUUFDRjtBQUNJLFlBQUE7QUFDQSxZQUFBLFVBQVUsT0FBTyxNQUFNO0FBQ2QscUJBQUEsaUJBQWlCLElBQUksVUFBVSxHQUFHO0FBQUEsUUFBQSxPQUN4QztBQUNMLGVBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLO0FBQ3JCLGdCQUFBLHNCQUFzQixJQUFJLEVBQUUsTUFBTSxLQUFLLGdCQUFnQixXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUc7QUFDakUseUJBQUE7QUFDWDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLFlBQUksYUFBYSxRQUFRO0FBQ2Ysa0JBQUEsV0FBVyxpQkFBaUIsZ0JBQWdCLElBQUk7QUFBQSxRQUFBLE9BQ25EO0FBQ2lCLGdDQUFBLFdBQVcsRUFBRSxJQUFJLElBQUk7QUFDM0MsY0FBSSxZQUFZLGtCQUFrQjtBQUNiLCtCQUFBO0FBQUEsVUFBQSxPQUNkO0FBQ0csb0JBQUE7QUFBQSxVQUNWO0FBQ0E7QUFBQSxZQUNFO0FBQUEsWUFDQSxHQUFHLFFBQVE7QUFBQSxZQUNYO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFBQTtBQUVGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLDZCQUE2QixRQUFRLFlBQVkscUJBQXFCLElBQUk7QUFDaEYsVUFBSSwyQkFBMkIsU0FBUztBQUN4QyxXQUFLLElBQUksY0FBYyxHQUFHLEtBQUssR0FBRyxLQUFLO0FBQ3JDLGNBQU0sWUFBWSxLQUFLO0FBQ2pCLGNBQUEsWUFBWSxHQUFHLFNBQVM7QUFDeEIsY0FBQSxTQUFTLFlBQVksSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLEVBQUUsS0FBSztBQUN2RCxZQUFBLHNCQUFzQixDQUFDLE1BQU0sR0FBRztBQUNsQztBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQUE7QUFBQSxtQkFFTyxPQUFPO0FBQ2hCLGNBQUksSUFBSSxLQUFLLE1BQU0sMkJBQTJCLENBQUMsR0FBRztBQUMzQyxpQkFBQSxXQUFXLFdBQVcsUUFBUSxDQUFDO0FBQUEsVUFBQSxPQUMvQjtBQUNMO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQUE7QUFFRixRQUFNLE9BQU8sQ0FBQyxPQUFPLFdBQVcsUUFBUSxVQUFVLGlCQUFpQixTQUFTO0FBQzFFLFVBQU0sRUFBRSxJQUFJLE1BQU0sWUFBWSxVQUFVLFVBQWMsSUFBQTtBQUN0RCxRQUFJLFlBQVksR0FBRztBQUNqQixXQUFLLE1BQU0sVUFBVSxTQUFTLFdBQVcsUUFBUSxRQUFRO0FBQ3pEO0FBQUEsSUFDRjtBQUNBLFFBQUksWUFBWSxLQUFLO0FBQ25CLFlBQU0sU0FBUyxLQUFLLFdBQVcsUUFBUSxRQUFRO0FBQy9DO0FBQUEsSUFDRjtBQUNBLFFBQUksWUFBWSxJQUFJO0FBQ2xCLFdBQUssS0FBSyxPQUFPLFdBQVcsUUFBUSxTQUFTO0FBQzdDO0FBQUEsSUFDRjtBQUNBLFFBQUksU0FBUyxVQUFVO0FBQ1YsaUJBQUEsSUFBSSxXQUFXLE1BQU07QUFDaEMsZUFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSztBQUN4QyxhQUFLLFNBQVMsQ0FBQyxHQUFHLFdBQVcsUUFBUSxRQUFRO0FBQUEsTUFDL0M7QUFDVyxpQkFBQSxNQUFNLFFBQVEsV0FBVyxNQUFNO0FBQzFDO0FBQUEsSUFDRjtBQUNBLFFBQUksU0FBUyxRQUFRO0FBQ0oscUJBQUEsT0FBTyxXQUFXLE1BQU07QUFDdkM7QUFBQSxJQUNGO0FBQ0EsVUFBTSxrQkFBa0IsYUFBYSxLQUFLLFlBQVksS0FBSztBQUMzRCxRQUFJLGlCQUFpQjtBQUNuQixVQUFJLGFBQWEsR0FBRztBQUNsQixtQkFBVyxZQUFZLEVBQUU7QUFDZCxtQkFBQSxJQUFJLFdBQVcsTUFBTTtBQUNoQyw4QkFBc0IsTUFBTSxXQUFXLE1BQU0sRUFBRSxHQUFHLGNBQWM7QUFBQSxNQUFBLE9BQzNEO0FBQ0wsY0FBTSxFQUFFLE9BQU8sWUFBWSxXQUFBLElBQWU7QUFDMUMsY0FBTUMsV0FBVSxNQUFNLFdBQVcsSUFBSSxXQUFXLE1BQU07QUFDdEQsY0FBTSxlQUFlLE1BQU07QUFDekIsZ0JBQU0sSUFBSSxNQUFNO0FBQ2RBO0FBQ0EsMEJBQWMsV0FBVztBQUFBLFVBQUEsQ0FDMUI7QUFBQSxRQUFBO0FBRUgsWUFBSSxZQUFZO0FBQ0gscUJBQUEsSUFBSUEsVUFBUyxZQUFZO0FBQUEsUUFBQSxPQUMvQjtBQUNRO1FBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFBQSxPQUNLO0FBQ00saUJBQUEsSUFBSSxXQUFXLE1BQU07QUFBQSxJQUNsQztBQUFBLEVBQUE7QUFFSSxRQUFBLFVBQVUsQ0FBQyxPQUFPLGlCQUFpQixnQkFBZ0IsV0FBVyxPQUFPLFlBQVksVUFBVTtBQUN6RixVQUFBO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBLEtBQUFGO0FBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0UsSUFBQTtBQUNKLFFBQUksY0FBYyxJQUFJO0FBQ1Isa0JBQUE7QUFBQSxJQUNkO0FBQ0EsUUFBSUEsUUFBTyxNQUFNO0FBQ2YsYUFBT0EsTUFBSyxNQUFNLGdCQUFnQixPQUFPLElBQUk7QUFBQSxJQUMvQztBQUNBLFFBQUksY0FBYyxNQUFNO0FBQ04sc0JBQUEsWUFBWSxVQUFVLElBQUk7QUFBQSxJQUM1QztBQUNBLFFBQUksWUFBWSxLQUFLO0FBQ0gsc0JBQUEsSUFBSSxXQUFXLEtBQUs7QUFDcEM7QUFBQSxJQUNGO0FBQ00sVUFBQSxtQkFBbUIsWUFBWSxLQUFLO0FBQ3BDLFVBQUEsd0JBQXdCLENBQUMsZUFBZSxLQUFLO0FBQy9DLFFBQUE7QUFDSixRQUFJLDBCQUEwQixZQUFZLFNBQVMsTUFBTSx1QkFBdUI7QUFDOUQsc0JBQUEsV0FBVyxpQkFBaUIsS0FBSztBQUFBLElBQ25EO0FBQ0EsUUFBSSxZQUFZLEdBQUc7QUFDQSx1QkFBQSxNQUFNLFdBQVcsZ0JBQWdCLFFBQVE7QUFBQSxJQUFBLE9BQ3JEO0FBQ0wsVUFBSSxZQUFZLEtBQUs7QUFDYixjQUFBLFNBQVMsUUFBUSxnQkFBZ0IsUUFBUTtBQUMvQztBQUFBLE1BQ0Y7QUFDQSxVQUFJLGtCQUFrQjtBQUNBLDRCQUFBLE9BQU8sTUFBTSxpQkFBaUIsZUFBZTtBQUFBLE1BQ25FO0FBQ0EsVUFBSSxZQUFZLElBQUk7QUFDbEIsY0FBTSxLQUFLO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUFBO0FBQUEsTUFFTyxXQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtYLENBQUMsZ0JBQWdCO0FBQUEsT0FDaEIsU0FBUyxZQUFZLFlBQVksS0FBSyxZQUFZLEtBQUs7QUFDdEQ7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFBQSxNQUNGLFdBQ1MsU0FBUyxZQUFZLGFBQWEsTUFBTSxRQUFRLENBQUMsYUFBYSxZQUFZLElBQUk7QUFDdkUsd0JBQUEsVUFBVSxpQkFBaUIsY0FBYztBQUFBLE1BQzNEO0FBQ0EsVUFBSSxVQUFVO0FBQ1pHLGdCQUFPLEtBQUs7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUNBLFFBQUksMEJBQTBCLFlBQVksU0FBUyxNQUFNLHFCQUFxQixrQkFBa0I7QUFDOUYsNEJBQXNCLE1BQU07QUFDYixxQkFBQSxnQkFBZ0IsV0FBVyxpQkFBaUIsS0FBSztBQUM5RCw0QkFBb0Isb0JBQW9CLE9BQU8sTUFBTSxpQkFBaUIsV0FBVztBQUFBLFNBQ2hGLGNBQWM7QUFBQSxJQUNuQjtBQUFBLEVBQUE7QUFFSUEsUUFBQUEsVUFBUyxDQUFDLFVBQVU7QUFDeEIsVUFBTSxFQUFFLE1BQU0sSUFBSSxRQUFRLGVBQWU7QUFDekMsUUFBSSxTQUFTLFVBQVU7QUFDckIsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLE1BQU0sWUFBWSxLQUFLLE1BQU0sWUFBWSxRQUFRLGNBQWMsQ0FBQyxXQUFXLFdBQVc7QUFDL0gsY0FBQSxTQUFTLFFBQVEsQ0FBQyxVQUFVO0FBQzVCLGNBQUEsTUFBTSxTQUFTLFNBQVM7QUFDMUIsdUJBQVcsTUFBTSxFQUFFO0FBQUEsVUFBQSxPQUNkO0FBQ0xBLG9CQUFPLEtBQUs7QUFBQSxVQUNkO0FBQUEsUUFBQSxDQUNEO0FBQUEsTUFBQSxPQUNJO0FBQ0wsdUJBQWUsSUFBSSxNQUFNO0FBQUEsTUFDM0I7QUFDQTtBQUFBLElBQ0Y7QUFDQSxRQUFJLFNBQVMsUUFBUTtBQUNuQix1QkFBaUIsS0FBSztBQUN0QjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGdCQUFnQixNQUFNO0FBQzFCLGlCQUFXLEVBQUU7QUFDYixVQUFJLGNBQWMsQ0FBQyxXQUFXLGFBQWEsV0FBVyxZQUFZO0FBQ2hFLG1CQUFXLFdBQVc7QUFBQSxNQUN4QjtBQUFBLElBQUE7QUFFRixRQUFJLE1BQU0sWUFBWSxLQUFLLGNBQWMsQ0FBQyxXQUFXLFdBQVc7QUFDeEQsWUFBQSxFQUFFLE9BQU8sV0FBZSxJQUFBO0FBQzlCLFlBQU0sZUFBZSxNQUFNLE1BQU0sSUFBSSxhQUFhO0FBQ2xELFVBQUksWUFBWTtBQUNILG1CQUFBLE1BQU0sSUFBSSxlQUFlLFlBQVk7QUFBQSxNQUFBLE9BQzNDO0FBQ1E7TUFDZjtBQUFBLElBQUEsT0FDSztBQUNTO0lBQ2hCO0FBQUEsRUFBQTtBQUVJLFFBQUEsaUJBQWlCLENBQUMsS0FBSyxRQUFRO0FBQy9CLFFBQUE7QUFDSixXQUFPLFFBQVEsS0FBSztBQUNsQixhQUFPLGdCQUFnQixHQUFHO0FBQzFCLGlCQUFXLEdBQUc7QUFDUixZQUFBO0FBQUEsSUFDUjtBQUNBLGVBQVcsR0FBRztBQUFBLEVBQUE7QUFFaEIsUUFBTSxtQkFBbUIsQ0FBQyxVQUFVLGdCQUFnQixhQUFhO0FBQzNELFFBQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixTQUFTLEtBQUssU0FBUztBQUN0RSxvQkFBYyxRQUFRO0FBQUEsSUFDeEI7QUFDTSxVQUFBLEVBQUUsS0FBSyxPQUFPLFFBQVEsU0FBUyxJQUFJLEdBQUcsRUFBTSxJQUFBO0FBQ2xELG9CQUFnQixDQUFDO0FBQ2pCLG9CQUFnQixDQUFDO0FBQ2pCLFFBQUksS0FBSztBQUNQLHFCQUFlLEdBQUc7QUFBQSxJQUNwQjtBQUNBLFVBQU0sS0FBSztBQUNYLFFBQUksUUFBUTtBQUNWLGFBQU8sU0FBUztBQUNSLGNBQUEsU0FBUyxVQUFVLGdCQUFnQixRQUFRO0FBQUEsSUFDckQ7QUFDQSxRQUFJLElBQUk7QUFDTiw0QkFBc0IsSUFBSSxjQUFjO0FBQUEsSUFDMUM7QUFDQSwwQkFBc0IsTUFBTTtBQUMxQixlQUFTLGNBQWM7QUFBQSxPQUN0QixjQUFjO0FBQ2pCLFFBQUksa0JBQWtCLGVBQWUsaUJBQWlCLENBQUMsZUFBZSxlQUFlLFNBQVMsWUFBWSxDQUFDLFNBQVMsaUJBQWlCLFNBQVMsZUFBZSxlQUFlLFdBQVc7QUFDdEsscUJBQUE7QUFDWCxVQUFBLGVBQWUsU0FBUyxHQUFHO0FBQzdCLHVCQUFlLFFBQVE7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBdUI7QUFDdEUsK0JBQXlCLFFBQVE7QUFBQSxJQUNuQztBQUFBLEVBQUE7QUFFSSxRQUFBLGtCQUFrQixDQUFDLFVBQVUsaUJBQWlCLGdCQUFnQixXQUFXLE9BQU8sWUFBWSxPQUFPLFFBQVEsTUFBTTtBQUNySCxhQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsUUFBUSxLQUFLO0FBQzVDLGNBQVEsU0FBUyxDQUFDLEdBQUcsaUJBQWlCLGdCQUFnQixVQUFVLFNBQVM7QUFBQSxJQUMzRTtBQUFBLEVBQUE7QUFFSSxRQUFBLGtCQUFrQixDQUFDLFVBQVU7QUFDN0IsUUFBQSxNQUFNLFlBQVksR0FBRztBQUNoQixhQUFBLGdCQUFnQixNQUFNLFVBQVUsT0FBTztBQUFBLElBQ2hEO0FBQ0ksUUFBQSxNQUFNLFlBQVksS0FBSztBQUNsQixhQUFBLE1BQU0sU0FBUztJQUN4QjtBQUNBLFVBQU0sS0FBSyxnQkFBZ0IsTUFBTSxVQUFVLE1BQU0sRUFBRTtBQUM3QyxVQUFBLGNBQWMsTUFBTSxHQUFHLGNBQWM7QUFDcEMsV0FBQSxjQUFjLGdCQUFnQixXQUFXLElBQUk7QUFBQSxFQUFBO0FBRXRELE1BQUlDLGNBQWE7QUFDakIsUUFBTSxTQUFTLENBQUMsT0FBTyxXQUFXLGNBQWM7QUFDOUMsUUFBSSxTQUFTLE1BQU07QUFDakIsVUFBSSxVQUFVLFFBQVE7QUFDcEIsZ0JBQVEsVUFBVSxRQUFRLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFDNUM7QUFBQSxJQUFBLE9BQ0s7QUFDTDtBQUFBLFFBQ0UsVUFBVSxVQUFVO0FBQUEsUUFDcEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQ0EsY0FBVSxTQUFTO0FBQ25CLFFBQUksQ0FBQ0EsYUFBWTtBQUNmQSxvQkFBYTtBQUNJO0FBQ0M7QUFDbEJBLG9CQUFhO0FBQUEsSUFDZjtBQUFBLEVBQUE7QUFFRixRQUFNLFlBQVk7QUFBQSxJQUNoQixHQUFHO0FBQUEsSUFDSCxJQUFJO0FBQUEsSUFDSixHQUFHO0FBQUEsSUFDSCxHQUFHRDtBQUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxFQUFBO0FBRUQsTUFBQTtBQUNBLE1BQUE7QUFNRyxTQUFBO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVcsYUFBYSxRQUFRLE9BQU87QUFBQSxFQUFBO0FBRTNDO0FBQ0EsU0FBUyx5QkFBeUIsRUFBRSxNQUFNLE1BQUEsR0FBUyxrQkFBa0I7QUFDbkUsU0FBTyxxQkFBcUIsU0FBUyxTQUFTLG1CQUFtQixxQkFBcUIsWUFBWSxTQUFTLG9CQUFvQixTQUFTLE1BQU0sWUFBWSxNQUFNLFNBQVMsU0FBUyxNQUFNLElBQUksU0FBUztBQUN2TTtBQUNBLFNBQVMsY0FBYyxFQUFFLFFBQUFGLFNBQVEsT0FBQSxHQUFVLFNBQVM7QUFDbERBLFVBQU8sZUFBZSxPQUFPLGVBQWU7QUFDOUM7QUFDQSxTQUFTLGVBQWUsZ0JBQWdCLFlBQVk7QUFDMUMsVUFBQSxDQUFDLGtCQUFrQixrQkFBa0IsQ0FBQyxlQUFlLGtCQUFrQixjQUFjLENBQUMsV0FBVztBQUMzRztBQUNBLFNBQVMsdUJBQXVCLElBQUksSUFBSSxVQUFVLE9BQU87QUFDdkQsUUFBTSxNQUFNLEdBQUc7QUFDZixRQUFNLE1BQU0sR0FBRztBQUNmLE1BQUksUUFBUSxHQUFHLEtBQUssUUFBUSxHQUFHLEdBQUc7QUFDaEMsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSztBQUM3QixZQUFBLEtBQUssSUFBSSxDQUFDO0FBQ1osVUFBQSxLQUFLLElBQUksQ0FBQztBQUNkLFVBQUksR0FBRyxZQUFZLEtBQUssQ0FBQyxHQUFHLGlCQUFpQjtBQUMzQyxZQUFJLEdBQUcsYUFBYSxLQUFLLEdBQUcsY0FBYyxJQUFJO0FBQzVDLGVBQUssSUFBSSxDQUFDLElBQUksZUFBZSxJQUFJLENBQUMsQ0FBQztBQUNuQyxhQUFHLEtBQUssR0FBRztBQUFBLFFBQ2I7QUFDSSxZQUFBLENBQUMsV0FBVyxHQUFHLGNBQWM7QUFDL0IsaUNBQXVCLElBQUksRUFBRTtBQUFBLE1BQ2pDO0FBQ0ksVUFBQSxHQUFHLFNBQVMsTUFBTTtBQUNwQixXQUFHLEtBQUssR0FBRztBQUFBLE1BQ2I7QUFDSSxVQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsR0FBRyxTQUFTLFdBQVcsQ0FBQyxHQUFHLElBQUk7QUFDOUUsV0FBRyxLQUFLLEdBQUc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsWUFBWSxLQUFLO0FBQ2xCLFFBQUFQLEtBQUksSUFBSTtBQUNSLFFBQUEsU0FBUyxDQUFDLENBQUM7QUFDYixNQUFBLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDaEIsUUFBTSxNQUFNLElBQUk7QUFDaEIsT0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDbEIsVUFBQSxPQUFPLElBQUksQ0FBQztBQUNsQixRQUFJLFNBQVMsR0FBRztBQUNWLFVBQUEsT0FBTyxPQUFPLFNBQVMsQ0FBQztBQUN4QixVQUFBLElBQUksQ0FBQyxJQUFJLE1BQU07QUFDakIsUUFBQUEsR0FBRSxDQUFDLElBQUk7QUFDUCxlQUFPLEtBQUssQ0FBQztBQUNiO0FBQUEsTUFDRjtBQUNJLFVBQUE7QUFDSixVQUFJLE9BQU8sU0FBUztBQUNwQixhQUFPLElBQUksR0FBRztBQUNaLFlBQUksSUFBSSxLQUFLO0FBQ2IsWUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksTUFBTTtBQUN6QixjQUFJLElBQUk7QUFBQSxRQUFBLE9BQ0g7QUFDRCxjQUFBO0FBQUEsUUFDTjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHO0FBQ3pCLFlBQUksSUFBSSxHQUFHO0FBQ1QsVUFBQUEsR0FBRSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUM7QUFBQSxRQUNyQjtBQUNBLGVBQU8sQ0FBQyxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxPQUFPO0FBQ1AsTUFBQSxPQUFPLElBQUksQ0FBQztBQUNoQixTQUFPLE1BQU0sR0FBRztBQUNkLFdBQU8sQ0FBQyxJQUFJO0FBQ1osUUFBSUEsR0FBRSxDQUFDO0FBQUEsRUFDVDtBQUNPLFNBQUE7QUFDVDtBQUNBLFNBQVMsMkJBQTJCLFVBQVU7QUFDdEMsUUFBQSxlQUFlLFNBQVMsUUFBUTtBQUN0QyxNQUFJLGNBQWM7QUFDaEIsUUFBSSxhQUFhLFlBQVksQ0FBQyxhQUFhLGVBQWU7QUFDakQsYUFBQTtBQUFBLElBQUEsT0FDRjtBQUNMLGFBQU8sMkJBQTJCLFlBQVk7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsZ0JBQWdCLE9BQU87QUFDOUIsTUFBSSxPQUFPO0FBQ0EsYUFBQSxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsSUFBSyxPQUFNLENBQUMsRUFBRSxTQUFTO0FBQUEsRUFDM0Q7QUFDRjtBQUVBLE1BQU0sZ0JBQWdCLE9BQU8sSUFBSSxPQUFPO0FBQ3hDLE1BQU0sZ0JBQWdCLE1BQU07QUFDMUI7QUFDUSxVQUFBLE1BQU0sT0FBTyxhQUFhO0FBQ2hDLFFBQUksQ0FBQyxLQUFLO0FBQ1IsT0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQjtBQUFBLFFBQzNDO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDTyxXQUFBO0FBQUEsRUFDVDtBQUNGO0FBbUJBLE1BQU0sd0JBQXdCLENBQUE7QUFDOUIsU0FBUyxNQUFNLFFBQVEsSUFBSSxTQUFTO0FBQzlCLE1BQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxHQUFHO0FBQ2hFO0FBQUEsTUFDRTtBQUFBLElBQUE7QUFBQSxFQUVKO0FBQ08sU0FBQSxRQUFRLFFBQVEsSUFBSSxPQUFPO0FBQ3BDO0FBQ0EsU0FBUyxRQUFRLFFBQVEsSUFBSTtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixJQUFJLFdBQVc7QUFDYixNQUFJLE1BQU0sTUFBTTtBQUNkLFVBQU0sTUFBTTtBQUNaLFNBQUssSUFBSSxTQUFTO0FBQ2hCLFVBQUksR0FBRyxJQUFJO0FBQ0g7SUFBQTtBQUFBLEVBRVo7QUFDSSxNQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsU0FBUyxVQUFVLE9BQU8sU0FBUyxVQUFVO0FBQzVGO0FBQUEsTUFDRTtBQUFBLElBQUE7QUFBQSxFQUVKO0FBQ0EsTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLENBQUMsSUFBSTtBQUNwRCxRQUFJLGNBQWMsUUFBUTtBQUN4QjtBQUFBLFFBQ0U7QUFBQSxNQUFBO0FBQUEsSUFFSjtBQUNBLFFBQUksU0FBUyxRQUFRO0FBQ25CO0FBQUEsUUFDRTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQ0EsUUFBSSxTQUFTLFFBQVE7QUFDbkI7QUFBQSxRQUNFO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFBQSxFQUNGO0FBQ00sUUFBQSxvQkFBb0IsQ0FBQyxNQUFNO0FBQy9CO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFBQTtBQUFBLEVBQ0Y7QUFFRixRQUFNLFdBQVc7QUFDakIsUUFBTSxpQkFBaUIsQ0FBQyxZQUFZLFNBQVMsT0FBTztBQUFBO0FBQUEsSUFFbEQsU0FBUyxTQUFTLFNBQVMsUUFBUSxJQUFJLE1BQU07QUFBQTtBQUUzQyxNQUFBO0FBQ0osTUFBSSxlQUFlO0FBQ25CLE1BQUksZ0JBQWdCO0FBQ2hCLE1BQUEsTUFBTSxNQUFNLEdBQUc7QUFDakIsYUFBUyxNQUFNLE9BQU87QUFDdEIsbUJBQWUsVUFBVSxNQUFNO0FBQUEsRUFBQSxXQUN0QixXQUFXLE1BQU0sR0FBRztBQUNwQixhQUFBLE1BQU0sZUFBZSxNQUFNO0FBQ3JCLG1CQUFBO0FBQUEsRUFBQSxXQUNOLFFBQVEsTUFBTSxHQUFHO0FBQ1Ysb0JBQUE7QUFDRCxtQkFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFdBQVcsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELGFBQVMsTUFBTSxPQUFPLElBQUksQ0FBQyxNQUFNO0FBQzNCLFVBQUEsTUFBTSxDQUFDLEdBQUc7QUFDWixlQUFPLEVBQUU7QUFBQSxNQUFBLFdBQ0EsV0FBVyxDQUFDLEdBQUc7QUFDeEIsZUFBTyxlQUFlLENBQUM7QUFBQSxNQUFBLFdBQ2QsV0FBVyxDQUFDLEdBQUc7QUFDakIsZUFBQSxzQkFBc0IsR0FBRyxVQUFVLENBQUM7QUFBQSxNQUFBLE9BQ3RDO0FBQ0wsU0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixrQkFBa0IsQ0FBQztBQUFBLE1BQ2xFO0FBQUEsSUFBQSxDQUNEO0FBQUEsRUFBQSxXQUNRLFdBQVcsTUFBTSxHQUFHO0FBQzdCLFFBQUksSUFBSTtBQUNOLGVBQVMsTUFBTSxzQkFBc0IsUUFBUSxVQUFVLENBQUM7QUFBQSxJQUFBLE9BQ25EO0FBQ0wsZUFBUyxNQUFNO0FBQ2IsWUFBSSxTQUFTO0FBQ0g7UUFDVjtBQUNPLGVBQUE7QUFBQSxVQUNMO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLENBQUMsU0FBUztBQUFBLFFBQUE7QUFBQSxNQUNaO0FBQUEsSUFFSjtBQUFBLEVBQUEsT0FDSztBQUNJLGFBQUE7QUFDVCxLQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLGtCQUFrQixNQUFNO0FBQUEsRUFDdkU7QUFDQSxNQUFJLE1BQU0sTUFBTTtBQUNkLFVBQU0sYUFBYTtBQUNWLGFBQUEsTUFBTSxTQUFTLFdBQUEsQ0FBWTtBQUFBLEVBQ3RDO0FBQ0ksTUFBQTtBQUNBLE1BQUEsWUFBWSxDQUFDLE9BQU87QUFDWk8sY0FBQUEsUUFBTyxTQUFTLE1BQU07QUFDUiw0QkFBQSxJQUFJLFVBQVUsQ0FBQztBQUNyQyxnQkFBVUEsUUFBTyxTQUFTO0FBQUEsSUFBQTtBQUFBLEVBQzVCO0FBRUUsTUFBQTtBQUNKLE1BQUksdUJBQXVCO0FBQ2IsZ0JBQUE7QUFDWixRQUFJLENBQUMsSUFBSTtBQUNBO2VBQ0UsV0FBVztBQUNPLGlDQUFBLElBQUksVUFBVSxHQUFHO0FBQUEsUUFDMUMsT0FBTztBQUFBLFFBQ1AsZ0JBQWdCLENBQUssSUFBQTtBQUFBLFFBQ3JCO0FBQUEsTUFBQSxDQUNEO0FBQUEsSUFDSDtBQUNBLFFBQUksVUFBVSxRQUFRO0FBQ3BCLFlBQU0sTUFBTTtBQUNaLG1CQUFhLElBQUkscUJBQXFCLElBQUksbUJBQW1CLENBQUM7QUFBQSxJQUFBLE9BQ3pEO0FBQ0UsYUFBQTtBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0ksTUFBQSxXQUFXLGdCQUFnQixJQUFJLE1BQU0sT0FBTyxNQUFNLEVBQUUsS0FBSyxxQkFBcUIsSUFBSTtBQUN0RixRQUFNLE1BQU0sTUFBTTtBQUNoQixRQUFJLENBQUNBLFFBQU8sVUFBVSxDQUFDQSxRQUFPLE9BQU87QUFDbkM7QUFBQSxJQUNGO0FBQ0EsUUFBSSxJQUFJO0FBQ0EsWUFBQSxXQUFXQSxRQUFPO0FBQ3hCLFVBQUksUUFBUSxpQkFBaUIsZ0JBQWdCLFNBQVMsS0FBSyxDQUFDLEdBQUcsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsVUFBVSxRQUFRLE1BQU0sT0FBTztBQUMzSSxZQUFJLFNBQVM7QUFDSDtRQUNWO0FBQzJCLG1DQUFBLElBQUksVUFBVSxHQUFHO0FBQUEsVUFDMUM7QUFBQTtBQUFBLFVBRUEsYUFBYSx3QkFBd0IsU0FBUyxpQkFBaUIsU0FBUyxDQUFDLE1BQU0sd0JBQXdCLENBQUEsSUFBSztBQUFBLFVBQzVHO0FBQUEsUUFBQSxDQUNEO0FBQ1UsbUJBQUE7QUFBQSxNQUNiO0FBQUEsSUFBQSxPQUNLO0FBQ0xBLGNBQU8sSUFBSTtBQUFBLElBQ2I7QUFBQSxFQUFBO0FBRUUsTUFBQSxlQUFlLENBQUMsQ0FBQztBQUNqQixNQUFBO0FBQ0osTUFBSSxVQUFVLFFBQVE7QUFDUixnQkFBQTtBQUFBLEVBQUEsV0FDSCxVQUFVLFFBQVE7QUFDM0IsZ0JBQVksTUFBTSxzQkFBc0IsS0FBSyxZQUFZLFNBQVMsUUFBUTtBQUFBLEVBQUEsT0FDckU7QUFDTCxRQUFJLE1BQU07QUFDTixRQUFBLFNBQWMsS0FBQSxLQUFLLFNBQVM7QUFDcEIsZ0JBQUEsTUFBTSxTQUFTLEdBQUc7QUFBQSxFQUNoQztBQUNBLFFBQU1BLFVBQVMsSUFBSSxlQUFlLFFBQVEsTUFBTSxTQUFTO0FBQ3pELFFBQU0sUUFBUTtBQUNkLFFBQU0sVUFBVSxNQUFNO0FBQ3BCQSxZQUFPLEtBQUs7QUFDWixRQUFJLE9BQU87QUFDRixhQUFBLE1BQU0sU0FBU0EsT0FBTTtBQUFBLElBQzlCO0FBQUEsRUFBQTtBQUVGLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0NBLFlBQU8sVUFBVTtBQUNqQkEsWUFBTyxZQUFZO0FBQUEsRUFDckI7QUFDQSxNQUFJLElBQUk7QUFDTixRQUFJLFdBQVc7QUFDVDtJQUFBLE9BQ0M7QUFDTCxpQkFBV0EsUUFBTztJQUNwQjtBQUFBLEVBQUEsV0FDUyxVQUFVLFFBQVE7QUFDM0I7QUFBQSxNQUNFQSxRQUFPLElBQUksS0FBS0EsT0FBTTtBQUFBLE1BQ3RCLFlBQVksU0FBUztBQUFBLElBQUE7QUFBQSxFQUN2QixPQUNLO0FBQ0xBLFlBQU8sSUFBSTtBQUFBLEVBQ2I7QUFDSSxNQUFBLFdBQXVCLFlBQUEsS0FBSyxPQUFPO0FBQ2hDLFNBQUE7QUFDVDtBQUNBLFNBQVMsY0FBYyxRQUFRLE9BQU8sU0FBUztBQUM3QyxRQUFNLGFBQWEsS0FBSztBQUN4QixRQUFNLFNBQVMsU0FBUyxNQUFNLElBQUksT0FBTyxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsWUFBWSxNQUFNLElBQUksTUFBTSxXQUFXLE1BQU0sSUFBSSxPQUFPLEtBQUssWUFBWSxVQUFVO0FBQ3pKLE1BQUE7QUFDQSxNQUFBLFdBQVcsS0FBSyxHQUFHO0FBQ2hCLFNBQUE7QUFBQSxFQUFBLE9BQ0E7QUFDTCxTQUFLLE1BQU07QUFDRCxjQUFBO0FBQUEsRUFDWjtBQUNNLFFBQUEsUUFBUSxtQkFBbUIsSUFBSTtBQUNyQyxRQUFNLE1BQU0sUUFBUSxRQUFRLEdBQUcsS0FBSyxVQUFVLEdBQUcsT0FBTztBQUNsRDtBQUNDLFNBQUE7QUFDVDtBQUNBLFNBQVMsaUJBQWlCLEtBQUssTUFBTTtBQUM3QixRQUFBLFdBQVcsS0FBSyxNQUFNLEdBQUc7QUFDL0IsU0FBTyxNQUFNO0FBQ1gsUUFBSSxNQUFNO0FBQ1YsYUFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFVBQVUsS0FBSyxLQUFLO0FBQ3pDLFlBQUEsSUFBSSxTQUFTLENBQUMsQ0FBQztBQUFBLElBQ3ZCO0FBQ08sV0FBQTtBQUFBLEVBQUE7QUFFWDtBQUNBLFNBQVMsU0FBUyxPQUFPLFFBQVEsVUFBVSxNQUFNO0FBQzNDLE1BQUEsU0FBUyxLQUFLLENBQUMsU0FBUyxLQUFLLEtBQUssTUFBTSxVQUFVLEdBQUc7QUFDaEQsV0FBQTtBQUFBLEVBQ1Q7QUFDTyxTQUFBLDRCQUE0QjtBQUMvQixNQUFBLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFDWixXQUFBO0FBQUEsRUFDVDtBQUNBLE9BQUssSUFBSSxLQUFLO0FBQ2Q7QUFDSSxNQUFBLE1BQU0sS0FBSyxHQUFHO0FBQ1AsYUFBQSxNQUFNLE9BQU8sT0FBTyxJQUFJO0FBQUEsRUFBQSxXQUN4QixRQUFRLEtBQUssR0FBRztBQUN6QixhQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLGVBQVMsTUFBTSxDQUFDLEdBQUcsT0FBTyxJQUFJO0FBQUEsSUFDaEM7QUFBQSxhQUNTLE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxHQUFHO0FBQ2pDLFVBQUEsUUFBUSxDQUFDLE1BQU07QUFDVixlQUFBLEdBQUcsT0FBTyxJQUFJO0FBQUEsSUFBQSxDQUN4QjtBQUFBLEVBQUEsV0FDUSxjQUFjLEtBQUssR0FBRztBQUMvQixlQUFXLE9BQU8sT0FBTztBQUN2QixlQUFTLE1BQU0sR0FBRyxHQUFHLE9BQU8sSUFBSTtBQUFBLElBQ2xDO0FBQ0EsZUFBVyxPQUFPLE9BQU8sc0JBQXNCLEtBQUssR0FBRztBQUNyRCxVQUFJLE9BQU8sVUFBVSxxQkFBcUIsS0FBSyxPQUFPLEdBQUcsR0FBRztBQUMxRCxpQkFBUyxNQUFNLEdBQUcsR0FBRyxPQUFPLElBQUk7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBaUVBLE1BQU0sb0JBQW9CLENBQUMsT0FBTyxjQUFjO0FBQ3ZDLFNBQUEsY0FBYyxnQkFBZ0IsY0FBYyxnQkFBZ0IsTUFBTSxpQkFBaUIsTUFBTSxHQUFHLFNBQVMsV0FBVyxLQUFLLE1BQU0sR0FBRyxTQUFTLFNBQVMsQ0FBQyxXQUFXLEtBQUssTUFBTSxHQUFHLFVBQVUsU0FBUyxDQUFDLFdBQVc7QUFDbE47QUFFQSxTQUFTLEtBQUssVUFBVSxVQUFVLFNBQVM7QUFDekMsTUFBSSxTQUFTLFlBQWE7QUFDcEIsUUFBQSxRQUFRLFNBQVMsTUFBTSxTQUFTO0FBQ3RDLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDdkMsVUFBQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLGNBQWMsQ0FBQyxZQUFZO0FBQUEsSUFDekIsSUFBQTtBQUNKLFFBQUksY0FBYztBQUNaLFVBQUEsRUFBRSxTQUFTLGlCQUFpQixNQUFNO0FBQ2hDLFlBQUEsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLFNBQVMsS0FBSyxDQUFDLEtBQUssZUFBZTtBQUNyRTtBQUFBLFlBQ0UsNEJBQTRCLEtBQUssK0RBQStELGFBQWEsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUFBLFVBQUE7QUFBQSxRQUVqSTtBQUFBLE1BQUEsT0FDSztBQUNDLGNBQUEsWUFBWSxhQUFhLEtBQUs7QUFDaEMsWUFBQSxXQUFXLFNBQVMsR0FBRztBQUNuQixnQkFBQSxVQUFVLFVBQVUsR0FBRyxPQUFPO0FBQ3BDLGNBQUksQ0FBQyxTQUFTO0FBQ1o7QUFBQSxjQUNFLCtEQUErRCxLQUFLO0FBQUEsWUFBQTtBQUFBLFVBRXhFO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksT0FBTztBQUNMSSxRQUFBQSxtQkFBa0IsTUFBTSxXQUFXLFNBQVM7QUFDbEQsUUFBTSxZQUFZQSxvQkFBbUIsa0JBQWtCLE9BQU8sTUFBTSxNQUFNLENBQUMsQ0FBQztBQUM1RSxNQUFJLFdBQVc7QUFDYixRQUFJLFVBQVUsTUFBTTtBQUNYLGFBQUEsUUFBUSxJQUFJLENBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDO0FBQUEsSUFDdEQ7QUFDQSxRQUFJLFVBQVUsUUFBUTtBQUNiLGFBQUEsUUFBUSxJQUFJLGFBQWE7QUFBQSxJQUNsQztBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBdUI7QUFDaEQsMEJBQUEsVUFBVSxPQUFPLElBQUk7QUFBQSxFQUM3QztBQUNBLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDdkMsVUFBQSxpQkFBaUIsTUFBTTtBQUM3QixRQUFJLG1CQUFtQixTQUFTLE1BQU0sYUFBYSxjQUFjLENBQUMsR0FBRztBQUNuRTtBQUFBLFFBQ0UsVUFBVSxjQUFjLDZCQUE2QjtBQUFBLFVBQ25EO0FBQUEsVUFDQSxTQUFTO0FBQUEsUUFBQSxDQUNWLHVDQUF1QyxLQUFLLGlLQUFpSztBQUFBLFVBQzVNO0FBQUEsUUFBQSxDQUNELGlCQUFpQixLQUFLO0FBQUEsTUFBQTtBQUFBLElBRTNCO0FBQUEsRUFDRjtBQUNJLE1BQUE7QUFDSixNQUFJLFVBQVUsTUFBTSxjQUFjLGFBQWEsS0FBSyxDQUFDO0FBQUEsRUFDckQsTUFBTSxjQUFjLGFBQWEsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUM3QyxNQUFBLENBQUMsV0FBV0Esa0JBQWlCO0FBQy9CLGNBQVUsTUFBTSxjQUFjLGFBQWEsVUFBVSxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQzlEO0FBQ0EsTUFBSSxTQUFTO0FBQ1g7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFBQTtBQUFBLEVBRUo7QUFDTSxRQUFBLGNBQWMsTUFBTSxjQUFjLE1BQU07QUFDOUMsTUFBSSxhQUFhO0FBQ1gsUUFBQSxDQUFDLFNBQVMsU0FBUztBQUNyQixlQUFTLFVBQVU7SUFDVixXQUFBLFNBQVMsUUFBUSxXQUFXLEdBQUc7QUFDeEM7QUFBQSxJQUNGO0FBQ1MsYUFBQSxRQUFRLFdBQVcsSUFBSTtBQUNoQztBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNGO0FBQ0EsU0FBUyxzQkFBc0IsTUFBTSxZQUFZLFVBQVUsT0FBTztBQUNoRSxRQUFNLFFBQVEsV0FBVztBQUNuQixRQUFBLFNBQVMsTUFBTSxJQUFJLElBQUk7QUFDN0IsTUFBSSxXQUFXLFFBQVE7QUFDZCxXQUFBO0FBQUEsRUFDVDtBQUNBLFFBQU0sTUFBTSxLQUFLO0FBQ2pCLE1BQUksYUFBYSxDQUFBO0FBQ2pCLE1BQUksYUFBYTtBQUNVLE1BQUEsQ0FBQyxXQUFXLElBQUksR0FBRztBQUN0QyxVQUFBLGNBQWMsQ0FBQyxTQUFTO0FBQzVCLFlBQU0sdUJBQXVCLHNCQUFzQixNQUFNLFlBQVksSUFBSTtBQUN6RSxVQUFJLHNCQUFzQjtBQUNYLHFCQUFBO0FBQ2IsZUFBTyxZQUFZLG9CQUFvQjtBQUFBLE1BQ3pDO0FBQUEsSUFBQTtBQUVGLFFBQUksQ0FBQyxXQUFXLFdBQVcsT0FBTyxRQUFRO0FBQzdCLGlCQUFBLE9BQU8sUUFBUSxXQUFXO0FBQUEsSUFDdkM7QUFDQSxRQUFJLEtBQUssU0FBUztBQUNoQixrQkFBWSxLQUFLLE9BQU87QUFBQSxJQUMxQjtBQUNBLFFBQUksS0FBSyxRQUFRO0FBQ1YsV0FBQSxPQUFPLFFBQVEsV0FBVztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNJLE1BQUEsQ0FBQyxPQUFPLENBQUMsWUFBWTtBQUNuQixRQUFBLFNBQVMsSUFBSSxHQUFHO0FBQ1osWUFBQSxJQUFJLE1BQU0sSUFBSTtBQUFBLElBQ3RCO0FBQ08sV0FBQTtBQUFBLEVBQ1Q7QUFDSSxNQUFBLFFBQVEsR0FBRyxHQUFHO0FBQ2hCLFFBQUksUUFBUSxDQUFDLFFBQVEsV0FBVyxHQUFHLElBQUksSUFBSTtBQUFBLEVBQUEsT0FDdEM7QUFDTCxXQUFPLFlBQVksR0FBRztBQUFBLEVBQ3hCO0FBQ0ksTUFBQSxTQUFTLElBQUksR0FBRztBQUNaLFVBQUEsSUFBSSxNQUFNLFVBQVU7QUFBQSxFQUM1QjtBQUNPLFNBQUE7QUFDVDtBQUNBLFNBQVMsZUFBZSxTQUFTLEtBQUs7QUFDcEMsTUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUNuQixXQUFBO0FBQUEsRUFDVDtBQUNBLFFBQU0sSUFBSSxNQUFNLENBQUMsRUFBRSxRQUFRLFNBQVMsRUFBRTtBQUMvQixTQUFBLE9BQU8sU0FBUyxJQUFJLENBQUMsRUFBRSxZQUFZLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxLQUFLLE9BQU8sU0FBUyxVQUFVLEdBQUcsQ0FBQyxLQUFLLE9BQU8sU0FBUyxHQUFHO0FBQ3ZIO0FBRUEsSUFBSSxnQkFBZ0I7QUFDcEIsU0FBUyxvQkFBb0I7QUFDWCxrQkFBQTtBQUNsQjtBQUNBLFNBQVMsb0JBQW9CLFVBQVU7QUFDL0IsUUFBQTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ047QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsY0FBYyxDQUFDLFlBQVk7QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQUFDO0FBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNFLElBQUE7QUFDRSxRQUFBLE9BQU8sNEJBQTRCLFFBQVE7QUFDN0MsTUFBQTtBQUNBLE1BQUE7QUFDSixNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdCLG9CQUFBO0FBQUEsRUFDbEI7QUFDSSxNQUFBO0FBQ0UsUUFBQSxNQUFNLFlBQVksR0FBRztBQUN2QixZQUFNLGFBQWEsYUFBYTtBQUMxQixZQUFBLFlBQVksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixXQUFXLGtCQUFrQixJQUFJLE1BQU0sWUFBWTtBQUFBLFFBQ2hILElBQUksUUFBUSxLQUFLLFVBQVU7QUFDekI7QUFBQSxZQUNFLGFBQWE7QUFBQSxjQUNYO0FBQUEsWUFDRCxDQUFBO0FBQUEsVUFBQTtBQUVILGlCQUFPLFFBQVEsSUFBSSxRQUFRLEtBQUssUUFBUTtBQUFBLFFBQzFDO0FBQUEsTUFDRCxDQUFBLElBQUk7QUFDSSxlQUFBO0FBQUEsUUFDUCxPQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLGdCQUFnQixLQUFLLElBQUk7QUFBQSxVQUNyRTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQUE7QUFFaUIseUJBQUE7QUFBQSxJQUFBLE9BQ2Q7QUFDTCxZQUFNLFVBQVU7QUFDaEIsVUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLFVBQVUsT0FBTztBQUM5QztNQUNwQjtBQUNTLGVBQUE7QUFBQSxRQUNQLFFBQVEsU0FBUyxJQUFJO0FBQUEsVUFDbkIsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixnQkFBZ0IsS0FBSyxJQUFJO0FBQUEsVUFDckUsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQjtBQUFBLFlBQzFDLElBQUksUUFBUTtBQUNRO0FBQ2xCLHFCQUFPLGdCQUFnQixLQUFLO0FBQUEsWUFDOUI7QUFBQSxZQUNBO0FBQUEsWUFDQSxNQUFBQTtBQUFBQSxVQUNFLElBQUEsRUFBRSxPQUFPLE9BQU8sTUFBQUEsTUFBSztBQUFBLFFBQUEsSUFDdkI7QUFBQSxVQUNGLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsZ0JBQWdCLEtBQUssSUFBSTtBQUFBLFVBQ3JFO0FBQUEsUUFDRjtBQUFBLE1BQUE7QUFFRix5QkFBbUIsVUFBVSxRQUFRLFFBQVEseUJBQXlCLEtBQUs7QUFBQSxJQUM3RTtBQUFBLFdBQ08sS0FBSztBQUNaLGVBQVcsU0FBUztBQUNSLGdCQUFBLEtBQUssVUFBVSxDQUFDO0FBQzVCLGFBQVMsWUFBWSxPQUFPO0FBQUEsRUFDOUI7QUFDQSxNQUFJLE9BQU87QUFDWCxNQUFJLFVBQVU7QUFDVixNQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBTyxZQUFZLEtBQUssT0FBTyxZQUFZLE1BQU07QUFDaEcsS0FBQyxNQUFNLE9BQU8sSUFBSSxhQUFhLE1BQU07QUFBQSxFQUN2QztBQUNJLE1BQUEsb0JBQW9CLGlCQUFpQixPQUFPO0FBQ3hDLFVBQUEsT0FBTyxPQUFPLEtBQUssZ0JBQWdCO0FBQ25DLFVBQUEsRUFBRSxVQUFjLElBQUE7QUFDdEIsUUFBSSxLQUFLLFFBQVE7QUFDWCxVQUFBLGFBQWEsSUFBSSxJQUFJO0FBQ3ZCLFlBQUksZ0JBQWdCLEtBQUssS0FBSyxlQUFlLEdBQUc7QUFDM0IsNkJBQUE7QUFBQSxZQUNqQjtBQUFBLFlBQ0E7QUFBQSxVQUFBO0FBQUEsUUFFSjtBQUNBLGVBQU8sV0FBVyxNQUFNLGtCQUFrQixPQUFPLElBQUk7QUFBQSxNQUN2RCxXQUFXLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLFNBQVM7QUFDekYsY0FBQSxXQUFXLE9BQU8sS0FBSyxLQUFLO0FBQ2xDLGNBQU0sYUFBYSxDQUFBO0FBQ25CLGNBQU0sYUFBYSxDQUFBO0FBQ25CLGlCQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUN6QyxnQkFBQSxNQUFNLFNBQVMsQ0FBQztBQUNsQixjQUFBLEtBQUssR0FBRyxHQUFHO0FBQ1QsZ0JBQUEsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHO0FBQ2QseUJBQUEsS0FBSyxJQUFJLENBQUMsRUFBRSxZQUFnQixJQUFBLElBQUksTUFBTSxDQUFDLENBQUM7QUFBQSxZQUNyRDtBQUFBLFVBQUEsT0FDSztBQUNMLHVCQUFXLEtBQUssR0FBRztBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUNBLFlBQUksV0FBVyxRQUFRO0FBQ3JCO0FBQUEsWUFDRSxvQ0FBb0MsV0FBVyxLQUFLLElBQUksQ0FBQztBQUFBLFVBQUE7QUFBQSxRQUU3RDtBQUNBLFlBQUksV0FBVyxRQUFRO0FBQ3JCO0FBQUEsWUFDRSx5Q0FBeUMsV0FBVyxLQUFLLElBQUksQ0FBQztBQUFBLFVBQUE7QUFBQSxRQUVsRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksTUFBTSxNQUFNO0FBQ1YsUUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLENBQUMsY0FBYyxJQUFJLEdBQUc7QUFDckU7QUFBQSxRQUNFO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDQSxXQUFPLFdBQVcsTUFBTSxNQUFNLE9BQU8sSUFBSTtBQUNwQyxTQUFBLE9BQU8sS0FBSyxPQUFPLEtBQUssS0FBSyxPQUFPLE1BQU0sSUFBSSxJQUFJLE1BQU07QUFBQSxFQUMvRDtBQUNBLE1BQUksTUFBTSxZQUFZO0FBQ2hCLFFBQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixDQUFDLGNBQWMsSUFBSSxHQUFHO0FBQ3JFO0FBQUEsUUFDRTtBQUFBLE1BQUE7QUFBQSxJQUVKO0FBQ0EsU0FBSyxhQUFhLE1BQU07QUFBQSxFQUMxQjtBQUNBLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixTQUFTO0FBQ3hELFlBQVEsSUFBSTtBQUFBLEVBQUEsT0FDUDtBQUNJLGFBQUE7QUFBQSxFQUNYO0FBQ0EsOEJBQTRCLElBQUk7QUFDekIsU0FBQTtBQUNUO0FBQ0EsTUFBTSxlQUFlLENBQUMsVUFBVTtBQUM5QixRQUFNLGNBQWMsTUFBTTtBQUMxQixRQUFNLGtCQUFrQixNQUFNO0FBQ3hCLFFBQUEsWUFBWSxpQkFBaUIsYUFBYSxLQUFLO0FBQ3JELE1BQUksQ0FBQyxXQUFXO0FBQ1AsV0FBQSxDQUFDLE9BQU8sTUFBTTtBQUFBLEVBQ1osV0FBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLFVBQVUsWUFBWSxLQUFLLFVBQVUsWUFBWSxNQUFNO0FBQzdHLFdBQU8sYUFBYSxTQUFTO0FBQUEsRUFDL0I7QUFDTSxRQUFBLFFBQVEsWUFBWSxRQUFRLFNBQVM7QUFDM0MsUUFBTSxlQUFlLGtCQUFrQixnQkFBZ0IsUUFBUSxTQUFTLElBQUk7QUFDdEUsUUFBQSxVQUFVLENBQUMsZ0JBQWdCO0FBQy9CLGdCQUFZLEtBQUssSUFBSTtBQUNyQixRQUFJLGlCQUFpQjtBQUNuQixVQUFJLGVBQWUsSUFBSTtBQUNyQix3QkFBZ0IsWUFBWSxJQUFJO0FBQUEsTUFBQSxXQUN2QixZQUFZLFlBQVksR0FBRztBQUNwQyxjQUFNLGtCQUFrQixDQUFDLEdBQUcsaUJBQWlCLFdBQVc7QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUYsU0FBTyxDQUFDLGVBQWUsU0FBUyxHQUFHLE9BQU87QUFDNUM7QUFDQSxTQUFTLGlCQUFpQixVQUFVLFVBQVUsTUFBTTtBQUM5QyxNQUFBO0FBQ0osV0FBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSztBQUNsQyxVQUFBLFFBQVEsU0FBUyxDQUFDO0FBQ3BCLFFBQUEsUUFBUSxLQUFLLEdBQUc7QUFDbEIsVUFBSSxNQUFNLFNBQVMsV0FBVyxNQUFNLGFBQWEsUUFBUTtBQUN2RCxZQUFJLFlBQVk7QUFDZDtBQUFBLFFBQUEsT0FDSztBQUNRLHVCQUFBO0FBQ2IsY0FBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLFdBQVcsV0FBVyxZQUFZLEtBQUssV0FBVyxZQUFZLE1BQU07QUFDNUcsbUJBQUEsaUJBQWlCLFdBQVcsUUFBUTtBQUFBLFVBQzdDO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUFBLE9BQ0s7QUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBQ0EsTUFBTSwyQkFBMkIsQ0FBQyxVQUFVO0FBQ3RDLE1BQUE7QUFDSixhQUFXLE9BQU8sT0FBTztBQUN2QixRQUFJLFFBQVEsV0FBVyxRQUFRLFdBQVcsS0FBSyxHQUFHLEdBQUc7QUFDbkQsT0FBQyxRQUFRLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ08sU0FBQTtBQUNUO0FBQ0EsTUFBTSx1QkFBdUIsQ0FBQyxPQUFPLFVBQVU7QUFDN0MsUUFBTSxNQUFNLENBQUE7QUFDWixhQUFXLE9BQU8sT0FBTztBQUNuQixRQUFBLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssUUFBUTtBQUNqRCxVQUFBLEdBQUcsSUFBSSxNQUFNLEdBQUc7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxNQUFNLGdCQUFnQixDQUFDLFVBQVU7QUFDL0IsU0FBTyxNQUFNLGFBQWEsSUFBSSxNQUFNLE1BQU0sU0FBUztBQUNyRDtBQUNBLFNBQVMsc0JBQXNCLFdBQVcsV0FBVyxXQUFXO0FBQzlELFFBQU0sRUFBRSxPQUFPLFdBQVcsVUFBVSxjQUFjLFVBQWMsSUFBQTtBQUNoRSxRQUFNLEVBQUUsT0FBTyxXQUFXLFVBQVUsY0FBYyxVQUFjLElBQUE7QUFDaEUsUUFBTSxRQUFRLFVBQVU7QUFDcEIsTUFBQSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsa0JBQWtCLGdCQUFnQixpQkFBaUIsZUFBZTtBQUN6RixXQUFBO0FBQUEsRUFDVDtBQUNJLE1BQUEsVUFBVSxRQUFRLFVBQVUsWUFBWTtBQUNuQyxXQUFBO0FBQUEsRUFDVDtBQUNJLE1BQUEsYUFBYSxhQUFhLEdBQUc7QUFDL0IsUUFBSSxZQUFZLE1BQU07QUFDYixhQUFBO0FBQUEsSUFDVDtBQUNBLFFBQUksWUFBWSxJQUFJO0FBQ2xCLFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTyxDQUFDLENBQUM7QUFBQSxNQUNYO0FBQ08sYUFBQSxnQkFBZ0IsV0FBVyxXQUFXLEtBQUs7QUFBQSxJQUFBLFdBQ3pDLFlBQVksR0FBRztBQUN4QixZQUFNLGVBQWUsVUFBVTtBQUMvQixlQUFTLElBQUksR0FBRyxJQUFJLGFBQWEsUUFBUSxLQUFLO0FBQ3RDLGNBQUEsTUFBTSxhQUFhLENBQUM7QUFDdEIsWUFBQSxVQUFVLEdBQUcsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGVBQWUsT0FBTyxHQUFHLEdBQUc7QUFDN0QsaUJBQUE7QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUFBLE9BQ0s7QUFDTCxRQUFJLGdCQUFnQixjQUFjO0FBQ2hDLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLFNBQVM7QUFDbkMsZUFBQTtBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQ0EsUUFBSSxjQUFjLFdBQVc7QUFDcEIsYUFBQTtBQUFBLElBQ1Q7QUFDQSxRQUFJLENBQUMsV0FBVztBQUNkLGFBQU8sQ0FBQyxDQUFDO0FBQUEsSUFDWDtBQUNBLFFBQUksQ0FBQyxXQUFXO0FBQ1AsYUFBQTtBQUFBLElBQ1Q7QUFDTyxXQUFBLGdCQUFnQixXQUFXLFdBQVcsS0FBSztBQUFBLEVBQ3BEO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxnQkFBZ0IsV0FBVyxXQUFXLGNBQWM7QUFDckQsUUFBQSxXQUFXLE9BQU8sS0FBSyxTQUFTO0FBQ3RDLE1BQUksU0FBUyxXQUFXLE9BQU8sS0FBSyxTQUFTLEVBQUUsUUFBUTtBQUM5QyxXQUFBO0FBQUEsRUFDVDtBQUNBLFdBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUs7QUFDbEMsVUFBQSxNQUFNLFNBQVMsQ0FBQztBQUNsQixRQUFBLFVBQVUsR0FBRyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZUFBZSxjQUFjLEdBQUcsR0FBRztBQUNwRSxhQUFBO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLGdCQUFnQixFQUFFLE9BQU8sT0FBQSxHQUFVLElBQUk7QUFDOUMsU0FBTyxRQUFRO0FBQ2IsVUFBTSxPQUFPLE9BQU87QUFDcEIsUUFBSSxLQUFLLFlBQVksS0FBSyxTQUFTLGlCQUFpQixPQUFPO0FBQ3pELFdBQUssS0FBSyxNQUFNO0FBQUEsSUFDbEI7QUFDQSxRQUFJLFNBQVMsT0FBTztBQUNqQixPQUFBLFFBQVEsT0FBTyxPQUFPLEtBQUs7QUFDNUIsZUFBUyxPQUFPO0FBQUEsSUFBQSxPQUNYO0FBQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsTUFBTSxhQUFhLENBQUMsU0FBUyxLQUFLO0FBbWpCbEMsU0FBUyx3QkFBd0IsSUFBSSxVQUFVO0FBQ3pDLE1BQUEsWUFBWSxTQUFTLGVBQWU7QUFDbEMsUUFBQSxRQUFRLEVBQUUsR0FBRztBQUNOLGVBQUEsUUFBUSxLQUFLLEdBQUcsRUFBRTtBQUFBLElBQUEsT0FDdEI7QUFDSSxlQUFBLFFBQVEsS0FBSyxFQUFFO0FBQUEsSUFDMUI7QUFBQSxFQUFBLE9BQ0s7QUFDTCxxQkFBaUIsRUFBRTtBQUFBLEVBQ3JCO0FBQ0Y7QUFvQkEsTUFBTSxXQUFXLE9BQU8sSUFBSSxPQUFPO0FBQ25DLE1BQU0sT0FBTyxPQUFPLElBQUksT0FBTztBQUMvQixNQUFNLFVBQVUsT0FBTyxJQUFJLE9BQU87QUFDbEMsTUFBTSxTQUFTLE9BQU8sSUFBSSxPQUFPO0FBQ2pDLE1BQU0sYUFBYSxDQUFBO0FBQ25CLElBQUksZUFBZTtBQUNuQixTQUFTLFVBQVUsa0JBQWtCLE9BQU87QUFDMUMsYUFBVyxLQUFLLGVBQWUsa0JBQWtCLE9BQU8sQ0FBRSxDQUFBO0FBQzVEO0FBQ0EsU0FBUyxhQUFhO0FBQ3BCLGFBQVcsSUFBSTtBQUNmLGlCQUFlLFdBQVcsV0FBVyxTQUFTLENBQUMsS0FBSztBQUN0RDtBQUNBLElBQUkscUJBQXFCO0FBQ3pCLFNBQVMsaUJBQWlCLE9BQU87QUFDVCx3QkFBQTtBQUNsQixNQUFBLFFBQVEsS0FBSyxjQUFjO0FBQzdCLGlCQUFhLFVBQVU7QUFBQSxFQUN6QjtBQUNGO0FBQ0EsU0FBUyxXQUFXLE9BQU87QUFDekIsUUFBTSxrQkFBa0IscUJBQXFCLElBQUksZ0JBQWdCLFlBQVk7QUFDbEU7QUFDUCxNQUFBLHFCQUFxQixLQUFLLGNBQWM7QUFDMUMsaUJBQWEsS0FBSyxLQUFLO0FBQUEsRUFDekI7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLG1CQUFtQixNQUFNLE9BQU8sVUFBVSxXQUFXLGNBQWMsV0FBVztBQUM5RSxTQUFBO0FBQUEsSUFDTDtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFBQTtBQUVKO0FBYUEsU0FBUyxRQUFRLE9BQU87QUFDZixTQUFBLFFBQVEsTUFBTSxnQkFBZ0IsT0FBTztBQUM5QztBQUNBLFNBQVMsZ0JBQWdCLElBQUksSUFBSTtBQUMzQixNQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsR0FBRyxZQUFZLEtBQUssR0FBRyxXQUFXO0FBQ2pGLFVBQU0saUJBQWlCLG1CQUFtQixJQUFJLEdBQUcsSUFBSTtBQUNyRCxRQUFJLGtCQUFrQixlQUFlLElBQUksR0FBRyxTQUFTLEdBQUc7QUFDdEQsU0FBRyxhQUFhLENBQUM7QUFDakIsU0FBRyxhQUFhLENBQUM7QUFDVixhQUFBO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxTQUFPLEdBQUcsU0FBUyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUc7QUFDOUM7QUFLQSxNQUFNLCtCQUErQixJQUFJLFNBQVM7QUFDekMsU0FBQTtBQUFBLElBQ0wsR0FBaUY7QUFBQSxFQUFBO0FBRXJGO0FBQ0EsTUFBTSxlQUFlLENBQUMsRUFBRSxJQUFVLE1BQUEsT0FBTyxPQUFPLE1BQU07QUFDdEQsTUFBTSxlQUFlLENBQUM7QUFBQSxFQUNwQixLQUFBTjtBQUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDQSxNQUFBLE9BQU9BLFNBQVEsVUFBVTtBQUMzQkEsV0FBTSxLQUFLQTtBQUFBQSxFQUNiO0FBQ09BLFNBQUFBLFFBQU8sT0FBTyxTQUFTQSxJQUFHLEtBQUssTUFBTUEsSUFBRyxLQUFLLFdBQVdBLElBQUcsSUFBSSxFQUFFLEdBQUcsMEJBQTBCLEdBQUdBLE1BQUssR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSUEsT0FBTTtBQUNsSjtBQUNBLFNBQVMsZ0JBQWdCLE1BQU0sUUFBUSxNQUFNLFdBQVcsTUFBTSxZQUFZLEdBQUcsZUFBZSxNQUFNLFlBQVksU0FBUyxXQUFXLElBQUksR0FBRyxjQUFjLE9BQU8sZ0NBQWdDLE9BQU87QUFDbk0sUUFBTSxRQUFRO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBLEtBQUssU0FBUyxhQUFhLEtBQUs7QUFBQSxJQUNoQyxLQUFLLFNBQVMsYUFBYSxLQUFLO0FBQUEsSUFDaEMsU0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLElBQUk7QUFBQSxJQUNKLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLElBQ2pCLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxFQUFBO0FBRVAsTUFBSSwrQkFBK0I7QUFDakMsc0JBQWtCLE9BQU8sUUFBUTtBQUNqQyxRQUFJLFlBQVksS0FBSztBQUNuQixXQUFLLFVBQVUsS0FBSztBQUFBLElBQ3RCO0FBQUEsYUFDUyxVQUFVO0FBQ25CLFVBQU0sYUFBYSxTQUFTLFFBQVEsSUFBSSxJQUFJO0FBQUEsRUFDOUM7QUFDSSxNQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsTUFBTSxRQUFRLE1BQU0sS0FBSztBQUNqRSxXQUFBLHFEQUFxRCxNQUFNLElBQUk7QUFBQSxFQUN4RTtBQUNBLE1BQUkscUJBQXFCO0FBQUEsRUFDekIsQ0FBQztBQUFBLEVBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUlDLE1BQU0sWUFBWSxLQUFLLFlBQVk7QUFBQTtBQUFBLEVBRXBDLE1BQU0sY0FBYyxJQUFJO0FBQ3RCLGlCQUFhLEtBQUssS0FBSztBQUFBLEVBQ3pCO0FBQ08sU0FBQTtBQUNUO0FBQ0EsTUFBTSxjQUFjLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsK0JBQStCO0FBQy9GLFNBQVMsYUFBYSxNQUFNLFFBQVEsTUFBTSxXQUFXLE1BQU0sWUFBWSxHQUFHLGVBQWUsTUFBTSxjQUFjLE9BQU87QUFDOUcsTUFBQSxDQUFDLFFBQVEsU0FBUyx3QkFBd0I7QUFDNUMsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLENBQUMsTUFBTTtBQUMvQyxhQUFBLDJDQUEyQyxJQUFJLEdBQUc7QUFBQSxJQUMzRDtBQUNPLFdBQUE7QUFBQSxFQUNUO0FBQ0ksTUFBQSxRQUFRLElBQUksR0FBRztBQUNqQixVQUFNLFNBQVM7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLElBQUE7QUFHRixRQUFJLFVBQVU7QUFDWix3QkFBa0IsUUFBUSxRQUFRO0FBQUEsSUFDcEM7QUFDQSxRQUFJLHFCQUFxQixLQUFLLENBQUMsZUFBZSxjQUFjO0FBQ3RELFVBQUEsT0FBTyxZQUFZLEdBQUc7QUFDeEIscUJBQWEsYUFBYSxRQUFRLElBQUksQ0FBQyxJQUFJO0FBQUEsTUFBQSxPQUN0QztBQUNMLHFCQUFhLEtBQUssTUFBTTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUNBLFdBQU8sWUFBWTtBQUNaLFdBQUE7QUFBQSxFQUNUO0FBQ0ksTUFBQSxpQkFBaUIsSUFBSSxHQUFHO0FBQzFCLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDQSxNQUFJLE9BQU87QUFDVCxZQUFRLG1CQUFtQixLQUFLO0FBQ2hDLFFBQUksRUFBRSxPQUFPLE9BQU8sTUFBQSxJQUFVO0FBQzlCLFFBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxHQUFHO0FBQ3ZCLFlBQUEsUUFBUSxlQUFlLEtBQUs7QUFBQSxJQUNwQztBQUNJLFFBQUEsU0FBUyxLQUFLLEdBQUc7QUFDbkIsVUFBSSxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsS0FBSyxHQUFHO0FBQzdCLGdCQUFBLE9BQU8sSUFBSSxLQUFLO0FBQUEsTUFDMUI7QUFDTSxZQUFBLFFBQVEsZUFBZSxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ00sUUFBQSxZQUFZLFNBQVMsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksTUFBTSxXQUFXLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksSUFBSTtBQUNoSSxNQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsWUFBWSxLQUFLLFFBQVEsSUFBSSxHQUFHO0FBQy9FLFdBQU8sTUFBTSxJQUFJO0FBQ2pCO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BRUE7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNPLFNBQUE7QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQUE7QUFFSjtBQUNBLFNBQVMsbUJBQW1CLE9BQU87QUFDN0IsTUFBQSxDQUFDLE1BQWMsUUFBQTtBQUNaLFNBQUEsUUFBUSxLQUFLLEtBQUssaUJBQWlCLEtBQUssSUFBSSxPQUFPLENBQUksR0FBQSxLQUFLLElBQUk7QUFDekU7QUFDQSxTQUFTLFdBQVcsT0FBTyxZQUFZLFdBQVcsT0FBTyxrQkFBa0IsT0FBTztBQUNoRixRQUFNLEVBQUUsT0FBTyxLQUFBQSxNQUFLLFdBQVcsVUFBVSxXQUFlLElBQUE7QUFDeEQsUUFBTSxjQUFjLGFBQWEsV0FBVyxTQUFTLElBQUksVUFBVSxJQUFJO0FBQ3ZFLFFBQU0sU0FBUztBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsTUFBTSxNQUFNO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxLQUFLLGVBQWUsYUFBYSxXQUFXO0FBQUEsSUFDNUMsS0FBSyxjQUFjLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUk1QixZQUFZQSxPQUFNLFFBQVFBLElBQUcsSUFBSUEsS0FBSSxPQUFPLGFBQWEsVUFBVSxDQUFDLElBQUksQ0FBQ0EsTUFBSyxhQUFhLFVBQVUsQ0FBQyxJQUFJLGFBQWEsVUFBVTtBQUFBLFFBQy9IQTtBQUFBQSxJQUNKLFNBQVMsTUFBTTtBQUFBLElBQ2YsY0FBYyxNQUFNO0FBQUEsSUFDcEIsVUFBVSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsaUJBQWlCLGNBQWMsTUFBTSxRQUFRLFFBQVEsSUFBSSxTQUFTLElBQUksY0FBYyxJQUFJO0FBQUEsSUFDOUgsUUFBUSxNQUFNO0FBQUEsSUFDZCxhQUFhLE1BQU07QUFBQSxJQUNuQixjQUFjLE1BQU07QUFBQSxJQUNwQixhQUFhLE1BQU07QUFBQSxJQUNuQixXQUFXLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS2pCLFdBQVcsY0FBYyxNQUFNLFNBQVMsV0FBVyxjQUFjLEtBQUssS0FBSyxZQUFZLEtBQUs7QUFBQSxJQUM1RixjQUFjLE1BQU07QUFBQSxJQUNwQixpQkFBaUIsTUFBTTtBQUFBLElBQ3ZCLFlBQVksTUFBTTtBQUFBLElBQ2xCLE1BQU0sTUFBTTtBQUFBLElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0EsV0FBVyxNQUFNO0FBQUEsSUFDakIsVUFBVSxNQUFNO0FBQUEsSUFDaEIsV0FBVyxNQUFNLGFBQWEsV0FBVyxNQUFNLFNBQVM7QUFBQSxJQUN4RCxZQUFZLE1BQU0sY0FBYyxXQUFXLE1BQU0sVUFBVTtBQUFBLElBQzNELElBQUksTUFBTTtBQUFBLElBQ1YsUUFBUSxNQUFNO0FBQUEsSUFDZCxLQUFLLE1BQU07QUFBQSxJQUNYLElBQUksTUFBTTtBQUFBLEVBQUE7QUFFWixNQUFJLGNBQWMsaUJBQWlCO0FBQ2pDO0FBQUEsTUFDRTtBQUFBLE1BQ0EsV0FBVyxNQUFNLE1BQU07QUFBQSxJQUFBO0FBQUEsRUFFM0I7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLGVBQWUsT0FBTztBQUN2QixRQUFBLFNBQVMsV0FBVyxLQUFLO0FBQzNCLE1BQUEsUUFBUSxNQUFNLFFBQVEsR0FBRztBQUMzQixXQUFPLFdBQVcsTUFBTSxTQUFTLElBQUksY0FBYztBQUFBLEVBQ3JEO0FBQ08sU0FBQTtBQUNUO0FBQ0EsU0FBUyxnQkFBZ0IsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUM3QyxTQUFPLFlBQVksTUFBTSxNQUFNLE1BQU0sSUFBSTtBQUMzQztBQVNBLFNBQVMsZUFBZSxPQUFPO0FBQzdCLE1BQUksU0FBUyxRQUFRLE9BQU8sVUFBVSxXQUFXO0FBQy9DLFdBQU8sWUFBWSxPQUFPO0FBQUEsRUFBQSxXQUNqQixRQUFRLEtBQUssR0FBRztBQUNsQixXQUFBO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BRUEsTUFBTSxNQUFNO0FBQUEsSUFBQTtBQUFBLEVBQ2QsV0FDUyxPQUFPLFVBQVUsVUFBVTtBQUNwQyxXQUFPLGVBQWUsS0FBSztBQUFBLEVBQUEsT0FDdEI7QUFDTCxXQUFPLFlBQVksTUFBTSxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQUEsRUFDOUM7QUFDRjtBQUNBLFNBQVMsZUFBZSxPQUFPO0FBQ3RCLFNBQUEsTUFBTSxPQUFPLFFBQVEsTUFBTSxjQUFjLE1BQU0sTUFBTSxPQUFPLFFBQVEsV0FBVyxLQUFLO0FBQzdGO0FBQ0EsU0FBUyxrQkFBa0IsT0FBTyxVQUFVO0FBQzFDLE1BQUksT0FBTztBQUNMLFFBQUEsRUFBRSxVQUFjLElBQUE7QUFDdEIsTUFBSSxZQUFZLE1BQU07QUFDVCxlQUFBO0FBQUEsRUFBQSxXQUNGLFFBQVEsUUFBUSxHQUFHO0FBQ3JCLFdBQUE7QUFBQSxFQUFBLFdBQ0UsT0FBTyxhQUFhLFVBQVU7QUFDbkMsUUFBQSxhQUFhLElBQUksS0FBSztBQUN4QixZQUFNLE9BQU8sU0FBUztBQUN0QixVQUFJLE1BQU07QUFDSCxhQUFBLE9BQU8sS0FBSyxLQUFLO0FBQ0osMEJBQUEsT0FBTyxNQUFNO0FBQzFCLGFBQUEsT0FBTyxLQUFLLEtBQUs7QUFBQSxNQUN4QjtBQUNBO0FBQUEsSUFBQSxPQUNLO0FBQ0UsYUFBQTtBQUNQLFlBQU0sV0FBVyxTQUFTO0FBQzFCLFVBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLFFBQVEsR0FBRztBQUM1QyxpQkFBUyxPQUFPO0FBQUEsTUFBQSxXQUNQLGFBQWEsS0FBSywwQkFBMEI7QUFDakQsWUFBQSx5QkFBeUIsTUFBTSxNQUFNLEdBQUc7QUFDMUMsbUJBQVMsSUFBSTtBQUFBLFFBQUEsT0FDUjtBQUNMLG1CQUFTLElBQUk7QUFDYixnQkFBTSxhQUFhO0FBQUEsUUFDckI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQUEsV0FDUyxXQUFXLFFBQVEsR0FBRztBQUMvQixlQUFXLEVBQUUsU0FBUyxVQUFVLE1BQU0seUJBQXlCO0FBQ3hELFdBQUE7QUFBQSxFQUFBLE9BQ0Y7QUFDTCxlQUFXLE9BQU8sUUFBUTtBQUMxQixRQUFJLFlBQVksSUFBSTtBQUNYLGFBQUE7QUFDSSxpQkFBQSxDQUFDLGdCQUFnQixRQUFRLENBQUM7QUFBQSxJQUFBLE9BQ2hDO0FBQ0UsYUFBQTtBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsUUFBTSxXQUFXO0FBQ2pCLFFBQU0sYUFBYTtBQUNyQjtBQUNBLFNBQVMsY0FBYyxNQUFNO0FBQzNCLFFBQU0sTUFBTSxDQUFBO0FBQ1osV0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUM5QixVQUFBLFVBQVUsS0FBSyxDQUFDO0FBQ3RCLGVBQVcsT0FBTyxTQUFTO0FBQ3pCLFVBQUksUUFBUSxTQUFTO0FBQ2YsWUFBQSxJQUFJLFVBQVUsUUFBUSxPQUFPO0FBQy9CLGNBQUksUUFBUSxlQUFlLENBQUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxDQUFDO0FBQUEsUUFDdkQ7QUFBQSxNQUFBLFdBQ1MsUUFBUSxTQUFTO0FBQzFCLFlBQUksUUFBUSxlQUFlLENBQUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxDQUFDO0FBQUEsTUFBQSxXQUM1QyxLQUFLLEdBQUcsR0FBRztBQUNkLGNBQUEsV0FBVyxJQUFJLEdBQUc7QUFDbEIsY0FBQSxXQUFXLFFBQVEsR0FBRztBQUN4QixZQUFBLFlBQVksYUFBYSxZQUFZLEVBQUUsUUFBUSxRQUFRLEtBQUssU0FBUyxTQUFTLFFBQVEsSUFBSTtBQUN4RixjQUFBLEdBQUcsSUFBSSxXQUFXLENBQUEsRUFBRyxPQUFPLFVBQVUsUUFBUSxJQUFJO0FBQUEsUUFDeEQ7QUFBQSxNQUFBLFdBQ1MsUUFBUSxJQUFJO0FBQ2pCLFlBQUEsR0FBRyxJQUFJLFFBQVEsR0FBRztBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDTyxTQUFBO0FBQ1Q7QUFDQSxTQUFTLGdCQUFnQixNQUFNLFVBQVUsT0FBTyxZQUFZLE1BQU07QUFDckMsNkJBQUEsTUFBTSxVQUFVLEdBQUc7QUFBQSxJQUM1QztBQUFBLElBQ0E7QUFBQSxFQUFBLENBQ0Q7QUFDSDtBQUVBLE1BQU0sa0JBQWtCLGlCQUFpQjtBQUN6QyxJQUFJLE1BQU07QUFDVixTQUFTLHdCQUF3QixPQUFPLFFBQVEsVUFBVTtBQUN4RCxRQUFNLE9BQU8sTUFBTTtBQUNuQixRQUFNLGNBQWMsU0FBUyxPQUFPLGFBQWEsTUFBTSxlQUFlO0FBQ3RFLFFBQU0sV0FBVztBQUFBLElBQ2YsS0FBSztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBO0FBQUEsSUFFVCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQSxJQUVSLE9BQU8sSUFBSTtBQUFBLE1BQ1Q7QUFBQTtBQUFBLElBRUY7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLFVBQVUsU0FBUyxPQUFPLFdBQVcsT0FBTyxPQUFPLFdBQVcsUUFBUTtBQUFBLElBQ3RFLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBO0FBQUEsSUFFZCxZQUFZO0FBQUEsSUFDWixZQUFZO0FBQUE7QUFBQSxJQUVaLGNBQWMsc0JBQXNCLE1BQU0sVUFBVTtBQUFBLElBQ3BELGNBQWMsc0JBQXNCLE1BQU0sVUFBVTtBQUFBO0FBQUEsSUFFcEQsTUFBTTtBQUFBO0FBQUEsSUFFTixTQUFTO0FBQUE7QUFBQSxJQUVULGVBQWU7QUFBQTtBQUFBLElBRWYsY0FBYyxLQUFLO0FBQUE7QUFBQSxJQUVuQixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUE7QUFBQSxJQUVkO0FBQUEsSUFDQSxZQUFZLFdBQVcsU0FBUyxZQUFZO0FBQUEsSUFDNUMsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBO0FBQUE7QUFBQSxJQUdmLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLElBQUk7QUFBQSxJQUNKLEdBQUc7QUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLEdBQUc7QUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLEdBQUc7QUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLEdBQUc7QUFBQSxJQUNILEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUFBO0FBRU4sTUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUNwQyxhQUFBLE1BQU0sdUJBQXVCLFFBQVE7QUFBQSxFQUFBLE9BQ3pDO0FBQ0ksYUFBQSxNQUFNLEVBQUUsR0FBRyxTQUFTO0FBQUEsRUFDL0I7QUFDUyxXQUFBLE9BQU8sU0FBUyxPQUFPLE9BQU87QUFDdkMsV0FBUyxPQUFPLEtBQUssS0FBSyxNQUFNLFFBQVE7QUFDeEMsTUFBSSxNQUFNLElBQUk7QUFDWixVQUFNLEdBQUcsUUFBUTtBQUFBLEVBQ25CO0FBQ08sU0FBQTtBQUNUO0FBQ0EsSUFBSSxrQkFBa0I7QUFDdEIsTUFBTSxxQkFBcUIsTUFBTSxtQkFBbUI7QUFDcEQsSUFBSTtBQUNKLElBQUk7QUFDSjtBQUNFLFFBQU0sSUFBSTtBQUNKLFFBQUEsdUJBQXVCLENBQUMsS0FBSyxXQUFXO0FBQ3hDLFFBQUE7QUFDQSxRQUFBLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBYyxXQUFBLEVBQUUsR0FBRyxJQUFJO0FBQzVDLFlBQVEsS0FBSyxNQUFNO0FBQ25CLFdBQU8sQ0FBQyxNQUFNO0FBQ1IsVUFBQSxRQUFRLFNBQVMsRUFBRyxTQUFRLFFBQVEsQ0FBQ2IsU0FBUUEsS0FBSSxDQUFDLENBQUM7QUFBQSxVQUNsRCxTQUFRLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFBQTtBQUFBLEVBQ25CO0FBRTJCLCtCQUFBO0FBQUEsSUFDM0I7QUFBQSxJQUNBLENBQUMsTUFBTSxrQkFBa0I7QUFBQSxFQUFBO0FBRU4sdUJBQUE7QUFBQSxJQUNuQjtBQUFBLElBQ0EsQ0FBQyxNQUFNLHdCQUF3QjtBQUFBLEVBQUE7QUFFbkM7QUFDQSxNQUFNLHFCQUFxQixDQUFDLGFBQWE7QUFDdkMsUUFBTSxPQUFPO0FBQ2IsNkJBQTJCLFFBQVE7QUFDbkMsV0FBUyxNQUFNO0FBQ2YsU0FBTyxNQUFNO0FBQ1gsYUFBUyxNQUFNO0FBQ2YsK0JBQTJCLElBQUk7QUFBQSxFQUFBO0FBRW5DO0FBQ0EsTUFBTSx1QkFBdUIsTUFBTTtBQUNkLHFCQUFBLGdCQUFnQixNQUFNO0FBQ3pDLDZCQUEyQixJQUFJO0FBQ2pDO0FBQ0EsTUFBTSx1Q0FBdUMsZ0JBQWdCO0FBQzdELFNBQVMsc0JBQXNCLE1BQU0sRUFBRSxlQUFlO0FBQ3BELE1BQUksYUFBYSxJQUFJLEtBQUssWUFBWSxJQUFJLEdBQUc7QUFDM0M7QUFBQSxNQUNFLG9FQUFvRTtBQUFBLElBQUE7QUFBQSxFQUV4RTtBQUNGO0FBQ0EsU0FBUyxvQkFBb0IsVUFBVTtBQUM5QixTQUFBLFNBQVMsTUFBTSxZQUFZO0FBQ3BDO0FBQ0EsSUFBSSx3QkFBd0I7QUFDNUIsU0FBUyxlQUFlLFVBQVUsUUFBUSxPQUFPLFlBQVksT0FBTztBQUNsRSxXQUFTLG1CQUFtQixLQUFLO0FBQ2pDLFFBQU0sRUFBRSxPQUFPLGFBQWEsU0FBUztBQUMvQixRQUFBLGFBQWEsb0JBQW9CLFFBQVE7QUFDckMsWUFBQSxVQUFVLE9BQU8sWUFBWSxLQUFLO0FBQ2xDLFlBQUEsVUFBVSxVQUFVLFNBQVM7QUFDdkMsUUFBTSxjQUFjLGFBQWEsdUJBQXVCLFVBQVUsS0FBSyxJQUFJO0FBQzNFLFdBQVMsbUJBQW1CLEtBQUs7QUFDMUIsU0FBQTtBQUNUO0FBQ0EsU0FBUyx1QkFBdUIsVUFBVSxPQUFPO0FBQzNDLE1BQUE7QUFDSixRQUFNLFlBQVksU0FBUztBQUMzQixNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLFFBQUksVUFBVSxNQUFNO0FBQ2xCLDRCQUFzQixVQUFVLE1BQU0sU0FBUyxXQUFXLE1BQU07QUFBQSxJQUNsRTtBQUNBLFFBQUksVUFBVSxZQUFZO0FBQ3hCLFlBQU0sUUFBUSxPQUFPLEtBQUssVUFBVSxVQUFVO0FBQzlDLGVBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsOEJBQXNCLE1BQU0sQ0FBQyxHQUFHLFNBQVMsV0FBVyxNQUFNO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQ0EsUUFBSSxVQUFVLFlBQVk7QUFDeEIsWUFBTSxRQUFRLE9BQU8sS0FBSyxVQUFVLFVBQVU7QUFDOUMsZUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNmLDhCQUFBLE1BQU0sQ0FBQyxDQUFDO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBQ0ksUUFBQSxVQUFVLG1CQUFtQixpQkFBaUI7QUFDaEQ7QUFBQSxRQUNFO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFBQSxFQUNGO0FBQ1MsV0FBQSxjQUFxQyx1QkFBQSxPQUFPLElBQUk7QUFDekQsV0FBUyxRQUFRLElBQUksTUFBTSxTQUFTLEtBQUssMkJBQTJCO0FBQ3BFLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsK0JBQTJCLFFBQVE7QUFBQSxFQUNyQztBQUNNLFFBQUEsRUFBRSxNQUFVLElBQUE7QUFDbEIsTUFBSSxPQUFPO0FBQ0gsVUFBQSxlQUFlLFNBQVMsZUFBZSxNQUFNLFNBQVMsSUFBSSxtQkFBbUIsUUFBUSxJQUFJO0FBQ3pGLFVBQUEsUUFBUSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNkLFVBQU0sY0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsUUFDRSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLGdCQUFnQixTQUFTLEtBQUssSUFBSSxTQUFTO0FBQUEsUUFDdkY7QUFBQSxNQUNGO0FBQUEsSUFBQTtBQUVZO0FBQ1I7QUFDRixRQUFBLFVBQVUsV0FBVyxHQUFHO0FBQ2Qsa0JBQUEsS0FBSyxzQkFBc0Isb0JBQW9CO0FBQzNELFVBQUksT0FBTztBQUNGLGVBQUEsWUFBWSxLQUFLLENBQUMsbUJBQW1CO0FBQ3hCLDRCQUFBLFVBQVUsZ0JBQWdCLEtBQUs7QUFBQSxRQUFBLENBQ2xELEVBQUUsTUFBTSxDQUFDLE1BQU07QUFDRixzQkFBQSxHQUFHLFVBQVUsQ0FBQztBQUFBLFFBQUEsQ0FDM0I7QUFBQSxNQUFBLE9BQ0k7QUFDTCxpQkFBUyxXQUFXO0FBQ2hCLFlBQUEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixDQUFDLFNBQVMsVUFBVTtBQUNuRSxnQkFBTSxRQUFRLEtBQUssVUFBVSxTQUFTLE9BQU8sS0FBSztBQUNsRDtBQUFBLFlBQ0UsY0FBYyxJQUFJO0FBQUEsVUFBQTtBQUFBLFFBRXRCO0FBQUEsTUFDRjtBQUFBLElBQUEsT0FDSztBQUNhLHdCQUFBLFVBQVUsYUFBYSxLQUFLO0FBQUEsSUFDaEQ7QUFBQSxFQUFBLE9BQ0s7QUFDTCx5QkFBcUIsVUFBVSxLQUFLO0FBQUEsRUFDdEM7QUFDRjtBQUNBLFNBQVMsa0JBQWtCLFVBQVUsYUFBYSxPQUFPO0FBQ25ELE1BQUEsV0FBVyxXQUFXLEdBQUc7QUFDdkIsUUFBQSxTQUFTLEtBQUssbUJBQW1CO0FBQ25DLGVBQVMsWUFBWTtBQUFBLElBQUEsT0FDaEI7QUFDTCxlQUFTLFNBQVM7QUFBQSxJQUNwQjtBQUFBLEVBQUEsV0FDUyxTQUFTLFdBQVcsR0FBRztBQUM1QixRQUFBLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsUUFBUSxXQUFXLEdBQUc7QUFDckU7QUFBQSxRQUNFO0FBQUEsTUFBQTtBQUFBLElBRUo7QUFDQSxRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBdUI7QUFDdEUsZUFBUyx3QkFBd0I7QUFBQSxJQUNuQztBQUNTLGFBQUEsYUFBYSxVQUFVLFdBQVc7QUFDM0MsUUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxzQ0FBZ0MsUUFBUTtBQUFBLElBQzFDO0FBQUEsRUFBQSxXQUNTLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsZ0JBQWdCLFFBQVE7QUFDOUU7QUFBQSxNQUNFLDhDQUE4QyxnQkFBZ0IsT0FBTyxTQUFTLE9BQU8sV0FBVztBQUFBLElBQUE7QUFBQSxFQUVwRztBQUNBLHVCQUFxQixVQUFVLEtBQUs7QUFDdEM7QUFDQSxJQUFJO0FBVUosTUFBTSxnQkFBZ0IsTUFBTSxDQUFDO0FBQzdCLFNBQVMscUJBQXFCLFVBQVUsT0FBTyxhQUFhO0FBQzFELFFBQU0sWUFBWSxTQUFTO0FBQ3ZCLE1BQUEsQ0FBQyxTQUFTLFFBQVE7QUFDcEIsUUFBSSxDQUFDLFNBQVMsV0FBVyxDQUFDLFVBQVUsUUFBUTtBQUMxQyxZQUFNLFdBQVcsVUFBVSxZQUFZLHFCQUFxQixRQUFRLEVBQUU7QUFDdEUsVUFBSSxVQUFVO0FBQ1osWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3Qyx1QkFBYSxVQUFVLFNBQVM7QUFBQSxRQUNsQztBQUNBLGNBQU0sRUFBRSxpQkFBaUIsZ0JBQWdCLElBQUksU0FBUyxXQUFXO0FBQ2pFLGNBQU0sRUFBRSxZQUFZLGlCQUFpQix5QkFBQSxJQUE2QjtBQUNsRSxjQUFNLHVCQUF1QjtBQUFBLFVBQzNCO0FBQUEsWUFDRTtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFFUSxrQkFBQSxTQUFTLFFBQVEsVUFBVSxvQkFBb0I7QUFDekQsWUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZUFBZTtBQUM3QyxxQkFBVyxVQUFVLFNBQVM7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ1MsYUFBQSxTQUFTLFVBQVUsVUFBVTtBQUFBLEVBSXhDO0FBQ2lDO0FBQ3pCLFVBQUEsUUFBUSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNWLFFBQUE7QUFDRixtQkFBYSxRQUFRO0FBQUEsSUFBQSxVQUNyQjtBQUNjO0FBQ1I7SUFDUjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsQ0FBQyxVQUFVLFVBQVUsU0FBUyxXQUFXLFFBQVEsQ0FBQyxPQUFPO0FBQ3BHLFFBQVksVUFBVSxVQUFVO0FBQ2xDO0FBQUEsUUFDRTtBQUFBLE1BQUE7QUFBQSxJQUNGLE9BQ0s7QUFDTCxhQUFPLHNEQUFzRCxTQUFTO0FBQUEsSUFDeEU7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxNQUFNLHFCQUFxQixDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCO0FBQUEsRUFDckUsSUFBSSxRQUFRLEtBQUs7QUFDRztBQUNaLFVBQUEsUUFBUSxPQUFPLEVBQUU7QUFDdkIsV0FBTyxPQUFPLEdBQUc7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsTUFBTTtBQUNKLFdBQU8saUNBQWlDO0FBQ2pDLFdBQUE7QUFBQSxFQUNUO0FBQUEsRUFDQSxpQkFBaUI7QUFDZixXQUFPLGlDQUFpQztBQUNqQyxXQUFBO0FBQUEsRUFDVDtBQUNGLElBQUk7QUFBQSxFQUNGLElBQUksUUFBUSxLQUFLO0FBQ1QsVUFBQSxRQUFRLE9BQU8sRUFBRTtBQUN2QixXQUFPLE9BQU8sR0FBRztBQUFBLEVBQ25CO0FBQ0Y7QUFDQSxTQUFTLGNBQWMsVUFBVTtBQUN4QixTQUFBLElBQUksTUFBTSxTQUFTLE9BQU87QUFBQSxJQUMvQixJQUFJLFFBQVEsS0FBSztBQUNULFlBQUEsVUFBVSxPQUFPLFFBQVE7QUFDL0IsYUFBTyxPQUFPLEdBQUc7QUFBQSxJQUNuQjtBQUFBLEVBQUEsQ0FDRDtBQUNIO0FBQ0EsU0FBUyxtQkFBbUIsVUFBVTtBQUM5QixRQUFBLFNBQVMsQ0FBQyxZQUFZO0FBQzFCLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsVUFBSSxTQUFTLFNBQVM7QUFDcEIsZUFBTyxrREFBa0Q7QUFBQSxNQUMzRDtBQUNBLFVBQUksV0FBVyxNQUFNO0FBQ25CLFlBQUksY0FBYyxPQUFPO0FBQ3pCLFlBQUksZ0JBQWdCLFVBQVU7QUFDeEIsY0FBQSxRQUFRLE9BQU8sR0FBRztBQUNOLDBCQUFBO0FBQUEsVUFBQSxXQUNMLE1BQU0sT0FBTyxHQUFHO0FBQ1gsMEJBQUE7QUFBQSxVQUNoQjtBQUFBLFFBQ0Y7QUFDQSxZQUFJLGdCQUFnQixVQUFVO0FBQzVCO0FBQUEsWUFDRSxzREFBc0QsV0FBVztBQUFBLFVBQUE7QUFBQSxRQUVyRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ1MsYUFBQSxVQUFVLFdBQVc7RUFBQztBQUVqQyxNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQ3pDLFFBQUE7QUFDQSxRQUFBO0FBQ0osV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQixJQUFJLFFBQVE7QUFDVixlQUFPLGVBQWUsYUFBYSxJQUFJLE1BQU0sU0FBUyxPQUFPLGtCQUFrQjtBQUFBLE1BQ2pGO0FBQUEsTUFDQSxJQUFJLFFBQVE7QUFDSCxlQUFBLGVBQWUsYUFBYSxjQUFjLFFBQVE7QUFBQSxNQUMzRDtBQUFBLE1BQ0EsSUFBSSxPQUFPO0FBQ1QsZUFBTyxDQUFDLFVBQVUsU0FBUyxTQUFTLEtBQUssT0FBTyxHQUFHLElBQUk7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxJQUFBLENBQ0Q7QUFBQSxFQUFBLE9BQ0k7QUFDRSxXQUFBO0FBQUEsTUFDTCxPQUFPLElBQUksTUFBTSxTQUFTLE9BQU8sa0JBQWtCO0FBQUEsTUFDbkQsT0FBTyxTQUFTO0FBQUEsTUFDaEIsTUFBTSxTQUFTO0FBQUEsTUFDZjtBQUFBLElBQUE7QUFBQSxFQUVKO0FBQ0Y7QUFDQSxTQUFTLDJCQUEyQixVQUFVO0FBQzVDLE1BQUksU0FBUyxTQUFTO0FBQ2IsV0FBQSxTQUFTLGdCQUFnQixTQUFTLGNBQWMsSUFBSSxNQUFNLFVBQVUsUUFBUSxTQUFTLE9BQU8sQ0FBQyxHQUFHO0FBQUEsTUFDckcsSUFBSSxRQUFRLEtBQUs7QUFDZixZQUFJLE9BQU8sUUFBUTtBQUNqQixpQkFBTyxPQUFPLEdBQUc7QUFBQSxRQUFBLFdBQ1IsT0FBTyxxQkFBcUI7QUFDOUIsaUJBQUEsb0JBQW9CLEdBQUcsRUFBRSxRQUFRO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBQUEsTUFDQSxJQUFJLFFBQVEsS0FBSztBQUNSLGVBQUEsT0FBTyxVQUFVLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0QsQ0FBQTtBQUFBLEVBQUEsT0FDSTtBQUNMLFdBQU8sU0FBUztBQUFBLEVBQ2xCO0FBQ0Y7QUFDQSxNQUFNLGFBQWE7QUFDbkIsTUFBTSxXQUFXLENBQUMsUUFBUSxJQUFJLFFBQVEsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxRQUFRLFNBQVMsRUFBRTtBQUM3RixTQUFTLGlCQUFpQixXQUFXLGtCQUFrQixNQUFNO0FBQ3BELFNBQUEsV0FBVyxTQUFTLElBQUksVUFBVSxlQUFlLFVBQVUsT0FBTyxVQUFVLFFBQVEsbUJBQW1CLFVBQVU7QUFDMUg7QUFDQSxTQUFTLG9CQUFvQixVQUFVLFdBQVcsU0FBUyxPQUFPO0FBQzVELE1BQUEsT0FBTyxpQkFBaUIsU0FBUztBQUNqQyxNQUFBLENBQUMsUUFBUSxVQUFVLFFBQVE7QUFDN0IsVUFBTSxRQUFRLFVBQVUsT0FBTyxNQUFNLGlCQUFpQjtBQUN0RCxRQUFJLE9BQU87QUFDVCxhQUFPLE1BQU0sQ0FBQztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNBLE1BQUksQ0FBQyxRQUFRLFlBQVksU0FBUyxRQUFRO0FBQ2xDLFVBQUEsb0JBQW9CLENBQUMsYUFBYTtBQUN0QyxpQkFBVyxPQUFPLFVBQVU7QUFDdEIsWUFBQSxTQUFTLEdBQUcsTUFBTSxXQUFXO0FBQ3hCLGlCQUFBO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUFBO0FBRUssV0FBQTtBQUFBLE1BQ0wsU0FBUyxjQUFjLFNBQVMsT0FBTyxLQUFLO0FBQUEsSUFDekMsS0FBQSxrQkFBa0IsU0FBUyxXQUFXLFVBQVU7QUFBQSxFQUN2RDtBQUNBLFNBQU8sT0FBTyxTQUFTLElBQUksSUFBSSxTQUFTLFFBQVE7QUFDbEQ7QUFDQSxTQUFTLGlCQUFpQixPQUFPO0FBQ3hCLFNBQUEsV0FBVyxLQUFLLEtBQUssZUFBZTtBQUM3QztBQUVBLE1BQU0sV0FBVyxDQUFDLGlCQUFpQixpQkFBaUI7QUFDbEQsUUFBTSxJQUFJLFdBQVcsaUJBQWlCLGNBQWMscUJBQXFCO0FBQ3pFLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MsVUFBTSxJQUFJO0FBQ1YsUUFBSSxLQUFLLEVBQUUsV0FBVyxPQUFPLHVCQUF1QjtBQUNsRCxRQUFFLGlCQUFpQjtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUNPLFNBQUE7QUFDVDtBQXVCQSxTQUFTLHNCQUFzQjtBQUN6QixNQUFBLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUFPLFdBQVcsYUFBYTtBQUMvRTtBQUFBLEVBQ0Y7QUFDTSxRQUFBLFdBQVcsRUFBRSxPQUFPO0FBQ3BCLFFBQUEsY0FBYyxFQUFFLE9BQU87QUFDdkIsUUFBQSxjQUFjLEVBQUUsT0FBTztBQUN2QixRQUFBLGVBQWUsRUFBRSxPQUFPO0FBQzlCLFFBQU0sWUFBWTtBQUFBLElBQ2hCLHdCQUF3QjtBQUFBLElBQ3hCLE9BQU8sS0FBSztBQUNOLFVBQUEsQ0FBQyxTQUFTLEdBQUcsR0FBRztBQUNYLGVBQUE7QUFBQSxNQUNUO0FBQ0EsVUFBSSxJQUFJLFNBQVM7QUFDUixlQUFBLENBQUMsT0FBTyxVQUFVLGFBQWE7QUFBQSxNQUFBLFdBQzdCLE1BQU0sR0FBRyxHQUFHO0FBQ2QsZUFBQTtBQUFBLFVBQ0w7QUFBQSxVQUNBLENBQUM7QUFBQSxVQUNELENBQUMsUUFBUSxVQUFVLFdBQVcsR0FBRyxDQUFDO0FBQUEsVUFDbEM7QUFBQSxVQUNBLFlBQVksSUFBSSxLQUFLO0FBQUEsVUFDckI7QUFBQSxRQUFBO0FBQUEsTUFDRixXQUNTLFdBQVcsR0FBRyxHQUFHO0FBQ25CLGVBQUE7QUFBQSxVQUNMO0FBQUEsVUFDQSxDQUFDO0FBQUEsVUFDRCxDQUFDLFFBQVEsVUFBVSxVQUFVLEdBQUcsSUFBSSxvQkFBb0IsVUFBVTtBQUFBLFVBQ2xFO0FBQUEsVUFDQSxZQUFZLEdBQUc7QUFBQSxVQUNmLElBQUksV0FBVyxHQUFHLElBQUksZ0JBQWdCLEVBQUU7QUFBQSxRQUFBO0FBQUEsTUFDMUMsV0FDUyxXQUFXLEdBQUcsR0FBRztBQUNuQixlQUFBO0FBQUEsVUFDTDtBQUFBLFVBQ0EsQ0FBQztBQUFBLFVBQ0QsQ0FBQyxRQUFRLFVBQVUsVUFBVSxHQUFHLElBQUksb0JBQW9CLFVBQVU7QUFBQSxVQUNsRTtBQUFBLFVBQ0EsWUFBWSxHQUFHO0FBQUEsVUFDZjtBQUFBLFFBQUE7QUFBQSxNQUVKO0FBQ08sYUFBQTtBQUFBLElBQ1Q7QUFBQSxJQUNBLFFBQVEsS0FBSztBQUNYLGFBQU8sT0FBTyxJQUFJO0FBQUEsSUFDcEI7QUFBQSxJQUNBLEtBQUssS0FBSztBQUNKLFVBQUEsT0FBTyxJQUFJLFNBQVM7QUFDZixlQUFBO0FBQUEsVUFDTDtBQUFBLFVBQ0EsQ0FBQztBQUFBLFVBQ0QsR0FBRyxlQUFlLElBQUksQ0FBQztBQUFBLFFBQUE7QUFBQSxNQUUzQjtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRUYsV0FBUyxlQUFlLFVBQVU7QUFDaEMsVUFBTSxTQUFTLENBQUE7QUFDZixRQUFJLFNBQVMsS0FBSyxTQUFTLFNBQVMsT0FBTztBQUN6QyxhQUFPLEtBQUssb0JBQW9CLFNBQVMsTUFBTSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsSUFDakU7QUFDSSxRQUFBLFNBQVMsZUFBZSxXQUFXO0FBQ3JDLGFBQU8sS0FBSyxvQkFBb0IsU0FBUyxTQUFTLFVBQVUsQ0FBQztBQUFBLElBQy9EO0FBQ0ksUUFBQSxTQUFTLFNBQVMsV0FBVztBQUMvQixhQUFPLEtBQUssb0JBQW9CLFFBQVEsTUFBTSxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQUEsSUFDL0Q7QUFDTUksVUFBQUEsWUFBVyxZQUFZLFVBQVUsVUFBVTtBQUNqRCxRQUFJQSxXQUFVO0FBQ1osYUFBTyxLQUFLLG9CQUFvQixZQUFZQSxTQUFRLENBQUM7QUFBQSxJQUN2RDtBQUNNLFVBQUEsV0FBVyxZQUFZLFVBQVUsUUFBUTtBQUMvQyxRQUFJLFVBQVU7QUFDWixhQUFPLEtBQUssb0JBQW9CLFlBQVksUUFBUSxDQUFDO0FBQUEsSUFDdkQ7QUFDQSxXQUFPLEtBQUs7QUFBQSxNQUNWO0FBQUEsTUFDQSxDQUFDO0FBQUEsTUFDRDtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPLGFBQWEsUUFBUTtBQUFBLFFBQzlCO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLENBQUMsVUFBVSxFQUFFLFFBQVEsVUFBVTtBQUFBLElBQUEsQ0FDaEM7QUFDTSxXQUFBO0FBQUEsRUFDVDtBQUNTLFdBQUEsb0JBQW9CLE1BQU0sUUFBUTtBQUNoQyxhQUFBLE9BQU8sSUFBSSxNQUFNO0FBQzFCLFFBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFDeEIsYUFBQSxDQUFDLFFBQVEsQ0FBQSxDQUFFO0FBQUEsSUFDcEI7QUFDTyxXQUFBO0FBQUEsTUFDTDtBQUFBLE1BQ0EsRUFBRSxPQUFPLHlDQUF5QztBQUFBLE1BQ2xEO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxHQUFHLE9BQU8sS0FBSyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7QUFDM0IsaUJBQUE7QUFBQSxZQUNMO0FBQUEsWUFDQSxDQUFDO0FBQUEsWUFDRCxDQUFDLFFBQVEsY0FBYyxNQUFNLElBQUk7QUFBQSxZQUNqQyxZQUFZLE9BQU8sR0FBRyxHQUFHLEtBQUs7QUFBQSxVQUFBO0FBQUEsUUFDaEMsQ0FDRDtBQUFBLE1BQ0g7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNTLFdBQUEsWUFBWSxHQUFHLFFBQVEsTUFBTTtBQUNoQyxRQUFBLE9BQU8sTUFBTSxVQUFVO0FBQ2xCLGFBQUEsQ0FBQyxRQUFRLGFBQWEsQ0FBQztBQUFBLElBQUEsV0FDckIsT0FBTyxNQUFNLFVBQVU7QUFDaEMsYUFBTyxDQUFDLFFBQVEsYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQUEsSUFBQSxXQUNyQyxPQUFPLE1BQU0sV0FBVztBQUMxQixhQUFBLENBQUMsUUFBUSxjQUFjLENBQUM7QUFBQSxJQUFBLFdBQ3RCLFNBQVMsQ0FBQyxHQUFHO0FBQ2YsYUFBQSxDQUFDLFVBQVUsRUFBRSxRQUFRLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBQSxDQUFHO0FBQUEsSUFBQSxPQUM3QztBQUNMLGFBQU8sQ0FBQyxRQUFRLGFBQWEsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFDUyxXQUFBLFlBQVksVUFBVSxNQUFNO0FBQ25DLFVBQU0sT0FBTyxTQUFTO0FBQ2xCLFFBQUEsV0FBVyxJQUFJLEdBQUc7QUFDcEI7QUFBQSxJQUNGO0FBQ0EsVUFBTSxZQUFZLENBQUE7QUFDUCxlQUFBLE9BQU8sU0FBUyxLQUFLO0FBQzlCLFVBQUksWUFBWSxNQUFNLEtBQUssSUFBSSxHQUFHO0FBQ2hDLGtCQUFVLEdBQUcsSUFBSSxTQUFTLElBQUksR0FBRztBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUNPLFdBQUE7QUFBQSxFQUNUO0FBQ1MsV0FBQSxZQUFZLE1BQU0sS0FBSyxNQUFNO0FBQzlCLFVBQUEsT0FBTyxLQUFLLElBQUk7QUFDbEIsUUFBQSxRQUFRLElBQUksS0FBSyxLQUFLLFNBQVMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLE9BQU8sTUFBTTtBQUNqRSxhQUFBO0FBQUEsSUFDVDtBQUNBLFFBQUksS0FBSyxXQUFXLFlBQVksS0FBSyxTQUFTLEtBQUssSUFBSSxHQUFHO0FBQ2pELGFBQUE7QUFBQSxJQUNUO0FBQ0EsUUFBSSxLQUFLLFVBQVUsS0FBSyxPQUFPLEtBQUssQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHO0FBQzlELGFBQUE7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNBLFdBQVMsV0FBVyxHQUFHO0FBQ2pCLFFBQUEsVUFBVSxDQUFDLEdBQUc7QUFDVCxhQUFBO0FBQUEsSUFDVDtBQUNBLFFBQUksRUFBRSxRQUFRO0FBQ0wsYUFBQTtBQUFBLElBQ1Q7QUFDTyxXQUFBO0FBQUEsRUFDVDtBQUNBLE1BQUksT0FBTyxvQkFBb0I7QUFDdEIsV0FBQSxtQkFBbUIsS0FBSyxTQUFTO0FBQUEsRUFBQSxPQUNuQztBQUNFLFdBQUEscUJBQXFCLENBQUMsU0FBUztBQUFBLEVBQ3hDO0FBQ0Y7QUE0QkEsTUFBTSxVQUFVO0FBQ2hCLE1BQU0sT0FBTyxDQUFDLEVBQUUsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLFNBQVM7QUFFakQsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUFPLGFBQWE7QUFDMUQsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixPQUFPLG9CQUFvQjtBQ3JoUWhHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxNQUFNLFFBQVE7QUFDZCxNQUFNLFdBQVc7QUFDakIsTUFBTSxNQUFNLE9BQU8sYUFBYSxjQUFjLFdBQVc7QUFDekQsTUFBTSxvQkFBb0IsT0FBdUIsb0JBQUksY0FBYyxVQUFVO0FBQzdFLE1BQU0sVUFBVTtBQUFBLEVBQ2QsUUFBUSxDQUFDLE9BQU8sUUFBUSxXQUFXO0FBQ2pDLFdBQU8sYUFBYSxPQUFPLFVBQVUsSUFBSTtBQUFBLEVBQzFDO0FBQUEsRUFDRCxRQUFRLENBQUMsVUFBVTtBQUNqQixVQUFNLFNBQVMsTUFBTTtBQUNyQixRQUFJLFFBQVE7QUFDVixhQUFPLFlBQVksS0FBSztBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBQ0QsZUFBZSxDQUFDLEtBQUssV0FBVyxJQUFJLFVBQVU7QUFDNUMsVUFBTSxLQUFLLGNBQWMsUUFBUSxJQUFJLGdCQUFnQixPQUFPLEdBQUcsSUFBSSxjQUFjLFdBQVcsSUFBSSxnQkFBZ0IsVUFBVSxHQUFHLElBQUksS0FBSyxJQUFJLGNBQWMsS0FBSyxFQUFFLEdBQUUsQ0FBRSxJQUFJLElBQUksY0FBYyxHQUFHO0FBQzVMLFFBQUksUUFBUSxZQUFZLFNBQVMsTUFBTSxZQUFZLE1BQU07QUFDdkQsU0FBRyxhQUFhLFlBQVksTUFBTSxRQUFRO0FBQUEsSUFDM0M7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0QsWUFBWSxDQUFDLFNBQVMsSUFBSSxlQUFlLElBQUk7QUFBQSxFQUM3QyxlQUFlLENBQUMsU0FBUyxJQUFJLGNBQWMsSUFBSTtBQUFBLEVBQy9DLFNBQVMsQ0FBQyxNQUFNLFNBQVM7QUFDdkIsU0FBSyxZQUFZO0FBQUEsRUFDbEI7QUFBQSxFQUNELGdCQUFnQixDQUFDLElBQUksU0FBUztBQUM1QixPQUFHLGNBQWM7QUFBQSxFQUNsQjtBQUFBLEVBQ0QsWUFBWSxDQUFDLFNBQVMsS0FBSztBQUFBLEVBQzNCLGFBQWEsQ0FBQyxTQUFTLEtBQUs7QUFBQSxFQUM1QixlQUFlLENBQUMsYUFBYSxJQUFJLGNBQWMsUUFBUTtBQUFBLEVBQ3ZELFdBQVcsSUFBSSxJQUFJO0FBQ2pCLE9BQUcsYUFBYSxJQUFJLEVBQUU7QUFBQSxFQUN2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLRCxvQkFBb0IsU0FBUyxRQUFRLFFBQVEsV0FBVyxPQUFPLEtBQUs7QUFDbEUsVUFBTSxTQUFTLFNBQVMsT0FBTyxrQkFBa0IsT0FBTztBQUN4RCxRQUFJLFVBQVUsVUFBVSxPQUFPLE1BQU0sY0FBYztBQUNqRCxhQUFPLE1BQU07QUFDWCxlQUFPLGFBQWEsTUFBTSxVQUFVLElBQUksR0FBRyxNQUFNO0FBQ2pELFlBQUksVUFBVSxPQUFPLEVBQUUsUUFBUSxNQUFNLGFBQWM7QUFBQSxNQUNwRDtBQUFBLElBQ1AsT0FBVztBQUNMLHdCQUFrQixZQUFZLGNBQWMsUUFBUSxRQUFRLE9BQU8sV0FBVyxjQUFjLFdBQVcsU0FBUyxPQUFPLFlBQVk7QUFDbkksWUFBTSxXQUFXLGtCQUFrQjtBQUNuQyxVQUFJLGNBQWMsU0FBUyxjQUFjLFVBQVU7QUFDakQsY0FBTSxVQUFVLFNBQVM7QUFDekIsZUFBTyxRQUFRLFlBQVk7QUFDekIsbUJBQVMsWUFBWSxRQUFRLFVBQVU7QUFBQSxRQUN4QztBQUNELGlCQUFTLFlBQVksT0FBTztBQUFBLE1BQzdCO0FBQ0QsYUFBTyxhQUFhLFVBQVUsTUFBTTtBQUFBLElBQ3JDO0FBQ0QsV0FBTztBQUFBO0FBQUEsTUFFTCxTQUFTLE9BQU8sY0FBYyxPQUFPO0FBQUE7QUFBQSxNQUVyQyxTQUFTLE9BQU8sa0JBQWtCLE9BQU87QUFBQSxJQUMvQztBQUFBLEVBQ0c7QUFDSDtBQUlBLE1BQU0sU0FBUyxPQUFPLE1BQU07QUEwUTVCLFNBQVMsV0FBVyxJQUFJLE9BQU8sT0FBTztBQUNwQyxRQUFNLG9CQUFvQixHQUFHLE1BQU07QUFDbkMsTUFBSSxtQkFBbUI7QUFDckIsYUFBUyxRQUFRLENBQUMsT0FBTyxHQUFHLGlCQUFpQixJQUFJLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxLQUFLLEdBQUc7QUFBQSxFQUNsRjtBQUNELE1BQUksU0FBUyxNQUFNO0FBQ2pCLE9BQUcsZ0JBQWdCLE9BQU87QUFBQSxFQUMzQixXQUFVLE9BQU87QUFDaEIsT0FBRyxhQUFhLFNBQVMsS0FBSztBQUFBLEVBQ2xDLE9BQVM7QUFDTCxPQUFHLFlBQVk7QUFBQSxFQUNoQjtBQUNIO0FBRUEsTUFBTSx1QkFBdUIsT0FBTyxNQUFNO0FBQzFDLE1BQU0sY0FBYyxPQUFPLE1BQU07QUFtQ2pDLElBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGNBQWU7QUFlL0MsTUFBTSxlQUFlLE9BQU8sQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixpQkFBaUIsRUFBRTtBQW1FM0YsTUFBTSxZQUFZO0FBQ2xCLFNBQVMsV0FBVyxJQUFJLE1BQU0sTUFBTTtBQUNsQyxRQUFNLFFBQVEsR0FBRztBQUNqQixRQUFNLGNBQWMsU0FBUyxJQUFJO0FBQ2pDLE1BQUksdUJBQXVCO0FBQzNCLE1BQUksUUFBUSxDQUFDLGFBQWE7QUFDeEIsUUFBSSxNQUFNO0FBQ1IsVUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHO0FBQ25CLG1CQUFXLE9BQU8sTUFBTTtBQUN0QixjQUFJLEtBQUssR0FBRyxLQUFLLE1BQU07QUFDckIscUJBQVMsT0FBTyxLQUFLLEVBQUU7QUFBQSxVQUN4QjtBQUFBLFFBQ0Y7QUFBQSxNQUNULE9BQWE7QUFDTCxtQkFBVyxhQUFhLEtBQUssTUFBTSxHQUFHLEdBQUc7QUFDdkMsZ0JBQU0sTUFBTSxVQUFVLE1BQU0sR0FBRyxVQUFVLFFBQVEsR0FBRyxDQUFDLEVBQUU7QUFDdkQsY0FBSSxLQUFLLEdBQUcsS0FBSyxNQUFNO0FBQ3JCLHFCQUFTLE9BQU8sS0FBSyxFQUFFO0FBQUEsVUFDeEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDRCxlQUFXLE9BQU8sTUFBTTtBQUN0QixVQUFJLFFBQVEsV0FBVztBQUNyQiwrQkFBdUI7QUFBQSxNQUN4QjtBQUNELGVBQVMsT0FBTyxLQUFLLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDL0I7QUFBQSxFQUNMLE9BQVM7QUFDTCxRQUFJLGFBQWE7QUFDZixVQUFJLFNBQVMsTUFBTTtBQUNqQixjQUFNLGFBQWEsTUFBTSxZQUFZO0FBQ3JDLFlBQUksWUFBWTtBQUNkLGtCQUFRLE1BQU07QUFBQSxRQUNmO0FBQ0QsY0FBTSxVQUFVO0FBQ2hCLCtCQUF1QixVQUFVLEtBQUssSUFBSTtBQUFBLE1BQzNDO0FBQUEsSUFDRixXQUFVLE1BQU07QUFDZixTQUFHLGdCQUFnQixPQUFPO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0QsTUFBSSx3QkFBd0IsSUFBSTtBQUM5QixPQUFHLG9CQUFvQixJQUFJLHVCQUF1QixNQUFNLFVBQVU7QUFDbEUsUUFBSSxHQUFHLFdBQVcsR0FBRztBQUNuQixZQUFNLFVBQVU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFDSDtBQUNBLE1BQU0sY0FBYztBQUNwQixNQUFNLGNBQWM7QUFDcEIsU0FBUyxTQUFTLE9BQU8sTUFBTSxLQUFLO0FBQ2xDLE1BQUksUUFBUSxHQUFHLEdBQUc7QUFDaEIsUUFBSSxRQUFRLENBQUMsTUFBTSxTQUFTLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFBQSxFQUMvQyxPQUFTO0FBQ0wsUUFBSSxPQUFPLEtBQU0sT0FBTTtBQUN2QixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDLFVBQUksWUFBWSxLQUFLLEdBQUcsR0FBRztBQUN6QjtBQUFBLFVBQ0UsdUNBQXVDLElBQUksbUJBQW1CLEdBQUc7QUFBQSxRQUMzRTtBQUFBLE1BQ087QUFBQSxJQUNGO0FBQ0QsUUFBSSxLQUFLLFdBQVcsSUFBSSxHQUFHO0FBQ3pCLFlBQU0sWUFBWSxNQUFNLEdBQUc7QUFBQSxJQUNqQyxPQUFXO0FBQ0wsWUFBTSxXQUFXLFdBQVcsT0FBTyxJQUFJO0FBQ3ZDLFVBQUksWUFBWSxLQUFLLEdBQUcsR0FBRztBQUN6QixjQUFNO0FBQUEsVUFDSixVQUFVLFFBQVE7QUFBQSxVQUNsQixJQUFJLFFBQVEsYUFBYSxFQUFFO0FBQUEsVUFDM0I7QUFBQSxRQUNWO0FBQUEsTUFDQSxPQUFhO0FBQ0wsY0FBTSxRQUFRLElBQUk7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0g7QUFDQSxNQUFNLFdBQVcsQ0FBQyxVQUFVLE9BQU8sSUFBSTtBQUN2QyxNQUFNLGNBQWMsQ0FBQTtBQUNwQixTQUFTLFdBQVcsT0FBTyxTQUFTO0FBQ2xDLFFBQU0sU0FBUyxZQUFZLE9BQU87QUFDbEMsTUFBSSxRQUFRO0FBQ1YsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJLE9BQU8sU0FBUyxPQUFPO0FBQzNCLE1BQUksU0FBUyxZQUFZLFFBQVEsT0FBTztBQUN0QyxXQUFPLFlBQVksT0FBTyxJQUFJO0FBQUEsRUFDL0I7QUFDRCxTQUFPLFdBQVcsSUFBSTtBQUN0QixXQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLO0FBQ3hDLFVBQU0sV0FBVyxTQUFTLENBQUMsSUFBSTtBQUMvQixRQUFJLFlBQVksT0FBTztBQUNyQixhQUFPLFlBQVksT0FBTyxJQUFJO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0QsU0FBTztBQUNUO0FBRUEsTUFBTSxVQUFVO0FBQ2hCLFNBQVMsVUFBVSxJQUFJLEtBQUssT0FBTyxPQUFPLFVBQVVnQixhQUFZLHFCQUFxQixHQUFHLEdBQUc7QUFDekYsTUFBSSxTQUFTLElBQUksV0FBVyxRQUFRLEdBQUc7QUFDckMsUUFBSSxTQUFTLE1BQU07QUFDakIsU0FBRyxrQkFBa0IsU0FBUyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztBQUFBLElBQzVELE9BQVc7QUFDTCxTQUFHLGVBQWUsU0FBUyxLQUFLLEtBQUs7QUFBQSxJQUN0QztBQUFBLEVBQ0wsT0FBUztBQUNMLFFBQUksU0FBUyxRQUFRQSxjQUFhLENBQUMsbUJBQW1CLEtBQUssR0FBRztBQUM1RCxTQUFHLGdCQUFnQixHQUFHO0FBQUEsSUFDNUIsT0FBVztBQUNMLFNBQUc7QUFBQSxRQUNEO0FBQUEsUUFDQUEsYUFBWSxLQUFLLFNBQVMsS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJO0FBQUEsTUFDM0Q7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUNIO0FBRUEsU0FBUyxhQUFhLElBQUksS0FBSyxPQUFPLGlCQUFpQjtBQUNyRCxNQUFJLFFBQVEsZUFBZSxRQUFRLGVBQWU7QUFDaEQsUUFBSSxTQUFTLEtBQU07QUFDbkIsT0FBRyxHQUFHLElBQUk7QUFDVjtBQUFBLEVBQ0Q7QUFDRCxRQUFNLE1BQU0sR0FBRztBQUNmLE1BQUksUUFBUSxXQUFXLFFBQVE7QUFBQSxFQUMvQixDQUFDLElBQUksU0FBUyxHQUFHLEdBQUc7QUFDbEIsVUFBTSxXQUFXLFFBQVEsV0FBVyxHQUFHLGFBQWEsT0FBTyxLQUFLLEtBQUssR0FBRztBQUN4RSxVQUFNLFdBQVcsU0FBUyxPQUFPLEtBQUssT0FBTyxLQUFLO0FBQ2xELFFBQUksYUFBYSxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQzlDLFNBQUcsUUFBUTtBQUFBLElBQ1o7QUFDRCxRQUFJLFNBQVMsTUFBTTtBQUNqQixTQUFHLGdCQUFnQixHQUFHO0FBQUEsSUFDdkI7QUFDRCxPQUFHLFNBQVM7QUFDWjtBQUFBLEVBQ0Q7QUFDRCxNQUFJLGFBQWE7QUFDakIsTUFBSSxVQUFVLE1BQU0sU0FBUyxNQUFNO0FBQ2pDLFVBQU0sT0FBTyxPQUFPLEdBQUcsR0FBRztBQUMxQixRQUFJLFNBQVMsV0FBVztBQUN0QixjQUFRLG1CQUFtQixLQUFLO0FBQUEsSUFDakMsV0FBVSxTQUFTLFFBQVEsU0FBUyxVQUFVO0FBQzdDLGNBQVE7QUFDUixtQkFBYTtBQUFBLElBQ25CLFdBQWUsU0FBUyxVQUFVO0FBQzVCLGNBQVE7QUFDUixtQkFBYTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0QsTUFBSTtBQUNGLE9BQUcsR0FBRyxJQUFJO0FBQUEsRUFDWCxTQUFRLEdBQUc7QUFDVixRQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsQ0FBQyxZQUFZO0FBQzVEO0FBQUEsUUFDRSx3QkFBd0IsR0FBRyxTQUFTLElBQUksYUFBYSxZQUFZLEtBQUs7QUFBQSxRQUN0RTtBQUFBLE1BQ1I7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUNELGdCQUFjLEdBQUcsZ0JBQWdCLEdBQUc7QUFDdEM7QUFFQSxTQUFTLGlCQUFpQixJQUFJLE9BQU8sU0FBUyxTQUFTO0FBQ3JELEtBQUcsaUJBQWlCLE9BQU8sU0FBUyxPQUFPO0FBQzdDO0FBQ0EsU0FBUyxvQkFBb0IsSUFBSSxPQUFPLFNBQVMsU0FBUztBQUN4RCxLQUFHLG9CQUFvQixPQUFPLFNBQVMsT0FBTztBQUNoRDtBQUNBLE1BQU0sU0FBUyxPQUFPLE1BQU07QUFDNUIsU0FBUyxXQUFXLElBQUksU0FBUyxXQUFXLFdBQVcsV0FBVyxNQUFNO0FBQ3RFLFFBQU0sV0FBVyxHQUFHLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFBO0FBQzdDLFFBQU0sa0JBQWtCLFNBQVMsT0FBTztBQUN4QyxNQUFJLGFBQWEsaUJBQWlCO0FBQ2hDLG9CQUFnQixRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsbUJBQW1CLFdBQVcsT0FBTyxJQUFJO0FBQUEsRUFDakgsT0FBUztBQUNMLFVBQU0sQ0FBQyxNQUFNLE9BQU8sSUFBSSxVQUFVLE9BQU87QUFDekMsUUFBSSxXQUFXO0FBQ2IsWUFBTSxVQUFVLFNBQVMsT0FBTyxJQUFJO0FBQUEsUUFDbEMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGdCQUFnQixtQkFBbUIsV0FBVyxPQUFPLElBQUk7QUFBQSxRQUNyRjtBQUFBLE1BQ1I7QUFDTSx1QkFBaUIsSUFBSSxNQUFNLFNBQVMsT0FBTztBQUFBLElBQzVDLFdBQVUsaUJBQWlCO0FBQzFCLDBCQUFvQixJQUFJLE1BQU0saUJBQWlCLE9BQU87QUFDdEQsZUFBUyxPQUFPLElBQUk7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDSDtBQUNBLE1BQU0sb0JBQW9CO0FBQzFCLFNBQVMsVUFBVSxNQUFNO0FBQ3ZCLE1BQUk7QUFDSixNQUFJLGtCQUFrQixLQUFLLElBQUksR0FBRztBQUNoQyxjQUFVLENBQUE7QUFDVixRQUFJO0FBQ0osV0FBTyxJQUFJLEtBQUssTUFBTSxpQkFBaUIsR0FBRztBQUN4QyxhQUFPLEtBQUssTUFBTSxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNO0FBQzlDLGNBQVEsRUFBRSxDQUFDLEVBQUUsWUFBYSxDQUFBLElBQUk7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFDRCxRQUFNLFFBQVEsS0FBSyxDQUFDLE1BQU0sTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUN2RSxTQUFPLENBQUMsT0FBTyxPQUFPO0FBQ3hCO0FBQ0EsSUFBSSxZQUFZO0FBQ2hCLE1BQU0sSUFBb0Isd0JBQVE7QUFDbEMsTUFBTSxTQUFTLE1BQU0sY0FBYyxFQUFFLEtBQUssTUFBTSxZQUFZLENBQUMsR0FBRyxZQUFZLEtBQUssSUFBSztBQUN0RixTQUFTLGNBQWMsY0FBYyxVQUFVO0FBQzdDLFFBQU0sVUFBVSxDQUFDLE1BQU07QUFDckIsUUFBSSxDQUFDLEVBQUUsTUFBTTtBQUNYLFFBQUUsT0FBTyxLQUFLO0lBQ2YsV0FBVSxFQUFFLFFBQVEsUUFBUSxVQUFVO0FBQ3JDO0FBQUEsSUFDRDtBQUNEO0FBQUEsTUFDRSw4QkFBOEIsR0FBRyxRQUFRLEtBQUs7QUFBQSxNQUM5QztBQUFBLE1BQ0E7QUFBQSxNQUNBLENBQUMsQ0FBQztBQUFBLElBQ1I7QUFBQSxFQUNBO0FBQ0UsVUFBUSxRQUFRO0FBQ2hCLFVBQVEsV0FBVztBQUNuQixTQUFPO0FBQ1Q7QUFDQSxTQUFTLG1CQUFtQixPQUFPLFVBQVU7QUFDM0MsTUFBSSxXQUFXLEtBQUssS0FBSyxRQUFRLEtBQUssR0FBRztBQUN2QyxXQUFPO0FBQUEsRUFDUjtBQUNEO0FBQUEsSUFDRSx5Q0FBeUMsUUFBUTtBQUFBLHlEQUNJLE9BQU8sS0FBSztBQUFBLEVBQ3JFO0FBQ0UsU0FBTztBQUNUO0FBQ0EsU0FBUyw4QkFBOEIsR0FBRyxPQUFPO0FBQy9DLE1BQUksUUFBUSxLQUFLLEdBQUc7QUFDbEIsVUFBTSxlQUFlLEVBQUU7QUFDdkIsTUFBRSwyQkFBMkIsTUFBTTtBQUNqQyxtQkFBYSxLQUFLLENBQUM7QUFDbkIsUUFBRSxXQUFXO0FBQUEsSUFDbkI7QUFDSSxXQUFPLE1BQU07QUFBQSxNQUNYLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVksTUFBTSxHQUFHLEVBQUU7QUFBQSxJQUNqRDtBQUFBLEVBQ0EsT0FBUztBQUNMLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUFFQSxNQUFNLGFBQWEsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU0sT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNO0FBQy9FLElBQUksV0FBVyxDQUFDLElBQUksTUFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJO0FBQzlDLE1BQU0sWUFBWSxDQUFDLElBQUksS0FBSyxXQUFXLFdBQVcsV0FBVyxvQkFBb0I7QUFDL0UsUUFBTSxRQUFRLGNBQWM7QUFDNUIsTUFBSSxRQUFRLFNBQVM7QUFDbkIsZUFBVyxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQ25DLFdBQWEsUUFBUSxTQUFTO0FBQzFCLGVBQVcsSUFBSSxXQUFXLFNBQVM7QUFBQSxFQUN2QyxXQUFhLEtBQUssR0FBRyxHQUFHO0FBQ3BCLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHO0FBQ3pCLGlCQUFXLElBQUksS0FBSyxXQUFXLFdBQVcsZUFBZTtBQUFBLElBQzFEO0FBQUEsRUFDRixXQUFVLElBQUksQ0FBQyxNQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLFFBQVEsSUFBSSxDQUFDLE1BQU0sT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsU0FBUyxnQkFBZ0IsSUFBSSxLQUFLLFdBQVcsS0FBSyxHQUFHO0FBQ2xKLGlCQUFhLElBQUksS0FBSyxTQUFTO0FBQy9CLFFBQUksQ0FBQyxHQUFHLFFBQVEsU0FBUyxHQUFHLE1BQU0sUUFBUSxXQUFXLFFBQVEsYUFBYSxRQUFRLGFBQWE7QUFDN0YsZ0JBQVUsSUFBSSxLQUFLLFdBQVcsT0FBTyxpQkFBaUIsUUFBUSxPQUFPO0FBQUEsSUFDdEU7QUFBQSxFQUNMLE9BQVM7QUFDTCxRQUFJLFFBQVEsY0FBYztBQUN4QixTQUFHLGFBQWE7QUFBQSxJQUN0QixXQUFlLFFBQVEsZUFBZTtBQUNoQyxTQUFHLGNBQWM7QUFBQSxJQUNsQjtBQUNELGNBQVUsSUFBSSxLQUFLLFdBQVcsS0FBSztBQUFBLEVBQ3BDO0FBQ0g7QUFDQSxTQUFTLGdCQUFnQixJQUFJLEtBQUssT0FBTyxPQUFPO0FBQzlDLE1BQUksT0FBTztBQUNULFFBQUksUUFBUSxlQUFlLFFBQVEsZUFBZTtBQUNoRCxhQUFPO0FBQUEsSUFDUjtBQUNELFFBQUksT0FBTyxNQUFNLFdBQVcsR0FBRyxLQUFLLFdBQVcsS0FBSyxHQUFHO0FBQ3JELGFBQU87QUFBQSxJQUNSO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJLFFBQVEsZ0JBQWdCLFFBQVEsZUFBZSxRQUFRLGFBQWE7QUFDdEUsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJLFFBQVEsUUFBUTtBQUNsQixXQUFPO0FBQUEsRUFDUjtBQUNELE1BQUksUUFBUSxVQUFVLEdBQUcsWUFBWSxTQUFTO0FBQzVDLFdBQU87QUFBQSxFQUNSO0FBQ0QsTUFBSSxRQUFRLFVBQVUsR0FBRyxZQUFZLFlBQVk7QUFDL0MsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJLFFBQVEsV0FBVyxRQUFRLFVBQVU7QUFDdkMsVUFBTSxNQUFNLEdBQUc7QUFDZixRQUFJLFFBQVEsU0FBUyxRQUFRLFdBQVcsUUFBUSxZQUFZLFFBQVEsVUFBVTtBQUM1RSxhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRCxNQUFJLFdBQVcsR0FBRyxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3RDLFdBQU87QUFBQSxFQUNSO0FBQ0QsU0FBTyxPQUFPO0FBQ2hCO0FBK3JCQSxNQUFNLGtCQUFrQyx1QkFBTyxFQUFFLFVBQVcsR0FBRSxPQUFPO0FBQ3JFLElBQUk7QUFFSixTQUFTLGlCQUFpQjtBQUN4QixTQUFPLGFBQWEsV0FBVyxlQUFlLGVBQWU7QUFDL0Q7QUFZQSxNQUFNLFlBQVksSUFBSSxTQUFTO0FBQzdCLFFBQU1aLE9BQU0sZUFBYyxFQUFHLFVBQVUsR0FBRyxJQUFJO0FBQzlDLE1BQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGVBQWU7QUFDN0MseUJBQXFCQSxJQUFHO0FBQ3hCLCtCQUEyQkEsSUFBRztBQUFBLEVBQy9CO0FBQ0QsUUFBTSxFQUFFLE1BQU8sSUFBR0E7QUFDbEIsRUFBQUEsS0FBSSxRQUFRLENBQUMsd0JBQXdCO0FBQ25DLFVBQU0sWUFBWSxtQkFBbUIsbUJBQW1CO0FBQ3hELFFBQUksQ0FBQyxVQUFXO0FBQ2hCLFVBQU0sWUFBWUEsS0FBSTtBQUN0QixRQUFJLENBQUMsV0FBVyxTQUFTLEtBQUssQ0FBQyxVQUFVLFVBQVUsQ0FBQyxVQUFVLFVBQVU7QUFDdEUsZ0JBQVUsV0FBVyxVQUFVO0FBQUEsSUFDaEM7QUFDRCxjQUFVLFlBQVk7QUFDdEIsVUFBTSxRQUFRLE1BQU0sV0FBVyxPQUFPLHFCQUFxQixTQUFTLENBQUM7QUFDckUsUUFBSSxxQkFBcUIsU0FBUztBQUNoQyxnQkFBVSxnQkFBZ0IsU0FBUztBQUNuQyxnQkFBVSxhQUFhLGNBQWMsRUFBRTtBQUFBLElBQ3hDO0FBQ0QsV0FBTztBQUFBLEVBQ1g7QUFDRSxTQUFPQTtBQUNUO0FBZ0JBLFNBQVMscUJBQXFCLFdBQVc7QUFDdkMsTUFBSSxxQkFBcUIsWUFBWTtBQUNuQyxXQUFPO0FBQUEsRUFDUjtBQUNELE1BQUksT0FBTyxrQkFBa0IsY0FBYyxxQkFBcUIsZUFBZTtBQUM3RSxXQUFPO0FBQUEsRUFDUjtBQUNIO0FBQ0EsU0FBUyxxQkFBcUJBLE1BQUs7QUFDakMsU0FBTyxlQUFlQSxLQUFJLFFBQVEsZUFBZTtBQUFBLElBQy9DLE9BQU8sQ0FBQyxRQUFRLFVBQVUsR0FBRyxLQUFLLFNBQVMsR0FBRyxLQUFLLFlBQVksR0FBRztBQUFBLElBQ2xFLFVBQVU7QUFBQSxFQUNkLENBQUc7QUFDSDtBQUNBLFNBQVMsMkJBQTJCQSxNQUFLO0FBQ2xCO0FBQ25CLFVBQU0sa0JBQWtCQSxLQUFJLE9BQU87QUFDbkMsV0FBTyxlQUFlQSxLQUFJLFFBQVEsbUJBQW1CO0FBQUEsTUFDbkQsTUFBTTtBQUNKLGVBQU87QUFBQSxNQUNSO0FBQUEsTUFDRCxNQUFNO0FBQ0o7QUFBQSxVQUNFO0FBQUEsUUFDVjtBQUFBLE1BQ087QUFBQSxJQUNQLENBQUs7QUFDRCxVQUFNLGtCQUFrQkEsS0FBSSxPQUFPO0FBQ25DLFVBQU0sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUlaLFdBQU8sZUFBZUEsS0FBSSxRQUFRLG1CQUFtQjtBQUFBLE1BQ25ELE1BQU07QUFDSixhQUFLLEdBQUc7QUFDUixlQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0QsTUFBTTtBQUNKLGFBQUssR0FBRztBQUFBLE1BQ1Q7QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNGO0FBQ0g7QUFDQSxTQUFTLG1CQUFtQixXQUFXO0FBQ3JDLE1BQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsVUFBTSxNQUFNLFNBQVMsY0FBYyxTQUFTO0FBQzVDLFFBQUksQ0FBQyxFQUFFLFFBQVEsSUFBSSxhQUFhLGlCQUFpQixDQUFDLEtBQUs7QUFDckQ7QUFBQSxRQUNFLCtDQUErQyxTQUFTO0FBQUEsTUFDaEU7QUFBQSxJQUNLO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxpQkFBaUIsT0FBTyxjQUFjLHFCQUFxQixPQUFPLGNBQWMsVUFBVSxTQUFTLFVBQVU7QUFDM0k7QUFBQSxNQUNFO0FBQUEsSUFDTjtBQUFBLEVBQ0c7QUFDRCxTQUFPO0FBQ1Q7QUNwa0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQSxTQUFTLFVBQVU7QUFDakI7QUFDRTtFQUNEO0FBQ0g7QUFFQSxJQUFJLENBQUMsRUFBRSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzdDO0FBQ0Y7Ozs7Ozs7OztBQ05FLFNBQUEsWUFBQSxNQUFBLFFBQUE7Ozs7QUNFRixNQUFNLE1BQU0sTUFBTSxVQUFVLEdBQUc7QUFFL0IsTUFBcUIsb0JBQW9CYSxPQUFBQSxPQUFPO0FBQUEsRUFFOUMsTUFBTSxTQUFTO0FBQ2IsU0FBSyxTQUFTLDBjQUEwYztBQUN4ZCxTQUFLLFFBQVE7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE1BQU0sRUFBRSxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQUEsUUFDOUIsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU0sQ0FBQztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFPO0FBRVgsYUFBSyxRQUFRLEtBQUs7QUFDYixhQUFBLFFBQVEsTUFBTSxTQUFTO0FBQzVCLG1CQUFXLE1BQU07QUFDWCxnQkFBRSxNQUFNLEtBQUssT0FBTztBQUFBLFdBQ3ZCLEdBQUc7QUFBQSxNQUNSO0FBQUEsTUFDQSxVQUFVO0FBQ1IsZ0JBQVEsSUFBSSx3QkFBd0I7QUFBQSxNQUN0QztBQUFBLElBQUEsQ0FDRDtBQUFBLEVBQ0g7QUFFRjs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNF19
