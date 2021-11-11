/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-11-11 14:42:34
 * @LastEditors:  
 * @Description: 定点表格信息
 *
 */

// 筛选参数
export const form = {
  applicationStatus: 'CHECK_PASS',
  isPriceConsistent: 1,
  // selStatus: 'CONFIRMED'
  selStatus: ''
}

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'id',
  name: '申请单号',
  key: 'nominationLanguage_ShenQingDanHao',
  tooltip: false,
  minWidth: 80
},
{
  props: 'nominateName',
  name: '申请单名',
  minWidth: 260,
  key: 'nominationLanguage_ShenQingDanMing',
  tooltip: true
},
{
  props: 'carType',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: true
},
// {
//   props: 'nominateProcessType',
//   name: '类型',
//   key: 'nominationLanguage_LeiXing',
//   tooltip: true
// },
{
	props: 'applicationStatusDesc',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip: true 
},
{
  props: 'partProjTypeDesc',
  name: '项目类型',
  key: 'nominationLanguage_XingMuLeiXing',
  tooltip: true
},
{
  props: 'meetingName',
  name: '会议',
  key: 'nominationLanguage_HuiYi',
  tooltip: true
},
{
  props: 'nominateUserName',
  name: '询价采购员',
  minWidth: 110,
  key: 'nominationLanguage_XunJiaCaiGouYuan',
  tooltip: true
},
{
  props: 'linieName',
  name: 'LINIE',
  key: 'LINIE',
  tooltip: true
},
{
  props: 'rsStatus',
  name: 'RS单状态',
  key: 'nominationLanguage_RSZhuangTai',
  tooltip: true
},
{
  props: 'rsFreezeDate',
  name: 'RS冻结日期',
  minWidth: 90,
  key: 'nominationLanguage_RSDongJieRiQi',
  tooltip: true
},

// {
// 	props: 'freezeDate',
// 	name: '冻结日期',
// 	key: 'nominationLanguage_DongJieRiQi',
// 	tooltip: true
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
//   tooltip: true
// },
// {
//   props: 'selStatus',
//   name: 'SEL单据确认状态',
//   width: 150,
//   key: 'nominationLanguage_SELDanJuQUeRenZH',
//   tooltip: true
// },
// {
//   props: 'nominateDate',
//   name: '定点日期',
//   width: 150,
//   key: 'nominationLanguage_DingDianRiQi',
//   tooltip: true
// },
// {
//   props: 'LK_CAOZUO',
//   name: '操作',
//   key: 'LK_CAOZUO',
//   tooltip: true
// }
]