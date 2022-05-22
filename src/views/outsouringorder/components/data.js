/*
 * @Author: your name
 * @Date: 2021-06-30 13:56:01
 * @LastEditTime: 2022-03-25 14:58:09
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steelDemandCreation\home\components\data.js
 */
import { STEEL } from '@/config'
export function searchForm({ MEETING_TYPE = [], NOMINATE_APP_PROCESS_TYPE = [], NOMINATE_APP_STATUS_FILING = [], LINLIE = [], BEFORBUYER = [] }) {
  return [
    {
      i18nName: 'RiSE编号',
      i18nKey: 'MODEL-ORDER.LK_RISEBIANHAO',
      permissionKey: 'SOURCING_SHENGQINGDANHAO',
      type: 'input',
      List: [],
      moduleKey: 'nominateId'
    },
    {
      i18nName: '零件号',
      i18nKey: 'LINGJIANHAO',
      permissionKey: 'SOURCING_LINGJIANHAO',
      type: 'input',
      List: [],
      moduleKey: 'partNum'
    },
    {
      i18nName: '零件名称（中）',
      i18nKey: 'LINGJIANMINGCZH',
      permissionKey: 'SOURCING_LINGJIANMINGCZH',
      type: 'input',
      List: [],
      moduleKey: 'partName'
    },
    {
      i18nName: '采购申请类型',
      i18nKey: 'MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING',
      permissionKey: 'SOURCING_LINGJIANCAIGOUXIANGMULEIX',
      type: 'select',
      List: [{ name: '全部', code: '' }, { name: '钢材一次性采购', code: STEEL.STEELONECE }, { name: '钢材批量采购', code: STEEL.STEELALL }],
      moduleKey: 'partProjectType'
    },
    {
      i18nName: '状态',
      i18nKey: 'LK_ZHUANGTAI',
      permissionKey: 'SOURCING_DAYINGZHUANGTAI',
      type: 'select',
      List: [{ name: '全部', code: '' }, { name: '已打印', code: '1' }, { name: '未打印', code: '0' }],
      moduleKey: 'printStatus'
    },
    {
      i18nName: '采购工厂',
      i18nKey: 'LK_CAIGOUGONGCHANG',
      permissionKey: 'SOURCING_LINGJIANHAO',
      type: 'input',
      List: [],
      moduleKey: 'purceFactory'
    },
    {
      i18nName: '采购员',
      i18nKey: '采购员',
      permissionKey: 'SOURCING_LINGJIANMINGCZH',
      type: 'input',
      List: [],
      moduleKey: 'partName'
    },
    {
      i18nName: '科室',
      i18nKey: '科室',
      permissionKey: 'SOURCING_FSNRGSNR',
      type: 'input',
      List: [],
      moduleKey: 'fsnrGsnrNum'
    },
    {
      i18nName: '申请人',
      i18nKey: 'SHENQINGREN',
      permissionKey: 'SOURCING_XUNJIACAIGOUYUAN',
      type: 'input',
      List: [],
      moduleKey: 'fsnrGsnrNum'
    },
    {
      i18nName: '申请部门',
      i18nKey: '申请部门',
      permissionKey: 'SOURCING_ZHUANYECAIGOUYUAN',
      type: 'select',
      List: LINLIE,
      moduleKey: 'linieName'
    },
    {
      i18nName: '申请日期起',
      i18nKey: '申请日期起',
      permissionKey: 'SOURCING_LIUCHENGLEIX',
      type: 'datepicker',
      List: NOMINATE_APP_PROCESS_TYPE,
      moduleKey: 'startDate'
    },
    {
      i18nName: '申请日期止',
      i18nKey: '申请日期止',
      permissionKey: 'SOURCING_HUIYILEIXING',
      type: 'datepicker',
      List: MEETING_TYPE,
      moduleKey: 'endDate'
    },
    {
      i18nName: '备注',
      i18nKey: '备注',
      permissionKey: 'SOURCING_CHEXINGXIANGMU',
      type: 'input',
      List: [],
      moduleKey: 'cartypeProjectZh'
    },

  ]
}

export const form = {
  applicationStatus: '', //申请状态
  cartypeProjectZh: '', //车型项目
  fsnrGsnrNum: '', //fs号
  linieName: '', //linie名称
  meetingType: '', //会议类型
  nominateId: '', //定点申请号
  nominateProcessType: '', //流程类型
  nominateUserName: '', //定点询价采购员
  partName: '', //零件名称
  partNum: '', //零件编号
  partProjectType: '', //零件采购项目类型
  printStatus: '', //打印状态
  sapNum: '', //sap
  showSelf: true
}

export const tableTitle = [
  { props: 'nominateId', name: '序号', key: '序号', tooltip: true, width: 105, sortable: true },
  { props: 'nominateName', name: 'RiSE编号', key: 'RiSE编号', tooltip: true, width: 105, sortable: true },
  { props: 'cartypeProjectZh', name: '采购申请类型', key: '采购申请类型', tooltip: true, width: 150, sortable: true },
  { props: 'nominateProcessTypeDesc', name: '申请人', key: '申请人', tooltip: true, sortable: true },
  { props: 'applicationStatusDesc', name: '申请部门', key: '申请部门', tooltip: true, sortable: true },
  { props: 'partProjectTypeDesc', name: '状态', key: '状态', tooltip: true, width: 105, sortable: true },
  { props: 'meeting', name: '生成时间', key: '生成时间', tooltip: true, sortable: true },
  { props: 'nominateUserName', name: '推荐采购时间', key: '推荐采购时间', tooltip: true, width: 120, sortable: true },
  { props: 'linieName', name: '备注', key: '备注', tooltip: true, width: 300, sortable: true },
]


export const tableTitledetails = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
    props: 'item',
    name: '项次',
    key: 'MODEL-ORDER.LK_XIANGCI',
    tooltip: true,
    minWidth: 40,
},
{
    props: 'partCode',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    minWidth: 140,
    tooltip: false,
},
{
    props: 'partName',
    name: '零件名称',
    key: 'MODEL-ORDER.LK_LINGJIANMINGCENG',
    minWidth: 120,
    tooltip: true,
},
{
    props: 'procureFactory',
    name: '采购⼯⼚',
    key: 'MODEL-ORDER.LK_CAIGOUGONGCHANG',
    tooltip: true,
},
{
    props: 'sopDateNew',
    name: '新价格开始⽇期',
    key: 'LK_XINJIAGEKAISHIRIQI',
    tooltip: false,
    minWidth: 130
},
{
    props: 'sopDateOrigin',
    name: '原价格开始⽇期',
    key: 'LK_YUANJIAGEKAISHIRIQI',
    tooltip: false,
    minWidth: 130
},
{
    props: 'aPriceOrigin',
    name: 'A价',
    key: 'LK_AJIA',
    tooltip: true,
},
{
    props: 'supplierSapCode',
    name: '供应商',
    key: 'MODEL-ORDER.LK_GONGYINSHANG',
    minWidth: 180,
    tooltip: true,
},

{
    props: 'partType',
    name: '零件类型',
    key: 'LK_LINGJIANLEIXING',
    tooltip: false
},
{
    props: 'supplierConfirmStatus',
    name: '供应商确认',
    key: 'MODEL-ORDER.LK_GONGYINGSHANGQUEREN',
    tooltip: true
},
{
    props: 'operation',
    name: '价格预览',
    key: 'LK_JIAGEYULAN',
    tooltip: true
},
]


// 详情- 签字单列表
export const detailsTableTitle = [
  {
    props: 'id',
    name: '申请单号',
    key: 'nominationLanguage_ShenQingDanHao',
    tooltip: false
  },
  {
    props: 'nominateName',
    name: '申请单名',
    key: 'nominationLanguage_ShenQingDanMing',
    tooltip: false
  },
  {
    props: 'carType',
    name: 'PROJECT',
    key: 'PROJECT',
    tooltip: false
  },
  {
    props: 'applicationStatusDesc',
    name: '状态',
    key: 'LK_ZHUANGTAI',
    tooltip:false
  },
  {
    props: 'partProjTypeDesc',
    name: '项目类型',
    key: 'nominationLanguage_XingMuLeiXing',
    tooltip: false
  },
  {
    props: 'meetingName',
    name: '会议',
    key: 'nominationLanguage_HuiYi',
    tooltip: true
  },
  {
    props: 'nominateUserName',
    name: 'CSF',
    key: 'CSF',
    tooltip: true
  },
  {
    props: 'linieName',
    name: 'LINIE',
    key: 'LINIE',
    tooltip: false
  },
  {
    props: 'freezeDate',
    name: '冻结日期',
    key: 'nominationLanguage_DongJieRiQi',
    tooltip: false
  }
]