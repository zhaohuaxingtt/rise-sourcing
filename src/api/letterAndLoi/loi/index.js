/*
 * @Author: wentliao
 * @Date: 2021-06-29 10:42:34
 * @Description: LOI相关接口
 */
import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_RFQ)
const requestDownload = axiosDownload(process.env.VUE_APP_RFQ)


// 获取LOI列表数据
export function getloiList(data) {
    return requst({
        url: '/loi/findNomiLoiPage',
        method: "POST",
        data,
    })
  }

  // 确认并提交
  export function confirmSubmitLio(data) {
    return requst({
      url: '/loi/confirmSubmitLio',
      method: 'POST',
      data,
    })
  }

  // /LINE确认
  export function liniefirm(data) {
    return requst({
      url: '/loi/linieConfirmLio',
      method: 'POST',
      data,
    })
  }

  // LINE退回
  export function linieBackLio(data) {
    return requst({
      url: '/loi/linieBackLio',
      method: 'POST',
      data,
    })
  }

  // 撤回 
  export function recallLio(data) {
    return requst({
      url: '/loi/recallLio',
      method: 'POST',
      data,
    })
  }

  // 关闭
  export function closeLoi(data) {
    return requst({
      url: '/loi/closeLoi',
      method: 'POST',
      data,
    })
  }

  // 激活  
  export function activationLoi(data) {
    return requst({
      url: '/loi/activationLoi',
      method: 'POST',
      data,
    })
  }

  // 编辑备注 
  export function editRemarkLoi(data) {
    return requst({
      url: '/loi/editRemarkLoi',
      method: 'POST',
      data,
    })
  }

  // 获取loi详情
  export function findNomiLoiInfo(params) {
    return requst({
      url: '/loi/findNomiLoiInfo',
      method: 'GET',
      params,
    })
  }

  // loi详情修改
  export function editTemplateLoi(data) {
    return requst({
      url: '/loi/editTemplateLoi',
      method: 'POST',
      data,
    })
  }

  // 导出标准LOI  
  export function exportTemplateLoi(params) {
    return requestDownload({
        url: '/loi/exportTemplateLoi',
        method: "GET",
        params,
    })
  }

  // 获取历史LOI 
  export function historyLoiPage(params) {
    return requst({
      url: '/loi/historyLoiPage',
      method: 'GET',
      params,
    })
  }


  // 完成LOI
  export function cfsLoiDone(params) {
    return requst({
      url: '/loi/cfsLoiDone',
      method: 'GET',
      params,
    })
  }

  // 预览列表 
  export function findNomiLoiSingle(id) {
    return requst({
      url: `/loi/findNomiLoiSingle/${id}`,
      method: 'GET',
    })
  }

  // 新增LOI 
  export function addNomiLoi(params) {
    return requst({
      url: '/loi/addNomiLoi',
      method: 'GET',
      params,
    })
  }

  export function getFileDownload(params) {
    const {hostId,fileType} = params;
    return requestDownload({
        url: `/file-histories/download/${hostId}/${fileType}`,
        method: "GET",
    })
  }