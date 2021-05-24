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
    props: 'fsnrGsnrNameEn',
    name: '单一原因',
    key: 'nominationSupplier.DanYiYuanYin',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
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
    "descr":  "510923空调压缩机液压阀",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "fsnrGsnrNameEn": "Haier",
    "show": "Y"
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