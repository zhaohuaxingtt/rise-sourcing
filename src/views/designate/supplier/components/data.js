/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-20 14:24:02
 * @LastEditors: Please set LastEditors
 * @Description: 定点表格信息
 *
 */

// 筛选参数
export const form = {
}

// 表单表头
export const multiSupplierTitle = [
  {
    props: 'descr',
    name: '',
    key: '',
    tooltip: true,
    width: 250,
    tree: true
  },
  {
    props: 'fsnrGsnrName',
    name: '厂商名',
    key: 'nominationSupplier.ChangShangMing',
    tooltip: false
  },
  {
    props: 'sapNum',
    name: 'SAP号',
    key: 'nominationSupplier.SAPHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '厂商名(英)',
    key: 'nominationSupplier.ChangShangMingEN',
    tooltip: false
  },
  {
    props: 'show',
    name: '是否展示',
    key: 'nominationSupplier.ShiFouZhanShi',
    tooltip: false
  },
]

// 供应商列表moke数据
export const mokeMultiSupplierData = [
  {
    "id": "122",
    "descr":  "510923空调压缩机液压阀",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "fsnrGsnrNameEn": "Haier",
    "show": "Y",
    "children": [
      {
        "id": "12111",
        "descr":  "",
        "fsnrGsnrName": "美的",
        "sapNum": "88127388",
        "fsnrGsnrNameEn": "meidi",
        "show": "Y"
      },
      {
        "id": "12112",
        "descr":  "",
        "fsnrGsnrName": "比亚迪",
        "sapNum": "88127288",
        "fsnrGsnrNameEn": "BYD",
        "show": "Y"
      }
    ]
  },
  {
    "id": "121",
    "descr":  "510923温度控制器液压阀",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "fsnrGsnrNameEn": "Haier",
    "show": "Y",
  }
]

// 单一供应商表头
export const singleSupplierTitle = [
  {
    props: 'fsnrGsnrName',
    name: 'RFQ编号',
    key: 'nominationLanguage.RFQBianHao',
    tooltip: false
  },
  {
    props: 'sapNum',
    name: 'FS/GS/SP NO.',
    key: '',
    tooltip: false
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'nominationLanguage.LingJianHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件名(中)',
    key: 'nominationLanguage.LingJianMingCN',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件名(德)',
    key: 'nominationLanguage.LingJianMingDE',
    tooltip: false
  },
  {
    props: 'supplierName',
    name: '供应商名',
    key: 'nominationSupplier.GongYingShangMing',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: 'SAP号',
    key: 'nominationSupplier.SAPHao',
    tooltip: false
  },
  {
    props: 'reason',
    name: '单一原因',
    key: 'nominationSupplier.DanYiYuanYin',
    tooltip: false
  },
  {
    props: 'dept',
    name: '部门',
    key: 'nominationSupplier.BuMen',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '更新时间',
    key: 'nominationSupplier.GengXinShiJian',
    tooltip: false
  },
]

// 单一供应商列表moke数据
export const mokeSingleSupplierData = [
  {
    "id": "122",
    "partNum": "131231231",
    "descr":  "510923空调压缩机液压阀",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "fsnrGsnrNameEn": "Haier",
    "supplierName": "Haier",
    "show": "Y",
    "isTop": true
  },
  {
    "id": "121",
    "partNum": "131231231",
    "descr":  "510923温度控制器液压阀",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "supplierName": "Haier",
    "fsnrGsnrNameEn": "Haier",
    "show": "Y",
    "isTop": false
  }
]

// 零件清单表头
export const partTitle = [
  {
    props: 'fsnrGsnrName',
    name: 'RFQ编号',
    key: 'nominationLanguage.RFQBianHao',
    tooltip: false
  },
  {
    props: 'sapNum',
    name: 'FS/GS/SP NO.',
    key: '',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件号',
    key: 'nominationLanguage.LingJianHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件名(中)',
    key: 'nominationLanguage.LingJianMingCN',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件名(德)',
    key: 'nominationLanguage.LingJianMingDE',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '采购工厂',
    key: 'nominationSupplier.CaiGouGongChang',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件项目类型',
    key: 'nominationSupplier.LingJianXiangMuLeiXing',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '车型大类',
    key: 'nominationSupplier.CheXingDaLei',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '车型项目',
    key: 'nominationSupplier.CheXingXiangMu',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '更新时间',
    key: 'nominationSupplier.GengXinShiJian',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件状态',
    key: 'nominationSupplier.LingJianZhuangTai',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '询价采购员',
    key: 'nominationSupplier.XunJiaCaiGouYuan',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: 'LINIE',
    key: 'LINIE',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: 'CF目标价',
    key: 'nominationSupplier.CFMuBiaoJia',
    tooltip: false
  },
  {
    props: 'isTop',
    name: '',
    key: '',
    tooltip: false
  },
]