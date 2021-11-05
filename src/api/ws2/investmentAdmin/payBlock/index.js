/**
 * @author: shujie
 * @createTime: 2021-5-26 17:39:32
 * @Description:深评财报分析
 */
 import axios from '@/utils/axios';

 const requst = axios(process.env.VUE_APP_PLANDASHBOARD)
 
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
 