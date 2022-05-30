/*
 * @Author: your name
 * @Date: 2021-06-30 13:56:01
 * @LastEditTime: 2022-03-25 14:58:09
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steelDemandCreation\home\components\data.js
 */
import { OutSouring } from '@/config'
export function searchForm(DEPARTMENTLIST = []) {
  return [
    {
      i18nName: 'RiSE编号',
      i18nKey: 'MODEL-ORDER.LK_RISEBIANHAO',
      permissionKey: 'SOURCING_SHENGQINGDANHAO',
      type: 'input',
      List: [],
      moduleKey: 'riseCode'
    },
    {
      i18nName: '零件号',
      i18nKey: 'LINGJIANHAO',
      permissionKey: 'SOURCING_LINGJIANHAO',
      type: 'partNum',
      List: [],
      moduleKey: 'partNumStr'
    },
    {
      i18nName: '零件名称（中）',
      i18nKey: 'LINGJIANMINGCZH',
      permissionKey: 'SOURCING_LINGJIANMINGCZH',
      type: 'input',
      List: [],
      moduleKey: 'partNameZh'
    },
    {
      i18nName: '采购申请类型',
      i18nKey: 'MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING',
      permissionKey: 'SOURCING_LINGJIANCAIGOUXIANGMULEIX',
      type: 'select',
      List: [{ name: '全部', code: '' }, { name: '工序委外一次性采购申请', code: OutSouring.subType1 }, { name: '工序委外框架', code: OutSouring.subType2 }],
      moduleKey: 'subType'
    },
    {
      i18nName: '状态',
      i18nKey: 'LK_ZHUANGTAI',
      permissionKey: 'SOURCING_DAYINGZHUANGTAI',
      type: 'select',
      List: [
        { code: '-2', name: '草稿' },
        { code: '-1', name: '退回' },
        { code: '0', name: '待签收' },
        { code: '1', name: '已创建' },
        { code: '2', name: '已关联订单' },
        { code: '3', name: '订单已推送' },
        { code: '4', name: '已关闭' },
      ],
      moduleKey: 'status'
    },
    {
      i18nName: '采购工厂',
      i18nKey: 'LK_CAIGOUGONGCHANG',
      permissionKey: 'SOURCING_LINGJIANHAO',
      type: 'input',
      List: [],
      moduleKey: 'procureFactory'
    },
    {
      i18nName: '采购员',
      i18nKey: '采购员',
      permissionKey: 'SOURCING_LINGJIANMINGCZH',
      type: 'input',
      List: [],
      moduleKey: 'buyerName'
    },
    {
      i18nName: '科室',
      i18nKey: '科室',
      permissionKey: 'SOURCING_FSNRGSNR',
      type: 'input',
      List: [],
      moduleKey: 'deptName'
    },
    {
      i18nName: '申请人',
      i18nKey: 'SHENQINGREN',
      permissionKey: 'SOURCING_XUNJIACAIGOUYUAN',
      type: 'input',
      List: [],
      moduleKey: 'applyBy'
    },
    {
      i18nName: '申请部门',
      i18nKey: '申请部门',
      permissionKey: 'SOURCING_ZHUANYECAIGOUYUAN',
      type: 'linieName',
      List: DEPARTMENTLIST,
      moduleKey: 'linieName'
    },
    {
      i18nName: '申请日期起',
      i18nKey: '申请日期起',
      permissionKey: 'SOURCING_LIUCHENGLEIX',
      type: 'datepicker',
      List: [],
      moduleKey: 'startDate'
    },
    {
      i18nName: '申请日期止',
      i18nKey: '申请日期止',
      permissionKey: 'SOURCING_HUIYILEIXING',
      type: 'datepicker',
      List: [],
      moduleKey: 'endDate'
    },
    {
      i18nName: '备注',
      i18nKey: '备注',
      permissionKey: 'SOURCING_CHEXINGXIANGMU',
      type: 'input',
      List: [],
      moduleKey: 'detail'
    },
  ]
}

export const form = {
  "applyBy": "",
  "createDate": "",
  "currency": "RMB",
  "currentPage": 1,
  "deptName": "",
  "pageSize": 10,
  "partNameZh": "",
  "partNumStr": "",
  "procureFactory": "",
  "procureGroup": "",
  "requestTraceNo": "",
  "riseCode": "",
  "sapCode": "",
  "status": "",
  "subType": "",
  "supplierNameZh": "",
  "supplierSapCode": "",
  "isOwn": false,
  "type": 'GPR'
}

export const tableTitle = [
  { props: 'requestTraceNo', name: '序号', key: '序号', tooltip: true, width: 105, sortable: true },
  { props: 'riseCode', name: 'RiSE编号', key: 'RiSE编号', tooltip: true, width: 180, sortable: true },
  { props: 'subType', name: '采购申请类型', key: '采购申请类型', tooltip: true, width: 180, sortable: true },
  { props: 'applyBy', name: '申请人', key: '申请人', width: 120, tooltip: true, sortable: true },
  { props: 'applyDeptNo', name: '申请部门', key: '申请部门', width: 120, tooltip: true, sortable: true },
  { props: 'status', name: '状态', key: '状态', tooltip: true, width: 120, sortable: true },
  { props: 'createDate', name: '生成时间', key: '生成时间', width: 120, tooltip: true, sortable: true },
  { props: 'ownerName', name: '推荐采购员', key: '推荐采购员', tooltip: true, width: 120, sortable: true },
  { props: 'remark', name: '备注', key: '备注', tooltip: true, width: 300, sortable: true },
]


export const newTableTitle = [
  {
    props: 'sapItem',
    name: '项次',
    key: 'MODEL-ORDER.LK_XIANGCI',
    tooltip: true,
    align: 'center',
    width: 60
  },
  {
    props: 'partType',
    name: '零件类型',
    key: 'LK_LINGJIANLEIXING',
    tooltip: true,
    align: 'center',
    width: 150
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'partsprocure.LingJianHao',
    tooltip: true,
    align: 'center',
    width: 120
  },
  {
    props: 'partNameZh',
    name: '零件名称',
    key: 'partsignLanguage.LingJianMingChengZH',
    tooltip: true,
    align: 'center',
    width: 120
  },
  {
    props: 'quantity',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: true,
    align: 'center',
    width: 100
  },
  {
    props: 'unitCode',
    name: '计量单位',
    key: 'LK_JILIANGDANWEI',
    tooltip: true,
    align: 'center',
  },
  // {
  //   props: 'supplierNameZh',
  //   name: '期望供应商',
  //   key: 'MODEL-ORDER.LK_QIWANGGONGYINGSHANG',
  //   tooltip: true,
  //   align: 'center',
  //   width: 120
  // },
  {
    props: 'factoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: true,
    align: 'center',
  },
  // {
  //   props: 'procureGroup',
  //   name: '采购组',
  //   key: 'LK_CAIGOUZU',
  //   tooltip: true,
  //   align: 'center',
  // },
  {
    props: 'deliveryDate',
    name: '交货日期',
    key: 'LK_JIAOHUORIQI',
    tooltip: true,
    align: 'center',
  },
  {
    props: 'storageLocationCode',
    name: '库存地点',
    key: 'MODEL-ORDER.LK_KUCUNDIDIAN',
    tooltip: true,
    align: 'center',
  },
  {
    props: 'requestTraceNo',
    name: '需求跟踪号',
    key: 'MODEL-ORDER.LK_XUQIUGENZONGHAO',
    tooltip: true,
    align: 'center',
  },
  {
    props: 'riseCode',
    name: 'RiSE协议号',
    key: 'MODEL-ORDER.LK_RISEXIEYIHAO',
    tooltip: true,
    align: 'center',
  },
  // {
  //   props: 'detail',
  //   name: '',
  //   key: '',
  //   tooltip: true,
  //   align: 'center',
  //   width: 60
  // },
];

export const addType = [
  { label: "ZN_ONE", key: "工序委外一次性采购申请" },
  { label: "ZN_AGT", key: "工序委外框架" },
]

export const statusList = [
  { key: '-2', label: '草稿' },
  { key: '-1', label: '已退回' },
  { key: '0', label: '待签收' },
  { key: '1', label: '已创建' },
  { key: '2', label: '已关联订单' },
  { key: '3', label: '订单已推送' },
  { key: '4', label: '已关闭' },
]
