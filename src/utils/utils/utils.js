/**
 * @desc 是否为正整数
 * @param {any} num 
 * @return  {boolean}
 */
function isInteger(num) {
  if (num || num === 0) {
    return num % 1 === 0;
  } else {
    return false;
  }
}
/**
 * @desc 是否为正数
 * @param {any} num 
 * @return  {boolean}
 */
function isNum(num) {
  var reg = /^[0-9]+.?[0-9]*$/; // 判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
  return reg.test(num);
}

export default {
  isInteger,
  isNum
}