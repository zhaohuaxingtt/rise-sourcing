/*
 * @Author: moxuan
 * @Date: 2021-03-05 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import {permissionTitle} from '@/utils'
// export const tableTitle = [
export const tableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_VIEWBUTTON",[
    {props:'carType',name:'车型'},
    {props:'partNum',name:'零件号'},
    {props:'partName',name:'零件名称'},
    {props:'action',name:'图纸'}
])

// export const addSupplierTitle = [
export const addSupplierTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_NEWRFQROUND_LIST",[
    {props:'sapNum',name:'供应商SAP号'},
    {props:'supplierName',name:'供应商名称'},
    {props:'isMbdl',name:'MBDL'}
])