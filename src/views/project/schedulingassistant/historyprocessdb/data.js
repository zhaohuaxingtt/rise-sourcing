/*
 * @Author: Luoshuang
 * @Date: 2021-08-02 15:35:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-19 18:50:42
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\data.js
 */

export const searchListPro = [
  {value: 'level', name: '查看维度', key: 'CHAKANWEIDU', type: 'select', selectOption: 'levelOptions'},
  {value: 'cartypeProId', name: '车型项目', key: 'CHEXINGXINAGMU', type: 'select', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'productGroup', name: '产品组', key: 'LK_CHANPINZU', type: 'inputFilter', placeholder: '输入产品组搜索', placeholderKey: 'SHURUCHANPINZUSOUSUO'},
  {value: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: 'input', placeholder: '输入零件号搜索', placeholderKey: 'SHURULINGJIANHAOSOUSUO'},
  // {value: 'categoryName', name: '材料组', key: 'CAILIAOZU', type: 'input', placeholder: '输入材料组搜索', placeholderKey: 'SHURUCAILIAOZUSOUSUO' },
]

export const searchListPart = [
  {value: 'level', name: '查看维度', key: 'CHAKANWEIDU', type: 'select', selectOption: 'levelOptions'},
  {value: 'cartypeProId', name: '车型项目', key: 'CHEXINGXINAGMU', type: 'select', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'sixPartCode', name: '六位号', key: 'LIUWEIHAO', type: 'input', placeholder: '输入六位号搜索', placeholderKey: 'SHURULIUWEIHAOSOUSUO'},
  {value: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: 'input', placeholder: '输入零件号搜索', placeholderKey: 'SHURULINGJIANHAOSOUSUO'},
  {value: 'categoryName', name: '材料组', key: 'CAILIAOZU', type: 'input', placeholder: '输入材料组搜索', placeholderKey: 'SHURUCAILIAOZUSOUSUO' },
]

export const regularTableTitle = [
  {props:'code',name:'产品组编号', key: "CHANPINZUBIANHAO", tooltip: true},
  {props:'pgNameZh',name:'产品组中文名称', key: "CHANPINZUZHONGWENMINGCHENG", tooltip: true},
  {props:'pgNameDe',name:'产品组德文名称', key: "CHANPINZUDEWENMINGCHENG", tooltip: true},
  {props:'releaseNomiWeek',name:'释放-定点(周)', key: "SHIFANGDINGDIANZHOU", tooltip: true},
  {props:'nomiToBffWeek',name:'定点-BF(周)', key: "DINGDIANBFZHOU", tooltip: true},
  {props:'bfFirstTryoutWeek',name:'BF-1st Tryout(周)', key: "BFFIRSTTRYOUTZHOU", tooltip: true},
  {props:'firstTryOtsWeek',name:'1st Tryout-OTS(周)', key: "FIRSTTRYOUTOTSZHOU", tooltip: true},
  {props:'firstTryEmWeek',name:'1st Tryout-EM(周)', key: "FIRSTTRYOUTEMZHOU", tooltip: true},
  {props:'sixPartCode',name:'代表6位号', key: "DAIBIAOLIUWEIHAO", tooltip: true},
]

export const partTableTitle = [
  {props:'productGroupCode',name:'产品组编号', key: "CHANPINZUBIANHAO", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'productGroupZh',name:'产品组中文名称', key: "CHANPINZUZHONGWENMINGCHENG", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'productGroupDe',name:'产品组德文名称', key: "CHANPINZUDEWENMINGCHENG", tooltip: true, isSelect: true, disabled: true, checkWidth: '54%', minWidth: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'partNameZh',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, isSelect: true, minWidth: 120},
  {props:'partNameDe',name:'零件德文名称', key: "LINGJIANDEWENMINGCHENG", tooltip: true, isSelect: true, minWidth: 120},
  {props:'categoryCode',name:'材料组编号', key: "CAILIAOZUBIANHAO", tooltip: true, isSelect: true, minWidth: 120},
  {props:'categoryNameZh',name:'材料组名称', key: "CAILIAOZUMINGCHENG", tooltip: true, isSelect: true, minWidth: 120},
  {props:'modelNameZh',name:'车型', key: "CHEXING", tooltip: true, isSelect: true, minWidth: 120},
  {props:'prjTmTeileclubProjNameZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'startProduceSop',name:'车型项目SOP年份', key: "CHEXINGXIANGMUSOPNIANFEN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'fsnrGsnrNum',name:'FS号', key: "FSHAO", tooltip: true, isSelect: true, checkWidth: '36%', minWidth: 100},
  {props:'fsdocIst',name:'零件释放时间', key: "LINGJIANSHIFANGSHIJIAN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'fsdocDelay',name:'释放是否延误', key: "SHIFANGSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'fsdocReason',name:'释放延误原因', key: "SHIFANGYANWUYUANYIN", tooltip: true, isSelect: true, checkWidth: '54%', minWidth: 120},
  {props:'cscSoll1',name:'定点soll1', key: "DINGDIANSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'cscSoll2',name:'定点soll2', key: "DINGDIANSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'cscIst',name:'定点ist', key: "DINGDIANIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'cscDelay',name:'定点是否延误', key: "DINGDIANSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'cscReason',name:'定点延误原因', key: "DINGDIANYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bfSoll1',name:'BF soll1', key: "BFSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bfSoll2',name:'BF soll2', key: "BFSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bfIst',name:'BF ist', key: "BFIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bfReason',name:'BF延误原因', key: "BFYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120, checkWidth: '36%'},
  {props:'isttryoutSoll1',name:'1st tryout soll1', key: "1STTRYOUTSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'isttryoutSoll2',name:'1st tryout soll2', key: "1STTRYOUTSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'isttryoutIst',name:'1st tryout ist', key: "1STTRYOUTIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'isttryoutDelay',name:'1st tryout是否延误', key: "1STTRYOUTSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'isttryoutReason',name:'1st tryout延误原因', key: "1STTRYOUTYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'emSoll1',name:'EM soll1', key: "EMSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'emSoll2',name:'EM soll2', key: "EMSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'emIst',name:'EM ist', key: "EMIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'emDelay',name:'EM是否延误', key: "EMSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'emReason',name:'EM延误原因', key: "EMYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'otsSoll1',name:'OTS soll1', key: "OTSSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'otsSoll2',name:'OTS soll2', key: "OTSSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'otsIst',name:'OTS ist', key: "OTSIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'otsDelay',name:'OTS是否延误', key: "OTSSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'otsReason',name:'OTS延误原因', key: "OTSYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q1Soll1',name:'Q1 soll1', key: "Q1SOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q1Soll2',name:'Q1 soll2', key: "Q2SOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q1Ist',name:'Q1 ist', key: "Q1IST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q1Delay',name:'Q1是否延误', key: "Q1SHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q1Reason',name:'Q1延误原因', key: "Q1YANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q3Soll1',name:'Q3 soll1', key: "Q3SOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q3Soll2',name:'Q3 soll2', key: "Q3SOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q3Ist',name:'Q3 ist', key: "Q3IST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q3Delay',name:'Q3是否延误', key: "Q3SHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'q3Reason',name:'Q3延误原因', key: "Q3YANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgSoll1',name:'BMG soll1', key: "BMGSOLL1", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgSoll2',name:'BMG soll2', key: "BMGSOLL2", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgIst',name:'BMG ist', key: "BMGIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgDelay',name:'BMG是否延误', key: "BMGSHIFOUYANWU", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgReason',name:'BMG延误原因', key: "BMGYANWUYUANYIN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'kickoffIst',name:'零件Kickoff时间', key: "LINGJIANKICKOFFSHIJIAN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'linieName',name:'专业采购员', key: "ZHUANYECAIGOUYUAN", tooltip: true, isSelect: true, minWidth: 120},
  {props:'fop',name:'EP', key: "EP", tooltip: true, isSelect: true, minWidth: 120},
  {props:'bmgFlag',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'selFlag',name:'是否SEL', key: "SHIFOUSEL", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'sourceType',name:'Sourcing类别', key: "SOURCINGLEIXING", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'cartypeProType',name:'车型项目类型', key: "CHEXINGXIANGMULEIXING", tooltip: true, isSelect: true, minWidth: 120},
  {props:'partProjectType',name:'零件采购项目类型', key: "LINGJIANCAIGOUXIANGMULEIXING", tooltip: true, isSelect: true, minWidth: 120},
  {props:'fsdocCscWeekly',name:'释放-定点(周)', key: "SHIFANGDINGDIANZHOU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'cscBfWeekly',name:'定点-BF(周)', key: "DINGDIANBFZHOU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'bf1stWeekly',name:'BF-1st Tryout(周)', key: "BFFIRSTTRYOUTZHOU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'ots1stWeekly',name:'1st Tryout-OTS(周)', key: "FIRSTTRYOUTOTSZHOU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'em1stWeekly',name:'1st Tryout-EM(周)', key: "FIRSTTRYOUTEMZHOU", tooltip: true, isSelect: true, disabled: true, minWidth: 120},
  {props:'oldPartNum',name:'原零件号', key: "YUANLINGJIANHAO", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldFsnrGsnrNum',name:'原FS号', key: "YUANFSHAO", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldFsdocIst',name:'原零件释放ist', key: "YUANLINGJIANSHIFANGIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldCscSoll1',name:'原零件定点ist', key: "YUANLINGJAINDINGDIANIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldBfIst',name:'原零件BF ist', key: "YUANLINGJIANBFIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldKickoffIst',name:'原零件Kickoff ist', key: "YUANLINGJIANKICKOFFIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldOtsIst',name:'原零件OTS ist', key: "YUANLINGJIANOTSIST", tooltip: true, isSelect: true, minWidth: 120},
  {props:'oldEmIst',name:'原零件EM ist', key: "YUANLINGJIANEMIST", tooltip: true, isSelect: true, minWidth: 120},
]

export const productLogicList = [
  {value: 'cartypeProId', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU', selectOption: 'carProjectOptions', filterable: true, required: true},
  {value: 'cartype', label: '车型', type: 'select', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'productGroup', label: '产品组', type: 'inputFilter', i18n_label: 'CHANPINZU', required: true},
  {value: 'year', label: '年份', type: 'select', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {},
  {value: 'value', label: '取值处理', type: 'select', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
]

export const partLogicList = [
  {value: 'cartypeProId', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU', selectOption: 'carProjectOptions', filterable: true, required: true},
  {value: 'cartype', label: '车型', type: 'select', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'sixPartCode', label: '六位号', type: 'input', i18n_label: 'LIUWEIHAO', required: true},
  {value: 'year', label: '年份', type: 'select', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {},
  {value: 'categoryType', label: '材料组', type: 'select', i18n_label: 'CAILIAOZU', selectOption: 'CATEGORY_CONFIG_OPTIONS'},
  {},
  {value: 'value', label: '取值处理', type: 'select', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
]