/*
 * @Author: your name
 * @Date: 2021-08-25 14:06:11
 * @LastEditTime: 2021-09-17 14:24:02
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/project/progressmonitoring/components/components/data.js
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
  {
    id: 'chart3',
    title: "待定点",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '2'
  },
  {
    id: 'chart4',
    title: "待Kick-off",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '3'
  },
  {
    id: 'chart5',
    title: "数据待冻结",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '4'
  },
  {
    id: 'chart6',
    title: "tryout待完成",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '5'
  },
  {
    id: 'chart7',
    title: "EM&OTS待完成",
    value1: 70,
    value2: 10,
    value3: 20,
    value4: 100,
    type: 1,
    code: '6'
  },
  {
    id: 'chart8',
    title: "EM&OTS已完成",
    value4: 50,
    value5: 30,
    value6: 20,
    type: 2,
    code: '7'
  },

]
// 项目风险
export const projectRisk = [
  {
    code: '1',
    name: '正常',
  },
  {
    code: '2',
    name: '风险',
  },
  {
    code: '3',
    name: '风险',
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