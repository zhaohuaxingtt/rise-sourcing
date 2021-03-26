export default {
  filters: {
    // 英文 首字母大写
    capitalizeFilter(val) {
      return typeof val === 'string' ? val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase() : val
    },
    dateFilter(val) {
      return typeof val === 'string' ? window.moment(val).format('YYYY-MM-DD HH:mm:ss') : val
    }
  },
}