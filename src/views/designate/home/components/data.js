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
  props: 'id',
  name: '申请单号',
  key: 'nominationLanguage.ShenQingDanHao',
  tooltip: false
},
{
  props: 'nominateName',
  name: '申请单名',
  width: 200,
  key: 'nominationLanguage.ShenQingDanMing',
  tooltip: false
},
{
  props: 'carTypeProj',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: false
},
{
  props: 'nominateProcessType',
  name: '类型',
  key: 'nominationLanguage.LeiXing',
  tooltip: true
},
{
	props: 'applicationStatus',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:false
},
{
  props: 'carType',
  name: '项目类型',
  key: 'nominationLanguage.XingMuLeiXing',
  tooltip: false
},
{
  props: 'meetingPresentId',
  name: '会议',
  key: 'nominationLanguage.HuiYi',
  tooltip: true
},
{
  props: 'nominateUserName',
  name: '询价采购员',
  width: 150,
  key: 'nominationLanguage.XunJiaCaiGouYuan',
  tooltip: true
},
{
  props: 'linieName',
  name: 'LINIE',
  key: 'LINIE',
  tooltip: false
},
{
  props: 'rsStatus',
  name: 'RS单状态',
  key: 'nominationLanguage.RSZhuangTai',
  tooltip: false
},
{
  props: 'rsFreezeDate',
  name: 'RS冻结日期',
  width: 150,
  key: 'nominationLanguage.RSDongJieRiQi',
  tooltip: false
},
{
  props: 'isPriceConsistent',
  name: '报价一致性校验状态',
  width: 150,
  key: 'nominationLanguage.BaoJiaYiZhiXingZhuangTai',
  tooltip: false
},
{
  props: 'selStatus',
  name: 'SEL单据确认状态',
  width: 150,
  key: 'nominationLanguage.SELDanJuQUeRenZH',
  tooltip: false
},
{
  props: 'nominateDate',
  name: '定点日期',
  width: 150,
  key: 'nominationLanguage.DingDianRiQi',
  tooltip: false
},
{
  props: 'LK_CAOZUO',
  name: '操作',
  key: 'LK_CAOZUO',
  tooltip: false
}
]