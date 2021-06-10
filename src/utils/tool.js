/** 
 *  获取store or 本地数据
 * 
 */
export function getTousandNum(num){
    /** 格式化金额数据 */
    if (num === undefined) return;
    return num.toString().replace(/\d+/, (n) => {
        return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
            return $1 + ","
        })
    })
}