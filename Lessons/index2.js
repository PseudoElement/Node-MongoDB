function someFunc(arr) {
    const result = arr.reduce((result, el) => {
      console.log(el, result);
      return result + el;
    }, 0);
    console.log(result);
  // let result = 0
  // arr.forEach((el) => {
  //   console.log(el, result);
  //   result = el + result;
  // });
  // return result;.
  //   console.log(Math.min.apply(Math, arr) + 2);
}
// someFunc([1, 5, 9, 100000]);
const anyConst = `COnstant`;
// module.exports.someFunc = someFunc;
// module.exports.anyConst = anyConst;
module.exports = {
  someFunc: function (arr) {
    someFunc(arr);
  },
  someFunc2variant(arr) {
    someFunc(arr);
  },
  calcArrayLength: function (array) {
    const info = `В массиве находится ${array.length} элемент`;
    if (array.length == 0 || array.length >= 5) {
      return `${info}ов!`;
    }
    if (array.length == 1) {
      return `${info}!`;
    }
    if (array.length < 5) {
      return `${info}a!`;
    }
  },
  multiply: function (x, y) {
    return `${x} умножить на ${y} равно ${x * y}`;
  },
  some_value: 451,
  anyConst: anyConst,
};
