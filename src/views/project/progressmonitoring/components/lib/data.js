/*
 * @Author: your name
 * @Date: 2021-08-25 14:06:11
 * @LastEditTime: 2022-03-23 15:59:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\components\lib\data.js
 */
export const pendingChartData = [
  {
    id: 'chart101',
    title: "匹配异常",
    value8: 60,
    value7: 40,
    value4: 100,
    disabled: true,
    hideTaskProcess: true,
    type: 3,
    code: '0'
  },
  {
    id: 'chart102',
    title: "待释放",
    value1: 55,
    value2: 5,
    value3: 40,
    value4: 100,
    disabled: true,
    hideTaskProcess: true,
    type: 1,
    code: '1'
  },
]
// moke数据
export const chartData = [
  {
    id: 'chart101',
    title: "匹配异常",
    value8: 60,
    value7: 40,
    value4: 100,
    disabled: true,
    hideTaskProcess: true,
    type: 3,
    code: '0',
    i18n: 'PIPEIYICHANG'
  },
  {
    id: 'chart102',
    title: "待释放",
    value1: 55,
    value2: 5,
    value3: 40,
    value4: 100,
    disabled: true,
    hideTaskProcess: true,
    type: 1,
    code: '1',
    i18n: 'DAISHIFANG'
  },
  {
    id: 'chart3',
    title: "待定点",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '2',
    i18n: 'DAIDINGDIAN'
  },
  {
    id: 'chart4',
    title: "待Kick-off",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '3',
    i18n: 'DAIKICKOFF'
  },
  {
    id: 'chart5',
    title: "数据待冻结",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '4',
    i18n: 'SHUJUDAIDONGJIE'
  },
  {
    id: 'chart6',
    title: "tryout待完成",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '5',
    i18n: 'TRYOUTDAIWANCHENG'
  },
  {
    id: 'chart7',
    title: "EM待完成",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '7',
    i18n: 'EMDAIWANCHENG'
  },
  {
    id: 'chart8',
    title: "OTS待完成",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '8',
    i18n: 'OTSDAIWANCHENG'
  },

]
// 项目风险
export const projectRisk = [
  {
    code: '1',
    name: '无风险',
  },
  {
    code: '2',
    name: '中风险',
  },
  {
    code: '3',
    name: '高风险',
  }
]

// 项目已完成枚举值
export const projectDone = [
  {
    code: '2',
    name: '超期',
  },
  {
    code: '1',
    name: '按期',
  }
]

// 项目进度
export const partProc = [
  {
    code: '1',
    name: '正常状态',
    icon: 'iconbaojiapingfengenzong-jiedian-lv',
    valueKey: 'taskProgressNormal',
  },
  {
    code: '2',
    name: '轻微延误',
    icon: 'iconbaojiapingfengenzong-jiedian-huang',
    valueKey: 'taskProgressLittleDelay',
  },
  {
    code: '3',
    name: '延误',
    icon: 'iconbaojiapingfengenzong-jiedian-hong',
    valueKey: 'taskProgressDelay',
  },
  {
    code: '4',
    name: '严重延误',
    icon: 'iconbaojiapingfengenzong-jiedian-hei',
    valueKey: 'taskSeriousDelay',
  }
]

// 匹配异常处理状态
export const patchStatus = [
  {
    code: '1',
    name: '待处理'
  },
  {
    code: '2',
    name: '已处理'
  },
]