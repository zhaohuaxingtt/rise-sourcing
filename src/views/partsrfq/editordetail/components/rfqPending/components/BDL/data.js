/*
* @author:shujie
* @Date: 2021-3-5 10:56:22
 * @LastEditors: Please set LastEditors
* @Description: BDL列表JS
 */
import {permissionTitle} from '@/utils'
export const tableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQPENDING_LIST_360VIEWCOLUMN",[
    {props:'sapNum',name:'SAP号', key:'LK_SAPHAO', tooltip: true},
    {props:'supplierNameZh',name:'供应商名称', key:'LK_GONGYINGSHANGMINGCHENG', minWidth:80},
    // {props:'pupplierProductionPlace',name:'供应商生产场地', key:'LK_GONGYINGSHANGSHENGCHANCHANGDI', tooltip: true}, // sp10去除
    {props:'bdlType',name:'MBDL', key: 'LK_MBDL', tooltip: true},
    {props:'isCheckCbd',name:'是否验证CBD', key: 'LK_SHIFOUYANZHENGCBD', tooltip: true},
    {props:'supplierQualityGrade',name:'质量', key: 'LK_ZHILIANG', tooltip: true},
    {props:'supplierCostGrade',name:'成本', key: 'LK_CHENGBEN', tooltip: true},
    {props:'supplierDeliverGrade',name:'交付', key: 'LK_JIAOFU', tooltip: true},
    {props:'i',name:'供应商360°视图', key: 'LK_GONGYINGSHANG360SHITU'}
  ])
