/*
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-08 14:11:06
 * @LastEditTime: 2022-12-01 11:39:43
 * @LastEditors: 余继鹏 917955345@qq.com
 */
export const outputPlanTableTitle = [
  { props: 'pc', name: '年份', key: 'LK_NIANFEN', tooltip: true },
  { props: 'totalOutput', name: 'SUM', key: 'LK_SUM', tooltip: true },
  { props: 'versionNum', name: '版本号', key: 'LK_BANBENHAO', tooltip: true }
]

export const outputRecordTableTitle = [
  { props: 'totalOutput', name: 'SUM', key: 'LK_SUM', tooltip: true },
  { props: 'versionNum', name: '版本号', key: 'LK_BANBENHAO', tooltip: true },
  { props: 'updateReason', name: '更新原因', key: 'LK_GENGXINYUANYIN', tooltip: true }
]

export const volumeTableTitle = [
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
  { props: 'partNameCn', name: '零件名（中）', key: 'LK_LINGJIANMINGCHENGZHONG', tooltip: true },
  { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANMINGDE', tooltip: true },
  // { props: 'd', name: '配置编码', key: 'LK_PEIZHIBIANMA' },
  { props: 'cartypeCategory', name: '车型/车型项目', key: 'CHEXINGORCHEXINGXIANGMU', tooltip: true },
  { props: 'engineType', name: '发动机配置', key: 'LK_FADONGJIPEIZHI', tooltip: true  },
  { props: 'gearType', name: '变速箱配置', key: 'LK_BIANSUXIANGPEIZHI', tooltip: true },
  { props: 'cartypeLevel', name: '等级配置', key: 'LK_DENGJIPEIZHI', tooltip: true },
  { props: 'otherInfo', name: '其他配置', key: 'LK_QITAPEIZHI', tooltip: true },
  { props: 'cartypeLevelRate', name: '配置比例', key: 'LK_PEIZHIBILI', tooltip: true  },
  { props: 'perCarDosage', name: '用量', key: 'LK_YONGLIANG', tooltip: true,type:'input',editable:true }
]
export const carTitle = [
  {props: 'id', name: '配置ID', key: "PEIZHIID", tooltip: true},
  {props: 'cartypeCode', name: '车型编号', key: "CHEXINGBIANHAO", tooltip: true},
  {props: 'engineType', name: '发动机类型', key: "FADONGJILEIXING", tooltip: true},
  {props: 'gearboxName', name: '变速箱型号', key: "BIANSUXIANGXINGHAO", tooltip: true},
  {props: 'batteryCapacity', name: '电池容量', key: "DAINCHIRONGLIANG", tooltip: true},
  {props: 'otherConf', name: '其他配置', key: "QITAPEIZHI", tooltip: true},
  {props: 'cartypeLevel', name: '车型等级', key: "CHEXINGDENGJI", tooltip: true},
  {props: 'cartypeLevelRate', name: '配置比例', key: " PEIZHIBILI", tooltip: true},
]
export const fscarTitle = [
  {props: 'engineType', name: '发动机类型', key: "FADONGJILEIXING", tooltip: true},
  {props: 'gearboxName', name: '变速箱型号', key: "BIANSUXIANGXINGHAO", tooltip: true},
  {props: 'batteryCapacity', name: '电池容量', key: "DAINCHIRONGLIANG", tooltip: true},
  {props: 'otherConf', name: '其他配置', key: "QITAPEIZHI", tooltip: true},
  {props: 'cartypeLevel', name: '车型等级', key: "CHEXINGDENGJI", tooltip: true},
  {props: 'cartypeLevelRate', name: '配置比例', key: " PEIZHIBILI", tooltip: true},
]