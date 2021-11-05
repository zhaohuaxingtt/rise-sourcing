/*
 * @Author: moxuan
 * @Date: 2021-03-05 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import {permissionTitle} from '@/utils'

export const tableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_VIEWBUTTON", [
    {props: 'carTypeProjectZh', name: '车型', key: 'LK_CHEXING'},
    {props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO'},
    {props: 'partNameZh', name: '零件名称', key: 'LK_LINGJIANMINGCHENG'},
    {props: 'action', name: '图纸', key: 'LK_TUZHI',width:80}
])

export const addSupplierTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_NEWRFQROUND_LIST", [
    {props: 'sapNum', name: '供应商SAP号', key: 'LK_GONGYINGSHANGSAPHAO'},
    {props: 'supplierName', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG'},
    {props: 'isMbdl', name: 'MBDL', key: 'LK_MBDL'}
])

export const drawingTitle = [
    {props: 'fileName', name: '文件名称', key: 'LK_WENJIANMINGCHENG'},
]