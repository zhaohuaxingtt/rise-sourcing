
export const dateFilter = (val, format = "YYYY-MM-DD HH:mm:ss", sourceFormat) => {
  return typeof val === 'string' ||  typeof val === 'number' ? window.moment(val, sourceFormat).format(format) : val
}