function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue, map = new WeakMap()) {
  // Symbol类型
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }
  // 函数
  if (typeof originValue === "function") {
    return originValue;
  }
  // 非对象
  if (!isObject(originValue)) {
    return originValue;
  }
  // 引用类型
  if (map.has(originValue)) {
    return map.get(originValue);
  }
  // Set类型
  if (originValue instanceof Set) {
    const newSet = new Set();
    map.set(originValue, newSet);
    originValue.forEach((value) => {
      newSet.add(deepClone(value, map));
    });
    return newSet;
  }
  // Map类型
  if (originValue instanceof Map) {
    const newMap = new Map();
    map.set(originValue, newMap);
    originValue.forEach((value, key) => {
      newMap.set(deepClone(key, map), deepClone(value, map));
    });
    return newMap;
  }
  // 普通对象和数组
  const newObj = Array.isArray(originValue) ? [] : {};
  map.set(originValue, newObj);
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key], map);
  }
  // 处理key为Symbol类型的属性
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const skey of symbolKeys) {
    const newKey = Symbol(skey.description);
    newObj[newKey] = deepClone(originValue[skey], map);
  }
  return newObj;
}

// #region tip: 测试代码
let s1 = Symbol("s1s1s1");
let s2 = Symbol("s2s2s2");
let a = { test: "feng" };
const obj = {
  name: "feng",
  address: {
    city: "广州",
    arr: [123, 89, [1, 2, 3]],
  },
  foo: function () {
    console.log("foo");
  },
  [s1]: "s1s1s1",
  s2: s2,
  set: new Set([1, 2, 3, a]),
  map: new Map([[a, a]]),
};
obj.info = obj;
const newObj = deepClone(obj);
// console.log(obj);
console.log(newObj);
// #endregion
