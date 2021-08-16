/*
 * @Author: your name
 * @Date: 2021-06-30 13:56:01
 * @LastEditTime: 2021-08-14 15:13:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steelDemandCreation\home\components\data.js
 */
import {STEEL} from '@/config'
export function searchForm({MEETING_TYPE=[],NOMINATE_APP_PROCESS_TYPE=[],NOMINATE_APP_STATUS_FILING=[],LINLIE=[],BEFORBUYER=[]}){
  return [
    {
      i18nName:'申请单号',
      i18nKey:'SHENGQINGDANHAO',
      permissionKey:'SOURCING_SHENGQINGDANHAO',
      type:'input',
      List:[],
      moduleKey:'nominateId'
    },
    {
      i18nName:'供应商SAP号',
      i18nKey:'GONGYINGSHANGSAPHAO',
      permissionKey:'SOURCING_GONGYINGSHANGSAPHAO',
      type:'input',
      List:[],
      moduleKey:'sapNum'
    },
    {
      i18nName:'申请状态',
      i18nKey:'SHENGQINGZHUANGTAI',
      permissionKey:'SOURCING_SHENGQINGZHUANGTAI',
      type:'select',
      List:NOMINATE_APP_STATUS_FILING,
      moduleKey:'applicationStatus'
    },
    {
      i18nName:'零件采购项目类型',
      i18nKey:'LINGJIANCAIGOUXIANGMULEIX',
      permissionKey:'SOURCING_LINGJIANCAIGOUXIANGMULEIX',
      type:'select',
      List:[{name:'全部',code:''},{name:'钢材一次性采购',code:STEEL.STEELONECE},{name:'钢材批量采购',code:STEEL.STEELALL}],
      moduleKey:'partProjectType'
    },
    {
      i18nName:'打印状态',
      i18nKey:'DAYINGZHUANGTAI',
      permissionKey:'SOURCING_DAYINGZHUANGTAI',
      type:'select',
      List:[{name:'全部',code:''},{name:'是',code:'1'},{name:'否',code:'0'}],
      moduleKey:'printStatus'
    },
    {
      i18nName:'零件号',
      i18nKey:'LINGJIANHAO',
      permissionKey:'SOURCING_LINGJIANHAO',
      type:'input',
      List:[],
      moduleKey:'partNum'
    },
    {
      i18nName:'零件名称（中）',
      i18nKey:'LINGJIANMINGCZH',
      permissionKey:'SOURCING_LINGJIANMINGCZH',
      type:'input',
      List:[],
      moduleKey:'partName'
    },
    {
      i18nName:'fsNr/gsNr',
      i18nKey:'FSNRGSNR',
      permissionKey:'SOURCING_FSNRGSNR',
      type:'input',
      List:[],
      moduleKey:'fsnrGsnrNum'
    },
    {
      i18nName:'询价采购员',
      i18nKey:'XUNJIACAIGOUYUAN',
      permissionKey:'SOURCING_XUNJIACAIGOUYUAN',
      type:'select',
      List:BEFORBUYER,
      moduleKey:'nominateUserName'
    },
    {
      i18nName:'专业采购员',
      i18nKey:'ZHUANYECAIGOUYUAN',
      permissionKey:'SOURCING_ZHUANYECAIGOUYUAN',
      type:'select',
      List:LINLIE,
      moduleKey:'linieName'
    },
    {
      i18nName:'流程类型',
      i18nKey:'LIUCHENGLEIX',
      permissionKey:'SOURCING_LIUCHENGLEIX',
      type:'select',
      List:NOMINATE_APP_PROCESS_TYPE,
      moduleKey:'nominateProcessType'
    },
    {
      i18nName:'会议类型',
      i18nKey:'HUIYILEIXING',
      permissionKey:'SOURCING_HUIYILEIXING',
      type:'select',
      List:MEETING_TYPE,
      moduleKey:'meetingType'
    },
    {
      i18nName:'车型项目',
      i18nKey:'CHEXINGXIANGMU',
      permissionKey:'SOURCING_CHEXINGXIANGMU',
      type:'input',
      List:[],
      moduleKey:'cartypeProjectZh'
    }
  ]
}

export const form = {
  applicationStatus:'', //申请状态
  cartypeProjectZh:'', //车型项目
  fsnrGsnrNum:'', //fs号
  linieName:'', //linie名称
  meetingType:'', //会议类型
  nominateId:'', //定点申请号
  nominateProcessType:'', //流程类型
  nominateUserName:'', //定点询价采购员
  partName:'', //零件名称
  partNum:'', //零件编号
  partProjectType:'', //零件采购项目类型
  printStatus:'', //打印状态
  sapNum:'', //sap
}

export const tableTitle = [
  { props: 'nominateId', name: '申请单号', key: 'SHENGQINGDANHAO', tooltip: true },
  { props: 'nominateName', name: '申请单名', key: 'SHENGQINGDANMING', tooltip: true },
  { props: 'nominateProcessTypeDesc', name: '类型', key: 'LEIX', tooltip: true  },
  { props: 'applicationStatusDesc', name: '状态', key: 'ZHUANGTAI', tooltip: true },
  { props: 'partProjectTypeDesc', name: '项目类型', key: 'XIANGMULEIX', tooltip: true },
  { props: 'meeting', name: '会议', key: 'HUIYI', tooltip: true },
  { props: 'nominateUserName', name: '询价采购员', key: 'XUNGJIACAIGOUYUAN', tooltip: true  },
  { props: 'linieName', name: 'LINIE', key: 'LINIE', tooltip: true },
  { props: 'rsStatus', name: 'RS单状态', key: 'RSDANZHUANGTAI', tooltip: true  },
  { props: 'rsFreezeDate', name: 'RS冻结日期', key: 'RSDONGJIERIQI', tooltip: true  },
  { props: 'isPriceConsistentDesc', name: '报价一致性检验状态', key: 'BAOJIAYIZHIXINGJIANYANZHANGTAI', tooltip: true  },
  { props: 'printStatusDesc', name: '打印状态', key: 'DAYINGZHUANGTAI', tooltip: true  },
  { props: 'freezeDate', name: '冻结日期', key: 'DONGJIERIQI', tooltip: true  },
  { props: 'nominateDate', name: '定点日期', key: 'DINGDIANRIQI', tooltip: true  }
]