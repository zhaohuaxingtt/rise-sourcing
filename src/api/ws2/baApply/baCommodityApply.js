import axios from '@/utils/axios';

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