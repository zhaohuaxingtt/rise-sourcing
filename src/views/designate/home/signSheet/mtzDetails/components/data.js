/*
 * @Author: youyuan
 * @Date: 2021-11-06 18:19:25
 * @LastEditTime: 2021-11-10 10:11:09
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
  {props: 'id', name: '申请单号', key: 'SHENQINGDANHAO'},
  {props: 'ttNominateAppId', name: '关联申请单号', key: 'GUANLIANSHENQINGDANHAO', width: 150},
  {props: 'appName', name: 'MTZ申请单名', key: 'MTZSHENQINGDANMING', width: 150, tooltip: true},
  {props: 'appType', name: '申请类型', key: 'SHENQINGLEIXING'},
  {props: 'flowType', name: '流程类型', key: 'LIUCHENGLEIXING'},
  {props: 'appStatus', name: '状态', key: 'ZHUANGTAI'},
  {props: 'appStatusName', name: '会议', key: 'HUIYI'},
  {props: 'freezeDate', name: '冻结时间', key: 'DONGJIERIQI'},
  {props: 'nominateDate', name: '定点时间', key: 'DINGDIANSHIJIAN'},
  {props: 'buyer', name: '采购员', key: 'CAIGOUYUAN'},
  {props: 'linieDeptName', name: '科室', key: 'KESHI'},
]