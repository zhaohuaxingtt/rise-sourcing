/** 
 *  获取store or 本地数据
 * 
 */
export default {
    /** 格式化金额数据 */
    getTousandNum(num) {
        if (num === undefined) return;
        return num.toString().replace(/\d+/, (n) => {
            return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
                return $1 + ","
            })
        })
    },
    /** 
     * 睡眠多少秒循环
     */
    sleepLoop(polltime) {
        const maxPollTime = 100;
        const stepSleepTime = 1000;
        const maxSleepTime = 10 * 1000;
        return new Promise((resolve, reject) => {
            if (polltime > maxPollTime) throw new Error(`loop times more than ${maxPollTime}.`);

        })
    },
    /** 时间格式转换 */
    translateDate(dateStr, type) {
        if (type === 'timestamp') {
            window.moment(dateStr).valueOf();
        }
    },
    // getStoreDataOrLocalData(Data) {
    //     const l = this.$store.state.rfq[Data].length;
    //     if (l > 0) {
    //         return this.$store.state.rfq[Data]
    //     } else {

    //     }
    // },
    dispatchEventStroage() {
        const signSetItem = localStorage.setItem;
        localStorage.setItem = function(key, val) {
            let setEvent = new Event('setItemEvent')
            setEvent.key = key
            setEvent.newValue = val
            window.dispatchEvent(setEvent)
            signSetItem.apply(this, arguments)
        }
    },
    /**
     ** 加法函数，用来得到精确的加法结果
     ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     ** 调用：accAdd(arg1,arg2)
     ** 返回值：arg1加上arg2的精确结果
     **/
    accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    /**
     ** 减法函数，用来得到精确的减法结果
     ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
     ** 调用：accSub(arg1,arg2)
     ** 返回值：arg1加上arg2的精确结果
     **/
    accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     ** 乘法函数，用来得到精确的乘法结果
     ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     ** 调用：accMul(arg1,arg2)
     ** 返回值：arg1乘以 arg2的精确结果
     **/
    accMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) { console.error(e); }
        try {
            m += s2.split(".")[1].length;
        } catch (e) { console.error(e); }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    // 修复JS加减乘除精度损失问题， 支持字符串相加， 如果是负数最好括号再调用该方法或定义成变量 
    // 一般使用: var a = 0.1; var b = a.add(0.2).subtract(0.05).multiply(20).divide(30);
    // 字符串使用如: "-35.4".add("35.4")   负数数字相加: (-35.4).add(35.4) 或 35.4.add((-35.4)) 
    calc() {
        Number.prototype.add = function(a) {
            return maths.apply(null, [this, a, 1]);
        }
        String.prototype.add = Number.prototype.add;

        Number.prototype.subtract = function(a) {
            return maths.apply(null, [this, a, 2]);
        }
        String.prototype.subtract = Number.prototype.subtract;

        Number.prototype.multiply = function(a) {
            return maths.apply(null, [this, a, 3]);
        }
        String.prototype.multiply = Number.prototype.multiply;

        Number.prototype.divide = function(a) {
            return maths.apply(null, [this, a, 4]);
        }
        String.prototype.divide = Number.prototype.divide;

        function maths(n1, n2, type) {
            var result, y, a, b, len1, len2, max;
            if (n2 == 0 && type == 4) { return 0 }
            a = String(n1);
            b = String(n2);
            len1 = a.split(".")[1] ? a.split(".")[1].length : 0;
            len2 = b.split(".")[1] ? b.split(".")[1].length : 0;
            max = len1 > len2 ? len1 : len2;
            a = Math.round(a * Math.pow(10, max));
            b = Math.round(b * Math.pow(10, max));
            switch (type) {
                case 1:
                    result = a + b;
                    break;
                case 2:
                    result = a - b;
                    break;
                case 3:
                    result = a * b;
                    break;
                case 4:
                    result = a / b;
                    break;
            }
            if (type == 1 || type == 2) {
                y = max;
            } else if (type == 3) {
                y = max * 2;
            } else {
                y = 0;
            }
            return result / Math.pow(10, y);
        }
    },
    /**
     * 加法
     */
    add(...numbers) {
        this.calc()
        return numbers.reduce((num1, num2) => Number(num1).add(num2))
    },
    /**
     * 减法
     */
    subtract(...numbers) {
        this.calc()
        return numbers.reduce((num1, num2) => Number(num1).subtract(num2))
    },
    /**
     * 乘法
     */
    multiply(...numbers) {
        this.calc()
        return numbers.reduce((num1, num2) => Number(num1).multiply(num2))
    },
    /**
     * 
     * @param  {...any} numbers 除法
     * @returns 
     */
    divide(...numbers) {
        this.calc()
        return numbers.reduce((num1, num2) => Number(num1).divide(num2))
    },
}