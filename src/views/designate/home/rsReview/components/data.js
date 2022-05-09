/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2022-03-25 15:10:53
 * @LastEditors: YoHo
 * @Description: sel上会复核
 *
 */

// 筛选参数
export const form = {
  showSelf: true
}

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'id',
  name: '申请单号',
  width: 105,
  key: 'nominationLanguage_ShenQingDanHao',
  tooltip: true,
  sortable: true
},
{
  props: 'nominateName',
  name: '申请单名',
  width: 250,
  key: 'nominationLanguage_ShenQingDanMing',
  tooltip: true,
  sortable: true
},
{
  props: 'carType',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: true,
  width:200,
  sortable: true
},
{
	props: 'applicationStatusDesc',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:true,
  width:120,
  sortable: true
},
{
  props: 'partProjTypeDesc',
  name: '零件项目类型',
  key: 'LINGJIANXIANGMULEIXING',
  width: 150,
  tooltip: true,
  sortable: true
},
{
  props: 'meetingName',
  name: '会议',
  key: 'nominationLanguage_HuiYi',
  tooltip: true,
  width:180,
  sortable: true
},
{
  props: 'nominateUserName',
  name: '询价采购员',
  width: 150,
  key: 'nominationLanguage_XunJiaCaiGouYuan',
  tooltip: true,
  sortable: true
},
{
  props: 'linieName',
  name: 'LINIE',
  key: 'LINIE',
  tooltip: true,
  width:120,
  sortable: true
},
{
  props: 'rsStatusDesc',
  name: 'RS单状态',
  key: 'nominationLanguage_RSZhuangTai',
  tooltip: true,
  width:110,
  sortable: true
},
{
  props: 'rsFreezeDate',
  name: 'RS冻结日期',
  width: 125,
  key: 'nominationLanguage_RSDongJieRiQi',
  tooltip: true,
  sortable: true
},
{
  props: 'isPriceConsistent',
  name: '报价一致性校验状态',
  width: 180,
  key: 'nominationLanguage_BaoJiaYiZhiXingZhuangTai',
  tooltip: true,
  sortable: true
},
{
  props: 'selStatus',
  name: 'SEL单据确认状态',
  width: 160,
  key: 'nominationLanguage_SELDanJuQUeRenZH',
  tooltip: true,
  sortable: true
},
{
	props: 'checkDueDate',
	name: '复核截止日期',
  width: 135,
	key: 'nominationLanguage.FuHeJieZhiRiQi',
	tooltip:true,
  sortable: true
},
{
	props: 'signCode',
	name: '签字单号',
	key: 'nominationLanguage.QianZiDanHao',
	tooltip:true,
  width: 150,
  sortable: true
},
{
  props: 'signStatusDesc',
  name: '签字单状态',
  width: 150,
  key: 'nominationLanguage.QianZiDanZhuangTai',
  tooltip: true,
  sortable: true
},
{
  props: 'freezeDate',
  name: '冻结日期',
  width: 110,
  key: 'nominationLanguage_DongJieRiQi',
  tooltip: true,
  sortable: true
},
]

export const mokeResData = [
  {
    id: '762345662',
    selStatus: '未分摊'
  },
  {
    id: '762345664',
    selStatus: '已确认'
  },
  {
    id: '762345665',
    selStatus: '未确认'
  }
]

// 签字单下拉菜单
export const signMenu = [
  {
    name: '新建签字单',
    key: 'XINJIANQIANZIDAN',
    path: '/sourcing/partsnomination/signSheet/addSignOverView/details?mode=add'
  },
  {
    name: 'M签字单列表',
    key: 'MQIANZIDANLIEBIAO',
    path: '/sourcing/partsnomination/signSheet'
  },
]