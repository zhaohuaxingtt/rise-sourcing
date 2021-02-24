// 英文 首字母大写
export function capitalizeFilter(val) {
  return typeof val === 'string' ? val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase() : val
}