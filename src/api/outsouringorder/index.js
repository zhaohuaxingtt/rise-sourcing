/*
 * @Author: arthur
 * @Date: 2022-05-22 14:53:52
 * @LastEditTime: 2021-11-06 14:14:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\steelDemandCreation\home\index.js
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_PURCHASE)
const downLoad = download(process.env.VUE_APP_PURCHASE)
const requstPartResource = axios(process.env.VUE_APP_BASE_INFO + '/web')
const INVESTMENT = axios(process.env.VUE_APP_TOOLING + '/investment')

/**
 * @description: 采购申请列表分页查询接口
 * @param {*} parmars
 * @return {*}
 */
export function outsouringFindBypage(parmars) {
 return requst({
  url: '/pr/normalPr/findByPage',
  method: 'POST',
  data: parmars
 })
}

/**
 * @description: 采购申请签收--删除工序委外
 * @param {*} parmars
 * @return {*}
 */
export function deleteOutSouring(parmars) {
 return requst({
  url: '/pr/normalPr/outsourcing/delete',
  method: 'POST',
  data: parmars
 })
}

/**
 * @description: 采购申请退回--工序委外
 * @param {*} parmars
 * @return {*}
 */
export function rejectByLinie(parmars) {
 return requst({
  url: '/pr/normalPr/outsourcing/rejectByLinie',
  method: 'POST',
  data: parmars
 })
}


/**
 * @description: 发送采购员--工序委外
 * @param {*} parmars
 * @return {*}
 */
export function sendLinie(parmars) {
 return requst({
  url: '/pr/normalPr/outsourcing/sendLinie',
  method: 'POST',
  data: parmars
 })
}


/**
 * @description: 采购申请退回--工序委外
 * @param {*} parmars
 * @return {*}
 */
export function signByLinie(parmars) {
 return requst({
  url: '/pr/normalPr/outsourcing/signByLinie',
  method: 'POST',
  data: parmars
 })
}


/**
 * @description: 采购申请关闭--工序委外
 * @param {*} parmars
 * @return {*}
 */
export function closeOutSouringOrder(parmars) {
 return requst({
  url: '/pr/normalPr/outsourcing/close',
  method: 'POST',
  data: parmars
 })
}


// 数据字典
export function dictkey(params) {
 return requstPartResource({
  url: '/selectDictKey',
  method: 'GET',
  params: params
 })
}

//获取linie下拉
export function liniePullDownByDept(parmars) {
 return INVESTMENT({
  url: '/liniePullDownByDept',
  method: 'POST',
  data: parmars
 })
}