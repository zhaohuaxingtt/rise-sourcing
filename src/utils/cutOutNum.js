/**
 * 对源数据截取decimals位小数，不进行四舍五入
 * @param {*} num 源数据
 * @param {*} decimals 保留的小数位数
 */
export const cutOutNum = (num, decimals) => {
    if (isNaN(num) || (!num && num !== 0)) {
        return '--'
    }
    let dec = decimals ? decimals : 2
    let tempNum = Number(num)
    return tempNum.toFixed(dec)
    // 默认为保留的小数点后两位
    /* let dec = decimals ? decimals : 2
     let tempNum = Number(num)
     let pointIndex = String(tempNum).indexOf('.') + 1 // 获取小数点的位置 + 1
     let pointCount = pointIndex ? String(tempNum).length - pointIndex : 0 // 获取小数点后的个数(需要保证有小数位)
     // 源数据为整数或者小数点后面小于decimals位的作补零处理
     if (pointIndex === 0 || pointCount <= dec) {
         let tempNumA = tempNum
         if (pointIndex === 0) {
             tempNumA = `${tempNumA}.`
             for (let index = 0; index < dec - pointCount; index++) {
                 tempNumA = `${tempNumA}0`
             }
         } else {
             for (let index = 0; index < dec - pointCount; index++) {
                 tempNumA = `${tempNumA}0`
             }
         }
         return tempNumA
     }
     let realVal = ''
     // 截取当前数据到小数点后decimals位
     realVal = `${String(tempNum).split('.')[0]}.${String(tempNum)
         .split('.')[1]
         .substring(0, dec)}`
     // 判断截取之后数据的数值是否为0
     if (realVal == 0) {
         realVal = 0
     }
     return realVal*/
}


export const fixNumber = (num) => {
    if (!num) return null;
    let re = /(?=(?!(\b))(\d{3})+$)/g;
    let fixstr = (num || 0).toString().split(".");
    fixstr[0] = fixstr[0].replace(re, ",");
    if (fixstr[1] && fixstr[1] == '00') return fixstr[0];
    return fixstr.join('.');
}

export function numberToCurrencyNo(value) {
    if (!value) return 0
    // 获取整数部分
    const intPart = Math.trunc(value)
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    // 预定义小数部分
    let floatPart = ''
    // 将数值截取为小数部分和整数部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { // 有小数部分
        floatPart = valueArray[1].toString() // 取得
        // 小数部分
        if (Number(floatPart) != 0) {
            return intPartFormat + '.' + floatPart
        }
    }
    return intPartFormat
}


export function numberToCurrencyNo2(value) {
    if (!value) return 0
    // 获取整数部分
    const intPart = Math.trunc(value)
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    // 预定义小数部分
    let floatPart = ''
    // 将数值截取为小数部分和整数部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { // 有小数部分
        floatPart = valueArray[1].toString() // 取得
        // 小数部分
        if (Number(floatPart) != 0) {
            return intPartFormat + '.' + floatPart
        }else{
            return intPartFormat + '.00'
        }
    }
    return intPartFormat+'.00'
}

//通用千分位
/**
* 参数说明
* @param s：要格式化的数字
* @param n：保留几位小数
* */
export function formatCurrency(s, n) {
    n = n > 0 && n <= 20 ? n : 0; //n大于0小于等于20时，值为n，否则默认为2
    //将要格式化的数字转换成字符串，并去掉其中匹配的其他字符后返回一个浮点数。
    //把 Number 四舍五入为指定位数的数字后，最终在转换成字符串。
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var numArry = s.split("."), //分隔字符串 0 -> 小数点前面数值 1 -> 小数点后面的尾数
        l = numArry[0].split("").reverse(), //将前面数值再分隔，并反转顺序
        t = "";
    for (var i = 0; i < l.length; i++) { //每隔三位小数分始开隔
        t += l[i] + ( (i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "" );
    }
    //将顺序反转回来，并返回一个字符串
    return t.split("").reverse().join("") + "." + numArry[1];
}
