/*
 * @Author: your name
 * @Date: 2021-07-26 16:46:49
 * @LastEditTime: 2021-09-28 14:27:56
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\components\data.js
 */
export const contentDeclareQueryForm = {
  partNum: "",
  supplierSapCode: "",
  cartypeProjectCode: [""],
  status: [""],
  isMtz: "",
  procureFactory: "",
  supplierNameZh: "",
  investCarTypePro: ""
}

export const contentDeclareTableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true, fixed: true, width: "100",isExport:true },
  { props: "partNameZh", name: "零件名称", key: "LINGJIANMINGCHENG", tooltip: true, fixed: true, width: "100",isExport:true },
  { props: "isReferenceDesc", name: "相关表态", key: "XIANGGUANBIAOTAI", tooltip: true },
  { props: "statusDesc", name: "内容状态", key: "NEIRONGZHUANGTAI", tooltip: true },
  { props: "changeType", name: "变更类型", key: "BIANGENGLEIXING", tooltip: true },
  { props: "cartypeZh", name: "涉及⻋型/⻋型项⽬", key: "SHEJICHEXINGCHEXINGXIANGMU", tooltip: true, width: 130,isExport:true },
  { props: "oldPartNumPreset", name: "原零件号", key: "AEKO_YUANLINGJIANHAO_1", tooltip: true, width: 140,isExport:true },
  { props: "oldPartNamePreset", name: "原零件名称", key: "YUANLINGJIANMINGCHENG", tooltip: true},
  { props: "factoryName", name: "采购⼯⼚", key: "CAIGOUGONGCHANG", tooltip: true ,isExport:true},
  { props: "supplierSapCode", name: "供应商SAP号", key: "LK_GONGYINGSHANGSAPHAO", tooltip: true,width:100 ,isExport:true},
  { props: "supplierNameZh", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "bpriceChange", name: "B价变动(含分摊)", key: "BJIABIANDONGHANFENTAN", tooltip: true, width: 110 },
  { props: "mouldPriceChange", name: "模具投资变动", key: "MUJUTOUZIBIANDONG", tooltip: true, width: 100 },
  { props: "dosage", name: "装⻋率/每⻋⽤量", key: "ZHUANGCHELVMEICHEYONGLIANG", tooltip: true, width: 120 },
  { props: "quotationId", name: "报价单", key: "BAOJIADAN", tooltip: true },
  { props: "priceAxis", name: "价格轴", key: "JIAGEZHOU", tooltip: true },
  { props: "investCarTypePro", name: "指定投资⻋型项⽬", key: "ZHIDINGTOUZICHEXINGXIANGMU", tooltip: true, width: 150 },
  { props: "isMtz", name: "MTZ变更", key: "MTZBIANGENG", tooltip: true },
  { props: "originBnkTranWayDesc", name: "原承运方式", key: "LK_AEKO_YUANCHENGYUNFANGSHI", tooltip: true },
  { props: "newBnkTranWayDesc", name: "新承运方式", key: "LK_AEKO_XINCHENGYUNFANGSHI", tooltip: true }
]

export const hidenTableTitle=[
  { props: "currency", name: "货币", key: "LK_AEKO_SELECT_HUOBI", tooltip: true },
  { props: "sampleCost", name: "样件费", key: "LK_AEKO_SELECT_YANGJIANFEI", tooltip: true },
  { props: "terminationPrice", name: "终止费", key: "LK_AEKO_SELECT_ZHONGZHIFEI", tooltip: true },
  { props: "priceUnit", name: "价格单位", key: "LK_AEKO_SELECT_JIAGEDANWEI", tooltip: true },
  { props: "measureUnit", name: "计量单位", key: "LK_AEKO_SELECT_JILIANGDANWEI", tooltip: true },
  { props: "isReplace", name: "是否代报价", key: "LK_AEKO_SELECT_SHIFOUDAIBAOJIA", tooltip: true },
]

export const mtzOptions = [
  { key: 1, label: "是", value: 1 },
  { key: 0, label: "否", value: 0 }
]

export const dosageDialogForm = [
  { props: "cartypeProject", name: "⻋型项⽬", key: "CHEXINGXIANGMU", permissionKey: "AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_SELECT_CARTYPEPROJECT" },
  { props: "factoryName", name: "工厂", key: "GONGCHANG", permissionKey: "AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_TEXT_FACTORY" },
  { props: "supplierName", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", permissionKey: "AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_TEXT_SUPPLIERNAME" },
  { props: "usePortion", name: "沿⽤原零件份额", key: "YANYONGYUANLINGJIANFENE", permissionKey: "AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_INPUT_USEPORTION" }
]

export const dosageDialogTableTitle = [
  { props: "levels", name: "配置", key: "PEIZHI", tooltip: true },
  { props: "engineType", name: "发动机/电池", key: "FADONGJIDIANCHI", tooltip: true },
  { props: "gearType", name: "变速箱/⾥程", key: "BIANSUXIANGLICHENG", tooltip: true },
  { props: "assemblyRate", name: "装⻋率", key: "ZHUANGCHELV", tooltip: true },
  { props: "perCarDosage", name: "⽤量", key: "YONGLIANG", tooltip: true },
]

// 审批附件表头
export const approveAttachTableTitle = [
  { props: "fileName", name: "文件名", key: "LK_WENJIANMING", tooltip: true },
  { props: "fileDescribe", name: "文件描述", key: "LK_WENJIANMIOASHU", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "createDate", name: "上传日期", key: "SHANGCHUANRIQI", tooltip: true },
  { props: "createBy", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
  { props: "remark", name: "备注", key: "LK_BEIZHU", tooltip: true }
]

// 审批记录表头
export const approveReCordTableTitle = [
  { props: "levels", name: "审批类型", key: "SHENPILEIXING", tooltip: true },
  { props: "engineType", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
  { props: "gearType", name: "操作", key: "CAOZUO", tooltip: true },
  { props: "assemblyRate", name: "操作人", key: "CAOZUOREN", tooltip: true },
  { props: "perCarDosage", name: "操作时间", key: "LK_UpdateDate", tooltip: true },
  { props: "perCarDosage", name: "审批意见", key: "SHENPIYIJIAN", tooltip: true },
  { props: "perCarDosage", name: "申请人解释", key: "SHENQINGRENJIESHI", tooltip: true },
  { props: "attach", name: "解释附件", key: "JIESHIFUJIAN", tooltip: true },
]