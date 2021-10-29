/*
 * @Autor: Hao,Jiang
 * @Date: 2021-10-28 17:06:50
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-28 17:07:58
 * @Description: 
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PARTS)
const fileRequst = download(process.env.VUE_APP_PARTS)

// 列表查询
export function getApproveDistributionPage(data) {
  return requst({
    url: '/mtz/pageAekoMtz',
    method: 'POST',
    data,
  })
}