export const Mul = function(a, b) {//js小数点乘法计算
	var str1 = a.toString(),str2 = b.toString(),m=0;
	try{m += str1.split('.')[1].length;}catch(e){}
	try{m += str2.split('.')[1].length;}catch(e){}
	return Number(str1.replace(".", "")) * Number(str2.replace(".", "")) / Math.pow(10, m)
}

export const numAdd  = function(num1, num2) {//小数点加法运算
  var baseNum, baseNum1, baseNum2;
  try {
  baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
  baseNum1 = 0;
  }
  try {
  baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
  baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
};

export const formatDecimal = function(num, decimal) {//保留小数点后几位，超出截掉
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}