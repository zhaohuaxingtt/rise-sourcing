/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-09-18 15:45:50
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
    tooltip: false,
    width: 250,
    tree: true
  },
  {
    props: 'factoryNameCh',
    name: '厂商名',
    key: 'nominationSupplier_ChangShangMing',
    tooltip: false
  },
  {
    props: 'sapNum',
    name: 'SAP号',
    key: 'nominationSupplier_SAPHao',
    tooltip: false
  },
  {
    props: 'factoryNameEng',
    name: '厂商名(英)',
    key: 'nominationSupplier_ChangShangMingEN',
    tooltip: false
  },
  {
    props: 'isPresent',
    name: '是否展示',
    key: 'nominationSupplier_ShiFouZhanShi',
    tooltip: false
  },
]

// 供应商列表moke数据
export const mokeMultiSupplierData = [
  {
    "supplierId": "150001010",
    "rfqId": "50002000",
    "frmRate": null,
    "isFRMRate": 0,
    "fsnrGsnrNum": "FS07-21273",
    "partNum": "N  0115247",
    "tmPartProjId": "50003256",
    "partNameCh": "垫片",
    "partNameGer": "SCHEIBE",
    "carModelProject": "",
    "currentRounds": null,
    "sapCode": "11085",
    "factoryNameCh": "上海爱导",
    "factoryNameEng": null,
    "isPresent": 0,
    "updateDate": "2021-06-03 14:28:15",
    "id": 7496256,
    "children": [
      {
        "supplierId": "150001011",
        "rfqId": "50002000",
        "frmRate": 'asp',
        "isFRMRate": 1,
        "fsnrGsnrNum": "FS07-21273",
        "partNum": "N  0115247",
        "tmPartProjId": "50003256",
        "partNameCh": "垫片",
        "partNameGer": "SCHEIBE",
        "carModelProject": "",
        "currentRounds": null,
        "sapCode": "11085",
        "factoryNameCh": "立达汽车系统",
        "factoryNameEng": null,
        "isPresent": 0,
        "updateDate": "2021-06-03 14:28:15",
        "id": 5959226
      }
    ]
  },
  {
    "supplierId": "150001010",
    "rfqId": "8",
    "frmRate": null,
    "isFRMRate": 0,
    "fsnrGsnrNum": "FS06-10001",
    "partNum": "141951253B",
    "tmPartProjId": "50002001",
    "partNameCh": "继电器",
    "partNameGer": "ARBEITSKONTAKTRELAIS",
    "carModelProject": "",
    "currentRounds": null,
    "sapCode": "11085",
    "factoryNameCh": "上海爱导",
    "factoryNameEng": null,
    "isPresent": 0,
    "updateDate": null,
    "nestedList": null,
    "id": 6722559,
    "hasChildren": null,
    "children": []
  }
]

// 单一供应商表头
export const singleSupplierTitle = [
  {
    props: 'rfqId',
    name: 'RFQ编号',
    key: 'nominationLanguage_RFQBianHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNum',
    name: 'FS/GS/SP NO.',
    key: 'FS/GS/SP NO.',
    tooltip: false
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'nominationLanguage_LingJianHao',
    tooltip: false
  },
  {
    props: 'partNameCh',
    name: '零件名(中)',
    key: 'nominationLanguage_LingJianMingCN',
    tooltip: false
  },
  {
    props: 'partNameGer',
    name: '零件名(德)',
    key: 'nominationLanguage_LingJianMingDE',
    tooltip: false
  },
  {
    props: 'suppliersName',
    name: '供应商名',
    key: 'nominationSupplier_GongYingShangMing',
    tooltip: false
  },
  {
    props: 'sapCode',
    name: 'SAP号',
    key: 'nominationSupplier_SAPHao',
    tooltip: false
  },
  {
    props: 'singleReason',
    name: '单一原因',
    key: 'nominationSupplier_DanYiYuanYin',
    tooltip: false
  },
  {
    props: 'department',
    name: '部门',
    key: 'nominationSupplier_BuMen',
    tooltip: false,
    width:'200px'
  },
  {
    props: 'updateDate',
    name: '更新时间',
    key: 'nominationSupplier_GengXinShiJian',
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
    "sapCode": "88718273662",
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
    "sapCode": "88718273662",
    "supplierName": "Haier",
    "fsnrGsnrNameEn": "Haier",
    "show": "Y",
    "isTop": false
  }
]

// 零件清单表头
export const partTitle = [
  {
    props: 'rfqId',
    name: 'RFQ编号',
    key: 'nominationLanguage_RFQBianHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNum',
    name: 'FS/GS/SP NO.',
    key: '',
    tooltip: false
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'nominationLanguage_LingJianHao',
    tooltip: false
  },
  {
    props: 'partNameZh',
    name: '零件名(中)',
    key: 'nominationLanguage_LingJianMingCN',
    tooltip: false
  },
  {
    props: 'partNameDe',
    name: '零件名(德)',
    key: 'nominationLanguage_LingJianMingDE',
    tooltip: false
  },
  {
    props: 'procureFactoryName',
    name: '采购工厂',
    key: 'nominationSupplier_CaiGouGongChang',
    tooltip: false
  },
  {
    props: 'partProjectType',
    name: '零件项目类型',
    key: 'nominationSupplier_LingJianXiangMuLeiXing',
    tooltip: false
  },
  {
    props: 'cartypeCategory',
    name: '车型大类',
    key: 'nominationSupplier_CheXingDaLei',
    tooltip: false
  },
  {
    props: 'cartypeProjectZh',
    name: '车型项目',
    key: 'nominationSupplier_CheXingXiangMu',
    tooltip: false
  },
  {
    props: 'orderDate',
    name: '更新时间',
    key: 'nominationSupplier_GengXinShiJian',
    tooltip: false
  },
  {
    props: 'partStatus',
    name: '零件状态',
    key: 'nominationSupplier_LingJianZhuangTai',
    tooltip: false
  },
  {
    props: 'buyerName',
    name: '询价采购员',
    key: 'nominationSupplier_XunJiaCaiGouYuan',
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'LINIE',
    key: 'LINIE',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: 'CF目标价',
    key: 'nominationSupplier_CFMuBiaoJia',
    tooltip: false
  },
  {
    props: 'isTop',
    name: '',
    key: '',
    tooltip: false
  },
]