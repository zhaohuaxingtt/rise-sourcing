/*
 * @Author: your name
 * @Date: 2021-07-12 20:18:28
 * @LastEditTime: 2021-11-06 13:04:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\api\ws2\investmentAdmin\payBlock\index.js
 */
/**
 * @author: shujie
 * @createTime: 2021-5-26 17:39:32
 * @Description:深评财报分析
 */
 import axios from '@/utils/axios';

 const requst = axios(process.env.VUE_APP_TOOLING + '/planDashBoard')
 
 // powerBI接口
 export function powerBiUrl() {
     return requst({
         url: '/getPowerBIReportInfo',
         method: 'GET'
     })
 }
 
 // 行业均值名称
 export function averageName() {
     return requst({
         url: '/financialAnalysis/averageName',
         method: 'GET'
     })
 }
 
 // 供应商名称
 export function supplierName() {
     return requst({
         url: '/financialAnalysis/supplierName',
         method: 'GET'
     })
 }
 // 供应商名称
 export function searchSupplierName(e) {
     return requst({
         url: '/financialAnalysis/supplierName/'+e,
         method: 'GET'
     })
 }
 