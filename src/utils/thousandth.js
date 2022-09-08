Vue.prototype.$postThousandth = function (num){//下拉框国际化
    if(!num){
        return ''
    };
    const decimal = num.toString().split(".")[1]
    console.log(decimal)
    let value=Number(num)
    console.log(value)
    // 获取整数部分
    const intPart = Math.trunc(value)
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

    let newThousandth = "";
    // 预定义小数部分
    // 将数值截取为小数部分和整数部分
    if(decimal){
        newThousandth = intPartFormat + "." + decimal;
    }else{
        newThousandth = intPartFormat + ".00";
    }
    
    return newThousandth
}

export default Vue.prototype.$postThousandth