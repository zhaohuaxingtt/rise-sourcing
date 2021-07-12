/*
 * @Author: your name
 * @Date: 2021-06-30 13:56:01
 * @LastEditTime: 2021-06-30 14:49:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steelDemandCreation\home\components\data.js
 */

export function searchForm(){
  return [
    {
      i18nName:'申请单号',
      i18nKey:'SHENGQINGDANHAO',
      permissionKey:'SOURCING_SHENGQINGDANHAO',
      type:'input',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'供应商SAP号',
      i18nKey:'GONGYINGSHANGSAPHAO',
      permissionKey:'SOURCING_GONGYINGSHANGSAPHAO',
      type:'input',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'申请状态',
      i18nKey:'SHENGQINGZHUANGTAI',
      permissionKey:'SOURCING_SHENGQINGZHUANGTAI',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'零件采购项目类型',
      i18nKey:'LINGJIANCAIGOUXIANGMULEIX',
      permissionKey:'SOURCING_LINGJIANCAIGOUXIANGMULEIX',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'打印状态',
      i18nKey:'DAYINGZHUANGTAI',
      permissionKey:'SOURCING_DAYINGZHUANGTAI',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'零件号',
      i18nKey:'LINGJIANHAO',
      permissionKey:'SOURCING_LINGJIANHAO',
      type:'input',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'零件名称（中）',
      i18nKey:'LINGJIANMINGCZH',
      permissionKey:'SOURCING_LINGJIANMINGCZH',
      type:'input',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'fsNr/gsNr',
      i18nKey:'FSNRGSNR',
      permissionKey:'SOURCING_FSNRGSNR',
      type:'input',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'询价采购员',
      i18nKey:'XUNJIACAIGOUYUAN',
      permissionKey:'SOURCING_XUNJIACAIGOUYUAN',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'专业采购员',
      i18nKey:'ZHUANYECAIGOUYUAN',
      permissionKey:'SOURCING_ZHUANYECAIGOUYUAN',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'流程类型',
      i18nKey:'LIUCHENGLEIX',
      permissionKey:'SOURCING_LIUCHENGLEIX',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'会议类型',
      i18nKey:'HUIYILEIXING',
      permissionKey:'SOURCING_HUIYILEIXING',
      type:'select',
      List:[],
      moduleKey:'a'
    },
    {
      i18nName:'车型项目',
      i18nKey:'CHEXINGXIANGMU',
      permissionKey:'SOURCING_CHEXINGXIANGMU',
      type:'input',
      List:[],
      moduleKey:'a'
    }
  ]
}

export const form = {
  a:''
}

export const tableTitle = [
  { props: 'a', name: '申请单号', key: 'SHENGQINGDANHAO', tooltip: true },
  { props: 'b', name: '申请单名', key: 'SHENGQINGDANMING', tooltip: true },
  { props: 'c', name: 'PROJECT', key: 'PROJECTNAME', tooltip: true },
  { props: 'd', name: '类型', key: 'LEIX', tooltip: true  },
  { props: 'e', name: '状态', key: 'ZHUANGTAI', tooltip: true },
  { props: 'f', name: '项目类型', key: 'XIANGMULEIX', tooltip: true },
  { props: 'g', name: '会议', key: 'HUIYI', tooltip: true },
  { props: 'h', name: '询价采购员', key: 'XUNGJIACAIGOUYUAN', tooltip: true  },
  { props: 'i', name: 'LINIE', key: 'LINIE', tooltip: true },
  { props: 'j', name: 'RS单状态', key: 'RSDANZHUANGTAI', tooltip: true  },
  { props: 'k', name: 'RS冻结日期', key: 'RSDONGJIERIQI', tooltip: true  },
  { props: 'l', name: '报价一致性检验状态', key: 'BAOJIAYIZHIXINGJIANYANZHANGTAI', tooltip: true  },
  { props: 'o', name: '打印状态', key: 'DAYINGZHUANGTAI', tooltip: true  },
  { props: 'm', name: '冻结日期', key: 'DONGJIERIQI', tooltip: true  },
  { props: 'n', name: '定点日期', key: 'DINGDIANRIQI', tooltip: true  }
]