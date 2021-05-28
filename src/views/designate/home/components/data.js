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

// 流程类型字典
export const ptocessType = [
  {
    value: '上会',
    key: 'A'
  },
  {
    value: '流转',
    key: 'B'
  },
  {
    value: '备案',
    key: 'C'
  }
]

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'fsnrGsnrNum',
  name: '申请单号',
  key: 'nominationLanguage.ShenQingDanHao',
  tooltip: false
},
{
  props: 'partNum',
  name: '申请单名',
  key: 'nominationLanguage.ShenQingDanMing',
  tooltip: false
},
{
  props: 'PROJECT',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: false
},
{
  props: 'partNameDe',
  name: '类型',
  key: 'nominationLanguage.LeiXing',
  tooltip: true
},
{
	props: 'statusName',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:false
},
{
  props: 'partProjectTypeName',
  name: '项目类型',
  key: 'nominationLanguage.XingMuLeiXing',
  tooltip: false
},
{
  props: 'cartypeCategory',
  name: '会议',
  key: 'nominationLanguage.HuiYi',
  tooltip: true
},
{
  props: 'cartypeProjectZh',
  name: '询价采购员',
  key: 'nominationLanguage.XunJiaCaiGouYuan',
  tooltip: true
},
{
  props: 'LINIE',
  name: 'LINIE',
  key: 'LINIE',
  tooltip: false
},
{
  props: 'rstate',
  name: 'RS单状态',
  key: 'nominationLanguage.RSZhuangTai',
  tooltip: false
},
{
  props: 'rsdate',
  name: 'RS冻结日期',
  key: 'nominationLanguage.RSDongJieRiQi',
  tooltip: false
},
{
  props: 'linieName',
  name: '报价一致性校验状态',
  key: 'nominationLanguage.BaoJiaYiZhiXingZhuangTai',
  tooltip: false
},
{
  props: 'cfControllerZh',
  name: 'SEL单据确认状态',
  key: 'nominationLanguage.SELDanJuQUeRenZH',
  tooltip: false
},
{
  props: 'date',
  name: '定点日期',
  key: 'nominationLanguage.DingDianRiQi',
  tooltip: false
},
{
  name: '操作',
  key: 'LK_CAOZUO',
  tooltip: false
}
]