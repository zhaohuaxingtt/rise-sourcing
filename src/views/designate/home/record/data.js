/*
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 16:06:26
 * @LastEditTime: 2022-03-09 11:18:41
 * @LastEditors: YoHo
 */
export const form = {
  fsnrGsnrNum:'',
  partNum:'',
  partNameCn:'',
  carType:'',
  carTypeProj:'',
  applicationStatus:'',
  rfqSupplierName:'',
  partProjType:'',
  nominateUser:'',
  linie:'',
  isNewNominate:'',
  nominateTime:'',
  showSelf: true
}

export const tableTitle = [
  {
    props:'fsnrGsnrNum',
    name:'FS/GS/SP No.',
    key:'FSGSSPNO',
    tooltip:true
  },
  {
    props:'partNum',
    name:'零件号',
    key:'nominationLanguage_LingJianHao',
    tooltip:true
  },
  {
    props:'partNameCn',
    name:'零件名称',
    key:'nominationLanguage_LingJianMingCheng',
    tooltip:true
  },
  {
    props:'partProjType',
    name:'零件项目类型',
    key:'LINGJIANXIANGMULEIXING',
    tooltip:true
  },
  {
    props:'carType',
    name:'车型',
    key:'CHEXING',
    tooltip:true
  },
  {
    props:'carTypeProj',
    name:'车型项目',
    key:'CHEXINGXIANGMU',
    tooltip:true
  },
  {
    props:'buyerName',
    name:'询价采购员',
    key:'XUNJIACAIGOUYUAN',
    tooltip:true,
    width:120
  },
  {
    props:'linie',
    name:'LINIE',
    key:'LINIE',
    tooltip:true,
    width:90
  },
  {
    props:'nominateTime',
    name:'定点时间',
    key:'DINGDIANSHIJIAN',
    tooltip:true
  }
]

export const detailList = [
  {value: 'fsnrGsnrNum', label: 'FS号', type: 'input', key: 'FSHAO',},
  {value: 'partNum', label: '零件号', type: 'input', key: 'LINGJIAHAO',},
  {value: 'partNameCn', label: '零件名称', type: 'input', key: 'LINGJIANMINGCHENG',},
  {value: 'partProjType', label: '零件项目类型', type: 'input', key: 'LINGJIANXIANGMULEIXING',},
  {value: 'material', label: '材料组', type: 'input', key: 'CAILIAOZU',},
  {value: 'craft', label: '工艺组', type: 'input', key: 'GONGYIZU',},
  {value: 'carType', label: '车型', type: 'input', key: 'CHEXING',},
  {value: 'carTypeProj', label: '车型项目', type: 'input', key: 'CHEXINGXIANGMU',},
  {value: 'buyerName', label: '询价采购员', type: 'input', key: 'XUNJIACAIGOUYUAN',},
  {value: 'linie', label: 'LINIE', type: 'input', key: 'LINIE'},
  {value: 'linieDeptNum', label: 'LINIE部门', type: 'input', key: 'LINIEBUMEN'},
  {value: 'nominateTime', label: '定点时间', type: 'input', key: 'DINGDIANSHIJIAN'},
]

export const tableDetailTitle = [
  {
    props:'supplierId',
    name:'厂商',
    key:'CHANGSHANG',
    tooltip:true
  },
  {
    props:'supplierNameCn',
    name:'供应商',
    key:'GONGYINGSHANG',
    tooltip:true
  },
  {
    props:'rwPrice',
    name:'欧价',
    key:'OUJIA', 
    tooltip:true
  },
  {
    props:'prodLocation',
    name:'供应商工厂',
    key:'GONGYINGSHANGGONGCHANG',
    tooltip:true
  },
  {
    props:'qualtity',
    name:'份额',
    key:'FENE',
    tooltip:true
  },
  {
    props:'status',
    name:'状态',
    key:'ZHUANGTAI',
    tooltip:true
  },
  {
    props:'skdAPrice',
    name:'SKD A价',
    key:'SKDAJIA',
    tooltip:true
  },
  {
    props:'skdBPrice',
    name:'SKD B价',
    key:'SKDBJIA',
    tooltip:true
  },
  {
    props:'lcAPrice',
    name:'LC A价',
    key:'LCAJIA',
    tooltip:true
  },
  {
    props:'lcBPrice',
    name:'LC B价',
    key:'LCBJIA',
    tooltip:true
  },
  {
    props:'skdANoSharePrice',
    name:'SKD A价（不含分摊）',
    key:'SKDAJIABUHANFENTAN',
    tooltip:true
  },
  {
    props:'skdBNoSharePrice',
    name:'SKD B价（不含分摊）',
    key:'SKDBJIABUHANFENTAN',
    tooltip:true
  },
  {
    props:'lcANoSharePrice',
    name:'LC A价（不含分摊）',
    key:'LCAJIABUHANFENTAN',
    tooltip:true
  },
  {
    props:'lcBNoSharePrice',
    name:'LC B价（不含分摊）',
    key:'LCBJJIABUHANFENTAN',
    tooltip:true
  },
  {
    props:'packPrice',
    name:'包装费',
    key:'BAOZHUANGFEI',
    tooltip:true
  },
  {
    props:'transportPrice',
    name:'运输费',
    key:'YUNSHUFEI',
    tooltip:true
  },
  {
    props:'operatePrice',
    name:'操作费',
    key:'CAOZUOFEI',
    tooltip:true
  },
  {
    props:'tcCurrencyId',
    name:'货币',
    key:'HUOBI', 
    tooltip:true
  },
  {
    props:'moldExchangeRate',
    name:'汇率',
    key:'HUILU',
    tooltip:true
  },
  {
    props:'moldPrice',
    name:'模具价格(不含税)',
    key:'MOJIJIAGEBUHANSHUI',
    tooltip:true,
    width:140
  },
  {
    props:'isModeApportion',
    name:'模具分摊',
    key:'MOJUFENTAN',
    tooltip:true
  },
  {
    props:'moldApportionQuantity',
    name:'分摊数量',
    key:'FENTANSHULIANG',
    tooltip:true
  },
  {
    props:'moldTcCurrencyId',
    name:'模具货币',
    key:'MOJUHUOBI',
    tooltip:true
  },
  {
    props:'developPrice',
    name:'开发费(不含税)',
    key:'KAIFAFEIBUHANSHUI',
    tooltip:true,
    width:140
  },
  {
    props:'developApportionPrice',
    name:'开发费分摊',
    key:'KAIFAFEIFENTAN',
    tooltip:true
  },
  {
    props:'developApportionQuantity',
    name:'分摊数量',
    key:'FENTANSHULIANG',
    tooltip:true
  },
  {
    props:'tpGrade',
    name:'技术评分',
    key:'JISHUPINGFEN',
    tooltip:true
  },
  {
    props:'mqGrade',
    name:'质量评分',
    key:'ZHILIANGPINGFEN',
    tooltip:true
  },
  {
    props:'plGrade',
    name:'物流评分',
    key:'WULIUPINGFEN',
    tooltip:true
  },
  {
    props:'ltc',
    name:'年降',
    key:'NIANJIANG',
    tooltip:true,
    width:200
  },
  {
    props:'beginYearReduce',
    name:'年降开始时间',
    key:'NIANJIANGKAISHISHIJIAN',
    tooltip:true,
    width:150
  }
]