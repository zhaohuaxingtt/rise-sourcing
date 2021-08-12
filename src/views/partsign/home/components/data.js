/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-07-23 15:27:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\home\components\data.js
 */
import store from '@/store'
import {permissionTitle} from '@/utils'
// 暂时注释掉表头权限
// export const tableTitle = permissionTitle("PERMISSION_TESTTABLE",[
  export const tableTitle = [
  // {props:'tpPartID',name:'信息单流水号',key: 'LK_XINXIDANLIUSHUIHAO',tooltip:true ,width:100},
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO',tooltip:false,width:130},
  {props:'partNameCn',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG',tooltip:true,width:170},
  {props:'partNameDe',name:'零件名（德）',key: 'LK_LINGJIANMINGDE',tooltip:true,width:160},
  {props:'projectCarType',name:'车型项目',key: 'LK_CHEXINGXIANGMU',tooltip:true,width:160},
  {props:'buyerName',name:'询价采购员',key: 'LK_CAIGOUYUANNEW',tooltip:true,width:90},
  {props:'tpDeptNum',name:'设计科室',key: 'LK_SHEJIKESHI',tooltip:true,width:100},
  {props:'tpPrincepalName',name:'工程师',key: 'LK_GONGCHENGSHI',tooltip:true,width:90},
  {props:'tpInfoType',name:'信息单类型',key: 'LK_XINXIDANLEIXING',tooltip:true,width:20},
  {props:'status',name:'信息单状态',key: 'LK_XINXIDANZHUANGTAI',tooltip:true,width:80},
  {props:'attachmentStatus',name:'询价资料状态',key: 'LK_XUNJIAZILIAOZHUANGTAI',tooltip:true,minWidth:100},
  {props:'partDosageStatus',name:'每车用量状态',key: 'LK_MEICHEYONGLIANGZHUANGTAI',tooltip:true,minWidth:100}
]
export const needTranslate = [
  {name:'tpInfoType',key:'tp_info_type'}
]
//form
export const form = {
  tpPrincepalName:'',
  attachmentStatus:'0',//询价资料状态.默认查询 解决bug
  dept:'',//设计科室
  tpId:'',//信息单流水号
  partDosageStatus:'0', //每次用量状态，默认查询 解决bug
  partNameZh:"",//零件中文名称
  partNum:'',//零件号
  projectCarType:'',//车型项目
  status:'1',//信息单状态，默认查询 解决bug
  tpInfoType:'',//信息单分类
  userId:store.state.permission.userInfo?.id
}
export const fromGroup = JSON.parse(JSON.stringify(form))

export const navList = [
  {
    value: 1,
    name: '零件签收',
    message: 4,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'LK_LINGJIANQIANSHOU'
  },
  {
    value: 2,
    name: '采购项目建立',
    message: 6,
    url: '/sourcing/partsprocure',
    activePath: 'partsprocure',
    key: 'LK_CAIGOUXIANGMUJIANLI'
  },
  {
    value: 7,
    name: '配件需求签收',
    message: 0,
    url: '/sourcing/signforpartsdemand',
    activePath: 'signforpartsdemand',
    key: 'LK_PEIJIANXUQIUQIANSHOU'
  },
  {
    value: 8,
    name: '配件综合管理',
    message: 0,
    url: '/sourcing/integratedmanage',
    activePath: 'integratedmanage',
    key: 'LK_PEIJIANZONGHEGUANLI'
  },
  {
    value: 5,
    name: '附件需求导入',
    message: 0,
    url: '/sourcing/importfiles',
    activePath: 'importfiles',
    key: 'LK_FUJIANXUQIUDAORU'
  },
  {
    value: 5,
    name: '附件综合管理',
    message: 0,
    url: '/sourcing/filemanage',
    activePath: 'filemanage',
    key: 'LK_FUJIANZONGHEGUANLI'
  },
  {
    value: 3,
    name: 'RFQ管理',
    message: 0,
    url: '/sourcing/partsrfq',
    activePath: 'partsrfq',
    key: 'LK_RFQGUANLI'
  },
  {
    value: 4,
    name: '定点管理',
    message: 7,
    url: '/sourcing/partsnomination',
    activePath: 'partsnomination    ',
    key: 'LK_DINGDIANGUANLI'
  },
]

export const clickMessage = function(data) {
  if (data.url.indexOf("partsign") > -1) {
    return this.$router.push({
      path: "/sourcing/partsign",
      query: {
        status: "1"
      }
    })
  }

  if (data.url.indexOf("partsprocure") > -1) {
    return this.$router.push({
      path: "/sourcing/partsprocure",
      query: {
        partStatus: "10"
      }
    })
  }
}
export const TAB = [
  {
    value: 1,
    name: '寻源执行',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'XUANYUANCAIDAN'
  },
  // {
  //   value: 2,
  //   label: '进度监控',
  //   key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
  //   url: '/nomination',
  //   message: 0
  // }
]