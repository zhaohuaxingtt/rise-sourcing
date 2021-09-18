/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-08-25 16:28:44
 * @LastEditors: Please set LastEditors
 * @Description: sel上会复核
 *
 */

// 筛选参数
export const form = {
}

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'id',
  name: '申请单号',
  width: 80,
  key: 'nominationLanguage_ShenQingDanHao',
  tooltip: true
},
{
  props: 'nominateName',
  name: '申请单名',
  width: 250,
  key: 'nominationLanguage_ShenQingDanMing',
  tooltip: true
},
{
  props: 'carType',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: true,
  width:200
},
{
	props: 'applicationStatusDesc',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:true,
  width:120
},
{
  props: 'partProjTypeDesc',
  name: '零件项目类型',
  key: 'LINGJIANXIANGMULEIXING',
  width: 150,
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
  width: 150,
  key: 'nominationLanguage_XunJiaCaiGouYuan',
  tooltip: true
},
{
  props: 'linieName',
  name: 'LINIE',
  key: 'LINIE',
  tooltip: true,
  width:120
},
{
  props: 'rsStatusDesc',
  name: 'RS单状态',
  key: 'nominationLanguage_RSZhuangTai',
  tooltip: true
},
{
  props: 'rsFreezeDate',
  name: 'RS冻结日期',
  width: 150,
  key: 'nominationLanguage_RSDongJieRiQi',
  tooltip: true
},
{
  props: 'isPriceConsistent',
  name: '报价一致性校验状态',
  width: 150,
  key: 'nominationLanguage_BaoJiaYiZhiXingZhuangTai',
  tooltip: true
},
{
  props: 'selStatus',
  name: 'SEL单据确认状态',
  width: 150,
  key: 'nominationLanguage_SELDanJuQUeRenZH',
  tooltip: true
},
{
	props: 'checkDueDate',
	name: '复核截止日期',
  width: 150,
	key: 'nominationLanguage.FuHeJieZhiRiQi',
	tooltip:true
},
{
	props: 'signId',
	name: '签字单号',
	key: 'nominationLanguage.QianZiDanHao',
	tooltip:true
},
{
  props: 'signStatusDesc',
  name: '签字单状态',
  width: 150,
  key: 'nominationLanguage.QianZiDanZhuangTai',
  tooltip: true
},
{
  props: 'freezeDate',
  name: '冻结日期',
  width: 150,
  key: 'nominationLanguage_DongJieRiQi',
  tooltip: true
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
    path: '/sourcing/partsnomination/signSheet/details?mode=add'
  },
  {
    name: 'M签字单列表',
    key: 'MQIANZIDANLIEBIAO',
    path: '/sourcing/partsnomination/signSheet'
  },
]