/*
* @author:shujie
* @Date: 2021-3-5 10:56:22
 * @LastEditors: YoHo
* @Description: BDL列表JS
 */
import {permissionTitle} from '@/utils'
export const tableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQPENDING_LIST_360VIEWCOLUMN",[
    {props:'sapCode',name:'供应商编号', key:'GONGYINGSHANGBIANHAO', tooltip: true},
    {props:'supplierNameZh',name:'供应商名称', key:'LK_GONGYINGSHANGMINGCHENG', minWidth:80},
    {props:'i',name:'供应商360°视图', key: 'LK_GONGYINGSHANG360SHITU'},
    // {props:'pupplierProductionPlace',name:'供应商生产场地', key:'LK_GONGYINGSHANGSHENGCHANCHANGDI', tooltip: true}, // sp10去除
    {props:'bdlType',name:'MBDL', key: 'LK_MBDL', tooltip: true},
    {props:'isCheckCbd',name:'CBD层级', key: 'LK_CBDCENGJI', tooltip: true},
    {props:'supplierCostGrade',name:'技术评分', key: 'LK_JISHUPINGFEN', tooltip: true},
    {props:'supplierQualityGrade',name:'质量评分', key: 'LK_ZHILIANGPINGFEN', tooltip: true},
    {props:'supplierDeliverGrade',name:'物流评分', key: 'LK_WULIUPINGFEN', tooltip: true},
  ])
