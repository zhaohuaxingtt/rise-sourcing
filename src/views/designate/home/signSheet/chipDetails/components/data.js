/*
 * @Author: youyuan
 * @Date: 2021-11-06 18:19:25
 * @LastEditTime: 2022-12-02 17:08:59
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

// 芯片-规则
export const ruleTableTitle = [
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.'
  },
  {
    // props: 'materialGroup',
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    overlap: true,
    overlapbottom: 'Formal Flag'
  },
  {
    props: 'sapCode',
    name: '供应商编号',
    key: 'GONGYINGSHANGBIANHAO',
    overlap: true,
    overlapbottom: 'Supplier sapCode',
    minWidth: 50
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: '供应商名称',
    overlap: true,
    overlapbottom: 'Supplier Name',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    overlap: true,
    overlapbottom: 'Material Division',
    minWidth: 105
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'LINGJIANHAO',
    overlap: true,
    overlapbottom: 'partNum',
    minWidth: 70
  },
  {
    props: 'partName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    overlap: true,
    overlapbottom: 'partName',
    width: 120
  },
  {
    props: 'amount',
    name: '补差金额',
    key: '补差金额',
    overlap: true,
    overlapbottom: 'amount',
    width: 120
  },
  {
    props: 'currency',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
    width: 60
  },
  {
    props: 'exchangeRate',
    name: '汇率',
    key: 'MTZHUILV',
    overlap: true,
    overlapbottom: 'Exchange Rate',
    width: 110
  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    width: 110
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    width: 110
  }
]