module.exports.compare = (propertyName, type = 0) => {
  //按对象的某一个属性进行排序,0升序，1降序
  return function (object1, object2) {
    let value1, value2;
    if (type === 0) {
      value1 = object2[propertyName];
      value2 = object1[propertyName];
    } else {
      value1 = object1[propertyName];
      value2 = object2[propertyName];
    }
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  };
};
