/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:24:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-02 16:52:51
 * @Description: 
 * @FilePath: \front-sourcing\src\views\accessoryPart\accessoryPartDetail\data.js
 */

export const detailList = [
  {value: 'partNum', label: '配件零件号', type: 'input', key: 'PEIJIANLINGJIANHAO', permission: 'ACCESSORYPART_DETAILINFO_PARTNUM|配件详情-配件零件号'},
  {value: 'partNameCh', label: '配件零件名(中)', type: 'input', key: 'PEIJIANLINGJIANMING_ZH', permission: 'ACCESSORYPART_DETAILINFO_PARTNAMEZH|配件详情-配件零件名(中)'},
  {value: 'partNameDe', label: '配件零件名(德)', type: 'input', key: 'PEIJIANLINGJIANMING_DE', permission: 'ACCESSORYPART_DETAILINFO_PARTNAMEDE|配件详情-配件零件名(德)'},
  {value: 'sparePartCode', label: '编号', type: 'input', key: 'BIANHAO', permission: 'ACCESSORYPART_DETAILINFO_SAAREPARTCODE|配件详情-编号'},
  {value: 'spnrNum', label: 'SP号', type: 'input', key: 'SPHAO', permission: 'ACCESSORYPART_DETAILINFO_SPNUM|配件详情-SP号'},
  {value: 'annualQuantity', label: '年需求量', type: 'input', key: 'NIANXUQIULIANG', permission: 'ACCESSORYPART_DETAILINFO_ANNUALQUANTITY|配件详情-年需求量'},
  {value: 'carType', label: '配件车型', type: 'input', key: 'PEIJIANCHEXING', permission: 'ACCESSORYPART_DETAILINFO_CARTYPE|配件详情-配件车型'},
  {value: 'carProject', label: '配件车型项目', type: 'input', key: 'PEIJIANCHEXINGXIANGMU', permission: 'ACCESSORYPART_DETAILINFO_CARPROJECT|配件详情-配件车型项目'},
  {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', key: 'PILIANGGONGHUOZONGCHENGHAO', permission: 'ACCESSORYPART_DETAILINFO_ASSEMBLYPARTNUM|配件详情-批量供货总成号'},
  {value: 'stateDesc', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: [], permission: 'ACCESSORYPART_DETAILINFO_STATE|配件详情-配件状态'},
  {value: 'accessoryStatusDesc', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: [], permission: 'ACCESSORYPART_DETAILINFO_PARTSTATUS|配件详情-零件状态'},
  {value: 'idState', label: 'ID状态', type: 'select', key: 'IDZHUANGTAI', selectOption: [], permission: 'ACCESSORYPART_DETAILINFO_IDSTATE|配件详情-ID状态'},
  {value: 'csfuserDeptName', label: 'CSF科室', type: 'date', key: 'CSFKESHI', permission: 'ACCESSORYPART_DETAILINFO_CSFDEPT|配件详情-CSF科室'},
  {value: 'csfuserName', label: 'CSF', type: 'input', key: 'CSF', permission: 'ACCESSORYPART_DETAILINFO_CSF|配件详情-CSF'},
  {value: 'sendDate', label: '需求发送日期', type: 'input', key: 'XUQIUFASONGRIQI', permission: 'ACCESSORYPART_DETAILINFO_SENDDATE|配件详情-需求发送日期'},
  {value: 'respDeptName', label: 'LINIE科室', type: 'input', key: 'LINIEKESHI', permission: 'ACCESSORYPART_DETAILINFO_LINIEDEPT|配件详情-LINIE科室'},
  {value: 'respLinieName', label: 'LINIE', type: 'input', key: 'LINIE', permission: 'ACCESSORYPART_DETAILINFO_LINIE|配件详情-LINIE'},
  {value: 'brand', label: '品牌', type: 'input', key: 'PINPAI', permission: 'ACCESSORYPART_DETAILINFO_BRAND|配件详情-品牌'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', key: 'GONGYINGSHANGSAPHAO', permission: 'ACCESSORYPART_DETAILINFO_SUPPLIERSAPCODE|配件详情-供应商SAP号'},
  {value: 'supplierSvwCode', label: '供应商SVW号', type: 'input', key: 'GONGYINGSHANGSVWHAO', permission: 'ACCESSORYPART_DETAILINFO_SUPPLIERSVWCODE|配件详情-供应商SVW号'},
  {value: 'supplierSvwTempCode', label: '供应商名临时号', type: 'input', key: 'GONGYINGSHANGMINGLINSHIHAO', permission: 'ACCESSORYPART_DETAILINFO_SUPPLIERSVWTEMPCODE|配件详情-供应商名临时号'},
  {value: 'supplierNameZh', label: '供应商名(中)', type: 'input', key: 'GONGYINGSHANGMING_ZH', permission: 'ACCESSORYPART_DETAILINFO_SUPPLIERNAMEZH|配件详情-供应商名(中)'},
  {value: 'tcUnitName', label: '单位', type: 'input', key: 'DANWEI', permission: 'ACCESSORYPART_DETAILINFO_UNIT|配件详情-单位'},
  {value: 'deliveryWarehouse', label: '送货仓库', type: 'input', key: 'SONGHUOCANGKU', permission: 'ACCESSORYPART_DETAILINFO_DELIVERYWAREHOUSE|配件详情-送货仓库'},
  {value: 'signDate', label: '需求签收日期', type: 'input', key: 'XUQIUQIANSHOURIQI', permission: 'ACCESSORYPART_DETAILINFO_SIGNDATE|配件详情-需求签收日期'},
  {value: 'demandRecoveryDate', label: '需求恢复日期', type: 'input', key: 'XUQIUHUIFURIQI', permission: 'ACCESSORYPART_DETAILINFO_DEMANDRECOVERYDATE|配件详情-需求恢复日期'},
  {value: 'sparePartUuid', label: 'UUID', type: 'input', key: 'UUID', permission: 'ACCESSORYPART_DETAILINFO_UUID|配件详情-UUID'},
  {value: 'technicianStaffNum', label: '售后技术人员工号', type: 'input', key: 'SHOUHOUJISHURENYUANGONGHAO', permission: 'ACCESSORYPART_DETAILINFO_TECHNICIANSTAFFNUM|配件详情-售后技术人员工号'},
  {value: 'technicianStaffName', label: '售后技术人员名', type: 'input', key: 'LK_SHOUHOUJISHURENYUANMING', permission: 'ACCESSORYPART_DETAILINFO_TECHNICIANSTAFFNAME|配件详情-售后技术人员名'},
  {value: 'reason', label: '理由', type: 'input', key: 'LIYOU', row: 1, permission: 'ACCESSORYPART_DETAILINFO_REASON|配件详情-理由'},
  {value: 'remark', label: '备注说明', type: 'input', key: 'BEIZHUSHUOMING', row: 1, permission: 'ACCESSORYPART_DETAILINFO_REMARK|配件详情-备注说明'}
]

export const fileTableTitle = [
  { props: "fileName", name: "文件名称", key: "WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "SHANGCHUANREN", tooltip: true }
]