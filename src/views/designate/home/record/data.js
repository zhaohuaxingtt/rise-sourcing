/*
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 16:06:26
 * @LastEditTime: 2021-10-25 15:57:06
 * @LastEditors:  
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
  nominateTime:''
}

export const tableTitle = [
  {
    props:'fsnrGsnrNum',
    name:'FS号',
    key:'FSNUMBER',
    tooltip:true
  },
  {
    props:'partNum',
    name:'零件号',
    key:'nominationLanguage_LingJianHao',
    tooltip:true
  },
  {
    props:'partName',
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
    props:'carTypeProj',
    name:'车型',
    key:'CHEXING',
    tooltip:true
  },
  {
    props:'carProject',
    name:'车型项目',
    key:'CHEXINGXIANGMU',
    tooltip:true
  },
  {
    props:'rfqSupplierName',
    name:'定点供应商',
    key:'DINGDIANGONGYINGSHANG',
    tooltip:true
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
  {value: 'linieDeptName', label: 'LINIE部门', type: 'input', key: 'LINIEBUMEN'},
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
    name:'产地',
    key:'CHANDI',
    tooltip:true
  },
  {
    props:'qualtity',
    name:'份额',
    key:'FENE',
    tooltip:true
  },
  {
    props:'qualtity',
    name:'状态',
    key:'ZHUANGTAI',
    tooltip:true
  },
  {
    props:'aPriceNoModel',
    name:'A价',
    key:'AJIA',
    tooltip:true
  },
  {
    props:'bPriceNoMode',
    name:'B价',
    key:'BJIA',
    tooltip:true
  },
  {
    props:'bPriceMode',
    name:'含模B价',
    key:'HANMOBJIA',
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
    tooltip:true
  },
  {
    props:'MOJUFENTAN',
    name:'模具分摊',
    key:'MOJUFENTAN',
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
    tooltip:true
  },
  {
    props:'developApportionPrice',
    name:'开发费分摊',
    key:'KAIFAFEIFENTAN',
    tooltip:true
  },
  {
    props:'fsNumber',
    name:'分摊数量',
    key:'FENTANSHULIANG',
    tooltip:true
  },
  {
    props:'tpGrade',
    name:'TP评分',
    key:'TPPINGFEN',
    tooltip:true
  },
  {
    props:'mqGrade',
    name:'MQ评分',
    key:'MAPINGFEN',
    tooltip:true
  }
]