/*
 * @Author: your name
 * @Date: 2021-04-12 10:12:38
 * @LastEditTime: 2021-05-28 14:50:36
 * @LastEditors: Please set LastEditors
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
    }
  },
}