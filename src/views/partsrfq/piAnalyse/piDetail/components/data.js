/*
 * @Author: your name
 * @Date: 2021-08-10 09:51:23
 * @LastEditTime: 2021-08-10 22:24:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\piDetail\components\data.js
 */
export const CURRENTTIME = 'currentTime';
export const AVERAGE = 'average';

export const FIRSTSELECT = 'firstSelect';
export const SECONDSELECT = 'secondSelect';
export const THIRDSELECT = 'thirdSelect';

export const classTypeSelect = [
  {value: '1', name: '原材料'},
  {value: '2', name: '人工'},
  {value: '3', name: '汇率'},
];

export const classType = {
  rawMaterial: '1',
  manpower: '2',
  exchangeRate: '3',
};

export const baseInfo = [
  {name: 'FS号', key: 'PI.FSHAO', props: 'a'},
  {name: '供应商', key: 'PI.GONGYINGSHANG', props: 'b'},
  {name: '车型项目', key: 'PI.CHEXINGXIANGMU', props: 'c'},
  {name: '工厂', key: 'PI.GONGCHANG', props: 'd'},
];

export const tableTitle = [
  {name: '类别', key: 'PI.LEIBIE', props: 'classType'},
  {name: '价格影响系数%', key: 'PI.JIAGEYINGXIANGXISHU', props: 'costProportion'},
  {name: '价格变动比率%', key: 'PI.JIAGEBIANDONGBILV', props: 'priceChange'},
  {name: 'CBD', key: '', props: 'attributeValue'},
  {
    name: '系统匹配信息',
    key: 'PI.XITONGPIPEIXINXI',
    props: 'systemMatch',
    width: 550,
  },
];

export const tableEditTitle = [
    ...tableTitle,
  {name: '显示/隐藏', key: 'PI.XIANSHIYINGCANG', props: 'isShow'},
];

export const rawMaterialColor = [
  '#0C47A1',
  '#1976D1',
  '#2297F3',
  '#64B5F6',
  '#00579B',
  '#0188D1',
  '#03A9F4',
  '#50C2F7',
  '#283693',
  '#3949AB',
  '#5C6BC0',
];

export const manpowerColor = [
  '#05838F',
  '#06ABC1',
  '#27C5DA',
  '#00695C',
  '#00897B',
  '#26A79A',
];

export const elseColor = [
  '#212121',
];

export const exchangeRateColor = [
  '#C62928',
  '#E53934',
  '#EF534F',
  '#AD1257',
  '#D71B60',
  '#ED407A',
];

export const mixPriceColor = [
  '#817717',
];

export const purchaseColor = [
  '#F67F16',
];

export function getColor({colorArray}) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export const customTableTitle = [
  {props: 'fsNo', name: 'FS号', key: 'FSHAO'},
  {props: 'partNo', name: '零件号', key: 'LINGJIANHAO'},
  {props: 'rfq', name: 'RFQ', key: 'RFQ'},
  {props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG'},
  {props: 'factory', name: '工厂', key: 'GONGCHANG'},
  {props: 'cardTypeProject', name: '车型项目', key: 'CHEXINGXIANGMU'},
  {props: 'sopDate', name: 'SOP时间', key: 'SOPSHIJIAN'},
  {props: 'isShow', name: '显示/隐藏', key: 'XIANSHIYINCANG'},
  {props: 'sort', name: '排序', key: 'PAIXU'},
];
