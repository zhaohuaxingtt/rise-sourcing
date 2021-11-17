/** 
 *  获取store or 本地数据
 * 
 */
export function getTousandNum(num){
    /** 格式化金额数据 */
    if (num === undefined || num === null) return;
    return num.toString().replace(/\d+/, (n) => {
        return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
            return $1 + ","
        })
    })
}

export function delcommafy(num){//去除千分位中的‘，’
    num = num + ''
    if(num.includes(',')){
        num=num.replace(/,/gi,'');
        return num;
    } else {
        return num
    }
}

export function NumFormat(value) {  //  金额显示.00格式
    if (!value) return '0.00';
    value = Number(value).toFixed(2)
    var intPart = Math.trunc(value) // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    var floatPart = '.00' // 预定义小数部分
    var value2Array = value.split('.')
    // =2表示数据有小数位
    if (value2Array.length === 2) {
        floatPart = value2Array[1].toString() // 拿到小数部分
        if (floatPart.length === 1) {
            return intPartFormat + '.' + floatPart + '0'
        } else {
            return intPartFormat + '.' + floatPart
        }
    } else {
        return intPartFormat + floatPart
    }
}
/**
 * @description: 处理从列表页面进入 加入从路由进来的参数(寻源概览)
 * @param {*} vm vue对象
 * @param {*} params 需要修改的param对象
 * @param {*} query vue 路由的query
 * @param {*} callback 回调
 * @return {*}
 */
export function setPretreatmentParams(vm, params, query, callback) {
    const acceptKeys = require('@/config/dashboard').acceptKeys || []
    const BooleanKeys = require('@/config/dashboard').BooleanKeys || []
    Object.keys(query).forEach(key => {
        let keyValue = query[key]
        // 处理Boolean值
        if (BooleanKeys.includes(key)) keyValue = keyValue === 'true'
        if (acceptKeys.includes(key)) {
            if (vm) {
                vm.$set(params, key, keyValue)
            } else {
                params[key] = keyValue
            }
        }
        callback && typeof callback === 'function' && (callback({keyName: keyValue, keyValue}))
    })
    return params
}