export function isPhone(phone) {
  let reg = /^1[3456789]\d{9}$/;
  return reg.test(phone)
}

export function isMoney(money) {
  var reg = /^(([1-9][0-9]{0,9}(,\d{3})*)|0)(\.\d{1,2})?$/;
  return reg.test(money)
}

export function isChinese(str) {
  var reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(str)
}

export function isIdCard(id) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(id)
}
