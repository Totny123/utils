function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue) {
  if (!isObject(originValue)) {
    return originValue;
  }
  const newObj = {};
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key]);
  }
  return newObj;
}

// #region tip: 测试代码
const obj = {
  name: "feng",
  address: {
    city: "广州",
    arr: [123],
    fn: function () {},
  },
};

const newObj = deepClone(obj);
obj.address.city = "杭州";
console.log(obj);
console.log(newObj);
// #endregion
