import axios from '@/utils/axios';

const VUE_APP_APPLY = axios(process.env.VUE_APP_APPLY);

//  ba申请-车型列表
export function findCarTypeList(parmars) {
  return VUE_APP_APPLY({
      url: '/findCarTypeList',
      method: 'POST',
      data: parmars
  })
}