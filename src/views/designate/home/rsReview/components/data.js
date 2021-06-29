/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-06-29 13:57:39
 * @LastEditors: Please set LastEditors
 * @Description: sel上会复核
 *
 */

// 筛选参数
export const form = {
}

// 申请状态
export const applyStates = [
  {id:'DRAFT',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'提交中',key:'LK_TIJIAOZHONG'},
  {id:'FREERE',name:'已冻结',key:'LK_YIDONGJIE'},
  {id:'ONFLOW',name:'审批中/流转中',key:'LK_SHENPILIUZHUAN'},
  {id:'FINISHFLOW',name:'审批完成/流转完成',key:'LK_SHENPILIUZHUANWANCHENG'},
  {id:'NOMINATE',name:'已定点',key:'LK_YIDINGDIAN'},
]

// 表单表头
export const tableTitle = [{
  //export const tableTitle = permissionTitle("nominationLanguage_nominationLanguageLIST",[{
  props: 'id',
  name: '申请单号',
  width: 150,
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
	props: 'applicationStatus',
	name: '状态',
	key: 'LK_ZHUANGTAI',
	tooltip:false
},
{
  props: 'partProjType',
  name: '项目类型',
  key: 'nominationLanguage.LeiXing',
  tooltip: true
},
{
  props: 'meetingName',
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
	props: 'checkDueDate',
	name: '复核截止日期',
  width: 150,
	key: 'nominationLanguage.FuHeJieZhiRiQi',
	tooltip:false
},
{
	props: 'signId',
	name: '签字单号',
	key: 'nominationLanguage.QianZiDanHao',
	tooltip:false
},
{
  props: 'signStatus',
  name: '签字单状态',
  width: 150,
  key: 'nominationLanguage.QianZiDanZhuangTai',
  tooltip: false
},
{
  props: 'freezeDate',
  name: '冻结日期',
  width: 150,
  key: 'nominationLanguage.DongJieRiQi',
  tooltip: false
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
    key: 'nominationLanguage.XinJianQianZiDan',
    path: '/sourcing/partsnomination/signSheet/details?mode=add'
  },
  {
    name: 'M签字单列表',
    key: 'nominationLanguage.MQianZiDanLiebiao',
    path: '/sourcing/partsnomination/signSheet'
  },
]