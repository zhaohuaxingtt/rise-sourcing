/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-07-05 23:05:50
 * @LastEditors: Please set LastEditors
 * @Description: 定点表格信息
 *
 */

// 筛选参数
export const form = {
  applicationStatus: 'CHECK_PASS',
  isPriceConsistent: 1,
  selStatus: 'Confirmed'
}

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'id',
  name: '申请单号',
  key: 'nominationLanguage_ShenQingDanHao',
  tooltip: false
},
{
  props: 'nominateName',
  name: '申请单名',
  width: 200,
  key: 'nominationLanguage_ShenQingDanMing',
  tooltip: false
},
{
  props: 'carTypeProj',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: false
},
// {
//   props: 'nominateProcessType',
//   name: '类型',
//   key: 'nominationLanguage_LeiXing',
//   tooltip: true
// },
{
	props: 'applicationStatus',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:false
},
{
  props: 'carType',
  name: '项目类型',
  key: 'nominationLanguage_XingMuLeiXing',
  tooltip: false
},
{
  props: 'meetingPresentId',
  name: '会议',
  key: 'nominationLanguage_HuiYi',
  tooltip: true
},
{
  props: 'nominateUserName',
  name: '询价采购员',
  width: 150,
  key: 'nominationLanguage_XunJiaCaiGouYuan',
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
  key: 'nominationLanguage_RSZhuangTai',
  tooltip: false
},
{
  props: 'rsFreezeDate',
  name: 'RS冻结日期',
  width: 150,
  key: 'nominationLanguage_RSDongJieRiQi',
  tooltip: false
},

// {
// 	props: 'freezeDate',
// 	name: '冻结日期',
// 	key: 'nominationLanguage_DongJieRiQi',
// 	tooltip:false
// },
// {
//   props: 'meetingStatus',
//   name: '会议状态',
//   key: 'nominationLanguage_HuiYiZhuangTai',
//   tooltip: true
// },
// {
//   props: 'isPriceConsistent',
//   name: '报价一致性校验状态',
//   width: 150,
//   key: 'nominationLanguage_BaoJiaYiZhiXingZhuangTai',
//   tooltip: false
// },
// {
//   props: 'selStatus',
//   name: 'SEL单据确认状态',
//   width: 150,
//   key: 'nominationLanguage_SELDanJuQUeRenZH',
//   tooltip: false
// },
// {
//   props: 'nominateDate',
//   name: '定点日期',
//   width: 150,
//   key: 'nominationLanguage_DingDianRiQi',
//   tooltip: false
// },
// {
//   props: 'LK_CAOZUO',
//   name: '操作',
//   key: 'LK_CAOZUO',
//   tooltip: false
// }
]