/*
 * @Author: wentliao
 * @Date: 2021-06-26 12:58:12
 * @Description: 定点信相关接口
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_RFQ)
const requestDownload = axiosDownload(process.env.VUE_APP_RFQ)

// 获取定点信列表数据
export function getLetterList(data) {
    return requst({
        url: '/nominate-letter/page',
        method: "POST",
        data,
    })
  }

  // 定点信列表--前期采购员--确认并提交
  export function fsConfirm(params) {
    return requst({
      url: '/nominate-letter/fs-confirm',
      method: 'GET',
      params,
    })
  }

  // 定点信列表--专业采购员--确认
  export function liniefirm(params) {
    return requst({
      url: '/nominate-letter/linie-confirm',
      method: 'GET',
      params,
    })
  }

  // 定点信列表-- 专业采购员--退回
  export function liniereturn(params) {
    return requst({
      url: '/nominate-letter/linie-return',
      method: 'GET',
      params,
    })
  }

  // 定点信列表-- 撤回 
  export function fsRecall(params) {
    return requst({
      url: '/nominate-letter/fs-recall',
      method: 'GET',
      params,
    })
  }

  // 定点信列表-- 前期采购员--关闭
  export function fsClose(params) {
    return requst({
      url: '/nominate-letter/fs-close',
      method: 'GET',
      params,
    })
  }

  //  定点信列表-- 前期采购员--激活 /web
  export function fsActivate(params) {
    return requst({
      url: '/nominate-letter/fs-activate',
      method: 'GET',
      params,
    })
  }

  // 定点信列表--转派 
  export function transfer(params) {
    return requst({
      url: '/nominate-letter/transfer',
      method: 'GET',
      params,
    })
  }

  // 获取定点信详情
  export function getLetterDetail(params) {
    return requst({
      url: '/nominate-letter/detail',
      method: 'GET',
      params,
    })
  }

  // 获取列表专业采购员及前期采购员列表
  export function getBuyers(params) {
    return requst({
      url: '/buyers',
      method: 'GET',
      params,
    })
  }
  
  // 导出定点信
  export function downloadLetterFile(params) {
    return requestDownload({
        url: '/nominate-letter/standard-nominate-letter',
        method: "GET",
        params,
    })
  }