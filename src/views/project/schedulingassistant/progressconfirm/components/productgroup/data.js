/*
 * @Author: Luoshuang
 * @Date: 2021-08-02 11:09:43
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 16:27:39
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\productgroup\data.js
 */

export const searchList = [
  {value: 'cartypeProId', name: '车型项目', key: 'CHEXINGXINAGMU', type: 'carProjectSelect', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'productGroup', name: '产品组', key: 'CHANPINZU', type: 'input'},
  {value: 'confirmStatus', name: '确认状态', key: 'QUERENZHUANGTAI', type: 'selectDict', selectOption: 'SCHEDULE_CONFIRM_STATUS'},
  {value: 'fsId', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', type: 'fsSelect', filterable: true, selectOption: 'fsOptions'},
  {value: 'projectPurchaserId', name: '项目采购员', key: 'XIANGMUCAIGOUYUAN', type: 'productPurchaserSelect', filterable: true, selectOption: 'purchaseOptions'}
]

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 120},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'productGroupZh',name:'产品组中文名称', key: "CHANPINZUZHONGWENMINGCHENG", tooltip: true, minWidth: 150},
  {props:'productGroupDe',name:'产品组德文名称', key: "CHANPINZUDEWENMINGCHENG", tooltip: true, minWidth: 150},
  {props:'scheBfToFirstTryoutWeek',name:'BF-1st tryout (周)', key: "BF1STTRYOUTZHOU", tooltip: true, minWidth: 160},
  {props:'scheFirstTryEmWeek',name:'1st tryout-EM (周)', key: "1STTRYOUTEMZHOU", tooltip: true, minWidth: 160},
  {props:'scheFirstTryOtsWeek',name:'1st tryout-OTS (周)', key: "1STTRYOUTOTSZHOU", tooltip: true, minWidth: 160},
  {props:'fs',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, minWidth: 150},
  {props:'confirmStatus',name:'确认状态', key: "QUERENZHUANGTAI", tooltip: true, minWidth: 120},
  {props:'confirmDate',name:'确认时间',key:'QUERENSHIJIAN',tooltip: true, minWidth: 150},
  {props:'remark',name:'备注', key: "BEIZHU", tooltip: true, minWidth: 150},
]