/*
 * @Author: youyuan
 * @Date: 2021-11-06 18:19:25
 * @LastEditTime: 2022-12-01 14:07:15
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 数据
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\data.js
 */
export const tableTitle = [
  {props: 'ttNominateAppId', name: '申请单号', key: 'SHENQINGDANHAO'},  // 暂时用关联申请单号字段来传递申请单号
  {props: 'appName', name: '申请单名称', key: 'SHENQINGDANMINGCHENG', tooltip: true},
  {props: 'appType', name: '申请类型', key: 'SHENQINGLEIXING'},
  {props: 'flowTypeDesc', name: '流程类型', key: 'LIUCHENGLEIXING'},
  {props: 'appStatusDesc', name: '状态', key: 'ZHUANGTAI'},
  {props: 'meetingName', name: '会议', key: 'HUIYI'},
  {props: 'linieDeptName', name: '科室', key: 'KESHI'},
  {props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN'},
]

export const detailTableTitle = [
  {props: 'appNo', name: '申请单号', key: 'SHENQINGDANHAO'},
  {props: 'appName', name: '申请单名称', key: 'SHENQINGDANMINGCHENG', tooltip: true},
  {props: 'appType', name: '申请类型', key: 'SHENQINGLEIXING'},
  {props: 'flowTypeDesc', name: '流程类型', key: 'LIUCHENGLEIXING'},
  {props: 'appStatusDesc', name: '状态', key: 'ZHUANGTAI'},
  {props: 'meetingName', name: '会议', key: 'HUIYI'},
  {props: 'linieDeptName', name: '科室', key: 'KESHI'},
  {props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN'},
]