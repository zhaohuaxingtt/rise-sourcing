/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-08-25 16:34:59
 * @LastEditors: Please set LastEditors
 * @Description: 定点表格信息
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
  key: 'nominationLanguage_ShenQingDanHao',
  tooltip: true,
  width:70
},
{
  props: 'nominateName',
  name: '申请单名',
  width: 250,
  key: 'nominationLanguage_ShenQingDanMing',
  tooltip: false
},
{
  props: 'carType',
  name: 'PROJECT',
  key: 'PROJECT',
  tooltip: true,
  width:130
},
{
  props: 'nominateProcessType',
  name: '类型',
  key: 'nominationLanguage_LeiXing',
  tooltip: true,
  width:80
},
{
	props: 'applicationStatus',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:false,
  width:80
},
{
	props: 'freezeDate',
	name: '冻结日期',
	key: 'nominationLanguage_DongJieRiQi',
	tooltip: true,
  width:100
},
{
  props: 'partProjTypeDesc',
  name: '项目类型',
  key: 'nominationLanguage_XingMuLeiXing',
  tooltip: true
},
{
  props: 'meetingPresentId',
  name: '会议',
  key: 'nominationLanguage_HuiYi',
  tooltip: true
},
{
  props: 'meetingStatus',
  name: '会议状态',
  key: 'nominationLanguage_HuiYiZhuangTai',
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
  width:100
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
  width: 160,
  key: 'nominationLanguage_BaoJiaYiZhiXingZhuangTai',
  tooltip: true
},
{
  props: 'selStatus',
  name: 'SEL单据确认状态',
  width: 160,
  key: 'nominationLanguage_SELDanJuQUeRenZH',
  tooltip: true
},
{
  props: 'nominateDate',
  name: '定点日期',
  width: 150,
  key: 'nominationLanguage_DingDianRiQi',
  tooltip: true
},
// {
//   props: 'LK_CAOZUO',
//   name: '操作',
//   key: 'LK_CAOZUO',
//   tooltip: false
// }
]

// sel确认单
export const seltTableTitle = [
  {
    props: 'fileName',
    name: '文件名称',
    key: 'LK_WENJIANMING',
    tooltip: true
  },
  {
    props: 'fileSize',
    name: '大小',
    key: 'DAXIAO',
    tooltip: false
  },
  {
    props: 'uploadDate',
    name: '上传日期',
    key: 'LK_SHANGCHUANRIQI',
    tooltip: true
  },
  {
    props: 'uploadBy',
    name: '上传人',
    key: 'LK_SHANGCHUANREN',
    tooltip: true
  }
]