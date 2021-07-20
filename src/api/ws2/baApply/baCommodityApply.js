import axios from '@/utils/axios';
import axiosFile from '@/utils/axios.download'
const requstFile = axiosFile(process.env.VUE_APP_BACOMMODITYAPPLY)

const VUE_APP_BACOMMODITYAPPLY = axios(process.env.VUE_APP_BACOMMODITYAPPLY);

//  明细列表
export function getDetail(parmars) {
  return VUE_APP_BACOMMODITYAPPLY({
      url: '/detail',
      method: 'POST',
      data: parmars
  })
}

//  BA申请确认
export function baConfirm(parmars) {
  return VUE_APP_BACOMMODITYAPPLY({
      url: '/baConfirm',
      method: 'POST',
      data: parmars
  })
}

//  文件下载
// export function downloadExport(parmars) {
//   return VUE_APP_BACOMMODITYAPPLY({
//       url: '/export',
//       method: 'POST',
//       data: parmars
//   })
// }

export function downloadExport(parmars) {
  return requstFile({
    url: '/export',
    method: 'POST',
    data: parmars,
  })
}