/*
 * @Author: your name
 * @Date: 2021-04-12 10:12:38
 * @LastEditTime: 2021-10-14 22:06:27
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\utils\filters.js
 */
export default {
  filters: {
    // 英文 首字母大写
    capitalizeFilter(val) {
      return typeof val === 'string' ? val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase() : val
    },
    // 日期格式化
    dateFilter(val, format = "YYYY-MM-DD HH:mm:ss") {
      return typeof val === 'string' ||  typeof val === 'number' ? window.moment(val).format(format) : val
    },
    // boolean 转 是/否
    boolFilter(val) {
      return typeof val === 'boolean' ? (val ? '是' : '否') : val
    },
    weekFilter(val) {
      return typeof val === 'string' ? window.moment(val).format('YYYY')+'-CW'+ window.moment(val).format('WW'): val
    },
    numberStatusFilter(val) {
      const map = {
        0: '否',
        1: '是'
      }

      return map[val] ? map[val] : val
    },
    // 金额千分位
    thousandsFilter(num, len = 2) {
      num = String(num).replace(/[^0-9.-]/ig, '');
      num = Number(num).toFixed(len);
      const numArray = String(num).split('.');
      numArray[0] = parseFloat(numArray[0]).toLocaleString();
      const value = numArray.join('.');
      return value || 0;
  },
  },
}