/** 
 *  获取store or 本地数据
 * 
 */
export function getTousandNum(num){
    console.log(num)
    /** 格式化金额数据 */
    if (num === undefined || num === null) return;
    return num.toString().replace(/\d+/, (n) => {
        return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
            return $1 + ","
        })
    })
}

export function delcommafy(num){//去除千分位中的‘，’
    num=num.replace(/,/gi,'');
    return num;
}
