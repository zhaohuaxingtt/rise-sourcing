/*
 * @Author: youyuan
 * @Date: 2021-11-06 18:19:25
 * @LastEditTime: 2021-11-09 16:13:06
 * @LastEditors: Please set LastEditors
 * @Description: 数据
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\data.js
 */
export const tableTitle = [
  {props: 'id', name: '申请单号', key: 'SHENQINGDANHAO'},
  {props: 'appName', name: 'MTZ申请单名称', key: 'MTZSHENQINGDANMINGCHENG', tooltip: true},
  {props: 'flowType', name: '申请类型', key: 'SHENQINGLEIXING'},
  {props: 'appStatus', name: '状态', key: 'ZHUANGTAI'},
  {props: 'appStatusName', name: '会议', key: 'HUIYI'},
  {props: 'rsFreezeDate', name: '冻结日期', key: 'DONGJIERIQI'},
  {props: 'linieDeptName', name: '科室', key: 'KESHI'},
  {props: 'buyer', name: '采购员', key: 'CAIGOUYUAN'},
]
export const detailTableTitle = [
  {props: 'id', name: '申请单号', key: 'SHENQINGDANHAO', width: 120},
  {props: 'ttNominateAppId', name: '关联申请单号', key: 'GUANLIANSHENQINGDANHAO', width: 150},
  {props: 'appName', name: 'MTZ申请单名', key: 'MTZSHENQINGDANMING', width: 150, tooltip: true},
  {props: 'appType', name: '申请类型', key: 'SHENQINGLEIXING', width: 120},
  {props: 'flowType', name: '流程类型', key: 'LIUCHENGLEIXING', width: 120},
  {props: 'appStatus', name: '状态', key: 'ZHUANGTAI', width: 120},
  {props: 'appStatusName', name: '会议', key: 'HUIYI', width: 120},
  {props: 'freezeDate', name: '冻结时间', key: 'DONGJIERIQI', width: 120},
  {props: 'nominateDate', name: '定点时间', key: 'DINGDIANSHIJIAN', width: 120},
  {props: 'buyer', name: '采购员', key: 'CAIGOUYUAN', width: 120},
  {props: 'linieDeptName', name: '科室', key: 'KESHI', width: 120},
  {props: 'isRsFreezed', name: 'RS单状态', key: 'RSDANZHUANGTAI', width: 120},
  {props: 'rsFreezeDate', name: 'RS冻结日期', key: 'RSDONGJIERIQI', width: 120},
]